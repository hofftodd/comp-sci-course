# Student review: Year 2 Fall

*Round 1 for Year 2 Fall (first draft). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited. Note added afterwards: item 17 is partly a dump artifact. On the page, the union-find row's middle cell spans three columns (Search, Insert and Delete); the text dump shows cells separated by " | " and can't show the span.*

I'm a second-year student. In Year 1 I took CS 101 and CS 102 (Python, up to classes, recursion, linked structures, stacks, queues and BSTs), MATH 120 and MATH 121 (discrete maths: proofs, recurrences, modular arithmetic, basic probability with random variables, expectation and variance), MATH 130 and MATH 131 (single-variable calculus, series, multivariable calculus and double integrals), PHYS 150, CS 100 and WRIT 100. I had never seen C, assembly, NumPy or matrices before this term. I read the four course dumps in order and tried every quiz and practice problem in my head.

### CS 201 Data Structures

#### ds1: Asymptotic analysis

1. "It must run in expected Θ(n) time" (CODE pair_sum). The word "expected" for set lookups comes before hash tables (Lesson 3), so I don't yet know why checking whether something is in a set is Θ(1), or why it is only "expected".

#### ds2: Arrays, dynamic arrays and amortized analysis

2. "int scores[5] = {0};         // five ints on the stack, fixed size" and "sizeof(scores) / sizeof(scores[0])". "The stack" as a region of memory (rather than the call stack), and `sizeof`, aren't explained here. CS 210 only covers them later in the term.
3. "len(a), a[i] and a[i] = x for 0 ≤ i < len(a)" (CODE dynamic_array). The notes show `__len__` and `__getitem__` but nothing for assigning `a[i] = x`. I don't know which special method makes item assignment work.
4. "When the buffer is full, double its size" (CODE ring_queue). The starting capacity of the buffer is never given, so I'm not sure what size to start with or whether the tests expect a particular one.

#### ds3: Hash tables

5. "a table indexed by every possible 20-character string would need more slots than there are atoms on Earth". For lowercase letters that's 26²⁰ ≈ 2 × 10²⁸, and even 95 printable characters give only about 4 × 10³⁹. I thought there are roughly 10⁵⁰ atoms on Earth, so this seems wrong unless "character" means something much larger than I assume.

#### ds4: Balanced search trees

6. "More precisely, an AVL tree's height is at most about 1.44 log₂ n". The constant 1.44 appears without derivation. The step from n ≥ c · φʰ to 1.44 log₂ n isn't shown, and the CODE avl_tree tests check "the AVL bound" without saying exactly which formula.
7. "Python programmers often keep a sorted list and use the bisect module". The bisect module hasn't been shown. I don't know its functions or how to call them.
8. P3: "counts the keys k in a BST with lo ≤ k ≤ hi … What is its cost on a balanced tree when the answer is k?" The same letter k is used both for a key and for the size of the answer, so I wasn't sure which one the cost should be in terms of.

#### ds5: Heaps and priority queues

9. "Half the nodes are leaves (height 0, and skipped), a quarter have height 1" contradicts Lesson 4's convention, "self.height = 1          # a single node has height 1", and this lesson's own "A heap of n items has height ⌊log₂ n⌋ + 1 levels". I couldn't tell which height convention the heapify sum uses.
10. "(The series Σ_(h≥1) h/2ʰ = 2, a standard sum…)". This sum wasn't derived here and I don't remember it from MATH 131, so the O(n) proof rests on a fact I can't check.

#### ds6: Sorting

11. "(Stirling's formula … gives the precise value, about n log₂ n − 1.44n.)" I can't see how Stirling's formula turns into n log₂ n − 1.44n. That step is skipped.
12. "keeping three indexes lt, i and gt" (CODE quicksort3 hint). The three-way partition is never shown. I don't know what each index marks or how each one moves when a[i] is less than, equal to or greater than the pivot.
13. "To keep the recursion shallow, recurse on the smaller part and loop on the larger one." The notes never show how to replace a recursive call with a loop, so I don't know how to write this.
14. P3: "Can you find a strategy that achieves it?" (7 comparisons for 5 items). Nothing in the lesson suggests how to build such a strategy, and I couldn't get started. (blocking)

#### ds8: Union-find, tries, and choosing a data structure

15. "self.parent[x], x = root, self.parent[x]". I couldn't follow the order of this simultaneous assignment. I wasn't sure whether `self.parent[x]` on the left uses the old x or the new one.
16. "α is the inverse of the Ackermann function". The Ackermann function is never defined, so "inverse of" means nothing to me beyond "grows slowly".
17. In the summary table, "Union-find | find and union: nearly Θ(1) am. | — | Merging groups |" has fewer cells than the header (Search | Insert | Delete | Min / ordered ops | Notes). I couldn't tell which column each entry belongs to.

### CS 210 Computer Systems I

#### sy1: Bits, bytes and integers

18. "printf("%d\n", -1 < 0u);". The u suffix on 0u is never explained. I worked out from the comment that it makes 0 unsigned, but the notation itself isn't taught, and Q3 depends on it.
19. "x &= (1 << w) - 1" in `wrap` (Simulating fixed width). It uses `&` and `<<` before the "Bitwise operators" section that explains them, so I couldn't follow it when I first read it.

#### sy2: Floating point

20. "6.5 = 110.1 in binary". Binary digits after the point (½, ¼, …) and how to convert a decimal fraction to binary aren't explained. P1 (−0.75) depends on it, and I had to guess that 0.75 = 0.11₂.
21. "multiplying hundreds of small probabilities underflows floating point (CS 210 Lesson 2)" (MATH 230 ps1). This lesson never uses the word "underflow". It covers overflow to ∞ and subnormals, but not what happens to products that get too small.

#### sy3: C for Python programmers

22. "printf("%zu\n", sizeof(scores));". The list of format codes gives only %d, %f, %s and %c. %zu, and the type that sizeof returns, aren't explained.
23. "The remainder follows the quotient so that (a / b) * b + a % b == a holds in both languages". In Python, a / b is true division: (−7 / 2) * 2 + (−7 % 2) = −7 + 1 = −6, not −7. It only holds if Python's / is read as //, which the sentence doesn't say.
24. P1: "prints the Celsius equivalents … with one decimal place". The notes show only %f and never how to limit the number of decimal places. (blocking)
25. "Simulate C strings with Python bytearrays" (CODE c_strings), and "Store the bytes in a bytearray" (sy4 CODE byte_memory). The bytearray type hasn't been introduced in CS 101 or CS 102, or here. Lesson 1 only shows a bytes value printed as b'…'.
26. P2 asks for exactly the same c_div and c_mod as CODE c_division. I wasn't sure whether I was meant to do something different in P2.

#### sy4: Pointers and memory

27. P2: "Is it legal to compute &v[10]? To read v[10]?" The notes say out-of-bounds access is undefined behavior but never say whether merely computing the address one past the end is allowed. I can't answer the first part from the lesson. (blocking)
28. "out[i] = toupper(s[i]);" (P3). toupper and its header are never introduced. I'm guessing what it does from its name.
29. "dereferencing it crashes the program with a segmentation fault". The lesson never explains what a segmentation fault actually is, beyond "a crash".

#### sy5: Machine code and assembly

30. "movl    $1, %eax         # i = 1      (in rax)". The comment says rax but the instruction names %eax (and %edx for rdx). The notes never say that %eax is the low 32 bits of %rax.
31. "testq   %rdi, %rdi       # compare n with 0". I don't understand how testing a register against itself compares it with 0. What testq actually computes isn't explained.
32. P3: "explain each line of the output" for long f(long x) { return x * 8 + 1; }. The output will probably use an address form such as 1(,%rdi,8). The notes only show (%rdi,%rdi,2) in a comment and never explain the general offset(base,index,scale) syntax. (blocking)
33. "Writing it is the first problem of this lesson." The first problem listed is P1, a hand trace. The simulator is the CODE problem teaching_machine.

#### sy6: Procedures and the stack

34. "Some registers are callee-saved … The rest are caller-saved". The notes never say which registers are which, so this description can't be applied.
35. P3: "Rewrite greet safely with fgets. What happens to input longer than the buffer?" The notes only say that fgets "takes the buffer size". They don't say what happens to the extra characters or to the newline. (blocking)
36. CODE frame_sizes: "max_depth(stack_bytes, frame_bytes) that returns how many nested calls fit". stack_needed rounds each frame up to 16 bytes "(x86-64 keeps the stack 16-byte aligned)", but it isn't said whether max_depth should also round. Alignment itself isn't explained.

#### sy7: Caches and the memory hierarchy

37. "#define N 4096 / static int grid[N][N];". #define (first mentioned only in Lesson 8), static and two-dimensional C arrays have not been introduced.
38. P2: "How many lines, sets, and index bits does it have?" The notes explain index bits only for a direct-mapped cache. They never say that in a set-associative cache the index chooses a set, so I had to infer it from the later CODE problem.
39. Q5 options "Misses on first use" and "Misses caused by too large a working set". These kinds of miss, and the term "working set", are never mentioned in the lesson, so I couldn't tell whether they were real categories.

#### sy8: Linking, processes and system calls

40. "execlp("echo", "echo", "hello from echo", (char *)NULL);". Why "echo" appears twice and why the argument list ends with (char *)NULL aren't explained. pid_t, perror, waitpid and WEXITSTATUS are explained only by short comments.

### MATH 220 Linear Algebra

#### la2: Linear systems and Gaussian elimination

41. The elimination shows "R3 ← R3 + (4/5)·R2", but the text says "in the second, the multiplier −4/5 cleared the entry below the second pivot". Similarly "the multipliers 2 and −1" sit next to "R2 ← R2 − 2·R1" and "R3 ← R3 + 1·R1". I had to work out that "multiplier" means the amount subtracted. As written, the signs seem to contradict each other.
42. "rank equal to n means "one", and less means "infinite"" (CODE classify_system hint). Rank isn't defined until Lesson 5.
43. "The total is about (2/3)n³ arithmetic operations". The count isn't derived. Q4 only needs Θ(n³), but I couldn't reproduce the 2/3.

#### la4: Inverses and determinants

44. "not inv(A) @ b". The @ operator, and inv as a NumPy function, haven't been shown. The same @ appears in la8's code.
45. P4: "explain why the sign of the determinant tells whether going from (3, 1) to (1, 2) turns counterclockwise around the origin". The lesson only says that a negative determinant "flips the plane over". It never links the sign to the order of the two column vectors, and doesn't say that a triangle's area is half the parallelogram's.

#### la5: Vector spaces, bases and rank

46. "and, less obviously, the dimension of the row space too". "Row space" is never defined.

#### la6: Orthogonality and least squares

47. "A = np.column_stack([np.ones(4), x]) / coef, *_ = np.linalg.lstsq(A, y, rcond=None)". column_stack, rcond and the `coef, *_ =` unpacking aren't explained.
48. "Writing A = QR, with Q from Gram–Schmidt and R triangular". The lesson doesn't say what R contains or how to get it.

#### la7: Eigenvalues and eigenvectors

49. "its eigenvalues are ±i". Complex numbers and i haven't been covered in any course I've taken.
50. "Then AP = PD, so". The reason isn't given: column j of AP is A**v**_j = λ_j**v**_j. I had to work this out myself.
51. Q5's answer, "So pages with no outgoing links, or closed loops of pages, don't trap the surfer, and the steady state is unique". The lesson never explains why the random jump exists, and never mentions dangling pages, trapping loops or uniqueness. I could only choose it by elimination. (blocking)

#### la8: The singular value decomposition and PCA

52. "Find the eigenvectors of C (equivalently, the right singular vectors of X)". "Right singular vectors" is never defined. The lesson says the columns of V are eigenvectors of AᵀA but not what the columns of U are or how to find them.
53. "A^(T)A is symmetric, and its eigenvalues are never negative." No reason is given for either claim.
54. "C = X^(T)X/(n − 1) … (MATH 230 Lesson 4)". MATH 230 Lesson 4 defines covariance for random variables, not for data, and the n − 1 is explained only in MATH 230 Lesson 6.
55. "np.linalg.eigh(C)", "centered.T @ centered", "pts.mean(axis=0)", "vectors[:, -1]". .T, axis=0 and the [:, -1] indexing are NumPy syntax I haven't seen.

### MATH 230 Probability and Statistics for Computer Science

#### ps1: Bayes' rule in practice

56. "odds(spam | words) = odds(spam) × Π_w …". The Π product notation hasn't been introduced (only Σ has).
57. The notes say Laplace smoothing means "add 1 to every count", but CODE naive_bayes uses "(number of spam messages containing it + 1) / (number of spam messages + 2)". The + 2 in the denominator isn't explained.
58. "for each vocabulary word, the likelihood ratio … of its absence (1 − P) if it isn't [in the message]" (CODE naive_bayes). The notes only use words that are present. Using absent words as evidence is new in the problem statement.
59. "return 1 / (1 + math.exp(-log_odds))     # convert log odds back to a probability". The step from odds/(1 + odds) to this formula isn't shown.

#### ps2: Discrete distributions

60. "The count is binomial(n, λ/n), and as n → ∞ its PMF approaches the Poisson formula. (The (1 − λ/n)ⁿ factor tends to e^(−λ)…)". Only one factor's limit is given. Why C(n, k)(λ/n)ᵏ tends to λᵏ/k! is skipped.

#### ps3: Continuous random variables

61. "normal_cdf(x, mu=0, sigma=1) using math.erf, with the formula Φ(z) = (1 + erf(z/√2))/2". The erf function is never defined, so the formula is something to copy, not something I understand.

#### ps4: Joint distributions, covariance and correlation

62. "correlation is the cosine of the angle between the centered variables". I don't know what the angle between two random variables means. MATH 220 Lesson 1 defines angles only between lists of numbers.
63. "covariance(xs, ys) (dividing by n − 1, like the sample variance)" (CODE cov_corr) and "statistics.covariance … # 20.2". Sample covariance of data isn't defined in this lesson. Its n − 1 depends on the sample variance, which comes in Lesson 6.
64. Q4: "What is Var(X − Y) for independent X and Y?" It needs Var(−Y) = Var(Y), that is, how variance behaves under scaling. This lesson doesn't state it.

#### ps5: The law of large numbers and the central limit theorem

65. "Reason: E[X] ≥ E[X restricted to where X ≥ a]". The notation "E[X restricted to …]" isn't defined, so I couldn't follow the proof of Markov's inequality.
66. "For n = 1000 and ε = 0.05, that's 2e⁻⁵ ≈ 0.013, compared with Chebyshev's 0.1." Getting 0.1 from Chebyshev needs σ² ≤ 1/4 for a variable between 0 and 1, which isn't stated.

#### ps6: Estimation and confidence intervals

67. "the exact method replaces 1.96 with a value from the t distribution, 2.262 for 10 values". The t distribution isn't explained, and I don't see where 2.262 comes from.
68. "dividing by n would underestimate σ² on average by a factor (n − 1)/n". The factor is stated without any calculation.

#### ps7: Hypothesis tests and A/B testing

69. "A standard formula says … (1.96 for the significance level, 0.84 for 80% power)". Neither the formula nor the 0.84 (or 0.8416 in CODE ab_test) is derived.
70. Q4 option "Use a two-sided test", and "a two-sided p-value" in CODE ab_test. "Two-sided" and "one-sided" tests are never defined. The notes only say "(in either direction)".
71. "because a random walk often wanders across the line". "Random walk" is never defined.

#### ps8: Linear regression

72. P3: "with NumPy's numpy.polyfit, a degree-8 polynomial". NumPy and polyfit have never been taught. (blocking)

### Across courses

73. NumPy runs through MATH 220 (la1 "which you'll use for larger computations", la2 np.linalg.solve, la4 inv(A) @ b, la6 lstsq, la8 eigh) and MATH 230 ps8 P3. No course ever introduces it: how to install it, arrays, @, .T, slicing like [:, -1], axis=. A problem in MATH 230 asks me to use it.
74. Tree height has three conventions: CS 201 ds4 (a single node has height 1), ds5's heap "⌊log₂ n⌋ + 1 levels", and ds5's heapify argument (leaves have height 0).
75. The stack and heap as memory regions, and sizeof, appear in CS 201 ds2's C++ box. CS 210 explains them only in sy3 and sy4.
76. MATH 230 ps1 cites CS 210 Lesson 2 for underflow, but that lesson never uses the term (item 21).
77. MATH 220 la8 cites MATH 230 Lesson 4 for the covariance matrix with denominator n − 1. Lesson 4 defines covariance only for random variables, and n − 1 is explained in MATH 230 Lesson 6 (items 54 and 63).

## Professor's response (CS 201 and CS 210)

Thank you; these were real gaps, and two were errors. The hash-table lesson said that a table of all 20-character strings would need more slots than there are atoms on Earth, which is false (5). The C lesson stated an identity that fails with Python's `/` (23). Five problems could not be started from their lessons: the 5-item sorting question (14), the Celsius table (24), the one-past-the-end address (27), the `leaq` output (32) and the `fgets` rewrite (35). All of these are fixed. CS 201 now uses one height convention, stated in Lesson 4 (9, 74), and no longer relies on CS 210's stack and `sizeof` (2, 75). CS 210 Lesson 2 now defines underflow (21). I checked every number and code output I added or changed by running Python 3 or gcc 13 (`-Wall -Wextra`, no warnings). Five programming-problem prompts changed (`pair_sum`, `ring_queue`, `c_strings`, `byte_memory`, `frame_sizes`) and one hint (`quicksort3`). No tests or solutions changed. All 107 reference solutions still pass, and every starter still fails.

### CS 201 Data Structures

1. ds1, `pair_sum`: The prompt now says that you may use a Python `set`. Membership tests and additions take Θ(1) time on average, however large the set is, and that is what "expected" means here: an average, not a guarantee for every input. It points to Lesson 3 for how sets do this and why unlucky inputs can be slower.
2. ds2: The C++ box no longer says "on the stack"; the comment now reads "five ints, all 0, fixed size". A new sentence explains `sizeof`: it gives the number of bytes something takes. `sizeof(scores)` is 20 (five 4-byte ints) and `sizeof(scores[0])` is 4, so dividing them counts the slots. See also 75.
3. ds2: The notes' `DynamicArray` now has a `__setitem__` method, and the example assigns `a[9] = 90` (it now prints `10 16 90`, checked). A sentence lists the three special methods: `len(a)` calls `__len__`, `a[i]` calls `__getitem__(i)`, and `a[i] = x` calls `__setitem__(i, x)`.
4. ds2, `ring_queue`: The prompt now says that the constructor takes the starting capacity, `RingQueue(capacity=4)` as in the starter, so `RingQueue()` starts with 4 slots. It also says that the tests use both `RingQueue()` and `RingQueue(4)` and check only the order of the items, so any starting capacity of 1 or more works.
5. ds3: **Fixed.** You were right: there are roughly 10⁵⁰ atoms on Earth, far more than 26²⁰. The comparison is now with a human body. Strings of 20 lowercase letters alone number 26²⁰ ≈ 2 × 10²⁸, more than the atoms in a human body (about 7 × 10²⁷). At 8 bytes per slot the table would need about 1.6 × 10²⁹ bytes, or 1.6 × 10¹⁷ terabytes (checked: 26²⁰ = 1.993 × 10²⁸).
6. ds4: The step is now shown. Taking log₂ of n ≥ c · φʰ gives log₂ n ≥ log₂ c + h log₂ φ, so h ≤ (log₂ n − log₂ c)/log₂ φ. Since 1/log₂ φ ≈ 1.44 (checked: 1.4404), h is at most 1.44 log₂ n plus a constant. The lesson also states the exact bound that `avl_tree` checks, h < 1.44 log₂(n + 2), and calls it "the AVL bound". I checked that it holds for the sparsest AVL tree of every height up to 79, and so for every AVL tree.
7. ds4: `bisect` is now explained, with a short example. `bisect.bisect_left(xs, x)` returns the position where `x` belongs in a sorted list, in Θ(log n), and `bisect.insort(xs, x)` inserts it there, in Θ(n) because later items shift. The example prints `2` and `[10, 20, 25, 30, 40]` (checked).
8. ds4, P3: The key is now called *x*, and the answer size has its own letter: the tree holds *n* keys and *m* of them lie in the range. The question asks for the cost in terms of *n* and *m*, and the answer is O(log n + m).

9. ds5: Lesson 4 now states the course's convention once. A tree's height is the number of *nodes* on its longest path from the root down to a leaf, so a single node has height 1 and an empty tree 0. It notes that CS 102 counted edges, so its heights are one less, and that the choice changes no Θ or O bound. This convention matches Lesson 4's code and the `avl_tree` tests. The heap's height is now "⌊log₂ n⌋ + 1 (counting nodes, as in Lesson 4: a heap of 7 items has 3 full levels and height 3)". The heapify argument now uses the same convention. A node of height h can sift down at most h − 1 levels, so leaves (height 1) cost nothing, nodes of height 2 cost at most 1 swap, and so on. The sum is unchanged. The decision-tree argument in Lesson 6 no longer says "height". It now speaks of the largest number of comparisons on a root-to-leaf path, which avoids a third meaning.
10. ds5: The sum is now derived in place. Let S = 1/2 + 2/4 + 3/8 + …. Then S/2 = 1/4 + 2/8 + …, and subtracting term by term gives S − S/2 = 1/2 + 1/4 + … = 1, so S = 2. The lesson notes that the subtraction is valid because S converges. MATH 131 Lesson 4 proves this with the ratio test, in a practice problem about this very series.
11. ds6: The conversion is now shown. MATH 131 Lesson 1 gives ln n! ≈ n ln n − n. To change to base 2, divide by ln 2: log₂(n!) ≈ n log₂ n − n/ln 2, and 1/ln 2 ≈ 1.44 (checked: 1.4427).
12. ds6, `quicksort3`: The hint now explains the three-way partition fully. It says what `a[lo..lt-1]`, `a[lt..i-1]`, `a[i..gt]` and `a[gt+1..hi]` hold at every step, and how each index moves when `a[i]` is less than, equal to or greater than the pivot. It explains why `i` doesn't move after a swap with `a[gt]`. It also says that the equal items end in `a[lt..gt]`, already in their final places. It adds that the function may take extra parameters with defaults, as the reference solution does.
13. ds6: The notes now show the technique in a new function, `quicksort_shallow`. The body goes in a `while lo < hi` loop. The function recurses on the smaller part, then changes `lo` or `hi` so that the next pass of the loop sorts the larger part. Each recursive call gets at most half the range, so the depth is at most log₂ n. On a sorted 2,000-item list it returns the sorted list with no `RecursionError` (checked; the plain `quicksort` fails there). The `quicksort3` hint points to it.
14. ds6, P3: **Fixed (was blocking).** The question now asks you to complete a strategy given in a new hint, and to check that it never needs more than 7 comparisons. The hint: compare a with b and c with d; compare the two larger items, so that a < b < d and c < d; insert e into a, b, d by binary search, starting with b; then insert c into the part before d. The answer counts the comparisons: 3 + 2 + 2 = 7. A program tried all 120 orders of five items, and none needed an eighth comparison.
15. ds8: The tuple assignment is gone. Path compression is now three plain lines, each with a comment: remember `self.parent[x]` in `next_x`, point `x` at the root, then move `x` to `next_x`. The example still prints `True False` (checked).
16. ds8: Added a short description of the Ackermann function. In the version used for Tarjan's bound, its values at k = 0, 1, 2, 3 are 2, 3, 7 and 2047, and its value at 4 is larger than 2²⁰⁴⁸, which has more than 600 digits. These were checked by computing the definition. α(n) is the smallest k whose value is at least n, which is why α(n) ≤ 4 in practice. The lesson says that only this fact is needed, not the definition.
17. ds8: Partly a dump artifact (see the note at the top of the review), but the row now has a cell for every column, so it reads the same on the page and in the text: Search "find: nearly Θ(1) am.", Insert "union: nearly Θ(1) am.", Delete "not supported", Min / ordered ops "not supported", Notes "Merging groups".

### CS 210 Computer Systems I

18. sy1: The paragraph after the program now explains the suffix. The `u` in `0u` makes the constant unsigned: `0u` is 0 with type `unsigned int`, while plain `0` is a signed `int`.
19. sy1: Before `wrap`, the notes now explain the two operators it uses and point ahead to the full table. `1 << w` is 2ʷ, so `(1 << w) - 1` is w ones in binary. `x & m` keeps the bits of x where m has a 1. So `x & ((1 << w) - 1)` keeps the low w bits, which is x mod 2ʷ.
20. sy2: Added a paragraph on binary fractions. The places after the point are worth ½, ¼, ⅛, …, so 110.1₂ = 4 + 2 + ½ = 6.5. To convert a decimal fraction, double it repeatedly, and each whole-number part is the next digit. It works 0.75 through: 1.5 gives 1, then 1.0 gives 1, so 0.75 = 0.11₂. That's what P1 needs.
21. sy2: The subnormal bullet now defines **underflow** (also added to the key terms). A result smaller than the smallest subnormal, about 1.4 × 10⁻⁴⁵ in single precision or 4.9 × 10⁻³²⁴ in double, rounds to 0. Losing tiny results this way, first to subnormals with fewer digits and then to 0, is underflow. In Python, `1e-200 * 1e-200` is `0.0`. Multiplying hundreds of probabilities underflows the same way, which is why such programs add logarithms instead. The values were checked: 2⁻¹⁴⁹ = 1.401 × 10⁻⁴⁵, 2⁻¹⁰⁷⁴ = 4.94 × 10⁻³²⁴, and the product is 0.0. MATH 230's citation is handled in the math response.
22. sy3: The `printf` bullet now also lists `%u` (unsigned int), `%ld` (long) and `%zu` (`size_t`). The Types section says that `sizeof` gives a type's or a variable's size in bytes. Its result has type `size_t`, an unsigned integer type for sizes and counts, printed with `%zu`.
23. sy3: **Fixed.** The sentence now gives each language its own identity. In C it is `(a / b) * b + a % b == a`. In Python, where `/` is true division, it is `(a // b) * b + a % b == a`. Because the quotients differ for negative numbers, so do the remainders.
24. sy3, P1: **Fixed (was blocking).** The `printf` bullet now explains precision: `printf("%.1f", 2.0 / 3)` prints `0.7`, `%.2f` prints `0.67`, and plain `%f` prints six places, `0.666667`. All three were checked with gcc.
25. sy3 `c_strings`, sy4 `byte_memory`: The `c_strings` prompt now introduces `bytearray`. It is a changeable, list-like sequence of bytes. `bytearray(6)` makes six zero bytes and `bytearray(b"hi\x00")` copies a bytes value, where `\x00` is the zero byte. Indexing gives a number from 0 to 255 (`buf[0]` is 104 for `h`, checked). Items can be assigned, and `len` works. The `byte_memory` prompt says to store the memory in `bytearray(size)` and points back to that explanation.
26. sy3, P2: P2 is now a different exercise. Without running anything, you work out C's `/` and `%` and Python's `//` and `%` for the four sign combinations, check each language's identity, and state the sign rule for each. It names the programming problem *C's integer division* as the place to write the code. The answer lists both sets of results (checked with gcc and Python).
27. sy4: **Fixed (was blocking).** The pointer-arithmetic section now answers it. C allows a pointer exactly one past the end of an array: `nums + 3`, or `&nums[3]`, may be computed and compared, and loops use it as a stopping point. Dereferencing it is undefined behavior. So is computing any address further out, such as `nums + 4` or `nums - 1`, even though it usually seems to work.
28. sy4, P3: The question now explains `toupper(c)`, from `<ctype.h>`. It returns the uppercase form of a lowercase letter and any other character unchanged, so `toupper('a')` is `'A'` and `toupper('!')` is `'!'`. It also says to assume the needed headers are included.
29. sy4: Segmentation faults are now explained, and the term is in the key terms. The operating system gives each program only certain ranges of addresses, never including 0. Touching an address outside them makes the hardware stop the access and the operating system end the program, and the shell prints `Segmentation fault`. Lesson 8 is named for how each program gets its own addresses.
30. sy5: A new bullet after the loop says that `%eax` is the name for the low 32 bits of `%rax`, and `%edx` for the low 32 bits of `%rdx`. These 32-bit names go with 32-bit instructions such as `movl`, so `movl $1, %eax` sets rax to 1.
31. sy5: Another bullet explains `testq a, b`. It computes a AND b, discards the result and keeps the flags, which say whether the result was zero or negative. Since n AND n is n, `testq %rdi, %rdi` compares n with 0, and `jle` jumps if n ≤ 0. The bullet also notes that `cmpq` does the same with a subtraction.
32. sy5, P3: **Fixed (was blocking).** After the first example, the notes now explain the general form `offset(base,index,scale)`. It stands for offset + base + index × scale, with scale 1, 2, 4 or 8, and any part may be left out. The examples are `(%rdi,%rdi,2)`, `8(%rsp)` and `4(,%rsi,8)`. The notes also explain that `leaq` computes this number without touching memory. The P3 answer now uses the same words: `leaq 1(,%rdi,8), %rax` is 1 + 8 · rdi. gcc 13 at `-O1` gives exactly that line, then `ret` (checked).
33. sy5: Now reads "Writing it is this lesson's first programming problem, *Simulating the teaching machine*."
34. sy6: The calling-convention bullet now lists the registers. The callee-saved ones are `%rbx`, `%rbp` and `%r12`–`%r15`, plus `%rsp`, which every function must leave as it found it. The caller-saved ones are `%rax`, `%rcx`, `%rdx`, `%rsi`, `%rdi` and `%r8`–`%r11`. The bullet adds that a caller that needs a caller-saved value after a call must save it first, for example by pushing it.
35. sy6, P3: **Fixed (was blocking).** The notes now describe `fgets` fully. With an n-byte buffer, it reads until a newline or n − 1 characters, whichever comes first, and then adds the terminator. The newline is kept if the line fits. The rest of a long line, newline included, stays unread for the next read. It returns `NULL` when no input is left. I checked this with gcc: with a 16-byte buffer, a 26-letter line gave "abcdefghijklmno" (15 characters), and the next call read the remaining 11 letters and the newline.
36. sy6, `frame_sizes`: The prompt now explains alignment. At every `call` the stack pointer must hold a multiple of 16, because some instructions that move large values need such addresses, so compilers pad each frame to a multiple of 16. It also says plainly that `max_depth` doesn't round: `frame_bytes` is already the full, padded size. This matches the existing test `max_depth(100, 30) == 3`.
37. sy7: A paragraph at the start of "Loop order matters" introduces the three new pieces. `#define N 4096` names a constant that is replaced before compiling (Lesson 8 shows the stage). `int grid[N][N]` is a two-dimensional array, N rows of N ints in one block, indexed `grid[r][c]`. And because `grid` is declared outside any function, it is a global, in the fixed region from Lesson 4, not on the 8 MB stack. The `static` in front keeps the name private to the file.
38. sy7: The set-associative paragraph now says that the address has the same three fields, but the index chooses a *set*. With S sets there are log₂ S index bits, and the tag is compared with every slot of that set. It defines "k-way" and notes that direct-mapped is the 1-way case. P2's answer (64 sets, 6 index bits) follows directly.
39. sy7: The notes now name the three kinds of miss. A **compulsory** miss is on a line's first use. A **capacity** miss happens when the **working set**, the data a program uses during a stretch of time, is larger than the cache. A **conflict** miss is the one in the worked example. The notes also say which remedy fits each: associativity for conflict misses, a bigger cache for capacity misses. Q5's choices now use these names, and its explanation says why the other two kinds don't depend on associativity.
40. sy8: After the program, a new list explains each name. `pid_t` is the type for process IDs, and `getpid()` returns the current one. `execlp` searches the command folders (the `p`) for a program and takes its arguments as a list (the `l`). Those arguments become the new program's command-line arguments, like Python's `sys.argv`, and argument 0 is by convention the program's name, so `"echo"` appears twice. The list ends with a null pointer because a C function can't count its arguments, and the `(char *)` cast gives that `NULL` the right type. `perror` prints a message about the last error, for example `execlp: No such file or directory` (checked), and runs only if exec failed. `waitpid(pid, &status, 0)` waits for that child and stores how it ended through the pointer. `WEXITSTATUS` extracts the exit code. The program compiles with `gcc -Wall` without warnings and prints the three lines shown (checked).

### Across courses

74. See item 9. CS 201 now has one convention, stated in Lesson 4: height counts nodes, a single node has height 1, and CS 102's edge count is one less. Lesson 5's heap height and heapify argument use it, and Lesson 6's decision-tree argument now counts comparisons instead of using "height".
75. CS 201 Lesson 2's C++ box no longer mentions the stack, and it explains `sizeof` in place (item 2). It no longer depends on CS 210 Lessons 3 and 4, which run in the same term.

## Professor's response (MATH 220 and MATH 230)

Thank you. Every item was a real gap, and one problem could not be started at all: Lesson 8 of MATH 230 asked for `numpy.polyfit`, which no course had taught (72). The largest fix is item 73. MATH 220 Lesson 1 now ends with "NumPy in five minutes". Later NumPy code in both courses uses only what that section shows, plus one `np.linalg` function per lesson (or `np.polyfit` in MATH 230), each explained where it appears and pointing back to the section. Graded programming problems still use only plain Python, because they run in the browser. Several results the lessons stated without reason now have short derivations: the (2/3)n³ count, AP = PD, the nonnegative eigenvalues of AᵀA, the Poisson limit, Φ from erf, Markov's inequality, the (n − 1)/n bias and the sample-size formula. Results whose proofs are beyond the course are now labeled as stated without proof, each with a check the student can run: the spectral theorem, Perron–Frobenius and the *t* values. I checked every number and code output I added or changed by running Python (NumPy 2.5). The four programming problems I touched (`classify_system`, `normal_tools`, `cov_corr`, `ab_test`) changed only in their prompts or hints, and all 107 reference solutions still pass while every starter still fails.

### MATH 220 Linear Algebra

41. la2: The lesson now defines the **multiplier**: the entry to be cleared divided by the pivot. Each step *subtracts* the multiplier times the pivot row. The multipliers are 2/1 = 2 and −1/1 = −1 in the first step, so "subtract −1 × R1" is written R3 ← R3 + 1·R1. The second step's multiplier is 4/(−5) = −4/5, which means adding 4/5 × R2. The signs in the text and in the display now match.
42. la2, `classify_system`: The hint no longer says "rank". It says: if every one of the n columns got a pivot (`r == n`), the answer is "one", and if some column is free, it is "infinite". It adds that Lesson 5 will call the number of pivots the rank.
43. la2: The count is now derived. Clearing column k changes about (n − k + 1)² entries, with two operations each, so the total is about 2(1² + … + n²). That sum is close to ∫₀ⁿ x² dx = n³/3 (MATH 130); its exact value is n(n + 1)(2n + 1)/6. The total is therefore about (2/3)n³.
44. la4: The callout now names the functions in full and explains them: `np.linalg.solve(A, b)` (Lesson 2) versus `np.linalg.inv(A) @ b`, which first computes the inverse with `np.linalg.inv` and then multiplies by **b** with `@`. Lesson 1's NumPy section covers `@`, including on 2-D arrays. That covers la8's `@` as well.
45. la4, P4: A new paragraph connects the sign to the order of the columns. det [**e**₁ **e**₂] = 1 for the counterclockwise turn from **e**₁ to **e**₂. det [**u** **v**] is positive when the shorter turn from **u** to **v** is counterclockwise, negative when it is clockwise, and zero when the two vectors are on one line. Swapping the columns changes the sign (det [**e**₂ **e**₁] = −1). The paragraph gives the reason, ad − bc = ‖**u**‖‖**v**‖ sin(β − α). It also says that the triangle 0, **u**, **v** is half the parallelogram, so its area is |det|/2.
46. la5: The lesson now defines the **row space**: the span of the rows, a subspace of ℝⁿ. It also says why its dimension is the rank. Row operations replace rows by combinations of rows, so they never change the row space, and the nonzero echelon rows, one per pivot, are independent and span it. Added to the key terms.
47. la6: A paragraph before the code explains `np.ones(4)` and `np.column_stack`. It explains that `lstsq` returns four things and `[0]` keeps the solution, and that `rcond=None` selects NumPy's recommended rule for when a tiny number counts as zero (older versions warn without it). The `coef, *_ =` unpacking is replaced by `[0]`. The code now also prints `A.shape`, (4, 2). Both outputs checked.
48. la6: QR now has its own paragraph. Q holds the Gram–Schmidt vectors, so QᵀQ = I even when A isn't square. Column j of R holds the dot products **q**ᵢ · **a**ⱼ for i ≤ j and zeros below them, so R is triangular, with the Gram–Schmidt lengths on its diagonal. R = QᵀA. For the lesson's example, R = [5 0.6; 0 0.8], which I checked against `np.linalg.qr` (equal up to sign). A second paragraph shows that the normal equations become Rx̂ = Qᵀb, which back substitution solves.
49. la7: I avoided complex numbers. The text now says that an n × n matrix has at most n eigenvalues and may have fewer real ones. The 90° rotation [0 −1; 1 0] is the example: its characteristic equation λ² + 1 = 0 has no real solution, which matches the picture of a rotation stretching no direction. A parenthesis says that complex numbers, which the course doesn't use, extend the theory. It also says that every eigenvalue example and problem in the course has real eigenvalues. *i* no longer appears.
50. la7: AP = PD is now shown column by column. Column j of AP is A**v**ⱼ = λⱼ**v**ⱼ. Column j of PD is P times λⱼ**e**ⱼ, which is also λⱼ**v**ⱼ. Then P is invertible because its columns are independent, which gives A = PDP⁻¹.
51. la7, Q5: **Fixed (was blocking).** A new section, "Why the random jump?", covers three things. The first is dangling pages, which have no links out; the usual rule, which the programming problem uses, is to jump from them. The second is traps, groups of pages that link only to one another: all the probability ends up in them, and every other page gets rank 0. The third is uniqueness. With two traps (A↔B and C↔D), every mixture (t/2, t/2, (1 − t)/2, (1 − t)/2) is a steady state, so the ranking would depend on the start. The section then explains how the jump fixes all three. Every page can be reached with probability at least 0.15/N, and the Perron–Frobenius theorem, stated without proof, then gives one steady state, which power iteration reaches from any start. Students can check this on the trap example, where the jump gives (0.25, 0.25, 0.25, 0.25) from any start. I checked that from two starting vectors.
52. la8: The lesson now defines **right singular vectors** (the columns of V, the orthonormal eigenvectors of AᵀA) and **left singular vectors** (the columns of U). It shows how to get U: **u**ᵢ = A**v**ᵢ/σᵢ, because AV = UΣ. It also says why σᵢ = ‖A**v**ᵢ‖ and that the **u**ᵢ are eigenvectors of AAᵀ. In PCA, the lesson now says why the eigenvectors of C are the right singular vectors of X: C is XᵀX divided by a number. Both terms are added to the key terms.
53. la8: Both claims are now proved. AᵀA is symmetric by (BC)ᵀ = CᵀBᵀ from Lesson 3. If AᵀA**v** = λ**v** with **v** a unit vector, dotting both sides with **v** gives λ = ‖A**v**‖² ≥ 0. The lesson also states the spectral theorem without proof (real eigenvalues and an orthonormal eigenvector basis for any symmetric matrix) and says that `np.linalg.eigh` can be used to check it on examples.
54. la8: The citation is replaced by an explanation in place. Entry (j, k) of XᵀX is the sum, over the points, of the products of the deviations of measurements j and k. Divided by n − 1, it is the **sample covariance**, and on the diagonal it is the **sample variance**. The pointer now reads: MATH 230 Lesson 4 defines covariance for random variables and gives these data versions (added there; see 63), and MATH 230 Lesson 6 explains n − 1. The text adds that dividing by n instead would not change the PCA directions. The code now prints C, [[2.5 2.5] [2.5 2.8]] (checked).
55. la8: Every piece of syntax is now explained, either in Lesson 1's new NumPy section (`.T`, `axis=0`, `[:, -1]`, subtracting a row from every row, `@`) or in the sentence before the code (`eigh` returns eigenvalues in increasing order and eigenvectors as *columns*, so `vectors[:, -1]` is the eigenvector of the largest eigenvalue; `np.round`). All outputs checked.

### MATH 230 Probability and Statistics for Computer Science

56. ps1: Added that Π (capital pi) means a product, just as Σ means a sum, and that Π_w multiplies the ratio for every word in the email.
57. ps1: The notes now explain the + 2. Each spam message either contains the word or doesn't, so there are two counts, and adding 1 to each adds 2 to the total. With *c* of *s* spam messages containing the word, the estimate is (c + 1)/(s + 2). It is as if two extra messages had been seen, one with the word and one without. This is the formula the programming problem uses.
58. ps1: A new paragraph explains that a word's absence is evidence too. "winner" absent has likelihood ratio (1 − 0.20)/(1 − 0.01) ≈ 0.81 (checked), weak evidence against spam. It gives the general rule, P/P for a present word and (1 − P)/(1 − P) for an absent one, and says that the programming problem uses both.
59. ps1: Added the derivation after the code. The odds are o = e^L, and p = o/(1 + o) solves o = p/(1 − p). Dividing the top and bottom by e^L gives 1/(1 + e^(−L)). The text notes that this form avoids computing e^L itself, which overflows for very large L.
60. ps2: The limit is now done in full. The binomial probability splits into four factors: [n(n − 1)⋯(n − k + 1)/nᵏ] · λᵏ/k! · (1 − λ/n)ⁿ · (1 − λ/n)^(−k). The first factor is k fractions that each tend to 1. The second doesn't depend on n. The third tends to e^(−λ), and the fourth to 1.
61. ps3: The lesson now defines Φ and the **error function**, erf(x) = (2/√π)∫₀ˣ e^(−t²) dt. It derives Φ(z) = (1 + erf(z/√2))/2 from the symmetry of the density and the substitution x = √2 t, and gives a check: both formulas give 0.97725 at z = 2 (checked). The `normal_tools` prompt now says the notes explain erf and this formula. Added to the key terms.
62. ps4: The angle is now explained with data. The centered lists of x and y values are vectors in ℝⁿ, and r is the cosine of the angle between them (MATH 220 Lesson 1). That explains why r is between −1 and 1, and why it is ±1 exactly when the points lie on a line. For random variables, −1 ≤ ρ ≤ 1 is now proved without any angles: 0 ≤ Var(U ± V) = 2 ± 2ρ for the standardized variables U and V. The text notes that this is Cauchy–Schwarz with covariance in place of the dot product.
63. ps4: The lesson now defines the **sample covariance**, s_xy = Σ(xᵢ − x̄)(yᵢ − ȳ)/(n − 1), and the **sample correlation**, r = s_xy/(s_x s_y). It says that n − 1 is a small correction explained in Lesson 6, that r is the same with n or n − 1, and that `statistics.covariance` and `statistics.correlation` compute these (20.2 and 0.994, checked). The `cov_corr` prompt now says "the sample covariance and sample correlation of two lists of data, as defined in the notes". Added to the key terms.
64. ps4: The lesson now states and proves Var(aX + b) = a² Var(X). From it, Var(−Y) = Var(Y) and Cov(X, −Y) = −Cov(X, Y), which give Var(X − Y) = Var X + Var Y − 2 Cov(X, Y). It also shows where the 2 Cov in the variance of a sum comes from.
65. ps5: The proof of Markov's inequality is now a chain of sums, with each step explained: E[X] = Σ x P(X = x) ≥ Σ over x ≥ a of x P(X = x) ≥ Σ over x ≥ a of a P(X = x) = a P(X ≥ a). Dropping terms is allowed because none is negative (X ≥ 0). The proof also notes that integrals replace the sums for a continuous X.
66. ps5: The 0.1 is now derived. For 0 ≤ X ≤ 1, X² ≤ X, so Var(X) ≤ μ − μ² = μ(1 − μ) ≤ 1/4. Then σ²/(nε²) ≤ 0.25/(1000 × 0.05²) = 0.1. Hoeffding's 2e⁻⁵ = 0.0135 is checked.
67. ps6: A new paragraph, "Small samples and the *t* distribution", explains the idea and gives some history. *s* varies from sample to sample, so the interval is sometimes too narrow. Gosset ("Student", 1908) found the distribution of (x̄ − μ)/(s/√n) for normal data: bell-shaped, with heavier tails, and with n − 1 degrees of freedom. The values are labeled as stated without proof: 2.776, 2.262, 2.045 and 1.984 for n = 5, 10, 30 and 100. A short simulation finds the 97.5th percentile of 100,000 simulated statistics: 2.27 with the lesson's seed, and 2.24 to 2.28 with other seeds (run). The interval 1.2 ± 2.262 × 0.0816 = 1.02 to 1.38 is checked. Added to the key terms.
68. ps6: The factor is now derived. Writing xᵢ − μ = (xᵢ − x̄) + (x̄ − μ) and squaring gives Σ(xᵢ − x̄)² = Σ(xᵢ − μ)² − n(x̄ − μ)², because the cross terms sum to 0. Taking expectations with Var(x̄) = σ²/n (Lesson 5) gives (n − 1)σ².
69. ps7: The formula is now derived. D, the observed difference, is approximately N(δ, SE²) with SE² = (p₁(1 − p₁) + p₂(1 − p₂))/n, using Lesson 5's variance of a proportion and Lesson 4's Var(X − Y). Power is P(D > 1.96 SE) = P(Z > 1.96 − δ/SE). 0.84 is the 80th percentile of the standard normal (`NormalDist().inv_cdf(0.8)` = 0.8416, checked), so 80% power needs δ = (1.96 + 0.84)SE, and solving for n gives the formula. The text names the two approximations it makes. The `ab_test` prompt now says that its formula is the one derived in the notes, with 0.8416 as the 80th percentile.
70. ps7: The lesson now defines **two-sided** and **one-sided** tests, right after the z-test. A two-sided test counts extremes in either direction, and is the usual default. A one-sided test counts only a direction chosen in advance, and its p-value is half the two-sided one when the distribution is symmetric: about 0.038 here (checked). It warns that choosing the direction after seeing the data is p-hacking. The `ab_test` prompt points to this definition. Added to the key terms.
71. ps7: The lesson now defines a **random walk**: a quantity that takes a random step up or down each time new data arrives. It explains that the difference between the groups, recomputed each day, behaves like one, so it often strays far enough for the p-value to dip below 0.05 at some point.
72. ps8, P3: **Fixed (was blocking).** The overfitting section now explains `np.polyfit(xs, ys, d)` (MATH 220 Lesson 6's least squares with columns 1, x, …, x^d, coefficients highest power first) and `np.polyval`, with a checked example: fitting (0, 1), (1, 3), (2, 7) gives [1. 1. 1.]. It points to MATH 220 Lesson 1 for installing and using NumPy. P3 now defines mean squared error and has a hint: the split `xs[0::2]` / `xs[1::2]`, an `mse(predict, …)` helper, and the two `predict` functions. Its answer is now runnable code. With seed 2, the line's error is 0.074 on the training points and 0.15 on the test points, and the polynomial's is 0.001 and 0.841 (checked, with no NumPy warnings). The course policy now says that this one practice problem uses NumPy.

### Across courses

73. **One approach, applied everywhere.** MATH 220 Lesson 1 ends with "NumPy in five minutes". It covers installing with `python3 -m pip install numpy` (or `py -m pip` on Windows) and what pip is; `np.array`; element-wise `+`, `*` and scaling, compared with lists; `@` as the dot product and, for 2-D arrays, the matrix product; `np.sqrt`; `shape`; 1-D and 2-D indexing, including `M[0, 2]`, `M[:, 0]` and `M[:, -1]`; `.T`; `mean(axis=0)` and `mean(axis=1)`; subtracting a row from every row; and how NumPy prints arrays. Every output was checked. The section ends with a list of the functions later lessons use: `solve` (Lesson 2), `inv` (Lesson 4), `lstsq` (Lesson 6), `eigh` (Lesson 8) and `np.polyfit` (MATH 230 Lesson 8), each explained where it appears. Each of those lessons now refers back to the section, and so do both courses' software policies. Lesson 1's earlier sentence "which you'll use for larger computations" now says "introduced at the end of this lesson". Two key terms were added: NumPy array and element-wise. For item 72, see above. All graded problems still use plain lists.
76. ps1 (see item 21): The lesson now explains underflow where it uses it. A float can't hold a positive number below about 5 × 10⁻³²⁴, and smaller results round to exactly 0: `0.01 ** 200` should be 10⁻⁴⁰⁰ but prints `0.0` (checked). The lesson explains why adding logarithms avoids this, and adds underflow to the key terms. The pointer now says only what CS 210 Lesson 2 provides: "CS 210 Lesson 2 shows how floats are stored and where their range ends". It stays accurate whether or not that lesson uses the word.
77. la8 and ps4: see 54 and 63. la8 now explains the sample covariance and variance of data itself, and says which MATH 230 lessons cover the random-variable version (Lesson 4) and the n − 1 (Lesson 6). MATH 230 Lesson 4 now defines the data versions.
