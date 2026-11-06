# Student review: Year 1 Spring

*Round 2. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a first-year student. Last term I took CS 101 (Python up to classes in outline, lists, dicts, files, recursion, testing with assert, basic big-O), MATH 120 (sets, logic, proof techniques including induction, relations, basic counting), MATH 130 (limits, derivatives, basic integrals and the Fundamental Theorem of Calculus) and CS 100. I read the four course dumps in order (cs102, math121, math131, phys150), tried every quiz question and practice problem in my head, and noted below every place I got stuck or confused. Some things in the dumps were plainly formatting artifacts: superscripts written flat, like "2n" for 2ⁿ, and tables run together. I've left those out.

### CS 102 Programming II

#### c1: Classes and objects

1. **(blocking)** CODE tally: "len(t) returns the number of different items seen." This lesson never shows how to make `len()` work on my own class. `__len__` doesn't appear until Lesson 2, so I couldn't finish this problem from Lesson 1.

#### c2: Special methods and data abstraction

2. "g = gcd(num, den) … self.num = num // g". The sign invariant only holds if `gcd` never returns a negative number, for example gcd(−3, 6). The lesson never says what `math.gcd` returns for negative inputs, so I couldn't check that `3/−6` really becomes `−1/2`.
3. CODE vector2: "repr(Vector2(1, 2)) is "Vector2(1, 2)"" and "Assigning v.x = 5 raises an error". A frozen dataclass handles the immutability, but its generated repr is `Point(x=3, y=4)` style. The lesson doesn't say whether a `__repr__` I write myself inside a `@dataclass` body is kept or overwritten. So I didn't know whether I could use a dataclass here or had to build immutability by hand with properties.

#### c3: Inheritance, composition and polymorphism

4. CODE employees: "a __repr__ like Employee('Ada', 120000)". The name has quotes around it. Every `__repr__` example so far (`f"Fraction({self.num}, {self.den})"`) only formats numbers, so nothing showed me how to get the quotes. Later, `{value!r}` turns up in Lesson 7's `LinkedList.remove` with no explanation of what `!r` does.
5. CODE employees: the problem doesn't say what `repr` a `Manager` should produce. Should it still say `Employee(...)`, or `Manager(name, salary, bonus)`?
6. "sum(s.area() for s in shapes)" is used here, and Lesson 5 uses "sum(x * x for x in range(10**9))". Lesson 5 says a generator expression is written "with parentheses instead of brackets", but these calls have only the function call's parentheses. Nobody says the extra parentheses can be left out when it's the only argument.

#### c4: Types, interfaces and design

7. The mypy output says "inventory.py:14: error: …", but the file shown has `print(inv.count(42))` on line 13 when I count the lines. One of them seems to be wrong.
8. The table says `Callable` comes "from collections.abc" but doesn't say where `Iterable` is imported from. P1 (`apply_all`) needs `Callable`, and I wasn't sure whether to import both from the same place.
9. CODE inventory: "An enum Category with members FOOD, TOOLS and TOYS." The lesson's enum gives every member a string value. This problem doesn't say what values to use, or whether they matter. It also doesn't say what `remove` should do with a quantity below 1, or with an item that isn't in stock at all.

#### c5: Iterators, generators and functional tools

10. **(blocking)** P4: "storing the count in an attribute calls on the wrapper". CODE closures: "adds an attribute calls to the wrapper". The lesson never shows that you can set an attribute on a function (`wrapper.calls = 0`), or how the wrapper can update its own attribute from inside itself. I didn't know this was legal Python.
11. CODE closures, memoize: "caches a function's results by its arguments". With `*args, **kwargs` the kwargs part is a dict, which can't be a dictionary key. The problem doesn't say whether keyword arguments have to be supported.

#### c6: Test-driven development

12. "@pytest.mark.parametrize(...)", "@functools.wraps(func)" and "@dataclass(frozen=True)" are all decorators written with arguments. Lesson 5 defines a decorator as "a function that takes a function and returns a new function", and `@timed` takes no arguments. Nothing explains what `@something(args)` means, or how it fits that definition.
13. "Checkout(gateway, Mock()).complete(order)  # the $120 order from Lesson 4" and `assert_called_once_with("ada@example.com", 108.0)`. Lesson 4 never built a $120 order or used the email "ada@example.com". I can't tell what `order` is here.
14. P4: "Write a test using tmp_path for a function save_scores(path, scores) … and a function load_scores(path)". Am I meant to write `save_scores` and `load_scores` as well, or only the test?

#### c7: Stacks, queues and linked lists

15. "the average for n appends is about n/200 copies per append." The step is skipped. I had to work out myself that the copies total 100 + 200 + … + n ≈ n²/200, and then divide by n.

#### c8: Trees and recursive data structures

16. **(blocking)** CODE tree_funcs, level_order(t): the only guidance is "A level-order traversal, row by row, uses a queue instead of recursion." There's no algorithm or code, and Lesson 7 says breadth-first search is something "you'll meet in Data Structures and Algorithms". I had to invent the method from scratch.

#### oophist: The rise of object-oriented programming

17. "virtual methods, which are the mechanism behind polymorphism". "Virtual method" is never defined in this course.

### MATH 121 Discrete Mathematics II

#### d1: Counting

18. P4: "What if every xi must be at least 1?" Stars and bars is only shown for non-negative solutions. The trick of giving each variable 1 first, then distributing the rest, isn't shown.
19. P6: "Write a Python function that counts the strings in a list of all length-6 passwords … but for length 3". I couldn't work out on first reading whether the list holds length-6 or length-3 passwords. Also, `product` is imported in the lesson's example but never used, and the `repeat=` argument you'd need to generate the strings isn't shown.

#### d3: Recurrences

20. "So T(n) is still Θ(n log n)." Θ is never defined. CS 101 only taught big-O.

#### d5: Fermat, Euler and RSA

21. "(p − 1)! is coprime to p, so cancel it". The reason isn't given (every factor is smaller than the prime p). This is the step the whole proof turns on.

#### d6: Discrete probability

22. "with m possible values, expect a collision after about √(πm/2) random items". This formula appears with no derivation and no pointer to where it comes from.

#### d7: Random variables and expectation

23. P2: "An ascent is a position i with π(i) < π(i + 1)." Lesson 1 defines a permutation as an ordering. Writing a permutation as a function π, with π(i) meaning the item in position i, isn't introduced. Also, π has meant 3.14159… everywhere else.

### MATH 131 Calculus II and Multivariable Calculus

#### k1: Techniques of integration

24. **(blocking)** P5, and the bullet "SymPy: sympy.integrate(x*sympy.exp(x), x)". The lesson never shows how to install or import SymPy, or that `x` must first be made a SymPy symbol. Typing the line as shown fails because `x` is undefined.
25. P5: "ask it for ∫ e−x² dx. What does it return for the second, and why?" SymPy answers with `erf`, which has never been mentioned. I couldn't explain an answer written in terms of a function I don't know.
26. P2: "Check numerically." Numerical integration isn't taught until Lesson 3, and this is Lesson 1.
27. "Stirling's approximation, converted to base 2, gives log₂(n!) ≈ n log₂ n − 1.44n. For n = 1000 that's about 8,530." The base-2 conversion (dividing by ln 2) is skipped. Also, the formula as written gives 9,966 − 1,443 ≈ 8,523, not 8,530.

#### k2: Applications of integration

28. "The average of sin x over [0, π] is (1/π) · 2 ≈ 0.64. An AC power supply rated by its average uses exactly this." AC alternates, so its average over a full cycle would be 0. I don't see how a supply is "rated by its average" or why the half-cycle [0, π] is the right interval.

#### k5: Power series and Taylor polynomials

29. "1/(1 − x) = 1 + x + x² + … Integrating it term by term gives ln: ln(1 + x) = x − x²/2 + x³/3 − …". Integrating 1/(1 − x) gives −ln(1 − x), not ln(1 + x). The step of replacing x with −x is missing.

#### k7: Functions of several variables and the gradient

30. "dot = sum(x * y for x, y in zip(a, b)) and length = math.sqrt(dot(v, v))". The first line makes `dot` a number. The second calls `dot` as a function. As written, the code doesn't work together.

#### k8: Optimization, gradient descent and double integrals

31. "The two-variable version of the degree-2 Taylor polynomial (Lesson 5) says … ½(A p² + 2B pq + C q²)". Lesson 5 only covered one variable, so this formula is new and stated without derivation, even though the second-derivative test rests on it.
32. **(blocking)** P6 and the text "Monte Carlo integration: average f at random points." Averaging f gives the average value, not the integral. Nobody says to multiply by the region's area (36 here). Following the lesson literally gives about 0.087, not something close to π.

### PHYS 150 Physics I: Mechanics with Computation

#### p1: Motion in one dimension

33. "v(t) = v₀ + ∫0t a dt′". The primed variable t′ is never explained, and I didn't know why it isn't just dt.

#### p2: Vectors and motion in two dimensions

34. "R = v₀ cos θ · T = v₀² sin 2θ/g". Getting from 2 sin θ cos θ to sin 2θ needs the double-angle identity, which isn't mentioned.

#### p3: Newton's laws and forces

35. "This separates … and partial fractions do the integral … Starting from rest, the result is v(t) = vt tanh(gt/vt)". The partial-fraction integral gives a logarithm. How that turns into tanh is skipped. "(tanh z)′ = 1 − tanh² z" is also stated without derivation.
36. The `step` code uses `math.hypot(vx, vy)`, which is never explained (I assume it is √(vx² + vy²)).

#### p6: Oscillations

37. "A pendulum of length L swinging through angle θ has restoring acceleration −(g/L) sin θ." The formula isn't derived. It isn't clear why it's divided by L, or that this is an angular acceleration in rad/s², not m/s². P4 depends on it.

#### chaos: Chaos: the limits of prediction

38. "the equations of motion are longer; your textbook or the lab handout gives them". No textbook or lab handout is mentioned anywhere else in the course.

### Across courses

39. Physics uses maths before the maths course teaches it, if the courses run side by side:
    - PHYS 150 Lesson 1 builds its first simulation on "Euler's method from MATH 131, Lesson 6".
    - Lesson 3 uses separation of variables (MATH 131 Lesson 6).
    - Lesson 4 uses the dot product "from MATH 131, Lesson 7".
    - Lesson 6 uses the Taylor approximation from MATH 131 Lesson 5.

    In my first physics week I'd be told to use a method my maths course reaches near the end of term.
40. The two maths courses each point to the other for the harmonic number Hₙ:
    - MATH 121 Lesson 7 says Hₙ ≈ ln n + 0.577, "MATH 131, Lesson 4 explains why".
    - MATH 131 Lesson 4 says "You met Hn in the coupon collector problem".

    Each assumes the other came first.
41. Some MATH 131 lessons need MATH 121 material that may not have been reached:
    - Lesson 2, P4 (the memoryless property) needs conditional probability from MATH 121 Lesson 6.
    - Lesson 8's Monte Carlo argument needs variance from MATH 121 Lesson 7.

    MATH 121 Lesson 2 also cites memoization from CS 102 Lesson 5. If the courses run in parallel, none of these would have been covered yet.
42. The symbol φ means three different things this term:
    - the golden ratio (MATH 121 Lesson 3);
    - Euler's totient φ(n) (MATH 121 Lesson 5, in the very next RSA lesson);
    - the phase of an oscillation (PHYS 150 Lesson 6).

    The φ(n) after φ ≈ 1.618 in particular made me stop and check which one was meant.


## Professor's response

Thank you for another careful review. Every item below led to a change. Several were real errors, now fixed: the dangling "$120 order from Lesson 4" (13), the Stirling arithmetic (27), the AC "rated by its average" claim (28), the missing x → −x step for ln(1 + x) (29), `dot` defined as a number and then called (30), Monte Carlo without multiplying by the area (32), and the nonexistent textbook and lab handout (38). Two items rested on the plain-text extraction (7, and partly 39), and I say so below, but I still made the text harder to misread. Every number, formula and code output I added or changed was checked by running Python (SymPy 1.x for the integrals, mypy for item 7). Programming problems whose prompts changed still pass with their solutions and fail with their starters; where a prompt now states a behavior, a test checks it.

### CS 102 Programming II

1. c1: New subsection "A first special method: making len() work" with a `Playlist` example (`__len__`, and that `len(p)` calls it), linking forward to Lesson 2. The `tally` prompt now points to it (blocking item).
2. c2: Added that `math.gcd` never returns a negative number (`gcd(-3, 6)` is 3), and traced `Fraction(3, -6)` to −1/2 step by step, plus the zero case.
3. c2, Dataclasses: Added that `@dataclass` only generates methods the class doesn't define, with a `Point` whose own `__repr__` is kept. The `vector2` prompt now says either a frozen dataclass or properties is fine.
4. c2: New paragraph on `!r` in f-strings (`f"{name!r}"` gives `'Ada'`) with a `Person` repr example. The `employees` prompt now mentions `!r` and Lesson 2.
5. `employees`: The prompt now specifies `Manager('Grace', 120000, 24000)`; the solution gives `Manager` its own `__repr__`, and a new test checks it.
6. c3: Explained `sum(s.area() for s in shapes)` where it first appears (a generator expression, linked to Lesson 5). c5 now states the rule: a generator expression that is a call's only argument can use the call's parentheses; with a second argument it needs its own.
7. c4: The line number was right. mypy really reports line 14 (I ran it). The file has two blank lines after the class, as PEP 8 recommends, and the plain-text extraction collapses them into one, so you counted 13. To make it unmistakable, the last line now carries the comment `# line 14`, and a sentence explains what the number means and why there are two blank lines.
8. c4: Below the type-hint table: built-in names need no import, and `Callable` and `Iterable` both come from `collections.abc` (older code uses `typing`).
9. `inventory`: The prompt now says the enum values don't matter and aren't tested, and that `remove` with a quantity below 1, or of an item not in stock, raises `ValueError` and leaves the stock unchanged. Added two tests for exactly those cases.
10. c5: New subsection "Functions can carry attributes" with a `logged` decorator that keeps `wrapper.history`. It explains how the wrapper finds itself by name and why changing an attribute needs no `nonlocal`. P4's answer and the `closures` prompt point to it (blocking item).
11. `closures`: The prompt now says only positional arguments need to be supported, every argument is hashable (so the args tuple is the key), and `__name__` must be kept, which is everything the tests check.
12. c5: New subsection "Decorators with arguments": Python evaluates the expression after `@` first, so `@functools.wraps(func)` means `wrapper = functools.wraps(func)(wrapper)`, and `@dataclass(frozen=True)` likewise. c6 relates `@pytest.mark.parametrize(...)` to this.
13. c6: **Error fixed.** The Mock example now builds its order on the spot (`Order([LineItem("desk", 120.0, 1)], "ada@example.com")`), names and links Lesson 4's worked-example classes, and explains the 108.0 (10% off 120) and what `assert_called_once_with` checks. Run against those classes, it passes.
14. c6, P4: The question now says to write both functions and the tests; the answer gives `scores.py` and `test_scores.py` (checked).
15. c7: Spelled out the sum: copies of 100, 200, …, n total 100 × (1 + … + n/100) ≈ n²/200, which is n/200 per append (checked by computing it).
16. c8: New subsection "Level order: row by row, with a queue": the two-step algorithm, why a queue gives row order, a full trace table for the figure's tree (verified), deque's `append`/`popleft`, and O(n) cost. c7's breadth-first-search sentence now links to it. The `tree_funcs` prompt points to it and states the empty-tree result (blocking item).
17. oophist: Defined a virtual method (the version run is chosen by the object's actual class at run time), related it to `s.area()` in Lesson 3, and explained that every Python method is virtual while Simula and C++ needed the keyword.

### MATH 121 Discrete Mathematics II

18. d1: New paragraph "When every kind must appear at least once": hand one to each kind first, with the 10-donut example (36, checked by brute force) and the substitution yᵢ = xᵢ − 1.
19. d1: The lesson's Python block now uses `product(..., repeat=r)` with outputs, and explains it as the nʳ case. P6 is reworded: the formula is for length 6, and you check the same formula on length-3 passwords because listing 36⁶ ≈ 2.2 billion would be slow.
20. d3: Completed the sandwich with a lower bound, then defined Big-Theta formally and contrasted it with CS 101's big-O (an upper bound only), with constants c₁ = 1/4 and c₂ = 3 for n ≥ 4 (checked against the exact recurrence for n up to 5000). Added Θ to the terms.
21. d5: Rewrote the cancelling step. Each factor k of (p − 1)! lies between 1 and p − 1, so gcd(k, p) = 1 because p is prime, so each k has an inverse; cancel them one at a time. Added that this is exactly where primality is needed (2 and 3 have no inverse mod 6), and spelled out what the multiplied-together line says.
22. d6: Added where the square root comes from: the product of (1 − i/m), the approximation 1 − x ≈ e⁻ˣ, and the k ≈ 1.18√m half-chance point (22.5 for 365). Said that the average √(πm/2) needs an integral and isn't required. All values checked.
23. d7, P2: Rewritten without π: shuffle 1, …, n into s₁, …, sₙ, with an example (2, 5, 1, 3, 4 has ascents at 1, 3, 4) and a note that books write π(i) for sᵢ. The answer now uses indicators and linearity explicitly, with a check for n = 3 (verified by listing all permutations for n = 3, 4, 5).

### MATH 131 Calculus II and Multivariable Calculus

24. k1: New section "Checking with a computer": installing SymPy, `import sympy as sp`, `x = sp.symbols("x")` and why it's needed, SymPy's own `exp`/`sin`, and a definite integral (outputs from SymPy). The "Still stuck?" bullet points to it (blocking item).
25. k1, P5: The question now defines erf by its integral and asks why SymPy must use such a function. The answer explains "no elementary antiderivative" and checks SymPy's answer by differentiating.
26. k1: The same section gives a `midpoint(f, a, b, n)` function based on MATH 130's Riemann sums, with a checked output, and P2 now says to use it. Lesson 3 is still linked for accuracy and better methods.
27. k1: **Error fixed.** Showed the base change (divide by ln 2, so 1/ln 2 ≈ 1.443). The formula gives 9,966 − 1,443 ≈ 8,523, as you found. The text now says so and gives the exact log₂(1000!) ≈ 8,529 for comparison.
28. k2: **Error fixed.** You were right: over a full cycle the average is 0. The text now says that, explains that the half-cycle value 2/π of the peak is the DC level a rectifier (phone charger) produces, and that AC supplies are rated by the root-mean-square value 1/√2 of the peak ("230 V" peaks near 325 V). All values computed.
29. k5: **Error fixed.** Added both steps: replace x by −x to get 1/(1 + x) = 1 − x + x² − …, then integrate from 0 to x. Also noted that integrating 1/(1 − x) directly gives −ln(1 − x) (checked numerically).
30. k7: **Error fixed.** `dot` and `length` are now proper functions in a code block, with outputs 11 and 5.0 (run).
31. k8: Derived the quadratic form by restricting f to the line g(t) = f(a + tp, b + tq), using the one-variable Taylor polynomial and the directional derivative from Lesson 7 twice. A closing sentence says the formula is what matters if the derivation feels quick.
32. k8: **Error fixed.** Monte Carlo is now stated correctly: the average estimates the average value, so multiply by the region's area, with a display formula and the rectangle example (2 × 3/2 = 3). P6 states the area 36. The answer already multiplied by 36 (blocking item; checked: about 3.14).

### PHYS 150 Physics I

33. p1: Explained that t′ is just a name for the integration variable, because t is already the upper limit, that any letter works, and that the formula is the Fundamental Theorem.
34. p2: Wrote out the range algebra with the double-angle identity sin 2θ = 2 sin θ cos θ.
35. p3: Added a four-step derivation: substitute u = v/vₜ, use partial fractions, integrate to a logarithm, and solve for u to reach tanh. Derived (tanh z)′ = 1 − tanh² z with the quotient rule, and tied atanh to step 2. Checked numerically. The text says you only need the result.
36. p3: Commented `math.hypot(vx, vy)` as √(vx² + vy²), the length of the velocity.
37. p6: Derived θ″ = −(g/L) sin θ from the arc length s = Lθ and the component of gravity along the arc. Said it is an angular acceleration in rad/s² (multiply by L for m/s²), and showed how small angles give SHM with ω² = g/L. P4 is now doable from the lesson.
38. chaos: **Error fixed.** Removed the reference to the textbook and lab handout. The lesson now gives the double-pendulum accelerations as a Python function to take on trust (derived in a later course), with stepping advice and an energy check. I verified the equations: a fourth-order Runge–Kutta run conserves energy to 10⁻⁸, and the lesson's figures (energy within a few percent with semi-implicit steps, divergence of runs 10⁻⁹ apart) are from running it.

### Across courses

39. You're right that the courses run side by side; PHYS 150 does say Euler's method "from MATH 131", for example. As asked, I kept the course order and made each early use self-contained, with a link to the full treatment. PHYS p1 explains Euler's method from "change ≈ rate × Δt" and says MATH 131 Lesson 6 isn't needed first. PHYS p3 now walks through the separation itself (item 35). PHYS p4 defines the dot product in both forms and takes their agreement on trust. PHYS p6 shows sin θ ≈ θ with a calculator value before mentioning the Taylor series.
40. The two references now agree on one story. MATH 131 k4 defines Hₙ itself, calls the values harmonic numbers, and says MATH 121 Lesson 7 uses them and quotes the approximation that k4 justifies, "whichever lesson you reach first". MATH 121 d7 already defines Hₙ, takes ln n + 0.577 on trust and points to MATH 131 for why.
41. MATH 131 k2 P4 now defines conditional probability, P(A | B) = P(A and B)/P(B), in the question, and the answer shows the "both happen" step. MATH 131 k8 defines variance and standard deviation in a sentence where Monte Carlo needs them. MATH 121 d2 explains memoization in place and says CS 102's `@functools.cache` isn't needed. Each still links to the full treatment.
42. MATH 121 d3 says φ is the golden ratio throughout that lesson. MATH 121 d5 says the totient is a different use of the letter, always written with an argument φ(n), and gives φ(10) = 4. PHYS 150 p6 says φ there is the phase, unrelated to either.
