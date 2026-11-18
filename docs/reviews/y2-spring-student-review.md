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

## Professor's response (CS 220, CS 230, CS 240)

1. **al1, a^(log_b n) = n^(log_b a).** The third case of the master theorem now reads Θ(n^k) with k = log_b a, so no exponent contains a subscript. The note after the theorem says the tree has h = log_b n levels and a^h leaves, and proves a^h = (b^k)^h = (b^h)^k = n^k from the definitions of k and h. It ends with the Karatsuba instance (3^h leaves with h = log₂ n, which is n^1.585). (`data/cs220.js`, al1.)
2. **al1, a, b, d reused in Karatsuba.** The halves are now x₁, x₀, y₁, y₀ (subscript 1 for high, 0 for low), with a sentence saying these are new names, not the master theorem's. The code uses `x1, x0, y1, y0` and `high, low, middle`, and the worked example and the 46 × 13 practice answer use the same names. The text now spells out the recurrence's parameters: a = 3 subproblems, b = 2, d = 1. Output checked: `karatsuba(1234, 5678)` prints 7006652.
3. **al2, the end of the exchange argument.** Added a paragraph. Idle gaps can be closed without increasing any lateness. Each adjacent swap removes exactly one out-of-order pair, so the swapping stops. A list with every neighbouring pair in order is sorted by deadline, so it is an earliest-deadline schedule. Swapping two jobs with equal deadlines leaves their larger lateness unchanged, so every way of breaking ties gives the same maximum lateness.
4. **al4, [x_i ≠ y_j].** The notation is now defined where it first appears: square brackets around a condition mean 1 if it is true and 0 if it is false.
5. **al5, log E vs log V.** The cost is now derived as O(V + E log E). The notes then show log E < log V² = 2 log V (since E < V²), so the time is also O((V + E) log V).
6. **al6, what Prim's heap holds.** The notes now say the code keeps edges in its heap, as (weight, far end) pairs. An edge goes stale when its far end has already joined the tree, and such edges are skipped like Dijkstra's outdated entries. The first edge popped for each outside vertex is the cheapest one reaching it. Versions with decrease-key keep vertices instead and choose the same edges. This matches Q3's answer.
7. **al8, "packing a knapsack exactly".** Rewritten. The opening now says almost every earlier problem was polynomial, and names Lesson 4's 0/1 knapsack as the exception: its Θ(nW) table is only pseudo-polynomial. The list of hard problems now says "the knapsack problem with large weights".
8. **ar2, majority = ab + c(a ⊕ b).** Added a three-case check (a = b = 1, a = b = 0, exactly one of a and b is 1) showing the formula equals bc + ac + ab, and why this form is used: it reuses the sum's a ⊕ b. (`data/cs230.js`, ar2.)
9. **ar2, combining (g, p) pairs.** Defined a block's (G, P) and gave the combine rule G = G_h + P_h G_l, P = P_h P_l, with the reason for each part. Explained that the block size doubles at each level, so log₂ n levels cover n bits, and a pass back down delivers the carries to the middle columns. Added a runnable `combine`/`block_gp` example (checked: 11 + 6 gives 1 0, and 9 + 6 gives 0 1).
10. **ar3, two latches make an edge-triggered flip-flop.** Added a step-by-step account of what the two latches do as the clock rises, stays high and falls. The two latches are never open at the same time, so Q changes only at a rising edge.
11. **ar4, ABI.** Defined ABI (application binary interface) and compared it to CS 210's x86-64 calling convention. Noted that x10 and a0 are the same register to the hardware.
12. **ar4, format table and colspan.** Every cell now gives its field and its bit range, e.g. "imm[11:0] (31–20)" and "rs1 (19–15)". A sentence explains that a field spanning several columns occupies all of their bits. The page still shows the fields lined up in columns, and the text dump is unambiguous: in the I row, rs1 is labelled 19–15.
13. **ar4, only three of six formats shown.** The table now has all six formats (B, U and J added; field positions checked against clang's RV64I encodings of `beq` and `jal`). A new paragraph explains B (an even branch offset, bit 0 not stored, up to 4,096 bytes), U (`lui x5, 0x12345` sets 0x12345000) and J (`jal`'s 20-bit even offset), and why the immediate bits are shuffled. Another paragraph explains `jal rd, label` and `jalr rd, imm(rs1)`, and why `ret` is `jalr x0, 0(ra)`. The existing comment already says `j` is shorthand for `jal x0, label`.
14. **ar5, "the CS 230 labs".** Reworded: decoding real 32-bit words undoes Lesson 4's encoding, which the processor lab (described in the course rubric at the top of the course page) asks you to do.
15. **ar6, two stall cycles.** The register file's write-first-half, read-second-half rule is now stated at the point where it's needed. It means sub's ID can move from cycle 3 to cycle 5, a delay of two cycles. A pipeline diagram shows the two stalls.
16. **ar6, 2-bit counter vs branch_predictor.** The notes now define the counter exactly as the problem uses it: values 0–3 meaning strongly or weakly not taken and weakly or strongly taken, plus or minus 1 per outcome, saturating at 0 and 3. They say a counter at 3 needs two wrong predictions in a row to change its prediction, and a counter at 1 changes after one taken branch. The problem's prompt now refers to the notes' counter, says it starts at 1 (weakly not taken), and states that one taken outcome then switches it. The tests are unchanged and still pass (loop runs: 6 and 4; always taken: 1 and 1; alternating: 20 and 20).
17. **ar8, Apollo 1 MHz vs 12 µs.** The two terms do mean different things, and the sidebar now says so. The clock ran at 1.024 MHz (about 1 µs per tick). A memory cycle took 12 ticks, about 11.7 µs, and an addition took two memory cycles, about 23.4 µs, so roughly 40,000 additions a second (checked: 12/1.024 = 11.72; 10⁶/23.44 ≈ 42,700).
18. **se3, "About 14 tests".** Corrected to 12: six boundaries (0, 60, 70, 80, 90, 100) with a value on each side, all listed. (`data/cs240.js`, se3.)
19. **se4, SMTP.** Defined SMTP where it first appears: the protocol a program uses to hand email to a mail server; Python's `smtplib` speaks it. Q2 now adds "(a connection to a real mail server)".
20. **money_class, bool.** The prompt now explains that `bool` is a subclass of `int`, so `isinstance(True, int)` is True, and says to use `type(cents) is int` (checked: False for True).
21. **money_class, Decimal rounding (blocking).** The hint now gives the import line (`from decimal import Decimal, ROUND_HALF_UP`), the exact product, and `x.quantize(Decimal(1), rounding=ROUND_HALF_UP)` with checked examples (2.5 gives 3, −2.5 gives −3), and says `int()` converts the result.
22. **se5/se8, csv.DictReader and io.StringIO.** se5 now explains both after the factory example: `io.StringIO` is a string that behaves like an open text file, and `csv.DictReader` (from CS 101 Lesson 12) returns one dict per row, keyed by the header. se8 refers back to se5 for StringIO.
23. **se7, virtual machine.** Defined it as a complete simulated computer run as a program on a real server. The notes say it is unrelated to CS 230's virtual memory, and why CI uses one: every run starts from the same clean state.
24. **mini_linter, async def (blocking).** The prompt now says what `async def` is (enough for the problem), that `ast.parse` produces an `ast.AsyncFunctionDef` with the same `name`, `lineno` and `args` fields, and that `isinstance` accepts a tuple of classes (checked with Python 3.12).
25. **se8, %-formatting and force=True.** Added a paragraph after the logging example. It explains `%d`, `%s` and `%.1f` placeholders with the values passed as separate arguments, so messages below the configured level are never formatted. It also explains the `%(levelname)s`/`%(name)s`/`%(message)s` record fields, why the example logs to a StringIO, and that `force=True` replaces earlier configuration (checked: without it, a second `basicConfig` call is ignored).
39. **Binary search citations.** CS 220 Lesson 1 now cites "Merge sort and binary search (CS 101 Lesson 13) and quicksort (CS 201 Lesson 6)", matching CS 240's "binary search (CS 101 Lesson 13)". The CS 220 table row for binary search now states about log₂ n halvings (10 steps for 1,000 items). CS 240's `git bisect` text now says each test halves the range, so log₂ 1000 ≈ 10 tests.

## Professor's response (PHYS 250)

26. **em1, dipole field.** Added the hand derivation after the dipole code: the two point-charge fields on the axis, combined over a common denominator to E_x = −2kqdx/(x² − d²/4)², then the far-field limit −2kp/x³ with p = qd. Checked that the exact formula gives the printed −0.1798, −0.02248 and −0.002809.

27. **em1, charge on a conductor's surface.** Wrote out the Gauss's-law step: a closed surface drawn anywhere inside the metal has zero field on it, so zero flux, so no enclosed charge. Because such a surface can enclose any part of the interior, all extra charge must be on the surface.

28. **em2, Laplace's equation as an average.** Laplace's equation is now derived from Gauss's law: zero flux out of a small charge-free box gives ∂E_x/∂x + ∂E_y/∂y = 0, then E = −∇V. The second derivative is shown as a difference of slopes, (V_right − 2V + V_left)/h². Adding the x and y versions and setting the sum to zero makes V the average of its four neighbours. Added a numerical check with V = x² − y² at (0.3, 0.2): the centre value is 0.05 and so is the average of the neighbours.

29. **em2, parallel-plate field.** Spelled out the Gauss's-law argument. The charge sits on the facing surfaces at Q/A per square metre, and symmetry makes the field perpendicular to the plates. The Gaussian box has one face in the metal, where the field is zero, one face in the gap, and sides parallel to the field. That gives Ea = Qa/(ε₀A) wherever the gap face is, so the field is uniform.

30. **em2, capacitor networks.** Added a paragraph to the em2 notes that derives both rules. In parallel the capacitors share V and their charges add, so C = C₁ + C₂. In series they carry the same ±Q, because the joining conductor is isolated and neutral, and their voltages add, so 1/C = 1/C₁ + 1/C₂. In `data/phys250-code.js`, the capacitor_network prompt now points to the notes, and its mention of resistors is a forward pointer to Lesson 3. The tests are unchanged and pass.

31. **em4, Boris method.** The method is now presented as the averaged-velocity update v′ = v + (q/m)·½(v + v′) × B Δt. Dotting with v′ + v shows |v′| = |v|, and dotting with B shows the component along B doesn't change, so each step is a rotation. The text says this is a 3×3 linear system and that Boris's t/s formula is its closed-form solution. A new code check confirms that the formula satisfies the averaged equation and keeps |v|² (prints `True 1.34 1.34`). The original speed comparison still prints `2.682 1.0`.

32. **em4/em6, Ampère's law and no magnetic charges.** Added a section to em4, "Ampère's law, and no magnetic charges". It defines circulation and states ∮B·dl = μ₀I_through, with "through" defined by a surface whose edge is the loop. It rederives the long-wire field and the solenoid field from the law. It also states that there are no magnetic charges, so field lines close on themselves and the flux of B out of a closed surface is zero (Gauss's law for magnetism). Both laws are now key terms. The em6 introduction cites Lesson 4 for both.

33. **em6, displacement current.** Rewrote the argument with two surfaces that share one loop: a flat disc crossed by the wire (current I) and a bag through the capacitor gap (no current). Displacement current is now defined as ε₀ dΦ_E/dt, where Φ_E is the electric flux, so the area is included. Lesson 2's E = Q/(ε₀A) then shows it equals dQ/dt = I. The corrected law ∮B·dl = μ₀(I + ε₀ dΦ_E/dt) is written out. The key term is updated.

34. **em6, energy densities and intensity.** Derived u_E = ½ε₀E² from a parallel-plate capacitor's ½CV², and u_B = B²/(2μ₀) from a solenoid's ½LI², with L = NΦ/I taken from Lesson 5's two EMF expressions. In a wave u_B = u_E because B = E/c. Averaging sin² over a cycle and multiplying by c gives I = ½cε₀E₀². Checked the sunlight figure: 1,360 W/m² gives E₀ ≈ 1,012 V/m. Added an "Energy density" key term.

35. **em6, spectrum table.** Recomputed every frequency range from c = fλ: infrared 300 GHz to 4.3 × 10¹⁴ Hz, visible 4.3 to 7.5 × 10¹⁴ Hz, ultraviolet 7.5 × 10¹⁴ to 3 × 10¹⁶ Hz, X-rays and gamma rays above 3 × 10¹⁶ Hz. The radio and microwave rows were already right. A sentence under the table works the 1 mm boundary as an example.

36. **em6, FDTD equations.** Derived the two 1D equations: ∂E/∂x = −∂B/∂t from Faraday's law on a rectangle in the xy-plane, and ∂E/∂t = −c²∂B/∂x from Ampère–Maxwell on a rectangle in the xz-plane, with orientations and signs shown. They are then written in c = 1 units, with a check that g(x − t) solves both. The text explains the staggered grid: b[i] lies between e[i] and e[i+1], and each update is an Euler step of one equation. The code now uses the physical signs (`-=`) in the notes and in the fdtd_problem solution. This only negates b, so E and the printed result (184) are unchanged, and the problem's tests pass.

37. **em2, dynamic power (cross-course).** The CS 230 reference is now a forward pointer ("Near the end of the term, CS 230 Lesson 8 uses this..."), and the factor of ½ is explained. The supply delivers QV = CV² when charging. Half of it is stored and, by energy conservation, half becomes heat. Discharging turns the stored half into heat too. So each charge-and-discharge cycle costs CV², giving about CV²f, which matches CS 230's formula with no ½.

38. **em3 sidebar, spanning tree (cross-course).** The sidebar now defines a spanning tree in place: wires that connect every junction without forming a loop. The CS 220 reference is a forward pointer ("Later this term, CS 220 Lesson 6 builds minimum spanning trees").

Checks: `node --check` on both data files, `validate_content.js`, `check_problems.py` (166 problems, 0 found), `check_lesson_code.py` (no phys250 mismatches), and `test_dump_course.js` all pass. The slow lesson-time estimates are now em1 70, em2 73, em4 77 and em6 73 minutes, all within 100.
