# Student review: Year 3 Fall

*Round 5. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a third-year student. Before this term I completed CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240 and PHYS 250. I read the four course dumps in lesson order (cs310, cs320, cs340, cs350) and tried every quiz question and practice problem in my head. I also worked through most of the stated numbers by hand: the scheduling averages, the page-replacement tables, the banker's example, the CYK table, the Turing-machine traces, the join-cost table, the sRGB and Blinn–Phong values, and the ray–sphere example. I couldn't make any of them come out different from the notes. The places where I got confused are below.

### CS 310 Operating Systems

#### os4: Locks and condition variables

1. "(The loop's condition reads two variables in one step; putting a yield between the reads changes nothing.)" The proof just before this treats the check of flag[j] and turn as a single atomic step. This sentence says splitting the check into two steps doesn't matter, but gives no reason. I couldn't see why the proof would still hold if the other thread could run between the two reads.

#### os7: File systems

2. "a 1 TB disk of 4 KB blocks (244 million blocks) needs about 30.5 MB of bitmap". I first got 2⁴⁰ / 2¹² = 268 million blocks. I only got 244 million by taking 1 TB as 10¹² bytes and 4 KB as 4,096 bytes, which mixes decimal and binary units in one calculation. The lesson doesn't say which units it uses. (Lesson 8's storage problem does say it uses decimal units throughout.)

### CS 320 Theory of Computation

#### tc4: Limits of finite automata

3. The warning example defines "L = {aᵐbʲcᵏ : if m = 1 then j = k}", where m counts the a's. The Myhill–Nerode section restates it as "{aⁱbʲcᵏ : if i = 1 then j = k}" and then says "the suffix cʲ accepts abʲ and rejects abᵐ for m ≠ j". There m counts b's. Reading "abᵐ" with the earlier meaning of m in mind, I briefly thought it was about the number of a's.

### CS 340 Databases

#### db2: SQL I: tables, queries and joins

4. Q4: "Students LEFT JOIN enrolled ON s.sid = e.sid, where 5 students have 8 enrollments and one student has none. How many rows?" I first read this as 5 students with enrollments plus a sixth with none. The intended answer, 9, only works if the student with none is one of the 5.

#### db3: SQL II: grouping, subqueries, views and parameters

5. P1(c): "the course(s) with the most students, using a subquery rather than LIMIT 1". I can't nest COUNT inside MAX directly, so I need the maximum of per-course counts. That means a subquery in FROM, or a ">= ALL" comparison. The notes say "A query can appear inside another wherever a value or a table can" but never show a subquery used as a table in FROM, or the syntax it needs. In the end I used the CTE form from the same lesson, but I wasn't sure that counts as "a subquery".

#### db8: Recovery, and beyond relational databases

6. "If it undid them again and logged second CLRs, and then crashed again before logging the abort, the log would hold more CLRs than the loser has updates, and the next recovery's count would skip an update that was never undone." I tried a loser with 3 updates and 1 CLR. If recovery redoes all 3 undos with new CLRs, the log then holds 4 CLRs, more than its 3 updates. But then all 3 updates really have been undone, so nothing is wrongly skipped. The bad case I could construct is a recovery cut short partway through, where the CLR count is larger than the number of updates actually undone but not larger than the number of updates. That doesn't match the sentence's condition, so I couldn't follow the argument as written.

### CS 350 Computer Graphics

I found nothing confusing in CS 350. Every term was defined before use, every step I checked worked, and every quiz and practice problem could be started from the notes.

### Across courses

7. CS 340 Lesson 5 says "CS 310, which you are taking in parallel, also uses the word" and then relies on "CS 310 Lesson 6", "CS 310 Lesson 7" (the page cache) and "CS 310 Lesson 8" (flash pages and the flash translation layer). If I keep the two courses roughly in step, I reach CS 340 Lesson 5 around CS 310 Lesson 5, before any of those three lessons. That paragraph then explains a database page using OS pages, the page cache and flash pages, none of which I have met yet.

## Professor's response

1. **os4, Peterson's split read.** The claim was right; the lesson now gives the reason. From thread 0's write of `turn` until both threads are inside, neither thread writes `turn` again, and thread 1 keeps `flag[1]` up. So thread 0 sees `flag[1]` true and `turn` = 1 whenever it reads each variable, and a `yield` between the two reads changes nothing. I checked this in the lesson's simulator, with a yield between the reads in each order (flag first, turn first). Both give 0 overlapping schedules out of 1,000 and out of 5,000.

2. **os7, bitmap size.** The lesson now uses binary units throughout, as its other sizes do (4 KB = 4,096, and the 4 MB and 4 TB file sizes). A 1 TB disk has 2⁴⁰/2¹² = 2²⁸ ≈ 268 million blocks, so the bitmap is 2²⁸ bits = 2²⁵ bytes = 32 MB. I checked this with Python. The old figures, 244 million and 30.5 MB, mixed decimal and binary units.

3. **tc4, the letter m.** The warning example now uses i for the number of a's in both places: in its definition and in "exactly two a's, i = 2". The Myhill–Nerode sentence now reads: "for two different members abʲ and abⁿ (so n ≠ j), the suffix cʲ accepts abʲcʲ and rejects abⁿcʲ". The letter m no longer appears in this example.

4. **db2 Q4.** This now reads "where there are 5 students in all: 4 of them have 8 enrollments between them, and the fifth has none." The answer is still 9.

5. **db3 P1(c).** The Subqueries section now shows a subquery in FROM. It explains why `MAX(COUNT(*))` can't be written, names the inner column with `AS`, and notes that the subquery itself can be named, `(...) AS sizes`, which SQLite allows and some systems require. Two run-checked lines show the per-course counts, `[('CS201', 3), ('CS240', 1), ('MATH220', 3), ('PHYS150', 1)]`, and their maximum, `[(3,)]`. The prompt now says the subquery may go in WHERE, HAVING or FROM, and that a CTE is also fine. The worked answer adds the CTE version. I ran it, and it gives the same `[('CS201',), ('MATH220',)]`.

6. **db8, re-undoing compensated updates.** The student was right: the old condition, "more CLRs than the loser has updates", is not what goes wrong. Redoing an undo writes the same old value again, so the values are unharmed. What breaks is the count: the number of CLRs no longer equals the number of updates undone. I simulated this with the practice problem's count-and-skip recovery:
   - A loser set A, B and C, and the log has one CLR, for C. Recovery gives A = B = C = 0, which is correct.
   - Now add a second CLR for C, as a recovery that ignored the first one would log before crashing. The next recovery skips C and B, and leaves B = 2.

   The sentence now walks through exactly this case: "If it undid them again and logged second CLRs, the count would stop matching the updates undone. Say a loser set A, B and C and has one CLR, for C. A recovery that ignores that CLR undoes C again and logs a second CLR for it; if it then crashes, the log holds two CLRs though only C has been undone, so the next recovery skips C *and* B, and B's change is never undone."

7. **db5, the "Three kinds of page" note.** The note now gives what the lesson needs and points to CS 310 Lessons 6–8 only on the side:
   - An OS page is the 4 KB block in which the OS hands out memory. This is cited to CS 210 Lesson 7, which says exactly that.
   - The page cache, where the OS keeps recently used file data in RAM, is defined in place.
   - A flash page is the SSD's internal unit, which the drive hides behind numbered 4 KB logical blocks.

   The alignment argument and the cost-model point are unchanged. The other CS 340 pointer to CS 310, in Lesson 8 (journals, CS 310 Lesson 7), already reads as a side pointer, so I left it.

X2. **tc3, backreferences.** This now reads: "...so it denotes {aⁿbaⁿ}, which is not regular (Lesson 4's distinguishing-set argument for {0ⁿ1ⁿ} works the same way: the strings aⁱ need different suffixes baⁱ)."

X3. **tc6, opening paragraph.** This now reads: "Lesson 3 showed that, for regular languages, the two views match: regular expressions, which also generate strings, describe exactly the languages finite automata recognize (Kleene's theorem)."

X4. **tc1 P3, worked solution.** This now reads: "Lesson 3 uses exactly this test to find states that can be merged, and Lesson 4 uses it to prove that the result has as few states as possible."

No problem files or specs changed: every edit is to notes, a quiz question or a written practice answer in data/cs310.js, data/cs320.js and data/cs340.js.
