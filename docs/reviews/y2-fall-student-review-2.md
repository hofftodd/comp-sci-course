# Student review: Year 2 Fall

*Round 2. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a second-year student. In Year 1 I took CS 101 and CS 102 (Python, recursion, big-O as step counting, stacks, queues, linked lists and BSTs), MATH 120 and MATH 121 (logic, proofs, counting, recurrences, modular arithmetic, basic probability with Bayes' rule, expectation, binomial and geometric distributions), MATH 130 and MATH 131 (single-variable and multivariable calculus, series, double integrals, gradient descent), PHYS 150, CS 100 and WRIT 100. I have never written C, never seen assembly, and have not used NumPy or matrices beyond what those courses covered.

### CS 201 Data Structures

#### ds3: Hash tables

1. "under a uniform-hashing idealization, an unsuccessful search takes about 1/(1 − α) probes". The formula is given with no reasoning, and "uniform hashing" is a different phrase from the "simple uniform hashing assumption" used for chaining. I couldn't tell where the formula comes from or whether it is the same assumption.

#### ds4: Balanced search trees

2. "A balanced BST supports, each in O(log n): … counting or listing the keys in a range [a, b] (listing costs an extra Θ(k) for k results)". This says counting the keys in a range takes O(log n). P3 ("What is the function's cost, in terms of n and m?") and the range_count problem then use a method that visits the in-range keys, which costs more than O(log n) when m is large. I don't know how counting could be O(log n), so I couldn't tell which answer P3 expects.

#### ds6: Sorting

3. "But its cost is really Θ(n + I), where I is the number of inversions". This is stated without explaining why each shift corresponds to exactly one inversion. P1 ("How many shifts does insertion sort make on it?") seems to rely on that link.
4. "A stable version, which can sort records by a numeric key, turns the counts into starting positions and places each record in turn." That one sentence is the whole description; no stable counting sort is shown. P5 (10 million records by a two-letter country code, keeping their order) seems to need exactly this algorithm, and also needs the two-letter code turned into a number, which isn't shown either. I could only partly start P5.
5. "Java … uses a dual-pivot quicksort for arrays of primitive numbers, where stability can't be observed." "Primitive" isn't explained, and neither is why stability can't be observed for them.

### CS 210 Computer Systems I

#### sy1: Bits, bytes and integers

6. "int8_t a = 127; /* an 8-bit signed integer */ a = a + 1; /* converted back to 8 bits */ … /* -128 */" against "overflow of signed arithmetic is undefined behavior … which compilers may assume never happens". The example looks like signed overflow, yet it is presented as reliably printing −128. I can't tell whether this example is undefined behavior or why it isn't.
7. "chmod 754 sets three 3-bit groups (read = 4, write = 2, execute = 1)". Nothing says that 754 is read digit by digit (octal) rather than as the decimal number 754, so I couldn't see how 754 becomes three 3-bit groups.

#### sy2: Floating point

8. "With a nonzero fraction, the number is subnormal: 0.f × 2⁻¹²⁶ in single precision". For an exponent field of 0, the bias rule from earlier would give 2^(0 − 127) = 2⁻¹²⁷. Nothing explains why subnormals use −126.

#### sy3: C for Python programmers

9. "int main(void)" and later "void swap(int *a, int *b)". The word void is never explained, either as a return type or inside an empty parameter list.
10. "snprintf(dest, sizeof dest, "%s", src)". Everywhere else sizeof is written with parentheses (sizeof(int), sizeof(x)). I didn't know sizeof could be written without them, or whether this is a different thing.
11. P3: "char word[5] = "hello"; printf("%s\n", word);". The notes say "Grace" needs 6 bytes, but not what happens when a string literal exactly fills the array without room for the terminator: whether it compiles, gives a warning or an error. So I couldn't answer "What does this print" with confidence.

#### sy5: Machine code and assembly

12. "whether a loop was vectorized". "Vectorized" is never explained.

#### sy7: Caches and the memory hierarchy

13. "(the program first fills grid, so the memory is really in use)". I don't understand why memory wouldn't be "really in use" if the array isn't filled, or why that would change the timing.
14. P3: "Compile the row-versus-column program (filling the array first) with gcc -O1 on your own computer and time it." The code shown is only a fragment (no main, no declaration of total, no fill loop), and no C timing tool or command is ever shown. I couldn't do this from the lesson. (blocking)

#### sy8: Linking, processes and system calls

15. P1: "Write stats.h, show the #include line in main.c". The only #include form shown is with angle brackets for standard headers (#include <stdio.h>). Nothing says how to include your own header file, or whether <stats.h> would work. (blocking)
16. "fork, execve, read, write and open are system calls" after a lesson that used execlp and talked about "exec". I can't tell how execve, execlp and "exec" are related, or which of them is the system call.

### MATH 220 Linear Algebra

#### la2: Linear systems and Gaussian elimination

17. classify_system: "Use exact arithmetic with fractions.Fraction, so that rounding can't hide a zero." The fractions module and the Fraction type are never introduced: how to create one, or that arithmetic on them stays exact. det_inverse (Lesson 4) and rank_independence (Lesson 5) depend on it too.

#### la5: Vector spaces, bases and rank

18. "Each free column contributes one independent vector to the null space" and "Solving B**x** = **0** gives the line spanned by (1, 1, −1)". The steps from echelon form to a null-space basis aren't shown, and neither is how to get one vector per free column when there are several. P2 asks for "a basis of its null space", and P1 asks for a basis of a plane.

#### la6: Orthogonality and least squares

19. Lesson 1 says "Later lessons' NumPy code uses only what this section shows, plus one np.linalg function per lesson". But this lesson's code uses np.ones and np.column_stack (and Lesson 8 uses np.round), none of which Lesson 1's section shows. The notes do explain them where they appear, but this contradicts the earlier promise.

#### la8: The singular value decomposition and PCA

20. "Multiplying out UΣV^(T) writes A as a sum of simple pieces: A = σ₁**u**₁**v**₁^(T) + …". I couldn't follow how multiplying the three matrices gives this sum of column-times-row terms. I also couldn't see why the last index r is the rank of A.
21. "the Eckart–Young theorem (1936) says no rank-k matrix is closer to A". Distance between two matrices is never defined, so I don't know what "closer" means here.

### MATH 230 Probability and Statistics for Computer Science

#### ps2: Discrete distributions

22. "(random.expovariate(λ) draws the waiting time until the next event of a Poisson process; Lesson 3 explains why counting such waits gives a Poisson count.)" Lesson 3 only argues the other direction: "waiting more than t means zero events in time t". That shows the first wait is exponential if counts are Poisson. It doesn't show that adding up exponential gaps and counting them gives a Poisson count, which is what poisson_sample does.

#### ps4: Joint distributions, covariance and correlation

23. "(scaling one variable by a number scales the covariance by that number, as Practice 2 shows)". The proof that −1 ≤ ρ ≤ 1 relies on a fact the notes leave to an unsolved practice problem, so I couldn't follow the proof from the notes alone.

#### ps5: The law of large numbers and the central limit theorem

24. "Chebyshev's inequality. Applying Markov to (X − μ)² gives, for any k > 0, P(|X − μ| ≥ kσ) ≤ 1/k²". The step is skipped: which a to use, and why the event |X − μ| ≥ kσ is the same as (X − μ)² ≥ k²σ², aren't spelled out.

#### ps6: Estimation and confidence intervals

25. "random.gauss(0, 1)" in the notes, then "random.gauss(5, 2)" in P3. random.gauss is never explained, and the lessons write normals as N(μ, σ²). So I don't know whether the second argument is the standard deviation or the variance. MATH 230 Lesson 8 P3 ("random.gauss(0, 0.3)") has the same problem.

#### ps8: Linear regression

26. "b = Cov(x, y) / Var(x) = r · s_y / s_x, a = ȳ − b x̄ … These are the solutions of MATH 220's normal equations, written in statistical language." The step from the normal equations nc + (Σx)m = Σy, (Σx)c + (Σx²)m = Σxy to b = Cov/Var isn't shown.
27. "Cov = 20.2 and Var(x) = 3.5". Lesson 4 wrote Cov and Var for random variables and s_xy, s_x² for data. Here Cov and Var are applied to data (and 3.5 is the n − 1 sample variance). I wasn't sure which definition was meant until I checked the arithmetic.

### Across courses

28. The symbol α means four different things this term. In CS 201 it is the load factor ("The load factor α = n/m") and the inverse Ackermann function ("O(m α(n))"). In MATH 230 Lesson 7 it is the significance level ("probability α, the significance level"), and MATH 230 Lesson 2 uses it again for the load factor. Nothing remarks on the overlap, and in CS 201 Lesson 8 I briefly read α(n) as a load factor.
29. MATH 220 Lesson 1: "MATH 230 Lesson 8 uses one more function, np.polyfit, and explains it there." MATH 230 Lesson 8 also uses np.polyval ("np.polyval(coef, x) evaluates that polynomial at x"), so the list in MATH 220 is incomplete. This is a minor contradiction between the two courses.
