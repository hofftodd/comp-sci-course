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
