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
