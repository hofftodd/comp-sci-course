/* Auto-graded programming problems for CS 320, by lesson. Generated from a Python spec, so every
   string is JSON. Machines and grammars are checked by running them on many strings. */
CSA.addCode("cs320", {
 "tc1": [
  {
   "id": "dfa_product",
   "title": "A DFA simulator and the product construction",
   "prompt": "<p>A DFA is a dict with keys <code>\"states\"</code> (a set), <code>\"alphabet\"</code> (a string of symbols), <code>\"delta\"</code> (a dict from <code>(state, symbol)</code> to a state, defined for every pair), <code>\"start\"</code> and <code>\"accept\"</code> (a set).</p>\n<ol><li>Write <code>accepts(dfa, w)</code>, which returns <code>True</code> if the DFA accepts the string <code>w</code>. Raise <code>ValueError</code> if <code>w</code> contains a symbol not in the alphabet.</li>\n<li>Write <code>product(d1, d2, op)</code> for two DFAs over the same alphabet, where <code>op</code> is <code>\"and\"</code>, <code>\"or\"</code> or <code>\"minus\"</code> (accept in the first but not the second). Return a DFA in the same format whose states are the pairs <code>(p, q)</code> <em>reachable</em> from <code>(d1[\"start\"], d2[\"start\"])</code>, as in Lesson 1.</li></ol>",
   "starter": "def accepts(dfa, w):\n    pass\n\ndef product(d1, d2, op):\n    pass\n",
   "hint": "<p>Build the reachable pairs with a worklist, exactly like <code>product_dfa</code> in the notes; then choose the accepting pairs with a condition on <code>p in d1[\"accept\"]</code> and <code>q in d2[\"accept\"]</code> that depends on <code>op</code>.</p>",
   "solution": "def accepts(dfa, w):\n    q = dfa[\"start\"]\n    for a in w:\n        if a not in dfa[\"alphabet\"]:\n            raise ValueError(\"symbol not in alphabet: \" + a)\n        q = dfa[\"delta\"][(q, a)]\n    return q in dfa[\"accept\"]\n\ndef product(d1, d2, op):\n    sigma = d1[\"alphabet\"]\n    start = (d1[\"start\"], d2[\"start\"])\n    delta, todo, seen = {}, [start], {start}\n    while todo:\n        p, q = todo.pop()\n        for a in sigma:\n            nxt = (d1[\"delta\"][(p, a)], d2[\"delta\"][(q, a)])\n            delta[((p, q), a)] = nxt\n            if nxt not in seen:\n                seen.add(nxt)\n                todo.append(nxt)\n    rule = {\"and\": lambda x, y: x and y, \"or\": lambda x, y: x or y, \"minus\": lambda x, y: x and not y}[op]\n    accept = {(p, q) for (p, q) in seen if rule(p in d1[\"accept\"], q in d2[\"accept\"])}\n    return {\"states\": seen, \"alphabet\": sigma, \"delta\": delta, \"start\": start, \"accept\": accept}\n",
   "tests": [
    {
     "label": "Multiples of 3 in binary",
     "type": "assert",
     "code": "D3 = {\"states\": {0, 1, 2}, \"alphabet\": \"01\", \"start\": 0, \"accept\": {0},\n      \"delta\": {(r, b): (2 * r + int(b)) % 3 for r in range(3) for b in \"01\"}}\ngot = [n for n in range(40) if accepts(D3, format(n, \"b\"))]\nassert got == list(range(0, 40, 3)), got\nassert accepts(D3, \"\") is True\n"
    },
    {
     "label": "Unknown symbol",
     "type": "raises",
     "call": "accepts({'states': {0}, 'alphabet': 'ab', 'start': 0, 'accept': {0}, 'delta': {(0, 'a'): 0, (0, 'b'): 0}}, 'abc')",
     "error": "ValueError"
    },
    {
     "label": "Intersection, union and difference agree with the definitions",
     "type": "assert",
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\nEVEN_A = {\"states\": {\"e\", \"o\"}, \"alphabet\": \"ab\", \"start\": \"e\", \"accept\": {\"e\"},\n          \"delta\": {(\"e\", \"a\"): \"o\", (\"e\", \"b\"): \"e\", (\"o\", \"a\"): \"e\", (\"o\", \"b\"): \"o\"}}\nENDS_B = {\"states\": {\"n\", \"y\"}, \"alphabet\": \"ab\", \"start\": \"n\", \"accept\": {\"y\"},\n          \"delta\": {(\"n\", \"a\"): \"n\", (\"n\", \"b\"): \"y\", (\"y\", \"a\"): \"n\", (\"y\", \"b\"): \"y\"}}\nfor op, f in [(\"and\", lambda w: w.count(\"a\") % 2 == 0 and w.endswith(\"b\")),\n              (\"or\", lambda w: w.count(\"a\") % 2 == 0 or w.endswith(\"b\")),\n              (\"minus\", lambda w: w.count(\"a\") % 2 == 0 and not w.endswith(\"b\"))]:\n    P = product(EVEN_A, ENDS_B, op)\n    for w in _chk_strings(\"ab\", 8):\n        assert accepts(P, w) == f(w), (op, w)\n"
    },
    {
     "label": "Only reachable pairs are built",
     "type": "assert",
     "code": "# Two copies of a machine that counts a's mod 3: only the 3 'diagonal' pairs are reachable.\nM = {\"states\": {0, 1, 2}, \"alphabet\": \"ab\", \"start\": 0, \"accept\": {0},\n     \"delta\": {(i, c): ((i + 1) % 3 if c == \"a\" else i) for i in range(3) for c in \"ab\"}}\nP = product(M, M, \"and\")\nassert set(P[\"states\"]) == {(0, 0), (1, 1), (2, 2)}, P[\"states\"]\nassert P[\"start\"] == (0, 0)\nassert len(P[\"delta\"]) == 6\n"
    }
   ]
  },
  {
   "id": "dfa_design",
   "title": "Designing DFAs",
   "prompt": "<p>Fill in three DFAs, as dicts in the format of the previous problem (keys <code>\"states\"</code>, <code>\"alphabet\"</code>, <code>\"delta\"</code>, <code>\"start\"</code>, <code>\"accept\"</code>; <code>delta</code> must be defined for every state and symbol). Each is checked against every string up to length 10.</p>\n<ol><li><code>NO_11</code>, over <code>\"01\"</code>: strings that do not contain 11.</li>\n<li><code>DIV5</code>, over <code>\"01\"</code>: binary numerals whose value is a multiple of 5 (the empty string counts as 0, and leading zeros are allowed).</li>\n<li><code>A_EVEN_B_ODD</code>, over <code>\"ab\"</code>: strings with an even number of a's and an odd number of b's.</li></ol>\n<p>Each DFA may have at most 5 states.</p>",
   "starter": "NO_11 = None\nDIV5 = None\nA_EVEN_B_ODD = None\n",
   "hint": "<p>For each, decide what to remember: whether the last symbol was 1 (and whether 11 has appeared); the remainder mod 5, with δ(<em>r</em>, <em>b</em>) = (2<em>r</em> + <em>b</em>) mod 5; and the pair of parities. A dict comprehension builds <code>delta</code> for the last two.</p>",
   "solution": "NO_11 = {\"states\": {\"A\", \"B\", \"D\"}, \"alphabet\": \"01\", \"start\": \"A\", \"accept\": {\"A\", \"B\"},\n         \"delta\": {(\"A\", \"0\"): \"A\", (\"A\", \"1\"): \"B\", (\"B\", \"0\"): \"A\", (\"B\", \"1\"): \"D\",\n                   (\"D\", \"0\"): \"D\", (\"D\", \"1\"): \"D\"}}\n\nDIV5 = {\"states\": set(range(5)), \"alphabet\": \"01\", \"start\": 0, \"accept\": {0},\n        \"delta\": {(r, b): (2 * r + int(b)) % 5 for r in range(5) for b in \"01\"}}\n\nA_EVEN_B_ODD = {\"states\": {(i, j) for i in range(2) for j in range(2)}, \"alphabet\": \"ab\",\n                \"start\": (0, 0), \"accept\": {(0, 1)},\n                \"delta\": {((i, j), c): ((1 - i, j) if c == \"a\" else (i, 1 - j))\n                          for i in range(2) for j in range(2) for c in \"ab\"}}\n",
   "tests": [
    {
     "label": "NO_11",
     "type": "assert",
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\ndef _chk_run_dfa(dfa, w):\n    delta, q = dfa[\"delta\"], dfa[\"start\"]\n    for a in w:\n        q = delta[(q, a)]\n    return q in dfa[\"accept\"]\n\nassert NO_11 is not None, \"fill in NO_11\"\nassert len(NO_11[\"states\"]) <= 5\nfor w in _chk_strings(\"01\", 10):\n    assert _chk_run_dfa(NO_11, w) == (\"11\" not in w), w\n"
    },
    {
     "label": "DIV5",
     "type": "assert",
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\ndef _chk_run_dfa(dfa, w):\n    delta, q = dfa[\"delta\"], dfa[\"start\"]\n    for a in w:\n        q = delta[(q, a)]\n    return q in dfa[\"accept\"]\n\nassert DIV5 is not None, \"fill in DIV5\"\nassert len(DIV5[\"states\"]) <= 5\nfor w in _chk_strings(\"01\", 10):\n    assert _chk_run_dfa(DIV5, w) == (int(w or \"0\", 2) % 5 == 0), w\n"
    },
    {
     "label": "A_EVEN_B_ODD",
     "type": "assert",
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\ndef _chk_run_dfa(dfa, w):\n    delta, q = dfa[\"delta\"], dfa[\"start\"]\n    for a in w:\n        q = delta[(q, a)]\n    return q in dfa[\"accept\"]\n\nassert A_EVEN_B_ODD is not None, \"fill in A_EVEN_B_ODD\"\nassert len(A_EVEN_B_ODD[\"states\"]) <= 5\nfor w in _chk_strings(\"ab\", 10):\n    assert _chk_run_dfa(A_EVEN_B_ODD, w) == (w.count(\"a\") % 2 == 0 and w.count(\"b\") % 2 == 1), w\n"
    },
    {
     "label": "Transition functions are complete",
     "type": "assert",
     "code": "for name, d in [(\"NO_11\", NO_11), (\"DIV5\", DIV5), (\"A_EVEN_B_ODD\", A_EVEN_B_ODD)]:\n    assert d is not None, \"fill in \" + name\n    for q in d[\"states\"]:\n        for a in d[\"alphabet\"]:\n            assert (q, a) in d[\"delta\"] and d[\"delta\"][(q, a)] in d[\"states\"], (name, q, a)\n"
    }
   ]
  }
 ],
 "tc2": [
  {
   "id": "nfa_sim",
   "title": "Simulating an NFA",
   "prompt": "<p>An NFA's transitions are a dict from <code>(state, symbol)</code> to a set of states, where the symbol <code>\"\"</code> means an ε-transition and a missing key means no moves.</p>\n<ol><li>Write <code>eps_closure(delta, states)</code>, returning the <code>frozenset</code> of states reachable from the given states by ε-moves alone (including the given states).</li>\n<li>Write <code>nfa_accepts(delta, start, accept, w)</code>, returning whether the NFA accepts <code>w</code>.</li>\n<li>Write <code>nfa_trace(delta, start, w)</code>, returning the list of current-state sets (each a <code>frozenset</code>) at the start and after each symbol: <code>len(w) + 1</code> sets in all.</li></ol>",
   "starter": "def eps_closure(delta, states):\n    pass\n\ndef nfa_accepts(delta, start, accept, w):\n    pass\n\ndef nfa_trace(delta, start, w):\n    pass\n",
   "hint": "<p>The ε-closure is a graph search with a stack and a seen set. Make <code>nfa_accepts</code> use <code>nfa_trace</code>: it accepts when the last set meets the accepting states. ε-cycles (two states with ε-moves to each other) must not make the search loop.</p>",
   "solution": "def eps_closure(delta, states):\n    stack, seen = list(states), set(states)\n    while stack:\n        q = stack.pop()\n        for r in delta.get((q, \"\"), ()):\n            if r not in seen:\n                seen.add(r)\n                stack.append(r)\n    return frozenset(seen)\n\ndef nfa_trace(delta, start, w):\n    current = eps_closure(delta, {start})\n    trace = [current]\n    for a in w:\n        moved = set()\n        for q in current:\n            moved |= set(delta.get((q, a), ()))\n        current = eps_closure(delta, moved)\n        trace.append(current)\n    return trace\n\ndef nfa_accepts(delta, start, accept, w):\n    return bool(nfa_trace(delta, start, w)[-1] & set(accept))\n",
   "tests": [
    {
     "label": "ε-closure with a chain and a cycle",
     "type": "assert",
     "code": "d = {(0, \"\"): {1}, (1, \"\"): {2, 0}, (2, \"a\"): {3}, (3, \"\"): {4}}\nassert eps_closure(d, {0}) == frozenset({0, 1, 2})\nassert eps_closure(d, {3}) == frozenset({3, 4})\nassert eps_closure(d, set()) == frozenset()\nassert isinstance(eps_closure(d, {0}), frozenset)\n"
    },
    {
     "label": "Third symbol from the end is 1",
     "type": "assert",
     "code": "from itertools import product\nN3 = {(0, \"0\"): {0}, (0, \"1\"): {0, 1}, (1, \"0\"): {2}, (1, \"1\"): {2}, (2, \"0\"): {3}, (2, \"1\"): {3}}\nfor k in range(11):\n    for t in product(\"01\", repeat=k):\n        w = \"\".join(t)\n        assert nfa_accepts(N3, 0, {3}, w) == (len(w) >= 3 and w[-3] == \"1\"), w\n"
    },
    {
     "label": "Trace of the notes' union NFA on aab",
     "call": "nfa_trace({(0, ''): {1, 3}, (1, 'a'): {1}, (3, 'a'): {4}, (4, 'b'): {3}}, 0, 'aab')",
     "expect": "[frozenset({0, 1, 3}), frozenset({1, 4}), frozenset({1}), frozenset()]"
    },
    {
     "label": "ε-moves after the last symbol count",
     "type": "assert",
     "code": "d = {(0, \"a\"): {1}, (1, \"\"): {2}}\nassert nfa_accepts(d, 0, {2}, \"a\")\nassert not nfa_accepts(d, 0, {2}, \"\")\nassert not nfa_accepts(d, 0, {2}, \"aa\")\n"
    },
    {
     "label": "Long input with many states",
     "type": "assert",
     "hidden": true,
     "limit": 6,
     "code": "k = 30\nd = {(0, \"0\"): {0}, (0, \"1\"): {0, 1}}\nfor i in range(1, k):\n    d[(i, \"0\")] = {i + 1}; d[(i, \"1\")] = {i + 1}\nw = \"1\" + \"0\" * (k - 1)\nassert nfa_accepts(d, 0, {k}, \"01\" * 2000 + w)\nassert not nfa_accepts(d, 0, {k}, \"01\" * 2000 + \"0\" + w[1:] + \"0\")\n"
    }
   ]
  },
  {
   "id": "subset_construction",
   "title": "The subset construction",
   "prompt": "<p>Write <code>subset_construction(delta, start, accept, alphabet)</code> for an NFA in the format of the previous problem (ε-moves allowed). Return a DFA as a dict with keys <code>\"states\"</code> (a set of <code>frozenset</code>s), <code>\"delta\"</code> (from <code>(frozenset, symbol)</code> to a <code>frozenset</code>), <code>\"start\"</code> and <code>\"accept\"</code>, containing only the subsets reachable from the start. The empty set is a legitimate state (the dead state) if it is reachable.</p>",
   "starter": "def subset_construction(delta, start, accept, alphabet):\n    pass\n",
   "hint": "<p>You need an ε-closure helper. Then use a worklist of subsets, as in the notes: the start is the closure of {start}; for each subset and symbol, collect every move from every member, take the closure, and add the result to the worklist if it is new.</p>",
   "solution": "def _eclose(delta, states):\n    stack, seen = list(states), set(states)\n    while stack:\n        q = stack.pop()\n        for r in delta.get((q, \"\"), ()):\n            if r not in seen:\n                seen.add(r)\n                stack.append(r)\n    return frozenset(seen)\n\ndef subset_construction(delta, start, accept, alphabet):\n    s0 = _eclose(delta, {start})\n    dfa, todo, seen = {}, [s0], {s0}\n    while todo:\n        S = todo.pop()\n        for a in alphabet:\n            moved = set()\n            for q in S:\n                moved |= set(delta.get((q, a), ()))\n            T = _eclose(delta, moved)\n            dfa[(S, a)] = T\n            if T not in seen:\n                seen.add(T)\n                todo.append(T)\n    return {\"states\": seen, \"delta\": dfa, \"start\": s0,\n            \"accept\": {S for S in seen if S & set(accept)}}\n",
   "tests": [
    {
     "label": "Second from the end: the notes' table",
     "type": "assert",
     "code": "N2 = {(0, \"0\"): {0}, (0, \"1\"): {0, 1}, (1, \"0\"): {2}, (1, \"1\"): {2}}\nD = subset_construction(N2, 0, {2}, \"01\")\nf = frozenset\nassert D[\"start\"] == f({0})\nassert D[\"states\"] == {f({0}), f({0, 1}), f({0, 2}), f({0, 1, 2})}, D[\"states\"]\nassert D[\"delta\"][(f({0, 1}), \"1\")] == f({0, 1, 2})\nassert D[\"delta\"][(f({0, 2}), \"0\")] == f({0})\nassert D[\"accept\"] == {f({0, 2}), f({0, 1, 2})}\n"
    },
    {
     "label": "The blow-up: k-th from the end gives 2^k states",
     "type": "assert",
     "code": "for k in [3, 6, 9]:\n    d = {(0, \"0\"): {0}, (0, \"1\"): {0, 1}}\n    for i in range(1, k):\n        d[(i, \"0\")] = {i + 1}; d[(i, \"1\")] = {i + 1}\n    D = subset_construction(d, 0, {k}, \"01\")\n    assert len(D[\"states\"]) == 2 ** k, (k, len(D[\"states\"]))\n"
    },
    {
     "label": "ε-moves and the dead state",
     "type": "assert",
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\ndef _chk_t_closure(delta, states):\n    stack, seen = list(states), set(states)\n    while stack:\n        q = stack.pop()\n        for r in delta.get((q, \"\"), ()):\n            if r not in seen:\n                seen.add(r); stack.append(r)\n    return seen\ndef _chk_run_nfa(delta, start, accept, w):\n    cur = _chk_t_closure(delta, {start})\n    for a in w:\n        nxt = set()\n        for q in cur:\n            nxt |= set(delta.get((q, a), ()))\n        cur = _chk_t_closure(delta, nxt)\n    return bool(cur & set(accept))\n\ndef _chk_run_dfa(dfa, w):\n    delta, q = dfa[\"delta\"], dfa[\"start\"]\n    for a in w:\n        q = delta[(q, a)]\n    return q in dfa[\"accept\"]\n\nU = {(0, \"\"): {1, 3}, (1, \"a\"): {1}, (3, \"a\"): {4}, (4, \"b\"): {3}}\nD = subset_construction(U, 0, {1, 3}, \"ab\")\nassert D[\"start\"] == frozenset({0, 1, 3})\nassert frozenset() in D[\"states\"], \"the empty set should be reachable (e.g. on b)\"\nfor w in _chk_strings(\"ab\", 8):\n    assert _chk_run_dfa(D, w) == _chk_run_nfa(U, 0, {1, 3}, w), w\n"
    },
    {
     "label": "Agrees with the NFA on a random machine",
     "type": "assert",
     "hidden": true,
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\ndef _chk_t_closure(delta, states):\n    stack, seen = list(states), set(states)\n    while stack:\n        q = stack.pop()\n        for r in delta.get((q, \"\"), ()):\n            if r not in seen:\n                seen.add(r); stack.append(r)\n    return seen\ndef _chk_run_nfa(delta, start, accept, w):\n    cur = _chk_t_closure(delta, {start})\n    for a in w:\n        nxt = set()\n        for q in cur:\n            nxt |= set(delta.get((q, a), ()))\n        cur = _chk_t_closure(delta, nxt)\n    return bool(cur & set(accept))\n\ndef _chk_run_dfa(dfa, w):\n    delta, q = dfa[\"delta\"], dfa[\"start\"]\n    for a in w:\n        q = delta[(q, a)]\n    return q in dfa[\"accept\"]\n\nimport random\nrng = random.Random(7)\nfor trial in range(20):\n    n = 5\n    d = {}\n    for q in range(n):\n        for a in [\"a\", \"b\", \"\"]:\n            targets = {r for r in range(n) if rng.random() < (0.15 if a == \"\" else 0.3)}\n            if targets:\n                d[(q, a)] = targets\n    acc = {rng.randrange(n)}\n    D = subset_construction(d, 0, acc, \"ab\")\n    for w in _chk_strings(\"ab\", 6):\n        assert _chk_run_dfa(D, w) == _chk_run_nfa(d, 0, acc, w), (trial, w)\n"
    }
   ]
  }
 ],
 "tc3": [
  {
   "id": "regex_match",
   "title": "Regular expressions by Thompson's construction",
   "prompt": "<p>Write <code>regex_match(pattern, w)</code>, returning whether the whole string <code>w</code> is in the language of <code>pattern</code>. Patterns use single characters (letters and digits), <code>|</code>, <code>*</code>, <code>+</code> (one or more), <code>?</code> (optional), concatenation and parentheses, with the usual precedence (postfix operators, then concatenation, then <code>|</code>). An empty pattern, or an empty side of <code>|</code>, matches ε. Raise <code>ValueError</code> for unbalanced parentheses or a postfix operator with nothing before it.</p>\n<p>Build an NFA with Thompson's construction and simulate it by tracking sets of states. Don't use the <code>re</code> module. Your matcher must be fast on patterns that make backtracking engines slow.</p>",
   "starter": "def regex_match(pattern, w):\n    pass\n",
   "hint": "<p>Start from <code>thompson</code> in the notes. For <code>R+</code>, build <code>R</code>'s piece and add a new start and accept with ε-arrows start → R, R's accept → R's start and R's accept → accept (no skip arrow). For <code>R?</code>, add only the skip arrow. A postfix operator at the start of a sequence, right after <code>(</code> or after <code>|</code>, is the \"nothing before it\" error.</p>",
   "solution": "def regex_match(pattern, w):\n    delta, count, pos = {}, [0], [0]\n\n    def new():\n        count[0] += 1\n        return count[0] - 1\n\n    def edge(p, a, q):\n        delta.setdefault((p, a), set()).add(q)\n\n    def peek():\n        return pattern[pos[0]] if pos[0] < len(pattern) else None\n\n    def union():\n        s1, f1 = concat()\n        while peek() == \"|\":\n            pos[0] += 1\n            s2, f2 = concat()\n            s, f = new(), new()\n            edge(s, \"\", s1); edge(s, \"\", s2); edge(f1, \"\", f); edge(f2, \"\", f)\n            s1, f1 = s, f\n        return s1, f1\n\n    def concat():\n        s, f = new(), new()\n        edge(s, \"\", f)\n        while peek() not in (None, \"|\", \")\"):\n            s2, f2 = postfix()\n            edge(f, \"\", s2)\n            f = f2\n        return s, f\n\n    def postfix():\n        s1, f1 = atom()\n        while peek() in (\"*\", \"+\", \"?\"):\n            op = peek()\n            pos[0] += 1\n            s, f = new(), new()\n            edge(s, \"\", s1); edge(f1, \"\", f)\n            if op in \"*?\":\n                edge(s, \"\", f)\n            if op in \"*+\":\n                edge(f1, \"\", s1)\n            s1, f1 = s, f\n        return s1, f1\n\n    def atom():\n        c = peek()\n        if c in (\"*\", \"+\", \"?\"):\n            raise ValueError(\"nothing to repeat\")\n        pos[0] += 1\n        if c == \"(\":\n            piece = union()\n            if peek() != \")\":\n                raise ValueError(\"missing )\")\n            pos[0] += 1\n            return piece\n        s, f = new(), new()\n        edge(s, c, f)\n        return s, f\n\n    start, accept = union()\n    if pos[0] != len(pattern):\n        raise ValueError(\"unexpected \" + pattern[pos[0]])\n\n    def closure(states):\n        stack, seen = list(states), set(states)\n        while stack:\n            q = stack.pop()\n            for r in delta.get((q, \"\"), ()):\n                if r not in seen:\n                    seen.add(r)\n                    stack.append(r)\n        return seen\n\n    current = closure({start})\n    for a in w:\n        moved = set()\n        for q in current:\n            moved |= delta.get((q, a), set())\n        current = closure(moved)\n        if not current:\n            return False\n    return accept in current\n",
   "tests": [
    {
     "label": "Simple patterns",
     "type": "assert",
     "code": "assert regex_match(\"a(b|c)*\", \"abcb\")\nassert not regex_match(\"a(b|c)*\", \"ba\")\nassert regex_match(\"\", \"\") and not regex_match(\"\", \"a\")\nassert regex_match(\"a|\", \"\") and regex_match(\"a|\", \"a\")\nassert regex_match(\"ab+\", \"abbb\") and not regex_match(\"ab+\", \"a\")\nassert regex_match(\"colou?r\", \"color\") and regex_match(\"colou?r\", \"colour\")\n"
    },
    {
     "label": "Agrees with Python's re on many strings",
     "type": "assert",
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\nimport re\npats = [\"(a|b)*abb\", \"a*b*\", \"(ab)*\", \"b*(ab*ab*)*\", \"(a|aa)*b\", \"((a|b)(a|b))*\", \"a+b?a*\", \"(a*)*\", \"(a|)(b|)\", \"(a+|b)+c?\"]\nfor p in pats:\n    for w in _chk_strings(\"abc\", 6):\n        assert regex_match(p, w) == bool(re.fullmatch(p, w)), (p, w)\n"
    },
    {
     "label": "Errors",
     "type": "assert",
     "code": "for bad in [\"(ab\", \"ab)\", \"*a\", \"a|*b\", \"(*a)\"]:\n    try:\n        regex_match(bad, \"a\")\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(\"no ValueError for \" + bad)\n"
    },
    {
     "label": "No catastrophic backtracking",
     "type": "assert",
     "limit": 6,
     "code": "assert not regex_match(\"(a+)+b\", \"a\" * 60)\nassert not regex_match(\"(a|aa)*b\", \"a\" * 200)\nassert regex_match(\"(a|aa)*b\", \"a\" * 200 + \"b\")\n"
    },
    {
     "label": "Doesn't use re",
     "type": "source",
     "code": "assert 'import re' not in __source__ and 're.' not in __source__.replace('pre.', '').replace('are.', ''), 'build the automaton yourself'\n"
    }
   ]
  },
  {
   "id": "minimize_dfa",
   "title": "Minimizing a DFA",
   "prompt": "<p>Write <code>minimize(dfa)</code> for a DFA in Lesson 1's dict format (<code>\"states\"</code>, <code>\"alphabet\"</code>, <code>\"delta\"</code>, <code>\"start\"</code>, <code>\"accept\"</code>). First remove states unreachable from the start, then merge equivalent states by partition refinement. Return a new DFA in the same format whose states are <code>frozenset</code>s of original states (the blocks), with <code>\"start\"</code> the block containing the original start.</p>",
   "starter": "def minimize(dfa):\n    pass\n",
   "hint": "<p>Find the reachable states with a graph search. Then follow <code>minimize</code> in the notes to give each state a block number; group states by block number into frozensets; the transition from a block on <code>a</code> is the block of <code>delta[(q, a)]</code> for any member <code>q</code>.</p>",
   "solution": "def minimize(dfa):\n    sigma, delta = dfa[\"alphabet\"], dfa[\"delta\"]\n    reach, todo = {dfa[\"start\"]}, [dfa[\"start\"]]\n    while todo:\n        q = todo.pop()\n        for a in sigma:\n            r = delta[(q, a)]\n            if r not in reach:\n                reach.add(r)\n                todo.append(r)\n    states = sorted(reach, key=repr)\n    block = {q: int(q in dfa[\"accept\"]) for q in states}\n    while True:\n        sig = {q: (block[q],) + tuple(block[delta[(q, a)]] for a in sigma) for q in states}\n        ids = {}\n        new = {q: ids.setdefault(sig[q], len(ids)) for q in states}\n        done = len(ids) == len(set(block.values()))\n        block = new\n        if done:\n            break\n    groups = {}\n    for q in states:\n        groups.setdefault(block[q], set()).add(q)\n    of = {q: frozenset(groups[block[q]]) for q in states}\n    blocks = set(of.values())\n    return {\"states\": blocks, \"alphabet\": sigma,\n            \"delta\": {(B, a): of[delta[(next(iter(B)), a)]] for B in blocks for a in sigma},\n            \"start\": of[dfa[\"start\"]],\n            \"accept\": {B for B in blocks if next(iter(B)) in dfa[\"accept\"]}}\n",
   "tests": [
    {
     "label": "Counting a's mod 6, accepting 0 and 3",
     "type": "assert",
     "code": "M6 = {\"states\": set(range(6)), \"alphabet\": \"ab\", \"start\": 0, \"accept\": {0, 3},\n      \"delta\": {(i, c): ((i + 1) % 6 if c == \"a\" else i) for i in range(6) for c in \"ab\"}}\nm = minimize(M6)\nf = frozenset\nassert m[\"states\"] == {f({0, 3}), f({1, 4}), f({2, 5})}, m[\"states\"]\nassert m[\"start\"] == f({0, 3}) and m[\"accept\"] == {f({0, 3})}\nassert m[\"delta\"][(f({1, 4}), \"a\")] == f({2, 5})\n"
    },
    {
     "label": "Practice problem 3: ends in 01",
     "type": "assert",
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\ndef _chk_run_dfa(dfa, w):\n    delta, q = dfa[\"delta\"], dfa[\"start\"]\n    for a in w:\n        q = delta[(q, a)]\n    return q in dfa[\"accept\"]\n\nD = {\"states\": set(\"ABCDE\"), \"alphabet\": \"01\", \"start\": \"A\", \"accept\": {\"C\", \"E\"},\n     \"delta\": {(\"A\",\"0\"):\"B\",(\"A\",\"1\"):\"A\",(\"B\",\"0\"):\"D\",(\"B\",\"1\"):\"C\",(\"C\",\"0\"):\"D\",(\"C\",\"1\"):\"A\",\n               (\"D\",\"0\"):\"B\",(\"D\",\"1\"):\"E\",(\"E\",\"0\"):\"B\",(\"E\",\"1\"):\"A\"}}\nm = minimize(D)\nassert len(m[\"states\"]) == 3, m[\"states\"]\nfor w in _chk_strings(\"01\", 10):\n    assert _chk_run_dfa(m, w) == w.endswith(\"01\"), w\n"
    },
    {
     "label": "Unreachable states are removed",
     "type": "assert",
     "code": "D = {\"states\": {0, 1, 2, 9}, \"alphabet\": \"a\", \"start\": 0, \"accept\": {1, 9},\n     \"delta\": {(0, \"a\"): 1, (1, \"a\"): 2, (2, \"a\"): 0, (9, \"a\"): 9}}\nm = minimize(D)\nassert all(9 not in B for B in m[\"states\"]), m[\"states\"]\nassert len(m[\"states\"]) == 3\n"
    },
    {
     "label": "Random DFAs: same language, and minimal",
     "type": "assert",
     "hidden": true,
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\ndef _chk_run_dfa(dfa, w):\n    delta, q = dfa[\"delta\"], dfa[\"start\"]\n    for a in w:\n        q = delta[(q, a)]\n    return q in dfa[\"accept\"]\n\nimport random\nrng = random.Random(3)\nfor trial in range(30):\n    n = 8\n    D = {\"states\": set(range(n)), \"alphabet\": \"ab\", \"start\": 0,\n         \"accept\": {q for q in range(n) if rng.random() < 0.4},\n         \"delta\": {(q, c): rng.randrange(n) for q in range(n) for c in \"ab\"}}\n    m = minimize(D)\n    for w in _chk_strings(\"ab\", 7):\n        assert _chk_run_dfa(m, w) == _chk_run_dfa(D, w), (trial, w)\n    # minimal: every two blocks are distinguished by some suffix of length < n\n    blocks = list(m[\"states\"])\n    def acc_from(B, z):\n        q = B\n        for c in z:\n            q = m[\"delta\"][(q, c)]\n        return q in m[\"accept\"]\n    for i in range(len(blocks)):\n        for j in range(i + 1, len(blocks)):\n            assert any(acc_from(blocks[i], z) != acc_from(blocks[j], z) for z in _chk_strings(\"ab\", n)), (trial, blocks[i], blocks[j])\n"
    }
   ]
  }
 ],
 "tc4": [
  {
   "id": "pumping_game",
   "title": "Playing the pumping game",
   "prompt": "<p>Write <code>pump_split(in_lang, s, p, imax=3)</code>: given a membership function <code>in_lang</code>, a string <code>s</code> in the language and a pumping length <code>p</code>, return a split <code>(x, y, z)</code> with <code>s == x + y + z</code>, <code>len(x + y) &lt;= p</code>, <code>len(y) &gt;= 1</code> and <code>in_lang(x + y * i + z)</code> for every <code>i</code> in 0, …, <code>imax</code>, choosing the one with the shortest <code>x + y</code>, and among those the longest <code>y</code>; or <code>None</code> if no split works.</p>\n<p>Then write <code>refute(in_lang, s, p, imax=3)</code>, which returns a dict mapping every allowed split <code>(x, y, z)</code> to the smallest <code>i</code> in 0, …, <code>imax</code> with <code>x + y * i + z</code> not in the language, or returns <code>None</code> if some split survives every <code>i</code>. This is your move in the game: an answer for every split the adversary might choose.</p>",
   "starter": "def pump_split(in_lang, s, p, imax=3):\n    pass\n\ndef refute(in_lang, s, p, imax=3):\n    pass\n",
   "hint": "<p>Loop over <code>j = len(x + y)</code> from 1 to <code>min(p, len(s))</code>, and for each, over <code>i = len(x)</code> from 0 to <code>j - 1</code> (longest <code>y</code> first means <code>i</code> increasing). <code>refute</code> uses the same two loops.</p>",
   "solution": "def _splits(s, p):\n    for j in range(1, min(p, len(s)) + 1):\n        for i in range(j):\n            yield s[:i], s[i:j], s[j:]\n\ndef pump_split(in_lang, s, p, imax=3):\n    for x, y, z in _splits(s, p):\n        if all(in_lang(x + y * k + z) for k in range(imax + 1)):\n            return x, y, z\n    return None\n\ndef refute(in_lang, s, p, imax=3):\n    answer = {}\n    for x, y, z in _splits(s, p):\n        bad = [k for k in range(imax + 1) if not in_lang(x + y * k + z)]\n        if not bad:\n            return None\n        answer[(x, y, z)] = bad[0]\n    return answer\n",
   "tests": [
    {
     "label": "0^n 1^n can't be pumped",
     "type": "assert",
     "code": "def L(w):\n    n = len(w) // 2\n    return w == \"0\" * n + \"1\" * n\nassert pump_split(L, \"0\" * 6 + \"1\" * 6, 6) is None\nr = refute(L, \"0\" * 4 + \"1\" * 4, 4)\nassert r is not None and len(r) == 10, r\nassert r[(\"\", \"0\", \"0001111\")] == 0\n"
    },
    {
     "label": "A regular language can be pumped",
     "call": "pump_split(lambda w: w.count('0') % 2 == 0, '0101', 3)",
     "expect": "('0', '1', '01')"
    },
    {
     "label": "Shortest xy, then longest y",
     "call": "pump_split(lambda w: set(w) <= {'a'}, 'aaaa', 3)",
     "expect": "('', 'a', 'aaa')"
    },
    {
     "label": "Balanced parentheses, pumping down",
     "type": "assert",
     "code": "def bal(w):\n    d = 0\n    for c in w:\n        d += 1 if c == \"(\" else -1\n        if d < 0:\n            return False\n    return d == 0\nr = refute(bal, \"(\" * 5 + \")\" * 5, 5)\nassert r is not None and all(v in (0, 2) for v in r.values()), r\nassert r[(\"\", \"(\", \"(((()))))\")] == 0\nassert refute(bal, \"()()()\", 4) is None\n"
    },
    {
     "label": "Strings shorter than p",
     "type": "assert",
     "code": "assert pump_split(lambda w: True, \"ab\", 5) == (\"\", \"a\", \"b\")\nassert refute(lambda w: w == \"ab\", \"ab\", 5) == {(\"\", \"a\", \"b\"): 0, (\"\", \"ab\", \"\"): 0, (\"a\", \"b\", \"\"): 0}\n"
    }
   ]
  },
  {
   "id": "distinguish",
   "title": "Distinguishing strings",
   "prompt": "<p>Write <code>suffix(in_lang, x, y, alphabet, maxlen)</code>, which returns the first string <code>z</code> in shortlex order (by length, then in the order of <code>alphabet</code>), of length at most <code>maxlen</code>, for which exactly one of <code>x + z</code> and <code>y + z</code> is in the language; or <code>None</code> if there is none.</p>\n<p>Then write <code>classes(in_lang, alphabet, n, maxlen)</code>, which groups all strings of length at most <code>n</code> into classes of strings that no suffix of length at most <code>maxlen</code> distinguishes. Return a list of lists, each class in shortlex order, the classes ordered by their first string. (When <code>maxlen</code> is large enough this computes the Myhill–Nerode classes that the strings fall into, and so a lower bound on the number of DFA states.)</p>",
   "starter": "def suffix(in_lang, x, y, alphabet, maxlen):\n    pass\n\ndef classes(in_lang, alphabet, n, maxlen):\n    pass\n",
   "hint": "<p>For <code>classes</code>, give each string a signature: the tuple of <code>in_lang(w + z)</code> for every suffix <code>z</code> of length at most <code>maxlen</code>. Strings with equal signatures go in the same class. A dict from signature to list keeps the classes in order of first appearance if you visit strings in shortlex order.</p>",
   "solution": "from itertools import product\n\ndef _strings(alphabet, n):\n    for k in range(n + 1):\n        for t in product(alphabet, repeat=k):\n            yield \"\".join(t)\n\ndef suffix(in_lang, x, y, alphabet, maxlen):\n    for z in _strings(alphabet, maxlen):\n        if in_lang(x + z) != in_lang(y + z):\n            return z\n    return None\n\ndef classes(in_lang, alphabet, n, maxlen):\n    tests = list(_strings(alphabet, maxlen))\n    groups = {}\n    for w in _strings(alphabet, n):\n        sig = tuple(in_lang(w + z) for z in tests)\n        groups.setdefault(sig, []).append(w)\n    return list(groups.values())\n",
   "tests": [
    {
     "label": "0^n 1^n: suffixes from the notes",
     "type": "assert",
     "code": "def L(w):\n    n = len(w) // 2\n    return w == \"0\" * n + \"1\" * n\nassert suffix(L, \"000\", \"00\", \"01\", 6) == \"11\"\nassert suffix(L, \"01\", \"0011\", \"01\", 6) is None\nassert suffix(L, \"0\", \"\", \"01\", 6) == \"\"\n"
    },
    {
     "label": "Third from the end: 8 classes",
     "type": "assert",
     "code": "L3 = lambda w: len(w) >= 3 and w[-3] == \"1\"\nc = classes(L3, \"01\", 4, 3)\nassert len(c) == 8, len(c)\nassert c[0][:3] == [\"\", \"0\", \"00\"], c[0]\n"
    },
    {
     "label": "Multiples of 3 have 3 classes",
     "type": "assert",
     "code": "L = lambda w: int(w or \"0\", 2) % 3 == 0\nc = classes(L, \"01\", 5, 4)\nassert len(c) == 3, c\nassert c[0][:4] == [\"\", \"0\", \"00\", \"11\"], c[0]\n"
    },
    {
     "label": "0^n 1^n: the number of classes keeps growing",
     "type": "assert",
     "code": "def L(w):\n    n = len(w) // 2\n    return w == \"0\" * n + \"1\" * n\nsizes = [len(classes(L, \"01\", n, n)) for n in range(1, 7)]\nassert sizes == sorted(sizes) and sizes[-1] > sizes[0] + 4, sizes\n"
    }
   ]
  }
 ],
 "tc5": [
  {
   "id": "cyk_parser",
   "title": "The CYK algorithm",
   "prompt": "<p>A grammar in Chomsky normal form is a dict from each variable to a list of right sides, each a tuple: <code>(\"B\", \"C\")</code> for a rule <em>A</em> → <em>BC</em>, <code>(\"a\",)</code> for <em>A</em> → a, and <code>()</code> for <em>S</em> → ε (allowed only for the start variable). Write <code>cyk(grammar, start, w)</code>, returning whether the grammar generates <code>w</code> (including the empty string). Then write <code>count_trees(grammar, start, w)</code>, returning the number of different parse trees for <code>w</code> (0 if it isn't generated; for <code>w == \"\"</code>, 1 if <em>S</em> → ε is a rule, since its one tree is <em>S</em> with a single ε child, and 0 otherwise): change the table so each entry maps a variable to the number of ways it derives the substring.</p>",
   "starter": "def cyk(grammar, start, w):\n    pass\n\ndef count_trees(grammar, start, w):\n    pass\n",
   "hint": "<p>Handle <code>w == \"\"</code> first: it is generated exactly when <code>()</code> is among the start variable's right sides, and then <code>count_trees</code> returns 1. For counting, the entry for a substring is a dict; for a rule <em>A</em> → <em>BC</em> and a split, add count[<em>B</em>] × count[<em>C</em>] to count[<em>A</em>]. Then <code>cyk</code> is just <code>count_trees(...) &gt; 0</code>.</p>",
   "solution": "def count_trees(grammar, start, w):\n    n = len(w)\n    if n == 0:\n        return 1 if () in grammar.get(start, []) else 0\n    table = {}\n    for i, c in enumerate(w):\n        cell = {}\n        for var, rhss in grammar.items():\n            k = sum(1 for rhs in rhss if rhs == (c,))\n            if k:\n                cell[var] = k\n        table[(i, 1)] = cell\n    for length in range(2, n + 1):\n        for i in range(n - length + 1):\n            cell = {}\n            for k in range(1, length):\n                left, right = table[(i, k)], table[(i + k, length - k)]\n                if not left or not right:\n                    continue\n                for var, rhss in grammar.items():\n                    for rhs in rhss:\n                        if len(rhs) == 2 and rhs[0] in left and rhs[1] in right:\n                            cell[var] = cell.get(var, 0) + left[rhs[0]] * right[rhs[1]]\n            table[(i, length)] = cell\n    return table[(0, n)].get(start, 0)\n\ndef cyk(grammar, start, w):\n    return count_trees(grammar, start, w) > 0\n",
   "tests": [
    {
     "label": "a^n b^n from the notes",
     "type": "assert",
     "code": "G = {\"S\": [(\"A\", \"T\"), (\"A\", \"B\")], \"T\": [(\"S\", \"B\")], \"A\": [(\"a\",)], \"B\": [(\"b\",)]}\ngot = [w for w in [\"ab\", \"aabb\", \"aab\", \"abab\", \"aaabbb\", \"ba\", \"\"] if cyk(G, \"S\", w)]\nassert got == [\"ab\", \"aabb\", \"aaabbb\"], got\n"
    },
    {
     "label": "Empty string via S0 -> ε",
     "type": "assert",
     "code": "G = {\"S0\": [(\"A\", \"T\"), (\"A\", \"B\"), ()], \"S\": [(\"A\", \"T\"), (\"A\", \"B\")], \"T\": [(\"S\", \"B\")], \"A\": [(\"a\",)], \"B\": [(\"b\",)]}\nassert cyk(G, \"S0\", \"\") and cyk(G, \"S0\", \"aabb\") and not cyk(G, \"S0\", \"abb\")\n"
    },
    {
     "label": "Counting parse trees of an ambiguous grammar",
     "type": "assert",
     "code": "# E -> E P E | a with P -> + ; in CNF: E -> E X | a, X -> P E, P -> +\nG = {\"E\": [(\"E\", \"X\"), (\"a\",)], \"X\": [(\"P\", \"E\")], \"P\": [(\"+\",)]}\ncounts = [count_trees(G, \"E\", \"+\".join(\"a\" * k)) for k in range(1, 7)]\nassert counts == [1, 1, 2, 5, 14, 42], counts      # the Catalan numbers\nassert count_trees(G, \"E\", \"a+\") == 0\n"
    },
    {
     "label": "Balanced parentheses, checked against a counter",
     "type": "assert",
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\n# S0 -> S S | L R | L Y | ε,  S -> S S | L R | L Y,  Y -> S R,  L -> (,  R -> )\nG = {\"S0\": [(\"S\", \"S\"), (\"L\", \"R\"), (\"L\", \"Y\"), ()], \"S\": [(\"S\", \"S\"), (\"L\", \"R\"), (\"L\", \"Y\")],\n     \"Y\": [(\"S\", \"R\")], \"L\": [(\"(\",)], \"R\": [(\")\",)]}\ndef bal(w):\n    d = 0\n    for c in w:\n        d += 1 if c == \"(\" else -1\n        if d < 0:\n            return False\n    return d == 0\nfor w in _chk_strings(\"()\", 10):\n    assert cyk(G, \"S0\", w) == bal(w), w\n"
    },
    {
     "label": "Length 60",
     "type": "assert",
     "limit": 8,
     "code": "G = {\"S\": [(\"A\", \"T\"), (\"A\", \"B\")], \"T\": [(\"S\", \"B\")], \"A\": [(\"a\",)], \"B\": [(\"b\",)]}\nassert cyk(G, \"S\", \"a\" * 30 + \"b\" * 30)\nassert not cyk(G, \"S\", \"a\" * 30 + \"b\" * 29 + \"a\")\n"
    }
   ]
  },
  {
   "id": "expr_eval",
   "title": "A recursive-descent calculator",
   "prompt": "<p>Write <code>evaluate(text)</code> for arithmetic expressions with non-negative integers, <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code> (true division), <code>%</code>, <code>^</code> (power), unary minus, parentheses and spaces. Precedence, from loosest: <code>+ -</code> (left associative), then <code>* / %</code> (left associative), then unary minus, then <code>^</code> (right associative), so <code>-2^2</code> is −4 and <code>2^3^2</code> is 512. Raise <code>ValueError</code> for any malformed input (bad characters, missing operands, unbalanced parentheses, empty input). Don't use <code>eval</code>.</p>",
   "starter": "def evaluate(text):\n    pass\n",
   "hint": "<p>Use the grammar expr := term (('+'|'-') term)*, term := unary (('*'|'/'|'%') unary)*, unary := '-' unary | power, power := atom ('^' unary)?, atom := NUMBER | '(' expr ')'. The exponent is a <code>unary</code> so that <code>2^-1</code> works, and calling back into the right-hand side makes <code>^</code> group to the right.</p>",
   "solution": "def _tokens(text):\n    out, i = [], 0\n    while i < len(text):\n        c = text[i]\n        if c.isspace():\n            i += 1\n        elif c.isdigit():\n            j = i\n            while j < len(text) and text[j].isdigit():\n                j += 1\n            out.append(int(text[i:j]))\n            i = j\n        elif c in \"+-*/%^()\":\n            out.append(c)\n            i += 1\n        else:\n            raise ValueError(\"bad character \" + repr(c))\n    return out\n\ndef evaluate(text):\n    toks, pos = _tokens(text), [0]\n\n    def peek():\n        return toks[pos[0]] if pos[0] < len(toks) else None\n\n    def take():\n        t = peek()\n        pos[0] += 1\n        return t\n\n    def expr():\n        v = term()\n        while peek() in (\"+\", \"-\"):\n            v = v + term() if take() == \"+\" else v - term()\n        return v\n\n    def term():\n        v = unary()\n        while peek() in (\"*\", \"/\", \"%\"):\n            op = take()\n            r = unary()\n            v = v * r if op == \"*\" else (v / r if op == \"/\" else v % r)\n        return v\n\n    def unary():\n        if peek() == \"-\":\n            take()\n            return -unary()\n        return power()\n\n    def power():\n        base = atom()\n        if peek() == \"^\":\n            take()\n            return base ** unary()\n        return base\n\n    def atom():\n        t = take()\n        if isinstance(t, int):\n            return t\n        if t == \"(\":\n            v = expr()\n            if take() != \")\":\n                raise ValueError(\"expected )\")\n            return v\n        raise ValueError(\"unexpected \" + repr(t))\n\n    v = expr()\n    if peek() is not None:\n        raise ValueError(\"unexpected \" + repr(peek()))\n    return v\n",
   "tests": [
    {
     "label": "Precedence",
     "call": "[evaluate('2 + 3 * (4 - 1)'), evaluate('1 + 2 * 3'), evaluate('(1 + 2) * 3')]",
     "expect": "[11, 7, 9]"
    },
    {
     "label": "Left associativity",
     "call": "[evaluate('8 - 3 - 2'), evaluate('100 / 10 / 5'), evaluate('17 % 5 % 3')]",
     "expect": "[3, 2.0, 2]"
    },
    {
     "label": "Power and unary minus",
     "call": "[evaluate('2^3^2'), evaluate('-2^2'), evaluate('(-2)^2'), evaluate('2^-1'), evaluate('--3'), evaluate('-(2 + 3) * 4')]",
     "expect": "[512, -4, 4, 0.5, 3, -20]"
    },
    {
     "label": "Malformed input",
     "type": "assert",
     "code": "for bad in [\"\", \"2 +\", \"* 3\", \"(1 + 2\", \"1 + 2)\", \"2 3\", \"1 & 2\", \"()\", \"2 ^\"]:\n    try:\n        evaluate(bad)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(\"no ValueError for \" + repr(bad))\n"
    },
    {
     "label": "Agrees with Python on random expressions",
     "type": "assert",
     "hidden": true,
     "code": "import random\nrng = random.Random(5)\ndef gen(d):\n    if d == 0 or rng.random() < 0.3:\n        return str(rng.randint(1, 9))\n    op = rng.choice([\"+\", \"-\", \"*\"])\n    return \"(\" + gen(d - 1) + \" \" + op + \" \" + gen(d - 1) + \")\" if rng.random() < 0.5 else gen(d - 1) + \" \" + op + \" \" + gen(d - 1)\nfor _ in range(200):\n    e = gen(4)\n    assert evaluate(e) == eval(e), e\n"
    },
    {
     "label": "Doesn't use eval",
     "type": "source",
     "code": "assert 'eval(' not in __source__.replace('evaluate(', ''), 'write the parser yourself'\n"
    }
   ]
  }
 ],
 "tc6": [
  {
   "id": "pda_sim",
   "title": "Simulating a pushdown automaton",
   "prompt": "<p>A PDA's transitions are a dict from <code>(state, symbol, top)</code> to a set of <code>(next_state, push)</code> pairs. <code>symbol</code> is an input character or <code>\"\"</code> (read nothing); <code>top</code> is a stack symbol to pop or <code>\"\"</code> (pop nothing); <code>push</code> is a string written top first (so pushing <code>\"AB\"</code> leaves A on top), possibly empty. Write <code>pda_accepts(delta, start, accept, w, max_stack=40)</code>: return <code>True</code> if some computation reads all of <code>w</code> and is then in an accepting state (acceptance may happen after further ε-moves). Ignore configurations whose stack is longer than <code>max_stack</code>, so the search always ends.</p>\n<p>Also write <code>pda_language(delta, start, accept, alphabet, n)</code>, returning the sorted list (shortlex order) of accepted strings of length at most <code>n</code>.</p>",
   "starter": "def pda_accepts(delta, start, accept, w, max_stack=40):\n    pass\n\ndef pda_language(delta, start, accept, alphabet, n):\n    pass\n",
   "hint": "<p>Breadth-first search over configurations (state, position, stack), with a seen set, as in the notes. Represent the stack as a string whose last character is the top; pushing <code>push</code> appends <code>push[::-1]</code>. Sort with <code>key=lambda s: (len(s), [alphabet.index(c) for c in s])</code>.</p>",
   "solution": "from collections import deque\nfrom itertools import product\n\ndef pda_accepts(delta, start, accept, w, max_stack=40):\n    first = (start, 0, \"\")\n    seen, queue = {first}, deque([first])\n    while queue:\n        q, i, stack = queue.popleft()\n        if i == len(w) and q in accept:\n            return True\n        reads = [\"\"] + ([w[i]] if i < len(w) else [])\n        pops = [\"\"] + ([stack[-1]] if stack else [])\n        for a in reads:\n            for top in pops:\n                for r, push in delta.get((q, a, top), ()):\n                    rest = stack[:-1] if top else stack\n                    new = (r, i + len(a), rest + push[::-1])\n                    if len(new[2]) <= max_stack and new not in seen:\n                        seen.add(new)\n                        queue.append(new)\n    return False\n\ndef pda_language(delta, start, accept, alphabet, n):\n    out = []\n    for k in range(n + 1):\n        for t in product(alphabet, repeat=k):\n            w = \"\".join(t)\n            if pda_accepts(delta, start, accept, w):\n                out.append(w)\n    return out\n",
   "tests": [
    {
     "label": "0^n 1^n from the notes",
     "call": "pda_language({('q0', '', ''): {('q1', '$')}, ('q1', '0', ''): {('q1', '0')}, ('q1', '1', '0'): {('q2', '')}, ('q2', '1', '0'): {('q2', '')}, ('q2', '', '$'): {('q3', '')}}, 'q0', {'q0', 'q3'}, '01', 8)",
     "expect": "['', '01', '0011', '000111', '00001111']"
    },
    {
     "label": "Even palindromes need the guess",
     "type": "assert",
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\nPAL = {(\"q0\", \"\", \"\"): {(\"q1\", \"$\")}, (\"q1\", \"a\", \"\"): {(\"q1\", \"a\")}, (\"q1\", \"b\", \"\"): {(\"q1\", \"b\")},\n       (\"q1\", \"\", \"\"): {(\"q2\", \"\")}, (\"q2\", \"a\", \"a\"): {(\"q2\", \"\")}, (\"q2\", \"b\", \"b\"): {(\"q2\", \"\")},\n       (\"q2\", \"\", \"$\"): {(\"q3\", \"\")}}\nfor w in _chk_strings(\"ab\", 8):\n    assert pda_accepts(PAL, \"q0\", {\"q3\"}, w) == (len(w) % 2 == 0 and w == w[::-1]), w\n"
    },
    {
     "label": "Multi-symbol pushes are top first",
     "type": "assert",
     "code": "# push \"ab\": a must be on top, so reading a then b pops in that order\nd = {(\"s\", \"\", \"\"): {(\"t\", \"ab\")}, (\"t\", \"a\", \"a\"): {(\"u\", \"\")}, (\"u\", \"b\", \"b\"): {(\"f\", \"\")}}\nassert pda_accepts(d, \"s\", {\"f\"}, \"ab\")\nassert not pda_accepts(d, \"s\", {\"f\"}, \"ba\")\n"
    },
    {
     "label": "ε-loops that push forever don't hang",
     "type": "assert",
     "limit": 6,
     "code": "d = {(\"s\", \"\", \"\"): {(\"s\", \"X\")}, (\"s\", \"a\", \"X\"): {(\"f\", \"\")}}\nassert pda_accepts(d, \"s\", {\"f\"}, \"a\")\nassert not pda_accepts(d, \"s\", {\"f\"}, \"b\")\n"
    }
   ]
  },
  {
   "id": "cfg_to_pda",
   "title": "From a grammar to a pushdown automaton",
   "prompt": "<p>A grammar is a dict from each variable (a single capital letter) to a list of right sides, each a string of variables and terminals (<code>\"\"</code> for ε). Write <code>cfg_to_pda(grammar, start)</code>, which returns <code>(delta, start_state, accept_states)</code> for a PDA, in the previous problem's format, that accepts exactly the language of the grammar, using Lesson 6's three-state construction. Use <code>\"$\"</code> as the bottom marker; terminals are all characters in the right sides that aren't variables.</p>\n<p>The tests run your PDA with a simulator of their own.</p>",
   "starter": "def cfg_to_pda(grammar, start):\n    pass\n",
   "hint": "<p>Three states, say \"start\", \"loop\" and \"accept\". Push <code>start + \"$\"</code> first (top first, so the start variable is on top). For each variable, one entry (\"loop\", \"\", var) whose set holds one (\"loop\", rhs) per rule. For each terminal, (\"loop\", a, a) → {(\"loop\", \"\")}.</p>",
   "solution": "def cfg_to_pda(grammar, start):\n    delta = {(\"start\", \"\", \"\"): {(\"loop\", start + \"$\")}}\n    terminals = set()\n    for var, rhss in grammar.items():\n        delta[(\"loop\", \"\", var)] = {(\"loop\", rhs) for rhs in rhss}\n        for rhs in rhss:\n            terminals |= {c for c in rhs if c not in grammar}\n    for a in terminals:\n        delta[(\"loop\", a, a)] = {(\"loop\", \"\")}\n    delta[(\"loop\", \"\", \"$\")] = {(\"accept\", \"\")}\n    return delta, \"start\", {\"accept\"}\n",
   "tests": [
    {
     "label": "S -> 0S1 | ε",
     "type": "assert",
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\nfrom collections import deque as _chk_deque\ndef _chk_run_pda(delta, start, accept, w, max_stack=40):\n    first = (start, 0, \"\")\n    seen, queue = {first}, _chk_deque([first])\n    while queue:\n        q, i, stack = queue.popleft()\n        if i == len(w) and q in accept:\n            return True\n        reads = [\"\"] + ([w[i]] if i < len(w) else [])\n        pops = [\"\"] + ([stack[-1]] if stack else [])\n        for a in reads:\n            for top in pops:\n                for r, push in delta.get((q, a, top), ()):\n                    rest = stack[:-1] if top else stack\n                    new = (r, i + len(a), rest + push[::-1])\n                    if len(new[2]) <= max_stack and new not in seen:\n                        seen.add(new); queue.append(new)\n    return False\n\nd, s, f = cfg_to_pda({\"S\": [\"0S1\", \"\"]}, \"S\")\ngot = [w for w in _chk_strings(\"01\", 6) if _chk_run_pda(d, s, f, w)]\nassert got == [\"\", \"01\", \"0011\", \"000111\"], got\n"
    },
    {
     "label": "Balanced parentheses",
     "type": "assert",
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\nfrom collections import deque as _chk_deque\ndef _chk_run_pda(delta, start, accept, w, max_stack=40):\n    first = (start, 0, \"\")\n    seen, queue = {first}, _chk_deque([first])\n    while queue:\n        q, i, stack = queue.popleft()\n        if i == len(w) and q in accept:\n            return True\n        reads = [\"\"] + ([w[i]] if i < len(w) else [])\n        pops = [\"\"] + ([stack[-1]] if stack else [])\n        for a in reads:\n            for top in pops:\n                for r, push in delta.get((q, a, top), ()):\n                    rest = stack[:-1] if top else stack\n                    new = (r, i + len(a), rest + push[::-1])\n                    if len(new[2]) <= max_stack and new not in seen:\n                        seen.add(new); queue.append(new)\n    return False\n\nd, s, f = cfg_to_pda({\"S\": [\"(S)S\", \"\"]}, \"S\")\ndef bal(w):\n    k = 0\n    for c in w:\n        k += 1 if c == \"(\" else -1\n        if k < 0:\n            return False\n    return k == 0\nfor w in _chk_strings(\"()\", 8):\n    assert _chk_run_pda(d, s, f, w) == bal(w), w\n"
    },
    {
     "label": "Several variables: a^i b^j c^i",
     "type": "assert",
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\nfrom collections import deque as _chk_deque\ndef _chk_run_pda(delta, start, accept, w, max_stack=40):\n    first = (start, 0, \"\")\n    seen, queue = {first}, _chk_deque([first])\n    while queue:\n        q, i, stack = queue.popleft()\n        if i == len(w) and q in accept:\n            return True\n        reads = [\"\"] + ([w[i]] if i < len(w) else [])\n        pops = [\"\"] + ([stack[-1]] if stack else [])\n        for a in reads:\n            for top in pops:\n                for r, push in delta.get((q, a, top), ()):\n                    rest = stack[:-1] if top else stack\n                    new = (r, i + len(a), rest + push[::-1])\n                    if len(new[2]) <= max_stack and new not in seen:\n                        seen.add(new); queue.append(new)\n    return False\n\nd, s, f = cfg_to_pda({\"S\": [\"aSc\", \"B\"], \"B\": [\"bB\", \"\"]}, \"S\")\ndef ok(w):\n    i = len(w) - len(w.lstrip(\"a\"))\n    rest = w[i:]\n    j = len(rest) - len(rest.lstrip(\"b\"))\n    return rest[j:] == \"c\" * i\nfor w in _chk_strings(\"abc\", 6):\n    assert _chk_run_pda(d, s, f, w) == ok(w), w\n"
    },
    {
     "label": "Equal numbers of a and b",
     "type": "assert",
     "hidden": true,
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\nfrom collections import deque as _chk_deque\ndef _chk_run_pda(delta, start, accept, w, max_stack=40):\n    first = (start, 0, \"\")\n    seen, queue = {first}, _chk_deque([first])\n    while queue:\n        q, i, stack = queue.popleft()\n        if i == len(w) and q in accept:\n            return True\n        reads = [\"\"] + ([w[i]] if i < len(w) else [])\n        pops = [\"\"] + ([stack[-1]] if stack else [])\n        for a in reads:\n            for top in pops:\n                for r, push in delta.get((q, a, top), ()):\n                    rest = stack[:-1] if top else stack\n                    new = (r, i + len(a), rest + push[::-1])\n                    if len(new[2]) <= max_stack and new not in seen:\n                        seen.add(new); queue.append(new)\n    return False\n\nd, s, f = cfg_to_pda({\"S\": [\"aSbS\", \"bSaS\", \"\"]}, \"S\")\nfor w in _chk_strings(\"ab\", 6):\n    assert _chk_run_pda(d, s, f, w) == (w.count(\"a\") == w.count(\"b\")), w\n"
    }
   ]
  }
 ],
 "tc7": [
  {
   "id": "tm_sim",
   "title": "A Turing machine simulator",
   "prompt": "<p>A one-tape TM is a dict from <code>(state, symbol)</code> to <code>(next_state, write, move)</code>, with <code>move</code> <code>\"L\"</code> or <code>\"R\"</code>. The blank is <code>\"_\"</code>, the start state is <code>\"q0\"</code>, and the halting states are <code>\"accept\"</code> and <code>\"reject\"</code>; a missing transition means reject. The tape is unlimited to the right, and a left move on cell 0 stays on cell 0.</p>\n<p>Write <code>run_tm(delta, w, max_steps)</code>, returning <code>(outcome, steps, tape)</code>: <code>outcome</code> is <code>\"accept\"</code>, <code>\"reject\"</code> or <code>\"timeout\"</code> (if <code>max_steps</code> steps have been taken without halting), <code>steps</code> the number of transitions taken (a missing transition is not a step), and <code>tape</code> the tape contents from cell 0 to the last cell ever visited or written, as a string, with trailing blanks removed.</p>",
   "starter": "def run_tm(delta, w, max_steps):\n    pass\n",
   "hint": "<p>Store the tape in a dict from cell number to symbol, reading missing cells as blanks. This is the notes' <code>run_tm</code> with the start state fixed at <code>\"q0\"</code> and <code>max_steps</code> as the third argument, and it should give the same tape string. Track the largest cell index used so you can build the string at the end; <code>rstrip(\"_\")</code> removes trailing blanks (leading ones must stay).</p>",
   "solution": "def run_tm(delta, w, max_steps):\n    tape = dict(enumerate(w))\n    q, head, steps, far = \"q0\", 0, 0, len(w) - 1\n    while q not in (\"accept\", \"reject\"):\n        if steps >= max_steps:\n            q = \"timeout\"\n            break\n        sym = tape.get(head, \"_\")\n        if (q, sym) not in delta:\n            q = \"reject\"\n            break\n        q, write, move = delta[(q, sym)]\n        tape[head] = write\n        far = max(far, head)\n        head = max(0, head + (1 if move == \"R\" else -1))\n        far = max(far, head)\n        steps += 1\n    s = \"\".join(tape.get(i, \"_\") for i in range(far + 1))\n    return q, steps, s.rstrip(\"_\")\n",
   "tests": [
    {
     "label": "The notes' 0^n 1^n machine",
     "type": "assert",
     "code": "Z = {(\"q0\", \"0\"): (\"q1\", \"X\", \"R\"), (\"q0\", \"Y\"): (\"q3\", \"Y\", \"R\"), (\"q0\", \"_\"): (\"accept\", \"_\", \"R\"),\n     (\"q1\", \"0\"): (\"q1\", \"0\", \"R\"), (\"q1\", \"Y\"): (\"q1\", \"Y\", \"R\"), (\"q1\", \"1\"): (\"q2\", \"Y\", \"L\"),\n     (\"q2\", \"0\"): (\"q2\", \"0\", \"L\"), (\"q2\", \"Y\"): (\"q2\", \"Y\", \"L\"), (\"q2\", \"X\"): (\"q0\", \"X\", \"R\"),\n     (\"q3\", \"Y\"): (\"q3\", \"Y\", \"R\"), (\"q3\", \"_\"): (\"accept\", \"_\", \"R\")}\nassert run_tm(Z, \"0011\", 1000) == (\"accept\", 13, \"XXYY\"), run_tm(Z, \"0011\", 1000)\nassert run_tm(Z, \"001\", 1000) == (\"reject\", 7, \"XXY\"), run_tm(Z, \"001\", 1000)\nassert run_tm(Z, \"010\", 1000) == (\"reject\", 4, \"XY0\")\nassert [run_tm(Z, \"0\" * n + \"1\" * n, 10 ** 6)[1] for n in (1, 2, 4, 8)] == [5, 13, 41, 145]\n"
    },
    {
     "label": "Timeouts",
     "type": "assert",
     "code": "loop = {(\"q0\", \"_\"): (\"q0\", \"_\", \"R\"), (\"q0\", \"a\"): (\"q0\", \"a\", \"R\")}\nassert run_tm(loop, \"a\", 50)[:2] == (\"timeout\", 50)\nbounce = {(\"q0\", \"_\"): (\"q0\", \"_\", \"L\")}\nassert run_tm(bounce, \"\", 30) == (\"timeout\", 30, \"\")\n"
    },
    {
     "label": "Left edge and leading blanks",
     "type": "assert",
     "code": "# write 1 on cell 0, move left (stays), then write 2 there\nd = {(\"q0\", \"a\"): (\"q1\", \"1\", \"L\"), (\"q1\", \"1\"): (\"q2\", \"2\", \"R\"), (\"q2\", \"_\"): (\"q3\", \"_\", \"R\"), (\"q3\", \"_\"): (\"accept\", \"3\", \"R\")}\nassert run_tm(d, \"a\", 100) == (\"accept\", 4, \"2_3\"), run_tm(d, \"a\", 100)\n"
    },
    {
     "label": "100,000 steps",
     "type": "assert",
     "limit": 8,
     "code": "Z = {(\"q0\", \"0\"): (\"q1\", \"X\", \"R\"), (\"q0\", \"Y\"): (\"q3\", \"Y\", \"R\"), (\"q0\", \"_\"): (\"accept\", \"_\", \"R\"),\n     (\"q1\", \"0\"): (\"q1\", \"0\", \"R\"), (\"q1\", \"Y\"): (\"q1\", \"Y\", \"R\"), (\"q1\", \"1\"): (\"q2\", \"Y\", \"L\"),\n     (\"q2\", \"0\"): (\"q2\", \"0\", \"L\"), (\"q2\", \"Y\"): (\"q2\", \"Y\", \"L\"), (\"q2\", \"X\"): (\"q0\", \"X\", \"R\"),\n     (\"q3\", \"Y\"): (\"q3\", \"Y\", \"R\"), (\"q3\", \"_\"): (\"accept\", \"_\", \"R\")}\nr = run_tm(Z, \"0\" * 200 + \"1\" * 200, 10 ** 6)\nassert r[0] == \"accept\" and r[1] == 2 * 200 ** 2 + 2 * 200 + 1, r[:2]\n"
    }
   ]
  },
  {
   "id": "tm_design",
   "title": "Building Turing machines",
   "prompt": "<p>Fill in two machines in the previous problem's format (start state <code>\"q0\"</code>, blank <code>\"_\"</code>, halting states <code>\"accept\"</code> and <code>\"reject\"</code>, missing transitions reject). The tests run them with their own simulator on every input up to length 8 (with a generous step limit), so each must halt on every input.</p>\n<ol><li><code>ABC</code> decides {a<sup><em>n</em></sup>b<sup><em>n</em></sup>c<sup><em>n</em></sup> : <em>n</em> ≥ 0} over the input alphabet {a, b, c}. (Lesson 6 showed no PDA can.)</li>\n<li><code>INC</code> adds 1 to a binary number written <em>least significant bit first</em> (so 6 is written <code>011</code>), over {0, 1}: it must accept, leaving exactly the result on the tape in the same format, with no other non-blank symbols. For example <code>011</code> becomes <code>111</code>, <code>11</code> becomes <code>001</code>, and the empty input becomes <code>1</code>.</li></ol>",
   "starter": "ABC = {}\nINC = {}\n",
   "hint": "<p>For ABC, extend ZERO_ONE: cross off one a (X), then the first b (Y), then the first c (Z), and return to the left. When no a's remain, check that only Y's and Z's follow. For INC, the carry moves right: change 1s to 0s while moving right, and the first 0 or blank becomes 1.</p>",
   "solution": "ABC = {\n    (\"q0\", \"a\"): (\"q1\", \"X\", \"R\"), (\"q0\", \"Y\"): (\"q5\", \"Y\", \"R\"), (\"q0\", \"_\"): (\"accept\", \"_\", \"R\"),\n    (\"q1\", \"a\"): (\"q1\", \"a\", \"R\"), (\"q1\", \"Y\"): (\"q1\", \"Y\", \"R\"), (\"q1\", \"b\"): (\"q2\", \"Y\", \"R\"),\n    (\"q2\", \"b\"): (\"q2\", \"b\", \"R\"), (\"q2\", \"Z\"): (\"q2\", \"Z\", \"R\"), (\"q2\", \"c\"): (\"q3\", \"Z\", \"L\"),\n    (\"q3\", \"a\"): (\"q3\", \"a\", \"L\"), (\"q3\", \"b\"): (\"q3\", \"b\", \"L\"), (\"q3\", \"Y\"): (\"q3\", \"Y\", \"L\"),\n    (\"q3\", \"Z\"): (\"q3\", \"Z\", \"L\"), (\"q3\", \"X\"): (\"q0\", \"X\", \"R\"),\n    (\"q5\", \"Y\"): (\"q5\", \"Y\", \"R\"), (\"q5\", \"Z\"): (\"q6\", \"Z\", \"R\"), (\"q5\", \"_\"): (\"reject\", \"_\", \"R\"),\n    (\"q6\", \"Z\"): (\"q6\", \"Z\", \"R\"), (\"q6\", \"_\"): (\"accept\", \"_\", \"R\"),\n}\n\nINC = {\n    (\"q0\", \"1\"): (\"q0\", \"0\", \"R\"),\n    (\"q0\", \"0\"): (\"accept\", \"1\", \"R\"),\n    (\"q0\", \"_\"): (\"accept\", \"1\", \"R\"),\n}\n",
   "tests": [
    {
     "label": "ABC on every string up to length 8",
     "type": "assert",
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\ndef _chk_run_tm(delta, w, max_steps=200000):\n    tape = dict(enumerate(w)); q, head, steps = \"q0\", 0, 0\n    while q not in (\"accept\", \"reject\"):\n        if steps == max_steps:\n            return \"timeout\", steps, tape\n        sym = tape.get(head, \"_\")\n        if (q, sym) not in delta:\n            return \"reject\", steps, tape\n        q, write, move = delta[(q, sym)]\n        tape[head] = write\n        head = max(0, head + (1 if move == \"R\" else -1))\n        steps += 1\n    return q, steps, tape\n\nassert ABC, \"fill in ABC\"\ndef ok(w):\n    n = len(w) // 3\n    return w == \"a\" * n + \"b\" * n + \"c\" * n\nfor w in _chk_strings(\"abc\", 8):\n    r = _chk_run_tm(ABC, w)\n    assert r[0] != \"timeout\", \"ABC doesn't halt on \" + repr(w)\n    assert (r[0] == \"accept\") == ok(w), w\n"
    },
    {
     "label": "ABC on longer inputs",
     "type": "assert",
     "code": "def _chk_run_tm(delta, w, max_steps=200000):\n    tape = dict(enumerate(w)); q, head, steps = \"q0\", 0, 0\n    while q not in (\"accept\", \"reject\"):\n        if steps == max_steps:\n            return \"timeout\", steps, tape\n        sym = tape.get(head, \"_\")\n        if (q, sym) not in delta:\n            return \"reject\", steps, tape\n        q, write, move = delta[(q, sym)]\n        tape[head] = write\n        head = max(0, head + (1 if move == \"R\" else -1))\n        steps += 1\n    return q, steps, tape\n\nassert ABC, \"fill in ABC\"\nfor n in [5, 9]:\n    assert _chk_run_tm(ABC, \"a\" * n + \"b\" * n + \"c\" * n)[0] == \"accept\"\n    assert _chk_run_tm(ABC, \"a\" * n + \"b\" * n + \"c\" * (n - 1))[0] == \"reject\"\n    assert _chk_run_tm(ABC, \"a\" * n + \"b\" * (n + 1) + \"c\" * n)[0] == \"reject\"\n"
    },
    {
     "label": "INC on every binary string up to length 8",
     "type": "assert",
     "code": "from itertools import product as _chk_product\ndef _chk_strings(alphabet, n):\n    for k in range(n + 1):\n        for t in _chk_product(alphabet, repeat=k):\n            yield \"\".join(t)\n\ndef _chk_run_tm(delta, w, max_steps=200000):\n    tape = dict(enumerate(w)); q, head, steps = \"q0\", 0, 0\n    while q not in (\"accept\", \"reject\"):\n        if steps == max_steps:\n            return \"timeout\", steps, tape\n        sym = tape.get(head, \"_\")\n        if (q, sym) not in delta:\n            return \"reject\", steps, tape\n        q, write, move = delta[(q, sym)]\n        tape[head] = write\n        head = max(0, head + (1 if move == \"R\" else -1))\n        steps += 1\n    return q, steps, tape\n\nassert INC, \"fill in INC\"\ndef value(s):\n    return sum(int(c) << i for i, c in enumerate(s))\nfor w in _chk_strings(\"01\", 8):\n    r = _chk_run_tm(INC, w)\n    assert r[0] == \"accept\", \"INC should accept \" + repr(w)\n    tape = \"\".join(r[2].get(i, \"_\") for i in range(max(r[2], default=-1) + 1)).rstrip(\"_\")\n    assert set(tape) <= {\"0\", \"1\"}, (w, tape)\n    assert value(tape) == value(w) + 1, (w, tape)\n    assert len(tape) == len(w) + (1 if w.count(\"1\") == len(w) else 0), (w, tape)\n"
    }
   ]
  }
 ],
 "tc8": [
  {
   "id": "sat_indset",
   "title": "Reducing 3SAT to independent set",
   "prompt": "<p>A 3-CNF formula is a list of clauses, each a list of three nonzero integers (<code>3</code> means <em>x</em><sub>3</sub>, <code>-3</code> means ¬<em>x</em><sub>3</sub>). Write:</p>\n<ol><li><code>reduce(clauses)</code>, returning <code>(vertices, edges, k)</code> as in Lesson 8: vertices are pairs <code>(clause_index, position)</code>, edges a set of 2-element <code>frozenset</code>s of vertices joining every two vertices in the same clause and every two vertices with opposite literals, and <code>k</code> the number of clauses.</li>\n<li><code>to_indset(clauses, assignment)</code>: given a satisfying assignment (a dict from variable to bool), return an independent set of size <code>k</code>, as a list choosing the <em>first</em> true literal's vertex in each clause, in clause order.</li>\n<li><code>to_assignment(clauses, S)</code>: given an independent set <code>S</code> of size <code>k</code>, return a satisfying assignment as a dict over every variable in the formula, setting each chosen literal true and every other variable to <code>False</code>.</li></ol>",
   "starter": "def reduce(clauses):\n    pass\n\ndef to_indset(clauses, assignment):\n    pass\n\ndef to_assignment(clauses, S):\n    pass\n",
   "hint": "<p>Use <code>itertools.combinations(vertices, 2)</code> to look at every pair once. A literal <code>x</code> is true under <code>assignment</code> when <code>assignment[abs(x)] == (x &gt; 0)</code>. In <code>to_assignment</code>, start with every variable <code>False</code>, then for each chosen vertex make its literal true.</p>",
   "solution": "from itertools import combinations\n\ndef reduce(clauses):\n    vertices = [(c, j) for c, cl in enumerate(clauses) for j in range(len(cl))]\n    lit = {(c, j): clauses[c][j] for (c, j) in vertices}\n    edges = {frozenset((u, v)) for u, v in combinations(vertices, 2)\n             if u[0] == v[0] or lit[u] == -lit[v]}\n    return vertices, edges, len(clauses)\n\ndef to_indset(clauses, assignment):\n    S = []\n    for c, cl in enumerate(clauses):\n        for j, x in enumerate(cl):\n            if assignment[abs(x)] == (x > 0):\n                S.append((c, j))\n                break\n    return S\n\ndef to_assignment(clauses, S):\n    a = {abs(x): False for cl in clauses for x in cl}\n    for c, j in S:\n        x = clauses[c][j]\n        a[abs(x)] = x > 0\n    return a\n",
   "tests": [
    {
     "label": "The notes' formula",
     "type": "assert",
     "code": "F = [[1, 2, 3], [-1, -2, 3], [-3, 1, 2]]\nV, E, k = reduce(F)\nassert len(V) == 9 and len(E) == 15 and k == 3, (len(V), len(E), k)\nassert frozenset({(0, 0), (1, 0)}) in E      # x1 and not-x1\nassert frozenset({(0, 0), (2, 1)}) not in E  # x1 and x1\nassert all(isinstance(e, frozenset) and len(e) == 2 for e in E)\n"
    },
    {
     "label": "Practice problem 4",
     "type": "assert",
     "code": "F = [[1, 2, -3], [-1, -2, 3]]\nV, E, k = reduce(F)\nassert (len(V), len(E), k) == (6, 9, 2)\nassert to_indset(F, {1: True, 2: False, 3: False}) == [(0, 0), (1, 1)]\n"
    },
    {
     "label": "Both directions on random formulas",
     "type": "assert",
     "code": "import random\nfrom itertools import product, combinations\nrng = random.Random(11)\ndef sat(F, a):\n    return all(any(a[abs(x)] == (x > 0) for x in cl) for cl in F)\nfor trial in range(150):\n    n = 4\n    F = [[rng.choice([1, -1]) * rng.randint(1, n) for _ in range(3)] for _ in range(rng.randint(1, 5))]\n    V, E, k = reduce(F)\n    vars_ = sorted({abs(x) for cl in F for x in cl})\n    sat_as = [dict(zip(vars_, bits)) for bits in product([False, True], repeat=len(vars_)) if sat(F, dict(zip(vars_, bits)))]\n    indsets = [S for S in combinations(V, k) if all(frozenset((u, v)) not in E for u, v in combinations(S, 2))]\n    assert bool(sat_as) == bool(indsets), F\n    for a in sat_as[:3]:\n        S = to_indset(F, a)\n        assert len(S) == k and all(frozenset((u, v)) not in E for u, v in combinations(S, 2)), (F, a, S)\n    for S in indsets[:3]:\n        assert sat(F, to_assignment(F, list(S))), (F, S)\n"
    }
   ]
  },
  {
   "id": "busy_beaver",
   "title": "Bounded halting and the busy beaver",
   "prompt": "<p>Whether a machine halts is undecidable, but whether it halts <em>within <code>t</code> steps</em> is easy: run it. Machines here have states <code>\"A\"</code>, <code>\"B\"</code>, … and a halting state <code>\"H\"</code>, tape symbols 0 and 1 on a tape unlimited in <em>both</em> directions (all 0s at the start), and start in state A. A machine is a dict from <code>(state, symbol)</code> to <code>(write, move, next)</code> with <code>move</code> −1 or +1, defined for every non-halting state and symbol.</p>\n<ol><li>Write <code>run_bounded(machine, limit)</code>, returning <code>(steps, ones)</code> if the machine reaches H within <code>limit</code> steps (the transition into H counts as a step; <code>ones</code> is the number of 1s left on the tape), or <code>None</code> otherwise.</li>\n<li>Write <code>all_machines(n)</code>, generating every machine with <em>n</em> states: each of the 2<em>n</em> entries is one of 2 · 2 · (<em>n</em> + 1) choices.</li>\n<li>Write <code>busy_beaver(n, limit)</code>, returning <code>(max_steps, max_ones)</code> over the <em>n</em>-state machines that halt within <code>limit</code> steps.</li></ol>\n<p>For <em>n</em> = 2 the true values (the maximum over all halting machines, proved by hand) are 6 steps and 4 ones; a limit of 20 is enough to find them. No algorithm can compute them for every <em>n</em>: if one could, it would decide HALT<sub>ε</sub>, halting on a blank tape, which the notes show is undecidable. These machines differ from Lesson 7's (a two-way tape, only the symbols 0 and 1 with 0 as the blank, and one halting state instead of accept and reject), but as Lesson 7's variants show, such differences don't change what can be computed. Given any Lesson 7 machine <em>M</em>, a program can build a machine <em>M</em>′ of this kind that halts from an all-0 tape exactly when <em>M</em> halts from a blank tape: code each of <em>M</em>'s tape symbols as a fixed-length block of 0s and 1s, with the blank as all 0s; write one more code, a marker, in cell 0 first so that <em>M</em>′ can treat it as the left end; and send both accept and reject to H. If <em>M</em>′ has <em>n</em> states, run it for the maximum step count of <em>n</em>-state machines; if it hasn't halted by then, it never will, so neither will <em>M</em>.</p>",
   "starter": "def run_bounded(machine, limit):\n    pass\n\ndef all_machines(n):\n    pass\n\ndef busy_beaver(n, limit):\n    pass\n",
   "hint": "<p>Use a dict for the tape (missing cells are 0) and allow negative cell numbers. For <code>all_machines</code>, list the keys, build the list of possible entries, and loop over <code>itertools.product(entries, repeat=len(keys))</code>, yielding <code>dict(zip(keys, choice))</code>.</p>",
   "solution": "from itertools import product\n\ndef run_bounded(machine, limit):\n    tape, pos, q, steps = {}, 0, \"A\", 0\n    while q != \"H\":\n        if steps == limit:\n            return None\n        write, move, q = machine[(q, tape.get(pos, 0))]\n        tape[pos] = write\n        pos += move\n        steps += 1\n    return steps, sum(tape.values())\n\ndef all_machines(n):\n    names = list(\"ABCDEFG\"[:n])           # at most 7 states, so \"H\" stays free\n    keys = [(s, b) for s in names for b in (0, 1)]\n    entries = [(w, m, nxt) for w in (0, 1) for m in (-1, 1) for nxt in names + [\"H\"]]\n    for choice in product(entries, repeat=len(keys)):\n        yield dict(zip(keys, choice))\n\ndef busy_beaver(n, limit):\n    best_steps = best_ones = 0\n    for m in all_machines(n):\n        r = run_bounded(m, limit)\n        if r:\n            best_steps = max(best_steps, r[0])\n            best_ones = max(best_ones, r[1])\n    return best_steps, best_ones\n",
   "tests": [
    {
     "label": "A 2-state champion",
     "call": "run_bounded({('A', 0): (1, 1, 'B'), ('A', 1): (1, -1, 'B'), ('B', 0): (1, -1, 'A'), ('B', 1): (1, 1, 'H')}, 100)",
     "expect": "(6, 4)"
    },
    {
     "label": "A machine that never halts",
     "call": "run_bounded({('A', 0): (1, 1, 'A'), ('A', 1): (1, 1, 'A')}, 1000)",
     "expect": "None"
    },
    {
     "label": "Counting machines",
     "type": "assert",
     "code": "ms = list(all_machines(1))\nassert len(ms) == 8 ** 2, len(ms)\nassert all(set(m) == {(\"A\", 0), (\"A\", 1)} for m in ms)\nassert sum(1 for _ in all_machines(2)) == 12 ** 4\n"
    },
    {
     "label": "BB(1) and BB(2)",
     "type": "assert",
     "limit": 15,
     "code": "assert busy_beaver(1, 10) == (1, 1), busy_beaver(1, 10)\nassert busy_beaver(2, 20) == (6, 4), busy_beaver(2, 20)\n"
    }
   ]
  }
 ]
});
