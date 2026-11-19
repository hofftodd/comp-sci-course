# Student review: Year 2 Fall

*Round 5. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a second-year student. Before this term I took CS 100, WRIT 100, CS 101 and CS 102 (Programming I and II), MATH 120 and 121 (Discrete Mathematics I and II), MATH 130 and 131 (Calculus I, Calculus II and Multivariable Calculus) and PHYS 150. I know Python well and have used big-O informally. I have never written C or assembly and have not studied linear algebra or statistics beyond MATH 121's probability. I read the four dumped course files lesson by lesson, in order, and tried every quiz and practice problem. In most places the notes explained enough for me to go on. The items below are the places where they didn't.

### CS 201 Data Structures

#### ds1: Asymptotic analysis

1. "It is perfectly sensible to say 'insertion sort's best case is Θ(n)' (an already sorted list) and 'its worst case is Θ(n²)'". Q2 also relies on insertion sort. Insertion sort isn't explained until Lesson 6, and Lesson 6 says CS 101 only compared selection sort with merge sort. So here I didn't know what the algorithm does or why a sorted list makes it fast. I could still answer Q2 because the question states the facts.

#### ds3: Hash tables

2. P5: "run PYTHONHASHSEED=0 python3 -c "print(hash('hello'))"". The notes call PYTHONHASHSEED an "environment variable" but never say what an environment variable is. They also don't explain the shell syntax of putting `NAME=value` in front of a command, or what `python3 -c` does. I could copy the command, but I couldn't explain why it works.

#### ds4: Balanced search trees

3. "So n + 1 ≥ F_(h+2) ≥ φʰ … h ≤ log₂(n + 1) / log₂ φ ≈ 1.4404 log₂(n + 1) … The programming problem checks the rounder 'AVL bound' h ≤ 1.44 log₂(n + 2)". The derivation produces log₂(n + 1), and then the bound the tests use has log₂(n + 2). Nothing says where the + 2 comes from or why it replaces + 1. I couldn't tell whether this is a different bound or a typo.

#### ds5: Heaps and priority queues

4. CODE running_median hint: "with the lower half holding the same number of items or one more. Push each new value onto the correct side, then move one item across if the sizes are off by more than one." These two sentences contradict each other. If the upper half ends up with one more item than the lower half, the sizes are off by only one, so the second rule says do nothing, but the first rule is broken. Example: lower = [5], upper = [8], then push 9 onto the upper side. I wasn't sure which rule to follow.

### CS 210 Computer Systems I

#### sy3: C for Python programmers

5. P2: "(The programming problem C's integer division then asks you to compute C's results in Python.)" No programming problem in my text has that name. The nearest one is marked "CODE c_division". I had to guess that this is the problem meant.

#### sy4: Pointers and memory

6. CODE byte_memory: "Store them in a bytearray(size) (Lesson 3's C strings in a byte buffer problem explains the type)". Lesson 3 has no problem called "C strings in a byte buffer". The one that explains bytearray is marked "CODE c_strings: Simulate C strings with Python bytearrays". I found it by searching.

#### sy5: Machine code and assembly

7. "Writing it is this lesson's first programming problem, Simulating the teaching machine." The problem in my text is marked "CODE teaching_machine" and has no such title. This one was easy to match, but it's the same mismatch as items 5 and 6.

### MATH 220 Linear Algebra

#### la6: Orthogonality and least squares

8. "If the columns of A are independent, A^(T)A is invertible and **x̂** is unique." No reason is given, and none of Lessons 4 and 5 shows it. The lesson relies on it, both to solve the normal equations and later in the QR argument, so I had to take it on faith.

### MATH 230 Probability and Statistics for Computer Science

#### ps1: Bayes' rule in practice

9. Q2: "Prior odds are 1 : 4 and the evidence has likelihood ratio 8. What are the posterior odds? | 1 : 32 / 2 : 1 / 8 : 4 / 1 : 2 | ans: 2 : 1". The notes' rule is "posterior odds = prior odds × likelihood ratio", which gives 8 : 4. That is the same odds as 2 : 1. Two of the four choices are correct, and I couldn't tell why 8 : 4 would count as wrong. (blocking)

#### ps2: Discrete distributions

10. "(random.expovariate(λ) draws the waiting time until the next event of a Poisson process, an exponential random variable; …)". This is the first use of "Poisson process", and the lesson never defines it. It only defines the Poisson distribution. Lesson 3 then says "waiting times between events of a Poisson process (Lesson 2)", as if Lesson 2 had defined the term. I wasn't sure whether a Poisson process is something more than events "happening independently, at a steady average rate".

### Across courses

11. The cross-references in CS 210 (items 5 to 7) name programming problems by titles that don't appear anywhere in my text. I only see ids such as "CODE c_division". Every time a lesson pointed to "the X problem", I had to search for a matching id. I found no other problems that span courses. Where a symbol is reused (α as the load factor in CS 201 Lesson 3, the inverse Ackermann function in CS 201 Lesson 8 and the significance level in MATH 230 Lesson 7), each use explains itself. The underflow limits in CS 210 Lesson 2 and MATH 230 Lesson 1 also agree.
