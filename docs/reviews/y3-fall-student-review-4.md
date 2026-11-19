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

## Professor's response (CS 310, CS 350)

1. **MLFQ at the lowest level (os2).** Rule 4 in the notes now ends: "At the lowest level it can't move down, so it goes to the back of that level with a fresh allotment (the bottom level is plain round robin)." This is what the mlfq problem's step 3 says and its solution does. P4's answer now says the same thing at the point where A finishes its level-2 slice at time 8 (A still finishes at 11).

2. **bank_lock prompt (os3).** The prompt now describes the starter's `Bank`: its one field, `balances` (a dict copied from the constructor argument), and the full `transfer` method with its three `yield`s marked as switch points 1–3. It also says that another transfer can run at each yield, between a read and the write that depends on it, so the whole body has to be one critical section. The starter, solution and tests are unchanged. The problem was regenerated and the starter still fails.

3. **CLOCK hand (os6).** The page_replacement prompt now says the frames are numbered 0 to `frames` − 1 and the hand starts at frame 0. A fault with a free frame fills the lowest-numbered free frame, and the hand doesn't move, so when memory first fills up the hand is at frame 0, which holds the first page loaded. This is what the solution does. The notes now say the same: while frames are free, a fault fills the next one and the hand stays at the first frame. On a replacement, the hand moves one frame past the new page. I checked the notes' "9 faults" against the solution, and the problem's test "The notes' reference string" asserts CLOCK = 9 and passes. Even if the hand stepped once per fill, it would wrap back to frame 0 after the frames filled, so the count is the same either way.

4. **vsfs inode count (os7, P1).** The question now states its assumptions: every inode number can be used (vsfs reserves none), and the root directory takes one inode. It asks how many *other* files and directories fit. Answer: 80 inodes, numbered 0–79, so 79. The answer adds that real file systems reserve some numbers (ext2 leaves 0 unused as "no inode" and keeps 1–10 for special uses), which would leave fewer.

5. **inode_fs layout (os7).** The prompt now says that the bitmap, inodes and directory are ordinary Python objects, not stored on the disk. All `nblocks` blocks, numbered from 0, are data blocks (indirect blocks included). The directory uses no inode, so all `ninodes` inodes are for files. This matches the solution (`bitmap = [False] * nblocks`, `create` hands out inodes 1..ninodes) and the tests, which still pass.

13. **transform3d hint (gr2).** I reworded the hint. Normalizing removes the *size* of det *A* but not its *sign*, so you must still divide by det *A* (or negate when det *A* < 0). When *A* includes a reflection, det *A* < 0, and skipping the division gives the correct normal times −1, pointing into the surface. Example: for `scale3(-1, 1, 1)`, the normal (1, 0, 0) must become (−1, 0, 0), but *B* alone gives (1, 0, 0). I checked this with numpy: *B*·(1, 0, 0) = (1, 0, 0), and (*A*⁻¹)ᵀ·(1, 0, 0) = (−1, 0, 0).

14. **Why the n–h angle is about half the r–v angle (gr5).** The notes now give the reason. **h** bisects **l** and **v**. When **n**, **l** and **v** are coplanar, put **l** at signed angle α from **n** and **v** at β. Then **r** is at −α, so the r–v angle is |α + β|, and **h** is at (α + β)/2: exactly half. Out of that plane it is only approximately half. Example: with **l** and **v** both 30° from **n** but 90° apart around it, n–h = 22.2° and r–v = 41.4°. With 10° instead of 30°, the angles are 7.11° and 14.11°. I computed these numerically, and also checked a coplanar case (30° and 40° on opposite sides: 5.0° and 10.0°).

15. **Bilinear subscripts (gr5).** After the formula, the notes now define *t*<sub>*ij*</sub> as the texel at column ⌊*x*⌋ + *i* and row ⌊*y*⌋ + *j*: the first subscript is the column offset and the second the row offset, so *t*<sub>10</sub> is to the right of *t*<sub>00</sub> and *t*<sub>01</sub> is below it. They also say explicitly that with `tex[row][col]` storage, *t*<sub>*ij*</sub> is `tex[⌊y⌋ + j][⌊x⌋ + i]`. The texture problem's prompt repeats the correspondence. I recomputed the worked example (1.3) with this indexing.

16. **bank_lock starter (across courses).** Resolved by item 2: the prompt now shows the `Bank` class and its `transfer` method in full, like the descriptions of `fetch_and_add`, `PageFault` and `Node` in the other problems.

## Professor's response (CS 320, CS 340)

**Item 6** (tc3, 2ⁿ⁻¹ for (a+)+b). Added a sentence after the Fibonacci code: each match cuts the n a's into non-empty runs, one per repetition of the outer +, and a cut is a yes/no choice at each of the n − 1 gaps, with aaa's four splits as an example.

**Item 7** (tc3, state-elimination label). The label is no longer a subscript. The displayed formula now reads "a single arrow p → r labeled (R₁(R₂)*R₃) | R₄", followed by a sentence saying the whole expression is the label and | is the outermost operator (the path through q, or the old direct arrow). It reads the same on the page and in the dump.

**Item 8** (tc8, converting to 3SAT). Added a short paragraph after the CNF definition. It says the Cook–Levin formula is already a conjunction of clauses of various sizes. Short clauses are padded with fresh variables: (ℓ₁ ∨ ℓ₂) becomes two clauses with z and ¬z, and (ℓ) becomes four clauses with ±z₁, ±z₂. Long clauses are chained with fresh y₁ … y_{k−3}. A two-line argument shows each direction keeps satisfiability, and the conversion is polynomial. I checked the chaining equivalence by brute force for k = 5.

**Item 9** (db1, Cartesian product vs unordered columns). The student is right that the product definition fixes an order. The notes now give the usual reconciliation: a tuple is a function from attribute names to values ({sid ↦ 1, name ↦ 'Ana'}), and fixing an attribute order turns it into an ordered tuple, so the product definition is the same thing with a column order chosen. The text no longer presents this as a consequence of a relation being a set.

**Item 10** (db5, BETWEEN plan text). I checked in Python's sqlite3 (SQLite 3.53.1): with an index on age, `WHERE age BETWEEN 30 AND 40` returns ages 30 through 40 (11 values from 18–90), while the plan text still reads `age>? AND age<?`. The notes now add a line that runs on the lesson's table, `print(db.execute("SELECT min(age), max(age) FROM people WHERE age BETWEEN 30 AND 40").fetchone())   # (30, 40)`, which the lesson-code checker verifies. A sentence explains that the plan text only names a lower and an upper bound and doesn't show whether they are inclusive.

**Item 11** (db6, 3(B(R) + B(S))). Added the derivation inline. Partitioning reads and writes every page once, 2(B(R) + B(S)), and the join phase reads every piece once more, B(R) + B(S).

**Item 12** (db8, CLRs). Both points were valid. The notes said CLRs are "redone like any update", but their `recover` redid only UPDATEs. The explanation of why CLRs matter also didn't hold up in this model, since undo just writes old values. Changes:
- The notes' `recover` redo loop now also reapplies CLRs (`elif rec[0] == "CLR": disk[rec[2]] = rec[3]`). The original example's output is unchanged.
- The paragraph is rewritten with the two actual reasons:
  1. Redo repeats rollbacks. Without CLRs, a transaction that aborted before the crash would have its updates redone and nothing would remove them. Treating it as a loser instead would be wrong once a later committed transaction has written the same item: T1 sets A 1→2 and rolls back, T2 sets A to 7 and commits, and undoing T1 again would put A back to 1. A new code example runs this log through `recover` and prints `({'A': 7, 'B': 0}, [('CLR', 'T3', 'B', 0), ('ABORT', 'T3')])`. It is the same as the problem's hidden test, and I verified it.
  2. A CLR marks an update as already undone. A loser with k CLRs has had its k most recent updates undone, and recovery must skip them so that each update gets exactly one CLR. If recovery undid them again and logged second CLRs, and then crashed again before the abort, the next recovery would count too many CLRs and skip an update that was never undone. I checked this with the problem's reference solution: on a log with doubled CLRs for C and B, A stays at 2 instead of being restored to 1.
- The notes say their `recover` leaves out partial rollbacks, and point to the practice problem, which handles them along with checkpoints.
- The wal_recovery prompt now says the notes explain why skipping is needed. I edited it in cs340_spec.py and regenerated; 0 problems need attention.
