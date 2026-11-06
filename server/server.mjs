// First Principles CS: self-hosted server.
// Serves the course site and gives office hours a choice of model providers
// (Anthropic, Google, OpenAI, and local OpenAI-compatible servers such as Ollama or LM Studio).
// API keys stay here; browsers never see them. Student signals and approved lesson
// revisions are stored as JSON files in the data directory.
//
// Requires Node.js 18 or newer. No dependencies.  Run:  node server/server.mjs

import http from "node:http";
import fs from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const cfgPath = process.env.CONFIG || (existsSync(path.join(HERE, "config.json")) ? path.join(HERE, "config.json") : path.join(HERE, "config.example.json"));
const CFG = JSON.parse(readFileSync(cfgPath, "utf8"));
const SITE = path.resolve(HERE, CFG.siteDir || "..");
const DATA = path.resolve(HERE, CFG.dataDir || "./data");
const PORT = Number(process.env.PORT || CFG.port || 8080);
const HOST = process.env.HOST || CFG.host || "127.0.0.1";
const INSTRUCTOR_KEY = process.env.INSTRUCTOR_KEY || "";
const MAX_OUT = CFG.maxOutputTokens || 1500;
const MAX_OUT_DRAFT = CFG.maxOutputTokensDraft || 4000;

/* ---------- providers ---------- */
// A provider is offered only when its API key is set (or it needs none, like a local server).
const PROVIDERS = (CFG.providers || []).filter(p => {
  if (p.enabled === false) return false;
  if (p.apiKeyEnv && !process.env[p.apiKeyEnv]) { console.log(`- ${p.label}: skipped (set ${p.apiKeyEnv} to enable)`); return false; }
  console.log(`+ ${p.label}: ${p.models.map(m => m.id).join(", ")}`);
  return true;
});
const keyOf = p => (p.apiKeyEnv ? process.env[p.apiKeyEnv] : "") || "";
const findModel = (pid, mid) => {
  const p = PROVIDERS.find(x => x.id === pid);
  return p && p.models.some(m => m.id === mid) ? p : null;
};

class ProviderError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}
async function* sse(res) {
  // Yields {event, data} from a server-sent-event response body.
  const dec = new TextDecoder();
  let buf = "";
  for await (const chunk of res.body) {
    buf += dec.decode(chunk, { stream: true }).replace(/\r\n/g, "\n");
    let i;
    while ((i = buf.indexOf("\n\n")) >= 0) {
      const block = buf.slice(0, i);
      buf = buf.slice(i + 2);
      let event = "message", data = "";
      for (const line of block.split("\n")) {
        if (line.startsWith("event:")) event = line.slice(6).trim();
        else if (line.startsWith("data:")) data += line.slice(5).trimStart();
      }
      if (data) yield { event, data };
    }
  }
}
async function upstream(url, init, label) {
  let res;
  try { res = await fetch(url, init); }
  catch (e) {
    if (init.signal && init.signal.aborted) throw new ProviderError("cancelled", "cancelled");
    throw new ProviderError("provider_unavailable", `${label} could not be reached: ${e.message}`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.warn(`${label} HTTP ${res.status}: ${body.slice(0, 300)}`);
    if (res.status === 429) throw new ProviderError("rate_limited", `${label} rate limit`);
    if (res.status === 400 && /context|too long|too many tokens|maximum/i.test(body)) throw new ProviderError("prompt_too_large", "Prompt too long");
    throw new ProviderError("provider_unavailable", `${label} returned ${res.status}`);
  }
  return res;
}

// Each adapter streams text: onDelta(text) per chunk; resolves {truncated}.
const ADAPTERS = {
  async anthropic(p, { model, system, messages, maxTokens, signal, onDelta }) {
    const res = await upstream((p.baseUrl || "https://api.anthropic.com") + "/v1/messages", {
      method: "POST", signal,
      headers: { "content-type": "application/json", "x-api-key": keyOf(p), "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model, system, messages, max_tokens: maxTokens, stream: true })
    }, p.label);
    let truncated = false;
    for await (const { data } of sse(res)) {
      const ev = JSON.parse(data);
      if (ev.type === "content_block_delta" && ev.delta && ev.delta.type === "text_delta") onDelta(ev.delta.text);
      else if (ev.type === "message_delta" && ev.delta && ev.delta.stop_reason === "max_tokens") truncated = true;
      else if (ev.type === "error") throw new ProviderError(ev.error && ev.error.type === "overloaded_error" ? "provider_unavailable" : "upstream_error", ev.error ? ev.error.message : "error");
    }
    return { truncated };
  },

  // OpenAI Chat Completions, and any OpenAI-compatible server (Ollama, LM Studio, vLLM, llama.cpp).
  async openai(p, { model, system, messages, maxTokens, json, signal, onDelta }) {
    const body = { model, stream: true, messages: [{ role: "system", content: system }, ...messages] };
    body[p.maxTokensField || "max_tokens"] = maxTokens;
    if (json && p.jsonMode) body.response_format = { type: "json_object" };
    const headers = { "content-type": "application/json" };
    if (keyOf(p)) headers.authorization = "Bearer " + keyOf(p);
    const res = await upstream((p.baseUrl || "https://api.openai.com/v1").replace(/\/$/, "") + "/chat/completions", { method: "POST", signal, headers, body: JSON.stringify(body) }, p.label);
    let truncated = false;
    for await (const { data } of sse(res)) {
      if (data === "[DONE]") break;
      const ev = JSON.parse(data);
      if (ev.error) throw new ProviderError("upstream_error", ev.error.message || "error");
      const ch = ev.choices && ev.choices[0];
      if (!ch) continue;
      if (ch.delta && typeof ch.delta.content === "string" && ch.delta.content) onDelta(ch.delta.content);
      if (ch.finish_reason === "length") truncated = true;
    }
    return { truncated };
  },

  // Google Gemini API.
  async google(p, { model, system, messages, maxTokens, json, signal, onDelta }) {
    const base = (p.baseUrl || "https://generativelanguage.googleapis.com/v1beta").replace(/\/$/, "");
    const generationConfig = { maxOutputTokens: maxTokens };
    if (json) generationConfig.responseMimeType = "application/json";
    const res = await upstream(`${base}/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`, {
      method: "POST", signal,
      headers: { "content-type": "application/json", "x-goog-api-key": keyOf(p) },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: messages.map(m => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
        generationConfig
      })
    }, p.label);
    let truncated = false;
    for await (const { data } of sse(res)) {
      const ev = JSON.parse(data);
      if (ev.error) throw new ProviderError("upstream_error", ev.error.message || "error");
      const cand = ev.candidates && ev.candidates[0];
      if (!cand) continue;
      for (const part of (cand.content && cand.content.parts) || []) if (part.text && !part.thought) onDelta(part.text);
      if (cand.finishReason === "MAX_TOKENS") truncated = true;
      if (cand.finishReason === "SAFETY") throw new ProviderError("refused", "Blocked by safety settings");
    }
    return { truncated };
  }
};

/* ---------- storage (JSON files) ---------- */
await fs.mkdir(DATA, { recursive: true });
const stores = {};
async function load(name) {
  if (stores[name]) return stores[name];
  try { stores[name] = JSON.parse(await fs.readFile(path.join(DATA, name + ".json"), "utf8")); }
  catch { stores[name] = {}; }
  return stores[name];
}
const writing = {};
function persist(name) {
  // Serialize writes per file; write to a temp file, then rename, so a crash never leaves half a file.
  writing[name] = (writing[name] || Promise.resolve()).then(async () => {
    const file = path.join(DATA, name + ".json"), tmp = file + ".tmp";
    await fs.writeFile(tmp, JSON.stringify(stores[name]));
    await fs.rename(tmp, file);
  }).catch(e => console.error("write failed", name, e));
  return writing[name];
}

/* ---------- helpers ---------- */
const json = (res, status, obj) => { res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }); res.end(JSON.stringify(obj)); };
const fail = (res, status, error, message) => json(res, status, { error, message });
async function readBody(req, limit) {
  let size = 0; const chunks = [];
  for await (const c of req) { size += c.length; if (size > limit) throw new ProviderError("too_large", "Request too large"); chunks.push(c); }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"); } catch { throw new ProviderError("bad_request", "Invalid JSON"); }
}
const isInstructor = req => {
  if (!INSTRUCTOR_KEY) return false;
  const h = req.headers.authorization || "";
  const given = Buffer.from(h.startsWith("Bearer ") ? h.slice(7) : "");
  const want = Buffer.from(INSTRUCTOR_KEY);
  return given.length === want.length && crypto.timingSafeEqual(given, want);
};
const ipOf = req => (CFG.trustProxy && (req.headers["x-forwarded-for"] || "").split(",")[0].trim()) || req.socket.remoteAddress || "?";

// Simple fixed-window rate limits per client IP.
const buckets = new Map();
function limited(req, name, max, windowMs) {
  const k = name + ":" + ipOf(req), now = Date.now();
  let b = buckets.get(k);
  if (!b || now > b.reset) { b = { n: 0, reset: now + windowMs }; buckets.set(k, b); }
  b.n++;
  return b.n > max;
}
setInterval(() => { const now = Date.now(); for (const [k, b] of buckets) if (now > b.reset) buckets.delete(k); }, 60000).unref();

/* ---------- API ---------- */
const RL = { perMinute: 10, perDay: 300, ...(CFG.rateLimit || {}) };
async function handleChat(req, res) {
  const body = await readBody(req, 300000);
  const draft = body.purpose === "draft";
  if (draft && !isInstructor(req)) return fail(res, 401, "unauthorized", "Drafting improvements requires the instructor key.");
  if (!isInstructor(req) && (limited(req, "chat-m", RL.perMinute, 60000) || limited(req, "chat-d", RL.perDay, 86400000)))
    return fail(res, 429, "rate_limited", "Too many questions. Try again later.");
  const p = findModel(body.provider, body.model);
  if (!p) return fail(res, 400, "provider_unavailable", "Unknown or disabled model.");
  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-24).map(m => ({ role: m.role, content: m.content.slice(0, 20000) }));
  while (messages.length && messages[0].role !== "user") messages.shift();
  if (!messages.length || messages[messages.length - 1].role !== "user") return fail(res, 400, "bad_request", "The conversation must end with a question.");
  // Merge consecutive same-role turns (some providers reject them).
  const merged = [];
  for (const m of messages) {
    const last = merged[merged.length - 1];
    if (last && last.role === m.role) last.content += "\n\n" + m.content; else merged.push({ ...m });
  }
  const system = String(body.system || "").slice(0, 60000);

  res.writeHead(200, { "content-type": "text/event-stream; charset=utf-8", "cache-control": "no-store", "x-accel-buffering": "no" });
  const ctl = new AbortController();
  res.on("close", () => { if (!res.writableFinished) ctl.abort(); });
  const send = obj => { if (!res.writableEnded) res.write("data: " + JSON.stringify(obj) + "\n\n"); };
  try {
    const out = await ADAPTERS[p.type](p, {
      model: body.model, system, messages: merged, json: !!body.json,
      maxTokens: draft ? MAX_OUT_DRAFT : MAX_OUT, signal: ctl.signal, onDelta: d => send({ d })
    });
    send({ done: true, truncated: out.truncated });
  } catch (e) {
    if (e.code !== "cancelled") { console.warn("chat error:", e.code || "", e.message); send({ error: e.code || "upstream_error", message: e.message }); }
  }
  res.end();
}

async function api(req, res, url) {
  const parts = url.pathname.split("/").filter(Boolean).slice(1); // after "api"
  const [route, id] = parts;
  if (req.method === "GET" && route === "config") {
    return json(res, 200, {
      providers: PROVIDERS.map(p => ({ id: p.id, label: p.label, models: p.models.map(m => ({ id: m.id, label: m.label || m.id })) })),
      default: CFG.default || null
    });
  }
  if (req.method === "POST" && route === "chat") return handleChat(req, res);
  if (req.method === "GET" && route === "instructor") {
    if (!INSTRUCTOR_KEY) return fail(res, 403, "instructor_disabled", "INSTRUCTOR_KEY is not set on the server.");
    if (limited(req, "login", 10, 60000)) return fail(res, 429, "rate_limited", "Too many attempts.");
    return isInstructor(req) ? json(res, 200, { ok: true }) : fail(res, 401, "unauthorized", "Wrong key.");
  }
  if (route === "signals") {
    const all = await load("signals");
    if (!id && req.method === "GET") {
      if (!isInstructor(req)) return fail(res, 401, "unauthorized", "Instructor key required.");
      return json(res, 200, { docs: Object.values(all) });
    }
    if (!/^[A-Za-z0-9-]{8,64}$/.test(id || "")) return fail(res, 400, "bad_request", "Bad student id.");
    if (req.method === "GET") return json(res, 200, all[id] || {});
    if (req.method === "PUT") {
      if (limited(req, "signals", 60, 60000)) return fail(res, 429, "rate_limited", "Slow down.");
      const doc = await readBody(req, 64000);
      if (!doc || typeof doc.lessons !== "object") return fail(res, 400, "bad_request", "Missing lessons.");
      if (!(id in all) && Object.keys(all).length >= (CFG.maxStudents || 5000)) return fail(res, 507, "quota_exceeded", "Student limit reached.");
      all[id] = { lessons: doc.lessons, at: Date.now() };
      await persist("signals");
      return json(res, 200, { ok: true });
    }
  }
  if (route === "revisions") {
    const all = await load("revisions");
    if (!id && req.method === "GET") return json(res, 200, all);
    if (req.method === "PUT" && /^[a-z0-9]+-[a-z0-9]+$/.test(id || "")) {
      if (!isInstructor(req)) return fail(res, 401, "unauthorized", "Instructor key required.");
      const doc = await readBody(req, 128000);
      all[id] = { clar: Array.isArray(doc.clar) ? doc.clar : [], quiz: doc.quiz && typeof doc.quiz === "object" ? doc.quiz : {}, quizRev: Number(doc.quizRev) || 0, updatedAt: Date.now() };
      await persist("revisions");
      return json(res, 200, { ok: true });
    }
  }
  return fail(res, 404, "not_found", "No such endpoint.");
}

/* ---------- static site ---------- */
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".py": "text/plain; charset=utf-8", ".wasm": "application/wasm", ".zip": "application/zip" };
// Served paths: the page, course data, app scripts and the grading harness, and the Python runtime
// (vendor/pyodide, fetched by scripts/get-pyodide.sh).
const ALLOWED = /^\/(index\.html|data\/[\w.-]+\.js|app\/[\w.-]+\.(js|py)|vendor\/pyodide\/[\w.-]+\.(js|wasm|zip|json))$/;
// 'wasm-unsafe-eval' lets the Python runtime (WebAssembly) start; it doesn't allow eval of JavaScript.
const CSP = "default-src 'self'; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'; worker-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'";
// The page is written as an artifact body; wrap it in a full document, as claude.ai does.
function wrap(page) {
  const cut = page.indexOf("<style>");
  const head = cut > 0 ? page.slice(0, cut) : "";
  const body = cut > 0 ? page.slice(cut) : page;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0;font-size:14px;font-family:system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>
${head}</head><body>${body}</body></html>`;
}
async function serveStatic(req, res, url) {
  const rel = url.pathname === "/" ? "/index.html" : url.pathname;
  if (!ALLOWED.test(rel)) { res.writeHead(404); return res.end("Not found"); }
  const file = path.join(SITE, rel);
  if (!file.startsWith(SITE + path.sep)) { res.writeHead(404); return res.end("Not found"); }
  let buf;
  try { buf = await fs.readFile(file); } catch { res.writeHead(404); return res.end("Not found"); }
  const type = TYPES[path.extname(file)] || "application/octet-stream";
  const headers = { "content-type": type, "x-content-type-options": "nosniff", "referrer-policy": "no-referrer", "cache-control": "no-cache" };
  if (rel === "/index.html") { headers["content-security-policy"] = CSP; buf = wrap(buf.toString("utf8")); }
  if (rel.startsWith("/app/") || rel.startsWith("/vendor/")) headers["content-security-policy"] = CSP;   // applies to the worker
  if (rel.startsWith("/vendor/")) headers["cache-control"] = "public, max-age=604800";
  res.writeHead(200, headers);
  res.end(buf);
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  try {
    if (url.pathname.startsWith("/api/")) return await api(req, res, url);
    if (req.method === "GET" || req.method === "HEAD") return await serveStatic(req, res, url);
    res.writeHead(405); res.end();
  } catch (e) {
    console.error(e);
    if (!res.headersSent) fail(res, e.code === "too_large" ? 413 : e.code === "bad_request" ? 400 : 500, e.code || "server_error", e.message);
    else res.end();
  }
}).listen(PORT, HOST, () => {
  console.log(`First Principles CS on http://${HOST}:${PORT}  (config: ${path.relative(process.cwd(), cfgPath)})`);
  if (!INSTRUCTOR_KEY) console.log("Instructor view disabled: set INSTRUCTOR_KEY to enable it.");
  if (!PROVIDERS.length) console.log("No model providers enabled: office hours will be hidden.");
  if (!existsSync(path.join(SITE, "vendor", "pyodide", "pyodide.asm.wasm"))) console.log("Programming problems need the Python runtime: run  bash scripts/get-pyodide.sh");
});
