# Student review: Year 4 Spring

*Round 4, part A (CS 491, CS 450). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a fourth-year student. Before this term I finished the first three years of the degree (CS 100 through CS 380, the maths and physics courses, CS 410, CS 430, CS 470) and CS 490 Capstone Project I. This term I am taking CS 491 Capstone Project II and CS 450 Formal Methods and Verification. I read both courses lesson by lesson and tried every quiz question and practice problem in my head. I checked the worked numbers I could recompute: PERT sums, adjusted-Wald intervals, SUS mean, Erlang C, the coordinated-omission percentiles, burn rates, the power calculation, WebPA, the Tseitin counts, the DPLL traces, the midpoint-overflow counts and the VC counterexample. Those all came out as stated. The items below are where I actually got stuck or found the text inconsistent.

### CS 491 Capstone Project II

#### cx1: Replanning for the second term

1. "the lessons, quizzes and problems are the same for both paths, and the course policies give the details" (also cx8: "the policies say how it is used", and "Each member's share of a team milestone grade is adjusted using the peer evaluations, the history and the instructor's observation (the policies)"). The course text never includes or summarizes these policies. I don't know how thesis milestones are graded, or how the commit history and peer ratings are actually used.

#### cx3: Performance and scaling

2. "So all four workers are busy about 17% of the time (roughly a sixth)". Erlang's C formula was introduced as "the probability that an arriving request finds all c busy". Here that probability is read as the fraction of time all workers are busy. The notes don't say why the two are the same thing.

#### cx4: Shipping and operating

3. "If the pantry handles 180 check-in requests in an hour, three failures make the error rate 1.7%" seems to contradict the incident paragraph: "about 36 (Lesson 3's 4 a minute)", which is 240 an hour. Lesson 3's 4 a minute counted all 6 requests per check-in, page assets included. So I can't tell what counts as a "check-in request" for the SLI, or which rate is right.

4. (blocking) P2: "A pantry incident makes 10% of check-ins fail, after a period with no failures. Which rule fires first, and roughly how soon after the incident starts, assuming steady traffic?" A burn rate of 10 never exceeds the first rule's 14.4, so only the 6-hour rule can fire. But the SLI "counts only opening hours" and the pantry is open about 3 hours. I can't tell whether the 360-minute window holds the earlier failure-free traffic (closed hours have no events at all) or only the incident's traffic. If it holds only the incident's traffic, the rule fires almost at once. If it holds 6 hours of steady traffic, it fires after about 3.6 hours, which is after the pantry closes. "Assuming steady traffic" doesn't settle which reading is meant, so I can't give an answer.

#### cx6: Evaluating the work

5. "with 1,200 per group, a true gain of 3 points would be detected only about a third of the time". The notes give the sample-size formula, but not how to get the power at a given sample size. This number is stated without the step that produces it.

#### cx8: Launch, final presentation and what comes next

6. "CS 480 Ethics, Law and Policy of Computing (required, and taken alongside this course)". My courses this term are CS 491 and CS 450, and CS 480 is not among the courses I have completed. I don't know whether I am supposed to be taking it now, or whether I was expected to know its content.

### CS 450 Formal Methods and Verification

#### fm1: Specifications, invariants and property-based testing

7. "Lessons 2 and 3 hand questions about programs to solvers that search all inputs up to a size". This seems to contradict Lesson 3: "Had the assertions contradicted each other, it would have printed unsat, a proof that no integers work. Unlike our brute-force searches below, that answer covers all integers". Lesson 5 says the same ("Z3 proves each one"). I can't tell whether SAT/SMT solvers are bounded or cover all inputs. Only bounded model checking seemed to be "up to a size".

#### fm3: SMT, symbolic execution and bounded model checking

8. "(define-fun y () Int 11)" in the solver's output. The notes explain sat and what a model is, but not this syntax: why a value in the model is written as a `define-fun`, and what the empty `()` means.

### Across courses

No problems spanning both courses beyond the ones above. Item 6 (CS 480 described as "taken alongside this course" though it isn't one of this term's courses) is a question about the degree's structure rather than about CS 491 alone.

## Professor's response (part A: CS 491, CS 450)

1. **Policies not in the lesson text.** cx1's thesis paragraph now summarizes the rubric policies faithfully: thesis milestones are graded by the adviser with the instructor (the complete thesis and defense also by a second reader), against the same criteria; team milestones are graded once, then each member's share is adjusted by at most 10 points either way using peer evaluations (WebPA as one input, Lesson 8), the repository history and the instructor's observation, with a conversation before any change from a low peer score; thesis students are graded individually, with the adviser's assessment in place of peer evaluation. cx8's two "(the policies)" references now say what the history is used for and the 10-point bound, pointing back to Lesson 1.

2. **Erlang C: arrival's view vs fraction of time.** cx3 now adds a parenthetical after "busy about 17% of the time": Erlang C gives the probability an arrival finds all busy, and with Poisson arrivals this equals the time fraction because random arrivals, independent of the state, sample states in proportion to time spent in them (PASTA, "Poisson arrivals see time averages").

3. **Request counts.** cx4's check-in availability SLI now defines a check-in request as any request the check-in screens make (search, select, confirm, page assets; about 6 per household, Lesson 3), so a Saturday averages 4 a minute, 240 an hour. The low-traffic example is now "240 check-in requests in an hour, four failures make the error rate 1.7%" (4/240 = 1.67%, burn 1.7), consistent with the incident paragraph's 36 requests in nine minutes.

4. **(blocking) P2 indeterminate.** The problem now fixes the setting: open only Saturdays 10:00–13:00, steady 4 requests a minute, each window holds the opening-hours requests within its span of clock time (closed hours add nothing), incident at 11:00 with no failures that week or morning, rules evaluated once a minute with the 35-request minimum, and it asks which *paging* rule fires first. Answer: the one-hour rule never fires (10% < 14.4%); the six-hour rule's 30-minute window exceeds 6% after t > 18 min, and its six-hour window (reaching back to 10:00) holds 60 + t minutes of traffic, so 0.10t/(60 + t) > 0.06 needs t > 90: the page fires at 11:31. The answer also notes the ticket rule fires at 11:07 (t > 6.7) since its three-day window holds only this morning. Verified by a minute-by-minute simulation in Python (page at t = 91, ticket at t = 7). The lesson's conclusion (too slow for a Saturday; add a count-based alert) is kept.

5. **Power at a given n.** cx6 now shows the one-line step from the same normal approximation: Φ(0.03/√((0.59 × 0.41 + 0.62 × 0.38)/1,200) − 1.96) = Φ(1.504 − 1.96) = Φ(−0.456) ≈ 0.32, with Φ named as the standard normal CDF (`NormalDist().cdf`). Verified in Python (0.324). The 1,024 and 4,160 sample sizes were rechecked (1,023.4 and 4,164.3).

6. **CS 480 "taken alongside".** No change. CS 480 Ethics, Law and Policy of Computing is a real required Year 4 Spring course taken in parallel with CS 491; the student agent was given only two of the term's courses, so it didn't see it. The sentence phrases it correctly as a parallel course.

7. **Are solvers bounded?** fm1's overview now says: a solver's answer about a formula covers every value of its variables, so "no solution" is a proof; but turning a program with loops into a formula unrolls the loops a fixed number of times (bounded model checking), so the answer about the program covers only runs up to that bound. This agrees with Lesson 3's "unsat ... covers all integers" and Lesson 5's "Z3 proves each one".

8. **`define-fun` in the model.** fm3 now explains, right after the first model: `(define-fun y () Int 11)` defines a function named `y` with an empty argument list `()`, result sort `Int` and body 11; a constant is a function of no arguments (`declare-const` is short for `declare-fun` with `()`), so the solver reports each constant's value as such a definition.

No problem files or specs changed (none of the items touched programming problems).

---

# Student review: Year 4 Spring

*Round 4, part B (CS 480). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a fourth-year CS student. I have finished the whole core sequence through CS 470 Deep Learning, including CS 100's ethics and privacy lessons, CS 370's confusion matrices, CS 380's sidebar on authorization and disclosure, MATH 230's probability and hypothesis tests, and CS 365/CS 320 grammars. I had no law background before this course apart from what CS 100, CS 102 and CS 380 mentioned in passing. I read all eight CS 480 lessons in order and tried every quiz question and practice problem. Most of the material was followable; the items below are the places where I actually got stuck or found something inconsistent.

### CS 480 Ethics, Law and Policy of Computing

#### et2: Intellectual property and software licenses

1. "GPL code forces the whole program to be GPL ... the AGPL's terms then apply to the combination as a whole". The AGPL is only described as GPL plus a condition triggered "when users interact with it over a network". The lesson never says outright that AGPL code, like GPL code, forces the whole distributed program under the AGPL. For P1's `pdf (AGPL-3.0-only)` in a closed-source desktop app (no network use), I had to assume this to decide whether it blocks a proprietary release.

2. The lesson's text, Q3 and its answer use "GPL-3.0" as an outbound license ("may go out under GPL-3.0 or under AGPL-3.0"). The license_graph problem's OUTBOUND list instead has "GPL-3.0-or-later" and no "GPL-3.0". I wasn't sure whether these are meant to be the same outbound choice or whether the difference matters.

#### et3: Privacy law and privacy engineering

3. "Deployed systems use ε from below 1 up to about 20 (the sidebar)". The sidebar gives only 17.14 and 2.47, both from the census. Nothing in it shows a deployed system with ε below 1, so I couldn't find the source for the bottom of that range.

#### et4: Algorithmic fairness and anti-discrimination law

4. "its 2026 amendment (the 'Digital Omnibus on AI', Lesson 8) extended that permission more widely". Lesson 8 covers the Digital Omnibus on AI only for its postponed dates and its new bans. It says nothing about Article 10(5) or about processing sensitive data to detect bias. I couldn't find what "more widely" means: for whom, and under what conditions.

5. P1: "For each rate, give the ratio of the smaller group's value to the larger's: which definitions come closest to holding, and which is furthest?" Equalized odds involves two rates (TPR and FPR). I didn't know whether to judge it by the worse of the two ratios, by both separately, or some other way. (The fairness_metrics problem uses the larger of the two gaps, but that is a difference, not a ratio.)

#### et5: Safety, liability and software failure

6. P2: "Sensors 1 and 2 both drift upward together". The voter in the programming problem numbers its sensors 0, 1, 2. I couldn't tell whether P2 means the voter's sensors 1 and 2, or the first two sensors (0 and 1). The answer doesn't change, but the reference is ambiguous.

#### et6: Security law: computer crime, circumvention and disclosure

7. "an early warning within 24 hours, a notification within 72 hours, and a final report within 14 days after a fix is available". The lesson doesn't say when the 24-hour and 72-hour clocks start (when the manufacturer becomes aware? when exploitation began?). P2(c) depends on it ("becomes aware at 10:00 on 20 October 2026"), and I had to assume the clock starts when the manufacturer becomes aware.

8. bounty_scope: "A pattern is a network if it contains /" and "an IP address matches only network patterns". It's unclear what happens with an "in" or "out" pattern that is a single IP address written without a prefix, such as "203.0.113.7". By these rules it would be treated as a host name and could never match anything, IP or host. I couldn't tell whether that is intended or whether such patterns just never appear.

## Across courses

The course refers to optional lessons in earlier courses (CS 102's lesson on licenses, CS 100's COMPAS lesson, CS 101's Therac-25 lesson). Each reference came with enough of a summary that I wasn't blocked. I found no further problems that span courses.

## Professor's response (part B: CS 480)

1. **AGPL copyleft (et2).** Fixed. The et2 license list now says outright that the AGPL is copyleft in the same way as the GPL: AGPL code forces the whole distributed program to be AGPL, and its network condition is an extra duty on top (users who interact with a modified version over a network must be offered its source, AGPLv3 section 13). P1's answer ("the whole app would have to be AGPL") now follows from the notes.

2. **"GPL-3.0" vs "GPL-3.0-or-later" (et2).** Fixed. The notes now say that SPDX writes GPLv3 as "GPL-3.0-only" or "GPL-3.0-or-later" and that the lesson says "GPL-3.0" for either. The section 13 sentence now says a program containing GPL-3.0-or-later code may go out under GPL-3.0-or-later or AGPL-3.0-only, "the outbound names the programming problem uses". Q3's correct choice now reads "GPL-3.0-or-later (or AGPL-3.0-only)", which matches the license_graph `OUTBOUND` list.

3. **ε range (et3).** Fixed. The unsupported "from below 1 up to about 20" is gone. The sentence now says only what the sidebar supports: deployed systems can choose ε far larger than the lesson's 0.5, and the 2020 census used a total of 17.14 for the person tables of its redistricting data. Choosing ε is still called a policy decision. I added no new deployment claim, so no new source is needed.

4. **What the Digital Omnibus changed about bias data (et4).** Fixed, and checked against the EUR-Lex text of Regulation (EU) 2026/1744. Article 1(9)(b) deletes Article 10(5), and Article 1(6) inserts a new Article 4a. Article 4a(1) keeps the permission for high-risk systems, under conditions (a)–(f). Article 4a(2) lets "providers and deployers of other AI systems and models and deployers of high-risk AI systems" "exceptionally" process such data when strictly necessary and with all the paragraph 1 safeguards applied. The lesson now says the amendment "moved that permission into a new Article 4a and widened it" and names the newly covered parties. It also lists the safeguards briefly: other data wouldn't do, the data is secured and not passed to other parties, it is deleted once the bias is corrected, and the reasons are recorded. The pointer now reads "whose dates Lesson 8 covers", so it no longer suggests Lesson 8 discusses this provision.

5. **Ratio for equalized odds (et4 P1).** Fixed. The question now says: "A definition that equalizes two rates is only as close as the worse of its two ratios." The answer now judges equalized odds by the worse of its TPR ratio (0.94) and FPR ratio (0.56). This is the same worst-of-two rule that fairness_metrics applies to gaps, and the answer is unchanged.

6. **Sensor numbering (et5 P2).** Fixed. The prompt now reads "Two of the three sensors (indexes 1 and 2 in the programming problem's numbering) both drift upward together".

7. **When the CRA clocks start (et6).** Fixed, and checked against Article 14(2) of Regulation (EU) 2024/2847 on EUR-Lex. The early warning is due "within 24 hours of the manufacturer becoming aware of it". The notification is due "within 72 hours of the manufacturer becoming aware of the actively exploited vulnerability". The final report is due "no later than 14 days after a corrective or mitigating measure is available". The notes now say the 24-hour and 72-hour periods are "both counted from when the manufacturer becomes aware of the exploitation (Article 14)", and that the final report is due 14 days after "a fix or mitigation" is available. P2(c)'s answer was already computed this way and still holds.

8. **Bare IP address as a pattern (bounty_scope).** Fixed so the problem has one sensible answer. The prompt now lists a fourth kind of pattern: a single IP address such as "203.0.113.7", which is a network of one address (`ipaddress.ip_network` reads it as 203.0.113.7/32) and matches only that address. The hint now says "A pattern is a network if it contains / or is itself an IP address". The reference solution treats such patterns as networks. A new visible test, "A single address as a pattern", uses bare-address patterns in both "in" and "out". The spec was regenerated with gen_code.py (0 problems), the starter fails all 5 tests, and every test passes in Pyodide.
