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
