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
