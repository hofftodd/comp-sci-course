# Student review: Year 2 Fall

*Round 3. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a second-year student. Before this term I took CS 100, WRIT 100, CS 101 and CS 102 (Python programming, recursion, stacks, queues, linked lists, BSTs), MATH 120 and MATH 121 (discrete maths, recurrences, counting, basic probability), MATH 130 and MATH 131 (single-variable and multivariable calculus), and PHYS 150. I have never written C. I read the four course dumps (cs201, cs210, math220, math230) in lesson order and tried every quiz and practice problem in my head. Most of the material was easy to follow. The items below are the places where I actually got stuck or confused. None of them stopped me from starting a problem completely, so none is marked blocking.

### CS 201 Data Structures

#### ds1: Asymptotic analysis

1. P5 says to time "your own Θ(n log n) function (for example sorted on a shuffled list)". But the notes' `timed` helper always passes `data = list(range(n))`, which is already sorted. I couldn't tell whether I was meant to change `timed` to shuffle the data, or pass the function something that shuffles first (and then the shuffle is timed too). Lesson 6 also says Timsort "can approach Θ(n)" on partly sorted data, so if I used `timed` as written, `sorted` would not behave like Θ(n log n). The problem doesn't say how to deal with this.

#### ds8: Union-find, tries, and choosing a data structure

2. "no tree gets deeper than log₂ n" and P1's "How deep is the deepest item?" Lesson 4 says every height in CS 201 counts nodes, but "depth" is never defined. If depth counts nodes, a single item has depth 1 and the bound would have to be log₂ n + 1. So the bound seems to count edges, which contradicts the course's node convention. For P1 (where I get a chain 8 → 7 → 5 → 1), I didn't know whether to answer 3 or 4.

### CS 210 Computer Systems I

#### sy1: Bits, bytes and integers

3. "using x = 0b10110100 as an example" (P3) and "for 12 = 0b1100 it is 4" (bit_tricks). The lesson explains the 0x prefix for hex but never explains 0b. I guessed that it means binary, but nothing says that Python accepts it as a literal.

4. "(0x12345678).to_bytes(4, "little") is b'xV4\x12'". The b'...' notation and the \x12 escape aren't explained here. The only explanation given is that printable bytes are shown as letters. Later, Lesson 3's c_strings problem says "Lesson 1 showed the b'...' notation", but Lesson 1 only shows one printed value and never says what b'...' means or how \xNN works.

#### sy3: C for Python programmers

5. P1 asks for "Celsius equivalents … with one decimal place" and then to compare "(f - 32) * 5 / 9 with an int f" against "/ 9.0". With an int f, the first expression is an int, and the lesson only gives %f for doubles and %d for ints. I didn't know how to print the int version with one decimal place, or what happens if an int is passed to %.1f. Converting an int to a double with (double) isn't shown until Lesson 7.

### MATH 220 Linear Algebra

#### la2: Linear systems and Gaussian elimination

6. P2 asks for which k the system x + 2y = 3, 3x + ky = 9 has "(c) none". The right-hand side 9 is exactly 3 × 3, so for k = 6 the system has infinitely many solutions, and for every other k it has exactly one. As far as I can see, no k gives no solution. I wasn't sure whether the answer to (c) really is "no value of k" or whether I had made a mistake.

#### la6: Orthogonality and least squares

7. "which simplifies (since Q^(T)Q = I and R^(T) is invertible) to R**x̂** = Q^(T)**b**". The lesson never says why R^(T) is invertible. I think it's because R is triangular with nonzero diagonal entries (the lengths Gram–Schmidt divided by), so its determinant is nonzero, but that step is left out.

#### la7: Eigenvalues and eigenvectors

8. "Two checks come free: the eigenvalues add up to the trace … and multiply to the determinant." This is stated with no reason, and Q3 depends on it. I checked it for [2 1; 1 2] but didn't understand why it holds in general.

#### la8: The singular value decomposition and PCA

9. Σ means two different things in this lesson. "Σ is an m × n matrix … the singular values" is used right next to "entry (j, k) of PQ is Σ_i P_(ji)Q_(ik)", where Σ is a summation sign. Reading "ΣV^(T) multiplies row i of V^(T)…" I had to stop and work out which Σ was meant.

### MATH 230 Probability and Statistics for Computer Science

#### ps2: Discrete distributions

10. P4 says to compare the sample mean and variance "(statistics.mean, statistics.pvariance) with the formulas". This lesson doesn't explain what pvariance is or how it differs from statistics.variance. That only comes in Lesson 6 ("pvariance and pstdev ('population') use n"), so here I didn't know why pvariance was the one to use.

#### ps7: Hypothesis tests and A/B testing

11. "If H₀ is true, that happens with probability about α (at most α for an exact test)." The term "exact test" is never defined, so I couldn't tell which tests are exact and which give only "about α". For example, I don't know whether the z-test or the permutation test counts as exact.

### Across courses

12. CS 201 Lesson 6's radix_sort hint uses "(x >> (8 * p)) & 255" with no explanation and no pointer to where >> and & are taught. They are explained in CS 210 Lesson 1, taken in the same term, but CS 201 doesn't say so. Without CS 210 Lesson 1 I could only use the // and % alternative the hint also gives.
