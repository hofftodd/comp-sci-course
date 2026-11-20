# Student review: Year 4 Fall

*Round 3, part A (CS 410, CS 430). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a fourth-year CS student. I have finished the first three years of the degree: programming, data structures, algorithms (CS 220), systems, architecture, operating systems, networks, databases, theory of computation, programming languages, compilers, AI/ML and security, plus discrete math, calculus, linear algebra, probability and statistics, and two physics courses. I read the full dumps for CS 410 Distributed Systems and CS 430 Advanced Algorithms in lesson order and tried each quiz and practice problem in my head. Most of the material followed from what I already knew, and I could start almost every problem. The items below are the places where I got stuck, found a contradiction, or could not tell what was expected.

### CS 410 Distributed Systems

#### di1: Why distributed systems are hard

1. In System models, a reliable link is defined as "every message sent is delivered exactly once, as long as the receiver doesn't crash", which presents TCP-style retrying as exactly-once delivery. A page later the RPC section says "Exactly-once delivery is impossible for the two generals' reason", then adds "(TCP's segments may also arrive twice; the receiver's bookkeeping is what hides it...)". I couldn't tell whether "delivered" means the same thing in both places. As written, one passage says retrying with sequence numbers gives exactly-once delivery and the other says exactly-once delivery is impossible.

#### di3: Replication

2. Q2 offers "Linearizability of the leader" as an option. Linearizability isn't defined until Lesson 5, so here I had no way to judge whether that option might also be correct.
3. Version-vector example: "Y writes {milk, ham} through R2 with context [1, 0], giving [1, 1]; the stored [2, 0] is not ≤ [1, 0], so both are kept." X's write [2, 0] went through R1. I couldn't tell whether R2 already holds [2, 0] at that moment, or whether "the stored" versions means some combined store across replicas. In general, it isn't clear which replica does the comparison against which stored versions when the replicas haven't yet exchanged writes.
4. "For a state-based CRDT, the merge function must be…" The phrase "state-based" suggests there is another kind of CRDT, but none is mentioned, so I didn't know what the qualifier distinguishes.

#### di4: Consensus I: Raft

(No items.)

#### di5: Consensus II and coordination

5. The Raft vs Multi-Paxos table says Raft's specification is "Complete: elections, logs, membership changes, snapshots". Snapshots never appear in Lesson 4, so I don't know what a snapshot is in Raft or why it is needed.

#### di6: Partitioning and distributed transactions

6. The crash table's row "The coordinator, before logging a decision | On restart it finds no decision, and aborts (presumed abort)" says nothing about participants being stuck. The text then says "The last row is 2PC's weakness", which implies only a crash after logging blocks anyone. But in the before-logging case, participants that voted yes also don't know the decision and must wait for the restart. P3(c) asks about exactly this case ("crashes before logging anything; it restarts 10 minutes later"), and from the table I can't tell whether locks are held for those 10 minutes.
7. Q5's intended answer is "Neither: it must wait for the decision, holding its locks". The notes, however, say "Asking the other participants helps only sometimes: if any of them received the decision, or voted no, the answer is known". So a participant that learns from a peer that someone voted no could abort without the coordinator. I wasn't sure whether "must wait" is meant to be always true.

#### di7: Batch and stream processing

8. The notes define lateness as "An event that arrives after its window has been emitted is late". The key term and the watermarks problem instead say an event is late if "its window's end is ≤ the current watermark", which also catches windows that never received an event and so were never emitted. These two definitions give different answers for an event whose window was never emitted, and I didn't know which one the lesson means.
9. mapreduce_workers: "calls reducer(key, values) with the values in map-task order." When tasks are re-run after a crash, execution order differs from task-index order. I couldn't tell whether "map-task order" means by task number (0, 1, 2, …) or by the order in which the successful runs happened.

#### di8: Building reliable services

(No items.)

### CS 430 Advanced Algorithms

#### aa1: Amortized analysis

(No items.)

#### aa2: Randomized algorithms

(No items.)

#### aa3: Approximation algorithms

10. metric_tsp asks for mst_edges "in the order the children join the tree", but says nothing about ties. When two outside points have the same smallest best, or an update finds an equal distance, I don't know which point to pick or whether link changes, and the tree and therefore the tour could differ. The notes' code happens to use the lowest index and a strict <, but the problem statement doesn't say so.
11. knapsack_fptas: "Return the list of indexes (sorted) of a feasible set of greatest total value." Several sets can have the same greatest value, and it isn't said which one to return. fptas also doesn't say what to do when every item is heavier than W: then n = 0 and K = eps * vmax / n is undefined.

#### aa4: Linear programming

12. P2 ("Solve by simplex… Enter x first"): after x enters and s₃ leaves, y enters and the ratio test gives a tie (both s₁ and s₂ allow y ≤ 1), so the vertex is degenerate. The notes' Bland's rule says "on ties in the ratio test let the lowest-numbered basic variable leave", but the notes never number the variables. Only the simplex_solver CODE prompt does. I didn't know whether s₁ or s₂ should leave. The two choices give different final dictionaries and so different dual solutions for P3, which asks me to "find an optimal dual solution from the final dictionary".

#### aa5: Streaming and sketching

(No items.)

#### aa6: Online algorithms and beyond the worst case

13. "how sorted a list already is: Timsort exploits existing runs". Timsort and "runs" are not explained here, and I don't remember them from an earlier course.

### Across courses

14. Φ means three different things in courses I am taking at the same time. In CS 430 Lesson 1 it is a potential function ("Choose a potential function Φ"). In CS 410 Lesson 8 it is the standard normal CDF ("with Φ the standard normal CDF"), right next to φ for the phi accrual suspicion level. Reading both in the same week, I had to stop and check which one was meant.
15. CS 410 Lesson 6 says of fixed hashes: "CS 430 Lesson 5, taken alongside this course, discusses when that is enough." When I reach CS 410 Lesson 6, I may not yet have reached CS 430 Lesson 5. Also, the pigeonhole argument that every fixed hash has bad inputs is in CS 430 Lesson 2, so I wasn't sure which CS 430 lesson the pointer really needs.

## Professor's response (part A: CS 410, CS 430)

1. **di1, "delivered exactly once".** Real contradiction in wording. System models now defines a reliable link as: every message is eventually handed to the receiving program, and handed over only once; the network may carry it twice, but the receiver's sequence numbers discard the copy, as long as neither end crashes and loses that bookkeeping. The RPC bullet now says exactly-once delivery "in the sense of the network carrying each message exactly one time" is impossible, and its parenthesis says this is how the reliable link above works, within one connection, and why an RPC server still needs its own table (a retry may come on a new connection or after a restart).
2. **di3 Q2.** Replaced the distractor "Linearizability of the leader" with "Eventual consistency", which was defined earlier in the same lesson. The answer (read-your-writes) is unchanged.
3. **di3 version vectors.** Added the rule for replicas: each replica forwards the versions it stores, and a replica receiving one applies the same test, discarding versions ≤ another and keeping the rest as siblings, so every comparison is made by one replica against what it holds. The example now covers both cases: R2 has already received [2, 0] (it keeps both), or has not (it stores [1, 1] in place of [1, 0], and keeps both when [2, 0] arrives; R1 does the same on receiving [1, 1]).
4. **di3 "state-based".** One sentence now names the two kinds, operation-based (send each update operation) and state-based (send whole states and merge), and says the lesson uses only state-based CRDTs.
5. **di5 snapshots.** The Raft vs Multi-Paxos table now explains both terms inline: membership changes (adding or removing servers safely) and snapshots (saving the state machine's state so the earlier log entries can be deleted, since otherwise the log grows forever).
6. **di6 crash table.** The row for a coordinator crash before logging now adds "Meanwhile, participants that voted yes are stuck", and the text says "The last two rows are 2PC's weakness". That agrees with P3(c)'s answer: both participants hold their locks for the full 10 minutes.
7. **di6 Q5.** The notes now say an in-doubt participant must wait "unless some other participant can tell it the outcome", and that asking peers is something basic 2PC doesn't do, though an extension can. Q5 now says "In basic 2PC … The participant knows nothing about the other participants' votes", so "must wait" is always true there, and its explanation mentions the peer case. This matches the two_phase_commit problem, where asking peers is an option (`ask_peers`).
8. **di7 lateness.** I used the watermark definition everywhere, since the watermarks problem and its tests use it. The notes now define a late event as one that arrives when the watermark has already reached its window's end (end ≤ watermark), and add that a window with no events is closed the same way, so an event for it is late too. The key term says the same, "whether or not that window was emitted". The worked table's rows are unchanged (each is consistent with both readings).
9. **mapreduce_workers order.** The reference solution iterates `sorted(done)`, so the order is by task number. The prompt now says: by task number (task 0's values first, then task 1's, …), however runs were interleaved or re-executed, and within one task in the order its mapper produced them. Tests are unchanged. I regenerated and reran them in Pyodide.
10. **metric_tsp ties.** The prompt now states the rule the solution uses: among outside points with the same smallest distance, the lowest-indexed joins next, and a point's link changes only on a strictly smaller distance. I added a test, `mst_edges([(0, 0), (1, 0), (0.5, 2), (-1, 0)])` → `[(0, 1), (0, 3), (0, 2)]`. Points 1 and 3 tie at distance 1 (index rule), and point 2 is exactly as far from 1 as from 0 (strict-update rule). A solution that breaks either tie the other way fails it.
11. **knapsack_fptas.** The prompt now says any best set is accepted when several tie. This is true of the tests: the exact-answer tests have a single best set (checked by enumeration), and the others check only feasibility and value. `fptas` now says that if no item weighs at most W it returns `[]`, which is what the solution already did. I added a test for that case, `fptas([(5, 10), (9, 3)], 4, 0.1)` → `[]`.
12. **aa4 P2 tie.** The notes' Bland's rule now numbers the variables: original ones first, in order, then the slacks (x, y, s₁, s₂), matching the simplex_solver prompt. P2 now says to break ratio-test ties by Bland's rule, so s₁ leaves. That gives the final row z = 11 − 2s₁ − s₃ and the dual (2, 0, 1) that P3 uses. I checked this by hand and with the reference simplex solver, which returns (11, [3, 1]). The answer also notes that letting s₂ leave gives z = 11 − (2/3)s₂ − (7/3)s₃, a different optimal dual (0, 2/3, 7/3) with value 11, as an illustration of degeneracy. Both were checked by substitution.
13. **aa6 Timsort.** Now explained inline with a back-reference: Timsort, Python's sort from CS 201 Lesson 6, finds runs (stretches already in order) and merges them, so it takes Θ(n) time on an already sorted list. This matches CS 201's table.
14. **Φ across courses.** Each course keeps the standard notation: MATH 230 uses Φ for the normal CDF, and CLRS uses Φ for potentials. Both places now say which Φ they mean. CS 430 Lesson 1: "Φ (capital phi; in this lesson it is always a potential, not the normal CDF Φ of MATH 230)". CS 410 Lesson 8: "Φ (capital phi) the standard normal CDF of MATH 230 Lesson 3, a different thing from the suspicion level φ (lowercase) and from the potential Φ of amortized analysis".
15. **CS 410 Lesson 6 pointer.** It now points back to CS 201 Lesson 3's hash flooding, which students have done. The side pointer to CS 430 names both lessons, the pigeonhole argument (Lesson 2) and when a fixed hash is good enough (Lesson 5), and says nothing in CS 410 depends on either.

Problem specs edited: cs410_spec.py (item 9) and cs430_spec.py (items 10, 11). Both were regenerated with gen_code.py, which reported 0 problems, and every test prints "ok" in Pyodide.

---

# Student review: Year 4 Fall

*Round 3, part B (CS 490, CS 470). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a fourth-year CS student. I've finished the whole core sequence: programming, data structures, algorithms, systems, architecture, software engineering (CS 240), OS, theory, databases, graphics, networks, programming languages, compilers, intro AI/ML (CS 370) and security (CS 380), plus discrete math, calculus, linear algebra and probability/statistics. This term I'm taking CS 490 Capstone Project I and CS 470 Deep Learning. I read both dumps in order and tried every quiz and practice problem. I re-ran the worked numbers in the notes I could check (cost of delay, PERT, critical path, burndown fits, feature-flag buckets, contrast ratios, percentiles, SUS, initialization RMS, momentum step counts, Adam, LayerNorm gradients, CNN sizes and parameter counts, attention weights, the GPT-2 count, BPE merges, 6ND, LoRA, energy). They matched, so the items below are about explanations and consistency, not arithmetic.

### CS 490 Capstone Project I

#### pj4: Architecture and design reviews

1. "Two copies of the data can disagree; the server keeps the earliest visit when duplicates arrive." Then the review response: "The server keeps the earliest visit per household per week and flags the other for Maria." This seems to contradict Lesson 2's REQ-4: "Given the household has already checked in this week, When I select it, Then I see the earlier visit's date and must confirm before recording another." REQ-4 lets a volunteer confirm a second visit in the same week, but the server rule seems to discard any second visit that week. I couldn't tell whether a confirmed second visit is kept or thrown away.

#### pj5: Working as a team

2. "On top of that, give each member one coordinating role, recorded in the charter" lists exactly four roles (client liaison, process lead, technical lead, quality lead). But Lesson 1 says "Teams of three to five work best." I didn't know what the fifth member of a five-person team does, or which role a three-person team drops or doubles up. Lesson 1 also calls one role "client contact" and this lesson calls it "client liaison". I assume they're the same role, but it's never said.

#### pj6: Building the prototype

3. "This lesson is about building in a way that keeps the system working, integrated and deployable every day from the second week on." Later: "For the pantry, in week 7:" the walking skeleton is built. Lesson 3 puts the design review in week 7, and its task graph has the skeleton depending on design. So the system can't be deployable from week 2. I didn't know whether "second week" means the second week of building or of the term, or whether the skeleton is meant to come before the design review.

4. "ignore semver's special rule for 0.x versions" (changelog problem). This course never explains the rule. I couldn't tell which inputs it would change, so I couldn't be sure my tests covered the cases it means.

#### pj7: Quality, security and data

5. The threat model lists among the assets "the household records (names, addresses, household sizes, dietary and health notes)". Its social-engineering response says "addresses are never given out; the system doesn't show them to desk volunteers at all", which implies addresses are stored and only hidden. But the data inventory says the address is "Checked at registration, then reduced to 'in area: yes'", and the text adds "after the check, the system keeps only the answer." I couldn't tell whether the pantry system stores addresses (Maria only) or doesn't store them at all. That changes the answer to the threat model and to Practice 4.

### CS 470 Deep Learning

#### dl1: Tensors and automatic differentiation

6. "the number of dimensions is its rank. A number is a rank-0 tensor…" In MATH 220, rank means the number of linearly independent rows or columns. The notes only warn that mathematicians use "tensor" for something more specific; they don't say the word "rank" is also being given a new meaning. Lesson 6 then uses the linear-algebra meaning: "learns a low-rank update … for a small rank r (MATH 220 Lesson 5)". Under this lesson's definition every matrix has rank 2, so "low-rank" confused me until I worked out that it switches back to the MATH 220 meaning.

#### dl6: Training large models, and deploying them responsibly

7. "ties are broken by taking the alphabetically smallest pair". The code uses `min(pairs, key=lambda p: (-pairs[p], p))`, and the programming problem says "the smallest pair in Python's tuple order". These aren't the same once the "</w>" symbol is involved: in Python order "<" sorts before every letter, and "</w>" has no place in alphabetical order at all. When continuing the merges by hand (Practice 1), I wasn't sure which rule to follow for a tie involving "</w>".

### Across courses

8. In CS 490 Lesson 4's table of architectural styles: "CS 410 Distributed Systems, a required course this term, covers them". My courses this term are CS 490 and CS 470, and CS 410 isn't among the courses I've been given. I don't know whether I'm missing a required course, or whether partial failure, retries and consistency are meant to be covered somewhere I can read.

## Professor's response (part B: CS 490, CS 470)

1. **Changed (cs490 pj4).** The student is right: "keeps the earliest visit" read as discarding second visits that REQ-4 allows. The ADR 7 consequence and the design-review response now say the same thing. An offline desk can't see a visit recorded elsewhere, so it can't ask for REQ-4's confirmation. When a queued check-in arrives for a household that already has a visit that week, the server keeps both and flags the later one for Maria to keep or remove. A second visit confirmed at the desk (REQ-4) is recorded normally and isn't flagged. This matches CS 491's story S2 "Offline duplicates flagged to Maria", so CS 491 needs no change. (If CS 491 anywhere says duplicates are *discarded* or that only the earliest is kept, it should follow the new wording. I found no such sentence.)

2. **Changed (cs490 pj1, pj5).** pj5 now says how to staff the four roles in teams of three to five. With four members, each takes one. With three, one member holds two (process and quality lead combine well). With five, the fifth takes the role the project needs most, for example a design lead who owns the interface sketches and the usability tests (Lesson 8). pj1's charter bullet now says "client liaison", the name pj5 and CS 491 use.

3. **Changed (cs490 pj6).** "Every day from the second week on" now reads "every day from the first week of building (week 7, straight after the design review) to the end of the term". The skeleton paragraph now reads "in week 7, once the design review has approved the design". These agree with Lesson 3's task graph (the skeleton depends on design) and the week-7 milestone. Nothing in CS 491 depends on this.

4. **Changed (cs490 changelog problem).** The prompt no longer refers to a rule the course never taught. It now says to apply the same bump rules when the major number is 0, so a breaking change after 0.4.1 gives 1.0.0. It also explains briefly that semver lets anything change below 1.0.0 and that some tools bump only the minor number there, which the problem doesn't want. I added a visible test, `next_version('0.4.1', …)`, that gives `['1.0.0', '0.5.0', '0.4.2']`. The solution was unchanged. I regenerated from the spec (0 problems) and all tests print "ok" in Pyodide.

5. **Changed (cs490 pj7, pj4, sidebar).** The system does not store addresses, which is the point of the data inventory. These places now agree:
   - Threat-model assets: the household records are names, card numbers, sizes and notes. The addresses typed at registration are listed separately as "checked, then discarded".
   - Social-engineering response: nothing about any household is given out by phone, not even whether it is registered, and the system can't leak an address because it doesn't keep one.
   - Laptop row: "never notes" (it used to say "never addresses or notes").
   - Inventory row: "Maria, at registration only" and "Not kept: checked at registration, then only 'in area: yes' is stored".
   - pj4's list of architectural forces: "registration handles addresses".
   - The ethics sidebar's example: a leak of "health notes" instead of an address.

   Practice 4 is a project problem, so its guidance is unaffected. CS 491 doesn't mention household addresses.

6. **Changed (cs470 dl1, dl6).** dl1 now warns that "rank" here isn't MATH 220's rank (the number of linearly independent columns), that every matrix is a rank-2 tensor, that NumPy calls this `ndim`, and that Lesson 6's "low-rank" uses the MATH 220 meaning. The key term says the same. dl6's LoRA sentence now says "in the linear-algebra sense of MATH 220 Lesson 5 (not Lesson 1's tensor rank): BA has at most r linearly independent columns".

7. **Changed (cs470 dl6).** "Alphabetically smallest" is replaced by Python's tuple order, which is what the code's `min` and the programming problem use. Pairs are compared by first symbol, then second, as strings by Unicode code point. "<" (60) comes before every lower-case letter (97 to 122), and a prefix comes before a longer string. Examples: ('t', '</w>') < ('t', 'a'), and ('e', 's') < ('es', 't'). For the tie in the notes: ('e', 's') < ('s', 't') < ('t', '</w>'). I checked each comparison in Python. Practice 1's answer already used this order.

8. **Wording only (cs490 pj4).** CS 410 is a real required course this term. The student was given only two courses. The parenthetical now reads "CS 410 Distributed Systems, which you take alongside this course this term, covers them in depth; for this table, the definitions here are enough", because the same parenthetical already defines partial failure, retries and consistency.

### Checks
- `node --check` on data/cs490.js, data/cs490-code.js and data/cs470.js: ok.
- validate_content: all good.
- check_problems: 407 problems, 0 problems found.
- check_lesson_code: no cs490 or cs470 lines (only the known cs101 and cs102 false alarms).
- lesson_time: CS 490 slowest 71 min, CS 470 slowest 82 min.
- test_dump_course: all checks passed.
- gen_code for cs490: 0 problems. Pyodide run of cs490-code.js: only "ok" lines.
