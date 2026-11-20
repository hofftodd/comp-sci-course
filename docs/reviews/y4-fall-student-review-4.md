# Student review: Year 4 Fall

*Round 4, part A (CS 410, CS 430). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a fourth-year CS student. Before this term I completed the courses listed in my brief, from CS 100 and CS 101 through CS 380 Security Fundamentals, including MATH 120/121, MATH 220, MATH 230, CS 201, CS 220, CS 310, CS 330, CS 340 and CS 370. This term I read CS 410 Distributed Systems and CS 430 Advanced Algorithms from the dumped course text, in lesson order, and tried every quiz question and practice problem in my head. I checked a few of the stated numbers with my own scratch arithmetic. Most of it followed from the notes. Below are the places where I got stuck or confused.

### CS 410 Distributed Systems

#### di1: Why distributed systems are hard

1. Quiz Q5 offers "Omission-free" as a failure model, next to "Crash-stop / Crash-recovery / Byzantine". The lesson never mentions omission failures or an "omission-free" model. I couldn't tell whether this is a real model I'm supposed to know or just a made-up distractor.

#### di5: Consensus II and coordination

2. In P4(c), "a single PostgreSQL server with asynchronous followers that serve reads", I couldn't tell what CAP's "Availability" would mean here. The lesson defines it as "every request received by a node that hasn't failed eventually gets a non-error response". But the followers can never accept writes, even without a partition. So is this system ever "available" in CAP's sense? The lesson's "can also be neither" remark doesn't say how to classify it under PACELC either.

#### di6: Partitioning and distributed transactions

3. "A key stays put only if h mod 4 = h mod 5, which happens for 4 of every 20 consecutive values of h (0, 1, 2 and 3)". The lesson doesn't say why exactly those four residues work, or where the 20 comes from. Q2 (9 to 10 nodes) and P1 (4 to 6 nodes) both depend on the general rule. For 4 to 6 the pattern isn't "the first N of every N(N+1)", so I had to list residues mod 12 by hand. I wasn't sure that was the intended method.

#### di8: Building reliable services

4. In P1(c), "How often would a healthy node be falsely suspected at that threshold", I didn't know whether to answer per heartbeat gap (a probability) or per unit of time (a rate). The lesson only gives φ as a probability per gap and never turns it into a frequency.

### CS 430 Advanced Algorithms

#### aa1: Amortized analysis

5. "it moves the accessed node to the root by a particular sequence of rotations (pairs of rotations called zig-zig and zig-zag steps, plus one single rotation if needed)". Zig-zig and zig-zag are named but never defined, and CS 201's AVL rotations weren't introduced under those names. I couldn't picture what a splay actually does.

#### aa2: Randomized algorithms

6. δ means two different things within a few paragraphs. In the Karger amplification it is a failure probability: "choosing T = C(n, 2) ln(1/δ) gives failure probability at most … δ". In the Chernoff bound it is a relative deviation: "for 0 < δ ≤ 1, P(X ≥ (1 + δ)μ) ≤ exp(−δ²μ/3)", with δ = 1/4 in the majority-vote example. Lesson 5 then uses δ as a failure probability again. Reading the Chernoff section, I first took δ to be the failure probability from the section before.

7. P3 asks for the number of runs for n = 50 and failure probability 0.001 "by the notes' bound", which is ⌈C(n, 2) ln(1/δ)⌉. C(50, 2) · ln 1000 = 1225 × 6.90776 ≈ 8462.0002, so the ceiling is 8463. But with ln 1000 rounded to 6.9077 the product is just under 8462, and the ceiling is 8462. I couldn't tell which answer is intended, or whether the problem expects that much precision.

#### aa4: Linear programming

8. P4 gives "the dual of the vertex cover LP has a variable y_e ≥ 0 per edge, maximizes Σy_e, and requires the y of the edges at each vertex to sum to at most its weight". The lesson only showed how to take the dual of "maximize c·x subject to Ax ≤ b, x ≥ 0". The vertex cover LP is a minimization with ≥ constraints and also has the constraints x_v ≤ 1. I didn't understand why those constraints get no dual variables, or how to dualize a minimization problem myself. "Show that this optimum is the only optimal point" also has me stuck. The lesson states complementary slackness only for "an optimal pair". I wasn't sure I could fix one dual optimum and use it to force every primal optimum, for example to conclude x₂ = 0 because vertex 2's dual constraint isn't tight. It also never states the reverse direction ("if a dual constraint is slack, its primal variable is 0") in a form I could use here.

### Across courses

9. Nothing here contradicts anything else. The cross-references between the two courses agree with each other: fixed hashes and bad inputs (CS 410 Lesson 6 to CS 430 Lessons 2 and 5), CRC-32 being easy to make collide (CS 410 Lesson 7 and CS 430 Lesson 5), and Φ as a potential versus the normal CDF (CS 430 Lesson 1 and CS 410 Lesson 8). The one thing that bothered me across both courses is that symbols get reused with new meanings: δ as noted in item 6 (and as round-trip delay in CS 410's NTP section), and ρ as the approximation ratio in CS 430 Lesson 3 and the HyperLogLog bit position in Lesson 5. Each time I had to stop and work out which meaning applied.

## Professor's response (part A: CS 410, CS 430)

1. **di1 Q5 "Omission-free".** It was a made-up distractor. I replaced it with "Partially synchronous", which the lesson defines as a timing model. The explanation now says it is a timing model, not a failure model. The answer (crash-recovery) is unchanged.
2. **di5 P4(c).** The question now says a write sent to a follower is passed on to the leader, so the system's behaviour is fully specified. The answer now says that with no partition every request succeeds, and that CAP, as always, is about what happens during a partition. Then a follower cut off from the leader must return errors for writes (not A), and its reads can be stale (not C), so the system is neither CP nor AP. PACELC's partition half doesn't fit it either, for the same reason, and its else half is EL.
3. **di6 hash mod N.** The notes now give the method. Both h mod 4 and h mod 5 repeat every 20 values (the least common multiple), so it is enough to check h = 0, …, 19, and only 0 to 3 agree. The same check over one least common multiple works for any change of N, which is the intended method for P1 (4 to 6, over 12 values). The notes also state the rule for N to N + 1: exactly h = 0, …, N − 1 of each N(N + 1) agree, so 1/(N + 1) of the keys stay, which answers Q2. Both claims were checked by enumeration: for 4 to 5, 9 to 10 and 4 to 6, and for N to N + 1 for every N up to 29.
4. **di8 P1(c).** The question now asks for the average time between false suspicions of one node, and then for a 1,000-node cluster. It also notes that a chance p per gap means one false suspicion per 1/p gaps. The answer shows the steps: 10⁸ gaps × 0.5 s = 5 × 10⁷ s ≈ 1.6 years per node, and 5 × 10⁴ s ≈ 14 hours for 1,000 nodes. I computed both.
5. **aa1 zig-zig / zig-zag.** These are now defined inline in terms of CS 201 Lesson 4's rotations. In a zig-zig, the node and its parent are both left children (or both right children): rotate the parent above the grandparent, then the node above the parent. In a zig-zag, one is a left child and the other a right child: rotate the node up twice, as in AVL's Left-Right and Right-Left cases. When the parent is the root, one single rotation finishes.
6. **aa2 δ.** Both uses follow the standard notation, so I kept the symbol. The Chernoff section now says that in this bound δ is a relative deviation (how far X is from μ, as a fraction of μ), not the failure probability δ of the amplification paragraph, and tells the reader to watch which one is meant.
7. **aa2 P3 rounding.** The student is right: 1225 × ln 1000 = 8462.0002 is on a knife edge. I changed the failure probability to 0.01. Then 1225 × ln 100 = 5641.33, so T = 5642 runs, about 11.3 s. The answer notes that rounding ln 100 to three or more decimals gives the same ceiling (1225 × 4.605 = 5641.1). Two decimals (4.61) would not. The code and its output comment were updated and rerun (`5642 11.3`).
8. **aa4 P4 dual and complementary slackness.** I added a short "Its dual" paragraph after the LP relaxation. The constraints x_v ≤ 1 can be dropped, because lowering a value above 1 to 1 keeps every edge covered and doesn't raise the cost. What remains has the form min c·x, Ax ≥ b, x ≥ 0. Its dual is max b·y, Aᵀy ≤ c, y ≥ 0, with weak duality, strong duality and complementary slackness as before and the inequalities reversed. Applied to the incidence matrix, this gives exactly the y_e dual that P4 used. The complementary slackness paragraph now says that every optimal x paired with every optimal y is an optimal pair, so a single dual optimum constrains all primal optima. It states the direction asked for: if a dual constraint is slack, its primal variable is 0 in every optimal x (and the converse for primal slack). P4 now points to the notes for the dual and says to use complementary slackness for uniqueness. The answer opens with that argument: vertex 2's dual constraint is slack, 1 + 3 < 5, so x₂ = 0 in every optimum. It keeps the direct regrouping argument as a check. The numbers are unchanged; I rechecked them by hand.
9. **Reused symbols across courses.** No contradiction to fix. δ (round-trip delay in CS 410's NTP section, failure probability and relative deviation in CS 430) and ρ are the standard notations in their sources, so I kept them. Item 6 covers the in-lesson clash of δ. For ρ, CS 430 Lesson 5's HyperLogLog paragraph now says ρ there is a bit position, unrelated to Lesson 3's approximation ratio. The NTP δ is in a different course with its own definition, so I left it.

No programming problems changed, so the specs weren't edited or regenerated.

---

# Student review: Year 4 Fall

*Round 4, part B (CS 490, CS 470). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a fourth-year student who has finished the first three years of the degree: CS 100 to CS 380, the MATH sequence up to MATH 230 Probability and Statistics, and PHYS 150 and 250. This term I read CS 490 Capstone Project I and CS 470 Deep Learning from start to finish, in lesson order. I tried every quiz question and practice problem. Where the notes printed a code output or a number, I checked it, either by hand or by running the snippet on its own. Every output I checked matched what the notes say. The items below are the places where I actually got stuck or wasn't sure.

### CS 490 Capstone Project I

#### pj2: Discovering requirements

1. Practice 3: "Order them by CD3 and compute the total cost of delay." Y (150/1) and Z (600/4) both have a CD3 of 150, and the notes never say how to order a tie. Only the cost_of_delay programming problem ("breaking ties by name") does. Working through the exchange argument, I think the total comes out the same either way. But I had to work that out before I could be sure what "the" CD3 order was.

#### pj5: Working as a team

2. Practice 2: "Estimate the bus factor of this log by the notes' greedy method." Ana and Ben each know two files, so the first step of "remove the person who knows the most files" is a tie. The notes text doesn't say how to break it; the bus_factor programming problem says "ties by name". Both choices seem to give a bus factor of 2, but I couldn't tell from the lesson alone whether the tie rule was meant to matter.

### CS 470 Deep Learning

#### dl2: Training deep networks

3. "The terms are independent, so their variances add: Var(z) = n · Var(w) · E[x²]". The stated assumption is that "the weights are independent of each other and of the inputs". Nothing says the inputs x_i are independent of each other, and after a ReLU layer they generally aren't. So I couldn't see why the terms w_i x_i are independent. I can see they are uncorrelated, because each w_i has mean 0 and is independent of everything else. I wasn't sure whether "independent" was a slip or an extra assumption I missed.

4. "so we need α < 2/50 = 0.04, and then the x direction shrinks by only 1 − 0.035 = 0.965 per step". The value α = 0.035 appears here without being chosen or explained. It is only an example value just under the limit. On first reading I thought 0.035 had been derived from the 0.04 bound somehow. Practice 3 then calls it "the notes' bowl with α = 0.035".

5. In the notes' forward_rms, the layer is computed as `sum(W[i][k] * x[k] for k in range(n))`. That treats W as (outputs × inputs). Lesson 1 says that in row convention "the weight matrix of a layer from n_(in) to n_(out) units has shape (n_(in), n_(out))" and the layer computes **x**W. The init programming problem for the same lesson also uses `sum(x[k] * W[k][j] ...)`. Because the matrices are square and random, the result doesn't change. But this snippet contradicts the convention the course just set up, and I wasn't sure which one to follow.

#### dl4: Convolutional networks

6. Quiz 4: "What is the receptive field of four stacked 3 × 3 convolutions with stride 1? | 9 / 12 / 9 × 9 / Four 3 × 3 patches | ans: 9 × 9". The notes' receptive_field function returns a single number: for three layers it prints 7, and the text then says "see 7 × 7". So "9" and "9 × 9" both look correct to me, and I couldn't tell which one the question wanted. (blocking)

#### dl5: Sequence models: recurrence and attention

7. "along the cell, ∂**c**_t/∂**c**_(t−1) is just **f** (element-wise), with no squashing derivative and no weight matrix". The gates **f**, **i** and **g** are computed from [**x**; **h**_(t−1)], and **h**_(t−1) = **o** ⊙ tanh(**c**_(t−1)). So **c**_(t−1) also reaches **c**_t through the gates, which brings in weight matrices and tanh/sigmoid derivatives. By the chain rule as taught, the full derivative isn't just **f**. I couldn't tell whether the notes mean only the direct path along the cell, and why the other paths can be ignored. Quiz 3's intended answer depends on this statement.

### Across courses

8. CS 490 pj4's architecture table says: "CS 410 Distributed Systems, which you take alongside this course this term". The courses I was given for Year 4 Fall are CS 490 and CS 470, and CS 410 isn't among them. I couldn't tell whether I'm supposed to be taking CS 410 now, or whether I'm expected to know its material. The same sentence says "the definitions here are enough", so this didn't block anything.

## Professor's response (part B: CS 490, CS 470)

1. **pj2 Practice 3, CD3 tie.** The worked answer already handled the tie, but the notes didn't. Added to the CD3 paragraph in pj2: when two features tie on CD3, either order gives the same total (the exchange argument shows why), so ties can be broken any way, for example by name. The practice and its answer are unchanged (total 10,100 either way).

2. **pj5 Practice 2, bus-factor tie.** The greedy method in the pj5 notes now says "breaking a tie by name, so that the estimate is reproducible". This matches the bus_factor programming problem and the practice answer ("tie with Ben, broken alphabetically"). In this log either choice gives 2. Removing Ben first orphans ui.py (1 of 4), then removing Ana orphans 3 of 4.

3. **dl2, "the terms are independent".** That was a slip. The derivation only needs the terms to be uncorrelated. The notes now say the terms needn't be independent (after a ReLU layer the x_i usually aren't), but they are uncorrelated: for i ≠ j, E[w_i x_i w_j x_j] = E[w_i] E[x_i w_j x_j] = 0, because w_i is independent of the rest and has mean 0. So every covariance is 0 and the variances add, by Var(X + Y) = Var X + Var Y + 2 Cov(X, Y) from MATH 230 Lesson 4. No quiz relies on full independence.

4. **dl2, where α = 0.035 comes from.** The notes now say "Take α = 0.035 as an example just under that limit (nothing special about it)". Practice 3's wording ("the notes' bowl with α = 0.035") now refers to that stated choice.

5. **dl2 forward_rms against the row convention.** The snippet now follows Lesson 1's convention. W has shape (n_in, n_out) (commented), and each layer computes relu(xW) as `sum(x[k] * W[k][j] for k in range(n)) for j in range(n)`, matching the init programming problem. The random draws are the same, but each matrix is now used transposed, so the printed numbers change. I ran the new code and updated the output comments:
   `0.01 0.06 6e-07 3.2e-13` / `1/sqrt(n) 0.74 0.18 0.03` / `He 1.1 1.0 0.96` (previously 0.053 4.6e-07 2.6e-13 / 0.67 0.14 0.024 / 0.94 0.8 0.77).
   The prose still holds. The theory for 1/√n is 0.71, 0.18 and 0.031, which is now even closer. One sentence changed: He initialization "keeps it near 1. (It wanders a little, up or down, because 64 units and 20 inputs are a small sample.)" It previously said the value drifts *below* 1, which this run no longer shows. Across seeds 0 to 5 it wanders both ways.

6. **dl4 Quiz 4 (blocking).** The choices are now "7 × 7", "12 × 12", "9 × 9" and "Four 3 × 3 patches". The answer is still "9 × 9" (index 2). The bare "9" is gone, so exactly one choice is correct. "7 × 7" is the three-layer field from the notes.

7. **dl5, ∂c_t/∂c_(t−1) = f.** This statement was imprecise, and the paragraph now says what it means. c_(t−1) reaches c_t by two kinds of path. The indirect ones go through h_(t−1) = o ⊙ tanh(c_(t−1)) and the gates, so they carry weight matrices and squashing derivatives and can vanish as an RNN's do. The direct path, along the cell (holding f, i and g fixed), has derivative just f. The full gradient is the sum over paths (chain rule), and this one term doesn't shrink step after step when f is near 1, so the long-range gradient no longer has to vanish. Quiz 3's correct choice now reads "Along the direct path through the cell, ∂c_t/∂c_(t−1) is just the forget gate, ...". With that wording the answer still holds, and the other choices are still wrong.

8. **CS 410 in pj4.** No change. CS 410 Distributed Systems is a required Year 4 Fall course taken in parallel. The reviewer was given only the part-B courses, which is why it looked unfamiliar. The sentence already says "the definitions here are enough", so nothing depends on CS 410.

### Checks
- `node --check` on data/cs470.js and data/cs490.js: OK.
- validate_content: all good.
- export_problems + check_problems: 407 problems, 0 problems found. No problem files or specs changed, so no regeneration was needed.
- check_lesson_code: no cs470 or cs490 lines. The only mismatches are the known cs101/cs102 false alarms.
- lesson_time: every cs490 and cs470 lesson is under 100 minutes on the slow estimate (maximum dl5, 83).
- test_dump_course: All checks passed.
