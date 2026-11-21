/* Auto-graded programming problems for CS 480, by lesson. Generated from a Python spec, so every
   string is JSON. Each problem makes one technical side of a legal or ethical question concrete. The
   legal rules inside them are simplified models stated in each prompt, not legal advice. */
CSA.addCode("cs480", {
 "et1": [
  {
   "id": "tradeoffs",
   "title": "Weighing options for stakeholders",
   "prompt": "<p>Lesson 1's stakeholder table can be written as data. <code>options</code> maps each option's name to a dict from stakeholder group to the change in welfare <em>per person</em> in that group (a number on any agreed scale; negative is harm). A group missing from an option's dict is unaffected (change 0). <code>sizes</code> maps each group to its number of people. Write:</p>\n<ul>\n<li><code>totals(options, sizes)</code>: a dict from option to the summed change over everyone, size × change summed over groups (the consequentialist total).</li>\n<li><code>worst_off(options, sizes)</code>: a dict from option to the smallest per-person change over all groups in <code>sizes</code> (the maximin value: how the worst-off group fares).</li>\n<li><code>dominated(options, sizes)</code>: a sorted list of the options that are <em>Pareto-dominated</em>: some other option is at least as good for every group in <code>sizes</code> and strictly better for at least one.</li>\n<li><code>choose(options, sizes, rule)</code>: the best option under <code>rule</code>, which is <code>\"total\"</code> (largest total) or <code>\"maximin\"</code> (largest worst-off value; among options tied on that, the one with the largest total, so that maximin never picks a dominated option over the one dominating it). Break any remaining tie by the alphabetically first name. Raise <code>ValueError</code> for any other rule.</li>\n</ul>\n<p>Every group in <code>sizes</code> counts, even one that no option mentions.</p>",
   "starter": "def totals(options, sizes):\n    pass\n\ndef worst_off(options, sizes):\n    pass\n\ndef dominated(options, sizes):\n    pass\n\ndef choose(options, sizes, rule):\n    pass\n",
   "hint": "<p>Write a helper <code>change(options, o, g)</code> that returns <code>options[o].get(g, 0)</code>. For <code>choose</code>, sort the names first, then take <code>max</code> with a key (for maximin, the tuple <code>(worst, total)</code>): <code>max</code> returns the first of equal maxima.</p>",
   "solution": "def _c(options, o, g):\n    return options[o].get(g, 0)\n\ndef totals(options, sizes):\n    return {o: sum(n * _c(options, o, g) for g, n in sizes.items()) for o in options}\n\ndef worst_off(options, sizes):\n    return {o: min(_c(options, o, g) for g in sizes) for o in options}\n\ndef dominated(options, sizes):\n    out = []\n    for a in options:\n        for b in options:\n            if a == b:\n                continue\n            ge = all(_c(options, b, g) >= _c(options, a, g) for g in sizes)\n            gt = any(_c(options, b, g) > _c(options, a, g) for g in sizes)\n            if ge and gt:\n                out.append(a)\n                break\n    return sorted(out)\n\ndef choose(options, sizes, rule):\n    if rule == \"total\":\n        score = totals(options, sizes)\n    elif rule == \"maximin\":\n        w, t = worst_off(options, sizes), totals(options, sizes)\n        score = {o: (w[o], t[o]) for o in options}\n    else:\n        raise ValueError(rule)\n    return max(sorted(options), key=lambda o: score[o])\n",
   "tests": [
    {
     "label": "The location-sharing case",
     "type": "assert",
     "code": "sizes = {\"users\": 9000, \"at-risk users\": 100, \"company\": 1}\noptions = {\n    \"on by default\": {\"users\": 2, \"at-risk users\": -50, \"company\": 5000},\n    \"opt-in\": {\"users\": 1, \"at-risk users\": 0, \"company\": 3000},\n    \"drop feature\": {},\n}\nassert totals(options, sizes) == {\"on by default\": 18000, \"opt-in\": 12000, \"drop feature\": 0}, totals(options, sizes)\nassert worst_off(options, sizes) == {\"on by default\": -50, \"opt-in\": 0, \"drop feature\": 0}\nassert choose(options, sizes, \"total\") == \"on by default\"\nassert choose(options, sizes, \"maximin\") == \"opt-in\"\nassert dominated(options, sizes) == [\"drop feature\"], dominated(options, sizes)\n"
    },
    {
     "label": "Ties go to the alphabetically first option",
     "type": "assert",
     "code": "sizes = {\"a\": 1, \"b\": 1}\noptions = {\"zeta\": {\"a\": 1, \"b\": 1}, \"alpha\": {\"a\": 2, \"b\": 0}, \"mid\": {\"a\": 0, \"b\": 2}}\nassert choose(options, sizes, \"total\") == \"alpha\"\nassert choose(options, sizes, \"maximin\") == \"zeta\"\nassert dominated(options, sizes) == []\n"
    },
    {
     "label": "Unmentioned groups count as 0",
     "type": "assert",
     "code": "sizes = {\"a\": 10, \"b\": 5, \"bystanders\": 1000}\noptions = {\"x\": {\"a\": 1}, \"y\": {\"a\": 1, \"bystanders\": -1}}\nassert worst_off(options, sizes) == {\"x\": 0, \"y\": -1}\nassert dominated(options, sizes) == [\"y\"]\nassert totals(options, sizes)[\"y\"] == -990\n"
    },
    {
     "label": "Unknown rule",
     "type": "raises",
     "call": "choose({'x': {}}, {'a': 1}, 'vibes')",
     "error": "ValueError"
    }
   ]
  }
 ],
 "et2": [
  {
   "id": "spdx",
   "title": "SPDX license expressions",
   "prompt": "<p>Package metadata states licenses as SPDX expressions such as <code>MIT OR Apache-2.0</code> (you may choose either) or <code>MIT AND BSD-3-Clause</code> (you must comply with both). Write <code>choices(expr)</code>, which returns every set of licenses you could choose to comply with, as a sorted list of sorted tuples with no duplicates.</p>\n<ul>\n<li>A license identifier is a run of letters, digits, <code>.</code>, <code>-</code> and <code>+</code>. <code>X WITH Y</code> (an identifier, the word WITH and an exception identifier) is one license, written <code>\"X WITH Y\"</code> in the result.</li>\n<li><code>AND</code> binds more tightly than <code>OR</code>, as in the SPDX specification, so <code>A OR B AND C</code> means <code>A OR (B AND C)</code>. Parentheses group.</li>\n<li>For <code>P OR Q</code>, the choices are those of P together with those of Q. For <code>P AND Q</code>, each choice is the union of one choice of P and one choice of Q.</li>\n<li>Raise <code>ValueError</code> for a malformed expression: an empty one, a missing operand, unbalanced parentheses, or a word where an operator is needed (operators are upper case).</li>\n</ul>\n<pre>choices(\"MIT AND (BSD-3-Clause OR GPL-2.0-only)\")\n# [('BSD-3-Clause', 'MIT'), ('GPL-2.0-only', 'MIT')]</pre>",
   "starter": "def choices(expr):\n    pass\n",
   "hint": "<p>Tokenize into identifiers, <code>(</code> and <code>)</code>; then write a recursive-descent parser (CS 365 or CS 320's grammars): <code>or_expr := and_expr (\"OR\" and_expr)*</code>, <code>and_expr := atom (\"AND\" atom)*</code>, <code>atom := \"(\" or_expr \")\" | ID [\"WITH\" ID]</code>. Have each function return a set of frozensets.</p>",
   "solution": "import re\n\ndef _tokens(expr):\n    toks = re.findall(r\"\\(|\\)|[A-Za-z0-9.+\\-]+|\\S\", expr)\n    for t in toks:\n        if not (t in \"()\" or re.fullmatch(r\"[A-Za-z0-9.+\\-]+\", t)):\n            raise ValueError(\"bad character \" + t)\n    return toks\n\ndef choices(expr):\n    toks = _tokens(expr)\n    pos = 0\n\n    def peek():\n        return toks[pos] if pos < len(toks) else None\n\n    def take():\n        nonlocal pos\n        if pos >= len(toks):\n            raise ValueError(\"unexpected end\")\n        pos += 1\n        return toks[pos - 1]\n\n    def atom():\n        t = take()\n        if t == \"(\":\n            r = or_expr()\n            if take() != \")\":\n                raise ValueError(\"expected )\")\n            return r\n        if t in (\")\", \"AND\", \"OR\", \"WITH\"):\n            raise ValueError(\"expected a license, got \" + t)\n        if peek() == \"WITH\":\n            take()\n            e = take()\n            if e in (\"(\", \")\", \"AND\", \"OR\", \"WITH\"):\n                raise ValueError(\"expected an exception\")\n            t = t + \" WITH \" + e\n        return {frozenset([t])}\n\n    def and_expr():\n        r = atom()\n        while peek() == \"AND\":\n            take()\n            s = atom()\n            r = {a | b for a in r for b in s}\n        return r\n\n    def or_expr():\n        r = and_expr()\n        while peek() == \"OR\":\n            take()\n            r = r | and_expr()\n        return r\n\n    result = or_expr()\n    if pos != len(toks):\n        raise ValueError(\"unexpected \" + toks[pos])\n    return sorted(tuple(sorted(c)) for c in result)\n",
   "tests": [
    {
     "label": "Single license, OR and AND",
     "type": "assert",
     "code": "assert choices(\"MIT\") == [(\"MIT\",)]\nassert choices(\"MIT OR Apache-2.0\") == [(\"Apache-2.0\",), (\"MIT\",)]\nassert choices(\"MIT AND BSD-3-Clause\") == [(\"BSD-3-Clause\", \"MIT\")]\n"
    },
    {
     "label": "Parentheses and precedence",
     "type": "assert",
     "code": "assert choices(\"MIT AND (BSD-3-Clause OR GPL-2.0-only)\") == [(\"BSD-3-Clause\", \"MIT\"), (\"GPL-2.0-only\", \"MIT\")]\nassert choices(\"MIT OR BSD-3-Clause AND GPL-2.0-only\") == [(\"BSD-3-Clause\", \"GPL-2.0-only\"), (\"MIT\",)], choices(\"MIT OR BSD-3-Clause AND GPL-2.0-only\")\nassert choices(\"(MIT OR ISC) AND (Apache-2.0 OR Zlib)\") == [(\"Apache-2.0\", \"ISC\"), (\"Apache-2.0\", \"MIT\"), (\"ISC\", \"Zlib\"), (\"MIT\", \"Zlib\")]\n"
    },
    {
     "label": "WITH and duplicates",
     "type": "assert",
     "code": "assert choices(\"GPL-2.0-only WITH Classpath-exception-2.0\") == [(\"GPL-2.0-only WITH Classpath-exception-2.0\",)]\nassert choices(\"MIT OR MIT\") == [(\"MIT\",)]\nassert choices(\"MIT AND MIT\") == [(\"MIT\",)]\nassert choices(\"GPL-2.0+ OR LGPL-2.1-or-later\") == [(\"GPL-2.0+\",), (\"LGPL-2.1-or-later\",)]\n"
    },
    {
     "label": "Malformed expressions",
     "type": "assert",
     "code": "for bad in [\"\", \"MIT OR\", \"AND MIT\", \"(MIT\", \"MIT)\", \"MIT Apache-2.0\", \"MIT or Apache-2.0\", \"()\", \"MIT WITH\", \"MIT & BSD\"]:\n    try:\n        choices(bad)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(\"no ValueError for \" + repr(bad))\n"
    }
   ]
  },
  {
   "id": "license_graph",
   "title": "License compatibility across dependencies",
   "prompt": "<p>A program you distribute includes code from every package it depends on, directly or through other packages. Each dependency's license limits which license the whole program can be distributed under (its <em>outbound</em> license). This problem uses the simplified table in the starter, which follows the Free Software Foundation's published compatibility views for unmodified libraries; it ignores linking and other details a lawyer would ask about. The starter defines <code>OUTBOUND</code>, a list of six outbound license names (MIT, Apache-2.0, Proprietary, GPL-2.0-only, GPL-3.0-or-later, AGPL-3.0-only), and <code>ALLOWED</code>, a dict from a dependency's license identifier to the set of outbound licenses a program including it may use; for example <code>ALLOWED[\"GPL-3.0-or-later\"]</code> is <code>{\"GPL-3.0-or-later\", \"AGPL-3.0-only\"}</code>, and <code>ALLOWED[\"Apache-2.0\"]</code> is every outbound license except GPL-2.0-only.</p>\n<p><code>packages</code> maps each package name to <code>(license, [dependency names])</code>, where license is a single identifier (never an SPDX expression with AND or OR) or <code>None</code>; every name listed as a dependency is also a key. Dependencies may form cycles. Write:</p>\n<ul>\n<li><code>dependencies(root, packages)</code>: the set of all packages reachable from <code>root</code>, never including <code>root</code> itself. Leave <code>root</code> out even when a cycle leads back to it.</li>\n<li><code>violations(root, packages, outbound)</code>: a sorted list of <code>(package, license)</code> pairs for dependencies whose license does not allow <code>outbound</code>. A license not in <code>ALLOWED</code> (including <code>None</code>, no license at all) allows nothing: code with no license can't be redistributed.</li>\n<li><code>possible(root, packages)</code>: the outbound licenses in <code>OUTBOUND</code>, in that order, that produce no violations.</li>\n</ul>",
   "starter": "OUTBOUND = [\"MIT\", \"Apache-2.0\", \"Proprietary\", \"GPL-2.0-only\", \"GPL-3.0-or-later\", \"AGPL-3.0-only\"]\nANY = set(OUTBOUND)\n\n# ALLOWED[dependency license] = the outbound licenses a program including it may use.\nALLOWED = {\n    \"MIT\": ANY,\n    \"BSD-3-Clause\": ANY,\n    \"Apache-2.0\": ANY - {\"GPL-2.0-only\"},       # its patent terms conflict with GPLv2\n    \"MPL-2.0\": ANY,                             # file-level copyleft: MPL files stay MPL\n    \"LGPL-2.1-or-later\": ANY,                   # used as an unmodified, replaceable library\n    \"GPL-2.0-only\": {\"GPL-2.0-only\"},\n    \"GPL-2.0-or-later\": {\"GPL-2.0-only\", \"GPL-3.0-or-later\", \"AGPL-3.0-only\"},\n    \"GPL-3.0-or-later\": {\"GPL-3.0-or-later\", \"AGPL-3.0-only\"},  # GPLv3 section 13 allows AGPL\n    \"AGPL-3.0-only\": {\"AGPL-3.0-only\"},\n}\n\ndef dependencies(root, packages):\n    pass\n\ndef violations(root, packages, outbound):\n    pass\n\ndef possible(root, packages):\n    pass\n",
   "hint": "<p>Use an explicit stack and a <code>seen</code> set (CS 201's depth-first search) so that cycles terminate. <code>ALLOWED.get(lic, set())</code> handles unknown licenses.</p>",
   "solution": "OUTBOUND = [\"MIT\", \"Apache-2.0\", \"Proprietary\", \"GPL-2.0-only\", \"GPL-3.0-or-later\", \"AGPL-3.0-only\"]\nANY = set(OUTBOUND)\n\nALLOWED = {\n    \"MIT\": ANY,\n    \"BSD-3-Clause\": ANY,\n    \"Apache-2.0\": ANY - {\"GPL-2.0-only\"},\n    \"MPL-2.0\": ANY,\n    \"LGPL-2.1-or-later\": ANY,\n    \"GPL-2.0-only\": {\"GPL-2.0-only\"},\n    \"GPL-2.0-or-later\": {\"GPL-2.0-only\", \"GPL-3.0-or-later\", \"AGPL-3.0-only\"},\n    \"GPL-3.0-or-later\": {\"GPL-3.0-or-later\", \"AGPL-3.0-only\"},\n    \"AGPL-3.0-only\": {\"AGPL-3.0-only\"},\n}\n\ndef dependencies(root, packages):\n    seen = set()\n    stack = list(packages[root][1])\n    while stack:\n        p = stack.pop()\n        if p in seen:\n            continue\n        seen.add(p)\n        stack.extend(packages[p][1])\n    seen.discard(root)\n    return seen\n\ndef violations(root, packages, outbound):\n    out = []\n    for p in dependencies(root, packages):\n        lic = packages[p][0]\n        if outbound not in ALLOWED.get(lic, set()):\n            out.append((p, lic))\n    return sorted(out, key=lambda x: (x[0], str(x[1])))\n\ndef possible(root, packages):\n    return [o for o in OUTBOUND if not violations(root, packages, o)]\n",
   "tests": [
    {
     "label": "A permissive tree allows everything",
     "type": "assert",
     "code": "pk = {\"app\": (\"MIT\", [\"web\", \"json\"]), \"web\": (\"BSD-3-Clause\", [\"json\"]), \"json\": (\"MIT\", [])}\nassert dependencies(\"app\", pk) == {\"web\", \"json\"}\nassert violations(\"app\", pk, \"Proprietary\") == []\nassert possible(\"app\", pk) == OUTBOUND\n"
    },
    {
     "label": "A deep GPL dependency",
     "type": "assert",
     "code": "pk = {\"app\": (\"MIT\", [\"a\"]), \"a\": (\"Apache-2.0\", [\"b\"]), \"b\": (\"MIT\", [\"c\"]), \"c\": (\"GPL-3.0-or-later\", [])}\nassert violations(\"app\", pk, \"MIT\") == [(\"c\", \"GPL-3.0-or-later\")]\nassert violations(\"app\", pk, \"GPL-3.0-or-later\") == []\nassert possible(\"app\", pk) == [\"GPL-3.0-or-later\", \"AGPL-3.0-only\"]\n"
    },
    {
     "label": "Apache-2.0 and GPL-2.0-only can't be combined",
     "type": "assert",
     "code": "pk = {\"app\": (\"GPL-2.0-only\", [\"x\", \"y\"]), \"x\": (\"Apache-2.0\", []), \"y\": (\"GPL-2.0-only\", [])}\nassert violations(\"app\", pk, \"GPL-2.0-only\") == [(\"x\", \"Apache-2.0\")]\nassert possible(\"app\", pk) == []\n"
    },
    {
     "label": "Cycles, and code with no license",
     "type": "assert",
     "code": "pk = {\"app\": (\"MIT\", [\"a\"]), \"a\": (\"MIT\", [\"b\"]), \"b\": (\"MPL-2.0\", [\"a\", \"app\", \"snippet\"]), \"snippet\": (None, [])}\nassert dependencies(\"app\", pk) == {\"a\", \"b\", \"snippet\"}\nassert violations(\"app\", pk, \"MIT\") == [(\"snippet\", None)]\nassert possible(\"app\", pk) == []\npk[\"snippet\"] = (\"Unlicensed-Custom\", [])\nassert violations(\"app\", pk, \"AGPL-3.0-only\") == [(\"snippet\", \"Unlicensed-Custom\")]\n"
    },
    {
     "label": "GPL-2.0-or-later can be upgraded",
     "type": "assert",
     "hidden": true,
     "code": "pk = {\"app\": (\"x\", [\"g2\", \"ap\"]), \"g2\": (\"GPL-2.0-or-later\", []), \"ap\": (\"Apache-2.0\", [])}\nassert possible(\"app\", pk) == [\"GPL-3.0-or-later\", \"AGPL-3.0-only\"]\n"
    }
   ]
  }
 ],
 "et3": [
  {
   "id": "kanon",
   "title": "k-anonymity: check and generalize",
   "prompt": "<p>Records are dicts. Write:</p>\n<ul>\n<li><code>k_anonymity(records, quasi)</code>: the size of the smallest equivalence class, where records are in the same class when they agree on every key in <code>quasi</code>. Return 0 for no records.</li>\n<li><code>l_diversity(records, quasi, sensitive)</code>: the smallest number of distinct values of the key <code>sensitive</code> within any class (0 for no records).</li>\n<li><code>generalize(records, zip_digits, age_width)</code>: new records (don't change the input) in which <code>\"zip\"</code> keeps its first <code>zip_digits</code> characters and the rest become <code>*</code> (<code>\"02139\"</code> with 3 digits is <code>\"021**\"</code>), and <code>\"age\"</code> becomes the string <code>\"lo-hi\"</code> of its band, where lo = age // age_width × age_width and hi = lo + age_width − 1 (34 with width 10 is <code>\"30-39\"</code>). With width 1, the age becomes <code>str(age)</code>. Other keys are copied unchanged.</li>\n<li><code>anonymize(records, k)</code>: the least generalization that makes the records <em>k</em>-anonymous on the quasi-identifiers <code>(\"zip\", \"age\", \"sex\")</code>. ZIP levels are <code>ZIP_DIGITS = [5, 4, 3, 2, 1, 0]</code> and age levels <code>AGE_WIDTHS = [1, 5, 10, 20, 50, 100]</code>; level pair (<em>i</em>, <em>j</em>) means <code>ZIP_DIGITS[i]</code> and <code>AGE_WIDTHS[j]</code>. Try pairs in increasing order of <em>i</em> + <em>j</em>, and among equal sums, increasing <em>i</em>. Return <code>(zip_digits, age_width, generalized_records)</code> for the first pair that works. Sex is never generalized, so if even the coarsest pair fails, raise <code>ValueError</code>. Ages are from 0 to 99.</li>\n</ul>",
   "starter": "ZIP_DIGITS = [5, 4, 3, 2, 1, 0]\nAGE_WIDTHS = [1, 5, 10, 20, 50, 100]\n\ndef k_anonymity(records, quasi):\n    pass\n\ndef l_diversity(records, quasi, sensitive):\n    pass\n\ndef generalize(records, zip_digits, age_width):\n    pass\n\ndef anonymize(records, k):\n    pass\n",
   "hint": "<p>Group with a dict keyed by <code>tuple(r[q] for q in quasi)</code>. For <code>anonymize</code>, loop <code>s</code> from 0 to 10 and <code>i</code> from 0 to 5, with <code>j = s - i</code> when 0 ≤ j ≤ 5.</p>",
   "solution": "from collections import defaultdict\n\nZIP_DIGITS = [5, 4, 3, 2, 1, 0]\nAGE_WIDTHS = [1, 5, 10, 20, 50, 100]\nQUASI = (\"zip\", \"age\", \"sex\")\n\ndef _classes(records, quasi):\n    groups = defaultdict(list)\n    for r in records:\n        groups[tuple(r[q] for q in quasi)].append(r)\n    return groups\n\ndef k_anonymity(records, quasi):\n    g = _classes(records, quasi)\n    return min((len(v) for v in g.values()), default=0)\n\ndef l_diversity(records, quasi, sensitive):\n    g = _classes(records, quasi)\n    return min((len({r[sensitive] for r in v}) for v in g.values()), default=0)\n\ndef generalize(records, zip_digits, age_width):\n    out = []\n    for r in records:\n        r = dict(r)\n        z = r[\"zip\"]\n        r[\"zip\"] = z[:zip_digits] + \"*\" * (len(z) - zip_digits)\n        if age_width == 1:\n            r[\"age\"] = str(r[\"age\"])\n        else:\n            lo = r[\"age\"] // age_width * age_width\n            r[\"age\"] = f\"{lo}-{lo + age_width - 1}\"\n        out.append(r)\n    return out\n\ndef anonymize(records, k):\n    for s in range(11):\n        for i in range(6):\n            j = s - i\n            if 0 <= j <= 5:\n                g = generalize(records, ZIP_DIGITS[i], AGE_WIDTHS[j])\n                if k_anonymity(g, QUASI) >= k:\n                    return ZIP_DIGITS[i], AGE_WIDTHS[j], g\n    raise ValueError(\"cannot reach k by generalizing zip and age\")\n",
   "tests": [
    {
     "label": "Counting k and l",
     "type": "assert",
     "code": "R = [\n    {\"zip\": \"021**\", \"age\": \"30-39\", \"sex\": \"F\", \"dx\": \"flu\"},\n    {\"zip\": \"021**\", \"age\": \"30-39\", \"sex\": \"F\", \"dx\": \"flu\"},\n    {\"zip\": \"021**\", \"age\": \"30-39\", \"sex\": \"F\", \"dx\": \"asthma\"},\n    {\"zip\": \"021**\", \"age\": \"40-49\", \"sex\": \"M\", \"dx\": \"HIV\"},\n    {\"zip\": \"021**\", \"age\": \"40-49\", \"sex\": \"M\", \"dx\": \"HIV\"},\n]\nassert k_anonymity(R, [\"zip\", \"age\", \"sex\"]) == 2\nassert l_diversity(R, [\"zip\", \"age\", \"sex\"], \"dx\") == 1\nassert k_anonymity(R, [\"zip\"]) == 5\nassert k_anonymity([], [\"zip\"]) == 0 and l_diversity([], [\"zip\"], \"dx\") == 0\n"
    },
    {
     "label": "Generalizing doesn't change the input",
     "type": "assert",
     "code": "R = [{\"zip\": \"02139\", \"age\": 34, \"sex\": \"F\", \"dx\": \"flu\"}, {\"zip\": \"02142\", \"age\": 7, \"sex\": \"M\", \"dx\": \"cold\"}]\nG = generalize(R, 3, 10)\nassert G == [{\"zip\": \"021**\", \"age\": \"30-39\", \"sex\": \"F\", \"dx\": \"flu\"}, {\"zip\": \"021**\", \"age\": \"0-9\", \"sex\": \"M\", \"dx\": \"cold\"}], G\nassert R[0][\"age\"] == 34 and R[0][\"zip\"] == \"02139\"\nassert generalize(R, 5, 1)[0][\"age\"] == \"34\" and generalize(R, 0, 100)[1] == {\"zip\": \"*****\", \"age\": \"0-99\", \"sex\": \"M\", \"dx\": \"cold\"}\nassert generalize(R, 4, 5)[0][\"age\"] == \"30-34\"\n"
    },
    {
     "label": "Least generalization, in the stated order",
     "type": "assert",
     "code": "R = [\n    {\"zip\": \"02139\", \"age\": 31, \"sex\": \"F\"}, {\"zip\": \"02138\", \"age\": 33, \"sex\": \"F\"},\n    {\"zip\": \"02141\", \"age\": 36, \"sex\": \"F\"}, {\"zip\": \"02142\", \"age\": 38, \"sex\": \"F\"},\n    {\"zip\": \"02139\", \"age\": 52, \"sex\": \"M\"}, {\"zip\": \"02144\", \"age\": 57, \"sex\": \"M\"},\n]\nz, w, G = anonymize(R, 2)\nassert (z, w) == (3, 10), (z, w)\nassert k_anonymity(G, [\"zip\", \"age\", \"sex\"]) >= 2\nz, w, G = anonymize(R, 1)\nassert (z, w) == (5, 1)\nfor k in (3, 4):\n    try:\n        anonymize(R, k)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(\"only two men: k=%d is impossible without generalizing sex\" % k)\n"
    },
    {
     "label": "Order of the search",
     "type": "assert",
     "code": "R = [{\"zip\": \"10001\", \"age\": 20, \"sex\": \"F\"}, {\"zip\": \"10002\", \"age\": 20, \"sex\": \"F\"},\n     {\"zip\": \"10001\", \"age\": 24, \"sex\": \"F\"}, {\"zip\": \"10002\", \"age\": 24, \"sex\": \"F\"}]\n# (4 digits, width 1) and (5 digits, width 5) both cost 1; the smaller zip level i comes first.\nassert anonymize(R, 2)[:2] == (5, 5), anonymize(R, 2)[:2]\nassert anonymize(R, 4)[:2] == (4, 5), anonymize(R, 4)[:2]\n"
    },
    {
     "label": "Sex alone can make k impossible",
     "type": "assert",
     "code": "R = [{\"zip\": \"10001\", \"age\": 20, \"sex\": \"F\"}, {\"zip\": \"10001\", \"age\": 20, \"sex\": \"F\"}, {\"zip\": \"10001\", \"age\": 20, \"sex\": \"M\"}]\ntry:\n    anonymize(R, 2)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError(\"expected ValueError\")\nassert anonymize(R[:2], 2)[:2] == (5, 1)\n"
    }
   ]
  },
  {
   "id": "laplace",
   "title": "The Laplace mechanism and a privacy budget",
   "prompt": "<p>Implement Lesson 3's Laplace mechanism with a budget that stops queries once the total ε is spent.</p>\n<ul>\n<li><code>laplace_noise(scale, rng)</code>: one sample of Laplace noise with the given scale, by inverse transform: let <em>u</em> = <code>rng.random()</code> − 0.5 and return −scale × sgn(<em>u</em>) × ln(1 − 2|<em>u</em>|), where sgn is −1, 0 or 1. (<code>rng</code> is any object with a <code>random()</code> method, such as <code>random.Random(7)</code>; you may ignore the negligible chance that it returns exactly 0.)</li>\n<li><code>class Budget</code>: <code>Budget(total)</code>; <code>spend(eps)</code> subtracts ε from what remains, or raises <code>ValueError</code> (spending nothing) if ε ≤ 0 or more than remains (allow 1e-9 for floating-point error); <code>remaining()</code> returns what is left.</li>\n<li><code>noisy_count(data, predicate, eps, budget, rng)</code>: spend ε, then return the number of items <code>x</code> in <code>data</code> with <code>predicate(x)</code> true, plus Laplace noise of scale 1/ε (a count's sensitivity is 1).</li>\n<li><code>noisy_sum(values, lo, hi, eps, budget, rng)</code>: spend ε, clamp each value to [lo, hi], and return the sum plus Laplace noise of scale Δ/ε, where the sensitivity Δ = max(|lo|, |hi|): adding or removing one person changes a clamped sum by at most that.</li>\n</ul>\n<p>Spend before computing anything, so a refused query reveals nothing. Draw exactly one <code>rng.random()</code> per query.</p>",
   "starter": "import math\n\ndef laplace_noise(scale, rng):\n    pass\n\nclass Budget:\n    def __init__(self, total):\n        pass\n\n    def spend(self, eps):\n        pass\n\n    def remaining(self):\n        pass\n\ndef noisy_count(data, predicate, eps, budget, rng):\n    pass\n\ndef noisy_sum(values, lo, hi, eps, budget, rng):\n    pass\n",
   "hint": "<p><code>math.copysign(1, u)</code> gives the sign, but returns 1 for <code>u = 0</code>; that's fine here because ln(1) = 0. Clamp with <code>min(max(v, lo), hi)</code>.</p>",
   "solution": "import math\n\ndef laplace_noise(scale, rng):\n    u = rng.random() - 0.5\n    if u == 0:\n        return 0.0\n    return -scale * math.copysign(1, u) * math.log(1 - 2 * abs(u))\n\nclass Budget:\n    def __init__(self, total):\n        self.left = total\n\n    def spend(self, eps):\n        if eps <= 0 or eps > self.left + 1e-9:\n            raise ValueError(\"privacy budget exceeded\")\n        self.left -= eps\n\n    def remaining(self):\n        return self.left\n\ndef noisy_count(data, predicate, eps, budget, rng):\n    budget.spend(eps)\n    return sum(1 for x in data if predicate(x)) + laplace_noise(1 / eps, rng)\n\ndef noisy_sum(values, lo, hi, eps, budget, rng):\n    budget.spend(eps)\n    s = sum(min(max(v, lo), hi) for v in values)\n    return s + laplace_noise(max(abs(lo), abs(hi)) / eps, rng)\n",
   "tests": [
    {
     "label": "Inverse transform with chosen u",
     "type": "assert",
     "code": "import math\nclass R:\n    def __init__(self, xs): self.xs = list(xs)\n    def random(self): return self.xs.pop(0)\nassert laplace_noise(2.0, R([0.5])) == 0\nassert abs(laplace_noise(2.0, R([0.75])) - 2 * math.log(2)) < 1e-12, laplace_noise(2.0, R([0.75]))\nassert abs(laplace_noise(2.0, R([0.25])) + 2 * math.log(2)) < 1e-12\nassert abs(laplace_noise(1.0, R([0.95])) - math.log(10)) < 1e-9\n"
    },
    {
     "label": "Noise has mean 0 and mean |noise| equal to the scale",
     "type": "assert",
     "code": "import random\nrng = random.Random(1)\nxs = [laplace_noise(3.0, rng) for _ in range(40000)]\nm = sum(xs) / len(xs)\na = sum(abs(x) for x in xs) / len(xs)\nassert abs(m) < 0.1, m\nassert abs(a - 3.0) < 0.1, a\n"
    },
    {
     "label": "The budget refuses overspending",
     "type": "assert",
     "code": "b = Budget(1.0)\nb.spend(0.5); b.spend(0.3)\nassert abs(b.remaining() - 0.2) < 1e-12\nfor bad in (0.3, 0, -1):\n    try:\n        b.spend(bad)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(\"spent \" + repr(bad))\nassert abs(b.remaining() - 0.2) < 1e-12\nb.spend(0.1); b.spend(0.1)\nassert abs(b.remaining()) < 1e-9\n"
    },
    {
     "label": "Counts and sums use the right scale and spend first",
     "type": "assert",
     "code": "import math\nclass R:\n    def __init__(self, xs): self.xs = list(xs)\n    def random(self): return self.xs.pop(0)\nb = Budget(1.0)\nc = noisy_count(range(100), lambda x: x % 10 == 0, 0.5, b, R([0.75]))\nassert abs(c - (10 + 2 * math.log(2))) < 1e-9, c\ns = noisy_sum([5, 50, -3, 200], 0, 100, 0.25, b, R([0.25]))\nassert abs(s - (155 - 400 * math.log(2))) < 1e-9, s\nassert abs(b.remaining() - 0.25) < 1e-12\ncalls = []\ndef pred(x):\n    calls.append(x); return True\ntry:\n    noisy_count([1, 2], pred, 0.5, b, R([0.6]))\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError(\"query over budget was answered\")\nassert calls == [], \"computed the count before checking the budget\"\n"
    },
    {
     "label": "Sensitivity uses the larger bound",
     "type": "assert",
     "hidden": true,
     "code": "import math\nclass R:\n    def __init__(self, xs): self.xs = list(xs)\n    def random(self): return self.xs.pop(0)\ns = noisy_sum([-50, 3], -10, 4, 1.0, Budget(1), R([0.75]))\nassert abs(s - (-7 + 10 * math.log(2))) < 1e-9, s\n"
    }
   ]
  },
  {
   "id": "retention",
   "title": "A data-retention policy engine",
   "prompt": "<p>GDPR's storage-limitation principle and the 2025 COPPA amendments both require a stated retention period. Write a small engine that applies a retention schedule. Dates are <code>datetime.date</code> objects.</p>\n<ul>\n<li><code>rules</code> maps a category (such as <code>\"logs\"</code>) to <code>(days, basis)</code>, where basis is <code>\"created\"</code> or <code>\"last_active\"</code>.</li>\n<li>A record is a dict with <code>\"id\"</code>, <code>\"category\"</code>, <code>\"created\"</code>, and optionally <code>\"last_active\"</code>. If the basis is <code>\"last_active\"</code> and the record has none, use <code>\"created\"</code>.</li>\n<li><code>delete_on(record, rules)</code>: the first day the record must be gone: its basis date plus <code>days + 1</code> days (it may be kept for <code>days</code> full days after the basis date). Raise <code>KeyError</code> if its category has no rule: data kept with no stated purpose and limit is itself a violation to fix.</li>\n<li><code>due(records, rules, today, holds=())</code>: a sorted list of ids of records whose deletion date is on or before <code>today</code>, except those under a <em>legal hold</em>: <code>holds</code> is a collection of ids and categories that must be kept (for example, because of litigation).</li>\n<li><code>schedule(records, rules, holds=())</code>: a list of <code>(date, id)</code> pairs, sorted, for every record not under hold.</li>\n</ul>\n<p>Check holds first. A held record is skipped without looking up its rule, so a held record with no rule is not an error. <code>due</code> and <code>schedule</code> raise <code>KeyError</code> (as <code>delete_on</code> does) for any record not under hold whose category has no rule; they don't skip it.</p>",
   "starter": "from datetime import date, timedelta\n\ndef delete_on(record, rules):\n    pass\n\ndef due(records, rules, today, holds=()):\n    pass\n\ndef schedule(records, rules, holds=()):\n    pass\n",
   "hint": "<p><code>record.get(\"last_active\") or record[\"created\"]</code> picks the basis date. A record is held if <code>record[\"id\"] in holds or record[\"category\"] in holds</code>.</p>",
   "solution": "from datetime import date, timedelta\n\ndef delete_on(record, rules):\n    days, basis = rules[record[\"category\"]]\n    base = record[\"created\"]\n    if basis == \"last_active\" and record.get(\"last_active\"):\n        base = record[\"last_active\"]\n    return base + timedelta(days=days + 1)\n\ndef _held(r, holds):\n    return r[\"id\"] in holds or r[\"category\"] in holds\n\ndef due(records, rules, today, holds=()):\n    return sorted(r[\"id\"] for r in records if not _held(r, holds) and delete_on(r, rules) <= today)\n\ndef schedule(records, rules, holds=()):\n    return sorted((delete_on(r, rules), r[\"id\"]) for r in records if not _held(r, holds))\n",
   "tests": [
    {
     "label": "Deletion dates",
     "type": "assert",
     "code": "from datetime import date\nrules = {\"logs\": (30, \"created\"), \"accounts\": (365, \"last_active\")}\nassert delete_on({\"id\": 1, \"category\": \"logs\", \"created\": date(2026, 1, 1)}, rules) == date(2026, 2, 1)\nassert delete_on({\"id\": 2, \"category\": \"accounts\", \"created\": date(2020, 5, 1), \"last_active\": date(2026, 3, 1)}, rules) == date(2027, 3, 2)\nassert delete_on({\"id\": 3, \"category\": \"accounts\", \"created\": date(2025, 1, 10)}, rules) == date(2026, 1, 11)\n"
    },
    {
     "label": "Due records and holds",
     "type": "assert",
     "code": "from datetime import date\nrules = {\"logs\": (30, \"created\"), \"accounts\": (365, \"last_active\"), \"tickets\": (90, \"created\")}\nrecs = [\n    {\"id\": \"a\", \"category\": \"logs\", \"created\": date(2026, 1, 1)},\n    {\"id\": \"b\", \"category\": \"logs\", \"created\": date(2026, 1, 2)},\n    {\"id\": \"c\", \"category\": \"accounts\", \"created\": date(2020, 1, 1), \"last_active\": date(2025, 1, 31)},\n    {\"id\": \"d\", \"category\": \"tickets\", \"created\": date(2025, 6, 1)},\n]\nassert due(recs, rules, date(2026, 2, 1)) == [\"a\", \"c\", \"d\"], due(recs, rules, date(2026, 2, 1))\nassert due(recs, rules, date(2026, 1, 31)) == [\"d\"]\nassert due(recs, rules, date(2026, 2, 1), holds={\"c\"}) == [\"a\", \"d\"]\nassert due(recs, rules, date(2026, 2, 2), holds=[\"logs\"]) == [\"c\", \"d\"]\n"
    },
    {
     "label": "Schedule",
     "type": "assert",
     "code": "from datetime import date\nrules = {\"logs\": (0, \"created\"), \"x\": (10, \"created\")}\nrecs = [{\"id\": \"z\", \"category\": \"x\", \"created\": date(2026, 1, 1)}, {\"id\": \"y\", \"category\": \"logs\", \"created\": date(2026, 1, 5)},\n        {\"id\": \"w\", \"category\": \"logs\", \"created\": date(2026, 1, 5)}]\nassert schedule(recs, rules) == [(date(2026, 1, 6), \"w\"), (date(2026, 1, 6), \"y\"), (date(2026, 1, 12), \"z\")], schedule(recs, rules)\nassert schedule(recs, rules, holds={\"w\"}) == [(date(2026, 1, 6), \"y\"), (date(2026, 1, 12), \"z\")]\n"
    },
    {
     "label": "A category with no rule is an error",
     "type": "assert",
     "code": "from datetime import date\ntry:\n    due([{\"id\": 1, \"category\": \"misc\", \"created\": date(2026, 1, 1)}], {\"logs\": (30, \"created\")}, date(2026, 6, 1))\nexcept KeyError:\n    pass\nelse:\n    raise AssertionError(\"expected KeyError\")\ntry:\n    schedule([{\"id\": 1, \"category\": \"misc\", \"created\": date(2026, 1, 1)}], {\"logs\": (30, \"created\")})\nexcept KeyError:\n    pass\nelse:\n    raise AssertionError(\"expected KeyError from schedule\")\nheld = [{\"id\": 1, \"category\": \"misc\", \"created\": date(2026, 1, 1)}, {\"id\": 2, \"category\": \"logs\", \"created\": date(2026, 1, 1)}]\nassert due(held, {\"logs\": (30, \"created\")}, date(2026, 6, 1), holds={\"misc\"}) == [2]\nassert schedule(held, {\"logs\": (30, \"created\")}, holds={1}) == [(date(2026, 2, 1), 2)]\n"
    }
   ]
  }
 ],
 "et4": [
  {
   "id": "fairness_metrics",
   "title": "Group fairness metrics",
   "prompt": "<p>Labels and predictions are 1 (positive, such as \"approve\" or \"will repay\") or 0. <code>groups[i]</code> is the group of person <em>i</em>. Write:</p>\n<ul>\n<li><code>group_rates(y_true, y_pred, groups)</code>: a dict from each group to a dict with keys <code>\"selection_rate\"</code> (fraction predicted 1), <code>\"tpr\"</code> (true-positive rate, TP/(TP + FN)), <code>\"fpr\"</code> (FP/(FP + TN)) and <code>\"ppv\"</code> (positive predictive value, TP/(TP + FP)). A rate whose denominator is 0 is <code>None</code>.</li>\n<li><code>gap(rates, metric)</code>: the largest value of <code>metric</code> across groups minus the smallest, ignoring <code>None</code>; 0.0 if fewer than two groups have a value.</li>\n<li><code>report(y_true, y_pred, groups)</code>: a dict with <code>\"demographic_parity\"</code> (the selection-rate gap), <code>\"equal_opportunity\"</code> (the TPR gap), <code>\"equalized_odds\"</code> (the larger of the TPR and FPR gaps) and <code>\"predictive_parity\"</code> (the PPV gap).</li>\n</ul>",
   "starter": "def group_rates(y_true, y_pred, groups):\n    pass\n\ndef gap(rates, metric):\n    pass\n\ndef report(y_true, y_pred, groups):\n    pass\n",
   "hint": "<p>Count TP, FP, FN and TN per group in one pass, as in CS 370 Lesson 5's <code>confusion</code>, then divide with a helper that returns <code>None</code> for a zero denominator.</p>",
   "solution": "def _div(a, b):\n    return a / b if b else None\n\ndef group_rates(y_true, y_pred, groups):\n    counts = {}\n    for t, p, g in zip(y_true, y_pred, groups):\n        c = counts.setdefault(g, [0, 0, 0, 0])\n        if t and p: c[0] += 1\n        elif not t and p: c[1] += 1\n        elif t and not p: c[2] += 1\n        else: c[3] += 1\n    out = {}\n    for g, (tp, fp, fn, tn) in counts.items():\n        out[g] = {\"selection_rate\": _div(tp + fp, tp + fp + fn + tn), \"tpr\": _div(tp, tp + fn),\n                  \"fpr\": _div(fp, fp + tn), \"ppv\": _div(tp, tp + fp)}\n    return out\n\ndef gap(rates, metric):\n    vals = [r[metric] for r in rates.values() if r[metric] is not None]\n    return max(vals) - min(vals) if len(vals) >= 2 else 0.0\n\ndef report(y_true, y_pred, groups):\n    r = group_rates(y_true, y_pred, groups)\n    return {\"demographic_parity\": gap(r, \"selection_rate\"), \"equal_opportunity\": gap(r, \"tpr\"),\n            \"equalized_odds\": max(gap(r, \"tpr\"), gap(r, \"fpr\")), \"predictive_parity\": gap(r, \"ppv\")}\n",
   "tests": [
    {
     "label": "The lesson's example",
     "type": "assert",
     "code": "def expand(g, tp, fp, fn, tn):\n    t = [1]*tp + [0]*fp + [1]*fn + [0]*tn\n    p = [1]*tp + [1]*fp + [0]*fn + [0]*tn\n    return t, p, [g]*(tp+fp+fn+tn)\nta, pa, ga = expand(\"A\", 48, 32, 2, 18)\ntb, pb, gb = expand(\"B\", 12, 8, 8, 72)\nr = group_rates(ta + tb, pa + pb, ga + gb)\nassert r[\"A\"] == {\"selection_rate\": 0.8, \"tpr\": 0.96, \"fpr\": 0.64, \"ppv\": 0.6}, r[\"A\"]\nassert r[\"B\"] == {\"selection_rate\": 0.2, \"tpr\": 0.6, \"fpr\": 0.1, \"ppv\": 0.6}, r[\"B\"]\nrep = report(ta + tb, pa + pb, ga + gb)\nassert abs(rep[\"demographic_parity\"] - 0.6) < 1e-9\nassert abs(rep[\"equal_opportunity\"] - 0.36) < 1e-9\nassert abs(rep[\"equalized_odds\"] - 0.54) < 1e-9\nassert abs(rep[\"predictive_parity\"]) < 1e-9\n"
    },
    {
     "label": "Zero denominators give None",
     "type": "assert",
     "code": "r = group_rates([1, 1, 0], [0, 0, 0], [\"x\", \"x\", \"y\"])\nassert r[\"x\"] == {\"selection_rate\": 0.0, \"tpr\": 0.0, \"fpr\": None, \"ppv\": None}, r[\"x\"]\nassert r[\"y\"] == {\"selection_rate\": 0.0, \"tpr\": None, \"fpr\": 0.0, \"ppv\": None}, r[\"y\"]\nassert gap(r, \"ppv\") == 0.0 and gap(r, \"tpr\") == 0.0\n"
    },
    {
     "label": "Three groups",
     "type": "assert",
     "code": "y = [1, 0, 1, 0, 1, 0, 1, 1, 0]\np = [1, 1, 1, 0, 0, 0, 1, 0, 1]\ng = [\"a\", \"a\", \"a\", \"b\", \"b\", \"b\", \"c\", \"c\", \"c\"]\nrep = report(y, p, g)\nassert abs(rep[\"demographic_parity\"] - (1 - 0)) < 1e-9, rep\nassert abs(rep[\"equal_opportunity\"] - 1.0) < 1e-9\nassert abs(rep[\"predictive_parity\"] - 1/6) < 1e-9, rep\n"
    }
   ]
  },
  {
   "id": "four_fifths",
   "title": "The four-fifths rule",
   "prompt": "<p>The U.S. Uniform Guidelines on Employee Selection Procedures (1978) treat a selection rate for any group below four-fifths of the highest group's rate as generally regarded as evidence of adverse impact. New York City's bias-audit rules for automated hiring tools report the same <em>impact ratio</em>. <code>applicants</code> and <code>selected</code> map each group to a count. Write:</p>\n<ul>\n<li><code>impact_ratios(selected, applicants)</code>: a dict from group to its selection rate divided by the highest selection rate. Groups with 0 applicants are left out. Raise <code>ValueError</code> if no group has a positive selection rate (no ratio is defined). A group missing from <code>selected</code> selected 0.</li>\n<li><code>adverse_impact(selected, applicants, threshold=0.8)</code>: a sorted list of groups whose ratio is below <code>threshold</code>.</li>\n<li><code>shortfall(selected, applicants, group, threshold=0.8)</code>: the smallest number of additional people from <code>group</code> who would have to be selected (with everything else unchanged, so the highest rate may change only if <code>group</code> becomes the highest) for its ratio to reach <code>threshold</code>. 0 if it already does.</li>\n</ul>",
   "starter": "def impact_ratios(selected, applicants):\n    pass\n\ndef adverse_impact(selected, applicants, threshold=0.8):\n    pass\n\ndef shortfall(selected, applicants, group, threshold=0.8):\n    pass\n",
   "hint": "<p>For <code>shortfall</code>, try <em>n</em> = 0, 1, 2, ... up to the group's applicants, recomputing the ratios with <code>selected[group] + n</code>. Compare with a little tolerance (<code>ratio >= threshold - 1e-12</code>) so that exactly 0.8 counts.</p>",
   "solution": "def impact_ratios(selected, applicants):\n    rates = {g: selected.get(g, 0) / n for g, n in applicants.items() if n > 0}\n    top = max(rates.values(), default=0)\n    if top <= 0:\n        raise ValueError(\"no group has a positive selection rate\")\n    return {g: r / top for g, r in rates.items()}\n\ndef adverse_impact(selected, applicants, threshold=0.8):\n    r = impact_ratios(selected, applicants)\n    return sorted(g for g, v in r.items() if v < threshold - 1e-12)\n\ndef shortfall(selected, applicants, group, threshold=0.8):\n    for n in range(applicants[group] - selected.get(group, 0) + 1):\n        s = dict(selected)\n        s[group] = selected.get(group, 0) + n\n        try:\n            if impact_ratios(s, applicants)[group] >= threshold - 1e-12:\n                return n\n        except ValueError:\n            continue\n    raise ValueError(\"cannot reach threshold\")\n",
   "tests": [
    {
     "label": "The Guidelines' own example",
     "type": "assert",
     "code": "r = impact_ratios({\"White\": 48, \"Black\": 12}, {\"White\": 80, \"Black\": 40})\nassert abs(r[\"White\"] - 1.0) < 1e-12 and abs(r[\"Black\"] - 0.5) < 1e-12, r\nassert adverse_impact({\"White\": 48, \"Black\": 12}, {\"White\": 80, \"Black\": 40}) == [\"Black\"]\nassert shortfall({\"White\": 48, \"Black\": 12}, {\"White\": 80, \"Black\": 40}, \"Black\") == 8\n"
    },
    {
     "label": "Exactly four-fifths is not adverse impact",
     "type": "assert",
     "code": "assert adverse_impact({\"a\": 50, \"b\": 40}, {\"a\": 100, \"b\": 100}) == []\nassert shortfall({\"a\": 50, \"b\": 40}, {\"a\": 100, \"b\": 100}, \"b\") == 0\nassert adverse_impact({\"a\": 50, \"b\": 39}, {\"a\": 100, \"b\": 100}) == [\"b\"]\n"
    },
    {
     "label": "Several groups, missing and empty groups",
     "type": "assert",
     "code": "app = {\"a\": 200, \"b\": 100, \"c\": 50, \"d\": 0}\nsel = {\"a\": 60, \"b\": 20}\nr = impact_ratios(sel, app)\nassert set(r) == {\"a\", \"b\", \"c\"}, r\nassert abs(r[\"b\"] - 2/3) < 1e-12 and r[\"c\"] == 0\nassert adverse_impact(sel, app) == [\"b\", \"c\"]\nassert shortfall(sel, app, \"c\") == 12\nassert adverse_impact(sel, app, threshold=0.5) == [\"c\"]\n"
    },
    {
     "label": "No one selected",
     "type": "raises",
     "call": "impact_ratios({}, {'a': 10, 'b': 5})",
     "error": "ValueError"
    },
    {
     "label": "Becoming the top group",
     "type": "assert",
     "hidden": true,
     "code": "assert shortfall({\"a\": 1}, {\"a\": 10, \"b\": 2}, \"b\") == 1\n"
    }
   ]
  }
 ],
 "et5": [
  {
   "id": "fault_tree",
   "title": "Fault trees and cut sets",
   "prompt": "<p>A fault tree is a basic event name (a string) or a tuple <code>(\"AND\", [children])</code> or <code>(\"OR\", [children])</code>. <code>p</code> maps each basic event to its probability. Write:</p>\n<ul>\n<li><code>naive_probability(tree, p)</code>: the top event's probability computed bottom-up as if all children were independent: AND multiplies, OR gives 1 − ∏(1 − p<sub>child</sub>).</li>\n<li><code>cut_sets(tree)</code>: the <em>minimal cut sets</em>, the smallest sets of basic events whose joint failure causes the top event, as a sorted list of sorted tuples. A set that contains another cut set is not minimal and is left out.</li>\n<li><code>exact_probability(tree, p)</code>: the true probability when the <em>basic events</em> are independent, found by summing over all 2<sup><em>n</em></sup> combinations of the <em>n</em> distinct basic events (at most 16). It differs from the naive answer when an event appears in more than one branch.</li>\n</ul>",
   "starter": "def naive_probability(tree, p):\n    pass\n\ndef cut_sets(tree):\n    pass\n\ndef exact_probability(tree, p):\n    pass\n",
   "hint": "<p>For cut sets: an event gives <code>{frozenset([e])}</code>; OR takes the union of its children's sets; AND combines one set from each child with <code>|</code>. Then drop any set that is a proper superset of another. For the exact answer, write <code>occurs(tree, failed)</code> that evaluates the tree for a set of failed events, and loop over <code>itertools.product([False, True], repeat=n)</code>.</p>",
   "solution": "import itertools, math\n\ndef naive_probability(tree, p):\n    if isinstance(tree, str):\n        return p[tree]\n    op, kids = tree\n    vals = [naive_probability(k, p) for k in kids]\n    if op == \"AND\":\n        return math.prod(vals)\n    return 1 - math.prod(1 - v for v in vals)\n\ndef _cuts(tree):\n    if isinstance(tree, str):\n        return {frozenset([tree])}\n    op, kids = tree\n    sets = [_cuts(k) for k in kids]\n    if op == \"OR\":\n        return set().union(*sets)\n    acc = {frozenset()}\n    for s in sets:\n        acc = {a | b for a in acc for b in s}\n    return acc\n\ndef cut_sets(tree):\n    c = _cuts(tree)\n    minimal = [s for s in c if not any(o < s for o in c)]\n    return sorted(tuple(sorted(s)) for s in minimal)\n\ndef _events(tree, out):\n    if isinstance(tree, str):\n        out.add(tree)\n    else:\n        for k in tree[1]:\n            _events(k, out)\n    return out\n\ndef _occurs(tree, failed):\n    if isinstance(tree, str):\n        return tree in failed\n    op, kids = tree\n    r = [_occurs(k, failed) for k in kids]\n    return all(r) if op == \"AND\" else any(r)\n\ndef exact_probability(tree, p):\n    ev = sorted(_events(tree, set()))\n    total = 0.0\n    for bits in itertools.product([False, True], repeat=len(ev)):\n        failed = {e for e, b in zip(ev, bits) if b}\n        if _occurs(tree, failed):\n            total += math.prod(p[e] if b else 1 - p[e] for e, b in zip(ev, bits))\n    return total\n",
   "tests": [
    {
     "label": "Independent branches",
     "type": "assert",
     "code": "t = (\"OR\", [(\"AND\", [\"pump A\", \"pump B\"]), \"valve\"])\np = {\"pump A\": 0.01, \"pump B\": 0.02, \"valve\": 0.001}\nassert abs(naive_probability(t, p) - (1 - (1 - 0.0002) * (1 - 0.001))) < 1e-12\nassert abs(exact_probability(t, p) - naive_probability(t, p)) < 1e-12\nassert cut_sets(t) == [(\"pump A\", \"pump B\"), (\"valve\",)], cut_sets(t)\n"
    },
    {
     "label": "A shared power supply",
     "type": "assert",
     "code": "t = (\"AND\", [(\"OR\", [\"sensor 1\", \"power\"]), (\"OR\", [\"sensor 2\", \"power\"])])\np = {\"sensor 1\": 0.01, \"sensor 2\": 0.01, \"power\": 0.001}\nassert cut_sets(t) == [(\"power\",), (\"sensor 1\", \"sensor 2\")], cut_sets(t)\nnaive = naive_probability(t, p)\nexact = exact_probability(t, p)\nassert abs(naive - (1 - 0.99 * 0.999) ** 2) < 1e-12, naive\nassert abs(exact - (0.001 + 0.999 * 0.0001)) < 1e-12, exact\nassert exact > 8 * naive\n"
    },
    {
     "label": "Minimality",
     "type": "assert",
     "code": "t = (\"OR\", [\"a\", (\"AND\", [\"a\", \"b\"]), (\"AND\", [\"b\", \"c\", \"d\"]), (\"AND\", [\"b\", \"c\"])])\nassert cut_sets(t) == [(\"a\",), (\"b\", \"c\")], cut_sets(t)\nassert cut_sets(\"x\") == [(\"x\",)]\n"
    },
    {
     "label": "Exact by enumeration",
     "type": "assert",
     "hidden": true,
     "code": "t = (\"OR\", [(\"AND\", [\"a\", \"b\"]), (\"AND\", [\"b\", \"c\"])])\np = {\"a\": 0.5, \"b\": 0.5, \"c\": 0.5}\nassert abs(exact_probability(t, p) - 0.375) < 1e-12\nassert abs(naive_probability(t, p) - 0.4375) < 1e-12\n"
    }
   ]
  },
  {
   "id": "voter",
   "title": "A redundant sensor voter",
   "prompt": "<p>A flight-control function should not trust a single sensor. Write <code>vote(samples, tol, persist)</code> for three redundant sensors (indexes 0, 1, 2). <code>samples</code> is a list of 3-tuples of readings, one per time step. The voter keeps a set of sensors declared failed, initially empty, and at each step:</p>\n<ol>\n<li>Considers the healthy sensors (not yet failed).</li>\n<li>With three healthy sensors: the output is their median. A sensor whose reading differs from the median by more than <code>tol</code> gets a strike; otherwise its strikes reset to 0. A sensor with <code>persist</code> consecutive strikes is declared failed from that step on (its reading is still used for this step's median).</li>\n<li>With two healthy sensors: if their readings differ by at most <code>tol</code>, the output is their mean. Otherwise the voter can't tell which is wrong, so the output is <code>None</code> (the function using it disengages) for this step.</li>\n<li>With one healthy sensor: the output is <code>None</code>. One sensor can't be checked.</li>\n</ol>\n<p>Return <code>(outputs, failed)</code>: the list of outputs and the sorted list of failed sensors at the end.</p>",
   "starter": "def vote(samples, tol, persist):\n    pass\n",
   "hint": "<p>Keep <code>strikes = [0, 0, 0]</code> and <code>failed = set()</code>. <code>sorted(readings)[1]</code> is the median of three.</p>",
   "solution": "def vote(samples, tol, persist):\n    failed = set()\n    strikes = [0, 0, 0]\n    out = []\n    for s in samples:\n        healthy = [i for i in range(3) if i not in failed]\n        if len(healthy) == 3:\n            med = sorted(s)[1]\n            out.append(med)\n            for i in range(3):\n                if abs(s[i] - med) > tol:\n                    strikes[i] += 1\n                    if strikes[i] >= persist:\n                        failed.add(i)\n                else:\n                    strikes[i] = 0\n        elif len(healthy) == 2:\n            a, b = (s[i] for i in healthy)\n            out.append((a + b) / 2 if abs(a - b) <= tol else None)\n        else:\n            out.append(None)\n    return out, sorted(failed)\n",
   "tests": [
    {
     "label": "Agreeing sensors",
     "type": "assert",
     "code": "out, failed = vote([(5.0, 5.2, 4.9), (6.0, 6.1, 6.0)], 1.0, 2)\nassert out == [5.0, 6.0] and failed == [], (out, failed)\n"
    },
    {
     "label": "One sensor stuck high is outvoted, then removed",
     "type": "assert",
     "code": "s = [(5, 5, 20), (5, 6, 21), (6, 6, 22), (6, 7, 22), (7, 7, 30)]\nout, failed = vote(s, 2, 3)\nassert out == [5, 6, 6, 6.5, 7.0], out\nassert failed == [2]\n"
    },
    {
     "label": "A transient glitch resets",
     "type": "assert",
     "code": "s = [(5, 5, 20), (5, 5, 20), (5, 5, 5), (5, 5, 20), (5, 5, 20)]\nout, failed = vote(s, 1, 3)\nassert failed == [] and out == [5] * 5, (out, failed)\n"
    },
    {
     "label": "Two left that disagree: disengage",
     "type": "assert",
     "code": "s = [(1, 1, 50), (1, 1, 50), (1, 9, 50), (2, 2, 50), (0, 30, 1)]\nout, failed = vote(s, 2, 2)\nassert failed == [2], failed\nassert out == [1, 1, None, 2.0, None], out\n"
    },
    {
     "label": "Down to one sensor",
     "type": "assert",
     "hidden": true,
     "code": "s = [(0, 10, 20), (0, 10, 20), (0, 10, 20)]\nout, failed = vote(s, 1, 1)\nassert failed == [0, 2] and out == [10, None, None], (out, failed)\n"
    }
   ]
  }
 ],
 "et6": [
  {
   "id": "bounty_scope",
   "title": "Staying inside a bug bounty's scope",
   "prompt": "<p>Authorization is what separates a security test from unauthorized access (Lesson 6), and a bug bounty's scope is that authorization in writing. A policy is a dict with lists <code>\"in\"</code> and <code>\"out\"</code> of patterns, and a list <code>\"forbidden\"</code> of activity names (such as <code>\"dos\"</code>). A pattern is one of:</p>\n<ul>\n<li>an exact host name, such as <code>\"api.example.com\"</code>;</li>\n<li>a wildcard <code>\"*.example.com\"</code>, which matches any host ending in <code>.example.com</code> at any depth (<code>a.b.example.com</code>) but not <code>example.com</code> itself;</li>\n<li>a network in CIDR notation, such as <code>\"203.0.113.0/24\"</code>, which matches IP addresses in it (the first 24 bits fixed, so 203.0.113.0 to 203.0.113.255);</li>\n<li>a single IP address, such as <code>\"203.0.113.7\"</code>, which is a network of one address (<code>ipaddress.ip_network</code> reads it as <code>203.0.113.7/32</code>) and matches only that address.</li>\n</ul>\n<p>The standard <code>ipaddress</code> module does the address arithmetic. <code>ipaddress.ip_address(s)</code> turns a string such as <code>\"203.0.113.7\"</code> (or an IPv6 address) into an address object, and raises <code>ValueError</code> if <code>s</code> isn't an address; <code>ipaddress.ip_network(s)</code> turns <code>\"203.0.113.0/24\"</code> into a network object; and <code>addr in net</code> is True if the address lies in the network (an IPv6 address is never in an IPv4 network, and the test then is simply False):</p>\n<pre>ipaddress.ip_address(\"203.0.113.7\") in ipaddress.ip_network(\"203.0.113.0/24\")   # True\nipaddress.ip_address(\"api.example.com\")   # raises ValueError</pre>\n<p>Host names compare case-insensitively and ignore one trailing dot. A host name never matches a network pattern, and an IP address matches only network patterns. Write:</p>\n<ul>\n<li><code>in_scope(target, policy)</code>: True if some <code>\"in\"</code> pattern matches and no <code>\"out\"</code> pattern does. Exclusions win.</li>\n<li><code>audit(log, policy)</code>: <code>log</code> is a list of <code>(target, activity)</code> pairs. Return a list of <code>(index, reason)</code> for each entry that breaks the policy, in log order, where reason is <code>\"excluded\"</code> (an out pattern matches, whether or not an in pattern does), <code>\"not listed\"</code> (no out pattern matches and no in pattern matches) or <code>\"forbidden activity\"</code>. A target problem is reported before an activity problem, and each entry gets at most one reason.</li>\n</ul>",
   "starter": "import ipaddress\n\ndef in_scope(target, policy):\n    pass\n\ndef audit(log, policy):\n    pass\n",
   "hint": "<p>Decide first whether the target is an IP address: <code>ipaddress.ip_address(t)</code> raises <code>ValueError</code> for a host name. A pattern is a network if it contains <code>/</code> or is itself an IP address.</p>",
   "solution": "import ipaddress\n\ndef _ip(t):\n    try:\n        return ipaddress.ip_address(t)\n    except ValueError:\n        return None\n\ndef _norm(h):\n    h = h.lower()\n    return h[:-1] if h.endswith(\".\") else h\n\ndef _match(target, pat):\n    ip = _ip(target)\n    if \"/\" in pat or _ip(pat) is not None:\n        return ip is not None and ip.version == ipaddress.ip_network(pat, strict=False).version and ip in ipaddress.ip_network(pat, strict=False)\n    if ip is not None:\n        return False\n    t, p = _norm(target), _norm(pat)\n    if p.startswith(\"*.\"):\n        return t.endswith(p[1:])\n    return t == p\n\ndef _target_problem(target, policy):\n    if any(_match(target, p) for p in policy.get(\"out\", [])):\n        return \"excluded\"\n    if not any(_match(target, p) for p in policy.get(\"in\", [])):\n        return \"not listed\"\n    return None\n\ndef in_scope(target, policy):\n    return _target_problem(target, policy) is None\n\ndef audit(log, policy):\n    out = []\n    for i, (target, activity) in enumerate(log):\n        r = _target_problem(target, policy)\n        if r is None and activity in policy.get(\"forbidden\", []):\n            r = \"forbidden activity\"\n        if r:\n            out.append((i, r))\n    return out\n",
   "tests": [
    {
     "label": "Hosts and wildcards",
     "type": "assert",
     "code": "pol = {\"in\": [\"*.example.com\", \"example.com\"], \"out\": [\"payments.example.com\", \"*.corp.example.com\"], \"forbidden\": []}\nassert in_scope(\"www.example.com\", pol)\nassert in_scope(\"a.b.example.com\", pol)\nassert in_scope(\"Example.COM.\", pol)\nassert not in_scope(\"payments.example.com\", pol)\nassert not in_scope(\"vpn.corp.example.com\", pol)\nassert not in_scope(\"example.org\", pol)\nassert not in_scope(\"badexample.com\", pol)\n"
    },
    {
     "label": "Wildcards don't match the apex",
     "type": "assert",
     "code": "pol = {\"in\": [\"*.example.com\"], \"out\": []}\nassert not in_scope(\"example.com\", pol)\nassert in_scope(\"x.example.com\", pol)\n"
    },
    {
     "label": "Networks",
     "type": "assert",
     "code": "pol = {\"in\": [\"203.0.113.0/24\", \"2001:db8::/32\"], \"out\": [\"203.0.113.128/25\"], \"forbidden\": []}\nassert in_scope(\"203.0.113.5\", pol)\nassert not in_scope(\"203.0.113.200\", pol)\nassert not in_scope(\"198.51.100.1\", pol)\nassert in_scope(\"2001:db8::1\", pol)\nassert not in_scope(\"203.0.113.example.com\", pol)\n"
    },
    {
     "label": "A single address as a pattern",
     "type": "assert",
     "code": "pol = {\"in\": [\"203.0.113.0/24\", \"198.51.100.7\", \"*.example.com\"], \"out\": [\"203.0.113.9\"], \"forbidden\": []}\nassert in_scope(\"198.51.100.7\", pol)\nassert not in_scope(\"198.51.100.8\", pol)\nassert not in_scope(\"203.0.113.9\", pol)\nassert in_scope(\"203.0.113.10\", pol)\nassert not in_scope(\"198.51.100.7.example\", pol)\n"
    },
    {
     "label": "Auditing a test log",
     "type": "assert",
     "code": "pol = {\"in\": [\"*.example.com\"], \"out\": [\"sso.example.com\"], \"forbidden\": [\"dos\", \"social engineering\"]}\nlog = [(\"app.example.com\", \"xss\"), (\"sso.example.com\", \"dos\"), (\"example.net\", \"sqli\"),\n       (\"api.example.com\", \"dos\"), (\"api.example.com\", \"idor\")]\nassert audit(log, pol) == [(1, \"excluded\"), (2, \"not listed\"), (3, \"forbidden activity\")], audit(log, pol)\nassert audit([], pol) == []\npol2 = {\"in\": [\"*.example.com\"], \"out\": [\"*.example.net\"], \"forbidden\": [\"dos\"]}\nassert audit([(\"x.example.net\", \"dos\")], pol2) == [(0, \"excluded\")]\n"
    }
   ]
  },
  {
   "id": "disclosure",
   "title": "A coordinated-disclosure clock",
   "prompt": "<p>Google Project Zero's policy (CS 380 Lesson 8) gives a vendor 90 days from the report to ship a fix. If the fix ships within the 90 days, technical details are published 30 days after the fix; if not, they are published when the 90 days end. (The real policy also has a 14-day grace period on request, ignored here.) Dates are <code>datetime.date</code> objects. Write:</p>\n<ul>\n<li><code>deadline(reported)</code>: the report date plus 90 days.</li>\n<li><code>publish_on(reported, fixed=None)</code>: the day details are published, under the rule above. A fix on the deadline day itself counts as within the 90 days.</li>\n<li><code>status(reported, fixed, today)</code>: <code>\"open\"</code> (no fix by <code>today</code> and not yet published), <code>\"fixed, details embargoed\"</code> (fixed on or before today, not yet published), or <code>\"public\"</code> (today is on or after the publication date). A <code>fixed</code> date after <code>today</code> is not yet known: treat it as no fix.</li>\n<li><code>overdue(reports, today)</code>: <code>reports</code> maps ids to <code>(reported, fixed)</code>; return the sorted ids that had no fix by their deadline and whose deadline is on or before <code>today</code>.</li>\n</ul>",
   "starter": "from datetime import date, timedelta\n\ndef deadline(reported):\n    pass\n\ndef publish_on(reported, fixed=None):\n    pass\n\ndef status(reported, fixed, today):\n    pass\n\ndef overdue(reports, today):\n    pass\n",
   "hint": "<p>In <code>status</code>, first set <code>fixed = None</code> if it's after <code>today</code>, then compare <code>today</code> with <code>publish_on(reported, fixed)</code>.</p>",
   "solution": "from datetime import date, timedelta\n\ndef deadline(reported):\n    return reported + timedelta(days=90)\n\ndef publish_on(reported, fixed=None):\n    d = deadline(reported)\n    if fixed is not None and fixed <= d:\n        return fixed + timedelta(days=30)\n    return d\n\ndef status(reported, fixed, today):\n    if fixed is not None and fixed > today:\n        fixed = None\n    if today >= publish_on(reported, fixed):\n        return \"public\"\n    return \"fixed, details embargoed\" if fixed is not None else \"open\"\n\ndef overdue(reports, today):\n    out = []\n    for i, (r, f) in reports.items():\n        d = deadline(r)\n        if d <= today and (f is None or f > d):\n            out.append(i)\n    return sorted(out)\n",
   "tests": [
    {
     "label": "Deadlines",
     "type": "assert",
     "code": "from datetime import date\nassert deadline(date(2026, 1, 1)) == date(2026, 4, 1)\nassert publish_on(date(2026, 1, 1)) == date(2026, 4, 1)\nassert publish_on(date(2026, 1, 1), date(2026, 2, 10)) == date(2026, 3, 12)\nassert publish_on(date(2026, 1, 1), date(2026, 4, 1)) == date(2026, 5, 1)\nassert publish_on(date(2026, 1, 1), date(2026, 4, 2)) == date(2026, 4, 1)\n"
    },
    {
     "label": "Status over time",
     "type": "assert",
     "code": "from datetime import date\nr, f = date(2026, 1, 1), date(2026, 2, 10)\nassert status(r, f, date(2026, 1, 20)) == \"open\"\nassert status(r, f, date(2026, 2, 10)) == \"fixed, details embargoed\"\nassert status(r, f, date(2026, 3, 11)) == \"fixed, details embargoed\"\nassert status(r, f, date(2026, 3, 12)) == \"public\"\nassert status(r, None, date(2026, 3, 31)) == \"open\"\nassert status(r, None, date(2026, 4, 1)) == \"public\"\n"
    },
    {
     "label": "Overdue reports",
     "type": "assert",
     "code": "from datetime import date\nreports = {\"A\": (date(2026, 1, 1), None), \"B\": (date(2026, 1, 1), date(2026, 3, 1)),\n           \"C\": (date(2026, 1, 1), date(2026, 5, 1)), \"D\": (date(2026, 3, 1), None)}\nassert overdue(reports, date(2026, 4, 1)) == [\"A\", \"C\"], overdue(reports, date(2026, 4, 1))\nassert overdue(reports, date(2026, 3, 31)) == []\nassert overdue(reports, date(2026, 6, 1)) == [\"A\", \"C\", \"D\"]\n"
    }
   ]
  }
 ],
 "et7": [
  {
   "id": "mod_threshold",
   "title": "Choosing a moderation threshold",
   "prompt": "<p>A classifier gives each post a score; posts with score ≥ <em>t</em> are removed. <code>labels[i]</code> is 1 if post <em>i</em> really violates the policy. Write:</p>\n<ul>\n<li><code>precision_recall(scores, labels, t)</code>: <code>(precision, recall)</code> at threshold <em>t</em>; precision is 1.0 when nothing is removed, and recall is 1.0 when nothing violates.</li>\n<li><code>best_threshold(scores, labels, min_precision)</code>: among the distinct score values used as thresholds, the one with the highest recall whose precision is at least <code>min_precision</code>; break ties in recall by the higher threshold (fewer removals). Return <code>None</code> if none qualifies.</li>\n<li><code>daily_errors(volume, prevalence, precision, recall)</code>: the expected <code>(wrong_removals, missed)</code> per day for <code>volume</code> posts of which a fraction <code>prevalence</code> violate: TP = volume × prevalence × recall, wrong removals FP = TP × (1 − precision)/precision, missed FN = volume × prevalence × (1 − recall). If precision is 0, raise <code>ValueError</code>.</li>\n</ul>",
   "starter": "def precision_recall(scores, labels, t):\n    pass\n\ndef best_threshold(scores, labels, min_precision):\n    pass\n\ndef daily_errors(volume, prevalence, precision, recall):\n    pass\n",
   "hint": "<p>Loop over <code>sorted(set(scores), reverse=True)</code>: recall never decreases as the threshold falls, so you can keep the best so far. Compare precision with a small tolerance.</p>",
   "solution": "def precision_recall(scores, labels, t):\n    tp = sum(1 for s, y in zip(scores, labels) if s >= t and y)\n    fp = sum(1 for s, y in zip(scores, labels) if s >= t and not y)\n    pos = sum(1 for y in labels if y)\n    precision = tp / (tp + fp) if tp + fp else 1.0\n    recall = tp / pos if pos else 1.0\n    return precision, recall\n\ndef best_threshold(scores, labels, min_precision):\n    best = None\n    best_r = -1\n    for t in sorted(set(scores), reverse=True):\n        p, r = precision_recall(scores, labels, t)\n        if p >= min_precision - 1e-12 and r > best_r + 1e-12:\n            best, best_r = t, r\n    return best\n\ndef daily_errors(volume, prevalence, precision, recall):\n    if precision == 0:\n        raise ValueError(\"precision 0\")\n    tp = volume * prevalence * recall\n    return tp * (1 - precision) / precision, volume * prevalence * (1 - recall)\n",
   "tests": [
    {
     "label": "Precision and recall",
     "type": "assert",
     "code": "s = [0.95, 0.9, 0.8, 0.7, 0.6, 0.4, 0.3, 0.1]\ny = [1, 1, 0, 1, 0, 1, 0, 0]\nassert precision_recall(s, y, 0.85) == (1.0, 0.5)\np, r = precision_recall(s, y, 0.7)\nassert abs(p - 0.75) < 1e-12 and r == 0.75\nassert precision_recall(s, y, 0.99) == (1.0, 0.0)\nassert precision_recall(s, [0] * 8, 0.5)[1] == 1.0\n"
    },
    {
     "label": "Best threshold",
     "type": "assert",
     "code": "s = [0.95, 0.9, 0.8, 0.7, 0.6, 0.4, 0.3, 0.1]\ny = [1, 1, 0, 1, 0, 1, 0, 0]\nassert best_threshold(s, y, 0.9) == 0.9, best_threshold(s, y, 0.9)\nassert best_threshold(s, y, 0.75) == 0.7\nassert best_threshold(s, y, 0.6) == 0.4, best_threshold(s, y, 0.6)\nassert best_threshold(s, y, 0.0) == 0.4\nassert best_threshold([0.5, 0.6], [0, 0], 0.5) is None\n"
    },
    {
     "label": "Errors at scale",
     "type": "assert",
     "code": "fp, fn = daily_errors(1_000_000_000, 0.001, 0.9, 0.8)\nassert abs(fp - 88888.8888888889) < 1e-3 and abs(fn - 200000) < 1e-6, (fp, fn)\nfp, fn = daily_errors(1000, 0.5, 1.0, 1.0)\nassert fp == 0 and fn == 0\n"
    },
    {
     "label": "Precision 0",
     "type": "raises",
     "call": "daily_errors(10, 0.1, 0, 0.5)",
     "error": "ValueError"
    }
   ]
  },
  {
   "id": "phash",
   "title": "Matching known images with a perceptual hash",
   "prompt": "<p>Platforms find copies of known illegal images by comparing <em>perceptual hashes</em>, which change little when an image is resized or slightly altered (unlike SHA-256). Implement the simple <em>average hash</em>. An image is a list of rows of grayscale values 0–255; its height and width are multiples of 8.</p>\n<ul>\n<li><code>ahash(img)</code>: shrink the image to 8 × 8 by averaging each block of (height/8) × (width/8) pixels; let <em>m</em> be the mean of the 64 block averages; bit <em>i</em> (row-major, block (0, 0) first, as the most significant of 64 bits) is 1 if block <em>i</em>'s average is greater than <em>m</em>. Return the 64-bit integer.</li>\n<li><code>hamming(a, b)</code>: the number of bits that differ.</li>\n<li><code>matches(img, known, max_distance)</code>: <code>known</code> maps ids to hashes; return a sorted list of <code>(distance, id)</code> for those within <code>max_distance</code> of the image's hash.</li>\n</ul>",
   "starter": "def ahash(img):\n    pass\n\ndef hamming(a, b):\n    pass\n\ndef matches(img, known, max_distance):\n    pass\n",
   "hint": "<p><code>bin(a ^ b).count(\"1\")</code> counts differing bits. Build the hash with <code>h = (h &lt;&lt; 1) | bit</code> over the 64 blocks in order.</p>",
   "solution": "def ahash(img):\n    H, W = len(img), len(img[0])\n    bh, bw = H // 8, W // 8\n    blocks = []\n    for by in range(8):\n        for bx in range(8):\n            s = sum(img[y][x] for y in range(by * bh, (by + 1) * bh) for x in range(bx * bw, (bx + 1) * bw))\n            blocks.append(s / (bh * bw))\n    m = sum(blocks) / 64\n    h = 0\n    for b in blocks:\n        h = (h << 1) | (1 if b > m else 0)\n    return h\n\ndef hamming(a, b):\n    return bin(a ^ b).count(\"1\")\n\ndef matches(img, known, max_distance):\n    h = ahash(img)\n    return sorted((hamming(h, k), i) for i, k in known.items() if hamming(h, k) <= max_distance)\n",
   "tests": [
    {
     "label": "Left half dark, right half bright",
     "type": "assert",
     "code": "img = [[0] * 4 + [255] * 4 for _ in range(8)]\nassert ahash(img) == int(\"00001111\" * 8, 2), hex(ahash(img))\nassert hamming(0b1011, 0b0110) == 3\n"
    },
    {
     "label": "Resizing and brightening keep the hash",
     "type": "assert",
     "code": "import random\nrng = random.Random(4)\nsmall = [[rng.randrange(256) for _ in range(8)] for _ in range(8)]\nbig = [[small[y // 4][x // 4] for x in range(32)] for y in range(32)]\nassert ahash(big) == ahash(small)\ndim = [[v // 2 + 10 for v in row] for row in small]\nassert hamming(ahash(dim), ahash(small)) <= 2\n"
    },
    {
     "label": "Matching a database",
     "type": "assert",
     "code": "img = [[(x * 32 + y * 8) % 256 for x in range(16)] for y in range(16)]\nh = ahash(img)\nknown = {\"k1\": h, \"k2\": h ^ 0b111, \"k3\": h ^ ((1 << 64) - 1), \"k4\": h ^ (1 << 63)}\nassert matches(img, known, 3) == [(0, \"k1\"), (1, \"k4\"), (3, \"k2\")], matches(img, known, 3)\nassert matches(img, known, 0) == [(0, \"k1\")]\n"
    },
    {
     "label": "Flipping the image changes the hash",
     "type": "assert",
     "hidden": true,
     "code": "img = [[0] * 4 + [255] * 4 for _ in range(8)]\nflip = [row[::-1] for row in img]\nassert hamming(ahash(img), ahash(flip)) == 64\n"
    }
   ]
  }
 ],
 "et8": [
  {
   "id": "ai_act_tier",
   "title": "Sorting AI systems into the AI Act's tiers",
   "prompt": "<p>Implement Lesson 8's simplified model of the EU AI Act's risk tiers, as amended in 2026. It leaves out many details (exceptions inside Article 5, general-purpose models, the full Annex III wording), so it is a study aid, not a compliance tool. A system is a dict that may have these keys (missing keys mean no, or none):</p>\n<ul>\n<li><code>\"practice\"</code>: a string naming a practice; those in <code>PROHIBITED</code> are banned. The starter defines three sets of strings: <code>PROHIBITED</code>, the names of the banned practices in Lesson 8's list (such as <code>\"social scoring\"</code> and <code>\"emotion recognition at work or school\"</code>); <code>NEW_BANS</code>, the two practices banned by the 2026 amendment (<code>\"non-consensual intimate deepfakes\"</code> and <code>\"child sexual abuse material\"</code>), which are also in <code>PROHIBITED</code>; and <code>ANNEX_III</code>, the Annex III area names (such as <code>\"education\"</code> and <code>\"employment\"</code>).</li>\n<li><code>\"safety_component\"</code>: True if it is a safety component of a product covered by the EU product laws in Annex I (machinery, medical devices, toys, ...).</li>\n<li><code>\"area\"</code>: an Annex III area, one of <code>ANNEX_III</code>.</li>\n<li><code>\"narrow_task\"</code>: True if it only does a narrow procedural or preparatory task (the Article 6(3) exception); <code>\"profiling\"</code>: True if it profiles people, which cancels that exception.</li>\n<li><code>\"interacts\"</code> (talks with people, like a chatbot), <code>\"generates\"</code> (makes synthetic text, images, audio or video), <code>\"deepfake\"</code>: Article 50 transparency triggers.</li>\n</ul>\n<p>Write <code>tier(system)</code>, returning the first that applies: <code>\"prohibited\"</code>; <code>\"high-risk\"</code> (a safety component, or an Annex III area unless narrow_task is true and profiling is not); <code>\"transparency\"</code> (any Article 50 trigger); otherwise <code>\"minimal\"</code>. Then write <code>applies_from(system)</code>, the date the main obligations for its tier apply: <code>NEW_BANS</code> practices from 2 December 2026 and other bans from 2 February 2025; Annex I safety components from 2 August 2028, even if they are also in an Annex III area; other high-risk (Annex III) systems from 2 December 2027; transparency from 2 August 2026 (the model leaves out the one later date in Lesson 8's table, 2 December 2026 for marking the output of generative systems already on the market before 2 August 2026, so it fits systems placed on the market from 2 August 2026 on); <code>None</code> for minimal risk. Return dates as <code>datetime.date</code> objects, such as <code>date(2026, 8, 2)</code> (the starter imports <code>date</code>).</p>",
   "starter": "from datetime import date\n\nPROHIBITED = {\n    \"social scoring\", \"manipulation\", \"exploiting vulnerabilities\", \"predictive policing by profiling\",\n    \"untargeted face scraping\", \"emotion recognition at work or school\", \"biometric categorisation of sensitive traits\",\n    \"real-time remote biometric identification for policing\",\n    \"non-consensual intimate deepfakes\", \"child sexual abuse material\",\n}\nNEW_BANS = {\"non-consensual intimate deepfakes\", \"child sexual abuse material\"}\nANNEX_III = {\n    \"biometrics\", \"critical infrastructure\", \"education\", \"employment\", \"essential services\",\n    \"law enforcement\", \"migration and border control\", \"justice and democracy\",\n}\n\ndef tier(system):\n    pass\n\ndef applies_from(system):\n    pass\n",
   "hint": "<p>Use <code>system.get(\"area\") in ANNEX_III</code> and <code>system.get(\"narrow_task\") and not system.get(\"profiling\")</code>. In <code>applies_from</code>, call <code>tier</code> first and then pick the date.</p>",
   "solution": "from datetime import date\n\nPROHIBITED = {\n    \"social scoring\", \"manipulation\", \"exploiting vulnerabilities\", \"predictive policing by profiling\",\n    \"untargeted face scraping\", \"emotion recognition at work or school\", \"biometric categorisation of sensitive traits\",\n    \"real-time remote biometric identification for policing\",\n    \"non-consensual intimate deepfakes\", \"child sexual abuse material\",\n}\nNEW_BANS = {\"non-consensual intimate deepfakes\", \"child sexual abuse material\"}\nANNEX_III = {\n    \"biometrics\", \"critical infrastructure\", \"education\", \"employment\", \"essential services\",\n    \"law enforcement\", \"migration and border control\", \"justice and democracy\",\n}\n\ndef _annex3(s):\n    return s.get(\"area\") in ANNEX_III and not (s.get(\"narrow_task\") and not s.get(\"profiling\"))\n\ndef tier(system):\n    if system.get(\"practice\") in PROHIBITED:\n        return \"prohibited\"\n    if system.get(\"safety_component\") or _annex3(system):\n        return \"high-risk\"\n    if system.get(\"interacts\") or system.get(\"generates\") or system.get(\"deepfake\"):\n        return \"transparency\"\n    return \"minimal\"\n\ndef applies_from(system):\n    t = tier(system)\n    if t == \"prohibited\":\n        return date(2026, 12, 2) if system[\"practice\"] in NEW_BANS else date(2025, 2, 2)\n    if t == \"high-risk\":\n        return date(2028, 8, 2) if system.get(\"safety_component\") else date(2027, 12, 2)\n    if t == \"transparency\":\n        return date(2026, 8, 2)\n    return None\n",
   "tests": [
    {
     "label": "The four tiers",
     "type": "assert",
     "code": "assert tier({\"practice\": \"social scoring\"}) == \"prohibited\"\nassert tier({\"area\": \"employment\"}) == \"high-risk\"\nassert tier({\"interacts\": True}) == \"transparency\"\nassert tier({}) == \"minimal\"\nassert tier({\"practice\": \"spam filtering\"}) == \"minimal\"\n"
    },
    {
     "label": "The Article 6(3) exception and profiling",
     "type": "assert",
     "code": "assert tier({\"area\": \"education\", \"narrow_task\": True}) == \"minimal\"\nassert tier({\"area\": \"education\", \"narrow_task\": True, \"interacts\": True}) == \"transparency\"\nassert tier({\"area\": \"education\", \"narrow_task\": True, \"profiling\": True}) == \"high-risk\"\nassert tier({\"area\": \"marketing\", \"profiling\": True}) == \"minimal\"\n"
    },
    {
     "label": "Precedence",
     "type": "assert",
     "code": "assert tier({\"practice\": \"emotion recognition at work or school\", \"area\": \"employment\", \"interacts\": True}) == \"prohibited\"\nassert tier({\"safety_component\": True, \"generates\": True}) == \"high-risk\"\n"
    },
    {
     "label": "Dates after the 2026 amendment",
     "type": "assert",
     "code": "from datetime import date\nassert applies_from({\"practice\": \"untargeted face scraping\"}) == date(2025, 2, 2)\nassert applies_from({\"practice\": \"non-consensual intimate deepfakes\"}) == date(2026, 12, 2)\nassert applies_from({\"area\": \"essential services\"}) == date(2027, 12, 2)\nassert applies_from({\"safety_component\": True, \"area\": \"biometrics\"}) == date(2028, 8, 2)\nassert applies_from({\"deepfake\": True}) == date(2026, 8, 2)\nassert applies_from({}) is None\n"
    }
   ]
  },
  {
   "id": "a11y_audit",
   "title": "An accessibility audit of HTML",
   "prompt": "<p>Automated checkers find a useful share of WCAG failures (CS 490 Lesson 7 built a contrast checker). Write <code>audit(html)</code> using <code>html.parser.HTMLParser</code>, returning a sorted list of <code>(line, rule)</code> findings, where line is the line on which the offending start tag begins (<code>self.getpos()[0]</code>):</p>\n<ul>\n<li><code>\"img-alt\"</code>: an <code>&lt;img&gt;</code> with no <code>alt</code> attribute (WCAG 1.1.1). <code>alt=\"\"</code> is correct for a decorative image, and a bare <code>alt</code> (as in <code>&lt;img src=\"a.png\" alt&gt;</code>, which the parser gives the value <code>None</code>) counts the same as <code>alt=\"\"</code>: present and empty, so no finding.</li>\n<li><code>\"img-alt-filename\"</code>: an <code>alt</code> that is a file name (ends, case-insensitively, in .png, .jpg, .jpeg, .gif, .svg or .webp) or is one of the words image, picture, photo, graphic (any case, surrounding spaces ignored).</li>\n<li><code>\"link-name\"</code>: an <code>&lt;a&gt;</code> with an <code>href</code> whose accessible name is empty: no non-space text inside it, no non-empty <code>aria-label</code>, and no non-empty <code>alt</code> on an image inside it (2.4.4).</li>\n<li><code>\"input-label\"</code>: an <code>&lt;input&gt;</code> (other than type hidden, submit, button, reset or image), <code>&lt;select&gt;</code> or <code>&lt;textarea&gt;</code> with no label: not inside a <code>&lt;label&gt;</code> element, no <code>&lt;label for=\"...\"&gt;</code> anywhere in the document matching its <code>id</code>, and no non-empty <code>aria-label</code> or <code>aria-labelledby</code> (1.3.1, 3.3.2).</li>\n<li><code>\"html-lang\"</code>: an <code>&lt;html&gt;</code> tag without a non-empty <code>lang</code> (3.1.1). Only <code>&lt;html&gt;</code> tags are checked, so a fragment with no <code>&lt;html&gt;</code> tag gets no html-lang finding.</li>\n</ul>\n<p>Tag and attribute names are case-insensitive (the parser lowercases them). The parser leaves attribute values as written. Compare the <code>type</code> value case-insensitively, as browsers do (<code>type=\"HIDDEN\"</code> is hidden), and treat a missing <code>type</code> as <code>text</code>. Compare <code>id</code> and <code>for</code> values exactly. Assume links and labels are not nested in themselves.</p>\n<p>To use the standard <code>HTMLParser</code>, subclass it and override the methods it calls as it reads: <code>handle_starttag(self, tag, attrs)</code> for each start tag, with <code>tag</code> lowercased and <code>attrs</code> a list of <code>(name, value)</code> pairs (value <code>None</code> for a bare attribute such as <code>hidden</code>); <code>handle_endtag(self, tag)</code> for each end tag; and <code>handle_data(self, data)</code> for the text between tags. A self-closing tag such as <code>&lt;img src=\"a.png\"/&gt;</code> calls both <code>handle_starttag</code> and <code>handle_endtag</code>. Inside a handler, <code>self.getpos()</code> returns <code>(line, column)</code> of the start of the tag being handled, with lines counted from 1. Call <code>p.feed(html)</code> to parse and then <code>p.close()</code> to process anything left; any checks that need the whole document go after <code>close()</code>. If your subclass defines <code>__init__</code>, call <code>super().__init__()</code> first. For example, this prints each tag with its line:</p>\n<pre>class Show(HTMLParser):\n    def handle_starttag(self, tag, attrs):\n        print(\"start\", tag, attrs, self.getpos()[0])\n    def handle_endtag(self, tag):\n        print(\"end\", tag, self.getpos()[0])\n\np = Show()\np.feed('&lt;p&gt;\\n&lt;A HREF=\"/x\" hidden&gt;Go&lt;/a&gt;&lt;/p&gt;')\np.close()\n# start p [] 1\n# start a [('href', '/x'), ('hidden', None)] 2\n# end a 2\n# end p 2</pre>",
   "starter": "from html.parser import HTMLParser\n\ndef audit(html):\n    pass\n",
   "hint": "<p>Subclass <code>HTMLParser</code>. Track whether you are inside a label (a counter) and the current link (its line, whether it has a name so far). Record form fields with their line, id and whether they're labelled so far; check <code>for</code> targets after <code>close()</code>, because a label may come after its field. <code>&lt;img&gt;</code> has no end tag, so handle it in <code>handle_starttag</code> (and <code>handle_startendtag</code> for <code>&lt;img/&gt;</code>, which calls it by default).</p>",
   "solution": "from html.parser import HTMLParser\n\nFILE_EXT = (\".png\", \".jpg\", \".jpeg\", \".gif\", \".svg\", \".webp\")\nVAGUE = {\"image\", \"picture\", \"photo\", \"graphic\"}\nNO_LABEL = {\"hidden\", \"submit\", \"button\", \"reset\", \"image\"}\n\nclass _A(HTMLParser):\n    def __init__(self):\n        super().__init__()\n        self.found = []\n        self.in_label = 0\n        self.link = None\n        self.fields = []\n        self.fors = set()\n\n    def handle_starttag(self, tag, attrs):\n        a = dict(attrs)\n        line = self.getpos()[0]\n        if tag == \"html\" and not (a.get(\"lang\") or \"\").strip():\n            self.found.append((line, \"html-lang\"))\n        if tag == \"img\":\n            if \"alt\" not in a:\n                self.found.append((line, \"img-alt\"))\n            else:\n                alt = (a[\"alt\"] or \"\").strip()\n                if alt.lower().endswith(FILE_EXT) or alt.lower() in VAGUE:\n                    self.found.append((line, \"img-alt-filename\"))\n                if alt and self.link is not None:\n                    self.link[1] = True\n        if tag == \"a\" and \"href\" in a:\n            self.link = [line, bool((a.get(\"aria-label\") or \"\").strip())]\n        if tag == \"label\":\n            self.in_label += 1\n            if a.get(\"for\"):\n                self.fors.add(a[\"for\"])\n        if tag in (\"input\", \"select\", \"textarea\"):\n            if tag == \"input\" and (a.get(\"type\") or \"text\").lower() in NO_LABEL:\n                return\n            ok = self.in_label > 0 or bool((a.get(\"aria-label\") or \"\").strip()) or bool((a.get(\"aria-labelledby\") or \"\").strip())\n            self.fields.append((line, a.get(\"id\"), ok))\n\n    def handle_endtag(self, tag):\n        if tag == \"a\" and self.link is not None:\n            if not self.link[1]:\n                self.found.append((self.link[0], \"link-name\"))\n            self.link = None\n        if tag == \"label\" and self.in_label:\n            self.in_label -= 1\n\n    def handle_data(self, data):\n        if self.link is not None and data.strip():\n            self.link[1] = True\n\ndef audit(html):\n    p = _A()\n    p.feed(html)\n    p.close()\n    if p.link is not None and not p.link[1]:\n        p.found.append((p.link[0], \"link-name\"))\n    for line, fid, ok in p.fields:\n        if not ok and not (fid and fid in p.fors):\n            p.found.append((line, \"input-label\"))\n    return sorted(p.found)\n",
   "tests": [
    {
     "label": "Images",
     "type": "assert",
     "code": "h = '''<img src=\"a.png\">\n<img src=\"b.png\" alt=\"\">\n<img src=\"c.png\" alt=\"IMG_2041.JPG\">\n<img src=\"d.png\" alt=\" Photo \">\n<img src=\"e.png\" alt=\"Campus map with the library circled\"/>'''\nassert audit(h) == [(1, \"img-alt\"), (3, \"img-alt-filename\"), (4, \"img-alt-filename\")], audit(h)\nassert audit('<img src=\"f.png\" alt>') == [], audit('<img src=\"f.png\" alt>')\n"
    },
    {
     "label": "Links",
     "type": "assert",
     "code": "h = '''<a href=\"/home\"><img src=\"logo.svg\"></a>\n<a href=\"/home\"><img src=\"logo.svg\" alt=\"Home\"></a>\n<a href=\"/x\" aria-label=\"Close\"><span class=\"icon\"></span></a>\n<a href=\"/y\">   </a>\n<a name=\"anchor\"></a>\n<a href=\"/z\">Read the <b>report</b></a>'''\nassert audit(h) == [(1, \"img-alt\"), (1, \"link-name\"), (4, \"link-name\")], audit(h)\n"
    },
    {
     "label": "Form labels",
     "type": "assert",
     "code": "h = '''<html lang=\"en\">\n<label for=\"email\">Email</label> <input id=\"email\" type=\"email\">\n<input id=\"phone\">\n<label>Name <input type=\"text\"></label>\n<input type=\"submit\" value=\"Send\">\n<input aria-label=\"Search\">\n<select id=\"term\"></select>\n<textarea></textarea>\n<input type=\"hidden\" name=\"csrf\">\n<label for=\"term\">Term</label>\n</html>'''\nassert audit(h) == [(3, \"input-label\"), (8, \"input-label\")], audit(h)\nh2 = '<input type=\"HIDDEN\" name=\"t\">\\n<INPUT TYPE=\"Submit\">\\n<input type=\"TEXT\">\\n<label for=\"Q\">Q</label><input id=\"q\">'\nassert audit(h2) == [(3, \"input-label\"), (4, \"input-label\")], audit(h2)\n"
    },
    {
     "label": "Page language",
     "type": "assert",
     "code": "assert audit('<HTML><body><p>Hi</p></body></HTML>') == [(1, \"html-lang\")]\nassert audit('<html lang=\"\"><p>Hi</p></html>') == [(1, \"html-lang\")]\nassert audit('<html lang=\"fr\">\\n<p>Bonjour</p></html>') == []\nassert audit('<p>No html tag here</p>') == []\n"
    }
   ]
  }
 ]
});
