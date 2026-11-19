# Student review: Year 2 Spring

*Round 3. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a second-year student. Before this term I completed CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220 and MATH 230. So I can program in Python and know basic data structures, x86-64 assembly and two's complement, discrete maths, single- and multivariable calculus, linear algebra, probability, and mechanics. I read the four courses below in lesson order and tried every quiz question and practice problem in my head.

### CS 220 Algorithms I

#### al1: Divide and conquer

1. "Return a pair (p, q) meaning T(n) = Θ(nᵖ log^(q) n)". The notation log^(q) n hasn't been used before. I guessed it means (log n)^q, but in other places a superscript on a function can mean a repeated function, so I wasn't sure.

#### al2: Greedy algorithms

2. "Merging them reduces the problem to one with one fewer symbol, and induction finishes the proof." I can't follow this step. It doesn't say how the cost of the smaller problem relates to the cost of the original tree, or why an optimal tree for the merged problem gives an optimal tree for the original one.

#### al6: Minimum spanning trees

3. "The result maximizes the spacing, the smallest distance between two points in different groups." This is stated with no argument. Unlike the other claims in the lesson (the cut property, Kruskal), it gets no proof or reason, and I couldn't see why deleting the k − 1 heaviest MST edges is best.

#### al7: Network flow

4. "So the flow's value equals exactly the capacity of the cut S". The proof shows that edges out of S are full and edges into S are empty. It never shows that a flow's value equals the net flow across any s-t cut, which is the step that turns those two facts into "value = capacity". Earlier the lesson only says "Every unit of flow must cross every cut", which is the inequality, not the equality.

#### al8: Intractability: P, NP and coping

5. "'is there a route of length at most k?' is as hard as 'what is the shortest route?' up to polynomial factors, since we can search over k." If the edge weights are large numbers, trying every k is exponential in the input length, just as Lesson 4 said about knapsack. I couldn't see how searching over k stays polynomial. (Binary search might work, but the lesson doesn't say so.)
6. "Heuristics give good solutions fast, without guarantees: greedy rules, local search (repeatedly make small improvements), simulated annealing." Simulated annealing is the only item in this list that gets no explanation, so I don't know what it is.
7. "a clause is satisfied if at least one of its literals is" (sat_solver). The word "literal" is never defined. I inferred from the example that it means one of the signed integers, but the notes don't say so.

### CS 230 Computer Architecture and Digital Logic

#### ar2: Combinational circuits: choosing and adding

8. "The carries into the middle columns come from the same tree: the carry into a block is G + Pc of the blocks below it, and a second pass back down the tree delivers it to every column, also in Θ(log n) levels." The code only computes the single top-level (G, P). I couldn't work out what the "second pass back down the tree" actually computes at each node, or why it also takes only log n levels.

#### ar4: The RISC-V instruction set

9. "lui x5, 0x12345 ... sets x5 = 0x12345000, and an addi can then fill in the low 12 bits." This reads as if lui followed by addi always works. Then P4 asks "what goes wrong if the low 12 bits are 0x800 or more". Nowhere does this lesson say that addi sign-extends its 12-bit immediate before adding. (Lesson 5's datapath mentions sign-extension later.) So the two statements seemed to contradict each other until I guessed the reason.

#### ar5: A single-cycle processor

10. P3: "a load takes 800 ps ... adds don't use memory, so they need only 600 ps. In a program that is 25% loads, what fraction of the single-cycle processor's time is wasted?" It doesn't say what the other 75% of instructions are. Stores and branches take different times from adds (a store has no write-back, for example). I had to assume every non-load takes 600 ps, and I wasn't sure that was intended.

#### ar6: Pipelining

11. "then retires results in program order so the program can't tell." "Retires" is used as a technical term and never defined.

### CS 240 Software Engineering I

#### se7: Continuous integration, code review and static analysis

12. "if a function is declared -> User | None, mypy reports every caller". The `X | None` form of a type hint hasn't been shown, either here or (as far as I remember) in CS 102's type hints, so I wasn't sure what the `|` means in a type.
13. "'B006': a function default argument that is a list, dict or set display (such as [] or {})". The word "display" is jargon I haven't met. The examples help, but I wasn't sure whether something like list() or a list comprehension counts as a "display" too.

#### se8: Reliability, security and maintenance

14. "With Python's built-in sqlite3 module: cursor.execute("SELECT * FROM users WHERE name = ?", (name,))". The notes never say what `cursor` is or how you get one, and sqlite3 hasn't been used before.
15. "It also prevents command injection (pass a list of arguments to subprocess.run, never a shell string)." subprocess.run hasn't been introduced, and neither has a "shell string" or why a shell would reinterpret one. I couldn't see what the dangerous version looks like.
16. "Keep secrets in environment variables or a secrets manager". Neither term is explained. I don't know how a program reads an environment variable, or what a secrets manager is.
17. "an expired certificate that blinded a monitoring tool for months" (Equifax sidebar). The notes don't say what a certificate is or why one expiring would blind a tool.
18. P1: "up to attempts calls in total ... waits delays[i]". It doesn't say how many entries delays has compared with attempts (attempts − 1? attempts?), or what happens if the list is shorter.

### PHYS 250 Physics II: Electricity and Magnetism with Computation

#### em3: Current and circuits

19. "Their delay grows with the square of their length, which is why chips insert repeaters along long wires." "Repeaters" are not explained. I can see that RC grows as L² because R and C each grow with L, but not why inserting something along the wire helps.

#### em5: Induction

20. "the capacitor contributes the voltage Q/C and the inductor its EMF −L dI/dt, and with no battery or resistor they must balance: Q/C = −L dI/dt." Lesson 3's loop rule says the potential differences around a loop add to zero. Reading "contributes Q/C" and "contributes −L dI/dt" as two terms that sum to zero gives Q/C = +L dI/dt, the opposite sign. The "check the sign" sentence convinced me the final equation is right, but I couldn't reconcile it with "balance" or with the loop rule as stated.
21. "Inductors store energy ½LI² in their magnetic field, as capacitors store ½CV² in their electric field." This formula is stated by analogy only. The capacitor energy was derived (average voltage V/2), but this one isn't, and Lesson 6 then uses ½LI² to derive u_B.

#### em6: Electromagnetic waves

22. "The time step is courant, so Euler's step for the first equation is b[i] -= courant * (e[i + 1] - e[i])." This is the first time "courant" appears, and it's used as if it were already a known quantity. It's only explained several paragraphs later ("The courant number is the fraction of a cell that light crosses in one time step"), so at first I didn't know why the time step had that name.

### Across courses

23. "Core: A complete processor; multicore chips contain several on one die" (CS 230 Lesson 8 key terms) and "the width of a typical 2 cm processor die" (PHYS 250 Lesson 6 P3). Neither course defines "die" as the piece of silicon a chip is made on. I had to guess it from context.

## Professor's response

1. Changed. CS 220 programming problem "master" (data/cs220-code.js) now says log<sup>q</sup> n means (log n)<sup>q</sup>.
2. Changed. al2 Huffman proof: the merge step now says that splitting the merged leaf adds exactly the two frequencies' sum to the cost of any tree, the same amount for every tree, so an optimal tree for the merged problem gives an optimal one for the original; induction then covers the remaining merges.
3. Changed. al6 clustering: added a short argument. The spacing equals the weight d* of the next edge Kruskal would add; any other k-grouping splits some Kruskal component, whose tree path (edges of weight at most d*) must cross between two of its groups, so its spacing is at most d*.
4. Changed. al7: the cut paragraph now proves that a flow's value equals the net flow across any s-t cut (sum conservation over the vertices of S; internal edges cancel), and derives the inequality from it. The max-flow min-cut proof now uses this equality explicitly.
5. Changed (statement was misleading). al8 now says to binary search over k, explains that about log2(sum of weights) questions are needed, which is polynomial in the input length, and contrasts it with trying every k (pseudo-polynomial, as for knapsack in Lesson 4).
6. Changed. al8 heuristics list: simulated annealing is defined as local search that sometimes accepts a worse move, less often as it runs, to escape poor local optima.
7. Changed. sat_solver prompt (data/cs220-code.js) defines a literal as a variable or its negation, one entry of a clause.
8. Changed. ar2: the second pass is now spelled out: each node receives the carry c into its block, passes c to its low half and G_l + P_l c to its high half, one step per level, log2 n levels. (Checked with a Python simulation against ordinary addition on 2,000 random 16-bit inputs.)
9. Changed. ar4: the U-format paragraph now says addi's 12-bit immediate, like every RISC-V immediate, is sign-extended (bit 11 copied upward, range −2048 to 2047). P4's question is unchanged and now answerable from the lesson.
10. Changed. ar5 P3 now states that the other 75% of instructions, like adds, need 600 ps; the answer's "assuming" clause was removed.
11. Changed. ar6: "retires" is defined in place (making a result final in the registers or memory the program sees, only after every earlier instruction has).
12. Changed. se7: `-> User | None` is glossed as "returns a User or None", with a pointer to CS 102 Lesson 4, which introduced the `|` type form.
13. Changed. lint problem (data/cs240-code.js): "display" is defined as a literal written with brackets or braces ([], [1, 2], {}, {1}); calls such as list() and comprehensions don't count, which matches the reference solution.
14. Changed. se8: the sqlite3 sentence now shows sqlite3.connect and conn.cursor() and says what a cursor is and that each ? is filled from the tuple.
15. Changed. se8: command injection now explains subprocess.run, the shell, and shows the dangerous call (a string with shell=True and name = "x; rm -rf ~") next to the safe list form.
16. Changed. se8: environment variables (with os.environ["API_KEY"]) and secrets managers are defined in place.
17. Changed. Equifax sidebar: a certificate is glossed as the signed file that lets a system take part in encrypted connections; once it expired the tool couldn't decrypt and inspect traffic.
18. Changed. se8 P1 now says delays has at least attempts − 1 entries, delays[0] is the wait after the first failure, and the last failure re-raises its ConnectionError (as the sample solution does).
19. Changed. em3: repeaters are defined as gates that drive a fresh copy of the signal onward, with the reason: k pieces give total delay proportional to k(L/k)² = L²/k.
20. Changed. em5 LC circuit: the derivation now goes around the loop in the direction of I, adds the potential changes (−Q/C across the capacitor from top to bottom plate, −L dI/dt across the inductor), sets their sum to zero as Lesson 3's rule states, and gets Q/C = −L dI/dt. The sign check is kept.
21. Changed. em5: ½LI² is now derived: power into the inductor is I·L dI/dt, and integrating from 0 to I gives ½LI².
22. Changed. em6: where courant first appears as the time step, a parenthesis says that in these units it is also the fraction of a cell light crosses per step, called the Courant number, hence the name. The later paragraph on the Courant condition is unchanged.
23. Changed. "Die" is defined in CS 230 Lesson 8's "Core" key term and in PHYS 250 Lesson 6 P3 as the piece of silicon a chip is built on (both courses are taken in parallel, so each defines it).
