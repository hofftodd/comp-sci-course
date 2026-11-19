# Student review: Year 3 Fall

*Round 4. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a third-year CS student. Before this term I took CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240 and PHYS 250. I read every lesson of CS 310, CS 320, CS 340 and CS 350 in order, and I tried each quiz question and practice problem in my head. I checked most of the worked numbers by hand (scheduling averages, page-replacement tables, banker's example, CYK table, TM traces, SQL outputs, join costs, Bresenham's D values, projection example, Blinn–Phong example) and they agreed with the notes. The items below are the places where I got stuck or confused.

### CS 310 Operating Systems

#### os2: CPU scheduling

1. "Once a job has used up its allotment of CPU time at a level ... it moves down one level." The notes never say what happens to a job that uses up its allotment at the lowest level. P4 needs this: A runs 10 ms through levels with slices 1, 2 and 4. Only the mlfq programming problem says the job goes to "the back of the lowest level, if it's already there".

#### os3: Threads and concurrency

2. bank_lock: "Keep at least the three yields that are in transfer (they model real switch points)." The problem text doesn't show Bank or its transfer method. I don't know what fields Bank has or where the three yields are, so I can't tell where the acquire and release have to go relative to them. Only the hint's general recipe helps.

#### os6: Memory management

3. page_replacement, CLOCK: "When all are full, look at the frame under the hand". The rules don't say where the hand starts, or whether filling free frames moves it. The notes' claim "On the string above, clock has 9 faults" depends on this. I only got 9 by assuming the hand starts at frame 0 and doesn't move while free frames fill.

#### os7: File systems

4. P1: "How many files can the file system hold". I can't tell whether all 80 inodes can be files. The root directory needs an inode, and the notes mention that real file systems reserve some numbers ("The root directory's inode number is fixed (2 in ext2–ext4)"). So I don't know whether the answer is 80, 79 or fewer.

5. inode_fs: "stored on a simulated disk of nblocks blocks (a list of bytes), with a free-block bitmap and ninodes inodes". The notes' vsfs layout puts the superblock, bitmaps and inode table in disk blocks 0–7. Here it isn't stated whether the bitmap and inodes take up any of the nblocks, or whether every block is a data block. The hint (`self.bitmap = [False] * nblocks`) suggests the second, but the prompt doesn't say so.

### CS 320 Theory of Computation

#### tc3: Regular expressions and minimal DFAs

6. "For (a+)+b the count is 2ⁿ⁻¹". The notes explain the Fibonacci count for (a|aa)*b with code, but not why (a+)+b gives 2ⁿ⁻¹. I didn't see right away that this is the number of ways to cut n a's into non-empty pieces.

7. "p →_(R1)(R₂)*R₃ | R₄ r". The new arrow label is written inline with the subscript notation, and I had trouble reading it. I couldn't tell whether the label is ((R₁)(R₂)*R₃) | R₄, or whether the | reaches into the subscript differently. That matters for P2.

#### tc8: Undecidability and complexity

8. "The formula can also be converted to 3SAT, so 3SAT is NP-complete too." The notes don't say how. The Cook–Levin formula has clauses of various sizes, and nothing shows how a clause with more (or fewer) than three literals becomes clauses with exactly three while keeping satisfiability.

### CS 340 Databases

#### db1: The relational model

9. "a relation is a subset of D₁ × ⋯ × D_n: a set of n-tuples" contradicts "because attributes are named, the order of the columns doesn't matter either." Elements of a Cartesian product are ordered tuples, so (1, 'Ana') and ('Ana', 1) are different elements. I couldn't see how a subset of D₁ × ⋯ × D_n can have column order not matter.

#### db5: Storage and indexing

10. `print(plan("SELECT age FROM people WHERE age BETWEEN 30 AND 40"))` gives `['SEARCH people USING COVERING INDEX idx_age (age>? AND age<?)']`. BETWEEN is inclusive (30 ≤ age ≤ 40), but the plan shows strict > and <. The notes don't explain this. It looks as if SQLite would miss ages 30 and 40.

#### db6: Query processing and optimization

11. "the Grace hash join first partitions both inputs ... then joins each pair of pieces in memory: cost about 3(B(R) + B(S))". The factor 3 isn't explained. I worked out read + write in the partition phase and read again in the join phase, but the notes skip that step. P1(d) uses the formula.

#### db8: Recovery, and beyond relational databases

12. "The CLRs make undo safe to repeat too: after a second crash, they are redone like any update, and the loser's abort, once logged, means it is not undone again." Two things confused me here:
    - The notes' recover only handles UPDATE records in its redo loop, so CLRs in the log wouldn't be "redone like any update".
    - Undo just writes old values, and the notes say redo is safe to repeat for the same reason, so I couldn't see why undoing a loser a second time would be unsafe without CLRs.

    The wal_recovery problem then requires skipping k updates for k CLRs, and the lesson doesn't motivate that.

### CS 350 Computer Graphics

#### gr2: Transformations

13. transform3d hint: "Since you normalize at the end, you can skip dividing by the determinant only if you keep its sign." I didn't understand "keep its sign". It could mean multiplying by the sign of det A, or keeping the sign of each column. I also couldn't see why a negative determinant matters when the result is normalized anyway.

#### gr5: Shading and lighting

14. "The angle between **n** and **h** is about half that between **r** and **v**". This is stated without a reason. The worked example gives 18.4° and 36.9°, but I couldn't see why it holds in general, or when it is only "about" half.

15. "(1 − f_x)(1 − f_y)t₀₀ + f_x(1 − f_y)t₁₀ + (1 − f_x)f_yt₀₁ + f_xf_yt₁₁". The subscripts on t are never defined. I had to work out from the weights that the first index is the column offset and the second the row offset. The CODE problem uses tex[row][col], the opposite order, so it is easy to swap them.

### Across courses

16. CS 310's bank_lock (item 2) is the only programming problem where I couldn't see enough of the starter code to plan a solution. Other problems that depend on starter code (fetch_and_add in ticket_lock, PageFault in page_walk, Node in bplus_tree) describe it well enough to start.
