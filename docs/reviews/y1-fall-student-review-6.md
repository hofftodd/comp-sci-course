# Student review: Year 1 Fall

*Round 6, the first to include WRIT 100. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a first-year student. Before this term I had high-school algebra and trigonometry and had never programmed. I read CS 101, MATH 120, MATH 130, CS 100 and WRIT 100 from the course dumps. I went through each lesson in order and tried every quiz question and practice problem in my head. Most of it I could follow. The items below are the places where I got stuck, was confused, or found two things that seemed to disagree.

### CS 101 Programming I

#### u0: Getting set up and your first program

1. "In the terminal, make the folder once: mkdir cs101." … "Thonny: … choose File → Save as…, browse to cs101". The lesson never says which folder the terminal starts in. So I don't know where `mkdir cs101` put the folder, or where to browse to in Thonny's Save dialog.

#### u1: Values, types and expressions

2. "For instance, float(9007199254740993) comes back as 9007199254740992.0." `float(...)` used as a function that converts a value hasn't been shown yet. It only appears in the next lesson's conversion table, so I wasn't sure what this call does.

#### u3: Functions and abstraction

3. "if f(lo) * f(mid) <= 0:   # sign change in the left half". CS 101 doesn't explain why a product of zero or less means a sign change. I had to work out for myself that a negative times a positive is negative.

#### dicts: Dictionaries, sets and sorting

4. Q1 "Which of these can be a dictionary key? | [1, 2] / {1, 2} / (1, 2) / {'a': 1}". The lesson says "Immutable built-ins are hashable; lists are not". It never says whether a set or a dict is mutable or hashable. I had to guess from `seen.add(...)` that a set can change, so it is ruled out.

#### u4: Recursion

5. "a list of n items copies (n − 1) + (n − 2) + … + 1 + 0 = n(n − 1)/2 items in total". The formula for this sum is just stated, with no reason given. MATH 120 proves a similar formula only in its last lesson.

#### u6: Testing, debugging and exceptions

6. "Exception: An object signaling an error". Earlier lessons also say "file object" and "Path object". The word "object" is used as if I know what it means, but no lesson defines it.

#### files: Files and modules

7. "Running python3 code/report.py from the folder above code means open("data.csv") looks for data.csv in the folder above." The second "the folder above" confused me. I couldn't tell whether it means the folder I'm in, or a folder above that one.

### MATH 120 Discrete Mathematics I

#### u1: Propositional logic

8. "With the loops from CS 101:" followed by `for p in [True, False]: for q in [True, False]: …`. The knights-and-knaves code also uses `"A knight" if a else "A knave"`. In CS 101, for loops come in Lesson 5 and lists in Lesson 8, and this lesson comes much earlier. Lesson 2 of MATH 120 adds a note for students who haven't reached this Python yet ("Reading the Python, if CS 101 hasn't reached it yet"), but Lesson 1 has no such note, so I couldn't read this code.

#### u5: Functions and relations

9. P6 "List the equivalence classes of congruence mod 4 on the integers from 0 to 15. Which class contains 2026? Which contains −1?" 2026 and −1 are not in 0 to 15. I didn't know if I should switch to classes on all the integers, or if the question has a mistake.

### MATH 130 Calculus I

#### u2: Continuity

10. P4 "The answer is then within 10⁻¹⁰ of the true root, which is what "about 10 decimal places" means here." The phrase "about 10 decimal places" doesn't appear in the problem or the lesson before this sentence. It reads like it explains a phrase that was cut.

#### chain: The chain rule and implicit differentiation

11. "A Python check with the derivative function from the previous lesson: derivative(math.atan, 1)". P5 also says "the central-difference derivative function from the previous lesson". The previous lesson, Differentiation rules, has no derivative function. It's in Lesson 5, The derivative, so the reference seems wrong.

### CS 100 Computing in Society

#### u1: A short history of computing

12. "many transistors made together on one piece of semiconductor". The word "semiconductor" is used here and in the key terms but never explained.

### WRIT 100 Writing for Technical Audiences

#### w4: Explaining technical ideas

13. (blocking) P1 "Explain what a queue data structure is to someone who has never programmed". No course this term covers queues. CS 101 covers lists, tuples, dicts and sets. I only know the everyday meaning of "queue", so I can't explain the data structure.

#### w5: Documentation: READMEs, docstrings and comments

14. P3 "(b) sleep(2)  # wait". `sleep` hasn't been shown in any course. To improve the comment I need to know what the call does and why someone would write it. I can only guess that it pauses for 2 of some unit.

#### w6: Writing in a software team

15. "with a tool like git log or git blame". CS 101 explained git log, but `git blame` is not explained anywhere.

#### w7: Design documents and proposals

16. (blocking) P3 "State what each choice gives up: (a) storing passwords only as salted hashes". "Salted hash" isn't explained in any course. CS 101 only explains hashes for dictionary slots. I don't know what storing a password this way does, so I can't say what it gives up.

#### w8: Evidence, sources and citation

17. (blocking) P4 "Format this source in both IEEE and APA style: the article "How to Report Bugs Effectively" by Simon Tatham, published on his website …". The lesson shows a full IEEE and APA reference only for a journal article. For web pages it just lists what to include ("the author or organization, title, site, date, URL and the date you accessed it"). It doesn't give the order, punctuation or wording for either style, so I can't produce a correct reference for a web page in either style.

### Across courses

18. CS 101, Loops: "Put imports at the top of the file." WRIT 100, Documentation shows `split_bill` with `import math` inside the function body, under the docstring. I don't know which is right, or when an import inside a function is acceptable.

19. MATH 120 Lesson 1 assumes CS 101 loops and lists ("With the loops from CS 101"). MATH 130 Limits and Continuity and MATH 120 Lesson 2 add explanations for students "if CS 101 hasn't reached" the code. This made me unsure where CS 101 is expected to be when each math lesson happens. Item 8 is the case where that left me unable to read the code.
