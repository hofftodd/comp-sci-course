CSA.addCourse({
  id: "cs450",
  code: "CS 450",
  title: "Formal Methods and Verification",
  credits: 4,
  kind: "optional",
  term: "y4s",
  summary: "How to know a program is right rather than hope it is: writing precise specifications and testing against them with generated inputs; SAT and SMT solvers, and the symbolic execution and bounded model checking built on them; model checking concurrent systems; Hoare logic, weakest preconditions and loop invariants; and proof assistants, with what verified systems such as seL4, CompCert and Amazon's services cost and deliver. Every graded problem builds a small version of a real tool in Python; TLA+, Dafny, Lean and SMT-LIB appear as labelled examples.",
  prereqs: ["CS 320 Theory of Computation", "CS 360 Programming Languages"],
  outcomes: [
    "Write preconditions, postconditions and invariants that say exactly what a program must do, and tell a strong specification from a weak one",
    "Test code against a specification with generated inputs, and shrink a failing input to a small one",
    "Encode problems such as puzzles and schedules as CNF formulas, using the Tseitin transformation where needed, and solve them with DPLL",
    "Explain how CDCL and SMT solvers extend DPLL, and use bit-vector reasoning to find overflow bugs",
    "Find bugs with symbolic execution and bounded model checking, and say what a bound does and doesn't guarantee",
    "Model a concurrent algorithm as a state machine and check safety and liveness properties by exhaustive search",
    "Prove small programs correct with Hoare triples, weakest preconditions, loop invariants and variants",
    "Read short proofs in a proof assistant, explain the Curry–Howard correspondence, and weigh what full verification costs against what it guarantees"
  ],
  rubric: {
    criteriaFor: "problem sets and the verification project",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 30, desc: "Weekly: the lesson's programming problems, plus written exercises such as encodings, state-space traces, wp calculations and invariant proofs." },
      { name: "Verification project", weight: 30, desc: "In pairs: take a small real component (a lock-free queue, a protocol, a parser, a sorting routine), specify it, and verify it with at least two of the course's methods, for example property-based tests plus a TLA+ model, or a Dafny proof plus bounded model checking. Submit the specification, the artifacts, and a report on what each method found and what it cost." },
      { name: "Midterm exam", weight: 10, desc: "Specifications, SAT, SMT and symbolic execution (lessons 1–3)." },
      { name: "Final exam", weight: 20, desc: "Cumulative, with emphasis on model checking, Hoare logic and proof (lessons 4–6)." }
    ],
    criteria: [
      { name: "Specification", desc: "Does it say what should be true, precisely?", levels: [
        "Precise and complete: rules out the wrong programs and allows the right ones, with assumptions stated.",
        "Mostly precise; misses an edge case or a hidden assumption.",
        "Vague, or so weak that a wrong program satisfies it.",
        "No usable specification." ] },
      { name: "Correctness", desc: "Do the tools, encodings and proofs work?", levels: [
        "Correct on every test, and every proof step or encoding is justified.",
        "Correct in normal cases; a corner case or a step is missing.",
        "Works only on the simplest examples.",
        "Doesn't work." ] },
      { name: "Reasoning", desc: "Is it clear what was checked and what wasn't?", levels: [
        "States exactly what each result guarantees (bounds, ranges, assumptions, trusted parts) and what it doesn't.",
        "Mostly clear, with a gap in the assumptions.",
        "Claims more than was checked.",
        "No reasoning given." ] },
      { name: "Presentation", desc: "Can a reader follow it?", levels: [
        "Readable code, clear specifications and a write-up with traces or counterexamples where they help.",
        "Mostly clear.",
        "Hard to follow.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Tools:</b> the graded problems on this site use Python in your browser. The project uses free tools of your choice: Hypothesis, Z3, the TLA+ tools, Dafny or Lean, each installable on any computer.",
      "<b>Collaboration:</b> discuss ideas freely; write your own code and proofs and name your collaborators. The project is done in pairs, and both partners must be able to explain every part.",
      "<b>AI assistants:</b> you may use them to explain concepts, error messages and tool output, and must say how. A proof checker will check a proof whoever wrote it, but a specification is only as good as your understanding of it: you must be able to defend every specification you submit.",
      "<b>Late work:</b> four late days for problem sets and the project, used in whole days; then 10% a day."
    ]
  },
  units: [
    {
      id: "fm1",
      title: "Specifications, invariants and property-based testing",
      minutes: 90,
      summary: "What it means for a program to be correct: preconditions, postconditions and invariants; strong and weak specifications; why testing can't show the absence of bugs; and a property-based tester with shrinking, built from scratch.",
      notes: `
<p><strong>Formal methods</strong> are ways of establishing, with mathematics and with tools that do the mathematics for us, that a system does what it should. This course moves along a spectrum. This lesson writes precise specifications and tests against them with many generated inputs. Lessons 2 and 3 hand questions about programs to <em>solvers</em> that search all inputs up to a size. Lesson 4 explores every state of a concurrent system. Lessons 5 and 6 prove programs correct for all inputs, by hand and with machine-checked proofs. Every method needs the same first step: saying exactly what "does what it should" means.</p>

<h3>Specifications</h3>
<p>A <strong>specification</strong> is a precise statement of what a program must do. A program is never simply "correct": it is correct <em>with respect to</em> a specification. For a function the usual form is a pair of conditions:</p>
<ul>
<li>a <strong>precondition</strong>: what must be true of the inputs when the function is called (the caller's obligation);</li>
<li>a <strong>postcondition</strong>: what the function guarantees about its result when it returns, provided the precondition held (the function's obligation).</li>
</ul>
<p>Together they form a <strong>contract</strong>. Take the integer square root: given <em>n</em> ≥ 0, return the largest <em>r</em> with <em>r</em><sup>2</sup> ≤ <em>n</em>. "Largest" can be said without the word: <em>r</em><sup>2</sup> ≤ <em>n</em> &lt; (<em>r</em> + 1)<sup>2</sup>. Python's <code>assert</code> turns both conditions into run-time checks:</p>
<pre><code>import random
from collections import Counter

def isqrt(n):
    assert n &gt;= 0                          # precondition
    r = 0
    while (r + 1) * (r + 1) &lt;= n:
        r += 1
    assert r * r &lt;= n &lt; (r + 1) * (r + 1)  # postcondition
    return r

print(isqrt(10), isqrt(16))   # 3 4</code></pre>
<p>(The Python blocks in each lesson form one program, meant to be run in order in one Python session, and they were checked that way: a later block uses the imports and definitions of earlier ones, as <code>sort_spec</code> below uses the <code>Counter</code> imported here. A practice answer's code continues its lesson's program, and each lesson starts afresh.)</p>
<p>The postcondition doesn't say <em>how</em> to compute <em>r</em>: this loop, binary search and Newton's method all meet it. That separation is the point. A specification describes the "what", and can be much simpler than any efficient "how".</p>

<h3>Strong and weak specifications</h3>
<p>A specification can be too weak: satisfied by wrong programs. "The output of <code>sort</code> is in order" is satisfied by a function that always returns <code>[]</code>. The full specification of sorting has two parts: the output is in order, <em>and</em> it is a permutation of the input (the same elements, each the same number of times). <code>Counter</code>, from Python's <code>collections</code> module, counts how many times each element occurs, so two lists are permutations of each other exactly when their <code>Counter</code>s are equal:</p>
<pre><code>def sort_spec(xs, ys):
    in_order = all(ys[i] &lt;= ys[i + 1] for i in range(len(ys) - 1))
    return in_order and Counter(ys) == Counter(xs)

print(sort_spec([3, 1, 2], [1, 2, 3]), sort_spec([3, 1, 2], []), sort_spec([2, 2], [2]))   # True False False</code></pre>
<p>The third call shows why counting matters: [2] is in order and contains only elements of the input, but loses a duplicate. A specification can also be wrong, or ambiguous: for "the median of a list", is the median of [1, 2, 3, 4] equal to 2, 3 or 2.5? Writing a specification precisely often finds such questions before any code exists, which is a large part of its value.</p>

<h3>Invariants</h3>
<p>An <strong>invariant</strong> is a condition that stays true while something changes. CS 102 Lesson 1 met <em>class invariants</em>, true of every object between method calls ("the balance is never negative"), and CS 102 Lesson 8 the BST invariant. Two more kinds run through this course:</p>
<ul>
<li>A <strong>loop invariant</strong> is true every time a loop's condition is tested. In <code>isqrt</code>, <em>r</em><sup>2</sup> ≤ <em>n</em> holds before the first test (0 ≤ <em>n</em>) and after each iteration (the loop only increased <em>r</em> because (<em>r</em> + 1)<sup>2</sup> ≤ <em>n</em>). When the loop stops, the condition is false, so (<em>r</em> + 1)<sup>2</sup> &gt; <em>n</em>: invariant plus exit gives the postcondition. Lesson 5 turns this argument into a method.</li>
<li>A <strong>system invariant</strong> is true in every reachable state of a system: "at most one thread is in the critical section" (CS 310 Lesson 4), or Raft's "each term has at most one leader" (CS 410 Lesson 4). Lesson 4 checks such invariants by visiting every state.</li>
</ul>

<h3>Why testing isn't enough</h3>
<p>Edsger Dijkstra put it in 1970: "Program testing can be used to show the presence of bugs, but never to show their absence!" The reason is counting. A function of two 32-bit integers has 2<sup>64</sup> possible inputs. At a billion tests a second, trying them all takes 2<sup>64</sup> / 10<sup>9</sup> seconds, about 585 years. Concurrency is worse: CS 310 Lesson 3 counted C(20, 10) = 184,756 interleavings of just two threads of 10 steps. Tests sample a tiny fraction of the behaviours, and bugs live in the corners nobody sampled: Lesson 3's example is a bug that 14 of 100,000 random inputs reach.</p>
<p>Testing still matters. It is cheap, it checks the real code on the real machine, and it finds most bugs. The aim of formal methods is to cover what testing can't: the rare input, the unlucky interleaving, the case nobody imagined.</p>

<h3>Property-based testing</h3>
<p>CS 240 Lesson 3 introduced <strong>property-based testing</strong>: state a property that must hold for every input, then check it on many generated inputs. A specification is exactly such a property. Here is a tester built from scratch, aimed at a sort that is fast and wrong:</p>
<pre><code>def my_sort(xs):           # quick, and wrong
    return sorted(set(xs))

def gen_list(rng):
    return [rng.randint(0, 9) for _ in range(rng.randint(0, 8))]</code></pre>
<p>A failing input found at random is usually cluttered: most of it has nothing to do with the bug. <strong>Shrinking</strong> fixes this. Given a failing input, try simpler candidates; if one still fails, move to it and repeat; stop when no candidate fails. The result is <em>1-minimal</em> with respect to the candidates: no single simplification of it still fails.</p>
<pre><code>def shrink_list(xs):
    """Candidates smaller than xs: drop one element, or make one element smaller."""
    for i in range(len(xs)):
        yield xs[:i] + xs[i + 1:]
    for i in range(len(xs)):
        for smaller in sorted({0, xs[i] // 2, xs[i] - 1}):
            if 0 &lt;= smaller &lt; xs[i]:
                yield xs[:i] + [smaller] + xs[i + 1:]

def minimize(prop, x, shrink):
    """Greedy shrinking: move to any smaller candidate that still fails, until none does."""
    while True:
        for y in shrink(x):
            if not prop(y):
                x = y
                break
        else:
            return x

def for_all(prop, gen, shrink, trials=200, seed=0):
    rng = random.Random(seed)
    for t in range(trials):
        x = gen(rng)
        if not prop(x):
            return t + 1, x, minimize(prop, x, shrink)
    return None

prop = lambda xs: sort_spec(xs, my_sort(xs))
print(for_all(prop, gen_list, shrink_list))   # (1, [6, 0, 4, 8, 7, 6], [6, 6])
print(for_all(lambda xs: sort_spec(xs, sorted(xs)), gen_list, shrink_list))   # None</code></pre>
<p>The <code>for</code> loop's <code>else</code> clause runs only if the loop finished without <code>break</code>, that is, when no candidate failed. <code>shrink_list</code> is a generator (CS 102 Lesson 5), so <code>minimize</code> stops generating candidates as soon as one fails. The very first random list fails, and shrinking turns [6, 0, 4, 8, 7, 6] into [6, 6], which names the bug: duplicates are lost. Shrinking went from six elements to two by removing elements one at a time, each removal keeping a duplicate pair. It stops at [6, 6] rather than [0, 0] because every candidate of [6, 6] (such as [3, 6]) has distinct elements and passes: greedy shrinking finds a <em>local</em> minimum. The Hypothesis library (CS 240 Lesson 3) shrinks better because it shrinks the sequence of random choices that produced the input, so it can lower both 6s together.</p>
<p>The second call passes 200 trials, which is evidence, not proof: Dijkstra's point still applies.</p>

<h3>Stateful testing</h3>
<p>Many bugs need a sequence of operations to appear. A <strong>stateful</strong> property-based test generates random sequences of operations, runs them on the implementation and on a <strong>model</strong> (a simple, obviously correct version, such as a Python list standing in for a queue), and checks that every result agrees. Shrinking then removes operations until every remaining one is needed to show the bug. The second programming problem tests a ring buffer this way; the shrunk sequence of four operations points straight at the faulty line.</p>
<p class="note">Why it matters: a specification is the one artifact every verification method shares. Property-based tests, solvers, model checkers and proofs all check code against one, and none of them can find a bug the specification allows.</p>
`,
      terms: [
        ["Formal methods", "Mathematically based techniques and tools for specifying systems and establishing that they meet their specifications."],
        ["Specification", "A precise statement of what a program or system must do, against which it is judged correct."],
        ["Precondition", "A condition the inputs must satisfy when a function is called; the caller's obligation."],
        ["Postcondition", "A condition the function guarantees on return, provided the precondition held."],
        ["Contract", "A precondition and postcondition together, dividing responsibility between caller and function."],
        ["Weak specification", "A specification that some wrong programs satisfy, such as \"the output is in order\" for sorting."],
        ["Loop invariant", "A condition that is true every time a loop's condition is tested."],
        ["System invariant", "A condition true in every reachable state of a system, such as mutual exclusion."],
        ["Property-based testing", "Testing a property on many generated inputs rather than a few chosen examples."],
        ["Shrinking", "Repeatedly replacing a failing input by a simpler one that still fails, to get a small counterexample."],
        ["1-minimal", "A failing input none of whose candidate simplifications still fails; a local minimum of shrinking."],
        ["Model (in testing)", "A simple, obviously correct implementation whose results the real one is compared with."]
      ],
      quiz: [
        { q: "Which postcondition fully specifies the integer square root r of n ≥ 0?", choices: ["r * r <= n", "r * r == n", "r * r <= n < (r + 1) * (r + 1)", "r <= n"], answer: 2, why: "r * r <= n alone allows r = 0 for every n; the second inequality forces r to be the largest such value." },
        { q: "A sort function returns [1, 2] for the input [2, 1, 2]. Which part of the sorting specification fails?", choices: ["The output is in order", "The output is a permutation of the input", "The precondition", "None: it is correct"], answer: 1, why: "It is in order, but one 2 was lost, so the counts differ from the input's." },
        { q: "Why can't testing alone show that a function of two 32-bit integers is correct?", choices: ["Tests can't call functions with integers", "There are 2^64 inputs, far too many to try", "Tests are always wrong", "Testing only works on sorted input"], answer: 1, why: "At a billion tests a second, trying them all would take about 585 years." },
        { q: "What does shrinking do?", choices: ["Makes tests run faster", "Compresses the test suite", "Replaces a failing input by simpler failing ones until no candidate fails", "Removes passing tests"], answer: 2, why: "It ends at an input none of whose candidates still fails, which usually isolates the bug." },
        { q: "The tester in the notes shrinks [6, 0, 4, 8, 7, 6] to [6, 6] rather than [0, 0]. Why?", choices: ["It has a bug", "Every candidate of [6, 6] passes, so greedy shrinking stops at this local minimum", "[0, 0] passes the property", "It ran out of trials"], answer: 1, why: "Lowering one 6 makes the elements distinct, and the property then passes." },
        { q: "In a stateful property-based test, what is the model?", choices: ["The machine the test runs on", "A simple, obviously correct implementation whose results are compared with the real one's", "The random number generator", "A UML diagram"], answer: 1, why: "Each operation is run on both, and any difference is a failure." }
      ],
      practice: [
        {
          q: `<p>Write a precondition and postcondition for <code>index_of(xs, v)</code>, which returns an index where <code>v</code> occurs in the list <code>xs</code>, or −1 if it doesn't occur. Then give a wrong implementation that satisfies the weaker postcondition "if the result is not −1, then <code>xs[result] == v</code>".</p>`,
          a: `<p>Precondition: none (<code>xs</code> is any list). Postcondition: either 0 ≤ result &lt; len(xs) and xs[result] == v, or result == −1 and v doesn't occur in xs. The weaker version leaves out the second half, so <code>def index_of(xs, v): return -1</code> satisfies it: it never returns a wrong index, because it never returns an index at all. The missing part, "−1 only when v is absent", is what makes the specification rule this out. (If the function must return the <em>first</em> index, add: and v doesn't occur in xs[:result].)</p>`
        },
        {
          q: `<p>For <code>isqrt</code> in the notes, show that the loop invariant <em>r</em><sup>2</sup> ≤ <em>n</em> holds before the first test and is kept by each iteration, and explain how it and the exit condition give the postcondition.</p>`,
          a: `<p>Before the first test, <em>r</em> = 0 and 0 ≤ <em>n</em> by the precondition, so 0<sup>2</sup> ≤ <em>n</em>. An iteration runs only when the condition (<em>r</em> + 1)<sup>2</sup> ≤ <em>n</em> is true, and it sets <em>r</em> to <em>r</em> + 1, so afterwards <em>r</em><sup>2</sup> ≤ <em>n</em> again. When the loop stops, the condition is false: (<em>r</em> + 1)<sup>2</sup> &gt; <em>n</em>. Together with the invariant that is <em>r</em><sup>2</sup> ≤ <em>n</em> &lt; (<em>r</em> + 1)<sup>2</sup>, the postcondition. (It also stops: <em>r</em> grows by 1 each time, and (<em>r</em> + 1)<sup>2</sup> ≤ <em>n</em> fails once <em>r</em> ≥ <em>n</em>, so there are at most <em>n</em> iterations. Lesson 5 calls this a variant.)</p>`
        },
        {
          q: `<p>Give two properties suitable for a property-based test of a function <code>reverse(xs)</code>, one of which would catch an implementation that returns <code>xs</code> unchanged, and say which.</p>`,
          a: `<p>(1) Round trip: <code>reverse(reverse(xs)) == xs</code>. The identity function passes it, so it doesn't catch that bug. (2) Positions: for every <em>i</em>, <code>reverse(xs)[i] == xs[len(xs) - 1 - i]</code>, which together with <code>len(reverse(xs)) == len(xs)</code> is a full specification. It catches the identity function on any list whose first and last elements differ, such as [0, 1]. Another relationship that works: <code>reverse(xs + ys) == reverse(ys) + reverse(xs)</code>, which the identity fails on xs = [0], ys = [1].</p>`
        },
        {
          q: `<p>Trace the first steps of <code>minimize</code> on [6, 0, 4, 8, 7, 6] with the property "my_sort keeps the sort specification". Which candidate does it try first, and does it fail?</p>`,
          hint: `<p><code>shrink_list</code> yields removals first, starting with index 0.</p>`,
          a: `<p>The first candidate removes index 0, giving [0, 4, 8, 7, 6]. Its elements are all different, so <code>sorted(set(...))</code> keeps them all and the property passes: not a failure. The next removes index 1, giving [6, 4, 8, 7, 6]: it still contains two 6s, so one is lost and the property fails. <code>minimize</code> moves to it and starts again. Each step removes another element that isn't one of the 6s ([6, 8, 7, 6], [6, 7, 6], [6, 6]), until only the duplicate pair is left, and every candidate of [6, 6] ([6], [0, 6], [3, 6], [5, 6], [6, 0], [6, 3], [6, 5]) has no duplicate and passes.</p>`
        }
      ],
      sources: ["claessen00", "hypothesisdocs", "hoare69"]
    },
    {
      id: "fm2",
      title: "SAT solving",
      minutes: 90,
      summary: "Formulas in conjunctive normal form; why naive conversion explodes and how the Tseitin encoding stays linear; encoding constraints, Sudoku and timetables; DPLL with unit propagation; and conflict-driven clause learning in outline.",
      notes: `
<p>SAT, satisfiability of propositional formulas, is NP-complete (CS 220 Lesson 8; CS 320 Lesson 8 proved it with the Cook–Levin theorem). That makes it hard in the worst case, and also universal: every problem in NP reduces to it. Since about 2000, SAT solvers have become fast enough on real formulas, with millions of variables, that "encode it as SAT and call a solver" is a standard engineering technique, used to check chip designs, find bugs in software, plan, schedule and settle open mathematical questions. This lesson builds a solver and the encodings that feed it.</p>

<h3>Conjunctive normal form</h3>
<p>Solvers take formulas in <strong>conjunctive normal form</strong> (CNF): an AND of <strong>clauses</strong>, each an OR of <strong>literals</strong>, a literal being a variable or its negation. We use the representation of CS 220's solver, which is also that of the standard DIMACS file format: variables are numbered from 1, the literal 3 means <em>x</em><sub>3</sub> and −3 means ¬<em>x</em><sub>3</sub>, a clause is a list of literals and a formula a list of clauses.</p>
<pre><code>from itertools import product, combinations

def evaluate(clauses, assignment):
    return all(any(assignment[abs(l)] == (l &gt; 0) for l in c) for c in clauses)

# (x1 ∨ ¬x2) ∧ (x2 ∨ x3) ∧ (¬x1 ∨ ¬x3)
F = [[1, -2], [2, 3], [-1, -3]]
print(evaluate(F, {1: True, 2: False, 3: False}), evaluate(F, {1: True, 2: True, 3: False}))   # False True</code></pre>
<p>An empty clause has no literal that could be true, so it is false; an empty formula has no clause that could fail, so it is true.</p>

<h3>Getting to CNF: the Tseitin encoding</h3>
<p>Formulas from real problems are rarely in CNF. MATH 120 Lesson 1's laws convert any formula: push negations inward with De Morgan's laws, then distribute ∨ over ∧. But distribution can explode. (<em>a</em><sub>1</sub> ∧ <em>b</em><sub>1</sub>) ∨ (<em>a</em><sub>2</sub> ∧ <em>b</em><sub>2</sub>) ∨ ⋯ ∨ (<em>a<sub>n</sub></em> ∧ <em>b<sub>n</sub></em>) becomes one clause for each way of choosing <em>a<sub>i</sub></em> or <em>b<sub>i</sub></em> from every term, 2<sup><em>n</em></sup> clauses, over a billion for <em>n</em> = 30.</p>
<p>Grigori Tseitin's 1968 trick avoids this by adding variables. Give every AND and OR gate of the formula a new variable that stands for its value, and write three clauses that force it to equal the gate's output. For <em>g</em> ↔ (<em>a</em> ∧ <em>b</em>): (¬<em>g</em> ∨ <em>a</em>) says <em>g</em> → <em>a</em>, (¬<em>g</em> ∨ <em>b</em>) says <em>g</em> → <em>b</em>, and (<em>g</em> ∨ ¬<em>a</em> ∨ ¬<em>b</em>) says <em>a</em> ∧ <em>b</em> → <em>g</em>. For <em>g</em> ↔ (<em>a</em> ∨ <em>b</em>) the clauses are (¬<em>g</em> ∨ <em>a</em> ∨ <em>b</em>), (<em>g</em> ∨ ¬<em>a</em>) and (<em>g</em> ∨ ¬<em>b</em>). A NOT needs no gate: its literal is the negation of its input's. Finally a unit clause asserts the top gate.</p>
<pre><code>class Tseitin:
    def __init__(self):
        self.clauses, self.ids = [], {}
    def var(self, name):
        if name not in self.ids:
            self.ids[name] = len(self.ids) + 1
        return self.ids[name]
    def fresh(self):
        return self.var(("gate", len(self.ids)))
    def encode(self, f):
        """Return a literal that is true exactly when formula f is true."""
        if isinstance(f, str):
            return self.var(f)
        op, *args = f
        if op == "not":
            return -self.encode(args[0])
        a, b = self.encode(args[0]), self.encode(args[1])
        g = self.fresh()
        if op == "and":       # g ↔ (a ∧ b)
            self.clauses += [[-g, a], [-g, b], [g, -a, -b]]
        elif op == "or":      # g ↔ (a ∨ b)
            self.clauses += [[-g, a, b], [g, -a], [g, -b]]
        return g

def to_cnf(f):
    t = Tseitin()
    t.clauses.append([t.encode(f)])
    return t.clauses, t.ids

f = ("or", ("and", "a1", "b1"), ("or", ("and", "a2", "b2"), ("and", "a3", "b3")))
clauses, ids = to_cnf(f)
print(len(ids), len(clauses))   # 11 16
print(clauses[:3])   # [[-3, 1], [-3, 2], [3, -1, -2]]</code></pre>
<p>The formula has 6 input variables and 5 gates (three ANDs, two ORs), so 11 variables and 5 × 3 + 1 = 16 clauses; in general the size is linear in the formula. The first three clauses define gate 3 as <em>a</em><sub>1</sub> ∧ <em>b</em><sub>1</sub>. The result is not <em>equivalent</em> to <em>f</em> (it mentions variables <em>f</em> doesn't), but it is <strong>equisatisfiable</strong>: for every assignment to the inputs, the gate variables can be chosen to satisfy the clauses exactly when <em>f</em> is true. That is all a solver needs.</p>

<h3>Encoding problems</h3>
<p>Most encodings are built from a few patterns. "At least one of <em>x</em><sub>1</sub>, …, <em>x<sub>n</sub></em>" is one clause. "At most one" is a clause (¬<em>x<sub>i</sub></em> ∨ ¬<em>x<sub>j</sub></em>) for every pair, C(<em>n</em>, 2) clauses. That grows quadratically, so for large groups encoders add helper variables instead: the <strong>sequential counter</strong> adds <em>s<sub>i</sub></em>, meaning "one of <em>x</em><sub>1</sub>, …, <em>x<sub>i</sub></em> is true", for <em>i</em> = 1, …, <em>n</em> − 1, with clauses <em>x<sub>i</sub></em> ⇒ <em>s<sub>i</sub></em> for <em>i</em> = 1, …, <em>n</em> − 1 (<em>n</em> − 1 clauses), <em>s</em><sub><em>i</em>−1</sub> ⇒ <em>s<sub>i</sub></em> for <em>i</em> = 2, …, <em>n</em> − 1 (<em>n</em> − 2), and ¬(<em>s</em><sub><em>i</em>−1</sub> ∧ <em>x<sub>i</sub></em>) for <em>i</em> = 2, …, <em>n</em> (<em>n</em> − 1): 3<em>n</em> − 4 clauses and <em>n</em> − 1 new variables. Why it works: if <em>x<sub>j</sub></em> and <em>x<sub>k</sub></em> are both true with <em>j</em> &lt; <em>k</em>, the first two families force <em>s<sub>j</sub></em>, then <em>s</em><sub><em>j</em>+1</sub>, …, up to <em>s</em><sub><em>k</em>−1</sub>, and ¬(<em>s</em><sub><em>k</em>−1</sub> ∧ <em>x<sub>k</sub></em>) is violated. If at most one <em>x</em> is true, setting each <em>s<sub>i</sub></em> to "some <em>x</em> up to <em>i</em> is true" satisfies every clause. (Each ⇒ is one two-literal clause: <em>a</em> ⇒ <em>b</em> is ¬<em>a</em> ∨ <em>b</em>.) "Exactly one" is both "at least one" and "at most one":</p>
<pre><code>def exactly_one(lits):
    return [list(lits)] + [[-a, -b] for a, b in combinations(lits, 2)]

print(exactly_one([1, 2, 3]))   # [[1, 2, 3], [-1, -2], [-1, -3], [-2, -3]]</code></pre>
<p><strong>Exam timetabling.</strong> Five exams, A to E, must go into three time slots, and some pairs share students, so can't share a slot. Variable "exam <em>e</em> is in slot <em>s</em>" is numbered 3 × (index of <em>e</em>) + <em>s</em> + 1. Each exam is in exactly one slot, and for each conflicting pair and each slot, not both. This is graph colouring, and the same pattern encodes register allocation and frequency assignment. (The timetabling code needs a solver, so it appears at the end of the <code>dpll</code> code block in the next section. As in every lesson, the blocks form one program run in order, so that block can use <code>exactly_one</code> from the block above.)</p>
<p><strong>Sudoku.</strong> Variable <em>v</em>(<em>r</em>, <em>c</em>, <em>d</em>) means "cell (<em>r</em>, <em>c</em>) holds digit <em>d</em>": 9 × 9 × 9 = 729 variables. Each of the 81 cells holds exactly one digit, and for each digit, each of the 9 rows, 9 columns and 9 boxes holds it exactly once: 4 × 81 groups of 9 variables, each turned into 1 + C(9, 2) = 37 clauses, which is 11,988 clauses, plus one unit clause per given digit. The third programming problem builds it; a solver with unit propagation finishes ordinary puzzles in milliseconds, mostly by propagation alone.</p>

<h3>DPLL</h3>
<p>CS 220 Lesson 8's solver assigned variables one at a time and backtracked when a clause became false. The algorithm of Davis, Putnam, Logemann and Loveland (DPLL, 1962) adds one powerful rule. A clause is <strong>unit</strong> when all its literals but one are false and that one is unassigned: the remaining literal <em>must</em> be true. <strong>Unit propagation</strong> applies the rule until nothing changes or some clause has all its literals false, a <strong>conflict</strong>. CS 370 Lesson 2's forward checking is the same idea for constraint problems.</p>
<pre><code>def unit_propagate(clauses, assign):
    """Extend assign (a dict var -&gt; bool) by unit propagation, in place.
    Return False if some clause becomes false (a conflict), else True."""
    changed = True
    while changed:
        changed = False
        for c in clauses:
            unassigned, satisfied = [], False
            for l in c:
                v = assign.get(abs(l))
                if v is None:
                    unassigned.append(l)
                elif v == (l &gt; 0):
                    satisfied = True
                    break
            if satisfied:
                continue
            if not unassigned:
                return False                     # every literal false
            if len(unassigned) == 1:             # a unit clause: its literal is forced
                l = unassigned[0]
                assign[abs(l)] = l &gt; 0
                changed = True
    return True

G = [[1, 2], [-1, 3], [-3, -2], [-3, 4], [-4, -1, 2]]
a = {1: True}
print(unit_propagate(G, a), a)   # False {1: True, 3: True, 2: False, 4: True}</code></pre>
<p>Trace it: with <em>x</em><sub>1</sub> true, [1, 2] is satisfied; [−1, 3] is unit, so <em>x</em><sub>3</sub> = true; then [−3, −2] forces <em>x</em><sub>2</sub> = false and [−3, 4] forces <em>x</em><sub>4</sub> = true; and [−4, −1, 2] now has all three literals false. One decision led to a conflict through three forced steps. DPLL decides a variable, propagates, and backtracks on conflict:</p>
<pre><code>def dpll(clauses, assign=None, stats=None):
    assign = dict(assign or {})
    if not unit_propagate(clauses, assign):
        return None
    free = {abs(l) for c in clauses for l in c} - assign.keys()
    if not free:
        return assign
    x = min(free)
    for value in (True, False):
        if stats is not None:
            stats["decisions"] += 1
        result = dpll(clauses, {**assign, x: value}, stats)
        if result is not None:
            return result
    return None

stats = {"decisions": 0}
print(dpll(G, stats=stats), stats)   # {1: False, 2: True, 3: False, 4: True} {'decisions': 3}

exams = ["A", "B", "C", "D", "E"]
conflicts = [("A", "B"), ("A", "C"), ("B", "C"), ("B", "D"), ("C", "E"), ("D", "E")]
v = lambda e, s: exams.index(e) * 3 + s + 1
cnf = [cl for e in exams for cl in exactly_one([v(e, s) for s in range(3)])]
cnf += [[-v(e, s), -v(f, s)] for e, f in conflicts for s in range(3)]
a = dpll(cnf)
print(len(cnf), {e: s for e in exams for s in range(3) if a[v(e, s)]})   # 38 {'A': 0, 'B': 1, 'C': 2, 'D': 0, 'E': 1}</code></pre>
<p>On <code>G</code>: deciding <em>x</em><sub>1</sub> = true conflicts (decision 1); deciding <em>x</em><sub>1</sub> = false (decision 2) forces <em>x</em><sub>2</sub> = true and <em>x</em><sub>3</sub> = false; <em>x</em><sub>4</sub> is then unconstrained and the third decision sets it true. The timetable has 5 × 4 + 6 × 3 = 38 clauses. Add conflicts A–E and B–E and four exams (A, B, C, E) all clash pairwise, so <code>dpll</code> returns <code>None</code>: three slots are impossible, and the solver has proved it by exhausting the search.</p>

<h3>CDCL: learning from conflicts</h3>
<p>Modern solvers use <strong>conflict-driven clause learning</strong> (CDCL), introduced in the GRASP solver (1996) and made fast in Chaff (2001). In outline:</p>
<ul>
<li><strong>Learning.</strong> The solver records why each forced literal was forced, a graph called the implication graph. At a conflict it walks back through the graph to the decisions responsible and adds a new clause that rules out that combination. In <code>G</code>, the conflict depended only on the decision <em>x</em><sub>1</sub> = true, so the learned clause is [−1]: <em>x</em><sub>1</sub> must be false, everywhere in the search. Learned clauses follow from the formula (they are derived by <em>resolution</em>: from the clauses <em>a</em> ∨ <em>b</em> and ¬<em>a</em> ∨ <em>c</em>, conclude <em>b</em> ∨ <em>c</em>, which holds because <em>a</em> is either false, making <em>b</em> true, or true, making <em>c</em> true), so adding them changes nothing but the speed.</li>
<li><strong>Backjumping.</strong> Instead of undoing only the last decision, the solver jumps back to the most recent decision that the learned clause involves, skipping decisions that had nothing to do with the conflict.</li>
<li><strong>Heuristics.</strong> It decides next on variables that appeared in recent conflicts (VSIDS), restarts the search from scratch every so often while keeping the learned clauses, and watches only two literals per clause, so that propagation touches a clause only when one of its watched literals becomes false.</li>
</ul>
<p>None of this beats NP-completeness. Some formulas remain hard for every known solver: Armin Haken proved in 1985 that the pigeonhole formulas ("<em>n</em> + 1 pigeons in <em>n</em> holes, at most one per hole") need resolution proofs of exponential size, and CDCL's reasoning is resolution. But formulas from hardware and software have structure that learning exploits, and solvers routinely handle millions of clauses.</p>
<p class="note">Why it matters: SAT is the engine under much of this course. Lesson 3 adds arithmetic to it, bounded model checking turns "is there a bug within <em>k</em> steps?" into a formula, and Lesson 6 checks a solver's "unsatisfiable" with a proof.</p>
`,
      terms: [
        ["Conjunctive normal form (CNF)", "An AND of clauses, each an OR of literals."],
        ["Clause", "An OR of literals; satisfied when at least one of its literals is true."],
        ["Literal", "A variable or its negation, written as a positive or negative integer."],
        ["DIMACS format", "The standard text format for CNF: variables are numbered, and negative numbers are negated literals."],
        ["Tseitin encoding", "A linear-size conversion to CNF that introduces a variable for each gate, with clauses forcing it to equal the gate's output."],
        ["Equisatisfiable", "Two formulas that are either both satisfiable or both unsatisfiable, though not necessarily equivalent."],
        ["At-most-one constraint", "A clause (¬x_i ∨ ¬x_j) for every pair of the variables, so that no two are true."],
        ["Unit clause", "A clause whose literals are all false except one unassigned literal, which must therefore be true."],
        ["Unit propagation", "Repeatedly setting the forced literals of unit clauses until none remain or a clause becomes false."],
        ["Conflict", "A state in which some clause has all its literals false."],
        ["DPLL", "Backtracking search over assignments with unit propagation after every decision."],
        ["CDCL", "Conflict-driven clause learning: DPLL that learns a clause from each conflict and backjumps."],
        ["Learned clause", "A clause derived from a conflict that rules out the combination of decisions that caused it."],
        ["Backjumping", "Undoing several decisions at once, back to the most recent one involved in a conflict."]
      ],
      quiz: [
        { q: "In the integer representation, what does the clause [2, -5] mean?", choices: ["x2 ∧ ¬x5", "x2 ∨ ¬x5", "x2 → x5", "x2 = 5"], answer: 1, why: "A clause is an OR of its literals, and -5 is the negation of x5." },
        { q: "Why does the Tseitin encoding introduce new variables?", choices: ["To make the formula equivalent", "To keep the CNF linear in size, instead of the exponential blow-up of distribution", "Because solvers need at least 100 variables", "To make every clause a unit clause"], answer: 1, why: "Each gate gets a variable defined by three clauses, so the size grows with the number of gates." },
        { q: "The clauses are [1, 2] and [-1, 3], and x2 is false. What does unit propagation do?", choices: ["Nothing", "Sets x1 true, then x3 true", "Sets x1 false", "Reports a conflict"], answer: 1, why: "With x2 false, [1, 2] is unit, forcing x1; then [-1, 3] is unit, forcing x3." },
        { q: "How many clauses does the pairwise at-most-one encoding need for 9 variables?", choices: ["9", "18", "36", "81"], answer: 2, why: "One clause per pair: C(9, 2) = 36." },
        { q: "What does a CDCL solver do at a conflict that DPLL doesn't?", choices: ["Gives up", "Learns a clause ruling out the combination of decisions that caused it, and backjumps", "Restarts with a random formula", "Deletes a clause"], answer: 1, why: "The learned clause follows from the formula and prevents the same conflict elsewhere in the search." },
        { q: "The Tseitin output for a formula f is satisfiable. What follows?", choices: ["f is a tautology", "f is satisfiable", "f is unsatisfiable", "Nothing about f"], answer: 1, why: "The encoding is equisatisfiable with f, and a satisfying assignment restricted to f's variables satisfies f." }
      ],
      practice: [
        {
          q: `<p>Write the Tseitin clauses for <em>g</em> ↔ ¬(<em>a</em> ∧ <em>b</em>) (a NAND gate) directly, using the AND clauses and the fact that NOT needs no gate. Check that all three clauses hold when <em>a</em> = <em>b</em> = true and <em>g</em> = false.</p>`,
          a: `<p>Let <em>h</em> ↔ (<em>a</em> ∧ <em>b</em>): clauses (¬<em>h</em> ∨ <em>a</em>), (¬<em>h</em> ∨ <em>b</em>), (<em>h</em> ∨ ¬<em>a</em> ∨ ¬<em>b</em>). The NAND output is the literal ¬<em>h</em>, so <em>g</em> is just ¬<em>h</em>: substitute <em>h</em> = ¬<em>g</em> to get (<em>g</em> ∨ <em>a</em>), (<em>g</em> ∨ <em>b</em>), (¬<em>g</em> ∨ ¬<em>a</em> ∨ ¬<em>b</em>). With <em>a</em> = <em>b</em> = true, <em>g</em> = false: the first is false ∨ true, the second false ∨ true, the third true ∨ false ∨ false. All hold, as they should, since NAND(true, true) = false.</p>`
        },
        {
          q: `<p>Run unit propagation by hand on [[1], [-1, 2], [-2, -3], [3, 4], [-4, -1]] from an empty assignment. What happens?</p>`,
          a: `<p>[1] is unit: <em>x</em><sub>1</sub> = true. [−1, 2] is now unit: <em>x</em><sub>2</sub> = true. [−2, −3] is unit: <em>x</em><sub>3</sub> = false. [3, 4] is unit: <em>x</em><sub>4</sub> = true. [−4, −1] now has both literals false: a conflict. With no decisions made, the formula is unsatisfiable: propagation alone proved it.</p>`
        },
        {
          q: `<p>Encode "at most one of <em>x</em><sub>1</sub>, …, <em>x</em><sub>4</sub>" pairwise, and count the clauses. For <em>n</em> = 1,000 variables, how many clauses does the pairwise encoding need, and why might an encoder prefer another method for large <em>n</em>?</p>`,
          a: `<p>For four: [−1, −2], [−1, −3], [−1, −4], [−2, −3], [−2, −4], [−3, −4], six clauses = C(4, 2). For 1,000: C(1000, 2) = 499,500 clauses, quadratic in <em>n</em>. Encodings with auxiliary variables, such as the sequential counter in the notes, need only 3<em>n</em> − 4 = 2,996 clauses (and 999 new variables), so for large groups encoders trade extra variables for far fewer clauses, the same trade the Tseitin encoding makes.</p>`
        },
        {
          q: `<p>Three meetings, P, Q and R, must each go in one of two time slots, 1 and 2. P and Q share a person, and so do Q and R, so those pairs can't share a slot. Write clauses with variables p1, p2, q1, q2, r1, r2 ("the meeting is in slot 1 or 2") and find a satisfying assignment by unit propagation and one decision. Then add that P and R share a person, and explain why the formula becomes unsatisfiable.</p>`,
          a: `<p>Each meeting in exactly one slot: (p1 ∨ p2), (¬p1 ∨ ¬p2), and the same for q and r. Conflicts, one clause per slot: (¬p1 ∨ ¬q1), (¬p2 ∨ ¬q2), (¬q1 ∨ ¬r1), (¬q2 ∨ ¬r2). Nothing is unit at first, so decide p1 = true. Then (¬p1 ∨ ¬p2) forces p2 false, (¬p1 ∨ ¬q1) forces q1 false, (q1 ∨ q2) forces q2 true, (¬q2 ∨ ¬r2) forces r2 false, and (r1 ∨ r2) forces r1 true; every clause is satisfied: P and R in slot 1, Q in slot 2. Adding (¬p1 ∨ ¬r1) and (¬p2 ∨ ¬r2) makes the conflicts a triangle: three meetings pairwise in different slots need three slots, and only two exist (pigeonhole). Propagation shows it: deciding p1 now forces q1 and r1 false, so q2 and r2 true, and (¬q2 ∨ ¬r2) has both literals false, a conflict; deciding p1 false forces p2 true and fails the same way in slot 2, so <code>dpll</code> returns <code>None</code>.</p>`
        }
      ],
      sources: ["dpll62", "chaff01", "sipser", "clrs"]
    },
    {
      id: "fm3",
      title: "SMT, symbolic execution and bounded model checking",
      minutes: 90,
      summary: "SAT modulo theories: integers, bit-vectors and how a theory solver cooperates with a SAT solver; machine arithmetic and overflow; symbolic execution with path conditions; and bounded model checking by unrolling loops.",
      notes: `
<p>Questions about programs are about integers, arrays and memory, not just booleans. <strong>Satisfiability modulo theories</strong> (SMT) solvers accept formulas over richer <strong>theories</strong>: linear integer and real arithmetic, <strong>bit-vectors</strong> (fixed-width machine integers), arrays, and uninterpreted functions (symbols whose only known property is that equal inputs give equal outputs). Z3 (Microsoft Research, 2008) and cvc5 are widely used; they share the input language SMT-LIB, which uses s-expressions like CS 360's.</p>

<h3>Asking an SMT solver</h3>
<p>Is there an integer <em>x</em> with <em>x</em> = 2<em>y</em> and <em>y</em> + 10 &lt; <em>x</em>?</p>
<pre data-label="SMT-LIB"><code>(declare-const x Int)
(declare-const y Int)
(assert (= x (* 2 y)))
(assert (&lt; (+ y 10) x))
(check-sat)
(get-model)</code></pre>
<pre data-label="Output (Z3)"><code>sat
(
  (define-fun y () Int
    11)
  (define-fun x () Int
    22)
)</code></pre>
<p>The solver found a <strong>model</strong>, an assignment making every assertion true: 22 = 2 × 11 and 21 &lt; 22. Had the assertions contradicted each other, it would have printed <code>unsat</code>, a proof that no integers work. Unlike our brute-force searches below, that answer covers all integers.</p>
<p>How does it work? Most SMT solvers combine a CDCL SAT solver with a <strong>theory solver</strong>, an architecture called DPLL(<em>T</em>). Take <em>x</em> &gt; 3 ∧ (<em>x</em> &lt; 2 ∨ <em>y</em> = 1). The SAT solver sees only the <em>boolean skeleton</em>: <em>p</em> ∧ (<em>q</em> ∨ <em>r</em>), where <em>p</em>, <em>q</em> and <em>r</em> stand for the three atoms. Suppose it proposes <em>p</em> and <em>q</em> true. The theory solver for integer arithmetic checks whether <em>x</em> &gt; 3 and <em>x</em> &lt; 2 can hold together; they can't, so it hands back the clause (¬<em>p</em> ∨ ¬<em>q</em>), and the SAT solver learns it as it would learn from any conflict. Next it tries <em>p</em> and <em>r</em>, the theory solver finds <em>x</em> = 4, <em>y</em> = 1, and the answer is sat.</p>

<h3>Bit-vectors: arithmetic as the machine does it</h3>
<p>CS 210 Lesson 1 showed that machine arithmetic happens modulo 2<sup><em>w</em></sup>: in 8-bit two's complement, 127 + 1 is −128 (and in C, overflow of a signed <code>int</code> is undefined behaviour, which is worse). Mathematical integers don't wrap, so a proof about <code>Int</code> can be wrong about machine code. The bit-vector theory models machine words exactly:</p>
<pre data-label="SMT-LIB"><code>(declare-const x (_ BitVec 32))
(assert (not (bvsgt (bvadd x #x00000001) x)))   ; is x + 1 &gt; x ever false?
(check-sat)
(get-model)</code></pre>
<pre data-label="Output (Z3)"><code>sat
(
  (define-fun x () (_ BitVec 32)
    #x7fffffff)
)</code></pre>
<p>The sort <code>(_ BitVec 32)</code> is 32-bit words; in SMT-LIB, <code>(_ name n)</code> is an <em>indexed</em> name, a family of sorts or operators picked out by the number <em>n</em>, so <code>(_ BitVec 8)</code> is bytes. Constants are written in hexadecimal as <code>#x</code> followed by exactly <em>w</em>/4 hex digits (so <code>#x00000001</code> is the 32-bit 1), or in binary as <code>#b</code> followed by <em>w</em> bits, or as <code>(_ bv200 8)</code>, the decimal 200 as an 8-bit word. <code>bvadd</code> adds modulo 2<sup>32</sup>, and <code>bvsgt</code> compares as signed (two's complement) numbers. The solver found the one counterexample, 0x7fffffff. Solvers decide bit-vector formulas mostly by <strong>bit-blasting</strong>: each operation becomes a circuit (a 32-bit adder is CS 230 Lesson 2's ripple-carry chain of full adders), the circuit becomes CNF by Tseitin's encoding, and a SAT solver does the rest. At 8 bits, we can do the same search exhaustively in Python:</p>
<pre><code>W = 8
MASK = (1 &lt;&lt; W) - 1

def signed(v):
    return v - (1 &lt;&lt; W) if v &gt;&gt; (W - 1) else v

print(signed(0x7f), signed(0x80), signed(0xff), (0x7f + 1) &amp; MASK)   # 127 -128 -1 128

bad = [x for x in range(256) if not signed((x + 1) &amp; MASK) &gt; signed(x)]
print(bad)   # [127]</code></pre>
<p>A real bug of this kind: in 2006 Joshua Bloch reported that the binary search in Java's standard library, and the one in Jon Bentley's classic book, computed the midpoint as (<em>lo</em> + <em>hi</em>) / 2, which overflows once <em>lo</em> + <em>hi</em> exceeds the largest int, an array of over a billion elements. The fix is <em>lo</em> + (<em>hi</em> − <em>lo</em>) / 2. With unsigned 8-bit values:</p>
<pre><code>mid1 = lambda lo, hi: ((lo + hi) &amp; MASK) &gt;&gt; 1
mid2 = lambda lo, hi: (lo + (((hi - lo) &amp; MASK) &gt;&gt; 1)) &amp; MASK
pairs = [(lo, hi) for lo in range(256) for hi in range(lo, 256)]
wrong = [(lo, hi) for lo, hi in pairs if mid1(lo, hi) != mid2(lo, hi)]
print(len(pairs), len(wrong), wrong[0], mid1(*wrong[0]), mid2(*wrong[0]))   # 32896 16384 (1, 255) 0 128</code></pre>
<p>Half the pairs with <em>lo</em> ≤ <em>hi</em> give a wrong midpoint: every pair whose sum reaches 256. Exhaustive search works at 8 bits (32,896 pairs) and is hopeless at 32 or 64; a bit-vector solver answers at any width.</p>

<h3>Symbolic execution</h3>
<p>To apply a solver to a program we need formulas that describe the program's runs. Take a tiny imperative language, written as nested lists like CS 360's: expressions are integers, booleans, variable names, <code>[op, a, b]</code> and <code>["not", a]</code>; statements are <code>["set", x, e]</code>, <code>["if", c, then, else]</code>, <code>["while", c, body]</code> and <code>["assert", c]</code>; a program is a list of statements. Lesson 5 uses the same language.</p>
<pre><code>import itertools
import random

OPS = {"+": lambda a, b: a + b, "-": lambda a, b: a - b, "*": lambda a, b: a * b,
       "&lt;": lambda a, b: a &lt; b, "&lt;=": lambda a, b: a &lt;= b, "==": lambda a, b: a == b,
       "!=": lambda a, b: a != b, "and": lambda a, b: a and b, "or": lambda a, b: a or b}

def ev(e, env):
    match e:
        case bool() | int():
            return e
        case str():
            return env[e]
        case ["not", a]:
            return not ev(a, env)
        case [op, a, b]:
            return OPS[op](ev(a, env), ev(b, env))
    raise ValueError(f"bad expression {e!r}")

class AssertFailed(Exception):
    pass

def run(prog, env):
    env = dict(env)
    for s in prog:
        match s:
            case ["set", x, e]:
                env[x] = ev(e, env)
            case ["if", c, then, other]:
                env = run(then if ev(c, env) else other, env)
            case ["while", c, body]:
                while ev(c, env):
                    env = run(body, env)
            case ["assert", c]:
                if not ev(c, env):
                    raise AssertFailed(s)
    return env

P = [["set", "z", ["*", 2, "y"]],
     ["if", ["==", "z", "x"],
         [["if", ["&lt;", ["+", "y", 10], "x"], [["assert", False]], []]],
         []]]
print(run(P, {"x": 4, "y": 2}))   # {'x': 4, 'y': 2, 'z': 4}

rng = random.Random(1)
hits = 0
for _ in range(100000):
    try:
        run(P, {"x": rng.randint(-1000, 1000), "y": rng.randint(-1000, 1000)})
    except AssertFailed:
        hits += 1
print(hits)   # 14</code></pre>
<p>The <code>assert False</code> stands for a bug. 100,000 random inputs reach it 14 times. With 32-bit inputs it would essentially never be reached.</p>
<p><strong>Symbolic execution</strong> runs the program on symbols instead of numbers. The state maps each variable to an <em>expression</em> over the inputs, so after <code>z = 2 * y</code>, <em>z</em> is the expression 2 × <em>y</em>. At an <code>if</code>, execution splits in two, and each side records its assumption in a <strong>path condition</strong>: the conjunction of branch conditions that inputs must satisfy to follow this path. At an <code>assert</code>, one side is the failing path. Constants are folded as we go, so a condition that is already decided doesn't split the path.</p>
<pre><code>def subst(e, env):
    """Replace variables by their symbolic values, folding operations on constants."""
    match e:
        case bool() | int():
            return e
        case str():
            return env[e]
        case ["not", a]:
            a = subst(a, env)
            return (not a) if isinstance(a, (bool, int)) else ["not", a]
        case [op, a, b]:
            a, b = subst(a, env), subst(b, env)
            if isinstance(a, (bool, int)) and isinstance(b, (bool, int)):
                return OPS[op](a, b)
            return [op, a, b]

def neg(c):
    return (not c) if isinstance(c, bool) else ["not", c]

def add(pc, c):
    return pc if c is True else pc + [c]

def symex(prog, state, pc, k):
    """Yield (path condition, final state, outcome) for every path through prog.
    outcome is "ok", "fail" (an assertion fails) or "cut" (more than k loop iterations)."""
    if not prog:
        yield pc, state, "ok"
        return
    s, rest = prog[0], prog[1:]
    match s:
        case ["set", x, e]:
            yield from symex(rest, {**state, x: subst(e, state)}, pc, k)
        case ["if", c, then, other]:
            c = subst(c, state)
            if c is not False:
                yield from symex(then + rest, state, add(pc, c), k)
            if c is not True:
                yield from symex(other + rest, state, add(pc, neg(c)), k)
        case ["while", c, body]:
            c = subst(c, state)
            if c is not False:                      # one more iteration
                if k == 0:
                    yield add(pc, c), state, "cut"
                else:
                    yield from symex(body + [s] + rest, state, add(pc, c), k - 1)
            if c is not True:                       # leave the loop
                yield from symex(rest, state, add(pc, neg(c)), k)
        case ["assert", c]:
            c = subst(c, state)
            if c is not True:
                yield add(pc, neg(c)), state, "fail"
            if c is not False:
                yield from symex(rest, state, add(pc, c), k)

for pc, st, outcome in symex(P, {"x": "x", "y": "y"}, [], 5):
    print(outcome, pc)</code></pre>
<pre data-label="Output"><code>fail [['==', ['*', 2, 'y'], 'x'], ['&lt;', ['+', 'y', 10], 'x']]
ok [['==', ['*', 2, 'y'], 'x'], ['not', ['&lt;', ['+', 'y', 10], 'x']]]
ok [['not', ['==', ['*', 2, 'y'], 'x']]]</code></pre>
<p>Three paths. The failing one has path condition 2<em>y</em> = <em>x</em> ∧ <em>y</em> + 10 &lt; <em>x</em>, the SMT query at the start of the lesson. Solving each path condition gives one concrete test input per path. A real tool would ask an SMT solver; as a stand-in we try every value in a small range:</p>
<pre><code>def solve(pc, names, lo, hi):
    """A stand-in for an SMT solver: try every assignment of values in lo..hi."""
    for values in itertools.product(range(lo, hi + 1), repeat=len(names)):
        env = dict(zip(names, values))
        if all(ev(c, env) for c in pc):
            return env
    return None

for pc, st, outcome in symex(P, {"x": "x", "y": "y"}, [], 5):
    print(outcome, solve(pc, ["x", "y"], -30, 30))</code></pre>
<pre data-label="Output"><code>fail {'x': 22, 'y': 11}
ok {'x': -30, 'y': -15}
ok {'x': -30, 'y': -30}</code></pre>
<p>Three inputs cover every path, including the one random testing almost never finds. Tools such as KLEE (2008), which symbolically executes C programs after compiling them with LLVM (the compiler framework behind Clang), generated tests this way that found serious bugs in programs such as the GNU coreutils, which had been in use for years.</p>
<p>The obstacle is <strong>path explosion</strong>: <em>n</em> <code>if</code>s in a row can give 2<sup><em>n</em></sup> paths, and a loop whose bound depends on the input gives a path for every iteration count. Real tools prune infeasible paths early, merge similar states, and use heuristics to explore the paths most likely to reach new code.</p>

<h3>Bounded model checking</h3>
<p><code>symex</code> stops a path after <em>k</em> loop iterations in total, with outcome <code>"cut"</code>. Exploring every path up to that bound and asking whether any failing path is feasible is <strong>bounded model checking</strong> (BMC). Tools such as CBMC, for C, unroll each loop <em>k</em> times, encode all paths together as one formula, and ask a SAT or SMT solver whether an assertion can fail. Here the program sums 0 + 1 + ⋯ + (<em>n</em> − 1) and asserts the sum is never 10:</p>
<pre><code>S = [["set", "i", 0], ["set", "s", 0],
     ["while", ["&lt;", "i", "n"], [["set", "s", ["+", "s", "i"]], ["set", "i", ["+", "i", 1]]]],
     ["assert", ["!=", "s", 10]]]
for k in range(8):
    bad = [solve(pc, ["n"], -20, 20) for pc, st, outcome in symex(S, {"n": "n"}, [], k) if outcome == "fail"]
    print(k, [b for b in bad if b])</code></pre>
<pre data-label="Output"><code>0 []
1 []
2 []
3 []
4 []
5 [{'n': 5}]
6 [{'n': 5}]
7 [{'n': 5}]</code></pre>
<p>With bounds up to 4 the check passes; at bound 5 it finds <em>n</em> = 5, since 0 + 1 + 2 + 3 + 4 = 10. This is the strength and the limit of BMC. When it finds a bug, the bug is real and comes with an input that shows it. When it finds none, that holds only up to the bound: "no bug in 4 iterations" said nothing about 5. Proving a loop correct for every iteration count needs an invariant, the subject of Lesson 5.</p>
<p class="note">Why it matters: SMT solvers made checking programs practical. They answer the queries of symbolic executors, bounded model checkers and program verifiers alike, and Lesson 6 shows one answering a billion questions a day about cloud access policies.</p>
`,
      terms: [
        ["SMT", "Satisfiability modulo theories: satisfiability of formulas whose atoms come from theories such as integer arithmetic or bit-vectors."],
        ["Theory", "A set of symbols with fixed meanings, such as integers with + and <, or fixed-width bit-vectors."],
        ["SMT-LIB", "The standard input language for SMT solvers, written as s-expressions."],
        ["Model (in logic)", "An assignment of values that makes every assertion true; the solver's evidence for sat."],
        ["DPLL(T)", "An SMT architecture in which a SAT solver handles the boolean structure and a theory solver checks combinations of atoms."],
        ["Bit-vector", "A fixed-width machine integer, with arithmetic modulo 2^w and signed or unsigned comparisons."],
        ["Bit-blasting", "Deciding bit-vector formulas by turning each operation into a circuit and the circuit into CNF."],
        ["Symbolic execution", "Running a program on symbolic inputs, keeping each variable's value as an expression over them."],
        ["Path condition", "The conjunction of branch conditions an input must satisfy to follow a given path."],
        ["Path explosion", "The exponential growth of the number of paths with the number of branches and loop iterations."],
        ["Bounded model checking", "Checking all executions up to a bound (such as k loop iterations) by encoding them as a formula for a solver."],
        ["Unrolling", "Replacing a loop by k nested copies of its body guarded by its condition."]
      ],
      quiz: [
        { q: "What does an SMT solver's answer unsat mean for a set of integer assertions?", choices: ["No values in a small range work", "No integers at all satisfy them", "The solver timed out", "The assertions are all true"], answer: 1, why: "unsat is a proof over the whole theory, unlike a search of a small range." },
        { q: "In DPLL(T), what does the theory solver do when the SAT solver proposes x > 3 and x < 2 both true?", choices: ["Accepts them", "Reports that they conflict, giving a clause the SAT solver learns", "Changes x", "Restarts the SAT solver"], answer: 1, why: "It returns the clause (not p or not q), ruling out that combination." },
        { q: "For 8-bit signed values, for which x is x + 1 > x false?", choices: ["0", "-1", "127", "255"], answer: 2, why: "127 + 1 wraps to -128." },
        { q: "After symbolic execution of z = 2 * y, what is z?", choices: ["A random number", "The expression 2 * y over the input y", "0", "Undefined"], answer: 1, why: "Symbolic values are expressions over the inputs." },
        { q: "What is a path condition?", choices: ["The condition of the last if", "The conjunction of the branch conditions an input must satisfy to follow the path", "The loop bound", "The postcondition"], answer: 1, why: "Each branch taken adds its condition, or its negation, to the path condition." },
        { q: "Bounded model checking with k = 4 finds no failing assertion. What do you know?", choices: ["The program is correct", "No assertion fails in runs with at most 4 loop iterations", "The program has no loops", "An assertion fails at k = 5"], answer: 1, why: "BMC's guarantee holds only up to the bound." }
      ],
      practice: [
        {
          q: `<p>Write the SMT-LIB to ask whether two integers <em>a</em> and <em>b</em> exist with <em>a</em> + <em>b</em> = 10, <em>a</em> − <em>b</em> = 3. What answer should a solver give, and why?</p>`,
          a: `<pre data-label="SMT-LIB"><code>(declare-const a Int)
(declare-const b Int)
(assert (= (+ a b) 10))
(assert (= (- a b) 3))
(check-sat)</code></pre><p>Adding the equations gives 2<em>a</em> = 13, so <em>a</em> = 6.5, not an integer: the answer is <code>unsat</code>. Declared as <code>Real</code> instead, the answer would be <code>sat</code> with <em>a</em> = 13/2 and <em>b</em> = 7/2. The theory matters.</p>`
        },
        {
          q: `<p>Symbolically execute this program by hand, with inputs <em>a</em> and <em>b</em>, and list each path's condition and final value of <em>m</em>:</p><pre data-label="Python"><code>m = a
if m &lt; b:
    m = b
assert m &gt;= a and m &gt;= b</code></pre>`,
          a: `<p>Path 1: condition <em>a</em> &lt; <em>b</em>; <em>m</em> = <em>b</em>; the assertion is <em>b</em> ≥ <em>a</em> ∧ <em>b</em> ≥ <em>b</em>, which follows from the path condition, so the failing branch (<em>a</em> &lt; <em>b</em> ∧ ¬(<em>b</em> ≥ <em>a</em> ∧ <em>b</em> ≥ <em>b</em>)) is unsatisfiable. Path 2: condition ¬(<em>a</em> &lt; <em>b</em>), that is <em>a</em> ≥ <em>b</em>; <em>m</em> = <em>a</em>; the assertion <em>a</em> ≥ <em>a</em> ∧ <em>a</em> ≥ <em>b</em> follows. Both failing paths are infeasible, so no input fails the assertion, for all integers, not just a range: a solver would report unsat for each failing path condition.</p>`
        },
        {
          q: `<p>A function has 30 independent <code>if</code> statements in sequence and no loops. How many paths can it have? If a symbolic executor checks 10,000 paths a second, how long would all of them take?</p>`,
          a: `<p>Up to 2<sup>30</sup> = 1,073,741,824 paths. At 10,000 a second that is about 107,374 seconds, roughly 30 hours, for one function. This is path explosion; real tools prune paths whose condition is already unsatisfiable, merge states at the join after an <code>if</code> (putting the choice into the state as a formula), and summarize functions so that each is analysed once.</p>`
        },
        {
          q: `<p>The notes' BMC run first finds the bug at bound 5. Explain why bounds 0 to 4 find nothing, and why "the check passes for <em>k</em> = 4" does not show the assertion always holds.</p>`,
          a: `<p>After <em>j</em> iterations, <em>s</em> = 0 + 1 + ⋯ + (<em>j</em> − 1) = <em>j</em>(<em>j</em> − 1)/2, which is 0, 0, 1, 3, 6 for <em>j</em> = 0 to 4, never 10. Reaching <em>s</em> = 10 needs <em>j</em> = 5 iterations (and <em>n</em> = 5 so that the loop stops there), and paths with 5 iterations are cut at bound 4. BMC only examines runs within the bound, so passing at <em>k</em> = 4 says nothing about longer runs, as this example shows. Proving the assertion for all <em>n</em> would need an invariant (here, one would find it false, since <em>n</em> = 5 is a real counterexample).</p>`
        }
      ],
      sources: ["z3tacas08", "smtlib", "klee08", "bloch06"]
    },
    {
      id: "fm4",
      title: "Model checking concurrent systems",
      minutes: 90,
      summary: "Concurrent algorithms as state machines; explicit-state model checking by breadth-first search; safety properties and shortest counterexamples; deadlock; liveness, temporal logic and fairness in outline; state explosion; and TLA+.",
      notes: `
<p>CS 310 Lesson 4 tested mutual-exclusion algorithms by running two simulated threads under 1,000 random schedules: <code>FlagsOnly</code> failed in 542, Peterson's algorithm in none. Random schedules found the bug, but "none in 1,000" is not a proof that Peterson's algorithm is correct. A <strong>model checker</strong> explores <em>every</em> reachable state of a system and checks a property in each. For finite systems the answer is definite either way: the property holds in every reachable state, or here is a sequence of steps that breaks it.</p>

<h3>Systems as state machines</h3>
<p>A <strong>state</strong> is everything that determines what can happen next: each thread's program counter (which step it is at) and the shared variables. A <strong>transition</strong> is one atomic step of one thread. Exploring states rather than schedules is what makes exhaustive search possible: two threads running forever have infinitely many schedules, but if each has four program-counter values and the shared variables are two flags and a turn bit, there are at most 4 × 4 × 2 × 2 × 2 = 128 states, and different schedules reaching the same state need to be explored from it only once.</p>
<p>We write each algorithm as a function from a state to its list of successor states. A state is <code>(pc, flag, turn)</code>, where <code>pc</code> and <code>flag</code> are pairs. A thread waiting at a loop is modelled as having no step until its condition allows one, so a state where no thread can step is a <strong>deadlock</strong>.</p>
<pre><code>from collections import deque

def check(init, successors, invariant):
    """Breadth-first search of every reachable state.
    Returns ("ok", number of states), ("violation", trace) or ("deadlock", trace)."""
    parent = {init: None}
    queue = deque([init])
    while queue:
        s = queue.popleft()
        if not invariant(s):
            return "violation", path(parent, s)
        nexts = successors(s)
        if not nexts:
            return "deadlock", path(parent, s)
        for t in nexts:
            if t not in parent:
                parent[t] = s
                queue.append(t)
    return "ok", len(parent)

def path(parent, s):
    trace = []
    while s is not None:
        trace.append(s)
        s = parent[s]
    return trace[::-1]

def set_(t, i, v):        # tuple t with position i replaced by v
    return t[:i] + (v,) + t[i + 1:]

def flags_only(s):
    pc, flag, turn = s
    out = []
    for i in (0, 1):
        j = 1 - i
        if pc[i] == 0 and not flag[j]:        # wait until the other's flag is down
            out.append((set_(pc, i, 1), flag, turn))
        elif pc[i] == 1:                      # raise my flag, enter
            out.append((set_(pc, i, 2), set_(flag, i, True), turn))
        elif pc[i] == 2:                      # critical section; leave and lower my flag
            out.append((set_(pc, i, 0), set_(flag, i, False), turn))
    return out

def peterson(s):
    pc, flag, turn = s
    out = []
    for i in (0, 1):
        j = 1 - i
        if pc[i] == 0:                        # flag[i] = True
            out.append((set_(pc, i, 1), set_(flag, i, True), turn))
        elif pc[i] == 1:                      # turn = j
            out.append((set_(pc, i, 2), flag, j))
        elif pc[i] == 2 and not (flag[j] and turn == j):   # wait, then enter
            out.append((set_(pc, i, 3), flag, turn))
        elif pc[i] == 3:                      # leave: flag[i] = False
            out.append((set_(pc, i, 0), set_(flag, i, False), turn))
    return out

init = ((0, 0), (False, False), 0)
print(check(init, peterson, lambda s: not (s[0][0] == 3 and s[0][1] == 3)))   # ('ok', 20)
r = check(init, flags_only, lambda s: not (s[0][0] == 2 and s[0][1] == 2))
print(r[0], len(r[1]) - 1)   # violation 4
for s in r[1]:
    print(s)</code></pre>
<pre data-label="Output"><code>((0, 0), (False, False), 0)
((1, 0), (False, False), 0)
((1, 1), (False, False), 0)
((2, 1), (True, False), 0)
((2, 2), (True, True), 0)</code></pre>
<p><code>deque</code>, from <code>collections</code>, is a queue with fast removal from the front (CS 102 used it for queues). Peterson's algorithm has 20 reachable states, and mutual exclusion (in the code, "not both program counters at 3, the critical section") holds in all of them: a proof by exhaustion, for this model. Mutual exclusion is a <strong>safety property</strong>, "something bad never happens", and it was checked as an invariant of every reachable state.</p>
<p>For <code>FlagsOnly</code> the checker returns a <strong>counterexample trace</strong>, a sequence of states from the start to a bad one. Read it: thread 0 sees flag[1] down and passes its check; thread 1 sees flag[0] down and passes its check; thread 0 raises its flag and enters; thread 1 does the same. Breadth-first search visits states in order of distance from the start, so the trace is a shortest one, 4 steps here. Short traces are easy to understand, which is much of why model checkers are useful.</p>

<h3>Finding bugs in variants</h3>
<p>Does the order of Peterson's two writes matter? Swap them: write <code>turn = j</code> first, then raise the flag. The checker answers in a few milliseconds with a 6-step trace: thread 0 sets turn = 1; thread 1 sets turn = 0; thread 1 raises its flag and, seeing flag[0] still down, enters; thread 0 raises its flag and checks "flag[1] and turn == 1", which is false because turn is 0, so it enters too. Raising flags first and only then checking, without <code>turn</code>, deadlocks instead: both raise their flags and each waits for the other's to fall, a state with no successors, which <code>check</code> reports as <code>"deadlock"</code> after 2 steps. These are exactly the variants CS 310 described in prose; the model checker finds each failure and shows it. In the first programming problem you write the checker yourself, and its tests run it on <code>peterson</code> and on both variants (written as successor functions like those above), expecting these traces.</p>

<h3>Liveness and temporal logic</h3>
<p>Safety is not enough: an algorithm that never lets anyone into the critical section is perfectly safe. A <strong>liveness property</strong> says "something good eventually happens", such as "a thread that wants to enter eventually enters". Properties over whole runs are written in <strong>linear temporal logic</strong> (LTL), introduced by Amir Pnueli in 1977. Its operators talk about the sequence of states in a run:</p>
<table>
<tr><th>Formula</th><th>Meaning on a run</th></tr>
<tr><td>G <em>p</em></td><td><em>p</em> holds in every state from now on (globally)</td></tr>
<tr><td>F <em>p</em></td><td><em>p</em> holds now or in some later state (finally)</td></tr>
<tr><td>X <em>p</em></td><td><em>p</em> holds in the next state</td></tr>
<tr><td><em>p</em> U <em>q</em></td><td><em>p</em> holds until a state where <em>q</em> holds, which does come</td></tr>
</table>
<p>"Now" counts: a formula is judged at a position in the run and looks at that state and the ones after it, so F <em>p</em> is true in a state where <em>p</em> already holds, and G (wait<sub>0</sub> → F cs<sub>0</sub>) is not broken by a thread that is already in.</p>
<p>Mutual exclusion is G ¬(cs<sub>0</sub> ∧ cs<sub>1</sub>). Starvation-freedom for thread 0 is G (wait<sub>0</sub> → F cs<sub>0</sub>): whenever it is waiting, it later gets in. Here wait<sub>0</sub> means thread 0 has raised its flag but not yet entered (pc 1 or 2 in <code>peterson</code>) and cs<sub>0</sub> means it is in the critical section (pc 3). A counterexample to a liveness property can't be a finite trace, since "not yet" might become "later". It is a <strong>lasso</strong>: a path to some state, followed by a cycle back to it in which the good thing never happens, which can repeat forever.</p>
<p>The programming problem's <code>find_lasso</code> looks for a reachable cycle that avoids every "good" state: a counterexample to G F good, "good holds again and again". Starvation-freedom fits this form. In this model a waiting thread stops waiting only by entering, so G (wait<sub>0</sub> → F cs<sub>0</sub>) fails exactly when some run has thread 0 waiting forever from some point on: a lasso whose cycle avoids every state where thread 0 is not waiting. So <code>find_lasso</code> with good = "thread 0 is not waiting" checks starvation-freedom, and for <code>peterson</code> it finds no lasso. The reason: while thread 0's flag is up, thread 1 blocks at its loop as soon as it sets turn to 0 itself, so it can enter at most once after thread 0 has set turn, and once thread 1 is blocked thread 0's step is the only one left, so every run takes it. That is the bounded-waiting argument of CS 310 Lesson 4, found by search.</p>
<p>(Running <code>find_lasso</code> with good = cs<sub>0</sub> instead does find a lasso: thread 0 stays at pc 0 forever, never trying to enter, while thread 1 goes round and round. That run is legal, since a thread may never want the critical section, and it doesn't break starvation-freedom, because wait<sub>0</sub> never holds on it. It breaks only G F cs<sub>0</sub>, which is the wrong property to ask for.)</p>
<p>Liveness usually also needs <strong>fairness</strong> assumptions. Our search needed none, but only because of two modelling choices: a waiting thread has no step, and a run keeps stepping while any step is possible. Change either and starvation appears. If spinning at the loop were a step that changes nothing, <code>find_lasso</code> would find a one-state cycle in which thread 0 spins forever while thread 1, ready to set turn, is never run. In TLA+ (below), a behaviour may take "stuttering" steps that change nothing, so it may stop for ever just after thread 0 raises its flag. Real schedulers rule out both: they run every ready thread eventually. <strong>Weak fairness</strong> of an action (a kind of step, such as "thread 1 sets turn") says: if it is enabled from some point on forever, it is eventually taken. Model checkers check liveness only over the runs that satisfy the fairness the specification states, while <code>find_lasso</code> assumes none and so may report lassos that fairness would exclude. Choose fairness with care: it should make a thread that has started trying keep going, but it must not force an idle thread to try.</p>

<h3>State explosion</h3>
<p>The number of states grows exponentially with the number of components: <em>n</em> threads with 4 program-counter values each give up to 4<sup><em>n</em></sup> combinations before counting variables, and every variable's range multiplies the total. This <strong>state explosion</strong> is the central problem of model checking, attacked from several directions:</p>
<ul>
<li><strong>Symmetry reduction</strong>: states that differ only by renaming identical threads are explored once.</li>
<li><strong>Partial-order reduction</strong>: when two steps touch nothing in common, both orders lead to the same state, and only one order needs exploring.</li>
<li><strong>Symbolic model checking</strong>: representing huge sets of states as formulas rather than one at a time, using binary decision diagrams (a compact form of boolean functions; Ken McMillan's 1992 thesis applied them to model checking) or SAT queries. Bounded model checking (Lesson 3) is one form.</li>
<li><strong>Abstraction</strong>: checking a smaller model whose behaviours include the real system's, such as 3 servers and 2 clients rather than thousands.</li>
</ul>
<p>Edmund Clarke, Allen Emerson and Joseph Sifakis shared the 2007 Turing Award for founding model checking in the early 1980s. Small models find most bugs: a bug that needs a thousand servers to show itself is rare, while one that needs three is common.</p>

<h3>TLA+</h3>
<p>Industrial model checking usually starts from a specification language rather than code. In Leslie Lamport's <strong>TLA+</strong>, a system is an initial-state predicate <code>Init</code> and a next-state relation <code>Next</code>, a formula relating each variable's value now to its value after one step, written with a prime (<code>flag'</code>). Here is Peterson's algorithm, the same model as <code>peterson</code> above (this code was not run here):</p>
<pre data-label="TLA+"><code>---------------------------- MODULE Peterson ----------------------------
VARIABLES pc, flag, turn
vars == &lt;&lt;pc, flag, turn&gt;&gt;
Other(i) == 1 - i

Init == /\\ pc = [i \\in {0, 1} |-&gt; "idle"]
        /\\ flag = [i \\in {0, 1} |-&gt; FALSE]
        /\\ turn = 0

Raise(i)   == /\\ pc[i] = "idle"
              /\\ flag' = [flag EXCEPT ![i] = TRUE]
              /\\ pc' = [pc EXCEPT ![i] = "setturn"]
              /\\ UNCHANGED turn
SetTurn(i) == /\\ pc[i] = "setturn"
              /\\ turn' = Other(i)
              /\\ pc' = [pc EXCEPT ![i] = "wait"]
              /\\ UNCHANGED flag
Enter(i)   == /\\ pc[i] = "wait"
              /\\ ~(flag[Other(i)] /\\ turn = Other(i))
              /\\ pc' = [pc EXCEPT ![i] = "cs"]
              /\\ UNCHANGED &lt;&lt;flag, turn&gt;&gt;
Leave(i)   == /\\ pc[i] = "cs"
              /\\ flag' = [flag EXCEPT ![i] = FALSE]
              /\\ pc' = [pc EXCEPT ![i] = "idle"]
              /\\ UNCHANGED turn

Next == \\E i \\in {0, 1} : Raise(i) \\/ SetTurn(i) \\/ Enter(i) \\/ Leave(i)
Fairness == \\A i \\in {0, 1} : WF_vars(SetTurn(i) \\/ Enter(i) \\/ Leave(i))
Spec == Init /\\ [][Next]_vars /\\ Fairness

MutualExclusion == ~(pc[0] = "cs" /\\ pc[1] = "cs")
StarvationFree  == \\A i \\in {0, 1} : (pc[i] \\in {"setturn", "wait"}) ~&gt; (pc[i] = "cs")
=========================================================================</code></pre>
<p><code>==</code> defines a name (it is not a test; equality is a single <code>=</code>). <code>/\\</code> is ∧, <code>\\/</code> is ∨, <code>~</code> is ¬, <code>\\E</code> is ∃ and <code>\\A</code> is ∀. <code>&lt;&lt;pc, flag, turn&gt;&gt;</code> is a tuple. <code>[i \\in {0, 1} |-&gt; "idle"]</code> is a function (TLA+'s arrays are functions) mapping each <em>i</em> in {0, 1} to "idle", like the Python dict <code>{i: "idle" for i in (0, 1)}</code>. <code>[flag EXCEPT ![i] = TRUE]</code> is the function <code>flag</code> with entry <em>i</em> changed, like the Python dict <code>{**flag, i: True}</code>. <code>UNCHANGED turn</code> means <code>turn' = turn</code>: an action must say what happens to every variable, since one it leaves out could take any new value, and <code>vars</code> collects them all for <code>Spec</code>. Each action, such as <code>Enter(i)</code>, is a conjunction: a guard on the current state (it is enabled only when <code>pc[i] = "wait"</code> and the condition allows) and the new values. <code>Spec</code> says: start in <code>Init</code>, and always (<code>[]</code>, TLA+'s G) take a <code>Next</code> step or a stuttering step that leaves the variables unchanged, under <code>Fairness</code>. <code>WF_vars(A)</code> is weak fairness of action <code>A</code>, so <code>Fairness</code> makes each thread's steps other than <code>Raise</code> weakly fair: a thread that has raised its flag keeps going whenever it can, while an idle thread may stay idle forever. (<code>WF_vars(Next)</code> alone would promise only that <em>some</em> step is taken while one is enabled, not that thread 0's is. For Peterson's algorithm that happens to be enough, by the bounded-waiting argument above, but per-thread fairness says what we mean and doesn't depend on that argument.) <code>P ~&gt; Q</code>, "P leads to Q", is G (P → F Q), so <code>StarvationFree</code> is starvation-freedom for both threads. The model checker TLC explores the states breadth-first, as our <code>check</code> does, checks the invariant <code>MutualExclusion</code> in each, and prints a shortest trace if one fails; it checks the liveness property <code>StarvationFree</code> over the behaviours that satisfy <code>Fairness</code>, printing a lasso if one fails. Raft (CS 410 Lesson 4) was specified in TLA+ by its designer, and Amazon's engineers use it for their services (the sidebar).</p>
<p class="note">Why it matters: concurrent and distributed algorithms fail in interleavings nobody thinks to test. A model checker examines all of them in a small model, and its counterexample is a step-by-step explanation of the bug.</p>
`,
      terms: [
        ["Model checking", "Checking a property of a system by exhaustively exploring its reachable states."],
        ["State", "Everything that determines a system's future: program counters and the values of variables."],
        ["Transition", "One atomic step of the system, from a state to a successor state."],
        ["Reachable state", "A state that some sequence of transitions leads to from an initial state."],
        ["Safety property", "A property saying something bad never happens; violated by a finite trace."],
        ["Liveness property", "A property saying something good eventually happens; violated only by an infinite run."],
        ["Counterexample trace", "A sequence of states from an initial state to one that violates the property."],
        ["Deadlock (in a model)", "A reachable, non-final state with no successors."],
        ["Linear temporal logic (LTL)", "A logic of properties of runs, with operators G (always), F (eventually), X (next) and U (until)."],
        ["Lasso", "A path to a state followed by a cycle back to it: the form of a liveness counterexample."],
        ["Weak fairness", "The assumption that a step enabled continuously from some point on is eventually taken."],
        ["State explosion", "The exponential growth of the number of states with the number of components and variables."],
        ["TLA+", "Lamport's specification language, describing a system by an initial-state predicate and a next-state relation."],
        ["TLC", "The explicit-state model checker for TLA+ specifications."]
      ],
      quiz: [
        { q: "Why can a model checker explore every run of two threads that loop forever, when there are infinitely many schedules?", choices: ["It samples randomly", "It explores states, and there are finitely many; schedules reaching the same state are explored from it once", "It runs for a fixed time", "It only checks the first 1,000 steps"], answer: 1, why: "The state space is finite even though runs are infinite." },
        { q: "Why is the counterexample trace from breadth-first search a shortest one?", choices: ["BFS visits states in order of their distance from the initial state", "BFS is always faster", "It sorts the trace", "Because there is only one trace"], answer: 0, why: "The first bad state dequeued is at the smallest possible depth, and the parent links give a path of that length." },
        { q: "Which is a liveness property?", choices: ["Two threads are never both in the critical section", "The balance is never negative", "A thread that wants to enter eventually enters", "The queue never holds more than 10 items"], answer: 2, why: "It says something good eventually happens; the others are safety properties." },
        { q: "What does the LTL formula G (wait → F cs) say?", choices: ["The thread is always in the critical section", "Whenever the thread is waiting, it is later in the critical section", "The thread waits forever", "The thread enters next step"], answer: 1, why: "G is always and F is eventually." },
        { q: "What form does a counterexample to a liveness property take?", choices: ["A single bad state", "A lasso: a path to a state and a cycle that never reaches the good state", "A deadlock", "An empty trace"], answer: 1, why: "An infinite run of a finite system must eventually repeat a cycle." },
        { q: "In TLA+, what does flag' mean in an action?", choices: ["The derivative of flag", "The value of flag in the next state", "A comment", "The old value of flag"], answer: 1, why: "Primed variables refer to the state after the step." }
      ],
      practice: [
        {
          q: `<p>Before running the checker, bound the number of states of the Peterson model: each <code>pc</code> takes 4 values, each flag 2 and <code>turn</code> 2. Why does the checker find only 20 reachable states?</p>`,
          a: `<p>At most 4 × 4 × 2 × 2 × 2 = 128 states. Most aren't reachable because the variables are tied to the program counters: flag[<em>i</em>] is true exactly when thread <em>i</em> is past its first step (pc 1, 2 or 3), so the flags are determined by the pcs, leaving 4 × 4 × 2 = 32 combinations of pcs and <code>turn</code>. The rest are ruled out by <code>turn</code>. If thread <em>i</em> has written <code>turn</code> (pc 2 or 3) and the other thread hasn't yet (pc 0 or 1), the last write was thread <em>i</em>'s, so <code>turn</code> = 1 − <em>i</em>: that removes one value from each of the 8 such pc pairs. When one thread is in the critical section and the other waits, the waiting one must have written <code>turn</code> last (otherwise the first couldn't have entered), removing one value from each of (2, 3) and (3, 2). Both at pc 3 removes 2 more. 32 − 8 − 2 − 2 = 20, as the checker found.</p>`
        },
        {
          q: `<p>The swapped variant writes <code>turn = j</code> before raising its flag. Explain in your own words, step by step, how both threads get into the critical section.</p>`,
          a: `<p>Thread 0 writes turn = 1. Thread 1 writes turn = 0. Thread 1 raises flag[1]. Thread 1 checks "flag[0] and turn == 0": flag[0] is still down, so it enters. Thread 0 raises flag[0]. Thread 0 checks "flag[1] and turn == 1": flag[1] is up but turn is 0, so it enters too. The fault: thread 1 checked thread 0's flag before thread 0 raised it, and thread 0's earlier write to <code>turn</code> had already been overwritten in its favour. In the correct order, raising the flag first guarantees that whichever thread writes <code>turn</code> last sees the other's flag.</p>`
        },
        {
          q: `<p>Classify each as a safety or liveness property, and write it in LTL with atomic propositions of your choice: (a) a request is always eventually answered; (b) the system never has two leaders; (c) once a transaction commits, it stays committed.</p>`,
          a: `<p>(a) Liveness: G (request → F answered). (b) Safety: G ¬two_leaders, or G (leaders ≤ 1). (c) Safety: G (committed → G committed); a violation is a finite trace that reaches committed and then a state where it is false. A useful test: if every violation can be shown by a finite prefix, it is a safety property.</p>`
        },
        {
          q: `<p>A system has 5 identical threads, each with 6 program-counter values, and a shared counter from 0 to 9. Bound the number of states. How much can symmetry reduction save at most, and why can't it save that much in general?</p>`,
          a: `<p>At most 6<sup>5</sup> × 10 = 7,776 × 10 = 77,760 states. Symmetry identifies states that differ only by permuting the identical threads, so at best each class of 5! = 120 states shrinks to one, about 648 states. It saves less in general because states where several threads have the same program counter have fewer distinct permutations (all 5 at the same pc has just 1), so their classes are smaller than 120. The exact count is the number of multisets of 5 pc values times 10: C(10, 5) × 10 = 252 × 10 = 2,520 classes.</p>`
        }
      ],
      sources: ["clarke09", "pnueli77", "tlaplus", "peterson81", "ostep"]
    },
    {
      id: "fm5",
      title: "Hoare logic and program proofs",
      minutes: 90,
      summary: "Hoare triples; the rules for assignment, sequence, conditionals and loops; weakest preconditions and a calculator for them; loop invariants, verification conditions and variants; and what a verifier such as Dafny automates.",
      notes: `
<p>Bounded model checking (Lesson 3) checks runs up to a bound. To show a program is correct for <em>every</em> input, including loops of every length, we need a proof. This lesson's method is C. A. R. Hoare's 1969 logic of programs, which turns a program and its specification into ordinary logical formulas whose validity is the program's correctness.</p>

<h3>Hoare triples</h3>
<p>A <strong>Hoare triple</strong> {<em>P</em>} <em>S</em> {<em>Q</em>} says: if <em>S</em> starts in a state where the precondition <em>P</em> holds, and <em>S</em> finishes, then the postcondition <em>Q</em> holds in the final state. Examples, with true and false ones:</p>
<ul>
<li>{<em>x</em> = 5} <code>x = x + 1</code> {<em>x</em> = 6}: true.</li>
<li>{<em>x</em> &gt; 0} <code>x = x - 1</code> {<em>x</em> ≥ 0}: true for integers.</li>
<li>{true} <code>x = x * x</code> {<em>x</em> &gt; 0}: false: <em>x</em> = 0 stays 0.</li>
<li>{true} <code>while x != 0: x = x - 1</code> {<em>x</em> = 0}: true! If the loop finishes, its condition is false, so <em>x</em> = 0. It doesn't finish when <em>x</em> starts negative, and the triple says nothing about runs that don't finish.</li>
</ul>
<p>That last example shows the difference between <strong>partial correctness</strong> (if it finishes, the result is right), which triples express, and <strong>total correctness</strong> (it finishes, and the result is right), which needs a termination argument as well; the end of the lesson adds one.</p>

<h3>The rules</h3>
<p>Hoare logic has one rule per kind of statement, written as inference rules like CS 360 Lesson 1's: if the premises above the line hold, so does the conclusion below.</p>
<pre data-label="Rules"><code>  ────────────────────── (assign)
  {Q[x := e]}  x = e  {Q}

  {P} S1 {R}    {R} S2 {Q}                 {P ∧ c} S1 {Q}    {P ∧ ¬c} S2 {Q}
  ──────────────────────── (seq)           ────────────────────────────────── (if)
       {P} S1; S2 {Q}                         {P} if c: S1 else: S2 {Q}

  P ⇒ P'    {P'} S {Q'}    Q' ⇒ Q                  {I ∧ c} S {I}
  ──────────────────────────────── (consequence)   ─────────────────────────── (while)
            {P} S {Q}                              {I} while c: S {I ∧ ¬c}</code></pre>
<p>The <strong>assignment rule</strong> runs backwards. <em>Q</em>[<em>x</em> := <em>e</em>] means <em>Q</em> with every <em>x</em> replaced by <em>e</em>, substitution as in CS 360 Lesson 2. Whatever <em>Q</em> says about <em>x</em> after <code>x = e</code>, it must have said about <em>e</em> before. For {?} <code>x = x + 1</code> {<em>x</em> &gt; 5}: replace <em>x</em> by <em>x</em> + 1 to get <em>x</em> + 1 &gt; 5, that is <em>x</em> &gt; 4. The forward version "{<em>P</em>} <code>x = e</code> {<em>P</em> ∧ <em>x</em> = <em>e</em>}" is wrong: from {true} <code>x = x + 1</code> it would conclude <em>x</em> = <em>x</em> + 1, which is false, because the <em>x</em> on the right meant the old value.</p>
<p>The <strong>while rule</strong> is the heart of it. <em>I</em> is a <strong>loop invariant</strong>: if the body preserves <em>I</em> whenever the condition is true, then after any number of iterations <em>I</em> still holds, and when the loop exits the condition is false as well. It is induction on the number of iterations (MATH 120 Lesson 6) packaged as a rule. The <strong>consequence rule</strong> lets us strengthen preconditions and weaken postconditions using ordinary logic.</p>

<h3>Weakest preconditions</h3>
<p>Edsger Dijkstra (1975) made the rules mechanical. The <strong>weakest precondition</strong> wp(<em>S</em>, <em>Q</em>) is the condition on the starting state that guarantees <em>S</em> ends in <em>Q</em>, and is implied by every other such condition. Then {<em>P</em>} <em>S</em> {<em>Q</em>} holds exactly when <em>P</em> ⇒ wp(<em>S</em>, <em>Q</em>). For loop-free code wp is computed by the rules read backwards:</p>
<ul>
<li>wp(<code>x = e</code>, <em>Q</em>) = <em>Q</em>[<em>x</em> := <em>e</em>];</li>
<li>wp(<em>S</em><sub>1</sub>; <em>S</em><sub>2</sub>, <em>Q</em>) = wp(<em>S</em><sub>1</sub>, wp(<em>S</em><sub>2</sub>, <em>Q</em>)): work from the last statement back;</li>
<li>wp(<code>if c: S1 else: S2</code>, <em>Q</em>) = (<em>c</em> ⇒ wp(<em>S</em><sub>1</sub>, <em>Q</em>)) ∧ (¬<em>c</em> ⇒ wp(<em>S</em><sub>2</sub>, <em>Q</em>));</li>
<li>wp(<code>assert c</code>, <em>Q</em>) = <em>c</em> ∧ <em>Q</em>.</li>
</ul>
<p>Here is a calculator for Lesson 3's language, with <code>"=&gt;"</code> added for implication. <code>show</code> prints an expression in ordinary notation, fully parenthesized.</p>
<pre><code>import itertools

OPS = {"+": lambda a, b: a + b, "-": lambda a, b: a - b, "*": lambda a, b: a * b,
       "&lt;": lambda a, b: a &lt; b, "&lt;=": lambda a, b: a &lt;= b, "==": lambda a, b: a == b,
       "!=": lambda a, b: a != b, "and": lambda a, b: a and b, "or": lambda a, b: a or b,
       "=&gt;": lambda a, b: (not a) or b}

def ev(e, env):
    match e:
        case bool() | int():
            return e
        case str():
            return env[e]
        case ["not", a]:
            return not ev(a, env)
        case [op, a, b]:
            return OPS[op](ev(a, env), ev(b, env))

def show(e):
    match e:
        case bool() | int() | str():
            return str(e)
        case ["not", a]:
            return f"(not {show(a)})"
        case [op, a, b]:
            return f"({show(a)} {op} {show(b)})"

def sub(e, x, r):
    """e with every occurrence of the variable x replaced by the expression r: e[x := r]."""
    match e:
        case str() if e == x:
            return r
        case bool() | int() | str():
            return e
        case [op, *args]:
            return [op] + [sub(a, x, r) for a in args]

def wp(prog, Q, vcs):
    """Weakest precondition of a statement list; side conditions of loops go into vcs."""
    for s in reversed(prog):
        match s:
            case ["set", x, e]:
                Q = sub(Q, x, e)
            case ["if", c, then, other]:
                Q = ["and", ["=&gt;", c, wp(then, Q, vcs)], ["=&gt;", ["not", c], wp(other, Q, vcs)]]
            case ["assert", c]:
                Q = ["and", c, Q]
            case ["while", c, inv, body]:
                vcs.append(["=&gt;", ["and", inv, c], wp(body, inv, vcs)])   # the body preserves inv
                vcs.append(["=&gt;", ["and", inv, ["not", c]], Q])          # inv and exit give Q
                Q = inv
    return Q

prog = [["set", "y", ["*", "x", 2]], ["set", "x", ["+", "y", 1]]]
print(show(wp(prog, ["&lt;", 7, "x"], [])))   # (7 &lt; ((x * 2) + 1))
swap = [["set", "t", "x"], ["set", "x", "y"], ["set", "y", "t"]]
print(show(wp(swap, ["and", ["==", "x", "b"], ["==", "y", "a"]], [])))   # ((y == b) and (x == a))</code></pre>
<p>In the first, working backwards from 7 &lt; <em>x</em>: <code>x = y + 1</code> gives 7 &lt; <em>y</em> + 1, then <code>y = x * 2</code> gives 7 &lt; <em>x</em> × 2 + 1, which simplifies to <em>x</em> &gt; 3. The swap's wp says: to end with <em>x</em> = <em>b</em> and <em>y</em> = <em>a</em>, start with <em>y</em> = <em>b</em> and <em>x</em> = <em>a</em>, which proves the swap swaps.</p>
<p>To check <em>P</em> ⇒ wp(<em>S</em>, <em>Q</em>) a real verifier asks an SMT solver (Lesson 3) whether its negation is satisfiable. As before, we stand in with a search over a small range, which can find counterexamples but proves nothing:</p>
<pre><code>def variables(e):
    match e:
        case str():
            return {e}
        case bool() | int():
            return set()
        case [_, *args]:
            return set().union(*map(variables, args))

def counterexample(e, lo=-6, hi=6):
    """Search for values in lo..hi that make e false. A stand-in for an SMT solver."""
    names = sorted(variables(e))
    for values in itertools.product(range(lo, hi + 1), repeat=len(names)):
        env = dict(zip(names, values))
        if not ev(e, env):
            return env
    return None

absval = [["if", ["&lt;", "x", 0], [["set", "y", ["-", 0, "x"]]], [["set", "y", "x"]]]]
print(counterexample(wp(absval, ["&lt;=", 0, "y"], [])))   # None
print(counterexample(["=&gt;", True, wp([["set", "x", ["*", "x", "x"]]], ["&lt;", 0, "x"], [])]))   # {'x': 0}</code></pre>

<h3>Loops: invariants and verification conditions</h3>
<p>A loop has no finite wp formula in general, so the programmer supplies the invariant, and the loop rule becomes checkable conditions. In the calculator a loop is <code>["while", c, inv, body]</code>, and wp returns <em>I</em> as the loop's precondition while adding two <strong>verification conditions</strong> (VCs): <em>I</em> ∧ <em>c</em> ⇒ wp(body, <em>I</em>) (the body preserves the invariant) and <em>I</em> ∧ ¬<em>c</em> ⇒ <em>Q</em> (on exit, the invariant gives what follows). With a third, <em>P</em> ⇒ wp(program, <em>Q</em>) (the invariant holds on entry), the program is proved when all are valid.</p>
<p>Take division by repeated subtraction: given <em>x</em> ≥ 0 and <em>y</em> &gt; 0, compute <em>q</em> and <em>r</em> with <em>x</em> = <em>q</em> × <em>y</em> + <em>r</em> and 0 ≤ <em>r</em> &lt; <em>y</em>. The invariant is the postcondition without its last part: <em>x</em> = <em>q</em> × <em>y</em> + <em>r</em> ∧ 0 ≤ <em>r</em>. The loop keeps the equation balanced (taking <em>y</em> from <em>r</em> and adding 1 to <em>q</em>) and stops when <em>r</em> &lt; <em>y</em>.</p>
<pre><code>DIV = [["set", "q", 0], ["set", "r", "x"],
       ["while", ["&lt;=", "y", "r"], ["and", ["==", "x", ["+", ["*", "q", "y"], "r"]], ["&lt;=", 0, "r"]],
        [["set", "r", ["-", "r", "y"]], ["set", "q", ["+", "q", 1]]]]]
pre = ["and", ["&lt;=", 0, "x"], ["&lt;", 0, "y"]]
post = ["and", ["==", "x", ["+", ["*", "q", "y"], "r"]], ["and", ["&lt;=", 0, "r"], ["&lt;", "r", "y"]]]
vcs = []
w = wp(DIV, post, vcs)
for v in [["=&gt;", pre, w]] + vcs:
    print(show(v))
    print("   ", counterexample(v))</code></pre>
<pre data-label="Output"><code>(((0 &lt;= x) and (0 &lt; y)) =&gt; ((x == ((0 * y) + x)) and (0 &lt;= x)))
    None
((((x == ((q * y) + r)) and (0 &lt;= r)) and (y &lt;= r)) =&gt; ((x == (((q + 1) * y) + (r - y))) and (0 &lt;= (r - y))))
    None
((((x == ((q * y) + r)) and (0 &lt;= r)) and (not (y &lt;= r))) =&gt; ((x == ((q * y) + r)) and ((0 &lt;= r) and (r &lt; y))))
    None</code></pre>
<p>Read each VC as plain algebra. Entry: with <em>q</em> = 0 and <em>r</em> = <em>x</em>, <em>x</em> = 0 × <em>y</em> + <em>x</em> and 0 ≤ <em>x</em>. Preservation: (<em>q</em> + 1)<em>y</em> + (<em>r</em> − <em>y</em>) = <em>qy</em> + <em>r</em> = <em>x</em>, and <em>y</em> ≤ <em>r</em> gives 0 ≤ <em>r</em> − <em>y</em>. Exit: ¬(<em>y</em> ≤ <em>r</em>) is <em>r</em> &lt; <em>y</em>. All three are valid for all integers; the search finds no counterexample, and Z3 proves each one. If the invariant is too weak, say just <em>x</em> = <em>q</em> × <em>y</em> + <em>r</em>, the exit VC fails, with a counterexample such as <em>q</em> = −6, <em>r</em> = −6, <em>x</em> = −6, <em>y</em> = 0. That state is never reached, but the invariant doesn't rule it out, so it can't carry the proof. A usable invariant must be <em>inductive</em>: strong enough that it alone, with the loop condition, implies itself after one more iteration.</p>
<p>Finding invariants is the creative part. Common starting points: weaken the postcondition (as here, dropping <em>r</em> &lt; <em>y</em>), replace a constant by a variable (for summing to <em>n</em>, "<em>s</em> is the sum up to <em>i</em>"), and add bounds on the loop counter.</p>

<h3>Termination: variants</h3>
<p>For total correctness, give a <strong>variant</strong>: an integer expression <em>V</em> that is ≥ 0 whenever the loop body is about to run, and strictly smaller after each iteration. An integer can't decrease forever while staying ≥ 0, so the loop stops. For division, <em>V</em> = <em>r</em>. The VCs are <em>I</em> ∧ <em>c</em> ⇒ 0 ≤ <em>V</em> and "the body makes <em>V</em> smaller". To state the second with wp, give the value of <em>V</em> before the body a name, a fresh variable <em>v</em><sub>0</sub> that the body doesn't touch. The body must end in a state where <em>V</em> &lt; <em>v</em><sub>0</sub>, so it must start in wp(body, <em>V</em> &lt; <em>v</em><sub>0</sub>); and it starts with <em>v</em><sub>0</sub> equal to <em>V</em>, so substitute <em>V</em> for <em>v</em><sub>0</sub> in the result: <em>I</em> ∧ <em>c</em> ⇒ wp(body, <em>V</em> &lt; <em>v</em><sub>0</sub>)[<em>v</em><sub>0</sub> := <em>V</em>]. (Substituting first would give wp(body, <em>V</em> &lt; <em>V</em>), which is false: the two <em>V</em>s are taken in different states.) For division, wp(<em>r</em> := <em>r</em> − <em>y</em>; <em>q</em> := <em>q</em> + 1, <em>r</em> &lt; <em>v</em><sub>0</sub>) = <em>r</em> − <em>y</em> &lt; <em>v</em><sub>0</sub>, and substituting gives <em>r</em> − <em>y</em> &lt; <em>r</em>. So the VCs are <em>I</em> ∧ <em>c</em> ⇒ 0 ≤ <em>r</em> (true by the invariant) and <em>I</em> ∧ <em>c</em> ⇒ <em>r</em> − <em>y</em> &lt; <em>r</em>, which needs <em>y</em> &gt; 0. Our invariant doesn't mention <em>y</em>, so the second VC fails at <em>y</em> = 0, and rightly so: a loop with <em>y</em> = 0 runs forever. The precondition says <em>y</em> &gt; 0 and the loop never changes <em>y</em>, so adding 0 &lt; <em>y</em> to the invariant fixes the proof. The second programming problem generates these VCs too.</p>

<h3>Verifiers</h3>
<p>Program verifiers automate everything above except the invariants. In Dafny, a language from Microsoft Research, the specification and annotations are part of the code, and the compiler refuses a program whose VCs Z3 can't prove (this code was not run here):</p>
<pre data-label="Dafny"><code>method Divide(x: int, y: int) returns (q: int, r: int)
  requires 0 &lt;= x &amp;&amp; 0 &lt; y
  ensures x == q * y + r &amp;&amp; 0 &lt;= r &lt; y
{
  q, r := 0, x;
  while y &lt;= r
    invariant x == q * y + r &amp;&amp; 0 &lt;= r
    decreases r
  {
    r, q := r - y, q + 1;
  }
}</code></pre>
<p><code>requires</code> and <code>ensures</code> are the pre- and postcondition, <code>invariant</code> and <code>decreases</code> the invariant and variant. Dafny knows that a parameter such as <code>y</code> never changes, so it keeps 0 &lt; <code>y</code> inside the loop without our writing it. Delete the invariant's 0 ≤ <code>r</code> and Dafny reports that it can't prove the postcondition, the same failure as our exit VC.</p>
<p class="note">Why it matters: Hoare logic is how "this loop is correct" becomes something a machine can check. Invariants are also the best documentation a loop can have: they say what the loop knows at every step.</p>
`,
      terms: [
        ["Hoare triple", "{P} S {Q}: if S starts in a state satisfying P and finishes, the final state satisfies Q."],
        ["Partial correctness", "Correctness of the results of runs that finish, saying nothing about runs that don't."],
        ["Total correctness", "Partial correctness plus termination from every state satisfying the precondition."],
        ["Assignment rule", "{Q[x := e]} x = e {Q}: the precondition is the postcondition with e substituted for x."],
        ["Consequence rule", "A triple stays valid when its precondition is strengthened or its postcondition weakened."],
        ["Weakest precondition", "wp(S, Q): the weakest condition on the starting state guaranteeing that S ends in a state satisfying Q."],
        ["Loop invariant", "A condition true before a loop and preserved by its body whenever the loop condition holds."],
        ["Inductive invariant", "An invariant that, with the loop condition, implies itself after one more iteration, without other facts."],
        ["Verification condition", "A logical formula whose validity is part of a program's correctness proof."],
        ["Variant", "An integer expression that is nonnegative before each iteration and strictly decreases, proving termination."],
        ["Program verifier", "A tool that generates verification conditions from an annotated program and proves them with a solver."]
      ],
      quiz: [
        { q: "Is {x > 0} x = x - 1 {x >= 0} valid for integers?", choices: ["Yes", "No, x could become -1", "Only for x = 1", "It depends on termination"], answer: 0, why: "wp is x - 1 >= 0, that is x >= 1, which x > 0 implies for integers." },
        { q: "What is wp(x = x + 2, x > 10)?", choices: ["x > 10", "x > 8", "x > 12", "x + 2 = 10"], answer: 1, why: "Substitute x + 2 for x: x + 2 > 10, that is x > 8." },
        { q: "Why is {true} while x != 0: x = x - 1 {x = 0} a valid triple?", choices: ["The loop always terminates", "Triples only promise the postcondition for runs that finish, and on exit x != 0 is false", "x starts at 0", "It isn't valid"], answer: 1, why: "It is partial correctness: from a negative x the loop never ends, and the triple says nothing then." },
        { q: "Which verification condition shows that a loop body preserves the invariant I?", choices: ["P ⇒ I", "I ∧ c ⇒ wp(body, I)", "I ∧ ¬c ⇒ Q", "I ⇒ c"], answer: 1, why: "Starting from I with the condition true, the body must re-establish I." },
        { q: "With invariant x == q*y + r alone, the exit VC for division fails. Why is that a problem even though the counterexample state is never reached?", choices: ["It isn't a problem", "The proof may only use the invariant and the loop condition, and the invariant doesn't rule that state out", "The program has a bug", "The search range is too small"], answer: 1, why: "An invariant must be strong enough to carry the proof by itself." },
        { q: "What does a variant prove?", choices: ["The postcondition", "That the loop terminates", "That the invariant holds on entry", "That the program has no overflow"], answer: 1, why: "A nonnegative integer that strictly decreases each iteration can't decrease forever." }
      ],
      practice: [
        {
          q: `<p>Compute wp(<code>x = x + y; y = x - y; x = x - y</code>, <em>x</em> = <em>b</em> ∧ <em>y</em> = <em>a</em>) by hand, and say what it shows about this swap without a temporary variable. Does it hold for 32-bit integers too?</p>`,
          a: `<p>Work backwards. After <code>x = x - y</code>: (<em>x</em> − <em>y</em> = <em>b</em>) ∧ (<em>y</em> = <em>a</em>). After <code>y = x - y</code>, substitute <em>x</em> − <em>y</em> for <em>y</em>: (<em>x</em> − (<em>x</em> − <em>y</em>) = <em>b</em>) ∧ (<em>x</em> − <em>y</em> = <em>a</em>), that is (<em>y</em> = <em>b</em>) ∧ (<em>x</em> − <em>y</em> = <em>a</em>). After <code>x = x + y</code>, substitute <em>x</em> + <em>y</em> for <em>x</em>: (<em>y</em> = <em>b</em>) ∧ (<em>x</em> + <em>y</em> − <em>y</em> = <em>a</em>), that is <em>y</em> = <em>b</em> ∧ <em>x</em> = <em>a</em>. So it swaps for mathematical integers. For 32-bit integers, <em>x</em> + <em>y</em> may overflow, but two's complement arithmetic is arithmetic modulo 2<sup>32</sup>, where the same algebra holds, so it still swaps in Java or with C's unsigned types. In C, signed overflow is undefined behaviour, so the proof doesn't carry over there: the semantics of the language matters (Lesson 3's bit-vectors).</p>`
        },
        {
          q: `<p>Find a loop invariant and a variant for this program, which computes <em>s</em> = <em>n</em>(<em>n</em> − 1)/2 for <em>n</em> ≥ 0, and check the three VCs by hand:</p><pre data-label="Python"><code>i = 0
s = 0
while i &lt; n:
    s = s + i
    i = i + 1</code></pre>`,
          hint: `<p>Replace the constant <em>n</em> in the postcondition 2<em>s</em> = <em>n</em>(<em>n</em> − 1) by the variable <em>i</em>, and add a bound on <em>i</em>.</p>`,
          a: `<p>Invariant <em>I</em>: 2<em>s</em> = <em>i</em>(<em>i</em> − 1) ∧ <em>i</em> ≤ <em>n</em>. Entry: <em>i</em> = <em>s</em> = 0 gives 0 = 0 × (−1), and 0 ≤ <em>n</em> by the precondition. Preservation: assume <em>I</em> and <em>i</em> &lt; <em>n</em>; afterwards 2(<em>s</em> + <em>i</em>) = <em>i</em>(<em>i</em> − 1) + 2<em>i</em> = <em>i</em>(<em>i</em> + 1) = (<em>i</em> + 1)((<em>i</em> + 1) − 1), and <em>i</em> + 1 ≤ <em>n</em> because <em>i</em> &lt; <em>n</em>. Exit: <em>i</em> ≤ <em>n</em> and ¬(<em>i</em> &lt; <em>n</em>) give <em>i</em> = <em>n</em>, so 2<em>s</em> = <em>n</em>(<em>n</em> − 1). Variant <em>n</em> − <em>i</em>: it is ≥ 0 when <em>i</em> &lt; <em>n</em>, and each iteration lowers it by 1. Without <em>i</em> ≤ <em>n</em> the exit VC fails: <em>i</em> could have jumped past <em>n</em>.</p>`
        },
        {
          q: `<p>Explain why the forward assignment rule {<em>P</em>} <code>x = e</code> {<em>P</em> ∧ <em>x</em> = <em>e</em>} is unsound, using {<em>x</em> = 3} <code>x = x * 2</code>. What is the correct postcondition, and how does wp confirm it?</p>`,
          a: `<p>The forward rule gives {<em>x</em> = 3} <code>x = x * 2</code> {<em>x</em> = 3 ∧ <em>x</em> = <em>x</em> × 2}, which says <em>x</em> = 3 and <em>x</em> = 0 at once: false, though the program is fine. The trouble is that <em>P</em> and <em>e</em> refer to the old value of <em>x</em> while the postcondition is about the new one. The correct postcondition is <em>x</em> = 6. wp(<code>x = x * 2</code>, <em>x</em> = 6) is <em>x</em> × 2 = 6, that is <em>x</em> = 3, exactly the precondition, so the triple {<em>x</em> = 3} <code>x = x * 2</code> {<em>x</em> = 6} holds. (Floyd's forward rule renames the old value: {<em>P</em>} <code>x = e</code> {∃<em>x</em><sub>0</sub>. <em>P</em>[<em>x</em> := <em>x</em><sub>0</sub>] ∧ <em>x</em> = <em>e</em>[<em>x</em> := <em>x</em><sub>0</sub>]}.)</p>`
        },
        {
          q: `<p>Give a variant for Euclid's algorithm on positive integers, <code>while b != 0: a, b = b, a % b</code>, and justify both variant conditions. What precondition do you need?</p>`,
          a: `<p>Variant <em>b</em>. Precondition: <em>a</em> ≥ 0 and <em>b</em> ≥ 0 (as integers), kept as an invariant: <em>b</em> ≥ 0 and <em>a</em> ≥ 0 hold afterwards because the new <em>a</em> is the old <em>b</em> ≥ 0 and the new <em>b</em> is <em>a</em> mod <em>b</em>, which lies in [0, <em>b</em> − 1] for <em>b</em> &gt; 0. Bounded: <em>b</em> ≥ 0 by the invariant. Decreasing: when the body runs, <em>b</em> ≠ 0, so <em>b</em> &gt; 0, and the new value <em>a</em> mod <em>b</em> &lt; <em>b</em>. So the loop stops, after at most <em>b</em> iterations (in fact O(log <em>b</em>), by MATH 121 Lesson 4's halving argument).</p>`
        }
      ],
      sources: ["hoare69", "dijkstra75", "floyd67", "dafny", "softwarefoundations"]
    },
    {
      id: "fm6",
      title: "Proof assistants and verification in practice",
      minutes: 90,
      summary: "Propositions as types and proofs as programs; a proof checker built from a type checker; Lean proofs read line by line; certificates that let small checkers trust big solvers; seL4, CompCert and Amazon's automated reasoning; and what verification costs and leaves out.",
      notes: `
<p>Lesson 5's proofs rested on a solver proving verification conditions. Who checks the solver, and what about properties too rich for automatic tools? A <strong>proof assistant</strong> (MATH 120 had an optional lesson on them; this lesson assumes nothing from it) checks every step of a proof against a small set of rules. Its foundation is a surprising fact: checking a proof and checking the type of a program are the same activity.</p>

<h3>Propositions as types</h3>
<p>In CS 360 Lesson 5, a function of type <em>A</em> → <em>B</em> turns any value of type <em>A</em> into one of type <em>B</em>. Read <em>A</em> and <em>B</em> as propositions and a value as evidence: a function turning evidence for <em>A</em> into evidence for <em>B</em> is exactly a proof that <em>A</em> implies <em>B</em>. This is the <strong>Curry–Howard correspondence</strong>, noticed by Haskell Curry in the 1930s and William Howard in 1969:</p>
<table>
<tr><th>Logic</th><th>Programs</th></tr>
<tr><td>proposition</td><td>type</td></tr>
<tr><td>proof</td><td>program (term) of that type</td></tr>
<tr><td><em>A</em> ⇒ <em>B</em></td><td>function type <em>A</em> → <em>B</em></td></tr>
<tr><td><em>A</em> ∧ <em>B</em></td><td>pair type: a value of <em>A</em> and a value of <em>B</em></td></tr>
<tr><td><em>A</em> ∨ <em>B</em></td><td>tagged union: a value of <em>A</em> tagged "left", or of <em>B</em> tagged "right"</td></tr>
<tr><td>False</td><td>the empty type, with no values</td></tr>
<tr><td>checking a proof</td><td>type checking</td></tr>
</table>
<p>¬<em>A</em> is defined as <em>A</em> ⇒ False: a function that would turn evidence for <em>A</em> into something that can't exist. Here is a checker, structural recursion in the style of CS 360's, for terms written as lists. <code>["lam", x, A, body]</code> is a function with parameter <em>x</em> of type <em>A</em>; <code>["case", e, x, e1, y, e2]</code> takes evidence for <em>A</em> ∨ <em>B</em> and handles each side; <code>["absurd", e, C]</code> turns evidence of False into anything, since there is none.</p>
<pre><code>def infer(term, env):
    match term:
        case str():
            if term not in env:
                raise TypeError(f"unbound variable {term}")
            return env[term]
        case ["lam", x, A, body]:
            return ["-&gt;", A, infer(body, {**env, x: A})]
        case ["app", f, a]:
            tf, ta = infer(f, env), infer(a, env)
            if not (isinstance(tf, list) and tf[0] == "-&gt;" and tf[1] == ta):
                raise TypeError("bad application")
            return tf[2]
        case ["pair", a, b]:
            return ["and", infer(a, env), infer(b, env)]
        case ["fst", p] | ["snd", p]:
            tp = infer(p, env)
            if not (isinstance(tp, list) and tp[0] == "and"):
                raise TypeError("not a pair")
            return tp[1] if term[0] == "fst" else tp[2]
        case ["inl", a, B]:
            return ["or", infer(a, env), B]
        case ["inr", A, b]:
            return ["or", A, infer(b, env)]
        case ["case", e, x, e1, y, e2]:
            te = infer(e, env)
            if not (isinstance(te, list) and te[0] == "or"):
                raise TypeError("not a sum")
            c1, c2 = infer(e1, {**env, x: te[1]}), infer(e2, {**env, y: te[2]})
            if c1 != c2:
                raise TypeError("branches differ")
            return c1
        case ["absurd", e, C]:
            if infer(e, env) != "False":
                raise TypeError("absurd needs False")
            return C
    raise TypeError(f"not a term: {term!r}")

AB, BC = ["-&gt;", "A", "B"], ["-&gt;", "B", "C"]
compose = ["lam", "f", AB, ["lam", "g", BC, ["lam", "a", "A", ["app", "g", ["app", "f", "a"]]]]]
print(infer(compose, {}))   # ['-&gt;', ['-&gt;', 'A', 'B'], ['-&gt;', ['-&gt;', 'B', 'C'], ['-&gt;', 'A', 'C']]]
swap = ["lam", "p", ["and", "A", "B"], ["pair", ["snd", "p"], ["fst", "p"]]]
print(infer(swap, {}))   # ['-&gt;', ['and', 'A', 'B'], ['and', 'B', 'A']]
notA = ["-&gt;", "A", "False"]
print(infer(["lam", "a", "A", ["lam", "k", notA, ["app", "k", "a"]]], {}))   # ['-&gt;', 'A', ['-&gt;', ['-&gt;', 'A', 'False'], 'False']]</code></pre>
<p>Function composition is a proof that implication is transitive; swapping a pair proves <em>A</em> ∧ <em>B</em> ⇒ <em>B</em> ∧ <em>A</em>; and the third term proves <em>A</em> ⇒ ¬¬<em>A</em>: given <em>a</em>, and a supposed refutation <em>k</em> of <em>A</em>, applying <em>k</em> to <em>a</em> gives False. A wrong "proof" fails to type-check, and <code>infer</code> raises <code>TypeError</code>.</p>
<p>Some classical tautologies have no term at all. Excluded middle, <em>A</em> ∨ ¬<em>A</em>, would need a program that, knowing nothing about <em>A</em>, produces either evidence for <em>A</em> or a refutation of it. This logic is <strong>constructive</strong>: a proof of "<em>A</em> or <em>B</em>" must say which. Proof assistants based on it either work constructively or add excluded middle as an axiom, as Lean's library does.</p>

<h3>Lean</h3>
<p>Lean (the syntax used here is explained below) extends this with <strong>dependent types</strong>, types that mention values, so that "for every natural number <em>n</em>, <em>P</em>(<em>n</em>)" is the type of a function taking <em>n</em> and returning evidence for <em>P</em>(<em>n</em>). Proofs can be written as terms, exactly as above, or with <strong>tactics</strong>, commands that build the term step by step (this code was not run here):</p>
<pre data-label="Lean 4"><code>-- Terms: the same proofs as the Python ones
theorem and_swap (p q : Prop) (h : p ∧ q) : q ∧ p := ⟨h.2, h.1⟩
theorem imp_trans (p q r : Prop) (hpq : p → q) (hqr : q → r) : p → r :=
  fun hp =&gt; hqr (hpq hp)

-- Tactics: induction, with Lean checking each step
theorem zero_add_left (n : Nat) : 0 + n = n := by
  induction n with
  | zero =&gt; rfl
  | succ k ih =&gt; exact congrArg Nat.succ ih</code></pre>
<p>Reading the syntax: <code>theorem name (args) : T := proof</code> declares that <code>proof</code> has type <code>T</code>, given the arguments, each written <code>(name : type)</code> like a typed function parameter. <code>Prop</code> is the type of propositions, so <code>(p q : Prop)</code> says "for any propositions <em>p</em> and <em>q</em>", and <code>(h : p ∧ q)</code> is evidence for <em>p</em> ∧ <em>q</em>. <code>fun hp =&gt; e</code> is a function with parameter <code>hp</code> and body <code>e</code>, Python's <code>lambda hp: e</code> and our <code>"lam"</code>; applying a function is written by juxtaposition, <code>hpq hp</code> for <code>hpq(hp)</code>. In <code>and_swap</code>, <code>h.2</code> and <code>h.1</code> are <code>snd</code> and <code>fst</code>, and <code>⟨…, …⟩</code> is <code>pair</code>. <code>imp_trans</code> is <code>compose</code>. <code>by</code> switches from writing a term to giving tactics. The third proves 0 + <em>n</em> = <em>n</em> by induction on <em>n</em>. The <code>induction</code> tactic asks for a base case and an inductive step, each case written <code>| zero =&gt; …</code> or <code>| succ k ih =&gt; …</code>, where <code>k</code> is the number the step starts from and <code>ih</code> names the inductive hypothesis; <code>rfl</code> closes a goal that holds by computation, and <code>exact e</code> closes the goal with the term <code>e</code>. Both rely on how Lean defines addition, by recursion on the second argument: <em>n</em> + 0 = <em>n</em> and <em>n</em> + (<em>k</em> + 1) = (<em>n</em> + <em>k</em>) + 1. So the base case, 0 + 0 = 0, is the first equation, and <code>rfl</code> accepts it. In the step, the goal 0 + (<em>k</em> + 1) = <em>k</em> + 1 computes, by the second equation, to (0 + <em>k</em>) + 1 = <em>k</em> + 1, that is, <code>Nat.succ (0 + k) = Nat.succ k</code>, where <code>Nat.succ</code> is the successor function, <em>k</em> ↦ <em>k</em> + 1. <code>congrArg f h</code> turns evidence <code>h</code> for <em>a</em> = <em>b</em> into evidence for <em>f a</em> = <em>f b</em>, so <code>congrArg Nat.succ ih</code> turns the hypothesis <code>0 + k = k</code> into exactly that, and <code>exact</code> accepts it because Lean compares types after computing them. Behind the tactics, Lean builds a term and a small <strong>kernel</strong> type-checks it. Only the kernel must be trusted, a design principle called the <strong>de Bruijn criterion</strong>: however clever the tactics or the AI that suggests them, a wrong proof is rejected.</p>

<h3>Certificates: trusting big tools with small checkers</h3>
<p>The same principle applies to solvers. When a SAT solver says "satisfiable", its assignment is a <strong>certificate</strong> anyone can check in linear time (CS 220's definition of NP). When it says "unsatisfiable", modern solvers output a proof: a list of learned clauses, each following from the formula and the earlier ones by unit propagation, ending with the empty clause. A clause <em>C</em> "follows by unit propagation" (it is a <strong>RUP</strong> clause, for reverse unit propagation) if assuming every literal of <em>C</em> false and running Lesson 2's <code>unit_propagate</code> on the clauses so far reaches a conflict: then no assignment can satisfy those clauses with <em>C</em> false, so adding <em>C</em> is safe. In Lesson 2's <code>G</code>, the learned clause [−1] passes: assuming <em>x</em><sub>1</sub> true propagates to a conflict, exactly the trace shown there. The empty clause passes when propagation alone, with nothing assumed, conflicts. A checker for such proofs is a page of code, much easier to trust than a solver of tens of thousands of lines, and some checkers have themselves been verified in proof assistants. The SAT competition requires proofs for unsatisfiable answers, and the second programming problem writes a checker.</p>

<h3>Verification in practice</h3>
<ul>
<li><strong>seL4</strong> (2009) is an operating-system microkernel with a machine-checked proof, in the Isabelle/HOL proof assistant, that its 8,700 lines of C implement its specification, ruling out buffer overflows, null-pointer dereferences and similar bugs. The proof is about 200,000 lines, and the project took about 25 person-years, including building tools. Later proofs carried the guarantee down to the compiled binary and up to security properties. seL4 runs in defence and aviation systems.</li>
<li><strong>CompCert</strong> is a C compiler, led by Xavier Leroy and written and proved in Coq, whose proof says the machine code behaves as the source program does. In 2011 the Csmith project generated random C programs and reported more than 325 bugs in GCC, LLVM and other compilers; in CompCert it found bugs only in unverified parts, and as of early 2011 it was the only compiler tested in which Csmith found no wrong-code errors.</li>
<li><strong>Amazon Web Services</strong> uses TLA+ to check the designs of its distributed services (Lesson 4's sidebar) and SMT solvers for security. Its Zelkova tool translates access-control policies into SMT formulas to answer questions like "can anyone outside my account read this storage bucket?"; by 2022 AWS reported running about a billion SMT queries a day.</li>
<li>Hardware makers verify floating-point units and cache protocols formally (Lesson 3's sidebar), and cryptographic libraries in major browsers include code generated from verified sources.</li>
</ul>

<h3>Costs and limits</h3>
<p>A proof is only as good as its assumptions. What it proves is the <em>specification</em>, and a wrong specification gives a correct proof of the wrong thing. It relies on a <strong>trusted computing base</strong>: the proof checker, the model of the language and of the hardware, and whatever was assumed rather than proved (seL4's original proof assumed a correct compiler, assembly code and hardware). And it costs: seL4's 200,000 lines of proof for 8,700 lines of C took years of expert work, and every change to the code needs the proof repaired. Donald Knuth ended a 1977 memo with the warning: "Beware of bugs in the above code; I have only proved it correct, not tried it."</p>
<p>So practice is a portfolio, chosen by risk. Specifications and property-based tests cost little and catch much. Model checking a design finds the subtle interleavings before code exists. SMT-based tools check particular properties of real code automatically. Full proof is reserved for small cores where failure is unacceptable and the code changes rarely: kernels, compilers, cryptography, and the checkers that check everything else.</p>
<p class="note">Why it matters: as programs grow and more code is written by machines, trust must come from somewhere. A small checked core, whether a proof kernel, a certificate checker or a verified compiler, lets everything built on it be trusted without trusting its authors.</p>
`,
      terms: [
        ["Proof assistant", "Software that checks formal proofs step by step against the rules of a logic."],
        ["Curry–Howard correspondence", "The identification of propositions with types and proofs with programs, so that checking a proof is type checking."],
        ["Constructive logic", "Logic in which a proof of A or B must establish which, and excluded middle is not assumed."],
        ["Dependent type", "A type that depends on a value, such as a type of proofs about a particular number n."],
        ["Tactic", "A command in a proof assistant that builds part of a proof term, such as induction."],
        ["Kernel", "The small core of a proof assistant that checks proof terms; the only part that must be trusted."],
        ["de Bruijn criterion", "The design principle that a proof system's correctness should rest on a small, independently checkable core."],
        ["Certificate", "Evidence produced by a solver, such as a satisfying assignment or an unsatisfiability proof, that a simple checker can verify."],
        ["Trusted computing base", "Everything a verification result relies on without proving: checker, models, compilers and hardware."],
        ["seL4", "An operating-system microkernel with a machine-checked proof that its C code implements its specification."],
        ["CompCert", "A C compiler with a Coq proof that its output behaves as the source program does."]
      ],
      quiz: [
        { q: "Under Curry–Howard, what is a proof of A ⇒ B?", choices: ["A value of type A", "A function from A to B", "A pair of A and B", "A test that passes"], answer: 1, why: "A function turns any evidence for A into evidence for B." },
        { q: "What corresponds to A ∧ B?", choices: ["A function type", "A pair type", "The empty type", "A union type"], answer: 1, why: "Evidence for both is a pair of evidence for each." },
        { q: "Why has the term-checker no term of type A ∨ (A → False)?", choices: ["It has a bug", "Its logic is constructive: a term must produce evidence for one side, and nothing about A says which", "Disjunction isn't supported", "False has values"], answer: 1, why: "Excluded middle isn't provable constructively; Lean's library adds it as an axiom." },
        { q: "What must be trusted when Lean accepts a proof built by tactics?", choices: ["Every tactic", "The person who wrote it", "The small kernel that checks the final proof term", "The AI that suggested it"], answer: 2, why: "That is the de Bruijn criterion: tactics only build the term." },
        { q: "What did the 2011 Csmith study find about CompCert?", choices: ["More bugs than in GCC", "Bugs only in unverified parts, and no wrong-code errors in the version tested in early 2011", "It couldn't compile C", "It was never tested"], answer: 1, why: "Hundreds of bugs were found in other compilers, none in CompCert's verified core." },
        { q: "seL4's proof shows the C code implements its specification. Which is still a risk?", choices: ["Buffer overflows in the verified C", "Null-pointer dereferences in the verified C", "A mistake in the specification or in the assumptions, such as the hardware", "Type errors"], answer: 2, why: "A proof covers what was specified and proved, relative to its trusted base." }
      ],
      practice: [
        {
          q: `<p>Write a proof term, in the notes' notation, for (<em>A</em> ⇒ <em>B</em>) ⇒ (¬<em>B</em> ⇒ ¬<em>A</em>) (contraposition), and say in words what the program does.</p>`,
          a: `<p><code>["lam", "f", ["-&gt;", "A", "B"], ["lam", "nb", ["-&gt;", "B", "False"], ["lam", "a", "A", ["app", "nb", ["app", "f", "a"]]]]]</code>. Its type is (<em>A</em> → <em>B</em>) → ((<em>B</em> → False) → (<em>A</em> → False)), which is the proposition, since ¬<em>X</em> is <em>X</em> → False. In words: given a way <em>f</em> to turn <em>A</em> into <em>B</em>, and a refutation <em>nb</em> of <em>B</em>, refute <em>A</em> by taking any supposed <em>a</em>, turning it into a <em>B</em> with <em>f</em>, and feeding that to <em>nb</em>. It is function composition again.</p>`
        },
        {
          q: `<p>The converse, (¬<em>B</em> ⇒ ¬<em>A</em>) ⇒ (<em>A</em> ⇒ <em>B</em>), is a classical tautology. Try to write a term for it, and explain where you get stuck.</p>`,
          a: `<p>We'd write <code>["lam", "g", ..., ["lam", "a", "A", ?]]</code> and need a term of type <em>B</em> at <code>?</code>. We have <em>a</em> : <em>A</em> and <em>g</em> : (<em>B</em> → False) → (<em>A</em> → False). From <em>g</em> we can only get False if we already have a refutation of <em>B</em>, and nothing produces evidence for <em>B</em> itself: there is no term. Classically you'd argue "suppose not <em>B</em>; then not <em>A</em>, contradicting <em>a</em>; so <em>B</em>", but that last step, from ¬¬<em>B</em> to <em>B</em>, is double-negation elimination, equivalent to excluded middle. With it as an axiom, the proof goes through.</p>`
        },
        {
          q: `<p>A SAT solver prints "UNSAT" for a formula with 10,000 clauses and gives no proof. A second solver prints "UNSAT" and a 2 GB proof file, which a 300-line checker accepts. Which answer do you trust more, and what must you still trust in the second case?</p>`,
          a: `<p>The second. The first answer rests on the solver's tens of thousands of lines being bug-free; solvers have had bugs that gave wrong UNSAT answers. The second rests only on the checker (300 lines, which can be read, tested and even verified), on the proof file's being checked against the right formula, and on the encoding of the original problem into CNF being correct. The size of the proof doesn't matter, as long as the checker finishes. The encoding is the part many people forget: a correct proof about the wrong formula proves the wrong thing.</p>`
        },
        {
          q: `<p>Your team writes the control software for a medical infusion pump: about 5,000 lines, rarely changed, where a wrong dose can kill. Another team writes a photo-sharing web app that changes daily. Propose a verification portfolio for each, naming specific methods from this course and why.</p>`,
          a: `<p>Infusion pump: precise specifications of dose limits and states first; a model of the control state machine checked with a model checker (TLA+ or similar) for safety (never exceed the maximum rate) and liveness (an alarm is always eventually raised on occlusion); verification of the core dosing code in a verifier such as Dafny or a proof assistant, since the code is small, stable and critical; property-based tests of the rest, plus testing on the hardware, since proofs assume a model of it. Photo app: specifications for key functions, property-based and stateful tests (cheap, keep up with daily change), SMT-based checks of access policies (who can see a photo, the Zelkova idea), and perhaps a model check of any tricky concurrent or distributed protocol. Full proofs would be repaired every day and aren't worth it there.</p>`
        }
      ],
      sources: ["wadler15", "leanbook", "klein09", "leroy09", "yang11", "rungta22", "sel4"]
    }
  ]
});

CSA.addAsides("cs450", {
  fm2: [
    { kind: "history", title: "From Davis–Putnam to a 200-terabyte proof", html: `<p>In 1960 Martin Davis and Hilary Putnam proposed a procedure for satisfiability as part of an automatic theorem prover. It eliminated variables one at a time and could exhaust a computer's memory, so in 1962 Davis, George Logemann and Donald Loveland replaced elimination with backtracking search plus unit propagation: DPLL. For thirty years it changed little. Then João Marques-Silva and Karem Sakallah's GRASP (1996) learned clauses from conflicts, and Chaff (2001), from Princeton, made learning fast with watched literals and the VSIDS heuristic, speeding solvers up by orders of magnitude on industrial formulas. In 2016 Marijn Heule, Oliver Kullmann and Victor Marek used a SAT solver to settle the Boolean Pythagorean triples problem: the numbers 1 to 7,824 can be coloured red and blue with no monochromatic triple <em>a</em><sup>2</sup> + <em>b</em><sup>2</sup> = <em>c</em><sup>2</sup>, but 1 to 7,825 cannot. The run took about two days on 800 cores, and the unsatisfiability proof was about 200 terabytes, which they checked with an independent proof checker.</p>`, sources: ["heule16", "dpll62", "chaff01"] }
  ],
  fm3: [
    { kind: "practice", title: "The Pentium division bug", html: `<p>In October 1994 Thomas Nicely, a mathematician at Lynchburg College, noticed that his Pentium computed some reciprocals wrongly. The processor's floating-point division used an SRT algorithm that looked up digits of the quotient in a table, and five entries of the table were missing. Most divisions were right; a few, such as 4,195,835 / 3,145,727, were wrong from about the fifth significant digit. Intel first said the average user would meet the error once in 27,000 years, but after public outcry it replaced the chips, taking a $475 million charge in early 1995. Testing had missed the five entries because the inputs that reach them are rare among the 2<sup>128</sup> pairs of double-precision operands. The episode pushed the hardware industry towards formal verification: Intel and AMD began proving their floating-point units correct with theorem provers and model checkers, and formal methods became a standard part of processor design.</p>`, sources: ["fdiv"] }
  ],
  fm4: [
    { kind: "practice", title: "TLA+ at Amazon", html: `<p>In 2011 engineers at Amazon Web Services began writing TLA+ specifications of the distributed algorithms inside services such as S3 and DynamoDB, and checking them with TLC. Their 2014 report, published in Communications of the ACM in 2015, described using TLA+ on ten large systems. In DynamoDB's replication and group-membership protocol, a specification of under a thousand lines of TLA+ revealed three bugs, some of which needed traces of 35 steps to show, sequences of crashes, messages and retries that no test or code review had found. Fixing a design flaw before the code is written costs far less than finding it in production. The engineers reported that the hardest part was not the tools but learning to think precisely about what the system should do, and that the specifications became trusted documentation, consulted when changing the design.</p>`, sources: ["newcombe15", "tlaplus"] }
  ],
  fm5: [
    { kind: "history", title: "From Turing to Hoare", html: `<p>On 24 June 1949, at a conference in Cambridge, Alan Turing gave a three-page talk, "Checking a large routine". He asked how one could be sure that a program computing factorials by repeated addition was right, and answered that the programmer should make "a number of definite assertions" about the machine's state at points in the program, which could be checked one by one, and should separately show that the program terminates by finding a quantity that decreases. Those are invariants and variants. The paper was almost forgotten. In 1967 Robert Floyd attached assertions to the edges of flowcharts and showed how to prove them, and in 1969 C. A. R. Hoare, then at Queen's University Belfast, recast Floyd's method as an axiomatic system for structured programs, with triples written <em>P</em> {<em>S</em>} <em>Q</em> (the braces later moved to the assertions). In 1975 Edsger Dijkstra introduced weakest preconditions, which turned proof into calculation and let programs be derived from their specifications. Hoare received the Turing Award in 1980, Floyd in 1978 and Dijkstra in 1972.</p>`, sources: ["floyd67", "hoare69", "dijkstra75"] }
  ]
});
