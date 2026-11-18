# Student review: Year 2 Spring

I'm a second-year CS student. I've finished CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220 and MATH 230. I can program comfortably in Python, I know basic data structures and some x86-64 assembly, and I've done linear algebra, probability, single- and multivariable calculus, and mechanics with Euler-style simulations. I read the four course dumps (cs220, cs230, cs240, phys250) in order and tried the quizzes and practice problems in my head.

### CS 220 Algorithms I

#### al1: Divide and conquer

1. "In the third case there are aˡᵒᵍᵇⁿ = nˡᵒᵍᵇᵃ leaves". I can't tell whether the superscript means a^(log_b n). The identity a^(log_b n) = n^(log_b a) is used without being shown, and I didn't see why the two sides are equal.
2. "x = a · 10ᵐ + b and y = c · 10ᵐ + d". The same lesson has just used a, b and d as the master-theorem parameters. In the Karatsuba section, and in the table row "3, 2, 1", I kept mixing up which a, b and d were meant.

#### al2: Greedy algorithms

3. "So swapping inversions never increases the maximum lateness, and repeatedly swapping turns any optimal schedule into the earliest-deadline one." This skips why a schedule with no adjacent inversions must be the earliest-deadline schedule. It also doesn't say what happens when two jobs have equal deadlines or when the machine sits idle.

#### al4: Dynamic programming II

4. "E[i − 1][j − 1] + [x_i ≠ y_j]". The square-bracket notation around a condition isn't explained where it first appears. Only the later remark about Python's True/False suggested it means 1 when the characters differ.

#### al5: Shortest paths

5. "the heap holds at most E entries, and the running time is O((V + E) log V)". If the heap holds up to E entries, each operation should cost log E, not log V. The step from log E to log V isn't explained.

#### al6: Minimum spanning trees

6. The notes say "the priority of a vertex is the weight of the single cheapest edge reaching it", but Q3's answer is "Edges leaving the current tree, by weight". The code pushes edges (w, v), some of which end at vertices already in the tree. I wasn't sure whether Prim's queue holds vertices or edges.

#### al8: Intractability: P, NP and coping

7. "packing a knapsack exactly (Lesson 4)". Lesson 4's knapsack maximizes value within a weight limit. It never asks for an exact packing, so I didn't know which problem this refers to.

### CS 230 Computer Architecture and Digital Logic

#### ar2: Combinational circuits: choosing and adding

8. "The carry-out is the majority function from Lesson 1: c_(out) = ab + c(a ⊕ b)." Lesson 1 wrote majority as bc + ac + ab. The lesson doesn't show why ab + c(a ⊕ b) is the same function.
9. "Real carry-lookahead adders combine (g, p) pairs in a tree, block by block, getting all carries in Θ(log n) gate levels". The notes never say how two (g, p) pairs combine into one, so I couldn't see how the tree works or where Θ(log n) comes from.

#### ar3: Sequential logic: circuits that remember

10. "It can be built from two D latches in a row, enabled on opposite halves of the clock." I couldn't work out why two latches give a circuit that samples only at the rising edge. This step isn't shown.

#### ar4: The RISC-V instruction set

11. "The registers also have ABI names". ABI isn't defined anywhere in the lesson or the key terms.
12. In the format table, the I row is "I | imm[11:0] | rs1 | funct3 | rd | opcode | addi, lw, jalr". It has one fewer field than the header's bit columns, so rs1 appears under "24–20". That contradicts the R row, where rs1 is at bits 19–15, and the claim that "registers always sit in the same bit positions in every format". I had to work out from encode_i that imm[11:0] spans bits 31–20.
13. "RISC-V has six formats", and the key term lists "R, I, S, B, U and J". Only R, I and S are shown, so I don't know how beq (used in the next lesson) or j is encoded. "ret # shorthand for jalr x0, 0(ra)" uses jalr, which is only named in the table.

#### ar5: A single-cycle processor

14. "the CS 230 labs decode real 32-bit words (Lesson 4)". No labs appear anywhere in the course material I was given.

#### ar6: Pipelining

15. "Waiting (inserting empty cycles, called stalls or bubbles) would cost two cycles." With add writing in cycle 5 and sub reading in cycle 3, I counted three cycles. The answer two seems to depend on the register file being "written in the first half of a cycle and read in the second", which is only mentioned later, under structural hazards.
16. The notes say "A 2-bit saturating counter per branch predicts 'taken' after it has been taken twice in a row", but CODE branch_predictor says "a saturating counter from 0 to 3 starting at 1: predict taken when the counter is 2 or 3". Starting at 1, a single taken outcome reaches 2 and predicts taken. I didn't know which behavior the 2-bit counter is supposed to have.

#### ar8: Parallelism and performance

17. The Apollo sidebar says "It ran at about 1 MHz (its basic machine cycle was about 12 µs)". A 1 MHz clock has a 1 µs period, so a 12 µs cycle seems to contradict "1 MHz", unless the two terms mean different things. The notes don't say.

### CS 240 Software Engineering I

#### se3: Testing in depth

18. "Boundaries: −0.1 and 0; 59.9 and 60; 69.9 and 70; and so on up to 100 and 100.1. About 14 tests". I count six boundaries (0, 60, 70, 80, 90, 100), which makes 12 values. I couldn't tell where 14 comes from.

#### se4: Design principles and refactoring

19. "instead of constructing an SMTP connection inside" (and again in Q2). SMTP isn't explained.
20. CODE money_class asks for "Money(cents) takes an int (raise TypeError for anything else, including floats and bool)". Nothing in the notes says that bool counts as an int in Python, so I didn't see why bool needs special mention or how an int check would let it through.
21. (blocking) The money_class hint says: "For times, use decimal.Decimal with ROUND_HALF_UP ... convert the rate with Decimal(str(rate))." The lesson never shows how to round a Decimal to a whole number using ROUND_HALF_UP, or where ROUND_HALF_UP is imported from. I couldn't write times from the notes alone.

#### se5: Design patterns

22. "return list(csv.DictReader(io.StringIO(text)))". Neither csv.DictReader nor io.StringIO is explained, here or in se8's logging example (logging.basicConfig(stream=io.StringIO() ...)).

#### se7: Continuous integration, code review and static analysis

23. "it starts a fresh virtual machine". The term "virtual machine" isn't explained. CS 230's virtual memory is a different idea, and I wasn't sure whether they're related.
24. (blocking) CODE mini_linter says "check async def functions as well". async def has never been taught, and neither the notes nor the hint says what AST node it produces; the notes only show ast.FunctionDef.

#### se8: Reliability, security and maintenance

25. `log.info("order %d created for user %d", 1042, 7)` and `format="%(levelname)s %(name)s: %(message)s"`. This %-style formatting, with the values passed as separate arguments, isn't explained. I only know f-strings. "force=True" isn't explained either.

### PHYS 250 Physics II: Electricity and Magnetism with Computation

#### em1: Charge and electric fields

26. "used to check a result you can derive by hand: on the line through a dipole, far away, the field falls off as 1/r³" and "The constant matches the formula E = 2kp/x³". The derivation is never given, and I couldn't see how to get 2kp/x³ by hand from two point-charge fields.
27. "in a conductor at rest, the field inside is zero ... So any extra charge on a conductor sits on its surface". The step from "field zero inside" to "charge on the surface" isn't shown. The paragraph says "The same argument proves" it, but it doesn't say how Gauss's law gets there.

#### em2: Potential and capacitance

28. "the potential obeys Laplace's equation, ∂²V/∂x² + ∂²V/∂y² = 0. Its meaning is simple ...: the potential at each point is the average of the potential around it." I couldn't follow why a sum of second derivatives being zero means "average of the neighbours".
29. "For two parallel plates ... Gauss's law gives a uniform field E = Q/(ε₀A) between the plates". Lesson 1 only applied Gauss's law to a sphere around a point charge. I didn't see which surface to use or why the field is uniform.
30. CODE capacitor_network says "Capacitors combine the opposite way to resistors: in parallel their capacitances add, and in series their reciprocals add." Resistors in series and parallel aren't covered until Lesson 3. This lesson also never explains why capacitors combine this way.

#### em4: Magnetism

31. The boris_step code (t = q_m B dt/2, s = 2t/(1 + t·t), v1 = v + v × t, then v + v1 × s) is never explained. "it treats each step's change of velocity as an exact rotation" doesn't show how these formulas produce a rotation, so I couldn't follow the method.

#### em6: Electromagnetic waves

32. "Ampère's law, which says currents make circulating magnetic fields (Lesson 4)" and "the fact that magnetic field lines never start or end (there are no magnetic charges)". Lesson 4 never names Ampère's law: it gives only Biot–Savart, the long-wire field and the solenoid. It also never states that magnetic field lines don't start or end. Both are presented as already known.
33. "Ampère's law, applied to a surface that passes through the gap, would wrongly say there is no magnetic field around the wire there." Ampère's law was never stated in terms of a surface, so I couldn't follow the argument for the displacement current. I also didn't understand how "its rate of change, times ε₀, acts exactly like the missing current" can be a current when ε₀ dE/dt isn't multiplied by any area.
34. "the fields' energy densities, the ½ε₀E² of a capacitor and its magnetic counterpart". Lesson 2 gave a capacitor's energy as ½CV², not an energy density ½ε₀E². The "magnetic counterpart" is never given, so I couldn't see where I = ½cε₀E₀² comes from.
35. The spectrum table gives infrared as "700 nm to 1 mm | about 10¹² to 4 × 10¹⁴ Hz", but c = fλ gives 3 × 10¹¹ Hz at 1 mm, which matches microwave's "300 GHz" upper end. Likewise "Ultraviolet | 10 to 400 nm | about 10¹⁵ to 10¹⁶ Hz" and "X-rays ... below 10 nm | above 10¹⁶ Hz" don't match the 3 × 10¹⁶ Hz I get at 10 nm. I wasn't sure whether the table or my calculation was wrong.
36. "a wave travelling along x with E along y and B along z obeys two coupled equations that come from Faraday's and Ampère–Maxwell's laws". The equations are never written, so I couldn't see why the updates are b[i] += courant*(e[i+1] − e[i]) and e[i] += courant*(b[i] − b[i−1]), or where their signs come from.

### Across courses

37. The PHYS 250 Lesson 2 notes say "CS 230 Lesson 8's dynamic power, proportional to CV²f, is this ½CV² paid at every switch". CS 230 Lesson 8 comes at the end of the term, so I hadn't seen it when I reached PHYS 250 Lesson 2. The factor ½ in PHYS 250 versus no ½ in CS 230 also left me unsure whether the energy per switch is ½CV² or CV².
38. The PHYS 250 Lesson 3 sidebar refers to "a spanning tree of the circuit's graph, the structure that CS 220 Lesson 6 builds minimum spanning trees from". When I reached PHYS 250 Lesson 3, CS 220 Lesson 6 was still several weeks ahead.
39. Binary search is cited as "binary search (CS 101)" in CS 220 Lesson 1 and as "binary search (CS 101 Lesson 13)" in CS 240 Lesson 2. CS 220 Lesson 1 says merge sort is also from CS 101. That's fine. But CS 240's git bisect says "about 10 tests" for 1,000 commits, while CS 220 never states the log₂ count. This didn't confuse me much; I noted it only because the CS 101 lesson numbers are cited inconsistently.
