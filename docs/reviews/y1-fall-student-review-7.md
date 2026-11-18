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

## Professor's response

Thank you. Every item led to a change. The two blocking items (12 and 16) were real: both WRIT 100 exercises assumed CS 101 material from later in the term, and each problem now explains, in a few sentences, everything it needs. Items 7 to 9 in MATH 130 were fair criticism of how the lessons described their own reasoning: Lesson 6 said it proved every rule from the definition when it didn't, and Lesson 9 didn't say that one of its rows assumed what it was computing. Item 15 came from the dump, which doesn't print course policies (see the note at the top), but the lesson now states the relevant policy itself. No item rested on a misreading. Every number I added was checked by running Python 3. No programming problem changed.

### CS 101 Programming I

1. u0, quotes in the console: A new paragraph after the console example explains the difference. When the console shows the value of a string, it puts quotes around it so you can see it is text (and see spaces at its ends); the quotes are not part of the value, and `'Hello, world'` has 12 characters, none of them quote marks. `print` writes the text itself, for a person to read, so no quotes appear. It also says that later lessons show values in comments the console's way, as in `# 'abab'`.

### MATH 120 Discrete Mathematics I

2. u2, bound variable: The notes now explain it after the two quantifiers are introduced. In ∀x P(x), the quantifier binds x: x is a placeholder the quantifier runs through the whole domain, so ∀x P(x) and ∀y P(y) say the same thing. A variable no quantifier binds, like the x in P(x) on its own, is free, and a statement with a free variable is still a predicate with no truth value. The key term now says the same, in place of "attached".
3. u2, `sum(1 for x in xs if P(x))`: The sentence now reads the code: `1 for x in xs if P(x)` produces a 1 for each x that passes the test and nothing for the others, `sum` adds those 1s, so the total is the number of items that satisfy P, and the test asks whether that number is exactly 1. (Checked on a small list: the "exactly one even prime" version gives `True`.)

### MATH 130 Calculus I

4. pre, ln: Its first mention now says what it is and where it is defined: "ln x (the natural logarithm, defined later in this lesson) needs x > 0".
5. trig, sin² θ: The sentence now says that sin² θ means (sin θ)², that a small 2 after a trigonometric function is a power, and that the −1 in sin⁻¹ is the one exception, explained below.
6. u1, the sin x / x argument: The section now has a figure: a quarter of the unit circle with O, A, P and T labelled, the outlined triangle OAP, the shaded sector, and the larger triangle OAT reaching up the dashed tangent line at A, with the heights sin x and tan x marked. A new paragraph says why each region lies inside the next: triangle OAP is cut off by the chord AP, which lies inside the circle, so it is inside the sector; the whole circle lies to the left of the tangent line at A, and the arc lies between the sides OA and OT, so the sector is inside triangle OAT. Then the step is spelled out: a region inside another has no more area, so ½ sin x ≤ ½x ≤ ½ tan x, and multiplying by 2 gives sin x ≤ x ≤ tan x.
7. u4, what is proved: You were right that the lesson claimed more than it did. The opening now says that most rules are proved in the lesson, and that those only stated there say where their proof is. A new "Where these come from" list proves the constant, constant-multiple and sum rules from the difference quotient and the limit laws, and the power rule for whole numbers n ≥ 1 by multiplying out (x + h)ⁿ (with (x + h)³ = x³ + 3x²h + 3xh² + h³ as an example). The product rule now has a proof after the rectangle picture: add and subtract f(x)g(x + h), and use the fact from Lesson 5 that a differentiable function is continuous. The quotient rule is now derived from the product rule, writing f = q · g; the lesson says plainly that this assumes q has a derivative, which a complete proof also checks. A new paragraph after the quotient rule uses it to prove the power rule for negative whole numbers. For any real n, the proof needs the chain rule, so the chain-rule lesson now has a new item: x^n = e^(n ln x), so (x^n)′ = e^(n ln x) · n/x = n x^(n−1) for x > 0, "which completes the power rule stated in the previous lesson."
8. u4, angle-addition formulas: Lesson 2 now states both formulas, sin(a + b) = sin a cos b + cos a sin b and cos(a + b) = cos a cos b − sin a sin b. It says honestly that the course states them without proof (the proof is a geometric argument in any precalculus text), checks them on the table with a = π/6 and b = π/3 (giving 1 and 0, which are sin(π/2) and cos(π/2)), and says they are needed in Lesson 6. Lesson 6 now points back to Lesson 2 for both. (I also checked both identities numerically at random angles; the differences are about 10⁻¹⁶, rounding error.)
9. rates, the L'Hôpital row for sin x / x: You were right that it would be circular as a proof. A new paragraph after the table says the first two rows are only consistency checks, not proofs: Lesson 6 used these very limits to find that sin′ = cos and (eˣ)′ = eˣ, so computing them with those derivatives would be circular reasoning. They only show that the rule agrees with what we already know. (The row for (eˣ − 1)/x has the same problem, so the note covers both.)

### CS 100 Computing in Society

10. Risk scores, the fairness table: Both error-rate rows now describe the people by what actually happened, matching the worked example. Equal false-positive rates: "In every group, people who did *not* reoffend are equally likely to be wrongly labeled high risk." Equal false-negative rates: "In every group, people who *did* reoffend are equally likely to be wrongly labeled low risk (missed)." The phrase "high-risk people" is gone.
11. Hidden history, ENIAC programmers: Each term is now explained where it appears: debugging is finding and fixing mistakes in programs; a breakpoint is a chosen spot where the machine pauses so the programmer can inspect what it has done so far; COBOL is an early programming language for business records; and sorting means putting records in order, for example by name or date.

### WRIT 100 Writing for Technical Audiences

12. w4, Practice 2: **Blocking item fixed.** The problem now begins with what you need to know about memory: a long row of numbered storage cells, each always holding one small number; a cell's number in the row is its address; reading a cell copies the value out and leaves it in place; writing replaces the old value. That is enough to see where the library analogy helps (one address, one location) and where it breaks (a cell is never empty, writing replaces rather than adds, reading removes nothing), which is what the model answer says.
13. w4, Practice 4: The problem now explains the units: 1 TB is 1,000 GB or 1,000,000 MB; 1 ms is a thousandth of a second; 1 MWh is 1,000 kWh, the kilowatt-hours on a home electricity bill, and a 1,000-watt microwave running for an hour uses 1 kWh. (The model answer's 2 TB ÷ 4 MB = 500,000 photos and 1,000 MWh ÷ 10 MWh = 100 homes, checked.)
14. w6, "merged": The code review section now starts by explaining it: on a team, a programmer usually makes a change in a separate copy of the project (a branch) and then asks for it to be added to the main version; adding it is called merging. So the "proposed change" lives on the branch until it is merged.
15. w9, the course policies: The lesson now states the policy itself: the course policy on AI assistants (on the course page) allows them for brainstorming, feedback on a draft and grammar checks, and requires you to say how you used them. The closing sentence now gives an example of such a statement: "I asked an AI tool which parts of my draft were unclear, and rewrote the second paragraph myself."

### Across courses

16. WRIT 100 Lesson 4, Practice 3: **Blocking item fixed.** The problem now explains binary search completely in a few sentences. It keeps two positions, low and high, the first and last positions where the item could still be, starting with the whole list. Each step looks at the middle position, halfway between them and rounded down. If the item there is the one sought, it stops; if the sought item is larger, low becomes middle + 1; if smaller, high becomes middle − 1. It says that this is all you need and that CS 101 covers it later in the term. (The model answer's three steps, 0/9/4, 5/9/7 and 5/6/5, checked by running the search.)
17. WRIT 100 pointers to CS 101 Lesson 14: Each one now explains what it needs in place, and the CS 101 reference is only a pointer for later. Lesson 1 now says what a README is (the file that introduces a project: what it is and how to use it) and a commit message at their first mention, and, beside the reader "who has never used Git", that Git is a tool that records the history of a project's files, that you don't need it for this course, and that CS 101 teaches it in its last lesson. The Lesson 2 exercise about Git commits now says that a commit is a saved snapshot of a project's files and that you need nothing more. Lesson 5 explains "repository" and says why a license matters: without one, copyright law gives others no permission to copy, change or share the code. The CS 101 sidebar is now just a pointer. Lesson 6 explains Git and commits in a sentence and says what `git log` and `git blame` do, so it no longer depends on CS 101.
18. MATH 130 Continuity, the note on 1/x²: It now uses MATH 130's own definition from Lesson 1 (a formula's domain is every real number for which it makes sense), so its domain is all real numbers except 0. It no longer depends on where MATH 120 is.
19. Two meanings of "range": There is now a short note in each of the four places where the meanings meet. CS 101 Loops, where `range` is introduced, says that in math courses the range of a function is its set of outputs, a different idea that shares the name. MATH 120 Lesson 2's "Reading the Python" note says that this Python `range` is not the range of a function, which Lesson 5 defines. MATH 120 Lesson 5 and MATH 130 Lesson 1, where the range of a function is defined, each say it is not Python's `range(n)`. I also changed "the inner quantifier's range" in MATH 120 Lesson 2 to "the set the inner quantifier runs over", so "range" there no longer carries a third meaning.
