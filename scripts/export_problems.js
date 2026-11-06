// Print every programming problem as JSON, for scripts/check_problems.py.
// Usage (from the repository root): node scripts/export_problems.js > /tmp/problems.json
const fs = require("fs");
const path = require("path");
global.window = {};
const dataDir = path.join(__dirname, "..", "data");
for (const f of ["program", "cs101", "cs101-code"]) {
  eval(fs.readFileSync(path.join(dataDir, f + ".js"), "utf8"));
  global.CSA = window.CSA;
}
const out = [];
for (const c of Object.values(CSA.courses))
  for (const u of c.units)
    for (const p of u.code || []) out.push({ course: c.id, unit: u.id, ...p });
process.stdout.write(JSON.stringify(out));
