# Student review: Year 1 Fall

*Round 7. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited. Note added afterwards: item 15 comes from what the text dump includes, not from the pages. Each course page opens with its rubric and policies, but `scripts/dump_course.js` prints only lessons, so the student couldn't see WRIT 100's policies.*

I'm a first-year student. Before this term I'd done high-school algebra and trigonometry and had never programmed. I read all five course dumps (CS 101, MATH 120, MATH 130, CS 100, WRIT 100) in lesson order and tried each quiz and practice problem in my head as I went. Most lessons explained their terms before using them, so this list is short. It covers only the places where I actually got stuck or was confused.

### CS 101 Programming I

#### u0: Getting set up and your first program

1. "`>>> "Hello, " + "world"` / `'Hello, world'` ... `>>> print("Hello, world")` / `Hello, world`". The console shows the first result with quotes around it and the second without, and the lesson never says why. Later lessons keep showing results as `'...'` in comments, and I couldn't tell whether the quotes are part of the value or just how the console displays it.

### MATH 120 Discrete Mathematics I

#### u2: Predicates and quantifiers

2. "Bound variable: A variable attached to a quantifier." This is in the key terms, but the notes never use the phrase or explain what "attached" means. I don't know what a variable that isn't bound would be.
3. "In Python over a finite list: sum(1 for x in xs if P(x)) == 1." The "Reading the Python" note covers `all`, `any`, lists, `len`, indexing and `range`, but not `sum` or the form `1 for x in xs if P(x)`. I couldn't tell how adding up 1s counts the matching items.

### MATH 130 Calculus I

#### pre: Functions: a precalculus review

4. "the logarithm of a non-positive one: √(x − 2) needs x ≥ 2, and ln x needs x > 0." This is the first time "ln" appears, and it isn't defined until the section on exponentials and logarithms later in the lesson ("The natural logarithm ln x is log_e x"). On first reading I didn't know what ln was.

#### trig: Trigonometry, inverse functions and transformations

5. "the identity sin² θ + cos² θ = 1". The notation sin² θ is never explained. Later the lesson says sin⁻¹ x "means 'inverse function', not a power". So I wasn't sure whether the small 2 is a power, meaning (sin θ)², or something else.

#### u1: Limits

6. "the larger triangle OAT, where T is the point at which side OP, extended, meets the vertical tangent line at A." The argument for lim (sin x)/x = 1 depends on three nested shapes (triangle OAP, sector OAP, triangle OAT), but this section has no figure. I couldn't picture where T is, or why each region sits inside the next, so I couldn't check "So sin x ≤ x ≤ tan x."

#### u4: Differentiation rules

7. "Instead, we prove a small set of rules once, from the definition, and then combine them." Then the table states "(xⁿ)′ = nxⁿ⁻¹, for any real n" without proof. The lesson before only worked out n = 2, −1 and ½. The quotient rule is also stated without any derivation, and the product rule only gets the rectangle picture. I couldn't tell which rules had actually been proved.
8. "The first is the angle-addition formula from trigonometry, sin(x + h) = sin x cos h + cos x sin h." The trigonometry review in Lesson 2 doesn't include angle-addition formulas, and neither does the cos(x + h) formula used right after it. I would have to take both on trust.

#### rates: Related rates, approximation and L'Hôpital's rule

9. "lim_(x→0) sin x / x | 0/0 | lim cos x / 1 | 1". In Differentiation rules, the fact that sin′ = cos was derived from this same limit, lim (sin h)/h = 1. Now L'Hôpital uses sin′ = cos to compute that limit. It looks like circular reasoning to me, and the lesson doesn't say whether this row counts as a proof or only a check.

### CS 100 Computing in Society

#### Optional lesson: Case study: risk scores and the math of fairness

10. In the table, "Equal false-negative rates | Every group's high-risk people are equally likely to be caught". The worked example defined the false-negative rate as "the share of people who did reoffend but were labeled low risk". This row says "high-risk people", and I mixed it up with "people labeled high risk". I wasn't sure which group the row means.

#### Optional lesson: The hidden history of computing

11. "They developed techniques such as breakpoints for debugging. Betty Snyder Holberton later helped design COBOL and early sorting software." Breakpoints, debugging, COBOL and sorting software aren't explained here or anywhere earlier in CS 100. COBOL only appears in an optional CS 101 lesson, and breakpoints come in CS 101's testing lesson near the end of the term.

### WRIT 100 Writing for Technical Audiences

#### w4: Explaining technical ideas

12. "P2. ... 'a computer's memory is like a library, and an address is like a shelf number.' Name one way this analogy helps and one place it breaks". No course has explained what a memory address is. It's only mentioned in passing in a CS 101 sidebar ("an array name is a memory address"). I can't say where the analogy breaks without knowing how memory and addresses actually work. (blocking)
13. "P4. ... (c) training a large AI model used about 1,000 MWh of electricity." The unit MWh (and, to a lesser degree, TB) is never explained. To give a comparison a general reader can picture, I would first need to know how much energy a MWh is.

#### w6: Writing in a software team

14. "In a code review, a teammate reads a proposed change before it is merged". "Merged" isn't explained. CS 101's Git lesson covers add, commit, push, pull and clone, but not merging, so I didn't know what "merged" means or where a "proposed change" lives before that.

#### w9: Revising, feedback and AI tools

15. "In this course, the ideas, structure and sentences must be your own (see the course policies)." The course policies aren't in the course text, so I can't check what they allow. The same goes for "as the course policy requires" at the end of the AI section.

### Across courses

16. WRIT 100 Lesson 4, P3: "Write a worked example of binary search for 23 in the sorted list ... Show the low, high and middle positions at each step". Binary search, with its low/high/mid updates, is taught in CS 101 Lesson 13, almost the last lesson. WRIT 100's Lesson 4 is less than halfway through its term. The only explanation in WRIT 100 is "checks the middle item and throws away half the list each step", which doesn't say how low and high change. (blocking)
17. WRIT 100 Lesson 5: "(CS 101's sidebar on licenses explains why this matters)". WRIT 100 Lesson 6: "a tool like git log (from CS 101, which lists past commits with their messages)". Both point to CS 101 Lesson 14, the last lesson of that course. When I reach WRIT 100 Lessons 5 and 6 I won't have seen it yet. WRIT 100 Lesson 1, P2 and Q2 also talk about Git and READMEs as if they were familiar.
18. MATH 130 Continuity: "in the sense of MATH 120, Functions it is a function on all real numbers except 0, not on ℝ." MATH 130's Continuity lesson is Lesson 4 of 11, but MATH 120's Functions and relations is Lesson 5 of 6. So the note relies on a definition (domain and codomain as part of what a function is) that I probably won't have reached in MATH 120 yet.
19. "range" means different things in different courses. In CS 101 and in MATH 120's Python notes it means Python's `range(n)`, the numbers 0 to n − 1. In MATH 120 Functions and MATH 130 Lesson 1 it means a function's set of outputs. MATH 120 Lesson 2 uses `range(len(xs) - 1)` in code right next to math about domains. No course points out the two meanings, and I had to stop each time to work out which one was meant.
