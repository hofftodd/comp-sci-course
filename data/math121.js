CSA.addCourse({
  id: "math121",
  code: "MATH 121",
  title: "Discrete Mathematics II",
  credits: 4,
  kind: "required",
  term: "y1s",
  summary: "Counting, recurrences, number theory and probability: the mathematics behind analyzing algorithms, cryptography, hashing and randomized programs. Builds directly on the proof techniques of MATH 120.",
  prereqs: ["MATH 120 Discrete Mathematics I"],
  outcomes: [
    "Count arrangements and selections with the sum and product rules, permutations, combinations and inclusion–exclusion",
    "Use the pigeonhole principle and combinatorial proofs",
    "Set up and solve recurrences, including those that describe recursive algorithms",
    "Compute with divisibility, greatest common divisors and modular arithmetic, and explain how RSA works",
    "Calculate probabilities, including conditional probabilities with Bayes' rule",
    "Use random variables, expectation and linearity of expectation to analyze programs"
  ],
  rubric: {
    criteriaFor: "problem sets and exams",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Weekly problem sets", weight: 30, desc: "Counting, computation and proof problems based on each lesson's practice set, with full written justifications." },
      { name: "Computational labs", weight: 10, desc: "Three short Python labs: checking a counting formula by brute force, implementing RSA with small primes, and simulating a probability puzzle to test your calculation." },
      { name: "Midterm exam", weight: 20, desc: "Counting, recurrences and number theory (lessons 1–4)." },
      { name: "Final exam", weight: 30, desc: "Cumulative, with emphasis on RSA, probability and expectation (lessons 5–7)." }
    ],
    criteria: [
      { name: "Correct method", desc: "Is the right tool used?", levels: [
        "Chooses an appropriate technique and states why it applies (e.g. order matters, events are independent).",
        "Appropriate technique, but the reason it applies isn't stated.",
        "A technique that applies only partly, such as counting ordered arrangements when order doesn't matter.",
        "No coherent method." ] },
      { name: "Justification", desc: "Is every step explained?", levels: [
        "Every step is justified; counting arguments say exactly what is being counted; proofs are complete.",
        "Valid, with one step needing more explanation.",
        "A significant gap, or an unexplained formula.",
        "A bare number or a list of equations." ] },
      { name: "Accuracy", desc: "Is the answer right?", levels: [
        "Correct, with a sanity check (a small case, an estimate, or a simulation).",
        "A minor arithmetic slip in a correct approach.",
        "Several errors, or an answer that fails an obvious sanity check (a probability above 1).",
        "Incorrect." ] },
      { name: "Communication", desc: "Can a reader follow it?", levels: [
        "Defines variables and events, writes in full sentences, and states the final answer clearly.",
        "Mostly clear.",
        "The reader must reconstruct what was meant.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Collaboration:</b> work on problem sets together, but write your solutions alone and list who you worked with.",
      "<b>AI assistants and calculators:</b> allowed for explanations and for checking answers. Show your reasoning: an answer without a counting argument or proof earns little credit.",
      "<b>Late work:</b> two late days for the term on problem sets and labs.",
      "<b>Sanity checks:</b> a short check of your answer on a small case, which you can do by hand or with a few lines of Python, is encouraged and rewarded under Accuracy."
    ]
  }
});

CSA.addUnits("math121", [
  {
    id: "d1",
    title: "Counting: rules, permutations and combinations",
    minutes: 90,
    summary: "The sum and product rules, counting strings and passwords, permutations, combinations, and choosing the right model by asking whether order and repetition matter.",
    notes: `
<p>How many passwords can a user choose? How many ways can a sorting algorithm's input be arranged? How many test cases cover every combination of options? Counting questions come up constantly in computer science, and getting them right requires more care than you might expect. This lesson gives you a small set of rules and a habit of asking two questions about every problem.</p>

<h3>The sum rule</h3>
<p>If a task can be done in one of <em>m</em> ways <strong>or</strong> one of <em>n</em> other ways, with no overlap, then it can be done in <em>m + n</em> ways. A student choosing one elective from 5 math courses or 7 CS courses has 12 choices. In set terms: if <em>A</em> and <em>B</em> are disjoint finite sets, |<em>A</em> ∪ <em>B</em>| = |<em>A</em>| + |<em>B</em>|.</p>

<h3>The product rule</h3>
<p>If a task is a sequence of steps, with <em>m</em> ways to do the first step <strong>and then</strong> <em>n</em> ways to do the second (whatever happened in the first), then the task can be done in <em>m · n</em> ways. In set terms, |<em>A</em> × <em>B</em>| = |<em>A</em>| · |<em>B</em>|.</p>
<ul>
  <li>A license plate with 3 letters then 4 digits: 26³ · 10⁴ = 175,760,000.</li>
  <li>Bit strings of length <em>n</em>: 2 choices for each of <em>n</em> positions, so 2<sup><em>n</em></sup>. That's why an <em>n</em>-bit integer has 2<sup><em>n</em></sup> possible values.</li>
  <li>Subsets of an <em>n</em>-element set: for each element, decide in or out, so 2<sup><em>n</em></sup>. (The bit string records the decisions.)</li>
  <li>Functions from a set of size <em>m</em> to a set of size <em>n</em>: each of the <em>m</em> inputs picks one of <em>n</em> outputs, so <em>n<sup>m</sup></em>.</li>
</ul>

<h3>Combining the rules</h3>
<p>A password is 6 to 8 characters, each an uppercase letter or a digit, with at least one digit. Count passwords of each length separately (sum rule). For length 6: all strings over 36 characters, minus those with no digit: 36⁶ − 26⁶. Counting the complement, "everything minus the bad ones", is often far easier than counting directly. In total:</p>
<p class="math">(36⁶ − 26⁶) + (36⁷ − 26⁷) + (36⁸ − 26⁸) ≈ 2.68 × 10¹²</p>
<p>That sounds like a lot, but a password-cracking computer testing ten billion guesses a second tries them all in under five minutes. Counting is how security engineers reason about such attacks.</p>

<h3>Permutations</h3>
<p>A <strong>permutation</strong> of a set is an ordering of all its elements. By the product rule, <em>n</em> objects can be ordered in <em>n</em> · (<em>n</em> − 1) · … · 1 = <em>n</em>! ways: <em>n</em> choices for the first position, <em>n</em> − 1 for the second, and so on. 10! = 3,628,800; 52! (shuffles of a deck of cards) is about 8 × 10⁶⁷.</p>
<p>An <strong><em>r</em>-permutation</strong> is an ordered arrangement of <em>r</em> of the <em>n</em> objects:</p>
<p class="math">P(<em>n</em>, <em>r</em>) = <em>n</em>(<em>n</em> − 1)⋯(<em>n</em> − <em>r</em> + 1) = <em>n</em>! / (<em>n</em> − <em>r</em>)!</p>
<p>Gold, silver and bronze among 8 runners: P(8, 3) = 8 · 7 · 6 = 336.</p>

<h3>Combinations</h3>
<p>A <strong>combination</strong> is a selection where order doesn't matter: a <em>subset</em>. Choosing a committee of 3 from 8 people: every committee corresponds to exactly 3! = 6 ordered podiums, so there are 336 / 6 = 56 committees. In general:</p>
<p class="math">C(<em>n</em>, <em>r</em>) = (<em>n</em> choose <em>r</em>) = <em>n</em>! / (<em>r</em>! (<em>n</em> − <em>r</em>)!)</p>
<p>The idea behind the formula is worth remembering more than the formula: <strong>count ordered arrangements, then divide by the number of orderings of each group</strong>, because each unordered group was counted that many times. This is the <em>division rule</em>.</p>
<p>Examples: 5-card poker hands, C(52, 5) = 2,598,960. Bit strings of length 10 with exactly three 1s: choose which 3 positions hold the 1s, C(10, 3) = 120. Note the symmetry C(<em>n</em>, <em>r</em>) = C(<em>n</em>, <em>n</em> − <em>r</em>): choosing the 3 people on the committee is the same as choosing the 5 who aren't.</p>

<h3>Repetition allowed</h3>
<p>Ordered selections with repetition are just the product rule: <em>n<sup>r</sup></em>. Unordered selections with repetition are trickier. How many ways can you pick 10 donuts from 3 kinds, if you only care how many of each kind? This is the number of solutions of <em>x</em>₁ + <em>x</em>₂ + <em>x</em>₃ = 10 in non-negative integers. Picture the donuts as 10 stars and use 2 bars to separate the kinds:</p>
<p class="math">★★★ | ★★★★★ | ★★  means 3 of kind 1, 5 of kind 2, 2 of kind 3.</p>
<p>Every arrangement of 10 stars and 2 bars gives a different selection, and vice versa, so the answer is the number of ways to place 2 bars among 12 positions: C(12, 2) = 66. In general, choosing <em>r</em> items from <em>n</em> kinds with repetition gives C(<em>n</em> + <em>r</em> − 1, <em>r</em>). This method is called <strong>stars and bars</strong>.</p>

<h3>The two questions</h3>
<p>Almost every counting problem fits one of four models. Before calculating, ask: <strong>does order matter?</strong> and <strong>is repetition allowed?</strong></p>
<table>
  <thead><tr><th></th><th>Repetition not allowed</th><th>Repetition allowed</th></tr></thead>
  <tbody>
    <tr><td><strong>Order matters</strong></td><td>P(<em>n</em>, <em>r</em>) = <em>n</em>!/(<em>n</em> − <em>r</em>)!<br><span class="muted">race podiums, seating</span></td><td><em>n<sup>r</sup></em><br><span class="muted">passwords, bit strings</span></td></tr>
    <tr><td><strong>Order doesn't matter</strong></td><td>C(<em>n</em>, <em>r</em>)<br><span class="muted">committees, poker hands</span></td><td>C(<em>n</em> + <em>r</em> − 1, <em>r</em>)<br><span class="muted">donuts, multisets</span></td></tr>
  </tbody>
</table>
<p>The most common mistake is counting ordered arrangements when order doesn't matter, which overcounts. A good defense is to test your reasoning on a case small enough to list by hand, or to check it with a few lines of Python:</p>
<pre><code>from itertools import permutations, combinations, product, combinations_with_replacement
len(list(permutations(range(8), 3)))                 # 336
len(list(combinations(range(8), 3)))                 # 56
len(list(combinations_with_replacement("abc", 10)))  # 66</code></pre>

<h3>Counting anagrams: permutations with repeated items</h3>
<p>How many different strings can be made from the letters of BANANA? If all six letters were different there would be 6! orderings. But swapping the three A's among themselves gives the same string, as does swapping the two N's. By the division rule, 6! / (3! · 2! · 1!) = 60.</p>
`,
    terms: [
      ["Sum rule", "If choices fall into disjoint cases, add the counts of the cases."],
      ["Product rule", "If a task is a sequence of steps, multiply the number of ways to do each step."],
      ["Permutation", "An ordering of objects; there are n! orderings of n distinct objects."],
      ["r-permutation P(n, r)", "An ordered arrangement of r of n distinct objects: n!/(n − r)!."],
      ["Combination C(n, r)", "An unordered selection (subset) of r of n objects: n!/(r!(n − r)!)."],
      ["Division rule", "If every outcome you want was counted exactly k times, divide by k."],
      ["Stars and bars", "Counting unordered selections with repetition: C(n + r − 1, r)."]
    ],
    quiz: [
      { q: "How many 8-bit strings are there?", choices: ["8", "16", "64", "256"], answer: 3, why: "Two choices per bit, eight bits: 2⁸ = 256." },
      { q: "A club of 10 people elects a president, a secretary and a treasurer (different people). How many outcomes?", choices: ["C(10, 3) = 120", "P(10, 3) = 720", "10³ = 1000", "3! = 6"], answer: 1, why: "The roles are different, so order matters, and no one holds two roles." },
      { q: "The same club picks 3 people to attend a conference. How many outcomes?", choices: ["120", "720", "1000", "30"], answer: 0, why: "Now order doesn't matter: 720 / 3! = 120." },
      { q: "How many distinct arrangements of the letters in LEVEL?", choices: ["120", "30", "60", "20"], answer: 1, why: "5!/(2! · 2! · 1!) = 30: two L's and two E's." },
      { q: "How many ways to choose 6 bagels from 4 kinds, repetition allowed, order irrelevant?", choices: ["C(9, 6) = 84", "4⁶ = 4096", "C(6, 4) = 15", "C(10, 6) = 210"], answer: 0, why: "Stars and bars: C(4 + 6 − 1, 6) = C(9, 6) = 84." }
    ],
    practice: [
      { q: `<p>How many 4-digit PINs (0000 to 9999) have no repeated digit? How many have at least one repeated digit?</p>`, a: `<p>No repeats: P(10, 4) = 10 · 9 · 8 · 7 = 5040. At least one repeat: the complement, 10⁴ − 5040 = 4960.</p>` },
      { q: `<p>A pizza place offers 12 toppings. How many different pizzas have exactly 3 different toppings? How many have any number of toppings, from none to all 12?</p>`, a: `<p>Exactly 3: C(12, 3) = 220, since the order toppings are listed doesn't matter. Any number: each topping is on or off, so 2¹² = 4096 (including the plain pizza).</p>` },
      { q: `<p>How many 8-bit strings have exactly three 1s? At least one 1? Exactly as many 0s as 1s?</p>`, a: `<p>Exactly three 1s: C(8, 3) = 56. At least one 1: 2⁸ − 1 = 255 (all strings minus 00000000). Equal numbers: four 1s, C(8, 4) = 70.</p>` },
      { q: `<p>How many non-negative integer solutions does <em>x</em>₁ + <em>x</em>₂ + <em>x</em>₃ + <em>x</em>₄ = 7 have? What if every <em>x<sub>i</sub></em> must be at least 1?</p>`, a: `<p>Stars and bars with 7 stars and 3 bars: C(10, 3) = 120. If each is at least 1, give each variable 1 first, leaving 3 to distribute freely: C(3 + 3, 3) = C(6, 3) = 20.</p>` },
      { q: `<p>Explain the mistake: "To count 5-card hands with at least one ace, choose an ace (4 ways), then any 4 of the remaining 51 cards (C(51, 4) ways): 4 · C(51, 4)."</p>`, a: `<p>Hands with two or more aces are counted more than once: the hand A♠ A♥ 2 3 4 is counted once when A♠ is "the chosen ace" and once when A♥ is. Count the complement instead: C(52, 5) − C(48, 5) = 2,598,960 − 1,712,304 = 886,656.</p>` },
      { q: `<p>Write a Python function that counts the strings in a list of all length-6 passwords over uppercase letters and digits with at least one digit, but for length 3 so it runs quickly, and compare it with the formula 36³ − 26³.</p>`, a: `<pre><code>from itertools import product
import string
chars = string.ascii_uppercase + string.digits
count = sum(1 for p in product(chars, repeat=3) if any(c.isdigit() for c in p))
print(count, 36**3 - 26**3)   # 29080 29080</code></pre>` }
    ],
    sources: ["mcs", "levin", "keller"]
  },
  {
    id: "d2",
    title: "Binomial coefficients, pigeonholes and inclusion–exclusion",
    minutes: 90,
    summary: "Pascal's triangle and the binomial theorem, combinatorial proofs, the pigeonhole principle and its surprising consequences, and inclusion–exclusion for overlapping sets.",
    notes: `
<p>Last lesson's rules count simple situations. This lesson adds three tools for harder ones: identities about binomial coefficients (and a way to prove them by counting), the pigeonhole principle for proving that something <em>must</em> exist, and inclusion–exclusion for counting overlapping sets.</p>

<h3>Pascal's triangle</h3>
<p>Arrange the numbers C(<em>n</em>, <em>k</em>) in rows, with row <em>n</em> holding C(<em>n</em>, 0) through C(<em>n</em>, <em>n</em>):</p>
<figure class="fig">
<svg viewBox="0 0 360 170" role="img" aria-label="Pascal's triangle, rows 0 to 5: 1; 1 1; 1 2 1; 1 3 3 1; 1 4 6 4 1; 1 5 10 10 5 1. The 6 in row 4 is highlighted as the sum of the two 3s above it.">
  <g class="code" text-anchor="middle">
    <text x="180" y="20">1</text>
    <text x="160" y="45">1</text><text x="200" y="45">1</text>
    <text x="140" y="70">1</text><text x="180" y="70">2</text><text x="220" y="70">1</text>
    <text x="120" y="95">1</text><text x="160" y="95" class="em">3</text><text x="200" y="95" class="em">3</text><text x="240" y="95">1</text>
    <text x="100" y="120">1</text><text x="140" y="120">4</text><text x="180" y="120" class="em">6</text><text x="220" y="120">4</text><text x="260" y="120">1</text>
    <text x="80" y="145">1</text><text x="120" y="145">5</text><text x="160" y="145">10</text><text x="200" y="145">10</text><text x="240" y="145">5</text><text x="280" y="145">1</text>
  </g>
  <line x1="165" y1="100" x2="176" y2="110" class="ln dash"/><line x1="195" y1="100" x2="184" y2="110" class="ln dash"/>
  <text x="300" y="20" class="m">row 0</text><text x="300" y="120" class="m">row 4</text>
</svg>
<figcaption>Pascal's triangle. Each number is the sum of the two above it: C(4, 2) = C(3, 1) + C(3, 2) = 3 + 3 = 6.</figcaption>
</figure>
<p>Each entry is the sum of the two above it. That's <strong>Pascal's identity</strong>:</p>
<p class="math">C(<em>n</em>, <em>k</em>) = C(<em>n</em> − 1, <em>k</em> − 1) + C(<em>n</em> − 1, <em>k</em>)</p>

<h3>Combinatorial proof</h3>
<p>You could prove Pascal's identity with factorial algebra, but there's a more illuminating way: show that both sides count the same set. A <strong>combinatorial proof</strong> (or "double counting") answers one counting question in two different ways; since both answers count the same thing, they must be equal.</p>
<p><strong>Proof of Pascal's identity.</strong> Count the <em>k</em>-element subsets of {1, …, <em>n</em>}. Directly, there are C(<em>n</em>, <em>k</em>). Alternatively, split them by whether they contain the element <em>n</em>. Those that do must choose their other <em>k</em> − 1 elements from {1, …, <em>n</em> − 1}: C(<em>n</em> − 1, <em>k</em> − 1) ways. Those that don't choose all <em>k</em> from {1, …, <em>n</em> − 1}: C(<em>n</em> − 1, <em>k</em>) ways. By the sum rule the two counts are equal. ∎</p>
<p>Another: the sum of row <em>n</em> is 2<sup><em>n</em></sup>, because both count all subsets of an <em>n</em>-element set, once grouped by size and once by the in-or-out rule.</p>
<p>Pascal's identity is also a recursive algorithm, and a classic example of why memoization (CS 102, Lesson 5) matters: computed naively, C(<em>n</em>, <em>k</em>) makes exponentially many calls; building the triangle row by row takes O(<em>n</em>²).</p>

<h3>The binomial theorem</h3>
<p class="math">(<em>x</em> + <em>y</em>)<sup><em>n</em></sup> = Σ<sub><em>k</em>=0</sub><sup><em>n</em></sup> C(<em>n</em>, <em>k</em>) <em>x</em><sup><em>n</em>−<em>k</em></sup> <em>y</em><sup><em>k</em></sup></p>
<p><strong>Why:</strong> expanding (<em>x</em> + <em>y</em>)(<em>x</em> + <em>y</em>)⋯(<em>x</em> + <em>y</em>) means choosing <em>x</em> or <em>y</em> from each of the <em>n</em> factors. The term <em>x</em><sup><em>n</em>−<em>k</em></sup><em>y</em><sup><em>k</em></sup> appears once for each way of choosing which <em>k</em> factors supply a <em>y</em>: C(<em>n</em>, <em>k</em>) times. That's why C(<em>n</em>, <em>k</em>) is called a <strong>binomial coefficient</strong>. For example, (<em>x</em> + <em>y</em>)⁴ = <em>x</em>⁴ + 4<em>x</em>³<em>y</em> + 6<em>x</em>²<em>y</em>² + 4<em>xy</em>³ + <em>y</em>⁴, reading off row 4. Setting <em>x</em> = <em>y</em> = 1 gives the row sum 2<sup><em>n</em></sup> again.</p>

<h3>The pigeonhole principle</h3>
<p>If more than <em>n</em> pigeons fly into <em>n</em> holes, some hole gets at least two pigeons. More generally, if <em>N</em> objects go into <em>k</em> boxes, some box gets at least ⌈<em>N</em>/<em>k</em>⌉ objects. It sounds too obvious to be useful, but it proves things exist without finding them:</p>
<ul>
  <li>Among 367 people, two share a birthday (there are at most 366 birthdays).</li>
  <li>Among any 5 integers, two leave the same remainder when divided by 4.</li>
  <li><strong>No lossless compression algorithm can shrink every file.</strong> There are 2<sup><em>n</em></sup> files of exactly <em>n</em> bits but only 2<sup><em>n</em></sup> − 1 files shorter than <em>n</em> bits. If every <em>n</em>-bit file were compressed to something shorter, two would compress to the same output, and decompression couldn't tell them apart.</li>
  <li><strong>Hash functions have collisions.</strong> A hash function mapping arbitrary strings to 64-bit values maps infinitely many inputs into 2⁶⁴ boxes, so many inputs share each hash value. Hash tables must handle collisions; they can't avoid them.</li>
</ul>
<p>A subtler example: in any sequence of 10 distinct integers, there's an increasing or decreasing subsequence of length 4 (the Erdős–Szekeres theorem says any sequence of <em>n</em>² + 1 distinct numbers has a monotone subsequence of length <em>n</em> + 1). Pigeonhole arguments often hinge on choosing clever "holes".</p>

<h3>Inclusion–exclusion</h3>
<p>The sum rule needs disjoint sets. When sets overlap, adding their sizes counts the overlap twice, so subtract it:</p>
<p class="math">|<em>A</em> ∪ <em>B</em>| = |<em>A</em>| + |<em>B</em>| − |<em>A</em> ∩ <em>B</em>|</p>
<p>For three sets, subtracting the pairwise overlaps removes the triple overlap three times after adding it three times, so add it back:</p>
<p class="math">|<em>A</em> ∪ <em>B</em> ∪ <em>C</em>| = |<em>A</em>| + |<em>B</em>| + |<em>C</em>| − |<em>A</em>∩<em>B</em>| − |<em>A</em>∩<em>C</em>| − |<em>B</em>∩<em>C</em>| + |<em>A</em>∩<em>B</em>∩<em>C</em>|</p>
<p><strong>Example.</strong> How many integers from 1 to 100 are divisible by 2, 3 or 5? Let <em>A</em>, <em>B</em>, <em>C</em> be the multiples of 2, 3, 5. |<em>A</em>| = 50, |<em>B</em>| = 33, |<em>C</em>| = 20. Multiples of both 2 and 3 are multiples of 6: 16; of 10: 10; of 15: 6; of 30: 3. Total: 50 + 33 + 20 − 16 − 10 − 6 + 3 = 74. So 26 numbers from 1 to 100 are divisible by none of them.</p>
<p>The pattern continues for any number of sets: add the singles, subtract the pairs, add the triples, and so on, alternating.</p>
`,
    terms: [
      ["Binomial coefficient", "C(n, k), the number of k-element subsets of an n-element set; the coefficients in (x + y)ⁿ."],
      ["Pascal's identity", "C(n, k) = C(n − 1, k − 1) + C(n − 1, k)."],
      ["Combinatorial proof", "Proving an identity by showing both sides count the same set."],
      ["Pigeonhole principle", "If N objects go into k boxes, some box holds at least ⌈N/k⌉ objects."],
      ["Inclusion–exclusion", "Counting a union of overlapping sets by alternately adding and subtracting intersections."]
    ],
    quiz: [
      { q: "What is the coefficient of <em>x</em>²<em>y</em>³ in (<em>x</em> + <em>y</em>)⁵?", choices: ["5", "10", "20", "32"], answer: 1, why: "C(5, 3) = 10." },
      { q: "What is the sum of row 6 of Pascal's triangle?", choices: ["6", "36", "64", "720"], answer: 2, why: "2⁶ = 64: all subsets of a 6-element set." },
      { q: "How many people must be in a room to guarantee that at least 3 share a birth month?", choices: ["13", "24", "25", "36"], answer: 2, why: "With 24 people, each month could have exactly 2. With 25, ⌈25/12⌉ = 3." },
      { q: "In a class, 30 students take Python, 20 take Java and 8 take both. How many take at least one?", choices: ["50", "42", "58", "38"], answer: 1, why: "30 + 20 − 8 = 42." },
      { q: "Why must every hash function from strings to 32-bit integers have collisions?", choices: ["Hash functions are badly designed", "There are more possible strings than 32-bit values (pigeonhole)", "Strings can be empty", "Because of rounding"], answer: 1, why: "Infinitely many inputs, 2³² boxes." }
    ],
    practice: [
      { q: `<p>Expand (2<em>a</em> − <em>b</em>)⁴ using the binomial theorem.</p>`, a: `<p>With <em>x</em> = 2<em>a</em>, <em>y</em> = −<em>b</em>: 16<em>a</em>⁴ − 32<em>a</em>³<em>b</em> + 24<em>a</em>²<em>b</em>² − 8<em>ab</em>³ + <em>b</em>⁴. (Coefficients 1, 4, 6, 4, 1 times powers of 2 and alternating signs.)</p>` },
      { q: `<p>Give a combinatorial proof that C(<em>n</em>, <em>k</em>) = C(<em>n</em>, <em>n</em> − <em>k</em>).</p>`, a: `<p>Count the ways to split <em>n</em> people into a chosen group of <em>k</em> and an unchosen group of <em>n</em> − <em>k</em>. Choosing the <em>k</em> who are in determines the split: C(<em>n</em>, <em>k</em>) ways. Choosing the <em>n</em> − <em>k</em> who are out also determines it: C(<em>n</em>, <em>n</em> − <em>k</em>) ways. Both count the same splits, so they're equal. ∎</p>` },
      { q: `<p>Prove that among any 6 integers, two have a difference divisible by 5.</p>`, a: `<p>Each integer leaves one of 5 remainders (0 to 4) when divided by 5. Six integers into five remainder "boxes": by the pigeonhole principle, two have the same remainder <em>r</em>. Write them as 5<em>a</em> + <em>r</em> and 5<em>b</em> + <em>r</em>; their difference is 5(<em>a</em> − <em>b</em>), divisible by 5. ∎</p>` },
      { q: `<p>How many integers from 1 to 1000 are divisible by neither 3 nor 7?</p>`, a: `<p>Divisible by 3: 333. By 7: 142. By 21: 47. Divisible by 3 or 7: 333 + 142 − 47 = 428. Neither: 1000 − 428 = 572.</p>` },
      { q: `<p>How many bit strings of length 8 start with 1 or end with 00?</p>`, a: `<p>Start with 1: 2⁷ = 128. End with 00: 2⁶ = 64. Both: 2⁵ = 32. Total: 128 + 64 − 32 = 160.</p>` },
      { q: `<p>Write a Python function <code>binom(n, k)</code> using Pascal's identity with <code>@functools.cache</code>, and check it against <code>math.comb</code> for all <em>n</em> ≤ 30.</p>`, a: `<pre><code>import functools, math

@functools.cache
def binom(n, k):
    if k == 0 or k == n:
        return 1
    return binom(n - 1, k - 1) + binom(n - 1, k)

assert all(binom(n, k) == math.comb(n, k) for n in range(31) for k in range(n + 1))</code></pre><p>Without the cache, <code>binom(30, 15)</code> would make over 300 million calls.</p>` }
    ],
    sources: ["mcs", "levin", "keller"]
  },
  {
    id: "d3",
    title: "Recurrences",
    minutes: 90,
    summary: "Defining sequences recursively, modeling problems and algorithms with recurrences, solving them by unrolling and by the characteristic equation, and divide-and-conquer recurrences.",
    notes: `
<p>A recursive function calls itself on smaller inputs. A <strong>recurrence relation</strong> describes a sequence the same way: each term in terms of earlier terms. Recurrences are how computer scientists count recursive structures and measure recursive algorithms. This lesson shows how to set them up and how to find closed forms, formulas that give the <em>n</em>-th term directly.</p>

<h3>Setting up a recurrence</h3>
<p><strong>Towers of Hanoi.</strong> Let <em>T</em>(<em>n</em>) be the number of moves to move <em>n</em> disks. To move <em>n</em> disks, move the top <em>n</em> − 1 out of the way, move the largest disk, and move the <em>n</em> − 1 back on top:</p>
<p class="math"><em>T</em>(1) = 1,  <em>T</em>(<em>n</em>) = 2<em>T</em>(<em>n</em> − 1) + 1</p>
<p><strong>Bit strings with no two consecutive 1s.</strong> Let <em>a<sub>n</sub></em> count them. A valid string of length <em>n</em> either ends in 0, and anything valid of length <em>n</em> − 1 comes before it, or ends in 01 (a 1 must be preceded by 0), with anything valid of length <em>n</em> − 2 before that:</p>
<p class="math"><em>a</em>₁ = 2, <em>a</em>₂ = 3,  <em>a<sub>n</sub></em> = <em>a</em><sub><em>n</em>−1</sub> + <em>a</em><sub><em>n</em>−2</sub></p>
<p>That's the Fibonacci recurrence. The key step in both examples is the same as in writing a recursive function: <strong>split on what happens at one end</strong> (the largest disk, the last bit), and recognize the rest as a smaller instance of the same problem.</p>

<h3>Solving by unrolling</h3>
<p>Substitute the recurrence into itself until a pattern appears, then prove the pattern by induction:</p>
<p class="math"><em>T</em>(<em>n</em>) = 2<em>T</em>(<em>n</em>−1) + 1 = 4<em>T</em>(<em>n</em>−2) + 2 + 1 = 8<em>T</em>(<em>n</em>−3) + 4 + 2 + 1 = … = 2<sup><em>n</em>−1</sup><em>T</em>(1) + 2<sup><em>n</em>−2</sup> + … + 1 = 2<sup><em>n</em></sup> − 1</p>
<p><strong>Proof by induction</strong> that <em>T</em>(<em>n</em>) = 2<sup><em>n</em></sup> − 1. Base: <em>T</em>(1) = 1 = 2¹ − 1. Step: if <em>T</em>(<em>k</em>) = 2<sup><em>k</em></sup> − 1, then <em>T</em>(<em>k</em> + 1) = 2(2<sup><em>k</em></sup> − 1) + 1 = 2<sup><em>k</em>+1</sup> − 1. ∎ Moving 64 disks at one per second would take about 585 billion years.</p>

<h3>Linear homogeneous recurrences</h3>
<p>Recurrences of the form <em>a<sub>n</sub></em> = <em>c</em>₁<em>a</em><sub><em>n</em>−1</sub> + <em>c</em>₂<em>a</em><sub><em>n</em>−2</sub> have a recipe. Guess a solution of the form <em>a<sub>n</sub></em> = <em>r<sup>n</sup></em>. Substituting gives <em>r</em><sup><em>n</em></sup> = <em>c</em>₁<em>r</em><sup><em>n</em>−1</sup> + <em>c</em>₂<em>r</em><sup><em>n</em>−2</sup>; dividing by <em>r</em><sup><em>n</em>−2</sup> gives the <strong>characteristic equation</strong></p>
<p class="math"><em>r</em>² = <em>c</em>₁<em>r</em> + <em>c</em>₂</p>
<p>If it has two different roots <em>r</em>₁ and <em>r</em>₂, every solution has the form <em>a<sub>n</sub></em> = <em>A r</em>₁<sup><em>n</em></sup> + <em>B r</em>₂<sup><em>n</em></sup>, and the initial values determine <em>A</em> and <em>B</em>.</p>
<p><strong>Example.</strong> <em>a</em>₀ = 1, <em>a</em>₁ = 4, <em>a<sub>n</sub></em> = 5<em>a</em><sub><em>n</em>−1</sub> − 6<em>a</em><sub><em>n</em>−2</sub>. The characteristic equation <em>r</em>² − 5<em>r</em> + 6 = 0 has roots 2 and 3, so <em>a<sub>n</sub></em> = <em>A</em>·2<sup><em>n</em></sup> + <em>B</em>·3<sup><em>n</em></sup>. From <em>n</em> = 0: <em>A</em> + <em>B</em> = 1. From <em>n</em> = 1: 2<em>A</em> + 3<em>B</em> = 4. So <em>B</em> = 2, <em>A</em> = −1, and <em>a<sub>n</sub></em> = 2·3<sup><em>n</em></sup> − 2<sup><em>n</em></sup>. Check: <em>a</em>₂ = 5·4 − 6·1 = 14 and 2·9 − 4 = 14. ✓</p>
<p><strong>Fibonacci.</strong> <em>F<sub>n</sub></em> = <em>F</em><sub><em>n</em>−1</sub> + <em>F</em><sub><em>n</em>−2</sub> gives <em>r</em>² = <em>r</em> + 1, with roots φ = (1 + √5)/2 ≈ 1.618 (the golden ratio) and ψ = (1 − √5)/2 ≈ −0.618. With <em>F</em>₀ = 0, <em>F</em>₁ = 1, this yields <strong>Binet's formula</strong>, <em>F<sub>n</sub></em> = (φ<sup><em>n</em></sup> − ψ<sup><em>n</em></sup>)/√5. Since |ψ| &lt; 1, the second term shrinks to nothing: Fibonacci numbers grow like φ<sup><em>n</em></sup>. That's why the naive recursive <code>fib</code> from CS 101, whose number of calls satisfies a similar recurrence, takes exponential time.</p>
<p>(If the characteristic equation has a repeated root <em>r</em>, the general solution is (<em>A</em> + <em>Bn</em>)<em>r<sup>n</sup></em>. Recurrences with an extra term, like Hanoi's "+ 1", are <em>non-homogeneous</em>; unrolling or a guessed particular solution handles the common cases.)</p>

<h3>Divide-and-conquer recurrences</h3>
<p>Algorithms that split a problem into parts lead to recurrences in <em>n</em>/2 rather than <em>n</em> − 1:</p>
<ul>
  <li><strong>Binary search</strong> does one comparison and recurses on half: <em>T</em>(<em>n</em>) = <em>T</em>(<em>n</em>/2) + 1. Unrolling: halving <em>n</em> down to 1 takes log₂ <em>n</em> steps, so <em>T</em>(<em>n</em>) ≈ log₂ <em>n</em>.</li>
  <li><strong>Merge sort</strong> sorts two halves and merges them in linear time: <em>T</em>(<em>n</em>) = 2<em>T</em>(<em>n</em>/2) + <em>n</em>.</li>
</ul>
<figure class="fig">
<svg viewBox="0 0 440 190" role="img" aria-label="Recursion tree for merge sort: level 0 has one problem of size n, level 1 has two of size n/2, level 2 has four of size n/4, down to n problems of size 1. Each level does n work in total, and there are log2 n levels.">
  <rect x="160" y="10" width="120" height="26" class="box"/><text x="220" y="28" text-anchor="middle" class="code">n</text>
  <rect x="90" y="56" width="110" height="26" class="box"/><text x="145" y="74" text-anchor="middle" class="code">n/2</text>
  <rect x="240" y="56" width="110" height="26" class="box"/><text x="295" y="74" text-anchor="middle" class="code">n/2</text>
  <rect x="60" y="102" width="70" height="26" class="box soft"/><text x="95" y="120" text-anchor="middle" class="code">n/4</text>
  <rect x="150" y="102" width="70" height="26" class="box soft"/><text x="185" y="120" text-anchor="middle" class="code">n/4</text>
  <rect x="220" y="102" width="70" height="26" class="box soft"/><text x="255" y="120" text-anchor="middle" class="code">n/4</text>
  <rect x="310" y="102" width="70" height="26" class="box soft"/><text x="345" y="120" text-anchor="middle" class="code">n/4</text>
  <text x="220" y="152" text-anchor="middle" class="m">⋮</text>
  <text x="220" y="178" text-anchor="middle" class="code">1 1 1 1 1 1 … 1</text>
  <text x="392" y="28" class="m">n</text><text x="392" y="74" class="m">n</text><text x="392" y="120" class="m">n</text>
  <text x="392" y="178" class="m">n</text>
  <text x="392" y="10" class="m">work</text>
</svg>
<figcaption>Merge sort's recursion tree: log₂ n levels, each doing n work in total, so T(n) = n log₂ n.</figcaption>
</figure>
<p>The tree shows the solution: level <em>i</em> has 2<sup><em>i</em></sup> subproblems of size <em>n</em>/2<sup><em>i</em></sup>, so each level does <em>n</em> work in total, and there are log₂ <em>n</em> levels. <em>T</em>(<em>n</em>) = <em>n</em> log₂ <em>n</em> (for <em>n</em> a power of 2 and <em>T</em>(1) = 0). The general pattern <em>T</em>(<em>n</em>) = <em>aT</em>(<em>n</em>/<em>b</em>) + <em>f</em>(<em>n</em>) is solved by the <strong>master theorem</strong>, which you'll study in Algorithms. The idea is always this recursion tree: compare the work at the top with the number of leaves at the bottom.</p>
`,
    terms: [
      ["Recurrence relation", "An equation defining each term of a sequence from earlier terms, plus initial values."],
      ["Closed form", "A formula giving the n-th term directly, without earlier terms."],
      ["Unrolling", "Substituting a recurrence into itself repeatedly to find a pattern."],
      ["Characteristic equation", "For aₙ = c₁aₙ₋₁ + c₂aₙ₋₂, the equation r² = c₁r + c₂ whose roots give the solution."],
      ["Recursion tree", "A diagram of the subproblems of a recursive algorithm, used to add up its total work."]
    ],
    quiz: [
      { q: "What is the closed form of <em>T</em>(1) = 1, <em>T</em>(<em>n</em>) = 2<em>T</em>(<em>n</em>−1) + 1?", choices: ["2n − 1", "2ⁿ − 1", "n²", "2ⁿ"], answer: 1, why: "Unroll or check: 1, 3, 7, 15, …" },
      { q: "The characteristic equation of <em>a<sub>n</sub></em> = 6<em>a</em><sub><em>n</em>−1</sub> − 8<em>a</em><sub><em>n</em>−2</sub> has roots:", choices: ["2 and 4", "−2 and −4", "1 and 8", "6 and −8"], answer: 0, why: "r² − 6r + 8 = (r − 2)(r − 4)." },
      { q: "Binary search satisfies <em>T</em>(<em>n</em>) = <em>T</em>(<em>n</em>/2) + 1. Its solution grows like:", choices: ["n", "log n", "n log n", "2ⁿ"], answer: 1, why: "You can halve n only about log₂ n times." },
      { q: "In merge sort's recursion tree, how much total work does each level do?", choices: ["1", "log n", "n", "n²"], answer: 2, why: "2ⁱ subproblems of size n/2ⁱ, each doing linear work." },
      { q: "Why does naive recursive Fibonacci take exponential time?", choices: ["Python is slow", "Its number of calls satisfies a Fibonacci-like recurrence, which grows like φⁿ", "It uses floating point", "Recursion is always exponential"], answer: 1, why: "C(n) = C(n−1) + C(n−2) + 1 grows like the Fibonacci numbers themselves." }
    ],
    practice: [
      { q: `<p>Let <em>s<sub>n</sub></em> be the number of ways to climb <em>n</em> stairs taking 1 or 2 steps at a time. Find a recurrence and initial values, and compute <em>s</em>₁₀.</p>`, a: `<p>The last step is either a 1-step (from stair <em>n</em> − 1) or a 2-step (from stair <em>n</em> − 2): <em>s<sub>n</sub></em> = <em>s</em><sub><em>n</em>−1</sub> + <em>s</em><sub><em>n</em>−2</sub>, with <em>s</em>₁ = 1, <em>s</em>₂ = 2. Then 1, 2, 3, 5, 8, 13, 21, 34, 55, 89: <em>s</em>₁₀ = 89.</p>` },
      { q: `<p>Solve <em>a</em>₀ = 2, <em>a</em>₁ = 5, <em>a<sub>n</sub></em> = <em>a</em><sub><em>n</em>−1</sub> + 6<em>a</em><sub><em>n</em>−2</sub>.</p>`, a: `<p><em>r</em>² − <em>r</em> − 6 = (<em>r</em> − 3)(<em>r</em> + 2), so <em>a<sub>n</sub></em> = <em>A</em>·3<sup><em>n</em></sup> + <em>B</em>(−2)<sup><em>n</em></sup>. <em>A</em> + <em>B</em> = 2 and 3<em>A</em> − 2<em>B</em> = 5 give <em>A</em> = 9/5, <em>B</em> = 1/5: <em>a<sub>n</sub></em> = (9·3<sup><em>n</em></sup> + (−2)<sup><em>n</em></sup>)/5. Check: <em>a</em>₂ = 5 + 12 = 17 and (81 + 4)/5 = 17. ✓</p>` },
      { q: `<p>Unroll <em>T</em>(1) = 0, <em>T</em>(<em>n</em>) = <em>T</em>(<em>n</em> − 1) + <em>n</em> to find a closed form. Which algorithm from CS 101 has this recurrence?</p>`, a: `<p><em>T</em>(<em>n</em>) = <em>n</em> + (<em>n</em> − 1) + … + 2 = <em>n</em>(<em>n</em> + 1)/2 − 1, which is Θ(<em>n</em>²). Selection sort: find the minimum of <em>n</em> items with about <em>n</em> comparisons, then sort the remaining <em>n</em> − 1.</p>` },
      { q: `<p>Draw the recursion tree for <em>T</em>(<em>n</em>) = 2<em>T</em>(<em>n</em>/2) + 1 with <em>T</em>(1) = 1, and find <em>T</em>(<em>n</em>) for <em>n</em> a power of 2.</p>`, a: `<p>Level <em>i</em> has 2<sup><em>i</em></sup> nodes each doing 1 unit of work. Levels 0 through log₂ <em>n</em>: total 1 + 2 + 4 + … + <em>n</em> = 2<em>n</em> − 1. This is linear, Θ(<em>n</em>): for example, finding the maximum by splitting in half.</p>` },
      { q: `<p>Write a Python function that computes <em>a<sub>n</sub></em> from the recurrence 5<em>a</em><sub><em>n</em>−1</sub> − 6<em>a</em><sub><em>n</em>−2</sub> with a loop, and check it against 2·3<sup><em>n</em></sup> − 2<sup><em>n</em></sup> for <em>n</em> up to 50.</p>`, a: `<pre><code>def a(n):
    prev, cur = 1, 4          # a0, a1
    if n == 0:
        return prev
    for _ in range(n - 1):
        prev, cur = cur, 5 * cur - 6 * prev
    return cur

assert all(a(n) == 2 * 3**n - 2**n for n in range(51))</code></pre>` }
    ],
    sources: ["mcs", "levin"]
  },
  {
    id: "d4",
    title: "Number theory: divisibility and modular arithmetic",
    minutes: 90,
    summary: "Divisibility, primes and the fundamental theorem of arithmetic, the Euclidean algorithm, Bézout's identity, and arithmetic modulo n with its applications in computing.",
    notes: `
<p>Number theory, the study of the integers, was long thought of as the purest, least practical part of mathematics. Then it became the foundation of cryptography, and now it protects every secure web connection. It also explains hashing, checksums, random number generators, and why <code>%</code> appears so often in code.</p>

<h3>Divisibility and primes</h3>
<p>For integers <em>a</em> and <em>b</em> with <em>a</em> ≠ 0, <em>a</em> <strong>divides</strong> <em>b</em>, written <em>a</em> | <em>b</em>, if <em>b</em> = <em>ak</em> for some integer <em>k</em>. So 3 | 12 and 5 ∤ 12. Two properties used constantly: if <em>a</em> | <em>b</em> and <em>a</em> | <em>c</em>, then <em>a</em> | (<em>b</em> + <em>c</em>), and more generally <em>a</em> | (<em>sb</em> + <em>tc</em>) for any integers <em>s</em>, <em>t</em>.</p>
<p>The <strong>division algorithm</strong> (a theorem, despite its name): for any integer <em>a</em> and positive integer <em>d</em>, there are unique integers <em>q</em> and <em>r</em> with <em>a</em> = <em>dq</em> + <em>r</em> and 0 ≤ <em>r</em> &lt; <em>d</em>. In Python, <code>q, r = divmod(a, d)</code>, or <code>a // d</code> and <code>a % d</code>. (Python's <code>%</code> always returns a non-negative remainder for positive <em>d</em>, so <code>-7 % 3</code> is 2; C and Java return −1.)</p>
<p>An integer <em>p</em> &gt; 1 is <strong>prime</strong> if its only positive divisors are 1 and <em>p</em>. The <strong>fundamental theorem of arithmetic</strong> says every integer greater than 1 is a product of primes in exactly one way, apart from order: 360 = 2³ · 3² · 5. And there are infinitely many primes (Euclid's proof, in MATH 120).</p>

<h3>Greatest common divisors and the Euclidean algorithm</h3>
<p>The <strong>greatest common divisor</strong> gcd(<em>a</em>, <em>b</em>) is the largest integer dividing both. Factoring would find it, but factoring large numbers is very slow. Euclid's algorithm (about 300 BCE) is fast, and rests on one fact:</p>
<p class="math">gcd(<em>a</em>, <em>b</em>) = gcd(<em>b</em>, <em>a</em> mod <em>b</em>)</p>
<p><strong>Why:</strong> write <em>a</em> = <em>bq</em> + <em>r</em>. Any common divisor of <em>a</em> and <em>b</em> divides <em>r</em> = <em>a</em> − <em>bq</em>; any common divisor of <em>b</em> and <em>r</em> divides <em>a</em> = <em>bq</em> + <em>r</em>. So the two pairs have exactly the same common divisors, and the same greatest one.</p>
<pre><code>def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a</code></pre>
<p>Example, gcd(252, 105): 252 = 2·105 + 42; 105 = 2·42 + 21; 42 = 2·21 + 0. The answer is 21. The remainders shrink quickly (at least halving every two steps), so the algorithm takes O(log <em>n</em>) steps, even for numbers with hundreds of digits.</p>

<h3>Bézout's identity</h3>
<p>Running Euclid's algorithm backwards shows that the gcd is a combination of the two numbers: there are integers <em>s</em> and <em>t</em> with</p>
<p class="math">gcd(<em>a</em>, <em>b</em>) = <em>sa</em> + <em>tb</em></p>
<p>From the example: 21 = 105 − 2·42 = 105 − 2·(252 − 2·105) = 5·105 − 2·252. The <strong>extended Euclidean algorithm</strong> computes <em>s</em> and <em>t</em> along the way:</p>
<pre><code>def extended_gcd(a, b):
    """Return (g, s, t) with g = gcd(a, b) = s*a + t*b."""
    if b == 0:
        return a, 1, 0
    g, s, t = extended_gcd(b, a % b)
    return g, t, s - (a // b) * t

extended_gcd(252, 105)   # (21, -2, 5)</code></pre>
<p>This is the key to dividing in modular arithmetic, below, and to RSA in the next lesson.</p>

<h3>Modular arithmetic</h3>
<p>We say <em>a</em> is <strong>congruent</strong> to <em>b</em> modulo <em>n</em>, written <em>a</em> ≡ <em>b</em> (mod <em>n</em>), if <em>n</em> | (<em>a</em> − <em>b</em>): they leave the same remainder when divided by <em>n</em>. Clock arithmetic is mod 12: 9 o'clock plus 5 hours is 2 o'clock, since 14 ≡ 2 (mod 12). Congruence mod <em>n</em> is an equivalence relation, with <em>n</em> classes, one for each remainder 0 to <em>n</em> − 1.</p>
<p>The crucial fact is that congruences can be added and multiplied: if <em>a</em> ≡ <em>b</em> and <em>c</em> ≡ <em>d</em> (mod <em>n</em>), then <em>a</em> + <em>c</em> ≡ <em>b</em> + <em>d</em> and <em>ac</em> ≡ <em>bd</em> (mod <em>n</em>). So you can reduce at every step and keep numbers small. What's the last digit of 7²⁰²⁶? Work mod 10: 7¹ ≡ 7, 7² ≡ 9, 7³ ≡ 3, 7⁴ ≡ 1, and then the pattern repeats every 4. Since 2026 = 4·506 + 2, 7²⁰²⁶ ≡ 7² ≡ 9. The last digit is 9.</p>

<h3>Fast modular exponentiation</h3>
<p>Computing <em>a<sup>e</sup></em> mod <em>n</em> for a 600-digit <em>e</em> by multiplying <em>e</em> times is impossible. <strong>Repeated squaring</strong> uses the binary digits of <em>e</em>: <em>a</em>¹³ = <em>a</em>⁸ · <em>a</em>⁴ · <em>a</em>¹ (13 = 1101 in binary), and <em>a</em>², <em>a</em>⁴, <em>a</em>⁸ come from squaring repeatedly, reducing mod <em>n</em> each time:</p>
<pre><code>def power_mod(a, e, n):
    result = 1
    a %= n
    while e &gt; 0:
        if e % 2 == 1:          # this binary digit is 1
            result = result * a % n
        a = a * a % n           # square for the next digit
        e //= 2
    return result</code></pre>
<p>This needs only about 2 log₂ <em>e</em> multiplications. Python's built-in <code>pow(a, e, n)</code> does exactly this.</p>

<h3>Modular inverses</h3>
<p>Mod <em>n</em>, you can always add, subtract and multiply. Division is different. An <strong>inverse</strong> of <em>a</em> mod <em>n</em> is a number <em>a</em>⁻¹ with <em>a</em> · <em>a</em>⁻¹ ≡ 1 (mod <em>n</em>). For example, 3 · 5 = 15 ≡ 1 (mod 7), so 5 is the inverse of 3 mod 7. But 2 has no inverse mod 6: 2<em>x</em> is always even, and an even number can't be 1 more than a multiple of 6.</p>
<p><strong>Theorem.</strong> <em>a</em> has an inverse mod <em>n</em> if and only if gcd(<em>a</em>, <em>n</em>) = 1. <strong>Why:</strong> if gcd(<em>a</em>, <em>n</em>) = 1, Bézout gives <em>sa</em> + <em>tn</em> = 1, so <em>sa</em> ≡ 1 (mod <em>n</em>) and <em>s</em> is the inverse. The extended Euclidean algorithm finds it. (In Python 3.8 and later, <code>pow(a, -1, n)</code> computes it.) In particular, if <em>p</em> is prime, every number from 1 to <em>p</em> − 1 has an inverse mod <em>p</em>, so you can divide freely. Arithmetic mod a prime behaves like ordinary fractions, which is why primes are everywhere in cryptography and coding theory.</p>

<h3>Where you'll see this</h3>
<ul>
  <li><strong>Hash tables</strong> put a key in bucket <code>hash(key) % size</code>.</li>
  <li><strong>Check digits</strong>: ISBNs, credit card numbers (the Luhn algorithm) and bank account numbers include a digit computed mod 10 or 11, so most typing mistakes are detected.</li>
  <li><strong>Pseudo-random numbers</strong>: a linear congruential generator computes <em>x</em><sub><em>k</em>+1</sub> = (<em>ax<sub>k</sub></em> + <em>c</em>) mod <em>m</em>.</li>
  <li><strong>Fixed-width integers</strong> in C and Java are arithmetic mod 2³² or 2⁶⁴, which is why they "overflow" and wrap around.</li>
</ul>
`,
    terms: [
      ["Divides (a | b)", "b = ak for some integer k."],
      ["Prime", "An integer greater than 1 whose only positive divisors are 1 and itself."],
      ["gcd(a, b)", "The greatest integer dividing both a and b."],
      ["Euclidean algorithm", "Computes gcd(a, b) by repeatedly replacing (a, b) with (b, a mod b)."],
      ["Bézout's identity", "gcd(a, b) = sa + tb for some integers s and t."],
      ["Congruence a ≡ b (mod n)", "n divides a − b: a and b leave the same remainder mod n."],
      ["Modular inverse", "A number a⁻¹ with a·a⁻¹ ≡ 1 (mod n); exists exactly when gcd(a, n) = 1."]
    ],
    quiz: [
      { q: "What is gcd(84, 36)?", choices: ["6", "12", "4", "36"], answer: 1, why: "84 = 2·36 + 12; 36 = 3·12 + 0." },
      { q: "What is 17 mod 5, and −17 mod 5 (as Python computes it)?", choices: ["2 and −2", "2 and 3", "3 and 2", "2 and 2"], answer: 1, why: "17 = 3·5 + 2; −17 = −4·5 + 3." },
      { q: "Which number has an inverse modulo 12?", choices: ["4", "6", "7", "9"], answer: 2, why: "gcd(7, 12) = 1; the others share a factor with 12. (7·7 = 49 ≡ 1.)" },
      { q: "What is the last digit of 3¹⁰⁰?", choices: ["1", "3", "7", "9"], answer: 0, why: "Powers of 3 mod 10 cycle 3, 9, 7, 1; 100 is a multiple of 4." },
      { q: "About how many multiplications does repeated squaring need to compute <em>a</em><sup>1,000,000</sup> mod <em>n</em>?", choices: ["About 40", "About 1,000", "About 1,000,000", "About 20"], answer: 0, why: "Around 2 log₂(10⁶) ≈ 40." }
    ],
    practice: [
      { q: `<p>Use the Euclidean algorithm to find gcd(1071, 462), then find integers <em>s</em>, <em>t</em> with 1071<em>s</em> + 462<em>t</em> = gcd.</p>`, a: `<p>1071 = 2·462 + 147; 462 = 3·147 + 21; 147 = 7·21 + 0. gcd = 21. Backwards: 21 = 462 − 3·147 = 462 − 3·(1071 − 2·462) = 7·462 − 3·1071. So <em>s</em> = −3, <em>t</em> = 7.</p>` },
      { q: `<p>Find the inverse of 7 modulo 26, and use it to solve 7<em>x</em> ≡ 3 (mod 26).</p>`, a: `<p>26 = 3·7 + 5; 7 = 1·5 + 2; 5 = 2·2 + 1. Backwards: 1 = 5 − 2·2 = 5 − 2(7 − 5) = 3·5 − 2·7 = 3(26 − 3·7) − 2·7 = 3·26 − 11·7. So 7⁻¹ ≡ −11 ≡ 15 (mod 26). Check: 7·15 = 105 = 4·26 + 1. ✓ Then <em>x</em> ≡ 15·3 = 45 ≡ 19 (mod 26).</p>` },
      { q: `<p>Prove: if <em>a</em> ≡ <em>b</em> (mod <em>n</em>) and <em>c</em> ≡ <em>d</em> (mod <em>n</em>), then <em>ac</em> ≡ <em>bd</em> (mod <em>n</em>).</p>`, a: `<p>Write <em>a</em> = <em>b</em> + <em>kn</em> and <em>c</em> = <em>d</em> + <em>ln</em>. Then <em>ac</em> = <em>bd</em> + <em>bln</em> + <em>dkn</em> + <em>kln</em>² = <em>bd</em> + <em>n</em>(<em>bl</em> + <em>dk</em> + <em>kln</em>). So <em>n</em> | (<em>ac</em> − <em>bd</em>). ∎</p>` },
      { q: `<p>Compute 5¹¹⁷ mod 19 by repeated squaring, showing the powers 5, 5², 5⁴, …</p>`, a: `<p>117 = 64 + 32 + 16 + 4 + 1. Mod 19: 5¹ = 5, 5² = 25 ≡ 6, 5⁴ ≡ 36 ≡ 17, 5⁸ ≡ 289 ≡ 4, 5¹⁶ ≡ 16, 5³² ≡ 256 ≡ 9, 5⁶⁴ ≡ 81 ≡ 5. Product: 5·9·16·17·5. Step by step: 5·9 = 45 ≡ 7; 7·16 = 112 ≡ 17; 17·17 = 289 ≡ 4; 4·5 = 20 ≡ 1. So 5¹¹⁷ ≡ 1 (mod 19). Check in Python: <code>pow(5, 117, 19)</code>.</p>` },
      { q: `<p>Show that 2 has no inverse modulo 10 directly, by listing 2<em>x</em> mod 10 for <em>x</em> = 0 to 9. Which numbers from 1 to 9 do have inverses mod 10?</p>`, a: `<p>2<em>x</em> mod 10 gives 0, 2, 4, 6, 8, 0, 2, 4, 6, 8: never 1. The numbers coprime to 10 have inverses: 1 (itself), 3 (7), 7 (3), 9 (9).</p>` }
    ],
    sources: ["mcs", "levin"]
  }
]);

CSA.addUnits("math121", [
  {
    id: "d5",
    title: "Fermat, Euler and RSA",
    minutes: 90,
    summary: "Fermat's little theorem and Euler's theorem, the idea of public-key cryptography, how RSA works and why it's correct, and what makes it secure.",
    notes: `
<p>For most of history, sending a secret message required the sender and receiver to share a secret key beforehand. In 1976 Whitfield Diffie and Martin Hellman proposed something that sounded impossible: a system in which anyone can encrypt a message to you using information you publish openly, but only you can decrypt it. A year later Ron Rivest, Adi Shamir and Leonard Adleman found a way to do it using the number theory of the last lesson. RSA, named for them, was for decades the most widely used public-key system. This lesson builds it completely.</p>

<h3>Fermat's little theorem</h3>
<p><strong>Theorem (Fermat, 1640).</strong> If <em>p</em> is prime and <em>p</em> ∤ <em>a</em>, then <em>a</em><sup><em>p</em>−1</sup> ≡ 1 (mod <em>p</em>).</p>
<p>Check with <em>p</em> = 7, <em>a</em> = 3: 3⁶ = 729 = 104·7 + 1. ✓</p>
<p><strong>Proof.</strong> Consider the numbers <em>a</em>, 2<em>a</em>, 3<em>a</em>, …, (<em>p</em> − 1)<em>a</em> mod <em>p</em>. None is 0, since <em>p</em> is prime and divides neither <em>a</em> nor any of 1, …, <em>p</em> − 1. No two are equal: if <em>ia</em> ≡ <em>ja</em>, multiply by <em>a</em>⁻¹ (which exists, as gcd(<em>a</em>, <em>p</em>) = 1) to get <em>i</em> ≡ <em>j</em>. So these <em>p</em> − 1 numbers are just 1, 2, …, <em>p</em> − 1 in some order. Multiply them all together:</p>
<p class="math"><em>a</em><sup><em>p</em>−1</sup> · (<em>p</em> − 1)! ≡ (<em>p</em> − 1)! (mod <em>p</em>)</p>
<p>(<em>p</em> − 1)! is coprime to <em>p</em>, so cancel it by multiplying by its inverse: <em>a</em><sup><em>p</em>−1</sup> ≡ 1. ∎</p>
<p>A use: 3¹⁰⁰ mod 7. Since 3⁶ ≡ 1, reduce the exponent mod 6: 100 = 6·16 + 4, so 3¹⁰⁰ ≡ 3⁴ = 81 ≡ 4 (mod 7).</p>

<h3>Euler's theorem</h3>
<p>Euler generalized Fermat's theorem to any modulus. <strong>Euler's totient</strong> φ(<em>n</em>) counts the integers from 1 to <em>n</em> that are coprime to <em>n</em>. For a prime, φ(<em>p</em>) = <em>p</em> − 1. For a product of two different primes, φ(<em>pq</em>) = (<em>p</em> − 1)(<em>q</em> − 1): of the <em>pq</em> numbers, the <em>q</em> multiples of <em>p</em> and the <em>p</em> multiples of <em>q</em> aren't coprime, and <em>pq</em> itself was counted twice, so φ = <em>pq</em> − <em>p</em> − <em>q</em> + 1 (inclusion–exclusion again).</p>
<p><strong>Theorem (Euler, 1763).</strong> If gcd(<em>a</em>, <em>n</em>) = 1, then <em>a</em><sup>φ(<em>n</em>)</sup> ≡ 1 (mod <em>n</em>). The proof is the same as Fermat's, using only the φ(<em>n</em>) numbers coprime to <em>n</em>.</p>

<h3>Public-key cryptography</h3>
<p>Each person has two keys: a <strong>public key</strong>, published for anyone, used to encrypt; and a <strong>private key</strong>, kept secret, used to decrypt. It must be easy to compute the public key from the private key, but infeasible to go the other way. RSA's one-way function is multiplication: multiplying two 1000-digit primes takes a computer microseconds, but no known method can factor their product in less than an astronomical time.</p>

<h3>RSA, step by step</h3>
<p><strong>Key generation</strong> (done once, by the receiver):</p>
<ol>
  <li>Choose two large random primes <em>p</em> and <em>q</em> (in practice, over 300 digits each).</li>
  <li>Compute <em>n</em> = <em>pq</em> and φ(<em>n</em>) = (<em>p</em> − 1)(<em>q</em> − 1).</li>
  <li>Choose <em>e</em> with gcd(<em>e</em>, φ(<em>n</em>)) = 1. (65537 is the usual choice.)</li>
  <li>Compute <em>d</em> = <em>e</em>⁻¹ mod φ(<em>n</em>) with the extended Euclidean algorithm.</li>
  <li>Publish (<em>n</em>, <em>e</em>). Keep <em>d</em> secret, and discard <em>p</em>, <em>q</em> and φ(<em>n</em>).</li>
</ol>
<p><strong>Encryption</strong> of a message <em>m</em> (a number with 0 ≤ <em>m</em> &lt; <em>n</em>): <em>c</em> = <em>m<sup>e</sup></em> mod <em>n</em>.</p>
<p><strong>Decryption</strong>: <em>m</em> = <em>c<sup>d</sup></em> mod <em>n</em>.</p>
<h4>A worked example with small numbers</h4>
<p><em>p</em> = 61, <em>q</em> = 53, so <em>n</em> = 3233 and φ(<em>n</em>) = 60 · 52 = 3120. Choose <em>e</em> = 17 (gcd(17, 3120) = 1). The inverse of 17 mod 3120 is <em>d</em> = 2753; check: 17 · 2753 = 46801 = 15 · 3120 + 1. ✓ To encrypt <em>m</em> = 65: <em>c</em> = 65¹⁷ mod 3233 = 2790. To decrypt: 2790²⁷⁵³ mod 3233 = 65. ✓</p>
<pre><code>p, q, e = 61, 53, 17
n, phi = p * q, (p - 1) * (q - 1)
d = pow(e, -1, phi)          # 2753
c = pow(65, e, n)            # 2790
assert pow(c, d, n) == 65</code></pre>

<h3>Why decryption works</h3>
<p>We need <em>m<sup>ed</sup></em> ≡ <em>m</em> (mod <em>n</em>). Since <em>ed</em> ≡ 1 (mod φ(<em>n</em>)), we can write <em>ed</em> = 1 + <em>k</em>φ(<em>n</em>). If gcd(<em>m</em>, <em>n</em>) = 1, Euler's theorem gives</p>
<p class="math"><em>m<sup>ed</sup></em> = <em>m</em> · (<em>m</em><sup>φ(<em>n</em>)</sup>)<sup><em>k</em></sup> ≡ <em>m</em> · 1<sup><em>k</em></sup> = <em>m</em> (mod <em>n</em>)</p>
<p>(The rare case where <em>m</em> shares a factor with <em>n</em> also works, by applying Fermat's theorem mod <em>p</em> and mod <em>q</em> separately; it's an exercise in the textbook.) Every step uses something from these two lessons: modular exponentiation to compute, the extended Euclidean algorithm to find <em>d</em>, and Euler's theorem to prove it correct.</p>

<h3>Why it's secure, and the caveats</h3>
<p>An attacker knows <em>n</em>, <em>e</em> and <em>c</em>. Finding <em>d</em> requires φ(<em>n</em>), and computing φ(<em>n</em>) from <em>n</em> is as hard as factoring <em>n</em>. No efficient classical factoring algorithm is known; the largest RSA challenge number factored publicly (RSA-250, 829 bits) took about 2,700 core-years of computing in 2020. Standard keys are 2048 bits or more.</p>
<ul>
  <li><strong>"Textbook" RSA, as above, is not safe to use directly.</strong> Encrypting the same message always gives the same ciphertext, and small messages can be attacked. Real systems add random padding (OAEP) and use vetted libraries. Never implement cryptography yourself for real use.</li>
  <li><strong>Finding large primes</strong> is easy, by contrast: primes are common (about 1 in 700 numbers near 10³⁰⁰), and fast probabilistic tests based on Fermat's theorem, such as Miller–Rabin, check a candidate in milliseconds.</li>
  <li><strong>Quantum computers</strong> would break RSA: Peter Shor showed in 1994 that a large quantum computer could factor efficiently. None big enough exists yet, but standards bodies have published replacement "post-quantum" algorithms (NIST, 2024), and systems are migrating.</li>
  <li>Today, much web traffic uses elliptic-curve cryptography for key exchange instead of RSA, because it needs much shorter keys, but the same ideas from number theory underlie it.</li>
</ul>
`,
    terms: [
      ["Fermat's little theorem", "If p is prime and p ∤ a, then a^(p−1) ≡ 1 (mod p)."],
      ["Euler's totient φ(n)", "The number of integers from 1 to n coprime to n; φ(pq) = (p − 1)(q − 1)."],
      ["Euler's theorem", "If gcd(a, n) = 1, then a^φ(n) ≡ 1 (mod n)."],
      ["Public-key cryptography", "Encryption with a published key, where only the holder of a matching private key can decrypt."],
      ["RSA", "A public-key system: encrypt with c = mᵉ mod n, decrypt with m = cᵈ mod n, where ed ≡ 1 (mod φ(n))."]
    ],
    quiz: [
      { q: "By Fermat's little theorem, 2¹⁰ mod 11 equals:", choices: ["0", "1", "2", "10"], answer: 1, why: "11 is prime and doesn't divide 2." },
      { q: "What is φ(35)?", choices: ["34", "24", "12", "30"], answer: 1, why: "35 = 5·7, so φ = 4·6 = 24." },
      { q: "In RSA, which values are public?", choices: ["p and q", "n and e", "d and φ(n)", "n and d"], answer: 1, why: "(n, e) is the public key; d is private." },
      { q: "Why can't an attacker simply compute <em>d</em> = <em>e</em>⁻¹?", choices: ["Inverses don't exist", "d is an inverse mod φ(n), and finding φ(n) requires factoring n", "Computing inverses is slow", "e is secret"], answer: 1, why: "The extended Euclidean algorithm is fast, but only if you know φ(n)." },
      { q: "Which would break RSA if built at large scale?", choices: ["Faster classical CPUs", "A large quantum computer running Shor's algorithm", "Longer keys", "Elliptic curves"], answer: 1, why: "Shor's algorithm factors in polynomial time on a quantum computer." }
    ],
    practice: [
      { q: `<p>Use Fermat's little theorem to compute 2¹⁰⁰⁰ mod 13.</p>`, a: `<p>2¹² ≡ 1 (mod 13). 1000 = 12·83 + 4, so 2¹⁰⁰⁰ ≡ 2⁴ = 16 ≡ 3 (mod 13).</p>` },
      { q: `<p>Generate an RSA key by hand with <em>p</em> = 5, <em>q</em> = 11, <em>e</em> = 3. Encrypt <em>m</em> = 9 and decrypt the result.</p>`, a: `<p><em>n</em> = 55, φ = 4·10 = 40. gcd(3, 40) = 1. <em>d</em> = 3⁻¹ mod 40 = 27 (3·27 = 81 = 2·40 + 1). Encrypt: 9³ = 729 = 13·55 + 14, so <em>c</em> = 14. Decrypt: 14²⁷ mod 55 = 9 (check with <code>pow(14, 27, 55)</code>).</p>` },
      { q: `<p>Explain why RSA requires gcd(<em>e</em>, φ(<em>n</em>)) = 1.</p>`, a: `<p>The private exponent <em>d</em> is the inverse of <em>e</em> mod φ(<em>n</em>), and an inverse exists exactly when gcd(<em>e</em>, φ(<em>n</em>)) = 1. Without <em>d</em>, there's no way to undo encryption; in fact different messages would encrypt to the same ciphertext.</p>` },
      { q: `<p>The <em>Fermat test</em> declares <em>n</em> "probably prime" if 2<sup><em>n</em>−1</sup> ≡ 1 (mod <em>n</em>). Show that 341 = 11 · 31 passes the test, so the test can be fooled. (Use Python.)</p>`, a: `<p><code>pow(2, 340, 341)</code> returns 1, though 341 is composite. Such numbers are called pseudoprimes. Using several random bases helps, but Carmichael numbers like 561 fool every base coprime to them, which is why real systems use the Miller–Rabin test instead.</p>` },
      { q: `<p>A message is "textbook RSA" encrypted with <em>e</em> = 3 and a 2048-bit <em>n</em>. The message is the number 42. Why can an attacker recover it without factoring <em>n</em>?</p>`, a: `<p>42³ = 74088 is far smaller than <em>n</em>, so no reduction mod <em>n</em> happens: <em>c</em> = 74088 exactly. The attacker takes an ordinary cube root. This is one reason real RSA pads messages with random bytes so that <em>m</em> is large and unpredictable.</p>` }
    ],
    sources: ["mcs", "levin"]
  },
  {
    id: "d6",
    title: "Discrete probability",
    minutes: 90,
    summary: "Sample spaces and events, the uniform model and counting, complements and unions, conditional probability, independence, Bayes' rule, and famous puzzles that fool intuition.",
    notes: `
<p>Randomness appears throughout computing: randomized algorithms like quicksort, hash functions, simulations, cryptographic keys, network failures, A/B tests, and machine learning, which is applied probability. Probability is also notoriously counterintuitive; careful definitions protect you from confident wrong answers.</p>

<h3>Sample spaces and events</h3>
<p>An experiment has a set of possible outcomes called the <strong>sample space</strong> <em>S</em>. An <strong>event</strong> is a subset of <em>S</em>. A <strong>probability function</strong> assigns each outcome a number between 0 and 1, with all of them summing to 1; the probability of an event is the sum over its outcomes.</p>
<p>When all outcomes are equally likely (the <strong>uniform</strong> model), probability is counting:</p>
<p class="math">P(<em>E</em>) = |<em>E</em>| / |<em>S</em>|</p>
<p>Rolling two dice: <em>S</em> is the 36 ordered pairs (first die, second die). The event "the sum is 7" is {(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)}, so P = 6/36 = 1/6. Treating the dice as distinguishable (ordered pairs) is what makes the outcomes equally likely; "a 3 and a 4" is twice as likely as "two 3s".</p>
<p>A 5-card hand is a flush (all one suit) with probability 4 · C(13, 5) / C(52, 5) = 5148 / 2,598,960 ≈ 0.2% (including straight flushes). Counting from the first two lessons does all the work.</p>

<h3>Rules for combining events</h3>
<ul>
  <li><strong>Complement:</strong> P(not <em>E</em>) = 1 − P(<em>E</em>). Often the easiest route: P(at least one six in 4 rolls) = 1 − (5/6)⁴ ≈ 0.518.</li>
  <li><strong>Union:</strong> P(<em>A</em> or <em>B</em>) = P(<em>A</em>) + P(<em>B</em>) − P(<em>A</em> and <em>B</em>), which is inclusion–exclusion.</li>
  <li><strong>Union bound:</strong> P(<em>A</em>₁ or … or <em>A<sub>k</sub></em>) ≤ P(<em>A</em>₁) + … + P(<em>A<sub>k</sub></em>). Crude but extremely useful: if each of 1000 servers fails on a given day with probability 0.0001, the chance that any fails is at most 0.1.</li>
</ul>

<h3>The birthday problem</h3>
<p>How many people must be in a room for a better-than-even chance that two share a birthday? Assume 365 equally likely birthdays. The complement is easier: all <em>k</em> birthdays different.</p>
<p class="math">P(all different) = (365/365) · (364/365) · (363/365) ⋯ ((365 − <em>k</em> + 1)/365)</p>
<p>At <em>k</em> = 23 this drops below 1/2: P(a shared birthday) ≈ 0.507. Most people guess around 180. The intuition fails because what matters is the number of <em>pairs</em>, C(23, 2) = 253, not the number of people. The same calculation tells you how quickly hash values collide: with <em>m</em> possible values, expect a collision after about √(π<em>m</em>/2) random items. For 64-bit hashes that's about 5 billion items, which is why cryptographic hashes use 256 bits.</p>

<h3>Conditional probability</h3>
<p>The probability of <em>A</em> <strong>given</strong> that <em>B</em> happened is</p>
<p class="math">P(<em>A</em> | <em>B</em>) = P(<em>A</em> and <em>B</em>) / P(<em>B</em>)</p>
<p>Knowing <em>B</em> happened shrinks the sample space to <em>B</em>. Roll two dice; given that the sum is 8, what's the probability that both show 4? The sum-8 outcomes are (2,6), (3,5), (4,4), (5,3), (6,2), so P = 1/5, not 1/36.</p>
<p>Rearranged, it gives the <strong>multiplication rule</strong>: P(<em>A</em> and <em>B</em>) = P(<em>B</em>) · P(<em>A</em> | <em>B</em>). Draw two cards without replacement; P(both aces) = (4/52) · (3/51) = 1/221.</p>

<h3>Independence</h3>
<p>Events <em>A</em> and <em>B</em> are <strong>independent</strong> if P(<em>A</em> and <em>B</em>) = P(<em>A</em>) · P(<em>B</em>), equivalently P(<em>A</em> | <em>B</em>) = P(<em>A</em>): knowing one tells you nothing about the other. Separate coin flips are independent. Draws without replacement are not.</p>
<p>Assuming independence when it isn't true is a classic and dangerous error. A storage system with two disks, each failing with probability 1% a year, loses data with probability 0.01% <em>if</em> failures are independent. But disks bought together, from the same batch, in the same machine, under the same power surge, tend to fail together, and real failure rates for such pairs are far higher. In 1999, a British court convicted Sally Clark of murdering her two infant sons largely on an expert's claim that two cot deaths in one family had probability (1/8543)² ≈ 1 in 73 million. That squared figure assumed independence, ignoring shared genetic and environmental factors. The conviction was overturned in 2003, and the Royal Statistical Society publicly criticized the misuse of statistics.</p>

<h3>Bayes' rule</h3>
<p>Often we know P(<em>B</em> | <em>A</em>) but want P(<em>A</em> | <em>B</em>). Bayes' rule reverses the condition:</p>
<p class="math">P(<em>A</em> | <em>B</em>) = P(<em>B</em> | <em>A</em>) · P(<em>A</em>) / P(<em>B</em>)</p>
<p>where P(<em>B</em>) = P(<em>B</em> | <em>A</em>)P(<em>A</em>) + P(<em>B</em> | not <em>A</em>)P(not <em>A</em>) (the <strong>law of total probability</strong>).</p>
<p><strong>Example.</strong> A disease affects 1% of people. A test detects it 99% of the time when present and gives a false positive 5% of the time when absent. You test positive. What's the probability you have the disease?</p>
<p class="math">P(D | +) = (0.99 · 0.01) / (0.99 · 0.01 + 0.05 · 0.99) = 0.0099 / 0.0594 ≈ 0.17</p>
<p>Only 17%. Picture 10,000 people: 100 have the disease and about 99 of them test positive; 9,900 don't, and about 495 of them test positive anyway. Of the 594 positives, only 99 are sick. Ignoring how rare the condition is, the <strong>base rate</strong>, is called the base-rate fallacy. It matters for spam filters (which are built on Bayes' rule), fraud detection, and any automated system that flags rare events: most alarms may be false even when the detector is accurate.</p>

<h3>The Monty Hall problem</h3>
<p>A prize is behind one of three doors. You pick door 1. The host, who knows where the prize is, opens another door with no prize behind it, say door 3, and offers to let you switch to door 2. Should you? Yes: switching wins with probability 2/3. Your first pick is right 1/3 of the time and stays right 1/3 of the time; the host's action gives you no information about door 1, but it concentrates the remaining 2/3 onto the one unopened door. If that doesn't convince you, simulate it; programmers often settle probability arguments this way.</p>
<pre><code>import random

def play(switch):
    prize, pick = random.randrange(3), random.randrange(3)
    opened = next(d for d in range(3) if d != pick and d != prize)
    if switch:
        pick = next(d for d in range(3) if d != pick and d != opened)
    return pick == prize

trials = 100_000
print(sum(play(True) for _ in range(trials)) / trials)    # about 0.667
print(sum(play(False) for _ in range(trials)) / trials)   # about 0.333</code></pre>
`,
    terms: [
      ["Sample space", "The set of all possible outcomes of an experiment."],
      ["Event", "A subset of the sample space."],
      ["Conditional probability", "P(A | B) = P(A and B)/P(B), the probability of A given that B occurred."],
      ["Independent events", "Events with P(A and B) = P(A)·P(B)."],
      ["Bayes' rule", "P(A | B) = P(B | A)P(A)/P(B)."],
      ["Base-rate fallacy", "Ignoring how common a condition is when interpreting evidence for it."],
      ["Union bound", "The probability that at least one event happens is at most the sum of their probabilities."]
    ],
    quiz: [
      { q: "Two fair dice are rolled. What is P(sum = 2)?", choices: ["1/11", "1/36", "1/18", "1/6"], answer: 1, why: "Only (1, 1) out of 36 equally likely ordered pairs." },
      { q: "P(at least one head in 5 fair coin flips) is:", choices: ["5/32", "31/32", "1/2", "5/2"], answer: 1, why: "1 − (1/2)⁵ = 31/32." },
      { q: "You draw two cards without replacement. Are \"first is a heart\" and \"second is a heart\" independent?", choices: ["Yes", "No"], answer: 1, why: "Knowing the first was a heart changes P(second heart) from 13/52 to 12/51." },
      { q: "In the lesson's disease example, why is P(disease | positive) so low?", choices: ["The test is inaccurate", "The disease is rare, so false positives from the many healthy people outnumber true positives", "Bayes' rule is wrong", "Conditional probability doesn't apply to tests"], answer: 1, why: "That's the base-rate effect." },
      { q: "In the Monty Hall problem, the probability of winning by switching is:", choices: ["1/3", "1/2", "2/3", "1"], answer: 2, why: "You win by switching exactly when your first pick was wrong, which happens 2/3 of the time." }
    ],
    practice: [
      { q: `<p>A password is 4 random lowercase letters. What's the probability it contains at least one vowel (a, e, i, o, u)?</p>`, a: `<p>Complement: no vowels means each letter is one of 21 consonants: (21/26)⁴ ≈ 0.4256. So P(at least one vowel) ≈ 0.574.</p>` },
      { q: `<p>A family has two children. Given that at least one is a girl, what's the probability both are girls? (Assume each child is independently a girl or boy with probability 1/2.)</p>`, a: `<p>Sample space {GG, GB, BG, BB}, equally likely. "At least one girl" is {GG, GB, BG}. P(GG | at least one girl) = (1/4)/(3/4) = 1/3, not 1/2.</p>` },
      { q: `<p>A spam filter sees the word "winner". 40% of email is spam; "winner" appears in 20% of spam and 1% of legitimate email. What's the probability an email containing "winner" is spam?</p>`, a: `<p>P(S | w) = (0.2 · 0.4)/(0.2 · 0.4 + 0.01 · 0.6) = 0.08/0.086 ≈ 0.93.</p>` },
      { q: `<p>A system has 3 independent components, each working with probability 0.9. It works if at least 2 work. What's the probability it works?</p>`, a: `<p>Exactly 3: 0.9³ = 0.729. Exactly 2: C(3, 2) · 0.9² · 0.1 = 0.243. Total 0.972. Redundancy turns 90% parts into a 97% system, but only if failures are independent.</p>` },
      { q: `<p>Write a simulation to estimate the probability that among 30 people, two share a birthday, and compare with the exact formula.</p>`, a: `<pre><code>import random, math

def shared(k):
    days = [random.randrange(365) for _ in range(k)]
    return len(set(days)) &lt; k

trials = 100_000
est = sum(shared(30) for _ in range(trials)) / trials
exact = 1 - math.prod((365 - i) / 365 for i in range(30))
print(est, exact)   # both about 0.706</code></pre>` }
    ],
    sources: ["grinstead", "mcs"]
  },
  {
    id: "d7",
    title: "Random variables and expectation",
    minutes: 90,
    summary: "Random variables and their distributions, expected value, linearity of expectation and indicator variables, the binomial and geometric distributions, variance, and analyzing randomized programs.",
    notes: `
<p>Probability tells you how likely events are. Often you want a number instead: how many comparisons will this randomized algorithm make, how many hash collisions should I expect, how long until a server fails? Random variables and expectation answer these questions, and one theorem, linearity of expectation, makes many hard-looking problems easy.</p>

<h3>Random variables</h3>
<p>A <strong>random variable</strong> is a function from outcomes to numbers. Roll two dice; <em>X</em> = their sum is a random variable taking values 2 through 12. Its <strong>distribution</strong> lists P(<em>X</em> = <em>x</em>) for each value <em>x</em>: P(<em>X</em> = 7) = 6/36, P(<em>X</em> = 2) = 1/36, and so on.</p>

<h3>Expected value</h3>
<p>The <strong>expected value</strong> (or mean) is the probability-weighted average of the values:</p>
<p class="math">E[<em>X</em>] = Σ<sub><em>x</em></sub> <em>x</em> · P(<em>X</em> = <em>x</em>)</p>
<p>One fair die: E = (1 + 2 + 3 + 4 + 5 + 6)/6 = 3.5. The expected value need not be a possible outcome; it's the long-run average over many repetitions. A bet that pays $35 with probability 1/38 and costs $1 otherwise (a single number in American roulette) has expected gain 35 · (1/38) − 1 · (37/38) = −2/38 ≈ −$0.053 per play: the casino's edge.</p>

<h3>Linearity of expectation</h3>
<p><strong>Theorem.</strong> For any random variables <em>X</em> and <em>Y</em> and constants <em>a</em>, <em>b</em>:</p>
<p class="math">E[<em>aX</em> + <em>bY</em>] = <em>a</em>E[<em>X</em>] + <em>b</em>E[<em>Y</em>]</p>
<p>This holds <strong>even if <em>X</em> and <em>Y</em> are dependent</strong>, which is what makes it so powerful. The expected sum of two dice is 3.5 + 3.5 = 7, no distribution needed.</p>
<p>The standard technique pairs linearity with <strong>indicator variables</strong>: <em>I<sub>A</sub></em> is 1 if event <em>A</em> happens and 0 otherwise, so E[<em>I<sub>A</sub></em>] = P(<em>A</em>). To find the expected number of things that happen, write the count as a sum of indicators and add their probabilities.</p>
<p><strong>The hat-check problem.</strong> <em>n</em> people check their hats, and the hats are returned in a random order. What's the expected number of people who get their own hat back? Let <em>I<sub>i</sub></em> indicate that person <em>i</em> does. Each person gets their own hat with probability 1/<em>n</em>. So E[number] = <em>n</em> · (1/<em>n</em>) = 1, for every <em>n</em>. The events are far from independent (if everyone else got their own hat, so did you), but linearity doesn't care. Computing the full distribution is much harder.</p>
<p><strong>Hash collisions.</strong> Insert <em>k</em> keys into a hash table with <em>m</em> buckets, each key going to a uniformly random bucket. For each of the C(<em>k</em>, 2) pairs, let an indicator mark that the pair collides, with probability 1/<em>m</em>. The expected number of colliding pairs is C(<em>k</em>, 2)/<em>m</em>. With 20 people and 365 birthdays, that's 190/365 ≈ 0.52 shared-birthday pairs. Keep the table's load <em>k</em>/<em>m</em> bounded and collisions per key stay bounded: the core of why hash tables are fast on average.</p>

<h3>Two common distributions</h3>
<p>A <strong>Bernoulli trial</strong> succeeds with probability <em>p</em>. Repeat it independently:</p>
<ul>
  <li><strong>Binomial:</strong> the number of successes in <em>n</em> trials. P(<em>X</em> = <em>k</em>) = C(<em>n</em>, <em>k</em>) <em>p<sup>k</sup></em>(1 − <em>p</em>)<sup><em>n</em>−<em>k</em></sup>: choose which <em>k</em> trials succeed. By linearity (a sum of <em>n</em> indicators), E[<em>X</em>] = <em>np</em>. Sending 1000 packets over a link that drops each with probability 0.02, expect 20 lost.</li>
  <li><strong>Geometric:</strong> the number of trials until the first success. P(<em>X</em> = <em>k</em>) = (1 − <em>p</em>)<sup><em>k</em>−1</sup><em>p</em>, and E[<em>X</em>] = 1/<em>p</em>. If a randomized algorithm succeeds with probability 1/4 per attempt, expect 4 attempts. Roll a die until a 6: expect 6 rolls.</li>
</ul>
<p><strong>Coupon collector.</strong> A cereal box contains one of <em>n</em> equally likely toys. How many boxes until you have all <em>n</em>? When you have <em>i</em> toys, each box is new with probability (<em>n</em> − <em>i</em>)/<em>n</em>, so you wait on average <em>n</em>/(<em>n</em> − <em>i</em>) boxes (geometric). By linearity, the total is <em>n</em>(1/<em>n</em> + 1/(<em>n</em>−1) + … + 1/1) = <em>n</em>·<em>H<sub>n</sub></em> ≈ <em>n</em> ln <em>n</em>. For 50 toys, about 225 boxes. The same analysis tells you how many random tests it takes to hit every one of <em>n</em> code paths.</p>

<h3>Variance</h3>
<p>The expected value doesn't tell you how spread out the outcomes are. The <strong>variance</strong> measures that:</p>
<p class="math">Var[<em>X</em>] = E[(<em>X</em> − E[<em>X</em>])²] = E[<em>X</em>²] − (E[<em>X</em>])²</p>
<p>and the <strong>standard deviation</strong> is σ = √Var[<em>X</em>], in the same units as <em>X</em>. One die: E[<em>X</em>²] = (1 + 4 + 9 + 16 + 25 + 36)/6 = 91/6, so Var = 91/6 − 3.5² = 35/12 ≈ 2.92, and σ ≈ 1.71. For independent variables, variances add: a binomial has variance <em>np</em>(1 − <em>p</em>).</p>
<p>Variance matters in engineering: two web servers with the same average response time of 100 ms are very different if one is always 100 ms and the other is usually 10 ms but occasionally 5 seconds. That's why performance engineers report percentiles (the 99th-percentile latency) as well as averages.</p>

<h3>Randomized algorithms</h3>
<p>Randomness is a tool, not just something to analyze. <strong>Randomized quicksort</strong> picks its pivot at random. For any input, its expected number of comparisons is about 2<em>n</em> ln <em>n</em> ≈ 1.39 <em>n</em> log₂ <em>n</em>; there's no "bad input" an adversary can construct, only rare unlucky random choices. The proof uses exactly this lesson's technique: an indicator for each pair of items that gets compared, and linearity of expectation. You'll see it in Algorithms.</p>
`,
    terms: [
      ["Random variable", "A function assigning a number to each outcome of an experiment."],
      ["Expected value E[X]", "The probability-weighted average of a random variable's values."],
      ["Linearity of expectation", "E[X + Y] = E[X] + E[Y], for any random variables, dependent or not."],
      ["Indicator variable", "A random variable that is 1 if an event happens and 0 otherwise; its expectation is the event's probability."],
      ["Binomial distribution", "Number of successes in n independent trials with success probability p; mean np."],
      ["Geometric distribution", "Number of trials until the first success; mean 1/p."],
      ["Variance", "E[(X − E[X])²], a measure of spread; its square root is the standard deviation."]
    ],
    quiz: [
      { q: "What is the expected sum of three fair dice?", choices: ["9", "10.5", "18", "3.5"], answer: 1, why: "By linearity, 3 × 3.5." },
      { q: "Does linearity of expectation require the variables to be independent?", choices: ["Yes", "No"], answer: 1, why: "It holds for any random variables. That's why the hat-check answer is so easy." },
      { q: "A test passes with probability 0.8 on each independent run. Expected number of runs until the first failure?", choices: ["1.25", "5", "0.2", "4"], answer: 1, why: "Failure probability is 0.2, so the geometric mean is 1/0.2 = 5." },
      { q: "100 keys go into 1000 hash buckets at random. Expected number of colliding pairs?", choices: ["0.1", "about 4.95", "10", "100"], answer: 1, why: "C(100, 2)/1000 = 4950/1000." },
      { q: "Two servers have the same mean latency. What would distinguish them?", choices: ["Their expected values", "Their variance or high percentiles", "Nothing", "Their medians must also be equal"], answer: 1, why: "Spread, measured by variance or percentiles, captures how unpredictable they are." }
    ],
    practice: [
      { q: `<p>You flip a fair coin 10 times. What's the expected number of heads? Of runs of "HH" (positions <em>i</em>, <em>i</em> + 1 both heads, overlapping allowed)?</p>`, a: `<p>Heads: 10 · 1/2 = 5. Pairs: there are 9 adjacent positions, each HH with probability 1/4, so 9/4 = 2.25 by linearity, even though overlapping pairs are dependent.</p>` },
      { q: `<p>A random permutation of 1, …, <em>n</em>. An <em>ascent</em> is a position <em>i</em> with π(<em>i</em>) &lt; π(<em>i</em> + 1). What's the expected number of ascents?</p>`, a: `<p>For each of the <em>n</em> − 1 adjacent positions, the two values are equally likely to be in either order, so P(ascent) = 1/2. Expected number: (<em>n</em> − 1)/2.</p>` },
      { q: `<p>A game costs $2 to play. You roll a die and win the face value in dollars, unless you roll a 1, which wins $0. What is your expected gain per play?</p>`, a: `<p>Expected winnings: (0 + 2 + 3 + 4 + 5 + 6)/6 = 20/6 ≈ $3.33. Gain: 3.33 − 2 ≈ $1.33 per play. (This game is a bad deal for the house.)</p>` },
      { q: `<p>Compute the variance of a single fair coin flip, scored 1 for heads and 0 for tails, and the variance of the number of heads in 100 flips.</p>`, a: `<p>E[<em>X</em>] = 1/2, E[<em>X</em>²] = 1/2, so Var = 1/2 − 1/4 = 1/4. Flips are independent, so variances add: 100 · 1/4 = 25, standard deviation 5. You'd typically see 45 to 55 heads.</p>` },
      { q: `<p>Simulate the coupon collector problem for <em>n</em> = 50 and compare the average with <em>n</em>·<em>H<sub>n</sub></em>.</p>`, a: `<pre><code>import random

def boxes_needed(n):
    seen, boxes = set(), 0
    while len(seen) &lt; n:
        seen.add(random.randrange(n))
        boxes += 1
    return boxes

n, trials = 50, 20_000
avg = sum(boxes_needed(n) for _ in range(trials)) / trials
print(avg, n * sum(1 / k for k in range(1, n + 1)))   # both about 225</code></pre>` }
    ],
    sources: ["grinstead", "mcs"]
  }
]);

CSA.addAsides("math121", {
  d1: [
    { kind: "practice", title: "Combinatorial explosion", html: `<p>Counting explains why some problems can't be solved by trying everything. A route through 20 cities can be ordered in 20!/2 ≈ 1.2 × 10¹⁸ ways; checking a billion a second would take 38 years. With 30 cities, it would take far longer than the age of the universe. Much of algorithm design is about finding answers without enumerating every possibility.</p>` }
  ],
  d2: [
    { kind: "history", title: "Pascal's triangle before Pascal", html: `<p>Blaise Pascal wrote his treatise on the arithmetic triangle in 1654, but the triangle was known centuries earlier: to Pingala in India (around 200 BCE, in counting poetic meters), to al-Karaji and Omar Khayyam in Persia (around 1000–1100 CE), and to Yang Hui in China (1261), after whom it's named in Chinese.</p>` }
  ],
  d3: [
    { kind: "history", title: "Fibonacci's rabbits", html: `<p>Leonardo of Pisa, known as Fibonacci, introduced the sequence in his <em>Liber Abaci</em> (1202) through a puzzle about breeding rabbits. The same book introduced Hindu–Arabic numerals to Europe. The sequence had appeared centuries earlier in Indian mathematics, again in counting poetic meters, where patterns of short and long syllables follow the same recurrence as bit strings with no two consecutive 1s.</p>` }
  ],
  d4: [
    { kind: "lang", title: "Big integers", html: `<p>Python's unlimited integers make number theory easy to explore: <code>pow(3, 10**100, 10**9 + 7)</code> returns instantly. In C or Java, integers are fixed-width, and cryptographic code needs special libraries (Java's <code>BigInteger</code>, C's GMP). Python got unlimited integers from ABC, its predecessor at CWI in Amsterdam, and unified them into one <code>int</code> type in Python 3.</p>` }
  ],
  d5: [
    { kind: "history", title: "Invented twice", html: `<p>In 1997 the British government revealed that public-key cryptography had been invented in secret at GCHQ, its signals intelligence agency. James Ellis proposed the idea in 1970; Clifford Cocks, a recent mathematics graduate, devised what is essentially RSA in 1973, reportedly in about half an hour; Malcolm Williamson found the equivalent of Diffie–Hellman key exchange in 1974. Because it was classified, the published inventors got the credit, and the Turing Award: Diffie and Hellman in 2015, Rivest, Shamir and Adleman in 2002.</p>` }
  ],
  d6: [
    { kind: "ethics", title: "Probability in the courtroom", html: `<p>The Sally Clark case is one of several in which misused probability contributed to wrongful convictions. A related error, the <em>prosecutor's fallacy</em>, confuses P(evidence | innocent) with P(innocent | evidence): "there's only a 1 in a million chance an innocent person would match this DNA profile" does not mean "there's a 1 in a million chance this person is innocent", especially if a database of millions was searched to find the match. Computer scientists who build forensic, risk-scoring or matching systems need to communicate these probabilities correctly.</p>` }
  ],
  d7: [
    { kind: "practice", title: "A/B testing", html: `<p>When a company tests two versions of a web page, each visitor's click is a Bernoulli trial. Whether a difference between 5.1% and 5.3% click rates is real or just chance depends on the variance, and so on how many visitors were in each group. Statistics courses build on this lesson to answer "how sure are we?", a question at the heart of data science.</p>` }
  ]
});

CSA.addOptional("math121", [
  {
    id: "cryptohist",
    kind: "history",
    title: "Codes and code-breakers: from Caesar to public keys",
    minutes: 60,
    summary: "Two thousand years of secret writing and the mathematics used to break it, including the Polish and British work on Enigma that helped found computer science.",
    notes: `
<p>Cryptography is an arms race between people who hide messages and people who uncover them. Each round was won with mathematics, and the code-breakers of the Second World War built some of the first electronic computers. This lesson traces the race through the ideas of this course: counting, modular arithmetic and probability.</p>

<h3>1. Substitution ciphers</h3>
<p>Julius Caesar reportedly shifted each letter three places: A→D, B→E, and so on. In modern terms, encryption is <em>c</em> ≡ <em>m</em> + 3 (mod 26). With only 25 possible shifts, anyone can try them all. A general <em>substitution cipher</em> replaces each letter with any other, giving 26! ≈ 4 × 10²⁶ keys, far too many to try. Yet it is easy to break.</p>
<p>In the 9th century, the Arab philosopher al-Kindi described <strong>frequency analysis</strong>: in any long text, some letters (in English, E, T, A) appear much more often than others. Match the most frequent ciphertext letters with the most frequent plaintext letters and the cipher unravels. The lesson that a huge key space is not enough is still fundamental: security depends on the best attack, not on the number of keys.</p>

<h3>2. Polyalphabetic ciphers</h3>
<p>The Vigenère cipher (16th century) uses a keyword to choose a different Caesar shift for each letter, which flattens letter frequencies. It was called "le chiffre indéchiffrable" for three centuries until Charles Babbage (around 1854) and Friedrich Kasiski (1863) broke it: repeated fragments in the ciphertext reveal the keyword length <em>k</em>, and then every <em>k</em>-th letter is a simple Caesar cipher, open to frequency analysis.</p>
<p>A Vigenère cipher with a random key as long as the message, never reused, is the <strong>one-time pad</strong>. In 1949 Claude Shannon proved it perfectly secure: every plaintext of that length is equally likely given the ciphertext. Its weakness is practical: the key must be as long as all the messages and delivered securely in advance.</p>

<h3>3. Enigma</h3>
<p>The German military's Enigma machine used rotating wired wheels to change the substitution with every keypress. Its settings gave about 10²³ possibilities. In 1932 the Polish mathematician <strong>Marian Rejewski</strong>, working with Jerzy Różycki and Henryk Zygalski, reconstructed the machine's wiring using permutation theory, the mathematics of rearrangements, and built electromechanical "bomba" machines to find daily settings. In July 1939, weeks before the invasion of Poland, they handed their work to British and French intelligence.</p>
<p>At Bletchley Park, <strong>Alan Turing</strong> and Gordon Welchman designed the British Bombe, which searched settings by exploiting <em>cribs</em>, guessed fragments of plaintext such as weather reports. Thousands of people worked there, about three-quarters of them women. For the even harder Lorenz cipher used by German high command, Tommy Flowers built <strong>Colossus</strong> (1944), one of the first programmable electronic digital computers. Historians estimate that the intelligence shortened the war in Europe by up to two years. The work stayed secret until the 1970s.</p>

<h3>4. The key distribution problem and public keys</h3>
<p>Every cipher so far needs a shared secret key. As computer networks grew in the 1970s, delivering keys securely to everyone who might need to talk became the central problem. Diffie and Hellman's 1976 paper "New Directions in Cryptography" solved it in principle with key exchange based on modular exponentiation, and RSA (1977) gave public-key encryption and digital signatures. As you saw in Lesson 5's sidebar, GCHQ had found the same ideas earlier, in secret.</p>

<h3>5. Today</h3>
<p>Modern symmetric ciphers like AES (2001), chosen in an open international competition, are not known to be breakable faster than by trying keys, and a 128-bit key space is beyond any computer. Public-key systems set up the shared keys. Kerckhoffs's principle (1883), that a system should be secure even if everything except the key is public, is now standard practice: the strongest algorithms are the ones published and attacked by experts for years.</p>

<h3>Discussion questions</h3>
<ol>
  <li>Why is a cipher with 26! keys weaker than one with 2¹²⁸ keys and a better design? What does this tell you about measuring security?</li>
  <li>The Polish contribution to breaking Enigma was little known for decades. Why do you think histories often credit the most visible institutions?</li>
  <li>Kerckhoffs's principle says secrecy of the algorithm shouldn't be relied on. Why might a company still be tempted to keep its encryption method secret?</li>
</ol>
`,
    terms: [
      ["Frequency analysis", "Breaking substitution ciphers by matching letter frequencies in ciphertext and language."],
      ["One-time pad", "Encryption with a truly random key as long as the message, used once; perfectly secure."],
      ["Kerckhoffs's principle", "A cryptosystem should be secure even if everything about it except the key is public."]
    ],
    quiz: [
      { q: "Who first described frequency analysis?", choices: ["Julius Caesar", "al-Kindi", "Alan Turing", "Charles Babbage"], answer: 1, why: "In the 9th century." },
      { q: "Who first reconstructed the Enigma's wiring, in 1932?", choices: ["Alan Turing", "Marian Rejewski", "Tommy Flowers", "Claude Shannon"], answer: 1, why: "Rejewski, using permutation theory, with Różycki and Zygalski." },
      { q: "What did Shannon prove about the one-time pad?", choices: ["It can be broken by frequency analysis", "It is perfectly secure if the key is random, as long as the message, and never reused", "It is weaker than Vigenère", "It requires public keys"], answer: 1, why: "His 1949 paper on secrecy systems." }
    ],
    sources: ["mcs"]
  },
  {
    id: "cryptoethics",
    kind: "ethics",
    title: "Encryption, privacy and the \"crypto wars\"",
    minutes: 45,
    summary: "Strong encryption protects everyone's data, including criminals'. Should governments be able to read encrypted messages? A recurring debate, and what the mathematics says about it.",
    notes: `
<p>The mathematics you learned in this course lets anyone encrypt messages so that no government can read them. Since the 1990s, governments, technology companies and civil-liberties groups have repeatedly fought over whether that should be allowed. The fights are called the "crypto wars".</p>

<h3>Round one: the 1990s</h3>
<ul>
  <li><strong>Export controls.</strong> Until the late 1990s, the U.S. classified strong encryption software as a munition. In 1991 Phil Zimmermann released PGP ("Pretty Good Privacy"), free email encryption software, and was investigated for three years for exporting weapons. Activists printed the source code as a book, since books were protected speech. The controls were largely relaxed by 2000.</li>
  <li><strong>The Clipper chip (1993).</strong> The U.S. government proposed a phone encryption chip with a built-in copy of each key held in escrow for law enforcement. In 1994 the researcher Matt Blaze found a flaw that let users bypass the escrow mechanism, and the proposal collapsed.</li>
</ul>

<h3>Round two: smartphones</h3>
<p>From 2014, Apple and Google encrypted phones by default, with keys the companies themselves don't hold. In 2016, after a mass shooting in San Bernardino, the FBI obtained a court order requiring Apple to write software to help unlock the shooter's iPhone. Apple refused, arguing that such a tool would endanger every iPhone user. The FBI dropped the case after paying an outside firm to break in. End-to-end encrypted messaging (Signal, WhatsApp, iMessage) means that even the service provider can't read messages, and governments in several countries have since proposed laws requiring access or scanning of messages before encryption.</p>

<h3>The arguments</h3>
<ul>
  <li><strong>For access:</strong> serious crimes, including child abuse and terrorism, are planned on encrypted platforms, and law enforcement has long been able to get warrants for other evidence. "Going dark" makes some investigations impossible.</li>
  <li><strong>Against:</strong> a key that lets the "good guys" in also lets attackers in if it is stolen, leaked or abused, and keys held by governments or companies are high-value targets. A 2015 report by leading cryptographers, "Keys Under Doormats", argued that exceptional access can't be built without weakening security for everyone. Strong encryption also protects journalists, dissidents, abuse survivors, businesses and banks, and criminals can use other encryption tools anyway.</li>
</ul>
<p>The mathematics doesn't settle the policy question, but it shapes it: there's no known way to make a cryptographic door that only the right people can open. Computer scientists are often asked to explain this to lawmakers, and to explain it honestly, including the real costs on both sides.</p>

<h3>Discussion and writing</h3>
<ol>
  <li>Should a messaging company be required to scan users' messages for illegal images before they're encrypted? Consider effectiveness, false positives (Lesson 6's base rates) and the potential for the scanning system to be repurposed.</li>
  <li>Write a one-page letter to a legislator explaining, without jargon, why "a backdoor only for law enforcement" is technically difficult, and what alternatives exist for investigators.</li>
  <li>The ACM Code of Ethics asks professionals to "respect privacy" (1.6) and to "contribute to society and to human well-being" (1.1). How might these principles point in different directions on this issue?</li>
</ol>
`,
    terms: [
      ["End-to-end encryption", "Encryption in which only the communicating users hold the keys, not the service provider."],
      ["Key escrow", "Storing copies of encryption keys with a third party, such as a government agency."],
      ["Exceptional access", "A mechanism letting authorized parties decrypt data without the user's key; often called a backdoor."]
    ],
    quiz: [
      { q: "What was the Clipper chip?", choices: ["An early CPU", "A phone encryption chip with keys held in escrow for law enforcement", "A Bletchley Park machine", "An encryption standard still in use"], answer: 1, why: "Proposed by the U.S. government in 1993; it collapsed after a flaw was found." },
      { q: "In end-to-end encrypted messaging, who can read the messages?", choices: ["The service provider", "Only the communicating users", "Anyone with the app", "Governments, by default"], answer: 1, why: "The provider never holds the keys." }
    ],
    sources: ["acm"]
  }
]);
