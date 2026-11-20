/* Auto-graded programming problems for CS 370, by lesson. Generated from a Python spec, so every
   string is JSON. Everything uses the Python standard library only (no NumPy): data sets are small
   lists written inline, training loops are short, and every result is deterministic (fixed starting
   weights, no unseeded randomness), so floats are compared with small tolerances. */
CSA.addCode("cs370", {
 "ml1": [
  {
   "id": "astar",
   "title": "A* search",
   "prompt": "<p>Write <code>astar(neighbors, h, start, goal)</code>, A* graph search as in the notes.</p>\n<ul>\n<li><code>neighbors(node)</code> is a function returning a list of <code>(next_node, cost)</code> pairs, with costs ≥ 0. Nodes are any hashable values (strings, tuples).</li>\n<li><code>h(node)</code> is a consistent heuristic: an estimate of the cost from <code>node</code> to <code>goal</code>.</li>\n<li>Return <code>(cost, path)</code>: the cost of a cheapest path and the list of nodes on it, from <code>start</code> to <code>goal</code> inclusive. If the goal can't be reached, return <code>(math.inf, [])</code>.</li>\n</ul>\n<p>Use a priority queue (<code>heapq</code>) ordered by <em>f</em> = <em>g</em> + <em>h</em>. Test for the goal when a node is <em>popped</em>, not when it is pushed, and call <code>neighbors</code> only on nodes you expand: one test counts the calls to check that your search really is guided by <code>h</code>.</p>",
   "starter": "import heapq\nimport math\n\ndef astar(neighbors, h, start, goal):\n    pass\n",
   "hint": "<p>Push tuples <code>(f, tie, g, node)</code>, where <code>tie</code> is a counter that increases with every push, so that the heap never has to compare two nodes. Keep a dict of the best <em>g</em> found for each node and one of parents; when you pop an entry whose <em>g</em> is worse than the best known, skip it.</p>",
   "solution": "import heapq\nimport math\nfrom itertools import count\n\ndef astar(neighbors, h, start, goal):\n    tie = count()\n    frontier = [(h(start), next(tie), 0, start)]\n    best = {start: 0}\n    parent = {start: None}\n    while frontier:\n        f, _, g, node = heapq.heappop(frontier)\n        if g > best[node]:\n            continue\n        if node == goal:\n            path = []\n            while node is not None:\n                path.append(node)\n                node = parent[node]\n            return g, path[::-1]\n        for nxt, cost in neighbors(node):\n            g2 = g + cost\n            if nxt not in best or g2 < best[nxt]:\n                best[nxt] = g2\n                parent[nxt] = node\n                heapq.heappush(frontier, (g2 + h(nxt), next(tie), g2, nxt))\n    return math.inf, []\n",
   "tests": [
    {
     "label": "The notes' graph",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\ngraph = {\"S\": [(\"A\", 2), (\"B\", 3)], \"A\": [(\"C\", 4)], \"B\": [(\"C\", 2), (\"D\", 5)], \"C\": [(\"G\", 3)], \"D\": [(\"G\", 2)]}\nhv = {\"S\": 6, \"A\": 7, \"B\": 4, \"C\": 3, \"D\": 2, \"G\": 0}\ngot = astar(lambda n: graph.get(n, []), hv.get, \"S\", \"G\")\nassert got == (8, [\"S\", \"B\", \"C\", \"G\"]), f\"expected (8, ['S', 'B', 'C', 'G']), got {got}\"\n"
    },
    {
     "label": "Start is the goal",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\ngot = astar(lambda n: [(\"B\", 1)], lambda n: 0, \"A\", \"A\")\nassert got == (0, [\"A\"]), f\"got {got}\"\n"
    },
    {
     "label": "Unreachable goal",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nimport math\ngraph = {\"A\": [(\"B\", 1)], \"B\": [(\"A\", 1)], \"C\": []}\ngot = astar(lambda n: graph.get(n, []), lambda n: 0, \"A\", \"C\")\nassert got[0] == math.inf and got[1] == [], f\"got {got}\"\n"
    },
    {
     "label": "A cheap path found late",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\ngraph = {\"S\": [(\"G\", 10), (\"A\", 1)], \"A\": [(\"B\", 1)], \"B\": [(\"C\", 1)], \"C\": [(\"G\", 1)]}\ngot = astar(lambda n: graph.get(n, []), lambda n: 0, \"S\", \"G\")\nassert got == (4, [\"S\", \"A\", \"B\", \"C\", \"G\"]), f\"got {got}: did you stop when the goal was pushed rather than popped?\"\n"
    },
    {
     "label": "The heuristic guides the search on a 100 × 100 grid",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\ncalls = [0]\ndef nb(p):\n    calls[0] += 1\n    r, c = p\n    return [((r + dr, c + dc), 1) for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)) if 0 <= r + dr < 100 and 0 <= c + dc < 100]\ngoal = (50, 70)\ncost, path = astar(nb, lambda p: abs(p[0] - goal[0]) + abs(p[1] - goal[1]), (50, 10), goal)\nassert cost == 60 and len(path) == 61 and path[0] == (50, 10) and path[-1] == goal, f\"cost {cost}\"\nassert calls[0] <= 400, f\"neighbors was called {calls[0]} times; uniform-cost search would make thousands of calls, and A* with this heuristic needs about 60\"\n",
     "limit": 5
    },
    {
     "label": "Random graphs agree with Dijkstra",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nimport random, heapq, math\nrng = random.Random(7)\nfor trial in range(30):\n    n = 40\n    g = {i: [(rng.randrange(n), rng.randint(1, 9)) for _ in range(3)] for i in range(n)}\n    rev = {i: [] for i in range(n)}\n    for u in g:\n        for v, w in g[u]:\n            rev[v].append((u, w))\n    goal = rng.randrange(n)\n    dist = {goal: 0}\n    pq = [(0, goal)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]:\n            continue\n        for v, w in rev[u]:\n            if v not in dist or d + w < dist[v]:\n                dist[v] = d + w\n                heapq.heappush(pq, (d + w, v))\n    h = lambda u: dist.get(u, 0) // 2\n    start = rng.randrange(n)\n    cost, path = astar(lambda u: g[u], h, start, goal)\n    want = dist.get(start, math.inf)\n    assert cost == want, f\"trial {trial}: cost {cost}, expected {want}\"\n    if path:\n        assert path[0] == start and path[-1] == goal\n        total = 0\n        for a, b in zip(path, path[1:]):\n            total += min(w for v, w in g[a] if v == b)\n        assert total == cost, f\"the path you returned costs {total}, not {cost}\"\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "eight_puzzle",
   "title": "Solving the 8-puzzle",
   "prompt": "<p>A state of the 8-puzzle is a tuple of 9 numbers listing the board row by row, with 0 for the blank; the goal is <code>(1, 2, 3, 4, 5, 6, 7, 8, 0)</code>. A move slides a tile next to the blank (up, down, left or right) into it, and costs 1.</p>\n<ul>\n<li><code>manhattan(state)</code>: the sum, over tiles 1 to 8 (not the blank), of each tile's horizontal plus vertical distance from its goal square.</li>\n<li><code>solvable(state)</code>: <code>True</code> if the goal can be reached. Write the tiles in order, leaving out the 0, and count the <em>inversions</em>, pairs where a larger number comes before a smaller one. On a 3 × 3 board a move never changes whether this count is even or odd, and the goal has 0 inversions, so a state is solvable exactly when its count is even. (Sliding left or right doesn't change the order at all; sliding up or down moves one tile past the two others between, changing the count by −2, 0 or +2.)</li>\n<li><code>solve(state)</code>: the minimum number of moves to reach the goal, or <code>None</code> if the state isn't solvable. Use A* with the Manhattan heuristic. Check solvability first: an unsolvable state would otherwise make the search visit all 181,440 states it can reach before giving up.</li>\n</ul>",
   "starter": "GOAL = (1, 2, 3, 4, 5, 6, 7, 8, 0)\n\ndef manhattan(state):\n    pass\n\ndef solvable(state):\n    pass\n\ndef solve(state):\n    pass\n",
   "hint": "<p>Tile <em>t</em> belongs at index <em>t</em> − 1, that is row (<em>t</em> − 1) // 3 and column (<em>t</em> − 1) % 3. To generate moves, find the blank's index <em>i</em>, its row and column with <code>divmod(i, 3)</code>, and swap it with each neighbour that is on the board.</p>",
   "solution": "import heapq\n\nGOAL = (1, 2, 3, 4, 5, 6, 7, 8, 0)\n\ndef manhattan(state):\n    total = 0\n    for i, t in enumerate(state):\n        if t:\n            total += abs(i // 3 - (t - 1) // 3) + abs(i % 3 - (t - 1) % 3)\n    return total\n\ndef solvable(state):\n    tiles = [t for t in state if t]\n    inv = sum(1 for i in range(len(tiles)) for j in range(i + 1, len(tiles)) if tiles[i] > tiles[j])\n    return inv % 2 == 0\n\ndef _moves(s):\n    i = s.index(0)\n    r, c = divmod(i, 3)\n    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n        if 0 <= r + dr < 3 and 0 <= c + dc < 3:\n            j = (r + dr) * 3 + c + dc\n            t = list(s)\n            t[i], t[j] = t[j], t[i]\n            yield tuple(t)\n\ndef solve(state):\n    state = tuple(state)\n    if not solvable(state):\n        return None\n    frontier = [(manhattan(state), 0, state)]\n    best = {state: 0}\n    while frontier:\n        f, g, s = heapq.heappop(frontier)\n        if g > best[s]:\n            continue\n        if s == GOAL:\n            return g\n        for t in _moves(s):\n            if t not in best or g + 1 < best[t]:\n                best[t] = g + 1\n                heapq.heappush(frontier, (g + 1 + manhattan(t), g + 1, t))\n",
   "tests": [
    {
     "label": "Manhattan distance of the goal",
     "call": "manhattan((1, 2, 3, 4, 5, 6, 7, 8, 0))",
     "expect": "0"
    },
    {
     "label": "Manhattan distance of the notes' puzzle",
     "call": "manhattan((4, 1, 2, 0, 8, 7, 6, 3, 5))",
     "expect": "15"
    },
    {
     "label": "Manhattan distance ignores the blank",
     "call": "manhattan((0, 1, 2, 3, 4, 5, 6, 7, 8))",
     "expect": "12"
    },
    {
     "label": "Solvability",
     "type": "assert",
     "code": "assert solvable((1, 2, 3, 4, 5, 6, 7, 8, 0)) is True\nassert solvable((1, 2, 3, 4, 5, 6, 8, 7, 0)) is False, \"swapping two tiles makes one inversion: unsolvable\"\nassert solvable((4, 1, 2, 0, 8, 7, 6, 3, 5)) is True\n"
    },
    {
     "label": "Already solved",
     "call": "solve((1, 2, 3, 4, 5, 6, 7, 8, 0))",
     "expect": "0"
    },
    {
     "label": "Eight moves",
     "call": "solve((5, 1, 3, 2, 0, 6, 4, 7, 8))",
     "expect": "8"
    },
    {
     "label": "The notes' 17-move puzzle",
     "call": "solve((4, 1, 2, 0, 8, 7, 6, 3, 5))",
     "expect": "17"
    },
    {
     "label": "Unsolvable gives None quickly",
     "call": "solve((2, 1, 3, 4, 5, 6, 7, 8, 0))",
     "expect": "None",
     "limit": 3
    },
    {
     "label": "Harder puzzles",
     "type": "assert",
     "hidden": true,
     "limit": 8,
     "code": "assert solve((1, 5, 4, 8, 0, 7, 3, 6, 2)) == 22\nassert solve((0, 6, 8, 7, 4, 5, 3, 1, 2)) == 24\n"
    }
   ]
  }
 ],
 "ml2": [
  {
   "id": "tictactoe",
   "title": "A perfect tic-tac-toe player",
   "prompt": "<p>A tic-tac-toe board is a string of 9 characters, <code>\"X\"</code>, <code>\"O\"</code> or <code>\".\"</code>, listing the squares row by row (index 0 is the top left, 8 the bottom right). X is MAX: a finished game is worth +1 if X has three in a row, −1 if O has, and 0 if the board is full with no line. Search the game directly on boards (don't build a tree of lists first).</p>\n<ul>\n<li><code>winner(board)</code>: <code>\"X\"</code> or <code>\"O\"</code> if that player has three in a row, else <code>None</code>.</li>\n<li><code>value(board, player)</code>: return <code>(v, nodes)</code>, where <code>v</code> is the minimax value of the position with <code>player</code> to move, computed by alpha-beta search, and <code>nodes</code> is the number of positions the search visited, counting this one. A position where someone has won, or the board is full, is terminal. Try the empty squares in increasing index order, and stop examining a position's children as soon as α ≥ β, starting from α = −∞ and β = +∞, as in the notes, so that your count matches.</li>\n<li><code>best_move(board, player)</code>: the index of a best move for <code>player</code> (largest value for X, smallest for O); if several moves are equally good, the lowest index.</li>\n</ul>\n<p>From the empty board the search must visit 18,297 positions; full minimax would visit 549,946.</p>",
   "starter": "import math\n\nLINES = [(0, 1, 2), (3, 4, 5), (6, 7, 8), (0, 3, 6), (1, 4, 7), (2, 5, 8), (0, 4, 8), (2, 4, 6)]\n\ndef winner(board):\n    pass\n\ndef value(board, player):\n    pass\n\ndef best_move(board, player):\n    pass\n",
   "hint": "<p>Write a recursive helper <code>ab(board, player, alpha, beta)</code> that returns the value and adds 1 to a counter each time it is called. For <code>best_move</code>, compute each legal move's value exactly (call <code>value</code> on the board after the move) and keep the first best one; positions have at most 9 moves, so this is fast.</p>",
   "solution": "import math\n\nLINES = [(0, 1, 2), (3, 4, 5), (6, 7, 8), (0, 3, 6), (1, 4, 7), (2, 5, 8), (0, 4, 8), (2, 4, 6)]\n\ndef winner(board):\n    for i, j, k in LINES:\n        if board[i] != \".\" and board[i] == board[j] == board[k]:\n            return board[i]\n    return None\n\ndef value(board, player):\n    nodes = 0\n    def ab(b, p, alpha, beta):\n        nonlocal nodes\n        nodes += 1\n        w = winner(b)\n        if w:\n            return 1 if w == \"X\" else -1\n        if \".\" not in b:\n            return 0\n        q = \"O\" if p == \"X\" else \"X\"\n        if p == \"X\":\n            v = -math.inf\n            for i in range(9):\n                if b[i] == \".\":\n                    v = max(v, ab(b[:i] + p + b[i + 1:], q, alpha, beta))\n                    alpha = max(alpha, v)\n                    if alpha >= beta:\n                        break\n            return v\n        v = math.inf\n        for i in range(9):\n            if b[i] == \".\":\n                v = min(v, ab(b[:i] + p + b[i + 1:], q, alpha, beta))\n                beta = min(beta, v)\n                if alpha >= beta:\n                    break\n        return v\n    v = ab(board, player, -math.inf, math.inf)\n    return v, nodes\n\ndef best_move(board, player):\n    q = \"O\" if player == \"X\" else \"X\"\n    best, best_v = None, None\n    for i in range(9):\n        if board[i] == \".\":\n            v, _ = value(board[:i] + player + board[i + 1:], q)\n            if best is None or (v > best_v if player == \"X\" else v < best_v):\n                best, best_v = i, v\n    return best\n",
   "tests": [
    {
     "label": "Finding the winner",
     "type": "assert",
     "code": "assert winner(\"XXX.OO...\") == \"X\" and winner(\"X.OXO.O..\") == \"O\" and winner(\"XOXOXOOXO\") is None and winner(\".........\") is None\n"
    },
    {
     "label": "Finished positions",
     "type": "assert",
     "code": "assert value(\"XXXOO....\", \"O\") == (1, 1), value(\"XXXOO....\", \"O\")\nassert value(\"XOXXOOOXX\", \"X\") == (0, 1), value(\"XOXXOOOXX\", \"X\")\n"
    },
    {
     "label": "One move left",
     "call": "value('XOXXOOOX.', 'X')",
     "expect": "(0, 2)"
    },
    {
     "label": "The empty board: a draw, 18,297 positions",
     "call": "value('.........', 'X')",
     "expect": "(0, 18297)",
     "limit": 6
    },
    {
     "label": "Take a win, and block a threat",
     "type": "assert",
     "code": "assert best_move(\"XX.OO....\", \"X\") == 2, \"X wins at once at square 2\"\nassert best_move(\"XX..O....\", \"O\") == 2, \"O must block at square 2\"\nassert best_move(\"X.O.X....\", \"O\") == 8, \"O must block the diagonal at square 8\"\n"
    },
    {
     "label": "Positions with forced outcomes",
     "type": "assert",
     "hidden": true,
     "limit": 6,
     "code": "assert value(\"X...O...X\", \"O\")[0] == 0\nassert value(\"X.......O\", \"X\")[0] == 1, \"X can force a win here\"\nassert best_move(\"X.......O\", \"X\") == 2\nassert value(\"XO.......\", \"X\") == (1, 749), value(\"XO.......\", \"X\")\nassert best_move(\".........\", \"X\") == 0\n"
    }
   ]
  },
  {
   "id": "sudoku",
   "title": "Sudoku as a constraint satisfaction problem",
   "prompt": "<p>A Sudoku puzzle is a string of 81 characters listing the grid row by row, with a digit for each given square and <code>\".\"</code> for each empty one. Write <code>solve_sudoku(puzzle)</code>, which returns the completed grid as an 81-character string of digits, or <code>None</code> if there is no solution (including when two givens already clash).</p>\n<p>Treat it as a CSP, as in the notes: one variable per square, domain the digits 1–9 (a single digit for a given square), and a \"≠\" constraint between every two squares in the same row, column or 3 × 3 box (each square has 20 such <em>peers</em>). Use backtracking with the minimum-remaining-values heuristic and forward checking. Plain backtracking that tries squares in order is far too slow for the third test.</p>",
   "starter": "def solve_sudoku(puzzle):\n    pass\n",
   "hint": "<p>Precompute each square's peers once: square <em>i</em> is in row <em>i</em> // 9, column <em>i</em> % 9 and the box whose top-left square is in row 3 × (row // 3) and column 3 × (column // 3). Start from domains of all nine digits, and apply forward checking for every given square before searching; an empty domain then, or two equal givens that are peers, means there is no solution. In the search, copy the domains dict at each level and give the changed squares new sets, rather than changing sets in place.</p>",
   "solution": "def _peers():\n    peers = {}\n    for i in range(81):\n        r, c = divmod(i, 9)\n        br, bc = 3 * (r // 3), 3 * (c // 3)\n        ps = {r * 9 + k for k in range(9)} | {k * 9 + c for k in range(9)}\n        ps |= {(br + dr) * 9 + bc + dc for dr in range(3) for dc in range(3)}\n        ps.discard(i)\n        peers[i] = sorted(ps)\n    return peers\n\nPEERS = _peers()\n\ndef solve_sudoku(puzzle):\n    for i, ch in enumerate(puzzle):\n        if ch != \".\" and any(puzzle[p] == ch for p in PEERS[i]):\n            return None\n    domains = {i: set(\"123456789\") for i in range(81)}\n    for i, ch in enumerate(puzzle):\n        if ch != \".\":\n            domains[i] = {ch}\n            for p in PEERS[i]:\n                if puzzle[p] == \".\":\n                    domains[p] = domains[p] - {ch}\n    if any(not d for d in domains.values()):\n        return None\n    def bt(domains, assigned):\n        if len(assigned) == 81:\n            return \"\".join(next(iter(domains[i])) for i in range(81))\n        var = min((i for i in range(81) if i not in assigned), key=lambda i: len(domains[i]))\n        for v in sorted(domains[var]):\n            new = dict(domains)\n            new[var] = {v}\n            ok = True\n            for p in PEERS[var]:\n                if p not in assigned and v in new[p]:\n                    new[p] = new[p] - {v}\n                    if not new[p]:\n                        ok = False\n                        break\n            if ok:\n                r = bt(new, assigned | {var})\n                if r:\n                    return r\n        return None\n    return bt(domains, set())\n",
   "tests": [
    {
     "label": "A classic puzzle",
     "type": "assert",
     "code": "def _valid(puzzle, sol):\n    assert isinstance(sol, str) and len(sol) == 81, f\"expected an 81-character string, got {sol!r}\"\n    for i, ch in enumerate(puzzle):\n        assert ch == \".\" or sol[i] == ch, f\"square {i} was given as {ch} but your solution has {sol[i]}\"\n    units = [[r * 9 + c for c in range(9)] for r in range(9)] + [[r * 9 + c for r in range(9)] for c in range(9)]\n    units += [[(br + r) * 9 + bc + c for r in range(3) for c in range(3)] for br in (0, 3, 6) for bc in (0, 3, 6)]\n    for u in units:\n        assert sorted(sol[i] for i in u) == list(\"123456789\"), f\"a row, column or box isn't 1-9: {[sol[i] for i in u]}\"\n\npz = \"53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79\"\n_valid(pz, solve_sudoku(pz))\n"
    },
    {
     "label": "Seventeen givens",
     "type": "assert",
     "limit": 5,
     "code": "def _valid(puzzle, sol):\n    assert isinstance(sol, str) and len(sol) == 81, f\"expected an 81-character string, got {sol!r}\"\n    for i, ch in enumerate(puzzle):\n        assert ch == \".\" or sol[i] == ch, f\"square {i} was given as {ch} but your solution has {sol[i]}\"\n    units = [[r * 9 + c for c in range(9)] for r in range(9)] + [[r * 9 + c for r in range(9)] for c in range(9)]\n    units += [[(br + r) * 9 + bc + c for r in range(3) for c in range(3)] for br in (0, 3, 6) for bc in (0, 3, 6)]\n    for u in units:\n        assert sorted(sol[i] for i in u) == list(\"123456789\"), f\"a row, column or box isn't 1-9: {[sol[i] for i in u]}\"\n\npz = \"4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......\"\n_valid(pz, solve_sudoku(pz))\n"
    },
    {
     "label": "A puzzle built to be hard",
     "type": "assert",
     "limit": 8,
     "code": "def _valid(puzzle, sol):\n    assert isinstance(sol, str) and len(sol) == 81, f\"expected an 81-character string, got {sol!r}\"\n    for i, ch in enumerate(puzzle):\n        assert ch == \".\" or sol[i] == ch, f\"square {i} was given as {ch} but your solution has {sol[i]}\"\n    units = [[r * 9 + c for c in range(9)] for r in range(9)] + [[r * 9 + c for r in range(9)] for c in range(9)]\n    units += [[(br + r) * 9 + bc + c for r in range(3) for c in range(3)] for br in (0, 3, 6) for bc in (0, 3, 6)]\n    for u in units:\n        assert sorted(sol[i] for i in u) == list(\"123456789\"), f\"a row, column or box isn't 1-9: {[sol[i] for i in u]}\"\n\npz = \"8..........36......7..9.2...5...7.......457.....1...3...1....68..85...1..9....4..\"\n_valid(pz, solve_sudoku(pz))\n"
    },
    {
     "label": "Clashing givens",
     "call": "solve_sudoku('55' + '.' * 79)",
     "expect": "None"
    },
    {
     "label": "No room for the 9 in the first row",
     "call": "solve_sudoku('12345678.' + '........9' + '.' * 63)",
     "expect": "None",
     "limit": 3
    },
    {
     "label": "A full, correct grid comes back unchanged",
     "type": "assert",
     "hidden": true,
     "code": "g = \"534678912672195348198342567859761423426853791713924856961537284287419635345286179\"\nassert solve_sudoku(g) == g\n"
    }
   ]
  }
 ],
 "ml3": [
  {
   "id": "multinomial_nb",
   "title": "Naive Bayes with word counts",
   "prompt": "<p>Write a multinomial naive Bayes text classifier, as in the notes.</p>\n<ul>\n<li><code>train(docs)</code>: <code>docs</code> is a list of <code>(label, text)</code> pairs; split each text into words with <code>text.split()</code>. Return a model (any structure you like) holding, for each class <em>c</em>, log P(<em>c</em>) = log(fraction of documents in <em>c</em>) and, for each word <em>w</em> of the vocabulary <em>V</em> (all words seen in training), log P(<em>w</em> | <em>c</em>) = log((count of <em>w</em> in <em>c</em>'s documents + 1) / (total words in <em>c</em>'s documents + |<em>V</em>|)).</li>\n<li><code>predict(model, text)</code>: return <code>(label, posterior)</code>, where <code>posterior</code> is a dict from each class to its posterior probability given the text, and <code>label</code> is the class with the largest. Each occurrence of a vocabulary word counts once (a word appearing twice adds its log probability twice); ignore words not in the vocabulary. Work with log probabilities, and turn them into posteriors by subtracting the largest before exponentiating: one test uses a text of 3,000 words.</li>\n</ul>",
   "starter": "import math\nfrom collections import Counter\n\ndef train(docs):\n    pass\n\ndef predict(model, text):\n    pass\n",
   "hint": "<p>If the log scores are <em>s<sub>c</sub></em> and <em>m</em> is the largest, the posteriors are e<sup><em>s<sub>c</sub></em> − <em>m</em></sup> divided by their sum. The largest term is then e<sup>0</sup> = 1, so nothing underflows to 0 for the winning class.</p>",
   "solution": "import math\nfrom collections import Counter\n\ndef train(docs):\n    classes = sorted({c for c, _ in docs})\n    vocab = {w for _, t in docs for w in t.split()}\n    prior, like = {}, {}\n    for c in classes:\n        texts = [t for k, t in docs if k == c]\n        prior[c] = math.log(len(texts) / len(docs))\n        counts = Counter(w for t in texts for w in t.split())\n        total = sum(counts.values())\n        like[c] = {w: math.log((counts[w] + 1) / (total + len(vocab))) for w in vocab}\n    return {\"classes\": classes, \"vocab\": vocab, \"prior\": prior, \"like\": like}\n\ndef predict(model, text):\n    words = [w for w in text.split() if w in model[\"vocab\"]]\n    s = {c: model[\"prior\"][c] + sum(model[\"like\"][c][w] for w in words) for c in model[\"classes\"]}\n    m = max(s.values())\n    z = sum(math.exp(v - m) for v in s.values())\n    post = {c: math.exp(v - m) / z for c, v in s.items()}\n    best = max(model[\"classes\"], key=lambda c: s[c])\n    return best, post\n",
   "tests": [
    {
     "label": "The notes' example",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\ndocs = [(\"sport\", \"goal match team win\"), (\"sport\", \"team score goal goal\"), (\"sport\", \"match win cup\"),\n        (\"tech\", \"code bug fix\"), (\"tech\", \"python code team\"), (\"tech\", \"bug report fix code\")]\nm = train(docs)\nlabel, post = predict(m, \"team code bug\")\nassert label == \"tech\", f\"got {label}\"\nassert _close(post[\"tech\"], 0.9019, 1e-3) and _close(post[\"sport\"], 0.0981, 1e-3), f\"got {post}\"\nlabel, post = predict(m, \"goal team python\")\nassert label == \"sport\" and _close(post[\"sport\"], 0.7230, 1e-3), f\"got {label}, {post}\"\n"
    },
    {
     "label": "Unknown words are ignored",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\ndocs = [(\"a\", \"x x y\"), (\"b\", \"y z\")]\nm = train(docs)\nl1, p1 = predict(m, \"x z\")\nl2, p2 = predict(m, \"x z unknown words here\")\nassert l1 == l2 and _close(p1, p2), f\"{p1} vs {p2}\"\nl3, p3 = predict(m, \"nothing known\")\nassert _close(p3, {\"a\": 0.5, \"b\": 0.5}), f\"with no known words the posterior is the prior; got {p3}\"\n"
    },
    {
     "label": "Repeated words count each time",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\ndocs = [(\"a\", \"x y\"), (\"b\", \"y y y x\")]\nm = train(docs)\n_, p1 = predict(m, \"x\")\n_, p2 = predict(m, \"x x x\")\nassert p2[\"a\"] > p1[\"a\"] > 0.5, f\"{p1} {p2}\"\n# P(x|a) = (1 + 1)/(2 + 2) = 1/2 and P(x|b) = (1 + 1)/(4 + 2) = 1/3, with equal priors\nwant = (1/2) ** 3 / ((1/2) ** 3 + (1/3) ** 3)\nassert _close(p2[\"a\"], want), f\"expected {want}, got {p2['a']}\"\n"
    },
    {
     "label": "Three classes",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\ndocs = [(\"en\", \"the cat is on the mat\"), (\"en\", \"the dog is here\"), (\"fr\", \"le chat est sur le tapis\"),\n        (\"fr\", \"le chien est ici\"), (\"es\", \"el gato est en la alfombra\"), (\"es\", \"el perro est aqui\")]\nm = train(docs)\nassert predict(m, \"le chat\")[0] == \"fr\"\nassert predict(m, \"the dog\")[0] == \"en\"\nassert predict(m, \"el gato est\")[0] == \"es\"\n_, p = predict(m, \"est\")\nassert _close(sum(p.values()), 1.0) and p[\"en\"] < p[\"fr\"], f\"got {p}\"\n"
    },
    {
     "label": "A long text doesn't underflow",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\ndocs = [(\"a\", \"x y\"), (\"b\", \"y z\")]\nm = train(docs)\nlabel, post = predict(m, \" \".join([\"x\", \"y\", \"z\"] * 1000))\nassert label in (\"a\", \"b\") and _close(sum(post.values()), 1.0), f\"got {post}\"\nassert _close(post[\"a\"], 0.5), f\"x and z are symmetric here, so the posterior should be 0.5; got {post}\"\nlabel, post = predict(m, \" \".join([\"x\"] * 3000))\nassert label == \"a\" and post[\"a\"] > 0.999999 and post[\"b\"] >= 0\n"
    }
   ]
  },
  {
   "id": "bayes_net",
   "title": "Inference by enumeration",
   "prompt": "<p>A Bayesian network over true/false variables is a dict mapping each variable name to a pair <code>(parents, table)</code>: <code>parents</code> is a tuple of variable names, and <code>table</code> maps each tuple of parent values (in that order) to P(variable = <code>True</code> | those parent values). The dict lists every variable after its parents.</p>\n<ul>\n<li><code>joint(net, world)</code>: the probability of a complete assignment <code>world</code> (a dict giving every variable <code>True</code> or <code>False</code>), the product of one table entry per variable.</li>\n<li><code>query(net, var, evidence)</code>: P(<code>var</code> = <code>True</code> | <code>evidence</code>), where <code>evidence</code> is a dict of observed values, by enumeration: sum the joint over all values of the hidden variables, once with <code>var</code> true and once with it false, and normalize.</li>\n</ul>",
   "starter": "from itertools import product\n\ndef joint(net, world):\n    pass\n\ndef query(net, var, evidence):\n    pass\n",
   "hint": "<p><code>product</code> from the standard <code>itertools</code> module (<code>from itertools import product</code>) gives every combination of values from its arguments: <code>product((True, False), repeat=k)</code> yields every tuple of <em>k</em> truth values, 2<sup><em>k</em></sup> tuples in all, starting with <code>(True, True, ...)</code>. For a variable that is false, use 1 − P(true).</p>",
   "solution": "from itertools import product\n\ndef joint(net, world):\n    p = 1.0\n    for var, (parents, table) in net.items():\n        pt = table[tuple(world[q] for q in parents)]\n        p *= pt if world[var] else 1 - pt\n    return p\n\ndef query(net, var, evidence):\n    hidden = [v for v in net if v != var and v not in evidence]\n    tot = {}\n    for val in (True, False):\n        s = 0.0\n        for vals in product((True, False), repeat=len(hidden)):\n            s += joint(net, {**evidence, var: val, **dict(zip(hidden, vals))})\n        tot[val] = s\n    return tot[True] / (tot[True] + tot[False])\n",
   "tests": [
    {
     "label": "Joint probabilities in the alarm network",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nnet = {\"B\": ((), {(): 0.001}), \"E\": ((), {(): 0.002}),\n       \"A\": ((\"B\", \"E\"), {(True, True): 0.95, (True, False): 0.94, (False, True): 0.29, (False, False): 0.001}),\n       \"J\": ((\"A\",), {(True,): 0.90, (False,): 0.05}), \"M\": ((\"A\",), {(True,): 0.70, (False,): 0.01})}\ngot = joint(net, {\"B\": False, \"E\": False, \"A\": True, \"J\": True, \"M\": True})\nassert _close(got, 0.999 * 0.998 * 0.001 * 0.9 * 0.7), f\"got {got}\"\ngot = joint(net, {\"B\": True, \"E\": False, \"A\": False, \"J\": False, \"M\": False})\nassert _close(got, 0.001 * 0.998 * 0.06 * 0.95 * 0.99), f\"got {got}\"\n"
    },
    {
     "label": "Burglary given both calls",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nnet = {\"B\": ((), {(): 0.001}), \"E\": ((), {(): 0.002}),\n       \"A\": ((\"B\", \"E\"), {(True, True): 0.95, (True, False): 0.94, (False, True): 0.29, (False, False): 0.001}),\n       \"J\": ((\"A\",), {(True,): 0.90, (False,): 0.05}), \"M\": ((\"A\",), {(True,): 0.70, (False,): 0.01})}\ngot = query(net, \"B\", {\"J\": True, \"M\": True})\nassert _close(got, 0.284172, 1e-4), f\"got {got}\"\n"
    },
    {
     "label": "Explaining away",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nnet = {\"B\": ((), {(): 0.001}), \"E\": ((), {(): 0.002}),\n       \"A\": ((\"B\", \"E\"), {(True, True): 0.95, (True, False): 0.94, (False, True): 0.29, (False, False): 0.001}),\n       \"J\": ((\"A\",), {(True,): 0.90, (False,): 0.05}), \"M\": ((\"A\",), {(True,): 0.70, (False,): 0.01})}\na = query(net, \"B\", {\"A\": True})\nb = query(net, \"B\", {\"A\": True, \"E\": True})\nassert _close(a, 0.373551, 1e-4) and _close(b, 0.003268, 1e-3), f\"got {a}, {b}\"\n"
    },
    {
     "label": "No evidence gives the marginal",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nnet = {\"B\": ((), {(): 0.001}), \"E\": ((), {(): 0.002}),\n       \"A\": ((\"B\", \"E\"), {(True, True): 0.95, (True, False): 0.94, (False, True): 0.29, (False, False): 0.001}),\n       \"J\": ((\"A\",), {(True,): 0.90, (False,): 0.05}), \"M\": ((\"A\",), {(True,): 0.70, (False,): 0.01})}\nassert _close(query(net, \"B\", {}), 0.001)\nassert _close(query(net, \"A\", {}), 0.002516442, 1e-5), f\"got {query(net, 'A', {})}\"\n"
    },
    {
     "label": "The sprinkler network",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nnet = {\"C\": ((), {(): 0.5}),\n       \"S\": ((\"C\",), {(True,): 0.1, (False,): 0.5}),\n       \"R\": ((\"C\",), {(True,): 0.8, (False,): 0.2}),\n       \"W\": ((\"S\", \"R\"), {(True, True): 0.99, (True, False): 0.9, (False, True): 0.9, (False, False): 0.0})}\nassert _close(query(net, \"R\", {\"W\": True}), 0.707927, 1e-4), query(net, \"R\", {\"W\": True})\nassert _close(query(net, \"S\", {\"W\": True}), 0.429764, 1e-4), query(net, \"S\", {\"W\": True})\nassert _close(query(net, \"S\", {\"W\": True, \"R\": True}), 0.194499, 1e-4), query(net, \"S\", {\"W\": True, \"R\": True})\n",
     "hidden": true
    }
   ]
  }
 ],
 "ml4": [
  {
   "id": "minibatch_gd",
   "title": "Mini-batch gradient descent with polynomial features",
   "prompt": "<p>Each example is a list of <em>d</em> feature values with a target. The model is ŷ = <strong>w</strong> · <strong>x</strong> + <em>b</em>, and the loss on a set of examples is their mean squared error.</p>\n<ul>\n<li><code>gradient(w, b, X, y)</code>: return <code>(gw, gb)</code>, the partial derivatives of the mean squared error on the examples <code>X</code>, <code>y</code>: ∂<em>L</em>/∂<em>w<sub>j</sub></em> = (2/<em>n</em>) Σ (ŷ<sub><em>i</em></sub> − <em>y<sub>i</sub></em>) <em>x<sub>ij</sub></em> (a list) and ∂<em>L</em>/∂<em>b</em> = (2/<em>n</em>) Σ (ŷ<sub><em>i</em></sub> − <em>y<sub>i</sub></em>) (a number).</li>\n<li><code>fit_minibatch(X, y, rate, epochs, batch_size)</code>: start from all weights 0.0 and <em>b</em> = 0.0. Each epoch goes through the examples <em>in order</em>, in consecutive batches of <code>batch_size</code> (the last batch may be smaller), and after each batch takes one step <strong>w</strong> ← <strong>w</strong> − rate × <code>gw</code>, <em>b</em> ← <em>b</em> − rate × <code>gb</code>, with the gradient computed on that batch only. Return <code>(w, b)</code>. With <code>batch_size</code> equal to the number of examples this is the notes' full-batch gradient descent; with 1 it is stochastic gradient descent (without the shuffling real implementations add).</li>\n<li><code>poly_features(xs, degree)</code>: for a list of numbers, return the list of feature lists [<em>x</em>, <em>x</em><sup>2</sup>, …, <em>x</em><sup>degree</sup>], so that a linear model can fit a polynomial.</li>\n</ul>",
   "starter": "def gradient(w, b, X, y):\n    pass\n\ndef fit_minibatch(X, y, rate, epochs, batch_size):\n    pass\n\ndef poly_features(xs, degree):\n    pass\n",
   "hint": "<p>The batches of an epoch start at indexes 0, <code>batch_size</code>, 2 × <code>batch_size</code>, …: <code>for start in range(0, len(X), batch_size)</code>, then slice <code>X[start:start + batch_size]</code>.</p>",
   "solution": "def gradient(w, b, X, y):\n    n = len(X)\n    gw, gb = [0.0] * len(w), 0.0\n    for x, t in zip(X, y):\n        e = sum(a * c for a, c in zip(w, x)) + b - t\n        for j in range(len(w)):\n            gw[j] += 2 * e * x[j] / n\n        gb += 2 * e / n\n    return gw, gb\n\ndef fit_minibatch(X, y, rate, epochs, batch_size):\n    w, b = [0.0] * len(X[0]), 0.0\n    for _ in range(epochs):\n        for start in range(0, len(X), batch_size):\n            gw, gb = gradient(w, b, X[start:start + batch_size], y[start:start + batch_size])\n            w = [wj - rate * g for wj, g in zip(w, gw)]\n            b -= rate * gb\n    return w, b\n\ndef poly_features(xs, degree):\n    return [[x ** k for k in range(1, degree + 1)] for x in xs]\n",
   "tests": [
    {
     "label": "The gradient at zero",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\ngw, gb = gradient([0.0], 0.0, [[0], [1], [2], [3]], [1, 3, 4, 6])\nassert _close(gw, [-14.5]) and _close(gb, -7.0), f\"got {gw}, {gb}\"\n"
    },
    {
     "label": "The gradient with two features",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nX = [[50, 1], [60, 2], [70, 2], [80, 3], [100, 3], [120, 4]]\ny = [135, 150, 175, 205, 240, 290]\ngw, gb = gradient([2.0, 3.0], 20.0, X, y)\nassert _close(gw, [-2003.3333333333335, -63.666666666666664]) and _close(gb, -23.333333333333332), f\"got {gw}, {gb}\"\n"
    },
    {
     "label": "Full batches: MATH 131's line",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nw, b = fit_minibatch([[0], [1], [2], [3]], [1, 3, 4, 6], 0.05, 2000, 4)\nassert _close(w, [1.6], 1e-4) and _close(b, 1.1, 1e-4), f\"got {w}, {b}; the least-squares line is y = 1.6x + 1.1\"\n"
    },
    {
     "label": "Exactly the requested steps",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nw, b = fit_minibatch([[0], [1], [2], [3]], [1, 3, 4, 6], 0.1, 1, 4)\nassert _close(w, [1.45]) and _close(b, 0.7), f\"one full-batch step from 0 with rate 0.1 gives [1.45], 0.7; got {w}, {b}\"\nw, b = fit_minibatch([[0], [1], [2], [3]], [1, 3, 4, 6], 0.1, 1, 2)\nassert _close(w, [2.31]) and _close(b, 1.17), f\"two batches of two: got {w}, {b}\"\n"
    },
    {
     "label": "Batches of one, and a short last batch",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nw, b = fit_minibatch([[0], [1], [2], [3]], [1, 3, 4, 6], 0.02, 300, 1)\nassert _close(w, [1.61174], 1e-4) and _close(b, 1.08785, 1e-4), f\"got {w}, {b}\"\nw, b = fit_minibatch([[0], [1], [2], [3], [4]], [1, 3, 4, 6, 9], 0.05, 1, 2)\nassert _close(w, [2.5615]) and _close(b, 0.95725), f\"batches of 2, 2 and 1: got {w}, {b}\"\n"
    },
    {
     "label": "Polynomial features fit a parabola",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nassert poly_features([2, -1], 3) == [[2, 4, 8], [-1, 1, -1]]\nxs = [-1.0, -0.5, 0.0, 0.5, 1.0]\nys = [3 * x * x - x + 2 for x in xs]\nw, b = fit_minibatch(poly_features(xs, 2), ys, 0.3, 3000, 5)\nassert _close(w, [-1.0, 3.0], 1e-4) and _close(b, 2.0, 1e-4), f\"got {w}, {b}\"\n"
    },
    {
     "label": "Standardized house data",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nX = [[-1.2603, -1.5667], [-0.8402, -0.5222], [-0.4201, -0.5222], [0.0, 0.5222], [0.8402, 0.5222], [1.6803, 1.5667]]\ny = [135, 150, 175, 205, 240, 290]\nw, b = fit_minibatch(X, y, 0.1, 1000, 6)\nassert _close(b, 199.1667, 1e-4), f\"b = {b}\"\nassert _close(w, [49.92, 3.46], 1e-2), f\"w = {w}\"\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "normal_equation",
   "title": "Scaling features and the normal equations",
   "prompt": "<p>Write two functions for linear regression with <em>d</em> features. <code>X</code> is a list of <em>n</em> examples, each a list of <em>d</em> numbers.</p>\n<ul>\n<li><code>standardize(X)</code>: return <code>(Xs, means, stds)</code>, where <code>means[j]</code> and <code>stds[j]</code> are the mean and the population standard deviation (divide by <em>n</em>) of column <em>j</em>, and <code>Xs</code> has each value replaced by (value − mean)/std. If a column's standard deviation is 0, leave its standardized values at 0.0 and report its std as 1.0.</li>\n<li><code>fit_normal(X, y)</code>: return <code>(w, b)</code> minimizing the squared error, by building the matrix <em>A</em> whose rows are [1, <em>x</em><sub>1</sub>, …, <em>x<sub>d</sub></em>] and solving the normal equations <em>A</em><sup>T</sup><em>A</em> <strong>z</strong> = <em>A</em><sup>T</sup><strong>y</strong> by Gaussian elimination with partial pivoting; <strong>z</strong> = (<em>b</em>, <em>w</em><sub>1</sub>, …, <em>w<sub>d</sub></em>). If a pivot's absolute value is below 1e-9 after pivoting (the columns of <em>A</em> are dependent, so there is no unique answer), raise <code>ValueError</code>.</li>\n</ul>",
   "starter": "def standardize(X):\n    pass\n\ndef fit_normal(X, y):\n    pass\n",
   "hint": "<p>Entry (<em>i</em>, <em>j</em>) of <em>A</em><sup>T</sup><em>A</em> is the sum over rows <em>r</em> of <em>A</em> of <em>r<sub>i</sub> r<sub>j</sub></em>, and entry <em>i</em> of <em>A</em><sup>T</sup><strong>y</strong> is the sum of <em>r<sub>i</sub> y</em>. For partial pivoting, before eliminating column <em>k</em>, swap in the row (from <em>k</em> down) whose entry in column <em>k</em> is largest in absolute value.</p>",
   "solution": "def standardize(X):\n    n, d = len(X), len(X[0])\n    means = [sum(r[j] for r in X) / n for j in range(d)]\n    stds = []\n    for j in range(d):\n        s = (sum((r[j] - means[j]) ** 2 for r in X) / n) ** 0.5\n        stds.append(s if s > 0 else 1.0)\n    Xs = [[(r[j] - means[j]) / stds[j] for j in range(d)] for r in X]\n    return Xs, means, stds\n\ndef fit_normal(X, y):\n    A = [[1.0] + [float(v) for v in r] for r in X]\n    m = len(A[0])\n    M = [[sum(r[i] * r[j] for r in A) for j in range(m)] + [sum(r[i] * t for r, t in zip(A, y))] for i in range(m)]\n    for k in range(m):\n        p = max(range(k, m), key=lambda r: abs(M[r][k]))\n        if abs(M[p][k]) < 1e-9:\n            raise ValueError(\"singular\")\n        M[k], M[p] = M[p], M[k]\n        for r in range(k + 1, m):\n            f = M[r][k] / M[k][k]\n            M[r] = [a - f * c for a, c in zip(M[r], M[k])]\n    z = [0.0] * m\n    for r in range(m - 1, -1, -1):\n        z[r] = (M[r][m] - sum(M[r][c] * z[c] for c in range(r + 1, m))) / M[r][r]\n    return z[1:], z[0]\n",
   "tests": [
    {
     "label": "Standardizing two columns",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nXs, means, stds = standardize([[1, 10], [2, 10], [3, 40]])\nassert _close(means, [2.0, 20.0]) and _close(stds, [0.816496580927726, 14.142135623730951]), f\"{means} {stds}\"\nassert _close(Xs, [[-1.224744871391589, -0.7071067811865475], [0.0, -0.7071067811865475], [1.224744871391589, 1.414213562373095]]), Xs\n"
    },
    {
     "label": "A constant column",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nXs, means, stds = standardize([[5, 1], [5, 2], [5, 3]])\nassert _close(means, [5.0, 2.0]) and _close(stds[0], 1.0) and _close([r[0] for r in Xs], [0.0, 0.0, 0.0]), f\"{Xs} {stds}\"\n"
    },
    {
     "label": "A line through four points",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nw, b = fit_normal([[0], [1], [2], [3]], [1, 3, 4, 6])\nassert _close(w, [1.6]) and _close(b, 1.1), f\"got {w}, {b}\"\n"
    },
    {
     "label": "The notes' house prices",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nX = [[50, 1], [60, 2], [70, 2], [80, 3], [100, 3], [120, 4]]\ny = [135, 150, 175, 205, 240, 290]\nw, b = fit_normal(X, y)\nassert _close(w, [2.0972, 3.6111], 1e-4) and _close(b, 22.3611, 1e-4), f\"got {w}, {b}\"\n"
    },
    {
     "label": "An exact plane is recovered",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nX = [[1, 2, 0], [0, 1, 3], [2, 0, 1], [3, 3, 3], [1, 0, 0], [0, 0, 1]]\ny = [4 * a - 2 * b + 0.5 * c + 7 for a, b, c in X]\nw, b = fit_normal(X, y)\nassert _close(w, [4.0, -2.0, 0.5], 1e-7) and _close(b, 7.0, 1e-7), f\"got {w}, {b}\"\n"
    },
    {
     "label": "Duplicate columns raise ValueError",
     "type": "raises",
     "call": "fit_normal([[1, 1], [2, 2], [3, 3]], [1, 2, 4])",
     "error": "ValueError"
    },
    {
     "label": "Standardizing doesn't change the predictions",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nX = [[50, 1], [60, 2], [70, 2], [80, 3], [100, 3], [120, 4]]\ny = [135, 150, 175, 205, 240, 290]\nw, b = fit_normal(X, y)\nXs, means, stds = standardize(X)\nws, bs = fit_normal(Xs, y)\nfor x, xs in zip(X, Xs):\n    p1 = sum(a * c for a, c in zip(w, x)) + b\n    p2 = sum(a * c for a, c in zip(ws, xs)) + bs\n    assert _close(p1, p2, 1e-6), f\"{p1} vs {p2}\"\n",
     "hidden": true
    }
   ]
  }
 ],
 "ml5": [
  {
   "id": "logistic",
   "title": "Logistic regression",
   "prompt": "<p>Train a logistic regression classifier by gradient descent on the average cross-entropy loss, with optional L2 regularization.</p>\n<ul>\n<li><code>sigmoid(z)</code> = 1/(1 + e<sup>−<em>z</em></sup>). It must not overflow for large |<em>z</em>|: <code>math.exp(1000)</code> raises <code>OverflowError</code>, so for negative <em>z</em> use the equal form e<sup><em>z</em></sup>/(1 + e<sup><em>z</em></sup>).</li>\n<li><code>predict_proba(w, b, x)</code> = σ(<strong>w</strong> · <strong>x</strong> + <em>b</em>).</li>\n<li><code>train_logistic(X, y, rate, steps, lam=0.0)</code>: labels are 0 or 1. Start from all weights 0.0 and <em>b</em> = 0.0. Each step computes, with <em>p<sub>i</sub></em> the current predicted probability for example <em>i</em>, ∂/∂<em>w<sub>j</sub></em> = (1/<em>n</em>) Σ (<em>p<sub>i</sub></em> − <em>y<sub>i</sub></em>) <em>x<sub>ij</sub></em> + 2 λ <em>w<sub>j</sub></em> and ∂/∂<em>b</em> = (1/<em>n</em>) Σ (<em>p<sub>i</sub></em> − <em>y<sub>i</sub></em>) (the bias isn't regularized), then updates all parameters at once. Return <code>(w, b)</code>.</li>\n</ul>",
   "starter": "import math\n\ndef sigmoid(z):\n    pass\n\ndef predict_proba(w, b, x):\n    pass\n\ndef train_logistic(X, y, rate, steps, lam=0.0):\n    pass\n",
   "hint": "<p>Compute all the <em>p<sub>i</sub></em> first, from the current parameters, then the gradient, then update. Updating <em>w</em><sub>1</sub> before computing the gradient for <em>w</em><sub>2</sub> gives slightly different numbers from the tests.</p>",
   "solution": "import math\n\ndef sigmoid(z):\n    if z >= 0:\n        return 1 / (1 + math.exp(-z))\n    e = math.exp(z)\n    return e / (1 + e)\n\ndef predict_proba(w, b, x):\n    return sigmoid(sum(a * c for a, c in zip(w, x)) + b)\n\ndef train_logistic(X, y, rate, steps, lam=0.0):\n    n, d = len(X), len(X[0])\n    w, b = [0.0] * d, 0.0\n    for _ in range(steps):\n        errs = [predict_proba(w, b, x) - t for x, t in zip(X, y)]\n        gw = [sum(e * x[j] for e, x in zip(errs, X)) / n + 2 * lam * w[j] for j in range(d)]\n        gb = sum(errs) / n\n        w = [wj - rate * g for wj, g in zip(w, gw)]\n        b -= rate * gb\n    return w, b\n",
   "tests": [
    {
     "label": "The sigmoid",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nassert _close(sigmoid(0), 0.5) and _close(sigmoid(2), 0.8807970779778823) and _close(sigmoid(-2), 0.11920292202211755)\nassert sigmoid(1000) == 1.0 and 0 <= sigmoid(-1000) < 1e-300, \"sigmoid must handle large |z| without OverflowError\"\n"
    },
    {
     "label": "One step from zero",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nw, b = train_logistic([[1.0], [3.0]], [0, 1], 0.5, 1)\nassert _close(w, [0.25]) and _close(b, 0.0), f\"got {w}, {b}\"\n"
    },
    {
     "label": "The notes' study-hours data",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nhours = [[0.5], [1.0], [1.5], [2.0], [2.5], [3.0], [3.5], [4.0], [4.5], [5.0]]\npassed = [0, 0, 0, 0, 1, 0, 1, 1, 1, 1]\nw, b = train_logistic(hours, passed, 0.5, 5000)\nassert _close(w, [2.6031], 1e-3) and _close(b, -7.1585, 1e-3), f\"got {w}, {b}\"\nassert _close(predict_proba(w, b, [2.75]), 0.5, 1e-3)\n"
    },
    {
     "label": "Regularization keeps separable weights small",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nX = [[1], [2], [3], [4], [5], [6]]\ny = [0, 0, 0, 1, 1, 1]\nw0, b0 = train_logistic(X, y, 0.5, 3000)\nw1, b1 = train_logistic(X, y, 0.5, 3000, lam=0.01)\nassert w0[0] > 4.5 and w1[0] < 2.6, f\"without: {w0}, with: {w1}\"\nassert _close(-b1 / w1[0], 3.5, 1e-2), f\"boundary {-b1 / w1[0]}\"\n"
    },
    {
     "label": "Two features",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nX = [[0, 0], [0, 1], [1, 0], [1, 1], [2, 1], [1, 2], [2, 2], [0, 2]]\ny = [0, 0, 0, 1, 1, 1, 1, 0]\nw, b = train_logistic(X, y, 0.3, 2000, lam=0.001)\nwant_w, want_b = [5.8557, 2.7270], -7.4797\nassert _close(w, want_w, 1e-3) and _close(b, want_b, 1e-3), f\"got {w}, {b}\"\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "knn_cv",
   "title": "k-nearest neighbours and leave-one-out",
   "prompt": "<p><code>train</code> is a list of <code>(point, label)</code> pairs, where a point is a tuple of numbers.</p>\n<ul>\n<li><code>knn_predict(train, x, k)</code>: sort the examples by Euclidean distance from <code>x</code> (<code>math.dist</code>), keeping the original order among equal distances (Python's sort is stable), take the first <code>k</code>, and return the most common label among them. If labels tie on votes, return the tied label whose nearest example comes first in that sorted order.</li>\n<li><code>loo_accuracy(data, k)</code>: leave-one-out cross-validation. For each example, predict its label with <code>knn_predict</code> trained on all the <em>other</em> examples (in their original order), and return the fraction predicted correctly.</li>\n</ul>",
   "starter": "import math\n\ndef knn_predict(train, x, k):\n    pass\n\ndef loo_accuracy(data, k):\n    pass\n",
   "hint": "<p><code>collections.Counter.most_common</code> orders labels with equal counts by when they were first counted, so counting the <em>k</em> nearest labels in order of distance gives exactly the tie rule asked for.</p>",
   "solution": "import math\nfrom collections import Counter\n\ndef knn_predict(train, x, k):\n    near = sorted(train, key=lambda ex: math.dist(ex[0], x))[:k]\n    return Counter(lab for _, lab in near).most_common(1)[0][0]\n\ndef loo_accuracy(data, k):\n    right = sum(knn_predict(data[:i] + data[i + 1:], x, k) == t for i, (x, t) in enumerate(data))\n    return right / len(data)\n",
   "tests": [
    {
     "label": "The notes' query with k = 1 and k = 3",
     "type": "assert",
     "code": "train = [((1, 2), \"red\"), ((2, 1), \"red\"), ((2, 3), \"red\"), ((3, 2), \"red\"), ((6, 6), \"red\"),\n         ((6, 5), \"blue\"), ((7, 7), \"blue\"), ((5, 7), \"blue\"), ((7, 6), \"blue\")]\nassert knn_predict(train, (6.2, 6.1), 1) == \"red\"\nassert knn_predict(train, (6.2, 6.1), 3) == \"blue\"\n"
    },
    {
     "label": "Ties go to the label of the nearest example",
     "type": "assert",
     "code": "train = [((0,), \"a\"), ((3,), \"b\"), ((1,), \"b\"), ((-2,), \"a\")]\nassert knn_predict(train, (0.4,), 2) == \"a\", \"a at distance 0.4 is nearer than b at 0.6\"\nassert knn_predict(train, (0.6,), 2) == \"b\"\nassert knn_predict(train, (0.5,), 2) == \"a\", \"equal distances keep the original order: (0,) comes before (1,)\"\n"
    },
    {
     "label": "Leave-one-out on the notes' data",
     "type": "assert",
     "code": "train = [((1, 2), \"red\"), ((2, 1), \"red\"), ((2, 3), \"red\"), ((3, 2), \"red\"), ((6, 6), \"red\"),\n         ((6, 5), \"blue\"), ((7, 7), \"blue\"), ((5, 7), \"blue\"), ((7, 6), \"blue\")]\ngot = [loo_accuracy(train, k) for k in (1, 3, 5, 7)]\nwant = [5 / 9, 8 / 9, 8 / 9, 4 / 9]\nassert all(abs(a - b) < 1e-9 for a, b in zip(got, want)), f\"got {got}\"\n"
    },
    {
     "label": "Larger random data",
     "type": "assert",
     "hidden": true,
     "code": "import random\nrng = random.Random(5)\ndata = []\nfor i in range(60):\n    lab = i % 3\n    data.append(((lab * 2 + rng.random() * 2.5, rng.random() * 3), \"c\" + str(lab)))\naccs = [loo_accuracy(data, k) for k in (1, 5, 15)]\nwant = [0.8, 0.85, 0.8666666666666667]\nassert all(abs(a - b) < 1e-9 for a, b in zip(accs, want)), f\"got {accs}\"\n"
    }
   ]
  },
  {
   "id": "precision_recall",
   "title": "Confusion matrices, precision and recall",
   "prompt": "<p>Labels are 1 (positive) and 0 (negative).</p>\n<ul>\n<li><code>confusion(y_true, y_pred)</code> returns <code>(tp, fp, fn, tn)</code>: true positives, false positives, false negatives and true negatives.</li>\n<li><code>metrics(y_true, y_pred)</code> returns a dict with keys <code>\"accuracy\"</code>, <code>\"precision\"</code>, <code>\"recall\"</code> and <code>\"f1\"</code> (the harmonic mean 2<em>PR</em>/(<em>P</em> + <em>R</em>)). When a ratio's denominator is 0 (no predicted positives, no actual positives, or <em>P</em> + <em>R</em> = 0), report it as 0.0.</li>\n<li><code>at_threshold(scores, y_true, t)</code>: predict 1 when a score is ≥ <code>t</code>, and return <code>metrics</code> of those predictions.</li>\n</ul>",
   "starter": "def confusion(y_true, y_pred):\n    pass\n\ndef metrics(y_true, y_pred):\n    pass\n\ndef at_threshold(scores, y_true, t):\n    pass\n",
   "solution": "def confusion(y_true, y_pred):\n    tp = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 1)\n    fp = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 1)\n    fn = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 0)\n    tn = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 0)\n    return tp, fp, fn, tn\n\ndef metrics(y_true, y_pred):\n    tp, fp, fn, tn = confusion(y_true, y_pred)\n    acc = (tp + tn) / len(y_true)\n    prec = tp / (tp + fp) if tp + fp else 0.0\n    rec = tp / (tp + fn) if tp + fn else 0.0\n    f1 = 2 * prec * rec / (prec + rec) if prec + rec else 0.0\n    return {\"accuracy\": acc, \"precision\": prec, \"recall\": rec, \"f1\": f1}\n\ndef at_threshold(scores, y_true, t):\n    return metrics(y_true, [1 if s >= t else 0 for s in scores])\n",
   "tests": [
    {
     "label": "Counting the four cells",
     "call": "confusion([1, 1, 0, 0, 1, 0], [1, 0, 1, 0, 1, 0])",
     "expect": "(2, 1, 1, 2)"
    },
    {
     "label": "Metrics for a small example",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nm = metrics([1, 1, 0, 0, 1, 0, 0, 0], [1, 0, 1, 0, 1, 0, 0, 1])\nassert _close(m, {\"accuracy\": 0.625, \"precision\": 0.5, \"recall\": 2 / 3, \"f1\": 4 / 7}), f\"got {m}\"\n"
    },
    {
     "label": "The notes' screening test",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\ny_true = [1] * 100 + [0] * 9900\ny_pred = [1] * 90 + [0] * 10 + [1] * 495 + [0] * 9405\nm = metrics(y_true, y_pred)\nassert _close(m[\"accuracy\"], 0.9495) and _close(m[\"recall\"], 0.9) and _close(m[\"precision\"], 90 / 585), f\"got {m}\"\n"
    },
    {
     "label": "Never predicting positive",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nm = metrics([1, 0, 0, 0], [0, 0, 0, 0])\nassert _close(m, {\"accuracy\": 0.75, \"precision\": 0.0, \"recall\": 0.0, \"f1\": 0.0}), f\"got {m}\"\n"
    },
    {
     "label": "Moving the threshold",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nscores = [0.95, 0.85, 0.7, 0.6, 0.55, 0.4, 0.3, 0.1]\ny = [1, 1, 0, 1, 0, 1, 0, 0]\nhi = at_threshold(scores, y, 0.8)\nlo = at_threshold(scores, y, 0.35)\nassert _close(hi[\"precision\"], 1.0) and _close(hi[\"recall\"], 0.5), f\"threshold 0.8: {hi}\"\nassert _close(lo[\"precision\"], 4 / 6) and _close(lo[\"recall\"], 1.0), f\"threshold 0.35: {lo}\"\nassert _close(at_threshold(scores, y, 0.6)[\"recall\"], 0.75), \"a score equal to the threshold counts as positive\"\n"
    }
   ]
  }
 ],
 "ml6": [
  {
   "id": "info_gain",
   "title": "Entropy and information gain",
   "prompt": "<p>Rows are dicts from attribute names to values, as in the notes.</p>\n<ul>\n<li><code>entropy(labels)</code>: −Σ <em>p</em> log<sub>2</sub> <em>p</em> over the distinct labels in the list, where <em>p</em> is each label's fraction. The entropy of an empty list is 0.0.</li>\n<li><code>info_gain(rows, attr, target)</code>: the entropy of the target labels minus the weighted average entropy of the subsets made by splitting on <code>attr</code>.</li>\n<li><code>best_attribute(rows, attrs, target)</code>: the attribute in the list <code>attrs</code> with the largest gain (on a tie, the one that comes first in <code>attrs</code>).</li>\n<li><code>best_threshold(xs, labels)</code> for a numeric feature: consider each threshold halfway between two consecutive distinct values of <code>xs</code> (sorted), splitting the examples into <em>x</em> &lt; threshold and <em>x</em> ≥ threshold. Return <code>(threshold, gain)</code> for the largest gain (on a tie, the smallest threshold), or <code>(None, 0.0)</code> if all values are equal.</li>\n</ul>",
   "starter": "import math\nfrom collections import Counter\n\ndef entropy(labels):\n    pass\n\ndef info_gain(rows, attr, target):\n    pass\n\ndef best_attribute(rows, attrs, target):\n    pass\n\ndef best_threshold(xs, labels):\n    pass\n",
   "hint": "<p>For <code>best_threshold</code>, the gain of a split is the entropy of all the labels minus (<em>n</em><sub>left</sub>/<em>n</em>) × entropy(left) − (<em>n</em><sub>right</sub>/<em>n</em>) × entropy(right). Thirty values give at most 29 thresholds, so recomputing each split from scratch is fast enough.</p>",
   "solution": "import math\nfrom collections import Counter\n\ndef entropy(labels):\n    n = len(labels)\n    return -sum(c / n * math.log2(c / n) for c in Counter(labels).values()) if n else 0.0\n\ndef info_gain(rows, attr, target):\n    before = entropy([r[target] for r in rows])\n    after = 0.0\n    for v in {r[attr] for r in rows}:\n        sub = [r[target] for r in rows if r[attr] == v]\n        after += len(sub) / len(rows) * entropy(sub)\n    return before - after\n\ndef best_attribute(rows, attrs, target):\n    best = attrs[0]\n    for a in attrs[1:]:\n        if info_gain(rows, a, target) > info_gain(rows, best, target) + 1e-12:\n            best = a\n    return best\n\ndef best_threshold(xs, labels):\n    vals = sorted(set(xs))\n    base = entropy(labels)\n    best = (None, 0.0)\n    for lo, hi in zip(vals, vals[1:]):\n        t = (lo + hi) / 2\n        left = [l for x, l in zip(xs, labels) if x < t]\n        right = [l for x, l in zip(xs, labels) if x >= t]\n        g = base - len(left) / len(xs) * entropy(left) - len(right) / len(xs) * entropy(right)\n        if best[0] is None or g > best[1] + 1e-12:\n            best = (t, g)\n    return best\n",
   "tests": [
    {
     "label": "Entropy",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nassert _close(entropy([\"a\", \"b\"]), 1.0) and _close(entropy([\"a\"] * 5), 0.0) and _close(entropy([]), 0.0)\nassert _close(entropy([\"yes\"] * 9 + [\"no\"] * 5), 0.9402859586706311)\nassert _close(entropy([1, 2, 3, 4]), 2.0)\n"
    },
    {
     "label": "Gains on the tennis data",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\n_rows = \"\"\"sunny hot high weak no\nsunny hot high strong no\novercast hot high weak yes\nrain mild high weak yes\nrain cool normal weak yes\nrain cool normal strong no\novercast cool normal strong yes\nsunny mild high weak no\nsunny cool normal weak yes\nrain mild normal weak yes\nsunny mild normal strong yes\novercast mild high strong yes\novercast hot normal weak yes\nrain mild high strong no\"\"\"\nTENNIS = [dict(zip([\"outlook\", \"temp\", \"humidity\", \"wind\", \"play\"], line.split())) for line in _rows.splitlines()]\n\ng = {a: info_gain(TENNIS, a, \"play\") for a in [\"outlook\", \"temp\", \"humidity\", \"wind\"]}\nwant = {\"outlook\": 0.2467498197744391, \"temp\": 0.029222565658954647, \"humidity\": 0.15183550136234136, \"wind\": 0.04812703040826927}\nassert _close(g, want), f\"got {g}\"\n"
    },
    {
     "label": "Choosing the root and the next split",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\n_rows = \"\"\"sunny hot high weak no\nsunny hot high strong no\novercast hot high weak yes\nrain mild high weak yes\nrain cool normal weak yes\nrain cool normal strong no\novercast cool normal strong yes\nsunny mild high weak no\nsunny cool normal weak yes\nrain mild normal weak yes\nsunny mild normal strong yes\novercast mild high strong yes\novercast hot normal weak yes\nrain mild high strong no\"\"\"\nTENNIS = [dict(zip([\"outlook\", \"temp\", \"humidity\", \"wind\", \"play\"], line.split())) for line in _rows.splitlines()]\n\nassert best_attribute(TENNIS, [\"temp\", \"wind\", \"outlook\", \"humidity\"], \"play\") == \"outlook\"\nsunny = [r for r in TENNIS if r[\"outlook\"] == \"sunny\"]\nassert best_attribute(sunny, [\"temp\", \"humidity\", \"wind\"], \"play\") == \"humidity\"\nrain = [r for r in TENNIS if r[\"outlook\"] == \"rain\"]\nassert best_attribute(rain, [\"temp\", \"humidity\", \"wind\"], \"play\") == \"wind\"\n"
    },
    {
     "label": "Ties go to the first attribute",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nrows = [{\"a\": 0, \"b\": 0, \"y\": 0}, {\"a\": 1, \"b\": 1, \"y\": 1}]\nassert best_attribute(rows, [\"b\", \"a\"], \"y\") == \"b\"\nassert best_attribute(rows, [\"a\", \"b\"], \"y\") == \"a\"\n"
    },
    {
     "label": "A numeric threshold",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nt, g = best_threshold([1, 2, 3, 10, 11, 12], [\"a\", \"a\", \"a\", \"b\", \"b\", \"b\"])\nassert _close(t, 6.5) and _close(g, 1.0), f\"got {t}, {g}\"\nt, g = best_threshold([64, 65, 68, 69, 70, 71, 72, 75, 80, 81, 83, 85],\n                      [\"y\", \"n\", \"y\", \"y\", \"y\", \"n\", \"y\", \"y\", \"n\", \"y\", \"y\", \"n\"])\nassert _close(t, 84.0) and _close(g, 0.1433908088172562), f\"got {t}, {g}\"\nassert best_threshold([3, 3, 3], [\"a\", \"b\", \"a\"]) == (None, 0.0)\n"
    },
    {
     "label": "Unsorted input and ties",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nt, g = best_threshold([5, 1, 4, 2], [\"b\", \"a\", \"b\", \"a\"])\nassert _close(t, 3.0) and _close(g, 1.0), f\"got {t}, {g}\"\nt, g = best_threshold([1, 2, 3, 4], [\"a\", \"b\", \"b\", \"a\"])\nassert _close(t, 1.5), f\"thresholds 1.5 and 3.5 tie; expected the smaller, got {t}\"\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "kmeans",
   "title": "k-means clustering",
   "prompt": "<p>Write <code>kmeans(points, centroids, max_iter=100)</code>. Points and centroids are tuples of numbers of the same length; <code>centroids</code> is the starting list. Repeat at most <code>max_iter</code> times:</p>\n<ol>\n<li>Assign each point to its nearest centroid (Euclidean distance; on a tie, the centroid with the lower index).</li>\n<li>Move each centroid to the mean of its points, as a tuple of floats. A centroid with no points stays where it is.</li>\n<li>If no centroid moved, stop.</li>\n</ol>\n<p>Return <code>(centroids, labels, sse)</code>: the final centroids, each point's cluster index under them (recomputed with rule 1), and the sum of squared distances from each point to its assigned centroid.</p>",
   "starter": "import math\n\ndef kmeans(points, centroids, max_iter=100):\n    pass\n",
   "hint": "<p><code>min(range(k), key=lambda j: math.dist(p, centroids[j]))</code> returns the lowest index among equal distances, because <code>min</code> keeps the first minimum it finds. The mean of a cluster's points is <code>tuple(sum(c) / len(cl) for c in zip(*cl))</code>.</p>",
   "solution": "import math\n\ndef _assign(points, cents):\n    return [min(range(len(cents)), key=lambda j: math.dist(p, cents[j])) for p in points]\n\ndef kmeans(points, centroids, max_iter=100):\n    cents = [tuple(float(v) for v in c) for c in centroids]\n    for _ in range(max_iter):\n        labels = _assign(points, cents)\n        new = []\n        for j, c in enumerate(cents):\n            cl = [p for p, l in zip(points, labels) if l == j]\n            new.append(tuple(sum(col) / len(cl) for col in zip(*cl)) if cl else c)\n        if new == cents:\n            break\n        cents = new\n    labels = _assign(points, cents)\n    sse = sum(math.dist(p, cents[l]) ** 2 for p, l in zip(points, labels))\n    return cents, labels, sse\n",
   "tests": [
    {
     "label": "The notes' one-dimensional example",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nc, l, s = kmeans([(1,), (2,), (4,), (7,), (8,), (10,)], [(1,), (2,)])\nassert _close(c, [(7 / 3,), (25 / 3,)]) and l == [0, 0, 0, 1, 1, 1] and _close(s, 28 / 3), f\"got {c}, {l}, {s}\"\n"
    },
    {
     "label": "A bad start gives a worse local minimum",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\npts = [(0,), (1,), (10,), (11,), (20,), (21,)]\nc, l, s = kmeans(pts, [(0,), (1,), (10,)])\nassert _close(c, [(0.0,), (1.0,), (15.5,)]) and _close(s, 101.0), f\"got {c}, {s}\"\nc, l, s = kmeans(pts, [(0,), (10,), (20,)])\nassert _close(c, [(0.5,), (10.5,), (20.5,)]) and _close(s, 1.5) and l == [0, 0, 1, 1, 2, 2], f\"got {c}, {s}\"\n"
    },
    {
     "label": "Two dimensions",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\npts = [(1, 1), (1.5, 2), (3, 4), (5, 7), (3.5, 5), (4.5, 5), (3.5, 4.5)]\nc, l, s = kmeans(pts, [(1, 1), (5, 7)])\nassert _close(c, [(1.25, 1.5), (3.9, 5.1)]) and l == [0, 0, 1, 1, 1, 1, 1] and _close(s, 8.525), f\"got {c}, {l}, {s}\"\n"
    },
    {
     "label": "An empty cluster stays put; max_iter is respected",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nc, l, s = kmeans([(0,), (1,)], [(0,), (100,)])\nassert _close(c, [(0.5,), (100.0,)]) and l == [0, 0], f\"got {c}, {l}\"\nc, l, s = kmeans([(1,), (2,), (4,), (7,), (8,), (10,)], [(1,), (2,)], max_iter=1)\nassert _close(c, [(1.0,), (6.2,)]) and l == [0, 0, 1, 1, 1, 1] and _close(s, 0 + 1 + 2.2**2 + 0.8**2 + 1.8**2 + 3.8**2), f\"got {c}, {l}, {s}\"\n"
    },
    {
     "label": "Ties go to the lower index",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nc, l, s = kmeans([(5,)], [(4,), (6,)], max_iter=1)\nassert l == [0] and _close(c, [(5.0,), (6.0,)]), f\"got {c}, {l}\"\n",
     "hidden": true
    }
   ]
  }
 ],
 "ml7": [
  {
   "id": "perceptron",
   "title": "The perceptron learning rule",
   "prompt": "<p>Write <code>train_perceptron(data, epochs)</code>. <code>data</code> is a list of <code>(x, t)</code> pairs: <code>x</code> a tuple of <em>d</em> numbers and <code>t</code> a label 0 or 1. The perceptron predicts 1 if <strong>w</strong> · <strong>x</strong> + <em>b</em> &gt; 0 and 0 otherwise.</p>\n<p>Start with all weights and <em>b</em> equal to 0. Each epoch goes through the data in order; on each mistake, add <strong>x</strong> to <strong>w</strong> and 1 to <em>b</em> if <em>t</em> = 1, or subtract them if <em>t</em> = 0 (learning rate 1). Stop after an epoch with no mistakes, or after <code>epochs</code> epochs. Return <code>(w, b, mistakes)</code>, with <code>w</code> a list and <code>mistakes</code> the list of the number of mistakes in each epoch run.</p>",
   "starter": "def train_perceptron(data, epochs):\n    pass\n",
   "solution": "def train_perceptron(data, epochs):\n    d = len(data[0][0])\n    w, b = [0] * d, 0\n    mistakes = []\n    for _ in range(epochs):\n        m = 0\n        for x, t in data:\n            pred = 1 if sum(a * c for a, c in zip(w, x)) + b > 0 else 0\n            if pred != t:\n                m += 1\n                s = 1 if t == 1 else -1\n                w = [a + s * c for a, c in zip(w, x)]\n                b += s\n        mistakes.append(m)\n        if m == 0:\n            break\n    return w, b, mistakes\n",
   "tests": [
    {
     "label": "AND, as traced in the notes",
     "call": "train_perceptron([((0, 0), 0), ((0, 1), 0), ((1, 0), 0), ((1, 1), 1)], 20)",
     "expect": "([2, 1], -2, [1, 3, 3, 2, 1, 0])"
    },
    {
     "label": "OR",
     "call": "train_perceptron([((0, 0), 0), ((0, 1), 1), ((1, 0), 1), ((1, 1), 1)], 20)",
     "expect": "([1, 1], 0, [1, 2, 1, 0])"
    },
    {
     "label": "XOR never converges",
     "call": "train_perceptron([((0, 0), 0), ((0, 1), 1), ((1, 0), 1), ((1, 1), 0)], 6)",
     "expect": "([-1, 0], 1, [2, 3, 4, 4, 4, 4])"
    },
    {
     "label": "A separable set in three dimensions",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nimport random\nrng = random.Random(1)\ndata = []\nwhile len(data) < 40:\n    x = tuple(rng.randint(-5, 5) for _ in range(3))\n    s = 2 * x[0] - x[1] + 3 * x[2] - 1\n    if s != 0:\n        data.append((x, 1 if s > 0 else 0))\nw, b, m = train_perceptron(data, 100)\nassert m[-1] == 0, f\"mistakes per epoch: {m}\"\nassert all((sum(a * c for a, c in zip(w, x)) + b > 0) == (t == 1) for x, t in data)\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "autograd",
   "title": "A scalar autograd engine",
   "prompt": "<p>Write a class <code>Value</code> like the notes': a number <code>data</code> with a gradient <code>grad</code> (initially 0.0) that remembers how it was computed. Support:</p>\n<ul>\n<li><code>a + b</code>, <code>a * b</code>, <code>a - b</code> and <code>-a</code>, where either side may be a plain number (so <code>2 * a</code> and <code>a + 1</code> work too);</li>\n<li><code>a.tanh()</code> and <code>a.exp()</code>;</li>\n<li><code>a.backward()</code>: set <code>a.grad</code> to 1 and fill in <code>grad</code> for every Value that <code>a</code> depends on with ∂<code>a</code>/∂(that Value), by the chain rule in reverse topological order. A Value used more than once must receive the sum of the gradients through each use.</li>\n</ul>\n<p>You may assume <code>backward</code> is called once per computation, on Values whose <code>grad</code> is 0 (tests that train reset them). One test builds a chain of 5,000 operations, deeper than Python's recursion limit of about 1,000 nested calls, so the topological sort in <code>backward</code> must use an explicit stack rather than recursion (CS 201 Lesson 7 mentions the same problem for DFS).</p>",
   "starter": "import math\n\nclass Value:\n    def __init__(self, data, parents=(), local_grads=()):\n        self.data = data\n        self.grad = 0.0\n        self.parents = parents\n        self.local_grads = local_grads\n",
   "hint": "<p>Every operation creates a new Value whose <code>parents</code> are its inputs and whose <code>local_grads</code> are the derivatives of the output with respect to each input: (1, 1) for +, (<em>b</em>, <em>a</em>) for <em>a</em> × <em>b</em>, 1 − tanh² for tanh, and e<sup><em>a</em></sup> for exp. Write subtraction and negation in terms of + and ×. For reversed operands such as <code>2 * a</code>, define <code>__rmul__</code> and <code>__radd__</code>; for <code>1 - a</code>, define <code>__rsub__</code>.</p>",
   "solution": "import math\n\nclass Value:\n    def __init__(self, data, parents=(), local_grads=()):\n        self.data = data\n        self.grad = 0.0\n        self.parents = parents\n        self.local_grads = local_grads\n\n    @staticmethod\n    def _wrap(o):\n        return o if isinstance(o, Value) else Value(o)\n\n    def __add__(self, other):\n        other = Value._wrap(other)\n        return Value(self.data + other.data, (self, other), (1.0, 1.0))\n\n    def __mul__(self, other):\n        other = Value._wrap(other)\n        return Value(self.data * other.data, (self, other), (other.data, self.data))\n\n    __radd__ = __add__\n    __rmul__ = __mul__\n\n    def __neg__(self):\n        return self * -1\n\n    def __sub__(self, other):\n        return self + (-Value._wrap(other))\n\n    def __rsub__(self, other):\n        return Value._wrap(other) + (-self)\n\n    def tanh(self):\n        t = math.tanh(self.data)\n        return Value(t, (self,), (1 - t * t,))\n\n    def exp(self):\n        e = math.exp(self.data)\n        return Value(e, (self,), (e,))\n\n    def backward(self):\n        order, seen = [], set()\n        stack = [(self, False)]\n        while stack:\n            v, done = stack.pop()\n            if done:\n                order.append(v)\n                continue\n            if id(v) in seen:\n                continue\n            seen.add(id(v))\n            stack.append((v, True))\n            for p in v.parents:\n                if id(p) not in seen:\n                    stack.append((p, False))\n        self.grad = 1.0\n        for v in reversed(order):\n            for p, g in zip(v.parents, v.local_grads):\n                p.grad += g * v.grad\n",
   "tests": [
    {
     "label": "Sum and product",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\na, b = Value(2.0), Value(-3.0)\nc = a * b + a\nc.backward()\nassert _close(c.data, -4.0) and _close(a.grad, -2.0) and _close(b.grad, 2.0), f\"c={c.data}, a.grad={a.grad}, b.grad={b.grad}\"\n"
    },
    {
     "label": "The notes' neuron",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nx, w, b = Value(2.0), Value(-0.5), Value(0.3)\ny = (w * x + b).tanh()\nloss = (y - 1) * (y - 1)\nloss.backward()\nassert _close(y.data, -0.6043677771171636) and _close(w.grad, -4.07335, 1e-4) and _close(b.grad, -2.03668, 1e-4) and _close(x.grad, 1.01834, 1e-4), \\\n    f\"y={y.data}, w.grad={w.grad}, b.grad={b.grad}, x.grad={x.grad}\"\n"
    },
    {
     "label": "Plain numbers on either side",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\na = Value(3.0)\nc = 2 * a + 1 - a * 4\nc.backward()\nassert _close(c.data, -5.0) and _close(a.grad, -2.0), f\"c={c.data}, a.grad={a.grad}\"\nd = Value(1.5)\ne = 1 - d\ne.backward()\nassert _close(e.data, -0.5) and _close(d.grad, -1.0), f\"e={e.data}, d.grad={d.grad}\"\n"
    },
    {
     "label": "A value used many times",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\na = Value(3.0)\nc = a * a * a + a\nc.backward()\nassert _close(c.data, 30.0) and _close(a.grad, 28.0), f\"d/da (a^3 + a) at 3 is 28; got {a.grad}\"\n"
    },
    {
     "label": "exp, tanh and a diamond-shaped graph",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nimport math\nx = Value(0.5)\nu = x.exp()\nv = x.tanh()\ny = u * v + u\ny.backward()\nwant = math.exp(0.5) * math.tanh(0.5) + math.exp(0.5) * (1 - math.tanh(0.5) ** 2) + math.exp(0.5)\nassert _close(y.data, math.exp(0.5) * math.tanh(0.5) + math.exp(0.5)) and _close(x.grad, want), f\"x.grad={x.grad}, want {want}\"\n"
    },
    {
     "label": "Gradients match finite differences",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nimport math\nvals = [0.3, -0.8, 0.5]\nvs = [Value(v) for v in vals]\na, b, c = vs\nout = ((a * b + c).tanh() * a - (b * c).exp() * 0.1 + a * a).tanh()\nout.backward()\ndef num(i):\n    h = 1e-6\n    def g(vv):\n        a, b, c = vv\n        return math.tanh(math.tanh(a * b + c) * a - math.exp(b * c) * 0.1 + a * a)\n    up = list(vals); up[i] += h\n    dn = list(vals); dn[i] -= h\n    return (g(up) - g(dn)) / (2 * h)\nfor i, v in enumerate(vs):\n    assert abs(v.grad - num(i)) < 1e-6, f\"gradient {i}: {v.grad} vs numeric {num(i)}\"\n",
     "hidden": true
    },
    {
     "label": "A chain of 5,000 operations (no recursion limit)",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nx = Value(0.0)\ny = x\nfor _ in range(5000):\n    y = y * 1.0 + 0.001\ny.backward()\nassert _close(y.data, 5.0, 1e-6) and _close(x.grad, 1.0), f\"y={y.data}, x.grad={x.grad}\"\n"
    },
    {
     "label": "Training a 2-2-1 network on XOR",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nXOR = [((0, 0), 0), ((0, 1), 1), ((1, 0), 1), ((1, 1), 0)]\nparams = [Value(v) for v in [0.5, -0.4, 0.1, -0.3, 0.6, 0.2, 0.7, -0.5, 0.0]]\ndef net(x):\n    w11, w12, b1, w21, w22, b2, v1, v2, c = params\n    h1 = (w11 * x[0] + w12 * x[1] + b1).tanh()\n    h2 = (w21 * x[0] + w22 * x[1] + b2).tanh()\n    return (v1 * h1 + v2 * h2 + c).tanh()\nfor step in range(500):\n    loss = Value(0.0)\n    for x, t in XOR:\n        d = net(x) - t\n        loss = loss + d * d\n    for p in params:\n        p.grad = 0.0\n    loss.backward()\n    for p in params:\n        p.data -= 0.2 * p.grad\nassert loss.data < 0.005, f\"final loss {loss.data}\"\nouts = [net(x).data for x, _ in XOR]\nassert outs[0] < 0.1 and outs[1] > 0.9 and outs[2] > 0.9 and outs[3] < 0.1, outs\n",
     "hidden": true,
     "limit": 8
    }
   ]
  }
 ],
 "ml8": [
  {
   "id": "bigram",
   "title": "A bigram language model",
   "prompt": "<p>Write a bigram model with add-<em>k</em> smoothing, as in the notes.</p>\n<ul>\n<li><code>train_bigram(sentences)</code>: each sentence is a string; split it into words and add <code>\"&lt;s&gt;\"</code> at the start and <code>\"&lt;/s&gt;\"</code> at the end. Return a model holding the count of each pair (<em>a</em>, <em>b</em>) of adjacent words, the count of each word as the first of a pair, and the vocabulary: every word that can be predicted, that is all the training words plus <code>\"&lt;/s&gt;\"</code> (but not <code>\"&lt;s&gt;\"</code>).</li>\n<li><code>prob(model, prev, word, k=1.0)</code>: P(<em>word</em> | <em>prev</em>) = (count(<em>prev</em>, <em>word</em>) + <em>k</em>) / (count(<em>prev</em>) + <em>k</em>|<em>V</em>|). With <em>k</em> = 0 and an unseen <em>prev</em>, return 0.0.</li>\n<li><code>perplexity(model, sentences, k=1.0)</code>: exp(−(1/<em>N</em>) Σ log P), where the sum runs over every predicted word, <code>\"&lt;/s&gt;\"</code> included, in all the sentences, and <em>N</em> is the number of predictions. If some probability is 0, return <code>math.inf</code>.</li>\n</ul>",
   "starter": "import math\nfrom collections import Counter\n\ndef train_bigram(sentences):\n    pass\n\ndef prob(model, prev, word, k=1.0):\n    pass\n\ndef perplexity(model, sentences, k=1.0):\n    pass\n",
   "solution": "import math\nfrom collections import Counter\n\ndef train_bigram(sentences):\n    pairs, ctx, vocab = Counter(), Counter(), {\"</s>\"}\n    for s in sentences:\n        words = [\"<s>\"] + s.split() + [\"</s>\"]\n        vocab.update(s.split())\n        for a, b in zip(words, words[1:]):\n            pairs[(a, b)] += 1\n            ctx[a] += 1\n    return {\"pairs\": pairs, \"ctx\": ctx, \"vocab\": vocab}\n\ndef prob(model, prev, word, k=1.0):\n    den = model[\"ctx\"][prev] + k * len(model[\"vocab\"])\n    if den == 0:\n        return 0.0\n    return (model[\"pairs\"][(prev, word)] + k) / den\n\ndef perplexity(model, sentences, k=1.0):\n    total, n = 0.0, 0\n    for s in sentences:\n        words = [\"<s>\"] + s.split() + [\"</s>\"]\n        for a, b in zip(words, words[1:]):\n            p = prob(model, a, b, k)\n            if p == 0:\n                return math.inf\n            total += math.log(p)\n            n += 1\n    return math.exp(-total / n)\n",
   "tests": [
    {
     "label": "Counts and maximum-likelihood probabilities",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\ncorpus = [\"the cat sat on the mat\", \"the dog sat on the log\", \"the cat saw the dog\"]\nm = train_bigram(corpus)\nassert _close(prob(m, \"the\", \"cat\", 0), 1 / 3) and _close(prob(m, \"cat\", \"sat\", 0), 0.5) and _close(prob(m, \"<s>\", \"the\", 0), 1.0)\nassert _close(prob(m, \"log\", \"</s>\", 0), 1.0) and _close(prob(m, \"the\", \"on\", 0), 0.0)\nassert _close(prob(m, \"unseen\", \"cat\", 0), 0.0)\n"
    },
    {
     "label": "Add-one smoothing",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\ncorpus = [\"the cat sat on the mat\", \"the dog sat on the log\", \"the cat saw the dog\"]\nm = train_bigram(corpus)\nassert _close(prob(m, \"the\", \"cat\"), 3 / 15), f\"(2 + 1)/(6 + 9) = 0.2; got {prob(m, 'the', 'cat')}\"\nassert _close(prob(m, \"the\", \"on\"), 1 / 15) and _close(prob(m, \"mat\", \"cat\"), 1 / 10)\nassert _close(sum(prob(m, \"the\", w) for w in [\"cat\", \"dog\", \"mat\", \"log\", \"sat\", \"saw\", \"on\", \"the\", \"</s>\"]), 1.0)\n"
    },
    {
     "label": "Perplexity",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\ncorpus = [\"the cat sat on the mat\", \"the dog sat on the log\", \"the cat saw the dog\"]\nm = train_bigram(corpus)\nassert _close(perplexity(m, corpus, 0), 1.71177, 1e-4), perplexity(m, corpus, 0)\nassert _close(perplexity(m, corpus), 4.6204, 1e-4), perplexity(m, corpus)\nassert _close(perplexity(m, [\"the dog saw the cat\"]), 5.9721, 1e-4)\nassert perplexity(m, [\"the dog saw the cat\"], 0) == float(\"inf\")\n"
    },
    {
     "label": "A different k",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nimport math\nm = train_bigram([\"a b\", \"a a b\"])\nassert _close(prob(m, \"a\", \"b\", 0.5), (2 + 0.5) / (3 + 0.5 * 3)), prob(m, \"a\", \"b\", 0.5)\nassert _close(perplexity(m, [\"b a\"], 0.5), math.exp(-(math.log(0.5 / 3.5) + math.log(0.5 / 3.5) + math.log(0.5 / 4.5)) / 3)), perplexity(m, [\"b a\"], 0.5)\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "attention",
   "title": "Scaled dot-product attention",
   "prompt": "<p>Write the attention computation from the notes, on lists of vectors (each a list of floats).</p>\n<ul>\n<li><code>softmax(xs)</code>: e<sup><em>x<sub>i</sub></em></sup>/Σ<sub><em>j</em></sub> e<sup><em>x<sub>j</sub></em></sup>, computed after subtracting max(<code>xs</code>) so that large scores don't overflow. Treat <code>-math.inf</code> entries as weight 0.</li>\n<li><code>attention(Q, K, V, causal=False)</code>: <code>Q</code> has one query vector per position, and <code>K</code> and <code>V</code> one key and one value per position, all keys and queries of length <em>d</em>. For each query <strong>q</strong><sub><em>i</em></sub>, the scores are <strong>q</strong><sub><em>i</em></sub> · <strong>k</strong><sub><em>j</em></sub> / √<em>d</em>; the weights are their softmax; the output is Σ<sub><em>j</em></sub> weight<sub><em>j</em></sub> <strong>v</strong><sub><em>j</em></sub>. With <code>causal=True</code>, query <em>i</em> may only look at positions <em>j</em> ≤ <em>i</em> (set the other scores to −∞). Return <code>(outputs, weights)</code>: the list of output vectors and the list of weight rows.</li>\n</ul>",
   "starter": "import math\n\ndef softmax(xs):\n    pass\n\ndef attention(Q, K, V, causal=False):\n    pass\n",
   "solution": "import math\n\ndef softmax(xs):\n    m = max(xs)\n    es = [math.exp(x - m) if x != -math.inf else 0.0 for x in xs]\n    s = sum(es)\n    return [e / s for e in es]\n\ndef attention(Q, K, V, causal=False):\n    d = len(K[0])\n    outs, ws = [], []\n    for i, q in enumerate(Q):\n        scores = [sum(a * b for a, b in zip(q, k)) / math.sqrt(d) if not causal or j <= i else -math.inf\n                  for j, k in enumerate(K)]\n        w = softmax(scores)\n        outs.append([sum(w[j] * V[j][c] for j in range(len(V))) for c in range(len(V[0]))])\n        ws.append(w)\n    return outs, ws\n",
   "tests": [
    {
     "label": "softmax",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nimport math\nassert _close(softmax([0.0, 0.0]), [0.5, 0.5]) and _close(softmax([1.0, 2.0, 3.0]), [0.09003057317038046, 0.24472847105479764, 0.6652409557748219])\nassert _close(softmax([1000.0, 1000.0]), [0.5, 0.5]), \"subtract the maximum before exponentiating\"\nassert _close(softmax([0.0, -math.inf]), [1.0, 0.0])\n"
    },
    {
     "label": "The notes' example",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nQ = [[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]\nK = [[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]\nV = [[1.0, 0.0], [0.0, 1.0], [0.5, 0.5]]\nout, w = attention(Q, K, V)\nassert _close(w[2], [0.2483, 0.2483, 0.5035], 1e-3), f\"weights for query 3: {w[2]}\"\nassert _close(out[2], [0.5, 0.5], 1e-6) and _close(out[0], [0.6017, 0.3983], 1e-3), f\"got {out}\"\n"
    },
    {
     "label": "Causal masking",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nQ = [[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]\nK = [[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]\nV = [[1.0, 0.0], [0.0, 1.0], [0.5, 0.5]]\nout, w = attention(Q, K, V, causal=True)\nassert _close(w[0], [1.0, 0.0, 0.0]) and _close(out[0], [1.0, 0.0]), f\"position 1 can only see itself: {w[0]}\"\nassert _close(w[1], [0.3302, 0.6698, 0.0], 1e-3) and _close(out[1], [0.3302, 0.6698], 1e-3), f\"got {w[1]}, {out[1]}\"\nassert _close(w[2], [0.2483, 0.2483, 0.5035], 1e-3)\n"
    },
    {
     "label": "Values of a different width, and weights that sum to 1",
     "type": "assert",
     "code": "def _close(a, b, tol=1e-6):\n    if isinstance(a, (list, tuple)) and isinstance(b, (list, tuple)):\n        return len(a) == len(b) and all(_close(x, y, tol) for x, y in zip(a, b))\n    if isinstance(a, dict) and isinstance(b, dict):\n        return a.keys() == b.keys() and all(_close(a[k], b[k], tol) for k in a)\n    if isinstance(a, (int, float)) and isinstance(b, (int, float)):\n        return abs(a - b) <= tol * max(1.0, abs(b))\n    return a == b\n\n\nimport random\nrng = random.Random(2)\nQ = [[rng.uniform(-2, 2) for _ in range(4)] for _ in range(5)]\nK = [[rng.uniform(-2, 2) for _ in range(4)] for _ in range(5)]\nV = [[rng.uniform(-1, 1) for _ in range(3)] for _ in range(5)]\nout, w = attention(Q, K, V)\nassert len(out) == 5 and all(len(o) == 3 for o in out)\nassert all(_close(sum(r), 1.0) for r in w)\ni = 3\nsc = [sum(a * b for a, b in zip(Q[i], k)) / 2 for k in K]\ne = [__import__(\"math\").exp(s) for s in sc]\nww = [x / sum(e) for x in e]\nassert _close(w[i], ww) and _close(out[i], [sum(ww[j] * V[j][c] for j in range(5)) for c in range(3)])\n",
     "hidden": true
    }
   ]
  }
 ]
});
