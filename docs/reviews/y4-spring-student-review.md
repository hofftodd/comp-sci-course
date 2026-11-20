# Student review: Year 4 Spring

*Round 1, part A (CS 491, CS 450). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a fourth-year student. I have finished the core sequence through CS 470 Deep Learning, including CS 490 Capstone Project I, CS 240 Software Engineering I, MATH 230 Probability and Statistics, CS 310 Operating Systems, CS 320 Theory of Computation, CS 360 Programming Languages and CS 410 Distributed Systems. This term I am taking CS 491 Capstone Project II and CS 450 Formal Methods and Verification. I read both courses' dumps in order and tried every quiz and practice problem in my head. Most numbers in the notes checked out when I worked them by hand. The items below are where I got stuck or found something that didn't fit.

### CS 491 Capstone Project II

#### cx1: Replanning for the second term

1. "the thesis milestone (see the policies)", "A student on the thesis path (see the policies)". The policies aren't in the course text, so I can't tell what the thesis path is, who can take it, or how its milestones are graded.
2. "Estimation ratio (velocity): A finished task's estimate divided by its actual time". The same lesson describes the burndown as "The hours or points completed per week", which is what I learned to call velocity. Here "velocity" means an estimate/actual ratio instead, and the code calls the list of ratios `velocity`. I wasn't sure which meaning later lessons use.
3. "The first programming problem automates the choice, taking the musts first and then each other story in the client's order while the confidence stays above a threshold." The notes say "while", which sounds like stopping at the first story that doesn't fit. The commit_scope prompt says "otherwise defer it and go on to the next (a smaller story later may still fit)". Those are two different algorithms.

#### cx2: Iterating with users

4. "Compared with NFR-3, the constraint (68) is met ... but the target (80) isn't shown". The lesson treats a requirement as having both a "constraint" and a "target" and doesn't say what the difference is. I had to assume it came from CS 490.

#### cx3: Performance and scaling

5. "40 requests per second that each take 0.25 s means 40 × 0.25 = 10 requests in progress ... If the server has only 4 worker processes ... the other requests wait in a queue" versus "At 40 requests per second, 0.05 s of work each, and 4 workers, ρ = 40 × 0.05 / 4 = 0.5." Both examples are the reminder burst on 4 workers. With 0.05 s of work and only half the workers busy, I can't see how requests would spend 0.25 s inside or why a queue of about 6 would build up. I couldn't tell whether these describe the same system.
6. "the M/M/1 queue (random arrivals, random service times, one worker), gives the mean time in the system as W = S / (1 − ρ)". The conclusion that follows, "one server with 4 workers is at 50%, within a 60% target", applies this one-worker model to a 4-worker server. The lesson never says whether the formula or the response-time table holds for several workers.
7. "python -m cProfile -s cumulative manage.py runserver". I don't know what manage.py or runserver are. They look like a particular web framework that this course hasn't named.

#### cx4: Shipping and operating

8. "99% of check-ins during opening hours succeed, over a rolling 28 days" (and the runbook in Lesson 7 says "99% over 28 days") versus "period = 30 * 24 * 60  # minutes in a 30-day SLO period" and budget_remaining's default period=43200. I couldn't tell whether the pantry's SLO period is 28 days or 30, or whether the difference matters to the burn-rate thresholds.
9. "apply the three rules in the notes' table". The notes don't have a table of rules. They have a code printout and a paragraph, so I had to piece the (severity, long, short, threshold) tuples together from the prose. The prompt does list them, so this isn't blocking.
10. P2: "Roughly how soon after it starts does the first rule fire, assuming steady traffic?" With a 10% error rate and a 99% SLO, the burn rate is 10, which never exceeds rule 1's threshold of 14.4. I couldn't tell whether "the first rule" means rule 1, which never fires, or the first rule that does fire (the 6-hour rule, after about 3.6 hours if errors were 0 before the incident). I also had to assume the error rate before the incident.

#### cx5: Maintaining the system

11. "For inputs too many to enumerate, record a sample of real (synthetic) requests and their responses instead." "Real" and "synthetic" contradict each other, so I don't know whether the sample should come from production or be generated.
12. P3 (b) "the CSV export gains a column at the end". The notes list "the export format" as something others rely on, where a breaking change means a new major version. They don't say whether adding a column counts as breaking (a consumer that checks the column count would break) or as a compatible addition, so a minor version. I couldn't decide between 1.4.0 and 2.0.0 from the lesson.

#### cx6: Evaluating the work

13. "the network said a gain of 3 points would justify the change. To have 80% power for a 6-point difference (59% to 65%), the formula gives ... ≈ 1,024 volunteers per group". The pre-registration section says the sample size should be planned from the minimum effect worth acting on. Here the minimum is 3 points but the power calculation uses 6. At 3 points the same formula needs roughly four times as many volunteers per group, more than the 2,400 available. The lesson doesn't explain why powering for 6 is acceptable.

#### cx7: Documentation and handover

14. P2 "(d) LGPL-2.1-or-later". The LGPL is never described, and neither is the "-or-later" suffix (the notes only show "GPL-3.0-only" and never say what "-only" means). Without them I can say this license isn't on the policy list, but I can't say "why" in terms of what it requires. "ISC" in the policy is also never described.

#### cx8: Launch, final presentation and what comes next

15. "Check-in now takes a median of 24 seconds ... the 95th percentile is 41 seconds, so NFR-1's 30-second target is still missed for new registrations". The 95th percentile is for check-ins overall. I couldn't follow how it shows the miss is specifically "for new registrations".
16. "Notice what the calculation can't see: Dev, who didn't submit, can't have rated anyone". I couldn't tell what point this makes beyond the obvious. Is it that Dev's view of the others is missing, or that self-ratings bias the result?
17. "The ACM Code of Ethics (CS 100 Lesson 3), which CS 480 Ethics, Law and Policy of Computing examines this term". My courses this term are CS 491 and CS 450. CS 480 isn't one of them, so I don't know whether I'm meant to be taking it.

### CS 450 Formal Methods and Verification

#### fm1: Specifications, invariants and property-based testing

18. stateful_queue: "The starter has Ring ... On the implementation, len means calling len(q)." The prompt says how "len" maps onto Ring but not how "push" and "pop" do: the method names, and whether push returns True/False and pop returns None when empty, as the model does. I can't see the starter, so I'd be guessing at the interface.

#### fm2: SAT solving

19. "(The solver dpll is defined below; code blocks share one namespace, so this one runs after it.)" This sits in the timetabling paragraph, which has no code block. The timetabling code turns up later, inside the DPLL block, so I didn't know what "this one" referred to.
20. P3: "why might an encoder prefer another method for large n?" The lesson shows only the pairwise at-most-one encoding. I can see that 499,500 clauses is a lot, but no other encoding has been shown, so I don't know what the alternative is or what it costs.

#### fm3: SMT, symbolic execution and bounded model checking

21. "(declare-const x (_ BitVec 32))" and "#x00000001", "#x7fffffff". The `(_ BitVec 32)` form, especially the underscore, and the `#x` hex literal syntax aren't explained. I could guess them from context, but I couldn't write SMT-LIB bit-vector queries confidently.

#### fm4: Model checking concurrent systems

22. "These are exactly the variants CS 310 described in prose; the model checker finds each failure and shows it. The first programming problem checks them." The first programming problem (bfs_checker) asks for a generic checker and find_lasso. It doesn't mention the swapped or flags-first variants, so I didn't know whether I'm meant to model them.
23. "In our model there is a lasso in which thread 0 stays at its non-critical step forever". The Python peterson model has no step labelled non-critical. Its pc 0 is commented "flag[i] = True". I wasn't sure which state this means: presumably pc 0, which the TLA+ version calls "idle".
24. "F p | p holds in some later state (finally)". It doesn't say whether "later" includes the current state. That matters for G (wait → F cs) when the thread is already at the critical section.
25. TLA+ module: "vars == <<pc, flag, turn>>", "pc = [i \in {0, 1} |-> "idle"]", "UNCHANGED turn", "==". The notes explain /\, \/, ~, \E, EXCEPT, primes, [] and WF. They don't explain the << >> tuple notation, the [x \in S |-> e] function constructor, UNCHANGED, or == as definition, so I could read the example only partly.

#### fm5: Hoare logic and program proofs

26. loop_vcs: '("decreases", I ∧ c ⇒ wp(body, V < v0)[v0 := V]), where v0 is the variable name "_v0"'. The notes state only the resulting condition for division, "I ∧ c ⇒ r − y < r". They never explain the technique of introducing a fresh variable for the variant's old value, taking wp through the body and then substituting back. I can copy the formula but couldn't have worked it out, and I'm unsure why the substitution comes after wp.

#### fm6: Proof assistants and verification in practice

27. "A proof assistant (MATH 120's optional lesson introduced them)" and "Lean (MATH 120's optional lesson)". The Lean example uses `Prop`, `theorem`, `fun hp =>`, `by`, `exact` and the `| zero => ... | succ k ih => ...` syntax. The notes explain h.1, h.2, ⟨…⟩, rfl, induction and congrArg, but not `exact`, `Prop` or `fun ... =>`. If I skipped the optional lesson, I can't read the example fully.
28. "modern solvers output a proof: a list of learned clauses, each following from the formula and the earlier ones by unit propagation". The notes don't say how a clause "follows by unit propagation" (assume its literals false and propagate to a conflict). That explanation, and the name RUP, appear only in the rup_checker prompt.

### Across courses

29. Both courses use the same idea under different conventions. CS 491's nearest-rank percentile is written `s[math.ceil(p * len(s) / 100) - 1]` in one place, "position ⌈p × n/100⌉ counting from 1" in another, and as hard-coded indices 499, 799 and 949 in Lesson 1. CS 491 Lesson 6's bootstrap uses positions ⌊0.025·reps⌋ and ⌊0.975·reps⌋ − 1, which is a different convention. Neither course says why the bootstrap interval uses floor-based positions while the percentiles use nearest rank.
30. CS 450 says explicitly that "code blocks share one namespace". CS 491 never says this, but its blocks depend on it (for example, the SUS block in cx2 uses `math` imported in the block before it). I wasn't sure whether each CS 491 block was meant to run on its own.

## Professor's response (part A: CS 491, CS 450)

### CS 491 Capstone Project II

*Professor's response, round 1, part A. Edits are in `data/cs491.js` (edited directly, so the part files in `c491/` are now stale) and in `cs491_spec.py`, which regenerated `data/cs491-code.js`.*

1. **Thesis path.** Lesson 1 (cx1) now describes the thesis path where it first comes up, just before the milestone table. A student may write an individual research thesis with a faculty adviser, having applied by the last week of CS 490 with a proposal and the adviser's agreement. Each team milestone has a thesis equivalent in the same week with the same weight, graded by the adviser with the instructor. Lessons, quizzes and problems are the same for both paths, and the course policies give the rest. Both "(see the policies)" pointers are gone: the one in the table header and the one in the research-plan paragraph.
2. **Two meanings of velocity.** Lesson 1 now says which one it means each time. The burndown bullet says that throughput per week is CS 240's velocity, and that evidence-based scheduling uses the word for the estimate ratio instead. The EBS paragraph says that Spolsky calls each estimate ratio a velocity, as the code and the second programming problem do, and that this is not CS 240's points per sprint. The code comment says the same. The key term is now just "Estimation ratio", and its definition notes EBS's name for it. The `velocities` prompt says "(Spolsky's velocities)".
3. **"while" vs. skip-and-continue.** Fixed. The notes now say the problem goes through the other stories in the client's order, "adding each one if the confidence stays above a threshold and skipping it otherwise (a smaller story later may still fit)". This now matches the commit_scope prompt.
4. **Constraint vs. target.** Lesson 2 now explains NFR-3 in a parenthetical: "in CS 490 Lesson 2's form, the target is the level aimed for and the constraint the worst the client will accept". This is CS 490's Planguage definition, which I checked in the CS 490 dump.
5. **The Little's law and utilization examples didn't agree.** They described different situations without saying so. The Little's law example is now explicitly a hypothetical load-test result. Each request spends 0.25 s inside, so 10 are in progress; at most 4 are being worked on, and the other 6 wait, with their waiting counted in the 0.25 s. The utilization section then covers the pantry's real 0.05 s of work. Its new M/M/c sentence (item 6) gives the matching numbers: about 54 ms inside per request and about 2 requests in progress, so the two examples no longer contradict each other.
6. **M/M/1 applied to 4 workers.** I added one paragraph on the M/M/*c* queue (Erlang's formula, 1917). At the same utilization it waits less than M/M/1, because a request waits only when all *c* workers are busy. For the burst at ρ = 0.5 on 4 workers it gives about 54 ms rather than 100 ms, so about 2 requests are inside at once, and all four workers are busy about a sixth of the time (Erlang C = 0.174). The M/M/1 table is therefore a cautious upper bound, and its blow-up as ρ approaches 1 holds for any number of workers. I checked these numbers by computing Erlang C: W = 54.3 ms, L = 2.17. I also checked that the M/M/*c* mean time never exceeds M/M/1's at the same ρ, for *c* up to 29 and ρ from 0.01 to 0.99. The definition of *S* now says it is "the work alone, without waiting".
7. **manage.py runserver.** The command is now `python -m cProfile -s cumulative server.py`. A new sentence says that `server.py` stands for whatever script starts your application, or for a web framework, its command that starts the development server.
8. **28 vs. 30 days.** The pantry's SLO period is now 30 days everywhere: the Lesson 4 SLO sentence, the Lesson 7 runbook alert text and the Lesson 4 P1 answer. That answer's "about 3.4 hours in 28 days" is now "about 3.6 hours in 30 days" (0.005 × 720 h = 3.6). A new parenthetical says that many teams use 28 days, so that every window holds the same number of Saturdays. It also says the period matters, because the alert thresholds are computed from it: 14.4 = 2% of a 30-day budget in an hour. The budget_remaining prompt now says its default period of 43,200 is 30 days in minutes.
9. **"the notes' table".** The alerts prompt now says "apply the notes' three rules (the code printout and the paragraph after it), in this order:" and lists the tuples as before.
10. **Which rule is "first".** P2 now states that there were no failures before the incident and asks "Which rule fires first, and roughly how soon after the incident starts?". The answer says the one-hour rule never fires and the six-hour rule fires first, after about 3.6 hours.
11. **"real (synthetic)".** Now reads: "record a sample of requests and their responses instead: synthetic requests generated to resemble real ones, since real requests carry personal data."
12. **Is a new column breaking?** The versioning paragraph in Lesson 5 now says what counts. An addition, such as a new route or a new column at the end of the export, is normally a compatible change and a minor version, because readers that ignore what they don't expect keep working. The changelog should still mention it, for any reader that checks the column count. This matches the P3 answer of 1.4.0.
13. **Powered for 6 points, minimum 3.** This was a real gap. The notes now give the reason and its cost. Powering for 3 points would need about 4,160 per group (computed: 4,164), more than the network has. So the team planned for 6 points and wrote down the cost: with 1,200 per group, a true 3-point gain is detected only about a third of the time (power computed as 0.32). A modest real effect could therefore come out inconclusive. The paragraph points to the section on small traffic for the alternatives. The 1,024 figure is unchanged (computed: 1,023.4).
14. **LGPL, -or-later, -only, ISC.** The license table in Lesson 7 has two changes. ISC joins the permissive row, as a shorter text with the same effect as MIT. A new weak-copyleft row for LGPL-2.1 and LGPL-3.0 says that changes to the library itself must be shared under the LGPL, while a program that only uses the library may have any license, provided users can replace the library with their own modified version. The SPDX sentence now explains that for the GNU licenses `-only` means exactly that version, and `-or-later` lets the recipient choose that version or any later one.
15. **"missed for new registrations".** Now reads: "so NFR-1's 30-second target is still missed; the logs show the slowest check-ins are nearly all new registrations". This matches CS 490 Lesson 8, which found the slow check-ins were new registrations.
16. **What the calculation can't see.** The point is now spelled out. Dev didn't submit, so his account of the work and his view of the others are missing. His score rests entirely on the three who did, and the factor 4/3 scales their ratings up without adding any information. The sentence about agreement possibly reflecting a falling-out stays.
17. **CS 480.** Now reads "CS 480 Ethics, Law and Policy of Computing, a required course this term, examines". Your review was given only two of the term's courses; CS 480 is the third.
29. **Percentile conventions (CS 491 side).** Lesson 1's parenthetical now gives the nearest-rank rule in full: position ⌈*p* × *n*/100⌉ counting from 1, which is 500, 800 and 950, written 499, 799 and 949 in Python's 0-based indexing. That ties the hard-coded indices to the `math.ceil` formula of Lesson 3 and the ebs prompt, which are the same rule. Lesson 6 now explains the bootstrap's positions. It uses MATH 230 Lesson 6's ⌊0.025 × reps⌋ and ⌊0.975 × reps⌋ − 1, which leave the same number of values on each side (50 each for 2,000 resamples). Nearest rank would put the lower end one place earlier, at position 49. With thousands of resamples the difference is negligible, and what matters is to state the rule and keep to it.
30. **Shared namespace (CS 491 side).** Lesson 1, at the end of the paragraph after its first code block, now says: "As in every lesson, the code blocks run in order in one shared namespace, so a later block can use names an earlier one defined."

**Checks.** All commands were run from the repository root.

- `node --check` passes on `data/cs491.js` and `data/cs491-code.js`.
- gen_code.py reports 0 problems needing attention.
- pyrun prints only "ok" lines.
- validate_content ends "all good".
- check_problems: 407 problems, 0 problems found.
- check_lesson_code shows no cs491 lines.
- lesson_time: every cx lesson is at most 71 minutes in the slow estimate.
- test_dump_course: "All checks passed."

### CS 450 Formal Methods and Verification

18. **stateful_queue interface.** The prompt (spec, regenerated into data/cs450-code.js) now states the whole implementation interface: `push` means `q.push(v)` (returns `True` or `False`), `pop` means `q.pop()` (returns the item or `None`), `len` means `len(q)`, with the same behaviour as the model when correct.

19. **"this one runs after it".** fm2's timetabling paragraph now says that the timetabling code needs a solver, so it comes at the end of the `dpll` code block in the next section, and that that block can use `exactly_one` from the block above because a lesson's blocks form one program run in order.

20. **Alternative to pairwise at-most-one.** fm2 "Encoding problems" now introduces the sequential counter: helper variables *s_i* ("one of x_1..x_i is true") with clauses x_i ⇒ s_i, s_{i−1} ⇒ s_i and ¬(s_{i−1} ∧ x_i). That is 3n − 4 clauses and n − 1 new variables. I checked by brute force for n = 2 to 6 that it is exactly at-most-one and has 3n − 4 clauses. The P3 answer now refers to it: 2,996 clauses and 999 new variables for n = 1,000, against 499,500 for the pairwise encoding.

21. **SMT-LIB bit-vector syntax.** fm3 now explains `(_ BitVec 32)` (an indexed sort, a family picked out by the number) and the literals `#x` + w/4 hex digits, `#b` + w bits and `(_ bv200 8)`. I checked the `#b` form and `(_ bv200 8)` in Z3.

22. **Which variants the first problem checks.** The fm4 notes now say that students write the checker themselves and that its tests run it on `peterson` and on both variants. The bfs_checker prompt now says the tests supply those three successor functions and expect the notes' traces (a 6-step violation and a 2-step deadlock), which is what the existing tests assert (trace lengths 7 and 3 states).

23. **"non-critical step".** This now reads "stays at pc 0 forever, before raising its flag (outside the critical section, not trying to enter; the TLA+ version below calls this "idle")".

24. **Does F include the present?** Yes. The LTL table now says G is "every state from now on" and F is "now or in some later state". A new sentence says formulas are judged at a position and include that state, so G(wait → F cs) is not broken by a thread that is already in.

25. **TLA+ notation.** fm4 now explains `==` (definition, as opposed to `=`), `<<…>>` (tuple), `[i \in {0, 1} |-> "idle"]` (a function, like the dict comprehension), and `UNCHANGED turn` (= `turn' = turn`; an action must constrain every variable, and `vars` collects them for `Spec`). The TLA+ is still labelled as not run.

26. **The variant VC technique.** fm5 "Termination: variants" now derives the condition. The old value of V is named by a fresh v0 that the body doesn't touch. The body must end with V < v0, so it must start in wp(body, V < v0), and since v0 equals V at the start, V is substituted for v0 afterwards. Substituting first would give wp(body, V < V), which is false, because the two Vs are taken in different states. It then works the division case: wp(r := r − y; q := q + 1, r < v0) = r − y < v0, and the substitution gives r − y < r, the VC the notes already stated.

27. **Lean syntax.** fm6 now explains `theorem name (args) : T := proof`, `Prop`, `(h : p ∧ q)` as evidence, `fun hp => e` (lambda, our `"lam"`), application written side by side, `by`, the `| zero => …` / `| succ k ih => …` cases, and `exact`. The reference to MATH 120's optional lesson now says the syntax is explained here. (MATH 120 explains `rfl`, `induction`, `congrArg` and `exact`, but not `Prop`, `fun` or `by`.)

28. **RUP in the notes.** fm6 "Certificates" now defines a RUP clause: assume all its literals false, run Lesson 2's `unit_propagate`, and reach a conflict. It says why adding such a clause is safe, gives Lesson 2's learned clause [−1] on `G` as an example (that propagation is the conflict traced there), and says when the empty clause passes. This matches the rup_checker prompt.

29. **Percentile conventions (CS 450 side).** No change needed. CS 450 uses no percentiles or bootstrap intervals; this item is about CS 491 alone.

30. **Shared namespace (CS 450 side).** The old statement appeared only in Lesson 2 and was loosely worded: the page doesn't run lesson blocks; the checker does. It was accurate, but it wasn't enough, because Lesson 1's blocks already depend on one another (`sort_spec` uses the `Counter` imported in the first block). fm1 now says this once, at the first code block: each lesson's Python blocks form one program meant to be run in order in one session, and they were checked that way. Later blocks use earlier imports and definitions, a practice answer's code continues its lesson's program, and each lesson starts afresh. This matches scripts/check_lesson_code.py, which runs each lesson's blocks in order in a shared namespace with practice answers after the notes, and cs450 passes that check. Lesson 2's remark now points back to it.

---

# Student review: Year 4 Spring

*Round 1, part B (CS 480). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a fourth-year CS student. I've finished the core sequence through CS 470 Deep Learning, including CS 100 (ethics, privacy, the AI Act and WCAG basics), CS 102's optional licensing lesson, CS 370's confusion matrix and metrics, CS 380's security law sidebar and coordinated disclosure, and MATH 230's probability and hypothesis tests. I have no legal training beyond what those courses covered. I read CS 480 lesson by lesson and tried every quiz question and practice problem in my head.

### CS 480 Ethics, Law and Policy of Computing

#### et1: Professional ethics in practice

No confusions.

#### et2: Intellectual property and software licenses

1. "Apache-2.0 code can go into GPL-3.0 programs but ... not GPL-2.0-only ones, because Apache's patent-termination terms are additional restrictions". The lesson never says what Apache's patent-termination terms are. More importantly, the bullet list says MIT and BSD code can go into proprietary software, but it never says whether Apache-2.0 code can. P1 needs that, because the `net` dependency is Apache-2.0.

2. Q3's intended answer is "GPL-3.0 (or AGPL-3.0)". The lesson only says "GPLv3 section 13 lets GPLv3 code be combined with AGPLv3 code". It never says that a program containing GPL-3.0 code may go out under AGPL-3.0 as its outbound license. I couldn't tell whether "or AGPL-3.0" follows from the lesson.

3. "the court gave the settlement final approval ... roughly $3,000 per book", next to "downloading and keeping millions of pirated books". $1.5 billion at $3,000 per book is about 500,000 books, not millions. I couldn't reconcile the two numbers.

4. "Bartz v. Anthropic (N.D. Cal., June 2025)", "Thaler v. Perlmutter (D.C. Cir. 2025)", and later "9th Cir.", "D.D.C.", "3d Cir.", "4th Cir.". Lesson 1 explained districts and circuits but not these abbreviations. I can guess most of them. I couldn't tell whether "D.C. Cir." and "D.D.C." are different courts, or what "N.D." stands for.

5. "SPDX expression: ... combining identifiers with AND, OR and WITH" and, in the `spdx` problem, "X WITH Y (an identifier, the word WITH and an exception identifier)". The lesson never explains what a license exception is or what WITH means for your obligations. Only AND and OR get a meaning.

6. `license_graph`: "uses the simplified table in the starter" and "A license not in ALLOWED ...". I can't see ALLOWED or OUTBOUND. Their shape has to be guessed from the hint `ALLOWED.get(lic, set())`, presumably a map from a license to the outbound licenses it allows. I also couldn't tell whether a package's license may be an SPDX expression such as P1's "BSD-3-Clause OR GPL-2.0-only", or is always a single identifier.

#### et3: Privacy law and privacy engineering

7. "its replacement, the 2023 Data Privacy Framework, survived a challenge in the EU's General Court in September 2025, and an appeal to the Court of Justice was pending". Lesson 1 named only the CJEU as having "the last word". The General Court is never introduced, and I don't know how it relates to the Court of Justice.

8. (blocking) P1: "for each of 40 departments, the number of students who used the counseling service, with ε = 1 in total. (a) If each student belongs to exactly one department, what noise scale should each count get, and why?" The lesson only teaches that privacy losses add up ("answering k queries with privacy losses ε₁, …, ε_k is (ε₁ + ⋯ + ε_k)-differentially private"). From that I would split ε into 40 parts of 0.025 each, which gives a scale of 40. The phrase "exactly one department" suggests a different answer is intended. The lesson never says that queries on disjoint groups of people don't add up, or how sensitivity works for a list of counts. So I couldn't do (a), or (b) ("up to two departments").

#### et4: Algorithmic fairness and anti-discrimination law

9. "If two groups have equal PPV and equal TPR but different base rates ... Check it on CS 100's tables". The check that follows uses TPR 0.96 for group A and 0.6 for group B, which are not equal. So the example checks the identity, not the equal-TPR claim just made. I wasn't sure what the check was meant to show.

10. "its 2026 amendment extended that permission more widely". This is the first mention of a 2026 amendment to the AI Act. The lesson doesn't say what it is; it appears only in Lesson 8, as the "Digital Omnibus on AI".

11. "to proceed as a nationwide collective action in 2025". "Collective action" isn't explained, and I don't know whether it is the same as a class action.

#### et5: Safety, liability and software failure

12. "Boeing paid $2.5 billion under a 2021 deferred prosecution agreement ... the Justice Department then made a non-prosecution agreement instead". Neither agreement is explained. I couldn't tell how they differ from each other or from a guilty plea, so I couldn't follow why the judge's dismissal mattered.

13. The standards table: "SIL 4, 3, 2, 1", "DAL A (catastrophic) to E (no effect)", "ASIL D, C, B, A". The acronyms SIL, DAL and ASIL are never expanded. Only DAL's ends are described. I don't know what the levels in between mean.

14. P1: "a second, independent sensor that is cross-checked". The lesson's voter disengages, outputting None, when two sensors disagree. I couldn't tell whether that disengagement counts as the braking controller failing. That decides whether the second sensor turns {sensor} into the cut set {sensor 1, sensor 2} or just makes it detectable. Without knowing, I couldn't compare the two options.

#### et6: Security law: computer crime, circumvention and disclosure

15. P2(c): "If the vendor is an EU manufacturer that learns on 20 March that the bug is being exploited, what CRA deadlines apply to it?" The lesson says the Cyber Resilience Act's reporting duty applies "From 11 September 2026". The report in this problem is from March 2026, so as I read it no CRA deadline applies yet. I couldn't tell whether that is the intended answer or whether the dates are a mistake.

16. "report any actively exploited vulnerability and severe incident to their national CSIRT and ENISA". CSIRT and ENISA are not expanded or explained.

#### et7: Speech, platforms and content moderation

17. The DSA list separates "All hosting services", "Online platforms" and "Very large online platforms". It defines only the last, by its 45 million users. The lesson never says what makes a hosting service an "online platform". P4 (an app with 8 million EU users) asks which duties apply, and that depends on this distinction.

#### et8: AI governance, accessibility law and making policy

18. Lesson 3 says a "Digital Omnibus" amending the GDPR was proposed and "nothing had changed in law". Lesson 8 says the "Digital Omnibus on AI (Regulation 2026/1744, in force since 27 July 2026)". I couldn't tell whether these are one package or two, or why one is law and the other isn't.

19. P1(c): "an exam-proctoring system that flags students as cheating from webcam video". "Emotion recognition at work or school" is prohibited, while education is a high-risk Annex III area. The lesson doesn't say whether detecting cheating from video counts as emotion recognition, so I couldn't tell which tier this falls in.

20. `ai_act_tier`: "NEW_BANS practices from 2 December 2026 and other bans from 2 February 2025". PROHIBITED is said to be "in the starter", but NEW_BANS isn't described, and I can't see either. I couldn't tell whether NEW_BANS is a subset of PROHIBITED or a separate list that tier() must also check.

21. `ai_act_tier`: "Annex I safety components from 2 August 2028; Annex III systems from 2 December 2027". The problem doesn't say which date applies to a system that is both a safety component and in an Annex III area.

### Across courses

22. Several programming problems depend on constants "in the starter" that the course text doesn't show: ALLOWED and OUTBOUND (`license_graph`), and PROHIBITED, NEW_BANS and ANNEX_III (`ai_act_tier`). From the lesson text alone I can't know their contents or exact shape.

23. Legal citation conventions are only partly taught. Lesson 1 explains U.S.C., C.F.R. and U.S. Reports citations, but the court abbreviations used throughout Lessons 2, 6 and 7 are never explained (see item 4).

## Professor's response (part B: CS 480)

1. **Apache-2.0.** In et2 "License conditions and compatibility" I added a bullet: Apache-2.0 is permissive and can go into proprietary software if you keep its notices (including NOTICE) and mark changed files. The bullet also says what the patent-termination term is: the contributors' patent license ends for anyone who sues claiming the code infringes a patent. That is the term the FSF treats as an extra restriction under GPLv2. With this, P1's `net` dependency can be answered.
2. **AGPL as outbound license.** The GPL bullet now says that under GPLv3 section 13 the AGPL's terms apply to the combination as a whole. So a program containing GPL-3.0 code may go out under GPL-3.0 or AGPL-3.0, which is Q3's answer.
3. **Bartz numbers.** I checked this against the final-approval order (N.D. Cal., 20 July 2026) and reports of it. The works list has 482,460 eligible books, at about $3,000 per work. The text now says the settlement covered only the roughly 482,000 pirated books that met the class criteria, chiefly a timely US copyright registration, which statutory damages require. That comes to about $3,000 per covered book, against the millions downloaded.
4. **Court abbreviations.** et1's "Case law" bullet now explains parenthetical court names: "9th Cir.", "D.C. Cir.", "N.D. Cal." (with N.D./S.D./E.D./C.D.) and "D.D.C.". It says that D.D.C. is the trial court and that its appeals go to the D.C. Circuit.
5. **WITH / exceptions.** et2's SPDX paragraph now says what `X WITH Y` means: license X plus exception Y, an extra permission. The example is GPL-2.0-only WITH Classpath-exception-2.0. The SPDX key term now gives the meaning of AND, OR and WITH.
6. **license_graph constants.** The prompt now describes `OUTBOUND`: the list of six names, given in full. It describes `ALLOWED` as a dict from a license identifier to a set of outbound licenses, with two example entries. It also states that a package's license is a single identifier or `None`, never an SPDX expression. I edited the spec, regenerated the code file, and it reports 0 problems.
7. **General Court.** et3 now has a parenthesis explaining that the CJEU has two courts. The General Court hears most direct actions, and its judgments can be appealed on points of law to the Court of Justice, which has the last word. This matches Lesson 1.
8. **(blocking) Parallel composition.** In et3 "Differential privacy", after sequential composition, I added that losses add only because one person can affect every answer. For queries on disjoint groups, the total is the max (parallel composition). Equivalently, the list of counts has sensitivity 1 when groups are disjoint and 2 when a person can be in two groups. P1's existing worked answer (scale 1, then scale 2) now follows from the lesson.
9. **Equal-TPR check.** The text now says plainly that the first check verifies the identity on CS 100's tables: both groups have PPV 0.6, with TPR 0.96 for A and 0.6 for B. I then added a second executed block with equal TPR 0.8 and PPV 0.6. It prints FPR 0.5333 for A and 0.1333 for B, four times apart from the base rates alone. The lesson-code checker verified both outputs.
10. **2026 amendment.** et4 now names it in place: "the 'Digital Omnibus on AI', Lesson 8". I added no new legal claim.
11. **Collective action.** In et4 I defined it as the age-discrimination law's opt-in group lawsuit and contrasted it with an opt-out class action.
12. **DPA / NPA / plea.** et5 now defines a guilty plea (conviction), a deferred prosecution agreement (a charge filed but dropped if conditions are met) and a non-prosecution agreement (no prosecution in exchange for conditions). It explains that dropping a filed charge needs the court's leave. I checked the November 2025 dismissal (6 Nov 2025, Judge O'Connor) by web search: he held that he lacked power to refuse because prosecutors hadn't acted in bad faith. The text now says this, and that Boeing was never convicted.
13. **SIL / DAL / ASIL.** In et5, after the standards table, I added a paragraph expanding SIL (safety integrity level), DAL (development assurance level; DO-178C says "software level") and ASIL (automotive safety integrity level). It gives all five DO-178C levels (catastrophic, hazardous, major, minor, no safety effect) and IEC 62304's classes.
14. **Cross-checked sensor.** et5 P1 now specifies a self-test that tells which sensor failed, so the controller fails only if both fail. It also asks what happens if disagreement makes the controller disengage. The worked answer adds that case: if either sensor failing stops the brakes, P ≈ 2.1 × 10⁻⁵, which is worse than one sensor. A detect-only cross-check helps only where stopping is safe.
15. **CRA dates.** This was intended: the trap was checking when the duty starts. P2(c) now asks it explicitly: what applies on 20 March 2026 (none yet), and what if it were learned on 20 October 2026. The answer for October is an early warning by 21 October, a notification by 23 October, and a final report within 14 days of a fix.
16. **CSIRT / ENISA.** In et6 I expanded both: a computer security incident response team designated as coordinator by the member state, and the EU Agency for Cybersecurity. I added that reports go through the single EU reporting platform.
17. **Hosting service vs online platform.** et7 now defines both before the DSA list. A hosting service stores users' information. An online platform also makes it public at users' request, and messaging and email are not platforms. The text also gives Article 19's exemption for micro and small enterprises (fewer than 50 staff, at most €10 million turnover; checked by web search against the Article 19 text), so P4 can be answered.
18. **Two omnibuses.** et3 now says the GDPR "Digital Omnibus" is a separate proposal from the "Digital Omnibus on AI" of the same month, which was adopted quickly (Lesson 8). et8 says the AI regulation is the AI half of the November 2025 package, and that the data-protection half was still being negotiated.
19. **Proctoring.** et8's Annex III list now says "education (admissions, grading, and proctoring that detects cheating in tests)". This was checked against Annex III point 3(d): "monitoring and detecting prohibited behaviour of students during tests". The emotion-recognition ban now explains that it means inferring emotions, and that detecting cheating is not emotion recognition.
20. **NEW_BANS / PROHIBITED.** The `ai_act_tier` prompt now describes all three starter constants as sets of strings, with examples. It lists the two NEW_BANS entries and says they are also in PROHIBITED.
21. **Both a safety component and in Annex III.** The prompt now says Annex I safety components get 2 August 2028 "even if they are also in an Annex III area". This matches the existing test.
22. **Starter constants.** Resolved by 6 and 20: both prompts now state the shape, and the contents where a solution needs them.
23. **Citation conventions.** Resolved by 4.

Checks run:

- `node --check` passes on data/cs480.js and data/cs480-code.js.
- `validate_content`: all good.
- `gen_code`: 0 problems.
- Pyodide run: 67 ok lines, nothing else.
- `check_problems`: 407 problems, 0 found.
- `check_lesson_code`: no cs480 lines.
- `lesson_time`: every CS 480 lesson has a slow estimate of 59–66 minutes.
- `test_dump_course`: all passed.
