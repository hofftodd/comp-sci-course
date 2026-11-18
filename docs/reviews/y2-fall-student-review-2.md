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

## Professor's response

Thank you. Two of these blocked work outright: the cache-timing practice gave only a fragment with no way to time it (14), and the header practice needed an `#include` form the lesson never showed (15). Both are fixed with complete programs. Three more were close to blocking: the stable counting sort that Practice 5 needs was one sentence long (4), `Fraction` was used by three programming problems without being introduced (17), and the null-space method was never shown (18). One claim was wrong as written: a plain balanced BST can't count a range in O(log *n*) (2). And the `int8_t` example deserved the explanation it lacked (6). Every number, Python output and C program I added or changed was checked by running it (Python 3.12 with NumPy, gcc 13 with `-Wall -Wextra`, no warnings). No programming problem's code or tests changed; three MATH 220 prompts now point to where `Fraction` is explained, and all 107 reference solutions still pass.

### CS 201 Data Structures

1. ds3: The open-addressing paragraph now says where 1/(1 − α) comes from and how the assumption differs. Simple uniform hashing (used for chaining) says only where a key's *first* slot lands. *Uniform hashing* is stronger: it pretends each key's whole probe sequence is a random order of all slots. Then each probe of an unsuccessful search hits an occupied slot with probability about α, independently, so the number of probes is geometric with success probability 1 − α, mean 1/(1 − α) (MATH 121 Lesson 7). The paragraph adds that linear probing does worse than this idealization because of clustering.
2. ds4: **Corrected.** The list now says a balanced BST finds where a range starts and ends in O(log *n*). A new paragraph says listing or counting the *k* keys by visiting them costs O(log *n* + *k*), and that this is what P3 and `range_count` do, so P3's expected answer is O(log *n* + *m*). Counting in O(log *n*) alone needs a *size-augmented* tree, where each node also stores its subtree's size, kept up to date on insertions, deletions and rotations. The paragraph explains how to count the keys ≥ *a* along one path, and how two such counts give the range. P3's answer now refers to that paragraph.
3. ds6: The notes now define an inversion as a pair of positions *i* < *j* with *a*[*i*] > *a*[*j*] and prove the link. Each shift swaps two neighbors that are out of order. Swapping neighbors changes the order of that one pair and no other, so each shift removes exactly one inversion. The sorted list has none, so insertion sort makes exactly *I* shifts, plus Θ(*n*) for the outer loop. (Checked: [3, 1, 4, 1, 5] takes 3 shifts.)
4. ds6: **Fixed (nearly blocking).** The notes now show a stable `counting_sort_by(records, key, k)`. It turns the counts into starting positions, then places the records in their original order, which is what makes it stable. They also show `code_number`, which reads a two-letter code as a base-26 number using `ord` from CS 101: "AA" is 0, "ZZ" is 675 and "FR" is 147. An example sorts five (name, country) records, and two records with the same code keep their order. The printed output was checked by running it.
5. ds6: The sentence now explains that Java's *primitive* types such as `int` and `double` are bare values, not objects with other fields. Two equal `int`s are identical in every way, so no program can tell whether a sort swapped them. That makes the faster unstable sort safe for them.

### CS 210 Computer Systems I

6. sy1: A new paragraph explains why the example is not undefined behavior. C never does arithmetic on types narrower than `int`. In `a + 1`, `a` is first promoted to `int`, and the sum is the `int` 128, with no overflow. The trouble comes only when 128 is stored back into an `int8_t`. That is a conversion, and its result is *implementation-defined*: each compiler must choose a result and document it. GCC, Clang and other common compilers keep the low 8 bits, giving −128. The separate statement remains that overflow in signed arithmetic itself (such as `int` 2,147,483,647 + 1) is undefined behavior. The code comment now reads "128 as an int, stored back in 8 bits". The program compiles without warnings and prints −128, 4294967295 and 0.
7. sy1: The notes now say that 754 is octal (base 8) and that each octal digit is exactly three bits: 7 = 111 (rwx, owner), 5 = 101 (r-x, group), 4 = 100 (r--, others). As one number it is 492 in decimal (checked).
8. sy2: Added the reason for −126. The smallest normal numbers (exponent field 1) are 1.*f* × 2⁻¹²⁶. Using the same exponent for subnormals puts the largest subnormal one step below the smallest normal number, so the spacing stays even across the boundary. With 2⁻¹²⁷ there would be a gap from 2⁻¹²⁷ up to 2⁻¹²⁶. Double precision likewise uses 2⁻¹⁰²².
9. sy3: The first program's line-by-line list now explains `void`. In `int main(void)` it means no parameters. As a return type (`void swap(…)` in Lesson 4) it means the function returns no value, like a Python function without `return`.
10. sy3: Added that `sizeof dest` is the same as `sizeof(dest)`. The parentheses may be left out for a variable but are required around a type name. The note also says this works only for an array declared in the same function, because an array parameter is only an address.
11. sy3: The Strings section now covers this case. `char word[5] = "hello"` is allowed in C, which silently leaves out the terminator. GCC 13 compiles it with no warning even under `-Wall -Wextra` (checked). Printing it with `%s` then reads past the end. An initializer with more letters than the array has bytes (`char w[4] = "hello"`) breaks a language rule, and GCC warns about it (checked). P3 is now answerable from the notes.
12. sy5: "Vectorized" is now explained in place: rewritten to use instructions that each work on several numbers at once, for example adding four pairs of `int`s in one step.
13. sy7: A new paragraph explains the fill loop. Until a program writes to a global array, the operating system maps every page of it to one shared page of zeros. Summing it would keep reading that one small page from the cache, and both orders would look fast. Writing every element first makes the 64 MB really exist. It also explains why the program prints `total`: otherwise the compiler could delete loops whose results are never used.
14. sy7: **Fixed (was blocking).** The notes now show the complete program: includes, `main`, the fill loop, `long total`, and both timed loops. It also shows how to time code. `clock()` from `<time.h>` is explained: the difference of two readings, divided by `CLOCKS_PER_SEC`, with the `(double)` cast so the division isn't integer division. The shell's `time ./grid` is shown for timing a whole program. So is the compile command, `gcc -Wall -O1 -o grid grid.c`. I compiled the program exactly as it appears in the lesson. It printed `total 137405399040` (checked in Python) and `rows 0.013 s, columns 0.152 s`, which is now the output shown. P3 now names the file and the commands. It also has a hint: at N = 256 each pass is too fast for `clock()` (it printed 0.000), so repeat each loop 256 times. The answer now gives measured numbers: 0.005 s against 0.016 s, so the ratio falls from about 10 to about 3, not to "close".
15. sy8: **Fixed (was blocking).** The header-file paragraph now has a complete three-file example, `util.h`, `util.c` and `prog.c` with `#include "util.h"`, plus the commands to compile and link it. It prints 49 (checked). It explains the difference between the two forms. Quotation marks look first in the folder of the file being compiled, then in the system's folders. Angle brackets look only in the system's folders, so `#include <util.h>` fails with "No such file or directory" (checked).
16. sy8: The system-calls paragraph now explains the family. "Exec" is the family name, and only `execve(path, argv, envp)` is a system call. `execlp` and its relatives are C-library functions that collect the arguments from a list or search the command folders in ordinary code, then call `execve`.

### MATH 220 Linear Algebra

17. la2: **Fixed.** Lesson 2 now ends with a short section on `fractions.Fraction`. It explains why exact arithmetic matters when testing for a zero pivot, that `Fraction(a, b)` is *a*/*b* in lowest terms and `Fraction(n)` is a whole number, and that arithmetic and comparisons stay exact. It shows how to convert a matrix with `[[Fraction(v) for v in row] for row in A]`. The example prints `1/2`, `3/2 3/4`, `False` (for `0.1 + 0.2 == 0.3`), `True` and `0.3333333333333333` (checked). The `classify_system`, `det_inverse` and `rank_independence` prompts now point to it.
18. la5: Added "Finding a basis of the null space". Eliminate, set each free variable to 1 in turn with the other free variables at 0, and back-substitute for the pivot variables. The resulting vectors are independent, since each has a 1 where the others have 0, and they span the null space. For *B* the steps are now written out. They give (−1, −1, 1), which replaces the unexplained (1, 1, −1) (the same line) and is checked against all three rows. A second example with three free variables, [1 2 0 3], gives (−2, 1, 0, 0), (0, 0, 1, 0) and (−3, 0, 0, 1) (checked). It doesn't give away P1 or P2.
19. la1: The promise now says later lessons use what that section shows "plus a few more functions (listed at the end of this section), each explained where it first appears". The list at the end now names `np.ones` and `np.column_stack` (Lesson 6) and `np.round` (Lesson 8).
20. la8: Added the step. Σ*V*ᵀ scales row *i* of *V*ᵀ by σᵢ. Then any product *PQ* equals the sum of (column *i* of *P*)(row *i* of *Q*), because the *i*th term of each entry's sum Σᵢ *P*ⱼᵢ*Q*ᵢₖ is that entry of the *i*th column-times-row matrix. Terms with σᵢ = 0 vanish. The notes also show why *r*, the number of nonzero singular values, is the rank. Every *A***x** is a combination of **u**₁, …, **u**ᵣ, and each **u**ᵢ = *A***v**ᵢ/σᵢ is itself an output, so these orthonormal vectors are a basis of the column space. (Checked with NumPy on [3 0; 4 5].)
21. la8: Distance between matrices is now defined: treat each matrix as a vector of its *mn* entries and use Lesson 1's length (the Frobenius norm). The theorem also gives the error, √(σₖ₊₁² + … + σᵣ²). For [3 0; 4 5], *A*₁ = [1.5 1.5; 4.5 4.5] and the distance is √5 = σ₂ (checked).

### MATH 230 Probability and Statistics for Computer Science

22. ps2/ps3: Lesson 3 now argues the direction that `poisson_sample` uses. Cut the time unit into *n* slices. Memorylessness and independence give each slice the same chance of an event, 1 − e^(−λ/*n*) ≈ λ/*n* (MATH 130's linear approximation), whatever happened before. Two events in one slice have probability about (λ/*n*)², which can be ignored. So the count is nearly binomial(*n*, λ/*n*), which Lesson 2 showed tends to Poisson(λ). Lesson 2's parenthesis now says "adding up such waits and counting how many fit in one time unit", which is what Lesson 3 now explains.
23. ps4: The scaling fact is now proved in the notes, in one line from the definition: Cov(*cX*, *Y*) = E[(*cX* − *c*μ_X)(*Y* − μ_Y)] = *c* Cov(*X*, *Y*). The notes then apply it with *c* = 1/σ_X and *c* = 1/σ_Y, so the proof that −1 ≤ ρ ≤ 1 no longer rests on a practice problem. Practice 2 still adds the shift *b*.
24. ps5: The step is now spelled out. (*X* − μ)² is non-negative with mean σ², and the notes take *a* = *k*²σ². Both sides of |*X* − μ| ≥ *k*σ are non-negative, and squaring keeps the order of non-negative numbers, so the event equals (*X* − μ)² ≥ *k*²σ². Markov then gives σ²/(*k*²σ²) = 1/*k*².
25. ps6: Where `random.gauss` first appears, the notes now say that `random.gauss(mu, sigma)` takes the *standard deviation*, not the variance that N(μ, σ²) shows: `random.gauss(5, 2)` is N(5, 4). (Checked: 200,000 draws have standard deviation 2.00.) Lesson 8's P3 now says "normal noise with standard deviation 0.3 (Lesson 6)".
26. ps8: The derivation from the normal equations is now shown. The first equation divided by *n* gives *c* = *ȳ* − *mx̄* (the formula for *a*). Substituting that into the second, with Σ*x* = *nx̄*, gives *m*(Σ*x*² − *nx̄*²) = Σ*xy* − *nx̄ȳ*. These two sides are the sums of squared and multiplied deviations, so *m* = *s*_xy/*s*_x² = *r* · *s*_y/*s*_x.
27. ps8: The notes now say that, for data, Cov(*x*, *y*) and Var(*x*) mean Lesson 4's sample versions *s*_xy and *s*_x², with denominator *n* − 1, and that dividing both by *n* would give the same slope. The example now shows the arithmetic: Cov = 101/5 = 20.2 and Var(*x*) = 17.5/5 = 3.5 (checked with `statistics.covariance` and `statistics.variance`).

### Across courses

28. Notes added where α takes a new meaning. CS 201 Lesson 8 says the inverse Ackermann α(*n*) is a function of *n* and unrelated to Lesson 3's load factor. MATH 230 Lesson 2 says its α keeps CS 201's load-factor meaning and that Lesson 7 will reuse the letter. Lesson 7 now defines the significance level α in a sentence of its own ("reject H₀ when *p* < α") and says it is not Lesson 2's load factor.
29. MATH 220 Lesson 1 now says that MATH 230 Lesson 8 uses two more functions, `np.polyfit` and `np.polyval`.
