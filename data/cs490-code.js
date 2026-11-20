/* Auto-graded programming problems for CS 490, by lesson. Generated from a Python spec, so every
   string is JSON. Each problem is a small tool a capstone team can use on its own project. */
CSA.addCode("cs490", {
 "pj1": [
  {
   "id": "risk_register",
   "title": "A risk register",
   "prompt": "<p>A team keeps its risk register as a plain text file in the repository, one risk per line, in four fields separated by <code>|</code>:</p>\n<pre data-label=\"risks.txt\"><code># id | risk | likelihood | impact\nR1 | Client stops replying | 2 | 5\nR2 | Nobody on the team has used a barcode scanner | 4 | 3</code></pre>\n<p>Write two functions.</p>\n<ul>\n<li><code>parse_risks(text)</code> returns a list of dicts with keys <code>\"id\"</code>, <code>\"title\"</code>, <code>\"likelihood\"</code> and <code>\"impact\"</code>, in file order. Strip spaces around every field; the ratings become ints. Skip blank lines and lines whose first non-space character is <code>#</code>. Raise <code>ValueError</code> if a line doesn't have exactly four fields, if the id or title is empty, if a rating isn't a whole number from 1 to 5, or if an id appears twice.</li>\n<li><code>rank(risks)</code> takes such a list and returns a list of tuples <code>(id, exposure, level)</code>, where exposure = likelihood × impact and level is <code>\"high\"</code> for an exposure of 12 or more, <code>\"medium\"</code> for 5 to 11 and <code>\"low\"</code> below 5. Sort by exposure, largest first, breaking ties by id in ordinary string order.</li>\n</ul>",
   "starter": "def parse_risks(text):\n    pass\n\ndef rank(risks):\n    pass\n",
   "hint": "<p>Use <code>line.split(\"|\")</code> and check the length before unpacking. <code>\"3\".isdigit()</code> is True and <code>\"-1\".isdigit()</code> is False, which rejects signs and decimals. For the sort, a key of <code>(-exposure, id)</code> puts large exposures first and breaks ties by id.</p>",
   "solution": "def parse_risks(text):\n    risks = []\n    seen = set()\n    for raw in text.splitlines():\n        line = raw.strip()\n        if not line or line.startswith(\"#\"):\n            continue\n        parts = [p.strip() for p in line.split(\"|\")]\n        if len(parts) != 4 or not parts[0] or not parts[1]:\n            raise ValueError(\"bad line: \" + line)\n        rid, title, lk, im = parts\n        if not (lk.isdigit() and im.isdigit()):\n            raise ValueError(\"ratings must be whole numbers: \" + line)\n        lk, im = int(lk), int(im)\n        if not (1 <= lk <= 5 and 1 <= im <= 5):\n            raise ValueError(\"ratings must be 1 to 5: \" + line)\n        if rid in seen:\n            raise ValueError(\"duplicate id \" + rid)\n        seen.add(rid)\n        risks.append({\"id\": rid, \"title\": title, \"likelihood\": lk, \"impact\": im})\n    return risks\n\ndef rank(risks):\n    rows = []\n    for r in risks:\n        e = r[\"likelihood\"] * r[\"impact\"]\n        level = \"high\" if e >= 12 else \"medium\" if e >= 5 else \"low\"\n        rows.append((r[\"id\"], e, level))\n    rows.sort(key=lambda row: (-row[1], row[0]))\n    return rows\n",
   "tests": [
    {
     "label": "Parsing a register with a comment and a blank line",
     "call": "parse_risks('# id | risk | l | i\\nR1 | Client stops replying | 2 | 5\\n\\n  R2 |  Scanner unknown  | 4 | 3  \\n')",
     "expect": "[{'id': 'R1', 'title': 'Client stops replying', 'likelihood': 2, 'impact': 5}, {'id': 'R2', 'title': 'Scanner unknown', 'likelihood': 4, 'impact': 3}]"
    },
    {
     "label": "Ranking the notes' register",
     "call": "rank(parse_risks('R1 | Client stops replying | 2 | 5\\nR2 | Scanner unknown | 4 | 3\\nR3 | Wi-Fi drops | 3 | 4\\nR4 | Two members graduate | 1 | 3'))",
     "expect": "[('R2', 12, 'high'), ('R3', 12, 'high'), ('R1', 10, 'medium'), ('R4', 3, 'low')]"
    },
    {
     "label": "Level boundaries",
     "call": "rank([{'id': 'a', 'title': 't', 'likelihood': 1, 'impact': 4}, {'id': 'b', 'title': 't', 'likelihood': 1, 'impact': 5}, {'id': 'c', 'title': 't', 'likelihood': 1, 'impact': 1}, {'id': 'd', 'title': 't', 'likelihood': 5, 'impact': 5}])",
     "expect": "[('d', 25, 'high'), ('b', 5, 'medium'), ('a', 4, 'low'), ('c', 1, 'low')]"
    },
    {
     "label": "An empty register",
     "call": "rank(parse_risks('# nothing yet\\n'))",
     "expect": "[]"
    },
    {
     "label": "A rating of 6 is rejected",
     "type": "raises",
     "call": "parse_risks('R1 | x | 6 | 2')",
     "error": "ValueError"
    },
    {
     "label": "A decimal rating is rejected",
     "type": "raises",
     "call": "parse_risks('R1 | x | 2.5 | 2')",
     "error": "ValueError"
    },
    {
     "label": "Three fields is rejected",
     "type": "raises",
     "call": "parse_risks('R1 | 2 | 2')",
     "error": "ValueError"
    },
    {
     "label": "A duplicate id is rejected",
     "type": "raises",
     "call": "parse_risks('R1 | x | 1 | 2\\nR1 | y | 3 | 3')",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "An empty title is rejected",
     "type": "raises",
     "call": "parse_risks('R1 |  | 1 | 2')",
     "error": "ValueError",
     "hidden": true
    }
   ]
  },
  {
   "id": "meeting_slots",
   "title": "Finding a meeting time",
   "prompt": "<p>A team charter needs a weekly meeting time that everyone can make. Write <code>meeting_slots(availability, length)</code>. <code>availability</code> maps each member's name to a list of free periods <code>(day, start, end)</code>, where day is one of <code>\"Mon\"</code>, <code>\"Tue\"</code>, <code>\"Wed\"</code>, <code>\"Thu\"</code>, <code>\"Fri\"</code>, <code>\"Sat\"</code>, <code>\"Sun\"</code> and the times are 24-hour strings like <code>\"09:30\"</code>. A member's periods may overlap or touch (09:00–10:00 and 10:00–11:00 together make 09:00–11:00).</p>\n<p>Return a list of <code>(day, start, end)</code> tuples, with times in the same <code>\"HH:MM\"</code> form, for every maximal period in which <em>all</em> members are free and that lasts at least <code>length</code> minutes. Order them by day (Monday first) and then by start time. Return <code>[]</code> for an empty <code>availability</code>. Raise <code>ValueError</code> for an unknown day or a period whose start isn't before its end.</p>",
   "starter": "DAYS = [\"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\", \"Sun\"]\n\ndef meeting_slots(availability, length):\n    pass\n",
   "hint": "<p>Convert times to minutes after midnight. For each member and day, sort the periods and merge any that overlap or touch. Then, day by day, intersect the members' lists one member at a time: two sorted lists of disjoint intervals can be intersected with two indexes, as in the merge step of merge sort (CS 201 Lesson 6), always advancing past the interval that ends first.</p>",
   "solution": "DAYS = [\"Mon\", \"Tue\", \"Wed\", \"Thu\", \"Fri\", \"Sat\", \"Sun\"]\n\ndef _mins(t):\n    h, m = t.split(\":\")\n    return int(h) * 60 + int(m)\n\ndef _hhmm(x):\n    return f\"{x // 60:02d}:{x % 60:02d}\"\n\ndef _merge(iv):\n    out = []\n    for s, e in sorted(iv):\n        if out and s <= out[-1][1]:\n            out[-1][1] = max(out[-1][1], e)\n        else:\n            out.append([s, e])\n    return out\n\ndef _intersect(xs, ys):\n    out = []\n    i = j = 0\n    while i < len(xs) and j < len(ys):\n        s = max(xs[i][0], ys[j][0])\n        e = min(xs[i][1], ys[j][1])\n        if s < e:\n            out.append([s, e])\n        if xs[i][1] < ys[j][1]:\n            i += 1\n        else:\n            j += 1\n    return out\n\ndef meeting_slots(availability, length):\n    if not availability:\n        return []\n    people = []\n    for name, slots in availability.items():\n        days = {}\n        for day, s, e in slots:\n            if day not in DAYS:\n                raise ValueError(\"unknown day \" + str(day))\n            s, e = _mins(s), _mins(e)\n            if s >= e:\n                raise ValueError(\"start must be before end\")\n            days.setdefault(day, []).append((s, e))\n        people.append({d: _merge(v) for d, v in days.items()})\n    result = []\n    for day in DAYS:\n        common = people[0].get(day, [])\n        for p in people[1:]:\n            common = _intersect(common, p.get(day, []))\n        for s, e in common:\n            if e - s >= length:\n                result.append((day, _hhmm(s), _hhmm(e)))\n    return result\n",
   "tests": [
    {
     "label": "Three members, at least 60 minutes",
     "call": "meeting_slots({'Ana': [('Mon', '09:00', '12:00'), ('Wed', '13:00', '17:00')], 'Ben': [('Mon', '10:30', '15:00'), ('Wed', '09:00', '14:30')], 'Chloe': [('Mon', '08:00', '11:30'), ('Wed', '14:00', '16:00'), ('Wed', '12:00', '13:45')]}, 60)",
     "expect": "[('Mon', '10:30', '11:30')]"
    },
    {
     "label": "The same team, at least 30 minutes",
     "call": "meeting_slots({'Ana': [('Mon', '09:00', '12:00'), ('Wed', '13:00', '17:00')], 'Ben': [('Mon', '10:30', '15:00'), ('Wed', '09:00', '14:30')], 'Chloe': [('Mon', '08:00', '11:30'), ('Wed', '14:00', '16:00'), ('Wed', '12:00', '13:45')]}, 30)",
     "expect": "[('Mon', '10:30', '11:30'), ('Wed', '13:00', '13:45'), ('Wed', '14:00', '14:30')]"
    },
    {
     "label": "Touching and overlapping periods merge",
     "call": "meeting_slots({'Ana': [('Tue', '10:00', '11:00'), ('Tue', '09:00', '10:00'), ('Tue', '10:30', '12:00')], 'Ben': [('Tue', '08:00', '18:00')]}, 180)",
     "expect": "[('Tue', '09:00', '12:00')]"
    },
    {
     "label": "Days come out in week order",
     "call": "meeting_slots({'Ana': [('Fri', '15:00', '17:00'), ('Mon', '15:00', '16:00')]}, 60)",
     "expect": "[('Mon', '15:00', '16:00'), ('Fri', '15:00', '17:00')]"
    },
    {
     "label": "A day only one member has free gives nothing",
     "call": "meeting_slots({'Ana': [('Thu', '09:00', '17:00')], 'Ben': [('Fri', '09:00', '17:00')]}, 30)",
     "expect": "[]"
    },
    {
     "label": "No members",
     "call": "meeting_slots({}, 30)",
     "expect": "[]"
    },
    {
     "label": "An unknown day",
     "type": "raises",
     "call": "meeting_slots({'Ana': [('Monday', '09:00', '10:00')]}, 30)",
     "error": "ValueError"
    },
    {
     "label": "End before start",
     "type": "raises",
     "call": "meeting_slots({'Ana': [('Mon', '11:00', '10:00')]}, 30)",
     "error": "ValueError",
     "hidden": true
    }
   ]
  }
 ],
 "pj2": [
  {
   "id": "traceability",
   "title": "Tracing requirements to tests",
   "prompt": "<p>A requirements document numbers each requirement <code>REQ-1</code>, <code>REQ-2</code>, …, and each test names the requirements it checks in its docstring, for example <code>&quot;&quot;&quot;Covers REQ-3 and REQ-12.&quot;&quot;&quot;</code>. Write <code>trace(requirements, test_source)</code>. <code>requirements</code> maps each id to its priority, one of <code>\"must\"</code>, <code>\"should\"</code>, <code>\"could\"</code>, <code>\"wont\"</code>. <code>test_source</code> is the text of a pytest file. Use the <code>ast</code> module (CS 240 Lesson 7) to find the tests, as pytest would: every top-level function whose name starts with <code>test_</code>, named as it is, and every method whose name starts with <code>test_</code> in a top-level class whose name starts with <code>Test</code>, named <code>\"Class.method\"</code>.</p>\n<p>A test cites every <code>REQ-<em>n</em></code> in its docstring (use the regular expression <code>\\bREQ-(\\d+)\\b</code>); a test that cites the same id twice counts once. Return a dict with four keys:</p>\n<ul>\n<li><code>\"matrix\"</code>: a dict from every requirement id to the list of tests that cite it, in file order. Its keys are in numeric order (REQ-2 before REQ-10).</li>\n<li><code>\"untested\"</code>: the ids, in numeric order, with no test, leaving out \"wont\" requirements.</li>\n<li><code>\"unknown\"</code>: <code>(test, id)</code> pairs, in file order, for citations of ids that aren't requirements.</li>\n<li><code>\"untraced\"</code>: the tests, in file order, that cite no id at all.</li>\n</ul>",
   "starter": "import ast, re\n\ndef trace(requirements, test_source):\n    pass\n",
   "hint": "<p>Walk <code>ast.parse(test_source).body</code> (only the top level), looking for <code>ast.FunctionDef</code> and <code>ast.ClassDef</code> nodes; a class's methods are in its own <code>.body</code>. <code>ast.get_docstring(node)</code> returns a function's docstring or None. Sort the ids with <code>key=lambda r: int(r.split(\"-\")[1])</code>.</p>",
   "solution": "import ast, re\n\nREQ = re.compile(r\"\\bREQ-(\\d+)\\b\")\n\ndef _key(rid):\n    return int(rid.split(\"-\")[1])\n\ndef _tests(tree):\n    found = []\n    funcs = (ast.FunctionDef, ast.AsyncFunctionDef)\n    for node in tree.body:\n        if isinstance(node, funcs) and node.name.startswith(\"test_\"):\n            found.append((node.name, node))\n        elif isinstance(node, ast.ClassDef) and node.name.startswith(\"Test\"):\n            for sub in node.body:\n                if isinstance(sub, funcs) and sub.name.startswith(\"test_\"):\n                    found.append((node.name + \".\" + sub.name, sub))\n    return found\n\ndef trace(requirements, test_source):\n    matrix = {rid: [] for rid in sorted(requirements, key=_key)}\n    unknown, untraced = [], []\n    for name, node in _tests(ast.parse(test_source)):\n        ids = []\n        for m in REQ.finditer(ast.get_docstring(node) or \"\"):\n            rid = \"REQ-\" + m.group(1)\n            if rid not in ids:\n                ids.append(rid)\n        if not ids:\n            untraced.append(name)\n        for rid in ids:\n            if rid in matrix:\n                matrix[rid].append(name)\n            else:\n                unknown.append((name, rid))\n    untested = [rid for rid in matrix if not matrix[rid] and requirements[rid] != \"wont\"]\n    return {\"matrix\": matrix, \"untested\": untested, \"unknown\": unknown, \"untraced\": untraced}\n",
   "tests": [
    {
     "label": "A small test file",
     "type": "assert",
     "code": "src = '''\nimport pytest\n\ndef helper():\n    \"\"\"REQ-4 is mentioned here, but this is not a test.\"\"\"\n\ndef test_checkin_records_visit():\n    \"\"\"Covers REQ-1 and REQ-10.\"\"\"\n    assert True\n\ndef test_duplicate_visit_rejected():\n    \"\"\"Covers REQ-1, REQ-1 again, and REQ-7.\"\"\"\n\ndef test_smoke():\n    assert 1 + 1 == 2\n\nclass TestReports:\n    def test_weekly_total(self):\n        \"\"\"REQ-2\"\"\"\n    def helper(self):\n        \"\"\"REQ-4\"\"\"\n'''\nreqs = {\"REQ-1\": \"must\", \"REQ-2\": \"must\", \"REQ-10\": \"should\", \"REQ-3\": \"wont\", \"REQ-4\": \"could\"}\nr = trace(reqs, src)\nassert list(r[\"matrix\"]) == [\"REQ-1\", \"REQ-2\", \"REQ-3\", \"REQ-4\", \"REQ-10\"], f\"matrix keys in numeric order, got {list(r['matrix'])}\"\nassert r[\"matrix\"][\"REQ-1\"] == [\"test_checkin_records_visit\", \"test_duplicate_visit_rejected\"], r[\"matrix\"][\"REQ-1\"]\nassert r[\"matrix\"][\"REQ-2\"] == [\"TestReports.test_weekly_total\"], r[\"matrix\"][\"REQ-2\"]\nassert r[\"matrix\"][\"REQ-10\"] == [\"test_checkin_records_visit\"], r[\"matrix\"][\"REQ-10\"]\nassert r[\"matrix\"][\"REQ-4\"] == [], \"helpers are not tests\"\nassert r[\"untested\"] == [\"REQ-4\"], f\"untested: got {r['untested']}\"\nassert r[\"unknown\"] == [(\"test_duplicate_visit_rejected\", \"REQ-7\")], f\"unknown: got {r['unknown']}\"\nassert r[\"untraced\"] == [\"test_smoke\"], f\"untraced: got {r['untraced']}\"\n"
    },
    {
     "label": "No tests at all",
     "call": "trace({'REQ-2': 'must', 'REQ-1': 'wont'}, 'x = 1\\n')",
     "expect": "{'matrix': {'REQ-1': [], 'REQ-2': []}, 'untested': ['REQ-2'], 'unknown': [], 'untraced': []}"
    },
    {
     "label": "REQ-1 must not match inside REQ-12 or XREQ-1",
     "call": "trace({'REQ-1': 'must', 'REQ-12': 'must'}, 'def test_a():\\n    \"\"\"REQ-12 and XREQ-1\"\"\"\\n')['matrix']",
     "expect": "{'REQ-1': [], 'REQ-12': ['test_a']}"
    },
    {
     "label": "Nested functions are not collected",
     "call": "trace({'REQ-1': 'must'}, 'def test_outer():\\n    \"\"\"REQ-1\"\"\"\\n    def test_inner():\\n        \"\"\"REQ-1\"\"\"\\n')['matrix']",
     "expect": "{'REQ-1': ['test_outer']}",
     "hidden": true
    },
    {
     "label": "Classes not named Test... are skipped",
     "call": "trace({'REQ-1': 'must'}, 'class Helpers:\\n    def test_x(self):\\n        \"\"\"REQ-1\"\"\"\\n')['untested']",
     "expect": "['REQ-1']",
     "hidden": true
    }
   ]
  },
  {
   "id": "cost_of_delay",
   "title": "Ordering work by cost of delay",
   "prompt": "<p>Each feature is a tuple <code>(name, cost_of_delay, weeks)</code>: the value lost per week while it isn't delivered, and how many weeks the team needs to build it. The team builds one feature at a time. Write:</p>\n<ul>\n<li><code>delay_cost(order, features)</code>: the total cost of delay if the features are built in the given order of names. Time starts at 0 when work on the first feature begins, so a feature delivered at the end of week <em>t</em> (that is, <em>t</em> weeks after the start) costs cost_of_delay × <em>t</em>: a 1-week feature built first costs its cost of delay × 1, and a 3-week feature built next costs its cost of delay × 4. Raise <code>ValueError</code> if <code>order</code> doesn't name every feature exactly once.</li>\n<li><code>cd3_order(features)</code>: the names in order of <em>CD3</em> (cost of delay divided by duration), largest first, breaking ties by name.</li>\n</ul>\n<p>Both raise <code>ValueError</code> if any feature has weeks ≤ 0 or a negative cost of delay.</p>",
   "starter": "def delay_cost(order, features):\n    pass\n\ndef cd3_order(features):\n    pass\n",
   "hint": "<p>Keep a running total of weeks elapsed: add each feature's weeks, then add cost × elapsed to the total. To check the order, compare <code>sorted(order)</code> with the sorted names.</p>",
   "solution": "def _check(features):\n    for name, cod, weeks in features:\n        if weeks <= 0 or cod < 0:\n            raise ValueError(\"weeks must be positive and cost of delay non-negative\")\n\ndef delay_cost(order, features):\n    _check(features)\n    info = {name: (cod, weeks) for name, cod, weeks in features}\n    if sorted(order) != sorted(info) or len(info) != len(features):\n        raise ValueError(\"order must name every feature exactly once\")\n    elapsed = total = 0\n    for name in order:\n        cod, weeks = info[name]\n        elapsed += weeks\n        total += cod * elapsed\n    return total\n\ndef cd3_order(features):\n    _check(features)\n    return [f[0] for f in sorted(features, key=lambda f: (-f[1] / f[2], f[0]))]\n",
   "tests": [
    {
     "label": "The notes' three features in CD3 order",
     "call": "cd3_order([('shift reminders', 300, 1), ('low-stock alerts', 500, 4), ('faster check-in', 800, 3)])",
     "expect": "['shift reminders', 'faster check-in', 'low-stock alerts']"
    },
    {
     "label": "Cost of the CD3 order",
     "call": "delay_cost(['shift reminders', 'faster check-in', 'low-stock alerts'], [('shift reminders', 300, 1), ('low-stock alerts', 500, 4), ('faster check-in', 800, 3)])",
     "expect": "7500"
    },
    {
     "label": "Biggest value first costs more",
     "call": "delay_cost(['faster check-in', 'low-stock alerts', 'shift reminders'], [('shift reminders', 300, 1), ('low-stock alerts', 500, 4), ('faster check-in', 800, 3)])",
     "expect": "8300"
    },
    {
     "label": "CD3 is never beaten (all orders of four features)",
     "type": "assert",
     "code": "import itertools\nfs = [(\"a\", 120, 2), (\"b\", 400, 5), (\"c\", 90, 1), (\"d\", 250, 3)]\nbest = min(delay_cost(list(p), fs) for p in itertools.permutations(\"abcd\"))\ngot = delay_cost(cd3_order(fs), fs)\nassert got == best, f\"CD3 order costs {got}, but the best order costs {best}\"\n"
    },
    {
     "label": "Ties broken by name",
     "call": "cd3_order([('b', 100, 2), ('a', 50, 1), ('c', 10, 5)])",
     "expect": "['a', 'b', 'c']"
    },
    {
     "label": "A missing feature in the order",
     "type": "raises",
     "call": "delay_cost(['a'], [('a', 1, 1), ('b', 1, 1)])",
     "error": "ValueError"
    },
    {
     "label": "A repeated feature in the order",
     "type": "raises",
     "call": "delay_cost(['a', 'a'], [('a', 1, 1), ('b', 1, 1)])",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "Zero weeks",
     "type": "raises",
     "call": "cd3_order([('a', 10, 0)])",
     "error": "ValueError",
     "hidden": true
    }
   ]
  }
 ],
 "pj3": [
  {
   "id": "pert",
   "title": "Three-point estimates",
   "prompt": "<p>Implement the notes' PERT calculations.</p>\n<ul>\n<li><code>pert(a, m, b)</code> returns <code>(mean, sd)</code> for a task with optimistic, most likely and pessimistic estimates a, m and b: mean = (a + 4m + b)/6 and sd = (b − a)/6. Raise <code>ValueError</code> unless 0 ≤ a ≤ m ≤ b.</li>\n<li><code>path_estimate(tasks)</code> takes a list of <code>(a, m, b)</code> tuples for tasks done one after another and returns <code>(mean, sd)</code> for their total, adding means and adding variances (assuming the tasks are independent).</li>\n<li><code>prob_by(tasks, deadline)</code> returns the probability that the total is at most <code>deadline</code>, treating the total as normal with that mean and sd: Φ((deadline − mean)/sd), where Φ(z) = (1 + erf(z/√2))/2 (MATH 230 Lesson 3; use <code>math.erf</code>). If sd is 0, return 1.0 when deadline ≥ mean and 0.0 otherwise.</li>\n</ul>",
   "starter": "import math\n\ndef pert(a, m, b):\n    pass\n\ndef path_estimate(tasks):\n    pass\n\ndef prob_by(tasks, deadline):\n    pass\n",
   "hint": "<p>Variances add, standard deviations don't: sum sd² over the tasks and take the square root at the end.</p>",
   "solution": "import math\n\ndef pert(a, m, b):\n    if not (0 <= a <= m <= b):\n        raise ValueError(\"need 0 <= a <= m <= b\")\n    return (a + 4 * m + b) / 6, (b - a) / 6\n\ndef path_estimate(tasks):\n    mean = var = 0.0\n    for a, m, b in tasks:\n        mu, sd = pert(a, m, b)\n        mean += mu\n        var += sd * sd\n    return mean, math.sqrt(var)\n\ndef prob_by(tasks, deadline):\n    mean, sd = path_estimate(tasks)\n    if sd == 0:\n        return 1.0 if deadline >= mean else 0.0\n    z = (deadline - mean) / sd\n    return (1 + math.erf(z / math.sqrt(2))) / 2\n",
   "tests": [
    {
     "label": "One task",
     "call": "tuple(round(x, 4) for x in pert(3, 5, 13))",
     "expect": "(6.0, 1.6667)"
    },
    {
     "label": "The notes' four tasks",
     "call": "tuple(round(x, 4) for x in path_estimate([(2, 3, 6), (1, 2, 3), (3, 5, 13), (1, 1, 2)]))",
     "expect": "(12.5, 1.8333)"
    },
    {
     "label": "Chance of finishing in 12 days",
     "call": "round(prob_by([(2, 3, 6), (1, 2, 3), (3, 5, 13), (1, 1, 2)], 12), 4)",
     "expect": "0.3925"
    },
    {
     "label": "Chance of finishing in 14 days",
     "call": "round(prob_by([(2, 3, 6), (1, 2, 3), (3, 5, 13), (1, 1, 2)], 14), 4)",
     "expect": "0.7934"
    },
    {
     "label": "A deadline at the mean gives one half",
     "call": "round(prob_by([(1, 2, 9)], 3), 6)",
     "expect": "0.5"
    },
    {
     "label": "Certain estimates",
     "call": "(prob_by([(2, 2, 2), (3, 3, 3)], 5), prob_by([(2, 2, 2)], 1.9))",
     "expect": "(1.0, 0.0)"
    },
    {
     "label": "An empty path",
     "call": "path_estimate([])",
     "expect": "(0.0, 0.0)",
     "hidden": true
    },
    {
     "label": "Most likely above pessimistic",
     "type": "raises",
     "call": "pert(1, 5, 4)",
     "error": "ValueError"
    },
    {
     "label": "A negative estimate",
     "type": "raises",
     "call": "pert(-1, 2, 4)",
     "error": "ValueError",
     "hidden": true
    }
   ]
  },
  {
   "id": "critical_path",
   "title": "The critical path",
   "prompt": "<p>Write <code>schedule(tasks)</code> and <code>critical_path(tasks)</code>. <code>tasks</code> maps each task name to <code>(duration, dependencies)</code>, where dependencies is a list of tasks that must finish before this one starts. Durations are non-negative numbers.</p>\n<ul>\n<li><code>schedule(tasks)</code> returns a dict from each task to <code>(ES, EF, LS, LF, slack)</code>: earliest start and finish from a forward pass in topological order (a task starts when its last dependency finishes, or at 0), latest finish and start from a backward pass (a task must finish by the earliest latest start of the tasks that depend on it, or by the project length if none do), and slack = LS − ES.</li>\n<li><code>critical_path(tasks)</code> returns <code>(length, critical)</code>: the project length (the largest EF, or 0 with no tasks) and the list of tasks with zero slack, sorted by ES and then by name.</li>\n</ul>\n<p>Both raise <code>ValueError</code> if a dependency names an unknown task or the dependencies contain a cycle.</p>",
   "starter": "from collections import deque\n\ndef schedule(tasks):\n    pass\n\ndef critical_path(tasks):\n    pass\n",
   "hint": "<p>Build the successor lists and in-degrees, and run Kahn's algorithm (CS 201 Lesson 7) to get a topological order; if it outputs fewer tasks than there are, there is a cycle. Then do the forward pass over the order and the backward pass over the reversed order.</p>",
   "solution": "from collections import deque\n\ndef schedule(tasks):\n    for name, (d, deps) in tasks.items():\n        if d < 0:\n            raise ValueError(\"negative duration\")\n        for p in deps:\n            if p not in tasks:\n                raise ValueError(f\"{name} depends on unknown task {p}\")\n    succ = {n: [] for n in tasks}\n    indeg = {n: 0 for n in tasks}\n    for n, (d, deps) in tasks.items():\n        for p in set(deps):\n            succ[p].append(n)\n            indeg[n] += 1\n    ready = deque(sorted(n for n in tasks if indeg[n] == 0))\n    order = []\n    while ready:\n        u = ready.popleft()\n        order.append(u)\n        for v in sorted(succ[u]):\n            indeg[v] -= 1\n            if indeg[v] == 0:\n                ready.append(v)\n    if len(order) < len(tasks):\n        raise ValueError(\"the dependencies contain a cycle\")\n    es, ef = {}, {}\n    for n in order:\n        d, deps = tasks[n]\n        es[n] = max((ef[p] for p in deps), default=0)\n        ef[n] = es[n] + d\n    length = max(ef.values(), default=0)\n    ls, lf = {}, {}\n    for n in reversed(order):\n        lf[n] = min((ls[s] for s in succ[n]), default=length)\n        ls[n] = lf[n] - tasks[n][0]\n    return {n: (es[n], ef[n], ls[n], lf[n], ls[n] - es[n]) for n in tasks}\n\ndef critical_path(tasks):\n    s = schedule(tasks)\n    length = max((v[1] for v in s.values()), default=0)\n    crit = sorted((n for n in s if s[n][4] == 0), key=lambda n: (s[n][0], n))\n    return length, crit\n",
   "tests": [
    {
     "label": "The notes' six tasks: schedule",
     "call": "schedule({'interview': (3, []), 'requirements': (2, ['interview']), 'spike': (4, []), 'design': (3, ['requirements', 'spike']), 'skeleton': (5, ['design']), 'test plan': (2, ['requirements'])})",
     "expect": "{'interview': (0, 3, 0, 3, 0), 'requirements': (3, 5, 3, 5, 0), 'spike': (0, 4, 1, 5, 1), 'design': (5, 8, 5, 8, 0), 'skeleton': (8, 13, 8, 13, 0), 'test plan': (5, 7, 11, 13, 6)}"
    },
    {
     "label": "The notes' six tasks: critical path",
     "call": "critical_path({'interview': (3, []), 'requirements': (2, ['interview']), 'spike': (4, []), 'design': (3, ['requirements', 'spike']), 'skeleton': (5, ['design']), 'test plan': (2, ['requirements'])})",
     "expect": "(13, ['interview', 'requirements', 'design', 'skeleton'])"
    },
    {
     "label": "Two equal paths are both critical",
     "call": "critical_path({'a': (2, []), 'b': (2, []), 'c': (1, ['a', 'b'])})",
     "expect": "(3, ['a', 'b', 'c'])"
    },
    {
     "label": "A lengthened spike takes over",
     "call": "critical_path({'interview': (3, []), 'requirements': (2, ['interview']), 'spike': (7, []), 'design': (3, ['requirements', 'spike']), 'skeleton': (5, ['design']), 'test plan': (2, ['requirements'])})",
     "expect": "(15, ['spike', 'design', 'skeleton'])"
    },
    {
     "label": "No tasks",
     "call": "critical_path({})",
     "expect": "(0, [])"
    },
    {
     "label": "A cycle",
     "type": "raises",
     "call": "schedule({'a': (1, ['c']), 'b': (1, ['a']), 'c': (1, ['b'])})",
     "error": "ValueError"
    },
    {
     "label": "An unknown dependency",
     "type": "raises",
     "call": "schedule({'a': (1, ['zzz'])})",
     "error": "ValueError"
    },
    {
     "label": "Independent tasks finish at the project end",
     "call": "schedule({'long': (10, []), 'short': (1, [])})['short']",
     "expect": "(0, 1, 9, 10, 9)",
     "hidden": true
    }
   ]
  },
  {
   "id": "burndown",
   "title": "Forecasting from a burndown",
   "prompt": "<p>A burndown chart records the work remaining at the end of each day: <code>remaining[0]</code> on day 0, <code>remaining[1]</code> on day 1, and so on. Write:</p>\n<ul>\n<li><code>ideal(total, days)</code>: the ideal line, a list of <code>days + 1</code> floats falling evenly from <code>total</code> on day 0 to 0 on day <code>days</code>. Raise <code>ValueError</code> if days ≤ 0.</li>\n<li><code>forecast_finish(remaining, window=None)</code>: fit a least-squares line (MATH 230 Lesson 8) to the points (day, remaining) and return the day, as a float, at which the line reaches 0. With <code>window</code> given, use only the last <code>window</code> points (keeping their original day numbers). Return <code>None</code> if the fitted slope is 0 or positive, since the line never reaches 0. Raise <code>ValueError</code> if fewer than two points are used. Don't use the <code>statistics</code> module: compute the slope b = Σ(x − x̄)(y − ȳ)/Σ(x − x̄)² and intercept a = ȳ − b x̄ yourself.</li>\n</ul>",
   "starter": "def ideal(total, days):\n    pass\n\ndef forecast_finish(remaining, window=None):\n    pass\n",
   "hint": "<p><code>list(enumerate(remaining))</code> gives the (day, remaining) pairs, and slicing it with <code>[-window:]</code> keeps the last ones. The line a + bx is 0 at x = −a/b.</p>",
   "solution": "def ideal(total, days):\n    if days <= 0:\n        raise ValueError(\"days must be positive\")\n    return [total * (1 - d / days) for d in range(days + 1)]\n\ndef forecast_finish(remaining, window=None):\n    pts = list(enumerate(remaining))\n    if window is not None:\n        pts = pts[-window:]\n    if len(pts) < 2:\n        raise ValueError(\"need at least two points\")\n    n = len(pts)\n    xbar = sum(x for x, _ in pts) / n\n    ybar = sum(y for _, y in pts) / n\n    sxx = sum((x - xbar) ** 2 for x, _ in pts)\n    sxy = sum((x - xbar) * (y - ybar) for x, y in pts)\n    b = sxy / sxx\n    a = ybar - b * xbar\n    if b >= 0:\n        return None\n    return -a / b\n",
   "tests": [
    {
     "label": "An ideal line",
     "call": "ideal(40, 4)",
     "expect": "[40.0, 30.0, 20.0, 10.0, 0.0]"
    },
    {
     "label": "A perfectly straight burndown",
     "call": "round(forecast_finish([30, 25, 20, 15]), 6)",
     "expect": "6.0"
    },
    {
     "label": "The notes' ten days, all points",
     "call": "round(forecast_finish([40, 38, 35, 35, 31, 36, 33, 29, 26, 24]), 2)",
     "expect": "25.33"
    },
    {
     "label": "The notes' ten days, last five",
     "call": "round(forecast_finish([40, 38, 35, 35, 31, 36, 33, 29, 26, 24], 5), 2)",
     "expect": "16.55"
    },
    {
     "label": "Scope growing faster than work is done",
     "call": "forecast_finish([10, 10, 12])",
     "expect": "None"
    },
    {
     "label": "A flat line never finishes",
     "call": "forecast_finish([8, 8, 8, 8])",
     "expect": "None",
     "hidden": true
    },
    {
     "label": "One point is not enough",
     "type": "raises",
     "call": "forecast_finish([5, 4, 3], window=1)",
     "error": "ValueError"
    },
    {
     "label": "Zero days",
     "type": "raises",
     "call": "ideal(10, 0)",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "Doesn't use statistics",
     "type": "source",
     "code": "assert 'statistics' not in __source__, 'compute the fit yourself'\n"
    }
   ]
  }
 ],
 "pj4": [
  {
   "id": "layer_check",
   "title": "Checking architectural layers",
   "prompt": "<p>A layered design says which modules may depend on which. A test can enforce it, so a violation fails CI instead of surviving until a reviewer happens to notice. Write two functions.</p>\n<ul>\n<li><code>imports(source)</code> returns a list of <code>(module, line)</code> pairs for every import in a Python source string, found with <code>ast.walk</code> so that imports inside functions count too. For <code>import a.b</code> or <code>import a.b as c</code> the module is <code>\"a\"</code>; for <code>from a.b import c</code> it is also <code>\"a\"</code>. Skip relative imports (<code>from . import x</code>, where the node's <code>level</code> is above 0). One <code>import a, b</code> gives two pairs. Sort by line, then module.</li>\n<li><code>violations(modules, layers)</code>: <code>modules</code> maps module names to their source, and <code>layers</code> maps each module to a layer number, 0 for the top (the user interface) and larger numbers lower down. A module may import modules in its own layer or lower ones, never higher ones. Return a sorted list of <code>(importer, imported, line)</code> for every import of a higher-layer module. Imports of modules not in <code>layers</code> (the standard library, third-party packages) are ignored. Raise <code>ValueError</code> if a module in <code>modules</code> has no layer.</li>\n</ul>",
   "starter": "import ast\n\ndef imports(source):\n    pass\n\ndef violations(modules, layers):\n    pass\n",
   "hint": "<p>An <code>ast.Import</code> node has <code>.names</code>, a list of aliases each with <code>.name</code> such as <code>\"a.b\"</code>. An <code>ast.ImportFrom</code> node has <code>.module</code> (None for <code>from . import x</code>) and <code>.level</code>. Every node has <code>.lineno</code>. \"Higher\" means a smaller layer number.</p>",
   "solution": "import ast\n\ndef imports(source):\n    found = []\n    for node in ast.walk(ast.parse(source)):\n        if isinstance(node, ast.Import):\n            for alias in node.names:\n                found.append((alias.name.split(\".\")[0], node.lineno))\n        elif isinstance(node, ast.ImportFrom):\n            if node.level == 0 and node.module:\n                found.append((node.module.split(\".\")[0], node.lineno))\n    return sorted(found, key=lambda t: (t[1], t[0]))\n\ndef violations(modules, layers):\n    for m in modules:\n        if m not in layers:\n            raise ValueError(\"no layer for module \" + m)\n    bad = []\n    for m, src in modules.items():\n        for target, line in imports(src):\n            if target in layers and layers[target] < layers[m]:\n                bad.append((m, target, line))\n    return sorted(bad)\n",
   "tests": [
    {
     "label": "Imports, including one inside a function",
     "call": "imports('import sqlite3\\n\\ndef save():\\n    import service\\n')",
     "expect": "[('sqlite3', 1), ('service', 4)]"
    },
    {
     "label": "Dotted, aliased, multiple and from-imports",
     "call": "imports('import os.path as p, json\\nfrom email.mime import text\\nfrom . import sibling\\n')",
     "expect": "[('json', 1), ('os', 1), ('email', 2)]"
    },
    {
     "label": "The notes' pantry modules",
     "call": "violations({'ui': 'import service\\nfrom flask import Flask\\n', 'service': 'import storage\\nimport json\\nfrom ui import render\\n', 'storage': 'import sqlite3\\n\\ndef save():\\n    import service\\n', 'models': 'from dataclasses import dataclass\\n'}, {'ui': 0, 'service': 1, 'storage': 2, 'models': 2})",
     "expect": "[('service', 'ui', 3), ('storage', 'service', 4)]"
    },
    {
     "label": "Same layer and downward imports are fine",
     "call": "violations({'a': 'import b\\nimport c\\n', 'b': 'import c\\n', 'c': ''}, {'a': 0, 'b': 0, 'c': 1})",
     "expect": "[]"
    },
    {
     "label": "A module with no layer",
     "type": "raises",
     "call": "violations({'x': ''}, {})",
     "error": "ValueError"
    },
    {
     "label": "from storage.db import q counts as storage",
     "call": "violations({'storage': 'from ui.views import page\\n', 'ui': ''}, {'ui': 0, 'storage': 2})",
     "expect": "[('storage', 'ui', 1)]",
     "hidden": true
    }
   ]
  },
  {
   "id": "adr_index",
   "title": "An index of decision records",
   "prompt": "<p>A team keeps its architecture decision records as Markdown files. Each starts with a heading line <code># N. Title</code> and has a line <code>Status: ...</code> somewhere after it, with one of the values Proposed, Accepted, Rejected, Deprecated, or <code>Superseded by N</code> (also accepted as <code>Superseded by ADR-N</code> or <code>Superseded by ADR N</code>), in any letter case.</p>\n<ul>\n<li><code>parse_adr(text)</code> returns a dict with keys <code>\"number\"</code> (int), <code>\"title\"</code> (stripped), <code>\"status\"</code> (lower case: <code>\"proposed\"</code>, <code>\"accepted\"</code>, <code>\"rejected\"</code>, <code>\"deprecated\"</code> or <code>\"superseded\"</code>) and <code>\"superseded_by\"</code> (an int, or None). Leading and trailing blank lines and spaces are ignored. A Status line is one that starts with <code>Status:</code> in any letter case (<code>status:</code> and <code>STATUS:</code> count), and its value may be in any letter case too; use the first such line. Raise <code>ValueError</code> if the first line isn't a heading of that form, there is no Status line, or the status is unknown.</li>\n<li><code>index(texts)</code> parses a list of records and returns <code>{\"current\": ..., \"problems\": ...}</code>. <code>\"current\"</code> is a list of <code>(number, title)</code> for the accepted records, sorted by number. <code>\"problems\"</code> is a sorted list without repeats of: <code>(\"duplicate\", n)</code> if two records share number n; <code>(\"self\", n)</code> if record n says it is superseded by itself; <code>(\"missing\", n, m)</code> if n is superseded by m and there is no record m; and <code>(\"not in force\", n, m)</code> if record m exists but is proposed or rejected. When a number is duplicated, every record still counts: each accepted one appears in <code>\"current\"</code> (so the same number can appear twice), m exists if any record has number m, and \"not in force\" looks at the <em>first</em> record numbered m in the list.</li>\n</ul>",
   "starter": "import re\n\ndef parse_adr(text):\n    pass\n\ndef index(texts):\n    pass\n",
   "hint": "<p><code>re.fullmatch(r\"#\\s*(\\d+)\\.\\s*(.+)\", line)</code> matches the heading. For the status, compare the lower-cased value against the four plain words first, then try <code>re.fullmatch(r\"superseded by (?:adr[- ]?)?(\\d+)\", value)</code>.</p>",
   "solution": "import re\n\nHEAD = re.compile(r\"#\\s*(\\d+)\\.\\s*(.+)\")\nPLAIN = (\"proposed\", \"accepted\", \"rejected\", \"deprecated\")\n\ndef parse_adr(text):\n    lines = [l.strip() for l in text.strip().splitlines()]\n    m = HEAD.fullmatch(lines[0]) if lines else None\n    if not m:\n        raise ValueError(\"first line must be '# N. Title'\")\n    number, title = int(m.group(1)), m.group(2).strip()\n    for l in lines[1:]:\n        if l.lower().startswith(\"status:\"):\n            value = l.split(\":\", 1)[1].strip().lower()\n            if value in PLAIN:\n                return {\"number\": number, \"title\": title, \"status\": value, \"superseded_by\": None}\n            sm = re.fullmatch(r\"superseded by (?:adr[- ]?)?(\\d+)\", value)\n            if not sm:\n                raise ValueError(\"unknown status: \" + value)\n            return {\"number\": number, \"title\": title, \"status\": \"superseded\", \"superseded_by\": int(sm.group(1))}\n    raise ValueError(\"no Status line\")\n\ndef index(texts):\n    adrs = [parse_adr(t) for t in texts]\n    by_num = {}\n    for a in adrs:\n        by_num.setdefault(a[\"number\"], []).append(a)\n    problems = set()\n    for n, group in by_num.items():\n        if len(group) > 1:\n            problems.add((\"duplicate\", n))\n    for a in adrs:\n        if a[\"status\"] != \"superseded\":\n            continue\n        n, m = a[\"number\"], a[\"superseded_by\"]\n        if m == n:\n            problems.add((\"self\", n))\n        elif m not in by_num:\n            problems.add((\"missing\", n, m))\n        elif by_num[m][0][\"status\"] in (\"proposed\", \"rejected\"):\n            problems.add((\"not in force\", n, m))\n    current = sorted((a[\"number\"], a[\"title\"]) for a in adrs if a[\"status\"] == \"accepted\")\n    return {\"current\": current, \"problems\": sorted(problems)}\n",
   "tests": [
    {
     "label": "An accepted record",
     "call": "parse_adr('# 1. Record architecture decisions\\nDate: 2026-09-20\\nStatus: Accepted\\n\\n## Context\\n...')",
     "expect": "{'number': 1, 'title': 'Record architecture decisions', 'status': 'accepted', 'superseded_by': None}"
    },
    {
     "label": "A superseded record",
     "call": "parse_adr('\\n  # 2. Use SQLite on the desk laptop  \\nStatus: superseded by ADR-5\\n')",
     "expect": "{'number': 2, 'title': 'Use SQLite on the desk laptop', 'status': 'superseded', 'superseded_by': 5}"
    },
    {
     "label": "The notes' six records",
     "call": "index(['# 1. Record architecture decisions\\nStatus: Accepted', '# 2. Use SQLite on the desk laptop\\nStatus: Superseded by 5', \"# 3. Host on the university's free tier\\nStatus: Accepted\", '# 4. Use a message queue\\nStatus: Rejected', '# 5. Use a hosted PostgreSQL database\\nStatus: accepted', '# 6. Single sign-on\\nStatus: Superseded by ADR 9'])",
     "expect": "{'current': [(1, 'Record architecture decisions'), (3, \"Host on the university's free tier\"), (5, 'Use a hosted PostgreSQL database')], 'problems': [('missing', 6, 9)]}"
    },
    {
     "label": "Duplicates, self and not in force",
     "call": "index(['# 1. A\\nStatus: Superseded by 2', '# 2. B\\nStatus: Proposed', '# 3. C\\nStatus: superseded by 3', '# 3. D\\nStatus: Deprecated'])['problems']",
     "expect": "[('duplicate', 3), ('not in force', 1, 2), ('self', 3)]"
    },
    {
     "label": "No status line",
     "type": "raises",
     "call": "parse_adr('# 7. Something')",
     "error": "ValueError"
    },
    {
     "label": "A bad heading",
     "type": "raises",
     "call": "parse_adr('ADR 7: Something\\nStatus: Accepted')",
     "error": "ValueError"
    },
    {
     "label": "An unknown status",
     "type": "raises",
     "call": "parse_adr('# 7. X\\nStatus: maybe')",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "Only the first status line counts",
     "call": "parse_adr('# 8. X\\nStatus: Proposed\\nStatus: Accepted')['status']",
     "expect": "'proposed'",
     "hidden": true
    },
    {
     "label": "The Status label in any case",
     "call": "[parse_adr(t)['status'] for t in ['# 1. A\\nSTATUS: ACCEPTED', '# 2. B\\nstatus: Superseded by 1']]",
     "expect": "['accepted', 'superseded']"
    },
    {
     "label": "Duplicated numbers: both count, and the first decides",
     "call": "index(['# 1. A\\nStatus: Accepted', '# 1. B\\nStatus: Accepted', '# 2. C\\nStatus: Proposed', '# 2. D\\nStatus: Accepted', '# 3. E\\nStatus: Superseded by 2'])",
     "expect": "{'current': [(1, 'A'), (1, 'B'), (2, 'D')], 'problems': [('duplicate', 1), ('duplicate', 2), ('not in force', 3, 2)]}"
    }
   ]
  }
 ],
 "pj5": [
  {
   "id": "bus_factor",
   "title": "Ownership and the bus factor",
   "prompt": "<p>A commit log, one commit per line, in the form <code>hash|author|file1,file2,...</code> (the output of a short <code>git log</code> format), says who has worked on what. Write three functions.</p>\n<ul>\n<li><code>ownership(log)</code>: <code>log</code> is a list of lines. Return a dict from each file to a dict from author to the number of commits by that author that touched the file. Strip spaces around authors and file names, skip blank lines and empty file names, count a file listed twice in one commit once, and raise <code>ValueError</code> for a line that doesn't have three fields or has an empty author.</li>\n<li><code>knowers(log, min_share=0.25)</code>: a dict from each file to the sorted list of authors who made at least <code>min_share</code> of that file's commits.</li>\n<li><code>bus_factor(log, min_share=0.25)</code>: the simplified truck-factor estimate from the notes. Repeatedly remove the remaining author who knows the most files (ties by name), until more than half of all files have no remaining knower. Return <code>(count, removed)</code>: the number of authors removed and their names in removal order. Raise <code>ValueError</code> for a log with no files.</li>\n</ul>",
   "starter": "def ownership(log):\n    pass\n\ndef knowers(log, min_share=0.25):\n    pass\n\ndef bus_factor(log, min_share=0.25):\n    pass\n",
   "hint": "<p>For the greedy loop, keep a set of remaining authors. Each round, pick <code>min(left, key=lambda a: (-files_known(a), a))</code>, remove it, then count the files whose knowers are all removed.</p>",
   "solution": "def ownership(log):\n    own = {}\n    for line in log:\n        line = line.strip()\n        if not line:\n            continue\n        parts = line.split(\"|\")\n        if len(parts) != 3 or not parts[1].strip():\n            raise ValueError(\"bad log line: \" + line)\n        author = parts[1].strip()\n        files = [f.strip() for f in parts[2].split(\",\")]\n        for f in dict.fromkeys(files):\n            if f:\n                counts = own.setdefault(f, {})\n                counts[author] = counts.get(author, 0) + 1\n    return own\n\ndef knowers(log, min_share=0.25):\n    out = {}\n    for f, counts in ownership(log).items():\n        total = sum(counts.values())\n        out[f] = sorted(a for a, c in counts.items() if c / total >= min_share)\n    return out\n\ndef bus_factor(log, min_share=0.25):\n    know = knowers(log, min_share)\n    if not know:\n        raise ValueError(\"no files in the log\")\n    left = {a for ks in know.values() for a in ks}\n    removed = []\n    while left:\n        best = min(left, key=lambda a: (-sum(a in ks for ks in know.values()), a))\n        left.discard(best)\n        removed.append(best)\n        orphaned = sum(1 for ks in know.values() if not set(ks) & left)\n        if orphaned > len(know) / 2:\n            break\n    return len(removed), removed\n",
   "tests": [
    {
     "label": "Ownership of the notes' log",
     "call": "ownership(['a1f|Ana|app.py,db.py', 'b2e|Ana|db.py', 'c3d|Ben|ui.py', 'd4c|Ana|app.py,ui.py', 'e5b|Chloe|tests.py', 'f6a|Ana|db.py,tests.py', 'g7f|Ben|ui.py,app.py', 'h8e|Ana|app.py'])",
     "expect": "{'app.py': {'Ana': 3, 'Ben': 1}, 'db.py': {'Ana': 3}, 'ui.py': {'Ben': 2, 'Ana': 1}, 'tests.py': {'Chloe': 1, 'Ana': 1}}"
    },
    {
     "label": "Knowers of the notes' log",
     "call": "knowers(['a1f|Ana|app.py,db.py', 'b2e|Ana|db.py', 'c3d|Ben|ui.py', 'd4c|Ana|app.py,ui.py', 'e5b|Chloe|tests.py', 'f6a|Ana|db.py,tests.py', 'g7f|Ben|ui.py,app.py', 'h8e|Ana|app.py'])",
     "expect": "{'app.py': ['Ana', 'Ben'], 'db.py': ['Ana'], 'ui.py': ['Ana', 'Ben'], 'tests.py': ['Ana', 'Chloe']}"
    },
    {
     "label": "Bus factor of the notes' log",
     "call": "bus_factor(['a1f|Ana|app.py,db.py', 'b2e|Ana|db.py', 'c3d|Ben|ui.py', 'd4c|Ana|app.py,ui.py', 'e5b|Chloe|tests.py', 'f6a|Ana|db.py,tests.py', 'g7f|Ben|ui.py,app.py', 'h8e|Ana|app.py'])",
     "expect": "(2, ['Ana', 'Ben'])"
    },
    {
     "label": "One person wrote most of everything",
     "call": "bus_factor(['1|Dev|a.py,b.py', '2|Dev|c.py', '3|Dev|c.py', '4|Ana|c.py'], 0.6)",
     "expect": "(1, ['Dev'])"
    },
    {
     "label": "A file listed twice in one commit counts once",
     "call": "ownership(['1|Ana|a.py,a.py', '2|Ben|a.py'])",
     "expect": "{'a.py': {'Ana': 1, 'Ben': 1}}"
    },
    {
     "label": "Spread knowledge",
     "call": "bus_factor(['1|A|x', '2|B|x', '3|C|x', '4|A|y', '5|B|y', '6|C|y'])",
     "expect": "(3, ['A', 'B', 'C'])"
    },
    {
     "label": "Blank lines and spaces",
     "call": "ownership(['', ' 9a | Ana | a.py , ,b.py '])",
     "expect": "{'a.py': {'Ana': 1}, 'b.py': {'Ana': 1}}"
    },
    {
     "label": "A malformed line",
     "type": "raises",
     "call": "ownership(['abc|Ana'])",
     "error": "ValueError"
    },
    {
     "label": "An empty log",
     "type": "raises",
     "call": "bus_factor([])",
     "error": "ValueError",
     "hidden": true
    }
   ]
  },
  {
   "id": "assign_reviewers",
   "title": "Spreading code reviews",
   "prompt": "<p>A team wants reviews spread evenly, and wants each member to review everyone else's code, so that knowledge spreads (the notes' bus factor). Write <code>assign(prs, team, k=1)</code>. <code>prs</code> is a list of <code>(pr_id, author)</code> in the order they were opened; <code>team</code> is a list of member names. Assign each pull request <code>k</code> reviewers, never its author, processing the pull requests in order. For each one, choose the <code>k</code> eligible members with, in order of importance: the fewest reviews assigned so far; the fewest reviews so far of this author's pull requests; the alphabetically first name. Return a dict from each pr_id to the sorted list of its reviewers.</p>\n<p>Raise <code>ValueError</code> if an author isn't in the team, a pr_id repeats, or there are fewer than <code>k</code> eligible reviewers.</p>",
   "starter": "def assign(prs, team, k=1):\n    pass\n",
   "hint": "<p>Keep a dict of loads and a dict keyed by <code>(reviewer, author)</code>. Sort the candidates by the tuple <code>(load, times reviewed this author, name)</code> and take the first k.</p>",
   "solution": "def assign(prs, team, k=1):\n    team = sorted(set(team))\n    load = {m: 0 for m in team}\n    pair = {}\n    out = {}\n    for pr, author in prs:\n        if author not in load:\n            raise ValueError(\"author not in team: \" + str(author))\n        if pr in out:\n            raise ValueError(\"duplicate pull request id\")\n        cands = [m for m in team if m != author]\n        if len(cands) < k:\n            raise ValueError(\"not enough reviewers\")\n        chosen = sorted(cands, key=lambda m: (load[m], pair.get((m, author), 0), m))[:k]\n        for m in chosen:\n            load[m] += 1\n            pair[(m, author)] = pair.get((m, author), 0) + 1\n        out[pr] = sorted(chosen)\n    return out\n",
   "tests": [
    {
     "label": "One reviewer each",
     "call": "assign([(41, 'Ana'), (42, 'Ana'), (43, 'Ben'), (44, 'Chloe'), (45, 'Ana'), (46, 'Dev')], ['Ana', 'Ben', 'Chloe', 'Dev'])",
     "expect": "{41: ['Ben'], 42: ['Chloe'], 43: ['Ana'], 44: ['Dev'], 45: ['Dev'], 46: ['Ana']}"
    },
    {
     "label": "Two reviewers each",
     "call": "assign([(41, 'Ana'), (42, 'Ana'), (43, 'Ben'), (44, 'Chloe'), (45, 'Ana'), (46, 'Dev')], ['Ana', 'Ben', 'Chloe', 'Dev'], 2)",
     "expect": "{41: ['Ben', 'Chloe'], 42: ['Ben', 'Dev'], 43: ['Ana', 'Chloe'], 44: ['Ana', 'Dev'], 45: ['Chloe', 'Dev'], 46: ['Ana', 'Ben']}"
    },
    {
     "label": "Loads stay within one of each other",
     "type": "assert",
     "code": "team = [\"Ana\", \"Ben\", \"Chloe\", \"Dev\", \"Eli\"]\nprs = [(i, team[(i * 7) % 3]) for i in range(1, 31)]\ngot = assign(prs, team)\ncounts = {m: 0 for m in team}\nfor pr, rs in got.items():\n    assert len(rs) == 1 and rs[0] != dict(prs)[pr], f\"PR {pr} reviewed by its author or by the wrong number of people\"\n    counts[rs[0]] += 1\nassert max(counts.values()) - min(counts.values()) <= 1, f\"uneven loads: {counts}\"\n"
    },
    {
     "label": "An author outside the team",
     "type": "raises",
     "call": "assign([(1, 'Zed')], ['Ana', 'Ben'])",
     "error": "ValueError"
    },
    {
     "label": "Too few reviewers",
     "type": "raises",
     "call": "assign([(1, 'Ana')], ['Ana', 'Ben'], 2)",
     "error": "ValueError"
    },
    {
     "label": "A repeated id",
     "type": "raises",
     "call": "assign([(1, 'Ana'), (1, 'Ben')], ['Ana', 'Ben'])",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "No pull requests",
     "call": "assign([], ['Ana'])",
     "expect": "{}",
     "hidden": true
    }
   ]
  }
 ],
 "pj6": [
  {
   "id": "feature_flags",
   "title": "Feature flags with percentage rollouts",
   "prompt": "<p>Write a feature-flag evaluator like the one in the notes.</p>\n<ul>\n<li><code>bucket(flag, user_id)</code>: the SHA-256 digest of the UTF-8 string <code>f\"{flag}:{user_id}\"</code>, read as a hexadecimal integer, modulo 100. The same user always lands in the same bucket for a flag, and different flags spread users independently.</li>\n<li><code>is_enabled(config, flag, user)</code>: <code>config</code> maps flag names to rules, dicts with optional keys <code>\"enabled\"</code> (bool, default False), <code>\"deny\"</code> and <code>\"allow\"</code> (lists of user ids), <code>\"groups\"</code> (a list of group names) and <code>\"percent\"</code> (0 to 100, default 0). <code>user</code> is a dict with an <code>\"id\"</code> and an optional <code>\"groups\"</code> list. Decide, in this order: an unknown flag, or one not enabled, is off (the kill switch); a denied user is off; an allowed user is on; a user in any of the rule's groups is on; otherwise the user is on exactly when <code>bucket(flag, id) &lt; percent</code>.</li>\n</ul>",
   "starter": "import hashlib\n\ndef bucket(flag, user_id):\n    pass\n\ndef is_enabled(config, flag, user):\n    pass\n",
   "hint": "<p><code>hashlib.sha256(s.encode(\"utf-8\")).hexdigest()</code> gives the digest as hex text, and <code>int(text, 16)</code> turns it into an integer. Use <code>rule.get(key, default)</code> for the optional keys.</p>",
   "solution": "import hashlib\n\ndef bucket(flag, user_id):\n    digest = hashlib.sha256(f\"{flag}:{user_id}\".encode(\"utf-8\")).hexdigest()\n    return int(digest, 16) % 100\n\ndef is_enabled(config, flag, user):\n    rule = config.get(flag)\n    if rule is None or not rule.get(\"enabled\", False):\n        return False\n    uid = user[\"id\"]\n    if uid in rule.get(\"deny\", []):\n        return False\n    if uid in rule.get(\"allow\", []):\n        return True\n    if set(user.get(\"groups\", [])) & set(rule.get(\"groups\", [])):\n        return True\n    return bucket(flag, uid) < rule.get(\"percent\", 0)\n",
   "tests": [
    {
     "label": "Buckets",
     "call": "[bucket('new-checkin', u) for u in ['u1', 'u2', 'u3', 'u42', 'maria', 'vol-17']]",
     "expect": "[82, 72, 85, 53, 35, 21]"
    },
    {
     "label": "Another flag spreads users differently",
     "call": "[bucket('sms-reminders', u) for u in ['u1', 'u2', 'u3', 'u42', 'maria', 'vol-17']]",
     "expect": "[10, 21, 49, 19, 88, 38]"
    },
    {
     "label": "A 40% rollout",
     "call": "[is_enabled({'new-checkin': {'enabled': True, 'percent': 40}}, 'new-checkin', {'id': u}) for u in ['u1', 'u2', 'u3', 'u42', 'maria', 'vol-17']]",
     "expect": "[False, False, False, False, True, True]"
    },
    {
     "label": "Kill switch beats everything",
     "call": "is_enabled({'f': {'enabled': False, 'allow': ['u1'], 'percent': 100}}, 'f', {'id': 'u1'})",
     "expect": "False"
    },
    {
     "label": "Unknown flag is off",
     "call": "is_enabled({}, 'nope', {'id': 'u1'})",
     "expect": "False"
    },
    {
     "label": "Deny beats allow and groups",
     "call": "is_enabled({'f': {'enabled': True, 'deny': ['u1'], 'allow': ['u1'], 'groups': ['staff'], 'percent': 100}}, 'f', {'id': 'u1', 'groups': ['staff']})",
     "expect": "False"
    },
    {
     "label": "Allow list and groups",
     "call": "[is_enabled({'f': {'enabled': True, 'allow': ['maria'], 'groups': ['coordinators']}}, 'f', u) for u in [{'id': 'maria'}, {'id': 'ben', 'groups': ['volunteers', 'coordinators']}, {'id': 'cal', 'groups': ['volunteers']}]]",
     "expect": "[True, True, False]"
    },
    {
     "label": "Raising the percentage never turns anyone off",
     "type": "assert",
     "code": "users = [f\"user{i}\" for i in range(300)]\non10 = {u for u in users if is_enabled({\"f\": {\"enabled\": True, \"percent\": 10}}, \"f\", {\"id\": u})}\non30 = {u for u in users if is_enabled({\"f\": {\"enabled\": True, \"percent\": 30}}, \"f\", {\"id\": u})}\nassert on10 <= on30, \"someone enabled at 10% was disabled at 30%\"\nassert 10 <= len(on10) <= 55 and 60 <= len(on30) <= 125, f\"rollout sizes look wrong: {len(on10)} and {len(on30)} of 300\"\n"
    }
   ]
  },
  {
   "id": "changelog",
   "title": "A changelog from conventional commits",
   "prompt": "<p>With the Conventional Commits format, a commit message's first line is <code>type(scope)!: description</code>, where the scope in parentheses and the <code>!</code> are optional, the type is lower-case letters, and there is exactly one space after the colon. A breaking change is marked by the <code>!</code> or by a later line starting <code>BREAKING CHANGE:</code> or <code>BREAKING-CHANGE:</code>. Write three functions.</p>\n<ul>\n<li><code>parse_commit(message)</code> returns None if the first line (after stripping the message) doesn't match, else a dict with keys <code>\"type\"</code>, <code>\"scope\"</code> (None if absent), <code>\"description\"</code>, and <code>\"breaking\"</code>: the text after the last BREAKING CHANGE line's colon (stripped), else the description if there is a <code>!</code>, else None. Use the regular expression <code>([a-z]+)(?:\\(([^()\\s]+)\\))?(!)?: (\\S.*)</code> with <code>fullmatch</code> on the stripped first line.</li>\n<li><code>next_version(version, messages)</code>: the next semantic version (CS 240 Lesson 6) after <code>version</code> given these commits: a major bump if any is breaking, else minor if any has type <code>feat</code>, else patch if any has type <code>fix</code>, else the version unchanged. Ignore messages that don't parse, and ignore semver's special rule for 0.x versions. Raise <code>ValueError</code> if the version isn't three dot-separated whole numbers.</li>\n<li><code>changelog(version, messages)</code> returns the release notes as one string of lines joined by <code>\"\\n\"</code>: a header line made of two <code>#</code> characters, one space and the new version (such as <code>## 2.0.0</code>), then up to three sections in this order, each only if non-empty: <code>### Breaking changes</code> (the breaking text of each breaking commit, whatever its type), <code>### Features</code> (descriptions of non-breaking <code>feat</code> commits) and <code>### Fixes</code> (non-breaking <code>fix</code> commits). Each item is a line made of a hyphen and one space, then, if the commit has a scope, the scope itself followed by a colon and one space, then the text; items keep the order of <code>messages</code>. For example, from 1.4.2, the commits <code>feat(api)!: return visits as a list</code> and <code>fix: show the right date</code> give these three lines:</li>\n</ul>\n<pre data-label=\"Output\"><code>## 2.0.0\n### Breaking changes\n- api: return visits as a list\n### Fixes\n- show the right date</code></pre>",
   "starter": "import re\n\ndef parse_commit(message):\n    pass\n\ndef next_version(version, messages):\n    pass\n\ndef changelog(version, messages):\n    pass\n",
   "hint": "<p>Split the stripped message with <code>splitlines()</code>. For the footer, check each later line with <code>startswith</code> for either spelling and keep the last one found. <code>match.groups()</code> gives the four captured parts, with None for missing ones.</p>",
   "solution": "import re\n\nHEADER = re.compile(r\"([a-z]+)(?:\\(([^()\\s]+)\\))?(!)?: (\\S.*)\")\n\ndef parse_commit(message):\n    lines = message.strip().splitlines()\n    if not lines:\n        return None\n    m = HEADER.fullmatch(lines[0].strip())\n    if not m:\n        return None\n    typ, scope, bang, desc = m.groups()\n    desc = desc.strip()\n    breaking = None\n    for l in lines[1:]:\n        l = l.strip()\n        for key in (\"BREAKING CHANGE:\", \"BREAKING-CHANGE:\"):\n            if l.startswith(key):\n                breaking = l[len(key):].strip()\n    if bang and breaking is None:\n        breaking = desc\n    return {\"type\": typ, \"scope\": scope, \"description\": desc, \"breaking\": breaking}\n\ndef next_version(version, messages):\n    parts = version.split(\".\")\n    if len(parts) != 3 or not all(p.isdigit() for p in parts):\n        raise ValueError(\"bad version \" + version)\n    major, minor, patch = map(int, parts)\n    cs = [c for c in map(parse_commit, messages) if c]\n    if any(c[\"breaking\"] is not None for c in cs):\n        return f\"{major + 1}.0.0\"\n    if any(c[\"type\"] == \"feat\" for c in cs):\n        return f\"{major}.{minor + 1}.0\"\n    if any(c[\"type\"] == \"fix\" for c in cs):\n        return f\"{major}.{minor}.{patch + 1}\"\n    return version\n\ndef changelog(version, messages):\n    sections = {\"Breaking changes\": [], \"Features\": [], \"Fixes\": []}\n    for c in map(parse_commit, messages):\n        if not c:\n            continue\n        prefix = c[\"scope\"] + \": \" if c[\"scope\"] else \"\"\n        if c[\"breaking\"] is not None:\n            sections[\"Breaking changes\"].append(prefix + c[\"breaking\"])\n        elif c[\"type\"] == \"feat\":\n            sections[\"Features\"].append(prefix + c[\"description\"])\n        elif c[\"type\"] == \"fix\":\n            sections[\"Fixes\"].append(prefix + c[\"description\"])\n    out = [\"## \" + next_version(version, messages)]\n    for title, items in sections.items():\n        if items:\n            out.append(\"### \" + title)\n            out.extend(\"- \" + i for i in items)\n    return \"\\n\".join(out)\n",
   "tests": [
    {
     "label": "A feature with a scope",
     "call": "parse_commit('feat(checkin): look up households by card number')",
     "expect": "{'type': 'feat', 'scope': 'checkin', 'description': 'look up households by card number', 'breaking': None}"
    },
    {
     "label": "Breaking by ! and by footer",
     "call": "[parse_commit(m)['breaking'] for m in ['feat(api)!: return visits as a list', 'refactor(db): split queries\\n\\nBREAKING CHANGE: the visits table is renamed to visit']]",
     "expect": "['return visits as a list', 'the visits table is renamed to visit']"
    },
    {
     "label": "Not conventional",
     "call": "[parse_commit(m) for m in ['Update README', 'Fix: capital type', 'fix:no space', '']]",
     "expect": "[None, None, None, None]"
    },
    {
     "label": "Next versions",
     "call": "[next_version('1.4.2', ms) for ms in [['feat(checkin): x', 'fix: y'], ['fix: y'], ['docs: z', 'Update README'], ['fix!: drop old route']]]",
     "expect": "['1.5.0', '1.4.3', '1.4.2', '2.0.0']"
    },
    {
     "label": "Versions compare as numbers",
     "call": "next_version('2.9.19', ['fix: a'])",
     "expect": "'2.9.20'"
    },
    {
     "label": "The notes' release",
     "call": "changelog('1.4.2', ['feat(checkin): look up households by card number', 'fix: show the right date after midnight', 'docs: explain the backup script', 'Update README', 'feat(api)!: return visits as a list', 'refactor(db): split queries\\n\\nBREAKING CHANGE: the visits table is renamed to visit'])",
     "expect": "'## 2.0.0\\n### Breaking changes\\n- api: return visits as a list\\n- db: the visits table is renamed to visit\\n### Features\\n- checkin: look up households by card number\\n### Fixes\\n- show the right date after midnight'"
    },
    {
     "label": "Only fixes",
     "call": "changelog('0.3.0', ['fix(ui): focus ring visible', 'chore: bump deps'])",
     "expect": "'## 0.3.1\\n### Fixes\\n- ui: focus ring visible'"
    },
    {
     "label": "A bad version",
     "type": "raises",
     "call": "next_version('1.4', ['fix: a'])",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "The prompt's example",
     "call": "changelog('1.4.2', ['feat(api)!: return visits as a list', 'fix: show the right date'])",
     "expect": "'## 2.0.0\\n### Breaking changes\\n- api: return visits as a list\\n### Fixes\\n- show the right date'"
    },
    {
     "label": "BREAKING-CHANGE with a hyphen",
     "call": "parse_commit('feat: a\\n\\nBREAKING-CHANGE: b')['breaking']",
     "expect": "'b'",
     "hidden": true
    }
   ]
  }
 ],
 "pj7": [
  {
   "id": "contrast",
   "title": "Checking color contrast",
   "prompt": "<p>Implement WCAG's contrast check, as defined in the notes.</p>\n<ul>\n<li><code>parse_hex(color)</code>: <code>\"#1a2b3c\"</code> or the short form <code>\"#abc\"</code> (meaning <code>#aabbcc</code>), with or without the <code>#</code>, in either letter case, to a tuple of three ints from 0 to 255. Raise <code>ValueError</code> for anything else.</li>\n<li><code>luminance(color)</code>: the relative luminance L = 0.2126R + 0.7152G + 0.0722B, where each channel c = value/255 is first linearized: c/12.92 if c ≤ 0.04045, else ((c + 0.055)/1.055)<sup>2.4</sup>.</li>\n<li><code>contrast(c1, c2)</code>: (L<sub>lighter</sub> + 0.05)/(L<sub>darker</sub> + 0.05), whichever order the colors are given in.</li>\n<li><code>check(fg, bg, large=False)</code>: a dict <code>{\"ratio\": r, \"AA\": ..., \"AAA\": ...}</code> with the ratio rounded to 2 places, and whether it meets level AA (at least 4.5, or 3 for large text) and AAA (at least 7, or 4.5 for large text). Compare the unrounded ratio with the thresholds.</li>\n</ul>",
   "starter": "def parse_hex(color):\n    pass\n\ndef luminance(color):\n    pass\n\ndef contrast(c1, c2):\n    pass\n\ndef check(fg, bg, large=False):\n    pass\n",
   "hint": "<p><code>int(\"1a\", 16)</code> is 26. For the short form, double each character: <code>\"\".join(ch * 2 for ch in s)</code>. A ratio of 4.4999 rounds to 4.5 but fails AA, which is why the comparison must use the unrounded value.</p>",
   "solution": "def parse_hex(color):\n    s = color.strip()\n    if s.startswith(\"#\"):\n        s = s[1:]\n    if len(s) == 3:\n        s = \"\".join(ch * 2 for ch in s)\n    if len(s) != 6 or any(ch not in \"0123456789abcdefABCDEF\" for ch in s):\n        raise ValueError(\"bad color \" + color)\n    return tuple(int(s[i:i + 2], 16) for i in (0, 2, 4))\n\ndef _lin(value):\n    c = value / 255\n    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4\n\ndef luminance(color):\n    r, g, b = parse_hex(color)\n    return 0.2126 * _lin(r) + 0.7152 * _lin(g) + 0.0722 * _lin(b)\n\ndef contrast(c1, c2):\n    hi, lo = sorted((luminance(c1), luminance(c2)), reverse=True)\n    return (hi + 0.05) / (lo + 0.05)\n\ndef check(fg, bg, large=False):\n    r = contrast(fg, bg)\n    aa, aaa = (3, 4.5) if large else (4.5, 7)\n    return {\"ratio\": round(r, 2), \"AA\": r >= aa, \"AAA\": r >= aaa}\n",
   "tests": [
    {
     "label": "Parsing",
     "call": "[parse_hex(c) for c in ['#1a2b3c', 'FFF', '#0a66C2']]",
     "expect": "[(26, 43, 60), (255, 255, 255), (10, 102, 194)]"
    },
    {
     "label": "Luminance of the notes' gray",
     "call": "round(luminance('#767676'), 4)",
     "expect": "0.1812"
    },
    {
     "label": "Black on white is 21:1",
     "call": "round(contrast('#000', '#fff'), 6)",
     "expect": "21.0"
    },
    {
     "label": "Order doesn't matter",
     "call": "round(contrast('#fff', '#767676'), 2)",
     "expect": "4.54"
    },
    {
     "label": "#767676 passes AA, #777777 doesn't",
     "call": "[check('#767676', '#ffffff'), check('#777777', '#ffffff')]",
     "expect": "[{'ratio': 4.54, 'AA': True, 'AAA': False}, {'ratio': 4.48, 'AA': False, 'AAA': False}]"
    },
    {
     "label": "Large text",
     "call": "check('#949494', '#fff', large=True)",
     "expect": "{'ratio': 3.03, 'AA': True, 'AAA': False}"
    },
    {
     "label": "Just under 4.5 fails even though it rounds to 4.5",
     "call": "check('#d33980', '#ffffff')",
     "expect": "{'ratio': 4.5, 'AA': False, 'AAA': False}"
    },
    {
     "label": "Bad colors",
     "type": "raises",
     "call": "parse_hex('#12345')",
     "error": "ValueError"
    },
    {
     "label": "Not hex",
     "type": "raises",
     "call": "parse_hex('#ggg')",
     "error": "ValueError",
     "hidden": true
    }
   ]
  },
  {
   "id": "scrub_logs",
   "title": "Keeping personal data out of logs",
   "prompt": "<p>Structured logs record events as dicts, which makes it possible to remove personal data before an event is written. Write two functions.</p>\n<ul>\n<li><code>scrub(event, sensitive)</code> returns a cleaned <em>copy</em> of <code>event</code>, which may contain dicts, lists, strings and other values nested to any depth, without changing the original. In every dict, the value of any key that matches a name in <code>sensitive</code>, ignoring case, becomes <code>\"[redacted]\"</code>, whatever it was. In every other string, each email address is replaced by <code>\"[email]\"</code>, using the pattern <code>[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\\.[A-Za-z0-9-]+)+</code>. Dict keys are never changed: only values are scrubbed. Other values are kept as they are.</li>\n<li><code>pseudonym(value, key)</code>: a stable pseudonym that lets you count a household's visits in the logs without recording who it is: the first 12 hexadecimal characters of HMAC-SHA256 (CS 380 Lesson 3) of <code>str(value)</code>, encoded as UTF-8, with the bytes <code>key</code>. Use the <code>hmac</code> module.</li>\n</ul>",
   "starter": "import re, hmac, hashlib\n\ndef scrub(event, sensitive):\n    pass\n\ndef pseudonym(value, key):\n    pass\n",
   "hint": "<p>Write a recursive helper that returns a new value: a new dict for a dict, a new list for a list, <code>EMAIL.sub(\"[email]\", s)</code> for a string, and the value itself otherwise. <code>hmac.new(key, msg, hashlib.sha256).hexdigest()</code> gives the MAC as hex.</p>",
   "solution": "import re, hmac, hashlib\n\nEMAIL = re.compile(r\"[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\\.[A-Za-z0-9-]+)+\")\n\ndef scrub(event, sensitive):\n    keys = {k.lower() for k in sensitive}\n    def walk(v):\n        if isinstance(v, dict):\n            return {k: \"[redacted]\" if isinstance(k, str) and k.lower() in keys else walk(x)\n                    for k, x in v.items()}\n        if isinstance(v, list):\n            return [walk(x) for x in v]\n        if isinstance(v, str):\n            return EMAIL.sub(\"[email]\", v)\n        return v\n    return walk(event)\n\ndef pseudonym(value, key):\n    return hmac.new(key, str(value).encode(\"utf-8\"), hashlib.sha256).hexdigest()[:12]\n",
   "tests": [
    {
     "label": "A nested check-in event",
     "call": "scrub({'event': 'checkin', 'household': {'Name': 'R. Diaz', 'size': 4, 'contacts': ['rdiaz@example.org', {'phone': '555-0100'}]}, 'note': 'asked to email maria.k@pantry.example.com', 'ok': True}, ['name', 'phone', 'address'])",
     "expect": "{'event': 'checkin', 'household': {'Name': '[redacted]', 'size': 4, 'contacts': ['[email]', {'phone': '[redacted]'}]}, 'note': 'asked to email [email]', 'ok': True}"
    },
    {
     "label": "The original is unchanged",
     "type": "assert",
     "code": "e = {\"user\": {\"email\": \"a@b.co\", \"tags\": [\"x@y.org\"]}, \"n\": 3}\nout = scrub(e, [\"email\"])\nassert e == {\"user\": {\"email\": \"a@b.co\", \"tags\": [\"x@y.org\"]}, \"n\": 3}, \"scrub changed its input\"\nassert out == {\"user\": {\"email\": \"[redacted]\", \"tags\": [\"[email]\"]}, \"n\": 3}, f\"got {out}\"\n"
    },
    {
     "label": "A sensitive key holding a dict is redacted whole",
     "call": "scrub({'address': {'street': '1 Elm St', 'zip': '02139'}}, ['ADDRESS'])",
     "expect": "{'address': '[redacted]'}"
    },
    {
     "label": "Not an email",
     "call": "scrub(['user@localhost', 'a @b.com', 'two: a@b.io, c.d@e-f.org'], [])",
     "expect": "['user@localhost', 'a @b.com', 'two: [email], [email]']"
    },
    {
     "label": "Keys are not scrubbed",
     "call": "scrub({'a@b.co': 'c@d.org', 'Phone': 5}, ['phone'])",
     "expect": "{'a@b.co': '[email]', 'Phone': '[redacted]'}"
    },
    {
     "label": "Pseudonyms",
     "call": "[pseudonym(1042, b'k3y'), pseudonym('1042', b'k3y'), pseudonym(1042, b'other')]",
     "expect": "['45a16be333e4', '45a16be333e4', '65f939b71b6a']"
    },
    {
     "label": "Uses hmac",
     "type": "source",
     "code": "assert 'hmac' in __source__, 'use the hmac module'\n"
    }
   ]
  }
 ],
 "pj8": [
  {
   "id": "sus_score",
   "title": "Scoring the System Usability Scale",
   "prompt": "<p>Write <code>sus_score(responses)</code> for one participant's ten SUS answers, each a whole number from 1 (strongly disagree) to 5 (strongly agree), in questionnaire order. Odd-numbered items (1, 3, 5, 7, 9) are positive statements and contribute (response − 1); even-numbered items are negative and contribute (5 − response). Multiply the sum by 2.5 to get a score from 0 to 100. Raise <code>ValueError</code> unless there are exactly ten responses, each an int (not a bool or float) from 1 to 5.</p>\n<p>Then write <code>summarize(all_responses)</code> for a list of participants' answer lists, returning a dict with <code>\"n\"</code>, <code>\"mean\"</code> (rounded to 1 place), <code>\"min\"</code>, <code>\"max\"</code> and <code>\"above_average\"</code>: whether the unrounded mean is above 68. Raise <code>ValueError</code> for an empty list.</p>",
   "starter": "def sus_score(responses):\n    pass\n\ndef summarize(all_responses):\n    pass\n",
   "hint": "<p><code>enumerate(responses, start=1)</code> numbers the items from 1, so <code>i % 2 == 1</code> picks the odd ones. <code>type(r) is int</code> rejects bools, which <code>isinstance</code> would accept.</p>",
   "solution": "def sus_score(responses):\n    if len(responses) != 10:\n        raise ValueError(\"SUS has exactly 10 items\")\n    total = 0\n    for i, r in enumerate(responses, start=1):\n        if type(r) is not int or not 1 <= r <= 5:\n            raise ValueError(\"each response must be a whole number from 1 to 5\")\n        total += (r - 1) if i % 2 == 1 else (5 - r)\n    return total * 2.5\n\ndef summarize(all_responses):\n    if not all_responses:\n        raise ValueError(\"no responses\")\n    scores = [sus_score(r) for r in all_responses]\n    mean = sum(scores) / len(scores)\n    return {\"n\": len(scores), \"mean\": round(mean, 1), \"min\": min(scores), \"max\": max(scores),\n            \"above_average\": mean > 68}\n",
   "tests": [
    {
     "label": "The notes' participant",
     "call": "sus_score([4, 2, 4, 1, 5, 2, 4, 2, 4, 3])",
     "expect": "77.5"
    },
    {
     "label": "Best and worst possible",
     "call": "(sus_score([5, 1] * 5), sus_score([1, 5] * 5))",
     "expect": "(100.0, 0.0)"
    },
    {
     "label": "All neutral",
     "call": "sus_score([3] * 10)",
     "expect": "50.0"
    },
    {
     "label": "Three participants",
     "call": "summarize([[4, 2, 4, 1, 5, 2, 4, 2, 4, 3], [5, 1, 5, 2, 4, 1, 5, 1, 4, 2], [3, 3, 3, 2, 3, 3, 4, 3, 2, 4]])",
     "expect": "{'n': 3, 'mean': 72.5, 'min': 50.0, 'max': 90.0, 'above_average': True}"
    },
    {
     "label": "A mean of exactly 68 is not above average",
     "call": "summarize([[5, 3, 5, 3, 5, 3, 5, 3, 3, 3], [5, 3, 5, 3, 5, 3, 5, 3, 3, 3], [5, 3, 5, 3, 5, 3, 3, 3, 3, 3], [5, 3, 5, 3, 5, 3, 4, 3, 3, 3], [5, 3, 5, 3, 5, 3, 4, 3, 3, 3]])",
     "expect": "{'n': 5, 'mean': 68.0, 'min': 65.0, 'max': 70.0, 'above_average': False}",
     "hidden": true
    },
    {
     "label": "Nine answers",
     "type": "raises",
     "call": "sus_score([3] * 9)",
     "error": "ValueError"
    },
    {
     "label": "A 6",
     "type": "raises",
     "call": "sus_score([3] * 9 + [6])",
     "error": "ValueError"
    },
    {
     "label": "A bool",
     "type": "raises",
     "call": "sus_score([3] * 9 + [True])",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "Nobody",
     "type": "raises",
     "call": "summarize([])",
     "error": "ValueError",
     "hidden": true
    }
   ]
  },
  {
   "id": "nfr_report",
   "title": "Measuring against targets",
   "prompt": "<p>Check measured data against a requirements document's non-functional targets. Write:</p>\n<ul>\n<li><code>percentile(values, p)</code>: the nearest-rank percentile from the notes: sort the values and return the one at position ⌈p × n/100⌉, counting from 1. Compute it as <code>math.ceil(p * n / 100)</code>, multiplying before dividing: in floating point, 99.9/100 × 1000 is 999.0000000000001, whose ceiling is 1000. Raise <code>ValueError</code> for no values or p outside (0, 100].</li>\n<li><code>check_targets(measurements, targets)</code>: <code>measurements</code> maps metric names to lists of samples. Each target is a dict with keys <code>\"id\"</code>, <code>\"metric\"</code>, <code>\"stat\"</code> (<code>\"mean\"</code>, <code>\"max\"</code>, <code>\"min\"</code>, or <code>\"p\"</code> followed by a number such as <code>\"p95\"</code> or <code>\"p99.9\"</code>), <code>\"op\"</code> (<code>\"&lt;=\"</code> or <code>\"&gt;=\"</code>) and <code>\"target\"</code>. Return a list, in target order, of <code>(id, value, passed)</code>, where value is the statistic rounded to 2 places. If a metric has no samples (missing or an empty list), give <code>(id, None, False)</code>: an unmeasured target hasn't been met. Raise <code>ValueError</code> for an unknown stat or op.</li>\n</ul>",
   "starter": "import math\n\ndef percentile(values, p):\n    pass\n\ndef check_targets(measurements, targets):\n    pass\n",
   "hint": "<p>For <code>\"p95\"</code>, <code>float(stat[1:])</code> gives 95.0; wrap it in try/except to raise ValueError for something like <code>\"pxx\"</code>. Compare the unrounded value with the target, and round only for the report.</p>",
   "solution": "import math\n\ndef percentile(values, p):\n    if not values:\n        raise ValueError(\"no values\")\n    if not 0 < p <= 100:\n        raise ValueError(\"p must be in (0, 100]\")\n    s = sorted(values)\n    return s[math.ceil(p * len(s) / 100) - 1]\n\ndef _stat(samples, stat):\n    if stat == \"mean\":\n        return sum(samples) / len(samples)\n    if stat == \"max\":\n        return max(samples)\n    if stat == \"min\":\n        return min(samples)\n    if stat.startswith(\"p\"):\n        try:\n            p = float(stat[1:])\n        except ValueError:\n            raise ValueError(\"unknown statistic \" + stat)\n        return percentile(samples, p)\n    raise ValueError(\"unknown statistic \" + stat)\n\ndef check_targets(measurements, targets):\n    report = []\n    for t in targets:\n        if t[\"op\"] not in (\"<=\", \">=\"):\n            raise ValueError(\"unknown operator \" + str(t[\"op\"]))\n        samples = measurements.get(t[\"metric\"])\n        if not samples:\n            _stat([0], t[\"stat\"])\n            report.append((t[\"id\"], None, False))\n            continue\n        v = _stat(samples, t[\"stat\"])\n        ok = v <= t[\"target\"] if t[\"op\"] == \"<=\" else v >= t[\"target\"]\n        report.append((t[\"id\"], round(v, 2), ok))\n    return report\n",
   "tests": [
    {
     "label": "Percentiles of the notes' 20 check-ins",
     "call": "[percentile([18, 22, 25, 19, 31, 24, 27, 58, 21, 23, 26, 20, 29, 24, 22, 35, 19, 23, 28, 25], p) for p in (50, 90, 95, 100)]",
     "expect": "[24, 31, 35, 58]"
    },
    {
     "label": "Small samples",
     "call": "[percentile([7], 1), percentile([3, 1, 2], 50), percentile([3, 1, 2], 67)]",
     "expect": "[7, 2, 3]"
    },
    {
     "label": "The notes' report",
     "call": "check_targets({'checkin_s': [18, 22, 25, 19, 31, 24, 27, 58, 21, 23, 26, 20, 29, 24, 22, 35, 19, 23, 28, 25], 'sus': [77.5, 87.5, 50.0]}, [{'id': 'NFR-1', 'metric': 'checkin_s', 'stat': 'p95', 'op': '<=', 'target': 30}, {'id': 'NFR-2', 'metric': 'checkin_s', 'stat': 'max', 'op': '<=', 'target': 60}, {'id': 'NFR-3', 'metric': 'sus', 'stat': 'mean', 'op': '>=', 'target': 68}, {'id': 'NFR-4', 'metric': 'page_kb', 'stat': 'p75', 'op': '<=', 'target': 500}])",
     "expect": "[('NFR-1', 35, False), ('NFR-2', 58, True), ('NFR-3', 71.67, True), ('NFR-4', None, False)]"
    },
    {
     "label": "A fractional percentile",
     "call": "check_targets({'ms': list(range(1, 1001))}, [{'id': 'A', 'metric': 'ms', 'stat': 'p99.9', 'op': '<=', 'target': 999}])",
     "expect": "[('A', 999, True)]"
    },
    {
     "label": "p = 0",
     "type": "raises",
     "call": "percentile([1, 2], 0)",
     "error": "ValueError"
    },
    {
     "label": "An unknown stat",
     "type": "raises",
     "call": "check_targets({'m': [1]}, [{'id': 'X', 'metric': 'm', 'stat': 'median', 'op': '<=', 'target': 1}])",
     "error": "ValueError"
    },
    {
     "label": "An unknown op",
     "type": "raises",
     "call": "check_targets({'m': [1]}, [{'id': 'X', 'metric': 'm', 'stat': 'max', 'op': '<', 'target': 1}])",
     "error": "ValueError",
     "hidden": true
    },
    {
     "label": "No values",
     "type": "raises",
     "call": "percentile([], 50)",
     "error": "ValueError",
     "hidden": true
    }
   ]
  }
 ]
});
