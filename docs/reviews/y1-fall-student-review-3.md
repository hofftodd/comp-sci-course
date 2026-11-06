# Student review: Year 1 Fall

*Round 3. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a first-year student. Before this term I had high-school algebra and trigonometry, and I had never programmed. I read CS 101, MATH 120, MATH 130 and CS 100 in order, lesson by lesson, and tried each quiz and practice problem in my head. In what follows, "earlier" means earlier in the same course or in a course listed above it. I've marked "(blocking)" the places where I couldn't answer a question or start a problem from the lessons alone.

### CS 101 Programming I

#### u2: Branching and iteration

1. "Use .lower() on both sides when case shouldn't matter." The dot-method style (`value.method()`) isn't explained until the Strings lesson. Here I don't know what `.lower()` is or how to attach it to a string.

#### str: Strings

2. CODE initials: "Extra spaces between words shouldn't matter." The `split()` row in the methods table only shows single spaces ("to be or not"). The lesson never says what `split()` does when there are several spaces in a row, so I can't tell whether my answer will handle them.

#### u5: Lists, tuples, dictionaries and sets

3. "g3 = [row.copy() for row in grid]   # copy each row too". This square-bracket form with `for` inside appears in "Copying a list of lists", but list comprehensions are only introduced in the next section, "Building lists and comprehensions". At this point I couldn't read the line.
4. "Since Python 3.7, the language guarantees that a dict iterates its keys in the order they were inserted. Before 3.6 the order looked random." This skips Python 3.6. I can't tell what the order was in 3.6, or why the two version numbers differ.

#### u4: Recursion

5. "\"Wraps\" means that the new function sits around the old one." The word "wraps" is not used anywhere before this sentence. The sentence defines a word I was never shown, so I wasn't sure which part of the `@cache` explanation it refers to.

#### u6: Testing, debugging and exceptions

6. CODE last_n: "This function should return the last n items of a list, but it has a bug. Find it with the tests, then fix it." The prompt doesn't show the function or the tests it mentions. I had to guess that it means the `last_n` code from P5, and I don't know which tests are meant.

#### files: Files and modules

7. P4: "Use collections.Counter to print the ten most common words in a text file". The only place Counter appears is one table cell: `Counter("banana").most_common(1)`. The lesson never says what a Counter is, whether you can pass it a list of words instead of a string, or what `most_common` returns for other numbers.

#### u7: Version control and the programmer's toolkit

8. "the __pycache__ folder Python creates". I don't know what this folder is or why Python makes it. It's only explained in the optional "How Python actually runs your code" lesson, which comes after this one.
9. "Never commit passwords or API keys." "API" is never defined, so I don't know what an API key is.
10. P2: "Untracked files: draft.py". The lesson explains staged and unstaged changes but never says what "untracked" means. I can't fully explain this `git status` output.

#### lang: How programming languages evolved

11. "garbage collection, so programmers no longer had to free memory by hand" and "memory-safety errors, the kind C and C++ allow". The course never says what freeing memory means or what a memory-safety error is. Q3 ("Memory safety without a garbage collector") can only be answered by matching the words.
12. Family tree: "closures and garbage collection in Python, JavaScript, Java", and "Garbage collection, closures and type inference existed for decades". "Closure" is never defined.
13. "null safety", "easy concurrency" and "optional type hints". None of these terms is explained.
14. Q4 asks which family "Python's block structure and lexical scope ultimately descend from", and the answer is ALGOL 60. But the u2 sidebar says, "Python uses indentation instead, an idea it inherited from ABC". I can't tell whether Python's block structure comes from ALGOL or from ABC.

#### ethics: When software fails people

15. "One bug was a race condition". "Race condition" is never defined, here or in the u6 sidebar that also mentions it. The example of operators typing quickly hints at the meaning but doesn't explain it.
16. "a 24-bit fixed-point value of 0.1 ... with the binary point always in the same place. 0.1 cannot be written exactly in binary (its binary digits repeat forever, 0.000110011001100…)". Lesson 2 only showed whole numbers in binary. I don't know how digits after a "binary point" work, so I can't see where 0.000110011… comes from.

### MATH 120 Discrete Mathematics I

#### history: From Boole to Shannon

17. "any consistent formal system strong enough for arithmetic contains true statements it cannot prove". I don't know what "consistent" or "formal system" mean here.

#### deep: Proof assistants and verified software

18. "| succ k ih => exact congrArg Nat.succ ih". The text matches "zero" to the base case and "succ k" to the inductive step. It never says what "succ" means (I guess "successor", meaning k + 1), or what `rfl`, `exact` and `congrArg` do, so I can't follow the second proof.

### MATH 130 Calculus I

#### pre: Functions: a precalculus review

19. "The most important base is e ≈ 2.71828, for reasons you'll see when we differentiate: eˣ is its own derivative." e is only given as a decimal. It is never defined, and the later lessons state (eˣ)′ = eˣ without ever showing why it's true (see item 23).

#### u1: Limits

20. "multiply top and bottom by the conjugate √(x + 4) + 2". The word "conjugate" isn't defined. I had to guess from this one example what the conjugate of a general expression would be. I need that for Q4 and for P1(c).

#### u2: Continuity

21. P5 (the hiker): "Show there's a point on the path that she passes at the same time of day on both days." The lesson only uses the IVT on a single function that is already in the form f(x) = 0. It never shows how to build the function for a situation like this, with two different trips. (blocking)

#### u4: Differentiation rules

22. "The derivative of sin x comes from the definition together with the limit lim (sin h)/h = 1 from Lesson 2". The derivation isn't shown. When I tried it myself I needed a formula for sin(x + h) and the value of lim (cos h − 1)/h. Neither is in the precalculus review or the limits lesson, so I couldn't follow the step.
23. "eˣ | eˣ | Its own derivative; this is what makes e special". This is stated but never derived. The derivations for aˣ and ln x at the end of the lesson both depend on it, so their starting point is unexplained.

#### history: Two thousand years of calculus

24. "1 + ¼ + 1/16 + 1/64 + ⋯, whose total is 4/3". The lesson doesn't explain how an endless sum can have a total, or how to get 4/3.

### CS 100 Computing in Society

#### u1: A short history of computing

25. "shared large computers through time-sharing terminals" and "demonstrated the mouse, on-screen windows and hypertext links". "Time-sharing", "terminal" in this sense, and "hypertext" are not explained.
26. "It had real successes, such as expert systems in the 1980s". "Expert system" isn't defined. I can't tell how it differs from the "explicit rules and logic" mentioned just before it.

#### u2: The map of computer science

27. "data (training corpora)". "Corpora" isn't defined.

#### u5: AI in society

28. Q1: "What was a main cause of the accuracy gaps found in Gender Shades?", with the answer "Unrepresentative training and benchmark data". The lesson describes the gaps but never says what caused them, and "benchmark data" is never mentioned or defined. I answered by elimination, not from the lesson.

#### u6: Accessibility and inclusive design

29. "If a button was built from a plain div with a click handler, Tab skips right over it, and if the page hides the focus outline for looks". This comes before the section that explains what a div and onclick are. "Click handler" and "focus outline" are never defined at all.
30. "meet WCAG 2.1 at level AA". The lesson doesn't say what "level AA" means or what the other levels are.

### Across courses

31. MATH 130 u2 says "1/x on [−1, 1] has no maximum because it isn't continuous at 0", and its Q4 asks about applying the IVT to 1/x on [−1, 1]. MATH 120 u5 says "A rule that gives some input no output, like 1/x on ℝ (nothing at 0), isn't a function on that domain." If 1/x isn't even a function on [−1, 1], I don't see how it can be "not continuous at 0" there.
32. CS 101 u1 says a float holds "about 15 to 17 significant digits". MATH 130 (u1 P6 and u3 Numerical derivatives) says it "keeps only about 16 significant digits" and "keeps about 16 significant digits". The ranges differ, and I couldn't tell which figure to use when reasoning about rounding error in MATH 130 u1 P6 and u3 P7.

## Professor's response

Thank you for a precise review. Every item led to a change except where a line says otherwise. Five items found real inconsistencies, now fixed: block structure credited to both ALGOL 60 and ABC (14), 1/x called "not continuous at 0" on an interval where it isn't even a function (31), two different figures for a float's significant digits (32), a sidebar that skipped Python 3.6 (4), and a quiz answer the lesson didn't support (28). The blocking item (21) now has a worked example that teaches the difference-function recipe step by step, and the hiker's answer follows it. One item partly rested on a misreading (6, explained in its line), but the prompt was still too thin. Every number and code output I added was checked by running Python 3. No programming problem's tests, starter or solution changed.

### CS 101 Programming I

1. u2, Comparisons: Now shows `"Zebra".lower()` giving `"zebra"` and the case-insensitive comparison giving `False`, and says in one sentence that `.lower()` after a value calls a *method*, with a pointer to the Strings lesson.
2. str, String methods: The `split()` row now says that with no argument it splits at any run of spaces, tabs or new lines and ignores them at the ends: `"  to   be ".split()` is `['to', 'be']`.
3. u5, Copying a list of lists: Added a sentence after the code: the `g3` line is a list comprehension, explained in the next section, and it means the same as an empty list plus a `for` loop that appends `row.copy()`.
4. u5 sidebar "Dictionaries remember insertion order": **Inaccuracy fixed.** Now says: up to 3.5 the order looked random; 3.6 (2016) kept insertion order as a side effect of a more compact design, not yet a promise; 3.7 (2018) made it an official rule.
5. u4, Memoization: Removed the stray definition of "wraps". The sentence now just says `cache` returns a new function that sits around the old one, like a wrapper.
6. u6, CODE last_n: The prompt now shows the buggy function, says it's the one from Practice 5, and lists the four tests with their expected results. (A partial misreading: the function is preloaded in the editor and the tests run when you press Check, but the prompt didn't say so, and the extraction doesn't show the starter.)
7. files, The standard library: Added a short paragraph and example on `Counter`: it counts any sequence, including a list of words; `most_common(k)` returns the top k `(item, count)` tuples; a missing item counts as 0.
8. u7, .gitignore: `__pycache__` is now explained where it's named: Python stores translated copies of imported modules there to load faster, and rebuilds them automatically.
9. u7, GitHub and remotes: Defined API (a set of functions one program offers others, often over the internet) and API key (a secret code, like a password, identifying your program to a service).
10. u7, The three places: Added a paragraph defining *tracked* and *untracked* files, and the `git status` comment now mentions untracked files. Practice 2 can now be fully explained.
11. lang (optional): Garbage collection now explains what freeing memory means and what goes wrong without it. Memory-safety errors are defined with an example: in C, `a[10]` on a 10-item array reads whatever comes next, where Python raises `IndexError`.
12. lang (optional), family tree: Closures are glossed in the table (functions that remember variables from where they were defined), with a note that CS 102 teaches them.
13. lang (optional): Glossed concurrency, null safety (using Python's `None` as the example) and type hints (with a one-line example), and added "You don't need any of these terms yet."
14. u2 sidebar, lang lesson and its Quiz 4: **Contradiction fixed.** Both claims were partly right. ALGOL 60 gave Python nested blocks and lexical scope; ABC gave Python indentation as the way to *mark* blocks. The sidebar and the ALGOL bullet (which now says ALGOL used `begin` and `end`) say this. The quiz now asks where the blocks and scope come from, not the indentation, and its explanation separates the two.
15. ethics (optional) and u6 sidebar: *Race condition* is defined at both places (a bug whose result depends on which of two simultaneous activities finishes first), and the Therac-25 account now says what raced: the setup routine and the keyboard reader.
16. ethics (optional), Patriot: Added binary fractions in brief: places worth ½, ¼, ⅛, …, so 0.11 is 0.75, and the doubling method that produces 0.000110011… for 0.1 (1/16 + 1/32 = 0.09375 already).

### MATH 120 Discrete Mathematics I

17. history (optional), Gödel: Added a parenthesis defining a formal system (axioms plus mechanical rules) and consistency (never proving a statement and its negation).
18. deep (optional), Lean proof: Explained `Nat.succ k` as k + 1 and what `rfl`, `congrArg Nat.succ ih` and `exact` do, step by step through the goal 0 + (k + 1) = k + 1, with a note that you don't need to learn Lean's commands.

### MATH 130 Calculus I

19. pre, Exponential functions: e is now defined: the base whose graph has slope exactly 1 at (0, 1). It includes a numerical check: (bʰ − 1)/h at h = 0.000001 is 0.693… for 2, 1.0986… for 3, and 1.0000005 for 2.718281828. It also says that this is why (eˣ)′ = eˣ, linking to the derivation (23).
20. u1, Rationalize: Defined *conjugate* (a − b and a + b, product a² − b², which squares a root away) and noted it works for a root in the denominator too, like √x − 2 in Practice 1(c).
21. u2, The Intermediate Value Theorem: **Blocking item.** New worked example, "comparing two quantities": two towns' temperatures from 6:00 to 14:00, solved in four labeled steps (name both as functions of time, subtract, check signs at the ends, apply the IVT and translate back). The hiker's hint and answer now follow those steps. The answer now uses distance along the path instead of height, since a path that goes up and down can reach the same height at two places.
22. u4: The derivation of (sin x)′ = cos x is now written out: the angle-addition formula, the companion limit (cos h − 1)/h → 0 (proved with the conjugate cos h + 1), and the split of the difference quotient. A sentence covers cos x the same way.
23. u4: New paragraph "Why eˣ is its own derivative": (eˣ⁺ʰ − eˣ)/h = eˣ · (eʰ − 1)/h, and the second factor → 1 by the definition of e in Lesson 1 (checked numerically in Lesson 2, Practice 6). The aˣ and ln x derivations now rest on a stated fact.
24. history (optional): Explained what the total of an endless sum means (the number the running sums 1, 1.25, 1.3125, … approach) and how to get 4/3 (S/4 = S − 1).

### CS 100 Computing in Society

25. u1, A short history: Defined time-sharing, terminal (a keyboard with a printer or screen wired to a distant computer) and hypertext.
26. u1, AI: Expert systems are glossed as programs of hundreds or thousands of if-then rules gathered by interviewing human experts, so they are one kind of the rule-based AI just described.
27. u2: Defined *corpora* (huge collections of text a model learns from; Latin *corpus*, "body").
28. u5, Gender Shades: **Quiz now supported.** The lesson now says the researchers pointed to data as a main cause. It defines training data and *benchmarks* (standard test collections) and says the two widely used benchmarks they examined were about 80% and 86% lighter-skinned, which is why the study built its own balanced test set.
29. u6, Four students: Glossed div (with a pointer to the section below), click handler and focus outline where Daniel's example uses them.
30. u6, POUR: Explained WCAG's three levels: A is the minimum, AA is the usual target (for example color contrast) and AAA is the strictest. Meeting AA means meeting every A and AA requirement.

### Across courses

31. MATH 130 u2 and MATH 120 u5: **Inconsistency fixed.** You were right. MATH 130 now has a short "note on wording" after the kinds of discontinuity: 1/x² is a function on the reals except 0, continuous on that domain, and "discontinuity at 0" only means 0 is a gap where the first condition of continuity fails. The EVT sentence now says 1/x has no value at 0, so it isn't a function on all of [−1, 1], and on [−1, 1] without 0 it has no maximum. Quiz 4 now says "defined for x ≠ 0", and its answer reads "f has no value at 0, so it isn't continuous on [−1, 1]".
32. CS 101 u1 and MATH 130: **Made consistent.** CS 101 now says "about 16 significant digits", the figure MATH 130 uses. A parenthesis explains where the 15 and 17 come from (53 bits of digits, 2⁵³ ≈ 9.0 × 10¹⁵; any 15-digit decimal survives, and 17 digits always suffice to write a float exactly) and says to use 16 in both courses.
