CSA.addCourse({
  id: "math120",
  code: "MATH 120",
  title: "Discrete Mathematics I",
  credits: 4,
  kind: "required",
  term: "y1f",
  summary: "The mathematics of computer science: logic, proof, sets, functions, relations and induction. You will learn to state claims precisely and prove them, which is how computer scientists know a program or an algorithm is correct.",
  prereqs: ["High-school algebra"],
  outcomes: [
    "Translate English statements into propositional and predicate logic, and back",
    "Build truth tables and use equivalence laws to simplify statements",
    "Write direct, contrapositive, contradiction and case proofs that a careful reader accepts",
    "Work with sets, functions and relations, and prove their properties",
    "Prove statements about integers and programs by ordinary and strong induction",
    "Read and write mathematical notation fluently"
  ],
  rubric: {
    criteriaFor: "proofs on problem sets and exams",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Weekly problem sets", weight: 35, desc: "Computation and proof problems based on each lesson's practice set, written up in full sentences. Proofs are graded with the criteria below." },
      { name: "Proof workshop", weight: 10, desc: "Every two weeks, rewrite one of your graded proofs using the feedback you received, with a short note on what you changed." },
      { name: "Midterm exam", weight: 20, desc: "Logic, quantifiers, proof techniques and sets (lessons 1–4)." },
      { name: "Final exam", weight: 25, desc: "Cumulative, with emphasis on functions, relations and induction (lessons 5–6)." }
    ],
    criteria: [
      { name: "Validity", desc: "Is every step justified?", levels: [
        "Every step follows from definitions, earlier results or previous steps.",
        "The argument is valid but one step needs a stated justification.",
        "Contains a gap or an unjustified leap that a reader can't fill easily.",
        "Assumes the conclusion, argues from examples only, or is invalid." ] },
      { name: "Completeness", desc: "Are all cases covered?", levels: [
        "Handles every case, including base cases and boundary values.",
        "Misses a minor case that is easy to add.",
        "Misses an important case, such as the base case or one direction of an if-and-only-if.",
        "Covers only a special case." ] },
      { name: "Structure", desc: "Can a reader follow it?", levels: [
        "States the technique and what is assumed and shown; logical order; full sentences.",
        "Mostly clear; the reader has to work a little to follow.",
        "Steps are present but out of order or poorly connected.",
        "A list of equations with no explanation." ] },
      { name: "Notation and definitions", desc: "Is the mathematics stated precisely?", levels: [
        "Uses definitions exactly; introduces every variable with its type and meaning.",
        "Minor notational slips that don't affect meaning.",
        "Variables used without introduction, or definitions misstated.",
        "Notation obscures or changes the meaning." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Collaboration:</b> work on problem sets together, but write your final proofs alone, in your own words, and list who you worked with.",
      "<b>AI assistants:</b> allowed for explanations, hints and checking your reasoning. Never submit a proof you can't reproduce and defend on your own; exams test exactly that.",
      "<b>Late work:</b> two late days for the term on problem sets. Proof workshop rewrites can be submitted any time before the last week of classes.",
      "<b>Partial credit:</b> a clear, honest proof attempt that identifies where it gets stuck earns more than a confident proof with a hidden gap."
    ]
  }
});

CSA.addUnits("math120", [
  {
    id: "u1",
    title: "Propositional logic",
    minutes: 90,
    summary: "Propositions and connectives, truth tables, translating English, logical equivalence, and simplifying statements with equivalence laws.",
    notes: `
<p>Logic is the grammar of mathematics and of programming. Every <code>if</code> statement you write in CS 101 tests a logical condition, every proof in this course is a chain of logical steps, and every processor is built from logic gates. This lesson covers the simplest logic, about statements that are simply true or false.</p>

<h3>Propositions</h3>
<p>A <strong>proposition</strong> is a statement that is either true or false, though we may not know which.</p>
<ul>
  <li>"7 is prime." A proposition, and true.</li>
  <li>"Paris is the capital of Germany." A proposition, and false.</li>
  <li>"Every even number greater than 2 is the sum of two primes." A proposition: it's either true or false, even though nobody knows which. (This is Goldbach's conjecture, open since 1742.)</li>
  <li>"Close the door." Not a proposition: a command isn't true or false.</li>
  <li>"x + 2 = 5." Not a proposition yet: its truth depends on <em>x</em>. The next lesson handles statements like this.</li>
</ul>
<p>We name propositions with letters such as <em>P</em>, <em>Q</em> and <em>R</em>, and build bigger ones with <strong>connectives</strong>.</p>

<h3>Connectives and their truth tables</h3>
<table>
  <thead><tr><th>Symbol</th><th>Name</th><th>Read as</th><th>Python</th></tr></thead>
  <tbody>
    <tr><td>¬<em>P</em></td><td>negation</td><td>not P</td><td><code>not p</code></td></tr>
    <tr><td><em>P</em> ∧ <em>Q</em></td><td>conjunction</td><td>P and Q</td><td><code>p and q</code></td></tr>
    <tr><td><em>P</em> ∨ <em>Q</em></td><td>disjunction</td><td>P or Q</td><td><code>p or q</code></td></tr>
    <tr><td><em>P</em> → <em>Q</em></td><td>implication</td><td>if P then Q</td><td><code>(not p) or q</code></td></tr>
    <tr><td><em>P</em> ↔ <em>Q</em></td><td>biconditional</td><td>P if and only if Q</td><td><code>p == q</code></td></tr>
  </tbody>
</table>
<p>A <strong>truth table</strong> lists the value of a statement for every combination of values of its parts. With two letters there are four combinations:</p>
<table>
  <thead><tr><th>P</th><th>Q</th><th>¬P</th><th>P ∧ Q</th><th>P ∨ Q</th><th>P → Q</th><th>P ↔ Q</th></tr></thead>
  <tbody>
    <tr><td>T</td><td>T</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td></tr>
    <tr><td>T</td><td>F</td><td>F</td><td>F</td><td>T</td><td>F</td><td>F</td></tr>
    <tr><td>F</td><td>T</td><td>T</td><td>F</td><td>T</td><td>T</td><td>F</td></tr>
    <tr><td>F</td><td>F</td><td>T</td><td>F</td><td>F</td><td>T</td><td>T</td></tr>
  </tbody>
</table>
<p>Note that "or" in logic is <strong>inclusive</strong>: <em>P</em> ∨ <em>Q</em> is true when both are true. Everyday English often means "one or the other but not both" ("soup or salad"); that's called <em>exclusive or</em>, written ⊕.</p>

<h3>Implication: the tricky one</h3>
<p><em>P</em> → <em>Q</em> is false in exactly one case: when <em>P</em> is true and <em>Q</em> is false. It helps to think of an implication as a <strong>promise</strong>. "If you score 90 or above, you get an A" is broken only if someone scores 90 or above and doesn't get an A. If you scored 85, the promise says nothing about you, so it hasn't been broken: whatever grade you got, the promise is still kept. That's why an implication with a false hypothesis counts as true. We call it <strong>vacuously true</strong>.</p>
<p>Implication doesn't mean that <em>P</em> causes <em>Q</em>, or even that they are related. "If 2 + 2 = 5, then the moon is cheese" is true, because the hypothesis is false. In mathematics, → only promises that we never see <em>P</em> true with <em>Q</em> false.</p>
<p>English has many ways to say <em>P</em> → <em>Q</em>, and some reverse the order you'd expect:</p>
<table>
  <thead><tr><th>English</th><th>Logic</th></tr></thead>
  <tbody>
    <tr><td>If P, then Q. &nbsp;/&nbsp; Q whenever P.</td><td>P → Q</td></tr>
    <tr><td>P only if Q.</td><td>P → Q</td></tr>
    <tr><td>P is sufficient for Q.</td><td>P → Q</td></tr>
    <tr><td>Q is necessary for P.</td><td>P → Q</td></tr>
    <tr><td>Q unless P.</td><td>¬P → Q (equivalently P ∨ Q)</td></tr>
  </tbody>
</table>
<p>"You can graduate only if you pass Discrete Math" means graduate → passed. Passing is <em>necessary</em> for graduating, not <em>sufficient</em>: you can pass and still not graduate.</p>

<h3>Converse, inverse and contrapositive</h3>
<p>Start with "If it's raining (<em>P</em>), the ground is wet (<em>Q</em>)."</p>
<table>
  <thead><tr><th>Name</th><th>Form</th><th>Example</th><th>Equivalent to the original?</th></tr></thead>
  <tbody>
    <tr><td>Original</td><td>P → Q</td><td>If it's raining, the ground is wet.</td><td>-</td></tr>
    <tr><td>Contrapositive</td><td>¬Q → ¬P</td><td>If the ground isn't wet, it isn't raining.</td><td><strong>Yes</strong></td></tr>
    <tr><td>Converse</td><td>Q → P</td><td>If the ground is wet, it's raining.</td><td>No (a sprinkler could be on)</td></tr>
    <tr><td>Inverse</td><td>¬P → ¬Q</td><td>If it isn't raining, the ground isn't wet.</td><td>No</td></tr>
  </tbody>
</table>
<p>Confusing a statement with its converse is one of the most common reasoning errors, in mathematics and in everyday arguments. The contrapositive, on the other hand, always says the same thing, which makes it a powerful proof technique in Lesson 3.</p>

<h3>Truth tables for compound statements</h3>
<p>To evaluate a complicated statement, add a column for each piece, working from the inside out. Is ((<em>P</em> ∨ <em>Q</em>) ∧ ¬<em>P</em>) → <em>Q</em> always true?</p>
<table>
  <thead><tr><th>P</th><th>Q</th><th>P ∨ Q</th><th>¬P</th><th>(P ∨ Q) ∧ ¬P</th><th>((P ∨ Q) ∧ ¬P) → Q</th></tr></thead>
  <tbody>
    <tr><td>T</td><td>T</td><td>T</td><td>F</td><td>F</td><td>T</td></tr>
    <tr><td>T</td><td>F</td><td>T</td><td>F</td><td>F</td><td>T</td></tr>
    <tr><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr>
    <tr><td>F</td><td>F</td><td>F</td><td>T</td><td>F</td><td>T</td></tr>
  </tbody>
</table>
<p>The last column is true in every row. A statement that's true under every assignment is a <strong>tautology</strong>. This one is a valid pattern of reasoning called <em>disjunctive syllogism</em>: "either the bug is in the parser or in the printer; it's not in the parser; so it's in the printer."</p>
<p>A statement false under every assignment, such as <em>P</em> ∧ ¬<em>P</em>, is a <strong>contradiction</strong>. One true under at least one assignment is <strong>satisfiable</strong>. With <em>n</em> letters a truth table has 2<sup>n</sup> rows, which grows quickly: 10 letters need 1,024 rows.</p>

<h3>Logical equivalence and the laws</h3>
<p>Two statements are <strong>logically equivalent</strong>, written ≡, if they have the same truth value in every row. Rather than build a truth table every time, we use known equivalences, the way algebra uses known identities:</p>
<table>
  <thead><tr><th>Law</th><th>Equivalence</th></tr></thead>
  <tbody>
    <tr><td>Double negation</td><td>¬¬P ≡ P</td></tr>
    <tr><td>Commutative</td><td>P ∧ Q ≡ Q ∧ P, and P ∨ Q ≡ Q ∨ P</td></tr>
    <tr><td>Associative</td><td>(P ∧ Q) ∧ R ≡ P ∧ (Q ∧ R), and the same for ∨</td></tr>
    <tr><td>Distributive</td><td>P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R), and P ∨ (Q ∧ R) ≡ (P ∨ Q) ∧ (P ∨ R)</td></tr>
    <tr><td>De Morgan</td><td>¬(P ∧ Q) ≡ ¬P ∨ ¬Q, and ¬(P ∨ Q) ≡ ¬P ∧ ¬Q</td></tr>
    <tr><td>Implication</td><td>P → Q ≡ ¬P ∨ Q</td></tr>
    <tr><td>Contrapositive</td><td>P → Q ≡ ¬Q → ¬P</td></tr>
    <tr><td>Identity and domination</td><td>P ∧ T ≡ P, P ∨ F ≡ P, P ∨ T ≡ T, P ∧ F ≡ F</td></tr>
  </tbody>
</table>
<p>De Morgan's laws say: to negate an "and", negate each part and switch to "or", and vice versa. "It's not true that I'm tired and hungry" means "I'm not tired, or I'm not hungry".</p>
<p><strong>Worked example.</strong> What does it mean for an implication to be false? Simplify ¬(<em>P</em> → <em>Q</em>):</p>
<table>
  <thead><tr><th>Step</th><th>Statement</th><th>Reason</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>¬(P → Q)</td><td>Start</td></tr>
    <tr><td>2</td><td>¬(¬P ∨ Q)</td><td>Implication law</td></tr>
    <tr><td>3</td><td>¬¬P ∧ ¬Q</td><td>De Morgan</td></tr>
    <tr><td>4</td><td>P ∧ ¬Q</td><td>Double negation</td></tr>
  </tbody>
</table>
<p>So "if P then Q" is false exactly when P is true and Q is false, which matches the truth table. To <em>disprove</em> an implication, you find a case where the hypothesis holds and the conclusion fails: a counterexample.</p>

<h3>Logic in code</h3>
<p>The same laws simplify conditions in programs. These two lines are equivalent by De Morgan's law, and the second is easier to read:</p>
<pre><code>if not (is_weekend or is_holiday):
if not is_weekend and not is_holiday:</code></pre>
<p>A computer can check any equivalence with a few letters by trying every row. With the loops from CS 101:</p>
<pre><code>for p in [True, False]:
    for q in [True, False]:
        left = not (p and q)
        right = (not p) or (not q)
        print(p, q, left == right)    # prints True in all four rows</code></pre>
<p>Brute force works for small formulas but not for large ones: a formula with 100 letters has more rows than there are atoms in the observable universe. Deciding whether a big formula is satisfiable, the SAT problem, is a central question in computer science.</p>
`,
    terms: [
      ["Proposition", "A statement that is true or false."],
      ["Truth table", "A table listing a statement's value for every combination of values of its parts."],
      ["Implication", "P → Q; false only when P is true and Q is false."],
      ["Vacuously true", "True because the hypothesis of an implication is false."],
      ["Contrapositive", "¬Q → ¬P; equivalent to P → Q."],
      ["Converse", "Q → P; not equivalent to P → Q."],
      ["Necessary / sufficient", "In P → Q, P is sufficient for Q and Q is necessary for P."],
      ["Tautology", "A statement true under every assignment."],
      ["Logically equivalent", "Having the same truth value under every assignment (≡)."]
    ],
    quiz: [
      ...[{"q":"When is P → Q false?","choices":["P false, Q true","P true, Q false","Both false","Both true"],"answer":1,"why":"An implication only fails when the hypothesis holds and the conclusion does not."},{"q":"Which is equivalent to \"If it is a square, then it is a rectangle\"?","choices":["If it is a rectangle, it is a square","If it is not a square, it is not a rectangle","If it is not a rectangle, it is not a square","It is a square and a rectangle"],"answer":2,"why":"That is the contrapositive, which is always equivalent. The first is the converse and the second the inverse."},{"q":"By De Morgan's law, ¬(P ∨ Q) is equivalent to:","choices":["¬P ∨ ¬Q","¬P ∧ ¬Q","P ∧ Q","¬P → Q"],"answer":1,"why":"Negating an or gives the and of the negations."},{"q":"How many rows does a truth table with 5 variables have?","choices":["5","10","25","32"],"answer":3,"why":"Each variable doubles the rows: 2⁵ = 32."}],
      { q: "\"You can vote only if you are a citizen.\" With V = can vote and C = citizen, this is:", choices: ["C → V", "V → C", "V ↔ C", "¬V → ¬C"], answer: 1, why: "\"P only if Q\" means P → Q. Citizenship is necessary for voting, not sufficient." },
      { q: "¬(P → Q) is equivalent to:", choices: ["¬P → ¬Q", "P ∧ ¬Q", "¬P ∧ Q", "Q → P"], answer: 1, why: "Implication law, then De Morgan, then double negation: ¬(¬P ∨ Q) ≡ P ∧ ¬Q." }
    ],
    practice: [
      { q: `<p>Which are propositions? (a) "17 is even." (b) "Is it raining?" (c) "x > 3." (d) "There is life on Europa." (e) "Turn in your homework."</p>`, a: `<p>(a) Yes, false. (b) No, a question. (c) No, its truth depends on <em>x</em>. (d) Yes: true or false, even though we don't know which. (e) No, a command.</p>` },
      { q: `<p>Let <em>P</em> = "it is cold" and <em>Q</em> = "it is snowing". Translate: (a) It is cold and not snowing. (b) It is snowing only if it is cold. (c) It is not cold unless it is snowing. (d) Being cold is necessary for snowing.</p>`, a: `<p>(a) P ∧ ¬Q. (b) Q → P. (c) "A unless B" is ¬B → A, so ¬Q → ¬P, which is equivalent to P → Q. (d) Necessary conditions go on the right: Q → P.</p>` },
      { q: `<p>Write the converse, inverse and contrapositive of "If a number is divisible by 6, then it is divisible by 3." Which are true?</p>`, a: `<p>Converse: if divisible by 3, then divisible by 6. False: 9. Inverse: if not divisible by 6, then not divisible by 3. False: 9 again. Contrapositive: if not divisible by 3, then not divisible by 6. True, like the original. The converse and inverse are contrapositives of each other, so they always share a truth value.</p>` },
      { q: `<p>Build a truth table to decide whether (<em>P</em> → <em>Q</em>) ∧ (<em>Q</em> → <em>P</em>) is equivalent to <em>P</em> ↔ <em>Q</em>.</p>`, a: `<table><thead><tr><th>P</th><th>Q</th><th>P → Q</th><th>Q → P</th><th>both</th><th>P ↔ Q</th></tr></thead><tbody><tr><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td><td>T</td></tr><tr><td>T</td><td>F</td><td>F</td><td>T</td><td>F</td><td>F</td></tr><tr><td>F</td><td>T</td><td>T</td><td>F</td><td>F</td><td>F</td></tr><tr><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T</td></tr></tbody></table><p>The columns match, so they're equivalent. That's why proving "if and only if" means proving both directions.</p>` },
      { q: `<p>Using the equivalence laws (not a truth table), show that ¬(<em>P</em> ∨ ¬<em>Q</em>) ∨ (¬<em>P</em> ∧ ¬<em>Q</em>) ≡ ¬<em>P</em>. Name the law at each step.</p>`, hint: `<p>Apply De Morgan to the first part, then look for a common factor of ¬P.</p>`, a: `<table><thead><tr><th>Statement</th><th>Reason</th></tr></thead><tbody><tr><td>¬(P ∨ ¬Q) ∨ (¬P ∧ ¬Q)</td><td>Start</td></tr><tr><td>(¬P ∧ ¬¬Q) ∨ (¬P ∧ ¬Q)</td><td>De Morgan</td></tr><tr><td>(¬P ∧ Q) ∨ (¬P ∧ ¬Q)</td><td>Double negation</td></tr><tr><td>¬P ∧ (Q ∨ ¬Q)</td><td>Distributive (in reverse)</td></tr><tr><td>¬P ∧ T</td><td>Q ∨ ¬Q is always true</td></tr><tr><td>¬P</td><td>Identity</td></tr></tbody></table>` },
      { q: `<p>Simplify this Python condition to one without <code>not</code> applied to a parenthesized expression: <code>if not (age &lt; 18 or not has_id):</code></p>`, a: `<p>By De Morgan, <code>not (A or B)</code> is <code>(not A) and (not B)</code>, so this is <code>not (age &lt; 18) and not (not has_id)</code>, which simplifies to <code>age &gt;= 18 and has_id</code>.</p>` },
      { q: `<p><strong>Knights and knaves.</strong> On an island, knights always tell the truth and knaves always lie. You meet A and B. A says, "At least one of us is a knave." What are A and B?</p>`, hint: `<p>Suppose A is a knave. Then A's statement is false. What does that say about both of them?</p>`, a: `<p>If A were a knave, the statement "at least one of us is a knave" would be true (A is one), but knaves can't say true things. So A is a knight, and the statement is true: at least one of them is a knave. Since A isn't, B must be. A is a knight and B is a knave. (Puzzles like this were popularized by the logician Raymond Smullyan.)</p>` }
    ],
    sources: ["mcs", "forallx", "levin"]
  },
  {
    id: "u2",
    title: "Predicates and quantifiers",
    minutes: 90,
    summary: "Statements about many objects at once: predicates, domains, the quantifiers ∀ and ∃, negating quantified statements, nested quantifiers, and translating between English and logic.",
    notes: `
<p>Propositional logic can't express "every student passed" or "some number is prime" without listing every student or number. <strong>Predicate logic</strong> adds variables and two quantifiers, which is enough to express almost all of mathematics, and the conditions in database queries, specifications and loops.</p>

<h3>Predicates and domains</h3>
<p>A <strong>predicate</strong> is a statement with variables, such as <em>P</em>(<em>x</em>): "<em>x</em> is even" or <em>L</em>(<em>x</em>, <em>y</em>): "<em>x</em> &lt; <em>y</em>". A predicate isn't true or false by itself. It becomes a proposition when you plug in values, as in <em>P</em>(4), which is true, or when you <strong>quantify</strong> it.</p>
<p>Every variable ranges over a <strong>domain</strong> (also called the universe of discourse): the set of values it may take, such as the integers ℤ, the real numbers ℝ, or the set of students in this course. The domain can change the truth of a statement, so always state it. "∀<em>x</em>, <em>x</em>² ≥ <em>x</em>" is true over the integers but false over the reals: try <em>x</em> = ½, where ¼ &lt; ½.</p>
<p>In code, a predicate is just a function that returns a boolean:</p>
<pre><code>def is_even(x):
    return x % 2 == 0</code></pre>

<h3>The two quantifiers</h3>
<ul>
  <li><strong>Universal:</strong> ∀<em>x</em> <em>P</em>(<em>x</em>), "for every <em>x</em>, <em>P</em>(<em>x</em>)". True when <em>P</em>(<em>x</em>) holds for every <em>x</em> in the domain.</li>
  <li><strong>Existential:</strong> ∃<em>x</em> <em>P</em>(<em>x</em>), "there exists an <em>x</em> such that <em>P</em>(<em>x</em>)". True when <em>P</em>(<em>x</em>) holds for at least one <em>x</em>.</li>
</ul>
<p>This asymmetry shapes how you prove and disprove statements:</p>
<table>
  <thead><tr><th></th><th>To prove it</th><th>To disprove it</th></tr></thead>
  <tbody>
    <tr><td>∀<em>x</em> <em>P</em>(<em>x</em>)</td><td>Show it for an <em>arbitrary</em> <em>x</em>; examples are not enough</td><td>One counterexample is enough</td></tr>
    <tr><td>∃<em>x</em> <em>P</em>(<em>x</em>)</td><td>One example is enough</td><td>Show ¬<em>P</em>(<em>x</em>) for every <em>x</em></td></tr>
  </tbody>
</table>
<p>Over a finite domain, ∀ is a big "and" and ∃ is a big "or". If the domain is {1, 2, 3}, then ∀<em>x</em> <em>P</em>(<em>x</em>) means <em>P</em>(1) ∧ <em>P</em>(2) ∧ <em>P</em>(3). Python's <code>all()</code> and <code>any()</code> are exactly ∀ and ∃ over a finite collection:</p>
<pre><code>scores = [72, 88, 95]
all(s &gt;= 60 for s in scores)    # ∀s, s ≥ 60: everyone passed. True
any(s &gt;= 90 for s in scores)    # ∃s, s ≥ 90: someone got an A. True</code></pre>

<h3>Negating quantifiers</h3>
<p>Negation flips the quantifier and moves inside:</p>
<ul>
  <li>¬∀<em>x</em> <em>P</em>(<em>x</em>) ≡ ∃<em>x</em> ¬<em>P</em>(<em>x</em>): "Not everyone passed" means "someone failed".</li>
  <li>¬∃<em>x</em> <em>P</em>(<em>x</em>) ≡ ∀<em>x</em> ¬<em>P</em>(<em>x</em>): "Nobody cheated" means "everyone didn't cheat".</li>
</ul>
<p>These are De Morgan's laws again: the negation of a big "and" is a big "or" of negations. In Python, <code>not all(...)</code> is the same as <code>any(not ...)</code>.</p>

<h3>Nested quantifiers: order matters</h3>
<p>Statements often need several quantifiers. Over the integers:</p>
<ul>
  <li>∀<em>x</em> ∃<em>y</em> (<em>x</em> + <em>y</em> = 0): every integer has an additive inverse. True: given any <em>x</em>, choose <em>y</em> = −<em>x</em>.</li>
  <li>∃<em>y</em> ∀<em>x</em> (<em>x</em> + <em>y</em> = 0): one single integer <em>y</em> is the inverse of every <em>x</em>. False.</li>
</ul>
<p>The difference is <em>who chooses first</em>. In ∀<em>x</em> ∃<em>y</em>, the <em>y</em> may depend on <em>x</em>: a different <em>y</em> for each <em>x</em>. In ∃<em>y</em> ∀<em>x</em>, one <em>y</em> must be chosen in advance and work for every <em>x</em>. A helpful way to think of it is as a game: ∀ is your opponent's move, ∃ is yours, and you move in order from left to right.</p>
<p>With a small domain you can see it in a table. Let students be Ana, Ben and Cy, and <em>T</em>(<em>s</em>, <em>c</em>) mean "<em>s</em> has taken course <em>c</em>":</p>
<table>
  <thead><tr><th>Student</th><th>CS 101</th><th>MATH 120</th><th>MATH 130</th></tr></thead>
  <tbody>
    <tr><td>Ana</td><td>✓</td><td></td><td></td></tr>
    <tr><td>Ben</td><td></td><td>✓</td><td>✓</td></tr>
    <tr><td>Cy</td><td></td><td>✓</td><td></td></tr>
  </tbody>
</table>
<p>∀<em>s</em> ∃<em>c</em> <em>T</em>(<em>s</em>, <em>c</em>), "every student has taken some course", is true: every row has a ✓. ∃<em>c</em> ∀<em>s</em> <em>T</em>(<em>s</em>, <em>c</em>), "some course has been taken by every student", is false: no column is full.</p>

<h3>Negating nested statements, step by step</h3>
<p>Push the negation in one quantifier at a time, flipping each, until it reaches the inner statement:</p>
<table>
  <thead><tr><th>Step</th><th>Statement</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>¬∀<em>x</em> ∃<em>y</em> (<em>x</em> &lt; <em>y</em>)</td></tr>
    <tr><td>2</td><td>∃<em>x</em> ¬∃<em>y</em> (<em>x</em> &lt; <em>y</em>)</td></tr>
    <tr><td>3</td><td>∃<em>x</em> ∀<em>y</em> ¬(<em>x</em> &lt; <em>y</em>)</td></tr>
    <tr><td>4</td><td>∃<em>x</em> ∀<em>y</em> (<em>x</em> ≥ <em>y</em>)</td></tr>
  </tbody>
</table>
<p>The original says "for every number there's a bigger one"; the negation says "there is a largest number". Over the integers the original is true and the negation false. Over the set {1, 2, 3}, it's the other way around: 3 is the largest.</p>

<h3>Translating English into logic</h3>
<p>Restricting a quantifier to part of the domain is the most common source of mistakes. Over the domain of all animals, with <em>D</em>(<em>x</em>) = "<em>x</em> is a dog" and <em>F</em>(<em>x</em>) = "<em>x</em> is friendly":</p>
<table>
  <thead><tr><th>English</th><th>Correct</th><th>Common mistake</th><th>Why the mistake is wrong</th></tr></thead>
  <tbody>
    <tr><td>All dogs are friendly.</td><td>∀<em>x</em> (<em>D</em>(<em>x</em>) → <em>F</em>(<em>x</em>))</td><td>∀<em>x</em> (<em>D</em>(<em>x</em>) ∧ <em>F</em>(<em>x</em>))</td><td>Says every animal is a friendly dog.</td></tr>
    <tr><td>Some dog is friendly.</td><td>∃<em>x</em> (<em>D</em>(<em>x</em>) ∧ <em>F</em>(<em>x</em>))</td><td>∃<em>x</em> (<em>D</em>(<em>x</em>) → <em>F</em>(<em>x</em>))</td><td>True as soon as any cat exists, because a false hypothesis makes the implication true.</td></tr>
  </tbody>
</table>
<p>The rule: <strong>∀ goes with →, and ∃ goes with ∧</strong>. Mathematicians abbreviate these as ∀<em>x</em> ∈ <em>D</em>, <em>F</em>(<em>x</em>) and ∃<em>x</em> ∈ <em>D</em>, <em>F</em>(<em>x</em>), where <em>D</em> is now the set of dogs.</p>
<p>A few more: "No student failed" is ∀<em>s</em> ¬<em>Failed</em>(<em>s</em>), or equivalently ¬∃<em>s</em> <em>Failed</em>(<em>s</em>). "Every student has a friend in the class" is ∀<em>s</em> ∃<em>t</em> (<em>t</em> ≠ <em>s</em> ∧ <em>Friend</em>(<em>s</em>, <em>t</em>)). "There is exactly one" needs two parts: one exists, and any two are equal.</p>
<p class="note">You'll meet nested quantifiers again in Calculus: the precise definition of a limit says ∀ε &gt; 0 ∃δ &gt; 0 ∀<em>x</em> (…). Reading it is exactly the skill from this lesson.</p>
`,
    terms: [
      ["Predicate", "A statement containing variables, which becomes true or false once they are given values."],
      ["Domain", "The set of values a quantified variable ranges over."],
      ["Universal quantifier (∀)", "\"For every\": true when the statement holds for every element of the domain."],
      ["Existential quantifier (∃)", "\"There exists\": true when the statement holds for at least one element."],
      ["Counterexample", "A single case showing a universal statement is false."],
      ["Bound variable", "A variable attached to a quantifier."]
    ],
    quiz: [
      ...[{"q":"What is the negation of ∀x ∃y (x + y = 0)?","choices":["∀x ∀y (x + y ≠ 0)","∃x ∀y (x + y ≠ 0)","∃x ∃y (x + y ≠ 0)","∀x ∃y (x + y ≠ 0)"],"answer":1,"why":"Flip each quantifier (∀→∃, ∃→∀) and negate the inner statement."},{"q":"Over the integers, is ∃y ∀x (x < y) true?","choices":["True","False"],"answer":1,"why":"It claims a single largest-bound integer exists. For any y, x = y is a counterexample."},{"q":"Which correctly translates \"Some dog is friendly\"?","choices":["∃x (Dog(x) → Friendly(x))","∃x (Dog(x) ∧ Friendly(x))","∀x (Dog(x) ∧ Friendly(x))","∀x (Dog(x) → Friendly(x))"],"answer":1,"why":"∃ pairs with ∧. With →, any non-dog would make the statement true."}],
      { q: "Over the domain {1, 2, 3}, is ∃x ∀y (x ≥ y) true?", choices: ["True", "False"], answer: 0, why: "Choose x = 3: it is at least every y in the domain." },
      { q: "In Python, <code>not all(x &gt; 0 for x in xs)</code> is equivalent to:", choices: ["<code>all(x &lt;= 0 for x in xs)</code>", "<code>any(x &lt;= 0 for x in xs)</code>", "<code>any(x &gt; 0 for x in xs)</code>", "<code>not any(x &gt; 0 for x in xs)</code>"], answer: 1, why: "¬∀x P(x) ≡ ∃x ¬P(x): not every x is positive means some x is not positive." }
    ],
    practice: [
      { q: `<p>Over the integers, decide true or false, with a reason: (a) ∀<em>x</em> (<em>x</em>² ≥ 0). (b) ∃<em>x</em> (<em>x</em>² = 2). (c) ∀<em>x</em> ∃<em>y</em> (<em>y</em> = <em>x</em> + 1). (d) ∃<em>y</em> ∀<em>x</em> (<em>y</em> ≤ <em>x</em>).</p>`, a: `<p>(a) True: squares are never negative. (b) False: no integer squares to 2, since 1² = 1 and 2² = 4. (c) True: given <em>x</em>, choose <em>y</em> = <em>x</em> + 1. (d) False: it claims there is a smallest integer, but for any <em>y</em>, the integer <em>y</em> − 1 is smaller.</p>` },
      { q: `<p>Let <em>S</em>(<em>x</em>) = "<em>x</em> is a student", <em>C</em>(<em>x</em>) = "<em>x</em> is in CS 101", and <em>H</em>(<em>x</em>) = "<em>x</em> did the homework". Translate: (a) Every student in CS 101 did the homework. (b) Some student in CS 101 didn't do the homework. (c) No student did the homework.</p>`, a: `<p>(a) ∀<em>x</em> ((<em>S</em>(<em>x</em>) ∧ <em>C</em>(<em>x</em>)) → <em>H</em>(<em>x</em>)). (b) ∃<em>x</em> (<em>S</em>(<em>x</em>) ∧ <em>C</em>(<em>x</em>) ∧ ¬<em>H</em>(<em>x</em>)). This is the negation of (a). (c) ∀<em>x</em> (<em>S</em>(<em>x</em>) → ¬<em>H</em>(<em>x</em>)), or equivalently ¬∃<em>x</em> (<em>S</em>(<em>x</em>) ∧ <em>H</em>(<em>x</em>)).</p>` },
      { q: `<p>Negate, pushing the negation all the way in, then say the result in plain English: ∀<em>s</em> ∃<em>c</em> <em>Took</em>(<em>s</em>, <em>c</em>).</p>`, a: `<p>¬∀<em>s</em> ∃<em>c</em> <em>Took</em>(<em>s</em>, <em>c</em>) ≡ ∃<em>s</em> ¬∃<em>c</em> <em>Took</em>(<em>s</em>, <em>c</em>) ≡ ∃<em>s</em> ∀<em>c</em> ¬<em>Took</em>(<em>s</em>, <em>c</em>). In English: there is a student who hasn't taken any course.</p>` },
      { q: `<p>Explain the difference in meaning between ∀<em>x</em> ∃<em>y</em> <em>Loves</em>(<em>x</em>, <em>y</em>) and ∃<em>y</em> ∀<em>x</em> <em>Loves</em>(<em>x</em>, <em>y</em>), and give a small example where the first is true and the second false.</p>`, a: `<p>The first says everyone loves somebody, possibly different people. The second says there's one person everybody loves. Example: two people, A and B, where A loves B and B loves A. Everyone loves someone, but nobody is loved by everyone, since nobody here loves themselves.</p>` },
      { q: `<p>The statement "every even number greater than 2 is the sum of two primes" is Goldbach's conjecture. Write it with quantifiers over the integers, using <em>E</em>(<em>n</em>) for "n is even" and <em>P</em>(<em>p</em>) for "p is prime". What would a counterexample look like?</p>`, a: `<p>∀<em>n</em> ((<em>E</em>(<em>n</em>) ∧ <em>n</em> &gt; 2) → ∃<em>p</em> ∃<em>q</em> (<em>P</em>(<em>p</em>) ∧ <em>P</em>(<em>q</em>) ∧ <em>n</em> = <em>p</em> + <em>q</em>)). A counterexample would be an even <em>n</em> &gt; 2 for which no two primes add up to <em>n</em>. Computers have checked every even number up to 4 × 10<sup>18</sup> without finding one, but that is evidence, not a proof.</p>` },
      { q: `<p>Write Python expressions using <code>all</code> and <code>any</code> for these statements about a list <code>xs</code> of integers: (a) every item is positive; (b) some item is even; (c) no item is zero; (d) every item is smaller than some later item, except the last.</p>`, a: `<pre><code>all(x &gt; 0 for x in xs)                                   # (a)
any(x % 2 == 0 for x in xs)                              # (b)
not any(x == 0 for x in xs)    # or all(x != 0 for x in xs)   (c)
all(any(xs[j] &gt; xs[i] for j in range(i + 1, len(xs)))
    for i in range(len(xs) - 1))                         # (d)</code></pre><p>(d) is a nested statement: ∀<em>i</em> ∃<em>j</em> &gt; <em>i</em> (<em>xs</em>[<em>j</em>] &gt; <em>xs</em>[<em>i</em>]). Nested quantifiers become nested <code>all</code> and <code>any</code>.</p>` },
      { q: `<p>Here is the definition of "<em>f</em> is continuous at <em>a</em>" from calculus: ∀ε &gt; 0 ∃δ &gt; 0 ∀<em>x</em> (|<em>x</em> − <em>a</em>| &lt; δ → |<em>f</em>(<em>x</em>) − <em>f</em>(<em>a</em>)| &lt; ε). Write its negation, "<em>f</em> is not continuous at <em>a</em>", with the negation pushed all the way in.</p>`, hint: `<p>Flip each quantifier in order, then use ¬(P → Q) ≡ P ∧ ¬Q.</p>`, a: `<p>∃ε &gt; 0 ∀δ &gt; 0 ∃<em>x</em> (|<em>x</em> − <em>a</em>| &lt; δ ∧ |<em>f</em>(<em>x</em>) − <em>f</em>(<em>a</em>)| ≥ ε). In words: there's some tolerance ε such that, however close you look to <em>a</em>, you can find an <em>x</em> where <em>f</em>(<em>x</em>) is at least ε away from <em>f</em>(<em>a</em>).</p>` }
    ],
    sources: ["mcs", "forallx", "levin"]
  },
  {
    id: "u3",
    title: "Proof techniques",
    minutes: 90,
    summary: "How to read and write proofs: definitions, direct proof, proof by contrapositive, by contradiction and by cases, existence proofs, proving \"if and only if\", and common mistakes.",
    notes: `
<p>A <strong>proof</strong> is an argument that convinces a careful, skeptical reader that a statement is true, with every step following from definitions, previously proved facts, or earlier steps. Proofs are how mathematicians, and computer scientists, <em>know</em> something rather than believe it: that an algorithm always returns the right answer, that a cryptographic system can't be broken without solving a hard problem, that a program never divides by zero.</p>
<p>Writing proofs is a skill, learned like programming: by reading examples, imitating them, and getting feedback. This lesson gives you the basic techniques and a strategy for starting.</p>

<h3>Start from definitions</h3>
<p>Most proofs in this course are definitions unpacked carefully. Here are the ones we'll use, all about integers:</p>
<ul>
  <li><em>n</em> is <strong>even</strong> if <em>n</em> = 2<em>k</em> for some integer <em>k</em>.</li>
  <li><em>n</em> is <strong>odd</strong> if <em>n</em> = 2<em>k</em> + 1 for some integer <em>k</em>.</li>
  <li><em>a</em> <strong>divides</strong> <em>b</em>, written <em>a</em> | <em>b</em>, if <em>b</em> = <em>ak</em> for some integer <em>k</em>. So 3 | 12, but 5 ∤ 12.</li>
  <li><em>p</em> is <strong>prime</strong> if <em>p</em> &gt; 1 and its only positive divisors are 1 and <em>p</em>.</li>
  <li>A real number is <strong>rational</strong> if it equals <em>a</em>/<em>b</em> for integers <em>a</em> and <em>b</em> with <em>b</em> ≠ 0.</li>
</ul>
<p>Every integer is either even or odd, and never both. We'll use that fact freely.</p>

<h3>How to start a proof</h3>
<ol>
  <li><strong>Write down exactly what you're given and what you must show.</strong> For "if <em>P</em> then <em>Q</em>", you're given <em>P</em> and must show <em>Q</em>.</li>
  <li><strong>Replace each term with its definition.</strong> "<em>n</em> is odd" becomes "<em>n</em> = 2<em>k</em> + 1 for some integer <em>k</em>".</li>
  <li><strong>Work forward from what you know and backward from what you want</strong>, until the two meet. To show something is odd, aim for the form 2 × (integer) + 1.</li>
  <li><strong>Try small examples</strong> to see why the statement is true. They don't prove anything, but they suggest the idea.</li>
  <li><strong>Write it up cleanly</strong>, in full sentences, in logical order. Your scratch work and your final proof are different documents.</li>
</ol>

<h3>Direct proof</h3>
<p>Assume the hypothesis and derive the conclusion step by step.</p>
<p><strong>Claim.</strong> The sum of two odd integers is even.</p>
<p><strong>Proof.</strong> Let <em>m</em> and <em>n</em> be odd integers. Then <em>m</em> = 2<em>a</em> + 1 and <em>n</em> = 2<em>b</em> + 1 for some integers <em>a</em> and <em>b</em>. (Notice we need two <em>different</em> letters: <em>m</em> and <em>n</em> needn't be the same number.) Then <em>m</em> + <em>n</em> = 2<em>a</em> + 2<em>b</em> + 2 = 2(<em>a</em> + <em>b</em> + 1). Since <em>a</em> + <em>b</em> + 1 is an integer, <em>m</em> + <em>n</em> is even. ∎</p>
<p><strong>Claim.</strong> If <em>n</em> is odd, then <em>n</em>² is odd.</p>
<p><strong>Proof.</strong> Suppose <em>n</em> is odd, so <em>n</em> = 2<em>k</em> + 1 for some integer <em>k</em>. Then <em>n</em>² = 4<em>k</em>² + 4<em>k</em> + 1 = 2(2<em>k</em>² + 2<em>k</em>) + 1. Since 2<em>k</em>² + 2<em>k</em> is an integer, <em>n</em>² is odd. ∎</p>
<p><strong>Claim.</strong> If <em>a</em> | <em>b</em> and <em>b</em> | <em>c</em>, then <em>a</em> | <em>c</em>.</p>
<p><strong>Proof.</strong> Since <em>a</em> | <em>b</em>, <em>b</em> = <em>ak</em> for some integer <em>k</em>. Since <em>b</em> | <em>c</em>, <em>c</em> = <em>bj</em> for some integer <em>j</em>. Substituting, <em>c</em> = (<em>ak</em>)<em>j</em> = <em>a</em>(<em>kj</em>), and <em>kj</em> is an integer, so <em>a</em> | <em>c</em>. ∎</p>
<p>The symbol ∎ (or "QED") marks the end of a proof.</p>

<h3>Proof by contrapositive</h3>
<p>Since <em>P</em> → <em>Q</em> is equivalent to ¬<em>Q</em> → ¬<em>P</em>, you can prove the contrapositive instead. This helps when the negation of the conclusion gives you something concrete to work with.</p>
<p><strong>Claim.</strong> If <em>n</em>² is even, then <em>n</em> is even.</p>
<p>A direct proof is awkward: knowing <em>n</em>² = 2<em>k</em> doesn't easily tell us about <em>n</em>. So prove the contrapositive.</p>
<p><strong>Proof.</strong> We prove the contrapositive: if <em>n</em> is not even, then <em>n</em>² is not even; that is, if <em>n</em> is odd, then <em>n</em>² is odd. That is exactly the claim we proved directly above. ∎</p>

<h3>Proof by contradiction</h3>
<p>Assume the statement is false, and show that this leads to something impossible. Since the assumption leads to nonsense, it must be wrong, so the statement is true.</p>
<p><strong>Claim.</strong> √2 is irrational.</p>
<p><strong>Proof.</strong> Suppose, for contradiction, that √2 is rational. Then √2 = <em>a</em>/<em>b</em> for integers <em>a</em> and <em>b</em> with <em>b</em> ≠ 0, and we can choose the fraction in lowest terms, so <em>a</em> and <em>b</em> have no common factor greater than 1. Squaring gives 2 = <em>a</em>²/<em>b</em>², so <em>a</em>² = 2<em>b</em>². So <em>a</em>² is even, and by the previous claim <em>a</em> is even: <em>a</em> = 2<em>c</em> for some integer <em>c</em>. Substituting, 4<em>c</em>² = 2<em>b</em>², so <em>b</em>² = 2<em>c</em>², which means <em>b</em>² is even, and so <em>b</em> is even. Now <em>a</em> and <em>b</em> are both even, so they share the factor 2, contradicting our choice of lowest terms. Therefore √2 is irrational. ∎</p>
<p><strong>Claim</strong> (Euclid, about 300 BCE). There are infinitely many primes.</p>
<p><strong>Proof.</strong> Suppose, for contradiction, that there are only finitely many primes, <em>p</em>₁, <em>p</em>₂, …, <em>p</em>ₙ. Let <em>N</em> = <em>p</em>₁<em>p</em>₂⋯<em>p</em>ₙ + 1. Dividing <em>N</em> by any <em>p</em>ᵢ leaves remainder 1, so no <em>p</em>ᵢ divides <em>N</em>. But <em>N</em> &gt; 1, so <em>N</em> has some prime divisor (Lesson 6 proves every integer greater than 1 has one), and that prime isn't on our list. This contradicts the assumption that the list contained every prime. ∎</p>

<h3>Proof by cases</h3>
<p>If the hypothesis splits naturally into cases that cover every possibility, prove the statement in each case.</p>
<p><strong>Claim.</strong> For every integer <em>n</em>, <em>n</em>² + <em>n</em> is even.</p>
<p><strong>Proof.</strong> Every integer is even or odd. <em>Case 1: n is even</em>, so <em>n</em> = 2<em>k</em>. Then <em>n</em>² + <em>n</em> = 4<em>k</em>² + 2<em>k</em> = 2(2<em>k</em>² + <em>k</em>), which is even. <em>Case 2: n is odd</em>, so <em>n</em> = 2<em>k</em> + 1. Then <em>n</em>² + <em>n</em> = (4<em>k</em>² + 4<em>k</em> + 1) + (2<em>k</em> + 1) = 2(2<em>k</em>² + 3<em>k</em> + 1), which is even. In both cases <em>n</em>² + <em>n</em> is even. ∎</p>
<p>(A slicker proof: <em>n</em>² + <em>n</em> = <em>n</em>(<em>n</em> + 1), a product of two consecutive integers, one of which must be even. Looking for a slicker proof after finding one that works is a good habit.)</p>

<h3>Existence proofs and counterexamples</h3>
<p>To prove ∃<em>x</em> <em>P</em>(<em>x</em>), one example suffices. <strong>Claim:</strong> some prime is even. <strong>Proof:</strong> 2 is prime and even. ∎</p>
<p>To disprove ∀<em>x</em> <em>P</em>(<em>x</em>), one counterexample suffices. <strong>Claim:</strong> "<em>n</em>² + <em>n</em> + 41 is prime for every natural number <em>n</em>." It's prime for <em>n</em> = 0, 1, …, 39, which is very convincing, but for <em>n</em> = 40 it's 40² + 40 + 41 = 1681 = 41², which isn't prime. The claim is false. This famous example, noticed by Euler, shows why checking many cases is not a proof.</p>

<h3>Proving "if and only if"</h3>
<p><em>P</em> ↔ <em>Q</em> means (<em>P</em> → <em>Q</em>) ∧ (<em>Q</em> → <em>P</em>), so prove both directions separately. <strong>Claim:</strong> <em>n</em> is even if and only if <em>n</em>² is even. (→) If <em>n</em> = 2<em>k</em>, then <em>n</em>² = 2(2<em>k</em>²), which is even. (←) This is the contrapositive proof above. ∎</p>

<h3>Common mistakes</h3>
<ul>
  <li><strong>Proof by example.</strong> Checking <em>n</em> = 1, 2, 3 doesn't prove a statement for all <em>n</em>.</li>
  <li><strong>Assuming the conclusion.</strong> Starting with what you want to prove and deriving something true proves nothing.</li>
  <li><strong>Reusing a variable.</strong> Writing <em>m</em> = 2<em>k</em> + 1 and <em>n</em> = 2<em>k</em> + 1 silently assumes <em>m</em> = <em>n</em>. Use a new letter each time.</li>
  <li><strong>Proving the converse.</strong> Showing <em>Q</em> → <em>P</em> when asked for <em>P</em> → <em>Q</em>.</li>
  <li><strong>Unexplained steps.</strong> "Clearly" and "obviously" often hide the hard part. If a step needs a reason, give it.</li>
</ul>
`,
    terms: [
      ["Proof", "An argument in which every step follows from definitions, known results or earlier steps."],
      ["Divides (a | b)", "b = ak for some integer k."],
      ["Direct proof", "Assume the hypothesis and derive the conclusion."],
      ["Proof by contrapositive", "Prove ¬Q → ¬P to establish P → Q."],
      ["Proof by contradiction", "Assume the claim is false and derive an impossibility."],
      ["Proof by cases", "Split into cases covering every possibility and prove each one."],
      ["Lemma", "A smaller result proved to help prove a larger one."],
      ["∎", "End-of-proof marker (also written QED)."]
    ],
    quiz: [
      ...[{"q":"To prove \"if 3n + 2 is odd, then n is odd\", which method is most natural?","choices":["Direct proof","Contrapositive","Checking examples","Cases on 3n + 2"],"answer":1,"why":"Assuming n is even gives n = 2k and 3n + 2 = 6k + 2 = 2(3k + 1), which is even. The contrapositive is immediate."},{"q":"You checked a claim for n = 1 through 1,000,000 and it held every time. Have you proved it for all n?","choices":["Yes","No"],"answer":1,"why":"Examples cannot prove a universal claim. Some conjectures fail only at enormous values."},{"q":"In the proof that √2 is irrational, what is the contradiction?","choices":["a = b","√2 is negative","a and b are both even though a/b is in lowest terms","b = 0"],"answer":2,"why":"We assumed lowest terms, then showed 2 divides both a and b."}],
      { q: "A proof begins: \"Let m and n be odd, so m = 2k + 1 and n = 2k + 1.\" What's wrong?", choices: ["Nothing", "It assumes m and n are equal by using the same k", "Odd numbers are 2k − 1", "It should use contradiction"], answer: 1, why: "Different numbers need different letters: m = 2a + 1 and n = 2b + 1." },
      { q: "n² + n + 41 is prime for n = 0 through 39. What can you conclude?", choices: ["It is prime for all n", "Nothing about all n; in fact it fails at n = 40", "It is prime for all odd n", "It is never prime after 39"], answer: 1, why: "40² + 40 + 41 = 1681 = 41². Many examples are not a proof." }
    ],
    practice: [
      { q: `<p>Prove: the product of two odd integers is odd.</p>`, a: `<p><strong>Proof.</strong> Let <em>m</em> = 2<em>a</em> + 1 and <em>n</em> = 2<em>b</em> + 1 for integers <em>a</em> and <em>b</em>. Then <em>mn</em> = 4<em>ab</em> + 2<em>a</em> + 2<em>b</em> + 1 = 2(2<em>ab</em> + <em>a</em> + <em>b</em>) + 1, and 2<em>ab</em> + <em>a</em> + <em>b</em> is an integer, so <em>mn</em> is odd. ∎</p>` },
      { q: `<p>Prove: if <em>a</em> | <em>b</em> and <em>a</em> | <em>c</em>, then <em>a</em> | (<em>b</em> + <em>c</em>).</p>`, a: `<p><strong>Proof.</strong> Since <em>a</em> | <em>b</em> and <em>a</em> | <em>c</em>, there are integers <em>j</em> and <em>k</em> with <em>b</em> = <em>aj</em> and <em>c</em> = <em>ak</em>. Then <em>b</em> + <em>c</em> = <em>aj</em> + <em>ak</em> = <em>a</em>(<em>j</em> + <em>k</em>), and <em>j</em> + <em>k</em> is an integer, so <em>a</em> | (<em>b</em> + <em>c</em>). ∎</p>` },
      { q: `<p>Prove by contrapositive: if 3<em>n</em> + 2 is odd, then <em>n</em> is odd.</p>`, a: `<p><strong>Proof.</strong> We prove the contrapositive: if <em>n</em> is even, then 3<em>n</em> + 2 is even. Let <em>n</em> = 2<em>k</em>. Then 3<em>n</em> + 2 = 6<em>k</em> + 2 = 2(3<em>k</em> + 1), which is even. ∎</p>` },
      { q: `<p>Prove by contradiction: there is no largest even integer.</p>`, a: `<p><strong>Proof.</strong> Suppose, for contradiction, that <em>N</em> is the largest even integer. Then <em>N</em> + 2 is also even, since <em>N</em> + 2 = 2<em>k</em> + 2 = 2(<em>k</em> + 1), and <em>N</em> + 2 &gt; <em>N</em>. This contradicts <em>N</em> being the largest. ∎</p>` },
      { q: `<p>Prove by cases: for every integer <em>n</em>, <em>n</em>² leaves remainder 0 or 1 when divided by 4.</p>`, hint: `<p>Use the cases <em>n</em> even and <em>n</em> odd, and write each square as 4 × (integer) + remainder.</p>`, a: `<p><strong>Proof.</strong> <em>Case 1:</em> <em>n</em> = 2<em>k</em>. Then <em>n</em>² = 4<em>k</em>², remainder 0. <em>Case 2:</em> <em>n</em> = 2<em>k</em> + 1. Then <em>n</em>² = 4<em>k</em>² + 4<em>k</em> + 1 = 4(<em>k</em>² + <em>k</em>) + 1, remainder 1. ∎</p><p>A consequence: no perfect square ends in remainder 2 or 3 mod 4, so, for example, 1,000,003 isn't a perfect square.</p>` },
      { q: `<p>Decide whether each statement is true or false. Prove the true ones and give a counterexample for the false ones. (a) The sum of an even and an odd integer is odd. (b) If <em>a</em> | <em>bc</em>, then <em>a</em> | <em>b</em> or <em>a</em> | <em>c</em>. (c) For all real <em>x</em>, if <em>x</em>² &gt; 4 then <em>x</em> &gt; 2.</p>`, a: `<p>(a) True: (2<em>a</em>) + (2<em>b</em> + 1) = 2(<em>a</em> + <em>b</em>) + 1. (b) False: 6 | 4 × 3 = 12, but 6 ∤ 4 and 6 ∤ 3. (It is true when <em>a</em> is prime.) (c) False: <em>x</em> = −3 has <em>x</em>² = 9 &gt; 4, but −3 &lt; 2.</p>` },
      { q: `<p>Find the error in this "proof" that 1 = 2. Let <em>a</em> = <em>b</em>. Then <em>a</em>² = <em>ab</em>, so <em>a</em>² − <em>b</em>² = <em>ab</em> − <em>b</em>², so (<em>a</em> + <em>b</em>)(<em>a</em> − <em>b</em>) = <em>b</em>(<em>a</em> − <em>b</em>), so <em>a</em> + <em>b</em> = <em>b</em>, so 2<em>b</em> = <em>b</em>, so 2 = 1.</p>`, a: `<p>The step from (<em>a</em> + <em>b</em>)(<em>a</em> − <em>b</em>) = <em>b</em>(<em>a</em> − <em>b</em>) to <em>a</em> + <em>b</em> = <em>b</em> divides both sides by <em>a</em> − <em>b</em>, which is 0 because <em>a</em> = <em>b</em>. Dividing by zero is not allowed. Every step in a proof needs a valid justification, and "divide both sides" requires the divisor to be non-zero.</p>` }
    ],
    sources: ["mcs", "bookofproof", "levin"]
  }
]);

CSA.addUnits("math120", [
  {
    id: "u4",
    title: "Sets",
    minutes: 90,
    summary: "The language of collections: notation, subsets, the empty set and the universe, set operations and Venn diagrams, power sets and Cartesian products, counting with inclusion–exclusion, and proving set identities.",
    notes: `
<p>Almost every object in mathematics and computer science is built from sets: the set of valid inputs to a program, the set of rows a database query returns, the set of states a machine can be in. This lesson gives you the vocabulary and the main proof technique for sets.</p>

<h3>What a set is</h3>
<p>A <strong>set</strong> is an unordered collection of distinct objects, called its <strong>elements</strong> or members. Order and repetition don't matter: {1, 2, 3}, {3, 1, 2} and {1, 1, 2, 3} are all the same set, with three elements. Write <em>x</em> ∈ <em>A</em> for "<em>x</em> is an element of <em>A</em>" and <em>x</em> ∉ <em>A</em> for "<em>x</em> is not".</p>
<p>Some sets come up so often they have their own symbols:</p>
<ul>
  <li>ℕ, the natural numbers 0, 1, 2, 3, … (some books start at 1; computer scientists usually include 0)</li>
  <li>ℤ, the integers …, −2, −1, 0, 1, 2, …</li>
  <li>ℚ, the rational numbers, and ℝ, the real numbers</li>
  <li>∅, the <strong>empty set</strong>, with no elements at all</li>
</ul>

<h3>Describing sets</h3>
<p>Small sets can be listed: {red, green, blue}. Large or infinite sets use <strong>set-builder notation</strong>, which reads like a filter: "the set of all <em>x</em> in some set such that a condition holds".</p>
<table>
  <thead><tr><th>Notation</th><th>Read as</th><th>Elements</th></tr></thead>
  <tbody>
    <tr><td>{<em>x</em> ∈ ℤ : <em>x</em> &gt; 0}</td><td>integers <em>x</em> such that <em>x</em> &gt; 0</td><td>1, 2, 3, …</td></tr>
    <tr><td>{<em>n</em> ∈ ℕ : <em>n</em> is even}</td><td>natural numbers that are even</td><td>0, 2, 4, …</td></tr>
    <tr><td>{2<em>k</em> + 1 : <em>k</em> ∈ ℤ}</td><td>all numbers of the form 2<em>k</em> + 1</td><td>the odd integers</td></tr>
    <tr><td>{<em>x</em> ∈ ℝ : <em>x</em>² = −1}</td><td>real numbers whose square is −1</td><td>none: this is ∅</td></tr>
  </tbody>
</table>
<p>If this reminds you of Python, it should: <code>{x for x in range(20) if x % 2 == 0}</code> is a set comprehension, built directly on this notation.</p>

<h3>Subsets</h3>
<p><em>A</em> is a <strong>subset</strong> of <em>B</em>, written <em>A</em> ⊆ <em>B</em>, if every element of <em>A</em> is also in <em>B</em>. So {1, 2} ⊆ {1, 2, 3}, and ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ. Two facts follow straight from the definition:</p>
<ul>
  <li>Every set is a subset of itself.</li>
  <li>∅ is a subset of every set, because "every element of ∅ is in <em>A</em>" is vacuously true: there are no elements to check.</li>
</ul>
<p>Two sets are <strong>equal</strong> when they have exactly the same elements, which is the same as <em>A</em> ⊆ <em>B</em> and <em>B</em> ⊆ <em>A</em>. That fact is the basis for proving sets are equal, below.</p>
<p class="note">Don't confuse ∈ with ⊆. "Is an element of" relates an object to a set; "is a subset of" relates two sets. With <em>A</em> = {1, {2}}: 1 ∈ <em>A</em>, {2} ∈ <em>A</em>, {1} ⊆ <em>A</em>, but 2 ∉ <em>A</em> and {2} ⊄ <em>A</em>. Sets can contain other sets as elements.</p>

<h3>The universe and set operations</h3>
<p>In any discussion, the elements come from some <strong>universe</strong> <em>U</em>, such as all integers, or all students at a university. It matters for the complement, which means "everything in the universe that isn't in <em>A</em>".</p>
<table>
  <thead><tr><th>Operation</th><th>Notation</th><th>Elements</th><th>Logic</th><th>Python</th></tr></thead>
  <tbody>
    <tr><td>Union</td><td><em>A</em> ∪ <em>B</em></td><td>in <em>A</em> or in <em>B</em> (or both)</td><td>∨</td><td><code>a | b</code></td></tr>
    <tr><td>Intersection</td><td><em>A</em> ∩ <em>B</em></td><td>in both <em>A</em> and <em>B</em></td><td>∧</td><td><code>a &amp; b</code></td></tr>
    <tr><td>Difference</td><td><em>A</em> − <em>B</em></td><td>in <em>A</em> but not in <em>B</em></td><td><em>x</em> ∈ <em>A</em> ∧ <em>x</em> ∉ <em>B</em></td><td><code>a - b</code></td></tr>
    <tr><td>Complement</td><td><em>A</em>ᶜ</td><td>in <em>U</em> but not in <em>A</em></td><td>¬</td><td><code>universe - a</code></td></tr>
  </tbody>
</table>
<p>A <strong>Venn diagram</strong> pictures sets as overlapping circles inside a box for the universe. The shaded areas show each operation:</p>
<figure class="fig">
<svg viewBox="0 0 540 160" role="img" aria-label="Three Venn diagrams: union with both circles shaded, intersection with only the overlap shaded, and difference A minus B with only the part of A outside B shaded">
  <defs>
    <clipPath id="vennA2"><circle cx="240" cy="70" r="42"/></clipPath>
  </defs>
  <rect x="5" y="15" width="165" height="110" rx="4" class="outline"/>
  <circle cx="65" cy="70" r="42" class="shade"/><circle cx="110" cy="70" r="42" class="shade"/>
  <circle cx="65" cy="70" r="42" class="outline"/><circle cx="110" cy="70" r="42" class="outline"/>
  <text x="40" y="74">A</text><text x="128" y="74">B</text><text x="45" y="148">A ∪ B</text>
  <rect x="185" y="15" width="165" height="110" rx="4" class="outline"/>
  <circle cx="285" cy="70" r="42" class="shade" clip-path="url(#vennA2)"/>
  <circle cx="240" cy="70" r="42" class="outline"/><circle cx="285" cy="70" r="42" class="outline"/>
  <text x="215" y="74">A</text><text x="303" y="74">B</text><text x="225" y="148">A ∩ B</text>
  <rect x="365" y="15" width="165" height="110" rx="4" class="outline"/>
  <circle cx="425" cy="70" r="42" class="shade"/><circle cx="470" cy="70" r="42" class="bgf"/>
  <circle cx="425" cy="70" r="42" class="outline"/><circle cx="470" cy="70" r="42" class="outline"/>
  <text x="400" y="74">A</text><text x="488" y="74">B</text><text x="405" y="148">A − B</text>
</svg>
<figcaption>Union, intersection and difference. The surrounding box is the universe <em>U</em>; the complement of <em>A</em> would be everything in the box outside circle <em>A</em>.</figcaption>
</figure>
<p>Two sets are <strong>disjoint</strong> if <em>A</em> ∩ <em>B</em> = ∅: they have nothing in common, like the even and odd integers.</p>

<h3>Counting: cardinality and inclusion–exclusion</h3>
<p>The <strong>cardinality</strong> |<em>A</em>| of a finite set is its number of elements: |{a, b, c}| = 3 and |∅| = 0. How big is a union? Adding |<em>A</em>| + |<em>B</em>| counts the elements in the overlap twice, so subtract them once:</p>
<p class="math">|<em>A</em> ∪ <em>B</em>| = |<em>A</em>| + |<em>B</em>| − |<em>A</em> ∩ <em>B</em>|</p>
<p>This is the <strong>principle of inclusion–exclusion</strong>. <em>Example:</em> 120 students take CS 101, 90 take Discrete Math, and 40 take both. Then 120 + 90 − 40 = 170 students take at least one of the two.</p>

<h3>Power sets and Cartesian products</h3>
<p>The <strong>power set</strong> 𝒫(<em>A</em>) is the set of all subsets of <em>A</em>. For <em>A</em> = {a, b, c}:</p>
<p class="math">𝒫(<em>A</em>) = { ∅, {a}, {b}, {c}, {a, b}, {a, c}, {b, c}, {a, b, c} }</p>
<p>That's 8 = 2³ subsets. In general, if |<em>A</em>| = <em>n</em> then |𝒫(<em>A</em>)| = 2<sup>n</sup>: building a subset means deciding, for each of the <em>n</em> elements, whether it's in or out, and two choices <em>n</em> times gives 2<sup>n</sup> possibilities. This is why a truth table with <em>n</em> letters has 2<sup>n</sup> rows, and why trying every subset of something is hopeless for large <em>n</em>.</p>
<p>The <strong>Cartesian product</strong> <em>A</em> × <em>B</em> is the set of all <em>ordered pairs</em> (<em>a</em>, <em>b</em>) with <em>a</em> ∈ <em>A</em> and <em>b</em> ∈ <em>B</em>. Unlike sets, pairs have an order: (1, 2) ≠ (2, 1). For <em>A</em> = {1, 2} and <em>B</em> = {x, y, z}, <em>A</em> × <em>B</em> = {(1, x), (1, y), (1, z), (2, x), (2, y), (2, z)}, and in general |<em>A</em> × <em>B</em>| = |<em>A</em>| · |<em>B</em>|. The points of the plane are ℝ × ℝ, and a database table is a subset of a Cartesian product of its columns' possible values.</p>

<h3>Proving set identities by element chasing</h3>
<p>To prove two sets are equal, show each is a subset of the other. To show <em>X</em> ⊆ <em>Y</em>, take an arbitrary element of <em>X</em> and show it must be in <em>Y</em>. This is called <strong>element chasing</strong>.</p>
<p><strong>Claim.</strong> <em>A</em> ∩ (<em>B</em> ∪ <em>C</em>) = (<em>A</em> ∩ <em>B</em>) ∪ (<em>A</em> ∩ <em>C</em>).</p>
<p><strong>Proof.</strong> (⊆) Let <em>x</em> ∈ <em>A</em> ∩ (<em>B</em> ∪ <em>C</em>). Then <em>x</em> ∈ <em>A</em>, and <em>x</em> ∈ <em>B</em> or <em>x</em> ∈ <em>C</em>. If <em>x</em> ∈ <em>B</em>, then <em>x</em> ∈ <em>A</em> ∩ <em>B</em>; if <em>x</em> ∈ <em>C</em>, then <em>x</em> ∈ <em>A</em> ∩ <em>C</em>. Either way, <em>x</em> ∈ (<em>A</em> ∩ <em>B</em>) ∪ (<em>A</em> ∩ <em>C</em>).</p>
<p>(⊇) Let <em>x</em> ∈ (<em>A</em> ∩ <em>B</em>) ∪ (<em>A</em> ∩ <em>C</em>). Then <em>x</em> ∈ <em>A</em> ∩ <em>B</em> or <em>x</em> ∈ <em>A</em> ∩ <em>C</em>. In the first case <em>x</em> ∈ <em>A</em> and <em>x</em> ∈ <em>B</em> ⊆ <em>B</em> ∪ <em>C</em>; in the second, <em>x</em> ∈ <em>A</em> and <em>x</em> ∈ <em>C</em> ⊆ <em>B</em> ∪ <em>C</em>. Either way, <em>x</em> ∈ <em>A</em> ∩ (<em>B</em> ∪ <em>C</em>).</p>
<p>Each side is a subset of the other, so they are equal. ∎</p>
<p>Notice how closely the proof follows the logical law <em>P</em> ∧ (<em>Q</em> ∨ <em>R</em>) ≡ (<em>P</em> ∧ <em>Q</em>) ∨ (<em>P</em> ∧ <em>R</em>). Set operations are logic in disguise: ∪ is ∨, ∩ is ∧, and complement is ¬. Every law from Lesson 1 has a set version, including <strong>De Morgan's laws for sets</strong>: (<em>A</em> ∪ <em>B</em>)ᶜ = <em>A</em>ᶜ ∩ <em>B</em>ᶜ and (<em>A</em> ∩ <em>B</em>)ᶜ = <em>A</em>ᶜ ∪ <em>B</em>ᶜ.</p>
<p>A Venn diagram is a good way to <em>check</em> an identity, but it isn't a proof: a picture with two circles can't represent every possible relationship between sets.</p>
`,
    terms: [
      ["Set", "An unordered collection of distinct elements."],
      ["Set-builder notation", "{x ∈ S : condition}, the elements of S satisfying a condition."],
      ["Subset", "A ⊆ B if every element of A is in B."],
      ["Universe", "The set all elements under discussion come from; needed for complements."],
      ["Disjoint", "Having no elements in common: A ∩ B = ∅."],
      ["Cardinality", "The number of elements in a finite set, written |A|."],
      ["Inclusion–exclusion", "|A ∪ B| = |A| + |B| − |A ∩ B|."],
      ["Power set", "The set of all subsets of a set; it has 2ⁿ elements if the set has n."],
      ["Cartesian product", "The set of ordered pairs with one element from each set."],
      ["Element chasing", "Proving X ⊆ Y by taking an arbitrary element of X and showing it is in Y."]
    ],
    quiz: [
      ...[{"q":"If |A| = 4, how many subsets does A have?","choices":["4","8","16","24"],"answer":2,"why":"2⁴ = 16, counting ∅ and A itself."},{"q":"Is ∅ a subset of every set?","choices":["Yes","No"],"answer":0,"why":"\"Every element of ∅ is in A\" is vacuously true, since ∅ has no elements."},{"q":"If A = {1, 2} and B = {x, y, z}, what is |A × B|?","choices":["5","6","8","9"],"answer":1,"why":"2 × 3 = 6 ordered pairs."}],
      { q: "In a class, 25 students play an instrument, 18 play a sport, and 7 do both. How many do at least one?", choices: ["43", "36", "50", "32"], answer: 1, why: "Inclusion–exclusion: 25 + 18 − 7 = 36." },
      { q: "With A = {1, {2}}, which is true?", choices: ["2 ∈ A", "{2} ⊆ A", "{2} ∈ A", "{1, 2} ⊆ A"], answer: 2, why: "The set {2} is itself an element of A. The number 2 is not, so {2} is not a subset of A." }
    ],
    practice: [
      { q: `<p>List the elements: (a) {<em>x</em> ∈ ℤ : −2 ≤ <em>x</em> &lt; 3}. (b) {<em>n</em>² : <em>n</em> ∈ {−2, −1, 0, 1, 2}}. (c) {<em>x</em> ∈ ℕ : <em>x</em> divides 12}.</p>`, a: `<p>(a) {−2, −1, 0, 1, 2}. (b) {0, 1, 4}: squares repeat, but a set lists each element once. (c) {1, 2, 3, 4, 6, 12}.</p>` },
      { q: `<p>With <em>U</em> = {1, …, 10}, <em>A</em> = {1, 2, 3, 4, 5} and <em>B</em> = {4, 5, 6, 7}, find <em>A</em> ∪ <em>B</em>, <em>A</em> ∩ <em>B</em>, <em>A</em> − <em>B</em>, <em>B</em> − <em>A</em>, <em>A</em>ᶜ and (<em>A</em> ∪ <em>B</em>)ᶜ. Check De Morgan's law (<em>A</em> ∪ <em>B</em>)ᶜ = <em>A</em>ᶜ ∩ <em>B</em>ᶜ on this example.</p>`, a: `<p><em>A</em> ∪ <em>B</em> = {1, …, 7}; <em>A</em> ∩ <em>B</em> = {4, 5}; <em>A</em> − <em>B</em> = {1, 2, 3}; <em>B</em> − <em>A</em> = {6, 7}; <em>A</em>ᶜ = {6, 7, 8, 9, 10}; (<em>A</em> ∪ <em>B</em>)ᶜ = {8, 9, 10}. And <em>B</em>ᶜ = {1, 2, 3, 8, 9, 10}, so <em>A</em>ᶜ ∩ <em>B</em>ᶜ = {8, 9, 10}, which matches.</p>` },
      { q: `<p>Write out 𝒫({1, 2}) and {0, 1} × {a, b}. How many elements would 𝒫({1, 2, 3, 4, 5}) have?</p>`, a: `<p>𝒫({1, 2}) = {∅, {1}, {2}, {1, 2}}. {0, 1} × {a, b} = {(0, a), (0, b), (1, a), (1, b)}. 𝒫 of a 5-element set has 2⁵ = 32 elements.</p>` },
      { q: `<p>A survey of 200 students finds 120 use a laptop for notes, 95 use a tablet, and 30 use neither. How many use both?</p>`, hint: `<p>First find how many use at least one device.</p>`, a: `<p>200 − 30 = 170 use at least one. By inclusion–exclusion, 170 = 120 + 95 − |both|, so |both| = 45.</p>` },
      { q: `<p>Prove by element chasing: <em>A</em> − <em>B</em> = <em>A</em> ∩ <em>B</em>ᶜ.</p>`, a: `<p><strong>Proof.</strong> (⊆) Let <em>x</em> ∈ <em>A</em> − <em>B</em>. Then <em>x</em> ∈ <em>A</em> and <em>x</em> ∉ <em>B</em>, so <em>x</em> ∈ <em>B</em>ᶜ, and therefore <em>x</em> ∈ <em>A</em> ∩ <em>B</em>ᶜ. (⊇) Let <em>x</em> ∈ <em>A</em> ∩ <em>B</em>ᶜ. Then <em>x</em> ∈ <em>A</em> and <em>x</em> ∈ <em>B</em>ᶜ, meaning <em>x</em> ∉ <em>B</em>, so <em>x</em> ∈ <em>A</em> − <em>B</em>. Each side is a subset of the other, so they are equal. ∎</p>` },
      { q: `<p>Prove: if <em>A</em> ⊆ <em>B</em>, then <em>A</em> ∪ <em>B</em> = <em>B</em>.</p>`, a: `<p><strong>Proof.</strong> (⊆) Let <em>x</em> ∈ <em>A</em> ∪ <em>B</em>. If <em>x</em> ∈ <em>B</em>, we're done. If <em>x</em> ∈ <em>A</em>, then <em>x</em> ∈ <em>B</em> because <em>A</em> ⊆ <em>B</em>. (⊇) Every element of <em>B</em> is in <em>A</em> ∪ <em>B</em> by the definition of union. ∎</p>` },
      { q: `<p>Is it true that (<em>A</em> − <em>B</em>) ∪ (<em>B</em> − <em>A</em>) = <em>A</em> ∪ <em>B</em> for all sets? Prove it or give a counterexample. What does the left side describe?</p>`, a: `<p>False. Counterexample: <em>A</em> = <em>B</em> = {1}. The left side is ∅ ∪ ∅ = ∅, but <em>A</em> ∪ <em>B</em> = {1}. The left side is the <em>symmetric difference</em>: elements in exactly one of the two sets, which is (<em>A</em> ∪ <em>B</em>) − (<em>A</em> ∩ <em>B</em>). It's the set version of exclusive or, and Python writes it <code>a ^ b</code>.</p>` }
    ],
    sources: ["mcs", "levin", "bookofproof"]
  },
  {
    id: "u5",
    title: "Functions and relations",
    minutes: 90,
    summary: "Functions as precise input–output rules: injective, surjective and bijective functions, composition and inverses, the pigeonhole principle, relations and their properties, congruence and equivalence classes, and partial orders.",
    notes: `
<p>In programming, a function takes inputs and returns outputs. Mathematics has the same idea, defined precisely in terms of sets. This lesson covers functions and their properties, then <strong>relations</strong>, which describe how pairs of things are connected: who is friends with whom, which course is a prerequisite for which, which numbers leave the same remainder.</p>

<h3>Functions</h3>
<p>A <strong>function</strong> <em>f</em> : <em>A</em> → <em>B</em> assigns to <strong>each</strong> element of <em>A</em> <strong>exactly one</strong> element of <em>B</em>. <em>A</em> is the <strong>domain</strong>, <em>B</em> the <strong>codomain</strong>, and the set of outputs actually reached, {<em>f</em>(<em>a</em>) : <em>a</em> ∈ <em>A</em>}, is the <strong>range</strong> (or image).</p>
<p>Both conditions matter. A rule that gives some input no output, like 1/<em>x</em> on ℝ (nothing at 0), isn't a function on that domain. A rule that gives some input two outputs, like "<em>y</em> with <em>y</em>² = <em>x</em>" (both 2 and −2 for 4), isn't a function at all. The codomain is part of the definition: <em>f</em>(<em>n</em>) = <em>n</em>² as a function ℤ → ℤ has codomain ℤ but range {0, 1, 4, 9, …}.</p>

<h3>Injective, surjective, bijective</h3>
<ul>
  <li><strong>Injective</strong> (one-to-one): different inputs always give different outputs. Formally, <em>f</em>(<em>a</em>₁) = <em>f</em>(<em>a</em>₂) implies <em>a</em>₁ = <em>a</em>₂.</li>
  <li><strong>Surjective</strong> (onto): every element of the codomain is reached. Formally, ∀<em>b</em> ∈ <em>B</em> ∃<em>a</em> ∈ <em>A</em>, <em>f</em>(<em>a</em>) = <em>b</em>.</li>
  <li><strong>Bijective</strong>: both. A bijection pairs up the elements of <em>A</em> and <em>B</em> perfectly.</li>
</ul>
<figure class="fig">
<svg viewBox="0 0 560 175" role="img" aria-label="Three arrow diagrams. Injective but not surjective: 1, 2, 3 map to a, b, c, and d is not reached. Surjective but not injective: 1 and 2 both map to a, 3 maps to b. Bijective: 1 to b, 2 to a, 3 to c.">
  <defs><marker id="arr-fn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
  <ellipse cx="30" cy="80" rx="22" ry="62" class="outline"/><ellipse cx="140" cy="80" rx="22" ry="68" class="outline"/>
  <text x="26" y="45">1</text><text x="26" y="85">2</text><text x="26" y="125">3</text>
  <text x="136" y="35">a</text><text x="136" y="68">b</text><text x="136" y="101">c</text><text x="136" y="134">d</text>
  <line x1="38" y1="41" x2="128" y2="31" class="cv" marker-end="url(#arr-fn)"/>
  <line x1="38" y1="81" x2="128" y2="64" class="cv" marker-end="url(#arr-fn)"/>
  <line x1="38" y1="121" x2="128" y2="97" class="cv" marker-end="url(#arr-fn)"/>
  <text x="10" y="168" class="m">injective, not surjective</text>
  <ellipse cx="220" cy="80" rx="22" ry="62" class="outline"/><ellipse cx="330" cy="80" rx="22" ry="50" class="outline"/>
  <text x="216" y="45">1</text><text x="216" y="85">2</text><text x="216" y="125">3</text>
  <text x="326" y="64">a</text><text x="326" y="110">b</text>
  <line x1="228" y1="41" x2="318" y2="58" class="cv" marker-end="url(#arr-fn)"/>
  <line x1="228" y1="81" x2="318" y2="62" class="cv" marker-end="url(#arr-fn)"/>
  <line x1="228" y1="121" x2="318" y2="106" class="cv" marker-end="url(#arr-fn)"/>
  <text x="200" y="168" class="m">surjective, not injective</text>
  <ellipse cx="410" cy="80" rx="22" ry="62" class="outline"/><ellipse cx="520" cy="80" rx="22" ry="62" class="outline"/>
  <text x="406" y="45">1</text><text x="406" y="85">2</text><text x="406" y="125">3</text>
  <text x="516" y="45">a</text><text x="516" y="85">b</text><text x="516" y="125">c</text>
  <line x1="418" y1="41" x2="508" y2="78" class="cv" marker-end="url(#arr-fn)"/>
  <line x1="418" y1="81" x2="508" y2="44" class="cv" marker-end="url(#arr-fn)"/>
  <line x1="418" y1="121" x2="508" y2="121" class="cv" marker-end="url(#arr-fn)"/>
  <text x="420" y="168" class="m">bijective</text>
</svg>
<figcaption>In each picture every element on the left has exactly one arrow, so each is a function. Injective: no element on the right gets two arrows. Surjective: every element on the right gets at least one.</figcaption>
</figure>
<p>Examples on the integers: <em>f</em>(<em>n</em>) = 2<em>n</em> is injective but not surjective, because odd numbers are never reached. <em>g</em>(<em>n</em>) = <em>n</em> + 1 is a bijection. <em>h</em>(<em>n</em>) = <em>n</em>² is neither: <em>h</em>(2) = <em>h</em>(−2), and 3 is never reached.</p>
<p><strong>Proving a function is injective.</strong> Assume two outputs are equal and show the inputs must be. <em>Claim:</em> <em>f</em> : ℤ → ℤ with <em>f</em>(<em>n</em>) = 3<em>n</em> + 7 is injective. <em>Proof:</em> Suppose <em>f</em>(<em>a</em>) = <em>f</em>(<em>b</em>). Then 3<em>a</em> + 7 = 3<em>b</em> + 7, so 3<em>a</em> = 3<em>b</em>, so <em>a</em> = <em>b</em>. ∎</p>
<p><strong>Proving or disproving surjectivity.</strong> Take an arbitrary <em>b</em> in the codomain and try to solve <em>f</em>(<em>a</em>) = <em>b</em>. For 3<em>n</em> + 7 = <em>b</em>, we'd need <em>n</em> = (<em>b</em> − 7)/3, which isn't an integer when <em>b</em> = 0. So <em>f</em> isn't surjective: nothing maps to 0. As a function ℝ → ℝ, though, the same formula <em>is</em> surjective, because (<em>b</em> − 7)/3 is always a real number. The domain and codomain matter.</p>

<h3>Composition and inverses</h3>
<p>If <em>f</em> : <em>A</em> → <em>B</em> and <em>g</em> : <em>B</em> → <em>C</em>, the <strong>composition</strong> <em>g</em> ∘ <em>f</em> : <em>A</em> → <em>C</em> is (<em>g</em> ∘ <em>f</em>)(<em>x</em>) = <em>g</em>(<em>f</em>(<em>x</em>)): apply <em>f</em> first, then <em>g</em>. With <em>f</em>(<em>x</em>) = <em>x</em> + 1 and <em>g</em>(<em>x</em>) = 2<em>x</em>, (<em>g</em> ∘ <em>f</em>)(3) = <em>g</em>(4) = 8 but (<em>f</em> ∘ <em>g</em>)(3) = <em>f</em>(6) = 7. Order matters. In code, composition is calling one function on another's result: <code>g(f(x))</code>.</p>
<p>A bijection <em>f</em> has an <strong>inverse</strong> <em>f</em>⁻¹ : <em>B</em> → <em>A</em> that undoes it: <em>f</em>⁻¹(<em>f</em>(<em>a</em>)) = <em>a</em>. For <em>f</em>(<em>x</em>) = 3<em>x</em> + 7 on ℝ, solving <em>y</em> = 3<em>x</em> + 7 for <em>x</em> gives <em>f</em>⁻¹(<em>y</em>) = (<em>y</em> − 7)/3. Only bijections have inverses: if two inputs shared an output, the inverse wouldn't know which to return, and if some output were never reached, the inverse would have nothing to return for it. Encryption is an example: decryption must be the inverse of encryption, so encryption has to be injective.</p>

<h3>The pigeonhole principle</h3>
<p>If <em>n</em> items are put into <em>m</em> boxes and <em>n</em> &gt; <em>m</em>, some box gets at least two items. Equivalently: there is no injective function from a larger finite set to a smaller one. It sounds obvious, but it proves surprising things:</p>
<ul>
  <li>Among any 13 people, two share a birth month.</li>
  <li>In a drawer of black and white socks, taking 3 guarantees a matching pair.</li>
  <li>Among 367 people, two share a birthday (counting February 29).</li>
  <li>Any hash function that maps all possible strings to 64-bit numbers must have <strong>collisions</strong>, two different strings with the same hash, because there are more strings than 64-bit numbers. Hash tables must be designed to handle them.</li>
  <li>No compression program can shrink every file: there are fewer short files than long ones, so some file must get longer or two files must compress to the same thing.</li>
</ul>

<h3>Relations</h3>
<p>A <strong>relation</strong> <em>R</em> from <em>A</em> to <em>B</em> is any subset of <em>A</em> × <em>B</em>: a set of pairs saying which elements are related. We write <em>a</em> <em>R</em> <em>b</em> for (<em>a</em>, <em>b</em>) ∈ <em>R</em>. "Is a prerequisite for", "is friends with", "&lt;" and "divides" are relations. A function is a special relation in which each <em>a</em> is related to exactly one <em>b</em>.</p>
<p>A relation <em>on</em> a set <em>A</em> (from <em>A</em> to itself) may have these properties:</p>
<table>
  <thead><tr><th>Property</th><th>Definition</th><th>Has it</th><th>Doesn't</th></tr></thead>
  <tbody>
    <tr><td>Reflexive</td><td><em>a R a</em> for every <em>a</em></td><td>=, ≤, divides</td><td>&lt;</td></tr>
    <tr><td>Symmetric</td><td><em>a R b</em> implies <em>b R a</em></td><td>=, "is a sibling of"</td><td>≤</td></tr>
    <tr><td>Antisymmetric</td><td><em>a R b</em> and <em>b R a</em> imply <em>a</em> = <em>b</em></td><td>≤, ⊆</td><td>"is a sibling of"</td></tr>
    <tr><td>Transitive</td><td><em>a R b</em> and <em>b R c</em> imply <em>a R c</em></td><td>=, &lt;, ≤, divides</td><td>"is the parent of"</td></tr>
  </tbody>
</table>

<h3>Equivalence relations and congruence</h3>
<p>An <strong>equivalence relation</strong> is reflexive, symmetric and transitive: it captures "the same in some respect". The most important example in computer science is <strong>congruence modulo <em>n</em></strong>:</p>
<p class="math"><em>a</em> ≡ <em>b</em> (mod <em>n</em>) means <em>n</em> | (<em>a</em> − <em>b</em>)</p>
<p>that is, <em>a</em> and <em>b</em> leave the same remainder when divided by <em>n</em>. So 17 ≡ 5 (mod 12), because 12 | 12. This is clock arithmetic: 17:00 is 5 o'clock. In Python, <code>a % n == b % n</code>.</p>
<p>An equivalence relation splits its set into non-overlapping groups called <strong>equivalence classes</strong>, where everything in a group is related to everything else in it. Congruence mod 3 splits the integers into three classes:</p>
<table>
  <thead><tr><th>Class</th><th>Elements</th><th>Remainder</th></tr></thead>
  <tbody>
    <tr><td>[0]</td><td>…, −6, −3, 0, 3, 6, 9, …</td><td>0</td></tr>
    <tr><td>[1]</td><td>…, −5, −2, 1, 4, 7, 10, …</td><td>1</td></tr>
    <tr><td>[2]</td><td>…, −4, −1, 2, 5, 8, 11, …</td><td>2</td></tr>
  </tbody>
</table>
<p>Every integer is in exactly one class. (Python agrees: <code>-5 % 3</code> is <code>1</code>.) Hash tables use the same idea: a key's hash modulo the table size decides which slot it goes in.</p>

<h3>Partial orders and topological sorting</h3>
<p>A <strong>partial order</strong> is reflexive, antisymmetric and transitive: it captures "comes before or is the same as". Examples are ≤ on numbers, ⊆ on sets, and divisibility on positive integers. It's "partial" because some pairs may not be comparable at all: neither {1} ⊆ {2} nor {2} ⊆ {1}.</p>
<p>Course prerequisites form an ordering like this. Suppose CS 101 must come before Data Structures, Discrete Math must come before Algorithms, and Data Structures must also come before Algorithms. A valid order to take all four courses is one that never puts a course before its prerequisite, such as CS 101, Discrete Math, Data Structures, Algorithms. Producing such an order is called <strong>topological sorting</strong>. Build tools use it to decide which files to compile first, and spreadsheets use it to decide which cells to recalculate first. You'll write the algorithm in Data Structures.</p>
`,
    terms: [
      ["Function", "A rule assigning each element of the domain exactly one element of the codomain."],
      ["Range (image)", "The set of outputs actually reached by a function."],
      ["Injective", "No two inputs share an output."],
      ["Surjective", "Every codomain element is an output."],
      ["Bijective", "Both injective and surjective; exactly the functions with inverses."],
      ["Composition", "(g ∘ f)(x) = g(f(x)): apply f, then g."],
      ["Pigeonhole principle", "If more than m items go into m boxes, some box holds at least two."],
      ["Relation", "A set of ordered pairs saying which elements are related."],
      ["Equivalence relation", "Reflexive, symmetric and transitive; it splits a set into equivalence classes."],
      ["Congruence mod n", "a ≡ b (mod n) when n divides a − b."],
      ["Partial order", "Reflexive, antisymmetric and transitive, like ≤ or ⊆."]
    ],
    quiz: [
      ...[{"q":"f : ℤ → ℤ, f(n) = 3n. Which is true?","choices":["Bijective","Injective, not surjective","Surjective, not injective","Neither"],"answer":1,"why":"Different n give different 3n, but 1 is never reached."},{"q":"\"Has the same birthday as\" on a set of people is:","choices":["A partial order","An equivalence relation","Neither","A function"],"answer":1,"why":"It is reflexive, symmetric and transitive. The classes are the groups of people sharing each birthday."},{"q":"How many people guarantee that two share a birth month?","choices":["12","13","24","366"],"answer":1,"why":"With 12 months, 13 people force a repeat by pigeonhole."}],
      { q: "Is 38 ≡ 14 (mod 8)?", choices: ["Yes", "No"], answer: 0, why: "38 − 14 = 24, and 8 divides 24. Both leave remainder 6 when divided by 8." },
      { q: "With f(x) = x² and g(x) = x + 3, what is (f ∘ g)(2)?", choices: ["7", "25", "10", "13"], answer: 1, why: "Apply g first: g(2) = 5, then f(5) = 25. (g ∘ f)(2) would be 4 + 3 = 7." }
    ],
    practice: [
      { q: `<p>For each function ℤ → ℤ, decide whether it is injective and whether it is surjective, with a reason: (a) <em>f</em>(<em>n</em>) = <em>n</em> − 5. (b) <em>g</em>(<em>n</em>) = 5<em>n</em>. (c) <em>h</em>(<em>n</em>) = |<em>n</em>|. (d) <em>k</em>(<em>n</em>) = ⌊<em>n</em>/2⌋.</p>`, a: `<p>(a) Bijective: injective since <em>a</em> − 5 = <em>b</em> − 5 gives <em>a</em> = <em>b</em>, and surjective since <em>b</em> = <em>f</em>(<em>b</em> + 5). (b) Injective, not surjective: 1 is never reached. (c) Neither: <em>h</em>(1) = <em>h</em>(−1), and negative numbers are never reached. (d) Surjective but not injective: <em>k</em>(2<em>m</em>) = <em>m</em> reaches every integer, but <em>k</em>(0) = <em>k</em>(1) = 0.</p>` },
      { q: `<p>Prove that <em>f</em> : ℝ → ℝ, <em>f</em>(<em>x</em>) = 5 − 2<em>x</em> is a bijection, and find its inverse.</p>`, a: `<p><em>Injective:</em> if 5 − 2<em>a</em> = 5 − 2<em>b</em>, then −2<em>a</em> = −2<em>b</em>, so <em>a</em> = <em>b</em>. <em>Surjective:</em> given any real <em>y</em>, let <em>x</em> = (5 − <em>y</em>)/2; then <em>f</em>(<em>x</em>) = 5 − (5 − <em>y</em>) = <em>y</em>. So <em>f</em> is a bijection, with <em>f</em>⁻¹(<em>y</em>) = (5 − <em>y</em>)/2. ∎</p>` },
      { q: `<p>Use the pigeonhole principle: (a) How many students must be in a class to guarantee two have the same last digit in their student ID? (b) Show that among any five integers, two have a difference divisible by 4.</p>`, a: `<p>(a) 11: there are 10 possible last digits, so 11 students guarantee a repeat (10 could all differ). (b) Every integer has one of four remainders mod 4: 0, 1, 2 or 3. With five integers and four remainders, two share a remainder, and then their difference is divisible by 4.</p>` },
      { q: `<p>For each relation on the set of all people, decide whether it is reflexive, symmetric, antisymmetric and transitive: (a) "has the same birthday as". (b) "is taller than". (c) "is at least as old as".</p>`, a: `<p>(a) Reflexive, symmetric, transitive, not antisymmetric: it's an equivalence relation. (b) Not reflexive, not symmetric, antisymmetric (vacuously: <em>a</em> taller than <em>b</em> and <em>b</em> taller than <em>a</em> never both happen), transitive. (c) Reflexive, not symmetric, not antisymmetric (two different people can be exactly the same age), transitive.</p>` },
      { q: `<p>Prove that congruence mod <em>n</em> is transitive: if <em>a</em> ≡ <em>b</em> and <em>b</em> ≡ <em>c</em> (mod <em>n</em>), then <em>a</em> ≡ <em>c</em> (mod <em>n</em>).</p>`, a: `<p><strong>Proof.</strong> By definition, <em>n</em> | (<em>a</em> − <em>b</em>) and <em>n</em> | (<em>b</em> − <em>c</em>), so <em>a</em> − <em>b</em> = <em>nj</em> and <em>b</em> − <em>c</em> = <em>nk</em> for integers <em>j</em> and <em>k</em>. Adding, <em>a</em> − <em>c</em> = <em>n</em>(<em>j</em> + <em>k</em>), so <em>n</em> | (<em>a</em> − <em>c</em>), that is, <em>a</em> ≡ <em>c</em> (mod <em>n</em>). ∎</p>` },
      { q: `<p>List the equivalence classes of congruence mod 4 on the integers from 0 to 15. Which class contains 2026? Which contains −1?</p>`, a: `<p>[0] = {0, 4, 8, 12}, [1] = {1, 5, 9, 13}, [2] = {2, 6, 10, 14}, [3] = {3, 7, 11, 15}. 2026 = 4 × 506 + 2, so it's in [2]. −1 = 4 × (−1) + 3, so it's in [3]: indeed −1 − 3 = −4 is divisible by 4.</p>` },
      { q: `<p>These tasks must be done in an order respecting: <em>shop</em> before <em>cook</em>, <em>cook</em> before <em>eat</em>, <em>set table</em> before <em>eat</em>, <em>eat</em> before <em>wash dishes</em>. Give two different valid orders.</p>`, a: `<p>For example: shop, cook, set table, eat, wash dishes; or set table, shop, cook, eat, wash dishes. Setting the table isn't related to shopping or cooking, so it can go anywhere before eating. That freedom is what makes this a partial order rather than a total one.</p>` }
    ],
    sources: ["mcs", "levin", "bookofproof"]
  },
  {
    id: "u6",
    title: "Mathematical induction",
    minutes: 90,
    summary: "Prove infinitely many statements with a base case and an inductive step: worked examples with sums, inequalities and divisibility, strong induction, the link to recursion, and the classic mistakes.",
    notes: `
<p>Many statements in computer science are about <em>every</em> natural number: a formula holds for every <em>n</em>, a loop is correct after any number of passes, a recursive function works for inputs of every size. We can't check infinitely many cases one by one. <strong>Mathematical induction</strong> proves them all with two finite steps.</p>

<h3>The principle</h3>
<p>To prove a statement <em>P</em>(<em>n</em>) for every integer <em>n</em> ≥ <em>n</em>₀:</p>
<ol>
  <li><strong>Base case:</strong> prove <em>P</em>(<em>n</em>₀).</li>
  <li><strong>Inductive step:</strong> let <em>k</em> ≥ <em>n</em>₀ be arbitrary, assume <em>P</em>(<em>k</em>) is true (this assumption is the <strong>inductive hypothesis</strong>), and prove <em>P</em>(<em>k</em> + 1).</li>
</ol>
<p>Why does this work? The base case gives <em>P</em>(<em>n</em>₀). The inductive step, applied with <em>k</em> = <em>n</em>₀, turns that into <em>P</em>(<em>n</em>₀ + 1); applied again, into <em>P</em>(<em>n</em>₀ + 2); and so on forever. Think of an infinite line of dominoes: if the first falls, and each falling domino knocks over the next, they all fall.</p>
<p>A common worry: "Aren't we assuming what we want to prove?" No. We assume <em>P</em>(<em>k</em>) for one particular <em>k</em> and prove the <em>implication</em> <em>P</em>(<em>k</em>) → <em>P</em>(<em>k</em> + 1). We never assume <em>P</em>(<em>n</em>) for all <em>n</em>.</p>

<h3>Example 1: a sum formula</h3>
<p><strong>Claim.</strong> For all <em>n</em> ≥ 1, 1 + 2 + ⋯ + <em>n</em> = <em>n</em>(<em>n</em> + 1)/2.</p>
<p><strong>Proof.</strong> We use induction on <em>n</em>.</p>
<p><em>Base case</em> (<em>n</em> = 1): the left side is 1 and the right side is 1 · 2/2 = 1. They're equal.</p>
<p><em>Inductive step.</em> Let <em>k</em> ≥ 1 and assume 1 + 2 + ⋯ + <em>k</em> = <em>k</em>(<em>k</em> + 1)/2. We must show 1 + 2 + ⋯ + <em>k</em> + (<em>k</em> + 1) = (<em>k</em> + 1)(<em>k</em> + 2)/2. Starting from the left side:</p>
<table>
  <thead><tr><th>Step</th><th>Expression</th><th>Reason</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>(1 + 2 + ⋯ + <em>k</em>) + (<em>k</em> + 1)</td><td>Group the first <em>k</em> terms</td></tr>
    <tr><td>2</td><td><em>k</em>(<em>k</em> + 1)/2 + (<em>k</em> + 1)</td><td>Inductive hypothesis</td></tr>
    <tr><td>3</td><td><em>k</em>(<em>k</em> + 1)/2 + 2(<em>k</em> + 1)/2</td><td>Common denominator</td></tr>
    <tr><td>4</td><td>(<em>k</em> + 1)(<em>k</em> + 2)/2</td><td>Factor out (<em>k</em> + 1)</td></tr>
  </tbody>
</table>
<p>That's the right side for <em>n</em> = <em>k</em> + 1. By induction, the formula holds for all <em>n</em> ≥ 1. ∎</p>
<p>The key move, in almost every induction proof, is step 1: find the <em>k</em> case hiding inside the <em>k</em> + 1 case, so you can use the inductive hypothesis.</p>

<h3>A template</h3>
<p>Induction proofs follow the same shape every time. Use it until it becomes natural:</p>
<pre data-label="Template"><code>Claim. For all n ≥ n₀, P(n).
Proof. By induction on n.
Base case. [Check P(n₀) directly.]
Inductive step. Let k ≥ n₀ and assume P(k). [Inductive hypothesis.]
  We show P(k + 1). [Start from one side of P(k + 1),
  find P(k) inside it, apply the hypothesis, and finish.]
Therefore P(n) holds for all n ≥ n₀. ∎</code></pre>

<h3>Example 2: an inequality</h3>
<p><strong>Claim.</strong> For all <em>n</em> ≥ 4, 2<sup>n</sup> &lt; <em>n</em>!.</p>
<p>Check small cases first: 2⁴ = 16 &lt; 24 = 4!, but 2³ = 8 &gt; 6 = 3!. So the base case must be <em>n</em> = 4: induction can start anywhere, as long as the base case matches.</p>
<p><strong>Proof.</strong> <em>Base case</em> (<em>n</em> = 4): 16 &lt; 24. <em>Inductive step.</em> Let <em>k</em> ≥ 4 and assume 2<sup>k</sup> &lt; <em>k</em>!. Then 2<sup>k+1</sup> = 2 · 2<sup>k</sup> &lt; 2 · <em>k</em>! &lt; (<em>k</em> + 1) · <em>k</em>! = (<em>k</em> + 1)!, where the first inequality uses the hypothesis and the second uses 2 &lt; <em>k</em> + 1, which holds since <em>k</em> ≥ 4. ∎</p>
<p>This inequality matters in computer science: it says factorial growth beats exponential growth, so an algorithm that tries every ordering of <em>n</em> items (<em>n</em>! of them) is even slower than one that tries every subset (2<sup>n</sup>).</p>

<h3>Example 3: divisibility</h3>
<p><strong>Claim.</strong> For all <em>n</em> ≥ 0, 3 | (<em>n</em>³ − <em>n</em>).</p>
<p><strong>Proof.</strong> <em>Base case:</em> 0³ − 0 = 0, and 3 | 0. <em>Inductive step.</em> Assume 3 | (<em>k</em>³ − <em>k</em>). Expanding, (<em>k</em> + 1)³ − (<em>k</em> + 1) = <em>k</em>³ + 3<em>k</em>² + 3<em>k</em> + 1 − <em>k</em> − 1 = (<em>k</em>³ − <em>k</em>) + 3(<em>k</em>² + <em>k</em>). The first part is divisible by 3 by the hypothesis, and the second is 3 times an integer, so their sum is divisible by 3. ∎</p>

<h3>Strong induction</h3>
<p>Sometimes <em>P</em>(<em>k</em> + 1) depends not on <em>P</em>(<em>k</em>) but on some earlier case. In <strong>strong induction</strong>, the inductive hypothesis assumes <em>P</em>(<em>n</em>₀), <em>P</em>(<em>n</em>₀ + 1), …, <em>P</em>(<em>k</em>), all of them, to prove <em>P</em>(<em>k</em> + 1). It's no more powerful in principle, just more convenient.</p>
<p><strong>Claim.</strong> Every integer <em>n</em> ≥ 2 is a product of one or more primes.</p>
<p><strong>Proof.</strong> By strong induction. <em>Base case:</em> 2 is prime, so it's a product of one prime. <em>Inductive step.</em> Let <em>k</em> ≥ 2 and assume every integer from 2 to <em>k</em> is a product of primes. Consider <em>k</em> + 1. If it's prime, we're done. If not, <em>k</em> + 1 = <em>ab</em> with 2 ≤ <em>a</em>, <em>b</em> ≤ <em>k</em>. By the hypothesis, <em>a</em> and <em>b</em> are both products of primes, so their product <em>k</em> + 1 is too. ∎</p>
<p>Ordinary induction wouldn't work here: knowing about <em>k</em> tells us nothing about <em>k</em> + 1, since the factors <em>a</em> and <em>b</em> can be any smaller numbers.</p>
<p><strong>Claim.</strong> Every amount of postage of 12 cents or more can be made from 4-cent and 5-cent stamps.</p>
<p><strong>Proof.</strong> By strong induction, with four base cases: 12 = 4 + 4 + 4, 13 = 4 + 4 + 5, 14 = 4 + 5 + 5, and 15 = 5 + 5 + 5. <em>Inductive step:</em> for <em>k</em> + 1 ≥ 16, the amount (<em>k</em> + 1) − 4 is at least 12 and less than <em>k</em> + 1, so by the hypothesis it can be made; add one 4-cent stamp. ∎</p>
<p>We needed four base cases because the step reaches back four cents.</p>

<h3>Induction and recursion are the same idea</h3>
<p>A recursive function is correct if its base case returns the right answer and each recursive case returns the right answer <em>assuming the smaller calls do</em>. That is an induction proof, and the "recursive leap of faith" from CS 101 is the inductive hypothesis.</p>
<pre><code>def sum_to(n):
    if n == 0:
        return 0
    return n + sum_to(n - 1)</code></pre>
<p><strong>Claim.</strong> <code>sum_to(n)</code> returns <em>n</em>(<em>n</em> + 1)/2 for all <em>n</em> ≥ 0. <strong>Proof.</strong> <em>Base case:</em> <code>sum_to(0)</code> returns 0 = 0 · 1/2. <em>Inductive step:</em> assume <code>sum_to(k)</code> returns <em>k</em>(<em>k</em> + 1)/2. Then <code>sum_to(k + 1)</code> returns (<em>k</em> + 1) + <em>k</em>(<em>k</em> + 1)/2 = (<em>k</em> + 1)(<em>k</em> + 2)/2. ∎</p>
<p>Loop invariants work the same way: the invariant holding before the first pass is the base case, and each pass keeping it true is the inductive step.</p>

<h3>The classic false proof: all horses are the same color</h3>
<p>This famous "proof" (attributed to the mathematician George Pólya) is worth studying because it looks right.</p>
<p><em>Claim:</em> in any group of <em>n</em> ≥ 1 horses, all the horses have the same color. <em>Base case:</em> a group of one horse is all one color. <em>Inductive step:</em> assume any group of <em>k</em> horses is all one color, and take a group of <em>k</em> + 1 horses. Remove the first horse: the remaining <em>k</em> are all one color. Remove the last horse instead: those <em>k</em> are all one color too. The horses in the middle belong to both groups, so both groups have the same color, and all <em>k</em> + 1 horses match.</p>
<p><strong>Where it fails:</strong> the step from <em>k</em> = 1 to <em>k</em> + 1 = 2. With two horses, removing the first leaves {horse 2}, and removing the last leaves {horse 1}. There are no horses "in the middle", so nothing links the two colors. The inductive step must work for <em>every</em> <em>k</em> ≥ <em>n</em>₀, and this one silently fails for the smallest. Always check your inductive step at the smallest value of <em>k</em>.</p>

<h3>Common mistakes</h3>
<ul>
  <li><strong>Skipping the base case.</strong> Without it, you can "prove" false things. For example, if <em>n</em> = <em>n</em> + 1 were true for <em>k</em>, it would be true for <em>k</em> + 1; but it's never true, so there's nothing to start the chain.</li>
  <li><strong>Assuming <em>P</em>(<em>k</em> + 1)</strong> and working backward to something true.</li>
  <li><strong>Not using the inductive hypothesis.</strong> If your inductive step never uses <em>P</em>(<em>k</em>), either you don't need induction or something is wrong.</li>
  <li><strong>A step that fails for small <em>k</em></strong>, as with the horses.</li>
</ul>
`,
    terms: [
      ["Mathematical induction", "Proving P(n) for all n ≥ n₀ from a base case and an inductive step."],
      ["Base case", "The first value, checked directly."],
      ["Inductive hypothesis", "The assumption that P(k) holds, used to prove P(k + 1)."],
      ["Inductive step", "The proof that P(k) implies P(k + 1) for every k ≥ n₀."],
      ["Strong induction", "Induction in which the hypothesis assumes P holds for all values from n₀ up to k."],
      ["Well-ordering principle", "Every non-empty set of natural numbers has a least element; equivalent to induction."]
    ],
    quiz: [
      ...[{"q":"In the inductive step, what do you assume?","choices":["P(k + 1)","P(k) for an arbitrary k","P(n) for all n","Nothing"],"answer":1,"why":"You assume the statement for an arbitrary k and use it to show k + 1."},{"q":"Why does the \"all horses are the same color\" argument fail?","choices":["The base case is false","The step from k = 1 to k = 2 does not work","Horses are not numbers","It uses strong induction"],"answer":1,"why":"The argument relies on two overlapping groups. With two horses, the groups do not overlap."},{"q":"Which method fits \"every n ≥ 2 is a product of primes\" best?","choices":["Ordinary induction","Strong induction","Contradiction only","Truth tables"],"answer":1,"why":"The factors a and b can be any smaller numbers, not just n − 1."}],
      { q: "For which n is 2ⁿ < n! true, allowing the induction proof to start there?", choices: ["n ≥ 1", "n ≥ 3", "n ≥ 4", "n ≥ 10"], answer: 2, why: "2³ = 8 > 6 = 3!, but 2⁴ = 16 < 24 = 4!, and the inductive step works from there on." },
      { q: "To prove that every amount of 12 cents or more can be made from 4- and 5-cent stamps by \"subtract a 4-cent stamp\", how many base cases do you need?", choices: ["1", "2", "4", "5"], answer: 2, why: "The step reaches back 4 cents, so 12, 13, 14 and 15 must each be checked directly." }
    ],
    practice: [
      { q: `<p>Prove by induction: for all <em>n</em> ≥ 1, 1 + 3 + 5 + ⋯ + (2<em>n</em> − 1) = <em>n</em>². (The sum of the first <em>n</em> odd numbers is a perfect square.)</p>`, a: `<p><strong>Base case</strong> (<em>n</em> = 1): 1 = 1². <strong>Inductive step.</strong> Assume 1 + 3 + ⋯ + (2<em>k</em> − 1) = <em>k</em>². The next odd number is 2(<em>k</em> + 1) − 1 = 2<em>k</em> + 1. Then 1 + 3 + ⋯ + (2<em>k</em> − 1) + (2<em>k</em> + 1) = <em>k</em>² + 2<em>k</em> + 1 = (<em>k</em> + 1)². ∎</p>` },
      { q: `<p>Prove by induction: for all <em>n</em> ≥ 0, 1 + 2 + 4 + ⋯ + 2<sup>n</sup> = 2<sup>n+1</sup> − 1.</p>`, a: `<p><strong>Base case</strong> (<em>n</em> = 0): 1 = 2¹ − 1. <strong>Inductive step.</strong> Assume 1 + 2 + ⋯ + 2<sup>k</sup> = 2<sup>k+1</sup> − 1. Then adding the next term, 1 + 2 + ⋯ + 2<sup>k</sup> + 2<sup>k+1</sup> = (2<sup>k+1</sup> − 1) + 2<sup>k+1</sup> = 2 · 2<sup>k+1</sup> − 1 = 2<sup>k+2</sup> − 1. ∎</p><p>In binary: 111…1 (<em>n</em> + 1 ones) plus 1 is 1000…0. This is also why the Towers of Hanoi takes 2<sup>n</sup> − 1 moves.</p>` },
      { q: `<p>Prove by induction: for all <em>n</em> ≥ 1, 6 | (7<sup>n</sup> − 1).</p>`, hint: `<p>Write 7<sup>k+1</sup> − 1 as 7(7<sup>k</sup> − 1) + something.</p>`, a: `<p><strong>Base case:</strong> 7 − 1 = 6, and 6 | 6. <strong>Inductive step.</strong> Assume 7<sup>k</sup> − 1 = 6<em>m</em> for some integer <em>m</em>. Then 7<sup>k+1</sup> − 1 = 7 · 7<sup>k</sup> − 1 = 7(7<sup>k</sup> − 1) + 6 = 7 · 6<em>m</em> + 6 = 6(7<em>m</em> + 1). ∎</p>` },
      { q: `<p>Prove by induction: for all <em>n</em> ≥ 5, <em>n</em>² &lt; 2<sup>n</sup>. Why doesn't the claim hold for <em>n</em> = 4?</p>`, a: `<p>For <em>n</em> = 4, 16 = 16, which isn't strictly less. <strong>Base case</strong> (<em>n</em> = 5): 25 &lt; 32. <strong>Inductive step.</strong> Assume <em>k</em>² &lt; 2<sup>k</sup> with <em>k</em> ≥ 5. Then (<em>k</em> + 1)² = <em>k</em>² + 2<em>k</em> + 1. Since <em>k</em> ≥ 5, 2<em>k</em> + 1 &lt; <em>k</em>² (because <em>k</em>² − 2<em>k</em> − 1 = (<em>k</em> − 1)² − 2 ≥ 14 &gt; 0). So (<em>k</em> + 1)² &lt; 2<em>k</em>² &lt; 2 · 2<sup>k</sup> = 2<sup>k+1</sup>. ∎</p>` },
      { q: `<p>Use strong induction to prove that every amount of postage of 8 cents or more can be made with 3-cent and 5-cent stamps.</p>`, a: `<p><strong>Base cases:</strong> 8 = 3 + 5, 9 = 3 + 3 + 3, 10 = 5 + 5. <strong>Inductive step.</strong> Let <em>k</em> ≥ 10 and assume every amount from 8 to <em>k</em> can be made. Then (<em>k</em> + 1) − 3 is between 8 and <em>k</em>, so it can be made; add a 3-cent stamp. ∎</p><p>Three base cases are needed because the step reaches back 3 cents.</p>` },
      { q: `<p>Prove that this function returns 2<sup>n</sup> for every <em>n</em> ≥ 0.</p><pre><code>def pow2(n):
    if n == 0:
        return 1
    return 2 * pow2(n - 1)</code></pre>`, a: `<p><strong>Base case:</strong> <code>pow2(0)</code> returns 1 = 2⁰. <strong>Inductive step.</strong> Assume <code>pow2(k)</code> returns 2<sup>k</sup>. Then <code>pow2(k + 1)</code> returns <code>2 * pow2(k)</code> = 2 · 2<sup>k</sup> = 2<sup>k+1</sup>. By induction, <code>pow2(n)</code> returns 2<sup>n</sup> for all <em>n</em> ≥ 0. ∎</p>` },
      { q: `<p>Find the flaw in this "proof" that every positive integer is less than 10. <em>Inductive step:</em> assume <em>k</em> &lt; 10. Then … (the writer can't continue, so they give up and claim the base case <em>n</em> = 1 is enough because 1 &lt; 10).</p>`, a: `<p>There is no valid inductive step: from <em>k</em> &lt; 10 you can't conclude <em>k</em> + 1 &lt; 10 (take <em>k</em> = 9). A base case alone proves only that one case. Both parts of induction are required, and the inductive step must work for every <em>k</em> ≥ <em>n</em>₀, not just some.</p>` }
    ],
    sources: ["mcs", "levin", "bookofproof"]
  }
]);

CSA.addAsides("math120", {
  u1: [
    { kind: "history", title: "From Aristotle to Boole", html: `<p>Aristotle's syllogisms (about 350 BCE) were the standard account of logic for two thousand years. In 1847 and 1854 George Boole showed that logic could be done as algebra, with variables taking the values 1 and 0. In 1937 Claude Shannon's master's thesis showed that Boole's algebra describes electrical switching circuits. Every processor is built from that idea.</p>`, sources: ["sepboole", "boole", "shannon37"] },
    { kind: "lang", title: "How languages spell logic", html: `<p>Python uses the words <code>and</code>, <code>or</code>, <code>not</code>. C, Java, C++ and JavaScript use <code>&amp;&amp;</code>, <code>||</code> and <code>!</code>, a notation that comes from C. Few languages have an implication operator, so P → Q is written <code>not p or q</code>.</p>` },
    { kind: "practice", title: "SAT solvers", html: `<p>Deciding whether a formula is satisfiable is the SAT problem. No known algorithm solves it quickly in every case, yet modern SAT solvers handle industrial formulas with millions of variables. They are used to check chip designs, plan schedules and find bugs in software.</p>` }
  ],
  u2: [
    { kind: "history", title: "Frege invents quantifiers", html: `<p>Gottlob Frege's <em>Begriffsschrift</em> (1879) introduced quantified variables, giving logic the power to express mathematics. Modern ∀ and ∃ notation came later; ∃ was introduced by Giuseppe Peano and ∀ by Gerhard Gentzen in the 1930s.</p>` },
    { kind: "lang", title: "Quantifiers as queries", html: `<p>SQL is built on predicate logic. <code>SELECT name FROM students WHERE gpa &gt; 3.5</code> is set-builder notation. The <code>EXISTS</code> keyword is ∃ over the rows of a table.</p>` }
  ],
  u3: [
    { kind: "history", title: "Euclid's proof that there are infinitely many primes", html: `<p>Around 300 BCE Euclid argued: given any finite list of primes, multiply them and add 1. The result is not divisible by any prime on the list, so the list was incomplete. It is still one of the shortest and best-known proofs.</p>` },
    { kind: "practice", title: "Proofs about programs", html: `<p>The same techniques prove software correct. The seL4 operating system kernel was proved free of whole classes of bugs, with every step checked by computer. See the optional lesson on proof assistants.</p>`, sources: ["sel4"] }
  ],
  u4: [
    { kind: "history", title: "Cantor and Russell's paradox", html: `<p>Georg Cantor founded set theory in the 1870s and showed that some infinities are larger than others: there are more real numbers than integers. In 1901 Bertrand Russell asked about the set of all sets that do not contain themselves. Does it contain itself? Either answer is a contradiction. Mathematicians responded with axioms that restrict how sets can be formed, and type systems in programming languages descend partly from Russell's own fix, type theory.</p>`, sources: ["seprussell"] }
  ],
  u5: [
    { kind: "practice", title: "Equivalence and object equality", html: `<p>When you define <code>==</code> for your own class in Python (<code>__eq__</code>) or Java (<code>equals</code>), it should be an equivalence relation. Java's documentation requires it to be reflexive, symmetric and transitive. Breaking these properties causes subtle bugs in hash tables and sorting.</p>` }
  ],
  u6: [
    { kind: "history", title: "Early induction", html: `<p>Induction-style arguments appear in the work of al-Karaji (around 1000 CE) and Levi ben Gershon (1321). Blaise Pascal used the method clearly in 1654 in his treatise on the arithmetic triangle. The name "mathematical induction" came in the 19th century from Augustus De Morgan.</p>` }
  ]
});

CSA.addOptional("math120", [
  {
    id: "history",
    kind: "history",
    title: "From Boole to Shannon: how logic became hardware",
    minutes: 40,
    summary: "A century of ideas that turned the laws of thought into transistors, and a question about the limits of computation.",
    notes: `
<h3>1854: logic as algebra</h3>
<p>George Boole, a self-taught mathematician in Ireland, published <em>An Investigation of the Laws of Thought</em>. He treated "and" as multiplication and "or" as a kind of addition over the values 0 and 1. For decades this was seen as a curiosity of philosophy.</p>

<h3>1879–1931: logic as the foundation of mathematics</h3>
<p>Frege built a formal language strong enough to express arithmetic. Russell and Whitehead's <em>Principia Mathematica</em> (1910–1913) tried to derive all of mathematics from logic. David Hilbert asked for a mechanical procedure to decide whether any mathematical statement is provable. In 1931 Kurt Gödel showed that any consistent formal system strong enough for arithmetic contains true statements it cannot prove.</p>

<h3>1936: the limits of computation</h3>
<p>To answer Hilbert's question, Alan Turing defined an abstract machine that reads and writes symbols on a tape, and proved that no such machine can decide in general whether another machine halts. Alonzo Church reached the same conclusion with the lambda calculus. Their work defined what "computable" means, before electronic computers existed. You will study it in Theory of Computation in Year 3.</p>

<h3>1937: logic becomes circuits</h3>
<p>Claude Shannon, a 21-year-old master's student at MIT, noticed that relay circuits behave exactly like Boole's algebra: switches in series are ∧, switches in parallel are ∨. His thesis let engineers design circuits with algebra instead of trial and error. Within two decades, logic gates built from transistors became the building blocks of every computer.</p>

<h3>The thread</h3>
<p>The truth tables and equivalence laws in Unit 1 are the same mathematics used to design processors, simplify circuits and optimize compiler output. An idea developed to study human reasoning became the physical basis of computing.</p>
`,
    terms: [
      ["Boolean algebra", "Algebra over the values 0 and 1 with operations and, or and not."],
      ["Incompleteness", "Gödel's result that consistent, sufficiently strong systems contain unprovable truths."],
      ["Halting problem", "Deciding whether a program halts; Turing proved no general algorithm can."]
    ],
    quiz: [
      { q: "Whose 1937 thesis connected Boolean algebra to electrical circuits?", choices: ["Alan Turing", "Claude Shannon", "George Boole", "John von Neumann"], answer: 1, why: "Shannon's MIT master's thesis showed relay circuits obey Boole's algebra." },
      { q: "In Shannon's mapping, two switches in series correspond to:", choices: ["∨ (or)", "∧ (and)", "¬ (not)", "→ (implies)"], answer: 1, why: "Current flows through a series circuit only if both switches are closed." }
    ],
    sources: ["boole", "sepboole", "shannon37", "mcs"]
  },
  {
    id: "deep",
    kind: "deep",
    title: "Proof assistants and verified software",
    minutes: 40,
    summary: "When proofs get too big for people to check, computers check them. The story of how, from the Four Color Theorem to verified operating systems and AI that writes proofs.",
    notes: `
<p>A <strong>proof assistant</strong> is a program that checks every step of a proof against the rules of logic. If it accepts a proof, you only need to trust its small checking core, not the person who wrote the proof. This lesson follows how mathematicians, and then software engineers, came to rely on them.</p>

<h3>A proof nobody could check (1976)</h3>
<p>The <strong>Four Color Theorem</strong> says any map can be colored with four colors so that no two neighboring regions share a color. It was conjectured in 1852. In 1976 Kenneth Appel and Wolfgang Haken proved it by reducing the problem to nearly 2,000 special cases and having a computer check them all. It was the first major theorem proved with essential help from a computer, and many mathematicians were uneasy. No person could check every case by hand, so how could anyone be sure the program had no bugs?</p>
<p>The answer came almost thirty years later. In 2005 Georges Gonthier and Benjamin Werner wrote the entire proof, including the case checking, in the <strong>Coq</strong> proof assistant (renamed <strong>Rocq</strong> in 2025). Now the only thing you have to trust is Coq's small, carefully studied core.</p>

<h3>Ninety-nine percent sure (1998–2014)</h3>
<p>In 1998 Thomas Hales announced a proof of the <strong>Kepler conjecture</strong>, which says the familiar way grocers stack oranges is the densest way to pack spheres. Like the Four Color proof, it depended on massive computer calculations. After years of work, the referees said they were 99% certain it was correct, but could not be completely sure. Hales responded by launching a project called Flyspeck to verify the entire proof formally. A team of collaborators finished it in 2014.</p>

<h3>From math to software</h3>
<p>The same tools can prove that <em>programs</em> are correct. A proof needs two things: a <strong>specification</strong>, a precise statement of what the program must do, and a proof that the code meets it.</p>
<p><strong>CompCert</strong>, led by Xavier Leroy in France, is a C compiler with a proof in Coq that the machine code it produces behaves exactly like the source program. In 2011 a research team used an automatic testing tool to search widely used C compilers for bugs. They found hundreds in GCC and LLVM, but none in the verified parts of CompCert.</p>
<p><strong>seL4</strong> is an operating system kernel, the core of an operating system that controls access to memory and hardware. In 2009 a team in Australia completed a machine-checked proof that its C code matches its specification. That rules out whole classes of bugs, including the memory errors behind many security attacks. seL4 is now used in systems where security is critical, including research aircraft built for DARPA.</p>

<h3>Lean, Mathlib and AI</h3>
<p><strong>Lean</strong>, started by Leonardo de Moura at Microsoft Research in 2013, has become popular with mathematicians. Its community library, <strong>Mathlib</strong>, contains a large and growing share of undergraduate and research mathematics in checked form. In 2022 a team formally verified a difficult new result by the mathematician Peter Scholze, at his own request, because he wasn't fully sure of it himself. AI systems now also search for proofs in Lean. In 2024 DeepMind's AlphaProof, working alongside a companion system for geometry, reached silver-medal level on that year's International Mathematical Olympiad problems, and AlphaProof's solutions were checked by Lean. Pairing AI with a proof checker is attractive because the checker catches the AI's mistakes.</p>

<h3>What a formal proof looks like</h3>
<pre data-label="Lean 4"><code>-- For every natural number n, n + 0 = n
theorem add_zero_right (n : Nat) : n + 0 = n := by
  rfl   -- true by the definition of addition

-- For every n, 0 + n = n. This one needs induction.
theorem zero_add_left (n : Nat) : 0 + n = n := by
  induction n with
  | zero => rfl
  | succ k ih => exact congrArg Nat.succ ih   -- 0 + (k+1) is (0 + k) + 1</code></pre>
<p>The second proof is the same induction you learned in Unit 6: a base case (<code>zero</code>) and an inductive step (<code>succ k</code>) that uses the inductive hypothesis (<code>ih</code>).</p>

<p class="note"><strong>Why it matters:</strong> testing can show that bugs are present, but only proof can show that they are absent. Verification is still expensive, so it is used where failure is unacceptable: aircraft, cryptography, operating system kernels and chip designs. As AI writes more code, machine-checked proof may become one of the main ways to trust it.</p>
`,
    terms: [
      ["Proof assistant", "Software that checks formal proofs step by step."],
      ["Formal verification", "Mathematically proving that a system meets its specification."],
      ["Specification", "A precise statement of what a system must do."],
      ["Trusted core", "The small part of a proof assistant that must be correct for its checks to be trusted."]
    ],
    quiz: [
      { q: "What does a proof assistant do?", choices: ["Writes proofs automatically in all cases", "Checks each step of a proof against logical rules", "Runs test cases", "Translates English to code"], answer: 1, why: "Its job is checking. Some can also search for steps, but the guarantee comes from the checker." },
      { q: "Why were mathematicians uneasy about the 1976 Four Color proof?", choices: ["It used too few cases", "It relied on a computer check of nearly 2,000 cases that no person could verify by hand", "It was published anonymously", "It disproved the theorem"], answer: 1, why: "Trust rested on an unverified program. The 2005 Coq formalization removed that doubt." },
      { q: "What did the 2011 compiler-testing study find about CompCert?", choices: ["It had more bugs than GCC", "No bugs in its verified parts, while hundreds were found in GCC and LLVM", "It could not compile C", "It was slower than all other compilers"], answer: 1, why: "The verified parts held up because they had been proved correct, not just tested." },
      { q: "Why is pairing AI with a proof assistant attractive?", choices: ["The AI becomes faster", "The proof checker catches the AI's mistakes", "Proof assistants write the AI", "It removes the need for specifications"], answer: 1, why: "An AI can propose proofs freely, because anything wrong is rejected by the checker." }
    ],
    sources: ["sel4", "mcs"]
  }
]);
