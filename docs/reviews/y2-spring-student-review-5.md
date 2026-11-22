# Student review: Year 2 Spring

*Round 5. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a second-year CS student. Before this term I completed CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220 and MATH 230. I read all four courses in order (CS 220, CS 230, CS 240, PHYS 250) and tried every quiz question and practice problem in my head. I checked the worked numbers and printed outputs by hand where I could. Almost everything was explained before it was used, and I could start nearly every problem. The items below are the places where I actually got stuck or found something that didn't add up.

### CS 220 Algorithms I

#### al4: Dynamic programming II

1. "Lesson 8 shows that knapsack is NP-complete, so no truly polynomial algorithm is known." Lesson 8 doesn't show this. It only says knapsack is on Karp's list. Lesson 8 also defines NP for yes/no problems, but the knapsack here asks for "the most valuable load", and no yes/no version of knapsack is ever stated. So I couldn't tell exactly what it means for this problem to be NP-complete.

#### al6: Minimum spanning trees

2. P1: "List the edges in the order considered and whether each is added." Edges 2–3 and 4–5 both weigh 7, and the lesson doesn't say how Kruskal's algorithm breaks ties. I couldn't tell which of the two is "considered" first. The total weight comes out the same either way, but the list the problem asks for doesn't.

#### al8: Intractability: P, NP and coping

3. "his list includes clique, vertex cover, graph coloring, Hamiltonian cycle (a cycle through every vertex exactly once) and knapsack". Clique is used here without a definition. Hamiltonian cycle gets one in the same sentence, but clique is only defined later, in P2 ("A clique is a set of vertices all joined to each other").

### CS 230 Computer Architecture and Digital Logic

#### ar2: Combinational circuits: choosing and adding

4. "In the circuit, the same condition is simpler to test: the carry into the top column differs from the carry out of it." This is stated with no reason given. I couldn't see why it matches CS 210's sign rule ("two operands of the same sign giving a result of the other sign"). P2 ("Is there signed overflow?") and the alu_flags problem both depend on overflow, so I could only use the sign rule and take this one on trust.

#### ar3: Sequential logic: circuits that remember

5. "A processor's register file is an array of registers (32 in RISC-V)". RISC-V is used here before it has been introduced. The lesson that explains what RISC-V is comes next (ar4).

#### ar7: Virtual memory

6. P3: "...also causes about 256. What differs?" The problem gets all three access patterns to the same count of about 256 TLB misses, then asks what differs. The lesson never discusses anything else these patterns could differ in, such as how many accesses each page gets or how they behave in the data cache. So I couldn't tell what answer was wanted.

### CS 240 Software Engineering I

#### se4: Design principles and refactoring

7. money_class: str(m) gives "-$3.10", but the forms parse must accept are "12.34", "$12.34", "12", "12.5" and "-3.10". The hint says to "strip an optional sign and $" without saying in which order they come. I couldn't tell whether "-$3.10" (what str produces) or "$-3.10" should parse, so I don't know whether Money.parse(str(m)) has to work for negative amounts.

#### se6: APIs and data formats

8. rest_api: "An unknown or malformed ID gets 404" and "any other method on a known path gets 405". For a request like POST /notes/99 when note 99 doesn't exist, both rules seem to apply. I couldn't tell whether the answer should be 404 (unknown ID) or 405 (POST isn't supported on /notes/ID).

### PHYS 250 Physics II: Electricity and Magnetism with Computation

#### em2: Potential and capacitance

9. In the relaxation example the comment says "the top edge at 10 V, the other three edges at 0 V". But the code sets the whole top row, including both corners, to 10.0, and the loop that zeroes the sides starts at i = 1. So the two top corners stay at 10 V even though they also belong to the side edges. As far as I can tell the corners never affect the interior averages, but the code doesn't match the description and I had to check whether it mattered.

### Across courses

10. "Relaxation" means two unrelated things this term, and neither course mentions the other. In CS 220 al5, to "relax an edge" means lowering a distance estimate. In PHYS 250 em2, "the relaxation method" means repeatedly averaging grid values. Both are computational lessons, so at first I looked for a connection between them.

11. "Pipeline" also has two meanings. In CS 230 ar6 it's the processor's IF/ID/EX/MEM/WB stages. In CS 240 se7 it's the "pipeline of checks" CI runs, a sequence of steps where one failure stops the rest. Neither course points out the overlap.

## Professor's response

1. **CS 220 al4 / al8, knapsack.** al4 now reads "Lesson 8 explains NP-completeness; knapsack is one of Karp's NP-complete problems, so no truly polynomial algorithm is known." al8, right after Karp's list, now says that like P and NP, NP-completeness is stated for the yes/no version of a problem, gives knapsack's: "is there a load of value at least *V* within capacity *W*?", and notes that binary search over *V* recovers the best value, as for routes earlier in the lesson.

2. **CS 220 al6 P1, Kruskal ties.** The problem now says to break ties between equal weights in the order the edges are listed, and points out that the lesson's `sorted(edges)` does the same here, since (7, 2, 3) sorts before (7, 4, 5). The answer's order (2–3 before 4–5) was already that one. It now says so.

3. **CS 220 al8, clique.** Karp's list now defines clique where it first appears: "clique (are there *k* vertices all joined to each other?)". P2's definition stays.

4. **CS 230 ar2, carry rule vs sign rule.** I added the case argument on the top column (operand bits *a*, *b*, carry in *c*, result bit *a* ⊕ *b* ⊕ *c*). If a = b = 0, the carry out is 0 and the result is negative exactly when c = 1. If a = b = 1, the carry out is 1 and the result is non-negative exactly when c = 0. If a ≠ b there's never overflow, and the column adds 1 + c, so the carry out is c. In each case, overflow happens exactly when carry in ≠ carry out. A one-line note adds that for subtraction the operands are *a* and the inverted *b*′ that enter the adder.

5. **CS 230 ar3, RISC-V.** Now "(32 in RISC-V, the instruction set Lesson 4 introduces)".

6. **CS 230 ar7 P3.** The question now says what it asks for: "The miss counts match, so what differs? For each pattern, give the number of memory accesses and the fraction of them that miss in the TLB." The answer gives 2^20 = 1,048,576 accesses with 256/1,048,576 = 1/4,096 (about 0.02%) missing for the sequential read, and 256 accesses with all of them (100%) missing for the strided and random reads. I removed the extra remark about the data cache, which the lesson doesn't support.

7. **CS 240 se4 money_class.** The prompt now gives the parse order: an optional `-`, then an optional `$`, then digits. So "-$3.10" parses and `Money.parse(str(m)) == m` for every m, while "$-3.10" and "--3" are errors. The hint now says to remove an optional leading `-` and then an optional `$` with `str.removeprefix`. The solution used `lstrip`, which wrongly accepted "--3" and "$$3", and now uses `removeprefix`. New tests check `parse("-$3.10")`, check the round trip `parse(str(Money(c)))` for 0, 5, 310, −310, −5, 123456 and −100, and check that "$-3.10", "--3" and "$$3" are rejected.

8. **CS 240 se6 rest_api.** The prompt now says the ID is checked before the method. An unknown or malformed ID gets 404 whatever the method: `POST /notes/99` gets 404 when there's no note 99, and 405 when there is. The reference solution already did this. New tests check `POST /notes/99` → 404 and `PUT /notes/abc` → 404, next to the existing `POST /notes/1` → 405.

9. **PHYS 250 em2, relaxation corners.** I removed the redundant loop that zeroed the sides from row 1. The comment now says what the code does: row 0 (the top edge, both corners included) is at 10 V, every other boundary point is at 0 V, and no interior average uses a corner, so the corners' values don't affect the answer. I re-ran it: the centre is still 2.5.

10. **"Relax" vs relaxation.** In CS 220 al5, where "relax" is defined, I added a parenthetical. It says this "relax" means loosening an overestimate and is unrelated to PHYS 250's relaxation method, which repeatedly averages grid values.

11. **"Pipeline".** In CS 240 se7, where the CI pipeline is introduced, I added that its steps run in order and a failing step stops the rest. A parenthetical says the word is borrowed loosely: CS 230's processor pipeline overlaps its stages on different instructions, while a CI pipeline runs its steps one after another.

X1. **CS 240 se7, "how you tested it (Lesson 2)".** The citation now covers only what Lesson 2 covers: "Describe what the change does and why (as in a commit message, Lesson 2), and how you tested it."

**Note on the spec:** scratchpad/y2/cs240_spec.py is stale. Regenerating from it would undo earlier direct edits to data/cs240-code.js (the bool explanation in money_class, the Decimal hint, the B006 and async def text in mini_linter). So I edited data/cs240-code.js directly, through a JSON load/dump that reproduces the generator's formatting byte for byte, and left the spec alone.
