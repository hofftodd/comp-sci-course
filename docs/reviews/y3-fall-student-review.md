# Student review: Year 3 Fall

*Round 1. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a third-year student. Before this term I took CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240 and PHYS 250. I can program in Python, read C and some x86/RISC-V assembly, and I know data structures, graph search, dynamic programming, P/NP at the CS 220 level, linear algebra, and probability. I read all four courses in order (cs310, cs320, cs340, cs350) and tried every quiz and practice problem in my head. I checked most of the worked numbers and code outputs by hand, and almost all of them came out right. The items below are the places where I got stuck or confused.

### CS 310 Operating Systems

#### os2: CPU scheduling

1. "It keeps several queues, each a priority level, and follows these rules (in OSTEP's formulation)". OSTEP is never explained. I guessed it was a textbook, but nothing says so. The same name comes back in Lesson 7 ("OSTEP's 'vsfs'").

#### os3: Threads and concurrency

2. P4: "each spends 20% of its time inside a critical section protected by one shared lock. Roughly how much faster than one thread can it possibly be on 8 cores?" I got two answers and couldn't tell which one is meant. Amdahl's law with a 20% serial part gives 1/(0.2 + 0.8/8) ≈ 3.3. But if I count how busy the lock is, 8 threads × 20% = 1.6 "locks' worth" of demand, so the lock is the bottleneck and the limit comes out around 5. The lesson only points to Amdahl.

3. P3: "write a simulated thread append_twice(lst, a, b) that appends two items to a list as one action, and a schedule that shows another thread's items landing between them." If it's "one action", how can another thread's items land between them? I think it means "intended as one action", but I wasn't sure whether I was supposed to put a yield between the two appends.

4. (blocking) CODE bank_lock: "The starter contains the simulator from the notes (run and Lock)" and the hint says "yield from self.lock.acquire()". The Lesson 3 notes contain run but never show a simulator Lock. I don't know its interface: is release a generator too, and does it need yield from? `yield from` itself is only explained in Lesson 4. I couldn't write the fix from Lesson 3 alone.

#### os4: Locks and condition variables

5. Key term: "Peterson's algorithm: A two-thread lock using only loads and stores, correct on sequentially consistent memory." The phrase "sequentially consistent" never appears in the notes. They talk about store buffers and loads overtaking stores, but they never name or define the property.

6. "RISC-V's 'A' extension has amoswap.w … and the pair lr.w/sc.w (load-reserved, store-conditional), from which the others can be built." I don't know what store-conditional does (when does it fail, and what does it return?), so I can't see how the other atomic instructions can be built from it.

7. CODE bounded_buffer: "using its Lock and Condition (in the starter; Condition works like threading.Condition, but wait is used as yield from cond.wait())." The hint says "acquire, … release" without saying how either is called in the simulator: is it `yield from self.lock.acquire()` and a plain `self.lock.release()`? The notes never show the simulator's Lock or Condition. I could guess, but I couldn't be sure.

#### os6: Memory management

8. In the OPT row of the replacement table, at the reference to 2 the frames hold 7, 0 and 1. Neither 7 nor 1 is ever used again, so both are "farthest in the future", and the table evicts 7 without saying how the tie is broken. While tracing it myself I wasn't sure whether evicting 1 instead was also correct.

#### os8: I/O, storage and virtualization

9. "A random 4 KB read takes … about 100 µs …: 0.1 + 0.002 ≈ 0.102 ms". The 0.002 ms is presumably transfer time, but this paragraph never gives the SSD's transfer rate. The 2,000 MB/s only shows up later, in P1 and the programming problem.

10. CODE raid_parity: "parity_disk(stripe, ndisks): in the rotating RAID-5 layout of the notes, the disk holding stripe stripe's parity, which is (ndisks - 1 - stripe) % ndisks." The notes never give a particular rotating layout. They only say "the parity block moves to a different disk in each stripe". Because the formula is given I could still do it, but the reference to "the layout of the notes" confused me.

11. "a network card receiving a flood of packets can interrupt so often that the machine does nothing else, livelock". Lesson 5 defined livelock as "Threads that keep changing state in response to each other without making progress". An interrupt flood doesn't fit that definition, so I wasn't sure whether this is the same concept.

### CS 320 Theory of Computation

#### tc3: Regular expressions and minimal DFAs

12. P4: "uses the pattern ^(\w+\s?)*$". The notes list the shorthands +, ?, [abc], [0-9] and ".", but never ^, $, \w or \s. The sidebar also uses \s, \u200c and (?:…). Thanks to the parenthetical "words optionally separated by single spaces" I could guess what the pattern means, but I couldn't read it from the lesson.

#### tc5: Context-free grammars and parsing

13. "deriving a string of length n ≥ 1 takes exactly 2n − 1 steps: n − 1 uses of A → BC (each adds one symbol to the count)". I couldn't tell what "the count" is. I think it means each A → BC step adds one variable to the sentential form, but it reads as if it adds one terminal symbol.

14. CODE cyk_parser: "count_trees(grammar, start, w), returning the number of different parse trees for w". The hint explains what cyk should do for w == "" but not count_trees. Is the answer 1 when S → ε is a rule?

15. In both this lesson and tc8, "CNF" is used without saying which normal form is meant. Here it is Chomsky normal form ("A grammar is in Chomsky normal form (CNF)"), and the CYK section keeps saying "CNF grammar". In tc8, "3SAT, CNF with exactly three literals per clause" uses the same letters for conjunctive normal form, which isn't spelled out. On first reading I thought 3SAT was somehow about Chomsky normal form.

#### tc6: Pushdown automata and the limits of context-free languages

16. Proof idea of the CFL pumping lemma: "In CNF a variable never derives ε except at the start, so v and y are not both empty." I couldn't follow the "so". The step about the upper A using a rule A → BC, with the sibling subtree yielding a non-empty part of v or y, seems to be skipped.

#### tc7: Turing machines

17. The notes' tape_string uses `"".join(cells).strip("_")`, which removes leading and trailing blanks, and it builds the tape from cell 0 to max(tape), the last cell written. CODE tm_sim instead asks for the tape "from cell 0 to the last cell ever visited or written … with trailing blanks removed", and the hint says "rstrip("_") removes trailing blanks (leading ones must stay)". So the notes' simulator gives different output from what the problem wants, and I wasn't sure which one is "the" simulator the lesson means.

#### tc8: Undecidability and complexity

18. CODE busy_beaver: "No algorithm can compute them for every n: if one could, it would decide the halting problem for blank tapes." The lesson proves HALT undecidable for general ⟨M, w⟩, but never shows that halting on a blank tape is undecidable. That reduction is missing.

### CS 340 Databases

#### db6: Query processing and optimization

19. Join-order example: in `join_size(100_000, math_courses, 500, 25)`, the value V(σ(courses), cid) = 25 is used without explanation. The estimation section never says how V(R, a) changes after a selection. P3 then needs this: after `c.country = 'NZ'` and `o.total > 900`, what are V(orders, cust) and V(customers, id) for the filtered inputs? I couldn't be sure which V values to put in the join formula.

#### db8: Recovery, and beyond relational databases

20. (blocking) Q3: "The log holds , , , then a crash. After recovery, X is … | 3 / 5 / 8 / unknown | ans: 8". The log records are missing from the question; there are just commas. Without them I can't answer it.

### CS 350 Computer Graphics

#### gr1: Images and color

21. The lesson says "pixel (x, y) is the unit square from x to x + 1 and y to y + 1, with its centre at (x + 0.5, y + 0.5)". The Bresenham section then treats the integer point (x, y) itself as the pixel ("The line from (0, 0) to (5, 2)", "runs from the centre of pixel (0,0) to the centre of pixel (5,2)"). It also calls M = (x + 1, y + ½) "the midpoint between" pixels (x + 1, y) and (x + 1, y + 1). Under the unit-square convention, (1, ½) is the centre of pixel (1, 0), not the point between two pixels. I couldn't tell which convention the algorithm uses. A smaller point: the row "D when the pixel is drawn" lists, under each x, the D that decides the next column's pixel, which took me a while to see.

#### gr2: Transformations

22. CODE transform2d: "compose(*ms), which returns the product ms[0] @ ms[1] @ ... @ ms[-1]". The @ operator hasn't been used or explained; matrices in this course are lists of lists multiplied with matmul. I took it to mean matrix product, but it isn't defined.

#### gr3: Viewing and projection

23. P4: "Find the NDC of the camera-space point (2, −3, −6), and its pixel in a 80 × 60 image." y = −3 is the bottom of the box, so y_ndc = −1 and p_y = (1 − (−1))/2 × 60 = 60. The point is in pixel row ⌊60⌋ = 60, but an image 60 high only has rows 0–59. The lesson doesn't say what happens to a point exactly on the bottom or right edge.

#### gr4: Rasterizing triangles

24. Edge functions: "E > 0 means **p** is on your right as you walk from **a** to **b**". The top-left rule then defines "a left edge (the triangle's interior lies to its right)". Here "right" seems to mean screen-right, the +x direction (matching "g_x > 0"), not "on your right as you walk along the edge" as in the previous section. I mixed the two up and got the wrong edges for P2 at first.

#### gr5: Shading and lighting

25. "The sampling theorem says that a pattern can only be represented faithfully if it is sampled at more than twice its finest frequency". "Frequency" of a picture or pattern hasn't been defined in any course I've taken. The note about MATH 230 having "a cousin" didn't help me see what is being doubled.

### Across courses

26. CS 310 Lesson 5 calls the graph of threads waiting for each other's locks the "wait-for graph" (edge T → U when T waits for something U holds). CS 340 Lesson 7 calls the same thing the "waits-for graph" and also defines a separate "precedence graph". I wasn't sure at first whether "wait-for" and "waits-for" were different concepts.

27. CS 310 Lesson 7 uses "journal" for a log of new block versions that are replayed after a crash, which is a redo log ("Journaling (write-ahead logging)"). CS 340 Lesson 8 says SQLite's default "rollback journal" holds original page contents, "an undo log", and that SQLite's "WAL mode" is the redo log. So "journal" means a redo log in one course and an undo log in the other, and "write-ahead logging" is used for both journaling and the database's log.
