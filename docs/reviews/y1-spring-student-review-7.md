# Student review: Year 1 Spring

*Round 7. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a first-year student. Last term I took CS 101 Programming I (Python), MATH 120 Discrete Mathematics I, MATH 130 Calculus I, CS 100 Computing in Society and WRIT 100 Writing for Technical Audiences. I read every lesson of CS 102, MATH 121, MATH 131 and PHYS 150 in order and tried each quiz and practice problem in my head. Where the notes gave a number or code output, I also checked a few by hand or with a short Python calculation. Everything I checked matched, including the merge-sort T(1000) = 9976, the Simpson's-rule error table and ratios, the projectile-with-drag landing point of 22.2 m and height of 7.1 m, the thrown-ball simulation outputs, and the semi-implicit Euler invariant. So the items below are places where I got stuck or confused, not arithmetic errors. Nothing blocked me from starting a quiz question or practice problem.

### CS 102 Programming II

#### c3: Inheritance, composition and polymorphism

1. The section "When 'is a' is wrong: squares and rectangles" explains that "a Square can't be safely used where a Rectangle is expected" and calls this a break of the Liskov substitution principle. A few paragraphs later, the CODE shapes problem asks for "Square(side), a subclass of Rectangle that reuses its methods". I think this is fine because these shapes have no setters, but the problem doesn't say so. On first reading it looks like the lesson is telling me to build the design it just warned against.

#### c6: Test-driven development

2. In the word-frequency TDD example, one Green step says only "strip punctuation". The lesson never shows how to do that in Python. Then the Refactor step says "perhaps using collections.Counter … Counter(text.split()) counts each word in one step", followed by "The four tests confirm the rewrite changed nothing." But Counter(text.split()) on its own doesn't lowercase or remove punctuation, so it would fail the "A a" and "hi, hi!" tests. I couldn't tell what the refactored function is actually supposed to look like.

3. The lesson says "Every pytest example in this lesson follows this layout: a module, and a test file next to it." The fixture example uses BankAccount, and the parametrize example uses Fraction and pytest.mark, but neither shows its imports or says which module BankAccount lives in. I wasn't sure what the test file for the fixture example would need at the top to run.

### MATH 121 Discrete Mathematics II

#### d4: Number theory: divisibility and modular arithmetic

4. "The remainders shrink quickly (at least halving every two steps), so the algorithm takes O(log n) steps." The O(log n) claim rests entirely on this halving fact, which isn't explained. I couldn't see why two steps of Euclid's algorithm must at least halve the remainder.

#### d5: Fermat, Euler and RSA

5. In the proof of Fermat's little theorem: "None is 0, since p is prime and divides neither a nor any of 1, …, p − 1." For ia to be nonzero mod p, I need "if a prime divides a product, it divides one of the factors". That fact isn't stated or proved in this course. The fundamental theorem of arithmetic in Lesson 4 may imply it, but the proof doesn't make that connection, so I couldn't follow this step.

#### d7: Random variables and expectation

6. "Independent variables' variances add: Var[X + Y] = Var[X] + Var[Y] when X and Y are independent". The binomial section also relies on "n independent Bernoulli trials". Lesson 6 only defines independence for events: "Events A and B are independent if P(A and B) = P(A) · P(B)". I don't know exactly what it means for two random variables to be independent.

### MATH 131 Calculus II and Multivariable Calculus

#### k3: Numerical integration and improper integrals

7. "Then f″(x) = (6x² − 2)/(1 + x²)³, which is −2 at x = 0 and smaller in size everywhere else on [0, 2], so K = 2." Both the second derivative and the claim about its largest size are given without working. The paragraph had just said to find K "by checking the endpoints and the points where f‴ = 0", but it doesn't do that for this example. So I couldn't confirm that |f″| never exceeds 2 on [0, 2].

#### k4: Sequences and series

8. The harmonic series section says "H_N ≈ ln N + 0.5772; the integral test below shows why". It later says MATH 121 quotes "the approximation ln N + 0.577 that this lesson justifies." But the integral test only shows that H_N lies between ln(N + 1) and 1 + ln N, so the gap H_N − ln N is somewhere between 0 and 1. Nothing in the lesson explains why the gap settles at 0.5772. Practice 5 only finds that number by computing it.

### PHYS 150 Physics I: Mechanics with Computation

#### p6: Oscillations

9. "When b² > 4mk, there are two real roots, both negative, and the motion is a mix of two decaying curves". The lesson doesn't explain why both roots of mr² + br + k = 0 must be negative. That's the step that makes them "decaying", so I had to take it on trust.

10. "(Checked by simulation: … the peaks are 0.4531, 0.2053 and 0.0930, and e^(−t/2) at those times gives the same four digits.)" Three peaks are listed, so "the same four digits" confused me at first. I eventually guessed it means four significant digits for each value, and also that this e^(−t/2) is the amplitude Ae^(−bt/(2m)) with A = 1 and b/(2m) = 1/2.

### Across courses

11. The constant 0.577 in H_n ≈ ln n + 0.577 isn't explained in either course that uses it. MATH 121 Lesson 7 says "(MATH 131, Sequences and series makes this precise.)", and MATH 131 Lesson 4 says it "justifies" the approximation. But MATH 131 Lesson 4 only proves the bounds ln(N + 1) ≤ H_N ≤ 1 + ln N (see item 8). So whichever course I read first, I end up being sent to the other one for the 0.577, and neither derives it.

## Professor's response

Thank you. Item 2 was a real error: the refactored function the lesson described would have failed two of its own four tests. Items 8 and 11 were a real gap, since both courses pointed to the other for the 0.577 and neither explained it. The other items were steps we skipped or assumed. I checked every number and code output I added by running Python. The TDD example and the fixture and parametrize examples were run with pytest. The one programming problem I touched (CS 102 shapes) changed only in its wording, and all 107 reference solutions still pass.

### CS 102 Programming II

1. c3: The lesson now says where the trouble came from: the setters. A `Rectangle` with setters promises that its width and height can change separately, and a `Square` can't keep that promise. When shapes have no setters, so their sides are fixed when they are made, a `Rectangle` only promises to report its area and perimeter correctly, and a `Square` keeps both promises, so it is a safe subclass. The lesson says the shapes problem uses shapes like this, and gives a rule of thumb: check that the subclass keeps every promise the superclass's methods make, not just that "is a" sounds true. The shapes problem's prompt now says its shapes have no setters, and that this is why its `Square` is safe, unlike the lesson's mutable rectangle.
2. c6: **Fixed (was wrong).** You were right: `Counter(text.split())` alone fails the "A a" and "hi, hi!" tests. The lesson now shows the punctuation step. `strip()` from CS 101, given a string argument, removes any of those characters from both ends, so `"hi,".strip(",.!?;:")` is `'hi'`, and a word that was only punctuation becomes empty and is skipped. It then shows the whole function after four cycles (`words.py`) and its four tests (`test_words.py`). The refactor now keeps the lowercasing and stripping and lets `Counter` replace only the counting loop: `words = [w.strip(",.!?;:") for w in text.lower().split()]`, then `return Counter(w for w in words if w)`. The lesson says plainly that `Counter(text.split())` alone would fail two tests. It also explains why the tests don't need to change: a `Counter` is a kind of dictionary and compares equal to a dictionary with the same counts. Both versions pass all four tests under pytest.
3. c6: The parametrize example now says it goes in `test_fraction.py`, which already starts with `import pytest` and `from fraction import Fraction`. The fixture example now has the label `test_bank.py` and starts with `import pytest` and `from bank import BankAccount`. The lesson says to save Lesson 1's `BankAccount` class in `bank.py` next to it. I built both files from the lesson's own code, and all 9 tests (Fraction's 4, the 3 parametrized rows and the 2 fixture tests) pass.

### MATH 121 Discrete Mathematics II

4. d4: The halving fact now has its own proof. Two steps take a pair (a, b), with a ≥ b, to a pair whose first number is r = a mod b. If b ≤ a/2, then r < b ≤ a/2. If b > a/2, then b goes into a once, so r = a − b < a/2. The example shows it: 252 became 42 and 105 became 21. Then the lesson counts the steps. After 2k + 1 steps the first number is below n/2ᵏ, and the second is smaller still, so once 2ᵏ ≥ n the second is 0 and the loop has stopped. That is at most 2⌈log₂ n⌉ + 1 steps, which is O(log n). I checked both facts by brute force for every pair up to 600 and 800.
5. d5: The step no longer needs "a prime that divides a product divides a factor". The proof now first shows that a has an inverse mod p: p's only positive divisors are 1 and p, and p ∤ a, so gcd(a, p) = 1 and Lesson 4's theorem on inverses applies. Then if ia ≡ 0, multiplying by a⁻¹ gives i ≡ 0 (mod p), which is impossible for i between 1 and p − 1. The "no two are equal" step uses the same inverse.
6. d7: The lesson now defines independence for random variables, right after distributions. X and Y are independent if P(X = x and Y = y) = P(X = x) · P(Y = y) for every pair of values, which is Lesson 6's definition applied to the events "X = x" and "Y = y". Two examples follow. The two dice's values are independent (1/36 = (1/6)(1/6)). The first die and the sum are not: P(first = 1 and sum = 12) = 0, but P(first = 1) · P(sum = 12) = 1/216. For n trials, the same product rule holds for every combination of values. The binomial section now points back to this, and there is a new key term, "Independent random variables".

### MATH 131 Calculus II and Multivariable Calculus

7. k3: The example now does the working it describes. With f = (1 + x²)⁻¹, the chain rule gives f′ = −2x(1 + x²)⁻². The product rule gives f″ = −2(1 + x²)⁻² + 8x²(1 + x²)⁻³ = (6x² − 2)/(1 + x²)³. One more derivative gives f‴ = 24x(1 − x²)/(1 + x²)⁴, which is 0 on [0, 2] only at x = 0 and x = 1. Checking those points and the endpoint 2 gives f″(0) = −2, f″(1) = 0.5 and f″(2) = 22/125 = 0.176, so K = 2. I checked the derivatives symbolically, and checked the maximum of |f″| on a fine grid (2.0).
8. k4: You were right that the bounds only put the gap between 0 and 1. The lesson now has a subsection, "Where the 0.5772 comes from". Let g_N = H_N − ln N. Then g_(N+1) − g_N = 1/(N + 1) − ∫ from N to N + 1 of dx/x. That integral is more than 1/(N + 1), because 1/x ≥ 1/(N + 1) on that interval, so the gaps decrease. They start at g₁ = 1 and never go below 0. Numbers that decrease but stay above a floor must approach a limit (the mirror image of the fact the integral test already uses), so g_N converges. Its limit is named the Euler–Mascheroni constant γ. The lesson says honestly that this proves γ exists but doesn't give its value. No formula for it is known, so its value is found numerically, and Practice 5 does the simplest version (0.626, 0.5777, 0.5772161 against γ = 0.5772156…, all checked). The harmonic-series paragraph now says what the integral-test section shows, not that it "justifies" 0.5772, and Practice 5's answer links the computation to the proof. I checked that g_N decreases for every N up to 2,000.

### PHYS 150 Physics I: Mechanics with Computation

9. p6: The lesson now shows why both roots are negative. −b − √(b² − 4mk) is a negative number minus a positive one. For the other root, 4mk > 0, so √(b² − 4mk) < √(b²) = b, and −b + √(b² − 4mk) < 0. It also says why that matters: a negative r makes e^(rt) shrink toward 0.
10. p6: The check is now spelled out. The formula's amplitude here is Ae^(−bt/(2m)) = e^(−t/2), since A = 1 and b/(2m) = 1/2. The first three peaks come at t ≈ 1.583, 3.166 and 4.750 s, with heights 0.4531, 0.2053 and 0.0930. e^(−t/2) at those times gives the same three values, each agreeing to the four decimal places shown. I recomputed the peak times and heights.

### Across courses

11. **Fixed.** The two courses now say the same thing and point to each other accurately. MATH 121 Lesson 7 says the gap H_n − ln n gets smaller as n grows but never goes below 0, so it settles down to a constant γ = 0.5772… (the Euler–Mascheroni constant). It says MATH 131 Lesson 4 proves this with the same picture of areas under 1/x, that no formula for γ is known, and that its value is found by computing, as that lesson's Practice 5 does. MATH 131 Lesson 4 says MATH 121 quotes ln N + 0.577, and that this lesson proves H_N − ln N approaches a constant whose value is then found by computing it (item 8). Neither course now claims more than it shows.
