CSA.addCourse({
  id: "cs220",
  code: "CS 220",
  title: "Algorithms I",
  credits: 4,
  kind: "required",
  term: "y2s",
  summary: "How to design algorithms and prove them correct and efficient: divide and conquer, greedy algorithms, dynamic programming, shortest paths, minimum spanning trees and network flow, ending with the problems no one knows how to solve quickly and what to do about them.",
  prereqs: ["CS 201 Data Structures", "MATH 121 Discrete Mathematics II"],
  outcomes: [
    "Analyze divide-and-conquer algorithms with recurrences and the master theorem",
    "Design greedy algorithms and prove them correct with exchange arguments",
    "Formulate and solve problems with dynamic programming, and reconstruct the solutions",
    "Apply and prove correct the standard shortest-path, spanning-tree and maximum-flow algorithms",
    "Reduce one problem to another, and explain P, NP and NP-completeness",
    "Choose an approach for a new problem and justify its cost"
  ],
  rubric: {
    criteriaFor: "problem sets and the project",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 30, desc: "Weekly: the lesson's programming problems, plus written problems that ask you to design an algorithm, prove it correct and analyze its running time." },
      { name: "Project", weight: 15, desc: "Implement two algorithms for one real problem (for example, route planning on a road network, or scheduling exams without conflicts), compare them on real data, and write a 4-page report." },
      { name: "Midterm exam", weight: 20, desc: "Divide and conquer, greedy algorithms and dynamic programming (lessons 1–4)." },
      { name: "Final exam", weight: 25, desc: "Cumulative, with emphasis on graph algorithms, flow and intractability (lessons 5–8)." }
    ],
    criteria: [
      { name: "Correctness of the algorithm", desc: "Does it always work?", levels: [
        "Correct on all inputs, including edge cases (empty input, ties, disconnected graphs).",
        "Correct on typical inputs; misses an edge case.",
        "Correct only on some inputs.",
        "Incorrect." ] },
      { name: "Proof", desc: "Is correctness argued convincingly?", levels: [
        "A complete proof: an invariant, an exchange argument, or induction, with every step justified.",
        "A convincing sketch with a gap.",
        "An argument by example only.",
        "No argument." ] },
      { name: "Analysis", desc: "Is the running time right and justified?", levels: [
        "A tight bound, derived from the algorithm's structure (loops, recurrences, data structure costs).",
        "Correct bound with a weak derivation.",
        "Bound stated without reasons, or loose.",
        "No analysis, or wrong." ] },
      { name: "Clarity", desc: "Can a reader follow it?", levels: [
        "Clear description (in words and code), with the key idea stated first.",
        "Mostly clear.",
        "Hard to follow.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Proofs matter:</b> an algorithm without an argument for its correctness earns partial credit, however well it runs on the tests.",
      "<b>Collaboration:</b> discuss problems freely; write up your own solutions and name your collaborators.",
      "<b>AI assistants:</b> you may use them to explain concepts, and must say how. Designs, proofs and code you submit must be your own, and you must be able to explain them in an oral check.",
      "<b>Late work:</b> problem sets are accepted up to two days late for 80% credit."
    ]
  },
  units: [
    {
      id: "al1",
      title: "Divide and conquer",
      minutes: 90,
      summary: "Solving a problem by splitting it into smaller copies of itself: recurrences, the master theorem that solves the common ones, and two algorithms that beat the obvious method: Karatsuba multiplication and counting inversions.",
      notes: `
<p>Merge sort and binary search (CS 101 Lesson 13) and quicksort (CS 201 Lesson 6) share a shape. They split a problem into smaller problems of the same kind, solve those recursively, and combine the answers. This shape is called <strong>divide and conquer</strong>, and it is the first of the design techniques this course studies. This lesson gives a tool for analyzing such algorithms quickly, then two examples where dividing well beats the obvious algorithm.</p>

<h3>The recurrences</h3>
<p>A divide-and-conquer algorithm that splits a problem of size <em>n</em> into <em>a</em> subproblems of size <em>n</em>/<em>b</em>, and does <em>f</em>(<em>n</em>) work to split and combine, has running time</p>
<p class="math">T(n) = a T(n/b) + f(n)</p>
<p>CS 201 Lesson 1 solved merge sort's recurrence, T(<em>n</em>) = 2T(<em>n</em>/2) + Θ(<em>n</em>), with a recursion tree: every level does Θ(<em>n</em>) work, and there are log₂ <em>n</em> levels. The same tree solves the general case. Level <em>j</em> has <em>a</em><sup><em>j</em></sup> subproblems of size <em>n</em>/<em>b</em><sup><em>j</em></sup>. If <em>f</em>(<em>n</em>) = Θ(<em>n</em><sup><em>d</em></sup>), level <em>j</em> does about</p>
<p class="math">a<sup>j</sup> · (n/b<sup>j</sup>)<sup>d</sup> = n<sup>d</sup> · (a/b<sup>d</sup>)<sup>j</sup></p>
<p>work. The levels form a geometric series with ratio <em>r</em> = <em>a</em>/<em>b</em><sup><em>d</em></sup>, and a geometric series is dominated by its largest term (MATH 131 Lesson 4). That gives three cases.</p>

<h3>The master theorem</h3>
<div class="callout"><p>For T(<em>n</em>) = <em>a</em>T(<em>n</em>/<em>b</em>) + Θ(<em>n</em><sup><em>d</em></sup>), with <em>a</em> ≥ 1, <em>b</em> &gt; 1 and <em>d</em> ≥ 0:</p>
<ul>
<li>If <em>d</em> &gt; log<sub><em>b</em></sub> <em>a</em> (the ratio is below 1: the top level dominates), T(<em>n</em>) = Θ(<em>n</em><sup><em>d</em></sup>).</li>
<li>If <em>d</em> = log<sub><em>b</em></sub> <em>a</em> (ratio exactly 1: every level is equal), T(<em>n</em>) = Θ(<em>n</em><sup><em>d</em></sup> log <em>n</em>).</li>
<li>If <em>d</em> &lt; log<sub><em>b</em></sub> <em>a</em> (ratio above 1: the leaves dominate), T(<em>n</em>) = Θ(<em>n</em><sup><em>k</em></sup>), where <em>k</em> = log<sub><em>b</em></sub> <em>a</em>.</li>
</ul></div>
<p>(The condition <em>d</em> &gt; log<sub><em>b</em></sub> <em>a</em> is the same as <em>b</em><sup><em>d</em></sup> &gt; <em>a</em>, that is, <em>r</em> &lt; 1. In the third case the answer is the number of leaves, each doing constant work. The sizes shrink by a factor of <em>b</em> per level, so the tree has <em>h</em> = log<sub><em>b</em></sub> <em>n</em> levels below the root and <em>a</em><sup><em>h</em></sup> leaves. To see that this is <em>n</em><sup><em>k</em></sup>, use <em>a</em> = <em>b</em><sup><em>k</em></sup> (the definition of <em>k</em> = log<sub><em>b</em></sub> <em>a</em>) and <em>b</em><sup><em>h</em></sup> = <em>n</em> (the definition of <em>h</em>): <em>a</em><sup><em>h</em></sup> = (<em>b</em><sup><em>k</em></sup>)<sup><em>h</em></sup> = (<em>b</em><sup><em>h</em></sup>)<sup><em>k</em></sup> = <em>n</em><sup><em>k</em></sup>. For Karatsuba below, <em>a</em> = 3 and <em>b</em> = 2: 3<sup><em>h</em></sup> leaves with <em>h</em> = log₂ <em>n</em>, which is <em>n</em><sup>1.585</sup>.)</p>
<table>
<thead><tr><th>Algorithm</th><th>Recurrence</th><th>a, b, d</th><th>Case</th><th>Result</th></tr></thead>
<tbody>
<tr><td>Binary search</td><td>T(n/2) + Θ(1)</td><td>1, 2, 0</td><td>d = log₂ 1 = 0</td><td>Θ(log n): about log₂ n halvings, so 10 steps for 1,000 items</td></tr>
<tr><td>Merge sort</td><td>2T(n/2) + Θ(n)</td><td>2, 2, 1</td><td>d = log₂ 2 = 1</td><td>Θ(n log n)</td></tr>
<tr><td>Naive recursive multiplication (below)</td><td>4T(n/2) + Θ(n)</td><td>4, 2, 1</td><td>d &lt; log₂ 4 = 2</td><td>Θ(n²)</td></tr>
<tr><td>Karatsuba (below)</td><td>3T(n/2) + Θ(n)</td><td>3, 2, 1</td><td>d &lt; log₂ 3 ≈ 1.585</td><td>Θ(n<sup>1.585</sup>)</td></tr>
<tr><td>A quadratic combine step</td><td>2T(n/2) + Θ(n²)</td><td>2, 2, 2</td><td>d &gt; log₂ 2 = 1</td><td>Θ(n²)</td></tr>
</tbody>
</table>
<p>The theorem doesn't cover everything (for example, uneven splits, or <em>f</em>(<em>n</em>) = <em>n</em> log <em>n</em>), but a recursion tree always works.</p>

<h3>Karatsuba multiplication</h3>
<p>Multiplying two <em>n</em>-digit numbers the way you learned in school takes Θ(<em>n</em>²) single-digit multiplications. In 1960 Andrey Kolmogorov, one of the great mathematicians of the century, conjectured in a seminar that nothing faster was possible. Within a week a 23-year-old student in the seminar, Anatoly Karatsuba, found a faster method.</p>
<p>Split each number into a high half and a low half. (The letters here are new names, not the master theorem's <em>a</em>, <em>b</em> and <em>d</em>: subscript 1 marks a high half and 0 a low half.) With <em>m</em> = <em>n</em>/2 digits in each half, <em>x</em> = <em>x</em>₁ · 10<sup><em>m</em></sup> + <em>x</em>₀ and <em>y</em> = <em>y</em>₁ · 10<sup><em>m</em></sup> + <em>y</em>₀, so</p>
<p class="math">xy = x₁y₁ · 10<sup>2m</sup> + (x₁y₀ + x₀y₁) · 10<sup>m</sup> + x₀y₀</p>
<p>That needs four half-size products (<em>x</em>₁<em>y</em>₁, <em>x</em>₁<em>y</em>₀, <em>x</em>₀<em>y</em>₁, <em>x</em>₀<em>y</em>₀): T(<em>n</em>) = 4T(<em>n</em>/2) + Θ(<em>n</em>), which the table shows is still Θ(<em>n</em>²). Karatsuba's trick computes the middle term with only <em>one</em> more product:</p>
<p class="math">x₁y₀ + x₀y₁ = (x₁ + x₀)(y₁ + y₀) − x₁y₁ − x₀y₀</p>
<p>Three half-size products instead of four gives T(<em>n</em>) = 3T(<em>n</em>/2) + Θ(<em>n</em>) (in the table, <em>a</em> = 3 subproblems, each of size <em>n</em>/<em>b</em> with <em>b</em> = 2, and Θ(<em>n</em><sup><em>d</em></sup>) = Θ(<em>n</em>) extra work for the additions and shifts, so <em>d</em> = 1). That is Θ(<em>n</em><sup>log₂ 3</sup>) ≈ Θ(<em>n</em><sup>1.585</sup>). For 1234 × 5678: <em>x</em>₁ = 12, <em>x</em>₀ = 34, <em>y</em>₁ = 56, <em>y</em>₀ = 78. Then <em>x</em>₁<em>y</em>₁ = 672, <em>x</em>₀<em>y</em>₀ = 2652, and (12 + 34)(56 + 78) − 672 − 2652 = 6164 − 3324 = 2840. So the product is 672 · 10<sup>4</sup> + 2840 · 10<sup>2</sup> + 2652 = 7,006,652.</p>
<pre><code>def karatsuba(x, y):
    if x &lt; 10 or y &lt; 10:                 # a single digit: multiply directly
        return x * y
    m = max(len(str(x)), len(str(y))) // 2
    x1, x0 = divmod(x, 10 ** m)           # x = x1·10^m + x0
    y1, y0 = divmod(y, 10 ** m)
    high = karatsuba(x1, y1)
    low = karatsuba(x0, y0)
    middle = karatsuba(x1 + x0, y1 + y0) - high - low
    return high * 10 ** (2 * m) + middle * 10 ** m + low

print(karatsuba(1234, 5678))   # 7006652</code></pre>
<p>Python's own integers use Karatsuba for large numbers. Even faster methods exist, based on the fast Fourier transform. In 2019 David Harvey and Joris van der Hoeven gave an <em>O</em>(<em>n</em> log <em>n</em>) algorithm, believed to be optimal, though it only pays off for astronomically large numbers.</p>

<h3>Counting inversions</h3>
<p>An <strong>inversion</strong> in a list is a pair of positions <em>i</em> &lt; <em>j</em> with <em>a</em>[<em>i</em>] &gt; <em>a</em>[<em>j</em>] (CS 201 Lesson 6). The number of inversions measures how far a list is from sorted. Recommendation systems use it to compare two people's rankings: put one person's ranking in the order of the other's and count inversions. Checking every pair takes Θ(<em>n</em>²). Divide and conquer does it in Θ(<em>n</em> log <em>n</em>) by piggybacking on merge sort: the inversions are those inside the left half, those inside the right half, and those with one item in each half. The last kind can be counted during the merge. When an item from the right half is placed before the remaining items of the left half, it forms an inversion with every one of them.</p>
<pre><code>def sort_and_count(xs):
    if len(xs) &lt;= 1:
        return xs, 0
    mid = len(xs) // 2
    left, a = sort_and_count(xs[:mid])
    right, b = sort_and_count(xs[mid:])
    merged, i, j, split = [], 0, 0, 0
    while i &lt; len(left) and j &lt; len(right):
        if left[i] &lt;= right[j]:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j]); j += 1
            split += len(left) - i        # right[j] jumps over every remaining left item
    merged += left[i:] + right[j:]
    return merged, a + b + split

print(sort_and_count([2, 4, 1, 3, 5])[1])   # 3: (2,1), (4,1), (4,3)</code></pre>
<p>The recurrence is merge sort's, so the cost is Θ(<em>n</em> log <em>n</em>). This is a general pattern: a divide-and-conquer algorithm can often compute something extra during its combine step at no extra asymptotic cost.</p>
`,
      terms: [
        ["Divide and conquer", "Solving a problem by splitting it into smaller instances of the same problem, solving those recursively, and combining their answers."],
        ["Master theorem", "The solution of T(n) = aT(n/b) + Θ(n^d): Θ(n^d) if d > log_b a, Θ(n^d log n) if equal, Θ(n^(log_b a)) if d < log_b a."],
        ["Karatsuba multiplication", "Multiplying n-digit numbers with three half-size products instead of four, in Θ(n^1.585)."],
        ["Inversion", "A pair of positions i < j with a[i] > a[j]."]
      ],
      quiz: [
        { q: "Solve T(n) = 8T(n/2) + Θ(n²).", choices: ["Θ(n²)", "Θ(n² log n)", "Θ(n³)", "Θ(n log n)"], answer: 2, why: "a = 8, b = 2, d = 2 < log₂ 8 = 3, so the leaves dominate: Θ(n³)." },
        { q: "Solve T(n) = 4T(n/2) + Θ(n²).", choices: ["Θ(n²)", "Θ(n² log n)", "Θ(n⁴)", "Θ(n)"], answer: 1, why: "d = 2 = log₂ 4: every level does equal work, so multiply by the number of levels." },
        { q: "Why is Karatsuba faster than the four-product split?", choices: ["It uses bigger digits", "It needs only three half-size products, so the recursion tree has fewer leaves", "It avoids addition", "It sorts the digits first"], answer: 1, why: "3T(n/2) gives n^(log₂ 3) leaves instead of n^(log₂ 4) = n²." },
        { q: "How many inversions does [3, 1, 2] have?", choices: ["1", "2", "3", "0"], answer: 1, why: "(3, 1) and (3, 2)." },
        { q: "Where does the inversion-counting algorithm count the pairs that cross the halves?", choices: ["Before splitting", "During the merge, when an item from the right half is placed", "In the base case", "After sorting the whole list"], answer: 1, why: "That item jumps over every remaining item of the left half." }
      ],
      practice: [
        {
          q: `<p>Use the master theorem to solve: (a) T(<em>n</em>) = 9T(<em>n</em>/3) + Θ(<em>n</em>); (b) T(<em>n</em>) = T(2<em>n</em>/3) + Θ(1); (c) T(<em>n</em>) = 3T(<em>n</em>/4) + Θ(<em>n</em>).</p>`,
          hint: `<p>For (b), write 2<em>n</em>/3 as <em>n</em>/(3/2), so <em>b</em> = 3/2.</p>`,
          a: `<p>(a) <em>a</em> = 9, <em>b</em> = 3, <em>d</em> = 1 &lt; log₃ 9 = 2: Θ(<em>n</em>²). (b) <em>a</em> = 1, <em>b</em> = 3/2, <em>d</em> = 0 = log<sub>3/2</sub> 1: Θ(log <em>n</em>). (c) <em>a</em> = 3, <em>b</em> = 4, <em>d</em> = 1 &gt; log₄ 3 ≈ 0.79: Θ(<em>n</em>).</p>`
        },
        {
          q: `<p>Multiply 46 × 13 with one level of Karatsuba (<em>m</em> = 1), showing the three products.</p>`,
          a: `<p><em>x</em>₁ = 4, <em>x</em>₀ = 6, <em>y</em>₁ = 1, <em>y</em>₀ = 3. <em>x</em>₁<em>y</em>₁ = 4, <em>x</em>₀<em>y</em>₀ = 18, (4 + 6)(1 + 3) = 40, so the middle term is 40 − 4 − 18 = 18. Result: 4 · 100 + 18 · 10 + 18 = 598 = 46 × 13.</p>`
        },
        {
          q: `<p>Strassen's algorithm (1969) multiplies two <em>n</em> × <em>n</em> matrices by splitting each into four (<em>n</em>/2) × (<em>n</em>/2) blocks and using 7 block multiplications instead of 8, plus Θ(<em>n</em>²) additions. Write its recurrence and solve it. How does it compare with the usual Θ(<em>n</em>³)?</p>`,
          a: `<p>T(<em>n</em>) = 7T(<em>n</em>/2) + Θ(<em>n</em>²). <em>d</em> = 2 &lt; log₂ 7 ≈ 2.807, so Θ(<em>n</em><sup>2.807</sup>). Asymptotically faster than <em>n</em>³, though its larger constants and numerical behavior mean libraries use it only for very large matrices, if at all.</p>`
        },
        {
          q: `<p>Trace <code>sort_and_count</code> on [4, 3, 2, 1]. How many inversions does a list of <em>n</em> distinct items in reverse order have?</p>`,
          a: `<p>Left [4, 3] has 1 inversion and becomes [3, 4]; right [2, 1] has 1 and becomes [1, 2]. Merging: 1 jumps over 3 and 4 (2), 2 jumps over 3 and 4 (2): 4 split inversions. Total 1 + 1 + 4 = 6 = C(4, 2). A reversed list has every pair inverted: <em>n</em>(<em>n</em> − 1)/2.</p>`
        }
      ],
      sources: ["kleinberg", "clrs", "jeffe"]
    },
    {
      id: "al2",
      title: "Greedy algorithms",
      minutes: 90,
      summary: "Building a solution one locally best choice at a time, when that works and how to prove it: interval scheduling, the exchange argument, scheduling to minimize lateness, and Huffman's optimal prefix codes.",
      notes: `
<p>A <strong>greedy algorithm</strong> builds a solution step by step, at each step making the choice that looks best right now, and never reconsidering. Greedy algorithms are simple and fast. The catch is that for most problems they're wrong: a choice that looks best now can force worse choices later. The skill this lesson teaches is telling the two apart, and proving it when greed works.</p>

<h3>Interval scheduling</h3>
<p>A lecture hall receives requests to use it, each with a start and finish time. It can host one event at a time. Which requests should it accept to host as many events as possible?</p>
<p>Several greedy rules suggest themselves: take the shortest event first, the earliest-starting one, or the one that conflicts with the fewest others. All three fail on some inputs. One long event starting first can block many short ones; a short event straddling two others can block both. The rule that works is: <strong>repeatedly take the compatible event that finishes earliest.</strong></p>
<pre><code>def schedule(events):
    """events: list of (start, finish). Returns a largest set of non-overlapping events."""
    chosen, free_at = [], float("-inf")
    for start, finish in sorted(events, key=lambda e: e[1]):   # by finish time
        if start &gt;= free_at:
            chosen.append((start, finish))
            free_at = finish
    return chosen

print(schedule([(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10), (8, 11), (8, 12), (2, 14), (12, 16)]))
# [(1, 4), (5, 7), (8, 11), (12, 16)]</code></pre>
<p>Sorting dominates the cost: Θ(<em>n</em> log <em>n</em>).</p>

<h3>Proving greed correct: the exchange argument</h3>
<p>Why does "earliest finish" give a largest possible set? The standard proof technique is an <strong>exchange argument</strong>: show that any optimal solution can be transformed, step by step, into the greedy one without getting worse.</p>
<p>Let the greedy choices be <em>g</em><sub>1</sub>, <em>g</em><sub>2</sub>, …, <em>g</em><sub><em>k</em></sub>, in order of finish time, and let <em>o</em><sub>1</sub>, …, <em>o</em><sub><em>m</em></sub> be any optimal schedule, also in order. We show <em>m</em> = <em>k</em>.</p>
<ol>
<li><em>g</em><sub>1</sub> finishes no later than <em>o</em><sub>1</sub>, because it finishes earliest of all events. So replacing <em>o</em><sub>1</sub> with <em>g</em><sub>1</sub> in the optimal schedule leaves it valid: <em>g</em><sub>1</sub> ends no later than <em>o</em><sub>1</sub> did, so it can't overlap <em>o</em><sub>2</sub>.</li>
<li>Repeating the argument (by induction), after replacing <em>o</em><sub>1</sub>, …, <em>o</em><sub><em>i</em></sub> with <em>g</em><sub>1</sub>, …, <em>g</em><sub><em>i</em></sub>, the event <em>o</em><sub><em>i</em>+1</sub> is compatible with <em>g</em><sub><em>i</em></sub>, so greedy considered it, and greedy's choice <em>g</em><sub><em>i</em>+1</sub> finishes no later. Swap again.</li>
<li>If the optimal schedule had more events than greedy (<em>m</em> &gt; <em>k</em>), then <em>o</em><sub><em>k</em>+1</sub> would be compatible with <em>g</em><sub><em>k</em></sub>, and greedy would have taken some event instead of stopping. Contradiction, so <em>m</em> = <em>k</em>.</li>
</ol>
<p>The idea to take away: greedy "stays ahead" of any other solution, in the sense that after <em>i</em> choices it has finished at least as early.</p>

<h3>Scheduling to minimize lateness</h3>
<p>A machine must process jobs one at a time. Job <em>i</em> takes <em>t</em><sub><em>i</em></sub> hours and is due at time <em>d</em><sub><em>i</em></sub>. A job's <strong>lateness</strong> is how far past its deadline it finishes (0 if on time). To minimize the <em>largest</em> lateness, the greedy rule <strong>earliest deadline first</strong> is optimal, even though it ignores the lengths of the jobs.</p>
<p>The exchange argument: in any schedule, call a pair of adjacent jobs an <em>inversion</em> if the later one has the earlier deadline. Swapping such a pair moves the earlier-deadline job up, which can only help it; the other job now finishes when the earlier-deadline job used to, and since its deadline is later, its lateness is no worse than the earlier-deadline job's was. So swapping inversions never increases the maximum lateness.</p>
<p>Now take any optimal schedule. First, if the machine ever sits idle, move later jobs earlier to close the gap: no job finishes later, so no lateness grows. (Earliest deadline first never leaves the machine idle.) Then, while the schedule has an adjacent inversion, swap it. Each swap reduces the number of pairs that are out of deadline order, anywhere in the schedule, by exactly one, so the swapping stops. When it stops, every adjacent pair is in deadline order, and a list in which every neighbor is in order is sorted by deadline: that is an earliest-deadline-first schedule. Each step kept the maximum lateness as small as the optimum, so this schedule is optimal too. Jobs with equal deadlines can come in any order: swapping two of them doesn't change their larger lateness (both have the same deadline and between them finish at the same two times), so every earliest-deadline schedule, however it breaks ties, has the same maximum lateness.</p>

<h3>Huffman coding</h3>
<p>Text is stored as bits. A fixed-length code gives every symbol the same number of bits: 3 bits suffice for 6 symbols. A <strong>variable-length code</strong> gives frequent symbols short codes and rare ones long codes, and can do much better. To be decodable without separators, it must be a <strong>prefix code</strong>: no codeword is the beginning of another. Then a bit string can be read left to right, and a codeword is recognized the moment it's complete.</p>
<p>A prefix code is a binary tree: each symbol is a leaf, and its codeword spells the path from the root (0 for left, 1 for right). The cost of the code is Σ (frequency × depth). In 1952 David Huffman, then a graduate student at MIT, found the greedy algorithm that builds the best tree. (His professor, Robert Fano, had offered the class a choice between a final exam and a term paper on this problem; Fano and Claude Shannon had not solved it.)</p>
<p><strong>Huffman's algorithm:</strong> start with each symbol as a tree of one node, weighted by its frequency. Repeatedly remove the two trees of smallest weight, join them under a new root whose weight is their sum, and put it back. When one tree remains, it is optimal.</p>
<p>For frequencies (per 100 characters) a: 45, b: 13, c: 12, d: 16, e: 9, f: 5, the merges are f + e = 14, c + b = 25, (fe) + d = 30, (cb) + (fed) = 55, then a + 55 = 100. The resulting code is a = 0, c = 100, b = 101, d = 111, f = 1100, e = 1101, using 45·1 + 13·3 + 12·3 + 16·3 + 9·4 + 5·4 = 224 bits per 100 characters, against 300 for the fixed 3-bit code.</p>
<pre><code>import heapq

def huffman(freq):
    """freq: dict symbol -&gt; weight. Returns dict symbol -&gt; codeword."""
    heap = [(w, i, {s: ""}) for i, (s, w) in enumerate(freq.items())]
    heapq.heapify(heap)
    count = len(heap)                      # tie-breaker so dicts are never compared
    while len(heap) &gt; 1:
        w1, _, left = heapq.heappop(heap)
        w2, _, right = heapq.heappop(heap)
        merged = {s: "0" + c for s, c in left.items()}
        merged.update({s: "1" + c for s, c in right.items()})
        heapq.heappush(heap, (w1 + w2, count, merged))
        count += 1
    return heap[0][2]

codes = huffman({"a": 45, "b": 13, "c": 12, "d": 16, "e": 9, "f": 5})
print(sorted(codes.items()))
# [('a', '0'), ('b', '101'), ('c', '100'), ('d', '111'), ('e', '1101'), ('f', '1100')]</code></pre>
<p>Why is it optimal? In some optimal tree the two rarest symbols are siblings at the deepest level (if not, swapping them there can only lower the cost: another exchange argument). Now merge them into one symbol whose frequency is the sum of theirs. Any tree for the merged problem becomes a tree for the original by splitting the merged leaf into the two symbols, and that adds exactly the sum of their frequencies to the cost (each goes one level deeper). Since this extra amount is the same for every tree, the best tree for the merged problem gives the best tree (among those with the two rarest as siblings) for the original. The merged problem has one fewer symbol, so by induction Huffman's remaining merges build its best tree. Huffman coding is still part of the DEFLATE format inside ZIP files and PNG images, and of JPEG and MP3.</p>

<h3>When greed fails</h3>
<p>Making change with US coins (25, 10, 5, 1), "take the largest coin that fits" gives the fewest coins. With coins of 1, 3 and 4, it doesn't: for 6 cents it takes 4 + 1 + 1 (three coins), but 3 + 3 uses two. And for the <strong>knapsack problem</strong> (Lesson 4), taking items in order of value per kilogram can be far from optimal. The cure for both is dynamic programming, the subject of the next two lessons. A greedy algorithm needs a proof; without one, test it against a slow, exhaustive solution on small inputs before trusting it.</p>
`,
      terms: [
        ["Greedy algorithm", "An algorithm that builds a solution by repeatedly making the choice that looks best at the moment, never undoing it."],
        ["Exchange argument", "A proof that a greedy algorithm is optimal by transforming any optimal solution into the greedy one without making it worse."],
        ["Interval scheduling", "Choosing the most mutually non-overlapping intervals; solved by repeatedly taking the one that finishes earliest."],
        ["Prefix code", "A code in which no codeword is the beginning of another, so text can be decoded without separators."],
        ["Huffman coding", "The greedy algorithm that builds an optimal prefix code by repeatedly merging the two least frequent trees."]
      ],
      quiz: [
        { q: "Which greedy rule maximizes the number of non-overlapping events?", choices: ["Shortest event first", "Earliest start first", "Earliest finish first", "Fewest conflicts first"], answer: 2, why: "The exchange argument shows it stays ahead of any other schedule; the others have counterexamples." },
        { q: "What does an exchange argument show?", choices: ["That greedy is fast", "That any optimal solution can be transformed into the greedy one without getting worse", "That all solutions are equal", "That the problem is NP-complete"], answer: 1, why: "So the greedy solution is at least as good as an optimal one." },
        { q: "Is {0, 01, 11} a prefix code?", choices: ["Yes", "No: 0 is a prefix of 01", "No: it has too few codewords", "Only for two symbols"], answer: 1, why: "Reading 01, we can't tell whether 0 ended a codeword." },
        { q: "In Huffman's algorithm, which two trees are merged at each step?", choices: ["The two largest", "The two of smallest weight", "Any two", "The two newest"], answer: 1, why: "Rare symbols should end up deepest." },
        { q: "With coins of 1, 3 and 4, what does the largest-coin-first rule give for 6?", choices: ["2 coins", "3 coins (4 + 1 + 1)", "6 coins", "It fails to make 6"], answer: 1, why: "The optimum is 3 + 3, two coins: greed fails here." }
      ],
      practice: [
        {
          q: `<p>Give a set of intervals for which "shortest first" schedules fewer events than "earliest finish first".</p>`,
          a: `<p>(0, 5), (4, 7), (6, 11). Shortest first takes (4, 7) (length 3), which overlaps both others: 1 event. Earliest finish takes (0, 5) then (6, 11): 2 events.</p>`
        },
        {
          q: `<p>Jobs (length, deadline): A (3, 6), B (2, 8), C (1, 9), D (4, 9), E (3, 14). Schedule them by earliest deadline first, starting at time 0. What is the largest lateness?</p>`,
          a: `<p>Order A, B, C, D, E. Finish times 3, 5, 6, 10, 13. Lateness: 0, 0, 0, 1 (D is due at 9), 0. Largest lateness 1.</p>`
        },
        {
          q: `<p>Build a Huffman code by hand for the frequencies A: 30, B: 30, C: 20, D: 10, E: 10. What is the average number of bits per symbol, and how does it compare with a fixed-length code?</p>`,
          a: `<p>Merge D + E = 20; then C + DE = 40 (or C with one of A, B: ties may give different trees of equal cost); then A + B = 60; then 40 + 60 = 100. Depths: A 2, B 2, C 2, D 3, E 3. Cost 30·2 + 30·2 + 20·2 + 10·3 + 10·3 = 220 per 100 symbols: 2.2 bits per symbol, versus 3 bits for a fixed-length code for 5 symbols.</p>`
        },
        {
          q: `<p>Find a set of coin values (including 1) for which greedy change-making fails, other than {1, 3, 4}, and the smallest amount where it fails.</p>`,
          a: `<p>For example {1, 10, 25}: for 30, greedy takes 25 + 1 + 1 + 1 + 1 + 1 (6 coins), but 10 + 10 + 10 uses 3. (The old British {1, 3, 6, 12, 24, 30} and similar systems also fail.)</p>`
        }
      ],
      sources: ["kleinberg", "clrs", "jeffe"]
    },
    {
      id: "al3",
      title: "Dynamic programming I",
      minutes: 90,
      summary: "Solving problems whose recursive solutions repeat work, by storing the answers to subproblems: memoization and bottom-up tables, the recipe for designing a dynamic program, making change, and the longest common subsequence.",
      notes: `
<p>CS 101's recursion lesson ended with a warning: the naive recursive Fibonacci function recomputes the same values exponentially many times, and memoization (remembering answers) fixes it. <strong>Dynamic programming</strong> turns that fix into a general method. It applies whenever a problem can be solved from the solutions of smaller <em>overlapping</em> subproblems: the same smaller problems come up again and again.</p>

<h3>Two styles</h3>
<p><strong>Top-down (memoization):</strong> write the natural recursion, and cache each answer the first time it's computed. <strong>Bottom-up (tabulation):</strong> fill a table of answers in an order where each entry's subproblems are already filled. Both do the same work; bottom-up avoids deep recursion and often uses less memory.</p>
<pre><code>from functools import cache

@cache                       # remembers every result (CS 101)
def fib_memo(n):
    return n if n &lt; 2 else fib_memo(n - 1) + fib_memo(n - 2)

def fib_table(n):
    a, b = 0, 1              # F(0), F(1): only the last two entries are ever needed
    for _ in range(n):
        a, b = b, a + b
    return a

print(fib_memo(80), fib_table(80))   # 23416728348467685 23416728348467685</code></pre>
<p>Either takes Θ(<em>n</em>) additions, against the naive version's exponential count.</p>

<h3>The recipe</h3>
<ol>
<li><strong>Define the subproblems.</strong> Say in words what each table entry means. This is the creative step, and getting it exactly right is most of the work.</li>
<li><strong>Write the recurrence.</strong> Express each entry in terms of smaller entries, by considering the choices for the last (or first) decision.</li>
<li><strong>Base cases.</strong> The smallest subproblems, answered directly.</li>
<li><strong>Order.</strong> An order of filling in which every entry's dependencies come first.</li>
<li><strong>Answer and cost.</strong> Which entry holds the final answer; the cost is (number of entries) × (work per entry).</li>
<li><strong>Reconstruct</strong> the actual solution, not only its value, by recording which choice achieved each entry.</li>
</ol>

<h3>Making change</h3>
<p>Given coin values and an amount <em>A</em>, find the fewest coins that make <em>A</em> (Lesson 2 showed that greed can fail).</p>
<ol>
<li>Subproblems: best[<em>v</em>] = the fewest coins that make <em>v</em>, for every <em>v</em> from 0 to <em>A</em>.</li>
<li>Recurrence: the last coin used is some coin <em>c</em> ≤ <em>v</em>, and the rest makes <em>v</em> − <em>c</em> as cheaply as possible: best[<em>v</em>] = 1 + min over coins <em>c</em> ≤ <em>v</em> of best[<em>v</em> − <em>c</em>].</li>
<li>Base case: best[0] = 0. If no combination works, best[<em>v</em>] = ∞.</li>
<li>Order: <em>v</em> = 1, 2, …, <em>A</em>.</li>
<li>Answer best[<em>A</em>]; cost Θ(<em>A</em> · <em>k</em>) for <em>k</em> coin values.</li>
</ol>
<pre><code>def min_coins(coins, amount):
    INF = float("inf")
    best = [0] + [INF] * amount
    last = [None] * (amount + 1)        # which coin achieved best[v]
    for v in range(1, amount + 1):
        for c in coins:
            if c &lt;= v and best[v - c] + 1 &lt; best[v]:
                best[v], last[v] = best[v - c] + 1, c
    if best[amount] == INF:
        return None
    used, v = [], amount
    while v &gt; 0:                        # reconstruct by following the choices
        used.append(last[v])
        v -= last[v]
    return used

print(min_coins([1, 3, 4], 6))     # [3, 3]
print(min_coins([1, 5, 10, 25], 63))   # [1, 1, 1, 10, 25, 25]</code></pre>

<h3>Longest common subsequence</h3>
<p>A <strong>subsequence</strong> of a string keeps some of its characters in order, not necessarily adjacent: "ACE" is a subsequence of "ABCDE". The <strong>longest common subsequence</strong> (LCS) of two strings measures how similar they are. It's the core of the <code>diff</code> tool and of version control (which lines were kept between two versions of a file?), and of comparing DNA sequences.</p>
<ol>
<li>Subproblems: <em>L</em>[<em>i</em>][<em>j</em>] = the length of the LCS of the first <em>i</em> characters of <em>x</em> and the first <em>j</em> characters of <em>y</em>.</li>
<li>Recurrence: look at the last characters. Here <em>x</em>[<em>i</em>] means the <em>i</em>-th character of <em>x</em>, counting from 1, so in Python it is <code>x[i - 1]</code>; the code below makes that shift. If <em>x</em>[<em>i</em>] = <em>y</em>[<em>j</em>], an LCS can use that shared character: <em>L</em>[<em>i</em>][<em>j</em>] = <em>L</em>[<em>i</em> − 1][<em>j</em> − 1] + 1. Otherwise at least one of them is not in the LCS: <em>L</em>[<em>i</em>][<em>j</em>] = max(<em>L</em>[<em>i</em> − 1][<em>j</em>], <em>L</em>[<em>i</em>][<em>j</em> − 1]).</li>
<li>Base cases: <em>L</em>[<em>i</em>][0] = <em>L</em>[0][<em>j</em>] = 0 (a string with an empty one).</li>
<li>Order: row by row.</li>
<li>Answer <em>L</em>[<em>m</em>][<em>n</em>]; cost Θ(<em>mn</em>).</li>
</ol>
<pre><code>def lcs(x, y):
    m, n = len(x), len(y)
    L = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if x[i - 1] == y[j - 1]:
                L[i][j] = L[i - 1][j - 1] + 1
            else:
                L[i][j] = max(L[i - 1][j], L[i][j - 1])
    out, i, j = [], m, n                 # walk back through the table
    while i &gt; 0 and j &gt; 0:
        if x[i - 1] == y[j - 1]:
            out.append(x[i - 1]); i -= 1; j -= 1
        elif L[i - 1][j] &gt;= L[i][j - 1]:
            i -= 1
        else:
            j -= 1
    return "".join(reversed(out))

print(lcs("ABCBDAB", "BDCABA"))   # BCBA (length 4; other LCSs exist, such as BDAB)</code></pre>
<p>Trying every subsequence of <em>x</em> would take Θ(2<sup><em>m</em></sup>) time; the table takes Θ(<em>mn</em>). That difference, from exponential to polynomial, is what dynamic programming is for.</p>

<h3>When does dynamic programming apply?</h3>
<p>Two properties are needed. <strong>Optimal substructure:</strong> an optimal solution is built from optimal solutions to subproblems (the coins after the last one make <em>v</em> − <em>c</em> optimally). <strong>Overlapping subproblems:</strong> the same subproblems recur, so storing them pays. Divide and conquer (Lesson 1) has the first property but not the second: merge sort's halves never overlap, so there is nothing to reuse.</p>
`,
      terms: [
        ["Dynamic programming", "Solving a problem from stored solutions of smaller overlapping subproblems."],
        ["Memoization", "Top-down dynamic programming: caching the results of a recursive function."],
        ["Tabulation", "Bottom-up dynamic programming: filling a table of subproblem answers in dependency order."],
        ["Optimal substructure", "An optimal solution contains optimal solutions to its subproblems."],
        ["Overlapping subproblems", "The same subproblems arise repeatedly in a recursive solution."],
        ["Subsequence", "The characters of a string that remain after deleting some, in their original order."],
        ["Longest common subsequence", "The longest string that is a subsequence of both of two given strings."]
      ],
      quiz: [
        { q: "What distinguishes dynamic programming from divide and conquer?", choices: ["DP uses recursion", "DP's subproblems overlap, so storing their answers saves work", "DP is always faster", "DP only works on strings"], answer: 1, why: "Merge sort's halves never repeat; DP's subproblems do." },
        { q: "In the coin recurrence best[v] = 1 + min best[v − c], what does the minimum range over?", choices: ["All amounts", "Coins c with c ≤ v", "The coins already used", "Values of v"], answer: 1, why: "It tries every possible last coin." },
        { q: "What is the LCS length of \"ABCD\" and \"ACBD\"?", choices: ["2", "3", "4", "1"], answer: 1, why: "\"ABD\" or \"ACD\"." },
        { q: "What does the LCS table cost for strings of lengths m and n?", choices: ["Θ(m + n)", "Θ(mn)", "Θ(2^m)", "Θ(m log n)"], answer: 1, why: "(m + 1)(n + 1) entries, each Θ(1)." },
        { q: "Why record which choice achieved each table entry?", choices: ["To save memory", "To reconstruct the solution itself, not only its value", "To make it faster", "Python requires it"], answer: 1, why: "The table gives the optimal value; the choices give the solution." }
      ],
      practice: [
        {
          q: `<p>Fill in the coin table best[0..10] for coins {1, 5, 6}. What is best[10], and does greedy agree?</p>`,
          a: `<p>best: 0, 1, 2, 3, 4, 1, 1, 2, 3, 4, 2. best[10] = 2 (5 + 5). Greedy takes 6 + 1 + 1 + 1 + 1: five coins.</p>`
        },
        {
          q: `<p>Count the ways to climb a staircase of <em>n</em> steps taking 1 or 2 steps at a time. Define the subproblem, write the recurrence and base cases, and compute the answer for <em>n</em> = 10.</p>`,
          a: `<p>ways[<em>n</em>] = the number of ways to reach step <em>n</em>. The last move was 1 or 2 steps: ways[<em>n</em>] = ways[<em>n</em> − 1] + ways[<em>n</em> − 2], with ways[0] = 1, ways[1] = 1. The values are Fibonacci numbers: ways[10] = 89.</p>`
        },
        {
          q: `<p>Fill in the LCS table for "ABCB" and "BDCAB" and find an LCS.</p>`,
          a: `<p>The rows (for "", "A", "AB", "ABC", "ABCB" against "", "B", "BD", "BDC", "BDCA", "BDCAB") end in 0, 1, 2, 2, 3, so the LCS length is 3. Walking back from the corner gives "BCB", the only common subsequence of length 3: B, C, B appear in that order in both strings.</p>`
        },
        {
          q: `<p>The <em>maximum-sum subarray</em> (CS 201 Lesson 1's first programming problem) can be seen as dynamic programming. Define best_here[<em>i</em>] as the best sum of a run ending at position <em>i</em>, and write its recurrence. Why does it need only Θ(1) memory?</p>`,
          a: `<p>best_here[<em>i</em>] = max(<em>x</em><sub><em>i</em></sub>, best_here[<em>i</em> − 1] + <em>x</em><sub><em>i</em></sub>): a run ending at <em>i</em> either starts fresh or extends the best run ending at <em>i</em> − 1. Each entry depends only on the previous one, so only one value needs to be kept, plus the best seen so far. (This is Kadane's algorithm.)</p>`
        }
      ],
      sources: ["kleinberg", "clrs", "jeffe"]
    },
    {
      id: "al4",
      title: "Dynamic programming II",
      minutes: 90,
      summary: "Harder dynamic programs: the 0/1 knapsack problem and why its running time is only pseudo-polynomial, edit distance between strings, and dynamic programming on trees.",
      notes: `
<p>This lesson applies Lesson 3's recipe to three more problems. Each needs a slightly cleverer definition of the subproblems.</p>

<h3>The 0/1 knapsack problem</h3>
<p>A thief's knapsack holds at most <em>W</em> kilograms. Item <em>i</em> weighs <em>w</em><sub><em>i</em></sub> (a whole number) and is worth <em>v</em><sub><em>i</em></sub>. Each item can be taken whole or left ("0/1": no fractions). What is the most valuable load? Less dramatically: which tasks fit into a time budget, which files fit on a disk, which ads fit in a time slot.</p>
<p>Greedy by value per kilogram fails. With <em>W</em> = 7 and items (weight, value) = (1, 1), (3, 4), (4, 5), (5, 7), the best ratio is the (5, 7) item (1.4 per kg); then only (1, 1) still fits, for a total of 8. But (3, 4) and (4, 5) together weigh 7 and are worth 9.</p>
<ol>
<li>Subproblems: <em>K</em>[<em>i</em>][<em>c</em>] = the best value using only the first <em>i</em> items, with capacity <em>c</em>. A single index isn't enough: knowing the capacity left matters for what still fits.</li>
<li>Recurrence: either item <em>i</em> is left out, or (if it fits) taken: <em>K</em>[<em>i</em>][<em>c</em>] = max(<em>K</em>[<em>i</em> − 1][<em>c</em>], <em>v</em><sub><em>i</em></sub> + <em>K</em>[<em>i</em> − 1][<em>c</em> − <em>w</em><sub><em>i</em></sub>]).</li>
<li>Base cases: <em>K</em>[0][<em>c</em>] = 0 (no items).</li>
<li>Answer <em>K</em>[<em>n</em>][<em>W</em>]; cost Θ(<em>nW</em>).</li>
</ol>
<pre><code>def knapsack(items, W):
    """items: list of (weight, value). Returns (best value, chosen item indexes)."""
    n = len(items)
    K = [[0] * (W + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        w, v = items[i - 1]
        for c in range(W + 1):
            K[i][c] = K[i - 1][c]                       # leave item i out
            if w &lt;= c:
                K[i][c] = max(K[i][c], v + K[i - 1][c - w])   # or take it
    chosen, c = [], W
    for i in range(n, 0, -1):                           # walk back
        if K[i][c] != K[i - 1][c]:                      # item i was taken
            chosen.append(i - 1)
            c -= items[i - 1][0]
    return K[n][W], sorted(chosen)

print(knapsack([(1, 1), (3, 4), (4, 5), (5, 7)], 7))   # (9, [1, 2])</code></pre>

<h3>Pseudo-polynomial time</h3>
<p>Θ(<em>nW</em>) looks polynomial, but look closely at <em>W</em>. The input contains the number <em>W</em>, written with about log₂ <em>W</em> bits. Adding one more bit doubles <em>W</em> and doubles the running time. Measured against the <em>length</em> of the input, Θ(<em>nW</em>) is exponential. An algorithm that is polynomial in the numbers' values but not in their lengths is called <strong>pseudo-polynomial</strong>. Knapsack with weights in grams up to a few thousand is easy; with weights given to 30 digits, the table is impossibly large. Lesson 8 shows that knapsack is NP-complete, so no truly polynomial algorithm is known.</p>

<h3>Edit distance</h3>
<p>The <strong>edit distance</strong> (or Levenshtein distance, after Vladimir Levenshtein, 1965) between two strings is the fewest single-character insertions, deletions and substitutions that turn one into the other. "kitten" → "sitting" takes 3: substitute k → s, substitute e → i, insert g. Spell checkers suggest words at small edit distance; biologists align DNA with weighted versions of it.</p>
<ol>
<li>Subproblems: <em>E</em>[<em>i</em>][<em>j</em>] = the edit distance between the first <em>i</em> characters of <em>x</em> and the first <em>j</em> of <em>y</em>.</li>
<li>Recurrence: consider the last characters. Either delete <em>x</em>[<em>i</em>] (1 + <em>E</em>[<em>i</em> − 1][<em>j</em>]), insert <em>y</em>[<em>j</em>] (1 + <em>E</em>[<em>i</em>][<em>j</em> − 1]), or match them, at cost 0 if equal and 1 for a substitution (<em>E</em>[<em>i</em> − 1][<em>j</em> − 1] + [<em>x</em><sub><em>i</em></sub> ≠ <em>y</em><sub><em>j</em></sub>], where square brackets around a condition mean 1 if it is true and 0 if it is false). Take the minimum.</li>
<li>Base cases: <em>E</em>[<em>i</em>][0] = <em>i</em> (delete everything) and <em>E</em>[0][<em>j</em>] = <em>j</em> (insert everything).</li>
<li>Answer <em>E</em>[<em>m</em>][<em>n</em>]; cost Θ(<em>mn</em>).</li>
</ol>
<pre><code>def edit_distance(x, y):
    m, n = len(x), len(y)
    E = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        E[i][0] = i
    for j in range(n + 1):
        E[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            E[i][j] = min(E[i - 1][j] + 1,                            # delete
                          E[i][j - 1] + 1,                            # insert
                          E[i - 1][j - 1] + (x[i - 1] != y[j - 1]))   # match or substitute
    return E[m][n]

print(edit_distance("kitten", "sitting"), edit_distance("intention", "execution"))   # 3 5</code></pre>
<p>(In Python, <code>True</code> counts as 1 and <code>False</code> as 0 in arithmetic, so <code>(x[i - 1] != y[j - 1])</code> adds 1 exactly when the characters differ.)</p>
<p>Notice how close this is to the LCS table. Many string problems share this two-dimensional shape: the subproblem is a pair of prefixes, and the recurrence looks at the last characters.</p>

<h3>Dynamic programming on trees</h3>
<p>Subproblems needn't be prefixes; on a tree, the natural subproblem is a subtree. A company's employees form a tree (each has one manager). The company plans a party and wants to invite a set of employees with the largest total "fun" score, but nobody wants to be at a party with their direct manager. This is the <strong>maximum-weight independent set</strong> problem on a tree.</p>
<p>For each employee <em>v</em>, compute two numbers from its children's answers: with[<em>v</em>], the best total in <em>v</em>'s subtree if <em>v</em> is invited (so no child is), and without[<em>v</em>], the best if <em>v</em> isn't (so each child may or may not be):</p>
<p class="math">with[v] = fun(v) + Σ<sub>children c</sub> without[c],   without[v] = Σ<sub>children c</sub> max(with[c], without[c])</p>
<p>Computing these for every node, children before parents (a post-order traversal, CS 102 Lesson 8), takes Θ(<em>n</em>). The answer is max(with[root], without[root]). On general graphs the same problem is NP-complete (Lesson 8), so the tree structure is what makes it easy.</p>
`,
      terms: [
        ["0/1 knapsack", "Choosing whole items of given weights and values to maximize value within a weight limit."],
        ["Pseudo-polynomial time", "Polynomial in the numeric values in the input but not in the number of bits needed to write them."],
        ["Edit distance", "The fewest insertions, deletions and substitutions that turn one string into another."],
        ["Independent set", "A set of vertices of a graph with no edge between any two of them."]
      ],
      quiz: [
        { q: "Why does the knapsack table need a capacity index as well as an item index?", choices: ["To make it two-dimensional", "Because what still fits depends on the remaining capacity", "To store the values", "It doesn't"], answer: 1, why: "The best choice among the first i items depends on how much room is left." },
        { q: "Knapsack's DP takes Θ(nW). Why is that not polynomial in the input size?", choices: ["n can be large", "W is written in about log₂ W bits, so W is exponential in its length", "Tables are slow", "It is polynomial"], answer: 1, why: "Adding one bit to W doubles the running time." },
        { q: "What is the edit distance between \"cat\" and \"cut\"?", choices: ["0", "1", "2", "3"], answer: 1, why: "One substitution, a → u." },
        { q: "What is E[i][0] in the edit-distance table?", choices: ["0", "i", "1", "∞"], answer: 1, why: "Turning i characters into the empty string takes i deletions." },
        { q: "In the party problem, what is without[v] for a node with no children?", choices: ["fun(v)", "0", "∞", "1"], answer: 1, why: "An empty sum: nobody in the subtree is invited." }
      ],
      practice: [
        {
          q: `<p>Solve the knapsack problem with <em>W</em> = 10 and items (weight, value): (5, 10), (4, 40), (6, 30), (3, 50). Which items are taken?</p>`,
          a: `<p>Best value 90: take (4, 40) and (3, 50), weighing 7 kg. Neither remaining item fits in the last 3 kg, and every other combination that fits is worth less: (3, 50) + (6, 30) = 80, (4, 40) + (6, 30) = 70, (3, 50) + (5, 10) = 60. Note that greedy by value per kilogram also finds 90 here; the notes\' example shows it can fail.</p>`
        },
        {
          q: `<p>Compute the edit-distance table for "sun" and "sat" and give a sequence of edits achieving it.</p>`,
          a: `<p>The distance is 2: substitute u → a and n → t ("sun" → "san" → "sat"). The table's bottom-right entry is 2.</p>`
        },
        {
          q: `<p>A variant of knapsack lets you take any number of copies of each item ("unbounded knapsack"). Change the recurrence. (Hint: this is closer to the coin problem.)</p>`,
          a: `<p>One index suffices: <em>B</em>[<em>c</em>] = the best value with capacity <em>c</em> = max(0, max over items with <em>w</em><sub><em>i</em></sub> ≤ <em>c</em> of <em>v</em><sub><em>i</em></sub> + <em>B</em>[<em>c</em> − <em>w</em><sub><em>i</em></sub>]). After taking an item, the same items are still available, so there's no need to track which ones remain.</p>`
        },
        {
          q: `<p>Run the party recurrence on a manager (fun 5) with three employees (fun 3, 4 and 2) who have no reports. Who should be invited?</p>`,
          a: `<p>Leaves: with = fun, without = 0. Manager: with = 5 + 0 = 5; without = 3 + 4 + 2 = 9. Invite the three employees for a total of 9.</p>`
        }
      ],
      sources: ["kleinberg", "clrs", "jeffe"]
    }
  ]
});

CSA.addUnits("cs220", [
    {
      id: "al5",
      title: "Shortest paths",
      minutes: 90,
      summary: "Finding the cheapest route in a weighted graph: Dijkstra's algorithm with a priority queue and why it's correct, what goes wrong with negative edges, Bellman–Ford, and detecting negative cycles.",
      notes: `
<p>CS 201 Lesson 7 found shortest paths in unweighted graphs with breadth-first search. Real networks have weights: road lengths, travel times, link delays, costs. The <strong>shortest path</strong> from <em>s</em> to <em>v</em> is a path whose total weight is smallest. Its weight is the <strong>distance</strong> dist(<em>v</em>). This lesson covers the two classic algorithms for computing distances from one source to every vertex.</p>

<h3>Relaxation</h3>
<p>Both algorithms keep an estimate <em>d</em>[<em>v</em>] of each distance, starting at 0 for <em>s</em> and ∞ elsewhere, and improve estimates with one operation. To <strong>relax</strong> an edge (<em>u</em>, <em>v</em>) of weight <em>w</em>: if <em>d</em>[<em>u</em>] + <em>w</em> &lt; <em>d</em>[<em>v</em>], set <em>d</em>[<em>v</em>] = <em>d</em>[<em>u</em>] + <em>w</em> and remember <em>u</em> as <em>v</em>'s predecessor. Estimates only ever go down, and each is always the length of some real path. The algorithms differ only in which edges they relax, and in what order.</p>

<h3>Dijkstra's algorithm</h3>
<p>Edsger Dijkstra designed his algorithm in 1956, by his own account in about twenty minutes, sitting at a café in Amsterdam, as a demonstration for a new computer. It works when all edge weights are non-negative. It grows a set of <strong>finished</strong> vertices whose distances are final. At each step, it finishes the unfinished vertex with the smallest estimate and relaxes its outgoing edges. A min-priority queue (CS 201 Lesson 5) finds that vertex quickly.</p>
<pre><code>import heapq

def dijkstra(graph, source):
    """graph: dict u -&gt; list of (v, weight). Returns (dist, prev)."""
    dist, prev = {source: 0}, {}
    heap = [(0, source)]
    done = set()
    while heap:
        d, u = heapq.heappop(heap)
        if u in done:
            continue                       # an outdated entry; u was finished earlier
        done.add(u)
        for v, w in graph[u]:
            if d + w &lt; dist.get(v, float("inf")):
                dist[v], prev[v] = d + w, u
                heapq.heappush(heap, (d + w, v))
    return dist, prev

G = {"A": [("B", 4), ("C", 2)], "B": [("C", 5), ("D", 10)], "C": [("E", 3)],
     "D": [("F", 11)], "E": [("D", 4)], "F": []}
dist, prev = dijkstra(G, "A")
print(dist)   # {'A': 0, 'B': 4, 'C': 2, 'E': 5, 'D': 9, 'F': 20}</code></pre>
<p>The vertices are finished in the order A (0), C (2), B (4), E (5), D (9), F (20). D's estimate was first 14 (through B), then improved to 9 (through C and E) before D was finished. Following <code>prev</code> back from F gives the path A → C → E → D → F.</p>
<p>Some textbook versions keep each vertex in the heap once and, when a shorter distance is found, lower its priority in place. That operation is called <strong>decrease-key</strong>; Python's heapq has no such operation, because finding the entry inside the heap would take a linear search. Instead of decreasing a key in the heap, this version pushes a new entry and skips outdated ones when they come out. Each edge causes at most one push, so the heap holds at most <em>E</em> entries and each push or pop costs O(log <em>E</em>). There are at most <em>E</em> pushes and <em>E</em> pops, plus O(<em>V</em>) work to visit the vertices, so the time is O(<em>V</em> + <em>E</em> log <em>E</em>). A simple graph has at most one edge per pair of vertices, so <em>E</em> &lt; <em>V</em>², and log <em>E</em> &lt; log <em>V</em>² = 2 log <em>V</em>. The two logarithms differ by at most a constant factor, so the time is also O((<em>V</em> + <em>E</em>) log <em>V</em>), the bound usually quoted.</p>

<h3>Why Dijkstra is correct</h3>
<p>Claim: when a vertex <em>u</em> is finished, <em>d</em>[<em>u</em>] = dist(<em>u</em>). Suppose not, and let <em>u</em> be the first vertex finished with a wrong estimate. Take a true shortest path from <em>s</em> to <em>u</em>. It starts among finished vertices and ends outside them, so it has a first edge (<em>x</em>, <em>y</em>) leaving the finished set. Since <em>x</em> was finished correctly and its edges were relaxed, <em>d</em>[<em>y</em>] ≤ dist(<em>x</em>) + <em>w</em>(<em>x</em>, <em>y</em>) = dist(<em>y</em>). Because weights are non-negative, the rest of the path from <em>y</em> to <em>u</em> can't be negative, so dist(<em>y</em>) ≤ dist(<em>u</em>) &lt; <em>d</em>[<em>u</em>]. So <em>d</em>[<em>y</em>] &lt; <em>d</em>[<em>u</em>], and the algorithm would have chosen <em>y</em> before <em>u</em>. Contradiction.</p>
<p>The proof used non-negative weights at exactly one step. Without it, the algorithm can be wrong. Take edges <em>s</em> → <em>a</em> (1), <em>s</em> → <em>b</em> (2), <em>b</em> → <em>a</em> (−2) and <em>a</em> → <em>c</em> (1). Dijkstra finishes <em>a</em> at estimate 1 and relaxes <em>a</em> → <em>c</em>, giving <em>c</em> the estimate 2. Then it finishes <em>b</em> and relaxes <em>b</em> → <em>a</em>: the code above does lower <em>a</em>'s estimate to 0, but <em>a</em> is already finished, so its edges are never relaxed again and <em>c</em> keeps 2, although the path <em>s</em> → <em>b</em> → <em>a</em> → <em>c</em> has length 1.</p>
<pre><code>H = {"s": [("a", 1), ("b", 2)], "a": [("c", 1)], "b": [("a", -2)], "c": []}
print(dijkstra(H, "s")[0])   # {'s': 0, 'a': 0, 'b': 2, 'c': 2}</code></pre>
<p>The distance to <em>c</em> is wrong: it should be 1.</p>

<h3>Bellman–Ford</h3>
<p>The <strong>Bellman–Ford</strong> algorithm (Richard Bellman and Lester Ford, 1950s) handles negative weights. It's simple: relax <em>every</em> edge, and repeat <em>V</em> − 1 times.</p>
<pre><code>def bellman_ford(vertices, edges, source):
    """edges: list of (u, v, weight). Returns dist, or raises if a negative cycle is reachable."""
    dist = {v: float("inf") for v in vertices}
    dist[source] = 0
    for _ in range(len(vertices) - 1):
        for u, v, w in edges:
            if dist[u] + w &lt; dist[v]:
                dist[v] = dist[u] + w
    for u, v, w in edges:                  # one more pass: anything still improving?
        if dist[u] + w &lt; dist[v]:
            raise ValueError("negative cycle")
    return dist

print(bellman_ford("sab", [("s", "a", 1), ("s", "b", 2), ("b", "a", -2)], "s"))
# {'s': 0, 'a': 0, 'b': 2}</code></pre>
<p>Why <em>V</em> − 1 passes? A shortest path has at most <em>V</em> − 1 edges (repeating a vertex would create a cycle, which can't help if no cycle is negative). By induction, after pass <em>k</em> every vertex whose shortest path has at most <em>k</em> edges has its correct distance: pass <em>k</em> relaxes the last edge of that path after the previous vertex became correct. The cost is Θ(<em>VE</em>), slower than Dijkstra, which is why Dijkstra is preferred when weights are non-negative.</p>

<h3>Negative cycles</h3>
<p>If a cycle has negative total weight, going around it again and again makes paths arbitrarily short, and "shortest path" has no answer. Bellman–Ford detects this: after <em>V</em> − 1 passes nothing should improve, so if one more pass still improves some estimate, a negative cycle is reachable from the source. This has a striking use. In currency exchange, convert each rate <em>r</em> into an edge weight −log <em>r</em>. A cycle of trades whose rates multiply to more than 1 (an <strong>arbitrage</strong>, free money) becomes a cycle whose weights add to less than 0, so Bellman–Ford finds arbitrage opportunities.</p>

<h3>Shortest paths in practice</h3>
<p>Internet routers run versions of both algorithms: OSPF computes Dijkstra on a map of the network, and older protocols like RIP use a distributed Bellman–Ford. Map applications run Dijkstra with improvements. <strong>A*</strong> search adds an estimate of the remaining distance (such as the straight-line distance to the destination), so it explores toward the goal instead of in all directions; on road networks, precomputed shortcuts make queries thousands of times faster than plain Dijkstra.</p>
`,
      terms: [
        ["Shortest path", "A path between two vertices with the smallest total edge weight; its weight is the distance."],
        ["Relaxation", "Improving a distance estimate: if d[u] + w(u, v) < d[v], set d[v] = d[u] + w(u, v)."],
        ["Dijkstra's algorithm", "Single-source shortest paths for non-negative weights: repeatedly finish the closest unfinished vertex; O((V + E) log V) with a heap."],
        ["Bellman–Ford algorithm", "Single-source shortest paths allowing negative weights: relax every edge V − 1 times; Θ(VE)."],
        ["Negative cycle", "A cycle whose edge weights sum to less than zero, which makes shortest paths undefined."]
      ],
      quiz: [
        { q: "Which data structure makes Dijkstra's algorithm fast?", choices: ["A stack", "A min-priority queue", "A hash table", "A trie"], answer: 1, why: "It repeatedly needs the unfinished vertex with the smallest estimate." },
        { q: "Where does Dijkstra's correctness proof use non-negative weights?", choices: ["Nowhere", "To argue the rest of the path to u can't be negative, so the first vertex outside the finished set is no farther than u", "In the heap", "Only for undirected graphs"], answer: 1, why: "A negative edge later on the path could make a farther-looking vertex closer." },
        { q: "How many passes over the edges does Bellman–Ford make before its check?", choices: ["1", "log V", "V − 1", "E"], answer: 2, why: "A shortest path has at most V − 1 edges." },
        { q: "How does Bellman–Ford detect a negative cycle?", choices: ["It crashes", "One more pass after V − 1 still improves some estimate", "It counts the negative edges", "Distances become 0"], answer: 1, why: "Without a reachable negative cycle, nothing can improve after V − 1 passes." },
        { q: "Why does A* often explore fewer vertices than Dijkstra?", choices: ["It ignores weights", "It uses an estimate of the remaining distance to steer toward the goal", "It uses BFS", "It only works on trees"], answer: 1, why: "Dijkstra expands in all directions; A* is guided." }
      ],
      practice: [
        {
          q: `<p>Run Dijkstra by hand from S on the directed graph with edges S→A 7, S→B 2, B→A 3, A→C 1, B→C 8, C→D 2. Give the order vertices are finished and their distances.</p>`,
          a: `<p>S 0; B 2; A 5 (via B: 2 + 3, better than 7); C 6 (via A); D 8. Finish order S, B, A, C, D.</p>`
        },
        {
          q: `<p>Run Bellman–Ford on vertices s, a, b, c with edges (s, a, 4), (s, b, 5), (a, c, −3), (b, a, −2), relaxing the edges in that order each pass. Show the estimates after each pass.</p>`,
          a: `<p>Start s 0, others ∞. Pass 1: a = 4, b = 5, c = 1 (4 − 3), then a = 3 (5 − 2). Pass 2: c = 0 (3 − 3); others unchanged. Pass 3: no change. Final: s 0, a 3, b 5, c 0.</p>`
        },
        {
          q: `<p>Exchange rates: 1 USD = 0.9 EUR, 1 EUR = 160 JPY, 1 JPY = 0.0071 USD. Is there an arbitrage cycle? Explain how the −log transform turns this into a negative-cycle question.</p>`,
          a: `<p>0.9 × 160 × 0.0071 = 1.0224 &gt; 1: trading USD → EUR → JPY → USD gains 2.24%. With weights −log <em>r</em>, the cycle's total weight is −log 1.0224 &lt; 0: a negative cycle, which Bellman–Ford's extra pass would find.</p>`
        },
        {
          q: `<p>Explain why adding a constant to every edge weight (to remove negative weights) doesn't preserve shortest paths. Give an example.</p>`,
          a: `<p>Paths with more edges get more of the constant added. Example: s → t directly with weight 3, or s → a → t with weights 1 and 1 (total 2). Add 2 to every edge: the direct path becomes 5 and the two-edge path 6, so the shortest path changes.</p>`
        }
      ],
      sources: ["kleinberg", "clrs", "jeffe"]
    },
    {
      id: "al6",
      title: "Minimum spanning trees",
      minutes: 90,
      summary: "Connecting every vertex as cheaply as possible: spanning trees, the cut property that makes greedy algorithms work, Kruskal's algorithm with union-find, Prim's algorithm with a priority queue, and clustering as an application.",
      notes: `
<p>A company must connect its offices with network cables, and laying each possible cable has a cost. It wants every office reachable from every other, as cheaply as possible. No cable should close a loop, since a loop's last cable is never needed. The result is a <strong>minimum spanning tree</strong>.</p>

<h3>Definitions</h3>
<p>For a connected, undirected, weighted graph, a <strong>spanning tree</strong> is a set of edges that connects all the vertices and contains no cycle. Every spanning tree of a graph with <em>V</em> vertices has exactly <em>V</em> − 1 edges (a tree on <em>V</em> vertices always does; MATH 120's induction proves it). A <strong>minimum spanning tree</strong> (MST) is a spanning tree whose total weight is smallest. Unlike shortest paths, which are about routes from one source, an MST is about the whole network at once.</p>

<h3>The cut property</h3>
<p>A <strong>cut</strong> splits the vertices into two non-empty groups; an edge <strong>crosses</strong> the cut if its ends are in different groups.</p>
<div class="callout"><p><strong>Cut property.</strong> For any cut, a lightest edge crossing it belongs to some minimum spanning tree. (If all weights are distinct, the lightest crossing edge belongs to <em>every</em> MST, and the MST is unique.)</p></div>
<p>Proof, by exchange (Lesson 2): take an MST <em>T</em> that doesn't contain the lightest crossing edge <em>e</em>. Adding <em>e</em> to <em>T</em> creates a cycle. That cycle crosses the cut at <em>e</em>, so it must cross back somewhere, at another edge <em>f</em>. Removing <em>f</em> gives another spanning tree, with weight changed by <em>w</em>(<em>e</em>) − <em>w</em>(<em>f</em>) ≤ 0. So it's also minimum, and it contains <em>e</em>.</p>
<p>The cut property makes greedy algorithms correct: any algorithm that only ever adds a lightest edge across some cut builds an MST. The two classic algorithms choose their cuts differently.</p>

<h3>Kruskal's algorithm</h3>
<p>Joseph Kruskal (1956): consider edges from lightest to heaviest, and add each edge unless it would create a cycle. An edge that joins two different components is the lightest edge crossing the cut between its component and the rest (every lighter edge was already considered). To test "would it create a cycle?" quickly, keep the components in the union-find structure of CS 201 Lesson 8.</p>
<pre><code>def kruskal(vertices, edges):
    """edges: list of (weight, u, v). Returns the MST's edges."""
    parent = {v: v for v in vertices}
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]   # path halving, a simple form of path compression
            x = parent[x]
        return x
    tree = []
    for w, u, v in sorted(edges):
        ru, rv = find(u), find(v)
        if ru != rv:                        # different components: no cycle
            parent[ru] = rv
            tree.append((u, v, w))
    return tree

E = [(1, "A", "B"), (3, "A", "C"), (2, "B", "C"), (4, "B", "D"),
     (5, "C", "D"), (6, "C", "E"), (7, "D", "E")]
T = kruskal("ABCDE", E)
print(T, sum(w for _, _, w in T))
# [('A', 'B', 1), ('B', 'C', 2), ('B', 'D', 4), ('C', 'E', 6)] 13</code></pre>
<p>Edge A–C (3) is skipped because A and C are already connected through B; C–D (5) because B–D connected D. Sorting dominates: O(<em>E</em> log <em>E</em>).</p>

<h3>Prim's algorithm</h3>
<p>Prim's algorithm (Vojtěch Jarník in 1930, rediscovered by Robert Prim in 1957 and Dijkstra in 1959) grows one tree from a starting vertex. At each step it adds the lightest edge connecting the tree to a vertex outside it: the lightest edge across the cut (tree, rest). It looks like Dijkstra's algorithm, with one change: priorities are single edge weights, not path lengths. The code below keeps <em>edges</em> in its heap, as (weight, far end) pairs: whenever a vertex joins the tree, every edge from it to a vertex outside is pushed. An edge can go stale (its far end joins the tree by another edge first), so a popped edge whose far end is already in the tree is skipped, exactly like Dijkstra's outdated entries. The first edge popped for each outside vertex is the cheapest one reaching it from the tree. (Versions that use decrease-key, defined in Lesson 5, keep each outside vertex in the heap once, with that cheapest weight as its priority. They choose the same edges.) With a heap it takes O((<em>V</em> + <em>E</em>) log <em>V</em>), by the same argument as Dijkstra's. A spanning tree exists only if the graph is connected, and a connected graph has <em>E</em> ≥ <em>V</em> − 1, so the <em>V</em> term is absorbed and the bound is usually written O(<em>E</em> log <em>V</em>).</p>
<pre><code>import heapq

def prim(graph, start):
    """graph: dict u -&gt; list of (v, weight), undirected. Returns total MST weight."""
    in_tree, total = {start}, 0
    heap = [(w, v) for v, w in graph[start]]
    heapq.heapify(heap)
    while heap and len(in_tree) &lt; len(graph):
        w, v = heapq.heappop(heap)
        if v in in_tree:
            continue
        in_tree.add(v)
        total += w
        for x, wx in graph[v]:
            if x not in in_tree:
                heapq.heappush(heap, (wx, x))
    return total

G = {}
for w, u, v in E:
    G.setdefault(u, []).append((v, w))
    G.setdefault(v, []).append((u, w))
print(prim(G, "A"))   # 13</code></pre>

<h3>Clustering</h3>
<p>Suppose you want to split <em>n</em> photos into <em>k</em> groups of similar photos, with a distance between every pair. Run Kruskal's algorithm but stop when <em>k</em> components remain; equivalently, build the MST and delete its <em>k</em> − 1 heaviest edges. The result maximizes the <strong>spacing</strong>, the smallest distance between two points in different groups. Why: the spacing of this clustering is the weight <em>d</em>* of the next edge Kruskal would have added. Take any other split into <em>k</em> groups. Unless it is the same split, some Kruskal component must have points in two different groups of it (if every component fit inside one group, the two splits into <em>k</em> groups would be equal), and the tree edges inside that component all weigh at most <em>d</em>*, so the path joining its pieces contains an edge between two different groups of weight at most <em>d</em>*. That split's spacing is at most <em>d</em>*. This <strong>single-linkage clustering</strong> is one of the simplest clustering methods, used in biology to build family trees of species from genetic distances. It also shows a property of MSTs: they capture the "skeleton" of a dataset.</p>
`,
      terms: [
        ["Spanning tree", "A set of V − 1 edges connecting all vertices of a connected graph without cycles."],
        ["Minimum spanning tree", "A spanning tree of smallest total weight."],
        ["Cut", "A division of a graph's vertices into two non-empty groups; an edge crosses it if its ends are in different groups."],
        ["Cut property", "A lightest edge crossing any cut belongs to some minimum spanning tree."],
        ["Kruskal's algorithm", "Build an MST by adding edges from lightest to heaviest, skipping any that would form a cycle (using union-find)."],
        ["Prim's algorithm", "Build an MST by growing one tree, always adding the lightest edge leaving it (using a priority queue)."],
        ["Single-linkage clustering", "Grouping points by removing the k − 1 heaviest edges of a minimum spanning tree."]
      ],
      quiz: [
        { q: "How many edges does a spanning tree of a graph with 50 vertices have?", choices: ["50", "49", "100", "It depends"], answer: 1, why: "Every spanning tree has V − 1 edges." },
        { q: "In Kruskal's algorithm, why is an edge skipped?", choices: ["It's too heavy", "Its ends are already in the same component, so it would form a cycle", "It's negative", "It was already used"], answer: 1, why: "union-find's find(u) == find(v) means they're connected." },
        { q: "What does Prim's algorithm keep in its priority queue?", choices: ["Path lengths from the start", "Edges leaving the current tree, by weight", "All vertices by degree", "Components"], answer: 1, why: "It repeatedly adds the lightest edge leaving the tree." },
        { q: "If all edge weights are distinct, how many minimum spanning trees are there?", choices: ["Exactly one", "Two", "V − 1", "Possibly many"], answer: 0, why: "The cut property then forces every MST edge." },
        { q: "How do you split points into k clusters with an MST?", choices: ["Remove the k − 1 lightest edges", "Remove the k − 1 heaviest edges", "Keep only k edges", "Run Dijkstra k times"], answer: 1, why: "The heaviest edges join the most separated groups." }
      ],
      practice: [
        {
          q: `<p>Run Kruskal's algorithm on vertices 1–5 with edges (weight): 1–2 (3), 1–3 (1), 2–3 (7), 2–4 (5), 3–4 (2), 4–5 (7), 3–5 (8). List the edges in the order considered and whether each is added.</p>`,
          a: `<p>1–3 (1) add; 3–4 (2) add; 1–2 (3) add; 2–4 (5) skip (2 and 4 connected via 1, 3); 2–3 (7) skip; 4–5 (7) add; 3–5 (8) skip. MST weight 1 + 2 + 3 + 7 = 13.</p>`
        },
        {
          q: `<p>Run Prim's algorithm on the same graph starting from vertex 5. List the vertices in the order they join the tree.</p>`,
          a: `<p>5; then 4 (edge 4–5, weight 7, the lighter of 7 and 8); then 3 (3–4, 2); then 1 (1–3, 1); then 2 (1–2, 3). Same total, 13.</p>`
        },
        {
          q: `<p>Is the shortest-path tree from a vertex (the union of shortest paths from it) always a minimum spanning tree? Prove it or give a counterexample.</p>`,
          a: `<p>No. Triangle s, a, b with s–a 2, s–b 2, a–b 1. Shortest paths from s use s–a and s–b (total 4). The MST uses a–b and one of the others (total 3).</p>`
        },
        {
          q: `<p>Prove that the heaviest edge of a cycle (if strictly heaviest) belongs to no MST. (This is the "cycle property".)</p>`,
          a: `<p>Suppose an MST <em>T</em> contains the cycle's heaviest edge <em>e</em>. Removing <em>e</em> splits <em>T</em> into two components, defining a cut. The rest of the cycle connects <em>e</em>'s endpoints, so some other cycle edge <em>f</em> crosses that cut. Replacing <em>e</em> with <em>f</em> gives a spanning tree lighter by <em>w</em>(<em>e</em>) − <em>w</em>(<em>f</em>) &gt; 0, contradicting minimality.</p>`
        }
      ],
      sources: ["kleinberg", "clrs", "jeffe"]
    },
    {
      id: "al7",
      title: "Network flow",
      minutes: 90,
      summary: "How much can flow from a source to a sink through a network of capacities: flows and residual graphs, the Ford–Fulkerson method, the max-flow min-cut theorem, Edmonds–Karp, and bipartite matching as a flow problem.",
      notes: `
<p>Water through pipes, data through network links, goods along a railway, trucks on roads: each link has a <strong>capacity</strong>, the most it can carry. How much can be sent in total from a <strong>source</strong> <em>s</em> to a <strong>sink</strong> <em>t</em>? This is the <strong>maximum flow</strong> problem. Its theory, from the 1950s, is one of the most elegant in algorithms, and many problems that seem unrelated reduce to it.</p>

<h3>Flows</h3>
<p>A <strong>flow network</strong> is a directed graph with a capacity <em>c</em>(<em>u</em>, <em>v</em>) ≥ 0 on each edge, a source <em>s</em> and a sink <em>t</em>. A <strong>flow</strong> assigns each edge an amount <em>f</em>(<em>u</em>, <em>v</em>) with two rules:</p>
<ul>
<li><strong>Capacity:</strong> 0 ≤ <em>f</em>(<em>u</em>, <em>v</em>) ≤ <em>c</em>(<em>u</em>, <em>v</em>).</li>
<li><strong>Conservation:</strong> at every vertex except <em>s</em> and <em>t</em>, the flow in equals the flow out.</li>
</ul>
<p>The <strong>value</strong> of the flow is the net amount leaving <em>s</em> (which equals the net amount reaching <em>t</em>).</p>

<h3>The residual graph and augmenting paths</h3>
<p>A natural idea: find any path from <em>s</em> to <em>t</em> with spare capacity, push as much as fits, and repeat. That alone can get stuck at a non-optimal flow, because an early choice may use an edge badly. The fix is to allow <em>undoing</em> flow. The <strong>residual graph</strong> of a flow has, for each edge (<em>u</em>, <em>v</em>):</p>
<ul>
<li>a forward edge (<em>u</em>, <em>v</em>) with residual capacity <em>c</em>(<em>u</em>, <em>v</em>) − <em>f</em>(<em>u</em>, <em>v</em>), the room left; and</li>
<li>a backward edge (<em>v</em>, <em>u</em>) with capacity <em>f</em>(<em>u</em>, <em>v</em>): pushing flow "backward" cancels some of the existing flow.</li>
</ul>
<p>An <strong>augmenting path</strong> is a path from <em>s</em> to <em>t</em> in the residual graph. Its <strong>bottleneck</strong> is its smallest residual capacity. The <strong>Ford–Fulkerson method</strong> (Lester Ford and Delbert Fulkerson, 1956) repeats: find an augmenting path, push its bottleneck along it, update the residual graph. It stops when no augmenting path exists.</p>
<p><strong>Example.</strong> Edges s→a (10), s→b (5), a→b (15), a→t (5), b→t (10). One run, using breadth-first search to find paths:</p>
<ol>
<li>s → a → t: bottleneck min(10, 5) = 5. Flow 5.</li>
<li>s → b → t: bottleneck 5. Flow 10.</li>
<li>s → a → b → t: s→a has 5 left, a→b 15, b→t 5 left: push 5. Flow 15.</li>
</ol>
<p>Now s's outgoing edges are full, and no augmenting path exists. The maximum flow is 15.</p>

<h3>Max-flow min-cut</h3>
<p>An <strong><em>s</em>-<em>t</em> cut</strong> splits the vertices into a group <em>S</em> containing <em>s</em> and a group containing <em>t</em>. Its <strong>capacity</strong> is the total capacity of the edges from <em>S</em> to the other side. Conservation gives an exact statement: for any cut, a flow's value equals the <em>net</em> flow across it (flow on edges out of <em>S</em> minus flow on edges into <em>S</em>). To see it, add up (flow out − flow in) over every vertex in <em>S</em>: for <em>s</em> this is the flow's value, and for every other vertex of <em>S</em> it is 0. An edge with both ends in <em>S</em> is counted once as out and once as in, so it cancels, leaving only the edges that cross the cut. Net flow across a cut is at most the flow out of <em>S</em>, which is at most the cut's capacity, so <strong>every flow's value is at most every cut's capacity</strong>. In the example, the cut <em>S</em> = {s} has capacity 10 + 5 = 15, so no flow can exceed 15, and the flow of 15 is maximum.</p>
<div class="callout"><p><strong>Max-flow min-cut theorem</strong> (Ford and Fulkerson; Elias, Feinstein and Shannon, 1956). The maximum value of a flow equals the minimum capacity of a cut.</p></div>
<p>The proof comes from Ford–Fulkerson's stopping point. When no augmenting path exists, let <em>S</em> be the vertices reachable from <em>s</em> in the residual graph. <em>t</em> isn't in <em>S</em>. Every edge from <em>S</em> to the outside must be full (or it would be in the residual graph and extend <em>S</em>), and every edge from outside into <em>S</em> must carry no flow (or its backward residual edge would extend <em>S</em>). So the net flow across this cut, which equals the flow's value, is exactly the capacity of the cut <em>S</em>, and since no flow can beat any cut, both are optimal. The theorem also gives a <em>certificate</em>: anyone can check a claimed maximum flow by checking the matching cut.</p>
<p>With integer capacities, every bottleneck is a whole number, so Ford–Fulkerson finds an <em>integer</em> maximum flow. This integrality matters for the applications below.</p>

<h3>Running time: Edmonds–Karp</h3>
<p>With integer capacities, each augmentation increases the flow by at least 1, so there are at most (max-flow value) iterations. That's only pseudo-polynomial (Lesson 4): badly chosen paths on a graph with capacities in the millions can take millions of steps. Jack Edmonds and Richard Karp (1972) showed that always choosing a <em>shortest</em> augmenting path (fewest edges, found by BFS) needs at most O(<em>VE</em>) augmentations, each costing O(<em>E</em>): O(<em>VE</em>²) in total, independent of the capacities. Modern algorithms are much faster; in 2022 a group of researchers announced an algorithm running in almost-linear time.</p>
<pre><code>from collections import deque

def max_flow(capacity, s, t):
    """capacity: dict (u, v) -&gt; c. Edmonds–Karp; returns the max-flow value."""
    residual = dict(capacity)
    nbrs = {}
    for u, v in capacity:
        residual.setdefault((v, u), 0)              # a backward edge starts at 0, unless (v, u) is itself an edge
        nbrs.setdefault(u, set()).add(v)
        nbrs.setdefault(v, set()).add(u)
    flow = 0
    while True:
        parent = {s: None}
        q = deque([s])
        while q and t not in parent:                # BFS for a shortest augmenting path
            u = q.popleft()
            for v in nbrs.get(u, ()):
                if v not in parent and residual[(u, v)] &gt; 0:
                    parent[v] = u
                    q.append(v)
        if t not in parent:
            return flow
        path, v = [], t
        while parent[v] is not None:
            path.append((parent[v], v))
            v = parent[v]
        b = min(residual[e] for e in path)          # the bottleneck
        for u, v in path:
            residual[(u, v)] -= b
            residual[(v, u)] += b
        flow += b

caps = {("s", "a"): 10, ("s", "b"): 5, ("a", "b"): 15, ("a", "t"): 5, ("b", "t"): 10}
print(max_flow(caps, "s", "t"))   # 15</code></pre>

<h3>Bipartite matching</h3>
<p>A university must assign students to project slots; each student is qualified for some projects, and each project takes one student. How many students can be placed? This is <strong>maximum bipartite matching</strong>: a <em>bipartite</em> graph has two groups of vertices with edges only between groups, and a <em>matching</em> is a set of edges sharing no vertex. Turn it into flow: add a source with an edge of capacity 1 to each student, an edge of capacity 1 from each project to a sink, and capacity-1 edges from each student to the projects they qualify for. An integer maximum flow sends 0 or 1 unit along each edge, and the edges carrying flow from students to projects form a maximum matching. The same reduction schedules exams into rooms, matches medical residents to hospitals (with extra rules), and assigns tasks to servers.</p>
`,
      terms: [
        ["Flow network", "A directed graph with edge capacities, a source s and a sink t."],
        ["Flow", "An assignment of amounts to edges respecting capacities and conservation at every vertex except s and t."],
        ["Residual graph", "The graph of remaining capacities, including backward edges that allow existing flow to be cancelled."],
        ["Augmenting path", "An s-to-t path in the residual graph, along which more flow can be pushed."],
        ["s-t cut", "A division of the vertices into a part containing s and a part containing t; its capacity is the total capacity of edges from the s side to the t side."],
        ["Max-flow min-cut theorem", "The maximum flow value equals the minimum s-t cut capacity."],
        ["Bipartite matching", "A set of edges sharing no vertex in a graph whose vertices form two groups with edges only between them."]
      ],
      quiz: [
        { q: "Why does the residual graph include backward edges?", choices: ["To make it undirected", "So an algorithm can cancel flow it sent earlier along a poor route", "To double the capacity", "For the sink"], answer: 1, why: "Without undoing, augmenting can get stuck below the maximum." },
        { q: "An s-t cut has capacity 12. What can you conclude?", choices: ["The max flow is 12", "Every flow has value at most 12", "Every flow has value at least 12", "Nothing"], answer: 1, why: "All flow from s to t must cross the cut." },
        { q: "How does Edmonds–Karp choose augmenting paths?", choices: ["Randomly", "The path with the largest bottleneck", "A shortest path in number of edges, by BFS", "By depth-first search"], answer: 2, why: "Shortest paths bound the number of augmentations by O(VE)." },
        { q: "In the matching reduction, what capacity do the edges from the source to the students get?", choices: ["∞", "1", "The number of projects", "0"], answer: 1, why: "Each student can be matched at most once." },
        { q: "With integer capacities, what kind of maximum flow does Ford–Fulkerson find?", choices: ["Possibly fractional", "An integer one", "Only zero", "A negative one"], answer: 1, why: "Every bottleneck is an integer, so flows stay integers." }
      ],
      practice: [
        {
          q: `<p>Find a maximum flow and a minimum cut for: s→a 3, s→b 2, a→b 1, a→t 2, b→t 3.</p>`,
          a: `<p>Push s→a→t 2, s→b→t 2, s→a→b→t 1: value 5. The cut {s} has capacity 3 + 2 = 5, so 5 is maximum and {s} | {a, b, t} is a minimum cut.</p>`
        },
        {
          q: `<p>Give a network and a sequence of augmenting paths, <em>without</em> backward edges, that gets stuck below the maximum flow.</p>`,
          a: `<p>Edges s→a 1, s→b 1, a→b 1, a→t 1, b→t 1. Pushing 1 along s→a→b→t first leaves s→b→? needing b→t (full) and s→a→t (s→a full): stuck at 1. The maximum is 2 (s→a→t and s→b→t). With the backward edge b→a, the path s→b→a→t cancels the a→b flow and reaches 2.</p>`
        },
        {
          q: `<p>Students Ana, Ben and Cy; projects 1, 2, 3. Ana can do 1 or 2, Ben only 1, Cy 2 or 3. Find a maximum matching, and explain how augmenting paths reach it if Ana is first matched to 1.</p>`,
          a: `<p>Ana–1 first; Ben's only project, 1, is taken, but the augmenting path s → Ben → 1 → Ana (backward) → 2 → t reassigns Ana to 2 and gives 1 to Ben; then Cy–3. Matching: Ana–2, Ben–1, Cy–3, all three placed.</p>`
        },
        {
          q: `<p>Explain how to find the largest number of edge-disjoint paths (no two sharing an edge) from <em>s</em> to <em>t</em> in a directed graph with a flow algorithm. What does the min cut mean here?</p>`,
          a: `<p>Give every edge capacity 1 and compute an integer max flow; each unit of flow traces a path, and paths share no edge since each edge carries at most 1. The min cut is the smallest set of edges whose removal disconnects <em>t</em> from <em>s</em> (Menger's theorem): the network's weakest point.</p>`
        }
      ],
      sources: ["kleinberg", "clrs", "jeffe"]
    },
    {
      id: "al8",
      title: "Intractability: P, NP and coping",
      minutes: 90,
      summary: "The problems no one knows how to solve efficiently: polynomial time, the class NP of problems with quickly checkable answers, reductions, NP-completeness and the Cook–Levin theorem, the P versus NP question, and practical ways to cope with hard problems.",
      notes: `
<p>Almost every problem so far had an algorithm running in polynomial time: O(<em>n</em><sup><em>k</em></sup>) for some fixed <em>k</em>, where <em>n</em> is the size of the input. The exception was Lesson 4's 0/1 knapsack, whose Θ(<em>nW</em>) table is only pseudo-polynomial: when the weights are numbers with many digits, no known algorithm is fast. Many important problems have resisted every attempt to find a polynomial-time algorithm: scheduling with conflicts, routing a delivery truck through all its stops, the knapsack problem with large weights, and thousands more. This lesson explains the theory that groups them together.</p>

<h3>P: efficiently solvable</h3>
<p>We treat polynomial time as the working definition of "efficient". <strong>P</strong> is the class of <strong>decision problems</strong> (problems with yes/no answers) solvable in polynomial time. Restricting to yes/no questions loses little: "is there a route of length at most <em>k</em>?" is as hard as "what is the shortest route?" up to polynomial factors, since we can binary search over <em>k</em>: the shortest length is at most the sum of the weights, so about log<sub>2</sub> of that many yes/no questions suffice. That count grows with the number of digits in the weights, so it is polynomial in the input's length (unlike trying every <em>k</em>, which grows with the weights' size, as for knapsack in Lesson 4). Shortest paths, MSTs, maximum flow, sorting and LCS are all in P.</p>
<p>Why polynomial? Polynomial algorithms usually stay usable as inputs grow, while exponential ones hit a wall. An algorithm that takes 2<sup><em>n</em></sup> steps needs about 1.3 × 10<sup>30</sup> steps for <em>n</em> = 100: at a billion steps a second, roughly 3,000 times the age of the universe. And each additional input item doubles the time.</p>

<h3>NP: efficiently checkable</h3>
<p>Many hard problems share a property: if the answer is yes, there's a short proof that's easy to check. Given a proposed route through all the cities, it's easy to check that it visits each once and has length at most <em>k</em>. Finding one is the hard part. <strong>NP</strong> is the class of decision problems where every yes-instance has a <strong>certificate</strong> (a proposed solution) that can be checked in polynomial time. (NP stands for "nondeterministic polynomial time", from an equivalent definition; it does not mean "not polynomial".) Every problem in P is in NP, since a polynomial algorithm can check by solving.</p>
<p>Examples of problems in NP:</p>
<ul>
<li><strong>SAT:</strong> given a formula of propositional logic (MATH 120 Lesson 1), is there an assignment of true/false to its variables that makes it true? Certificate: the assignment.</li>
<li><strong>Independent set:</strong> given a graph and <em>k</em>, are there <em>k</em> vertices with no edges between them? (Lesson 4 solved the tree case.)</li>
<li><strong>Traveling salesperson (decision version):</strong> is there a route visiting every city once with total length at most <em>k</em>?</li>
<li><strong>Graph coloring:</strong> can the vertices be colored with <em>k</em> colors so that no edge joins two vertices of the same color? (Exam scheduling: exams are vertices, an edge joins exams with a shared student, colors are time slots.)</li>
</ul>

<h3>Reductions</h3>
<p>A <strong>reduction</strong> from problem A to problem B is a polynomial-time way to turn any instance of A into an instance of B with the same answer. If one exists, B is at least as hard as A: a fast algorithm for B would give a fast algorithm for A. Lesson 7 used reductions in the helpful direction (matching to flow). Here we use them to spread hardness.</p>
<p><strong>Example.</strong> A <strong>vertex cover</strong> is a set of vertices touching every edge. A set <em>S</em> is an independent set exactly when everything <em>outside</em> <em>S</em> is a vertex cover: an edge with both ends in <em>S</em> breaks independence, and that same edge is exactly one the outside set fails to cover. So a graph with <em>n</em> vertices has an independent set of size <em>k</em> if and only if it has a vertex cover of size <em>n</em> − <em>k</em>. That reduces each problem to the other.</p>

<h3>NP-completeness</h3>
<p>A problem is <strong>NP-hard</strong> if every problem in NP reduces to it, and <strong>NP-complete</strong> if it is also in NP itself. NP-complete problems are the hardest in NP: a polynomial algorithm for any one of them would give polynomial algorithms for all of NP.</p>
<p>In 1971 Stephen Cook (and, independently, Leonid Levin in the Soviet Union) proved that SAT is NP-complete: any polynomial-time checking process can be encoded as a giant logical formula that is satisfiable exactly when some certificate passes the check. In 1972 Richard Karp reduced SAT to 21 other famous problems, showing that all of them are NP-complete too, among them independent set, vertex cover, clique, graph coloring, the traveling salesperson problem, and knapsack. Since then, thousands of problems have been proved NP-complete, in scheduling, biology, games and chip design.</p>
<p>To show a new problem X is NP-complete: show X is in NP (describe the certificate and the check), then reduce a known NP-complete problem A to X. That is enough because reductions chain: every NP problem reduces to A, and A reduces to X, so running one reduction and then the other turns any NP instance into an X instance. A polynomial of a polynomial is a polynomial (if the first step takes <em>n</em><sup>a</sup> steps, its output has at most <em>n</em><sup>a</sup> symbols, and the second step then takes at most (<em>n</em><sup>a</sup>)<sup>b</sup> = <em>n</em><sup>ab</sup>), so the combined reduction is polynomial and X is NP-hard.</p>

<h3>P versus NP</h3>
<p>Is P = NP? That is, can every problem whose answers are easy to check also be solved easily? Almost everyone believes not, but no one has proved it. It is one of the seven Millennium Prize Problems, with a one-million-dollar reward from the Clay Mathematics Institute. If P = NP, much of modern cryptography (MATH 121's RSA, for example) would break, since finding a secret key would be no harder than checking it.</p>

<h3>Coping with NP-hard problems</h3>
<p>Proving a problem NP-complete is not the end: it tells you which approaches are realistic.</p>
<ul>
<li><strong>Small or special inputs.</strong> Exponential algorithms are fine for small <em>n</em>, and special structure often helps: independent set is easy on trees (Lesson 4), and knapsack with small weights is easy (pseudo-polynomial).</li>
<li><strong>Clever exact search.</strong> Backtracking with pruning (abandoning partial solutions that can't succeed) solves many real instances. Modern SAT solvers routinely handle formulas with millions of variables from hardware and software verification, though some small formulas defeat them.</li>
<li><strong>Approximation algorithms</strong> run in polynomial time with a proven bound on how far from optimal they can be. For vertex cover: repeatedly pick any uncovered edge and add <em>both</em> its ends. The chosen edges share no vertices, and any cover must contain at least one end of each, so the result is at most twice the optimum.</li>
<li><strong>Heuristics</strong> give good solutions fast, without guarantees: greedy rules, local search (repeatedly make small improvements), simulated annealing (local search that sometimes accepts a worse move, less often as it runs, so it can escape a poor local optimum).</li>
</ul>
<pre><code>def vertex_cover_2approx(edges):
    cover = set()
    for u, v in edges:
        if u not in cover and v not in cover:   # edge not yet covered
            cover.update((u, v))
    return cover

star = [(0, i) for i in range(1, 6)]          # vertex 0 joined to 1..5
print(sorted(vertex_cover_2approx(star)))     # [0, 1]: size 2, optimum is {0}, size 1</code></pre>
`,
      terms: [
        ["P", "The class of decision problems solvable in polynomial time."],
        ["NP", "The class of decision problems whose yes-answers have certificates checkable in polynomial time."],
        ["Certificate", "A proposed solution that lets a yes-answer be verified quickly."],
        ["Reduction", "A polynomial-time transformation of instances of problem A into instances of problem B with the same answers; shows B is at least as hard as A."],
        ["NP-complete", "In NP, and every problem in NP reduces to it; the hardest problems in NP."],
        ["Cook–Levin theorem", "SAT is NP-complete (1971)."],
        ["Approximation algorithm", "A polynomial-time algorithm with a proven bound on how far its answer can be from optimal."]
      ],
      quiz: [
        { q: "What does it mean for a problem to be in NP?", choices: ["It can't be solved in polynomial time", "A yes-answer has a certificate that can be checked in polynomial time", "It is NP-complete", "It needs exponential memory"], answer: 1, why: "NP is about quick checking, not about being hard." },
        { q: "You reduce a known NP-complete problem A to a new problem B. What does that show?", choices: ["B is easy", "B is at least as hard as A, so B is NP-hard", "A is easy", "Nothing"], answer: 1, why: "A fast algorithm for B would solve A. Reductions chain, so every NP problem reduces to A and then to B." },
        { q: "A graph has 10 vertices and a vertex cover of size 4. What does that tell you?", choices: ["It has an independent set of size 6", "It has an independent set of size 4", "It has no independent set", "Nothing about independent sets"], answer: 0, why: "The complement of a vertex cover is an independent set." },
        { q: "What would follow from a polynomial-time algorithm for SAT?", choices: ["Only SAT gets easier", "P = NP: every problem in NP becomes polynomial", "Sorting gets faster", "Nothing, since SAT is in P"], answer: 1, why: "SAT is NP-complete." },
        { q: "The vertex cover algorithm in the notes picks both ends of an uncovered edge. Why is its cover at most twice optimal?", choices: ["It's random", "The chosen edges share no vertex, and any cover needs one end of each", "It checks all subsets", "Vertex cover is in P"], answer: 1, why: "If it chose m edges, its cover has 2m vertices and the optimum has at least m." }
      ],
      practice: [
        {
          q: `<p>Show that graph 3-coloring is in NP: describe a certificate and how to check it, with the checking time.</p>`,
          a: `<p>Certificate: a color (1, 2 or 3) for each vertex. Check every edge's two ends have different colors: O(<em>V</em> + <em>E</em>) time. If the graph is 3-colorable, such a certificate exists; if not, every proposed coloring fails the check.</p>`
        },
        {
          q: `<p>A <em>clique</em> is a set of vertices all joined to each other. Reduce independent set to clique: given a graph <em>G</em> and <em>k</em>, build a graph <em>G</em>′ that has a clique of size <em>k</em> exactly when <em>G</em> has an independent set of size <em>k</em>.</p>`,
          a: `<p>Let <em>G</em>′ be the <em>complement</em> of <em>G</em>: same vertices, with an edge exactly where <em>G</em> has none. A set has no edges in <em>G</em> if and only if it has all edges in <em>G</em>′. Building <em>G</em>′ takes O(<em>V</em>²) time.</p>`
        },
        {
          q: `<p>Run the vertex cover approximation on the path 1–2–3–4–5–6 with edges in order (1,2), (2,3), (3,4), (4,5), (5,6). What cover does it return, and what is the optimum?</p>`,
          a: `<p>(1,2) uncovered: add 1, 2. (2,3) covered. (3,4): add 3, 4. (4,5) covered. (5,6): add 5, 6. Cover {1, …, 6}, size 6. The optimum is {2, 4, 6} (or {2, 4, 5}), size 3: exactly the factor 2.</p>`
        },
        {
          q: `<p>Your manager asks for an algorithm that assigns 300 final exams to the fewest time slots so that no student has two exams at once. Explain what you'd tell them about the problem's difficulty and what you'd propose.</p>`,
          a: `<p>It's graph coloring (exams are vertices, an edge joins two exams sharing a student, slots are colors), which is NP-hard, so no known algorithm guarantees the fewest slots quickly for all inputs. Propose a good heuristic (for example, greedily color exams in order of most conflicts first, then improve by local search), and, for a fixed number of slots, a SAT or integer-programming solver, which often finds exact answers for instances this size. Report how close to a lower bound (such as the largest clique of conflicting exams) the result is.</p>`
        }
      ],
      sources: ["kleinberg", "clrs", "jeffe"]
    }
]);

CSA.addAsides("cs220", {
  al3: [
    { kind: "history", title: "Why \"dynamic programming\"?", html: `<p>Richard Bellman developed dynamic programming at the RAND Corporation in the early 1950s. In his autobiography he explained the name: the Secretary of Defense at the time disliked the word "research", so Bellman chose "programming" (in the old sense of planning, as in a "program" of events) and "dynamic" because it sounded impressive and was hard to use in a negative way. The name says little about the method, which is why it confuses students to this day.</p>` }
  ],
  al5: [
    { kind: "history", title: "Twenty minutes in a café", html: `<p>In 1956 Edsger Dijkstra needed a problem to demonstrate the ARMAC, a new Dutch computer, to an audience of non-specialists. He chose finding the shortest route between two cities on a map of the Netherlands, and designed the algorithm in about twenty minutes without pencil and paper, while drinking coffee with his fiancée on a café terrace in Amsterdam. He later said the absence of pencil and paper forced him to avoid all avoidable complexity. He published it in 1959; it is now one of the most used algorithms in the world.</p>` }
  ],
  al8: [
    { kind: "history", title: "Gödel's lost letter", html: `<p>In 1956, years before the theory of NP-completeness, Kurt Gödel wrote a letter to John von Neumann asking how many steps a machine would need to decide whether a mathematical statement has a proof of length <em>n</em>, and whether it could be done in time proportional to <em>n</em> or <em>n</em>². If so, he noted, the mental work of mathematicians could be replaced by machines. This is, in modern terms, a question about P versus NP. The letter was only rediscovered in the late 1980s; von Neumann was dying of cancer when he received it and never replied.</p>` }
  ]
});
