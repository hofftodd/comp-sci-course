# Student review: Year 1 Fall

*Round 2. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited. (An earlier run of this round read text from a buggy version of `scripts/dump_course.js` that flattened superscripts and subscripts; it was discarded and this review was run again after the fix.)*

I'm a first-year student who has finished high-school algebra and trigonometry and has never programmed. I read CS 101, MATH 120, MATH 130 and CS 100 in lesson order. I tried every quiz question in my head and tried to start every practice problem. In the list below, "(blocking)" means I couldn't answer the quiz question or start the problem using only the lessons.

### CS 101 Programming I

#### u0: Getting set up and your first program

1. "`>>> 2 ** 100`" and then, in P2, "predict … `2 ** 10`, `"ha" * 3`". This lesson doesn't explain `**` or multiplying a string by a number, so I can't predict these. I can only run them and see what happens.

#### u1: Values, types and expressions

2. "Choose your language at the top of the page." I don't know what this means. Every example is in Python, and the notes never mention another language or a selector.
3. "Use round(x, 2) or an f-string such as f"{x:.2f}"". This is in the floats section, before f-strings are explained near the end of the same lesson. On first reading I didn't know what `f"…"` or `:.2f` meant.
4. "It also works inside editors such as IDLE, Thonny and VS Code". Lesson u0 introduced Thonny and VS Code, but IDLE is never introduced.
5. Sidebar: "an int has a fixed width, usually 32 bits, and arithmetic past about 2.1 billion silently wraps around or is undefined behavior". "Bits", "wraps around" and "undefined behavior" are never explained, so I couldn't see why 32 bits gives 2.1 billion.

#### u2: Branching and iteration

6. "Strings compare alphabetically, character by character, using each character's code number." Character code numbers aren't explained until the Strings lesson (`ord`), so here I had to accept that "Zebra" < "apple" without understanding why.
7. P3 (count the vowels, upper or lower case). The obvious test, `ch in "aeiou"`, uses `in` on a string, which isn't taught until the Strings lesson. I could only do it with long `or` chains. I could still start it.

#### u3: Functions and abstraction

8. "if month in (4, 6, 9, 11):". The parentheses-of-numbers value (a tuple) and the `in` test both appear here before they're taught (`in` in Strings, tuples in Lists). I guessed the meaning.
9. "def bisect(f, lo, hi, tol=1e-10):". The notation `1e-10` is never explained, in this lesson or anywhere else in CS 101. MATH 130 uses it too.
10. P2: "Check with assert that converting 100 °C to F and back gives 100." Lesson u1 said "Never test floats with ==", and this conversion involves division, so the result is a float. I don't know whether I'm supposed to use `==` here or `math.isclose`.

#### str: Strings

11. Q4: `" ".join("to be".split()[::-1])`. Answering this means reversing a list with `[::-1]`, but this lesson only shows slicing on strings and says "lists are the next lesson". I answered by guessing that lists slice the same way.
12. P4 (`is_valid_password`, "at least one uppercase letter"). The methods table has `isdigit`, `isalpha` and `isalnum` but nothing for testing whether a character is uppercase. I had to make up a workaround such as `"A" <= ch <= "Z"`.

#### u5: Lists, tuples, dictionaries and sets

13. "xs += [7] | [3, 1, 2, 7] (changed in place, like extend)". `extend` isn't explained until the Recursion lesson, which comes after this one.
14. CODE top_words: "returns a list of the n most common words as (word, count) tuples, most common first. Break ties alphabetically." (blocking) The lesson only shows sorting by one key with `reverse=True`. Sorting by count from high to low while breaking ties alphabetically from low to high needs something the lesson never shows, such as comparing tuples or using a negative count. I couldn't work out how to do both from the notes.

#### u4: Recursion

15. "from functools import cache". The `from … import …` form isn't explained until the Files and modules lesson, which comes later.
16. P7 and CODE binary: "returns the binary representation of a non-negative whole number as a string: binary(13) returns "1101"." (blocking) Nothing in any of my courses explains binary numbers or how to convert a number to binary. I don't know why 13 is "1101", so I can't start either problem.

#### u6: Testing, debugging and exceptions

17. "with pytest.raises(ValueError):". The `with` statement isn't explained until the Files lesson, so I didn't know what this line does.
18. P2: "What went wrong, in which function…?" The traceback says "line 15, in <module>", and the lessons never explain what `<module>` means. The only function name I can see is `letter`, so I wasn't sure whether the error happened in `letter` or somewhere else.

#### algo: Searching, sorting and efficiency

19. "for _ in range(100):". Nothing explains using `_` as a loop variable name.
20. "seen.add(x)". The Sets section never showed `.add`. It only showed `|`, `&`, `-` and `set(...)`.
21. Contradiction. The big-O table lists "O(2ⁿ) | exponential | Naive Fibonacci | 1,024 …", but the Recursion lesson says "The number of calls grows roughly like 1.6ⁿ". I don't know which is right, or why the table uses 2ⁿ.

#### lang: How programming languages evolved

22. Q4: "Which language family does Python's block structure and lexical scope ultimately descend from?" The lesson never uses the term "lexical scope". It says ALGOL had "nested blocks, local variables". I matched the answer by elimination.
23. "Java … compiled to bytecode for a virtual machine". Bytecode and virtual machines aren't explained in this lesson. Only the later optional "deep" lesson explains them.

#### ethics: When software fails people

24. "a 24-bit fixed-point value of 0.1", "a one-byte counter that overflowed back to zero", "converted a 64-bit floating-point velocity into a 16-bit integer". Bits, bytes, fixed-point and what overflow means are never explained, so I couldn't follow how these bugs actually happened. I could still answer the quiz.

#### deep: How Python actually runs your code

25. "Parse the tokens into an abstract syntax tree (AST)" and "machine code". Neither is defined. Q2 also says "large arrays", and arrays are never defined either. CS 101 only has lists.

### MATH 120 Discrete Mathematics I

#### u1: Propositional logic

26. P5: "show that ¬(P ∨ ¬Q) ∨ (¬P ∧ ¬Q) ≡ ¬P. Name the law at each step." Partway through I need Q ∨ ¬Q ≡ T. That fact appears only in passing ("T is a proposition that is always true (for example Q ∨ ¬Q…)"), and the laws table gives it no name. So I can't name the law for that step.

#### u2: Predicates and quantifiers

27. Sidebar: "SELECT name FROM students WHERE gpa > 3.5 is set-builder notation." Set-builder notation isn't introduced until Lesson 4 (Sets).

#### u3: Proof techniques

28. "Or do it in one step: divide both by their greatest common divisor." "Greatest common divisor" is used without a definition.
29. "n² + n + 41 is prime for every natural number n. It's prime for n = 0, 1, …, 39". I wasn't sure "natural number" includes 0. Lesson 4 is where ℕ is defined to start at 0.

#### u5: Functions and relations

30. "(MATH 130, Lesson 1 has a graph and more examples.)" MATH 130's precalculus lesson has a table of floor and ceiling values and describes the staircase in words, but there's no graph.
31. "Any hash function that maps all possible strings to 64-bit numbers must have collisions … because there are more strings than 64-bit numbers." "64-bit number" isn't explained, so I can't tell how many such numbers there are.

### MATH 130 Calculus I

#### pre: Functions: a precalculus review

32. "its graph has two horizontal asymptotes, so arctan x → π/2 as x → ∞". "Asymptote" and the notation "→ ∞" are used here before the Limits lesson introduces them.
33. "[−1, 1] | [−π/2, π/2]" and "(−π/2, π/2)" in the inverse-trig table. The difference between square brackets and round brackets in interval notation isn't explained until Continuity ("closed interval", "open interval").
34. "a number n needs about log₂ n bits, and the depth of a balanced tree with n items is about log₂ n". "Bits" and "balanced tree" aren't defined, so this example didn't help me understand logarithms.

#### u1: Limits

35. "A geometric argument comparing a triangle, a sector and a larger triangle in the unit circle shows that for small positive x … cos x ≤ (sin x)/x ≤ 1." The argument is skipped, and I couldn't rebuild it myself.
36. P5: "Use the squeeze theorem to find lim_(x→∞) (sin x)/x." The squeeze theorem is stated only for limits "near a", not for x → ∞. I don't know whether it also applies at infinity.
37. P6: "evaluating at x = 10⁻¹, 10⁻², …, 10⁻¹². What happens at the smallest values, and why?" I don't know how to write 10⁻¹² in Python (see item 9). The "why" depends on losing digits when you subtract nearly equal floats, which isn't explained until the next lesson (Derivative). CS 101 only showed 0.1 + 0.2.

#### u2: Continuity

38. P4: "solve cos x = x to 10 decimal places. How many passes of the loop does it take?" The `bisect` function shown doesn't count its passes, so I'd have to change it, which the problem doesn't say. I'm also not sure whether "10 decimal places" means the same as `tol=1e-10`.

#### u3: The derivative

39. "subtracting them loses most of the significant digits. A value of h around 10⁻⁵ to 10⁻⁶ is a good compromise in double precision." "Significant digits" and "double precision" are not defined anywhere in my courses.
40. Q2 asks "Is f(x) = |x| differentiable at 0?" and Lesson 6's Mean Value Theorem says "differentiable on (a, b)", but "differentiable" is never defined as a word. I assumed it means "the derivative exists there".
41. "A cusp or wild oscillation, such as x sin(1/x) at 0." "Cusp" isn't defined. Also, x sin(1/x) isn't defined at 0 at all, so I don't see what "derivative at 0" means for it.
42. Q3: "Rounding error in f(a + h) − f(a) dominates". The lesson's numerical method is the central difference, which subtracts f(a + h) − f(a − h). I wasn't sure whether the quiz means the same thing.

#### rates: Related rates, approximation and L'Hôpital's rule

43. P2 (conical tank, "height 10 m and top radius 5 m … when the water is 4 m deep"). To solve it I need the water's radius as a function of its depth. That requires a similar-triangles step (r = h/2), and no example in the lesson shows it.
44. P5: "lim_(n→∞) log₂ n / n". The derivative of log₂ n isn't in the derivative table, which has ln x but not other bases. I had to work it out from the change-of-base rule in the review lesson.
45. "compared with one extra binary digit per step for bisection". "Binary digit" isn't explained (see item 16).

#### history: Two thousand years of calculus

46. "Archimedes found the area of a parabolic segment with what amounts to a geometric series" and "built largely to solve differential equations". "Geometric series" and "differential equation" are never defined.

### CS 100 Computing in Society

#### u1: A short history of computing

47. "pages written in HTML, identified by URLs and fetched with HTTP". All three acronyms are used without saying what they stand for or what they are.

#### u2: The map of computer science

48. "CUDA, the chip maker NVIDIA's extension of C++". C++ hasn't been introduced at this point. It only appears later, in CS 101's optional history lesson.

#### u4: Privacy, data and surveillance

49. "Locked: encrypt data while it travels and while it is stored." "Encrypt" isn't explained in this course. CS 101's Caesar cipher is the only related idea I've seen, and I don't know whether that's what "encrypt" means here.

#### history: The hidden history of computing

50. Q1's intended answer is "From wiring diagrams and block diagrams", but the lesson says only "working from the machine's wiring diagrams". It never mentions block diagrams, so I wasn't sure the answer matched the lesson.

#### ethics: Case study: risk scores and the math of fairness

51. "To lower A's false-positive rate we would have to relabel some of A's high-risk people as low risk. But then A's 'low risk' group would contain more reoffenders". If only the 32 people in A who did not reoffend were relabeled, the low-risk group would get fewer reoffenders as a share, not more. The lesson doesn't explain why we can't pick out just those people. I think it's because we don't know who reoffends when the label is given, but the lesson never says so, and I couldn't follow the argument.
52. "a score cannot be calibrated and have equal false-positive and false-negative rates across groups, except in trivial cases." "Trivial cases" isn't explained, so I don't know when the theorem doesn't apply.

### Across courses

53. Binary and bits are never taught, but every course relies on them: CS 101 ("Floats are stored in binary", "32 bits", the binary(n) problems, "24-bit", "16-bit integer"), MATH 120 ("64-bit numbers") and MATH 130 ("log₂ n bits", "one extra binary digit"). Because of this, the CS 101 binary problems are blocking (item 16), and the other passages are only partly understandable.
54. Scientific notation in Python (`1e-10`, `h=1e-5`) appears in CS 101 u3, MATH 130 Continuity ("tol=1e-10 … is a default argument") and MATH 130 Derivative. MATH 130 explains that `tol=` is a default argument but not what `1e-10` means, and no course explains how to write powers of ten this way.
55. "Compiler" is used throughout before it's defined: CS 100 ("a word processor, a game and a compiler", the CS 2023 table), CS 101 ("compiled languages", "Every compiler since is a far more ambitious version of it") and MATH 120 (CompCert, "compiler output"). CS 101 defines "assembler" but never says what a compiler is.
56. Naive Fibonacci's growth is described two ways. CS 101 Recursion says it grows "roughly like 1.6ⁿ", while CS 101 Efficiency (O(2ⁿ), "Naive Fibonacci") and MATH 130 Limits/L'Hôpital (the "O(2ⁿ)" ordering) treat it as 2ⁿ. MATH 130 precalculus says it "grows by the same factor every time", which fits both, so I can't tell which base is correct.
57. CS 101 says "Never test floats with ==", but some later problems seem to expect exact float comparisons, such as CS 101 u3 P2 (item 10), and none of them say which to use.


## Professor's response

Thank you for another careful review. Every item below led to a change, except where a line says otherwise. Four items revealed real contradictions or errors, now fixed: naive Fibonacci's growth (21, 56), the float-equality rule against a practice answer that used `==` (10, 57), a quiz choice that named the wrong subtraction (42), and a cross-reference to a floor-function graph that didn't exist (30). The two blocking items are resolved by new teaching where it's first needed: a section on binary numbers, bits and bytes in CS 101, Lesson 2 (16, 53, and the other bit and byte items link to it), and a subsection on sorting by two keys in CS 101, Lesson 6 (14). One item partly rested on a misreading (7, explained in its line), and in two more the help was already in a hint the plain-text extraction doesn't show (14, 43); in each case the lesson now teaches the idea anyway. Every number and code output I added or changed was checked by running Python 3. No programming problem's tests changed; two prompts now point to the sections that teach what they need.

### CS 101 Programming I

1. u0, The interactive console: Added a short paragraph after the first console session: the arithmetic operators, `**` as "to the power of", `+` joining strings, and `*` repeating a string (`"ab" * 2` is `'abab'`). Practice 2 can now be predicted, not just run.
2. u1, Talking to the user: Removed "Choose your language at the top of the page." It was written for a language selector that Python-only students don't see.
3. u1, Floats are approximate: The bullet now leads with `round(x, 2)` (with `round(0.1 + 0.2, 2)` giving `0.3`) and introduces `f"{x:.2f}"` in parentheses as an *f-string*, saying it's explained in the output section at the end of the lesson.
4. u1, input(): IDLE is now introduced where it's named: "the simple editor that comes with Python".
5. u1 sidebar "Integers without limits": Now says what a compiler and a compiled language are, links to the new binary section for why 32 bits gives a maximum of 2³¹ − 1 = 2,147,483,647, and explains "wraps around" (Java goes to a large negative number) and "undefined behavior" (the language rules don't say what happens).
6. u2, Comparisons: Added the code numbers (A to Z are 65 to 90, a to z are 97 to 122) and a pointer to `ord` in the Strings lesson, so "Zebra" < "apple" now has a reason.
7. u2, for loops: Added a sentence teaching `ch in "aeiou"` as a test and the `_` loop-variable convention. One correction to the review: the practice answer explains `ch in "aeiou"` itself, so P3 was meant to be doable here. But the lesson should teach it before the practice uses it, and now it does.
8. u3, Decomposition: Added a short paragraph after `days_in_month` explaining `(4, 6, 9, 11)` as a tuple (covered in the Lists lesson), `month in (…)` as a membership test, and the one-line `29 if … else 28`.
9. u1 (new) and u3, bisect: Scientific notation is now taught in Lesson 2 (`2.5e3` is 2500.0, `1e-10` is 10⁻¹⁰), and the bisect paragraph in Lesson 4 explains `tol=1e-10` with a link back.
10. u3, Practice 2: **Contradiction fixed.** The question now says to compare with `math.isclose`, and the answer uses it for both checks (it had `c_to_f(100) == 212`). The answer shows why: `f_to_c(c_to_f(1))` is `0.9999999999999984`.
11. str, String methods: Where `split` first produces a list, added a one-sentence preview: a list is values in square brackets, and it slices like a string, so `['to', 'be'][::-1]` is `['be', 'to']`. Quiz 4 is now answerable from the lesson.
12. str, String methods: Added `isupper()` and `islower()` to the methods table (`"A".isupper()` is True, `"a".isupper()` is False).
13. u5, Changing lists: Added an `xs.extend([7, 8])` row to the table and removed "like extend" from the `+=` row, so `extend` is taught before anything refers to it.
14. u5, Sorting with a key: New subsection "Sorting by two things at once": tuples compare item by item (`(3, "b") < (3, "c")`), a key can return a tuple, and `reverse=True` also reverses the tie-breaker, so you sort by negative count instead. The worked example shows both versions with real output. The top_words prompt now points to this subsection. The problem's hint already had the key `(-pair[1], pair[0])`, but the lesson didn't teach it (blocking item).
15. u4, Memoization: One sentence before the code explains `from functools import cache` (bring in one name from a module) and links to Files and modules.
16. u1 (new) and u4: **Blocking item.** New section "Binary numbers, bits and bytes" in Lesson 2: place values 1, 2, 4, 8; 1101 = 8 + 4 + 1 = 13; converting 13 by repeated division with a table of remainders; the link to `% 2` and `// 2`; checking with `bin(13)` and `int("1101", 2)`. Practice 7 and the CODE binary prompt both link to it.
17. u6, Automated tests with pytest: Explained `with pytest.raises(ValueError):` ("the indented lines must raise ValueError"), and said in one line what `with` does, pointing ahead to files.
18. u6, Reading a traceback: Added that `in <module>` means "in the main program, not inside any function". Practice 2's answer already said the error happened before `letter` was called; the lesson now gives you the vocabulary to see it.
19. algo, The cost of data structures: The `_` in the timing loop is now explained with a link back to Lesson 3, where `_` is now taught (item 7).
20. u5, Sets: Added `.add` with a three-line example and the "seen" pattern that the efficiency lesson uses.
21. u4 and algo: **Contradiction fixed.** Both numbers were right but the lessons didn't say how they relate. Recursion now says the calls grow like about 1.6ⁿ (1.618…ⁿ), that this is exponential, and that 2ⁿ is an easy upper bound, since each call makes at most two more. The big-O table's exponential row now uses "trying every subset of n items", which is exactly 2ⁿ. A note under the table says naive Fibonacci is exponential at about 1.6ⁿ, that O(2ⁿ) is a correct but loose upper bound because big-O only means "grows no faster than", and that 1.6¹⁰⁰⁰ has 205 digits.
22. Optional "lang", ALGOL 60: The bullet now names *lexical scope* and defines it (a name made inside a block is usable only within that block's text, like a Python function's local variables). Quiz 4 now matches the lesson's words.
23. Optional "lang", Java: Explained bytecode and the virtual machine in two sentences (instructions for an imaginary computer; a program written once for each real machine runs them), with a link to the "deep" lesson.
24. Optional "ethics": Therac-25 now says a byte holds 0 to 255 and adding 1 to 255 wraps to 0 (linked to the binary section). Patriot now explains fixed-point and the repeating binary 0.000110011…, and that the stored 0.1 was too small by about 0.000000095. That error times 3.6 million tenths of a second in 100 hours is 0.34 s, which matches "about a third of a second". Ariane 5 now gives the 16-bit range, −32,768 to 32,767.
25. Optional "deep": The AST is now defined, with `2 + 3 * 4` as an example. Machine code is defined here and also where it first appears in the "lang" lesson. NumPy and its arrays are explained in the paragraph Quiz 2 draws on.

### MATH 120 Discrete Mathematics I

26. u1, Logical equivalence: Added a "Negation" row to the laws table (P ∨ ¬P ≡ T, P ∧ ¬P ≡ F), and Practice 5's answer now names that step "Negation".
27. u2 sidebar "Quantifiers as queries": Now writes the query in set-builder form, gives a one-phrase meaning, and says the notation is taught in Lesson 4.
28. u3, Proof by contradiction: Defined greatest common divisor at its use (the largest whole number dividing both; 12/18 becomes 2/3 after dividing by 6).
29. u3, Counterexamples: Added "(here the natural numbers are 0, 1, 2, …; Lesson 4 fixes this convention)" with a link.
30. u5 → MATH 130 u0: **Error fixed** by adding the promised figure. MATH 130's Floor and ceiling section now has a staircase graph of ⌊x⌋ from −3 to 3, with filled and open endpoints and a caption explaining them, so the MATH 120 cross-reference is now accurate.
31. u5, Pigeonhole: Explained that there are 2⁶⁴ ≈ 1.8 × 10¹⁹ 64-bit numbers and infinitely many strings, so pigeonhole forces a collision; linked to the CS 101 binary section.

### MATH 130 Calculus I

32. pre, Inverse trig: Defined horizontal asymptote (pointing to the dashed lines in the arctan figure) and read "→ ∞" aloud in words, with a link to Limits, where the notation is made precise.
33. pre, Inverse trig: Added one sentence on interval notation before the table: square brackets include the ends, round brackets exclude them.
34. pre, Logarithms: "log₂ n bits" now says what that means (1000 needs 10 bits, since 2¹⁰ = 1024) with a link to CS 101's binary section. I replaced the balanced-tree example, which needs Data Structures, with a knockout tournament that takes about log₂ n rounds.
35. u1, The most important trigonometric limit: The geometric argument is now written out: triangle ½ sin x, sector ½x, tangent triangle ½ tan x, so sin x ≤ x ≤ tan x, then divide and flip to get cos x ≤ (sin x)/x ≤ 1, and a sentence for negative x.
36. u1, Squeeze theorem: Added that the theorem holds as x → ∞, with "near a" replaced by "for all sufficiently large x". Practice 5 now rests on a stated fact.
37. u1, Practice 6: The question now says how to write 10⁻ᵏ in Python (`10 ** -k` or `1e-12`) and points to CS 101 for floats' roughly 16 significant digits. The answer gives the actual outputs at 10⁻⁷, 10⁻⁹ and 10⁻¹², explains in a few sentences why only about four digits survive the subtraction, and links to the Derivative lesson.
38. u2, Practice 4: Reworded: use the default `tol=1e-10`, which means the answer is within 10⁻¹⁰ (that's what "10 decimal places" meant), and count passes by adding a counter, with the exact steps given. The answer shows the modified function, which prints 34 and 0.7390851332452747, and the paper calculation, log₂(1.57 × 10¹⁰) ≈ 33.9. The Continuity text also now explains `1e-10` (item 54).
39. u3, Numerical derivatives: Defined double precision (64-bit floats) and significant digits in a parenthesis with a CS 101 link, and added a live demonstration: `h=1e-15` gives 5.329070518200751 for the derivative of x² at 3, instead of 6.
40. u3, Where derivatives don't exist: Defined "differentiable at a" (f′(a) exists) and "differentiable on (a, b)" at the start of the section.
41. u3, same section: Split the bullet. A cusp is now defined with x^(2/3) at 0 as the example. For x sin(1/x), the lesson now defines f(0) = 0 to fill the gap, shows it's continuous by squeezing, and shows the difference quotient is sin(1/h), which has no limit. You were right that it isn't defined at 0 as written.
42. u3, Quiz 3: **Mismatch fixed.** The choice now reads "Rounding error in the subtraction f(a + h) − f(a − h) dominates", matching the lesson's central difference, and the explanation adds that the one-sided version has the same problem.
43. rates, Related rates: Added a short paragraph, "When a formula has one variable too many", that teaches the similar-triangles step on a different cone (12 cm tall, radius 4, so r = h/3 and V = πh³/27). It leaves Practice 2 for you to do. The practice already had this as a hint, which the extraction doesn't show.
44. u4, derivative table: Added log_b x → 1/(x ln b), with the change-of-base reason, so Practice 5 in Related rates can use the table directly.
45. rates, Newton's method: "One extra binary digit per step" now says what it means: each halving fixes one more bit, about 0.3 of a decimal digit, which is why 10 decimal places took 34 passes in Lesson 3.
46. history: Defined geometric series with Archimedes' own series (1 + ¼ + 1/16 + ⋯ = 4/3) and differential equation in a clause, with the artillery example.

### CS 100 Computing in Society

47. u1, The web: HTML, URL and HTTP are now expanded and each explained in a phrase, with an example address.
48. u2, A chatbot uses all of them: Added "(a widely used programming language, valued for speed)" after C++.
49. u4, Privacy: Defined encrypt in a parenthesis, and confirmed your guess: the Caesar cipher is a toy version of the same idea.
50. history, Quiz 1: The intended choice now reads "From the machine's wiring diagrams", the lesson's own words. The other choices are unchanged.
51. ethics, The words you need: Rewrote the argument along the lines you suggested. Labels are given before anyone knows who will reoffend, so the tool can't pick out the 32 non-reoffenders. If it could, it would be a different, better tool. A worked example moves 20 of A's high-risk people to low risk: about 12 reoffend and 8 don't, so A's false-positive rate falls from 64% to 48%, but "low risk" in A now means 14/40 = 35% against 10% in B, and calibration is lost.
52. ethics, The impossibility result: Named the trivial cases: the groups have the same base rate, or the tool is a perfect predictor. Added that neither happens in practice.

### Across courses

53. Binary and bits: Taught once, early, in CS 101, Lesson 2 (see 16): bits, base 2, converting both ways, bytes, a table of 8-, 16-, 32- and 64-bit counts, overflow, and 64-bit floats with about 16 significant digits. Every passage you listed now links to it or uses its words: CS 101 sidebar (5), binary problems (16), ethics lesson (24), MATH 120 (31), MATH 130 logarithms (34), derivative (39) and Newton's method (45).
54. Scientific notation: Taught in CS 101, Lesson 2, beside floats, and explained again at each use: CS 101 bisect, MATH 130 Limits Practice 6, Continuity, and Derivative (`h=1e-5`).
55. Compiler: Defined at the first use in each course. In CS 100 Lesson 1 it's "a program that translates programs written by people into instructions the machine can run". In CS 101 it's defined in the Lesson 2 sidebar and again in the history lesson, which now says how a compiler differs from an assembler and defines machine code. In MATH 120 it's defined in the history lesson and at CompCert, where GCC and LLVM are named as compilers.
56. Fibonacci growth: See 21. CS 101 now says 1.6ⁿ is the closer estimate and 2ⁿ an upper bound, and MATH 130's precalculus lesson gives the factor (about 1.6 per step) with a link to the explanation.
57. Float equality: The rule in CS 101, Lesson 2 now says what to do throughout the course. Compare float results with `math.isclose` unless you know they're exact. `==` is fine for ints, strings, and floats like `6 / 3 == 2` or `1 / 4 == 0.25`, which binary stores exactly; that covers the testing lesson's `mean([1, 2, 3]) == 2`. The one practice answer that compared a computed float with `==` is fixed (10). The programming-problem checker already compares floats with a small tolerance (`math.isclose`), so those tests never depend on the last digit.
