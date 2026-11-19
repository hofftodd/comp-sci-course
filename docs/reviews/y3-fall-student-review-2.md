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
