// Extract every Python code block shown to students (notes, sidebars, practice answers) as JSON.
// Usage (from the repository root): node scripts/extract_lesson_code.js . > /tmp/blocks.json
const fs = require("fs"), path = require("path");
const root = process.argv[2];
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
global.window = {};
for (const m of html.matchAll(/<script src="(data\/[\w.-]+\.js)"><\/script>/g)) {
  const f = path.join(root, m[1]); if (fs.existsSync(f)) { eval(fs.readFileSync(f, "utf8")); global.CSA = window.CSA; }
}
const dec = s => s.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
const out = [];
for (const c of Object.values(CSA.courses)) {
  for (const u of [...c.units, ...c.optional]) {
    const sources = [["notes", u.notes || ""], ...(u.asides || []).map((a, i) => [`aside${i}`, a.html]), ...(u.practice || []).map((p, i) => [`P${i + 1}`, p.a || ""])];
    for (const [where, h] of sources) {
      const clean = h.replace(/<pre data-lang="(java|cpp)">[\s\S]*?<\/pre>/g, "").replace(/<div data-only="(java|cpp)">[\s\S]*?<\/div>/g, "");
      let i = 0;
      for (const m of clean.matchAll(/<pre([^>]*)>([\s\S]*?)<\/pre>/g)) {
        const label = (m[1].match(/data-label="([^"]*)"/) || [])[1] || "";
        out.push({ course: c.id, unit: u.id, where, n: i++, label, code: dec(m[2]) });
      }
    }
  }
}
process.stdout.write(JSON.stringify(out));
