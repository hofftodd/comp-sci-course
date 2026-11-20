# Student review: Year 4 Fall

*Round 5, part A (CS 410, CS 430). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a fourth-year CS student. Before this term I completed the Year 1–3 sequence: programming, data structures, discrete maths, calculus, linear algebra, probability and statistics, Algorithms I, systems, architecture, operating systems, theory of computation, databases, graphics, networks, programming languages, compilers, AI/ML and security. I read the full text of CS 410 and CS 430 in order, from the files produced by `scripts/dump_course.js`, and tried every quiz and practice problem in my head. Both courses were mostly easy to follow. Almost every number and code output I checked by hand (latency floors, NTP, the Lamport and vector stamps, quorum overlaps, the Raft commit indexes, the knapsack rounding, the simplex pivots, the count-min and Bloom sizes, the secretary probabilities) came out as stated. The items below are the places where I actually got stuck or had to guess.

### CS 410 Distributed Systems

#### di6: Partitioning and distributed transactions

1. "The same check over one least common multiple works for any old and new N; from N to N + 1 it always finds exactly h = 0, …, N − 1 out of N(N + 1), so only 1/(N + 1) of the keys stay." The 4→5 case is shown by listing values. The general claim that the only agreeing residues are exactly 0, …, N − 1 is just asserted ("it always finds"). I had to work out for myself why an h ≥ N in that range can never have h mod N = h mod (N + 1).

2. "A key stays put only if h mod 4 = h mod 5, Both sides repeat every 20 values of h". There is a capital letter after a comma, so it looks like a sentence was cut or two sentences were merged. I re-read it to check whether something was missing.

3. "That is two rounds of messages, four messages per participant, and two forced log writes on the critical path." The word "forced" is never explained. I assume it means flushed to disk before continuing (fsync), but the lesson only says "writes ... to its log on disk". I couldn't tell whether "forced" is a separate idea from that.

### CS 430 Advanced Algorithms

#### aa2: Randomized algorithms

4. "picking a uniformly random edge means picking a vertex with probability proportional to its row total and then a neighbour in proportion to the multiplicities, O(n)". The lesson doesn't show why this two-step choice gives every edge the same probability. Each edge can be reached from either of its endpoints, and I had to check myself that the counts work out to a uniform choice.

5. "The careful constant for the median is about 3.39n." The lesson proves 8n and then states 3.39n with no hint of where it comes from. I couldn't tell whether this is something I'm supposed to be able to derive.

#### aa4: Linear programming

6. In the "Relax and round: weighted vertex cover" section, the order of the paragraphs is confusing. First comes the rounding rule ("put v in the cover if x_v ≥ 1/2"). Then a long paragraph headed "Its dual." describes the dual LP. Then come the bullets "It is a cover: …" and "It costs at most 2 LP*: …". Because they follow the dual paragraph directly, I first read "It" as the dual solution. Only after re-reading did I see that the bullets are about the rounded cover described two paragraphs earlier.

7. The simplex_solver hint says: "Store the tableau as rows of Fractions … Keep the objective as a row of reduced costs, starting as **c** followed by zeros … The variable can increase without limit (unbounded) if no row has a positive entry in column e." The notes never use the words "tableau" or "reduced costs". They work only with the dictionary form (s₁ = 24 − 6x − 4y), where a row limits the entering variable when its coefficient is *negative*. In the hint's rows the slack's column is the identity, so the signs seem to be the opposite way round. I couldn't tell how the hint's "positive entry" test and its objective row relate to the dictionary's signs without working out the conversion myself.

#### aa5: Streaming and sketching

8. "The same integral with tᵏ⁻³ gives E[1/v_((k))²] and from it the variance of D̂, D(D − k + 1)/(k − 2)". This step is skipped. The mean was shown in some detail, but the second moment and the subtraction that gives this variance are left out. I had to do both on paper to believe the formula and the 1/√(k − 2) error that follows from it.

9. "its derivative, ln(1 − q)/q − ln q/(1 − q), is zero at q = 1/2, where the product reaches its maximum". A zero derivative shows q = 1/2 is a critical point, not that it is the maximum. The lesson doesn't say why it isn't a minimum, or why there is no other critical point.

### Across courses

10. CS 410's di8 says Φ is "a different thing from the suspicion level φ (lowercase) and from the potential Φ of amortized analysis". CS 430's aa1 says "in this lesson it is always a potential, not the normal CDF Φ of MATH 230". The two cross-references agree. But in the same week, Φ means the normal CDF in one course and a potential function in the other, and φ is the phi-accrual suspicion level. I had to stop and check which one was meant each time it appeared, especially in di8's formula P(gap ≥ t) = 1 − Φ((t − μ)/σ).

## Professor's response (part A: CS 410, CS 430)

1. **di6, hash mod N.** Added the short argument after the general claim. If h mod N = h mod (N + 1) = r, then h − r is a multiple of both N and N + 1. These share no factor, so h − r is a multiple of N(N + 1), and within 0, …, N(N + 1) − 1 that forces h = r < N.
2. **di6, garbled sentence.** The comma splice is fixed: "… = h mod 5. Both sides repeat every 20 values …". Nothing was missing.
3. **di6, "forced" log writes.** Defined where the term appears: forced means flushed to disk, as with fsync, before the node sends its next message, so the record survives a crash. It is the same thing as the "writes to its log on disk" mentioned earlier, not a separate idea.
4. **aa2, uniform random edge.** Added a parenthetical. The row totals sum to 2|E|, so an edge of multiplicity m between u and v is picked with probability (d_u/2|E|)(m/d_u) + (d_v/2|E|)(m/d_v) = m/|E|.
5. **aa2, 3.39n.** This is now marked as a stated result with its source: the constant is (2 + 2 ln 2)n ≈ 3.39n, found by Knuth (1971) by solving the exact recurrence, which the course doesn't do. I checked numerically that 2 + 2 ln 2 = 3.386.
6. **aa4, paragraph order.** The rounding rule now leads straight into the two bullets ("The rounded set has two properties:"), followed by the 2-approximation and integrality-gap paragraphs. The dual paragraph, now headed "The dual of this LP." and noting that the practice problems use it, comes after them, so "It" in the bullets can only mean the rounded cover.
7. **simplex_solver hint.** The hint now connects the tableau to the notes' dictionary. The dictionary row s₁ = 24 − 6x − 4y becomes 6x + 4y + s₁ = 24, the row [6, 4, 1, 0 | 24]. Moving terms across flips their signs, so a row limits the entering variable when its tableau entry is positive (a negative dictionary coefficient), and the limit is right-hand side / entry. The objective row keeps the dictionary's signs: it holds the coefficients of z ("reduced costs"). The pivot is the notes' substitution step. I edited the hint in the spec and regenerated the problem file: 0 problems, and every test prints ok in Pyodide.
8. **aa5, KMV variance.** Added the missing steps: E[1/v²] = c (k − 3)!(D − k)!/(D − 2)! = D(D − 1)/((k − 1)(k − 2)), so E[D̂²] = (k − 1)D(D − 1)/(k − 2), and subtracting D² gives D(D − k + 1)/(k − 2). I checked these identities in exact arithmetic for several (D, k).
9. **aa5, Bloom optimum.** Added why q = 1/2 is the maximum and the only critical point. Over the common denominator q(1 − q), the derivative's numerator is h(q) = (1 − q)ln(1 − q) − q ln q. It tends to 0 as q → 0, is 0 at q = 1/2, and h″ = (2q − 1)/(q(1 − q)) < 0 between those points, so h > 0 on (0, 1/2). Since h(1 − q) = −h(q), h < 0 above 1/2, so the product rises up to q = 1/2 and then falls. I checked the signs of h numerically.
10. **Φ and φ across courses (remark).** No change. Both courses already flag the clash where it matters: di8 next to its formula, aa1 where the potential is introduced. Renaming one course's symbol would break the standard notation that students will meet in the literature (the phi-accrual detector, normal-CDF Φ, potential Φ). Within each lesson the meaning is fixed.

---

# Student review: Year 4 Fall

*Round 5, part B (CS 490, CS 470). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a fourth-year CS student. Before this term I completed CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240, PHYS 250, CS 310, CS 320, CS 340, CS 350, CS 330, CS 360, CS 365, CS 370 and CS 380. This term I'm taking CS 490 Capstone Project I and CS 470 Deep Learning. I read both courses in order and worked each quiz and practice problem in my head, checking the arithmetic as I went. Most worked examples matched what I got. The items below are the places where I got stuck or found the text unclear or inconsistent.

### CS 490 Capstone Project I

#### pj2: Discovering requirements

1. In the traceability programming problem: "A test cites every REQ-n in its docstring (use the regular expression \bREQ-(\d+)\b)". The regex captures digits, but nothing says how a captured number becomes an id. I can't tell whether a docstring that says "REQ-03" cites requirement "REQ-3" or an unknown id "REQ-03". That changes whether the citation goes in "matrix" or in "unknown".

#### pj3: Planning and estimating

2. "The two forecasts disagree because on day 5 the client added a story worth 8 points." The data on the chart goes from 31 on day 4 to 36 on day 5, a jump of 5. I could only get 8 by assuming the team also burned about 3 points that day, and the text never says that. At first the 8 looked like it contradicted the numbers.

#### pj5: Working as a team

3. In the bus-factor method: "Repeatedly remove the person who knows the most files". The CODE hint uses `files_known(a)` without defining it. It doesn't say whether this counts every file the person knows, or only files that still have someone left who knows them. In P2 the answer is the same either way, but for the bus_factor programming problem the two readings can remove people in a different order, so I don't know which one to implement.

### CS 470 Deep Learning

#### dl4: Convolutional networks

4. The sidebar says "achieved a top-5 error of 15.3%, against 26.2% for the second-best entry". "Top-5 error" isn't defined anywhere in this course, and I don't remember it from CS 370. Because of that I can't tell what the two numbers mean.

#### dl5: Sequence models: recurrence and attention

5. P3: "Compute by hand the attention weights for the third token in the notes' example without the causal mask". The notes say "number the tokens from 0", so the third token is token 2, the last one. The causal mask hides nothing from the last token, so its weights without the mask are the ones already printed (0.248, 0.248, 0.503). That makes the first half of the problem a copy of the notes. I wasn't sure whether "third token" was supposed to mean a different token, or whether the problem was meant to be that trivial.

### Across courses

6. CS 490 Lesson 4's architecture table says partial failure, retries and consistency are covered by "CS 410 Distributed Systems, which you take alongside this course this term". My courses this term are CS 490 and CS 470, and CS 410 isn't one of them. Either the sentence is wrong or I'm missing a course, and as written I'm left thinking I'm supposed to be getting that material somewhere else.

## Professor's response (part B: CS 490, CS 470)

1. **pj2 traceability, "REQ-03".** The prompt now states the rule the reference solution uses: the cited id is "REQ-" followed by the digits exactly as written, so `REQ-03` cites "REQ-03", not "REQ-3", and is unknown unless `requirements` has that key. A new visible test pins it: `trace({'REQ-3': 'must'}, <test citing REQ-03>)` gives `unknown == [('test_a', 'REQ-03')]` and `untested == ['REQ-3']`. (Spec and data/cs490-code.js regenerated.)

2. **pj3 burndown, "worth 8 points".** Added the missing step: the team also finished 3 points on day 5, so the line rose by only 5 (31 + 8 − 3 = 36).

3. **pj5 bus factor, `files_known`.** The notes and the problem now say that who knows each file is worked out once, from the whole log, and removing someone doesn't change it; the prompt says "the remaining author who appears in the most files' knower lists", and the hint defines `files_known(a)` as the number of files whose knower list (computed once, before the loop) contains `a`. (For a person still remaining, "files they know" and "files they know that still have a knower" are the same count, since they themselves are a knower; the real alternative is recomputing shares after a removal.) A new visible test separates the two: `bus_factor(['0|C|d', '1|A|d', '2|C|d,b', '3|A|a,d', '4|B|d,b'])` is `(2, ['A', 'C'])` with fixed knowers, but would be `(3, ['A', 'B', 'C'])` if shares were recomputed (Ben becomes a knower of d.py once Ana is gone). Both results checked by running both versions.

4. **dl4 sidebar, "top-5 error".** Defined in place: the fraction of test photos whose correct category was not among the network's five highest-scoring guesses.

5. **dl5 P3.** The problem now uses token 1, which the causal mask does affect. Query (0, 1), scores (0, 0.707, 0.707). Causal: (0.33, 0.67, 0) as in the notes; unmasked: 1/(1 + 2 × 2.028) ≈ 0.198 and 2.028/5.056 ≈ 0.401 each, so the future token takes 0.401 of the weight; blocking only token 0: (0, 0.5, 0.5). The answer keeps a one-line remark that for the last token the unmasked row equals the causal one. Numbers verified by running the answer's code block (`[0.198, 0.401, 0.401]`, `[0.0, 0.5, 0.5]`); the lesson-code checker reports no mismatches.

6. **CS 410 alongside.** CS 410 is a real required Year 4 Fall course; the student was given only two courses for the review. The sentence now reads "CS 410 Distributed Systems, a required Year 4 Fall course taken alongside this one (it may not be in your schedule yet), covers them in depth", which says plainly that it is a separate required course rather than material the student is missing.
