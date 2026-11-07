# Student review: Year 1 Spring

*Round 5, run after seven long lessons were split in two. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited. Note added afterwards: in item 25, "In the course text italic and plain look the same" is true of the text dump the student read, not of the pages, which show italic. The clash between the two vector conventions is real either way.*

I'm a first-year student. Last term I took CS 101 Programming I (Python), MATH 120 Discrete Mathematics I, MATH 130 Calculus I and CS 100 Computing in Society. I know Python up to lists, dictionaries, files and modules, recursion, simple testing with assert, lambdas, generator expressions and big-O. I know discrete maths up to proofs, induction and relations, and single-variable calculus up to derivatives, integrals, Riemann sums and the Fundamental Theorem of Calculus. I read the four dumped course files (cs102, math121, math131, phys150) in order and tried every quiz and practice problem in my head.

### CS 102 Programming II

#### c4: Types, interfaces and design

1. "Checkout(gateway), where gateway is any object with a method charge(email, amount) that returns True if the payment succeeded and False if it was declined." The worked example in the same lesson also has a class called `Checkout`, but it is built as `Checkout(payments, notifier)`, its method is `complete`, and its `PaymentGateway.charge` is declared as returning `None`. Two different classes share the name `Checkout`, and their `charge` methods behave differently. Lesson 6 then refers to "FakeGateway in Lesson 4's practice", and I couldn't tell which of the two interfaces that fake should match.

#### c5: Iterators, generators and functional tools

2. Q4's options include "5 is a global variable" and "Python re-runs make_adder". The lesson has no `make_adder` and no 5: it uses `make_multiplier` and `double = make_multiplier(2)`. I wondered whether I had missed an example.
3. "start = time.perf_counter()" in the `timed` decorator. `time.perf_counter` is never explained: what it returns, or why subtracting two calls gives seconds.
4. CODE chunks hint: "keep the last n items in a collections.deque(maxlen=n)". `deque` isn't introduced until Lesson 7, and `maxlen` is never explained beyond this hint.

#### c6: Test-driven development

5. P2: "hour = datetime.now().hour". `datetime` isn't imported, and it hasn't been shown in this course. I wasn't sure where `datetime.now()` comes from or what `.hour` holds.

### MATH 121 Discrete Mathematics II

#### d1: Counting: rules, permutations and combinations

6. Sidebar: "A route through 20 cities can be ordered in 20!/2 ≈ 1.2 × 10¹⁸ ways". The lesson doesn't say why we divide by 2. If it's the division rule (a route and its reverse count as the same), that isn't stated.

#### d4: Number theory: divisibility and modular arithmetic

7. "so the algorithm takes O(log n) steps". The algorithm takes two inputs, a and b, and n hasn't been defined here. Which number is n?
8. Extended Euclidean algorithm, step 1: "Let q be the quotient of the previous two remainders (the one above divided by the last one, rounded down)." "The one above" and "the last one" both sound like the row just above. I only worked out that q is (remainder two rows up) ÷ (remainder one row up) from the later note "252 ÷ 105 gives 2".

#### d5: Fermat, Euler and RSA

9. "it encrypts a short random key, and that key encrypts the actual message with a fast symmetric cipher such as AES." The term "symmetric cipher" is never defined. I guessed it means the same key encrypts and decrypts, but the lesson doesn't say so.
10. "A 2048-bit n has room for a message of up to 255 bytes." 2048 bits is 256 bytes, so I couldn't see where 255 comes from. Is it because m must be less than n?

#### d7: Random variables and expectation

11. "The rest of the sum is then smaller than a + ar + ar² + …". The letter a is never defined in this paragraph. I assume it's the term where the "from some point on" begins, but I couldn't follow the argument without knowing.
12. "For independent variables, variances add: a binomial has variance np(1 − p)." This skips a step: the variance of a single Bernoulli trial, p(1 − p), is never computed. Practice 4 needs exactly that step.
13. "Randomized quicksort picks its pivot at random… any pivot strictly between them would send them to different sides, never to meet." None of this term's courses explains how quicksort works, including what a pivot is or what the "sides" are. So I couldn't follow why zᵢ and zⱼ are compared exactly when one of them is the first pivot chosen from their block.

### MATH 131 Calculus II and Multivariable Calculus

#### k3: Numerical integration and improper integrals

14. Q5's intended answer says "so the FTC doesn't apply". The abbreviation "FTC" is never introduced in this course. Lesson 1 writes out "Fundamental Theorem of Calculus" but never shortens it.

#### k6: Differential equations

15. The key terms include "Initial value problem: A differential equation together with the value of the solution at a starting time." That term never appears in the lesson text, so I didn't know which examples it was meant to describe.

#### k8: Optimization and gradient descent

16. "so a learning rate that works for one may fail for the other (Practice 5 shows this)". This lesson has only P1 to P4. The average-error experiment is at the end of P4, so I went looking for a Practice 5 that doesn't exist.

#### k9: Constrained optimization and double integrals

17. "Pick N points uniformly at random in the region R" and P2: "Estimate ∬ e^(−(x² + y²)) dA over the square [−3, 3] × [−3, 3] by Monte Carlo with 100,000 random points". No course I've taken shows how to get a random decimal number in Python, let alone one between −3 and 3. MATH 121 shows only `random.randrange` (whole numbers) and `random.choice`. CS 102 mentions `random.random()` once without saying what it returns. (blocking)
18. "MATH 121, Lesson 7 covers variance properly, including the two facts used next" and "Dividing the sum by N to get the average divides the variance by N²". MATH 121 Lesson 7 states only that variances of independent variables add. It never says that multiplying a random variable by a constant c multiplies its variance by c². So the second "fact" isn't covered where the lesson says it is.

#### autodiff: Automatic differentiation

19. Exercise: "Use your Dual class inside Newton's method to find a root of cos x = x". Newton's method isn't explained anywhere in this term's courses, so I couldn't start this exercise. (blocking)

### PHYS 150 Physics I: Mechanics with Computation

#### p1: Motion in one dimension, and your first simulation

20. CODE fall_time hint: "v -= G * dt". The problem statement says "Use g = 9.8", and `G` (capital) is never defined here. In Lesson 5, G is the gravitational constant. The same `G` appears in the CODE terminal hint in Lesson 3. I wasn't sure whether to define G = 9.8 or whether something else was meant.

#### p3: Newton's laws and forces

21. "Normal force N" and "Force is measured in newtons: 1 N = 1 kg·m/s²". In "Vertically, N = mg = 196 N", the same letter N is both the force and its unit. I had to stop and work out which N was which.
22. "Weight splits into mg sin θ down the slope and mg cos θ into it". The lesson doesn't explain why the component along the slope uses sin and the one into the slope uses cos, that is, where the angle θ appears in the triangle. P2 and P3 depend on getting this right.

#### p5: Circular motion, gravitation and orbits

23. "(Check: the force is minus the derivative, −dU/dr = −GMm/r², …)". The rule that force is minus the derivative of potential energy was never stated. Lesson 4 only says U = ½kx² comes "from integrating Hooke's law".
24. P3: "Find the radius of a geostationary orbit (T = 86,164 s, one sidereal day)." The term "sidereal day" is never explained. The lesson text says a geostationary satellite has "T = 1 day", and a day is 86,400 s, so I didn't know why the period here is different.

### Across courses

25. Vectors are introduced twice, with different conventions. MATH 131 Lesson 7 writes **v** = (v₁, v₂), writes the length as |**v**|, and says "The plain letters v₁ and v₂ are scalars: the components of **v**." PHYS 150 Lesson 2 writes **v** = (vₓ, v_y) and says "the same letter in plain italic is its magnitude". In the course text italic and plain look the same, so in PHYS 150 a plain v means the length of **v**, while in MATH 131 plain letters with subscripts mean components. When a formula mixed v and subscripted v's, I had to check which convention the course was using.
26. Random numbers in simulations. MATH 121 (Lessons 6 and 7) and MATH 131 (Lesson 9) ask for simulations. CS 102 Lesson 6 mentions `random.random()` and `random.Random(42)`, but no course shows how to draw a random real number in a given range. That makes the Monte Carlo problem (item 17) impossible to start from the lessons alone.

## Professor's response

Thank you; most of these are real gaps, and two were outright errors. A quiz still listed `make_adder` and "5" among its wrong choices after the question moved to `make_multiplier` (2). MATH 131 also pointed to a Practice 5 that the k8/k9 split had removed (16). Three problems could not be started from the lessons: the Monte Carlo practice needed random floats (17, 26), the autodiff exercise needed Newton's method (19), and the `windows` hint needed a `deque` feature not taught until Lesson 7 (4). All of these are fixed. Every number and code output I added or changed was checked by running Python. Two programming problems changed: CS 102 `checkout` (classes renamed) and `chunks` (list-based hint and solution). PHYS 150's `fall_time`, `projectile` and `terminal` now name the constant `g`. All 54 reference solutions still pass, and every starter still fails.

### CS 102 Programming II

1. c4: The programming problem's classes are now `Cart(gateway)` and `FakeCardGateway`, so `Checkout` and `FakeGateway` each mean one thing. The prompt says this is a smaller design than the worked example: there, the gateway's `charge` returns nothing; here, it reports success with `True` or `False`. Lesson 6 now names "Lesson 4's Practice 4, which stands in for the worked example's `PaymentGateway`" and links to it. The design-principles bullet now writes `charge(email, amount)` to match the worked example.
2. c5, Q4: **Fixed.** The wrong choices are now "2 is a global variable" and "Python re-runs make_multiplier".
3. c5: Added a sentence after the `timed` example. `time.perf_counter()` returns seconds as a float, counted from an arbitrary starting point. One reading means nothing on its own, but the difference between two readings is the time that passed.
4. c5, `chunks`: The hint no longer uses `deque`. It says to keep a list of the latest items, append each new one, `pop(0)` the oldest once there are more than `n`, and yield `tuple(window)` when the list holds exactly `n`. The reference solution does the same. All tests pass, including the one with an endless input.
5. c6, P2: The code now starts with `from datetime import datetime`. The question explains that `datetime.now()` is the current date and time, and `.hour` is the hour as a whole number from 0 to 23.

### MATH 121 Discrete Mathematics II

6. d1 sidebar: Now says that 20 cities give 20! orders, but each round trip is counted twice, once in each direction. By the division rule that leaves 20!/2 ≈ 1.2 × 10¹⁸ routes (checked: 1.216 × 10¹⁸, 38.5 years at 10⁹ a second).
7. d4: "O(log n) steps, where n is the smaller of the two inputs."
8. d4: Step 1 now reads "the remainder two rows up divided by the remainder one row up, rounded down", with the first case worked: 252 ÷ 105 rounds down to 2.
9. d5: Defined *symmetric cipher* where it first appears: one secret key both encrypts and decrypts, unlike RSA's public and private pair. Such ciphers are much faster than RSA, but both sides must share the key first, and RSA is how they share it.
10. d5: Yes, that's the reason, and the lesson now says so. The message must be less than n, or decryption gives back m mod n instead of m. A 2048-bit n is at least 2²⁰⁴⁷. Any 255-byte message is below 256²⁵⁵ = 2²⁰⁴⁰ (checked), so it always fits. A 256-byte message can be as large as 2²⁰⁴⁸ − 1, which may be more than n.
11. d7: Now says "Call the term at that point a". The next term is less than ar, the one after less than ar², and so on.
12. d7: The variance of one Bernoulli trial is now worked out in the lesson. Since X² = X (0² = 0 and 1² = 1), E[X²] = p, so Var = p − p² = p(1 − p). The binomial's np(1 − p) then follows from "variances add". That rule is stated as a separate fact, without proof.
13. d7: Added a short description of quicksort before the analysis. It picks a pivot, compares every other item with it, splits the items into a smaller side and a larger side, and sorts each side recursively. Items are compared only with the current pivot, and items on different sides are never compared. The comparison argument now also says why the block zᵢ, …, zⱼ stays together until one of its own items is chosen as a pivot.

### MATH 131 Calculus II and Multivariable Calculus

14. k3, Q5: The answer now spells out "Fundamental Theorem of Calculus". The abbreviation appears nowhere else in the course.
15. k6: The exponential-growth section now uses and defines the term. The equation alone has one solution for each y₀. Adding a starting value such as y(0) = y₀ makes an **initial value problem**, which has just one solution.
16. k8: **Fixed** (left over from the k8/k9 split). The text now says "the last part of Practice 4 shows this".
17. k9: **Fixed (was blocking).** The Monte Carlo paragraph now explains `random.uniform(a, b)`: a random float between a and b, every value equally likely. It also shows that `(random.uniform(a, b), random.uniform(c, d))` is a uniformly random point in a rectangle. P2 has a new hint that applies this to the square [−3, 3]², averages the values and multiplies by the area 36. The reference code already used `random.uniform`.
18. k9 / d7: MATH 121 Lesson 7 now states both facts: variances of independent variables add, and Var[cX] = c² Var[X]. The second is proved in one line from the definition. The MATH 131 paragraph now also gives the reason in place: multiplying by c multiplies every distance from the mean by c, and dividing by N is multiplying by c = 1/N.
19. autodiff, Exercise 2: **Fixed (was blocking).** The exercise now explains Newton's method itself. To solve g(x) = 0, repeat x ← x − g(x)/g′(x). Each step follows the tangent line at x to where it crosses zero. The exercise asks for a `cos` for `Dual` (cos has derivative −sin) and `__sub__` from Exercise 1, then g(x) = cos x − x from x = 1. Both g(x) and g′(x) come from one call, `g(Dual(x, 1.0))`. It gives the expected result, 0.7390851332 after four steps (checked with a `Dual` implementation).

### PHYS 150 Physics I

20. p1, p2, p3 problems: The constant is now lowercase `g = 9.8` in the starter code, solution and hints of `fall_time`, `projectile` and `terminal`. This matches the problem statements and the lesson's own simulation code. Capital G now appears only as the gravitational constant in Lesson 5.
21. p3: The normal force is now written F_N everywhere: the list of forces, the friction formulas, the figure label and caption, the box example ("F_N = mg = 196 N") and the elevator practice. The list says that "normal" means perpendicular, and that the subscript keeps the force apart from N, the newton.
22. p3: Added a paragraph on the incline. Tilting the ramp by θ also tilts its perpendicular by θ away from straight down, so the weight makes angle θ with the "into the slope" axis. The side next to θ is mg cos θ, into the slope. The side opposite is mg sin θ, along it. The paragraph checks both extremes: θ = 0 (nothing along the surface) and θ = 90° (free fall).
23. p4/p5: Lesson 4 now states the rule after the potential-energy list: F = −dU/dx, because the force's work F dx over a small step equals the drop in U, −dU. It checks the rule on the spring (−kx) and on gravity (−mg). Lesson 5's check now links back to it.
24. p5: The text now uses the sidereal day as well, so it agrees with P3. A geostationary satellite must turn with Earth, once every 86,164 s (23 h 56 min 4 s), relative to the distant stars. The 86,400 s solar day is longer because Earth also moves about 1° along its orbit each day (360/365.25 = 0.986°) and must turn that extra degree to face the Sun again. With T = 86,164 s the radius is 42,164 km (checked; 86,400 s would give 42,241 km). Both round to the lesson's 42,200 km.

### Across courses

25. Both courses now tie the two notations together. PHYS 150 Lesson 2 adds that a letter with a subscript, like v_x, is always a component and never the magnitude. It adds that MATH 131 numbers the components v₁, v₂ and writes the magnitude only as |**v**|, and that physics shortens |**v**| to v. MATH 131 Lesson 7 has the matching note, with a link to PHYS 150. In both courses a subscript now means a component, and a plain v with no subscript (physics only) means the length.
26. Random decimals are now explained wherever they're first needed. MATH 121 Lesson 6, next to `randrange` and `choice`, says that `random.random()` gives a float from 0 up to but not including 1, and `random.uniform(a, b)` gives one between a and b. CS 102 Lesson 6 now says what `random.random()` returns. MATH 131 Lesson 9 explains `random.uniform` where the Monte Carlo problem needs it (item 17). The MATH 121 simulations need only `randrange` and `choice`, which that lesson already explains.
