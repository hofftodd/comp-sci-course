# Student review: Year 4 Spring

*Round 2, part A (CS 491, CS 450). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a fourth-year student who has finished everything up to CS 490 Capstone Project I, CS 430 Advanced Algorithms and CS 470 Deep Learning. That includes probability and statistics (MATH 230), algorithms, theory of computation, programming languages (CS 360), operating systems, distributed systems and security. I read the full dumps of CS 491 Capstone Project II and CS 450 Formal Methods and Verification lesson by lesson, and tried each quiz and practice problem in my head. I also checked most of the worked numbers by hand.

### CS 491 Capstone Project II

#### cx1: Replanning for the second term

1. "The simplest correction for estimation error is to divide new estimates by the team's average ratio." The code doesn't compute that average. It computes Ana's "overall ratio" as `sum(e) / sum(a)` (0.73). The mean of her eight ratios is about 0.72. Q2 says "ratios averaging 0.5", which sounds like the mean of the ratios. I can't tell which "average ratio" I'm supposed to use.

2. In the CODE commit_scope rules: "commit a story if, with it added, the probability ... is still at least confidence." It doesn't say what happens to the non-must stories when the musts alone are already below the confidence (`musts_fit` is False). Do I still try each one, or defer all of them?

#### cx2: Iterating with users

3. In the CODE funnel spec: "find the first event with that name at or after the time of the previous matched step". If two steps have the same name, or two different events share a timestamp, can the event that matched the previous step match again? "At or after" seems to allow it, and the spec doesn't say.

#### cx3: Performance and scaling

4. Two descriptions of the same reminder burst on 4 workers contradict each other.
   - Little's law section: "each request spends 0.25 s inside on average. Then 40 × 0.25 = 10 requests are in progress at once. If the server has only 4 worker processes ... the other 6, on average, wait in a queue."
   - Utilization section: "At 40 requests per second, 0.05 s of work each, and 4 workers, ρ = 0.5 ... ρ = 0.5 gives about 54 ms rather than 100 ms, so about 40 × 0.054 ≈ 2 requests are inside at once."

   If all 4 workers are always busy with 6 more waiting, utilization would be 1, not 0.5. I can't tell whether these are two different scenarios or one.

5. "A server with c workers is the M/M/c queue, whose formula (A. K. Erlang's, 1917) is longer ... ρ = 0.5 gives about 54 ms ... all four are busy only about a sixth of the time." The formula is never given, so I can't reproduce either the 54 ms or the "sixth", or use M/M/c myself.

#### cx4: Shipping and operating

No items.

#### cx5: Maintaining the system

6. "For inputs too many to enumerate, record a sample of requests and their responses instead: synthetic requests generated to resemble real ones." First it says to *record* a sample, which sounds like real traffic, and then the requests are *generated*. I don't understand where the inputs come from, or how a synthetic request has a recorded old response.

7. In P1: `"new" if visits == 0 else ("large" if size >= 5 else "small") if visits < 3 else "frequent"`. How Python groups chained conditional expressions without parentheses was never explained. I'm not sure how this parses, and that grouping is exactly what the golden master is supposed to capture.

8. In the CODE update_plan spec: "updating a package only after every package it requires that is also in the plan." Suppose A requires X, X is not in the plan, and X requires B, which is in the plan. Must A wait for B? Only direct requirements are mentioned.

#### cx6: Evaluating the work

No items.

#### cx7: Documentation and handover

No items.

#### cx8: Launch, final presentation and what comes next

9. The order of launch and handover is unclear, and the two lessons seem to conflict.
   - Lesson 8 says the launch and the go/no-go happen in "the last two weeks". Hypercare then has "the team at the desk for the first two Saturdays ... fixes released quickly but still through the pipeline."
   - Lesson 7's handover is in week 13. It says "Students are removed afterwards" from every account, and its model support statement is "we will not make changes".

   If launch comes after handover, I don't see how the team can release fixes during hypercare. If it comes before, the milestone table doesn't show it.

10. "The readiness review's items are done: SLOs and alerts live, rollback rehearsed, backups restored (Lessons 3 and 4)." Neither Lesson 3 nor Lesson 4 asks for a backup restore in the readiness review. Restoring a backup is Lesson 7's recovery test, and Lesson 4 only mentions it in the GitLab sidebar.

### CS 450 Formal Methods and Verification

#### fm1: Specifications, invariants and property-based testing

No items.

#### fm2: SAT solving

11. "the sequential counter adds s_i, meaning 'one of x₁, …, x_i is true', with clauses x_i ⇒ s_i, s_(i−1) ⇒ s_i and ¬(s_(i−1) ∧ x_i), which is 3n − 4 clauses and n − 1 new variables." The range of i for each clause family isn't given, so I can't arrive at 3n − 4. The notes also don't show why these clauses force at most one x to be true.

#### fm3: SMT, symbolic execution and bounded model checking

No items.

#### fm4: Model checking concurrent systems

12. The fairness paragraph uses a lasso that doesn't seem to violate the property. Starvation-freedom is "G (wait₀ → F cs₀)", and the example lasso is one "in which thread 0 stays at pc 0 forever, before raising its flag (outside the critical section, not trying to enter...)". In that run wait₀ is never true, so the formula holds anyway. I don't see why fairness is needed to rule it out.

    It also seems wrong to rule it out at all: a real thread may legitimately never want to enter.

13. The fairness in the TLA+ spec doesn't seem to match the prose. The prose says weak fairness forces a step that stays enabled, such as thread 0's, to be taken. The spec has only `WF_vars(Next)`, where Next is "∃ i : ...". Next is always enabled, so that seems to promise only that *some* step happens, not that thread 0 ever moves. I can't tell whether per-thread fairness (for example WF on each thread's actions) is needed.

14. In the CODE find_lasso: "looks for a liveness counterexample to 'good holds again and again' (in LTL, G F good)". The notes' liveness property is G (wait → F cs), not G F good, and they never show how one relates to the other. find_lasso also takes no fairness assumption, even though the notes say "model checkers check liveness only over fair runs". I don't know whether find_lasso's lassos are meant to be fair or not.

#### fm5: Hoare logic and program proofs

No items.

#### fm6: Proof assistants and verification in practice

15. "A proof assistant (MATH 120's optional lesson introduced them)" and "The third is MATH 120's example". I don't know whether I took that optional lesson. Parts of the Lean explanation lean on it, for example "Lean (shown briefly in MATH 120's optional lesson ...)".

16. "congrArg Nat.succ ih turns the hypothesis 0 + k = k into 0 + (k + 1) = k + 1." As I understand congrArg from the description, it gives Nat.succ (0 + k) = Nat.succ k. The notes skip the step that turns Nat.succ (0 + k) into 0 + (k + 1), presumably that addition is defined so that n + succ k computes to succ (n + k). Without that step I can't follow why `exact` closes the goal.

### Across courses

17. CS 491 Lesson 8 says "CS 480 Ethics, Law and Policy of Computing, a required course this term". My courses this term are CS 491 and CS 450. CS 480 isn't among them and isn't in my earlier courses either, so I don't know whether I should be taking it or whether the reference is wrong.

## Professor's response (part A: CS 491, CS 450)

### CS 491 Capstone Project II

1. **"Average ratio" was ambiguous.** cx1 now says to divide by the team's *overall ratio*, total estimated hours divided by total actual hours, and says why it isn't the mean of the separate ratios (that mean weights a one-hour task as much as a ten-hour one). The code's 0.73 is exactly this overall ratio. Quiz Q2 now gives totals ("estimated at 40 hours in total and took 80, an overall ratio of 0.5"), so its answer of 12 hours is unambiguous.

2. **commit_scope when the musts don't fit.** The prompt (in the spec) now says to apply the test to every non-must even when the musts alone fall short. For a confidence above 0.5 that defers them all, because adding work can't raise the probability back up. (I checked this. When the musts' z-score is at least 0, adding a story lowers the numerator and raises the denominator. When it is negative, the new z stays at or below 0, so the probability stays at or below 0.5.) The reference solution already behaves this way and is unchanged.

3. **funnel and repeated matches.** The prompt now says that only times are compared. An event at the same time as the previous match qualifies, and if two steps share a name, one event can match both. This is what the reference solution does. The tests are unchanged.

4. **The two burst descriptions.** They are now one consistent scenario. The Little's law example's load test finds 54 ms per request at 40 requests per second, so 40 × 0.054 ≈ 2.2 requests are inside at once. On 4 workers that means about 2 working and 2 idle on average, with waiting only at moments when all 4 are busy. The utilization section's Erlang C computation (item 5) then reproduces those figures from the model and says so. The 0.25 s case stays only as a clearly marked hypothetical in parentheses ("had the test found 0.25 s…, at least 6 would be waiting: a sign of overload"). The separate Little's law quiz question (40 × 0.25 = 10) mentions no workers, so it doesn't conflict.

5. **The Erlang formula.** cx3 now gives Erlang's C formula and W in a displayed formula, with the offered load *a* = λS defined. It works the burst by hand: *a* = 2, ρ = 0.5, sum 6.33, T = 1.33, P(wait) ≈ 0.174, W ≈ 0.0543 s. It also has a short executed Python block that prints `0.174 54.3 2.17` (checked by the lesson-code checker). The text now says "about 17% of the time (roughly a sixth)" and L ≈ 2.2.

6. **Golden master on sampled inputs.** Rewritten: generate a few thousand synthetic requests that resemble real ones (not real requests, which carry personal data), run the old code on each and record its responses. Those recorded responses are the golden master. There is no longer any suggestion of recording real traffic.

7. **Chained conditional expressions.** The P1 question now notes that the golden master answers the question by running the code, so you needn't parse it first. It also states Python's rule: `X if A else Y if B else Z` means `X if A else (Y if B else Z)`. I checked the rule and the answer's values (label(6, 0) = "new", label(6, 1) = "large", label(2, 3) = "frequent") in Python.

8. **update_plan and indirect requirements.** The prompt now says that only direct requirements count. It uses the student's example: A requires X, X is not in the plan, and X requires B, which is. A need not wait for B, because X isn't being changed. This matches the reference solution, which is unchanged.

9. **Launch versus handover.** Made explicit. Lesson 8's introduction now says that launch comes first, by week 11, so that the first Saturdays of real use fall while the team still has access. The week 13 handover ends that period, and the presentation and reflection follow in week 14. The hypercare paragraph now ends "Hypercare ends at the handover meeting, when the maintainer takes over and the team's access is removed." The milestone table in Lesson 1 has a new row: week 11, "Launch, then two weeks of close support (not graded separately)", Lesson 8. Lesson 7's "Students are removed afterwards" and "we will not make changes" now come after hypercare, so they no longer conflict.

10. **"Backups restored (Lessons 3 and 4)".** The student is right. The go/no-go item now reads: "SLOs and alerts live and rollback rehearsed (Lessons 3 and 4). A backup has also been restored into staging, the recovery test of Lesson 7 run early: a launch whose backups have never been restored is a no-go." This also fits the new order, launch before handover.

### CS 450 Formal Methods and Verification

11. **Sequential counter.** The notes now give the range of *i* for each clause family: *x_i* ⇒ *s_i* for *i* = 1…n−1 (n−1 clauses), *s_{i−1}* ⇒ *s_i* for *i* = 2…n−1 (n−2), and ¬(*s_{i−1}* ∧ *x_i*) for *i* = 2…n (n−1). That totals 3n − 4. They also give a two-sentence argument for why it works, both ways, and note that each ⇒ is one two-literal clause. I verified the count and the claim that the clauses are satisfiable exactly when at most one *x* is true, by brute force for n = 2 to 6.

12. **The fairness lasso.** This was a real error, and the student is right on both points. The "thread 0 idle forever" lasso never has wait₀ true, so it doesn't violate G(wait₀ → F cs₀). It is also a legitimate run that fairness should *not* exclude. I rewrote the liveness and fairness part of fm4 as follows.
    - wait₀ is now defined as pc 1 or 2 and cs₀ as pc 3.
    - The notes show that in this model starvation-freedom fails exactly when there is a lasso whose cycle has thread 0 waiting throughout, because a waiting thread stops waiting only by entering. For `peterson` there is none, by the bounded-waiting argument, which is now spelled out: thread 1 blocks as soon as it sets turn to 0 itself.
    - The idle lasso is now described correctly. It is legal, it doesn't break starvation-freedom, and it breaks only G F cs₀, which is the wrong property.
    - The fairness paragraph says what fairness is actually for. The Python search needed none, but only because a waiting thread has no step and runs never stop while a step is possible. If spinning were a step, there would be a one-state lasso: thread 0 spins while thread 1, ready to set turn, never runs. TLA+'s stuttering steps would let a behaviour stop just after thread 0 raises its flag. Fairness rules both out, and it must not force an idle thread to try.
    - I checked these claims in Python. The reference `find_lasso` returns None for good = "pc0 not in (1, 2)" and finds the spin-variant self-loop. A fair-SCC search over the stuttering model finds 11 starving SCCs with no fairness and none under either WF(Next) or per-thread fairness.

13. **WF_vars(Next) in the TLA+ spec.** The student is right that WF_vars(Next) promises only that some step happens. (For Peterson that happens to be enough, as my fair-SCC search confirmed, but the prose didn't say so and didn't match.) The spec now has `Fairness == \A i \in {0, 1} : WF_vars(SetTurn(i) \/ Enter(i) \/ Leave(i))`, which gives per-thread weak fairness on every step except Raise, so idle threads may stay idle. It also has `StarvationFree == \A i \in {0, 1} : (pc[i] \in {"setturn", "wait"}) ~> (pc[i] = "cs")`. The explanation covers `\A`, `WF_vars(A)` and stuttering steps, says why Raise is excluded, says why WF_vars(Next) alone would suffice here but isn't what we mean, explains `~>` as G(P → F Q), and says that TLC checks liveness over fair behaviours and prints a lasso. The spec is still labelled "this code was not run here".

14. **find_lasso versus G(wait → F cs), and fairness.** The notes now explain the relation (item 12): starvation-freedom is G F good with good = "thread 0 is not waiting", in models where waiting ends only by entering. The problem's prompt (in the spec) now says this too. It also says that `find_lasso` assumes no fairness, so every cycle counts, even one that fairness would exclude. The tests already check both lassos the notes describe. They are unchanged and still pass.

15. **MATH 120's optional lesson.** fm6 no longer depends on it. The proof-assistant sentence now says "MATH 120 had an optional lesson on them; this lesson assumes nothing from it". The parenthetical on Lean is gone, and "The third is MATH 120's example" now reads "The third proves 0 + n = n by induction on n."

16. **Why `exact congrArg Nat.succ ih` closes the goal.** The missing step is now shown. Lean defines addition by recursion on the second argument (n + 0 = n, n + (k + 1) = (n + k) + 1). So `rfl` accepts the base case 0 + 0 = 0, and the step goal 0 + (k + 1) = k + 1 computes to `Nat.succ (0 + k) = Nat.succ k`. `congrArg f h` is defined generally, and `exact` accepts the term because Lean compares types after computing them. `Nat.succ` is also defined.

### Across courses

17. **CS 480.** The reference is correct: CS 480 Ethics, Law and Policy of Computing is a required Year 4 Spring course. The student was given only two of the term's courses. To make the pointer read as a side reference, Lesson 8 now says "CS 480 Ethics, Law and Policy of Computing (required, and taken alongside this course) examines in depth". No legal claims were added.

### Checks

- `node --check` passes on data/cs491.js, data/cs491-code.js, data/cs450.js and data/cs450-code.js.
- gen_code.py regenerated both problem files: 0 problems need attention.
- Pyodide (pyrun.mjs) on cs491-code.js and cs450-code.js: only "ok" lines.
- validate_content.js: all good.
- check_problems.py: 407 problems, 0 problems found.
- check_lesson_code.py: no cs491 or cs450 lines. The new Erlang block was checked. The only mismatches are the known cs101 and cs102 false alarms.
- lesson_time.js: the slow estimate is at most 82 minutes for every cs491 and cs450 lesson.
- test_dump_course.js: all checks passed.
- c491/ part files are stale, as before; parts.json (the reference solutions) was not changed.

---

# Student review: Year 4 Spring

*Round 2, part B (CS 480). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a fourth-year CS student. Before this term I completed the full core sequence: CS 100 through CS 490, including CS 380 Security Fundamentals, CS 370 Intro to AI/ML, CS 470 Deep Learning and CS 430 Advanced Algorithms, plus discrete math, calculus, linear algebra, and MATH 230 Probability and Statistics. I program comfortably in Python. I have never taken a law course. All I know about law, ethics and policy comes from CS 100, CS 102's optional licensing lesson, CS 380's sidebar on authorization, and CS 490's data inventory. This term I am taking CS 480 Ethics, Law and Policy of Computing. I read every lesson of the dump in order and tried each quiz and practice problem.

### CS 480 Ethics, Law and Policy of Computing

#### et1: Professional ethics in practice

1. "the case shows that the legal route she used (the SEC) shaped what protection she had". The lesson never says what protection Haugen actually got, or why going to the SEC gave her any. The only SEC-related protections described are Sarbanes-Oxley and Dodd-Frank, and both are about securities fraud. I couldn't see how a disclosure about harms to teenagers counts as securities fraud.

2. P3: "Apply De George's conditions to Frances Haugen's disclosures as the lesson describes them." Most of De George's conditions are "you have reported it to your superior" and "you have exhausted internal channels". The lesson's account of Haugen doesn't say whether she raised anything internally before going to the Journal and the SEC. So I can't judge most of the conditions "as the lesson describes them".

#### et2: Intellectual property and software licenses

3. "chiefly a timely US copyright registration, which statutory damages require". The term "statutory damages" is never explained. I don't know what they are, how they differ from other damages, or why registration matters for them. That makes it hard to follow why only 482,000 books were covered.

4. P1: "Which dependencies, if any, block a proprietary release? What are the options for each?" For the AGPL-3.0-only `pdf` dependency, the only options the lesson supports are "replace it" or "release under AGPL". I don't know whether other options exist, such as getting a different license from the authors. For `charts` (MPL-2.0), the lesson says only that "changes to MPL files stay MPL". It doesn't say what a proprietary binary that ships unmodified MPL files owes, for example whether the source of those files must be offered. So I can't say what we actually have to do for that dependency.

#### et3: Privacy law and privacy engineering

5. "this one includes redefining personal data relative to who holds it". I don't understand what defining personal data "relative to who holds it" means, or how it would differ from the Article 3/personal-data definition given above. The same sentence also says "the member states had agreed a position ... and the Parliament had not, so nothing had changed in law". It assumes an EU law-making process (Commission proposes, member states and Parliament must both agree) that the lesson never explains.

6. "whose density is (1/2b) e^(−|x|/b)". Is "1/2b" meant as 1/(2b) or (1/2)·b? The code (`/ (2 * b)`) settles it, but the formula as written is ambiguous.

7. "Accuracy is predictable too: P(|noise| > t) = e^(−t/b)". This formula is stated without derivation. It took me a while to see that the two tails each contribute ½e^(−t/b). The lesson says nothing to connect it to the density.

8. "Equivalently, treat the list of counts as one query whose sensitivity is the most one person can change all the counts together (the sum of the absolute changes)". The lesson defines the Laplace mechanism only for a single numeric query f. It never says that adding independent Laplace noise of scale Δ/ε to each coordinate of a list-valued query is ε-DP when Δ is this summed sensitivity. P1(b) depends on that step. The next sentence, "So a system needs a privacy budget", also doesn't follow from the parallel-composition point just made. It seems to belong to the sequential-composition sentence before it.

9. P3: "Your company has trained a model on user posts. A user asks for deletion. What would it mean to comply, technically, and what are the options?" Nothing in this lesson (or in what I remember of CS 370/CS 470) covers removing one person's data from an already-trained model. So I have no technical options to start from apart from "retrain from scratch".

#### et4: Algorithmic fairness and anti-discrimination law

10. "Equalized odds and predictive parity can hold together only if base rates are equal or the classifier is perfect (FPR = 0 and TPR = 1)." This seems wrong by the lesson's own identity. If both groups have PPV = 1, the factor (1 − PPV)/PPV is 0, so FPR = 0 in both groups whatever p is. Then any equal TPR below 1 satisfies equalized odds and predictive parity together. TPR = 1 doesn't seem to be required, only FPR = 0. I couldn't tell whether "perfect" means something different here.

#### et5: Safety, liability and software failure

11. "from 0.6 to 2.5 degrees of stabilizer movement per activation" and "can never command more nose-down trim than the pilots can counter". The terms "stabilizer", "trim" and (less so) "angle of attack" are never explained. Without knowing what the stabilizer is or what trimming does, I can't judge how big the 0.6 to 2.5 degree change was, or what the third part of the redesign guarantees.

#### et6: Security law: computer crime, circumvention and disclosure

12. CODE bounty_scope: "a network in CIDR notation, such as "203.0.113.0/24", which matches IP addresses in it (use the ipaddress module)". The ipaddress module is never shown here or in any course I remember. The hint mentions only that `ip_address` raises ValueError. The prompt doesn't say how to build a network from a pattern or how to test whether an address is in it.

#### et8: AI governance, accessibility law and making policy

13. "CS 100 Lesson 5 introduced the EU AI Act's risk-based approach and the NIST AI Risk Management Framework, and Lesson 6 introduced WCAG." Does "Lesson 6" mean CS 100 Lesson 6, or this course's Lesson 6, which is about security law? Only much later does "(CS 100 Lesson 6)" make it clear.

14. "A 2026 interim rule pushed the compliance dates back a year". The lesson later says US agencies "must publish proposed rules and consider public comments before finalizing them". An "interim rule" is never explained, so I don't understand how it could change the dates without that process, or whether it is final.

15. CODE ai_act_tier: "write applies_from(system), the date the main obligations for its tier apply". The return type isn't stated. Other problems say "Dates are datetime.date objects", but this one doesn't, so I don't know whether to return a `datetime.date`, a string, or something else.

16. CODE a11y_audit: "Write audit(html) using html.parser.HTMLParser". The HTMLParser API is never shown in this course or an earlier one: which methods to override, what arguments `handle_starttag` and `handle_endtag` get, how `getpos()` and `close()` behave. The hint names some methods but doesn't explain them.

### Across courses

17. Cross-references with a bare "Lesson N" are sometimes ambiguous between this course and the course just named. In et6's introduction, "CS 380 Lesson 8's sidebar ... and Lesson 8 described coordinated disclosure" could mean CS 380 Lesson 8 or CS 480 Lesson 8, which is about AI governance. In et8's introduction, "Lesson 6 introduced WCAG" has the same problem (item 13). Each time I had to read ahead to work out which course was meant.

## Professor's response (part B: CS 480)

1. **et1, Haugen and the SEC.** Changed. The Haugen paragraph now explains that her SEC complaints framed the harms as securities fraud: they alleged Facebook misled investors by saying in public the opposite of what its own research found. That framing brought her SEC reports under Dodd-Frank's anti-retaliation protection. The paragraph adds that *Digital Realty v. Somers* (2018) limits that protection to reports made to the SEC, and that none of these laws covers giving documents to a newspaper. Checked against reporting on the eight-plus Whistleblower Aid complaints (CBS, Just Security) and summaries of the Supreme Court opinion.

2. **et1 P3, internal channels.** Changed. The notes now give what the public record says. Haugen said she lost trust after the civic integrity team was dissolved in December 2020, and she gathered internal research posted by other employees. The record does not show that she formally escalated to managers before leaving in May 2021. The model answer now treats "reported to superior / exhausted channels" as the disputed part: can De George's conditions be excused when internal routes seem futile?

3. **et2, statutory damages.** Changed. The term is now defined where it appears: an amount per work fixed by the Copyright Act ($750 to $30,000, up to $150,000 if willful) that an owner can claim instead of proving actual losses. It is available only for works registered before the infringement began or within three months of first publication (17 U.S.C. 504(c) and 412).

4. **et2 P1, options for `pdf` and `charts`.** Changed. A new paragraph after the license list explains that copyright holders can grant other licenses (dual licensing). It lists the options when a dependency blocks a release: replace it, get a different license, or change your own release terms. The MPL bullet now states the section 3.2 duty: if you ship MPL files in a binary, even unmodified, you must make their source available and say how to get it, while the rest of your code stays closed. This was checked against the MPL 2.0 text. The model answer was also wrong here: it said MPL source must be offered only "if you modify them". It now says the source of the MPL files must be offered whether modified or not.

5. **et3, "relative to who holds it" and EU law-making.** Changed. The notes now explain the proposal. Data such as pseudonymized records would not be personal data for a company with no means reasonably likely to be used to identify the people, even if another company holding the key could identify them. This was checked against IAPP and law-firm summaries of the Digital Omnibus Article 4(1) change. One sentence now explains that an EU regulation changes only when the Commission proposes and both the Parliament and the Council (member states' ministers) adopt the same text.

6. **et3, density notation.** Changed to e^(−|x|/b)/(2b).

7. **et3, tail probability.** Changed. The step is now shown: the right tail is ∫_t^∞ e^(−x/b)/(2b) dx = ½e^(−t/b), and the left tail is the same by symmetry, so P(|noise| > t) = e^(−t/b). Checked e^(−2.5) = 0.0821.

8. **et3, vector Laplace mechanism and budget sentence.** Changed. The privacy-budget sentences now follow the sequential-composition sentence, where they belong. The parallel-composition paragraph now states that adding independent Laplace noise of scale Δf/ε to each of k counts is ε-DP when Δf is the summed sensitivity. It gives a one-line argument: the joint density is a product, so the ratio is at most e^((|d1|+⋯+|dk|)/b) ≤ e^(Δf/b) = e^ε.

9. **et3 P3, erasure from trained models.** Changed. A short "Erasure and trained models" paragraph now covers the options:
   - retraining, including SISA sharding (Bourtoule et al., 2021);
   - approximate machine unlearning, which has weak guarantees;
   - training with differential privacy;
   - output filters.

   It also notes the EDPB's Opinion 28/2024: a model is anonymous only if extraction is negligibly likely, judged case by case. It links back to CS 370 Lesson 8 (Carlini's GPT-2 extraction; confirmed to be in ml8).

10. **et4, equalized odds and predictive parity.** The student is right, and the statement was wrong. By the identity FPR = (p/(1−p))·((1−PPV)/PPV)·TPR, PPV = 1 forces FPR = 0 in both groups for any p, so any common TPR works; TPR = 1 is not needed. The other degenerate case is TPR = 0: no true positives, so PPV = 0. That breaks the identity's PPV > 0 assumption, but the two criteria can still both hold. Example: groups with 50 and 20 positives, no true positives, and FPRs of 0.2 in both. Corrected text:
    - The identity holds for any classifier with at least one true positive (PPV > 0).
    - Equal PPV below 1 and equal nonzero TPR with different base rates force different FPRs.
    - With different base rates, the two criteria can hold together only in degenerate cases: no false positives in either group (FPR = 0, PPV = 1, any common TPR; a perfect classifier is one example) or no true positives (TPR = 0).

    The matching quiz question ("equal PPV and equal TPR … what must be true?") had the same gap: with PPV = 1, both FPRs are 0, so "A's FPR is higher" would be false. It now fixes PPV = 0.6 and TPR = 0.8. Recomputed FPRs: 0.533 and 0.133, ratio 4.

11. **et5, stabilizer, trim, angle of attack.** Changed. A parenthesis now defines all three. Angle of attack is the angle between the wing and the oncoming air; too high and the wing stalls. The horizontal stabilizer is the small wing at the tail. Trim is tilting it to set the nose's resting pitch, and a degree or two pushes the nose firmly enough that pilots must push or pull hard to oppose it.

12. **et6 CODE bounty_scope, ipaddress.** Changed (spec, regenerated). The prompt now shows `ipaddress.ip_address`, which raises ValueError for non-addresses, `ipaddress.ip_network`, and `addr in net`, which is False for an IPv6 address in an IPv4 network. It includes a two-line example, verified in Python 3.12.

13. **et8, "Lesson 6 introduced WCAG".** Now reads "CS 100 Lesson 6".

14. **et8, interim rule.** Changed. The rule is now named an interim final rule, with an explanation. The APA normally requires notice and comment first, but allows skipping it for "good cause" (impracticable, unnecessary or contrary to the public interest). Such a rule can take effect at once and is binding, and the agency takes comments afterward and may revise it. The specific rule took effect on 20 April 2026, with comments due by 22 June 2026. Its dates are 26 April 2027 and 26 April 2028. Checked against the Federal Register document 2026-07663 (91 FR, 20 April 2026), which cites 5 U.S.C. 553(b)(B) and 553(d)(1). The practice answer now says "interim final rule" too.

15. **et8 CODE ai_act_tier, return type.** Changed (spec): "Return dates as `datetime.date` objects, such as `date(2026, 8, 2)` (the starter imports `date`)."

16. **et8 CODE a11y_audit, HTMLParser.** Changed (spec). The prompt now explains the parts of HTMLParser a solution needs:
    - subclass it and override `handle_starttag(tag, attrs)` (tag lowercased; attrs a list of (name, value) pairs, with None for a bare attribute), `handle_endtag(tag)` and `handle_data(data)`;
    - a self-closing tag calls both start and end handlers;
    - `getpos()` returns (line, column), with lines counted from 1;
    - call `feed`, then `close`, and do whole-document checks after `close()`;
    - call `super().__init__()` in an overridden `__init__`.

    It ends with a short example whose output was verified by running it.

17. **Ambiguous "Lesson N".** et6's introduction now says "the same CS 380 lesson described coordinated disclosure", and et8's says "CS 100 Lesson 6" (item 13). I scanned every bare "Lesson N" in cs480.js. All remaining ones refer to this course and none follows another course's name in the same sentence.

### Checks

- `node --check` passes for data/cs480.js and data/cs480-code.js.
- gen_code.py reports 0 problems.
- The Pyodide run prints only "ok" lines (67).
- validate_content: all good.
- check_problems: 407 problems, 0 problems found.
- check_lesson_code: only the known cs101/cs102 false alarms.
- lesson_time: CS 480's slow estimates are all 69 minutes or less.
- test_dump_course: all checks passed.
