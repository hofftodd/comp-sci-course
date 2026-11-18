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

## Professor's response

Thank you. Most of these were steps we skipped, and items 4 and 17 were a real error. The lesson said "between 1 and 2 copies per append", but its own example showed fewer than 1. Items 5, 9, 11 and 16 came from the text dump, not from the pages, but they led me to a real inconsistency in the key terms, which are shown as plain text. Every number and code output I added was checked by running Python. No programming problem changed, and all 54 reference solutions still pass.

### CS 102 Programming II

1. c4: Added a paragraph after the enum example. `a is b` is `True` when `a` and `b` are the same object, the check that Lesson 2's default `==` makes. Python creates each enum member once, and an enum's `==` compares members in just this way, so `==` and `is` give the same answer here. Either one is correct. Python code usually writes `is` for enum members, as for `None`. For numbers and strings, keep using `==`.
2. c5: The lesson now defines F as the sequence `fib` computes: F(0) = 0, F(1) = 1, F(2) = 1, F(3) = 2. It also derives the count. Adding 1 to both sides gives C(n) + 1 = (C(n − 1) + 1) + (C(n − 2) + 1), which is Fibonacci's rule exactly. The values start at 2 and 2, which is 2F(1) and 2F(2), so C(n) + 1 = 2F(n + 1). It gives two checks, n = 2 (3 calls) and n = 4 (9 calls), and both match a call counter.
3. c7: The lesson now defines CPython where it first appears. CPython is the standard Python program, the one you install from python.org and run as `python3`. The language doesn't fix a growth rule, so other implementations may choose a different one.
4. c7: **Fixed (was wrong).** The total is 2s − 1, where s is the largest power of 2 below n (for n ≥ 2). Since n/2 ≤ s < n, the total is at least n − 1 and less than 2n − 1. Per append, that is from just under 1 copy to just under 2. The lesson now says that both ends happen: 16 appends need 15 copies (fewer than 1 per append), and 17 need 31 (almost 2). I checked this with a simulation for every n up to 5,000. The later "doubling's 1 to 2" now reads "doubling's fewer than 2".

### MATH 121 Discrete Mathematics II

5. d1: This came from the dump script, which dropped line breaks inside table cells. On the page, each formula and its examples are on separate lines. The dump now writes the break as "; ". No content change.
6. d3: The repeated-root case is now a short section. With a single repeated root, Arⁿ + Brⁿ collapses to one constant, which can't match two starting values, so we need a second solution. We don't show how to find nrⁿ, but the lesson checks it by substitution. A repeated root means c₁ = 2r and c₂ = −r², and then c₁(n − 1)rⁿ⁻¹ + c₂(n − 2)rⁿ⁻² = nrⁿ. A worked example follows: aₙ = 4aₙ₋₁ − 4aₙ₋₂ with a₀ = 1 and a₁ = 4 gives (n + 1)2ⁿ. It is checked at a₂ = 12, and I checked the first seven terms in Python.
7. d5: Euler's theorem now has its own proof, and it includes the step you asked about. By Lesson 4, a number is coprime to n exactly when it has an inverse mod n. If a and bᵢ have inverses, then (abᵢ)(a⁻¹bᵢ⁻¹) ≡ 1, so abᵢ has an inverse too, and so does its remainder. So that remainder is again coprime to n. The rest follows Fermat's proof: the results are distinct, so by pigeonhole they are the b's in a new order. Then cancel. The proof includes the example n = 10, a = 3, where 1, 3, 7, 9 go to 3, 9, 1, 7, and 3⁴ ≡ 1 (mod 10).
8. d6: The lesson now states the approximation. For the k that matter (about 20 or more), k(k − 1) ≈ k². Then it sets e^(−k²/(2m)) = 1/2, takes ln of both sides to get k² = 2 ln 2 · m, and takes the square root. It adds that solving the quadratic exactly, without the approximation, gives 23.0 for m = 365 (checked).
9. d7: This came from the dump script. On the page, zᵢ, zⱼ, I_A and Iᵢ are all ordinary subscripts, and the parentheses were the dump's way of writing a subscript letter that has no Unicode character. No content change.

### MATH 131 Calculus II and Multivariable Calculus

10. k3: The lesson now connects the two descriptions. For small h, Simpson's error is very nearly (h⁴/180)(f‴(b) − f‴(a)) in size. We state that without proof. By the Fundamental Theorem, f‴(b) − f‴(a) = ∫ f⁽⁴⁾ dx, which is at most K(b − a) in size. So the bound is this estimate with the fourth derivative replaced by its worst value. The lesson defines f⁽⁴⁾ where it first uses it. It also gives a check against the table: for eˣ with n = 8, the estimate is 2.33 × 10⁻⁶ and the table shows 2.3 × 10⁻⁶. I checked n = 4 and 16 too, and checked f‴(0) = f‴(1) = 0 for 4/(1 + x²).
11. k7/k8: The brackets came from the dump. In the notes, f_x, f_y, f_xy and D_u f are all ordinary subscripts. The key term was a real problem, though. Key terms are shown as plain text, so the page itself showed "f_xx f_yy − f_xy²" with underscores. The Second derivative test term now says it in words. I tidied the same way the other key terms that used underscores: Average value (MATH 131), Newton's second law and Angular momentum (PHYS 150). The quiz choice for D-sub-x notation is now an ordinary subscript.
12. k9: The notes now state and show the product rule. If f(x, y) = g(x)h(y), the inner integral treats g(x) as a constant and gives g(x) · ∫h dy, which is a number, so the outer integral pulls it out: ∬ g h dA = (∫g dx)(∫h dy). The example ∬ xy over [0, 1] × [0, 2] = 1 is checked. The notes also say the same holds over the whole plane when the integrals converge. Practice 2's hint now points to this rule.

### PHYS 150 Physics I: Mechanics with Computation

13. p3: **Fixed.** The Friction key term now says "μₖ times the normal force". Key terms are plain text and can't show the subscript in F_N, so the term uses words. The notes already used F_N throughout.
14. p4: The lesson now steps the unit square through one step of each method. Explicit Euler sends (1, 0) to (1, −Δt) and (0, 1) to (Δt, 1). These two sides both have length √(1 + Δt²) and are at right angles, so the square's area becomes 1 + Δt². Semi-implicit Euler is two slides in turn. First each vertical strip moves up or down (v changes and x is fixed). Then each horizontal strip moves sideways. Neither slide changes area. Each update is a fixed combination of x and v, so every small square in a patch changes in the same way. Checked in code: areas 1.0001 and 1.0 for Δt = 0.01.
15. p6: Both formulas now come with a reason. **Amplitude:** dE/dt = v(mx″ + kx) = −bv². For small b, the kinetic energy is on average half of E (sin² and cos² have the same average), so dE/dt ≈ −(b/m)E. That is exponential decay, E ∝ e^(−bt/m), and the amplitude, which goes as √E, shrinks like e^(−bt/(2m)). The lesson includes a simulation check (m = 1, k = 16, b = 1): the peaks 0.4531, 0.2053 and 0.0930 match e^(−t/2) to four digits. **Critical value:** trying x = e^(rt) gives mr² + br + k = 0. It has real (negative) roots, with no oscillation, exactly when b² ≥ 4mk. So the boundary is b = 2√(km). The lesson says plainly that the oscillating solutions need complex numbers, which we don't cover, and that "fastest return" is stated without proof. It gives a simulation check: with b = 7 the mass overshoots to −0.0034, and with b = 8 or 9 it never crosses 0. Practice 5's answers (b_c = 8, half-life 2 ln 2 ≈ 1.39 s) now follow from the lesson.

### Across courses

16. This came from the dump. On the pages, every subscript is a true subscript, and the brackets were never shown to students. I looked for a real mix in the course text. Formulas in the notes all use `<sub>` tags. A few key terms, which are plain text, used Unicode subscripts (aₙ, μₖ) where they exist, and four used underscores. Those four are now written in words (item 11). The Unicode ones only appear where the whole formula can use them.
17. **Fixed.** Both courses now say the same thing, in the same words. Doubling from capacity 1, n appends (n ≥ 2) copy 1 + 2 + … + s = 2s − 1 items, where s is the largest power of 2 below n. That is at least n − 1 and less than 2n − 1, so from just under 1 to just under 2 copies per append. The lower bound is n − 1, slightly less than 1 copy per append, and you get it exactly when n is a power of 2. MATH 131 Lesson 4 now writes the sum up to s, bounds it by 2s < 2n ("fewer than 2 copies per append"), and gives the exact total 2s − 1 with the same range, pointing to CS 102. CS 102 Lesson 7 now says MATH 131 "gives the same upper bound: 1 + 2 + 4 + … + s < 2s < 2n".
