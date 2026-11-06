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
