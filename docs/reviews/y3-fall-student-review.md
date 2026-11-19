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

## Professor's response (CS 310, CS 350)

Items 12–20, 26 and 27 (CS 320, CS 340 and across courses) are answered in the other response file.

### CS 310 Operating Systems

1. Lesson 2 now introduces OSTEP the first time it is named: *Operating Systems: Three Easy Pieces* by Remzi and Andrea Arpaci-Dusseau, the course's main textbook, free online. Lesson 7's later mention then needs nothing more.

2. The intended answer is 5×, the lock-utilization bound. The problem now says the work is split evenly over the 8 threads and that the other threads keep doing their own work while one holds the lock, and asks "at most how much faster". The answer gives the bound: the locked 20% runs one piece at a time, so it takes at least 0.2 of the one-thread time and the speedup is at most 1/0.2 = 5. It also says when Amdahl's 1/(0.2 + 0.8/8) ≈ 3.3 applies instead: when the other threads have nothing to do while the lock is held. The Lesson 3 paragraph on short critical sections now states the general rule: a fraction *s* of the work under one lock means at most 1/*s* times faster.

3. Reworded P3. The thread is "meant to append two items to a list as one action, but has a switch point (a yield) between the two appends". The answer now shows how the lock would be used: `yield from lock.acquire()` before the first append and `lock.release()` after the second.

4. (blocking) Lesson 3 has a new final section, "A lock for simulated threads". It shows the simulator's `Lock` class, the same one as in the programming-problem starters, and uses it in a locked `safe_increment` run over 1,000 seeds (0 lost updates, checked by running it). It explains why `acquire` must be a generator (a waiter has to yield so the holder can run), what `yield from` does, that a free lock's `acquire` doesn't yield at all, and that `release` is a plain call. It also explains why the test and the set in `acquire` are atomic. `yield from` is now explained here, where it is first needed. Lesson 4 refers back to it. The bank_lock hint now also says that release is a plain `self.lock.release()`.

5. Lesson 4 now defines **sequential consistency** in the paragraph after Peterson's proof: memory behaves as if all loads and stores happened one at a time in a single order, each thread's in program order, as in the simulator. That paragraph now also says that modern processors aren't sequentially consistent. Added it as a key term.

6. Lesson 4 now explains what each instruction does. `lr.w` loads a word and reserves its address. `sc.w` stores only if no other core has written that address since, and writes 0 to its destination register on success and nonzero on failure. A retry loop of load-reserved, compute and store-conditional performs any read-modify-write atomically, so the other atomic instructions can be built from the pair.

7. Lesson 4's run block now repeats the simulator `Lock`, with comments marking `acquire` as `yield from lock.acquire()` and `release` as a plain call. After the bounded buffer there is a new paragraph showing the simulator's `Condition`, the same class as in the starter. A short waiter/setter run prints `['item']` (checked by running it). The paragraph explains that `wait` is a generator used as `yield from cond.wait()` while `notify` and `notify_all` are plain calls, and why joining the queue and releasing the lock are one atomic step. The bounded_buffer prompt now states exactly which calls use `yield from` (acquire, wait) and which are plain (release, notify, notify_all), and points to the Lesson 3 and 4 notes.

8. Lesson 6 now discusses the tie at the reference to 2. Neither 7 nor 1 is used again, and the choice can't change the fault count, since neither would ever be hit. The table breaks the tie by evicting the page loaded earliest, 7. The page_replacement problem counts only faults, so any tie-break gives the same answer (the reference solution's choice among ties is arbitrary, and its tests pass). Its prompt now says that the choice among pages never used again doesn't change the count.

9. Lesson 8 now gives the transfer step where it is used: at a typical 2,000 MB/s, 4 KB takes 0.004/2000 s = 0.002 ms, so the read takes 0.1 + 0.002 = 0.102 ms in all (about 9,800 reads a second, checked).

10. Lesson 8 now shows the rotating layout the problem's formula assumes. Stripe *s* keeps its parity on disk (*N* − 1 − *s*) mod *N*, and its data blocks fill the other disks in order. A table shows the layout for 4 disks and stripes 0–4. The raid_parity prompt's "layout of the notes" now refers to it.

11. Lesson 8 now calls it *receive livelock* and ties it to Lesson 5's definition. The machine stays busy changing state (handling interrupts) but makes no progress: no packet ever reaches a program. The cause here is a device rather than threads.

### CS 350 Computer Graphics

21. The Bresenham section now states its convention at the start. In that section only, coordinates are shifted by ½ so that the point (*x*, *y*) is the centre of pixel (*x*, *y*), and the pixel covers *x* ± ½, *y* ± ½. The line runs between pixel centres, and *M* = (*x* + 1, *y* + ½) is described as the point midway between the two candidate centres, on the border between the two pixels. The figure already drew it this way. The opening section's unit-square convention is unchanged and is still the one used in Lessons 3–6. The table row is relabelled "D tested after drawing this pixel (it decides the row in column x + 1)". The lines problem works on integer points, so its tests don't change.

22. The transform2d prompt no longer uses `@`. `compose(*ms)` now "returns the matrix product of its arguments in order, `matmul(ms[0], matmul(ms[1], ... ms[-1]))`". The problem was regenerated, and all its tests pass.

23. Lesson 3 now says that NDC values of exactly ±1 count as inside the view, which matches project_point's frustum test (outside [−1, 1] gives None). It also says that a point on the right or bottom edge (*p_x* = width or *p_y* = height) is clamped into the last column or row: min(⌊*p_x*⌋, width − 1) and min(⌊*p_y*⌋, height − 1). P4's answer now finishes with pixel (60, 59). The project problem returns continuous positions, so its tests are unchanged and consistent with this.

24. The top-left rule now says that a left edge is one whose interior lies on its screen-right side, toward +*x*. It also warns that this "right" is not "your right as you walk along the edge" from the edge-function remark, and that walking direction doesn't matter. P2's answer uses the same wording (+*x* and −*x* sides).

25. Lesson 5 now defines **spatial frequency**: the number of stripe cycles (one dark plus one light stripe) per unit of distance, here per pixel. The sampling theorem is restated as needing more than two samples per cycle of the finest detail. A worked case shows what goes wrong: stripes repeating every 1.5 pixels (frequency 2/3) sampled at pixel centres give exactly the same values as stripes repeating every 3 pixels (checked numerically). The unhelpful MATH 230 aside is gone.

### Checks

`node --check` passes on all four data files. `validate_content.js` reports all good. `check_problems.py` reports 226 problems, 0 problems found. `check_lesson_code.py` reports no mismatches in cs310 or cs350, and `test_dump_course.js` passes. The slow lesson-time estimates are all at most 77 minutes (the longest is CS 310 Lesson 4). The problem files were regenerated from their specs with gen_code.py, which re-ran every reference solution against its tests: 0 problems need attention.

## Professor's response (CS 320, CS 340, and items 26–27)

12. Changed. CS 320 Lesson 3 (tc3), after the list of practical shorthands, now defines the Python `re` syntax the lesson uses: `\w` (letter, digit or underscore), `\s` (space, tab, newline), `^` and `$` (start and end of the string, so `^R$` must match the whole input; `$` also matches just before a final newline) and `(?:R)` (a group that doesn't save its match). The Stack Overflow sidebar now says that `‌` is an invisible Unicode character, the zero-width non-joiner.

13. Changed. tc5 now counts the derivation steps explicitly. The count is the number of symbols (variables and terminals together) in the string derived so far. It starts at 1 (just *S*) and ends at *n* terminals. Each *A* → *BC* adds one symbol, so there are *n* − 1 of those. Each *A* → *a* makes one terminal, so there are *n* of those. Total: 2*n* − 1.

14. Changed. The cyk_parser prompt and hint now say that `count_trees(grammar, start, "")` returns 1 when *S* → ε is a rule (its one tree is *S* with a single ε child) and 0 otherwise. This matches the reference solution, which gen_code.py re-verified.

15. Changed. tc5 now notes, where it defines Chomsky normal form (CNF), that Lesson 8's 3SAT uses the same letters for conjunctive normal form and that the two are unrelated. tc8 now defines conjunctive normal form where 3SAT is introduced: an AND of clauses, each an OR of literals, with an example formula and a pointer to CS 220's SAT solver. It also says again that this has nothing to do with Chomsky normal form. The 3SAT key term now spells out "conjunctive normal form".

16. Changed. tc6's proof idea now gives the missing step. The upper *A* has another variable below it, so it used a rule *A* → *BC*, and the lower *A* lies in one child's subtree. The other child is not the start variable, and in CNF only the start variable can derive ε, so that child yields at least one symbol. That symbol lies in *vxy* but outside *x*, so it is in *v* or *y*.

17. Changed. The notes' `tape_string` in tc7 now uses `rstrip("_")`, so it keeps leading blanks and removes only trailing ones, which is what tm_sim asks for. A new sentence explains why "up to the last cell written" (the notes) and "up to the last cell visited or written" (tm_sim) give the same string: the only cell the head can visit without writing is its final cell, and that cell is either already written or a trailing blank. I checked this by running both versions on 20,000 random machines: they gave identical output. The tm_sim hint now says it is the notes' `run_tm` with the start state fixed and `max_steps` as the third argument. The notes' printed outputs (`XXYY`, `XXY`) are unchanged, and the lesson-code checker confirms them.

18. Changed. tc8's Reductions section now has a short paragraph after HALT. It proves HALT<sub>ε</sub> (halting on a blank tape) undecidable by reducing HALT to it: *M*<sub>*w*</sub> writes *w*, moves back to cell 0 and runs *M*, so it halts on a blank tape exactly when *M* halts on *w*. The busy_beaver prompt now names HALT<sub>ε</sub>, points to the notes, and says how busy beaver values would decide it: run the machine for the maximum number of steps.

19. Changed. CS 340 Lesson 6 (db6), "Estimating sizes", now says how V is estimated after a selection. After *a* = constant, V(σ(R), a) = 1. For any other column, V(σ(R), b) = min(V(R, b), T(σ(R))), and a key column keeps one value per remaining row. The join-order example now derives V(σ(courses), cid) = min(500, 25) = 25 from this rule. db6 P3 now tells students to use this rule. Its answer states V(σ(customers), id) = min(50,000, 500) = 500 and V(σ(orders), cust) = min(50,000, 100,000) = 50,000, then gives the join estimate 100,000 × 500 / 50,000 = 1,000. I re-ran all the numbers.

20. Fixed (blocking). In db8 Q3 the log records are now written as `&lt;T1, X, 5, 8&gt;` and so on, so the page shows them. `node scripts/validate_content.js .` reports "all good".

26. Changed. CS 340 Lesson 7 now uses "wait-for graph" throughout: in the notes, the key term, a practice answer, and the lock_manager problem's prompt and hint (regenerated from the spec). The notes add that it is the same structure as CS 310 Lesson 5's wait-for graph, with transactions in place of threads. They also explain how it differs from the precedence graph: that graph records the conflicts in a schedule, while the wait-for graph records who is waiting right now.

27. Changed. CS 340 Lesson 8 has a short "note on words" after the SQLite paragraph. A file-system journal (CS 310 Lesson 7) holds new block versions and replays them, so it is a redo log. SQLite's rollback journal holds old page contents, so it is an undo log. "Write-ahead logging" is the general rule that a change's log record reaches disk before the change itself, whatever kind of record it is. The database log in Lesson 8 holds both old and new values, so it supports both undo and redo.
