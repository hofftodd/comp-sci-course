# Student review: Year 1 Fall

I read these as a first-year student starting university with high-school algebra and trigonometry and no programming. Year 1 is taught in Python, so I ignored the hidden Java and C++ material. Each item below is something I didn't understand, something I had to guess at, or a place where the lesson seems to contradict itself. Items marked **(blocking)** stopped me from doing a practice problem or quiz question.

Files: `data/cs101.js`, `data/cs101-extras.js`, `data/cs101-code.js`, `data/math120.js`, `data/math130.js`, `data/cs100.js`. WRIT 100 has no content yet.

## CS 101 Programming I

### u0 Getting set up
1. The lesson says "create a file named hello.py in your cs101 folder", but not how. Do I open the folder in the editor first? Where does the editor save by default? I saved it in the wrong place and `python3 hello.py` said "No such file". **(blocking)**
2. Windows users are told to type `py`. Does that also apply to `python3 -m pip` and `python3 -m pytest` later? The course never repeats this.

### u1 Values, types and expressions
3. "The `{total:.2f}` in the earlier price example works the same way", but there is no earlier price example in this lesson or before it.
4. `math.isclose(a, b)` is recommended before imports are explained. I typed it and got `NameError: name 'math' is not defined`. **(blocking for practice 7)**
5. Why does `round(2.5)` give 2? "Rounds exact halves to the nearest even number" is clear, but `round(0.125, 2)` gives 0.12 for a different reason (binary floats). An example would stop me thinking I'd misunderstood.

### u2 Branching and iteration
6. The truthiness note ("That note mentions truthiness") comes after a bug that depends on truthiness. The order is backwards, and "that note" is unclear.
7. The guessing game uses `import random` and `random.randint` with no explanation of what `import` does.
8. In `print(f"{row * col:4}", end="")`, is `end` something special to print, or can every function take named arguments? (Keyword arguments come in the next lesson.)

### u3 Functions and abstraction
9. The lambda section says "with the math courses' code, such as `bisect(lambda x: x**2 - 2, 0, 2)`", but `bisect` isn't defined anywhere in CS 101. I tried it and got a NameError.
10. `global` is mentioned ("unless declared with global") with no example of what that looks like or what goes wrong without it.

### str Strings
11. `clean()` uses `ch.isalnum()`, which isn't in the method table (only `isdigit` and `isalpha` are).
12. A "generator expression" is used inside `join` before lists are taught. Can I write the same thing with a loop? Showing the loop version first would help.

### u5 Lists, tuples, dictionaries and sets
13. Quiz 1 says that after `b = a; b += [3]`, `a` is `[1, 2, 3]`. But Lesson 2 taught that `count += 1` means `count = count + 1`, which makes a new value. For lists, `b += [3]` changes the list in place, while `b = b + [3]` doesn't. The lesson never says this, so I got the quiz wrong. **(blocking for quiz 1)**
14. "Keys must be hashable" is the first time I see "hashable". The efficiency lesson explains hash tables much later. What does it mean right now?
15. The aliasing figure is clear for lists, but what about a list of lists? Does `a.copy()` copy the inner lists too? (`grid` appears earlier in the lesson.)

### u4 Recursion
16. `total(xs[1:])` copies the rest of the list at every call. Is that slow? Also, `total(list(range(2000)))` hits the recursion limit. The lesson mentions the limit of about 1,000 but doesn't connect it to this example.
17. The `@cache` line is called a decorator, and "it wraps the function". I don't know what "wraps" means yet.

### u6 Testing, debugging and exceptions
18. `pytest` needs installing, and the install command says "the toolkit lesson explains pip". The toolkit lesson is the last one in the course, so I couldn't install it when I needed it. **(blocking for practice 1)**
19. The `breakpoint()` commands (`p`, `n`, `s`, `c`) come from a tool that isn't named (pdb). How do I quit it?
20. When should I use `else` on a `try` versus just putting the code at the end of the `try` block?

### files Files and modules
21. `Path(__file__)`: what is `__file__`? And why does `/` join paths?
22. `newline=""` in `open(..., newline="")` for CSV isn't explained.

### algo Searching, sorting and efficiency
23. "Hash table" is explained in one sentence ("compute a number from each key"). I'd like a tiny worked example: what number, and where does it go?
24. The claim "no comparison-based sort can do better than n log n" comes with no reason at all. One sentence of intuition would help.

### u7 Version control and the programmer's toolkit
25. On Windows PowerShell, `.venv\Scripts\activate` may fail with a "running scripts is disabled" error. What do I do?
26. `git commit` without `-m` opens an editor I didn't choose (often Vim) that I can't exit.

### Optional lessons
27. "How Python actually runs your code" uses "threads" and "global interpreter lock" without explaining them. Fine for a deep dive, but a one-line gloss would help.

## MATH 120 Discrete Mathematics I

### u1 Propositional logic
28. The identity and domination laws use T and F as if they were propositions. What exactly are T and F?
29. "Q unless P" is ¬P → Q. I can't make that feel right, and practice 2(c) depends on it. A truth-table check or a second example would help. **(blocking for practice 2c)**
30. Knights and knaves (practice 7) has no worked example of how to approach such puzzles (assume A is a knight, check consistency, …). **(blocking)**

### u2 Predicates and quantifiers
31. "There is exactly one" is described in words but never written in symbols. How do I write it? Is ∃! allowed?
32. Practice 6(d), "every item is smaller than some later item, except the last", needs indexes inside `all`/`any`. No example shows that.

### u3 Proof techniques
33. In the √2 proof, "we can choose the fraction in lowest terms". Why can we always do that?
34. The contrapositive example just reuses an earlier proof. A contrapositive proof with its own algebra (like practice 3, 3n + 2) would help.

### u4 Sets
35. ⊄ and ⊊ (proper subset) are used or implied but never defined.
36. Practice 7's left side has a name (symmetric difference). Can we be told, and given its Python operator (`^`)?

### u5 Functions and relations
37. Floor ⌊x⌋ appears in practice 1(d) (and in MATH 130) without a definition. **(blocking for practice 1d)**
38. In the relations table, < is listed as transitive but not as antisymmetric. Is < antisymmetric (vacuously)? It's confusing to leave it out.
39. "Course prerequisites form an ordering like this" (a partial order), but a course isn't its own prerequisite, so the relation isn't reflexive. Is it a partial order or not?

### u6 Mathematical induction
40. In the template, it isn't clear when to use n and when to use k, and I mixed them up. One sentence on why we switch letters would help.
41. Practice 7 (every positive integer is less than 10) reads oddly: the "proof" just gives up. What exactly is the flaw I'm meant to name?

### Optional lessons
42. The history and deep lessons say "Unit 1" and "Unit 6", but the course calls them lessons.

## MATH 130 Calculus I

### pre Precalculus review
43. Inverse trigonometric functions (arcsin, arctan) aren't covered here or anywhere in the course, but MATH 131 uses arctan and 1/(1 + x²) right away.
44. "sec" appears in the derivative table (sec² x) and is defined only there, in passing.

### u1 Limits
45. The only ε–δ examples are linear functions. Am I expected to handle something like x² on the exam? If not, say so; if so, show one.

### u2 Continuity
46. The floor function ⌊x⌋ is used as an example without a definition (same as item 37).

### u4 Differentiation rules
47. The derivative of aˣ (aˣ ln a) and of ln x (1/x) are given without any reason. One line each (aˣ = e^(x ln a); ln is the inverse of eˣ) would help.
48. The chain rule is the "most important rule", but there's no picture or argument for why it's true beyond the gear analogy.

### u6 Integrals and the Fundamental Theorem
49. In A(x) = ∫ₐˣ f(t) dt, why is the variable suddenly t? I don't know what a dummy variable is.
50. Practice 6 asks for G′(x) where G(x) = ∫₀^(x²) sin t dt, which needs the chain rule with the FTC. The lesson never shows that. **(blocking)**
51. Why is ∫ (1/x) dx = ln |x| with absolute value bars when ln x is only defined for x > 0?

### Optional lessons
52. "Calculus inside machine learning" says the gradient is "a vector of partial derivatives". Neither "vector" nor "partial derivative" has been defined yet; a one-line preview would help.

## CS 100 Computing in Society

### u1 A short history of computing
53. "Bernoulli numbers" and "protocol" (TCP/IP) are used without saying what they are.

### u2 The map of computer science
54. "Attention" and "CUDA" in the chatbot example are unexplained jargon.

### u4 Privacy, data and surveillance
55. Differential privacy is "carefully calibrated random noise". I can't picture it. A tiny example (counting a yes/no question with noise added) would help.

### u6 Accessibility and inclusive design
56. The button example assumes I know HTML ("div", "onclick", "alt text" as an attribute). CS 101 doesn't teach HTML. A two-line explanation would make it readable.

### Optional lesson: risk scores
57. "False-positive rate", "false-negative rate", "base rate" and "calibrated" are used without definitions. A small 2×2 table example is needed to follow the impossibility result. **(blocking for quiz 2)**

## Across courses
58. MATH 120 and MATH 130 both use the floor function without defining it (items 37, 46). Define it once, in the place that comes first.
59. Hashing is first needed in CS 101's lists lesson (dictionary keys), explained a little in the efficiency lesson, and needed again in CS 102. A short, concrete explanation at first use would carry through all three.
60. Lesson numbers vs. ids: references like "Lesson 6" in MATH 130 are right when counted from the precalculus lesson, but easy to misread. Links to the lesson would help.

## Professor's response

Thank you for a careful, honest review. Every item below led to a change in the lesson it names, except where noted. Three items revealed real errors or contradictions, which are now fixed: the reference to a "price example" that doesn't exist (3), the unexplained difference between `+=` and `x = x + y` on lists that made Lesson 6's quiz contradict Lesson 2 (13), and the call to `bisect`, which CS 101 never defined (9). One item rested on a small misunderstanding, explained in its line (5). Every number, table value and code output that I added or changed was checked by running Python (3.13, with pytest 9.2 for the testing lesson). For advanced topics I chose, item by item, between a short correct explanation and an explicit "you don't need this yet"; the choice is stated in each line. References to other lessons are now links.

### CS 101 Programming I

1. u0, Your first program: Added three numbered steps: make the folder, then open it in VS Code (and create the file from the Explorer panel) or save into it from Thonny, then `cd` there and `ls` to confirm the file is present, with the "No such file or directory" symptom named (blocking item).
2. u0, Open a terminal: Stated that the `py` rule holds everywhere in the course, with `py -m pip install pytest` and `py -m pytest` as examples, and that plain `python` works inside an activated virtual environment (linked to Lesson 11).
3. u1, f-strings: **Error fixed.** Replaced the reference to a non-existent price example with a self-contained example, `f"{3.14159:.2f}"` gives `'3.14'`, and a pointer to the tip-calculator practice that uses it.
4. u1, Floats are approximate: Explained that `math` is a module, that `import math` must come first, what the `NameError` means without it, and where imports are covered. Practice 7 is now doable from the lesson (blocking item).
5. u1, Converting between types: Added `round(3.5)` and two examples. One correction to the review: 0.125 is exactly 1/8 in binary, so `round(0.125, 2)` giving 0.12 is the round-half-to-even rule, not a binary-float effect. The binary-float surprise is `round(2.675, 2)` giving 2.67, because the stored value is 2.67499999999999982…; both are now shown.
6. u2, Combining conditions: Moved the truthiness explanation before the `"Sat" or "Sun"` bug and rewrote the note so it says which value counts as true and why.
7. u2, while loops: Added a paragraph after the guessing game explaining `import`, modules, the dot in `random.randint`, and that both ends of 1 to 100 are included.
8. u2, Nested loops: Explained that `end=""` is a keyword argument, that any function can take named arguments (next lesson), and that `print`'s default `end` is a new line.
9. u3, Functions are values: **Error fixed.** `bisect` is now defined in the lesson (the same algorithm as MATH 130's Continuity lesson, which is linked), with a note that calling it undefined gives `NameError`, and its output 1.414213562355144 for √2.
10. u3, Scope: Added an example showing the `UnboundLocalError` without `global`, the `global` declaration that fixes it, and the better parameter-and-return version.
11. str, String methods: Added `isalnum()` to the method table, with `"R2D2"` (True) and `"R2-D2"` (False).
12. str, Palindrome example: `clean` is now shown first as a loop using the accumulator pattern, then as the one-line version, with the generator expression read aloud piece by piece.
13. u5, Aliasing: **Contradiction fixed.** New subsection "A trap: += on a list changes it in place" with a side-by-side example (`b += [3]` changes `a`; `b = b + [3]` does not) and a rule of thumb; added `xs += [7]` to the table of list operations. Lesson 2's augmented-assignment paragraph now says the `x = x + y` reading is exact for numbers and strings and that lists differ. Quiz 1's explanation now mentions both forms (blocking item).
14. u5, Dictionaries: New subsection "What hashable means": the hash, slots chosen by hash % 8, a three-key worked table, why keys must not change, and the real `TypeError: unhashable type: 'list'`.
15. u5, Aliasing: New subsection "Copying a list of lists": `grid.copy()` shares the inner lists (shown with output), copying each row fixes it, and `copy.deepcopy` for deeper nesting. Added "shallow copy" to the terms.
16. u4, Recursion on lists: Added the cost of slicing, n(n − 1)/2 copied items (404,550 for 900 items), an index-passing alternative, and the depth limit tied to this example: `total(list(range(900)))` works and `total(list(range(2000)))` raises `RecursionError`.
17. u4, Memoization: Explained that `@cache` above `def fib` means `fib = cache(fib)`, what "wraps" means (a new function that checks saved answers before calling yours), and why the recursive calls benefit. Writing decorators is left to CS 102, Lesson 5 (linked): "you don't need this yet".
18. u6, Automated tests with pytest: Gave the minimal install where pytest is first used: what pip is, `python3 -m pip install pytest` (and the Windows form), a version check, and a three-line virtual-environment fallback for the "externally-managed-environment" error. Practice 1 now says to put the function in `dates.py` and the tests in `test_dates.py`, and its answer gives the expected "4 passed" (blocking item; checked with pytest 9.2).
19. u6, A method for debugging: Named pdb and the `(Pdb)` prompt, added `l` (list) and `q` (quit), and reminded students to remove `breakpoint()`.
20. u6, Exceptions: handling them: Added when to use `else`: keep the `try` block to the lines that may fail. The example shows `math.sqrt(-4)` raising its own `ValueError` and being misreported as "Not a whole number", and the `else` version that avoids it.
21. files, Paths: Explained `__file__` (set by Python to the program file's path; not defined in the console), `.parent`, and that `Path` defines `/` to mean "join", using `\` on Windows automatically.
22. files, CSV files: Explained `newline=""`: Python normally translates line endings, `csv` must handle them itself because quoted values can contain line breaks, and without it Windows files get blank lines between rows.
23. algo, The cost of Python's data structures: Added a worked hash-table example with 8 slots and keys 12, 7, 33 and 20, including the collision in slot 4, short per-slot lists, resizing, and why that gives O(1) on average. It links back to the first explanation in Lesson 6.
24. algo, Merge sort: Added the counting intuition: n! orders, each comparison at most halves them, so at least log₂(n!) comparisons, about 8,530 for n = 1,000 against n log₂ n ≈ 9,966. Linked to MATH 131, Lesson 1, where Stirling's approximation makes this precise.
25. u7, Virtual environments: Added a note on the PowerShell "running scripts is disabled" error: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`, or `activate.bat` from Command Prompt, or calling `.venv\Scripts\python` directly. The fallback in Lesson 8 points to it.
26. u7, The everyday commands: Explained that `git commit` without `-m` opens an editor (often Vim), how to leave it (Esc then `:wq` to commit, `:q!` to abort), and how to choose VS Code or nano with `git config --global core.editor`.
27. Optional lesson "How Python actually runs your code": Added a short gloss of threads and the global interpreter lock, and pointed to Operating Systems.

### MATH 120 Discrete Mathematics I

28. u1, Logical equivalence: Defined T and F as the always-true and always-false propositions, with examples, the analogy to 1 and 0 in algebra, and Python's `True` and `False`.
29. u1, Implication: New paragraph "Why 'Q unless P' is ¬P → Q": "unless" means "if not", a walking-to-class example, a truth table showing ¬P → Q ≡ P ∨ Q, a recipe, and a second example. The practice 2(c) answer now names A and B and shows each step (blocking item).
30. u1: New section "Solving logic puzzles: knights and knaves" with the key rule (knight exactly when the statement is true), a three-step method, a worked puzzle ("We are both knaves": A knave, B knight), and a brute-force Python check. Practice 7 is now doable from the lesson (blocking item).
31. u2, Translating English: Wrote "exactly one" in symbols, ∃x (P(x) ∧ ∀y (P(y) → y = x)), introduced ∃! as an allowed abbreviation (expand it in uniqueness proofs), gave an example and a Python one-liner.
32. u2, Quantifiers: Added two index-based examples ("in order" with `range(len(xs) - 1)`, and "some item appears again later" with `range(i + 1, len(xs))`), and pointed out why the ranges are chosen that way. Practice 6(d) now has a model in the lesson.
33. u3, Proof by contradiction: Explained why lowest terms is always possible (divide out common factors; a positive denominator can't shrink forever; or divide by the gcd once).
34. u3, Proof by contrapositive: Added a new proof with its own algebra (if xy is even, then x or y is even), including the De Morgan step in negating "or", and a three-step pattern to copy. I kept it distinct from practice 3 so that practice remains an exercise.
35. u4, Subsets: Defined ⊄ and proper subset ⊊ with examples, noted the ⊂ ambiguity between books, and gave Python's `<=` and `<`.
36. u4, Set operations: Added symmetric difference (A △ B, "in exactly one", exclusive or, Python `a ^ b`) to the operations table; practice 7's answer now refers to it.
37. u5, Functions: Defined the floor function, with examples including a negative one and its link to Python's `//`, and linked to the fuller treatment in MATH 130, Lesson 1. Practice 1(d) is now doable from the lesson (blocking item). Added floor to the terms.
38. u5, Relations table: Listed < as antisymmetric (vacuously) and explained why in a paragraph, connecting to the "is taller than" practice.
39. u5, Partial orders: Defined strict partial orders (irreflexive, antisymmetric, transitive, like <), and said precisely that "must be taken before" is a strict partial order, while "comes no later than" is the corresponding partial order.
40. u6, A template: Added a paragraph explaining why the letter changes from n (every value, in the claim) to k (one particular value, in the step), and that the goal is P(k + 1).
41. u6, Practice 7: Rewrote the flawed "proof" so the flaw is a concrete, nameable one (the inductive hypothesis assumes the whole claim), added a hint, and expanded the answer: the correct hypothesis k < 10 does not give k + 1 < 10 at k = 9, and 10 is a counterexample.
42. Optional lessons: "Unit 1" and "Unit 6" now read "Lesson 1" and "Lesson 6" and link to those lessons. The plain "Lesson N" references in the core lessons are links too.

### MATH 130 Calculus I

43. pre: New section "Inverse functions and inverse trigonometric functions": what an inverse is, why sin, cos and tan must be restricted, a table of arcsin, arccos and arctan (domains, ranges, values), a worked evaluation, a figure of y = arctan x with its asymptotes ±π/2, the sin⁻¹ notation warning, and Python's `math.atan`. Added a quiz question and a practice problem. In u4 the derivative table now includes arctan x (1/(1 + x²)) and arcsin x (1/√(1 − x²)), both derived by implicit differentiation, with a quiz question and a practice problem; u6's antiderivative table includes ∫ 1/(1 + x²) dx = arctan x + C. This prepares MATH 131.
44. pre, Trigonometric functions: Defined sec, csc and cot, and derived 1 + tan² θ = sec² θ, which the arctan derivation uses. The u4 table points back to the definition.
45. u1, The ε–δ definition: Said explicitly that exam ε–δ proofs are for linear functions, then showed one nonlinear example "not on the exam" (x² → 9 at 3, with δ = min(1, ε/7)), checked numerically on 100,000 random cases.
46. u2, Types of discontinuity: The floor example now says what ⌊x⌋ is and links to its definition in Lesson 1 (new subsection "Floor and ceiling", with a table including negative values).
47. u4: New section "Where the exponential, logarithm and inverse-trig rules come from": aˣ = e^(x ln a) with the chain rule, and ln x by differentiating e^y = x implicitly. The table notes say the derivations follow.
48. u4, The chain rule: Added a three-step small-change argument (Δu ≈ g′Δx, Δy ≈ f′Δu), a figure of three number lines showing rates multiplying, and a numerical check with sin(5x) at x = 0.2 (2.69 against 5 cos 1 ≈ 2.7015).
49. u6, The Fundamental Theorem: Explained dummy variables, why the letter inside must differ from the upper limit x, and the comparison to a Python loop variable. Added "dummy variable" to the terms.
50. u6, FTC Part 1: Added "When the upper limit is a function of x", worked as three numbered steps for ∫₀^(x³) cos t dt, checked by computing the integral directly, with the general formula. Practice 6 is now doable from the lesson (blocking item).
51. u6, Antiderivatives: Explained ln |x|: ln(−x) has derivative 1/x for x < 0, so ln |x| covers both sides; example ∫ from −3 to −1 of 1/x dx = −ln 3 ≈ −1.0986, and the warning not to integrate across 0.
52. Optional lesson "Calculus inside machine learning": Added a one-line preview of "vector" (an ordered list of numbers) and "partial derivative" (differentiate in one input, holding the others fixed), with a small example, and linked to MATH 131, Lesson 7.

### CS 100 Computing in Society

53. u1: Said what Bernoulli numbers are (a sequence of fractions, 1, −1/2, 1/6, 0, −1/30, …, used in formulas for sums of powers, each computed from the earlier ones) and what a protocol is, with what TCP/IP's rules cover.
54. u2, Everything connects: Glossed attention (how much weight each word gives every other word) and CUDA (NVIDIA's extension of C++ for programming its graphics processors).
55. u4, Differential privacy: Added a worked example: a survey count of 212 published as 215 after small random noise, why one student's answer is hidden in the noise, and what "calibrated" means (more noise, more privacy, less accuracy).
56. u6, What you can do in your own code: Added a short HTML primer before the button example: tags, `div`, attributes (`class`, `onclick`), `alt` text on an image, and comments.
57. Optional lesson "Risk scores": New section "The words you need, with a small example": two 2×2 tables (groups of 100 with base rates 50% and 20%) for a tool that is calibrated (high risk means 60%, low risk 10%, in both groups) but has false-positive rates of 64% and 10% and false-negative rates of 4% and 40%, and why fixing the error rates breaks calibration. Added the two error rates to the terms. Quiz 2 is now answerable from the lesson (blocking item). Also changed "Unit 3" to a link to Lesson 3.

### Across courses

58. The floor function is now defined in MATH 130, Lesson 1, the earliest place in the term's sequence where students meet it, with ceiling, a table and the link to `//`. MATH 120, Lesson 5 restates it in one sentence (because practice 1(d) needs it) and links to MATH 130; MATH 130, Lesson 3 links back to it.
59. Hashing is now explained concretely at first use (CS 101 Lesson 6: hash, slots, hash % 8, why keys must not change). The efficiency lesson builds on it with collisions and resizing, and CS 102's "What is a hash?" section continues from there.
60. Every "Lesson N" in MATH 130's notes is now a link to that lesson (counted from the precalculus review as Lesson 1), and the same is done in MATH 120. New cross-course references (CS 101 to MATH 130, MATH 131 and CS 102; MATH 120 to MATH 130; MATH 130 to MATH 131) are links too.
