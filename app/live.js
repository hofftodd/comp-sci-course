/* Live features: the "Ask the professor" chat, learning signals, approved lesson
   revisions, and the instructor view (#teach). Two backends:
   - on claude.ai: the artifact runtime (sample for Claude, db for storage, user for roles);
   - self-hosted: the bundled server (server/server.mjs), which proxies Anthropic, Google,
     OpenAI or local models and stores signals and revisions itself.
   Without either, the course site works as a plain static site. */
(() => {
  const F = window.FPCS;
  if (!F) return;
  const { D, LANGS, esc } = F;
  const $ = (s, r = document) => r.querySelector(s);
  const S = { sample: null, db: null, user: null, uid: null, canEdit: false, tools: false, writable: true, ready: false, profOff: false };
  let mine = { lessons: {} };
  let saveTimer = null, saving = Promise.resolve();
  let route = F.parse();

  /* ---------- backends ---------- */
  const B = { kind: null, impl: null, chatOK: false, canSave: false, providers: [], pick: null, token: F.store.get("instructorKey", "") };
  const modelLabel = () => {
    if (B.kind !== "server") return "Claude";
    const p = B.providers.find(x => x.id === (B.pick && B.pick.provider));
    const m = p && p.models.find(x => x.id === B.pick.model);
    return p ? p.label + (m ? " · " + m.label : "") : "the AI model";
  };
  const artifactBackend = {
    chat({ system, turns, signal, onText, useTools }) {
      const opts = { signal, onText };
      if (useTools && S.tools) opts.tools = tools; else opts.cache = false;
      return S.sample([{ role: "user", content: system }, ...turns], opts);
    },
    json: prompt => S.sample.json(prompt),
    async loadMine() { const snap = await S.db.doc("signals/" + S.uid).get(); return snap.exists ? JSON.parse(JSON.stringify(snap.data())) : null; },
    saveMine: doc => S.db.doc("signals/" + S.uid).set(doc),
    watchRevisions(cb) {
      S.db.collection("revisions").onSnapshot(snap => {
        const m = {};
        snap.docs.forEach(d => { if (d.exists) m[d.id] = d.data(); });
        cb(m);
      }, e => console.warn("Revisions unavailable", e && e.code));
    },
    async loadSignals() { const snap = await S.db.collection("signals").get(); return snap.docs.filter(d => d.exists).map(d => d.data()); },
    writeRevision: (k, r) => S.db.doc("revisions/" + k).set(r)
  };

  async function api(path, opts = {}) {
    const headers = { "content-type": "application/json" };
    if (opts.auth && B.token) headers.authorization = "Bearer " + B.token;
    let res;
    try { res = await fetch("api/" + path, { method: opts.method || "GET", headers, body: opts.body ? JSON.stringify(opts.body) : undefined, signal: opts.signal }); }
    catch (e) { throw { code: opts.signal && opts.signal.aborted ? "cancelled" : "network", message: String(e) }; }
    if (!res.ok) {
      let j = {};
      try { j = await res.json(); } catch {}
      throw { code: j.error || (res.status === 401 ? "unauthorized" : res.status === 429 ? "rate_limited" : "upstream_error"), message: j.message || res.statusText, status: res.status };
    }
    return res;
  }
  const sid = (() => {
    let id = F.store.get("sid", "");
    if (!/^[A-Za-z0-9-]{8,64}$/.test(id)) {
      id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Array.from({ length: 4 }, () => Math.random().toString(36).slice(2, 10)).join("-");
      F.store.set("sid", id);
    }
    return id;
  })();
  async function streamChat(body, { signal, onText } = {}) {
    const res = await api("chat", { method: "POST", body, signal, auth: true });
    const reader = res.body.getReader(), dec = new TextDecoder();
    let buf = "", text = "", truncated = false;
    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let i;
        while ((i = buf.indexOf("\n\n")) >= 0) {
          const chunk = buf.slice(0, i);
          buf = buf.slice(i + 2);
          const line = chunk.split("\n").find(l => l.startsWith("data:"));
          if (!line) continue;
          const ev = JSON.parse(line.slice(5));
          if (ev.d) { text += ev.d; if (onText) onText({ text, delta: ev.d }); }
          if (ev.error) throw { code: ev.error, message: ev.message || "", text: text || undefined };
          if (ev.done) truncated = !!ev.truncated;
        }
      }
    } catch (e) {
      if (signal && signal.aborted) throw { code: "cancelled", text: text || undefined };
      throw e && e.code ? e : { code: "upstream_error", message: String(e), text: text || undefined };
    }
    if (!text.trim()) throw { code: "empty_completion" };
    return { text, truncated };
  }
  function parseJSON(t) {
    try { return JSON.parse(t); } catch {}
    const f = t.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (f) { try { return JSON.parse(f[1]); } catch {} }
    const a = t.indexOf("{"), b = t.lastIndexOf("}");
    if (a >= 0 && b > a) { try { return JSON.parse(t.slice(a, b + 1)); } catch {} }
    throw { code: "invalid_json", text: t };
  }
  const serverBackend = {
    chat({ system, turns, signal, onText }) {
      return streamChat({ provider: B.pick.provider, model: B.pick.model, system, messages: turns }, { signal, onText });
    },
    async json(prompt) {
      const { text } = await streamChat({ provider: B.pick.provider, model: B.pick.model, purpose: "draft", json: true,
        system: "You are a careful curriculum designer. Reply with a single JSON object and nothing else.", messages: [{ role: "user", content: prompt }] });
      return parseJSON(text);
    },
    async loadMine() { const j = await (await api("signals/" + sid)).json(); return j && j.lessons ? j : null; },
    saveMine: doc => api("signals/" + sid, { method: "PUT", body: doc }),
    watchRevisions(cb) {
      const pull = async () => { try { cb(await (await api("revisions")).json()); } catch (e) { console.warn("Revisions unavailable", e && e.code); } };
      pull();
      setInterval(pull, 60000);
      window.addEventListener("focus", pull);
    },
    async loadSignals() { return (await (await api("signals", { auth: true })).json()).docs || []; },
    writeRevision: (k, r) => api("revisions/" + k, { method: "PUT", body: r, auth: true })
  };

  /* ---------- small Markdown renderer for Claude's replies and clarifications ---------- */
  function inline(t) {
    let s = esc(t);
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[^*\w])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
    return s;
  }
  function md(src) {
    const parts = String(src || "").replace(/\r/g, "").split("```");
    let out = "";
    parts.forEach((b, i) => {
      if (i % 2 === 1) {
        const nl = b.indexOf("\n");
        const code = nl >= 0 ? b.slice(nl + 1) : b;
        out += `<pre><code>${esc(code.replace(/\n$/, ""))}</code></pre>`;
        return;
      }
      for (const para of b.split(/\n{2,}/)) {
        const lines = para.split("\n").filter(l => l.trim());
        if (!lines.length) continue;
        if (lines.every(l => /^\s*[-*]\s+/.test(l))) out += "<ul>" + lines.map(l => "<li>" + inline(l.replace(/^\s*[-*]\s+/, "")) + "</li>").join("") + "</ul>";
        else if (lines.every(l => /^\s*\d+[.)]\s+/.test(l))) out += "<ol>" + lines.map(l => "<li>" + inline(l.replace(/^\s*\d+[.)]\s+/, "")) + "</li>").join("") + "</ol>";
        else if (lines.length === 1 && /^#{1,4}\s/.test(lines[0])) out += "<h5>" + inline(lines[0].replace(/^#+\s*/, "")) + "</h5>";
        else out += "<p>" + lines.map(inline).join("<br>") + "</p>";
      }
    });
    return out;
  }

  /* ---------- lesson text for prompts ---------- */
  function plain(html) {
    const div = document.createElement("div");
    div.innerHTML = String(html || "")
      .replace(/<h3>/g, "<h3>\n## ")
      .replace(/<pre data-lang="(\w+)">/g, "<pre>\n[$1]\n")
      .replace(/<\/(p|li|h3|tr|pre|h4)>/g, "$&\n");
    return div.textContent.replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  }
  const findLesson = (cid, lid) => {
    const c = D.courses[cid];
    if (!c) return null;
    const u = F.lessons(c).find(x => x.id === lid);
    return u ? { c, u } : null;
  };
  const catalog = () => Object.values(D.courses).filter(c => c.units.length).map(c =>
    `${c.code} ${c.title} (course id "${c.id}"): ` + F.lessons(c).map(u => `"${u.id}" ${u.title}${u.core ? "" : " [optional]"}`).join("; ")).join("\n");
  const ltr = i => String.fromCharCode(65 + i);
  const quizText = (c, u, withStats) => F.quizFor(c, u).map((q, i) =>
    `Q${i + 1}. ${plain(q.q)}\n` + q.choices.map((ch, ci) => `   ${ltr(ci)}. ${plain(ch)}`).join("\n") +
    `\n   Correct: ${ltr(q.answer)}. Explanation: ${plain(q.why)}` + (withStats ? withStats(i) : "")).join("\n");

  /* ---------- learning signals (each student's own doc: signals/<id>) ---------- */
  const L = k => mine.lessons[k] || (mine.lessons[k] = { qn: 0, qs: [], clear: 0 });
  function queueSave() {
    if (!B.canSave || !S.writable) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saving = saving.then(async () => {
        try { mine.at = Date.now(); await B.impl.saveMine(JSON.parse(JSON.stringify(mine))); }
        catch (e) { if (e && (e.code === "invalid_argument" || e.status === 403)) S.writable = false; console.warn("Could not save learning signal", e && e.code); }
      });
    }, 800);
  }
  async function loadMine() {
    try {
      const d = await B.impl.loadMine();
      if (d) mine = { ...d, lessons: d.lessons || {} };
    } catch (e) { console.warn("Could not load learning signals", e && e.code); }
  }
  const recordQuestion = (k, text) => { const l = L(k); l.qn = (l.qn || 0) + 1; l.qs = (l.qs || []).concat({ t: text.slice(0, 300), at: Date.now() }).slice(-8); queueSave(); };
  F.hooks.onClarity = (c, u, v) => { L(F.key(c.id, u.id)).clear = v; queueSave(); };
  F.hooks.onQuiz = (c, u, picks) => {
    const k = F.key(c.id, u.id), l = L(k);
    const rev = (F.revisions[k] && F.revisions[k].quizRev) || 0;
    if (!l.quiz || l.quiz.rev !== rev) l.quiz = { rev, first: picks.slice(), last: picks.slice(), tries: 0 };
    l.quiz.last = picks.slice();
    l.quiz.tries++;
    queueSave();
  };

  /* ---------- approved revisions (revisions/<course-lesson>) ---------- */
  function onRevisions(next) {
    const prev = F.revisions;
    F.revisions = next || {};
    const r = F.parse();
    if (r.view === "unit") {
      const k = F.key(r.course, r.unit);
      if (JSON.stringify(prev[k] || null) !== JSON.stringify(F.revisions[k] || null)) F.render(true);
    }
  }
  F.hooks.beforeEnhance = (c, u, root) => {
    const r = F.revisions[F.key(c.id, u.id)];
    const notes = root.querySelector("#notes");
    if (!r || !Array.isArray(r.clar) || !notes) return;
    for (const cl of r.clar) {
      const sec = document.createElement("section");
      sec.className = "clar";
      sec.innerHTML = `<span class="chip k-practice">Added clarification</span><h4>${esc(cl.title || "Another way to see it")}</h4>${md(cl.body)}`;
      const heads = [...notes.querySelectorAll(":scope > h3")];
      const want = String(cl.after || "").trim().toLowerCase();
      const h = want ? heads.find(x => x.textContent.trim().toLowerCase() === want) : null;
      if (h) {
        let n = h.nextElementSibling;
        while (n && n.tagName !== "H3") n = n.nextElementSibling;
        notes.insertBefore(sec, n);
      } else if (!want) notes.prepend(sec);
      else notes.append(sec);
    }
  };

  /* ---------- professor chat ---------- */
  const chats = F.store.get("chats", {});
  let busy = false, ctl = null;
  function ctx() {
    const r = F.parse();
    if (r.view === "unit") {
      const f = findLesson(r.course, r.unit);
      if (f) return { id: F.key(r.course, r.unit), label: `${f.c.code} · ${f.u.title}`, ...f };
    }
    if (r.view === "course" && D.courses[r.course]) { const c = D.courses[r.course]; return { id: "course-" + c.id, label: `${c.code} ${c.title}`, c }; }
    return { id: "general", label: "General questions" };
  }
  function rules(x) {
    const lang = LANGS[F.getLang()] || "Python";
    let t = `You are a professor in "First Principles CS", a university computer science program, holding office hours with a first-year student through a chat panel on the course website.

How to teach:
- Be warm, precise and concise, like an excellent professor in office hours. Aim for under 250 words unless the student asks for more depth.
- Check understanding. When the student is working through a problem, guide with questions and hints rather than handing over the full solution.
- Show code examples in ${lang}, the student's chosen language, unless they ask for another. Keep examples short and correct.
- Ground answers in the lesson material below. If something goes beyond it, say so briefly. Never invent facts, sources, dates or quotations; if you are unsure, say you are unsure.
- If the student asks you to quiz them, ask ONE question at a time, wait for their answer, then give feedback and the next question.
- Quiz integrity: the lesson's quiz and its answers are given to you for reference. ${x.u ? (F.getScore(x.id) != null ? "The student HAS submitted this quiz, so you may discuss its answers." : "The student has NOT submitted this quiz yet. If asked for its answers, give hints and explanations of the concepts instead, and encourage them to try it.") : ""}
- Stay on computer science, mathematics and study skills. For personal, health or administrative matters, kindly suggest the student contact their human instructor or campus services.
- Format replies in Markdown: short paragraphs, "-" lists, \`inline code\`, and fenced code blocks with a language tag.
`;
    if (x.u) {
      const notes = plain(x.u.notes).slice(0, 14000);
      const asides = (x.u.asides || []).map(a => `[${a.kind}] ${a.title}: ${plain(a.html)}`).join("\n");
      const rev = F.revisions[x.id];
      const clar = rev && Array.isArray(rev.clar) ? rev.clar.map(c => `${c.title}: ${c.body}`).join("\n") : "";
      t += `\nCURRENT LESSON: ${x.c.code} ${x.c.title}, "${x.u.title}". ${x.u.summary}\n\nLESSON NOTES:\n${notes}\n`;
      if (asides) t += `\nSIDEBARS:\n${asides}\n`;
      if (clar) t += `\nADDED CLARIFICATIONS:\n${clar}\n`;
      if (x.u.quiz && x.u.quiz.length) t += `\nLESSON QUIZ (reference only):\n${quizText(x.c, x.u)}\n`;
      if (x.u.practice && x.u.practice.length) t += `\nPRACTICE PROBLEMS WITH SOLUTIONS (reference only: give hints first, and share a full solution only after the student has made a real attempt or explicitly asks to check their answer):\n${x.u.practice.map((pr, i) => `P${i + 1}. ${plain(pr.q)}\n   Solution: ${plain(pr.a)}`).join("\n").slice(0, 12000)}\n`;
    } else if (x.c) {
      t += `\nThe student is on the overview page of ${x.c.code} ${x.c.title}: ${x.c.summary}\nLearning outcomes: ${x.c.outcomes.join("; ")}\n`;
    }
    t += `\nCOURSES AND LESSONS ON THIS SITE:\n${catalog()}\n`;
    if (B.kind === "artifact" && S.tools) t += `\nYou can call get_lesson_notes to read any lesson's notes when the student asks about another lesson. Point students to lessons by name.\n`;
    t += `\nThe conversation with the student follows.`;
    return t;
  }
  const tools = [{
    name: "get_lesson_notes",
    description: "Returns the notes of one lesson on this site as plain text. Use when the student asks about a lesson other than the current one.",
    inputSchema: { type: "object", properties: { course: { type: "string", description: "Course id, e.g. cs101" }, lesson: { type: "string", description: "Lesson id, e.g. u3 or lang" } }, required: ["course", "lesson"] },
    execute(input) {
      const f = findLesson(String(input.course), String(input.lesson));
      if (!f) throw new Error("No such lesson. Use the course and lesson ids from the catalog.");
      return `${f.c.code} ${f.u.title}\n\n${plain(f.u.notes).slice(0, 8000)}`;
    }
  }];

  function buildDrawer() {
    const fab = document.createElement("button");
    fab.className = "prof-fab"; fab.id = "prof-fab"; fab.hidden = true; fab.type = "button";
    fab.innerHTML = `<span class="dot" aria-hidden="true"></span>Ask the professor`;
    const box = document.createElement("aside");
    box.className = "prof"; box.id = "prof"; box.hidden = true; box.setAttribute("aria-label", "Ask the professor");
    box.innerHTML = `
      <div class="prof-head"><div><b>Office hours</b><span id="prof-ctx"></span>
        <label class="prof-model" id="prof-model-wrap" hidden><span>Model</span><select id="prof-model"></select></label></div>
        <button class="icon-btn" type="button" id="prof-close" aria-label="Close">×</button></div>
      <div class="prof-log" id="prof-log" aria-live="polite"></div>
      <div class="prof-quick" id="prof-quick"></div>
      <form class="prof-form" id="prof-form">
        <label for="prof-input" class="eyebrow">Your question</label>
        <textarea id="prof-input" rows="2" placeholder="Ask anything about this lesson…"></textarea>
        <div class="prof-actions"><button class="btn ghost small" type="button" id="prof-clear">New conversation</button>
          <div class="btns"><button class="btn ghost small" type="button" id="prof-stop" hidden>Stop</button><button class="btn" type="submit" id="prof-send">Send</button></div></div>
        <p class="prof-fine" id="prof-fine"></p>
      </form>`;
    document.body.append(fab, box);
    fab.addEventListener("click", () => openProf());
    $("#prof-close").addEventListener("click", closeProf);
    $("#prof-stop").addEventListener("click", () => ctl && ctl.abort());
    $("#prof-clear").addEventListener("click", () => { if (busy) return; delete chats[ctx().id]; F.store.set("chats", chats); paintLog(); });
    $("#prof-form").addEventListener("submit", e => { e.preventDefault(); const v = $("#prof-input").value.trim(); if (v) { $("#prof-input").value = ""; send(v); } });
    $("#prof-input").addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("#prof-form").requestSubmit(); } });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !box.hidden) closeProf(); });
  }
  function fineprint() {
    const who = B.kind === "artifact" ? "Answers come from Claude, on your own Claude account, and can be wrong." : `Answers come from ${modelLabel()} and can be wrong.`;
    $("#prof-fine").textContent = who + " Your questions, quiz answers and lesson ratings are shared with instructors, without your name, to improve the lessons.";
  }
  function fillModelSelect() {
    const sel = $("#prof-model"), total = B.providers.reduce((n, p) => n + p.models.length, 0);
    sel.innerHTML = B.providers.map(p => `<optgroup label="${esc(p.label)}">${p.models.map(m =>
      `<option value="${esc(p.id + "|" + m.id)}">${esc(m.label)}</option>`).join("")}</optgroup>`).join("");
    if (B.pick) sel.value = B.pick.provider + "|" + B.pick.model;
    $("#prof-model-wrap").hidden = total < 2;
    sel.onchange = () => {
      const [provider, ...rest] = sel.value.split("|");
      B.pick = { provider, model: rest.join("|") };
      F.store.set("model", B.pick);
      fineprint();
    };
    fineprint();
  }
  function openProf(prefill) {
    if (S.profOff) return;
    $("#prof").hidden = false; $("#prof-fab").hidden = true;
    paintLog();
    if (prefill) send(prefill); else $("#prof-input").focus();
  }
  function closeProf() { $("#prof").hidden = true; $("#prof-fab").hidden = S.profOff || !B.chatOK; }
  function quickPrompts(x) {
    const lang = LANGS[F.getLang()] || "Python";
    if (x.u) return [
      ["Explain it another way", `Can you explain the main idea of "${x.u.title}" a different way, with an analogy?`],
      [`Example in ${lang}`, `Show me a short ${lang} example that illustrates "${x.u.title}", and walk me through it.`],
      ["Quiz me", "Quiz me on this lesson. Ask one question at a time and wait for my answer."],
      ["Where do students slip up?", "What mistakes do students most often make with this material, and how do I avoid them?"]
    ];
    if (x.c) return [["What will I learn?", `What is ${x.c.title} about, and why does it matter for a computer scientist?`], ["How should I study?", `How should I study for ${x.c.title} effectively?`]];
    return [["Where should I start?", "I'm new. Which course and lesson should I start with?"], ["What is computer science?", "What is computer science, beyond programming?"]];
  }
  function paintLog() {
    const x = ctx(), log = $("#prof-log"), turns = chats[x.id] || [];
    $("#prof-ctx").textContent = x.label;
    log.innerHTML = turns.length ? "" : `<div class="prof-empty"><b>Ask me anything about ${esc(x.u ? "this lesson" : x.c ? "this course" : "the program")}.</b><span>I can explain ideas a different way, give examples in ${esc(LANGS[F.getLang()])}, help you debug your thinking, or quiz you.</span></div>`;
    for (const t of turns) addMsg(t.role === "user" ? "me" : "pr", t.content);
    const q = $("#prof-quick");
    q.innerHTML = "";
    for (const [label, text] of quickPrompts(x)) {
      const b = document.createElement("button"); b.type = "button"; b.textContent = label;
      b.addEventListener("click", () => send(text));
      q.appendChild(b);
    }
    log.scrollTop = log.scrollHeight;
  }
  function addMsg(kind, text) {
    const m = document.createElement("div");
    m.className = "msg " + kind;
    if (kind === "me" || kind === "sys") m.textContent = text; else m.innerHTML = md(text);
    $("#prof-log").appendChild(m);
    return m;
  }
  const errCopy = {
    rate_limited: "You've reached a usage limit for now. Try again in a little while.",
    session_expired: "Please sign in to Claude again, then retry.",
    refused: "I can't help with that one. Try asking it a different way.",
    empty_completion: "I didn't produce an answer. Try rephrasing the question.",
    prompt_too_large: "That conversation got too long. Start a new conversation.",
    provider_unavailable: "That model isn't available right now. Pick another model at the top, or try again later.",
    network: "Couldn't reach the course server. Check your connection and try again.",
  };
  async function send(text) {
    if (busy || !B.chatOK) return;
    const x = ctx();
    const turns = chats[x.id] = chats[x.id] || [];
    if (!turns.length) $("#prof-log").innerHTML = "";
    turns.push({ role: "user", content: text });
    addMsg("me", text);
    if (x.u) recordQuestion(x.id, text);
    const bubble = addMsg("pr", "");
    bubble.classList.add("thinking"); bubble.textContent = "Thinking…";
    const log = $("#prof-log"); log.scrollTop = log.scrollHeight;
    busy = true; ctl = new AbortController();
    $("#prof-stop").hidden = false; $("#prof-send").disabled = true;
    const onText = ({ text }) => { bubble.classList.remove("thinking"); bubble.innerHTML = md(text); log.scrollTop = log.scrollHeight; };
    try {
      const res = await B.impl.chat({ system: rules(x), turns: turns.slice(-16), signal: ctl.signal, onText, useTools: true });
      turns.push({ role: "assistant", content: res.text });
      if (res.truncated) addMsg("sys", "The answer was cut short. Ask me to continue.");
    } catch (e) {
      const code = e && e.code;
      if (e && e.text) { bubble.classList.remove("thinking"); bubble.innerHTML = md(e.text); turns.push({ role: "assistant", content: e.text }); }
      else bubble.remove();
      if (["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"].includes(code)) {
        addMsg("sys", "The professor isn't available here, because Claude wasn't allowed for this page or isn't available on this account.");
        S.profOff = true;
      } else if (code !== "cancelled") addMsg("sys", errCopy[code] || `Something went wrong reaching ${modelLabel()}. Try again.`);
    } finally {
      busy = false; ctl = null;
      $("#prof-stop").hidden = true; $("#prof-send").disabled = false;
      chats[x.id] = turns.slice(-30);
      F.store.set("chats", chats);
    }
  }
  F.hooks.onRoute = r => {
    route = r;
    document.querySelectorAll(".ask-prof").forEach(b => {
      b.hidden = !B.chatOK || S.profOff;
      b.onclick = () => openProf("I didn't find this lesson clear. Can you explain the key ideas another way, step by step?");
    });
    if ($("#prof") && !$("#prof").hidden && !busy) paintLog();
  };

  /* ---------- instructor view ---------- */
  function aggregate(docs) {
    const out = {};
    for (const c of Object.values(D.courses)) for (const u of F.lessons(c)) {
      const k = F.key(c.id, u.id);
      const quiz = F.quizFor(c, u);
      out[k] = { c, u, k, students: 0, qn: 0, qs: [], yes: 0, no: 0, quiz: quiz.map(() => ({ n: 0, right: 0, wrong: {} })) };
    }
    for (const d of docs) for (const [k, l] of Object.entries(d.lessons || {})) {
      const a = out[k];
      if (!a || !l) continue;
      a.students++;
      a.qn += Number(l.qn) || 0;
      for (const q of l.qs || []) if (q && q.t) a.qs.push(q);
      if (l.clear > 0) a.yes++; else if (l.clear < 0) a.no++;
      const rev = (F.revisions[k] && F.revisions[k].quizRev) || 0;
      if (l.quiz && l.quiz.rev === rev && Array.isArray(l.quiz.first)) {
        const qz = F.quizFor(a.c, a.u);
        l.quiz.first.forEach((pick, i) => {
          if (!a.quiz[i] || pick == null) return;
          a.quiz[i].n++;
          if (pick === qz[i].answer) a.quiz[i].right++; else a.quiz[i].wrong[pick] = (a.quiz[i].wrong[pick] || 0) + 1;
        });
      }
    }
    for (const a of Object.values(out)) {
      a.qs.sort((x, y) => y.at - x.at);
      const accs = a.quiz.filter(q => q.n >= 3).map(q => q.right / q.n);
      a.low = accs.length ? Math.min(...accs) : null;
      a.attention = a.qn >= 3 || (a.no >= 2 && a.no >= a.yes) || (a.low != null && a.low < 0.6);
      a.score = a.qn + 2 * a.no + (a.low != null ? (1 - a.low) * 10 : 0);
      a.hasData = a.students > 0;
    }
    return out;
  }
  let agg = null;
  async function teach(root) {
    root.innerHTML = `<div class="empty">Loading the instructor view…</div>`;
    await ready;
    if (B.kind === "server") {
      if (!B.token) return teachLogin(root);
    } else if (!S.db || !S.canEdit) {
      root.innerHTML = `<div class="course-head"><h1>Instructor view</h1><p class="lede">This view is for instructors, meaning people who can edit this page. Ask the page's owner for Editor access.</p></div>`;
      return;
    }
    root.innerHTML = `<div class="course-head"><div class="crumbs"><a href="#home">Home</a><span>›</span><span>Instructor view</span></div>
      <h1>Lesson health</h1>
      <p class="lede">What students ask the professor, how they rate each lesson, and how they do on first quiz attempts. Lessons that need attention are listed first. The AI model can draft clearer explanations or questions, and nothing reaches students until you approve it.</p>
      <div class="clarity-row"><button class="btn ghost small" type="button" id="teach-refresh">Refresh data</button>${B.kind === "server" ? `<span class="note">Drafts use ${esc(modelLabel())}. Change it in Office hours.</span><button class="btn ghost small" type="button" id="teach-out">Sign out</button>` : ""}</div></div>
      <div id="teach-body"><div class="empty">Loading student activity…</div></div>`;
    $("#teach-refresh").addEventListener("click", () => loadTeach());
    if ($("#teach-out")) $("#teach-out").addEventListener("click", () => { B.token = ""; F.store.set("instructorKey", ""); teachLogin(root); });
    loadTeach();
  }
  function teachLogin(root, msg) {
    root.innerHTML = `<div class="course-head"><div class="crumbs"><a href="#home">Home</a><span>›</span><span>Instructor view</span></div>
      <h1>Instructor sign-in</h1>
      <p class="lede">Enter the instructor key configured on the course server (the INSTRUCTOR_KEY setting).</p>
      <form id="teach-login" class="clarity-row"><label for="teach-key" class="eyebrow">Instructor key</label>
        <input class="field" id="teach-key" type="password" autocomplete="current-password" required>
        <button class="btn" type="submit">Sign in</button></form>
      <p class="note" aria-live="polite">${msg ? esc(msg) : ""}</p></div>`;
    $("#teach-login").addEventListener("submit", async e => {
      e.preventDefault();
      B.token = $("#teach-key").value.trim();
      try {
        await api("instructor", { auth: true });
        F.store.set("instructorKey", B.token);
        teach(root);
      } catch (err) {
        B.token = "";
        teachLogin(root, err.code === "rate_limited" ? "Too many attempts. Wait a minute and try again." : err.code === "instructor_disabled" ? "The server has no instructor key set. Set INSTRUCTOR_KEY and restart it." : "That key didn't work.");
      }
    });
  }
  F.hooks.teach = teach;
  async function loadTeach() {
    const body = $("#teach-body");
    if (!body) return;
    try {
      const docs = await B.impl.loadSignals();
      agg = aggregate(docs);
      paintTeach(docs.length);
    } catch (e) {
      if (e && e.status === 401) { B.token = ""; F.store.set("instructorKey", ""); return teachLogin($("#teach"), "Your instructor key is no longer valid. Sign in again."); }
      body.innerHTML = `<div class="empty">Student activity could not be loaded (${esc(e && e.code || "error")}). Try Refresh in a moment.</div>`;
    }
  }
  function paintTeach(nStudents) {
    const body = $("#teach-body");
    const rows = Object.values(agg).sort((a, b) => (b.attention - a.attention) || (b.score - a.score) || (b.students - a.students));
    const totQ = rows.reduce((s, a) => s + a.qn, 0);
    const totA = rows.reduce((s, a) => s + a.quiz.reduce((t, q) => t + q.n, 0), 0);
    const flagged = rows.filter(a => a.attention).length;
    let h = `<div class="teach-sum"><div><b>${nStudents}</b>students with activity</div><div><b>${totQ}</b>questions asked</div><div><b>${totA}</b>first-try quiz answers</div><div><b>${flagged}</b>lessons need attention</div></div>`;
    if (!nStudents) h += `<p class="note">No student activity yet. Students need Contributor access to the page for their questions, ratings and quiz results to be recorded.</p>`;
    h += `<div class="thead"><span>Course</span><span>Lesson</span><span class="hide-n">Questions</span><span class="hide-n">Unclear</span><span>Status</span></div>`;
    for (const a of rows) {
      const st = a.attention ? `<span class="pill warn">Needs attention</span>` : a.hasData ? `<span class="pill ok">OK</span>` : `<span class="pill none">No data</span>`;
      h += `<details class="trow" data-k="${a.k}"><summary><span class="num">${esc(a.c.code)}</span><span><b>${esc(a.u.title)}</b>${a.u.core ? "" : " <span class='note'>(optional)</span>"}</span>
        <span class="num hide-n"><b>${a.qn}</b></span><span class="num hide-n"><b>${a.no}</b> of ${a.yes + a.no}</span><span>${st}</span></summary><div class="tdetail"></div></details>`;
    }
    body.innerHTML = h;
    body.querySelectorAll("details.trow").forEach(d => d.addEventListener("toggle", () => { if (d.open) paintDetail(d); }));
  }
  function revFor(k) { return F.revisions[k] ? JSON.parse(JSON.stringify(F.revisions[k])) : {}; }
  function paintDetail(d) {
    const a = agg[d.dataset.k], box = d.querySelector(".tdetail");
    const quiz = F.quizFor(a.c, a.u);
    const r = revFor(a.k);
    let h = `<div><a href="#c-${a.c.id}-${a.u.id}">Open the lesson</a> · ${a.students} student${a.students === 1 ? "" : "s"} · rated clear ${a.yes}, unclear ${a.no}</div>`;
    h += `<div><h4>Recent questions to the professor</h4>${a.qs.length ? `<ul>${a.qs.slice(0, 12).map(q => `<li>${esc(q.t)}</li>`).join("")}</ul>` : `<p class="note">None yet.</p>`}</div>`;
    h += `<div><h4>Quiz, first attempts${r.quizRev ? " since the last revision" : ""}</h4>`;
    quiz.forEach((q, i) => {
      const s = a.quiz[i] || { n: 0, right: 0, wrong: {} };
      const pct = s.n ? Math.round(100 * s.right / s.n) : null;
      const top = Object.entries(s.wrong).sort((x, y) => y[1] - x[1])[0];
      h += `<div class="qstat"><span>${i + 1}. ${q.q}${q.revised ? ` <span class="chip k-practice">Revised</span>` : ""}</span>
        <span>${pct == null ? `<span class="note">No attempts</span>` : `<span class="num">${pct}% of ${s.n}</span><div class="bar"><i class="${pct < 60 ? "low" : ""}" style="width:${pct}%"></i></div>`}</span>
        ${top ? `<small>Most common wrong answer: ${q.choices[top[0]] || "?"} (${top[1]})</small>` : ""}</div>`;
    });
    h += `</div>`;
    h += `<div><h4>Approved changes students see now</h4><div class="live-list"></div></div>`;
    h += `<div><h4>Improve this lesson</h4><p class="note">The AI model reviews the notes, quiz results and student questions, then proposes clarifications and clearer quiz questions. You approve each one.</p>
      <button class="btn small" type="button" data-draft>Draft improvements</button><div class="proposals" style="display:grid;gap:var(--s-3);margin-top:var(--s-3)"></div></div>`;
    box.innerHTML = h;
    paintLive(a, d);
    box.querySelector("[data-draft]").addEventListener("click", e => draft(a, box, e.currentTarget));
  }
  function paintLive(a, d) {
    const r = revFor(a.k), el = d.querySelector(".live-list");
    const live = (r.clar || []).map(c => ({ type: "clar", id: c.id, label: `Clarification: ${c.title}` }))
      .concat(Object.keys(r.quiz || {}).map(i => ({ type: "quiz", id: i, label: `Rewritten quiz question ${Number(i) + 1}` })));
    el.innerHTML = live.length ? live.map(l => `<div class="live-rev"><span>${esc(l.label)}</span><button class="btn ghost small" type="button" data-remove="${l.type}:${esc(l.id)}">Remove</button></div>`).join("") : `<p class="note">None. Students see the original lesson.</p>`;
    el.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => removeRev(a, b.dataset.remove, d)));
  }
  async function writeRev(k, r) {
    r.updatedAt = Date.now();
    await B.impl.writeRevision(k, r);
    F.revisions = { ...F.revisions, [k]: r };
  }
  async function removeRev(a, spec, d) {
    const [type, id] = spec.split(":");
    const r = revFor(a.k);
    if (type === "clar") r.clar = (r.clar || []).filter(c => c.id !== id);
    else { delete (r.quiz || {})[id]; r.quizRev = (r.quizRev || 0) + 1; }
    try { await writeRev(a.k, r); paintLive(a, d); } catch (e) { alertIn(d, "Could not remove the change (" + (e && e.code) + ")."); }
  }
  function alertIn(d, msg) { const p = document.createElement("p"); p.className = "note"; p.textContent = msg; d.querySelector(".tdetail").prepend(p); }
  async function draft(a, box, btn) {
    const out = box.querySelector(".proposals");
    if (!B.chatOK) { out.innerHTML = `<p class="note">No AI model is available here.</p>`; return; }
    btn.disabled = true;
    out.innerHTML = `<p class="note">${esc(modelLabel())} is reviewing the lesson. This can take a minute…</p>`;
    const r = revFor(a.k);
    const stats = i => {
      const s = a.quiz[i];
      if (!s || !s.n) return "\n   First-try results: no attempts yet.";
      const wrong = Object.entries(s.wrong).map(([ci, n]) => `${ltr(Number(ci))}: ${n}`).join(", ");
      return `\n   First-try results: ${s.right} of ${s.n} correct${wrong ? `; wrong picks ${wrong}` : ""}.`;
    };
    const headings = [...a.u.notes.matchAll(/<h3>(.*?)<\/h3>/g)].map(m => plain(m[1]));
    const prompt = `You are an expert curriculum designer improving one lesson of a first-year university computer science program, using evidence from students.

LESSON: ${a.c.code} ${a.c.title}, "${a.u.title}". ${a.u.summary}

LESSON NOTES (section headings start with "## "):
${plain(a.u.notes).slice(0, 14000)}

SECTION HEADINGS, exactly: ${headings.map(h => JSON.stringify(h)).join(", ") || "(none)"}

QUIZ WITH FIRST-TRY RESULTS:
${quizText(a.c, a.u, stats)}

STUDENT QUESTIONS TO THE AI PROFESSOR (anonymous, most recent first):
${a.qs.slice(0, 40).map(q => "- " + q.t).join("\n") || "(none)"}

CLARITY RATINGS: clear ${a.yes}, unclear ${a.no}
ALREADY APPROVED CLARIFICATIONS: ${(r.clar || []).map(c => c.title).join("; ") || "(none)"}

TASK:
1. Work out what students find confusing, from the questions, ratings and quiz results.
2. Propose at most 3 clarifications to add to the notes. Each should target a specific confusion, be accurate, and be under 200 words. Place each after the most relevant section heading.
3. Propose a rewrite only for quiz questions whose WORDING or answer choices seem to cause wrong answers (for example ambiguity, or wrong picks concentrated on one choice that is arguably defensible). Do not rewrite a question only because it is hard. Keep the same concept and difficulty. Exactly one choice must be correct.
4. If the evidence is too thin, return empty lists and say so in the summary.

Reply with only a JSON object of this shape:
{"summary": "2-4 sentences on what students struggle with",
 "clarifications": [{"after": "exact section heading from the list, or \\"\\" for the top", "title": "short title", "body": "Markdown: paragraphs, - lists, \`code\`, fenced code blocks", "reason": "the evidence"}],
 "quiz": [{"index": 0, "q": "question text", "choices": ["...", "..."], "answer": 0, "why": "explanation shown after answering", "reason": "the evidence"}]}
Indexes are 0-based. Use plain text with \`backticks\` for code in quiz fields, no HTML.`;
    try {
      const res = await B.impl.json(prompt);
      paintProposals(a, out, res, box.closest("details"));
    } catch (e) {
      out.innerHTML = `<p class="note">${esc(errCopy[e && e.code] || (e && e.code === "invalid_json" ? "The model's reply couldn't be read. Try again, or pick a stronger model." : "The model couldn't draft improvements right now. Try again."))}</p>`;
    } finally { btn.disabled = false; }
  }
  function paintProposals(a, out, res, d) {
    const base = F.quizFor(a.c, a.u);
    const clar = Array.isArray(res && res.clarifications) ? res.clarifications.filter(c => c && c.body) : [];
    const quiz = Array.isArray(res && res.quiz) ? res.quiz.filter(q => q && Number.isInteger(q.index) && base[q.index] && Array.isArray(q.choices) && q.choices.length >= 2 && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.choices.length) : [];
    let h = `<p>${esc(res && res.summary || "")}</p>`;
    if (!clar.length && !quiz.length) h += `<p class="note">No changes proposed.</p>`;
    clar.forEach((c, i) => {
      h += `<div class="proposal" data-p="c${i}"><span class="chip k-practice" style="justify-self:start">New clarification${c.after ? " · after “" + esc(c.after) + "”" : " · at the top"}</span><b>${esc(c.title || "Another way to see it")}</b><div class="clar-body">${md(c.body)}</div>
        <div class="why-p">Why: ${esc(c.reason || "")}</div><div class="acts"><button class="btn small" type="button" data-ok>Approve and publish</button><button class="btn ghost small" type="button" data-no>Discard</button></div></div>`;
    });
    quiz.forEach((q, i) => {
      const old = base[q.index];
      h += `<div class="proposal" data-p="q${i}"><span class="chip k-practice" style="justify-self:start">Rewrite of question ${q.index + 1}</span>
        <div class="note">Currently: ${old.q}</div><b>${inline(q.q)}</b><ol class="ch" type="A">${q.choices.map((ch, ci) => `<li class="${ci === q.answer ? "ans" : ""}">${inline(ch)}</li>`).join("")}</ol>
        <div class="note">Explanation: ${inline(q.why || "")}</div><div class="why-p">Why: ${esc(q.reason || "")}</div>
        <div class="acts"><button class="btn small" type="button" data-ok>Approve and publish</button><button class="btn ghost small" type="button" data-no>Discard</button></div></div>`;
    });
    out.innerHTML = h;
    out.querySelectorAll(".proposal").forEach(p => {
      const id = p.dataset.p, isClar = id[0] === "c", item = isClar ? clar[+id.slice(1)] : quiz[+id.slice(1)];
      p.querySelector("[data-no]").addEventListener("click", () => p.remove());
      p.querySelector("[data-ok]").addEventListener("click", async e => {
        const okBtn = e.currentTarget;
        okBtn.disabled = true;
        const r = revFor(a.k);
        if (isClar) r.clar = (r.clar || []).concat({ id: "c" + Date.now().toString(36), after: String(item.after || ""), title: String(item.title || "Another way to see it").slice(0, 120), body: String(item.body).slice(0, 4000), at: Date.now() });
        else { r.quiz = r.quiz || {}; r.quiz[item.index] = { q: inline(item.q), choices: item.choices.map(c => inline(String(c))), answer: item.answer, why: inline(item.why || ""), at: Date.now() }; r.quizRev = (r.quizRev || 0) + 1; }
        try {
          await writeRev(a.k, r);
          p.innerHTML = `<span class="pill ok" style="justify-self:start">Published</span><span class="note">Students now see this change.</span>`;
          paintLive(a, d);
        } catch (err) { okBtn.disabled = false; p.insertAdjacentHTML("beforeend", `<p class="note">Could not publish (${esc(err && err.code || "error")}).</p>`); }
      });
    });
  }

  /* ---------- boot ---------- */
  buildDrawer();
  const ready = (async () => {
    if (window.claude && typeof window.claude.use === "function") {
      const use = n => Promise.resolve(window.claude.use(n)).catch(() => null);
      const [sample, db, user] = await Promise.all([use("sample"), use("db"), use("user")]);
      S.sample = sample; S.db = db; S.user = user;
      B.kind = "artifact"; B.impl = artifactBackend; B.chatOK = !!sample;
      if (user) { S.uid = await user.id(); S.canEdit = await user.canEdit(); }
      B.canSave = !!(db && S.uid);
      if (sample) {
        try { const lim = await sample.limits(); S.tools = !!(lim && lim.tools); } catch {}
        $("#prof-fab").hidden = false;
      }
      fineprint();
      if (S.canEdit) $("#teach-link").hidden = false;
      if (db) { artifactBackend.watchRevisions(onRevisions); if (S.uid) loadMine(); }
      return;
    }
    if (location.protocol === "file:") return;
    let cfg;
    try { cfg = await (await api("config")).json(); } catch { return; }
    B.kind = "server"; B.impl = serverBackend; B.canSave = true;
    B.providers = Array.isArray(cfg.providers) ? cfg.providers.filter(p => p && Array.isArray(p.models) && p.models.length) : [];
    const valid = p => p && B.providers.some(x => x.id === p.provider && x.models.some(m => m.id === p.model));
    const saved = F.store.get("model", null);
    B.pick = valid(saved) ? saved : valid(cfg.default) ? cfg.default : (B.providers[0] ? { provider: B.providers[0].id, model: B.providers[0].models[0].id } : null);
    B.chatOK = !!B.pick;
    fillModelSelect();
    $("#prof-fab").hidden = !B.chatOK;
    $("#teach-link").hidden = false;
    serverBackend.watchRevisions(onRevisions);
    loadMine();
  })().finally(() => { S.ready = true; F.hooks.onRoute(F.parse()); });
  if (F.parse().view === "teach") teach($("#teach"));
})();
