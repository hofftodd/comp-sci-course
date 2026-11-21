CSA.addCourse({
  id: "cs370",
  code: "CS 370",
  title: "Introduction to AI and Machine Learning",
  credits: 4,
  kind: "required",
  term: "y3s",
  summary: "How programs act intelligently, first by searching and reasoning, then by learning from data: state-space search and A*, game playing with alpha-beta pruning, constraint satisfaction, probabilistic reasoning with naive Bayes and Bayesian networks, linear and logistic regression trained by gradient descent, k-nearest neighbours, decision trees, ensembles and k-means, how to evaluate a model honestly, neural networks and backpropagation built from a tiny automatic-differentiation engine, and language models from n-grams to attention and transformers, with their limits and risks. Everything is written from scratch in standard-library Python on small data sets, so that every number can be checked.",
  prereqs: ["CS 220 Algorithms I", "MATH 131 Calculus II and Multivariable Calculus", "MATH 220 Linear Algebra", "MATH 230 Probability and Statistics for Computer Science"],
  outcomes: [
    "Formulate a problem as a state space, and solve it with breadth-first, uniform-cost and A* search, proving when a heuristic makes A* optimal",
    "Compute minimax values with alpha-beta pruning, and solve constraint satisfaction problems with backtracking, forward checking and arc consistency",
    "Reason with conditional probability and independence, build naive Bayes classifiers, and answer queries in a Bayesian network by enumeration",
    "Fit linear models by gradient descent and by the normal equations, explaining the role of the learning rate and of feature scaling",
    "Train logistic regression and k-nearest-neighbour classifiers, and evaluate any classifier with held-out data, cross-validation, confusion matrices, precision and recall, taking base rates into account",
    "Build decision trees from information gain, explain why ensembles of trees help, and cluster data with k-means",
    "Explain how neural networks compute, derive backpropagation as the chain rule on a computation graph, and train a small network",
    "Explain n-gram models, embeddings, attention and how large language models are trained, and analyze their failures, biases and privacy risks"
  ],
  rubric: {
    criteriaFor: "the projects, the written problem sets and the exams",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 25, desc: "Weekly: the lesson's programming problems, plus written exercises such as tracing A* and alpha-beta, Bayes-net queries, gradient derivations and evaluation calculations." },
      { name: "Projects", weight: 30, desc: "Three projects in Python: a search-and-games agent (A* for a puzzle of your choice and an alpha-beta player for a small game, with measurements of nodes expanded); a classification study on a real public data set, comparing three models with honest cross-validation and a written analysis of errors by group; and a small neural network or character-level language model trained with your own autograd engine, with a report on what it learned and where it fails." },
      { name: "Midterm exam", weight: 15, desc: "Search, games, constraints and probabilistic reasoning (lessons 1–3), and linear regression (lesson 4)." },
      { name: "Final exam", weight: 20, desc: "Cumulative, with emphasis on classification, evaluation, trees, clustering, neural networks and language models (lessons 5–8)." }
    ],
    criteria: [
      { name: "Correctness", desc: "Do the algorithms and calculations give the right answers?", levels: [
        "Correct on every case, including ties, empty inputs and numerical edge cases, with tests or hand calculations that show it.",
        "Correct on the main cases, with an occasional edge case wrong.",
        "Right in idea but often wrong in detail, such as an off-by-one in a gradient or a leaked test set.",
        "Mostly incorrect." ] },
      { name: "Experimental method", desc: "Are results measured honestly?", levels: [
        "Data is split before any fitting; hyperparameters are chosen on validation data only; results include a baseline, the base rate and the spread across folds.",
        "Sound method with a small lapse, such as a missing baseline.",
        "Results are reported on training data, or the test set guided choices.",
        "No real evaluation." ] },
      { name: "Analysis", desc: "Are claims explained and justified?", levels: [
        "Explains why a method works or fails, with numbers, plots or proofs, and names its limits and who could be harmed by its errors.",
        "Mostly sound reasoning, with gaps.",
        "Claims without evidence.",
        "No analysis." ] },
      { name: "Presentation", desc: "Can a reader follow it?", levels: [
        "Readable code and a clear write-up with tables or plots where they help.",
        "Mostly clear.",
        "Hard to follow.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Tools:</b> the lessons and graded problems use only Python's standard library, which runs in this page, so that nothing is hidden inside a library call. For the projects you may also use NumPy and, once you have written your own versions, scikit-learn or PyTorch; the report must say which.",
      "<b>Collaboration:</b> discuss ideas freely; write your own code and name your collaborators.",
      "<b>AI assistants:</b> you may use them to explain concepts and error messages, and must say how. Code you submit must be your own, and you must be able to explain every line. Lesson 8 explains why their answers need checking.",
      "<b>Data:</b> project data sets must be public or your own, and must not contain personal information that their subjects didn't agree to share for this use.",
      "<b>Late work:</b> four late days for projects, used in whole days; then 10% a day."
    ]
  },
  units: [
    {
      id: "ml1",
      title: "Search: state spaces, uniform cost and A*",
      minutes: 90,
      summary: "What this course means by artificial intelligence; problems as state spaces; breadth-first and uniform-cost search recalled from CS 201 and CS 220; best-first search; A* with admissible and consistent heuristics, and a proof that A* finds a cheapest path; designing heuristics by relaxing a problem.",
      notes: `
<p>Artificial intelligence (AI) is the study of programs that act well in situations their programmers didn't spell out in advance: they choose a route, a move, a diagnosis or a word. This course covers the two big ideas behind such programs. Lessons 1–3 build programs that <em>search and reason</em>: they are given a model of the world (a map, the rules of a game, a table of probabilities) and compute a good action from it. Lessons 4–8 build programs that <em>learn</em>: they are given examples and fit a model to them. Modern systems combine both. A chess program searches a game tree but evaluates positions with a learned function; a language model is learned, and is then used inside search loops that try several continuations.</p>
<p>Everything is written from scratch in standard-library Python on small inputs, so that you can check every number.</p>

<h3>Problems as state spaces</h3>
<p>Many problems become the same problem once described the right way. A <strong>search problem</strong> has:</p>
<ul>
<li>a set of <strong>states</strong>, each a complete description of a situation;</li>
<li>an <strong>initial state</strong>;</li>
<li>for each state, the <strong>actions</strong> available and the state each one leads to (the <em>transition model</em>);</li>
<li>a <strong>goal test</strong>, which says whether a state is a goal;</li>
<li>a <strong>step cost</strong> for each action, a number ≥ 0.</li>
</ul>
<p>A <strong>solution</strong> is a sequence of actions from the initial state to a goal; an <strong>optimal</strong> solution is one with the least total cost. The states and actions form a directed graph, the <strong>state space</strong>, so a search problem is a shortest-path problem, and everything from CS 220 Lesson 5 applies. What is new is that the graph is usually too big to write down. It is generated as the search goes, by applying actions.</p>
<p>Two examples run through this lesson. In <em>route finding</em>, the states are places, the actions are roads and the costs are distances. In the <strong>8-puzzle</strong>, eight numbered tiles sit in a 3 × 3 frame with one empty square; an action slides a tile next to the empty square into it, at cost 1; the goal is the tiles in order. A state is an arrangement of the tiles. There are 9! = 362,880 arrangements, but only half of them can be reached from any given one (this lesson's second programming problem shows how to tell which half), so the state space has 181,440 states. The 15-puzzle (4 × 4) has about 10<sup>13</sup>, and chess about 10<sup>44</sup> legal positions: no program lists them all.</p>
<p>Choosing what a state contains is the first design decision. A route-finding state needs the current place, not the path taken to get there; a delivery-robot state needs its place and which parcels it still carries. Leaving out irrelevant detail (the weather, the colour of the tiles) is called <em>abstraction</em>, and it is what makes search possible at all.</p>

<h3>Searching: the frontier</h3>
<p>Every search algorithm in this lesson keeps a <strong>frontier</strong>: states that have been reached but not yet <strong>expanded</strong> (expanding a state means generating its successors by applying every action). It repeatedly removes one state from the frontier, stops if it is a goal, and otherwise expands it and adds the new states to the frontier. Algorithms differ only in <em>which</em> state they remove next. They also keep a record of the states already reached, so that a state reachable by many paths (in the 8-puzzle, sliding a tile and sliding it back) isn't explored again and again.</p>
<p>The two algorithms you already know are both of this form:</p>
<ul>
<li><strong>Breadth-first search</strong> (BFS, CS 201 Lesson 7) uses a queue, so it expands states in order of the number of actions from the start. It finds a solution with the fewest actions, which is optimal when every step costs the same.</li>
<li><strong>Uniform-cost search</strong> is Dijkstra's algorithm (CS 220 Lesson 5) with a goal test: a priority queue ordered by <em>g</em>(<em>n</em>), the cost of the cheapest path found so far from the start to <em>n</em>. It finds an optimal solution whenever step costs are ≥ 0.</li>
</ul>
<p>One detail matters: the goal test is applied when a state is <em>removed</em> from the frontier, not when it is added. If the start has an edge of cost 10 straight to the goal and a path of four edges of cost 1, the goal is <em>added</em> first, with cost 10, but the cheaper path is found before the goal is <em>removed</em>, because the priority queue removes cheaper entries first. Testing on removal is what makes Dijkstra's correctness proof apply.</p>
<p>Depth-first search uses a stack instead. It needs little memory (only the current path and its siblings) but finds whatever solution it meets first, which can be far from optimal. <em>Iterative deepening</em> runs depth-first search with a depth limit of 0, 1, 2, …, and so finds a fewest-actions solution like BFS while using memory proportional to the depth, like DFS; repeating the shallow levels costs little, because in a tree most nodes are at the deepest level.</p>
<p>All of these are <strong>uninformed</strong>: they know nothing about where the goal is. Uniform-cost search spreads out in all directions like a ripple. To solve the 17-move 8-puzzle used below it expands 14,125 states.</p>

<h3>Best-first search</h3>
<p>An informed search uses a <strong>heuristic</strong> <em>h</em>(<em>n</em>): an estimate of the cost of the cheapest path from <em>n</em> to a goal, computed from the state alone. For route finding, the straight-line distance to the destination is a good one. <strong>Best-first search</strong> orders the frontier by some evaluation function <em>f</em>(<em>n</em>), and three choices of <em>f</em> give three algorithms:</p>
<table>
<tr><th>Algorithm</th><th><em>f</em>(<em>n</em>)</th><th>Finds a cheapest path?</th></tr>
<tr><td>Uniform-cost search</td><td><em>g</em>(<em>n</em>)</td><td>Yes</td></tr>
<tr><td>Greedy best-first search</td><td><em>h</em>(<em>n</em>)</td><td>No</td></tr>
<tr><td>A* search</td><td><em>g</em>(<em>n</em>) + <em>h</em>(<em>n</em>)</td><td>Yes, if <em>h</em> is consistent (below)</td></tr>
</table>
<p>A*'s <em>f</em>(<em>n</em>) = <em>g</em>(<em>n</em>) + <em>h</em>(<em>n</em>) estimates the cost of the cheapest solution that passes through <em>n</em>: the cost so far plus the estimated cost still to go. Here is the small graph used to compare them.</p>
<figure class="fig"><svg viewBox="0 0 440 230" width="440" role="img" aria-label="A directed graph. S to A costs 2, S to B 3, A to C 4, B to C 2, B to D 5, C to G 3, D to G 2. Heuristic values: S 6, A 7, B 4, C 3, D 2, G 0.">
<defs><marker id="arml1" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
<g class="ln" marker-end="url(#arml1)">
<line x1="58" y1="108" x2="132" y2="58"/><line x1="58" y1="126" x2="132" y2="168"/>
<line x1="168" y1="52" x2="252" y2="100"/><line x1="170" y1="168" x2="252" y2="122"/>
<line x1="170" y1="180" x2="252" y2="196"/><line x1="290" y1="114" x2="372" y2="134"/><line x1="290" y1="196" x2="372" y2="152"/></g>
<g class="box"><circle cx="40" cy="117" r="18"/><circle cx="150" cy="45" r="18"/><circle cx="150" cy="175" r="18"/><circle cx="270" cy="110" r="18"/><circle cx="270" cy="200" r="18"/><circle cx="390" cy="140" r="18"/></g>
<g class="text"><text x="40" y="122" text-anchor="middle">S</text><text x="150" y="50" text-anchor="middle">A</text><text x="150" y="180" text-anchor="middle">B</text><text x="270" y="115" text-anchor="middle">C</text><text x="270" y="205" text-anchor="middle">D</text><text x="390" y="145" text-anchor="middle">G</text>
<text x="85" y="75">2</text><text x="85" y="160">3</text><text x="215" y="65">4</text><text x="205" y="132">2</text><text x="210" y="205">5</text><text x="330" y="115">3</text><text x="335" y="190">2</text>
<text x="40" y="150" class="m" text-anchor="middle">h = 6</text><text x="150" y="15" class="m" text-anchor="middle">h = 7</text><text x="150" y="215" class="m" text-anchor="middle">h = 4</text><text x="270" y="82" class="m" text-anchor="middle">h = 3</text><text x="315" y="225" class="m" text-anchor="middle">h = 2</text><text x="390" y="175" class="m" text-anchor="middle">h = 0</text></g>
</svg><figcaption>A search problem from S to G. Numbers on the arrows are step costs; <em>h</em> beside each state is its heuristic value. The cheapest path is S → B → C → G, cost 8.</figcaption></figure>
<p>The code is uniform-cost search with the priority replaced by a function <code>f(g, node)</code>. As in CS 220's Dijkstra, the heap may hold outdated entries for a node; they are skipped when popped.</p>
<pre><code>import heapq

def best_first(graph, start, goal, f):
    """graph: dict node -> list of (neighbor, cost). f(g, node) gives the priority."""
    frontier = [(f(0, start), 0, start)]
    best_g = {start: 0}
    parent = {start: None}
    expanded = []
    while frontier:
        _, g, node = heapq.heappop(frontier)
        if g > best_g[node]:
            continue                     # outdated: a cheaper path to node was found later
        if node == goal:
            path = []
            while node is not None:
                path.append(node)
                node = parent[node]
            return g, path[::-1], expanded
        expanded.append(node)
        for nbr, cost in graph.get(node, []):
            g2 = g + cost
            if nbr not in best_g or g2 &lt; best_g[nbr]:
                best_g[nbr] = g2
                parent[nbr] = node
                heapq.heappush(frontier, (f(g2, nbr), g2, nbr))
    return None

graph = {"S": [("A", 2), ("B", 3)], "A": [("C", 4)], "B": [("C", 2), ("D", 5)],
         "C": [("G", 3)], "D": [("G", 2)]}
h = {"S": 6, "A": 7, "B": 4, "C": 3, "D": 2, "G": 0}
print(best_first(graph, "S", "G", lambda g, n: g))          # (8, ['S', 'B', 'C', 'G'], ['S', 'A', 'B', 'C', 'D'])
print(best_first(graph, "S", "G", lambda g, n: h[n]))       # (10, ['S', 'B', 'D', 'G'], ['S', 'B', 'D'])
print(best_first(graph, "S", "G", lambda g, n: g + h[n]))   # (8, ['S', 'B', 'C', 'G'], ['S', 'B', 'C'])</code></pre>
<p>Each result is (cost, path, states expanded in order). Heap entries are tuples <code>(f, g, node)</code>, so ties in <em>f</em> are broken by <em>g</em> and then by the node's name. Uniform-cost search is correct but expands every state that is cheaper to reach than the goal, including A and D, which lead nowhere useful. Greedy search rushes toward whatever looks closest: from B it prefers D (<em>h</em> = 2) to C (<em>h</em> = 3), and returns a path of cost 10. A* is correct and expands only S, B and C. Here is its trace:</p>
<table>
<tr><th>Pop</th><th>Push (<em>g</em> + <em>h</em> = <em>f</em>)</th><th>Frontier after</th></tr>
<tr><td>S (<em>f</em> = 6)</td><td>A: 2 + 7 = 9; B: 3 + 4 = 7</td><td>B 7, A 9</td></tr>
<tr><td>B (7)</td><td>C: 5 + 3 = 8; D: 8 + 2 = 10</td><td>C 8, A 9, D 10</td></tr>
<tr><td>C (8)</td><td>G: 8 + 0 = 8</td><td>G 8, A 9, D 10</td></tr>
<tr><td>G (8)</td><td colspan="2">goal: return S → B → C → G, cost 8</td></tr>
</table>

<h3>Admissible and consistent heuristics</h3>
<p>Let <em>h</em>*(<em>n</em>) be the true cost of a cheapest path from <em>n</em> to a goal. Two properties of a heuristic matter.</p>
<ul>
<li><em>h</em> is <strong>admissible</strong> if it never overestimates: <em>h</em>(<em>n</em>) ≤ <em>h</em>*(<em>n</em>) for every <em>n</em>. Straight-line distance is admissible for road distance, because no road is shorter than a straight line.</li>
<li><em>h</em> is <strong>consistent</strong> if <em>h</em>(goal) = 0 for every goal and, for every action from <em>n</em> to <em>n</em>′ with cost <em>c</em>, <em>h</em>(<em>n</em>) ≤ <em>c</em> + <em>h</em>(<em>n</em>′). This is a triangle inequality: the estimate from <em>n</em> can't exceed the cost of one step plus the estimate from where that step leads.</li>
</ul>
<p>In the example, check every edge: S→A: 6 ≤ 2 + 7; S→B: 6 ≤ 3 + 4; A→C: 7 ≤ 4 + 3; B→C: 4 ≤ 2 + 3; B→D: 4 ≤ 5 + 2; C→G: 3 ≤ 3 + 0; D→G: 2 ≤ 2 + 0. All hold, so <em>h</em> is consistent.</p>
<p><strong>Consistent implies admissible.</strong> By induction on <em>k</em>, the number of actions on a cheapest path from <em>n</em> to a goal. If <em>k</em> = 0, <em>n</em> is a goal and <em>h</em>(<em>n</em>) = 0 = <em>h</em>*(<em>n</em>). Otherwise the cheapest path starts with a step of cost <em>c</em> to some <em>n</em>′ and continues along a cheapest path from <em>n</em>′ with <em>k</em> − 1 actions, so <em>h</em>*(<em>n</em>) = <em>c</em> + <em>h</em>*(<em>n</em>′). By consistency and the induction hypothesis, <em>h</em>(<em>n</em>) ≤ <em>c</em> + <em>h</em>(<em>n</em>′) ≤ <em>c</em> + <em>h</em>*(<em>n</em>′) = <em>h</em>*(<em>n</em>). (The converse fails: a heuristic can be admissible without being consistent, but the heuristics people design in practice are usually both.)</p>

<h3>Why A* is optimal</h3>
<p><strong>Theorem.</strong> If step costs are ≥ 0 and <em>h</em> is consistent, the A* search above returns a cheapest path to a goal.</p>
<p>Write <em>g</em>*(<em>n</em>) for the cost of a cheapest path from the start to <em>n</em>. The proof has three steps.</p>
<ol>
<li><em>f never decreases along a path.</em> If an action of cost <em>c</em> leads from <em>n</em> to <em>n</em>′ and <em>n</em>′ is reached through <em>n</em>, then <em>g</em>(<em>n</em>′) = <em>g</em>(<em>n</em>) + <em>c</em>, so <em>f</em>(<em>n</em>′) = <em>g</em>(<em>n</em>) + <em>c</em> + <em>h</em>(<em>n</em>′) ≥ <em>g</em>(<em>n</em>) + <em>h</em>(<em>n</em>) = <em>f</em>(<em>n</em>), using consistency.</li>
<li><em>When a node n is popped and not skipped, g(n) = g*(n).</em> Suppose instead that <em>n</em> is popped with <em>g</em>(<em>n</em>) &gt; <em>g</em>*(<em>n</em>). Take a cheapest path <em>s</em> = <em>p</em><sub>0</sub>, <em>p</em><sub>1</sub>, …, <em>p<sub>k</sub></em> = <em>n</em> from the start. The start was expanded with its correct cost 0. Let <em>p<sub>j</sub></em> be the last node on the path that has been expanded with its correct cost <em>g</em>*(<em>p<sub>j</sub></em>); then <em>j</em> &lt; <em>k</em>. When <em>p<sub>j</sub></em> was expanded, <em>p</em><sub><em>j</em>+1</sub> was given cost <em>g</em>*(<em>p</em><sub><em>j</em>+1</sub>) (no path to it is cheaper, since a prefix of a cheapest path is a cheapest path), so the heap holds an entry for it with priority <em>g</em>*(<em>p</em><sub><em>j</em>+1</sub>) + <em>h</em>(<em>p</em><sub><em>j</em>+1</sub>). By step 1 applied along the rest of the path, this is ≤ <em>g</em>*(<em>n</em>) + <em>h</em>(<em>n</em>), which is &lt; <em>g</em>(<em>n</em>) + <em>h</em>(<em>n</em>), the priority of the entry being popped. A heap pops the smallest priority first, so that entry for <em>p</em><sub><em>j</em>+1</sub> would have been popped earlier, and <em>p</em><sub><em>j</em>+1</sub> expanded with its correct cost, contradicting the choice of <em>j</em>.</li>
<li><em>The first goal popped is optimal.</em> By step 2, a goal <em>t</em> is popped with <em>g</em>(<em>t</em>) = <em>g</em>*(<em>t</em>). Any other goal <em>t</em>′ still in the heap has, by the same argument, an entry on its cheapest path with priority ≤ <em>g</em>*(<em>t</em>′) + 0, and that entry wasn't popped first, so <em>g</em>*(<em>t</em>) = <em>f</em>(<em>t</em>) ≤ <em>g</em>*(<em>t</em>′).</li>
</ol>
<p>With <em>h</em> = 0 (always consistent), this is the proof that uniform-cost search is correct. The argument also shows <em>which</em> states A* expands: f-values of popped nodes never decrease, so A* expands every state with <em>f</em> below the optimal cost <em>C</em>* and none with <em>f</em> above it. States with <em>f</em> exactly <em>C</em>* are in between: A* expands those it pops before the goal, and which ones those are depends on how ties in <em>f</em> are broken. The code above breaks them by smaller <em>g</em>, so among the states with <em>f</em> = <em>C</em>*, those nearest the start come out first and the goal, whose <em>g</em> is the largest, comes out last; breaking ties by <em>larger</em> <em>g</em> would favour states near the goal instead. A larger consistent <em>h</em> pushes more states above <em>C</em>*, so it expands fewer. That is the whole art of A*: find a heuristic as large as possible without overestimating. (With an admissible but inconsistent heuristic, A* graph search is still optimal if it may re-expand a node when it finds a cheaper path to it, as the code above does; the proof is longer.)</p>

<h3>Designing heuristics</h3>
<p>Two admissible heuristics for the 8-puzzle:</p>
<ul>
<li><em>h</em><sub>1</sub> = the number of misplaced tiles (not counting the blank). Each misplaced tile needs at least one move.</li>
<li><em>h</em><sub>2</sub> = the sum, over tiles, of each tile's <strong>Manhattan distance</strong> from its goal square: rows apart plus columns apart. A move shifts one tile by one square, so it reduces <em>h</em><sub>2</sub> by at most 1.</li>
</ul>
<p>Both come from <strong>relaxed problems</strong>, versions of the puzzle with rules removed. If a tile could jump anywhere, <em>h</em><sub>1</sub> would be the exact solution cost; if tiles could slide through each other, <em>h</em><sub>2</sub> would be. A relaxed problem has every solution of the real one and more, so its optimal cost can't be larger: its exact cost is an admissible heuristic for the real problem (and, as here, a consistent one). Since <em>h</em><sub>2</sub>(<em>n</em>) ≥ <em>h</em><sub>1</sub>(<em>n</em>) for every state (each misplaced tile is at least 1 square away), <em>h</em><sub>2</sub> <strong>dominates</strong> <em>h</em><sub>1</sub>, and by the argument above A* with <em>h</em><sub>2</sub> expands no more states (apart from ties at <em>f</em> = <em>C</em>*). The difference is large. For the puzzle with rows 4 1 2 / _ 8 7 / 6 3 5, whose solution takes 17 moves:</p>
<table>
<tr><th>Search</th><th>States expanded</th></tr>
<tr><td>Uniform cost (<em>h</em> = 0)</td><td>14,125</td></tr>
<tr><td>A* with misplaced tiles</td><td>883</td></tr>
<tr><td>A* with Manhattan distance</td><td>113</td></tr>
</table>
<p>For the hardest 8-puzzles, which take 31 moves, uniform-cost search expands 181,438 of the 181,440 reachable states and Manhattan-distance A* about 21,000. For the 15-puzzle, Manhattan distance alone isn't enough, and the best solvers use <em>pattern databases</em>: the exact costs of relaxed puzzles in which only some tiles are numbered, computed once by search and stored.</p>
<p>A grid shows the same effect. Below, a robot moves up, down, left or right at cost 1 around a wall, and the heuristic is the Manhattan distance to the goal, which is consistent because one move changes it by exactly 1.</p>
<pre><code>rows = ["..........",
        "..........",
        "..........",
        "....#.....",
        "....#.....",
        "....#.....",
        "....#.....",
        "..........",
        "..........",
        ".........."]

def grid_graph(rows):
    g = {}
    for r, line in enumerate(rows):
        for c, ch in enumerate(line):
            if ch != "#":
                g[(r, c)] = [((r + dr, c + dc), 1) for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1))
                             if 0 &lt;= r + dr &lt; len(rows) and 0 &lt;= c + dc &lt; len(line)
                             and rows[r + dr][c + dc] != "#"]
    return g

grid = grid_graph(rows)
start, goal = (5, 1), (5, 8)
ucs = best_first(grid, start, goal, lambda g, n: g)
astar = best_first(grid, start, goal, lambda g, n: g + abs(n[0] - goal[0]) + abs(n[1] - goal[1]))
print(ucs[0], len(ucs[2]))       # 11 84
print(astar[0], len(astar[2]))   # 11 30</code></pre>
<p>Both find the 11-step path around the wall; uniform-cost search expands 84 of the 96 open squares, A* 30. A* has one serious weakness: it keeps every reached state in memory, which on large problems runs out long before time does. Variants such as IDA* (iterative deepening on <em>f</em>) trade time for memory, and <em>weighted A*</em>, with <em>f</em> = <em>g</em> + <em>wh</em> for some <em>w</em> &gt; 1, gives up guaranteed optimality (its paths cost at most <em>w</em> times the optimum) to expand far fewer states.</p>
`,
      terms: [
        ["Search problem", "States, an initial state, actions with their results, a goal test and step costs."],
        ["State space", "The graph whose vertices are states and whose edges are actions."],
        ["Frontier", "The states reached but not yet expanded."],
        ["Expand", "To generate a state's successors by applying every available action."],
        ["Uniform-cost search", "Best-first search on g(n), the cost so far: Dijkstra's algorithm with a goal test."],
        ["Heuristic", "An estimate h(n) of the cost of a cheapest path from n to a goal."],
        ["Greedy best-first search", "Best-first search on h(n) alone; fast but not optimal."],
        ["A* search", "Best-first search on f(n) = g(n) + h(n); optimal with a consistent heuristic."],
        ["Admissible heuristic", "One that never overestimates: h(n) ≤ h*(n)."],
        ["Consistent heuristic", "One with h(goal) = 0 and h(n) ≤ c + h(n′) for every action from n to n′ of cost c."],
        ["Relaxed problem", "A version of a problem with constraints removed; its exact cost is an admissible heuristic."],
        ["Dominance", "h2 dominates h1 if h2(n) ≥ h1(n) for every n; A* with a dominating consistent heuristic expands no more states."]
      ],
      quiz: [
        { q: "Uniform-cost search orders its frontier by:", choices: ["The number of actions from the start", "g(n), the cost of the path so far", "h(n), the estimated cost to the goal", "g(n) + h(n)"], answer: 1, why: "It is Dijkstra's algorithm: cheapest path cost so far first." },
        { q: "Why does A* test for the goal when a state is popped, not when it is pushed?", choices: ["Pushing is slower", "A cheaper path to the goal may still be found before the goal reaches the front of the queue", "The heuristic is only defined for popped states", "It makes no difference"], answer: 1, why: "The first path found to the goal isn't necessarily the cheapest; the first one popped is." },
        { q: "A heuristic has h(n) = 5 and an action from n to n′ costs 2, with h(n′) = 2. Which property does this violate?", choices: ["Admissibility", "Consistency", "Dominance", "None"], answer: 1, why: "Consistency needs h(n) ≤ c + h(n′), but 5 > 2 + 2 = 4. (Admissibility depends on true costs, which the question doesn't give.)" },
        { q: "Greedy best-first search, which orders by h(n) alone, is:", choices: ["Always optimal", "Optimal only with an admissible heuristic", "Not guaranteed to find a cheapest path, even with a consistent heuristic", "The same as BFS"], answer: 2, why: "It ignores the cost already paid: in the notes' graph it returns a path of cost 10 instead of 8." },
        { q: "Why is the Manhattan distance admissible for the 8-puzzle?", choices: ["It counts misplaced tiles", "Each move moves one tile one square, so each tile needs at least its Manhattan distance in moves", "It is the exact solution cost", "Because the puzzle has 181,440 states"], answer: 1, why: "It is the exact cost of a relaxed puzzle in which tiles may slide through each other." },
        { q: "Heuristics h1 and h2 are both consistent and h2(n) ≥ h1(n) everywhere. Which is better for A*?", choices: ["h1, because it is smaller", "h2: A* expands no more states with it", "Neither: they expand the same states", "It depends only on the step costs"], answer: 1, why: "A* expands the states with f below the optimal cost; larger h makes fewer f-values fall below it." }
      ],
      practice: [
        {
          q: `<p>Run A* by hand from S to G on the directed graph with edges S→A 1, S→B 4, A→B 2, A→C 5, B→C 1, C→G 3, using h(S) = 6, h(A) = 5, h(B) = 3, h(C) = 3, h(G) = 0. Give the order states are popped, with their <em>f</em>-values, and the path returned. Is <em>h</em> consistent?</p>`,
          hint: `<p>Keep a table of the frontier after each pop, as in the notes. B is pushed twice.</p>`,
          a: `<p>Pop S (<em>f</em> = 6): push A (1 + 5 = 6), B (4 + 3 = 7). Pop A (6): push B with the cheaper <em>g</em> = 3 (<em>f</em> = 6) and C (6 + 3 = 9). Pop B (6, <em>g</em> 3): push C with <em>g</em> = 4 (<em>f</em> = 7). Pop C (7): push G (7 + 0 = 7). Pop G (7): done. The old entry B (7) is popped next, before G, because ties in <em>f</em> go to the smaller <em>g</em>; it is skipped as outdated (B's best <em>g</em> is now 3). The entry C (9) is never reached. Path S → A → B → C → G, cost 7. Consistency: S→A 6 ≤ 1 + 5; S→B 6 ≤ 4 + 3; A→B 5 ≤ 2 + 3; A→C 5 ≤ 5 + 3; B→C 3 ≤ 1 + 3; C→G 3 ≤ 3 + 0. All hold, so yes. Check with the notes' code:</p>
<pre><code>g2 = {"S": [("A", 1), ("B", 4)], "A": [("B", 2), ("C", 5)], "B": [("C", 1)], "C": [("G", 3)]}
h2 = {"S": 6, "A": 5, "B": 3, "C": 3, "G": 0}
print(best_first(g2, "S", "G", lambda g, n: g + h2[n]))   # (7, ['S', 'A', 'B', 'C', 'G'], ['S', 'A', 'B', 'C'])</code></pre>`
        },
        {
          q: `<p>Formulate as a search problem: three missionaries and three cannibals must cross a river in a boat that holds one or two people. On neither bank may cannibals ever outnumber missionaries who are present there. Give the state, the actions, the goal test and the size of the state space. Which uninformed algorithm would you use, and why?</p>`,
          a: `<p>State: (missionaries on the start bank, cannibals on the start bank, which bank the boat is on): the other bank's counts follow, and nothing else matters. That gives at most 4 × 4 × 2 = 32 states, fewer once unsafe ones are removed. Actions: move 1 or 2 people, in one of the combinations MM, MC, CC, M, C, from the boat's bank to the other, allowed only if the counts are available and both banks are safe afterwards. Initial state (3, 3, start); goal (0, 0, other). Every crossing costs 1, so BFS finds a solution with the fewest crossings (it is 11). With 32 states any algorithm is instant; the work is in choosing the state well.</p>`
        },
        {
          q: `<p>Show that if <em>h</em><sub>1</sub> and <em>h</em><sub>2</sub> are both admissible, so is <em>h</em>(<em>n</em>) = max(<em>h</em><sub>1</sub>(<em>n</em>), <em>h</em><sub>2</sub>(<em>n</em>)). Is the same true for consistency? Why would you use the maximum rather than either one?</p>`,
          a: `<p>Admissible: each of <em>h</em><sub>1</sub>(<em>n</em>) and <em>h</em><sub>2</sub>(<em>n</em>) is ≤ <em>h</em>*(<em>n</em>), so the larger one is too. Consistent: for an action from <em>n</em> to <em>n</em>′ of cost <em>c</em>, <em>h<sub>i</sub></em>(<em>n</em>) ≤ <em>c</em> + <em>h<sub>i</sub></em>(<em>n</em>′) ≤ <em>c</em> + max(<em>h</em><sub>1</sub>(<em>n</em>′), <em>h</em><sub>2</sub>(<em>n</em>′)) for <em>i</em> = 1, 2, so the max of the left sides is also ≤ that bound; and the max is 0 at a goal. So yes. The max dominates both, so A* expands no more states with it than with either, at the cost of computing both.</p>`
        },
        {
          q: `<p>In the grid example, A* expanded 30 states and uniform-cost search 84. Estimate how the two numbers grow on an open <em>n</em> × <em>n</em> grid with no walls, from one corner to the opposite corner, with the Manhattan heuristic and the notes' code. (Think about which states have <em>f</em> = <em>C</em>*, and in what order the code pops them.) How would A*'s number change if ties in <em>f</em> went to the larger <em>g</em>?</p>`,
          hint: `<p>On an open grid, is the Manhattan distance ever wrong?</p>`,
          a: `<p>With no walls, Manhattan distance is exact: <em>h</em> = <em>h</em>*. Then <em>f</em>(<em>n</em>) = <em>g</em> + <em>h</em>* = <em>C</em>* for every state on some shortest path, and every state in the rectangle between the corners is on one. Uniform-cost search expands every state closer than the goal, which here is essentially the whole grid, about <em>n</em><sup>2</sup> states. A* expands only states with <em>f</em> = <em>C</em>* = 2(<em>n</em> − 1), so how many it expands depends entirely on tie-breaking. Breaking ties in favour of larger <em>g</em> (deeper states), as many implementations do, heads straight for the goal: for <em>n</em> = 20 it expands 38 states, that is 2(<em>n</em> − 1). The notes' code breaks ties in favour of <em>smaller</em> <em>g</em>, and on this grid expands 399 of the 400 states, no better than uniform-cost search. So a perfect heuristic turns <em>n</em><sup>2</sup> into 2(<em>n</em> − 1) only if ties are broken toward depth.</p>`
        }
      ],
      sources: ["aima", "cs188", "hart68", "clrs"]
    },
    {
      id: "ml2",
      title: "Games and constraint satisfaction",
      minutes: 90,
      summary: "Two-player games as search: game trees, minimax, and alpha-beta pruning traced on a small tree; depth limits and evaluation functions. Constraint satisfaction problems: variables, domains and constraints; backtracking search with the minimum-remaining-values heuristic and forward checking; arc consistency with AC-3, on the map of Australia.",
      notes: `
<p>Lesson 1's searches had the world to themselves. This lesson covers two variations. In a <em>game</em> an opponent chooses every other move, so a plan must work whatever they do. In a <em>constraint satisfaction problem</em> the path doesn't matter at all, only the final state, and knowing the structure of the constraints lets the search cut away most of the space before it gets there.</p>

<h3>Games as search</h3>
<p>We consider games like tic-tac-toe, checkers and chess: two players, MAX and MIN, take turns; both see the whole position (<em>perfect information</em>); there is no chance; and the game is <strong>zero-sum</strong>: one player's gain is the other's loss, so a single number, the <strong>utility</strong> of a finished game for MAX, describes the outcome (say +1 for a MAX win, 0 for a draw, −1 for a loss). MAX wants it high, MIN wants it low. A <strong>game tree</strong> has positions as nodes and moves as edges; its leaves are <em>terminal</em> positions, where the game is over.</p>
<p>Game trees are huge. Tic-tac-toe's has 549,946 nodes (the code below counts them). Checkers has about 5 × 10<sup>20</sup> legal positions, and chess's game tree has around 10<sup>120</sup> nodes by Claude Shannon's 1950 estimate, so for real games the tree is never built in full.</p>

<h3>Minimax</h3>
<p>Suppose both players play perfectly. The <strong>minimax value</strong> of a position is the utility that results:</p>
<ul>
<li>at a terminal position, its utility;</li>
<li>at a position where MAX moves, the <em>largest</em> value of its children;</li>
<li>at a position where MIN moves, the <em>smallest</em>.</li>
</ul>
<p>The best move for MAX leads to the child with the largest value. Below, a game tree is written as nested lists: a number is a terminal position, and a list holds a position's children. The root is a MAX position, and the levels alternate.</p>
<pre><code>import math

def minimax(node, maximizing):
    if not isinstance(node, list):
        return node                       # a terminal position: its utility
    values = [minimax(child, not maximizing) for child in node]
    return max(values) if maximizing else min(values)

tree = [[3, 12, 8], [2, 4, 6], [14, 5, 2]]
print(minimax(tree, True))   # 3</code></pre>
<p>MAX has three moves. After each, MIN picks the smallest leaf: 3, 2 and 2. MAX takes the first move, worth 3. Minimax visits the whole tree: with <em>b</em> moves per position and depth <em>d</em>, that is about <em>b<sup>d</sup></em> leaves, the same cost as depth-first search.</p>

<h3>Alpha-beta pruning</h3>
<p>Look at the middle move again. Its first leaf is 2, so MIN, choosing there, can hold MAX to <em>at most</em> 2. MAX already has a move worth 3. Whatever the other two leaves are, MAX won't choose the middle move, so there is no need to look at them. <strong>Alpha-beta pruning</strong> makes this idea systematic. While searching, it keeps two numbers for the current path:</p>
<ul>
<li>α, the best value MAX is already guaranteed somewhere along the path (initially −∞);</li>
<li>β, the best value MIN is already guaranteed somewhere along the path (initially +∞).</li>
</ul>
<p>A node's value matters only if it lies strictly between α and β. As soon as a MIN node's value falls to α or below, or a MAX node's value rises to β or above, the rest of its children can't affect the decision, and are <strong>pruned</strong>.</p>
<pre><code>def alphabeta(node, maximizing, alpha=-math.inf, beta=math.inf, seen=None):
    if not isinstance(node, list):
        seen.append(node)                 # record each leaf we evaluate
        return node
    if maximizing:
        value = -math.inf
        for child in node:
            value = max(value, alphabeta(child, False, alpha, beta, seen))
            alpha = max(alpha, value)
            if alpha >= beta:
                break                     # MIN above will never let play reach here
        return value
    value = math.inf
    for child in node:
        value = min(value, alphabeta(child, True, alpha, beta, seen))
        beta = min(beta, value)
        if alpha >= beta:
            break                         # MAX above already has something better
    return value

seen = []
print(alphabeta(tree, True, seen=seen), seen)   # 3 [3, 12, 8, 2, 14, 5, 2]</code></pre>
<figure class="fig"><svg viewBox="0 0 460 190" width="460" role="img" aria-label="A game tree. The MAX root has value 3. Its three MIN children have values 3, at most 2, and 2. Leaves 3, 12, 8 under the first; 2, then two pruned leaves under the second; 14, 5, 2 under the third.">
<g class="ln"><line x1="230" y1="38" x2="80" y2="82"/><line x1="230" y1="38" x2="230" y2="82"/><line x1="230" y1="38" x2="380" y2="82"/>
<line x1="80" y1="106" x2="40" y2="150"/><line x1="80" y1="106" x2="80" y2="150"/><line x1="80" y1="106" x2="120" y2="150"/>
<line x1="230" y1="106" x2="190" y2="150"/><line x1="380" y1="106" x2="340" y2="150"/><line x1="380" y1="106" x2="380" y2="150"/><line x1="380" y1="106" x2="420" y2="150"/></g>
<g class="dash"><line x1="230" y1="106" x2="230" y2="150"/><line x1="230" y1="106" x2="270" y2="150"/></g>
<g class="hl"><rect x="212" y="16" width="36" height="24"/></g>
<g class="box"><rect x="62" y="82" width="36" height="24"/><rect x="212" y="82" width="36" height="24"/><rect x="362" y="82" width="36" height="24"/></g>
<g class="text"><text x="230" y="33" text-anchor="middle">3</text><text x="80" y="99" text-anchor="middle">3</text><text x="230" y="99" text-anchor="middle">≤ 2</text><text x="380" y="99" text-anchor="middle">2</text>
<text x="40" y="168" text-anchor="middle">3</text><text x="80" y="168" text-anchor="middle">12</text><text x="120" y="168" text-anchor="middle">8</text><text x="190" y="168" text-anchor="middle">2</text>
<text x="230" y="168" class="m" text-anchor="middle">4</text><text x="270" y="168" class="m" text-anchor="middle">6</text>
<text x="340" y="168" text-anchor="middle">14</text><text x="380" y="168" text-anchor="middle">5</text><text x="420" y="168" text-anchor="middle">2</text>
<text x="290" y="33" class="m">MAX</text><text x="410" y="99" class="m">MIN</text><text x="250" y="186" class="m" text-anchor="middle">pruned</text></g>
</svg><figcaption>Alpha-beta on the example tree. After the first MIN node, α = 3 at the root; the middle MIN node's first leaf, 2, drops its value to at most 2 ≤ α, so its last two leaves (grey) are never examined.</figcaption></figure>
<p>The trace: the first MIN node sees 3, 12 and 8, so its value is 3 and the root's α becomes 3. The second MIN node starts with α = 3, β = +∞; its first leaf sets its value and β to 2, and now α ≥ β, so it stops. The third MIN node sees 14 (β = 14), 5 (β = 5) and 2 (β = 2, which is ≤ α = 3, but it was the last child anyway). Seven of nine leaves were evaluated, and the root's value is still 3.</p>
<p>Why is this safe? A MIN node stops when its value <em>v</em> ≤ α. More children could only make <em>v</em> smaller, and the MAX node above it, which already has a move worth α, will choose that move instead, so the MIN node's exact value never reaches the root. The case for MAX nodes is symmetric. So alpha-beta always returns the same root value as minimax.</p>
<p>How much it prunes depends on the order of the children. If the best move is always examined first, alpha-beta evaluates about <em>b</em><sup><em>d</em>/2</sup> leaves instead of <em>b<sup>d</sup></em> (Knuth and Moore proved this in 1975): in the same time, the search goes about twice as deep. With random order it evaluates about <em>b</em><sup>3<em>d</em>/4</sup> for moderate <em>b</em>. Real programs order moves with cheap guesses (captures first, or the move that was best in an earlier, shallower search). On the full tic-tac-toe tree, trying squares in the fixed order 0 to 8:</p>
<pre><code>LINES = [(0, 1, 2), (3, 4, 5), (6, 7, 8), (0, 3, 6), (1, 4, 7), (2, 5, 8), (0, 4, 8), (2, 4, 6)]

def winner(board):
    for i, j, k in LINES:
        if board[i] != "." and board[i] == board[j] == board[k]:
            return board[i]
    return None

def ttt_tree(board, player):
    """The game tree from this position, as nested lists, with X as MAX."""
    w = winner(board)
    if w:
        return 1 if w == "X" else -1
    if "." not in board:
        return 0
    other = "O" if player == "X" else "X"
    return [ttt_tree(board[:i] + player + board[i + 1:], other) for i in range(9) if board[i] == "."]

def count_nodes(t):
    return 1 + sum(count_nodes(c) for c in t) if isinstance(t, list) else 1

full = ttt_tree("." * 9, "X")
seen = []
print(count_nodes(full), minimax(full, True))      # 549946 0
print(alphabeta(full, True, seen=seen), len(seen))  # 0 7330</code></pre>
<p>The game is a draw with perfect play (value 0). Minimax looks at all 255,168 finished games (the leaves); alpha-beta evaluates 7,330 of them, under 3%.</p>

<h3>Real games: cutting the search off</h3>
<p>For chess even <em>b</em><sup><em>d</em>/2</sup> is far too many to reach the end of the game. Programs search to a fixed depth and score the positions there with an <strong>evaluation function</strong>, an estimate of the minimax value. The classic one is a weighted sum of features: material (pawn 1, knight and bishop 3, rook 5, queen 9), mobility, king safety. Alpha-beta runs unchanged, with the evaluation in place of utilities at the depth limit. A fixed limit can stop in the middle of an exchange of pieces and misjudge it (the <em>horizon effect</em>), so programs keep searching "noisy" positions, such as those with captures available, a little deeper. Lesson 4 onward is about learning functions from data; modern programs learn their evaluation functions, as the sidebar describes.</p>

<h3>Constraint satisfaction problems</h3>
<p>In many problems only the goal state matters: a timetable, a Sudoku solution, a colouring of a map. A <strong>constraint satisfaction problem</strong> (CSP) has:</p>
<ul>
<li>a set of <strong>variables</strong>;</li>
<li>a <strong>domain</strong> for each, the values it may take;</li>
<li><strong>constraints</strong>, each restricting the values of some variables together.</li>
</ul>
<p>A solution assigns every variable a value from its domain so that every constraint holds. The standard example is colouring the map of Australia with three colours so that neighbouring regions differ. The variables are the seven regions, WA, NT, SA, Q, NSW, V and T (Tasmania, an island); each domain is {red, green, blue}; and each pair of neighbours has a constraint "≠". Sudoku has 81 variables with domains 1–9 and "all different" constraints on rows, columns and boxes. CS 220 Lesson 8 showed that graph colouring is NP-complete, so no algorithm is fast on every instance. But real instances have structure, and the methods below exploit it.</p>
<p>A CSP could be handed to Lesson 1's search, with partial assignments as states, but that wastes a fact Lesson 1 couldn't use: the order of assignments doesn't matter, and a partial assignment that already breaks a constraint can never be completed.</p>

<h3>Backtracking search</h3>
<p><strong>Backtracking search</strong> is depth-first search over partial assignments. It assigns one variable at a time, tries each value in its domain that is consistent with the assignments so far, recurses, and undoes the choice (backtracks) if the recursion fails. You met it in CS 220 Lesson 8's SAT solver. Two improvements make it far faster.</p>
<ul>
<li><strong>Minimum remaining values</strong> (MRV): assign next the variable with the fewest legal values left. It is most likely to fail, and failing early prunes the most. ("Fail first.")</li>
<li><strong>Forward checking</strong>: after assigning <em>X</em> = <em>v</em>, delete from the domain of each unassigned neighbour of <em>X</em> every value inconsistent with <em>v</em>. If some domain becomes empty, this branch is dead now, rather than several assignments later.</li>
</ul>
<pre><code>neighbors = {"WA": ["NT", "SA"], "NT": ["WA", "SA", "Q"], "SA": ["WA", "NT", "Q", "NSW", "V"],
             "Q": ["NT", "SA", "NSW"], "NSW": ["Q", "SA", "V"], "V": ["SA", "NSW"], "T": []}

def backtrack(assignment, domains, log):
    if len(assignment) == len(domains):
        return assignment
    # minimum remaining values: the unassigned variable with the fewest values left
    var = min((v for v in domains if v not in assignment), key=lambda v: len(domains[v]))
    for value in domains[var]:
        log.append((var, value))
        # forward checking: remove value from each unassigned neighbour's domain
        pruned = {n: [x for x in domains[n] if x != value]
                  for n in neighbors[var] if n not in assignment}
        if all(pruned.values()):          # no neighbour has run out of values
            result = backtrack({**assignment, var: value}, {**domains, **pruned, var: [value]}, log)
            if result is not None:
                return result
    return None

log = []
print(backtrack({}, {v: ["red", "green", "blue"] for v in neighbors}, log))
print(len(log))   # 7</code></pre>
<pre data-label="Output"><code>{'WA': 'red', 'NT': 'green', 'SA': 'blue', 'Q': 'red', 'NSW': 'green', 'V': 'red', 'T': 'red'}
7</code></pre>
<p>The new domains are built as fresh dicts (<code>{**domains, **pruned, ...}</code> merges dicts, later ones winning), so backtracking needs no undo step: the caller's domains are untouched. The trace: all domains have 3 values, so MRV takes the first variable, WA = red, and forward checking removes red from NT and SA. They now have 2 values each; NT = green leaves SA with only blue, so SA comes next. Each later variable is then down to one or two values, and seven assignments solve the map with no backtracking. MRV breaks ties by the order of the variables here; a common refinement, the <em>degree heuristic</em>, breaks them in favour of the variable with the most constraints on unassigned variables (SA, with five neighbours, would go first). For the value, try first the one that rules out the fewest choices for the neighbours (<em>least constraining value</em>).</p>

<h3>Arc consistency</h3>
<p>Forward checking only looks one step from the variable just assigned. Suppose WA = red and then Q = green. Forward checking leaves NT = {blue}, SA = {blue}, NSW = {red, blue}, V and T with all three: no domain is empty, so it carries on. But NT and SA are neighbours, and both must be blue: the branch is already dead.</p>
<p>An <strong>arc</strong> <em>X</em> → <em>Y</em> (for a constraint between <em>X</em> and <em>Y</em>) is <strong>consistent</strong> if every value in <em>X</em>'s domain has at least one value in <em>Y</em>'s domain that satisfies the constraint with it, a <em>support</em>. Here the arc SA → NT is inconsistent: SA's only value, blue, has no support in NT = {blue}. Deleting it leaves SA empty, which proves there is no solution. The <strong>AC-3</strong> algorithm (Alan Mackworth, 1977) makes every arc consistent. It keeps a queue of arcs; for each arc <em>X</em> → <em>Y</em> it deletes the values of <em>X</em> that have no support; and if it deleted anything, it puts back every arc <em>Z</em> → <em>X</em>, because <em>Z</em>'s values may have lost their support in <em>X</em>.</p>
<pre><code>from collections import deque

def ac3(domains):
    domains = {v: list(d) for v, d in domains.items()}      # don't change the caller's
    queue = deque((x, y) for x in neighbors for y in neighbors[x])
    while queue:
        x, y = queue.popleft()
        keep = [a for a in domains[x] if any(a != b for b in domains[y])]
        if len(keep) &lt; len(domains[x]):
            domains[x] = keep
            if not keep:
                return None                                  # no solution
            queue.extend((z, x) for z in neighbors[x] if z != y)
    return domains

d = {v: ["red", "green", "blue"] for v in neighbors}
d["WA"], d["Q"] = ["red"], ["green"]
print(ac3(d))   # None</code></pre>
<p>With <em>n</em> variables, at most <em>c</em> binary constraints and domains of size at most <em>d</em>, each arc can be put back at most <em>d</em> times (once per deleted value of its target), and checking an arc takes O(<em>d</em><sup>2</sup>), so AC-3 runs in O(<em>cd</em><sup>3</sup>). Solvers run it before search and after each assignment (this is called <em>maintaining arc consistency</em>). For easy Sudoku puzzles, arc consistency with "all different" reasoning solves the puzzle with no search at all.</p>
<p>A different approach suits large problems: <strong>local search</strong> (CS 220 Lesson 8). Start with a complete assignment that breaks some constraints, and repeatedly change the value of a variable in a broken constraint to the value that breaks the fewest (<em>min-conflicts</em>). On the <em>n-queens</em> puzzle (place <em>n</em> chess queens on an <em>n</em> × <em>n</em> board so that no two share a row, column or diagonal; as a CSP, one variable per column whose value is that queen's row, and a constraint between every pair of columns) it solves the million-queens case in about 50 steps on average after a greedy initial assignment, and it has been used to schedule observations for the Hubble Space Telescope.</p>
`,
      terms: [
        ["Zero-sum game", "A game in which one player's gain is the other's loss, so one utility number describes each outcome."],
        ["Game tree", "Positions as nodes and moves as edges, with terminal positions as leaves."],
        ["Minimax value", "The utility of a position if both players play perfectly: max over MAX's moves, min over MIN's."],
        ["Alpha-beta pruning", "Minimax that skips children which can't affect the decision, tracking α (MAX's guarantee) and β (MIN's guarantee)."],
        ["Evaluation function", "An estimate of a position's minimax value, used at the depth limit of a search."],
        ["Horizon effect", "Misjudging a position because something important happens just beyond the depth limit."],
        ["Constraint satisfaction problem", "Variables, a domain for each, and constraints on combinations of values."],
        ["Backtracking search", "Depth-first search assigning one variable at a time and undoing choices that lead to failure."],
        ["Minimum remaining values", "Choose next the variable with the fewest legal values left."],
        ["Forward checking", "After an assignment, remove inconsistent values from the neighbours' domains."],
        ["Arc consistency", "Every value of X has a supporting value in Y, for every constraint arc X → Y."],
        ["AC-3", "An algorithm that makes every arc consistent by deleting unsupported values and rechecking affected arcs."]
      ],
      quiz: [
        { q: "A MAX node has children with minimax values 4, 9 and 2. What is its value?", choices: ["2", "4", "5", "9"], answer: 3, why: "MAX takes the largest child value." },
        { q: "During alpha-beta, a MIN node's value has dropped to 1, and α = 3. What happens?", choices: ["It keeps searching to find the exact value", "Its remaining children are pruned, because MAX above already has a move worth 3", "α becomes 1", "The root's value becomes 1"], answer: 1, why: "More children could only lower the MIN node's value, and MAX won't choose it anyway." },
        { q: "With perfect move ordering, alpha-beta evaluates about how many leaves of a tree with branching factor b and depth d?", choices: ["b^d", "b^(d/2)", "d^b", "b·d"], answer: 1, why: "Knuth and Moore's result: roughly the square root of minimax's b^d, so twice the depth in the same time." },
        { q: "Does alpha-beta pruning ever change the root's value compared with minimax?", choices: ["Yes, when the move order is bad", "Yes, at the depth limit", "No: it only skips nodes that can't affect it", "Only for MIN nodes"], answer: 2, why: "Pruning removes only subtrees whose values can't reach the root." },
        { q: "The minimum-remaining-values heuristic chooses:", choices: ["The value that rules out the fewest options", "The variable with the fewest legal values left", "The variable with the most values", "A random variable"], answer: 1, why: "Fail first: the most constrained variable is most likely to expose a dead end early." },
        { q: "After WA = red and Q = green, forward checking leaves NT = {blue} and SA = {blue}. What does AC-3 add?", choices: ["Nothing", "It detects that the arc SA → NT has no support, so the branch has no solution", "It assigns NT = blue", "It undoes Q = green"], answer: 1, why: "NT and SA are neighbours; blue for SA has no different value left in NT, so SA's domain empties." }
      ],
      practice: [
        {
          q: `<p>Run alpha-beta on the tree <code>[[5, 6], [7, 4, 5], [3, 9]]</code> (root MAX, children MIN). Which leaves are evaluated? Then reorder the tree to maximize pruning (you may reorder both the root's children and the leaves inside each MIN node; the values stay the same) and say how many leaves are evaluated.</p>`,
          a: `<p>First MIN node: 5, 6 → value 5, α = 5. Second: 7 (β = 7), 4 (β = 4 ≤ α: prune the 5). Third: 3 ≤ α: prune the 9. Evaluated: 5, 6, 7, 4, 3 (five of seven); value 5. The best move is already first, so reordering only the root's children can't help (putting <code>[7, 4, 5]</code> first even costs a leaf). The gain comes from the MIN nodes: put the smallest leaf first in each of the others, so each is cut off after one leaf. <code>[[5, 6], [3, 9], [4, 7, 5]]</code> evaluates 5, 6, 3, 4: four leaves. No order does better, because the first MIN node must be evaluated completely (2 leaves) to set α, and every other MIN node needs at least one leaf.</p>
<pre><code>for t in ([[5, 6], [7, 4, 5], [3, 9]], [[5, 6], [3, 9], [4, 7, 5]]):
    seen = []
    print(alphabeta(t, True, seen=seen), seen)</code></pre>
<pre data-label="Output"><code>5 [5, 6, 7, 4, 3]
5 [5, 6, 3, 4]</code></pre>`
        },
        {
          q: `<p>A depth-3 tree has a MAX root, MIN nodes below it, MAX nodes below those, and then leaves. The root's first MIN child is evaluated completely and has value 10. Explain in words why, under the root's second MIN child, alpha-beta can stop as soon as one of that MIN node's MAX children has value ≤ 10, but must examine all the leaves of its first MAX child.</p>`,
          a: `<p>At the second MIN node, α = 10 (the root's guarantee) and β starts at +∞. Its first MAX child is searched with α = 10, β = +∞: a MAX node prunes only when its value reaches β, and nothing has set β yet, so it must look at every leaf (unless one reaches +∞). When that child returns a value <em>v</em> ≤ 10, the MIN node's value is at most <em>v</em> ≤ α, so MAX at the root will prefer its first move, and the MIN node's remaining children are pruned. If <em>v</em> &gt; 10, β becomes <em>v</em>, and the next MAX grandchild can stop once its value reaches <em>v</em>.</p>`
        },
        {
          q: `<p>Formulate exam scheduling as a CSP: six exams A–F, three time slots, and pairs of exams that share a student, which can't be in the same slot: A–B, A–C, B–C, B–D, C–E, D–E, D–F, E–F. Then solve it with the notes' <code>backtrack</code>, giving the schedule. (That function takes the constraint graph from the global <code>neighbors</code> dict, so first set <code>neighbors</code> to the conflict graph; the function itself needs no change.) What does the assignment order tell you about MRV?</p>`,
          a: `<p>Variables: the exams. Domains: {1, 2, 3}. Constraints: ≠ for each listed pair. This is 3-colouring the conflict graph.</p>
<pre><code>neighbors = {"A": ["B", "C"], "B": ["A", "C", "D"], "C": ["A", "B", "E"],
             "D": ["B", "E", "F"], "E": ["C", "D", "F"], "F": ["D", "E"]}
log = []
print(backtrack({}, {v: [1, 2, 3] for v in neighbors}, log))
print(log)</code></pre>
<pre data-label="Output"><code>{'A': 1, 'B': 2, 'C': 3, 'D': 1, 'E': 2, 'F': 3}
[('A', 1), ('B', 2), ('C', 3), ('D', 1), ('E', 2), ('F', 3)]</code></pre>
<p>So A, D in slot 1, B, E in slot 2, C, F in slot 3. After A = 1, B and C have two values; B = 2 forces C to {3} and D to {1, 3}; MRV picks C (one value) before D, and each later exam is always the most constrained, so there is no backtracking. (The notes' <code>backtrack</code> reads the global <code>neighbors</code>, which this code redefines; to keep using the Australia map afterwards, define it again.)</p>`
        },
        {
          q: `<p>Variables X and Y have domains {1, 2, 3, 4} and the constraint X &lt; Y − 1 (so Y is at least 2 more than X). Make both arcs consistent by hand. Which values remain?</p>`,
          a: `<p>Arc X → Y: X = 1 has support Y = 3 or 4; X = 2 has Y = 4; X = 3 and X = 4 have none (they need Y ≥ 5). So X = {1, 2}. Arc Y → X, now with X = {1, 2}: Y = 1 and Y = 2 need X &lt; 0 or X &lt; 1, impossible; Y = 3 has X = 1; Y = 4 has X = 1 or 2. So Y = {3, 4}. Checking X → Y again changes nothing. Final domains X = {1, 2}, Y = {3, 4}; every remaining value has a support, but not every combination is a solution (X = 2, Y = 3 isn't). Arc consistency prunes; it doesn't solve by itself.</p>`
        }
      ],
      sources: ["aima", "cs188", "knuthmoore75", "mackworth77"]
    },
    {
      id: "ml3",
      title: "Reasoning under uncertainty",
      minutes: 90,
      summary: "Probability as the language of uncertain knowledge: full joint distributions, marginalizing and conditioning; independence and conditional independence and why they make large models possible; the multinomial naive Bayes text classifier with Laplace smoothing and log probabilities; Bayesian networks, their factored joint distribution, inference by enumeration, and explaining away.",
      notes: `
<p>Lessons 1 and 2 assumed the program knows the world exactly: where each road goes, what each move does. Usually it doesn't. A spam filter can't be sure a message is spam; a diagnosis program can't be sure of a disease; a robot's sensors are noisy. Probability is the standard way to represent and reason with that kind of uncertainty. This lesson uses only the probability you know from MATH 121 Lesson 6 and MATH 230 Lessons 1 and 4: conditional probability, Bayes' rule and independence. What it adds is how to organize a probability model with many variables so that it stays small enough to store and fast enough to use.</p>

<h3>The full joint distribution</h3>
<p>A <strong>random variable</strong> here is a feature of the world with a set of possible values: <em>Cavity</em> (true or false), <em>Weather</em> (sunny, rain, …). A possible world assigns a value to every variable, and the <strong>full joint distribution</strong> gives the probability of each world. With three true/false variables about a dental patient, <em>Cavity</em>, <em>Toothache</em> and <em>Catch</em> (the dentist's probe catches in the tooth), it is a table of 2<sup>3</sup> = 8 numbers that add up to 1:</p>
<table>
<tr><th></th><th>toothache, catch</th><th>toothache, ¬catch</th><th>¬toothache, catch</th><th>¬toothache, ¬catch</th></tr>
<tr><td>cavity</td><td>0.108</td><td>0.012</td><td>0.072</td><td>0.008</td></tr>
<tr><td>¬cavity</td><td>0.016</td><td>0.064</td><td>0.144</td><td>0.576</td></tr>
</table>
<p>(¬ means "not", as in MATH 120.) Every question about these variables can be answered from the table by two operations.</p>
<ul>
<li><strong>Marginalizing</strong> (summing out): to get the probability of some variables' values, add the entries of all worlds that agree with them. P(cavity) = 0.108 + 0.012 + 0.072 + 0.008 = 0.2. P(toothache) = 0.108 + 0.012 + 0.016 + 0.064 = 0.2.</li>
<li><strong>Conditioning</strong>: P(<em>a</em> | <em>b</em>) = P(<em>a</em>, <em>b</em>)/P(<em>b</em>), where the comma means "and". P(cavity | toothache) = (0.108 + 0.012)/0.2 = 0.6.</li>
</ul>
<p>The denominator P(<em>b</em>) is the same for every value of the variable being asked about, so it is often skipped: compute P(cavity, toothache) = 0.12 and P(¬cavity, toothache) = 0.08, then divide each by their sum 0.2 to get 0.6 and 0.4. This is <strong>normalization</strong>, often written P(<em>Cavity</em> | toothache) = α ⟨0.12, 0.08⟩, with α the constant that makes the numbers add up to 1 (here 1/0.2 = 5). This α has nothing to do with alpha-beta's α in Lesson 2: AI reuses the letter, and each lesson says what it means. Bayes' rule, P(<em>h</em> | <em>e</em>) = P(<em>e</em> | <em>h</em>) P(<em>h</em>)/P(<em>e</em>), is one use of it.</p>
<p>The joint table is complete but useless at scale. With <em>n</em> true/false variables it has 2<sup><em>n</em></sup> entries (2<sup><em>n</em></sup> − 1 free numbers, since they sum to 1): for 30 variables, about a billion, which nobody could estimate from data or write down. The rest of this lesson is about using independence to avoid it.</p>

<h3>Independence and conditional independence</h3>
<p>Variables <em>X</em> and <em>Y</em> are <strong>independent</strong> if P(<em>x</em>, <em>y</em>) = P(<em>x</em>) P(<em>y</em>) for all their values, equivalently P(<em>x</em> | <em>y</em>) = P(<em>x</em>) (MATH 121 Lesson 6). Then the joint table splits into two small ones. Full independence is rare, though: <em>Toothache</em> and <em>Catch</em> are not independent. P(toothache, catch) = 0.108 + 0.016 = 0.124, while P(toothache) P(catch) = 0.2 × 0.34 = 0.068. Each is evidence of a cavity, so each makes the other more likely.</p>
<p>But once we know whether there is a cavity, they no longer tell us anything about each other: the probe catching depends on the cavity, not on whether the tooth aches. Check it with the table. Given cavity, P(toothache, catch | cavity) = 0.108/0.2 = 0.54, and P(toothache | cavity) P(catch | cavity) = (0.12/0.2)(0.18/0.2) = 0.6 × 0.9 = 0.54. Given ¬cavity, 0.016/0.8 = 0.02 and (0.08/0.8)(0.16/0.8) = 0.1 × 0.2 = 0.02. <em>X</em> and <em>Y</em> are <strong>conditionally independent given</strong> <em>Z</em> if</p>
<p class="math">P(<em>x</em>, <em>y</em> | <em>z</em>) = P(<em>x</em> | <em>z</em>) P(<em>y</em> | <em>z</em>)   for all values <em>x</em>, <em>y</em>, <em>z</em>.</p>
<p>Now the joint can be rebuilt from smaller pieces. The <strong>product rule</strong> P(<em>a</em>, <em>b</em>) = P(<em>a</em> | <em>b</em>) P(<em>b</em>), applied twice, gives P(<em>t</em>, <em>k</em>, <em>c</em>) = P(<em>t</em>, <em>k</em> | <em>c</em>) P(<em>c</em>), and conditional independence turns this into P(<em>t</em> | <em>c</em>) P(<em>k</em> | <em>c</em>) P(<em>c</em>). Instead of 7 free numbers we need 5: P(cavity), and P(toothache | <em>c</em>) and P(catch | <em>c</em>) for each of the two values of <em>c</em>. For one cause with <em>n</em> conditionally independent effects, the count drops from 2<sup><em>n</em>+1</sup> − 1 to 2<em>n</em> + 1: exponential to linear. Conditional independence is the most important structure in probabilistic reasoning.</p>

<h3>Naive Bayes</h3>
<p>The <strong>naive Bayes</strong> model assumes exactly this shape: one class variable <em>C</em> and features <em>X</em><sub>1</sub>, …, <em>X<sub>n</sub></em> that are conditionally independent given the class. Then, by Bayes' rule and normalization,</p>
<p class="math">P(<em>c</em> | <em>x</em><sub>1</sub>, …, <em>x<sub>n</sub></em>) = α P(<em>c</em>) P(<em>x</em><sub>1</sub> | <em>c</em>) P(<em>x</em><sub>2</sub> | <em>c</em>) ⋯ P(<em>x<sub>n</sub></em> | <em>c</em>)</p>
<p>and the classifier predicts the class with the largest value. MATH 230 Lesson 1 built a spam filter of this form with one true/false feature per vocabulary word: does the message contain it? That is the <em>Bernoulli</em> model. For longer texts the <strong>multinomial</strong> model usually works better: a document of class <em>c</em> is treated as a sequence of words, each drawn independently from a distribution P(<em>w</em> | <em>c</em>) over the vocabulary, so a word that appears three times contributes its probability three times:</p>
<p class="math">P(<em>c</em> | document) = α P(<em>c</em>) ∏<sub><em>i</em></sub> P(<em>w<sub>i</sub></em> | <em>c</em>),   the product over the word positions <em>i</em>.</p>
<p>Both distributions are estimated by counting in labelled training documents. P(<em>c</em>) is the fraction of documents in class <em>c</em>. P(<em>w</em> | <em>c</em>) is the number of times <em>w</em> occurs in class <em>c</em>'s documents divided by the total number of words in them (the maximum-likelihood estimate of MATH 230 Lesson 6). A word never seen in class <em>c</em> would get probability 0 and veto the class whatever else the document says, so the counts are smoothed. <strong>Laplace smoothing</strong> (add-one smoothing) pretends every vocabulary word was seen once more in each class. With a vocabulary <em>V</em> of |<em>V</em>| words, that adds |<em>V</em>| to the total:</p>
<p class="math">P(<em>w</em> | <em>c</em>) = (count(<em>w</em>, <em>c</em>) + 1) / (total words in <em>c</em> + |<em>V</em>|)</p>
<p>(In MATH 230's Bernoulli model each word had two outcomes, present or absent, so smoothing added 2 to the denominator; here each word position has |<em>V</em>| possible outcomes.) A worked example, with six tiny documents:</p>
<table>
<tr><th>Class</th><th>Documents</th></tr>
<tr><td>sport</td><td>"goal match team win", "team score goal goal", "match win cup"</td></tr>
<tr><td>tech</td><td>"code bug fix", "python code team", "bug report fix code"</td></tr>
</table>
<p>The vocabulary has 11 words. Sport has 11 words in total, with team twice and code and bug never; tech has 10, with team once, code 3 times and bug twice. Each prior is 3/6 = 1/2. For the new document "team code bug":</p>
<table>
<tr><th>Class</th><th>P(team | <em>c</em>)</th><th>P(code | <em>c</em>)</th><th>P(bug | <em>c</em>)</th><th>P(<em>c</em>) × product</th></tr>
<tr><td>sport</td><td>(2 + 1)/(11 + 11) = 3/22</td><td>1/22</td><td>1/22</td><td>0.5 × 3/10,648 ≈ 1.409 × 10<sup>−4</sup></td></tr>
<tr><td>tech</td><td>(1 + 1)/(10 + 11) = 2/21</td><td>4/21</td><td>3/21</td><td>0.5 × 24/9,261 ≈ 1.296 × 10<sup>−3</sup></td></tr>
</table>
<p>Normalizing, P(tech | "team code bug") = 1.296/(1.296 + 0.1409) ≈ 0.902. Without smoothing, sport's score would be exactly 0 because "code" never occurs in sport documents.</p>
<p>A real document has hundreds of words, and multiplying hundreds of probabilities near 0.001 underflows to 0.0 (MATH 230 Lesson 1). So classifiers add logarithms instead: the <strong>log score</strong> of class <em>c</em> is log P(<em>c</em>) + Σ<sub><em>i</em></sub> log P(<em>w<sub>i</sub></em> | <em>c</em>), and the largest log score wins, since log is increasing. Here the log scores are ln(1.409 × 10<sup>−4</sup>) ≈ −8.868 for sport and −6.649 for tech. To turn log scores <em>s<sub>c</sub></em> back into probabilities without underflow, subtract the largest, <em>m</em>, before exponentiating: e<sup><em>s<sub>c</sub></em></sup> / Σ e<sup><em>s<sub>c′</sub></em></sup> = e<sup><em>s<sub>c</sub></em> − <em>m</em></sup> / Σ e<sup><em>s<sub>c′</sub></em> − <em>m</em></sup>, because the factor e<sup>−<em>m</em></sup> cancels. The largest term becomes e<sup>0</sup> = 1, so the sum can't underflow to 0.</p>
<pre><code>import math

def posteriors(log_scores):
    """Turn a dict of log scores into probabilities that add up to 1."""
    m = max(log_scores.values())
    exps = {c: math.exp(s - m) for c, s in log_scores.items()}
    total = sum(exps.values())
    return {c: e / total for c, e in exps.items()}

print(posteriors({"sport": -8.868, "tech": -6.649}))   # {'sport': 0.098..., 'tech': 0.901...}
print(math.exp(-800.0), posteriors({"a": -800.0, "b": -801.0}))   # 0.0 {'a': 0.731..., 'b': 0.268...}</code></pre>
<p>e<sup>−800</sup> is below the smallest positive float, so computing it directly gives 0.0, yet the ratio of the two classes is perfectly well defined. This is the <em>log-sum-exp</em> trick, and the same subtraction appears again in Lessons 5 and 8.</p>
<p>The naive assumption is false for text: "goal" and "match" go together. Correlated features are counted as if they were separate evidence, so naive Bayes's probabilities are usually too extreme (too close to 0 or 1). But its <em>ranking</em> of classes is often right, it trains with one pass of counting, and it needs little data, so it remains a strong baseline for text classification.</p>

<h3>Bayesian networks</h3>
<p>Naive Bayes has one cause and many effects. Real domains have chains of causes. A <strong>Bayesian network</strong> is a directed acyclic graph with one node per variable, in which each node <em>X</em> has a <strong>conditional probability table</strong> (CPT) giving P(<em>X</em> | its parents) for every combination of the parents' values. It represents the joint distribution</p>
<p class="math">P(<em>x</em><sub>1</sub>, …, <em>x<sub>n</sub></em>) = ∏<sub><em>i</em></sub> P(<em>x<sub>i</sub></em> | parents(<em>X<sub>i</sub></em>)).</p>
<p>The standard example, due to Judea Pearl: a house has a burglar alarm, which a burglary usually sets off and a small earthquake sometimes does. Two neighbours, John and Mary, call when they hear it, but John sometimes mistakes the phone for the alarm, and Mary sometimes misses it over loud music.</p>
<figure class="fig"><svg viewBox="0 0 510 220" width="510" role="img" aria-label="A Bayesian network. Burglary and Earthquake both point to Alarm; Alarm points to JohnCalls and MaryCalls. P(B) = 0.001, P(E) = 0.002; P(A | B, E) is 0.95, 0.94, 0.29, 0.001; P(J | A) is 0.90 or 0.05; P(M | A) is 0.70 or 0.01.">
<defs><marker id="arml3" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
<g class="ln" marker-end="url(#arml3)"><line x1="120" y1="52" x2="208" y2="96"/><line x1="340" y1="52" x2="252" y2="96"/><line x1="210" y1="126" x2="122" y2="166"/><line x1="250" y1="126" x2="338" y2="166"/></g>
<g class="box"><rect x="50" y="22" width="110" height="30" rx="6"/><rect x="300" y="22" width="110" height="30" rx="6"/><rect x="175" y="96" width="110" height="30" rx="6"/><rect x="50" y="166" width="110" height="30" rx="6"/><rect x="300" y="166" width="110" height="30" rx="6"/></g>
<g class="text"><text x="105" y="42" text-anchor="middle">Burglary</text><text x="355" y="42" text-anchor="middle">Earthquake</text><text x="230" y="116" text-anchor="middle">Alarm</text><text x="105" y="186" text-anchor="middle">JohnCalls</text><text x="355" y="186" text-anchor="middle">MaryCalls</text>
<text x="105" y="14" class="m" text-anchor="middle">P(b) = 0.001</text><text x="355" y="14" class="m" text-anchor="middle">P(e) = 0.002</text>
<text x="295" y="88" class="m">P(a | B, E): 0.95, 0.94, 0.29, 0.001</text>
<text x="105" y="212" class="m" text-anchor="middle">P(j | a) = 0.90, P(j | ¬a) = 0.05</text><text x="355" y="212" class="m" text-anchor="middle">P(m | a) = 0.70, P(m | ¬a) = 0.01</text></g>
</svg><figcaption>The alarm network. The four entries for Alarm are for (B, E) = (true, true), (true, false), (false, true), (false, false).</figcaption></figure>
<p>The network needs 1 + 1 + 4 + 2 + 2 = 10 numbers, against 2<sup>5</sup> − 1 = 31 for the full joint, and each number is something an expert could estimate or a count could measure. In a network where every node has at most <em>k</em> parents, the total is at most <em>n</em> 2<sup><em>k</em></sup> instead of 2<sup><em>n</em></sup>. The missing arrows are claims of conditional independence: each variable is conditionally independent of its non-descendants given its parents. JohnCalls depends on Burglary only through Alarm; once we know whether the alarm rang, a burglary tells us nothing more about John.</p>
<p>The probability of a complete world is one CPT entry per node, multiplied. For "the alarm rang and both called, with no burglary and no earthquake":</p>
<p class="math">P(<em>j</em>, <em>m</em>, <em>a</em>, ¬<em>b</em>, ¬<em>e</em>) = P(<em>j</em> | <em>a</em>) P(<em>m</em> | <em>a</em>) P(<em>a</em> | ¬<em>b</em>, ¬<em>e</em>) P(¬<em>b</em>) P(¬<em>e</em>) = 0.90 × 0.70 × 0.001 × 0.999 × 0.998 ≈ 0.000628.</p>
<pre><code># each variable: (parents, table giving P(variable = True | the parents' values))
net = {
    "B": ((), {(): 0.001}),
    "E": ((), {(): 0.002}),
    "A": (("B", "E"), {(True, True): 0.95, (True, False): 0.94, (False, True): 0.29, (False, False): 0.001}),
    "J": (("A",), {(True,): 0.90, (False,): 0.05}),
    "M": (("A",), {(True,): 0.70, (False,): 0.01}),
}

def joint(net, world):
    p = 1.0
    for var, (parents, table) in net.items():
        p_true = table[tuple(world[q] for q in parents)]
        p *= p_true if world[var] else 1 - p_true
    return p

print(round(joint(net, {"B": False, "E": False, "A": True, "J": True, "M": True}), 6))   # 0.000628</code></pre>

<h3>Inference by enumeration</h3>
<p>The typical query: John and Mary both called. How likely is a burglary? The query variable is <em>B</em>, the evidence is <em>j</em>, <em>m</em>, and <em>E</em> and <em>A</em> are <em>hidden</em> variables, which we sum out:</p>
<p class="math">P(<em>B</em> | <em>j</em>, <em>m</em>) = α Σ<sub><em>e</em></sub> Σ<sub><em>a</em></sub> P(<em>B</em>, <em>e</em>, <em>a</em>, <em>j</em>, <em>m</em>)</p>
<p>Each term is a full joint entry, computed as above. The four terms for <em>B</em> = true are 1.197 × 10<sup>−6</sup> (<em>e</em>, <em>a</em>), 5 × 10<sup>−11</sup> (<em>e</em>, ¬<em>a</em>), 5.910 × 10<sup>−4</sup> (¬<em>e</em>, <em>a</em>) and 2.99 × 10<sup>−8</sup> (¬<em>e</em>, ¬<em>a</em>), adding to 5.922 × 10<sup>−4</sup>. For <em>B</em> = false the sum is 1.4919 × 10<sup>−3</sup>. Normalizing:</p>
<p class="math">P(<em>b</em> | <em>j</em>, <em>m</em>) = 0.0005922 / (0.0005922 + 0.0014919) ≈ 0.284.</p>
<p>Two calls raise the probability of a burglary from 0.001 to 0.284: a large update, but still far from certain, because false alarms are about as common as burglaries: on a quiet night (no burglary and no earthquake, 99.7% of nights) the alarm still rings with probability 0.001, and then John and Mary may call anyway. This is MATH 230 Lesson 1's base-rate lesson, now computed through a chain of causes. The programming problem writes the general <code>query</code>.</p>
<p>Enumeration sums over every combination of the hidden variables, 2<sup><em>h</em></sup> terms for <em>h</em> hidden true/false variables, each a product of <em>n</em> numbers. Smarter exact algorithms (<em>variable elimination</em>) reuse partial sums, much as dynamic programming does in CS 220 Lesson 3, and are fast on networks shaped like trees; but exact inference in general Bayesian networks is NP-hard, so large networks are handled by approximate methods such as sampling worlds from the network and counting.</p>
<p>Networks capture patterns of reasoning that are hard to get right informally. One is <strong>explaining away</strong>. Given only that the alarm rang, P(<em>b</em> | <em>a</em>) ≈ 0.374. Learn also that there was an earthquake, and P(<em>b</em> | <em>a</em>, <em>e</em>) ≈ 0.0033: the earthquake explains the alarm, so the burglary becomes almost as unlikely as before. Burglary and Earthquake are independent by the rule above: Burglary has no parents, and Earthquake is not its descendant, so Burglary is independent of Earthquake given nothing. But they become dependent once their common effect is observed. The rule doesn't forbid that, because it speaks only of conditioning on a variable's <em>parents</em>, and Alarm is a child of both. (So "no path of arrows between them" is not a test for independence in general: JohnCalls and MaryCalls have no arrow path between them either, yet they are dependent, since each is evidence that the alarm rang. They become independent given Alarm, their parent.)</p>
`,
      terms: [
        ["Full joint distribution", "The probability of every complete assignment of values to all the variables."],
        ["Marginalization", "Computing the probability of some variables by summing the joint over the values of the others."],
        ["Normalization", "Dividing a set of unnormalized probabilities by their sum, written α, so they add up to 1."],
        ["Conditional independence", "X and Y are independent given Z if P(x, y | z) = P(x | z) P(y | z) for all values."],
        ["Naive Bayes", "A classifier that assumes the features are conditionally independent given the class."],
        ["Multinomial naive Bayes", "Naive Bayes for text in which each word occurrence is a draw from P(w | c), so repeated words count repeatedly."],
        ["Laplace smoothing", "Adding 1 to every count, so that no estimated probability is 0: (count + 1)/(total + |V|)."],
        ["Log-sum-exp trick", "Subtracting the largest log score before exponentiating, so normalizing doesn't underflow."],
        ["Bayesian network", "A directed acyclic graph of variables, each with a table of P(variable | parents); the joint is the product of the tables."],
        ["Conditional probability table", "For one node, P(node | parents) for every combination of the parents' values."],
        ["Inference by enumeration", "Answering a query by summing joint probabilities over all values of the hidden variables and normalizing."],
        ["Explaining away", "Evidence for one cause of an observed effect lowers the probability of the other causes."]
      ],
      quiz: [
        { q: "In the dental table, what is P(¬cavity | toothache)?", choices: ["0.08", "0.4", "0.6", "0.8"], answer: 1, why: "P(¬cavity, toothache) = 0.016 + 0.064 = 0.08, divided by P(toothache) = 0.2." },
        { q: "How many free numbers does a full joint distribution over 10 true/false variables need?", choices: ["10", "20", "1,023", "1,024"], answer: 2, why: "2^10 = 1,024 entries, minus one because they must sum to 1." },
        { q: "Toothache and Catch are conditionally independent given Cavity. Which statement is true?", choices: ["Toothache and Catch are independent", "Once Cavity is known, learning Toothache doesn't change the probability of Catch", "P(Toothache) = P(Catch)", "Cavity is independent of both"], answer: 1, why: "That is the meaning of conditional independence; unconditionally they are dependent (0.124 versus 0.068)." },
        { q: "With Laplace smoothing, a class has 50 words in total in its training documents and the vocabulary has 20 words. What is P(w | c) for a word w never seen in that class?", choices: ["0", "1/50", "1/70", "1/20"], answer: 2, why: "(0 + 1)/(50 + 20)." },
        { q: "Why subtract the largest log score before exponentiating?", choices: ["To make the answer negative", "So the largest term is e^0 = 1 and the sum can't underflow to 0", "Because Bayes' rule requires it", "To apply smoothing"], answer: 1, why: "The common factor cancels in the ratio, and the computation stays in range." },
        { q: "In the alarm network, P(b | a) ≈ 0.374 but P(b | a, e) ≈ 0.0033. This is called:", choices: ["Base-rate neglect", "Explaining away", "Smoothing", "Marginalization"], answer: 1, why: "The earthquake accounts for the alarm, so it lowers the probability of the other cause." }
      ],
      practice: [
        {
          q: `<p>From the dental table, compute P(cavity | toothache, catch) and P(cavity | toothache, ¬catch). Then check the first using only the five numbers of the factored model: P(cavity) = 0.2, P(toothache | cavity) = 0.6, P(toothache | ¬cavity) = 0.1, P(catch | cavity) = 0.9, P(catch | ¬cavity) = 0.2.</p>`,
          a: `<p>From the table: 0.108/(0.108 + 0.016) = 0.108/0.124 ≈ 0.871, and 0.012/(0.012 + 0.064) = 0.012/0.076 ≈ 0.158. Factored: cavity gets 0.2 × 0.6 × 0.9 = 0.108, ¬cavity gets 0.8 × 0.1 × 0.2 = 0.016; normalizing gives the same 0.871. A second piece of evidence (the catch) moved the probability from 0.6 to 0.871; its absence moves it down to 0.158.</p>`
        },
        {
          q: `<p>Classify "goal team python" with the notes' naive Bayes model by hand: give both classes' smoothed word probabilities, their log scores, and the posterior probability of sport.</p>`,
          a: `<p>Sport: P(goal) = (3 + 1)/22 = 4/22, P(team) = 3/22, P(python) = (0 + 1)/22 = 1/22. Tech: P(goal) = 1/21, P(team) = 2/21, P(python) = 2/21. Products with the prior 0.5: sport 0.5 × 12/10,648 ≈ 5.635 × 10<sup>−4</sup>; tech 0.5 × 4/9,261 ≈ 2.160 × 10<sup>−4</sup>. Log scores ≈ −7.481 and −8.440. P(sport) = 5.635/(5.635 + 2.160) ≈ 0.723.</p>
<pre><code>print(posteriors({"sport": math.log(0.5 * 4 * 3 * 1 / 22 ** 3), "tech": math.log(0.5 * 1 * 2 * 2 / 21 ** 3)}))   # {'sport': 0.72..., 'tech': 0.27...}</code></pre>`
        },
        {
          q: `<p>In the alarm network, compute P(<em>a</em>), the probability that the alarm rings on a given night, by summing over Burglary and Earthquake. Then compute P(<em>j</em>).</p>`,
          hint: `<p>P(<em>a</em>) = Σ<sub><em>b</em>, <em>e</em></sub> P(<em>a</em> | <em>b</em>, <em>e</em>) P(<em>b</em>) P(<em>e</em>): four terms.</p>`,
          a: `<p>P(<em>a</em>) = 0.95 × 0.001 × 0.002 + 0.94 × 0.001 × 0.998 + 0.29 × 0.999 × 0.002 + 0.001 × 0.999 × 0.998 = 0.0000019 + 0.000938 + 0.000579 + 0.000997 ≈ 0.002516. Then P(<em>j</em>) = P(<em>j</em> | <em>a</em>) P(<em>a</em>) + P(<em>j</em> | ¬<em>a</em>) P(¬<em>a</em>) = 0.9 × 0.002516 + 0.05 × 0.997484 ≈ 0.0521. Most of John's calls (0.0499 of 0.0521) happen when there is no alarm at all.</p>
<pre><code>pa = sum(net["A"][1][(b, e)] * (0.001 if b else 0.999) * (0.002 if e else 0.998)
         for b in (True, False) for e in (True, False))
print(round(pa, 6), round(0.9 * pa + 0.05 * (1 - pa), 4))   # 0.002516 0.0521</code></pre>`
        },
        {
          q: `<p>A naive Bayes classifier for 1,000-word documents uses a vocabulary of 50,000 words and two classes. How many probabilities must it estimate? A Bernoulli model over the same vocabulary? Why might the multinomial one classify a long document about football better?</p>`,
          a: `<p>Multinomial: one prior (the other is 1 minus it) plus 50,000 word probabilities per class: 100,001 numbers (each class's word distribution must sum to 1, so strictly 2 × 49,999 + 1 are free). Bernoulli: also one probability per word and class, 100,001. The difference is how they use them: the multinomial model counts every occurrence, so a document that says "goal" twenty times gets twenty pieces of evidence, while the Bernoulli model sees only that "goal" is present. On the other hand the Bernoulli model also uses the absence of each of the 50,000 words, which in long documents mostly adds noise.</p>`
        }
      ],
      sources: ["aima", "cs188", "pearl88", "jurafsky"]
    },
    {
      id: "ml4",
      title: "Learning from data: linear regression and gradient descent",
      minutes: 90,
      summary: "Supervised learning as choosing a function from examples: features, models, loss and training. Linear regression with several features; the gradient of the squared loss derived with partial derivatives; gradient descent and the learning rate; why unscaled features make it crawl and how standardizing fixes it; the normal equations from MATH 220; polynomial and categorical features; stochastic and mini-batch gradient descent.",
      notes: `
<p>The programs in Lessons 1–3 were given their knowledge: a map, the rules of a game, a table of probabilities. Usually nobody can write that knowledge down. Nobody can list the rules that turn a photograph into the word "cat", or a house's description into its price. But examples are plentiful. <strong>Machine learning</strong> builds programs from examples, and the rest of this course is about how.</p>

<h3>Supervised learning</h3>
<p>In <strong>supervised learning</strong> we are given <em>n</em> training examples (<strong>x</strong><sub>1</sub>, <em>y</em><sub>1</sub>), …, (<strong>x</strong><sub><em>n</em></sub>, <em>y<sub>n</sub></em>). Each <strong>x</strong><sub><em>i</em></sub> is a vector of <em>d</em> <strong>features</strong>, numbers describing the example (a house's floor area and number of rooms), and <em>y<sub>i</sub></em> is its <strong>label</strong> or <strong>target</strong>, the answer we want to predict (its price). The task is to find a function <em>f</em> with <em>f</em>(<strong>x</strong>) ≈ <em>y</em>, not only on the training examples but on new ones. When <em>y</em> is a number, this is <strong>regression</strong>; when it is one of a few categories (spam or not, which digit), it is <strong>classification</strong> (Lesson 5).</p>
<p>Every learning method in this course has the same three parts:</p>
<ol>
<li>A <strong>model</strong>: a family of functions <em>f</em><sub>θ</sub>, one for each setting of some <strong>parameters</strong> θ. Here, linear functions with weights and a bias.</li>
<li>A <strong>loss function</strong> that measures how wrong a prediction is. Here, the squared error.</li>
<li>A <strong>training</strong> procedure that finds parameters with small average loss on the training data. Here, gradient descent or a direct solution.</li>
</ol>
<p>Small loss on the training data is the means, not the goal. The goal is small loss on data the model hasn't seen, called <strong>generalization</strong>. MATH 230 Lesson 8 showed what goes wrong when the two differ (overfitting), and Lesson 5 shows how to measure it. This lesson is about the training step.</p>

<h3>A linear model</h3>
<p>Six houses, with floor area in square metres, number of rooms, and price in thousands:</p>
<table>
<tr><th>Area (m²)</th><td>50</td><td>60</td><td>70</td><td>80</td><td>100</td><td>120</td></tr>
<tr><th>Rooms</th><td>1</td><td>2</td><td>2</td><td>3</td><td>3</td><td>4</td></tr>
<tr><th>Price</th><td>135</td><td>150</td><td>175</td><td>205</td><td>240</td><td>290</td></tr>
</table>
<p>A <strong>linear model</strong> predicts</p>
<p class="math">ŷ = <em>w</em><sub>1</sub><em>x</em><sub>1</sub> + <em>w</em><sub>2</sub><em>x</em><sub>2</sub> + ⋯ + <em>w<sub>d</sub>x<sub>d</sub></em> + <em>b</em> = <strong>w</strong> · <strong>x</strong> + <em>b</em></p>
<p>with a <strong>weight</strong> <em>w<sub>j</sub></em> per feature and a <strong>bias</strong> <em>b</em> (the intercept). With <em>w</em><sub>1</sub> = 2, <em>w</em><sub>2</sub> = 3 and <em>b</em> = 20, the first house is predicted at 2 × 50 + 3 × 1 + 20 = 123. This is MATH 230 Lesson 8's multiple regression; the difference here is how we find the parameters.</p>

<h3>The squared loss and its gradient</h3>
<p>The <strong>mean squared error</strong> (MSE) of the parameters on the training set is</p>
<p class="math"><em>L</em>(<strong>w</strong>, <em>b</em>) = (1/<em>n</em>) Σ<sub><em>i</em></sub> (ŷ<sub><em>i</em></sub> − <em>y<sub>i</sub></em>)²,   where ŷ<sub><em>i</em></sub> = <strong>w</strong> · <strong>x</strong><sub><em>i</em></sub> + <em>b</em>.</p>
<p>Squaring makes every error count as positive, punishes large errors much more than small ones, and gives a smooth function we can differentiate. (If the errors are normally distributed noise, minimizing it is also maximum-likelihood estimation, MATH 230 Lesson 6.) The data are fixed numbers, so <em>L</em> is a function of the <em>d</em> + 1 parameters. MATH 131 Lesson 8 differentiated it for one feature; the same steps work for any number. The derivative of (ŷ<sub><em>i</em></sub> − <em>y<sub>i</sub></em>)² with respect to <em>w<sub>j</sub></em> is, by the chain rule, 2(ŷ<sub><em>i</em></sub> − <em>y<sub>i</sub></em>) times the derivative of ŷ<sub><em>i</em></sub>, which is <em>x<sub>ij</sub></em> (the <em>j</em>th feature of example <em>i</em>), because every other term of <strong>w</strong> · <strong>x</strong><sub><em>i</em></sub> + <em>b</em> is constant in <em>w<sub>j</sub></em>. The derivative of ŷ<sub><em>i</em></sub> with respect to <em>b</em> is 1. So</p>
<p class="math">∂<em>L</em>/∂<em>w<sub>j</sub></em> = (2/<em>n</em>) Σ<sub><em>i</em></sub> (ŷ<sub><em>i</em></sub> − <em>y<sub>i</sub></em>) <em>x<sub>ij</sub></em>,     ∂<em>L</em>/∂<em>b</em> = (2/<em>n</em>) Σ<sub><em>i</em></sub> (ŷ<sub><em>i</em></sub> − <em>y<sub>i</sub></em>).</p>
<p>Read it as a vote. Each example's error, ŷ − <em>y</em>, says how far off its prediction is and in which direction, and it pushes each weight in proportion to the feature the weight multiplies. A house predicted too low (negative error) with a large area makes the area weight's derivative strongly negative, so a step against the gradient raises that weight.</p>
<pre><code>X = [[50, 1], [60, 2], [70, 2], [80, 3], [100, 3], [120, 4]]
y = [135, 150, 175, 205, 240, 290]

def predict(w, b, x):
    return sum(wj * xj for wj, xj in zip(w, x)) + b

def mse(w, b, X, y):
    return sum((predict(w, b, x) - t) ** 2 for x, t in zip(X, y)) / len(X)

def gradient(w, b, X, y):
    n = len(X)
    gw, gb = [0.0] * len(w), 0.0
    for x, t in zip(X, y):
        err = predict(w, b, x) - t
        for j in range(len(w)):
            gw[j] += 2 * err * x[j] / n
        gb += 2 * err / n
    return gw, gb

print(predict([2, 3], 20, X[0]), round(mse([2, 3], 20, X, y), 2))   # 123 157.0</code></pre>

<h3>Gradient descent</h3>
<p>MATH 130 Lesson 8 introduced <strong>gradient descent</strong> in one variable, and MATH 131 Lesson 8 extended it to several: start somewhere and repeatedly step against the gradient, <strong>θ</strong> ← <strong>θ</strong> − α ∇<em>L</em>(<strong>θ</strong>), with a <strong>learning rate</strong> α &gt; 0. (A third use of α in this course, unrelated to Lesson 2's alpha-beta bound and Lesson 3's normalization constant; α is the usual letter for a learning rate, as in MATH 131; MATH 130 wrote η.)</p>
<pre><code>def gradient_descent(X, y, rate, steps):
    w, b = [0.0] * len(X[0]), 0.0
    for _ in range(steps):
        gw, gb = gradient(w, b, X, y)
        w = [wj - rate * gj for wj, gj in zip(w, gw)]
        b = b - rate * gb
    return w, b

for steps in (10, 100, 1000, 10000):
    w, b = gradient_descent(X, y, 1e-4, steps)
    print(steps, round(mse(w, b, X, y), 2))
w, b = gradient_descent(X, y, 1.5e-4, 1000)
print(mse(w, b, X, y) > 1e80)   # True</code></pre>
<pre data-label="Output"><code>10 47.42
100 47.31
1000 46.21
10000 37.38
True</code></pre>
<p>The best possible MSE for this data, computed below, is 12.62. With α = 10<sup>−4</sup>, gradient descent gets from 42,512 (all parameters 0) to 47.4 in ten steps, then nearly stops: after 10,000 steps it is still at 37.4, and it takes about 100,000 steps to reach 15.5. With α = 1.5 × 10<sup>−4</sup>, only 50% larger, the loss explodes. There is no good learning rate. The problem is the shape of the loss, not the algorithm.</p>
<p>The MSE of a linear model is a quadratic function of the parameters, and since it is an average of squares of linear functions it is <strong>convex</strong>: a bowl, with no local minima other than the global one (MATH 131 Lesson 8). But the bowl can be very elongated. In MATH 131's example <em>f</em> = <em>x</em>² + 2<em>y</em>², each step multiplied <em>x</em> by 1 − 2α and <em>y</em> by 1 − 4α: the steep direction (curvature 4) set the largest safe α, and the shallow one (curvature 2) set the speed. Here the curvatures are the eigenvalues (MATH 220 Lesson 7) of the matrix of second partial derivatives of <em>L</em>. Write the parameters as (<em>b</em>, <em>w</em><sub>1</sub>, <em>w</em><sub>2</sub>) and give each example the row <strong>a</strong><sub><em>i</em></sub> = [1, area, rooms], so that its error is <strong>a</strong><sub><em>i</em></sub> · <strong>θ</strong> − <em>y<sub>i</sub></em>. The gradient above says ∂<em>L</em>/∂θ<sub><em>j</em></sub> = (2/<em>n</em>) Σ<sub><em>i</em></sub> (error<sub><em>i</em></sub>) <em>a<sub>ij</sub></em>, and differentiating that by θ<sub><em>k</em></sub> replaces the error by its derivative <em>a<sub>ik</sub></em>: ∂²<em>L</em>/∂θ<sub><em>j</em></sub>∂θ<sub><em>k</em></sub> = (2/<em>n</em>) Σ<sub><em>i</em></sub> <em>a<sub>ij</sub>a<sub>ik</sub></em>. That is entry (<em>j</em>, <em>k</em>) of (2/<em>n</em>) <em>A</em><sup>T</sup><em>A</em>, where <em>A</em> is the matrix with rows <strong>a</strong><sub><em>i</em></sub>; it doesn't depend on <strong>θ</strong>, because <em>L</em> is quadratic. Its eigenvalues are about 13,949, 0.29 and 0.098 (the normal-equations section below computes <em>A</em><sup>T</sup><em>A</em> and checks them). Call this matrix <em>H</em>. Why do eigenvalues act like separate curvatures when <em>H</em> isn't diagonal? The gradient is (2/<em>n</em>) <em>A</em><sup>T</sup>(<em>A</em><strong>θ</strong> − <strong>y</strong>), and it is zero at the minimum <strong>θ</strong>*; subtracting the two gives ∇<em>L</em>(<strong>θ</strong>) = <em>H</em>(<strong>θ</strong> − <strong>θ</strong>*). So one step, <strong>θ</strong> ← <strong>θ</strong> − α∇<em>L</em>, turns the offset <strong>d</strong> = <strong>θ</strong> − <strong>θ</strong>* into (<em>I</em> − α<em>H</em>)<strong>d</strong>. <em>H</em> is symmetric, so it has an orthonormal basis of eigenvectors (the spectral theorem, MATH 220 Lesson 8). Write <strong>d</strong> = <em>c</em><sub>1</sub><strong>v</strong><sub>1</sub> + <em>c</em><sub>2</sub><strong>v</strong><sub>2</sub> + <em>c</em><sub>3</sub><strong>v</strong><sub>3</sub> in that basis; since <em>H</em><strong>v</strong><sub><em>k</em></sub> = λ<sub><em>k</em></sub><strong>v</strong><sub><em>k</em></sub>, the step multiplies each <em>c</em><sub><em>k</em></sub> by 1 − αλ<sub><em>k</em></sub>, exactly as each coordinate shrank in MATH 131's example. A component grows whenever |1 − αλ<sub><em>k</em></sub>| &gt; 1, that is when α &gt; 2/λ<sub><em>k</em></sub>. So gradient descent diverges unless α &lt; 2/13,949 ≈ 1.43 × 10<sup>−4</sup>, and with such an α the shallowest direction shrinks by a factor of only 1 − 1.43 × 10<sup>−4</sup> × 0.098 ≈ 0.99999 per step. The ratio of the largest to the smallest curvature, here about 140,000, is the <strong>condition number</strong>, and gradient descent needs a number of steps roughly proportional to it.</p>
<p>The cause is that area is about 80 while rooms is about 3 and the bias's "feature" is 1: a change of 0.01 in the area weight moves every prediction by about 0.8, the same change in the bias by 0.01.</p>

<h3>Feature scaling</h3>
<p>The fix is to put the features on the same scale. <strong>Standardizing</strong> a feature replaces each value <em>x</em> by (<em>x</em> − μ)/σ, where μ and σ are the feature's mean and standard deviation over the training set: every feature then has mean 0 and standard deviation 1.</p>
<pre><code>import statistics

means = [statistics.mean(col) for col in zip(*X)]
stds = [statistics.pstdev(col) for col in zip(*X)]    # population standard deviation
Xs = [[(v - m) / s for v, m, s in zip(x, means, stds)] for x in X]
print([round(m, 2) for m in means], [round(s, 3) for s in stds])   # [80, 2.5] [23.805, 0.957]
for rate in (0.1, 0.5):
    w, b = gradient_descent(Xs, y, rate, 1000)
    print(rate, round(mse(w, b, Xs, y), 3))
w, b = gradient_descent(Xs, y, 0.7, 100)
print(0.7, mse(w, b, Xs, y) > 1e40)</code></pre>
<pre data-label="Output"><code>[80, 2.5] [23.805, 0.957]
0.1 12.616
0.5 12.616
0.7 True</code></pre>
<p>(<code>zip(*X)</code> turns the list of rows into a list of columns.) The curvatures can now be found by hand. Each standardized column has Σ<em>x</em> = 0 and (1/<em>n</em>) Σ<em>x</em><sup>2</sup> = 1, so in (2/<em>n</em>) <em>A</em><sup>T</sup><em>A</em>, with rows [1, area, rooms], the entries pairing the bias's 1 with a feature are (2/<em>n</em>) Σ<em>x</em> = 0, the diagonal entries are 2, and the one entry left is 2<em>r</em>, where <em>r</em> = (1/<em>n</em>) Σ (area × rooms) of the standardized values (the correlation of area and rooms). The matrix is</p>
<p class="math">[[2, 0, 0], [0, 2, 2<em>r</em>], [0, 2<em>r</em>, 2]]</p>
<p>The bias direction (1, 0, 0) has curvature exactly 2, and multiplying out shows that (0, 1, 1) and (0, 1, −1) are eigenvectors with eigenvalues 2(1 + <em>r</em>) and 2(1 − <em>r</em>):</p>
<pre><code>r = sum(a1 * a2 for a1, a2 in Xs) / len(Xs)
print(round(r, 4), round(2 * (1 + r), 2), round(2 * (1 - r), 3))   # 0.9507 3.9 0.099</code></pre>
<p>Big houses tend to have more rooms, so <em>r</em> is close to 1. The curvatures are now about 3.90, 2 and 0.099, a condition number of about 40 instead of 140,000. Any rate below 2/3.90 ≈ 0.51 converges, and α = 0.1 reaches the optimal MSE, 12.616, in 1,000 steps, while α = 0.7 diverges. The model is the same: a standardized feature is a linear function of the original, so predictions can be converted back. Since ŷ = Σ<em>w<sub>j</sub></em>(<em>x<sub>j</sub></em> − μ<sub><em>j</em></sub>)/σ<sub><em>j</em></sub> + <em>b</em>, the original weights are <em>w<sub>j</sub></em>/σ<sub><em>j</em></sub> and the bias is <em>b</em> − Σ <em>w<sub>j</sub></em>μ<sub><em>j</em></sub>/σ<sub><em>j</em></sub>:</p>
<pre><code>w, b = gradient_descent(Xs, y, 0.1, 1000)
w_orig = [wj / s for wj, s in zip(w, stds)]
b_orig = b - sum(wj * m / s for wj, m, s in zip(w, means, stds))
print([round(v, 3) for v in w_orig], round(b_orig, 3))   # [2.097, 3.612] 22.362</code></pre>
<p>These agree to within 0.001 with the exact optimum computed below, and more steps would close the gap. Two rules of practice: compute μ and σ on the <em>training</em> data only, and apply those same numbers to any new example before predicting.</p>

<h3>The normal equations</h3>
<p>For linear regression we don't need to walk downhill at all: the minimum is where the gradient is zero, and that gives a linear system. Put the bias into the weight vector by giving every example an extra feature that is always 1: <em>A</em> is the <em>n</em> × (<em>d</em> + 1) matrix with rows [1, <em>x</em><sub><em>i</em>1</sub>, …, <em>x<sub>id</sub></em>], and <strong>z</strong> = (<em>b</em>, <em>w</em><sub>1</sub>, …, <em>w<sub>d</sub></em>). The predictions are <em>A</em><strong>z</strong>, and the gradient above, written with matrices, is (2/<em>n</em>) <em>A</em><sup>T</sup>(<em>A</em><strong>z</strong> − <strong>y</strong>). (Entry <em>j</em> of <em>A</em><sup>T</sup><strong>v</strong> is Σ<sub><em>i</em></sub> <em>A<sub>ij</sub>v<sub>i</sub></em>, which with <strong>v</strong> the errors is the sum in ∂<em>L</em>/∂<em>w<sub>j</sub></em>.) Setting it to zero:</p>
<p class="math"><em>A</em><sup>T</sup><em>A</em> <strong>z</strong> = <em>A</em><sup>T</sup><strong>y</strong></p>
<p>These are exactly the <strong>normal equations</strong> of MATH 220 Lesson 6, which found the least-squares solution by projecting <strong>y</strong> onto the column space of <em>A</em>. Calculus and geometry give the same answer.</p>
<pre><code>A = [[1] + x for x in X]
AtA = [[sum(r[i] * r[j] for r in A) for j in range(3)] for i in range(3)]
Aty = [sum(r[i] * t for r, t in zip(A, y)) for i in range(3)]
print(AtA)   # [[6, 480, 15], [480, 41800, 1330], [15, 1330, 43]]
print(Aty)   # [1195, 103200, 3280]
</code></pre>
<p>The curvatures quoted earlier are the eigenvalues of <em>H</em> = (2/<em>n</em>) <em>A</em><sup>T</sup><em>A</em>, the roots of its characteristic equation det(<em>H</em> − λ<em>I</em>) = 0 (MATH 220 Lesson 7). With only the standard library we can find them by bisection (CS 101 Lesson 5, MATH 130 Lesson 4): scan λ from 0.001 to 100,000 in steps that multiply it by 10<sup>0.1</sup> each time, and wherever the determinant (by cofactor expansion, MATH 220 Lesson 4) changes sign, halve that step until it is tiny. A symmetric 3 × 3 matrix has three real eigenvalues (MATH 220 Lesson 8), so finding three sign changes means we have found them all.</p>
<pre><code>H = [[2 / len(A) * v for v in row] for row in AtA]   # the curvature matrix (2/n) AᵀA

def det3(M):
    (a, b, c), (d, e, f), (g, h, i) = M
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g)

def char(lam):                                      # det(H − λI)
    return det3([[H[i][j] - (lam if i == j else 0) for j in range(3)] for i in range(3)])

def bisect_root(lo, hi):                            # char(lo) and char(hi) differ in sign
    for _ in range(100):
        mid = (lo + hi) / 2
        if (char(lo) &gt; 0) == (char(mid) &gt; 0):
            lo = mid
        else:
            hi = mid
    return lo

grid = [10 ** (k / 10) for k in range(-30, 51)]
eigs = [bisect_root(a, b) for a, b in zip(grid, grid[1:]) if (char(a) &gt; 0) != (char(b) &gt; 0)]
print([round(v, 3) for v in eigs])   # [0.098, 0.291, 13949.277]</code></pre>
<p>Solving this 3 × 3 system by Gaussian elimination (MATH 220 Lesson 2; the programming problem writes it) gives <em>b</em> ≈ 22.361, <em>w</em><sub>1</sub> ≈ 2.097 per square metre and <em>w</em><sub>2</sub> ≈ 3.611 per room, the same numbers gradient descent found. The gradient there is zero up to rounding, and the MSE is the minimum, 12.62:</p>
<pre><code>z = [22.3611111111111, 2.0972222222222223, 3.611111111111115]
gw, gb = gradient(z[1:], z[0], X, y)
print(max(abs(g) for g in gw + [gb]) &lt; 1e-9, round(mse(z[1:], z[0], X, y), 2))   # True 12.62</code></pre>
<p>Which method to use? Forming <em>A</em><sup>T</sup><em>A</em> costs O(<em>nd</em><sup>2</sup>) and solving it O(<em>d</em><sup>3</sup>), with no learning rate to tune: the right choice for up to a few thousand features. A step of gradient descent costs O(<em>nd</em>), so it wins when <em>d</em> is huge, and it is the only choice once the model isn't linear (Lessons 5 and 7), because then setting the gradient to zero gives equations nobody can solve. If two features are exactly proportional (area in m² and in square feet), the columns of <em>A</em> are dependent, <em>A</em><sup>T</sup><em>A</em> isn't invertible, and there are infinitely many best weights: MATH 220 Lesson 6's normal equations still have a solution, and adding any vector of <em>A</em>'s null space (MATH 220 Lesson 5) to it gives another.</p>
<p>Be careful reading weights as causes. Area and rooms are strongly correlated here (correlation 0.95: bigger houses have more rooms), so the data can't separate their effects well; "3.6 thousand per room" means "per extra room <em>at the same area</em>", a comparison the data barely contains. And as MATH 230 Lesson 8 warned, a regression on observational data shows association, not causation.</p>

<h3>Features</h3>
<p>"Linear" means linear in the <em>parameters</em>, not in the original inputs. We can feed the model any features computed from the inputs:</p>
<ul>
<li><strong>Polynomial features</strong>: from one input <em>x</em>, use [<em>x</em>, <em>x</em><sup>2</sup>, <em>x</em><sup>3</sup>] and the model fits a cubic. The training procedure is unchanged.</li>
<li><strong>Categorical features</strong>: a value from a set, like the neighbourhood {north, south, east}, becomes a <strong>one-hot</strong> vector with one 0/1 feature per category: north is [1, 0, 0]. Coding it as 1, 2, 3 would claim that east is "three times" north.</li>
<li><strong>Interactions</strong>: a product such as area × (neighbourhood = north) lets the price per square metre differ by neighbourhood.</li>
</ul>
<p>Choosing features is where knowledge of the problem enters a learning system. More features fit the training data better, but too many fit its noise: MATH 230 Lesson 8's degree-5 polynomial through six points. Lesson 5 shows how to detect this and how to rein it in.</p>

<h3>Stochastic and mini-batch gradient descent</h3>
<p>Each step above used every training example. With a million examples, that is a million predictions per step. <strong>Stochastic gradient descent</strong> (SGD) instead estimates the gradient from a small <strong>mini-batch</strong> of examples, often 32 to 1,000, and takes a step after each batch; one pass through all the training data is an <strong>epoch</strong>. Each estimate is noisy, but it is right on average (the average of the batch gradients over an epoch is close to the full gradient), and a million examples give thousands of steps per epoch instead of one. The noise means the parameters jitter around the minimum rather than settling, so the learning rate is usually lowered as training goes on. Real implementations also shuffle the examples each epoch, so that batches aren't biased by the order of the data. Mini-batch SGD, with gradients computed automatically (Lesson 7), is how essentially every large model is trained.</p>
`,
      terms: [
        ["Supervised learning", "Learning a function from examples that come with the correct answers (labels)."],
        ["Feature", "A number describing an example, used as an input to a model."],
        ["Regression", "Supervised learning in which the label is a number."],
        ["Parameters", "The numbers a training procedure chooses, such as a linear model's weights and bias."],
        ["Loss function", "A measure of how wrong a prediction is; training minimizes its average on the training data."],
        ["Mean squared error", "The average of (prediction − target)² over a set of examples."],
        ["Generalization", "Performing well on data the model wasn't trained on."],
        ["Learning rate", "The step size α in gradient descent; too large diverges, too small crawls."],
        ["Condition number", "The ratio of the largest to the smallest curvature of the loss; gradient descent needs roughly that many steps."],
        ["Standardization", "Replacing a feature x by (x − μ)/σ, using the training set's mean and standard deviation."],
        ["Normal equations", "AᵀA z = Aᵀy: setting the gradient of the squared error to zero."],
        ["One-hot encoding", "Representing a category by a vector with a 1 in that category's position and 0 elsewhere."],
        ["Mini-batch gradient descent", "Stepping after each small batch of examples, using the gradient on that batch."],
        ["Epoch", "One pass through all the training examples."]
      ],
      quiz: [
        { q: "With w = (2, 3) and b = 20, what does the model predict for a house of 60 m² with 2 rooms?", choices: ["140", "146", "126", "185"], answer: 1, why: "2 × 60 + 3 × 2 + 20 = 146." },
        { q: "For the squared loss, ∂L/∂w_j is (2/n) Σ (ŷ_i − y_i) times what?", choices: ["w_j", "x_ij, the jth feature of example i", "y_i", "1"], answer: 1, why: "By the chain rule, the derivative of ŷ_i with respect to w_j is x_ij." },
        { q: "Why did gradient descent on the unscaled house data crawl?", choices: ["The loss has many local minima", "The loss bowl is very elongated, so a rate small enough for the steep direction makes no progress along the shallow one", "The learning rate was too large", "The data has too few examples"], answer: 1, why: "Curvatures of about 13,949 and 0.098: a condition number near 140,000." },
        { q: "After standardizing on the training set, what do you do to a new example before predicting?", choices: ["Standardize it with its own mean and standard deviation", "Standardize it with the training set's mean and standard deviation", "Nothing", "Divide it by the number of features"], answer: 1, why: "The weights were learned for features scaled by the training statistics." },
        { q: "The normal equations AᵀAz = Aᵀy come from:", choices: ["Setting the gradient of the squared error to zero", "Taking one step of gradient descent", "Standardizing the features", "Maximizing the loss"], answer: 0, why: "The gradient is (2/n)Aᵀ(Az − y); MATH 220 found the same equations by projection." },
        { q: "One epoch of mini-batch gradient descent with 10,000 examples and batches of 100 takes how many steps?", choices: ["1", "100", "10,000", "1,000,000"], answer: 1, why: "10,000 / 100 batches, one step each." }
      ],
      practice: [
        {
          q: `<p>Do one step of gradient descent by hand for the one-feature data (0, 1), (1, 3), (2, 4), (3, 6), starting from <em>w</em> = <em>b</em> = 0 with α = 0.1. Compute the gradient, the new parameters and the MSE before and after.</p>`,
          a: `<p>All predictions are 0, so the errors are −1, −3, −4, −6. ∂<em>L</em>/∂<em>w</em> = (2/4)(−1·0 − 3·1 − 4·2 − 6·3) = 0.5 × (−29) = −14.5; ∂<em>L</em>/∂<em>b</em> = 0.5 × (−14) = −7. New <em>w</em> = 0 + 0.1 × 14.5 = 1.45, <em>b</em> = 0.7. MSE before: (1 + 9 + 16 + 36)/4 = 15.5. After: predictions 0.7, 2.15, 3.6, 5.05, errors −0.3, −0.85, −0.4, −0.95, MSE = (0.09 + 0.7225 + 0.16 + 0.9025)/4 ≈ 0.469.</p>
<pre><code>print(gradient([0.0], 0.0, [[0], [1], [2], [3]], [1, 3, 4, 6]))      # ([-14.5], -7.0)
print(round(mse([1.45], 0.7, [[0], [1], [2], [3]], [1, 3, 4, 6]), 4))   # 0.4688</code></pre>`
        },
        {
          q: `<p>Show that the bias's partial derivative being 0 at the optimum means the errors ŷ<sub><em>i</em></sub> − <em>y<sub>i</sub></em> add up to 0. What does that say about the mean prediction? Check it on the house data with the weights from the normal equations.</p>`,
          a: `<p>∂<em>L</em>/∂<em>b</em> = (2/<em>n</em>) Σ (ŷ<sub><em>i</em></sub> − <em>y<sub>i</sub></em>) = 0 exactly when Σ ŷ<sub><em>i</em></sub> = Σ <em>y<sub>i</sub></em>: on the training set, the predictions have the same mean as the targets (MATH 230 Lesson 8's fact that the line passes through the means).</p>
<pre><code>preds = [predict(z[1:], z[0], x) for x in X]
print(round(sum(preds) - sum(y), 9), round(sum(preds) / 6, 3))   # 0.0 199.167</code></pre>`
        },
        {
          q: `<p>Encode houses with features area, rooms and neighbourhood ∈ {north, south, east} for a linear model. If you one-hot encode the neighbourhood with three columns and also keep the column of ones for the bias, the normal equations stop having a unique solution. Why, and what is the usual fix?</p>`,
          a: `<p>Every house is in exactly one neighbourhood, so the three one-hot columns add up to the column of ones: the columns of <em>A</em> are linearly dependent, <em>A</em><sup>T</sup><em>A</em> is singular, and adding any constant to the three neighbourhood weights while subtracting it from the bias gives the same predictions. The fix is to drop one category's column (it becomes the baseline that the others are compared with), or to keep all three and drop the bias. Regularization (Lesson 5) also restores a unique answer.</p>`
        },
        {
          q: `<p>Gradient descent on standardized features with α = 0.7 diverged, while α = 0.5 converged. Using the curvatures 3.90, 2 and 0.099, explain both, and estimate how many steps α = 0.5 needs to shrink the error along the shallowest direction by a factor of 1,000.</p>`,
          hint: `<p>Along a direction of curvature λ, each step multiplies the distance from the minimum by 1 − αλ.</p>`,
          a: `<p>Along the steepest direction the factor is 1 − 0.7 × 3.90 = −1.73: the distance grows by 73% per step, flipping sign each time, so the loss explodes. With α = 0.5 it is 1 − 1.95 = −0.95, which shrinks (slowly, while oscillating). Along the shallowest direction, α = 0.5 gives 1 − 0.5 × 0.099 ≈ 0.95, and 0.95<sup><em>k</em></sup> = 0.001 needs <em>k</em> = ln 1000 / −ln 0.95 ≈ 6.9/0.051 ≈ 136 steps.</p>`
        }
      ],
      sources: ["isl", "goodfellow", "mit1806", "aima"]
    },
    {
      id: "ml5",
      title: "Classification and honest evaluation",
      minutes: 90,
      summary: "Logistic regression: the sigmoid, probabilities as log-odds, the cross-entropy loss from maximum likelihood and its gradient. k-nearest neighbours. Overfitting, training, validation and test sets, and cross-validation; L2 regularization. Confusion matrices, precision, recall and F1, and why accuracy misleads when classes are rare.",
      notes: `
<p>In classification the label is a category. This lesson takes the common case of two classes, written 1 (positive: spam, disease, fraud) and 0 (negative), and builds two very different classifiers: one that learns a few parameters, and one that keeps all the data. Then it turns to the question that matters more than any algorithm: how to tell whether a classifier is any good.</p>

<h3>Logistic regression</h3>
<p>A linear score <em>z</em> = <strong>w</strong> · <strong>x</strong> + <em>b</em> can classify by its sign: predict 1 if <em>z</em> &gt; 0. The points with <em>z</em> = 0 form the <strong>decision boundary</strong>, a line in two dimensions and a hyperplane in more. But we would like a probability, not just a side of a line, and a loss that gradient descent can minimize. Squash the score into (0, 1) with the <strong>sigmoid</strong> (logistic) function, which you met in MATH 131 Lesson 6:</p>
<p class="math">σ(<em>z</em>) = 1 / (1 + e<sup>−<em>z</em></sup>),     P(<em>y</em> = 1 | <strong>x</strong>) = <em>p</em> = σ(<strong>w</strong> · <strong>x</strong> + <em>b</em>).</p>
<p>σ(0) = 0.5, σ(<em>z</em>) → 1 as <em>z</em> → ∞ and → 0 as <em>z</em> → −∞, and σ(−<em>z</em>) = 1 − σ(<em>z</em>). Solving <em>p</em> = σ(<em>z</em>) for <em>z</em> gives <em>z</em> = ln(<em>p</em>/(1 − <em>p</em>)), the log of the odds (MATH 230 Lesson 1): logistic regression models the <strong>log-odds</strong> as a linear function of the features. Each unit of feature <em>x<sub>j</sub></em> adds <em>w<sub>j</sub></em> to the log-odds, multiplying the odds by e<sup><em>w<sub>j</sub></em></sup>, just as each word multiplied the odds in MATH 230's spam filter.</p>
<p><strong>The loss.</strong> Choose the parameters by maximum likelihood (MATH 230 Lesson 6): make the observed labels as probable as possible. The model gives label 1 probability <em>p<sub>i</sub></em> and label 0 probability 1 − <em>p<sub>i</sub></em>, which can be written in one expression as <em>p<sub>i</sub><sup>y<sub>i</sub></sup></em>(1 − <em>p<sub>i</sub></em>)<sup>1−<em>y<sub>i</sub></em></sup>. The examples are treated as independent, so the likelihood is the product over <em>i</em>. Taking −log and averaging turns the product into the <strong>cross-entropy loss</strong> (or <em>log loss</em>):</p>
<p class="math"><em>L</em> = −(1/<em>n</em>) Σ<sub><em>i</em></sub> [ <em>y<sub>i</sub></em> ln <em>p<sub>i</sub></em> + (1 − <em>y<sub>i</sub></em>) ln(1 − <em>p<sub>i</sub></em>) ]</p>
<p>Only one term is nonzero per example: −ln <em>p<sub>i</sub></em> for a positive, −ln(1 − <em>p<sub>i</sub></em>) for a negative. A confident right answer costs almost nothing (−ln 0.99 ≈ 0.01), a confident wrong one a lot (−ln 0.01 ≈ 4.6), and a certain wrong one infinitely much. Predicting 0.5 for everything costs ln 2 ≈ 0.693 per example.</p>
<p><strong>The gradient.</strong> First, σ′(<em>z</em>) = e<sup>−<em>z</em></sup>/(1 + e<sup>−<em>z</em></sup>)² = σ(<em>z</em>)(1 − σ(<em>z</em>)), because 1 − σ(<em>z</em>) = e<sup>−<em>z</em></sup>/(1 + e<sup>−<em>z</em></sup>). For one positive example the loss is −ln σ(<em>z</em>), whose derivative with respect to <em>z</em> is −σ′(<em>z</em>)/σ(<em>z</em>) = −(1 − <em>p</em>) = <em>p</em> − 1. For a negative it is −ln(1 − σ(<em>z</em>)), with derivative σ′(<em>z</em>)/(1 − σ(<em>z</em>)) = <em>p</em>. Both cases are <em>p</em> − <em>y</em>. Since ∂<em>z</em>/∂<em>w<sub>j</sub></em> = <em>x<sub>j</sub></em> and ∂<em>z</em>/∂<em>b</em> = 1, the chain rule gives</p>
<p class="math">∂<em>L</em>/∂<em>w<sub>j</sub></em> = (1/<em>n</em>) Σ<sub><em>i</em></sub> (<em>p<sub>i</sub></em> − <em>y<sub>i</sub></em>) <em>x<sub>ij</sub></em>,     ∂<em>L</em>/∂<em>b</em> = (1/<em>n</em>) Σ<sub><em>i</em></sub> (<em>p<sub>i</sub></em> − <em>y<sub>i</sub></em>).</p>
<p>This is Lesson 4's gradient with the prediction now a probability (and no factor 2, which came from the square). The cross-entropy of logistic regression is convex, so gradient descent finds the global minimum; but setting the gradient to zero gives equations with no closed-form solution, so unlike linear regression there is no normal-equation shortcut. (Squared error with a sigmoid would not be convex, and its gradient vanishes when the model is confidently wrong. That's why cross-entropy is used.)</p>
<p>Ten students' hours of study and whether they passed:</p>
<pre><code>import math

hours = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]
passed = [0, 0, 0, 0, 1, 0, 1, 1, 1, 1]

def sigmoid(z):
    return 1 / (1 + math.exp(-z))

def cross_entropy(w, b, xs, ys):
    total = 0.0
    for x, t in zip(xs, ys):
        p = sigmoid(w * x + b)
        total -= t * math.log(p) + (1 - t) * math.log(1 - p)
    return total / len(xs)

def train_logistic(xs, ys, rate, steps, lam=0.0):
    w, b, n = 0.0, 0.0, len(xs)
    for _ in range(steps):
        gw = sum((sigmoid(w * x + b) - t) * x for x, t in zip(xs, ys)) / n + 2 * lam * w
        gb = sum(sigmoid(w * x + b) - t for x, t in zip(xs, ys)) / n
        w, b = w - rate * gw, b - rate * gb
    return w, b

w, b = train_logistic(hours, passed, 0.5, 5000)
print(round(w, 3), round(b, 3), round(-b / w, 2))     # 2.603 -7.159 2.75
print(round(cross_entropy(0, 0, hours, passed), 3), round(cross_entropy(w, b, hours, passed), 3))   # 0.693 0.251
print([round(sigmoid(w * x + b), 2) for x in (1.0, 2.75, 4.0)])   # [0.01, 0.5, 0.96]</code></pre>
<p>(The <code>lam</code> parameter is for regularization, below; here it is 0.) The boundary, where <em>p</em> = 0.5, is at <em>x</em> = −<em>b</em>/<em>w</em> = 2.75 hours. Each extra hour multiplies the odds of passing by e<sup>2.603</sup> ≈ 13.5. Note <code>math.exp(-z)</code> overflows for <em>z</em> below about −709; a careful sigmoid uses e<sup><em>z</em></sup>/(1 + e<sup><em>z</em></sup>) for negative <em>z</em> (the programming problem asks for it). That is Lesson 3's log-sum-exp subtraction: σ(<em>z</em>) = e<sup><em>z</em></sup>/(e<sup><em>z</em></sup> + e<sup>0</sup>) normalizes the two scores <em>z</em> and 0, and subtracting the larger score from both before exponentiating gives 1/(1 + e<sup>−<em>z</em></sup>) when <em>z</em> ≥ 0 (subtract <em>z</em>) and e<sup><em>z</em></sup>/(1 + e<sup><em>z</em></sup>) when <em>z</em> &lt; 0 (subtract 0), so no exponent is ever positive.</p>

<h3>k-nearest neighbours</h3>
<p>A completely different idea: don't fit parameters at all. To classify <strong>x</strong>, find the <em>k</em> training examples closest to it and take a majority vote of their labels. This is <strong>k-nearest neighbours</strong> (k-NN). Training is just storing the data.</p>
<pre><code>from collections import Counter

train = [((1, 2), "red"), ((2, 1), "red"), ((2, 3), "red"), ((3, 2), "red"), ((6, 6), "red"),
         ((6, 5), "blue"), ((7, 7), "blue"), ((5, 7), "blue"), ((7, 6), "blue")]

def knn(train, x, k):
    by_distance = sorted(train, key=lambda ex: math.dist(ex[0], x))
    votes = Counter(label for _, label in by_distance[:k])
    return votes.most_common(1)[0][0]

print(knn(train, (6.2, 6.1), 1), knn(train, (6.2, 6.1), 3))   # red blue</code></pre>
<p>(<code>math.dist</code> is the Euclidean distance; <code>Counter.most_common(1)</code> returns the most frequent label, as a list of one (label, count) pair.) Ties are broken by order: <code>sorted</code> is stable, so training examples at equal distance stay in their order in <code>train</code> and the one listed first counts as nearer; and among equally frequent labels, <code>most_common</code> returns the one counted first. The red point at (6, 6) sits among the blues, perhaps a mislabelled example. With <em>k</em> = 1 the query next to it is called red; with <em>k</em> = 3 its two blue neighbours outvote it. Small <em>k</em> follows every quirk of the data; large <em>k</em> smooths them away, and with <em>k</em> = <em>n</em> every query gets the majority label.</p>
<p>k-NN needs no training and can learn any shape of boundary, but it pays at prediction time: each query compares against all <em>n</em> examples, O(<em>nd</em>). Distances depend on units, so features must be scaled (Lesson 4): measured in grams, weight would swamp a height measured in metres. And in many dimensions everything is far from everything, so "nearest" means less (the <em>curse of dimensionality</em>).</p>

<h3>Overfitting and held-out data</h3>
<p>How accurate is 1-NN on its own training data? Perfect: each training point's nearest neighbour is itself. That number says nothing about new data. A model can always score well on the examples it was fitted to, by memorizing them; <strong>overfitting</strong> (MATH 230 Lesson 8) is fitting the noise in the training data, so that performance on new data suffers. Its opposite, <strong>underfitting</strong>, is a model too simple to capture the pattern. The only trustworthy measure of generalization is performance on data the model never saw. The standard protocol splits the data three ways:</p>
<ul>
<li>a <strong>training set</strong>, to fit the parameters;</li>
<li>a <strong>validation set</strong>, to choose among models and <strong>hyperparameters</strong>, the settings that aren't learned by training, such as <em>k</em>, the learning rate or the regularization strength λ;</li>
<li>a <strong>test set</strong>, used <em>once</em>, at the end, to report performance.</li>
</ul>
<p>If the test set guides any choice, even "try another model because the test score was disappointing", it has become a validation set, and the reported score is optimistic. This leak is one of the most common errors in published machine learning.</p>
<p>With little data, a single validation split wastes examples and gives a noisy estimate. <strong>k-fold cross-validation</strong> splits the data into <em>k</em> parts (folds), trains on <em>k</em> − 1 of them and validates on the remaining one, rotates through all <em>k</em> choices, and averages. With <em>k</em> = <em>n</em>, each fold is one example: <strong>leave-one-out</strong> cross-validation. For the nine points above, predicting each from the other eight:</p>
<table>
<tr><th><em>k</em> neighbours</th><th>1</th><th>3</th><th>5</th><th>7</th></tr>
<tr><td>Training accuracy</td><td>9/9</td><td>8/9</td><td>8/9</td><td>8/9</td></tr>
<tr><td>Leave-one-out accuracy</td><td>5/9</td><td>8/9</td><td>8/9</td><td>4/9</td></tr>
</table>
<p>1-NN overfits: perfect on its training data, 56% on held-out points. 7-NN underfits: with 8 training points left, a vote of 7 of them nearly always follows the overall majority. <em>k</em> = 3 or 5 is best. Training accuracy alone would have chosen <em>k</em> = 1.</p>

<h3>Regularization</h3>
<p>Some data can be split perfectly by a line, like these six points: 1, 2, 3 labelled 0 and 4, 5, 6 labelled 1. Then logistic regression never stops: making <em>w</em> larger makes every <em>p<sub>i</sub></em> closer to its label, so the loss keeps falling toward 0 and the weights grow without limit.</p>
<pre><code>sx, sy = [1, 2, 3, 4, 5, 6], [0, 0, 0, 1, 1, 1]
for steps in (1000, 10000, 100000):
    w, b = train_logistic(sx, sy, 0.5, steps)
    w2, b2 = train_logistic(sx, sy, 0.5, steps, lam=0.01)
    print(steps, round(w, 2), round(w2, 3), round(-b2 / w2, 3))</code></pre>
<pre data-label="Output"><code>1000 3.22 2.362 3.487
10000 6.95 2.504 3.5
100000 11.51 2.504 3.5</code></pre>
<p>Huge weights mean extreme confidence: a point at 3.6 would be called certain to pass, which this data can't justify. <strong>L2 regularization</strong> adds a penalty on the size of the weights to the loss, <em>L</em> + λ Σ<sub><em>j</em></sub> <em>w<sub>j</sub></em><sup>2</sup>, which adds 2λ<em>w<sub>j</sub></em> to each weight's gradient (that is the <code>lam</code> term in the code). The penalty doesn't usually include the bias. Now the loss has a minimum at a moderate weight, 2.504, with the boundary exactly halfway between the classes, at 3.5. Regularization pulls the model toward simpler functions; for linear regression it is called <em>ridge regression</em>, and it also cures Lesson 4's singular <em>A</em><sup>T</sup><em>A</em>. Setting the gradient of MSE + λ Σ<em>w<sub>j</sub></em><sup>2</sup> to zero, as in Lesson 4, gives (2/<em>n</em>) <em>A</em><sup>T</sup>(<em>A</em><strong>z</strong> − <strong>y</strong>) + 2λ<em>D</em><strong>z</strong> = 0, that is (<em>A</em><sup>T</sup><em>A</em> + <em>n</em>λ<em>D</em>) <strong>z</strong> = <em>A</em><sup>T</sup><strong>y</strong>, where <em>D</em> is the identity matrix with a 0 in the bias's position. This matrix is invertible for any λ &gt; 0: if it sent some <strong>z</strong> to <strong>0</strong>, then <strong>z</strong> · (<em>A</em><sup>T</sup><em>A</em> + <em>n</em>λ<em>D</em>)<strong>z</strong> = |<em>A</em><strong>z</strong>|<sup>2</sup> + <em>n</em>λ Σ<em>w<sub>j</sub></em><sup>2</sup> would be 0, which forces every weight to 0 and then <em>A</em><strong>z</strong> = <em>b</em>(1, …, 1) = <strong>0</strong>, so <em>b</em> = 0 too. λ is a hyperparameter: too small and the model overfits, too large and it underfits. Choose it on validation data.</p>

<h3>Measuring a classifier</h3>
<p>A classifier's results on a test set fill a <strong>confusion matrix</strong>:</p>
<table>
<tr><th></th><th>predicted 1</th><th>predicted 0</th></tr>
<tr><th>actually 1</th><td>true positives (TP)</td><td>false negatives (FN)</td></tr>
<tr><th>actually 0</th><td>false positives (FP)</td><td>true negatives (TN)</td></tr>
</table>
<ul>
<li><strong>Accuracy</strong> = (TP + TN)/total: the fraction right.</li>
<li><strong>Precision</strong> = TP/(TP + FP): of the cases flagged positive, the fraction that are.</li>
<li><strong>Recall</strong> (sensitivity) = TP/(TP + FN): of the real positives, the fraction found.</li>
<li><strong>F1</strong> = 2PR/(P + R), the harmonic mean of precision <em>P</em> and recall <em>R</em>, a single number that is high only when both are.</li>
</ul>
<p>Take a screening test for a condition that 1% of people have, applied to 10,000 people. It finds 90 of the 100 who have it, and wrongly flags 5% of the 9,900 who don't:</p>
<table>
<tr><th></th><th>predicted 1</th><th>predicted 0</th></tr>
<tr><th>actually 1</th><td>90</td><td>10</td></tr>
<tr><th>actually 0</th><td>495</td><td>9,405</td></tr>
</table>
<p>Accuracy is (90 + 9,405)/10,000 = 94.95%, recall 90%, but precision only 90/585 ≈ 15.4%: most people flagged are healthy, MATH 230 Lesson 1's base-rate effect. And a "classifier" that says no to everyone scores 99% accuracy with 0 recall. When one class is rare, accuracy is close to meaningless; report precision and recall, and always compare with the base rate.</p>
<p>Most classifiers output a score, such as logistic regression's <em>p</em>, and the 0.5 threshold is a choice. Raising it flags fewer cases: precision usually rises and recall falls. Which matters more depends on the costs. Missing a cancer is worse than a second test; flagging an innocent person as a fraudster has its own costs. The <em>ROC curve</em> plots the <em>true-positive rate</em> TP/(TP + FN), which is recall, against the <em>false-positive rate</em> FP/(FP + TN), the fraction of actual negatives that are wrongly flagged (495/9,900 = 5% in the example above), as the threshold moves, summarizing every trade-off at once. And as CS 100 Lesson 5 stressed, report these numbers separately for each group of people the system affects: a good overall precision can hide a poor one for some group.</p>
`,
      terms: [
        ["Classification", "Supervised learning in which the label is a category."],
        ["Decision boundary", "The set of inputs where the classifier switches between classes; for a linear score, w · x + b = 0."],
        ["Sigmoid", "σ(z) = 1/(1 + e^(−z)), which maps any number into (0, 1)."],
        ["Logistic regression", "A classifier modelling P(y = 1 | x) = σ(w · x + b), so the log-odds are linear in the features."],
        ["Cross-entropy loss", "−[y ln p + (1 − y) ln(1 − p)] averaged over examples: the negative log-likelihood of the labels."],
        ["k-nearest neighbours", "Classifying a point by a majority vote of the k training examples closest to it."],
        ["Overfitting", "Fitting the noise in the training data, so performance on new data is worse."],
        ["Hyperparameter", "A setting chosen before training, such as k, the learning rate or λ, tuned on validation data."],
        ["Validation set", "Held-out data used to choose models and hyperparameters."],
        ["Test set", "Held-out data used once, at the end, to report performance."],
        ["Cross-validation", "Rotating which part of the data is held out and averaging the results; leave-one-out holds out one example at a time."],
        ["L2 regularization", "Adding λ times the sum of squared weights to the loss, which keeps weights small."],
        ["Confusion matrix", "The counts of true positives, false positives, false negatives and true negatives."],
        ["Precision and recall", "TP/(TP + FP), the fraction of flagged cases that are positive; TP/(TP + FN), the fraction of positives found."]
      ],
      quiz: [
        { q: "Logistic regression gives w · x + b = 0 for some input. What probability does it predict?", choices: ["0", "0.5", "1", "It depends on w"], answer: 1, why: "σ(0) = 0.5: the input is on the decision boundary." },
        { q: "For one example, the derivative of the cross-entropy loss with respect to the score z is:", choices: ["p(1 − p)", "p − y", "(p − y)²", "y/p"], answer: 1, why: "−(1 − p) for a positive and p for a negative: both p − y." },
        { q: "1-NN has 100% training accuracy. What does that tell you about its accuracy on new data?", choices: ["It is also 100%", "Nothing: each training point is its own nearest neighbour", "It is at least 90%", "It is 50%"], answer: 1, why: "Training accuracy measures memorization here, not generalization." },
        { q: "You tried ten values of k and kept the one with the best test-set accuracy. What is wrong?", choices: ["Nothing", "The test set was used to choose a hyperparameter, so its score is now optimistic", "k must be even", "You should have used training accuracy"], answer: 1, why: "Choices belong to the validation set or cross-validation; the test set is for one final report." },
        { q: "What does L2 regularization add to the gradient of weight w_j?", choices: ["λ", "2λw_j", "λ/w_j", "Nothing"], answer: 1, why: "The derivative of λw_j² is 2λw_j." },
        { q: "A fraud detector flags 200 transactions, of which 50 are fraud, and misses 50 other frauds. Precision and recall?", choices: ["0.25 and 0.5", "0.5 and 0.25", "0.25 and 0.25", "0.5 and 0.5"], answer: 0, why: "Precision 50/200; recall 50/(50 + 50)." }
      ],
      practice: [
        {
          q: `<p>Using the trained study-hours model (<em>w</em> ≈ 2.603, <em>b</em> ≈ −7.159), compute by hand the cross-entropy loss of the student who studied 3 hours and failed, and of the one who studied 2.5 hours and passed. Which examples contribute most of the final loss 0.251?</p>`,
          a: `<p>At 3 hours, <em>z</em> = 2.603 × 3 − 7.159 = 0.650, <em>p</em> = σ(0.650) ≈ 0.657; the label is 0, so the loss is −ln(1 − 0.657) ≈ 1.07. At 2.5 hours, <em>z</em> = −0.652, <em>p</em> ≈ 0.343; the label is 1, so the loss is −ln 0.343 ≈ 1.07. By symmetry (the data are symmetric about 2.75) they are equal. Together they contribute 2.14 of the total 10 × 0.251 = 2.51: the two exceptions dominate the loss, which is typical.</p>
<pre><code>w, b = train_logistic(hours, passed, 0.5, 5000)
print(round(-math.log(1 - sigmoid(3 * w + b)), 2), round(-math.log(sigmoid(2.5 * w + b)), 2))   # 1.07 1.07</code></pre>`
        },
        {
          q: `<p>Explain why the leave-one-out accuracy of 1-NN on the nine points is 5/9: which points does it get wrong, and why?</p>`,
          a: `<p>Predict each point from the other eight. The four red points on the left each have a red neighbour at distance √2 ≈ 1.41: right. Held out, (6, 6) (red) has nearest neighbour (6, 5) at distance 1, which is blue: wrong. For the blues, (6, 6) is now in the training set and is labelled red. It is the nearest point to (6, 5) (distance 1) and to (5, 7) (distance √2, against 2 for (7, 7)): both wrong. For (7, 6), (6, 6) and (7, 7) are both at distance 1; <code>sorted</code> keeps the training order on ties, and (6, 6) comes first, so it is wrong too. Only (7, 7), whose nearest neighbour is (7, 6) at distance 1, is right. The code confirms it:</p>
<pre><code>for i, (x, t) in enumerate(train):
    print(x, t, knn(train[:i] + train[i + 1:], x, 1))</code></pre>
<pre data-label="Output"><code>(1, 2) red red
(2, 1) red red
(2, 3) red red
(3, 2) red red
(6, 6) red blue
(6, 5) blue red
(7, 7) blue blue
(5, 7) blue red
(7, 6) blue red</code></pre>
<p>Wrong: (6, 6), (6, 5), (5, 7) and (7, 6). The single mislabelled point corrupts three of its neighbours' predictions as well as its own. That is how one noisy example hurts 1-NN, and why larger <em>k</em> helps.</p>`
        },
        {
          q: `<p>A disease affects 0.1% of a population. A test has recall 99% and a false-positive rate of 1%. For 1,000,000 people, fill in the confusion matrix and compute accuracy, precision and recall. What would you tell someone who tests positive?</p>`,
          a: `<p>1,000 have the disease: TP = 990, FN = 10. 999,000 don't: FP = 9,990, TN = 989,010. Accuracy = (990 + 989,010)/1,000,000 = 99.0%. Recall = 99%. Precision = 990/(990 + 9,990) ≈ 9.0%. A positive result raises the probability of disease from 0.1% to about 9%: worth taking seriously and confirming with a second, independent test, but far from a diagnosis.</p>`
        },
        {
          q: `<p>A separate test set has been set aside and not looked at. With 5-fold cross-validation on the remaining 1,000 training examples, how many models are trained, and on how many examples each? You compare 4 values of λ: how many models now? After choosing λ, what do you train the final model on, and what number do you report?</p>`,
          a: `<p>5 models, each on 800 examples (validated on the other 200). With 4 values of λ, 20 models. Choose the λ with the best average validation score, then train once more on all the training data with that λ. Report its score on a separate test set that played no part in any of this; the cross-validation score of the chosen λ is slightly optimistic, because it was the best of four. (Had all the data gone into cross-validation, there would be no honest number to report: the fix is to hold out a test set before choosing anything.)</p>`
        }
      ],
      sources: ["isl", "aima", "goodfellow", "obermeyer19"]
    },
    {
      id: "ml6",
      title: "Decision trees, ensembles and clustering",
      minutes: 90,
      summary: "Decision trees: entropy, information gain and the greedy ID3 algorithm, worked on a 14-day weather table; numeric thresholds, overfitting and how trees are kept small. Ensembles: bootstrap samples, bagging and random forests, and why averaging helps; boosting in brief. Unsupervised learning: the k-means objective, Lloyd's algorithm, why it converges, and its local minima.",
      notes: `
<p>Lessons 4 and 5's models were weighted sums of the features. This lesson's first model asks a sequence of questions instead, like a doctor or a help-desk script. It handles categorical and numeric features without scaling, its predictions can be explained step by step, and combined in large numbers, trees are among the most accurate methods known for tabular data. The lesson ends with learning when there are no labels at all.</p>

<h3>Decision trees</h3>
<p>A <strong>decision tree</strong> classifies an example by starting at the root and following one branch at each internal node, according to the value of the feature that node tests, until it reaches a leaf, which gives the prediction. Our data: fourteen days, each described by four features, and whether a game of tennis was played. This table, from J. Ross Quinlan's 1986 paper on decision trees, is the standard small example.</p>
<table>
<tr><th>Day</th><th>Outlook</th><th>Temperature</th><th>Humidity</th><th>Wind</th><th>Play</th></tr>
<tr><td>1</td><td>sunny</td><td>hot</td><td>high</td><td>weak</td><td>no</td></tr>
<tr><td>2</td><td>sunny</td><td>hot</td><td>high</td><td>strong</td><td>no</td></tr>
<tr><td>3</td><td>overcast</td><td>hot</td><td>high</td><td>weak</td><td>yes</td></tr>
<tr><td>4</td><td>rain</td><td>mild</td><td>high</td><td>weak</td><td>yes</td></tr>
<tr><td>5</td><td>rain</td><td>cool</td><td>normal</td><td>weak</td><td>yes</td></tr>
<tr><td>6</td><td>rain</td><td>cool</td><td>normal</td><td>strong</td><td>no</td></tr>
<tr><td>7</td><td>overcast</td><td>cool</td><td>normal</td><td>strong</td><td>yes</td></tr>
<tr><td>8</td><td>sunny</td><td>mild</td><td>high</td><td>weak</td><td>no</td></tr>
<tr><td>9</td><td>sunny</td><td>cool</td><td>normal</td><td>weak</td><td>yes</td></tr>
<tr><td>10</td><td>rain</td><td>mild</td><td>normal</td><td>weak</td><td>yes</td></tr>
<tr><td>11</td><td>sunny</td><td>mild</td><td>normal</td><td>strong</td><td>yes</td></tr>
<tr><td>12</td><td>overcast</td><td>mild</td><td>high</td><td>strong</td><td>yes</td></tr>
<tr><td>13</td><td>overcast</td><td>hot</td><td>normal</td><td>weak</td><td>yes</td></tr>
<tr><td>14</td><td>rain</td><td>mild</td><td>high</td><td>strong</td><td>no</td></tr>
</table>
<p>Many trees are consistent with these 14 days. A tree that tests every feature in a fixed order would have up to 3 × 3 × 2 × 2 = 36 leaves and memorize the table. We want a small tree, on the principle that a short explanation of the data is more likely to hold for new days. Finding the smallest consistent tree is NP-hard, so trees are built greedily: choose the most informative test for the root, split the data by it, and repeat on each part. "Most informative" needs a measure of how mixed a set of labels is.</p>

<h3>Entropy</h3>
<p>The <strong>entropy</strong> of a set of labels in which the classes occur with fractions <em>p</em><sub>1</sub>, …, <em>p<sub>k</sub></em> is</p>
<p class="math"><em>H</em> = −Σ<sub><em>i</em></sub> <em>p<sub>i</sub></em> log<sub>2</sub> <em>p<sub>i</sub></em>   (terms with <em>p<sub>i</sub></em> = 0 count as 0).</p>
<p>Claude Shannon defined it in 1948 as the average number of bits of information needed to say which class an example is in, when an ideal code is used: −log<sub>2</sub> <em>p</em> bits for an outcome of probability <em>p</em>, since rarer outcomes are more surprising. A pure set (one class) has <em>H</em> = 0: nothing to say. A 50/50 split of two classes has <em>H</em> = −2 × 0.5 × log<sub>2</sub> 0.5 = 1 bit, the maximum for two classes; for <em>k</em> equally common classes it is log<sub>2</sub> <em>k</em>. The tennis labels, 9 yes and 5 no, have</p>
<p class="math"><em>H</em> = −(9/14) log<sub>2</sub>(9/14) − (5/14) log<sub>2</sub>(5/14) ≈ 0.643 × 0.637 + 0.357 × 1.485 ≈ 0.940 bits.</p>

<h3>Information gain</h3>
<p>Splitting on a feature divides the examples into subsets, one per value. The <strong>information gain</strong> of the split is the entropy before it minus the average entropy after it, each subset weighted by its share of the examples:</p>
<p class="math">Gain(<em>S</em>, <em>A</em>) = <em>H</em>(<em>S</em>) − Σ<sub><em>v</em></sub> (|<em>S<sub>v</sub></em>| / |<em>S</em>|) <em>H</em>(<em>S<sub>v</sub></em>)</p>
<p>where <em>S<sub>v</sub></em> is the set of examples with value <em>v</em> for feature <em>A</em>. For Outlook: sunny has 2 yes and 3 no (<em>H</em> = 0.971), overcast 4 yes and 0 no (<em>H</em> = 0), rain 3 yes and 2 no (<em>H</em> = 0.971). The weighted average is (5/14)(0.971) + (4/14)(0) + (5/14)(0.971) ≈ 0.694, so the gain is 0.940 − 0.694 = 0.247 bits.</p>
<pre><code>import math
from collections import Counter

rows = """sunny hot high weak no
sunny hot high strong no
overcast hot high weak yes
rain mild high weak yes
rain cool normal weak yes
rain cool normal strong no
overcast cool normal strong yes
sunny mild high weak no
sunny cool normal weak yes
rain mild normal weak yes
sunny mild normal strong yes
overcast mild high strong yes
overcast hot normal weak yes
rain mild high strong no"""
names = ["outlook", "temp", "humidity", "wind", "play"]
data = [dict(zip(names, line.split())) for line in rows.splitlines()]

def entropy(labels):
    n = len(labels)
    return -sum(c / n * math.log2(c / n) for c in Counter(labels).values())

def info_gain(data, attr, target="play"):
    after = 0.0
    for value in {r[attr] for r in data}:
        subset = [r[target] for r in data if r[attr] == value]
        after += len(subset) / len(data) * entropy(subset)
    return entropy([r[target] for r in data]) - after

print(round(entropy([r["play"] for r in data]), 3))           # 0.94
print({a: round(info_gain(data, a), 3) for a in names[:-1]})  # {'outlook': 0.247, 'temp': 0.029, 'humidity': 0.152, 'wind': 0.048}</code></pre>
<p>Outlook gives the most information, so it goes at the root. The overcast branch is pure (always yes) and becomes a leaf. On the 5 sunny days, humidity has gain 0.971, a perfect split (high: no, normal: yes); on the 5 rainy days, wind does (strong: no, weak: yes). The <strong>ID3</strong> algorithm (Quinlan's name) is this recursion: if all labels agree, or no features are left, return a leaf with the majority label; otherwise split on the feature with the highest gain and recurse on each subset with that feature removed.</p>
<pre><code>def build(data, attrs, target="play"):
    labels = [r[target] for r in data]
    if len(set(labels)) == 1 or not attrs:
        return Counter(labels).most_common(1)[0][0]
    best = max(attrs, key=lambda a: info_gain(data, a, target))
    rest = [a for a in attrs if a != best]
    return {best: {v: build([r for r in data if r[best] == v], rest, target)
                   for v in sorted({r[best] for r in data})}}

print(build(data, names[:-1]))</code></pre>
<pre data-label="Output"><code>{'outlook': {'overcast': 'yes', 'rain': {'wind': {'strong': 'no', 'weak': 'yes'}}, 'sunny': {'humidity': {'high': 'no', 'normal': 'yes'}}}}</code></pre>
<p>Five leaves, and temperature is never used. Read as rules: play if overcast, or sunny with normal humidity, or rain with weak wind.</p>

<h3>Numeric features, overfitting and size</h3>
<p>A numeric feature, such as the temperature in degrees, is split with a threshold: <em>x</em> &lt; <em>t</em> versus <em>x</em> ≥ <em>t</em>. Only thresholds between consecutive distinct values in the training data can give different splits, so the candidates are the midpoints between them, and each is scored by its gain like any other test. A numeric feature can be split again lower in the tree at another threshold.</p>
<p>Grown until every leaf is pure, a tree fits its training data perfectly (unless two identical examples have different labels), so it overfits like 1-NN: its lowest splits are decided by one or two examples, often noise. Trees are kept small by a maximum depth, a minimum number of examples per leaf, or by growing the full tree and then <em>pruning</em> back the splits that don't improve accuracy on validation data. All of these are hyperparameters, chosen by cross-validation.</p>
<p>Information gain has one bias worth knowing. A feature with a different value for every example, like the day number, splits the data into 14 pure subsets and gets the largest possible gain, 0.940, while being useless for new days. Quinlan's later C4.5 algorithm divides the gain by the entropy of the feature's own values (the <em>gain ratio</em>), which penalizes such features. The other common split measure, used by the CART algorithm and most libraries, is <em>Gini impurity</em>, 1 − Σ <em>p<sub>i</sub></em><sup>2</sup>, the chance that two labels drawn at random (with replacement) from the set differ; it ranks splits almost the same way.</p>

<h3>Ensembles: bagging and random forests</h3>
<p>Trees are <em>unstable</em>: change a few training examples and the root split, and so the whole tree, may change. That is <strong>variance</strong>: the error caused by the model's sensitivity to the particular sample of training data. Averaging reduces variance. If <em>m</em> predictors each have error variance σ<sup>2</sup> and were independent, their average would have variance σ<sup>2</sup>/<em>m</em> (MATH 230 Lesson 5). An <strong>ensemble</strong> combines many models, by majority vote for classification or the mean for regression.</p>
<p>But we have only one training set. <strong>Bagging</strong> (bootstrap aggregating, Leo Breiman, 1996) makes many: each <strong>bootstrap sample</strong> draws <em>n</em> examples from the <em>n</em> training examples <em>with replacement</em>, exactly as MATH 230 Lesson 6's bootstrap resamples data. Train one tree on each sample, and vote. Each sample leaves some examples out: a given example is missed by all <em>n</em> draws with probability (1 − 1/<em>n</em>)<sup><em>n</em></sup>, which approaches 1/e ≈ 0.368 as <em>n</em> grows (take logs: <em>n</em> ln(1 − 1/<em>n</em>) = <em>n</em>(−1/<em>n</em> − 1/(2<em>n</em><sup>2</sup>) − ⋯) = −1 − 1/(2<em>n</em>) − ⋯ → −1, by MATH 131 Lesson 5's series for ln(1 + <em>x</em>); MATH 131 Lesson 4 stated the companion limit (1 + 1/<em>n</em>)<sup><em>n</em></sup> → e).</p>
<pre><code>import random

random.seed(1)
n = 1000
sample = [random.randrange(n) for _ in range(n)]
print(1 - len(set(sample)) / n, round((1 - 1 / n) ** n, 4))   # 0.363 0.3677</code></pre>
<p>So each tree has about a third of the data as a free validation set, its <em>out-of-bag</em> examples, and the ensemble's error can be estimated without a separate split.</p>
<p>Bagged trees trained on similar samples still make similar mistakes: they tend to choose the same strong feature at the root. If each pair of predictors has correlation ρ, so covariance ρσ<sup>2</sup>, the variance of a sum (MATH 230's Var(<em>X</em> + <em>Y</em>) = Var(<em>X</em>) + Var(<em>Y</em>) + 2 Cov(<em>X</em>, <em>Y</em>), extended to <em>m</em> terms) is the <em>m</em> variances plus the covariances of the <em>m</em>(<em>m</em> − 1) ordered pairs: <em>m</em>σ<sup>2</sup> + <em>m</em>(<em>m</em> − 1)ρσ<sup>2</sup>. Dividing by <em>m</em><sup>2</sup> for the average gives σ<sup>2</sup>/<em>m</em> + (<em>m</em> − 1)ρσ<sup>2</sup>/<em>m</em> = ρσ<sup>2</sup> + (1 − ρ)σ<sup>2</sup>/<em>m</em>. The first term doesn't shrink however many trees we add. A <strong>random forest</strong> (Breiman, 2001) lowers ρ: at each split, each tree may choose only among a random subset of the features (commonly √<em>d</em> of the <em>d</em>). Individual trees get slightly worse; the forest gets better. Random forests need little tuning and are a strong default for tabular data.</p>
<p>A different way to combine models is <strong>boosting</strong>: train models in sequence, each one concentrating on the examples the ensemble so far gets wrong (in <em>gradient boosting</em>, each new tree is fitted to the current errors, the residuals <em>y</em> − <em>F</em>(<strong>x</strong>) of the ensemble <em>F</em> so far, and added to <em>F</em> with a small weight; for squared error the residual is, up to a factor of 2, the negative gradient of the loss with respect to each prediction, so this is gradient descent in which each step changes the predicted function rather than a vector of parameters). The counterpart of variance is <strong>bias</strong> in a second sense (not Lesson 4's intercept): the error caused by the model being too simple to fit the pattern, which is what underfitting is. Small boosted trees reduce the bias of a simple model rather than the variance of a complex one, and gradient-boosted trees win many competitions on tabular data.</p>

<h3>Unsupervised learning: k-means</h3>
<p>Sometimes there are no labels: customer records with no "type", pixels of a photograph, documents. <strong>Unsupervised learning</strong> looks for structure in the inputs alone. <strong>Clustering</strong> groups examples so that those in a group are similar. (MATH 220 Lesson 8's principal component analysis is the other basic unsupervised method: it finds a few directions that capture most of the variation.)</p>
<p><strong>k-means</strong> represents each of <em>k</em> clusters by a centre, its <strong>centroid</strong> <strong>c</strong><sub><em>j</em></sub>, and assigns each point to the nearest centroid. Its objective is the within-cluster sum of squared distances:</p>
<p class="math">SSE = Σ<sub><em>i</em></sub> ‖<strong>x</strong><sub><em>i</em></sub> − <strong>c</strong><sub>cluster(<em>i</em>)</sub>‖<sup>2</sup></p>
<p><strong>Lloyd's algorithm</strong> (Stuart Lloyd, 1957, published 1982) starts from <em>k</em> initial centroids and alternates two steps until nothing changes:</p>
<ol>
<li><em>Assign</em>: put each point in the cluster of its nearest centroid.</li>
<li><em>Update</em>: move each centroid to the mean of the points in its cluster.</li>
</ol>
<p>A trace in one dimension, with points 1, 2, 4, 7, 8, 10, <em>k</em> = 2 and starting centroids 1 and 2:</p>
<table>
<tr><th>Round</th><th>Centroids</th><th>Clusters after assigning</th><th>New centroids</th></tr>
<tr><td>1</td><td>1, 2</td><td>{1} and {2, 4, 7, 8, 10}</td><td>1, 6.2</td></tr>
<tr><td>2</td><td>1, 6.2</td><td>{1, 2} and {4, 7, 8, 10}</td><td>1.5, 7.25</td></tr>
<tr><td>3</td><td>1.5, 7.25</td><td>{1, 2, 4} and {7, 8, 10}</td><td>2.33, 8.33</td></tr>
<tr><td>4</td><td>2.33, 8.33</td><td>{1, 2, 4} and {7, 8, 10}</td><td>unchanged: stop</td></tr>
</table>
<p>(In round 3, point 4 is 2.5 from 1.5 and 3.25 from 7.25, so it changes cluster.) The final SSE is (1 − 7/3)<sup>2</sup> + (2 − 7/3)<sup>2</sup> + (4 − 7/3)<sup>2</sup> + the same for the other cluster around 25/3: 2 × (16 + 1 + 25)/9 = 28/3 ≈ 9.33.</p>
<p><strong>Why it stops.</strong> Neither step can increase the SSE. Assigning each point to its nearest centroid can only shorten its distance. And for a fixed cluster, the mean is the point <strong>c</strong> that minimizes Σ‖<strong>x</strong><sub><em>i</em></sub> − <strong>c</strong>‖<sup>2</sup>: in each coordinate, the derivative of Σ(<em>x<sub>i</sub></em> − <em>c</em>)<sup>2</sup> with respect to <em>c</em> is −2Σ(<em>x<sub>i</sub></em> − <em>c</em>), which is zero at <em>c</em> = the mean, and the function is a parabola opening upward. There are finitely many ways to assign <em>n</em> points to <em>k</em> clusters, the SSE never goes up, and the algorithm stops when an assignment repeats, so it terminates (in practice, in a few dozen rounds).</p>
<p><strong>Local minima.</strong> It stops at a point where neither step helps, which need not be the best clustering. Points 0, 1, 10, 11, 20, 21 with <em>k</em> = 3 obviously form three pairs. Starting from centroids 0, 1 and 10, the first assignment gives {0}, {1} and {10, 11, 20, 21}, the third centroid moves to 15.5, and nothing changes after that: every point is already nearest its own centroid.</p>
<pre><code>def sse(clusters):
    total = 0.0
    for cl in clusters:
        c = sum(cl) / len(cl)
        total += sum((x - c) ** 2 for x in cl)
    return total

print(sse([[1, 2, 4], [7, 8, 10]]))                  # 9.333333333333334
print(sse([[0], [1], [10, 11, 20, 21]]), sse([[0, 1], [10, 11], [20, 21]]))   # 101.0 1.5</code></pre>
<p>Finding the clustering with the smallest SSE is NP-hard, so in practice k-means is run several times from different starts, keeping the best result, and starts are chosen well: <em>k-means++</em> picks each new starting centroid at random with probability proportional to its squared distance from the centroids already chosen, which tends to spread them out.</p>
<p>Choosing <em>k</em> is a judgement. The SSE always falls as <em>k</em> grows (with <em>k</em> = <em>n</em> it is 0), so it can't choose <em>k</em> by itself; a common heuristic plots SSE against <em>k</em> and looks for the "elbow" where adding clusters stops helping much, and often the purpose decides (a palette of 16 colours, five customer segments). k-means uses Euclidean distance, so features must be scaled (Lesson 4), and it favours round clusters of similar size.</p>
`,
      terms: [
        ["Decision tree", "A classifier that tests one feature at each internal node and gives a prediction at each leaf."],
        ["Entropy", "H = −Σ p log₂ p: the average number of bits needed to identify an example's class; 0 for a pure set."],
        ["Information gain", "The entropy of a set minus the weighted average entropy of the subsets a split produces."],
        ["ID3", "Building a tree greedily: split on the feature with the highest information gain, then recurse."],
        ["Pruning", "Removing splits from a fully grown tree that don't improve accuracy on validation data."],
        ["Variance (of a model)", "Error caused by sensitivity to the particular training sample."],
        ["Ensemble", "A combination of many models, by vote or average."],
        ["Bootstrap sample", "n examples drawn with replacement from n training examples."],
        ["Bagging", "Training one model per bootstrap sample and voting; about 36.8% of examples are left out of each sample."],
        ["Random forest", "Bagged trees that each consider only a random subset of features at each split."],
        ["Boosting", "Training models in sequence, each concentrating on the errors of the ensemble so far."],
        ["Unsupervised learning", "Finding structure in data without labels, such as clusters."],
        ["k-means", "Clustering by k centroids, minimizing the sum of squared distances from points to their centroids."],
        ["Lloyd's algorithm", "Alternately assigning points to the nearest centroid and moving each centroid to its cluster's mean."]
      ],
      quiz: [
        { q: "What is the entropy of a set with 4 examples of class A and 4 of class B?", choices: ["0", "0.5", "1 bit", "2 bits"], answer: 2, why: "Two classes, each with p = 0.5: −2 × 0.5 log₂ 0.5 = 1." },
        { q: "A split produces two subsets, each pure. If the original set had entropy 0.9, what is the gain?", choices: ["0", "0.45", "0.9", "1.8"], answer: 2, why: "The entropy after is 0, so the gain is all of 0.9." },
        { q: "Why does information gain favour a feature like 'day number' that is different for every example?", choices: ["It is numeric", "Every subset has one example and is pure, so the gain is maximal", "It has the lowest entropy before splitting", "It doesn't"], answer: 1, why: "It memorizes the data, which the gain ratio corrects for." },
        { q: "About what fraction of the training examples does a bootstrap sample of size n leave out, for large n?", choices: ["0", "1/e ≈ 0.37", "1/2", "1/n"], answer: 1, why: "(1 − 1/n)^n → 1/e." },
        { q: "What does a random forest add to bagging?", choices: ["Deeper trees", "At each split, only a random subset of the features may be chosen", "Boosting", "Pruning"], answer: 1, why: "It decorrelates the trees, so averaging reduces variance more." },
        { q: "Why can't Lloyd's algorithm run forever?", choices: ["It stops after k rounds", "Neither step increases the SSE, and there are finitely many assignments", "Centroids always move toward the origin", "It uses gradient descent"], answer: 1, why: "A strictly decreasing sequence of values from a finite set must stop." }
      ],
      practice: [
        {
          q: `<p>Compute the information gain of Humidity and of Wind on the full tennis table by hand, and confirm that Outlook is the best root.</p>`,
          a: `<p>Humidity: high has 3 yes, 4 no (<em>H</em> ≈ 0.985); normal 6 yes, 1 no (<em>H</em> ≈ 0.592). After: (7/14)(0.985) + (7/14)(0.592) ≈ 0.789; gain 0.940 − 0.789 ≈ 0.152. Wind: weak 6 yes, 2 no (<em>H</em> ≈ 0.811); strong 3 yes, 3 no (<em>H</em> = 1). After: (8/14)(0.811) + (6/14)(1) ≈ 0.892; gain ≈ 0.048. Both are below Outlook's 0.247.</p>
<pre><code>print(round(entropy(["y"] * 3 + ["n"] * 4), 3), round(entropy(["y"] * 6 + ["n"] * 1), 3), round(entropy(["y"] * 6 + ["n"] * 2), 3))   # 0.985 0.592 0.811</code></pre>`
        },
        {
          q: `<p>Temperatures in degrees for 6 days are 64, 65, 68, 69, 70, 72, with labels yes, no, yes, yes, yes, no. List the candidate thresholds and find the one with the highest information gain.</p>`,
          a: `<p>Candidates: 64.5, 66.5, 68.5, 69.5, 71. The labels have 4 yes and 2 no, <em>H</em> ≈ 0.918.</p>
<pre><code>xs, ls = [64, 65, 68, 69, 70, 72], ["y", "n", "y", "y", "y", "n"]
for t in (64.5, 66.5, 68.5, 69.5, 71):
    left = [l for x, l in zip(xs, ls) if x &lt; t]
    right = [l for x, l in zip(xs, ls) if x >= t]
    g = entropy(ls) - len(left) / 6 * entropy(left) - len(right) / 6 * entropy(right)
    print(t, round(g, 3))</code></pre>
<pre data-label="Output"><code>64.5 0.109
66.5 0.044
68.5 0.0
69.5 0.044
71 0.317</code></pre>
<p>The best threshold is 71 (gain 0.317): it isolates the one "no" at 72, leaving 4 yes and 1 no on the left. At 68.5 the gain is 0: the left side {yes, no, yes} and the right side {yes, yes, no} both have the same 2 : 1 mix as the whole set, so the split tells us nothing.</p>`
        },
        {
          q: `<p>Run k-means by hand on the 2-D points (1, 1), (2, 1), (4, 3), (5, 4) with <em>k</em> = 2, starting from centroids (1, 1) and (2, 1). Give each round's clusters and centroids, and the final SSE.</p>`,
          a: `<p>Round 1: (1, 1) → first centroid; (2, 1), (4, 3), (5, 4) → second (each is at least as close to (2, 1)). New centroids (1, 1) and (11/3, 8/3) ≈ (3.67, 2.67). Round 2: (2, 1) is at distance 1 from (1, 1) and √(2.78 + 2.78) ≈ 2.36 from the other, so it moves to the first cluster. Clusters {(1, 1), (2, 1)} and {(4, 3), (5, 4)}; centroids (1.5, 1) and (4.5, 3.5). Round 3: no change. SSE = 0.25 + 0.25 + (0.25 + 0.25) + (0.25 + 0.25) = 1.5.</p>`
        },
        {
          q: `<p>A bagged ensemble has 100 trees whose errors each have variance σ<sup>2</sup> = 1, with pairwise correlation ρ = 0.5. What is the variance of their average? What is the smallest number of trees that brings it below 0.55? What would a random forest that lowered ρ to 0.2 achieve with 100 trees?</p>`,
          a: `<p>ρσ<sup>2</sup> + (1 − ρ)σ<sup>2</sup>/<em>m</em> = 0.5 + 0.5/100 = 0.505. It can never go below 0.5, and 0.5 + 0.5/<em>m</em> &lt; 0.55 needs <em>m</em> &gt; 10, so 11 trees already suffice; after that more trees barely help. With ρ = 0.2: 0.2 + 0.8/100 = 0.208. Decorrelating the trees matters far more than adding them.</p>`
        }
      ],
      sources: ["quinlan86", "breiman01", "isl", "aima", "lloyd82"]
    },
    {
      id: "ml7",
      title: "Neural networks and backpropagation",
      minutes: 90,
      summary: "The perceptron and its learning rule, and why no perceptron computes XOR; multilayer networks and why they need nonlinear activations (sigmoid, tanh, ReLU); training by gradient descent, with gradients computed by backpropagation, the chain rule applied backwards through a computation graph; a scalar automatic-differentiation engine in 30 lines of Python, used to train a small network on XOR.",
      notes: `
<p>Lessons 4 and 5 learned weights for features that a person chose. A neural network also learns the features: its early layers compute new features from the inputs, and its last layer is a linear or logistic model on top of them. This lesson builds one from nothing and trains it, using the one algorithm that makes training large networks possible.</p>

<h3>The perceptron</h3>
<p>In 1958 Frank Rosenblatt described the <strong>perceptron</strong>, a simplified model of a neuron: it outputs 1 if a weighted sum of its inputs is positive and 0 otherwise,</p>
<p class="math">output = 1 if <strong>w</strong> · <strong>x</strong> + <em>b</em> &gt; 0, else 0,</p>
<p>which is Lesson 5's linear classifier with a hard threshold. Its learning rule is simple: go through the examples; whenever one is misclassified, add <strong>x</strong> to <strong>w</strong> and 1 to <em>b</em> if its label is 1, or subtract them if its label is 0. Each correction moves the boundary toward classifying that example correctly. Learning AND, from <strong>w</strong> = (0, 0), <em>b</em> = 0, presenting (0, 0), (0, 1), (1, 0), (1, 1) in order each epoch:</p>
<table>
<tr><th>Epoch</th><th>Mistakes on</th><th><strong>w</strong>, <em>b</em> after the epoch</th></tr>
<tr><td>1</td><td>(1, 1)</td><td>(1, 1), 1</td></tr>
<tr><td>2</td><td>(0, 0), (0, 1), (1, 1)</td><td>(2, 1), 0</td></tr>
<tr><td>3</td><td>(0, 1), (1, 0), (1, 1)</td><td>(2, 1), −1</td></tr>
<tr><td>4</td><td>(1, 0), (1, 1)</td><td>(2, 2), −1</td></tr>
<tr><td>5</td><td>(0, 1)</td><td>(2, 1), −2</td></tr>
<tr><td>6</td><td>none</td><td>(2, 1), −2: done</td></tr>
</table>
<p>(In epoch 1, (0, 0), (0, 1) and (1, 0) give a sum of 0, which is not &gt; 0, so they are correctly classified as 0; (1, 1) is wrong and adds (1, 1) and 1.) The final rule 2<em>x</em><sub>1</sub> + <em>x</em><sub>2</sub> − 2 &gt; 0 holds only for (1, 1). Rosenblatt proved the <strong>perceptron convergence theorem</strong>: if some line (hyperplane) separates the two classes, the rule makes only finitely many mistakes and then classifies every training example correctly.</p>
<p>If no line separates them, it never settles. The standard example is XOR: output 1 when exactly one input is 1. Suppose some <em>w</em><sub>1</sub>, <em>w</em><sub>2</sub>, <em>b</em> computed it. Then (0, 0) → 0 needs <em>b</em> ≤ 0; (1, 0) → 1 and (0, 1) → 1 need <em>w</em><sub>1</sub> + <em>b</em> &gt; 0 and <em>w</em><sub>2</sub> + <em>b</em> &gt; 0; and (1, 1) → 0 needs <em>w</em><sub>1</sub> + <em>w</em><sub>2</sub> + <em>b</em> ≤ 0. Adding the middle two gives <em>w</em><sub>1</sub> + <em>w</em><sub>2</sub> + <em>b</em> &gt; −<em>b</em> ≥ 0, contradicting the last. Minsky and Papert's 1969 book <em>Perceptrons</em> analysed such limits in depth, and interest in neural networks faded for more than a decade.</p>

<h3>Multilayer networks</h3>
<p>Two perceptrons feeding a third can compute XOR. Let <em>h</em><sub>1</sub> = [<em>x</em><sub>1</sub> + <em>x</em><sub>2</sub> − 0.5 &gt; 0] (OR) and <em>h</em><sub>2</sub> = [<em>x</em><sub>1</sub> + <em>x</em><sub>2</sub> − 1.5 &gt; 0] (AND), where [<em>condition</em>] is 1 if it holds and 0 if not; then output [<em>h</em><sub>1</sub> − <em>h</em><sub>2</sub> − 0.5 &gt; 0], "OR but not AND":</p>
<table>
<tr><th><em>x</em><sub>1</sub>, <em>x</em><sub>2</sub></th><th><em>h</em><sub>1</sub> (OR)</th><th><em>h</em><sub>2</sub> (AND)</th><th>output</th></tr>
<tr><td>0, 0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>0, 1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1, 0</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1, 1</td><td>1</td><td>1</td><td>0</td></tr>
</table>
<p>The hidden units compute new features in which the problem <em>is</em> linearly separable. A <strong>multilayer network</strong> (or multilayer perceptron) arranges units in <strong>layers</strong>: the inputs, one or more <strong>hidden layers</strong>, and an output layer. Each unit computes a weighted sum of the previous layer's outputs plus a bias, then applies an <strong>activation function</strong> <em>g</em>. In matrix form (MATH 220 Lesson 3), a layer with weight matrix <em>W</em> and bias vector <strong>b</strong> maps <strong>h</strong> to <em>g</em>(<em>W</em><strong>h</strong> + <strong>b</strong>), with <em>g</em> applied to each entry. A network with 784 inputs (a 28 × 28 image), a hidden layer of 128 units and 10 outputs has 784 × 128 + 128 + 128 × 10 + 10 = 101,770 parameters.</p>
<p>The activation must be nonlinear. Without it, each layer is a linear map, a composition of linear maps is linear (MATH 220 Lesson 3), and the whole network collapses to a single linear model, however deep. Common choices:</p>
<ul>
<li><strong>Sigmoid</strong> σ(<em>z</em>) (Lesson 5), with σ′ = σ(1 − σ), at most 0.25.</li>
<li><strong>tanh</strong>, the hyperbolic tangent, (e<sup><em>z</em></sup> − e<sup>−<em>z</em></sup>)/(e<sup><em>z</em></sup> + e<sup>−<em>z</em></sup>), an S-shaped curve from −1 to 1 (it equals 2σ(2<em>z</em>) − 1), with derivative 1 − tanh<sup>2</sup> <em>z</em>.</li>
<li><strong>ReLU</strong>, the rectified linear unit, max(0, <em>z</em>), with derivative 0 for <em>z</em> &lt; 0 and 1 for <em>z</em> &gt; 0.</li>
</ul>
<p>The step function of the perceptron is useless for training by gradient descent: its derivative is 0 everywhere it exists, so small changes in the weights tell us nothing. Sigmoid and tanh have the opposite problem in deep networks: their derivatives are small away from 0, and the chain rule multiplies one such factor per layer, so gradients reaching the early layers shrink toward 0 (the <em>vanishing gradient</em> problem). ReLU's derivative is exactly 1 for positive inputs, which is one reason it made deep networks practical around 2010. A theorem known as the <em>universal approximation theorem</em> says that one hidden layer with enough units can approximate any continuous function on a bounded region as closely as we like; in practice, deeper networks with fewer units per layer learn more easily.</p>

<h3>Gradients through a computation graph</h3>
<p>Training uses gradient descent on a loss, as in Lessons 4 and 5. The new difficulty is computing the gradient with respect to every weight in a deep composition of functions. Write the computation as a <strong>computation graph</strong>: each node is one simple operation (add, multiply, tanh) applied to the outputs of earlier nodes. Here is a single tanh neuron with one input and a squared-error loss against target 1, with <em>x</em> = 2, <em>w</em> = −0.5 and <em>b</em> = 0.3:</p>
<figure class="fig"><svg viewBox="0 0 470 190" width="470" role="img" aria-label="A computation graph: x and w feed a multiply node giving u = -1; u and b feed an add node giving z = -0.7; tanh gives y = -0.604; the loss node computes (y - 1) squared = 2.574. Gradients flow back: dL/dy = -3.209, dL/dz = -2.037, dL/du = -2.037, dL/dw = -4.073, dL/dx = 1.018, dL/db = -2.037.">
<defs><marker id="arml7" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
<g class="ln" marker-end="url(#arml7)"><line x1="48" y1="40" x2="104" y2="72"/><line x1="48" y1="120" x2="104" y2="92"/><line x1="146" y1="82" x2="200" y2="82"/><line x1="170" y1="150" x2="206" y2="96"/><line x1="246" y1="82" x2="292" y2="82"/><line x1="342" y1="82" x2="386" y2="82"/></g>
<g class="box"><circle cx="125" cy="82" r="20"/><circle cx="225" cy="82" r="20"/><rect x="292" y="66" width="50" height="32" rx="6"/><rect x="386" y="66" width="70" height="32" rx="6"/></g>
<g class="text"><text x="125" y="87" text-anchor="middle">×</text><text x="225" y="87" text-anchor="middle">+</text><text x="317" y="87" text-anchor="middle">tanh</text><text x="421" y="87" text-anchor="middle">(y − 1)²</text>
<text x="30" y="36">x = 2</text><text x="20" y="130">w = −0.5</text><text x="150" y="168">b = 0.3</text>
<text x="173" y="74" class="m" text-anchor="middle">u = −1</text><text x="269" y="60" class="m" text-anchor="middle">z = −0.7</text><text x="364" y="60" class="m" text-anchor="middle">y = −0.604</text><text x="421" y="120" class="m" text-anchor="middle">L = 2.574</text>
<text x="30" y="16" class="m">∂L/∂x = 1.018</text><text x="20" y="150" class="m">∂L/∂w = −4.073</text><text x="150" y="186" class="m">∂L/∂b = −2.037</text>
<text x="173" y="112" class="m" text-anchor="middle">−2.037</text><text x="269" y="112" class="m" text-anchor="middle">−2.037</text><text x="364" y="112" class="m" text-anchor="middle">−3.209</text></g>
</svg><figcaption>Forward values (above the arrows) and, below them, the gradient of the loss with respect to each value, computed from right to left.</figcaption></figure>
<p>The <strong>forward pass</strong> computes the values from left to right: <em>u</em> = <em>wx</em> = −1, <em>z</em> = <em>u</em> + <em>b</em> = −0.7, <em>y</em> = tanh(−0.7) ≈ −0.6044, <em>L</em> = (<em>y</em> − 1)<sup>2</sup> ≈ 2.574. The <strong>backward pass</strong> computes ∂<em>L</em>/∂<em>v</em> for every value <em>v</em>, from right to left, using the chain rule: if <em>v</em> feeds a node whose output is <em>o</em>, then ∂<em>L</em>/∂<em>v</em> = ∂<em>L</em>/∂<em>o</em> × ∂<em>o</em>/∂<em>v</em>, and ∂<em>o</em>/∂<em>v</em>, the <em>local derivative</em>, depends only on that one operation:</p>
<table>
<tr><th>Value</th><th>Local derivative</th><th>∂<em>L</em>/∂(value)</th></tr>
<tr><td><em>L</em></td><td></td><td>1</td></tr>
<tr><td><em>y</em></td><td>∂<em>L</em>/∂<em>y</em> = 2(<em>y</em> − 1) = −3.2087</td><td>1 × −3.2087 = −3.2087</td></tr>
<tr><td><em>z</em></td><td>∂<em>y</em>/∂<em>z</em> = 1 − <em>y</em><sup>2</sup> = 0.6347</td><td>−3.2087 × 0.6347 = −2.0367</td></tr>
<tr><td><em>u</em>, <em>b</em></td><td>∂<em>z</em>/∂<em>u</em> = ∂<em>z</em>/∂<em>b</em> = 1</td><td>−2.0367 each</td></tr>
<tr><td><em>w</em></td><td>∂<em>u</em>/∂<em>w</em> = <em>x</em> = 2</td><td>−2.0367 × 2 = −4.0734</td></tr>
<tr><td><em>x</em></td><td>∂<em>u</em>/∂<em>x</em> = <em>w</em> = −0.5</td><td>−2.0367 × −0.5 = 1.0184</td></tr>
</table>
<p>One more rule is needed. If a value feeds <em>several</em> nodes, the loss depends on it along several paths, and the chain rule says the contributions add (MATH 131 Lesson 9): for <em>f</em> = <em>a</em> × <em>a</em> + <em>a</em>, ∂<em>f</em>/∂<em>a</em> = <em>a</em> + <em>a</em> + 1 = 2<em>a</em> + 1, one term for each use. Computing all the gradients this way, from the output backward, is <strong>backpropagation</strong>, popularized for neural networks by David Rumelhart, Geoffrey Hinton and Ronald Williams in 1986 (it is the <em>reverse-mode automatic differentiation</em> of MATH 131 Lesson 9, described before that by others). Its key property: the backward pass costs about as much as the forward pass, a small constant times it, whether the network has 9 parameters or 9 billion. Count multiplications: each node's backward rule runs once, and a product <em>c</em> = <em>a</em> × <em>b</em>, one multiplication going forward, needs two going backward (<em>b</em> × ∂<em>L</em>/∂<em>c</em> for <em>a</em> and <em>a</em> × ∂<em>L</em>/∂<em>c</em> for <em>b</em>). So for a network made mostly of weight-times-input products, the backward pass takes about twice the forward pass's multiplications, and forward plus backward about three times. Estimating each partial derivative numerically, by nudging one parameter and recomputing the loss, would need one forward pass per parameter.</p>

<h3>A tiny autograd engine</h3>
<p>Automatic differentiation is short enough to write ourselves. A <code>Value</code> holds a number, its gradient, the Values it was computed from, and the local derivative with respect to each. The arithmetic methods build the graph as a side effect of ordinary computation (CS 102 Lesson 2's special methods make <code>w * x + b</code> work on Values). <code>backward</code> sorts the graph topologically (CS 201 Lesson 7), so that every node comes after the nodes it was computed from, and then visits the nodes in reverse, passing each node's gradient to its parents times the local derivatives, adding with <code>+=</code> so that values used several times collect every contribution.</p>
<pre><code>import math

class Value:
    """A number that remembers how it was computed, so it can compute gradients."""
    def __init__(self, data, parents=(), local_grads=()):
        self.data = data
        self.grad = 0.0
        self.parents = parents            # the Values this one was computed from
        self.local_grads = local_grads    # d(self)/d(parent), one per parent

    def __add__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        return Value(self.data + other.data, (self, other), (1.0, 1.0))

    def __mul__(self, other):
        other = other if isinstance(other, Value) else Value(other)
        return Value(self.data * other.data, (self, other), (other.data, self.data))

    __radd__ = __add__                    # so that 2 + v and 2 * v work too
    __rmul__ = __mul__

    def __neg__(self):
        return self * -1

    def __sub__(self, other):
        return self + (-other)

    def tanh(self):
        t = math.tanh(self.data)
        return Value(t, (self,), (1 - t * t,))

    def backward(self):
        order, seen = [], set()
        def visit(v):                     # depth-first topological sort
            if id(v) not in seen:
                seen.add(id(v))
                for p in v.parents:
                    visit(p)
                order.append(v)           # after everything v depends on
        visit(self)
        self.grad = 1.0
        for v in reversed(order):
            for p, g in zip(v.parents, v.local_grads):
                p.grad += g * v.grad

x, w, b = Value(2.0), Value(-0.5), Value(0.3)
y = (w * x + b).tanh()
loss = (y - 1) * (y - 1)
loss.backward()
print(round(loss.data, 4), round(w.grad, 4), round(b.grad, 4), round(x.grad, 4))   # 2.574 -4.0734 -2.0367 1.0184

a = Value(3.0)
f = a * a + a
f.backward()
print(a.grad)   # 7.0</code></pre>
<p>(<code>id(v)</code> is a number unique to each object, used so that two Values with equal data aren't confused.) Always check gradient code against a numerical estimate, the <em>centred difference</em> (<em>f</em>(<em>w</em> + <em>h</em>) − <em>f</em>(<em>w</em> − <em>h</em>))/2<em>h</em> for a small <em>h</em>: the slope of the chord between two points close on either side of <em>w</em>, which approaches the derivative as <em>h</em> → 0 (MATH 130 Lesson 5's definition, made symmetric):</p>
<pre><code>def loss_at(wv):
    return (math.tanh(wv * 2.0 + 0.3) - 1) ** 2

h = 1e-6
print(round((loss_at(-0.5 + h) - loss_at(-0.5 - h)) / (2 * h), 4))   # -4.0734</code></pre>
<p>This is, at small scale, what PyTorch, JAX and TensorFlow do. They work on tensors (arrays) instead of single numbers, so that one node is a whole matrix multiplication, and they run on GPUs, but the graph, the topological order and the accumulated gradients are the same.</p>

<h3>Training a network on XOR</h3>
<p>Now a network with two inputs, two tanh hidden units and one tanh output: <em>h</em><sub>1</sub> = tanh(<em>w</em><sub>11</sub><em>x</em><sub>1</sub> + <em>w</em><sub>12</sub><em>x</em><sub>2</sub> + <em>b</em><sub>1</sub>), <em>h</em><sub>2</sub> likewise with its own weights, and output tanh(<em>v</em><sub>1</sub><em>h</em><sub>1</sub> + <em>v</em><sub>2</sub><em>h</em><sub>2</sub> + <em>c</em>): 9 parameters. The loss is the sum of squared errors on the four XOR examples. Each step builds the graph for the loss, resets the gradients, runs <code>backward</code> and moves every parameter against its gradient.</p>
<pre><code>XOR = [((0, 0), 0), ((0, 1), 1), ((1, 0), 1), ((1, 1), 0)]

def train(init, rate, steps):
    params = [Value(v) for v in init]
    def net(x):
        w11, w12, b1, w21, w22, b2, v1, v2, c = params
        h1 = (w11 * x[0] + w12 * x[1] + b1).tanh()
        h2 = (w21 * x[0] + w22 * x[1] + b2).tanh()
        return (v1 * h1 + v2 * h2 + c).tanh()
    history = []
    for step in range(steps):
        loss = Value(0.0)
        for x, t in XOR:
            d = net(x) - t
            loss = loss + d * d
        for p in params:
            p.grad = 0.0                  # gradients from the last step must not accumulate
        loss.backward()
        for p in params:
            p.data -= rate * p.grad
        history.append(loss.data)
    return net, history

net, history = train([0.5, -0.4, 0.1, -0.3, 0.6, 0.2, 0.7, -0.5, 0.0], 0.2, 500)
print([round(history[i], 4) for i in (0, 50, 100, 200, 499)])   # [2.5871, 0.7684, 0.4674, 0.0152, 0.0029]
print([round(net(x).data, 2) for x, _ in XOR])                  # [0.01, 0.98, 0.97, -0.04]</code></pre>
<p>The outputs are close to 0, 1, 1, 0: the network has learned XOR, which no single perceptron can. Its hidden units ended up computing something like the OR and AND features above, but nobody told them to: gradient descent found features that make the problem separable.</p>
<p>Two things can go wrong, and both show that training a network, unlike Lesson 4's convex problems, depends on where it starts. If every parameter starts at the same value, the two hidden units compute the same thing, receive the same gradients, and stay identical forever: the network behaves as if it had one hidden unit, and it can't learn XOR. That's why initial weights are random (with a fixed seed, for reproducibility), so as to break the symmetry. And some starting points lead to a local minimum or a long flat region: from the initial weights [1, −1, 0.5, −1, 1, 0.5, 1, 1, −0.5], the loss is still 0.668 after 3,000 steps, with outputs near 0, 0.67, 0.67, 0.67.</p>
<pre><code>_, stuck = train([0.5] * 9, 0.2, 2000)
_, local = train([1.0, -1.0, 0.5, -1.0, 1.0, 0.5, 1.0, 1.0, -0.5], 0.2, 3000)
print(round(stuck[-1], 3), round(local[-1], 3))   # 0.669 0.668</code></pre>
<p>Large networks suffer less from bad local minima than this tiny one (with millions of parameters there is almost always some direction that still goes downhill), but initialization, the learning rate and the choice of activation still decide whether training works. Everything else from Lessons 4 and 5 carries over: mini-batches, held-out data, regularization, and cross-entropy loss with a sigmoid output for classification.</p>
`,
      terms: [
        ["Perceptron", "A unit that outputs 1 if w · x + b > 0 and 0 otherwise, trained by adding or subtracting misclassified inputs."],
        ["Perceptron convergence theorem", "If the classes are linearly separable, the perceptron rule makes finitely many mistakes."],
        ["Linearly separable", "Two classes that some hyperplane separates; XOR's are not."],
        ["Hidden layer", "A layer of units between the inputs and the outputs, computing learned features."],
        ["Activation function", "The nonlinear function a unit applies to its weighted sum, such as sigmoid, tanh or ReLU."],
        ["ReLU", "max(0, z), whose derivative is 1 for positive inputs."],
        ["Vanishing gradient", "Gradients shrinking toward 0 as they pass back through many layers with small local derivatives."],
        ["Computation graph", "A graph of simple operations whose values are computed forward and whose gradients are computed backward."],
        ["Local derivative", "The derivative of one operation's output with respect to one of its inputs."],
        ["Backpropagation", "Computing the gradient of the loss with respect to every value by applying the chain rule from the output backward."],
        ["Automatic differentiation", "Computing exact derivatives of a program by recording its operations; reverse mode is backpropagation."],
        ["Symmetry breaking", "Starting weights at different (random) values so that units can learn different features."]
      ],
      quiz: [
        { q: "Which function can a single perceptron not compute?", choices: ["AND", "OR", "NOT x₁", "XOR"], answer: 3, why: "XOR's classes aren't linearly separable: the four inequalities contradict each other." },
        { q: "A network has no activation functions (each layer is linear). What can it represent?", choices: ["Any function", "Only linear functions of its inputs, however many layers", "Only XOR", "Only step functions"], answer: 1, why: "A composition of linear maps is linear." },
        { q: "In the graph z = u + b, ∂L/∂z = −2. What is ∂L/∂b?", choices: ["0", "1", "−2", "−2b"], answer: 2, why: "The local derivative of a sum with respect to each input is 1." },
        { q: "For u = w · x with x = 3 and ∂L/∂u = 0.5, what is ∂L/∂w?", choices: ["0.5", "1.5", "3", "w"], answer: 1, why: "Local derivative x = 3, times 0.5." },
        { q: "Why does backward() add gradients with += instead of assigning them?", choices: ["For speed", "A value used in several places gets a contribution along each path, and the chain rule adds them", "To avoid division by zero", "It doesn't matter"], answer: 1, why: "The multivariable chain rule sums over paths: for a·a + a the gradient is 2a + 1." },
        { q: "All weights of a network start equal. What happens during training?", choices: ["It trains faster", "Units in a layer stay identical, because they receive identical gradients", "The loss is always 0", "Gradients vanish"], answer: 1, why: "Random initialization is needed to break the symmetry." }
      ],
      practice: [
        {
          q: `<p>Train a perceptron by hand on OR, (0, 0) → 0, (0, 1) → 1, (1, 0) → 1, (1, 1) → 1, from <strong>w</strong> = (0, 0), <em>b</em> = 0, presenting the examples in that order. Show each epoch's mistakes and the final rule.</p>`,
          a: `<p>Epoch 1: (0, 0) gives 0, correct. (0, 1): 0, should be 1, so <strong>w</strong> = (0, 1), <em>b</em> = 1. (1, 0): 0 + 1 = 1 &gt; 0, correct. (1, 1): correct. One mistake. Epoch 2: (0, 0): <em>b</em> = 1 &gt; 0 gives 1, wrong: <strong>w</strong> = (0, 1), <em>b</em> = 0. (0, 1): 1 &gt; 0, correct. (1, 0): 0, wrong: <strong>w</strong> = (1, 1), <em>b</em> = 1. (1, 1): correct. Two mistakes. Epoch 3: (0, 0): 1 &gt; 0, wrong: <em>b</em> = 0. The rest are correct with <strong>w</strong> = (1, 1), <em>b</em> = 0. One mistake. Epoch 4: no mistakes. Final rule <em>x</em><sub>1</sub> + <em>x</em><sub>2</sub> &gt; 0.</p>`
        },
        {
          q: `<p>Do the backward pass by hand for a sigmoid neuron with cross-entropy loss: <em>z</em> = <em>wx</em> + <em>b</em>, <em>p</em> = σ(<em>z</em>), <em>L</em> = −ln <em>p</em> (the label is 1), with <em>x</em> = 1.5, <em>w</em> = 0.4, <em>b</em> = −1. Check that ∂<em>L</em>/∂<em>z</em> = <em>p</em> − 1, as Lesson 5 derived.</p>`,
          a: `<p>Forward: <em>z</em> = 0.6 − 1 = −0.4, <em>p</em> = σ(−0.4) ≈ 0.4013, <em>L</em> = −ln 0.4013 ≈ 0.913. Backward: ∂<em>L</em>/∂<em>p</em> = −1/<em>p</em> ≈ −2.492; ∂<em>p</em>/∂<em>z</em> = <em>p</em>(1 − <em>p</em>) ≈ 0.2403; so ∂<em>L</em>/∂<em>z</em> ≈ −2.492 × 0.2403 ≈ −0.5987 = <em>p</em> − 1. Then ∂<em>L</em>/∂<em>w</em> = −0.5987 × 1.5 ≈ −0.898 and ∂<em>L</em>/∂<em>b</em> ≈ −0.599.</p>
<pre><code>p = 1 / (1 + math.exp(0.4))
print(round(p, 4), round(-math.log(p), 3), round(p - 1, 4), round((p - 1) * 1.5, 3))   # 0.4013 0.913 -0.5987 -0.898</code></pre>`
        },
        {
          q: `<p>The notes' <code>Value</code> class has no division. Add <code>__truediv__</code> by giving the local derivatives of <em>a</em>/<em>b</em> with respect to <em>a</em> and <em>b</em>, and check it on <em>f</em> = <em>a</em>/<em>b</em> at <em>a</em> = 3, <em>b</em> = 2.</p>`,
          a: `<p>∂(<em>a</em>/<em>b</em>)/∂<em>a</em> = 1/<em>b</em> and ∂(<em>a</em>/<em>b</em>)/∂<em>b</em> = −<em>a</em>/<em>b</em><sup>2</sup>. At (3, 2): 0.5 and −0.75.</p>
<pre><code>def truediv(self, other):
    other = other if isinstance(other, Value) else Value(other)
    return Value(self.data / other.data, (self, other), (1 / other.data, -self.data / other.data ** 2))

Value.__truediv__ = truediv
a, b = Value(3.0), Value(2.0)
f = a / b
f.backward()
print(f.data, a.grad, b.grad)   # 1.5 0.5 -0.75</code></pre>`
        },
        {
          q: `<p>A network has 784 inputs, two hidden layers of 256 and 64 ReLU units, and 10 outputs. How many parameters does it have? About how many multiplications does one forward pass take for one image, and roughly how many does the backward pass take?</p>`,
          a: `<p>Weights 784 × 256 + 256 × 64 + 64 × 10 = 200,704 + 16,384 + 640 = 217,728, plus biases 256 + 64 + 10 = 330: 218,058 parameters. Each weight is used in one multiplication in the forward pass, about 218,000. The backward pass needs, for each weight, one multiplication for its gradient and one to pass the gradient back to its input: about twice the forward cost. Together, about three forward passes' worth: a small constant factor, whatever the size of the network, which is the point of backpropagation.</p>`
        }
      ],
      sources: ["rosenblatt58", "rumelhart86", "goodfellow", "d2l", "micrograd"]
    },
    {
      id: "ml8",
      title: "Language models, and the limits of AI",
      minutes: 90,
      summary: "Language models as probabilities of the next token: bigram models, smoothing, perplexity and sampling; tokens; word embeddings and cosine similarity; neural language models with a softmax output; attention, worked with numbers, and the transformer; how large language models are pretrained and fine-tuned; and their limits and risks: hallucination, bias, unreliable evaluation, privacy and security.",
      notes: `
<p>The systems most people now mean by "AI" are large language models. They are built from the pieces of this course: probabilities (Lesson 3), embeddings and linear maps, a softmax (the many-class version of Lesson 5's sigmoid, defined below), cross-entropy loss, backpropagation and mini-batch gradient descent (Lessons 4 and 7), on a very large scale. This lesson goes from a model you can build by counting to a sketch of a transformer, and ends with what such models can't be trusted to do.</p>

<h3>Language models</h3>
<p>A <strong>language model</strong> assigns a probability to every sequence of words. By the chain rule of probability (Lesson 3's product rule, applied repeatedly), the probability of a sequence is a product of next-word probabilities:</p>
<p class="math">P(<em>w</em><sub>1</sub>, <em>w</em><sub>2</sub>, …, <em>w<sub>n</sub></em>) = P(<em>w</em><sub>1</sub>) P(<em>w</em><sub>2</sub> | <em>w</em><sub>1</sub>) P(<em>w</em><sub>3</sub> | <em>w</em><sub>1</sub>, <em>w</em><sub>2</sub>) ⋯ P(<em>w<sub>n</sub></em> | <em>w</em><sub>1</sub>, …, <em>w</em><sub><em>n</em>−1</sub>)</p>
<p>So a language model is really a next-word predictor. That single ability serves predictive keyboards, speech recognition and translation (which choose the most probable of several candidate outputs), and text generation: pick a next word from the predicted distribution, append it, and repeat.</p>

<h3>n-gram models</h3>
<p>The history <em>w</em><sub>1</sub>, …, <em>w</em><sub><em>i</em>−1</sub> is usually unique, so its next-word distribution can't be estimated by counting. An <strong>n-gram model</strong> makes a Markov assumption: the next word depends only on the previous <em>n</em> − 1 words. A <strong>bigram</strong> model (<em>n</em> = 2) uses one:</p>
<p class="math">P(<em>w<sub>i</sub></em> | <em>w</em><sub>1</sub>, …, <em>w</em><sub><em>i</em>−1</sub>) ≈ P(<em>w<sub>i</sub></em> | <em>w</em><sub><em>i</em>−1</sub>) = count(<em>w</em><sub><em>i</em>−1</sub>, <em>w<sub>i</sub></em>) / count(<em>w</em><sub><em>i</em>−1</sub>)</p>
<p>where count(<em>a</em>, <em>b</em>) is how often <em>b</em> follows <em>a</em> in the training text and count(<em>a</em>) how often <em>a</em> is followed by anything. Special tokens <code>&lt;s&gt;</code> and <code>&lt;/s&gt;</code> mark the start and end of each sentence, so that the model also learns how sentences begin and when they stop.</p>
<pre><code>import math, random
from collections import Counter

corpus = ["the cat sat on the mat", "the dog sat on the log", "the cat saw the dog"]
pairs, context = Counter(), Counter()
for line in corpus:
    words = ["&lt;s&gt;"] + line.split() + ["&lt;/s&gt;"]
    for a, b in zip(words, words[1:]):
        pairs[(a, b)] += 1
        context[a] += 1

def p_mle(b, a):
    return pairs[(a, b)] / context[a]

def sentence_prob(line, p):
    words = ["&lt;s&gt;"] + line.split() + ["&lt;/s&gt;"]
    prob = 1.0
    for a, b in zip(words, words[1:]):
        prob *= p(b, a)
    return prob

print(p_mle("cat", "the"), p_mle("sat", "cat"))   # 0.3333333333333333 0.5
print(sentence_prob("the cat sat on the log", p_mle), sentence_prob("the dog saw the cat", p_mle))   # 0.027777777777777776 0.0</code></pre>
<p>"the" is followed by something 6 times, twice by "cat". "the cat sat on the log" never occurs in the corpus, but each of its bigrams does: its probability is 1 × 2/6 × 1/2 × 1 × 1 × 1/6 × 1 = 1/36. "the dog saw the cat" is a perfectly good sentence, but "dog saw" was never seen, so its probability is 0. As with naive Bayes, the fix is smoothing: add-one smoothing gives P(<em>b</em> | <em>a</em>) = (count(<em>a</em>, <em>b</em>) + 1)/(count(<em>a</em>) + |<em>V</em>|), where the vocabulary <em>V</em> is every word that can come next (the 8 distinct words plus <code>&lt;/s&gt;</code>, so |<em>V</em>| = 9). More generally, <strong>add-<em>k</em> smoothing</strong> adds a constant <em>k</em> &gt; 0 (often less than 1) to every count: P(<em>b</em> | <em>a</em>) = (count(<em>a</em>, <em>b</em>) + <em>k</em>)/(count(<em>a</em>) + <em>k</em>|<em>V</em>|), and <em>k</em> = 1 is add-one. Real systems use better smoothing that also falls back from bigrams to single-word frequencies.</p>
<p><strong>Perplexity.</strong> A language model is evaluated by how probable it finds held-out text. Over a test text of <em>N</em> predicted tokens, the <strong>perplexity</strong> is</p>
<p class="math">PP = exp( −(1/<em>N</em>) Σ<sub><em>i</em></sub> ln P(<em>w<sub>i</sub></em> | history) ),</p>
<p>the exponential of the average cross-entropy loss per token (Lesson 5's loss, now over a vocabulary). A model that spread its probability equally over <em>k</em> words every time would have perplexity <em>k</em>, so perplexity is an "effective number of choices" per word; lower is better. Our add-one model has perplexity 4.62 on its own training sentences (the unsmoothed one 1.71, since it gives the training text as much probability as possible), and 5.97 on "the dog saw the cat". The programming problem computes these.</p>
<p><strong>Generation.</strong> Sampling each next word from P(· | previous word) produces text:</p>
<pre><code>vocab = sorted({w for line in corpus for w in line.split()} | {"&lt;/s&gt;"})

def generate(seed):
    rng = random.Random(seed)
    w, out = "&lt;s&gt;", []
    while True:
        options = [b for b in vocab if pairs[(w, b)]]
        w = rng.choices(options, weights=[pairs[(w, b)] for b in options])[0]
        if w == "&lt;/s&gt;":
            return " ".join(out)
        out.append(w)

print(generate(3))   # the dog
print(generate(4))   # the cat sat on the dog sat on the cat saw the cat sat on the log</code></pre>
<p>(<code>rng.choices(options, weights=...)</code> picks one option with probability proportional to its weight.) Every two-word window is fluent and the whole is nonsense: a bigram model can't remember more than one word. Longer n-grams help, but the number of possible contexts grows as |<em>V</em>|<sup><em>n</em>−1</sup>, most never occur in any training text, and a context of even ten words is too short for a paragraph.</p>

<h3>Tokens</h3>
<p>Words are an awkward unit: there are millions of them, new ones appear constantly, and "run", "runs" and "running" share nothing. Characters have the opposite problem: sequences become very long. Modern models use <strong>subword tokens</strong>. <em>Byte-pair encoding</em> (BPE) starts from single characters (or bytes) and repeatedly merges the most frequent adjacent pair of tokens in the training text into a new token, until the vocabulary reaches a chosen size, typically 50,000 to 200,000. Common words become single tokens, and rare ones are spelled out from pieces, so any text can be encoded. An English word is on average a little more than one token.</p>

<h3>Embeddings</h3>
<p>To feed tokens to a network, each must become a vector. A <strong>one-hot</strong> vector (Lesson 4) has length |<em>V</em>| and treats all words as equally different: the cosine similarity (MATH 220 Lesson 1) of any two distinct one-hot vectors is 0. An <strong>embedding</strong> instead assigns each token a dense vector of a few hundred numbers, learned so that tokens used in similar contexts get similar vectors. This is the <em>distributional hypothesis</em>, summed up by the linguist J. R. Firth in 1957: "You shall know a word by the company it keeps." In word2vec (Tomas Mikolov and colleagues, 2013), the vectors are trained to predict which words appear near each other; in a language model they are simply the first layer's weights, trained with everything else.</p>
<p>Learned embeddings show regularities. With made-up three-dimensional vectors, whose coordinates loosely mean "royal", "male" and "female":</p>
<pre><code>vec = {"king": [0.9, 0.8, 0.1], "queen": [0.9, 0.1, 0.8], "man": [0.1, 0.9, 0.1],
       "woman": [0.1, 0.1, 0.9], "apple": [0.0, 0.3, 0.3]}

def cosine(u, v):
    return sum(a * b for a, b in zip(u, v)) / math.sqrt(sum(a * a for a in u) * sum(b * b for b in v))

target = [k - m + w for k, m, w in zip(vec["king"], vec["man"], vec["woman"])]
print([round(x, 2) for x in target])                                 # [0.9, 0.0, 0.9]
print(max(vec, key=lambda word: cosine(vec[word], target)))          # queen</code></pre>
<p>Real embeddings, learned from billions of words, show the same kind of arithmetic, imperfectly: vector("king") − vector("man") + vector("woman") lands near vector("queen"). They also learn whatever associations the text contains, as the last section shows.</p>

<h3>Neural language models and the softmax</h3>
<p>A neural language model embeds the previous tokens, passes them through a network, and produces one score <em>s<sub>j</sub></em> for each of the |<em>V</em>| possible next tokens. The <strong>softmax</strong> turns scores into probabilities:</p>
<p class="math">P(token <em>j</em>) = e<sup><em>s<sub>j</sub></em></sup> / Σ<sub><em>k</em></sub> e<sup><em>s<sub>k</sub></em></sup></p>
<p>With two classes and scores <em>z</em> and 0 it is exactly the sigmoid of Lesson 5. It is computed with the max subtracted first, Lesson 3's log-sum-exp trick. Training minimizes the cross-entropy, −ln P(the actual next token), averaged over every position of the training text, so a trained model's average loss is the log of its perplexity. When generating, the scores are often divided by a <strong>temperature</strong> <em>T</em> before the softmax: for scores 2, 1, 0 the probabilities are 0.665, 0.245, 0.090 at <em>T</em> = 1, 0.867, 0.117, 0.016 at <em>T</em> = 0.5 (more predictable text) and 0.506, 0.307, 0.186 at <em>T</em> = 2 (more varied, and more errors).</p>

<h3>Attention</h3>
<p>A model with a fixed window of previous tokens can't use anything outside it. <strong>Attention</strong> lets each position look at every earlier position and decide how much each matters. Each token's vector <strong>x</strong> is mapped by three learned matrices to three vectors: <strong>q</strong> = <em>W<sub>Q</sub></em><strong>x</strong>, its <strong>query</strong> ("what am I looking for?"); <strong>k</strong> = <em>W<sub>K</sub></em><strong>x</strong>, its <strong>key</strong> ("what do I contain?"); and <strong>v</strong> = <em>W<sub>V</sub></em><strong>x</strong>, its <strong>value</strong> ("what do I pass on?"). For position <em>i</em>:</p>
<ol>
<li>Score every position <em>j</em> by <strong>q</strong><sub><em>i</em></sub> · <strong>k</strong><sub><em>j</em></sub> / √<em>d</em>, where <em>d</em> is the length of the vectors. (Dividing by √<em>d</em> keeps the scores from growing with <em>d</em>, which would make the softmax nearly all-or-nothing.)</li>
<li>Turn the scores into weights with a softmax.</li>
<li>Output the weighted average of the values, Σ<sub><em>j</em></sub> weight<sub><em>j</em></sub> <strong>v</strong><sub><em>j</em></sub>.</li>
</ol>
<p>A small example with three tokens and <em>d</em> = 2. Suppose the keys are (1, 0), (0, 1) and (1, 1), the values (1, 0), (0, 1) and (0.5, 0.5), and the third token's query is (1, 1). Its scores are 1/√2 ≈ 0.707, 0.707 and 2/√2 ≈ 1.414; the softmax gives weights 0.248, 0.248 and 0.503; and the output is 0.248 × (1, 0) + 0.248 × (0, 1) + 0.503 × (0.5, 0.5) = (0.5, 0.5).</p>
<pre><code>def softmax(xs):
    m = max(xs)
    exps = [math.exp(x - m) for x in xs]
    return [e / sum(exps) for e in exps]

q = [1.0, 1.0]
keys = [[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]
values = [[1.0, 0.0], [0.0, 1.0], [0.5, 0.5]]
weights = softmax([sum(a * b for a, b in zip(q, k)) / math.sqrt(2) for k in keys])
print([round(w, 3) for w in weights])                                                  # [0.248, 0.248, 0.503]
print([round(sum(w * v[c] for w, v in zip(weights, values)), 3) for c in range(2)])    # [0.5, 0.5]</code></pre>
<p>The weights are computed from the data, so a token can attend to a word far back if its key matches the query: in "The animal didn't cross the street because it was too tired", the position of "it" can learn to put most of its weight on "animal". In a language model, position <em>i</em> must not see the future tokens it is trying to predict, so the scores for <em>j</em> &gt; <em>i</em> are set to −∞ before the softmax (a <em>causal mask</em>), giving them weight 0. Attention alone ignores word order (shuffling the positions shuffles the outputs the same way), so a vector encoding each token's position is added to its embedding. A layer usually runs several attentions in parallel with different matrices (<em>multi-head attention</em>), each free to track a different kind of relation. Each head produces one output vector per position; the heads' vectors are concatenated (laid end to end) and multiplied by one more learned matrix, giving a single vector per position again.</p>

<h3>Transformers</h3>
<p>The <strong>transformer</strong> (Vaswani and colleagues, 2017, "Attention Is All You Need") is built from identical <em>blocks</em>. Each block applies multi-head attention, then a small two-layer network to each position separately, with two details that make deep stacks trainable: each sub-layer's output is <em>added</em> to its input (a <em>residual connection</em>, so that gradients have a direct path backward through the stack, avoiding Lesson 7's vanishing gradients), and each position's vector is rescaled to a standard size (<em>layer normalization</em>: subtract the mean of its entries and divide by their standard deviation, so the entries have mean 0 and standard deviation 1, then multiply and shift each entry by learned amounts), so that values neither blow up nor shrink as they pass through many blocks. A language model stacks dozens of blocks between the embeddings and a final softmax over the vocabulary. Unlike earlier <em>recurrent networks</em>, which read a text one token at a time, computing a new hidden vector from the previous hidden vector and the current token, so that position <em>i</em> can't be computed before position <em>i</em> − 1, a transformer computes every position of a training text in parallel, which suits GPUs; the price is that attention compares every pair of positions, so its cost grows with the square of the context length.</p>

<h3>How large language models are trained</h3>
<ol>
<li><strong>Pretraining.</strong> The model, with billions of parameters, is trained to predict the next token of a huge text collection: web pages, books, code, typically trillions of tokens. The loss is Lesson 5's cross-entropy, the gradients come from backpropagation, and the optimizer is a variant of mini-batch gradient descent (usually Adam, which adapts the step for each parameter) run on thousands of GPUs for weeks or months. Studies of <em>scaling laws</em> found that the loss falls smoothly and predictably as parameters, data and computation grow together; one influential result (Hoffmann and colleagues, 2022) found that for a fixed budget of computation, models had been too large for their data, and recommended roughly 20 training tokens per parameter.</li>
<li><strong>Fine-tuning.</strong> A pretrained model continues text; it doesn't follow instructions or decline harmful requests. It is then trained further on examples of the desired behaviour (<em>instruction tuning</em>: prompts paired with good responses written by people), and often with <em>reinforcement learning from human feedback</em> (RLHF): people rank several responses to the same prompt, a separate model is trained to predict their rankings, and the language model is adjusted to produce responses that this <em>reward model</em> scores highly. That adjustment is <em>reinforcement learning</em>: learning from a numerical reward for what the model did, rather than from a known correct answer. The model samples a response, the reward model scores it, and a gradient step raises the log-probability of that response's tokens if its score is above average (lowers it if below), so high-scoring responses become more likely. A penalty for drifting far from the original model's probabilities is usually added, so the model doesn't wander into odd text that happens to fool the reward model.</li>
<li><strong>Use.</strong> Given a prompt, the model generates one token at a time, sampling from the softmax (with some temperature), each new token appended to the context.</li>
</ol>

<h3>Limits and risks</h3>
<p>Everything a language model does comes from being trained to produce probable text. That explains both its abilities and the following failures, which CS 100 Lesson 5 introduced and which can now be traced to mechanisms.</p>
<ul>
<li><strong>Hallucination.</strong> The objective rewards plausible continuations, not true ones. A model asked for a citation produces something shaped like a citation; whether that paper exists isn't part of the loss. Fluency is not evidence of accuracy: check claims against sources, and run code before trusting it.</li>
<li><strong>Bias.</strong> A model learns the associations in its training text, including stereotypes. In 2016 Tolga Bolukbasi and colleagues showed that embeddings trained on news text completed the analogy "man is to computer programmer as woman is to <em>x</em>" with "homemaker". A model used to screen job applications or write performance reviews can carry such associations into decisions about people. As with Gender Shades (CS 100 Lesson 5), the remedy starts with measuring: evaluate separately for each group affected.</li>
<li><strong>Evaluation.</strong> Benchmark scores are Lesson 5's test sets, with Lesson 5's dangers. Benchmark questions published on the web may have been in the training text (<em>contamination</em>), which makes the test a measure of memory; and a field that optimizes for a benchmark eventually makes it stop measuring what it was meant to (Goodhart's law, MATH 131 Lesson 8's sidebar). Open-ended answers are hard to score at all, and models judged by other models inherit their judges' blind spots.</li>
<li><strong>Privacy.</strong> Models memorize some of their training data. Nicholas Carlini and colleagues (2021) extracted hundreds of verbatim training passages from GPT-2 by sampling and ranking its outputs, including names, phone numbers and email addresses of real people. Training text is largely collected without its authors' consent, and what users type into a model may be stored and used for training.</li>
<li><strong>Security.</strong> A model can't reliably tell its instructions apart from the data it is processing, so text inside a web page or email it reads can redirect it (<em>prompt injection</em>); CS 380 treats this with the other injection attacks, CS 240 Lesson 8's SQL injection among them.</li>
<li><strong>Cost.</strong> Training and serving large models takes large amounts of electricity and water (CS 100 Lesson 5), concentrated in a few companies that can afford it.</li>
</ul>
<p>None of these makes language models useless; each is a reason to know how they work, to measure them honestly, and to keep a person accountable for what they are used to decide.</p>
`,
      terms: [
        ["Language model", "A probability distribution over sequences of tokens, usually given as next-token probabilities."],
        ["n-gram model", "A language model in which each token depends only on the previous n − 1 tokens, estimated by counting."],
        ["Perplexity", "exp of the average negative log probability per token on held-out text; lower is better."],
        ["Subword token", "A piece of text, from a character to a whole word, chosen by an algorithm such as byte-pair encoding."],
        ["Embedding", "A learned dense vector representing a token, with similar tokens getting similar vectors."],
        ["Softmax", "e^(s_j) / Σ_k e^(s_k): turns a list of scores into probabilities; the many-class sigmoid."],
        ["Temperature", "A divisor applied to scores before the softmax: low makes sampling more predictable, high more varied."],
        ["Attention", "Each position takes a weighted average of value vectors, with weights from a softmax of query–key dot products."],
        ["Query, key, value", "Vectors computed from each token by learned matrices: what it looks for, what it offers to be matched, and what it passes on."],
        ["Causal mask", "Setting attention scores for later positions to −∞ so a language model can't see the tokens it predicts."],
        ["Transformer", "A network of stacked blocks of multi-head attention and per-position layers, with residual connections and normalization."],
        ["Pretraining", "Training a model on a large general corpus, here to predict the next token, before adapting it to tasks."],
        ["RLHF", "Reinforcement learning from human feedback: tuning a model toward responses a reward model, trained on human rankings, prefers."],
        ["Reinforcement learning", "Learning from a numerical reward for the actions a model takes, rather than from known correct answers."],
        ["Hallucination", "Fluent output that is false, a consequence of training for probable rather than true text."]
      ],
      quiz: [
        { q: "In the notes' corpus, \"the\" is followed by something 6 times and by \"dog\" twice. What is the unsmoothed P(dog | the)?", choices: ["1/6", "1/3", "1/2", "2/9"], answer: 1, why: "count(the, dog) / count(the) = 2/6." },
        { q: "With add-one smoothing and |V| = 9, what is P(on | the), a pair never seen?", choices: ["0", "1/15", "1/9", "1/6"], answer: 1, why: "(0 + 1)/(6 + 9)." },
        { q: "A model always spreads its probability equally over 50 tokens. What is its perplexity?", choices: ["1", "50", "ln 50", "1/50"], answer: 1, why: "exp(−ln(1/50)) = 50: the effective number of choices." },
        { q: "In attention, the weights for one query come from:", choices: ["The values alone", "A softmax of the query's dot products with every key, divided by √d", "The position of each token", "Random sampling"], answer: 1, why: "Scores q · k / √d, then softmax; the values are what gets averaged." },
        { q: "Why does a language model use a causal mask?", choices: ["To speed up training", "So position i can't attend to the later tokens it is trained to predict", "To reduce the vocabulary", "To add word order"], answer: 1, why: "Otherwise predicting the next token would be trivial in training and impossible in use." },
        { q: "Why do language models hallucinate?", choices: ["Their GPUs make errors", "They are trained to produce probable text, and truth isn't part of that objective", "Their vocabularies are too small", "Attention forgets the prompt"], answer: 1, why: "A plausible continuation and a true one usually coincide, but nothing in the loss requires it." }
      ],
      practice: [
        {
          q: `<p>Using add-one smoothing on the notes' corpus (|<em>V</em>| = 9), compute P("the dog saw the cat") as a product of bigram probabilities, and its perplexity.</p>`,
          hint: `<p>The bigrams are (&lt;s&gt;, the), (the, dog), (dog, saw), (saw, the), (the, cat) and (cat, &lt;/s&gt;): six of them, including the end.</p>`,
          a: `<p>Six bigrams, not five (the end token counts). Counts: (&lt;s&gt;, the) 3 of 3 → 4/12; (the, dog) 2 of 6 → 3/15; (dog, saw) 0 of 2 → 1/11; (saw, the) 1 of 1 → 2/10; (the, cat) 2 of 6 → 3/15; (cat, &lt;/s&gt;) 0 of 2 → 1/11. Product ≈ 2.20 × 10<sup>−5</sup>. Perplexity = (2.20 × 10<sup>−5</sup>)<sup>−1/6</sup> ≈ 5.97.</p>
<pre><code>def p_add1(b, a):
    return (pairs[(a, b)] + 1) / (context[a] + len(vocab))

pr = sentence_prob("the dog saw the cat", p_add1)
print(pr, round(pr ** (-1 / 6), 2))   # 2.2038567493112952e-05 5.97</code></pre>`
        },
        {
          q: `<p>In the attention example, compute by hand the weights and output for the first token's query (1, 0), using the same keys and values. Then apply a causal mask for position 2 with query (0, 1) (it may see positions 1 and 2 only).</p>`,
          a: `<p>Query (1, 0): scores 1/√2, 0, 1/√2 ≈ 0.707, 0, 0.707. Softmax: e<sup>0.707</sup> ≈ 2.028, so the weights are 2.028/5.056, 1/5.056, 2.028/5.056 ≈ 0.401, 0.198, 0.401. Output 0.401 × (1, 0) + 0.198 × (0, 1) + 0.401 × (0.5, 0.5) ≈ (0.602, 0.398). Causal, query (0, 1) at position 2: scores 0 and 0.707 for positions 1 and 2 (position 3 masked): weights 1/3.028 ≈ 0.330 and 0.670; output (0.330, 0.670).</p>
<pre><code>w1 = softmax([sum(a * b for a, b in zip([1.0, 0.0], k)) / math.sqrt(2) for k in keys])
w2 = softmax([sum(a * b for a, b in zip([0.0, 1.0], k)) / math.sqrt(2) for k in keys[:2]])
print([round(w, 3) for w in w1], [round(w, 3) for w in w2])   # [0.401, 0.198, 0.401] [0.33, 0.67]</code></pre>`
        },
        {
          q: `<p>A bigram model over a vocabulary of 50,000 tokens stores a probability for every pair. How many numbers is that? A 5-gram model? Why can't the counts in any real corpus support the 5-gram model without heavy smoothing?</p>`,
          a: `<p>Bigrams: 50,000<sup>2</sup> = 2.5 × 10<sup>9</sup>. 5-grams: 50,000<sup>5</sup> ≈ 3.1 × 10<sup>23</sup>. A corpus of a trillion (10<sup>12</sup>) tokens contains at most 10<sup>12</sup> distinct 5-grams, a vanishing fraction of the possibilities, so almost every 5-gram a model meets in new text has count 0. That sparsity is what neural models avoid: they predict from embeddings, so similar contexts share what they learned.</p>`
        },
        {
          q: `<p>A company proposes to screen résumés with a language model fine-tuned on the résumés of employees it hired in the past ten years, labelled by their later performance ratings. List three distinct ways this could harm applicants, naming for each the mechanism from this course, and one measurement you would insist on before deployment.</p>`,
          a: `<p>(1) Bias from the labels: past hiring and ratings reflect past decisions, including any discrimination, and the model learns to reproduce them (the labels are a proxy, like the sidebar in Lesson 5). Words correlated with a group, such as a women's college or a club, can act as stand-ins for the group even if it is never named. (2) Unrepresentative data: groups rarely hired before are rare in training, so errors for them are larger and less visible in overall accuracy (Lesson 5's base rates; Gender Shades). (3) Spurious features and evaluation: the model may key on formatting or vocabulary that correlates with the training labels but not with ability, and a high validation score on past data says nothing about applicants who differ from past hires. Privacy is a fourth: it is trained on employees' personal data for a purpose they didn't agree to. Measurement: precision and recall (and selection rates) computed separately for each group affected, on held-out recent data, compared with the current process, with a human able to review and overrule each rejection.</p>`
        }
      ],
      sources: ["jurafsky", "vaswani17", "mikolov13", "carlini21", "bolukbasi16", "hoffmann22", "ouyang22", "d2l"]
    }
  ]
});

CSA.addAsides("cs370", {
  ml1: [
    { kind: "history", title: "Shakey and the search for A*", html: `<p>From 1966 to 1972, a team at the Stanford Research Institute (SRI) in California built Shakey, the first mobile robot that reasoned about its own actions: given a command such as "push the block off the platform", it planned a route and a sequence of steps, then carried them out with a camera, a range finder and bump sensors, wobbling on its wheels (hence the name). Planning routes across its rooms quickly was a practical problem, and in 1968 three members of the team, Peter Hart, Nils Nilsson and Bertram Raphael, published "A Formal Basis for the Heuristic Determination of Minimum Cost Paths". Nilsson and Raphael had proposed earlier versions that used an estimate of the remaining distance; Hart worked out the conditions under which such a search is guaranteed to find a cheapest path, and the final algorithm was named A*, the best of the A's. The same project produced STRIPS, an early planning language whose ideas are still used. A* itself is now in every route planner and almost every video game in which characters find their way around obstacles.</p>`, sources: ["hart68", "aima"] }
  ],
  ml2: [
    { kind: "history", title: "From Deep Blue to AlphaGo", html: `<p>In May 1997 IBM's Deep Blue beat the world chess champion Garry Kasparov 3½–2½ in a six-game match, a year after losing to him 4–2. It was alpha-beta search, Lesson 2's algorithm, made enormous: hundreds of custom chips evaluated about 200 million positions per second, with a hand-tuned evaluation function of thousands of features, opening books, and selective extensions that searched forcing lines far deeper than the rest. Go resisted the same approach for another two decades. Its board has 361 points, a typical position has about 250 legal moves (against chess's 35), and nobody could write a good evaluation function for it. In March 2016 DeepMind's AlphaGo beat Lee Sedol, one of the strongest players in the world, 4–1. It replaced alpha-beta with Monte Carlo tree search, which samples continuations instead of trying all of them, and replaced the hand-written evaluation with two neural networks (Lesson 7): one, trained on human games and then by playing against itself, suggested promising moves, and the other estimated who was winning. Search over a model, guided by learned functions, is the pattern of much of modern AI.</p>`, sources: ["campbell02", "silver16"] }
  ],
  ml5: [
    { kind: "ethics", title: "When the label is a proxy", html: `<p>Hospitals and insurers in the United States use algorithms to decide which patients get extra care: nurses who call, help with prescriptions, priority appointments. In 2019 Ziad Obermeyer and colleagues studied one such algorithm, applied, by the industry's estimates, to about 200 million people a year. It predicted each patient's future health-care <em>costs</em>, a natural label because it is recorded for everyone, and enrolled those with the highest predictions. Costs are a proxy for need, and a biased one: because of unequal access to care, less money had been spent on Black patients than on white patients who were equally sick. The model predicted costs accurately, and so, at the same risk score, Black patients were considerably sicker, with more chronic illnesses, than white patients. The researchers estimated that predicting health instead of cost would raise the share of Black patients among those automatically selected for extra help from 17.7% to 46.5%, and the manufacturer worked with them to change the label. Nothing in Lesson 5's evaluation would have caught this: precision and recall measure agreement with the label, and the label itself was the problem. Ask what a model's target actually measures, and who is missing from it.</p>`, sources: ["obermeyer19"] }
  ],
  ml8: [
    { kind: "ethics", title: "Documenting models and data", html: `<p>A trained model arrives as a file of numbers that says nothing about what it is for, what it was trained on, or whom it fails. Two proposals from 2018 tried to change that. "Datasheets for Datasets", by Timnit Gebru and colleagues, borrowed the idea of the datasheet that accompanies every electronic component, and proposed that every data set should come with answers to standard questions: why it was created and by whom, what each record contains, how it was collected and whether the people in it consented, what it should not be used for, and how it will be maintained. "Model Cards for Model Reporting", by Margaret Mitchell and colleagues, proposed a short document for each released model giving its intended uses and out-of-scope uses, the data it was evaluated on, and its performance measured separately for groups of people defined by attributes such as age, gender and skin type, as Gender Shades had shown was necessary. Both are now common practice for publicly released models, and documentation of this kind is part of what the EU AI Act requires of high-risk systems (CS 100 Lesson 5). Writing one is a good way to discover what you haven't measured: try it for your course project.</p>`, sources: ["gebru21", "mitchell19", "euaiact"] }
  ]
});
