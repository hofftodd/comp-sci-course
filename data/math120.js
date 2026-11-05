CSA.addCourse({
  id: "math120",
  code: "MATH 120",
  title: "Discrete Mathematics I",
  credits: 4,
  kind: "required",
  term: "y1f",
  summary: "The mathematics of computer science: logic, proof, sets, functions, relations and induction. You will learn to state claims precisely and prove them, which is how computer scientists know a program or an algorithm is correct.",
  prereqs: [],
  outcomes: [
    "Translate English statements into propositional and predicate logic",
    "Write direct, contrapositive, contradiction and case proofs",
    "Work with sets, functions and relations and their properties",
    "Prove statements about integers and programs by induction",
    "Read and write mathematical notation fluently"
  ],
  units: [
    {
      id: "u1",
      title: "Propositional logic",
      minutes: 60,
      summary: "Propositions, connectives, truth tables, and logical equivalence.",
      notes: `
<p>A <strong>proposition</strong> is a statement that is either true or false. "7 is prime" is a proposition. "Close the door" is not.</p>

<h3>Connectives</h3>
<table>
  <thead><tr><th>Symbol</th><th>Name</th><th>Read as</th><th>True when</th></tr></thead>
  <tbody>
    <tr><td>¬P</td><td>negation</td><td>not P</td><td>P is false</td></tr>
    <tr><td>P ∧ Q</td><td>conjunction</td><td>P and Q</td><td>both are true</td></tr>
    <tr><td>P ∨ Q</td><td>disjunction</td><td>P or Q</td><td>at least one is true</td></tr>
    <tr><td>P → Q</td><td>implication</td><td>if P then Q</td><td>P is false, or Q is true</td></tr>
    <tr><td>P ↔ Q</td><td>biconditional</td><td>P if and only if Q</td><td>P and Q have the same value</td></tr>
  </tbody>
</table>

<h3>Implication is the tricky one</h3>
<p>P → Q is false in exactly one case: P true and Q false. If P is false, the implication is <em>vacuously true</em>. Think of it as a promise: "If it rains, I'll bring an umbrella" is only broken if it rains and I don't.</p>
<table>
  <thead><tr><th>P</th><th>Q</th><th>P → Q</th></tr></thead>
  <tbody>
    <tr><td>T</td><td>T</td><td>T</td></tr>
    <tr><td>T</td><td>F</td><td>F</td></tr>
    <tr><td>F</td><td>T</td><td>T</td></tr>
    <tr><td>F</td><td>F</td><td>T</td></tr>
  </tbody>
</table>
<p>Related forms of P → Q:</p>
<ul>
  <li><strong>Contrapositive</strong> ¬Q → ¬P is <em>equivalent</em> to the original.</li>
  <li><strong>Converse</strong> Q → P is <em>not</em> equivalent.</li>
  <li><strong>Inverse</strong> ¬P → ¬Q is <em>not</em> equivalent (it is the contrapositive of the converse).</li>
</ul>

<h3>Equivalence laws</h3>
<p>Two formulas are <strong>logically equivalent</strong> (≡) if they have the same truth value for every assignment. The most used laws:</p>
<ul>
  <li>De Morgan: ¬(P ∧ Q) ≡ ¬P ∨ ¬Q, and ¬(P ∨ Q) ≡ ¬P ∧ ¬Q</li>
  <li>Implication: P → Q ≡ ¬P ∨ Q</li>
  <li>Distribution: P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R)</li>
  <li>Double negation: ¬¬P ≡ P</li>
</ul>
<p>A formula true under every assignment is a <strong>tautology</strong>; one true under none is a <strong>contradiction</strong>; one true under at least one is <strong>satisfiable</strong>.</p>

<h3>Checking by brute force</h3>
<p>With n variables there are 2<sup>n</sup> rows, so a computer can check any small equivalence:</p>
<div class="multi">
<pre data-lang="python"><code>from itertools import product

def equivalent(f, g, n):
    return all(f(*v) == g(*v) for v in product([True, False], repeat=n))

# De Morgan's law
equivalent(lambda p, q: not (p and q),
           lambda p, q: (not p) or (not q), 2)   # True</code></pre>
<pre data-lang="java"><code>boolean ok = true;
for (boolean p : new boolean[]{true, false})
    for (boolean q : new boolean[]{true, false})
        if (!(p &amp;&amp; q) != (!p || !q)) ok = false;
System.out.println(ok);   // true  (De Morgan's law)</code></pre>
<pre data-lang="cpp"><code>bool ok = true;
for (bool p : {true, false})
    for (bool q : {true, false})
        if (!(p &amp;&amp; q) != (!p || !q)) ok = false;
std::cout &lt;&lt; std::boolalpha &lt;&lt; ok &lt;&lt; "\\n";   // true</code></pre>
</div>
<div class="callout"><strong>In code.</strong> De Morgan's laws let you simplify conditions: <code>not (done or failed)</code> is the same as <code>not done and not failed</code>.</div>
`,
      terms: [
        ["Proposition", "A statement that is true or false."],
        ["Contrapositive", "¬Q → ¬P; equivalent to P → Q."],
        ["Converse", "Q → P; not equivalent to P → Q."],
        ["Tautology", "A formula true under every assignment."],
        ["Satisfiable", "True under at least one assignment."]
      ],
      quiz: [
        { q: "When is P → Q false?", choices: ["P false, Q true", "P true, Q false", "Both false", "Both true"], answer: 1, why: "An implication only fails when the hypothesis holds and the conclusion does not." },
        { q: "Which is equivalent to \"If it is a square, then it is a rectangle\"?", choices: ["If it is a rectangle, it is a square", "If it is not a square, it is not a rectangle", "If it is not a rectangle, it is not a square", "It is a square and a rectangle"], answer: 2, why: "That is the contrapositive, which is always equivalent. The first is the converse and the second the inverse." },
        { q: "By De Morgan's law, ¬(P ∨ Q) is equivalent to:", choices: ["¬P ∨ ¬Q", "¬P ∧ ¬Q", "P ∧ Q", "¬P → Q"], answer: 1, why: "Negating an or gives the and of the negations." },
        { q: "How many rows does a truth table with 5 variables have?", choices: ["5", "10", "25", "32"], answer: 3, why: "Each variable doubles the rows: 2⁵ = 32." }
      ],
      sources: ["mcs", "forallx", "levin"]
    },
    {
      id: "u2",
      title: "Predicates and quantifiers",
      minutes: 60,
      summary: "Statements about many objects at once: ∀, ∃, nesting, and negation.",
      notes: `
<p>A <strong>predicate</strong> is a statement with variables, such as P(x): "x is even". It becomes a proposition once x has a value, or once it is <em>quantified</em>.</p>

<h3>The two quantifiers</h3>
<ul>
  <li><strong>Universal:</strong> ∀x P(x), "for every x, P(x)". To disprove it, one counterexample is enough.</li>
  <li><strong>Existential:</strong> ∃x P(x), "there is some x with P(x)". To prove it, one example is enough.</li>
</ul>
<p>Always state the <em>domain</em>, the set x ranges over. "∀x, x² ≥ x" is true over the integers but false over the reals (try x = ½).</p>

<h3>Negating quantifiers</h3>
<p>Negation flips each quantifier and pushes inward:</p>
<ul>
  <li>¬∀x P(x) ≡ ∃x ¬P(x): "not everyone passed" means "someone failed".</li>
  <li>¬∃x P(x) ≡ ∀x ¬P(x): "no one cheated" means "everyone did not cheat".</li>
</ul>

<h3>Order matters when nesting</h3>
<p>Over people, let L(x, y) mean "x loves y".</p>
<ul>
  <li>∀x ∃y L(x, y): everybody loves somebody (perhaps different people).</li>
  <li>∃y ∀x L(x, y): there is one person whom everybody loves.</li>
</ul>
<p>The second is much stronger. Swapping ∀ and ∃ changes the meaning.</p>

<h3>Translating English</h3>
<p>"Every student has taken some math course" becomes ∀s ∈ Students, ∃c ∈ MathCourses, Taken(s, c). Restricted domains like <em>∀s ∈ S</em> are shorthand: ∀s (s ∈ S → …), and ∃s (s ∈ S ∧ …). Note the → with ∀ and the ∧ with ∃; mixing these up is the most common translation error.</p>

<div class="callout"><strong>In code.</strong> Python's <code>all()</code> and <code>any()</code> are ∀ and ∃ over a finite collection: <code>all(x > 0 for x in xs)</code>. Negating <code>all</code> gives <code>any(not ...)</code>, exactly the rule above.</div>
`,
      terms: [
        ["Predicate", "A statement containing variables, which becomes true or false once they are given values."],
        ["Domain", "The set of values a quantified variable ranges over."],
        ["Counterexample", "A single case showing a universal statement is false."],
        ["Bound variable", "A variable attached to a quantifier."]
      ],
      quiz: [
        { q: "What is the negation of ∀x ∃y (x + y = 0)?", choices: ["∀x ∀y (x + y ≠ 0)", "∃x ∀y (x + y ≠ 0)", "∃x ∃y (x + y ≠ 0)", "∀x ∃y (x + y ≠ 0)"], answer: 1, why: "Flip each quantifier (∀→∃, ∃→∀) and negate the inner statement." },
        { q: "Over the integers, is ∃y ∀x (x < y) true?", choices: ["True", "False"], answer: 1, why: "It claims a single largest-bound integer exists. For any y, x = y is a counterexample." },
        { q: "Which correctly translates \"Some dog is friendly\"?", choices: ["∃x (Dog(x) → Friendly(x))", "∃x (Dog(x) ∧ Friendly(x))", "∀x (Dog(x) ∧ Friendly(x))", "∀x (Dog(x) → Friendly(x))"], answer: 1, why: "∃ pairs with ∧. With →, any non-dog would make the statement true." }
      ],
      sources: ["mcs", "forallx", "levin"]
    },
    {
      id: "u3",
      title: "Proof techniques",
      minutes: 75,
      summary: "Direct proof, contrapositive, contradiction, cases, and how to write a proof someone can follow.",
      notes: `
<p>A <strong>proof</strong> is a chain of reasoning that convinces a skeptical, careful reader that a statement is true. Each step follows from definitions, earlier results, or previous steps.</p>

<h3>Start from definitions</h3>
<p>Most early proofs are definitions unpacked. An integer n is <em>even</em> if n = 2k for some integer k, and <em>odd</em> if n = 2k + 1.</p>

<h3>Direct proof</h3>
<p><strong>Claim.</strong> If n is odd, then n² is odd.</p>
<p><strong>Proof.</strong> Suppose n is odd, so n = 2k + 1 for some integer k. Then n² = 4k² + 4k + 1 = 2(2k² + 2k) + 1. Since 2k² + 2k is an integer, n² is odd. ∎</p>

<h3>Proof by contrapositive</h3>
<p>To prove P → Q, prove ¬Q → ¬P instead. Useful when the negation gives you something concrete to work with.</p>
<p><strong>Claim.</strong> If n² is even, then n is even.</p>
<p><strong>Proof.</strong> We prove the contrapositive: if n is odd, then n² is odd. That is exactly the direct proof above. ∎</p>

<h3>Proof by contradiction</h3>
<p>Assume the statement is false and derive something impossible.</p>
<p><strong>Claim.</strong> √2 is irrational.</p>
<p><strong>Proof.</strong> Suppose √2 = a/b with integers a, b in lowest terms. Then 2b² = a², so a² is even, so a is even (previous claim). Write a = 2c. Then 2b² = 4c², so b² = 2c² and b is even. Both a and b are even, contradicting lowest terms. ∎</p>

<h3>Proof by cases</h3>
<p>Split into cases that cover every possibility and prove each. <strong>Claim:</strong> n² + n is even for every integer n. If n is even, both terms are even. If n is odd, both terms are odd and the sum of two odds is even. ∎</p>

<h3>Writing proofs well</h3>
<ul>
  <li>State what you assume and what you will show.</li>
  <li>Name the technique: "We prove the contrapositive."</li>
  <li>Use full sentences. Equations are part of sentences.</li>
  <li>Examples are not proofs of universal claims, but one counterexample is a disproof.</li>
</ul>
`,
      terms: [
        ["Direct proof", "Assume the hypothesis and derive the conclusion."],
        ["Contrapositive proof", "Prove ¬Q → ¬P to establish P → Q."],
        ["Proof by contradiction", "Assume the claim is false and derive an impossibility."],
        ["Lemma", "A smaller result proved to help prove a larger one."],
        ["∎", "End-of-proof marker (also written QED)."]
      ],
      quiz: [
        { q: "To prove \"if 3n + 2 is odd, then n is odd\", which method is most natural?", choices: ["Direct proof", "Contrapositive", "Checking examples", "Cases on 3n + 2"], answer: 1, why: "Assuming n is even gives n = 2k and 3n + 2 = 6k + 2 = 2(3k + 1), which is even. The contrapositive is immediate." },
        { q: "You checked a claim for n = 1 through 1,000,000 and it held every time. Have you proved it for all n?", choices: ["Yes", "No"], answer: 1, why: "Examples cannot prove a universal claim. Some conjectures fail only at enormous values." },
        { q: "In the proof that √2 is irrational, what is the contradiction?", choices: ["a = b", "√2 is negative", "a and b are both even though a/b is in lowest terms", "b = 0"], answer: 2, why: "We assumed lowest terms, then showed 2 divides both a and b." }
      ],
      sources: ["mcs", "bookofproof", "levin"]
    },
    {
      id: "u4",
      title: "Sets",
      minutes: 60,
      summary: "Set notation, operations, power sets, Cartesian products, and proving set identities.",
      notes: `
<p>A <strong>set</strong> is an unordered collection of distinct objects. {1, 2, 3} = {3, 1, 2} = {1, 1, 2, 3}.</p>

<h3>Notation</h3>
<ul>
  <li>x ∈ A: x is an element of A. ∅ is the empty set.</li>
  <li>Set-builder: {x ∈ ℤ : x &gt; 0} is the set of positive integers.</li>
  <li>A ⊆ B: every element of A is in B. A = B means A ⊆ B and B ⊆ A.</li>
  <li>Standard sets: ℕ (natural numbers), ℤ (integers), ℚ (rationals), ℝ (reals).</li>
</ul>

<h3>Operations</h3>
<table>
  <thead><tr><th>Operation</th><th>Notation</th><th>Elements</th><th>Python</th></tr></thead>
  <tbody>
    <tr><td>Union</td><td>A ∪ B</td><td>in A or B</td><td><code>a | b</code></td></tr>
    <tr><td>Intersection</td><td>A ∩ B</td><td>in A and B</td><td><code>a &amp; b</code></td></tr>
    <tr><td>Difference</td><td>A − B</td><td>in A, not in B</td><td><code>a - b</code></td></tr>
    <tr><td>Complement</td><td>Aᶜ</td><td>in the universe, not in A</td><td>(needs a universe)</td></tr>
    <tr><td>Cartesian product</td><td>A × B</td><td>ordered pairs (a, b)</td><td><code>itertools.product</code></td></tr>
  </tbody>
</table>
<p>The <strong>power set</strong> 𝒫(A) is the set of all subsets of A. If |A| = n then |𝒫(A)| = 2ⁿ, because each element is either in a subset or not. |A × B| = |A|·|B|.</p>

<h3>Proving set identities</h3>
<p>To prove A = B, show each is a subset of the other by "element chasing".</p>
<p><strong>Claim.</strong> A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C).</p>
<p><strong>Proof (⊆).</strong> Let x ∈ A ∩ (B ∪ C). Then x ∈ A, and x ∈ B or x ∈ C. If x ∈ B, then x ∈ A ∩ B. If x ∈ C, then x ∈ A ∩ C. Either way x is in the right side. The ⊇ direction is similar. ∎</p>
<p>Notice the proof mirrors the logical law P ∧ (Q ∨ R) ≡ (P ∧ Q) ∨ (P ∧ R). Set operations are logic in disguise.</p>
`,
      terms: [
        ["Set", "An unordered collection of distinct elements."],
        ["Subset", "A ⊆ B if every element of A is in B."],
        ["Power set", "The set of all subsets of a set."],
        ["Cartesian product", "The set of ordered pairs with one element from each set."],
        ["Cardinality", "The number of elements in a set, written |A|."]
      ],
      quiz: [
        { q: "If |A| = 4, how many subsets does A have?", choices: ["4", "8", "16", "24"], answer: 2, why: "2⁴ = 16, counting ∅ and A itself." },
        { q: "Is ∅ a subset of every set?", choices: ["Yes", "No"], answer: 0, why: "\"Every element of ∅ is in A\" is vacuously true, since ∅ has no elements." },
        { q: "If A = {1, 2} and B = {x, y, z}, what is |A × B|?", choices: ["5", "6", "8", "9"], answer: 1, why: "2 × 3 = 6 ordered pairs." }
      ],
      sources: ["mcs", "levin", "bookofproof"]
    },
    {
      id: "u5",
      title: "Functions and relations",
      minutes: 60,
      summary: "Injective, surjective and bijective functions, relations and their properties, equivalence classes.",
      notes: `
<h3>Functions</h3>
<p>A function f : A → B assigns to each element of the <em>domain</em> A exactly one element of the <em>codomain</em> B. The <em>range</em> (image) is the set of outputs actually reached.</p>
<ul>
  <li><strong>Injective</strong> (one-to-one): different inputs give different outputs. f(a₁) = f(a₂) implies a₁ = a₂.</li>
  <li><strong>Surjective</strong> (onto): every element of B is reached.</li>
  <li><strong>Bijective:</strong> both. A bijection has an inverse f⁻¹ : B → A.</li>
</ul>
<p>Examples over ℤ: f(n) = 2n is injective but not surjective (odd numbers are never reached). g(n) = n + 1 is a bijection. Over ℝ, h(x) = x² is neither.</p>
<p>For finite sets, an injection A → B requires |A| ≤ |B|. This is the <strong>pigeonhole principle</strong>: put 13 people in 12 birth months and two must share a month.</p>

<h3>Relations</h3>
<p>A <strong>relation</strong> R on a set A is any set of ordered pairs from A × A. Write a R b for (a, b) ∈ R. Important properties:</p>
<ul>
  <li><strong>Reflexive:</strong> a R a for all a.</li>
  <li><strong>Symmetric:</strong> a R b implies b R a.</li>
  <li><strong>Antisymmetric:</strong> a R b and b R a imply a = b.</li>
  <li><strong>Transitive:</strong> a R b and b R c imply a R c.</li>
</ul>
<p>An <strong>equivalence relation</strong> is reflexive, symmetric and transitive. It splits A into disjoint <em>equivalence classes</em>. Example: a ≡ b (mod 3) splits ℤ into three classes by remainder.</p>
<p>A <strong>partial order</strong> is reflexive, antisymmetric and transitive, such as ≤ on numbers or ⊆ on sets. Course prerequisites form a partial order, and a valid study plan is a <em>topological sort</em> of it.</p>

<div class="callout"><strong>In CS.</strong> Hash functions are deliberately not injective, so collisions must be handled. Database tables are relations, which is where "relational database" gets its name.</div>
`,
      terms: [
        ["Injective", "No two inputs share an output."],
        ["Surjective", "Every codomain element is an output."],
        ["Bijective", "Both injective and surjective; invertible."],
        ["Equivalence relation", "Reflexive, symmetric and transitive."],
        ["Pigeonhole principle", "If n items go into m < n boxes, some box holds two or more."]
      ],
      quiz: [
        { q: "f : ℤ → ℤ, f(n) = 3n. Which is true?", choices: ["Bijective", "Injective, not surjective", "Surjective, not injective", "Neither"], answer: 1, why: "Different n give different 3n, but 1 is never reached." },
        { q: "\"Has the same birthday as\" on a set of people is:", choices: ["A partial order", "An equivalence relation", "Neither", "A function"], answer: 1, why: "It is reflexive, symmetric and transitive. The classes are the groups of people sharing each birthday." },
        { q: "How many people guarantee that two share a birth month?", choices: ["12", "13", "24", "366"], answer: 1, why: "With 12 months, 13 people force a repeat by pigeonhole." }
      ],
      sources: ["mcs", "levin", "bookofproof"]
    },
    {
      id: "u6",
      title: "Mathematical induction",
      minutes: 75,
      summary: "Prove infinitely many statements with a base case and an inductive step; strong induction; induction and recursion.",
      notes: `
<p>Induction proves a statement P(n) for every natural number n ≥ n₀ in two steps:</p>
<ol>
  <li><strong>Base case:</strong> prove P(n₀).</li>
  <li><strong>Inductive step:</strong> assume P(k) for an arbitrary k ≥ n₀ (the <em>inductive hypothesis</em>) and prove P(k + 1).</li>
</ol>
<p>Like dominoes: the first falls, and each one knocks over the next, so all fall.</p>

<h3>Example</h3>
<p><strong>Claim.</strong> For all n ≥ 1, 1 + 2 + … + n = n(n + 1)/2.</p>
<p><strong>Base case.</strong> n = 1: the left side is 1 and the right is 1·2/2 = 1.</p>
<p><strong>Inductive step.</strong> Assume 1 + … + k = k(k + 1)/2. Then</p>
<p class="math">1 + … + k + (k + 1) = k(k + 1)/2 + (k + 1) = (k + 1)(k + 2)/2,</p>
<p>which is the formula for n = k + 1. ∎</p>

<h3>Strong induction</h3>
<p>Sometimes P(k + 1) needs more than P(k). In <strong>strong induction</strong> you assume P(n₀), …, P(k) all hold.</p>
<p><strong>Claim.</strong> Every integer n ≥ 2 is a product of primes. If n is prime, done. Otherwise n = ab with 2 ≤ a, b &lt; n, and by the strong hypothesis both a and b are products of primes, so n is too. ∎</p>

<h3>Induction and recursion are the same idea</h3>
<p>A recursive function is correct if its base case is correct and each recursive case is correct assuming the smaller calls are. That is an induction proof. In CS 101, the "leap of faith" is the inductive hypothesis.</p>
<pre><code>def sum_to(n):
    return 0 if n == 0 else n + sum_to(n - 1)
# Claim: sum_to(n) == n(n+1)/2 for all n ≥ 0.  Proof: induction on n.</code></pre>

<h3>Common mistakes</h3>
<ul>
  <li>Skipping the base case, which lets you "prove" false statements.</li>
  <li>Assuming what you want to prove (assuming P(k + 1)).</li>
  <li>An inductive step that silently fails for the smallest k, as in the famous false proof that all horses are the same color.</li>
</ul>
`,
      terms: [
        ["Base case", "The first value for which the statement is checked directly."],
        ["Inductive hypothesis", "The assumption that P(k) holds, used to prove P(k + 1)."],
        ["Strong induction", "Assuming P holds for all values up to k."],
        ["Well-ordering principle", "Every non-empty set of natural numbers has a least element; equivalent to induction."]
      ],
      quiz: [
        { q: "In the inductive step, what do you assume?", choices: ["P(k + 1)", "P(k) for an arbitrary k", "P(n) for all n", "Nothing"], answer: 1, why: "You assume the statement for an arbitrary k and use it to show k + 1." },
        { q: "Why does the \"all horses are the same color\" argument fail?", choices: ["The base case is false", "The step from k = 1 to k = 2 does not work", "Horses are not numbers", "It uses strong induction"], answer: 1, why: "The argument relies on two overlapping groups. With two horses, the groups do not overlap." },
        { q: "Which method fits \"every n ≥ 2 is a product of primes\" best?", choices: ["Ordinary induction", "Strong induction", "Contradiction only", "Truth tables"], answer: 1, why: "The factors a and b can be any smaller numbers, not just n − 1." }
      ],
      sources: ["mcs", "levin", "bookofproof"]
    }
  ]
});

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
