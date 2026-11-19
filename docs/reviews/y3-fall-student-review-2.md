# Student review: Year 3 Fall

*Round 2. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a third-year CS student. Before this term I took CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240 and PHYS 250. I can program in Python and read C. I've seen page tables, caches and assembly, data structures and graph search, dynamic programming and P/NP at the CS 220 level, linear algebra and probability. I read all four course dumps (cs310, cs320, cs340, cs350) in order and tried every quiz and practice problem in my head. Most of the material was explained well enough for me to follow. The items below are the places where I actually got stuck or confused.

### CS 310 Operating Systems

#### os1: What an operating system does

1. "printf("parent: x = %d, child's exit code %d\n", x, WEXITSTATUS(status));" The lesson never says what WEXITSTATUS is: a macro, a function, or why the status needs decoding at all. The lesson explains every other new name in the shell code (strtok, execvp, dup2, open's flags), but not this one, even though both programs use it.

#### os2: CPU scheduling

2. P4: "An MLFQ has three levels with time slices of 1, 2 and 4 ms and no boost. A job A of length 10 ms arrives at time 0, and an interactive job B arrives at time 5…" At time 5, A is partway through its 4 ms slice at the lowest level. The five rules don't say whether a newly arrived higher-priority job preempts a running job in the middle of its slice, or waits until the slice ends. Rule 1 ("If A's priority is higher than B's, A runs") suggests preemption, but I couldn't be sure. I also didn't know whether A's partly used slice carries over when it resumes. The CODE mlfq problem settles both questions ("stays at the front of its level" with its used time), but P4 comes before it.

#### os6: Memory management

3. "fills the frame: reads the page from the program file or from swap space on disk". The lesson never defines swap space: where it is, or when pages get written there. Later "suspend (swap out) the rest" assumes I know.

#### os7: File systems

4. CODE inode_fs, write: "Free the old blocks, then allocate the lowest-numbered free blocks… If there isn't enough space or the file would be too large, raise OSError and leave the file and the bitmap unchanged." Does "enough space" count the blocks the file already holds, which would be freed first? Overwriting a 3-block file with 3 new blocks on a full disk succeeds under one reading and fails under the other. The hint ("check that the total fits, and only then change anything") doesn't say which free count to compare against.

#### os8: I/O, storage and virtualization

5. "The gap from memory to a hard disk is a factor of about 100,000. Scaled so that a memory access takes one second, a random disk read would take more than a day." The table just above gives a disk read as "5–10 ms" against 100 ns for memory, which is a factor of 50,000 to 100,000. At 5 ms the scaled time is 50,000 s, about 14 hours. At the lesson's own computed 8.19 ms it is about 22.75 hours. "More than a day" (86,400 s) is true only near the 10 ms end, so I couldn't make the claim agree with the numbers given.

### CS 320 Theory of Computation

#### tc3: Regular expressions and minimal DFAs

6. "Minimization also gives a way to decide whether two DFAs, or two regular expressions, accept the same language: minimize both and compare." Compare how? The minimal DFA is unique only "up to renaming its states", so two minimal DFAs for the same language can have different state names. The lesson doesn't say how to check that two DFAs are the same up to renaming.

#### tc4: Limits of finite automata

7. (blocking) P4(b): "Let L be the binary strings with more 1s than 0s. Show L is not regular… (b) using closure properties and a language already shown non-regular in this lesson." The lesson shows {0ⁿ1ⁿ}, BAL, E (equal numbers of 0s and 1s) and the "warning" language to be non-regular. L ∩ 0*1* gives {0ⁱ1ʲ : j > i}, and complement(L) ∩ 0*1* gives {0ⁱ1ʲ : i ≥ j}. Neither of these was shown non-regular; P1's language is {i > j}, which is the mirror image of neither. To get E, I seem to need "more 0s than 1s" to be regular whenever "more 1s than 0s" is, which means swapping the symbols. That isn't one of the closure properties taught. I couldn't find a combination of union, intersection, complement, difference, concatenation and star that reaches a language the lesson proved non-regular.

#### tc5: Context-free grammars and parsing

8. (blocking) P2: "Show that the grammar S → if S | if S else S | x is ambiguous… Explain what the ambiguity means for a program, and how languages resolve it." The lesson never says how real languages resolve this (the dangling else). The only fix it shows is rewriting arithmetic grammars with one variable per precedence level, and I couldn't see how that applies to if/else. So I could do the first two parts but not the last.

#### tc6: Pushdown automata and the limits of context-free languages

9. "Choose the repeat among the lowest k + 1 variables on the path, which keeps |vxy| ≤ p." The lesson doesn't explain why choosing the repeat low on the path bounds the length of vxy. I worked out that the upper A's subtree must have height at most k + 1 variables, and so yields at most 2ᵏ = p symbols, but the step is skipped.

#### tc8: Undecidability and complexity

10. CODE busy_beaver: "No algorithm can compute them for every n: if one could, it would decide HALT_ε, halting on a blank tape, which the notes show is undecidable." The busy-beaver machines here use a different model from Lesson 7's: a tape unlimited in both directions, symbols 0 and 1 with no blank, a single halting state H and no accept/reject states. HALT_ε was proved undecidable for Lesson 7's machines. The lesson doesn't say why the result carries over to these machines. I assume it's because the variants are equivalent (Lesson 7), but deciding halting for one n-state model only gives a bound for machines of that same model.

### CS 340 Databases

#### db5: Storage and indexing

11. "Each SQLite table is itself stored as a B+ tree keyed by a hidden integer rowid… Each index created with CREATE INDEX is a separate B-tree whose entries are (indexed columns, rowid)." The lesson took care to separate B-trees (CS 201) from B+ trees (all data in the leaves, leaves linked). Then the very next section calls the table a B+ tree and the index a B-tree. I couldn't tell whether that difference is deliberate (SQLite really uses B-trees for indexes) or the two words are being used interchangeably.

12. CODE index_choice: "Q3 needing no separate sort (no USE TEMP B-TREE FOR ORDER BY step)." The lesson's EXPLAIN QUERY PLAN examples only show SCAN and SEARCH lines. It never shows the plan step SQLite prints when it has to sort, so I had to take on trust what this step is and when it appears.

### CS 350 Computer Graphics

#### gr1: Images and color

13. "When the background may itself be partly transparent, it's simpler to store premultiplied alpha: keep αF instead of F. Then over becomes C = F_p + (1 − α_F)B_p". The subscripts p and F (in F_p, B_p and α_F) are never defined. I guessed that F_p = α_F·F and B_p = α_B·B, and that C is then also premultiplied, but the formula is written as if I already knew this.

#### gr6: Ray tracing

14. "Glass adds a refracted ray, bent by Snell's law, at each hit". The lesson doesn't explain Snell's law or how to compute the refracted direction, and my physics courses (mechanics, electricity and magnetism) didn't cover optics. No problem needs it, but the term is used as if known.

15. "L_o(**x**, **ω**_o) = L_e(**x**, **ω**_o) + ∫ f_r(**x**, **ω**_i, **ω**_o) L_i(**x**, **ω**_i) (**n** · **ω**_i) d**ω**_i". The prose says the integral is "over all incoming directions above the surface". But integrating with respect to a direction (d**ω**_i) isn't something MATH 131 covered. It isn't a single, double or triple integral over coordinates that I recognize, and its domain isn't written on the integral sign.

### Across courses

16. The word "page" means three different-sized things across this term. CS 310 Lessons 6 and 8 use a 4 KB memory page and a 4–16 KB flash page that must be erased in blocks. CS 340 Lesson 5 uses a database page of 4,096 bytes in SQLite and 8 KB in PostgreSQL. Neither course says whether a database page lines up with the OS's memory pages or the SSD's flash pages, or whether they are unrelated. That made it hard for me to connect CS 340's "count page I/Os" with CS 310's page cache and its SSD read costs.

## Professor's response (CS 310, CS 350)

Items 1–5 and 13–15 of `y3-fall-student-review-2.md`.

1. **WEXITSTATUS (os1).** Added a paragraph after the fork/waitpid program's output: `waitpid` stores an `int` that packs how the child ended and, if it exited normally, its exit code in bits 8–15; `WEXITSTATUS` is a macro from `<sys/wait.h>` that extracts the code (on Linux, `(status & 0xff00) >> 8`), so here the status is 1792 = 7 × 256 and the macro gives 7; `WIFEXITED` is mentioned as its partner. Verified with gcc (a child returning 7 gives status 1792 and both expressions give 7; the definition matches glibc's `bits/waitstatus.h`). The shell program uses the same macro, which is now explained before it.

2. **MLFQ preemption and partly used slices (os2 P4).** Added a short paragraph after the five rules: rule 1 holds at every moment, so a job arriving at (or woken into) a higher level preempts the running job at once; the preempted job stays at the front of its level and keeps the time already used there, so it gets only the rest of its slice and then moves down by rule 4. This is the behaviour of the `mlfq` programming problem ("stays at the front of its level", used time kept) and of P4's answer (A resumes 6–8 to finish its slice), so P4 is now answerable from the notes.

3. **Swap space (os6).** Bolded "swap space" in the page-fault handler's steps and added a paragraph after them: it is a disk area (partition or file) for evicted pages; code pages can be dropped and re-read from the program file, but modified anonymous (heap, stack) pages belong to no file, so they are written to swap on eviction and read back on the next fault. The page-replacement paragraph now says a dirty page is written "to its file, or to swap space if it is anonymous", so the later "swap out" in the thrashing paragraph refers to something defined.

4. **inode_fs free-block count (os7).** The reference solution compares the blocks needed with the free blocks plus the blocks the file holds now (data and indirect), since those are freed first. The prompt now states this rule and gives the example that overwriting a 3-block file with 3 blocks succeeds on a full disk; the hint says to compare the total with `free_blocks()` plus the file's current blocks. The behaviour wasn't pinned by any test (the existing error test had enough free blocks either way), so I added a visible test "Overwriting on a full disk": on a 4-block disk, a 3-block file is rewritten as 4 blocks with only 1 free block (fails under the other reading), then rewritten at 4 blocks on a full disk, then a 33-byte write (5 data blocks plus an indirect block) raises `OSError` and leaves the file and free count unchanged. Regenerated `data/cs310-code.js` from the spec: 0 problems, starter still fails.

5. **Scaled disk time (os8).** Replaced the sentence with numbers that match the table: the gap is a factor of 50,000 to 100,000 (5 ms / 100 ns and 10 ms / 100 ns); scaled to one second per memory access, a random disk read takes 50,000 to 100,000 s, about 14 to 28 hours, and the lesson's own 8.19 ms read takes 81,900 s, nearly a day (22.75 hours). All computed in Python.

13. **Premultiplied alpha subscripts (gr1).** Rewrote the paragraph: each layer has its own opacity, α_F for the foreground and α_B for the background; premultiplied colors are defined as F_p = α_F·F and B_p = α_B·B ("p for premultiplied"); over gives C_p = F_p + (1 − α_F)B_p with combined opacity α_C = α_F + (1 − α_F)α_B; the result is premultiplied too (displayed color C_p/α_C), which is why stacking stays one formula; and with an opaque background (α_B = 1) it reduces to the earlier formula.

14. **Snell's law (gr6).** The term was used as if known. The sentence now says the refracted ray is bent where it crosses the surface by an amount that depends on the two materials, names the rule as Snell's law from optics, and says this course doesn't need it (no problem uses refraction).

15. **Integrating over directions (gr6).** Added one paragraph after the definitions of the symbols: picture the directions above the surface as points on a unit hemisphere centred at **x**; split it into many small patches, each a narrow cone of directions, whose size dω_i is the patch's area on the unit hemisphere (the whole hemisphere has area 2π); the integral is the limit of the sum of (integrand for a direction in the patch) × (patch area) as patches shrink, a Riemann sum like MATH 131's midpoint sums with patches of a hemisphere in place of strips; the domain is often written as a subscript Ω. (MATH 131 does Riemann sums over intervals, not areas, so the comparison is phrased that way.) Checked numerically that a patch sum over the hemisphere gives area 2π.

## Professor's response (CS 320, CS 340, item 16)

6. Agreed. tc3 now says how to compare two minimal DFAs up to renaming, after "minimize both and compare". You walk both machines in step from their start states and record each pair of states. The walk fails if a state ends up paired with two different states, or if a pair disagrees on accepting. It takes O(|Q| · |Σ|) time. A checked code block (`same_up_to_renaming`) runs it on two mod-3 counters whose states are named differently. It prints True for matching accepting states and False when they don't match.

7. Agreed (blocking). tc4's "Closure properties as a tool" now teaches closure under renaming symbols. If L is regular, swapping 0 and 1 in every string gives a regular language. The proof is to swap the labels on every transition of a DFA for L. The section gives the "more 0s / more 1s" example and notes that any one-to-one renaming works. P4(b)'s answer now cites this property: L′ (more 0s than 1s) is regular, so the complement of L ∪ L′, which is E, is regular, but the notes showed E is not. That route is now doable from the lesson.

8. Agreed (blocking). tc5 now has a paragraph on the dangling else, after the precedence rewrite. It gives the convention that an else belongs to the nearest if without an else. It shows two ways to enforce that:
   - A grammar rewrite with variables for matched and unmatched statements: S → M | U, M → if M else M | x, U → if S | if M else U. A brute-force count of parse trees confirmed that this grammar generates the same strings as the original, with exactly one tree each, for all strings up to 9 tokens.
   - Having the parser attach else to the innermost open if, as a recursive-descent parser does.

   The paragraph also names languages that avoid the ambiguity: Python with indentation, Rust and Go with required braces, and Ada, Fortran and the shell with end if or fi. The P2 answer now refers to both ways of enforcing the convention.

9. Agreed. In tc6, the proof idea for the pumping lemma for context-free languages now takes a longest path from the root. Its lowest k + 1 variables contain a repeat. Because the path is a longest one, no path below the upper A has more than k + 1 variables. So, by the count already in the proof, the upper A's subtree yields at most 2ᵏ = p symbols, which bounds |vxy|.

10. Agreed. The busy_beaver prompt (changed in cs320_spec.py and regenerated, 0 problems) now explains why the result carries over to this machine model. Given any Lesson 7 machine M, a program can build a machine M′ in the busy-beaver model that halts from an all-0 tape exactly when M halts from a blank tape:
    - code each of M's tape symbols as a fixed-length block of 0s and 1s, with the blank as all 0s;
    - write a marker code in cell 0 so M′ can treat it as the left end;
    - send both accept and reject to H.

    Running M′ for the maximum step count of n-state machines then decides HALT_ε for M. The prompt points to Lesson 7's variants for why such model differences don't matter.

11. Agreed. The wording was loose. I checked SQLite's file format against a real database file. Interior table pages hold only a child pointer and a rowid in each cell. Interior index pages hold full keys, for example `name000234` plus the rowid. db5 now says SQLite calls both structures "b-trees", but they are the two kinds the lesson describes:
    - A table b-tree is of the B+ kind: rowid signposts in interior pages and all rows in the leaves. Unlike the textbook B+ tree, its leaves aren't linked; a scan moves between leaves through their parents.
    - An index b-tree is a B-tree in CS 201's sense: each entry is stored once, in an interior page or a leaf.

12. Agreed. db5 now has an EXPLAIN QUERY PLAN example, run with Python's sqlite3 (SQLite 3.53.1) on the lesson's `people` table and checked by the lesson-code checker. `WHERE city = 'Boston' ORDER BY age` uses idx_city_age with no sort step. `... ORDER BY name` adds `USE TEMP B-TREE FOR ORDER BY`. `SELECT * FROM people ORDER BY age` gives `SCAN people` followed by `USE TEMP B-TREE FOR ORDER BY`. The text explains that SQLite sorts by building a temporary B-tree when no index supplies the order.

16. Agreed. db5 now has a note, "Three kinds of page", right after the cost model is introduced. It points sideways to CS 310, which students take in parallel, and separates three things:
    - the database page, chosen by the database (SQLite allows 512 bytes to 64 KB, with 4,096 bytes by default);
    - the 4 KB OS page (CS 310 Lesson 6) and the OS page cache (CS 310 Lesson 7);
    - the SSD's flash page, hidden behind the flash translation layer (CS 310 Lesson 8).

    The note says the three are independent. Databases use multiples of 4 KB, aligned in the file, so that a database page never covers part of an OS page or a 4 KB logical block. A database page read may be answered from the OS page cache without touching the drive. The cost model counts database pages because that is the unit the database's algorithms control.
