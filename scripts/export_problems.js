// Print every programming problem as JSON, for scripts/check_problems.py.
// Loads the data files in the same order as index.html.
// Usage (from the repository root): node scripts/export_problems.js > /tmp/problems.json
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const files = [...html.matchAll(/<script src="(data\/[\w.-]+\.js)"><\/script>/g)].map(m => m[1]);
global.window = {};
for (const f of files) {
  const file = path.join(root, f);
  if (!fs.existsSync(file)) continue;
  eval(fs.readFileSync(file, "utf8"));
  global.CSA = window.CSA;
}
const out = [];
for (const c of Object.values(CSA.courses))
  for (const u of c.units)
    for (const p of u.code || []) out.push({ course: c.id, unit: u.id, ...p });
process.stdout.write(JSON.stringify(out));
