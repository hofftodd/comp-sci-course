# Student review: Year 3 Fall

*Round 3. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a third-year CS student. Before this term I finished CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240 and PHYS 250. I know C and Python, data structures, basic algorithms and NP-completeness, computer architecture and paging hardware, linear algebra, probability, and the cross product. I read the four course dumps (cs310, cs320, cs340, cs350) in order, checked the worked numbers I could redo by hand, and tried each quiz and practice problem in my head. Most of the material followed from the notes. The items below are the places where it didn't.

### CS 310 Operating Systems

#### os1: What an operating system does

1. "0644 is its permission bits, in octal". The course never says what the permission bits are: which bit means read, write or execute, or for whom. So I can't tell what 0644 allows. The same gap comes back in os7's path lookup, "check that it is a directory you may search": I don't know what "search" permission on a directory is or which bit grants it.

#### os2: CPU scheduling

2. In the mlfq programming problem: "If boost is given and t is a positive multiple of it, move every unfinished job to the back of level 0". Jobs that haven't arrived yet are also "unfinished". I can't tell whether they should be moved into level 0 early by a boost, or whether only jobs already in the queues count.

#### os6: Memory management

3. Quiz Q3's intended answer is "A page fault; the kernel maps a zero-filled frame and restarts the instruction" for a program that "touches a page of its heap for the first time". But the copy-on-write section says "New anonymous pages are initially mapped, read-only, to a single shared frame full of zeros, the zero page", and that a private zero-filled frame is given only on "The first write to a page". If the first touch is a read, these two seem to disagree about what the kernel does.

### CS 320 Theory of Computation

#### tc4: Limits of finite automata

4. "∃ a split xyz satisfying 1 and 2 ∀i", "condition 1 forces y into a part of the string", "Condition 1 made every split look the same" and "The skill is in step 2". The lemma's conditions and the game's steps are shown as unnumbered bullet lists, so "1", "2" and "step 2" refer to numbers that don't appear anywhere. I had to guess they mean the position in each list.

5. The warning example, L = {aⁱbʲcᵏ : if i = 1 then j = k}, says it "satisfies the lemma's conclusion with p = 2 (pump the first symbol; if i = 2, pump both a's together so the count never becomes 1)". Here i is the number of a's, but i is also the pumping exponent in xyⁱz on the same page. I couldn't tell at first which i "if i = 2" meant, and so couldn't follow the argument.

#### tc6: Pushdown automata and the limits of context-free languages

6. In "PDA to grammar (sketch)": "giving A_(pq) → aA_(rs)b, where a and b are the symbols read by that push and that pop". The states r and s are never defined. I'm guessing r is the state after the first push and s the state before the last pop, but the text doesn't say. It also says to "modify the PDA so that it ... makes every move either a push or a pop" without saying how a move that does both, or neither, gets converted.

### CS 340 Databases

#### db4: Database design and normalization

7. Practice P4 (teaches(course, teacher, textbook)) asks for "a better design". The obvious split is (course, teacher) and (course, textbook). But the only lossless test in the notes is "when the shared attributes determine all of one piece". Here the shared attribute is course, and course determines neither teacher nor textbook: the problem says there are no nontrivial FDs. So by the lesson's own criterion I can't show that the split is lossless, and nothing in the lesson explains this kind of redundancy.

#### db6: Query processing and optimization

8. Grace hash join: "It works when each piece of S fits in memory, roughly when M > √B(S)." The square root isn't derived. I can see that each piece has about B(S)/(M − 1) pages, but the step from there to √B(S) is skipped.

### CS 350 Computer Graphics

#### gr1: Images and color

9. Bresenham: "each step up a row decreases F by dx, so subtracts 2dx." Earlier the lesson says "y points down", and the step in question goes from row y to row y + 1, which is downward on the screen. Calling it "up a row" made me unsure which direction was meant.

10. Premultiplied alpha: "F_p = α_FF and B_p = α_BB". The subscript runs straight into the color letter, so "α_FF" reads as if the subscript were FF. It took me a while to see it means α_F times F.

#### gr4: Rasterizing triangles

11. Back-face culling: "triangles facing away from the camera (negative signed area on screen, for a mesh listed counterclockwise from outside)". This seems backwards to me. In the lesson's own example, a = (1, 1), b = (7, 2), c = (2, 6) gives E(a, b, c) = 29 > 0, and on the y-down grid a → b → c goes top-left → right → bottom-left, which is clockwise on the screen. A front face, listed counterclockwise as seen from outside, should look counterclockwise on screen and so have negative E. That would make the back faces the positive ones.

12. zbuffer problem: "A sample is covered when all three barycentric weights are positive, or zero on an edge that owns its boundary". If a sample lies exactly on a vertex, two weights are zero. It's unclear whether both of those edges must own their boundary, or only one.

#### gr5: Shading and lighting

13. "The angle between **n** and **h** is about half that between **r** and **v**, so Blinn–Phong needs an exponent about four times larger for a highlight of the same size." I don't see why halving the angle needs four times the exponent rather than twice. The step is skipped.

#### gr6: Ray tracing

14. "In practice, a ray is only allowed to hit at t greater than a small tolerance ε (such as 10⁻⁶), for a reason the next section explains." The next section is "Ray–plane intersection", which doesn't explain it. The reason (shadow acne) only comes in "Shading, shadows and reflection", two sections later. I went looking for it in the wrong place.

### Across courses

I found nothing that spans courses beyond the items above. Where the courses share terms (page, wait-for graph, journal, write-ahead logging, CNF), the notes reconcile them explicitly, and I found no contradictions between courses.

## Professor's response (CS 310, CS 350)

1. **os1 permission bits; os7 "search".** After `0644` in os1 the notes now explain the three octal digits (owner, group, everyone else), each the sum of read 4, write 2 and execute 1, so 0644 is read and write for the owner and read only for everyone else. They also say what read, write and execute mean on a directory: execute means *search*, permission to look a name up in it. The os7 path-lookup step now says "a directory you may search (that you have its execute permission, Lesson 1)".

2. **mlfq boost and jobs not yet arrived.** In the prompt (cs310_spec.py, regenerated into data/cs310-code.js), step 1 now moves "every job that is waiting in a level". It also says that jobs that haven't arrived yet aren't moved, and that a job arriving at a boost time joins in step 2, after the boosted jobs. This matches the solution, which boosts only jobs already in the queues and does it before adding arrivals. I added a hidden test, `mlfq([('A', 0, 6), ('B', 4, 3)], [1, 2], boost=4) == {'A': 7, 'B': 9}`. Its result differs if arrivals are added before the boost (that order gives B 8, A 9).

3. **os6 Q3 and the zero page.** The question now reads "A program *writes to* a page of its heap for the first time". The answer is "A page fault; the kernel gives the page a private zero-filled frame and restarts the instruction". Its explanation adds that a first read would instead map the shared zero page read-only. In the page-fault handler's list, step 3 now says zero filling is for anonymous memory written for the first time, and that a first read needs no new frame (pointing to the zero-page section). Notes and quiz now agree.

9. **Bresenham "up a row".** Now reads "each step from row *y* to row *y* + 1 (one row down the screen, since *y* points down)". The worked example says "moves us on to the next row" instead of "sends us up a row". I also replaced "whether the line passes above or below the midpoint" with "which side of the line the midpoint … lies", because "above" and "below" are ambiguous with *y* pointing down.

10. **α<sub>F</sub>F typography.** Products are now written with a visible dot: *F*<sub>p</sub> = *α*<sub>F</sub> · *F*, *B*<sub>p</sub> = *α*<sub>B</sub> · *B*, and likewise (1 − *α*<sub>F</sub>) · *B*<sub>p</sub> and (1 − *α*<sub>F</sub>) · *α*<sub>B</sub>. The dump now shows "F_p = α_F · F".

11. **Back-face culling sign.** The student is right: the old rule was backwards. I checked it by computing. The triangle (0, 0, −5), (1, 0, −5), (0, 1, −5) faces the camera (its normal is (0, 0, 1)) and is counterclockwise seen from outside. Projected and mapped through Lesson 3's viewport (which flips *y*), it has *E* = −100 on a 100 × 100 screen. The lesson's own example, with *E* = 29 > 0, runs clockwise as drawn on the *y*-down grid. The paragraph now explains the rule. A front face is seen from outside, so it looks counterclockwise on screen. With *y* down, *E* > 0 means the triangle looks clockwise (citing the example). So front faces have *E* < 0, and back faces have *E* > 0 and are the ones skipped. This agrees with the earlier remark that *E* > 0 puts **p** on your right as you walk from **a** to **b**. The zbuffer problem does no culling and accepts either vertex order, so its tests are unaffected.

12. **zbuffer at a vertex.** The prompt now says "each of its three barycentric weights is either positive, or zero on an edge that owns its boundary". It adds that a sample exactly on a vertex, where two weights are zero, is covered only if both edges meeting there own their boundary, which is what the solution's `all(...)` does. The gr4 notes on the top-left rule gained the same sentence. I added a test with vertices on pixel centres, (2.5, 2.5), (10.5, 2.5), (2.5, 10.5), in both vertex orders. The top-left vertex (top edge plus left edge) is covered, and the other two vertices (each touching the slanted right edge) are not. An "either edge" reading fails this test.

13. **Why four times the exponent.** I added the small-angle step. cos *θ* ≈ 1 − *θ*²/2 (the degree-2 Taylor polynomial, MATH 131 Lesson 5), and 1 − *x* ≈ *e*<sup>−*x*</sup>, so cos<sup>*n*</sup> *θ* ≈ *e*<sup>−*nθ*²/2</sup>. Brightness therefore depends on *nθ*², and halving *θ* needs 4*n*. Numeric check: cos<sup>100</sup> 0.1 = 0.606 and *e*<sup>−0.5</sup> = 0.607 (computed). Separately, the half-brightness angle arccos(0.5<sup>1/*n*</sup>) for *n* = 50 and 200 has ratio 1.997.

14. **ε forward reference.** Now reads "for a reason explained with shadow rays in "Shading, shadows and reflection" below", which is the section that explains it.

## Professor's response (CS 320, CS 340)

4. **Fixed (tc4).** The dump drops `<ol>` numbering, so the lemma's conditions are now separate paragraphs labelled "Condition 1:", "Condition 2:", "Condition 3:", and the game's steps are labelled "Step 1:" to "Step 4:", so both the page and the dump show the numbers. The quantifier line now reads "satisfying conditions 1 and 2 such that ∀i", and step 3 says "(conditions 1 and 2)" so the link between the two lists is explicit. "The skill is in step 2" and "Condition 1 made every split look the same" now point at visible labels.

5. **Fixed (tc4).** The warning example's language is now {aᵐbʲcᵏ : if m = 1 then j = k}, so i is only the pumping exponent. The parenthesis now says what the split is: "take y to be the first symbol; but if the string starts with exactly two a's, m = 2, take y = aa, so that pumping never makes the number of a's equal to 1". (Checked by cases: m = 0 pumps a b or c; m ≥ 3 keeps at least two a's; m = 2 gives 0, 2, 4, … a's; m = 1 gives 1 a only at i = 1, the original string.)

6. **Fixed (tc6).** The sketch now says how moves are normalized: a move that pops X and pushes Y becomes a pop of X into a new state followed by an ε-move that pushes Y; a move that does neither becomes a push of a new stack symbol into a new state followed by an ε-move that pops it. In the second case of the construction, r is now defined as the state the first move (a push of some X) goes to and s as the state the last move (the pop of that X) starts from, and a and b are "the symbols (or ε)" those moves read. I also added the missing base rule A_pp → ε, without which the grammar generates nothing.

7. **Fixed (db4).** The student is right. The "Lossless joins" section now ends with a short paragraph that gives the general test: joining always returns every row, and adds none exactly when R contains every combination of R₁ and R₂ parts sharing an X = R₁ ∩ R₂ value. That condition is the multivalued dependency X ↠ R₁ − X, defined there (two rows agreeing on X; the row taking Y from one and the rest from the other is also in R). The paragraph notes that every FD is an MVD, which is why the FD test works, and defines 4NF as BCNF with MVDs. Key terms: "Multivalued dependency (MVD)" and "Fourth normal form (4NF)" added; "Lossless-join decomposition" now gives both conditions. P4 now also asks the student to show the split is lossless. Its answer explains that the FD test fails, that the stated rule is the MVD course ↠ teacher, so the split into (course, teacher) and (course, textbook) is lossless, and that teaches is not in 4NF while both pieces are. A short Python block that rebuilds the join and prints True (checked by check_lesson_code) confirms it.

8. **Fixed (db6).** The Grace hash join item now derives the condition: with an even hash, each of the M − 1 pieces of S has about B(S)/(M − 1) pages and must fit in M pages, so B(S)/(M − 1) ≤ M, roughly B(S) ≤ M², that is M ≥ √B(S). (The comparison is now written ≥, matching the derivation; P1's answer, √300 ≈ 17 < 52, is unchanged.)
