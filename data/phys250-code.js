/* Auto-graded simulation problems for PHYS 250, by lesson. Generated from a Python spec, so every
   string is JSON. Numerical answers are checked to a relative tolerance, as in PHYS 150. */
CSA.addCode("phys250", {
 "em1": [
  {
   "id": "superposition",
   "title": "Fields and forces by superposition",
   "prompt": "<p>Charges are tuples <code>(q, x, y)</code> in coulombs and metres. Write <code>field(x, y, charges)</code> returning the electric field <code>(Ex, Ey)</code> at a point, using <code>K = 8.99e9</code>, and <code>net_force(i, charges)</code> returning the force on <code>charges[i]</code> from all the others. If the point in <code>field</code> is exactly at a charge, raise <code>ValueError</code>.</p>",
   "starter": "import math\n\nK = 8.99e9\n\ndef field(x, y, charges):\n    pass\n\ndef net_force(i, charges):\n    pass\n",
   "hint": "<p>For <code>net_force</code>, compute the field at charge <em>i</em>'s position from the <em>other</em> charges, then multiply by its charge: <strong>F</strong> = <em>q</em><strong>E</strong>.</p>",
   "solution": "import math\n\nK = 8.99e9\n\ndef field(x, y, charges):\n    ex = ey = 0.0\n    for q, cx, cy in charges:\n        dx, dy = x - cx, y - cy\n        r = math.hypot(dx, dy)\n        if r == 0:\n            raise ValueError(\"field is undefined at a point charge\")\n        ex += K * q * dx / r**3\n        ey += K * q * dy / r**3\n    return ex, ey\n\ndef net_force(i, charges):\n    q, x, y = charges[i]\n    ex, ey = field(x, y, charges[:i] + charges[i + 1:])\n    return q * ex, q * ey\n",
   "tests": [
    {
     "label": "A single charge",
     "type": "assert",
     "code": "import math\nex, ey = field(0.5, 0, [(1e-9, 0, 0)])\nassert math.isclose(ex, 35.96, rel_tol=1e-6) and ey == 0\n"
    },
    {
     "label": "The notes' three charges",
     "type": "assert",
     "code": "import math\nfx, fy = net_force(0, [(1e-6, 0, 0), (1e-6, 1, 0), (-1e-6, 0, 1)])\nassert math.isclose(fx, -0.00899, rel_tol=1e-6) and math.isclose(fy, 0.00899, rel_tol=1e-6), (fx, fy)\n"
    },
    {
     "label": "Practice 1: midpoint field",
     "type": "assert",
     "code": "import math\nex, ey = field(0.02, 0, [(2e-6, 0, 0), (-3e-6, 0.04, 0)])\nassert math.isclose(ex, 1.12375e8, rel_tol=1e-6) and abs(ey) < 1e-6\n"
    },
    {
     "label": "Dipole field falls as 1/r³",
     "type": "assert",
     "code": "import math\nd = [(1e-9, -0.005, 0), (-1e-9, 0.005, 0)]\ne1, e2 = field(2, 0, d)[0], field(4, 0, d)[0]\nassert math.isclose(e1 / e2, 8, rel_tol=1e-3)\n"
    },
    {
     "label": "At a charge",
     "type": "raises",
     "call": "field(0, 0, [(1e-9, 0, 0)])",
     "error": "ValueError"
    }
   ]
  },
  {
   "id": "line_charge",
   "title": "The field of a charged rod",
   "prompt": "<p>A thin rod lies on the <em>x</em>-axis from <em>x</em> = −<em>L</em>/2 to <em>L</em>/2, carrying total charge <em>Q</em> spread evenly. Write <code>rod_field(Q, L, y, n=1000)</code> returning the field <em>E<sub>y</sub></em> at the point (0, <em>y</em>) on its perpendicular bisector, by dividing the rod into <em>n</em> equal pieces and treating each as a point charge at its midpoint. Then write <code>rod_field_exact(Q, L, y)</code>, the result of the integral: <em>E<sub>y</sub></em> = <em>kQ</em> / (<em>y</em> √(<em>y</em>² + <em>L</em>²/4)).</p>",
   "starter": "import math\n\nK = 8.99e9\n\ndef rod_field(Q, L, y, n=1000):\n    pass\n\ndef rod_field_exact(Q, L, y):\n    pass\n",
   "hint": "<p>Piece <em>i</em> has charge <em>Q</em>/<em>n</em> at <em>x</em> = −<em>L</em>/2 + (<em>i</em> + ½)<em>L</em>/<em>n</em>. By symmetry only the <em>y</em> parts of the pieces' fields add up: each contributes <em>k</em>(<em>Q</em>/<em>n</em>)<em>y</em>/<em>r</em>³.</p>",
   "solution": "import math\n\nK = 8.99e9\n\ndef rod_field(Q, L, y, n=1000):\n    total = 0.0\n    for i in range(n):\n        x = -L / 2 + (i + 0.5) * L / n\n        r = math.hypot(x, y)\n        total += K * (Q / n) * y / r**3\n    return total\n\ndef rod_field_exact(Q, L, y):\n    return K * Q / (y * math.sqrt(y**2 + L**2 / 4))\n",
   "tests": [
    {
     "label": "Sum matches the integral",
     "type": "assert",
     "code": "import math\nassert math.isclose(rod_field(1e-9, 1.0, 0.1), rod_field_exact(1e-9, 1.0, 0.1), rel_tol=1e-4)\n"
    },
    {
     "label": "Exact value",
     "type": "assert",
     "code": "import math\nassert math.isclose(rod_field_exact(1e-9, 1.0, 0.1), 176.31, rel_tol=1e-4), rod_field_exact(1e-9, 1.0, 0.1)\n"
    },
    {
     "label": "Far away it looks like a point charge",
     "type": "assert",
     "code": "import math\nassert math.isclose(rod_field(1e-9, 0.1, 50), 8.99e9 * 1e-9 / 2500, rel_tol=1e-5)\n"
    },
    {
     "label": "More pieces, better answer",
     "type": "assert",
     "code": "exact = rod_field_exact(1e-9, 1.0, 0.02)\nassert abs(rod_field(1e-9, 1.0, 0.02, n=10) - exact) > abs(rod_field(1e-9, 1.0, 0.02, n=1000) - exact)\n"
    }
   ]
  }
 ],
 "em2": [
  {
   "id": "relaxation",
   "title": "Solving for potential by relaxation",
   "prompt": "<p>Write <code>relax(grid, fixed, tol=1e-6, max_sweeps=100000)</code>. <code>grid</code> is a list of rows of potentials; <code>fixed</code> is a set of <code>(row, col)</code> positions whose values never change; every other position is interior and not on the grid's edge. Repeat Jacobi sweeps (every free point becomes the average of its four neighbours, all computed from the previous sweep's values) until the largest change in a sweep is below <code>tol</code>. Return <code>(new_grid, sweeps)</code> without modifying the input grid. Raise <code>RuntimeError</code> if it hasn't converged after <code>max_sweeps</code>.</p>",
   "starter": "def relax(grid, fixed, tol=1e-6, max_sweeps=100000):\n    pass\n",
   "hint": "<p>Start from the notes' <code>relax</code>; track <code>max(abs(new - old))</code> over the free points in each sweep. Copy the grid first, with <code>[row[:] for row in grid]</code>.</p>",
   "solution": "def relax(grid, fixed, tol=1e-6, max_sweeps=100000):\n    g = [row[:] for row in grid]\n    rows, cols = len(g), len(g[0])\n    free = [(i, j) for i in range(rows) for j in range(cols) if (i, j) not in fixed]\n    for sweep in range(1, max_sweeps + 1):\n        new = [row[:] for row in g]\n        change = 0.0\n        for i, j in free:\n            new[i][j] = (g[i - 1][j] + g[i + 1][j] + g[i][j - 1] + g[i][j + 1]) / 4\n            change = max(change, abs(new[i][j] - g[i][j]))\n        g = new\n        if change < tol:\n            return g, sweep\n    raise RuntimeError(\"did not converge\")\n",
   "tests": [
    {
     "label": "The notes' box: centre at 2.5 V",
     "type": "assert",
     "code": "n = 21\ngrid = [[10.0 if i == 0 else 0.0 for j in range(n)] for i in range(n)]\nfor i in range(1, n):\n    grid[i][0] = grid[i][n - 1] = 0.0\nfixed = {(i, j) for i in range(n) for j in range(n) if i in (0, n - 1) or j in (0, n - 1)}\nv, sweeps = relax(grid, fixed)\nassert abs(v[10][10] - 2.5) < 1e-3, v[10][10]\nassert grid[10][10] == 0.0, \"the input grid was modified\"\n"
    },
    {
     "label": "Parallel plates: a straight-line potential",
     "type": "assert",
     "code": "rows, cols = 11, 5\ngrid = [[0.0] * cols for _ in range(rows)]\nfor j in range(cols):\n    grid[0][j] = 10.0\nfixed = {(i, j) for i in range(rows) for j in range(cols) if i in (0, rows - 1) or j in (0, cols - 1)}\nfor i in range(rows):\n    grid[i][0] = grid[i][cols - 1] = 10.0 * (rows - 1 - i) / (rows - 1)\nv, _ = relax(grid, fixed, tol=1e-9)\nfor i in range(rows):\n    assert abs(v[i][2] - 10.0 * (rows - 1 - i) / (rows - 1)) < 1e-5, (i, v[i][2])\n"
    },
    {
     "label": "Already solved: one sweep",
     "type": "assert",
     "code": "grid = [[1.0] * 4 for _ in range(4)]\nfixed = {(i, j) for i in range(4) for j in range(4) if i in (0, 3) or j in (0, 3)}\nassert relax(grid, fixed)[1] == 1\n"
    },
    {
     "label": "Not converged",
     "type": "raises",
     "call": "relax([[0, 0, 0], [0, 5, 0], [0, 0, 0]], {(0, 0), (0, 1), (0, 2), (1, 0), (1, 2), (2, 0), (2, 1), (2, 2)}, tol=-1, max_sweeps=5)",
     "error": "RuntimeError"
    }
   ]
  },
  {
   "id": "capacitor_network",
   "title": "Capacitor networks",
   "prompt": "<p>A capacitor network is described by nested tuples: a number is a single capacitor (in farads), <code>(\"s\", a, b, ...)</code> is the parts in series, and <code>(\"p\", a, b, ...)</code> the parts in parallel. As the notes show, capacitances in parallel add, and in series their reciprocals add: 1/<em>C</em> = 1/<em>C</em><sub>1</sub> + 1/<em>C</em><sub>2</sub> + …. (Lesson 3 will show that resistors combine the opposite way.) Write <code>capacitance(net)</code> recursively, and <code>stored_energy(net, volts)</code>, the total energy ½<em>CV</em>² when the whole network is connected across <code>volts</code>. Raise <code>ValueError</code> for an unknown tag, an empty group, or a capacitance that isn't positive.</p>",
   "starter": "def capacitance(net):\n    pass\n\ndef stored_energy(net, volts):\n    pass\n",
   "hint": "<p>If <code>net</code> is a number, return it (after checking it). Otherwise compute each part's capacitance recursively, then combine: <code>sum(parts)</code> for parallel, <code>1 / sum(1 / c for c in parts)</code> for series.</p>",
   "solution": "def capacitance(net):\n    if isinstance(net, (int, float)):\n        if net <= 0:\n            raise ValueError(\"capacitance must be positive\")\n        return float(net)\n    tag, *parts = net\n    if not parts or tag not in (\"s\", \"p\"):\n        raise ValueError(f\"bad network: {net!r}\")\n    cs = [capacitance(p) for p in parts]\n    return sum(cs) if tag == \"p\" else 1 / sum(1 / c for c in cs)\n\ndef stored_energy(net, volts):\n    return 0.5 * capacitance(net) * volts**2\n",
   "tests": [
    {
     "label": "Series and parallel",
     "type": "assert",
     "code": "import math\nassert math.isclose(capacitance((\"p\", 2e-6, 3e-6)), 5e-6)\nassert math.isclose(capacitance((\"s\", 2e-6, 2e-6)), 1e-6)\nassert math.isclose(capacitance((\"s\", 3e-6, 6e-6)), 2e-6)\n"
    },
    {
     "label": "Nested",
     "type": "assert",
     "code": "import math\nassert math.isclose(capacitance(('s', ('p', 1e-6, 3e-6), 4e-6)), 2e-6)\n"
    },
    {
     "label": "Energy",
     "type": "assert",
     "code": "import math\nassert math.isclose(stored_energy(('p', 50e-6, 50e-6), 300), 4.5)\n"
    },
    {
     "label": "Bad networks",
     "type": "assert",
     "code": "for bad in ((\"x\", 1e-6), (\"s\",), -1e-6, (\"p\", 1e-6, 0)):\n    try:\n        capacitance(bad)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f\"no ValueError for {bad!r}\")\n"
    }
   ]
  }
 ],
 "em3": [
  {
   "id": "nodal_analysis",
   "title": "Solving circuits by nodal analysis",
   "prompt": "<p>Write <code>solve_circuit(resistors, fixed)</code>. Nodes are named by strings. <code>resistors</code> is a list of <code>(a, b, ohms)</code>, and <code>fixed</code> is a dict giving the potential of some nodes (ground, and the terminals of voltage sources). Return a dict of the potential of every node. Build one junction-rule equation per unknown node, as in the notes, and solve the linear system with Gaussian elimination. Raise <code>ValueError</code> if a resistance isn't positive, and if the system is singular (some node isn't connected to any fixed node).</p>",
   "starter": "def solve_circuit(resistors, fixed):\n    pass\n",
   "hint": "<p>Number the unknown nodes 0, 1, …. For each resistor between nodes <em>a</em> and <em>b</em> with conductance <em>g</em> = 1/<em>R</em>: if <em>a</em> is unknown, add <em>g</em> to its diagonal entry, and then either subtract <em>g</em> from entry (<em>a</em>, <em>b</em>) if <em>b</em> is unknown, or add <em>g</em> × <em>V<sub>b</sub></em> to <em>a</em>'s right-hand side if <em>b</em> is fixed. Do the same with <em>a</em> and <em>b</em> swapped. With partial pivoting, a pivot of (nearly) zero means the system is singular.</p>",
   "solution": "def solve_circuit(resistors, fixed):\n    nodes = []\n    for a, b, r in resistors:\n        if r <= 0:\n            raise ValueError(\"resistance must be positive\")\n        for n in (a, b):\n            if n not in fixed and n not in nodes:\n                nodes.append(n)\n    idx = {n: i for i, n in enumerate(nodes)}\n    m = len(nodes)\n    A = [[0.0] * m for _ in range(m)]\n    rhs = [0.0] * m\n    for a, b, r in resistors:\n        g = 1 / r\n        for x, y in ((a, b), (b, a)):\n            if x in idx:\n                A[idx[x]][idx[x]] += g\n                if y in idx:\n                    A[idx[x]][idx[y]] -= g\n                else:\n                    rhs[idx[x]] += g * fixed[y]\n    M = [row + [v] for row, v in zip(A, rhs)]\n    for c in range(m):\n        p = max(range(c, m), key=lambda r: abs(M[r][c]))\n        if abs(M[p][c]) < 1e-12:\n            raise ValueError(\"singular circuit: a node is not connected to a fixed potential\")\n        M[c], M[p] = M[p], M[c]\n        for r in range(c + 1, m):\n            f = M[r][c] / M[c][c]\n            for k in range(c, m + 1):\n                M[r][k] -= f * M[c][k]\n    x = [0.0] * m\n    for r in range(m - 1, -1, -1):\n        x[r] = (M[r][m] - sum(M[r][k] * x[k] for k in range(r + 1, m))) / M[r][r]\n    result = dict(fixed)\n    result.update({n: x[idx[n]] for n in nodes})\n    return result\n",
   "tests": [
    {
     "label": "The notes' circuit",
     "type": "assert",
     "code": "v = solve_circuit([(\"S\", \"A\", 1000), (\"A\", \"G\", 2000), (\"A\", \"B\", 1000), (\"B\", \"G\", 1000)], {\"S\": 10, \"G\": 0})\nassert abs(v[\"A\"] - 5) < 1e-9 and abs(v[\"B\"] - 2.5) < 1e-9, v\n"
    },
    {
     "label": "A voltage divider",
     "type": "assert",
     "code": "v = solve_circuit([(\"top\", \"mid\", 300), (\"mid\", \"gnd\", 600)], {\"top\": 9, \"gnd\": 0})\nassert abs(v[\"mid\"] - 6) < 1e-9\n"
    },
    {
     "label": "A Wheatstone bridge",
     "type": "assert",
     "code": "rs = [(\"S\", \"L\", 100), (\"L\", \"G\", 200), (\"S\", \"R\", 150), (\"R\", \"G\", 300), (\"L\", \"R\", 50)]\nv = solve_circuit(rs, {\"S\": 12, \"G\": 0})\nassert abs(v[\"L\"] - 8) < 1e-9 and abs(v[\"R\"] - 8) < 1e-9, v\n"
    },
    {
     "label": "Junction rule holds everywhere",
     "type": "assert",
     "hidden": true,
     "code": "import random\nrandom.seed(5)\nnames = [\"a\", \"b\", \"c\", \"d\", \"e\"]\nrs = [(\"S\", \"a\", 100)] + [(names[i], names[i + 1], random.uniform(10, 1000)) for i in range(4)] + \\\n     [(n, \"G\", random.uniform(10, 1000)) for n in names] + [(\"a\", \"d\", 330), (\"b\", \"e\", 220)]\nv = solve_circuit(rs, {\"S\": 5, \"G\": 0})\nfor n in names:\n    net = sum((v[n] - v[b]) / r for a, b, r in rs if a == n) + sum((v[n] - v[a]) / r for a, b, r in rs if b == n)\n    assert abs(net) < 1e-9, (n, net)\n"
    },
    {
     "label": "A floating node",
     "type": "raises",
     "call": "solve_circuit([('S', 'G', 10), ('X', 'Y', 5)], {'S': 1, 'G': 0})",
     "error": "ValueError"
    }
   ]
  },
  {
   "id": "rc_timing",
   "title": "RC delay",
   "prompt": "<p>A logic gate's output charges the next gate's input like an RC circuit. Write <code>rc_time(vs, r, c, fraction, dt=None)</code> that simulates charging from 0 V with Euler's method (<code>v += (vs - v) / (r * c) * dt</code>) and returns the time at which <code>v</code> first reaches <code>fraction * vs</code>. If <code>dt</code> is <code>None</code>, use <em>RC</em>/10,000. Also write <code>rc_time_exact(r, c, fraction)</code>, from solving <em>V<sub>s</sub></em>(1 − e<sup>−<em>t</em>/<em>RC</em></sup>) = fraction × <em>V<sub>s</sub></em>. Raise <code>ValueError</code> unless 0 &lt; fraction &lt; 1.</p>",
   "starter": "import math\n\ndef rc_time(vs, r, c, fraction, dt=None):\n    pass\n\ndef rc_time_exact(r, c, fraction):\n    pass\n",
   "hint": "<p>Exact: <em>t</em> = −<em>RC</em> ln(1 − fraction). In the simulation, count steps and return <code>steps * dt</code>, which avoids adding up rounding errors in <code>t</code>.</p>",
   "solution": "import math\n\ndef rc_time(vs, r, c, fraction, dt=None):\n    if not 0 < fraction < 1:\n        raise ValueError(\"fraction must be between 0 and 1\")\n    tau = r * c\n    dt = tau / 10000 if dt is None else dt\n    v, steps = 0.0, 0\n    while v < fraction * vs:\n        v += (vs - v) / tau * dt\n        steps += 1\n    return steps * dt\n\ndef rc_time_exact(r, c, fraction):\n    if not 0 < fraction < 1:\n        raise ValueError(\"fraction must be between 0 and 1\")\n    return -r * c * math.log(1 - fraction)\n",
   "tests": [
    {
     "label": "One time constant reaches 63%",
     "type": "assert",
     "code": "import math\nassert math.isclose(rc_time_exact(1e3, 1e-6, 1 - math.exp(-1)), 1e-3)\n"
    },
    {
     "label": "Simulation agrees with the formula",
     "type": "assert",
     "code": "import math\nassert math.isclose(rc_time(5, 1e3, 1e-6, 0.5), rc_time_exact(1e3, 1e-6, 0.5), rel_tol=1e-3)\n"
    },
    {
     "label": "A gate: 1 kΩ driving 2 fF to 90%",
     "type": "assert",
     "code": "import math\nassert math.isclose(rc_time_exact(1e3, 2e-15, 0.9), 4.605e-12, rel_tol=1e-3)\n"
    },
    {
     "label": "Coarse steps are less accurate",
     "type": "assert",
     "code": "ex = rc_time_exact(1, 1, 0.9)\nassert abs(rc_time(1, 1, 1, 0.9, dt=0.1) - ex) > abs(rc_time(1, 1, 1, 0.9, dt=0.001) - ex)\n"
    },
    {
     "label": "Bad fraction",
     "type": "raises",
     "call": "rc_time(5, 1, 1, 1.0)",
     "error": "ValueError"
    }
   ]
  }
 ],
 "em4": [
  {
   "id": "boris_orbit",
   "title": "A charged particle in a magnetic field",
   "prompt": "<p>Write <code>simulate(q, m, B, v0, dt, steps)</code> that follows a particle starting at the origin with velocity <code>v0</code> in a uniform magnetic field <code>B</code> (both 3-tuples), using the Boris velocity update from the notes, and then moving the position with the new velocity (<code>x += v * dt</code>). Return the list of positions, including the start, as 3-tuples (<code>steps + 1</code> of them). Write the <code>cross</code> and <code>dot</code> helpers too.</p>",
   "starter": "import math\n\ndef cross(a, b):\n    pass\n\ndef dot(a, b):\n    pass\n\ndef simulate(q, m, B, v0, dt, steps):\n    pass\n",
   "hint": "<p>The notes' <code>boris_step</code> takes <code>q_m = q / m</code>. Each step: <code>v = boris_step(v, q / m, B, dt)</code>, then add <code>v * dt</code> to each coordinate of the position.</p>",
   "solution": "import math\n\ndef cross(a, b):\n    return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])\n\ndef dot(a, b):\n    return sum(x * y for x, y in zip(a, b))\n\ndef _boris(v, q_m, B, dt):\n    t = tuple(q_m * b * dt / 2 for b in B)\n    s = tuple(2 * ti / (1 + dot(t, t)) for ti in t)\n    v1 = tuple(vi + ci for vi, ci in zip(v, cross(v, t)))\n    return tuple(vi + ci for vi, ci in zip(v, cross(v1, s)))\n\ndef simulate(q, m, B, v0, dt, steps):\n    x, v = (0.0, 0.0, 0.0), tuple(v0)\n    path = [x]\n    for _ in range(steps):\n        v = _boris(v, q / m, B, dt)\n        x = tuple(xi + vi * dt for xi, vi in zip(x, v))\n        path.append(x)\n    return path\n",
   "tests": [
    {
     "label": "Cross and dot products",
     "type": "assert",
     "code": "assert cross((1, 2, 0), (0, 1, 3)) == (6, -3, 1) and dot((1, 2, 3), (4, 5, 6)) == 32\n"
    },
    {
     "label": "Circle radius is mv/(qB)",
     "type": "assert",
     "code": "q, m, B, v = 1.602e-19, 9.109e-31, 0.01, 2e6\nT = 2 * 3.141592653589793 * m / (q * B)\npath = simulate(-q, m, (0, 0, B), (v, 0, 0), T / 2000, 2000)\nys = [p[1] for p in path]\ndiameter = max(ys) - min(ys)\nassert abs(diameter / 2 - m * v / (q * B)) / (m * v / (q * B)) < 1e-3, diameter\n"
    },
    {
     "label": "Back to the start after one period",
     "type": "assert",
     "code": "import math\npath = simulate(1.0, 1.0, (0, 0, 1.0), (1.0, 0, 0), 2 * math.pi / 1000, 1000)\nassert math.dist(path[-1], (0, 0, 0)) < 1e-2, path[-1]\nassert len(path) == 1001\n"
    },
    {
     "label": "Velocity along B is unaffected: a helix",
     "type": "assert",
     "code": "import math\npath = simulate(1.0, 1.0, (0, 0, 2.0), (1.0, 0, 0.5), 0.001, 3000)\nassert math.isclose(path[-1][2], 0.5 * 3.0, rel_tol=1e-9)\n"
    }
   ]
  },
  {
   "id": "wire_fields",
   "title": "Fields of parallel wires",
   "prompt": "<p>Long straight wires run perpendicular to the page (along <em>z</em>), each given as <code>(I, x, y)</code> with current <em>I</em> in amperes (positive means out of the page, along +<em>z</em>) at position (<em>x</em>, <em>y</em>) in metres. Write <code>wire_field(x, y, wires)</code> returning the magnetic field <code>(Bx, By)</code> at a point. Each wire's field has magnitude <em>μ</em><sub>0</sub><em>I</em>/(2π<em>r</em>), circling anticlockwise (seen from +<em>z</em>) for positive <em>I</em>: its direction is <strong>ẑ</strong> × <strong>r̂</strong>, where <strong>r̂</strong> is the unit vector from the wire to the point. Then write <code>force_per_metre(i, wires)</code>, the force per metre of length <code>(Fx, Fy)</code> on wire <em>i</em> from the others: <em>I</em> <strong>ẑ</strong> × <strong>B</strong>.</p>",
   "starter": "import math\n\nMU0 = 4 * math.pi * 1e-7\n\ndef wire_field(x, y, wires):\n    pass\n\ndef force_per_metre(i, wires):\n    pass\n",
   "hint": "<p><strong>ẑ</strong> × (<em>a</em>, <em>b</em>, 0) = (−<em>b</em>, <em>a</em>, 0). So a wire at the origin gives <em>B</em> = <em>μ</em><sub>0</sub><em>I</em>/(2π<em>r</em>²) × (−<em>y</em>, <em>x</em>), and the force on a wire with current <em>I</em> in field (<em>B<sub>x</sub></em>, <em>B<sub>y</sub></em>) is <em>I</em>(−<em>B<sub>y</sub></em>, <em>B<sub>x</sub></em>).</p>",
   "solution": "import math\n\nMU0 = 4 * math.pi * 1e-7\n\ndef wire_field(x, y, wires):\n    bx = by = 0.0\n    for I, wx, wy in wires:\n        dx, dy = x - wx, y - wy\n        r2 = dx * dx + dy * dy\n        if r2 == 0:\n            raise ValueError(\"field is undefined on a wire\")\n        k = MU0 * I / (2 * math.pi * r2)\n        bx += -k * dy\n        by += k * dx\n    return bx, by\n\ndef force_per_metre(i, wires):\n    I, x, y = wires[i]\n    bx, by = wire_field(x, y, wires[:i] + wires[i + 1:])\n    return -I * by, I * bx\n",
   "tests": [
    {
     "label": "Field 1 cm from 10 A",
     "type": "assert",
     "code": "import math\nbx, by = wire_field(0.01, 0, [(10, 0, 0)])\nassert abs(bx) < 1e-15 and math.isclose(by, 2e-4)\n"
    },
    {
     "label": "Parallel currents attract",
     "type": "assert",
     "code": "import math\nfx, fy = force_per_metre(1, [(5, 0, 0), (5, 0.1, 0)])\nassert math.isclose(fx, -5e-5) and abs(fy) < 1e-15, (fx, fy)\n"
    },
    {
     "label": "Opposite currents repel",
     "type": "assert",
     "code": "fx, fy = force_per_metre(1, [(5, 0, 0), (-5, 0.1, 0)])\nassert fx > 0\n"
    },
    {
     "label": "Opposite currents cancel far away",
     "type": "assert",
     "code": "near = abs(wire_field(0, 0.1, [(1, -0.005, 0), (-1, 0.005, 0)])[1])\nfar = abs(wire_field(0, 1.0, [(1, -0.005, 0), (-1, 0.005, 0)])[1])\nassert 90 < near / far < 110, near / far\n"
    }
   ]
  }
 ],
 "em5": [
  {
   "id": "faraday_emf",
   "title": "EMF from changing flux",
   "prompt": "<p>A data logger records the magnetic flux through a coil every <code>dt</code> seconds. Write <code>emf_series(fluxes, dt, turns=1)</code> returning the EMF at each sample, −<em>N</em> <em>d</em>Φ/<em>dt</em>, using central differences for interior samples and one-sided differences, (Φ<sub>1</sub> − Φ<sub>0</sub>)/<em>dt</em> and (Φ<sub>n−1</sub> − Φ<sub>n−2</sub>)/<em>dt</em>, at the two ends. Then write <code>peak_emf(n, b, area, freq)</code> for a generator, <em>NBAω</em>. Raise <code>ValueError</code> for fewer than 2 samples.</p>",
   "starter": "import math\n\ndef emf_series(fluxes, dt, turns=1):\n    pass\n\ndef peak_emf(n, b, area, freq):\n    pass\n",
   "hint": "<p>The central difference at sample <em>i</em> is (Φ<sub><em>i</em>+1</sub> − Φ<sub><em>i</em>−1</sub>)/(2 <em>dt</em>). Remember the minus sign and the factor <em>N</em>, and <em>ω</em> = 2π<em>f</em>.</p>",
   "solution": "import math\n\ndef emf_series(fluxes, dt, turns=1):\n    n = len(fluxes)\n    if n < 2:\n        raise ValueError(\"need at least two samples\")\n    out = []\n    for i in range(n):\n        if i == 0:\n            d = (fluxes[1] - fluxes[0]) / dt\n        elif i == n - 1:\n            d = (fluxes[-1] - fluxes[-2]) / dt\n        else:\n            d = (fluxes[i + 1] - fluxes[i - 1]) / (2 * dt)\n        out.append(-turns * d)\n    return out\n\ndef peak_emf(n, b, area, freq):\n    return n * b * area * 2 * math.pi * freq\n",
   "tests": [
    {
     "label": "Steadily rising flux",
     "type": "assert",
     "code": "import math\nassert all(math.isclose(e, -0.04) for e in emf_series([0, 0.002, 0.004, 0.006], 0.05))\n"
    },
    {
     "label": "A rotating coil",
     "type": "assert",
     "code": "import math\nN, B, A, f = 200, 0.1, 0.01, 60\nw = 2 * math.pi * f\ndt = 1e-5\nts = [i * dt for i in range(2000)]\nemf = emf_series([B * A * math.cos(w * t) for t in ts], dt, N)\nassert all(abs(e - N * B * A * w * math.sin(w * t)) < 0.01 for e, t in zip(emf[1:-1], ts[1:-1]))\n"
    },
    {
     "label": "Peak EMF",
     "type": "assert",
     "code": "import math\nassert math.isclose(peak_emf(300, 0.4, 0.05, 25), 942.4777960769379)\n"
    },
    {
     "label": "Too few samples",
     "type": "raises",
     "call": "emf_series([0.1], 0.01)",
     "error": "ValueError"
    }
   ]
  },
  {
   "id": "lc_oscillator",
   "title": "An LC oscillator",
   "prompt": "<p>Write <code>lc_simulate(L, C, q0, dt, steps, R=0.0)</code> that simulates a capacitor (initial charge <code>q0</code>, initial current 0) discharging through an inductor and resistor with semi-implicit Euler: update the current first, <code>i += (-q / C - R * i) / L * dt</code>, then the charge, <code>q += i * dt</code>. Return the list of <code>(q, i)</code> pairs, including the start. Then write <code>energy(q, i, L, C)</code>, the total energy <em>q</em>²/(2<em>C</em>) + <em>Li</em>²/2, and <code>period(L, C)</code>, 2π√(<em>LC</em>).</p>",
   "starter": "import math\n\ndef lc_simulate(L, C, q0, dt, steps, R=0.0):\n    pass\n\ndef energy(q, i, L, C):\n    pass\n\ndef period(L, C):\n    pass\n",
   "hint": "<p>This is PHYS 150's mass on a spring with <em>q</em> for position, <em>i</em> for velocity, <em>L</em> for mass and 1/<em>C</em> for the spring constant.</p>",
   "solution": "import math\n\ndef lc_simulate(L, C, q0, dt, steps, R=0.0):\n    q, i = q0, 0.0\n    out = [(q, i)]\n    for _ in range(steps):\n        i += (-q / C - R * i) / L * dt\n        q += i * dt\n        out.append((q, i))\n    return out\n\ndef energy(q, i, L, C):\n    return q * q / (2 * C) + L * i * i / 2\n\ndef period(L, C):\n    return 2 * math.pi * math.sqrt(L * C)\n",
   "tests": [
    {
     "label": "Period of 1 mH and 1 nF",
     "type": "assert",
     "code": "import math\nassert math.isclose(period(1e-3, 1e-9), 6.283185307179586e-06)\n"
    },
    {
     "label": "Back to the start after one period",
     "type": "assert",
     "code": "import math\nL, C = 1e-3, 1e-9\nT = period(L, C)\nout = lc_simulate(L, C, 1e-6, T / 10000, 10000)\nassert len(out) == 10001\nassert math.isclose(out[-1][0], 1e-6, rel_tol=1e-3), out[-1]\nassert math.isclose(out[5000][0], -1e-6, rel_tol=1e-3), out[5000]\n"
    },
    {
     "label": "Energy stays in a narrow band",
     "type": "assert",
     "code": "L, C = 1e-3, 1e-9\nout = lc_simulate(L, C, 1e-6, period(L, C) / 200, 20000)\nes = [energy(q, i, L, C) for q, i in out]\nassert (max(es) - min(es)) / es[0] < 0.05, (max(es), min(es))\n"
    },
    {
     "label": "Resistance damps the oscillation",
     "type": "assert",
     "code": "import math\nL, C, R = 1e-3, 1e-9, 100\nout = lc_simulate(L, C, 1e-6, 1e-9, 20000, R=R)\ne0, e20 = energy(*out[0], L, C), energy(*out[20000], L, C)\nassert math.isclose(e20 / e0, math.exp(-R * 20e-6 / L), rel_tol=0.1), e20 / e0\n"
    }
   ]
  }
 ],
 "em6": [
  {
   "id": "fdtd_problem",
   "title": "Simulating a light pulse",
   "prompt": "<p>Write <code>fdtd(n_cells, steps, courant=0.5, source_at=50, width=10, delay=30)</code>, the notes' one-dimensional FDTD simulation, returning the final list of <em>E</em> values. Each step: update every <code>b[i]</code> for <em>i</em> from 0 to <code>n_cells - 2</code>, then every <code>e[i]</code> for <em>i</em> from 1 to <code>n_cells - 1</code>, then add the source <code>exp(-((step - delay) / width) ** 2)</code> to <code>e[source_at]</code>. Raise <code>ValueError</code> if <code>courant</code> is not in (0, 1], since the method is unstable beyond 1. Then write <code>pulse_position(e, start)</code>, the index of the largest |<em>E</em>| at or beyond index <code>start</code>.</p>",
   "starter": "import math\n\ndef fdtd(n_cells, steps, courant=0.5, source_at=50, width=10, delay=30):\n    pass\n\ndef pulse_position(e, start):\n    pass\n",
   "hint": "<p>Copy the notes' code and add the parameters. The pulse moves <code>courant</code> cells per step after it is injected at step <code>delay</code>.</p>",
   "solution": "import math\n\ndef fdtd(n_cells, steps, courant=0.5, source_at=50, width=10, delay=30):\n    if not 0 < courant <= 1:\n        raise ValueError(\"Courant number must be in (0, 1]\")\n    e = [0.0] * n_cells\n    b = [0.0] * n_cells\n    for step in range(steps):\n        for i in range(n_cells - 1):\n            b[i] -= courant * (e[i + 1] - e[i])\n        for i in range(1, n_cells):\n            e[i] -= courant * (b[i] - b[i - 1])\n        e[source_at] += math.exp(-((step - delay) / width) ** 2)\n    return e\n\ndef pulse_position(e, start):\n    return max(range(start, len(e)), key=lambda i: abs(e[i]))\n",
   "tests": [
    {
     "label": "The notes' run",
     "call": "pulse_position(fdtd(400, 300), 100)",
     "expect": "184"
    },
    {
     "label": "Speed is the Courant number",
     "type": "assert",
     "code": "p1 = pulse_position(fdtd(600, 200), 100)\np2 = pulse_position(fdtd(600, 400), 100)\nassert abs((p2 - p1) / 200 - 0.5) < 0.02, (p1, p2)\n"
    },
    {
     "label": "At Courant 1, one cell per step",
     "type": "assert",
     "code": "p = pulse_position(fdtd(500, 330, courant=1.0), 100)\nassert abs(p - (50 + 300)) <= 1, p\n"
    },
    {
     "label": "Unstable Courant number refused",
     "type": "raises",
     "call": "fdtd(100, 10, courant=1.05)",
     "error": "ValueError"
    }
   ]
  },
  {
   "id": "light_calcs",
   "title": "Wavelengths, photons and latency",
   "prompt": "<p>Write three functions, using <code>C = 299792458</code> m/s, <code>H = 6.62607015e-34</code> J·s and <code>EV = 1.602176634e-19</code> J:</p>\n<ul>\n<li><code>wavelength(freq)</code> in metres;</li>\n<li><code>photon_ev(wavelength_m)</code>, a photon's energy in electron-volts;</li>\n<li><code>min_latency_ms(distance_km, medium=\"fibre\")</code>, the one-way travel time in milliseconds at the speed of light in that medium: <code>\"vacuum\"</code> (<em>c</em>), <code>\"fibre\"</code> (<em>c</em>/1.47) or <code>\"copper\"</code> (0.66<em>c</em>). Raise <code>ValueError</code> for other media.</li>\n</ul>",
   "starter": "C = 299792458\nH = 6.62607015e-34\nEV = 1.602176634e-19\n\ndef wavelength(freq):\n    pass\n\ndef photon_ev(wavelength_m):\n    pass\n\ndef min_latency_ms(distance_km, medium=\"fibre\"):\n    pass\n",
   "hint": "<p><em>λ</em> = <em>c</em>/<em>f</em>; <em>E</em> = <em>hc</em>/<em>λ</em>, then divide by <code>EV</code>; time = distance/speed, converting kilometres to metres and seconds to milliseconds.</p>",
   "solution": "C = 299792458\nH = 6.62607015e-34\nEV = 1.602176634e-19\n\ndef wavelength(freq):\n    return C / freq\n\ndef photon_ev(wavelength_m):\n    return H * C / wavelength_m / EV\n\nSPEEDS = {\"vacuum\": C, \"fibre\": C / 1.47, \"copper\": 0.66 * C}\n\ndef min_latency_ms(distance_km, medium=\"fibre\"):\n    if medium not in SPEEDS:\n        raise ValueError(f\"unknown medium: {medium}\")\n    return distance_km * 1000 / SPEEDS[medium] * 1000\n",
   "tests": [
    {
     "label": "Wi-Fi wavelength",
     "type": "assert",
     "code": "import math\nassert math.isclose(wavelength(2.4e9), 0.12491352416666667)\n"
    },
    {
     "label": "Photon energies",
     "type": "assert",
     "code": "import math\nassert math.isclose(photon_ev(550e-9), 2.2543, rel_tol=1e-4), photon_ev(550e-9)\nassert math.isclose(photon_ev(1.55e-6), 0.79990, rel_tol=1e-4), photon_ev(1.55e-6)\n"
    },
    {
     "label": "New York to London",
     "type": "assert",
     "code": "import math\nassert math.isclose(min_latency_ms(5600), 27.46, rel_tol=1e-3), min_latency_ms(5600)\nassert math.isclose(min_latency_ms(5600, \"vacuum\"), 18.68, rel_tol=1e-3)\n"
    },
    {
     "label": "Unknown medium",
     "type": "raises",
     "call": "min_latency_ms(10, 'air')",
     "error": "ValueError"
    }
   ]
  }
 ]
});
