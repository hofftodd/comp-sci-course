# Student review: Year 4 Fall

*Round 2, part A (CS 410, CS 430). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a fourth-year CS student. Before this term I completed CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240, PHYS 250, CS 310, CS 320, CS 340, CS 350, CS 330, CS 360, CS 365, CS 370 and CS 380. I know only what those courses taught. I read the dumped text of CS 410 and CS 430 from start to end, worked each derivation and code output I could by hand, and tried every quiz question and practice problem.

### CS 410 Distributed Systems

#### di1: Why distributed systems are hard

1. "A design that needs three round trips between Europe and America before it can answer a request takes at least 170 ms". The notes just gave the London–New York round-trip floor as 55.7 ms, and three of those make 167.1 ms, not 170 ms. It reads like a lower bound, so I couldn't tell whether 170 is a rounding or uses a different distance.
2. "Exactly-once delivery is impossible for the two generals' reason". The two generals proof is about two parties agreeing to act the same way. The notes don't show how it carries over to message delivery: why couldn't the receiver deliver exactly once with sequence numbers, the way TCP does?
3. "Without deduplication, five of the ten deposits had a lost reply, were retried, and were applied twice". A balance of 1500 shows only five extra applications. A deposit whose reply was lost twice would be applied three times, so I couldn't see how the output shows it was exactly five deposits applied twice each.

#### di2: Time and order

No items.

#### di3: Replication

4. "A write that has seen the current version replaces it; two writes whose vectors are concurrent are both kept as siblings". The notes don't say how a write "has seen" a version. Does the client send back the vector it read? Who increments which entry? What vector does the merged value get after siblings are resolved? I couldn't build or compare version vectors for an example from this description.
5. P1(b): "The client's previous read was served by F1. Which replicas can serve this read without violating monotonic reads?" The problem doesn't say what log position F1 had reached when it served that earlier read. Without it, I don't know the minimum position a replica needs now.

#### di4: Consensus I: Raft

No items.

#### di5: Consensus II and coordination

6. "a number that the lock service increases every time it grants the lock (ZooKeeper's transaction id, or Raft's log index, works)". ZooKeeper's transaction id hasn't been described anywhere. I don't know what it counts or why it increases with every lock grant.

#### di6: Partitioning and distributed transactions

7. "with one point per node, E happened to land in the middle of C's large arc and took 28.5%, all from C". The printed loads are a sorted list of counts with no node names ([729, 1283, 3344, 4644]). Nothing shown tells me which node is C, or that E's keys all came from one node, so I couldn't check this claim against the output.

#### di7: Batch and stream processing

No items.

#### di8: Building reliable services

8. "If gaps were exponentially distributed with mean μ … φ = t / (μ ln 10) … A node whose heartbeats normally arrive like clockwork becomes suspect after a much shorter silence than one whose heartbeats are usually irregular." In the only formula given, φ depends on the mean μ alone, not on how regular the gaps are. The notes don't show how the detector "estimates the distribution of past heartbeat gaps" in a way that captures regularity, so I couldn't see where the clockwork claim comes from.

### CS 430 Advanced Algorithms

#### aa1: Amortized analysis

9. "So the total actual cost is the total amortized cost minus Φ(D_m) − Φ(D₀)." Without brackets this reads as subtracting both potentials. From the equation above it, it has to mean minus (Φ(D_m) − Φ(D₀)). I had to re-derive it to be sure.

#### aa2: Randomized algorithms

10. "Each run takes O(n²) time with a little care, so the total is O(n⁴ log n)." The notes don't explain how one run is done in O(n²). Also, T = C(n, 2) ln(1/δ) runs at O(n²) each gives O(n⁴ log(1/δ)). The log n appears only if δ is some inverse polynomial in n, and that is never stated.

#### aa3: Approximation algorithms

11. "For a maximization problem, it is a ρ-approximation if ALG(I) ≥ OPT(I)/ρ" (ρ ≥ 1). The table then lists MAX-3SAT, a maximization problem, as "7/8" and "7/8 + ε", which uses the below-1 convention. Knapsack, also maximization, is listed as "1 + ε", the ≥ 1 convention. Two conventions in one table made the rows hard to compare.
12. "MAX-3SAT … 7/8 (a random assignment, in expectation)". A ρ-approximation was defined as a polynomial-time algorithm meeting the bound on every input. A random assignment meets 7/8 only in expectation, and the notes never show how to turn that into an algorithm that is guaranteed to reach it. So I couldn't tell in what sense this row counts as a 7/8-approximation. (P4 asks only that such an assignment exists.)

#### aa4: Linear programming

No items.

#### aa5: Streaming and sketching

13. "its density is c tᵏ⁻¹(1 − t)^(D−k) with c = D · C(D − 1, k − 1)". The density of the k-th smallest of D uniforms wasn't covered in MATH 230. One sentence of reasoning isn't enough for me to see why the constant is D · C(D − 1, k − 1), or why the result is a density rather than a probability.
14. "HyperLogLog uses the first b bits of each hash to send it to one of m = 2ᵇ registers, each keeping the largest ρ of its share." The notes don't say whether ρ (leading zeros plus one) is counted on the bits after those b bits or on the whole hash. It matters, because the first b bits are what chose the register.
15. Sidebar: "LSM-tree databases such as LevelDB, RocksDB and Cassandra keep a Bloom filter for each file on disk". "LSM-tree" isn't explained here and I don't remember it from CS 340. I don't know why such a database has many files that a lookup might have to check, which is the setup of P4.

#### aa6: Online algorithms and beyond the worst case

16. (blocking) The definition is "ALG(σ) ≤ c · OPT(σ) + a" for a constant a, but the lower bound "No deterministic strategy does better" argues only about the ratio ALG/OPT on one season. In ski rental every cost is at most about 2B. Break-even satisfies ALG ≤ OPT + (B − 1) for every d, so it seems to be 1-competitive with a = B − 1. That contradicts "2 − 1/B is optimal" unless a may not depend on B, and the notes never say so. Q2 and the ski_secretary problem rely on this lower bound.

### Across courses

17. Both courses use fixed hashes as if they were random: CS 410 Lesson 6's SHA-256 ring and Lesson 7's zlib.crc32 partitioning, and CS 430 Lesson 5's blake2b `unit_hash` and the starter's `bucket(r, key, width)`. Yet CS 430 Lesson 2 proves that every fixed hash function has bad inputs, and that guarantees need a function drawn at random from a universal family like ((ax + b) mod p) mod m on integer keys below p. Count-min's analysis in CS 430 Lesson 5 explicitly assumes "chosen independently from a universal family". Neither course says whether these fixed string hashes meet the assumptions of the analyses that use them, so I couldn't tell when the proven bounds actually apply to the code.

## Professor's response (part A: CS 410, CS 430)

1. **Fixed (di1).** The sentence now reads "at least 3 × 55.7 ≈ 167 ms (over 200 ms with measured round trips)". 170 was rounding, which is wrong for a lower bound.
2. **Fixed (di1).** The exactly-once item now explains the step: after a timeout the sender can't know whether its message arrived, because any acknowledgment could be lost. So it must either resend (and risk two deliveries) or not (and risk none). Receiver-side sequence numbers are the deduplication that gives an exactly-once *effect*. The TCP comparison now says the receiver uses sequence numbers to discard duplicates, and only within one connection whose state both ends still hold.
3. **Fixed (di1). The student was right.** I counted applications per request with the lesson's exact code and seed: deposits 4, 8 and 9 were applied twice and deposit 7 three times, `{4: 2, 7: 3, 8: 2, 9: 2}`. That is four deposits and five extra applications. The text now says the 1500 means five extra applications and gives this breakdown.
4. **Fixed (di3).** The version-vector paragraph now gives the mechanics:
   - a read returns the value with its vector (the context);
   - a write sends back the context it read, and the replica handling the write sets its own entry to one more than the largest it has used;
   - the write replaces every stored version whose vector is ≤ the context, entry by entry, and keeps the rest as siblings;
   - a read of siblings returns their entrywise maximum as the context, and the merged write replaces them all.

   A worked two-replica cart example follows: [1,0], then [2,0] and [1,1] as siblings, then the merge written as [3,1].
5. **Fixed (di3 P1).** Part (b) now says F1 "had then applied entries up to 497, as it has now", so the minimum position (497) is given. The answer is unchanged.
6. **Fixed (di5).** The text now says what ZooKeeper's *zxid* is (the sequence number it gives every change to its state) and why it works as a fencing token: granting the lock is such a change. The Raft alternative is now "the Raft log index of the grant".
7. **Fixed (di6).** `loads` now returns a dict keyed by node, so the output shows `{'A': 1283, 'B': 3344, 'C': 4644, 'D': 729}` and the 100-vnode dict. The text names C as the busiest node and D as the idlest. A new line prints the set of (old owner, new owner) pairs among the moved keys for one point per node, `{('C', 'E')}`, which backs up "all from C". All outputs were checked by running the code (check_lesson_code).
8. **Fixed (di8).** The text now says why the exponential model can't capture regularity: its standard deviation always equals its mean. It then describes what the 2004 detector actually does: it keeps μ and σ of recent gaps and fits a normal distribution (MATH 230 Lesson 3), so P(gap ≥ t) = 1 − Φ((t − μ)/σ), and φ = 3 is reached at t = μ + 3.09σ. With μ = 1 s, a clockwork node (σ = 0.1 s) becomes suspect after 1.31 s and an irregular one (σ = 0.5 s) after 2.55 s. I checked these values with `statistics.NormalDist`. The exponential example and its practice problem stay as the simpler model.
9. **Fixed (aa1).** The text now says "minus the difference Φ(D_m) − Φ(D₀)" and adds a displayed equation: c₁ + … + c_m = â₁ + … + â_m − (Φ(D_m) − Φ(D₀)).
10. **Fixed (aa2).** The lesson now shows how one run takes O(n²):
    - keep an n × n multiplicity matrix with row totals;
    - pick a random edge in O(n) by choosing a vertex in proportion to its row total, then a neighbour in proportion to the multiplicities;
    - contract in O(n) by adding row and column v into u's and zeroing the diagonal;
    - there are n − 2 contractions.

    The total is now stated as O(n⁴ log(1/δ)), which is O(n⁴ log n) for δ = 1/n or any inverse polynomial.
11. **Fixed (aa3).** The table now uses the lesson's ρ ≥ 1 convention throughout (the column header says "ratio ρ"). MAX-3SAT is now listed as 8/7 ("satisfies at least 7/8 as many clauses as OPT"), and its impossible ratio as 8/7 − ε. Knapsack's 1 + ε was already in this convention.
12. **Fixed (aa3).** The MAX-3SAT paragraph now derandomizes the random assignment with the method of conditional expectations:
    - set the variables one at a time;
    - at each step, the current expectation is the average of the two choices, so one choice doesn't lower it;
    - each expectation is computable by linearity: a satisfied clause counts 1, and one with j unset literals and none true counts 1 − 2^(−j).

    The expectation starts at 7m/8 and never falls, so the result is a deterministic polynomial-time algorithm that satisfies at least 7m/8 ≥ (7/8)·OPT clauses. That makes it an 8/7-approximation in the lesson's sense.
13. **Fixed (aa5).** The density is now derived. "Density" is recalled as probability per unit length (MATH 230 Lesson 3). The text computes P(t ≤ v₍k₎ ≤ t + dt): D choices for the value in the interval, C(D − 1, k − 1) choices for which others are below t, and probability dt · t^(k−1)(1 − t)^(D−k) for each, ignoring the chance of order dt² that two values land in the interval. These choices are disjoint events, so their probabilities add, and dividing by dt gives the density.
14. **Fixed (aa5).** The text now says ρ is computed on the bits after the first b, because those b bits are the same for every hash in a register.
15. **Fixed (aa5 sidebar).** CS 340 Lesson 8 does introduce LSM trees, and the sidebar now reminds the reader in a parenthesis: writes collect in memory and are written out as immutable sorted files, so a key may be in any of many files.
16. **Fixed (aa6). The student was right.** The additive constant a trivializes ski rental: break-even satisfies ALG ≤ OPT + (B − 1). A new paragraph after the break-even bound explains this. Because every cost is below 2B, a constant allowed to depend on B would hide everything, so ski rental (like any problem with bounded costs) uses the strict form ALG ≤ c · OPT. The constant a is for problems like paging, where costs grow with the input. The lower-bound argument, Q2 and the ski_secretary problem were already about the strict ratio and now agree with the definition.
17. **Fixed (both courses).**
    - **CS 430 Lesson 5, new paragraph "Fixed hashes and the proofs" (before Bloom filters):**
      - Count-min assumes independent universal functions, and KMV, HyperLogLog and Bloom filters assume more: independent uniform hashes.
      - `unit_hash` and the problems' `bucket` are fixed functions (bucket's row number only makes the rows differ). By Lesson 2's pigeonhole argument they have bad inputs, so the theorems don't apply to them as written.
      - In practice, nobody knows how to find inputs on which a cryptographic hash (BLAKE2, SHA-256) behaves differently from a random one, so errors on ordinary inputs match the analysis (as the 5.3% KMV result did).
      - Against an adversary, the fix is a secret random key chosen at creation (`hashlib.blake2b(..., key=...)`, checked to run), the analogue of choosing a and b at random. CRC-32 is easy to make collide on purpose.
    - **CS 410 Lesson 6:** the SHA-256 note now says a fixed hash behaves like the random function the proofs assume only on keys not chosen against it. It points sideways to CS 430 Lesson 5, taken alongside.
    - **CS 410 Lesson 7:** the CRC-32 note now says CRC spreads ordinary keys evenly but is easy to make collide, so a job with adversary-controlled keys would need a keyed hash.

### Checks

No problem specs or code files changed, so no regeneration or Pyodide run was needed. The checks:

- `node --check data/cs410.js` and `node --check data/cs430.js`: OK.
- `validate_content.js`: all good.
- `check_problems.py`: 362 problems, 0 problems found.
- `check_lesson_code.py`: no cs410 or cs430 lines. The only lines are the known cs101/cs102 false alarms.
- `lesson_time.js`: the longest slow estimate is aa5 at 85 minutes, and nothing is over 100.
- `test_dump_course.js`: all checks passed.

---

# Student review: Year 4 Fall

*Round 2, part B (CS 490, CS 470). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a fourth-year student. I've finished the whole core sequence: CS 100–380, the MATH sequence (discrete math, calculus, linear algebra, probability and statistics), PHYS 150/250 and WRIT 100. CS 240 gave me the software engineering basics this term builds on (user stories, MoSCoW, CI, semver, code review). CS 370 gave me scalar autograd, MLPs, a sketch of the transformer and the CS 370 Lesson 8 material on LLMs. I read both courses' dumps in lesson order and tried every quiz and practice problem. I checked the arithmetic and the printed outputs that looked doubtful with a calculator or a few lines of Python. Everything I checked matched, so the items below are places where the text confused me or seemed inconsistent, not wrong numbers. I found nothing that stopped me from answering a quiz question or starting a problem.

### CS 490 Capstone Project I

#### pj4: Architecture and design reviews

1. "Distributed-systems failures (… CS 410, taken alongside this course, covers them)". My courses this term are CS 490 and CS 470. CS 410 isn't one of them, so I don't know whether I'm supposed to be taking it, or where I'd learn about partial failure and keeping copies of data consistent.

#### pj5: Working as a team

2. "Quality lead: owns the test strategy, CI and the definition of done (Lesson 6)". Lesson 6 covers the test strategy and CI but never mentions a definition of done. The only place it appears is Lesson 1's charter ("Quality: the team's definition of done (reviewed, tested, merged, deployed)"), so the cross-reference sent me to the wrong lesson.

#### pj7: Quality, security and data

3. "the elective CS 350 explains this sRGB encoding". I took CS 350 Computer Graphics as part of my regular sequence, so calling it "the elective" confused me. I couldn't tell whether the sRGB material is something I should already know or something I may have missed.

#### pj8: Demonstrating and reflecting

4. "The term ends with three milestones in quick succession: the prototype demo in week 11, the mid-project report in week 14, and your individual reflection." Lesson 1 says the project has "five milestones", and Lesson 3 lists them (proposal, requirements, design review, prototype demo, mid-project report). Those lessons treat reflections as separate from milestones. Calling the individual reflection a milestone here makes it look like a sixth one, and its week is never given.

### CS 470 Deep Learning

#### dl1: Tensors and automatic differentiation

5. "column 0 of M is all ones, so the first column of the gradient is the column sums of X, (4.5, 1.5); column 1 picks out example 1 alone, (1, 2); column 2 picks out example 2, (3, −1)." In one sentence the columns are numbered from 0 but the examples from 1: "example 1" is the first row of X, [1, 2], and "example 2" is the second, [3, −1]. The code numbers everything from 0, so at first I read "example 1" as X[1] = [3, −1] and the numbers didn't match.

#### dl2: Training deep networks

6. The notes define `forward_rms(n, layers, std, seed=0)`, which builds its own random inputs and weights. The programming problem asks for `forward_rms(X, weights)`, with different arguments. Lesson 5's mha problem explicitly warns that its `positional_encoding` differs from the notes' function of the same name, but there is no such warning here, so I wasn't sure whether to match the notes or the problem statement.

#### dl3: Generalization and regularization

7. "trained on CIFAR-10 (60,000 small photos in 10 classes) … They memorized 50,000 meaningless labels." The two numbers don't match, and the text never says where the other 10,000 photos went (presumably a held-out test set).

#### dl5: Sequence models: recurrence and attention

8. "**h**_t = tanh(W_h**h**_(t−1) + W_x**x**_t + **b**)" and the LSTM's "W_i[**x**; **h**]" (and the lstm problem's "z = W [x; h] + b" with W of 4H rows) use column vectors with the matrix on the left. Lesson 1 made a point that "deep learning code usually puts examples in rows" and computes **x**W, and dl2's init problem says weights are "used as xW for a row vector x". This lesson switches back to the CS 370 convention without saying so, and I had to stop and work out which way the weight shapes go.

#### dl6: Training large models, and deploying them responsibly

9. "T5 … deletes spans of text and trains an encoder–decoder to produce the missing spans." The course never explains what an encoder–decoder is. The only transformer block shown, in Lesson 5, is a single causal stack, so I can't picture how T5's architecture differs or what the encoder and decoder each do.

10. "near 1, neighbouring 16-bit values are 0.001 or more apart". With 10 fraction bits, as the notes say just before, the spacing just above 1 is 2⁻¹⁰ ≈ 0.000977, which is slightly less than 0.001, and just below 1 it's half that. The conclusion that a step of 0.0001 is rounded away still holds, but "0.001 or more" seems wrong as stated.

11. "B starts at 0, so training begins exactly at the pretrained model." The notes never say how A is initialized. If A also started at 0, the gradients of both B and A would be 0 and training couldn't start. I couldn't tell whether A must be random, or why.

12. P3: "Estimate the memory for their Adam state at 16 bytes per trained parameter". The notes' 16 bytes per parameter covers the 16-bit weights, the gradients, the 4-byte master copy and Adam's two moments. Adam's own state is only 8 of those bytes, so I wasn't sure whether the problem wants all training memory for the LoRA parameters or just the optimizer moments. I also couldn't tell whether the frozen base model's weights should be counted.

### Across courses

13. As in item 1, CS 490 assumes a course called CS 410 taken alongside it. My Year 4 Fall courses are CS 490 and CS 470, so either the term is missing a course or the reference is out of date.

14. The two courses handle the row/column convention for weight matrices differently. CS 470 Lesson 1 sets rows (**x**W) as the deep-learning norm, then CS 470 Lesson 5 and its programming problems go back to column vectors (W**h**, W[x; h]), so weight shapes have to be re-derived from lesson to lesson.

## Professor's response (part B: CS 490, CS 470)

1. The reviewer was shown only two of the term's courses. CS 410 Distributed Systems really is a required Year 4 Fall course, so the reference is correct. Because "taken alongside this course" could still be misread, pj4's architecture table now says "CS 410 Distributed Systems, a required course this term, covers them".

2. Fixed. In pj5 the quality lead now "owns the test strategy and CI (Lesson 6), the charter's definition of done (Lesson 1), and the accessibility and security checks (Lesson 7)".

3. CS 350 is a Year 3 Fall elective, which explains the wording. To make clear that the lesson doesn't depend on it, pj7 now says "CS 350 Computer Graphics Lesson 1, a Year 3 elective, explains this sRGB encoding; the formulas below are all you need". The linearization formulas follow straight after.

4. Fixed. pj8's introduction now says "The term ends with the last two milestones and your final individual reflection in quick succession: the prototype demo in week 11, the mid-project report in week 14, and the final reflection at the end of the term." This matches Lesson 1's five milestones and the rubric, which treats reflections as a separate assessment. The rubric gives no week for the final reflection, so the text says "at the end of the term".

5. Fixed. dl1's hand check now numbers everything from 0: "column 1 of M has its only 1 in row 0, so it picks out example 0 (row 0 of X), (1, 2); column 2 picks out example 1 (row 1), (3, −1)". The numbers match the code's output.

6. Fixed. The dl2 `init` problem now explains the difference: "Unlike the notes' `forward_rms(n, layers, std, seed)`, which draws its own inputs and weights, this one takes them as arguments, so that any initializer can be tested on the same batch." I changed this in cs470_spec.py and regenerated the code file. Tests are unchanged.

7. Fixed. dl3 now says "CIFAR-10 (60,000 small photos in 10 classes: 50,000 for training and 10,000 held out for testing)".

8. and 14. Fixed by saying which convention applies. I kept the column convention because the RNN and LSTM papers and CS 370 use it. Just after the RNN equation, dl5 now says: "Here, and for the LSTM below, we follow the RNN literature and CS 370 and write column vectors with the matrix on the left, so W_h has one row per hidden unit: these matrices are the transposes of Lesson 1's row-convention (xW) weights. Attention, later in this lesson, goes back to rows." The `lstm` problem prompt now says it uses the column convention: each row of W produces one entry of z, and W is the four gate matrices stacked. Tests are unchanged.

9. Fixed. dl6 now explains the encoder–decoder in one sentence. It was the design of the original 2017 transformer, with two stacks of blocks. The encoder reads the whole input with attention unmasked. The decoder is a causal stack like Lesson 5's, and each of its blocks also attends to the encoder's outputs (cross-attention: queries from the decoder, keys and values from the encoder).

10. Correct, and fixed. dl6 now says "with 10 fraction bits, neighbouring 16-bit values just above 1 are 2^−10 ≈ 0.00098 apart (just below 1, half that; with fewer bits, wider), so a step of 0.0001, less than half the gap, ... would be rounded away". I checked this with numpy: `np.spacing(float16(1))` = 0.000977 and `np.spacing(float16(0.999))` = 0.000488. Also, float16(1) + float16(0.0001) = 1.0 and float16(0.999) + float16(0.0001) = 0.999.

11. Fixed. dl6 now says: "B starts at 0, so BA = 0 and training begins exactly at the pretrained model. A starts random: the gradient for B is multiplied by A and the gradient for A by B, so if both started at 0 neither would ever move."

12. Fixed. dl6 P3 now asks for "the training memory for these trained parameters alone (their 16-bit weights and gradients, master copy and Adam's two moments) at the notes' 16 bytes per parameter, not counting the frozen base weights". The answer (16,777,216 parameters, about 268 MB, rechecked) already counts the frozen 14 GB separately.

13. Same as item 1. The term has four courses (CS 410, CS 490, CS 430 elective, CS 470 elective), and the reviewer was shown two of them. The reference is correct and now names CS 410 as a required course this term.
