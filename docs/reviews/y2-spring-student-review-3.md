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
