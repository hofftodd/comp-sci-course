# Student review: Year 1 Spring

*Round 3. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited. Note added afterwards: items 1, 15 and the bold-vector part of 26 came from limits of `scripts/dump_course.js` at the time (it collapsed the two blank lines in code, omitted key-term lists, and dropped bold), not from the pages students see. The script was fixed after this review.*

I'm a first-year student starting the spring term. Last term I took CS 101 Programming I (Python), MATH 120 Discrete Mathematics I, MATH 130 Calculus I and CS 100 Computing in Society. I can write Python functions, loops, lists, dictionaries, files and simple recursion. I know basic proofs, sets and induction, and single-variable differentiation and integration. I read the dumped text of CS 102, MATH 121, MATH 131 and PHYS 150 in lesson order and tried every quiz and practice problem in my head. A few numbers I checked with Python as a calculator.

### CS 102 Programming II

#### c4: Types, interfaces and design

1. "The file has two blank lines after the class, as Python's style guide recommends, so the last line is line 14." The listing I see has only one blank line between `return self.items.get(name, 0)` and `inv = Inventory()`. Counting that listing, `print(inv.count(42))` is on line 13, not 14, so the mypy output and the explanation don't match the code shown.
2. "Type hints became part of Python in 2015 (PEP 484)". The lesson doesn't explain what a PEP is.

#### c5: Iterators, generators and functional tools

3. "list(map(lambda x: x * 2, [1, 2, 3]))" and "list(filter(lambda x: x % 2 == 0, range(7)))". The lesson never says what map and filter do. It only says they are "lazy, like generators", so I had to guess their behavior from the two outputs. I needed it for P3, which asks me to rewrite a map/filter expression.
4. "from itertools import islice ... list(islice(fibonacci(), 10))". The lesson doesn't say what islice's arguments mean. I only guessed from the output that the second argument is "how many". P1 asks me to use it.

#### c7: Stacks, queues and linked lists

5. "That geometric series adds up to about n/(1 − 1/1.125) = 9n." If I apply the same formula to doubling (copy sizes n, n/2, …), I get n/(1 − 1/2) = 2n. But the paragraph before says doubling gives "less than one copy per append" (15 copies for 16 appends). I can't tell why the largest copy is about n in one case and about n/2 in the other. That makes the "about 9 per append, simulation gives 8.4" comparison hard to follow. MATH 131 Lesson 4 also says doubling copies "1 + 2 + 4 + … + n < 2n" (its Q5 answer is "2n"), which doesn't match "less than n".

#### oss: Open source: licenses, communities and responsibility

6. "a missing bounds check on a length field", "private keys", "remote access to many servers through SSH", "SSH logins were taking about half a second longer". Bounds check, private key, backdoor and SSH aren't explained anywhere I've studied. I could answer Q3 only by matching words.

### MATH 121 Discrete Mathematics II

#### d2: Binomial coefficients, pigeonholes and inclusion–exclusion

7. "(CS 102, Lesson 5 shows how to add memoization to any Python function with @functools.cache; you don't need it for this course.)" P6 then says "Write a Python function binom(n, k) using Pascal's identity with @functools.cache". These two statements contradict each other. If I haven't reached CS 102 Lesson 5 yet, I can't do P6 as written.
8. P6: "check it against math.comb". math.comb hasn't been introduced in this course or in CS 101 as far as I know.
9. "There are 2ⁿ files of exactly n bits but only 2ⁿ − 1 files shorter than n bits." The count 2ⁿ − 1 isn't explained. I worked out that it's 1 + 2 + … + 2ⁿ⁻¹ including the empty file, but the step is skipped.

#### d3: Recurrences

10. "So T(n) is still Θ(n log n): for n ≥ 4, say, c₁ = 1/4 and c₂ = 3 work with base-2 logarithms." The lesson doesn't show why these constants work or where n ≥ 4 comes from. I had to work out (n/2)(log₂ n − 1) ≥ ¼ n log₂ n and 2n(log₂ n + 1) ≤ 3n log₂ n myself.

#### d5: Fermat, Euler and RSA

11. `int.from_bytes("Hi".encode("utf-8"), "big")` and `m.to_bytes(2, "big")`. Nothing explains what "big" means. Also, why does to_bytes need the 2?

#### d6: Discrete probability

12. The text says the 2/3 answer relies on four assumptions, "all built into play", including that the host "when both other doors are empty, picks one at random". But play uses `opened = next(d for d in range(3) if d != pick and d != prize)`, which always opens the lowest-numbered empty door, not a random one. The text and the code disagree.

#### d7: Random variables and expectation

13. "That's why performance engineers report percentiles (the 99th-percentile latency)". Percentile isn't defined. Q5 also mentions "medians", which isn't defined in this course either.

### MATH 131 Calculus II and Multivariable Calculus

#### k1: Techniques of integration

14. "some functions, like e^(−x²), have no antiderivative made of elementary functions at all". The lesson never says which functions count as "elementary".
15. (blocking) P5: "Why does SymPy have to answer with a function defined this way …? (Look back at "Elementary function" in this lesson's terms.)" There is no "terms" section or definition of "elementary function" in the lesson I was given, so I can't do what the hint says.

#### k5: Power series and Taylor polynomials

16. "Then integrate both sides from 0 to x, term by term. … and each tᵏ on the right gives xᵏ⁺¹/(k + 1)". The series was written in x, and then a t appears with no explanation. I had to guess that the variable was renamed because x is now the upper limit. PHYS 150 Lesson 1 explains this naming device; this lesson doesn't.

#### k8: Optimization, gradient descent and double integrals

17. "g′(t) is the rate of change of f as we move by (p, q) per unit of t, which is ∇f · (p, q) = fₓ p + f_(y) q, evaluated at the moving point". Lesson 7 only showed this as an approximation from the tangent plane. Here it's used as an exact derivative, and then "Apply the same rule to each of fₓ and f_(y) to differentiate again" gives g″. I couldn't follow why this chain rule is exact, or how the second step produces fₓₓp² + 2f_(xy)pq + f_(yy)q².
18. P5: "Use gradient descent in Python to fit the least-squares line … Try learning rates 0.01, 0.05 and 0.1." The lesson defines E as a sum of squared errors, but it also says that in machine learning f is "the average error". I don't know which to minimize. The choice matters: with the sum, I think 0.1 diverges for these four points, and with the average it doesn't.

#### autodiff: Automatic differentiation

19. "∂f/∂x = ∂f/∂b · ∂b/∂a · ∂a/∂x + ∂f/∂x(direct) = 1 · cos(a) · y + 1". The same symbol ∂f/∂x appears on both sides with different meanings. "(direct)" isn't explained, so the equation looks circular.

### PHYS 150 Physics I: Mechanics with Computation

#### p3: Newton's laws and forces

20. "The momentum given to the air each second, which by Newton's second law and third law is the force on the object, is about (ρAv) × v". Momentum isn't defined until Lesson 4. The second law here was given as F = ma, not as force equals rate of change of momentum, so I can't follow this step.

#### p4: Energy and momentum

21. "(a, b) · (c, d) = ac + bd". In the same paragraph, d is the displacement vector (W = F · d, "d = (2, 0) m"), so d here means two different things at once.
22. "W = ∫ ma dx = ∫ m(dv/dt) v dt = ∫ mv dv". The switch from dx to v dt, and then from (dv/dt) dt to dv, isn't explained. The proof sketch skips both substitutions.

#### p5: Circular motion, gravitation and orbits

23. "Planets move in ellipses, with the Sun at one focus" and "T² is proportional to a³, where a is the ellipse's semi-major axis". Neither "focus" nor "semi-major axis" is explained in this course or an earlier one, so I can't picture what a is in Kepler's third law.

#### chaos: Chaos: the limits of prediction

24. "Use a small step (dt = 0.0001) and check the total energy, as in Lesson 4: … it stays within a few percent". The lesson gives the accelerations of the double pendulum but no formula for its total energy, and Lesson 4 only covered a single spring. I wouldn't know how to compute what I'm told to check.

### Across courses

25. Lessons use Python tools before CS 102 introduces them. MATH 131 Lesson 1 uses `midpoint(lambda t: t * math.exp(t), 0, 1)` and later lessons use more lambdas. MATH 121 Lesson 6 uses `next(d for d in range(3) if …)`. MATH 121 Lesson 2 P6 needs @functools.cache. CS 102 introduces lambda, next and generator expressions, and @functools.cache in Lesson 5. In week 1 of the term, MATH 131's code uses syntax I haven't been taught.
26. Vectors are said to be "written in bold" (MATH 131, Lesson 7), but in the text I can't tell a bold v from a plain v. In PHYS 150 Lesson 2, "v = (vₓ, v_(y))" and "v = √(vₓ² + v_(y)²)" use the same-looking v for the vector and for its magnitude. In Lesson 5, r means both the position vector r = (x, y) and the distance r. I often couldn't tell which one a formula meant.
27. Item 5 above also spans courses: CS 102 Lesson 7 says doubling makes fewer than n copies in total ("less than one copy per append"). MATH 131 Lesson 4 says the copies total "1 + 2 + 4 + … + n < 2n" and gives "2n" as the quiz answer. I can't tell which total is right.

## Professor's response

Thank you; this round found fewer gaps but some sharp ones. Four were real errors, now fixed: the doubling totals that disagreed between CS 102 and MATH 131 (5, 27), the memoization note that contradicted Practice 6 (7), Monty Hall code that didn't do what the text said (12), and a learning-rate exercise that didn't say which error to minimize (18). Three items (1, 15 and the bold-vector part of 26) came from the old plain-text extraction, which dropped blank lines, key-term lists and bold; I say so below, and still tightened the text where it helped. Every number, formula and code output I added or changed was checked by running Python. No programming problems changed.

### CS 102 Programming II

1. c4: Extraction artifact. The page has two blank lines after the class, and mypy reports line 14 (the line also carries the comment `# line 14`). No change.
2. c4: Defined a PEP (Python Enhancement Proposal, a numbered public document proposing a change to Python) and noted that PEP 8 is the style guide.
3. c5: Said what `map` and `filter` do (apply `f` to each item; keep items where `f(item)` is true), that they return iterators (hence `list(...)`), and what `lambda x: x * 2` means as a `def`.
4. c5: Explained `islice(iterable, n)` (the first `n` items, lazily) and the three-argument form, with `list(islice(fibonacci(), 2, 6))` giving `[1, 2, 3, 5]` (run).
5. c7: **Error fixed.** "Less than one copy per append" was true only when n is a power of 2. The text now gives 17 appends costing 31 copies, then the general argument: the last copy s satisfies n/2 < s ≤ n, the copies sum to 2s − 1, so the total is between about n and 2n (1 to 2 copies per append). The 1.125 case uses the same s: about 9s, so 8n to 9n in total. A simulation of CPython's growth rule gives 8.45 per append at a million appends, and between 8.0 and 9.0 across n near a million (checked). That explains the "9 vs 8.4" puzzle: 9 was the worst case.
6. oss: Glossed private key (with a link to RSA in MATH 121), bounds check (what the length field was and why C doesn't check it while Python raises `IndexError`), backdoor, and SSH.

### MATH 121 Discrete Mathematics II

7. d2: **Error fixed.** The memoization paragraph now says a dictionary is all you need. P6 asks for a dictionary memo, and its answer uses one (run: all n ≤ 30 match `math.comb`, `binom(30, 15)` = 155117520). `@functools.cache` is mentioned as an optional shortcut once you've reached CS 102 Lesson 5.
8. d2, P6: Introduced `math.comb(n, k)` in the question, with `math.comb(5, 2)` = 10. The answer's loop replaces `all(...)` over a generator.
9. d2: Showed where 2ⁿ − 1 comes from: 1 + 2 + … + 2ⁿ⁻¹ over lengths 0 to n − 1, with the n = 2 example.
10. d3: Derived both constants. With L = log₂ n, 2n(L + 1) ≤ 3nL once L ≥ 2, and (n/2)(L − 1) = nL/4 + n(L − 2)/4 ≥ nL/4 once L ≥ 2. Both need n ≥ 4 (checked against the exact recurrence for 4 ≤ n ≤ 5000).
11. d5: Explained `"big"` (most significant byte first, like written digits; `"little"` gives 26952, run), `encode`/`decode`, and why `to_bytes` needs the length 2.
12. d6: **Error fixed.** `play` now builds the list of doors the host may open and uses `random.choice`, so he picks at random when both other doors are empty, as the text says. `next()` and generator expressions are gone; a `win_rate` loop replaces `sum(...)`. Output about 0.667 and 0.333 (run). A sentence glosses `randrange` and `choice`.
13. d7: Defined percentile (with a 99th-percentile latency example) and median (with 3, 7, 100: median 7, mean about 37).

### MATH 131 Calculus II and Multivariable Calculus

14. k1: The opening paragraph now defines elementary functions (polynomials, roots, exponentials, logs, trig and their inverses, combined by arithmetic and composition), with one example.
15. k1, P5: Extraction artifact: the "Elementary function" term is in the lesson's key-terms list on the page. The hint now points to the definition in the lesson text (item 14) as well, so it works either way.
16. k5: Said why t appears: x is now the upper limit, so the integration variable needs another name, and wrote the integrated equation in t.
17. k8: Rewrote both bullets. First derivative: the tangent-plane step over Δt, divided by Δt; its error shrinks faster than Δt, so the limit is exact (the chain rule along a path). Second derivative: f_x and f_y are themselves functions of two variables, so the same rule gives f_xx p + f_xy q and f_yx p + f_yy q. Added a check on x² − y².
18. k8, P5: **Fixed.** The question now says to minimize the lesson's sum E for 2000 steps, then to try 0.1 on the average E/4. The answer (run): 0.01 and 0.05 converge to (1.6, 1.1), and 0.1 diverges on the sum (stable up to about 0.059). On the average, 0.1 and 0.2 converge. The machine-learning paragraph now says that averaging doesn't move the minimum but scales the gradient, so the safe learning rate changes.
19. autodiff: Replaced the circular-looking equation. The text names two paths, through a and b (1 · cos a · y) and directly through `f = b + x` (1), adds them, and checks against differentiating sin(xy) + x.

### PHYS 150 Physics I

20. p3: The drag argument now uses only F = ma. A mass ρAvΔt of air is sped up to about v in time Δt, so the force is about ρAv², and the third law gives the push back. Momentum is no longer needed before Lesson 4.
21. p4: The component formula now reads (u₁, u₂) · (w₁, w₂) = u₁w₁ + u₂w₂, so d means only displacement.
22. p4: The proof sketch now names both substitutions: dx = v dt (time as the variable), then (dv/dt) dt = dv (speed as the variable), with limits v₁ to v₂. It links MATH 131 Lesson 1.
23. p5: Defined ellipse, foci and semi-major axis, noted that a is the average of the closest and farthest distances and that a circle has a = r (matching the circular-orbit T²). Added a figure with the Sun at one focus, the two focal distances, and a labeled a (coordinates computed; rendered and checked).
24. chaos: Added an `energy` function built from Lesson 4's ½mv² + mgh for each bob, with velocities from the chain rule. Running it with the lesson's stepping, the energy (12.23 J) stays within about 3% over 20 s, and the 10⁻⁹-apart runs diverge. The text now gives those verified figures.

### Across courses

25. These were partly taught in CS 101. Lambdas are in Functions and abstraction, and generator expressions appear in Strings. Still, every first use now has a gloss and a link. MATH 131 k1 explains `sum(... for i in range(n))` and `lambda t: ...` under `midpoint` (links to CS 101 and CS 102 Lesson 5). MATH 121 d1 P6's answer glosses the generator expressions and `any`. MATH 121 d6 no longer uses `next()` or generator expressions (item 12). MATH 121 d2 no longer requires `@functools.cache` (item 7). No math lesson uses a decorator now.
26. Bold vectors were dropped by the extraction tool; the pages show them. Still, the notation is now stated outright. MATH 131 k7 says the components and the length |**v**| are scalars. PHYS 150 p2 says a bold letter is a vector and the same plain letter is its magnitude (v = |**v**|, the speed). PHYS 150 p5 says r = |**r**| is the radius and v = |**v**| the speed.
27. See item 5. CS 102 c7 and MATH 131 k4 now tell the same story: the last copy s is at most n, so the total is under 2n (between about n and 2n). MATH 131's "1 + 2 + 4 + … + n < 2n" and its quiz answer 2n stand; k4 now names s and links to c7 for the range.
