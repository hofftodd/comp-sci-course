# Student review: Year 1 Fall

*Round 4. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a first-year student. Before this term I had high-school algebra and trigonometry and had never programmed. This term I'm taking CS 101 (Programming I), MATH 120 (Discrete Mathematics I), MATH 130 (Calculus I) and CS 100 (Computing in Society) at the same time. I read every lesson in order and tried each quiz and practice problem in my head. Where one course pointed to another course from this term, I counted that as explained once I had read it there.

### CS 101 Programming I

#### u1: Values, types and expressions

1. "a // b is how many whole times b fits into a" and, a few lines later, "-7 // 2 is -4, not -3." I can't see how 2 fits into −7 "−4 whole times", so the first description seems to contradict the second for negative numbers.
2. "Precisely: 53 of the 64 bits hold the digits, and 2⁵³ ≈ 9.0 × 10¹⁵, which is just under 16 decimal digits' worth. Any decimal number with 15 significant digits is stored faithfully, and 17 digits are always enough to write a float out exactly." I couldn't follow how 53 bits turns into "just under 16 digits". The 15, 16 and 17 figures in the same parenthesis also seem to say different things, and I don't know which one I'm supposed to use.
3. "Use math.isclose(a, b), which checks whether they are nearly equal." The lesson never says how close counts as "nearly". I can't tell when isclose will say True, for example in CS 101 u3 P2 (Celsius to Fahrenheit and back).

#### u2: Branching and iteration

4. "(print's end is normally "\n", a new line; here we replace it with nothing.)" This is the first time I've seen a backslash inside a string. "\n" isn't explained until the Strings lesson, so I didn't know whether it was two characters or one.

#### u5: Lists, tuples, dictionaries and sets

5. Key term: "Comprehension: A compact expression that builds a list, dict or set from an iterable." "Iterable" is never defined. The lesson only shows list comprehensions, not dict or set comprehensions.

#### files: Files and modules

6. CODE csv_averages hint: "Use csv.reader: take the first row as the header with next(reader)". The lesson only shows csv.DictReader. Neither csv.reader nor the next() function has been shown, so I don't know what next does or what each row looks like.

### MATH 120 Discrete Mathematics I

#### u1: Propositional logic

7. "Every if statement you write in CS 101 tests a logical condition ... and every processor is built from logic gates." "Logic gates" aren't explained in this lesson. They only come up later, in the optional history lesson.
8. "a formula with 100 letters has more rows than there are atoms in the observable universe." This seems wrong. A table with 100 letters has 2¹⁰⁰ rows, and CS 101 u0 shows 2 ** 100 = 1267650600228229401496703205376, which is about 1.3 × 10³⁰. I've read that the observable universe has about 10⁸⁰ atoms, which is far more.

#### u2: Predicates and quantifiers

9. "Mathematicians abbreviate these as ∀x ∈ D, F(x) and ∃x ∈ D, F(x), where D is now the set of dogs." The symbol ∈ isn't defined until Lesson 4 (Sets), so here I had to guess what it means.

#### u3: Proof techniques

10. Key term: "Lemma: A smaller result proved to help prove a larger one." The word "lemma" never appears in the lesson text, so I don't know which result, if any, was a lemma.

#### u6: Mathematical induction

11. Key term: "Well-ordering principle: Every non-empty set of natural numbers has a least element; equivalent to induction." The lesson never mentions it. It's also not explained why it's "equivalent to induction".

### MATH 130 Calculus I

#### u1: Limits

12. "the larger triangle with base OA and height reaching the tangent line at A, where the extended side OP meets it: base 1, height tan x". I couldn't see why that height is tan x. The step is stated without a reason.
13. P6: "What happens at the smallest values, and why? ... recall from CS 101 ... that a float keeps only about 16 significant digits." I can see that the numbers go wrong, but knowing that a float keeps 16 digits doesn't tell me how that produces a wrong answer. Subtracting two nearly equal numbers is only explained later, in Lesson 4 (The derivative), so I couldn't answer the "why" part from this lesson.

#### rates: Related rates, approximation and L'Hôpital's rule

14. "as x → 0⁺, x ln x = (ln x)/(1/x) is ∞/∞". As x → 0⁺, ln x goes to −∞, not ∞, so the top is −∞. I wasn't sure whether the sign matters for using the rule, or whether "∞/∞" is meant to include −∞/∞.

#### u6: Integrals and the Fundamental Theorem

15. "Let u be the inner function and replace du = u′(x) dx" and "Let u = x², so du = 2x dx". Up to now, dx was only part of the notation ∫ … dx, and dy/dx was "not really a fraction". Here du and dx are suddenly treated as quantities that can be multiplied and divided (as in "x dx = du/2"). The lesson doesn't explain why that's allowed.

### CS 100 Computing in Society

#### u1: A short history of computing

16. Key term: "Neural network: A model built from layers of simple connected units whose weights are learned from examples." The lesson never says what a "weight" is or what "layers of units" are.
17. Sidebar: "It had variables, conditionals and data structures". "Data structures" hasn't been defined. "High-level language" and "autocodes" are also used here before CS 101's history lesson explains them.

#### u2: The map of computer science

18. "The ACM/IEEE/AAAI CS2023 curriculum guidelines" and "Computer Systems, Architecture, OS, Networks". The abbreviations IEEE, AAAI and OS are never expanded. ACM is only explained in the next lesson.
19. Q1: "'Is there an efficient algorithm for this problem?' belongs mainly to which area?" This course hasn't defined "algorithm". CS 101 only defines it in the Searching, sorting and efficiency lesson, near the end of the term.

#### history: The hidden history of computing

20. "trajectories at NACA and later NASA" and "Langley center". NACA is never expanded or explained.

#### ethics: Case study: risk scores and the math of fairness

21. "A tool is calibrated if a label means the same chance of the outcome in every group." In u4, "calibrated" meant something different: "'Calibrated' means the amount of noise is chosen deliberately." Since I was reading both in the same course, I first assumed they were connected and got confused.

### Across courses

22. CS 101 (Branching and iteration, Lists, Recursion) says ideas come "from Discrete Mathematics" or "in Calculus", for example "These are the logical connectives ∧, ∨ and ¬ from Discrete Mathematics" and "This is the same reasoning as proof by induction in Discrete Mathematics". I'm taking those courses at the same time. Whether I've already seen ∧, ∨, induction or limits at that point depends on how far I am in MATH 120 and MATH 130. The text reads as if I took them earlier.
23. "Calibrated" has two different meanings in CS 100 u4 and CS 100's ethics lesson (item 21). "Floating-point" and "fixed-point" are also close together: CS 101's ethics lesson says the Patriot case ("a 24-bit fixed-point value") connects to "the floating-point sidebar". I wasn't sure whether the Patriot error was a floating-point error or a different kind of error.
24. Numerical precision is explained in three places in slightly different ways: CS 101 u1 ("about 16 significant digits", plus the 15 and 17 figures), MATH 130 u1 P6 (asks "why" with only the 16-digits hint) and MATH 130 u3 ("If two numbers agree in their first 12 digits, their difference has only about 4 trustworthy digits left"). I only understood the earlier "why" question after reading the third explanation.
