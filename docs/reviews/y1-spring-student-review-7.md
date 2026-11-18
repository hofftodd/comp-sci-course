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
