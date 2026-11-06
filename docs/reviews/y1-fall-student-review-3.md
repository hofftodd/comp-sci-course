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
