// Estimate how long each core lesson takes a student, to keep lessons near their 90-minute budget.
// Two models, so you can see the range:
//   typical: prose 150 words/min, code and display math 60 words/min, quiz 1 min/question, practice 6 min/problem
//   slow:    prose 100 words/min, code and display math 40 words/min, quiz 1 min/question, practice 10 min/problem
// Notes and sidebars are counted; hidden Java/C++ blocks and figures aren't. Programming problems are homework
// and aren't counted. A lesson whose slow estimate is over 100 minutes is a candidate to split (see CLAUDE.md).
// Usage (from the repository root): node scripts/lesson_time.js . [--long]   (--long lists only the candidates)
const fs = require("fs"), path = require("path");
const root = process.argv[2] || ".";
const onlyLong = process.argv.includes("--long");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
global.window = {};
for (const m of html.matchAll(/<script src="(data\/[\w.-]+\.js)"><\/script>/g)) {
  const f = path.join(root, m[1]); if (fs.existsSync(f)) { eval(fs.readFileSync(f, "utf8")); global.CSA = window.CSA; }
}
const words = s => (s.match(/\S+/g) || []).length;
const visible = s => s
  .replace(/<pre data-lang="(java|cpp)">[\s\S]*?<\/pre>/g, "")
  .replace(/<div data-only="(java|cpp)">[\s\S]*?<\/div>/g, "")
  .replace(/<section data-only="(java|cpp)">[\s\S]*?<\/section>/g, "")
  .replace(/<svg[\s\S]*?<\/svg>/g, " ");
function estimate(u) {
  const h = visible([u.notes || "", ...(u.asides || []).map(a => a.html)].join("\n"));
  const code = words([...h.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>|<p class="math">([\s\S]*?)<\/p>/g)].map(m => (m[1] || m[2]).replace(/<[^>]+>/g, " ")).join(" "));
  const prose = words(h.replace(/<pre[^>]*>[\s\S]*?<\/pre>|<p class="math">[\s\S]*?<\/p>/g, " ").replace(/<[^>]+>/g, " "));
  const q = (u.quiz || []).length, p = (u.practice || []).length;
  return { words: prose + code, typical: Math.round(prose / 150 + code / 60 + q + 6 * p), slow: Math.round(prose / 100 + code / 40 + q + 10 * p) };
}
const rows = [];
for (const t of CSA.program.terms.filter(t => t.open)) for (const cid of t.courses) {
  const c = CSA.courses[cid];
  c.units.forEach((u, i) => rows.push({ course: c.code, n: i + 1, id: u.id, title: u.title, budget: u.minutes, ...estimate(u) }));
}
const long = r => r.slow > 100;
console.log("Course     #  Lesson                                            Words  Typical  Slow  Budget");
for (const r of rows.filter(r => !onlyLong || long(r)))
  console.log(`${r.course.padEnd(10)} ${String(r.n).padStart(2)}  ${(r.id + " " + r.title).slice(0, 46).padEnd(46)} ${String(r.words).padStart(6)} ${String(r.typical).padStart(8)} ${String(r.slow).padStart(5)} ${String(r.budget).padStart(7)}${long(r) ? "  <- long" : ""}`);
console.log(`\n${rows.length} core lessons; ${rows.filter(long).length} over 100 minutes in the slow estimate.`);
