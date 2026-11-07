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
