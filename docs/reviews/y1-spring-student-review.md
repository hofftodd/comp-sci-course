# Student review: Year 1 Spring

I read these as a first-year student who finished Year 1 Fall (CS 101, MATH 120, MATH 130, CS 100) and nothing else. Each item below is something I didn't understand, something I had to guess at, or a place where the lesson seems to contradict itself. Items marked **(blocking)** stopped me from doing a practice problem or quiz question.

Files: `data/cs102.js`, `data/cs102-code.js`, `data/math121.js`, `data/math131.js`, `data/phys150.js`.

## CS 102 Programming II

### c1 Classes and objects
1. Lesson 1 says properties will "control access more precisely" but doesn't say why the underscore isn't enough. What actually goes wrong if outside code writes `a._balance = -5`?
2. In the `transfer` practice answer, it says "real banking systems use *transactions*". I don't know what a transaction means here.
3. When do I use `BankAccount.accounts_opened += 1` and when `self.accounts_opened += 1`? The lesson uses the first form without saying the second would quietly create an instance attribute.

### c2 Special methods and data abstraction
4. `NotImplemented` (this lesson) and `NotImplementedError` (Lesson 3) look almost the same. Which is which, and why does one get returned and the other raised?
5. I don't really know what a "hash" is. CS 101 used dictionaries, but the lesson assumes I know why equal objects need equal hashes. **(blocking for practice 3)**
6. `Fraction(1, 2) + 1` crashes with the lesson's code. Should it? How would I make it work (`__radd__`, `isinstance` checks)?
7. `@celsius.setter` syntax is shown but not explained. Why is the method name repeated, and where does `celsius.setter` come from?
8. The dataclass section uses type hints (`x: float`) before Lesson 4 teaches them.
9. When should I write `__str__` as well as `__repr__`? The rule "always write `__repr__`" is clear, but the other half isn't.

### c3 Inheritance, composition and polymorphism
10. How does `super()` know which class is the parent? It takes no arguments.
11. The Square/Rectangle example talks about `set_width` and `set_height`, but no code shows them, so I couldn't follow why area comes out as 16. **(blocking)**
12. The abstract method body is just a docstring. Is that valid Python? Is a docstring enough of a body?

### c4 Types, interfaces and design
13. The `Protocol` example ends a method with `...`. What is `...`?
14. The lesson mentions mypy but never says how to run it.
15. SOLID is mentioned but never spelled out.
16. Is `int | None` the same as `Optional[int]`, which I see in older code online?

### c5 Iterators, generators and functional tools
17. `*args` and `**kwargs` get one sentence. I need an example of what `args` and `kwargs` hold when the wrapper is called.
18. What does `functools.wraps` actually fix? What goes wrong without it?
19. The lambda late-binding practice problem (`[lambda: i for i in range(3)]`) lost me. Why does a default argument fix it?
20. `nonlocal` vs `global`: when would I use each?

### c6 Test-driven development
21. Where do I run `pytest`? In the browser there's no terminal. What folder layout makes `from fraction import Fraction` work? **(blocking)**
22. `tmp_path / "scores.txt"` divides a path by a string. What is that?
23. How does pytest know to pass the `account` fixture into a test? It feels like magic.
24. "Mock" is mentioned (`unittest.mock`) but not explained enough to tell when I'd want it instead of a hand-written fake.

### c7 Stacks, queues and linked lists
25. "Amortized O(1)" with growth by "about 1.125 times" confused me. If it only grows by 12.5%, how is the average still O(1)? A small worked example would help.
26. Big-O notation is used everywhere. A one-paragraph recap from CS 101 would help.

### c8 Trees and recursive data structures
27. `_insert` returns `node` and the parent reassigns `node.left = self._insert(...)`. Why reassign if the child usually didn't change? I traced it and still wasn't sure.
28. How do you *delete* from a BST? The lesson stops before that, and it's the natural next question.
29. Why is the height of an empty tree −1? It feels arbitrary.

## MATH 121 Discrete Mathematics II

### d1 Counting
30. Stars and bars: I can follow the donut picture, but not why the general formula is C(n + r − 1, r) and not C(n + r, r).
31. The division rule is said to be "the idea behind the formula", but there's no example where it's used on its own.

### d2 Binomials, pigeonholes, inclusion–exclusion
32. The ceiling notation ⌈N/k⌉ isn't defined.
33. Erdős–Szekeres is stated without any proof idea. Is it on the exam? What are the "clever holes"?
34. Combinatorial proof: how do I come up with the "story" for a new identity? I need a method or a second worked example.

### d3 Recurrences
35. Why do we guess that solutions look like rⁿ? It seems to come from nowhere.
36. For Binet's formula, the constants A and B are skipped ("this yields"). Can you show the two equations?
37. Merge sort's recurrence assumes n is a power of 2. What happens otherwise?
38. "Non-homogeneous" and "particular solution" are mentioned but never shown.

### d4 Number theory
39. The backward substitution for Bézout (21 = 105 − 2·42 = …) is hard to follow. A table layout (the extended Euclidean algorithm by hand) would help. **(blocking for practice 2)**
40. I can't trace the recursive `extended_gcd`. Why is the return value `g, t, s - (a // b) * t`?
41. ≡ notation: can I divide both sides of a congruence by a number?

### d5 Fermat, Euler and RSA
42. In the proof of Fermat's theorem, why are the numbers a, 2a, …, (p−1)a "just 1, 2, …, p−1 in some order"? I get "none is 0" and "no two are equal", but not why that means they're a rearrangement.
43. Why is d the inverse of e mod φ(n) and not mod n?
44. How does a text message become a number m < n?
45. OAEP padding is named without saying what it does.

### d6 Discrete probability
46. The law of total probability appears inside Bayes' rule without its own explanation or picture. A probability tree would help.
47. Monty Hall: does the answer depend on the host *always* opening a door with no prize? The lesson doesn't say.

### d7 Random variables and expectation
48. Why is E[X²] − (E[X])² the same as E[(X − E[X])²]?
49. H_n (harmonic numbers) is used in coupon collector, but it's only defined in MATH 131's series lesson, which I might not have reached yet.
50. "Converges (absolutely)" and the "2n ln n" quicksort claim are stated without explanation.

## MATH 131 Calculus II and Multivariable

### k1 Techniques of integration
51. How do I choose u in integration by parts when it isn't obvious? Is there a rule of thumb, such as LIATE?
52. The circular example ∫ eˣ sin x dx is only summarized. I couldn't redo it. **(blocking)**
53. The link from Stirling's approximation to "sorting needs n log₂ n comparisons" is one sentence. I didn't follow it.

### k2 Applications of integration
54. Only disks are covered. What if the solid has a hole (washers)?
55. In the exponential distribution, the mean 1/λ "by integration by parts" isn't shown.

### k3 Numerical integration and improper integrals
56. **Contradiction:** the text says doubling n divides Simpson's error by about 16, but the table shows the error dropping by about 160 and then about 64. Which is right, and why?
57. What is K in the trapezoid error bound, and how do I find it for a given function?

### k4 Sequences and series
58. The ≪ symbol isn't defined.
59. The integral test says "picture the terms as rectangles", but there's no picture.
60. "Converges absolutely" is used (ratio test) before it's defined (alternating series).

### k5 Power series and Taylor polynomials
61. The sin(0.1) error estimate first says 4 × 10⁻⁶ and then "actually less… 8 × 10⁻⁸". Which bound should I use on an exam, and why can I skip a term?
62. Euler's formula uses i (√−1). We haven't studied complex numbers.

### k6 Differential equations
63. Separation of variables treats dy/dx like a fraction. Why is that allowed?
64. The logistic solution is given, not derived. "Separation and partial fractions" isn't enough for me to reproduce it.
65. Slope fields are described with no picture.

### k7 Functions of several variables and the gradient
66. The directional derivative uses a dot product and "unit vector". Neither has been taught; vectors come in PHYS 150 (an elective) and linear algebra is next year. **(blocking)**
67. How do I draw a contour map by hand? A worked example would help.

### k8 Optimization, gradient descent and double integrals
68. Why does the second-derivative test use D = f_xx f_yy − f_xy²? Where does it come from?
69. The normal equations are given, not derived from setting the partial derivatives to zero.
70. Lagrange multipliers get one paragraph. I can't do a problem from it.
71. Why does Monte Carlo error shrink like 1/√N?

## PHYS 150 Physics I

### p1 Motion in one dimension
72. The difference between explicit and semi-implicit Euler is deferred to Lesson 4. I didn't know which version I was writing in practice 4.

### p2 Vectors and motion in two dimensions
73. The vector addition picture (tip to tail) is described but not drawn.

### p3 Newton's laws and forces
74. Why is drag proportional to v² rather than v? When is it linear?
75. What units does k have, and how would I measure it?
76. The auto-graded terminal-velocity test uses `atanh` for the exact time, but the lesson only says the 1-D equation "can be solved exactly". Show the solution or don't rely on it.

### p4 Energy and momentum
77. Work uses cos θ. Is this the dot product from MATH 131 Lesson 7?
78. The elastic-collision formulas appear from nowhere. Where do they come from?
79. "Symplectic" is explained as "energy stays in a band". Why does updating v first make that happen? Even an intuitive picture would help.

### p5 Circular motion, gravitation and orbits
80. Practice 4 uses angular momentum L = 1.2, but angular momentum is never defined. **(blocking)**
81. Escape velocity is "√2 times circular speed". Why?
82. Why does a = v²/r? The formula is stated without any derivation or picture.

### p6 Oscillations
83. Why does cos solve x″ = −ω²x? A one-line check by differentiating would help.
84. The phase φ isn't explained or shown on a graph.
85. Radians per second (ω) vs hertz (f): when do I use which?

## Across courses
86. MATH 131 Lesson 7 needs vectors and dot products, but PHYS 150 is optional and linear algebra is in Year 2. The math course needs its own short vector primer.
87. References to other courses (for example "CS 102, Lesson 2" in MATH 131's optional lesson, or "MATH 131" in PHYS 150) are plain text. Links to the lesson would help me look things up.
88. Several lessons send me to "a later course" (master theorem, AVL trees, RSA case where m shares a factor with n). A one-line "you don't need this yet" would reduce anxiety.

## Professor's response

Thank you for a careful, honest review. Every item below led to a change in the lesson it names, except where noted. Two items revealed real errors, which are now fixed: Simpson's error table (56) and, found while answering item 6, the claim in CS 102 Lesson 2 that `sum` works on any class with `__add__` (it also needs `__radd__`). Every number, table value and code output that I added or changed was checked by running Python. For advanced topics I chose, item by item, between a short correct explanation and an explicit "you don't need this yet"; the choice is stated in each line. Cross-course references now link to the lesson they mean.

### CS 102 Programming II

1. c1: Added a short demonstration that `a._balance = -5` runs silently and the failure appears later, elsewhere; explained that the underscore is only a label, and that properties make the *public* name check every assignment.
2. c1, `transfer` practice answer: Defined a transaction (a group of changes that all happen or none do, with rollback) and pointed to the Databases course.
3. c1, Class attributes: Explained that assigning through `self` always creates an instance attribute, with a runnable `Counted` example showing the class counter staying at 0.
4. c2: Added a two-bullet comparison: `NotImplemented` is a value you return from operator methods; `NotImplementedError` is an exception you raise. c3 now repeats the distinction where `NotImplementedError` appears.
5. c2: New subsection "What is a hash?": buckets, why lookups are fast, why equal objects must have equal hashes, and why hashed data must not change. Practice 3's answer now shows the mutated point disappearing from the set (blocking item; practice 3 is now doable from the lesson).
6. c2: New subsection "Mixing types" showing the actual `AttributeError`, then an `__add__` with an `isinstance` check plus `__radd__`. **Error fixed:** the lesson said `sum` works if `__add__` does; `sum` starts from 0 and also needs `__radd__` (or a start value), and the text now says so.
7. c2, Properties: Step-by-step explanation of what `@property` returns, where `.setter` comes from, why the name is repeated, and the equivalent `property(get, set)` form.
8. c2, Dataclasses: Explained `x: float` in a sentence (a field named x meant to hold a float, not checked at run time, read by `@dataclass`) and pointed to Lesson 4.
9. c2: Added the rule for `__str__`: write it only when a human-friendly form differs from the repr; otherwise `print` falls back to `__repr__`.
10. c3, `super()` bullet: Explained that Python supplies the current class and `self`, and searches from the next class in the chain; gave the long form `super(SavingsAccount, self)`.
11. c3: Added full `Rectangle` and `Square` code with `set_width` and `set_height`, a `stretch` function, and a line-by-line trace showing why the square gives 16 (blocking item).
12. c3: Confirmed a docstring is a valid body (any statement is), and compared the raising and abstract styles.
13. c4: Explained `...` (the `Ellipsis` value, used as a placeholder body).
14. c4: Added how to install and run mypy, with a complete `inventory.py` and mypy's real output.
15. c4: Spelled out SOLID and mapped each letter to the bullets above it. Also corrected the history: Martin collected the principles around 2000; Michael Feathers coined the acronym later.
16. c4, type-hint table: `int | None` and `Optional[int]` mean the same; the `|` form works from Python 3.10.
17. c5, Decorators: Added a `show(*args, **kwargs)` example with its printed output, and explained unpacking in calls.
18. c5: Explained what `functools.wraps` fixes (`__name__` becomes `'wrapper'` and the docstring is lost without it, which affects `help`, tracebacks and tools).
19. c5: New paragraph "Closures capture variables, not values" with a loop example, and a step-by-step explanation of why the default argument `i=i` fixes it; the practice answer is expanded the same way.
20. c5: Added when to use `nonlocal` (enclosing function) versus `global` (module), and why to avoid `global`.
21. c6: New subsection "Where to run it": pytest runs in a terminal on your computer; folder layout; `python -m pytest`; why the import works and what `ModuleNotFoundError` means. The leap-year practice answer now gives the file names and a `dates.py` to test (blocking item; checked with pytest 9.2: 6 passed).
22. c6, Fixtures: Explained `pathlib.Path` and that `/` is `__truediv__` (Lesson 2) used to join paths.
23. c6, Fixtures: Explained how pytest matches parameter names to registered fixtures and calls them for each test.
24. c6: Added a `unittest.mock.Mock` example on Lesson 4's checkout, guidance on mock versus hand-written fake, and the warning that plain mocks accept misspelled methods (`Mock(spec=...)` prevents it).
25. c7: Worked example of amortized cost: doubling (15 copies for 16 appends), why a 1.125 growth factor still averages a constant (about 8.4 copies per append in a simulation of CPython's growth rule), and why growing by a fixed amount would be O(n).
26. c7: Added a one-paragraph big-O recap at the start, linked to CS 101's efficiency lesson.
27. c8: Explained why `_insert` reassigns (only the return value can attach the new node; other assignments store the same reference) with a five-step trace of inserting 5.
28. c8: I chose a brief, complete treatment: new subsection "Deleting from a BST" with the three cases, an example from the figure for each, and tested code (checked against a set on 2,000 random trees). Added a practice problem on deletion.
29. c8, Vocabulary: Explained that −1 is the value that makes `1 + max(...)` give 0 for a single node, and noted the node-counting convention.

### MATH 121 Discrete Mathematics II

30. d1: Explained that n kinds need n − 1 separators, so the row has n + r − 1 symbols; checked against the donut example.
31. d1: Added a standalone division-rule example (5 people at a round table: 120/5 = 24) and a handshake example.
32. d2: Defined the ceiling (and floor), with examples, Python equivalents, and why the pigeonhole bound uses it.
33. d2: Added the proof idea of Erdős–Szekeres (labels as holes) and stated that it is for interest and not on the exam.
34. d2: Added a three-step method for finding the "story" and a second worked proof, k·C(n, k) = n·C(n − 1, k − 1) (committees with a chair).
35. d3: Explained the r^n guess: first-order recurrences give powers, Hanoi gave powers, and substitution checks the guess.
36. d3: Showed both equations for A and B in Binet's formula and solved them, with a check at n = 2.
37. d3: Added the exact recurrence with ceiling and floor, a sandwich argument that it is still Θ(n log n), and the computed value T(1000) = 9976.
38. d3: Worked Hanoi as a non-homogeneous recurrence: particular solution −1 plus A·2^n, matching the unrolled answer; said which other cases this course covers.
39. d4: New subsection "The extended Euclidean algorithm by hand" with the table method and a checked table for 252 and 105. Practice 1 and practice 2 answers now use the table, so practice 2 is doable from the lesson (blocking item).
40. d4: Derived the return value `g, t, s - (a // b) * t` algebraically and added a table tracing the recursive calls.
41. d4: Added when you can "divide" a congruence (only by a number with an inverse), a counterexample mod 6, and the general rule.
42. d5: Explained the rearrangement step: p − 1 different values landing in p − 1 places must fill each once; showed p = 7, a = 3.
43. d5: New paragraph: d is an exponent, and powers repeat every φ(n), not every n (shown with powers of 3 mod 7).
44. d5: Showed how text becomes a number (UTF-8 bytes read in base 256, with Python code) and explained hybrid encryption.
45. d5: Said what OAEP does (random, reversible padding: different ciphertexts each time, large numbers, tamper detection) and pointed to the Security course.
46. d6: Gave the law of total probability its own explanation and added a probability-tree figure for the disease example.
47. d6: Yes, it depends. Listed the host's assumptions and showed that a host who opens a random door gives 1/2 (checked by simulation, about 0.497).
48. d7: Derived E[(X − μ)²] = E[X²] − μ² by expanding and using linearity.
49. d7: Defined H_n where it is used, gave H_50 ≈ 4.499, and linked to MATH 131 Lesson 4 for why it grows like ln n.
50. d7: The phrase "converges (absolutely)" is in MATH 131's ratio test, not in d7; I addressed it where d7 needs it (expected values of infinitely-valued variables) and added a derivation of the geometric mean 1/p. Expanded the quicksort claim into the indicator argument, the exact sum 2(n + 1)H_n − 4n and its value for n = 1000, and what 1.39 means.

### MATH 131 Calculus II and Multivariable

51. k1: Added the LIATE rule of thumb, why it works, and when to ignore it.
52. k1: Worked ∫ eˣ sin x dx in four numbered steps with the check and two cautions (blocking item).
53. k1: Explained the counting argument: k comparisons distinguish at most 2^k orders, so log₂(n!) comparisons are needed; gave the numbers for n = 1000.
54. k2: Added washers, with a worked example on the pictured region (2π/15) and the common π(f − g)² mistake.
55. k2: Showed the integration by parts for the exponential mean, including the limit at infinity.
56. k3: **Error fixed.** The table is now ∫₀¹ eˣ dx, where the errors fall by 4.0 and 16.0 as the text says. Added a paragraph explaining the π example: its leading Simpson error term is proportional to f‴(1) − f‴(0), which is 0 for that function, so the h⁶ term takes over (ratio 64), and the first ratio (159) comes before the pattern settles. Updated practice 3 to compute both.
57. k3: Defined K precisely, how to find it, and a worked example on the figure's function (K = 2, bound 0.083 versus actual error 0.0033).
58. k4: Defined ≪ in words and as a limit, with an example.
59. k4: Added the rectangle figure for the integral test and a two-bullet explanation of both inequalities, including the bounds on H_N.
60. k4: Defined absolute convergence before the ratio test uses it; added it to the terms.
61. k5: Rewrote the sin(0.1) example: both bounds are correct; the sharper one is allowed because T₃ = T₄ for sin. Stated what earns credit on an exam. The actual error is about 8.3 × 10⁻⁸.
62. k5: I chose "you don't need this yet": marked Euler's formula as a look-ahead, said what i is, and explained the grouping in one sentence.
63. k6: Explained that separation is really the substitution rule from Lesson 1, and noted the constant solutions lost by dividing.
64. k6: Derived the logistic solution in six numbered steps, with the partial fractions and a check at t = 0.
65. k6: Added a slope-field figure for the logistic equation with two solution curves and the equilibria marked.
66. k7: New section "A primer: vectors, unit vectors and the dot product": components, addition, length, unit vectors, both forms of the dot product with a law-of-cosines justification, a figure, and three consequences. The directional-derivative paragraph now explains why u must be a unit vector. Added a practice problem on the primer. The "ant" practice is now doable from the lesson (blocking item).
67. k7: Added a four-step worked example of drawing a contour map by hand, using the figure's function.
68. k8: Explained where D comes from by completing the square in the second-order approximation.
69. k8: Derived the normal equations from ∂E/∂m = 0 and ∂E/∂b = 0, step by step.
70. k8: Expanded Lagrange multipliers to a full section: why the gradients are parallel, a three-step method, two worked examples, and a new practice problem. Said that harder constrained problems come in later optimization courses.
71. k8: Explained 1/√N from the variance of an average (linked to MATH 121 Lesson 7).

### PHYS 150 Physics I

72. p1: Showed explicit and semi-implicit Euler side by side, said which one the course uses, and noted in practice 4's answer that it is semi-implicit.
73. p2: Added a tip-to-tail vector addition figure.
74. p3: Explained why drag goes as v² (momentum given to the air each second) and when it is linear (viscous, small or slow objects).
75. p3: Worked out the units of k (kg/m) and two ways to measure or estimate it, checked against the skydiver's 0.25 kg/m.
76. p3: Gave the exact solution v = v_t tanh(gt/v_t), how to check it, and the time formula with atanh (10.47 s for the skydiver). The auto-graded problem's prompt now refers to this formula.
77. p4: Yes; tied W = Fd cos θ to the dot product with a link to MATH 131 Lesson 7, a component example, and the integral form.
78. p4: Derived the elastic-collision formulas from the two conservation laws.
79. p4: Explained explicit Euler's energy growth factor (1 + Δt² per step, giving the 1.36 in the code), the exactly conserved quantity of semi-implicit Euler, and what "symplectic" (area-preserving) means.
80. p5: New section "Angular momentum": definition, why it is conserved for central forces, its link to Kepler's second law, and the value L = 1.2 in the simulation's units. Practice 4 is now doable from the lesson (blocking item).
81. p5: Added gravitational potential energy −GMm/r and derived escape velocity as √2 times circular speed, with numbers for the ISS altitude and Earth's surface.
82. p5: Derived a = v²/r with a velocity-triangle figure and again with calculus.
83. p6: Added the two-line check by differentiating.
84. p6: Explained the phase, how starting conditions fix it, and added a figure comparing φ = 0 and φ = −π/2.
85. p6: Added a paragraph on ω versus f: what each counts, when to use which, and a worked conversion.

### Across courses

86. Same as item 66: MATH 131 Lesson 7 now has its own self-contained vector primer, so it no longer depends on PHYS 150 or linear algebra.
87. Specific references to other lessons are now links: CS 102 (Lessons 1, 6, 7 and 8, to CS 101), MATH 121 (to CS 102, CS 101, MATH 120, MATH 131), MATH 131 (to CS 101, CS 102, MATH 121, MATH 130, PHYS 150), and PHYS 150 (to MATH 131 and CS 102). Generic mentions such as "in CS 101 you used…" stay as plain text.
88. Added explicit "you don't need this yet" notes for the master theorem (MATH 121 d3), AVL and red–black trees (CS 102 c8), the RSA shared-factor case (MATH 121 d5, with a one-line Python check instead), Euler's formula (MATH 131 k5), the √π integral (MATH 131 k3), Erdős–Szekeres (d2) and the full quicksort calculation (d7).
