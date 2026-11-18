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
