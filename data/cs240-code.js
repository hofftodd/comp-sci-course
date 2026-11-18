/* Auto-graded programming problems for CS 240, by lesson. Generated from a Python spec, so every
   string is JSON. The team project is graded separately; these exercise each lesson's techniques. */
CSA.addCode("cs240", {
 "se1": [
  {
   "id": "parse_story",
   "title": "Parsing user stories",
   "prompt": "<p>A team's tool checks that every story in the backlog follows the template \"As a <em>role</em>, I want <em>goal</em>, so that <em>reason</em>.\" Write <code>parse_story(text)</code> that returns a dict with keys <code>\"role\"</code>, <code>\"goal\"</code> and <code>\"reason\"</code>, each stripped of surrounding spaces, with a final period removed from the reason. Accept \"As a\" or \"As an\", in any letter case, and ignore spaces at either end of the text. Raise <code>ValueError</code> if the text doesn't follow the template or any part is empty.</p>",
   "starter": "def parse_story(text):\n    pass\n",
   "hint": "<p>Check and remove the \"as a \" or \"as an \" prefix by comparing <code>text.lower()</code>, then split the rest on <code>\", i want \"</code> and <code>\", so that \"</code>. Use <code>str.lower().find</code> to locate them so that case doesn't matter, and slice the original text to keep its case.</p>",
   "solution": "def parse_story(text):\n    t = text.strip()\n    low = t.lower()\n    for prefix in (\"as an \", \"as a \"):\n        if low.startswith(prefix):\n            t, low = t[len(prefix):], low[len(prefix):]\n            break\n    else:\n        raise ValueError(\"story must start with 'As a' or 'As an'\")\n    i = low.find(\", i want \")\n    j = low.find(\", so that \", i + 1) if i >= 0 else -1\n    if i < 0 or j < 0:\n        raise ValueError(\"story must contain ', I want' and ', so that'\")\n    role = t[:i].strip()\n    goal = t[i + len(\", i want \"):j].strip()\n    reason = t[j + len(\", so that \"):].strip()\n    if reason.endswith(\".\"):\n        reason = reason[:-1].strip()\n    if not (role and goal and reason):\n        raise ValueError(\"every part of the story must be non-empty\")\n    return {\"role\": role, \"goal\": goal, \"reason\": reason}\n",
   "tests": [
    {
     "label": "The notes' story",
     "call": "parse_story('As a student, I want to see my released grades for each course, so that I know how I am doing before the final exam.')",
     "expect": "{'role': 'student', 'goal': 'to see my released grades for each course', 'reason': 'I know how I am doing before the final exam'}"
    },
    {
     "label": "'As an' and mixed case",
     "call": "parse_story('  as an Instructor, i want to release grades, So That students see them  ')",
     "expect": "{'role': 'Instructor', 'goal': 'to release grades', 'reason': 'students see them'}"
    },
    {
     "label": "Missing 'so that'",
     "type": "raises",
     "call": "parse_story('As a user, I want a button.')",
     "error": "ValueError"
    },
    {
     "label": "Empty part",
     "type": "raises",
     "call": "parse_story('As a , I want x, so that y')",
     "error": "ValueError"
    },
    {
     "label": "Wrong start",
     "type": "raises",
     "call": "parse_story('I want x, so that y')",
     "error": "ValueError"
    }
   ]
  },
  {
   "id": "forecast",
   "title": "Forecasting from velocity",
   "prompt": "<p>Write <code>forecast(velocities, backlog)</code>. <code>velocities</code> is a non-empty list of points finished in past sprints and <code>backlog</code> is the number of points remaining. Return a tuple <code>(best, expected, worst)</code> of whole numbers of sprints, each rounded up: the backlog divided by the highest velocity, by the mean velocity, and by the lowest velocity. A backlog of 0 needs 0 sprints. Raise <code>ValueError</code> if the list is empty or any velocity is not positive.</p>",
   "starter": "import math\n\ndef forecast(velocities, backlog):\n    pass\n",
   "hint": "<p>Follow the notes' example, using <code>math.ceil</code> for each of the three divisions.</p>",
   "solution": "import math\n\ndef forecast(velocities, backlog):\n    if not velocities or any(v <= 0 for v in velocities):\n        raise ValueError(\"need at least one positive velocity\")\n    mean = sum(velocities) / len(velocities)\n    return (math.ceil(backlog / max(velocities)), math.ceil(backlog / mean), math.ceil(backlog / min(velocities)))\n",
   "tests": [
    {
     "label": "The notes' team",
     "call": "forecast([21, 17, 24, 19, 22], 130)",
     "expect": "(6, 7, 8)"
    },
    {
     "label": "Exact division",
     "call": "forecast([10, 20], 60)",
     "expect": "(3, 4, 6)"
    },
    {
     "label": "Nothing left",
     "call": "forecast([12], 0)",
     "expect": "(0, 0, 0)"
    },
    {
     "label": "Bad input",
     "type": "assert",
     "code": "for bad in ([], [10, 0], [5, -2]):\n    try:\n        forecast(bad, 10)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f\"no ValueError for {bad}\")\n"
    }
   ]
  }
 ],
 "se2": [
  {
   "id": "git_hash",
   "title": "Git object names",
   "prompt": "<p>Git names a file's content by the SHA-1 hash of <code>b\"blob \"</code>, the content's length in bytes written in decimal, a zero byte, and then the content. Write <code>blob_hash(content)</code> for <code>content</code> given as <code>bytes</code>, returning the 40-character hexadecimal name. Then write <code>text_hash(text)</code> for a <code>str</code>: encode it as UTF-8 and hash that. (Use <code>hashlib.sha1</code>.)</p>",
   "starter": "import hashlib\n\ndef blob_hash(content):\n    pass\n\ndef text_hash(text):\n    pass\n",
   "hint": "<p>The length is the number of <em>bytes</em>, not characters: \"é\" is one character but two bytes in UTF-8. That's why <code>text_hash</code> should encode first and then call <code>blob_hash</code>.</p>",
   "solution": "import hashlib\n\ndef blob_hash(content):\n    header = b\"blob \" + str(len(content)).encode() + b\"\\0\"\n    return hashlib.sha1(header + content).hexdigest()\n\ndef text_hash(text):\n    return blob_hash(text.encode(\"utf-8\"))\n",
   "tests": [
    {
     "label": "hello",
     "call": "blob_hash(b'hello\\n')",
     "expect": "'ce013625030ba8dba906f756967f9e9ca394464a'"
    },
    {
     "label": "The empty file",
     "call": "blob_hash(b'')",
     "expect": "'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391'"
    },
    {
     "label": "Non-ASCII text counts bytes",
     "call": "text_hash('café\\n')",
     "expect": "'572eb43fe8e34fb87d01c69e01151ff696022924'"
    },
    {
     "label": "Matches git for a known file",
     "call": "text_hash('what is up, doc?')",
     "expect": "'bd9dbf5aae1a3862dd1526723246b20206e5fc37'"
    }
   ]
  },
  {
   "id": "three_way_merge",
   "title": "A three-way merge",
   "prompt": "<p>Write <code>merge(base, ours, theirs)</code> for three lists of lines of equal length (the simplified merge of the notes). Return <code>(lines, conflicts)</code>. For each position, take the side that changed it if only one did, or the common value if both agree. For a conflict, output Git's markers as separate lines:</p>\n<pre data-label=\"Output\"><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; ours\n(our line)\n=======\n(their line)\n&gt;&gt;&gt;&gt;&gt;&gt;&gt; theirs</code></pre>\n<p><code>conflicts</code> is the number of conflicts. Raise <code>ValueError</code> if the lists differ in length.</p>",
   "starter": "def merge(base, ours, theirs):\n    pass\n",
   "hint": "<p>Use the three cases of <code>merge_lines</code> in the notes, but extend the output list with the five marker lines instead of appending a tuple.</p>",
   "solution": "def merge(base, ours, theirs):\n    if not len(base) == len(ours) == len(theirs):\n        raise ValueError(\"this simple merge needs equal-length inputs\")\n    out, conflicts = [], 0\n    for b, o, t in zip(base, ours, theirs):\n        if o == t or t == b:\n            out.append(o)\n        elif o == b:\n            out.append(t)\n        else:\n            out += [\"<<<<<<< ours\", o, \"=======\", t, \">>>>>>> theirs\"]\n            conflicts += 1\n    return out, conflicts\n",
   "tests": [
    {
     "label": "Changes on different lines",
     "call": "merge(['a', 'b', 'c'], ['a', 'B', 'c'], ['A', 'b', 'c'])",
     "expect": "(['A', 'B', 'c'], 0)"
    },
    {
     "label": "Same change on both sides",
     "call": "merge(['x'], ['y'], ['y'])",
     "expect": "(['y'], 0)"
    },
    {
     "label": "A conflict",
     "call": "merge(['a', 'size = 10'], ['a', 'size = 12'], ['a', 'size = 14'])",
     "expect": "(['a', '<<<<<<< ours', 'size = 12', '=======', 'size = 14', '>>>>>>> theirs'], 1)"
    },
    {
     "label": "Unequal lengths",
     "type": "raises",
     "call": "merge(['a'], ['a', 'b'], ['a'])",
     "error": "ValueError"
    },
    {
     "label": "Merging with an unchanged side gives the other side",
     "type": "assert",
     "hidden": true,
     "code": "import random\nrandom.seed(2)\nfor _ in range(100):\n    base = [random.choice(\"abc\") for _ in range(6)]\n    other = [random.choice(\"abc\") for _ in range(6)]\n    assert merge(base, base, other) == (other, 0)\n    assert merge(base, other, base) == (other, 0)\n"
    }
   ]
  }
 ],
 "se3": [
  {
   "id": "kill_mutants",
   "title": "Tests that kill mutants",
   "prompt": "<p>This problem is about writing tests. The function <code>shipping(total)</code> (shown below; the grader has its own copy) returns the shipping charge for an order total in dollars:</p>\n<pre data-label=\"Python\"><code>def shipping(total):\n    if total &lt; 0:\n        raise ValueError(\"negative total\")\n    if total &lt; 50:\n        return 5\n    if total &lt; 100:\n        return 2\n    return 0</code></pre>\n<p>Define <code>TESTS</code>, a list of <code>(total, expected)</code> pairs, where <code>expected</code> is the charge, or the string <code>\"error\"</code> if a <code>ValueError</code> should be raised. The grader checks that the correct function passes all your tests and that each of several hidden <em>mutants</em> (small bugs, such as a changed comparison or constant) fails at least one. Use at most 12 tests.</p>",
   "starter": "TESTS = [\n    (20, 5),\n]\n",
   "hint": "<p>Use boundary value analysis from the notes: test each side of each boundary (0, 50 and 100), plus one value from the middle of each class.</p>",
   "solution": "TESTS = [(-0.01, \"error\"), (0, 5), (49.99, 5), (50, 2), (99.99, 2), (100, 0), (500, 0)]\n",
   "tests": [
    {
     "label": "The real function passes your tests",
     "type": "assert",
     "code": "def shipping(total):\n    if total < 0:\n        raise ValueError(\"negative total\")\n    if total < 50:\n        return 5\n    if total < 100:\n        return 2\n    return 0\n\ndef _passes(f, tests):\n    for total, want in tests:\n        try:\n            got = f(total)\n        except ValueError:\n            got = \"error\"\n        if got != want:\n            return False\n    return True\nassert 1 <= len(TESTS) <= 12, 'use between 1 and 12 tests'\nassert _passes(shipping, TESTS)\n"
    },
    {
     "label": "Boundary mutants are killed",
     "type": "assert",
     "code": "def shipping(total):\n    if total < 0:\n        raise ValueError(\"negative total\")\n    if total < 50:\n        return 5\n    if total < 100:\n        return 2\n    return 0\n\ndef _passes(f, tests):\n    for total, want in tests:\n        try:\n            got = f(total)\n        except ValueError:\n            got = \"error\"\n        if got != want:\n            return False\n    return True\n\ndef m1(t):\n    if t < 0: raise ValueError()\n    if t <= 50: return 5\n    if t < 100: return 2\n    return 0\ndef m2(t):\n    if t < 0: raise ValueError()\n    if t < 50: return 5\n    if t <= 100: return 2\n    return 0\ndef m3(t):\n    if t <= 0: raise ValueError()\n    if t < 50: return 5\n    if t < 100: return 2\n    return 0\nfor i, m in enumerate([m1, m2, m3], 1):\n    assert not _passes(m, TESTS), f\"boundary mutant {i} survived\"\n"
    },
    {
     "label": "Value and error mutants are killed",
     "type": "assert",
     "code": "def shipping(total):\n    if total < 0:\n        raise ValueError(\"negative total\")\n    if total < 50:\n        return 5\n    if total < 100:\n        return 2\n    return 0\n\ndef _passes(f, tests):\n    for total, want in tests:\n        try:\n            got = f(total)\n        except ValueError:\n            got = \"error\"\n        if got != want:\n            return False\n    return True\n\ndef m4(t):\n    if t < 0: raise ValueError()\n    if t < 50: return 5\n    if t < 100: return 3\n    return 0\ndef m5(t):\n    if t < 50: return 5\n    if t < 100: return 2\n    return 0\ndef m6(t):\n    if t < 0: raise ValueError()\n    if t < 50: return 5\n    if t < 100: return 2\n    return 2\nfor i, m in enumerate([m4, m5, m6], 4):\n    assert not _passes(m, TESTS), f\"mutant {i} survived\"\n"
    }
   ]
  },
  {
   "id": "property_check",
   "title": "A property-based test runner",
   "prompt": "<p>Write <code>check(prop, gen, trials=200, seed=0)</code>, a tiny property-based testing tool. <code>gen(rng)</code> makes a random input using the <code>random.Random</code> object <code>rng</code>; <code>prop(x)</code> returns <code>True</code> if the property holds for <code>x</code>. Create <code>rng = random.Random(seed)</code>, generate <code>trials</code> inputs in turn, and return the first input for which <code>prop</code> returns false or raises an exception. Return <code>None</code> if every trial passes.</p>\n<p>Then use it: define <code>BUGGY_FOUND</code> as the result of checking the property \"<code>buggy_dedupe(xs)</code> has no repeated items\" with a generator of your choice, where <code>buggy_dedupe</code> (given in the starter code; don't change it) only removes <em>adjacent</em> repeats. Your generator must make a list that exposes the bug within 200 trials.</p>",
   "starter": "import random\n\ndef buggy_dedupe(xs):\n    out = []\n    for x in xs:\n        if not out or out[-1] != x:\n            out.append(x)\n    return out\n\ndef check(prop, gen, trials=200, seed=0):\n    pass\n\nBUGGY_FOUND = None\n",
   "hint": "<p>Wrap the call to <code>prop</code> in <code>try</code>/<code>except Exception</code>. For the generator, lists of a few small integers, such as <code>[rng.randint(0, 3) for _ in range(rng.randint(0, 8))]</code>, contain non-adjacent repeats often.</p>",
   "solution": "import random\n\ndef buggy_dedupe(xs):\n    out = []\n    for x in xs:\n        if not out or out[-1] != x:\n            out.append(x)\n    return out\n\ndef check(prop, gen, trials=200, seed=0):\n    rng = random.Random(seed)\n    for _ in range(trials):\n        x = gen(rng)\n        try:\n            ok = prop(x)\n        except Exception:\n            ok = False\n        if not ok:\n            return x\n    return None\n\nBUGGY_FOUND = check(lambda xs: len(buggy_dedupe(xs)) == len(set(buggy_dedupe(xs))),\n                    lambda rng: [rng.randint(0, 3) for _ in range(rng.randint(0, 8))])\n",
   "tests": [
    {
     "label": "A true property passes",
     "call": "check(lambda xs: sorted(sorted(xs)) == sorted(xs), lambda r: [r.randint(0, 9) for _ in range(5)])",
     "expect": "None"
    },
    {
     "label": "A false property is caught",
     "type": "assert",
     "code": "x = check(lambda n: n < 90, lambda r: r.randint(0, 100))\nassert x is not None and x >= 90\n"
    },
    {
     "label": "Exceptions count as failures",
     "type": "assert",
     "code": "x = check(lambda n: 10 // n >= 0, lambda r: r.randint(0, 3))\nassert x == 0\n"
    },
    {
     "label": "Reproducible with a seed",
     "type": "assert",
     "code": "g = lambda r: r.random()\nassert check(lambda v: v < 0.5, g, seed=7) == check(lambda v: v < 0.5, g, seed=7)\n"
    },
    {
     "label": "You found the dedupe bug",
     "type": "assert",
     "code": "assert BUGGY_FOUND is not None, 'BUGGY_FOUND is None'\nout = buggy_dedupe(BUGGY_FOUND)\nassert len(out) != len(set(out))\n"
    }
   ]
  }
 ],
 "se4": [
  {
   "id": "word_report",
   "title": "A functional core",
   "prompt": "<p>Refactor the notes' practice function <code>count_words</code> into a functional core. Write <code>word_counts(lines)</code>, returning a dict from each lowercase word to its count (words are separated by whitespace), and <code>top(counts, n)</code>, returning a list of the <em>n</em> most common <code>(word, count)</code> pairs, most common first, with ties broken alphabetically. Then write <code>report(lines, n)</code> returning a string with one <code>\"word: count\"</code> line per pair, joined by newlines. None of the three may read files or print.</p>",
   "starter": "def word_counts(lines):\n    pass\n\ndef top(counts, n):\n    pass\n\ndef report(lines, n):\n    pass\n",
   "hint": "<p>Sort with <code>key=lambda item: (-item[1], item[0])</code>: the negative count puts the largest first, and the word breaks ties.</p>",
   "solution": "def word_counts(lines):\n    counts = {}\n    for line in lines:\n        for w in line.lower().split():\n            counts[w] = counts.get(w, 0) + 1\n    return counts\n\ndef top(counts, n):\n    return sorted(counts.items(), key=lambda item: (-item[1], item[0]))[:n]\n\ndef report(lines, n):\n    return \"\\n\".join(f\"{w}: {c}\" for w, c in top(word_counts(lines), n))\n",
   "tests": [
    {
     "label": "Counting",
     "call": "word_counts(['The cat', 'the  hat\\n'])",
     "expect": "{'the': 2, 'cat': 1, 'hat': 1}"
    },
    {
     "label": "Ties broken alphabetically",
     "call": "top({'b': 2, 'a': 2, 'c': 5, 'd': 1}, 3)",
     "expect": "[('c', 5), ('a', 2), ('b', 2)]"
    },
    {
     "label": "Report",
     "call": "report(['to be or not to be'], 2)",
     "expect": "'be: 2\\nto: 2'"
    },
    {
     "label": "Empty input",
     "type": "assert",
     "code": "assert word_counts([]) == {} and top({}, 3) == [] and report([], 3) == ''\n"
    }
   ]
  },
  {
   "id": "money_class",
   "title": "Replacing a primitive with a class",
   "prompt": "<p>Money stored as floats is a classic case of primitive obsession. Write a class <code>Money</code> that stores a whole number of cents. <code>Money(cents)</code> takes an int (raise <code>TypeError</code> for anything else, including floats and <code>bool</code>). In Python, <code>bool</code> is a subclass of <code>int</code>: <code>True</code> behaves as 1 and <code>False</code> as 0, so <code>isinstance(True, int)</code> is <code>True</code>, and a check with <code>isinstance</code> would accept <code>Money(True)</code>. Check <code>type(cents) is int</code> instead, which is <code>False</code> for a bool. Support:</p>\n<ul>\n<li><code>Money.parse(\"12.34\")</code> (also <code>\"$12.34\"</code>, <code>\"12\"</code>, <code>\"12.5\"</code> and <code>\"-3.10\"</code>), raising <code>ValueError</code> for anything else, including more than two decimal places;</li>\n<li><code>a + b</code> and <code>a - b</code> between <code>Money</code> values, and <code>==</code>;</li>\n<li><code>m.times(rate)</code>, multiplying by a number and rounding to the nearest cent, with halves rounded away from zero;</li>\n<li><code>str(m)</code> giving <code>\"$12.34\"</code> or <code>\"-$3.10\"</code>.</li>\n</ul>",
   "starter": "class Money:\n    def __init__(self, cents):\n        pass\n",
   "hint": "<p>For <code>parse</code>, strip an optional sign and <code>$</code>, split on <code>\".\"</code>, check both parts with <code>str.isdigit</code>, and pad the fraction to two digits. For <code>times</code>, use <code>decimal.Decimal</code> with <code>ROUND_HALF_UP</code> (which rounds halves away from zero), since <code>round()</code> rounds halves to even and floats can't hold most products exactly: convert the rate with <code>Decimal(str(rate))</code>. The <code>decimal</code> module (standard library) does exact decimal arithmetic. Import with <code>from decimal import Decimal, ROUND_HALF_UP</code>. <code>Decimal(self.cents) * Decimal(str(rate))</code> is the exact product, and <code>x.quantize(Decimal(1), rounding=ROUND_HALF_UP)</code> rounds a <code>Decimal</code> <code>x</code> to a whole number: <code>Decimal(\"2.5\").quantize(Decimal(1), rounding=ROUND_HALF_UP)</code> is <code>Decimal('3')</code>, and for <code>Decimal(\"-2.5\")</code> it is <code>Decimal('-3')</code>. <code>int()</code> turns the result into an int.</p>",
   "solution": "from decimal import Decimal, ROUND_HALF_UP\n\nclass Money:\n    def __init__(self, cents):\n        if type(cents) is not int:\n            raise TypeError(\"Money needs a whole number of cents\")\n        self.cents = cents\n\n    @classmethod\n    def parse(cls, text):\n        t = text.strip()\n        sign = -1 if t.startswith(\"-\") else 1\n        t = t.lstrip(\"-\").lstrip(\"$\")\n        whole, _, frac = t.partition(\".\")\n        if not whole.isdigit() or (frac and not frac.isdigit()) or len(frac) > 2 or (\".\" in t and not frac):\n            raise ValueError(f\"not an amount of money: {text!r}\")\n        return cls(sign * (int(whole) * 100 + int(frac.ljust(2, \"0\") or 0)))\n\n    def __add__(self, other):\n        return Money(self.cents + other.cents)\n\n    def __sub__(self, other):\n        return Money(self.cents - other.cents)\n\n    def __eq__(self, other):\n        return isinstance(other, Money) and self.cents == other.cents\n\n    def times(self, rate):\n        exact = Decimal(self.cents) * Decimal(str(rate))\n        return Money(int(exact.quantize(Decimal(1), rounding=ROUND_HALF_UP)))\n\n    def __str__(self):\n        sign = \"-\" if self.cents < 0 else \"\"\n        return f\"{sign}${abs(self.cents) // 100}.{abs(self.cents) % 100:02d}\"\n\n    def __repr__(self):\n        return f\"Money({self.cents})\"\n",
   "tests": [
    {
     "label": "Parsing",
     "type": "assert",
     "code": "assert Money.parse(\"12.34\").cents == 1234\nassert Money.parse(\"$12.34\").cents == 1234\nassert Money.parse(\"12\").cents == 1200\nassert Money.parse(\"12.5\").cents == 1250\nassert Money.parse(\"-3.10\").cents == -310\n"
    },
    {
     "label": "Arithmetic is exact",
     "type": "assert",
     "code": "total = Money(0)\nfor _ in range(10):\n    total = total + Money.parse(\"0.10\")\nassert total == Money(100) and str(total) == \"$1.00\"\nassert str(Money(250) - Money(560)) == \"-$3.10\"\n"
    },
    {
     "label": "Multiplying and rounding",
     "type": "assert",
     "code": "assert Money(1999).times(0.07) == Money(140)\nassert Money(5).times(0.5) == Money(3)\nassert Money(-5).times(0.5) == Money(-3)\nassert Money(1000).times(1.5) == Money(1500)\n"
    },
    {
     "label": "Bad input",
     "type": "assert",
     "code": "for bad in (\"12.345\", \"abc\", \"1.2.3\", \"\", \"12.\"):\n    try:\n        Money.parse(bad)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f\"no ValueError for {bad!r}\")\nfor bad in (12.5, \"12\", True):\n    try:\n        Money(bad)\n    except TypeError:\n        pass\n    else:\n        raise AssertionError(f\"no TypeError for {bad!r}\")\n"
    }
   ]
  }
 ],
 "se5": [
  {
   "id": "undo_redo",
   "title": "Commands with undo and redo",
   "prompt": "<p>Extend the notes' editor. Write command classes <code>Insert(pos, text)</code> and <code>Delete(pos, length)</code>, each with <code>do(doc)</code> and <code>undo(doc)</code> returning the new document string. (<code>Delete</code> must remember the text it removed, so that it can put it back.) Write <code>Editor</code> with an attribute <code>doc</code> (starting <code>\"\"</code>) and methods <code>run(cmd)</code>, <code>undo()</code> and <code>redo()</code>. Running a new command clears the redo history. <code>undo</code> and <code>redo</code> with nothing to undo or redo do nothing.</p>",
   "starter": "class Insert:\n    def __init__(self, pos, text):\n        pass\n\nclass Delete:\n    def __init__(self, pos, length):\n        pass\n\nclass Editor:\n    def __init__(self):\n        self.doc = \"\"\n",
   "hint": "<p>In <code>Delete.do</code>, save <code>self.removed = doc[self.pos:self.pos + self.length]</code> before removing it. The editor needs two lists: commands done (for undo) and commands undone (for redo).</p>",
   "solution": "class Insert:\n    def __init__(self, pos, text):\n        self.pos, self.text = pos, text\n    def do(self, doc):\n        return doc[:self.pos] + self.text + doc[self.pos:]\n    def undo(self, doc):\n        return doc[:self.pos] + doc[self.pos + len(self.text):]\n\nclass Delete:\n    def __init__(self, pos, length):\n        self.pos, self.length = pos, length\n        self.removed = \"\"\n    def do(self, doc):\n        self.removed = doc[self.pos:self.pos + self.length]\n        return doc[:self.pos] + doc[self.pos + self.length:]\n    def undo(self, doc):\n        return doc[:self.pos] + self.removed + doc[self.pos:]\n\nclass Editor:\n    def __init__(self):\n        self.doc = \"\"\n        self.done, self.undone = [], []\n    def run(self, cmd):\n        self.doc = cmd.do(self.doc)\n        self.done.append(cmd)\n        self.undone.clear()\n    def undo(self):\n        if self.done:\n            cmd = self.done.pop()\n            self.doc = cmd.undo(self.doc)\n            self.undone.append(cmd)\n    def redo(self):\n        if self.undone:\n            cmd = self.undone.pop()\n            self.doc = cmd.do(self.doc)\n            self.done.append(cmd)\n",
   "tests": [
    {
     "label": "Insert and delete",
     "type": "assert",
     "code": "ed = Editor()\ned.run(Insert(0, \"hello world\"))\ned.run(Delete(5, 6))\nassert ed.doc == \"hello\", ed.doc\ned.undo()\nassert ed.doc == \"hello world\", ed.doc\n"
    },
    {
     "label": "Undo everything, redo everything",
     "type": "assert",
     "code": "ed = Editor()\nfor cmd in [Insert(0, \"abc\"), Insert(3, \"def\"), Delete(1, 3), Insert(0, \">\")]:\n    ed.run(cmd)\nassert ed.doc == \">aef\", ed.doc\nstates = []\nfor _ in range(4):\n    ed.undo(); states.append(ed.doc)\nassert states == [\"aef\", \"abcdef\", \"abc\", \"\"], states\nfor _ in range(4):\n    ed.redo()\nassert ed.doc == \">aef\", ed.doc\n"
    },
    {
     "label": "A new command clears redo",
     "type": "assert",
     "code": "ed = Editor()\ned.run(Insert(0, \"one\"))\ned.undo()\ned.run(Insert(0, \"two\"))\ned.redo()\nassert ed.doc == \"two\", ed.doc\n"
    },
    {
     "label": "Nothing to undo",
     "type": "assert",
     "code": "ed = Editor()\ned.undo(); ed.redo()\nassert ed.doc == ''\n"
    }
   ]
  },
  {
   "id": "event_bus",
   "title": "An observer with unsubscribe",
   "prompt": "<p>Write a class <code>EventBus</code> with methods <code>subscribe(event, fn)</code>, <code>unsubscribe(event, fn)</code> and <code>publish(event, *args)</code>. <code>publish</code> calls every function subscribed to that event, in the order they subscribed, with <code>args</code>, and returns the number of functions called. Subscribing the same function twice to one event has no extra effect; unsubscribing a function that isn't subscribed raises <code>ValueError</code>. If a subscriber raises an exception, the others must still be called; <code>publish</code> then raises the first such exception after calling them all.</p>",
   "starter": "class EventBus:\n    def __init__(self):\n        pass\n",
   "hint": "<p>Keep a dict from event name to a list of functions. Loop over a <em>copy</em> of the list (<code>list(...)</code>), so that a subscriber that unsubscribes itself doesn't disturb the loop. Save the first exception in a variable and raise it at the end.</p>",
   "solution": "class EventBus:\n    def __init__(self):\n        self._subs = {}\n\n    def subscribe(self, event, fn):\n        fns = self._subs.setdefault(event, [])\n        if fn not in fns:\n            fns.append(fn)\n\n    def unsubscribe(self, event, fn):\n        fns = self._subs.get(event, [])\n        if fn not in fns:\n            raise ValueError(\"not subscribed\")\n        fns.remove(fn)\n\n    def publish(self, event, *args):\n        first_error, called = None, 0\n        for fn in list(self._subs.get(event, [])):\n            called += 1\n            try:\n                fn(*args)\n            except Exception as e:\n                if first_error is None:\n                    first_error = e\n        if first_error is not None:\n            raise first_error\n        return called\n",
   "tests": [
    {
     "label": "Publish calls subscribers in order",
     "type": "assert",
     "code": "bus, log = EventBus(), []\nbus.subscribe(\"saved\", lambda name: log.append((\"a\", name)))\nbus.subscribe(\"saved\", lambda name: log.append((\"b\", name)))\nassert bus.publish(\"saved\", \"notes.txt\") == 2\nassert log == [(\"a\", \"notes.txt\"), (\"b\", \"notes.txt\")]\nassert bus.publish(\"deleted\") == 0\n"
    },
    {
     "label": "Subscribe twice, unsubscribe",
     "type": "assert",
     "code": "bus, log = EventBus(), []\nf = lambda: log.append(1)\nbus.subscribe(\"x\", f); bus.subscribe(\"x\", f)\nassert bus.publish(\"x\") == 1\nbus.unsubscribe(\"x\", f)\nassert bus.publish(\"x\") == 0 and log == [1]\n"
    },
    {
     "label": "Unsubscribing an unknown function",
     "type": "raises",
     "call": "EventBus().unsubscribe('x', print)",
     "error": "ValueError"
    },
    {
     "label": "One failing subscriber doesn't stop the others",
     "type": "assert",
     "code": "bus, log = EventBus(), []\ndef bad(): raise RuntimeError(\"boom\")\nbus.subscribe(\"e\", bad)\nbus.subscribe(\"e\", lambda: log.append(\"ran\"))\ntry:\n    bus.publish(\"e\")\nexcept RuntimeError as e:\n    assert str(e) == \"boom\"\nelse:\n    raise AssertionError(\"expected the RuntimeError to be raised\")\nassert log == [\"ran\"]\n"
    }
   ]
  }
 ],
 "se6": [
  {
   "id": "semver",
   "title": "Semantic versioning",
   "prompt": "<p>Write <code>bump(version, change)</code>, where <code>version</code> is a string like <code>\"2.3.1\"</code> and <code>change</code> is <code>\"patch\"</code>, <code>\"minor\"</code> or <code>\"major\"</code>, returning the next version as semver prescribes. Then write <code>satisfies(version, requirement)</code> for requirements in the caret form <code>\"^2.3.1\"</code>, which accepts any version at least 2.3.1 with the same major number (for a major number of 0, the minor number must match instead, because 0.x versions treat minor changes as breaking). Compare versions as numbers, so 2.10.0 is later than 2.9.0. Raise <code>ValueError</code> for a malformed version or change.</p>",
   "starter": "def bump(version, change):\n    pass\n\ndef satisfies(version, requirement):\n    pass\n",
   "hint": "<p>Parse into a tuple of three ints; tuples compare element by element, so <code>(2, 10, 0) &gt; (2, 9, 0)</code>.</p>",
   "solution": "def _parse(v):\n    parts = v.split(\".\")\n    if len(parts) != 3 or not all(p.isdigit() for p in parts):\n        raise ValueError(f\"bad version: {v!r}\")\n    return tuple(int(p) for p in parts)\n\ndef bump(version, change):\n    major, minor, patch = _parse(version)\n    if change == \"patch\":\n        return f\"{major}.{minor}.{patch + 1}\"\n    if change == \"minor\":\n        return f\"{major}.{minor + 1}.0\"\n    if change == \"major\":\n        return f\"{major + 1}.0.0\"\n    raise ValueError(f\"bad change: {change!r}\")\n\ndef satisfies(version, requirement):\n    if not requirement.startswith(\"^\"):\n        raise ValueError(\"only ^ requirements are supported\")\n    v, low = _parse(version), _parse(requirement[1:])\n    if v < low:\n        return False\n    if low[0] == 0:\n        return v[0] == 0 and v[1] == low[1]\n    return v[0] == low[0]\n",
   "tests": [
    {
     "label": "Bumping",
     "type": "assert",
     "code": "assert bump(\"2.3.1\", \"patch\") == \"2.3.2\"\nassert bump(\"2.3.1\", \"minor\") == \"2.4.0\"\nassert bump(\"2.3.1\", \"major\") == \"3.0.0\"\nassert bump(\"2.9.9\", \"minor\") == \"2.10.0\"\n"
    },
    {
     "label": "Caret ranges",
     "type": "assert",
     "code": "assert satisfies(\"2.4.0\", \"^2.3.1\") and satisfies(\"2.10.0\", \"^2.9.0\") and satisfies(\"2.3.1\", \"^2.3.1\")\nassert not satisfies(\"3.0.0\", \"^2.3.1\") and not satisfies(\"2.3.0\", \"^2.3.1\")\n"
    },
    {
     "label": "0.x versions",
     "type": "assert",
     "code": "assert satisfies('0.4.7', '^0.4.2') and not satisfies('0.5.0', '^0.4.2')\n"
    },
    {
     "label": "Malformed input",
     "type": "assert",
     "code": "for args in ((\"2.3\", \"patch\"), (\"a.b.c\", \"minor\"), (\"1.2.3\", \"huge\")):\n    try:\n        bump(*args)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f\"no ValueError for {args}\")\n"
    }
   ]
  },
  {
   "id": "rest_api",
   "title": "A small REST API",
   "prompt": "<p>Write a class <code>NotesAPI</code> whose method <code>handle(method, path, body=None)</code> returns <code>(status, data)</code>, where <code>body</code> is a JSON string or <code>None</code>. Notes are dicts <code>{\"id\": int, \"text\": str}</code>, with ids starting at 1 and never reused.</p>\n<ul>\n<li><code>GET /notes</code>: 200 and the list of notes in id order.</li>\n<li><code>POST /notes</code> with <code>{\"text\": ...}</code>: 201 and the new note. The text must be a string of 1 to 500 characters after stripping spaces; otherwise 422 with <code>{\"error\": ...}</code>. A body that isn't valid JSON, or isn't a JSON object, gets 400.</li>\n<li><code>GET /notes/ID</code>: 200 and the note; <code>PATCH /notes/ID</code> with <code>{\"text\": ...}</code>: 200 and the updated note (validated as for POST); <code>DELETE /notes/ID</code>: 204 and <code>None</code>. An unknown or malformed ID gets 404.</li>\n<li>Any other path gets 404; any other method on a known path gets 405. Error responses have a dict with an <code>\"error\"</code> key.</li>\n</ul>",
   "starter": "import json\n\nclass NotesAPI:\n    def __init__(self):\n        self.notes = {}\n        self.next_id = 1\n\n    def handle(self, method, path, body=None):\n        pass\n",
   "hint": "<p>Start from the notes' <code>handle</code>. Write one helper that parses and validates a body, returning either the cleaned text or an error response, and use it for both POST and PATCH. <code>json.loads</code> raises <code>json.JSONDecodeError</code> (a kind of <code>ValueError</code>) on invalid JSON.</p>",
   "solution": "import json\n\nclass NotesAPI:\n    def __init__(self):\n        self.notes = {}\n        self.next_id = 1\n\n    def _text(self, body):\n        try:\n            data = json.loads(body or \"\")\n        except ValueError:\n            return None, (400, {\"error\": \"body must be JSON\"})\n        if not isinstance(data, dict):\n            return None, (400, {\"error\": \"body must be a JSON object\"})\n        text = data.get(\"text\")\n        if not isinstance(text, str) or not 1 <= len(text.strip()) <= 500:\n            return None, (422, {\"error\": \"text must be 1 to 500 characters\"})\n        return text.strip(), None\n\n    def handle(self, method, path, body=None):\n        parts = path.strip(\"/\").split(\"/\")\n        if parts[0] != \"notes\" or len(parts) > 2:\n            return 404, {\"error\": \"not found\"}\n        if len(parts) == 1:\n            if method == \"GET\":\n                return 200, [self.notes[k] for k in sorted(self.notes)]\n            if method == \"POST\":\n                text, err = self._text(body)\n                if err:\n                    return err\n                note = {\"id\": self.next_id, \"text\": text}\n                self.notes[self.next_id] = note\n                self.next_id += 1\n                return 201, note\n            return 405, {\"error\": f\"{method} not allowed\"}\n        if not parts[1].isdigit() or int(parts[1]) not in self.notes:\n            return 404, {\"error\": \"no such note\"}\n        nid = int(parts[1])\n        if method == \"GET\":\n            return 200, self.notes[nid]\n        if method == \"PATCH\":\n            text, err = self._text(body)\n            if err:\n                return err\n            self.notes[nid][\"text\"] = text\n            return 200, self.notes[nid]\n        if method == \"DELETE\":\n            del self.notes[nid]\n            return 204, None\n        return 405, {\"error\": f\"{method} not allowed\"}\n",
   "tests": [
    {
     "label": "Create, list, read",
     "type": "assert",
     "code": "api = NotesAPI()\nassert api.handle(\"POST\", \"/notes\", '{\"text\": \"  buy milk \"}') == (201, {\"id\": 1, \"text\": \"buy milk\"})\nassert api.handle(\"POST\", \"/notes\", '{\"text\": \"call Bo\"}')[0] == 201\nassert api.handle(\"GET\", \"/notes\") == (200, [{\"id\": 1, \"text\": \"buy milk\"}, {\"id\": 2, \"text\": \"call Bo\"}])\nassert api.handle(\"GET\", \"/notes/2\") == (200, {\"id\": 2, \"text\": \"call Bo\"})\n"
    },
    {
     "label": "Update and delete; ids aren't reused",
     "type": "assert",
     "code": "api = NotesAPI()\napi.handle(\"POST\", \"/notes\", '{\"text\": \"a\"}')\napi.handle(\"POST\", \"/notes\", '{\"text\": \"b\"}')\nassert api.handle(\"PATCH\", \"/notes/1\", '{\"text\": \"A\"}') == (200, {\"id\": 1, \"text\": \"A\"})\nassert api.handle(\"DELETE\", \"/notes/2\") == (204, None)\nassert api.handle(\"GET\", \"/notes/2\")[0] == 404\nassert api.handle(\"POST\", \"/notes\", '{\"text\": \"c\"}') == (201, {\"id\": 3, \"text\": \"c\"})\n"
    },
    {
     "label": "Validation errors",
     "type": "assert",
     "code": "api = NotesAPI()\nfor body, code in (('{\"text\": \"\"}', 422), ('{\"text\": 5}', 422), ('{\"text\": \"' + 'x' * 501 + '\"}', 422),\n                   ('not json', 400), ('[1, 2]', 400), (None, 400)):\n    status, data = api.handle(\"POST\", \"/notes\", body)\n    assert status == code and \"error\" in data, (body[:20] if body else body, status)\nassert api.handle(\"GET\", \"/notes\") == (200, [])\n"
    },
    {
     "label": "404 and 405",
     "type": "assert",
     "code": "api = NotesAPI()\napi.handle(\"POST\", \"/notes\", '{\"text\": \"a\"}')\nassert api.handle(\"GET\", \"/users\")[0] == 404\nassert api.handle(\"GET\", \"/notes/abc\")[0] == 404\nassert api.handle(\"GET\", \"/notes/1/extra\")[0] == 404\nassert api.handle(\"PUT\", \"/notes\")[0] == 405\nassert api.handle(\"POST\", \"/notes/1\", '{\"text\": \"x\"}')[0] == 405\nassert api.handle(\"PATCH\", \"/notes/9\", '{\"text\": \"x\"}')[0] == 404\n"
    }
   ]
  }
 ],
 "se7": [
  {
   "id": "mini_linter",
   "title": "A linter",
   "prompt": "<p>Write <code>lint(source)</code> that parses Python source with the <code>ast</code> module and returns a sorted list of <code>(line, code)</code> pairs, one per problem, using these codes:</p>\n<ul>\n<li><code>\"B006\"</code>: a function default argument that is a list, dict or set display (such as <code>[]</code> or <code>{}</code>);</li>\n<li><code>\"E722\"</code>: a bare <code>except:</code>;</li>\n<li><code>\"E711\"</code>: a comparison with <code>None</code> using <code>==</code> or <code>!=</code>, with <code>None</code> on either side.</li>\n</ul>\n<p>Report keyword-only defaults too (those after <code>*</code>; they are in <code>node.args.kw_defaults</code>, where a missing default is <code>None</code>), and check <code>async def</code> functions as well. (<code>async def</code> defines an <em>asynchronous</em> function, one that can pause while it waits, for example for the network; you don't need to know how they run. <code>ast.parse</code> turns one into an <code>ast.AsyncFunctionDef</code> node instead of an <code>ast.FunctionDef</code>, with the same fields: <code>name</code>, <code>lineno</code> and <code>args</code>. <code>isinstance</code> accepts a tuple of classes, so <code>isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef))</code> matches either.) If the source has a syntax error, return <code>[(line, \"E999\")]</code> with the error's line number.</p>",
   "starter": "import ast\n\ndef lint(source):\n    pass\n",
   "hint": "<p>Start from the notes' <code>lint</code> and its practice extension. A <code>SyntaxError</code> raised by <code>ast.parse</code> has a <code>lineno</code> attribute. For a comparison, the operands are <code>[node.left] + node.comparators</code>; the <em>i</em>-th operator sits between operands <em>i</em> and <em>i</em> + 1.</p>",
   "solution": "import ast\n\ndef _is_none(n):\n    return isinstance(n, ast.Constant) and n.value is None\n\ndef lint(source):\n    try:\n        tree = ast.parse(source)\n    except SyntaxError as e:\n        return [(e.lineno, \"E999\")]\n    problems = []\n    for node in ast.walk(tree):\n        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):\n            for d in node.args.defaults + [d for d in node.args.kw_defaults if d is not None]:\n                if isinstance(d, (ast.List, ast.Dict, ast.Set)):\n                    problems.append((d.lineno, \"B006\"))\n        elif isinstance(node, ast.ExceptHandler) and node.type is None:\n            problems.append((node.lineno, \"E722\"))\n        elif isinstance(node, ast.Compare):\n            operands = [node.left] + node.comparators\n            for i, op in enumerate(node.ops):\n                if isinstance(op, (ast.Eq, ast.NotEq)) and (_is_none(operands[i]) or _is_none(operands[i + 1])):\n                    problems.append((node.lineno, \"E711\"))\n    return sorted(problems)\n",
   "tests": [
    {
     "label": "The notes' example",
     "call": "lint('def add_item(item, items=[]):\\n    items.append(item)\\n    return items\\n\\ndef load(path):\\n    try:\\n        return open(path).read()\\n    except:\\n        return None\\n')",
     "expect": "[(1, 'B006'), (8, 'E722')]"
    },
    {
     "label": "Comparisons with None",
     "call": "lint('if x == None:\\n    pass\\nif None != y:\\n    pass\\nif x is None:\\n    pass\\n')",
     "expect": "[(1, 'E711'), (3, 'E711')]"
    },
    {
     "label": "Keyword-only and async defaults",
     "call": "lint('def f(a, *, opts={}, n=1):\\n    pass\\nasync def g(s=set()):\\n    pass\\nasync def h(xs=[]):\\n    pass\\n')",
     "expect": "[(1, 'B006'), (5, 'B006')]"
    },
    {
     "label": "Clean code and syntax errors",
     "type": "assert",
     "code": "assert lint(\"def f(x, y=None):\\n    try:\\n        return x / y\\n    except ZeroDivisionError:\\n        return 0\\n\") == []\nassert lint(\"def f(:\\n    pass\\n\") == [(1, \"E999\")]\n"
    }
   ]
  },
  {
   "id": "unused_imports",
   "title": "Finding unused imports",
   "prompt": "<p>Write <code>unused_imports(source)</code> returning a sorted list of the names bound by <code>import</code> statements in the source that are never used anywhere else in it. For <code>import os.path</code>, the bound name is <code>os</code>; for <code>import numpy as np</code> it is <code>np</code>; for <code>from math import sqrt, pi as PI</code> they are <code>sqrt</code> and <code>PI</code>. A name counts as used if it appears as an <code>ast.Name</code> node anywhere (including as the start of an attribute access like <code>os.getcwd()</code>). Ignore <code>from x import *</code>.</p>",
   "starter": "import ast\n\ndef unused_imports(source):\n    pass\n",
   "hint": "<p>Walk the tree twice, or once collecting two sets: names bound by <code>ast.Import</code> and <code>ast.ImportFrom</code> nodes (each has a list <code>names</code> of <code>ast.alias</code> objects with <code>.name</code> and <code>.asname</code>), and the <code>id</code> of every <code>ast.Name</code> node. Return the sorted difference.</p>",
   "solution": "import ast\n\ndef unused_imports(source):\n    bound, used = set(), set()\n    for node in ast.walk(ast.parse(source)):\n        if isinstance(node, ast.Import):\n            for a in node.names:\n                bound.add(a.asname or a.name.split(\".\")[0])\n        elif isinstance(node, ast.ImportFrom):\n            for a in node.names:\n                if a.name != \"*\":\n                    bound.add(a.asname or a.name)\n        elif isinstance(node, ast.Name):\n            used.add(node.id)\n    return sorted(bound - used)\n",
   "tests": [
    {
     "label": "Simple imports",
     "call": "unused_imports('import os\\nimport sys\\nprint(sys.argv)\\n')",
     "expect": "['os']"
    },
    {
     "label": "Aliases and from-imports",
     "call": "unused_imports('import numpy as np\\nfrom math import sqrt, pi as PI\\nx = sqrt(2)\\n')",
     "expect": "['PI', 'np']"
    },
    {
     "label": "Dotted imports bind the first name",
     "call": "unused_imports('import os.path\\nimport xml.dom\\nprint(os.path.join(\"a\", \"b\"))\\n')",
     "expect": "['xml']"
    },
    {
     "label": "Star imports and uses inside functions",
     "call": "unused_imports('from json import *\\nimport re\\ndef f(s):\\n    return re.findall(\"a\", s)\\n')",
     "expect": "[]"
    }
   ]
  }
 ],
 "se8": [
  {
   "id": "retries",
   "title": "Retrying with backoff",
   "prompt": "<p>Write <code>call_with_retries(fn, attempts, sleep, base=0.5, cap=8.0, retry_on=(ConnectionError, TimeoutError), rng=None)</code>. Call <code>fn()</code> up to <code>attempts</code> times. If it raises one of the exceptions in <code>retry_on</code> and attempts remain, call <code>sleep(d)</code> before the next try, where the delay before retry <em>i</em> (counting from 0) is <code>min(cap, base * 2**i)</code>, multiplied by <code>rng()</code> if <code>rng</code> is given (full jitter). Return <code>fn()</code>'s result as soon as it succeeds. Re-raise the last exception if every attempt fails, and let any other exception propagate at once without retrying. Raise <code>ValueError</code> if <code>attempts</code> is less than 1.</p>",
   "starter": "def call_with_retries(fn, attempts, sleep, base=0.5, cap=8.0, retry_on=(ConnectionError, TimeoutError), rng=None):\n    pass\n",
   "hint": "<p>Use <code>except retry_on:</code>, which accepts a tuple of exception classes. Tests pass <code>sleep=delays.append</code> to record the delays instead of waiting.</p>",
   "solution": "def call_with_retries(fn, attempts, sleep, base=0.5, cap=8.0, retry_on=(ConnectionError, TimeoutError), rng=None):\n    if attempts < 1:\n        raise ValueError(\"attempts must be at least 1\")\n    for i in range(attempts):\n        try:\n            return fn()\n        except retry_on:\n            if i == attempts - 1:\n                raise\n            d = min(cap, base * 2 ** i)\n            sleep(d * rng() if rng else d)\n",
   "tests": [
    {
     "label": "Succeeds on the third try",
     "type": "assert",
     "code": "delays, calls = [], []\ndef fn():\n    calls.append(1)\n    if len(calls) < 3:\n        raise ConnectionError(\"down\")\n    return \"ok\"\nassert call_with_retries(fn, 5, delays.append) == \"ok\"\nassert delays == [0.5, 1.0], delays\n"
    },
    {
     "label": "Gives up and re-raises; delays are capped",
     "type": "assert",
     "code": "delays = []\ndef down():\n    raise TimeoutError(\"slow\")\ntry:\n    call_with_retries(down, 7, delays.append, base=1, cap=10)\nexcept TimeoutError:\n    pass\nelse:\n    raise AssertionError(\"expected TimeoutError\")\nassert delays == [1, 2, 4, 8, 10, 10], delays\n"
    },
    {
     "label": "Other errors aren't retried",
     "type": "assert",
     "code": "delays, calls = [], []\ndef broken():\n    calls.append(1)\n    raise KeyError(\"bug\")\ntry:\n    call_with_retries(broken, 5, delays.append)\nexcept KeyError:\n    pass\nassert calls == [1] and delays == []\n"
    },
    {
     "label": "Jitter",
     "type": "assert",
     "code": "delays = []\ndef down():\n    raise ConnectionError()\ntry:\n    call_with_retries(down, 4, delays.append, rng=lambda: 0.5)\nexcept ConnectionError:\n    pass\nassert delays == [0.25, 0.5, 1.0], delays\n"
    },
    {
     "label": "attempts must be positive",
     "type": "raises",
     "call": "call_with_retries(lambda: 1, 0, print)",
     "error": "ValueError"
    }
   ]
  },
  {
   "id": "error_budget",
   "title": "Error budgets",
   "prompt": "<p>Write <code>budget_report(slo, outages, days=30)</code>. <code>slo</code> is an availability target such as 0.999, and <code>outages</code> is a list of outage lengths in minutes during the window. Return a dict with:</p>\n<ul>\n<li><code>\"budget\"</code>: the allowed downtime in minutes, <code>(1 - slo) * days * 24 * 60</code>, rounded to 1 decimal place;</li>\n<li><code>\"used\"</code>: total outage minutes;</li>\n<li><code>\"remaining\"</code>: budget minus used, rounded to 1 decimal place (negative if overspent);</li>\n<li><code>\"availability\"</code>: the achieved fraction <code>1 - used / (days * 24 * 60)</code>, rounded to 5 decimal places;</li>\n<li><code>\"met\"</code>: whether the availability is at least the SLO.</li>\n</ul>\n<p>Raise <code>ValueError</code> unless 0 &lt; slo &lt; 1 and every outage is non-negative.</p>",
   "starter": "def budget_report(slo, outages, days=30):\n    pass\n",
   "hint": "<p>Compare <code>used</code> with the unrounded budget to decide <code>\"met\"</code>, so that rounding doesn't flip the answer near the boundary.</p>",
   "solution": "def budget_report(slo, outages, days=30):\n    if not 0 < slo < 1 or any(o < 0 for o in outages):\n        raise ValueError(\"bad SLO or outage\")\n    window = days * 24 * 60\n    budget = (1 - slo) * window\n    used = sum(outages)\n    return {\"budget\": round(budget, 1), \"used\": used, \"remaining\": round(budget - used, 1),\n            \"availability\": round(1 - used / window, 5), \"met\": used <= budget + 1e-9}\n",
   "tests": [
    {
     "label": "The practice problem",
     "call": "budget_report(0.999, [35])",
     "expect": "{'budget': 43.2, 'used': 35, 'remaining': 8.2, 'availability': 0.99919, 'met': True}"
    },
    {
     "label": "Overspent",
     "call": "budget_report(0.9999, [3, 2.5])",
     "expect": "{'budget': 4.3, 'used': 5.5, 'remaining': -1.2, 'availability': 0.99987, 'met': False}"
    },
    {
     "label": "A week at 99%",
     "call": "budget_report(0.99, [], days=7)",
     "expect": "{'budget': 100.8, 'used': 0, 'remaining': 100.8, 'availability': 1.0, 'met': True}"
    },
    {
     "label": "Exactly on budget is met",
     "type": "assert",
     "code": "assert budget_report(0.999, [43.2])['met'] is True\n"
    },
    {
     "label": "Bad input",
     "type": "assert",
     "code": "for args in ((1.0, []), (0, []), (0.99, [-1])):\n    try:\n        budget_report(*args)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f\"no ValueError for {args}\")\n"
    }
   ]
  },
  {
   "id": "escape_html",
   "title": "Escaping user text",
   "prompt": "<p>Cross-site scripting happens when user text is put into a web page as HTML. Write <code>escape_html(text)</code> that replaces <code>&amp;</code>, <code>&lt;</code>, <code>&gt;</code>, <code>\"</code> and <code>'</code> with <code>&amp;amp;</code>, <code>&amp;lt;</code>, <code>&amp;gt;</code>, <code>&amp;quot;</code> and <code>&amp;#x27;</code>. Then write <code>render_comment(author, text)</code> returning <code>'&lt;p class=\"comment\"&gt;&lt;b&gt;AUTHOR&lt;/b&gt;: TEXT&lt;/p&gt;'</code> with both values escaped. Don't use the <code>html</code> module.</p>",
   "starter": "def escape_html(text):\n    pass\n\ndef render_comment(author, text):\n    pass\n",
   "hint": "<p>Replace <code>&amp;</code> first. Otherwise the <code>&amp;</code> in <code>&amp;lt;</code> gets escaped again, giving <code>&amp;amp;lt;</code>.</p>",
   "solution": "def escape_html(text):\n    for ch, ent in ((\"&\", \"&amp;\"), (\"<\", \"&lt;\"), (\">\", \"&gt;\"), ('\"', \"&quot;\"), (\"'\", \"&#x27;\")):\n        text = text.replace(ch, ent)\n    return text\n\ndef render_comment(author, text):\n    return f'<p class=\"comment\"><b>{escape_html(author)}</b>: {escape_html(text)}</p>'\n",
   "tests": [
    {
     "label": "A script tag is neutralized",
     "call": "escape_html('<script>alert(1)</script>')",
     "expect": "'&lt;script&gt;alert(1)&lt;/script&gt;'"
    },
    {
     "label": "Ampersands aren't double-escaped",
     "call": "escape_html('Tom & Jerry <3')",
     "expect": "'Tom &amp; Jerry &lt;3'"
    },
    {
     "label": "Quotes",
     "call": "escape_html('\"hi\" it\\'s')",
     "expect": "'&quot;hi&quot; it&#x27;s'"
    },
    {
     "label": "Rendering a comment",
     "call": "render_comment('<b>ana</b>', 'x < y & y > z')",
     "expect": "'<p class=\"comment\"><b>&lt;b&gt;ana&lt;/b&gt;</b>: x &lt; y &amp; y &gt; z</p>'"
    },
    {
     "label": "Agrees with the standard library",
     "type": "assert",
     "hidden": true,
     "code": "import html, random\nrandom.seed(4)\nfor _ in range(300):\n    s = \"\".join(random.choice(\"ab<>&\\\"' ;#x\") for _ in range(random.randint(0, 12)))\n    assert escape_html(s) == html.escape(s, quote=True), s\n"
    }
   ]
  }
 ]
});
