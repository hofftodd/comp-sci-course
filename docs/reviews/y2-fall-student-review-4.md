# Student review: Year 2 Fall

*Round 4. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a second-year CS student. Before this term I took CS 100, WRIT 100, CS 101 and CS 102 (Programming I and II), MATH 120 and MATH 121 (Discrete Mathematics I and II), MATH 130 and MATH 131 (Calculus I, and Calculus II with multivariable), and PHYS 150 (mechanics with computation). I read CS 201, CS 210, MATH 220 and MATH 230 in order, lesson by lesson, and tried each quiz and practice problem in my head. Most of it I could follow and do from the notes. The items below are the places where I got stuck or confused.

### CS 201 Data Structures

#### ds4: Balanced search trees

1. "Working with the exact values of N(h) instead of the constant c gives a bound with nothing added: h < 1.44 log₂(n + 2) for every AVL tree. This is "the AVL bound" that the programming problem checks." The notes derive h ≤ (log₂ n − log₂ c)/log₂ φ with an unknown constant c, then state this exact bound without the calculation. I couldn't see where the "+ 2" comes from, or why the constant term disappears.

#### ds6: Sorting

2. In the summary table, "Insertion sort | Θ(n²) | Θ(n²)" gives Θ(n²) for the average case. The lesson only shows that the cost is Θ(n + I) and works out the best and worst cases. It never says how many inversions a random list has on average, so I couldn't check the average-case entry.

#### ds8: Union-find, tries, and choosing a data structure

3. In the comparison table, "Trie | Θ(L) | Θ(L) | Θ(L)" gives a delete cost, but the Trie class in the notes has no delete, and the lesson never says how to remove a word. I couldn't tell whether deleting means clearing is_word or also removing nodes that no longer lead to any word.

4. "find out where the time goes (a profiler shows which functions take it)". The lesson never explains or shows a profiler, so I don't know what tool this is or how to run one.

### CS 210 Computer Systems I

#### sy1: Bits, bytes and integers

5. In the bit_tricks hint: "the lowest set bit is what it cleared, x - (x & (x - 1)) (or x & -x)". The first form follows from the notes, but nothing explains why x & -x gives the lowest set bit. With Python's unlimited-width integers I'm not sure what bit pattern −x even has.

#### sy7: Caches and the memory hierarchy

6. "every page of it is mapped to one shared page of zeros (Operating Systems explains this)". The word "page" is never defined. I couldn't tell how big a page is or how it relates to the cache lines in this lesson.

7. The example output is "total 137405399040", but the program adds the grid into the same total in both summing loops, so this is twice the grid's sum. The notes say "Both loops add the same 16 million numbers" and don't mention the doubling. I had to work out the sum myself to see why the number is twice what I expected.

#### sy8: Linking, processes and system calls

8. In the linker programming problem, the example object file is {"name": "main.o", "defines": ["main"], "uses": ["printf", "average"]}. Under the stated rule, if no object defines printf, link must raise "undefined reference". The notes say printf comes from a library. I couldn't tell whether the tests expect a library object that defines printf to be passed in, or whether printf in the example is only there to show the format.

### MATH 220 Linear Algebra

#### la1: Vectors, linear combinations and the dot product

9. "Since |cos θ| ≤ 1, it follows that |u · v| ≤ ‖u‖ ‖v‖, the Cauchy–Schwarz inequality … (It can also be proved directly from the algebra, without angles, which is what justifies the angle definition in high dimensions.)" In n dimensions the angle is defined by the dot-product formula, so deriving Cauchy–Schwarz from |cos θ| ≤ 1 looks circular. The direct proof that is supposed to break the circle is never shown.

#### la4: Inverses and determinants

10. "Computing the inverse takes about three times as much work and is less accurate." The lesson counts elimination as about (2/3)n³ operations but never counts the work of Gauss–Jordan on [A | I], so I couldn't see where "three times" comes from.

#### la8: The singular value decomposition and PCA

11. "The u_i are also the eigenvectors of AA^(T)." This is stated with no reason. Everything else in the paragraph is derived from A^(T)A, and I couldn't work out why the u_i are eigenvectors of the other product, or what their eigenvalues are.

### MATH 230 Probability and Statistics for Computer Science

#### ps7: Hypothesis tests and A/B testing

12. "The z-test below is not exact: its p-value uses the normal approximation from the CLT". The z-test for two proportions appears above this paragraph, in the earlier section "The z-test for two proportions". Nothing after it is called a z-test, so I wasn't sure whether "below" meant a different test that I was supposed to look for.

### Across courses

No problems spanning courses beyond those listed above. Each time a symbol is reused (α as load factor, inverse Ackermann function and significance level) or a convention changes (tree heights counted in nodes, union-find depth in edges), the lesson says so where it happens.

## Professor's response

1. **ds4, exact AVL bound.** Added a short derivation after the constant-c argument (data/cs201.js): adding 1 to the recurrence shows N(h) + 1 = F(h+2); induction with φ² = φ + 1 gives F(k) ≥ φ^(k−2); so n + 1 ≥ φ^h and h ≤ log₂(n + 1)/log₂ φ ≈ 1.4404 log₂(n + 1), with no constant. The notes now say the programming problem checks the rounder h ≤ 1.44 log₂(n + 2), and that rounding 1.4404 down to 1.44 matters only above height about 1,100 (more than 2^700 nodes). Checked numerically: minimal AVL trees first violate 1.44 log₂(n + 2) at height 1124.
2. **ds6, insertion sort average case.** Added the argument: a reversed list has all n(n − 1)/2 pairs inverted; in a random order each pair is inverted in exactly half the orders (swapping the two items pairs them up), so the average is n(n − 1)/4 inversions and the average case is Θ(n²).
3. **ds8, trie delete.** Added a paragraph after the Trie code: clear is_word at the word's last node (enough for correctness), and optionally walk back up removing nodes with no children that don't end another word, stopping at the first node still needed. Worked example with "cart" and "car" from the lesson's trie; cost Θ(L).
4. **ds8, profiler.** Defined profiler where it appears and gave the command `python3 -m cProfile -s cumulative myprog.py`.
5. **sy1, x & -x.** The bit_tricks hint (data/cs210-code.js) now explains it from the lesson's "invert and add 1": the carry runs through the low zeros and stops at the lowest set bit, so x and −x agree there and differ everywhere above. Example 12 & −12 = 4 (checked), and a note that Python's integers act as two's complement with the sign bit repeated forever to the left.
6. **sy7, page.** Defined page where it first appears: a fixed-size block of memory, usually 4 KB (64 cache lines), that the operating system hands out.
7. **sy7, doubled total.** The notes now say both loops add into the same total, so it is twice the grid's sum: 4096² × 4095 = 68,702,699,520, doubled to the printed 137,405,399,040. Compiled and ran the program with gcc -O1 to confirm the output.
8. **sy8, linker and printf.** The prompt now states that libraries get no special treatment: a library is passed in the list as an ordinary object (example given with libc.so defining printf and malloc, as in the first test), and if no object defines printf it is an undefined reference. The tests are unchanged.
9. **la1, Cauchy–Schwarz.** Replaced the parenthetical with the direct proof: expand 0 ≤ ‖u − tv‖², choose t = (u·v)/‖v‖², and conclude (u·v)² ≤ ‖u‖²‖v‖². The notes now say the |cos θ| argument is valid only in two dimensions and that the algebraic proof is what makes the n-dimensional angle well defined.
10. **la4, "three times".** Added the count in the callout: Gauss–Jordan on [A | I] clears each pivot column in all n − 1 other rows, and about n entries change in each row (n − k uncleared on the left, about k filled on the right), so n × n × n × 2 ≈ 2n³, three times elimination's (2/3)n³.
11. **la8, u_i as eigenvectors of AA^T.** Added the one-line derivation AA^T u_i = A(A^T A v_i)/σ_i = λ_i u_i, which gives the eigenvalues λ_i = σ_i².
12. **ps7, "below".** Changed "The z-test below" to "The two-proportion z-test above", since its section comes earlier.
