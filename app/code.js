/* Auto-graded programming problems: an editor per problem, Python (Pyodide) in a Web Worker,
   tests run one at a time with a time limit, and an export for running the checks locally
   when the browser can't start Python. Plugs into the app through FPCS.hooks.afterUnit. */
(() => {
  const F = window.FPCS;
  if (!F) return;
  const { esc, store } = F;
  const $ = (s, r = document) => r.querySelector(s);

  /* ---------- the Python worker ---------- */
  const PY = { worker: null, ready: null, pending: new Map(), seq: 0, failed: false };
  function startPython() {
    if (PY.ready) return PY.ready;
    PY.ready = new Promise((resolve, reject) => {
      let worker;
      try { worker = new Worker(new URL("app/pyworker.js", location.href)); }
      catch (e) { PY.failed = true; reject(e); return; }
      PY.worker = worker;
      const timer = setTimeout(() => { PY.failed = true; reject(new Error("Python took too long to start.")); }, 90000);
      worker.onmessage = ({ data }) => {
        if (data.type === "ready") { clearTimeout(timer); PY.failed = false; resolve(); }
        else if (data.type === "failed") { clearTimeout(timer); PY.failed = true; reject(new Error(data.message)); }
        else if (data.id != null && PY.pending.has(data.id)) { PY.pending.get(data.id)(data.result); PY.pending.delete(data.id); }
      };
      worker.onerror = e => { clearTimeout(timer); PY.failed = true; reject(new Error(e.message || "The Python worker failed to load.")); };
    });
    PY.ready.catch(() => { stopPython(); });
    return PY.ready;
  }
  function stopPython() {
    if (PY.worker) PY.worker.terminate();
    PY.worker = null; PY.ready = null;
    for (const resolve of PY.pending.values()) resolve({ cancelled: true });
    PY.pending.clear();
  }
  async function callPython(msg, limitSeconds) {
    await startPython();
    return new Promise(resolve => {
      const id = ++PY.seq;
      const timer = setTimeout(() => { PY.pending.delete(id); stopPython(); resolve({ timeout: true }); }, limitSeconds * 1000);
      PY.pending.set(id, r => { clearTimeout(timer); resolve(r); });
      PY.worker.postMessage({ ...msg, id });
    });
  }

  /* ---------- saved state ---------- */
  const draftKey = (c, p) => `draft:${c.id}-${p.id}`;
  const solvedAll = () => store.get("solved", {});
  const markSolved = (c, p) => { const s = solvedAll(); s[`${c.id}-${p.id}`] = true; store.set("solved", s); };
  const isSolved = (c, p) => !!solvedAll()[`${c.id}-${p.id}`];
  const isIO = p => p.tests.some(t => t.type === "io");

  /* ---------- rendering ---------- */
  function render(c, u, root) {
    const slot = root.querySelector("#code-problems");
    if (!slot || !u.code) return;
    slot.innerHTML = `<h2>Programming problems</h2>
      <p class="note">Write real Python and check it against automatic tests. Python runs in your browser; the first check takes a few seconds while it starts. Press Ctrl+Enter (Cmd+Enter on a Mac) to check, and Esc then Tab to leave the editor.</p>
      <p class="py-status" id="py-status" aria-live="polite"></p>
      <div class="cps">${u.code.map((p, i) => problemHTML(c, p, i)).join("")}</div>`;
    slot.querySelectorAll(".cp").forEach(el => wire(c, u, u.code.find(p => p.id === el.dataset.pid), el));
  }
  function problemHTML(c, p, i) {
    const code = store.get(draftKey(c, p), p.starter);
    const rows = Math.min(24, Math.max(6, code.split("\n").length + 1));
    const solved = isSolved(c, p);
    return `<article class="cp" data-pid="${esc(p.id)}">
      <div class="cp-head"><h3>${i + 1}. ${esc(p.title)}</h3><span class="pill ${solved ? "ok" : "none"}" data-status>${solved ? "Solved" : "Not solved yet"}</span></div>
      <div class="cp-prompt">${p.prompt}</div>
      <label class="eyebrow" for="ed-${esc(p.id)}">Your code</label>
      <textarea class="cp-ed" id="ed-${esc(p.id)}" rows="${rows}" spellcheck="false" autocomplete="off" autocapitalize="off" autocorrect="off">${esc(code)}</textarea>
      ${isIO(p) ? `<details class="cp-in"><summary>Input for Run</summary><label class="note" for="in-${esc(p.id)}">One line per <code>input()</code> call:</label><textarea id="in-${esc(p.id)}" rows="2" spellcheck="false">${esc((p.tests.find(t => t.type === "io" && !t.hidden) || {}).stdin?.join("\n") || "")}</textarea></details>` : ""}
      <div class="cp-actions">
        <button class="btn small" type="button" data-act="check">Check</button>
        <button class="btn ghost small" type="button" data-act="run">Run</button>
        <button class="btn ghost small" type="button" data-act="hint" aria-expanded="false">Hint</button>
        <button class="btn ghost small" type="button" data-act="ask" hidden>Ask the professor</button>
        <button class="btn ghost small" type="button" data-act="reset">Reset</button>
        <button class="btn ghost small" type="button" data-act="solution">Show a solution</button>
        <button class="btn ghost small" type="button" data-act="export">Run on my computer</button>
      </div>
      <div class="cp-hint" hidden>${p.hint || ""}</div>
      <div class="cp-out" hidden></div>
      <div class="cp-results" aria-live="polite" hidden></div>
      <div class="cp-sol" hidden></div>
      <div class="cp-export" hidden></div>
    </article>`;
  }

  /* ---------- the editor ---------- */
  function wireEditor(ta, onSave, onCheck) {
    let escaped = false;
    ta.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); onCheck(); return; }
      if (e.key === "Escape") { escaped = true; return; }
      if (e.key === "Tab" && !escaped && !e.shiftKey) {
        e.preventDefault();
        ta.setRangeText("    ", ta.selectionStart, ta.selectionEnd, "end");
        onSave();
        return;
      }
      if (e.key === "Enter" && !e.shiftKey) {
        // Keep the current line's indentation, and add a level after a colon.
        const before = ta.value.slice(0, ta.selectionStart);
        const line = before.slice(before.lastIndexOf("\n") + 1);
        let indent = line.match(/^\s*/)[0];
        if (/:\s*$/.test(line)) indent += "    ";
        e.preventDefault();
        ta.setRangeText("\n" + indent, ta.selectionStart, ta.selectionEnd, "end");
        onSave();
      }
      escaped = false;
    });
    ta.addEventListener("input", () => {
      ta.rows = Math.min(24, Math.max(6, ta.value.split("\n").length + 1));
      onSave();
    });
  }

  function status(text) { const el = $("#py-status"); if (el) el.textContent = text; }
  const loadingText = "Starting Python… the first time takes a few seconds.";
  const failText = "Python couldn't start in this browser. You can still check your work on your own computer: use \"Run on my computer\".";

  function wire(c, u, p, el) {
    const ta = $(".cp-ed", el);
    const out = $(".cp-out", el), results = $(".cp-results", el), hint = $(".cp-hint", el), sol = $(".cp-sol", el), exp = $(".cp-export", el);
    const pill = $("[data-status]", el);
    let saveTimer = null, lastFailures = [];
    const save = () => { clearTimeout(saveTimer); saveTimer = setTimeout(() => store.set(draftKey(c, p), ta.value), 400); };
    const btn = act => $(`[data-act="${act}"]`, el);
    const busy = on => el.querySelectorAll("[data-act=check],[data-act=run]").forEach(b => { b.disabled = on; });

    async function check() {
      store.set(draftKey(c, p), ta.value);
      busy(true); out.hidden = true; results.hidden = false;
      results.innerHTML = `<ol class="tests">${p.tests.map((t, i) => `<li data-i="${i}" class="pending"><span class="mark">…</span><span>${esc(t.label || `Test ${i + 1}`)}</span></li>`).join("")}</ol><p class="cp-sum"></p>`;
      if (!PY.worker) status(loadingText);
      let passed = 0, ranAny = false;
      lastFailures = [];
      for (let i = 0; i < p.tests.length; i++) {
        const t = p.tests[i], li = results.querySelector(`li[data-i="${i}"]`);
        let r;
        try { r = await callPython({ type: "check", code: ta.value, test: t }, t.limit || 5); }
        catch (e) { status(failText); li.className = "fail"; $(".mark", li).textContent = "!"; showExport(); busy(false); return; }
        ranAny = true; status("");
        if (r.timeout) r = { ok: false, message: `This test took longer than ${t.limit || 5} seconds. Your code may be in an infinite loop, or too slow for this input.` };
        li.className = r.ok ? "pass" : "fail";
        $(".mark", li).textContent = r.ok ? "✓" : "✗";
        if (r.ok) passed++;
        else {
          const detail = t.hidden ? "" : (r.detail || "");
          lastFailures.push(`${t.label}: ${r.message}`);
          li.insertAdjacentHTML("beforeend", `<div class="msg">${esc(t.hidden ? "This is a hidden test. Think about edge cases your code might not handle." : r.message)}${detail ? `<pre>${esc(detail)}</pre>` : ""}</div>`);
        }
      }
      const all = passed === p.tests.length;
      $(".cp-sum", results).textContent = all ? `All ${passed} tests passed. Well done.` : `${passed} of ${p.tests.length} tests passed.`;
      pill.className = "pill " + (all ? "ok" : (isSolved(c, p) ? "ok" : "warn"));
      if (all) { pill.textContent = "Solved"; markSolved(c, p); }
      else if (!isSolved(c, p)) pill.textContent = "Not solved yet";
      if (ranAny && F.hooks.onCode) F.hooks.onCode(c, u, p.id, all);
      busy(false);
    }

    async function run() {
      store.set(draftKey(c, p), ta.value);
      busy(true); results.hidden = true; out.hidden = false;
      out.innerHTML = `<p class="note">Running…</p>`;
      if (!PY.worker) status(loadingText);
      const stdinEl = $(`#in-${CSS.escape(p.id)}`, el);
      const stdin = stdinEl && stdinEl.value !== "" ? stdinEl.value.replace(/\n+$/, "").split("\n") : [];
      let r;
      try { r = await callPython({ type: "run", code: ta.value, stdin }, 5); }
      catch (e) { status(failText); out.innerHTML = `<p class="note">${esc(failText)}</p>`; showExport(); busy(false); return; }
      status("");
      if (r.timeout) out.innerHTML = `<p class="note">Your program ran for more than 5 seconds and was stopped. Is there an infinite loop?</p>`;
      else out.innerHTML = `<div class="eyebrow">Output</div><pre>${esc(r.transcript || "(no output)")}${r.error ? "\n" + esc(r.error) : ""}</pre>${!p.tests.some(t => t.type === "io") ? `<p class="note">This problem's tests call your functions directly, so Run only shows what your file prints. Add a test call at the bottom, such as <code>print(${esc((p.tests.find(t => t.call) || {}).call || "your_function(...)")})</code>, to see a result.</p>` : ""}`;
      busy(false);
    }

    async function showExport() {
      exp.hidden = false;
      let harness = "";
      try { harness = await (await fetch(new URL("app/harness.py", location.href))).text(); } catch {}
      if (!harness) { exp.innerHTML = `<p class="note">The checker file couldn't be loaded here either. Copy your code into a file and test it with the examples in the problem.</p>`; return; }
      const script = `# Checks for "${p.title}" (First Principles CS, ${c.code})\n# Save this file as check_${p.id}.py and run:  python3 check_${p.id}.py\n# Your code is included below as CODE; edit it there, or paste a new version, and run again.\n\n${harness}\n\nCODE = ${JSON.stringify(ta.value)}\n\nTESTS = json.loads(${JSON.stringify(JSON.stringify(p.tests))})\n\nif __name__ == "__main__":\n    import os, tempfile\n    os.chdir(tempfile.mkdtemp())\n    check_all(CODE, TESTS)\n`;
      exp.innerHTML = `<p class="note">Save this as <code>check_${esc(p.id)}.py</code> and run <code>python3 check_${esc(p.id)}.py</code> in a terminal. It contains your current code and every test.</p>
        <div class="cp-actions"><button class="btn small" type="button" data-copy>Copy the check script</button></div><pre class="cp-script">${esc(script)}</pre>`;
      $("[data-copy]", exp).addEventListener("click", async e => {
        const b = e.currentTarget;
        try { await navigator.clipboard.writeText(script); b.textContent = "Copied"; }
        catch { const r = document.createRange(); r.selectNodeContents($(".cp-script", exp)); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = "Selected: press Ctrl+C to copy"; }
      });
    }

    wireEditor(ta, save, check);
    btn("check").addEventListener("click", check);
    btn("run").addEventListener("click", run);
    btn("hint").addEventListener("click", e => { hint.hidden = !hint.hidden; e.currentTarget.setAttribute("aria-expanded", String(!hint.hidden)); });
    btn("reset").addEventListener("click", e => {
      const b = e.currentTarget;
      if (b.dataset.confirm !== "1") { b.dataset.confirm = "1"; b.textContent = "Click again to erase your code"; setTimeout(() => { b.dataset.confirm = ""; b.textContent = "Reset"; }, 4000); return; }
      ta.value = p.starter; store.set(draftKey(c, p), p.starter); b.dataset.confirm = ""; b.textContent = "Reset";
    });
    btn("solution").addEventListener("click", e => {
      const b = e.currentTarget;
      if (!sol.hidden) { sol.hidden = true; b.textContent = "Show a solution"; return; }
      if (b.dataset.confirm !== "1" && !isSolved(c, p)) { b.dataset.confirm = "1"; b.textContent = "Sure? Click again to see it"; setTimeout(() => { b.dataset.confirm = ""; if (sol.hidden) b.textContent = "Show a solution"; }, 4000); return; }
      sol.innerHTML = `<div class="eyebrow">One possible solution</div><pre>${esc(p.solution)}</pre><p class="note">${isSolved(c, p) ? "Compare it with yours: different correct solutions are common." : "Read it, close it, then write your own version from memory. That's how it sticks."}</p>`;
      sol.hidden = false; b.dataset.confirm = ""; b.textContent = "Hide the solution";
    });
    btn("export").addEventListener("click", () => { if (exp.hidden) showExport(); else exp.hidden = true; });
    const ask = btn("ask");
    if (F.canAsk && F.canAsk()) {
      ask.hidden = false;
      ask.addEventListener("click", () => {
        const failing = lastFailures.length ? `\n\nThe checker says:\n${lastFailures.slice(0, 3).map(f => "- " + f).join("\n")}` : "";
        F.askProfessor(`I'm working on the programming problem "${p.title}". Here's my code:\n\n\`\`\`python\n${ta.value}\n\`\`\`${failing}\n\nCan you give me a hint about what to look at, without writing the solution for me?`);
      });
    }
  }

  F.hooks.afterUnit = (c, u, root) => render(c, u, root);
  const r = F.parse();
  if (r.view === "unit") F.render(true);
})();
