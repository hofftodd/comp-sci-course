CSA.addCourse({
  id: "cs320",
  code: "CS 320",
  title: "Theory of Computation",
  credits: 4,
  kind: "required",
  term: "y3f",
  summary: "What can computers do in principle, and what can they do efficiently? Three models of computation of increasing power: finite automata and regular expressions, context-free grammars and pushdown automata, and Turing machines. For each, how to design machines for a task, how they are used in practice (pattern matching, lexers, parsers, interpreters), and how to prove that a task is beyond them. The course ends with problems no algorithm can solve, Rice's theorem, and the formal definitions behind P, NP and NP-completeness.",
  prereqs: ["MATH 121 Discrete Mathematics II", "CS 220 Algorithms I"],
  outcomes: [
    "Define alphabets, strings and languages precisely, and treat a decision problem as a language",
    "Design deterministic and nondeterministic finite automata for a language, and convert between NFAs, DFAs and regular expressions",
    "Minimize a DFA, and explain why backtracking regex engines can take exponential time",
    "Prove that a language is not regular with the pumping lemma or a set of pairwise distinguishable strings",
    "Write and disambiguate context-free grammars, convert to Chomsky normal form, and parse with CYK and recursive descent",
    "Design pushdown automata, and prove a language is not context-free with the pumping lemma for context-free languages",
    "Design and simulate Turing machines, and explain why multitape and nondeterministic variants and real programming languages are equally powerful",
    "Prove problems undecidable by diagonalization and by reduction, apply Rice's theorem, and define P, NP and NP-completeness in terms of Turing machines"
  ],
  rubric: {
    criteriaFor: "problem sets and exams",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 35, desc: "Weekly: the lesson's programming problems (simulators and constructions checked against many strings), plus written problems that ask you to design a machine or grammar and prove it correct, or to prove that no machine of some kind can exist." },
      { name: "Midterm exam", weight: 20, desc: "Finite automata, regular expressions and the limits of regular languages (lessons 1–4)." },
      { name: "Final exam", weight: 35, desc: "Cumulative, with emphasis on grammars, pushdown automata, Turing machines, undecidability and NP-completeness (lessons 5–8)." }
    ],
    criteria: [
      { name: "Correctness", desc: "Does the machine, grammar or reduction do what is claimed?", levels: [
        "Correct on every input, including the empty string and other edge cases.",
        "Correct on typical inputs; one edge case is wrong.",
        "Correct only on some inputs, or for a slightly different language.",
        "Incorrect." ] },
      { name: "Proof", desc: "Is the claim argued convincingly?", levels: [
        "A complete proof: every quantifier handled in the right order (for example, every split in a pumping argument), every step justified.",
        "A convincing argument with a gap, such as one case of a split not checked.",
        "An argument by example, or one that assumes what it proves.",
        "No argument, or a wrong one." ] },
      { name: "Construction", desc: "Is the machine or grammar specified precisely?", levels: [
        "Every part of the formal definition given (states, alphabet, transitions, start, accepting states), with the meaning of each state or variable stated.",
        "Precise, but a few transitions or rules are missing or unexplained.",
        "An informal idea that would need work to turn into a machine.",
        "Missing." ] },
      { name: "Clarity", desc: "Can a reader follow it?", levels: [
        "The key idea stated first, then the details; notation defined before use.",
        "Mostly clear.",
        "Hard to follow.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Proofs matter:</b> a machine that passes the tests earns full credit only with an explanation of why it is correct; an impossibility claim needs a proof.",
      "<b>Collaboration:</b> discuss problems freely; write up your own solutions and name your collaborators.",
      "<b>AI assistants:</b> you may use them to explain concepts, and must say how. Constructions, proofs and code you submit must be your own, and you must be able to explain them in an oral check.",
      "<b>Late work:</b> problem sets are accepted up to two days late for 80% credit."
    ]
  },
  units: [
    {
      id: "tc1",
      title: "Alphabets, strings, languages and DFAs",
      minutes: 90,
      summary: "The vocabulary of the course (alphabets, strings, languages) and its first model of computation: the deterministic finite automaton. Formal definitions, state diagrams, how to design a DFA by deciding what it must remember, and the product construction that shows regular languages are closed under union, intersection and complement.",
      notes: `
<p>Every course so far has asked "how do I compute this?" This course asks two harder questions: what can be computed at all, and what can be computed with limited resources? To answer them we need precise models of what a computer is. We'll study three, each more powerful than the last: <strong>finite automata</strong> (a fixed, finite memory), <strong>pushdown automata</strong> (a finite memory plus a stack) and <strong>Turing machines</strong> (an unlimited memory). Each model is useful in its own right: finite automata power pattern matching and the first stage of every compiler, grammars and pushdown automata power parsers, and Turing machines are the definition of "algorithm" itself.</p>
<p>CS 230 Lesson 3 built finite state machines from flip-flops, with outputs on each step. Here the same idea is stripped down to a yes/no answer at the end, so that we can prove things about exactly which questions it can answer.</p>

<h3>Alphabets, strings and languages</h3>
<p>An <strong>alphabet</strong> is a finite, non-empty set of symbols, written Σ (capital sigma). Examples: Σ = {0, 1}, Σ = {a, b}, or the 128 ASCII characters. A <strong>string</strong> over Σ is a finite sequence of symbols from Σ, such as 0110. Its <strong>length</strong> |<em>w</em>| is the number of symbols, so |0110| = 4. The <strong>empty string</strong>, with no symbols, is written ε (epsilon) and has |ε| = 0; it is Python's <code>""</code>.</p>
<ul>
<li>The <strong>concatenation</strong> <em>xy</em> of strings <em>x</em> and <em>y</em> is <em>x</em> followed by <em>y</em>: if <em>x</em> = ab and <em>y</em> = ba then <em>xy</em> = abba. Concatenating with ε changes nothing: ε<em>w</em> = <em>w</em>ε = <em>w</em>.</li>
<li><em>w</em><sup><em>k</em></sup> means <em>k</em> copies of <em>w</em> in a row, and <em>w</em><sup>0</sup> = ε. So 0<sup>3</sup>1<sup>2</sup> = 00011, and (ab)<sup>2</sup> = abab.</li>
<li>#<sub>a</sub>(<em>w</em>) is the number of a's in <em>w</em>, and <em>w</em><sup>R</sup> is <em>w</em> reversed.</li>
<li>Σ<sup><em>k</em></sup> is the set of strings of length exactly <em>k</em>, and <strong>Σ*</strong> ("sigma star") is the set of <em>all</em> strings over Σ, of every finite length, including ε. Over {a, b} there are 2<sup><em>k</em></sup> strings of length <em>k</em> (the product rule, MATH 121 Lesson 1), so Σ* is infinite, but each of its strings is finite.</li>
</ul>
<p>A <strong>language</strong> is any set of strings over Σ, that is, any subset of Σ*. Some examples over {0, 1}: the set of binary numerals of multiples of 3; {0<sup><em>n</em></sup>1<sup><em>n</em></sup> : <em>n</em> ≥ 0} = {ε, 01, 0011, 000111, …}; the empty language ∅; and {ε}, the language containing only the empty string. These last two are different: ∅ has no strings, {ε} has one.</p>
<p>Why languages? Because every yes/no question about inputs is a language. CS 220 Lesson 8 restricted attention to <em>decision problems</em>; encode each input as a string, and the problem becomes the set of strings whose answer is yes. "Is this number prime?" is the language of binary numerals of primes. "Is this graph 3-colorable?" is the set of encodings of 3-colorable graphs. Solving the problem means deciding, for any given string, whether it is in the language. That is the job every machine in this course does.</p>

<h3>Deterministic finite automata</h3>
<p>A <strong>deterministic finite automaton</strong> (DFA) reads its input one symbol at a time, left to right, changing state on each symbol, and when the input ends it says yes or no depending on its state. Formally, a DFA is a 5-tuple <em>M</em> = (<em>Q</em>, Σ, δ, <em>q</em><sub>0</sub>, <em>F</em>):</p>
<ul>
<li><em>Q</em>, a finite set of <strong>states</strong>;</li>
<li>Σ, the input alphabet;</li>
<li>δ : <em>Q</em> × Σ → <em>Q</em>, the <strong>transition function</strong>: δ(<em>q</em>, <em>a</em>) is the state entered from <em>q</em> on reading <em>a</em>. It is a function (MATH 120 Lesson 5), so there is exactly one next state for every state and symbol;</li>
<li><em>q</em><sub>0</sub> ∈ <em>Q</em>, the <strong>start state</strong>;</li>
<li><em>F</em> ⊆ <em>Q</em>, the <strong>accepting states</strong>.</li>
</ul>
<p>Extend δ to whole strings: δ*(<em>q</em>, ε) = <em>q</em>, and δ*(<em>q</em>, <em>wa</em>) = δ(δ*(<em>q</em>, <em>w</em>), <em>a</em>), meaning "run on <em>w</em>, then take one more step on <em>a</em>". <em>M</em> <strong>accepts</strong> <em>w</em> if δ*(<em>q</em><sub>0</sub>, <em>w</em>) ∈ <em>F</em>, and otherwise <strong>rejects</strong> it. The <strong>language of <em>M</em></strong>, <em>L</em>(<em>M</em>), is the set of strings it accepts. A language is <strong>regular</strong> if some DFA has it as its language.</p>
<p>In Python, a DFA is a dictionary for δ plus a start state and a set of accepting states, and running it is one loop:</p>
<pre><code>def run_dfa(delta, start, accept, w):
    q = start
    for a in w:
        q = delta[(q, a)]
    return q in accept</code></pre>
<p>The loop does one dictionary lookup per symbol and stores one state, however long the input is. That is what "finite automaton" means: constant memory, one pass.</p>

<h3>Example: multiples of 3 in binary</h3>
<p>Which binary numerals are multiples of 3? The DFA can't remember the whole number, but it doesn't need to: it only needs the remainder mod 3 of what it has read so far. Reading one more bit <em>b</em> after a prefix with value <em>v</em> gives the value 2<em>v</em> + <em>b</em> (shifting left doubles, as in CS 210 Lesson 1), and mod 3 that depends only on <em>v</em> mod 3 (MATH 121 Lesson 4). So the states are the remainders 0, 1, 2, and δ(<em>r</em>, <em>b</em>) = (2<em>r</em> + <em>b</em>) mod 3.</p>
<figure class="fig"><svg viewBox="0 0 520 170" width="520" role="img" aria-label="A three-state DFA with states 0, 1 and 2. State 0 is the start and the only accepting state. Bit 0 loops on state 0; bit 1 goes from 0 to 1 and from 1 back to 0; bit 0 goes from 1 to 2 and from 2 back to 1; bit 1 loops on state 2.">
<defs><marker id="arr-tc1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
<g class="ln"><line x1="40" y1="100" x2="86" y2="100" marker-end="url(#arr-tc1)"/>
<path d="M128 86 Q185 48 242 86" marker-end="url(#arr-tc1)"/><path d="M242 114 Q185 152 128 114" marker-end="url(#arr-tc1)"/>
<path d="M278 86 Q335 48 392 86" marker-end="url(#arr-tc1)"/><path d="M392 114 Q335 152 278 114" marker-end="url(#arr-tc1)"/>
<path d="M98 80 C80 30 140 30 122 80" marker-end="url(#arr-tc1)"/><path d="M398 80 C380 30 440 30 422 80" marker-end="url(#arr-tc1)"/></g>
<g class="box"><circle cx="110" cy="100" r="22"/><circle cx="260" cy="100" r="22"/><circle cx="410" cy="100" r="22"/></g>
<g class="ln"><circle cx="110" cy="100" r="17"/></g>
<g class="text"><text x="110" y="105" text-anchor="middle">0</text><text x="260" y="105" text-anchor="middle">1</text><text x="410" y="105" text-anchor="middle">2</text>
<text x="185" y="60" text-anchor="middle">1</text><text x="185" y="150" text-anchor="middle">1</text><text x="335" y="60" text-anchor="middle">0</text><text x="335" y="150" text-anchor="middle">0</text>
<text x="110" y="30" text-anchor="middle">0</text><text x="410" y="30" text-anchor="middle">1</text><text x="46" y="92" class="m">start</text></g>
</svg><figcaption>The state diagram: a circle per state, an arrow per transition labeled with its symbol, an arrow from nowhere into the start state, and a double circle for each accepting state.</figcaption></figure>
<pre><code>D3 = {(r, b): (2 * r + int(b)) % 3 for r in range(3) for b in "01"}

print(run_dfa(D3, 0, {0}, "110"))    # True
print(run_dfa(D3, 0, {0}, "111"))    # False
print([n for n in range(20) if run_dfa(D3, 0, {0}, format(n, "b"))])   # [0, 3, 6, 9, 12, 15, 18]</code></pre>
<p>On 1001 (nine) the states are 0 → 1 → 2 → 1 → 0, and 0 is accepting. The DFA also accepts ε, since it starts in state 0; if we wanted to exclude it we would add a separate start state.</p>

<h3>Designing a DFA</h3>
<p>The design question is always: <em>what is the least I must remember about the prefix read so far to finish the job?</em> Each possible answer becomes a state. Then write each transition by asking "if I knew this and then read <em>a</em>, what would I know?", and make a state accepting if knowing it means the whole input belongs to the language.</p>
<p>Example: strings over {a, b} that contain aba somewhere. Remember the longest end of the prefix that could still begin an aba: nothing useful (state 0), "a" (1), "ab" (2), or "aba has been seen" (3). From 2 on b, the end is "abb", which can't start aba, so go back to 0. From 1 on a, the end "aa" still ends with an a, so stay in 1. State 3 loops on both symbols: once seen, always seen. This is the same reasoning as CS 230's 101 detector.</p>
<table>
<tr><th>State</th><th>Meaning</th><th>on a</th><th>on b</th></tr>
<tr><td>0 (start)</td><td>no progress</td><td>1</td><td>0</td></tr>
<tr><td>1</td><td>ends in a</td><td>1</td><td>2</td></tr>
<tr><td>2</td><td>ends in ab</td><td>3</td><td>0</td></tr>
<tr><td>3 (accepting)</td><td>aba seen</td><td>3</td><td>3</td></tr>
</table>
<p>Many DFAs need a <strong>dead state</strong> (or trap state): a non-accepting state that loops to itself on every symbol, entered once the input can no longer be in the language. For "strings that start with ab", reading b first sends the DFA to the dead state. Because δ must be defined for every state and symbol, a diagram that leaves arrows out is assumed to send them to an unseen dead state.</p>
<p>To test a design, run it on every string up to some length and compare with a direct check:</p>
<pre><code>from itertools import product

def strings(alphabet, n):
    """Every string over alphabet of length 0 to n, shortest first."""
    for k in range(n + 1):
        for t in product(alphabet, repeat=k):
            yield "".join(t)

ABA = {(0, "a"): 1, (0, "b"): 0, (1, "a"): 1, (1, "b"): 2,
       (2, "a"): 3, (2, "b"): 0, (3, "a"): 3, (3, "b"): 3}
print(all(run_dfa(ABA, 0, {3}, w) == ("aba" in w) for w in strings("ab", 10)))   # True</code></pre>
<p>That checks all 2,047 strings of length at most 10. It is evidence, not proof: a proof says, for each state, exactly which prefixes lead to it, and shows by induction on the length of the input that every transition keeps that true (practice problem 4 does this for D3).</p>

<h3>The product construction</h3>
<p>Suppose <em>M</em><sub>1</sub> accepts strings with an even number of a's and <em>M</em><sub>2</sub> accepts strings that end in b. Is there a DFA for strings with both properties? Run both machines at once: the new machine's state is a <em>pair</em> (state of <em>M</em><sub>1</sub>, state of <em>M</em><sub>2</sub>), and each symbol moves both parts.</p>
<p>Formally, given <em>M</em><sub>1</sub> = (<em>Q</em><sub>1</sub>, Σ, δ<sub>1</sub>, <em>s</em><sub>1</sub>, <em>F</em><sub>1</sub>) and <em>M</em><sub>2</sub> = (<em>Q</em><sub>2</sub>, Σ, δ<sub>2</sub>, <em>s</em><sub>2</sub>, <em>F</em><sub>2</sub>), the <strong>product automaton</strong> has states <em>Q</em><sub>1</sub> × <em>Q</em><sub>2</sub> (the Cartesian product, MATH 120 Lesson 4), start (<em>s</em><sub>1</sub>, <em>s</em><sub>2</sub>) and</p>
<p class="math">δ((<em>p</em>, <em>q</em>), <em>a</em>) = (δ<sub>1</sub>(<em>p</em>, <em>a</em>), δ<sub>2</sub>(<em>q</em>, <em>a</em>)).</p>
<p>By induction on |<em>w</em>|, δ*((<em>s</em><sub>1</sub>, <em>s</em><sub>2</sub>), <em>w</em>) = (δ<sub>1</sub>*(<em>s</em><sub>1</sub>, <em>w</em>), δ<sub>2</sub>*(<em>s</em><sub>2</sub>, <em>w</em>)): it holds for ε, and one more symbol moves each half exactly as its own machine would. So the pair records where both machines are, and we choose the accepting pairs to suit the question:</p>
<ul>
<li>for <em>L</em><sub>1</sub> ∩ <em>L</em><sub>2</sub>, accept the pairs with <em>p</em> ∈ <em>F</em><sub>1</sub> <em>and</em> <em>q</em> ∈ <em>F</em><sub>2</sub>;</li>
<li>for <em>L</em><sub>1</sub> ∪ <em>L</em><sub>2</sub>, accept the pairs with <em>p</em> ∈ <em>F</em><sub>1</sub> <em>or</em> <em>q</em> ∈ <em>F</em><sub>2</sub>;</li>
<li>for the difference <em>L</em><sub>1</sub> − <em>L</em><sub>2</sub>, accept <em>p</em> ∈ <em>F</em><sub>1</sub> and <em>q</em> ∉ <em>F</em><sub>2</sub>.</li>
</ul>
<p>The product has |<em>Q</em><sub>1</sub>| · |<em>Q</em><sub>2</sub>| states, though often only some pairs can be reached from the start. The code builds only those, with the same worklist search as CS 201's graph traversals:</p>
<pre><code>def product_dfa(d1, s1, f1, d2, s2, f2, alphabet, both):
    start = (s1, s2)
    delta, todo, seen = {}, [start], {start}
    while todo:
        p, q = todo.pop()
        for a in alphabet:
            nxt = (d1[(p, a)], d2[(q, a)])
            delta[((p, q), a)] = nxt
            if nxt not in seen:
                seen.add(nxt)
                todo.append(nxt)
    if both:
        accept = {(p, q) for (p, q) in seen if p in f1 and q in f2}
    else:
        accept = {(p, q) for (p, q) in seen if p in f1 or q in f2}
    return delta, start, accept

EVEN_A = {("e", "a"): "o", ("e", "b"): "e", ("o", "a"): "e", ("o", "b"): "o"}
ENDS_B = {("n", "a"): "n", ("n", "b"): "y", ("y", "a"): "n", ("y", "b"): "y"}
d, s, f = product_dfa(EVEN_A, "e", {"e"}, ENDS_B, "n", {"y"}, "ab", True)
print(sorted(f))                                                   # [('e', 'y')]
print([w for w in strings("ab", 3) if run_dfa(d, s, f, w)])        # ['b', 'bb', 'aab', 'bbb']</code></pre>
<p>Here <em>e</em>/<em>o</em> mean "even/odd number of a's so far" and <em>n</em>/<em>y</em> mean "doesn't/does end in b". All four pairs are reachable, and only (<em>e</em>, <em>y</em>) accepts.</p>

<h3>Closure properties</h3>
<p>A set of languages is <strong>closed</strong> under an operation if applying the operation to languages in the set always gives a language in the set. The product construction proves that the regular languages are closed under union, intersection and difference. They are also closed under <strong>complement</strong>, <em>L̄</em> = Σ* − <em>L</em>: keep the DFA and swap accepting and non-accepting states. That works only because a DFA is <em>complete</em>, with a transition for every state and symbol, so every string ends in exactly one state. Lesson 2 shows the regular languages are also closed under concatenation and repetition.</p>
<p>Closure properties let you build machines from parts, and Lesson 4 will turn them around to prove that languages are <em>not</em> regular.</p>
<p class="note">Why it matters: a DFA runs in one pass with constant memory, so it can scan gigabytes of text, network packets or log lines at full speed. Lexers, which split source code into tokens, input validators and protocol handlers are DFAs, often generated automatically from a description of the language.</p>
`,
      terms: [
        ["Alphabet (Σ)", "A finite, non-empty set of symbols."],
        ["String", "A finite sequence of symbols from an alphabet."],
        ["Empty string (ε)", "The string with no symbols; its length is 0."],
        ["Σ*", "The set of all strings over Σ, including the empty string."],
        ["Language", "Any set of strings over an alphabet; a subset of Σ*."],
        ["DFA", "A deterministic finite automaton (Q, Σ, δ, q0, F): finitely many states, exactly one transition per state and symbol, a start state and a set of accepting states."],
        ["Transition function (δ)", "The function giving a DFA's next state from its current state and the symbol read."],
        ["Accept", "A DFA accepts a string if reading it from the start state ends in an accepting state."],
        ["Language of a machine, L(M)", "The set of strings the machine accepts."],
        ["Regular language", "A language accepted by some DFA."],
        ["Dead state", "A non-accepting state that every symbol leads back to; the input can no longer be accepted."],
        ["Product construction", "A DFA whose states are pairs of states of two DFAs, running both at once; used for union, intersection and difference."],
        ["Closure property", "A guarantee that an operation applied to languages of a class gives a language of the same class."],
        ["Complement", "The language Σ* − L: every string not in L."]
      ],
      quiz: [
        { q: "How many strings of length at most 2 are there over the alphabet {a, b}?", choices: ["4", "6", "7", "8"], answer: 2, why: "1 of length 0 (ε), 2 of length 1, 4 of length 2: 7 in all." },
        { q: "What is the difference between the languages ∅ and {ε}?", choices: ["None", "∅ contains no strings; {ε} contains exactly one, the empty string", "{ε} is infinite", "∅ contains the empty string"], answer: 1, why: "ε is a string (of length 0), so {ε} has one element, while ∅ has none." },
        { q: "The DFA D3 (states are remainders mod 3, δ(r, b) = (2r + b) mod 3) starts in state 0. Which state is it in after reading 1011?", choices: ["0", "1", "2", "It depends on the next bit"], answer: 2, why: "1011 is eleven, and 11 mod 3 = 2. Step by step: 0 → 1 → 2 → 2 → 2." },
        { q: "M1 has 3 states and M2 has 4. How many states does their product automaton have, counting unreachable pairs?", choices: ["7", "12", "16", "81"], answer: 1, why: "The states are pairs, |Q1 × Q2| = 3 · 4 = 12." },
        { q: "How do you get a DFA for the complement of L(M), for a DFA M?", choices: ["Reverse every arrow", "Make every non-accepting state accepting and every accepting state non-accepting", "Add a dead state", "It can't be done in general"], answer: 1, why: "Every string ends in exactly one state, so swapping F and Q − F flips every answer." },
        { q: "Which language over {a, b} is accepted by a DFA whose only state is a non-accepting start state with both symbols looping back to it?", choices: ["∅", "{ε}", "Σ*", "{a, b}"], answer: 0, why: "Every string ends in that one state, which doesn't accept, so no string is accepted." }
      ],
      practice: [
        {
          q: `<p>Design a DFA over {0, 1} for the strings that do not contain 11. Give its states, their meanings, its transition table, start state and accepting states.</p>`,
          hint: `<p>Remember whether the last symbol was a 1, and whether 11 has already appeared.</p>`,
          a: `<p>Three states: <em>A</em> = "no 11 yet, last symbol not 1 (or no symbols yet)", <em>B</em> = "no 11 yet, last symbol 1", <em>D</em> = "11 seen" (dead).</p><table><tr><th>State</th><th>0</th><th>1</th></tr><tr><td>A (start, accepting)</td><td>A</td><td>B</td></tr><tr><td>B (accepting)</td><td>A</td><td>D</td></tr><tr><td>D</td><td>D</td><td>D</td></tr></table><p>Accepting states: <em>A</em> and <em>B</em>, so ε, 0, 1, 10, 0101 are accepted and 0110 is not.</p>`
        },
        {
          q: `<p>Using EVEN_A and ENDS_B from the notes, build the product DFA for "even number of a's <em>or</em> ends in b". List its four states, its transitions and its accepting states, and say whether it accepts ε, a, ab and aa.</p>`,
          a: `<p>States (<em>e</em>, <em>n</em>) (start), (<em>e</em>, <em>y</em>), (<em>o</em>, <em>n</em>), (<em>o</em>, <em>y</em>). On a, the first part flips and the second becomes <em>n</em>: (<em>e</em>, ·) → (<em>o</em>, <em>n</em>), (<em>o</em>, ·) → (<em>e</em>, <em>n</em>). On b, the first part stays and the second becomes <em>y</em>: (<em>x</em>, ·) → (<em>x</em>, <em>y</em>). Accepting: every pair with <em>e</em> or <em>y</em>, so all but (<em>o</em>, <em>n</em>).</p><p>ε ends in (<em>e</em>, <em>n</em>): accept. a: (<em>o</em>, <em>n</em>): reject. ab: (<em>o</em>, <em>y</em>): accept. aa: (<em>e</em>, <em>n</em>): accept.</p>`
        },
        {
          q: `<p>Design a DFA over {a, b} for the strings whose length is a multiple of 3 and that contain an even number of b's. How many states does your DFA have? Show that every state is reachable, and that for any two different states some suffix is accepted from one and rejected from the other.</p>`,
          a: `<p>Take the product of a 3-state DFA counting length mod 3 (every symbol moves 0 → 1 → 2 → 0) and a 2-state DFA tracking the parity of b's (b flips it, a doesn't). States are pairs (<em>i</em>, <em>p</em>) with <em>i</em> ∈ {0, 1, 2} and <em>p</em> ∈ {even, odd}; start (0, even), the only accepting state. On a: (<em>i</em>, <em>p</em>) → (<em>i</em>+1 mod 3, <em>p</em>); on b: (<em>i</em>, <em>p</em>) → (<em>i</em>+1 mod 3, flipped <em>p</em>).</p><p>All 6 pairs are reachable: ε, a, aa, b, ab and aab reach (0, even), (1, even), (2, even), (1, odd), (2, odd) and (0, odd). Now take two different states (<em>i</em>, <em>p</em>) and (<em>j</em>, <em>q</em>). Choose a suffix <em>z</em> that takes (<em>i</em>, <em>p</em>) to (0, even): start with one b if <em>p</em> is odd, then add a's until the length count reaches 0. Reading <em>z</em> adds |<em>z</em>| to the count and flips the parity #<sub>b</sub>(<em>z</em>) times in <em>both</em> states, so it can't bring two different states to the same state, and (<em>j</em>, <em>q</em>) ends somewhere other than (0, even). So <em>z</em> is accepted from one and rejected from the other. Lesson 3 uses exactly this test to find states that can be merged, and Lesson 4 uses it to prove that the result has as few states as possible.</p>`
        },
        {
          q: `<p>Prove by induction on the length of <em>w</em> that D3, started in state 0, ends in state <em>v</em>(<em>w</em>) mod 3, where <em>v</em>(<em>w</em>) is the number <em>w</em> denotes in binary (with <em>v</em>(ε) = 0). Conclude that D3 accepts exactly the numerals of multiples of 3.</p>`,
          a: `<p>Claim: δ*(0, <em>w</em>) = <em>v</em>(<em>w</em>) mod 3 for every <em>w</em>.</p><p>Base case, <em>w</em> = ε: δ*(0, ε) = 0 = <em>v</em>(ε) mod 3.</p><p>Inductive step: assume the claim for <em>w</em>, and let <em>b</em> be a bit. Appending a bit doubles the value and adds the bit: <em>v</em>(<em>wb</em>) = 2<em>v</em>(<em>w</em>) + <em>b</em>. Then δ*(0, <em>wb</em>) = δ(δ*(0, <em>w</em>), <em>b</em>) = (2 · (<em>v</em>(<em>w</em>) mod 3) + <em>b</em>) mod 3 = (2<em>v</em>(<em>w</em>) + <em>b</em>) mod 3 = <em>v</em>(<em>wb</em>) mod 3, using the fact that reducing mod 3 before or after multiplying and adding gives the same remainder (MATH 121 Lesson 4).</p><p>So D3 ends in state 0, its only accepting state, exactly when <em>v</em>(<em>w</em>) is a multiple of 3. ∎</p>`
        }
      ],
      sources: ["ericksonmodels", "sipser", "hmu"]
    },
    {
      id: "tc2",
      title: "Nondeterminism",
      minutes: 90,
      summary: "Nondeterministic finite automata, which may have several moves, or none, on a symbol and may move without reading (ε-transitions). How to simulate one by tracking a set of states, the subset construction that turns any NFA into a DFA, the exponential blow-up that can cost, and why NFAs and DFAs accept exactly the same languages.",
      notes: `
<p>A DFA has exactly one move for every state and symbol. Relaxing that rule gives a machine that is often much easier to design: it can have several possible moves, or none, and can change state without reading anything. Surprisingly, this <em>nondeterminism</em> adds no power to finite automata. It does add convenience, and it can save an exponential number of states.</p>

<h3>NFAs</h3>
<p>A <strong>nondeterministic finite automaton</strong> (NFA) is a 5-tuple (<em>Q</em>, Σ, δ, <em>q</em><sub>0</sub>, <em>F</em>) like a DFA, except that the transition function returns a <em>set</em> of states and may also be applied to ε:</p>
<p class="math">δ : <em>Q</em> × (Σ ∪ {ε}) → 𝒫(<em>Q</em>)</p>
<p>Here 𝒫(<em>Q</em>) is the power set of <em>Q</em>, the set of all its subsets (MATH 120 Lesson 4). δ(<em>q</em>, <em>a</em>) is the set of states the machine may move to from <em>q</em> on reading <em>a</em>; it may be empty, in which case that branch of the computation dies. δ(<em>q</em>, ε) is the set of states it may move to <em>without reading anything</em>, an <strong>ε-transition</strong>.</p>
<p>The NFA <strong>accepts</strong> <em>w</em> if <em>some</em> way of making the choices reads all of <em>w</em> and ends in an accepting state. It rejects <em>w</em> only if every possible way fails. Two ways to think about this are both useful:</p>
<ul>
<li><strong>Guessing:</strong> the machine magically picks the right move whenever it has a choice, if a right move exists.</li>
<li><strong>Parallel tracking:</strong> the machine follows every choice at once, keeping the set of all states it could be in. It accepts if that set contains an accepting state at the end.</li>
</ul>
<p>The first is how you <em>design</em> NFAs; the second is how you <em>run</em> them.</p>

<h3>Example: the third symbol from the end is 1</h3>
<p>Let <em>L</em><sub>3</sub> be the binary strings whose third symbol from the end is 1, such as 0100 and 111. An NFA can guess when the 1 three from the end arrives: it waits in state 0, reading anything, and on some 1 it guesses "this is the one" and moves to 1. Then it must read exactly two more symbols to reach state 3.</p>
<figure class="fig"><svg viewBox="0 0 520 130" width="520" role="img" aria-label="An NFA with states 0 to 3 in a row. State 0 is the start and loops on 0 and 1. An arrow labeled 1 goes from 0 to 1, arrows labeled 0,1 go from 1 to 2 and from 2 to 3. State 3 is accepting.">
<defs><marker id="arr-tc2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
<g class="ln"><line x1="20" y1="90" x2="66" y2="90" marker-end="url(#arr-tc2)"/>
<line x1="112" y1="90" x2="186" y2="90" marker-end="url(#arr-tc2)"/><line x1="232" y1="90" x2="306" y2="90" marker-end="url(#arr-tc2)"/><line x1="352" y1="90" x2="426" y2="90" marker-end="url(#arr-tc2)"/>
<path d="M78 70 C60 20 120 20 102 70" marker-end="url(#arr-tc2)"/></g>
<g class="box"><circle cx="90" cy="90" r="22"/><circle cx="210" cy="90" r="22"/><circle cx="330" cy="90" r="22"/><circle cx="450" cy="90" r="22"/></g>
<g class="ln"><circle cx="450" cy="90" r="17"/></g>
<g class="text"><text x="90" y="95" text-anchor="middle">0</text><text x="210" y="95" text-anchor="middle">1</text><text x="330" y="95" text-anchor="middle">2</text><text x="450" y="95" text-anchor="middle">3</text>
<text x="149" y="82" text-anchor="middle">1</text><text x="269" y="82" text-anchor="middle">0, 1</text><text x="389" y="82" text-anchor="middle">0, 1</text><text x="90" y="22" text-anchor="middle">0, 1</text></g>
</svg><figcaption>An NFA for <em>L</em><sub>3</sub>. State 0 has two moves on 1 (stay, or go to 1); state 3 has no moves at all, so a branch that reaches it early dies on the next symbol.</figcaption></figure>
<p>On input 0100 the branch that moves to state 1 on the first 1 reads 0, 0 into states 2, 3 and accepts. On 0010, every branch fails: the only 1 is second from the end, so a branch that guesses on it reaches state 2 when the input runs out.</p>

<h3>Simulating an NFA</h3>
<p>The <strong>ε-closure</strong> <em>E</em>(<em>S</em>) of a set of states <em>S</em> is every state reachable from <em>S</em> by ε-transitions alone, including the states of <em>S</em> themselves. It is a graph search (CS 201 Lesson 7) along the ε-arrows. To run an NFA, keep the set of current states: start with <em>E</em>({<em>q</em><sub>0</sub>}); on each symbol <em>a</em>, collect every state reachable by one <em>a</em>-move from a current state, and take the ε-closure of the result. In code, transitions are a dictionary from (state, symbol) to a set, with the symbol <code>""</code> standing for ε and missing keys meaning "no moves":</p>
<pre><code>def eps_closure(delta, states):
    stack, seen = list(states), set(states)
    while stack:
        q = stack.pop()
        for r in delta.get((q, ""), ()):
            if r not in seen:
                seen.add(r)
                stack.append(r)
    return frozenset(seen)

def run_nfa(delta, start, accept, w):
    current = eps_closure(delta, {start})
    for a in w:
        moved = set()
        for q in current:
            moved |= delta.get((q, a), set())    # |= adds every element of the right-hand set
        current = eps_closure(delta, moved)
    return bool(current &amp; accept)             # &amp; is set intersection

N3 = {(0, "0"): {0}, (0, "1"): {0, 1}, (1, "0"): {2}, (1, "1"): {2},
      (2, "0"): {3}, (2, "1"): {3}}
print(run_nfa(N3, 0, {3}, "0100"), run_nfa(N3, 0, {3}, "0010"))   # True False</code></pre>
<p>A <code>frozenset</code> is a set that can't be changed after it is made. Unlike an ordinary <code>set</code> it can be hashed, so it can be a dictionary key or a member of another set, which we need next. Each step touches at most |<em>Q</em>| states and each of their moves, so the simulation takes O(|<em>w</em>| · |<em>Q</em>|<sup>2</sup>) time in the worst case: slower than a DFA's one lookup per symbol, but polynomial.</p>

<h3>The subset construction</h3>
<p>The parallel simulation is itself a deterministic machine: its "state" at each moment is a set of NFA states, and the next set depends only on the current set and the symbol. There are only finitely many sets, so this is a DFA. The <strong>subset construction</strong> (also called the powerset construction), due to Rabin and Scott, builds it. Given an NFA <em>N</em> = (<em>Q</em>, Σ, δ, <em>q</em><sub>0</sub>, <em>F</em>), the DFA <em>D</em> has:</p>
<ul>
<li>states: subsets of <em>Q</em> (in practice, only those reachable from the start);</li>
<li>start state <em>E</em>({<em>q</em><sub>0</sub>});</li>
<li>transitions Δ(<em>S</em>, <em>a</em>) = <em>E</em>(⋃<sub><em>q</em> ∈ <em>S</em></sub> δ(<em>q</em>, <em>a</em>)), the union over every <em>q</em> in <em>S</em>;</li>
<li>accepting states: every subset that contains at least one state of <em>F</em>.</li>
</ul>
<p>Worked example: the NFA for "second symbol from the end is 1" (states 0, 1, 2; 0 loops on both symbols, 0 →<sub>1</sub> 1, 1 →<sub>0,1</sub> 2, accepting 2; no ε-moves). Start at {0} and fill in rows until no new subset appears:</p>
<table>
<tr><th>DFA state</th><th>on 0</th><th>on 1</th><th>accepting?</th></tr>
<tr><td>{0} (start)</td><td>{0}</td><td>{0, 1}</td><td>no</td></tr>
<tr><td>{0, 1}</td><td>{0, 2}</td><td>{0, 1, 2}</td><td>no</td></tr>
<tr><td>{0, 2}</td><td>{0}</td><td>{0, 1}</td><td>yes</td></tr>
<tr><td>{0, 1, 2}</td><td>{0, 2}</td><td>{0, 1, 2}</td><td>yes</td></tr>
</table>
<p>For example, from {0, 1} on 1: state 0 can go to 0 or 1, and state 1 can go to 2, so the next set is {0, 1, 2}. Four of the 2<sup>3</sup> = 8 subsets are reachable; the others, such as {1} and ∅, never arise. Each DFA state records which of the last two symbols were 1: {0, 1, 2} means "the last two were 11".</p>
<pre><code>def subset_construction(delta, start, accept, alphabet):
    s0 = eps_closure(delta, {start})
    dfa, todo, seen = {}, [s0], {s0}
    while todo:
        S = todo.pop()
        for a in alphabet:
            moved = set()
            for q in S:
                moved |= delta.get((q, a), set())
            T = eps_closure(delta, moved)
            dfa[(S, a)] = T
            if T not in seen:
                seen.add(T)
                todo.append(T)
    return dfa, s0, {S for S in seen if S &amp; accept}, seen

def kth_from_end(k):
    """NFA with k + 1 states for: the k-th symbol from the end is 1."""
    delta = {(0, "0"): {0}, (0, "1"): {0, 1}}
    for i in range(1, k):
        delta[(i, "0")] = {i + 1}
        delta[(i, "1")] = {i + 1}
    return delta

for k in [2, 3, 5, 10]:
    states = subset_construction(kth_from_end(k), 0, {k}, "01")[3]
    print(k + 1, "NFA states ->", len(states), "DFA states")</code></pre>
<pre data-label="Output"><code>3 NFA states -&gt; 4 DFA states
4 NFA states -&gt; 8 DFA states
6 NFA states -&gt; 32 DFA states
11 NFA states -&gt; 1024 DFA states</code></pre>

<h3>The blow-up is real</h3>
<p>An NFA with <em>n</em> states can need a DFA with 2<sup><em>n</em>−1</sup> states, and here is a proof that no cleverer DFA does better for "the <em>k</em>-th symbol from the end is 1". Take any two different strings <em>x</em> and <em>y</em> of length <em>k</em>. They differ in some position <em>i</em>; say <em>x</em> has 1 there and <em>y</em> has 0. Append <em>i</em> − 1 zeros to each. Now position <em>i</em> is exactly <em>k</em>-th from the end, so <em>x</em>0<sup><em>i</em>−1</sup> is in the language and <em>y</em>0<sup><em>i</em>−1</sup> is not. A DFA in the same state after <em>x</em> and after <em>y</em> would give the same answer on both extensions, so every DFA for the language reaches a different state on each of the 2<sup><em>k</em></sup> strings of length <em>k</em>: it has at least 2<sup><em>k</em></sup> states. This style of argument, "these strings must reach different states", returns in Lessons 3 and 4.</p>

<h3>NFAs and DFAs are equivalent</h3>
<p><strong>Theorem.</strong> A language is accepted by some NFA if and only if it is accepted by some DFA, that is, if and only if it is regular.</p>
<p>One direction is free: a DFA is an NFA whose sets all have one element. For the other, the subset construction's DFA <em>D</em> accepts exactly <em>L</em>(<em>N</em>). By induction on |<em>w</em>|, the state of <em>D</em> after reading <em>w</em> is the set of all states <em>N</em> could be in after reading <em>w</em>: true for ε by the choice of start state, and each step of <em>D</em> follows every possible move of <em>N</em> and then every ε-move. <em>D</em> accepts when that set contains an accepting state, which is exactly when some computation of <em>N</em> accepts.</p>

<h3>More closure properties</h3>
<p>NFAs make new closure proofs easy, because ε-transitions glue machines together. Suppose <em>N</em><sub>1</sub> and <em>N</em><sub>2</sub> accept <em>L</em><sub>1</sub> and <em>L</em><sub>2</sub>.</p>
<ul>
<li><strong>Union</strong> <em>L</em><sub>1</sub> ∪ <em>L</em><sub>2</sub>: a new start state with ε-moves to both old start states. The machine guesses which language the input is in. (Fewer states than the product construction.)</li>
<li><strong>Concatenation</strong> <em>L</em><sub>1</sub><em>L</em><sub>2</sub> = {<em>xy</em> : <em>x</em> ∈ <em>L</em><sub>1</sub>, <em>y</em> ∈ <em>L</em><sub>2</sub>}: ε-moves from every accepting state of <em>N</em><sub>1</sub> to the start of <em>N</em><sub>2</sub>; only <em>N</em><sub>2</sub>'s accepting states accept. The machine guesses where <em>x</em> ends.</li>
<li><strong>Star</strong> <em>L</em>* = {<em>w</em><sub>1</sub><em>w</em><sub>2</sub>⋯<em>w</em><sub><em>k</em></sub> : <em>k</em> ≥ 0, each <em>w</em><sub><em>i</em></sub> ∈ <em>L</em>}, any number of pieces glued together, including zero pieces (so ε ∈ <em>L</em>* always): a new start state that is accepting, with an ε-move to the old start, and ε-moves from every old accepting state back to the old start.</li>
</ul>
<p>With <em>L</em><sub>1</sub> = a* (any number of a's) and <em>L</em><sub>2</sub> = (ab)*, the union NFA with states {0, 1, 3, 4} (0 the new start, ε-moves to 1 and 3; 1 loops on a; 3 →<sub>a</sub> 4 →<sub>b</sub> 3) accepts, up to length 4, exactly ε, a, aa, ab, aaa, aaaa and abab.</p>
<p class="note">Why it matters: nondeterminism is the first appearance of an idea that returns at the end of the course. NP, CS 220's class of problems with checkable answers, is defined by nondeterministic Turing machines, which guess a certificate just as this NFA guesses where the third-from-last symbol is. For finite automata, guessing can be removed at an exponential cost in states. Whether it can be removed at polynomial cost in time for Turing machines is the P versus NP question.</p>
`,
      terms: [
        ["NFA", "A nondeterministic finite automaton: like a DFA, but each state and symbol (or ε) leads to a set of possible next states, possibly empty."],
        ["Nondeterminism", "Allowing several possible moves; a nondeterministic machine accepts if any sequence of choices leads to acceptance."],
        ["ε-transition", "A move an NFA can make without reading an input symbol."],
        ["ε-closure", "The set of states reachable from a given set by ε-transitions alone, including the given states."],
        ["Power set (𝒫(Q))", "The set of all subsets of Q; it has 2^|Q| elements."],
        ["Subset construction", "Building a DFA whose states are sets of NFA states, tracking every state the NFA could be in."],
        ["frozenset", "Python's immutable set; it is hashable, so it can be a dictionary key or a member of a set."],
        ["Concatenation of languages", "L1L2 = the set of strings xy with x in L1 and y in L2."],
        ["Kleene star", "L* = all strings made by concatenating zero or more strings of L; always contains ε."]
      ],
      quiz: [
        { q: "When does an NFA accept a string w?", choices: ["When every computation path ends in an accepting state", "When at least one way of making its choices reads all of w and ends in an accepting state", "When it never gets stuck", "When its first move is to an accepting state"], answer: 1, why: "Acceptance is existential: one successful path is enough." },
        { q: "An NFA has 5 states. At most how many states can the DFA from the subset construction have?", choices: ["5", "10", "25", "32"], answer: 3, why: "DFA states are subsets of the 5 NFA states, and there are 2^5 = 32 subsets." },
        { q: "In the NFA N3 (third symbol from the end is 1), what is the set of current states after reading 11?", choices: ["{0}", "{0, 1}", "{0, 1, 2}", "{2}"], answer: 2, why: "After the first 1: {0, 1}. On the second 1, 0 goes to 0 or 1 and 1 goes to 2: {0, 1, 2}." },
        { q: "What is the ε-closure of a set S of states?", choices: ["The states with no ε-moves", "All states reachable from S using ε-transitions only, including S itself", "The accepting states", "The states reachable by one symbol"], answer: 1, why: "It is a graph search along ε-arrows, starting from S." },
        { q: "Why must any DFA for 'the 4th symbol from the end is 1' have at least 16 states?", choices: ["Because the NFA has 5 states", "Because any two different strings of length 4 can be extended by the same suffix so that exactly one is in the language", "Because DFAs can't guess", "It needn't: 5 states suffice"], answer: 1, why: "So the 2^4 = 16 strings of length 4 must all reach different states." },
        { q: "Which language is always in L*, whatever L is?", choices: ["L itself only", "The empty language", "{ε}: L* always contains the empty string", "Σ*"], answer: 2, why: "L* includes the concatenation of zero strings of L, which is ε." }
      ],
      practice: [
        {
          q: `<p>Design an NFA over {a, b} with 4 states for the strings that end in abb, and convert it to a DFA with the subset construction. How many DFA states are reachable?</p>`,
          hint: `<p>State 0 loops on a and b and guesses, on an a, that the final abb has begun.</p>`,
          a: `<p>NFA: 0 loops on a, b; 0 →<sub>a</sub> 1 →<sub>b</sub> 2 →<sub>b</sub> 3; accepting {3}.</p><table><tr><th>DFA state</th><th>on a</th><th>on b</th><th>accepting?</th></tr><tr><td>{0} (start)</td><td>{0, 1}</td><td>{0}</td><td>no</td></tr><tr><td>{0, 1}</td><td>{0, 1}</td><td>{0, 2}</td><td>no</td></tr><tr><td>{0, 2}</td><td>{0, 1}</td><td>{0, 3}</td><td>no</td></tr><tr><td>{0, 3}</td><td>{0, 1}</td><td>{0}</td><td>yes</td></tr></table><p>Four reachable states, no more than the NFA. The blow-up happens for some languages, not all.</p>`
        },
        {
          q: `<p>A student builds an NFA for <em>L</em>* by making the old start state accepting and adding ε-moves from the accepting states back to it, without adding a new start state. Show that this is wrong using the NFA for <em>L</em> = a*b with states 0 (start, loops on a) and 1 (accepting), and 0 →<sub>b</sub> 1.</p>`,
          a: `<p>The student's machine makes 0 accepting and adds 1 →<sub>ε</sub> 0. It accepts the string a: loop on a at state 0, which is now accepting. But every non-empty string in (a*b)* ends in b, so a is not in <em>L</em>*. The problem is that state 0 has incoming arrows (its own loop), so making it accepting accepts strings that pass through it in the middle of a piece. A fresh start state with no incoming arrows avoids this.</p>`
        },
        {
          q: `<p>Run <code>run_nfa</code> by hand on the union NFA from the notes (0 →<sub>ε</sub> 1, 0 →<sub>ε</sub> 3, 1 loops on a, 3 →<sub>a</sub> 4 →<sub>b</sub> 3, accepting {1, 3}) for the input aab. List the set of current states after each symbol and give the answer.</p>`,
          a: `<p>Start: <em>E</em>({0}) = {0, 1, 3}. After a: 1 → 1 and 3 → 4, so {1, 4} (no ε-moves from these). After a: 1 → 1, and 4 has no a-move, so {1}. After b: 1 has no b-move, so ∅. The set is empty, which contains no accepting state: reject. Correct, since aab is neither all a's nor in (ab)*.</p>`
        },
        {
          q: `<p>Explain why, in the subset construction, the DFA state after reading <em>w</em> is exactly the set of NFA states reachable on <em>w</em>. Structure your answer as an induction on |<em>w</em>|.</p>`,
          a: `<p>Let <em>R</em>(<em>w</em>) be the set of states <em>N</em> can be in after reading <em>w</em>, allowing ε-moves before, between and after symbols. Claim: Δ*(<em>s</em><sub>0</sub>, <em>w</em>) = <em>R</em>(<em>w</em>).</p><p>Base: <em>R</em>(ε) is everything reachable from <em>q</em><sub>0</sub> by ε-moves, which is <em>E</em>({<em>q</em><sub>0</sub>}) = <em>s</em><sub>0</sub>.</p><p>Step: a path for <em>wa</em> is a path for <em>w</em> to some <em>q</em> ∈ <em>R</em>(<em>w</em>), then an <em>a</em>-move from <em>q</em>, then ε-moves. So <em>R</em>(<em>wa</em>) = <em>E</em>(⋃<sub><em>q</em> ∈ <em>R</em>(<em>w</em>)</sub> δ(<em>q</em>, <em>a</em>)) = Δ(<em>R</em>(<em>w</em>), <em>a</em>), which by the hypothesis is Δ(Δ*(<em>s</em><sub>0</sub>, <em>w</em>), <em>a</em>) = Δ*(<em>s</em><sub>0</sub>, <em>wa</em>). ∎ Then <em>D</em> accepts <em>w</em> ⇔ <em>R</em>(<em>w</em>) contains an accepting state ⇔ <em>N</em> accepts <em>w</em>.</p>`
        }
      ],
      sources: ["ericksonmodels", "sipser", "rabinscott59"]
    },
    {
      id: "tc3",
      title: "Regular expressions and minimal DFAs",
      minutes: 90,
      summary: "Regular expressions: their syntax and the languages they denote. Thompson's construction from a regular expression to an NFA, a sketch of the reverse direction by state elimination, and why practical regex engines that backtrack can take exponential time. Then DFA minimization by partition refinement.",
      notes: `
<p>DFAs and NFAs describe a language by a machine. A <strong>regular expression</strong> describes it by a formula, built from single symbols with three operations from Lesson 2: union, concatenation and star. This is the notation behind <code>grep</code>, every editor's search box and Python's <code>re</code> module, and this lesson shows that it describes exactly the regular languages.</p>

<h3>Syntax and meaning</h3>
<p>Regular expressions over Σ are defined recursively, the way a recursive function is defined in terms of smaller calls: each one is either a basic expression or built from smaller ones. Here they are, together with the language <em>L</em>(<em>R</em>) each one denotes:</p>
<table>
<tr><th>Expression <em>R</em></th><th>Language <em>L</em>(<em>R</em>)</th></tr>
<tr><td>∅</td><td>∅, no strings</td></tr>
<tr><td>ε</td><td>{ε}</td></tr>
<tr><td><em>a</em>, for a symbol <em>a</em> ∈ Σ</td><td>{<em>a</em>}</td></tr>
<tr><td><em>R</em><sub>1</sub> | <em>R</em><sub>2</sub> (union; some books write + or ∪)</td><td><em>L</em>(<em>R</em><sub>1</sub>) ∪ <em>L</em>(<em>R</em><sub>2</sub>)</td></tr>
<tr><td><em>R</em><sub>1</sub><em>R</em><sub>2</sub> (concatenation)</td><td><em>L</em>(<em>R</em><sub>1</sub>)<em>L</em>(<em>R</em><sub>2</sub>)</td></tr>
<tr><td><em>R</em>* (star)</td><td><em>L</em>(<em>R</em>)*</td></tr>
</table>
<p>Parentheses group. Without them, star binds tightest, then concatenation, then union, just as powers bind tighter than products and products tighter than sums in arithmetic. So ab*|c means (a(b*))|c. Examples over {a, b}:</p>
<ul>
<li>(a|b)*abb: any string, then abb, so the strings ending in abb (Lesson 2's NFA).</li>
<li>a*b*: some a's followed by some b's, such as ε, aab, bbb. Not ba.</li>
<li>(ab)*: ε, ab, abab, …, while ab* is a followed by any number of b's.</li>
<li>b*(ab*ab*)*: strings with an even number of a's. Each pass through the starred group reads exactly two a's.</li>
</ul>
<p>Practical syntax adds shorthands that don't change what can be expressed: <em>R</em>+ = <em>RR</em>* (one or more), <em>R</em>? = <em>R</em>|ε (optional), [abc] = a|b|c, [0-9] for a range of characters, and . for "any symbol". Python's <code>re</code> module, used in this lesson's practice, adds more: <code>\\w</code> matches one "word character" (a letter, digit or underscore) and <code>\\s</code> one whitespace character (space, tab, newline); <code>^</code> matches only at the start of the string and <code>$</code> only at the end (or just before a final newline), so <code>^</code><em>R</em><code>$</code> must match the whole input; and <code>(?:</code><em>R</em><code>)</code> groups like (<em>R</em>) but doesn't save the matched text for later use.</p>

<h3>Regular expressions describe exactly the regular languages</h3>
<p><strong>Kleene's theorem.</strong> A language is denoted by some regular expression if and only if it is regular. The two directions are two algorithms.</p>

<h4>From expression to NFA: Thompson's construction</h4>
<p>Build an NFA for each part of the expression, inside out, keeping every piece in a standard shape: one start state, one accepting state, and no arrows leaving the accepting state. Each rule glues pieces together with ε-transitions, exactly like the closure constructions of Lesson 2:</p>
<ul>
<li><strong>Symbol</strong> <em>a</em>: two new states <em>s</em> →<sub><em>a</em></sub> <em>f</em>. (For ε: <em>s</em> →<sub>ε</sub> <em>f</em>.)</li>
<li><strong>Concatenation</strong> <em>R</em><sub>1</sub><em>R</em><sub>2</sub>: an ε-arrow from the accepting state of <em>R</em><sub>1</sub>'s piece to the start of <em>R</em><sub>2</sub>'s.</li>
<li><strong>Union</strong> <em>R</em><sub>1</sub> | <em>R</em><sub>2</sub>: new <em>s</em> with ε-arrows to both starts, and new <em>f</em> with ε-arrows into it from both accepting states.</li>
<li><strong>Star</strong> <em>R</em>*: new <em>s</em> and <em>f</em>; ε-arrows <em>s</em> → (start of <em>R</em>) and <em>s</em> → <em>f</em> (zero repetitions), and from <em>R</em>'s accepting state back to its start (repeat) and on to <em>f</em> (stop).</li>
</ul>
<p>The code below reads the pattern with one function per precedence level, the style of parser Lesson 5 explains properly: <code>union</code> handles |, <code>concat</code> handles a sequence, <code>star</code> handles a trailing *, and <code>atom</code> handles a symbol or a parenthesized group. Each function returns the (start, accept) pair of the piece it built.</p>
<pre><code>def eps_closure(delta, states):            # from Lesson 2
    stack, seen = list(states), set(states)
    while stack:
        q = stack.pop()
        for r in delta.get((q, ""), ()):
            if r not in seen:
                seen.add(r)
                stack.append(r)
    return frozenset(seen)

def run_nfa(delta, start, accept, w):      # from Lesson 2
    current = eps_closure(delta, {start})
    for a in w:
        moved = set()
        for q in current:
            moved |= delta.get((q, a), set())
        current = eps_closure(delta, moved)
    return bool(current &amp; accept)

def thompson(pattern):
    delta, count, pos = {}, [0], [0]       # one-element lists, so the inner functions can update them

    def new_state():
        count[0] += 1
        return count[0] - 1

    def edge(p, a, q):
        delta.setdefault((p, a), set()).add(q)

    def peek():
        return pattern[pos[0]] if pos[0] &lt; len(pattern) else None

    def union():
        s1, f1 = concat()
        while peek() == "|":
            pos[0] += 1
            s2, f2 = concat()
            s, f = new_state(), new_state()
            edge(s, "", s1); edge(s, "", s2); edge(f1, "", f); edge(f2, "", f)
            s1, f1 = s, f
        return s1, f1

    def concat():
        s, f = new_state(), new_state()
        edge(s, "", f)                     # an empty sequence matches ε
        while peek() not in (None, "|", ")"):
            s2, f2 = star()
            edge(f, "", s2)
            f = f2
        return s, f

    def star():
        s1, f1 = atom()
        while peek() == "*":
            pos[0] += 1
            s, f = new_state(), new_state()
            edge(s, "", s1); edge(s, "", f); edge(f1, "", s1); edge(f1, "", f)
            s1, f1 = s, f
        return s1, f1

    def atom():
        c = peek()
        pos[0] += 1
        if c == "(":
            piece = union()
            if peek() != ")":
                raise ValueError("missing )")
            pos[0] += 1
            return piece
        s, f = new_state(), new_state()
        edge(s, c, f)
        return s, f

    s, f = union()
    if pos[0] != len(pattern):
        raise ValueError("unexpected " + pattern[pos[0]])
    return delta, s, f

def matches(pattern, w):
    delta, s, f = thompson(pattern)
    return run_nfa(delta, s, {f}, w)

print([w for w in ["a", "ab", "abcb", "ba", "acc", "abd"] if matches("a(b|c)*", w)])   # ['a', 'ab', 'abcb', 'acc']</code></pre>
<p>(Python's <code>nonlocal</code> statement would let the inner functions assign to <code>pos</code> directly; the one-element lists avoid a keyword this course hasn't introduced.) Each character of a pattern of length <em>m</em> adds at most four states, so the NFA has O(<em>m</em>) states and transitions, and Lesson 2's simulation matches a string of length <em>n</em> in O(<em>mn</em>) time. Ken Thompson published this method in 1968 and built it into the QED and ed editors; <code>grep</code> descends from them.</p>

<h4>From automaton to expression: state elimination</h4>
<p>The other direction removes states one at a time while labeling arrows with regular expressions instead of symbols. Add a new start state with an ε-arrow to the old one, and a new single accepting state with ε-arrows from the old accepting states. To remove a state <em>q</em>, look at every pair of an arrow <em>p</em> →<sub><em>R</em><sub>1</sub></sub> <em>q</em> in and <em>q</em> →<sub><em>R</em><sub>3</sub></sub> <em>r</em> out. If <em>q</em> has a self-loop labeled <em>R</em><sub>2</sub> and there is already an arrow <em>p</em> →<sub><em>R</em><sub>4</sub></sub> <em>r</em>, replace it with</p>
<p class="math">a single arrow <em>p</em> → <em>r</em> labeled (<em>R</em><sub>1</sub>(<em>R</em><sub>2</sub>)*<em>R</em><sub>3</sub>) | <em>R</em><sub>4</sub></p>
<p>(the whole expression is the label, and the | is the outermost operator: either the path through <em>q</em> or the old direct arrow), which says "go through <em>q</em>, looping any number of times, or go directly". (Leave out the parts for a missing loop or a missing direct arrow.) When only the new start and accepting states remain, the label on the one arrow between them is the expression. For example, with <em>s</em> →<sub>a</sub> <em>q</em>, a b-loop on <em>q</em>, and <em>q</em> →<sub>a</sub> <em>f</em>, removing <em>q</em> leaves <em>s</em> →<sub>ab*a</sub> <em>f</em>. The resulting expressions can be exponentially long, and different elimination orders give different (equivalent) expressions.</p>

<h3>How practical regex engines work</h3>
<p>Most popular engines (Perl's, PCRE, Java's, JavaScript's and Python's <code>re</code>) do not build an automaton. They <strong>backtrack</strong>: try one choice, and if the rest of the match fails, go back and try the next. That makes features beyond regular expressions easy. A <em>backreference</em> such as <code>(a*)b\\1</code> means "the same text the first group matched", so it denotes {a<sup><em>n</em></sup>ba<sup><em>n</em></sup>}, which is not regular (Lesson 4's distinguishing-set argument for {0<sup><em>n</em></sup>1<sup><em>n</em></sup>} works the same way: the strings a<sup><em>i</em></sup> need different suffixes ba<sup><em>i</em></sup>). But backtracking can be exponentially slow. To decide that (a|aa)*b doesn't match a string of <em>n</em> a's, a backtracking engine may try every way of splitting the a's into pieces of length 1 and 2 before giving up, and the number of ways grows like the Fibonacci numbers:</p>
<pre><code>def ways(n):                     # splits of n a's into pieces a and aa
    a, b = 1, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print([ways(n) for n in range(1, 9)], ways(30))   # [1, 2, 3, 5, 8, 13, 21, 34] 1346269</code></pre>
<p>For (a+)+b the count is 2<sup><em>n</em>−1</sup>: each way of matching cuts the <em>n</em> a's into non-empty runs, one run per repetition of the outer +, and a cut is fixed by choosing, for each of the <em>n</em> − 1 gaps between neighboring a's, whether to cut there (aaa splits as aaa, a|aa, aa|a or a|a|a: 2<sup>2</sup> = 4 ways). Python's <code>re.fullmatch(r"(a+)+b", "a" * n)</code> shows it: on the machine used to write this lesson it took about 0.04 seconds for <em>n</em> = 20 and 0.6 seconds for <em>n</em> = 24, roughly doubling with each extra a. An automaton-based matcher answers in time proportional to <em>n</em>, because the set of NFA states it tracks never has more than <em>m</em> members. Engines that guarantee this, such as Google's RE2 and Rust's <code>regex</code> crate, simply leave out backreferences. Python 3.11 added possessive quantifiers (<code>a++</code>) and atomic groups (<code>(?&gt;…)</code>), which forbid backtracking into part of a pattern and are one way to avoid the problem.</p>

<h3>Minimizing a DFA</h3>
<p>Different DFAs can accept the same language. Is there a smallest one? Call two states <em>p</em> and <em>q</em> <strong>equivalent</strong> if no suffix tells them apart: for every string <em>z</em>, reading <em>z</em> from <em>p</em> ends in an accepting state exactly when reading <em>z</em> from <em>q</em> does. A string <em>z</em> for which exactly one of them accepts <strong>distinguishes</strong> them. Equivalent states can be merged without changing the language, and (Lesson 4 proves) after removing unreachable states and merging all equivalent ones, the result is the unique smallest DFA for the language, up to renaming its states.</p>
<p><strong>Partition refinement</strong> (Moore's algorithm) finds the equivalent states. Start with two blocks: accepting and non-accepting states (ε distinguishes them). Then repeat: put two states in the same block only if they are in the same block now <em>and</em>, for each symbol, their transitions go to the same block. Stop when a round splits nothing. After round <em>k</em>, two states share a block exactly when no suffix of length at most <em>k</em> distinguishes them; for a DFA with <em>n</em> states at most <em>n</em> − 2 rounds can change anything, since each such round adds at least one block and there can't be more than <em>n</em>.</p>
<p>Example: a 6-state DFA over {a, b} counts a's mod 6 (a moves <em>i</em> to <em>i</em> + 1 mod 6; b stays) and accepts in states 0 and 3. It accepts the strings whose number of a's is a multiple of 3.</p>
<table>
<tr><th>Round</th><th>Blocks</th><th>Why</th></tr>
<tr><td>0</td><td>{0, 3}, {1, 2, 4, 5}</td><td>accepting or not</td></tr>
<tr><td>1</td><td>{0, 3}, {1, 4}, {2, 5}</td><td>on a, 1 and 4 go to the non-accepting block, 2 and 5 to the accepting one</td></tr>
<tr><td>2</td><td>no change</td><td>0 and 3 both go to {1, 4} on a, 1 and 4 to {2, 5}, 2 and 5 to {0, 3}; b stays in the same block</td></tr>
</table>
<p>Three blocks remain, so the minimal DFA has 3 states: count a's mod 3.</p>
<pre><code>def minimize(delta, states, alphabet, accept):
    """Return a dict mapping each state to its block number."""
    block = {q: int(q in accept) for q in states}
    while True:
        sig = {q: (block[q],) + tuple(block[delta[(q, a)]] for a in alphabet) for q in states}
        ids = {}
        new = {q: ids.setdefault(sig[q], len(ids)) for q in states}
        if len(ids) == len(set(block.values())):    # no block was split
            return new
        block = new

M6 = {}
for i in range(6):
    M6[(i, "a")] = (i + 1) % 6
    M6[(i, "b")] = i
print(minimize(M6, range(6), "ab", {0, 3}))   # {0: 0, 1: 1, 2: 2, 3: 0, 4: 1, 5: 2}</code></pre>
<p>The <em>signature</em> of a state is its current block plus the blocks its transitions reach; <code>setdefault</code> numbers each new signature the first time it appears. Each round takes O(|<em>Q</em>| · |Σ|) time and there are at most |<em>Q</em>| rounds. (Hopcroft's algorithm does the same job in O(|<em>Q</em>| · |Σ| log |<em>Q</em>|).) Minimization also gives a way to decide whether two DFAs, or two regular expressions, accept the same language: minimize both and compare.</p>
<p>Compare how, when the two minimal DFAs may name their states differently? Build the renaming as you go. The start states must correspond. Whenever state <em>p</em> of the first DFA corresponds to state <em>q</em> of the second, <em>p</em> and <em>q</em> must agree on accepting, and for each symbol <em>a</em> the state δ<sub>1</sub>(<em>p</em>, <em>a</em>) must correspond to δ<sub>2</sub>(<em>q</em>, <em>a</em>). Walk both machines in step from the start states, recording each new pair; if a state is ever paired with two different states, or a pair disagrees on accepting, the DFAs differ. Each state is visited once, so this takes O(|<em>Q</em>| · |Σ|) time:</p>
<pre><code>def same_up_to_renaming(d1, s1, F1, d2, s2, F2, alphabet):
    match = {s1: s2}                   # state of DFA 1 -> state of DFA 2
    todo = [s1]
    while todo:
        p = todo.pop()
        q = match[p]
        if (p in F1) != (q in F2):
            return False
        for a in alphabet:
            p2, q2 = d1[(p, a)], d2[(q, a)]
            if p2 not in match:
                match[p2] = q2
                todo.append(p2)
            elif match[p2] != q2:
                return False
    return len(set(match.values())) == len(match)

A = {(i, c): ((i + 1) % 3 if c == "a" else i) for i in range(3) for c in "ab"}
B = {("x", "a"): "z", ("z", "a"): "y", ("y", "a"): "x",
     ("x", "b"): "x", ("y", "b"): "y", ("z", "b"): "z"}
print(same_up_to_renaming(A, 0, {0}, B, "x", {"x"}, "ab"))   # True
print(same_up_to_renaming(A, 0, {1}, B, "x", {"y"}, "ab"))   # False</code></pre>
<p>Both DFAs count a's mod 3, with the states named 0, 1, 2 and x, z, y. In the first call both accept after a multiple of three a's; in the second, the first DFA accepts after one a (mod 3) and the second after two, and the walk finds that 1 is paired with z, which is not accepting.</p>
<p class="note">Why it matters: regular expressions are the most widely used piece of this course's theory. Knowing what they can't express (balanced parentheses, nested structures, a<sup><em>n</em></sup>b<sup><em>n</em></sup>) and how they are run (an automaton in linear time, or backtracking in possibly exponential time) tells you when a regex is the right tool and when it is a liability.</p>
`,
      terms: [
        ["Regular expression", "A formula built from ∅, ε and symbols with union (|), concatenation and star, denoting a language."],
        ["Kleene's theorem", "A language is denoted by a regular expression if and only if it is regular."],
        ["Thompson's construction", "Building an NFA from a regular expression piece by piece, joining pieces with ε-transitions; the NFA's size is linear in the expression's length."],
        ["State elimination", "Converting an automaton to a regular expression by removing states one at a time and labeling arrows with expressions."],
        ["Backtracking matcher", "A regex engine that tries one choice at a time and goes back on failure; supports backreferences but can take exponential time."],
        ["Backreference", "A regex feature that matches the same text an earlier group matched; it can express non-regular languages."],
        ["Catastrophic backtracking", "Exponential running time of a backtracking matcher on a pattern with many ways to match the same text."],
        ["Equivalent states", "Two DFA states from which exactly the same suffixes are accepted."],
        ["Distinguishing string", "A suffix that is accepted from one of two states and rejected from the other."],
        ["Partition refinement", "Minimizing a DFA by starting from accepting and non-accepting blocks and splitting blocks until transitions respect them."],
        ["Minimal DFA", "A DFA with the fewest states for its language; it is unique up to renaming states."]
      ],
      quiz: [
        { q: "How is ab*|c grouped?", choices: ["(ab)*|c", "(a(b*))|c", "a(b*|c)", "a((b|c)*)"], answer: 1, why: "Star binds tightest, then concatenation, then union." },
        { q: "Which string is NOT in the language of (a|b)*abb?", choices: ["abb", "babb", "abba", "aabb"], answer: 2, why: "The language is the strings ending in abb; abba ends in bba." },
        { q: "In Thompson's construction, how is R* built from the piece for R?", choices: ["Make R's start state accepting", "New start and accept states, with ε-arrows to skip R entirely and to go back from R's accept to R's start", "Reverse R's arrows", "Copy R twice"], answer: 1, why: "The skip arrow gives zero repetitions and the back arrow gives more than one." },
        { q: "Why can Python's re module take exponential time on some patterns?", choices: ["Because regular languages are hard to decide", "Because it backtracks, possibly trying exponentially many ways to match the same text", "Because Python is interpreted", "Because it builds a DFA first"], answer: 1, why: "Automaton-based matching is linear in the text; backtracking explores choices one at a time." },
        { q: "In partition refinement, what is the first partition?", choices: ["Every state alone", "All states in one block", "Accepting states and non-accepting states", "Reachable and unreachable states"], answer: 2, why: "The empty suffix ε already distinguishes an accepting state from a non-accepting one." },
        { q: "A DFA has states p and q, and reading ab from p ends in an accepting state while reading ab from q does not. What follows?", choices: ["p and q are equivalent", "ab distinguishes p and q, so they can't be merged", "The DFA is minimal", "The DFA has a dead state"], answer: 1, why: "Merging them would force one answer for both." }
      ],
      practice: [
        {
          q: `<p>Write regular expressions over {0, 1} for: (a) strings containing 00; (b) strings of odd length; (c) strings in which every 1 is immediately followed by 0; (d) strings that don't contain 00.</p>`,
          a: `<p>(a) (0|1)*00(0|1)*. (b) (0|1)((0|1)(0|1))*: one symbol, then pairs. (c) (0|10)*: the string splits into pieces 0 and 10. (d) (1|01)*(ε|0): every 0 except possibly a final one is followed by a 1. Check (d) on 0101: pieces 01, 01, then ε. On 100: after the piece 1, the pieces 1 and 01 can't start with 00, and the final (ε|0) allows just one 0, so 100 isn't matched, as it shouldn't be.</p>`
        },
        {
          q: `<p>Use state elimination on this DFA over {a, b}, which accepts strings with an odd number of a's: states <em>E</em> (start) and <em>O</em> (accepting), b loops on both, a goes <em>E</em> → <em>O</em> and <em>O</em> → <em>E</em>. Add new start <em>s</em> and accepting <em>f</em>, then eliminate <em>E</em> and then <em>O</em>.</p>`,
          a: `<p>Arrows: <em>s</em> →<sub>ε</sub> <em>E</em>, <em>O</em> →<sub>ε</sub> <em>f</em>, loops b on <em>E</em> and <em>O</em>, <em>E</em> →<sub>a</sub> <em>O</em>, <em>O</em> →<sub>a</sub> <em>E</em>.</p><p>Eliminate <em>E</em> (loop b): in-arrows from <em>s</em> (ε) and <em>O</em> (a), out-arrow to <em>O</em> (a). New <em>s</em> → <em>O</em>: b*a. New <em>O</em> → <em>O</em>: ab*a, combined with the existing loop b: b|ab*a.</p><p>Eliminate <em>O</em> (loop b|ab*a): <em>s</em> → <em>f</em> becomes b*a(b|ab*a)*. Check: a matches (b*a, then zero repetitions) and so does bab. Every repetition of (b|ab*a) adds either no a's or two, so the number of a's stays odd: aa doesn't match.</p>`
        },
        {
          q: `<p>Minimize this DFA over {0, 1} with partition refinement. States A (start) to E; accepting {C, E}. Transitions (on 0, on 1): A → (B, A), B → (D, C), C → (D, A), D → (B, E), E → (B, A). Give each round's blocks and the final machine. What language does it accept?</p>`,
          a: `<p>Round 0: {C, E}, {A, B, D}. Round 1: in {A, B, D}, on 0 all three go to the non-accepting block, but on 1, A goes to A (non-accepting) while B and D go to C and E (accepting). So split into {A}, {B, D}. In {C, E}, both go to the non-accepting block on 0 and to A on 1: they stay together. Blocks: {A}, {B, D}, {C, E}. Round 2: B and D go to D and B on 0 (both in {B, D}) and to C and E on 1 (both in {C, E}); C and E go to D and B on 0 and to A on 1. No change.</p><p>Minimal DFA: A (start), BD, CE (accepting); A →<sub>0</sub> BD, A →<sub>1</sub> A, BD →<sub>0</sub> BD, BD →<sub>1</sub> CE, CE →<sub>0</sub> BD, CE →<sub>1</sub> A. State BD means "ends in 0" and CE means "ends in 01", so the language is the strings ending in 01. The original DFA kept two copies of each of these states.</p>`
        },
        {
          q: `<p>A colleague's input validator uses the pattern <code>^(\\w+\\s?)*$</code> (words optionally separated by single spaces) with Python's <code>re</code>. Explain why an input of 30 letters followed by a ! could make it very slow, and suggest two fixes.</p>`,
          a: `<p>Without the optional spaces, the pattern is (\\w+)*, the same shape as (a+)+: a run of 30 letters can be split into words in 2<sup>29</sup> ways, and when the ! makes the final $ fail, a backtracking engine tries them all. Fixes: (1) write an unambiguous pattern in which each letter can be matched only one way, such as <code>^\\w+(\\s\\w+)*$</code>; (2) use an engine without backtracking, such as RE2, or a possessive or atomic form in Python 3.11+, or (3) limit the input length before matching. Testing with long, nearly-matching inputs catches this class of bug.</p>`
        }
      ],
      sources: ["ericksonmodels", "sipser", "thompson68", "cox07"]
    },
    {
      id: "tc4",
      title: "Limits of finite automata",
      minutes: 90,
      summary: "How to prove that no DFA accepts a language. The pumping lemma for regular languages, its proof from the pigeonhole principle, and careful worked proofs for 0ⁿ1ⁿ and balanced parentheses. Then the Myhill–Nerode theorem: distinguishing sets as a second, often simpler, method, and the proof that minimal DFAs are unique.",
      notes: `
<p>A DFA has a fixed number of states, so it can remember only a bounded amount about its input. Intuitively, then, it can't check that a string has as many 0s as 1s, or that parentheses balance, because that needs a counter that can grow without limit. This lesson turns the intuition into proofs. Proving that <em>no</em> machine of some kind can do a job is a new kind of argument: it's not enough to fail to find a DFA, you have to show that every possible DFA fails.</p>

<h3>The key observation</h3>
<p>Suppose a DFA with <em>p</em> states reads a string of length at least <em>p</em>. Including the start, it visits at least <em>p</em> + 1 states during the first <em>p</em> symbols, so by the pigeonhole principle (MATH 121 Lesson 2) some state <em>q</em> appears twice. The part of the input read between the two visits takes the machine from <em>q</em> back to <em>q</em>: it is a loop. The machine can't tell whether it went round the loop once, twice, or not at all.</p>
<figure class="fig"><svg viewBox="0 0 520 150" width="520" role="img" aria-label="A path through a DFA: from the start state, input x leads to state q; input y leads from q back to q in a loop; input z leads from q to an accepting state.">
<defs><marker id="arr-tc4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
<g class="ln"><line x1="30" y1="105" x2="76" y2="105" marker-end="url(#arr-tc4)"/>
<path d="M122 105 C170 105 200 105 236 105" class="dash" marker-end="url(#arr-tc4)"/><path d="M282 105 C330 105 360 105 396 105" class="dash" marker-end="url(#arr-tc4)"/>
<path d="M245 86 C215 20 305 20 275 86" class="dash" marker-end="url(#arr-tc4)"/></g>
<g class="box"><circle cx="100" cy="105" r="22"/><circle cx="260" cy="105" r="22"/><circle cx="420" cy="105" r="22"/></g>
<g class="ln"><circle cx="420" cy="105" r="17"/></g>
<g class="text"><text x="100" y="110" text-anchor="middle">q₀</text><text x="260" y="110" text-anchor="middle">q</text><text x="420" y="110" text-anchor="middle">f</text>
<text x="180" y="96" text-anchor="middle">x</text><text x="340" y="96" text-anchor="middle">z</text><text x="260" y="22" text-anchor="middle">y</text></g>
</svg><figcaption>If <em>xyz</em> is accepted and <em>y</em> leads from <em>q</em> back to <em>q</em>, then <em>xz</em>, <em>xyyz</em>, <em>xyyyz</em>, … all follow paths to the same accepting state.</figcaption></figure>

<h3>The pumping lemma</h3>
<p><strong>Pumping lemma for regular languages.</strong> If <em>L</em> is regular, there is a number <em>p</em> ≥ 1 (the <strong>pumping length</strong>) such that every string <em>s</em> ∈ <em>L</em> with |<em>s</em>| ≥ <em>p</em> can be split as <em>s</em> = <em>xyz</em> where</p>
<p>Condition 1: |<em>xy</em>| ≤ <em>p</em>,</p>
<p>Condition 2: |<em>y</em>| ≥ 1, and</p>
<p>Condition 3: <em>xy</em><sup><em>i</em></sup><em>z</em> ∈ <em>L</em> for every <em>i</em> ≥ 0.</p>
<p><em>Proof.</em> Let <em>p</em> be the number of states of a DFA for <em>L</em>, and let <em>s</em> ∈ <em>L</em> with |<em>s</em>| ≥ <em>p</em>. Let <em>r</em><sub>0</sub>, <em>r</em><sub>1</sub>, …, <em>r</em><sub><em>p</em></sub> be the states after reading 0, 1, …, <em>p</em> symbols of <em>s</em>. That is <em>p</em> + 1 states from a set of <em>p</em>, so <em>r</em><sub><em>i</em></sub> = <em>r</em><sub><em>j</em></sub> for some <em>i</em> &lt; <em>j</em> ≤ <em>p</em>. Let <em>x</em> be the first <em>i</em> symbols, <em>y</em> the next <em>j</em> − <em>i</em>, and <em>z</em> the rest. Then |<em>xy</em>| = <em>j</em> ≤ <em>p</em> and |<em>y</em>| = <em>j</em> − <em>i</em> ≥ 1. Reading <em>y</em> from <em>r</em><sub><em>i</em></sub> returns to <em>r</em><sub><em>i</em></sub>, so reading <em>y</em><sup><em>k</em></sup> does too, for any <em>k</em>; and <em>z</em> leads from <em>r</em><sub><em>i</em></sub> to the same accepting state as before. So every <em>xy</em><sup><em>k</em></sup><em>z</em> is accepted. ∎</p>

<h3>Using it: a game against an adversary</h3>
<p>The lemma says: <em>if</em> regular, <em>then</em> pumpable. We use the contrapositive (MATH 120 Lesson 1): if some long string can't be pumped, the language isn't regular. Write out the quantifiers carefully, because getting their order wrong is the usual mistake. <em>L</em> is regular ⇒ ∃<em>p</em> ∀<em>s</em> ∈ <em>L</em> with |<em>s</em>| ≥ <em>p</em> ∃ a split <em>xyz</em> satisfying conditions 1 and 2 such that ∀<em>i</em>: <em>xy</em><sup><em>i</em></sup><em>z</em> ∈ <em>L</em>. Negating flips each quantifier (MATH 120 Lesson 2), so to prove <em>L</em> is not regular you play a game in four steps:</p>
<p>Step 1: the adversary picks <em>p</em>. You don't know its value; your argument must work for every <em>p</em>.</p>
<p>Step 2: <em>you</em> pick a string <em>s</em> ∈ <em>L</em> with |<em>s</em>| ≥ <em>p</em>, usually written in terms of <em>p</em>.</p>
<p>Step 3: the adversary picks any split <em>s</em> = <em>xyz</em> with |<em>xy</em>| ≤ <em>p</em> and |<em>y</em>| ≥ 1 (conditions 1 and 2). You must handle <em>every</em> such split.</p>
<p>Step 4: <em>you</em> pick an <em>i</em> such that <em>xy</em><sup><em>i</em></sup><em>z</em> ∉ <em>L</em>.</p>
<p>If you can always win, <em>L</em> is not regular. The skill is in step 2: choose <em>s</em> so that condition 1 forces <em>y</em> into a part of the string where pumping breaks something.</p>

<h4>Example 1: {0<sup><em>n</em></sup>1<sup><em>n</em></sup> : <em>n</em> ≥ 0} is not regular</h4>
<p><em>Proof.</em> Suppose, for contradiction, that it is regular, with pumping length <em>p</em>. Let <em>s</em> = 0<sup><em>p</em></sup>1<sup><em>p</em></sup>, which is in the language and has length 2<em>p</em> ≥ <em>p</em>. Consider any split <em>s</em> = <em>xyz</em> with |<em>xy</em>| ≤ <em>p</em> and |<em>y</em>| ≥ 1. The first <em>p</em> symbols of <em>s</em> are all 0s, and <em>xy</em> lies within them, so <em>y</em> = 0<sup><em>k</em></sup> for some <em>k</em> ≥ 1. Take <em>i</em> = 2: <em>xy</em><sup>2</sup><em>z</em> = 0<sup><em>p</em>+<em>k</em></sup>1<sup><em>p</em></sup>, which has more 0s than 1s, so it is not in the language. This contradicts the pumping lemma. ∎</p>
<p>Notice what the proof did not do: it didn't pick a particular <em>p</em> such as 5, and it didn't pick a particular split such as <em>y</em> = 0. Condition 1 made every split look the same, which is why 0<sup><em>p</em></sup>1<sup><em>p</em></sup> is a good choice. By contrast, a string like 0<sup><em>k</em></sup>1<sup><em>k</em></sup> with 2<em>k</em> just above <em>p</em> would be a poor choice: <em>y</em> could then contain 0s, 1s or both, and each case would need its own argument.</p>

<h4>Example 2: balanced parentheses are not regular</h4>
<p>Let BAL be the strings over {(, )} in which the parentheses match: every prefix has at least as many ( as ), and the whole string has equally many. So (()()) is in BAL, and )( and (() are not.</p>
<p><em>Proof.</em> Suppose BAL is regular, with pumping length <em>p</em>. Let <em>s</em> = (<sup><em>p</em></sup>)<sup><em>p</em></sup>, which is balanced. For any split with |<em>xy</em>| ≤ <em>p</em> and |<em>y</em>| ≥ 1, <em>y</em> consists of <em>k</em> ≥ 1 open parentheses. Take <em>i</em> = 0: <em>xz</em> = (<sup><em>p</em>−<em>k</em></sup>)<sup><em>p</em></sup> has fewer ( than ), so it is not balanced. Contradiction. ∎</p>
<p>Pumping <em>down</em> (<em>i</em> = 0) is often the cleanest choice. This proof is why no regular expression can check that the brackets in source code, JSON or HTML match: nested structure needs the stack of Lesson 6.</p>

<h4>Checking the game by brute force</h4>
<p>A program can't prove a language is non-regular, since it can't try every <em>p</em>, but it can check your choice of string for a particular <em>p</em> by trying every split:</p>
<pre><code>def in_L(w):                           # L = {0^n 1^n : n >= 0}
    n = len(w) // 2
    return w == "0" * n + "1" * n

def pumping_split(in_lang, s, p, imax=3):
    """A split x, y, z of s with |xy| &lt;= p and |y| >= 1 that stays in the
    language for i = 0, 1, ..., imax, or None if there is none."""
    for j in range(1, min(p, len(s)) + 1):         # j = |xy|
        for i in range(j):                         # i = |x|
            x, y, z = s[:i], s[i:j], s[j:]
            if all(in_lang(x + y * k + z) for k in range(imax + 1)):
                return x, y, z
    return None

print(pumping_split(in_L, "0" * 5 + "1" * 5, 5))                    # None
print(pumping_split(lambda w: w.count("0") % 2 == 0, "0101", 3))   # ('0', '1', '01')</code></pre>
<p>For the regular language "even number of 0s", the split <em>y</em> = 1 pumps, as the lemma promises.</p>

<h4>A warning</h4>
<p>The pumping lemma is a necessary condition for regularity, not a sufficient one: some non-regular languages can be pumped. For example, <em>L</em> = {a<sup><em>i</em></sup>b<sup><em>j</em></sup>c<sup><em>k</em></sup> : if <em>i</em> = 1 then <em>j</em> = <em>k</em>} satisfies the lemma's conclusion with <em>p</em> = 2 (take <em>y</em> to be the first symbol; but if the string starts with exactly two a's, <em>i</em> = 2, take <em>y</em> = aa, so that pumping never makes the number of a's equal to 1), yet it is not regular. To show that, we need a stronger tool.</p>

<h3>The Myhill–Nerode theorem</h3>
<p>Lesson 2 proved a DFA lower bound by showing that certain strings must lead to different states. Make that idea exact. For a language <em>L</em>, two strings <em>x</em> and <em>y</em> are <strong>distinguishable</strong> by <em>L</em> if some string <em>z</em> has <em>xz</em> ∈ <em>L</em> and <em>yz</em> ∉ <em>L</em>, or the other way round. Otherwise write <em>x</em> ≡<sub><em>L</em></sub> <em>y</em>: no continuation can tell them apart.</p>
<p>≡<sub><em>L</em></sub> is an equivalence relation (MATH 120 Lesson 5): reflexive and symmetric by its definition, and transitive because if every <em>z</em> treats <em>x</em> like <em>y</em> and <em>y</em> like <em>w</em>, it treats <em>x</em> like <em>w</em>. So it splits Σ* into equivalence classes.</p>
<p><strong>Myhill–Nerode theorem.</strong> <em>L</em> is regular if and only if ≡<sub><em>L</em></sub> has finitely many classes. Moreover, the number of classes is the number of states of the smallest DFA for <em>L</em>.</p>
<p><em>Proof.</em> (Lower bound.) If two strings lead a DFA for <em>L</em> to the same state, every continuation then follows the same path, so they are equivalent. So distinguishable strings reach different states, and any DFA for <em>L</em> has at least as many states as there are classes. In particular, if there are infinitely many classes, no DFA exists.</p>
<p>(Construction.) If there are finitely many classes, build a DFA whose states <em>are</em> the classes: write [<em>x</em>] for the class of <em>x</em>, start at [ε], let δ([<em>x</em>], <em>a</em>) = [<em>xa</em>], and accept the classes of strings in <em>L</em>. This is well defined: if <em>x</em> ≡<sub><em>L</em></sub> <em>y</em> then <em>xa</em> ≡<sub><em>L</em></sub> <em>ya</em> (a suffix <em>z</em> distinguishing <em>xa</em> from <em>ya</em> would make <em>az</em> distinguish <em>x</em> from <em>y</em>), and a class can't contain strings both in and out of <em>L</em>, since ε would distinguish them. After reading <em>w</em> it is in state [<em>w</em>], and it accepts exactly when <em>w</em> ∈ <em>L</em>. It has exactly as many states as classes, matching the lower bound. ∎</p>
<p>This also settles Lesson 3's claim. A DFA with no unreachable states and no two equivalent states has one state per class of ≡<sub><em>L</em></sub>, so it is the class DFA with its states renamed: the minimal DFA is unique.</p>

<h3>Distinguishing sets</h3>
<p>To prove <em>L</em> not regular, find an infinite set <em>S</em> of strings, every two of which are distinguishable by <em>L</em>. Each must reach a different state of any DFA, and no DFA has infinitely many states. Such a set is called a <strong>distinguishing set</strong> (or fooling set).</p>
<p><em>0<sup>n</sup>1<sup>n</sup> again.</em> Let <em>S</em> = {0<sup><em>i</em></sup> : <em>i</em> ≥ 0}. For <em>i</em> ≠ <em>j</em>, the suffix 1<sup><em>i</em></sup> gives 0<sup><em>i</em></sup>1<sup><em>i</em></sup> ∈ <em>L</em> and 0<sup><em>j</em></sup>1<sup><em>i</em></sup> ∉ <em>L</em>. So <em>S</em> is an infinite distinguishing set and <em>L</em> is not regular. That is the whole proof.</p>
<p><em>The warning example.</em> For <em>L</em> = {a<sup><em>i</em></sup>b<sup><em>j</em></sup>c<sup><em>k</em></sup> : if <em>i</em> = 1 then <em>j</em> = <em>k</em>}, take <em>S</em> = {ab<sup><em>j</em></sup> : <em>j</em> ≥ 0}: for two different members ab<sup><em>j</em></sup> and ab<sup><em>n</em></sup> (so <em>n</em> ≠ <em>j</em>), the suffix c<sup><em>j</em></sup> accepts ab<sup><em>j</em></sup>c<sup><em>j</em></sup> and rejects ab<sup><em>n</em></sup>c<sup><em>j</em></sup>.</p>
<p>Brute force finds distinguishing suffixes for particular pairs, and reports when none exists up to some length:</p>
<pre><code>from itertools import product

def strings(alphabet, n):
    for k in range(n + 1):
        for t in product(alphabet, repeat=k):
            yield "".join(t)

def shortest_suffix(in_lang, x, y, alphabet, maxlen):
    for z in strings(alphabet, maxlen):
        if in_lang(x + z) != in_lang(y + z):
            return z
    return None

print(repr(shortest_suffix(in_L, "000", "00", "01", 6)))    # '11'
print(repr(shortest_suffix(in_L, "01", "0011", "01", 6)))   # None</code></pre>
<p>With <em>z</em> = 11, 00011 is out and 0011 is in. The strings 01 and 0011 are both in <em>L</em>, and any non-empty suffix takes both out, so they are equivalent: they belong to the same class.</p>

<h3>Closure properties as a tool</h3>
<p>Closure properties shorten many proofs. Let <em>E</em> be the strings over {0, 1} with equally many 0s and 1s. If <em>E</em> were regular, then <em>E</em> ∩ <em>L</em>(0*1*) would be regular too, by Lesson 1's product construction. But that intersection is {0<sup><em>n</em></sup>1<sup><em>n</em></sup>}, which is not regular. So <em>E</em> isn't either.</p>
<p>One more closure property is often handy. <strong>Renaming symbols</strong>: if <em>L</em> is regular, so is the language <em>L</em>′ you get by swapping 0 and 1 in every string of <em>L</em>. Proof: take a DFA for <em>L</em> and swap the labels 0 and 1 on every transition; it now follows on <em>w</em>′ exactly the path the old DFA followed on <em>w</em>. For example, if the strings with more 0s than 1s were regular, so would be the strings with more 1s than 0s. The same relabelling works for any one-to-one renaming of the alphabet.</p>
<p class="note">Why it matters: knowing that a task is beyond finite automata tells you which tool to reach for. Checking nesting (brackets, tags, indentation levels) needs a stack, and that is why compilers use a regular-expression lexer for tokens but a grammar-based parser for structure.</p>
`,
      terms: [
        ["Pumping lemma (regular)", "If L is regular, there is p such that every s in L with |s| ≥ p splits as xyz with |xy| ≤ p, |y| ≥ 1 and xyⁱz in L for all i ≥ 0."],
        ["Pumping length", "The number p in the pumping lemma; the proof uses the number of states of a DFA for L."],
        ["Pumping down", "Choosing i = 0 in the pumping lemma, which removes y."],
        ["Distinguishable strings", "Strings x and y for which some z puts exactly one of xz and yz in L."],
        ["Myhill–Nerode relation (≡L)", "x ≡L y when no suffix distinguishes x and y; an equivalence relation on strings."],
        ["Myhill–Nerode theorem", "L is regular exactly when ≡L has finitely many classes, and the number of classes is the size of the minimal DFA."],
        ["Distinguishing set", "A set of strings every two of which are distinguishable by L; an infinite one proves L is not regular."]
      ],
      quiz: [
        { q: "In a pumping-lemma proof that L is not regular, who chooses the split s = xyz?", choices: ["You do, and you may choose the most convenient one", "The adversary does: your argument must work for every split with |xy| ≤ p and |y| ≥ 1", "Nobody: y is always the first symbol", "The DFA"], answer: 1, why: "The lemma says some split exists; to contradict it you must defeat all of them." },
        { q: "For s = 0ᵖ1ᵖ with |xy| ≤ p, what can y be?", choices: ["Any non-empty substring", "0ᵏ for some k ≥ 1", "1ᵏ for some k ≥ 1", "01"], answer: 1, why: "xy lies within the first p symbols, which are all 0s." },
        { q: "A DFA for L has 7 states. What does the pumping lemma's proof guarantee about strings in L of length 7 or more?", choices: ["Nothing", "Some non-empty piece y within the first 7 symbols can be repeated or removed and the string stays in L", "They are all accepted", "L is finite"], answer: 1, why: "Among 8 states visited in the first 7 steps, one repeats; the piece between is a loop." },
        { q: "Which statement about the pumping lemma is true?", choices: ["Every language that satisfies it is regular", "It can prove a language is regular", "Some non-regular languages satisfy its conclusion, so it can only prove non-regularity", "It applies only to finite languages"], answer: 2, why: "It is a necessary condition. The Myhill–Nerode theorem gives an exact test." },
        { q: "The strings x = 00 and y = 000 are distinguishable for L = {0ⁿ1ⁿ}. Which suffix shows it?", choices: ["ε", "1", "11", "0"], answer: 2, why: "0011 is in L and 00011 is not." },
        { q: "A language has 5 pairwise distinguishable strings. What follows?", choices: ["It is not regular", "Every DFA for it has at least 5 states", "Its minimal DFA has exactly 5 states", "It is finite"], answer: 1, why: "Distinguishable strings must reach different states. Infinitely many would prove non-regularity." }
      ],
      practice: [
        {
          q: `<p>Use the pumping lemma to prove that {0<sup><em>i</em></sup>1<sup><em>j</em></sup> : <em>i</em> &gt; <em>j</em>} is not regular.</p>`,
          hint: `<p>Pumping up only adds 0s, which keeps <em>i</em> &gt; <em>j</em>. Which <em>i</em> removes them?</p>`,
          a: `<p>Suppose it is regular with pumping length <em>p</em>. Let <em>s</em> = 0<sup><em>p</em>+1</sup>1<sup><em>p</em></sup>, which is in the language and has length at least <em>p</em>. For any split with |<em>xy</em>| ≤ <em>p</em> and |<em>y</em>| ≥ 1, <em>y</em> = 0<sup><em>k</em></sup> with <em>k</em> ≥ 1. Pump down: <em>xz</em> = 0<sup><em>p</em>+1−<em>k</em></sup>1<sup><em>p</em></sup> has at most <em>p</em> zeros and <em>p</em> ones, so <em>i</em> &gt; <em>j</em> fails. Contradiction. ∎</p>`
        },
        {
          q: `<p>Prove with a distinguishing set that PAL, the palindromes over {0, 1} (strings equal to their reverse), is not regular.</p>`,
          a: `<p>Let <em>S</em> = {0<sup><em>i</em></sup>1 : <em>i</em> ≥ 0}. For <em>i</em> ≠ <em>j</em>, use the suffix <em>z</em> = 0<sup><em>i</em></sup>: 0<sup><em>i</em></sup>10<sup><em>i</em></sup> is a palindrome, while 0<sup><em>j</em></sup>10<sup><em>i</em></sup> is not (its reverse is 0<sup><em>i</em></sup>10<sup><em>j</em></sup>, which differs because the 1 is in a different position). So <em>S</em> is an infinite distinguishing set and PAL is not regular. ∎</p>`
        },
        {
          q: `<p>Find the mistake: "Claim: <em>L</em> = a*b* is not regular. Proof: let <em>p</em> be the pumping length and <em>s</em> = a<sup><em>p</em></sup>b<sup><em>p</em></sup>. Take <em>y</em> = ab, the middle two symbols. Then <em>xy</em><sup>2</sup><em>z</em> = a<sup><em>p</em>−1</sup>ababb<sup><em>p</em>−1</sup> is not in <em>L</em>. So <em>L</em> is not regular."</p>`,
          a: `<p>Two mistakes. The proof chose the split, but the adversary chooses it, so the proof must handle every allowed split. And the chosen split breaks the rule |<em>xy</em>| ≤ <em>p</em>, since <em>xy</em> = a<sup><em>p</em></sup>b has length <em>p</em> + 1. Every allowed split has <em>y</em> = a<sup><em>k</em></sup>, and a<sup><em>p</em>+(<em>i</em>−1)<em>k</em></sup>b<sup><em>p</em></sup> is always in a*b*. Of course: a*b* is a regular expression, so the language is regular.</p>`
        },
        {
          q: `<p>Let <em>L</em> be the binary strings with more 1s than 0s. Show <em>L</em> is not regular in two ways: (a) with a distinguishing set; (b) using closure properties and a language already shown non-regular in this lesson.</p>`,
          a: `<p>(a) <em>S</em> = {0<sup><em>i</em></sup> : <em>i</em> ≥ 0}. For <em>i</em> &lt; <em>j</em>, the suffix 1<sup><em>i</em>+1</sup> gives 0<sup><em>i</em></sup>1<sup><em>i</em>+1</sup> ∈ <em>L</em> (one more 1) and 0<sup><em>j</em></sup>1<sup><em>i</em>+1</sup> ∉ <em>L</em> (since <em>i</em> + 1 ≤ <em>j</em>). Infinite and pairwise distinguishable, so <em>L</em> is not regular.</p><p>(b) Suppose <em>L</em> were regular. By closure under renaming symbols (swap the labels 0 and 1 on every transition of a DFA for <em>L</em>), <em>L</em>′, the strings with more 0s than 1s, is regular. Then <em>L</em> ∪ <em>L</em>′ is regular, and so is its complement, which is <em>E</em>, the strings with equally many 0s and 1s. But the notes showed <em>E</em> is not regular. Contradiction. ∎</p>`
        }
      ],
      sources: ["ericksonmodels", "sipser", "hmu"]
    },
    {
      id: "tc5",
      title: "Context-free grammars and parsing",
      minutes: 90,
      summary: "Context-free grammars: rules that generate strings, derivations and parse trees, and the languages they describe, which include every regular language and nested structures that no DFA can handle. Ambiguity and how to remove it from an expression grammar, Chomsky normal form, the CYK parsing algorithm as dynamic programming, and a recursive-descent parser and evaluator for arithmetic.",
      notes: `
<p>Lesson 4 proved that no finite automaton can check balanced parentheses. Yet every programming language is full of nested structure: parentheses in expressions, blocks inside blocks, lists inside lists in JSON. Describing it needs a more powerful notation: grammars, which <em>generate</em> strings by rewriting.</p>

<h3>Context-free grammars</h3>
<p>A <strong>context-free grammar</strong> (CFG) is a 4-tuple <em>G</em> = (<em>V</em>, Σ, <em>R</em>, <em>S</em>):</p>
<ul>
<li><em>V</em>, a finite set of <strong>variables</strong> (also called nonterminals), written as capital letters;</li>
<li>Σ, the alphabet of <strong>terminals</strong>, the symbols that appear in the final strings, disjoint from <em>V</em>;</li>
<li><em>R</em>, a finite set of <strong>rules</strong> (or productions) <em>A</em> → <em>α</em>, where <em>A</em> is a variable and <em>α</em> is a string of variables and terminals, possibly ε;</li>
<li><em>S</em> ∈ <em>V</em>, the <strong>start variable</strong>.</li>
</ul>
<p>Rules with the same left side are combined with a bar: <em>S</em> → 0<em>S</em>1 | ε means the two rules <em>S</em> → 0<em>S</em>1 and <em>S</em> → ε. A <strong>derivation</strong> starts from <em>S</em> and repeatedly replaces one variable by the right side of one of its rules, written ⇒, until only terminals remain:</p>
<p class="math"><em>S</em> ⇒ 0<em>S</em>1 ⇒ 00<em>S</em>11 ⇒ 000<em>S</em>111 ⇒ 000111</p>
<p>The <strong>language of <em>G</em></strong>, <em>L</em>(<em>G</em>), is the set of terminal strings that can be derived from <em>S</em>, and a language is <strong>context-free</strong> if some CFG generates it. This grammar generates exactly {0<sup><em>n</em></sup>1<sup><em>n</em></sup> : <em>n</em> ≥ 0}, the language Lesson 4 proved non-regular. (By induction on the number of steps, every string derived so far has the form 0<sup><em>k</em></sup><em>S</em>1<sup><em>k</em></sup> or 0<sup><em>k</em></sup>1<sup><em>k</em></sup>; and 0<sup><em>n</em></sup>1<sup><em>n</em></sup> takes <em>n</em> uses of the first rule and one of the second.) "Context-free" means that a variable can be rewritten wherever it appears, whatever surrounds it.</p>
<p>More examples:</p>
<ul>
<li>Balanced parentheses: <em>S</em> → (<em>S</em>) | <em>SS</em> | ε. A balanced string is empty, a balanced string wrapped in a pair, or two balanced strings side by side.</li>
<li>Palindromes over {a, b}: <em>S</em> → a<em>S</em>a | b<em>S</em>b | a | b | ε.</li>
<li>Every regular language. Given a DFA, make a variable for each state, a rule <em>Q</em> → <em>a</em><em>R</em> for each transition δ(<em>Q</em>, <em>a</em>) = <em>R</em>, a rule <em>Q</em> → ε for each accepting state, and start from the start state's variable. A derivation then spells out the DFA's run, one symbol per step. So the regular languages are a subset of the context-free ones, and {0<sup><em>n</em></sup>1<sup><em>n</em></sup>} shows the subset is proper.</li>
</ul>

<h3>Parse trees and ambiguity</h3>
<p>A <strong>parse tree</strong> records a derivation without the order of steps: the root is <em>S</em>, each variable's children are the symbols of the rule used on it, left to right, and the leaves, read left to right, spell the derived string (its <strong>yield</strong>). A <strong>leftmost derivation</strong> always rewrites the leftmost variable; parse trees and leftmost derivations correspond one to one.</p>
<p>A grammar is <strong>ambiguous</strong> if some string has two different parse trees. The natural grammar for arithmetic is:</p>
<p class="math"><em>E</em> → <em>E</em> + <em>E</em> | <em>E</em> * <em>E</em> | ( <em>E</em> ) | a</p>
<figure class="fig"><svg viewBox="0 0 520 175" width="520" role="img" aria-label="Two parse trees for a + a * a. In the left tree the root E has children E, *, E, and its left E has children E, +, E: this groups the string as (a + a) * a. In the right tree the root has children E, +, E, and its right E has children E, *, E: this groups it as a + (a * a).">
<g class="ln">
<line x1="125" y1="30" x2="60" y2="60"/><line x1="125" y1="30" x2="125" y2="60"/><line x1="125" y1="30" x2="190" y2="60"/>
<line x1="60" y1="75" x2="20" y2="105"/><line x1="60" y1="75" x2="60" y2="105"/><line x1="60" y1="75" x2="100" y2="105"/>
<line x1="20" y1="120" x2="20" y2="148"/><line x1="100" y1="120" x2="100" y2="148"/><line x1="190" y1="75" x2="190" y2="148"/>
<line x1="395" y1="30" x2="330" y2="60"/><line x1="395" y1="30" x2="395" y2="60"/><line x1="395" y1="30" x2="460" y2="60"/>
<line x1="460" y1="75" x2="420" y2="105"/><line x1="460" y1="75" x2="460" y2="105"/><line x1="460" y1="75" x2="500" y2="105"/>
<line x1="330" y1="75" x2="330" y2="148"/><line x1="420" y1="120" x2="420" y2="148"/><line x1="500" y1="120" x2="500" y2="148"/></g>
<g class="text">
<text x="125" y="25" text-anchor="middle">E</text><text x="60" y="72" text-anchor="middle">E</text><text x="125" y="72" text-anchor="middle">*</text><text x="190" y="72" text-anchor="middle">E</text>
<text x="20" y="117" text-anchor="middle">E</text><text x="60" y="117" text-anchor="middle">+</text><text x="100" y="117" text-anchor="middle">E</text>
<text x="20" y="162" text-anchor="middle" class="code">a</text><text x="100" y="162" text-anchor="middle" class="code">a</text><text x="190" y="162" text-anchor="middle" class="code">a</text>
<text x="395" y="25" text-anchor="middle">E</text><text x="330" y="72" text-anchor="middle">E</text><text x="395" y="72" text-anchor="middle">+</text><text x="460" y="72" text-anchor="middle">E</text>
<text x="420" y="117" text-anchor="middle">E</text><text x="460" y="117" text-anchor="middle">*</text><text x="500" y="117" text-anchor="middle">E</text>
<text x="330" y="162" text-anchor="middle" class="code">a</text><text x="420" y="162" text-anchor="middle" class="code">a</text><text x="500" y="162" text-anchor="middle" class="code">a</text>
<text x="125" y="174" text-anchor="middle" class="m">(a + a) * a</text><text x="395" y="174" text-anchor="middle" class="m">a + (a * a)</text></g>
</svg><figcaption>Two parse trees with the same yield, a + a * a. A compiler evaluates the tree bottom-up, so with a = 2 the left tree gives 8 and the right tree 6.</figcaption></figure>
<p>For a compiler, the tree <em>is</em> the meaning, so ambiguity is a bug. The fix is to give each precedence level its own variable:</p>
<p class="math"><em>E</em> → <em>E</em> + <em>T</em> | <em>T</em> &nbsp;&nbsp; <em>T</em> → <em>T</em> * <em>F</em> | <em>F</em> &nbsp;&nbsp; <em>F</em> → ( <em>E</em> ) | a</p>
<p>An expression (<em>E</em>) is a sum of terms, a term (<em>T</em>) is a product of factors, and a factor (<em>F</em>) is an atom or a parenthesized expression. Now a + a * a has only one tree: the + must come from <em>E</em> → <em>E</em> + <em>T</em>, and the a * a must be the <em>T</em>. Because the rule is <em>E</em> → <em>E</em> + <em>T</em>, not <em>T</em> + <em>E</em>, a + a + a groups as (a + a) + a: left associative, as subtraction must be. Some context-free languages are <strong>inherently ambiguous</strong>: every grammar for them is ambiguous. {a<sup><em>i</em></sup>b<sup><em>j</em></sup>c<sup><em>k</em></sup> : <em>i</em> = <em>j</em> or <em>j</em> = <em>k</em>} is one, because strings with <em>i</em> = <em>j</em> = <em>k</em> can be generated "both ways".</p>
<p><em>The dangling else.</em> Statement grammars have a famous ambiguity of their own: with <em>S</em> → if <em>S</em> | if <em>S</em> else <em>S</em> | x, which if does the else in "if if x else x" belong to? Nearly every language with this syntax (C, Java, JavaScript) uses the convention that an <strong>else belongs to the nearest if that has no else yet</strong>. A language can enforce it in two ways. One is a grammar rewrite, like the precedence rewrite above, with one variable for "matched" statements, whose every if has its else, and one for the rest:</p>
<p class="math"><em>S</em> → <em>M</em> | <em>U</em> &nbsp;&nbsp; <em>M</em> → if <em>M</em> else <em>M</em> | x &nbsp;&nbsp; <em>U</em> → if <em>S</em> | if <em>M</em> else <em>U</em></p>
<p>Only a matched statement may stand before an else, so an else can never skip past an if that is still open. (A brute-force count of parse trees confirms that this grammar generates the same strings as the original and gives each of the strings up to 9 tokens long exactly one tree.) The other way is to keep the ambiguous grammar and let the parser decide: when it has read "if <em>S</em>" and sees an else, it always attaches the else to the if it is in the middle of. A recursive-descent parser does that naturally, by checking for else right after parsing the inner statement. Some languages avoid the problem in the syntax: Python uses indentation, Rust and Go require braces around every branch, and Ada, Fortran and shell scripts close each if with an end keyword (end if, fi).</p>

<h3>Chomsky normal form</h3>
<p>Algorithms are simpler when every rule has one of a few shapes. A grammar is in <strong>Chomsky normal form</strong> (CNF) if every rule is <em>A</em> → <em>BC</em> (two variables, neither the start variable) or <em>A</em> → <em>a</em> (one terminal), plus possibly <em>S</em> → ε. (Lesson 8's 3SAT uses the same letters for <em>conjunctive</em> normal form, a shape for logic formulas; the two are unrelated.) Every CFG can be converted. For <em>S</em> → a<em>S</em>b | ε:</p>
<ol>
<li><strong>New start variable</strong> <em>S</em><sub>0</sub> → <em>S</em>, so the start never appears on a right side.</li>
<li><strong>Remove ε-rules</strong>: delete <em>S</em> → ε, and for each rule with <em>S</em> on the right, add a copy with that <em>S</em> left out: <em>S</em> → a<em>S</em>b | ab, and <em>S</em><sub>0</sub> → <em>S</em> | ε.</li>
<li><strong>Remove unit rules</strong> <em>A</em> → <em>B</em> by copying <em>B</em>'s rules to <em>A</em>: <em>S</em><sub>0</sub> → a<em>S</em>b | ab | ε.</li>
<li><strong>Replace terminals</strong> in long rules by new variables: <em>A</em> → a, <em>B</em> → b, so <em>S</em> → <em>ASB</em> | <em>AB</em>.</li>
<li><strong>Split long rules</strong> into pairs: <em>S</em> → <em>AT</em> with <em>T</em> → <em>SB</em>.</li>
</ol>
<p class="math"><em>S</em><sub>0</sub> → <em>AT</em> | <em>AB</em> | ε &nbsp;&nbsp; <em>S</em> → <em>AT</em> | <em>AB</em> &nbsp;&nbsp; <em>T</em> → <em>SB</em> &nbsp;&nbsp; <em>A</em> → a &nbsp;&nbsp; <em>B</em> → b</p>
<p>In CNF a parse tree is a binary tree above its leaves, so deriving a string of length <em>n</em> ≥ 1 takes exactly 2<em>n</em> − 1 steps. Count the symbols in the string derived so far (variables and terminals together): it starts as one symbol, <em>S</em>, and ends as <em>n</em> terminals. Each use of <em>A</em> → <em>BC</em> replaces one variable by two, adding one symbol, so there are <em>n</em> − 1 of them. Each use of <em>A</em> → <em>a</em> turns one variable into one terminal, and each of the <em>n</em> terminals is made once, so there are <em>n</em> of those: (<em>n</em> − 1) + <em>n</em> = 2<em>n</em> − 1.</p>

<h3>CYK: parsing by dynamic programming</h3>
<p>Given a CNF grammar and a string <em>w</em> of length <em>n</em>, does the grammar generate <em>w</em>? The <strong>CYK algorithm</strong> (Cocke, Younger, Kasami) answers with CS 220 Lesson 3's recipe:</p>
<ul>
<li><strong>Subproblems:</strong> for each substring <em>w</em>[<em>i</em> : <em>i</em> + ℓ], the set <em>T</em>[<em>i</em>][ℓ] of variables that derive it.</li>
<li><strong>Base case:</strong> for length 1, <em>T</em>[<em>i</em>][1] holds every <em>A</em> with a rule <em>A</em> → <em>w</em>[<em>i</em>].</li>
<li><strong>Recurrence:</strong> <em>A</em> derives a substring of length ℓ ≥ 2 exactly when it has a rule <em>A</em> → <em>BC</em> and the substring splits into a first part of some length <em>k</em> (1 ≤ <em>k</em> &lt; ℓ) that <em>B</em> derives and a rest that <em>C</em> derives. So <em>A</em> ∈ <em>T</em>[<em>i</em>][ℓ] if <em>B</em> ∈ <em>T</em>[<em>i</em>][<em>k</em>] and <em>C</em> ∈ <em>T</em>[<em>i</em> + <em>k</em>][ℓ − <em>k</em>].</li>
<li><strong>Order:</strong> by increasing length. <strong>Answer:</strong> is the start variable in <em>T</em>[0][<em>n</em>]?</li>
</ul>
<p>There are O(<em>n</em><sup>2</sup>) entries and each tries O(<em>n</em>) splits and every rule, so CYK takes O(<em>n</em><sup>3</sup> · |<em>R</em>|) time. For the grammar above (dropping <em>S</em><sub>0</sub> and testing for <em>S</em>, since we only try non-empty strings) and <em>w</em> = aabb:</p>
<table>
<tr><th>Length</th><th>a (i=0)</th><th>a (i=1)</th><th>b (i=2)</th><th>b (i=3)</th></tr>
<tr><td>1</td><td>A</td><td>A</td><td>B</td><td>B</td></tr>
<tr><td>2</td><td>–</td><td>S (A·B)</td><td>–</td><td></td></tr>
<tr><td>3</td><td>–</td><td>T (S·B)</td><td></td><td></td></tr>
<tr><td>4</td><td>S (A·T)</td><td></td><td></td><td></td></tr>
</table>
<p>The entry in column <em>i</em> and row ℓ is <em>T</em>[<em>i</em>][ℓ], for the substring starting at position <em>i</em> with length ℓ; "–" means empty. For example <em>T</em>[1][3] covers abb: the split ab | b gives <em>S</em> and <em>B</em>, and <em>T</em> → <em>SB</em> puts <em>T</em> there.</p>
<pre><code>G = {"S": [("A", "T"), ("A", "B")], "T": [("S", "B")], "A": [("a",)], "B": [("b",)]}

def cyk(grammar, start, w):
    n = len(w)
    if n == 0:
        return False
    table = [[set() for _ in range(n + 1)] for _ in range(n)]   # table[i][length]
    for i, c in enumerate(w):
        for var, rhss in grammar.items():
            if (c,) in rhss:
                table[i][1].add(var)
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            for k in range(1, length):
                left, right = table[i][k], table[i + k][length - k]
                for var, rhss in grammar.items():
                    for rhs in rhss:
                        if len(rhs) == 2 and rhs[0] in left and rhs[1] in right:
                            table[i][length].add(var)
    return start in table[0][n]

print([w for w in ["ab", "aabb", "aab", "abab", "aaabbb", "ba"] if cyk(G, "S", w)])   # ['ab', 'aabb', 'aaabbb']</code></pre>
<p>Each rule's right side is a tuple: ("A", "T") for <em>A</em> → <em>BC</em> rules, ("a",) for terminal rules.</p>

<h3>Recursive descent</h3>
<p>Cubic time is too slow for compiling a million-line program. Real parsers use grammars with more structure so that they can parse in linear time, reading left to right and deciding each step by looking at the next token. The simplest is <strong>recursive descent</strong>: one function per variable, which reads the input that variable derives.</p>
<p>The rule <em>E</em> → <em>E</em> + <em>T</em> is <strong>left recursive</strong>: a function for <em>E</em> would call itself first, without reading anything, and recurse forever. So rewrite it with repetition: <em>E</em> → <em>T</em> ( + <em>T</em> )*, "a term followed by any number of + term". The same strings are generated, and a loop that combines terms as it goes keeps the grouping left associative. Here is a parser that evaluates as it parses, with subtraction, division and unary minus added:</p>
<pre><code>def tokenize(text):
    tokens, i = [], 0
    while i &lt; len(text):
        c = text[i]
        if c.isspace():
            i += 1
        elif c.isdigit():
            j = i
            while j &lt; len(text) and text[j].isdigit():
                j += 1
            tokens.append(int(text[i:j]))
            i = j
        elif c in "+-*/()":
            tokens.append(c)
            i += 1
        else:
            raise ValueError("bad character " + c)
    return tokens

class Parser:
    def __init__(self, text):
        self.tokens, self.pos = tokenize(text), 0

    def peek(self):
        return self.tokens[self.pos] if self.pos &lt; len(self.tokens) else None

    def take(self):
        tok = self.peek()
        self.pos += 1
        return tok

    def expr(self):                    # expr := term (('+' | '-') term)*
        value = self.term()
        while self.peek() in ("+", "-"):
            if self.take() == "+":
                value += self.term()
            else:
                value -= self.term()
        return value

    def term(self):                    # term := factor (('*' | '/') factor)*
        value = self.factor()
        while self.peek() in ("*", "/"):
            if self.take() == "*":
                value *= self.factor()
            else:
                value /= self.factor()
        return value

    def factor(self):                  # factor := NUMBER | '(' expr ')' | '-' factor
        tok = self.take()
        if isinstance(tok, int):
            return tok
        if tok == "-":
            return -self.factor()
        if tok == "(":
            value = self.expr()
            if self.take() != ")":
                raise ValueError("expected )")
            return value
        raise ValueError("unexpected " + str(tok))

def evaluate(text):
    p = Parser(text)
    value = p.expr()
    if p.peek() is not None:
        raise ValueError("unexpected " + str(p.peek()))
    return value

print(evaluate("2 + 3 * (4 - 1)"), evaluate("8 - 3 - 2"), evaluate("-(2 + 3) * 4"))   # 11 3 -20</code></pre>
<p>The <strong>tokenizer</strong> (or lexer) is a finite automaton: it groups characters into numbers and operators. The parser handles the nesting. In 8 − 3 − 2 the loop in <code>expr</code> computes (8 − 3) − 2 = 3, not 8 − (3 − 2) = 7. Calls nest exactly as the parse tree does: evaluating 2 + 3 * (4 − 1), <code>expr</code> calls <code>term</code> for 2, then <code>term</code> for 3 * (4 − 1), which calls <code>factor</code> for the parenthesis, which calls <code>expr</code> again. The call stack (CS 210 Lesson 6) is doing the work of the stack in Lesson 6's pushdown automata.</p>
<p class="note">Why it matters: every compiler, interpreter, JSON library, SQL engine and configuration-file reader contains a parser built from a grammar. CPython's own parser is generated from a grammar file (since Python 3.9, a "PEG" grammar, a close relative of recursive descent), and parser generators such as yacc, Bison and ANTLR turn a grammar into a parser automatically.</p>
`,
      terms: [
        ["Context-free grammar (CFG)", "Variables, terminals, rules A → α and a start variable; it generates the strings derivable from the start."],
        ["Variable (nonterminal)", "A symbol of a grammar that is rewritten by rules; it never appears in the final strings."],
        ["Terminal", "A symbol of the alphabet; it appears in the generated strings."],
        ["Derivation", "A sequence of steps, each replacing one variable by the right side of one of its rules."],
        ["Context-free language", "A language generated by some CFG."],
        ["Parse tree", "A tree showing which rule was applied to each variable; its leaves spell the derived string."],
        ["Leftmost derivation", "A derivation that always rewrites the leftmost variable; it corresponds to exactly one parse tree."],
        ["Ambiguous grammar", "A grammar in which some string has two different parse trees."],
        ["Inherently ambiguous language", "A context-free language for which every grammar is ambiguous."],
        ["Chomsky normal form (CNF)", "Every rule is A → BC or A → a, plus possibly S → ε, with the start variable never on a right side."],
        ["CYK algorithm", "A dynamic-programming parser for CNF grammars: the variables deriving each substring, by increasing length; O(n³) time."],
        ["Recursive descent", "A parser with one function per grammar variable, each reading what its variable derives."],
        ["Left recursion", "A rule A → Aα, whose function in a recursive-descent parser would call itself without reading input."],
        ["Tokenizer (lexer)", "The first stage of a parser, which groups characters into tokens such as numbers, names and operators."]
      ],
      quiz: [
        { q: "Which string is generated by S → aSb | ε?", choices: ["abab", "aabb", "ba", "aab"], answer: 1, why: "The grammar generates aⁿbⁿ; aabb uses the first rule twice, then ε." },
        { q: "What makes a grammar ambiguous?", choices: ["It generates an infinite language", "Some string has two different parse trees", "It has ε-rules", "It is not in Chomsky normal form"], answer: 1, why: "Two trees mean two structures, and so possibly two meanings." },
        { q: "In the grammar E → E + T | T, T → T * F | F, F → (E) | a, how is a + a * a grouped?", choices: ["(a + a) * a", "a + (a * a)", "Both ways", "It is not generated"], answer: 1, why: "The + comes from E → E + T, and a * a is the T: products bind tighter." },
        { q: "How many derivation steps does a CNF grammar need for a string of length 5?", choices: ["5", "9", "10", "It depends on the grammar"], answer: 1, why: "2n − 1 = 9: four A → BC steps and five A → a steps." },
        { q: "What is the running time of CYK on a string of length n, for a fixed grammar?", choices: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"], answer: 3, why: "O(n²) table entries, each trying O(n) split points." },
        { q: "Why can't a recursive-descent parser use the rule E → E + T directly?", choices: ["It is ambiguous", "The function for E would call itself before reading any input, and recurse forever", "Recursive descent can't handle +", "It isn't in CNF"], answer: 1, why: "Left recursion must be rewritten as repetition, E → T (+ T)*." }
      ],
      practice: [
        {
          q: `<p>Write CFGs for: (a) {a<sup><em>i</em></sup>b<sup><em>j</em></sup> : <em>i</em> ≤ <em>j</em>}; (b) {a<sup><em>i</em></sup>b<sup><em>j</em></sup>c<sup><em>i</em></sup> : <em>i</em>, <em>j</em> ≥ 0}; (c) strings over {a, b} with equally many a's and b's. Give a derivation of one string of length 4 in each.</p>`,
          hint: `<p>For (c), split a string with equal counts at the first point after the start where the counts are equal again.</p>`,
          a: `<p>(a) <em>S</em> → a<em>S</em>b | <em>S</em>b | ε: each a comes with a b, and extra b's are allowed. <em>S</em> ⇒ a<em>S</em>b ⇒ a<em>S</em>bb ⇒ a<em>S</em>bbb ⇒ abbb.</p><p>(b) <em>S</em> → a<em>S</em>c | <em>B</em>, <em>B</em> → b<em>B</em> | ε. <em>S</em> ⇒ a<em>S</em>c ⇒ a<em>B</em>c ⇒ ab<em>B</em>c ⇒ abb<em>B</em>c ⇒ abbc.</p><p>(c) <em>S</em> → a<em>S</em>b<em>S</em> | b<em>S</em>a<em>S</em> | ε. A string with equal counts is empty or starts with a (or b), and the first point where the counts become equal again ends with the matching b (or a). <em>S</em> ⇒ a<em>S</em>b<em>S</em> ⇒ ab<em>S</em> ⇒ abb<em>S</em>a<em>S</em> ⇒ abba<em>S</em> ⇒ abba.</p>`
        },
        {
          q: `<p>Show that the grammar <em>S</em> → if <em>S</em> | if <em>S</em> else <em>S</em> | x is ambiguous by giving two parse trees (as bracketings) for "if if x else x". Explain what the ambiguity means for a program, and how languages resolve it.</p>`,
          a: `<p>Tree 1: if (if x else x), where the else belongs to the inner if. Tree 2: if (if x) else x, where it belongs to the outer one. This is the "dangling else". In a program, one tree runs the else branch when the outer condition is false and the other when the inner one is. C and Java resolve it by the convention that an else belongs to the nearest if without an else, enforced either by the parser or by rewriting the grammar with separate variables for matched and unmatched statements, as in the notes. Python avoids it altogether with indentation, and some languages require an end keyword.</p>`
        },
        {
          q: `<p>Run CYK by hand for the CNF grammar <em>S</em> → <em>AT</em> | <em>AB</em>, <em>T</em> → <em>SB</em>, <em>A</em> → a, <em>B</em> → b on the string abab. Fill in the table and say whether it is accepted.</p>`,
          a: `<p>Length 1: A, B, A, B. Length 2: ab (i = 0): S; ba (i = 1): no rule has right side BA, so empty; ab (i = 2): S. Length 3: aba (i = 0): splits a|ba (A, ∅) and ab|a (S, A); no rule SA, so empty. bab (i = 1): b|ab (B, S), ba|b (∅, B); empty. Length 4: abab: splits a|bab (A, ∅), ab|ab (S, S), aba|b (∅, B); no rule SS, so empty. S is not in the top cell: rejected, as it should be, since abab is not of the form aⁿbⁿ.</p>`
        },
        {
          q: `<p>Extend the recursive-descent grammar with exponentiation ^, which binds tighter than * and is right associative (2 ^ 3 ^ 2 = 2 ^ 9 = 512). Write the new grammar rules and explain how to code the new level so that it groups to the right.</p>`,
          a: `<p>Add a level between term and factor: term := power (('*' | '/') power)*, and power := factor ('^' power)?, meaning a factor optionally followed by ^ and another power. The recursion on the right makes it right associative: in code, <code>power</code> computes <code>base = self.factor()</code>, and if the next token is ^, takes it and returns <code>base ** self.power()</code>. For 2 ^ 3 ^ 2, the inner call evaluates 3 ^ 2 = 9 first. (One choice remains: in Python, −2 ** 2 is −4, so unary minus binds more loosely than **. To match that, apply unary minus at the term level, above power.)</p>`
        }
      ],
      sources: ["ericksonmodels", "sipser", "hmu", "chomsky56"]
    },
    {
      id: "tc6",
      title: "Pushdown automata and the limits of context-free languages",
      minutes: 90,
      summary: "Pushdown automata, finite automata with a stack: their definition, examples, and a simulator. Why they accept exactly the context-free languages (the grammar-to-automaton construction in full, the reverse as a sketch), the pumping lemma for context-free languages with a proof that aⁿbⁿcⁿ is not context-free, and which operations preserve context-free languages.",
      notes: `
<p>A grammar generates the strings of a language; a machine recognizes them. Lesson 3 showed that, for regular languages, the two views match: regular expressions, which also generate strings, describe exactly the languages finite automata recognize (Kleene's theorem). For context-free languages the matching machine is a finite automaton with one extra piece of memory: a stack, as in CS 102, unlimited in size but readable only at the top.</p>

<h3>Pushdown automata</h3>
<p>A <strong>pushdown automaton</strong> (PDA) is a 6-tuple (<em>Q</em>, Σ, Γ, δ, <em>q</em><sub>0</sub>, <em>F</em>) where <em>Q</em>, Σ, <em>q</em><sub>0</sub> and <em>F</em> are as for an NFA, Γ (gamma) is the <strong>stack alphabet</strong>, and the transition function is</p>
<p class="math">δ : <em>Q</em> × (Σ ∪ {ε}) × (Γ ∪ {ε}) → 𝒫(<em>Q</em> × (Γ ∪ {ε})).</p>
<p>A transition from <em>q</em> to <em>r</em> labeled <em>a</em>, <em>X</em> → <em>Y</em> means: read <em>a</em> from the input (or nothing, if <em>a</em> = ε), pop <em>X</em> from the top of the stack (or nothing, if <em>X</em> = ε, and if <em>X</em> isn't on top the move can't be taken), and push <em>Y</em> (or nothing). Like an NFA, a PDA is nondeterministic: it accepts <em>w</em> if <em>some</em> sequence of moves reads all of <em>w</em> and ends in an accepting state. The stack starts empty; a common trick is to push a marker $ first, so the machine can tell when the stack is empty again. To keep machines short we also allow pushing a whole string in one move, written with its top symbol first; this is shorthand for a chain of single pushes through extra states.</p>
<p><strong>Example: {0<sup><em>n</em></sup>1<sup><em>n</em></sup> : <em>n</em> ≥ 0}.</strong> Push $, push a 0 for every 0 read, then pop a 0 for every 1 read, and accept if $ is on top when the input ends.</p>
<table>
<tr><th>From</th><th>Label (read, pop → push)</th><th>To</th><th>Meaning</th></tr>
<tr><td>q0 (start, accepting)</td><td>ε, ε → $</td><td>q1</td><td>mark the bottom</td></tr>
<tr><td>q1</td><td>0, ε → 0</td><td>q1</td><td>count a 0</td></tr>
<tr><td>q1</td><td>1, 0 → ε</td><td>q2</td><td>first 1 cancels a 0</td></tr>
<tr><td>q2</td><td>1, 0 → ε</td><td>q2</td><td>each 1 cancels a 0</td></tr>
<tr><td>q2</td><td>ε, $ → ε</td><td>q3 (accepting)</td><td>every 0 was cancelled</td></tr>
</table>
<p>On 0011 the stack goes $, $0, $00, $0, $ and the machine moves to q3. On 0010 it gets stuck: in q2 with input 0 left, no move reads a 0.</p>
<p><strong>Example: even-length palindromes {<em>ww</em><sup>R</sup>}.</strong> Push every symbol; at some point guess that the middle has been reached (an ε-move); then pop and match each remaining symbol against the top. The guess is essential: the machine can't know where the middle is until the input ends. In fact no <em>deterministic</em> PDA accepts this language, so for PDAs, unlike finite automata, nondeterminism adds power.</p>

<h3>Simulating a PDA</h3>
<p>A <strong>configuration</strong> of a PDA is everything that determines its future: the state, the position in the input, and the stack contents. A breadth-first search (CS 201 Lesson 7) over configurations, starting from (start state, 0, empty stack), explores every possible computation. Unlike an NFA's set of states, the set of configurations can be infinite, since a PDA can push forever without reading. The simulator below caps the stack size, which is enough for the machines in this lesson.</p>
<pre><code>from collections import deque
from itertools import product

def strings(alphabet, n):
    for k in range(n + 1):
        for t in product(alphabet, repeat=k):
            yield "".join(t)

def run_pda(delta, start, accept, w, max_stack=50):
    """delta maps (state, symbol or "", top or "") to a set of (state, push).
    push is written top first; in the stack string the last character is the top."""
    first = (start, 0, "")
    seen, queue = {first}, deque([first])
    while queue:
        q, i, stack = queue.popleft()
        if i == len(w) and q in accept:
            return True
        reads = [""] + ([w[i]] if i &lt; len(w) else [])
        pops = [""] + ([stack[-1]] if stack else [])
        for a in reads:
            for top in pops:
                for r, push in delta.get((q, a, top), ()):
                    rest = stack[:-1] if top else stack
                    new = (r, i + len(a), rest + push[::-1])
                    if len(new[2]) &lt;= max_stack and new not in seen:
                        seen.add(new)
                        queue.append(new)
    return False

P01 = {("q0", "", ""): {("q1", "$")},
       ("q1", "0", ""): {("q1", "0")},
       ("q1", "1", "0"): {("q2", "")},
       ("q2", "1", "0"): {("q2", "")},
       ("q2", "", "$"): {("q3", "")}}
print([w for w in strings("01", 6) if run_pda(P01, "q0", {"q0", "q3"}, w)])   # ['', '01', '0011', '000111']</code></pre>
<p><code>deque</code>, from the <code>collections</code> module, is a queue with fast removal from the front (<code>popleft</code>), as CS 201 used for BFS. <code>push[::-1]</code> reverses the pushed string, so that its first character ends up last in the stack string, on top.</p>

<h3>PDAs and grammars are equivalent</h3>
<p><strong>Theorem.</strong> A language is context-free if and only if some PDA accepts it.</p>
<p><em>Grammar to PDA.</em> The PDA uses its stack to carry out a leftmost derivation, keeping the part of the current string that hasn't yet been matched against the input. It has three states:</p>
<ul>
<li>start → loop on ε, ε → <em>S</em>$ (push the start variable on top of a bottom marker);</li>
<li>in loop, for each rule <em>A</em> → <em>α</em>: ε, <em>A</em> → <em>α</em> (replace a variable on top by a right side, guessing which rule);</li>
<li>in loop, for each terminal <em>a</em>: <em>a</em>, <em>a</em> → ε (a terminal on top must match the next input symbol);</li>
<li>loop → accept on ε, $ → ε (everything matched).</li>
</ul>
<pre><code>def cfg_to_pda(grammar, start_var, terminals):
    delta = {("start", "", ""): {("loop", start_var + "$")}}
    for var, rhss in grammar.items():
        delta[("loop", "", var)] = {("loop", rhs) for rhs in rhss}
    for a in terminals:
        delta[("loop", a, a)] = {("loop", "")}
    delta[("loop", "", "$")] = {("accept", "")}
    return delta

D = cfg_to_pda({"S": ["0S1", ""]}, "S", "01")
print([w for w in strings("01", 6) if run_pda(D, "start", {"accept"}, w)])   # ['', '01', '0011', '000111']</code></pre>
<p>On 0011 the stack (top first) goes <em>S</em>$ → 0<em>S</em>1$ → (match 0) <em>S</em>1$ → 0<em>S</em>11$ → (match 0) <em>S</em>11$ → (<em>S</em> → ε) 11$ → (match 1, 1) $ → accept. At each moment, the input read so far followed by the stack (without $) is a step of the leftmost derivation <em>S</em> ⇒ 0<em>S</em>1 ⇒ 00<em>S</em>11 ⇒ 0011.</p>
<p><em>PDA to grammar (sketch).</em> First modify the PDA so that it has one accepting state, empties its stack before accepting, and makes every move either a push or a pop, not both and not neither. A move that pops <em>X</em> and pushes <em>Y</em> becomes two moves through a new state: the first reads the input symbol and pops <em>X</em>, the second reads ε and pushes <em>Y</em>. A move that does neither becomes a push of a new stack symbol into a new state, then an ε-move that pops it. Then make a variable <em>A<sub>pq</sub></em> for each pair of states, meant to generate exactly the inputs that take the PDA from <em>p</em> with some stack to <em>q</em> with the same stack, never going below it. Such a computation either returns to its starting stack height somewhere in the middle, at a state <em>r</em>, giving the rule <em>A<sub>pq</sub></em> → <em>A<sub>pr</sub>A<sub>rq</sub></em>; or it doesn't, so its first move (a push, of some <em>X</em>) is popped only by its last move. Call <em>r</em> the state the first move goes to and <em>s</em> the state the last move starts from. Between them the stack never goes below the pushed <em>X</em>, which gives <em>A<sub>pq</sub></em> → <em>a</em><em>A<sub>rs</sub></em><em>b</em>, where <em>a</em> and <em>b</em> are the symbols (or ε) read by that push and that pop. Add <em>A<sub>pp</sub></em> → ε for every state <em>p</em>, for the computation of no moves. The start variable is <em>A</em> for (start state, accepting state).</p>

<h3>The pumping lemma for context-free languages</h3>
<p><strong>Pumping lemma (context-free).</strong> If <em>L</em> is context-free, there is a number <em>p</em> such that every <em>s</em> ∈ <em>L</em> with |<em>s</em>| ≥ <em>p</em> can be split as <em>s</em> = <em>uvxyz</em> where</p>
<ol>
<li>|<em>vxy</em>| ≤ <em>p</em>,</li>
<li>|<em>vy</em>| ≥ 1, and</li>
<li><em>uv</em><sup><em>i</em></sup><em>xy</em><sup><em>i</em></sup><em>z</em> ∈ <em>L</em> for every <em>i</em> ≥ 0.</li>
</ol>
<p><em>Proof idea.</em> Take a grammar for <em>L</em> in Chomsky normal form with <em>k</em> variables, and let <em>p</em> = 2<sup><em>k</em></sup>. A parse tree whose paths from the root have at most <em>h</em> variables yields at most 2<sup><em>h</em>−1</sup> symbols, because the tree is binary above its leaves. So a string of length at least 2<sup><em>k</em></sup> has a parse tree with a path of more than <em>k</em> variables. Take a <em>longest</em> path from the root. Its lowest <em>k</em> + 1 variables are drawn from only <em>k</em> variables, so by the pigeonhole principle some variable <em>A</em> appears twice among them. Choosing the repeat there keeps |<em>vxy</em>| ≤ <em>p</em>: the upper <em>A</em> is at most <em>k</em> + 1 variables from the bottom of the path, and since the path is a longest one, no path down from the upper <em>A</em> can be longer than that (it would give a longer path from the root). So the upper <em>A</em>'s subtree has paths of at most <em>k</em> + 1 variables, and by the count above it yields at most 2<sup><em>k</em></sup> = <em>p</em> symbols. The upper <em>A</em>'s subtree yields <em>vxy</em> and the lower one's yields <em>x</em>. Replacing the lower subtree by a copy of the upper one gives <em>uv</em><sup>2</sup><em>xy</em><sup>2</sup><em>z</em>, and so on; replacing the upper by the lower gives <em>uxz</em>. Finally, <em>v</em> and <em>y</em> are not both empty. The upper <em>A</em> has another variable below it, so it used a rule <em>A</em> → <em>BC</em>, and the lower <em>A</em> lies in the subtree of one child, say <em>B</em>. The other child, <em>C</em>, is not the start variable (which never appears on a right side), and in CNF only the start variable can derive ε, so <em>C</em> yields at least one symbol. That symbol is in <em>vxy</em> but not in <em>x</em>, so it is in <em>v</em> or <em>y</em>.</p>
<p>The difference from the regular version: two pieces are pumped together, which is how a context-free language can keep two counts equal, and the pumped window <em>vxy</em> can be anywhere in <em>s</em>, not only at the start.</p>
<h4>Example: {a<sup><em>n</em></sup>b<sup><em>n</em></sup>c<sup><em>n</em></sup> : <em>n</em> ≥ 0} is not context-free</h4>
<p><em>Proof.</em> Suppose it is, with pumping length <em>p</em>, and let <em>s</em> = a<sup><em>p</em></sup>b<sup><em>p</em></sup>c<sup><em>p</em></sup>. Consider any split <em>s</em> = <em>uvxyz</em> with |<em>vxy</em>| ≤ <em>p</em> and |<em>vy</em>| ≥ 1. Since the block of b's has length <em>p</em>, the window <em>vxy</em> can't contain both an a and a c: so <em>v</em> and <em>y</em> together contain at most two of the three letters, and at least one letter in total. Pump up to <em>uv</em><sup>2</sup><em>xy</em><sup>2</sup><em>z</em>. If <em>v</em> or <em>y</em> contains two different letters, the result has them out of order (such as ...abab...), so it is not of the form a*b*c*. Otherwise each of <em>v</em>, <em>y</em> is a run of one letter, so pumping increases the count of one or two letters and leaves at least one letter's count at <em>p</em>. Either way the three counts are no longer equal, or the order is broken, and the string is not in the language. ∎</p>
<p>A PDA can match a's against b's by pushing and popping, but then the a-count is gone and the c's have nothing to compare with. Similar proofs show {<em>ww</em> : <em>w</em> ∈ {a, b}*} is not context-free, although its cousin {<em>ww</em><sup>R</sup>} is.</p>

<h3>Closure properties</h3>
<table>
<tr><th>Operation</th><th>Regular</th><th>Context-free</th><th>Why (for context-free)</th></tr>
<tr><td>Union</td><td>yes</td><td>yes</td><td>new start <em>S</em> → <em>S</em><sub>1</sub> | <em>S</em><sub>2</sub> (rename variables apart)</td></tr>
<tr><td>Concatenation</td><td>yes</td><td>yes</td><td><em>S</em> → <em>S</em><sub>1</sub><em>S</em><sub>2</sub></td></tr>
<tr><td>Star</td><td>yes</td><td>yes</td><td><em>S</em> → <em>S</em><sub>1</sub><em>S</em> | ε</td></tr>
<tr><td>Intersection</td><td>yes</td><td>no</td><td>{a<sup><em>n</em></sup>b<sup><em>n</em></sup>c<sup><em>m</em></sup>} ∩ {a<sup><em>m</em></sup>b<sup><em>n</em></sup>c<sup><em>n</em></sup>} = {a<sup><em>n</em></sup>b<sup><em>n</em></sup>c<sup><em>n</em></sup>}</td></tr>
<tr><td>Complement</td><td>yes</td><td>no</td><td>else intersection = complement of (complement ∪ complement), by De Morgan's law</td></tr>
<tr><td>Intersection with a regular language</td><td>yes</td><td>yes</td><td>run a PDA and a DFA together: the product construction, with the PDA's stack</td></tr>
</table>
<p>Both languages in the intersection row are context-free: {a<sup><em>n</em></sup>b<sup><em>n</em></sup>c<sup><em>m</em></sup>} is generated by <em>S</em> → <em>TC</em>, <em>T</em> → a<em>T</em>b | ε, <em>C</em> → c<em>C</em> | ε, and the other similarly. The last row gives quick proofs: if the strings over {a, b, c} with equally many of each letter were context-free, intersecting with the regular language a*b*c* would make {a<sup><em>n</em></sup>b<sup><em>n</em></sup>c<sup><em>n</em></sup>} context-free.</p>
<p class="note">Why it matters: the deterministic PDAs, which never have a choice of move, accept a smaller class of languages, the <em>deterministic context-free languages</em>, and they run in linear time. Most programming-language grammars are designed to stay inside this class (the LL and LR grammars that parser generators accept), which is why parsing source code is fast while CYK, which handles every CFG, is cubic.</p>
`,
      terms: [
        ["Pushdown automaton (PDA)", "A nondeterministic finite automaton with a stack: each move may read a symbol, pop the top of the stack, and push a symbol."],
        ["Stack alphabet (Γ)", "The symbols a PDA may store on its stack."],
        ["Configuration", "A machine's complete situation at one moment: for a PDA, the state, the input position and the stack contents."],
        ["Bottom marker ($)", "A symbol pushed first so that a PDA can detect an empty stack."],
        ["Deterministic PDA", "A PDA with at most one possible move in every configuration; it accepts fewer languages than nondeterministic PDAs."],
        ["Pumping lemma (context-free)", "If L is context-free, there is p such that every s in L with |s| ≥ p splits as uvxyz with |vxy| ≤ p, |vy| ≥ 1 and uvⁱxyⁱz in L for all i ≥ 0."],
        ["Closure under intersection with regular languages", "The intersection of a context-free language and a regular language is context-free."]
      ],
      quiz: [
        { q: "What does the PDA transition label 1, 0 → ε mean?", choices: ["Read 1, push 0", "Read 1, pop a 0 from the top of the stack, push nothing", "Read 0, push 1", "Pop 1 and 0"], answer: 1, why: "The label is: input read, stack symbol popped → stack symbol pushed." },
        { q: "Why does the PDA for even-length palindromes need nondeterminism?", choices: ["It doesn't", "It must guess where the middle of the input is, which it can't know until the input ends", "Because the stack is finite", "Because palindromes are regular"], answer: 1, why: "No deterministic PDA accepts this language." },
        { q: "In the grammar-to-PDA construction, what happens when a variable A is on top of the stack?", choices: ["The machine rejects", "It pops A and pushes the right side of one of A's rules, chosen nondeterministically", "It reads an input symbol", "It pushes A again"], answer: 1, why: "That carries out one step of a leftmost derivation." },
        { q: "In the context-free pumping lemma, which pieces are repeated?", choices: ["Only y", "v and y, together and the same number of times", "u and z", "x"], answer: 1, why: "uvⁱxyⁱz: v and y come from the same repeated variable in the parse tree." },
        { q: "Why can't the window vxy in the proof for aᵖbᵖcᵖ contain both an a and a c?", choices: ["Because |vxy| ≤ p and the p b's lie between the a's and the c's", "Because v must be all a's", "Because |vy| ≥ 1", "It can"], answer: 0, why: "Reaching from an a to a c would span the whole block of p b's plus two more symbols." },
        { q: "Which operation do the context-free languages fail to be closed under?", choices: ["Union", "Concatenation", "Intersection", "Star"], answer: 2, why: "aⁿbⁿcᵐ ∩ aᵐbⁿcⁿ = aⁿbⁿcⁿ, which is not context-free." }
      ],
      practice: [
        {
          q: `<p>Design a PDA for {a<sup><em>i</em></sup>b<sup><em>j</em></sup> : <em>i</em> ≥ <em>j</em>}. Give its transitions in a table, and trace it on aab and on abb.</p>`,
          a: `<p>Push an a for each a, then pop one for each b. Leftover a's mean <em>i</em> &gt; <em>j</em>, which is allowed, so there is no need to empty the stack.</p><table><tr><th>From</th><th>Label</th><th>To</th></tr><tr><td>q0 (start)</td><td>ε, ε → $</td><td>q1</td></tr><tr><td>q1</td><td>a, ε → a</td><td>q1</td></tr><tr><td>q1</td><td>ε, ε → ε</td><td>q2 (accepting)</td></tr><tr><td>q2</td><td>b, a → ε</td><td>q2</td></tr></table><p>aab: push $, a, a; move to q2; b pops an a; the input ends in q2: accept. abb: the only branch that reads both b's in q2 pushes $, a, moves to q2, and pops the a on the first b; the second b needs an a on top but finds $, so it is stuck. Moving to q2 earlier only leaves fewer a's. Every branch fails: reject.</p>`
        },
        {
          q: `<p>Use the grammar-to-PDA construction on <em>S</em> → (<em>S</em>)<em>S</em> | ε and trace the stack, top first, on the input (()).</p>`,
          a: `<p><em>S</em>$ → expand <em>S</em> → (<em>S</em>)<em>S</em>: (<em>S</em>)<em>S</em>$ → match (: <em>S</em>)<em>S</em>$ → expand: (<em>S</em>)<em>S</em>)<em>S</em>$ → match (: <em>S</em>)<em>S</em>)<em>S</em>$ → <em>S</em> → ε: )<em>S</em>)<em>S</em>$ → match ): <em>S</em>)<em>S</em>$ → ε: )<em>S</em>$ → match ): <em>S</em>$ → ε: $ → pop $, accept. Every guess here was forced: an expansion with the wrong rule leaves a terminal on top that doesn't match the input, and that branch dies.</p>`
        },
        {
          q: `<p>Prove with the pumping lemma that {a<sup><em>n</em></sup>b<sup><em>n</em></sup>c<sup><em>m</em></sup> : <em>m</em> ≥ <em>n</em>} is not context-free.</p>`,
          hint: `<p>Use <em>s</em> = a<sup><em>p</em></sup>b<sup><em>p</em></sup>c<sup><em>p</em></sup>. Split into cases by whether <em>vy</em> contains a c, and pump down in one case and up in the other.</p>`,
          a: `<p>Suppose it is, with pumping length <em>p</em>, and let <em>s</em> = a<sup><em>p</em></sup>b<sup><em>p</em></sup>c<sup><em>p</em></sup>. Take any split with |<em>vxy</em>| ≤ <em>p</em> and |<em>vy</em>| ≥ 1. The window can't contain both an a and a c. If <em>v</em> or <em>y</em> contains two different letters, <em>uv</em><sup>2</sup><em>xy</em><sup>2</sup><em>z</em> has them out of order, so assume each is a run of one letter.</p><p>Case 1: <em>vy</em> contains a c, so it contains no a. Pump down to <em>uxz</em>. If <em>vy</em> also contains a b, the b-count drops below the a-count <em>p</em>. If not, the c-count drops below <em>p</em> = <em>n</em>, so <em>m</em> &lt; <em>n</em>. Either way <em>uxz</em> is not in the language.</p><p>Case 2: <em>vy</em> contains no c. Pump up to <em>uv</em><sup>2</sup><em>xy</em><sup>2</sup><em>z</em>. If the a-count and b-count grow by different amounts, they are no longer equal. If they grow by the same amount, both are now above <em>p</em> = <em>m</em>, so <em>m</em> &lt; <em>n</em>. Either way the string is not in the language.</p><p>Every split fails, contradicting the lemma. ∎</p>`
        },
        {
          q: `<p>Show that the strings over {a, b, c} with equally many a's, b's and c's are not context-free, using a closure property and the example in the notes. Then explain why the same trick shows nothing for the strings over {a, b} with equally many a's and b's.</p>`,
          a: `<p>If that language were context-free, its intersection with the regular language a*b*c* would be context-free. The intersection is {a<sup><em>n</em></sup>b<sup><em>n</em></sup>c<sup><em>n</em></sup>}, which the notes proved is not. Contradiction.</p><p>For two letters, the intersection with a*b* is {a<sup><em>n</em></sup>b<sup><em>n</em></sup>}, which <em>is</em> context-free, so no contradiction arises, and indeed the language is context-free (Lesson 5's practice gave the grammar <em>S</em> → a<em>S</em>b<em>S</em> | b<em>S</em>a<em>S</em> | ε). Closure arguments only work when the result is known to be outside the class.</p>`
        }
      ],
      sources: ["ericksonmodels", "sipser", "hmu"]
    },
    {
      id: "tc7",
      title: "Turing machines",
      minutes: 90,
      summary: "The Turing machine: a finite control with an unlimited tape it can read, write and move along in both directions. Its formal definition, configurations, a machine for 0ⁿ1ⁿ traced step by step, and a simulator with a step limit. Variants (multiple tapes, nondeterminism) and why they are no more powerful, recognizers versus deciders, the Church–Turing thesis, and the universal machine.",
      notes: `
<p>Finite automata have no memory beyond their state; pushdown automata add a stack they can only use at the top. Neither can recognize {a<sup><em>n</em></sup>b<sup><em>n</em></sup>c<sup><em>n</em></sup>}, which any beginner could check in Python. The model that matches what programs can do was found by Alan Turing in 1936, before any electronic computer existed, by asking what a person doing a calculation with pencil and paper actually does: looks at a few symbols, writes a few, moves attention a little, and changes state of mind, following fixed rules.</p>

<h3>Definition</h3>
<p>A <strong>Turing machine</strong> (TM) has a finite set of states and a <strong>tape</strong> divided into cells, unlimited to the right. The input is written in the leftmost cells, every other cell holds the <strong>blank</strong> symbol ⊔ (written _ in code), and a <strong>head</strong> starts on the leftmost cell. On each step the machine reads the symbol under the head, and, depending on that symbol and its state, writes a symbol, moves the head one cell left or right, and changes state. Formally, a TM is a 7-tuple (<em>Q</em>, Σ, Γ, δ, <em>q</em><sub>0</sub>, <em>q</em><sub>accept</sub>, <em>q</em><sub>reject</sub>):</p>
<ul>
<li><em>Q</em>, a finite set of states, including the start state <em>q</em><sub>0</sub> and two <strong>halting states</strong> <em>q</em><sub>accept</sub> and <em>q</em><sub>reject</sub>;</li>
<li>Σ, the input alphabet, which doesn't contain ⊔;</li>
<li>Γ, the <strong>tape alphabet</strong>, with Σ ⊆ Γ and ⊔ ∈ Γ; it may contain extra symbols for marking cells;</li>
<li>δ : (<em>Q</em> − {<em>q</em><sub>accept</sub>, <em>q</em><sub>reject</sub>}) × Γ → <em>Q</em> × Γ × {L, R}, the transition function: δ(<em>q</em>, <em>a</em>) = (<em>r</em>, <em>b</em>, L) means "in state <em>q</em> reading <em>a</em>, write <em>b</em>, move left, go to state <em>r</em>". A left move on the leftmost cell leaves the head where it is.</li>
</ul>
<p>The machine runs until it enters <em>q</em><sub>accept</sub> (it <strong>accepts</strong>) or <em>q</em><sub>reject</sub> (it <strong>rejects</strong>). It may also never enter either: it <strong>loops</strong>, running forever. That third outcome is new: a DFA stops when its input runs out, but a TM can keep working with the input long gone.</p>
<p>A <strong>configuration</strong> is written <em>u</em> <em>q</em> <em>v</em>: the tape holds <em>uv</em> followed by blanks, the state is <em>q</em>, and the head is on the first symbol of <em>v</em>.</p>

<h3>Example: a machine for 0<sup><em>n</em></sup>1<sup><em>n</em></sup></h3>
<p>Strategy: zig-zag. Cross off the leftmost 0 (write X), run right to the first 1 and cross it off (write Y), run back left to the X, and repeat. When no 0s remain, check that no 1s remain either.</p>
<table>
<tr><th>State</th><th>Reading</th><th>Write, move, next</th><th>Meaning</th></tr>
<tr><td>q0</td><td>0</td><td>X, R, q1</td><td>cross off a 0</td></tr>
<tr><td>q0</td><td>Y</td><td>Y, R, q3</td><td>no 0s left: check the rest</td></tr>
<tr><td>q0</td><td>⊔</td><td>⊔, R, accept</td><td>empty input</td></tr>
<tr><td>q1</td><td>0 or Y</td><td>same, R, q1</td><td>run right</td></tr>
<tr><td>q1</td><td>1</td><td>Y, L, q2</td><td>cross off a matching 1</td></tr>
<tr><td>q2</td><td>0 or Y</td><td>same, L, q2</td><td>run left</td></tr>
<tr><td>q2</td><td>X</td><td>X, R, q0</td><td>back at the boundary</td></tr>
<tr><td>q3</td><td>Y</td><td>Y, R, q3</td><td>skip crossed-off 1s</td></tr>
<tr><td>q3</td><td>⊔</td><td>⊔, R, accept</td><td>all matched</td></tr>
</table>
<p>Every pair not listed (such as q1 reading ⊔: a 0 with no matching 1) goes to <em>q</em><sub>reject</sub>. On 0011, the 13 steps are:</p>
<p class="math">q0 0011 → X q1 011 → X0 q1 11 → X q2 0Y1 → q2 X0Y1 → X q0 0Y1 → XX q1 Y1 → XXY q1 1 → XX q2 YY → X q2 XYY → XX q0 YY → XXY q3 Y → XXYY q3 ⊔ → accept</p>
<p>The machine is not limited to <em>recognizing</em> a fixed pattern: it can count, compare and copy, using the tape as working memory. And because the next step depends on all of the state and the scanned symbol, a few states can encode subtle algorithms.</p>

<h3>A simulator</h3>
<p>The tape is a dictionary from cell number to symbol, so it can grow as far as the machine needs. Because a machine may never halt, the simulator takes a step limit and reports "timeout" when it is reached; a timeout is not the same as looping, only "hasn't halted yet".</p>
<pre><code>def tape_string(tape):
    cells = [tape.get(i, "_") for i in range(max(tape) + 1)] if tape else []
    return "".join(cells).rstrip("_")         # drop trailing blanks only

def run_tm(delta, w, start="q0", max_steps=10_000):
    tape = dict(enumerate(w))                  # cell number -> symbol
    q, head, steps = start, 0, 0
    while q not in ("accept", "reject"):
        if steps == max_steps:
            return "timeout", steps, tape_string(tape)
        sym = tape.get(head, "_")
        if (q, sym) not in delta:              # missing transitions reject
            q = "reject"
            break
        q, write, move = delta[(q, sym)]
        tape[head] = write
        head = max(0, head + (1 if move == "R" else -1))
        steps += 1
    return q, steps, tape_string(tape)

ZERO_ONE = {
    ("q0", "0"): ("q1", "X", "R"), ("q0", "Y"): ("q3", "Y", "R"), ("q0", "_"): ("accept", "_", "R"),
    ("q1", "0"): ("q1", "0", "R"), ("q1", "Y"): ("q1", "Y", "R"), ("q1", "1"): ("q2", "Y", "L"),
    ("q2", "0"): ("q2", "0", "L"), ("q2", "Y"): ("q2", "Y", "L"), ("q2", "X"): ("q0", "X", "R"),
    ("q3", "Y"): ("q3", "Y", "R"), ("q3", "_"): ("accept", "_", "R"),
}
print(run_tm(ZERO_ONE, "0011"))   # ('accept', 13, 'XXYY')
print(run_tm(ZERO_ONE, "001"))    # ('reject', 7, 'XXY')
print([run_tm(ZERO_ONE, "0" * n + "1" * n)[1] for n in [1, 2, 4, 8, 16, 32]])   # [5, 13, 41, 145, 545, 2113]</code></pre>
<p><code>10_000</code> is Python's way of writing 10000 with a digit separator. The tape string runs from cell 0 to the last cell written, without trailing blanks; leading blanks stay, so its first character is always cell 0. (The last cell the head visits is either written or a trailing blank, so this is the same as "up to the last cell visited or written", as the tm_sim problem puts it.) The step counts fit 2<em>n</em><sup>2</sup> + 2<em>n</em> + 1 exactly: each of the <em>n</em> round trips crosses about 2<em>n</em> cells. A Python loop would check the same thing in linear time; a one-tape machine pays for having to walk to the data. That cost is the subject of the variants.</p>

<h3>Recognizers and deciders</h3>
<p>A TM <em>M</em> <strong>recognizes</strong> the language <em>L</em>(<em>M</em>) of strings it accepts; on other strings it may reject or loop. A language is <strong>Turing-recognizable</strong> (also called recursively enumerable) if some TM recognizes it. A TM is a <strong>decider</strong> if it halts on every input, and a language is <strong>decidable</strong> (or recursive) if some decider accepts it. Decidable means "solvable by an algorithm that always answers". ZERO_ONE is a decider. Lesson 8 shows that the two notions differ: some languages can be recognized but not decided.</p>

<h3>Variants, and why they don't matter</h3>
<p>Many changes to the model seem to add power. None does: each variant can be simulated by the basic machine, and the basic machine by it.</p>
<ul>
<li><strong>Stay put.</strong> Allowing a move S (no movement) changes nothing: replace it by a move right followed by a move left through an extra state.</li>
<li><strong>Two-way infinite tape.</strong> Fold the tape in half: cell <em>i</em> of a one-way tape holds the pair of symbols at positions <em>i</em> and −<em>i</em> − 1, and the state remembers which half the head is on.</li>
<li><strong>Multiple tapes.</strong> A <em>k</em>-tape machine has <em>k</em> tapes and heads, reads all <em>k</em> symbols, and writes and moves on each tape in one step. It can copy the 0s of 0<sup><em>n</em></sup>1<sup><em>n</em></sup> to a second tape and then match them against the 1s in about 2<em>n</em> steps. To simulate it on one tape, write the <em>k</em> tapes' contents one after another, separated by #, with a mark (a dotted version of each symbol, added to Γ) where each head is. To simulate one step, scan the whole tape once to read the marked symbols, and once more to update them. If the <em>k</em>-tape machine runs <em>t</em> steps, its tapes have at most <em>t</em> + <em>n</em> used cells, so each simulated step costs O(<em>t</em> + <em>n</em>), and the whole simulation O(<em>t</em><sup>2</sup>) for <em>t</em> ≥ <em>n</em>. (When a tape needs more space, the simulator shifts everything after it one cell right.)</li>
<li><strong>Nondeterminism.</strong> A nondeterministic TM may have several possible moves and accepts if some branch accepts. Simulate it by breadth-first search over its configurations, as the PDA simulator did: if any branch accepts in <em>t</em> steps, the search finds it. With at most <em>b</em> choices per step, that may take about <em>b</em><sup><em>t</em></sup> configurations, so the deterministic simulation can be exponentially slower. The search must be breadth-first: depth-first could follow an infinite branch forever and miss an accepting one.</li>
<li><strong>Real computers.</strong> A machine with random-access memory and a program, like the processors of CS 230, can be simulated on a multitape TM, holding memory as a list of (address, value) pairs on a tape, with a polynomial slowdown. In the other direction, run_tm above simulates any TM in Python.</li>
</ul>
<p>So these models can all compute the same things, and any of them simulates any other with at most a polynomial slowdown, with one important exception: removing nondeterminism, for which only an exponential simulation is known.</p>

<h3>The Church–Turing thesis</h3>
<p>In 1936 Alonzo Church (with the <em>λ-calculus</em>, a notation for defining functions) and Turing (with his machines) each proposed a precise definition of "effectively computable", and Turing proved the two equivalent. Later models (Post's systems, Kleene's recursive functions, register machines, every programming language) turned out equivalent too. The <strong>Church–Turing thesis</strong> says that these definitions capture the intuitive notion: <em>any function that can be computed by an algorithm, a finite, mechanical procedure, can be computed by a Turing machine</em>. It is not a theorem, since "algorithm" in the intuitive sense has no formal definition to prove things about; it is a claim supported by the failure of every attempt to find a counterexample. Quantum computers don't contradict it: they can be simulated by ordinary ones, though perhaps much more slowly.</p>
<p>In practice, the thesis lets us describe Turing machines in ordinary algorithmic prose ("scan the input; if it has an odd length, reject; ..."), as the rest of this course does, knowing that the prose could be turned into a transition table.</p>

<h3>Universal machines</h3>
<p>A TM's description is finite, so it can be written as a string: list its states and transitions in some fixed format, with symbols encoded in binary. Write ⟨<em>M</em>⟩ for the <strong>encoding</strong> of machine <em>M</em>, and ⟨<em>M</em>, <em>w</em>⟩ for the encoding of <em>M</em> together with an input <em>w</em>. Turing's second great idea was a <strong>universal Turing machine</strong> <em>U</em>: given ⟨<em>M</em>, <em>w</em>⟩, it simulates <em>M</em> on <em>w</em> step by step, keeping <em>M</em>'s tape on one part of its own tape and <em>M</em>'s current state on another, and looking up each transition in the description. <em>U</em> accepts if <em>M</em> accepts, rejects if <em>M</em> rejects, and loops if <em>M</em> loops.</p>
<p>This is the <strong>stored-program</strong> idea that every computer since the late 1940s uses: the program is data in memory, read and executed by a fixed machine. <code>run_tm</code> is a universal machine written in Python, with the transition dictionary as ⟨<em>M</em>⟩, and the Python interpreter running it is another. Universality has a price, which Lesson 8 collects: a machine that can run any machine can be asked about itself.</p>
<p class="note">Why it matters: the Church–Turing thesis is why "Turing complete" is the standard of power for programming languages. Python, C, SQL with recursive queries, spreadsheet formulas with LAMBDA, and even some card games and video-game mechanics have been shown Turing complete. Any one can simulate any other, so a problem that no Turing machine can solve can't be solved in any of them, however clever the code.</p>
`,
      terms: [
        ["Turing machine (TM)", "A finite control with an unlimited tape; each step reads the scanned symbol, writes a symbol, moves left or right and changes state."],
        ["Tape alphabet (Γ)", "The symbols a TM may write, including the input alphabet and the blank."],
        ["Blank (⊔)", "The symbol in every tape cell not holding input or written data."],
        ["Halting states", "The accept and reject states; entering one ends the computation."],
        ["Loop", "Running forever without entering a halting state."],
        ["Configuration (TM)", "The state, tape contents and head position, written u q v with the head on the first symbol of v."],
        ["Turing-recognizable language", "A language whose strings are exactly those some TM accepts; on other strings it may reject or loop."],
        ["Decider", "A TM that halts on every input."],
        ["Decidable language", "A language accepted by some decider: an algorithm always answers yes or no."],
        ["Multitape TM", "A TM with several tapes and heads; it can be simulated by a one-tape TM with quadratic slowdown."],
        ["Nondeterministic TM", "A TM with several possible moves; it accepts if some branch accepts. Simulated deterministically by breadth-first search, possibly with exponential slowdown."],
        ["Church–Turing thesis", "Every function computable by an algorithm is computable by a Turing machine."],
        ["Encoding ⟨M⟩", "A string describing a machine M (and ⟨M, w⟩, M together with an input w)."],
        ["Universal Turing machine", "A TM that, given ⟨M, w⟩, simulates M on w."],
        ["Turing complete", "Able to simulate any Turing machine."]
      ],
      quiz: [
        { q: "What can a Turing machine do that a pushdown automaton can't?", choices: ["Use states", "Read, write and move in both directions on an unlimited tape, and keep computing after reading its input", "Be nondeterministic", "Accept the empty string"], answer: 1, why: "Random-ish access to unlimited memory, and no requirement to stop when the input ends." },
        { q: "ZERO_ONE is in configuration XX q1 Y1. What is the next configuration?", choices: ["XXY q1 1", "XX q2 Y1", "XXYY q2", "X q0 XY1"], answer: 0, why: "In q1, a Y is skipped by moving right: the head moves to the 1." },
        { q: "What is the difference between a recognizer and a decider?", choices: ["None", "A decider halts on every input; a recognizer may loop on strings it doesn't accept", "A recognizer has more states", "A decider can't reject"], answer: 1, why: "Decidable languages are those with machines that always answer." },
        { q: "A 2-tape machine runs for t steps (t at least the input length). About how long does the one-tape simulation take?", choices: ["O(t)", "O(t²)", "O(2ᵗ)", "It can't be simulated"], answer: 1, why: "Each simulated step scans O(t) used cells." },
        { q: "Why must the deterministic simulation of a nondeterministic TM search breadth-first?", choices: ["It's faster", "Depth-first search might follow an infinite branch forever and miss an accepting branch", "To save memory", "Because TMs are deterministic"], answer: 1, why: "Breadth-first reaches every configuration at depth t after finitely many steps." },
        { q: "Why is the Church–Turing thesis not a theorem?", choices: ["It has been disproved", "It equates a precise notion (Turing machines) with an informal one (algorithm), which can't be proved", "Quantum computers violate it", "Turing didn't publish it"], answer: 1, why: "It is supported by evidence: every proposed model has turned out equivalent." }
      ],
      practice: [
        {
          q: `<p>Trace ZERO_ONE on 010 until it halts. Give every configuration and the outcome.</p>`,
          a: `<p>q0 010 → X q1 10 → q2 XY0 → X q0 Y0 → XY q3 0. In q3 the machine reads 0, which has no transition, so it rejects. (4 steps, then the reject.) Correct: 010 is not of the form 0<sup><em>n</em></sup>1<sup><em>n</em></sup>, and the stray 0 after the 1s is caught by q3.</p>`
        },
        {
          q: `<p>Describe (in words, with the states' meanings) a one-tape TM that decides {<em>w</em>#<em>w</em> : <em>w</em> ∈ {0, 1}*}, and estimate its running time.</p>`,
          hint: `<p>Compare the two halves one symbol at a time, crossing off each symbol once it is checked, and remember the symbol in the state.</p>`,
          a: `<p>Repeat: from the left, find the first symbol left of # that isn't crossed off. If it is #, go to the final check. Otherwise remember it in the state (states "carrying 0" and "carrying 1"), cross it off (write X), move right past #, skip crossed-off symbols, and compare with the first uncrossed symbol: if it differs, or is a blank, reject; otherwise cross it off and return to the left end. Final check: after #, everything must be crossed off; if an uncrossed 0 or 1 remains, reject, else accept. Also reject if there is no # or more than one. Each round trip covers O(<em>n</em>) cells and there are about <em>n</em>/2 rounds, so O(<em>n</em><sup>2</sup>) steps.</p>`
        },
        {
          q: `<p>Explain how a 2-tape TM can decide {0<sup><em>n</em></sup>1<sup><em>n</em></sup>} in O(<em>n</em>) steps, and compare with ZERO_ONE's 2<em>n</em><sup>2</sup> + 2<em>n</em> + 1 for <em>n</em> = 1000.</p>`,
          a: `<p>Scan the 0s, copying each to tape 2 (both heads move right). At the first 1, move head 2 back one cell onto the last copied 0. Then for each 1 on tape 1, move head 1 right and head 2 left. Accept if both run out together (tape 1 reaches a blank exactly when head 2 reaches the left end); reject on a 0 after a 1 or a mismatch. About 2<em>n</em> + O(1) steps for 0<sup><em>n</em></sup>1<sup><em>n</em></sup>: roughly 2,000 for <em>n</em> = 1000, against 2 · 1000<sup>2</sup> + 2001 = 2,002,001 for ZERO_ONE. Multiple tapes change the running time, not what can be decided.</p>`
        },
        {
          q: `<p>"Since a nondeterministic TM can guess, it can decide languages that no deterministic TM can." Is this true? Explain.</p>`,
          a: `<p>False. Breadth-first search over the configurations of a nondeterministic TM accepts whenever some branch accepts, so a deterministic TM recognizes the same language. If every branch of the nondeterministic machine halts on every input, the configuration tree is finite (each node has finitely many children, and a finitely-branching tree with no infinite path is finite), so the search halts too, and the language is decidable deterministically. Nondeterminism can only change the running time, possibly exponentially, which is the question of Lesson 8.</p>`
        }
      ],
      sources: ["ericksonmodels", "sipser", "turing36"]
    },
    {
      id: "tc8",
      title: "Undecidability and complexity",
      minutes: 90,
      summary: "What no algorithm can do. Countable and uncountable sets and diagonalization; the proof that the acceptance and halting problems are undecidable; reductions between undecidable problems and Rice's theorem. Then what algorithms can do efficiently: time complexity classes, P and NP defined with Turing machines, the idea behind the Cook–Levin theorem, and a reduction from 3SAT to independent set.",
      notes: `
<p>MATH 120's optional history lesson told the story: in 1936 Turing showed that no machine can decide whether another machine halts. This lesson proves it, then uses it to show that many other questions about programs have no algorithm. The second half returns to CS 220 Lesson 8 and puts P and NP on the Turing-machine foundation built in Lesson 7.</p>

<h3>Counting infinite sets</h3>
<p>Two sets have the <strong>same size</strong> if there is a bijection between them (MATH 120 Lesson 5): a function that pairs every element of one with exactly one element of the other. A set is <strong>countable</strong> if it is finite or has the same size as ℕ = {0, 1, 2, …}, which means its elements can be listed in a sequence that eventually reaches each one. The integers are countable (0, 1, −1, 2, −2, …), and so is Σ* for any alphabet: list strings by length, and alphabetically within each length (<strong>shortlex order</strong>), so over {0, 1}: ε, 0, 1, 00, 01, 10, 11, 000, …. Every string appears at some finite position.</p>
<p>Every Turing machine has an encoding ⟨<em>M</em>⟩, a string, so the set of Turing machines is countable too: list the strings in shortlex order and keep those that encode machines.</p>
<p><strong>Theorem (Cantor).</strong> The set of all languages over {0, 1} is not countable.</p>
<p><em>Proof by diagonalization.</em> Suppose the languages could be listed <em>L</em><sub>0</sub>, <em>L</em><sub>1</sub>, <em>L</em><sub>2</sub>, …, and let <em>s</em><sub>0</sub>, <em>s</em><sub>1</sub>, <em>s</em><sub>2</sub>, … be the strings in shortlex order. Define <em>D</em> = {<em>s</em><sub><em>i</em></sub> : <em>s</em><sub><em>i</em></sub> ∉ <em>L</em><sub><em>i</em></sub>}. For each <em>i</em>, <em>D</em> differs from <em>L</em><sub><em>i</em></sub> on the string <em>s</em><sub><em>i</em></sub>: it contains <em>s</em><sub><em>i</em></sub> exactly when <em>L</em><sub><em>i</em></sub> doesn't. So <em>D</em> is not on the list, contradicting the assumption that every language was. ∎</p>
<p>Picture a table with a row for each language and a column for each string, holding 1 where the string is in the language. <em>D</em> is built by flipping the diagonal, so it disagrees with row <em>i</em> in column <em>i</em>:</p>
<pre><code>rows = ["0110", "1010", "1111", "0000"]     # four rows of the table, four columns
diag = "".join("1" if rows[i][i] == "0" else "0" for i in range(len(rows)))
print(diag, [diag == r for r in rows])     # 1101 [False, False, False, False]</code></pre>
<p>There are countably many machines and uncountably many languages, so <strong>most languages are not recognized by any Turing machine</strong>. That is a counting argument; it doesn't name one. The next theorem does, and the language it names is one we care about.</p>

<h3>The acceptance problem is undecidable</h3>
<p>Let <em>A</em><sub>TM</sub> = {⟨<em>M</em>, <em>w</em>⟩ : <em>M</em> is a TM that accepts <em>w</em>}. It is recognizable: the universal machine <em>U</em> simulates <em>M</em> on <em>w</em> and accepts if <em>M</em> does. But <em>U</em> loops when <em>M</em> loops, so it isn't a decider.</p>
<p><strong>Theorem (Turing).</strong> <em>A</em><sub>TM</sub> is undecidable.</p>
<p><em>Proof.</em> Suppose some decider <em>H</em> decides <em>A</em><sub>TM</sub>: on input ⟨<em>M</em>, <em>w</em>⟩, <em>H</em> halts, and accepts exactly when <em>M</em> accepts <em>w</em>. Build a new machine <em>D</em> that, on input ⟨<em>M</em>⟩:</p>
<ol>
<li>runs <em>H</em> on ⟨<em>M</em>, ⟨<em>M</em>⟩⟩, asking "does <em>M</em> accept its own description?";</li>
<li>does the opposite: if <em>H</em> accepts, <em>D</em> rejects; if <em>H</em> rejects, <em>D</em> accepts.</li>
</ol>
<p><em>D</em> always halts, because <em>H</em> does. Now run <em>D</em> on its own description ⟨<em>D</em>⟩. By construction, <em>D</em> accepts ⟨<em>D</em>⟩ exactly when <em>H</em> says <em>D</em> does not accept ⟨<em>D</em>⟩, and <em>H</em> is always right, so <em>D</em> accepts ⟨<em>D</em>⟩ exactly when <em>D</em> does not accept ⟨<em>D</em>⟩. That is a contradiction, so <em>H</em> can't exist. ∎</p>
<p>This is diagonalization again: rows are machines, columns are machine descriptions, and <em>D</em> flips the diagonal, so it differs from every machine, including itself. In Python terms, if someone handed you a function <code>accepts(source, inp)</code> that always returned correctly, this program would defeat it:</p>
<pre data-label="Python (hypothetical)"><code>def D(source):
    return not accepts(source, source)

# Let d be the source code of D. Then D(d) returns True
# exactly when accepts(d, d) is False, that is, when D(d) does not return True.</code></pre>

<h3>Reductions</h3>
<p>Once one problem is undecidable, others follow by <strong>reduction</strong>, the same idea as in CS 220 Lesson 8 but with "computable" in place of "polynomial-time". <em>A</em> <strong>mapping-reduces</strong> to <em>B</em>, written <em>A</em> ≤<sub>m</sub> <em>B</em>, if there is a computable function <em>f</em> (one that some TM computes, always halting) with <em>w</em> ∈ <em>A</em> ⇔ <em>f</em>(<em>w</em>) ∈ <em>B</em> for every <em>w</em>. If <em>B</em> is decidable, so is <em>A</em>: compute <em>f</em>(<em>w</em>) and run <em>B</em>'s decider. So if <em>A</em> is undecidable, <em>B</em> is too.</p>
<p><strong>The halting problem.</strong> HALT = {⟨<em>M</em>, <em>w</em>⟩ : <em>M</em> halts on <em>w</em>}. Reduce <em>A</em><sub>TM</sub> to it: <em>f</em>(⟨<em>M</em>, <em>w</em>⟩) = ⟨<em>M</em>′, <em>w</em>⟩, where <em>M</em>′ runs <em>M</em> and, wherever <em>M</em> would reject, loops forever instead. Then <em>M</em>′ halts on <em>w</em> ⇔ <em>M</em> accepts <em>w</em>. Building <em>M</em>′ is a simple edit of <em>M</em>'s transition table (send every move into <em>q</em><sub>reject</sub> to a new state that moves right forever), so <em>f</em> is computable. HALT is undecidable.</p>
<p><strong>Halting on a blank tape.</strong> HALT<sub>ε</sub> = {⟨<em>M</em>⟩ : <em>M</em> halts when started on a blank tape}. Reduce HALT to it: <em>f</em>(⟨<em>M</em>, <em>w</em>⟩) = ⟨<em>M</em><sub><em>w</em></sub>⟩, where <em>M</em><sub><em>w</em></sub> first writes <em>w</em> = <em>w</em><sub>1</sub>…<em>w</em><sub><em>n</em></sub> on its tape (<em>n</em> states, each writing one symbol and moving right), then moves left <em>n</em> times back to cell 0, then runs <em>M</em>. Started on a blank tape, <em>M</em><sub><em>w</em></sub> halts ⇔ <em>M</em> halts on <em>w</em>. So even with no input to vary, halting is undecidable.</p>
<p><strong>Emptiness.</strong> E<sub>TM</sub> = {⟨<em>M</em>⟩ : <em>L</em>(<em>M</em>) = ∅}. Given ⟨<em>M</em>, <em>w</em>⟩, build <em>M</em><sub><em>w</em></sub>: "on any input <em>x</em>, ignore <em>x</em>, run <em>M</em> on <em>w</em>, and accept if it accepts". Then <em>L</em>(<em>M</em><sub><em>w</em></sub>) = Σ* if <em>M</em> accepts <em>w</em>, and ∅ otherwise. So ⟨<em>M</em>, <em>w</em>⟩ ∈ <em>A</em><sub>TM</sub> ⇔ ⟨<em>M</em><sub><em>w</em></sub>⟩ ∉ E<sub>TM</sub>. A decider for E<sub>TM</sub>, with its answer flipped, would decide <em>A</em><sub>TM</sub>, so E<sub>TM</sub> is undecidable.</p>
<p><strong>Recognizable but not co-recognizable.</strong> A language is decidable if and only if both it and its complement are recognizable: given recognizers for both, run them alternately, one step each, until one accepts, which must happen because every string is in one language or the other. Since <em>A</em><sub>TM</sub> is recognizable but not decidable, its complement is <em>not even recognizable</em>.</p>

<h3>Rice's theorem</h3>
<p>The <em>M</em><sub><em>w</em></sub> trick works for almost any question about what a program computes. A <strong>property</strong> of Turing-recognizable languages is <strong>nontrivial</strong> if some machines' languages have it and some don't.</p>
<p><strong>Rice's theorem.</strong> For every nontrivial property <em>P</em>, the language {⟨<em>M</em>⟩ : <em>L</em>(<em>M</em>) has property <em>P</em>} is undecidable.</p>
<p><em>Proof sketch.</em> Suppose first that ∅ doesn't have <em>P</em>, and let <em>M</em><sub>1</sub> be a machine whose language does. Given ⟨<em>M</em>, <em>w</em>⟩, build a machine that on input <em>x</em> runs <em>M</em> on <em>w</em> and, if that accepts, runs <em>M</em><sub>1</sub> on <em>x</em>. Its language is <em>L</em>(<em>M</em><sub>1</sub>), which has <em>P</em>, if <em>M</em> accepts <em>w</em>, and ∅, which doesn't, otherwise. So deciding <em>P</em> would decide <em>A</em><sub>TM</sub>. If ∅ does have <em>P</em>, apply the argument to the opposite property. ∎</p>
<p>So no algorithm decides, for every program, whether it accepts any input at all, whether it accepts a given string, whether it computes the same function as another program, or whether its language is regular. The theorem is about the language (the behavior), not the code: "has more than 10 states" is a property of the description and is easily decidable.</p>
<p>Rice's theorem doesn't make program analysis hopeless. Type checkers, linters and bug-finding tools are <em>approximations</em>: they answer for every program, but sometimes say "can't tell" or raise a false alarm. A type checker that rejects some correct programs is how mypy (CS 102 Lesson 4) stays decidable. Analysis also succeeds on restricted models: questions about DFAs (emptiness, equivalence via Lesson 3's minimization) are decidable.</p>

<h3>Time complexity</h3>
<p>Decidable problems can still be impractical. Let <strong>TIME</strong>(<em>t</em>(<em>n</em>)) be the set of languages decided by some one-tape deterministic TM in O(<em>t</em>(<em>n</em>)) steps on inputs of length <em>n</em>. ZERO_ONE shows {0<sup><em>n</em></sup>1<sup><em>n</em></sup>} ∈ TIME(<em>n</em><sup>2</sup>). Then</p>
<p class="math"><strong>P</strong> = TIME(<em>n</em>) ∪ TIME(<em>n</em><sup>2</sup>) ∪ TIME(<em>n</em><sup>3</sup>) ∪ ⋯</p>
<p>This is CS 220's class P, now precisely defined. The choice of model doesn't matter: Lesson 7 showed that multitape machines and random-access machines can be simulated with polynomial slowdown, and a polynomial of a polynomial is a polynomial. The same problem is in P whichever reasonable deterministic model you use.</p>
<p>For a <strong>nondeterministic</strong> TM, the running time is the length of its longest branch, and NTIME(<em>t</em>(<em>n</em>)) is defined the same way. Then <strong>NP</strong> = NTIME(<em>n</em>) ∪ NTIME(<em>n</em><sup>2</sup>) ∪ ⋯, which is where the name "nondeterministic polynomial time" comes from. It is the same class CS 220 defined with certificates:</p>
<ul>
<li>If a polynomial-time checker <em>V</em> accepts a certificate <em>c</em> for each yes-instance, a nondeterministic TM can write down a guess for <em>c</em>, one symbol per step on each branch, and then run <em>V</em>. Some branch accepts exactly when a certificate exists.</li>
<li>Conversely, if a nondeterministic TM decides <em>L</em> in time <em>n</em><sup><em>k</em></sup>, the sequence of choices made on an accepting branch is a certificate of polynomial length, and a deterministic checker can replay the branch to check it.</li>
</ul>
<p>The best known deterministic simulation of a nondeterministic machine is Lesson 7's search, which takes exponential time. Whether polynomial time is possible is the P versus NP question.</p>

<h3>The Cook–Levin theorem</h3>
<p>CS 220 stated that SAT is NP-complete. Here is the idea of the proof. Let <em>N</em> be a nondeterministic TM that decides some language in NP in time <em>n</em><sup><em>k</em></sup>. An accepting computation on <em>w</em> can be drawn as a <strong>tableau</strong>: a table with <em>n</em><sup><em>k</em></sup> rows, one configuration per row, each <em>n</em><sup><em>k</em></sup> cells wide (the machine can't visit more cells than steps). Build a formula with a variable <em>x</em><sub><em>i</em>,<em>j</em>,<em>s</em></sub> meaning "cell (<em>i</em>, <em>j</em>) holds symbol <em>s</em>", where <em>s</em> ranges over tape symbols and states (a cell holding a state marks the head's position). The formula is the AND of four parts:</p>
<ol>
<li>each cell holds exactly one symbol;</li>
<li>the first row is the start configuration on <em>w</em>;</li>
<li>every 2 × 3 window of neighboring cells is consistent with δ (a step changes the tape only near the head, so checking all small windows checks every step);</li>
<li>some row contains <em>q</em><sub>accept</sub>.</li>
</ol>
<p>The formula is satisfiable exactly when some branch of <em>N</em> accepts <em>w</em>, and it has O(<em>n</em><sup>2<em>k</em></sup>) clauses of constant size, so it can be written down in polynomial time. That reduces every NP problem to SAT. The formula can also be converted to <strong>3SAT</strong>, so 3SAT is NP-complete too. A 3SAT formula is in <strong>conjunctive normal form</strong> (CNF, as in CS 220's SAT solver): an AND of clauses, each an OR of literals (a variable or its negation), here with exactly three literals per clause, such as (<em>x</em><sub>1</sub> ∨ <em>x</em><sub>2</sub> ∨ ¬<em>x</em><sub>3</sub>) ∧ (¬<em>x</em><sub>1</sub> ∨ <em>x</em><sub>2</sub> ∨ <em>x</em><sub>4</sub>). This CNF has nothing to do with Lesson 5's Chomsky normal form; only the initials match.</p>
<p>The Cook–Levin formula is already an AND of clauses (each condition above is written as clauses), but its clauses have various sizes. Each clause is replaced by clauses of exactly three literals that are satisfiable together exactly when it is, using fresh variables that appear nowhere else. A short clause is padded: (ℓ<sub>1</sub> ∨ ℓ<sub>2</sub>) becomes (ℓ<sub>1</sub> ∨ ℓ<sub>2</sub> ∨ <em>z</em>) ∧ (ℓ<sub>1</sub> ∨ ℓ<sub>2</sub> ∨ ¬<em>z</em>), which holds exactly when ℓ<sub>1</sub> ∨ ℓ<sub>2</sub> does, whatever <em>z</em> is; a one-literal clause (ℓ) becomes the four clauses (ℓ ∨ ±<em>z</em><sub>1</sub> ∨ ±<em>z</em><sub>2</sub>), one for each choice of signs. A long clause is chained: (ℓ<sub>1</sub> ∨ ⋯ ∨ ℓ<sub><em>k</em></sub>) with <em>k</em> &gt; 3 becomes</p>
<p class="math">(ℓ<sub>1</sub> ∨ ℓ<sub>2</sub> ∨ <em>y</em><sub>1</sub>) ∧ (¬<em>y</em><sub>1</sub> ∨ ℓ<sub>3</sub> ∨ <em>y</em><sub>2</sub>) ∧ ⋯ ∧ (¬<em>y</em><sub><em>k</em>−3</sub> ∨ ℓ<sub><em>k</em>−1</sub> ∨ ℓ<sub><em>k</em></sub>).</p>
<p>If some ℓ<sub><em>i</em></sub> is true, set the <em>y</em>'s in clauses before it true and those after it false, and every clause holds. If every ℓ<sub><em>i</em></sub> is false, the first clause forces <em>y</em><sub>1</sub> true, the second then forces <em>y</em><sub>2</sub> true, and so on, until the last clause fails. Each clause of size <em>k</em> becomes at most max(4, <em>k</em> − 2) clauses, so the conversion takes polynomial time.</p>

<h3>A reduction: 3SAT to independent set</h3>
<p>CS 220 reduced independent set to vertex cover. To show independent set is NP-hard, reduce 3SAT to it. Given a formula with <em>m</em> clauses, make a vertex for each literal occurrence; join the three vertices of each clause in a triangle; and join every pair of vertices with opposite literals (<em>x</em> and ¬<em>x</em>). Ask for an independent set of size <em>k</em> = <em>m</em>.</p>
<ul>
<li>If the formula is satisfiable, pick one true literal from each clause. No two picks are in the same triangle, and no two are opposite (both can't be true), so they form an independent set of size <em>m</em>.</li>
<li>If there is an independent set of size <em>m</em>, it has exactly one vertex per triangle, and never both <em>x</em> and ¬<em>x</em>. Make those literals true (other variables arbitrary): every clause has a true literal.</li>
</ul>
<pre><code>from itertools import combinations, product

def sat_to_indset(clauses):
    """3-CNF formula (list of clauses of nonzero ints) -> (vertices, edges, k)."""
    vertices = [(c, j) for c, clause in enumerate(clauses) for j in range(len(clause))]
    lit = {(c, j): clauses[c][j] for (c, j) in vertices}
    edges = {(u, v) for u, v in combinations(vertices, 2)
             if u[0] == v[0] or lit[u] == -lit[v]}
    return vertices, edges, len(clauses)

def satisfiable(clauses, n):            # brute force over all 2^n assignments
    return any(all(any((x > 0) == bits[abs(x) - 1] for x in cl) for cl in clauses)
               for bits in product([False, True], repeat=n))

def has_indset(vertices, edges, k):     # brute force over all k-subsets
    return any(all((u, v) not in edges and (v, u) not in edges for u, v in combinations(S, 2))
               for S in combinations(vertices, k))

F = [[1, 2, 3], [-1, -2, 3], [-3, 1, 2]]
V, E, k = sat_to_indset(F)
print(len(V), len(E), k, satisfiable(F, 3), has_indset(V, E, k))   # 9 15 3 True True</code></pre>
<p>The reduction itself takes O(<em>m</em><sup>2</sup>) time; only the brute-force checks are exponential.</p>
<p>The picture at the end of the course: regular ⊊ context-free ⊊ decidable ⊊ recognizable, and, inside the decidable languages, P ⊆ NP ⊆ EXPTIME (exponential time, the union of TIME(2<sup><em>n</em><sup><em>k</em></sup></sup>)). A diagonal argument like Turing's, the <em>time hierarchy theorem</em>, proves P ≠ EXPTIME, so at least one of the two inclusions is strict. Which one is unknown.</p>
<p class="note">Why it matters: an undecidability proof stops you from searching for an algorithm that can't exist, and tells you to change the question: restrict the inputs, accept approximate answers, or put a time limit on the search. An NP-completeness proof does the same for efficient algorithms.</p>
`,
      terms: [
        ["Bijection", "A function that pairs each element of one set with exactly one element of another; sets with a bijection between them have the same size."],
        ["Countable set", "A finite set, or one that can be listed as a sequence reaching every element."],
        ["Shortlex order", "Ordering strings by length, then alphabetically; it lists Σ* as a sequence."],
        ["Diagonalization", "Building an object that differs from the i-th item of a list in the i-th place, so it isn't on the list."],
        ["A_TM", "The acceptance problem: {⟨M, w⟩ : M accepts w}; recognizable but undecidable."],
        ["Halting problem (HALT)", "{⟨M, w⟩ : M halts on w}; undecidable."],
        ["Mapping reduction (A ≤m B)", "A computable f with w in A exactly when f(w) is in B; if B is decidable, so is A."],
        ["Rice's theorem", "Every nontrivial property of the languages that Turing machines recognize is undecidable."],
        ["Co-recognizable", "A language whose complement is Turing-recognizable; decidable = recognizable and co-recognizable."],
        ["TIME(t(n))", "Languages decided by a deterministic one-tape TM in O(t(n)) steps."],
        ["P", "The union of TIME(nᵏ) over all k: languages decidable in polynomial time."],
        ["NP", "The union of NTIME(nᵏ): languages decided by nondeterministic TMs in polynomial time; equivalently, those with polynomial-time-checkable certificates."],
        ["Tableau", "A table of the configurations of one computation, one per row; the Cook–Levin proof encodes it in a formula."],
        ["3SAT", "Satisfiability of formulas in conjunctive normal form (an AND of ORs) with exactly three literals per clause; NP-complete."]
      ],
      quiz: [
        { q: "Why must some languages have no Turing machine that recognizes them?", choices: ["Because some machines loop", "There are countably many machines but uncountably many languages", "Because the halting problem is undecidable", "Because tapes are finite"], answer: 1, why: "Each machine recognizes one language, and there aren't enough machines to go round." },
        { q: "In the proof that A_TM is undecidable, what does D do on input ⟨M⟩?", choices: ["Runs M forever", "Asks H whether M accepts ⟨M⟩, then does the opposite", "Accepts", "Simulates D"], answer: 1, why: "Then D on ⟨D⟩ accepts exactly when it doesn't." },
        { q: "You show A ≤m B and know A is undecidable. What follows?", choices: ["B is decidable", "B is undecidable", "A is decidable", "Nothing"], answer: 1, why: "A decider for B would give one for A." },
        { q: "Which question is decidable?", choices: ["Does this TM accept the empty string?", "Is the language of this TM regular?", "Does this TM have more than 10 states?", "Do these two TMs accept the same language?"], answer: 2, why: "That's a property of the description, not of the language, so Rice's theorem doesn't apply." },
        { q: "Why is the complement of A_TM not Turing-recognizable?", choices: ["It is finite", "If it were, A_TM and its complement would both be recognizable, making A_TM decidable", "Because A_TM is decidable", "Because of Rice's theorem"], answer: 1, why: "Run both recognizers alternately: one must accept." },
        { q: "In the reduction from 3SAT to independent set, which vertices are joined?", choices: ["All vertices", "Vertices in the same clause, and vertices with opposite literals", "Vertices with the same literal", "None"], answer: 1, why: "Triangles force one pick per clause; opposite-literal edges forbid inconsistent picks." }
      ],
      practice: [
        {
          q: `<p>Show that the set of all infinite binary sequences is uncountable, using diagonalization. Then explain why the same argument does not show that Σ* (finite strings) is uncountable.</p>`,
          a: `<p>Suppose the sequences could be listed <em>a</em><sub>0</sub>, <em>a</em><sub>1</sub>, …, with <em>a</em><sub><em>i</em></sub>(<em>j</em>) the <em>j</em>-th bit of the <em>i</em>-th sequence. Let <em>d</em>(<em>j</em>) = 1 − <em>a</em><sub><em>j</em></sub>(<em>j</em>). Then <em>d</em> differs from each <em>a</em><sub><em>i</em></sub> at position <em>i</em>, so it isn't listed: contradiction.</p><p>For finite strings the flipped diagonal of the first <em>k</em> strings is a string of length <em>k</em>, and it does appear in the shortlex list, just later. Flipping the "whole diagonal" of an infinite list gives an infinite sequence, which isn't a string at all. The argument needs the new object to be of the same kind as the listed ones.</p>`
        },
        {
          q: `<p>Prove that ACCEPTS_EMPTY = {⟨<em>M</em>⟩ : <em>M</em> accepts ε} is undecidable by a mapping reduction from <em>A</em><sub>TM</sub>, and then say which theorem gives the same result at once.</p>`,
          a: `<p>Given ⟨<em>M</em>, <em>w</em>⟩, compute ⟨<em>M</em><sub><em>w</em></sub>⟩, where <em>M</em><sub><em>w</em></sub> ignores its input, runs <em>M</em> on <em>w</em>, and accepts if <em>M</em> accepts. Building <em>M</em><sub><em>w</em></sub> from ⟨<em>M</em>, <em>w</em>⟩ is mechanical: write <em>w</em> onto the tape, then run <em>M</em>. If <em>M</em> accepts <em>w</em>, <em>M</em><sub><em>w</em></sub> accepts every input, including ε; otherwise it accepts nothing. So ⟨<em>M</em>, <em>w</em>⟩ ∈ <em>A</em><sub>TM</sub> ⇔ ⟨<em>M</em><sub><em>w</em></sub>⟩ ∈ ACCEPTS_EMPTY, and a decider for ACCEPTS_EMPTY would decide <em>A</em><sub>TM</sub>. Rice's theorem gives it at once: "ε ∈ <em>L</em>(<em>M</em>)" is a property of the language, and it is nontrivial (some machines accept ε, some don't).</p>`
        },
        {
          q: `<p>A company sells a tool that, it claims, reads any Python program and reports correctly whether it can ever print the word "password". Explain why the claim, as stated, can't be true, and describe what such a tool can honestly promise.</p>`,
          a: `<p>Reduce the halting problem: given a program <em>P</em> and input <em>x</em> (Python is Turing complete), build the program "run <em>P</em> on <em>x</em> (with all of <em>P</em>'s own output suppressed), then print password". It prints password exactly when <em>P</em> halts on <em>x</em>. A correct tool would therefore decide halting, which is impossible. (Equivalently, by Rice's theorem, "can ever print password" is a nontrivial property of behavior.)</p><p>An honest tool can promise one-sided answers: "definitely never" for programs it can analyze completely, "definitely can" when it finds an input that does it, and "can't tell" otherwise; or it can be sound (never miss a real case) at the price of false alarms. Real static analyzers make exactly this trade-off.</p>`
        },
        {
          q: `<p>Apply the 3SAT-to-independent-set reduction to (<em>x</em><sub>1</sub> ∨ <em>x</em><sub>2</sub> ∨ ¬<em>x</em><sub>3</sub>) ∧ (¬<em>x</em><sub>1</sub> ∨ ¬<em>x</em><sub>2</sub> ∨ <em>x</em><sub>3</sub>). How many vertices and edges does the graph have, what is <em>k</em>, and which independent set corresponds to the assignment <em>x</em><sub>1</sub> = true, <em>x</em><sub>2</sub> = false, <em>x</em><sub>3</sub> = false?</p>`,
          a: `<p>Six vertices: <em>x</em><sub>1</sub>, <em>x</em><sub>2</sub>, ¬<em>x</em><sub>3</sub> in the first clause and ¬<em>x</em><sub>1</sub>, ¬<em>x</em><sub>2</sub>, <em>x</em><sub>3</sub> in the second. Edges: two triangles (6 edges), plus <em>x</em><sub>1</sub>–¬<em>x</em><sub>1</sub>, <em>x</em><sub>2</sub>–¬<em>x</em><sub>2</sub>, ¬<em>x</em><sub>3</sub>–<em>x</em><sub>3</sub> (3 edges): 9 edges, <em>k</em> = 2. Under the assignment, the first clause is made true by <em>x</em><sub>1</sub> (and ¬<em>x</em><sub>3</sub>), the second by ¬<em>x</em><sub>2</sub>. Pick <em>x</em><sub>1</sub> from the first triangle and ¬<em>x</em><sub>2</sub> from the second: they aren't joined (different clauses, not opposite literals), so {<em>x</em><sub>1</sub>, ¬<em>x</em><sub>2</sub>} is an independent set of size 2.</p>`
        }
      ],
      sources: ["ericksonmodels", "sipser", "turing36", "cook71", "rice53"]
    }
  ]
});

CSA.addAsides("cs320", {
  tc2: [
    { kind: "history", title: "From model neurons to nondeterminism", html: `<p>Finite automata began as a model of the brain. In 1943 the neurophysiologist Warren McCulloch and the logician Walter Pitts described idealized neurons that fire when enough of their inputs fire, and showed that networks of them compute logical functions. Stephen Kleene asked exactly which input patterns such networks can detect; his answer, written at the RAND Corporation in 1951 and published in 1956, introduced what he called "regular events", today's regular expressions, and proved them equivalent to finite automata. In 1959 Michael Rabin and Dana Scott defined nondeterministic automata, proved them equivalent to deterministic ones with the subset construction, and asked which questions about automata can be decided. Their paper won them the 1976 Turing Award, computing's highest honor, cited for introducing nondeterministic machines, the idea behind NP.</p>`, sources: ["rabinscott59"] }
  ],
  tc3: [
    { kind: "practice", title: "When a regular expression takes down a website", html: `<p>On 20 July 2016, Stack Overflow was down for 34 minutes. A post containing about 20,000 consecutive whitespace characters reached the home page, and a regular expression meant to trim whitespace from the ends of lines, <code>^[\\s\\u200c]+|[\\s\\u200c]+$</code> (<code>\\u200c</code> is an invisible Unicode character, the zero-width non-joiner), made the backtracking engine try the trailing-space match from each of the 20,000 starting points, about 200 million steps per page view. The load balancer's health check used the home page, so every server was taken out of service. On 2 July 2019, Cloudflare, which carries a large share of the web's traffic, deployed a new firewall rule containing the fragment <code>.*(?:.*=.*)</code>. Its backtracking pushed the processors serving web traffic close to 100% across Cloudflare's network, and sites behind it failed for 27 minutes. The rule had passed its tests and was deployed everywhere at once. Cloudflare's follow-up included switching to regex engines with linear-time guarantees, such as RE2 or Rust's regex, which run patterns as automata. These attacks and accidents are called <em>ReDoS</em>, regular-expression denial of service, and they are why many companies forbid backtracking engines on untrusted input.</p>`, sources: ["stackoverflow16", "cloudflare19", "cox07"] }
  ],
  tc5: [
    { kind: "history", title: "Linguists and language designers", html: `<p>Noam Chomsky introduced phrase-structure grammars in 1956 to study human languages, and in 1959 arranged grammars in a hierarchy that matches this course: regular grammars, context-free grammars, context-sensitive grammars and unrestricted grammars, recognized by finite automata, pushdown automata, linear-bounded automata and Turing machines. Independently, John Backus, who had led the FORTRAN team at IBM, presented a notation for the syntax of the new international language ALGOL at a 1959 conference in Paris. Peter Naur adopted it, slightly changed, for the ALGOL 60 report, the first programming-language definition with a formal grammar. The notation, with rules like <code>&lt;expr&gt; ::= &lt;expr&gt; + &lt;term&gt; | &lt;term&gt;</code>, is called Backus–Naur form (BNF), a name Donald Knuth proposed in 1964. It turned out to be exactly context-free grammars, and variants of it still define Python, C and JSON.</p>`, sources: ["chomsky56"] }
  ],
  tc7: [
    { kind: "history", title: "On Computable Numbers", html: `<p>Turing wrote "On Computable Numbers, with an Application to the Entscheidungsproblem" at Cambridge at the age of 23; it was published in 1936–37. In it a "computer" is a person, and Turing justifies each feature of his machine from what such a person does: the paper is divided into squares because written work can be; only finitely many symbols, because symbols too similar to tell apart are useless; finitely many "states of mind", because human memory is limited. The paper defines the machines, constructs a universal machine, proves that no machine can decide whether a machine ever prints a given symbol (the root of the halting problem), and answers Hilbert's <em>Entscheidungsproblem</em> ("decision problem") negatively. Alonzo Church had just reached the same answer with the λ-calculus, and Turing added an appendix proving the two notions equivalent before going to Princeton to work with Church. The universal machine was the conceptual blueprint for stored-program computers a decade later. The paper is short and readable; its first sections are a good first primary source in computer science.</p>`, sources: ["turing36"] }
  ]
});
