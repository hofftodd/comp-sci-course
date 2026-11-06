# Student review: Year 1 Spring

*Round 4. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited. Note added afterwards: items 15, 24 and 25 came from `scripts/dump_course.js`, not from the pages students see. The script wrote superscript letters as ^(r) instead of ʳ, and it ran key terms through its HTML tag stripper, which deleted "< 1 … >" from the two definitions. Both were fixed after this review.*

I'm a first-year student. Last term I took CS 101 Programming I (Python), MATH 120 Discrete Mathematics I, MATH 130 Calculus I and CS 100 Computing in Society. This term I read the full dumps of CS 102, MATH 121, MATH 131 and PHYS 150 in order. I tried each quiz and practice problem in my head, and ran a few lines of Python to check numbers I doubted. None of the items below stopped me from starting a problem, so none are marked blocking. Most are notation or tools used before they were explained, a few claims that look wrong, and some text that came out garbled.

### CS 102 Programming II

#### c1: Classes and objects
1. "p.add("Blue in Green"); p.add("So What")": this is the first time I've seen two statements on one line separated by a semicolon. It isn't explained here or anywhere else (it comes back later as "c(); c()" and "v += a * dt; x += v * dt").

#### c2: Special methods and data abstraction
2. "if not isinstance(other, Fraction):": isinstance is used here with no explanation of what it takes or returns. Lesson 3 only mentions it in passing.
3. "max works if __lt__ does": max looks for the largest item, which I'd expect to need ">", but only __lt__ is defined. I don't see how max manages with just "<".
4. P5: "Then sort a list of cards by rank": sorting by one field needs a key function. The only key I've seen is key=len, and lambda isn't shown until Lesson 5, so I'm not sure how I'm meant to write the key here.

#### c4: Types, interfaces and design
5. "total = sum(p * q for _, p, q in self.items)": what does "_" as a loop variable mean? It's never explained.
6. CODE inventory, hint: "sorted((i for i in self._stock if i.category is cat), key=lambda i: i.name)": the hint uses lambda, which isn't introduced until Lesson 5. It also assumes my attribute is called self._stock.

#### c5: Iterators, generators and functional tools
7. "slow_sum(10_000_000)": underscores inside a number aren't explained. They also appear in "100_000" (MATH 121) and "10_000" (PHYS 150).
8. "fib(100)   # instant; without the cache this would take longer than the age of the universe": this looks wrong. Lesson 5 says naive fib makes exponentially many calls. Counting them for fib(100) gives about 2·F(101) ≈ 1.1 × 10²¹ calls. At even ten million calls a second, that's about 3.6 million years, far less than the 13.8-billion-year age of the universe.
9. Q4: "After add5 = make_adder(5) where make_adder returns a closure ... The inner function captured n from the enclosing call": make_adder is never shown. The answer assumes its parameter is called n, but I only know that name from make_multiplier.

#### c6: Test-driven development
9a. (Folded into item 10.)
10. "Refactor: tidy the function, perhaps using collections.Counter" and "pass in a clock function or a seeded random.Random": Counter, and what "seeded" means for random.Random, are never explained.

#### c7: Stacks, queues and linked lists
11. "return any(v == value for v in self)": the built-in any isn't explained.
12. "It is at most n ... and more than n/2 (otherwise the doubled block would not have filled again)": this contradicts the lesson's own example a few lines earlier. With 16 appends, the last copy is 8, which is exactly n/2, not more than n/2. I also can't follow the reason in brackets. Why does the doubled block need to fill again?
13. "That geometric series adds up to about s/(1 − 1/1.125) = 9s": the formula for the sum of an infinite geometric series is used without explanation. This lesson only points to MATH 131 Lesson 4 for the doubling case, and that may come later in the term.

#### c8: Trees and recursive data structures
14. CODE tree_funcs hint: "pass down the range of values allowed (low, high)": what should low and high be at the root, before any limit exists? The lesson doesn't show a way to say "no bound" (for example infinity or None).

### MATH 121 Discrete Mathematics II

#### d1: Counting
15. "Ordered selections with repetition are just the product rule: n^(r)" (and the table entries "n^(r)"): is n^(r) a special symbol, or just n to the power r? Elsewhere powers are written as superscripts, like 26³, so the bracketed form made me wonder. The same thing happens in d4 with "a^(e) mod n" and "a^(1,000,000)".

#### d2: Binomial coefficients, pigeonholes and inclusion–exclusion
16. "In Python, math.ceil(N / k) or, exactly for integers, -(-N // k)": it isn't explained why -(-N // k) rounds up, or why math.ceil(N / k) might not be exact.
17. "there's an increasing or decreasing subsequence of length 4": "subsequence" is never defined. I can't tell whether the numbers have to be next to each other. (The section is marked not on the exam.)

#### d3: Recurrences
18. "(Check n = 2: φ² − ψ² = (φ − ψ)(φ + ψ) = √5 · 1, so F₂ = 1. ✓)": the step uses φ + ψ = 1, which is never stated. I had to work it out from the definitions.
19. "find any one solution that ignores the initial value ... and add the general solution of the homogeneous part": the lesson doesn't say why adding the two always gives every solution. The method is stated, not justified.

#### d5: Fermat, Euler and RSA
20. P5: "The message is the number 42. Why can an attacker recover it without factoring n?": the lesson only says "small messages can be attacked" and never shows how. I had to guess that 42³ is smaller than n.

#### d7: Random variables and expectation
21. "All the distributions in this course pass that test (the geometric series does, by the ratio test)": the ratio test hasn't been explained in this course. Also, Σ k(1 − p)^(k−1)p isn't the geometric series a + ar + ar² + … from MATH 131, so I'm not sure which series "the geometric series" means here.

### MATH 131 Calculus II and Multivariable Calculus

#### k1: Techniques of integration
22. "sum(f(…) for i in range(n)) is a generator expression (CS 101, Strings) ... lambda t: t * math.exp(t) is a lambda (CS 101, Functions and abstraction)": this contradicts CS 102. CS 102 Lesson 3 says "This form is called a generator expression (Lesson 5)", and CS 102 Lesson 5 introduces lambda as new. I can't tell whether CS 101 taught these or not.

#### k2: Applications of integration
23. "the root-mean-square value √(average of sin² x) = 1/√2": the average of sin² x is never computed. Nothing so far shows how to integrate sin² x, so I can't check the 1/√2.

#### k4: Sequences and series
24. Key terms: "Ratio test: If |aₙ₊₁/aₙ| → L  1 diverges; L = 1 is inconclusive.": the definition is garbled. The part about which values of L converge is missing.

#### k5: Power series and Taylor polynomials
25. Key terms: "Radius of convergence: The R such that a power series converges for |x − a|  R.": also garbled. The comparison sign is missing, and so is the "diverges" half.

#### k8: Optimization, gradient descent and double integrals
26. P6: "Estimate ∬ e^(−(x² + y²)) dA ... Compare with π (the integral over the whole plane)" versus k3's "In fact ∫_(−∞)^(∞) e^(−x²) dx = √π ... Lesson 8's last practice problem checks the value numerically": the problem checks a double integral against π, but k3 promised a check of a single integral against √π. Nothing explains how the double integral relates to the square of the single integral.

### PHYS 150 Physics I: Mechanics with Computation

#### p2: Vectors and motion in two dimensions
27. Figure: "With air resistance the path is lower, lands at about 22 m": the drag constant and mass behind this curve are never given, so I can't reproduce the 22 m with the next lesson's step function.

#### p5: Circular motion, gravitation and orbits
28. "Gravity's acceleration is −GM **r**/|**r**|³ (inverse-square magnitude, pointing toward the center)": the formula has |**r**| cubed, but the text calls it inverse-square. It isn't shown that this is GM/|**r**|² times the unit vector **r**/|**r**|.

### Across courses
29. Where lambda and generator expressions come from is inconsistent. MATH 131 k1 says both were taught in CS 101 ("CS 101, Strings"; "CS 101, Functions and abstraction"). CS 102 introduces generator expressions in Lessons 3 and 5 and lambda in Lesson 5 as new. Meanwhile CS 102 Lesson 4's hint, PHYS 150 p2's hint ("max(range(1, 90), key=...)") and MATH 131 from Lesson 1 onward all expect me to use lambda.
30. Several lessons depend on lessons in other courses that may come later in the term. Each says I can take the result on trust, but I can't check the reasoning when I meet it:
    - CS 102 Lesson 7 depends on MATH 131 Lesson 4 (geometric series).
    - MATH 121 Lesson 7 depends on MATH 131 Lesson 4 (harmonic numbers, absolute convergence, ratio test).
    - PHYS 150 Lesson 3 depends on MATH 131 Lessons 1 and 6 (partial fractions, separation of variables).
    - PHYS 150 Lesson 4 depends on MATH 131 Lesson 7 (dot product).
    - PHYS 150 Lesson 2 says "This is exactly the Vector2 class you built in CS 102, Lesson 2", whether or not I've built it yet.

## Professor's response

Thank you; a careful list, and three of the items caught real errors. The `fib(100)` comment overstated the cost (8), the doubling bound "more than n/2" contradicted the lesson's own 16-append example (12), and a quiz used a `make_adder` the lesson never shows (9). Practice 6 in MATH 131 Lesson 8 also never connected its π to Lesson 3's √π (26). All four are fixed. Items 15, 24 and 25 came from the plain-text extraction tool, since fixed; the pages render those correctly. Every number, formula and code output I added or changed was checked by running Python. Three programming-problem hints changed (CS 102 `inventory` and `tree_funcs`, PHYS 150 `projectile`); no tests or solutions changed, and all solutions still pass while all starters fail.

### CS 102 Programming II

1. c1: Added a sentence after the `Playlist` example: a semicolon puts two statements on one line and means the same as two lines; the course uses it only to keep short examples short.
2. c2: Defined `isinstance(x, C)` where it first appears: `True` if `x` is an instance of `C` or a subclass (link to Lesson 3), with `isinstance(3, int)` as an example.
3. c2: Explained that `max` asks whether each item is `>` the largest so far, and that for a class with no `__gt__` Python answers `a > b` by asking `b < a` (checked by tracing a class with only `__lt__`).
4. c2, P5: Added a hint pointing to CS 101's lists lesson ("Sorting with a key"), which did show `key=lambda s: s[1]`, and giving `key=lambda c: c.rank`.
5. c4: Glossed `for _, p, q in self.items`: each tuple is unpacked into three names, and `_` is an ordinary name that by convention means "unused".
6. c4, `inventory` hint: It no longer assumes an attribute name ("stored in an attribute of your choice"). It now says to collect the matching items into a list and sort with `key=lambda i: i.name`, linking CS 101's "Sorting with a key". Lambda is review from CS 101 (item 22).
7. c5: Glossed digit underscores at `slow_sum(10_000_000)`. The same gloss is at the first use in MATH 121 (d6, `100_000`) and PHYS 150 (p4, `10_000`).
8. c5: **Error fixed.** The comment now gives the result, `354224848179261915075`. A new paragraph derives the call count C(n) = 1 + C(n − 1) + C(n − 2) = 2F(n + 1) − 1 (checked against a counting recursion for small n). For `fib(100)` that is about 1.1 × 10²¹ calls. At roughly 30 million calls a second (measured here: 3.2 × 10⁷), that's about a million years: long, but nothing like the age of the universe.
9. c5, Q4: **Fixed.** The question now uses `double = make_multiplier(2)` from the Closures section, so the captured `n` is the one the lesson shows.
10. c6: Glossed `collections.Counter` as a ready-made dictionary of counts, with `Counter("a b a".split()) == {"a": 2, "b": 1}` being `True` (run). Explained a seed: generators built with `random.Random(42)` produce the same sequence every run, so tests see the same numbers.
11. c7: Explained the built-in `any` (true if at least one item is true, stopping at the first) right after `__contains__`.
12. c7: **Error fixed.** The bound now reads n/2 ≤ s < n, with the reason spelled out. The last copy happened because a block of size s was full and another item arrived, so n > s. No copy came after it, so the block of 2s never overflowed, so n ≤ 2s. The text notes that 16 appends give s = 8 = n/2 and 17 give s = 16. The total 2s − 1 is therefore between n − 1 and 2n. A simulation confirmed n/2 ≤ s < n, total = 2s − 1, and n − 1 ≤ total < 2n for every n from 2 to 3000.
13. c7: The lesson now derives both sums itself instead of relying on MATH 131. For doubling, 2S − S leaves 2s − 1. For 12.5% growth, with q = 8/9, S − qS = s − sq^(k+1), so S = s(1 − q^(k+1))/(1 − q), just under 9s. A link to MATH 131 remains for the general treatment. The CPython simulation still gives 8.45 copies per append at a million, and between 8.1 and 9.0 for n near a million (rerun).
14. c8, `tree_funcs` hint: Says to start with `low = float("-inf")` and `high = float("inf")`, floats that compare smaller and larger than every number, and shows them as default parameters of `is_bst`.

### MATH 121 Discrete Mathematics II

15. d1, d4: Extraction artifact. The pages write n to the power r, a to the power e and a to the power 1,000,000 as ordinary raised superscripts, the same notation as 26³. No change.
16. d2: Explained `-(-N // k)`: `//` rounds down, so negating, rounding down and negating again rounds up; `-(-25 // 12)` is 3. Explained that `math.ceil(N / k)` goes through a float (about 16 significant digits), so `math.ceil((10**17 + 1) / 1)` gives 10¹⁷ (run).
17. d2: Defined subsequence (some of the numbers, in their original order, not necessarily adjacent), with 1, 2, 3 inside 5, 1, 4, 2, 3.
18. d3: The Binet check now states φ + ψ = (1 + √5)/2 + (1 − √5)/2 = 1 before using it.
19. d3: Added the justification after the Hanoi steps. Subtracting the particular solution's equation from any solution's cancels the + 1, so the difference D satisfies the homogeneous recurrence, D(n) = A · 2ⁿ, and every solution has the form p + D.
20. d5, P5: Added a hint: c = 42³ mod n; compute 42³ (74088) and compare with n ≈ 2²⁰⁴⁸; what does "mod n" do to a smaller number?
21. d7: Replaced "(by the ratio test)" with the argument itself. The terms k(1 − p)^(k−1)p have ratio (k + 1)(1 − p)/k → 1 − p < 1, so past some point each term is less than a fixed fraction r < 1 of the one before. The tail is then below a + ar + ar² + …, whose partial sums a(1 − rᵐ)/(1 − r) never exceed a/(1 − r). The text names this argument as the ratio test and links MATH 131 for more.

### MATH 131 Calculus II and Multivariable Calculus

22. k1: No change needed here. MATH 131 is right: CS 101 taught lambda (Functions and abstraction; also as a sort key in the lists lesson) and generator expressions (Strings, the one-line `clean`). CS 102 was the inconsistent one and is fixed: c3 now calls the generator expression something "you met in CS 101, Strings" with a link, and c5 introduces it as "first met in CS 101" and lambda as review ("You met lambda in CS 101, Functions and abstraction...").
23. k2: Added a short argument with no integration. cos x is sin x shifted by π/2, so over a full cycle sin² x and cos² x have the same average; they sum to 1, so each averages 1/2, giving the RMS value 1/√2 (checked numerically: 0.5000).
24. k4: Extraction artifact. The page shows the full definition, "If |aₙ₊₁/aₙ| → L < 1 the series converges; L > 1 diverges; L = 1 is inconclusive." No change.
25. k5: Extraction artifact. The page shows "converges for |x − a| < R and diverges for |x − a| > R." No change.
26. k8, P6: **Fixed.** The question now also asks why this checks Lesson 3's √π. The answer shows that e^(−(x²+y²)) = e^(−x²)e^(−y²), so the iterated integral is I · I = I², where I is the single integral. A double integral of π means the single one is √π. The code now also prints `math.sqrt(est)` beside `math.sqrt(math.pi)`. Over five seeds, estimates are 3.13 to 3.17 (square roots 1.770 to 1.780), and the exact single integral over [−3, 3] is 1.77241, within 0.0001 of √π. Lesson 3 now says the check is done "through its square".

### PHYS 150 Physics I

27. p2: The figure caption and the paragraph after the code now give the drag settings: Lesson 3's `step` with m = 1 kg, k = 0.03 kg/m and Δt = 0.001 s. That lands at 22.2 m with a top height of 7.1 m (run), matching the curve's pixel coordinates (22.2 m, 7.07 m).
28. p5: Showed −GM**r**/|**r**|³ = (GM/|**r**|²) × (−**r**/|**r**|), where the second factor is a unit vector toward the center and the first is the inverse-square magnitude. Also noted that `r3` in the code is |**r**|³.

### Across courses

29. See items 22, 4 and 6. CS 102 now treats lambda and generator expressions as review from CS 101, with links. The PHYS 150 `projectile` hint now explains `max(range(1, 90), key=f)` (it works like `sorted`'s key, CS 101's lists lesson; it returns the angle where `f` is largest) and says to make `f` a lambda calling `range_sim`. MATH 131 k1 already glosses both with CS 101 links.
30. Each dependency now has a self-contained statement where it is used, plus a link:
    - CS 102 c7: derives the finite geometric sums itself (item 13).
    - MATH 121 d7: the convergence argument is spelled out (item 21). For harmonic numbers, H_n adds 1/x at x = 1, …, n, close to the area under 1/x from 1 to n, which is ln n (MATH 130); the 0.577 is the leftover gap (checked: H₅₀ = 4.499 against ln 50 + 0.577 = 4.489).
    - PHYS 150 p3: the derivation already does the separation of variables inline and checks the partial-fraction split by adding over a common denominator; it now links MATH 131 Lesson 1 and says the split can be checked directly.
    - PHYS 150 p4: added a worked check of the two dot-product forms, with **F** = (3, 0) and **d** = (2, 2) both giving 6, plus the link for the general proof.
    - PHYS 150 p2: no longer assumes you've built `Vector2`. It says CS 102 Lesson 2 builds one, and that this course doesn't need it, because it keeps the x and y components in separate variables.
