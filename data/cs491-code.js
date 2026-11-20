/* Auto-graded programming problems for CS 491, by lesson. Generated from a Python spec, so every
   string is JSON. Each problem is a tool a capstone team (or a thesis student) uses in the second term. */
CSA.addCode("cs491", {
 "cx1": [
  {
   "id": "commit_scope",
   "title": "Committing to a scope",
   "prompt": "<p>The second-term plan commits to the stories the team can finish with a stated confidence, and lists the rest as stretch goals (the notes' section on committing). Write <code>commit_scope(stories, capacity, confidence=0.8)</code>.</p>\n<ul>\n<li><code>stories</code> is a list of <code>(id, priority, (a, m, b))</code> in the order the team wants them, where priority is <code>\"must\"</code>, <code>\"should\"</code> or <code>\"could\"</code> and <code>(a, m, b)</code> is a three-point estimate in hours (CS 490 Lesson 3). <code>capacity</code> is the building hours left.</li>\n<li>Every must is committed, in list order. Then go through the other stories in list order: commit a story if, with it added, the probability that the committed total is at most <code>capacity</code> is still at least <code>confidence</code>; otherwise defer it and go on to the next (a smaller story later may still fit). Apply this test to every non-must even when the musts alone fall short of <code>confidence</code>; for a confidence above 0.5 that defers them all, since adding work can't raise the probability back up.</li>\n<li>Treat the total as normal, with mean the sum of PERT means (<em>a</em> + 4<em>m</em> + <em>b</em>)/6 and variance the sum of the variances ((<em>b</em> − <em>a</em>)/6)²; the probability is Φ((capacity − mean)/sd), with Φ(<em>z</em>) = (1 + erf(<em>z</em>/√2))/2. If the variance is 0, the probability is 1.0 when capacity ≥ mean and 0.0 otherwise.</li>\n</ul>\n<p>Return a dict with keys <code>\"committed\"</code> and <code>\"deferred\"</code> (lists of ids), <code>\"musts_fit\"</code> (whether the musts alone reach the confidence), and <code>\"mean\"</code>, <code>\"sd\"</code> (rounded to 1 place) and <code>\"probability\"</code> (rounded to 3 places) for the committed set. Raise <code>ValueError</code> for an unknown priority or an estimate that doesn't satisfy 0 ≤ <em>a</em> ≤ <em>m</em> ≤ <em>b</em>.</p>",
   "starter": "import math\n\ndef commit_scope(stories, capacity, confidence=0.8):\n    pass\n",
   "hint": "<p>Write a helper that takes a list of estimates and returns the probability of finishing within the capacity, and call it once per candidate story. Validate every story before you start choosing.</p>",
   "solution": "import math, random\n\ndef pert(a, m, b):\n    if not (0 <= a <= m <= b):\n        raise ValueError(\"need 0 <= a <= m <= b\")\n    return (a + 4 * m + b) / 6, (b - a) / 6\n\ndef prob_within(estimates, capacity):\n    mean = sum(pert(*e)[0] for e in estimates)\n    var = sum(pert(*e)[1] ** 2 for e in estimates)\n    if var == 0:\n        return 1.0 if capacity >= mean else 0.0\n    return (1 + math.erf((capacity - mean) / math.sqrt(var) / math.sqrt(2))) / 2\n\ndef commit_scope(stories, capacity, confidence=0.8):\n    for sid, pri, est in stories:\n        if pri not in (\"must\", \"should\", \"could\"):\n            raise ValueError(\"unknown priority \" + str(pri))\n        pert(*est)\n    musts = [s for s in stories if s[1] == \"must\"]\n    others = [s for s in stories if s[1] != \"must\"]\n    chosen = [s[2] for s in musts]\n    committed = [s[0] for s in musts]\n    musts_fit = prob_within(chosen, capacity) >= confidence\n    deferred = []\n    for sid, pri, est in others:\n        if prob_within(chosen + [est], capacity) >= confidence:\n            chosen.append(est)\n            committed.append(sid)\n        else:\n            deferred.append(sid)\n    mean = sum(pert(*e)[0] for e in chosen)\n    sd = math.sqrt(sum(pert(*e)[1] ** 2 for e in chosen))\n    return {\"committed\": committed, \"deferred\": deferred, \"musts_fit\": musts_fit,\n            \"mean\": round(mean, 1), \"sd\": round(sd, 1),\n            \"probability\": round(prob_within(chosen, capacity), 3)}\n",
   "tests": [
    {
     "label": "The notes' six stories with 120 hours",
     "call": "commit_scope([('S1', 'must', (10, 14, 24)), ('S2', 'must', (20, 30, 52)), ('S3', 'should', (8, 12, 20)), ('S4', 'should', (30, 40, 80)), ('S5', 'could', (4, 6, 10)), ('S6', 'could', (15, 20, 40))], 120)",
     "expect": "{'committed': ['S1', 'S2', 'S3', 'S4', 'S5'], 'deferred': ['S6'], 'musts_fit': True, 'mean': 111.0, 'sd': 10.4, 'probability': 0.806}"
    },
    {
     "label": "At 95% confidence, less fits",
     "call": "commit_scope([('S1', 'must', (10, 14, 24)), ('S2', 'must', (20, 30, 52)), ('S3', 'should', (8, 12, 20)), ('S4', 'should', (30, 40, 80)), ('S5', 'could', (4, 6, 10)), ('S6', 'could', (15, 20, 40))], 120, 0.95)",
     "expect": "{'committed': ['S1', 'S2', 'S3', 'S5', 'S6'], 'deferred': ['S4'], 'musts_fit': True, 'mean': 88.5, 'sd': 7.5, 'probability': 1.0}"
    },
    {
     "label": "Musts that don't fit are still committed, and flagged",
     "call": "commit_scope([('S1', 'must', (10, 14, 24)), ('S2', 'must', (20, 30, 52)), ('S3', 'should', (8, 12, 20)), ('S4', 'should', (30, 40, 80)), ('S5', 'could', (4, 6, 10)), ('S6', 'could', (15, 20, 40))], 50)",
     "expect": "{'committed': ['S1', 'S2'], 'deferred': ['S3', 'S4', 'S5', 'S6'], 'musts_fit': False, 'mean': 47.0, 'sd': 5.8, 'probability': 0.697}"
    },
    {
     "label": "A later, smaller story can fit after a deferral",
     "call": "commit_scope([('A', 'must', (10, 10, 10)), ('B', 'could', (50, 60, 90)), ('C', 'could', (5, 5, 5))], 30, 0.8)",
     "expect": "{'committed': ['A', 'C'], 'deferred': ['B'], 'musts_fit': True, 'mean': 15.0, 'sd': 0.0, 'probability': 1.0}"
    },
    {
     "label": "No stories",
     "call": "commit_scope([], 10)",
     "expect": "{'committed': [], 'deferred': [], 'musts_fit': True, 'mean': 0, 'sd': 0.0, 'probability': 1.0}",
     "hidden": true
    },
    {
     "label": "An unknown priority",
     "type": "raises",
     "call": "commit_scope([('A', 'nice', (1, 2, 3))], 10)",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "An estimate with m above b",
     "type": "raises",
     "call": "commit_scope([('A', 'must', (1, 5, 3))], 10)",
     "error": "ValueError",
     "hidden": true
    }
   ]
  },
  {
   "id": "ebs_forecast",
   "title": "Forecasting from your own history",
   "prompt": "<p>Evidence-based scheduling (the notes' section of that name) forecasts the remaining work from the team's own record of estimates and actual times. Write three functions.</p>\n<ul>\n<li><code>velocities(history)</code>: <code>history</code> is a list of <code>(estimate, actual)</code> hours for finished tasks. Return the list of estimate/actual ratios (Spolsky's velocities), in order. Raise <code>ValueError</code> for an empty history or a value that isn't positive.</li>\n<li><code>simulate(history, estimates, trials=1000, seed=0)</code>: with <code>rng = random.Random(seed)</code>, run <code>trials</code> simulated futures. In each, go through <code>estimates</code> in order and divide each by a velocity drawn with <code>rng.choice(velocities(history))</code>; the trial's result is the sum. Return the results sorted from smallest to largest.</li>\n<li><code>forecast(history, estimates, levels=(50, 80, 95), trials=1000, seed=0)</code>: a dict from each level <em>p</em> to the nearest-rank <em>p</em>th percentile of the simulated totals (the value at position ⌈<em>p</em> × <em>n</em>/100⌉ counting from 1, with <em>n</em> the number of trials), rounded to 1 place. Raise <code>ValueError</code> for a level outside (0, 100].</li>\n</ul>",
   "starter": "import math, random\n\ndef velocities(history):\n    pass\n\ndef simulate(history, estimates, trials=1000, seed=0):\n    pass\n\ndef forecast(history, estimates, levels=(50, 80, 95), trials=1000, seed=0):\n    pass\n",
   "hint": "<p>The random draws must happen in exactly the order described (trial by trial, estimate by estimate) so that the results match. Compute the velocities once, before the loop.</p>",
   "solution": "import math, random\ndef velocities(history):\n    vs = []\n    for est, actual in history:\n        if est <= 0 or actual <= 0:\n            raise ValueError(\"estimates and actuals must be positive\")\n        vs.append(est / actual)\n    if not vs:\n        raise ValueError(\"no history\")\n    return vs\n\ndef simulate(history, estimates, trials=1000, seed=0):\n    vs = velocities(history)\n    rng = random.Random(seed)\n    totals = []\n    for _ in range(trials):\n        totals.append(sum(e / rng.choice(vs) for e in estimates))\n    return sorted(totals)\n\ndef forecast(history, estimates, levels=(50, 80, 95), trials=1000, seed=0):\n    totals = simulate(history, estimates, trials, seed)\n    out = {}\n    for p in levels:\n        if not 0 < p <= 100:\n            raise ValueError(\"level must be in (0, 100]\")\n        out[p] = round(totals[math.ceil(p * len(totals) / 100) - 1], 1)\n    return out\n",
   "tests": [
    {
     "label": "Velocities from the notes' history",
     "call": "velocities([(4, 6), (8, 9), (2, 5), (6, 6), (3, 4.5), (10, 16), (5, 5), (1, 2)])",
     "expect": "[0.6666666666666666, 0.8888888888888888, 0.4, 1.0, 0.6666666666666666, 0.625, 1.0, 0.5]"
    },
    {
     "label": "The notes' forecast",
     "call": "forecast([(4, 6), (8, 9), (2, 5), (6, 6), (3, 4.5), (10, 16), (5, 5), (1, 2)], [6, 4, 8, 3, 5])",
     "expect": "{50: 39.1, 80: 45.0, 95: 50.0}"
    },
    {
     "label": "Simulated totals are sorted and seeded",
     "call": "simulate([(4, 6), (8, 9), (2, 5), (6, 6), (3, 4.5), (10, 16), (5, 5), (1, 2)], [10], trials=5, seed=3)",
     "expect": "[10.0, 11.25, 16.0, 20.0, 25.0]"
    },
    {
     "label": "A team that always estimates right",
     "call": "forecast([(2, 2), (5, 5)], [3, 4], levels=(50, 99))",
     "expect": "{50: 7.0, 99: 7.0}"
    },
    {
     "label": "Other levels and seed",
     "call": "forecast([(4, 6), (8, 9), (2, 5), (6, 6), (3, 4.5), (10, 16), (5, 5), (1, 2)], [20, 12], levels=(10, 90), trials=400, seed=7)",
     "expect": "{10: 34.5, 90: 64.0}",
     "hidden": true
    },
    {
     "label": "An empty history",
     "type": "raises",
     "call": "velocities([])",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "A zero actual time",
     "type": "raises",
     "call": "velocities([(3, 0)])",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "A level of 0",
     "type": "raises",
     "call": "forecast([(4, 6), (8, 9), (2, 5), (6, 6), (3, 4.5), (10, 16), (5, 5), (1, 2)], [1], levels=(0,))",
     "error": "ValueError",
     "hidden": true
    }
   ]
  }
 ],
 "cx2": [
  {
   "id": "completion_rate",
   "title": "Task success rates with intervals",
   "prompt": "<p>Report a usability test's task completion rates with adjusted-Wald intervals, as in the notes. Write:</p>\n<ul>\n<li><code>adjusted_wald(successes, n, z=1.96)</code>: with ñ = <em>n</em> + <em>z</em>² and p̃ = (successes + <em>z</em>²/2)/ñ, return the interval p̃ ± <em>z</em>√(p̃(1 − p̃)/ñ), clipped to [0, 1], as a tuple of two floats rounded to 4 places. Raise <code>ValueError</code> unless <em>n</em> &gt; 0 and 0 ≤ successes ≤ <em>n</em>.</li>\n<li><code>task_report(results, benchmark=0.78)</code>: <code>results</code> maps each task name to a list of outcomes (truthy for completed). Return a list, in the dict's order, of <code>(task, successes, n, low, high, verdict)</code>, where verdict is <code>\"above\"</code> if the interval's lower end is above the benchmark, <code>\"below\"</code> if its upper end is below it, and <code>\"inconclusive\"</code> otherwise.</li>\n</ul>",
   "starter": "import math\n\ndef adjusted_wald(successes, n, z=1.96):\n    pass\n\ndef task_report(results, benchmark=0.78):\n    pass\n",
   "hint": "<p>Clip with <code>max(0.0, ...)</code> and <code>min(1.0, ...)</code> before rounding. Count successes with <code>sum(1 for o in outcomes if o)</code>.</p>",
   "solution": "import math\ndef adjusted_wald(successes, n, z=1.96):\n    if n <= 0 or not 0 <= successes <= n:\n        raise ValueError(\"need 0 <= successes <= n and n > 0\")\n    na = n + z * z\n    p = (successes + z * z / 2) / na\n    half = z * math.sqrt(p * (1 - p) / na)\n    return (round(max(0.0, p - half), 4), round(min(1.0, p + half), 4))\n\ndef task_report(results, benchmark=0.78):\n    rows = []\n    for task, outcomes in results.items():\n        k, n = sum(1 for o in outcomes if o), len(outcomes)\n        low, high = adjusted_wald(k, n)\n        verdict = \"above\" if low > benchmark else \"below\" if high < benchmark else \"inconclusive\"\n        rows.append((task, k, n, low, high, verdict))\n    return rows\n",
   "tests": [
    {
     "label": "7 of 8, from the notes",
     "call": "adjusted_wald(7, 8)",
     "expect": "(0.5078, 0.9989)"
    },
    {
     "label": "7 of 10",
     "call": "adjusted_wald(7, 10)",
     "expect": "(0.3923, 0.8967)"
    },
    {
     "label": "Every participant succeeded: the top is clipped",
     "call": "adjusted_wald(20, 20)",
     "expect": "(0.8102, 1.0)"
    },
    {
     "label": "Nobody succeeded: the bottom is clipped",
     "call": "adjusted_wald(0, 12)",
     "expect": "(0.0, 0.282)"
    },
    {
     "label": "A 90% interval",
     "call": "adjusted_wald(9, 15, z=1.645)",
     "expect": "(0.3921, 0.7774)",
     "hidden": true
    },
    {
     "label": "Practice 1's three tasks",
     "call": "task_report({'check in': [1] * 18 + [0] * 2, 'register': [1] * 11 + [0] * 9, 'swap shift': [True] * 15 + [False] * 5})",
     "expect": "[('check in', 18, 20, 0.6868, 0.9843, 'inconclusive'), ('register', 11, 20, 0.3419, 0.7419, 'below'), ('swap shift', 15, 20, 0.5275, 0.8919, 'inconclusive')]"
    },
    {
     "label": "A task clearly above the benchmark",
     "call": "task_report({'find shift': [1] * 60 + [0] * 2}, 0.78)",
     "expect": "[('find shift', 60, 62, 0.8833, 0.9976, 'above')]",
     "hidden": true
    },
    {
     "label": "More successes than participants",
     "type": "raises",
     "call": "adjusted_wald(5, 4)",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "No participants",
     "type": "raises",
     "call": "adjusted_wald(0, 0)",
     "error": "ValueError",
     "hidden": true
    }
   ]
  },
  {
   "id": "funnel",
   "title": "A privacy-aware funnel",
   "prompt": "<p>Product analytics often asks how many users get through a sequence of steps. Write two functions.</p>\n<ul>\n<li><code>funnel(events, steps, window)</code>: <code>events</code> is a list of <code>(user, time, name)</code> with times in seconds, in any order. For each user, take the time of their <em>earliest</em> event named <code>steps[0]</code> as the start. Then, for each later step in order, find the first event with that name at or after the time of the previous matched step and no more than <code>window</code> seconds after the start; the user reaches that step if there is one, and stops at the first step with none. Only times are compared, so an event at the same time as the previous match qualifies, and if two steps share a name, one event can match both. Return a list of <code>(step, count)</code>: how many users reached each step. Raise <code>ValueError</code> for an empty <code>steps</code>.</li>\n<li><code>report(counts, min_cell=5)</code>: for the output of <code>funnel</code>, return a list of <code>(step, shown, rate)</code>. A count from 1 to <code>min_cell</code> − 1 is suppressed: shown is the string <code>\"&lt;\"</code> followed by min_cell (such as <code>\"&lt;5\"</code>) and rate is <code>None</code>. Otherwise shown is the count and rate is count divided by the first step's count, rounded to 3 places (<code>None</code> if the first count is 0). This is the per-count rule only: it doesn't hide differences between shown counts (the notes' caution about funnels).</li>\n</ul>",
   "starter": "def funnel(events, steps, window):\n    pass\n\ndef report(counts, min_cell=5):\n    pass\n",
   "hint": "<p>Group the events by user with a dict of lists and sort each user's list by time. A user who reaches step <em>k</em> also counts for every earlier step.</p>",
   "solution": "def funnel(events, steps, window):\n    if not steps:\n        raise ValueError(\"no steps\")\n    by_user = {}\n    for user, t, name in events:\n        by_user.setdefault(user, []).append((t, name))\n    counts = [0] * len(steps)\n    for user, evs in by_user.items():\n        evs.sort()\n        starts = [t for t, name in evs if name == steps[0]]\n        if not starts:\n            continue\n        start = starts[0]\n        reached, t_prev = 1, start\n        for step in steps[1:]:\n            nxt = [t for t, name in evs if name == step and t >= t_prev and t - start <= window]\n            if not nxt:\n                break\n            t_prev = nxt[0]\n            reached += 1\n        for i in range(reached):\n            counts[i] += 1\n    return list(zip(steps, counts))\n\ndef report(counts, min_cell=5):\n    first = counts[0][1] if counts else 0\n    rows = []\n    for step, c in counts:\n        if 0 < c < min_cell:\n            rows.append((step, \"<\" + str(min_cell), None))\n        else:\n            rows.append((step, c, round(c / first, 3) if first else None))\n    return rows\n",
   "tests": [
    {
     "label": "Four users through open, search, check-in",
     "call": "funnel([('u1', 0, 'open'), ('u1', 20, 'search'), ('u1', 50, 'checkin'), ('u2', 5, 'open'), ('u2', 400, 'search'), ('u3', 10, 'search'), ('u3', 30, 'open'), ('u3', 40, 'search'), ('u3', 45, 'checkin'), ('u4', 0, 'open'), ('u4', 100, 'checkin'), ('u4', 130, 'search')], ['open', 'search', 'checkin'], 300)",
     "expect": "[('open', 4), ('search', 3), ('checkin', 2)]"
    },
    {
     "label": "A longer window lets u2 search",
     "call": "funnel([('u1', 0, 'open'), ('u1', 20, 'search'), ('u1', 50, 'checkin'), ('u2', 5, 'open'), ('u2', 400, 'search'), ('u3', 10, 'search'), ('u3', 30, 'open'), ('u3', 40, 'search'), ('u3', 45, 'checkin'), ('u4', 0, 'open'), ('u4', 100, 'checkin'), ('u4', 130, 'search')], ['open', 'search', 'checkin'], 600)",
     "expect": "[('open', 4), ('search', 4), ('checkin', 2)]"
    },
    {
     "label": "Steps must come in order",
     "call": "funnel([('u1', 0, 'open'), ('u1', 20, 'search'), ('u1', 50, 'checkin'), ('u2', 5, 'open'), ('u2', 400, 'search'), ('u3', 10, 'search'), ('u3', 30, 'open'), ('u3', 40, 'search'), ('u3', 45, 'checkin'), ('u4', 0, 'open'), ('u4', 100, 'checkin'), ('u4', 130, 'search')], ['open', 'checkin', 'search'], 600)",
     "expect": "[('open', 4), ('checkin', 3), ('search', 1)]"
    },
    {
     "label": "Suppressing small counts",
     "call": "report([('open', 120), ('search', 96), ('register', 3), ('checkin', 0)])",
     "expect": "[('open', 120, 1.0), ('search', 96, 0.8), ('register', '<5', None), ('checkin', 0, 0.0)]"
    },
    {
     "label": "A different threshold",
     "call": "report([('a', 9), ('b', 9), ('c', 4)], min_cell=10)",
     "expect": "[('a', '<10', None), ('b', '<10', None), ('c', '<10', None)]",
     "hidden": true
    },
    {
     "label": "Nobody starts",
     "call": "report(funnel([('u1', 0, 'search')], ['open', 'search'], 60))",
     "expect": "[('open', 0, None), ('search', 0, None)]",
     "hidden": true
    },
    {
     "label": "No steps",
     "type": "raises",
     "call": "funnel([], [], 10)",
     "error": "ValueError",
     "hidden": true
    }
   ]
  }
 ],
 "cx3": [
  {
   "id": "load_report",
   "title": "Summarizing a load test",
   "prompt": "<p>Write the two parts of a load-test summary from the notes.</p>\n<ul>\n<li><code>correct_omission(latencies, interval)</code>: a load generator meant to send one request every <code>interval</code> ms that waited for slow replies has left out the requests it should have sent meanwhile (coordinated omission). Return a new list: each latency <em>L</em> in order, followed by the latencies those missing requests would have seen, <em>L</em> − interval, <em>L</em> − 2·interval, …, as long as they are at least <code>interval</code>. Raise <code>ValueError</code> if interval isn't positive.</li>\n<li><code>load_report(results, duration, warmup=0)</code>: <code>results</code> is a list of <code>(start, latency_ms, status)</code>, with start in seconds from the beginning of the test. Keep the requests that start in [warmup, duration). A request failed if its status is <code>None</code> (a timeout) or at least 500. Return a dict with <code>\"requests\"</code> (the number kept), <code>\"throughput\"</code> (kept requests per second over duration − warmup, rounded to 2 places), <code>\"error_rate\"</code> (failed/kept rounded to 4 places, 0.0 if none were kept), and <code>\"p50\"</code>, <code>\"p95\"</code>, <code>\"p99\"</code>: nearest-rank percentiles of the <em>successful</em> requests' latencies, or <code>None</code> if there are none. Raise <code>ValueError</code> if duration ≤ warmup.</li>\n</ul>",
   "starter": "import math\n\ndef correct_omission(latencies, interval):\n    pass\n\ndef load_report(results, duration, warmup=0):\n    pass\n",
   "hint": "<p>For the correction, start with <code>missing = L - interval</code> and loop while <code>missing &gt;= interval</code>. The nearest-rank percentile is <code>sorted(xs)[math.ceil(p * len(xs) / 100) - 1]</code>, as in CS 490.</p>",
   "solution": "import math\ndef correct_omission(latencies, interval):\n    if interval <= 0:\n        raise ValueError(\"interval must be positive\")\n    out = []\n    for lat in latencies:\n        out.append(lat)\n        missing = lat - interval\n        while missing >= interval:\n            out.append(missing)\n            missing -= interval\n    return out\n\ndef nearest_rank(values, p):\n    s = sorted(values)\n    return s[math.ceil(p * len(s) / 100) - 1]\n\ndef load_report(results, duration, warmup=0):\n    if duration <= warmup:\n        raise ValueError(\"duration must be longer than the warm-up\")\n    kept = [r for r in results if warmup <= r[0] < duration]\n    ok = [lat for start, lat, status in kept if status is not None and status < 500]\n    errors = len(kept) - len(ok)\n    rep = {\"requests\": len(kept),\n           \"throughput\": round(len(kept) / (duration - warmup), 2),\n           \"error_rate\": round(errors / len(kept), 4) if kept else 0.0}\n    for p in (50, 95, 99):\n        rep[\"p\" + str(p)] = nearest_rank(ok, p) if ok else None\n    return rep\n",
   "tests": [
    {
     "label": "The notes' 1-second stall at 10 ms intervals",
     "call": "len(correct_omission([12, 11, 1000, 13], 10))",
     "expect": "103"
    },
    {
     "label": "Short latencies are unchanged",
     "call": "correct_omission([12, 11, 9], 10)",
     "expect": "[12, 11, 9]"
    },
    {
     "label": "One slow reply",
     "call": "correct_omission([45], 10)",
     "expect": "[45, 35, 25, 15]"
    },
    {
     "label": "A 10-second test with a 1-second warm-up",
     "call": "load_report([(0.2, 900, 200), (1.0, 40, 200), (2.5, 35, 200), (3.1, 52, 200), (4.0, 38, 503), (4.6, 41, 200), (5.2, 260, 200), (6.0, 44, 200), (7.3, 39, None), (8.8, 47, 200), (9.5, 36, 200), (10.0, 33, 200)], 10, warmup=1)",
     "expect": "{'requests': 10, 'throughput': 1.11, 'error_rate': 0.2, 'p50': 41, 'p95': 260, 'p99': 260}"
    },
    {
     "label": "Without a warm-up the cold start shows",
     "call": "load_report([(0.2, 900, 200), (1.0, 40, 200), (2.5, 35, 200), (3.1, 52, 200), (4.0, 38, 503), (4.6, 41, 200), (5.2, 260, 200), (6.0, 44, 200), (7.3, 39, None), (8.8, 47, 200), (9.5, 36, 200), (10.0, 33, 200)], 10)",
     "expect": "{'requests': 11, 'throughput': 1.1, 'error_rate': 0.1818, 'p50': 44, 'p95': 900, 'p99': 900}"
    },
    {
     "label": "Nothing succeeded",
     "call": "load_report([(1, 30, 500), (2, 31, None)], 4)",
     "expect": "{'requests': 2, 'throughput': 0.5, 'error_rate': 1.0, 'p50': None, 'p95': None, 'p99': None}",
     "hidden": true
    },
    {
     "label": "Nothing kept",
     "call": "load_report([], 5, 1)",
     "expect": "{'requests': 0, 'throughput': 0.0, 'error_rate': 0.0, 'p50': None, 'p95': None, 'p99': None}",
     "hidden": true
    },
    {
     "label": "A zero interval",
     "type": "raises",
     "call": "correct_omission([5], 0)",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "Warm-up as long as the test",
     "type": "raises",
     "call": "load_report([], 5, 5)",
     "error": "ValueError",
     "hidden": true
    }
   ]
  },
  {
   "id": "capacity",
   "title": "Capacity estimates",
   "prompt": "<p>Implement the notes' capacity arithmetic. Times are in seconds and rates in requests per second.</p>\n<ul>\n<li><code>concurrency(rate, latency)</code>: Little's law, the average number of requests in the system.</li>\n<li><code>utilization(rate, service, workers=1)</code>: the fraction of time the workers are busy, rate × service / workers.</li>\n<li><code>mm1_response(rate, service)</code>: the mean response time of a single worker with random arrivals, service / (1 − ρ) where ρ = rate × service. Raise <code>ValueError</code> if ρ ≥ 1.</li>\n<li><code>servers_needed(peak_rate, service, workers_per_server, target=0.6, spare=1)</code>: the smallest number of servers (at least 1) whose utilization at the peak rate is at most <code>target</code>, plus <code>spare</code> servers so that one can fail or be redeployed. Raise <code>ValueError</code> unless 0 &lt; target ≤ 1.</li>\n</ul>",
   "starter": "import math\n\ndef concurrency(rate, latency):\n    pass\n\ndef utilization(rate, service, workers=1):\n    pass\n\ndef mm1_response(rate, service):\n    pass\n\ndef servers_needed(peak_rate, service, workers_per_server, target=0.6, spare=1):\n    pass\n",
   "hint": "<p>One server handles workers_per_server / service requests per second at full utilization. Divide the peak rate by that times the target and round up. Floating-point division can give 3.0000000000000004 for an exact 3, so subtract a tiny amount, such as 1e-9, before <code>math.ceil</code>.</p>",
   "solution": "import math\ndef concurrency(rate, latency):\n    return rate * latency\n\ndef utilization(rate, service, workers=1):\n    return rate * service / workers\n\ndef mm1_response(rate, service):\n    rho = rate * service\n    if rho >= 1:\n        raise ValueError(\"arrival rate is at or above capacity\")\n    return service / (1 - rho)\n\ndef servers_needed(peak_rate, service, workers_per_server, target=0.6, spare=1):\n    if not 0 < target <= 1:\n        raise ValueError(\"target utilization must be in (0, 1]\")\n    per_server = workers_per_server / service\n    n = max(1, math.ceil(peak_rate / (per_server * target) - 1e-9))\n    return n + spare\n",
   "tests": [
    {
     "label": "Little's law",
     "call": "concurrency(40, 0.25)",
     "expect": "10.0"
    },
    {
     "label": "Utilization with 4 workers",
     "call": "utilization(30, 0.08, 4)",
     "expect": "0.6"
    },
    {
     "label": "M/M/1 at 80% busy",
     "call": "mm1_response(8, 0.1)",
     "expect": "0.5000000000000001"
    },
    {
     "label": "A larger sign-up peak",
     "call": "servers_needed(200, 0.05, 8)",
     "expect": "4"
    },
    {
     "label": "An exact fit isn't rounded up",
     "call": "servers_needed(48, 0.1, 8, target=0.6, spare=0)",
     "expect": "1"
    },
    {
     "label": "A tiny load still needs one server",
     "call": "servers_needed(0.5, 0.05, 4, spare=0)",
     "expect": "1",
     "hidden": true
    },
    {
     "label": "Overloaded",
     "type": "raises",
     "call": "mm1_response(10, 0.1)",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "A target of 0",
     "type": "raises",
     "call": "servers_needed(10, 0.1, 1, target=0)",
     "error": "ValueError",
     "hidden": true
    }
   ]
  }
 ],
 "cx4": [
  {
   "id": "burn_rate",
   "title": "Burn-rate alerts",
   "prompt": "<p>Implement the notes' error-budget alerting. <code>events</code> is a list of <code>(minute, good, total)</code>: in each minute, how many requests were good out of how many valid ones. A window of <em>w</em> minutes ending at minute <code>now</code> covers the minutes <em>t</em> with now − <em>w</em> &lt; <em>t</em> ≤ now.</p>\n<ul>\n<li><code>burn_rate(events, slo, now, window)</code>: the error rate in the window, 1 − good/total, divided by the error budget 1 − slo. Return 0.0 if the window has no requests. Raise <code>ValueError</code> unless 0 &lt; slo &lt; 1.</li>\n<li><code>alerts(events, slo, now, min_requests=0)</code>: apply the notes' three rules (the code printout and the paragraph after it), in this order: (page, 60, 5, 14.4), (page, 360, 30, 6) and (ticket, 4320, 360, 1), each meaning that the burn rate over both the long and the short window must be strictly greater than the threshold. A rule also needs its long window (not its short one) to hold at least <code>min_requests</code> requests, counting the totals. The default 0 gives the Workbook's rules with no minimum; the pantry's rules, with the notes' minimum, are <code>alerts(events, slo, now, 35)</code>. Return a list of <code>(severity, long_window, short_window)</code> for the rules that fire.</li>\n<li><code>budget_remaining(events, slo, now, period=43200)</code>: the fraction of the period's error budget left (the default period is 30 days in minutes, the pantry's SLO period), 1 − bad/((1 − slo) × total) over the period's window; 1.0 if there were no requests. It is negative when the budget is overspent.</li>\n</ul>",
   "starter": "def burn_rate(events, slo, now, window):\n    pass\n\ndef alerts(events, slo, now, min_requests=0):\n    pass\n\ndef budget_remaining(events, slo, now, period=43200):\n    pass\n",
   "hint": "<p>Write one loop that sums good and total over a window and reuse it. For <code>alerts</code>, keep the table as a list of tuples and test each rule with <code>and</code>.</p>",
   "solution": "def burn_rate(events, slo, now, window):\n    if not 0 < slo < 1:\n        raise ValueError(\"slo must be between 0 and 1\")\n    good = total = 0\n    for minute, g, t in events:\n        if now - window < minute <= now:\n            good += g\n            total += t\n    if total == 0:\n        return 0.0\n    return (1 - good / total) / (1 - slo)\n\nRULES = [(\"page\", 60, 5, 14.4), (\"page\", 360, 30, 6.0), (\"ticket\", 4320, 360, 1.0)]\n\ndef _total(events, now, window):\n    return sum(t for minute, g, t in events if now - window < minute <= now)\n\ndef alerts(events, slo, now, min_requests=0):\n    fired = []\n    for severity, long_w, short_w, threshold in RULES:\n        if (_total(events, now, long_w) >= min_requests\n                and burn_rate(events, slo, now, long_w) > threshold\n                and burn_rate(events, slo, now, short_w) > threshold):\n            fired.append((severity, long_w, short_w))\n    return fired\n\ndef budget_remaining(events, slo, now, period=43200):\n    good = total = 0\n    for minute, g, t in events:\n        if now - period < minute <= now:\n            good += g\n            total += t\n    if total == 0:\n        return 1.0\n    allowed = (1 - slo) * total\n    return 1 - (total - good) / allowed\n",
   "tests": [
    {
     "label": "A quiet three days",
     "call": "alerts([(m, 1000, 1000) for m in range(1, 4321)], 0.999, 4320)",
     "expect": "[]"
    },
    {
     "label": "Burn rates of a 30-minute problem",
     "call": "[round(burn_rate([(m, 1000, 1000) for m in range(1, 4291)] + [(m, 980, 1000) for m in range(4291, 4321)], 0.999, 4320, w), 2) for w in (5, 30, 60, 360)]",
     "expect": "[20.0, 20.0, 10.0, 1.67]"
    },
    {
     "label": "2% errors for 30 minutes doesn't page yet",
     "call": "alerts([(m, 1000, 1000) for m in range(1, 4291)] + [(m, 980, 1000) for m in range(4291, 4321)], 0.999, 4320)",
     "expect": "[]"
    },
    {
     "label": "5% errors for 30 minutes pages",
     "call": "alerts([(m, 1000, 1000) for m in range(1, 4291)] + [(m, 950, 1000) for m in range(4291, 4321)], 0.999, 4320)",
     "expect": "[('page', 60, 5)]"
    },
    {
     "label": "A slow leak opens a ticket",
     "call": "alerts([(m, 997, 1000) for m in range(1, 4321)], 0.999, 4320)",
     "expect": "[('ticket', 4320, 360)]"
    },
    {
     "label": "The pantry's minimum: 32 requests in the long window aren't enough",
     "call": "(alerts([(m, 3, 4) for m in range(1, 10)], 0.99, 8, 35), alerts([(m, 3, 4) for m in range(1, 10)], 0.99, 8))",
     "expect": "([], [('page', 60, 5), ('page', 360, 30), ('ticket', 4320, 360)])"
    },
    {
     "label": "With 36 requests the pantry's rules fire",
     "call": "alerts([(m, 3, 4) for m in range(1, 10)], 0.99, 9, 35)",
     "expect": "[('page', 60, 5), ('page', 360, 30), ('ticket', 4320, 360)]"
    },
    {
     "label": "The minimum is for the long window only: the 5-minute window holds 20",
     "call": "alerts([(m, 3, 4) for m in range(1, 10)], 0.99, 9, 30)",
     "expect": "[('page', 60, 5), ('page', 360, 30), ('ticket', 4320, 360)]",
     "hidden": true
    },
    {
     "label": "Budget left after the fast burn",
     "call": "round(budget_remaining([(m, 1000, 1000) for m in range(1, 4291)] + [(m, 950, 1000) for m in range(4291, 4321)], 0.999, 4320), 4)",
     "expect": "0.6528"
    },
    {
     "label": "No traffic",
     "call": "(burn_rate([], 0.99, 100, 60), budget_remaining([], 0.99, 100))",
     "expect": "(0.0, 1.0)",
     "hidden": true
    },
    {
     "label": "Minutes outside the window are ignored",
     "call": "burn_rate([(10, 0, 100), (11, 100, 100)], 0.9, 11, 1)",
     "expect": "0.0",
     "hidden": true
    },
    {
     "label": "An SLO of 1",
     "type": "raises",
     "call": "burn_rate([], 1, 10, 5)",
     "error": "ValueError",
     "hidden": true
    }
   ]
  },
  {
   "id": "incident_timeline",
   "title": "An incident timeline from logs",
   "prompt": "<p>A postmortem starts from one timeline, but each service logs in its own time zone. Each log line is <code>TIMESTAMP LEVEL message</code>, separated by whitespace (the message may contain spaces and may be empty), where TIMESTAMP is ISO 8601 with a UTC offset, such as <code>2027-03-13T10:01:40-05:00</code> or <code>2027-03-13T15:21:30Z</code>. Write two functions.</p>\n<ul>\n<li><code>merge_logs(sources)</code>: <code>sources</code> maps each service name to its list of lines. Skip blank lines. Return a list of <code>(utc, service, level, message)</code> sorted by time, then by service name, then by the line's position in its list, where utc is the time converted to UTC and written <code>\"YYYY-MM-DDTHH:MM:SSZ\"</code>. Raise <code>ValueError</code> for a line with fewer than two fields or a timestamp without a UTC offset.</li>\n<li><code>incident_summary(sources)</code>: a dict with <code>\"start\"</code> (the utc of the first ERROR entry), <code>\"detected\"</code> (the first entry whose message starts with <code>ALERT</code>), <code>\"mitigated\"</code> (the first whose message starts with <code>MITIGATED</code>), each <code>None</code> if there is none, and <code>\"time_to_detect\"</code> and <code>\"time_to_mitigate\"</code>: minutes from start to detected and to mitigated, rounded to 1 place, or <code>None</code> if either end is missing.</li>\n</ul>",
   "starter": "from datetime import datetime, timezone\n\ndef merge_logs(sources):\n    pass\n\ndef incident_summary(sources):\n    pass\n",
   "hint": "<p><code>line.split(None, 2)</code> splits into at most three parts on runs of whitespace. <code>datetime.fromisoformat</code> reads both offsets and <code>Z</code> in Python 3.11 and later; <code>.astimezone(timezone.utc)</code> converts, and <code>.tzinfo is None</code> detects a missing offset.</p>",
   "solution": "from datetime import datetime, timezone\n\ndef merge_logs(sources):\n    entries = []\n    for service, lines in sources.items():\n        for i, line in enumerate(lines):\n            if not line.strip():\n                continue\n            parts = line.split(None, 2)\n            if len(parts) < 2:\n                raise ValueError(\"bad line: \" + line)\n            stamp, level = parts[0], parts[1]\n            message = parts[2] if len(parts) == 3 else \"\"\n            t = datetime.fromisoformat(stamp)\n            if t.tzinfo is None:\n                raise ValueError(\"timestamp without a time zone: \" + stamp)\n            t = t.astimezone(timezone.utc)\n            entries.append((t, service, i, level, message))\n    entries.sort(key=lambda e: (e[0], e[1], e[2]))\n    return [(t.strftime(\"%Y-%m-%dT%H:%M:%SZ\"), s, lvl, msg) for t, s, i, lvl, msg in entries]\n\ndef incident_summary(sources):\n    rows = merge_logs(sources)\n    def first(pred):\n        for r in rows:\n            if pred(r):\n                return r[0]\n        return None\n    start = first(lambda r: r[2] == \"ERROR\")\n    detected = first(lambda r: r[3].startswith(\"ALERT\"))\n    mitigated = first(lambda r: r[3].startswith(\"MITIGATED\"))\n    def minutes(a, b):\n        if a is None or b is None:\n            return None\n        fa = datetime.fromisoformat(a); fb = datetime.fromisoformat(b)\n        return round((fb - fa).total_seconds() / 60, 1)\n    return {\"start\": start, \"detected\": detected, \"mitigated\": mitigated,\n            \"time_to_detect\": minutes(start, detected), \"time_to_mitigate\": minutes(start, mitigated)}\n",
   "tests": [
    {
     "label": "Merging three services",
     "call": "merge_logs({'api': ['2027-03-13T09:58:02-05:00 INFO deploy v0.6.0 started', '2027-03-13T10:01:40-05:00 ERROR checkin failed: column card_no missing', '2027-03-13T10:03:15-05:00 ERROR checkin failed: column card_no missing'], 'pager': ['2027-03-13T15:09:00+00:00 WARN ALERT checkin error burn rate 22x'], 'ops': ['2027-03-13T15:21:30Z INFO rollback to v0.5.2', '2027-03-13T15:24:00Z INFO MITIGATED checkins succeeding']})",
     "expect": "[('2027-03-13T14:58:02Z', 'api', 'INFO', 'deploy v0.6.0 started'), ('2027-03-13T15:01:40Z', 'api', 'ERROR', 'checkin failed: column card_no missing'), ('2027-03-13T15:03:15Z', 'api', 'ERROR', 'checkin failed: column card_no missing'), ('2027-03-13T15:09:00Z', 'pager', 'WARN', 'ALERT checkin error burn rate 22x'), ('2027-03-13T15:21:30Z', 'ops', 'INFO', 'rollback to v0.5.2'), ('2027-03-13T15:24:00Z', 'ops', 'INFO', 'MITIGATED checkins succeeding')]"
    },
    {
     "label": "The incident's summary",
     "call": "incident_summary({'api': ['2027-03-13T09:58:02-05:00 INFO deploy v0.6.0 started', '2027-03-13T10:01:40-05:00 ERROR checkin failed: column card_no missing', '2027-03-13T10:03:15-05:00 ERROR checkin failed: column card_no missing'], 'pager': ['2027-03-13T15:09:00+00:00 WARN ALERT checkin error burn rate 22x'], 'ops': ['2027-03-13T15:21:30Z INFO rollback to v0.5.2', '2027-03-13T15:24:00Z INFO MITIGATED checkins succeeding']})",
     "expect": "{'start': '2027-03-13T15:01:40Z', 'detected': '2027-03-13T15:09:00Z', 'mitigated': '2027-03-13T15:24:00Z', 'time_to_detect': 7.3, 'time_to_mitigate': 22.3}"
    },
    {
     "label": "Ties are broken by service, then position",
     "call": "merge_logs({'b': ['2027-01-01T00:00:00Z INFO x', '2027-01-01T00:00:00Z INFO y'], 'a': ['2027-01-01T01:00:00+01:00 WARN z']})",
     "expect": "[('2027-01-01T00:00:00Z', 'a', 'WARN', 'z'), ('2027-01-01T00:00:00Z', 'b', 'INFO', 'x'), ('2027-01-01T00:00:00Z', 'b', 'INFO', 'y')]"
    },
    {
     "label": "An incident across midnight",
     "call": "incident_summary({'web': ['2027-01-01T23:50:00Z ERROR down', '', '2027-01-02T00:20:30Z INFO MITIGATED back'], 'pager': ['2027-01-01T23:58:00Z WARN ALERT web down']})",
     "expect": "{'start': '2027-01-01T23:50:00Z', 'detected': '2027-01-01T23:58:00Z', 'mitigated': '2027-01-02T00:20:30Z', 'time_to_detect': 8.0, 'time_to_mitigate': 30.5}",
     "hidden": true
    },
    {
     "label": "No alert yet",
     "call": "incident_summary({'web': ['2027-01-01T10:00:00Z ERROR down']})",
     "expect": "{'start': '2027-01-01T10:00:00Z', 'detected': None, 'mitigated': None, 'time_to_detect': None, 'time_to_mitigate': None}",
     "hidden": true
    },
    {
     "label": "An empty message",
     "call": "merge_logs({'w': ['2027-01-01T10:00:00Z INFO']})",
     "expect": "[('2027-01-01T10:00:00Z', 'w', 'INFO', '')]",
     "hidden": true
    },
    {
     "label": "A timestamp without an offset",
     "type": "raises",
     "call": "merge_logs({'w': ['2027-01-01T10:00:00 INFO hi']})",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "A line with one field",
     "type": "raises",
     "call": "merge_logs({'w': ['2027-01-01T10:00:00Z']})",
     "error": "ValueError",
     "hidden": true
    }
   ]
  }
 ],
 "cx5": [
  {
   "id": "semver_resolve",
   "title": "Resolving version constraints",
   "prompt": "<p>Extend CS 240's <code>satisfies</code> to the constraint language in the notes. Versions are <code>MAJOR.MINOR.PATCH</code> with whole numbers (no pre-release tags). A constraint is one or more comparators separated by commas, all of which must hold: <code>&gt;=V</code>, <code>&gt;V</code>, <code>&lt;=V</code>, <code>&lt;V</code>, <code>=V</code> or a bare <code>V</code> (exactly V), <code>*</code> (anything), <code>^V</code> (npm's caret: at least V, and below the next increase of V's left-most non-zero part, so ^1.2.3 is below 2.0.0, ^0.2.3 below 0.3.0 and ^0.0.3 below 0.0.4; if all three parts are 0, the patch counts, so ^0.0.0 is below 0.0.1 and allows only 0.0.0) and <code>~V</code> (at least V and below the next minor version: ~1.2.3 is below 1.3.0). Spaces around comparators are allowed. Write:</p>\n<ul>\n<li><code>parse_version(v)</code>: a tuple of three ints; <code>ValueError</code> if malformed.</li>\n<li><code>satisfies(version, constraint)</code>: <code>True</code> or <code>False</code>.</li>\n<li><code>resolve(available, constraints)</code>: <code>constraints</code> maps each dependent to its constraint string. Return the highest version in <code>available</code> that satisfies every constraint, or <code>None</code>.</li>\n<li><code>conflicts(available, constraints)</code>: the sorted list of pairs <code>(a, b)</code> of dependents, with a &lt; b, such that no available version satisfies both a's and b's constraints.</li>\n</ul>",
   "starter": "def parse_version(v):\n    pass\n\ndef satisfies(version, constraint):\n    pass\n\ndef resolve(available, constraints):\n    pass\n\ndef conflicts(available, constraints):\n    pass\n",
   "hint": "<p>Translate each comparator into a list of (operator, version tuple) pairs: a caret or tilde becomes a <code>&gt;=</code> and a <code>&lt;</code>. Python compares tuples element by element, which is exactly version order. Check the two-character operators before the one-character ones.</p>",
   "solution": "def parse_version(v):\n    parts = v.split(\".\")\n    if len(parts) != 3 or not all(p.isdigit() for p in parts):\n        raise ValueError(\"not a version: \" + v)\n    return tuple(int(p) for p in parts)\n\ndef _comparators(c):\n    c = c.strip()\n    if c in (\"*\", \"\"):\n        return []\n    if c.startswith(\"^\"):\n        lo = parse_version(c[1:])\n        if lo[0] > 0:\n            hi = (lo[0] + 1, 0, 0)\n        elif lo[1] > 0:\n            hi = (0, lo[1] + 1, 0)\n        else:\n            hi = (0, 0, lo[2] + 1)\n        return [(\">=\", lo), (\"<\", hi)]\n    if c.startswith(\"~\"):\n        lo = parse_version(c[1:])\n        return [(\">=\", lo), (\"<\", (lo[0], lo[1] + 1, 0))]\n    for op in (\">=\", \"<=\", \">\", \"<\", \"=\"):\n        if c.startswith(op):\n            return [(op, parse_version(c[len(op):].strip()))]\n    return [(\"=\", parse_version(c))]\n\ndef satisfies(version, constraint):\n    v = parse_version(version)\n    tests = {\">=\": lambda a, b: a >= b, \"<=\": lambda a, b: a <= b, \">\": lambda a, b: a > b,\n             \"<\": lambda a, b: a < b, \"=\": lambda a, b: a == b}\n    for part in constraint.split(\",\"):\n        for op, bound in _comparators(part):\n            if not tests[op](v, bound):\n                return False\n    return True\n\ndef resolve(available, constraints):\n    ok = [v for v in available if all(satisfies(v, c) for c in constraints.values())]\n    return max(ok, key=parse_version) if ok else None\n\ndef conflicts(available, constraints):\n    names = sorted(constraints)\n    out = []\n    for i, a in enumerate(names):\n        for b in names[i + 1:]:\n            if not any(satisfies(v, constraints[a]) and satisfies(v, constraints[b]) for v in available):\n                out.append((a, b))\n    return out\n",
   "tests": [
    {
     "label": "Carets and tildes",
     "call": "[satisfies('1.4.9', '^1.2.3'), satisfies('2.0.0', '^1.2.3'), satisfies('0.2.9', '^0.2.3'), satisfies('0.3.0', '^0.2.3'), satisfies('0.0.4', '^0.0.3'), satisfies('1.2.9', '~1.2.3'), satisfies('1.3.0', '~1.2.3')]",
     "expect": "[True, False, True, False, False, True, False]"
    },
    {
     "label": "Ranges compare numbers, not strings",
     "call": "[satisfies('1.10.0', '>=1.9.0, <2.0.0'), satisfies('1.10.0', '<1.9.0'), satisfies('3.0.0', '*'), satisfies('2.1.3', '2.1.3'), satisfies('2.1.3', '=2.1.4')]",
     "expect": "[True, False, True, True, False]"
    },
    {
     "label": "The notes' three dependents",
     "call": "resolve(['1.2.0', '1.4.2', '1.9.0', '1.10.1', '2.0.0', '2.1.3'], {'app': '^1.4.0', 'reports': '>=1.9.0', 'sms-lib': '~1.10.0'})",
     "expect": "'1.10.1'"
    },
    {
     "label": "No version satisfies everyone",
     "call": "resolve(['1.2.0', '1.4.2', '1.9.0', '1.10.1', '2.0.0', '2.1.3'], {'app': '^1.4.0', 'export': '>=2.0.0'})",
     "expect": "None"
    },
    {
     "label": "Finding the conflicting pair",
     "call": "conflicts(['1.2.0', '1.4.2', '1.9.0', '1.10.1', '2.0.0', '2.1.3'], {'app': '^1.4.0', 'export': '>=2.0.0', 'any': '*'})",
     "expect": "[('app', 'export')]"
    },
    {
     "label": "A caret on 0.0.0 allows only 0.0.0",
     "call": "[satisfies('0.0.0', '^0.0.0'), satisfies('0.0.1', '^0.0.0')]",
     "expect": "[True, False]",
     "hidden": true
    },
    {
     "label": "Exclusive bounds",
     "call": "resolve(['1.2.0', '1.4.2', '1.9.0', '1.10.1', '2.0.0', '2.1.3'], {'x': '>1.2.0, <=1.9.0'})",
     "expect": "'1.9.0'",
     "hidden": true
    },
    {
     "label": "No conflicts",
     "call": "conflicts(['1.2.0', '1.4.2', '1.9.0', '1.10.1', '2.0.0', '2.1.3'], {'a': '^1.0.0', 'b': '~1.9.0'})",
     "expect": "[]",
     "hidden": true
    },
    {
     "label": "A two-part version",
     "type": "raises",
     "call": "parse_version('1.2')",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "A malformed constraint",
     "type": "raises",
     "call": "satisfies('1.2.3', '^1.x.0')",
     "error": "ValueError",
     "hidden": true
    }
   ]
  },
  {
   "id": "update_plan",
   "title": "Planning security updates",
   "prompt": "<p>Turn advisories into an update plan. <code>deps</code> maps each package in the project to <code>{\"version\": \"X.Y.Z\", \"requires\": [...]}</code>, the packages it depends on. Each advisory is a dict with <code>\"package\"</code>, <code>\"fixed\"</code> (the first version without the flaw) and <code>\"severity\"</code>, one of <code>\"critical\"</code>, <code>\"high\"</code>, <code>\"medium\"</code>, <code>\"low\"</code>. Write two functions.</p>\n<ul>\n<li><code>plan_updates(deps, advisories)</code>: an advisory applies if its package is in <code>deps</code> and the installed version is lower than <code>fixed</code> (compare numerically). For each package with any applicable advisory, the target is the highest applicable <code>fixed</code> version and the severity the most severe applicable one. Return a dict, with packages in sorted order, from each to <code>(current, target, severity, due_days)</code>, where due_days follows the notes' policy: 2 for critical, 7 for high, 30 for medium and 90 for low. Raise <code>ValueError</code> for an unknown severity in any advisory, even one that doesn't apply (a malformed feed should be noticed, not silently skipped).</li>\n<li><code>update_order(deps, plan)</code>: an order in which to apply the plan, updating a package only after every package it requires that is also in the plan. Only direct requirements count: if A requires X, X is not in the plan, and X requires B, which is, A need not wait for B (X is not being changed, so A's update doesn't depend on B's). Among the packages ready at each step, take the most severe first, then by name. Raise <code>ValueError</code> if the packages to update depend on each other in a cycle.</li>\n</ul>",
   "starter": "import heapq\n\ndef plan_updates(deps, advisories):\n    pass\n\ndef update_order(deps, plan):\n    pass\n",
   "hint": "<p>The order is Kahn's algorithm (CS 201 Lesson 7) restricted to the packages in the plan, with a heap of (severity rank, name) as its queue so that the most urgent ready package comes out first.</p>",
   "solution": "import heapq\nSEVERITY = {\"critical\": 0, \"high\": 1, \"medium\": 2, \"low\": 3}\nDUE_DAYS = {\"critical\": 2, \"high\": 7, \"medium\": 30, \"low\": 90}\n\ndef _v(s):\n    return tuple(int(p) for p in s.split(\".\"))\n\ndef plan_updates(deps, advisories):\n    need = {}\n    for adv in advisories:\n        pkg = adv[\"package\"]\n        if adv[\"severity\"] not in SEVERITY:\n            raise ValueError(\"unknown severity\")\n        if pkg not in deps:\n            continue\n        if _v(deps[pkg][\"version\"]) < _v(adv[\"fixed\"]):\n            cur = need.get(pkg)\n            if cur is None:\n                need[pkg] = {\"to\": adv[\"fixed\"], \"severity\": adv[\"severity\"]}\n            else:\n                if _v(adv[\"fixed\"]) > _v(cur[\"to\"]):\n                    cur[\"to\"] = adv[\"fixed\"]\n                if SEVERITY[adv[\"severity\"]] < SEVERITY[cur[\"severity\"]]:\n                    cur[\"severity\"] = adv[\"severity\"]\n    return {p: (deps[p][\"version\"], n[\"to\"], n[\"severity\"], DUE_DAYS[n[\"severity\"]]) for p, n in sorted(need.items())}\n\ndef update_order(deps, plan):\n    pkgs = set(plan)\n    indeg = {p: 0 for p in pkgs}\n    users = {p: [] for p in pkgs}\n    for p in pkgs:\n        for q in deps[p].get(\"requires\", []):\n            if q in pkgs:\n                indeg[p] += 1\n                users[q].append(p)\n    heap = [(SEVERITY[plan[p][2]], p) for p in pkgs if indeg[p] == 0]\n    heapq.heapify(heap)\n    order = []\n    while heap:\n        _, p = heapq.heappop(heap)\n        order.append(p)\n        for u in users[p]:\n            indeg[u] -= 1\n            if indeg[u] == 0:\n                heapq.heappush(heap, (SEVERITY[plan[u][2]], u))\n    if len(order) != len(pkgs):\n        raise ValueError(\"dependency cycle among the packages to update\")\n    return order\n",
   "tests": [
    {
     "label": "A project's advisories",
     "call": "plan_updates({'app': {'version': '1.0.0', 'requires': ['web', 'sms']}, 'web': {'version': '3.1.0', 'requires': ['templates', 'http']}, 'templates': {'version': '2.9.1', 'requires': []}, 'http': {'version': '1.4.0', 'requires': []}, 'sms': {'version': '0.8.2', 'requires': ['http']}}, [{'package': 'templates', 'fixed': '3.0.2', 'severity': 'medium'}, {'package': 'http', 'fixed': '1.4.3', 'severity': 'high'}, {'package': 'http', 'fixed': '1.5.1', 'severity': 'critical'}, {'package': 'web', 'fixed': '3.1.0', 'severity': 'high'}, {'package': 'sms', 'fixed': '0.9.0', 'severity': 'low'}, {'package': 'yaml', 'fixed': '6.0.1', 'severity': 'critical'}, {'package': 'web', 'fixed': '3.2.0', 'severity': 'low'}])",
     "expect": "{'http': ('1.4.0', '1.5.1', 'critical', 2), 'sms': ('0.8.2', '0.9.0', 'low', 90), 'templates': ('2.9.1', '3.0.2', 'medium', 30), 'web': ('3.1.0', '3.2.0', 'low', 90)}"
    },
    {
     "label": "Updating http before the packages that use it",
     "call": "update_order({'app': {'version': '1.0.0', 'requires': ['web', 'sms']}, 'web': {'version': '3.1.0', 'requires': ['templates', 'http']}, 'templates': {'version': '2.9.1', 'requires': []}, 'http': {'version': '1.4.0', 'requires': []}, 'sms': {'version': '0.8.2', 'requires': ['http']}}, plan_updates({'app': {'version': '1.0.0', 'requires': ['web', 'sms']}, 'web': {'version': '3.1.0', 'requires': ['templates', 'http']}, 'templates': {'version': '2.9.1', 'requires': []}, 'http': {'version': '1.4.0', 'requires': []}, 'sms': {'version': '0.8.2', 'requires': ['http']}}, [{'package': 'templates', 'fixed': '3.0.2', 'severity': 'medium'}, {'package': 'http', 'fixed': '1.4.3', 'severity': 'high'}, {'package': 'http', 'fixed': '1.5.1', 'severity': 'critical'}, {'package': 'web', 'fixed': '3.1.0', 'severity': 'high'}, {'package': 'sms', 'fixed': '0.9.0', 'severity': 'low'}, {'package': 'yaml', 'fixed': '6.0.1', 'severity': 'critical'}, {'package': 'web', 'fixed': '3.2.0', 'severity': 'low'}]))",
     "expect": "['http', 'templates', 'sms', 'web']"
    },
    {
     "label": "Nothing to do",
     "call": "plan_updates({'app': {'version': '1.0.0', 'requires': ['web', 'sms']}, 'web': {'version': '3.1.0', 'requires': ['templates', 'http']}, 'templates': {'version': '2.9.1', 'requires': []}, 'http': {'version': '1.4.0', 'requires': []}, 'sms': {'version': '0.8.2', 'requires': ['http']}}, [])",
     "expect": "{}"
    },
    {
     "label": "Independent packages go by severity, then name",
     "call": "update_order({'a': {'version': '1.0.0', 'requires': []}, 'b': {'version': '1.0.0', 'requires': []}, 'c': {'version': '1.0.0', 'requires': []}}, {'a': ('1.0.0', '1.0.1', 'low', 90), 'b': ('1.0.0', '1.1.0', 'critical', 2), 'c': ('1.0.0', '2.0.0', 'low', 90)})",
     "expect": "['b', 'a', 'c']"
    },
    {
     "label": "Version 1.10.0 is newer than 1.9.0",
     "call": "plan_updates({'p': {'version': '1.9.0', 'requires': []}}, [{'package': 'p', 'fixed': '1.10.0', 'severity': 'high'}])",
     "expect": "{'p': ('1.9.0', '1.10.0', 'high', 7)}",
     "hidden": true
    },
    {
     "label": "An unknown severity",
     "type": "raises",
     "call": "plan_updates({'app': {'version': '1.0.0', 'requires': ['web', 'sms']}, 'web': {'version': '3.1.0', 'requires': ['templates', 'http']}, 'templates': {'version': '2.9.1', 'requires': []}, 'http': {'version': '1.4.0', 'requires': []}, 'sms': {'version': '0.8.2', 'requires': ['http']}}, [{'package': 'http', 'fixed': '9.0.0', 'severity': 'urgent'}])",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "An unknown severity in an advisory that doesn't apply",
     "type": "raises",
     "call": "plan_updates({'app': {'version': '1.0.0', 'requires': ['web', 'sms']}, 'web': {'version': '3.1.0', 'requires': ['templates', 'http']}, 'templates': {'version': '2.9.1', 'requires': []}, 'http': {'version': '1.4.0', 'requires': []}, 'sms': {'version': '0.8.2', 'requires': ['http']}}, [{'package': 'yaml', 'fixed': '9.0.0', 'severity': 'urgent'}])",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "A cycle",
     "type": "raises",
     "call": "update_order({'a': {'version': '1.0.0', 'requires': ['b']}, 'b': {'version': '1.0.0', 'requires': ['a']}}, {'a': ('1.0.0', '1.0.1', 'low', 90), 'b': ('1.0.0', '1.0.1', 'low', 90)})",
     "error": "ValueError",
     "hidden": true
    }
   ]
  }
 ],
 "cx6": [
  {
   "id": "ab_readout",
   "title": "Reading out an A/B test",
   "prompt": "<p>MATH 230's <code>two_proportion_z</code> answers one question about an A/B test. A readout, as in the notes, answers three: was the split valid, how big is the effect, and what do we do? Write:</p>\n<ul>\n<li><code>srm_p(n_a, n_b, ratio=0.5)</code>: the two-sided p-value for a sample ratio mismatch, where the planned fraction of the <em>n</em> = n_a + n_b users in group B is <code>ratio</code>: <em>z</em> = (n_b − <em>n</em>·ratio)/√(<em>n</em>·ratio·(1 − ratio)) and <em>p</em> = 2(1 − Φ(|<em>z</em>|)). Raise <code>ValueError</code> if <em>n</em> is 0 or ratio isn't strictly between 0 and 1.</li>\n<li><code>readout(n_a, k_a, n_b, k_b, min_effect, ratio=0.5)</code>: with conversion rates <em>p</em><sub>a</sub> = k_a/n_a and <em>p</em><sub>b</sub> = k_b/n_b, the difference <em>d</em> = <em>p</em><sub>b</sub> − <em>p</em><sub>a</sub> and its 95% interval <em>d</em> ± 1.96√(<em>p</em><sub>a</sub>(1 − <em>p</em><sub>a</sub>)/n_a + <em>p</em><sub>b</sub>(1 − <em>p</em><sub>b</sub>)/n_b). <code>min_effect</code> is in the same units as <em>d</em>, a difference of fractions: the notes' minimum of 3 points is <code>0.03</code>. The decision is <code>\"invalid\"</code> if the SRM p-value is below 0.001; otherwise <code>\"ship\"</code> if the interval's lower end is above 0 and <em>d</em> ≥ min_effect; otherwise <code>\"don't ship\"</code> if its upper end is below min_effect; otherwise <code>\"inconclusive\"</code>. Return <code>{\"srm_p\": ..., \"diff\": ..., \"ci\": (low, high), \"decision\": ...}</code> with the numbers rounded to 4 places. Raise <code>ValueError</code> for an empty group or a count outside 0 to its group size.</li>\n</ul>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef srm_p(n_a, n_b, ratio=0.5):\n    pass\n\ndef readout(n_a, k_a, n_b, k_b, min_effect, ratio=0.5):\n    pass\n",
   "hint": "<p><code>NormalDist().cdf(x)</code> is Φ(<em>x</em>). Compute the decision from the unrounded values and round only the numbers you return.</p>",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef srm_p(n_a, n_b, ratio=0.5):\n    n = n_a + n_b\n    if n == 0 or not 0 < ratio < 1:\n        raise ValueError(\"need visitors and 0 < ratio < 1\")\n    z = (n_b - n * ratio) / math.sqrt(n * ratio * (1 - ratio))\n    return 2 * (1 - NormalDist().cdf(abs(z)))\n\ndef readout(n_a, k_a, n_b, k_b, min_effect, ratio=0.5):\n    if not (0 <= k_a <= n_a and 0 <= k_b <= n_b) or n_a == 0 or n_b == 0:\n        raise ValueError(\"bad counts\")\n    p_srm = srm_p(n_a, n_b, ratio)\n    pa, pb = k_a / n_a, k_b / n_b\n    diff = pb - pa\n    se = math.sqrt(pa * (1 - pa) / n_a + pb * (1 - pb) / n_b)\n    low, high = diff - 1.96 * se, diff + 1.96 * se\n    if p_srm < 0.001:\n        decision = \"invalid\"\n    elif low > 0 and diff >= min_effect:\n        decision = \"ship\"\n    elif high < min_effect:\n        decision = \"don't ship\"\n    else:\n        decision = \"inconclusive\"\n    return {\"srm_p\": round(p_srm, 4), \"diff\": round(diff, 4), \"ci\": (round(low, 4), round(high, 4)), \"decision\": decision}\n",
   "tests": [
    {
     "label": "A clear win",
     "call": "readout(5000, 400, 5000, 470, 0.01)",
     "expect": "{'srm_p': 1.0, 'diff': 0.014, 'ci': (0.003, 0.025), 'decision': 'ship'}"
    },
    {
     "label": "A small mismatch that is not significant",
     "call": "readout(5000, 400, 5300, 470, 0.01)",
     "expect": "{'srm_p': 0.0031, 'diff': 0.0087, 'ci': (-0.0021, 0.0194), 'decision': 'inconclusive'}"
    },
    {
     "label": "A real but too-small effect",
     "call": "readout(200000, 20000, 200000, 20400, 0.01)",
     "expect": "{'srm_p': 1.0, 'diff': 0.002, 'ci': (0.0001, 0.0039), 'decision': \"don't ship\"}"
    },
    {
     "label": "A sample ratio mismatch makes it invalid",
     "call": "readout(10000, 800, 10500, 900, 0.005)",
     "expect": "{'srm_p': 0.0005, 'diff': 0.0057, 'ci': (-0.0018, 0.0133), 'decision': 'invalid'}"
    },
    {
     "label": "The SRM p-value of a 1,000 versus 1,100 split",
     "call": "round(srm_p(1000, 1100), 4)",
     "expect": "0.0291"
    },
    {
     "label": "A planned 90/10 split",
     "call": "round(srm_p(9000, 1000, ratio=0.1), 4)",
     "expect": "1.0",
     "hidden": true
    },
    {
     "label": "Too small to tell",
     "call": "readout(300, 30, 300, 36, 0.02)",
     "expect": "{'srm_p': 1.0, 'diff': 0.02, 'ci': (-0.03, 0.07), 'decision': 'inconclusive'}",
     "hidden": true
    },
    {
     "label": "A bad ratio",
     "type": "raises",
     "call": "srm_p(10, 10, 1)",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "More conversions than users",
     "type": "raises",
     "call": "readout(10, 11, 10, 2, 0.01)",
     "error": "ValueError",
     "hidden": true
    }
   ]
  },
  {
   "id": "paired_eval",
   "title": "Comparing two systems on the same tasks",
   "prompt": "<p>A thesis often compares a new method B with a baseline A on the same benchmark items, so the results come in pairs. Work with the differences <em>d</em><sub>i</sub> = b<sub>i</sub> − a<sub>i</sub>. Write:</p>\n<ul>\n<li><code>paired_ci(a, b, reps=2000, seed=0)</code>: a bootstrap interval for the mean difference, as in MATH 230 Lesson 6: with <code>rng = random.Random(seed)</code>, compute the mean of <code>rng.choices(d, k=len(d))</code> <code>reps</code> times, sort the means, and return the values at positions ⌊0.025·reps⌋ and ⌊0.975·reps⌋ − 1, each rounded to 4 places.</li>\n<li><code>sign_flip_p(a, b, trials=2000, seed=0)</code>: the paired permutation test from the notes. With <code>rng = random.Random(seed)</code>, in each trial go through <em>d</em> in order and keep each difference if <code>rng.random() &lt; 0.5</code>, else negate it; count the trials whose mean has absolute value at least |mean(<em>d</em>)| − 1e-12. Return count/trials.</li>\n</ul>\n<p>Both raise <code>ValueError</code> if the lists are empty or of different lengths.</p>",
   "starter": "import random\n\ndef paired_ci(a, b, reps=2000, seed=0):\n    pass\n\ndef sign_flip_p(a, b, trials=2000, seed=0):\n    pass\n",
   "hint": "<p>Make exactly one <code>rng.random()</code> call per difference per trial, in order, or your p-value won't match. A generator expression such as <code>sum(x if rng.random() &lt; 0.5 else -x for x in d)</code> does that.</p>",
   "solution": "import random\ndef _diffs(a, b):\n    if len(a) != len(b) or not a:\n        raise ValueError(\"need two non-empty lists of the same length\")\n    return [y - x for x, y in zip(a, b)]\n\ndef paired_ci(a, b, reps=2000, seed=0):\n    d = _diffs(a, b)\n    rng = random.Random(seed)\n    means = sorted(sum(rng.choices(d, k=len(d))) / len(d) for _ in range(reps))\n    return (round(means[int(0.025 * reps)], 4), round(means[int(0.975 * reps) - 1], 4))\n\ndef sign_flip_p(a, b, trials=2000, seed=0):\n    d = _diffs(a, b)\n    rng = random.Random(seed)\n    obs = abs(sum(d) / len(d))\n    count = 0\n    for _ in range(trials):\n        s = sum(x if rng.random() < 0.5 else -x for x in d)\n        if abs(s / len(d)) >= obs - 1e-12:\n            count += 1\n    return count / trials\n",
   "tests": [
    {
     "label": "The notes' ten benchmark items: interval",
     "call": "paired_ci([0.61, 0.55, 0.72, 0.48, 0.66, 0.59, 0.70, 0.52, 0.63, 0.57], [0.65, 0.58, 0.71, 0.55, 0.70, 0.60, 0.76, 0.53, 0.69, 0.60])",
     "expect": "(0.019, 0.049)"
    },
    {
     "label": "The notes' ten benchmark items: p-value",
     "call": "sign_flip_p([0.61, 0.55, 0.72, 0.48, 0.66, 0.59, 0.70, 0.52, 0.63, 0.57], [0.65, 0.58, 0.71, 0.55, 0.70, 0.60, 0.76, 0.53, 0.69, 0.60])",
     "expect": "0.0085"
    },
    {
     "label": "No difference at all",
     "call": "sign_flip_p([1, 2, 3], [1, 2, 3], trials=50)",
     "expect": "1.0"
    },
    {
     "label": "Mixed results",
     "call": "sign_flip_p([5, 6, 7, 8], [6, 5, 8, 9], trials=500, seed=1)",
     "expect": "0.592"
    },
    {
     "label": "Another seed",
     "call": "paired_ci([0.61, 0.55, 0.72, 0.48, 0.66, 0.59, 0.70, 0.52, 0.63, 0.57], [0.65, 0.58, 0.71, 0.55, 0.70, 0.60, 0.76, 0.53, 0.69, 0.60], reps=500, seed=4)",
     "expect": "(0.019, 0.047)",
     "hidden": true
    },
    {
     "label": "Lists of different lengths",
     "type": "raises",
     "call": "paired_ci([1, 2], [1])",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "Empty lists",
     "type": "raises",
     "call": "sign_flip_p([], [])",
     "error": "ValueError",
     "hidden": true
    }
   ]
  }
 ],
 "cx7": [
  {
   "id": "license_check",
   "title": "Checking dependency licenses",
   "prompt": "<p>Check each dependency's SPDX license expression against the project's policy (the notes' section on licenses). An expression is made of license identifiers (letters, digits and the characters <code>. + : -</code>), the operators <code>AND</code>, <code>OR</code> and <code>WITH</code> (in capitals: lower-case <code>and</code> is not an operator), and parentheses. <code>WITH</code> binds tightest and joins a license to an exception; <code>AND</code> binds tighter than <code>OR</code>. Write:</p>\n<ul>\n<li><code>parse_license(expr)</code>: a tree of tuples: <code>(\"license\", id, exception_or_None)</code>, <code>(\"and\", left, right)</code> and <code>(\"or\", left, right)</code>, with chains of the same operator grouped from the left. Raise <code>ValueError</code> for anything malformed: an empty expression, a missing operand, an unmatched parenthesis, a stray character, or two licenses with no operator between them.</li>\n<li><code>allowed(expr, policy)</code>: <code>policy</code> is a list of allowed licenses. A leaf is allowed if its identifier is in the policy, ignoring case, or if it has an exception and the text <code>\"ID WITH EXCEPTION\"</code> is in the policy, ignoring case. An AND needs both sides, an OR either.</li>\n<li><code>check_licenses(deps, policy)</code>: <code>deps</code> maps package names to expressions. Return <code>{\"ok\": [...], \"violations\": [...], \"errors\": [...]}</code>, each list sorted, with a package in <code>\"errors\"</code> if its expression is malformed.</li>\n</ul>",
   "starter": "import re\n\ndef parse_license(expr):\n    pass\n\ndef allowed(expr, policy):\n    pass\n\ndef check_licenses(deps, policy):\n    pass\n",
   "hint": "<p>Tokenize with a regular expression for <code>(</code>, <code>)</code> and runs of identifier characters, then parse by recursive descent with one function per precedence level, as for arithmetic with + and ×: <em>or</em> calls <em>and</em>, which calls <em>primary</em>, which handles parentheses and WITH.</p>",
   "solution": "import re\nimport re\nTOKEN = re.compile(r\"\\s*(\\(|\\)|[A-Za-z0-9.+:-]+)\")\n\ndef _tokens(expr):\n    toks, pos = [], 0\n    expr = expr.strip()\n    while pos < len(expr):\n        m = TOKEN.match(expr, pos)\n        if not m:\n            raise ValueError(\"bad character in \" + expr)\n        toks.append(m.group(1))\n        pos = m.end()\n        while pos < len(expr) and expr[pos].isspace():\n            pos += 1\n    return toks\n\ndef parse_license(expr):\n    toks = _tokens(expr)\n    i = 0\n    def peek():\n        return toks[i] if i < len(toks) else None\n    def take():\n        nonlocal i\n        i += 1\n        return toks[i - 1]\n    def primary():\n        t = peek()\n        if t is None or t in (\"AND\", \"OR\", \"WITH\", \")\"):\n            raise ValueError(\"expected a license in \" + expr)\n        take()\n        if t == \"(\":\n            node = disj()\n            if peek() != \")\":\n                raise ValueError(\"missing ) in \" + expr)\n            take()\n            return node\n        if peek() == \"WITH\":\n            take()\n            exc = peek()\n            if exc is None or exc in (\"AND\", \"OR\", \"WITH\", \"(\", \")\"):\n                raise ValueError(\"WITH needs an exception in \" + expr)\n            take()\n            return (\"license\", t, exc)\n        return (\"license\", t, None)\n    def conj():\n        node = primary()\n        while peek() == \"AND\":\n            take()\n            node = (\"and\", node, primary())\n        return node\n    def disj():\n        node = conj()\n        while peek() == \"OR\":\n            take()\n            node = (\"or\", node, conj())\n        return node\n    tree = disj()\n    if i != len(toks):\n        raise ValueError(\"unexpected \" + toks[i] + \" in \" + expr)\n    return tree\n\ndef allowed(expr, policy):\n    pol = {p.lower() for p in policy}\n    def ok(node):\n        if node[0] == \"license\":\n            _, lic, exc = node\n            if lic.lower() in pol:\n                return True\n            return exc is not None and (lic + \" WITH \" + exc).lower() in pol\n        if node[0] == \"and\":\n            return ok(node[1]) and ok(node[2])\n        return ok(node[1]) or ok(node[2])\n    return ok(parse_license(expr))\n\ndef check_licenses(deps, policy):\n    out = {\"ok\": [], \"violations\": [], \"errors\": []}\n    for name in sorted(deps):\n        try:\n            out[\"ok\" if allowed(deps[name], policy) else \"violations\"].append(name)\n        except ValueError:\n            out[\"errors\"].append(name)\n    return out\n",
   "tests": [
    {
     "label": "Precedence: AND before OR",
     "call": "parse_license('MIT OR Apache-2.0 AND BSD-3-Clause')",
     "expect": "('or', ('license', 'MIT', None), ('and', ('license', 'Apache-2.0', None), ('license', 'BSD-3-Clause', None)))"
    },
    {
     "label": "Parentheses and WITH",
     "call": "parse_license('(MIT OR GPL-3.0-or-later) AND GPL-2.0-only WITH Classpath-exception-2.0')",
     "expect": "('and', ('or', ('license', 'MIT', None), ('license', 'GPL-3.0-or-later', None)), ('license', 'GPL-2.0-only', 'Classpath-exception-2.0'))"
    },
    {
     "label": "Chains group from the left",
     "call": "parse_license('A AND B AND C')",
     "expect": "('and', ('and', ('license', 'A', None), ('license', 'B', None)), ('license', 'C', None))"
    },
    {
     "label": "Checking a project's dependencies",
     "call": "check_licenses({'flask': 'BSD-3-Clause', 'left-pad': 'WTFPL', 'dual': 'MIT OR GPL-3.0-only', 'both': 'MIT AND GPL-3.0-only', 'java-ish': 'GPL-2.0-only WITH Classpath-exception-2.0', 'broken': 'MIT AND', 'lower': 'apache-2.0'}, ['MIT', 'BSD-3-Clause', 'Apache-2.0', 'ISC', 'GPL-2.0-only WITH Classpath-exception-2.0'])",
     "expect": "{'ok': ['dual', 'flask', 'java-ish', 'lower'], 'violations': ['both', 'left-pad'], 'errors': ['broken']}"
    },
    {
     "label": "A license with an exception, allowed because the license is",
     "call": "allowed('Apache-2.0 WITH LLVM-exception', ['Apache-2.0'])",
     "expect": "True"
    },
    {
     "label": "Lower-case 'or' is not an operator",
     "call": "check_licenses({'x': 'MIT or ISC'}, ['MIT', 'BSD-3-Clause', 'Apache-2.0', 'ISC', 'GPL-2.0-only WITH Classpath-exception-2.0'])",
     "expect": "{'ok': [], 'violations': [], 'errors': ['x']}",
     "hidden": true
    },
    {
     "label": "An unmatched parenthesis",
     "type": "raises",
     "call": "parse_license('(MIT OR ISC')",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "Two licenses with no operator",
     "type": "raises",
     "call": "parse_license('MIT ISC')",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "An empty expression",
     "type": "raises",
     "call": "parse_license('  ')",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "A stray character",
     "type": "raises",
     "call": "parse_license('MIT / ISC')",
     "error": "ValueError",
     "hidden": true
    }
   ]
  },
  {
   "id": "doc_links",
   "title": "Checking documentation links",
   "prompt": "<p>Documentation rots when files move. Write a link checker for a repository's Markdown files, as a CI step from the notes would run.</p>\n<ul>\n<li><code>slugs(text)</code>: the anchors of a Markdown file's headings, in order. A heading is a line starting with one to six <code>#</code> characters and a space, outside fenced code blocks (a line whose first non-space characters are <code>```</code> opens or closes one). Take the heading's text with any trailing <code>#</code>s and spaces removed, lower-case it, delete every character that isn't a letter, digit, underscore, hyphen or space, and replace each space with a hyphen. Letters and digits are meant in the Unicode sense, as <code>\\w</code> in a Python regular expression matches them, so <code>## Diátaxis</code> gives <code>diátaxis</code>. A slug that repeats an earlier one gets <code>-1</code>, <code>-2</code>, … appended, as GitHub does.</li>\n<li><code>check_links(files)</code>: <code>files</code> maps paths such as <code>\"docs/runbook.md\"</code> to their text. Find every link <code>[text](target)</code> and image <code>![alt](target)</code> outside fenced code blocks. Skip targets with a scheme (such as <code>https:</code> or <code>mailto:</code>). Split the target at the first <code>#</code>: the file part is resolved relative to the linking file's directory (use <code>posixpath</code>), and an empty file part means the same file. Report <code>\"missing file\"</code> if the resolved path isn't in <code>files</code>, and otherwise <code>\"missing anchor\"</code> if there is an anchor, the target is a <code>.md</code> file and the anchor isn't one of its slugs. Return a sorted list of <code>(file, line_number, target, problem)</code>, with lines numbered from 1.</li>\n</ul>",
   "starter": "import posixpath, re\n\ndef slugs(text):\n    pass\n\ndef check_links(files):\n    pass\n",
   "hint": "<p>The pattern <code>!?\\[[^\\]]*\\]\\(([^)\\s]+)\\)</code> finds links and images and captures the target. <code>posixpath.normpath(posixpath.join(posixpath.dirname(path), part))</code> resolves <code>../README.md</code> from <code>docs/runbook.md</code>. A scheme is a letter followed by letters, digits, <code>+ . -</code> and then a colon.</p>",
   "solution": "import re\nimport posixpath\nLINK = re.compile(r\"!?\\[[^\\]]*\\]\\(([^)\\s]+)\\)\")\nHEADING = re.compile(r\"#{1,6}\\s+(.*?)\\s*#*\\s*$\")\n\ndef slugs(text):\n    out, seen, fence = [], {}, False\n    for line in text.splitlines():\n        if line.lstrip().startswith(\"```\"):\n            fence = not fence\n            continue\n        if fence:\n            continue\n        m = HEADING.match(line)\n        if not m:\n            continue\n        s = re.sub(r\"[^\\w\\- ]\", \"\", m.group(1).lower()).replace(\" \", \"-\")\n        if s in seen:\n            seen[s] += 1\n            out.append(s + \"-\" + str(seen[s]))\n        else:\n            seen[s] = 0\n            out.append(s)\n    return out\n\ndef check_links(files):\n    problems = []\n    anchors = {path: set(slugs(text)) for path, text in files.items() if path.endswith(\".md\")}\n    for path, text in files.items():\n        fence = False\n        for n, line in enumerate(text.splitlines(), start=1):\n            if line.lstrip().startswith(\"```\"):\n                fence = not fence\n                continue\n            if fence:\n                continue\n            for m in LINK.finditer(line):\n                target = m.group(1)\n                if re.match(r\"[a-z][a-z0-9+.-]*:\", target, re.I):\n                    continue\n                file_part, _, anchor = target.partition(\"#\")\n                if file_part:\n                    resolved = posixpath.normpath(posixpath.join(posixpath.dirname(path), file_part))\n                else:\n                    resolved = path\n                if resolved not in files:\n                    problems.append((path, n, target, \"missing file\"))\n                elif anchor and resolved.endswith(\".md\") and anchor not in anchors[resolved]:\n                    problems.append((path, n, target, \"missing anchor\"))\n    return sorted(problems)\n",
   "tests": [
    {
     "label": "Slugs, duplicates and a fenced block",
     "call": "slugs('# Pantry check-in\\n## Setup\\n```\\n# not a heading\\n```\\n## Setup\\n### What\\'s next? ##\\n#Not a heading\\n')",
     "expect": "['pantry-check-in', 'setup', 'setup-1', 'whats-next']"
    },
    {
     "label": "Accented letters are kept",
     "call": "slugs('# Diátaxis\\n## Café & tea\\n')",
     "expect": "['diátaxis', 'café--tea']",
     "hidden": true
    },
    {
     "label": "Checking a small repository",
     "call": "check_links({'README.md': '# Pantry check-in\\nSee the [runbook](docs/runbook.md#restore-a-backup) and [setup](#set-up).\\n## Set up\\n![architecture](docs/arch.png) and [the site](https://example.org).\\nLicense: [MIT](LICENSE)\\n', 'LICENSE': 'MIT License', 'docs/runbook.md': '# Runbook\\n## Restore a backup\\nBack to the [README](../README.md#pantry-check-in), or read [ADR 7](adr/0007-offline.md) and [the alert](#check-in-errors).\\n```\\n[not a link](nowhere.md)\\n```\\n## Check-in errors\\n', 'docs/adr/0007-offline.md': '# 7. Queue check-ins offline\\nSee [the runbook](../runbook.md#restore-backups).\\n'})",
     "expect": "[('README.md', 4, 'docs/arch.png', 'missing file'), ('docs/adr/0007-offline.md', 2, '../runbook.md#restore-backups', 'missing anchor')]"
    },
    {
     "label": "A repository with no problems",
     "call": "check_links({'a.md': '# Top\\n[b](sub/b.md#end) [top](#top)\\n', 'sub/b.md': '## End\\n[up](../a.md)\\n'})",
     "expect": "[]"
    },
    {
     "label": "Anchors on non-Markdown files aren't checked",
     "call": "check_links({'a.md': '[code](app.py#L10) [mail](mailto:x@example.org)', 'app.py': ''})",
     "expect": "[]",
     "hidden": true
    },
    {
     "label": "A link that escapes the repository",
     "call": "check_links({'docs/a.md': '[x](../../b.md)', 'b.md': ''})",
     "expect": "[('docs/a.md', 1, '../../b.md', 'missing file')]",
     "hidden": true
    }
   ]
  }
 ],
 "cx8": [
  {
   "id": "contributions",
   "title": "Evidence for a reflection",
   "prompt": "<p>Summarize who did what from a commit log, merging each person's identities with a mailmap. The log is the output of <code>git log --numstat --format=\"@%h|%an|%ae\"</code>: a line <code>@hash|name|email</code> for each commit, followed by one line per file changed, <code>added&lt;TAB&gt;deleted&lt;TAB&gt;path</code>, where a binary file shows <code>-</code> for both numbers. Blank lines may appear anywhere. Write:</p>\n<ul>\n<li><code>parse_mailmap(text)</code>: lines of the forms <code>Proper Name &lt;commit@email&gt;</code>, <code>&lt;proper@email&gt; &lt;commit@email&gt;</code> and <code>Proper Name &lt;proper@email&gt; &lt;commit@email&gt;</code>; <code>#</code> starts a comment and blank lines are ignored. Return a dict from each commit email, lower-cased, to <code>(proper_name_or_None, proper_email_or_None)</code>. Raise <code>ValueError</code> for a line with no email or more than two.</li>\n<li><code>contributions(log, mailmap=\"\")</code>: a dict, with keys in sorted order, from each author's name, replaced by the mailmap's proper name when the commit email (ignoring case) has one, to <code>{\"commits\": ..., \"added\": ..., \"deleted\": ..., \"files\": ...}</code>, where files is the number of distinct paths the author touched (binary files count; their lines don't). Raise <code>ValueError</code> for a commit line without three fields, a file line that doesn't have three tab-separated fields, or a file line before any commit.</li>\n</ul>",
   "starter": "import re\n\ndef parse_mailmap(text):\n    pass\n\ndef contributions(log, mailmap=\"\"):\n    pass\n",
   "hint": "<p><code>re.findall(r\"&lt;([^&lt;&gt;]*)&gt;\", line)</code> gives the emails on a mailmap line; the name is whatever comes before the first <code>&lt;</code>. Keep a set of paths per author and count it at the end.</p>",
   "solution": "import re\nEMAIL = re.compile(r\"<([^<>]*)>\")\n\ndef parse_mailmap(text):\n    m = {}\n    for raw in text.splitlines():\n        line = raw.split(\"#\", 1)[0].strip()\n        if not line:\n            continue\n        emails = EMAIL.findall(line)\n        name = line.split(\"<\", 1)[0].strip() or None\n        if len(emails) == 1:\n            m[emails[0].lower()] = (name, None)\n        elif len(emails) == 2:\n            m[emails[1].lower()] = (name, emails[0])\n        else:\n            raise ValueError(\"bad mailmap line: \" + raw)\n    return m\n\ndef contributions(log, mailmap=\"\"):\n    mm = parse_mailmap(mailmap)\n    stats, files, author = {}, {}, None\n    for raw in log.splitlines():\n        line = raw.strip()\n        if not line:\n            continue\n        if line.startswith(\"@\"):\n            parts = line[1:].split(\"|\")\n            if len(parts) != 3:\n                raise ValueError(\"bad commit line: \" + raw)\n            _, name, email = (p.strip() for p in parts)\n            proper = mm.get(email.lower(), (None, None))[0]\n            author = proper or name\n            stats.setdefault(author, {\"commits\": 0, \"added\": 0, \"deleted\": 0, \"files\": 0})\n            files.setdefault(author, set())\n            stats[author][\"commits\"] += 1\n            continue\n        if author is None:\n            raise ValueError(\"file line before any commit\")\n        parts = line.split(\"\\t\")\n        if len(parts) != 3:\n            raise ValueError(\"bad numstat line: \" + raw)\n        added, deleted, path = parts\n        if added != \"-\":\n            stats[author][\"added\"] += int(added)\n            stats[author][\"deleted\"] += int(deleted)\n        files[author].add(path)\n    for a in stats:\n        stats[a][\"files\"] = len(files[a])\n    return dict(sorted(stats.items()))\n",
   "tests": [
    {
     "label": "Parsing a mailmap",
     "call": "parse_mailmap('# canonical identities\\nAna Diaz <ana@uni.edu> <ANA.DIAZ@gmail.com>\\n\\nChloe Wu <chloe@uni.edu>\\n')",
     "expect": "{'ana.diaz@gmail.com': ('Ana Diaz', 'ana@uni.edu'), 'chloe@uni.edu': ('Chloe Wu', None)}"
    },
    {
     "label": "Without a mailmap, Ana appears twice",
     "call": "contributions('@a1|Ana Diaz|ana@uni.edu\\n12\\t3\\tsrc/checkin.py\\n40\\t0\\ttests/test_checkin.py\\n\\n@b2|Ben Okoro|ben@uni.edu\\n5\\t5\\tsrc/checkin.py\\n-\\t-\\tdocs/arch.png\\n\\n@c3|ana|ana.diaz@gmail.com\\n7\\t1\\tdocs/runbook.md\\n\\n@d4|Chloe Wu|chloe@uni.edu\\n0\\t120\\tsrc/old_import.py\\n')",
     "expect": "{'Ana Diaz': {'commits': 1, 'added': 52, 'deleted': 3, 'files': 2}, 'Ben Okoro': {'commits': 1, 'added': 5, 'deleted': 5, 'files': 2}, 'Chloe Wu': {'commits': 1, 'added': 0, 'deleted': 120, 'files': 1}, 'ana': {'commits': 1, 'added': 7, 'deleted': 1, 'files': 1}}"
    },
    {
     "label": "With the mailmap, her identities merge",
     "call": "contributions('@a1|Ana Diaz|ana@uni.edu\\n12\\t3\\tsrc/checkin.py\\n40\\t0\\ttests/test_checkin.py\\n\\n@b2|Ben Okoro|ben@uni.edu\\n5\\t5\\tsrc/checkin.py\\n-\\t-\\tdocs/arch.png\\n\\n@c3|ana|ana.diaz@gmail.com\\n7\\t1\\tdocs/runbook.md\\n\\n@d4|Chloe Wu|chloe@uni.edu\\n0\\t120\\tsrc/old_import.py\\n', '# canonical identities\\nAna Diaz <ana@uni.edu> <ANA.DIAZ@gmail.com>\\n\\nChloe Wu <chloe@uni.edu>\\n')",
     "expect": "{'Ana Diaz': {'commits': 2, 'added': 59, 'deleted': 4, 'files': 3}, 'Ben Okoro': {'commits': 1, 'added': 5, 'deleted': 5, 'files': 2}, 'Chloe Wu': {'commits': 1, 'added': 0, 'deleted': 120, 'files': 1}}"
    },
    {
     "label": "Changing only the email",
     "call": "parse_mailmap('<new@x.org> <Old@X.org>  # moved')",
     "expect": "{'old@x.org': (None, 'new@x.org')}",
     "hidden": true
    },
    {
     "label": "A file line before any commit",
     "type": "raises",
     "call": "contributions('1\\t2\\ta.py')",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "A mailmap line with no email",
     "type": "raises",
     "call": "parse_mailmap('Ana Diaz')",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "A bad numstat line",
     "type": "raises",
     "call": "contributions('@a|A|a@x\\n12 3 a.py')",
     "error": "ValueError",
     "hidden": true
    }
   ]
  },
  {
   "id": "webpa",
   "title": "Peer-assessment weighting",
   "prompt": "<p>Implement the WebPA calculation from the notes. Write:</p>\n<ul>\n<li><code>webpa_scores(group, ratings)</code>: <code>group</code> lists the members; <code>ratings</code> maps each member who submitted to a dict of the marks they gave (themselves included). Divide each assessor's marks by that assessor's total, so each submission sums to 1. A member's score is the sum of the fractions they received, times the fudge factor len(group)/(number who submitted). Return a dict in group order, scores rounded to 4 places. Raise <code>ValueError</code> if the group is empty or has repeats, nobody submitted, a rating names someone outside the group, a mark is negative, or an assessor's marks total 0.</li>\n<li><code>individual_marks(team_mark, scores, weighting=0.5, cap=None)</code>: the proposed marks, before the instructor checks them against the history and observation. Each member's mark is team_mark × (1 − weighting) + score × team_mark × weighting. With a <code>cap</code>, keep it within team_mark ± cap (the course's policy uses 10 points). Then clip to [0, 100] and round to 1 place.</li>\n</ul>",
   "starter": "def webpa_scores(group, ratings):\n    pass\n\ndef individual_marks(team_mark, scores, weighting=0.5, cap=None):\n    pass\n",
   "hint": "<p>Start every member at 0.0 so that a member nobody rated still appears. Apply the cap before clipping to 100, using <code>max(lo, min(hi, mark))</code>.</p>",
   "solution": "def webpa_scores(group, ratings):\n    members = set(group)\n    if len(members) != len(group) or not group:\n        raise ValueError(\"group must be non-empty with no repeats\")\n    received = {m: 0.0 for m in group}\n    submitted = 0\n    for assessor, marks in ratings.items():\n        if assessor not in members or set(marks) - members:\n            raise ValueError(\"ratings name someone outside the group\")\n        if any(v < 0 for v in marks.values()):\n            raise ValueError(\"marks can't be negative\")\n        total = sum(marks.values())\n        if total == 0:\n            raise ValueError(assessor + \" gave no marks\")\n        submitted += 1\n        for m, v in marks.items():\n            received[m] += v / total\n    if submitted == 0:\n        raise ValueError(\"nobody submitted\")\n    fudge = len(group) / submitted\n    return {m: round(received[m] * fudge, 4) for m in group}\n\ndef individual_marks(team_mark, scores, weighting=0.5, cap=None):\n    out = {}\n    for m, s in scores.items():\n        mark = team_mark * (1 - weighting) + s * team_mark * weighting\n        if cap is not None:\n            mark = max(float(team_mark - cap), min(float(team_mark + cap), mark))\n        out[m] = round(min(100.0, max(0.0, mark)), 1)\n    return out\n",
   "tests": [
    {
     "label": "The notes' team, with Dev not submitting",
     "call": "webpa_scores(['Ana', 'Ben', 'Chloe', 'Dev'], {'Ana': {'Ana': 4, 'Ben': 4, 'Chloe': 3, 'Dev': 1}, 'Ben': {'Ana': 4, 'Ben': 4, 'Chloe': 4, 'Dev': 2}, 'Chloe': {'Ana': 5, 'Ben': 4, 'Chloe': 4, 'Dev': 1}})",
     "expect": "{'Ana': 1.3016, 'Ben': 1.2063, 'Chloe': 1.0952, 'Dev': 0.3968}"
    },
    {
     "label": "Marks from those scores",
     "call": "individual_marks(84, webpa_scores(['Ana', 'Ben', 'Chloe', 'Dev'], {'Ana': {'Ana': 4, 'Ben': 4, 'Chloe': 3, 'Dev': 1}, 'Ben': {'Ana': 4, 'Ben': 4, 'Chloe': 4, 'Dev': 2}, 'Chloe': {'Ana': 5, 'Ben': 4, 'Chloe': 4, 'Dev': 1}}))",
     "expect": "{'Ana': 96.7, 'Ben': 92.7, 'Chloe': 88.0, 'Dev': 58.7}"
    },
    {
     "label": "The same, with the course's 10-point cap",
     "call": "individual_marks(84, webpa_scores(['Ana', 'Ben', 'Chloe', 'Dev'], {'Ana': {'Ana': 4, 'Ben': 4, 'Chloe': 3, 'Dev': 1}, 'Ben': {'Ana': 4, 'Ben': 4, 'Chloe': 4, 'Dev': 2}, 'Chloe': {'Ana': 5, 'Ben': 4, 'Chloe': 4, 'Dev': 1}}), cap=10)",
     "expect": "{'Ana': 94.0, 'Ben': 92.7, 'Chloe': 88.0, 'Dev': 74.0}"
    },
    {
     "label": "Generous and harsh raters count equally",
     "call": "webpa_scores(['Ana', 'Ben', 'Chloe'], {'Ana': {'Ana': 3, 'Ben': 3, 'Chloe': 3}, 'Ben': {'Ana': 2, 'Ben': 2, 'Chloe': 2}, 'Chloe': {'Ana': 5, 'Ben': 5, 'Chloe': 5}})",
     "expect": "{'Ana': 1.0, 'Ben': 1.0, 'Chloe': 1.0}"
    },
    {
     "label": "Marks never exceed 100",
     "call": "individual_marks(95, {'a': 1.5, 'b': 0.5})",
     "expect": "{'a': 100.0, 'b': 71.2}",
     "hidden": true
    },
    {
     "label": "A rating of someone outside the group",
     "type": "raises",
     "call": "webpa_scores(['a', 'b'], {'a': {'a': 1, 'z': 2}})",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "All zeros",
     "type": "raises",
     "call": "webpa_scores(['a', 'b'], {'a': {'a': 0, 'b': 0}})",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "Nobody submitted",
     "type": "raises",
     "call": "webpa_scores(['a', 'b'], {})",
     "error": "ValueError",
     "hidden": true
    }
   ]
  }
 ]
});
