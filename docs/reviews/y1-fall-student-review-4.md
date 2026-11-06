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

## Professor's response

Thank you for another careful reading. Every item led to a change. One was a real factual error (8): 2¹⁰⁰ is about 1.3 × 10³⁰, nowhere near the roughly 10⁸⁰ atoms in the observable universe, and you were right to check the arithmetic against CS 101. Four key terms (5, 10, 11, 16) named ideas the lessons never taught; each is now taught in the lesson text. The precision account (2, 13, 24) is now one story told once, in CS 101, and both MATH 130 places point to it. No item rested on a misreading. Every number and code output I added was checked by running Python 3. No programming problem's tests, starter or solution changed; one hint gained a pointer.

### CS 101 Programming I

1. u1, arithmetic operators: "How many whole times b fits into a" is now said for positive numbers only. A new paragraph gives the exact rule: `a // b` is `a / b` rounded down, so `-7 / 2` = `-3.5` becomes `-4`, and `%` is whatever makes `(a // b) * b + a % b == a` true, so `-7 % 2` is `1`.
2. u1, significant digits: **Made one account.** The parenthesis now explains the 16: 2⁵³ = 9,007,199,254,740,992 is a 16-digit number, so every 15-digit whole number fits exactly but only some 16-digit ones do (`float(9007199254740993)` gives `9007199254740992.0`). The first 15 significant digits always survive and the 16th usually does. The separate 17-digit fact is gone, since it answered a different question.
3. u1, Floats are approximate: Says isclose's default tolerance: the numbers may differ by at most one billionth of the larger one (about 9 matching significant digits), with `isclose(1.0, 1.0000000001)` True and `isclose(1.0, 1.000001)` False. In u3 P2, the round trip's error is in the 16th digit, far inside that.
4. u2, nested loops: The `end` parenthesis now says that a backslash and the letter after it stand for one special character, `\n` meaning "start a new line", and that the Strings lesson lists the others.
5. u5, Sets and key terms: Added set and dictionary comprehensions after the sets section (`{len(w) for w in ...}` gives `{2}`; `{w: len(w) for w in ...}` gives a dict). The key term no longer says "iterable": it now says "anything a for loop can go through, such as a list, string or range".
6. files, CSV and CODE csv_averages: The lesson now shows `csv.reader`, which gives each row as a list of strings (`['Ada', '88', '92', '95']`), and explains that `next(reader)` takes one row, the header, so the loop starts at the data. The hint points to that paragraph.

### MATH 120 Discrete Mathematics I

7. u1, opening: Logic gates are glossed where they're first named: tiny electronic switches computing "and", "or" and "not" on on/off signals.
8. u1, truth tables: **Factual error fixed.** Now says 100 letters give 2¹⁰⁰ ≈ 1.3 × 10³⁰ rows, which at a billion rows a second would take about 4 × 10¹³ years, nearly 3,000 times the age of the universe. The atoms comparison is kept but made true: it needs 266 letters (2²⁶⁶ > 10⁸⁰ > 2²⁶⁵).
9. u2, quantifiers: ∈ is glossed where it first appears ("in", "is an element of"), with a link to Lesson 4, Sets.
10. u3, √2 proof: The lesson now uses the word. The step that cites "if n² is even then n is even" notes that a result proved mainly as a step toward a bigger one is called a lemma.
11. u6, The principle: New paragraph teaching the well-ordering principle and using it to show why induction works (the smallest counterexample m leads to a contradiction). It also says what "equivalent" means: each principle can be proved from the other.

### MATH 130 Calculus I

12. u1, the trigonometric limit: The outer triangle is now named OAT, with T where OP extended meets the tangent at A. It has a right angle at A and angle x at O, so tan x = AT/OA = AT/1, giving height tan x.
13. u1, Practice 6: The "why" hint now points to the new CS 101 bullet on subtracting nearly equal floats and states it in one line: subtraction leaves only the digits where the two numbers differ. The question can now be answered from what has been taught.
14. rates, L'Hôpital: Added a sentence that ∞/∞ includes any mix of signs (−∞/∞ and so on). The x ln x example now says −∞/∞ and why (ln x → −∞).
15. u6, Substitution: New short paragraph. du = u′(x) dx is notation, not arithmetic with tiny numbers. The chain rule shows ∫ f(u(x)) u′(x) dx = F(u(x)) + C, which is what the du bookkeeping produces, so moves like x dx = du/2 are safe.

### CS 100 Computing in Society

16. u1, AI: The lesson now explains layers of units and weights: each unit multiplies its inputs by weights, adds them and passes the result on, and learning means adjusting the weights. The key term is now taught.
17. u1 sidebar, Plankalkül: Glossed data structures (ways of grouping values, such as lists and tables), high-level languages (words and formulas rather than numeric machine instructions) and autocodes (simple formula languages of the early 1950s).
18. u2, opening and table: ACM, IEEE and AAAI are expanded, and introduced as the three professional societies behind CS2023. "OS" is now "Operating Systems".
19. u2, opening: Algorithm is now defined in the lesson (a step-by-step procedure precise enough for a machine to follow), before Quiz 1 needs it.
20. history: NACA is expanded (National Advisory Committee for Aeronautics, the U.S. aviation research agency), with a note that NASA replaced it in 1958.
21. u4 and ethics: **Two meanings now marked.** u4 says "calibrated" there has its everyday meaning, carefully adjusted. The ethics definition adds that its meaning is technical and different from the calibrated noise in Privacy, data and surveillance, with a link.

### Across courses

22. CS 101: All six references to MATH 120 and MATH 130 are now links to the specific lesson ("MATH 120, Propositional logic", "MATH 120, Mathematical induction", "MATH 120, Sets", "MATH 130, Continuity", "MATH 130, Limits"). Where you might not have reached it yet, each gives a one-line meaning (∧ is and, ∨ or, ¬ not; induction is "prove a starting case, then show each step keeps the statement true"), and the wording says you take the course alongside, or covers it "later this term".
23. "Calibrated": see 21. Patriot (CS 101 ethics, optional): The connection now says plainly that the Patriot error was fixed-point, not floating-point: a float keeps a set number of significant digits and lets the point move, while fixed-point keeps it in one place. The shared root cause, that 0.1 has no exact binary form, is linked to the sidebar by its title, "Why 0.1 + 0.2 is not 0.3".
24. Precision: CS 101 u1's "Floats are approximate" now has a third bullet on subtracting nearly equal floats. It works through the 12-digits-agree, about-4-left example, using `(1 + 1e-12) - 1` = `1.000088900582341e-12`, the same number Practice 6 produces. MATH 130 u1 P6 and u3 both point back to it, so the three places tell one story.
