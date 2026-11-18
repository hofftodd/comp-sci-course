CSA.addCourse({
  id: "cs201",
  code: "CS 201",
  title: "Data Structures",
  credits: 4,
  kind: "required",
  term: "y2f",
  summary: "How the collections every program depends on actually work, and how to choose among them: asymptotic analysis, dynamic arrays and amortized cost, hash tables, balanced search trees, heaps, sorting, graphs, union-find and tries. Each structure is built from scratch in Python, measured, and compared with the versions in Java's and C++'s standard libraries.",
  prereqs: ["CS 102 Programming II", "MATH 121 Discrete Mathematics II"],
  outcomes: [
    "Analyze running time and memory with O, Θ and Ω, including amortized cost",
    "Implement dynamic arrays, hash tables, balanced search trees, heaps, union-find and tries, and state the cost of each operation",
    "Explain and compare the main sorting algorithms, and why comparison sorting needs Ω(n log n) comparisons",
    "Represent graphs and use breadth-first search, depth-first search and topological sort",
    "Choose a data structure from the operations a problem needs, and justify the choice"
  ],
  rubric: {
    criteriaFor: "problem sets and projects",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Weekly problem sets", weight: 25, desc: "The lesson's programming problems, plus a short written analysis of their running time." },
      { name: "Projects", weight: 25, desc: "Two projects: a hash map that matches Python's dict on a benchmark within a factor of five (week 5), and a route planner for a city's transit network built on your own graph and priority queue code (week 13). Each includes a short report of measurements." },
      { name: "Midterm exam", weight: 15, desc: "Asymptotic analysis, dynamic arrays, hash tables and balanced search trees (lessons 1–4)." },
      { name: "Final exam", weight: 25, desc: "Cumulative, with emphasis on heaps, sorting, graphs, union-find and tries (lessons 5–8)." }
    ],
    criteria: [
      { name: "Correctness", desc: "Does it work?", levels: [
        "Correct for typical, edge and error cases; the structure's invariant always holds.",
        "Correct for typical cases; one or two edge cases missed.",
        "Works only for some typical cases.",
        "Does not run, or mostly wrong." ] },
      { name: "Efficiency", desc: "Does it meet the cost the structure promises?", levels: [
        "Every operation has the intended asymptotic cost, and the analysis says why.",
        "Mostly efficient; one operation is slower than it should be.",
        "Several operations are asymptotically too slow.",
        "No attention to cost." ] },
      { name: "Analysis", desc: "Is the reasoning about cost sound?", levels: [
        "States tight bounds with clear arguments, including amortized or expected cost where relevant, and checks them against measurements.",
        "Correct bounds with a gap in the argument.",
        "Bounds stated without justification, or partly wrong.",
        "No analysis." ] },
      { name: "Readability", desc: "Can another person follow it?", levels: [
        "Clear names, docstrings stating each operation's cost, and the invariant written down.",
        "Generally clear; some names or docstrings missing.",
        "Hard to follow without running it.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Collaboration:</b> discuss ideas with classmates freely; write your own code and analysis, and name the people you discussed it with.",
      "<b>Standard libraries:</b> in problem sets you build structures yourself, so don't use the library version of the structure you are implementing (for example, no <code>dict</code> inside your hash map) unless the problem says so.",
      "<b>AI assistants:</b> you may use them to explain concepts or error messages, and must say how. Code and analysis you submit must be your own and you must be able to explain every line.",
      "<b>Late work:</b> problem sets are accepted up to three days late for half credit. Each student has three \"late days\" to use on projects without penalty."
    ]
  },
  units: [
    {
      id: "ds1",
      title: "Asymptotic analysis",
      minutes: 90,
      summary: "Big-O made precise: the formal definitions of O, Ω and Θ, the rules for combining them, best, worst and average cases, analyzing recursive code, and memory as well as time.",
      notes: `
<p>CS 101 introduced big-O as a way of counting steps, and CS 102 used it to compare stacks, queues and linked lists. This course is about choosing data structures by their costs, so we need the idea in its precise form. This lesson gives the definitions, the rules for using them, and the most common traps.</p>

<h3>Why count steps, not seconds?</h3>
<p>The time a program takes depends on the computer, the language, the other programs running, and the input. We want a measure of an <em>algorithm</em> that doesn't change when we buy a faster laptop. So we count basic steps (arithmetic, comparisons, reading or writing one memory location) as a function of the input size <em>n</em>, and we care about how that count <strong>grows</strong> as <em>n</em> gets large. A constant factor (3 steps per item or 5?) depends on details we've chosen to ignore; the growth rate doesn't.</p>
<p>Growth rate matters far more than constant factors once inputs are large. Suppose a computer does 10<sup>9</sup> basic steps per second. For <em>n</em> = 10<sup>6</sup> items:</p>
<table>
<thead><tr><th>Steps</th><th>Count for n = 10<sup>6</sup></th><th>Time at 10<sup>9</sup> steps/s</th></tr></thead>
<tbody>
<tr><td>log₂ <em>n</em></td><td>about 20</td><td>20 nanoseconds</td></tr>
<tr><td><em>n</em></td><td>10<sup>6</sup></td><td>1 millisecond</td></tr>
<tr><td><em>n</em> log₂ <em>n</em></td><td>about 2 × 10<sup>7</sup></td><td>20 milliseconds</td></tr>
<tr><td><em>n</em>²</td><td>10<sup>12</sup></td><td>about 17 minutes</td></tr>
<tr><td>2<sup><em>n</em></sup></td><td>a number with over 300,000 digits</td><td>far longer than the age of the universe</td></tr>
</tbody>
</table>
<p>An <em>n</em>² algorithm with a tiny constant still loses to an <em>n</em> log <em>n</em> algorithm with a large one, once <em>n</em> is big enough.</p>

<h3>The definitions</h3>
<p>Let <em>f</em>(<em>n</em>) and <em>g</em>(<em>n</em>) be functions from positive whole numbers to positive numbers: think of <em>f</em> as the exact step count of an algorithm and <em>g</em> as a simple function like <em>n</em>² that we compare it with.</p>
<div class="callout">
<p><strong>Big-O (upper bound).</strong> <em>f</em>(<em>n</em>) = O(<em>g</em>(<em>n</em>)) if there are constants <em>c</em> &gt; 0 and <em>n</em>₀ such that <em>f</em>(<em>n</em>) ≤ <em>c</em> · <em>g</em>(<em>n</em>) for every <em>n</em> ≥ <em>n</em>₀.</p>
<p><strong>Big-Omega (lower bound).</strong> <em>f</em>(<em>n</em>) = Ω(<em>g</em>(<em>n</em>)) if there are constants <em>c</em> &gt; 0 and <em>n</em>₀ such that <em>f</em>(<em>n</em>) ≥ <em>c</em> · <em>g</em>(<em>n</em>) for every <em>n</em> ≥ <em>n</em>₀.</p>
<p><strong>Big-Theta (tight bound).</strong> <em>f</em>(<em>n</em>) = Θ(<em>g</em>(<em>n</em>)) if both hold: <em>f</em> grows exactly as fast as <em>g</em>, up to constant factors.</p>
</div>
<p>In words: O says "at most this fast, eventually, ignoring constants"; Ω says "at least this fast"; Θ says "exactly this fast". The "eventually" (for <em>n</em> ≥ <em>n</em>₀) means small inputs don't count, and the constant <em>c</em> means constant factors don't count. The = sign is a convention; read it as "is".</p>
<p><strong>Example.</strong> Show that <em>f</em>(<em>n</em>) = 3<em>n</em>² + 5<em>n</em> + 2 is Θ(<em>n</em>²).</p>
<ul>
<li><em>Upper bound.</em> We need <em>c</em> and <em>n</em>₀ with 3<em>n</em>² + 5<em>n</em> + 2 ≤ <em>c</em><em>n</em>². For <em>n</em> ≥ 1, 5<em>n</em> ≤ 5<em>n</em>² and 2 ≤ 2<em>n</em>², so <em>f</em>(<em>n</em>) ≤ 3<em>n</em>² + 5<em>n</em>² + 2<em>n</em>² = 10<em>n</em>². So <em>c</em> = 10 and <em>n</em>₀ = 1 work.</li>
<li><em>Lower bound.</em> For every <em>n</em> ≥ 1, <em>f</em>(<em>n</em>) ≥ 3<em>n</em>², so <em>c</em> = 3 and <em>n</em>₀ = 1 work.</li>
</ul>
<p>Any constants that work are fine; you don't need the smallest. (A tighter upper constant is possible: <em>f</em>(<em>n</em>) ≤ 4<em>n</em>² once <em>n</em> ≥ 6, because 4<em>n</em>² − <em>f</em>(<em>n</em>) = <em>n</em>² − 5<em>n</em> − 2, which is positive from <em>n</em> = 6 on.)</p>
<p>The same reasoning shows the general rule: <strong>a polynomial is Θ of its highest power</strong>. Lower-order terms and the leading coefficient don't affect the growth rate.</p>

<h3>Rules of thumb, and why they hold</h3>
<ul>
<li><strong>Drop constant factors:</strong> 7<em>n</em> = Θ(<em>n</em>). (Take <em>c</em> = 7.)</li>
<li><strong>Keep the dominant term of a sum:</strong> <em>n</em>² + <em>n</em> log <em>n</em> = Θ(<em>n</em>²). If one part of a program is Θ(<em>n</em>²) and the next is Θ(<em>n</em>), the whole is Θ(<em>n</em>²).</li>
<li><strong>Multiply for nesting:</strong> a loop that runs <em>n</em> times, whose body costs Θ(<em>m</em>), costs Θ(<em>nm</em>).</li>
<li><strong>The base of a logarithm doesn't matter:</strong> log₂ <em>n</em> = log₁₀ <em>n</em> / log₁₀ 2, a constant multiple, so we just write O(log <em>n</em>).</li>
<li><strong>The standard ladder:</strong> 1 &lt; log <em>n</em> &lt; <em>n</em> &lt; <em>n</em> log <em>n</em> &lt; <em>n</em>² &lt; <em>n</em>³ &lt; 2<sup><em>n</em></sup> &lt; <em>n</em>!, each growing strictly slower than the next. (MATH 130's L'Hôpital lesson shows why powers beat logarithms and exponentials beat powers.)</li>
</ul>

<h3>Best, worst and average case</h3>
<p>For many algorithms the step count depends on the particular input, not only on its size. Linear search finds its target in 1 step if it is first and <em>n</em> steps if it is last or missing. So we distinguish:</p>
<ul>
<li>the <strong>worst case</strong>: the most steps over all inputs of size <em>n</em> (linear search: Θ(<em>n</em>));</li>
<li>the <strong>best case</strong>: the fewest (Θ(1));</li>
<li>the <strong>average case</strong>: the expected number of steps for a random input, under a stated assumption about what "random" means (if the target is equally likely to be in any position, about <em>n</em>/2, which is Θ(<em>n</em>)).</li>
</ul>
<p>Unless we say otherwise, a bound on an algorithm means its worst case. Worst-case bounds are guarantees: they hold for every input, including ones chosen by an adversary. Best-case bounds are rarely useful on their own.</p>
<p>A common confusion: O and worst case are different ideas. "Worst case" picks which inputs we measure; O, Ω and Θ describe how a count grows. It is perfectly sensible to say "insertion sort's best case is Θ(<em>n</em>)" (an already sorted list) and "its worst case is Θ(<em>n</em>²)" (a list in reverse order).</p>

<h3>Analyzing code</h3>
<p>To find the cost of code, find how many times each line runs. Loops multiply; sequences add.</p>
<pre><code>def count_pairs_summing_to(xs, target):
    count = 0
    for i in range(len(xs)):
        for j in range(i + 1, len(xs)):
            if xs[i] + xs[j] == target:
                count += 1
    return count

print(count_pairs_summing_to([1, 5, 3, 7, 2, 4], 8))   # 2  (1+7 and 5+3)</code></pre>
<p>The inner loop runs <em>n</em> − 1 times when <em>i</em> = 0, then <em>n</em> − 2, and so on down to 0. In total that's (<em>n</em> − 1) + (<em>n</em> − 2) + … + 1 + 0 = <em>n</em>(<em>n</em> − 1)/2 times, and each run does constant work. So the function is Θ(<em>n</em>²).</p>
<p>Watch for hidden loops. In Python, <code>x in some_list</code>, <code>some_list.index(x)</code>, <code>some_list.insert(0, x)</code>, slicing <code>xs[a:b]</code> and <code>sum(xs)</code> each take time proportional to the list's length. A single line can be Θ(<em>n</em>).</p>

<h3>Analyzing recursive code</h3>
<p>For a recursive function, write the cost as a <strong>recurrence</strong> (MATH 121 Lesson 3): an equation giving the cost on input size <em>n</em> in terms of the cost on smaller inputs. Merge sort splits a list in half, sorts each half recursively, and merges them in Θ(<em>n</em>) steps:</p>
<p class="math">T(n) = 2 T(n/2) + cn,   T(1) = c</p>
<p>Draw it as a <strong>recursion tree</strong>. The top call does <em>cn</em> work. Its two children each do <em>c</em>(<em>n</em>/2), which is <em>cn</em> in total. Their four children do <em>c</em>(<em>n</em>/4) each, again <em>cn</em> in total. Every level of the tree does <em>cn</em> work, and there are about log₂ <em>n</em> levels (the size halves at each level until it reaches 1). So T(<em>n</em>) = Θ(<em>n</em> log <em>n</em>).</p>
<p>Compare binary search: T(<em>n</em>) = T(<em>n</em>/2) + <em>c</em>. One call per level, constant work each, log₂ <em>n</em> levels: Θ(log <em>n</em>). And the naive recursive Fibonacci, T(<em>n</em>) = T(<em>n</em> − 1) + T(<em>n</em> − 2) + <em>c</em>, grows exponentially, as CS 101's recursion lesson showed.</p>

<h3>Memory</h3>
<p>The same notation describes memory. A function that builds a list of all pairs uses Θ(<em>n</em>²) extra memory; one that keeps a running total uses Θ(1). Recursion uses memory too: each call that hasn't returned yet keeps a frame on the call stack, so recursion <em>d</em> levels deep needs Θ(<em>d</em>) memory. Merge sort as usually written uses Θ(<em>n</em>) extra memory for merging. Some sorts, like heapsort (Lesson 5), sort <strong>in place</strong>, using only Θ(1) extra memory.</p>

<h3>Measuring</h3>
<p>Asymptotic analysis predicts how running time grows; measurement checks the prediction and finds the constants. A good experiment doubles <em>n</em> several times and watches the ratio of times. If the time roughly doubles each time <em>n</em> doubles, the algorithm behaves like Θ(<em>n</em>); if it roughly quadruples, like Θ(<em>n</em>²).</p>
<pre><code>import time

def timed(f, n):
    data = list(range(n))
    start = time.perf_counter()
    f(data)
    return time.perf_counter() - start

def quadratic(xs):
    return sum(1 for a in xs for b in xs if a &lt; b)

for n in [500, 1000, 2000]:
    print(n, round(timed(quadratic, n), 3))</code></pre>
<p>On one test machine the times came out at about 0.004, 0.019 and 0.088 seconds: each doubling of <em>n</em> multiplied the time by about 4 to 5, as Θ(<em>n</em>²) predicts. Your times will differ, but the ratios should be near 4. (Very short times are noisy; the ratio between larger <em>n</em> is more trustworthy.)</p>
`,
      terms: [
        ["Big-O", "f(n) = O(g(n)) if f(n) ≤ c·g(n) for all n ≥ n₀, for some constants c > 0 and n₀: an upper bound on growth."],
        ["Big-Omega", "f(n) = Ω(g(n)) if f(n) ≥ c·g(n) for all n ≥ n₀: a lower bound on growth."],
        ["Big-Theta", "f(n) = Θ(g(n)) if f is both O(g) and Ω(g): a tight bound."],
        ["Worst case", "The largest cost over all inputs of a given size; the usual meaning of an algorithm's bound."],
        ["Average case", "The expected cost over random inputs of a given size, under a stated assumption about the inputs."],
        ["Recursion tree", "A picture of a recursive algorithm's calls, used to add up its cost level by level."],
        ["In place", "Using only a constant amount of extra memory beyond the input."]
      ],
      quiz: [
        { q: "Which pair of constants proves 3n² + 5n + 2 = O(n²)?", choices: ["c = 3, n₀ = 1", "c = 10, n₀ = 1", "c = 1, n₀ = 100", "No constants work"], answer: 1, why: "For n ≥ 1, 3n² + 5n + 2 ≤ 3n² + 5n² + 2n² = 10n². With c = 3 the inequality fails for every n ≥ 1." },
        { q: "Insertion sort takes Θ(n) steps on a sorted list and Θ(n²) on a reversed one. Which statement is correct?", choices: ["Its running time is Θ(n²) for every input", "Its worst case is Θ(n²) and its best case is Θ(n)", "It is O(n) in the worst case", "Θ only applies to the average case"], answer: 1, why: "Best and worst case choose which inputs we measure; Θ describes how each grows." },
        { q: "What is the cost of this loop? <pre><code>for x in xs:\n    if x in ys:\n        count += 1</code></pre> where xs and ys are lists of length n.", choices: ["Θ(n)", "Θ(n log n)", "Θ(n²)", "Θ(1)"], answer: 2, why: "x in ys is a hidden loop over ys, Θ(n), run n times." },
        { q: "Merge sort's recurrence is T(n) = 2T(n/2) + cn. Why is the total Θ(n log n)?", choices: ["Each level of the recursion tree does about cn work, and there are about log₂ n levels", "There are n levels of cn each", "The merge step is Θ(log n)", "Recursion is always n log n"], answer: 0, why: "Halving reaches size 1 after about log₂ n levels, and each level's merges touch all n items once." },
        { q: "Doubling n makes a program's running time go from 2 s to about 8 s, then to about 32 s. Which growth rate does this suggest?", choices: ["Θ(n)", "Θ(n log n)", "Θ(n²)", "Θ(2ⁿ)"], answer: 2, why: "Each doubling multiplies the time by 4 = 2², the signature of quadratic growth." }
      ],
      practice: [
        {
          q: `<p>Prove from the definition that 5<em>n</em> + 20 = Θ(<em>n</em>). Give explicit constants.</p>`,
          hint: `<p>For the upper bound, show 20 ≤ 20<em>n</em> when <em>n</em> ≥ 1.</p>`,
          a: `<p>Upper: for <em>n</em> ≥ 1, 5<em>n</em> + 20 ≤ 5<em>n</em> + 20<em>n</em> = 25<em>n</em>, so <em>c</em> = 25, <em>n</em>₀ = 1. Lower: 5<em>n</em> + 20 ≥ 5<em>n</em> for all <em>n</em>, so <em>c</em> = 5, <em>n</em>₀ = 1. Both hold, so it is Θ(<em>n</em>).</p>`
        },
        {
          q: `<p>Is <em>n</em>² = O(<em>n</em>)? Prove your answer from the definition.</p>`,
          hint: `<p>Suppose constants <em>c</em> and <em>n</em>₀ worked. What happens when <em>n</em> is larger than both?</p>`,
          a: `<p>No. Suppose <em>n</em>² ≤ <em>c</em><em>n</em> for all <em>n</em> ≥ <em>n</em>₀. Dividing by <em>n</em> gives <em>n</em> ≤ <em>c</em> for all <em>n</em> ≥ <em>n</em>₀, which fails for any <em>n</em> greater than both <em>c</em> and <em>n</em>₀. So no constants work.</p>`
        },
        {
          q: `<p>Give a Θ bound for each, with a one-line reason:</p><pre><code># (a)
i = 1
while i &lt; n:
    i *= 2
# (b)
for i in range(n):
    for j in range(10):
        total += i * j
# (c)
for i in range(n):
    j = n
    while j &gt; 1:
        j //= 2</code></pre>`,
          a: `<p>(a) Θ(log <em>n</em>): <em>i</em> doubles each pass, reaching <em>n</em> after about log₂ <em>n</em> passes. (b) Θ(<em>n</em>): the inner loop runs a constant 10 times. (c) Θ(<em>n</em> log <em>n</em>): the outer loop runs <em>n</em> times and the inner one about log₂ <em>n</em> times.</p>`
        },
        {
          q: `<p>A recursive function on a list of length <em>n</em> does Θ(<em>n</em>) work, then calls itself once on the first half of the list. Write its recurrence and solve it with a recursion tree.</p>`,
          hint: `<p>Add up the work at each level: <em>cn</em> + <em>cn</em>/2 + <em>cn</em>/4 + …</p>`,
          a: `<p>T(<em>n</em>) = T(<em>n</em>/2) + <em>cn</em>. The levels do <em>cn</em>, <em>cn</em>/2, <em>cn</em>/4, …, a geometric series whose sum is less than 2<em>cn</em>. The first level alone is <em>cn</em>, so T(<em>n</em>) = Θ(<em>n</em>). Halving the input each time makes the total dominated by the first call.</p>`
        },
        {
          q: `<p>Run the timing experiment from the notes with a Θ(<em>n</em>) function (for example <code>sum</code>) and with your own Θ(<em>n</em> log <em>n</em>) function (for example <code>sorted</code> on a shuffled list), for <em>n</em> = 10<sup>5</sup>, 2 × 10<sup>5</sup>, 4 × 10<sup>5</sup>. What ratios do you see, and why are they not exactly 2 and slightly more than 2?</p>`,
          a: `<p>Expect ratios near 2 for <code>sum</code> and a little over 2 for <code>sorted</code> (since (2<em>n</em> log 2<em>n</em>)/(<em>n</em> log <em>n</em>) = 2(1 + 1/log₂ <em>n</em>), about 2.12 at <em>n</em> = 10<sup>5</sup>). Real ratios wander because of timer resolution, other programs, caches (Lesson-level detail you'll meet in CS 210), and Python's own overheads. Repeat each measurement several times and take the minimum or median.</p>`
        }
      ],
      sources: ["clrs", "odsds", "sedgewick"]
    },
    {
      id: "ds2",
      title: "Arrays, dynamic arrays and amortized analysis",
      minutes: 90,
      summary: "How an array lives in memory and why indexing is constant time; how a dynamic array such as Python's list grows; and amortized analysis, which proves that appending costs O(1) on average over any sequence of operations.",
      notes: `
<p>CS 102 explained that a Python list stores references side by side in memory and over-allocates space so that appending is usually fast. This lesson makes that precise: we build a dynamic array, and prove how fast it is with a new kind of analysis.</p>

<h3>Arrays in memory</h3>
<p>A computer's memory is a long sequence of numbered bytes; a byte's number is its <strong>address</strong>. An <strong>array</strong> is a block of equal-sized slots stored next to each other in memory. If the array starts at address <em>base</em> and each slot takes <em>s</em> bytes, slot <em>i</em> is at address</p>
<p class="math">base + i · s</p>
<p>One multiplication and one addition find any slot, however long the array is. That is why indexing an array is Θ(1), and why arrays number their slots from 0: slot 0 is at the base address itself.</p>
<p>The price is that an array's size is fixed when it is created: the memory just after it may belong to something else. In Java and C++, the basic array type shows this directly:</p>
<pre data-label="Java"><code>int[] scores = new int[5];   // five ints, fixed forever; all start at 0
scores[2] = 90;
// scores[5] = 1;            // would throw ArrayIndexOutOfBoundsException
System.out.println(scores.length);   // 5</code></pre>
<pre data-label="C++"><code>int scores[5] = {0};         // five ints, all 0, fixed size
scores[2] = 90;
// scores[5] = 1;            // compiles, but writes past the end: undefined behavior
std::cout &lt;&lt; sizeof(scores) / sizeof(scores[0]) &lt;&lt; "\\n";   // 5</code></pre>
<p>(You don't need to write Java or C++ in this course; these boxes show how the same ideas look in languages that expose them more directly. CS 210 teaches C, C++'s ancestor.) A C++ array has no length to ask for. Instead, <code>sizeof</code> gives the number of bytes something takes in memory: <code>sizeof(scores)</code> is the whole array's size (20 bytes for five 4-byte ints) and <code>sizeof(scores[0])</code> is one slot's size (4), so dividing them gives the number of slots, 5. Notice the different attitudes to safety: Java checks every index and throws an exception; C++ trusts the programmer, and writing past the end silently corrupts whatever is next in memory. Python, like Java, checks.</p>

<h3>Dynamic arrays</h3>
<p>A <strong>dynamic array</strong> gives the illusion of an array that grows. It keeps an ordinary fixed array, usually with some unused slots at the end, and two numbers: its <strong>size</strong> (how many slots are in use) and its <strong>capacity</strong> (how many slots the underlying array has). Appending writes into the next unused slot. When the array is full, it allocates a new, larger array, copies every item across, and then appends.</p>
<pre><code>class DynamicArray:
    def __init__(self):
        self._capacity = 1
        self._size = 0
        self._slots = [None] * self._capacity   # stands in for a fixed block of memory

    def __len__(self):
        return self._size

    def __getitem__(self, i):              # a[i]
        if not 0 &lt;= i &lt; self._size:
            raise IndexError("index out of range")
        return self._slots[i]

    def __setitem__(self, i, item):        # a[i] = item
        if not 0 &lt;= i &lt; self._size:
            raise IndexError("index out of range")
        self._slots[i] = item

    def append(self, item):
        if self._size == self._capacity:
            self._resize(2 * self._capacity)
        self._slots[self._size] = item
        self._size += 1

    def _resize(self, new_capacity):
        new_slots = [None] * new_capacity
        for i in range(self._size):        # copy every item: Θ(size)
            new_slots[i] = self._slots[i]
        self._slots = new_slots
        self._capacity = new_capacity

a = DynamicArray()
for x in range(10):
    a.append(x)
a[9] = 90
print(len(a), a._capacity, a[9])   # 10 16 90</code></pre>
<p>As CS 102 showed for <code>__len__</code>, Python turns operators into calls of special methods: <code>len(a)</code> calls <code>a.__len__()</code>, reading <code>a[i]</code> calls <code>a.__getitem__(i)</code>, and assigning <code>a[i] = x</code> calls <code>a.__setitem__(i, x)</code>.</p>
<p>(We use a Python list of fixed length to stand for the raw block of memory, and never call its <code>append</code>. Real implementations allocate memory directly; CS 210 shows how.)</p>
<p>Most appends cost Θ(1). But an append that triggers a resize copies every item, costing Θ(<em>n</em>). So the <em>worst case</em> for one append is Θ(<em>n</em>). Is a dynamic array therefore slow? No, and proving it needs a new idea.</p>

<h3>Amortized analysis</h3>
<p><strong>Amortized analysis</strong> bounds the total cost of any <em>sequence</em> of operations, and divides by the number of operations. If any sequence of <em>m</em> operations costs at most O(<em>m</em>) in total, each operation has <strong>amortized cost</strong> O(1), even if a few individual operations are expensive. Unlike average-case analysis, there is no randomness and no assumption about inputs: the bound holds for every sequence. The word comes from finance, where a large cost is "amortized" by spreading it over many payments.</p>
<p><strong>The aggregate method</strong> just adds everything up. Start empty with capacity 1 and append <em>n</em> items. Each append writes one item: <em>n</em> writes in total. Resizes happen when the size reaches 1, 2, 4, 8, …, up to the largest power of 2 below <em>n</em>, and they copy that many items:</p>
<p class="math">1 + 2 + 4 + … + 2<sup>k</sup> &lt; 2 · 2<sup>k</sup> ≤ 2n</p>
<p>(The sum of a geometric series 1 + 2 + … + 2<sup><em>k</em></sup> is 2<sup><em>k</em>+1</sup> − 1, from MATH 121.) So <em>n</em> appends cost fewer than <em>n</em> + 2<em>n</em> = 3<em>n</em> item writes in total: Θ(<em>n</em>) for all of them, Θ(1) amortized per append.</p>
<p><strong>The accounting method</strong> gives the same answer by bookkeeping. Charge each append 3 "coins": one pays for writing the item now, and two are saved. Suppose the array has just doubled to capacity 2<em>k</em>, holding <em>k</em> items and no savings. Before the next resize, <em>k</em> more items are appended, each saving 2 coins: 2<em>k</em> coins, exactly enough to copy all 2<em>k</em> items at the next resize. The savings never go negative, so 3 coins per append always cover the real cost.</p>

<h3>Why doubling? Why not add a fixed amount?</h3>
<p>Suppose instead the array grows by a constant, say 10 slots, each time. Then resizes happen every 10 appends, and the <em>j</em>th resize copies about 10<em>j</em> items. Appending <em>n</em> items does about <em>n</em>/10 resizes copying 10 + 20 + … + <em>n</em> ≈ <em>n</em>²/20 items in total: Θ(<em>n</em>²), or Θ(<em>n</em>) amortized per append. Growing by a constant <em>factor</em> is essential; the factor itself is a trade-off. Any factor greater than 1 gives O(1) amortized appends. A larger factor means fewer copies but more wasted space on average.</p>
<table>
<thead><tr><th>Implementation</th><th>Growth when full</th></tr></thead>
<tbody>
<tr><td>Java <code>ArrayList</code></td><td>about 1.5×</td></tr>
<tr><td>C++ <code>std::vector</code></td><td>left to the library: 2× in GCC's, 1.5× in Microsoft's</td></tr>
<tr><td>CPython <code>list</code></td><td>about 1.125×, plus a few slots</td></tr>
</tbody>
</table>
<p>You can watch CPython's list grow with <code>sys.getsizeof</code>, which reports the bytes a list object uses, including its spare slots. The exact numbers depend on the Python version, but the jumps are visible:</p>
<pre><code>import sys
xs = []
last = sys.getsizeof(xs)
for i in range(20):
    xs.append(i)
    size = sys.getsizeof(xs)
    if size != last:
        print(len(xs), size)   # a new, larger block was allocated
        last = size</code></pre>

<h3>Removing items, and shrinking</h3>
<p>Removing the last item (<code>pop()</code>) is Θ(1). Should the array also shrink when it gets sparse, to give memory back? The obvious rule, "halve the capacity when the array is half full", has a trap. Near the boundary, alternating append and pop can trigger a doubling, then a halving, then a doubling: each costing Θ(<em>n</em>). The standard fix is to halve only when the array is a <em>quarter</em> full. After halving, it is half full, so many operations must happen before the next resize in either direction, and the amortized cost stays O(1).</p>
<p>Inserting or deleting in the <em>middle</em> is another matter: every item after the position must shift by one, Θ(<em>n</em>) whatever we do. That's why <code>xs.insert(0, x)</code> and <code>xs.pop(0)</code> are slow on a long Python list, and why CS 102 used <code>collections.deque</code> for queues.</p>

<h3>Summary of costs</h3>
<table>
<thead><tr><th>Operation on a dynamic array of size n</th><th>Cost</th></tr></thead>
<tbody>
<tr><td>Read or write slot i</td><td>Θ(1)</td></tr>
<tr><td>Append at the end</td><td>Θ(1) amortized, Θ(n) worst case for a single append</td></tr>
<tr><td>Remove from the end</td><td>Θ(1) amortized (with shrinking at a quarter)</td></tr>
<tr><td>Insert or delete at position i</td><td>Θ(n − i)</td></tr>
<tr><td>Search for a value</td><td>Θ(n)</td></tr>
</tbody>
</table>
`,
      terms: [
        ["Array", "A fixed number of equal-sized slots stored next to each other in memory; slot i is at base + i·s."],
        ["Dynamic array", "A resizable sequence built on a fixed array that is replaced by a larger copy when it fills up."],
        ["Size and capacity", "How many slots a dynamic array is using, and how many its underlying array has."],
        ["Amortized cost", "The total cost of any sequence of operations divided by the number of operations; a worst-case guarantee over sequences."],
        ["Aggregate method", "Amortized analysis by adding up the total cost of a sequence."],
        ["Accounting method", "Amortized analysis by charging each operation a fixed amount and saving the surplus to pay for later expensive operations."]
      ],
      quiz: [
        { q: "An int array starts at address 1000 and each int takes 4 bytes. Where is slot 6?", choices: ["1006", "1024", "1020", "1028"], answer: 1, why: "base + i·s = 1000 + 6·4 = 1024." },
        { q: "A dynamic array doubles when full, starting at capacity 1. Roughly how many item copies do 1,000,000 appends cause in total?", choices: ["About 20", "About 1,000,000", "About 500 billion", "None"], answer: 1, why: "The copies are 1 + 2 + 4 + … + 524,288 = 1,048,575: fewer than 2n." },
        { q: "How does amortized cost differ from average-case cost?", choices: ["It assumes random inputs", "It bounds the total over every sequence of operations, with no randomness", "It is always larger", "It ignores expensive operations"], answer: 1, why: "Amortized bounds are guarantees for every sequence; average-case bounds depend on an assumed input distribution." },
        { q: "A dynamic array grows by 100 slots each time it fills. What is the amortized cost of an append?", choices: ["Θ(1)", "Θ(log n)", "Θ(n)", "Θ(n²)"], answer: 2, why: "n appends copy about n²/200 items in total, so Θ(n) per append." },
        { q: "Why shrink only when the array is a quarter full rather than half full?", choices: ["To save memory", "To avoid repeated doubling and halving when appends and pops alternate near the boundary", "Because halving is slow", "Quarter is easier to compute"], answer: 1, why: "After halving at a quarter, the array is half full, so many operations are needed before the next resize." }
      ],
      practice: [
        {
          q: `<p>Trace the <code>DynamicArray</code> from the notes through 9 appends. List the size and capacity after each append, and count the total item copies made by resizes.</p>`,
          a: `<p>Sizes 1–9; capacities 1, 2, 4, 4, 8, 8, 8, 8, 16. Resizes happen on appends 2, 3, 5 and 9, copying 1, 2, 4 and 8 items: 15 copies in total (fewer than 2 × 9 = 18).</p>`
        },
        {
          q: `<p>Use the accounting method to show that a dynamic array that <em>triples</em> its capacity when full has O(1) amortized appends. How many coins per append do you need?</p>`,
          hint: `<p>After tripling to capacity 3<em>k</em>, the array holds <em>k</em> items. How many appends happen before the next resize, and how many items will that resize copy?</p>`,
          a: `<p>After a resize to capacity 3<em>k</em> there are <em>k</em> items and no savings. The next resize comes after 2<em>k</em> more appends and copies 3<em>k</em> items. Saving 1.5 coins per append gives 2<em>k</em> × 1.5 = 3<em>k</em> coins, just enough. So 2.5 coins per append (1 for the write, 1.5 saved) suffice: O(1) amortized. Larger factors need fewer coins per append but waste more space.</p>`
        },
        {
          q: `<p>Explain the cost of each line, and of the whole loop, when <code>xs</code> starts empty: <code>for i in range(n): xs.insert(0, i)</code>. How would you build the same list in Θ(<em>n</em>) total?</p>`,
          a: `<p>Inserting at position 0 shifts every existing item: the <em>i</em>th insert costs Θ(<em>i</em>), and the loop costs 0 + 1 + … + (<em>n</em> − 1) = Θ(<em>n</em>²). Instead append each item (Θ(1) amortized) and reverse once at the end (Θ(<em>n</em>)): <code>xs = list(range(n)); xs.reverse()</code>, or <code>list(range(n - 1, -1, -1))</code>.</p>`
        },
        {
          q: `<p>Show that the "halve when half full" rule can cost Θ(<em>n</em>) per operation. Describe a sequence of operations on a doubling array that does it.</p>`,
          a: `<p>Fill the array until it doubles to capacity 2<em>k</em> with <em>k</em> + 1 items. Now pop: the array has <em>k</em> items, exactly half full, so it halves to capacity <em>k</em>, copying <em>k</em> items. Append: it's full, so it doubles, copying <em>k</em> items. Pop again: half full, halve. Each operation in this alternating sequence copies about <em>k</em> = Θ(<em>n</em>) items.</p>`
        }
      ],
      sources: ["clrs", "odsds", "pythonds"]
    },
    {
      id: "ds3",
      title: "Hash tables",
      minutes: 90,
      summary: "How dictionaries and sets find any key in constant expected time: hash functions, collisions, separate chaining, open addressing, load factor and resizing, and the hash-flooding attacks that changed how Python hashes strings.",
      notes: `
<p>Python's <code>dict</code> and <code>set</code> find a key among millions in about the same time as among ten. CS 101 explained that they use the key's <em>hash</em> to decide where to store it. This lesson builds a hash table and analyzes it.</p>

<h3>From direct addressing to hashing</h3>
<p>If keys were small whole numbers, say student numbers from 0 to 999, we could use an array of 1,000 slots and store each student at the slot with their number. Every lookup is one array access: Θ(1). This is <strong>direct addressing</strong>. It fails when the possible keys are many and the actual keys are few: a table indexed by every possible 20-character string would be impossibly large. Even with only the 26 lowercase letters there are 26<sup>20</sup> ≈ 2 × 10<sup>28</sup> such strings, more than the number of atoms in a human body (about 7 × 10<sup>27</sup>). At 8 bytes per slot, the table would need about 1.6 × 10<sup>29</sup> bytes, or 1.6 × 10<sup>17</sup> terabytes.</p>
<p><strong>Hashing</strong> keeps the idea but shrinks the table. A <strong>hash function</strong> turns any key into a whole number, its <strong>hash</strong>, and we use the hash modulo the table size <em>m</em> as the slot number:</p>
<p class="math">slot(key) = hash(key) mod m</p>
<p>A good hash function is fast, gives equal keys equal hashes (always), and spreads different keys evenly across the slots, so that keys that look similar (like <code>"item1"</code> and <code>"item2"</code>) land far apart. Python's built-in <code>hash()</code> does this for numbers, strings, tuples and other immutable values.</p>

<h3>Collisions are certain</h3>
<p>A <strong>collision</strong> is two keys landing in the same slot. With more possible keys than slots, collisions can't be avoided (by the pigeonhole principle, MATH 121 Lesson 2). They also happen much sooner than you might think. The birthday problem (MATH 121 Lesson 6) showed that with 365 slots, 23 keys give a better than even chance that two collide. So a hash table needs a plan for collisions. There are two standard ones.</p>

<h3>Separate chaining</h3>
<p>In <strong>separate chaining</strong>, each slot holds a small list (a "chain" or "bucket") of the key-value pairs that hash there. To look up a key, hash it, go to its slot, and search that slot's list.</p>
<pre><code>class ChainedMap:
    def __init__(self, capacity=8):
        self._buckets = [[] for _ in range(capacity)]
        self._size = 0

    def _bucket(self, key):
        return self._buckets[hash(key) % len(self._buckets)]

    def get(self, key):
        for k, v in self._bucket(key):
            if k == key:
                return v
        raise KeyError(key)

    def put(self, key, value):
        bucket = self._bucket(key)
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)     # replace an existing key
                return
        bucket.append((key, value))
        self._size += 1
        if self._size &gt; 2 * len(self._buckets):
            self._resize(2 * len(self._buckets))

    def _resize(self, capacity):
        old = self._buckets
        self._buckets = [[] for _ in range(capacity)]
        for bucket in old:
            for k, v in bucket:
                self._bucket(k).append((k, v))

m = ChainedMap()
for word in ["ant", "bee", "cat", "ant"]:
    m.put(word, len(word))
print(m.get("bee"), m._size)   # 3 3</code></pre>
<p>The <strong>load factor</strong> α = <em>n</em>/<em>m</em> is the average number of keys per slot. If the hash function spreads keys like random throws (the <em>simple uniform hashing</em> assumption), each chain has α keys on average, so a lookup costs Θ(1 + α) expected: 1 to compute the hash and find the slot, α to scan the chain. Keeping α bounded by a constant (here, at most 2) makes every operation Θ(1) expected.</p>
<p>Keeping α bounded means growing the table as keys arrive. Resizing rehashes every key into a table twice as big, Θ(<em>n</em>); by the same argument as for dynamic arrays (Lesson 2), doubling makes this Θ(1) amortized per insertion.</p>
<p>Notice the two kinds of guarantee combined here. "Expected" refers to randomness in where keys land; "amortized" refers to spreading the resize cost over many insertions. And the worst case is still bad: if every key collides, every chain but one is empty and lookups are Θ(<em>n</em>). Hash tables are fast in expectation, not in the worst case.</p>

<h3>Open addressing</h3>
<p>In <strong>open addressing</strong>, every key lives directly in the slot array; there are no chains. On a collision, the table <em>probes</em> other slots in a fixed order until it finds a free one. The simplest order is <strong>linear probing</strong>: try slot <em>h</em>, then <em>h</em> + 1, <em>h</em> + 2, … (wrapping around at the end). A lookup follows the same sequence until it finds the key or an empty slot.</p>
<p>Linear probing is fast in practice because the probes touch neighboring memory, which modern computers read quickly (CS 210 Lesson 7 explains why). Its weakness is <strong>clustering</strong>: occupied slots form runs, and any key that hashes into a run must walk to its end, making the run longer still. Open addressing also needs α &lt; 1 (the table can't hold more keys than slots), and gets slow as α approaches 1: under a uniform-hashing idealization, an unsuccessful search takes about 1/(1 − α) probes, which is 2 probes at α = 0.5 and 10 at α = 0.9. So open-addressing tables resize at a load factor well below 1.</p>
<p>Deleting is subtle. If we simply empty a slot, a later lookup that probes through it will stop early and miss keys stored beyond it. The usual fix is to leave a <strong>tombstone</strong>, a marker meaning "deleted, keep probing", which inserts may reuse.</p>
<p>CPython's <code>dict</code> uses open addressing with a probing sequence that mixes in more of the hash's bits than linear probing does, and resizes when it is two-thirds full. Since Python 3.6 it also stores entries in a separate compact array in insertion order, which is why dicts remember insertion order (CS 101's sidebar).</p>

<h3>What makes a key hashable</h3>
<p>A hash table relies on one rule: <strong>keys that are equal must have equal hashes</strong>, and a key's hash must never change while it is in the table. If a key's hash changed, the table would look in the wrong slot and fail to find it. That is why Python refuses to hash lists: a list can change after it is stored. When you write your own class and define <code>__eq__</code>, you must also define <code>__hash__</code> consistently, from the same fields, as CS 102 Lesson 2 showed with fractions; Python sets <code>__hash__</code> to <code>None</code> (unhashable) when you define <code>__eq__</code> alone.</p>

<h3>Hash flooding</h3>
<p>The Θ(1) expected cost assumes keys spread evenly. An attacker who knows the hash function can choose keys that all collide, turning every operation into Θ(<em>n</em>). In 2011, researchers showed that web frameworks in many languages could be brought down this way: a single request with a few thousand crafted parameter names, which the server stored in a hash table, could tie up a processor for minutes. The defense is to make the hash function unpredictable. Since Python 3.3, string hashes are randomized with a secret value chosen each time Python starts, so the same string usually has a different <code>hash()</code> in different runs; since 3.4, Python uses SipHash, a hash function designed to resist this attack. (The environment variable <code>PYTHONHASHSEED</code> fixes the seed when reproducibility matters.)</p>

<h3>When not to use a hash table</h3>
<p>Hash tables answer "is this key here, and what is its value?" very fast. They can't efficiently answer questions about <em>order</em>: the smallest key, the next key after <em>x</em>, or all keys between <em>a</em> and <em>b</em>. For those you need a sorted structure, such as the balanced search trees of the next lesson.</p>
`,
      terms: [
        ["Hash function", "A function that turns a key into a whole number; equal keys must give equal hashes."],
        ["Collision", "Two different keys mapping to the same slot."],
        ["Separate chaining", "Collision handling in which each slot holds a list of the keys that hash there."],
        ["Open addressing", "Collision handling in which keys are stored in the slot array itself and collisions probe other slots."],
        ["Load factor", "α = n/m, the number of keys divided by the number of slots."],
        ["Tombstone", "A marker left in a deleted open-addressing slot so that searches keep probing past it."],
        ["Hash flooding", "An attack that sends keys chosen to collide, making a hash table slow."]
      ],
      quiz: [
        { q: "A chained hash table has 1,000 slots and 3,000 keys, spread evenly. About how many keys does a lookup scan?", choices: ["1", "3", "1,000", "3,000"], answer: 1, why: "The load factor α = 3,000/1,000 = 3 is the average chain length." },
        { q: "Why must equal keys have equal hashes?", choices: ["To save memory", "Otherwise a lookup with an equal key would search the wrong slot", "Python requires it for speed", "To prevent hash flooding"], answer: 1, why: "The table finds a key's slot from its hash; a different hash means a different slot." },
        { q: "In linear probing, why can't you simply empty a deleted slot?", choices: ["It wastes memory", "A later search would stop at the empty slot and miss keys stored past it", "The load factor would be wrong", "Python forbids it"], answer: 1, why: "Searches stop at empty slots, so deleting needs a tombstone." },
        { q: "What is the worst-case cost of a lookup in a hash table with n keys?", choices: ["Θ(1)", "Θ(log n)", "Θ(n)", "Θ(n²)"], answer: 2, why: "If every key collides, a lookup scans all of them. The Θ(1) bound is expected, not worst case." },
        { q: "Which question does a hash table answer poorly?", choices: ["Is \"ant\" a key?", "What is the value for key 42?", "What is the smallest key greater than 100?", "How many keys are stored?"], answer: 2, why: "Hashing scatters keys, so finding the next key in order means checking all of them." }
      ],
      practice: [
        {
          q: `<p>Insert the keys 12, 22, 7, 32, 17 into an open-addressing table of 10 slots with hash(k) = k mod 10 and linear probing. Show the final table. How many probes does a search for 42 take?</p>`,
          a: `<p>12 → slot 2. 22 → 2 taken, slot 3. 7 → slot 7. 32 → 2, 3 taken, slot 4. 17 → 7 taken, slot 8. Table: slot 2: 12, 3: 22, 4: 32, 7: 7, 8: 17, others empty. Searching for 42 starts at slot 2 and probes 2, 3, 4, then finds slot 5 empty: 4 probes, and 42 isn't there. The cluster at slots 2–4 is why.</p>`
        },
        {
          q: `<p>Add a <code>delete(key)</code> method to <code>ChainedMap</code>. What is its expected cost? Why is deletion simpler with chaining than with open addressing?</p>`,
          a: `<pre><code>def delete(self, key):
    bucket = self._bucket(key)
    for i, (k, v) in enumerate(bucket):
        if k == key:
            bucket.pop(i)
            self._size -= 1
            return
    raise KeyError(key)</code></pre><p>Expected Θ(1 + α), like a lookup. With chaining, other keys live in their own chains, so removing one entry can't hide them; with open addressing, other keys may have probed past this slot, so it needs a tombstone.</p>`
        },
        {
          q: `<p>Write a class <code>Point</code> with fields <code>x</code> and <code>y</code> so that <code>{Point(1, 2): "a"}[Point(1, 2)]</code> returns <code>"a"</code>. Then explain what goes wrong if <code>__hash__</code> returns <code>id(self)</code>.</p>`,
          a: `<pre><code>class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __eq__(self, other):
        return isinstance(other, Point) and (self.x, self.y) == (other.x, other.y)
    def __hash__(self):
        return hash((self.x, self.y))</code></pre><p>With <code>id(self)</code>, two equal points (different objects) get different hashes, so the second <code>Point(1, 2)</code> looks in a different slot and raises <code>KeyError</code>, breaking the rule that equal keys have equal hashes. Treat the fields as unchangeable once a point is used as a key.</p>`
        },
        {
          q: `<p>A chained table resizes from <em>m</em> to 2<em>m</em> buckets whenever α exceeds 2. Show that inserting <em>n</em> keys into an empty table with 8 buckets costs Θ(<em>n</em>) expected time in total, counting rehashing.</p>`,
          a: `<p>Resizes happen when the size passes 16, 32, 64, …, so the rehashing work is 16 + 32 + … + (the last threshold below <em>n</em>), a geometric series less than 2<em>n</em>. Each insertion also costs Θ(1 + α) = Θ(1) expected, since α ≤ 2 always. Total: Θ(<em>n</em>) expected, or Θ(1) expected amortized per insertion.</p>`
        },
        {
          q: `<p>Run <code>python3 -c "print(hash('hello'))"</code> three times in a terminal, then run <code>PYTHONHASHSEED=0 python3 -c "print(hash('hello'))"</code> three times. What do you see, and why does Python behave this way?</p>`,
          a: `<p>Without the variable, the hash changes from run to run, because Python picks a new secret seed at startup to defend against hash flooding. With <code>PYTHONHASHSEED=0</code>, the seed is fixed and the hash is the same each time. Within one run a string's hash never changes, which is all a hash table needs. (Small integers hash to themselves, so <code>hash(7)</code> is always 7.)</p>`
        }
      ],
      sources: ["clrs", "odsds", "pep456"]
    },
    {
      id: "ds4",
      title: "Balanced search trees",
      minutes: 90,
      summary: "Why an ordinary binary search tree can degrade to a list, how rotations rebalance a tree without breaking its order, AVL trees and their O(log n) height guarantee, and the balanced trees used in real libraries.",
      notes: `
<p>CS 102 Lesson 8 built binary search trees (BSTs) and found their weakness: their height depends on the order of insertion. Insert keys in sorted order and the "tree" is a linked list of height <em>n</em>, so searches cost Θ(<em>n</em>). A <strong>balanced search tree</strong> repairs its shape after each insertion and deletion, guaranteeing height O(log <em>n</em>) whatever the order. This lesson builds the oldest kind, the AVL tree.</p>
<p>In this course, the <strong>height</strong> of a tree is the number of <em>nodes</em> on its longest path from the root down to a leaf. A single node has height 1, and an empty tree has height 0. CS 102 Lesson 8 counted <em>edges</em> instead, so its heights are one less than ours. The choice changes no Θ or O bound. Every height in CS 201, including the heaps of Lesson 5, counts nodes.</p>

<h3>Why bother? Order</h3>
<p>Lesson 3's hash tables are already fast for lookups. Search trees earn their place by keeping keys <strong>in order</strong>. A balanced BST supports, each in O(log <em>n</em>):</p>
<ul>
<li>search, insert and delete;</li>
<li>the minimum and maximum key;</li>
<li>the <strong>successor</strong> of a key (the next larger one) and its predecessor;</li>
<li>counting or listing the keys in a range [<em>a</em>, <em>b</em>] (listing costs an extra Θ(<em>k</em>) for <em>k</em> results).</li>
</ul>
<p>An in-order traversal lists all keys in sorted order in Θ(<em>n</em>). A hash table can do none of these efficiently.</p>

<h3>Rotations</h3>
<p>The tool for reshaping a BST is the <strong>rotation</strong>. A right rotation at node <em>y</em> with left child <em>x</em> makes <em>x</em> the root of that subtree and <em>y</em> its right child:</p>
<figure class="fig"><svg viewBox="0 0 520 170" role="img" aria-label="A right rotation turns y with left child x into x with right child y; subtree B moves from x's right to y's left.">
<g class="ln"><line x1="110" y1="40" x2="70" y2="80"/><line x1="110" y1="40" x2="150" y2="80"/><line x1="70" y1="80" x2="40" y2="125"/><line x1="70" y1="80" x2="100" y2="125"/>
<line x1="410" y1="40" x2="370" y2="80"/><line x1="410" y1="40" x2="450" y2="80"/><line x1="450" y1="80" x2="420" y2="125"/><line x1="450" y1="80" x2="480" y2="125"/></g>
<g class="box"><circle cx="110" cy="40" r="16"/><circle cx="70" cy="80" r="16"/><circle cx="410" cy="40" r="16"/><circle cx="450" cy="80" r="16"/></g>
<g class="soft"><rect x="27" y="125" width="26" height="26"/><rect x="87" y="125" width="26" height="26"/><rect x="137" y="80" width="26" height="26"/><rect x="357" y="80" width="26" height="26"/><rect x="407" y="125" width="26" height="26"/><rect x="467" y="125" width="26" height="26"/></g>
<g class="text"><text x="110" y="45" text-anchor="middle">y</text><text x="70" y="85" text-anchor="middle">x</text><text x="410" y="45" text-anchor="middle">x</text><text x="450" y="85" text-anchor="middle">y</text>
<text x="40" y="143" text-anchor="middle">A</text><text x="100" y="143" text-anchor="middle">B</text><text x="150" y="98" text-anchor="middle">C</text>
<text x="370" y="98" text-anchor="middle">A</text><text x="420" y="143" text-anchor="middle">B</text><text x="480" y="143" text-anchor="middle">C</text>
<text x="260" y="70" text-anchor="middle">right rotation at y →</text><text x="260" y="95" text-anchor="middle" class="m">← left rotation at x</text></g>
</svg><figcaption>A rotation changes the shape but not the order: in both trees, everything in A &lt; x &lt; everything in B &lt; y &lt; everything in C.</figcaption></figure>
<p>Only three pointers change, so a rotation is Θ(1). And it preserves the BST property: the in-order sequence A, <em>x</em>, B, <em>y</em>, C is the same before and after. What changes is the height: in the right rotation, subtree A moves up a level and C moves down. A <strong>left rotation</strong> is the mirror image.</p>
<pre><code>class Node:
    def __init__(self, key):
        self.key = key
        self.left = self.right = None
        self.height = 1          # a single node has height 1

def height(node):
    return node.height if node else 0

def update(node):
    node.height = 1 + max(height(node.left), height(node.right))

def rotate_right(y):
    x = y.left
    y.left = x.right             # subtree B moves across
    x.right = y
    update(y)                    # y is now below x, so update it first
    update(x)
    return x                     # x is the new root of this subtree

def rotate_left(x):
    y = x.right
    x.right = y.left
    y.left = x
    update(x)
    update(y)
    return y</code></pre>

<h3>AVL trees</h3>
<p>In 1962, Georgy Adelson-Velsky and Evgenii Landis published the first balanced search tree, now named with their initials. An <strong>AVL tree</strong> is a BST in which, at every node, the heights of the left and right subtrees differ by at most 1. The difference, height(left) − height(right), is the node's <strong>balance factor</strong>; in an AVL tree it is always −1, 0 or +1.</p>
<p><strong>Insertion</strong> starts as in an ordinary BST. The new leaf can make some ancestors' balance factors +2 or −2. Walking back up from the new leaf, at the lowest unbalanced node there are four cases, named by the path from that node toward the new key:</p>
<table>
<thead><tr><th>Case</th><th>Shape</th><th>Fix</th></tr></thead>
<tbody>
<tr><td>Left-Left</td><td>too tall on the left, and the left child leans left</td><td>rotate right at the node</td></tr>
<tr><td>Right-Right</td><td>mirror image</td><td>rotate left at the node</td></tr>
<tr><td>Left-Right</td><td>too tall on the left, but the left child leans right</td><td>rotate left at the left child, then right at the node</td></tr>
<tr><td>Right-Left</td><td>mirror image</td><td>rotate right at the right child, then left at the node</td></tr>
</tbody>
</table>
<pre><code>def balance(node):
    return height(node.left) - height(node.right)

def insert(node, key):
    if node is None:
        return Node(key)
    if key &lt; node.key:
        node.left = insert(node.left, key)
    elif key &gt; node.key:
        node.right = insert(node.right, key)
    else:
        return node                       # key already present
    update(node)
    b = balance(node)
    if b &gt; 1 and key &lt; node.left.key:     # Left-Left
        return rotate_right(node)
    if b &lt; -1 and key &gt; node.right.key:   # Right-Right
        return rotate_left(node)
    if b &gt; 1:                             # Left-Right
        node.left = rotate_left(node.left)
        return rotate_right(node)
    if b &lt; -1:                            # Right-Left
        node.right = rotate_right(node.right)
        return rotate_left(node)
    return node

root = None
for k in range(1, 8):          # sorted order: the worst case for a plain BST
    root = insert(root, k)
print(root.key, height(root))  # 4 3</code></pre>
<p>Inserting 1 to 7 in order gives a perfectly balanced tree of height 3 with 4 at the root, where a plain BST would have height 7. Try a small case by hand. Insert 3, 1, 2: the root 3 gets balance +2 and its left child 1 leans right, the Left-Right case. Rotating left at 1 makes 2 the left child of 3 (now Left-Left), and rotating right at 3 makes 2 the root with children 1 and 3.</p>
<p>Each insertion walks one root-to-leaf path and does at most two rotations, so it costs O(height). Deletion is similar but may need rotations at several levels on the way up; it is still O(height).</p>

<h3>Why the height is O(log n)</h3>
<p>Let <em>N</em>(<em>h</em>) be the fewest nodes an AVL tree of height <em>h</em> can have. The sparsest such tree has a root, one subtree of height <em>h</em> − 1 and, as unbalanced as allowed, one of height <em>h</em> − 2, each as sparse as possible:</p>
<p class="math">N(h) = N(h − 1) + N(h − 2) + 1,   N(1) = 1, N(2) = 2</p>
<p>This is the Fibonacci recurrence plus one. Its values are 1, 2, 4, 7, 12, 20, 33, …, and like the Fibonacci numbers they grow exponentially, by a factor approaching φ ≈ 1.618 per step (MATH 121 Lesson 3). So a tree with <em>n</em> nodes has <em>n</em> ≥ <em>N</em>(<em>h</em>) ≥ <em>c</em> · φ<sup><em>h</em></sup> for some constant <em>c</em> &gt; 0. Solve for <em>h</em> by taking log₂ of both sides:</p>
<p class="math">log₂ n ≥ log₂ c + h · log₂ φ,   so   h ≤ (log₂ n − log₂ c) / log₂ φ</p>
<p>Since log₂ φ ≈ 0.694 and 1/0.694 ≈ 1.44, this says <em>h</em> ≤ 1.44 log₂ <em>n</em> plus a constant, so <em>h</em> = O(log <em>n</em>). A perfectly balanced tree has height about log₂ <em>n</em>, so an AVL tree is never more than about 44% taller. (Working with the exact values of <em>N</em>(<em>h</em>) instead of the constant <em>c</em> gives a bound with nothing added: <em>h</em> &lt; 1.44 log₂(<em>n</em> + 2) for every AVL tree. This is "the AVL bound" that the programming problem checks.)</p>

<h3>Balanced trees in real libraries</h3>
<p>AVL trees are strictly balanced, which makes lookups fast. Most libraries use <strong>red-black trees</strong> instead: a looser balance rule (no root-to-leaf path is more than twice as long as any other) that needs fewer rotations on insertion and deletion. Java's <code>TreeMap</code> and <code>TreeSet</code> and C++'s <code>std::map</code> and <code>std::set</code> are red-black trees in the standard implementations. Databases and file systems use <strong>B-trees</strong>, which store hundreds of keys per node so that a tree of height 3 or 4 can index billions of records, each level costing one disk read.</p>
<pre data-label="Java"><code>TreeMap&lt;Integer, String&gt; m = new TreeMap&lt;&gt;();
m.put(30, "c"); m.put(10, "a"); m.put(20, "b");
System.out.println(m.firstKey());       // 10
System.out.println(m.ceilingKey(15));   // 20: the smallest key ≥ 15
System.out.println(m.subMap(10, 25));   // {10=a, 20=b}: keys in [10, 25)</code></pre>
<p>Python's standard library has no balanced tree. For ordered data, Python programmers often keep a sorted list and use the standard <code>bisect</code> module, which does binary search on a sorted list. <code>bisect.bisect_left(xs, x)</code> returns the position where <code>x</code> would go to keep <code>xs</code> sorted, in Θ(log <em>n</em>) time, and <code>bisect.insort(xs, x)</code> inserts <code>x</code> at that position. Searching is fast, but insertion is Θ(<em>n</em>), because every later item must shift (Lesson 2). The other common choice is the third-party <code>sortedcontainers</code> package, installed with <code>pip</code>.</p>
<pre><code>import bisect
xs = [10, 20, 30, 40]
print(bisect.bisect_left(xs, 25))   # 2: 25 belongs before 30
bisect.insort(xs, 25)
print(xs)                           # [10, 20, 25, 30, 40]</code></pre>
`,
      terms: [
        ["Balanced search tree", "A binary search tree that restructures itself to keep its height O(log n)."],
        ["Rotation", "A constant-time change to a subtree's shape that preserves the in-order sequence of keys."],
        ["AVL tree", "A BST in which every node's subtrees differ in height by at most 1."],
        ["Balance factor", "height(left subtree) − height(right subtree) at a node."],
        ["Successor", "The next larger key in sorted order."],
        ["Red-black tree", "A balanced BST with a looser balance rule than AVL; used by Java's TreeMap and C++'s std::map."],
        ["B-tree", "A balanced search tree with many keys per node, designed for disks; used by databases and file systems."]
      ],
      quiz: [
        { q: "What does a rotation preserve?", choices: ["The tree's height", "The in-order sequence of keys", "Which node is the root", "Every node's depth"], answer: 1, why: "A rotation changes shape and heights but keeps the BST order." },
        { q: "Insert 1, 2, 3 into an empty AVL tree. What is the root afterwards?", choices: ["1", "2", "3", "It depends"], answer: 1, why: "After inserting 3, node 1 has balance −2 (Right-Right); a left rotation at 1 makes 2 the root." },
        { q: "Which recurrence gives the fewest nodes in an AVL tree of height h?", choices: ["N(h) = 2N(h − 1) + 1", "N(h) = N(h − 1) + N(h − 2) + 1", "N(h) = N(h − 1) + 1", "N(h) = h²"], answer: 1, why: "The sparsest tree has subtrees of heights h − 1 and h − 2, each as sparse as possible." },
        { q: "Why might you choose a balanced BST over a hash table?", choices: ["Lookups are faster", "You need keys in order: successors, ranges, minimum", "It uses less memory", "It needs no comparisons"], answer: 1, why: "Hash tables scatter keys; trees keep them sorted." },
        { q: "Why do databases use B-trees rather than binary trees?", choices: ["They are simpler", "Many keys per node make the tree very shallow, so a lookup needs few disk reads", "They don't need balancing", "Binary trees can't store strings"], answer: 1, why: "Each level is one slow disk read, so a shallow tree is much faster." }
      ],
      practice: [
        {
          q: `<p>Insert 10, 20, 30, 40, 50, 25 into an empty AVL tree. Draw the tree after each insertion that causes a rotation, and name the case.</p>`,
          a: `<p>After 30: Right-Right at 10, rotate left → 20 (10, 30). After 40: no rotation. After 50: node 30 is Right-Right, rotate left at 30 → 20 (10, 40 (30, 50)). After 25: the root 20 has balance −2; its right child 40 leans left (25 went into 30's left), so Right-Left: rotate right at 40, then left at 20 → root 30 with left 20 (10, 25) and right 40 (—, 50).</p>`
        },
        {
          q: `<p>Compute <em>N</em>(<em>h</em>) for <em>h</em> = 1 to 10 from the recurrence. What is the greatest possible height of an AVL tree with 100 nodes? Compare with the height of a perfectly balanced tree with 100 nodes.</p>`,
          a: `<p>1, 2, 4, 7, 12, 20, 33, 54, 88, 143. A tree of height 10 needs at least 143 nodes, so 100 nodes give height at most 9 (since <em>N</em>(9) = 88 ≤ 100). A perfectly balanced tree with 100 nodes has height 7 (2⁶ − 1 = 63 &lt; 100 ≤ 127 = 2⁷ − 1). So AVL is at most 2 levels worse here.</p>`
        },
        {
          q: `<p>Write <code>count_in_range(node, lo, hi)</code> that counts the keys <em>x</em> in a BST with lo ≤ <em>x</em> ≤ hi, skipping subtrees that can't contain any. The tree is balanced and holds <em>n</em> keys, and <em>m</em> of them lie in the range. What is the function's cost, in terms of <em>n</em> and <em>m</em>?</p>`,
          a: `<pre><code>def count_in_range(node, lo, hi):
    if node is None:
        return 0
    if node.key &lt; lo:
        return count_in_range(node.right, lo, hi)
    if node.key &gt; hi:
        return count_in_range(node.left, lo, hi)
    return 1 + count_in_range(node.left, lo, hi) + count_in_range(node.right, lo, hi)</code></pre><p>It visits the nodes in range, plus at most two root-to-leaf paths along the boundaries: O(log <em>n</em> + <em>m</em>). (Storing each subtree's size in its node allows counting in O(log <em>n</em>) without visiting the <em>m</em> nodes.)</p>`
        },
        {
          q: `<p>Show that a rotation preserves the BST property by listing the in-order traversal of both trees in the figure. Then explain why <code>rotate_right</code> must update <em>y</em>'s height before <em>x</em>'s.</p>`,
          a: `<p>Both traversals give A, <em>x</em>, B, <em>y</em>, C. After the rotation <em>y</em> is <em>x</em>'s child, so <em>x</em>'s new height depends on <em>y</em>'s new height; updating <em>x</em> first would use <em>y</em>'s stale height.</p>`
        }
      ],
      sources: ["clrs", "odsds", "sedgewick"]
    }
  ]
});

CSA.addUnits("cs201", [
    {
      id: "ds5",
      title: "Heaps and priority queues",
      minutes: 90,
      summary: "The priority queue, which always hands back the most urgent item; the binary heap that implements it inside an array; building a heap in linear time; heapsort; and Python's heapq module.",
      notes: `
<p>A queue serves items in arrival order. Many problems instead need the <em>most urgent</em> item first: the next event in a simulation, the cheapest unexplored route in a map, the highest-priority job on a server, the 10 largest values in a stream. The abstract data type for this is the <strong>priority queue</strong>: it holds items with priorities and supports <em>insert</em>, <em>find-min</em> (look at the item with the smallest priority) and <em>extract-min</em> (remove and return it). (A max-priority queue is the mirror image.)</p>
<p>A sorted list gives Θ(1) extract-min but Θ(<em>n</em>) insert; an unsorted list is the opposite. A balanced BST (Lesson 4) gives O(log <em>n</em>) for both, but a simpler structure does as well with less memory and better constants: the binary heap.</p>

<h3>The binary heap</h3>
<p>A <strong>binary heap</strong> is a binary tree with two properties:</p>
<ul>
<li><strong>Shape:</strong> it is a <em>complete</em> binary tree. Every level is full except possibly the last, which is filled from the left.</li>
<li><strong>Heap order:</strong> every node's key is less than or equal to its children's keys. So the smallest key is at the root. (This is a <em>min-heap</em>; a max-heap reverses the inequality.)</li>
</ul>
<p>Heap order is much weaker than BST order: siblings can be in any order, and there's no left-to-right sorting. That weakness is what makes heaps cheap to maintain.</p>
<p>Because the tree is complete, it fits in an array with no pointers at all. Store the nodes level by level, left to right. Then, counting from 0, the node at index <em>i</em> has</p>
<p class="math">children at 2i + 1 and 2i + 2,   parent at (i − 1) // 2</p>
<figure class="fig"><svg viewBox="0 0 520 190" role="img" aria-label="A min-heap drawn as a tree with root 1, children 3 and 2, and the same heap stored in an array [1, 3, 2, 7, 4, 5, 9].">
<g class="ln"><line x1="130" y1="30" x2="75" y2="80"/><line x1="130" y1="30" x2="185" y2="80"/><line x1="75" y1="80" x2="45" y2="130"/><line x1="75" y1="80" x2="105" y2="130"/><line x1="185" y1="80" x2="155" y2="130"/><line x1="185" y1="80" x2="215" y2="130"/></g>
<g class="box"><circle cx="130" cy="30" r="15"/><circle cx="75" cy="80" r="15"/><circle cx="185" cy="80" r="15"/><circle cx="45" cy="130" r="15"/><circle cx="105" cy="130" r="15"/><circle cx="155" cy="130" r="15"/><circle cx="215" cy="130" r="15"/></g>
<g class="text"><text x="130" y="35" text-anchor="middle">1</text><text x="75" y="85" text-anchor="middle">3</text><text x="185" y="85" text-anchor="middle">2</text><text x="45" y="135" text-anchor="middle">7</text><text x="105" y="135" text-anchor="middle">4</text><text x="155" y="135" text-anchor="middle">5</text><text x="215" y="135" text-anchor="middle">9</text></g>
<g class="box"><rect x="280" y="65" width="32" height="32"/><rect x="312" y="65" width="32" height="32"/><rect x="344" y="65" width="32" height="32"/><rect x="376" y="65" width="32" height="32"/><rect x="408" y="65" width="32" height="32"/><rect x="440" y="65" width="32" height="32"/><rect x="472" y="65" width="32" height="32"/></g>
<g class="text"><text x="296" y="86" text-anchor="middle">1</text><text x="328" y="86" text-anchor="middle">3</text><text x="360" y="86" text-anchor="middle">2</text><text x="392" y="86" text-anchor="middle">7</text><text x="424" y="86" text-anchor="middle">4</text><text x="456" y="86" text-anchor="middle">5</text><text x="488" y="86" text-anchor="middle">9</text>
<text x="296" y="118" text-anchor="middle" class="m">0</text><text x="328" y="118" text-anchor="middle" class="m">1</text><text x="360" y="118" text-anchor="middle" class="m">2</text><text x="392" y="118" text-anchor="middle" class="m">3</text><text x="424" y="118" text-anchor="middle" class="m">4</text><text x="456" y="118" text-anchor="middle" class="m">5</text><text x="488" y="118" text-anchor="middle" class="m">6</text>
<text x="392" y="150" text-anchor="middle" class="m">index</text></g>
</svg><figcaption>A min-heap and its array. The children of index 1 (key 3) are at indexes 3 and 4 (keys 7 and 4); every parent is at most its children.</figcaption></figure>
<p>A heap of <em>n</em> items has height ⌊log₂ <em>n</em>⌋ + 1 (counting nodes, as in Lesson 4: a heap of 7 items has 3 full levels and height 3). So any path from the root to a leaf has O(log <em>n</em>) nodes.</p>

<h3>Insert: sift up</h3>
<p>To insert, append the new item at the end of the array (the next free spot in the last level, keeping the shape). Heap order may now fail between the new item and its parent. If the item is smaller than its parent, swap them, and repeat until it is not smaller than its parent or reaches the root. This is <strong>sift-up</strong>: O(log <em>n</em>) swaps at most.</p>

<h3>Extract-min: sift down</h3>
<p>The minimum is at index 0. To remove it, move the <em>last</em> item into the root (keeping the shape) and shrink the array by one. Now the root may be larger than its children. Swap it with its <em>smaller</em> child (swapping with the larger would put the larger child above the smaller one, breaking heap order), and repeat until it is no larger than its children or reaches a leaf. This is <strong>sift-down</strong>: O(log <em>n</em>).</p>
<pre><code>class MinHeap:
    def __init__(self):
        self._a = []

    def __len__(self):
        return len(self._a)

    def push(self, x):
        a = self._a
        a.append(x)
        i = len(a) - 1
        while i &gt; 0:                       # sift up
            parent = (i - 1) // 2
            if a[i] &gt;= a[parent]:
                break
            a[i], a[parent] = a[parent], a[i]
            i = parent

    def pop(self):
        a = self._a
        smallest = a[0]                    # IndexError if empty, like list.pop()
        last = a.pop()
        if a:
            a[0] = last
            self._sift_down(0)
        return smallest

    def _sift_down(self, i):
        a, n = self._a, len(self._a)
        while True:
            left, right, best = 2 * i + 1, 2 * i + 2, i
            if left &lt; n and a[left] &lt; a[best]:
                best = left
            if right &lt; n and a[right] &lt; a[best]:
                best = right
            if best == i:
                return
            a[i], a[best] = a[best], a[i]
            i = best

h = MinHeap()
for x in [5, 3, 8, 1, 9, 2]:
    h.push(x)
print([h.pop() for _ in range(len(h))])   # [1, 2, 3, 5, 8, 9]</code></pre>

<h3>Building a heap in linear time</h3>
<p>To make a heap from <em>n</em> items, we could push them one at a time: O(<em>n</em> log <em>n</em>). There's a faster way, due to Robert Floyd (1964): put the items in the array in any order, then call sift-down on every non-leaf node, from the last one back to the root.</p>
<pre><code>def heapify(a):
    h = MinHeap()
    h._a = a
    for i in range(len(a) // 2 - 1, -1, -1):   # last non-leaf down to the root
        h._sift_down(i)
    return h</code></pre>
<p>Why is this O(<em>n</em>)? A node of height <em>h</em> (Lesson 4's convention, so a leaf has height 1) can sift down at most <em>h</em> − 1 levels, one swap per level. About half the nodes are leaves (height 1: no swaps, and skipped), a quarter have height 2 (at most 1 swap), an eighth have height 3 (at most 2 swaps), and so on. The total number of swaps is at most</p>
<p class="math">n · (1/4 · 1 + 1/8 · 2 + 1/16 · 3 + …) = n · Σ<sub>j≥1</sub> j/2<sup>j+1</sup> = (n/2) · Σ<sub>j≥1</sub> j/2<sup>j</sup></p>
<p>The last sum is S = 1/2 + 2/4 + 3/8 + 4/16 + …. Halve every term and shift it one place right: S/2 = 1/4 + 2/8 + 3/16 + …. Subtracting term by term, S − S/2 = 1/2 + 1/4 + 1/8 + … = 1, a geometric series. (Subtracting term by term is valid because S converges: MATH 131 Lesson 4 proves it with the ratio test, in a practice problem about this very series.) So S/2 = 1, S = 2, and the total is at most (<em>n</em>/2) · 2 = <em>n</em> swaps. Most nodes are near the bottom, where sift-down is cheap; only a few are near the top, where it's expensive. Pushing one at a time does the opposite: most items are inserted at the bottom and may sift all the way up.</p>

<h3>Heapsort</h3>
<p>A heap gives a sorting algorithm. Build a <em>max</em>-heap of the array in O(<em>n</em>). Then repeatedly swap the root (the largest item) with the last item of the heap, shrink the heap by one, and sift the new root down. The largest items collect at the end of the array in order. <strong>Heapsort</strong>, published by J. W. J. Williams in 1964, sorts in O(<em>n</em> log <em>n</em>) time in the worst case using O(1) extra memory: it is in place. It isn't stable (Lesson 6) and, because it jumps around the array, it is usually slower in practice than a good quicksort or merge sort.</p>

<h3>Python's heapq</h3>
<p>Python's standard library has a min-heap that works on an ordinary list:</p>
<pre><code>import heapq

tasks = []
heapq.heappush(tasks, (2, "write report"))
heapq.heappush(tasks, (1, "fix outage"))
heapq.heappush(tasks, (3, "lunch"))
print(heapq.heappop(tasks))          # (1, 'fix outage')

nums = [9, 4, 7, 1, 8]
heapq.heapify(nums)                  # O(n), in place
print(nums[0])                       # 1
print(heapq.nlargest(2, [5, 1, 9, 3, 7]))   # [9, 7]</code></pre>
<p>Two common idioms. Store <strong>(priority, item)</strong> tuples: tuples compare by their first element, then the second on a tie. (If items can't be compared, add a counter as a tie-breaker: <code>(priority, count, item)</code>.) And for a <strong>max-heap</strong>, push negated priorities.</p>
<p>Java's <code>PriorityQueue</code> and C++'s <code>std::priority_queue</code> are binary heaps too. (C++'s is a max-heap by default.)</p>

<h3>Top k with a small heap</h3>
<p>To find the <em>k</em> largest of <em>n</em> numbers, sorting costs O(<em>n</em> log <em>n</em>). Better: keep a <em>min</em>-heap of the <em>k</em> largest seen so far. For each new number, if it's larger than the heap's minimum, replace the minimum with it. Each step costs O(log <em>k</em>), so the total is O(<em>n</em> log <em>k</em>), and memory is O(<em>k</em>) even if the numbers arrive as an endless stream. This is how <code>heapq.nlargest</code> works.</p>
`,
      terms: [
        ["Priority queue", "An abstract data type supporting insert, find-min and extract-min."],
        ["Binary heap", "A complete binary tree, stored in an array, in which every node's key is at most its children's keys."],
        ["Complete binary tree", "A binary tree whose levels are all full except possibly the last, which is filled from the left."],
        ["Sift-up / sift-down", "Restoring heap order by moving an item up toward the root, or down toward the leaves."],
        ["Heapify", "Building a heap from an arbitrary array in O(n) by sifting down every non-leaf, last to first."],
        ["Heapsort", "An in-place, O(n log n) worst-case sorting algorithm that repeatedly extracts the maximum from a heap."]
      ],
      quiz: [
        { q: "In a heap stored in an array from index 0, where are the children of index 4?", choices: ["8 and 9", "9 and 10", "5 and 6", "2"], answer: 1, why: "Children of i are at 2i + 1 = 9 and 2i + 2 = 10." },
        { q: "During sift-down in a min-heap, why swap with the smaller child?", choices: ["It's faster", "So that the new parent is no larger than both children", "To keep the tree complete", "It doesn't matter"], answer: 1, why: "Promoting the larger child would put it above the smaller one, breaking heap order." },
        { q: "Why does building a heap by sifting down from the bottom take only O(n)?", choices: ["Sift-down is O(1)", "Most nodes are near the bottom, where sift-down is cheap", "Half the items are already in order", "It skips the root"], answer: 1, why: "The costs n/4·1 + n/8·2 + … add up to at most n." },
        { q: "How do you get a max-heap from Python's heapq?", choices: ["heapq.maxheap()", "Push negated priorities", "Sort descending first", "heapq can't do it"], answer: 1, why: "heapq is a min-heap; negating priorities reverses the order." },
        { q: "What is the cost of finding the 10 largest of n numbers with a size-10 min-heap?", choices: ["O(n log n)", "O(n log 10), which is O(n)", "O(n²)", "O(log n)"], answer: 1, why: "Each of the n numbers costs O(log k) with k = 10, a constant." }
      ],
      practice: [
        {
          q: `<p>Insert 6, 4, 9, 2, 7, 1 one at a time into an empty min-heap. Show the array after each insertion.</p>`,
          a: `<p>[6] → [4, 6] → [4, 6, 9] → [2, 4, 9, 6] (2 sifts past 6 and 4) → [2, 4, 9, 6, 7] → [1, 4, 2, 6, 7, 9] (1 sifts past 9 and 2).</p>`
        },
        {
          q: `<p>Call <code>pop()</code> once on the heap [1, 4, 2, 6, 7, 9]. Show each step of sift-down.</p>`,
          a: `<p>Remove 1; move the last item, 9, to the root: [9, 4, 2, 6, 7]. Children of 9 are 4 and 2; the smaller is 2, so swap: [2, 4, 9, 6, 7]. 9 is now at index 2, whose children would be at 5 and 6, beyond the end: stop. Result [2, 4, 9, 6, 7].</p>`
        },
        {
          q: `<p>Run <code>heapify</code> by hand on [8, 5, 7, 1, 3, 2]. Which indexes does it sift down, in what order, and what is the final array?</p>`,
          a: `<p><em>n</em> = 6, so it sifts indexes 2, 1, 0. Index 2 (7) vs child 2 at index 5: swap → [8, 5, 2, 1, 3, 7]. Index 1 (5) vs children 1, 3: swap with 1 → [8, 1, 2, 5, 3, 7]. Index 0 (8) vs children 1, 2: swap with 1 → [1, 8, 2, 5, 3, 7]; then 8 at index 1 vs children 5, 3: swap with 3 → [1, 3, 2, 5, 8, 7].</p>`
        },
        {
          q: `<p>Merge <em>k</em> sorted lists with <em>n</em> items in total into one sorted list in O(<em>n</em> log <em>k</em>) time. Describe the algorithm and write it with <code>heapq</code>.</p>`,
          hint: `<p>Keep one item from each list in the heap: the smallest not yet output.</p>`,
          a: `<pre><code>import heapq
def merge_sorted(lists):
    heap = [(lst[0], i, 0) for i, lst in enumerate(lists) if lst]
    heapq.heapify(heap)
    out = []
    while heap:
        value, i, j = heapq.heappop(heap)
        out.append(value)
        if j + 1 &lt; len(lists[i]):
            heapq.heappush(heap, (lists[i][j + 1], i, j + 1))
    return out</code></pre><p>The heap never holds more than <em>k</em> items, so each of the <em>n</em> pops and pushes costs O(log <em>k</em>). The list index <em>i</em> breaks ties so the tuples always compare.</p>`
        }
      ],
      sources: ["clrs", "odsds", "pytutorial"]
    },
    {
      id: "ds6",
      title: "Sorting",
      minutes: 90,
      summary: "Insertion sort and when it wins, quicksort and partitioning, stability, why no comparison sort can beat n log n, counting and radix sort that sidestep the bound, and the hybrid sorts real libraries use.",
      notes: `
<p>CS 101 compared selection sort, Θ(<em>n</em>²), with merge sort, Θ(<em>n</em> log <em>n</em>). This lesson completes the picture: two more important algorithms, a proof that <em>n</em> log <em>n</em> is the best any comparison-based sort can do, and two algorithms that beat it by not comparing.</p>

<h3>Insertion sort</h3>
<p>Insertion sort grows a sorted prefix one item at a time: take the next item and shift it left past every larger item, like sorting a hand of cards.</p>
<pre><code>def insertion_sort(a):
    for i in range(1, len(a)):
        x = a[i]
        j = i - 1
        while j &gt;= 0 and a[j] &gt; x:   # shift larger items right
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = x
    return a

print(insertion_sort([5, 2, 4, 6, 1, 3]))   # [1, 2, 3, 4, 5, 6]</code></pre>
<p>Its worst case (reverse order) is Θ(<em>n</em>²). But its cost is really Θ(<em>n</em> + <em>I</em>), where <em>I</em> is the number of <strong>inversions</strong>: pairs that are out of order. On a nearly sorted list it is close to linear, and on tiny lists its simplicity beats every clever algorithm. That's why real libraries switch to insertion sort for small pieces.</p>

<h3>Quicksort</h3>
<p>Quicksort, invented by Tony Hoare around 1960, is merge sort's opposite. Merge sort splits trivially and does its work combining; quicksort does its work splitting and combines trivially. To sort a list: pick an item, the <strong>pivot</strong>; <strong>partition</strong> the list into items less than the pivot, then the pivot, then items greater than or equal to it; sort the two parts recursively. No merging is needed: everything in the left part already belongs before everything in the right.</p>
<p>The partition can be done in place in one pass. In the simple <em>Lomuto</em> scheme, the last item is the pivot and an index <code>i</code> marks the end of the "less than" region:</p>
<pre><code>def partition(a, lo, hi):        # sorts nothing; rearranges a[lo..hi] around a pivot
    pivot = a[hi]
    i = lo
    for j in range(lo, hi):
        if a[j] &lt; pivot:
            a[i], a[j] = a[j], a[i]
            i += 1
    a[i], a[hi] = a[hi], a[i]      # put the pivot between the two regions
    return i                       # the pivot's final position

def quicksort(a, lo=0, hi=None):
    if hi is None:
        hi = len(a) - 1
    if lo &lt; hi:
        p = partition(a, lo, hi)
        quicksort(a, lo, p - 1)
        quicksort(a, p + 1, hi)
    return a

print(quicksort([3, 7, 1, 8, 2, 5]))   # [1, 2, 3, 5, 7, 8]</code></pre>
<p>Partitioning costs Θ(<em>n</em>). If the pivot always lands near the middle, the recursion looks like merge sort's, T(<em>n</em>) = 2T(<em>n</em>/2) + Θ(<em>n</em>) = Θ(<em>n</em> log <em>n</em>). If it always lands at an end (for example, sorting an already sorted list with the last item as pivot), one side is empty and T(<em>n</em>) = T(<em>n</em> − 1) + Θ(<em>n</em>) = Θ(<em>n</em>²), and the recursion is <em>n</em> levels deep.</p>
<p>Deep recursion has its own cost: each pending call keeps a frame on the call stack (Lesson 1), and Python stops with <code>RecursionError</code> after about 1,000 nested calls. A standard trick limits the depth. Make the <em>second</em> recursive call disappear: put the body in a <code>while</code> loop, recurse only on the <em>smaller</em> part, and then change <code>lo</code> or <code>hi</code> so that the next pass of the loop sorts the larger part.</p>
<pre><code>def quicksort_shallow(a, lo=0, hi=None):
    if hi is None:
        hi = len(a) - 1
    while lo &lt; hi:
        p = partition(a, lo, hi)
        if p - lo &lt; hi - p:              # the left part is smaller
            quicksort_shallow(a, lo, p - 1)
            lo = p + 1                   # loop again on the right part
        else:
            quicksort_shallow(a, p + 1, hi)
            hi = p - 1                   # loop again on the left part
    return a

xs = list(range(2000))                   # already sorted: the worst case
print(quicksort_shallow(xs) == list(range(2000)))   # True, with no RecursionError</code></pre>
<p>Each recursive call gets at most half of the current range, so the recursion is at most log₂ <em>n</em> calls deep. The running time is unchanged: Θ(<em>n</em>²) on this sorted input, just without the deep stack.</p>
<p>The cure is to choose the pivot <strong>at random</strong>. MATH 121 Lesson 7 proved, with indicator variables, that randomized quicksort makes about 2<em>n</em> ln <em>n</em> ≈ 1.39 <em>n</em> log₂ <em>n</em> comparisons on average, for <em>every</em> input. No input is bad any more; only unlucky coin flips are, and they are astronomically unlikely to be very unlucky. Quicksort is in place apart from its recursion stack and has excellent constants, so it's often the fastest general-purpose sort in practice.</p>

<h3>Stability</h3>
<p>A sort is <strong>stable</strong> if items with equal keys keep their original relative order. Stability matters when you sort by one key after another. Sort a class list by name, then stably by grade: students with the same grade stay in name order. Merge sort and insertion sort are stable (if written carefully); quicksort and heapsort, as usually written, are not. Python's <code>sorted</code> and <code>list.sort</code> are guaranteed stable.</p>
<pre><code>students = [("Cy", "B"), ("Al", "A"), ("Bo", "B"), ("Di", "A")]
by_name = sorted(students)                         # by name first
by_grade = sorted(by_name, key=lambda s: s[1])     # then stably by grade
print(by_grade)   # [('Al', 'A'), ('Di', 'A'), ('Bo', 'B'), ('Cy', 'B')]</code></pre>

<h3>The lower bound for comparison sorting</h3>
<p>Merge sort, heapsort and randomized quicksort all take about <em>n</em> log <em>n</em> comparisons. Could a cleverer algorithm do better? Not if it learns about the items only by comparing them.</p>
<p>Picture any comparison sort as a <strong>decision tree</strong>. Each internal node is a comparison ("is <em>a</em>[<em>i</em>] &lt; <em>a</em>[<em>j</em>]?") with two branches; each leaf is a final answer, a particular ordering of the input. For the algorithm to be correct on every input, it must be able to produce each of the <em>n</em>! possible orderings, so the tree has at least <em>n</em>! leaves. Let <em>h</em> be the largest number of comparisons on any path from the root to a leaf: the worst-case number of comparisons. Each comparison at most doubles the number of places a path can end (one comparison gives at most 2 leaves, two give at most 4), so the tree has at most 2<sup><em>h</em></sup> leaves, and</p>
<p class="math">2<sup>h</sup> ≥ n!,   so   h ≥ log₂(n!)</p>
<p>And log₂(<em>n</em>!) is Θ(<em>n</em> log <em>n</em>). For a quick lower bound: the largest <em>n</em>/2 factors of <em>n</em>! are each at least <em>n</em>/2, so <em>n</em>! ≥ (<em>n</em>/2)<sup><em>n</em>/2</sup> and log₂(<em>n</em>!) ≥ (<em>n</em>/2) log₂(<em>n</em>/2). (For a precise value, use Stirling's approximation from MATH 131 Lesson 1, ln <em>n</em>! ≈ <em>n</em> ln <em>n</em> − <em>n</em>. To change natural logarithms into base 2, divide by ln 2: log₂(<em>n</em>!) = ln(<em>n</em>!)/ln 2 ≈ <em>n</em> log₂ <em>n</em> − <em>n</em>/ln 2, and 1/ln 2 ≈ 1.44. So log₂(<em>n</em>!) is about <em>n</em> log₂ <em>n</em> − 1.44<em>n</em>.) So <strong>every comparison sort needs Ω(<em>n</em> log <em>n</em>) comparisons in the worst case</strong>, and merge sort and heapsort are optimal up to constant factors.</p>

<h3>Beating the bound: counting and radix sort</h3>
<p>The lower bound assumes the algorithm only compares. If keys are small whole numbers, we can use them as array indexes instead. <strong>Counting sort</strong> sorts <em>n</em> integers in the range 0 to <em>k</em> − 1 by counting how many times each value occurs, then writing them out in order: Θ(<em>n</em> + <em>k</em>). When <em>k</em> is O(<em>n</em>), that's linear.</p>
<pre><code>def counting_sort(xs, k):
    counts = [0] * k
    for x in xs:
        counts[x] += 1
    out = []
    for value in range(k):
        out.extend([value] * counts[value])
    return out

print(counting_sort([3, 1, 4, 1, 5, 2, 0], 6))   # [0, 1, 1, 2, 3, 4, 5]</code></pre>
<p>(This version sorts bare numbers. A stable version, which can sort records by a numeric key, turns the counts into starting positions and places each record in turn.)</p>
<p><strong>Radix sort</strong> extends this to larger keys by sorting digit by digit, starting from the <em>least</em> significant digit, using a stable counting sort for each digit. Stability is what makes it work: after sorting by the tens digit, numbers with the same tens digit stay in the order the ones-digit pass left them. With <em>d</em> digits in base <em>b</em>, it costs Θ(<em>d</em>(<em>n</em> + <em>b</em>)). Sorting a million 32-bit integers takes 4 passes in base 256. Radix sort was used on punched-card sorting machines in the early 1900s, decades before electronic computers.</p>

<h3>What libraries actually use</h3>
<p>Production sorts are hybrids. <strong>Timsort</strong>, written by Tim Peters for Python in 2002, is a stable merge sort that first finds runs that are already in order in the data and uses insertion sort to make short runs longer, then merges the runs cleverly. On random data it is a good O(<em>n</em> log <em>n</em>) sort; on the partly sorted data common in real programs it can approach Θ(<em>n</em>). Java adopted Timsort for sorting objects in Java 7, and uses a dual-pivot quicksort for arrays of primitive numbers, where stability can't be observed. C++'s <code>std::sort</code> is typically <em>introsort</em>: quicksort that switches to heapsort if the recursion gets too deep (guaranteeing O(<em>n</em> log <em>n</em>)), and to insertion sort for small pieces.</p>
<table>
<thead><tr><th>Algorithm</th><th>Worst case</th><th>Average</th><th>Extra memory</th><th>Stable</th></tr></thead>
<tbody>
<tr><td>Insertion sort</td><td>Θ(n²)</td><td>Θ(n²)</td><td>Θ(1)</td><td>yes</td></tr>
<tr><td>Merge sort</td><td>Θ(n log n)</td><td>Θ(n log n)</td><td>Θ(n)</td><td>yes</td></tr>
<tr><td>Heapsort</td><td>Θ(n log n)</td><td>Θ(n log n)</td><td>Θ(1)</td><td>no</td></tr>
<tr><td>Randomized quicksort</td><td>Θ(n²), vanishingly unlikely</td><td>Θ(n log n)</td><td>Θ(log n) stack, expected</td><td>no</td></tr>
<tr><td>Counting sort (keys &lt; k)</td><td>Θ(n + k)</td><td>Θ(n + k)</td><td>Θ(n + k)</td><td>yes (stable version)</td></tr>
<tr><td>Timsort</td><td>Θ(n log n)</td><td>Θ(n log n)</td><td>Θ(n)</td><td>yes</td></tr>
</tbody>
</table>
`,
      terms: [
        ["Inversion", "A pair of items in the wrong order relative to each other; insertion sort's cost is Θ(n + number of inversions)."],
        ["Pivot", "The item quicksort partitions around."],
        ["Partition", "Rearranging items so that those less than the pivot come before it and the rest after."],
        ["Stable sort", "A sort that keeps items with equal keys in their original relative order."],
        ["Decision tree", "A model of a comparison sort as a binary tree of comparisons whose leaves are output orderings."],
        ["Counting sort", "Sorting small integer keys by counting occurrences of each value: Θ(n + k)."],
        ["Radix sort", "Sorting by one digit at a time, least significant first, with a stable sort per digit."]
      ],
      quiz: [
        { q: "When does insertion sort beat merge sort?", choices: ["Never", "On small or nearly sorted lists", "On reversed lists", "On lists of strings"], answer: 1, why: "Its cost is Θ(n + inversions), and its constants are tiny." },
        { q: "Quicksort with the last item as pivot is given an already sorted list. What happens?", choices: ["Θ(n) time", "Θ(n log n) time", "Θ(n²) time, with recursion n deep", "It fails"], answer: 2, why: "Every partition puts all other items on one side." },
        { q: "Why must a comparison sort's decision tree have at least n! leaves?", choices: ["Each comparison has n! outcomes", "Each of the n! input orderings needs its own output", "Trees always have n! leaves", "Because of stability"], answer: 1, why: "Different orderings of the input must be rearranged differently, so each needs its own leaf." },
        { q: "Radix sort processes digits from least to most significant. What property of the per-digit sort makes this work?", choices: ["It is in place", "It is stable", "It is randomized", "It compares keys"], answer: 1, why: "Stability preserves the order established by earlier, less significant digits." },
        { q: "Why doesn't counting sort contradict the Ω(n log n) lower bound?", choices: ["It's not correct", "It uses keys as array indexes rather than only comparing them", "It is only for small n", "The bound is for average cases"], answer: 1, why: "The bound applies only to algorithms that learn about items by comparisons." }
      ],
      practice: [
        {
          q: `<p>Count the inversions in [3, 1, 4, 1, 5]. (Count only pairs whose values are strictly out of order.) How many shifts does insertion sort make on it?</p>`,
          a: `<p>Pairs (<em>i</em> &lt; <em>j</em>) with <em>a</em>[<em>i</em>] &gt; <em>a</em>[<em>j</em>]: (3, 1), (3, 1), (4, 1): 3 inversions. Insertion sort makes exactly one shift per inversion: 3 shifts.</p>`
        },
        {
          q: `<p>Trace one call of <code>partition</code> from the notes on [3, 7, 1, 8, 2, 5] (lo = 0, hi = 5). Show the array after each swap, and the returned index.</p>`,
          a: `<p>Pivot 5, <em>i</em> = 0. <em>j</em> = 0: 3 &lt; 5, swap a[0] with itself, <em>i</em> = 1. <em>j</em> = 1: 7, no. <em>j</em> = 2: 1 &lt; 5, swap a[1], a[2] → [3, 1, 7, 8, 2, 5], <em>i</em> = 2. <em>j</em> = 3: 8, no. <em>j</em> = 4: 2 &lt; 5, swap a[2], a[4] → [3, 1, 2, 8, 7, 5], <em>i</em> = 3. Finally swap a[3] with the pivot → [3, 1, 2, 5, 7, 8]. Returns 3.</p>`
        },
        {
          q: `<p>How many comparisons does any comparison sort need, in the worst case, to sort 5 items? Compute log₂(5!) and round up. Then complete the strategy in the hint and check that it never needs more than that many comparisons.</p>`,
          hint: `<p>Call the items a, b, c, d, e. (1) Compare a with b and c with d, and rename so that a &lt; b and c &lt; d. (2) Compare b with d, and rename the pairs so that b &lt; d. You now know a &lt; b &lt; d, and also c &lt; d. (3) Insert e into the sorted chain a, b, d by binary search: compare it with b first. (4) Insert c, which you know is less than d, into the part of the chain that comes before d. How many items can that part hold, and how many comparisons does binary search need for it? Binary search needs <em>k</em> comparisons to choose among up to 2<sup><em>k</em></sup> positions.</p>`,
          a: `<p>5! = 120 and log₂ 120 ≈ 6.91, so at least 7 comparisons. The strategy in the hint uses exactly 7 in the worst case. Steps 1 and 2 take 3 comparisons. Step 3 chooses among 4 positions for e in a chain of 3 (before a, between a and b, between b and d, after d), so it takes 2. In step 4 the part before d holds a and b, and possibly e: at most 3 items, so 4 possible positions for c, and binary search takes 2 more. Total 3 + 2 + 2 = 7. (Trying all 120 orders of five numbers confirms it never needs an eighth.) This is the smallest case of the Ford–Johnson "merge insertion" algorithm. Merge sort needs up to 8 comparisons on 5 items.</p>`
        },
        {
          q: `<p>Sort [329, 457, 657, 839, 436, 720, 355] with least-significant-digit radix sort. Show the list after each pass.</p>`,
          a: `<p>Ones digit: [720, 355, 436, 457, 657, 329, 839]. Tens digit: [720, 329, 436, 839, 355, 457, 657]. Hundreds digit: [329, 355, 436, 457, 657, 720, 839]. Each pass is stable, so ties keep the previous pass's order.</p>`
        },
        {
          q: `<p>You must sort 10 million records by a two-letter country code, keeping records with the same code in their current order. Which algorithm would you use, and what is its cost?</p>`,
          a: `<p>A stable counting sort on the country code: there are at most 26 × 26 = 676 codes, so <em>k</em> = 676 and the cost is Θ(<em>n</em> + <em>k</em>), essentially linear. (Python's stable <code>sorted(records, key=...)</code> would also work, in Θ(<em>n</em> log <em>n</em>).)</p>`
        }
      ],
      sources: ["clrs", "sedgewick", "timsort"]
    },
    {
      id: "ds7",
      title: "Graphs: representation and traversal",
      minutes: 90,
      summary: "Graphs model networks of every kind. How to store them as adjacency lists or matrices, how breadth-first search finds shortest paths in unweighted graphs, how depth-first search explores, and how topological sort orders tasks with prerequisites.",
      notes: `
<p>A <strong>graph</strong> is a set of <strong>vertices</strong> (also called nodes) and a set of <strong>edges</strong>, each connecting two vertices. Graphs model roads between cities, links between web pages, friendships, network cables, dependencies between software packages, and prerequisites between courses. Trees (CS 102 Lesson 8) are special graphs. Once a problem is phrased as a graph, a large toolbox of algorithms applies.</p>

<h3>Vocabulary</h3>
<ul>
<li>In an <strong>undirected</strong> graph, an edge {<em>u</em>, <em>v</em>} goes both ways (friendship). In a <strong>directed</strong> graph, an edge (<em>u</em>, <em>v</em>) goes from <em>u</em> to <em>v</em> (a link, a prerequisite).</li>
<li>A <strong>weighted</strong> graph has a number on each edge: a distance, a cost, a capacity.</li>
<li>The <strong>degree</strong> of a vertex is its number of edges (in a directed graph, separately in-degree and out-degree). <em>u</em> and <em>v</em> are <strong>adjacent</strong> (neighbors) if an edge joins them.</li>
<li>A <strong>path</strong> is a sequence of vertices, each joined to the next by an edge. A <strong>cycle</strong> is a path that returns to its start. A directed graph with no cycles is a <strong>DAG</strong> (directed acyclic graph).</li>
<li>An undirected graph is <strong>connected</strong> if there's a path between every pair of vertices. Its <strong>connected components</strong> are its maximal connected pieces.</li>
</ul>
<p>We write <em>V</em> for the number of vertices and <em>E</em> for the number of edges. An undirected graph has at most <em>V</em>(<em>V</em> − 1)/2 edges. A graph with close to that many is <strong>dense</strong>; one with far fewer (as most real graphs are) is <strong>sparse</strong>.</p>

<h3>Representations</h3>
<p>An <strong>adjacency matrix</strong> is a <em>V</em> × <em>V</em> table whose entry [<em>u</em>][<em>v</em>] is 1 (or the weight) if there's an edge from <em>u</em> to <em>v</em>. Checking for an edge is Θ(1), but the matrix uses Θ(<em>V</em>²) memory and listing a vertex's neighbors costs Θ(<em>V</em>) even if it has few. An <strong>adjacency list</strong> stores, for each vertex, a list of its neighbors: Θ(<em>V</em> + <em>E</em>) memory, and listing neighbors costs Θ(degree). For sparse graphs, adjacency lists are the standard choice. In Python, a dict of lists is natural:</p>
<pre><code>graph = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C", "E"],
    "E": ["D"],
}
print(len(graph), sum(len(ns) for ns in graph.values()) // 2)   # 5 5  (vertices, edges)</code></pre>
<p>(Each undirected edge appears in two lists, hence the division by 2.) A social network with a billion users and a few hundred friends each has about 10<sup>11</sup> edges; its adjacency matrix would have 10<sup>18</sup> entries. Representation choice is not a detail.</p>

<h3>Breadth-first search</h3>
<p><strong>Breadth-first search</strong> (BFS) explores a graph in rings: first the start vertex, then all its neighbors, then all their unvisited neighbors, and so on. A queue (CS 102 Lesson 7) holds the vertices discovered but not yet explored.</p>
<pre><code>from collections import deque

def bfs_distances(graph, start):
    dist = {start: 0}
    queue = deque([start])
    while queue:
        u = queue.popleft()
        for v in graph[u]:
            if v not in dist:            # first time we see v
                dist[v] = dist[u] + 1
                queue.append(v)
    return dist

print(bfs_distances(graph, "A"))   # {'A': 0, 'B': 1, 'C': 1, 'D': 2, 'E': 3}</code></pre>
<p>Because BFS reaches every vertex at distance 1 before any at distance 2, and so on, <code>dist[v]</code> is the length of the <strong>shortest path</strong> (fewest edges) from the start to <em>v</em>. To recover the path itself, also record each vertex's <em>parent</em>, the vertex it was discovered from, and follow parents back from <em>v</em>.</p>
<p>Each vertex enters the queue at most once, and when it leaves, BFS scans its adjacency list once. So BFS costs Θ(<em>V</em> + <em>E</em>) with adjacency lists: linear in the size of the graph. (For weighted graphs, where the shortest path minimizes total weight rather than edge count, BFS is not enough; Dijkstra's algorithm, in Algorithms I, uses a priority queue instead of a queue.)</p>

<h3>Depth-first search</h3>
<p><strong>Depth-first search</strong> (DFS) explores as far as possible along one path before backing up, like exploring a maze with one hand on the wall. It is naturally recursive:</p>
<pre><code>def dfs(graph, u, visited):
    visited.add(u)
    for v in graph[u]:
        if v not in visited:
            dfs(graph, v, visited)
    return visited

print(sorted(dfs(graph, "A", set())))   # ['A', 'B', 'C', 'D', 'E']</code></pre>
<p>DFS also costs Θ(<em>V</em> + <em>E</em>). It finds everything reachable from the start, which gives a simple way to count connected components: run DFS from each vertex not yet visited, and count the runs. DFS is also the basis of cycle detection and topological sorting. On large graphs, the recursion can exceed Python's limit of about 1,000 nested calls; an iterative version with an explicit stack avoids that.</p>

<h3>Topological sort</h3>
<p>A <strong>topological order</strong> of a directed graph lists its vertices so that every edge goes from earlier to later: every course after its prerequisites, every package after the packages it depends on, every task after the tasks that must precede it. One exists exactly when the graph has no cycle (if A must come before B and B before A, no order works).</p>
<p><strong>Kahn's algorithm</strong> (1962) builds the order directly. Repeatedly output a vertex with no remaining incoming edges, and remove its outgoing edges. Tracking in-degrees makes this Θ(<em>V</em> + <em>E</em>):</p>
<pre><code>from collections import deque

def topological_order(graph):
    indegree = {u: 0 for u in graph}
    for u in graph:
        for v in graph[u]:
            indegree[v] += 1
    ready = deque(u for u in graph if indegree[u] == 0)
    order = []
    while ready:
        u = ready.popleft()
        order.append(u)
        for v in graph[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                ready.append(v)
    if len(order) &lt; len(graph):
        raise ValueError("the graph has a cycle")
    return order

prereqs = {                        # an edge u -&gt; v means "take u before v"
    "CS101": ["CS102"], "MATH120": ["MATH121"], "CS102": ["CS201"],
    "MATH121": ["CS201"], "CS201": [],
}
print(topological_order(prereqs))
# ['CS101', 'MATH120', 'CS102', 'MATH121', 'CS201']</code></pre>
<p>If a cycle exists, the vertices on it never reach in-degree 0, so fewer than <em>V</em> vertices are output, and the function reports the cycle. Build tools, spreadsheet recalculation and package managers all run some version of this algorithm.</p>
`,
      terms: [
        ["Graph", "A set of vertices and a set of edges, each connecting two vertices; directed or undirected, weighted or not."],
        ["Adjacency list", "A representation storing each vertex's neighbors in a list: Θ(V + E) memory."],
        ["Adjacency matrix", "A V × V table marking which pairs of vertices are joined: Θ(V²) memory, Θ(1) edge lookup."],
        ["Breadth-first search", "Exploring a graph in order of distance from the start, using a queue; finds shortest paths in unweighted graphs."],
        ["Depth-first search", "Exploring as far as possible along each path before backing up; recursive or with a stack."],
        ["Connected component", "A maximal set of vertices with a path between every pair."],
        ["DAG", "A directed acyclic graph: a directed graph with no cycles."],
        ["Topological order", "An ordering of a DAG's vertices in which every edge goes from earlier to later."]
      ],
      quiz: [
        { q: "A road map has 10,000 intersections and 25,000 road segments. Which representation fits?", choices: ["Adjacency matrix, for fast lookups", "Adjacency list: the graph is sparse", "Either; they use the same memory", "Neither"], answer: 1, why: "A matrix would need 10⁸ entries for 25,000 edges; lists need about 60,000." },
        { q: "Why does BFS find shortest paths in an unweighted graph?", choices: ["It uses a stack", "It reaches all vertices at distance d before any at distance d + 1", "It tries every path", "It sorts the edges"], answer: 1, why: "The queue processes vertices in order of distance from the start." },
        { q: "What is the running time of BFS or DFS with adjacency lists?", choices: ["Θ(V)", "Θ(E)", "Θ(V + E)", "Θ(V²)"], answer: 2, why: "Each vertex is processed once and each adjacency list is scanned once." },
        { q: "When does a directed graph have a topological order?", choices: ["Always", "When it has no cycles", "When it is connected", "When every vertex has an edge"], answer: 1, why: "A cycle would require some vertex to come before itself." },
        { q: "In Kahn's algorithm, which vertices can be output next?", choices: ["Any vertex", "Those with no remaining incoming edges", "Those with the most outgoing edges", "Leaves"], answer: 1, why: "A vertex with no unmet prerequisites can safely come next." }
      ],
      practice: [
        {
          q: `<p>For the graph in the notes, run BFS from E by hand. Give the order vertices leave the queue and each one's distance. Then list a shortest path from E to A.</p>`,
          a: `<p>E (0), D (1), B (2), C (2), A (3). D was discovered from E; B and C from D; A from B (B's list is scanned first). Following parents back from A: A ← B ← D ← E, so a shortest path is E, D, B, A (E, D, C, A is equally short).</p>`
        },
        {
          q: `<p>Write <code>count_components(graph)</code> for an undirected graph given as a dict of lists, using the <code>dfs</code> function from the notes. What is its cost?</p>`,
          a: `<pre><code>def count_components(graph):
    visited, count = set(), 0
    for u in graph:
        if u not in visited:
            dfs(graph, u, visited)
            count += 1
    return count</code></pre><p>Θ(<em>V</em> + <em>E</em>): each vertex is visited once overall, because <code>visited</code> is shared across the runs.</p>`
        },
        {
          q: `<p>Give two different topological orders for the prerequisite graph in the notes. Then add the edge CS201 → CS101 and explain what Kahn's algorithm does.</p>`,
          a: `<p>For example CS101, CS102, MATH120, MATH121, CS201, and MATH120, MATH121, CS101, CS102, CS201. With CS201 → CS101 there is a cycle CS101 → CS102 → CS201 → CS101; none of the three ever reaches in-degree 0, so only MATH120 and MATH121 are output and the function raises <code>ValueError</code>.</p>`
        },
        {
          q: `<p>A maze is a grid of cells, some walls. Explain how to find the fewest steps from the entrance to the exit using BFS. What are the vertices and edges? What is the cost for a grid of <em>R</em> rows and <em>C</em> columns?</p>`,
          a: `<p>Vertices are open cells; edges join cells that share a side (up, down, left, right). Run BFS from the entrance; the exit's distance is the answer. Generate neighbors on the fly instead of building the graph. There are at most <em>RC</em> vertices and each has at most 4 edges, so BFS costs Θ(<em>RC</em>).</p>`
        }
      ],
      sources: ["clrs", "sedgewick", "odsds"]
    },
    {
      id: "ds8",
      title: "Union-find, tries, and choosing a data structure",
      minutes: 90,
      summary: "Two specialized structures with remarkable performance, union-find for merging groups and tries for searching by prefix, and a guide to choosing among everything in the course.",
      notes: `
<p>This lesson adds two structures that solve narrower problems extremely well, then steps back to compare everything in the course.</p>

<h3>Union-find</h3>
<p>Some problems involve groups that merge over time. Which computers on a network can reach each other as cables are added? Are two pixels part of the same region of an image? Which people are linked through a chain of friendships? The <strong>union-find</strong> (or <strong>disjoint-set</strong>) structure keeps a collection of non-overlapping sets and supports two operations:</p>
<ul>
<li><strong>find(<em>x</em>)</strong>: which set is <em>x</em> in? (It returns a representative item of the set, so that find(<em>x</em>) == find(<em>y</em>) exactly when <em>x</em> and <em>y</em> are in the same set.)</li>
<li><strong>union(<em>x</em>, <em>y</em>)</strong>: merge the sets containing <em>x</em> and <em>y</em>.</li>
</ul>
<p>The idea, from Bernard Galler and Michael Fischer in 1964, is to represent each set as a tree in which every item points to a parent, and the root is the representative. Find follows parent pointers to the root; union makes one root point to the other. Two simple improvements make it extraordinarily fast:</p>
<ul>
<li><strong>Union by size:</strong> attach the smaller tree under the root of the larger. A node's depth then increases only when its tree at least doubles in size, so no tree gets deeper than log₂ <em>n</em>.</li>
<li><strong>Path compression:</strong> during find, make every node on the path point directly to the root. Later finds on those nodes take one step.</li>
</ul>
<pre><code>class UnionFind:
    def __init__(self, items):
        self.parent = {x: x for x in items}
        self.size = {x: 1 for x in items}

    def find(self, x):
        root = x
        while self.parent[root] != root:
            root = self.parent[root]
        while x != root:                    # path compression
            next_x = self.parent[x]         # remember where x pointed
            self.parent[x] = root           # point x straight at the root
            x = next_x                      # move up the old path
        return root

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False                    # already in the same set
        if self.size[rx] &lt; self.size[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx                # smaller tree under larger
        self.size[rx] += self.size[ry]
        return True

uf = UnionFind("ABCDEF")
uf.union("A", "B"); uf.union("C", "D"); uf.union("B", "D")
print(uf.find("A") == uf.find("C"), uf.find("E") == uf.find("A"))   # True False</code></pre>
<p>With both improvements, a sequence of <em>m</em> operations on <em>n</em> items takes O(<em>m</em> α(<em>n</em>)) time, where α is the <strong>inverse Ackermann function</strong>. The Ackermann function, defined by Wilhelm Ackermann in 1928, grows faster than any tower of powers. In the version used for this bound, its values at <em>k</em> = 0, 1, 2, 3 are 2, 3, 7 and 2047, and its value at <em>k</em> = 4 is larger than 2<sup>2048</sup>, a number with more than 600 digits. Its inverse, α(<em>n</em>), is the smallest <em>k</em> whose value is at least <em>n</em>. So α grows so slowly that α(<em>n</em>) ≤ 4 for any <em>n</em> that could ever be stored in a computer. You don't need the definition itself: only the fact that α(<em>n</em>) is a very slowly growing function, at most 4 in practice. Robert Tarjan proved this bound in 1975, and later work showed it can't be improved. In practice, each operation is constant time. Union-find is the heart of Kruskal's minimum-spanning-tree algorithm, which you'll meet in Algorithms I.</p>

<h3>Tries</h3>
<p>A <strong>trie</strong> (from "retrieval", usually pronounced "try") stores a set of strings as a tree of characters. Each edge is labeled with a character; each node represents the prefix spelled by the path from the root; and a node is marked if that prefix is itself a stored word.</p>
<figure class="fig"><svg viewBox="0 0 460 230" role="img" aria-label="A trie storing car, cat and do: from the root, c leads to a, which branches to r and t; d leads to o. Marked nodes end words.">
<g class="ln"><line x1="230" y1="30" x2="150" y2="80"/><line x1="230" y1="30" x2="330" y2="80"/><line x1="150" y1="80" x2="150" y2="130"/><line x1="150" y1="130" x2="100" y2="180"/><line x1="150" y1="130" x2="200" y2="180"/><line x1="330" y1="80" x2="330" y2="130"/></g>
<g class="box"><circle cx="230" cy="30" r="13"/><circle cx="150" cy="80" r="13"/><circle cx="330" cy="80" r="13"/><circle cx="150" cy="130" r="13"/><circle cx="100" cy="180" r="13"/><circle cx="200" cy="180" r="13"/><circle cx="330" cy="130" r="13"/></g>
<g class="hl"><circle cx="100" cy="180" r="13"/><circle cx="200" cy="180" r="13"/><circle cx="330" cy="130" r="13"/></g>
<g class="text"><text x="180" y="52" text-anchor="middle">c</text><text x="290" y="52" text-anchor="middle">d</text><text x="140" y="110" text-anchor="middle">a</text><text x="320" y="110" text-anchor="middle">o</text><text x="115" y="160" text-anchor="middle">r</text><text x="185" y="160" text-anchor="middle">t</text>
<text x="100" y="216" text-anchor="middle" class="code">"car"</text><text x="200" y="216" text-anchor="middle" class="code">"cat"</text><text x="330" y="166" text-anchor="middle" class="code">"do"</text></g>
</svg><figcaption>A trie holding "car", "cat" and "do". Words sharing a prefix share a path; highlighted nodes end a word.</figcaption></figure>
<pre><code>class Trie:
    def __init__(self):
        self.children = {}
        self.is_word = False

    def insert(self, word):
        node = self
        for ch in word:
            node = node.children.setdefault(ch, Trie())
        node.is_word = True

    def _walk(self, prefix):
        node = self
        for ch in prefix:
            node = node.children.get(ch)
            if node is None:
                return None
        return node

    def contains(self, word):
        node = self._walk(word)
        return node is not None and node.is_word

    def with_prefix(self, prefix):
        node, out = self._walk(prefix), []
        def collect(n, sofar):
            if n.is_word:
                out.append(sofar)
            for ch in sorted(n.children):
                collect(n.children[ch], sofar + ch)
        if node:
            collect(node, prefix)
        return out

t = Trie()
for w in ["car", "cat", "cart", "do", "dog"]:
    t.insert(w)
print(t.contains("ca"), t.contains("cat"), t.with_prefix("ca"))
# False True ['car', 'cart', 'cat']</code></pre>
<p>Insert and lookup cost O(<em>L</em>) for a word of length <em>L</em>, however many words are stored: the cost depends on the word, not the dictionary. A hash set is also O(<em>L</em>) expected per lookup (hashing reads the whole string), but a trie can do what a hash set can't: list every word with a given prefix in O(<em>L</em> + output size), and list words in alphabetical order. That's why tries power autocomplete, spell checkers and the routing tables in internet routers, which find the longest matching prefix of an address. Their cost is memory: one node per distinct prefix, each with its own small dict.</p>

<h3>Choosing a data structure</h3>
<p>To choose a structure, list the operations your program performs, estimate how often each runs, and pick the structure that makes the frequent ones cheap. Here is the course's toolbox in one table (<em>n</em> items; "exp." means expected, "am." amortized):</p>
<table>
<thead><tr><th>Structure</th><th>Search</th><th>Insert</th><th>Delete</th><th>Min / ordered ops</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Dynamic array (unsorted)</td><td>Θ(n)</td><td>Θ(1) am. at end</td><td>Θ(n)</td><td>Θ(n)</td><td>Fast indexing, compact</td></tr>
<tr><td>Sorted array</td><td>Θ(log n)</td><td>Θ(n)</td><td>Θ(n)</td><td>Θ(1) min; Θ(log n) successor</td><td>Great when data rarely changes</td></tr>
<tr><td>Linked list</td><td>Θ(n)</td><td>Θ(1) at a known node</td><td>Θ(1) at a known node</td><td>Θ(n)</td><td>Queues, splicing</td></tr>
<tr><td>Hash table</td><td>Θ(1) exp.</td><td>Θ(1) exp. am.</td><td>Θ(1) exp.</td><td>Θ(n)</td><td>The default for lookup by key</td></tr>
<tr><td>Balanced BST</td><td>Θ(log n)</td><td>Θ(log n)</td><td>Θ(log n)</td><td>Θ(log n)</td><td>Sorted order, ranges</td></tr>
<tr><td>Binary heap</td><td>Θ(n)</td><td>Θ(log n)</td><td>Θ(log n) min only</td><td>Θ(1) find-min</td><td>Priority queues</td></tr>
<tr><td>Union-find</td><td>find: nearly Θ(1) am.</td><td>union: nearly Θ(1) am.</td><td>not supported</td><td>not supported</td><td>Merging groups</td></tr>
<tr><td>Trie</td><td>Θ(L)</td><td>Θ(L)</td><td>Θ(L)</td><td>prefix queries</td><td>Strings, autocomplete</td></tr>
</tbody>
</table>
<p>Two final pieces of advice. First, constants matter for small <em>n</em>: for a few dozen items, a plain list often beats everything. Second, measure: if a program is slow, find out where the time goes (a profiler shows which functions take it) before redesigning anything. A good data structure in the wrong place won't help.</p>
`,
      terms: [
        ["Union-find", "A structure for disjoint sets supporting find (which set?) and union (merge two sets), in nearly constant amortized time."],
        ["Union by size", "Attaching the smaller tree under the larger root, keeping union-find trees shallow."],
        ["Path compression", "Making every node on a find path point directly to the root."],
        ["Inverse Ackermann function", "α(n), a function that grows so slowly it is at most 4 for any practical n."],
        ["Trie", "A tree of characters storing a set of strings, supporting lookups and prefix queries in time proportional to the string's length."]
      ],
      quiz: [
        { q: "What does find(x) == find(y) tell you in union-find?", choices: ["x equals y", "x and y are in the same set", "x is the parent of y", "The sets have equal size"], answer: 1, why: "find returns the set's representative, the same for every member." },
        { q: "Why does union by size keep trees shallow?", choices: ["It sorts the items", "A node gets deeper only when its tree at least doubles, so depth is at most log₂ n", "It rebuilds trees", "It uses a heap"], answer: 1, why: "Being attached under a larger tree at least doubles the size of your tree." },
        { q: "What is the cost of looking up a word of length L in a trie holding a million words?", choices: ["O(log n)", "O(L)", "O(n)", "O(L log n)"], answer: 1, why: "The search walks one node per character, regardless of how many words are stored." },
        { q: "Which task suits a trie better than a hash set?", choices: ["Checking whether a word is stored", "Listing all stored words that start with \"pre\"", "Counting the words", "Deleting a word"], answer: 1, why: "A hash set scatters words, so a prefix query would scan every word." },
        { q: "A program repeatedly adds tasks and removes the one with the earliest deadline. Which structure fits best?", choices: ["Sorted array", "Hash table", "Binary heap", "Trie"], answer: 2, why: "A heap gives O(log n) insert and extract-min." }
      ],
      practice: [
        {
          q: `<p>Start with items 1 to 8, each in its own set. Perform union(1, 2), union(3, 4), union(1, 3), union(5, 6), union(7, 8), union(5, 7), union(1, 5). Using union by size (ties: the first argument's root stays the root), draw the trees. How deep is the deepest item?</p>`,
          a: `<p>union(1, 2): 2 → 1. union(3, 4): 4 → 3. union(1, 3): sizes 2 and 2, so 3 → 1. Similarly 6 → 5, 8 → 7, 7 → 5. union(1, 5): sizes 4 and 4, so 5 → 1. Depths: 1 at 0; 2, 3, 5 at 1; 4, 6, 7 at 2; 8 at 3 = log₂ 8. Without path compression, find(8) takes 3 steps; with it, after one find, 8 points straight to 1.</p>`
        },
        {
          q: `<p>Use <code>UnionFind</code> to decide whether adding each edge of an undirected graph, in order, would create a cycle. Explain why <code>union</code> returning <code>False</code> means a cycle.</p>`,
          a: `<pre><code>def first_cycle_edge(vertices, edges):
    uf = UnionFind(vertices)
    for u, v in edges:
        if not uf.union(u, v):
            return (u, v)
    return None</code></pre><p><code>union</code> returns <code>False</code> when <em>u</em> and <em>v</em> are already in the same set, that is, already connected by a path. Adding the edge closes that path into a cycle.</p>`
        },
        {
          q: `<p>Draw the trie after inserting "to", "tea", "ted", "ten", "i", "in", "inn". How many nodes does it have, including the root? How many does a trie for "tea" alone have?</p>`,
          a: `<p>Root; t, to, te, tea, ted, ten; i, in, inn: 10 nodes. "tea" alone needs 4 (root, t, te, tea). The 7 words share prefixes, so they need far fewer nodes than their 17 total characters plus a root.</p>`
        },
        {
          q: `<p>For each program, name the data structure you'd choose and justify it by its operations: (a) a spell checker that also suggests completions; (b) a leaderboard showing the top 10 of a million scores, with scores changing constantly; (c) tracking which accounts are linked by shared payment cards, as links are discovered; (d) a phone's contacts, looked up by exact name.</p>`,
          a: `<p>(a) A trie: exact lookups and prefix listing. (b) A balanced BST keyed by score (or a heap if only the top is needed and updates can be handled lazily): updates in O(log <em>n</em>) and the top 10 by walking from the maximum. (c) Union-find: groups only merge, and "are these linked?" is find(x) == find(y). (d) A hash table: exact lookups in expected O(1); no order needed (sort only when displaying).</p>`
        }
      ],
      sources: ["clrs", "sedgewick", "odsds"]
    }
]);

CSA.addAsides("cs201", {
  ds1: [
    { kind: "history", title: "Knuth and the analysis of algorithms", html: `<p>Donald Knuth began <em>The Art of Computer Programming</em> in 1962 as a single book about compilers. It grew into a multi-volume work that founded the field he named "analysis of algorithms": counting exactly how many steps an algorithm takes, and on average how many. In 1976 he also argued for the precise use of O, Ω and Θ as defined in this lesson. The work is still in progress: Volume 4 is being published in parts.</p>` }
  ],
  ds3: [
    { kind: "history", title: "Hashing at IBM", html: `<p>Hashing was invented at IBM around 1953. Hans Peter Luhn wrote an internal memo describing buckets with chaining; around the same time, Gene Amdahl, Elaine McGraw and Arthur Samuel used linear probing in an assembler for the IBM 701. The term "hash" (to chop and mix) appeared in print in the 1960s. Luhn is also remembered for the Luhn checksum, still used to catch typos in credit card numbers.</p>` }
  ],
  ds6: [
    { kind: "history", title: "Quicksort's origin", html: `<p>Tony Hoare invented quicksort in 1959 as a visiting student in Moscow, while working on machine translation: he needed to sort the words of a Russian sentence before looking them up in a dictionary on magnetic tape. He couldn't express the algorithm clearly until he learned of recursion in the ALGOL 60 language, and published it in 1961. Hoare later received the Turing Award; in a 2009 talk he called his invention of the null reference in 1965 his "billion-dollar mistake".</p>` }
  ],
  ds7: [
    { kind: "history", title: "The bridges of Königsberg", html: `<p>Graph theory began in 1736 with a puzzle. The city of Königsberg had seven bridges joining two islands and the riverbanks: could you walk across each bridge exactly once? Leonhard Euler showed that you couldn't, by replacing the land masses with points and the bridges with lines and reasoning only about how many lines met at each point. A walk using every edge once needs every vertex, except possibly the start and end, to have an even degree; in Königsberg, all four land masses had odd degree.</p>` }
  ]
});
