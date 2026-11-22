# Within-course reference audit (November 2026)

After the cross-course consistency pass (degree-consistency-audit.md), a script pulled out every reference from a lesson to another lesson of the same course (968, all to lessons that exist). Four auditor agents then checked each against the cited lesson. Three of them fixed their courses directly. The fourth, covering Year 2 Spring and Year 3 Fall, only reported, and those terms' round 5 professors fixed its four findings (see y2-spring-student-review-5.md and y3-fall-student-review-5.md). Reports below, unedited.

---

## Within-course references: Y1 and Y2 Fall

231 items checked (cs100, cs101, cs102, writ100, math120, math121, math130, math131, phys150, cs201, cs210, math220, math230, and their -code files); 1 problem found, plus the extra item (MATH 230 Lesson 7 permutation test). One item (i1-125, math131 "Lesson 2 of the elective PHYS 150") is a cross-course false positive and was skipped.

1. **Where:** WRIT 100, Lesson 9 (w9, Revising, feedback and AI tools), the revision checklist, "Paragraphs and sentences" item (i1-228).
   **Quote:** "Topic sentences, transitions, actors and actions, needless words, precise terms (Lesson 2)."
   **Problem:** The single citation covers the whole list, but topic sentences and transitions are taught in Lesson 3, not Lesson 2. Lesson 2 (Clear sentences) covers actors and actions, needless words and precise terms.
   **Evidence:** Lesson 3: "its first sentence, the topic sentence, should say what that idea is" and the section "### Transitions". Lesson 2 has no topic-sentence or transitions material (searched for "topic sentence" and "transition"; found only in Lessons 3 and 9).
   **Fix:** "Topic sentences and transitions (Lesson 3); actors and actions, needless words, precise terms (Lesson 2)."
   **Changed:** data/writ100.js, w9 notes, that list item now reads as in the Fix. I searched all data files for the same misattribution and found no other instance.

**Extra item: MATH 230 Lesson 7 (ps7) permutation test.**
   **Problem:** The code block (`random.seed(1)`, 20,000 shuffles of 2,000 visitors) took about 10 s and sometimes timed out in check_lesson_code.py.
   **Changed:** data/math230.js, ps7 notes. `trials` went from `20_000` to `5_000`, keeping `random.seed(1)`. I reran it: it prints 0.085 (was 0.087) in about 2 s. I updated every quoted number: the output comment `# about 0.087` became `# about 0.085`, "About 9% of random shuffles" became "About 8.5% of random shuffles", and in the z-test paragraph "(0.077 versus 0.087)" became "(0.077 versus 0.085)". The conclusion still holds: 0.085 > 0.05, so the result is not significant, and it still roughly agrees with the z-test's 0.077. The one-sided figure (0.038) comes from the z-test, so it is unchanged. The related practice problem (adapt the code to 2 × 2,000 visitors) says "Expect about 0.012–0.015". I checked that range with 5,000 trials and seed 1: the result is 0.0126, inside the range, so it is unchanged. No other file quotes 0.087.

## Checks

- `node --check data/math230.js`, `node --check data/writ100.js`: ok
- `node scripts/validate_content.js .`: all good
- `export_problems.js` + `check_problems.py`: 407 problems, 0 problems found
- `extract_lesson_code.js` + `check_lesson_code.py`, filtered to my courses: only the known cs101/cs102 false alarms. The ps7 block on its own: 0 suspected mismatches, 1.9 s.
- `node scripts/lesson_time.js .`: nothing over 100 minutes in the slow estimate (WRIT 100 and MATH 230 at most 68 minutes)
- `node scripts/test_dump_course.js`: All checks passed

---

## Within-course references: Y3 Spring

284 items checked (cs330 53, cs360 65, cs360-code 35, cs370 50, cs380 27, cs380-code 1, cs365 43, cs365-code 10); 0 problems found. No data files were edited.

Every cited lesson was checked against freshly regenerated dumps. Each one covers what the citing text says, and backward and forward wording matches the lesson order. Items that looked doubtful at first but are correct:

- cs330 nw8 "ECN-marks (Lesson 6)": nw6's congestion-control section defines ECN and the ECE/CWR flags.
- cs330 nw8 "drop-tail queueing (Lesson 1's programming problem)": nw1's router_queue problem defines drop-tail.
- cs360 pl3 "Lesson 2's sidebar, 'Lisp's accidental dynamic scope'": the sidebar exists in pl2 under that title.
- cs360 pl3 "Substitution is subtler than in Lesson 2" / "Lesson 2 only substituted values": pl2 has the section "Substitution: another way to give let its meaning".
- cs360 pl4 "as with Mini's let in Lesson 3": pl3 shows that let can't define fact (the motivation for letrec).
- cs360 pl7 "Lesson 4's Lazy" and pl7 "SICP, the textbook quoted in Lesson 1": pl4 defines class Lazy, and pl1's introduction quotes SICP.
- cs360 pl5 "(neg e) (Lesson 1's negation)": pl1 P4 adds neg to Calc.
- cs360-code pl8 "Lesson 8's example (root → A, A → B and C, B → A, D unreachable)": the example appears exactly so in pl8's copying-collection section.
- cs370 ml5 "cures Lesson 4's singular ATA": ml4 says that with proportional features "ATA isn't invertible".
- cs380 sc3 "PRF (Lesson 2)" and cs380-code sc2 "PRF, defined in Lesson 2's block-ciphers section": sc2 defines PRF next to PRP.
- cs380 sc4 "a cousin of Lesson 2's padding oracle": sc2's CBC paragraph names the padding oracle attack.
- cs380 front matter "may be a crime (Lesson 8)": sc8's sidebar "Authorization, the law and security work".
- cs365 cp3 "tokens carried positions in Lesson 2": cp2's "Tokens with positions" section gives tokens their line and column (cp1 introduces positions in error messages).
- cs365 cp5 "undecidable, by the same argument as Lesson 3's return check": cp3 makes the halting/Rice argument for the return check.
- cs365 cp4 "the recursive factorial and the GCD program from Lesson 1": "from Lesson 1" refers to the GCD program, which is in cp1; the factorial is first given in cp4 itself.

## Checks

- node --check on data/cs330, cs360, cs370, cs380, cs365 and their -code.js files: all ok (no files edited).
- node scripts/validate_content.js .: all good.
- export_problems + check_problems.py: 407 problems, 0 problems found.
- extract_lesson_code + check_lesson_code.py: no lines for cs330/cs360/cs370/cs380/cs365. The 30 suspected mismatches are elsewhere (cs101/cs102, the known false alarms).
- node scripts/lesson_time.js .: every lesson in these five courses is at or under 100 min slow (highest: cs365 cp5 at 96, cs370 ml4 at 90).
- node scripts/test_dump_course.js: All checks passed.

---

## Within-course references: Y4

I checked 241 items and found 3 problems. Two are false positives of the extractor and were skipped: i3-58, which is CS 430's "its Lesson 2/5" quoted inside CS 410 Lesson 6, and i3-228, which is WRIT 100's "its Lesson 5/7" quoted inside CS 491 Lesson 7. All other references are accurate, including every test label in the -code files that cites a figure, trace or practice problem.

1. **Where:** CS 490, pj7 (Lesson 7), opening paragraph of the notes.
   **Quote:** "Security, privacy, accessibility and performance are called cross-cutting concerns … So the design document has a section for each (Lesson 4), and this lesson is what goes in them."
   **Problem:** Lesson 4 doesn't give the design document a section for each concern. Its outline has a single "cross-cutting concerns" section. The design-section list in Lesson 4 (structure, data model, interfaces, key scenarios, non-functional targets, deployment) doesn't name security, privacy or accessibility.
   **Evidence:** pj4: "Use the standard outline (WRIT 100 Lesson 7): context, goals and non-goals, the design, alternatives, cross-cutting concerns, open questions. For a capstone, the design section should cover: …"
   **Fix:** "So the design document's outline (Lesson 4) has a section for cross-cutting concerns, and this lesson is what goes in it."
   *Changed:* made that exact replacement in data/cs490.js.

2. **Where:** CS 491, course milestones, "Operational readiness review" description.
   **Quote:** "Week 9. The capacity plan and load test, SLOs, alerts and runbooks, a rehearsed rollback and an incident drill (Lessons 3 to 5)."
   **Problem:** Lesson 5 (cx5, Maintaining the system: debt, refactoring, dependencies, versioning, security updates) contributes none of these items. The capacity plan and load test come from Lesson 3. SLOs, alerts with runbook links, rollback and the game day come from Lesson 4. Lesson 8 confirms this: "The readiness review's items are done: SLOs and alerts live and rollback rehearsed (Lessons 3 and 4)."
   **Evidence:** I searched cx5 for "readiness", "SLO", "alert", "rollback" and "drill" and found none. cx3 has "For the readiness review, one page: the expected load…". cx4 has "The readiness review includes an incident drill…" and P4, "Prepare your operational readiness review…".
   **Fix:** "(Lessons 3 and 4)".
   *Changed:* made that replacement in data/cs491.js. I left the Lesson 1 schedule table's "3, 4, 5" column alone, because it lists which lessons fall in each milestone's period, not what the milestone is made of.

3. **Where:** CS 480. The citations are in et1 (Lesson 1, a discussion-problem solution: "asks how the −10 was estimated (Lesson 4's disaggregated evaluation)") and et7 (Lesson 7, a discussion-problem solution: "(a disaggregated evaluation, Lesson 4)").
   **Quote:** "Lesson 4's disaggregated evaluation"
   **Problem:** Lesson 4 does the thing (it splits the test set by group and computes each group's rates) but never uses the term, so a student can't match the citation to the lesson.
   **Evidence:** I searched the whole course for "disaggregat" and found it only in the two citing solutions. et4: "Fix a classifier … and split the test set by group. Each group gets its own confusion matrix…"
   **Fix:** name the term in et4: "split the test set by group (a disaggregated evaluation)."
   *Changed:* made that edit in data/cs480.js. It adds no legal claim.

Checked and not changed: i3-124 (CS 470 dl6, "the backward pass costs about twice the forward (Lesson 1)"). dl1 does say this: "The backward pass costs two matrix products for the forward pass's one, CS 370's 'about twice the forward pass'." i3-159 (CS 490 pj2, "Record audio only with permission (Lesson 7)") is brief but correct: pj7 covers personal data and what makes consent meaningful.

No -code files or specs were changed. I found the same wrong attributions nowhere else in the data files.

## Checks

- `node --check` passed on data/cs480.js, data/cs490.js and data/cs491.js.
- `node scripts/validate_content.js .` ended "all good".
- `export_problems` + `check_problems.py`: 407 problems, 0 problems found.
- `check_lesson_code.py`, filtered to cs410/cs490/cs430/cs470/cs491/cs480/cs450, printed no lines (no failures).
- `node scripts/lesson_time.js .`: 256 core lessons, 0 over 100 minutes in the slow estimate.
- `node scripts/test_dump_course.js`: All checks passed.

---

## Within-course references: Y2 Spring and Y3 Fall

212 items checked (1 extractor false positive skipped: i4-23, "Lesson 1 quiz" inside an acceptance-criterion example); 4 problems found (cs240: 1, cs320: 3). No problems in cs220, cs230, phys250, cs310, cs340 or cs350.

#### cs240

1. **Where:** cs240, Lesson 7 (se7, "Continuous integration, code review and static analysis"), notes, code review section, "As an author" list (item i4-32).
   **Quote:** "Describe what the change does and why, and how you tested it (Lesson 2)."
   **Problem:** Lesson 2 doesn't say to describe how a change was tested. It covers commit messages (a summary line, then the why) and says a pull request carries "a description". Testing is never mentioned as part of either. The citation credits Lesson 2 with advice it doesn't give.
   **Evidence:** se2: "Write messages with a short summary line (about 50 characters, in the imperative ...), a blank line, then the why: what was wrong, and why this is the fix." and "open a pull request ...: a proposal to merge it, with a description, the diff, and a place for discussion." I searched se2 for "tested" and "how you test" and found nothing.
   **Fix:** Attach the citation only to the part Lesson 2 covers: "Describe what the change does and why (as in a commit message, Lesson 2), and how you tested it."

#### cs320

2. **Where:** cs320, Lesson 3 (tc3, "Regular expressions and minimal DFAs"), notes, backtracking-engines paragraph (item i4-91).
   **Quote:** "A backreference such as (a*)b\1 means "the same text the first group matched", so it denotes {aⁿbaⁿ}, which Lesson 4 shows is not regular."
   **Problem:** Lesson 4 never deals with {aⁿbaⁿ}. Its worked examples and practice problems are {0ⁿ1ⁿ}, BAL, E (equal numbers of 0s and 1s), {0ⁱ1ʲ : i > j}, PAL and "more 1s than 0s". {aⁿbaⁿ} appears nowhere in the course except this sentence.
   **Evidence:** tc4 headings and problems: "Example 1: {0ⁿ1ⁿ : n ≥ 0} is not regular", the BAL proof, the closure proof for E, P1 to P4 as listed above. I searched all of data/cs320.js for aⁿbaⁿ and found only this line.
   **Fix:** "...so it denotes {aⁿbaⁿ}, which is not regular (Lesson 4's distinguishing-set argument for {0ⁿ1ⁿ} works the same way: the strings aⁱ need different suffixes baⁱ)." Another option is to add {aⁿbaⁿ} as a Lesson 4 example or practice problem.

3. **Where:** cs320, Lesson 6 (tc6, "Pushdown automata and the limits of context-free languages"), notes, first paragraph (item i4-100).
   **Quote:** "A grammar generates the strings of a language; a machine recognizes them. Lesson 2 showed that, for regular languages, the two views match."
   **Problem:** Lesson 2 (Nondeterminism) shows that two kinds of machine, NFAs and DFAs, are equivalent. Both of those recognize strings. The result that a generating description matches the machines for regular languages is Kleene's theorem (regular expressions ⇔ finite automata), and that is in Lesson 3.
   **Evidence:** tc3: "DFAs and NFAs describe a language by a machine. A regular expression describes it by a formula ..." and "Kleene's theorem. A language is denoted by some regular expression if and only if it is regular." No grammar or generator view appears in tc2.
   **Fix:** "Lesson 3 showed that, for regular languages, the two views match (Kleene's theorem: regular expressions and finite automata describe the same languages)."

4. **Where:** cs320, Lesson 1 (tc1), practice P3, worked solution (item i4-82).
   **Quote:** "So z is accepted from one and rejected from the other. Lesson 3 uses exactly this test to show a DFA has as few states as possible."
   **Problem:** This is minor and only half right. Lesson 3 does use distinguishing suffixes, to find which states can be merged. But it explicitly leaves the minimality proof to Lesson 4: "(Lesson 4 proves) after removing unreachable states and merging equivalent states ...". Lesson 4 (Myhill–Nerode) is where "distinguishable strings must reach different states" becomes a proof of a lower bound, and Lesson 4 itself says it "settles Lesson 3's claim".
   **Evidence:** tc3, Minimizing a DFA: "Equivalent states can be merged without changing the language, and (Lesson 4 proves) after removing unreachable states and merging ...". tc4: "This also settles Lesson 3's claim."
   **Fix:** "Lesson 3 uses exactly this test to find states that can be merged, and Lesson 4 uses it to prove that the result has as few states as possible."
