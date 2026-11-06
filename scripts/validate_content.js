// Validate course data: rubric weights, quiz answers, source ids, unique ids, balanced tags, unique SVG ids.
// Usage (from the repository root): node scripts/validate_content.js .
const fs = require("fs"), path = require("path");
const root = process.argv[2];
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const files = [...html.matchAll(/<script src="(data\/[\w.-]+\.js)"><\/script>/g)].map(m => m[1]);
global.window = {};
for (const f of files) { eval(fs.readFileSync(path.join(root, f), "utf8")); global.CSA = window.CSA; }
const D = CSA; let problems = 0;
const bad = m => { problems++; console.log("PROBLEM:", m); };
for (const t of D.program.terms.filter(t => t.open)) for (const cid of t.courses) {
  const c = D.courses[cid]; if (!c) { bad("missing course " + cid); continue; }
  if (!c.units.length) { console.log("note: no units", cid); continue; }
  const w = c.rubric ? c.rubric.assessments.reduce((a, b) => a + b.weight, 0) : 0;
  if (c.rubric && w !== 100) bad(`${cid} rubric weights ${w}`);
  if (!c.rubric) bad(cid + " no rubric");
  const ids = new Set(); const markerIds = [];
  for (const u of [...c.units, ...c.optional]) {
    if (ids.has(u.id)) bad(`${cid} dup id ${u.id}`); ids.add(u.id);
    for (const q of u.quiz || []) if (!(q.answer >= 0 && q.answer < q.choices.length)) bad(`${cid}/${u.id} quiz answer ${q.q}`);
    for (const s of [...(u.sources || []), ...(u.asides || []).flatMap(a => a.sources || [])]) if (!D.sources[s]) bad(`${cid}/${u.id} unknown source ${s}`);
    for (const m of (u.notes || "").matchAll(/id="([^"]+)"/g)) markerIds.push(m[1]);
    if (!u.minutes) bad(`${cid}/${u.id} no minutes`);
    // crude tag balance
    for (const tag of ["p", "ul", "ol", "li", "pre", "code", "table", "figure", "svg", "h3", "em", "strong"]) {
      const o = (u.notes.match(new RegExp(`<${tag}[ >]`, "g")) || []).length, cl = (u.notes.match(new RegExp(`</${tag}>`, "g")) || []).length;
      if (o !== cl) bad(`${cid}/${u.id} <${tag}> ${o} open vs ${cl} close`);
    }
    for (const p of u.practice || []) for (const k of ["q", "a"]) for (const tag of ["p", "pre", "code", "em"]) {
      const o = (p[k].match(new RegExp(`<${tag}[ >]`, "g")) || []).length, cl = (p[k].match(new RegExp(`</${tag}>`, "g")) || []).length;
      if (o !== cl) bad(`${cid}/${u.id} practice ${k} <${tag}> ${o}/${cl}`);
    }
  }
  console.log(cid, "units", c.units.length, "optional", c.optional.length, "minutes", c.units.reduce((a, u) => a + u.minutes, 0),
    "words", c.units.reduce((a, u) => a + u.notes.replace(/<[^>]+>/g, " ").split(/\s+/).length, 0), "markers", markerIds.join(","));
}
const allMarkers = Object.values(D.courses).flatMap(c => [...c.units, ...c.optional]).flatMap(u => [...(u.notes || "").matchAll(/<(?:marker|clipPath)[^>]*id="([^"]+)"/g)].map(m => m[1]));
const dups = allMarkers.filter((x, i) => allMarkers.indexOf(x) !== i); if (dups.length) bad("dup marker ids " + dups);
console.log(problems ? problems + " problems" : "all good");
