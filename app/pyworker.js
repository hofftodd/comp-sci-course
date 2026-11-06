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

const ready = start().then(
  () => self.postMessage({ type: "ready" }),
  err => self.postMessage({ type: "failed", message: String(err && err.message || err) })
);

self.onmessage = async ({ data }) => {
  await ready;
  if (!py) return self.postMessage({ id: data.id, result: { error: "Python isn't available." } });
  const h = py.globals.get("fpcs_harness") || py.pyimport("fpcs_harness");
  try {
    const out = data.type === "run"
      ? h.run(data.code, JSON.stringify(data.stdin || []))
      : h.check(data.code, JSON.stringify(data.test));
    self.postMessage({ id: data.id, result: JSON.parse(out) });
  } catch (e) {
    self.postMessage({ id: data.id, result: { ok: false, error: String(e), message: "Python failed unexpectedly.", detail: String(e) } });
  }
};
