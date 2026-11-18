# Student review: Year 1 Spring

*Round 6. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited. Note added afterwards: items 5, 9, 11 and 16 came from `scripts/dump_course.js`, not from the pages students see. The dump dropped line breaks inside table cells, so a formula ran straight into its examples (item 5). It also wrote a subscript as Unicode when one existed (fₓ) and as _(y) when it didn't, so one formula showed two styles (items 9, 11 and 16). On the pages, all of these are ordinary subscripts. The dump now writes line breaks in cells as "; " and every letter subscript as v_x, v_y. In item 13, the key term's plain N is real and is in the course text.*

I'm a first-year student. Last term I took CS 101 Programming I (Python), MATH 120 Discrete Mathematics I, MATH 130 Calculus I and CS 100 Computing in Society. This term I read every lesson of CS 102, MATH 121, MATH 131 and PHYS 150 in order, and tried each quiz question and practice problem. Most of it I could follow from the notes alone. The items below are the places where I got stuck, found a step missing, or saw two statements that seemed to disagree.

### CS 102 Programming II

#### c4: Types, interfaces and design

1. "if order_status is Status.DELIVERED:". Until now, `==` is how we compared values. The enum example switches to `is` and doesn't say why, or whether `==` would also work for enum members.

#### c5: Iterators, generators and functional tools

2. "the number of calls C(n) obeys C(n) = 1 + C(n − 1) + C(n − 2), almost Fibonacci's own rule, and works out to 2F(n + 1) − 1 (try n = 2: 3 calls)". The step "works out to" is skipped. The lesson also never says which F is meant or how it's indexed (is F(0) = 0 or F(1) = 1?), so I couldn't check the formula beyond the one case given.

#### c7: Stacks, queues and linked lists

3. "about 1.125 times the size in CPython, plus a little". "CPython" appears here (and again as "CPython's exact growth rule") without being explained. I don't know how it differs from "Python".

4. The lesson says "1 + 2 + 4 + 8 = 15 copies for 16 appends" and then concludes the total "is at least n − 1 and less than 2n: between 1 and 2 copies per append". But 15 copies for 16 appends is fewer than 1 copy per append (n − 1 copies is always less than n), so the "between 1 and 2" summary seems to contradict the lesson's own example.

### MATH 121 Discrete Mathematics II

#### d1: Counting: rules, permutations and combinations

5. In the "two questions" table, each cell runs a formula straight into its example words: "P(n, r) = n!/(n − r)!race podiums, seating", "nʳpasswords, bit strings", "C(n, r)committees, poker hands", "C(n + r − 1, r)donuts, multisets". At first I read "!race" and "ʳpasswords" as part of the formulas.

#### d3: Recurrences

6. "(If the characteristic equation has a repeated root r, the general solution is (A + Bn)rⁿ.)" The formula is stated with no reason. The distinct-roots case was motivated and checked by substitution, but nothing explains where the extra factor n comes from.

#### d5: Fermat, Euler and RSA

7. "The proof is the same as Fermat's, using only the φ(n) numbers coprime to n." Fermat's proof used the fact that a, 2a, …, (p − 1)a are all nonzero and distinct mod p. For Euler's version I'd have to show that multiplying each number coprime to n by a gives another number coprime to n, and the lesson doesn't say how that step goes. "The same" skips it.

#### d6: Discrete probability

8. "Setting it equal to 1/2 gives k ≈ √(2 ln 2 · m)". The exponent just before this was −k(k − 1)/(2m). To get the stated answer you have to replace k(k − 1) by k² and then solve with ln, and that substitution isn't mentioned.

#### d7: Random variables and expectation

9. "give each pair i < j an indicator for "zᵢ and z_(j) are compared"" and "the block zᵢ, …, z_(j)". The same kind of subscript is written two ways, zᵢ and z_(j), in one sentence. Likewise "I_(A)" next to "Iᵢ". I wasn't sure whether the parentheses mean something different.

### MATH 131 Calculus II and Multivariable Calculus

#### k3: Numerical integration and improper integrals

10. "'Divide by 16' describes the leading part of the error, which for Simpson's rule is proportional to h⁴ · (f‴(b) − f‴(a))." Two lines earlier, Simpson's error was given as a bound using K, a bound on the fourth derivative. Now the leading part depends on the third derivative at the endpoints. The lesson doesn't say how these two descriptions are related, so I couldn't follow why f‴(0) = f‴(1) = 0 makes that part vanish.

#### k7: Functions of several variables and the gradient

11. The lesson writes "fₓ" but "f_(y)", "f_(xy)", "f_(yy)", and "D_(u)f". In the key terms of the next lesson the same quantities appear as "f_xx f_yy − f_xy²". I wasn't sure whether the brackets mean anything, or why x gets a true subscript and y doesn't.

#### k9: Constrained optimization and double integrals

12. Practice 2: "Then explain why this checks Lesson 3's claim that ∫_(−∞)^(∞) e^(−x²) dx = √π." The connection depends on the double integral of e^(−x²)e^(−y²) equaling (∫ e^(−x²) dx)(∫ e^(−y²) dy). The lesson only shows an iterated integral of x + y and never says that a product of a function of x and a function of y splits like this. I could probably work it out from the iterated-integral idea, but the step isn't shown.

### PHYS 150 Physics I: Mechanics with Computation

#### p3: Newton's laws and forces

13. The lesson says "Normal force F_(N) … (The subscript N keeps the force apart from N, the unit newton.)". But the key terms then say "Friction: … kinetic friction is μₖN", using plain N for the normal force. That's exactly the clash the lesson said it was avoiding.

#### p4: Energy and momentum

14. "Take a small patch of starting states and step them all; with explicit Euler the patch grows by a factor 1 + Δt² every step, while with semi-implicit Euler its area stays exactly the same." We were shown how x² + v² changes for a single point, but not how a patch's area changes. Where the area factor 1 + Δt² (and the "exactly the same" for semi-implicit Euler) comes from isn't explained.

#### p6: Oscillations

15. "Underdamped (small b): oscillates with an exponentially shrinking amplitude, Ae^(−bt/(2m))" and "Critically damped (b = 2√(km))". Both formulas are stated without derivation or any hint of where they come from. Practice 5 relies on both. I can plug numbers in, but I couldn't have found them from the lesson's reasoning. (Simple harmonic motion, by contrast, was checked by differentiating.)

### Across courses

16. Subscripts are written in two styles across MATH 121, MATH 131 and PHYS 150: a true subscript (aₙ, vₓ, fₓ, zᵢ) and a bracketed one (S_(N), H_(N), E_(T), a_(c), v_(y), F_(N), f_(y), z_(j)), sometimes inside one formula, as in "vₓ, v_(y)" or "fₓ … f_(y)". Nothing says whether the two styles mean the same thing. I assumed they do, but I had to stop and wonder each time.

17. Copies per append for a doubling array are summarized three ways. CS 102 Lesson 7 says "between 1 and 2 copies per append", although its own example gives 15 copies for 16 appends. MATH 131 Lesson 4 says "fewer than 2 copies per append" and that "CS 102, Lesson 7 shows the total is between about n and 2n". CS 102 says MATH 131 "states the same bound, 1 + 2 + 4 + … + n < 2n", but MATH 131 actually writes the sum up to s, the last copy, and bounds it by 2s ≤ 2n. The cross-references don't quite match each other. In particular, I couldn't tell which lower bound is right: 1 copy per append, or slightly less than 1.
