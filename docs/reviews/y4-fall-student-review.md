# Student review: Year 4 Fall

*Round 1, part A (CS 410, CS 430). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a fourth-year CS student. Before this term I finished the first three years of the degree: programming (CS 101/102), discrete maths, calculus, linear algebra and probability (MATH 120/121/130/131/220/230), two physics courses, data structures, algorithms, systems, architecture, software engineering, operating systems, theory of computation, databases, graphics, networks, programming languages, compilers, AI/ML and security. I read CS 410 Distributed Systems and CS 430 Advanced Algorithms lesson by lesson and tried every quiz and practice problem in my head.

### CS 410 Distributed Systems

#### di1: Why distributed systems are hard

1. "marshals the arguments (encodes them as bytes, for example as JSON or Protocol Buffers)". Protocol Buffers isn't explained anywhere and I hadn't met it. JSON I know from CS 240.
2. "So the last message changes no one's action, and the protocol with it deleted is also correct, with k − 1 messages." The argument only looks at one run: the one where A attacks and every message arrives. I couldn't see why deleting that message keeps the protocol correct in every other run, such as runs where earlier messages are lost or A chooses not to attack. That is what "correct" requires.
3. "Tolerating f Byzantine nodes needs more than 3f nodes in all; tolerating f crashes needs only 2f + 1 (Lesson 4)." Lesson 4 explains 2f + 1 with majorities, but nothing ever explains the 3f + 1 figure. Lesson 4's Q2 lists "Byzantine faults need 3f + 1 nodes" as a distractor, so I couldn't tell whether that statement is meant to be false or just irrelevant to the question.

#### di3: Replication

4. "and every update must only move the state 'upward' with respect to merge." "Upward" is never defined. I didn't know what order on states is meant, or how to check this condition for the PN-counter or OR-set in the programming problem.

#### di4: Consensus I: Raft

5. "the Raft paper shows a sequence of crashes and elections in which such an entry is overwritten by a new leader". The sequence is never shown. So I have to accept the "current term" commit rule on trust, and I can't see why an entry stored on a majority could still be lost.
6. "Rule 3 says L's log was at least as up to date as s's, and the Raft paper shows that this, with log matching and induction on terms, forces L's log to contain e." This is the key step of the safety argument, and it's skipped. I couldn't rebuild why "at least as up to date" implies "contains e".
7. "The leader keeps a next_index for each follower, the next entry to send it." Its starting value after an election is never stated. In trace step 6, S3's first message to S4 has prev (1, term 1), so I had to guess where next_index started.
8. P3: "What is the new commit index? What would it be if entry 8 had term 5?" In the second case no index of term 6 is on a majority, so the commit index stays at its old value. The problem never gives that old value, so I couldn't give a number.

#### di5: Consensus II and coordination

9. Notes, Prepare: "An acceptor that hasn't promised a number greater than n promises", which means a repeat prepare(n) with an equal n gets a promise. The CODE paxos spec says "prepare(n): if n > promised, set promised = n and return ("promise", accepted); otherwise return ("reject", promised)", which rejects an equal n. These contradict each other.
10. "Lamport's proof shows that the highest-numbered reported proposal is the one to continue with". This is the heart of Paxos's correctness and it's only asserted. I can see that some reporter holds the chosen value, but not why the *highest-numbered* report must be that value rather than some other one.
11. P1 states: "A2 has accepted (4, "blue") ... A2 has promised 4 and A1 and A3 have promised 2." For accept(4, "blue") to be sent, a majority (two of three) must have promised 4. Here only A2 has. This state seems impossible under the protocol in the notes, which makes part (c) ("Could 'red' already have been chosen?") confusing to reason about.
12. P4(c): "a single PostgreSQL server with asynchronous followers that serve reads". The notes classify only consensus systems (CP) and Dynamo-style stores (AP). They never say how to classify a leader–follower setup, where writes fail away from the leader but stale reads still succeed on followers. I wasn't sure what answer was expected.

#### di6: Partitioning and distributed transactions

13. "A key belongs to the first node at or after the key's hash going clockwise". The Ring code uses bisect.bisect_right, described as "the first element greater than x", which is strictly after. The CODE problem says "first point whose hash is ≥ h(key)" and hints bisect_left. Two of the three descriptions agree and the notes' own code differs.

#### di7: Batch and stream processing

14. "Flink injects marker messages, barriers, into the input; each operator snapshots its state when a barrier passes. This is a variant of the Chandy–Lamport snapshot algorithm." The Chandy–Lamport algorithm is never explained. I also couldn't follow why snapshotting when a barrier passes gives a *consistent* snapshot across operators, for example an operator with several inputs whose barriers arrive at different times.

#### di8: Building reliable services

15. The notes say a circuit breaker "has three states", including "half-open". The CODE circuit_breaker spec allows state to be only "closed" or "open", and treats the trial call as happening inside "open". I wasn't sure whether "half-open" should ever show up as a state value.

### CS 430 Advanced Algorithms

#### aa2: Randomized algorithms

16. "here any split counts, which could be found with n − 1 max-flow computations". Why n − 1 isn't explained. I guessed you fix one vertex as s and try every other vertex as t, but that's never said.
17. "the values s in {0, …, p − 1} with s ≡ r (mod m) number at most ⌈p/m⌉, one of which is r itself, leaving at most ⌈p/m⌉ − 1 ≤ (p − 1)/m choices". The inequality ⌈p/m⌉ − 1 ≤ (p − 1)/m is used with no justification, and it's the step that gives 1/m.
18. "P(X ≥ (1 + δ)μ) ≤ e^(−δ2)μ/3   and   P(X ≤ (1 − δ)μ) ≤ e^(−δ2)μ/2". The exponent is garbled. From the worked example I worked out that it should be δ²μ/3 and δ²μ/2 all in the exponent, but as written it reads as e^(−2δ) times μ/3. Also, "(The proof applies Markov's inequality to e^(tX) ...; see the sources.)" No sources are given anywhere I can see.

#### aa3: Approximation algorithms

19. "A problem can have an FPTAS only if it has a pseudo-polynomial algorithm, so strongly NP-hard problems such as TSP don't." "Strongly NP-hard" is never defined, here or in CS 220/CS 320 as far as I know. The claim that an FPTAS implies a pseudo-polynomial algorithm is also given without any reason.
20. Table row: "√2 − ε (and 2 − ε if the Unique Games Conjecture holds)". The Unique Games Conjecture isn't explained, not even what it says.

#### aa4: Linear programming

21. P4 (path 1–2–3–4, weights 1, 5, 5, 1): "Find the LP relaxation's optimum ... What does rounding return?" (blocking) The LP optimum (6) is reached by several different solutions: x = (0, 1, 0, 1), x = (1, 0, 1, 0), and x = (1/2, 1/2, 1/2, 1/2) all cost 6. Rounding the first two returns a cover of weight 6. Rounding the all-halves solution returns all four vertices, weight 12. The notes never say which optimal solution to round, so I couldn't give one answer.

#### aa5: Streaming and sketching

22. "The error in row r is X_r = Σ_(y ≠ x, hr)(y) = h_r(x) f_y." The formula is garbled. I took it to mean the sum of f_y over items y ≠ x with h_r(y) = h_r(x), but as printed it doesn't parse.
23. "the estimate D̂ = (k − 1)/v_((k)) is unbiased, with relative standard error about 1/√(k − 2)". The text just before says the k-th smallest is about k/(D + 1), which suggests k/v_(k). The switch to k − 1, the claim that it's unbiased, and the 1/√(k − 2) error are all stated without explanation.
24. HyperLogLog: "D̂ = α_m m² / Σ_j 2^(−Mj)". I couldn't see why this is a harmonic mean, or where the m² comes from. There's also a mismatch: the notes say each register keeps "the largest ρ", where ρ − 1 is the number of leading zeros. The key term says each register stores "the longest run of leading zeros seen", which is ρ − 1.
25. "Calculus shows the best choice is k = (m/n) ln 2, which makes each bit 1 with probability exactly 1/2". The calculus is skipped. Minimizing (1 − e^(−kn/m))^k over k isn't obvious to me, and I couldn't reproduce it from the notes.

#### aa6: Online algorithms and beyond the worst case

26. "O(2ᵏ · m) time on m edges: practical for k = 30 on a million edges". 2³⁰ · 10⁶ is about 10¹⁵ basic steps. By the latency numbers in CS 410 Lesson 1, that's days or weeks of computation, so "practical" looks wrong.

### Across courses

27. CS 410 Lesson 1 says Byzantine tolerance needs "more than 3f nodes" and points to Lesson 4. Neither course ever explains it, though CS 410 Lesson 4's quiz uses it as an answer option (see item 3).

## Professor's response (part A: CS 410, CS 430)

### CS 410 Distributed Systems

1. **Protocol Buffers.** di1, RPC paragraph: it is now described where it first appears, as Google's compact binary format, in which both sides compile a shared description of the message's fields into encoding and decoding code.
2. **Two generals, deleting the last message.** di1: the proof now defines the shortened protocol (the sender sends nothing at that point) and argues about every run. Each run of the new protocol is a run of the old one in which, at most, that message was lost, so agreement holds whatever is captured. With nothing captured the generals still follow A's choice, because losing that message changes no one's action.
3. **3f + 1.** di1, the Byzantine bullet now gives the argument. A node can act only on n − f replies. Two such groups share at least n − 2f nodes, up to f of which may lie, so a shared honest node needs n − 2f > f, that is n > 3f. With crashes only, any shared node will do, which gives n ≥ 2f + 1. di4 quiz Q2: the distractor "Byzantine faults need 3f + 1 nodes" is true but irrelevant, so it is now "Tolerating f crashes needs 3f + 1 nodes", which is false (2f + 1 suffices, as the lesson shows).
4. **"Upward".** di3, CRDT paragraph: the order is now defined from merge. s is below t if merge(s, t) = t. An update must take s to an s′ with merge(s, s′) = s′. The G-counter example shows the order is entrywise ≤, and that an increment moves up while a decrement would not. The same test applies to the PN-counter (two G-counters) and to the OR-set (its sets only grow).
5. **The overwritten majority entry.** di4, commit rule: the five-server sequence from the Raft paper (S1 in term 2, S5 in term 3, S1 in term 4, S5 in term 5) is now written out with every vote checked against rule 3. A closing sentence says why an entry of term 4 on a majority would have stopped S5 from winning.
6. **Leader completeness.** di4: the skipped step is now a short proof. Take the first later leader L that lacks e, and compare the last terms X (L's) and Y (s's), with Y ≥ T. If X = Y, both last entries came from the term-X leader, and log matching gives e. If X > Y, the term-X leader had e by minimality, and log matching gives e again.
7. **Initial next_index.** di4: the notes now say the leader sets every next_index to one past the end of its own log when it is elected. S3, elected with log [1], starts at 2, which explains prev = (1, term 1) in trace steps 5 and 6.
8. **Commit index with entry 8 of term 5.** di4 P3: the problem now gives the current commit index (6). The answer says it stays at 6. Index 6 is on S1 to S4, so it is consistent.
9. **Prepare with an equal n.** The prompt and tests were right; the notes were wrong. Following Lamport's "Paxos Made Simple", an acceptor promises only for a number greater than any it has already promised. The di5 notes now say "hasn't already promised n or a larger number" and state that a repeated prepare(n) is rejected. The accept rule now notes that having promised n itself is fine. The paxos prompt mentions the repeated-prepare case. A new test, "Equal numbers: a repeated prepare is rejected, an accept with the promised number succeeds", checks both rules, alongside the existing "Acceptor rules" test.
10. **Why the highest-numbered report.** di5: the assertion is replaced by an inductive argument. If v was chosen in round m, the proposer of n > m hears from an acceptor that accepted (m, v), so it gets a report numbered k with m ≤ k < n. By induction (or because k = m), that report's value is v. Reports numbered below m can carry other values, which is why the proposer must take the highest one.
11. **Impossible Paxos state.** di5 P1 now reads "A2 and A3 have promised 4 (the accept(4, "blue") sent to A3 was lost) and A1 has promised 2". Round 4 now had its majority of promises. Answers (a) red, (b) blue and (c) no are unchanged and still correct. The hidden test that sets up this state was updated to match (A3.promised = 4) and still passes.
12. **Classifying a leader–follower database.** di5, CAP section: a sentence now says a system can be neither CP nor AP, if it refuses some requests during a partition and serves stale data from others. P4 now asks "which side of CAP it takes during a partition (if either)", so answer (c) follows from the notes.
13. **"At or after" versus bisect_right.** The definition (≥) is right. The di6 notes' Ring now uses bisect.bisect_left, with the comment "first point at or after h(key)". The explanation says bisect_left returns the first element ≥ x and mentions bisect_right as the strict twin. The printed loads and fractions are unchanged, which the lesson-code checker re-verified. New test, "A key whose hash equals a point belongs to that point's node": with one point per node, the key "B#0" hashes exactly to B's point and must map to B. bisect_right would fail it.
14. **Barriers and Chandy–Lamport.** di7: the parenthesis is now a paragraph. Sources insert numbered barriers and record their offsets. A one-input operator snapshots when the barrier arrives. A multi-input operator aligns first: it buffers the inputs that have already delivered barrier 7 until barrier 7 has arrived on every input. So all snapshots reflect the same events. The paragraph also states the Chandy–Lamport algorithm (record state at the first marker, then record in-flight messages on each other channel until its marker) and explains that alignment avoids recording those messages.
15. **Half-open as a state.** The notes' three states are right, so the problem now has them. When a call arrives after the cool-down, the state becomes "half-open" and that call is the trial. Success closes the breaker; failure reopens it. Between calls the state is "closed" or "open". The prompt, hint and solution are updated, and the di8 notes add a sentence on how half-open works when the time is passed in with each call. New test, "The trial call runs in the half-open state": fn records b.state during a failing trial and a succeeding one (both "half-open"), then the state is checked afterwards ("open", then "closed").

### CS 430 Advanced Algorithms

16. **n − 1 max flows.** aa2: the notes now say to fix s. Some vertex t lies on the other side of a minimum cut, so the smallest of the n − 1 minimum s–t cuts is a minimum cut.
17. **⌈p/m⌉ − 1 ≤ (p − 1)/m.** aa2: a parenthesis now justifies it. p/m is a whole number of m-ths, so rounding it up adds at most (m − 1)/m.
18. **Chernoff formula and "see the sources".** The HTML was right (nested `<sup>`), but it flattened ambiguously in the text dump. Both bounds are now written exp(−δ²μ/3) and exp(−δ²μ/2), with a sentence saying exp(z) means e^z and that the whole of −δ²μ/3 is the exponent. The dump now reads exactly that. "See the sources" now points to Kleinberg and Tardos, *Algorithm Design*, Section 13.9, which proves the bound with a slightly sharper upper tail. `kleinberg` (already in program.js) was added to aa2's sources.
19. **Strongly NP-hard; FPTAS ⇒ pseudo-polynomial.** aa3: three things were added. (a) The argument: run the FPTAS with ε = 1/(U + 1), where U bounds the integer optimum. It returns at least OPT − U/(U + 1) > OPT − 1, so it returns OPT exactly, in time polynomial in n and U. (b) A definition of strongly NP-hard and why such problems have no pseudo-polynomial algorithm and no FPTAS if P ≠ NP. (c) Why TSP is strongly NP-hard: the Hamiltonian-cycle reduction with distances 1 and 2.
20. **Unique Games Conjecture.** aa3: a paragraph under the table states it, in its linear-equations-mod-q form. It notes that it is unproven, and that if it is true, vertex cover's 2 (among other ratios) is the best possible.
21. **Rounding with non-unique LP optima.** aa4 P4 now has two parts. (a) Weights 1, 5, 4, 1. LP* = 5 is certified by the dual (1, 3, 1). Uniqueness follows from cost = (x₁+x₂) + 3(x₂+x₃) + (x₃+x₄) + x₂ ≥ 5 + x₂, which forces x = (1, 0, 1, 0). Rounding returns {1, 3}, weight 5. (b) Weights 1, 5, 5, 1. Show the all-1/2 point is optimal (cost 6, dual (1, 4, 1) of value 6). Rounding it gives all four vertices, weight 12, twice OPT = 6. Each part has one answer. I checked by hand and in Python that the grouped identity, the feasibilities and the values are right.
22. **Count-min error formula.** The HTML was right (a nested subscript), but it was unreadable in the dump. It is now X_r = Σ f_y, "the sum taken over all items y ≠ x with h_r(y) = h_r(x)", which reads the same both ways.
23. **KMV: k − 1, unbiasedness, error.** aa5 now derives the estimate. It explains why dividing by a random quantity biases k/v₍ₖ₎ upward. It gives the density of the k-th smallest value, c·t^(k−1)(1 − t)^(D−k), and the beta integral a! b!/(a + b + 1)!, which together give E[v₍ₖ₎] = k/(D + 1) and E[1/v₍ₖ₎] = D/(k − 1), so E[D̂] = D. They also give Var(D̂) = D(D − k + 1)/(k − 2), so the relative error is √((D − k + 1)/(D(k − 2))), just under 1/√(k − 2). I checked all four identities with exact fractions for (D, k) = (100, 5), (1000, 256) and (50, 10).
24. **HyperLogLog's harmonic mean and m²; key-term mismatch.** aa5: the notes now explain both. 2^(M_j) estimates one register's share, about D/m. Their harmonic mean is m/Σ2^(−M_j), which a few lucky registers can't pull up much. Multiplying by m gives α_m m²/Σ2^(−M_j). The key term now says each register stores "the largest ρ seen, where ρ is the position of a hash's first 1 bit (one more than its number of leading zeros)", which matches the notes.
25. **Optimal number of Bloom hash functions.** aa5: the calculus is now shown. With q = e^(−kn/m), ln p = −(m/n) ln q · ln(1 − q). The product is symmetric in q and 1 − q, and its derivative ln(1 − q)/q − ln q/(1 − q) vanishes at q = 1/2, where it peaks at (ln 2)² ≈ 0.48 (checked numerically on a grid). So k = (m/n) ln 2, p = 2^(−k) and ln p = −(m/n)(ln 2)², which leads straight into the existing m/n formula.
26. **"Practical for k = 30 on a million edges".** The student is right: 2³⁰ · 10⁶ ≈ 1.07 × 10¹⁵ steps, about 12.4 days at 10⁹ steps a second. aa6 now uses k = 20 on 10,000 edges: 2²⁰ · 10⁴ ≈ 1.05 × 10¹⁰ steps, about ten seconds. It compares this with C(5000, 20) ≈ 3.8 × 10⁵⁵ (written "about 4 × 10⁵⁵") subsets, and says plainly that k = 30 on a million edges would take almost two weeks. All values were computed in Python.

### Across courses

27. Resolved with item 3. The 3f + 1 argument now appears in CS 410 Lesson 1, where the bound is first used. Lesson 4's "Majorities" section adds a one-sentence link back: it is the same counting with no liars, groups of n − f = f + 1 must share a node, and Byzantine nodes need a shared honest node, hence 3f + 1. The Lesson 4 quiz now uses a false distractor, as described in item 3.

### Files and checks

The edited files are data/cs410.js, data/cs410-code.js (regenerated from cs410_spec.py) and data/cs430.js. data/cs430-code.js and cs430_spec.py did not need changes. The aa4 feasible-region figure fix is untouched. Problem ids are unchanged.

- `gen_code.py cs410_spec.py`: every problem OK, starters still fail, "0 problem(s) need attention".
- Pyodide run of data/cs410-code.js: only "ok" lines.
- `node --check` on all four data files: OK.
- `validate_content.js`: "all good".
- `export_problems` + `check_problems.py`: 362 problems, 0 problems found.
- `check_lesson_code.py`: no cs410 or cs430 lines (only the known cs101/cs102 false alarms).
- `lesson_time.js`: largest slow estimates are aa2 and aa5 at 81 minutes, cs410 at most 76 minutes.
- `test_dump_course.js`: all checks passed.

---

# Student review: Year 4 Fall

*Round 1, part B (CS 490, CS 470). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a fourth-year student. I've finished CS 100 to CS 380: programming, data structures, algorithms, systems, architecture, software engineering (CS 240), operating systems, theory, databases, graphics, networks, programming languages, compilers, CS 370 (Introduction to AI and Machine Learning) and CS 380 (Security Fundamentals), plus the math sequence through linear algebra and probability and statistics. I read both courses lesson by lesson and worked every quiz and practice problem in my head. I hand-checked most of the arithmetic and code outputs. The SHA-256 bucket values and the random-seeded outputs I couldn't check by hand.

### CS 490 Capstone Project I

#### pj2: Discovering requirements

1. "Faster check-in would save about $800 a week … Low-stock alerts would prevent about $500" against the code's `("inventory alerts", 500, 4), ("online check-in", 800, 3)`. The prose and the code give the features different names. "Online check-in" sounds like households checking in over the internet, which is not the faster desk check-in the paragraph describes. I wasn't sure these were the same features.

2. "A common rule from DSDM, the method that introduced MoSCoW". DSDM is never expanded or described, and I don't remember it from CS 240.

3. cost_of_delay CODE: "A feature finishing at the end of week t (counting from 0) costs cost_of_delay × t." I can't tell what "counting from 0" means here. In the notes' example, a 1-week feature finishes at the end of week 1 and costs 300 × 1. If weeks are counted from 0, the end of the first week would be week 0, which would give a cost of 0.

#### pj3: Planning and estimating

4. "But the spike has only one day of slack: if it runs two days over, it becomes critical." By the definition of slack, one day over is already enough to make it critical (zero slack). Two days over would delay the whole project by a day. The sentence seems off by one, or it means something by "critical" that I'm missing.

#### pj4: Architecture and design reviews

5. "Distributed-systems failures (partial failure, retries, consistency: see CS 410)". I haven't taken CS 410 and it isn't among my earlier courses, so I can't "see" it.

6. adr_index CODE: "("duplicate", n) if two records share number n". When numbers are duplicated, the problem doesn't say which record counts for "current" or for the "missing" and "not in force" checks. It also doesn't say whether the "Status:" label itself may be in any letter case, or only its value.

#### pj5: Working as a team

7. "Peer evaluations (see the rubric)" and, in Lesson 3, "the rubric's proposal, requirements, design review, prototype demo and report". The rubric isn't in the course text, so I can't see what is graded or the milestone dates.

#### pj6: Building the prototype

8. P2(c): "A bug is found and the team sets enabled to False." The notes never mention an "enabled" setting on a flag. It first appears in the feature_flags programming problem, which comes after the practice problems.

9. Q6's intended answer is "Teams that deploy small changes often tend to have fewer failures and recover faster". The notes only say these teams "also have fewer failures, not more". Recovery time is listed as one of the measures, but the notes don't report any finding about it.

10. changelog CODE: "##  and the new version, then up to three sections …" and "Each item is a line -  followed by scope:  if there is a scope". I can't tell the exact output format. I don't know whether the header is "## 1.9.0" (one space) or has two spaces. I also don't know whether "scope: " means the literal word or the commit's scope followed by ": ". Exact strings matter for a programming problem. (blocking)

#### pj7: Quality, security and data

11. "Birth year of oldest member | Funder's report on seniors (ADR 9)". ADR 9 is never shown. Lesson 4 P2 asks us to write an ADR for this decision but doesn't give it a number, so I wasn't sure what was being cited.

12. P3: "Does it pass AA for normal text? AAA?" The notes give only the AA thresholds (4.5:1, and 3:1 for large text). The AAA thresholds (7 and 4.5) first appear in the contrast programming problem. From the lesson notes alone I couldn't answer the AAA part. (blocking)

13. scrub_logs CODE: "In every other string, each email address is replaced by "[email]"". It isn't clear whether dict keys that are strings count as "other strings" and get scrubbed too, or only values.

### CS 470 Deep Learning

#### dl3: Generalization and regularization

14. P4: "A model's validation losses per epoch are 1.10, 0.84, …". The problem doesn't say whether the first value is epoch 0 or epoch 1. The notes' code counts from 0, so the answer ("which epoch") depends on a convention the problem doesn't state.

#### dl2: Training deep networks

15. Sidebar: "preferring random search over grid search because only a few hyperparameters usually matter". Neither search method is described, and I couldn't follow why "only a few hyperparameters matter" favours random search.

#### dl4: Convolutional networks

16. "each of the 224 × 224 × 64 outputs takes 27 multiplications, about 87 million in all". A 224 × 224 output assumes padding 1, but padding hasn't been introduced at that point and the layer wasn't described as padded. Without padding the output would be 222 × 222.

#### dl5: Sequence models: recurrence and attention

17. "A forget gate fixed at σ(3) ≈ 0.95 keeps 0.95⁵⁰ ≈ 0.088 of the gradient". When I compute 0.95⁵⁰ I get about 0.077. The 0.088 seems to come from σ(3) ≈ 0.9526, but as written the equation is wrong.

18. The order of the gates changes three times. The equation lists **i**, **f**, **o**, **g**. The worked example's code assigns "f, i, g, o" to "pre-activations are 1.5, 1, 2 and 1". The lstm programming problem's blocks are i, f, g, o. Reading the example's prose, I had to look at the code to work out which pre-activation belonged to which gate.

19. "Row 2 for the second token: its scores with tokens 0 and 1 are 0 and 1/√2". "Row 2" and "second token" count from 1, but "tokens 0 and 1" counts from 0, in the same sentence. I had to check the printed matrix to see which row was meant.

20. Q6: "Without positional encodings, what happens if two tokens of the input are swapped?", with the intended answer "The outputs at those two positions swap, and all others are unchanged". That holds for attention without a mask. With the causal mask that the lesson uses throughout, a position between the two swapped tokens sees a different set of tokens, so its output changes. The notes' "Attention ignores order" likewise seems untrue once a causal mask is applied. The question doesn't say which case is meant.

21. mha CODE: "positional_encoding(n, d): the sinusoidal encodings of positions 0 to n − 1". The notes' function of the same name, positional_encoding(pos, d), takes a single position and returns one vector. The same name with a different first argument confused me.

#### dl6: Training large models, and deploying them responsibly

22. "with mixed-precision training and Adam, a common estimate is 16 bytes per parameter (2-byte weights and gradients, plus a 4-byte master copy of the weights…)". Mixed-precision training isn't explained anywhere. I didn't understand why there are both 2-byte weights and a 4-byte "master copy", or what each one is used for. P3 depends on this estimate.

### Across courses

23. Both courses send me to material I don't have: the CS 490 grading rubric (item 7) and CS 410 (item 5). Neither is part of my background or of the course text.

## Professor's response (part B: CS 490, CS 470)

### CS 490 Capstone Project I

1. Fixed. The cost-of-delay code (pj2 notes) and the cost_of_delay tests now use the prose's names, "faster check-in" and "low-stock alerts". The outputs are unchanged (8300, 7500), and the problem was regenerated and re-verified.

2. Fixed. DSDM is now expanded: "the Dynamic Systems Development Method, an agile method from 1994 and the one that introduced MoSCoW".

3. Fixed. The cost_of_delay prompt now says that time starts at 0 when work on the first feature begins, so a feature delivered at the end of week *t* (*t* weeks after the start) costs cost_of_delay × *t*. It gives the notes' case as an example: a 1-week feature built first costs × 1, and a 3-week feature built next costs × 4.

4. Fixed; the student was right. pj3 now says: "if it runs one day over, it becomes critical (its slack drops to 0), and if it runs two days over, the project finishes a day late."

5. Fixed. The microservices row in pj4 now explains the three failure kinds in a few words (a service down while others run, retries that may repeat an operation, keeping copies of data consistent). CS 410 is mentioned only as a side pointer: "CS 410, taken alongside this course, covers them".

6. Fixed. The adr_index prompt now says that the "Status:" label may be in any letter case, and so may its value. It also covers duplicated numbers: every record still counts, so each accepted one appears in "current" (the same number can appear twice); m exists if any record has number m; and "not in force" looks at the first record numbered m in the list. The solution already behaved this way. Two new tests check the label case and the duplicate rules.

7. Fixed; this also covers item 23. pj3 now lists the milestones with their weeks: proposal and team charter (week 3), requirements (week 5), design document and review (week 7), prototype demo (week 11), and mid-project report and retrospective (week 14). pj5 no longer says "see the rubric". It now states what peer evaluations are for: together with the individual reflections they are 10% of the grade, and they are one of the sources used to adjust each member's share of a team grade, by at most a letter grade. pj1's introduction says that most of the grade comes from the five milestones, which Lesson 3 lists.

8. Fixed. The pj6 notes now introduce a flag's rule as a small record such as `{"enabled": True, "percent": 40}`. `enabled` is checked first, and setting it to False turns the feature off for everyone, so every flag can serve as a kill switch. The notes add that the programming problem extends the rule with lists of allowed and denied users. P2(c) now relies only on the notes.

9. Fixed. The DORA sentence now reports both findings: teams that deploy small changes frequently "have fewer failed deployments, not more, and recover from failures faster". The quiz's intended answer now matches the notes.

10. Fixed. The prompt's HTML had `<code>## </code>` and `<code>scope: </code>`, with the trailing spaces inside the code tags, which was easy to misread. The prompt now spells out each part in words: the header is two `#` characters, one space and the version (as in `## 2.0.0`); each item is a hyphen and one space, then, if the commit has a scope, the scope itself followed by a colon and one space, then the text. A three-line example output follows, and a new test checks that exact example.

11. Fixed. Lesson 4's P2 now asks for "the team's ninth ADR (number, …)", and its answer is already numbered 9. The Lesson 7 data inventory now cites "ADR 9, written in Lesson 4's Practice 2".

12. Fixed. The pj7 accessibility list now gives the AAA thresholds next to AA: "the stricter level AAA asks for 7:1, or 4.5:1 for large text". P3 can now be answered from the notes.

13. Fixed. The scrub_logs prompt now says: "Dict keys are never changed: only values are scrubbed." The solution already worked this way, and a new test checks it (a key that is an email address stays as it is, while its value is scrubbed).

### CS 470 Deep Learning

14. Fixed. dl3's P4 now says the losses are listed "starting from epoch 0". The answer's redundant "(counting from 0)" was removed.

15. Fixed. The sidebar now describes both methods with numbers. A 3 × 3 grid spends 9 runs but tries only 3 values of each hyperparameter, while 9 random draws try 9 values of each. When only a few hyperparameters matter, random search explores those more finely for the same budget (Bergstra and Bengio, 2012).

16. Partly mistaken: padding is introduced earlier in the same lesson ("Two dimensions, padding and stride"), before this paragraph. But the layer's padding was never stated, so the sentence now says "with padding 1, so the output stays 224 × 224". It also shows where 27 comes from (3 × 3 × 3). I checked the total: 224 × 224 × 64 × 27 = 86,704,128, about 87 million.

17. Fixed; the student was right. I ran both: 0.95<sup>50</sup> = 0.0769, and σ(3)<sup>50</sup> = 0.9526<sup>50</sup> = 0.0881. The sentence now reads "σ(3) ≈ 0.953 keeps σ(3)<sup>50</sup> ≈ 0.088".

18. Fixed. The gates now appear in one order everywhere: i, f, g, o, the same order as the lstm problem's blocks. The equations list **i**, **f**, **g**, **o**. The worked example names its pre-activations ("of **i**, **f**, **g** and **o** are 1, 1.5, 2 and 1"), and its code assigns and prints them in that order. The output is now `0.7311 0.8176 0.964 0.7311`, with the same c and h, and the checker passes it.

19. Fixed. Tokens are now numbered from 0 throughout, as in the code: "Like the code, number the tokens from 0. Row 1, for token 1 = (0, 1): its scores with tokens 0 and 1 are 0 and 1/√2".

20. The student is right. I checked this by running the lesson's example with tokens 0 and 2 swapped:
   - Without a mask, the outputs at positions 0 and 2 swap and position 1's output is unchanged.
   - With the causal mask, all three outputs change. A position between the two swapped ones sees a different set of tokens, and the two swapped positions each see a different set or have a different token of their own. Positions after the second swapped one would be unchanged.

   The notes no longer say "Attention ignores order". They now explain both cases, with the swap example as a checked code block. Q6 now asks about "attention with no mask and no positional encodings", and its explanation mentions how the causal mask changes the answer.

21. Fixed. I kept the function name, because the tests and id depend on it. The mha prompt now says that, unlike the notes' function of the same name, whose first argument is a single position and which returns one vector, this one takes the number of positions and returns the whole table, and that row *pos* is the notes' `positional_encoding(pos, d)`.

22. Fixed. dl6 now explains mixed-precision training before using the estimate:
   - The forward and backward passes run in a 16-bit floating-point format (CS 210 Lesson 2), which halves memory and runs faster on GPUs, so the weights used there and the gradients take 2 bytes each.
   - The update is applied to a 4-byte master copy of the weights. Near 1, neighbouring 16-bit values are 0.001 or more apart, so a step of 0.0001 would be rounded away. I checked this: in float16, 1 + 0.0001 = 1, and the spacing at 1 is 0.000977.
   - Adam's two moments take 4 bytes each.

   The total is spelled out: 2 + 2 + 4 + 4 + 4 = 16 bytes.

### Across courses

23. Fixed under items 5 and 7. The lessons now state the milestones, their weeks and how peer evaluations count, without relying on the rubric. CS 410 is now a side pointer, and the microservices row explains the failure kinds in a few words of its own.
