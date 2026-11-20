# Student review: Year 4 Spring

*Round 5, part A (CS 491, CS 450). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a fourth-year CS student. Before this term I finished the whole programme up to CS 490 Capstone I, CS 430 Advanced Algorithms and CS 470 Deep Learning. That covers CS 240's SLOs and postmortems, MATH 230's intervals, power and permutation tests, CS 310's mutual-exclusion algorithms, CS 320's NP-completeness and CS 360's type checkers and inference rules. This term I am taking CS 491 Capstone Project II and CS 450 Formal Methods and Verification. I read both dumps in order and tried every quiz and practice problem. I checked some of the printed numbers with a calculator, and they matched.

### CS 491 Capstone Project II

#### cx2: Iterating with users

1. "times = [41, 38, 55, 47, 120, 44, 39, 52]  # seconds to check in a returning household" (median 45.5 s) seems to contradict Lesson 1's "NFR-1's check-in target was missed (a 95th percentile of 35 seconds against 30)". The 95th percentile from the CS 490 measurement is 35 s, but here even the beta's median is 45.5 s for the same task. Lesson 8 also gives "a median of 24 seconds" and Lesson 6 gives "52 seconds before … 31 seconds after". The notes never say whether these numbers measure different things (start and end points, who was timed), so I can't tell which number NFR-1 is judged against.

2. The ethics section warns that "a total and all but one of its parts reveal the last part, so reports that can be subtracted from each other need care too". The funnel `report` then suppresses only counts from 1 to 4 and shows all the others. Two shown counts such as 12 and 10 reveal that 2 users dropped out at that step. I don't know whether the function is supposed to handle this or the warning doesn't apply to funnels.

#### cx4: Shipping and operating

3. "In a window of length w, a burn rate b uses a fraction b × w / period of the budget" and "page someone when 2% of the month's budget is spent in an hour (burn above 14.4)". This looks wrong for the pantry, whose SLI "counts only opening hours". The pantry is open about 12 hours in 30 days, about 2,880 requests, so the budget is about 29 failures. One opening hour at burn 14.4 is 14.4% of 240 requests, about 35 failures, which is more than the whole month's budget, not 2%. The fractions in the printout seem to assume traffic spread evenly over the period. The notes never say what changes when it isn't, and it affects the error budget policy ("if a single incident uses more than 20% of it").

4. "the pantry's rule also needs at least 35 requests in the window". It isn't clear whether the minimum applies to the long window only or to both windows. At 4 requests a minute, a 5-minute short window can never hold 35 requests, so if it applied to both the 14.4 rule could never fire. I had to infer from the incident's numbers that it means the long window.

5. The `burn_rate` problem says `alerts` should "apply the notes' three rules", but its specification leaves out the 35-request minimum, which the notes present as part of the pantry's rule. I don't know whether `alerts` should apply it. (blocking)

6. P2: "steady traffic of 4 check-in requests a minute … an incident makes 10% of check-in requests fail … Evaluate the rules once a minute". That is 0.4 failed requests a minute, but failures are whole requests. I couldn't tell whether to treat failures as continuous (my answer: the 6-hour rule first exceeds 6 at 12:31) or as whole requests in some pattern, which would change the minute it fires. (blocking for an exact "when")

#### cx5: Maintaining the system

7. In `semver_resolve`, ^V is defined as "below the next increase of V's left-most non-zero part". ^0.0.0 has no non-zero part, so I don't know what upper bound it should get.

8. In `update_plan`: "Raise ValueError for an unknown severity". It doesn't say whether an advisory that doesn't apply (package not in deps, or already fixed) with a bad severity should also raise, or be ignored like other advisories that don't apply.

#### cx6: Evaluating the work

9. `readout(..., min_effect)` compares d = p_b − p_a, a fraction, with `min_effect`, but the notes always state the minimum in points ("a gain of 3 points", "pre-registered minimum effect of 5 points"). The specification doesn't say whether to pass 3 or 0.03. Passing 3 would never give "ship".

#### cx8: Launch, final presentation and what comes next

10. Lesson 1 says the grade adjustment uses "the peer evaluations (with a WebPA weighting as one input), the repository history and the instructor's observation". Lesson 8's code then computes the final mark entirely from the WebPA score, `team * 0.5 + s * team * 0.5`, capped at ±10, and P2 asks for "the individual marks" the same way. I couldn't work out how the other two inputs change the result, or whether the WebPA mark is the final mark unless the instructor intervenes.

### CS 450 Formal Methods and Verification

#### fm3: SMT, symbolic execution and bounded model checking

11. "Lesson 5 uses the same language." But Lesson 5's loop is `["while", c, inv, body]`, and in `loop_vcs` it is `["while", c, inv, variant, body]`, not Lesson 3's `["while", c, body]`. Also, P2 here is written with `>=` and `and` in Python syntax, while the notes' OPS has no `>=` or `>`. To run it with the notes' symex I'd have to rewrite it, and I wasn't sure whether that is expected.

12. "symex stops a path after k loop iterations in total", but the next sentence says "Tools such as CBMC, for C, unroll each loop k times". These are different bounds for a program with several loops. Both are called bounded model checking, and I don't know which one "bound k" means in Q6 and P4.

### Across courses

13. CS 491 Lesson 8 says "CS 480 Ethics, Law and Policy of Computing (required, and taken alongside this course)". My courses this term are CS 491 and CS 450, and CS 480 isn't among my earlier courses either. So I either haven't taken a required course, or the statement is wrong about when it is taken.

## Professor's response (part A: CS 491, CS 450)

The cs491 notes were edited in data/cs491.js directly; the c491 part files (u*.js) are now stale. Problem changes were made in cs491_spec.py and c491/parts.json (the burn-rate reference solution) and regenerated into data/cs491-code.js.

1. **Fixed.** Each figure now says what it measures. Lesson 2's task times are replaced by eight returning households in a beta session, timed by an observer the NFR-1 way (from reaching the desk to the visit being recorded, CS 490 Lesson 2). A new sentence says this makes them comparable with the prototype's p95 of 35 s. The new output is mean 27.25, median 23.0, geometric mean 25.5 (run). Lesson 6's "52 s before, 31 s after" is now introduced as "Suppose a report says...", with the note that it is an illustration and not the pantry's NFR-1 measurement, which Lesson 8 reports. Lesson 8's evidence sentence used to say "measured from the logs", which isn't NFR-1's method. It now says "from reaching the desk to the visit recorded, timed by observers over six Saturdays as NFR-1 specifies" (median 24 s, p95 33 s, against the prototype's 35). Lesson 1 and CS 490 are unchanged.

2. **Fixed (notes and prompt).** The suppression bullet in Lesson 2 now says a funnel is a subtractable report: shown counts of 12 and 10 reveal that 2 users stopped. It says `report` applies only the per-count rule, so a funnel of small numbers should be shared only with people entitled to that detail, or small drop-offs should be suppressed or coarsened too. The `report` prompt now says the same ("the per-count rule only"). Its behaviour and tests are unchanged.

3. **Fixed.** Lesson 4 now gives the printout's fraction b × w / period as true only when traffic is spread evenly. A new paragraph defines the budget in requests: (1 − SLO) × N failures, and a window of n requests at burn b uses b × n / N of it. It then works through the pantry. Four Saturdays of three opening hours give 2,880 requests, so the budget is about 29 failures. An opening hour at burn 14.4 uses 14.4 × 240 / 2,880 = 1.2 budgets, not 2%, and burn 1 for an hour uses 8%. A window inside opening hours spends 60 times the printout's fraction. The paragraph explains that the thresholds keep their meaning as rates but say little about how much budget is left. The error budget policy's 20% is now "counted in requests: for the pantry, about 6 failed check-in requests". Quiz Q4 now asks about a service with evenly spread traffic, and its explanation notes that the pantry's fraction is larger.

4. **Fixed.** The low-traffic paragraph now states the pantry's rule. Each rule fires only if its long window holds at least 35 requests, and the minimum doesn't apply to the short window: five minutes hold only 20 requests, so the first rule could never fire if it did. It adds that 35 requests at burn above 14.4 need at least 6 failures (35 × 0.144 = 5.04). The incident paragraph now says "35 requests in the long window: at 15:08 the hour held only 32".

5. **Fixed.** `alerts` is now `alerts(events, slo, now, min_requests=0)`. A rule also needs its long window (not the short one) to hold at least `min_requests` requests. The default of 0 gives the Workbook's rules, and the prompt names `alerts(events, slo, now, 35)` as the pantry's rules. The reference solution in c491/parts.json, the starter and three new tests agree. The new tests are: 9 minutes at 3 of 4 good fire nothing at minute 8 with a minimum of 35 (32 requests) but fire all three rules without one; with 36 requests at minute 9, all three fire; and, hidden, a minimum of 30 still fires the 60/5 rule, whose short window holds only 20, which pins "long window only". I regenerated the problems with gen_code.py (0 problems need attention) and ran every test in Pyodide (all ok).

6. **Fixed, including the known error.** P2 now states the model: failures are counted in expectation (4 requests a minute, 0.4 of them failed); checks run on the hour and each minute after; each check counts the requests made before it; and the 35-request minimum applies to the long window. The answer now says the page fires at 12:31, not 11:31. With t minutes of incident, the six-hour rule needs 0.1t/(60 + t) > 0.06, so t > 90. At t = 90 the rate equals 6% exactly, which is not above it, so the page fires at t = 91, 12:31, 29 minutes before closing, with 604 requests in the long window. The 30-minute short window is above 6% from 11:19. The ticket rule fires at 11:07 (t > 6.7). The one-hour rule never fires. The answer now adds that by 12:31 about 36 requests have failed, more than the month's whole budget of about 29. I checked every time with a minute-by-minute simulation using the new reference `alerts` (previous Saturday included, one week earlier): ticket first at 11:07, page (360, 30) first at 12:31, 36.4 failures by then.

7. **Fixed.** The `semver_resolve` prompt now says: "if all three parts are 0, the patch counts, so ^0.0.0 is below 0.0.1 and allows only 0.0.0". This is what the reference solution does. I added a hidden test, `[satisfies('0.0.0', '^0.0.0'), satisfies('0.0.1', '^0.0.0')]` → `[True, False]`.

8. **Fixed.** The `update_plan` prompt now says to raise ValueError "for an unknown severity in any advisory, even one that doesn't apply", with the reason (a malformed feed should be noticed). This is what the reference does. I added a raises test with a bad severity on an advisory for a package not in deps.

9. **Fixed.** The `readout` prompt now says that `min_effect` is in the same units as d, a difference of fractions: the notes' 3 points is `0.03`. The existing tests already pass fractions.

10. **Fixed.** The lessons now describe one procedure. The WebPA calculation gives a proposed mark (the peer-evaluation input). The instructor compares it with the repository history and their own observation: the proposed mark stands if they agree, and if they don't, the instructor sets the mark the evidence supports, within 10 points of the team's, after talking with the member. Lesson 1's description, the course policy text, Lesson 8's notes (code variable renamed `proposed`, plus a new paragraph with an example about Dev), the `individual_marks` prompt ("the proposed marks") and P2 all say this now. P2's question asks for the proposed marks and what happens before they become final. Its answer explains the check, with an example of raising C's mark.

11. **Fixed.** Lesson 3 now says that Lesson 5 uses the same language with one change: a loop carries its invariant, `["while", c, inv, body]`, and in Lesson 5's last programming problem a variant as well. P2 now says it is written in Python for readability and needn't be translated to work it by hand. To run it with `symex`, write x ≥ y as `["<=", y, x]`, since OPS has no `>=` or `>`. The answer now includes that translation as runnable code. It prints the four paths `[('fail', 'b'), ('ok', 'b'), ('fail', 'a'), ('ok', 'a')]`, and `solve` finds no input from −20 to 20 for either failing path: `[None, None]`. I verified both outputs, and the lesson-code checker passes.

12. **Fixed.** The BMC paragraph now explains the difference: `symex` allows k iterations along a path over all loops together, CBMC allows k per loop, and the two agree for one loop, as in the notes' example. It also says that in this lesson's questions and problems, "bound k" means symex's bound, at most k iterations in total. Q6 and P4 are both single-loop examples, so their answers are unchanged.

13. **No change.** CS 480 Ethics, Law and Policy of Computing is a real required Year 4 Spring course, taken in parallel with CS 491. The student was given only part A's two courses, so CS 480 looked missing. Lesson 8's statement is correct.

### Checks (from the repository root)

- `node --check` on data/cs491.js, data/cs491-code.js, data/cs450.js: all ok.
- `node scripts/validate_content.js .`: "all good".
- `export_problems.js` + `check_problems.py`: 407 problems, 0 problems found.
- `extract_lesson_code.js` + `check_lesson_code.py`: no cs491 or cs450 lines (only the known cs101/cs102 false alarms).
- `gen_code.py cs491_spec.py data/cs491-code.js`: 0 problems need attention. Pyodide `pyrun.mjs data/cs491-code.js`: only "ok" lines (133).
- `lesson_time.js`: largest slow estimates are cs491 cx3 79 and cs450 fm3 83, nothing over 100.
- `test_dump_course.js`: "All checks passed."

---

# Student review: Year 4 Spring

*Round 5, part B (CS 480). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a fourth-year CS student. Before this term I took the full core sequence through CS 470 Deep Learning, CS 430 Advanced Algorithms and CS 490 Capstone I. That includes CS 100's ethics and privacy lessons, CS 102's licensing lesson, MATH 230's probability and hypothesis testing, CS 370's confusion-matrix metrics and CS 380's lessons on security law and disclosure. This term I'm taking CS 480 Ethics, Law and Policy of Computing. I read all eight lessons in order and tried every quiz question and practice problem. I checked the numbers by hand: the stakeholder totals, the Laplace ratios and tail, the FPR identity, the z-test, the fault-tree probabilities, the moderation volumes, the FLOP counts and the disclosure dates. They all came out as stated. The items below are the places where I actually got stuck.

### CS 480 Ethics, Law and Policy of Computing

#### et2: Intellectual property and software licenses

1. "The settlement covered only the roughly 482,000 pirated books that met the class's criteria (chiefly a timely US copyright registration: statutory damages, an amount per work fixed by the Copyright Act, $750 to $30,000 or up to $150,000 if the infringement was willful, which an owner can claim instead of proving actual losses, are available only for works registered before the infringement began or within three months of first publication)". The brackets and asides nest so deeply that I lost the thread. I had to read it several times to work out how statutory damages connect registration to which books were covered and to the $3,000 per book.

2. "The programming problems parse the SPDX expressions that package metadata uses". SPDX is never spelled out or described, here or in the key terms. The key terms only say what an "SPDX expression" does. I didn't know whether SPDX is a standard, an organization or a tool.

#### et3: Privacy law and privacy engineering

3. "counts differ by what is called comprehensive, so check the IAPP's state tracker". IAPP is never explained. I can't follow a pointer to a source when I don't know what organization it is.

#### et6: Security law: computer crime, circumvention and disclosure

4. "requires member states to criminalize illegal access, system interference and data interference, "at least" when not minor cases". I couldn't parse what "at least" applies to. Does the directive set a minimum that states may go beyond? Or does it exclude minor cases altogether?

5. "Since 2020 US federal agencies have had to publish a vulnerability disclosure policy (CISA's Binding Operational Directive 20-01)". CISA isn't expanded, and it isn't explained what kind of body it is or why it can bind other agencies.

6. P1(a): "you change the user ID in a URL from 1001 to 1002 on a site you have an account on, and see another user's invoice". The lesson's "emerging picture" covers only two cases: breaking terms of service is a contract matter, and getting past passwords or other technical barriers is a crime. This case is neither. There is no password to get past, but the invoice is surely an area that is "off limits". Van Buren left open whether a gate must be technical, so I couldn't tell which side of the line the lesson expects this case to fall on.

#### et7: Speech, platforms and content moderation

7. "and, since the 2018 FOSTA law, certain sex-trafficking claims". FOSTA is never expanded or described beyond this clause.

8. "enforced by Ofcom". The lesson doesn't say what Ofcom is. I assume it's a UK regulator, but nothing says so.

9. P2: "Why is the real false-match rate likely higher?" The lesson mentions "innocent look-alikes" and the NeuralHash collisions. It never says why real image hashes aren't uniformly random, for example whether the bits are correlated or whether common images share structure. I had to guess the intended reasoning.

#### et8: AI governance, accessibility law and making policy

10. P1(a): "a chatbot, launched on a bank's website in 2027 ... give the date its main obligations apply". The transparency duty has applied since 2 August 2026, but this system launches in 2027. I wasn't sure whether the expected answer is 2 August 2026 (the table's date) or the launch date.

11. a11y_audit: "an <img> with no alt attribute (WCAG 1.1.1). alt="" is correct for a decorative image." The parser notes say a bare attribute gets the value None. It isn't stated whether a bare `<img alt>` counts as having no alt attribute (img-alt) or as an empty, decorative alt.

12. a11y_audit: ""html-lang": an <html> tag without a non-empty lang". It isn't stated whether a document with no <html> tag at all should produce an html-lang finding, or what line it would be reported on.

### Across courses

13. Several lessons use acronyms for organizations and laws as if they were already familiar: SPDX (et2), IAPP (et3), CISA (et6), FOSTA and Ofcom (et7). None of my earlier courses that I remember introduced them, and the lessons don't expand them. Each one stopped me briefly while I tried to work out what kind of thing it was.

## Professor's response (part B: CS 480)

1. **Bartz sentence (et2).** Rewritten as three plain sentences. First, the settlement covered the roughly 482,000 books that met the class criteria, chiefly a timely registration. Second, registration mattered because of statutory damages, which the sentence defines: a fixed amount per work, $750 to $30,000 or up to $150,000 if willful, claimable instead of actual losses, but only for works registered before the infringement or within three months of publication. Third, the settlement came to about $3,000 per book and got final approval in July 2026. No facts changed.

2. **SPDX (et2).** At its first use (the GPL-3.0 naming aside), SPDX is now called "the license-naming standard described below". Where the programming problems are introduced, a new sentence says what it is: Software Package Data Exchange, an open standard run by the Linux Foundation and also published as ISO/IEC 5962. It describes software packages and their licenses, and its License List gives each common license a short identifier (`MIT`, `Apache-2.0`) that expressions combine. I checked this against spdx.dev and the ISO/IEC 5962:2021 listing.

3. **IAPP (et3).** Now reads "the state privacy law tracker kept by the IAPP (International Association of Privacy Professionals, a professional association for people who work in privacy)". I checked this on iapp.org.

4. **Directive 2013/40/EU (et6).** Checked on EUR-Lex. Articles 3 to 5 make illegal access, system interference and data interference punishable "at least for cases which are not minor". Article 3 also requires that the access be "by infringing a security measure", which the old sentence left out. The new text says the directive sets minimum rules and lists the three offences accurately, including the security-measure condition. It also explains that "at least" marks a floor: a state must criminalize the serious cases and may also criminalize minor ones, or access that breaks no security measure. That is why national laws vary.

5. **CISA (et6).** Now: "Binding Operational Directive 20-01, from CISA, the Cybersecurity and Infrastructure Security Agency; it is part of the Department of Homeland Security, which federal law empowers to issue directives on information security that civilian federal agencies must follow". The legal basis is 44 U.S.C. § 3553, where binding operational directives are compulsory for federal executive agencies other than national security systems. I checked this against cisa.gov/directives and the BOD 20-01 text.

6. **URL ID change (et6 P1(a)).** The notes now cover the middle case right after the "emerging picture" sentence. That case is data a site leaves technically reachable but plainly not meant for you, such as another user's records reached by changing an ID in a URL. The added text says:
   - Van Buren's footnote 8 declined to decide whether a gate set by policy counts.
   - No appeals court has settled the question. Auernheimer's 2012 conviction for collecting about 114,000 iPad owners' email addresses by changing ID numbers in requests to an AT&T site was vacated by the Third Circuit in 2014 on venue grounds, without a ruling on authorization.
   - Treat such access as possibly a crime: stop at the first record and report.

   The answer now says plainly that this is the unsettled case. If gates set by design or policy count, it is "exceeding authorized access"; if only technical gates count, it isn't. The expected answer is "possibly a crime, legally uncertain", and you should act as if it were one. The answer also notes that the Justice Department's policy says federal prosecutors shouldn't charge good-faith research, but state laws and civil suits remain. Checked by web search: commentary on footnote 8 (Lawfare, Cato, Stinson) and the Third Circuit's venue holding (FindLaw summary, 748 F.3d 525).

7. **FOSTA (et7).** Now "since FOSTA (the Allow States and Victims to Fight Online Sex Trafficking Act, signed in 2018)". The Act is Public Law 115-164, signed 11 April 2018.

8. **Ofcom (et7).** Now "enforced by Ofcom (the Office of Communications, the UK's independent regulator for broadcasting, telecoms and post, and now online safety)". I checked this on ofcom.org.uk.

9. **Why real false-match rates are higher (et7 P2).** The notes now give the reason after the precision-recall sentence:
   - An average hash sets each bit by whether one cell of a shrunken grayscale image is brighter than the mean.
   - Neighboring cells of a photo tend to be alike, and many photos share a layout (bright sky above, darker ground below).
   - So the bits are correlated, and hashes crowd into a small set of common patterns.

   The answer now gives the same reasoning (correlated bits, similar layouts) as well as deliberately crafted collisions. The numbers are unchanged: C(64,0..4) sums to 679,121 and 679,121/2^64 ≈ 3.7 × 10^-14. I re-ran both.

10. **Chatbot date (et8 P1(a)).** The question now asks for "the date from which its main obligations apply to it". The answer says the duty has applied since 2 August 2026, and since the chatbot launches later, the answer is its 2027 launch date: it must comply from its first day.

11. **Bare `<img alt>` (a11y_audit).** The reference solution tests `"alt" in attrs`, so a bare `alt` (value `None`) counts as present and empty. That is the same as `alt=""`, a decorative image, so there is no finding. The prompt now says this. A new test pins it: `audit('<img src="f.png" alt>') == []`.

12. **No `<html>` tag (a11y_audit).** The reference solution checks only `<html>` start tags, so a document without one gets no html-lang finding. The prompt now says "Only `<html>` tags are checked, so a fragment with no `<html>` tag gets no html-lang finding". A new test pins it: `audit('<p>No html tag here</p>') == []`. I regenerated the code file from the spec (0 problems; starters still fail), and all 68 Pyodide tests print "ok".

13. **Acronyms across the course.** Items 2, 3, 5, 7 and 8 cover the five named ones. I also scanned every acronym in data/cs480.js and expanded, at first use in the notes, each one that neither earlier courses nor the surrounding text explain:

    | Lesson | Acronyms expanded |
    |---|---|
    | et1 | GDPR, IEEE, SEC, SB 53 |
    | et2 | AGPL, GPL, MPL, SSPL; the "DSM Directive" in a quiz is now spelled out |
    | et3 | CCPA and CPRA, HIPAA, FERPA, COPPA, FTC, EUR-Lex, SISA |
    | et4 | "LL144" in the rubric is now "Local Law 144" |
    | et5 | MCAS, FAA, ISO and IEC (a new clause before the standards table), SIL, DAL, ASIL, MC/DC, RAF |
    | et6 | DMCA, CRA, NIS2; "DOJ" in a quiz is now "Justice Department's" |
    | et7 | DSA, ACLU |
    | et8 | ADA and NIST AI RMF in the summary, NIST, RMF, WCAG, W3C, IETF; the "GPAI" key term is now "general-purpose AI" |

    Familiar or self-explanatory acronyms were left as they are: US, EU, UK, AI, API, CI, ID, URL, MIT/BSD (CS 102), TP/FP/TPR/FPR/PPV (CS 370), COMPAS (CS 100), and acronyms already expanded where they appear (CJEU, CSIRT, AECL, TRAIGA).

### Checks

- `node --check` on data/cs480.js and data/cs480-code.js: ok.
- `validate_content.js`: all good.
- `export_problems` and `check_problems`: 407 problems, 0 problems found.
- `check_lesson_code`: no cs480 lines.
- `lesson_time`: every cs480 lesson is at most 70 minutes in the slow estimate.
- `test_dump_course.js`: all checks passed.
- `gen_code`: 0 problems.
- Pyodide: 68 "ok" lines.
