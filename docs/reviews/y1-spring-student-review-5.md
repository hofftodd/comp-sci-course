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
