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

## Professor's response

1. Real gap. CS 201 ds1 P5 now says the notes' `timed` passes the already-sorted `list(range(n))`, on which `sorted` is close to Θ(n) (Lesson 6), and tells the student to add `random.shuffle(data)` inside `timed` before the clock starts, so the shuffle is not timed.
2. Real gap. CS 201 ds8 now defines an item's depth in union-find as the number of parent pointers find follows to reach the root (the root has depth 0). It says this counts edges, not nodes like Lesson 4's heights, because it is the number of find's steps, and it explains the log₂ n bound (a tree of n items can double at most log₂ n times). P1 now asks for "the largest depth (number of steps find takes to reach the root)". The answer, 3, is unchanged.
3. CS 210 sy1 now explains the `0b` prefix next to `0x`: Python (and gcc) accept `0b11111111` as 255, and `bin(12)` is `'0b1100'`.
4. CS 210 sy1's byte-order paragraph now explains `b'...'` bytes objects: each byte is shown as its printable character (its `ord` code, from CS 101) or as `\x` plus two hex digits. It goes through `b'xV4\x12'` byte by byte and shows that indexing gives the number (`[0]` is 120 = 0x78). With this, Lesson 3's reference to "Lesson 1 showed the b'...' notation" is now true. Outputs were checked in Python.
5. CS 210 sy3 P1 now prints the double version with `%.1f` and the int version as a second column with `%d`. It warns that passing an int to `%f` is a bug that `gcc -Wall` warns about. The C solution was updated, compiled with `gcc -Wall` and run (no warnings). The answer quotes the real output (for example `0 F = -17.8 C (int version: -17)`, and −6 versus −6.7 at 20 °F).
6. Real error: case (c) could not happen. MATH 220 la2 P2 now uses a second parameter: 3x + ky = h. In the answer, k ≠ 6 gives one solution for every h, k = 6 and h = 9 gives infinitely many, and k = 6 with h ≠ 9 gives 0 = h − 9, so no solution. It adds that for k = 6 the lines are parallel.
7. MATH 220 la6 now shows the step to RᵀRx̂ = RᵀQᵀb. It explains that Rᵀ is invertible because it is triangular, so its determinant is the product of its diagonal (Lesson 4), and those diagonal entries are Gram–Schmidt's nonzero lengths. Multiplying by (Rᵀ)⁻¹ then gives Rx̂ = Qᵀb.
8. MATH 220 la7 now proves the trace and determinant checks for 2 × 2 matrices: it expands det(A − λI) = λ² − (a + d)λ + (ad − bc) and compares coefficients with (λ − λ₁)(λ − λ₂). It also says the same matching works for n × n matrices, counting repeated eigenvalues.
9. MATH 220 la8 no longer uses the summation sign in the outer-product argument. It now says "the sum over i of P_ji Q_ik (row j of P dotted with column k of Q)", so Σ in that lesson means only the singular-value matrix.
10. MATH 230 ps2 P4 now defines `statistics.pvariance` as (1/n) Σ(xᵢ − x̄)², the sample version of the lesson's E[(X − μ)²]. It notes that `statistics.variance` divides by n − 1 (explained in Lesson 6) and that with 100,000 values the difference is negligible. A simulation gave 4.198 for both, against a formula value of 4.2.
11. MATH 230 ps7 now defines an exact test: one whose p-value comes from the statistic's distribution under H₀ with no approximation, so its error rate is at most α (it can be lower for discrete statistics). A permutation test over all relabellings is exact, and one with many random shuffles is very nearly exact. The z-test uses the CLT's normal approximation, so its error rate is only about α.
12. The CS 201 radix_sort hint (data/cs201-code.js) now gives `(x // 256**p) % 256` first. It then explains `x >> k` (the same as `x // 2**k` for x ≥ 0) and `& 255` (keeps the lowest 8 bits, the same as `% 256`), points to CS 210 Lesson 1, and says either form is fine. The equivalence was checked in Python.
