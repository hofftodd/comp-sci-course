# Student review: Year 4 Spring

*Round 3, part A (CS 491, CS 450). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a fourth-year student. I have finished the core sequence through CS 490 Capstone Project I, CS 430 Advanced Algorithms and CS 470 Deep Learning. That includes software engineering (CS 240), operating systems (CS 310), theory of computation (CS 320), programming languages (CS 360), distributed systems (CS 410), security (CS 380) and probability and statistics (MATH 230). I read both courses in order and tried each quiz and practice problem as I went. I also ran a few of the notes' code snippets to check numbers I couldn't follow by hand, and they matched. The list below covers only the places where I was actually confused or stuck.

### CS 491 Capstone Project II

#### cx3: Performance and scaling

1. "Queueing theory's simplest model, the M/M/1 queue (random arrivals, random service times, one worker)". The notation M/M/1 and M/M/c is never explained. I don't know what the letters stand for, or what kind of "random" the formula W = S/(1 − ρ) assumes. That makes it hard to judge when the formula applies to a real server.

2. "W = S + P(wait) × S / (c(1 − ρ))". Erlang's P(wait) formula is given as a fact, which I can accept. But the second term, the mean waiting time once a request has to wait, isn't explained at all. I couldn't see why the extra wait is S/(c(1 − ρ)).

#### cx4: Shipping and operating

3. "errors began at 15:01:40 UTC, the burn-rate page fired at 15:09:00". Over 60 minutes, the 14.4 rule needs an average error rate above 14.4% for a 99% SLO. With steady traffic, even 100% failures for 7.3 minutes give an hourly error rate of only about 12%. So I don't see how this page could fire after 7.3 minutes, unless there was almost no traffic before 15:00, and the notes don't say that.

4. "never deploy just before the pantry opens on a Saturday: a change freeze around critical periods is ordinary practice". This seems to clash with the incident. The incident_timeline example timestamp is 2027-03-13T10:01:40-05:00 (15:01:40Z, the incident's start time), and 13 March 2027 is a Saturday. So version 1.6.0 seems to have been deployed during Saturday opening. Yet the postmortem's list of contributing factors doesn't mention the change freeze at all.

#### cx5: Maintaining the system

5. Lesson 5 says "A good moment for 1.0.0 is the final release in week 13", but Lesson 4's incident is with "version 1.6.0" in March, before week 13. I couldn't tell whether the pantry already went past 1.0.0 against this advice, or whether the two examples just weren't meant to line up.

6. P3(c): "the configuration setting SMS_KEY is renamed SMS_API_KEY, with the old name still accepted and a warning logged". The notes say a breaking change needs a major version and an addition a minor one. They never say how to version a deprecation, where the old form still works but is announced as going away. They also don't say whether a deprecation needs a migration note, which is what the problem asks.

#### cx6: Evaluating the work

7. "About 2,400 volunteers were each randomized once" across "the city's food-bank network, whose 14 pantries share the system". Lesson 3 P1 says the 14 pantries "would each send their Thursday reminders ... to about 400 volunteers", which is about 5,600. Lesson 3 also said the network had only "asked whether its 14 pantries could use the system", while here they already share it. I couldn't reconcile the size of the network or the timeline.

8. "Last term's rate was about 59%". It isn't clear whose rate this is: the one pantry's prototype, or all 14 pantries. If the network only started using the system this term, I don't see where a network-wide baseline from last term came from.

#### cx7: Documentation and handover

9. doc_links, slugs: "delete every character that isn't a letter, digit, underscore, hyphen or space". I can't tell whether "letter" means ASCII letters only, or any Unicode letter (Python's isalpha/isalnum). This matters for a heading like "Diátaxis", which the lesson itself uses, and it changes the expected slug.

#### cx8: Launch, final presentation and what comes next

10. "the 95th percentile is 41 seconds, so NFR-1's 30-second target is still missed". Lesson 1 gave the prototype's 95th percentile as 35 seconds. So the presentation example is worse than the prototype, and nothing comments on it. I couldn't tell whether this is deliberate (a different way of measuring) or a slip.

### CS 450 Formal Methods and Verification

#### fm6: Proof assistants and verification in practice

11. rup_checker hint: "If a lemma contains both x and ¬x, that dict can't make both false, but such a lemma is always true, so returning True for it is right." With {abs(l): l < 0 for l in lemma}, the later literal simply overwrites the earlier one. Propagation then may not reach a conflict, so this approach returns False. I can't tell whether the hint means I must handle this case explicitly, or claims the dict approach already returns True. As far as I can see, it doesn't.

### Across courses

12. CS 491 Lesson 8: "CS 480 Ethics, Law and Policy of Computing (required, and taken alongside this course)". My courses this term are CS 491 and CS 450, and CS 480 isn't among the courses I have completed. So I haven't taken it and am not taking it alongside. I don't know whether I'm missing a required course, or whether the reference is out of date.

## Professor's response (part A: CS 491, CS 450)

1. **cx3, M/M/1 notation.** The parenthetical has been replaced by a short paragraph after the formula. It explains Kendall's notation (arrivals / service times / number of workers) and says that M (Markov) means memoryless: Poisson arrivals (MATH 230 Lesson 2) and exponential service times (MATH 230 Lesson 3), with what memorylessness means for a request in service. It also says when the model fits poorly (a burst triggered by one event, nearly constant service times) and that its answers should be checked with a load test.

2. **cx3, the term S/(c(1 − ρ)).** I added a paragraph before the worked example. P(wait) stays as given. The argument for the second term: in M/M/1 the mean wait is W − S = ρS/(1 − ρ), and a request waits with probability ρ, so a request that waits waits S/(1 − ρ) on average. While all c workers are busy, they finish requests together at rate c/S (by memorylessness), so the waiting line behaves like an M/M/1 queue with service time S/c. The conditional wait is therefore S/(c(1 − ρ)). As a check, c = 1 gives P(wait) = ρ and recovers S/(1 − ρ).

3. **cx4, burn-rate page timing.** This was a real gap: as written, the page couldn't fire after 7.3 minutes. I computed the timing and stated the assumptions that make it work. The pantry opens at 15:00 UTC (10:00 local), and the SLI counts only check-ins during opening hours, so at 15:09 the one-hour window held only nine minutes of requests. That is about 36 requests, at Lesson 3's 4 a minute. Eight of them had failed, an error rate of 22% and a burn rate of 22, which matches the pager line "burn rate 22x" in the incident_timeline problem. The five-minute window is higher, about 27%. Only the check-ins served by the old copies failed, which the notes now say. The page didn't fire sooner because the pantry's rule also needs at least 35 requests in the window (the notes' low-traffic minimum). That count is reached at 15:08:45, and the rules are evaluated once a minute. Checked: 8/36/0.01 = 22.2, and 35/4 = 8.75 minutes.

4. **cx4, the change freeze.** The deploy at 09:58 local, two minutes before opening, broke the freeze, and the postmortem should say so. The freeze sentence now points to the incident. The incident is dated Saturday 13 March 2027. The first contributing factor is now that the deploy started at 09:58, two minutes before opening, although the team's rule was a change freeze then. A second system-changing action item was added: a pipeline that refuses production deploys during the Saturday freeze. Related fix: Lesson 2's analytics event was timestamped 10:14Z, which is before opening. It is now 15:14Z.

5. **cx5, 1.0.0 in week 13 vs. version 1.6.0 in March.** The two didn't agree. The pantry's incident release is now 0.6.0, with the rollback to 0.5.2. I changed this in Lesson 4, in Lesson 8's reflection example, and in the incident_timeline problem's logs (spec regenerated). Lesson 5 now says that the beta and launch releases are numbered 0.x, and that the first incident was 0.6.0.

6. **cx5, versioning a deprecation.** I added a sentence: a deprecation is a minor version, because semver 2.0.0 requires the minor number to rise when any functionality is marked deprecated. Its changelog entry is an early migration note saying what to change and in which major version the old form goes. P3(c)'s answer now calls (c) a deprecation that needs a migration note (rename the setting now, before 2.0.0), and (d) repeats it.

7. **cx6, network size and timeline.** Lesson 3 still has the network only asking (the growth case: 14 × 400 ≈ 5,600 volunteers). Lesson 6 now says that, partway through the term, six of the 14 pantries began sending their reminders through the system, about 2,400 volunteers in all. The power sentence now says 4,160 per group is more than the six pantries have, and more even than all 14 (about 5,600). Checked: 1,023.4 per group for 6 points and 4,164 per group for 3 points.

8. **cx6, "last term's rate".** Replaced with a baseline that has a clear source. In the weeks before the experiment, the system's logs showed about 59% of volunteers at the six pantries confirming after reminder A.

9. **cx7 doc_links, "letter".** The prompt now says that letters and digits are meant in the Unicode sense, as `\w` in a Python regular expression matches them, so `## Diátaxis` gives `diátaxis`. This is what the reference solution already did. I added a hidden test, `slugs('# Diátaxis\n## Café & tea\n')` → `['diátaxis', 'café--tea']`.

10. **cx8, p95 of 41 s vs. the prototype's 35 s.** This was a slip. The presentation example now reads "the 95th percentile is 33 seconds, down from the prototype's 35, so NFR-1's 30-second target is still missed". That is consistent with CS 490 Lesson 8 and CS 491 Lesson 1.

11. **cs450 fm6 rup_checker.** The reference solution was already correct: it checks for a lemma containing both x and ¬x and returns True before building the dict. But the hint was ambiguous, and no test covered the case. A dict-only solution returns False for it, which I confirmed by running it. Changes:
    - The prompt now says that such a lemma is RUP at once, because assuming all its literals false is already a contradiction.
    - The hint now tells students to test for that case first. It explains that the dict would let the later literal overwrite the earlier one, so propagation might find no conflict.
    - I added a test, "A lemma with x and not x", with `is_rup([[1, 2]], [1, -1])`, `is_rup([[1, 2]], [-1, 3, 1])` and a refutation containing the tautology `[2, -2]`. The dict-only version fails it.

12. **CS 480.** No change. CS 480 Ethics, Law and Policy of Computing is a required Year 4 Spring course taken in parallel, so "taken alongside this course" is right. The student was given only two of the term's courses.

### Checks

- `node --check` on data/cs491.js, data/cs491-code.js and data/cs450-code.js: ok.
- gen_code.py for cs491 and cs450: 0 problems need attention. Starters still fail (rup_checker: starter fails 5 of 5 tests).
- Pyodide runs (pyrun.mjs): cs491 128 ok, cs450 65 ok, with no other lines.
- validate_content: all good.
- check_problems: 407 problems, 0 problems found.
- check_lesson_code: no cs491 or cs450 lines. The only mismatches are the known cs101/cs102 false alarms.
- lesson_time: 0 lessons over 100 minutes. In the slow estimate cx3 is 78 minutes, cx4 69, cx5 68, cx6 70, cx8 67 and fm6 70.
- test_dump_course: all checks passed.

The c491/u*.js part files remain stale. data/cs491.js was edited directly.

---

# Student review: Year 4 Spring

*Round 3, part B (CS 480). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a fourth-year CS student. I have done the whole core sequence through CS 470 Deep Learning and CS 490 Capstone I, including the CS 100 ethics lessons, CS 380 Security Fundamentals, MATH 230 probability and statistics, and CS 370's confusion-matrix material. I have never studied law. This term my only course is CS 480 Ethics, Law and Policy of Computing. I read all eight lessons in order and tried every quiz question and practice problem. Most numbers checked out when I worked them by hand. The items below are the places where I got stuck or found an ambiguity.

### CS 480 Ethics, Law and Policy of Computing

#### et4: Algorithmic fairness and anti-discrimination law

1. "Calibration (the meaning of a score is the same in every group) generalizes predictive parity to scores." "The meaning of a score is the same" is the only definition given, and I couldn't turn it into a formula the way the table does for the other four definitions. I also couldn't see what the Kleinberg et al. "version for calibrated scores" actually says.

2. P1: "Which fairness definitions hold, approximately?" I get selection rates 0.6 and 0.4, TPR 0.8 and 0.75, FPR 0.3 and about 0.167, and PPV 0.8 and 0.75. The lesson never says how close two rates must be to count as "approximately" equal. So I can't tell whether 0.8 vs 0.75 means equal opportunity and predictive parity "hold". The four-fifths ratio is the only threshold the lesson gives, and it is for selection rates.

3. The lesson describes a three-step disparate-impact framework: "the plaintiff can still win by showing a less discriminatory alternative the employer refused to adopt". The key term says disparate impact is "unlawful in US employment law unless justified by business necessity". The key term leaves out the third step, so the two descriptions seem to disagree about whether business necessity ends the case.

#### et5: Safety, liability and software failure

4. "Boeing paid $2.5 billion under a 2021 deferred prosecution agreement for defrauding the FAA's evaluation group." The "FAA's evaluation group" is never explained. I don't know what it evaluated or why deceiving it was the charge, rather than anything about the crashes.

5. Q4: "Two redundant channels each fail with probability 0.01 independently, but share a power supply that fails with probability 0.001." In the lesson, 0.01 is the sensor's failure probability and a channel fails with probability 0.01099. In the quiz, "each fail with probability 0.01" reads as the whole channel's probability. I wasn't sure whether 0.01 already includes the power failure. The intended answer ("About 0.0011") only works if it doesn't.

6. P1, last question: "Would the second sensor still help if a disagreement made the controller disengage...?" The lesson doesn't say whether a braking controller that disengages counts as "failing" in the fault tree. I can't compute the comparison until I decide that, and the answer depends on it: if disengaging counts as failure, failure becomes about twice as likely.

#### et6: Security law: computer crime, circumvention and disclosure

7. "§ 1030(a)(2): intentionally accessing a computer 'without authorization'... Because 'protected computer' includes any computer used in interstate commerce, this covers essentially every computer on the internet." The quoted text of (a)(2) never uses the term "protected computer". I didn't understand where that term enters the offence or why it matters.

8. P2(c): "The vendor is an EU manufacturer that learns on 20 March 2026 that the bug is being exploited. What CRA reporting deadlines apply? What if it had learned this on 20 October 2026 instead?" The lesson says reporting applies "From 11 September 2026". It doesn't say what happens to an exploitation learned before that date that is still going on afterwards. For the October case, the final report is due "within 14 days after a fix is available". If the part (a) fix of 15 May still holds, the fix existed before the vendor learned of the exploitation, and I can't work out when that 14-day clock starts. I also don't know whether (c) keeps the fix assumption from (a) or (b).

9. CODE bounty_scope, audit: "reason is 'excluded' (an out pattern matches), 'not listed' (no in pattern matches)". The prompt doesn't say which reason to report when a target matches an "out" pattern and also matches no "in" pattern.

#### et8: AI governance, accessibility law and making policy

10. P1(a): "a chatbot answering questions on a bank's website". The timeline gives "Transparency (Article 50) | 2 August 2026 (generative systems already on the market: 2 December 2026 for marking output)". I can't tell whether a bank chatbot counts as a "generative system" or whether it is already on the market, so I don't know which date to give. CODE ai_act_tier uses 2 August 2026 for every transparency case, so the problem and the programming exercise seem to expect different answers.

11. "Standards bodies (W3C, IETF, ISO/IEC, CEN-CENELEC for the AI Act's harmonised standards)". CEN-CENELEC is never expanded, and the lesson doesn't explain what a "harmonised standard" is or how it relates to the law. Earlier the lesson said the high-risk obligations were postponed "because the technical standards meant to define them weren't ready", and I couldn't connect that to these bodies.

12. "Texas's TRAIGA (effective 2026) bans certain harmful uses". The acronym is never expanded and the "harmful uses" are never named, so I couldn't use it as evidence in P3.

### Across courses

13. Three lessons build on optional lessons from earlier courses that I may not have taken. et4 says "CS 100's optional lesson on COMPAS showed..." and then checks its identity against "CS 100's tables": "Both match the tables (32/50 and 8/80)". This course never shows those tables, so I couldn't confirm where 32/50 and 8/80 come from. I had to rebuild group sizes of 100 myself to check them. Similarly, et5 relies on "the race condition and the overflowing one-byte counter that CS 101 described" (a CS 101 optional lesson), and et2 opens from "CS 102's optional lesson".

## Professor's response (part B: CS 480)

1. **et4, calibration.** I replaced the parenthetical with a definition and formula: a score is calibrated across groups if, for every value *s*, P(positive | score = *s*, group A) = P(positive | score = *s*, group B), plus the stronger version (the fraction equals *s*). A sentence explains why this includes predictive parity for a two-label classifier and notes that the COMPAS tool is calibrated in this sense. The Kleinberg–Mullainathan–Raghavan parenthetical now states their result: a calibrated score can't also give actual positives equal average scores across groups and actual negatives equal average scores across groups, unless base rates are equal or prediction is perfect.

2. **et4 P1, "approximately".** A new sentence after the identity examples says real rates are never exactly equal and that the law sets a numeric threshold only for selection rates (four-fifths). For the other rates, audits report the gap as a difference or as a smaller/larger ratio. P1 now asks which definitions hold *exactly*, the smaller/larger ratio for each rate, and which definitions come closest and which is furthest. Answer: none holds exactly; TPR and PPV ratios ≈ 0.94 (closest); selection ≈ 0.67 (flagged by four-fifths); FPR ≈ 0.56 (furthest). Checked in Python: 0.9375, 0.6667, 0.5556.

3. **et4, disparate-impact key term.** The term now gives all three steps: unlawful unless the employer shows the practice is job related and consistent with business necessity, and still unlawful if the plaintiff then shows a less discriminatory alternative the employer refused to adopt. It now matches the notes.

4. **et5, "FAA's evaluation group".** The sentence now names the FAA's Aircraft Evaluation Group, the office that decides what training pilots need for a new aircraft type. It explains that two Boeing pilots concealed MCAS's expanded operation from the group, so its report, and then airline manuals and training, left MCAS out. It adds that the charge was conspiracy to defraud that group (deceiving a regulator, not causing the crashes) and breaks down the $2.5 billion: $243.6M penalty, $1.77B to airline customers, $500M victims' fund. Checked against the DOJ press release of 7 January 2021 (justice.gov/archives/opa/pr/boeing-charged-737-max-fraud-conspiracy-and-agrees-pay-over-25-billion) and the 2025 non-prosecution agreement's description of the AEG's role.

5. **et5 Q4.** The question now says each channel has its own sensor (failure probability 0.01, independent), the two channels share a power supply (0.001), and a channel is down if its sensor or the power fails. The intended answer of about 0.0011 is now the only reading.

6. **et5 P1, last part.** The question now says the controller disengages on disagreement *instead of* using a self-test, and tells the student to count disengaging as failing to brake. The answer keeps 2.1 × 10⁻⁵ (1 − (1−10⁻⁶)(1−2×10⁻⁵) ≈ 2.1×10⁻⁵) and now treats the assumption as given rather than conditional.

7. **et6, "protected computer".** § 1030(a)(2) is now described in full: obtaining information from a financial institution's records, from a federal agency, or "from any protected computer". It adds that § 1030(e)(2) defines a protected computer to include any computer "used in or affecting interstate or foreign commerce or communication". Checked against the statute text (law.cornell.edu/uscode/text/18/1030).

8. **et6 P2(c).** Rewritten so it has one answer and no longer depends on the fix dates in (a) and (b). Now (c) is a different bug: the manufacturer becomes aware at 10:00 on 20 October 2026 that it is actively exploited, and a fix becomes available on 2 November 2026. The answer gives the early warning by 10:00 on 21 October, the notification by 10:00 on 23 October, and the final report by 16 November (14 days after the fix). The second question now asks whether the CRA would have required any report if both events had happened in March 2026. The answer is no, because reporting applies only from 11 September 2026. This avoids the unsettled question of an exploitation learned before that date and still going on after it. The 14-day-after-fix trigger was checked against the Commission's CRA reporting page (digital-strategy.ec.europa.eu/en/policies/cra-reporting). Dates were checked with Python's datetime.

9. **CODE bounty_scope.** The prompt now says "excluded" applies when an out pattern matches, whether or not an in pattern does, and "not listed" applies when no out pattern and no in pattern matches. This matches the reference solution, which checks exclusions first. I added a test with a target that is excluded and also not listed. Regenerated with 0 problems, and all tests pass in Pyodide.

10. **et8 P1(a) and CODE ai_act_tier.** The timeline row now says exactly which systems get the later date: systems that generate audio, images, video or text and were placed on the market before 2 August 2026 have until 2 December 2026 to mark their output. P1(a) now has one answer: the chatbot launched in 2027 and only picks staff-written answers, so it generates no text, and its disclosure duty has applied since 2 August 2026. The ai_act_tier prompt now says the model leaves out the 2 December 2026 marking date for older generative systems, so it fits systems placed on the market from 2 August 2026 on. The problem and the exercise now give the same answer. The Omnibus transitional rule was checked against several law-firm summaries of Regulation 2026/1744 (Lewis Silkin, White & Case, RPC). They agree that only the Article 50(2) marking duty is deferred, and only for systems already on the market.

11. **et8, CEN-CENELEC and harmonised standards.** The standards-bodies bullet now explains harmonised standards: European standards written at the Commission's request that say concretely how to meet a law's requirements. Following one whose reference is published in the Official Journal gives a presumption of conformity (AI Act Article 40). It expands CEN and CENELEC (the European committees for standardization and for electrotechnical standardization) and ties these standards to the postponement of the high-risk obligations mentioned earlier in the lesson.

12. **et8, TRAIGA.** The acronym is expanded to Texas Responsible Artificial Intelligence Governance Act, with the effective date 1 January 2026. The bullet now names the bans: developing or deploying AI with intent to incite self-harm, harm or crime; to discriminate unlawfully against a protected class (the Act says disparate impact alone doesn't show intent); or to produce child sexual abuse material. It also bars government agencies from social scoring. Checked against the enrolled bill text, HB 149 §§ 552.052–552.057 (capitol.texas.gov/tlodocs/89R/billtext/html/HB00149F.HTM).

13. **Optional lessons.** et4 now reproduces the CS 100 COMPAS tables (A: 48/32/2/18; B: 12/8/8/72) right after the opening, along with the calibration and false-positive figures, so "32/50 and 8/80" can be checked in the lesson. The later reference now says "the COMPAS tables above". et5 now describes the two Therac-25 bugs from CS 101's optional lesson: the setup race when settings were edited quickly, and the one-byte counter that wrapped from 255 to 0 and skipped a safety check. et2's opening sentence already summarized what CS 102's optional lesson taught (automatic copyright, licenses as permission with conditions, permissive versus copyleft). It is now marked explicitly as a summary for students who skipped that lesson.
