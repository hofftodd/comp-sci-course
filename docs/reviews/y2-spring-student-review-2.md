# Student review: Year 2 Spring

*Round 2. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a second-year student. Before this term I took CS 100, WRIT 100, CS 101 and CS 102 (Python, Git basics, pytest, type hints, Protocols), MATH 120 and 121 (logic, induction, RSA, halting problem), MATH 130 and 131 (calculus, gradients, Euler's method, central differences), PHYS 150 (mechanics, semi-implicit Euler, springs), CS 201 (data structures, heaps, union-find, BFS), CS 210 (x86-64, two's complement, caches, processes), MATH 220 (linear algebra, Gaussian elimination) and MATH 230 (probability and statistics). I read all four course dumps (cs220, cs230, cs240, phys250) in lesson order and tried every quiz and practice problem in my head. Most of the material was followable. The items below are the places where I got stuck or confused.

### CS 220 Algorithms I

#### al3: Dynamic programming I

1. "If x[i] = y[j], an LCS can use that shared character: L[i][j] = L[i − 1][j − 1] + 1." In the recurrence, x[i] means the i-th character counting from 1. The code right below compares x[i - 1] == y[j - 1]. The notes never say that the recurrence counts from 1 and Python counts from 0, so at first I thought one of them was off by one.

#### al5: Shortest paths

2. "Without it, the algorithm can be wrong: with edges s → a (1), s → b (2) and b → a (−2), Dijkstra finishes a at distance 1, but the path through b has length 0." I traced the notes' dijkstra code on this graph. When b is finished it relaxes b → a, and `d + w < dist.get(v, …)` is true (0 < 1), so dist["a"] becomes 0 even though a is already in done. The function therefore returns the correct distance 0 for a. That contradicts the sentence saying the algorithm gets it wrong, and I couldn't tell whether "finishes a at distance 1" describes the code or only the idea.

#### al7: Network flow

3. CODE max_flow_problem: "If both (u, v) and (v, u) are edges, treat them as separate edges whose residual capacities add." I don't know what "add" means here: should the forward capacity of (v, u) be added to the backward residual of (u, v)? The notes' max_flow uses `residual.setdefault((v, u), 0)`, which would not add anything in that case, so the notes' code doesn't seem to meet this rule, and I wasn't sure what behaviour the grader expects.

### CS 230 Computer Architecture and Digital Logic

#### ar1: Boolean logic and gates

4. "adding a copy of abc for each of the first three terms (allowed, since abc + abc = abc) and factoring gives maj = bc + ac + ab". I had to work out for myself that a′bc + abc = bc(a′ + a) = bc. The factoring step uses a + a′ = 1, but the notes don't say which law is being applied, so this took me a while.

#### ar3: Sequential logic

5. P2: "dispenses an item (output 1) once 15¢ or more has been inserted, then resets (no change given)". CODE vending_fsm says the machine "returns the excess as change (0 or 5)". It's the same vending machine, but one version gives change and the other doesn't. I wasn't sure which behaviour the lesson means a vending FSM to have.

#### ar5: A single-cycle processor

6. "the processor lab (described in the course rubric at the top of the course page) asks you to do." The course text I was given has no rubric, so I couldn't find out what the lab asks.

### CS 240 Software Engineering I

#### se5: Design patterns

7. P2: "Write a decorator retry(n) … (A decorator that takes an argument is a function that returns a decorator.)" The notes only show count_calls, a decorator with no argument. A decorator with an argument needs one more level of nesting, and with @retry(3) I don't know what gets called when. One sentence wasn't enough for me to start; I would have had to guess the structure. (blocking)

#### se8: Reliability, security and maintenance

8. "escape user text before putting it into HTML, as this course's own notes escape <". I don't know what this refers to. Nothing I read shows the notes escaping anything.

9. P1 defines `call_with_retries(fn, attempts, sleep, delays)`, which takes a list of delays. CODE retries defines a function with the same name and a different signature, `call_with_retries(fn, attempts, sleep, base=0.5, cap=8.0, retry_on=…, rng=None)`. With two different functions sharing one name in the same lesson, I wasn't sure whether the practice answer was supposed to become the code answer.

### PHYS 250 Physics II: Electricity and Magnetism with Computation

#### em2: Potential and capacitance

10. P3: "what average power do 8 × 10⁹ cells use just for refresh, assuming each refresh restores the full charge?" The lesson says recharging costs the supply CV², of which only ½CV² is stored. I couldn't tell which of the two to use per refresh, and the answers differ by a factor of 2.

#### em3: Current and circuits

11. "the currents flowing out through its resistors … add to the current injected there." Nothing in the lesson injects current at a node: there are only resistors and a fixed-voltage battery. In the worked example the sum is just 0. I don't know what "current injected" means or when it would not be zero.

12. "Not everything obeys Ohm's law: a diode, and CS 230's transistors, conduct very differently…". Lesson 5 later says "circuits that switch motors or relays need protective diodes". The word diode is never explained, so I don't know what a diode does or why it would protect anything.

#### em5: Induction

13. "The charge Q on the capacitor obeys L d²Q/dt² = −Q/C". This equation isn't derived. I tried the loop rule with the inductor's EMF −L dI/dt and the capacitor's voltage Q/C, but I couldn't get the sign without knowing how the notes relate I to Q. For a discharging capacitor I would have expected I = −dQ/dt, but the notes use I = dQ/dt.

#### em6: Electromagnetic waves

14. "four laws described electricity and magnetism: Gauss's law for electric fields (Lesson 1), Gauss's law for magnetism, the fact that magnetic field lines never start or end because there are no magnetic charges (Lesson 4), Faraday's law (Lesson 5), and Ampère's law". The commas made me count five things. It was only later that I realised "the fact that magnetic field lines never start or end" is meant to be the same law as Gauss's law for magnetism.

15. "Lesson 5's two expressions for its EMF, N dΦ/dt and L dI/dt, give L = NΦ/I." Setting N dΦ/dt = L dI/dt gives L = N (dΦ/dt)/(dI/dt). Going from that to NΦ/I needs Φ to be proportional to I (Φ = 0 when I = 0), and the notes don't say this. I couldn't follow the step until I assumed it.

### Across courses

16. Transistors are explained differently in two courses. CS 230 Lesson 1 calls a transistor "a switch controlled by a voltage". PHYS 250 Lesson 3 says that transistors and diodes "conduct very differently in the two directions or depending on a control voltage", and Lesson 3 also treats a gate's transistors as "a resistance" in an RC circuit. Neither course says how the switch picture and the resistance picture fit together, so I wasn't sure whether a transistor is an on/off switch or a resistor.
