CSA.addCourse({
  id: "cs430",
  code: "CS 430",
  title: "Advanced Algorithms",
  credits: 4,
  kind: "optional",
  term: "y4f",
  summary: "Algorithms I asked for the exact answer, in the worst case, with full knowledge of the input. This course relaxes each of those demands in turn and proves what is still guaranteed: costs averaged over a sequence of operations (amortized analysis), algorithms that flip coins (randomized algorithms and tail bounds), answers provably close to optimal for NP-hard problems (approximation algorithms), the optimization language behind many of those guarantees (linear programming and duality), summaries of data too large to store (streaming and sketching), and decisions made before the future is known (online algorithms). Every bound is checked numerically in Python. A track elective.",
  prereqs: ["CS 220 Algorithms I", "CS 320 Theory of Computation", "MATH 230 Probability and Statistics for Computer Science", "CS 201 Data Structures"],
  outcomes: [
    "Prove amortized bounds with the aggregate, accounting and potential methods, and design a potential function for a data structure",
    "Analyze randomized algorithms with linearity of expectation, distinguish Las Vegas from Monte Carlo algorithms, amplify success probabilities, and apply Markov, Chebyshev and Chernoff bounds",
    "Design approximation algorithms with proven ratios (vertex cover, set cover, metric TSP, a knapsack FPTAS) by comparing against a computable bound on the optimum, and explain what inapproximability results rule out",
    "Model problems as linear programs, solve small ones with the simplex method, write and use the dual, and round LP relaxations",
    "Summarize streams in small memory with reservoir sampling, Misra–Gries, count-min sketches, distinct-count estimators and Bloom filters, and size them from their error bounds",
    "Analyze online algorithms by competitive ratio (ski rental, paging, the secretary problem), prove matching lower bounds, and describe the main alternatives to worst-case analysis"
  ],
  rubric: {
    criteriaFor: "problem sets, programming assignments, the project and exams",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 20, desc: "One written set per lesson: the practice problems plus two proofs, graded on the Proofs and Analysis criteria." },
      { name: "Programming assignments", weight: 20, desc: "The lessons' auto-graded problems, plus for each lesson a short note comparing one measured quantity (a cost, a ratio, an error, a fault count) with the bound the notes prove." },
      { name: "Project", weight: 20, desc: "Pick one algorithm from the course and study it in depth: implement it, prove its guarantee in your own words, measure it on real or adversarial data against the bound and a baseline, and write a four-page report. Examples: Karger–Stein, Christofides, a two-phase simplex, HyperLogLog, the randomized marking algorithm for paging." },
      { name: "Final exam", weight: 30, desc: "Cumulative and worked by hand: design an algorithm, prove its bound, and apply the course's tools to a problem you haven't seen." }
    ],
    criteria: [
      { name: "Proofs", desc: "Is the guarantee proved?", levels: [
        "Complete, correct proofs: every inequality justified, the bound on the optimum stated and proved, and the tight or bad example given.",
        "Correct idea with a gap, such as an unjustified inequality or a missing case.",
        "A plausible argument that doesn't prove the claim (an example instead of a proof, or the wrong direction of an inequality).",
        "Missing or incorrect." ] },
      { name: "Analysis", desc: "Are the numbers right?", levels: [
        "Correct costs, probabilities, ratios and sizes, with the constants worked out and checked by computation.",
        "Correct asymptotics with a slip in a constant.",
        "A wrong bound or probability that changes the conclusion.",
        "Missing or incorrect." ] },
      { name: "Implementation", desc: "Does the code do what the analysis assumes?", levels: [
        "Correct, readable code whose model of cost and randomness matches the analysis; seeds fixed so results repeat; edge cases (empty input, ties, unbounded LPs) handled.",
        "Works for the main cases, with a gap in edge cases.",
        "Runs but computes the wrong thing in ordinary cases.",
        "Doesn't run." ] },
      { name: "Explanation", desc: "Can you say why it works?", levels: [
        "Explains the key idea of each proof, says which assumption each step uses, and points out what fails without it (no triangle inequality, a dependent hash, an adaptive adversary).",
        "Mostly clear, with some steps asserted rather than explained.",
        "Describes the algorithm but not why its bound holds.",
        "No explanation." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Collaboration:</b> discuss problems and ideas together; write your own proofs and code, and list who you worked with.",
      "<b>AI assistants:</b> allowed for explanations and checking. A proof you hand in must be one you can reproduce and defend at the board, and your report must say how an assistant was used.",
      "<b>Libraries:</b> assignments use only Python's standard library, so you build every algorithm yourself. The project may use an LP solver or NumPy as a baseline to compare against.",
      "<b>Late work:</b> four late days in total for problem sets and programming assignments; the project deadline is fixed."
    ]
  }
});

CSA.addUnits("cs430", [
  {
    id: "aa1",
    title: "Amortized analysis",
    minutes: 90,
    summary: "Bounding the total cost of a sequence of operations: the aggregate and accounting methods recalled, the potential method, a binary counter, dynamic arrays that grow and shrink, the amortized results for splay trees and union-find, and what amortized bounds don't promise.",
    notes: `
<p>Algorithms I analyzed one call at a time: how long does Dijkstra's algorithm take on this graph? Data structures are different. A program makes thousands or millions of calls on the same structure, and what matters is the total. Some operations are occasionally expensive because they tidy the structure up, which makes later operations cheap. Charging every call for the worst one wildly overestimates the total. <strong>Amortized analysis</strong> bounds the total cost of every sequence of operations instead. CS 201 Lesson 2 introduced it with dynamic arrays; this lesson adds its most powerful form, the potential method, and uses it on several structures.</p>

<h3>Three ways to count the same cost</h3>
<p>Consider a sequence of <em>m</em> operations on a data structure with actual costs <em>c</em><sub>1</sub>, …, <em>c</em><sub><em>m</em></sub>. We assign each operation an <strong>amortized cost</strong> <em>â</em><sub><em>i</em></sub> (read "a-hat"), chosen so that for every sequence and every prefix of it,</p>
<p class="math"><em>c</em><sub>1</sub> + … + <em>c</em><sub><em>i</em></sub> ≤ <em>â</em><sub>1</sub> + … + <em>â</em><sub><em>i</em></sub></p>
<p>Then the amortized costs are a guarantee on the total. There is no probability here: the bound holds for every sequence, even one chosen by an adversary. CS 201 gave two methods:</p>
<ul>
<li>The <strong>aggregate method</strong> adds up the actual cost of any <em>m</em> operations directly and divides by <em>m</em>. Every operation gets the same amortized cost.</li>
<li>The <strong>accounting method</strong> charges each kind of operation a fixed price. When the price exceeds the actual cost, the surplus is stored as <em>credit</em> on a particular part of the structure; expensive operations are paid for with stored credit. If the credit never goes negative, the prices are valid amortized costs.</li>
</ul>
<p>The third method, the <strong>potential method</strong>, stores the credit not on individual items but as one number describing the whole structure. It is the most flexible of the three, and the one used in research papers.</p>

<h3>The binary counter</h3>
<p>A binary counter stores a number as a list of bits, least significant first, so <code>[1, 1, 0, 1]</code> is 1 + 2 + 8 = 11. To add 1, turn the trailing 1s into 0s, then turn the first 0 into a 1 (appending a new bit if there is none). We measure cost as the number of bits changed.</p>
<pre><code>def increment(bits):
    i = 0
    while i &lt; len(bits) and bits[i] == 1:
        bits[i] = 0
        i += 1
    if i == len(bits):
        bits.append(1)
    else:
        bits[i] = 1
    return i + 1                       # bits changed

b = [1, 1, 0, 1]
print(increment(b), b)                 # 3 [0, 0, 1, 1]
b = []
costs = [increment(b) for _ in range(16)]
print(costs)                           # [1, 2, 1, 3, 1, 2, 1, 4, 1, 2, 1, 3, 1, 2, 1, 5]
print(sum(costs))                      # 31</code></pre>
<p>A single increment can be expensive: going from 15 = <code>[1, 1, 1, 1]</code> to 16 changes 5 bits, and in general the counter value <em>n</em> has about log<sub>2</sub> <em>n</em> bits, all of which can change. So the worst case of one operation is Θ(log <em>n</em>), and multiplying by <em>n</em> gives O(<em>n</em> log <em>n</em>) for <em>n</em> increments. The truth is much better.</p>
<p><b>Aggregate.</b> Bit 0 changes on every increment, bit 1 on every second one, bit <em>i</em> on every 2<sup><em>i</em></sup>-th one. So in <em>n</em> increments from zero, bit <em>i</em> changes ⌊<em>n</em>/2<sup><em>i</em></sup>⌋ times, and the total is</p>
<p class="math">Σ<sub><em>i</em> ≥ 0</sub> ⌊<em>n</em>/2<sup><em>i</em></sup>⌋ &lt; <em>n</em>(1 + 1/2 + 1/4 + …) = 2<em>n</em></p>
<p>For <em>n</em> = 16 that is 16 + 8 + 4 + 2 + 1 = 31, as computed. So <em>n</em> increments cost less than 2<em>n</em>: amortized cost 2 each.</p>
<p><b>Accounting.</b> Charge each increment 2. Every increment sets exactly one bit to 1; spend 1 on that and leave the other 1 as credit on the bit just set. Then every 1 bit in the counter carries one unit of credit, which pays for clearing it later. The trailing 1s that an increment clears are paid for by their own credit, so the credit never runs out.</p>

<h3>The potential method</h3>
<p>Let <em>D</em><sub>0</sub> be the initial state of the structure and <em>D</em><sub><em>i</em></sub> the state after operation <em>i</em>. Choose a <strong>potential function</strong> Φ (capital phi; in this lesson it is always a potential, not the normal CDF Φ of MATH 230) that maps each state to a real number. Define the amortized cost of operation <em>i</em> as its actual cost plus the change in potential:</p>
<p class="math"><em>â</em><sub><em>i</em></sub> = <em>c</em><sub><em>i</em></sub> + Φ(<em>D</em><sub><em>i</em></sub>) − Φ(<em>D</em><sub><em>i</em>−1</sub>)</p>
<p>Adding these up, the potentials telescope: each Φ(<em>D</em><sub><em>i</em></sub>) appears once with a plus sign and once with a minus sign, except the first and the last.</p>
<p class="math"><em>â</em><sub>1</sub> + … + <em>â</em><sub><em>m</em></sub> = <em>c</em><sub>1</sub> + … + <em>c</em><sub><em>m</em></sub> + Φ(<em>D</em><sub><em>m</em></sub>) − Φ(<em>D</em><sub>0</sub>)</p>
<p>So the total actual cost is the total amortized cost minus the difference Φ(<em>D</em><sub><em>m</em></sub>) − Φ(<em>D</em><sub>0</sub>):</p>
<p class="math"><em>c</em><sub>1</sub> + … + <em>c</em><sub><em>m</em></sub> = <em>â</em><sub>1</sub> + … + <em>â</em><sub><em>m</em></sub> − (Φ(<em>D</em><sub><em>m</em></sub>) − Φ(<em>D</em><sub>0</sub>))</p>
<p>If the potential never falls below its starting value, that difference is at least 0, and the amortized costs bound the actual total. The usual way to arrange this is Φ(<em>D</em><sub>0</sub>) = 0 and Φ ≥ 0 always. More generally, if Φ ≥ 0 always, the total actual cost is at most the total amortized cost plus Φ(<em>D</em><sub>0</sub>).</p>
<p>Think of Φ as energy stored in the structure. A cheap operation that makes the structure "messier" raises the potential a little, which costs it a little extra amortized cost. An expensive operation that tidies up releases potential, which pays for most of its work. The art is choosing Φ to measure exactly the mess that future expensive operations will clean up.</p>
<p>For the counter, the mess is the 1 bits, so let Φ = the number of 1 bits. An increment that clears <em>t</em> trailing 1s changes <em>t</em> + 1 bits (actual cost <em>t</em> + 1), and the number of 1s changes by 1 − <em>t</em> (it loses <em>t</em> and gains one). So</p>
<p class="math"><em>â</em> = (<em>t</em> + 1) + (1 − <em>t</em>) = 2</p>
<p>for every increment, whatever <em>t</em> is. The counter starts at zero with Φ = 0 and Φ is never negative, so <em>n</em> increments cost at most 2<em>n</em>.</p>
<pre><code>b, costs, pots = [], [], [0]
for _ in range(1000):
    costs.append(increment(b))
    pots.append(sum(b))                # potential: the number of 1 bits
am = [c + pots[i + 1] - pots[i] for i, c in enumerate(costs)]
print(sum(costs), set(am))             # 1994 {2}</code></pre>

<h3>Dynamic arrays, again</h3>
<p>Recall the doubling dynamic array: with <em>n</em> items in capacity <em>cap</em>, an append writes one item (cost 1), except when the array is full (<em>n</em> = <em>cap</em>), when it first copies all <em>n</em> items into a new array of capacity 2<em>cap</em> (cost <em>n</em> + 1 in all). Take</p>
<p class="math">Φ = 2<em>n</em> − <em>cap</em></p>
<p>This measures how close the array is to its next copy: just after a doubling, <em>n</em> is about half of <em>cap</em> and Φ is near 0; just before the next one, <em>n</em> = <em>cap</em> and Φ = <em>cap</em>, exactly what the copy will cost.</p>
<ul>
<li>An append without resizing: actual cost 1, <em>n</em> grows by 1, so Φ grows by 2: <em>â</em> = 3.</li>
<li>An append that resizes, with <em>n</em> = <em>cap</em> before: actual cost <em>n</em> + 1. Before, Φ = 2<em>n</em> − <em>n</em> = <em>n</em>. After, there are <em>n</em> + 1 items in capacity 2<em>n</em>, so Φ = 2(<em>n</em> + 1) − 2<em>n</em> = 2. So <em>â</em> = (<em>n</em> + 1) + 2 − <em>n</em> = 3.</li>
</ul>
<p>Starting from <em>n</em> = 0 and <em>cap</em> = 1, Φ(<em>D</em><sub>0</sub>) = −1, and after the first append the array is always at least half full, so Φ ≥ 0 &gt; Φ(<em>D</em><sub>0</sub>). Every append has amortized cost 3, the same answer as CS 201's three coins, but now with no coins to place: the potential is a formula in <em>n</em> and <em>cap</em>.</p>
<p>CS 201 also shrank the array, halving the capacity when a pop leaves it a quarter full. The potential above goes negative when the array is less than half full, so it can't cover that case by itself: as the array empties toward a quarter, something must save up for the copy that halving makes. The second programming problem asks you to find a potential that covers growing and shrinking together, with amortized cost at most 3 for every operation.</p>

<h3>Two famous amortized bounds</h3>
<p>The potential method proves bounds that no simpler argument reaches. Two you should know, stated without proof:</p>
<p><b>Splay trees.</b> A splay tree (Daniel Sleator and Robert Tarjan, 1985) is a binary search tree that stores no balance information at all, unlike the AVL trees of CS 201 Lesson 4. After every access, it moves the accessed node to the root by a particular sequence of rotations (pairs of rotations called zig-zig and zig-zag steps, plus one single rotation if needed). A single access can take Θ(<em>n</em>) time on a tree that has become a long path. But any sequence of <em>m</em> operations on a tree of <em>n</em> nodes takes O((<em>m</em> + <em>n</em>) log <em>n</em>) time: O(log <em>n</em>) amortized per operation. The proof uses the potential</p>
<p class="math">Φ = Σ<sub>nodes <em>x</em></sub> log<sub>2</sub> (number of nodes in the subtree rooted at <em>x</em>)</p>
<p>A long path has high potential (the subtree sizes along it are <em>n</em>, <em>n</em> − 1, …, 1), and splaying a deep node roughly halves the depth of every node on its path, releasing enough potential to pay for the long access. Splay trees also adapt: items accessed often stay near the root, so on skewed workloads they beat balanced trees.</p>
<p><b>Union-find.</b> CS 201 Lesson 8 stated that union by size with path compression performs <em>m</em> operations on <em>n</em> items in O(<em>m</em> α(<em>n</em>)) time, where α is the inverse Ackermann function, at most 4 for any practical <em>n</em>. This is an amortized bound: one find can still follow log<sub>2</sub> <em>n</em> parent pointers, but compressing that path makes later finds cheap. Tarjan's 1975 proof is a potential argument. A simpler one, by John Hopcroft and Jeffrey Ullman in 1973, gives O(<em>m</em> log* <em>n</em>), where log* <em>n</em> ("log star") is the number of times you must apply log<sub>2</sub> to <em>n</em> before the result is at most 1. It is 1 for <em>n</em> = 2, 2 for 4, 3 for 16, 4 for 65,536 and 5 for 2<sup>65,536</sup>.</p>

<h3>What amortized bounds don't promise</h3>
<p>An amortized bound limits the total, not each operation. One append to a dynamic array of a billion items still copies a billion items. Usually that is fine, but not when each operation has a deadline: a game that must draw a frame every 16 milliseconds, a network router forwarding packets, a trading system. There, structures are <em>deamortized</em>: the expensive work is spread out explicitly. A dynamic array can allocate its new array when the old one fills and then copy two old items on each later append, so the copy is finished before the new array fills, and every append is O(1) in the worst case.</p>
<p>Amortized bounds also assume each state is used once, in sequence. If a program can return to an old state and repeat an expensive operation from it (undo, or a persistent structure that keeps old versions, as functional programs do), the stored potential is spent again and again. Take a counter at 2<sup><em>k</em></sup> − 1, all 1s: incrementing it changes <em>k</em> + 1 bits, and a program that keeps a copy of that state and increments the copy <em>m</em> times pays <em>m</em>(<em>k</em> + 1), not 2<em>m</em>.</p>
<p class="note">Why it matters: amortized analysis is how the standard library's structures are designed and documented. Python's list append, hash table insertion, and many tree and heap operations are fast only in the amortized sense. Knowing which guarantee you have tells you when you can rely on it.</p>
`,
    terms: [
      ["Amortized cost", "A cost assigned to each operation so that, for every sequence, the total amortized cost is at least the total actual cost."],
      ["Aggregate method", "Bounding the total cost of any m operations directly and dividing by m."],
      ["Accounting method", "Charging each operation a fixed price and storing the surplus as credit on parts of the structure to pay for later expensive operations."],
      ["Potential function", "A function Φ from states of a data structure to numbers, measuring stored-up credit for future work."],
      ["Potential method", "Defining amortized cost as actual cost plus the change in Φ; the total is then exact up to Φ(final) − Φ(initial)."],
      ["Telescoping sum", "A sum in which consecutive terms cancel, leaving only the first and last."],
      ["Splay tree", "A self-adjusting binary search tree that moves each accessed node to the root; O(log n) amortized per operation."],
      ["log*", "The iterated logarithm: how many times log₂ must be applied to n before the result is at most 1."],
      ["Deamortization", "Spreading an expensive operation's work over many operations so that each has a worst-case bound."]
    ],
    quiz: [
      { q: "A binary counter starts at 0 and is incremented 64 times. How many bits change in total?", choices: ["64", "128", "127", "384"], answer: 2, why: "Bit i changes ⌊64/2^i⌋ times: 64 + 32 + 16 + 8 + 4 + 2 + 1 = 127, which is less than 2 × 64." },
      { q: "In the potential method, when are the amortized costs guaranteed to bound the total actual cost?", choices: ["When Φ never falls below its initial value", "Always", "When Φ is increasing", "When every operation has the same actual cost"], answer: 0, why: "Total actual = total amortized − (Φ(final) − Φ(initial)), so we need Φ(final) ≥ Φ(initial), for every prefix of every sequence." },
      { q: "An increment of the binary counter clears 6 trailing 1s. With Φ = the number of 1 bits, what is its amortized cost?", choices: ["7", "1", "−4", "2"], answer: 3, why: "Actual cost 7, and the number of 1s changes by 1 − 6 = −5: 7 − 5 = 2." },
      { q: "A doubling dynamic array holds 8 items in capacity 8. With Φ = 2n − cap, what is the amortized cost of the next append?", choices: ["9", "3", "1", "17"], answer: 1, why: "Actual cost 9 (copy 8, write 1). Φ goes from 8 to 2 × 9 − 16 = 2, a change of −6: 9 − 6 = 3." },
      { q: "Which statement about splay trees is true?", choices: ["Every operation takes O(log n) time", "They store a height in every node", "Any sequence of m operations takes O((m + n) log n) time, though one operation can take Θ(n)", "They are faster than AVL trees on every input"], answer: 2, why: "The bound is amortized: one access to a deep node can take linear time, but it flattens the path and pays for itself." },
      { q: "Why might a real-time system avoid a structure with only an amortized O(1) bound?", choices: ["A single operation can still be very slow, missing a deadline", "Amortized bounds are only averages over random inputs", "Amortized structures use more memory", "Amortized bounds don't hold for long sequences"], answer: 0, why: "The bound limits the total over a sequence, not each operation; deamortized structures bound every operation." }
    ],
    practice: [
      {
        q: `<p>A stack supports <code>push(x)</code> (cost 1), <code>pop()</code> (cost 1) and <code>multipop(k)</code>, which pops min(<em>k</em>, size) items at cost min(<em>k</em>, size). One multipop can cost as much as the stack's size. Show with a potential function that any sequence of <em>m</em> operations starting from an empty stack costs at most 2<em>m</em>.</p>`,
        a: `<p>Let Φ = the number of items on the stack. It starts at 0 and is never negative. A push costs 1 and raises Φ by 1: amortized 2. A pop costs 1 and lowers Φ by 1: amortized 0. A multipop that removes <em>j</em> items costs <em>j</em> and lowers Φ by <em>j</em>: amortized 0. Every operation has amortized cost at most 2, so <em>m</em> operations cost at most 2<em>m</em>. (In words: an item can be popped only once after being pushed, so pops can't outnumber pushes.)</p>`
      },
      {
        q: `<p>Add a <code>decrement</code> operation to the binary counter (turn trailing 0s into 1s and the first 1 into a 0, removing a leading 0 bit if one is left over). Show a sequence of <em>n</em> operations that costs Θ(<em>n</em> log <em>n</em>), so no potential function can give O(1) amortized cost to both operations.</p>`,
        a: `<p>Start by incrementing to 2<sup><em>k</em></sup> − 1, which is <em>k</em> 1s (this takes 2<sup><em>k</em></sup> − 1 increments). Then alternate increment and decrement. The increment turns <em>k</em> 1s into 0s and appends a 1, changing <em>k</em> + 1 bits; the decrement turns the <em>k</em> 0s back into 1s and the top 1 into a 0, which is then removed: <em>k</em> + 1 bit changes again. With <em>n</em> = 2 · 2<sup><em>k</em></sup> operations in all, the alternating half costs about 2<sup><em>k</em></sup>(<em>k</em> + 1) = Θ(<em>n</em> log <em>n</em>). A valid potential would bound this total by O(<em>n</em>) plus Φ(<em>D</em><sub>0</sub>) − Φ(<em>D</em><sub><em>n</em></sub>), and with Φ(<em>D</em><sub>0</sub>) = 0 and Φ ≥ 0 that is O(<em>n</em>), a contradiction. The structure gets back into an expensive state too cheaply.</p>`
      },
      {
        q: `<p>A dynamic array <em>triples</em> its capacity when full (copying <em>n</em> items, then writing one). Find constants <em>a</em> and <em>b</em> so that Φ = <em>an</em> − <em>b</em> · <em>cap</em> gives every append the same amortized cost, and Φ ≥ 0 once the array is non-empty. What is that cost?</p>`,
        a: `<p>A plain append costs 1 and changes Φ by <em>a</em>: amortized 1 + <em>a</em>. A resize with <em>n</em> = <em>cap</em> costs <em>cap</em> + 1, and Φ changes by <em>a</em> (one more item) − <em>b</em>(3<em>cap</em> − <em>cap</em>) = <em>a</em> − 2<em>b</em> · <em>cap</em>. For this not to grow with <em>cap</em>, take <em>b</em> = 1/2; then the resize's amortized cost is also 1 + <em>a</em>. Just after a resize, <em>n</em> = <em>cap</em>/3 + 1, so Φ ≥ 0 needs <em>a</em> · <em>cap</em>/3 ≥ <em>cap</em>/2, that is <em>a</em> ≥ 3/2. With Φ = 1.5<em>n</em> − 0.5<em>cap</em>, every append costs 2.5 amortized: tripling copies less often than doubling, but wastes more space.</p>`
      },
      {
        q: `<p>A queue is built from two Python lists used as stacks, <code>inbox</code> and <code>outbox</code>. <code>enqueue(x)</code> pushes onto <code>inbox</code>. <code>dequeue()</code> pops from <code>outbox</code>; if <code>outbox</code> is empty, it first moves every item of <code>inbox</code> to <code>outbox</code> (pop then push, cost 2 per item). Count each push or pop as 1. Prove that every operation is O(1) amortized.</p>`,
        a: `<p>Let Φ = 2 × len(inbox): each item waiting in the inbox will cost 2 to move. Φ starts at 0 and is never negative. Enqueue: cost 1, Φ rises by 2, amortized 3. A dequeue with a non-empty outbox: cost 1, Φ unchanged, amortized 1. A dequeue that first moves <em>t</em> items: cost 2<em>t</em> + 1, and Φ falls from 2<em>t</em> to 0, so amortized 1. So <em>m</em> operations cost at most 3<em>m</em>.</p>
<pre><code>inbox, outbox, cost = [], [], 0
for i in range(100):
    inbox.append(i); cost += 1
    if i % 3 == 2:                     # dequeue after every third enqueue
        if not outbox:
            while inbox:
                outbox.append(inbox.pop()); cost += 2
        outbox.pop(); cost += 1
print(cost, 3 * (100 + 33))            # 211 399</code></pre>`
      }
    ],
    sources: ["clrs", "jeffe", "sleatortarjan85"]
  },
  {
    id: "aa2",
    title: "Randomized algorithms",
    minutes: 90,
    summary: "Algorithms that flip coins: Las Vegas versus Monte Carlo, randomized quicksort's expected comparisons derived exactly, linear-time randomized selection, Karger's minimum cut and amplification by repetition, universal hashing with the Carter–Wegman family, and the tail bounds (Markov, Chebyshev, Chernoff) that turn expectations into guarantees.",
    notes: `
<p>A <strong>randomized algorithm</strong> makes random choices as it runs. The input is still arbitrary, even chosen by an adversary; the randomness is the algorithm's own, like shuffling a deck before dealing. Its running time or its answer becomes a random variable, and we prove bounds that hold for <em>every</em> input, in expectation or with high probability. This lesson uses tools from MATH 121 Lesson 7 (indicator variables and linearity of expectation) and MATH 230 Lesson 5 (Markov's and Chebyshev's inequalities).</p>

<h3>Las Vegas and Monte Carlo</h3>
<p>There are two kinds of randomized algorithm:</p>
<ul>
<li>A <strong>Las Vegas</strong> algorithm always returns a correct answer, but its running time is random. Randomized quicksort is one: the output is always sorted, and the number of comparisons depends on the pivots.</li>
<li>A <strong>Monte Carlo</strong> algorithm runs within a fixed time bound but may return a wrong answer, with small probability. Karger's min-cut algorithm below is one.</li>
</ul>
<p>Each can be turned into the other in common cases. A Las Vegas algorithm with expected time <em>T</em> can be stopped after 2<em>T</em> steps: by Markov's inequality (P(<em>X</em> ≥ <em>a</em>) ≤ E[<em>X</em>]/<em>a</em> for <em>X</em> ≥ 0), it is still running with probability at most 1/2, so stopping and reporting "don't know" gives a Monte Carlo algorithm. Conversely, if answers can be checked quickly, a Monte Carlo algorithm can be rerun until its answer passes the check.</p>

<h3>Randomized quicksort, counted exactly</h3>
<p>MATH 121 Lesson 7 sketched why randomized quicksort makes about 2<em>n</em> ln <em>n</em> comparisons on average. Here is the full calculation. Call the items in sorted order <em>z</em><sub>1</sub> &lt; <em>z</em><sub>2</sub> &lt; … &lt; <em>z</em><sub><em>n</em></sub> (assume they are distinct). Two items are compared at most once, since comparisons are always with the current pivot, which is then set aside. Let <em>X</em><sub><em>ij</em></sub> be the indicator that <em>z</em><sub><em>i</em></sub> and <em>z</em><sub><em>j</em></sub> are compared (<em>i</em> &lt; <em>j</em>). They stay in the same part until some pivot from the block <em>z</em><sub><em>i</em></sub>, …, <em>z</em><sub><em>j</em></sub> is chosen. If that first pivot is <em>z</em><sub><em>i</em></sub> or <em>z</em><sub><em>j</em></sub>, they are compared; if it is strictly between them, they are split apart and never compared. Each of the <em>j</em> − <em>i</em> + 1 block items is equally likely to be first, so P(<em>X</em><sub><em>ij</em></sub> = 1) = 2/(<em>j</em> − <em>i</em> + 1). By linearity, the expected number of comparisons is</p>
<p class="math">E[<em>C</em>] = Σ<sub><em>i</em> &lt; <em>j</em></sub> 2/(<em>j</em> − <em>i</em> + 1)</p>
<p>Group the pairs by their distance <em>d</em> = <em>j</em> − <em>i</em>, from 1 to <em>n</em> − 1: there are <em>n</em> − <em>d</em> pairs at distance <em>d</em>. Writing <em>k</em> = <em>d</em> + 1, which runs from 2 to <em>n</em>, there are <em>n</em> + 1 − <em>k</em> pairs, each contributing 2/<em>k</em>:</p>
<p class="math">E[<em>C</em>] = Σ<sub><em>k</em>=2</sub><sup><em>n</em></sup> (<em>n</em> + 1 − <em>k</em>) · 2/<em>k</em> = 2(<em>n</em> + 1) Σ<sub><em>k</em>=2</sub><sup><em>n</em></sup> 1/<em>k</em> − 2(<em>n</em> − 1) = 2(<em>n</em> + 1)(<em>H</em><sub><em>n</em></sub> − 1) − 2(<em>n</em> − 1)</p>
<p>which simplifies to 2(<em>n</em> + 1)<em>H</em><sub><em>n</em></sub> − 4<em>n</em>, where <em>H</em><sub><em>n</em></sub> = 1 + 1/2 + … + 1/<em>n</em> ≈ ln <em>n</em> + 0.577 is the harmonic number. So E[<em>C</em>] ≈ 2<em>n</em> ln <em>n</em> ≈ 1.39 <em>n</em> log<sub>2</sub> <em>n</em>.</p>
<pre><code>import random

def H(n):
    return sum(1 / k for k in range(1, n + 1))

def expected_comparisons(n):
    return 2 * (n + 1) * H(n) - 4 * n

def quicksort_comparisons(xs, rng):
    if len(xs) &lt;= 1:
        return 0
    p = rng.choice(xs)
    smaller = [x for x in xs if x &lt; p]
    larger = [x for x in xs if x > p]
    return len(xs) - 1 + quicksort_comparisons(smaller, rng) + quicksort_comparisons(larger, rng)

n = 10
print(round(sum(2 / (j - i + 1) for i in range(1, n + 1) for j in range(i + 1, n + 1)), 4))   # 24.4373
print(round(expected_comparisons(n), 4))       # 24.4373
rng = random.Random(1)
runs = [quicksort_comparisons(list(range(1000)), rng) for _ in range(200)]
print(round(expected_comparisons(1000)), round(sum(runs) / 200))   # 10986 11002</code></pre>
<p>(Each call compares the <code>len(xs) − 1</code> other items with the pivot once.) The average over 200 runs on an already-sorted list, the worst input for a first-item pivot, is within 0.2% of the formula.</p>

<h3>Randomized selection</h3>
<p>To find the <em>k</em>-th smallest of <em>n</em> items (the median, say), quickselect partitions around a random pivot exactly as quicksort does, then recurses into only the side that contains the answer. Its expected time is linear. Call a pivot <em>good</em> if it lies in the middle half of the current items (between the 25th and 75th percentiles); then each side has at most 3/4 of the items. A pivot is good with probability 1/2, so the expected number of partitions until a good one is 2 (the mean of a geometric distribution with <em>p</em> = 1/2). Group the run into phases: phase <em>j</em> lasts while the current size is between (3/4)<sup><em>j</em>+1</sup><em>n</em> and (3/4)<sup><em>j</em></sup><em>n</em>. A good pivot ends a phase, so each phase has at most 2 partitions on average, each costing at most (3/4)<sup><em>j</em></sup><em>n</em> comparisons. By linearity, the expected total is at most</p>
<p class="math">Σ<sub><em>j</em> ≥ 0</sub> 2 (3/4)<sup><em>j</em></sup> <em>n</em> = 2<em>n</em> · 1/(1 − 3/4) = 8<em>n</em></p>
<p>The careful constant for the median is about 3.39<em>n</em>. A deterministic linear-time selection algorithm exists (median of medians, 1973), but it is slower in practice; randomization buys simplicity.</p>

<h3>Karger's minimum cut</h3>
<p>A <strong>cut</strong> of a connected undirected graph splits its vertices into two non-empty sides; its size is the number of edges between the sides. A <strong>minimum cut</strong> is a smallest one: the fewest links whose failure disconnects a network. (CS 220 Lesson 7's min cuts separate a given <em>s</em> from a given <em>t</em>; here any split counts. One way to find it is <em>n</em> − 1 max-flow computations: fix any vertex <em>s</em>; a minimum cut has some vertex <em>t</em> on the side away from <em>s</em>, so the smallest of the minimum <em>s</em>–<em>t</em> cuts, one for each of the other <em>n</em> − 1 vertices <em>t</em>, is a minimum cut.) David Karger's 1993 algorithm is strikingly simple. To <strong>contract</strong> an edge (<em>u</em>, <em>v</em>), merge <em>u</em> and <em>v</em> into one vertex, keeping all their other edges (so parallel edges can appear: this is a <strong>multigraph</strong>) and deleting edges between <em>u</em> and <em>v</em>, which would become self-loops. Karger's algorithm contracts a uniformly random edge, again and again, until two vertices remain, and returns the edges between them. Each final vertex stands for a group of original vertices, so this is a cut of the original graph.</p>
<p><b>Why it often works.</b> Fix a minimum cut <em>C</em> of size <em>c</em>. The algorithm returns <em>C</em> if it never contracts one of <em>C</em>'s edges. Contracting other edges never destroys a cut, so throughout, the current multigraph's minimum cut is still <em>c</em>, and every vertex has degree at least <em>c</em> (its own edges form a cut). With <em>r</em> vertices left there are at least <em>rc</em>/2 edges (each edge has two ends), so the random edge is in <em>C</em> with probability at most <em>c</em>/(<em>rc</em>/2) = 2/<em>r</em>. Surviving all contractions, as <em>r</em> runs from <em>n</em> down to 3, has probability at least</p>
<p class="math">(1 − 2/<em>n</em>)(1 − 2/(<em>n</em> − 1)) ⋯ (1 − 2/3) = ((<em>n</em> − 2)/<em>n</em>) · ((<em>n</em> − 3)/(<em>n</em> − 1)) ⋯ (1/3) = 2/(<em>n</em>(<em>n</em> − 1)) = 1/C(<em>n</em>, 2)</p>
<p>The product telescopes: each numerator cancels the denominator two factors later, leaving 2 · 1 on top and <em>n</em>(<em>n</em> − 1) below.</p>
<p><b>Amplification.</b> One success in C(<em>n</em>, 2) is poor odds, but independent runs multiply failure probabilities. Run it <em>T</em> times and keep the smallest cut. All runs fail with probability at most (1 − 1/C(<em>n</em>, 2))<sup><em>T</em></sup>. Since 1 − <em>x</em> ≤ <em>e</em><sup>−<em>x</em></sup> for every <em>x</em> (the tangent line of <em>e</em><sup>−<em>x</em></sup> at 0 lies below the curve), choosing <em>T</em> = C(<em>n</em>, 2) ln(1/<em>δ</em>) gives failure probability at most <em>e</em><sup>−ln(1/<em>δ</em>)</sup> = <em>δ</em>. For <em>n</em> = 10 and <em>δ</em> = 10<sup>−6</sup>, that is ⌈45 × 13.82⌉ = 622 runs. One run takes O(<em>n</em><sup>2</sup>) time if the multigraph is kept as an <em>n</em> × <em>n</em> matrix of edge multiplicities, with each vertex's row total: picking a uniformly random edge means picking a vertex with probability proportional to its row total and then a neighbour in proportion to the multiplicities, O(<em>n</em>); contracting <em>u</em> and <em>v</em> adds row and column <em>v</em> into <em>u</em>'s and zeroes the diagonal entry, O(<em>n</em>); and there are <em>n</em> − 2 contractions. So the total is O(<em>n</em><sup>4</sup> log(1/<em>δ</em>)), which is O(<em>n</em><sup>4</sup> log <em>n</em>) for the usual choice <em>δ</em> = 1/<em>n</em> (or any 1/<em>n</em><sup><em>c</em></sup>). Karger and Clifford Stein improved this to O(<em>n</em><sup>2</sup> log<sup>3</sup> <em>n</em>) by observing that failures happen mostly near the end, when few vertices remain, so they repeat only the late stages.</p>
<p>A bonus from the proof: each particular minimum cut survives with probability at least 1/C(<em>n</em>, 2), and these events are disjoint (one run returns one cut), so a graph has at most C(<em>n</em>, 2) minimum cuts.</p>

<h3>Universal hashing</h3>
<p>CS 201 Lesson 3 analyzed hash tables under the assumption that keys spread like random throws, and saw hash flooding exploit any fixed hash function. In fact every fixed function <em>h</em> from a universe <em>U</em> of keys to <em>m</em> slots has bad inputs: by the pigeonhole principle some slot receives at least |<em>U</em>|/<em>m</em> keys, and an input made of those keys puts everything in one chain. The randomized fix, from Larry Carter and Mark Wegman (1979), is to choose <em>h</em> at random from a family when the table is created. A family <em>H</em> is <strong>universal</strong> if for every two distinct keys <em>x</em> ≠ <em>y</em>,</p>
<p class="math">P<sub><em>h</em> ∈ <em>H</em></sub>[<em>h</em>(<em>x</em>) = <em>h</em>(<em>y</em>)] ≤ 1/<em>m</em></p>
<p>That is all a chained table needs. With <em>n</em> keys stored, the expected number of other keys sharing <em>x</em>'s slot is a sum of <em>n</em> − 1 indicators, each with expectation at most 1/<em>m</em>, so at most (<em>n</em> − 1)/<em>m</em>, for every set of keys. The probability is over the choice of <em>h</em>, which the adversary doesn't know.</p>
<p><b>A universal family.</b> Pick a prime <em>p</em> larger than every key, so keys are in {0, …, <em>p</em> − 1}. For 1 ≤ <em>a</em> ≤ <em>p</em> − 1 and 0 ≤ <em>b</em> ≤ <em>p</em> − 1, let</p>
<p class="math"><em>h</em><sub><em>a</em>,<em>b</em></sub>(<em>x</em>) = ((<em>ax</em> + <em>b</em>) mod <em>p</em>) mod <em>m</em></p>
<p><b>Proof.</b> Fix <em>x</em> ≠ <em>y</em> and let <em>r</em> = (<em>ax</em> + <em>b</em>) mod <em>p</em> and <em>s</em> = (<em>ay</em> + <em>b</em>) mod <em>p</em>. Then <em>r</em> − <em>s</em> ≡ <em>a</em>(<em>x</em> − <em>y</em>) (mod <em>p</em>), which is not 0 because <em>p</em> is prime and divides neither <em>a</em> nor <em>x</em> − <em>y</em>; so <em>r</em> ≠ <em>s</em>. Conversely, for any pair <em>r</em> ≠ <em>s</em>, exactly one (<em>a</em>, <em>b</em>) produces it: <em>a</em> = (<em>r</em> − <em>s</em>)(<em>x</em> − <em>y</em>)<sup>−1</sup> mod <em>p</em> (an inverse exists mod a prime, MATH 121 Lesson 4) and then <em>b</em> = (<em>r</em> − <em>ax</em>) mod <em>p</em>. So the <em>p</em>(<em>p</em> − 1) choices of (<em>a</em>, <em>b</em>) correspond one to one with the <em>p</em>(<em>p</em> − 1) ordered pairs (<em>r</em>, <em>s</em>) with <em>r</em> ≠ <em>s</em>, and a random (<em>a</em>, <em>b</em>) gives a uniformly random such pair. The keys collide exactly when <em>r</em> ≡ <em>s</em> (mod <em>m</em>). For each <em>r</em>, the values <em>s</em> in {0, …, <em>p</em> − 1} with <em>s</em> ≡ <em>r</em> (mod <em>m</em>) number at most ⌈<em>p</em>/<em>m</em>⌉, one of which is <em>r</em> itself, leaving at most ⌈<em>p</em>/<em>m</em>⌉ − 1 ≤ (<em>p</em> − 1)/<em>m</em> choices out of the <em>p</em> − 1 possible <em>s</em> ≠ <em>r</em>. (The inequality: <em>p</em>/<em>m</em> is a whole number of <em>m</em>-ths, so rounding it up to an integer adds at most (<em>m</em> − 1)/<em>m</em>; thus ⌈<em>p</em>/<em>m</em>⌉ ≤ (<em>p</em> + <em>m</em> − 1)/<em>m</em>, and subtracting 1 gives (<em>p</em> − 1)/<em>m</em>.) So the collision probability is at most 1/<em>m</em>.</p>
<pre><code>from fractions import Fraction

p, m, x, y = 17, 5, 1, 2
hits = sum(((a * x + b) % p) % m == ((a * y + b) % p) % m for a in range(1, p) for b in range(p))
print(Fraction(hits, (p - 1) * p), round(hits / ((p - 1) * p), 3))   # 21/136 0.154</code></pre>
<p>The keys 1 and 2 collide for 42 of the 272 hash functions, a fraction of 0.154, below 1/5.</p>

<h3>Tail bounds</h3>
<p>An expectation alone doesn't say how often an algorithm does badly. MATH 230 Lesson 5 gave two bounds on the chance of being far from the mean. <strong>Markov</strong>: for <em>X</em> ≥ 0, P(<em>X</em> ≥ <em>a</em>) ≤ E[<em>X</em>]/<em>a</em>; so quicksort uses at least 10 times its expected comparisons with probability at most 1/10. <strong>Chebyshev</strong>: P(|<em>X</em> − <em>μ</em>| ≥ <em>kσ</em>) ≤ 1/<em>k</em><sup>2</sup>, which needs the variance. For sums of <em>independent</em> pieces, much sharper bounds hold. MATH 230 met Hoeffding's inequality for averages; here is the form most used for algorithms.</p>
<p><b>Chernoff bounds.</b> Let <em>X</em> be a sum of independent random variables, each 0 or 1, with <em>μ</em> = E[<em>X</em>]. Then for 0 &lt; <em>δ</em> ≤ 1,</p>
<p class="math">P(<em>X</em> ≥ (1 + <em>δ</em>)<em>μ</em>) ≤ exp(−<em>δ</em>²<em>μ</em>/3)&nbsp;&nbsp;&nbsp;and&nbsp;&nbsp;&nbsp;P(<em>X</em> ≤ (1 − <em>δ</em>)<em>μ</em>) ≤ exp(−<em>δ</em>²<em>μ</em>/2)</p>
<p>Here exp(<em>z</em>) means <em>e</em><sup><em>z</em></sup>, and the whole of −<em>δ</em>²<em>μ</em>/3 is the exponent.</p>
<p>The probability of a fixed relative deviation falls <em>exponentially</em> in <em>μ</em>, where Chebyshev's falls only like 1/<em>μ</em>. (The proof applies Markov's inequality to <em>e</em><sup><em>tX</em></sup>, which factors into a product over the independent pieces. Kleinberg and Tardos's <em>Algorithm Design</em>, Section 13.9, gives the whole proof, with a slightly sharper bound for the upper tail from which this one follows.)</p>
<p><b>Example: majority vote.</b> A Monte Carlo algorithm for a yes/no question is right with probability 2/3, whatever the input. Run it <em>t</em> times independently and output the majority answer. Let <em>X</em> be the number of correct runs; it is a sum of <em>t</em> independent indicators, with <em>μ</em> = 2<em>t</em>/3 (if the success probability is higher, the vote only does better). The majority is wrong only if <em>X</em> ≤ <em>t</em>/2 = (1 − 1/4)<em>μ</em>. Chernoff with <em>δ</em> = 1/4 gives</p>
<p class="math">P(wrong) ≤ <em>e</em><sup>−(1/16)(2<em>t</em>/3)/2</sup> = <em>e</em><sup>−<em>t</em>/48</sup></p>
<p>Chebyshev, with variance <em>t</em> · (2/3)(1/3) = 2<em>t</em>/9 and deviation <em>t</em>/6, gives only (2<em>t</em>/9)/(<em>t</em>/6)<sup>2</sup> = 8/<em>t</em>.</p>
<pre><code>import math

def majority_wrong(t, p=2/3):          # exact: P(at most t/2 of t runs are right)
    return sum(math.comb(t, k) * p**k * (1 - p)**(t - k) for k in range(t // 2 + 1))

for t in (101, 663):
    print(t, f"{majority_wrong(t):.1e}", f"{math.exp(-t / 48):.1e}", f"{8 / t:.1e}")
# 101 2.7e-04 1.2e-01 7.9e-02
# 663 4.8e-19 1.0e-06 1.2e-02</code></pre>
<p>Both bounds are loose compared with the exact value, and for small <em>t</em> Chebyshev's is even the better of the two. But Chernoff's has the right shape: each extra 48 runs divides the bound by <em>e</em>, so 663 runs push it to one in a million, while Chebyshev's needs 8 million runs for the same guarantee. Results stated "with high probability" in algorithms papers are usually Chernoff bounds.</p>
<p class="note">Why it matters: randomization gives algorithms that are simpler than any known deterministic ones (min cut), defeats adversarial inputs (hashing, quicksort), and, with amplification and tail bounds, makes failure probabilities smaller than the chance of a hardware error.</p>
`,
    terms: [
      ["Randomized algorithm", "An algorithm that makes random choices; its bounds hold for every input, over the algorithm's own randomness."],
      ["Las Vegas algorithm", "A randomized algorithm that is always correct but whose running time is random."],
      ["Monte Carlo algorithm", "A randomized algorithm with bounded running time that may be wrong with small probability."],
      ["Cut", "A split of a graph's vertices into two non-empty sides; its size is the number of edges between them."],
      ["Contraction", "Merging the two ends of an edge into one vertex, keeping their other edges and dropping self-loops."],
      ["Amplification", "Repeating a randomized algorithm independently to make its failure probability as small as desired."],
      ["Universal hash family", "A set of hash functions in which any two distinct keys collide with probability at most 1/m for a random member."],
      ["Chernoff bound", "An exponentially small bound on the probability that a sum of independent 0/1 variables deviates from its mean by a constant factor."]
    ],
    quiz: [
      { q: "Randomized quicksort always returns a sorted list, but its number of comparisons varies. What kind of algorithm is it?", choices: ["Las Vegas", "Monte Carlo", "Deterministic", "Approximation"], answer: 0, why: "Las Vegas algorithms are always correct, with random running time." },
      { q: "In randomized quicksort, what is the probability that the smallest and largest of n items are compared?", choices: ["1/2", "1/n", "2/(n − 1)", "2/n"], answer: 3, why: "They are compared only if one of them is the first pivot chosen from the whole block of n items: probability 2/n." },
      { q: "A graph has 6 vertices. What lower bound does the analysis give on the probability that one run of Karger's algorithm finds a particular minimum cut?", choices: ["1/6", "1/15", "1/30", "1/36"], answer: 1, why: "2/(n(n − 1)) = 2/30 = 1/15, that is 1/C(6, 2)." },
      { q: "How many independent runs of Karger's algorithm make the failure probability at most δ, by the notes' argument?", choices: ["C(n, 2)", "n ln(1/δ)", "C(n, 2) · ln(1/δ)", "1/δ"], answer: 2, why: "(1 − 1/C(n,2))^T ≤ e^(−T/C(n,2)), which is δ when T = C(n,2) ln(1/δ)." },
      { q: "What does it mean for a family of hash functions to be universal?", choices: ["Every function in it is a bijection", "For any two distinct keys, a random member of the family makes them collide with probability at most 1/m", "It works for every key type", "No two keys ever collide"], answer: 1, why: "That pairwise condition is all chaining needs for expected chain length at most 1 + (n − 1)/m." },
      { q: "Why are Chernoff bounds much stronger than Chebyshev's inequality for sums of independent 0/1 variables?", choices: ["They use the variance", "They apply to any distribution", "They give exact probabilities", "Their bound falls exponentially in the mean, not like its reciprocal"], answer: 3, why: "For a fixed relative deviation, Chernoff gives e^(−cμ) where Chebyshev gives about 1/μ." }
    ],
    practice: [
      {
        q: `<p>Compute the expected number of comparisons of randomized quicksort on 4 distinct items in two ways: from the sum over pairs, and from 2(<em>n</em> + 1)<em>H</em><sub><em>n</em></sub> − 4<em>n</em>.</p>`,
        a: `<p>Pairs at distance 1 (three of them) contribute 2/2 each, pairs at distance 2 (two) contribute 2/3 each, and the one pair at distance 3 contributes 2/4: 3 + 4/3 + 1/2 = 29/6 ≈ 4.833. The formula: <em>H</em><sub>4</sub> = 25/12, so 2 · 5 · 25/12 − 16 = 125/6 − 96/6 = 29/6.</p>
<pre><code>print(round(expected_comparisons(4), 4))   # 4.8333</code></pre>`
      },
      {
        q: `<p>Run Karger's analysis on the cycle with <em>n</em> vertices. What is its minimum cut, how many minimum cuts does it have, and what does that say about the bound 1/C(<em>n</em>, 2)?</p>`,
        a: `<p>Removing any two of the <em>n</em> edges splits the cycle into two paths, and removing one edge leaves it connected, so the minimum cut is 2. Each pair of edges gives a different split, so there are C(<em>n</em>, 2) minimum cuts. Contraction always ends with two vertices joined by 2 edges, so every run finds <em>some</em> minimum cut, and by symmetry each one is equally likely: exactly 1/C(<em>n</em>, 2). So the bound for a particular cut is tight, and the cycle shows that a graph can have as many as C(<em>n</em>, 2) minimum cuts.</p>`
      },
      {
        q: `<p>How many runs of Karger's algorithm does the notes' bound require for a 50-vertex graph with failure probability at most 0.001? If one run takes 2 milliseconds, how long is that?</p>`,
        a: `<p>C(50, 2) = 1225 and ln 1000 ≈ 6.908, so <em>T</em> = ⌈1225 × 6.908⌉ = 8463 runs, about 17 seconds.</p>
<pre><code>import math
T = math.ceil(math.comb(50, 2) * math.log(1000))
print(T, round(T * 0.002, 1))              # 8463 16.9</code></pre>`
      },
      {
        q: `<p>A Las Vegas algorithm has expected running time <em>T</em> on every input. Design a procedure that always returns the correct answer and finishes within 3<em>kT</em> steps except with probability at most 3<sup>−<em>k</em></sup>.</p>`,
        a: `<p>Run the algorithm for at most 3<em>T</em> steps. By Markov's inequality it hasn't finished with probability at most <em>T</em>/(3<em>T</em>) = 1/3. If it hasn't, restart it with fresh random choices, up to <em>k</em> attempts. The attempts are independent, so all <em>k</em> fail with probability at most (1/3)<sup><em>k</em></sup>. If they all fail, keep running the last attempt to completion: the answer is still correct, and only the time bound is missed.</p>`
      }
    ],
    sources: ["clrs", "jeffe", "karger96", "carterwegman79", "kleinberg", "mit6854"]
  },
  {
    id: "aa3",
    title: "Approximation algorithms",
    minutes: 90,
    summary: "Provably near-optimal answers to NP-hard problems: approximation ratios and the lower-bound technique, vertex cover revisited, greedy set cover and its H_n bound with a bad example, metric TSP within twice the optimum via a minimum spanning tree, a fully polynomial-time approximation scheme for knapsack, and an outline of what can't be approximated.",
    notes: `
<p>CS 220 Lesson 8 ended with ways to cope with NP-hard problems, one of which was to give up exactness but keep a guarantee: the vertex cover algorithm that takes both ends of uncovered edges is never worse than twice the optimum. This lesson turns that example into a method. The hard part of an approximation proof is that we can't compute the optimum we are comparing against; the method is to compare against something we <em>can</em> compute that is provably no better than the optimum.</p>

<h3>Approximation ratios</h3>
<p>Let OPT(<em>I</em>) be the value of an optimal solution for input <em>I</em>, and ALG(<em>I</em>) the value of the solution an algorithm returns. For a minimization problem, an algorithm is a <strong>ρ-approximation</strong> (ρ ≥ 1, read "rho") if it runs in polynomial time and, for every input,</p>
<p class="math">ALG(<em>I</em>) ≤ ρ · OPT(<em>I</em>)</p>
<p>For a maximization problem, it is a ρ-approximation if ALG(<em>I</em>) ≥ OPT(<em>I</em>)/ρ. (Some books write maximization ratios as numbers below 1, such as "a 1/2-approximation"; the meaning is the same.) The guarantee is worst case over all inputs, like a running-time bound.</p>
<p>Recall the vertex cover proof. The algorithm picks edges that share no endpoints (a <strong>matching</strong> <em>M</em>) and takes both ends of each, so ALG = 2|<em>M</em>|. Every cover must contain an end of each edge of <em>M</em>, and no vertex is an end of two of them, so OPT ≥ |<em>M</em>|. Together, ALG ≤ 2 OPT. The matching is the computable lower bound. The factor 2 is tight for this algorithm: on a graph that is a single edge, it takes both ends where one suffices. And the argument needs every vertex to cost the same; for weighted vertex cover, Lesson 4 gets a factor 2 another way.</p>

<h3>Greedy set cover</h3>
<p>In the <strong>set cover</strong> problem, we have a universe <em>U</em> of <em>n</em> elements and a list of subsets <em>S</em><sub>1</sub>, …, <em>S</em><sub><em>k</em></sub> of it whose union is <em>U</em>. Choose as few of the subsets as possible whose union is still <em>U</em>. Examples: the fewest tests that together execute every line of a program; the fewest fire stations so that every street is within five minutes of one. Vertex cover is the special case where the elements are the edges and each vertex gives the set of its edges. Set cover is NP-hard.</p>
<p>The natural greedy algorithm: repeatedly choose the set that covers the most elements not yet covered, until all are covered.</p>
<p><b>Theorem.</b> Greedy uses at most <em>H</em><sub><em>n</em></sub> · OPT sets, where <em>H</em><sub><em>n</em></sub> = 1 + 1/2 + … + 1/<em>n</em> ≤ ln <em>n</em> + 1.</p>
<p><b>Proof by charging.</b> Spread the cost of each chosen set evenly over the elements it newly covers: if the greedy choice covers <em>j</em> new elements, each pays 1/<em>j</em>. The total paid is exactly the number of sets greedy chose. Now order the elements by the time they are covered, and consider the moment just before some element <em>e</em> is covered, when <em>r</em> elements remain uncovered (<em>e</em> among them). The optimal solution's OPT sets cover all of <em>U</em>, so in particular they cover these <em>r</em> elements, and one of them must contain at least <em>r</em>/OPT of them (if each held fewer, together they would cover fewer than <em>r</em>). Greedy chooses a set covering at least as many new elements as that one, so <em>j</em> ≥ <em>r</em>/OPT and <em>e</em> pays at most OPT/<em>r</em>. The first element covered had <em>r</em> = <em>n</em>, the next <em>r</em> ≥ <em>n</em> − 1, and so on down to <em>r</em> ≥ 1 for the last, so the total is at most</p>
<p class="math">OPT · (1/<em>n</em> + 1/(<em>n</em> − 1) + … + 1/1) = <em>H</em><sub><em>n</em></sub> · OPT</p>
<p><b>Greedy can really be this bad.</b> Take two rows of 7 elements, <em>A</em> = {1, …, 7} and <em>B</em> = {8, …, 14}, and offer the sets <em>A</em>, <em>B</em>, and three sets that each take equal halves from both rows: <em>S</em><sub>1</sub> with 4 + 4 elements, <em>S</em><sub>2</sub> with 2 + 2, <em>S</em><sub>3</sub> with 1 + 1. The optimum is {<em>A</em>, <em>B</em>}: 2 sets. Greedy first takes <em>S</em><sub>1</sub> (8 new elements, more than <em>A</em>'s 7). That leaves 3 in each row, and <em>S</em><sub>2</sub>'s 4 beat 3. That leaves 1 in each row, and <em>S</em><sub>3</sub>'s 2 beat 1. Greedy uses 3 sets. With rows of 2<sup><em>q</em></sup> − 1 elements and sets of sizes 2<sup><em>q</em></sup>, 2<sup><em>q</em>−1</sup>, …, 2, greedy uses <em>q</em> sets against OPT = 2, a ratio of about (log<sub>2</sub> <em>n</em>)/2. So logarithmic growth is real, not a weakness of the proof.</p>
<p>And no one can do much better: in 2014 Irit Dinur and David Steurer proved that for every <em>ε</em> &gt; 0, a polynomial-time (1 − <em>ε</em>) ln <em>n</em>-approximation for set cover would imply P = NP. The simple greedy algorithm is essentially the best possible.</p>

<h3>The traveling salesperson problem with a triangle inequality</h3>
<p>In the <strong>traveling salesperson problem</strong> (TSP), given distances <em>d</em>(<em>u</em>, <em>v</em>) between every pair of <em>n</em> cities, find a <strong>tour</strong>, a cycle visiting every city exactly once, of minimum total length. In the <strong>metric</strong> version the distances satisfy the triangle inequality, <em>d</em>(<em>u</em>, <em>w</em>) ≤ <em>d</em>(<em>u</em>, <em>v</em>) + <em>d</em>(<em>v</em>, <em>w</em>): going directly is never longer than going through a third city. Straight-line distance and road travel time (with shortest routes) are metric.</p>
<p><b>The algorithm.</b> Compute a minimum spanning tree <em>T</em> (CS 220 Lesson 6) of the complete graph whose edge weights are the distances. List the cities in <strong>preorder</strong>: start at a root, and visit each city before the subtrees of its children, as in a depth-first search (CS 102 Lesson 8 met preorder on binary trees). Return that order as the tour.</p>
<p><b>Why it is within a factor 2.</b> First, the lower bound: removing any one edge from an optimal tour leaves a path through all cities, which is a spanning tree, so weight(<em>T</em>) ≤ OPT. Second, walk around the tree: a depth-first traversal that goes down each edge and later comes back up it visits every city and has length exactly 2 · weight(<em>T</em>), but it visits cities more than once. Third, shortcut: skip each city already visited and go directly to the next new one. By the triangle inequality, replacing a stretch of the walk by a direct hop never makes it longer, and the cities in order of first visit are exactly the preorder. So</p>
<p class="math">ALG ≤ 2 · weight(<em>T</em>) ≤ 2 · OPT</p>
<pre><code>import math, itertools

def mst_edges(points):            # Prim's algorithm on the complete graph, O(n^2)
    n = len(points)
    in_tree, best, link = [False] * n, [math.inf] * n, [None] * n
    best[0], edges = 0, []
    for _ in range(n):
        v = min((i for i in range(n) if not in_tree[i]), key=lambda i: best[i])
        in_tree[v] = True
        if link[v] is not None:
            edges.append((link[v], v))
        for u in range(n):
            d = math.dist(points[v], points[u])
            if not in_tree[u] and d &lt; best[u]:
                best[u], link[u] = d, v
    return edges

def preorder_tour(points):
    children = {i: [] for i in range(len(points))}
    for parent, child in mst_edges(points):
        children[parent].append(child)
    tour, stack = [], [0]
    while stack:
        v = stack.pop()
        tour.append(v)
        stack.extend(sorted(children[v], reverse=True))
    return tour

def length(points, tour):
    return sum(math.dist(points[tour[i - 1]], points[tour[i]]) for i in range(len(tour)))

pts = [(0, 0), (4, 0), (4, 3), (0, 3), (2, 5), (6, 5)]
mst = sum(math.dist(pts[a], pts[b]) for a, b in mst_edges(pts))
tour = preorder_tour(pts)
opt = min(length(pts, (0,) + p) for p in itertools.permutations(range(1, 6)))
print(tour)                                               # [0, 3, 4, 2, 1, 5]
print(round(mst, 2), round(length(pts, tour), 2), round(opt, 2))   # 14.49 24.85 19.66</code></pre>
<p>(In <code>length</code>, <code>tour[i − 1]</code> for <em>i</em> = 0 is the last city, which closes the cycle.) Here the tour is 26% longer than optimal, within the guaranteed factor 2. In 1976 Nicos Christofides (and independently Anatoliy Serdyukov) improved the factor to 3/2 by adding a cheapest matching on the tree's odd-degree vertices instead of doubling every edge. That stood for 45 years until Anna Karlin, Nathan Klein and Shayan Oveis Gharan improved it, in 2021, to 3/2 − 10<sup>−36</sup>: a tiny gain, but proof that 3/2 is not the limit.</p>
<p><b>Without the triangle inequality, nothing works.</b> If P ≠ NP, general TSP has no ρ-approximation for any ρ. Suppose one existed. Given a graph <em>G</em> with <em>n</em> vertices, ask whether it has a <strong>Hamiltonian cycle</strong>, a cycle through every vertex exactly once (one of Karp's 21 NP-complete problems, CS 220 Lesson 8). Make a TSP input with distance 1 for each edge of <em>G</em> and ρ<em>n</em> + 1 for each non-edge. If <em>G</em> has a Hamiltonian cycle, OPT = <em>n</em>, so the approximation returns a tour of length at most ρ<em>n</em>. If not, every tour uses a non-edge and has length more than ρ<em>n</em>. Comparing the tour's length with ρ<em>n</em> would decide an NP-complete problem in polynomial time.</p>

<h3>Approximation schemes: knapsack</h3>
<p>For some problems we can get as close to optimal as we like. A <strong>polynomial-time approximation scheme</strong> (PTAS) takes an input and an accuracy <em>ε</em> &gt; 0 and returns a solution within a factor 1 + <em>ε</em> of optimal (or at least (1 − <em>ε</em>)OPT, for maximization), in time polynomial in <em>n</em> for each fixed <em>ε</em>; something like <em>n</em><sup>1/<em>ε</em></sup> is allowed. A <strong>fully polynomial-time approximation scheme</strong> (FPTAS) must run in time polynomial in both <em>n</em> and 1/<em>ε</em>.</p>
<p>The 0/1 knapsack problem (CS 220 Lesson 4) has an FPTAS. Items <em>i</em> = 1, …, <em>n</em> have positive integer weights <em>w</em><sub><em>i</em></sub> and values <em>v</em><sub><em>i</em></sub>, and the capacity is <em>W</em>. First drop any item heavier than <em>W</em>; then each remaining item fits alone, so OPT ≥ <em>v</em><sub>max</sub>, the largest value.</p>
<p><b>A dynamic program over values.</b> CS 220's table was indexed by capacity and took Θ(<em>nW</em>) time. Swap the roles: let <em>M</em>[<em>i</em>][<em>v</em>] be the least total weight of a subset of the first <em>i</em> items whose total value is exactly <em>v</em> (∞ if none). Then <em>M</em>[0][0] = 0, <em>M</em>[0][<em>v</em>] = ∞ for <em>v</em> &gt; 0, and</p>
<p class="math"><em>M</em>[<em>i</em>][<em>v</em>] = min(<em>M</em>[<em>i</em> − 1][<em>v</em>], <em>w</em><sub><em>i</em></sub> + <em>M</em>[<em>i</em> − 1][<em>v</em> − <em>v</em><sub><em>i</em></sub>])&nbsp;&nbsp;(the second option only if <em>v</em> ≥ <em>v</em><sub><em>i</em></sub>)</p>
<p>The answer is the largest <em>v</em> with <em>M</em>[<em>n</em>][<em>v</em>] ≤ <em>W</em>. Values range up to <em>V</em> = Σ<em>v</em><sub><em>i</em></sub> ≤ <em>n v</em><sub>max</sub>, so the time is O(<em>n</em><sup>2</sup><em>v</em><sub>max</sub>): pseudo-polynomial again, now in the values.</p>
<p><b>Rounding.</b> If the values are large, make them small. Let <em>K</em> = <em>ε v</em><sub>max</sub>/<em>n</em>, round each value down to <em>v</em>′<sub><em>i</em></sub> = ⌊<em>v</em><sub><em>i</em></sub>/<em>K</em>⌋, and solve the rounded instance exactly. Each <em>v</em>′<sub><em>i</em></sub> ≤ <em>v</em><sub>max</sub>/<em>K</em> = <em>n</em>/<em>ε</em>, so the dynamic program takes O(<em>n</em><sup>2</sup> · <em>n</em>/<em>ε</em>) = O(<em>n</em><sup>3</sup>/<em>ε</em>) time, polynomial in <em>n</em> and 1/<em>ε</em>, whatever the original numbers.</p>
<p><b>Why the answer is good.</b> Let <em>S</em> be the set we return and <em>O</em> an optimal set. Rounding down loses less than <em>K</em> per item, so <em>K v</em>′<sub><em>i</em></sub> &gt; <em>v</em><sub><em>i</em></sub> − <em>K</em>, and <em>K v</em>′<sub><em>i</em></sub> ≤ <em>v</em><sub><em>i</em></sub>. <em>S</em> is optimal for the rounded values, so it does at least as well as <em>O</em> on them. Chaining these:</p>
<p class="math">Σ<sub><em>i</em>∈<em>S</em></sub> <em>v</em><sub><em>i</em></sub> ≥ <em>K</em> Σ<sub><em>i</em>∈<em>S</em></sub> <em>v</em>′<sub><em>i</em></sub> ≥ <em>K</em> Σ<sub><em>i</em>∈<em>O</em></sub> <em>v</em>′<sub><em>i</em></sub> &gt; Σ<sub><em>i</em>∈<em>O</em></sub> (<em>v</em><sub><em>i</em></sub> − <em>K</em>) ≥ OPT − <em>nK</em> = OPT − <em>ε v</em><sub>max</sub> ≥ (1 − <em>ε</em>) OPT</p>
<p>(<em>O</em> has at most <em>n</em> items, and the last step uses OPT ≥ <em>v</em><sub>max</sub>.) Rounding the values is the trick: the error per item is at most <em>K</em>, and <em>K</em> was chosen so that <em>n</em> such errors are a small fraction of the optimum. A problem can have an FPTAS only if it has a pseudo-polynomial algorithm. Suppose the optimum is a whole number at most <em>U</em> (for knapsack, <em>U</em> = Σ<em>v</em><sub><em>i</em></sub>). Running the FPTAS with <em>ε</em> = 1/(<em>U</em> + 1) returns a value of at least (1 − <em>ε</em>)OPT ≥ OPT − <em>U</em>/(<em>U</em> + 1) &gt; OPT − 1, which, being a whole number, is OPT itself; and it takes time polynomial in <em>n</em> and <em>U</em> + 1, that is, pseudo-polynomial. A problem is <strong>strongly NP-hard</strong> if it stays NP-hard even when every number in the input is at most a polynomial in the input's length. For such a problem a pseudo-polynomial algorithm would run in polynomial time, so (if P ≠ NP) it has neither one nor an FPTAS. TSP is an example: it stays NP-hard with every distance 1 or 2, by the reduction from Hamiltonian cycle that gives each edge of the graph distance 1 and each non-edge distance 2, so that a tour of length <em>n</em> exists exactly when the graph has a Hamiltonian cycle.</p>

<h3>What can't be approximated</h3>
<p>The TSP argument above is the simplest kind of <strong>inapproximability</strong> result: a reduction that makes yes-instances and no-instances of an NP-complete problem differ in their optimum by more than the ratio. Most such results rest on the <strong>PCP theorem</strong> (Arora, Lund, Motwani, Sudan and Szegedy, and Arora and Safra, 1992), which says that every NP statement has a proof that can be checked, with high confidence, by reading only a constant number of randomly chosen bits of it. That theorem is far beyond this course, but its consequences give the map of what is possible, assuming P ≠ NP:</p>
<table>
<tr><th>Problem</th><th>Best known polynomial-time ratio ρ</th><th>Impossible (if P ≠ NP)</th></tr>
<tr><td>Knapsack</td><td>1 + <em>ε</em> for every <em>ε</em> (FPTAS)</td><td>exact solution</td></tr>
<tr><td>Metric TSP</td><td>3/2 − 10<sup>−36</sup></td><td>123/122</td></tr>
<tr><td>Vertex cover</td><td>2</td><td>√2 − <em>ε</em> (and 2 − <em>ε</em> if the Unique Games Conjecture holds)</td></tr>
<tr><td>Set cover</td><td><em>H</em><sub><em>n</em></sub> ≤ ln <em>n</em> + 1 (greedy)</td><td>(1 − <em>ε</em>) ln <em>n</em></td></tr>
<tr><td>MAX-3SAT (satisfy the most clauses of a formula with 3 literals per clause)</td><td>8/7 (satisfies at least 7/8 as many clauses as OPT)</td><td>8/7 − <em>ε</em></td></tr>
<tr><td>General TSP</td><td>none</td><td>any ratio ρ</td></tr>
</table>
<p>The <strong>Unique Games Conjecture</strong> (Subhash Khot, 2002) is an unproven hypothesis about one constraint problem. Its simplest form: you are given equations, each of the form <em>x</em><sub><em>i</em></sub> − <em>x</em><sub><em>j</em></sub> ≡ <em>c</em> (mod <em>q</em>) in two of the variables; for every <em>ε</em> &gt; 0 there is a <em>q</em> for which it is NP-hard to tell whether at least a 1 − <em>ε</em> fraction of the equations can be satisfied at once or at most an <em>ε</em> fraction. Many reductions start from it, and if it is true, several of the ratios in the table, vertex cover's 2 among them, are exactly the best possible.</p>
<p>The MAX-3SAT row is remarkable. A clause with three different variables is false only when all three literals are false, probability 1/8 under a random assignment, so by linearity a random assignment satisfies 7<em>m</em>/8 of the <em>m</em> clauses on average. That is a statement about an average, not a guarantee, but the <strong>method of conditional expectations</strong> makes it one. Set the variables one at a time. At each step, let <em>E</em> be the expected number of satisfied clauses when the variables fixed so far keep their values and the rest are random. <em>E</em> is the average of the two expectations with the next variable true and with it false, so one of them is at least <em>E</em>; pick that value. Each expectation takes polynomial time to compute by linearity: a clause that already has a true literal counts 1, and one with <em>j</em> unset literals and no true one counts 1 − 2<sup>−<em>j</em></sup>. <em>E</em> starts at 7<em>m</em>/8 and never falls, and when every variable is set it is the actual number of satisfied clauses. So a deterministic polynomial-time algorithm satisfies at least 7<em>m</em>/8 ≥ (7/8) OPT clauses, a ratio of 8/7 in this lesson's convention. Johan Håstad proved in 2001 that beating this simple algorithm by any constant is NP-hard.</p>
<p class="note">Why it matters: in practice, "NP-hard" is the start of the conversation, not the end. The questions are which ratio you can guarantee, at what cost, and whether the problem is one where a guarantee is impossible and heuristics are all there is.</p>
`,
    terms: [
      ["Approximation ratio", "A bound ρ with ALG ≤ ρ · OPT on every input (for minimization), achieved in polynomial time."],
      ["Lower-bound technique", "Proving a ratio by comparing the algorithm with a computable quantity that is no larger than the optimum."],
      ["Set cover", "Choose the fewest given subsets whose union is the whole universe."],
      ["Harmonic number", "H_n = 1 + 1/2 + … + 1/n, between ln n and ln n + 1."],
      ["Metric TSP", "The traveling salesperson problem when distances satisfy the triangle inequality."],
      ["Shortcutting", "Skipping already-visited cities in a walk, which can't lengthen it when the triangle inequality holds."],
      ["PTAS", "A polynomial-time approximation scheme: within 1 + ε of optimal in time polynomial in n for each fixed ε."],
      ["FPTAS", "A fully polynomial-time approximation scheme: within 1 + ε in time polynomial in both n and 1/ε."],
      ["Inapproximability", "A proof that no polynomial-time algorithm achieves some ratio unless P = NP."]
    ],
    quiz: [
      { q: "A minimization algorithm is a 3-approximation. On an input whose optimum is 40, what can it return?", choices: ["Exactly 120", "Any value up to 40", "Any value from 40 to 120", "At least 120"], answer: 2, why: "ALG ≤ 3 · OPT = 120, and no feasible solution beats the optimum 40." },
      { q: "In the proof that greedy set cover uses at most H_n · OPT sets, when r elements remain uncovered, why does some set cover at least r/OPT of them?", choices: ["The OPT sets of an optimal cover together cover all r", "Greedy picked it", "Every set has r/OPT elements", "By the triangle inequality"], answer: 0, why: "If each of the OPT sets covered fewer than r/OPT of the r elements, they would cover fewer than r together." },
      { q: "Why is the weight of a minimum spanning tree at most the length of an optimal tour?", choices: ["Trees have fewer edges", "By the triangle inequality", "Prim's algorithm is greedy", "Deleting one edge of the optimal tour leaves a spanning tree, which weighs at least as much as the minimum one"], answer: 3, why: "The tour minus an edge is a spanning path, so its weight is at least the MST's, and the deleted edge has non-negative length." },
      { q: "What does the triangle inequality give in the TSP 2-approximation?", choices: ["That the MST is unique", "That shortcutting past visited cities doesn't lengthen the walk", "That the tour visits each city once", "That Prim's algorithm is correct"], answer: 1, why: "A direct hop is no longer than the detour it replaces." },
      { q: "In the knapsack FPTAS with n = 50 items, ε = 0.1 and largest value 2,000,000, what is the rounding unit K?", choices: ["4,000", "40,000", "400", "200,000"], answer: 0, why: "K = ε · v_max / n = 0.1 × 2,000,000 / 50 = 4,000." },
      { q: "Why can't general TSP (without the triangle inequality) be approximated within any ratio ρ, if P ≠ NP?", choices: ["Its distances are too large", "It has no polynomial certificates", "A ρ-approximation would decide Hamiltonian cycle, by giving non-edges length ρn + 1", "Because metric TSP can be"], answer: 2, why: "Tours of length n exist exactly when G has a Hamiltonian cycle; otherwise every tour is longer than ρn." }
    ],
    practice: [
      {
        q: `<p>Run greedy set cover on <em>U</em> = {1, …, 6} with <em>S</em><sub>1</sub> = {1, 2, 3}, <em>S</em><sub>2</sub> = {4, 5, 6}, <em>S</em><sub>3</sub> = {1, 2, 4, 5}, <em>S</em><sub>4</sub> = {3, 6}. Compare with the optimum and with the bound <em>H</em><sub>6</sub> · OPT.</p>`,
        a: `<p>Greedy takes <em>S</em><sub>3</sub> first (4 new elements). Then 3 and 6 remain: <em>S</em><sub>1</sub> and <em>S</em><sub>2</sub> cover 1 each, <em>S</em><sub>4</sub> covers 2, so it takes <em>S</em><sub>4</sub>. Two sets, which is optimal ({<em>S</em><sub>1</sub>, <em>S</em><sub>2</sub>} also works, and no single set covers <em>U</em>). The bound allows <em>H</em><sub>6</sub> · 2 = 4.9 sets.</p>`
      },
      {
        q: `<p>Here is a different idea for metric TSP: start at city 0 and always go to the nearest unvisited city. Explain why the proof in the notes doesn't apply to it. (It is known to be worse than any constant ratio in the worst case.)</p>`,
        a: `<p>The proof compares the tour with a specific structure, the doubled MST, whose length we know is at most 2 OPT; the tour is that structure with shortcuts. Nearest neighbor's tour isn't derived from any structure with a known bound: an early greedy choice can leave a far-away city to be visited at the end, from wherever the tour happens to be. Each step is locally cheap, but nothing ties the sum to OPT. (Rosenkrantz, Stearns and Lewis showed in 1977 that its ratio can grow like log <em>n</em>.)</p>`
      },
      {
        q: `<p>Items (weight, value): (5, 1210), (4, 1100), (3, 1000), (2, 300), with capacity 9 and <em>ε</em> = 0.5. Compute <em>K</em>, the rounded values, the set the FPTAS returns and its true value, and compare with the optimum.</p>`,
        a: `<p><em>K</em> = 0.5 × 1210/4 = 151.25. Rounded values: ⌊1210/151.25⌋ = 8, ⌊1100/151.25⌋ = 7, ⌊1000/151.25⌋ = 6, ⌊300/151.25⌋ = 1. The feasible sets of weight at most 9 include {1, 2} (weight 9, rounded value 15) and {2, 3, 4} (weight 9, rounded value 14), so the FPTAS returns items 1 and 2, worth 2310. The true optimum is {2, 3, 4}, worth 2400. The loss, 90, is 3.75% of the optimum, well within the guaranteed 50%.</p>`
      },
      {
        q: `<p>A random assignment satisfies each 3-literal clause (three different variables) with probability 7/8. Use this to show that every such formula with <em>m</em> clauses has an assignment satisfying at least 7<em>m</em>/8 of them.</p>`,
        a: `<p>Let <em>X</em> be the number of clauses a uniformly random assignment satisfies. By linearity, E[<em>X</em>] = 7<em>m</em>/8. A random variable can't always be below its mean, so some assignment satisfies at least 7<em>m</em>/8 clauses. (This is the <em>probabilistic method</em>: proving something exists by showing a random choice has it with positive probability.)</p>`
      }
    ],
    sources: ["approxalgs", "kleinberg", "jeffe", "clrs"]
  },
  {
    id: "aa4",
    title: "Linear programming",
    minutes: 90,
    summary: "Optimizing a linear objective subject to linear inequalities: modelling problems as LPs, the geometry of feasible regions and why optima sit at vertices, the simplex method worked step by step, degeneracy and Bland's rule, duality and complementary slackness with prices as an interpretation, and LP relaxation and rounding for weighted vertex cover.",
    notes: `
<p>A <strong>linear program</strong> (LP) asks for real numbers <em>x</em><sub>1</sub>, …, <em>x</em><sub><em>n</em></sub> that maximize (or minimize) a linear function of them, subject to linear inequalities. Linear programs schedule airline crews, plan production, route network traffic and set prices; maximum flow and shortest paths are special cases; and, as this lesson shows, many approximation algorithms are LPs in disguise. They can be solved efficiently, which makes "write it as an LP" one of the most useful moves in algorithm design.</p>

<h3>Modelling with linear programs</h3>
<p>A small factory makes two paints. A ton of exterior paint earns 5 (thousand dollars) and a ton of interior paint 4. Each day it has 24 tons of raw material M1 and 6 tons of M2. A ton of exterior paint uses 6 tons of M1 and 1 of M2; a ton of interior paint uses 4 of M1 and 2 of M2. With <em>x</em> tons of exterior and <em>y</em> tons of interior paint per day:</p>
<p class="math">maximize 5<em>x</em> + 4<em>y</em>&nbsp;&nbsp;subject to&nbsp;&nbsp;6<em>x</em> + 4<em>y</em> ≤ 24,&nbsp;&nbsp;<em>x</em> + 2<em>y</em> ≤ 6,&nbsp;&nbsp;<em>x</em>, <em>y</em> ≥ 0</p>
<p>The function being optimized is the <strong>objective</strong>; the inequalities are the <strong>constraints</strong>. In matrix form (MATH 220), an LP in <strong>standard form</strong> is: maximize <strong>c</strong> · <strong>x</strong> subject to <em>A</em><strong>x</strong> ≤ <strong>b</strong> and <strong>x</strong> ≥ 0, where inequalities between vectors hold entry by entry. Here <strong>c</strong> = (5, 4), <strong>b</strong> = (24, 6), and <em>A</em> has rows (6, 4) and (1, 2). Every LP can be put in this form: minimize <strong>c</strong> · <strong>x</strong> by maximizing −<strong>c</strong> · <strong>x</strong>; turn a ≥ constraint into ≤ by multiplying it by −1; write an equation as two inequalities; and replace a variable that may be negative by the difference of two non-negative ones.</p>
<p>Many problems from earlier courses are LPs. Maximum flow (CS 220 Lesson 7) has a variable <em>f</em><sub><em>e</em></sub> for each edge: maximize the flow out of <em>s</em> subject to 0 ≤ <em>f</em><sub><em>e</em></sub> ≤ capacity and conservation (flow in equals flow out) at every other vertex. What LPs can't express is a requirement that variables be whole numbers. An <strong>integer linear program</strong>, with that requirement, can express NP-hard problems (vertex cover is one, below), so integer programming is NP-hard, while linear programming is solvable in polynomial time.</p>

<h3>Geometry: why optima are at corners</h3>
<p>Each constraint is a half-plane (in <em>n</em> dimensions, a half-space): the points on one side of a line. The <strong>feasible region</strong>, the points satisfying all constraints, is their intersection, a convex polygon (a <strong>polytope</strong> in general). Convex means that the segment between any two feasible points is feasible.</p>
<figure class="fig">
<svg viewBox="0 0 320 240" width="320" role="img" aria-label="Axes x from 0 to 6 and y from 0 to 4.5. The feasible region is the shaded quadrilateral with corners (0,0), (4,0), (3,1.5) and (0,3), bounded by the lines 6x + 4y = 24 and x + 2y = 6. A dashed objective line 5x + 4y = 21 touches the region only at the corner (3, 1.5).">
  <polygon class="shade" points="40,200 200,200 160,140 40,80"/>
  <path class="ax" d="M40 210 V15 M30 200 H300"/>
  <line class="ln" x1="80" y1="20" x2="200" y2="200"/>
  <line class="ln" x1="40" y1="80" x2="280" y2="200"/>
  <line class="ln dash" x1="64" y1="20" x2="208" y2="200"/>
  <circle class="dot" cx="160" cy="140" r="4"/>
  <text class="text m" x="165" y="132">(3, 1.5)</text>
  <text class="text m" x="200" y="216" text-anchor="middle">4</text>
  <text class="text m" x="280" y="216" text-anchor="middle">6</text>
  <text class="text m" x="30" y="84" text-anchor="end">3</text>
  <text class="text m" x="304" y="204">x</text>
  <text class="text m" x="36" y="14" text-anchor="end">y</text>
  <text class="text m" x="98" y="34">6x + 4y = 24</text>
  <text class="text m" x="232" y="168">x + 2y = 6</text>
  <text class="text m" x="208" y="234" text-anchor="middle">dashed: 5x + 4y = 21</text>
</svg>
<figcaption>The paint factory's feasible region (shaded). Lines of equal profit 5<em>x</em> + 4<em>y</em> are parallel; sliding one outward, the last feasible point it touches is the corner (3, 1.5), with profit 21.</figcaption>
</figure>
<p>Points with equal objective value 5<em>x</em> + 4<em>y</em> = <em>z</em> form parallel lines, and increasing <em>z</em> slides the line outward. The best feasible point is where the line last touches the region, and a line leaving a convex polygon last touches it at a corner (or along a whole edge, if the edge is parallel to it, in which case its corners are optimal too). Corners are called <strong>vertices</strong>; in <em>n</em> dimensions, a vertex is where <em>n</em> of the constraints hold with equality and the resulting equations have a single solution. So an LP with an optimum has an optimal vertex, and a finite number of vertices to check. Two things can go wrong instead: the constraints may contradict each other (<strong>infeasible</strong>), or the objective may grow without limit inside the region (<strong>unbounded</strong>).</p>
<pre><code>from fractions import Fraction as F
from itertools import combinations

rows = [(6, 4, 24), (1, 2, 6), (-1, 0, 0), (0, -1, 0)]   # a*x + b*y &lt;= r, including x, y >= 0
best = None
for (a1, b1, r1), (a2, b2, r2) in combinations(rows, 2):
    det = a1 * b2 - a2 * b1
    if det == 0:
        continue                                           # parallel lines don't meet
    x, y = F(r1 * b2 - r2 * b1, det), F(a1 * r2 - a2 * r1, det)
    if all(a * x + b * y &lt;= r for a, b, r in rows):
        print((x, y), 5 * x + 4 * y)
# (Fraction(3, 1), Fraction(3, 2)) 21
# (Fraction(4, 1), Fraction(0, 1)) 20
# (Fraction(0, 1), Fraction(3, 1)) 12
# (Fraction(0, 1), Fraction(0, 1)) 0</code></pre>
<p>Checking every vertex this way is hopeless in general: with <em>m</em> constraints in <em>n</em> dimensions there can be up to C(<em>m</em>, <em>n</em>) of them. The simplex method visits only a few.</p>

<h3>The simplex method</h3>
<p>George Dantzig's <strong>simplex method</strong> (1947) starts at a vertex and repeatedly moves along an edge of the polytope to a neighboring vertex with a better objective value, until no neighbor is better. Because the region is convex and the objective linear, a vertex with no better neighbor is optimal. In algebra, the moves are pivots, like the row operations of Gaussian elimination (MATH 220 Lesson 2).</p>
<p>First, add a <strong>slack variable</strong> to each constraint, measuring how far it is from being tight: <em>s</em><sub>1</sub> = 24 − 6<em>x</em> − 4<em>y</em> ≥ 0 and <em>s</em><sub>2</sub> = 6 − <em>x</em> − 2<em>y</em> ≥ 0. Write the system as a <strong>dictionary</strong>: some variables, the <strong>basic</strong> ones, expressed in terms of the others, the <strong>non-basic</strong> ones, together with the objective <em>z</em>.</p>
<p class="math"><em>s</em><sub>1</sub> = 24 − 6<em>x</em> − 4<em>y</em><br><em>s</em><sub>2</sub> = 6 − <em>x</em> − 2<em>y</em><br><em>z</em> = 0 + 5<em>x</em> + 4<em>y</em></p>
<p>Setting the non-basic variables to 0 gives the current vertex: <em>x</em> = <em>y</em> = 0, <em>s</em><sub>1</sub> = 24, <em>s</em><sub>2</sub> = 6, <em>z</em> = 0. Because every entry of <strong>b</strong> is non-negative, this origin is feasible; otherwise a preliminary "phase one" LP is solved to find a starting vertex.</p>
<p><b>Pivot 1.</b> The objective row says increasing <em>x</em> or <em>y</em> raises <em>z</em>. Choose one with a positive coefficient to <strong>enter</strong> the basis, say <em>x</em> (coefficient 5). Increase it, keeping <em>y</em> = 0, as far as the basic variables allow: <em>s</em><sub>1</sub> = 24 − 6<em>x</em> stays non-negative while <em>x</em> ≤ 4, and <em>s</em><sub>2</sub> = 6 − <em>x</em> while <em>x</em> ≤ 6. The tighter limit, the <strong>ratio test</strong>, is 4, from <em>s</em><sub>1</sub>, so <em>s</em><sub>1</sub> <strong>leaves</strong> the basis (becomes 0). Solve its row for <em>x</em> and substitute everywhere:</p>
<p class="math"><em>x</em> = 4 − (2/3)<em>y</em> − (1/6)<em>s</em><sub>1</sub><br><em>s</em><sub>2</sub> = 6 − (4 − (2/3)<em>y</em> − (1/6)<em>s</em><sub>1</sub>) − 2<em>y</em> = 2 − (4/3)<em>y</em> + (1/6)<em>s</em><sub>1</sub><br><em>z</em> = 5(4 − (2/3)<em>y</em> − (1/6)<em>s</em><sub>1</sub>) + 4<em>y</em> = 20 + (2/3)<em>y</em> − (5/6)<em>s</em><sub>1</sub></p>
<p>The new vertex is (<em>x</em>, <em>y</em>) = (4, 0), with <em>z</em> = 20.</p>
<p><b>Pivot 2.</b> Now only <em>y</em> has a positive objective coefficient (2/3). The <em>x</em> row allows <em>y</em> ≤ 4/(2/3) = 6 and the <em>s</em><sub>2</sub> row allows <em>y</em> ≤ 2/(4/3) = 3/2, so <em>s</em><sub>2</sub> leaves. Solving its row, <em>y</em> = 3/2 + (1/8)<em>s</em><sub>1</sub> − (3/4)<em>s</em><sub>2</sub>, and substituting:</p>
<p class="math"><em>x</em> = 3 − (1/4)<em>s</em><sub>1</sub> + (1/2)<em>s</em><sub>2</sub><br><em>y</em> = 3/2 + (1/8)<em>s</em><sub>1</sub> − (3/4)<em>s</em><sub>2</sub><br><em>z</em> = 21 − (3/4)<em>s</em><sub>1</sub> − (1/2)<em>s</em><sub>2</sub></p>
<p>(For <em>z</em>: 20 + (2/3)(3/2) = 21, the <em>s</em><sub>1</sub> coefficient is −5/6 + (2/3)(1/8) = −3/4, and the <em>s</em><sub>2</sub> coefficient is (2/3)(−3/4) = −1/2.) Every objective coefficient is now negative, and the slacks can't be negative, so <em>z</em> ≤ 21 for every feasible point. The current vertex (3, 3/2), with <em>z</em> = 21, is optimal, as the picture showed.</p>
<p><b>Termination and running time.</b> Each pivot keeps the point feasible (the ratio test) and never decreases <em>z</em>. A pivot can leave <em>z</em> unchanged when a basic variable is already 0, a <strong>degenerate</strong> vertex where more than <em>n</em> constraints are tight; with a careless rule for choosing variables, simplex can then cycle through the same bases forever. <strong>Bland's rule</strong> (1977) prevents cycling: number the variables with the original ones first, in order, then the slacks (here <em>x</em>, <em>y</em>, <em>s</em><sub>1</sub>, <em>s</em><sub>2</sub>); always enter the lowest-numbered variable with a positive coefficient, and on ties in the ratio test let the lowest-numbered basic variable leave. If no basic variable limits the entering one, the LP is unbounded. In practice simplex takes a small multiple of <em>m</em> pivots, but Victor Klee and George Minty built LPs in 1972 on which the usual rules visit all 2<sup><em>n</em></sup> vertices of a squashed cube. Polynomial-time algorithms exist: the ellipsoid method (Leonid Khachiyan, 1979) and interior-point methods (Narendra Karmarkar, 1984), which cut through the inside of the polytope instead of walking its edges. Lesson 6 returns to the puzzle of why simplex is fast in practice.</p>

<h3>Duality</h3>
<p>The final dictionary proved <em>z</em> ≤ 21. Here is a way to prove such bounds directly. Multiply the first constraint by <em>u</em> ≥ 0 and the second by <em>v</em> ≥ 0 and add:</p>
<p class="math">(6<em>u</em> + <em>v</em>)<em>x</em> + (4<em>u</em> + 2<em>v</em>)<em>y</em> ≤ 24<em>u</em> + 6<em>v</em></p>
<p>If the coefficients on the left are at least the objective's, 6<em>u</em> + <em>v</em> ≥ 5 and 4<em>u</em> + 2<em>v</em> ≥ 4, then, because <em>x</em>, <em>y</em> ≥ 0, 5<em>x</em> + 4<em>y</em> ≤ (6<em>u</em> + <em>v</em>)<em>x</em> + (4<em>u</em> + 2<em>v</em>)<em>y</em> ≤ 24<em>u</em> + 6<em>v</em>. Finding the best such bound is itself an LP, the <strong>dual</strong>:</p>
<p class="math">minimize 24<em>u</em> + 6<em>v</em>&nbsp;&nbsp;subject to&nbsp;&nbsp;6<em>u</em> + <em>v</em> ≥ 5,&nbsp;&nbsp;4<em>u</em> + 2<em>v</em> ≥ 4,&nbsp;&nbsp;<em>u</em>, <em>v</em> ≥ 0</p>
<p>In general, the dual of "maximize <strong>c</strong> · <strong>x</strong> subject to <em>A</em><strong>x</strong> ≤ <strong>b</strong>, <strong>x</strong> ≥ 0" (the <strong>primal</strong>) is "minimize <strong>b</strong> · <strong>y</strong> subject to <em>A</em><sup>T</sup><strong>y</strong> ≥ <strong>c</strong>, <strong>y</strong> ≥ 0": one dual variable per primal constraint, one dual constraint per primal variable.</p>
<p><b>Weak duality.</b> For any feasible <strong>x</strong> and <strong>y</strong>, <strong>c</strong> · <strong>x</strong> ≤ (<em>A</em><sup>T</sup><strong>y</strong>) · <strong>x</strong> = <strong>y</strong> · (<em>A</em><strong>x</strong>) ≤ <strong>y</strong> · <strong>b</strong>. The first step uses <strong>c</strong> ≤ <em>A</em><sup>T</sup><strong>y</strong> and <strong>x</strong> ≥ 0, the middle one is (<em>A</em><sup>T</sup><strong>y</strong>) · <strong>x</strong> = <strong>y</strong><sup>T</sup><em>A</em><strong>x</strong>, and the last uses <em>A</em><strong>x</strong> ≤ <strong>b</strong> and <strong>y</strong> ≥ 0. So every dual solution bounds every primal solution.</p>
<p><b>Strong duality</b> (John von Neumann, 1947; proved by David Gale, Harold Kuhn and Albert Tucker, 1951): if the primal has an optimal solution, so does the dual, with the <em>same</em> value. For the paint factory, <em>u</em> = 3/4, <em>v</em> = 1/2 is dual feasible (6 · 3/4 + 1/2 = 5 and 4 · 3/4 + 2 · 1/2 = 4) with value 24 · 3/4 + 6 · 1/2 = 21. These are the negatives of the slack coefficients in the final dictionary: the simplex method finds the dual solution for free. A primal and a dual solution with equal values are a <strong>certificate</strong>: anyone can check in a few multiplications that both are optimal.</p>
<p><b>Complementary slackness.</b> When both are optimal, both inequalities in the weak-duality chain are equalities. The second, <strong>y</strong> · (<em>A</em><strong>x</strong>) = <strong>y</strong> · <strong>b</strong>, is a sum of non-negative terms <em>y</em><sub><em>i</em></sub>(<em>b</em><sub><em>i</em></sub> − (<em>A</em><strong>x</strong>)<sub><em>i</em></sub>) equal to 0, so each term is 0: if <em>y</em><sub><em>i</em></sub> &gt; 0, primal constraint <em>i</em> is tight. Likewise, if <em>x</em><sub><em>j</em></sub> &gt; 0, dual constraint <em>j</em> is tight. Here both raw materials are used up (both primal constraints tight) and both prices are positive; both paints are made and both dual constraints hold with equality.</p>
<p><b>Prices.</b> The dual variables are the value of one more unit of each resource, called <strong>shadow prices</strong>. With 25 tons of M1 instead of 24, the optimum becomes 5 · 3.25 + 4 · 1.375 = 21.75, up by exactly <em>u</em> = 0.75; the factory should pay up to 750 dollars for an extra ton of M1. For max flow, the dual LP is the min-cut problem, and strong duality is CS 220's max-flow min-cut theorem.</p>

<h3>Relax and round: weighted vertex cover</h3>
<p>Give each vertex <em>v</em> a weight <em>w</em><sub><em>v</em></sub> ≥ 0 and ask for a vertex cover of least total weight. Lesson 3's matching argument fails (it ignores weights), but an LP works. With <em>x</em><sub><em>v</em></sub> = 1 meaning "<em>v</em> is in the cover", the problem is the integer program</p>
<p class="math">minimize Σ<sub><em>v</em></sub> <em>w</em><sub><em>v</em></sub><em>x</em><sub><em>v</em></sub>&nbsp;&nbsp;subject to&nbsp;&nbsp;<em>x</em><sub><em>u</em></sub> + <em>x</em><sub><em>v</em></sub> ≥ 1 for every edge (<em>u</em>, <em>v</em>),&nbsp;&nbsp;<em>x</em><sub><em>v</em></sub> ∈ {0, 1}</p>
<p>The <strong>LP relaxation</strong> replaces <em>x</em><sub><em>v</em></sub> ∈ {0, 1} by 0 ≤ <em>x</em><sub><em>v</em></sub> ≤ 1. Every cover is feasible for the relaxation, so its optimum LP* ≤ OPT: the computable lower bound again. Solve the LP, then <strong>round</strong>: put <em>v</em> in the cover if <em>x</em><sub><em>v</em></sub> ≥ 1/2.</p>
<ul>
<li>It is a cover: for each edge, <em>x</em><sub><em>u</em></sub> + <em>x</em><sub><em>v</em></sub> ≥ 1, so at least one of them is at least 1/2.</li>
<li>It costs at most 2 LP*: each chosen vertex has 1 ≤ 2<em>x</em><sub><em>v</em></sub>, so Σ<sub>chosen</sub> <em>w</em><sub><em>v</em></sub> ≤ Σ<sub><em>v</em></sub> <em>w</em><sub><em>v</em></sub> · 2<em>x</em><sub><em>v</em></sub> = 2 LP* ≤ 2 OPT.</li>
</ul>
<p>So rounding gives a 2-approximation for weighted vertex cover. Can a better analysis of the same LP do better than 2? The ratio OPT/LP* can approach 2, so no. On the triangle (weights 1), <em>x</em> = (1/2, 1/2, 1/2) is feasible with value 3/2, while every cover needs 2 vertices; on the complete graph with <em>n</em> vertices, LP* ≤ <em>n</em>/2 and OPT = <em>n</em> − 1. The worst-case ratio of OPT to LP* is the relaxation's <strong>integrality gap</strong>, and it limits any proof that compares with LP*.</p>
<p class="note">Why it matters: "formulate as an integer program, relax to an LP, solve, round, and compare with the LP's value" is the most widely used recipe for approximation algorithms, and duality turns optimality into something you can check.</p>
`,
    terms: [
      ["Linear program", "Optimize a linear objective over real variables subject to linear inequality constraints."],
      ["Standard form", "Maximize c · x subject to Ax ≤ b and x ≥ 0."],
      ["Feasible region", "The set of points satisfying every constraint; for an LP, a convex polytope."],
      ["Vertex", "A corner of the feasible region; if an LP has an optimum, some vertex is optimal."],
      ["Slack variable", "A non-negative variable measuring how far an inequality is from being tight."],
      ["Pivot", "One simplex step: a non-basic variable enters the basis and the basic variable found by the ratio test leaves."],
      ["Degenerate vertex", "A vertex where more constraints are tight than the dimension, where simplex can pivot without progress."],
      ["Bland's rule", "Choose the lowest-numbered entering and leaving variables; it prevents simplex from cycling."],
      ["Dual LP", "Minimize b · y subject to Aᵀy ≥ c, y ≥ 0: the best upper bound obtainable by combining the primal constraints."],
      ["Weak and strong duality", "Every dual solution bounds every primal one; at the optimum the values are equal."],
      ["Complementary slackness", "At optimality, a positive dual variable forces its primal constraint to be tight, and vice versa."],
      ["LP relaxation", "An integer program with the integrality requirement dropped; its optimum bounds the integer optimum."],
      ["Integrality gap", "The worst ratio between the integer optimum and the LP relaxation's optimum."]
    ],
    quiz: [
      { q: "Why does an LP with an optimal solution always have an optimal vertex?", choices: ["Because the constraints are integers", "A linear objective over a convex polytope is maximized where its level line last touches the region, which includes a corner", "Because simplex only visits vertices", "It doesn't always"], answer: 1, why: "The optimum is attained on a face of the polytope, and every face contains a vertex." },
      { q: "In the dictionary s₁ = 24 − 6x − 4y, s₂ = 6 − x − 2y, x enters. Which variable leaves?", choices: ["s₂, since 6 < 24", "y", "Neither: the LP is unbounded", "s₁, since 24/6 = 4 < 6/1"], answer: 3, why: "The ratio test takes the tightest limit: x ≤ 4 from s₁ versus x ≤ 6 from s₂." },
      { q: "What does Bland's rule prevent?", choices: ["Cycling at degenerate vertices", "Infeasibility", "Exponential running time on every input", "Unboundedness"], answer: 0, why: "With Bland's rule simplex always terminates; it can still take exponentially many pivots on contrived inputs." },
      { q: "A primal (maximization) solution has value 30 and a dual solution has value 30. What follows?", choices: ["Nothing", "Only the primal is optimal", "Both are optimal", "The LP is degenerate"], answer: 2, why: "By weak duality every primal value is at most every dual value, so 30 is the best for both." },
      { q: "At an optimal pair, a dual variable y₂ = 0.5. What does complementary slackness say?", choices: ["x₂ = 0", "Dual constraint 2 is tight", "Nothing", "Primal constraint 2 holds with equality"], answer: 3, why: "y_i > 0 forces b_i − (Ax)_i = 0." },
      { q: "The vertex cover LP on a triangle has optimum 3/2, and the best cover has 2 vertices. What does this show?", choices: ["The integrality gap is at least 4/3, so comparing with the LP can't prove a ratio better than 4/3", "Rounding fails on triangles", "The LP is infeasible", "Vertex cover is in P"], answer: 0, why: "OPT/LP* = 2/(3/2) = 4/3 here; on larger complete graphs it approaches 2." }
    ],
    practice: [
      {
        q: `<p>Write as an LP in standard form: minimize 3<em>a</em> + 2<em>b</em> subject to <em>a</em> + <em>b</em> ≥ 4, <em>a</em> − <em>b</em> = 1, <em>a</em> ≥ 0, with <em>b</em> allowed to be negative.</p>`,
        a: `<p>Replace <em>b</em> by <em>b</em><sub>1</sub> − <em>b</em><sub>2</sub> with <em>b</em><sub>1</sub>, <em>b</em><sub>2</sub> ≥ 0. Maximize −3<em>a</em> − 2<em>b</em><sub>1</sub> + 2<em>b</em><sub>2</sub> subject to −<em>a</em> − <em>b</em><sub>1</sub> + <em>b</em><sub>2</sub> ≤ −4 (the ≥ constraint times −1), <em>a</em> − <em>b</em><sub>1</sub> + <em>b</em><sub>2</sub> ≤ 1 and −<em>a</em> + <em>b</em><sub>1</sub> − <em>b</em><sub>2</sub> ≤ −1 (the equation as two inequalities), and <em>a</em>, <em>b</em><sub>1</sub>, <em>b</em><sub>2</sub> ≥ 0. (Its optimum is at <em>a</em> = 5/2, <em>b</em> = 3/2, with cost 21/2.)</p>`
      },
      {
        q: `<p>Solve by simplex: maximize 3<em>x</em> + 2<em>y</em> subject to <em>x</em> + <em>y</em> ≤ 4, <em>x</em> + 3<em>y</em> ≤ 6, <em>x</em> ≤ 3, <em>x</em>, <em>y</em> ≥ 0. Enter <em>x</em> first, and break any tie in the ratio test by Bland's rule.</p>`,
        a: `<p>Dictionary: <em>s</em><sub>1</sub> = 4 − <em>x</em> − <em>y</em>, <em>s</em><sub>2</sub> = 6 − <em>x</em> − 3<em>y</em>, <em>s</em><sub>3</sub> = 3 − <em>x</em>, <em>z</em> = 3<em>x</em> + 2<em>y</em>. Enter <em>x</em>: the limits are 4, 6 and 3, so <em>s</em><sub>3</sub> leaves: <em>x</em> = 3 − <em>s</em><sub>3</sub>, <em>s</em><sub>1</sub> = 1 − <em>y</em> + <em>s</em><sub>3</sub>, <em>s</em><sub>2</sub> = 3 − 3<em>y</em> + <em>s</em><sub>3</sub>, <em>z</em> = 9 + 2<em>y</em> − 3<em>s</em><sub>3</sub>. Enter <em>y</em>: limits 1 (from <em>s</em><sub>1</sub>) and 1 (from <em>s</em><sub>2</sub>), a tie, which means the next vertex is degenerate. Bland's rule numbers the variables <em>x</em>, <em>y</em>, <em>s</em><sub>1</sub>, <em>s</em><sub>2</sub>, <em>s</em><sub>3</sub>, so <em>s</em><sub>1</sub>, the lower-numbered, leaves. <em>y</em> = 1 − <em>s</em><sub>1</sub> + <em>s</em><sub>3</sub>, <em>s</em><sub>2</sub> = 3<em>s</em><sub>1</sub> − 2<em>s</em><sub>3</sub>, <em>z</em> = 11 − 2<em>s</em><sub>1</sub> − <em>s</em><sub>3</sub>. All coefficients are negative: the optimum is 11 at (3, 1), where all three constraints are tight (<em>s</em><sub>2</sub> = 0 while basic). (Letting <em>s</em><sub>2</sub> leave instead also reaches (3, 1) and 11, but with the final objective row <em>z</em> = 11 − (2/3)<em>s</em><sub>2</sub> − (7/3)<em>s</em><sub>3</sub>: at a degenerate optimum the final dictionary, and so the dual solution read from it, can depend on the tie-break.)</p>`
      },
      {
        q: `<p>Write the dual of the LP in the previous problem and find an optimal dual solution from the final dictionary. Check that its value is 11 and that complementary slackness holds.</p>`,
        a: `<p>Dual: minimize 4<em>u</em><sub>1</sub> + 6<em>u</em><sub>2</sub> + 3<em>u</em><sub>3</sub> subject to <em>u</em><sub>1</sub> + <em>u</em><sub>2</sub> + <em>u</em><sub>3</sub> ≥ 3, <em>u</em><sub>1</sub> + 3<em>u</em><sub>2</sub> ≥ 2, <em>u</em> ≥ 0. From <em>z</em> = 11 − 2<em>s</em><sub>1</sub> − 0<em>s</em><sub>2</sub> − <em>s</em><sub>3</sub>: <em>u</em> = (2, 0, 1). Feasible: 2 + 0 + 1 = 3 and 2 + 0 = 2. Value 8 + 0 + 3 = 11. Complementary slackness: <em>u</em><sub>1</sub>, <em>u</em><sub>3</sub> &gt; 0 and constraints 1 and 3 are tight; <em>x</em>, <em>y</em> &gt; 0 and both dual constraints are tight.</p>`
      },
      {
        q: `<p>(a) A path has vertices 1–2–3–4 with weights 1, 5, 4, 1. Find the LP relaxation's optimum (guess, then certify it with a dual: the dual of the vertex cover LP has a variable <em>y</em><sub><em>e</em></sub> ≥ 0 per edge, maximizes Σ<em>y</em><sub><em>e</em></sub>, and requires the <em>y</em> of the edges at each vertex to sum to at most its weight). Show that this optimum is the only optimal point, and say what rounding returns. (b) Now change vertex 3's weight to 5, giving weights 1, 5, 5, 1. Show that <em>x</em> = (1/2, 1/2, 1/2, 1/2) is an optimal point of the LP, and say what rounding it returns.</p>`,
        a: `<p>(a) The cover {1, 3} (<em>x</em> = (1, 0, 1, 0)) is feasible with cost 1 + 4 = 5; {2, 4} costs 6 and the all-1/2 point 5.5. To show that nothing beats 5, use the dual <em>y</em><sub>12</sub> = 1, <em>y</em><sub>23</sub> = 3, <em>y</em><sub>34</sub> = 1. It is feasible (vertex 1: 1 ≤ 1; vertex 2: 1 + 3 ≤ 5; vertex 3: 3 + 1 ≤ 4; vertex 4: 1 ≤ 1) and has value 5, so by weak duality LP* ≥ 5, and LP* = 5. Uniqueness: the cost can be regrouped with the dual's multipliers as <em>x</em><sub>1</sub> + 5<em>x</em><sub>2</sub> + 4<em>x</em><sub>3</sub> + <em>x</em><sub>4</sub> = 1 · (<em>x</em><sub>1</sub> + <em>x</em><sub>2</sub>) + 3 · (<em>x</em><sub>2</sub> + <em>x</em><sub>3</sub>) + 1 · (<em>x</em><sub>3</sub> + <em>x</em><sub>4</sub>) + <em>x</em><sub>2</sub> ≥ 1 + 3 + 1 + <em>x</em><sub>2</sub>. So a point of cost 5 has <em>x</em><sub>2</sub> = 0; then the edges (1, 2) and (2, 3) force <em>x</em><sub>1</sub> = <em>x</em><sub>3</sub> = 1, which already cost 5, so <em>x</em><sub>4</sub> = 0. The only optimum is (1, 0, 1, 0), and rounding returns {1, 3}, weight 5, which is optimal. (b) The all-1/2 point is feasible (each edge's two values sum to 1) and costs (1 + 5 + 5 + 1)/2 = 6. The dual <em>y</em><sub>12</sub> = 1, <em>y</em><sub>23</sub> = 4, <em>y</em><sub>34</sub> = 1 is feasible (1 ≤ 1; 1 + 4 ≤ 5; 4 + 1 ≤ 5; 1 ≤ 1) with value 6, so LP* = 6 and the point is optimal. Rounding it takes every vertex, weight 12. The best cover, {1, 3} or {2, 4}, weighs 6 (and (1, 0, 1, 0) is also an LP optimum, which would round to it), so this is exactly twice the optimum, the worst the guarantee allows: the guarantee must hold whichever optimum the solver returns.</p>`
      }
    ],
    sources: ["jeffe", "clrs", "mit6854", "approxalgs"]
  },
  {
    id: "aa5",
    title: "Streaming and sketching",
    minutes: 90,
    summary: "Answering questions about data too large to store: the streaming model, reservoir sampling and its proof, Misra–Gries heavy hitters, the count-min sketch and its error bound, distinct counting from the smallest hash values to the HyperLogLog idea, and Bloom filters with their false-positive rate and sizing.",
    notes: `
<p>A backbone router forwards billions of packets an hour and wants to know which source addresses send the most traffic. A search engine wants the number of distinct users who searched today. A database wants to know, before reading a file from disk, whether a key could possibly be in it. In each case the data goes past once, far faster and in far greater volume than anything can store. This lesson's algorithms keep a small summary, a <strong>sketch</strong>, and answer approximately, with proven error bounds.</p>

<h3>The streaming model</h3>
<p>A <strong>data stream</strong> is a sequence of items <em>a</em><sub>1</sub>, <em>a</em><sub>2</sub>, …, <em>a</em><sub><em>n</em></sub> that an algorithm reads once, in order. It may use memory much smaller than <em>n</em>, ideally polylogarithmic (a polynomial in log <em>n</em>), and should spend little time per item. At the end (or at any moment) it answers a question about the whole stream. Most interesting questions can't be answered exactly in small memory. For example, counting distinct items exactly needs memory proportional to the number of possible items: after reading a set <em>S</em> of items from {1, …, <em>N</em>}, the algorithm's memory must let it answer "would one more item <em>x</em> increase the count?", which reveals whether <em>x</em> ∈ <em>S</em> for every <em>x</em>. So different sets need different memory contents, and there are 2<sup><em>N</em></sup> sets, which takes <em>N</em> bits. Streaming algorithms therefore approximate, and usually randomize.</p>

<h3>Reservoir sampling</h3>
<p>Problem: keep a uniformly random sample of <em>k</em> items from a stream whose length isn't known in advance (a random 1,000 log lines from today's, for a dashboard). The algorithm, usually credited to Alan Waterman and analyzed by Jeffrey Vitter in 1985:</p>
<ul>
<li>Keep the first <em>k</em> items in a "reservoir".</li>
<li>When item number <em>i</em> arrives (counting from 1, with <em>i</em> &gt; <em>k</em>), choose a random integer <em>j</em> from 1 to <em>i</em>. If <em>j</em> ≤ <em>k</em>, replace the reservoir's <em>j</em>-th item with the new one; otherwise discard the new item.</li>
</ul>
<p><b>Claim.</b> After <em>i</em> ≥ <em>k</em> items, each of them is in the reservoir with probability exactly <em>k</em>/<em>i</em>.</p>
<p><b>Proof by induction on <em>i</em>.</b> For <em>i</em> = <em>k</em>, all items are kept: probability 1 = <em>k</em>/<em>k</em>. Suppose it holds after <em>i</em> − 1 items. The new item enters with probability <em>k</em>/<em>i</em> (that <em>j</em> ≤ <em>k</em>). An older item was present with probability <em>k</em>/(<em>i</em> − 1) and survives this step unless the new item enters <em>and</em> takes its slot, which has probability (<em>k</em>/<em>i</em>)(1/<em>k</em>) = 1/<em>i</em>. So it is present with probability</p>
<p class="math">(<em>k</em>/(<em>i</em> − 1)) · (1 − 1/<em>i</em>) = (<em>k</em>/(<em>i</em> − 1)) · ((<em>i</em> − 1)/<em>i</em>) = <em>k</em>/<em>i</em></p>
<p>(A stronger statement holds too, by the same induction: every set of <em>k</em> items is equally likely to be the reservoir.) The memory is <em>k</em> items and one counter, whatever the stream's length.</p>

<h3>Heavy hitters: Misra–Gries</h3>
<p>The <strong>frequency</strong> <em>f</em><sub><em>x</em></sub> of an item <em>x</em> is the number of times it occurs. A <strong>heavy hitter</strong> is an item with <em>f</em><sub><em>x</em></sub> &gt; <em>n</em>/<em>k</em> for a chosen <em>k</em>: for <em>k</em> = 100, an item making up more than 1% of the stream. There are fewer than <em>k</em> of them. Jayadev Misra and David Gries (1982) find them with <em>k</em> − 1 counters, each a pair (item, count):</p>
<ul>
<li>If the arriving item has a counter, add 1 to it.</li>
<li>Otherwise, if fewer than <em>k</em> − 1 counters are in use, start a counter for it at 1.</li>
<li>Otherwise, subtract 1 from every counter, removing those that reach 0, and discard the arriving item.</li>
</ul>
<p><b>Guarantee.</b> The final count of <em>x</em> (0 if it has no counter) is an estimate <em>f̂</em><sub><em>x</em></sub> with</p>
<p class="math"><em>f</em><sub><em>x</em></sub> − <em>n</em>/<em>k</em> ≤ <em>f̂</em><sub><em>x</em></sub> ≤ <em>f</em><sub><em>x</em></sub></p>
<p><b>Proof.</b> A counter for <em>x</em> only rises when <em>x</em> arrives, so <em>f̂</em><sub><em>x</em></sub> ≤ <em>f</em><sub><em>x</em></sub>. Each arrival of <em>x</em> that isn't counted is lost in a decrement step, as is each 1 subtracted from <em>x</em>'s counter; so <em>f</em><sub><em>x</em></sub> − <em>f̂</em><sub><em>x</em></sub> is at most the number of decrement steps. A decrement step throws away <em>k</em> units of count at once: one from each of the <em>k</em> − 1 counters, plus the arriving item, which is never counted. The stream supplies only <em>n</em> units in total, so there are at most <em>n</em>/<em>k</em> decrement steps. Every heavy hitter therefore ends with a positive count. A second pass over the data (or an exact count of the few candidates) removes the false candidates.</p>
<p>Example, with <em>k</em> = 3 (two counters) on the stream a a b c b a a d b e: after a, a, b the counters are {a: 2, b: 1}. The c triggers a decrement: {a: 1}. Then b gives {a: 1, b: 1}; a, a give {a: 3, b: 1}; d decrements to {a: 2}; b gives {a: 2, b: 1}; e decrements to {a: 1}. The true counts are a: 4, b: 3. Both estimates are within <em>n</em>/<em>k</em> = 10/3 of the truth: a's is 1 and b's is 0. The only heavy hitter (more than 10/3 occurrences) is a, and it survived. The case <em>k</em> = 2, a single counter, is the Boyer–Moore majority vote algorithm: it finds the item occurring more than half the time, if there is one.</p>

<h3>The count-min sketch</h3>
<p>Misra–Gries handles a stream of items. The <strong>count-min sketch</strong> (Graham Cormode and S. Muthukrishnan, 2005) handles a stream of updates (<em>x</em>, <em>c</em>), "add <em>c</em> ≥ 0 to <em>x</em>'s count", and answers frequency queries for any item at any time. It is a table of <em>d</em> rows of <em>w</em> counters, all 0, with a hash function <em>h</em><sub><em>r</em></sub> for each row <em>r</em>, chosen independently from a universal family (Lesson 2).</p>
<ul>
<li>Update (<em>x</em>, <em>c</em>): add <em>c</em> to counter <em>h</em><sub><em>r</em></sub>(<em>x</em>) in every row <em>r</em>.</li>
<li>Query <em>x</em>: return the minimum over the rows of counter <em>h</em><sub><em>r</em></sub>(<em>x</em>).</li>
</ul>
<p>Let <em>N</em> be the total of all counts added. Every counter <em>x</em> touches holds <em>f</em><sub><em>x</em></sub> plus the counts of other items hashed to the same place, so each one, and therefore the minimum, is at least <em>f</em><sub><em>x</em></sub>: the sketch never underestimates. The error in row <em>r</em> is <em>X</em><sub><em>r</em></sub> = Σ <em>f</em><sub><em>y</em></sub>, the sum taken over all items <em>y</em> ≠ <em>x</em> with <em>h</em><sub><em>r</em></sub>(<em>y</em>) = <em>h</em><sub><em>r</em></sub>(<em>x</em>). By universality each other item lands in <em>x</em>'s counter with probability at most 1/<em>w</em>, so by linearity E[<em>X</em><sub><em>r</em></sub>] ≤ <em>N</em>/<em>w</em>. Choose <em>w</em> = ⌈<em>e</em>/<em>ε</em>⌉; then E[<em>X</em><sub><em>r</em></sub>] ≤ <em>εN</em>/<em>e</em>, and Markov's inequality gives</p>
<p class="math">P(<em>X</em><sub><em>r</em></sub> ≥ <em>εN</em>) ≤ (<em>εN</em>/<em>e</em>)/(<em>εN</em>) = 1/<em>e</em></p>
<p>The minimum is too large only if every row is, and the rows are independent, so that has probability at most <em>e</em><sup>−<em>d</em></sup>. With <em>d</em> = ⌈ln(1/<em>δ</em>)⌉ rows:</p>
<p class="math"><em>f</em><sub><em>x</em></sub> ≤ estimate ≤ <em>f</em><sub><em>x</em></sub> + <em>εN</em>&nbsp;&nbsp;with probability at least 1 − <em>δ</em></p>
<p>For <em>ε</em> = 0.001 and <em>δ</em> = 0.01: <em>w</em> = ⌈2718.28⌉ = 2719 and <em>d</em> = ⌈4.61⌉ = 5, so 13,595 counters estimate every item's count to within 0.1% of the stream's total, however many distinct items there are. The error is relative to <em>N</em>, so the sketch is accurate for frequent items and useless for rare ones: an item seen 10 times in a stream of a billion gets an estimate that is only promised to be below 10 + 1,000,000. Two sketches with the same hash functions can be added counter by counter to summarize the union of two streams, which suits data spread over many machines.</p>

<h3>Counting distinct items</h3>
<p>To estimate the number <em>D</em> of distinct items, hash each item to a number in [0, 1). Repeats of an item give the same hash, so only the <em>D</em> distinct values matter, and a good hash makes them behave like <em>D</em> independent uniform random numbers. These are spread roughly evenly, so the smallest is about 1/(<em>D</em> + 1) and the <em>k</em>-th smallest about <em>k</em>/(<em>D</em> + 1). Keeping only the <em>k</em> smallest hash values seen, <em>v</em><sub>(<em>k</em>)</sub> being the largest of them, the estimate</p>
<p class="math"><em>D̂</em> = (<em>k</em> − 1)/<em>v</em><sub>(<em>k</em>)</sub></p>
<p>is unbiased: its expected value is exactly <em>D</em>. Why <em>k</em> − 1 and not <em>k</em>? Dividing by a random quantity is not the same as dividing by its average (E[1/<em>V</em>] ≠ 1/E[<em>V</em>]), and <em>k</em>/<em>v</em><sub>(<em>k</em>)</sub> comes out high. To compute E[1/<em>v</em><sub>(<em>k</em>)</sub>] we need the density of <em>v</em><sub>(<em>k</em>)</sub>, its probability per unit length (MATH 230 Lesson 3). <em>v</em><sub>(<em>k</em>)</sub> lies in a short interval [<em>t</em>, <em>t</em> + <em>dt</em>] when one of the <em>D</em> values lies in that interval, <em>k</em> − 1 of the other <em>D</em> − 1 lie below <em>t</em>, and the remaining <em>D</em> − <em>k</em> lie above it. There are <em>D</em> ways to choose the value in the interval and C(<em>D</em> − 1, <em>k</em> − 1) ways to choose which others are below; for each choice the probability is <em>dt</em> · <em>t</em><sup><em>k</em>−1</sup>(1 − <em>t</em>)<sup><em>D</em>−<em>k</em></sup>, by independence (ignoring the chance, of order <em>dt</em><sup>2</sup>, that two values land in the interval). The choices are disjoint events, so P(<em>t</em> ≤ <em>v</em><sub>(<em>k</em>)</sub> ≤ <em>t</em> + <em>dt</em>) ≈ <em>c t</em><sup><em>k</em>−1</sup>(1 − <em>t</em>)<sup><em>D</em>−<em>k</em></sup> <em>dt</em> with <em>c</em> = <em>D</em> · C(<em>D</em> − 1, <em>k</em> − 1), and dividing by <em>dt</em> gives the density <em>c t</em><sup><em>k</em>−1</sup>(1 − <em>t</em>)<sup><em>D</em>−<em>k</em></sup>. The integral ∫<sub>0</sub><sup>1</sup> <em>t</em><sup><em>a</em></sup>(1 − <em>t</em>)<sup><em>b</em></sup> <em>dt</em> = <em>a</em>! <em>b</em>!/(<em>a</em> + <em>b</em> + 1)! (integrate by parts <em>b</em> times) then gives E[<em>v</em><sub>(<em>k</em>)</sub>] = <em>k</em>/(<em>D</em> + 1) and E[1/<em>v</em><sub>(<em>k</em>)</sub>] = <em>D</em>/(<em>k</em> − 1). So E[<em>D̂</em>] = <em>D</em>, while <em>k</em>/<em>v</em><sub>(<em>k</em>)</sub> would average <em>kD</em>/(<em>k</em> − 1). The same integral with <em>t</em><sup><em>k</em>−3</sup> gives E[1/<em>v</em><sub>(<em>k</em>)</sub><sup>2</sup>] and from it the variance of <em>D̂</em>, <em>D</em>(<em>D</em> − <em>k</em> + 1)/(<em>k</em> − 2), so the relative standard error is √((<em>D</em> − <em>k</em> + 1)/(<em>D</em>(<em>k</em> − 2))), just under 1/√(<em>k</em> − 2). This "<em>k</em> minimum values" sketch uses <em>k</em> numbers of memory.</p>
<pre><code>import hashlib, heapq, math

def unit_hash(item):                   # a deterministic hash to [0, 1)
    h = hashlib.blake2b(str(item).encode(), digest_size=8).digest()
    return int.from_bytes(h, "big") / 2**64

def kmv_estimate(stream, k):
    heap, kept = [], set()             # heap holds the k smallest values, negated
    for item in stream:
        v = unit_hash(item)
        if v in kept:
            continue
        if len(heap) &lt; k:
            heapq.heappush(heap, -v)
            kept.add(v)
        elif v &lt; -heap[0]:
            kept.discard(-heapq.heappushpop(heap, -v))
            kept.add(v)
    return len(heap) if len(heap) &lt; k else (k - 1) / -heap[0]

stream = [i % 10000 for i in range(50000)]     # 50,000 items, 10,000 distinct
print(round(kmv_estimate(stream, 256)))        # 10527
print(round(1 / math.sqrt(254), 3))            # 0.063</code></pre>
<p>The estimate is 5.3% high, within the expected error of about 6.3%. (We use <code>hashlib</code> rather than Python's <code>hash()</code>, which for strings changes from run to run, CS 201 Lesson 3.)</p>
<p><b>HyperLogLog.</b> Philippe Flajolet's family of algorithms, culminating in HyperLogLog (Flajolet, Fusy, Gandouet and Meunier, 2007), stores even less: not hash values, but only how unusual the most unusual one was. Look at each hash as a string of bits. A hash starts with exactly <em>ρ</em> − 1 zeros and then a 1 with probability 2<sup>−<em>ρ</em></sup>, so among <em>D</em> distinct items the largest <em>ρ</em> seen is about log<sub>2</sub> <em>D</em>, which needs only about log<sub>2</sub> log<sub>2</sub> <em>D</em> bits to store. One such maximum is very noisy, so HyperLogLog uses the first <em>b</em> bits of each hash to send it to one of <em>m</em> = 2<sup><em>b</em></sup> registers, and computes <em>ρ</em> on the remaining bits only (the first <em>b</em> bits are the same for every hash in a register, so they carry no information there); each register keeps the largest <em>ρ</em> of its share. Register <em>j</em>, holding <em>M</em><sub><em>j</em></sub>, receives about <em>D</em>/<em>m</em> distinct items, so 2<sup><em>M</em><sub><em>j</em></sub></sup> is a rough estimate of <em>D</em>/<em>m</em>. HyperLogLog averages these <em>m</em> estimates with a <em>harmonic mean</em>, the reciprocal of the average reciprocal: <em>m</em> / Σ<sub><em>j</em></sub> 2<sup>−<em>M</em><sub><em>j</em></sub></sup>. Unlike the ordinary mean, it can't be dragged up much by a few registers that happened to see a large <em>ρ</em>. Multiplying by <em>m</em>, to go from one register's share to the whole stream, gives the estimate <em>D̂</em> = <em>α</em><sub><em>m</em></sub> <em>m</em><sup>2</sup> / Σ<sub><em>j</em></sub> 2<sup>−<em>M</em><sub><em>j</em></sub></sup>, where <em>α</em><sub><em>m</em></sub> ≈ 0.72 corrects a bias. Its relative standard error is about 1.04/√<em>m</em>. With <em>m</em> = 2048 registers of 6 bits each, 1.5 KB, the error is about 2.3%, for counts in the billions. Like count-min tables, HyperLogLog sketches merge: the register-by-register maximum of two sketches is the sketch of the union.</p>
<p><b>Fixed hashes and the proofs.</b> The analyses so far assume random hash functions (and the Bloom filter analysis below will too): count-min needs each row's function drawn independently from a universal family, and the <em>k</em>-minimum-values and HyperLogLog analyses assume more, that the hashes of distinct items behave as independent uniform numbers. <code>unit_hash</code> above, and the <code>bucket</code> function in this lesson's programming problems, are fixed functions (<code>bucket</code> makes the rows differ by hashing the row number with the key, not by choosing anything at random). By Lesson 2's pigeonhole argument they have bad inputs, so the theorems don't apply to them as written. In practice, for a well-designed cryptographic hash such as BLAKE2 or SHA-256, nobody knows how to find inputs on which it behaves differently from a random function, so on inputs not built to attack it the errors match the analysis, as the 5.3% above did. Against an adversary who knows the function that is not enough, and the fix is to restore the randomness the proofs use: choose a secret random key when the sketch is created (<code>hashlib.blake2b</code> takes one as <code>key=</code>), as Lesson 2 chooses <em>a</em> and <em>b</em> at random. Checksums such as CRC-32 spread ordinary keys well but are easy to make collide on purpose.</p>

<h3>Bloom filters</h3>
<p>A <strong>Bloom filter</strong> (Burton Bloom, 1970) represents a set so that membership queries are answered with no false negatives and a small, tunable rate of false positives, in far less space than storing the keys. It is an array of <em>m</em> bits, all 0, and <em>k</em> hash functions <em>h</em><sub>1</sub>, …, <em>h</em><sub><em>k</em></sub> to {0, …, <em>m</em> − 1}.</p>
<ul>
<li>Insert <em>x</em>: set bits <em>h</em><sub>1</sub>(<em>x</em>), …, <em>h</em><sub><em>k</em></sub>(<em>x</em>) to 1.</li>
<li>Query <em>x</em>: answer "maybe present" if all <em>k</em> of those bits are 1, and "definitely absent" otherwise.</li>
</ul>
<p>An inserted key's bits are all 1, so it is always found. A key that was never inserted is reported present only if all its <em>k</em> bits were set by other keys: a <strong>false positive</strong>. Keys can't be deleted, since clearing a bit might remove other keys (a <em>counting</em> Bloom filter, with small counters instead of bits, allows deletion).</p>
<p><b>The false-positive rate.</b> Treat the hash values as independent and uniform. After inserting <em>n</em> keys, <em>kn</em> bit positions have been chosen, and a particular bit is still 0 with probability (1 − 1/<em>m</em>)<sup><em>kn</em></sup> ≈ <em>e</em><sup>−<em>kn</em>/<em>m</em></sup> (from 1 − <em>x</em> ≈ <em>e</em><sup>−<em>x</em></sup> for small <em>x</em>). A new key's <em>k</em> bits are all 1 with probability about</p>
<p class="math"><em>p</em> ≈ (1 − <em>e</em><sup>−<em>kn</em>/<em>m</em></sup>)<sup><em>k</em></sup></p>
<p>(This treats the <em>k</em> bits as independent, which is very nearly true for large <em>m</em>.) More hash functions mean more bits to check but also a fuller array. To find the best <em>k</em>, write <em>q</em> = <em>e</em><sup>−<em>kn</em>/<em>m</em></sup> for the probability that a bit is still 0. Then <em>k</em> = −(<em>m</em>/<em>n</em>) ln <em>q</em>, and ln <em>p</em> = <em>k</em> ln(1 − <em>q</em>) = −(<em>m</em>/<em>n</em>) · ln <em>q</em> · ln(1 − <em>q</em>). For a fixed number of bits per key, making <em>p</em> small means making ln <em>q</em> · ln(1 − <em>q</em>) large (both logarithms are negative, so the product is positive). That product is unchanged when <em>q</em> and 1 − <em>q</em> swap, and its derivative, ln(1 − <em>q</em>)/<em>q</em> − ln <em>q</em>/(1 − <em>q</em>), is zero at <em>q</em> = 1/2, where the product reaches its maximum, (ln 2)<sup>2</sup> ≈ 0.48. So the best choice makes each bit 1 with probability exactly 1/2: <em>e</em><sup>−<em>kn</em>/<em>m</em></sup> = 1/2, that is <em>k</em> = (<em>m</em>/<em>n</em>) ln 2, and then <em>p</em> = 2<sup>−<em>k</em></sup> and ln <em>p</em> = −(<em>m</em>/<em>n</em>)(ln 2)<sup>2</sup>. Solving for the size, a target rate <em>p</em> needs</p>
<p class="math"><em>m</em>/<em>n</em> = −ln <em>p</em> / (ln 2)<sup>2</sup> ≈ 1.44 log<sub>2</sub>(1/<em>p</em>) bits per key</p>
<p>For <em>p</em> = 1% that is 9.6 bits per key with 7 hash functions, and every factor of 10 lower costs another 4.8 bits per key. A million keys, which might take 30 MB as strings, fit in a 1.2 MB filter. The size depends only on <em>n</em> and <em>p</em>, not on how long the keys are.</p>
<pre><code>def fp_rate(m, n, k):
    return (1 - math.exp(-k * n / m)) ** k

n, p = 1000, 0.01
m = math.ceil(-n * math.log(p) / math.log(2) ** 2)
print(m, round(m / n * math.log(2), 2), round(fp_rate(m, n, 7), 4))   # 9586 6.64 0.01
print([round(fp_rate(10 * n, n, k), 4) for k in (2, 5, 7, 9)])       # [0.0329, 0.0094, 0.0082, 0.0091]</code></pre>
<p>The second line shows the trade-off for 10 bits per key: the rate is lowest near <em>k</em> = 10 ln 2 ≈ 6.9 and rises on both sides.</p>
<p>Bloom's own application was hyphenation. A program could hyphenate 90% of English words by simple rules, and the rest needed a dictionary on slow disk. A filter of those exceptions in memory sent almost every rule-following word past the disk; the occasional false positive merely cost an unnecessary disk read. That is the pattern of every use since: a cheap test in front of an expensive one, where false positives cost time but never correctness.</p>
<p class="note">Why it matters: sketches let a single machine summarize streams of any size in kilobytes, and because they merge, they let many machines summarize their shares separately and combine the results (a side pointer to CS 410's distributed systems).</p>
`,
    terms: [
      ["Data stream", "A sequence of items read once, in order, by an algorithm with memory much smaller than the stream."],
      ["Sketch", "A small summary of a data set from which approximate answers can be computed, usually with probabilistic guarantees."],
      ["Reservoir sampling", "Keeping a uniform random sample of k items from a stream of unknown length: item i replaces a random slot with probability k/i."],
      ["Heavy hitter", "An item whose frequency exceeds n/k, a fixed fraction of the stream."],
      ["Misra–Gries algorithm", "Finds heavy hitters with k − 1 counters; each estimate is within n/k below the true count."],
      ["Count-min sketch", "A d × w table of counters, one hash per row; the minimum of an item's counters overestimates its count by at most εN with probability 1 − δ."],
      ["Distinct count", "The number of different items in a stream; estimated by k minimum values or HyperLogLog."],
      ["HyperLogLog", "A distinct-count sketch storing, in each of m registers, the largest ρ seen, where ρ is the position of a hash's first 1 bit (one more than its number of leading zeros); standard error about 1.04/√m."],
      ["Bloom filter", "A bit array with k hash functions answering membership with no false negatives and a tunable false-positive rate."],
      ["False positive", "Reporting that an item is present when it is not."]
    ],
    quiz: [
      { q: "In reservoir sampling with k = 10, the 50th item arrives. With what probability does it enter the reservoir?", choices: ["1/50", "1/10", "10/49", "10/50 = 1/5"], answer: 3, why: "Item i enters with probability k/i, which keeps every item seen so far in the sample with probability k/i." },
      { q: "Misra–Gries runs with k = 20 on a stream of 1,000,000 items. An item occurs 80,000 times. What can its estimate be?", choices: ["Exactly 80,000", "Between 80,000 and 130,000", "Between 30,000 and 80,000", "Possibly 0"], answer: 2, why: "f − n/k ≤ estimate ≤ f, and n/k = 50,000." },
      { q: "Why does a count-min sketch never underestimate a count?", choices: ["Every counter an item touches includes all of that item's own updates, plus possibly others'", "It uses the minimum", "The hash functions are universal", "Counts are rounded up"], answer: 0, why: "Counters only receive additions, and all of x's additions go into each of x's counters." },
      { q: "A count-min sketch should have ε = 0.01 and δ = 0.001. What width and depth does the notes' analysis give?", choices: ["w = 100, d = 3", "w = 272, d = 7", "w = 272, d = 3", "w = 2719, d = 7"], answer: 1, why: "w = ⌈e/0.01⌉ = ⌈271.8⌉ = 272 and d = ⌈ln 1000⌉ = ⌈6.91⌉ = 7." },
      { q: "A Bloom filter answers 'present' for a key. What do you know?", choices: ["The key was inserted", "The key was not inserted", "The key was probably inserted, but it could be a false positive", "The filter is full"], answer: 2, why: "Bloom filters have no false negatives, but a key's bits may all have been set by other keys." },
      { q: "About how many bits per key does a Bloom filter need for a 0.1% false-positive rate, with the best number of hash functions?", choices: ["About 1.4", "About 14.4", "About 9.6", "About 100"], answer: 1, why: "m/n = −ln(0.001)/(ln 2)² ≈ 14.4, with k ≈ 10 hash functions." }
    ],
    practice: [
      {
        q: `<p>Your reservoir sampler has a bug: for item <em>i</em> &gt; <em>k</em> it replaces a random slot with probability 1/2 instead of <em>k</em>/<em>i</em>. Describe what the final sample looks like for a long stream.</p>`,
        a: `<p>Each new item has a 1/2 chance of entering, and each slot is replaced with probability 1/(2<em>k</em>) per item. So an item from <em>t</em> positions before the end survives with probability about (1 − 1/(2<em>k</em>))<sup><em>t</em></sup> ≈ <em>e</em><sup>−<em>t</em>/(2<em>k</em>)</sup>: the sample comes almost entirely from the last few multiples of 2<em>k</em> items. It is a sample of the recent past, not of the stream. (That can be useful, as an exponentially decaying sample, but it isn't uniform.)</p>`
      },
      {
        q: `<p>Run Misra–Gries with <em>k</em> = 2 (one counter, the majority vote) on the stream x y x z x x y x. Then explain why the item it keeps might not be a majority, and how to check.</p>`,
        a: `<p>x: {x: 1}; y: decrement, {}; x: {x: 1}; z: {}; x: {x: 1}; x: {x: 2}; y: {x: 1}; x: {x: 2}. It keeps x, which occurs 5 times out of 8, a majority. On the stream a b c the counter ends at {c: 1}, but c occurs only once: the guarantee is only that a true majority, <em>if one exists</em>, is kept. A second pass that counts the kept item's occurrences confirms or rejects it.</p>`
      },
      {
        q: `<p>A count-min sketch with <em>w</em> = 2719 and <em>d</em> = 5 processes a stream of 10 million clicks. An ad's estimate is 31,000. What does that tell you about its true count? How much memory does the sketch use with 4-byte counters?</p>`,
        a: `<p><em>w</em> = 2719 corresponds to <em>ε</em> = 0.001 and <em>d</em> = 5 to <em>δ</em> = <em>e</em><sup>−5</sup> ≈ 0.0067. So the true count is at most 31,000, and with probability at least 99.3% at least 31,000 − 0.001 × 10,000,000 = 21,000. Memory: 2719 × 5 × 4 = 54,380 bytes, about 54 KB, independent of the number of distinct ads.</p>`
      },
      {
        q: `<p>A database stores data in 100 files and keeps a Bloom filter per file of 10 bits per key with 7 hash functions. A lookup for a key that exists in exactly one file checks every filter and reads the files whose filters say "maybe". How many file reads does it make on average?</p>`,
        a: `<p>The file that holds the key always says "maybe": 1 read. Each of the other 99 says "maybe" with the false-positive probability (1 − <em>e</em><sup>−0.7</sup>)<sup>7</sup> ≈ 0.0082. Expected reads: 1 + 99 × 0.0082 ≈ 1.81, against 100 without filters (or about 50.5, stopping at the right file in random order). This is how LSM-tree databases such as LevelDB and RocksDB use Bloom filters.</p>
<pre><code>print(round(1 + 99 * fp_rate(10, 1, 7), 2))   # 1.81</code></pre>`
      }
    ],
    sources: ["cormode05", "misragries82", "vitter85", "hll07", "bloom70", "mit6854"]
  },
  {
    id: "aa6",
    title: "Online algorithms and beyond the worst case",
    minutes: 90,
    summary: "Deciding without knowing the future: competitive analysis, ski rental and its matching lower bound, paging (LRU is k-competitive and no deterministic algorithm does better), the secretary problem's 1/e rule, and a closing survey of resource augmentation, smoothed analysis, parameterized complexity and algorithms with predictions.",
    notes: `
<p>Every algorithm so far saw its whole input before deciding anything. Many real decisions can't wait: an operating system must choose which page to evict now, without knowing future references (CS 310 Lesson 6); a cloud user must decide today whether to keep renting a server or buy one; a hiring manager must answer a candidate before meeting the next. An <strong>online algorithm</strong> receives its input one piece at a time and must make an irrevocable decision about each piece before seeing the next. This lesson measures how much not knowing the future costs, then surveys other ways of judging algorithms beyond the worst case.</p>

<h3>Competitive analysis</h3>
<p>Compare the online algorithm with the best possible decisions made in hindsight, by an <strong>offline</strong> optimum OPT that knows the whole input. For a cost-minimization problem, a deterministic online algorithm ALG is <strong>c-competitive</strong> if there is a constant <em>a</em> such that for every input sequence <em>σ</em>,</p>
<p class="math">ALG(<em>σ</em>) ≤ <em>c</em> · OPT(<em>σ</em>) + <em>a</em></p>
<p>The smallest such <em>c</em> is its <strong>competitive ratio</strong>. It is like an approximation ratio, but what limits the algorithm is missing information rather than limited time: OPT may take exponential time. To prove a lower bound, imagine an <strong>adversary</strong> who knows the algorithm and builds the input step by step to hurt it.</p>

<h3>Ski rental</h3>
<p>Renting skis costs 1 per day; buying costs <em>B</em> (an integer &gt; 1). You don't know how many days <em>d</em> you will ski: each morning you learn only whether you are skiing today. If you knew <em>d</em>, you would buy if <em>d</em> ≥ <em>B</em> and rent otherwise: OPT = min(<em>d</em>, <em>B</em>). The same problem appears as "keep paying for a cloud server by the hour or reserve it for a year", "spin-wait for a lock or block the thread" (CS 310 Lesson 4), and "keep a disk spinning or spin it down".</p>
<p><b>Break-even.</b> Rent for the first <em>B</em> − 1 days; if still skiing on day <em>B</em>, buy.</p>
<ul>
<li>If <em>d</em> &lt; <em>B</em>: it pays <em>d</em> = OPT.</li>
<li>If <em>d</em> ≥ <em>B</em>: it pays (<em>B</em> − 1) + <em>B</em> = 2<em>B</em> − 1, and OPT = <em>B</em>.</li>
</ul>
<p>So ALG ≤ (2 − 1/<em>B</em>) OPT for every <em>d</em>: break-even is (2 − 1/<em>B</em>)-competitive. With <em>B</em> = 10, a 10-day season costs 19 instead of 10, and that is the worst case.</p>
<p>Here the additive constant <em>a</em> must be 0. Every cost in ski rental is below 2<em>B</em>, so an <em>a</em> allowed to depend on <em>B</em> would hide everything: break-even satisfies ALG ≤ OPT + (<em>B</em> − 1) for every <em>d</em>, which would make it "1-competitive". For problems whose costs are bounded like this, competitive ratios are stated in the strict form ALG ≤ <em>c</em> · OPT, and that is the form used for ski rental here. The constant <em>a</em> is meant for problems such as paging, where costs grow with the length of the input and a fixed start-up cost (filling an empty cache) shouldn't count against the ratio.</p>
<p><b>No deterministic strategy does better.</b> A deterministic strategy is just a day <em>t</em> on which it buys (or never). The adversary ends the season on day <em>t</em>, right after the purchase, so ALG = (<em>t</em> − 1) + <em>B</em> while OPT = min(<em>t</em>, <em>B</em>). If <em>t</em> ≤ <em>B</em>, the ratio is (<em>t</em> − 1 + <em>B</em>)/<em>t</em> = 1 + (<em>B</em> − 1)/<em>t</em> ≥ 1 + (<em>B</em> − 1)/<em>B</em> = 2 − 1/<em>B</em>. If <em>t</em> &gt; <em>B</em>, it is (<em>t</em> − 1 + <em>B</em>)/<em>B</em> ≥ 2<em>B</em>/<em>B</em> = 2. A strategy that never buys loses without limit on a long season. So 2 − 1/<em>B</em> is optimal. Randomizing the purchase day, against an adversary who knows the strategy but not the coin flips, lowers the ratio to <em>e</em>/(<em>e</em> − 1) ≈ 1.58 for large <em>B</em> (Karlin, Manasse, McGeoch and Owicki, 1994).</p>

<h3>Paging</h3>
<p>A cache (or memory) holds <em>k</em> pages; a request for a page not in the cache is a <strong>fault</strong> and must bring the page in, evicting another if the cache is full. CS 310 Lesson 6 compared FIFO, LRU and Belady's OPT, which evicts the page used farthest in the future and has the fewest faults but needs to know the future. How far from OPT can an online policy be forced?</p>
<p><b>No deterministic policy is better than k-competitive.</b> Use only <em>k</em> + 1 different pages. After the cache fills, the adversary always requests the one page that is not in the cache, which it can determine because the policy is deterministic. The policy faults on every request. OPT, on the same sequence, faults at most once every <em>k</em> requests: when it faults, it evicts the cached page requested farthest in the future, and since only <em>k</em> + 1 pages exist, the other <em>k</em> − 1 cached pages and the new one are all requested before that page, so the next fault is at least <em>k</em> requests away. So the policy has about <em>k</em> times as many faults as OPT.</p>
<p><b>LRU is k-competitive</b> (Daniel Sleator and Robert Tarjan, 1985). Split the request sequence into <strong>phases</strong>: a phase starts with a request and continues as long as it contains at most <em>k</em> distinct pages; the request that would make <em>k</em> + 1 distinct pages starts the next phase. For example, with <em>k</em> = 2 the sequence 1 2 1 3 4 3 1 5 2 splits into phases 1 2 1 | 3 4 3 | 1 5 | 2.</p>
<ul>
<li><b>LRU faults at most k times per phase.</b> Once a page <em>p</em> is requested in a phase, LRU can evict it only after <em>k</em> distinct other pages have been requested more recently than <em>p</em>, which takes <em>k</em> + 1 distinct pages since <em>p</em>'s request, more than the phase contains. So within a phase, each of its at most <em>k</em> distinct pages faults at most once.</li>
<li><b>OPT faults at least once per phase, after the first.</b> Take phase <em>i</em> (not the last) and let <em>p</em> be its first request. Look at the requests after that one up to and including the first request of phase <em>i</em> + 1. They include the other <em>k</em> − 1 distinct pages of phase <em>i</em> and the page that starts phase <em>i</em> + 1, so <em>k</em> distinct pages, none of them <em>p</em>. Just after <em>p</em>'s request, OPT's cache holds <em>p</em> and at most <em>k</em> − 1 others, so at least one of those <em>k</em> pages is missing and OPT faults during this stretch. The stretches for different phases don't overlap, so with <em>P</em> phases OPT ≥ <em>P</em> − 1.</li>
</ul>
<p>Together, LRU ≤ <em>kP</em> ≤ <em>k</em> · OPT + <em>k</em>. A similar argument shows that FIFO is <em>k</em>-competitive too. Yet in practice LRU is far better than FIFO, and both are far better than <em>k</em> times OPT, because real programs have locality and never resemble the adversary's sequence. Competitive analysis is too pessimistic here, which motivates the rest of this lesson.</p>
<pre><code>def lru_faults(requests, k):
    cache, faults = [], 0              # most recently used page at the end
    for p in requests:
        if p in cache:
            cache.remove(p)
        else:
            faults += 1
            if len(cache) == k:
                cache.pop(0)
        cache.append(p)
    return faults

cyclic = [0, 1, 2, 3, 4] * 20          # k + 1 = 5 pages in rotation
print(lru_faults(cyclic, 4))           # 100</code></pre>
<p>Cycling through <em>k</em> + 1 pages is exactly the adversary's sequence for LRU: the requested page is always the one evicted most recently. All 100 requests fault, while OPT faults on the first 4 and then about once every 4 requests, 28 times in all. (A program that loops over an array slightly bigger than the cache does this, which is why databases often avoid plain LRU for scans.)</p>

<h3>The secretary problem</h3>
<p><em>n</em> candidates arrive in random order. After interviewing each, you know how they rank against those seen so far, and you must hire or reject them on the spot, for good. You want the very best one. What strategy maximizes the probability of success?</p>
<p>Consider the rule: reject the first <em>r</em> candidates, then hire the first one better than all of them (or the last one, if none is). It succeeds if the best candidate is at some position <em>i</em> &gt; <em>r</em> (probability 1/<em>n</em> for each <em>i</em>) and the rule doesn't stop earlier. It stops earlier exactly when someone between positions <em>r</em> + 1 and <em>i</em> − 1 beats the first <em>r</em>, which happens unless the best of the first <em>i</em> − 1 candidates lies among the first <em>r</em>; in random order that has probability <em>r</em>/(<em>i</em> − 1). So</p>
<p class="math">P(success) = Σ<sub><em>i</em>=<em>r</em>+1</sub><sup><em>n</em></sup> (1/<em>n</em>) · <em>r</em>/(<em>i</em> − 1) = (<em>r</em>/<em>n</em>)(1/<em>r</em> + 1/(<em>r</em> + 1) + … + 1/(<em>n</em> − 1)) ≈ (<em>r</em>/<em>n</em>) ln(<em>n</em>/<em>r</em>)</p>
<p>(The sum of 1/<em>j</em> from <em>r</em> to <em>n</em> − 1 is about the area under 1/<em>x</em> from <em>r</em> to <em>n</em>, ln <em>n</em> − ln <em>r</em>.) Writing <em>x</em> = <em>r</em>/<em>n</em>, maximize −<em>x</em> ln <em>x</em>: its derivative −ln <em>x</em> − 1 is 0 at <em>x</em> = 1/<em>e</em>, where the value is 1/<em>e</em>. So: reject the first 37% of candidates, then take the next one who beats them all; you get the best with probability about 1/<em>e</em> ≈ 0.368, however large <em>n</em> is. No strategy does better for large <em>n</em>.</p>
<pre><code>def success_probability(n, r):
    return 1 / n if r == 0 else r / n * sum(1 / (i - 1) for i in range(r + 1, n + 1))

best = max(range(100), key=lambda r: success_probability(100, r))
print(best, round(success_probability(100, best), 4))   # 37 0.371</code></pre>
<p>Here the input is not adversarial: the random arrival order is what makes a guarantee possible. If an adversary chose the order, it would present candidates in increasing order of quality after your cutoff, or decreasing before it, and no strategy could do better than 1/<em>n</em>.</p>

<h3>Beyond the worst case</h3>
<p>Worst-case analysis gives guarantees that hold no matter what, which is why this degree has used it throughout. But it can mislead: LRU and FIFO look equally good, and the simplex method, exponential in the worst case, is fast on nearly every LP anyone solves. Several refinements explain such gaps while keeping proofs:</p>
<ul>
<li><b>Resource augmentation.</b> Compare the online algorithm with an optimum that has fewer resources. Sleator and Tarjan also showed that LRU with <em>k</em> pages faults at most <em>k</em>/(<em>k</em> − <em>h</em> + 1) times as often as OPT with <em>h</em> ≤ <em>k</em> pages (plus a constant). With twice OPT's memory (<em>h</em> = <em>k</em>/2), the ratio is below 2.</li>
<li><b>Smoothed analysis</b> (Daniel Spielman and Shang-Hua Teng, 2001). Take a worst-case input and perturb it slightly at random, as real data is perturbed by measurement noise; bound the expected time on the perturbed input. Spielman and Teng proved that the simplex method takes polynomial expected time under small Gaussian perturbations, explaining why the Klee–Minty inputs never arise in practice. The two received the Gödel Prize in 2008.</li>
<li><b>Parameterized complexity.</b> Measure the running time by the input size <em>n</em> and a second parameter <em>k</em> as well, and look for time <em>f</em>(<em>k</em>) · poly(<em>n</em>), which is fast whenever <em>k</em> is small even if <em>f</em> is exponential. Such problems are <strong>fixed-parameter tractable</strong>. Vertex cover with a cover of size at most <em>k</em> is one: take any uncovered edge (<em>u</em>, <em>v</em>); some cover of size <em>k</em> contains <em>u</em> or <em>v</em>, so branch on both choices with <em>k</em> − 1 left. The search tree has depth <em>k</em> and at most 2<sup><em>k</em></sup> leaves, for O(2<sup><em>k</em></sup> · <em>m</em>) time on <em>m</em> edges. For <em>k</em> = 20 on 10,000 edges that is about 2<sup>20</sup> · 10<sup>4</sup> ≈ 10<sup>10</sup> basic steps, roughly ten seconds at 10<sup>9</sup> steps a second, while trying all C(<em>n</em>, <em>k</em>) subsets of, say, <em>n</em> = 5,000 vertices means about 4 × 10<sup>55</sup> subsets. The exponential part still bites: <em>k</em> = 30 on a million edges would be about 10<sup>15</sup> steps, almost two weeks of computing.</li>
<li><b>Instance-specific and average-case analysis.</b> Bound the cost in terms of a property of the particular input (the number of distinct pages in a window, how sorted a list already is: Timsort, Python's sort from CS 201 Lesson 6, finds the <em>runs</em>, stretches of the list already in order, and merges them, so it takes Θ(<em>n</em>) time on a list that is already sorted) or of a probability distribution over inputs, as for the secretary problem.</li>
<li><b>Algorithms with predictions.</b> A recent line of work gives online algorithms a machine-learned forecast (of the season's length, of the next request for each page) and asks for two guarantees at once: near-optimal when the prediction is good, and still within a bounded factor of OPT when it is badly wrong. For ski rental, trusting the prediction more lowers the cost when it is right and raises the worst case when it is wrong, and the trade-off between the two can be proved exactly.</li>
</ul>
<p class="note">Why it matters: the questions of this course (what does a sequence cost, how lucky must we be, how close to optimal, how much must we remember, how much does the future matter) are the questions to ask of any algorithm you build, and each has a mathematical answer worth knowing before you ship.</p>
`,
    terms: [
      ["Online algorithm", "An algorithm that receives its input piece by piece and must decide about each piece before seeing the next."],
      ["Offline optimum", "The best possible cost for the whole input, computed with full knowledge of the future."],
      ["Competitive ratio", "The smallest c with ALG ≤ c · OPT + a on every input sequence."],
      ["Adversary", "An imagined opponent who knows the algorithm and builds the input to make it perform badly."],
      ["Ski rental", "The rent-or-buy problem; buying on day B is (2 − 1/B)-competitive, the best a deterministic strategy can do."],
      ["Phase (paging)", "A maximal stretch of requests containing at most k distinct pages."],
      ["Secretary problem", "Hiring the best of n candidates seen in random order with irrevocable decisions; the 1/e rule succeeds with probability about 0.368."],
      ["Resource augmentation", "Comparing an online algorithm with an optimum that has fewer resources."],
      ["Smoothed analysis", "Bounding the expected cost on slightly randomly perturbed worst-case inputs."],
      ["Fixed-parameter tractable", "Solvable in f(k) · poly(n) time for some function f of a parameter k."]
    ],
    quiz: [
      { q: "Skis cost 20 to buy and 1 a day to rent. You follow break-even and ski 30 days. What do you pay, and what is OPT?", choices: ["39 and 20", "20 and 20", "30 and 20", "50 and 30"], answer: 0, why: "Rent 19 days (19), then buy on day 20 (20): 39 in all. OPT buys at once: 20." },
      { q: "Why can no deterministic ski-rental strategy beat 2 − 1/B?", choices: ["Buying is always better", "Renting is always better", "The adversary ends the season right after the strategy buys", "Because of the triangle inequality"], answer: 2, why: "Then ALG = t − 1 + B while OPT = min(t, B), a ratio of at least 2 − 1/B for every t." },
      { q: "In the proof that LRU is k-competitive, why does LRU fault at most k times in a phase?", choices: ["OPT faults k times", "A page requested in the phase stays cached until k other distinct pages are requested after it, which doesn't happen within the phase", "Phases have k requests", "LRU never faults twice in a row"], answer: 1, why: "A phase has at most k distinct pages, so each faults at most once in it." },
      { q: "With k = 3, how does 1 2 3 1 4 2 5 split into phases?", choices: ["1 2 3 | 1 4 2 | 5", "1 2 3 1 | 4 2 | 5", "1 2 | 3 1 | 4 2 | 5", "1 2 3 1 | 4 2 5"], answer: 3, why: "The first phase continues until a 4th distinct page (4) arrives; the second holds 4, 2, 5, only 3 distinct pages." },
      { q: "In the secretary problem with 1,000 candidates, about how many should you reject before hiring the first one better than all so far?", choices: ["About 100", "About 368", "About 500", "About 632"], answer: 1, why: "The optimal cutoff is about n/e ≈ 368, giving success probability about 1/e." },
      { q: "Which approach explains why the simplex method is fast in practice despite exponential worst cases?", choices: ["Smoothed analysis", "Competitive analysis", "Amortized analysis", "Parameterized complexity"], answer: 0, why: "Spielman and Teng showed polynomial expected time on slightly perturbed inputs." }
    ],
    practice: [
      {
        q: `<p>A ski-rental variant: renting costs 1 per day, buying costs <em>B</em>, and you consider the strategy "buy on day ⌈<em>B</em>/2⌉". What is its competitive ratio for large <em>B</em>? Why is it worse than break-even?</p>`,
        a: `<p>With <em>t</em> = ⌈<em>B</em>/2⌉, the worst season ends on day <em>t</em>: ALG = <em>t</em> − 1 + <em>B</em> ≈ 1.5<em>B</em> and OPT = <em>t</em> ≈ <em>B</em>/2, a ratio of about 3. Buying early pays the full price on seasons that turn out short. Break-even balances the two mistakes: the most it can have wasted on rent when it buys is about equal to the price.</p>
<pre><code>B = 100
t = 50
print(max(((d if d &lt; t else t - 1 + B) / min(d, B)) for d in range(1, 300)))   # 2.98</code></pre>`
      },
      {
        q: `<p>Split 1 2 3 4 1 2 5 1 2 3 4 5 into phases for <em>k</em> = 3. With 3 frames, LRU makes 10 faults on it and OPT makes 7 (CS 310 Lesson 6, Practice 1, runs both by hand). Check both bounds from the notes: LRU ≤ <em>k</em> · (phases) and OPT ≥ phases − 1.</p>`,
        a: `<p>Phases: 1 2 3 | 4 1 2 | 5 1 2 | 3 4 5: four phases. LRU's bound: 10 ≤ 3 × 4 = 12. OPT's: 7 ≥ 4 − 1 = 3. Both hold, with room: the bounds are worst-case.</p>
<pre><code>s = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]
print(lru_faults(s, 3))                # 10</code></pre>`
      },
      {
        q: `<p>For the secretary problem with <em>n</em> = 3, list all 6 orders and find the success probability of the rule with <em>r</em> = 1. Compare with the formula.</p>`,
        a: `<p>Rank the candidates 1 (worst) to 3 (best). With <em>r</em> = 1, reject the first, then hire the first who beats it (or the last). Orders: 123 → hires 2 (fail); 132 → hires 3 (success); 213 → hires 3 (success); 231 → hires 3 (success); 312 → nobody beats 3, so hires the last, 2 (fail); 321 → hires 1 (fail). Success in 3 of 6: probability 1/2. Formula: (1/3)(1/1 + 1/2) = 1/2. (With <em>r</em> = 0 or 2, the probability is only 1/3.)</p>
<pre><code>print(success_probability(3, 1), round(success_probability(3, 2), 4))   # 0.5 0.3333</code></pre>`
      },
      {
        q: `<p>Use the branching idea from the notes to decide whether the cycle 1–2–3–4–5–1 has a vertex cover of size 2. How many leaves does the search tree have?</p>`,
        a: `<p>Start with budget 2 and the uncovered edge (1, 2). <b>Branch on 1</b> (budget 1): the edges (2, 3), (3, 4), (4, 5) are still uncovered. Take (2, 3) and branch on 2 or on 3 (budget 0): either way (4, 5) is still uncovered, so both leaves fail. <b>Branch on 2</b> (budget 1): (3, 4), (4, 5), (5, 1) are uncovered. Take (3, 4) and branch on 3 or 4 (budget 0): (5, 1) or (4, 5) is left uncovered, so both fail. The tree has 2<sup>2</sup> = 4 leaves, all failures: there is no cover of size 2. That agrees with counting: each vertex covers 2 of the 5 edges, so 2 vertices cover at most 4. (A cover of size 3, such as {1, 3, 4}, exists.)</p>`
      }
    ],
    sources: ["sleatortarjan85", "roughgarden20", "kleinberg", "jeffe"]
  }
]);

CSA.addAsides("cs430", {
  aa2: [
    { kind: "history", title: "Randomness enters algorithms", html: `<p>In the mid-1970s, testing whether a large number is prime was a practical problem with no fast proven method. Gary Miller (1976) gave a fast test that is correct if an unproved conjecture in number theory, the extended Riemann hypothesis, holds. Robert Solovay and Volker Strassen (1977) and Michael Rabin (1976, published 1980) turned such tests into Monte Carlo algorithms: a composite number fails each random round with probability at least 1/2 (at least 3/4 for the Miller–Rabin test), so 50 rounds leave an error probability below 2<sup>−100</sup>. These tests made RSA (MATH 121 Lesson 5) practical, since generating a key needs large random primes, and they convinced many computer scientists that randomness was a resource like time and memory. Whether it is really needed is still open: in 2002 Manindra Agrawal, Neeraj Kayal and Nitin Saxena, a professor and two undergraduate students in Kanpur, found a deterministic polynomial-time primality test. It is slower in practice than Miller–Rabin, which remains the test real software uses, but it showed that for primality, randomness was a convenience rather than a necessity. Many researchers conjecture that the same holds for every problem a randomized algorithm can solve in polynomial time.</p>`, sources: ["clrs"] }
  ],
  aa4: [
    { kind: "history", title: "Planning by linear programming", html: `<p>In 1939 Leonid Kantorovich, a mathematician in Leningrad, was asked by a plywood trust how to assign work to machines to maximize output, and formulated the problem as what we now call a linear program, with "resolving multipliers" that are dual prices. His work was little read outside the Soviet Union, where prices set by optimization rather than by planners were politically suspect. In the United States, George Dantzig, working on planning problems for the Air Force after World War II, formulated linear programming in general and invented the simplex method in 1947; when he described it to John von Neumann, von Neumann recognized the dual from his own work on game theory and conjectured the duality theorem. The word "programming", as in Bellman's "dynamic programming" (CS 220 Lesson 3), meant a military plan or schedule. Kantorovich and Tjalling Koopmans shared the 1975 Nobel Memorial Prize in Economics for optimal allocation of resources; Dantzig was not included, which surprised many. In 1979 Leonid Khachiyan's ellipsoid method made the front page of the New York Times as a breakthrough in computation; it proved LPs could be solved in polynomial time, but was slow in practice. Narendra Karmarkar's interior-point method of 1984 was both polynomial and practical, and modern solvers use both it and the simplex method.</p>`, sources: ["clrs", "jeffe"] }
  ],
  aa5: [
    { kind: "practice", title: "Sketches in production", html: `<p>The structures of this lesson run inside systems you use daily. LSM-tree databases such as LevelDB, RocksDB and Cassandra (CS 340 Lesson 8: writes collect in memory and are written out as immutable sorted files, so a key may be in any of many files) keep a Bloom filter for each file on disk, so that a lookup reads only the files that might hold the key (Practice 4). Redis, a widely used in-memory data store, offers HyperLogLog counters (the PFADD and PFCOUNT commands) that use 12 KB each, 16,384 registers of 6 bits, for a standard error of 0.81% on counts in the billions; analytics systems use the same idea to count distinct users per page per day without storing who they were. Network equipment and stream-processing systems use count-min and related sketches to find heavy flows for traffic engineering and to spot attacks, and Misra–Gries-style counters underlie "top-k" queries. Two practical points come up everywhere. First, the hash functions matter: a weak or predictable hash breaks the independence the analysis assumes, and an attacker who knows it can make a Bloom filter report everything present or make sketches overcount chosen items. Second, sketches are summaries, not anonymization. A sketch of user identifiers can still reveal whether a particular person is in the data, which matters for privacy law; systems that need privacy add noise deliberately (differential privacy) on top.</p>`, sources: ["bloom70", "hll07", "cormode05"] }
  ],
  aa6: [
    { kind: "history", title: "Where competitive analysis came from", html: `<p>Before 1985, online problems such as paging were analyzed by assuming a probability model of the requests, and conclusions depended on the model. Daniel Sleator and Robert Tarjan's 1985 paper on list updating and paging (the same pair who invented splay trees, Lesson 1) instead compared an online algorithm with the optimal offline one on every sequence, proving that the move-to-front rule for lists and LRU for paging are within constant factors of optimal. The term "competitive" was introduced soon after by Anna Karlin, Mark Manasse, Larry Rudolph and Sleator in a 1986 paper on caches in multiprocessors, and competitive analysis became a field of its own. The secretary problem is older and has a murkier history. It circulated among mathematicians in the 1950s, reached a wide audience through Martin Gardner's "Mathematical Games" column in Scientific American in 1960, and was solved in print by Dennis Lindley in 1961 and in general by Eugene Dynkin in 1963. Its 1/<em>e</em> rule is now the template for online auctions and for "prophet inequalities", which ask how well an online decision maker can do against one who sees the future.</p>`, sources: ["sleatortarjan85", "roughgarden20"] }
  ]
});
