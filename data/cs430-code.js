/* Auto-graded programming problems for CS 430, by lesson. Generated from a Python spec, so every
   string is JSON. Randomized problems take a seeded random.Random, so every run is repeatable;
   statistical properties are tested over fixed seeds with generous bounds. Sketches hash with
   hashlib.blake2b rather than Python's hash(), which changes from run to run for strings. */
CSA.addCode("cs430", {
 "aa1": [
  {
   "id": "counter_potential",
   "title": "A binary counter and its potential",
   "prompt": "<p>A binary counter is a list of bits, least significant first: <code>[1, 1, 0, 1]</code> is 1 + 2 + 8 = 11. Write two functions.</p>\n<ul><li><code>increment(bits)</code> adds 1 to the counter in place, as in the notes: turn the trailing 1s into 0s, then turn the first 0 into a 1, appending a new bit if every bit was 1. Return the actual cost, the number of bits changed. <code>[1, 1, 0, 1]</code> becomes <code>[0, 0, 1, 1]</code> at cost 3; <code>[1, 1]</code> becomes <code>[0, 0, 1]</code> at cost 3 (two bits cleared, one appended); <code>[]</code> (zero) becomes <code>[1]</code> at cost 1.</li>\n<li><code>amortized(costs, potentials)</code>: <code>costs</code> holds the actual costs <em>c</em><sub>1</sub>, …, <em>c</em><sub><em>m</em></sub> of a sequence of operations, and <code>potentials</code> the values Φ<sub>0</sub>, Φ<sub>1</sub>, …, Φ<sub><em>m</em></sub> of a potential function before the first operation and after each one (so it is one longer). Return the list of amortized costs <em>c</em><sub><em>i</em></sub> + Φ<sub><em>i</em></sub> − Φ<sub><em>i</em>−1</sub>. Raise <code>ValueError</code> if the lengths don't fit.</li></ul>\n<p>The tests then check the notes' claims: <em>n</em> increments from zero cost fewer than 2<em>n</em>, and with Φ = the number of 1 bits, every increment has amortized cost exactly 2.</p>",
   "starter": "def increment(bits):\n    pass\n\ndef amortized(costs, potentials):\n    pass\n",
   "hint": "<p>In <code>increment</code>, walk an index <code>i</code> from 0 while <code>bits[i] == 1</code>, setting each to 0. If <code>i</code> reaches the end, append 1; otherwise set <code>bits[i] = 1</code>. The cost is the number of bits you touched.</p>",
   "solution": "def increment(bits):\n    i = 0\n    while i < len(bits) and bits[i] == 1:\n        bits[i] = 0\n        i += 1\n    if i == len(bits):\n        bits.append(1)\n    else:\n        bits[i] = 1\n    return i + 1\n\ndef amortized(costs, potentials):\n    if len(potentials) != len(costs) + 1:\n        raise ValueError(\"need one more potential than costs\")\n    return [c + potentials[i + 1] - potentials[i] for i, c in enumerate(costs)]\n",
   "tests": [
    {
     "label": "11 + 1 = 12",
     "type": "assert",
     "code": "b = [1, 1, 0, 1]\nc = increment(b)\nassert b == [0, 0, 1, 1], f\"bits became {b}\"\nassert c == 3, f\"cost {c}, expected 3\"\n"
    },
    {
     "label": "Carrying into a new bit, and incrementing zero",
     "type": "assert",
     "code": "b = [1, 1]\nassert increment(b) == 3 and b == [0, 0, 1], f\"got {b}\"\nz = []\nassert increment(z) == 1 and z == [1], f\"got {z}\"\n"
    },
    {
     "label": "Amortized costs from potentials",
     "call": "amortized([1, 1, 5], [0, 1, 2, 0])",
     "expect": "[2, 2, 3]"
    },
    {
     "label": "Mismatched lengths raise ValueError",
     "type": "raises",
     "call": "amortized([1, 2], [0, 1])",
     "error": "ValueError"
    },
    {
     "label": "Costs of the first 16 increments (aggregate: 31 in total)",
     "type": "assert",
     "code": "b = []\ncosts = [increment(b) for _ in range(16)]\nassert costs == [1, 2, 1, 3, 1, 2, 1, 4, 1, 2, 1, 3, 1, 2, 1, 5], costs\nassert sum(costs) == 31\n"
    },
    {
     "label": "1000 increments cost fewer than 2000, and Φ = number of 1s gives amortized cost 2",
     "type": "assert",
     "code": "b = []\ncosts, pots = [], [0]\nfor _ in range(1000):\n    costs.append(increment(b))\n    pots.append(sum(b))\nassert sum(costs) == 1994, sum(costs)\nam = amortized(costs, pots)\nassert all(a == 2 for a in am), \"some amortized cost is not 2\"\n"
    }
   ]
  },
  {
   "id": "shrinking_array",
   "title": "A potential for a growing and shrinking array",
   "prompt": "<p>Write a class <code>DynArray</code> that simulates the dynamic array of CS 201 Lesson 2, with shrinking, and reports the cost of each operation. It has attributes <code>n</code> (number of items) and <code>cap</code> (capacity), starting at <code>n = 0</code>, <code>cap = 1</code>.</p>\n<ul><li><code>append(x)</code>: if the array is full (<code>n == cap</code>), double <code>cap</code>, copying the <code>n</code> items, and then write <code>x</code>: cost <code>n + 1</code> (with the old <code>n</code>). Otherwise just write <code>x</code>: cost 1. Return the cost.</li>\n<li><code>pop()</code>: raise <code>IndexError</code> if empty. Otherwise remove and return the last item, at cost 1; then, if <code>cap &gt;= 4</code> and the new <code>n == cap // 4</code>, halve <code>cap</code>, copying the <code>n</code> remaining items, which adds <code>n</code> to the cost. Return the pair <code>(item, cost)</code>.</li></ul>\n<p>Then write <code>phi(n, cap)</code>, a potential function that proves every operation has amortized cost at most 3. The tests run long seeded random sequences of appends and pops and check, after every operation, that <code>phi</code> is never negative and that the actual cost plus the change in <code>phi</code> is at most 3. (So <em>m</em> operations cost at most 3<em>m</em> + <code>phi(0, 1)</code>.)</p>",
   "starter": "class DynArray:\n    def __init__(self):\n        self.n = 0\n        self.cap = 1\n        self.data = [None]\n\n    def append(self, x):\n        pass\n\n    def pop(self):\n        pass\n\ndef phi(n, cap):\n    pass\n",
   "hint": "<p>Use two formulas, one for each half: when the array is at least half full, the potential must have saved enough to pay for a doubling (<code>2*n - cap</code> works, as in the notes); when it is less than half full, it must save for a halving, and should grow as <code>n</code> falls toward <code>cap/4</code>. Try <code>cap/2 - n</code> there, and check both kinds of resize by hand.</p>",
   "solution": "class DynArray:\n    def __init__(self):\n        self.n = 0\n        self.cap = 1\n        self.data = [None]\n\n    def append(self, x):\n        cost = 1\n        if self.n == self.cap:\n            cost += self.n\n            self.cap *= 2\n            self.data = self.data[:self.n] + [None] * (self.cap - self.n)\n        self.data[self.n] = x\n        self.n += 1\n        return cost\n\n    def pop(self):\n        if self.n == 0:\n            raise IndexError(\"pop from empty DynArray\")\n        self.n -= 1\n        item = self.data[self.n]\n        self.data[self.n] = None\n        cost = 1\n        if self.cap >= 4 and self.n == self.cap // 4:\n            self.cap //= 2\n            self.data = self.data[:self.cap]\n            cost += self.n\n        return item, cost\n\ndef phi(n, cap):\n    if 2 * n >= cap:\n        return 2 * n - cap\n    return cap / 2 - n\n",
   "tests": [
    {
     "label": "Append costs 1, 2, 3, 1, 5, 1, 1, 1, 9",
     "type": "assert",
     "code": "a = DynArray()\ncosts = [a.append(i) for i in range(9)]\nassert costs == [1, 2, 3, 1, 5, 1, 1, 1, 9], costs\nassert (a.n, a.cap) == (9, 16), (a.n, a.cap)\n"
    },
    {
     "label": "Pops return items, and halve at a quarter full",
     "type": "assert",
     "code": "a = DynArray()\nfor i in range(9):\n    a.append(i)\nout = [a.pop() for _ in range(5)]\nassert [x for x, c in out] == [8, 7, 6, 5, 4], out\nassert [c for x, c in out] == [1, 1, 1, 1, 5], out\nassert (a.n, a.cap) == (4, 8), (a.n, a.cap)\n"
    },
    {
     "label": "Popping an empty array raises IndexError",
     "type": "raises",
     "call": "DynArray().pop()",
     "error": "IndexError"
    },
    {
     "label": "phi is never negative and every amortized cost is at most 3 (random sequences)",
     "type": "assert",
     "code": "import random\nfor seed in range(20):\n    rng = random.Random(seed)\n    a = DynArray()\n    total, steps = 0, 0\n    for _ in range(3000):\n        before = phi(a.n, a.cap)\n        if a.n > 0 and rng.random() < 0.45:\n            _, c = a.pop()\n        else:\n            c = a.append(0)\n        after = phi(a.n, a.cap)\n        assert after >= 0, f\"phi({a.n}, {a.cap}) = {after} is negative\"\n        assert c + after - before <= 3 + 1e-9, f\"amortized cost {c + after - before} > 3 at n={a.n}, cap={a.cap}\"\n        total += c\n        steps += 1\n    assert total <= 3 * steps + phi(0, 1) + 1e-9\n"
    },
    {
     "label": "Alternating at the boundary stays cheap",
     "type": "assert",
     "code": "a = DynArray()\nfor i in range(64):\n    a.append(i)\ncost = 0\nfor _ in range(1000):\n    cost += a.pop()[1]\n    cost += a.append(0)\nassert cost == 2000, f\"1000 pop/append pairs cost {cost}\"\nfor _ in range(64):\n    before = phi(a.n, a.cap)\n    _, c = a.pop()\n    assert c + phi(a.n, a.cap) - before <= 3 + 1e-9\nassert (a.n, a.cap) == (0, 2), (a.n, a.cap)\n",
     "hidden": true
    }
   ]
  }
 ],
 "aa2": [
  {
   "id": "universal_hashing",
   "title": "A universal hash family",
   "prompt": "<p>Implement the Carter–Wegman family from the notes, <em>h</em><sub><em>a</em>,<em>b</em></sub>(<em>x</em>) = ((<em>ax</em> + <em>b</em>) mod <em>p</em>) mod <em>m</em>, for a prime <em>p</em> larger than every key, 1 ≤ <em>a</em> ≤ <em>p</em> − 1 and 0 ≤ <em>b</em> ≤ <em>p</em> − 1.</p>\n<ul><li><code>make_hash(a, b, p, m)</code> returns the function <em>h</em><sub><em>a</em>,<em>b</em></sub> (a Python function of one argument).</li>\n<li><code>random_hash(p, m, rng)</code> picks <code>a = rng.randrange(1, p)</code> and then <code>b = rng.randrange(p)</code>, in that order, and returns <code>make_hash(a, b, p, m)</code>.</li>\n<li><code>collision_fraction(p, m, x, y)</code> returns, as a <code>fractions.Fraction</code>, the exact fraction of all (<em>p</em> − 1)<em>p</em> pairs (<em>a</em>, <em>b</em>) for which <em>h</em><sub><em>a</em>,<em>b</em></sub>(<em>x</em>) = <em>h</em><sub><em>a</em>,<em>b</em></sub>(<em>y</em>). For <em>x</em> ≠ <em>y</em> the notes prove it is at most 1/<em>m</em>.</li>\n<li><code>colliding_pairs(keys, h)</code> returns the number of pairs of distinct positions <em>i</em> &lt; <em>j</em> with <code>h(keys[i]) == h(keys[j])</code>. Count with a dict of bucket sizes: a bucket with <em>s</em> keys holds <em>s</em>(<em>s</em> − 1)/2 pairs.</li></ul>",
   "starter": "from fractions import Fraction\n\ndef make_hash(a, b, p, m):\n    pass\n\ndef random_hash(p, m, rng):\n    pass\n\ndef collision_fraction(p, m, x, y):\n    pass\n\ndef colliding_pairs(keys, h):\n    pass\n",
   "hint": "<p><code>make_hash</code> can return a <code>lambda x: ((a * x + b) % p) % m</code>. For <code>collision_fraction</code>, loop over every <code>a</code> in <code>range(1, p)</code> and <code>b</code> in <code>range(p)</code> and count, then return <code>Fraction(count, (p - 1) * p)</code>.</p>",
   "solution": "from fractions import Fraction\n\ndef make_hash(a, b, p, m):\n    return lambda x: ((a * x + b) % p) % m\n\ndef random_hash(p, m, rng):\n    a = rng.randrange(1, p)\n    b = rng.randrange(p)\n    return make_hash(a, b, p, m)\n\ndef collision_fraction(p, m, x, y):\n    count = 0\n    for a in range(1, p):\n        for b in range(p):\n            if ((a * x + b) % p) % m == ((a * y + b) % p) % m:\n                count += 1\n    return Fraction(count, (p - 1) * p)\n\ndef colliding_pairs(keys, h):\n    sizes = {}\n    for k in keys:\n        v = h(k)\n        sizes[v] = sizes.get(v, 0) + 1\n    return sum(s * (s - 1) // 2 for s in sizes.values())\n",
   "tests": [
    {
     "label": "h(3,7,17,5) on a few keys",
     "call": "[make_hash(3, 7, 17, 5)(x) for x in range(6)]",
     "expect": "[2, 0, 3, 1, 2, 0]"
    },
    {
     "label": "random_hash uses rng as specified",
     "type": "assert",
     "code": "import random\nh = random_hash(101, 10, random.Random(5))\nr = random.Random(5)\na = r.randrange(1, 101); b = r.randrange(101)\nassert [h(x) for x in range(50)] == [((a * x + b) % 101) % 10 for x in range(50)]\n"
    },
    {
     "label": "An exact collision fraction",
     "type": "assert",
     "code": "from fractions import Fraction\nf = collision_fraction(17, 5, 1, 2)\nassert f == Fraction(21, 136), f\"got {f}\"\n"
    },
    {
     "label": "Every pair collides with probability at most 1/m (p = 13, m = 4)",
     "type": "assert",
     "code": "from fractions import Fraction\nworst = max(collision_fraction(13, 4, x, y) for x in range(13) for y in range(x + 1, 13))\nassert worst <= Fraction(1, 4), f\"worst pair collides with probability {worst}\"\n"
    },
    {
     "label": "Counting colliding pairs",
     "call": "colliding_pairs([1, 5, 9, 2, 6, 3], lambda x: x % 4)",
     "expect": "4"
    },
    {
     "label": "Keys that defeat x mod m are harmless to a random member of the family",
     "type": "assert",
     "code": "import random\np, m = 1000003, 100\nkeys = [m * i for i in range(400)]                  # all 0 mod 100\nassert colliding_pairs(keys, lambda x: x % m) == 400 * 399 // 2\nexpected = (400 * 399 // 2) / m                     # at most this on average, by universality\navg = sum(colliding_pairs(keys, random_hash(p, m, random.Random(s))) for s in range(20)) / 20\nassert avg <= 1.5 * expected, f\"average {avg} colliding pairs, expected about {expected}\"\n"
    }
   ]
  },
  {
   "id": "karger_min_cut",
   "title": "Karger's min cut with repetition",
   "prompt": "<p>A multigraph has vertices 0 to <code>n</code> − 1 and a list of <code>edges</code>, pairs <code>(u, v)</code> with <em>u</em> ≠ <em>v</em> (repeats allowed). Implement Karger's contraction algorithm.</p>\n<ul><li><code>contract_once(n, edges, rng)</code>: copy the edge list and shuffle it with <code>rng.shuffle</code>. Keep a union-find over the vertices (CS 201 Lesson 8). Go through the shuffled edges in order; whenever an edge joins two different groups, merge them (contract it); edges inside one group are self-loops and are skipped. Stop when two groups remain, and return the number of original edges whose ends are in different groups. (Taking the edges in a random order and skipping self-loops picks each contraction uniformly among the remaining non-loop edges, as the notes do.) The graph is connected and <code>n</code> ≥ 2.</li>\n<li><code>trials_needed(n, delta)</code>: the number of independent runs the notes give for failure probability at most <code>delta</code>, ⌈C(<em>n</em>, 2) ln(1/<em>δ</em>)⌉.</li>\n<li><code>min_cut(n, edges, trials, seed)</code>: make one <code>rng = random.Random(seed)</code>, call <code>contract_once</code> <code>trials</code> times with it, and return the smallest cut found.</li></ul>",
   "starter": "import math\nimport random\n\ndef contract_once(n, edges, rng):\n    pass\n\ndef trials_needed(n, delta):\n    pass\n\ndef min_cut(n, edges, trials, seed=0):\n    pass\n",
   "hint": "<p>Keep a counter <code>groups = n</code> and decrease it on every successful union; stop the loop when it reaches 2. Afterwards, count the edges <code>(u, v)</code> with <code>find(u) != find(v)</code>.</p>",
   "solution": "import math\nimport random\n\ndef contract_once(n, edges, rng):\n    order = list(edges)\n    rng.shuffle(order)\n    parent = list(range(n))\n\n    def find(x):\n        while parent[x] != x:\n            parent[x] = parent[parent[x]]\n            x = parent[x]\n        return x\n\n    groups = n\n    for u, v in order:\n        if groups == 2:\n            break\n        ru, rv = find(u), find(v)\n        if ru != rv:\n            parent[ru] = rv\n            groups -= 1\n    return sum(1 for u, v in edges if find(u) != find(v))\n\ndef trials_needed(n, delta):\n    return math.ceil(math.comb(n, 2) * math.log(1 / delta))\n\ndef min_cut(n, edges, trials, seed=0):\n    rng = random.Random(seed)\n    return min(contract_once(n, edges, rng) for _ in range(trials))\n",
   "tests": [
    {
     "label": "trials_needed(10, 1e-6)",
     "call": "trials_needed(10, 1e-6)",
     "expect": "622"
    },
    {
     "label": "A single run returns a cut no smaller than the minimum",
     "type": "assert",
     "code": "import random\ncycle = [(i, (i + 1) % 8) for i in range(8)]\nfor s in range(30):\n    c = contract_once(8, cycle, random.Random(s))\n    assert c >= 2, f\"cut of size {c} in an 8-cycle?\"\n"
    },
    {
     "label": "Two 5-cliques joined by 2 edges: min cut 2",
     "type": "assert",
     "code": "import itertools\nE = [(u, v) for u, v in itertools.combinations(range(5), 2)]\nE += [(u + 5, v + 5) for u, v in E]\nE += [(0, 5), (1, 6)]\nassert min_cut(10, E, trials_needed(10, 1e-6), seed=1) == 2\n"
    },
    {
     "label": "One run succeeds at least 1/C(n,2) of the time",
     "type": "assert",
     "code": "import itertools, random\nE = [(u, v) for u, v in itertools.combinations(range(5), 2)]\nE += [(u + 5, v + 5) for u, v in E]\nE += [(0, 5), (1, 6)]\nrng = random.Random(7)\nwins = sum(contract_once(10, E, rng) == 2 for _ in range(900))\nassert wins >= 900 / 45, f\"only {wins} of 900 runs found the min cut\"\n"
    },
    {
     "label": "Parallel edges count: a multigraph",
     "type": "assert",
     "code": "E = [(0, 1)] * 3 + [(1, 2)] * 3 + [(2, 0)] * 3 + [(2, 3)] * 2\nassert min_cut(4, E, trials_needed(4, 1e-6), seed=3) == 2\n",
     "hidden": true
    }
   ]
  }
 ],
 "aa3": [
  {
   "id": "greedy_set_cover",
   "title": "Greedy set cover",
   "prompt": "<p>Write <code>greedy_set_cover(universe, sets)</code>. <code>universe</code> is a set of elements and <code>sets</code> a list of sets. Repeatedly choose the set that covers the most still-uncovered elements (on a tie, the one with the smallest index), until everything is covered. Return the list of chosen indexes, in the order chosen. Raise <code>ValueError</code> if the sets can't cover the universe.</p>\n<p>Also write <code>harmonic(n)</code>, returning <em>H</em><sub><em>n</em></sub> = 1 + 1/2 + … + 1/<em>n</em> as a float. A test compares greedy with the true optimum (by brute force) on random instances and checks the notes' bound: greedy uses at most <em>H</em><sub><em>n</em></sub> times the optimum, where <em>n</em> is the size of the universe.</p>",
   "starter": "def greedy_set_cover(universe, sets):\n    pass\n\ndef harmonic(n):\n    pass\n",
   "hint": "<p>Keep a set <code>left</code> of uncovered elements. Each round, compute <code>len(sets[i] &amp; left)</code> for every <code>i</code>; if the best is 0 while <code>left</code> is non-empty, the universe can't be covered.</p>",
   "solution": "def greedy_set_cover(universe, sets):\n    left = set(universe)\n    chosen = []\n    while left:\n        best = max(range(len(sets)), key=lambda i: (len(sets[i] & left), -i), default=None)\n        if best is None or not sets[best] & left:\n            raise ValueError(\"the sets don't cover the universe\")\n        chosen.append(best)\n        left -= sets[best]\n    return chosen\n\ndef harmonic(n):\n    return sum(1 / k for k in range(1, n + 1))\n",
   "tests": [
    {
     "label": "A small instance",
     "call": "greedy_set_cover({1, 2, 3, 4, 5}, [{1, 2, 3}, {2, 4}, {3, 4}, {4, 5}])",
     "expect": "[0, 3]"
    },
    {
     "label": "Ties go to the smallest index",
     "call": "greedy_set_cover({1, 2, 3, 4}, [{1, 2}, {3, 4}, {2, 3}])",
     "expect": "[0, 1]"
    },
    {
     "label": "The notes' example where greedy needs 3 sets and 2 suffice",
     "type": "assert",
     "code": "A, B = set(range(1, 8)), set(range(8, 15))\nS1 = {1, 2, 3, 4, 8, 9, 10, 11}\nS2 = {5, 6, 12, 13}\nS3 = {7, 14}\ngot = greedy_set_cover(A | B, [A, B, S1, S2, S3])\nassert got == [2, 3, 4], f\"greedy should take S1, S2, S3, got {got}\"\n"
    },
    {
     "label": "Uncoverable raises ValueError",
     "type": "raises",
     "call": "greedy_set_cover({1, 2, 3}, [{1}, {2}])",
     "error": "ValueError"
    },
    {
     "label": "harmonic(4)",
     "call": "harmonic(4)",
     "expect": "2.083333333333333"
    },
    {
     "label": "Greedy is within H_n of optimal on random instances",
     "type": "assert",
     "code": "import random, itertools\nfor seed in range(25):\n    rng = random.Random(seed)\n    U = set(range(10))\n    sets = [set(rng.sample(sorted(U), rng.randint(1, 5))) for _ in range(8)]\n    sets.append({rng.randrange(10)})\n    if set().union(*sets) != U:\n        continue\n    g = len(greedy_set_cover(U, sets))\n    opt = next(k for k in range(1, len(sets) + 1)\n               if any(set().union(*c) == U for c in itertools.combinations(sets, k)))\n    assert opt <= g <= harmonic(10) * opt, (seed, g, opt)\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "metric_tsp",
   "title": "Metric TSP via a minimum spanning tree",
   "prompt": "<p>Points are <code>(x, y)</code> pairs; the distance is Euclidean (<code>math.dist</code>), which satisfies the triangle inequality. Write:</p>\n<ul><li><code>mst_edges(points)</code>: a minimum spanning tree by Prim's algorithm (CS 220 Lesson 6), started at point 0, returned as a list of <code>(parent, child)</code> pairs in the order the children join the tree. O(<em>n</em><sup>2</sup>) is fine: keep, for each point outside the tree, its distance to the nearest tree point and which tree point that is. Break ties this way: when several outside points share the smallest distance, the lowest-indexed joins next; when a new tree point is exactly as close to an outside point as its current nearest tree point, keep the current one (update only on a strictly smaller distance).</li>\n<li><code>tsp_tour(points)</code>: the 2-approximation from the notes. Visit the tree in preorder from 0 (a point, then each of its children's subtrees, children in increasing index order) and return the list of point indexes in that order, each exactly once, starting with 0. The tour returns to 0 at the end, but don't repeat 0 in the list.</li>\n<li><code>tour_length(points, tour)</code>: the length of the closed tour, including the edge back to the start.</li></ul>",
   "starter": "import math\n\ndef mst_edges(points):\n    pass\n\ndef tsp_tour(points):\n    pass\n\ndef tour_length(points, tour):\n    pass\n",
   "hint": "<p>For Prim's, keep lists <code>best[v]</code> (distance to the tree) and <code>link[v]</code> (the tree point achieving it). Each round, pick the outside point with the smallest <code>best</code>, record <code>(link[v], v)</code>, and update the others. For the preorder, build a dict of children lists, sort each, and use a stack (push children in reverse order) or recursion.</p>",
   "solution": "import math\n\ndef mst_edges(points):\n    n = len(points)\n    if n == 0:\n        return []\n    in_tree = [False] * n\n    best = [math.inf] * n\n    link = [None] * n\n    best[0] = 0\n    edges = []\n    for _ in range(n):\n        v = min((i for i in range(n) if not in_tree[i]), key=lambda i: best[i])\n        in_tree[v] = True\n        if link[v] is not None:\n            edges.append((link[v], v))\n        for u in range(n):\n            if not in_tree[u]:\n                d = math.dist(points[v], points[u])\n                if d < best[u]:\n                    best[u], link[u] = d, v\n    return edges\n\ndef tsp_tour(points):\n    if not points:\n        return []\n    children = {i: [] for i in range(len(points))}\n    for p, c in mst_edges(points):\n        children[p].append(c)\n    tour, stack = [], [0]\n    while stack:\n        v = stack.pop()\n        tour.append(v)\n        stack.extend(sorted(children[v], reverse=True))\n    return tour\n\ndef tour_length(points, tour):\n    return sum(math.dist(points[tour[i]], points[tour[(i + 1) % len(tour)]]) for i in range(len(tour)))\n",
   "tests": [
    {
     "label": "Prim's on four points",
     "call": "mst_edges([(0, 0), (1, 0), (1, 1), (5, 0)])",
     "expect": "[(0, 1), (1, 2), (1, 3)]"
    },
    {
     "label": "Preorder tour of that tree",
     "call": "tsp_tour([(0, 0), (1, 0), (1, 1), (5, 0)])",
     "expect": "[0, 1, 2, 3]"
    },
    {
     "label": "Length of a closed unit square tour",
     "call": "tour_length([(0, 0), (1, 0), (1, 1), (0, 1)], [0, 1, 2, 3])",
     "expect": "4.0"
    },
    {
     "label": "Ties: the lowest-indexed point joins first, and an equal distance doesn't change its link",
     "call": "mst_edges([(0, 0), (1, 0), (0.5, 2), (-1, 0)])",
     "expect": "[(0, 1), (0, 3), (0, 2)]"
    },
    {
     "label": "Children are visited in increasing index order",
     "call": "tsp_tour([(0, 0), (0, 3), (3, 0), (-3, 0), (0, -3)])",
     "expect": "[0, 1, 2, 3, 4]"
    },
    {
     "label": "The tour is within twice the MST, and within twice the optimum (random points)",
     "type": "assert",
     "code": "import random, itertools, math\nfor seed in range(10):\n    rng = random.Random(seed)\n    pts = [(rng.random(), rng.random()) for _ in range(7)]\n    t = tsp_tour(pts)\n    assert sorted(t) == list(range(7)) and t[0] == 0, t\n    mst = sum(math.dist(pts[a], pts[b]) for a, b in mst_edges(pts))\n    L = tour_length(pts, t)\n    opt = min(tour_length(pts, [0] + list(p)) for p in itertools.permutations(range(1, 7)))\n    assert mst <= opt + 1e-9, \"the MST can't be longer than the optimal tour\"\n    assert L <= 2 * mst + 1e-9 and L <= 2 * opt + 1e-9, (seed, L, mst, opt)\n",
     "hidden": true
    },
    {
     "label": "200 points in well under a second",
     "type": "assert",
     "code": "import random\nrng = random.Random(1)\npts = [(rng.random(), rng.random()) for _ in range(200)]\nt = tsp_tour(pts)\nassert sorted(t) == list(range(200))\n"
    }
   ]
  },
  {
   "id": "knapsack_fptas",
   "title": "An FPTAS for knapsack",
   "prompt": "<p>Items are <code>(weight, value)</code> pairs of positive integers, and the capacity is <code>W</code>. Write:</p>\n<ul><li><code>knapsack_by_value(items, W)</code>: the exact dynamic program from the notes, over values: <em>M</em>[<em>v</em>] = the least weight of a set of items with total value exactly <em>v</em>. Return the list of indexes (sorted) of a feasible set of greatest total value. If several sets tie for the greatest value, any one of them is accepted: the tests that show an exact answer have a single best set, and the others check only feasibility and total value. Its time is O(<em>n</em> · Σ<em>v</em><sub><em>i</em></sub>).</li>\n<li><code>fptas(items, W, eps)</code>: drop items heavier than <code>W</code> (if none remain, return <code>[]</code>, since nothing fits); let <em>v</em><sub>max</sub> be the largest remaining value and <em>K</em> = <code>eps * vmax / n</code> (with <em>n</em> the number of remaining items); round each value down to <code>floor(v / K)</code>; solve the rounded instance exactly with <code>knapsack_by_value</code>; return the chosen indexes, sorted, as indexes into the original <code>items</code>. Its total value is at least (1 − <code>eps</code>) times the optimum.</li></ul>\n<p>Values in the tests reach a billion, so the exact DP is only usable after rounding.</p>",
   "starter": "import math\n\ndef knapsack_by_value(items, W):\n    pass\n\ndef fptas(items, W, eps):\n    pass\n",
   "hint": "<p>Keep, for each value <em>v</em> reached so far, the least weight and the set of indexes achieving it (a dict from value to <code>(weight, indexes)</code> is easiest). Process items one at a time, and loop over a snapshot of the dict so each item is used at most once. At the end, take the largest value whose weight is at most <code>W</code>.</p>",
   "solution": "import math\n\ndef knapsack_by_value(items, W):\n    best = {0: (0, ())}\n    for i, (w, v) in enumerate(items):\n        for val, (wt, chosen) in list(best.items()):\n            nv, nw = val + v, wt + w\n            if nw <= W and (nv not in best or nw < best[nv][0]):\n                best[nv] = (nw, chosen + (i,))\n    top = max(best)\n    return sorted(best[top][1])\n\ndef fptas(items, W, eps):\n    keep = [i for i, (w, v) in enumerate(items) if w <= W]\n    if not keep:\n        return []\n    vmax = max(items[i][1] for i in keep)\n    K = eps * vmax / len(keep)\n    scaled = [(items[i][0], math.floor(items[i][1] / K)) for i in keep]\n    return sorted(keep[j] for j in knapsack_by_value(scaled, W))\n",
   "tests": [
    {
     "label": "CS 220's example: (1,1), (3,4), (4,5), (5,7) with W = 7",
     "call": "knapsack_by_value([(1, 1), (3, 4), (4, 5), (5, 7)], 7)",
     "expect": "[1, 2]"
    },
    {
     "label": "Nothing fits",
     "call": "knapsack_by_value([(5, 10)], 4)",
     "expect": "[]"
    },
    {
     "label": "fptas when every item is heavier than W",
     "call": "fptas([(5, 10), (9, 3)], 4, 0.1)",
     "expect": "[]"
    },
    {
     "label": "fptas drops items heavier than W",
     "call": "fptas([(100, 1000), (3, 4), (4, 5)], 7, 0.1)",
     "expect": "[1, 2]"
    },
    {
     "label": "Within (1 − eps) of optimal on random small instances",
     "type": "assert",
     "code": "import random, itertools\nfor seed in range(15):\n    rng = random.Random(seed)\n    items = [(rng.randint(1, 30), rng.randint(1, 10**9)) for _ in range(12)]\n    W = 60\n    best = 0\n    for mask in range(1 << 12):\n        w = sum(items[i][0] for i in range(12) if mask >> i & 1)\n        if w <= W:\n            best = max(best, sum(items[i][1] for i in range(12) if mask >> i & 1))\n    for eps in (0.5, 0.2, 0.05):\n        S = fptas(items, W, eps)\n        assert sum(items[i][0] for i in S) <= W, \"overweight\"\n        got = sum(items[i][1] for i in S)\n        assert got >= (1 - eps) * best, (seed, eps, got, best)\n"
    },
    {
     "label": "40 items with billion-sized values, eps = 0.1, in well under a second",
     "type": "assert",
     "code": "import random\nrng = random.Random(42)\nitems = [(rng.randint(1, 1000), rng.randint(1, 10**9)) for _ in range(40)]\nS = fptas(items, 5000, 0.1)\nassert sum(items[i][0] for i in S) <= 5000\nassert len(set(S)) == len(S)\n",
     "limit": 8
    }
   ]
  }
 ],
 "aa4": [
  {
   "id": "simplex_solver",
   "title": "A small simplex solver",
   "prompt": "<p>Write <code>simplex(c, A, b)</code> that solves the linear program: maximize <strong>c</strong> · <strong>x</strong> subject to <em>A</em><strong>x</strong> ≤ <strong>b</strong> and <strong>x</strong> ≥ 0, where every entry of <strong>b</strong> is ≥ 0 (so <strong>x</strong> = 0 is feasible and the simplex method can start there, as in the notes). <code>c</code> has <em>n</em> numbers, <code>A</code> is a list of <em>m</em> rows of <em>n</em> numbers, and <code>b</code> has <em>m</em>.</p>\n<p>Work in exact arithmetic with <code>fractions.Fraction</code>, using the dictionary form from the notes: add slack variables <em>x</em><sub><em>n</em></sub>, …, <em>x</em><sub><em>n</em>+<em>m</em>−1</sub>, one per row, numbered after the original variables. Use <strong>Bland's rule</strong>: the entering variable is the lowest-numbered variable with a positive coefficient in the objective row; the leaving variable is the basic variable with the smallest ratio, and on a tie the lowest-numbered one. Return <code>(value, x)</code>, where <code>x</code> is the list of the <em>n</em> original variables' values (as Fractions or ints), or <code>None</code> if the LP is unbounded.</p>",
   "starter": "from fractions import Fraction\n\ndef simplex(c, A, b):\n    pass\n",
   "hint": "<p>Store the tableau as rows of Fractions: row <em>i</em> holds the coefficients of all <em>n</em> + <em>m</em> variables in constraint <em>i</em> (the slack's column is the identity) and its right-hand side, plus a list <code>basis</code> saying which variable each row solves for. Keep the objective as a row of reduced costs, starting as <strong>c</strong> followed by zeros. To pivot on row <em>r</em> and column <em>e</em>: divide row <em>r</em> by its entry in column <em>e</em>, then subtract multiples of it from every other row and the objective row to clear column <em>e</em>. The variable can increase without limit (unbounded) if no row has a positive entry in column <em>e</em>.</p>",
   "solution": "from fractions import Fraction\n\ndef simplex(c, A, b):\n    m, n = len(A), len(c)\n    T = [[Fraction(v) for v in A[i]] + [Fraction(int(i == j)) for j in range(m)] + [Fraction(b[i])] for i in range(m)]\n    obj = [Fraction(v) for v in c] + [Fraction(0)] * m\n    value = Fraction(0)\n    basis = [n + i for i in range(m)]\n    while True:\n        enter = next((j for j in range(n + m) if obj[j] > 0), None)\n        if enter is None:\n            break\n        best = None\n        for i in range(m):\n            if T[i][enter] > 0:\n                key = (T[i][-1] / T[i][enter], basis[i])\n                if best is None or key < best[0]:\n                    best = (key, i)\n        if best is None:\n            return None\n        r = best[1]\n        piv = T[r][enter]\n        T[r] = [v / piv for v in T[r]]\n        for i in range(m):\n            if i != r and T[i][enter] != 0:\n                f = T[i][enter]\n                T[i] = [a - f * bb for a, bb in zip(T[i], T[r])]\n        f = obj[enter]\n        obj = [a - f * bb for a, bb in zip(obj, T[r][:-1])]\n        value += f * T[r][-1]\n        basis[r] = enter\n    x = [Fraction(0)] * n\n    for i, v in enumerate(basis):\n        if v < n:\n            x[v] = T[i][-1]\n    return value, x\n",
   "tests": [
    {
     "label": "The paint factory from the notes: 21 at (3, 3/2)",
     "type": "assert",
     "code": "from fractions import Fraction\nval, x = simplex([5, 4], [[6, 4], [1, 2]], [24, 6])\nassert val == 21 and list(x) == [3, Fraction(3, 2)], (val, x)\n"
    },
    {
     "label": "Unbounded: maximize x + y with only x − y ≤ 1",
     "call": "simplex([1, 1], [[1, -1]], [1])",
     "expect": "None"
    },
    {
     "label": "Already optimal at the origin",
     "type": "assert",
     "code": "val, x = simplex([-1, -2], [[1, 1]], [5])\nassert val == 0 and list(x) == [0, 0], (val, x)\n"
    },
    {
     "label": "Three variables",
     "type": "assert",
     "code": "from fractions import Fraction\nval, x = simplex([2, 3, 4], [[3, 2, 1], [2, 5, 3]], [10, 15])\nassert val == 20 and list(x) == [0, 0, 5], (val, x)\n"
    },
    {
     "label": "A degenerate LP on which the largest-coefficient rule cycles: Bland's rule must finish",
     "type": "assert",
     "code": "from fractions import Fraction as F\nc = [10, -57, -9, -24]\nA = [[F(1, 2), F(-11, 2), F(-5, 2), 9], [F(1, 2), F(-3, 2), F(-1, 2), 1], [1, 0, 0, 0]]\nval, x = simplex(c, A, [0, 0, 1])\nassert val == 1 and list(x) == [1, 0, 1, 0], (val, x)\n",
     "limit": 3
    },
    {
     "label": "Answers are feasible and match a brute-force vertex search (random LPs)",
     "type": "assert",
     "code": "import random, itertools\nfrom fractions import Fraction as F\ndef solve2(M, r):\n    (a, b), (c_, d) = M\n    det = a * d - b * c_\n    if det == 0:\n        return None\n    return [F(r[0] * d - b * r[1], det), F(a * r[1] - r[0] * c_, det)]\nfor seed in range(20):\n    rng = random.Random(seed)\n    A = [[rng.randint(1, 9), rng.randint(1, 9)] for _ in range(4)]\n    b = [rng.randint(5, 40) for _ in range(4)]\n    c = [rng.randint(-3, 9), rng.randint(-3, 9)]\n    val, x = simplex(c, A, b)\n    assert all(v >= 0 for v in x) and all(sum(a * v for a, v in zip(row, x)) <= bi for row, bi in zip(A, b)), \"infeasible answer\"\n    assert val == sum(ci * v for ci, v in zip(c, x)), \"value doesn't match x\"\n    rows = A + [[-1, 0], [0, -1]]\n    rhs = b + [0, 0]\n    best = None\n    for i, j in itertools.combinations(range(6), 2):\n        p = solve2([rows[i], rows[j]], [rhs[i], rhs[j]])\n        if p and all(sum(a * v for a, v in zip(row, p)) <= r for row, r in zip(rows, rhs)):\n            z = c[0] * p[0] + c[1] * p[1]\n            best = z if best is None else max(best, z)\n    assert val == best, (seed, val, best)\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "lp_certificates",
   "title": "Duality certificates and rounding",
   "prompt": "<p>Two short tools from the notes, in exact arithmetic (the tests pass Fractions and ints).</p>\n<ul><li><code>certify(c, A, b, x, y)</code> for the LP \"maximize <strong>c</strong> · <strong>x</strong> subject to <em>A</em><strong>x</strong> ≤ <strong>b</strong>, <strong>x</strong> ≥ 0\" and its dual \"minimize <strong>b</strong> · <strong>y</strong> subject to <em>A</em><sup>T</sup><strong>y</strong> ≥ <strong>c</strong>, <strong>y</strong> ≥ 0\". Return <code>True</code> exactly when <strong>x</strong> is primal feasible, <strong>y</strong> is dual feasible, and <strong>c</strong> · <strong>x</strong> = <strong>b</strong> · <strong>y</strong>: by weak duality, both are then optimal.</li>\n<li><code>round_cover(n, edges, x)</code>: <code>x</code> is a list of <em>n</em> numbers, a solution of the vertex cover LP relaxation. Raise <code>ValueError</code> unless it is feasible (0 ≤ <em>x</em><sub><em>v</em></sub> ≤ 1 for every vertex and <em>x</em><sub><em>u</em></sub> + <em>x</em><sub><em>v</em></sub> ≥ 1 for every edge). Otherwise return the sorted list of vertices with <em>x</em><sub><em>v</em></sub> ≥ 1/2.</li></ul>",
   "starter": "from fractions import Fraction\n\ndef certify(c, A, b, x, y):\n    pass\n\ndef round_cover(n, edges, x):\n    pass\n",
   "hint": "<p>Column <em>j</em> of <em>A</em> is <code>[row[j] for row in A]</code>; dual feasibility says its dot product with <strong>y</strong> is at least <code>c[j]</code> for every <em>j</em>. Compare with <code>Fraction(1, 2)</code>, not 0.5, to stay exact.</p>",
   "solution": "from fractions import Fraction\n\ndef certify(c, A, b, x, y):\n    m, n = len(A), len(c)\n    if any(v < 0 for v in x) or any(v < 0 for v in y):\n        return False\n    if any(sum(A[i][j] * x[j] for j in range(n)) > b[i] for i in range(m)):\n        return False\n    if any(sum(A[i][j] * y[i] for i in range(m)) < c[j] for j in range(n)):\n        return False\n    return sum(c[j] * x[j] for j in range(n)) == sum(b[i] * y[i] for i in range(m))\n\ndef round_cover(n, edges, x):\n    if len(x) != n or any(v < 0 or v > 1 for v in x):\n        raise ValueError(\"each x_v must be between 0 and 1\")\n    if any(x[u] + x[v] < 1 for u, v in edges):\n        raise ValueError(\"an edge is not covered by the fractional solution\")\n    return [v for v in range(n) if x[v] >= Fraction(1, 2)]\n",
   "tests": [
    {
     "label": "The paint factory's optimal primal and dual",
     "type": "assert",
     "code": "from fractions import Fraction as F\nassert certify([5, 4], [[6, 4], [1, 2]], [24, 6], [3, F(3, 2)], [F(3, 4), F(1, 2)]) is True\n"
    },
    {
     "label": "Feasible but not optimal is not certified",
     "type": "assert",
     "code": "from fractions import Fraction as F\nassert certify([5, 4], [[6, 4], [1, 2]], [24, 6], [4, 0], [F(3, 4), F(1, 2)]) is False\nassert certify([5, 4], [[6, 4], [1, 2]], [24, 6], [3, F(3, 2)], [1, 0]) is False\n"
    },
    {
     "label": "Infeasible points are rejected",
     "type": "assert",
     "code": "from fractions import Fraction as F\nassert certify([5, 4], [[6, 4], [1, 2]], [24, 6], [4, F(3, 2)], [F(3, 4), F(1, 2)]) is False\nassert certify([5, 4], [[6, 4], [1, 2]], [24, 6], [3, F(3, 2)], [F(1, 2), F(1, 2)]) is False\n"
    },
    {
     "label": "Rounding the triangle's all-1/2 solution",
     "type": "assert",
     "code": "from fractions import Fraction as F\nh = F(1, 2)\nassert round_cover(3, [(0, 1), (1, 2), (0, 2)], [h, h, h]) == [0, 1, 2]\n"
    },
    {
     "label": "Rounding a path's fractional solution",
     "type": "assert",
     "code": "from fractions import Fraction as F\nassert round_cover(4, [(0, 1), (1, 2), (2, 3)], [F(1, 3), F(2, 3), F(1, 3), F(2, 3)]) == [1, 3]\n"
    },
    {
     "label": "Infeasible fractional solutions raise ValueError",
     "type": "assert",
     "code": "from fractions import Fraction as F\nfor x in ([F(1, 3), F(1, 3)], [F(3, 2), 0], [1, -1]):\n    try:\n        round_cover(2, [(0, 1)], x)\n    except ValueError:\n        continue\n    raise AssertionError(f\"{x} was accepted\")\n"
    }
   ]
  }
 ],
 "aa5": [
  {
   "id": "reservoir_mg",
   "title": "Reservoir sampling and Misra–Gries",
   "prompt": "<p>Two one-pass summaries of a stream (any iterable; read it once, in order, and don't store it).</p>\n<ul><li><code>reservoir(stream, k, rng)</code>: keep the first <code>k</code> items. For each later item, at 0-based position <em>i</em> (so <em>i</em> ≥ <em>k</em>), draw <code>j = rng.randrange(i + 1)</code>; if <code>j &lt; k</code>, replace slot <code>j</code> with the item. Return the list of <code>k</code> slots (fewer if the stream is shorter). Draw exactly one random number per item after the first <code>k</code>, and none before.</li>\n<li><code>misra_gries(stream, k)</code>: keep at most <code>k − 1</code> counters in a dict. For each item: if it has a counter, add 1; else if there are fewer than <code>k − 1</code> counters, start one at 1; else subtract 1 from every counter, deleting those that reach 0 (and drop the item). Return the dict. Every item that occurs more than <em>n</em>/<em>k</em> times in a stream of <em>n</em> items is in it, and each estimate is between the true count minus <em>n</em>/<em>k</em> and the true count.</li></ul>",
   "starter": "import random\n\ndef reservoir(stream, k, rng):\n    pass\n\ndef misra_gries(stream, k):\n    pass\n",
   "hint": "<p>Use <code>enumerate(stream)</code> for the positions. In Misra–Gries, build the decremented dict in one step, for example <code>{x: c - 1 for x, c in counts.items() if c &gt; 1}</code>.</p>",
   "solution": "import random\n\ndef reservoir(stream, k, rng):\n    sample = []\n    for i, item in enumerate(stream):\n        if i < k:\n            sample.append(item)\n        else:\n            j = rng.randrange(i + 1)\n            if j < k:\n                sample[j] = item\n    return sample\n\ndef misra_gries(stream, k):\n    counts = {}\n    for item in stream:\n        if item in counts:\n            counts[item] += 1\n        elif len(counts) < k - 1:\n            counts[item] = 1\n        else:\n            counts = {x: c - 1 for x, c in counts.items() if c > 1}\n    return counts\n",
   "tests": [
    {
     "label": "A short stream is kept whole",
     "call": "reservoir(iter('abc'), 5, __import__('random').Random(0))",
     "expect": "['a', 'b', 'c']"
    },
    {
     "label": "Exactly the specified random draws",
     "type": "assert",
     "code": "import random\ngot = reservoir(iter(range(100)), 5, random.Random(3))\nr = random.Random(3)\nwant = list(range(5))\nfor i in range(5, 100):\n    j = r.randrange(i + 1)\n    if j < 5:\n        want[j] = i\nassert got == want, f\"got {got}, expected {want}\"\n"
    },
    {
     "label": "Each item is sampled with probability k/n (20,000 seeded runs)",
     "type": "assert",
     "code": "import random\nrng = random.Random(11)\nhits = [0] * 20\nfor _ in range(20000):\n    for x in reservoir(iter(range(20)), 4, rng):\n        hits[x] += 1\nfor x, h in enumerate(hits):\n    assert abs(h / 20000 - 0.2) < 0.02, f\"item {x} sampled {h / 20000:.3f} of the time, expected 0.2\"\n"
    },
    {
     "label": "Misra–Gries on a small stream",
     "call": "misra_gries(iter('aabcbaadbe'), 3)",
     "expect": "{'a': 1}"
    },
    {
     "label": "The guarantee: f − n/k ≤ estimate ≤ f, and heavy items are kept",
     "type": "assert",
     "code": "import random\nfrom collections import Counter\nrng = random.Random(5)\nstream = [min(int(rng.paretovariate(1.1)), 500) for _ in range(20000)]\ntrue = Counter(stream)\nn, k = len(stream), 20\nest = misra_gries(iter(stream), k)\nassert len(est) <= k - 1\nfor x, f in true.items():\n    e = est.get(x, 0)\n    assert f - n / k <= e <= f, (x, f, e)\n    if f > n / k:\n        assert x in est, f\"heavy item {x} (count {f}) missing\"\n"
    }
   ]
  },
  {
   "id": "count_min",
   "title": "A count-min sketch",
   "prompt": "<p>Write a class <code>CountMin(width, depth)</code> with <code>depth</code> rows of <code>width</code> counters, all 0, in an attribute <code>rows</code> (a list of lists). Row <em>r</em> uses the hash function <code>bucket(r, key, width)</code> given in the starter.</p>\n<ul><li><code>add(key, count=1)</code> adds <code>count</code> to one counter in each row, and <code>estimate(key)</code> returns the minimum of the key's counters over the rows. Also keep <code>total</code>, the sum of all counts added.</li>\n<li>The function <code>cm_size(eps, delta)</code> returns <code>(width, depth)</code> = (⌈<em>e</em>/<em>ε</em>⌉, ⌈ln(1/<em>δ</em>)⌉), the sizes from the notes for which each estimate exceeds the true count by more than <em>ε</em> · <code>total</code> with probability at most <em>δ</em>.</li></ul>",
   "starter": "import hashlib\n\ndef bucket(row, key, width):\n    \"\"\"Hash function number row (0, 1, 2, ...) applied to key, giving a slot in range(width).\"\"\"\n    data = f\"{row}:{key}\".encode()\n    return int.from_bytes(hashlib.blake2b(data, digest_size=8).digest(), \"big\") % width\n\nimport math\n\nclass CountMin:\n    def __init__(self, width, depth):\n        pass\n\n    def add(self, key, count=1):\n        pass\n\n    def estimate(self, key):\n        pass\n\ndef cm_size(eps, delta):\n    pass\n",
   "hint": "<p>Initialize with <code>[[0] * width for _ in range(depth)]</code> (not <code>[[0] * width] * depth</code>, which repeats one list). Both <code>add</code> and <code>estimate</code> loop over <code>r in range(depth)</code> and use column <code>bucket(r, key, width)</code>.</p>",
   "solution": "import hashlib\n\ndef bucket(row, key, width):\n    \"\"\"Hash function number row (0, 1, 2, ...) applied to key, giving a slot in range(width).\"\"\"\n    data = f\"{row}:{key}\".encode()\n    return int.from_bytes(hashlib.blake2b(data, digest_size=8).digest(), \"big\") % width\n\nimport math\n\nclass CountMin:\n    def __init__(self, width, depth):\n        self.width, self.depth = width, depth\n        self.rows = [[0] * width for _ in range(depth)]\n        self.total = 0\n\n    def add(self, key, count=1):\n        for r in range(self.depth):\n            self.rows[r][bucket(r, key, self.width)] += count\n        self.total += count\n\n    def estimate(self, key):\n        return min(self.rows[r][bucket(r, key, self.width)] for r in range(self.depth))\n\ndef cm_size(eps, delta):\n    return math.ceil(math.e / eps), math.ceil(math.log(1 / delta))\n",
   "tests": [
    {
     "label": "cm_size(0.001, 0.01)",
     "call": "cm_size(0.001, 0.01)",
     "expect": "(2719, 5)"
    },
    {
     "label": "Counters are placed by bucket",
     "type": "assert",
     "code": "cm = CountMin(10, 3)\ncm.add(\"x\", 5)\nfor r in range(3):\n    assert cm.rows[r][bucket(r, \"x\", 10)] == 5\n    assert sum(cm.rows[r]) == 5\nassert cm.total == 5 and cm.estimate(\"x\") == 5\n"
    },
    {
     "label": "Rows are separate lists",
     "type": "assert",
     "code": "cm = CountMin(4, 3)\ncm.rows[0][0] = 7\nassert cm.rows[1][0] == 0 and cm.rows[2][0] == 0\n"
    },
    {
     "label": "Never underestimates, and overestimates by at most eps·n for almost every key",
     "type": "assert",
     "code": "import random\nfrom collections import Counter\nrng = random.Random(2)\nstream = [min(int(rng.paretovariate(1.0)), 5000) for _ in range(20000)]\ntrue = Counter(stream)\neps, delta = 0.01, 0.05\nw, d = cm_size(eps, delta)\ncm = CountMin(w, d)\nfor x in stream:\n    cm.add(x)\nassert cm.total == 20000\nbad = 0\nfor x, f in true.items():\n    e = cm.estimate(x)\n    assert e >= f, f\"estimate {e} below true count {f}\"\n    if e > f + eps * 20000:\n        bad += 1\nassert bad <= 3 * delta * len(true) + 1, f\"{bad} of {len(true)} keys off by more than eps*n\"\n",
     "limit": 8
    }
   ]
  },
  {
   "id": "bloom_filter",
   "title": "A Bloom filter with sizing",
   "prompt": "<p>Write a class <code>BloomFilter(m, k)</code> holding <code>m</code> bits (a list of 0s and 1s in an attribute <code>bits</code>) and using the <code>k</code> hash functions <code>bucket(0, key, m)</code>, …, <code>bucket(k − 1, key, m)</code> from the starter. <code>add(key)</code> sets the key's <code>k</code> bits; <code>key in bf</code> (the method <code>__contains__</code>) is true when all <code>k</code> are set.</p>\n<p>Also write the formulas from the notes:</p>\n<ul><li><code>false_positive_rate(m, n, k)</code> = (1 − <em>e</em><sup>−<em>kn</em>/<em>m</em></sup>)<sup><em>k</em></sup>;</li>\n<li><code>bloom_params(n, p)</code> returns <code>(m, k)</code> for <code>n</code> keys and target false-positive rate <code>p</code>: <em>m</em> = ⌈−<em>n</em> ln <em>p</em> / (ln 2)<sup>2</sup>⌉ and <em>k</em> = the nearest integer to (<em>m</em>/<em>n</em>) ln 2 (at least 1).</li></ul>",
   "starter": "import hashlib\n\ndef bucket(row, key, width):\n    \"\"\"Hash function number row (0, 1, 2, ...) applied to key, giving a slot in range(width).\"\"\"\n    data = f\"{row}:{key}\".encode()\n    return int.from_bytes(hashlib.blake2b(data, digest_size=8).digest(), \"big\") % width\n\nimport math\n\nclass BloomFilter:\n    def __init__(self, m, k):\n        pass\n\n    def add(self, key):\n        pass\n\n    def __contains__(self, key):\n        pass\n\ndef false_positive_rate(m, n, k):\n    pass\n\ndef bloom_params(n, p):\n    pass\n",
   "hint": "<p><code>__contains__</code> can be <code>return all(self.bits[bucket(i, key, self.m)] for i in range(self.k))</code>. Use <code>round</code> for the nearest integer.</p>",
   "solution": "import hashlib\n\ndef bucket(row, key, width):\n    \"\"\"Hash function number row (0, 1, 2, ...) applied to key, giving a slot in range(width).\"\"\"\n    data = f\"{row}:{key}\".encode()\n    return int.from_bytes(hashlib.blake2b(data, digest_size=8).digest(), \"big\") % width\n\nimport math\n\nclass BloomFilter:\n    def __init__(self, m, k):\n        self.m, self.k = m, k\n        self.bits = [0] * m\n\n    def add(self, key):\n        for i in range(self.k):\n            self.bits[bucket(i, key, self.m)] = 1\n\n    def __contains__(self, key):\n        return all(self.bits[bucket(i, key, self.m)] for i in range(self.k))\n\ndef false_positive_rate(m, n, k):\n    return (1 - math.exp(-k * n / m)) ** k\n\ndef bloom_params(n, p):\n    m = math.ceil(-n * math.log(p) / math.log(2) ** 2)\n    k = max(1, round(m / n * math.log(2)))\n    return m, k\n",
   "tests": [
    {
     "label": "bloom_params(1000, 0.01)",
     "call": "bloom_params(1000, 0.01)",
     "expect": "(9586, 7)"
    },
    {
     "label": "false_positive_rate(10000, 1000, 7)",
     "call": "round(false_positive_rate(10000, 1000, 7), 5)",
     "expect": "0.00819"
    },
    {
     "label": "Bits set by add",
     "type": "assert",
     "code": "bf = BloomFilter(50, 3)\nbf.add(\"cat\")\nwant = {bucket(i, \"cat\", 50) for i in range(3)}\nassert {i for i, v in enumerate(bf.bits) if v} == want\nassert \"cat\" in bf\n"
    },
    {
     "label": "No false negatives; false positives near the formula",
     "type": "assert",
     "code": "m, k = bloom_params(2000, 0.02)\nbf = BloomFilter(m, k)\nfor i in range(2000):\n    bf.add(f\"user{i}\")\nassert all(f\"user{i}\" in bf for i in range(2000)), \"a false negative\"\nfp = sum(f\"other{i}\" in bf for i in range(5000)) / 5000\nassert 0.005 < fp < 0.04, f\"false-positive rate {fp}, expected about 0.02\"\n"
    }
   ]
  }
 ],
 "aa6": [
  {
   "id": "ski_secretary",
   "title": "Ski rental and the secretary problem",
   "prompt": "<p>Two online decisions from the notes.</p>\n<ul><li>Ski rental: renting costs 1 a day and buying costs <code>B</code>. The strategy \"buy on day <em>t</em>\" rents on days 1 to <em>t</em> − 1 and buys on the morning of day <em>t</em> if still skiing. Write <code>strategy_cost(t, days, B)</code>, its cost when the season lasts <code>days</code> days (<code>days</code> ≥ 1); <code>opt_cost(days, B)</code>, the offline optimum; and <code>worst_ratio(t, B)</code>, the largest value of <code>strategy_cost / opt_cost</code> over all season lengths (as a float). It is enough to try <code>days</code> from 1 to <code>t + B</code>: explain to yourself why longer seasons change nothing.</li>\n<li>Secretary: <code>secretary(values, r)</code> rejects the first <code>r</code> candidates and returns the index of the first later candidate better than all before it, or <code>len(values) - 1</code> (the last one, who must be taken) if none is. <code>success_probability(n, r)</code> returns the exact chance, from the notes, that this picks the best of <em>n</em> candidates in random order: (<em>r</em>/<em>n</em>) Σ<sub><em>i</em>=<em>r</em>+1</sub><sup><em>n</em></sup> 1/(<em>i</em> − 1) for <em>r</em> ≥ 1, and 1/<em>n</em> for <em>r</em> = 0.</li></ul>",
   "starter": "def strategy_cost(t, days, B):\n    pass\n\ndef opt_cost(days, B):\n    pass\n\ndef worst_ratio(t, B):\n    pass\n\ndef secretary(values, r):\n    pass\n\ndef success_probability(n, r):\n    pass\n",
   "hint": "<p>If the season ends before day <em>t</em>, the strategy paid only rent: <code>days</code>. Otherwise it paid <em>t</em> − 1 days of rent plus <code>B</code>. Once both have stopped growing (after day max(<em>t</em>, <em>B</em>)), the ratio is constant. In <code>secretary</code>, take <code>max(values[:r])</code> as the bar (or minus infinity if <code>r</code> is 0).</p>",
   "solution": "def strategy_cost(t, days, B):\n    return days if days < t else (t - 1) + B\n\ndef opt_cost(days, B):\n    return min(days, B)\n\ndef worst_ratio(t, B):\n    return max(strategy_cost(t, d, B) / opt_cost(d, B) for d in range(1, t + B + 1))\n\ndef secretary(values, r):\n    bar = max(values[:r]) if r > 0 else float(\"-inf\")\n    for i in range(r, len(values)):\n        if values[i] > bar:\n            return i\n    return len(values) - 1\n\ndef success_probability(n, r):\n    if r == 0:\n        return 1 / n\n    return r / n * sum(1 / (i - 1) for i in range(r + 1, n + 1))\n",
   "tests": [
    {
     "label": "Costs with B = 10",
     "call": "[strategy_cost(10, d, 10) for d in (1, 9, 10, 50)]",
     "expect": "[1, 9, 19, 19]"
    },
    {
     "label": "Break-even is (2B − 1)/B competitive",
     "call": "worst_ratio(10, 10)",
     "expect": "1.9"
    },
    {
     "label": "Buying on day B is the best deterministic choice",
     "type": "assert",
     "code": "for B in (2, 5, 10, 30):\n    ratios = {t: worst_ratio(t, B) for t in range(1, 3 * B)}\n    best = min(ratios, key=ratios.get)\n    assert best == B, (B, best, ratios[best])\n"
    },
    {
     "label": "Secretary picks",
     "call": "[secretary([3, 1, 4, 1, 5, 9, 2], r) for r in (0, 2, 3, 6)]",
     "expect": "[0, 2, 4, 6]"
    },
    {
     "label": "The best cutoff for 100 candidates is 37",
     "type": "assert",
     "code": "probs = [success_probability(100, r) for r in range(100)]\nbest = max(range(100), key=lambda r: probs[r])\nassert best == 37, best\nassert abs(probs[37] - 0.3710427787) < 1e-8, probs[37]\n"
    },
    {
     "label": "Simulation agrees with the formula (seeded)",
     "type": "assert",
     "code": "import random\nrng = random.Random(4)\nn, r, wins = 20, 7, 0\nfor _ in range(20000):\n    v = list(range(n))\n    rng.shuffle(v)\n    wins += v[secretary(v, r)] == n - 1\np = success_probability(n, r)\nassert abs(wins / 20000 - p) < 0.02, (wins / 20000, p)\n"
    }
   ]
  },
  {
   "id": "paging_competitive",
   "title": "LRU against the optimum",
   "prompt": "<p>Requests are a list of page names; the cache holds <code>k</code> pages and starts empty. Each request for a page not in the cache is a fault (the first request of each page included).</p>\n<ul><li><code>lru_faults(requests, k)</code>: faults of LRU (evict the page used least recently).</li>\n<li><code>opt_faults(requests, k)</code>: faults of Belady's OPT (evict the cached page whose next request is farthest in the future, or never requested again), as in CS 310 Lesson 6.</li>\n<li><code>phases(requests, k)</code>: the number of phases in the notes' sense. Phase 1 starts at the first request; a phase ends just before the request that would make it contain <code>k + 1</code> distinct pages, and that request starts the next phase. An empty list has 0 phases.</li>\n<li><code>adversary(k, length)</code>: the request sequence of the notes' lower bound: pages are 0 to <code>k</code>; the first <code>k + 1</code> requests are 0, 1, …, <code>k</code>, and every later request is the one page that LRU (run on the sequence so far) doesn't hold. Return a list of <code>length</code> requests (assume <code>length</code> ≥ <code>k + 1</code>).</li></ul>",
   "starter": "def lru_faults(requests, k):\n    pass\n\ndef opt_faults(requests, k):\n    pass\n\ndef phases(requests, k):\n    pass\n\ndef adversary(k, length):\n    pass\n",
   "hint": "<p>For LRU, a list with the most recently used page at the end works: on a hit, move the page to the end; on a fault with a full cache, remove the first. For OPT, at an eviction, find for each cached page the index of its next request after the current position (or infinity). For <code>adversary</code>, keep an LRU list as you generate: the missing page is the one of 0..<code>k</code> not in it.</p>",
   "solution": "def lru_faults(requests, k):\n    cache, faults = [], 0\n    for p in requests:\n        if p in cache:\n            cache.remove(p)\n        else:\n            faults += 1\n            if len(cache) == k:\n                cache.pop(0)\n        cache.append(p)\n    return faults\n\ndef opt_faults(requests, k):\n    cache, faults = set(), 0\n    for i, p in enumerate(requests):\n        if p in cache:\n            continue\n        faults += 1\n        if len(cache) == k:\n            def next_use(q):\n                for j in range(i + 1, len(requests)):\n                    if requests[j] == q:\n                        return j\n                return float(\"inf\")\n            cache.remove(max(cache, key=next_use))\n        cache.add(p)\n    return faults\n\ndef phases(requests, k):\n    count, seen = 0, set()\n    for p in requests:\n        if count == 0 or (p not in seen and len(seen) == k):\n            count += 1\n            seen = set()\n        seen.add(p)\n    return count\n\ndef adversary(k, length):\n    seq = list(range(k + 1))\n    cache = list(range(1, k + 1))\n    while len(seq) < length:\n        p = next(q for q in range(k + 1) if q not in cache)\n        seq.append(p)\n        cache.pop(0)\n        cache.append(p)\n    return seq[:length]\n",
   "tests": [
    {
     "label": "CS 310's reference string with 3 frames: LRU 9 faults, OPT 7",
     "type": "assert",
     "code": "s = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2]\nassert lru_faults(s, 3) == 9, lru_faults(s, 3)\nassert opt_faults(s, 3) == 7, opt_faults(s, 3)\n"
    },
    {
     "label": "Phases",
     "call": "[phases([1, 2, 1, 3, 4, 3, 1, 5, 2], 2), phases([], 3), phases([1, 1, 1], 1)]",
     "expect": "[4, 0, 1]"
    },
    {
     "label": "The adversary makes LRU fault on every request",
     "type": "assert",
     "code": "s = adversary(4, 200)\nassert s[:5] == [0, 1, 2, 3, 4] and set(s) == {0, 1, 2, 3, 4}\nassert lru_faults(s, 4) == 200\nassert opt_faults(s, 4) <= 4 + (200 - 4) / 4 + 1, opt_faults(s, 4)\n"
    },
    {
     "label": "LRU ≤ k · phases and OPT ≥ phases − 1 on random sequences",
     "type": "assert",
     "code": "import random\nfor seed in range(20):\n    rng = random.Random(seed)\n    k = rng.randint(2, 6)\n    s = [rng.randint(0, 2 * k) for _ in range(300)]\n    ph = phases(s, k)\n    L, O = lru_faults(s, k), opt_faults(s, k)\n    assert L <= k * ph, (seed, L, k, ph)\n    assert O >= ph - 1, (seed, O, ph)\n    assert O <= L\n",
     "hidden": true
    }
   ]
  }
 ]
});
