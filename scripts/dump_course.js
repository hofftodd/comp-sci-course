// Print a course as plain text, the way a Year 1 student sees it (Java/C++ blocks removed).
// Superscripts and subscripts are kept (as Unicode where possible, otherwise ^(...) and _(...)),
// table cells are separated with " | ", and figures appear as [figure: description].
// Usage (from the repository root): node scripts/dump_course.js . <courseId> > course.txt
const fs = require("fs"), path = require("path");
const [root, cid] = process.argv.slice(2);
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
global.window = {};
for (const m of html.matchAll(/<script src="(data\/[\w.-]+\.js)"><\/script>/g)) {
  const f = path.join(root, m[1]); if (fs.existsSync(f)) { eval(fs.readFileSync(f, "utf8")); global.CSA = window.CSA; }
}

const SUP = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  "+": "⁺", "-": "⁻", "−": "⁻", "=": "⁼", "(": "⁽", ")": "⁾", "n": "ⁿ", "i": "ⁱ", "x": "ˣ", "k": "ᵏ", "m": "ᵐ", "t": "ᵗ", " ": "" };
const SUB = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
  "+": "₊", "-": "₋", "−": "₋", "=": "₌", "(": "₍", ")": "₎", "n": "ₙ", "i": "ᵢ", "x": "ₓ", "k": "ₖ", "m": "ₘ", "t": "ₜ", "a": "ₐ", "e": "ₑ", " ": "" };
const script = (s, map, mark) => {
  const plain = s.replace(/<[^>]+>/g, "");
  return [...plain].every(ch => ch in map) ? [...plain].map(ch => map[ch]).join("") : `${mark}(${plain})`;
};

const txt = s => s
  .replace(/<pre data-lang="(java|cpp)">[\s\S]*?<\/pre>/g, "")
  .replace(/<div data-only="(java|cpp)">[\s\S]*?<\/div>/g, "")
  .replace(/<section data-only="(java|cpp)">[\s\S]*?<\/section>/g, "")
  .replace(/<svg[^>]*aria-label="([^"]*)"[\s\S]*?<\/svg>/g, "[figure: $1]")
  .replace(/<svg[\s\S]*?<\/svg>/g, "[figure]")
  .replace(/<sup>([\s\S]*?)<\/sup>/g, (_, s) => script(s, SUP, "^"))
  .replace(/<sub>([\s\S]*?)<\/sub>/g, (_, s) => script(s, SUB, "_"))
  .replace(/<pre[^>]*>/g, "\n```\n").replace(/<\/pre>/g, "\n```\n")
  .replace(/<\/t[dh]>/g, " | ")
  .replace(/<\/(p|li|h3|h4|tr|figcaption|thead|tbody)>/g, "\n").replace(/<h3>/g, "\n### ").replace(/<h4>/g, "\n#### ").replace(/<li>/g, "- ")
  .replace(/<[^>]+>/g, "")
  .replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&")
  .replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n");

const c = CSA.courses[cid];
let out = `# ${c.code} ${c.title}\n`;
for (const u of [...c.units, ...c.optional]) {
  out += `\n\n======== ${u.id}: ${u.title} (${u.kind || "core"})\n` + txt(u.notes);
  for (const a of u.asides || []) out += `\n[SIDEBAR ${a.kind}: ${a.title}] ` + txt(a.html);
  (u.quiz || []).forEach((q, i) => out += `\nQ${i + 1}. ${txt(q.q)} | ${q.choices.map(txt).join(" / ")} | ans: ${txt(q.choices[q.answer])}`);
  (u.practice || []).forEach((p, i) => out += `\nP${i + 1}. ${txt(p.q)}`);
  (u.code || []).forEach(p => out += `\nCODE ${p.id}: ${txt(p.prompt)}`);
}
process.stdout.write(out + "\n");
