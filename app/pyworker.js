/* Runs student Python in a Web Worker with Pyodide, so the page stays responsive and a
   runaway loop can be stopped by terminating the worker.
   Messages in:  {id, type: "run", code, stdin}   {id, type: "check", code, test}
   Messages out: {type: "ready"} | {type: "failed", message} | {id, result}            */
const PYODIDE_VERSION = "0.26.4";
let py = null;

async function start() {
  const local = new URL("../vendor/pyodide/", self.location.href).href;
  let base = local;
  try {
    importScripts(local + "pyodide.js");
  } catch (e) {
    base = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
    importScripts(base + "pyodide.js");
  }
  const options = { indexURL: base, stdout: () => {}, stderr: () => {} };
  // The local copy of the standard library is named .zip.wasm (see scripts/get-pyodide.sh).
  if (base === local) options.stdLibURL = local + "python_stdlib.zip.wasm";
  py = await loadPyodide(options);
  const harness = await (await fetch(new URL("harness.py", self.location.href))).text();
  py.FS.writeFile("/home/pyodide/fpcs_harness.py", harness);
  py.runPython("import sys; sys.path.insert(0, '/home/pyodide'); import fpcs_harness");
}

/* Standard-library modules that Pyodide ships as separate packages (only sqlite3 is used, by
   CS 340). Loaded the first time code imports one. The archive is fetched from vendor/pyodide/
   under a .wasm name (some hosts, such as claude.ai artifacts, won't serve .zip files; see
   scripts/get-pyodide.sh), else from the CDN, and unpacked into site-packages; unpackArchive
   also loads the shared library inside it. */
const EXTRA = { sqlite3: "sqlite3-1.0.0.zip" };
const loaded = new Set();
async function loadExtras(code) {
  for (const [name, file] of Object.entries(EXTRA)) {
    if (loaded.has(name) || !new RegExp(`\\b(import|from)\\s+${name}\\b`).test(code)) continue;
    const urls = [new URL(`../vendor/pyodide/${file}.wasm`, self.location.href).href,
                  `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/${file}`];
    let buf = null;
    for (const u of urls) {
      try { const r = await fetch(u); if (r.ok) { buf = await r.arrayBuffer(); break; } } catch (e) {}
    }
    if (!buf) throw new Error(`couldn't download ${name}`);
    const site = py.runPython("import site; site.getsitepackages()[0]");
    await py.unpackArchive(buf, "zip", { extractDir: site });
    py.runPython("import importlib; importlib.invalidate_caches()");
    loaded.add(name);
  }
}

const ready = start().then(
  () => self.postMessage({ type: "ready" }),
  err => self.postMessage({ type: "failed", message: String(err && err.message || err) })
);

self.onmessage = async ({ data }) => {
  await ready;
  if (!py) return self.postMessage({ id: data.id, result: { error: "Python isn't available." } });
  const h = py.globals.get("fpcs_harness") || py.pyimport("fpcs_harness");
  try { await loadExtras(data.code + (data.test ? JSON.stringify(data.test) : "")); }
  catch (e) { return self.postMessage({ id: data.id, result: { ok: false, error: String(e), message: "Couldn't load a Python module this code needs.", detail: String(e) } }); }
  try {
    const out = data.type === "run"
      ? h.run(data.code, JSON.stringify(data.stdin || []))
      : h.check(data.code, JSON.stringify(data.test));
    self.postMessage({ id: data.id, result: JSON.parse(out) });
  } catch (e) {
    self.postMessage({ id: data.id, result: { ok: false, error: String(e), message: "Python failed unexpectedly.", detail: String(e) } });
  }
};
