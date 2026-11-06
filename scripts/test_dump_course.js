// Tests for scripts/dump_course.js: the text it prints must match what students see on the page.
// Each check guards against a past bug that made student-review agents report problems that
// weren't in the course. Usage (from the repository root): node scripts/test_dump_course.js
const { execFileSync } = require("child_process");
const path = require("path");
const root = path.join(__dirname, "..");
const dump = id => execFileSync("node", [path.join(__dirname, "dump_course.js"), root, id], { encoding: "utf8", maxBuffer: 64 << 20 });

const courses = ["cs101", "math120", "math130", "cs100", "cs102", "math121", "math131", "phys150"];
const text = Object.fromEntries(courses.map(id => [id, dump(id)]));
let failed = 0;
const check = (name, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok || !detail ? "" : `\n      ${detail}`}`);
  if (!ok) failed++;
};
const all = Object.values(text).join("\n");
const prose = all.replace(/```[\s\S]*?```/g, "");   // code blocks may show HTML on purpose (CS 100 accessibility)
const firstMatch = (re) => { const m = all.match(re); return m ? JSON.stringify(m[0]) : ""; };

// 1. Superscripts and subscripts survive (bug: "2n" for 2ⁿ, "Σi=14" for a sum from 1 to 4).
check("superscript n renders as ⁿ", text.math120.includes("2ⁿ"));
check("sum limits render as subscript and superscript", /Σᵢ₌₁[⁰-⁹ⁿ]/.test(text.math130));
check("superscript letters render as Unicode (bug: n^(r))", text.math121.includes("nʳ") && !/\^\([a-z]\)/.test(all), firstMatch(/\^\([a-z]\)/));
check("negative exponents render (10⁻¹)", all.includes("10⁻¹"));

// 2. Code keeps its blank lines (bug: two blank lines collapsed to one, so line numbers looked wrong).
const mypy = text.cs102.match(/class Inventory:[\s\S]*?print\(inv\.count\(42\)\)/);
check("code keeps two consecutive blank lines", !!mypy && /\n\n\ninv = Inventory\(\)/.test(mypy[0]));

// 3. Key terms are included and printed as plain text (bug: "< 1 ... >" stripped as if it were a tag).
check("key terms are included", (all.match(/^Key terms:$/gm) || []).length >= 40);
check("key term with < and > is intact", text.math131.includes("L < 1 the series converges; L > 1 diverges"));

// 4. Bold vector symbols are marked (bug: bold dropped, so v and **v** looked the same).
check("bold vectors appear as **v**", text.phys150.includes("**v**"));

// 5. Hints are included.
check("practice and problem hints are included", (all.match(/^\s+Hint: /gm) || []).length >= 50);

// 6. Hidden Java and C++ material is left out (Year 1 students see only Python).
check("no Java or C++ code leaks through", !/System\.out\.print|std::(cout|cin|string)/.test(all), firstMatch(/.{0,40}(System\.out\.print|std::(cout|cin|string)).{0,20}/));

// 7. No markup or entities leak through.
check("no HTML tags remain outside code blocks", !/<\/?(p|strong|em|sub|sup|code|pre|div|span|table|td|th|li|ul|ol|figure|svg|a)( [^>]*)?>/.test(prose), firstMatch(/.{0,30}<\/?(p|strong|em|sub|sup|code|pre|div|span|table|td|th|li|ul|ol|figure|svg|a)( [^>]*)?>.{0,30}/));
check("no HTML entities remain", !/&(nbsp|lt|gt|amp|quot|#\d+);/.test(all), firstMatch(/.{0,30}&(nbsp|lt|gt|amp|quot|#\d+);.{0,30}/));

// 8. Tables keep their columns, and figures keep their descriptions.
check("table cells are separated", /\| .+ \| .+ \|/.test(text.math120));
check("figures show their description", /\[figure: [^\]]{20,}\]/.test(all));

// 9. Quizzes, practice and programming problems are all present.
for (const id of courses) {
  const t = text[id];
  check(`${id}: lessons, quizzes and practice present`, /^======== /m.test(t) && /^Q1\. /m.test(t) && /^P1\. /m.test(t));
}
check("programming problems are marked CODE", /^CODE \w+: /m.test(text.cs101) && /^CODE \w+: /m.test(text.cs102) && /^CODE \w+: /m.test(text.phys150));

console.log(failed ? `\n${failed} check(s) failed.` : "\nAll checks passed.");
process.exit(failed ? 1 : 0);
