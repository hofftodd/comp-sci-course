/* Auto-graded programming problems for CS 410, by lesson. Generated from a Python spec, so every
   string is JSON. Python in the browser (Pyodide) can't open network connections or start threads, so
   every problem is a deterministic simulation: messages, losses, crashes and partitions come from
   explicit lists or functions given by the tests, never from real time. */
CSA.addCode("cs410", {
 "di1": [
  {
   "id": "dedup_server",
   "title": "Exactly-once effects with retries",
   "prompt": "<p>Build a key-value server whose operations take effect exactly once even when clients retry (Lesson 1), and the retrying client.</p>\n<p><code>Server()</code> starts empty. <code>handle(client, seq, op, key, arg=None)</code> runs one request:</p>\n<ul>\n<li><code>\"put\"</code> sets <code>key</code> to the string <code>arg</code> and replies <code>None</code>;</li>\n<li><code>\"append\"</code> appends <code>arg</code> to the key's value (a missing key counts as <code>\"\"</code>) and replies with the new value;</li>\n<li><code>\"get\"</code> replies with the key's value, or <code>\"\"</code> if it is missing.</li>\n</ul>\n<p>Each client numbers its requests 1, 2, 3, … and never sends request <em>k</em> + 1 before it has a reply to request <em>k</em>. So the server needs to remember, per client, only the highest <code>seq</code> it has executed and the reply it gave. If a request's <code>seq</code> equals that number, it is a retry: return the stored reply without executing it again. If it is smaller, it is an old duplicate: return <code>None</code> without executing it. Otherwise execute it and remember it.</p>\n<p><code>call(server, network, client, seq, op, key, arg=None, attempts=5)</code> is the client side. <code>network</code> is a list of what happens to each attempt, consumed from the front with <code>pop(0)</code>: <code>\"ok\"</code> (both messages arrive), <code>\"lose_request\"</code> (the server never sees it) or <code>\"lose_reply\"</code> (the server executes it but the reply is lost). An empty list means every later attempt is <code>\"ok\"</code>. Make up to <code>attempts</code> attempts and return <code>(\"ok\", reply)</code> for the first reply that arrives, or <code>(\"unknown\", None)</code> if none does.</p>",
   "starter": "class Server:\n    def __init__(self):\n        pass\n\n    def handle(self, client, seq, op, key, arg=None):\n        pass\n\n\ndef call(server, network, client, seq, op, key, arg=None, attempts=5):\n    pass\n",
   "hint": "<p>Keep two dicts in the server: the data, and <code>client -&gt; (last_seq, last_reply)</code>. In <code>call</code>, loop over attempts; take <code>network.pop(0) if network else \"ok\"</code> for each.</p>",
   "solution": "class Server:\n    def __init__(self):\n        self.data = {}\n        self.last = {}                      # client -> (seq, reply)\n\n    def handle(self, client, seq, op, key, arg=None):\n        last_seq, last_reply = self.last.get(client, (0, None))\n        if seq == last_seq:\n            return last_reply               # a retry: answer again, don't act again\n        if seq < last_seq:\n            return None                     # an old duplicate\n        if op == \"put\":\n            self.data[key] = arg\n            reply = None\n        elif op == \"append\":\n            self.data[key] = self.data.get(key, \"\") + arg\n            reply = self.data[key]\n        elif op == \"get\":\n            reply = self.data.get(key, \"\")\n        else:\n            raise ValueError(op)\n        self.last[client] = (seq, reply)\n        return reply\n\n\ndef call(server, network, client, seq, op, key, arg=None, attempts=5):\n    for _ in range(attempts):\n        fate = network.pop(0) if network else \"ok\"\n        if fate == \"lose_request\":\n            continue\n        reply = server.handle(client, seq, op, key, arg)\n        if fate == \"lose_reply\":\n            continue\n        return (\"ok\", reply)\n    return (\"unknown\", None)\n",
   "tests": [
    {
     "label": "Operations without failures",
     "type": "assert",
     "code": "s = Server()\nassert call(s, [], \"c1\", 1, \"put\", \"x\", \"a\") == (\"ok\", None)\nassert call(s, [], \"c1\", 2, \"append\", \"x\", \"b\") == (\"ok\", \"ab\")\nassert call(s, [], \"c1\", 3, \"get\", \"x\") == (\"ok\", \"ab\")\nassert call(s, [], \"c1\", 4, \"get\", \"nope\") == (\"ok\", \"\")\nassert call(s, [], \"c1\", 5, \"append\", \"y\", \"z\") == (\"ok\", \"z\")\n"
    },
    {
     "label": "A lost reply doesn't append twice",
     "type": "assert",
     "code": "s = Server()\nnet = [\"lose_reply\", \"lose_reply\", \"ok\"]\nassert call(s, net, \"c1\", 1, \"append\", \"log\", \"A\") == (\"ok\", \"A\")\nassert net == [], net\nassert call(s, [], \"c1\", 2, \"get\", \"log\") == (\"ok\", \"A\")\n"
    },
    {
     "label": "Lost requests are simply resent",
     "type": "assert",
     "code": "s = Server()\nassert call(s, [\"lose_request\", \"lose_request\"], \"c\", 1, \"append\", \"k\", \"1\") == (\"ok\", \"1\")\nassert call(s, [\"lose_request\", \"lose_reply\"], \"c\", 2, \"append\", \"k\", \"2\") == (\"ok\", \"12\")\nassert s.handle(\"c\", 3, \"get\", \"k\") == \"12\"\n"
    },
    {
     "label": "Giving up returns unknown",
     "type": "assert",
     "code": "s = Server()\nassert call(s, [\"lose_reply\"] * 3, \"c\", 1, \"append\", \"k\", \"v\", attempts=3) == (\"unknown\", None)\n# it did happen once, though\nassert s.handle(\"c\", 2, \"get\", \"k\") == \"v\"\n"
    },
    {
     "label": "Old duplicates are ignored; clients are separate",
     "type": "assert",
     "code": "s = Server()\nassert s.handle(\"a\", 1, \"append\", \"k\", \"x\") == \"x\"\nassert s.handle(\"b\", 1, \"append\", \"k\", \"y\") == \"xy\"\nassert s.handle(\"a\", 2, \"append\", \"k\", \"z\") == \"xyz\"\nassert s.handle(\"a\", 1, \"append\", \"k\", \"x\") is None\nassert s.handle(\"a\", 2, \"append\", \"k\", \"z\") == \"xyz\"\nassert s.handle(\"b\", 2, \"get\", \"k\") == \"xyz\"\n"
    },
    {
     "label": "Many clients, many losses",
     "type": "assert",
     "hidden": true,
     "code": "s = Server()\nfates = [\"ok\", \"lose_reply\", \"lose_request\", \"lose_reply\", \"ok\"]\nfor i in range(1, 21):\n    for c in (\"p\", \"q\"):\n        net = [fates[(i + j + len(c)) % 5] for j in range(3)]\n        r = call(s, net, c, i, \"append\", \"log\", c)\n        assert r[0] == \"ok\", r\nv = s.handle(\"p\", 21, \"get\", \"log\")\nassert v.count(\"p\") == 20 and v.count(\"q\") == 20, v\n"
    }
   ]
  },
  {
   "id": "sim_network",
   "title": "A simulated network",
   "prompt": "<p>Distributed algorithms are tested on simulated networks, where delays, losses and partitions are under the test's control. Write a class <code>Network</code>:</p>\n<ul>\n<li><code>Network(delay)</code>: <code>delay(src, dst, n)</code> is a function the test supplies, called once for the <em>n</em>th message sent (counting from 0). It returns the message's delay (a number of time units), or <code>None</code> if the message is lost.</li>\n<li><code>send(now, src, dst, msg)</code> sends <code>msg</code> at time <code>now</code>. Unless it is lost, it will be delivered at <code>now + delay</code>. Call <code>delay</code> for every message sent, even one that the partition (below) drops, so that message numbers don't depend on partitions.</li>\n<li><code>partition(*groups)</code>, given sets of node names, cuts the network: from now on a message is dropped when it is sent, unless its source and destination are in the same group. A node in no group can reach no one. <code>heal()</code> removes the partition. (Messages already in flight are unaffected.)</li>\n<li><code>deliver()</code> removes and returns the next message to arrive as a tuple <code>(time, src, dst, msg)</code>: the one with the earliest delivery time, and among equal times the one sent first. Return <code>None</code> if no message is in flight.</li>\n<li><code>in_flight()</code> returns the number of messages waiting to be delivered.</li>\n</ul>\n<p>Messages can therefore overtake each other: a message with a short delay sent later arrives first.</p>",
   "starter": "class Network:\n    def __init__(self, delay):\n        pass\n\n    def send(self, now, src, dst, msg):\n        pass\n\n    def partition(self, *groups):\n        pass\n\n    def heal(self):\n        pass\n\n    def deliver(self):\n        pass\n\n    def in_flight(self):\n        pass\n",
   "hint": "<p>Keep the in-flight messages in a heap (CS 201's <code>heapq</code>) of tuples <code>(time, n, src, dst, msg)</code>: the message number <code>n</code> breaks ties by send order, and also means the heap never has to compare two messages. For the partition, map each node to the index of its group.</p>",
   "solution": "import heapq\n\nclass Network:\n    def __init__(self, delay):\n        self.delay = delay\n        self.heap = []\n        self.count = 0\n        self.group = None                    # node -> group index, or None if no partition\n\n    def _connected(self, a, b):\n        if self.group is None:\n            return True\n        return a in self.group and b in self.group and self.group[a] == self.group[b]\n\n    def send(self, now, src, dst, msg):\n        n = self.count\n        self.count += 1\n        d = self.delay(src, dst, n)\n        if d is None or not self._connected(src, dst):\n            return\n        heapq.heappush(self.heap, (now + d, n, src, dst, msg))\n\n    def partition(self, *groups):\n        self.group = {node: i for i, g in enumerate(groups) for node in g}\n\n    def heal(self):\n        self.group = None\n\n    def deliver(self):\n        if not self.heap:\n            return None\n        t, n, src, dst, msg = heapq.heappop(self.heap)\n        return (t, src, dst, msg)\n\n    def in_flight(self):\n        return len(self.heap)\n",
   "tests": [
    {
     "label": "Fixed delay, in order",
     "type": "assert",
     "code": "net = Network(lambda s, d, n: 5)\nnet.send(0, \"a\", \"b\", \"m0\")\nnet.send(1, \"a\", \"b\", \"m1\")\nassert net.in_flight() == 2\nassert net.deliver() == (5, \"a\", \"b\", \"m0\")\nassert net.deliver() == (6, \"a\", \"b\", \"m1\")\nassert net.deliver() is None\nassert net.in_flight() == 0\n"
    },
    {
     "label": "Reordering: a later message can arrive first",
     "type": "assert",
     "code": "delays = [10, 2, 5]\nnet = Network(lambda s, d, n: delays[n])\nnet.send(0, \"a\", \"b\", \"first\")\nnet.send(1, \"a\", \"b\", \"second\")\nnet.send(1, \"c\", \"b\", \"third\")\nassert [net.deliver()[3] for _ in range(3)] == [\"second\", \"third\", \"first\"]\n"
    },
    {
     "label": "Ties go to the message sent first",
     "type": "assert",
     "code": "net = Network(lambda s, d, n: 4 - n)\nnet.send(0, \"a\", \"b\", \"x\")     # arrives at 4\nnet.send(1, \"a\", \"c\", \"y\")     # arrives at 4\nnet.send(2, \"b\", \"c\", \"z\")     # arrives at 4\nassert [net.deliver() for _ in range(3)] == [(4, \"a\", \"b\", \"x\"), (4, \"a\", \"c\", \"y\"), (4, \"b\", \"c\", \"z\")]\n"
    },
    {
     "label": "Loss",
     "type": "assert",
     "code": "net = Network(lambda s, d, n: None if n % 2 else 1)\nfor i in range(6):\n    net.send(i, \"a\", \"b\", i)\ngot = []\nwhile net.in_flight():\n    got.append(net.deliver()[3])\nassert got == [0, 2, 4], got\n"
    },
    {
     "label": "Partitions and healing",
     "type": "assert",
     "code": "calls = []\ndef delay(s, d, n):\n    calls.append(n)\n    return 1\nnet = Network(delay)\nnet.send(0, \"a\", \"b\", \"before\")\nnet.partition({\"a\", \"b\"}, {\"c\"})\nnet.send(1, \"a\", \"b\", \"same side\")\nnet.send(1, \"a\", \"c\", \"across\")\nnet.send(1, \"d\", \"a\", \"from nowhere\")\nnet.heal()\nnet.send(2, \"a\", \"c\", \"healed\")\nassert calls == [0, 1, 2, 3, 4], calls\ngot = []\nwhile net.in_flight():\n    got.append(net.deliver()[3])\nassert got == [\"before\", \"same side\", \"healed\"], got\n"
    },
    {
     "label": "A ping-pong exchange",
     "type": "assert",
     "hidden": true,
     "code": "net = Network(lambda s, d, n: 1 + n % 3)\nnet.send(0, \"p\", \"q\", 0)\nlog = []\nwhile True:\n    m = net.deliver()\n    if m is None:\n        break\n    t, src, dst, k = m\n    log.append((t, dst, k))\n    if k < 5:\n        net.send(t, dst, src, k + 1)\nassert log == [(1, \"q\", 0), (3, \"p\", 1), (6, \"q\", 2), (7, \"p\", 3), (9, \"q\", 4), (12, \"p\", 5)], log\n"
    }
   ]
  }
 ],
 "di2": [
  {
   "id": "vector_trace",
   "title": "Vector timestamps from per-process histories",
   "prompt": "<p>Lesson 2 computed vector timestamps from a trace already in a possible global order. Real logs come one per process. Write <code>vector_timestamps(procs)</code>, where <code>procs[p]</code> is the list of process <em>p</em>'s events in order, each <code>\"local\"</code>, <code>(\"send\", m)</code> or <code>(\"recv\", m)</code>, and <code>m</code> is a message name. Return a list with, for each process, the list of its events' vector timestamps as tuples.</p>\n<p>A receive can be processed only after its message's send has been. Find an order by repeatedly advancing any process whose next event isn't a receive of a message not yet sent. If no process can advance but events remain (a receive of a message that is never sent, or receives waiting for each other in a cycle), raise <code>ValueError</code>. Also raise <code>ValueError</code> if the same message name is sent twice.</p>\n<p>Also write <code>relation(u, v)</code> for two vector timestamps, returning <code>\"before\"</code> (<em>u</em> &lt; <em>v</em>), <code>\"after\"</code>, <code>\"equal\"</code> or <code>\"concurrent\"</code>.</p>\n<p>Example: <code>vector_timestamps([[(\"send\", \"m\")], [(\"recv\", \"m\"), \"local\"]])</code> returns <code>[[(1, 0)], [(1, 1), (1, 2)]]</code>.</p>",
   "starter": "def vector_timestamps(procs):\n    pass\n\n\ndef relation(u, v):\n    pass\n",
   "hint": "<p>Keep a position for each process, a vector for each process, and a dict from message name to the vector it carries. Loop while some process can take a step; inside, try each process in turn. The rules are Lesson 2's: increment your own entry for every event, and on a receive take the entrywise maximum first.</p>",
   "solution": "def vector_timestamps(procs):\n    n = len(procs)\n    pos = [0] * n\n    clock = [[0] * n for _ in range(n)]\n    sent = {}\n    out = [[] for _ in range(n)]\n    remaining = sum(len(p) for p in procs)\n    while remaining:\n        progressed = False\n        for p in range(n):\n            while pos[p] < len(procs[p]):\n                ev = procs[p][pos[p]]\n                v = clock[p]\n                if ev != \"local\" and ev[0] == \"recv\":\n                    if ev[1] not in sent:\n                        break\n                    for i in range(n):\n                        v[i] = max(v[i], sent[ev[1]][i])\n                v[p] += 1\n                if ev != \"local\" and ev[0] == \"send\":\n                    if ev[1] in sent:\n                        raise ValueError(\"message sent twice: \" + str(ev[1]))\n                    sent[ev[1]] = tuple(v)\n                out[p].append(tuple(v))\n                pos[p] += 1\n                remaining -= 1\n                progressed = True\n        if not progressed:\n            raise ValueError(\"stuck: a receive can never happen\")\n    return out\n\n\ndef relation(u, v):\n    if tuple(u) == tuple(v):\n        return \"equal\"\n    if all(a <= b for a, b in zip(u, v)):\n        return \"before\"\n    if all(a >= b for a, b in zip(u, v)):\n        return \"after\"\n    return \"concurrent\"\n",
   "tests": [
    {
     "label": "The example",
     "call": "vector_timestamps([[('send', 'm')], [('recv', 'm'), 'local']])",
     "expect": "[[(1, 0)], [(1, 1), (1, 2)]]"
    },
    {
     "label": "Lesson 2's figure",
     "call": "vector_timestamps([['local', ('send', 'm1'), 'local'], ['local', ('recv', 'm1'), ('send', 'm2')], ['local', ('recv', 'm2')]])",
     "expect": "[[(1, 0, 0), (2, 0, 0), (3, 0, 0)], [(0, 1, 0), (2, 2, 0), (2, 3, 0)], [(0, 0, 1), (2, 3, 2)]]"
    },
    {
     "label": "A receive listed before the matching send's process",
     "call": "vector_timestamps([[('recv', 'b')], [('recv', 'a'), ('send', 'b')], [('send', 'a')]])",
     "expect": "[[(1, 2, 1)], [(0, 1, 1), (0, 2, 1)], [(0, 0, 1)]]"
    },
    {
     "label": "Lesson 2's second practice problem",
     "call": "vector_timestamps([[('send', 'm1'), ('recv', 'm3')], ['local', ('recv', 'm1'), ('send', 'm2')], [('send', 'm3'), ('recv', 'm2')]])",
     "expect": "[[(1, 0, 0), (2, 0, 1)], [(0, 1, 0), (1, 2, 0), (1, 3, 0)], [(0, 0, 1), (1, 3, 2)]]"
    },
    {
     "label": "A receive that never happens",
     "type": "raises",
     "call": "vector_timestamps([[('recv', 'x')], ['local']])",
     "error": "ValueError"
    },
    {
     "label": "A cycle of receives",
     "type": "raises",
     "call": "vector_timestamps([[('recv', 'b'), ('send', 'a')], [('recv', 'a'), ('send', 'b')]])",
     "error": "ValueError"
    },
    {
     "label": "A message sent twice",
     "type": "raises",
     "call": "vector_timestamps([[('send', 'x'), ('send', 'x')], [('recv', 'x')]])",
     "error": "ValueError"
    },
    {
     "label": "relation",
     "call": "[relation((1, 2), (1, 3)), relation((2, 0), (1, 5)), relation((3, 3), (3, 3)), relation((4, 1, 0), (2, 1, 0))]",
     "expect": "['before', 'concurrent', 'equal', 'after']"
    },
    {
     "label": "A long chain is processed quickly",
     "type": "assert",
     "hidden": true,
     "code": "n = 30\nprocs = [[] for _ in range(n)]\nfor k in range(300):\n    a, b = k % n, (k + 1) % n\n    procs[a].append((\"send\", k))\n    procs[b].append((\"recv\", k))\n    procs[b].append(\"local\")\nts = vector_timestamps(procs)\nlast = ts[300 % n][-1]\nassert relation(ts[0][0], last) == \"before\"\nassert sum(len(t) for t in ts) == 900\n"
    }
   ]
  },
  {
   "id": "causal_delivery",
   "title": "Causal broadcast",
   "prompt": "<p>Implement the receiving side of Lesson 2's causal broadcast. <code>CausalNode(n, me)</code> is process <code>me</code> of <code>n</code>, with a delivered-count vector <em>D</em> of zeros.</p>\n<ul>\n<li><code>broadcast(payload)</code> stamps the message with a copy of <em>D</em> in which entry <code>me</code> is increased by one, delivers it to itself, and returns the stamp as a tuple (the caller sends <code>(me, stamp, payload)</code> to the others).</li>\n<li><code>receive(sender, stamp, payload)</code> handles a message from another process. Deliver it if <code>stamp[sender] == D[sender] + 1</code> and <code>stamp[k] &lt;= D[k]</code> for every other <code>k</code>; otherwise buffer it. After a delivery, update <em>D</em> and look through the buffer again, in the order messages arrived, delivering the first deliverable one, until none is. Ignore a duplicate (a message with <code>stamp[sender] &lt;= D[sender]</code>, or already in the buffer). Return the list of payloads delivered by this call, in delivery order.</li>\n<li><code>delivered</code> is an attribute: the list of every payload delivered so far, including the node's own, in order.</li>\n</ul>",
   "starter": "class CausalNode:\n    def __init__(self, n, me):\n        pass\n\n    def broadcast(self, payload):\n        pass\n\n    def receive(self, sender, stamp, payload):\n        pass\n",
   "hint": "<p>Store buffered messages as <code>(sender, stamp, payload)</code> in a list. After delivering anything, loop: scan the buffer from the start for a deliverable message; if you find one, remove it, deliver it and scan again from the start; if a full scan finds nothing, stop.</p>",
   "solution": "class CausalNode:\n    def __init__(self, n, me):\n        self.n, self.me = n, me\n        self.D = [0] * n\n        self.buffer = []\n        self.delivered = []\n\n    def broadcast(self, payload):\n        stamp = list(self.D)\n        stamp[self.me] += 1\n        self.D[self.me] += 1\n        self.delivered.append(payload)\n        return tuple(stamp)\n\n    def _ok(self, sender, stamp):\n        return stamp[sender] == self.D[sender] + 1 and all(\n            stamp[k] <= self.D[k] for k in range(self.n) if k != sender)\n\n    def receive(self, sender, stamp, payload):\n        stamp = tuple(stamp)\n        if stamp[sender] <= self.D[sender] or (sender, stamp, payload) in self.buffer:\n            return []\n        self.buffer.append((sender, stamp, payload))\n        out = []\n        found = True\n        while found:\n            found = False\n            for i, (s, t, p) in enumerate(self.buffer):\n                if self._ok(s, t):\n                    del self.buffer[i]\n                    self.D[s] = t[s]\n                    self.delivered.append(p)\n                    out.append(p)\n                    found = True\n                    break\n        return out\n",
   "tests": [
    {
     "label": "The lunch example",
     "type": "assert",
     "code": "alice, bob, carol = CausalNode(3, 0), CausalNode(3, 1), CausalNode(3, 2)\nq = alice.broadcast(\"Anyone want lunch?\")\nassert q == (1, 0, 0)\nassert bob.receive(0, q, \"Anyone want lunch?\") == [\"Anyone want lunch?\"]\na = bob.broadcast(\"Yes!\")\nassert a == (1, 1, 0)\nassert carol.receive(1, a, \"Yes!\") == []\nassert carol.receive(0, q, \"Anyone want lunch?\") == [\"Anyone want lunch?\", \"Yes!\"]\nassert carol.delivered == [\"Anyone want lunch?\", \"Yes!\"]\nassert bob.delivered == [\"Anyone want lunch?\", \"Yes!\"]\n"
    },
    {
     "label": "Messages from one sender are delivered in order",
     "type": "assert",
     "code": "c = CausalNode(2, 1)\nassert c.receive(0, (3, 0), \"m3\") == []\nassert c.receive(0, (2, 0), \"m2\") == []\nassert c.receive(0, (1, 0), \"m1\") == [\"m1\", \"m2\", \"m3\"]\n"
    },
    {
     "label": "Lesson 2's fourth practice problem",
     "type": "assert",
     "code": "c = CausalNode(3, 2)\nassert c.receive(0, (2, 0, 0), \"A\") == []\nassert c.receive(1, (1, 1, 0), \"B\") == []\nassert c.receive(0, (1, 0, 0), \"C\") == [\"C\", \"A\", \"B\"]\n"
    },
    {
     "label": "Duplicates are ignored",
     "type": "assert",
     "code": "c = CausalNode(2, 0)\nassert c.receive(1, (0, 1), \"x\") == [\"x\"]\nassert c.receive(1, (0, 1), \"x\") == []\nassert c.receive(1, (0, 3), \"z\") == []\nassert c.receive(1, (0, 3), \"z\") == []\nassert c.receive(1, (0, 2), \"y\") == [\"y\", \"z\"]\nassert c.delivered == [\"x\", \"y\", \"z\"]\n"
    },
    {
     "label": "Own broadcasts count as causes",
     "type": "assert",
     "code": "a, b = CausalNode(2, 0), CausalNode(2, 1)\ns1 = a.broadcast(\"a1\")\nassert b.receive(0, s1, \"a1\") == [\"a1\"]\ns2 = b.broadcast(\"b1\")\nassert s2 == (1, 1)\nassert a.receive(1, s2, \"b1\") == [\"b1\"]\ns3 = a.broadcast(\"a2\")\nassert s3 == (2, 1)\nassert a.delivered == [\"a1\", \"b1\", \"a2\"]\n"
    },
    {
     "label": "A shuffled stream from four senders",
     "type": "assert",
     "hidden": true,
     "code": "import random\nnodes = [CausalNode(5, i) for i in range(4)]\nmsgs = []\nrng = random.Random(3)\nfor step in range(40):\n    p = rng.randrange(4)\n    stamp = nodes[p].broadcast(f\"{p}:{step}\")\n    msgs.append((p, stamp, f\"{p}:{step}\"))\n    for q in range(4):\n        if q != p:\n            nodes[q].receive(p, stamp, f\"{p}:{step}\")\nr = CausalNode(5, 4)\norder = msgs[:]\nrng.shuffle(order)\nfor m in order:\n    r.receive(*m)\nassert len(r.delivered) == 40\npos = {m: i for i, m in enumerate(r.delivered)}\nfor i, (p, s, m) in enumerate(msgs):\n    for p2, s2, m2 in msgs[i + 1:]:\n        if all(x <= y for x, y in zip(s, s2)):\n            assert pos[m] < pos[m2], (m, m2)\n"
    }
   ]
  }
 ],
 "di3": [
  {
   "id": "quorum_store",
   "title": "A quorum store with read repair",
   "prompt": "<p>Simulate a leaderless store (Lesson 3) with replicas numbered 0 to <em>n</em> − 1. <code>QuorumStore(n, w, r)</code> starts with every replica up and empty. Each replica maps keys to <code>(version, value)</code>.</p>\n<ul>\n<li><code>fail(i)</code> and <code>recover(i)</code> take replica <code>i</code> down and bring it back (with its data as it was).</li>\n<li><code>write(key, value)</code> gives the write a version one higher than the previous write to that key through this store (the first write is version 1), and stores it on every replica that is up, overwriting an older version (a replica never replaces a version with a lower one). It returns <code>True</code> if at least <code>w</code> replicas were up, else <code>False</code>. Like a real quorum store, a failed write is <em>not</em> undone on the replicas that took it.</li>\n<li><code>read(key)</code> contacts the first <code>r</code> replicas that are up, in index order. If fewer than <code>r</code> are up, raise <code>RuntimeError</code>. Otherwise return the value with the highest version among their replies (<code>None</code> if none of them has the key), and <em>read-repair</em>: store that version on each contacted replica that had an older one or none.</li>\n<li><code>replica(i)</code> returns a copy of replica <code>i</code>'s dict, for inspection.</li>\n</ul>",
   "starter": "class QuorumStore:\n    def __init__(self, n, w, r):\n        pass\n\n    def fail(self, i):\n        pass\n\n    def recover(self, i):\n        pass\n\n    def write(self, key, value):\n        pass\n\n    def read(self, key):\n        pass\n\n    def replica(self, i):\n        pass\n",
   "hint": "<p>Keep a list of dicts, a set of down replicas, and a dict of the last version used per key. Tuples compare by their first element first, so <code>max</code> of <code>(version, value)</code> pairs picks the highest version.</p>",
   "solution": "class QuorumStore:\n    def __init__(self, n, w, r):\n        self.n, self.w, self.r = n, w, r\n        self.reps = [{} for _ in range(n)]\n        self.down = set()\n        self.versions = {}\n\n    def fail(self, i):\n        self.down.add(i)\n\n    def recover(self, i):\n        self.down.discard(i)\n\n    def _store(self, i, key, vv):\n        old = self.reps[i].get(key)\n        if old is None or old[0] < vv[0]:\n            self.reps[i][key] = vv\n\n    def write(self, key, value):\n        v = self.versions.get(key, 0) + 1\n        self.versions[key] = v\n        up = [i for i in range(self.n) if i not in self.down]\n        for i in up:\n            self._store(i, key, (v, value))\n        return len(up) >= self.w\n\n    def read(self, key):\n        up = [i for i in range(self.n) if i not in self.down][:self.r]\n        if len(up) < self.r:\n            raise RuntimeError(\"not enough replicas\")\n        replies = [self.reps[i].get(key) for i in up]\n        found = [x for x in replies if x is not None]\n        if not found:\n            return None\n        best = max(found, key=lambda x: x[0])\n        for i in up:\n            self._store(i, key, best)\n        return best[1]\n\n    def replica(self, i):\n        return dict(self.reps[i])\n",
   "tests": [
    {
     "label": "Normal writes and reads",
     "type": "assert",
     "code": "s = QuorumStore(3, 2, 2)\nassert s.read(\"x\") is None\nassert s.write(\"x\", 5) is True\nassert s.read(\"x\") == 5\nassert s.write(\"x\", 8) is True\nassert s.read(\"x\") == 8\nassert s.replica(2) == {\"x\": (2, 8)}\n"
    },
    {
     "label": "Lesson 3's practice problem: read repair",
     "type": "assert",
     "code": "s = QuorumStore(3, 2, 2)\ns.write(\"x\", 5)\ns.fail(2)\nassert s.write(\"x\", 8) is True\ns.recover(2)\ns.fail(0)\nassert s.replica(2) == {\"x\": (1, 5)}\nassert s.read(\"x\") == 8            # contacts replicas 1 and 2\nassert s.replica(2) == {\"x\": (2, 8)}\n"
    },
    {
     "label": "R + W not greater than N can read stale data",
     "type": "assert",
     "code": "s = QuorumStore(3, 1, 1)\ns.write(\"k\", \"old\")\ns.fail(0)\ns.write(\"k\", \"new\")\ns.recover(0)\nassert s.read(\"k\") == \"old\"        # replica 0 alone missed the write\n"
    },
    {
     "label": "Failed writes and too few replicas",
     "type": "assert",
     "code": "s = QuorumStore(3, 2, 2)\ns.fail(1); s.fail(2)\nassert s.write(\"a\", 1) is False\nassert s.replica(0) == {\"a\": (1, 1)}   # not undone\ntry:\n    s.read(\"a\")\nexcept RuntimeError:\n    pass\nelse:\n    raise AssertionError(\"read with 1 of 2 replicas should raise\")\ns.recover(2)\nassert s.read(\"a\") == 1\nassert s.replica(2) == {\"a\": (1, 1)}\n"
    },
    {
     "label": "Only contacted replicas are repaired",
     "type": "assert",
     "code": "s = QuorumStore(5, 3, 2)\ns.fail(0); s.fail(1)\ns.write(\"k\", \"v1\")\ns.recover(0); s.recover(1)\nassert s.read(\"k\") is None         # 0 and 1 have nothing\ns.fail(1)\nassert s.read(\"k\") == \"v1\"         # 0 and 2\nassert s.replica(0) == {\"k\": (1, \"v1\")}\nassert s.replica(1) == {}\n"
    },
    {
     "label": "Versions never go backwards",
     "type": "assert",
     "hidden": true,
     "code": "s = QuorumStore(4, 2, 3)\nfor i in range(10):\n    if i % 3 == 0:\n        s.fail(i % 4)\n    s.write(\"c\", i)\n    if i % 3 == 2:\n        s.recover((i - 2) % 4)\nfor i in range(4):\n    s.recover(i)\nassert s.read(\"c\") == 9\nfor i in range(3):\n    assert s.replica(i)[\"c\"] == (10, 9)\n"
    }
   ]
  },
  {
   "id": "crdts",
   "title": "A PN-counter and an OR-set",
   "prompt": "<p>Build two state-based CRDTs (Lesson 3). Every <code>merge</code> must be commutative, associative and idempotent.</p>\n<p><code>PNCounter(n, me)</code>, replica <code>me</code> of <code>n</code>: <code>increment(k=1)</code>, <code>decrement(k=1)</code>, <code>value()</code>, and <code>merge(other)</code>, which updates this replica's state to include everything <code>other</code> has seen.</p>\n<p><code>ORSet(me)</code>, where <code>me</code> is a replica id: <code>add(x)</code> tags the element with a new unique tag <code>(me, c)</code> where <code>c</code> counts this replica's adds; <code>remove(x)</code> removes the tags of <code>x</code> this replica currently sees (marking them as removed, so a merge can't bring them back); <code>contains(x)</code>; <code>elements()</code>, the sorted list of elements present; and <code>merge(other)</code>. An element is present if it has a tag that hasn't been removed, so an add concurrent with a remove wins.</p>",
   "starter": "class PNCounter:\n    def __init__(self, n, me):\n        pass\n\n    def increment(self, k=1):\n        pass\n\n    def decrement(self, k=1):\n        pass\n\n    def value(self):\n        pass\n\n    def merge(self, other):\n        pass\n\n\nclass ORSet:\n    def __init__(self, me):\n        pass\n\n    def add(self, x):\n        pass\n\n    def remove(self, x):\n        pass\n\n    def contains(self, x):\n        pass\n\n    def elements(self):\n        pass\n\n    def merge(self, other):\n        pass\n",
   "hint": "<p>A PN-counter is two of Lesson 3's G-counters. For the OR-set, keep a set of <code>(element, tag)</code> pairs that were added and a set of tags that were removed; merge is union of both.</p>",
   "solution": "class PNCounter:\n    def __init__(self, n, me):\n        self.me = me\n        self.p = [0] * n\n        self.m = [0] * n\n\n    def increment(self, k=1):\n        self.p[self.me] += k\n\n    def decrement(self, k=1):\n        self.m[self.me] += k\n\n    def value(self):\n        return sum(self.p) - sum(self.m)\n\n    def merge(self, other):\n        self.p = [max(a, b) for a, b in zip(self.p, other.p)]\n        self.m = [max(a, b) for a, b in zip(self.m, other.m)]\n\n\nclass ORSet:\n    def __init__(self, me):\n        self.me = me\n        self.count = 0\n        self.adds = set()          # (element, tag)\n        self.removed = set()       # tags\n\n    def add(self, x):\n        self.count += 1\n        self.adds.add((x, (self.me, self.count)))\n\n    def remove(self, x):\n        for e, t in self.adds:\n            if e == x:\n                self.removed.add(t)\n\n    def contains(self, x):\n        return any(e == x and t not in self.removed for e, t in self.adds)\n\n    def elements(self):\n        return sorted({e for e, t in self.adds if t not in self.removed})\n\n    def merge(self, other):\n        self.adds |= other.adds\n        self.removed |= other.removed\n",
   "tests": [
    {
     "label": "PN-counter on one replica",
     "type": "assert",
     "code": "c = PNCounter(3, 1)\nc.increment(); c.increment(5); c.decrement(2)\nassert c.value() == 4\n"
    },
    {
     "label": "PN-counter: concurrent updates merge correctly, in any order, repeatedly",
     "type": "assert",
     "code": "a, b, c = PNCounter(3, 0), PNCounter(3, 1), PNCounter(3, 2)\na.increment(3); b.decrement(1); c.increment(10); c.decrement(4)\na.merge(b); a.merge(b)\nc.merge(a); b.merge(c); a.merge(c)\nassert a.value() == b.value() == c.value() == 8, (a.value(), b.value(), c.value())\nb.decrement(); a.merge(b); a.merge(b)\nassert a.value() == 7\n"
    },
    {
     "label": "OR-set basics",
     "type": "assert",
     "code": "s = ORSet(\"r1\")\ns.add(\"milk\"); s.add(\"eggs\")\nassert s.contains(\"milk\") and s.elements() == [\"eggs\", \"milk\"]\ns.remove(\"milk\")\nassert not s.contains(\"milk\") and s.elements() == [\"eggs\"]\ns.add(\"milk\")\nassert s.contains(\"milk\")\ns.remove(\"tea\")\nassert s.elements() == [\"eggs\", \"milk\"]\n"
    },
    {
     "label": "OR-set: a concurrent add wins over a remove",
     "type": "assert",
     "code": "a, b = ORSet(\"a\"), ORSet(\"b\")\na.add(\"x\"); b.merge(a)\na.remove(\"x\")                 # a removes the x it has seen\nb.add(\"x\")                    # concurrently, b adds x again\na.merge(b); b.merge(a)\nassert a.contains(\"x\") and b.contains(\"x\")\n"
    },
    {
     "label": "OR-set: a remove that saw every add sticks",
     "type": "assert",
     "code": "a, b = ORSet(\"a\"), ORSet(\"b\")\na.add(\"x\"); b.add(\"x\")\na.merge(b)\na.remove(\"x\")\nb.merge(a); a.merge(b)\nassert not a.contains(\"x\") and not b.contains(\"x\")\nb.merge(ORSet(\"c\"))\nassert b.elements() == []\n"
    },
    {
     "label": "OR-set merge is commutative, associative and idempotent",
     "type": "assert",
     "hidden": true,
     "code": "import copy\ndef make():\n    a, b, c = ORSet(\"a\"), ORSet(\"b\"), ORSet(\"c\")\n    a.add(1); a.add(2); b.add(2); b.remove(2); c.add(3); c.add(1)\n    a.remove(1); b.merge(c); c.add(4); b.remove(1)\n    return a, b, c\na, b, c = make()\nx = copy.deepcopy(a); x.merge(b); x.merge(c)\ny = copy.deepcopy(c); y.merge(b); y.merge(a)\nz = copy.deepcopy(b); z.merge(c); w = copy.deepcopy(a); w.merge(z); w.merge(z)\nassert x.elements() == y.elements() == w.elements(), (x.elements(), y.elements(), w.elements())\nassert x.elements() == [2, 3, 4], x.elements()\n"
    }
   ]
  }
 ],
 "di4": [
  {
   "id": "raft_append",
   "title": "Raft: handling AppendEntries",
   "prompt": "<p>Write a Raft follower's AppendEntries handler (Lesson 4), <code>append_entries(state, term, prev_index, prev_term, entries, leader_commit)</code>. <code>state</code> is a dict with keys <code>\"term\"</code>, <code>\"voted_for\"</code>, <code>\"role\"</code> (<code>\"follower\"</code>, <code>\"candidate\"</code> or <code>\"leader\"</code>), <code>\"log\"</code> (a list of <code>(term, command)</code> pairs; the entry at index <em>i</em> is <code>log[i - 1]</code>) and <code>\"commit\"</code> (the commit index). <code>entries</code> is a list of <code>(term, command)</code> pairs for indexes <code>prev_index + 1</code>, <code>prev_index + 2</code>, …. Update <code>state</code> in place and return <code>(state[\"term\"], success)</code>:</p>\n<ol>\n<li>If <code>term &lt; state[\"term\"]</code>, reject without changing anything.</li>\n<li>If <code>term &gt; state[\"term\"]</code>, adopt it and set <code>voted_for</code> to <code>None</code>. In either case (term ≥ ours), the sender is the leader of this term, so set <code>role</code> to <code>\"follower\"</code>.</li>\n<li>Reject unless <code>prev_index == 0</code> or the log has an entry at <code>prev_index</code> with term <code>prev_term</code>.</li>\n<li>For each new entry: if the log has an entry at that index with a different term, delete it and everything after it; then append any new entries not already in the log. Never delete entries that agree with the new ones (the message may be an old, delayed one).</li>\n<li>If <code>leader_commit &gt; state[\"commit\"]</code>, set the commit index to <code>min(leader_commit, prev_index + len(entries))</code>.</li>\n</ol>",
   "starter": "def append_entries(state, term, prev_index, prev_term, entries, leader_commit):\n    pass\n",
   "hint": "<p>Walk the new entries with their index <code>i = prev_index + 1 + k</code>. If <code>i &lt;= len(log)</code> and the terms match, skip; if they differ, truncate with <code>del log[i - 1:]</code> and fall through to appending; if <code>i &gt; len(log)</code>, append.</p>",
   "solution": "def append_entries(state, term, prev_index, prev_term, entries, leader_commit):\n    if term < state[\"term\"]:\n        return state[\"term\"], False\n    if term > state[\"term\"]:\n        state[\"term\"] = term\n        state[\"voted_for\"] = None\n    state[\"role\"] = \"follower\"\n    log = state[\"log\"]\n    if prev_index > 0 and (prev_index > len(log) or log[prev_index - 1][0] != prev_term):\n        return state[\"term\"], False\n    for k, entry in enumerate(entries):\n        i = prev_index + 1 + k\n        if i <= len(log):\n            if log[i - 1][0] == entry[0]:\n                continue\n            del log[i - 1:]\n        log.append(entry)\n    if leader_commit > state[\"commit\"]:\n        state[\"commit\"] = min(leader_commit, prev_index + len(entries))\n    return state[\"term\"], True\n",
   "tests": [
    {
     "label": "Appending to an empty log",
     "type": "assert",
     "code": "s = {\"term\": 1, \"voted_for\": None, \"role\": \"follower\", \"log\": [], \"commit\": 0}\nassert append_entries(s, 1, 0, 0, [(1, \"x=3\")], 0) == (1, True)\nassert s[\"log\"] == [(1, \"x=3\")] and s[\"commit\"] == 0\nassert append_entries(s, 1, 1, 1, [(1, \"y=7\")], 1) == (1, True)\nassert s[\"log\"] == [(1, \"x=3\"), (1, \"y=7\")] and s[\"commit\"] == 1\n"
    },
    {
     "label": "Lesson 4's practice problem (a): a conflict is overwritten",
     "type": "assert",
     "code": "s = {\"term\": 2, \"voted_for\": 1, \"role\": \"follower\", \"log\": [(1, \"a\"), (1, \"b\"), (2, \"c\"), (2, \"d\"), (2, \"e\")], \"commit\": 2}\nassert append_entries(s, 3, 3, 2, [(3, \"f\")], 2) == (3, True)\nassert s[\"log\"] == [(1, \"a\"), (1, \"b\"), (2, \"c\"), (3, \"f\")], s[\"log\"]\nassert s[\"voted_for\"] is None and s[\"term\"] == 3\n"
    },
    {
     "label": "Practice (b): the consistency check fails",
     "type": "assert",
     "code": "log = [(1, \"a\"), (1, \"b\"), (2, \"c\"), (2, \"d\"), (2, \"e\")]\ns = {\"term\": 3, \"voted_for\": None, \"role\": \"follower\", \"log\": list(log), \"commit\": 0}\nassert append_entries(s, 3, 5, 3, [(3, \"f\")], 0) == (3, False)\nassert s[\"log\"] == log\nassert append_entries(s, 3, 7, 2, [], 0) == (3, False)   # no entry 7 at all\n"
    },
    {
     "label": "Practice (c): an old message must not truncate",
     "type": "assert",
     "code": "log = [(1, \"a\"), (1, \"b\"), (2, \"c\"), (2, \"d\"), (2, \"e\")]\ns = {\"term\": 2, \"voted_for\": None, \"role\": \"follower\", \"log\": list(log), \"commit\": 1}\nassert append_entries(s, 2, 2, 1, [(2, \"c\"), (2, \"d\")], 3) == (2, True)\nassert s[\"log\"] == log\nassert s[\"commit\"] == 3\n"
    },
    {
     "label": "Practice (d) and the commit index bound",
     "type": "assert",
     "code": "s = {\"term\": 3, \"voted_for\": None, \"role\": \"follower\", \"log\": [(1, \"a\"), (1, \"b\"), (2, \"c\"), (2, \"d\"), (2, \"e\")], \"commit\": 0}\nassert append_entries(s, 3, 0, 0, [(1, \"a\"), (1, \"b\"), (3, \"z\")], 10) == (3, True)\nassert s[\"log\"] == [(1, \"a\"), (1, \"b\"), (3, \"z\")]\nassert s[\"commit\"] == 3\n"
    },
    {
     "label": "Stale leaders are rejected; candidates step down",
     "type": "assert",
     "code": "s = {\"term\": 5, \"voted_for\": 2, \"role\": \"candidate\", \"log\": [(4, \"a\")], \"commit\": 1}\nassert append_entries(s, 4, 1, 4, [(4, \"b\")], 1) == (5, False)\nassert s[\"role\"] == \"candidate\" and s[\"log\"] == [(4, \"a\")]\nassert append_entries(s, 5, 1, 4, [], 1) == (5, True)\nassert s[\"role\"] == \"follower\" and s[\"voted_for\"] == 2\n"
    },
    {
     "label": "The trace in Lesson 4 (S2 and S4)",
     "type": "assert",
     "hidden": true,
     "code": "s2 = {\"term\": 1, \"voted_for\": 1, \"role\": \"follower\", \"log\": [(1, \"x=3\"), (1, \"y=7\")], \"commit\": 1}\ns4 = {\"term\": 1, \"voted_for\": None, \"role\": \"follower\", \"log\": [], \"commit\": 0}\nassert append_entries(s2, 2, 1, 1, [(2, \"z=1\")], 1) == (2, True)\nassert s2[\"log\"] == [(1, \"x=3\"), (2, \"z=1\")]\nassert append_entries(s4, 2, 1, 1, [(2, \"z=1\")], 1) == (2, False)\nassert append_entries(s4, 2, 0, 0, [(1, \"x=3\"), (2, \"z=1\")], 1) == (2, True)\nassert s4[\"log\"] == s2[\"log\"] and s4[\"commit\"] == 1\n"
    }
   ]
  },
  {
   "id": "raft_vote_commit",
   "title": "Raft: voting and the commit rule",
   "prompt": "<p>Two more pieces of Raft (Lesson 4).</p>\n<p><code>request_vote(state, term, candidate, last_index, last_term)</code> handles a RequestVote. <code>state</code> is as in the previous problem. If <code>term &lt; state[\"term\"]</code>, refuse. If <code>term &gt; state[\"term\"]</code>, adopt the term, set <code>voted_for</code> to <code>None</code> and <code>role</code> to <code>\"follower\"</code> (whether or not the vote is then granted). Grant the vote if <code>voted_for</code> is <code>None</code> or already <code>candidate</code>, and the candidate's log is at least as up to date as ours (larger last term, or equal last term and <code>last_index</code> at least our log's length; an empty log has last term 0). When granting, set <code>voted_for = candidate</code>. Return <code>(state[\"term\"], granted)</code>.</p>\n<p><code>commit_index(log_terms, current_term, commit, match)</code> is the leader's commit rule. <code>log_terms</code> lists the terms of the leader's entries (index <em>i</em> is <code>log_terms[i - 1]</code>), <code>commit</code> its current commit index, and <code>match</code> the match indexes of the <em>other</em> servers (so the cluster has <code>len(match) + 1</code> servers, and the leader holds its whole log). Return the largest <em>N</em> &gt; <code>commit</code> such that a majority of the cluster has an index of at least <em>N</em> and <code>log_terms[N - 1] == current_term</code>; if there is none, return <code>commit</code>.</p>",
   "starter": "def request_vote(state, term, candidate, last_index, last_term):\n    pass\n\n\ndef commit_index(log_terms, current_term, commit, match):\n    pass\n",
   "hint": "<p>For the commit rule, try <em>N</em> from the end of the log down to <code>commit + 1</code>; count the servers with match index ≥ <em>N</em>, counting the leader.</p>",
   "solution": "def request_vote(state, term, candidate, last_index, last_term):\n    if term < state[\"term\"]:\n        return state[\"term\"], False\n    if term > state[\"term\"]:\n        state[\"term\"] = term\n        state[\"voted_for\"] = None\n        state[\"role\"] = \"follower\"\n    log = state[\"log\"]\n    my_last_term = log[-1][0] if log else 0\n    up_to_date = last_term > my_last_term or (last_term == my_last_term and last_index >= len(log))\n    if state[\"voted_for\"] in (None, candidate) and up_to_date:\n        state[\"voted_for\"] = candidate\n        return state[\"term\"], True\n    return state[\"term\"], False\n\n\ndef commit_index(log_terms, current_term, commit, match):\n    size = len(match) + 1\n    for n in range(len(log_terms), commit, -1):\n        count = 1 + sum(1 for m in match if m >= n)\n        if 2 * count > size and log_terms[n - 1] == current_term:\n            return n\n    return commit\n",
   "tests": [
    {
     "label": "Lesson 4's trace, step 3",
     "type": "assert",
     "code": "s2 = {\"term\": 1, \"voted_for\": 1, \"role\": \"follower\", \"log\": [(1, \"x=3\"), (1, \"y=7\")], \"commit\": 1}\ns4 = {\"term\": 1, \"voted_for\": None, \"role\": \"follower\", \"log\": [], \"commit\": 0}\nassert request_vote(s2, 2, 3, 1, 1) == (2, False)\nassert s2[\"term\"] == 2 and s2[\"voted_for\"] is None\nassert request_vote(s4, 2, 3, 1, 1) == (2, True)\nassert s4[\"voted_for\"] == 3\n"
    },
    {
     "label": "One vote per term; repeats for the same candidate are fine",
     "type": "assert",
     "code": "s = {\"term\": 4, \"voted_for\": None, \"role\": \"follower\", \"log\": [(3, \"a\")], \"commit\": 1}\nassert request_vote(s, 4, 1, 1, 3) == (4, True)\nassert request_vote(s, 4, 2, 9, 4) == (4, False)\nassert request_vote(s, 4, 1, 1, 3) == (4, True)\nassert request_vote(s, 5, 2, 1, 3) == (5, True)\n"
    },
    {
     "label": "The up-to-date rule compares last terms first",
     "type": "assert",
     "code": "def fresh():\n    return {\"term\": 1, \"voted_for\": None, \"role\": \"follower\", \"log\": [(1, \"a\")] * 4 + [(3, \"b\")] * 3, \"commit\": 0}\nassert request_vote(fresh(), 4, 9, 10, 2) == (4, False)\nassert request_vote(fresh(), 4, 9, 6, 3) == (4, False)\nassert request_vote(fresh(), 4, 9, 7, 3) == (4, True)\nassert request_vote(fresh(), 4, 9, 2, 4) == (4, True)\n"
    },
    {
     "label": "Old terms are refused; a leader seeing a newer term steps down",
     "type": "assert",
     "code": "s = {\"term\": 6, \"voted_for\": 0, \"role\": \"leader\", \"log\": [], \"commit\": 0}\nassert request_vote(s, 5, 2, 9, 5) == (6, False)\nassert s[\"role\"] == \"leader\"\nassert request_vote(s, 7, 2, 0, 0) == (7, True)\nassert s[\"role\"] == \"follower\" and s[\"voted_for\"] == 2\n"
    },
    {
     "label": "Commit rule: Lesson 4's practice problem",
     "call": "commit_index([1, 1, 2, 2, 3, 4, 5, 6, 6, 6], 6, 6, [10, 8, 7, 4])",
     "expect": "8"
    },
    {
     "label": "Commit rule: entries from older terms aren't counted",
     "call": "commit_index([1, 1, 2, 2, 3, 4, 5, 5, 6, 6], 6, 6, [10, 8, 7, 4])",
     "expect": "6"
    },
    {
     "label": "Commit rule: older entries are committed with a newer one",
     "call": "commit_index([2, 2, 4], 4, 0, [3, 1])",
     "expect": "3"
    },
    {
     "label": "Commit rule: no majority yet",
     "call": "commit_index([1, 1, 1], 1, 1, [1, 1, 3, 2])",
     "expect": "2"
    },
    {
     "label": "Commit rule: three servers",
     "call": "[commit_index([1, 1], 1, 0, [0, 0]), commit_index([1, 1], 1, 0, [1, 0]), commit_index([1, 1], 1, 0, [2, 0])]",
     "expect": "[0, 1, 2]"
    },
    {
     "label": "Commit never goes backwards",
     "call": "commit_index([1, 1, 2], 2, 2, [0, 0])",
     "expect": "2",
     "hidden": true
    }
   ]
  }
 ],
 "di5": [
  {
   "id": "linearizable",
   "title": "Checking linearizability",
   "prompt": "<p>Write <code>is_linearizable(history, initial=0)</code> for a single register (Lesson 5). <code>history</code> is a list of operations <code>(invoke, response, kind, value)</code>: times with <code>invoke &lt; response</code>, <code>kind</code> <code>\"w\"</code> (wrote <code>value</code>) or <code>\"r\"</code> (read and got <code>value</code>). The register starts at <code>initial</code>. Return <code>True</code> if the operations can be put in an order that (1) respects real time: if one operation's response is before another's invocation, it comes first; and (2) is correct for one register: each read returns the value of the latest write before it in the order, or <code>initial</code> if there is none.</p>\n<p>Search: at each step, an operation may go next if no other remaining operation finished before it was invoked. Histories in the tests have up to 13 operations, many of them concurrent, so a plain search over orders is too slow: notice that what matters for the rest of the search is only <em>which</em> operations are left and the register's current value, and remember the states you have already ruled out.</p>",
   "starter": "def is_linearizable(history, initial=0):\n    pass\n",
   "hint": "<p>Write a recursive function <code>ok(remaining, value)</code> where <code>remaining</code> is a <code>frozenset</code> of indexes, and decorate it with <code>@functools.lru_cache(maxsize=None)</code> (or keep your own dict). An operation <code>i</code> is a candidate if <code>history[i][0] &lt;= min</code> of the responses of the remaining operations, that is, nothing remaining finished before it started.</p>",
   "solution": "import functools\n\ndef is_linearizable(history, initial=0):\n    ops = list(history)\n\n    @functools.lru_cache(maxsize=None)\n    def ok(remaining, value):\n        if not remaining:\n            return True\n        earliest_end = min(ops[i][1] for i in remaining)\n        for i in remaining:\n            inv, resp, kind, v = ops[i]\n            if inv > earliest_end:\n                continue                     # something remaining finished before i began\n            if kind == \"r\":\n                if v == value and ok(remaining - {i}, value):\n                    return True\n            elif ok(remaining - {i}, v):\n                return True\n        return False\n\n    return ok(frozenset(range(len(ops))), initial)\n",
   "tests": [
    {
     "label": "Lesson 5's figure is not linearizable",
     "call": "is_linearizable([(0, 10, 'w', 1), (2, 4, 'r', 1), (6, 8, 'r', 0)])",
     "expect": "False"
    },
    {
     "label": "...but it is if the second read returns 1",
     "call": "is_linearizable([(0, 10, 'w', 1), (2, 4, 'r', 1), (6, 8, 'r', 1)])",
     "expect": "True"
    },
    {
     "label": "Either value during a write",
     "call": "[is_linearizable([(0, 10, 'w', 1), (2, 4, 'r', 0)]), is_linearizable([(0, 10, 'w', 1), (2, 4, 'r', 1)])]",
     "expect": "[True, True]"
    },
    {
     "label": "A read can't see a write that hasn't started",
     "call": "is_linearizable([(0, 2, 'r', 1), (3, 5, 'w', 1)])",
     "expect": "False"
    },
    {
     "label": "Lesson 5's practice problem",
     "call": "is_linearizable([(0, 4, 'w', 1), (2, 6, 'w', 2), (5, 7, 'r', 1), (8, 9, 'r', 2)])",
     "expect": "True"
    },
    {
     "label": "...with the reads swapped",
     "call": "is_linearizable([(0, 4, 'w', 1), (2, 6, 'w', 2), (5, 7, 'r', 2), (8, 9, 'r', 1)])",
     "expect": "False"
    },
    {
     "label": "A value nobody wrote",
     "call": "is_linearizable([(0, 5, 'w', 1), (1, 6, 'r', 3)])",
     "expect": "False"
    },
    {
     "label": "Sequential history",
     "call": "is_linearizable([(0, 1, 'w', 4), (2, 3, 'r', 4), (4, 5, 'w', 2), (6, 7, 'r', 2), (8, 9, 'r', 2)], initial=4)",
     "expect": "True"
    },
    {
     "label": "Twelve concurrent writes (needs memoization)",
     "call": "is_linearizable([(0, 10, 'w', v) for v in range(1, 13)] + [(11, 12, 'r', 1)])",
     "expect": "True",
     "limit": 5
    },
    {
     "label": "Twelve concurrent writes, impossible read",
     "call": "is_linearizable([(0, 10, 'w', v) for v in range(1, 13)] + [(11, 12, 'r', 1), (13, 14, 'r', 2)])",
     "expect": "False",
     "limit": 5,
     "hidden": true
    }
   ]
  },
  {
   "id": "paxos",
   "title": "Single-decree Paxos",
   "prompt": "<p>Implement Paxos's acceptor and one proposer round (Lesson 5).</p>\n<p><code>Acceptor()</code> has attributes <code>promised</code> (highest number promised, initially 0) and <code>accepted</code> (<code>(n, value)</code> of the highest-numbered proposal accepted, or <code>None</code>). <code>prepare(n)</code>: if <code>n &gt; promised</code>, set <code>promised = n</code> and return <code>(\"promise\", accepted)</code>; otherwise (including a repeated <code>prepare</code> with the same <code>n</code>) return <code>(\"reject\", promised)</code>. <code>accept(n, value)</code>: if <code>n &gt;= promised</code> (so the number it promised is accepted), set <code>promised = n</code> and <code>accepted = (n, value)</code> and return <code>True</code>; otherwise <code>False</code>.</p>\n<p><code>propose(acceptors, n, value, prepare_to, accept_to)</code> runs one round with proposal number <code>n</code>: send <code>prepare(n)</code> to the acceptors whose indexes are in <code>prepare_to</code> (the others' messages are lost). If fewer than a majority of <em>all</em> acceptors promise, return <code>None</code>. Otherwise choose the value of the highest-numbered accepted proposal among the promises, or <code>value</code> if none reported one; send <code>accept(n, v)</code> to the acceptors in <code>accept_to</code>; return <code>v</code> if a majority of all acceptors accepted it, else <code>None</code>.</p>\n<p><code>chosen(acceptors)</code> returns the value accepted by a majority with the same proposal number, or <code>None</code>.</p>",
   "starter": "class Acceptor:\n    def __init__(self):\n        pass\n\n    def prepare(self, n):\n        pass\n\n    def accept(self, n, value):\n        pass\n\n\ndef propose(acceptors, n, value, prepare_to, accept_to):\n    pass\n\n\ndef chosen(acceptors):\n    pass\n",
   "hint": "<p>Majority means <code>2 * count &gt; len(acceptors)</code>. Among the promises, ignore <code>None</code> and take the <code>max</code> of the <code>(n, value)</code> pairs by their first element.</p>",
   "solution": "class Acceptor:\n    def __init__(self):\n        self.promised = 0\n        self.accepted = None\n\n    def prepare(self, n):\n        if n > self.promised:\n            self.promised = n\n            return (\"promise\", self.accepted)\n        return (\"reject\", self.promised)\n\n    def accept(self, n, value):\n        if n >= self.promised:\n            self.promised = n\n            self.accepted = (n, value)\n            return True\n        return False\n\n\ndef propose(acceptors, n, value, prepare_to, accept_to):\n    total = len(acceptors)\n    replies = [acceptors[i].prepare(n) for i in prepare_to]\n    promises = [acc for kind, acc in replies if kind == \"promise\"]\n    if 2 * len(promises) <= total:\n        return None\n    prior = [a for a in promises if a is not None]\n    v = max(prior, key=lambda a: a[0])[1] if prior else value\n    oks = sum(1 for i in accept_to if acceptors[i].accept(n, v))\n    return v if 2 * oks > total else None\n\n\ndef chosen(acceptors):\n    counts = {}\n    for a in acceptors:\n        if a.accepted is not None:\n            counts[a.accepted] = counts.get(a.accepted, 0) + 1\n    for (n, v), c in counts.items():\n        if 2 * c > len(acceptors):\n            return v\n    return None\n",
   "tests": [
    {
     "label": "Acceptor rules",
     "type": "assert",
     "code": "a = Acceptor()\nassert a.prepare(1) == (\"promise\", None)\nassert a.prepare(1) == (\"reject\", 1)\nassert a.accept(1, \"x\") is True and a.accepted == (1, \"x\")\nassert a.prepare(3) == (\"promise\", (1, \"x\"))\nassert a.accept(2, \"y\") is False\nassert a.accept(3, \"z\") is True and a.accepted == (3, \"z\")\nassert a.promised == 3\n"
    },
    {
     "label": "Equal numbers: a repeated prepare is rejected, an accept with the promised number succeeds",
     "type": "assert",
     "code": "a = Acceptor()\nassert a.prepare(7) == (\"promise\", None)\nassert a.prepare(7) == (\"reject\", 7) and a.promised == 7\nassert a.prepare(6) == (\"reject\", 7)\nassert a.accept(7, \"v\") is True and a.accepted == (7, \"v\")\nassert a.prepare(7) == (\"reject\", 7) and a.accepted == (7, \"v\")\nassert a.accept(6, \"w\") is False and a.accepted == (7, \"v\")\n"
    },
    {
     "label": "Lesson 5's trace: the first proposer is cut off, the second chooses its own value",
     "type": "assert",
     "code": "A = [Acceptor() for _ in range(3)]\nassert propose(A, 1, \"x\", [0, 1], [0]) is None\nassert chosen(A) is None\nassert propose(A, 2, \"y\", [1, 2], [1, 2]) == \"y\"\nassert chosen(A) == \"y\"\n"
    },
    {
     "label": "...or must finish the first proposer's work",
     "type": "assert",
     "code": "A = [Acceptor() for _ in range(3)]\npropose(A, 1, \"x\", [0, 1], [0])\nassert propose(A, 2, \"y\", [0, 1], [0, 1, 2]) == \"x\"\nassert chosen(A) == \"x\"\n"
    },
    {
     "label": "Once chosen, always chosen",
     "type": "assert",
     "code": "A = [Acceptor() for _ in range(5)]\nassert propose(A, 1, \"red\", [0, 1, 2, 3, 4], [0, 1, 2]) == \"red\"\nfor n, mine, prep in [(2, \"blue\", [2, 3, 4]), (3, \"green\", [0, 3, 4]), (4, \"pink\", [1, 3, 4])]:\n    assert propose(A, n, mine, prep, [0, 1, 2, 3, 4]) == \"red\"\nassert chosen(A) == \"red\"\n"
    },
    {
     "label": "Too few promises, and duelling proposers",
     "type": "assert",
     "code": "A = [Acceptor() for _ in range(3)]\nassert propose(A, 1, \"a\", [0], [0, 1, 2]) is None\nassert A[1].accepted is None             # no accepts were sent\nA = [Acceptor() for _ in range(3)]\nassert [k for k, _ in (A[i].prepare(5) for i in range(3))] == [\"promise\"] * 3\nassert propose(A, 4, \"late\", [0, 1, 2], [0, 1, 2]) is None\n"
    },
    {
     "label": "Lesson 5's first practice problem",
     "type": "assert",
     "hidden": true,
     "code": "def setup():\n    A = [Acceptor() for _ in range(3)]\n    A[0].promised, A[0].accepted = 2, (2, \"red\")\n    A[1].promised, A[1].accepted = 4, (4, \"blue\")\n    A[2].promised = 4\n    return A\nassert propose(setup(), 5, \"mine\", [0, 2], [0, 2]) == \"red\"\nassert propose(setup(), 5, \"mine\", [0, 1], [0, 1]) == \"blue\"\nassert chosen(setup()) is None\n"
    }
   ]
  }
 ],
 "di6": [
  {
   "id": "consistent_hash",
   "title": "Consistent hashing with virtual nodes",
   "prompt": "<p>Build Lesson 6's ring. The starter defines <code>h(s)</code>, a stable 64-bit hash of a string. <code>Ring(vnodes)</code> places each node at <code>vnodes</code> points, at the hashes of <code>f\"{node}#{i}\"</code> for <code>i</code> in <code>range(vnodes)</code>.</p>\n<ul>\n<li><code>add(node)</code> and <code>remove(node)</code> change the membership (adding a node already present, or removing an absent one, does nothing).</li>\n<li><code>lookup(key)</code> returns the node owning the first point whose hash is ≥ <code>h(key)</code>, wrapping around to the smallest point. Raise <code>LookupError</code> if the ring is empty.</li>\n<li><code>preference(key, n)</code> returns the first <code>n</code> <em>distinct</em> nodes met going clockwise from that point (fewer if the ring has fewer nodes): the replicas of the key, as in Dynamo.</li>\n<li><code>nodes()</code> returns the sorted list of nodes.</li>\n</ul>\n<p>Lookups must be fast: use binary search over a sorted list of points (<code>bisect</code>, CS 201), not a scan of the ring.</p>",
   "starter": "import hashlib\n\ndef h(s):\n    \"\"\"A stable 64-bit hash of a string (the same on every machine and in every run).\"\"\"\n    return int.from_bytes(hashlib.sha256(s.encode()).digest()[:8], \"big\")\n\n\nclass Ring:\n    def __init__(self, vnodes=1):\n        pass\n\n    def add(self, node):\n        pass\n\n    def remove(self, node):\n        pass\n\n    def lookup(self, key):\n        pass\n\n    def preference(self, key, n):\n        pass\n\n    def nodes(self):\n        pass\n",
   "hint": "<p>Keep a sorted list of <code>(hash, node)</code> pairs and a parallel list of just the hashes. <code>bisect.bisect_left(hashes, h(key))</code> gives the index of the first point ≥ the key's hash; take it modulo the number of points to wrap. For <code>preference</code>, walk forward from there, skipping nodes you've already taken.</p>",
   "solution": "import hashlib\n\ndef h(s):\n    \"\"\"A stable 64-bit hash of a string (the same on every machine and in every run).\"\"\"\n    return int.from_bytes(hashlib.sha256(s.encode()).digest()[:8], \"big\")\n\nimport bisect\n\nclass Ring:\n    def __init__(self, vnodes=1):\n        self.vnodes = vnodes\n        self.members = set()\n        self.points = []\n        self.hashes = []\n\n    def _rebuild(self):\n        self.points = sorted((h(f\"{n}#{i}\"), n) for n in self.members for i in range(self.vnodes))\n        self.hashes = [p for p, _ in self.points]\n\n    def add(self, node):\n        if node not in self.members:\n            self.members.add(node)\n            self._rebuild()\n\n    def remove(self, node):\n        if node in self.members:\n            self.members.discard(node)\n            self._rebuild()\n\n    def _start(self, key):\n        if not self.points:\n            raise LookupError(\"empty ring\")\n        return bisect.bisect_left(self.hashes, h(key)) % len(self.points)\n\n    def lookup(self, key):\n        return self.points[self._start(key)][1]\n\n    def preference(self, key, n):\n        i = self._start(key)\n        out = []\n        for k in range(len(self.points)):\n            node = self.points[(i + k) % len(self.points)][1]\n            if node not in out:\n                out.append(node)\n                if len(out) == n:\n                    break\n        return out\n\n    def nodes(self):\n        return sorted(self.members)\n",
   "tests": [
    {
     "label": "One point per node",
     "type": "assert",
     "code": "r = Ring()\nfor n in \"ABCD\":\n    r.add(n)\nassert r.nodes() == [\"A\", \"B\", \"C\", \"D\"]\ngot = [r.lookup(f\"user{i}\") for i in range(8)]\nassert got == ['C', 'B', 'C', 'C', 'C', 'C', 'B', 'C'], got     # one point per node: very uneven\n"
    },
    {
     "label": "A key whose hash equals a point belongs to that point's node",
     "type": "assert",
     "code": "r = Ring()\nfor n in \"ABCD\":\n    r.add(n)\nfor n in \"ABCD\":\n    assert r.lookup(f\"{n}#0\") == n, n          # h(key) == the point's hash: \"at or after\" includes it\n    assert r.preference(f\"{n}#0\", 1) == [n]\n"
    },
    {
     "label": "Matches the definition on many keys",
     "type": "assert",
     "code": "r = Ring(vnodes=20)\nfor n in [\"n1\", \"n2\", \"n3\"]:\n    r.add(n)\npts = sorted((h(f\"{n}#{i}\"), n) for n in [\"n1\", \"n2\", \"n3\"] for i in range(20))\nfor k in range(300):\n    hk = h(f\"k{k}\")\n    want = next((n for p, n in pts if p >= hk), pts[0][1])\n    assert r.lookup(f\"k{k}\") == want, k\n"
    },
    {
     "label": "Adding a node moves keys only to it",
     "type": "assert",
     "code": "r = Ring(vnodes=50)\nfor n in \"ABCD\":\n    r.add(n)\nbefore = {k: r.lookup(f\"key{k}\") for k in range(2000)}\nr.add(\"E\")\nmoved = [k for k in before if r.lookup(f\"key{k}\") != before[k]]\nassert all(r.lookup(f\"key{k}\") == \"E\" for k in moved)\nassert 300 < len(moved) < 550, len(moved)\nr.remove(\"E\")\nassert all(r.lookup(f\"key{k}\") == before[k] for k in before)\n"
    },
    {
     "label": "Preference lists",
     "type": "assert",
     "code": "r = Ring(vnodes=10)\nfor n in \"ABC\":\n    r.add(n)\np = r.preference(\"cart:42\", 2)\nassert len(p) == 2 and len(set(p)) == 2 and p[0] == r.lookup(\"cart:42\"), p\nassert sorted(r.preference(\"cart:42\", 5)) == [\"A\", \"B\", \"C\"]\nassert r.preference(\"x\", 1) == [r.lookup(\"x\")]\n"
    },
    {
     "label": "Empty ring, duplicates and removing absent nodes",
     "type": "assert",
     "code": "r = Ring(3)\ntry:\n    r.lookup(\"k\")\nexcept LookupError:\n    pass\nelse:\n    raise AssertionError(\"expected LookupError\")\nr.add(\"A\"); r.add(\"A\"); r.remove(\"Z\")\nassert r.nodes() == [\"A\"] and r.lookup(\"k\") == \"A\" and r.preference(\"k\", 3) == [\"A\"]\n"
    },
    {
     "label": "Fast lookups",
     "type": "assert",
     "hidden": true,
     "limit": 5,
     "code": "r = Ring(vnodes=100)\nfor i in range(50):\n    r.add(f\"node{i}\")\ncounts = {}\nfor k in range(20000):\n    n = r.lookup(f\"item{k}\")\n    counts[n] = counts.get(n, 0) + 1\nassert len(counts) == 50 and max(counts.values()) < 3 * min(counts.values()), (max(counts.values()), min(counts.values()))\n"
    }
   ]
  },
  {
   "id": "two_phase_commit",
   "title": "Two-phase commit with a coordinator crash",
   "prompt": "<p>Simulate Lesson 6's two-phase commit. Write <code>two_phase_commit(votes, crash=None, recover=False, ask_peers=False)</code>. <code>votes</code> lists each participant's vote, <code>\"yes\"</code> or <code>\"no\"</code>. A participant that votes no aborts at once; one that votes yes is <em>in doubt</em> until it learns the decision.</p>\n<p>The coordinator collects every vote, decides commit if all are yes and abort otherwise, logs the decision, and then sends it to the participants in order (index 0 first). <code>crash</code> says when it crashes: <code>None</code> (never); <code>\"before_log\"</code> (after collecting the votes, before logging a decision); or an integer <em>k</em> (after logging the decision and sending it to the first <em>k</em> participants).</p>\n<p>After the crash (if any), these happen in order:</p>\n<ol>\n<li>If <code>ask_peers</code>, each in-doubt participant asks every other participant: if any of them has committed or aborted, it adopts that outcome. (Repeat until nothing changes.)</li>\n<li>If <code>recover</code>, the coordinator restarts and reads its log: if a decision is logged it sends it to every participant; if not, it logs abort (presumed abort) and sends that.</li>\n</ol>\n<p>Return a dict with <code>\"log\"</code>: the coordinator's logged decision (<code>\"commit\"</code>, <code>\"abort\"</code> or <code>None</code>), and <code>\"states\"</code>: the list of participant states, each <code>\"committed\"</code>, <code>\"aborted\"</code> or <code>\"in doubt\"</code>.</p>",
   "starter": "def two_phase_commit(votes, crash=None, recover=False, ask_peers=False):\n    pass\n",
   "hint": "<p>Start with states <code>\"aborted\"</code> for no votes and <code>\"in doubt\"</code> for yes votes. Sending a decision to participant <em>i</em> sets its state to <code>\"committed\"</code> or <code>\"aborted\"</code> (a participant that voted no is already aborted, and the decision then is always abort). When asking peers, an in-doubt participant learns nothing from another in-doubt one.</p>",
   "solution": "def two_phase_commit(votes, crash=None, recover=False, ask_peers=False):\n    states = [\"aborted\" if v == \"no\" else \"in doubt\" for v in votes]\n    decision = \"commit\" if all(v == \"yes\" for v in votes) else \"abort\"\n    outcome = {\"commit\": \"committed\", \"abort\": \"aborted\"}\n    log = None\n    if crash != \"before_log\":\n        log = decision\n        limit = len(votes) if crash is None else crash\n        for i in range(min(limit, len(votes))):\n            states[i] = outcome[log]\n    if crash is not None and ask_peers:\n        changed = True\n        while changed:\n            changed = False\n            for i, s in enumerate(states):\n                if s == \"in doubt\":\n                    known = [t for j, t in enumerate(states) if j != i and t != \"in doubt\"]\n                    if known:\n                        states[i] = known[0]\n                        changed = True\n    if crash is not None and recover:\n        if log is None:\n            log = \"abort\"\n        for i in range(len(states)):\n            states[i] = outcome[log]\n    return {\"log\": log, \"states\": states}\n",
   "tests": [
    {
     "label": "No crash: commit",
     "call": "two_phase_commit(['yes', 'yes', 'yes'])",
     "expect": "{'log': 'commit', 'states': ['committed', 'committed', 'committed']}"
    },
    {
     "label": "No crash: one no vote aborts everyone",
     "call": "two_phase_commit(['yes', 'no', 'yes'])",
     "expect": "{'log': 'abort', 'states': ['aborted', 'aborted', 'aborted']}"
    },
    {
     "label": "Crash after sending to one participant: the rest are in doubt",
     "call": "two_phase_commit(['yes', 'yes', 'yes'], crash=1)",
     "expect": "{'log': 'commit', 'states': ['committed', 'in doubt', 'in doubt']}"
    },
    {
     "label": "...asking peers resolves it",
     "call": "two_phase_commit(['yes', 'yes', 'yes'], crash=1, ask_peers=True)",
     "expect": "{'log': 'commit', 'states': ['committed', 'committed', 'committed']}"
    },
    {
     "label": "Crash before logging: everyone who voted yes blocks",
     "call": "two_phase_commit(['yes', 'yes'], crash='before_log', ask_peers=True)",
     "expect": "{'log': None, 'states': ['in doubt', 'in doubt']}"
    },
    {
     "label": "...until the coordinator recovers and presumes abort",
     "call": "two_phase_commit(['yes', 'yes'], crash='before_log', recover=True)",
     "expect": "{'log': 'abort', 'states': ['aborted', 'aborted']}"
    },
    {
     "label": "A no vote lets peers abort without the coordinator",
     "call": "two_phase_commit(['yes', 'yes', 'no'], crash='before_log', ask_peers=True)",
     "expect": "{'log': None, 'states': ['aborted', 'aborted', 'aborted']}"
    },
    {
     "label": "Crash after logging but before sending anything",
     "call": "two_phase_commit(['yes', 'yes'], crash=0, ask_peers=True)",
     "expect": "{'log': 'commit', 'states': ['in doubt', 'in doubt']}"
    },
    {
     "label": "Recovery resends a logged commit",
     "call": "two_phase_commit(['yes', 'yes', 'yes', 'yes'], crash=2, recover=True)",
     "expect": "{'log': 'commit', 'states': ['committed', 'committed', 'committed', 'committed']}"
    },
    {
     "label": "Abort decision partly sent",
     "call": "two_phase_commit(['yes', 'no', 'yes', 'yes'], crash=1)",
     "expect": "{'log': 'abort', 'states': ['aborted', 'aborted', 'in doubt', 'in doubt']}",
     "hidden": true
    }
   ]
  }
 ],
 "di7": [
  {
   "id": "mapreduce_workers",
   "title": "MapReduce on failing workers",
   "prompt": "<p>Simulate Lesson 7's MapReduce master with workers that crash. Write <code>run_job(splits, n_reduce, mapper, reducer, workers, crash_after=None)</code>.</p>\n<ul>\n<li><code>splits</code> is a list of input splits, each a list of records; map task <em>i</em> processes <code>splits[i]</code>. <code>mapper(record)</code> returns a list of <code>(key, value)</code> pairs (keys are strings). A map task divides its pairs into <code>n_reduce</code> buckets with the partition function <code>zlib.crc32(key.encode()) % n_reduce</code>.</li>\n<li><code>workers</code> is a list of worker names. <code>crash_after</code> maps some workers to a number <em>c</em>: that worker crashes when it is about to start a task after having completed <em>c</em> map tasks.</li>\n<li>The master keeps a queue of pending map tasks, initially 0, 1, …. Repeatedly it takes the task at the front and offers it to the next live worker in round-robin order (the first offer goes to <code>workers[0]</code>; each later offer goes to the next live worker after the one that received the previous offer, wrapping around). If that worker is due to crash, it dies: the task stays at the front of the queue (it will be offered to the next live worker), and every map task the dead worker had completed is appended to the back of the queue, in increasing order, because its output was on the dead worker's disk. Otherwise the worker runs the task. If every worker is dead while tasks remain, raise <code>RuntimeError</code>.</li>\n<li>When no map tasks remain, reduce task <em>j</em> (run by the master; reduce output is never lost) collects bucket <em>j</em> from every completed map task, groups values by key, and calls <code>reducer(key, values)</code> with the values in map-task order.</li>\n</ul>\n<p>Return <code>(result, runs)</code>: <code>result</code> is a dict from each key to its reduced value; <code>runs</code> is the list of <code>(worker, task)</code> pairs for every map task execution, in order.</p>",
   "starter": "import zlib\n\ndef run_job(splits, n_reduce, mapper, reducer, workers, crash_after=None):\n    pass\n",
   "hint": "<p>Keep the queue as a list, <code>done = {task: (worker, buckets)}</code> for the latest successful run of each task, a count of completed tasks per worker, a set of dead workers, and the index of the worker that got the last offer. When a worker dies, delete its tasks from <code>done</code> and append them to the queue.</p>",
   "solution": "import zlib\n\ndef run_job(splits, n_reduce, mapper, reducer, workers, crash_after=None):\n    crash_after = crash_after or {}\n    queue = list(range(len(splits)))\n    done = {}\n    completed = {w: 0 for w in workers}\n    dead = set()\n    runs = []\n    last = -1\n    while queue:\n        if len(dead) == len(workers):\n            raise RuntimeError(\"every worker is dead\")\n        k = last\n        while True:\n            k = (k + 1) % len(workers)\n            if workers[k] not in dead:\n                break\n        last = k\n        w = workers[k]\n        task = queue[0]\n        if w in crash_after and completed[w] >= crash_after[w]:\n            dead.add(w)\n            lost = sorted(t for t, (owner, _) in done.items() if owner == w)\n            for t in lost:\n                del done[t]\n            queue.extend(lost)\n            continue\n        queue.pop(0)\n        buckets = [[] for _ in range(n_reduce)]\n        for record in splits[task]:\n            for key, value in mapper(record):\n                buckets[zlib.crc32(key.encode()) % n_reduce].append((key, value))\n        done[task] = (w, buckets)\n        completed[w] += 1\n        runs.append((w, task))\n    result = {}\n    for j in range(n_reduce):\n        groups = {}\n        for task in sorted(done):\n            for key, value in done[task][1][j]:\n                groups.setdefault(key, []).append(value)\n        for key, values in groups.items():\n            result[key] = reducer(key, values)\n    return result, runs\n",
   "tests": [
    {
     "label": "Word count without failures",
     "type": "assert",
     "code": "splits = [[\"the cat sat\", \"the dog\"], [\"a cat and a dog\"], [\"the end\"]]\nwc = lambda doc: [(w, 1) for w in doc.split()]\nresult, runs = run_job(splits, 2, wc, lambda k, vs: sum(vs), [\"w1\", \"w2\"])\nassert result == {\"the\": 3, \"cat\": 2, \"sat\": 1, \"dog\": 2, \"a\": 2, \"and\": 1, \"end\": 1}, result\nassert runs == [(\"w1\", 0), (\"w2\", 1), (\"w1\", 2)], runs\n"
    },
    {
     "label": "A crash re-runs the dead worker's completed tasks",
     "type": "assert",
     "code": "splits = [[\"a b\"], [\"b c\"], [\"c d\"], [\"d e\"]]\nwc = lambda doc: [(w, 1) for w in doc.split()]\nresult, runs = run_job(splits, 3, wc, lambda k, vs: sum(vs), [\"w1\", \"w2\", \"w3\"], {\"w1\": 1})\nassert result == {\"a\": 1, \"b\": 2, \"c\": 2, \"d\": 2, \"e\": 1}, result\nassert runs == [(\"w1\", 0), (\"w2\", 1), (\"w3\", 2), (\"w2\", 3), (\"w3\", 0)], runs\n"
    },
    {
     "label": "The answer doesn't depend on failures",
     "type": "assert",
     "code": "splits = [[f\"k{i % 7} k{i % 3}\" for i in range(j, j + 5)] for j in range(0, 40, 5)]\nwc = lambda doc: [(w, 1) for w in doc.split()]\nbase, _ = run_job(splits, 4, wc, lambda k, vs: sum(vs), [\"a\", \"b\", \"c\"])\nfor crashes in ({\"a\": 0}, {\"b\": 2}, {\"a\": 1, \"c\": 2}, {\"a\": 3, \"b\": 3}):\n    res, runs = run_job(splits, 4, wc, lambda k, vs: sum(vs), [\"a\", \"b\", \"c\"], crashes)\n    assert res == base, crashes\n    assert len(runs) >= 8\n"
    },
    {
     "label": "Reduce sees values in map-task order",
     "type": "assert",
     "code": "splits = [[\"x:1\", \"y:2\"], [\"x:3\"], [\"x:5\", \"y:7\"]]\nparse = lambda r: [(r.split(\":\")[0], int(r.split(\":\")[1]))]\nresult, _ = run_job(splits, 2, parse, lambda k, vs: vs, [\"w\"], None)\nassert result == {\"x\": [1, 3, 5], \"y\": [2, 7]}, result\nresult, _ = run_job(splits, 2, parse, lambda k, vs: vs, [\"p\", \"q\"], {\"p\": 1})\nassert result == {\"x\": [1, 3, 5], \"y\": [2, 7]}, result\n"
    },
    {
     "label": "Everyone dead",
     "type": "assert",
     "code": "try:\n    run_job([[\"a\"], [\"b\"]], 1, lambda d: [(d, 1)], lambda k, vs: sum(vs), [\"w1\", \"w2\"], {\"w1\": 0, \"w2\": 1})\nexcept RuntimeError:\n    pass\nelse:\n    raise AssertionError(\"expected RuntimeError\")\n"
    },
    {
     "label": "A worker that dies late loses all its work",
     "type": "assert",
     "hidden": true,
     "code": "splits = [[str(i)] for i in range(7)]\nres, runs = run_job(splits, 2, lambda d: [(d, int(d))], lambda k, vs: sum(vs), [\"a\", \"b\"], {\"a\": 3})\nassert res == {str(i): i for i in range(7)}\nassert runs == [(\"a\", 0), (\"b\", 1), (\"a\", 2), (\"b\", 3), (\"a\", 4), (\"b\", 5), (\"b\", 6), (\"b\", 0), (\"b\", 2), (\"b\", 4)], runs\n"
    }
   ]
  },
  {
   "id": "watermarks",
   "title": "Event-time windows and watermarks",
   "prompt": "<p>Implement Lesson 7's windowing rules. Write <code>tumbling(events, size, delay)</code>. <code>events</code> is a list of <code>(event_time, value)</code> pairs in arrival order (times are non-negative integers). Each event belongs to the tumbling window <code>[s, s + size)</code> with <code>s = event_time // size * size</code>.</p>\n<p>The watermark starts at minus infinity (use <code>float(\"-inf\")</code>) and, after each event is processed, is the largest event time seen so far minus <code>delay</code>. For each arriving event, in order:</p>\n<ol>\n<li>If its window's end is ≤ the current watermark (before this event), the event is <em>late</em>: record its event time in the late list and skip it.</li>\n<li>Otherwise add its value to its window's total, and update the watermark.</li>\n<li>Then emit, in order of start time, every window that has received at least one event, hasn't been emitted, and whose end is ≤ the watermark.</li>\n</ol>\n<p>Return <code>(emitted, late)</code>: the list of <code>(start, total)</code> in emission order, and the list of late event times. Windows still open at the end are not emitted.</p>\n<p>For example, the notes' trace (all values 1, size 10, delay 5) gives <code>([(0, 3), (10, 2)], [4])</code>.</p>",
   "starter": "def tumbling(events, size, delay):\n    pass\n",
   "hint": "<p>Keep a dict from window start to its running total and a set of emitted starts. After each on-time event, loop over <code>sorted(totals)</code> and emit those with <code>start + size &lt;= watermark</code> that haven't been emitted.</p>",
   "solution": "def tumbling(events, size, delay):\n    watermark = float(\"-inf\")\n    largest = float(\"-inf\")\n    totals = {}\n    emitted_starts = set()\n    emitted, late = [], []\n    for t, value in events:\n        start = t // size * size\n        if start + size <= watermark:\n            late.append(t)\n            continue\n        totals[start] = totals.get(start, 0) + value\n        largest = max(largest, t)\n        watermark = largest - delay\n        for s in sorted(totals):\n            if s not in emitted_starts and s + size <= watermark:\n                emitted_starts.add(s)\n                emitted.append((s, totals[s]))\n    return emitted, late\n",
   "tests": [
    {
     "label": "The notes' trace",
     "call": "tumbling([(t, 1) for t in [3, 7, 12, 9, 15, 21, 4, 26]], 10, 5)",
     "expect": "([(0, 3), (10, 2)], [4])"
    },
    {
     "label": "Lesson 7's third practice problem",
     "call": "tumbling([(t, 1) for t in [2, 11, 8, 14, 6, 19, 30, 17, 29]], 10, 5)",
     "expect": "([(0, 3), (10, 3)], [17])"
    },
    {
     "label": "Sums of values",
     "call": "tumbling([(1, 5), (2, 7), (61, 1), (65, 2), (130, 4)], 60, 0)",
     "expect": "([(0, 12), (60, 3)], [])"
    },
    {
     "label": "A bigger delay makes fewer events late",
     "call": "[tumbling([(t, 1) for t in [5, 18, 3, 25, 11]], 10, d) for d in (0, 10)]",
     "expect": "[([(0, 1), (10, 1)], [3, 11]), ([(0, 2)], [])]"
    },
    {
     "label": "One event can close several windows",
     "call": "tumbling([(0, 1), (12, 1), (25, 1), (100, 1), (31, 1)], 10, 0)",
     "expect": "([(0, 1), (10, 1), (20, 1)], [31])"
    },
    {
     "label": "Empty input, and nothing ever closes",
     "call": "[tumbling([], 10, 5), tumbling([(1, 1), (2, 1)], 10, 5)]",
     "expect": "[([], []), ([], [])]"
    },
    {
     "label": "Late events never change emitted totals",
     "type": "assert",
     "hidden": true,
     "code": "import random\nrng = random.Random(5)\nevents = [(max(0, i * 3 - rng.randrange(25)), 1) for i in range(300)]\nemitted, late = tumbling(events, 20, 10)\nstarts = [s for s, _ in emitted]\nassert starts == sorted(starts) and len(set(starts)) == len(starts)\nassert sum(c for _, c in emitted) + len(late) <= len(events)\nassert set(late) <= {t for t, _ in events} and len(late) > 0\n"
    }
   ]
  }
 ],
 "di8": [
  {
   "id": "circuit_breaker",
   "title": "A circuit breaker and retries with backoff",
   "prompt": "<p>Build two of Lesson 8's tools. The starter defines <code>class CircuitOpen(Exception)</code>.</p>\n<p><code>CircuitBreaker(threshold, cooldown)</code> wraps calls to a dependency. <code>call(fn, now)</code> calls <code>fn()</code> at time <code>now</code> and returns its result, or lets its exception propagate. The breaker has an attribute <code>state</code>:</p>\n<ul>\n<li><code>\"closed\"</code>: call <code>fn</code>. A success resets the count of consecutive failures; a failure increments it, and at <code>threshold</code> consecutive failures the breaker becomes <code>\"open\"</code>, remembering <code>now</code> as the time it opened.</li>\n<li><code>\"open\"</code>: if <code>now</code> is earlier than the opening time plus <code>cooldown</code>, raise <code>CircuitOpen</code> without calling <code>fn</code>. Otherwise the cool-down has passed: set <code>state</code> to <code>\"half-open\"</code> and make this call the trial.</li>\n<li><code>\"half-open\"</code>: call <code>fn</code> (it can see <code>state == \"half-open\"</code> while it runs). On success the breaker becomes <code>\"closed\"</code> with a failure count of 0; on failure it becomes <code>\"open\"</code> again, opened at <code>now</code>, and the exception propagates.</li>\n</ul>\n<p>So <code>state</code> is <code>\"half-open\"</code> only during a trial call; between calls it is <code>\"closed\"</code> or <code>\"open\"</code>.</p>\n<p><code>retry(fn, attempts, base, cap, rng, sleep)</code> calls <code>fn()</code> up to <code>attempts</code> times and returns the first result. After failure number <em>i</em> (counting from 0), if attempts remain, it calls <code>sleep(rng.random() * min(cap, base * 2 ** i))</code> (\"full jitter\") and tries again. After the last failure, re-raise its exception. <code>CircuitOpen</code> is never retried: re-raise it at once.</p>",
   "starter": "class CircuitOpen(Exception):\n    pass\n\n\nclass CircuitBreaker:\n    def __init__(self, threshold, cooldown):\n        pass\n\n    def call(self, fn, now):\n        pass\n\n\ndef retry(fn, attempts, base, cap, rng, sleep):\n    pass\n",
   "hint": "<p>In <code>call</code>, handle the open state first (fail fast, or switch to <code>\"half-open\"</code> and fall through as the trial); then call <code>fn</code> inside <code>try</code>. In the <code>except</code> branch update the counts and state, then <code>raise</code> to re-raise the same exception.</p>",
   "solution": "class CircuitOpen(Exception):\n    pass\n\n\nclass CircuitBreaker:\n    def __init__(self, threshold, cooldown):\n        self.threshold = threshold\n        self.cooldown = cooldown\n        self.state = \"closed\"\n        self.failures = 0\n        self.opened = None\n\n    def call(self, fn, now):\n        if self.state == \"open\":\n            if now < self.opened + self.cooldown:\n                raise CircuitOpen()\n            self.state = \"half-open\"\n        try:\n            result = fn()\n        except Exception:\n            if self.state == \"half-open\":\n                self.state = \"open\"\n                self.opened = now\n            else:\n                self.failures += 1\n                if self.failures >= self.threshold:\n                    self.state = \"open\"\n                    self.opened = now\n            raise\n        self.state = \"closed\"\n        self.failures = 0\n        return result\n\n\ndef retry(fn, attempts, base, cap, rng, sleep):\n    for i in range(attempts):\n        try:\n            return fn()\n        except CircuitOpen:\n            raise\n        except Exception:\n            if i == attempts - 1:\n                raise\n            sleep(rng.random() * min(cap, base * 2 ** i))\n",
   "tests": [
    {
     "label": "Opens after the threshold, fails fast, then a trial closes it",
     "type": "assert",
     "code": "def bad():\n    raise TimeoutError(\"slow\")\nb = CircuitBreaker(3, 10)\nfor t in range(3):\n    try:\n        b.call(bad, t)\n    except TimeoutError:\n        pass\n    else:\n        raise AssertionError(\"bad() should raise\")\nassert b.state == \"open\"\ncalled = []\ntry:\n    b.call(lambda: called.append(1), 5)\nexcept CircuitOpen:\n    pass\nelse:\n    raise AssertionError(\"should fail fast while open\")\nassert called == []\nassert b.call(lambda: \"ok\", 12) == \"ok\"          # opened at 2, cooldown 10\nassert b.state == \"closed\"\n"
    },
    {
     "label": "A failed trial reopens with a new cool-down",
     "type": "assert",
     "code": "def bad():\n    raise ConnectionError()\nb = CircuitBreaker(1, 5)\ntry: b.call(bad, 0)\nexcept ConnectionError: pass\nassert b.state == \"open\"\ntry: b.call(bad, 5)\nexcept ConnectionError: pass\nelse: raise AssertionError(\"the trial's exception should propagate\")\nassert b.state == \"open\"\ntry: b.call(lambda: 1, 9)\nexcept CircuitOpen: pass\nelse: raise AssertionError(\"still cooling down until 10\")\nassert b.call(lambda: 1, 10) == 1 and b.state == \"closed\"\n"
    },
    {
     "label": "The trial call runs in the half-open state",
     "type": "assert",
     "code": "b = CircuitBreaker(1, 5)\ndef bad():\n    raise ConnectionError()\ntry: b.call(bad, 0)\nexcept ConnectionError: pass\nseen = []\ndef watch_fail():\n    seen.append(b.state)\n    raise ConnectionError()\ntry: b.call(watch_fail, 5)\nexcept ConnectionError: pass\nassert seen == [\"half-open\"] and b.state == \"open\", (seen, b.state)\nassert b.call(lambda: seen.append(b.state) or \"up\", 10) == \"up\"\nassert seen == [\"half-open\", \"half-open\"] and b.state == \"closed\", (seen, b.state)\nassert b.call(lambda: seen.append(b.state) or 1, 11) == 1 and seen[-1] == \"closed\"\n"
    },
    {
     "label": "Only consecutive failures count",
     "type": "assert",
     "code": "def bad():\n    raise ValueError()\nb = CircuitBreaker(2, 100)\nfor t, fn in enumerate([bad, lambda: 0, bad, lambda: 0, bad]):\n    try: b.call(fn, t)\n    except ValueError: pass\nassert b.state == \"closed\"\ntry: b.call(bad, 9)\nexcept ValueError: pass\nassert b.state == \"open\"\n"
    },
    {
     "label": "Retry with full jitter",
     "type": "assert",
     "code": "import random\ntries, slept = [], []\ndef flaky():\n    tries.append(1)\n    if len(tries) < 4:\n        raise TimeoutError()\n    return \"done\"\nassert retry(flaky, 5, 0.5, 8.0, random.Random(1), slept.append) == \"done\"\nassert len(tries) == 4 and len(slept) == 3\nr = random.Random(1)\nexpected = [r.random() * min(8.0, 0.5 * 2 ** i) for i in range(3)]\nassert slept == expected, slept\n"
    },
    {
     "label": "Retry gives up and re-raises; never retries an open circuit",
     "type": "assert",
     "code": "import random\nclass Fixed:\n    def random(self):\n        return 1.0\nslept = []\ndef always():\n    raise TimeoutError(\"nope\")\ntry:\n    retry(always, 6, 0.5, 4.0, Fixed(), slept.append)\nexcept TimeoutError:\n    pass\nelse:\n    raise AssertionError(\"expected TimeoutError\")\nassert slept == [0.5, 1.0, 2.0, 4.0, 4.0], slept\ndef open_circuit():\n    raise CircuitOpen()\nslept.clear()\ntry:\n    retry(open_circuit, 6, 1, 4, Fixed(), slept.append)\nexcept CircuitOpen:\n    pass\nassert slept == []\n"
    },
    {
     "label": "Breaker and retry together",
     "type": "assert",
     "hidden": true,
     "code": "class Fixed:\n    def random(self):\n        return 0.0\nb = CircuitBreaker(2, 50)\ncount = []\ndef down():\n    count.append(1)\n    raise ConnectionError()\nfor t in (0, 1, 2):\n    try:\n        retry(lambda: b.call(down, t), 5, 1, 1, Fixed(), lambda d: None)\n    except (ConnectionError, CircuitOpen):\n        pass\nassert len(count) == 2 and b.state == \"open\"\n"
    }
   ]
  },
  {
   "id": "gossip_membership",
   "title": "Gossip-based failure detection",
   "prompt": "<p>Simulate Lesson 8's heartbeat gossip. Write <code>gossip(n, rounds, choose, t_fail, crash=None)</code> for nodes 0 to <em>n</em> − 1. Each node keeps, for every node <em>j</em>, a heartbeat counter <code>hb[j]</code> and the round <code>seen[j]</code> in which that counter last increased in its table; all start at 0. <code>crash</code> maps some nodes to the round in which they crash: from the start of that round on, a crashed node does nothing and ignores messages.</p>\n<p>In each round <em>r</em> = 1, 2, …, <code>rounds</code>:</p>\n<ol>\n<li>Every live node increments its own counter and sets its own <code>seen</code> entry to <em>r</em>.</li>\n<li>Then each live node <em>i</em>, in increasing order, sends a copy of its current counters to node <code>choose(r, i)</code>. If the target is live and isn't <em>i</em>, it merges: for each <em>j</em> whose counter in the message is larger than its own, it takes that counter and sets its <code>seen[j] = r</code>. (So a node that receives news early in a round passes it on later in the same round.)</li>\n<li>Then every live node <em>i</em> suspects every other node <em>j</em> with <em>r</em> − <code>seen[j]</code> ≥ <code>t_fail</code>.</li>\n</ol>\n<p>Return a dict mapping each crashed node to the first round at the end of which every live node suspects it (or <code>None</code> if that never happens within <code>rounds</code>), and the key <code>\"false\"</code> to the total number of (round, observer, suspect) triples in which a live node suspected another live node.</p>",
   "starter": "def gossip(n, rounds, choose, t_fail, crash=None):\n    pass\n",
   "hint": "<p>Keep <code>hb</code> and <code>seen</code> as lists of lists (<code>hb[i][j]</code> is node <em>i</em>'s view of node <em>j</em>). A node is live in round <em>r</em> if it isn't in <code>crash</code> or <em>r</em> &lt; <code>crash[node]</code>. Copy the sender's list before merging (<code>list(hb[i])</code>), as a real message would be.</p>",
   "solution": "def gossip(n, rounds, choose, t_fail, crash=None):\n    crash = crash or {}\n    hb = [[0] * n for _ in range(n)]\n    seen = [[0] * n for _ in range(n)]\n    detected = {c: None for c in crash}\n    false = 0\n    for r in range(1, rounds + 1):\n        live = [i for i in range(n) if i not in crash or r < crash[i]]\n        alive = set(live)\n        for i in live:\n            hb[i][i] += 1\n            seen[i][i] = r\n        for i in live:\n            j = choose(r, i)\n            if j == i or j not in alive:\n                continue\n            msg = list(hb[i])\n            for k in range(n):\n                if msg[k] > hb[j][k]:\n                    hb[j][k] = msg[k]\n                    seen[j][k] = r\n        for i in live:\n            for j in range(n):\n                if j != i and r - seen[i][j] >= t_fail and j in alive:\n                    false += 1\n        for c in crash:\n            if detected[c] is None and c not in alive and live and all(r - seen[i][c] >= t_fail for i in live):\n                detected[c] = r\n    detected[\"false\"] = false\n    return detected\n",
   "tests": [
    {
     "label": "A fixed ring, no crashes",
     "type": "assert",
     "code": "ring = lambda r, i: (i - 1) % 4          # 0 tells 3, 1 tells 0, 2 tells 1, 3 tells 2\nassert gossip(4, 10, ring, 3) == {\"false\": 0}\nres = gossip(4, 10, ring, 2)\nassert res == {\"false\": 2}, res          # in round 2, node 0 still hasn't heard from 3, nor 3 from 2\n"
    },
    {
     "label": "A crash in the ring",
     "type": "assert",
     "code": "ring = lambda r, i: (i - 1) % 4\nres = gossip(4, 20, ring, 5, crash={2: 6})\nassert res == {2: 12, \"false\": 32}, res  # node 1's news now can't get past the dead node 2\nassert gossip(4, 11, ring, 5, crash={2: 6}) == {2: None, \"false\": 5}   # too short a run to detect it\n"
    },
    {
     "label": "Random gossip partners (seeded)",
     "type": "assert",
     "code": "import random\nrng = random.Random(4)\ntable = {(r, i): rng.randrange(30) for r in range(1, 61) for i in range(30)}\nres = gossip(30, 60, lambda r, i: table[(r, i)], 14, crash={7: 20, 19: 25})\nassert res == {7: 44, 19: 47, \"false\": 0}, res\n"
    },
    {
     "label": "Too short a timeout gives false suspicions",
     "type": "assert",
     "code": "import random\nrng = random.Random(4)\ntable = {(r, i): rng.randrange(30) for r in range(1, 61) for i in range(30)}\nres = gossip(30, 60, lambda r, i: table[(r, i)], 4, crash={7: 20, 19: 25})\nassert res == {7: 29, 19: 37, \"false\": 5376}, res\n"
    },
    {
     "label": "Messages to crashed nodes are lost",
     "type": "assert",
     "hidden": true,
     "code": "star = lambda r, i: 0 if i else (r % 3) + 1    # everyone tells node 0, which tells one of the others\nres = gossip(4, 30, star, 6, crash={0: 10})\nassert res == {0: 15, \"false\": 102}, res\n"
    }
   ]
  }
 ]
});
