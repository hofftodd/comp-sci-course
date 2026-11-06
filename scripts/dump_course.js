// Print a course as plain text, the way a Year 1 student sees it (Java/C++ blocks removed).
// Usage (from the repository root): node scripts/dump_course.js . <courseId> > course.txt
const fs = require("fs"), path = require("path");
const [root, cid] = process.argv.slice(2);
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
global.window = {};
for (const m of html.matchAll(/<script src="(data\/[\w.-]+\.js)"><\/script>/g)) {
  const f = path.join(root, m[1]); if (fs.existsSync(f)) { eval(fs.readFileSync(f, "utf8")); global.CSA = window.CSA; }
}
const txt = s => s.replace(/<pre data-lang="(java|cpp)">[\s\S]*?<\/pre>/g, "").replace(/<div data-only="(java|cpp)">[\s\S]*?<\/div>/g, "").replace(/<section data-only="(java|cpp)">[\s\S]*?<\/section>/g, "").replace(/<svg[\s\S]*?<\/svg>/g, "[figure]").replace(/<pre[^>]*>/g, "\n```\n").replace(/<\/pre>/g, "\n```\n")
  .replace(/<\/(p|li|h3|h4|tr|figcaption)>/g, "\n").replace(/<h3>/g, "\n### ").replace(/<li>/g, "- ").replace(/<[^>]+>/g, "")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\n{3,}/g, "\n\n");
const c = CSA.courses[cid];
let out = `# ${c.code} ${c.title}\n`;
for (const u of [...c.units, ...c.optional]) {
  out += `\n\n======== ${u.id}: ${u.title} (${u.kind || "core"})\n` + txt(u.notes);
  for (const a of u.asides || []) out += `\n[SIDEBAR ${a.kind}: ${a.title}] ` + txt(a.html);
  (u.quiz || []).forEach((q, i) => out += `\nQ${i + 1}. ${txt(q.q)} | ${q.choices.map(txt).join(" / ")} | ans: ${txt(q.choices[q.answer])}`);
  (u.practice || []).forEach((p, i) => out += `\nP${i + 1}. ${txt(p.q)}`);
  (u.code || []).forEach(p => out += `\nCODE ${p.id}: ${txt(p.prompt)}`);
}
process.stdout.write(out);
