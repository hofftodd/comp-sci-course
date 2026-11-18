/* Auto-graded programming problems for CS 201, by lesson. Generated from a Python spec, so every
   string is JSON; the test kinds are documented in ARCHITECTURE.md and app/harness.py. Several tests
   are speed tests: an asymptotically slow solution fails them by timing out. */
CSA.addCode("cs201", {
 "ds1": [
  {
   "id": "max_subarray",
   "title": "Largest sum of a run",
   "prompt": "<p>Write <code>max_subarray(xs)</code> that returns the largest sum of a non-empty run of consecutive items in the list <code>xs</code> (which has at least one item). For <code>[2, -5, 3, 4, -1, 2, -8, 1]</code> the answer is 8, from <code>[3, 4, -1, 2]</code>. If every item is negative, the answer is the largest single item.</p>\n<p>Your function must run in Θ(<em>n</em>) time: one test uses 200,000 items, where trying every run (Θ(<em>n</em>²)) is far too slow.</p>",
   "starter": "def max_subarray(xs):\n    pass\n",
   "hint": "<p>Walk through the list once, keeping two numbers: the best sum of a run that <em>ends at the current item</em>, and the best sum seen anywhere. A run ending here either extends the run ending at the previous item or starts fresh at this item, whichever is larger.</p>",
   "solution": "def max_subarray(xs):\n    best_here = best = xs[0]\n    for x in xs[1:]:\n        best_here = max(x, best_here + x)\n        best = max(best, best_here)\n    return best\n",
   "tests": [
    {
     "label": "The example",
     "call": "max_subarray([2, -5, 3, 4, -1, 2, -8, 1])",
     "expect": "8"
    },
    {
     "label": "One item",
     "call": "max_subarray([-3])",
     "expect": "-3"
    },
    {
     "label": "All negative",
     "call": "max_subarray([-4, -2, -7])",
     "expect": "-2"
    },
    {
     "label": "The whole list",
     "call": "max_subarray([1, 2, 3])",
     "expect": "6"
    },
    {
     "label": "Run at the end",
     "call": "max_subarray([-1, -2, 5, 6])",
     "expect": "11",
     "hidden": true
    },
    {
     "label": "200,000 items in Θ(n)",
     "type": "assert",
     "limit": 5,
     "code": "import random\nrandom.seed(1)\nxs = [random.randint(-100, 100) for _ in range(200000)]\nbest_here = best = xs[0]\nfor x in xs[1:]:\n    best_here = max(x, best_here + x); best = max(best, best_here)\nassert max_subarray(xs) == best, \"Wrong answer on a long random list.\"\n"
    }
   ]
  },
  {
   "id": "pair_sum",
   "title": "A pair with a given sum",
   "prompt": "<p>Write <code>has_pair_with_sum(xs, target)</code> that returns <code>True</code> if two items at <em>different positions</em> in <code>xs</code> add up to <code>target</code>, and <code>False</code> otherwise. It must run in expected Θ(<em>n</em>) time; one test uses 200,000 items.</p>\n<p>You may use a Python <code>set</code>. Checking <code>x in s</code> or adding to a set takes Θ(1) time on average, however large the set is. That is what <em>expected</em> means here: an average over the hash function's behavior, not a guarantee for every input. Lesson 3 shows how sets achieve it and why a few unlucky inputs can be slower.</p>",
   "starter": "def has_pair_with_sum(xs, target):\n    pass\n",
   "hint": "<p>For each item <code>x</code>, the partner it needs is <code>target - x</code>. Keep a set of the items you've already passed, and check whether the partner is in it before adding <code>x</code>.</p>",
   "solution": "def has_pair_with_sum(xs, target):\n    seen = set()\n    for x in xs:\n        if target - x in seen:\n            return True\n        seen.add(x)\n    return False\n",
   "tests": [
    {
     "label": "A pair exists",
     "call": "has_pair_with_sum([8, 3, 5, 1], 9)",
     "expect": "True"
    },
    {
     "label": "No pair",
     "call": "has_pair_with_sum([8, 3, 5, 1], 7)",
     "expect": "False"
    },
    {
     "label": "An item can't pair with itself",
     "call": "has_pair_with_sum([4, 1], 8)",
     "expect": "False"
    },
    {
     "label": "Two equal items can pair",
     "call": "has_pair_with_sum([4, 1, 4], 8)",
     "expect": "True"
    },
    {
     "label": "Empty list",
     "call": "has_pair_with_sum([], 0)",
     "expect": "False",
     "hidden": true
    },
    {
     "label": "200,000 items in expected Θ(n)",
     "type": "assert",
     "limit": 5,
     "code": "xs = list(range(0, 400000, 2))\nassert has_pair_with_sum(xs, 399997) is False, \"Odd sums are impossible from even numbers.\"\nassert has_pair_with_sum(xs, 399996) is True\n"
    }
   ]
  }
 ],
 "ds2": [
  {
   "id": "dynamic_array",
   "title": "A dynamic array that grows and shrinks",
   "prompt": "<p>Write a class <code>DynamicArray</code> that stores its items in a fixed-size Python list used as a block of memory (create it with <code>[None] * capacity</code> and never call its <code>append</code>, <code>pop</code> or <code>insert</code>). It must support:</p>\n<ul>\n<li><code>len(a)</code>, <code>a[i]</code> and <code>a[i] = x</code> for 0 ≤ i &lt; len(a); other indexes raise <code>IndexError</code>.</li>\n<li><code>a.append(x)</code>: if the array is full, first double the capacity.</li>\n<li><code>a.pop()</code>: remove and return the last item (<code>IndexError</code> if empty). Afterwards, if the size is at most a quarter of the capacity and the capacity is more than 1, halve the capacity.</li>\n<li><code>a.capacity</code>: the current capacity, which starts at 1.</li>\n<li><code>a.copies</code>: the total number of items copied by all resizes so far.</li>\n</ul>",
   "starter": "class DynamicArray:\n    def __init__(self):\n        self.capacity = 1\n        self.copies = 0\n\n    def __len__(self):\n        pass\n\n    def __getitem__(self, i):\n        pass\n\n    def __setitem__(self, i, x):\n        pass\n\n    def append(self, x):\n        pass\n\n    def pop(self):\n        pass\n",
   "hint": "<p>Write one helper, <code>_resize(new_capacity)</code>, that makes a new block of <code>[None] * new_capacity</code>, copies the first <code>size</code> items into it one by one (adding to <code>copies</code>), and replaces the old block. Both growing and shrinking use it. In <code>pop</code>, set the vacated slot back to <code>None</code>.</p>",
   "solution": "class DynamicArray:\n    def __init__(self):\n        self.capacity = 1\n        self.copies = 0\n        self._size = 0\n        self._slots = [None] * self.capacity\n\n    def __len__(self):\n        return self._size\n\n    def _check(self, i):\n        if not 0 <= i < self._size:\n            raise IndexError(\"index out of range\")\n\n    def __getitem__(self, i):\n        self._check(i)\n        return self._slots[i]\n\n    def __setitem__(self, i, x):\n        self._check(i)\n        self._slots[i] = x\n\n    def _resize(self, new_capacity):\n        new_slots = [None] * new_capacity\n        for i in range(self._size):\n            new_slots[i] = self._slots[i]\n            self.copies += 1\n        self._slots = new_slots\n        self.capacity = new_capacity\n\n    def append(self, x):\n        if self._size == self.capacity:\n            self._resize(2 * self.capacity)\n        self._slots[self._size] = x\n        self._size += 1\n\n    def pop(self):\n        if self._size == 0:\n            raise IndexError(\"pop from empty array\")\n        self._size -= 1\n        x = self._slots[self._size]\n        self._slots[self._size] = None\n        if self.capacity > 1 and self._size <= self.capacity // 4:\n            self._resize(self.capacity // 2)\n        return x\n",
   "tests": [
    {
     "label": "Append, index and length",
     "type": "assert",
     "code": "a = DynamicArray()\nfor x in \"abcde\":\n    a.append(x)\nassert len(a) == 5, f\"len is {len(a)}\"\nassert [a[i] for i in range(5)] == list(\"abcde\")\na[1] = \"z\"\nassert a[1] == \"z\", \"a[1] = 'z' didn't change the item\"\n"
    },
    {
     "label": "Capacity doubles when full",
     "type": "assert",
     "code": "a = DynamicArray()\ncaps = []\nfor x in range(9):\n    a.append(x)\n    caps.append(a.capacity)\nassert caps == [1, 2, 4, 4, 8, 8, 8, 8, 16], f\"capacities after each append: {caps}\"\nassert a.copies == 15, f\"9 appends should copy 1 + 2 + 4 + 8 = 15 items, not {a.copies}\"\n"
    },
    {
     "label": "Out-of-range index raises IndexError",
     "type": "assert",
     "code": "a = DynamicArray()\na.append(1)\nfor bad in (1, -1, 5):\n    try:\n        a[bad]\n    except IndexError:\n        continue\n    raise AssertionError(f\"a[{bad}] should raise IndexError\")\n"
    },
    {
     "label": "Pop returns items in reverse and shrinks at a quarter",
     "type": "assert",
     "code": "a = DynamicArray()\nfor x in range(8):\n    a.append(x)\nout, caps = [], []\nfor _ in range(8):\n    out.append(a.pop())\n    caps.append(a.capacity)\nassert out == [7, 6, 5, 4, 3, 2, 1, 0], f\"popped {out}\"\nassert caps == [8, 8, 8, 8, 8, 4, 2, 1], f\"capacities after each pop: {caps}\"\n"
    },
    {
     "label": "Pop from empty raises IndexError",
     "type": "raises",
     "call": "DynamicArray().pop()",
     "error": "IndexError"
    },
    {
     "label": "Copies stay below 3 per operation",
     "type": "assert",
     "hidden": true,
     "code": "a = DynamicArray()\nops = 0\nfor x in range(1000):\n    a.append(x); ops += 1\nfor _ in range(1000):\n    a.append(1); a.pop(); ops += 2\nassert a.copies < 3 * ops, f\"{a.copies} copies for {ops} operations: alternating append and pop shouldn't keep resizing\"\n"
    },
    {
     "label": "Uses a fixed block, not list.append",
     "type": "source",
     "code": "assert \"_slots.append\" not in __source__ and \".insert(\" not in __source__, \"Store items in a fixed block made with [None] * capacity.\"\n"
    }
   ]
  },
  {
   "id": "ring_queue",
   "title": "A queue in a circular buffer",
   "prompt": "<p>Write a class <code>RingQueue</code>: a first-in, first-out queue stored in a fixed-size list used as a <em>circular buffer</em>. Keep the index of the front item and the number of items; the item after the last slot wraps around to slot 0. When the buffer is full, double its size, copying the items into the new list in queue order starting at index 0.</p>\n<p>The constructor takes the starting capacity: <code>RingQueue(capacity=4)</code>, as in the starter, so <code>RingQueue()</code> starts with 4 slots and <code>RingQueue(2)</code> with 2. The tests use both <code>RingQueue()</code> and <code>RingQueue(4)</code>, and only check the order of the items, not the capacity, so any starting capacity of 1 or more must work.</p>\n<ul>\n<li><code>q.enqueue(x)</code> adds at the back; <code>q.dequeue()</code> removes and returns the front item (<code>IndexError</code> if empty); <code>len(q)</code>.</li>\n<li>Both operations must be Θ(1) amortized. Don't use <code>collections.deque</code>, <code>pop(0)</code> or <code>insert</code>.</li>\n</ul>",
   "starter": "class RingQueue:\n    def __init__(self, capacity=4):\n        pass\n\n    def __len__(self):\n        pass\n\n    def enqueue(self, x):\n        pass\n\n    def dequeue(self):\n        pass\n",
   "hint": "<p>The back of the queue is at index <code>(front + size) % capacity</code>. After a dequeue, the front moves to <code>(front + 1) % capacity</code>.</p>",
   "solution": "class RingQueue:\n    def __init__(self, capacity=4):\n        self._slots = [None] * capacity\n        self._front = 0\n        self._size = 0\n\n    def __len__(self):\n        return self._size\n\n    def enqueue(self, x):\n        cap = len(self._slots)\n        if self._size == cap:\n            new = [None] * (2 * cap)\n            for i in range(self._size):\n                new[i] = self._slots[(self._front + i) % cap]\n            self._slots, self._front, cap = new, 0, 2 * cap\n        self._slots[(self._front + self._size) % cap] = x\n        self._size += 1\n\n    def dequeue(self):\n        if self._size == 0:\n            raise IndexError(\"dequeue from empty queue\")\n        x = self._slots[self._front]\n        self._slots[self._front] = None\n        self._front = (self._front + 1) % len(self._slots)\n        self._size -= 1\n        return x\n",
   "tests": [
    {
     "label": "First in, first out",
     "type": "assert",
     "code": "q = RingQueue()\nfor x in [1, 2, 3]:\n    q.enqueue(x)\nassert q.dequeue() == 1 and q.dequeue() == 2, \"dequeue should return items in arrival order\"\nassert len(q) == 1\n"
    },
    {
     "label": "Wraps around and grows in order",
     "type": "assert",
     "code": "q = RingQueue(4)\nfor x in range(3):\n    q.enqueue(x)\nq.dequeue(); q.dequeue()           # front is now at slot 2\nfor x in range(3, 10):             # wraps around, then must grow\n    q.enqueue(x)\ngot = [q.dequeue() for _ in range(len(q))]\nassert got == list(range(2, 10)), f\"got {got}\"\n"
    },
    {
     "label": "Dequeue from empty raises IndexError",
     "type": "raises",
     "call": "RingQueue().dequeue()",
     "error": "IndexError"
    },
    {
     "label": "200,000 operations quickly",
     "type": "assert",
     "limit": 5,
     "code": "q = RingQueue()\ntotal = 0\nfor i in range(100000):\n    q.enqueue(i)\nfor i in range(100000):\n    total += q.dequeue()\nassert total == sum(range(100000))\n"
    },
    {
     "label": "Doesn't use deque, pop(0) or insert",
     "type": "source",
     "code": "import re\nassert not re.search(r\"\\bdeque\\b\", __source__) and \"pop(0)\" not in __source__ and \".insert(\" not in __source__, \"Use index arithmetic on a fixed list instead.\"\n"
    }
   ]
  }
 ],
 "ds3": [
  {
   "id": "chained_map",
   "title": "A hash map with separate chaining",
   "prompt": "<p>Write a class <code>HashMap</code> using separate chaining, without Python's <code>dict</code> or <code>set</code>. Start with 8 buckets (a list of 8 empty lists). Use <code>hash(key) % number_of_buckets</code> to choose a bucket.</p>\n<ul>\n<li><code>m.put(key, value)</code> adds or replaces. After adding a <em>new</em> key, if the number of keys is more than twice the number of buckets, double the number of buckets and rehash every key.</li>\n<li><code>m.get(key)</code> returns the value or raises <code>KeyError</code>; <code>m.delete(key)</code> removes the key or raises <code>KeyError</code>.</li>\n<li><code>len(m)</code>, <code>key in m</code>, and <code>m.bucket_count()</code>, the current number of buckets.</li>\n</ul>",
   "starter": "class HashMap:\n    def __init__(self):\n        pass\n\n    def bucket_count(self):\n        pass\n\n    def put(self, key, value):\n        pass\n\n    def get(self, key):\n        pass\n\n    def delete(self, key):\n        pass\n\n    def __len__(self):\n        pass\n\n    def __contains__(self, key):\n        pass\n",
   "hint": "<p>Start from the <code>ChainedMap</code> in the notes. <code>__contains__</code> can call <code>get</code> inside <code>try</code>/<code>except KeyError</code>. When resizing, put each old (key, value) pair into its new bucket directly; don't call <code>put</code>, which would count keys again.</p>",
   "solution": "class HashMap:\n    def __init__(self):\n        self._buckets = [[] for _ in range(8)]\n        self._size = 0\n\n    def bucket_count(self):\n        return len(self._buckets)\n\n    def _bucket(self, key):\n        return self._buckets[hash(key) % len(self._buckets)]\n\n    def put(self, key, value):\n        b = self._bucket(key)\n        for i, (k, v) in enumerate(b):\n            if k == key:\n                b[i] = (key, value)\n                return\n        b.append((key, value))\n        self._size += 1\n        if self._size > 2 * len(self._buckets):\n            old = self._buckets\n            self._buckets = [[] for _ in range(2 * len(old))]\n            for bucket in old:\n                for k, v in bucket:\n                    self._bucket(k).append((k, v))\n\n    def get(self, key):\n        for k, v in self._bucket(key):\n            if k == key:\n                return v\n        raise KeyError(key)\n\n    def delete(self, key):\n        b = self._bucket(key)\n        for i, (k, v) in enumerate(b):\n            if k == key:\n                b.pop(i)\n                self._size -= 1\n                return\n        raise KeyError(key)\n\n    def __len__(self):\n        return self._size\n\n    def __contains__(self, key):\n        try:\n            self.get(key)\n            return True\n        except KeyError:\n            return False\n",
   "tests": [
    {
     "label": "Put, get and replace",
     "type": "assert",
     "code": "m = HashMap()\nm.put(\"ant\", 1); m.put(\"bee\", 2); m.put(\"ant\", 3)\nassert m.get(\"ant\") == 3, \"put on an existing key should replace its value\"\nassert m.get(\"bee\") == 2 and len(m) == 2, f\"len is {len(m)}\"\n"
    },
    {
     "label": "Missing keys raise KeyError",
     "type": "assert",
     "code": "m = HashMap()\nfor op in (lambda: m.get(\"x\"), lambda: m.delete(\"x\")):\n    try:\n        op()\n    except KeyError:\n        continue\n    raise AssertionError(\"get or delete of a missing key should raise KeyError\")\n"
    },
    {
     "label": "Delete and contains",
     "type": "assert",
     "code": "m = HashMap()\nm.put(1, \"a\"); m.put(9, \"b\")         # 1 and 9 share a bucket when there are 8\nm.delete(1)\nassert 1 not in m and 9 in m and len(m) == 1\n"
    },
    {
     "label": "Doubles when keys exceed twice the buckets",
     "type": "assert",
     "code": "m = HashMap()\ncounts = []\nfor i in range(40):\n    m.put(i, i * i)\n    counts.append(m.bucket_count())\nassert counts[15] == 8 and counts[16] == 16, f\"bucket counts after 16 and 17 keys: {counts[15]}, {counts[16]}\"\nassert counts[31] == 16 and counts[32] == 32, f\"bucket counts: {counts}\"\nassert all(m.get(i) == i * i for i in range(40)), \"a key was lost when rehashing\"\n"
    },
    {
     "label": "100,000 keys in expected Θ(1) each",
     "type": "assert",
     "limit": 8,
     "code": "m = HashMap()\nfor i in range(100000):\n    m.put(str(i), i)\nassert all(m.get(str(i)) == i for i in range(0, 100000, 7))\nassert m.bucket_count() == 65536, f\"bucket_count is {m.bucket_count()}\"\n"
    },
    {
     "label": "Doesn't use Python's dict or set",
     "type": "source",
     "code": "assert \"dict(\" not in __source__ and \"{}\" not in __source__ and \"set(\" not in __source__, \"Build the table yourself: don't use dict or set (or {} literals).\"\n"
    }
   ]
  },
  {
   "id": "pairs_with_difference",
   "title": "Pairs with a given difference",
   "prompt": "<p>Write <code>count_pairs_with_difference(xs, k)</code> that returns how many pairs of positions <em>i</em> &lt; <em>j</em> have |xs[i] − xs[j]| = k, where k ≥ 0. For <code>[1, 5, 3, 4, 2]</code> and k = 2 the answer is 3: (1, 3), (5, 3) and (4, 2). Repeated values count separately: <code>[1, 1, 3]</code> with k = 2 gives 2. With k = 0, count pairs of equal items.</p>\n<p>It must run in expected Θ(<em>n</em>) time (one test has 200,000 items). You may use <code>dict</code> or <code>collections.Counter</code>.</p>",
   "starter": "def count_pairs_with_difference(xs, k):\n    pass\n",
   "hint": "<p>Count how many times each value occurs. For k &gt; 0, each value <code>v</code> pairs with every occurrence of <code>v + k</code>: add <code>count[v] * count[v + k]</code>. For k = 0, a value occurring <em>c</em> times forms <em>c</em>(<em>c</em> − 1)/2 pairs.</p>",
   "solution": "from collections import Counter\n\ndef count_pairs_with_difference(xs, k):\n    count = Counter(xs)\n    if k == 0:\n        return sum(c * (c - 1) // 2 for c in count.values())\n    return sum(c * count.get(v + k, 0) for v, c in count.items())\n",
   "tests": [
    {
     "label": "The example",
     "call": "count_pairs_with_difference([1, 5, 3, 4, 2], 2)",
     "expect": "3"
    },
    {
     "label": "Repeated values count separately",
     "call": "count_pairs_with_difference([1, 1, 3], 2)",
     "expect": "2"
    },
    {
     "label": "k = 0 counts equal pairs",
     "call": "count_pairs_with_difference([7, 7, 7, 2], 0)",
     "expect": "3"
    },
    {
     "label": "No pairs",
     "call": "count_pairs_with_difference([1, 2, 3], 10)",
     "expect": "0"
    },
    {
     "label": "200,000 items",
     "type": "assert",
     "limit": 5,
     "code": "xs = list(range(200000))\nassert count_pairs_with_difference(xs, 1000) == 199000\n"
    }
   ]
  }
 ],
 "ds4": [
  {
   "id": "avl_tree",
   "title": "An AVL tree",
   "prompt": "<p>Write a class <code>AVLTree</code> that stores a set of comparable keys in an AVL tree:</p>\n<ul>\n<li><code>t.insert(key)</code> adds the key (inserting a key that's already there does nothing), rebalancing with rotations as in the notes.</li>\n<li><code>key in t</code>, <code>len(t)</code>, <code>t.inorder()</code> (the keys as a sorted list), and <code>t.height()</code> (0 for an empty tree, 1 for a single node).</li>\n</ul>\n<p>The tests insert 2,000 keys in sorted order and check that the height stays within the AVL bound.</p>",
   "starter": "class AVLTree:\n    def __init__(self):\n        pass\n\n    def insert(self, key):\n        pass\n\n    def __contains__(self, key):\n        pass\n\n    def __len__(self):\n        pass\n\n    def inorder(self):\n        pass\n\n    def height(self):\n        pass\n",
   "hint": "<p>Reuse <code>Node</code>, <code>height</code>, <code>update</code>, the two rotations and the recursive <code>insert</code> from the notes; the class just keeps <code>self.root</code> and a count. Count a key only if it wasn't already present: check <code>key in self</code> first. Write <code>inorder</code> with an iterative stack or a recursive helper.</p>",
   "solution": "class _Node:\n    def __init__(self, key):\n        self.key, self.left, self.right, self.height = key, None, None, 1\n\ndef _h(n):\n    return n.height if n else 0\n\ndef _update(n):\n    n.height = 1 + max(_h(n.left), _h(n.right))\n\ndef _rot_right(y):\n    x = y.left\n    y.left, x.right = x.right, y\n    _update(y); _update(x)\n    return x\n\ndef _rot_left(x):\n    y = x.right\n    x.right, y.left = y.left, x\n    _update(x); _update(y)\n    return y\n\ndef _insert(n, key):\n    if n is None:\n        return _Node(key)\n    if key < n.key:\n        n.left = _insert(n.left, key)\n    elif key > n.key:\n        n.right = _insert(n.right, key)\n    else:\n        return n\n    _update(n)\n    b = _h(n.left) - _h(n.right)\n    if b > 1:\n        if key > n.left.key:\n            n.left = _rot_left(n.left)\n        return _rot_right(n)\n    if b < -1:\n        if key < n.right.key:\n            n.right = _rot_right(n.right)\n        return _rot_left(n)\n    return n\n\nclass AVLTree:\n    def __init__(self):\n        self.root = None\n        self._n = 0\n\n    def insert(self, key):\n        if key not in self:\n            self._n += 1\n            self.root = _insert(self.root, key)\n\n    def __contains__(self, key):\n        n = self.root\n        while n:\n            if key == n.key:\n                return True\n            n = n.left if key < n.key else n.right\n        return False\n\n    def __len__(self):\n        return self._n\n\n    def inorder(self):\n        out, stack, n = [], [], self.root\n        while stack or n:\n            while n:\n                stack.append(n)\n                n = n.left\n            n = stack.pop()\n            out.append(n.key)\n            n = n.right\n        return out\n\n    def height(self):\n        return _h(self.root)\n",
   "tests": [
    {
     "label": "Insert, contains, length",
     "type": "assert",
     "code": "t = AVLTree()\nfor k in [5, 2, 8, 2]:\n    t.insert(k)\nassert len(t) == 3, f\"len is {len(t)}: inserting a duplicate shouldn't count\"\nassert 2 in t and 8 in t and 7 not in t\n"
    },
    {
     "label": "Empty and single-node heights",
     "type": "assert",
     "code": "t = AVLTree()\nassert t.height() == 0 and t.inorder() == []\nt.insert(1)\nassert t.height() == 1\n"
    },
    {
     "label": "Three sorted keys rotate to height 2",
     "type": "assert",
     "code": "for keys in ([1, 2, 3], [3, 2, 1], [3, 1, 2], [1, 3, 2]):\n    t = AVLTree()\n    for k in keys:\n        t.insert(k)\n    assert t.height() == 2, f\"after inserting {keys}, height is {t.height()}, but an AVL tree of 3 keys has height 2\"\n    assert t.inorder() == [1, 2, 3]\n"
    },
    {
     "label": "2,000 sorted keys stay balanced",
     "type": "assert",
     "limit": 8,
     "code": "import math\nt = AVLTree()\nfor k in range(2000):\n    t.insert(k)\nassert t.inorder() == list(range(2000)), \"inorder() should list the keys in sorted order\"\nassert t.height() <= 1.44 * math.log2(2002), f\"height {t.height()} is too tall for 2,000 keys\"\n"
    },
    {
     "label": "Random keys",
     "type": "assert",
     "hidden": true,
     "code": "import random, math\nrandom.seed(7)\nkeys = random.sample(range(100000), 3000)\nt = AVLTree()\nfor k in keys:\n    t.insert(k)\nassert t.inorder() == sorted(keys)\nassert t.height() <= 1.44 * math.log2(3002)\n"
    }
   ]
  },
  {
   "id": "range_count",
   "title": "Counting keys in a range",
   "prompt": "<p>A binary search tree is built from nodes of this class (already defined for you in the tests, and in the starter):</p>\n<pre><code>class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right</code></pre>\n<p>Write <code>range_count(node, lo, hi)</code> that returns how many keys <em>k</em> in the tree rooted at <code>node</code> satisfy lo ≤ k ≤ hi. Skip subtrees that can't contain such keys: one test asks 2,000 narrow questions about a tree of 2<sup>17</sup> − 1 keys, which is too slow if you visit every node each time.</p>",
   "starter": "class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right\n\ndef range_count(node, lo, hi):\n    pass\n",
   "hint": "<p>If <code>node.key &lt; lo</code>, every key in the left subtree is also too small, so only the right subtree can contribute. Mirror that for <code>node.key &gt; hi</code>.</p>",
   "solution": "class Node:\n    def __init__(self, key, left=None, right=None):\n        self.key, self.left, self.right = key, left, right\n\ndef range_count(node, lo, hi):\n    if node is None:\n        return 0\n    if node.key < lo:\n        return range_count(node.right, lo, hi)\n    if node.key > hi:\n        return range_count(node.left, lo, hi)\n    return 1 + range_count(node.left, lo, hi) + range_count(node.right, lo, hi)\n",
   "tests": [
    {
     "label": "A small tree",
     "type": "assert",
     "code": "root = Node(8, Node(3, Node(1), Node(6)), Node(10, None, Node(14)))\nassert range_count(root, 3, 10) == 4, f\"keys 3, 6, 8, 10 are in [3, 10], got {range_count(root, 3, 10)}\"\nassert range_count(root, 11, 13) == 0\nassert range_count(root, 0, 100) == 6\n"
    },
    {
     "label": "Empty tree",
     "call": "range_count(None, 0, 10)",
     "expect": "0"
    },
    {
     "label": "Ends are included",
     "type": "assert",
     "code": "root = Node(5, Node(2), Node(9))\nassert range_count(root, 2, 5) == 2 and range_count(root, 9, 9) == 1\n"
    },
    {
     "label": "Narrow ranges on a big tree",
     "type": "assert",
     "limit": 6,
     "code": "def build(lo, hi):\n    if lo > hi:\n        return None\n    mid = (lo + hi) // 2\n    return Node(mid, build(lo, mid - 1), build(mid + 1, hi))\nroot = build(1, 2 ** 17 - 1)\ntotal = 0\nfor start in range(1, 120000, 60):\n    total += range_count(root, start, start + 4)\nassert total == 2000 * 5, f\"total {total}\"\n"
    }
   ]
  }
 ],
 "ds5": [
  {
   "id": "min_heap",
   "title": "A binary min-heap",
   "prompt": "<p>Write a class <code>MinHeap</code> backed by a Python list, without the <code>heapq</code> module:</p>\n<ul>\n<li><code>MinHeap(items=())</code> builds a heap from the given items in Θ(<em>n</em>) with bottom-up heapify.</li>\n<li><code>h.push(x)</code>, <code>h.pop()</code> (remove and return the smallest; <code>IndexError</code> if empty), <code>h.peek()</code> (return the smallest without removing it; <code>IndexError</code> if empty) and <code>len(h)</code>.</li>\n</ul>",
   "starter": "class MinHeap:\n    def __init__(self, items=()):\n        pass\n\n    def __len__(self):\n        pass\n\n    def push(self, x):\n        pass\n\n    def pop(self):\n        pass\n\n    def peek(self):\n        pass\n",
   "hint": "<p>Start from the <code>MinHeap</code> and <code>heapify</code> in the notes. In <code>__init__</code>, copy the items with <code>list(items)</code> so you don't modify the caller's list, then sift down every non-leaf from index <code>len // 2 - 1</code> back to 0.</p>",
   "solution": "class MinHeap:\n    def __init__(self, items=()):\n        self._a = list(items)\n        for i in range(len(self._a) // 2 - 1, -1, -1):\n            self._sift_down(i)\n\n    def __len__(self):\n        return len(self._a)\n\n    def push(self, x):\n        a = self._a\n        a.append(x)\n        i = len(a) - 1\n        while i > 0 and a[i] < a[(i - 1) // 2]:\n            p = (i - 1) // 2\n            a[i], a[p] = a[p], a[i]\n            i = p\n\n    def peek(self):\n        if not self._a:\n            raise IndexError(\"peek at empty heap\")\n        return self._a[0]\n\n    def pop(self):\n        if not self._a:\n            raise IndexError(\"pop from empty heap\")\n        a = self._a\n        smallest, last = a[0], a.pop()\n        if a:\n            a[0] = last\n            self._sift_down(0)\n        return smallest\n\n    def _sift_down(self, i):\n        a, n = self._a, len(self._a)\n        while True:\n            l, r, best = 2 * i + 1, 2 * i + 2, i\n            if l < n and a[l] < a[best]:\n                best = l\n            if r < n and a[r] < a[best]:\n                best = r\n            if best == i:\n                return\n            a[i], a[best] = a[best], a[i]\n            i = best\n",
   "tests": [
    {
     "label": "Push and pop in order",
     "type": "assert",
     "code": "h = MinHeap()\nfor x in [5, 3, 8, 1, 9, 2]:\n    h.push(x)\nassert h.peek() == 1 and len(h) == 6\nout = [h.pop() for _ in range(6)]\nassert out == [1, 2, 3, 5, 8, 9], f\"popped {out}\"\n"
    },
    {
     "label": "Build from items",
     "type": "assert",
     "code": "items = [9, 4, 7, 1, 8, 4]\nh = MinHeap(items)\nassert items == [9, 4, 7, 1, 8, 4], \"Building the heap changed the caller's list. Copy it first.\"\nassert [h.pop() for _ in range(len(h))] == [1, 4, 4, 7, 8, 9]\n"
    },
    {
     "label": "Empty heap raises IndexError",
     "type": "assert",
     "code": "for op in (\"pop\", \"peek\"):\n    try:\n        getattr(MinHeap(), op)()\n    except IndexError:\n        continue\n    raise AssertionError(f\"{op}() on an empty heap should raise IndexError\")\n"
    },
    {
     "label": "Building 200,000 items is fast",
     "type": "assert",
     "limit": 6,
     "code": "import random\nrandom.seed(3)\nitems = [random.random() for _ in range(200000)]\nh = MinHeap(items)\ngot = [h.pop() for _ in range(1000)]\nassert got == sorted(items)[:1000]\n"
    },
    {
     "label": "Doesn't use heapq",
     "type": "source",
     "code": "assert \"heapq\" not in __source__, \"Write the heap yourself, without heapq.\"\n"
    }
   ]
  },
  {
   "id": "running_median",
   "title": "Running median",
   "prompt": "<p>Write <code>running_median(xs)</code> that returns a list whose <em>i</em>th item is the median of <code>xs[0]</code> to <code>xs[i]</code>. For an odd count the median is the middle value; for an even count it is the average of the two middle values (a float). For <code>[5, 2, 8, 1]</code> the result is <code>[5, 3.5, 5, 3.5]</code>.</p>\n<p>One test has 50,000 items, so sorting the prefix each time is too slow. Use two heaps (you may use <code>heapq</code>): a max-heap of the smaller half and a min-heap of the larger half.</p>",
   "starter": "def running_median(xs):\n    pass\n",
   "hint": "<p>Keep the lower half in a max-heap (store negated values in a <code>heapq</code> list) and the upper half in a min-heap, with the lower half holding the same number of items or one more. Push each new value onto the correct side, then move one item across if the sizes are off by more than one. The median is the top of the lower half, or the average of both tops.</p>",
   "solution": "import heapq\n\ndef running_median(xs):\n    low, high, out = [], [], []           # low: max-heap via negation; high: min-heap\n    for x in xs:\n        if not low or x <= -low[0]:\n            heapq.heappush(low, -x)\n        else:\n            heapq.heappush(high, x)\n        if len(low) > len(high) + 1:\n            heapq.heappush(high, -heapq.heappop(low))\n        elif len(high) > len(low):\n            heapq.heappush(low, -heapq.heappop(high))\n        if len(low) > len(high):\n            out.append(-low[0])\n        else:\n            out.append((-low[0] + high[0]) / 2)\n    return out\n",
   "tests": [
    {
     "label": "The example",
     "call": "running_median([5, 2, 8, 1])",
     "expect": "[5, 3.5, 5, 3.5]"
    },
    {
     "label": "One item",
     "call": "running_median([7])",
     "expect": "[7]"
    },
    {
     "label": "Empty list",
     "call": "running_median([])",
     "expect": "[]"
    },
    {
     "label": "Sorted input",
     "call": "running_median([1, 2, 3, 4, 5])",
     "expect": "[1, 1.5, 2, 2.5, 3]"
    },
    {
     "label": "50,000 items",
     "type": "assert",
     "limit": 6,
     "code": "import random\nrandom.seed(11)\nxs = [random.randint(0, 10**6) for _ in range(50000)]\ngot = running_median(xs)\nimport statistics\nfor i in (0, 1, 999, 24999, 49999):\n    assert got[i] == statistics.median(xs[:i + 1]), f\"wrong median after {i + 1} items\"\n"
    }
   ]
  }
 ],
 "ds6": [
  {
   "id": "quicksort3",
   "title": "Quicksort that survives duplicates",
   "prompt": "<p>Write <code>quicksort(a)</code> that sorts the list <code>a</code> <strong>in place</strong> (and returns nothing) with randomized quicksort, without <code>sorted</code> or <code>.sort()</code>. Lomuto's partition from the notes takes Θ(<em>n</em>²) time on a list where every item is equal, because every item goes to the same side. Your version must handle that: one test sorts 50,000 items that take only 3 different values. Another sorts 100,000 items that are already in order.</p>",
   "starter": "def quicksort(a):\n    pass\n",
   "hint": "<p>Use a <em>three-way partition</em>, which rearranges <code>a[lo..hi]</code> into items less than the pivot, then items equal to it, then items greater. Choose the pivot <em>value</em> as <code>pivot = a[random.randint(lo, hi)]</code>. Keep three indexes, starting at <code>lt = lo</code>, <code>i = lo</code> and <code>gt = hi</code>. At every step:</p>\n<ul>\n<li><code>a[lo..lt-1]</code> holds items less than the pivot,</li>\n<li><code>a[lt..i-1]</code> holds items equal to it,</li>\n<li><code>a[i..gt]</code> holds items not looked at yet, and</li>\n<li><code>a[gt+1..hi]</code> holds items greater than it.</li>\n</ul>\n<p>While <code>i &lt;= gt</code>, look at <code>a[i]</code>. If it is less than the pivot, swap it with <code>a[lt]</code> and add 1 to both <code>lt</code> and <code>i</code>. If it is greater, swap it with <code>a[gt]</code> and subtract 1 from <code>gt</code>; don't move <code>i</code>, because the item that just arrived there hasn't been looked at. If it is equal, just add 1 to <code>i</code>. When the loop ends, the equal items fill <code>a[lt..gt]</code> and are in their final places, so recurse only on <code>a[lo..lt-1]</code> and <code>a[gt+1..hi]</code>. To keep the recursion shallow, use the notes' <code>quicksort_shallow</code> pattern: loop, recurse on the smaller part, and change <code>lo</code> or <code>hi</code> to handle the larger part. Your function may take extra parameters with defaults, such as <code>quicksort(a, lo=0, hi=None)</code>.</p>",
   "solution": "import random\n\ndef quicksort(a, lo=0, hi=None):\n    if hi is None:\n        hi = len(a) - 1\n    while lo < hi:\n        pivot = a[random.randint(lo, hi)]\n        lt, i, gt = lo, lo, hi\n        while i <= gt:\n            if a[i] < pivot:\n                a[lt], a[i] = a[i], a[lt]\n                lt += 1\n                i += 1\n            elif a[i] > pivot:\n                a[i], a[gt] = a[gt], a[i]\n                gt -= 1\n            else:\n                i += 1\n        if lt - lo < hi - gt:\n            quicksort(a, lo, lt - 1)\n            lo = gt + 1\n        else:\n            quicksort(a, gt + 1, hi)\n            hi = lt - 1\n",
   "tests": [
    {
     "label": "A small list",
     "type": "assert",
     "code": "a = [3, 7, 1, 8, 2, 5]\nresult = quicksort(a)\nassert a == [1, 2, 3, 5, 7, 8], f\"a is {a}\"\nassert result is None, \"Sort in place and return nothing, like list.sort().\"\n"
    },
    {
     "label": "Empty, one item, duplicates, negatives",
     "type": "assert",
     "code": "for xs in ([], [4], [2, 2, 1, 2], [0, -3, 5, -3]):\n    a = list(xs)\n    quicksort(a)\n    assert a == sorted(xs), f\"sorting {xs} gave {a}\"\n"
    },
    {
     "label": "100,000 sorted items",
     "type": "assert",
     "limit": 8,
     "code": "a = list(range(100000))\nquicksort(a)\nassert a == list(range(100000))\n"
    },
    {
     "label": "50,000 items with 3 values",
     "type": "assert",
     "limit": 8,
     "code": "import random\nrandom.seed(5)\na = [random.randint(0, 2) for _ in range(50000)]\nwant = sorted(a)\nquicksort(a)\nassert a == want\n"
    },
    {
     "label": "Doesn't call sorted or sort",
     "type": "source",
     "code": "assert \"sorted(\" not in __source__ and \".sort(\" not in __source__, \"Implement the sort yourself.\"\n"
    }
   ]
  },
  {
   "id": "radix_sort",
   "title": "Radix sort",
   "prompt": "<p>Write <code>radix_sort(xs)</code> that returns a new sorted list of the non-negative integers in <code>xs</code>, using least-significant-digit radix sort in base 256 (or any base you choose) with a stable counting pass for each digit. Don't use <code>sorted</code>, <code>.sort()</code> or comparisons between items of <code>xs</code>.</p>",
   "starter": "def radix_sort(xs):\n    pass\n",
   "hint": "<p>The digit of <code>x</code> in pass <em>p</em> is <code>(x &gt;&gt; (8 * p)) &amp; 255</code>, or <code>(x // 256**p) % 256</code>. A stable pass can drop each number into one of 256 bucket lists in order, then join the buckets. Keep making passes until 256<sup>p</sup> exceeds the largest number.</p>",
   "solution": "def radix_sort(xs):\n    out = list(xs)\n    if not out:\n        return out\n    biggest, shift = max(out), 0\n    while (biggest >> shift) > 0:\n        buckets = [[] for _ in range(256)]\n        for x in out:\n            buckets[(x >> shift) & 255].append(x)\n        out = [x for b in buckets for x in b]\n        shift += 8\n    return out\n",
   "tests": [
    {
     "label": "Small numbers",
     "call": "radix_sort([329, 457, 657, 839, 436, 720, 355])",
     "expect": "[329, 355, 436, 457, 657, 720, 839]"
    },
    {
     "label": "Empty list and zeros",
     "type": "assert",
     "code": "assert radix_sort([]) == []\nassert radix_sort([0, 0, 3, 0]) == [0, 0, 0, 3]\n"
    },
    {
     "label": "Doesn't change the input",
     "type": "assert",
     "code": "xs = [3, 1, 2]\nradix_sort(xs)\nassert xs == [3, 1, 2], \"Return a new list; leave xs alone.\"\n"
    },
    {
     "label": "Large numbers",
     "type": "assert",
     "limit": 6,
     "code": "import random\nrandom.seed(9)\nxs = [random.randrange(2 ** 40) for _ in range(50000)]\nassert radix_sort(xs) == sorted(xs)\n"
    },
    {
     "label": "Doesn't call sorted or sort",
     "type": "source",
     "code": "assert \"sorted(\" not in __source__ and \".sort(\" not in __source__, \"Implement the sort yourself.\"\n"
    }
   ]
  }
 ],
 "ds7": [
  {
   "id": "maze_steps",
   "title": "Fewest steps through a maze",
   "prompt": "<p>A maze is a list of equal-length strings: <code>\"#\"</code> is a wall, <code>\".\"</code> is open, <code>\"S\"</code> is the start and <code>\"E\"</code> is the exit (both open). You may step up, down, left or right onto open cells. Write <code>maze_steps(maze)</code> that returns the fewest steps from S to E, or −1 if E can't be reached.</p>\n<pre><code>maze = [\"S.#\",\n        \".##\",\n        \"..E\"]\nmaze_steps(maze)   # 4</code></pre>",
   "starter": "def maze_steps(maze):\n    pass\n",
   "hint": "<p>Find S, then run breadth-first search with a <code>deque</code> of (row, column) cells and a dict of distances. Generate the four neighbors of a cell on the fly, skipping ones outside the grid or on a wall.</p>",
   "solution": "from collections import deque\n\ndef maze_steps(maze):\n    rows, cols = len(maze), len(maze[0])\n    start = next((r, c) for r in range(rows) for c in range(cols) if maze[r][c] == \"S\")\n    dist = {start: 0}\n    queue = deque([start])\n    while queue:\n        r, c = queue.popleft()\n        if maze[r][c] == \"E\":\n            return dist[(r, c)]\n        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):\n            if 0 <= nr < rows and 0 <= nc < cols and maze[nr][nc] != \"#\" and (nr, nc) not in dist:\n                dist[(nr, nc)] = dist[(r, c)] + 1\n                queue.append((nr, nc))\n    return -1\n",
   "tests": [
    {
     "label": "The example",
     "call": "maze_steps([\"S.#\", \".##\", \"..E\"])",
     "expect": "4"
    },
    {
     "label": "Unreachable exit",
     "call": "maze_steps([\"S#E\"])",
     "expect": "-1"
    },
    {
     "label": "Start next to exit",
     "call": "maze_steps([\"SE\"])",
     "expect": "1"
    },
    {
     "label": "Takes the shorter of two routes",
     "type": "assert",
     "code": "maze = [\"S....\",\n        \".###.\",\n        \".....\",\n        \"####E\"]\nassert maze_steps(maze) == 7, f\"got {maze_steps(maze)}\"\n"
    },
    {
     "label": "A 300 × 300 open grid",
     "type": "assert",
     "limit": 8,
     "code": "n = 300\nmaze = [\"S\" + \".\" * (n - 1)] + [\".\" * n] * (n - 2) + [\".\" * (n - 1) + \"E\"]\nassert maze_steps(maze) == 2 * (n - 1)\n"
    }
   ]
  },
  {
   "id": "course_order",
   "title": "Ordering courses by prerequisites",
   "prompt": "<p>Write <code>course_order(prereqs)</code>. <code>prereqs</code> maps each course to a list of the courses that must be taken before it; a course that appears only inside a list has no prerequisites. Return a list of every course in which each course comes after all its prerequisites. When several courses are available at once, take the one that comes first alphabetically, so the answer is unique. If the prerequisites contain a cycle, raise <code>ValueError</code>.</p>\n<pre><code>course_order({\"CS201\": [\"CS102\", \"MATH121\"], \"CS102\": [\"CS101\"], \"MATH121\": [\"MATH120\"]})\n# ['CS101', 'CS102', 'MATH120', 'MATH121', 'CS201']</code></pre>",
   "starter": "def course_order(prereqs):\n    pass\n",
   "hint": "<p>This is Kahn's algorithm with the edges reversed: an edge goes from each prerequisite to the course that needs it. Collect every course, count each course's unmet prerequisites, and keep the available ones in a min-heap (<code>heapq</code>) instead of a queue so the alphabetically first comes out next.</p>",
   "solution": "import heapq\n\ndef course_order(prereqs):\n    courses = set(prereqs)\n    for ps in prereqs.values():\n        courses.update(ps)\n    needed = {c: len(set(prereqs.get(c, []))) for c in courses}\n    unlocks = {c: [] for c in courses}\n    for c, ps in prereqs.items():\n        for p in set(ps):\n            unlocks[p].append(c)\n    ready = [c for c in courses if needed[c] == 0]\n    heapq.heapify(ready)\n    order = []\n    while ready:\n        c = heapq.heappop(ready)\n        order.append(c)\n        for d in unlocks[c]:\n            needed[d] -= 1\n            if needed[d] == 0:\n                heapq.heappush(ready, d)\n    if len(order) < len(courses):\n        raise ValueError(\"the prerequisites contain a cycle\")\n    return order\n",
   "tests": [
    {
     "label": "The example",
     "call": "course_order({\"CS201\": [\"CS102\", \"MATH121\"], \"CS102\": [\"CS101\"], \"MATH121\": [\"MATH120\"]})",
     "expect": "['CS101', 'CS102', 'MATH120', 'MATH121', 'CS201']"
    },
    {
     "label": "No prerequisites",
     "call": "course_order({\"B\": [], \"A\": []})",
     "expect": "['A', 'B']"
    },
    {
     "label": "A cycle raises ValueError",
     "type": "raises",
     "call": "course_order({\"A\": [\"B\"], \"B\": [\"C\"], \"C\": [\"A\"]})",
     "error": "ValueError"
    },
    {
     "label": "A course listed twice as a prerequisite",
     "call": "course_order({\"B\": [\"A\", \"A\"]})",
     "expect": "['A', 'B']"
    },
    {
     "label": "A long chain",
     "type": "assert",
     "limit": 6,
     "code": "n = 20000\nprereqs = {f\"C{i:05d}\": [f\"C{i - 1:05d}\"] for i in range(1, n)}\norder = course_order(prereqs)\nassert order == [f\"C{i:05d}\" for i in range(n)]\n"
    }
   ]
  }
 ],
 "ds8": [
  {
   "id": "union_find",
   "title": "Union-find",
   "prompt": "<p>Write a class <code>UnionFind</code> for the items 0 to n − 1:</p>\n<ul>\n<li><code>UnionFind(n)</code> starts with every item in its own set.</li>\n<li><code>uf.find(x)</code> returns the root of x's set; <code>uf.union(x, y)</code> merges the two sets and returns <code>True</code>, or returns <code>False</code> if they were already the same set.</li>\n<li><code>uf.connected(x, y)</code>, <code>uf.size_of(x)</code> (the size of x's set) and <code>uf.count</code> (the current number of sets).</li>\n</ul>\n<p>Use union by size and path compression; one test performs 200,000 operations on 100,000 items.</p>",
   "starter": "class UnionFind:\n    def __init__(self, n):\n        pass\n\n    def find(self, x):\n        pass\n\n    def union(self, x, y):\n        pass\n\n    def connected(self, x, y):\n        pass\n\n    def size_of(self, x):\n        pass\n",
   "hint": "<p>Start from the <code>UnionFind</code> in the notes, using lists indexed by item instead of dicts. Set <code>self.count = n</code> at the start and subtract 1 for each successful union.</p>",
   "solution": "class UnionFind:\n    def __init__(self, n):\n        self.parent = list(range(n))\n        self.size = [1] * n\n        self.count = n\n\n    def find(self, x):\n        root = x\n        while self.parent[root] != root:\n            root = self.parent[root]\n        while self.parent[x] != root:\n            self.parent[x], x = root, self.parent[x]\n        return root\n\n    def union(self, x, y):\n        rx, ry = self.find(x), self.find(y)\n        if rx == ry:\n            return False\n        if self.size[rx] < self.size[ry]:\n            rx, ry = ry, rx\n        self.parent[ry] = rx\n        self.size[rx] += self.size[ry]\n        self.count -= 1\n        return True\n\n    def connected(self, x, y):\n        return self.find(x) == self.find(y)\n\n    def size_of(self, x):\n        return self.size[self.find(x)]\n",
   "tests": [
    {
     "label": "Unions and connections",
     "type": "assert",
     "code": "uf = UnionFind(6)\nassert uf.union(0, 1) is True and uf.union(2, 3) is True\nassert uf.union(1, 3) is True and uf.union(0, 2) is False, \"0 and 2 are already connected\"\nassert uf.connected(0, 3) and not uf.connected(0, 4)\n"
    },
    {
     "label": "Count and sizes",
     "type": "assert",
     "code": "uf = UnionFind(5)\nassert uf.count == 5\nuf.union(0, 1); uf.union(1, 2); uf.union(0, 2)\nassert uf.count == 3, f\"count is {uf.count}\"\nassert uf.size_of(2) == 3 and uf.size_of(4) == 1\n"
    },
    {
     "label": "200,000 operations",
     "type": "assert",
     "limit": 6,
     "code": "n = 100000\nuf = UnionFind(n)\nfor i in range(n - 1):\n    uf.union(i, i + 1)\nassert uf.count == 1 and uf.size_of(0) == n\nassert all(uf.connected(0, i) for i in range(0, n, 1000))\n"
    },
    {
     "label": "Trees stay shallow",
     "type": "assert",
     "hidden": true,
     "code": "uf = UnionFind(1024)\nstep = 1\nwhile step < 1024:\n    for i in range(0, 1024, 2 * step):\n        uf.union(i, i + step)\n    step *= 2\ndeepest = 0\nfor x in range(1024):\n    d, y = 0, x\n    while uf.parent[y] != y:\n        y, d = uf.parent[y], d + 1\n    deepest = max(deepest, d)\nassert deepest <= 10, f\"a node is {deepest} levels deep; union by size keeps it at most log2(1024) = 10\"\n"
    }
   ]
  },
  {
   "id": "autocomplete",
   "title": "Autocomplete with a trie",
   "prompt": "<p>Write a class <code>Autocomplete</code> backed by a trie:</p>\n<ul>\n<li><code>ac.add(word)</code> stores a word (adding it again does nothing); <code>word in ac</code> says whether it is stored; <code>len(ac)</code> is the number of distinct words.</li>\n<li><code>ac.complete(prefix, limit=5)</code> returns up to <code>limit</code> stored words that start with <code>prefix</code>, in alphabetical order. A stored word equal to the prefix counts.</li>\n</ul>\n<p>One test stores 30,000 words and asks for many completions; scanning every word for each request is too slow.</p>",
   "starter": "class Autocomplete:\n    def __init__(self):\n        pass\n\n    def add(self, word):\n        pass\n\n    def __contains__(self, word):\n        pass\n\n    def __len__(self):\n        pass\n\n    def complete(self, prefix, limit=5):\n        pass\n",
   "hint": "<p>Walk down the trie to the prefix's node, then do a depth-first search from there visiting children in sorted order, collecting words and stopping as soon as you have <code>limit</code> of them. Because you stop early, a request costs about the prefix length plus the size of the part of the trie you visit.</p>",
   "solution": "class _TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_word = False\n\nclass Autocomplete:\n    def __init__(self):\n        self._root = _TrieNode()\n        self._n = 0\n\n    def _walk(self, s):\n        node = self._root\n        for ch in s:\n            node = node.children.get(ch)\n            if node is None:\n                return None\n        return node\n\n    def add(self, word):\n        node = self._root\n        for ch in word:\n            node = node.children.setdefault(ch, _TrieNode())\n        if not node.is_word:\n            node.is_word = True\n            self._n += 1\n\n    def __contains__(self, word):\n        node = self._walk(word)\n        return node is not None and node.is_word\n\n    def __len__(self):\n        return self._n\n\n    def complete(self, prefix, limit=5):\n        out = []\n        start = self._walk(prefix)\n        if start is None:\n            return out\n        stack = [(start, prefix)]\n        while stack and len(out) < limit:\n            node, sofar = stack.pop()\n            if node.is_word:\n                out.append(sofar)\n            for ch in sorted(node.children, reverse=True):\n                stack.append((node.children[ch], sofar + ch))\n        return out\n",
   "tests": [
    {
     "label": "Add, contains and length",
     "type": "assert",
     "code": "ac = Autocomplete()\nfor w in [\"car\", \"cat\", \"car\"]:\n    ac.add(w)\nassert len(ac) == 2, f\"len is {len(ac)}: adding a word twice shouldn't count\"\nassert \"car\" in ac and \"ca\" not in ac and \"cart\" not in ac\n"
    },
    {
     "label": "Completions in alphabetical order",
     "type": "assert",
     "code": "ac = Autocomplete()\nfor w in [\"dog\", \"car\", \"cart\", \"cat\", \"care\", \"cab\"]:\n    ac.add(w)\nassert ac.complete(\"ca\") == [\"cab\", \"car\", \"care\", \"cart\", \"cat\"], f\"got {ac.complete('ca')}\"\nassert ac.complete(\"ca\", limit=2) == [\"cab\", \"car\"]\nassert ac.complete(\"car\") == [\"car\", \"care\", \"cart\"]\nassert ac.complete(\"x\") == []\n"
    },
    {
     "label": "Empty prefix lists the first words",
     "type": "assert",
     "code": "ac = Autocomplete()\nfor w in [\"b\", \"a\", \"c\"]:\n    ac.add(w)\nassert ac.complete(\"\", limit=2) == [\"a\", \"b\"]\n"
    },
    {
     "label": "30,000 words",
     "type": "assert",
     "limit": 8,
     "code": "import random\nrandom.seed(2)\nletters = \"abcdefghij\"\nwords = sorted({\"\".join(random.choice(letters) for _ in range(8)) for _ in range(30000)})\nac = Autocomplete()\nfor w in words:\n    ac.add(w)\nfor p in [\"a\", \"bc\", \"def\", \"ghij\", \"jjj\"]:\n    want = [w for w in words if w.startswith(p)][:5]\n    for _ in range(200):\n        got = ac.complete(p)\n    assert got == want, f\"complete({p!r}) gave {got}\"\n"
    }
   ]
  }
 ]
});
