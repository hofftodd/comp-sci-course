# Student review: Year 1 Fall

*Round 5, run after seven long lessons were split in two. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited. Note added afterwards: item 14 came from `scripts/dump_course.js`, not from the pages students see. The pages number every core lesson ("Unit 4 of 14" and the numbered sidebar), but the dump's lesson headings showed only the id and title. The dump now shows the number too.*

I'm a first-year student. Before this term I had high-school algebra and trigonometry, and I had never programmed. This term I'm taking CS 101 Programming I, MATH 120 Discrete Mathematics I, MATH 130 Calculus I and CS 100 Computing in Society. I read each course's dump in order and tried every quiz and practice problem in my head. The items below are the places where I got stuck or confused.

### CS 101 Programming I

#### u1: Values, types and expressions

1. "Expression: Code that evaluates to a value, such as 2 + 3 or len(name)." The key terms use `len(name)`, but `len` hasn't appeared yet in this lesson or in Lesson 1. The next lesson introduces it, and `name` isn't defined anywhere here.

#### u2: Branching

2. "is_weekend = day == "Sat" or day == "Sun"". The example never defines `day`. Only `age` and `has_ticket` are set above it, so typing the snippet as shown gives a NameError, and I wasn't sure what `day` should be.

#### u5: Lists and tuples

3. "Q1. After a = [1, 2]; b = a; b += [3], what is a?" Semicolons between statements on one line are never explained. Every example so far has put one statement per line.
4. "return min(xs), max(xs)    # returns a tuple". The built-ins `min` and `max` are used here without being introduced. Earlier lessons only said "Don't use the built-in max". `sum` is also used without introduction: Recursion says "use a loop or the built-in sum", and Testing's `mean` uses `return sum(xs) / len(xs)`.

#### algo: Searching, sorting and efficiency

5. "This is the bisection idea from the branching lesson, applied to a list." Bisection wasn't in the Branching lesson. It was in Loops ("Searching with loops: guess-and-check and bisection"), and Loops itself says bisection "becomes binary search" in this lesson. I went back to Branching looking for it.
6. "start = time.perf_counter()". The `time` module and `perf_counter` are never explained. I can only guess that it returns a time in seconds. It isn't in the standard-library table in Files and modules either, and Practice 5 asks me to run this experiment.

### MATH 120 Discrete Mathematics I

#### u2: Predicates and quantifiers

7. "all(xs[i] <= xs[i + 1] for i in range(len(xs) - 1))". This lesson relies on generator expressions inside `all`/`any`, list indexing `xs[i]` and `range(len(xs) - 1)`. Practice 6 also asks me to write such expressions. In CS 101, list indexing comes in Lesson 8 and generator expressions in Lesson 7 (Strings). If MATH 120 Lesson 2 comes early in the term, I haven't seen this syntax yet. (blocking for P6 at that point in the term)

### MATH 130 Calculus I

#### pre: Functions: a precalculus review

8. "which is how populations, compound interest, and naive Fibonacci's running time grow (by a factor of about 1.6 per step; CS 101, Searching, sorting and efficiency explains why it is also listed as O(2ⁿ), an upper bound)". In the first calculus lesson I haven't met naive Fibonacci (CS 101 Recursion) or O-notation (CS 101 Searching, sorting and efficiency), so I couldn't follow this sentence.

#### u1: Limits

9. "Only the dominant terms matter for large inputs, which is exactly the reasoning behind big-O notation in CS 101." Big-O isn't taught until near the end of CS 101, so I have nothing to connect this to here.

#### u6: Riemann sums and antiderivatives

10. "Example: ∫₋₃⁻¹ (1/x) dx = ln |−1| − ln |−3| = −ln 3". This evaluates a definite integral by plugging the endpoints into an antiderivative and subtracting. The lesson's own introduction says the connection between antiderivatives and definite integrals (the Fundamental Theorem) is proved in the *next* lesson. So far this lesson only defines the definite integral as a limit of Riemann sums, and I didn't know I was allowed to do this.
11. "P2. Estimate ∫₀² x³ dx by hand with a left Riemann sum using 4 strips, then compute the exact value." I can do the left sum. For the exact value, the lesson only gives me the limit of Riemann sums with formulas for Σi, Σi² and Σc, and there's no formula for Σi³. Using the antiderivative x⁴/4 needs F(b) − F(a), which the next lesson introduces. (blocking)

### CS 100 Computing in Society

#### u1: A short history of computing

12. "Unix (1969) came out of that world." This lesson never says what Unix is, and "operating system" isn't explained either. The term also appears in the u2 table ("Operating Systems").
13. "In 2017 researchers at Google introduced the transformer ... and they became the basis of large language models." Neither "transformer" nor "large language model" is explained here. Lesson u2 describes "attention" as a step in a transformer but still doesn't say what a transformer is. Large language models are only described later, in u5 ("generate fluent text by predicting likely continuations").

### Across courses

14. The courses refer to lessons by number ("Lesson 2, Binary numbers, bits and bytes", "Lesson 5, for loops", "Lesson 14, 'Packages, pip and virtual environments'", "see Lesson 2" in MATH 130, "Lesson 4, Sets" in MATH 120), but the lesson headings in the text show only an id and a title, never a number. To find each reference I had to count the core lessons myself, and I wasn't sure whether optional lessons count.
15. Several MATH lessons depend on CS 101 material that I would only reach later if the courses run in parallel. MATH 120 Lesson 2 uses generator expressions and list indexing (item 7). MATH 130 Lessons 1 and 3 cite naive Fibonacci and big-O (items 8 and 9). MATH 130 Continuity's `bisect` and The derivative's `derivative` use `lambda` and passing functions as arguments (CS 101 Lesson 6). MATH 130 Limits P6 assumes I can already write a loop over powers of ten.

## Professor's response

Thank you. Every item led to a change except 14, which the dump script caused and which is already fixed. Three items (5, 10, 11) came from the recent lesson splits: a reference pointed to the wrong half, and two pieces of Lesson 11's material had stayed in Lesson 10. The other cross-course items (7, 8, 9, 15) are real for students taking the four courses in parallel. I fixed them in two ways. Where the MATH lesson needs a piece of Python, it now explains that piece briefly where it is used. Where it only mentions a CS 101 idea in passing, the mention is now a forward pointer that you don't need to understand yet. No item rested on a misreading. Every number and code output I added was checked by running Python 3. No programming problem's tests, starter or solution changed; one prompt gained a parenthesis.

### CS 101 Programming I

1. u1, key terms: The example is now `7 // 2 * 10`, which uses only this lesson's operators. `len` is no longer mentioned there.
2. u2, and/or/not: The example now sets `day = "Sun"` before using it, and the comment gives the result, `True`.
3. u5, Quiz 1: Rewritten without semicolons: "After these three lines run in order: `a = [1, 2]`, then `b = a`, then `b += [3]`". This was the only place in the Fall courses that put two statements on one line.
4. u5, Lists: `sum`, `min` and `max` are now introduced in the first code example (`sum(scores)` is 262, `min` 79, `max` 95), with a paragraph saying `min` and `max` also take separate values (`max(3, 8, 5)` is 8). It also says why earlier problems banned them and that from here on you may use them. The two earlier problems that ban `max` (Loops and Functions) now say in a few words what the built-in does, and the "Largest of three" programming problem says you'll meet `max` and `sorted` in the Lists lesson.
5. algo, binary search: Now points to Lesson 5, Loops, and its section "Searching with loops: guess-and-check and bisection", with a link.
6. algo, hash tables: A new paragraph explains `time.perf_counter()`: it returns seconds counted from a fixed starting point that means nothing alone, so you read it before and after the code and subtract. `time` is also added to the standard-library table in Files and modules.

### MATH 120 Discrete Mathematics I

7. u2, quantifiers in Python: A note right after the first `all`/`any` example now reads the Python in plain words: what a list is, what `s >= 60 for s in scores` means inside `all(...)`, what `all` and `any` return, `len(xs)`, `xs[i]` counting from 0, and `range(n)` and `range(a, b)`. That is everything Practice 6 needs, so you can start it in week 2.

### MATH 130 Calculus I

8. pre, exponential functions: The sentence about naive Fibonacci and O(2ⁿ) is gone. It now says exponentials describe populations and compound interest, and that CS 101's Recursion lesson will later show a program whose running time grows this way. You don't need that program to follow the lesson.
9. u1, limits at infinity: Now a forward pointer: near the end of the term CS 101 uses the same idea, under the name big-O notation, to compare how programs slow down as inputs grow. In rates (Lesson 9), the O(log n) < O(n) < O(n²) < O(2ⁿ) sentence now links to the CS 101 lesson and says in one line what O(g(n)) means.
10. u6, why ln |x|: The definite-integral example ∫₋₃⁻¹ (1/x) dx = −ln 3 ≈ −1.0986 has moved to the Fundamental Theorem lesson's examples, where F(b) − F(a) has been taught. Lesson 10 now ends the argument with the antiderivative only: ∫ (1/x) dx = ln |x| + C on any interval not containing 0.
11. u6, Practice 2: **Blocking item fixed.** Lesson 10 now has a worked example that finds ∫₀¹ x² dx exactly as a limit of right-endpoint sums. It pulls out 1/n³ and uses the Σi² formula to get (n + 1)(2n + 1)/(6n²) → 1/3 (0.44 for n = 5, 0.3338335 for n = 1000). Practice 2 now uses x² on [0, 2] instead of x³, so the lesson's own formulas give the exact value. A hint was added. The answer is: left sum 1.75, exact value 8/3 (n = 4 gives 3.75, n = 1000 gives 2.670668), and the left sum is too small because x² is increasing.

### CS 100 Computing in Society

12. u1, time-sharing: Unix is now introduced as an operating system, which is defined: the program that runs a computer for everything else, sharing out the processor, memory and files among users and programs. Linux and macOS are named as its descendants. This also covers "Operating Systems" in the u2 table.
13. u1, AI: The transformer is now defined where it first appears: a kind of neural network (taught in the paragraph before) built for sequences such as text, which weighs how much every other word in a passage matters to each word. A large language model (LLM) is defined too: a very large transformer trained on huge amounts of text to predict the next word, so it can generate fluent text one word at a time.

### Across courses

14. Lesson numbers: This came from `scripts/dump_course.js`, not from the pages, which have always numbered core lessons ("Unit 4 of 14" and the numbered sidebar). The dump now shows each lesson's number in its heading, so references such as "Lesson 5" can be found directly. Optional lessons are not numbered and don't count.
15. CS 101 material in MATH lessons: For MATH 120 Lesson 2, see 7. For MATH 130 Lessons 1 and 3, see 8 and 9. Continuity (Lesson 4) now has a plain-words note after `bisect` covering `def` and `return`, `while`, passing a function as an input (`f(mid)` calls it) and `lambda`. The default-argument parenthesis there now says what `tol=1e-10` does, rather than only naming the CS 101 lesson. The derivative (Lesson 5) refers back to that note and explains why `math.sin` is passed without parentheses. Limits (Lesson 3) explains the `for h in [...]` loop in the sin(h)/h example in one sentence, and Practice 6 has a new hint that shows `for k in range(1, 13):` and `x = 10 ** -k`, so you can start it before CS 101's Loops lesson.
