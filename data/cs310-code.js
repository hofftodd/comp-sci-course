/* Auto-graded programming problems for CS 310, by lesson. Generated from a Python spec, so every
   string is JSON. Python in the browser (Pyodide) can't start threads, so the concurrency problems run
   "threads" written as generators under a small deterministic scheduler, introduced in Lesson 3. */
CSA.addCode("cs310", {
 "os1": [
  {
   "id": "process_table",
   "title": "Fork, exit and wait",
   "prompt": "<p>Simulate a kernel's process table. Write a class <code>Kernel</code>. A new kernel has one process, <code>init</code>, with process ID 1. Process IDs are then handed out in increasing order from 2, never reused.</p>\n<ul>\n<li><code>fork(parent)</code> creates a running child of process <code>parent</code> and returns the child's ID.</li>\n<li><code>exit(pid, status)</code> ends process <code>pid</code>: it becomes a <em>zombie</em> that keeps its exit status until its parent waits for it, and its own children (running or zombie) are given to init (their parent becomes 1).</li>\n<li><code>wait(parent)</code> reaps a zombie child of <code>parent</code>: it removes the child from the table and returns <code>(child_pid, status)</code>, choosing the child that exited earliest. If <code>parent</code> has children but none has exited, return <code>None</code> (a real <code>wait</code> would block). If it has no children at all, raise <code>ChildProcessError</code>.</li>\n<li><code>ps()</code> returns a list of <code>(pid, parent_pid, state)</code> tuples sorted by pid, where state is <code>\"R\"</code> (running) or <code>\"Z\"</code> (zombie). init's parent is 0.</li>\n</ul>\n<p>Raise <code>ProcessLookupError</code> if <code>fork</code>, <code>exit</code> or <code>wait</code> names a process that isn't running, and <code>ValueError</code> on an attempt to exit init.</p>",
   "starter": "class Kernel:\n    def __init__(self):\n        pass\n\n    def fork(self, parent):\n        pass\n\n    def exit(self, pid, status):\n        pass\n\n    def wait(self, parent):\n        pass\n\n    def ps(self):\n        pass\n",
   "hint": "<p>Keep a dict from pid to a small record: parent, state, status, and the order in which it exited (a counter you increase on every exit). <code>wait</code> looks for the zombie children of <code>parent</code> and takes the one with the smallest exit order.</p>",
   "solution": "class Kernel:\n    def __init__(self):\n        self.procs = {1: {\"ppid\": 0, \"state\": \"R\", \"status\": None, \"order\": None}}\n        self.next_pid = 2\n        self.exits = 0\n\n    def _running(self, pid):\n        p = self.procs.get(pid)\n        if p is None or p[\"state\"] != \"R\":\n            raise ProcessLookupError(pid)\n        return p\n\n    def fork(self, parent):\n        self._running(parent)\n        pid = self.next_pid\n        self.next_pid += 1\n        self.procs[pid] = {\"ppid\": parent, \"state\": \"R\", \"status\": None, \"order\": None}\n        return pid\n\n    def exit(self, pid, status):\n        if pid == 1:\n            raise ValueError(\"init can't exit\")\n        p = self._running(pid)\n        p[\"state\"], p[\"status\"], p[\"order\"] = \"Z\", status, self.exits\n        self.exits += 1\n        for q in self.procs.values():\n            if q[\"ppid\"] == pid:\n                q[\"ppid\"] = 1\n\n    def wait(self, parent):\n        self._running(parent)\n        kids = [(q[\"order\"], pid) for pid, q in self.procs.items() if q[\"ppid\"] == parent]\n        if not kids:\n            raise ChildProcessError(parent)\n        zombies = [k for k in kids if k[0] is not None]\n        if not zombies:\n            return None\n        _, pid = min(zombies)\n        return pid, self.procs.pop(pid)[\"status\"]\n\n    def ps(self):\n        return [(pid, p[\"ppid\"], p[\"state\"]) for pid, p in sorted(self.procs.items())]\n",
   "tests": [
    {
     "label": "Fork, exit, wait",
     "type": "assert",
     "code": "k = Kernel()\nc = k.fork(1)\nassert c == 2, c\nassert k.ps() == [(1, 0, \"R\"), (2, 1, \"R\")], k.ps()\nassert k.wait(1) is None\nk.exit(2, 7)\nassert k.ps() == [(1, 0, \"R\"), (2, 1, \"Z\")], k.ps()\nassert k.wait(1) == (2, 7)\nassert k.ps() == [(1, 0, \"R\")], k.ps()\n"
    },
    {
     "label": "Earliest exit is reaped first",
     "type": "assert",
     "code": "k = Kernel()\na, b, c = k.fork(1), k.fork(1), k.fork(1)\nk.exit(c, 3); k.exit(a, 1)\nassert k.wait(1) == (c, 3)\nassert k.wait(1) == (a, 1)\nassert k.wait(1) is None\n"
    },
    {
     "label": "Orphans are adopted by init",
     "type": "assert",
     "code": "k = Kernel()\np = k.fork(1)\ng1 = k.fork(p); g2 = k.fork(p)\nk.exit(g1, 0)\nk.exit(p, 5)\nassert k.ps() == [(1, 0, \"R\"), (2, 1, \"Z\"), (3, 1, \"Z\"), (4, 1, \"R\")], k.ps()\nassert k.wait(1) == (3, 0)\nassert k.wait(1) == (2, 5)\n"
    },
    {
     "label": "Errors",
     "type": "assert",
     "code": "k = Kernel()\nc = k.fork(1)\nfor f, exc in ((lambda: k.wait(c), ChildProcessError), (lambda: k.exit(1, 0), ValueError),\n               (lambda: k.fork(99), ProcessLookupError)):\n    try:\n        f()\n    except exc:\n        pass\n    else:\n        raise AssertionError(f\"expected {exc.__name__}\")\nk.exit(c, 0)\nfor f in (lambda: k.exit(c, 1), lambda: k.fork(c)):\n    try:\n        f()\n    except ProcessLookupError:\n        pass\n    else:\n        raise AssertionError(\"a zombie can't exit or fork\")\n"
    },
    {
     "label": "PIDs are never reused",
     "type": "assert",
     "hidden": true,
     "code": "k = Kernel()\nfor i in range(5):\n    c = k.fork(1); k.exit(c, i); assert k.wait(1) == (c, i)\nassert k.fork(1) == 7\n"
    }
   ]
  },
  {
   "id": "parse_pipeline",
   "title": "What the shell does with a command line",
   "prompt": "<p>Before it forks, a shell parses the command line. Write <code>parse(line)</code> for lines whose words are separated by spaces, such as <code>\"grep -v x &lt; in.txt | sort | uniq -c &gt; out.txt\"</code>. Return a list with one dict per command of the pipeline, in order, each with keys <code>\"argv\"</code> (the list of words), <code>\"stdin\"</code> and <code>\"stdout\"</code> (a file name, or <code>None</code>). A word <code>&lt;</code> or <code>&gt;</code> takes the next word as the file name, and <code>|</code> separates commands.</p>\n<p>Raise <code>ValueError</code> if a command has no words (as in <code>\"ls | | wc\"</code> or an empty line), if <code>&lt;</code> or <code>&gt;</code> isn't followed by a file name, if a command redirects the same stream twice, if a command other than the first redirects its input, or one other than the last redirects its output (those streams belong to the pipe).</p>",
   "starter": "def parse(line):\n    pass\n",
   "hint": "<p>Split on <code>|</code> first (<code>line.split(\"|\")</code>), then walk each part's words with an index so that you can consume the word after <code>&lt;</code> or <code>&gt;</code>. Check the pipe rules once you know each command's position.</p>",
   "solution": "def parse(line):\n    cmds = []\n    parts = line.split(\"|\")\n    for pos, part in enumerate(parts):\n        words = part.split()\n        cmd = {\"argv\": [], \"stdin\": None, \"stdout\": None}\n        i = 0\n        while i < len(words):\n            w = words[i]\n            if w in (\"<\", \">\"):\n                if i + 1 >= len(words) or words[i + 1] in (\"<\", \">\"):\n                    raise ValueError(\"missing file name after \" + w)\n                key = \"stdin\" if w == \"<\" else \"stdout\"\n                if cmd[key] is not None:\n                    raise ValueError(\"stream redirected twice\")\n                cmd[key] = words[i + 1]\n                i += 2\n            else:\n                cmd[\"argv\"].append(w)\n                i += 1\n        if not cmd[\"argv\"]:\n            raise ValueError(\"empty command\")\n        if cmd[\"stdin\"] is not None and pos > 0:\n            raise ValueError(\"only the first command may redirect input\")\n        if cmd[\"stdout\"] is not None and pos < len(parts) - 1:\n            raise ValueError(\"only the last command may redirect output\")\n        cmds.append(cmd)\n    return cmds\n",
   "tests": [
    {
     "label": "One command",
     "call": "parse('ls -l /tmp')",
     "expect": "[{'argv': ['ls', '-l', '/tmp'], 'stdin': None, 'stdout': None}]"
    },
    {
     "label": "Redirections",
     "call": "parse('sort < in.txt > out.txt')",
     "expect": "[{'argv': ['sort'], 'stdin': 'in.txt', 'stdout': 'out.txt'}]"
    },
    {
     "label": "A pipeline",
     "call": "parse('grep -v x < in.txt | sort | uniq -c > out.txt')",
     "expect": "[{'argv': ['grep', '-v', 'x'], 'stdin': 'in.txt', 'stdout': None}, {'argv': ['sort'], 'stdin': None, 'stdout': None}, {'argv': ['uniq', '-c'], 'stdin': None, 'stdout': 'out.txt'}]"
    },
    {
     "label": "Redirection before the words",
     "call": "parse('> log.txt echo hi')",
     "expect": "[{'argv': ['echo', 'hi'], 'stdin': None, 'stdout': 'log.txt'}]"
    },
    {
     "label": "Errors",
     "type": "assert",
     "code": "for bad in (\"\", \"ls | | wc\", \"sort <\", \"ls > a > b\", \"ls | sort < x\", \"ls > x | wc\", \"cat < > f\", \"| ls\"):\n    try:\n        parse(bad)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f\"no ValueError for {bad!r}\")\n"
    }
   ]
  }
 ],
 "os2": [
  {
   "id": "scheduler",
   "title": "A scheduling simulator",
   "prompt": "<p>Write <code>simulate(jobs, policy, quantum=1)</code>. <code>jobs</code> is a list of <code>(name, arrival, length)</code> tuples with whole-number times; <code>policy</code> is <code>\"FIFO\"</code>, <code>\"SJF\"</code>, <code>\"STCF\"</code> or <code>\"RR\"</code>. Return a dict mapping each name to <code>(turnaround, response)</code>, where turnaround = completion − arrival and response = first run − arrival. Time starts at 0, the CPU idles when no job has arrived, and switching costs nothing. The rules, as in the notes:</p>\n<ul>\n<li><b>FIFO:</b> run jobs to completion in order of arrival.</li>\n<li><b>SJF:</b> whenever the CPU is free, run the arrived job with the shortest length to completion.</li>\n<li><b>STCF:</b> at every time unit, run the arrived job with the least remaining time (preempting if needed).</li>\n<li><b>RR:</b> keep a queue of ready jobs; run the front job for up to <code>quantum</code> units, then put it at the back if unfinished. Jobs that arrive while it runs, or at the moment its slice ends, join the queue before it does.</li>\n</ul>\n<p>Break every tie by earlier arrival, then by position in <code>jobs</code>.</p>",
   "starter": "def simulate(jobs, policy, quantum=1):\n    pass\n",
   "hint": "<p>For FIFO and SJF, loop: find the arrived, unfinished jobs; if there are none, jump the clock to the next arrival; otherwise pick one with <code>min</code> and a key such as <code>(length, arrival, index)</code> and run it to the end. STCF is the same with remaining time in the key, but advance the clock one unit at a time. For RR, keep a <code>collections.deque</code> of job indexes and admit arrivals (in order) each time the clock moves.</p>",
   "solution": "from collections import deque\n\ndef simulate(jobs, policy, quantum=1):\n    n = len(jobs)\n    remaining = [j[2] for j in jobs]\n    first = [None] * n\n    done = [None] * n\n    t = 0\n    if policy in (\"FIFO\", \"SJF\", \"STCF\"):\n        while None in done:\n            ready = [i for i in range(n) if jobs[i][1] <= t and done[i] is None]\n            if not ready:\n                t = min(jobs[i][1] for i in range(n) if done[i] is None)\n                continue\n            if policy == \"FIFO\":\n                i = min(ready, key=lambda i: (jobs[i][1], i))\n            elif policy == \"SJF\":\n                i = min(ready, key=lambda i: (jobs[i][2], jobs[i][1], i))\n            else:\n                i = min(ready, key=lambda i: (remaining[i], jobs[i][1], i))\n            if first[i] is None:\n                first[i] = t\n            run = 1 if policy == \"STCF\" else remaining[i]\n            t += run\n            remaining[i] -= run\n            if remaining[i] == 0:\n                done[i] = t\n    elif policy == \"RR\":\n        order = sorted(range(n), key=lambda i: (jobs[i][1], i))\n        k = 0\n        queue = deque()\n        def admit():\n            nonlocal k\n            while k < n and jobs[order[k]][1] <= t:\n                queue.append(order[k]); k += 1\n        admit()\n        while None in done:\n            if not queue:\n                t = jobs[order[k]][1]\n                admit()\n                continue\n            i = queue.popleft()\n            if first[i] is None:\n                first[i] = t\n            run = min(quantum, remaining[i])\n            t += run\n            remaining[i] -= run\n            admit()\n            if remaining[i] == 0:\n                done[i] = t\n            else:\n                queue.append(i)\n    else:\n        raise ValueError(\"unknown policy\")\n    return {jobs[i][0]: (done[i] - jobs[i][1], first[i] - jobs[i][1]) for i in range(n)}\n",
   "tests": [
    {
     "label": "FIFO, the convoy effect",
     "call": "simulate([('A', 0, 100), ('B', 0, 10), ('C', 0, 10)], 'FIFO')",
     "expect": "{'A': (100, 0), 'B': (110, 100), 'C': (120, 110)}"
    },
    {
     "label": "SJF",
     "call": "simulate([('A', 0, 100), ('B', 0, 10), ('C', 0, 10)], 'SJF')",
     "expect": "{'A': (120, 20), 'B': (10, 0), 'C': (20, 10)}"
    },
    {
     "label": "SJF with late arrivals",
     "call": "simulate([('A', 0, 100), ('B', 10, 10), ('C', 10, 10)], 'SJF')",
     "expect": "{'A': (100, 0), 'B': (100, 90), 'C': (110, 100)}"
    },
    {
     "label": "STCF preempts",
     "call": "simulate([('A', 0, 100), ('B', 10, 10), ('C', 10, 10)], 'STCF')",
     "expect": "{'A': (120, 0), 'B': (10, 0), 'C': (20, 10)}"
    },
    {
     "label": "Round robin, quantum 1",
     "call": "simulate([('A', 0, 5), ('B', 0, 5), ('C', 0, 5)], 'RR')",
     "expect": "{'A': (13, 0), 'B': (14, 1), 'C': (15, 2)}"
    },
    {
     "label": "Round robin, arrivals join before the preempted job",
     "call": "simulate([('A', 0, 4), ('B', 2, 3), ('C', 4, 2)], 'RR', quantum=2)",
     "expect": "{'A': (6, 0), 'B': (7, 0), 'C': (4, 2)}"
    },
    {
     "label": "The CPU idles until a job arrives",
     "call": "simulate([('A', 5, 2), ('B', 20, 1)], 'RR', quantum=4)",
     "expect": "{'A': (2, 0), 'B': (1, 0)}"
    },
    {
     "label": "Idle gaps under every policy",
     "type": "assert",
     "hidden": true,
     "code": "for p in (\"FIFO\", \"SJF\", \"STCF\", \"RR\"):\n    r = simulate([('A', 3, 2), ('B', 10, 4), ('C', 11, 1)], p, 2)\n    assert r['A'] == (2, 0), (p, r)\nwant = {\"FIFO\": (4, 0), \"SJF\": (4, 0), \"STCF\": (5, 0), \"RR\": (5, 0)}\nfor p in want:\n    r = simulate([('A', 3, 2), ('B', 10, 4), ('C', 11, 1)], p, 2)\n    assert r['B'] == want[p], (p, r)\n"
    }
   ]
  },
  {
   "id": "mlfq",
   "title": "A multi-level feedback queue",
   "prompt": "<p>Write <code>mlfq(jobs, quanta, boost=None)</code> that simulates the multi-level feedback queue of the notes and returns a dict mapping each job's name to its completion time. <code>jobs</code> is a list of <code>(name, arrival, length)</code>; <code>quanta[k]</code> is the time slice at level <em>k</em> (level 0 is the highest priority). Simulate one time unit at a time, starting at time 0. At each time <em>t</em>:</p>\n<ol>\n<li>If <code>boost</code> is given and <em>t</em> is a positive multiple of it, move every job that is waiting in a level to the back of level 0, taking them from level 0 first, then level 1, and so on, keeping each level's order, and reset their used time. Jobs that haven't arrived yet aren't moved; a job arriving at <em>t</em> joins in step 2, after the boosted ones.</li>\n<li>Jobs arriving at time <em>t</em> join the back of level 0, in the order they appear in <code>jobs</code>.</li>\n<li>Run the job at the front of the highest non-empty level for one unit. If it finishes, record <em>t</em> + 1 and remove it. Otherwise, if it has now used its level's whole quantum, move it to the back of the next level down (or the back of the lowest level, if it's already there) with its used time reset to 0; if not, it stays at the front of its level. If every level is empty, the CPU idles.</li>\n</ol>",
   "starter": "from collections import deque\n\ndef mlfq(jobs, quanta, boost=None):\n    pass\n",
   "hint": "<p>Keep a list of deques, one per level, holding job indexes, plus lists of remaining time and used time per job. Loop while some job is unfinished; the loop body is exactly the three steps.</p>",
   "solution": "from collections import deque\n\ndef mlfq(jobs, quanta, boost=None):\n    levels = [deque() for _ in quanta]\n    level_of = [0] * len(jobs)\n    used = [0] * len(jobs)\n    remaining = [j[2] for j in jobs]\n    done = {}\n    t = 0\n    while len(done) < len(jobs):\n        if boost and t > 0 and t % boost == 0:\n            everyone = [i for q in levels for i in q]\n            for q in levels:\n                q.clear()\n            for i in everyone:\n                levels[0].append(i); level_of[i] = 0; used[i] = 0\n        for i, (name, arrival, length) in enumerate(jobs):\n            if arrival == t:\n                levels[0].append(i)\n        q = next((q for q in levels if q), None)\n        if q is not None:\n            i = q[0]\n            remaining[i] -= 1\n            used[i] += 1\n            if remaining[i] == 0:\n                q.popleft()\n                done[jobs[i][0]] = t + 1\n            elif used[i] == quanta[level_of[i]]:\n                q.popleft()\n                level_of[i] = min(level_of[i] + 1, len(quanta) - 1)\n                used[i] = 0\n                levels[level_of[i]].append(i)\n        t += 1\n    return done\n",
   "tests": [
    {
     "label": "One long job sinks",
     "call": "mlfq([('A', 0, 10)], [1, 2, 4])",
     "expect": "{'A': 10}"
    },
    {
     "label": "A short job arriving later finishes quickly",
     "call": "mlfq([('A', 0, 20), ('B', 10, 3)], [1, 2, 4])",
     "expect": "{'B': 13, 'A': 23}"
    },
    {
     "label": "Two jobs at once",
     "call": "mlfq([('A', 0, 4), ('B', 0, 4)], [1, 2, 4])",
     "expect": "{'A': 7, 'B': 8}"
    },
    {
     "label": "Without a boost, a long job starves",
     "call": "mlfq([('A', 0, 10)] + [(f'S{k}', k, 1) for k in range(1, 100)], [1, 2])['A']",
     "expect": "109"
    },
    {
     "label": "A boost stops starvation",
     "call": "mlfq([('A', 0, 10)] + [(f'S{k}', k, 1) for k in range(1, 100)], [1, 2], boost=5)['A']",
     "expect": "69"
    },
    {
     "label": "Idle time and a single level",
     "call": "mlfq([('A', 3, 3), ('B', 4, 2)], [2])",
     "expect": "{'B': 7, 'A': 8}",
     "hidden": true
    },
    {
     "label": "A job arriving at a boost joins after the boosted jobs",
     "call": "mlfq([('A', 0, 6), ('B', 4, 3)], [1, 2], boost=4)",
     "expect": "{'A': 7, 'B': 9}",
     "hidden": true
    }
   ]
  }
 ],
 "os3": [
  {
   "id": "interleavings",
   "title": "Every possible interleaving",
   "prompt": "<p>Threads are given as lists of instructions on shared variables. Each thread has one private register. The instructions are <code>(\"load\", v)</code> (register = shared[v]), <code>(\"add\", k)</code> (register += k), <code>(\"mul\", k)</code> (register *= k) and <code>(\"store\", v)</code> (shared[v] = register). Each instruction is atomic, but the scheduler may switch threads between any two.</p>\n<p>Write <code>interleavings(threads)</code>, a generator that yields every interleaving as a list of <code>(thread_index, instruction)</code> pairs, keeping each thread's instructions in their own order. Then write <code>outcomes(threads, shared, watch)</code> that runs every interleaving from a fresh copy of the dict <code>shared</code> (registers start at 0) and returns the set of final values of variable <code>watch</code>.</p>",
   "starter": "def interleavings(threads):\n    pass\n\ndef outcomes(threads, shared, watch):\n    pass\n",
   "hint": "<p>Recursion: an interleaving starts with the next instruction of some thread that still has instructions, followed by an interleaving of what remains. Track how far each thread has got with a list of positions.</p>",
   "solution": "def interleavings(threads):\n    pos = [0] * len(threads)\n    total = sum(len(t) for t in threads)\n    path = []\n    def rec():\n        if len(path) == total:\n            yield list(path)\n            return\n        for i, t in enumerate(threads):\n            if pos[i] < len(t):\n                path.append((i, t[pos[i]]))\n                pos[i] += 1\n                yield from rec()\n                pos[i] -= 1\n                path.pop()\n    yield from rec()\n\ndef outcomes(threads, shared, watch):\n    results = set()\n    for order in interleavings(threads):\n        mem = dict(shared)\n        reg = [0] * len(threads)\n        for i, (op, arg) in order:\n            if op == \"load\":\n                reg[i] = mem[arg]\n            elif op == \"add\":\n                reg[i] += arg\n            elif op == \"mul\":\n                reg[i] *= arg\n            elif op == \"store\":\n                mem[arg] = reg[i]\n            else:\n                raise ValueError(op)\n        results.add(mem[watch])\n    return results\n",
   "tests": [
    {
     "label": "Two increments can lose an update",
     "call": "outcomes([[('load', 'x'), ('add', 1), ('store', 'x')]] * 2, {'x': 0}, 'x')",
     "expect": "{1, 2}"
    },
    {
     "label": "Count of interleavings of 3 and 3 steps",
     "call": "sum(1 for _ in interleavings([['a'] * 3, ['b'] * 3]))",
     "expect": "20"
    },
    {
     "label": "Order inside each thread is kept",
     "type": "assert",
     "code": "for order in interleavings([[1, 2], [3]]):\n    mine = [x for i, x in order if i == 0]\n    assert mine == [1, 2], order\nassert sorted(tuple(o) for o in interleavings([[1, 2], [3]])) == sorted([((0, 1), (0, 2), (1, 3)), ((0, 1), (1, 3), (0, 2)), ((1, 3), (0, 1), (0, 2))])\n"
    },
    {
     "label": "Add and double",
     "call": "outcomes([[('load', 'x'), ('add', 1), ('store', 'x')], [('load', 'x'), ('mul', 2), ('store', 'x')]], {'x': 5}, 'x')",
     "expect": "{6, 10, 11, 12}"
    },
    {
     "label": "Three increments",
     "call": "outcomes([[('load', 'x'), ('add', 1), ('store', 'x')]] * 3, {'x': 0}, 'x')",
     "expect": "{1, 2, 3}"
    },
    {
     "label": "Atomic increments can't be lost",
     "call": "outcomes([[('load', 'x'), ('add', 1), ('store', 'x'), ('load', 'y')], [('load', 'y'), ('add', 1), ('store', 'y')]], {'x': 0, 'y': 0}, 'x')",
     "expect": "{1}",
     "hidden": true
    }
   ]
  },
  {
   "id": "bank_lock",
   "title": "Fixing a race with a lock",
   "prompt": "<p>The starter contains the simulator from the notes (<code>run</code> and <code>Lock</code>) and a <code>Bank</code> whose <code>transfer</code> is a simulated thread: a generator with a <code>yield</code> wherever the real hardware could switch threads. Run two transfers at once and money appears or vanishes. Fix <code>Bank</code> so that any number of concurrent transfers behave as if they ran one at a time, in some order: no money is created or lost, and a transfer only happens if the source account had enough at the moment it ran. Keep at least the three <code>yield</code>s that are in <code>transfer</code> (they model real switch points); add a lock.</p>",
   "starter": "import random\n\ndef run(threads, schedule=(), seed=0, max_steps=100000):\n    \"\"\"Run generator \"threads\" one step at a time: each step resumes one thread until its next yield.\n    The first steps follow schedule (a list of thread indexes); after that a random unfinished\n    thread (seeded, so the run is repeatable) goes next. Returns the number of steps taken.\"\"\"\n    live = list(range(len(threads)))\n    rng = random.Random(seed)\n    plan = list(schedule)\n    steps = 0\n    while live:\n        if steps >= max_steps:\n            raise RuntimeError(\"no progress after max_steps: deadlock?\")\n        i = plan.pop(0) if plan else rng.choice(live)\n        if i not in live:\n            continue\n        steps += 1\n        try:\n            next(threads[i])\n        except StopIteration:\n            live.remove(i)\n    return steps\n\nclass Lock:\n    \"\"\"A lock for simulated threads. acquire() is a generator: use  yield from lock.acquire().\"\"\"\n    def __init__(self):\n        self.held = False\n    def acquire(self):\n        while self.held:          # someone else holds it: let other threads run\n            yield\n        self.held = True          # test and set in one step, so it is atomic\n    def release(self):\n        self.held = False\n\n\nclass Bank:\n    def __init__(self, balances):\n        self.balances = dict(balances)\n\n    def transfer(self, src, dst, amount):\n        a = self.balances[src]\n        yield\n        if a >= amount:\n            self.balances[src] = a - amount\n            yield\n            b = self.balances[dst]\n            yield\n            self.balances[dst] = b + amount\n",
   "hint": "<p>Create one <code>Lock</code> in <code>__init__</code>. At the top of <code>transfer</code>, <code>yield from self.lock.acquire()</code>; release the lock with a plain <code>self.lock.release()</code> on every path out of the function (a <code>try</code>/<code>finally</code> does it).</p>",
   "solution": "import random\n\ndef run(threads, schedule=(), seed=0, max_steps=100000):\n    \"\"\"Run generator \"threads\" one step at a time: each step resumes one thread until its next yield.\n    The first steps follow schedule (a list of thread indexes); after that a random unfinished\n    thread (seeded, so the run is repeatable) goes next. Returns the number of steps taken.\"\"\"\n    live = list(range(len(threads)))\n    rng = random.Random(seed)\n    plan = list(schedule)\n    steps = 0\n    while live:\n        if steps >= max_steps:\n            raise RuntimeError(\"no progress after max_steps: deadlock?\")\n        i = plan.pop(0) if plan else rng.choice(live)\n        if i not in live:\n            continue\n        steps += 1\n        try:\n            next(threads[i])\n        except StopIteration:\n            live.remove(i)\n    return steps\n\nclass Lock:\n    \"\"\"A lock for simulated threads. acquire() is a generator: use  yield from lock.acquire().\"\"\"\n    def __init__(self):\n        self.held = False\n    def acquire(self):\n        while self.held:          # someone else holds it: let other threads run\n            yield\n        self.held = True          # test and set in one step, so it is atomic\n    def release(self):\n        self.held = False\n\n\nclass Bank:\n    def __init__(self, balances):\n        self.balances = dict(balances)\n        self.lock = Lock()\n\n    def transfer(self, src, dst, amount):\n        yield from self.lock.acquire()\n        try:\n            a = self.balances[src]\n            yield\n            if a >= amount:\n                self.balances[src] = a - amount\n                yield\n                b = self.balances[dst]\n                yield\n                self.balances[dst] = b + amount\n        finally:\n            self.lock.release()\n",
   "tests": [
    {
     "label": "Two transfers, interleaved",
     "type": "assert",
     "code": "bank = Bank({\"a\": 100, \"b\": 0})\nrun([bank.transfer(\"a\", \"b\", 10), bank.transfer(\"a\", \"b\", 20)], schedule=[0, 1, 0, 1, 0, 1, 0, 1])\nassert bank.balances == {\"a\": 70, \"b\": 30}, bank.balances\n"
    },
    {
     "label": "Money is conserved under many schedules",
     "type": "assert",
     "code": "for seed in range(200):\n    bank = Bank({\"a\": 50, \"b\": 50, \"c\": 50})\n    ts = [bank.transfer(\"a\", \"b\", 10), bank.transfer(\"b\", \"c\", 20), bank.transfer(\"c\", \"a\", 30), bank.transfer(\"a\", \"c\", 5)]\n    run(ts, seed=seed)\n    assert sum(bank.balances.values()) == 150, (seed, bank.balances)\n"
    },
    {
     "label": "Results match some serial order",
     "type": "assert",
     "code": "from itertools import permutations\nmoves = [(\"a\", \"b\", 40), (\"a\", \"c\", 40), (\"b\", \"a\", 15)]\ndef serial(order):\n    bal = {\"a\": 50, \"b\": 0, \"c\": 0}\n    for s, d, x in order:\n        if bal[s] >= x:\n            bal[s] -= x; bal[d] += x\n    return bal\nallowed = [serial(p) for p in permutations(moves)]\nfor seed in range(200):\n    bank = Bank({\"a\": 50, \"b\": 0, \"c\": 0})\n    run([bank.transfer(*m) for m in moves], seed=seed)\n    assert bank.balances in allowed, (seed, bank.balances)\n"
    },
    {
     "label": "The switch points are still there",
     "type": "source",
     "code": "import ast\ntree = ast.parse(__source__)\nfn = next(n for n in ast.walk(tree) if isinstance(n, ast.FunctionDef) and n.name == \"transfer\")\ncount = sum(isinstance(n, ast.Yield) for n in ast.walk(fn))\nassert count >= 3, f\"transfer has {count} plain yields; keep the three switch points\"\n"
    }
   ]
  }
 ],
 "os4": [
  {
   "id": "ticket_lock",
   "title": "A fair ticket lock",
   "prompt": "<p>A test-and-set spin lock lets any waiting thread win, so one thread can wait forever. A <em>ticket lock</em> is fair, like the numbered tickets at a deli counter. It uses the atomic instruction <em>fetch-and-add</em>, given in the starter as <code>fetch_and_add(cell, key)</code>, which adds 1 to <code>cell[key]</code> and returns the old value in a single step.</p>\n<p>Write class <code>TicketLock</code> for the simulator (the starter includes <code>run</code>). It keeps two counters, the next ticket to hand out and the ticket now being served. <code>acquire()</code> is a generator: take a ticket with one <code>fetch_and_add</code>, then <code>yield</code> until your ticket is served. <code>release()</code> serves the next ticket. Threads must enter in the order they took tickets.</p>",
   "starter": "import random\n\ndef run(threads, schedule=(), seed=0, max_steps=100000):\n    \"\"\"Run generator \"threads\" one step at a time: each step resumes one thread until its next yield.\n    The first steps follow schedule (a list of thread indexes); after that a random unfinished\n    thread (seeded, so the run is repeatable) goes next. Returns the number of steps taken.\"\"\"\n    live = list(range(len(threads)))\n    rng = random.Random(seed)\n    plan = list(schedule)\n    steps = 0\n    while live:\n        if steps >= max_steps:\n            raise RuntimeError(\"no progress after max_steps: deadlock?\")\n        i = plan.pop(0) if plan else rng.choice(live)\n        if i not in live:\n            continue\n        steps += 1\n        try:\n            next(threads[i])\n        except StopIteration:\n            live.remove(i)\n    return steps\n\nclass Lock:\n    \"\"\"A lock for simulated threads. acquire() is a generator: use  yield from lock.acquire().\"\"\"\n    def __init__(self):\n        self.held = False\n    def acquire(self):\n        while self.held:          # someone else holds it: let other threads run\n            yield\n        self.held = True          # test and set in one step, so it is atomic\n    def release(self):\n        self.held = False\n\n\ndef fetch_and_add(cell, key):\n    old = cell[key]\n    cell[key] = old + 1\n    return old\n\nclass TicketLock:\n    def __init__(self):\n        pass\n\n    def acquire(self):\n        yield\n\n    def release(self):\n        pass\n",
   "hint": "<p>Store the counters in a dict, <code>self.c = {\"next\": 0, \"serving\": 0}</code>, so that <code>fetch_and_add(self.c, \"next\")</code> can update them. Spin with <code>while self.c[\"serving\"] != my_ticket: yield</code>. Release is one more <code>fetch_and_add</code> on <code>\"serving\"</code>.</p>",
   "solution": "import random\n\ndef run(threads, schedule=(), seed=0, max_steps=100000):\n    \"\"\"Run generator \"threads\" one step at a time: each step resumes one thread until its next yield.\n    The first steps follow schedule (a list of thread indexes); after that a random unfinished\n    thread (seeded, so the run is repeatable) goes next. Returns the number of steps taken.\"\"\"\n    live = list(range(len(threads)))\n    rng = random.Random(seed)\n    plan = list(schedule)\n    steps = 0\n    while live:\n        if steps >= max_steps:\n            raise RuntimeError(\"no progress after max_steps: deadlock?\")\n        i = plan.pop(0) if plan else rng.choice(live)\n        if i not in live:\n            continue\n        steps += 1\n        try:\n            next(threads[i])\n        except StopIteration:\n            live.remove(i)\n    return steps\n\nclass Lock:\n    \"\"\"A lock for simulated threads. acquire() is a generator: use  yield from lock.acquire().\"\"\"\n    def __init__(self):\n        self.held = False\n    def acquire(self):\n        while self.held:          # someone else holds it: let other threads run\n            yield\n        self.held = True          # test and set in one step, so it is atomic\n    def release(self):\n        self.held = False\n\n\ndef fetch_and_add(cell, key):\n    old = cell[key]\n    cell[key] = old + 1\n    return old\n\nclass TicketLock:\n    def __init__(self):\n        self.c = {\"next\": 0, \"serving\": 0}\n\n    def acquire(self):\n        me = fetch_and_add(self.c, \"next\")\n        while self.c[\"serving\"] != me:\n            yield\n\n    def release(self):\n        fetch_and_add(self.c, \"serving\")\n",
   "tests": [
    {
     "label": "Mutual exclusion",
     "type": "assert",
     "code": "for seed in range(150):\n    lock = TicketLock()\n    inside = []\n    log = []\n    def worker(i):\n        for _ in range(3):\n            yield from lock.acquire()\n            inside.append(i)\n            assert len(inside) == 1, f\"two threads inside: {inside}\"\n            yield\n            log.append(i)\n            inside.remove(i)\n            lock.release()\n            yield\n    run([worker(i) for i in range(3)], seed=seed)\n    assert sorted(log) == [0, 0, 0, 1, 1, 1, 2, 2, 2], log\n"
    },
    {
     "label": "First come, first served",
     "type": "assert",
     "code": "for seed in range(150):\n    lock = TicketLock()\n    tickets, entered = [], []\n    def worker(i):\n        yield\n        tickets.append(i)\n        yield from lock.acquire()\n        entered.append(i)\n        yield\n        lock.release()\n    run([worker(i) for i in range(4)], seed=seed)\n    assert entered == tickets, (seed, tickets, entered)\n"
    },
    {
     "label": "An uncontended lock doesn't wait",
     "type": "assert",
     "code": "lock = TicketLock()\ng = lock.acquire()\ntry:\n    next(g)\n    raise AssertionError(\"acquire yielded although nobody held the lock\")\nexcept StopIteration:\n    pass\nlock.release()\n"
    }
   ]
  },
  {
   "id": "bounded_buffer",
   "title": "The bounded buffer",
   "prompt": "<p>Write class <code>BoundedBuffer(capacity)</code> for the simulator, using its <code>Lock</code> and <code>Condition</code> (in the starter, as shown in the Lesson 3 and 4 notes: <code>acquire</code> and <code>wait</code> may wait, so they are generators, called as <code>yield from self.lock.acquire()</code> and <code>yield from cond.wait()</code>; <code>release</code>, <code>notify</code> and <code>notify_all</code> are plain calls). Keep the items in a list <code>self.items</code>.</p>\n<ul>\n<li><code>put(item)</code> is a generator that waits while the buffer is full, then appends the item.</li>\n<li><code>get(out)</code> is a generator that waits while the buffer is empty, then removes the oldest item and appends it to the list <code>out</code> (a generator can't easily hand back a value to the simulator).</li>\n</ul>\n<p>Any number of producers and consumers may run at once. <code>self.items</code> must never hold more than <code>capacity</code> items, every item must be received exactly once, and no thread may wait forever while it could proceed.</p>",
   "starter": "import random\n\ndef run(threads, schedule=(), seed=0, max_steps=100000):\n    \"\"\"Run generator \"threads\" one step at a time: each step resumes one thread until its next yield.\n    The first steps follow schedule (a list of thread indexes); after that a random unfinished\n    thread (seeded, so the run is repeatable) goes next. Returns the number of steps taken.\"\"\"\n    live = list(range(len(threads)))\n    rng = random.Random(seed)\n    plan = list(schedule)\n    steps = 0\n    while live:\n        if steps >= max_steps:\n            raise RuntimeError(\"no progress after max_steps: deadlock?\")\n        i = plan.pop(0) if plan else rng.choice(live)\n        if i not in live:\n            continue\n        steps += 1\n        try:\n            next(threads[i])\n        except StopIteration:\n            live.remove(i)\n    return steps\n\nclass Lock:\n    \"\"\"A lock for simulated threads. acquire() is a generator: use  yield from lock.acquire().\"\"\"\n    def __init__(self):\n        self.held = False\n    def acquire(self):\n        while self.held:          # someone else holds it: let other threads run\n            yield\n        self.held = True          # test and set in one step, so it is atomic\n    def release(self):\n        self.held = False\n\nclass Condition:\n    \"\"\"A condition variable for simulated threads, used like threading.Condition.\"\"\"\n    def __init__(self, lock):\n        self.lock = lock\n        self.waiting = []\n    def wait(self):               # use:  yield from cond.wait()   (while holding the lock)\n        me = [False]\n        self.waiting.append(me)\n        self.lock.release()\n        while not me[0]:\n            yield\n        yield from self.lock.acquire()\n    def notify(self):\n        if self.waiting:\n            self.waiting.pop(0)[0] = True\n    def notify_all(self):\n        for w in self.waiting:\n            w[0] = True\n        self.waiting.clear()\n\n\nclass BoundedBuffer:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.items = []\n\n    def put(self, item):\n        self.items.append(item)\n        yield\n\n    def get(self, out):\n        out.append(self.items.pop(0))\n        yield\n",
   "hint": "<p>One lock and two conditions on it, <code>not_full</code> and <code>not_empty</code>. In <code>put</code>: acquire, <code>while len(self.items) == self.capacity: yield from self.not_full.wait()</code>, append, <code>self.not_empty.notify()</code>, release. <code>get</code> is the mirror image. Use <code>while</code>, not <code>if</code>: another thread may take the item between the notify and your wake-up.</p>",
   "solution": "import random\n\ndef run(threads, schedule=(), seed=0, max_steps=100000):\n    \"\"\"Run generator \"threads\" one step at a time: each step resumes one thread until its next yield.\n    The first steps follow schedule (a list of thread indexes); after that a random unfinished\n    thread (seeded, so the run is repeatable) goes next. Returns the number of steps taken.\"\"\"\n    live = list(range(len(threads)))\n    rng = random.Random(seed)\n    plan = list(schedule)\n    steps = 0\n    while live:\n        if steps >= max_steps:\n            raise RuntimeError(\"no progress after max_steps: deadlock?\")\n        i = plan.pop(0) if plan else rng.choice(live)\n        if i not in live:\n            continue\n        steps += 1\n        try:\n            next(threads[i])\n        except StopIteration:\n            live.remove(i)\n    return steps\n\nclass Lock:\n    \"\"\"A lock for simulated threads. acquire() is a generator: use  yield from lock.acquire().\"\"\"\n    def __init__(self):\n        self.held = False\n    def acquire(self):\n        while self.held:          # someone else holds it: let other threads run\n            yield\n        self.held = True          # test and set in one step, so it is atomic\n    def release(self):\n        self.held = False\n\nclass Condition:\n    \"\"\"A condition variable for simulated threads, used like threading.Condition.\"\"\"\n    def __init__(self, lock):\n        self.lock = lock\n        self.waiting = []\n    def wait(self):               # use:  yield from cond.wait()   (while holding the lock)\n        me = [False]\n        self.waiting.append(me)\n        self.lock.release()\n        while not me[0]:\n            yield\n        yield from self.lock.acquire()\n    def notify(self):\n        if self.waiting:\n            self.waiting.pop(0)[0] = True\n    def notify_all(self):\n        for w in self.waiting:\n            w[0] = True\n        self.waiting.clear()\n\n\nclass BoundedBuffer:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.items = []\n        self.lock = Lock()\n        self.not_full = Condition(self.lock)\n        self.not_empty = Condition(self.lock)\n\n    def put(self, item):\n        yield from self.lock.acquire()\n        while len(self.items) == self.capacity:\n            yield from self.not_full.wait()\n        self.items.append(item)\n        self.not_empty.notify()\n        self.lock.release()\n        yield\n\n    def get(self, out):\n        yield from self.lock.acquire()\n        while not self.items:\n            yield from self.not_empty.wait()\n        out.append(self.items.pop(0))\n        self.not_full.notify()\n        self.lock.release()\n        yield\n",
   "tests": [
    {
     "label": "One producer, one consumer, in order",
     "type": "assert",
     "code": "for seed in range(100):\n    buf = BoundedBuffer(2)\n    out = []\n    def producer():\n        for k in range(6):\n            yield from buf.put(k)\n    def consumer():\n        for _ in range(6):\n            yield from buf.get(out)\n    run([consumer(), producer()], seed=seed)\n    assert out == list(range(6)), (seed, out)\n"
    },
    {
     "label": "Never over capacity",
     "type": "assert",
     "code": "for seed in range(100):\n    buf = BoundedBuffer(1)\n    out = []\n    def producer(p):\n        for k in range(4):\n            yield from buf.put((p, k))\n            assert len(buf.items) <= 1, buf.items\n    def consumer():\n        for _ in range(4):\n            yield from buf.get(out)\n    run([producer(0), producer(1), consumer(), consumer()], seed=seed)\n    assert sorted(out) == [(p, k) for p in range(2) for k in range(4)], (seed, out)\n"
    },
    {
     "label": "Consumers that start first wait",
     "type": "assert",
     "code": "buf = BoundedBuffer(3)\nout = []\ndef consumer():\n    yield from buf.get(out)\ndef producer():\n    for k in \"abc\":\n        yield from buf.put(k)\nrun([consumer(), consumer(), consumer(), producer()], schedule=[0, 1, 2, 0, 1, 2])\nassert sorted(out) == [\"a\", \"b\", \"c\"], out\n"
    },
    {
     "label": "Many producers and consumers",
     "type": "assert",
     "hidden": true,
     "code": "for seed in range(60):\n    buf = BoundedBuffer(2)\n    out = []\n    def producer(p):\n        for k in range(5):\n            yield from buf.put((p, k))\n            assert len(buf.items) <= 2\n    def consumer(n):\n        for _ in range(n):\n            yield from buf.get(out)\n    run([producer(0), producer(1), producer(2), consumer(7), consumer(8)], seed=seed)\n    assert sorted(out) == [(p, k) for p in range(3) for k in range(5)]\n    for p in range(3):\n        assert [k for q, k in out if q == p] == list(range(5)), out\n"
    }
   ]
  }
 ],
 "os5": [
  {
   "id": "bankers",
   "title": "The banker's algorithm",
   "prompt": "<p>Write <code>safe_sequence(available, allocation, maximum)</code>. <code>available</code> is a list of free units per resource type; <code>allocation[i]</code> and <code>maximum[i]</code> are lists giving what process <em>i</em> holds and the most it may ever hold. Return a safe sequence as a list of process indexes, built by repeatedly choosing the <em>lowest-numbered</em> unfinished process whose remaining need (maximum − allocation) fits in what is currently available, and returning its allocation to the pool. Return <code>None</code> if the state is unsafe.</p>\n<p>Then write <code>grant(available, allocation, maximum, i, request)</code>, which says whether the banker should grant process <em>i</em>'s request now: raise <code>ValueError</code> if the request exceeds the process's remaining need; return <code>False</code> if it exceeds what is available or if granting it would leave an unsafe state; otherwise return <code>True</code>. Don't modify the arguments.</p>",
   "starter": "def safe_sequence(available, allocation, maximum):\n    pass\n\ndef grant(available, allocation, maximum, i, request):\n    pass\n",
   "hint": "<p>Copy <code>available</code> into a working list. Loop: scan the processes in order for the first unfinished one with every need ≤ work; if there is none, stop. For <code>grant</code>, build new lists with the request moved from available to process <em>i</em>'s allocation and call <code>safe_sequence</code> on them.</p>",
   "solution": "def safe_sequence(available, allocation, maximum):\n    work = list(available)\n    n = len(allocation)\n    need = [[m - a for m, a in zip(maximum[i], allocation[i])] for i in range(n)]\n    done = [False] * n\n    seq = []\n    while len(seq) < n:\n        for i in range(n):\n            if not done[i] and all(x <= w for x, w in zip(need[i], work)):\n                work = [w + a for w, a in zip(work, allocation[i])]\n                done[i] = True\n                seq.append(i)\n                break\n        else:\n            return None\n    return seq\n\ndef grant(available, allocation, maximum, i, request):\n    need = [m - a for m, a in zip(maximum[i], allocation[i])]\n    if any(r > x for r, x in zip(request, need)):\n        raise ValueError(\"request exceeds declared maximum\")\n    if any(r > a for r, a in zip(request, available)):\n        return False\n    avail = [a - r for a, r in zip(available, request)]\n    alloc = [list(row) for row in allocation]\n    alloc[i] = [a + r for a, r in zip(alloc[i], request)]\n    return safe_sequence(avail, alloc, maximum) is not None\n",
   "tests": [
    {
     "label": "The notes' example",
     "call": "safe_sequence([3, 3, 2], [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]], [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]])",
     "expect": "[1, 3, 0, 2, 4]"
    },
    {
     "label": "An unsafe state",
     "call": "safe_sequence([1, 0], [[1, 1], [1, 1]], [[3, 2], [2, 3]])",
     "expect": "None"
    },
    {
     "label": "A request that is safe",
     "call": "grant([3, 3, 2], [[0, 1, 0], [2, 0, 0], [3, 0, 2], [2, 1, 1], [0, 0, 2]], [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]], 1, [1, 0, 2])",
     "expect": "True"
    },
    {
     "label": "A request that would be unsafe",
     "call": "grant([2, 3, 0], [[0, 1, 0], [3, 0, 2], [3, 0, 2], [2, 1, 1], [0, 0, 2]], [[7, 5, 3], [3, 2, 2], [9, 0, 2], [2, 2, 2], [4, 3, 3]], 0, [0, 2, 0])",
     "expect": "False"
    },
    {
     "label": "More than is available",
     "call": "grant([1, 0], [[0, 0]], [[2, 2]], 0, [0, 1])",
     "expect": "False"
    },
    {
     "label": "More than declared",
     "type": "raises",
     "call": "grant([5, 5], [[1, 1]], [[2, 2]], 0, [2, 0])",
     "error": "ValueError"
    },
    {
     "label": "Arguments are unchanged",
     "type": "assert",
     "hidden": true,
     "code": "av, al, mx = [3, 3, 2], [[0, 1, 0], [2, 0, 0]], [[7, 5, 3], [3, 2, 2]]\ngrant(av, al, mx, 1, [1, 0, 2]); safe_sequence(av, al, mx)\nassert av == [3, 3, 2] and al == [[0, 1, 0], [2, 0, 0]], (av, al)\n"
    }
   ]
  },
  {
   "id": "wait_for",
   "title": "Detecting deadlock",
   "prompt": "<p>With one instance of each resource, deadlock is a cycle in the <em>wait-for graph</em>, which has an edge P → Q when process P waits for a resource that Q holds. Write <code>wait_for_graph(holds, wants)</code>: <code>holds</code> maps each held resource to the process holding it, and <code>wants</code> maps each process to the list of resources it is waiting for. Return a dict mapping every process that appears (in either argument) to the sorted list of processes it waits for.</p>\n<p>Then write <code>deadlocked(graph)</code> returning the sorted list of processes that can never run again: those on a cycle, and those waiting (directly or through others) for one of them. A process waits until it gets <em>every</em> resource it asked for.</p>",
   "starter": "def wait_for_graph(holds, wants):\n    pass\n\ndef deadlocked(graph):\n    pass\n",
   "hint": "<p>The reverse question is easier: which processes can finish? A process with no outgoing edges can run; once it finishes, it releases its resources, so remove it from the graph and repeat. Whatever is left can never finish. (A wanted resource that nobody holds is free, so it adds no edge.) To make this fast, count each process's unfinished targets and keep, for each process, the list of processes waiting for it: this is the topological sort of CS 201 Lesson 7, run on the wait-for graph.</p>",
   "solution": "def wait_for_graph(holds, wants):\n    procs = set(holds.values()) | set(wants)\n    g = {p: set() for p in procs}\n    for p, rs in wants.items():\n        for r in rs:\n            q = holds.get(r)\n            if q is not None and q != p:\n                g[p].add(q)\n    return {p: sorted(qs) for p, qs in g.items()}\n\ndef deadlocked(graph):\n    out = {p: set(qs) for p, qs in graph.items()}\n    for qs in graph.values():\n        for q in qs:\n            out.setdefault(q, set())\n    waiters = {p: [] for p in out}\n    for p, qs in out.items():\n        for q in qs:\n            waiters[q].append(p)\n    pending = {p: len(qs) for p, qs in out.items()}\n    ready = [p for p in out if pending[p] == 0]\n    finished = set()\n    while ready:\n        q = ready.pop()\n        finished.add(q)\n        for p in waiters[q]:\n            pending[p] -= 1\n            if pending[p] == 0:\n                ready.append(p)\n    return sorted(p for p in out if p not in finished)\n",
   "tests": [
    {
     "label": "Building the graph",
     "call": "wait_for_graph({'r1': 'A', 'r2': 'B', 'r3': 'B'}, {'A': ['r2', 'r3'], 'C': ['r1', 'r4']})",
     "expect": "{'A': ['B'], 'B': [], 'C': ['A']}"
    },
    {
     "label": "A two-process cycle",
     "call": "deadlocked({'A': ['B'], 'B': ['A']})",
     "expect": "['A', 'B']"
    },
    {
     "label": "No cycle, no deadlock",
     "call": "deadlocked({'A': ['B'], 'B': ['C'], 'C': []})",
     "expect": "[]"
    },
    {
     "label": "Waiting for a deadlocked process",
     "call": "deadlocked({'A': ['B'], 'B': ['C'], 'C': ['B'], 'D': ['E'], 'E': []})",
     "expect": "['A', 'B', 'C']"
    },
    {
     "label": "Dining philosophers who all hold their left fork",
     "call": "deadlocked(wait_for_graph({f'f{i}': f'P{i}' for i in range(5)}, {f'P{i}': [f'f{(i + 1) % 5}'] for i in range(5)}))",
     "expect": "['P0', 'P1', 'P2', 'P3', 'P4']"
    },
    {
     "label": "A large chain is fast",
     "type": "assert",
     "hidden": true,
     "limit": 5,
     "code": "g = {i: [i + 1] for i in range(3000)}\ng[3000] = []\nassert deadlocked(g) == []\ng[3000] = [2999]\nassert deadlocked(g) == list(range(3001))\n"
    }
   ]
  }
 ],
 "os6": [
  {
   "id": "page_replacement",
   "title": "Counting page faults",
   "prompt": "<p>Write <code>faults(refs, frames, policy)</code> returning the number of page faults when the page references in <code>refs</code> run with <code>frames</code> physical frames, starting empty. <code>policy</code> is one of:</p>\n<ul>\n<li><code>\"FIFO\"</code>: evict the page that was loaded earliest;</li>\n<li><code>\"LRU\"</code>: evict the page used least recently;</li>\n<li><code>\"OPT\"</code>: evict the page whose next use is farthest in the future (or that is never used again; if several are never used again, which one goes doesn't change the count);</li>\n<li><code>\"CLOCK\"</code>: the frames form a circle with a hand, and each has a use bit. A hit sets the page's use bit to 1. On a fault with a free frame, fill the next free frame and set its bit to 1. When all are full, look at the frame under the hand: if its bit is 1, clear it and move the hand on; if it is 0, replace that page, set the bit to 1 and move the hand one place past it.</li>\n</ul>",
   "starter": "def faults(refs, frames, policy):\n    pass\n",
   "hint": "<p>For FIFO and LRU, an <code>OrderedDict</code> or a list in eviction order works: LRU moves a page to the end on every hit, FIFO doesn't. For OPT, for each resident page find the index of its next use after the current position (use <code>len(refs)</code> if none) and evict the largest. For CLOCK, keep a list of pages, a list of bits and an integer hand.</p>",
   "solution": "def faults(refs, frames, policy):\n    count = 0\n    if policy in (\"FIFO\", \"LRU\"):\n        order = []\n        for p in refs:\n            if p in order:\n                if policy == \"LRU\":\n                    order.remove(p); order.append(p)\n                continue\n            count += 1\n            if len(order) == frames:\n                order.pop(0)\n            order.append(p)\n    elif policy == \"OPT\":\n        resident = set()\n        for i, p in enumerate(refs):\n            if p in resident:\n                continue\n            count += 1\n            if len(resident) == frames:\n                def next_use(q):\n                    for j in range(i + 1, len(refs)):\n                        if refs[j] == q:\n                            return j\n                    return len(refs)\n                resident.remove(max(resident, key=next_use))\n            resident.add(p)\n    elif policy == \"CLOCK\":\n        pages, bits, hand = [], [], 0\n        for p in refs:\n            if p in pages:\n                bits[pages.index(p)] = 1\n                continue\n            count += 1\n            if len(pages) < frames:\n                pages.append(p); bits.append(1)\n                continue\n            while bits[hand]:\n                bits[hand] = 0\n                hand = (hand + 1) % frames\n            pages[hand], bits[hand] = p, 1\n            hand = (hand + 1) % frames\n    else:\n        raise ValueError(policy)\n    return count\n",
   "tests": [
    {
     "label": "The notes' reference string",
     "type": "assert",
     "code": "refs = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2]\ngot = {p: faults(refs, 3, p) for p in (\"FIFO\", \"LRU\", \"OPT\", \"CLOCK\")}\nassert got == {\"FIFO\": 10, \"LRU\": 9, \"OPT\": 7, \"CLOCK\": 9}, got\n"
    },
    {
     "label": "Belady's anomaly under FIFO",
     "type": "assert",
     "code": "refs = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]\nassert faults(refs, 3, \"FIFO\") == 9, faults(refs, 3, \"FIFO\")\nassert faults(refs, 4, \"FIFO\") == 10, faults(refs, 4, \"FIFO\")\n"
    },
    {
     "label": "No anomaly for LRU and OPT",
     "type": "assert",
     "code": "refs = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5]\nassert [faults(refs, k, \"LRU\") for k in (3, 4)] == [10, 8]\nassert [faults(refs, k, \"OPT\") for k in (3, 4)] == [7, 6]\n"
    },
    {
     "label": "A loop one page too big for memory",
     "type": "assert",
     "code": "refs = [0, 1, 2, 3] * 5\nassert faults(refs, 3, \"LRU\") == 20\nassert faults(refs, 3, \"FIFO\") == 20\nassert faults(refs, 3, \"OPT\") == 9\nassert faults(refs, 4, \"CLOCK\") == 4\n"
    },
    {
     "label": "OPT is never beaten",
     "type": "assert",
     "hidden": true,
     "code": "import random\nrng = random.Random(7)\nfor _ in range(200):\n    refs = [rng.randrange(6) for _ in range(25)]\n    k = rng.randint(1, 5)\n    o = faults(refs, k, \"OPT\")\n    for p in (\"FIFO\", \"LRU\", \"CLOCK\"):\n        assert o <= faults(refs, k, p), (refs, k, p)\n    assert faults(refs, k, \"LRU\") >= faults(refs, k + 1, \"LRU\")\n"
    }
   ]
  },
  {
   "id": "page_walk",
   "title": "Walking a multi-level page table",
   "prompt": "<p>Simulate a two-level page table like 32-bit x86's. A virtual address has a 10-bit level-1 index, a 10-bit level-2 index and a 12-bit offset. Physical memory is a dict <code>mem</code> mapping a frame number to a dict from entry index to page-table entry (a missing entry is 0). An entry is an integer: bit 0 is <em>present</em>, bit 1 <em>writable</em>, bit 2 <em>user</em>, and bits 12 and up hold a frame number (<code>pte &gt;&gt; 12</code>).</p>\n<p>Write <code>translate(mem, root, vaddr, write=False, user=True)</code>: look up the level-1 entry in frame <code>root</code>, which gives the frame of a level-2 table, whose entry gives the data frame. Return the physical address (frame × 4096 + offset). Raise <code>PageFault</code> (defined in the starter) if an entry on the way isn't present, if <code>write</code> is true and an entry on the way isn't writable, or if <code>user</code> is true and an entry on the way isn't a user entry.</p>",
   "starter": "class PageFault(Exception):\n    pass\n\ndef translate(mem, root, vaddr, write=False, user=True):\n    pass\n",
   "hint": "<p>The indexes are <code>(vaddr &gt;&gt; 22) &amp; 0x3FF</code> and <code>(vaddr &gt;&gt; 12) &amp; 0x3FF</code>, and the offset is <code>vaddr &amp; 0xFFF</code>. Write a loop over the two indexes that checks each entry's bits and moves to frame <code>pte &gt;&gt; 12</code>.</p>",
   "solution": "class PageFault(Exception):\n    pass\n\ndef translate(mem, root, vaddr, write=False, user=True):\n    frame = root\n    for idx in ((vaddr >> 22) & 0x3FF, (vaddr >> 12) & 0x3FF):\n        pte = mem.get(frame, {}).get(idx, 0)\n        if not pte & 1:\n            raise PageFault(f\"not present at {hex(vaddr)}\")\n        if write and not pte & 2:\n            raise PageFault(f\"write to read-only page at {hex(vaddr)}\")\n        if user and not pte & 4:\n            raise PageFault(f\"kernel-only page at {hex(vaddr)}\")\n        frame = pte >> 12\n    return frame * 4096 + (vaddr & 0xFFF)\n",
   "tests": [
    {
     "label": "The notes' walk",
     "call": "translate({5: {1: (9 << 12) | 7}, 9: {2: (0x42 << 12) | 7}}, 5, 0x00402ABC)",
     "expect": "0x42ABC"
    },
    {
     "label": "Missing level-2 table",
     "type": "raises",
     "call": "translate({5: {}}, 5, 0x00402ABC)",
     "error": "PageFault"
    },
    {
     "label": "Missing page",
     "type": "raises",
     "call": "translate({5: {1: (9 << 12) | 7}, 9: {}}, 5, 0x00402ABC)",
     "error": "PageFault"
    },
    {
     "label": "Read-only page: reads work, writes fault",
     "type": "assert",
     "code": "mem = {5: {1: (9 << 12) | 7}, 9: {2: (0x42 << 12) | 5}}\nassert translate(mem, 5, 0x00402000) == 0x42000\ntry:\n    translate(mem, 5, 0x00402000, write=True)\nexcept PageFault:\n    pass\nelse:\n    raise AssertionError(\"write to a read-only page must fault\")\n"
    },
    {
     "label": "Kernel pages: only the kernel may use them",
     "type": "assert",
     "code": "mem = {1: {1023: (2 << 12) | 3}, 2: {1023: (7 << 12) | 3}}\nassert translate(mem, 1, 0xFFFFFFFF, user=False) == 0x7FFF\ntry:\n    translate(mem, 1, 0xFFFFFFFF)\nexcept PageFault:\n    pass\nelse:\n    raise AssertionError(\"user access to a kernel page must fault\")\n"
    },
    {
     "label": "Permissions are checked at both levels",
     "type": "raises",
     "hidden": true,
     "call": "translate({5: {0: (9 << 12) | 5}, 9: {0: (3 << 12) | 7}}, 5, 0x123, write=True)",
     "error": "PageFault"
    }
   ]
  }
 ],
 "os7": [
  {
   "id": "inode_fs",
   "title": "A tiny inode file system",
   "prompt": "<p>Write class <code>FS(nblocks, block_size, ninodes)</code>: a file system with one directory, stored on a simulated disk of <code>nblocks</code> blocks (a list of <code>bytes</code>), with a free-block bitmap and <code>ninodes</code> inodes numbered from 1. Each inode records its size, its link count, up to 4 <em>direct</em> block numbers and one <em>indirect</em> block. When a file needs more than 4 data blocks, allocate the indirect block and store in it the numbers of the further data blocks, as 4-byte little-endian integers, so it holds <code>block_size // 4</code> of them.</p>\n<ul>\n<li><code>create(name)</code>: allocate the lowest free inode for an empty file and return its number. <code>FileExistsError</code> if the name exists; <code>OSError</code> if no inode is free.</li>\n<li><code>write(name, data)</code>: replace the file's contents with the bytes <code>data</code>. Free the old blocks, then allocate the lowest-numbered free blocks one at a time, in order: the first 4 data blocks, then the indirect block (if needed), then the rest. Because the old blocks are freed first, they count as available: there is enough space if the blocks the new contents need (data blocks, plus the indirect block if any) are at most the free blocks plus the blocks the file holds now (its data blocks and its indirect block, if any). So overwriting a 3-block file with 3 blocks of new data succeeds even on a full disk. If there isn't enough space or the file would be too large, raise <code>OSError</code> and leave the file and the bitmap unchanged.</li>\n<li><code>read(name)</code> returns the contents. <code>link(old, new)</code> adds a second name for the same inode. <code>unlink(name)</code> removes a name; when an inode's link count reaches 0, free it and its blocks.</li>\n<li><code>stat(name)</code> returns <code>{\"inode\": n, \"size\": s, \"links\": k, \"blocks\": [data block numbers in order], \"indirect\": block number or None}</code>, and <code>free_blocks()</code> returns the number of free blocks.</li>\n</ul>\n<p>Unknown names raise <code>FileNotFoundError</code>.</p>",
   "starter": "class FS:\n    def __init__(self, nblocks, block_size, ninodes):\n        pass\n",
   "hint": "<p>Keep <code>self.disk = [bytes(block_size)] * nblocks</code>, <code>self.bitmap = [False] * nblocks</code>, a dict of inodes and a dict for the directory. In <code>write</code>, first work out how many data blocks are needed (<code>-(-len(data) // block_size)</code>) and whether an indirect block is needed, check that this total is at most <code>free_blocks()</code> plus the number of blocks (data and indirect) the file holds now, and only then change anything. Read the indirect block back with <code>int.from_bytes(block[4*k:4*k+4], \"little\")</code>.</p>",
   "solution": "class FS:\n    DIRECT = 4\n\n    def __init__(self, nblocks, block_size, ninodes):\n        self.bs = block_size\n        self.disk = [bytes(block_size)] * nblocks\n        self.bitmap = [False] * nblocks\n        self.ninodes = ninodes\n        self.inodes = {}\n        self.dir = {}\n\n    def _inode(self, name):\n        if name not in self.dir:\n            raise FileNotFoundError(name)\n        return self.inodes[self.dir[name]]\n\n    def _alloc(self):\n        b = self.bitmap.index(False)\n        self.bitmap[b] = True\n        return b\n\n    def _data_blocks(self, ino):\n        blocks = list(ino[\"direct\"])\n        if ino[\"indirect\"] is not None:\n            raw = self.disk[ino[\"indirect\"]]\n            count = (-(-ino[\"size\"] // self.bs)) - len(blocks)\n            blocks += [int.from_bytes(raw[4 * k:4 * k + 4], \"little\") for k in range(count)]\n        return blocks\n\n    def _free_all(self, ino):\n        for b in self._data_blocks(ino):\n            self.bitmap[b] = False\n        if ino[\"indirect\"] is not None:\n            self.bitmap[ino[\"indirect\"]] = False\n        ino[\"direct\"], ino[\"indirect\"], ino[\"size\"] = [], None, 0\n\n    def create(self, name):\n        if name in self.dir:\n            raise FileExistsError(name)\n        free = [n for n in range(1, self.ninodes + 1) if n not in self.inodes]\n        if not free:\n            raise OSError(\"no free inodes\")\n        n = free[0]\n        self.inodes[n] = {\"size\": 0, \"links\": 1, \"direct\": [], \"indirect\": None}\n        self.dir[name] = n\n        return n\n\n    def write(self, name, data):\n        ino = self._inode(name)\n        need = -(-len(data) // self.bs)\n        per = self.bs // 4\n        if need > self.DIRECT + per:\n            raise OSError(\"file too large\")\n        total = need + (1 if need > self.DIRECT else 0)\n        old = len(self._data_blocks(ino)) + (ino[\"indirect\"] is not None)\n        if total > self.bitmap.count(False) + old:\n            raise OSError(\"no space\")\n        self._free_all(ino)\n        blocks = []\n        for k in range(need):\n            if k == self.DIRECT:\n                ino[\"indirect\"] = self._alloc()\n            b = self._alloc()\n            blocks.append(b)\n            self.disk[b] = data[k * self.bs:(k + 1) * self.bs].ljust(self.bs, b\"\\0\")\n        ino[\"direct\"] = blocks[:self.DIRECT]\n        if ino[\"indirect\"] is not None:\n            raw = b\"\".join(b.to_bytes(4, \"little\") for b in blocks[self.DIRECT:])\n            self.disk[ino[\"indirect\"]] = raw.ljust(self.bs, b\"\\0\")\n        ino[\"size\"] = len(data)\n\n    def read(self, name):\n        ino = self._inode(name)\n        return b\"\".join(self.disk[b] for b in self._data_blocks(ino))[:ino[\"size\"]]\n\n    def link(self, old, new):\n        n = self.dir.get(old)\n        if n is None:\n            raise FileNotFoundError(old)\n        if new in self.dir:\n            raise FileExistsError(new)\n        self.dir[new] = n\n        self.inodes[n][\"links\"] += 1\n\n    def unlink(self, name):\n        ino = self._inode(name)\n        n = self.dir.pop(name)\n        ino[\"links\"] -= 1\n        if ino[\"links\"] == 0:\n            self._free_all(ino)\n            del self.inodes[n]\n\n    def stat(self, name):\n        ino = self._inode(name)\n        return {\"inode\": self.dir[name], \"size\": ino[\"size\"], \"links\": ino[\"links\"],\n                \"blocks\": self._data_blocks(ino), \"indirect\": ino[\"indirect\"]}\n\n    def free_blocks(self):\n        return self.bitmap.count(False)\n",
   "tests": [
    {
     "label": "Create, write, read",
     "type": "assert",
     "code": "fs = FS(16, 8, 4)\nassert fs.create(\"a.txt\") == 1\nfs.write(\"a.txt\", b\"hello, inodes!\")\nassert fs.read(\"a.txt\") == b\"hello, inodes!\"\nassert fs.stat(\"a.txt\") == {\"inode\": 1, \"size\": 14, \"links\": 1, \"blocks\": [0, 1], \"indirect\": None}, fs.stat(\"a.txt\")\nassert fs.free_blocks() == 14\n"
    },
    {
     "label": "An indirect block",
     "type": "assert",
     "code": "fs = FS(16, 8, 4)\nfs.create(\"big\")\ndata = bytes(range(44))\nfs.write(\"big\", data)\nst = fs.stat(\"big\")\nassert st[\"blocks\"] == [0, 1, 2, 3, 5, 6] and st[\"indirect\"] == 4, st\nassert fs.read(\"big\") == data\nassert fs.disk[4][:8] == bytes([5, 0, 0, 0, 6, 0, 0, 0]), fs.disk[4]\nassert fs.free_blocks() == 9\n"
    },
    {
     "label": "Rewriting frees the old blocks",
     "type": "assert",
     "code": "fs = FS(16, 8, 4)\nfs.create(\"x\"); fs.create(\"y\")\nfs.write(\"x\", b\"a\" * 20)\nfs.write(\"y\", b\"b\" * 8)\nfs.write(\"x\", b\"c\")\nassert fs.stat(\"x\")[\"blocks\"] == [0], fs.stat(\"x\")\nassert fs.stat(\"y\")[\"blocks\"] == [3]\nassert fs.read(\"x\") == b\"c\" and fs.read(\"y\") == b\"b\" * 8\nassert fs.free_blocks() == 14\n"
    },
    {
     "label": "Hard links and unlink",
     "type": "assert",
     "code": "fs = FS(16, 8, 4)\nfs.create(\"a\"); fs.write(\"a\", b\"shared data\")\nfs.link(\"a\", \"b\")\nassert fs.stat(\"b\")[\"inode\"] == 1 and fs.stat(\"a\")[\"links\"] == 2\nfs.unlink(\"a\")\nassert fs.read(\"b\") == b\"shared data\" and fs.free_blocks() == 14\nfs.unlink(\"b\")\nassert fs.free_blocks() == 16\nassert fs.create(\"c\") == 1\n"
    },
    {
     "label": "Errors leave things unchanged",
     "type": "assert",
     "code": "fs = FS(6, 8, 2)\nfs.create(\"a\"); fs.write(\"a\", b\"x\" * 16)\nfs.create(\"b\")\nfor f, exc in ((lambda: fs.create(\"a\"), FileExistsError), (lambda: fs.create(\"c\"), OSError),\n               (lambda: fs.read(\"zz\"), FileNotFoundError), (lambda: fs.write(\"b\", b\"y\" * 40), OSError),\n               (lambda: fs.link(\"zz\", \"q\"), FileNotFoundError)):\n    try:\n        f()\n    except exc:\n        pass\n    else:\n        raise AssertionError(f\"expected {exc.__name__}\")\nassert fs.free_blocks() == 4 and fs.read(\"b\") == b\"\" and fs.read(\"a\") == b\"x\" * 16\nfs.write(\"a\", b\"z\" * 32)\nassert fs.free_blocks() == 2 and fs.read(\"a\") == b\"z\" * 32\n"
    },
    {
     "label": "Largest file",
     "type": "assert",
     "hidden": true,
     "code": "fs = FS(40, 8, 2)\nfs.create(\"f\")\nfs.write(\"f\", bytes(48))\nassert len(fs.stat(\"f\")[\"blocks\"]) == 6\ntry:\n    fs.write(\"f\", bytes(49))\nexcept OSError:\n    pass\nelse:\n    raise AssertionError(\"4 direct + 2 indirect pointers hold at most 48 bytes\")\nassert fs.read(\"f\") == bytes(48)\n"
    },
    {
     "label": "Overwriting on a full disk",
     "type": "assert",
     "code": "fs = FS(4, 8, 1)\nfs.create(\"a\"); fs.write(\"a\", b\"p\" * 24)\nfs.write(\"a\", b\"q\" * 24 + b\"r\" * 8)\nassert fs.free_blocks() == 0 and fs.read(\"a\") == b\"q\" * 24 + b\"r\" * 8\nfs.write(\"a\", b\"s\" * 32)\nassert fs.free_blocks() == 0 and fs.read(\"a\") == b\"s\" * 32\ntry:\n    fs.write(\"a\", b\"t\" * 33)\nexcept OSError:\n    pass\nelse:\n    raise AssertionError(\"33 bytes need 5 data blocks and an indirect block, but only 4 exist\")\nassert fs.free_blocks() == 0 and fs.read(\"a\") == b\"s\" * 32\n"
    }
   ]
  },
  {
   "id": "path_lookup",
   "title": "Path resolution",
   "prompt": "<p>A file system is given as a dict <code>inodes</code> from inode number to a tuple: <code>(\"dir\", entries)</code> where <code>entries</code> maps names to inode numbers and always includes <code>\".\"</code> and <code>\"..\"</code>; <code>(\"file\", None)</code>; or <code>(\"link\", target)</code> for a symbolic link whose target is a path string. The root directory is inode 1 (its <code>\"..\"</code> is itself).</p>\n<p>Write <code>resolve(inodes, path, cwd=1, follow=True)</code> returning the inode number that <code>path</code> names. A path starting with <code>/</code> starts at the root, otherwise at directory <code>cwd</code>; empty components (as in <code>a//b</code>) are skipped. When a component names a symbolic link, resolve its target instead, starting from the directory that contains the link (or the root, if the target starts with <code>/</code>), then continue with the remaining components. The last component's link is followed only if <code>follow</code> is true. Raise <code>FileNotFoundError</code> for a missing name, <code>NotADirectoryError</code> when a component other than the last is a file, and <code>OSError</code> after more than 8 links have been followed in one call (a loop).</p>",
   "starter": "def resolve(inodes, path, cwd=1, follow=True):\n    pass\n",
   "hint": "<p>Keep a list of components still to process and the current directory. When you meet a link, replace it with the components of its target (resetting the current directory to the root if the target is absolute) and count it.</p>",
   "solution": "def resolve(inodes, path, cwd=1, follow=True):\n    todo = [c for c in path.split(\"/\") if c]\n    cur = 1 if path.startswith(\"/\") else cwd\n    if not todo:\n        return cur\n    links = 0\n    while todo:\n        name = todo.pop(0)\n        kind, entries = inodes[cur]\n        if kind != \"dir\":\n            raise NotADirectoryError(name)\n        if name not in entries:\n            raise FileNotFoundError(name)\n        n = entries[name]\n        nkind, data = inodes[n]\n        if nkind == \"link\" and (todo or follow):\n            links += 1\n            if links > 8:\n                raise OSError(\"too many levels of symbolic links\")\n            todo = [c for c in data.split(\"/\") if c] + todo\n            if data.startswith(\"/\"):\n                cur = 1\n            if not todo:\n                return cur\n            continue\n        cur = n\n    return cur\n",
   "tests": [
    {
     "label": "Absolute, relative, . and ..",
     "type": "assert",
     "setup": "\n",
     "code": "I = {1: (\"dir\", {\".\": 1, \"..\": 1, \"home\": 2, \"etc\": 3}),\n     2: (\"dir\", {\".\": 2, \"..\": 1, \"ana\": 4}),\n     3: (\"dir\", {\".\": 3, \"..\": 1, \"passwd\": 5}),\n     4: (\"dir\", {\".\": 4, \"..\": 2, \"notes.txt\": 6}),\n     5: (\"file\", None), 6: (\"file\", None)}\nassert resolve(I, \"/home/ana/notes.txt\") == 6\nassert resolve(I, \"ana/notes.txt\", cwd=2) == 6\nassert resolve(I, \"../../etc/./passwd\", cwd=4) == 5\nassert resolve(I, \"/..//home/\") == 2\nassert resolve(I, \"/\") == 1\nassert resolve(I, \"\", cwd=4) == 4\n"
    },
    {
     "label": "Symbolic links",
     "type": "assert",
     "code": "I = {1: (\"dir\", {\".\": 1, \"..\": 1, \"home\": 2, \"etc\": 3, \"h\": 7}),\n     2: (\"dir\", {\".\": 2, \"..\": 1, \"ana\": 4}),\n     3: (\"dir\", {\".\": 3, \"..\": 1, \"passwd\": 5}),\n     4: (\"dir\", {\".\": 4, \"..\": 2, \"notes.txt\": 6, \"pw\": 8, \"up\": 9}),\n     5: (\"file\", None), 6: (\"file\", None),\n     7: (\"link\", \"home/ana\"), 8: (\"link\", \"/etc/passwd\"), 9: (\"link\", \"..\")}\nassert resolve(I, \"/h/notes.txt\") == 6\nassert resolve(I, \"/h/pw\") == 5\nassert resolve(I, \"/h/pw\", follow=False) == 8\nassert resolve(I, \"/h/up/ana/up/../etc\") == 3\nassert resolve(I, \"/h\", follow=False) == 7\n"
    },
    {
     "label": "Errors",
     "type": "assert",
     "code": "I = {1: (\"dir\", {\".\": 1, \"..\": 1, \"f\": 2, \"loop\": 3, \"a\": 4, \"b\": 5}),\n     2: (\"file\", None), 3: (\"link\", \"loop\"), 4: (\"link\", \"b\"), 5: (\"link\", \"a\")}\nfor p, exc in ((\"/nothere\", FileNotFoundError), (\"/f/x\", NotADirectoryError),\n               (\"/loop\", OSError), (\"/a/x\", OSError)):\n    try:\n        resolve(I, p)\n    except exc:\n        pass\n    else:\n        raise AssertionError(f\"expected {exc.__name__} for {p}\")\nassert resolve(I, \"/loop\", follow=False) == 3\n"
    },
    {
     "label": "Eight links is still allowed",
     "type": "assert",
     "hidden": true,
     "code": "I = {1: (\"dir\", {\".\": 1, \"..\": 1, \"f\": 2, **{f\"l{k}\": 10 + k for k in range(9)}}), 2: (\"file\", None)}\nfor k in range(9):\n    I[10 + k] = (\"link\", f\"l{k - 1}\" if k else \"f\")\nassert resolve(I, \"/l7\") == 2\ntry:\n    resolve(I, \"/l8\")\nexcept OSError:\n    pass\nelse:\n    raise AssertionError(\"9 links must fail\")\n"
    }
   ]
  }
 ],
 "os8": [
  {
   "id": "raid_parity",
   "title": "RAID parity",
   "prompt": "<p>Blocks are <code>bytes</code> objects of equal length. Write:</p>\n<ul>\n<li><code>parity(blocks)</code>: the byte-by-byte XOR of a list of blocks.</li>\n<li><code>rebuild(stripe)</code>: <code>stripe</code> is a list of data blocks followed by their parity block, with exactly one entry replaced by <code>None</code> (a failed disk). Return the full stripe with that block reconstructed. Raise <code>ValueError</code> unless exactly one entry is <code>None</code>.</li>\n<li><code>small_write(old_data, new_data, old_parity)</code>: the new parity after one data block changes, computed from these three blocks only (the RAID-5 small-write shortcut).</li>\n<li><code>parity_disk(stripe, ndisks)</code>: in the rotating RAID-5 layout of the notes, the disk holding stripe <code>stripe</code>'s parity, which is <code>(ndisks - 1 - stripe) % ndisks</code>.</li>\n</ul>",
   "starter": "def parity(blocks):\n    pass\n\ndef rebuild(stripe):\n    pass\n\ndef small_write(old_data, new_data, old_parity):\n    pass\n\ndef parity_disk(stripe, ndisks):\n    pass\n",
   "hint": "<p><code>bytes(a ^ b for a, b in zip(x, y))</code> XORs two blocks; fold that over the list. The missing block is the XOR of all the others, whether it held data or parity.</p>",
   "solution": "from functools import reduce\n\ndef _xor(x, y):\n    return bytes(a ^ b for a, b in zip(x, y))\n\ndef parity(blocks):\n    return reduce(_xor, blocks)\n\ndef rebuild(stripe):\n    missing = [i for i, b in enumerate(stripe) if b is None]\n    if len(missing) != 1:\n        raise ValueError(\"exactly one block must be missing\")\n    out = list(stripe)\n    out[missing[0]] = parity([b for b in stripe if b is not None])\n    return out\n\ndef small_write(old_data, new_data, old_parity):\n    return _xor(_xor(old_data, new_data), old_parity)\n\ndef parity_disk(stripe, ndisks):\n    return (ndisks - 1 - stripe) % ndisks\n",
   "tests": [
    {
     "label": "Parity of three blocks",
     "call": "parity([b'\\x0f\\xf0', b'\\x01\\x02', b'\\x10\\x20'])",
     "expect": "b'\\x1e\\xd2'"
    },
    {
     "label": "Rebuilding a data block",
     "call": "rebuild([b'ab', None, b'ef', bytes([ord('a') ^ ord('c') ^ ord('e'), ord('b') ^ ord('d') ^ ord('f')])])",
     "expect": "[b'ab', b'cd', b'ef', bytes([ord('a') ^ ord('c') ^ ord('e'), ord('b') ^ ord('d') ^ ord('f')])]"
    },
    {
     "label": "Rebuilding the parity block",
     "call": "rebuild([b'\\x01', b'\\x02', None])",
     "expect": "[b'\\x01', b'\\x02', b'\\x03']"
    },
    {
     "label": "Small write agrees with full recomputation",
     "type": "assert",
     "code": "import random\nrng = random.Random(3)\nfor _ in range(50):\n    data = [bytes(rng.randrange(256) for _ in range(16)) for _ in range(4)]\n    p = parity(data)\n    new = bytes(rng.randrange(256) for _ in range(16))\n    k = rng.randrange(4)\n    p2 = small_write(data[k], new, p)\n    data[k] = new\n    assert p2 == parity(data)\n    lost = rng.randrange(5)\n    stripe = data + [p2]\n    broken = stripe[:lost] + [None] + stripe[lost + 1:]\n    assert rebuild(broken) == stripe\n"
    },
    {
     "label": "Two failures can't be rebuilt",
     "type": "raises",
     "call": "rebuild([None, None, b'x'])",
     "error": "ValueError"
    },
    {
     "label": "Parity rotates across disks",
     "call": "[parity_disk(s, 4) for s in range(6)]",
     "expect": "[3, 2, 1, 0, 3, 2]"
    }
   ]
  },
  {
   "id": "storage_latency",
   "title": "Disk and SSD latency",
   "prompt": "<p>Write three functions, using decimal units (1 KB = 1,000 bytes, 1 MB = 1,000,000 bytes) and returning milliseconds:</p>\n<ul>\n<li><code>hdd_ms(kb, rpm=7200, seek_ms=4.0, mb_per_s=200, sequential=False)</code>: a hard disk read of <code>kb</code> kilobytes. A random read pays the average seek, the average rotational delay (half a revolution) and the transfer time; a sequential read (the head is already in place) pays only the transfer time.</li>\n<li><code>ssd_ms(kb, latency_us=100, mb_per_s=2000)</code>: a fixed access latency (in microseconds) plus the transfer time.</li>\n<li><code>iops(ms)</code>: how many such operations complete per second, one at a time.</li>\n</ul>",
   "starter": "def hdd_ms(kb, rpm=7200, seek_ms=4.0, mb_per_s=200, sequential=False):\n    pass\n\ndef ssd_ms(kb, latency_us=100, mb_per_s=2000):\n    pass\n\ndef iops(ms):\n    pass\n",
   "hint": "<p>One revolution takes 60,000 / rpm milliseconds. Transferring <code>kb</code> KB at <code>mb_per_s</code> MB/s takes <code>kb / 1000 / mb_per_s</code> seconds, which is <code>kb / mb_per_s</code> milliseconds.</p>",
   "solution": "def hdd_ms(kb, rpm=7200, seek_ms=4.0, mb_per_s=200, sequential=False):\n    transfer = kb / mb_per_s\n    if sequential:\n        return transfer\n    return seek_ms + 0.5 * 60000 / rpm + transfer\n\ndef ssd_ms(kb, latency_us=100, mb_per_s=2000):\n    return latency_us / 1000 + kb / mb_per_s\n\ndef iops(ms):\n    return 1000 / ms\n",
   "tests": [
    {
     "label": "A random 4 KB disk read",
     "call": "round(hdd_ms(4), 4)",
     "expect": "8.1867"
    },
    {
     "label": "Random disk IOPS",
     "call": "round(iops(hdd_ms(4)))",
     "expect": "122"
    },
    {
     "label": "Sequential 1 MB from disk",
     "call": "hdd_ms(1000, sequential=True)",
     "expect": "5.0"
    },
    {
     "label": "A 15,000 rpm disk",
     "call": "round(hdd_ms(4, rpm=15000, seek_ms=3.5), 4)",
     "expect": "5.52"
    },
    {
     "label": "A random 4 KB SSD read",
     "call": "round(ssd_ms(4), 4)",
     "expect": "0.102"
    },
    {
     "label": "SSD IOPS",
     "call": "round(iops(ssd_ms(4)))",
     "expect": "9804"
    }
   ]
  }
 ]
});
