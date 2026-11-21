# Student review: Year 4 Spring

*Round 6, part A (CS 491, CS 450). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a fourth-year student. Before this term I completed CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240, PHYS 250, CS 310, CS 320, CS 340, CS 350, CS 330, CS 360, CS 365, CS 370, CS 380, CS 410, CS 490, CS 430 and CS 470. This term I read all of CS 491 Capstone Project II (8 lessons) and CS 450 Formal Methods and Verification (6 lessons) in order. I worked the quizzes and practice problems in my head and redid the arithmetic in the notes where I could by hand. Most numbers checked out: the PERT sums and probabilities, the Wald and adjusted Wald intervals, Erlang C, the coordinated-omission percentiles, the burn-rate fractions, the power and sample-size figures, the WebPA scores, and the Tseitin, DPLL and timetable counts. The items below are the places where I actually got stuck.

### CS 491 Capstone Project II

#### cx2: Iterating with users

1. "These are eight returning households in a beta session, timed by an observer as NFR-1 defines it ..., so they can be compared with the prototype's 95th percentile of 35 seconds (Lesson 1)." After this the lesson never makes the comparison, and it reports only the mean, median and geometric mean of the eight times. NFR-1 is stated as a 95th percentile. Using the nearest-rank rule from Lesson 1, the 95th percentile of these eight times is the largest one, 58 s. That is worse than the prototype's 35 s and the 30 s target. So I can't tell whether the beta improved check-in against NFR-1 or made it worse. I also can't tell whether a geometric mean can be compared with a 95th percentile at all.

#### cx3: Performance and scaling

2. P1: "Using the notes' assumptions (half tap within a minute, about 10 requests per page load), estimate the peak request rate ... how many servers (plus one spare) are needed?" The notes work out 33 requests per second for one pantry, then say "Round up to 40." I don't know whether to multiply 33 or 40 by 14, and the two give different server counts. 14 × 33 ≈ 467/s gives 10 servers plus a spare. 14 × 40 = 560/s gives 12 plus a spare.

#### cx5: Maintaining the system

3. The notes' constraint table writes an exact version as "==1.4.2 or 1.4.2", and it also lists Python's "~=1.4.2". The semver_resolve problem's language instead has "=V or a bare V (exactly V)", with no "==" and no "~=". I don't know whether my satisfies should accept "==1.4.2" and "~=1.4.2", since the notes present them as common forms, or reject them as malformed.

### CS 450 Formal Methods and Verification

#### fm4: Model checking concurrent systems

4. P1: "Why does the checker find only 20 reachable states?" I got as far as seeing that each flag is fixed by its thread's pc (a flag is up exactly when the pc is 1, 2 or 3). That gives 4 × 4 × 2 = 32 combinations, minus the two with both threads at pc 3, which leaves 30. I could find a couple more unreachable ones by reasoning about turn: thread 0 at 3 with thread 1 at 2 and turn = 1, and the mirror case. But I couldn't get down to exactly 20 without listing every state. The notes give the number 20 but don't explain which states are unreachable or why, so I couldn't fully answer the question from the lesson.

### Across courses

5. CS 491 cx8: "The ACM Code of Ethics (CS 100 Lesson 3), which CS 480 Ethics, Law and Policy of Computing (required, and taken alongside this course) examines in depth ..." My courses this term are CS 491 and CS 450 only. CS 480 isn't one of them, and it isn't among the courses I've already completed. So this sentence contradicts my course list, and I don't know whether I'm supposed to be taking CS 480 this term or when it fits into the degree.

## Professor's response (part A: CS 491, CS 450)

1. **Correct; fixed (cs491 cx2).** I ran the beta times: sorted, they are 19, 20, 21, 22, 24, 26, 28, 58, and the nearest-rank 95th percentile is position ⌈95 × 8/100⌉ = 8, which is 58 s. Only 7 of the 8 are within 30 s. The paragraph now says that the mean, median and geometric mean describe the typical check-in, not the tail, so they can't be compared with NFR-1's 95th percentile. It then makes the comparison with a checked code line (`# 58 7`): 58 s is worse than the prototype's 35 s and the 30 s target, though inside the 60 s constraint. It also explains why eight samples are too few to judge. For every *n* up to 19, ⌈0.95*n*⌉ = *n* (checked for *n* = 1 to 39), so the 95th percentile is just the slowest attempt and one household decides it. The prototype's 35 s came from 20 check-ins (CS 490 Lesson 7). The verdict on NFR-1 comes from the evaluation's whole-Saturday observer timings (Lesson 6), and Lesson 8 reports them: a 95th percentile of 33 s, still over target. This matches Lessons 1, 6 and 8 and CS 490. While doing this I also fixed a stale quiz explanation in the same lesson. It cited "one 120-second attempt raises the mean to 54.5 s while the median is 45.5 s", which matches no example in the notes. It now reads "one 58-second check-in raises the mean to 27.25 s while the median is 23 s".

2. **Correct; fixed (cs491 cx3 P1).** The prompt now says to scale the unrounded per-pantry figure of about 33 requests per second, not the 40 that the notes round up to for one pantry. The answer still works through 14 × 2,000/60 ≈ 467/s; 467/48 ≈ 9.72, so 10 servers plus a spare, 11. It adds in parentheses that scaling 40 instead gives 560/s and 12 servers plus a spare, a more cautious plan. I checked all of these figures, and the two-hour spread (≈ 3.9/s).

3. **Correct; fixed (cs491 cx5, semver_resolve).** The problem's language now includes the notes' forms. `==V` means exactly V, along with `=V` and a bare `V`. Python's `~=V` means the same range as `~V`, because every version here has three parts. The prompt says explicitly that the notes' two-part `~=1.4` is malformed in this problem. I changed the reference solution in `c491/parts.json` (it checks `~=` before `~` and `==` before `=`), edited the prompt in `cs491_spec.py`, and added three tests. A visible test, "Python's == and ~= forms", expects `[True, False, True, False, False, True]`. Two hidden raises tests cover `~=1.4` and `===1.4.2`. The old solution fails the new visible test, so the tests pin the behaviour. In the notes, the table's exact-version row now reads "`==1.4.2` (Python), `=1.4.2` or `1.4.2` (npm)". I regenerated `data/cs491-code.js`: "0 problem(s) need attention". In Pyodide, all 136 tests print "ok".

4. **Fair; fixed (cs450 fm4).** I ran a BFS over the lesson's `peterson` model exactly as written. It found 20 reachable states, and in every one each flag equals "pc is 1, 2 or 3". I then built the predicted set from the hand argument: 32 combinations of pcs and `turn`, minus 8 (one thread at pc 2 or 3 and the other at pc 0 or 1 forces `turn` = 1 − *i*), minus 2 (pc pairs (2, 3) and (3, 2) force `turn` to the waiting thread's write), minus 2 (both at 3). It equals the BFS set exactly. Changes:
   - P1 now has a hint that the student sees: flags are fixed by the pcs, then ask which thread wrote `turn` last, with the two facts needed to answer that.
   - The worked answer is now a three-case list. Each case has the short argument the old answer skipped: why the other thread can't have written `turn` since, and why both orders of events in the (2, 3) case give `turn` = 1. It also says that both at pc 2 occurs with either value.
   - The notes' sentence "20 reachable states" now adds "(of 128 combinations of values; the first practice problem works out by hand which ones and why)".

5. **No change needed.** CS 480 Ethics, Law and Policy of Computing is a real required course in Year 4 Spring, taken alongside CS 491 and CS 450. This review round was split by course, so this part only covered CS 491 and CS 450, and the student's list showed only those two. The sentence in cx8 is accurate.

### Checks

- `node --check` on data/cs491.js, data/cs491-code.js and data/cs450.js: all pass.
- `validate_content.js`: all good.
- `check_problems.py`: 407 problems, 0 problems found.
- `check_lesson_code.py`: no cs491 or cs450 lines. The only mismatches are the 30 known cs101/cs102 false alarms. The new `# 58 7` block is executed and matches.
- `lesson_time.js`: 0 lessons over 100 minutes in the slow estimate (cx2 71, cx3 79, cx5 68, fm4 80).
- `test_dump_course.js`: all checks passed.
- Pyodide run of cs491-code.js: only "ok" lines (136).

---

# Student review: Year 4 Spring

*Round 6, part B (CS 480). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a fourth-year computer science student. I have taken the full core sequence through CS 490 Capstone Project I, CS 430 Advanced Algorithms and CS 470 Deep Learning, plus the math (discrete math, calculus, linear algebra, probability and statistics), physics and writing courses. I can program comfortably in Python, and I know the ethics and law that CS 100, CS 102, CS 380 and CS 490 covered, but I have no legal training. This term my only course is CS 480 Ethics, Law and Policy of Computing. I worked through all eight lessons in order and tried every quiz question and practice problem. Most of the numbers checked out when I worked them myself. Nothing below was blocking. The items are the places where I got confused.

### CS 480 Ethics, Law and Policy of Computing

#### et2: Intellectual property and software licenses

1. "So you may reimplement an algorithm you read in CLRS". CLRS is never expanded. I'm guessing it means a particular algorithms textbook, but neither this lesson nor the lesson text I have says which one.

2. "When your program includes code under several licenses, you must satisfy all of them at once, and the program as a whole goes out under one outbound license." This seems to clash with the MPL bullet: "changes to MPL files stay MPL, but the larger work can be under any license". It also clashes with MIT and BSD code keeping its notices. If MPL files stay MPL inside the program, I don't see how the whole program goes out under a single license.

3. "its License List gives each common license a short identifier, such as MIT or Apache-2.0, and its expressions combine them (such as MIT OR Apache-2.0, … which lets programs under any license link to the library without becoming GPL) and check a dependency graph against a compatibility table." I couldn't parse this sentence. As written it says SPDX expressions "check a dependency graph", but I think that phrase belongs to "The programming problems parse…" at the start of the paragraph. It's also the first time "link" appears, and this lesson never says what linking means for licensing.

4. "The settlement covered only the roughly 482,000 pirated books that met the class's criteria". "The class" is used here with no explanation. The idea of a class action is only explained later, in Lesson 4: "an ordinary class action includes everyone in the class unless they opt out".

5. "dependencies(root, packages): the set of all packages reachable from root, not including root itself (unless a cycle leads back to it, in which case it is still excluded)." The phrase "not including root… unless…, in which case it is still excluded" contradicts itself. I had to read it several times to decide that root is always excluded.

#### et3: Privacy law and privacy engineering

6. "The Commission also proposed amending the GDPR in a November 2025 "Digital Omnibus" (a separate proposal from the "Digital Omnibus on AI" of the same month, which was adopted quickly and is covered in Lesson 8; this one includes redefining personal data relative to who holds it: …)". The nested parentheses run on for several clauses. I lost track of which omnibus "this one" refers to. I also couldn't tell which of the two proposals had been adopted and which was still under negotiation.

7. In the retention problem: "delete_on(record, rules): … Raise KeyError if its category has no rule". The prompt doesn't say whether due and schedule should also raise KeyError when a record's category has no rule, or skip that record. For schedule in particular, it says "for every record not under hold", so I didn't know what to do with a record that has no rule.

#### et5: Safety, liability and software failure

8. The table says "DO-178C (2011) | DAL (design assurance level)". The next paragraph says "DAL development assurance level (DO-178C itself says "software level")". These give two different expansions of DAL.

9. "Each step down means a less severe consequence or a lower tolerated failure rate, and less required rigor." This seems backwards to me. A less critical level (for example SIL 1 rather than SIL 4) should tolerate a higher failure rate, not a lower one.

#### et6: Security law: computer crime, circumvention and disclosure

10. "Andrew Auernheimer's 2012 conviction … was vacated in 2014 for being tried in the wrong venue". "Venue" isn't explained. Lesson 1 explained districts and circuits, but it never said that a case has to be tried in a particular place, or why trying it in the wrong one would void a conviction.

#### et7: Speech, platforms and content moderation

11. "awarded a young woman $6 million, half of it punitive damages". "Punitive damages" isn't defined. Lesson 2 defined statutory damages, but I don't know how punitive damages differ from those or from actual damages.

#### et8: AI governance, accessibility law and making policy

12. P1(a): "a chatbot, launched on a bank's website in 2027 … give the date from which its main obligations apply to it". The transparency row of the table says 2 August 2026, but this system launches in 2027. I wasn't sure whether the answer should be the table's date or the launch date.

13. a11y_audit, "input-label": "an <input> (other than type hidden, submit, button, reset or image)". The prompt says "Tag and attribute names are case-insensitive (the parser lowercases them)". It doesn't say whether attribute values such as type="HIDDEN" should also be compared case-insensitively, and the example shows that the parser leaves values as written.

### Across courses

No further items. Every cross-course reference I checked (CS 100 Lessons 3–6, CS 102, CS 370 Lessons 5 and 8, CS 380 Lessons 3 and 8, CS 470 Lesson 6, CS 490 Lesson 7, MATH 230) gave enough of a recap in the lesson for me to follow it.

## Professor's response (part B: CS 480)

1. **CLRS (et2).** Expanded at first use: "CLRS (Cormen, Leiserson, Rivest and Stein's textbook *Introduction to Algorithms*)".

2. **"One outbound license" (et2).** Rewrote the sentence. You must satisfy every license at once. Each component keeps its own license: MIT and BSD code keeps its notices, and MPL files stay MPL. A copyleft license such as the GPL goes further: distributing a program that contains GPL code requires the program as a whole to be distributed under the GPL. "Outbound license" is now defined (in bold) as the license the combined program is distributed under, which every component's license must allow. This is the term the quiz and the license_graph problem use.

3. **SPDX sentence and linking (et2).** Split the long sentence into plain sentences: what SPDX is, identifiers, `OR` (choose either), `AND` (follow both), and `WITH` (license plus exception). The sentence about the programming problems ("parse SPDX expressions and check a dependency graph against a compatibility table") is now separate. Added a short explanation of *linking*: static or dynamic combination of compiled code, with a pointer to CS 210 Lesson 8. In the Free Software Foundation's view, a program linked with a GPL library is a single combined work covered by the GPL, which is why the Classpath exception exists (it lets programs under any license link). The LGPL builds the same idea into the license: programs under any license may link, provided users can replace the library. The LGPL row in the problem's table now has lesson support.

4. **"The class" (et2).** Defined *class action* (in bold) and *class* where Bartz v. Anthropic is first described: a few named authors sue on behalf of a whole group with the same kind of claim, and a settlement binds and pays that group.

5. **dependencies prompt (et2 license_graph).** The sentence now says "never including `root` itself. Leave `root` out even when a cycle leads back to it." The existing "Cycles" test already pins this (b → app). Regenerated.

6. **The two omnibuses (et3).** Replaced the nested parentheses with plain sentences. In November 2025 the Commission proposed two separate Digital Omnibus laws. The Digital Omnibus on AI amends the AI Act; it was adopted in 2026 (Regulation 2026/1744, in force 27 July 2026) and is covered in Lesson 8. The data-protection Digital Omnibus would amend the GDPR; as of November 2026 it was still being negotiated. Its most disputed change, the relative definition of personal data, is then stated, and the existing text continues: the Council's position dropped it, and the Parliament had not yet adopted a position. Verified by web search: the AI Omnibus was published in the OJ on 24 July 2026 and entered into force three days later. Law-firm and IAPP reports from Oct–Nov 2026 say the Council's mandate rejects the change to Article 4(1) and that the Parliament has no position yet.

7. **retention: rules for due/schedule (et3).** Added to the prompt: check holds first. A held record is skipped without looking up its rule, so a held record with no rule is not an error. `due` and `schedule` raise `KeyError` for any unheld record whose category has no rule; they don't skip it. This is what the reference solution does. Added tests: `schedule` raises `KeyError`, and `due`/`schedule` with the rule-less record held (by category, and by id) return the other record without raising.

8. **DAL expansion (et5).** Searched DO-178C terminology. DO-178C's own term is "software level". "Development assurance level" is ARP4754A's term; ARP4754A replaced the older "design assurance level" and calls the item level IDAL. The table now says "development assurance level", matching the paragraph, which keeps the note that DO-178C itself says "software level".

9. **Inverted failure-rate statement (et5).** This was a real error. It now reads: "Each step down the list means a less severe consequence of failure, so a higher failure rate is tolerated and less rigor is required." Added a concrete IEC 61508 example for continuous (high-demand) mode: SIL 4 is below 10⁻⁸ dangerous failures per hour and SIL 1 is below 10⁻⁵. I checked every other integrity-level statement in et5 for the same inversion: the table ("most critical first": SIL 4…1, DAL A…E, ASIL D…A, Class C…A), the DO-178C A–E effects, the IEC 62304 classes, and "level A … MC/DC". All are correctly oriented. The quiz and practice items in et5 make no level-ordering claims.

10. **Venue (et6).** Defined *venue* (the place of trial) and *vacated* (set aside). The Constitution requires a federal crime to be tried in a district where it was committed. Auernheimer was tried in New Jersey although neither he, his co-defendant nor AT&T's servers were there (United States v. Auernheimer, 3d Cir. 2014). The appeals court never ruled on authorization.

11. **Punitive damages (et7).** Added one sentence. *Actual* (compensatory) damages repay real losses. **Punitive damages** are added on top to punish especially bad conduct and deter it. Statutory damages (Lesson 2) are a fixed amount set by statute in place of proven losses.

12. **AI Act P1(a) (et8).** The question now states the rule: an obligation that already applies when a system is first placed on the market binds it from that day, so for such a system the answer is "from its launch" rather than a date. Item (a) now says "first placed on the market … in 2027". The answer cites the rule. Article 50(1) applies from 2 August 2026 under Article 113, and the Digital Omnibus on AI left that date unchanged for this duty, so the chatbot must comply from its launch. The Omnibus's 2 December 2026 date covers only marking the output of generative systems placed on the market before 2 August 2026, so it doesn't concern this chatbot. Verified by web search: CMS, Freshfields and Lewis Silkin summaries of the adopted Omnibus say the marking grace period applies only to systems already on the market, and Articles 50(1), (3) and (4) keep their original date. One firm reported 2 December 2027, but that conflicts with the others and appears to confuse this date with the high-risk deferral.

13. **type value case (et8 a11y_audit).** Added to the prompt: the parser leaves attribute values as written. Compare the `type` value case-insensitively, as browsers do (`type="HIDDEN"` is hidden), and treat a missing `type` as `text`. Compare `id` and `for` values exactly. These are the rules the reference solution uses. Added a test that pins them: `type="HIDDEN"` and `TYPE="Submit"` give no finding, `type="TEXT"` gives one, and `<label for="Q">` does not label `id="q"`.

**Checks.** `node --check` passes on data/cs480.js and data/cs480-code.js. gen_code reported 0 problems after regenerating data/cs480-code.js from cs480_spec.py, and the Pyodide run (pyrun.mjs) printed only "ok" lines. validate_content: all good. check_problems: 407 problems, 0 problems found. check_lesson_code: no cs480 lines. lesson_time: CS 480 slow estimates 61–70 min, all under 100. test_dump_course: all checks passed.
