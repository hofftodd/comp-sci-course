/* Auto-graded programming problems for CS 220, by lesson. Generated from a Python spec, so every
   string is JSON. Several tests are speed tests: an asymptotically slow solution fails them. */
CSA.addCode("cs220", {
 "al1": [
  {
   "id": "count_inversions",
   "title": "Counting inversions",
   "prompt": "<p>Write <code>count_inversions(xs)</code> that returns the number of pairs of positions <em>i</em> &lt; <em>j</em> with <code>xs[i] &gt; xs[j]</code>, in Θ(<em>n</em> log <em>n</em>) time, by the divide-and-conquer method from the notes. Don't change the input list. One test uses 100,000 items.</p>",
   "starter": "def count_inversions(xs):\n    pass\n",
   "hint": "<p>Use the notes' <code>sort_and_count</code>, which returns the sorted list and the count, and return only the count. Equal items are not inversions, so merge with <code>&lt;=</code>.</p>",
   "solution": "def count_inversions(xs):\n    def go(a):\n        if len(a) <= 1:\n            return a, 0\n        mid = len(a) // 2\n        left, x = go(a[:mid])\n        right, y = go(a[mid:])\n        out, i, j, split = [], 0, 0, 0\n        while i < len(left) and j < len(right):\n            if left[i] <= right[j]:\n                out.append(left[i]); i += 1\n            else:\n                out.append(right[j]); j += 1\n                split += len(left) - i\n        out += left[i:] + right[j:]\n        return out, x + y + split\n    return go(list(xs))[1]\n",
   "tests": [
    {
     "label": "The notes' example",
     "call": "count_inversions([2, 4, 1, 3, 5])",
     "expect": "3"
    },
    {
     "label": "Sorted and reversed",
     "type": "assert",
     "code": "assert count_inversions(list(range(10))) == 0\nassert count_inversions(list(range(10, 0, -1))) == 45\n"
    },
    {
     "label": "Equal items aren't inversions",
     "call": "count_inversions([3, 3, 1, 3])",
     "expect": "2"
    },
    {
     "label": "Empty list",
     "call": "count_inversions([])",
     "expect": "0"
    },
    {
     "label": "Doesn't change the input",
     "type": "assert",
     "code": "xs = [3, 1, 2]\ncount_inversions(xs)\nassert xs == [3, 1, 2]\n"
    },
    {
     "label": "100,000 items",
     "type": "assert",
     "limit": 8,
     "code": "import random\nrandom.seed(1)\nxs = random.sample(range(100000), 100000)\n# reference count with a Fenwick tree\ntree = [0] * 100001\ndef add(i):\n    i += 1\n    while i <= 100000:\n        tree[i] += 1; i += i & -i\ndef below(i):\n    s = 0\n    while i > 0:\n        s += tree[i]; i -= i & -i\n    return s\nwant = 0\nfor k, x in enumerate(xs):\n    want += k - below(x + 1)\n    add(x)\nassert count_inversions(xs) == want\n"
    }
   ]
  },
  {
   "id": "master_theorem",
   "title": "Applying the master theorem",
   "prompt": "<p>Write <code>master(a, b, d)</code> for the recurrence T(<em>n</em>) = <em>a</em>T(<em>n</em>/<em>b</em>) + Θ(<em>n</em><sup><em>d</em></sup>) with <em>a</em> ≥ 1, <em>b</em> &gt; 1, <em>d</em> ≥ 0. Return a pair <code>(p, q)</code> meaning T(<em>n</em>) = Θ(<em>n</em><sup><em>p</em></sup> log<sup><em>q</em></sup> <em>n</em>), where log<sup><em>q</em></sup> <em>n</em> means (log <em>n</em>)<sup><em>q</em></sup>: <code>(d, 0)</code>, <code>(d, 1)</code> or <code>(log_b a, 0)</code> by the three cases. Treat <em>d</em> and log<sub><em>b</em></sub> <em>a</em> as equal when they differ by less than 1e-9 (floating point can't represent log₂ 4 = 2 exactly in every case).</p>",
   "starter": "import math\n\ndef master(a, b, d):\n    pass\n",
   "hint": "<p>Compute <code>c = math.log(a, b)</code>, then compare it with <em>d</em> using the tolerance.</p>",
   "solution": "import math\n\ndef master(a, b, d):\n    c = math.log(a) / math.log(b)\n    if abs(d - c) < 1e-9:\n        return (d, 1)\n    if d > c:\n        return (d, 0)\n    return (c, 0)\n",
   "tests": [
    {
     "label": "Merge sort",
     "call": "master(2, 2, 1)",
     "expect": "(1, 1)"
    },
    {
     "label": "Binary search",
     "call": "master(1, 2, 0)",
     "expect": "(0, 1)"
    },
    {
     "label": "Top-heavy",
     "call": "master(2, 2, 2)",
     "expect": "(2, 0)"
    },
    {
     "label": "Karatsuba",
     "type": "assert",
     "code": "import math\np, q = master(3, 2, 1)\nassert math.isclose(p, math.log2(3)) and q == 0, (p, q)\n"
    },
    {
     "label": "Equal case needs the tolerance",
     "type": "assert",
     "code": "p, q = master(9, 3, 2)\nassert q == 1 and abs(p - 2) < 1e-9, (p, q)\n"
    }
   ]
  }
 ],
 "al2": [
  {
   "id": "interval_scheduling",
   "title": "Scheduling the most events",
   "prompt": "<p>Write <code>max_events(events)</code> that takes a list of <code>(start, finish)</code> pairs and returns a largest set of non-overlapping events, as a list sorted by finish time. Two events don't overlap if one finishes no later than the other starts (so (1, 3) and (3, 5) are compatible). Use the earliest-finish greedy rule; when two events finish at the same time, prefer the one that starts later.</p>",
   "starter": "def max_events(events):\n    pass\n",
   "hint": "<p>Sort by <code>(finish, -start)</code>, then take each event whose start is at least the finish time of the last one taken.</p>",
   "solution": "def max_events(events):\n    chosen, free_at = [], float(\"-inf\")\n    for s, f in sorted(events, key=lambda e: (e[1], -e[0])):\n        if s >= free_at:\n            chosen.append((s, f))\n            free_at = f\n    return chosen\n",
   "tests": [
    {
     "label": "The notes' example",
     "call": "max_events([(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10), (8, 11), (8, 12), (2, 14), (12, 16)])",
     "expect": "[(1, 4), (5, 7), (8, 11), (12, 16)]"
    },
    {
     "label": "Touching events are compatible",
     "call": "max_events([(1, 3), (3, 5), (5, 7)])",
     "expect": "[(1, 3), (3, 5), (5, 7)]"
    },
    {
     "label": "Shortest-first would fail here",
     "call": "max_events([(0, 5), (4, 7), (6, 11)])",
     "expect": "[(0, 5), (6, 11)]"
    },
    {
     "label": "Empty",
     "call": "max_events([])",
     "expect": "[]"
    },
    {
     "label": "Optimal size on random inputs",
     "type": "assert",
     "hidden": true,
     "code": "import random, itertools\nrandom.seed(4)\nfor _ in range(200):\n    evs = []\n    for _ in range(7):\n        s = random.randint(0, 20)\n        evs.append((s, s + random.randint(1, 8)))\n    best = 0\n    for r in range(len(evs), 0, -1):\n        if any(all(a[1] <= b[0] for a, b in zip(c, c[1:])) for c in itertools.combinations(sorted(evs, key=lambda e: e[1]), r)):\n            best = r\n            break\n    assert len(max_events(evs)) == best, evs\n"
    }
   ]
  },
  {
   "id": "huffman_code",
   "title": "Huffman codes",
   "prompt": "<p>Write <code>huffman_cost(freq)</code> that returns the total number of bits a Huffman code uses for a dict of symbol frequencies: the sum of frequency × codeword length. (Different tie-breaking can give different codes, but every Huffman code has the same total.) If there's only one symbol, its codeword has length 1. Then write <code>is_prefix_code(codes)</code> that says whether no codeword in the list is a prefix of another.</p>",
   "starter": "import heapq\n\ndef huffman_cost(freq):\n    pass\n\ndef is_prefix_code(codes):\n    pass\n",
   "hint": "<p>You don't need the codewords to get the cost: each merge of two trees with weights <em>w</em><sub>1</sub> and <em>w</em><sub>2</sub> adds one bit to every symbol below them, so it adds <em>w</em><sub>1</sub> + <em>w</em><sub>2</sub> to the total. For the prefix check, sort the codewords: if one is a prefix of another, some prefix ends up directly before a word it begins.</p>",
   "solution": "import heapq\n\ndef huffman_cost(freq):\n    weights = list(freq.values())\n    if len(weights) == 1:\n        return weights[0]\n    heapq.heapify(weights)\n    total = 0\n    while len(weights) > 1:\n        a = heapq.heappop(weights)\n        b = heapq.heappop(weights)\n        total += a + b\n        heapq.heappush(weights, a + b)\n    return total\n\ndef is_prefix_code(codes):\n    s = sorted(codes)\n    return all(not s[i + 1].startswith(s[i]) for i in range(len(s) - 1))\n",
   "tests": [
    {
     "label": "The notes' frequencies",
     "call": "huffman_cost({'a': 45, 'b': 13, 'c': 12, 'd': 16, 'e': 9, 'f': 5})",
     "expect": "224"
    },
    {
     "label": "Two symbols",
     "call": "huffman_cost({'x': 3, 'y': 7})",
     "expect": "10"
    },
    {
     "label": "One symbol",
     "call": "huffman_cost({'z': 4})",
     "expect": "4"
    },
    {
     "label": "Practice problem",
     "call": "huffman_cost({'A': 30, 'B': 30, 'C': 20, 'D': 10, 'E': 10})",
     "expect": "220"
    },
    {
     "label": "Prefix codes",
     "type": "assert",
     "code": "assert is_prefix_code([\"0\", \"100\", \"101\", \"111\", \"1100\", \"1101\"]) is True\nassert is_prefix_code([\"0\", \"01\", \"11\"]) is False\nassert is_prefix_code([\"10\", \"1\"]) is False\n"
    }
   ]
  }
 ],
 "al3": [
  {
   "id": "make_change",
   "title": "Making change with dynamic programming",
   "prompt": "<p>Write <code>min_coins(coins, amount)</code> that returns a list of coins (in any order) with the smallest count that adds up to <code>amount</code>, or <code>None</code> if it's impossible. <code>min_coins(coins, 0)</code> is <code>[]</code>. It must run in Θ(amount × number of coins) time.</p>",
   "starter": "def min_coins(coins, amount):\n    pass\n",
   "hint": "<p>Follow the notes: <code>best[v]</code> and <code>last[v]</code> for every <em>v</em> from 0 to amount, then walk back from <code>amount</code> using <code>last</code>.</p>",
   "solution": "def min_coins(coins, amount):\n    INF = float(\"inf\")\n    best = [0] + [INF] * amount\n    last = [None] * (amount + 1)\n    for v in range(1, amount + 1):\n        for c in coins:\n            if c <= v and best[v - c] + 1 < best[v]:\n                best[v], last[v] = best[v - c] + 1, c\n    if best[amount] == INF:\n        return None\n    out, v = [], amount\n    while v > 0:\n        out.append(last[v])\n        v -= last[v]\n    return out\n",
   "tests": [
    {
     "label": "Where greed fails",
     "type": "assert",
     "code": "r = min_coins([1, 3, 4], 6)\nassert sorted(r) == [3, 3], r\n"
    },
    {
     "label": "US coins",
     "type": "assert",
     "code": "r = min_coins([1, 5, 10, 25], 63)\nassert sum(r) == 63 and len(r) == 6, r\n"
    },
    {
     "label": "Impossible",
     "call": "min_coins([5, 10], 7)",
     "expect": "None"
    },
    {
     "label": "Zero",
     "call": "min_coins([2], 0)",
     "expect": "[]"
    },
    {
     "label": "Large amount",
     "type": "assert",
     "limit": 6,
     "code": "r = min_coins([1, 7, 23, 51], 50000)\nassert sum(r) == 50000 and len(r) == 984, len(r)\n"
    }
   ]
  },
  {
   "id": "lcs_problem",
   "title": "Longest common subsequence",
   "prompt": "<p>Write <code>lcs(x, y)</code> that returns one longest common subsequence of the strings <code>x</code> and <code>y</code>, in Θ(<em>mn</em>) time. Any longest one is accepted.</p>",
   "starter": "def lcs(x, y):\n    pass\n",
   "hint": "<p>Fill the table L from the notes, then walk back from the bottom-right corner: when the characters match, take the character and move diagonally; otherwise move toward the larger neighbor.</p>",
   "solution": "def lcs(x, y):\n    m, n = len(x), len(y)\n    L = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            L[i][j] = L[i - 1][j - 1] + 1 if x[i - 1] == y[j - 1] else max(L[i - 1][j], L[i][j - 1])\n    out, i, j = [], m, n\n    while i and j:\n        if x[i - 1] == y[j - 1]:\n            out.append(x[i - 1]); i -= 1; j -= 1\n        elif L[i - 1][j] >= L[i][j - 1]:\n            i -= 1\n        else:\n            j -= 1\n    return \"\".join(reversed(out))\n",
   "tests": [
    {
     "label": "Length and validity",
     "type": "assert",
     "code": "def is_subseq(s, t):\n    it = iter(t)\n    return all(c in it for c in s)\nfor x, y, n in [(\"ABCBDAB\", \"BDCABA\", 4), (\"ABCB\", \"BDCAB\", 3), (\"abc\", \"def\", 0), (\"\", \"abc\", 0)]:\n    r = lcs(x, y)\n    assert len(r) == n and is_subseq(r, x) and is_subseq(r, y), (x, y, r)\n"
    },
    {
     "label": "Identical strings",
     "call": "lcs(\"dynamic\", \"dynamic\")",
     "expect": "'dynamic'"
    },
    {
     "label": "800-character strings",
     "type": "assert",
     "limit": 8,
     "code": "import random\nrandom.seed(2)\nx = \"\".join(random.choice(\"ACGT\") for _ in range(800))\ny = \"\".join(random.choice(\"ACGT\") for _ in range(800))\nr = lcs(x, y)\nit1, it2 = iter(x), iter(y)\nassert all(c in it1 for c in r) and all(c in it2 for c in r)\nassert 480 < len(r) < 600, len(r)\n"
    }
   ]
  }
 ],
 "al4": [
  {
   "id": "knapsack_01",
   "title": "The 0/1 knapsack",
   "prompt": "<p>Write <code>knapsack(items, W)</code> where <code>items</code> is a list of <code>(weight, value)</code> pairs with positive integer weights. Return <code>(best_value, indexes)</code>: the largest total value of items with total weight at most <em>W</em>, and a sorted list of the indexes of the items in one best choice.</p>",
   "starter": "def knapsack(items, W):\n    pass\n",
   "hint": "<p>Use the table <code>K[i][c]</code> from the notes, then walk back from <code>K[n][W]</code>: item <em>i</em> was taken exactly when <code>K[i][c] != K[i - 1][c]</code>.</p>",
   "solution": "def knapsack(items, W):\n    n = len(items)\n    K = [[0] * (W + 1) for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        w, v = items[i - 1]\n        for c in range(W + 1):\n            K[i][c] = K[i - 1][c]\n            if w <= c and v + K[i - 1][c - w] > K[i][c]:\n                K[i][c] = v + K[i - 1][c - w]\n    chosen, c = [], W\n    for i in range(n, 0, -1):\n        if K[i][c] != K[i - 1][c]:\n            chosen.append(i - 1)\n            c -= items[i - 1][0]\n    return K[n][W], sorted(chosen)\n",
   "tests": [
    {
     "label": "The notes' example",
     "call": "knapsack([(1, 1), (3, 4), (4, 5), (5, 7)], 7)",
     "expect": "(9, [1, 2])"
    },
    {
     "label": "Practice problem",
     "call": "knapsack([(5, 10), (4, 40), (6, 30), (3, 50)], 10)",
     "expect": "(90, [1, 3])"
    },
    {
     "label": "Nothing fits",
     "call": "knapsack([(5, 10)], 4)",
     "expect": "(0, [])"
    },
    {
     "label": "Chosen items are consistent",
     "type": "assert",
     "hidden": true,
     "code": "import random, itertools\nrandom.seed(3)\nfor _ in range(100):\n    items = [(random.randint(1, 10), random.randint(1, 30)) for _ in range(8)]\n    W = random.randint(5, 30)\n    v, idx = knapsack(items, W)\n    best = max(sum(items[i][1] for i in c) for r in range(9) for c in itertools.combinations(range(8), r) if sum(items[i][0] for i in c) <= W)\n    assert v == best and sum(items[i][0] for i in idx) <= W and sum(items[i][1] for i in idx) == v\n"
    }
   ]
  },
  {
   "id": "edit_distance",
   "title": "Edit distance",
   "prompt": "<p>Write <code>edit_distance(x, y)</code>: the fewest single-character insertions, deletions and substitutions that turn <code>x</code> into <code>y</code>. Use Θ(<em>n</em>) memory, where <em>n</em> = len(<code>y</code>), by keeping only two rows of the table (one test compares two 2,000-character strings; a full table of 4 million entries is allowed but slow).</p>",
   "starter": "def edit_distance(x, y):\n    pass\n",
   "hint": "<p>Row <em>i</em> of the table depends only on row <em>i</em> − 1. Keep <code>prev</code> (starting as <code>list(range(n + 1))</code>) and build <code>cur</code> with <code>cur[0] = i</code>.</p>",
   "solution": "def edit_distance(x, y):\n    prev = list(range(len(y) + 1))\n    for i in range(1, len(x) + 1):\n        cur = [i] + [0] * len(y)\n        for j in range(1, len(y) + 1):\n            cur[j] = min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (x[i - 1] != y[j - 1]))\n        prev = cur\n    return prev[-1]\n",
   "tests": [
    {
     "label": "Classic examples",
     "type": "assert",
     "code": "assert edit_distance('kitten', 'sitting') == 3\nassert edit_distance('intention', 'execution') == 5\nassert edit_distance('sun', 'sat') == 2\n"
    },
    {
     "label": "Empty strings",
     "type": "assert",
     "code": "assert edit_distance('', 'abc') == 3 and edit_distance('abc', '') == 3 and edit_distance('', '') == 0\n"
    },
    {
     "label": "Symmetric",
     "type": "assert",
     "code": "assert edit_distance('flaw', 'lawn') == edit_distance('lawn', 'flaw') == 2\n"
    },
    {
     "label": "2,000-character strings",
     "type": "assert",
     "limit": 12,
     "code": "import random\nrandom.seed(5)\nx = \"\".join(random.choice(\"ab\") for _ in range(2000))\ny = x[:1000] + \"ab\" + x[1000:1990]\nassert edit_distance(x, y) <= 12\nassert edit_distance(x, x) == 0\n"
    }
   ]
  }
 ],
 "al5": [
  {
   "id": "dijkstra_paths",
   "title": "Dijkstra with paths",
   "prompt": "<p>Write <code>shortest_path(graph, s, t)</code> for a directed graph given as a dict mapping each vertex to a list of <code>(neighbor, weight)</code> pairs with non-negative weights. Return <code>(distance, path)</code>, where <code>path</code> is the list of vertices from <code>s</code> to <code>t</code>; if <code>t</code> is unreachable, return <code>(float(\"inf\"), [])</code>. Use Dijkstra's algorithm with <code>heapq</code>; one test has 50,000 vertices.</p>",
   "starter": "import heapq\n\ndef shortest_path(graph, s, t):\n    pass\n",
   "hint": "<p>Use the notes' <code>dijkstra</code> with a <code>prev</code> dict, and follow <code>prev</code> back from <code>t</code>. You can stop early once <code>t</code> is finished. Vertices that appear only as neighbors may be missing from <code>graph</code>: use <code>graph.get(u, [])</code>.</p>",
   "solution": "import heapq\n\ndef shortest_path(graph, s, t):\n    dist, prev, done = {s: 0}, {}, set()\n    heap = [(0, s)]\n    while heap:\n        d, u = heapq.heappop(heap)\n        if u in done:\n            continue\n        if u == t:\n            path = [t]\n            while path[-1] != s:\n                path.append(prev[path[-1]])\n            return d, path[::-1]\n        done.add(u)\n        for v, w in graph.get(u, []):\n            if d + w < dist.get(v, float(\"inf\")):\n                dist[v], prev[v] = d + w, u\n                heapq.heappush(heap, (d + w, v))\n    return float(\"inf\"), []\n",
   "tests": [
    {
     "label": "The notes' graph",
     "type": "assert",
     "code": "G = {\"A\": [(\"B\", 4), (\"C\", 2)], \"B\": [(\"C\", 5), (\"D\", 10)], \"C\": [(\"E\", 3)], \"D\": [(\"F\", 11)], \"E\": [(\"D\", 4)], \"F\": []}\nassert shortest_path(G, \"A\", \"F\") == (20, [\"A\", \"C\", \"E\", \"D\", \"F\"]), shortest_path(G, \"A\", \"F\")\nassert shortest_path(G, \"A\", \"A\") == (0, [\"A\"])\n"
    },
    {
     "label": "Unreachable",
     "type": "assert",
     "code": "import math\nd, p = shortest_path({'a': [], 'b': [('a', 1)]}, 'a', 'b')\nassert math.isinf(d) and p == []\n"
    },
    {
     "label": "Practice problem",
     "type": "assert",
     "code": "G = {\"S\": [(\"A\", 7), (\"B\", 2)], \"B\": [(\"A\", 3), (\"C\", 8)], \"A\": [(\"C\", 1)], \"C\": [(\"D\", 2)]}\nassert shortest_path(G, \"S\", \"D\") == (8, [\"S\", \"B\", \"A\", \"C\", \"D\"])\n"
    },
    {
     "label": "50,000 vertices",
     "type": "assert",
     "limit": 10,
     "code": "import random\nrandom.seed(9)\nn = 50000\nG = {i: [(i + 1, 1)] for i in range(n - 1)}\nfor _ in range(100000):\n    a = random.randrange(n); b = random.randrange(n)\n    G.setdefault(a, []).append((b, random.randint(1, 1000) + abs(a - b)))\nd, p = shortest_path(G, 0, n - 1)\nassert d == n - 1 and len(p) == n\n"
    }
   ]
  },
  {
   "id": "bellman_ford_problem",
   "title": "Bellman–Ford with negative cycles",
   "prompt": "<p>Write <code>bellman_ford(vertices, edges, s)</code>: <code>edges</code> is a list of <code>(u, v, weight)</code> with possibly negative weights. Return a dict of distances from <code>s</code> (unreachable vertices get <code>float(\"inf\")</code>). If a negative cycle is reachable from <code>s</code>, raise <code>ValueError</code>. Stop early if a full pass changes nothing.</p>",
   "starter": "def bellman_ford(vertices, edges, s):\n    pass\n",
   "hint": "<p>Follow the notes, and skip edges whose start is still at infinity (inf + a negative number is still inf, but checking avoids surprises).</p>",
   "solution": "def bellman_ford(vertices, edges, s):\n    INF = float(\"inf\")\n    dist = {v: INF for v in vertices}\n    dist[s] = 0\n    for _ in range(len(dist) - 1):\n        changed = False\n        for u, v, w in edges:\n            if dist[u] != INF and dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n                changed = True\n        if not changed:\n            break\n    for u, v, w in edges:\n        if dist[u] != INF and dist[u] + w < dist[v]:\n            raise ValueError(\"negative cycle reachable from the source\")\n    return dist\n",
   "tests": [
    {
     "label": "Dijkstra's counterexample",
     "call": "bellman_ford(\"sab\", [(\"s\", \"a\", 1), (\"s\", \"b\", 2), (\"b\", \"a\", -2)], \"s\")",
     "expect": "{'s': 0, 'a': 0, 'b': 2}"
    },
    {
     "label": "Practice problem",
     "call": "bellman_ford(\"sabc\", [(\"s\", \"a\", 4), (\"s\", \"b\", 5), (\"a\", \"c\", -3), (\"b\", \"a\", -2)], \"s\")",
     "expect": "{'s': 0, 'a': 3, 'b': 5, 'c': 0}"
    },
    {
     "label": "Negative cycle raises ValueError",
     "type": "raises",
     "call": "bellman_ford(\"sab\", [(\"s\", \"a\", 1), (\"a\", \"b\", -2), (\"b\", \"a\", 1)], \"s\")",
     "error": "ValueError"
    },
    {
     "label": "Unreachable negative cycle is fine",
     "type": "assert",
     "code": "import math\nd = bellman_ford(\"sxy\", [(\"x\", \"y\", -5), (\"y\", \"x\", 1)], \"s\")\nassert d[\"s\"] == 0 and math.isinf(d[\"x\"]) and math.isinf(d[\"y\"])\n"
    },
    {
     "label": "Arbitrage detection",
     "type": "raises",
     "call": "bellman_ford([\"USD\", \"EUR\", \"JPY\"], [(\"USD\", \"EUR\", -__import__(\"math\").log(0.9)), (\"EUR\", \"JPY\", -__import__(\"math\").log(160)), (\"JPY\", \"USD\", -__import__(\"math\").log(0.0071))], \"USD\")",
     "error": "ValueError"
    }
   ]
  }
 ],
 "al6": [
  {
   "id": "kruskal_mst",
   "title": "Kruskal's algorithm",
   "prompt": "<p>Write <code>mst(vertices, edges)</code> for a connected undirected graph: <code>edges</code> is a list of <code>(weight, u, v)</code>. Return <code>(total_weight, tree)</code> where <code>tree</code> is a list of <code>(weight, u, v)</code> edges of a minimum spanning tree, found with Kruskal's algorithm and union-find. One test has 20,000 vertices.</p>",
   "starter": "def mst(vertices, edges):\n    pass\n",
   "hint": "<p>Sort the edges, and keep a parent dict for union-find with path compression (the notes' <code>find</code>). Stop once you have V − 1 edges.</p>",
   "solution": "def mst(vertices, edges):\n    parent = {v: v for v in vertices}\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    tree, total = [], 0\n    for w, u, v in sorted(edges):\n        ru, rv = find(u), find(v)\n        if ru != rv:\n            parent[ru] = rv\n            tree.append((w, u, v))\n            total += w\n            if len(tree) == len(parent) - 1:\n                break\n    return total, tree\n",
   "tests": [
    {
     "label": "The notes' graph",
     "type": "assert",
     "code": "E = [(1, \"A\", \"B\"), (3, \"A\", \"C\"), (2, \"B\", \"C\"), (4, \"B\", \"D\"), (5, \"C\", \"D\"), (6, \"C\", \"E\"), (7, \"D\", \"E\")]\ntotal, tree = mst(\"ABCDE\", E)\nassert total == 13 and len(tree) == 4, (total, tree)\n"
    },
    {
     "label": "Practice problem",
     "type": "assert",
     "code": "E = [(3, 1, 2), (1, 1, 3), (7, 2, 3), (5, 2, 4), (2, 3, 4), (7, 4, 5), (8, 3, 5)]\nassert mst([1, 2, 3, 4, 5], E)[0] == 13\n"
    },
    {
     "label": "Tree spans every vertex",
     "type": "assert",
     "code": "E = [(4, 0, 1), (8, 0, 7), (11, 1, 7), (8, 1, 2), (7, 7, 8), (1, 7, 6), (2, 2, 8), (6, 8, 6), (4, 2, 5), (7, 2, 3), (2, 6, 5), (14, 3, 5), (9, 3, 4), (10, 5, 4)]\ntotal, tree = mst(range(9), E)\nassert total == 37 and len(tree) == 8\nseen = {0}\nchanged = True\nwhile changed:\n    changed = False\n    for w, u, v in tree:\n        if (u in seen) != (v in seen):\n            seen |= {u, v}; changed = True\nassert seen == set(range(9))\n"
    },
    {
     "label": "20,000 vertices",
     "type": "assert",
     "limit": 10,
     "code": "import random\nrandom.seed(7)\nn = 20000\nE = [(random.randint(1, 10**6), i, i + 1) for i in range(n - 1)]\nE += [(random.randint(1, 10**6), random.randrange(n), random.randrange(n)) for _ in range(60000)]\ntotal, tree = mst(range(n), E)\nassert len(tree) == n - 1\n"
    }
   ]
  },
  {
   "id": "clustering",
   "title": "Single-linkage clustering",
   "prompt": "<p>Write <code>clusters(points, k)</code> that splits a list of 2-D points into <em>k</em> groups by single-linkage clustering: run Kruskal's algorithm on all pairs of points, with Euclidean distance as the weight, and stop when <em>k</em> components remain. Return the groups as a list of sorted lists of point indexes, sorted by their smallest index.</p>",
   "starter": "import math\n\ndef clusters(points, k):\n    pass\n",
   "hint": "<p>Build all pairs <code>(math.dist(p, q), i, j)</code>, sort them, and union until the number of components is <em>k</em>. Then group indexes by their root.</p>",
   "solution": "import math\n\ndef clusters(points, k):\n    n = len(points)\n    parent = list(range(n))\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n    pairs = sorted((math.dist(points[i], points[j]), i, j) for i in range(n) for j in range(i + 1, n))\n    comps = n\n    for d, i, j in pairs:\n        if comps == k:\n            break\n        ri, rj = find(i), find(j)\n        if ri != rj:\n            parent[ri] = rj\n            comps -= 1\n    groups = {}\n    for i in range(n):\n        groups.setdefault(find(i), []).append(i)\n    return sorted(groups.values(), key=lambda g: g[0])\n",
   "tests": [
    {
     "label": "Two obvious groups",
     "call": "clusters([(0, 0), (0, 1), (10, 10), (10, 11), (1, 0)], 2)",
     "expect": "[[0, 1, 4], [2, 3]]"
    },
    {
     "label": "k equals the number of points",
     "call": "clusters([(0, 0), (5, 5), (9, 9)], 3)",
     "expect": "[[0], [1], [2]]"
    },
    {
     "label": "One group",
     "call": "clusters([(0, 0), (5, 5), (9, 9)], 1)",
     "expect": "[[0, 1, 2]]"
    },
    {
     "label": "Three groups on a line",
     "call": "clusters([(0, 0), (1, 0), (2, 0), (10, 0), (11, 0), (30, 0)], 3)",
     "expect": "[[0, 1, 2], [3, 4], [5]]"
    }
   ]
  }
 ],
 "al7": [
  {
   "id": "max_flow_problem",
   "title": "Maximum flow",
   "prompt": "<p>Write <code>max_flow(capacity, s, t)</code>. <code>capacity</code> is a dict mapping directed edges <code>(u, v)</code> to non-negative integer capacities. Return the value of a maximum flow from <code>s</code> to <code>t</code>, using Edmonds–Karp (BFS for shortest augmenting paths in the residual graph). Edges may go both ways: if both <code>(u, v)</code> and <code>(v, u)</code> are edges, the residual capacity of <code>(u, v)</code> starts at the capacity of <code>(u, v)</code> (not 0), and likewise for <code>(v, u)</code>. Sending flow along one of them adds the same amount to the residual capacity of the other, as in the notes, whose <code>setdefault</code> leaves an existing entry alone.</p>",
   "starter": "from collections import deque\n\ndef max_flow(capacity, s, t):\n    pass\n",
   "hint": "<p>Start the residual dict as a copy of <code>capacity</code> and use <code>residual.get((v, u), 0)</code> for backward edges; keep a neighbor set for each vertex in both directions. Each round, BFS from <code>s</code>; if <code>t</code> isn't reached, return the flow.</p>",
   "solution": "from collections import deque\n\ndef max_flow(capacity, s, t):\n    residual = {}\n    nbrs = {}\n    for (u, v), c in capacity.items():\n        residual[(u, v)] = residual.get((u, v), 0) + c\n        residual.setdefault((v, u), 0)\n        nbrs.setdefault(u, set()).add(v)\n        nbrs.setdefault(v, set()).add(u)\n    flow = 0\n    while True:\n        parent = {s: None}\n        q = deque([s])\n        while q and t not in parent:\n            u = q.popleft()\n            for v in nbrs.get(u, ()):\n                if v not in parent and residual[(u, v)] > 0:\n                    parent[v] = u\n                    q.append(v)\n        if t not in parent:\n            return flow\n        path, v = [], t\n        while parent[v] is not None:\n            path.append((parent[v], v))\n            v = parent[v]\n        b = min(residual[e] for e in path)\n        for u, v in path:\n            residual[(u, v)] -= b\n            residual[(v, u)] += b\n        flow += b\n",
   "tests": [
    {
     "label": "The notes' network",
     "call": "max_flow({(\"s\", \"a\"): 10, (\"s\", \"b\"): 5, (\"a\", \"b\"): 15, (\"a\", \"t\"): 5, (\"b\", \"t\"): 10}, \"s\", \"t\")",
     "expect": "15"
    },
    {
     "label": "Needs a backward edge",
     "call": "max_flow({(\"s\", \"a\"): 1, (\"s\", \"b\"): 1, (\"a\", \"b\"): 1, (\"a\", \"t\"): 1, (\"b\", \"t\"): 1}, \"s\", \"t\")",
     "expect": "2"
    },
    {
     "label": "Edges in both directions between a and b",
     "call": "max_flow({(\"s\", \"b\"): 3, (\"b\", \"a\"): 3, (\"a\", \"t\"): 3, (\"s\", \"a\"): 1, (\"a\", \"b\"): 1, (\"b\", \"t\"): 1}, \"s\", \"t\")",
     "expect": "4"
    },
    {
     "label": "No path",
     "call": "max_flow({(\"s\", \"a\"): 5, (\"b\", \"t\"): 5}, \"s\", \"t\")",
     "expect": "0"
    },
    {
     "label": "Classic textbook network",
     "call": "max_flow({(\"s\", 1): 16, (\"s\", 2): 13, (1, 3): 12, (2, 1): 4, (2, 4): 14, (3, 2): 9, (3, \"t\"): 20, (4, 3): 7, (4, \"t\"): 4}, \"s\", \"t\")",
     "expect": "23"
    },
    {
     "label": "Large capacities don't slow it down",
     "type": "assert",
     "limit": 6,
     "code": "cap = {(\"s\", \"a\"): 10**9, (\"s\", \"b\"): 10**9, (\"a\", \"b\"): 1, (\"a\", \"t\"): 10**9, (\"b\", \"t\"): 10**9}\nassert max_flow(cap, \"s\", \"t\") == 2 * 10**9\n"
    }
   ]
  },
  {
   "id": "bipartite_matching",
   "title": "Assigning students to projects",
   "prompt": "<p>Write <code>max_matching(prefs)</code>. <code>prefs</code> maps each student to a list of projects they can do; each project takes at most one student. Return a dict from student to project for a largest possible assignment (students left unassigned are omitted). Use augmenting paths: for each student, search for a path that frees up a project, reassigning other students along the way.</p>",
   "starter": "def max_matching(prefs):\n    pass\n",
   "hint": "<p>Keep <code>owner</code>, a dict from project to student. To place student <em>s</em>, try each project <em>p</em> not yet visited in this search: if <em>p</em> has no owner, or its owner can be placed elsewhere (recursively), give <em>p</em> to <em>s</em>. This is the flow reduction from the notes, with the augmenting path found by depth-first search.</p>",
   "solution": "def max_matching(prefs):\n    owner = {}\n    def place(s, seen):\n        for p in prefs[s]:\n            if p in seen:\n                continue\n            seen.add(p)\n            if p not in owner or place(owner[p], seen):\n                owner[p] = s\n                return True\n        return False\n    for s in prefs:\n        place(s, set())\n    return {s: p for p, s in owner.items()}\n",
   "tests": [
    {
     "label": "The practice problem",
     "type": "assert",
     "code": "m = max_matching({\"Ana\": [1, 2], \"Ben\": [1], \"Cy\": [2, 3]})\nassert m == {\"Ana\": 2, \"Ben\": 1, \"Cy\": 3}, m\n"
    },
    {
     "label": "Not everyone can be placed",
     "type": "assert",
     "code": "m = max_matching({\"A\": [\"x\"], \"B\": [\"x\"], \"C\": [\"x\", \"y\"]})\nassert len(m) == 2 and len(set(m.values())) == 2\nassert all(p in {\"A\": [\"x\"], \"B\": [\"x\"], \"C\": [\"x\", \"y\"]}[s] for s, p in m.items())\n"
    },
    {
     "label": "Needs reassignment",
     "type": "assert",
     "code": "prefs = {\"s1\": [\"p1\", \"p2\"], \"s2\": [\"p1\"], \"s3\": [\"p2\", \"p3\"], \"s4\": [\"p3\", \"p4\"]}\nm = max_matching(prefs)\nassert len(m) == 4 and len(set(m.values())) == 4, m\n"
    },
    {
     "label": "Empty preferences",
     "call": "max_matching({\"A\": []})",
     "expect": "{}"
    }
   ]
  }
 ],
 "al8": [
  {
   "id": "sat_solver",
   "title": "A small SAT solver",
   "prompt": "<p>A formula in <em>conjunctive normal form</em> is a list of clauses, each a list of nonzero integers: <code>3</code> means variable 3 is true and <code>-3</code> means it is false; each entry of a clause is a <em>literal</em> (a variable or its negation); a clause is satisfied if at least one of its literals is true, and the formula if every clause is. Variables are numbered 1 to <em>n</em>. Write <code>check(clauses, assignment)</code>, where <code>assignment</code> is a dict from variable to bool (the polynomial-time certificate check), and <code>solve(clauses, n)</code>, which returns a satisfying assignment or <code>None</code>, using backtracking: assign variables one at a time and abandon a branch as soon as some clause has all its literals false.</p>",
   "starter": "def check(clauses, assignment):\n    pass\n\ndef solve(clauses, n):\n    pass\n",
   "hint": "<p>A literal <em>x</em> is true when <code>assignment[abs(x)] == (x &gt; 0)</code>. For pruning, write a helper that says whether a clause is already falsified: every literal's variable is assigned and the literal is false.</p>",
   "solution": "def check(clauses, assignment):\n    return all(any(assignment[abs(x)] == (x > 0) for x in c) for c in clauses)\n\ndef solve(clauses, n):\n    a = {}\n    def falsified(c):\n        return all(abs(x) in a and a[abs(x)] != (x > 0) for x in c)\n    def go(v):\n        if any(falsified(c) for c in clauses):\n            return False\n        if v > n:\n            return True\n        for val in (True, False):\n            a[v] = val\n            if go(v + 1):\n                return True\n        del a[v]\n        return False\n    return dict(a) if go(1) else None\n",
   "tests": [
    {
     "label": "Checking certificates",
     "type": "assert",
     "code": "f = [[1, 2], [-1, 3], [-2, -3]]\nassert check(f, {1: True, 2: False, 3: True}) is True\nassert check(f, {1: True, 2: True, 3: True}) is False\n"
    },
    {
     "label": "Satisfiable formula",
     "type": "assert",
     "code": "f = [[1, 2], [-1, 3], [-2, -3], [2, 3]]\na = solve(f, 3)\nassert a is not None and check(f, a), a\n"
    },
    {
     "label": "Unsatisfiable formula",
     "call": "solve([[1], [-1, 2], [-2]], 2)",
     "expect": "None"
    },
    {
     "label": "Pigeonhole: 4 pigeons, 3 holes",
     "type": "assert",
     "limit": 10,
     "code": "# variable p*3 + h + 1 means pigeon p is in hole h\ncl = [[p * 3 + h + 1 for h in range(3)] for p in range(4)]\nfor h in range(3):\n    for p in range(4):\n        for q in range(p + 1, 4):\n            cl.append([-(p * 3 + h + 1), -(q * 3 + h + 1)])\nassert solve(cl, 12) is None\n"
    },
    {
     "label": "A 30-variable chain",
     "type": "assert",
     "limit": 8,
     "code": "n = 30\ncl = [[-i, i + 1] for i in range(1, n)] + [[1]]\na = solve(cl, n)\nassert a is not None and all(a[i] for i in range(1, n + 1))\n"
    }
   ]
  },
  {
   "id": "vertex_cover",
   "title": "Approximating vertex cover",
   "prompt": "<p>Write <code>is_cover(edges, cover)</code> that checks whether a set of vertices touches every edge, <code>approx_cover(edges)</code> that returns the 2-approximation from the notes (for each edge in order, if neither end is in the cover, add both), and <code>exact_cover_size(edges)</code> that returns the size of a smallest vertex cover by trying subsets of increasing size (only used on small graphs).</p>",
   "starter": "import itertools\n\ndef is_cover(edges, cover):\n    pass\n\ndef approx_cover(edges):\n    pass\n\ndef exact_cover_size(edges):\n    pass\n",
   "hint": "<p>For the exact version, collect the vertices, then for <em>k</em> = 0, 1, 2, … try every combination of <em>k</em> vertices with <code>itertools.combinations</code> and return the first <em>k</em> that works.</p>",
   "solution": "import itertools\n\ndef is_cover(edges, cover):\n    return all(u in cover or v in cover for u, v in edges)\n\ndef approx_cover(edges):\n    cover = set()\n    for u, v in edges:\n        if u not in cover and v not in cover:\n            cover.update((u, v))\n    return cover\n\ndef exact_cover_size(edges):\n    verts = sorted({x for e in edges for x in e})\n    for k in range(len(verts) + 1):\n        for c in itertools.combinations(verts, k):\n            if is_cover(edges, set(c)):\n                return k\n",
   "tests": [
    {
     "label": "The star example",
     "type": "assert",
     "code": "star = [(0, i) for i in range(1, 6)]\nassert approx_cover(star) == {0, 1} and exact_cover_size(star) == 1\n"
    },
    {
     "label": "The path practice problem",
     "type": "assert",
     "code": "path = [(1, 2), (2, 3), (3, 4), (4, 5), (5, 6)]\nassert approx_cover(path) == {1, 2, 3, 4, 5, 6} and exact_cover_size(path) == 3\n"
    },
    {
     "label": "Checking covers",
     "type": "assert",
     "code": "assert is_cover([(1, 2), (2, 3)], {2}) and not is_cover([(1, 2), (2, 3)], {1})\n"
    },
    {
     "label": "Within a factor of 2",
     "type": "assert",
     "hidden": true,
     "code": "import random\nrandom.seed(11)\nfor _ in range(50):\n    edges = [(random.randrange(8), random.randrange(8)) for _ in range(10)]\n    edges = [(u, v) for u, v in edges if u != v]\n    if not edges:\n        continue\n    c = approx_cover(edges)\n    assert is_cover(edges, c) and len(c) <= 2 * exact_cover_size(edges)\n"
    }
   ]
  }
 ]
});
