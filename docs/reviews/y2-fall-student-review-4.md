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
