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

## Professor's response

Thank you. Every item led to a change. Three items in WRIT 100 (13, 16, 17) were blocking, and all three were real: two exercises assumed material from later courses, and the citation lesson asked for a web-page reference without showing one. Items 8 and 19 are the same problem as in earlier rounds, a MATH lesson using Python before CS 101 teaches it; Lesson 1 of MATH 120 now has its own reading note, and both math courses now say once, at the start, how their Python relates to CS 101. Item 18 was a mistake in the WRIT 100 example, not a rule with exceptions. No item rested on a misreading. Every number and code output I added was checked by running Python 3. No programming problem changed.

### CS 101 Programming I

1. u0, your first program: The step now says that a new terminal window starts in your home folder (the folder named after your user account, such as `/Users/ada` or `C:\Users\ada`; `pwd` shows it), so `mkdir cs101` makes `cs101` there. The Thonny step now says to browse to your home folder and open `cs101` inside it.
2. u1, floats: The sentence now says what the call does: `float(...)` turns a value into a float, and the next lesson covers such conversions. (`float(9007199254740993)` is `9007199254740992.0`, checked.)
3. u3, bisection: A new paragraph explains the test. A product is negative exactly when one number is negative and the other positive (−2 × 3 = −6), and zero when either is zero, so `f(lo) * f(mid) <= 0` means the two values differ in sign or one is zero, and the crossing is in the left half. A positive product means the crossing is in the right half.
4. dicts, Quiz 1: After `.add`, a new paragraph says that sets and dictionaries are mutable (`.add` and `d[key] = value` change them), so neither can be a key or a set member: `{{1, 2}: "x"}` and `{{"a": 1}: "x"}` both raise `TypeError: unhashable type`. The key term "Hashable" now names numbers, strings and tuples as hashable and lists, sets and dictionaries as not. The quiz can now be answered from the lesson.
5. u4, cost of slicing: The formula now has its reason: write the numbers from n − 1 down to 0 above the same numbers from 0 up to n − 1; each of the n columns adds to n − 1, so twice the sum is n(n − 1). It also says MATH 120 proves such formulas by induction. (For 900 items, 404,550, checked.)
6. u6, "object": The word is now defined where it first matters, at the start of "Aliasing: two names, one list" in Lesson 8: an object is a value Python keeps in memory, such as a particular list or string; names refer to objects, and an object's type decides what it can do. It says that "file object" and "`Path` object" later just mean an object of that type. "Object" is also a key term in that lesson, and the "Exception" key term points back to it.
7. files, working directory: The example is now concrete: a folder `project` contains a folder `code`, which holds `report.py`. If the terminal is in `project` and you run `python3 code/report.py`, then `open("data.csv")` looks for `project/data.csv` (the folder you are in), not `project/code/data.csv`.

### MATH 120 Discrete Mathematics I

8. u1, Python in Propositional logic: A note after the knights-and-knaves code now reads it in plain words: what `for a in [True, False]:` does, how a loop inside a loop gives the four rows of the truth table, that `not`, `and`, `or` are ¬, ∧, ∨ and `==` plays the role of ↔, what `if` does, what `"A knight" if a else "A knave"` gives, and that `#` starts a comment. The De Morgan check later in the lesson no longer says "With the loops from CS 101"; it points back to that code. Both programs can now be read in week 1. (The knights program prints `A knave B knight`, checked.)
9. u5, Practice 6: The problem now has two parts. (a) asks for the classes on 0 to 15. (b) says that on all the integers the same four classes extend in both directions (the class of 2 is {…, −6, −2, 2, 6, 10, …}) and asks which contains 2026 and which contains −1. The answer is [2] (2026 = 4 × 506 + 2) and [3] (−1 = 4 × (−1) + 3).

### MATH 130 Calculus I

10. u2, Practice 4: The leftover phrase is gone. The sentence now reads: "The answer is then within 10⁻¹⁰ of the true root, so it is correct to about 10 decimal places."
11. chain, derivative function: Both references, in the inverse-function example and in Practice 5, now point to Lesson 5, The derivative, with a link. (`derivative(math.atan, 1)` gives 0.5000000000088267 and the arctan(x²) check gives 0.9999999999676933, matching the text, checked.)

### CS 100 Computing in Society

12. u1, semiconductor: The lesson now defines it where it first appears: a material, usually silicon, that conducts electricity better than an insulator such as glass but worse than a metal such as copper; adding tiny amounts of other elements to small regions controls where current flows, which is how a transistor is made. It is also a key term.

### WRIT 100 Writing for Technical Audiences

13. w4, Practice 1: **Blocking item fixed.** The problem now gives a programmer's definition of a queue (enqueue adds an item at the back, dequeue removes the item at the front, so items leave in the order they arrived) and says you need to know nothing more. The task is to rewrite that definition for a non-programmer, starting with an example. That is the skill the lesson teaches, and it no longer depends on a data structure no course has covered.
14. w5, Practice 3: Part (b) is now `time.sleep(2)  # wait`, and the prompt says what the call does (pauses the program for 2 seconds) and why it is there (a web service refuses requests that come faster than one every 2 seconds). The task is to write a comment that says that reason.
15. w6, commit messages: Both tools are now explained in a few words: `git log` (from CS 101) lists past commits with their messages, and `git blame` shows, next to each line of a file, the commit that last changed it.
16. w7, Practice 3: **Blocking item fixed.** Part (a) now explains what storing passwords as hashes means: the program keeps only the result of a one-way scrambling function, which can't be turned back into the password, and checks a login by scrambling what the user typed and comparing. "Salted" is gone, since the question doesn't need it. I also explained "caching" in part (b) and said in one line what C is in part (c), and set the three parts on separate lines.
17. w8, Practice 4: **Blocking item fixed.** The lesson now shows a full web-page reference in both styles, using PEP 257 (the docstring guide from Lesson 5), and then spells out the order and punctuation of each: IEEE gives initials, the title in quotation marks, the site, the year, "[Online]. Available:", the URL and the access date; APA gives the surname, the year in parentheses, the title without quotation marks (italic when formatted), the site and the URL, with an access date only for pages designed to change. It also says to leave the site name out when the site is the author's own, which is the case in Practice 4.

### Across courses

18. Imports: CS 101 is right: put imports at the top of the file. The WRIT 100 example now has `import math` above `def split_bill`, as it should have from the start. (`split_bill(50, 3)` is still 1917, checked.)
19. Where CS 101 is expected to be: Each math course now says once, near the start of its first lesson, that CS 101 runs alongside it, so a lesson may show optional Python before CS 101 teaches it, and that where it does, the lesson explains that code in plain words, usually in a note beginning "Reading the Python". So you should never need CS 101 to be at a particular point to read a math lesson. Lesson 1 of MATH 120, the one place this was missing, now has such a note (item 8).
