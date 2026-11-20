/* Auto-graded programming problems for CS 330, by lesson. Generated from a Python spec, so every
   string is JSON. The browser's Python can't open network connections, so every problem is a pure
   function or a simulation: packets are bytes, links are numbers, networks are graphs and dicts. */
CSA.addCode("cs330", {
 "nw1": [
  {
   "id": "store_forward",
   "title": "Packets through a chain of links",
   "prompt": "<p>A file is cut into <code>n_packets</code> packets of <code>packet_bits</code> bits each, all waiting at the source at time 0. They cross a chain of links, given as a list of <code>(rate_bps, prop_s)</code> pairs: each link's transmission rate in bits per second and its propagation delay in seconds. Every switch in between is <em>store-and-forward</em>: it can start sending a packet on the next link only once the whole packet has arrived, and each link sends one packet at a time, in order.</p>\n<p>Write <code>path_delivery(n_packets, packet_bits, links)</code> that returns a list of the times (in seconds) at which each packet has fully arrived at the destination. Ignore processing delay.</p>\n<p>For example, one 12,000-bit packet over one 1 Mb/s link with 10 ms propagation arrives at 0.012 + 0.010 = 0.022 s.</p>",
   "starter": "def path_delivery(n_packets, packet_bits, links):\n    pass\n",
   "hint": "<p>Keep, for each link, the time at which it finishes its current packet. Packet <em>i</em> can start on link <em>j</em> at the later of two times: when it has fully arrived at that link's sending end, and when the link has finished packet <em>i</em> − 1.</p>",
   "solution": "def path_delivery(n_packets, packet_bits, links):\n    free = [0.0] * len(links)       # when each link finishes its latest packet\n    arrivals = []\n    for _ in range(n_packets):\n        t = 0.0                     # when this packet is fully at the current node\n        for j, (rate, prop) in enumerate(links):\n            start = max(t, free[j])\n            free[j] = start + packet_bits / rate\n            t = free[j] + prop\n        arrivals.append(t)\n    return arrivals\n",
   "tests": [
    {
     "label": "One packet, one link",
     "call": "[round(x, 6) for x in path_delivery(1, 12000, [(1e6, 0.01)])]",
     "expect": "[0.022]"
    },
    {
     "label": "Three packets over three equal links",
     "call": "[round(x, 6) for x in path_delivery(3, 12000, [(1e6, 0.001)] * 3)]",
     "expect": "[0.039, 0.051, 0.063]"
    },
    {
     "label": "A slow link in the middle sets the pace",
     "call": "[round(x, 6) for x in path_delivery(3, 12000, [(1e7, 0.001), (1e6, 0.002), (1e7, 0.001)])]",
     "expect": "[0.0184, 0.0304, 0.0424]"
    },
    {
     "label": "A fast link after a slow one",
     "call": "[round(x, 6) for x in path_delivery(4, 8000, [(1e6, 0), (1e7, 0)])]",
     "expect": "[0.0088, 0.0168, 0.0248, 0.0328]"
    },
    {
     "label": "No packets",
     "call": "path_delivery(0, 8000, [(1e6, 0.01)])",
     "expect": "[]",
     "hidden": true
    }
   ]
  },
  {
   "id": "router_queue",
   "title": "A router's output queue",
   "prompt": "<p>Packets arrive at a router's output link, which sends at <code>rate_bps</code> bits per second, one packet at a time, in order of arrival (FIFO). A packet that arrives while the link is idle starts at once. Otherwise it waits in a buffer that holds at most <code>buffer_bytes</code> bytes of <em>waiting</em> packets (a packet leaves the buffer when its transmission starts). If a packet doesn't fit in the buffer when it arrives, it is dropped: this is <em>drop-tail</em>.</p>\n<p>Write <code>router_queue(packets, rate_bps, buffer_bytes)</code>, where <code>packets</code> is a list of <code>(arrival_time, size_bytes)</code> pairs in order of arrival. Return a list with, for each packet, the time its last bit leaves the router, or <code>None</code> if it was dropped.</p>",
   "starter": "def router_queue(packets, rate_bps, buffer_bytes):\n    pass\n",
   "hint": "<p>Record each accepted packet's start time. When a packet arrives at time <em>t</em>, the bytes waiting are those of accepted packets whose start time is later than <em>t</em>. The next packet starts when the link becomes free, which is the previous accepted packet's finish time.</p>",
   "solution": "def router_queue(packets, rate_bps, buffer_bytes):\n    out, accepted = [], []          # accepted: (start_time, size)\n    link_free = 0.0\n    for t, size in packets:\n        if link_free <= t:\n            start = t                   # idle link: no waiting\n        else:\n            waiting = sum(s for st, s in accepted if st > t)\n            if waiting + size > buffer_bytes:\n                out.append(None)        # drop-tail\n                continue\n            start = link_free\n        link_free = start + size * 8 / rate_bps\n        accepted.append((start, size))\n        out.append(link_free)\n    return out\n",
   "tests": [
    {
     "label": "Spaced-out packets never wait",
     "call": "[round(x, 6) for x in router_queue([(0, 1000), (0.0025, 1000), (0.0051, 500)], 8e6, 0)]",
     "expect": "[0.001, 0.0035, 0.0056]"
    },
    {
     "label": "A burst waits in the buffer",
     "call": "[round(x, 6) for x in router_queue([(0, 1000), (0.0001, 1000), (0.0002, 1000)], 8e6, 2000)]",
     "expect": "[0.001, 0.002, 0.003]"
    },
    {
     "label": "A full buffer drops packets",
     "call": "[None if x is None else round(x, 6) for x in router_queue([(0, 1000), (0.0001, 1000), (0.0002, 1000), (0.0003, 1000), (0.0015, 1000)], 8e6, 2000)]",
     "expect": "[0.001, 0.002, 0.003, None, 0.004]"
    },
    {
     "label": "A small packet may fit where a big one doesn't",
     "call": "[None if x is None else round(x, 6) for x in router_queue([(0, 1500), (0.0001, 1500), (0.0002, 1500), (0.0003, 400)], 12e6, 2000)]",
     "expect": "[0.001, 0.002, None, 0.002267]"
    },
    {
     "label": "An idle link accepts a packet bigger than the buffer",
     "call": "router_queue([(0, 1500)], 12e6, 0)",
     "expect": "[0.001]",
     "hidden": true
    }
   ]
  }
 ],
 "nw2": [
  {
   "id": "error_detect",
   "title": "The Internet checksum and CRC",
   "prompt": "<p>Write three functions.</p>\n<ul>\n<li><code>internet_checksum(data)</code>: the 16-bit Internet checksum of the bytes <code>data</code>, as an int. Read the bytes as big-endian 16-bit words (pad an odd-length input with a zero byte at the end), add them with end-around carry (one's complement addition), and return the bitwise complement of the sum, in 16 bits.</li>\n<li><code>crc_remainder(bits, generator)</code>: both arguments are strings of <code>\"0\"</code> and <code>\"1\"</code>; the generator has <em>r</em> + 1 bits and starts with 1. Append <em>r</em> zeros to <code>bits</code>, divide by the generator using XOR long division, and return the <em>r</em>-bit remainder as a string.</li>\n<li><code>crc_ok(codeword, generator)</code>: <code>True</code> if the string <code>codeword</code> (data followed by its CRC) leaves remainder 0 when divided by the generator, without appending zeros.</li>\n</ul>\n<p>Raise <code>ValueError</code> if a generator doesn't start with 1 or is shorter than 2 bits.</p>",
   "starter": "def internet_checksum(data):\n    pass\n\ndef crc_remainder(bits, generator):\n    pass\n\ndef crc_ok(codeword, generator):\n    pass\n",
   "hint": "<p>For the checksum, <code>int.from_bytes(data[i:i+2], \"big\")</code> reads one word; after each addition, <code>s = (s &amp; 0xFFFF) + (s &gt;&gt; 16)</code> folds the carry back in. For the CRC, work on a list of bits: for each position from the left, if the current bit is 1, XOR the generator into the bits starting there. The last <em>r</em> bits are the remainder.</p>",
   "solution": "def internet_checksum(data):\n    if len(data) % 2:\n        data = data + b\"\\x00\"\n    s = 0\n    for i in range(0, len(data), 2):\n        s += int.from_bytes(data[i:i + 2], \"big\")\n        s = (s & 0xFFFF) + (s >> 16)\n    return ~s & 0xFFFF\n\ndef _check(generator):\n    if len(generator) < 2 or generator[0] != \"1\":\n        raise ValueError(\"generator must start with 1 and have at least 2 bits\")\n\ndef _remainder(bits, generator):\n    r = len(generator) - 1\n    b = [int(c) for c in bits]\n    g = [int(c) for c in generator]\n    for i in range(len(b) - r):\n        if b[i]:\n            for k in range(len(g)):\n                b[i + k] ^= g[k]\n    return \"\".join(map(str, b[len(b) - r:]))\n\ndef crc_remainder(bits, generator):\n    _check(generator)\n    return _remainder(bits + \"0\" * (len(generator) - 1), generator)\n\ndef crc_ok(codeword, generator):\n    _check(generator)\n    return set(_remainder(codeword, generator)) <= {\"0\"}\n",
   "tests": [
    {
     "label": "RFC 1071's example",
     "call": "hex(internet_checksum(bytes.fromhex('0001f203f4f5f6f7')))",
     "expect": "'0x220d'"
    },
    {
     "label": "Odd length is padded",
     "call": "hex(internet_checksum(b'abc'))",
     "expect": "'0x3b9d'"
    },
    {
     "label": "Data plus its checksum sums to all ones",
     "type": "assert",
     "code": "data = bytes(range(1, 21))\nc = internet_checksum(data)\nassert internet_checksum(data + c.to_bytes(2, \"big\")) == 0, \"checking a correct packet should give 0\"\n"
    },
    {
     "label": "CRC of 101110 with generator 1001",
     "call": "crc_remainder('101110', '1001')",
     "expect": "'011'"
    },
    {
     "label": "CRC with a 5-bit generator",
     "call": "crc_remainder('1101011111', '10011')",
     "expect": "'0010'"
    },
    {
     "label": "Checking codewords",
     "type": "assert",
     "code": "assert crc_ok(\"101110011\", \"1001\")\nassert not crc_ok(\"101010011\", \"1001\"), \"a flipped bit must be detected\"\nassert not crc_ok(\"101110010\", \"1001\")\n"
    },
    {
     "label": "Bad generators",
     "type": "assert",
     "code": "for g in (\"0101\", \"1\", \"\"):\n    try:\n        crc_remainder(\"1011\", g)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f\"generator {g!r} should raise ValueError\")\n"
    },
    {
     "label": "Every single-bit error is caught",
     "type": "assert",
     "hidden": true,
     "code": "data = \"1101011011\"\ncw = data + crc_remainder(data, \"10011\")\nassert crc_ok(cw, \"10011\")\nfor i in range(len(cw)):\n    bad = cw[:i] + (\"1\" if cw[i] == \"0\" else \"0\") + cw[i + 1:]\n    assert not crc_ok(bad, \"10011\"), i\n"
    }
   ]
  },
  {
   "id": "learning_switch",
   "title": "A learning switch",
   "prompt": "<p>Simulate an Ethernet switch with ports numbered 0 to <code>nports</code> − 1. Write a class <code>LearningSwitch(nports, max_age=300)</code> with:</p>\n<ul>\n<li><code>receive(time, in_port, src, dst)</code>: a frame from MAC address <code>src</code> to <code>dst</code> (strings like <code>\"aa:bb:cc:00:00:01\"</code>) arrives on <code>in_port</code> at <code>time</code> seconds. First the switch learns that <code>src</code> is on <code>in_port</code> (replacing any older entry, and recording the time). Then it returns the sorted list of ports it sends the frame out of: if <code>dst</code> is the broadcast address <code>\"ff:ff:ff:ff:ff:ff\"</code> or has no live entry, every port except <code>in_port</code> (flooding); if <code>dst</code>'s entry is <code>in_port</code>, none (filtering); otherwise just that port.</li>\n<li><code>table(time)</code>: a dict from MAC address to port of the live entries at <code>time</code>.</li>\n</ul>\n<p>An entry learned at time <em>t</em> is live while <code>time - t &lt; max_age</code>. Raise <code>ValueError</code> for a port outside the range.</p>",
   "starter": "class LearningSwitch:\n    def __init__(self, nports, max_age=300):\n        pass\n\n    def receive(self, time, in_port, src, dst):\n        pass\n\n    def table(self, time):\n        pass\n",
   "hint": "<p>Store <code>mac -&gt; (port, time_learned)</code>. Learn before you look up, so a frame sent to yourself is filtered.</p>",
   "solution": "BROADCAST = \"ff:ff:ff:ff:ff:ff\"\n\nclass LearningSwitch:\n    def __init__(self, nports, max_age=300):\n        self.nports, self.max_age = nports, max_age\n        self.entries = {}                       # mac -> (port, time learned)\n\n    def _live(self, mac, time):\n        e = self.entries.get(mac)\n        return e is not None and time - e[1] < self.max_age\n\n    def receive(self, time, in_port, src, dst):\n        if not 0 <= in_port < self.nports:\n            raise ValueError(f\"no port {in_port}\")\n        self.entries[src] = (in_port, time)\n        if dst == BROADCAST or not self._live(dst, time):\n            return [p for p in range(self.nports) if p != in_port]\n        port = self.entries[dst][0]\n        return [] if port == in_port else [port]\n\n    def table(self, time):\n        return {m: p for m, (p, t) in self.entries.items() if time - t < self.max_age}\n",
   "tests": [
    {
     "label": "Flood, learn, then forward",
     "type": "assert",
     "code": "s = LearningSwitch(4)\nA, B = \"aa:00:00:00:00:01\", \"aa:00:00:00:00:02\"\nassert s.receive(0, 0, A, B) == [1, 2, 3], \"unknown destination: flood\"\nassert s.receive(1, 2, B, A) == [0], \"A was learned on port 0\"\nassert s.receive(2, 0, A, B) == [2]\nassert s.table(2) == {A: 0, B: 2}, s.table(2)\n"
    },
    {
     "label": "Broadcast always floods",
     "type": "assert",
     "code": "s = LearningSwitch(3)\ns.receive(0, 1, \"aa:00:00:00:00:09\", \"ff:ff:ff:ff:ff:ff\")\nassert s.receive(1, 2, \"aa:00:00:00:00:02\", \"ff:ff:ff:ff:ff:ff\") == [0, 1]\n"
    },
    {
     "label": "Filtering a frame for the same segment",
     "type": "assert",
     "code": "s = LearningSwitch(4)\nA, C = \"aa:00:00:00:00:01\", \"aa:00:00:00:00:03\"\ns.receive(0, 1, C, A)\nassert s.receive(1, 1, A, C) == [], \"C is on the port the frame came from\"\n"
    },
    {
     "label": "A station that moves",
     "type": "assert",
     "code": "s = LearningSwitch(4)\nA, B = \"aa:00:00:00:00:01\", \"aa:00:00:00:00:02\"\ns.receive(0, 0, A, B)\ns.receive(5, 3, A, B)\nassert s.receive(6, 1, B, A) == [3]\n"
    },
    {
     "label": "Entries age out",
     "type": "assert",
     "code": "s = LearningSwitch(3, max_age=10)\nA, B = \"aa:00:00:00:00:01\", \"aa:00:00:00:00:02\"\ns.receive(0, 0, A, B)\nassert s.receive(9.5, 1, B, A) == [0]\nassert s.receive(10, 1, B, A) == [0, 2], \"A's entry is 10 s old, so it has expired\"\nassert s.table(10) == {B: 1}, s.table(10)\n"
    },
    {
     "label": "Bad port",
     "type": "raises",
     "call": "LearningSwitch(2).receive(0, 2, 'a', 'b')",
     "error": "ValueError",
     "hidden": true
    }
   ]
  }
 ],
 "nw3": [
  {
   "id": "longest_prefix",
   "title": "Longest-prefix match",
   "prompt": "<p>Write a class <code>ForwardingTable</code> with:</p>\n<ul>\n<li><code>add(prefix, next_hop)</code>: add a route such as <code>add(\"10.1.0.0/16\", \"B\")</code>, replacing any route for the same prefix. Raise <code>ValueError</code> if the prefix is malformed (four numbers 0 to 255, then a length 0 to 32) or has 1 bits after its first <em>length</em> bits (as in <code>\"10.1.2.3/16\"</code>).</li>\n<li><code>lookup(address)</code>: the next hop of the longest prefix that matches the dotted-quad <code>address</code>, or <code>None</code> if none matches.</li>\n</ul>\n<p>Don't use the <code>ipaddress</code> module: do the bit arithmetic yourself. Lookups must be fast in tables with many thousands of routes, so don't scan every route on every lookup.</p>",
   "starter": "class ForwardingTable:\n    def __init__(self):\n        pass\n\n    def add(self, prefix, next_hop):\n        pass\n\n    def lookup(self, address):\n        pass\n",
   "hint": "<p>Convert an address to a 32-bit int: <code>(a &lt;&lt; 24) | (b &lt;&lt; 16) | (c &lt;&lt; 8) | d</code>. Keep one dict per prefix length, from the prefix's network number to the next hop. A lookup tries lengths 32, 31, …, 0, masking the address with <code>mask = ((1 &lt;&lt; length) - 1) &lt;&lt; (32 - length)</code> each time: at most 33 dict lookups, however big the table.</p>",
   "solution": "def _addr(s):\n    parts = s.split(\".\")\n    if len(parts) != 4 or not all(p.isdigit() and int(p) <= 255 for p in parts):\n        raise ValueError(f\"bad address {s!r}\")\n    n = 0\n    for p in parts:\n        n = (n << 8) | int(p)\n    return n\n\ndef _mask(length):\n    return ((1 << length) - 1) << (32 - length)\n\nclass ForwardingTable:\n    def __init__(self):\n        self.by_len = [dict() for _ in range(33)]\n\n    def add(self, prefix, next_hop):\n        addr, sep, length = prefix.partition(\"/\")\n        if not sep or not length.isdigit() or int(length) > 32:\n            raise ValueError(f\"bad prefix {prefix!r}\")\n        n, length = _addr(addr), int(length)\n        if n & ~_mask(length) & 0xFFFFFFFF:\n            raise ValueError(f\"host bits set in {prefix!r}\")\n        self.by_len[length][n] = next_hop\n\n    def lookup(self, address):\n        a = _addr(address)\n        for length in range(32, -1, -1):\n            hop = self.by_len[length].get(a & _mask(length))\n            if hop is not None:\n                return hop\n        return None\n",
   "tests": [
    {
     "label": "The longest match wins",
     "type": "assert",
     "code": "t = ForwardingTable()\nt.add(\"10.0.0.0/8\", \"A\")\nt.add(\"10.1.0.0/16\", \"B\")\nt.add(\"10.1.2.0/24\", \"C\")\nassert t.lookup(\"10.1.2.3\") == \"C\"\nassert t.lookup(\"10.1.9.9\") == \"B\"\nassert t.lookup(\"10.200.0.1\") == \"A\"\nassert t.lookup(\"11.0.0.1\") is None\n"
    },
    {
     "label": "A default route and a host route",
     "type": "assert",
     "code": "t = ForwardingTable()\nt.add(\"0.0.0.0/0\", \"ISP\")\nt.add(\"192.168.1.0/24\", \"LAN\")\nt.add(\"192.168.1.77/32\", \"printer\")\nassert t.lookup(\"8.8.8.8\") == \"ISP\"\nassert t.lookup(\"192.168.1.5\") == \"LAN\"\nassert t.lookup(\"192.168.1.77\") == \"printer\"\n"
    },
    {
     "label": "Prefixes that don't end on a byte",
     "type": "assert",
     "code": "t = ForwardingTable()\nt.add(\"200.23.16.0/20\", \"X\")\nt.add(\"200.23.18.0/23\", \"Y\")\nassert t.lookup(\"200.23.31.255\") == \"X\"\nassert t.lookup(\"200.23.32.0\") is None\nassert t.lookup(\"200.23.19.4\") == \"Y\"\nassert t.lookup(\"200.23.17.4\") == \"X\"\n"
    },
    {
     "label": "Replacing a route",
     "type": "assert",
     "code": "t = ForwardingTable()\nt.add(\"10.0.0.0/8\", \"A\")\nt.add(\"10.0.0.0/8\", \"B\")\nassert t.lookup(\"10.9.9.9\") == \"B\"\n"
    },
    {
     "label": "Malformed prefixes",
     "type": "assert",
     "code": "t = ForwardingTable()\nfor p in (\"10.1.2.3/16\", \"10.0.0/8\", \"10.0.0.0\", \"10.0.0.256/32\", \"10.0.0.0/33\"):\n    try:\n        t.add(p, \"A\")\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f\"{p} should raise ValueError\")\n"
    },
    {
     "label": "Doesn't use the ipaddress module",
     "type": "source",
     "code": "assert \"ipaddress\" not in __source__, \"do the bit arithmetic yourself\"\n"
    },
    {
     "label": "Fast with 20,000 routes",
     "type": "assert",
     "limit": 5,
     "hidden": true,
     "code": "import random\nrng = random.Random(1)\nt = ForwardingTable()\nroutes = []\nfor i in range(20000):\n    n = rng.getrandbits(24) << 8\n    routes.append(n)\n    t.add(f\"{n >> 24}.{(n >> 16) & 255}.{(n >> 8) & 255}.0/24\", i)\nfor i, n in enumerate(routes):\n    hop = t.lookup(f\"{n >> 24}.{(n >> 16) & 255}.{(n >> 8) & 255}.7\")\n    assert hop is not None\n"
    }
   ]
  },
  {
   "id": "ipv4_header",
   "title": "Reading and forwarding an IPv4 header",
   "prompt": "<p>Write two functions on IPv4 headers given as <code>bytes</code>.</p>\n<p><code>parse_ipv4(packet)</code> returns a dict with keys <code>\"version\"</code>, <code>\"header_len\"</code> (in bytes), <code>\"total_len\"</code>, <code>\"id\"</code>, <code>\"df\"</code> and <code>\"mf\"</code> (the Don't Fragment and More Fragments flags, as bools), <code>\"frag_offset\"</code> (in bytes, so the field's value times 8), <code>\"ttl\"</code>, <code>\"protocol\"</code>, <code>\"src\"</code> and <code>\"dst\"</code> (dotted-quad strings). Raise <code>ValueError</code> if the packet is shorter than its header, the version isn't 4, the header length is under 20 bytes, or the header checksum is wrong.</p>\n<p><code>forward(packet)</code> does what a router does before sending a packet on: it returns a new <code>bytes</code> with the TTL decreased by 1 and the header checksum recomputed, the rest unchanged. If the TTL would become 0, return <code>None</code> (the router drops the packet). It raises <code>ValueError</code> for a bad packet, as <code>parse_ipv4</code> does.</p>\n<p>The layout is the IPv4 header figure in the lesson. To compute the checksum, set the checksum field (bytes 10 and 11) to zero and take the Internet checksum of the header.</p>",
   "starter": "def parse_ipv4(packet):\n    pass\n\ndef forward(packet):\n    pass\n",
   "hint": "<p>The first byte holds the version (high 4 bits) and the header length in 32-bit words (low 4 bits). <code>int.from_bytes(packet[6:8], \"big\")</code> holds the flags (bit 14 is DF, bit 13 is MF) and the 13-bit offset. A header with a correct checksum has Internet checksum 0 when you include the checksum field.</p>",
   "solution": "def _checksum(data):\n    s = 0\n    for i in range(0, len(data), 2):\n        s += int.from_bytes(data[i:i + 2], \"big\")\n        s = (s & 0xFFFF) + (s >> 16)\n    return ~s & 0xFFFF\n\ndef parse_ipv4(packet):\n    if len(packet) < 20:\n        raise ValueError(\"too short\")\n    version, ihl = packet[0] >> 4, (packet[0] & 0x0F) * 4\n    if version != 4:\n        raise ValueError(\"not IPv4\")\n    if ihl < 20 or len(packet) < ihl:\n        raise ValueError(\"bad header length\")\n    if _checksum(packet[:ihl]) != 0:\n        raise ValueError(\"bad checksum\")\n    frag = int.from_bytes(packet[6:8], \"big\")\n    dotted = lambda b: \".\".join(str(x) for x in b)\n    return {\"version\": version, \"header_len\": ihl,\n            \"total_len\": int.from_bytes(packet[2:4], \"big\"),\n            \"id\": int.from_bytes(packet[4:6], \"big\"),\n            \"df\": bool(frag & 0x4000), \"mf\": bool(frag & 0x2000),\n            \"frag_offset\": (frag & 0x1FFF) * 8,\n            \"ttl\": packet[8], \"protocol\": packet[9],\n            \"src\": dotted(packet[12:16]), \"dst\": dotted(packet[16:20])}\n\ndef forward(packet):\n    h = parse_ipv4(packet)\n    if h[\"ttl\"] <= 1:\n        return None\n    ihl = h[\"header_len\"]\n    hdr = bytearray(packet[:ihl])\n    hdr[8] -= 1\n    hdr[10:12] = b\"\\x00\\x00\"\n    hdr[10:12] = _checksum(bytes(hdr)).to_bytes(2, \"big\")\n    return bytes(hdr) + packet[ihl:]\n",
   "tests": [
    {
     "label": "Parse a UDP packet's header",
     "call": "parse_ipv4(bytes.fromhex('450000730000400040 11b861c0a80001c0a800c7'.replace(' ', '')))",
     "expect": "{'version': 4, 'header_len': 20, 'total_len': 115, 'id': 0, 'df': True, 'mf': False, 'frag_offset': 0, 'ttl': 64, 'protocol': 17, 'src': '192.168.0.1', 'dst': '192.168.0.199'}"
    },
    {
     "label": "A fragment's flags and offset",
     "type": "assert",
     "code": "def ck(h):\n    s = 0\n    for i in range(0, len(h), 2):\n        s += int.from_bytes(h[i:i + 2], \"big\"); s = (s & 0xFFFF) + (s >> 16)\n    return ~s & 0xFFFF\nh = bytearray(bytes.fromhex(\"450005dc1c4620b9\" + \"3f060000\" + \"0a000001\" + \"0a000002\"))\nh[10:12] = ck(bytes(h)).to_bytes(2, \"big\")\np = parse_ipv4(bytes(h))\nassert p[\"mf\"] is True and p[\"df\"] is False, p\nassert p[\"frag_offset\"] == 185 * 8, p[\"frag_offset\"]\nassert p[\"ttl\"] == 63 and p[\"protocol\"] == 6 and p[\"id\"] == 0x1c46, p\n"
    },
    {
     "label": "Forwarding decrements the TTL and fixes the checksum",
     "type": "assert",
     "code": "pkt = bytes.fromhex(\"45000073000040004011b861c0a80001c0a800c7\") + b\"payload\"\nout = forward(pkt)\nassert out is not None\nassert out[8] == 63, out[8]\nassert out[10:12] == bytes.fromhex(\"b961\"), out[10:12].hex()\nassert out[20:] == b\"payload\"\nassert parse_ipv4(out)[\"ttl\"] == 63\n"
    },
    {
     "label": "TTL 1 is dropped",
     "type": "assert",
     "code": "pkt = bytearray(bytes.fromhex(\"45000073000040004011b861c0a80001c0a800c7\"))\npkt[8] = 1\npkt[10:12] = b\"\\x00\\x00\"\ns = 0\nfor i in range(0, 20, 2):\n    s += int.from_bytes(pkt[i:i + 2], \"big\"); s = (s & 0xFFFF) + (s >> 16)\npkt[10:12] = (~s & 0xFFFF).to_bytes(2, \"big\")\nassert parse_ipv4(bytes(pkt))[\"ttl\"] == 1\nassert forward(bytes(pkt)) is None\n"
    },
    {
     "label": "Bad packets",
     "type": "assert",
     "code": "good = bytes.fromhex(\"45000073000040004011b861c0a80001c0a800c7\")\nbad = [good[:19], b\"\\x65\" + good[1:], good[:10] + b\"\\x00\\x00\" + good[12:], b\"\\x44\" + good[1:]]\nfor b in bad:\n    for f in (parse_ipv4, forward):\n        try:\n            f(b)\n        except ValueError:\n            pass\n        else:\n            raise AssertionError(f\"{f.__name__}({b.hex()}) should raise ValueError\")\n"
    },
    {
     "label": "Headers with options",
     "type": "assert",
     "hidden": true,
     "code": "def ck(h):\n    s = 0\n    for i in range(0, len(h), 2):\n        s += int.from_bytes(h[i:i + 2], \"big\"); s = (s & 0xFFFF) + (s >> 16)\n    return ~s & 0xFFFF\nh = bytearray(bytes.fromhex(\"4600002000010000\" + \"08110000\" + \"01020304\" + \"05060708\" + \"01010100\"))\nh[10:12] = ck(bytes(h)).to_bytes(2, \"big\")\np = parse_ipv4(bytes(h) + b\"data\")\nassert p[\"header_len\"] == 24, p\nout = forward(bytes(h) + b\"data\")\nassert out[8] == 7 and ck(out[:24]) == 0 and out[24:] == b\"data\"\n"
    }
   ]
  }
 ],
 "nw4": [
  {
   "id": "link_state",
   "title": "Link-state routing: a forwarding table from Dijkstra",
   "prompt": "<p>In link-state routing every router knows the whole graph and computes its own forwarding table. Write <code>forwarding_table(graph, source)</code>, where <code>graph</code> maps each router to a dict of its neighbours and positive link costs (every link appears in both directions), returning a dict that maps each other reachable router to a pair <code>(next_hop, cost)</code>: the neighbour of <code>source</code> on a cheapest path, and that path's cost.</p>\n<p>When several cheapest paths exist, choose the one whose next hop comes first in alphabetical order (Python's <code>&lt;</code> on strings). Routers that can't be reached are left out.</p>",
   "starter": "def forwarding_table(graph, source):\n    pass\n",
   "hint": "<p>Run CS 220's Dijkstra with heap entries <code>(cost, first_hop, router)</code>. A neighbour of the source has itself as its first hop; any other router inherits the first hop of the router it was reached from. Because tuples compare element by element, the heap breaks cost ties by first hop for you; a router's entry is final the first time it is popped.</p>",
   "solution": "import heapq\n\ndef forwarding_table(graph, source):\n    heap = [(c, v, v) for v, c in graph[source].items()]\n    heapq.heapify(heap)\n    table = {}\n    while heap:\n        cost, hop, u = heapq.heappop(heap)\n        if u in table or u == source:\n            continue\n        table[u] = (hop, cost)\n        for v, c in graph[u].items():\n            if v not in table and v != source:\n                heapq.heappush(heap, (cost + c, hop, v))\n    return table\n",
   "tests": [
    {
     "label": "The lesson's six-router network",
     "call": "forwarding_table({'u': {'v': 2, 'x': 1, 'w': 5}, 'v': {'u': 2, 'x': 2, 'w': 3}, 'w': {'u': 5, 'v': 3, 'x': 3, 'y': 1, 'z': 5}, 'x': {'u': 1, 'v': 2, 'w': 3, 'y': 1}, 'y': {'x': 1, 'w': 1, 'z': 2}, 'z': {'w': 5, 'y': 2}}, 'u')",
     "expect": "{'x': ('x', 1), 'v': ('v', 2), 'y': ('x', 2), 'w': ('x', 3), 'z': ('x', 4)}"
    },
    {
     "label": "Ties go to the first next hop alphabetically",
     "call": "forwarding_table({'s': {'b': 1, 'a': 1}, 'a': {'s': 1, 't': 1}, 'b': {'s': 1, 't': 1}, 't': {'a': 1, 'b': 1}}, 's')",
     "expect": "{'a': ('a', 1), 'b': ('b', 1), 't': ('a', 2)}"
    },
    {
     "label": "A direct link isn't always best",
     "call": "forwarding_table({'A': {'B': 10, 'C': 1}, 'B': {'A': 10, 'C': 2}, 'C': {'A': 1, 'B': 2}}, 'A')",
     "expect": "{'C': ('C', 1), 'B': ('C', 3)}"
    },
    {
     "label": "Unreachable routers are left out",
     "call": "forwarding_table({'A': {'B': 1}, 'B': {'A': 1}, 'C': {}}, 'A')",
     "expect": "{'B': ('B', 1)}"
    },
    {
     "label": "A tie deep in the path",
     "call": "forwarding_table({'s': {'p': 1, 'q': 2}, 'p': {'s': 1, 'r': 2}, 'q': {'s': 2, 'r': 1}, 'r': {'p': 2, 'q': 1, 't': 1}, 't': {'r': 1}}, 's')",
     "expect": "{'p': ('p', 1), 'q': ('q', 2), 'r': ('p', 3), 't': ('p', 4)}",
     "hidden": true
    }
   ]
  },
  {
   "id": "distance_vector",
   "title": "Distance-vector routing and counting to infinity",
   "prompt": "<p>Simulate distance-vector routing in synchronous rounds. Write a class <code>DVNetwork(links, poison=False, infinity=16)</code>, where <code>links</code> maps pairs <code>(a, b)</code> to positive costs (each link listed once; links are two-way). The routers are the names that appear in <code>links</code>. At the start each router knows only itself: its distance to itself is 0, and every other distance is <code>infinity</code> with no next hop.</p>\n<ul>\n<li><code>step()</code> runs one round. Every router <em>x</em> simultaneously reads the distance vectors its neighbours had at the end of the previous round and recomputes, for every other router <em>y</em>, D<sub><em>x</em></sub>(<em>y</em>) = min over neighbours <em>v</em> of c(<em>x</em>, <em>v</em>) + D<sub><em>v</em></sub>(<em>y</em>), capped at <code>infinity</code>. The next hop is the minimizing <em>v</em> (on ties, the first in alphabetical order), or <code>None</code> if the distance is <code>infinity</code>. With <code>poison=True</code>, a neighbour <em>v</em> whose own next hop to <em>y</em> is <em>x</em> tells <em>x</em> that its distance to <em>y</em> is <code>infinity</code> (poisoned reverse). Return <code>True</code> if any distance or next hop changed.</li>\n<li><code>run(max_rounds=100)</code> calls <code>step()</code> until a round changes nothing (or <code>max_rounds</code> rounds have run) and returns the number of rounds that changed something.</li>\n<li><code>set_link(a, b, cost)</code> changes a link's cost, adds a new link, or, with <code>cost=None</code>, removes the link. Tables change only in later rounds.</li>\n<li><code>dist(x, y)</code> and <code>next_hop(x, y)</code> report <em>x</em>'s current table.</li>\n</ul>",
   "starter": "class DVNetwork:\n    def __init__(self, links, poison=False, infinity=16):\n        pass\n\n    def set_link(self, a, b, cost):\n        pass\n\n    def step(self):\n        pass\n\n    def run(self, max_rounds=100):\n        pass\n\n    def dist(self, x, y):\n        pass\n\n    def next_hop(self, x, y):\n        pass\n",
   "hint": "<p>Keep a neighbour dict <code>nbr[x] = {v: cost}</code> and a table <code>table[x] = {y: (dist, hop)}</code>. In <code>step</code>, build every new table from the old ones before replacing any of them: that is what \"simultaneously\" means. Loop over neighbours in sorted order and update only on a strictly smaller distance, so ties go to the first.</p>",
   "solution": "class DVNetwork:\n    def __init__(self, links, poison=False, infinity=16):\n        self.poison, self.inf = poison, infinity\n        self.nbr = {}\n        for (a, b), c in links.items():\n            self.nbr.setdefault(a, {})[b] = c\n            self.nbr.setdefault(b, {})[a] = c\n        self.nodes = sorted(self.nbr)\n        self.table = {x: {y: (0 if x == y else infinity, x if x == y else None) for y in self.nodes}\n                      for x in self.nodes}\n\n    def set_link(self, a, b, cost):\n        for u, v in ((a, b), (b, a)):\n            if cost is None:\n                self.nbr[u].pop(v, None)\n            else:\n                self.nbr[u][v] = cost\n\n    def _told(self, v, x, y):\n        d, hop = self.table[v][y]\n        return self.inf if self.poison and hop == x and v != y else d\n\n    def step(self):\n        new = {}\n        for x in self.nodes:\n            row = {x: (0, x)}\n            for y in self.nodes:\n                if y == x:\n                    continue\n                best, hop = self.inf, None\n                for v in sorted(self.nbr[x]):\n                    d = self.nbr[x][v] + self._told(v, x, y)\n                    if d < best:\n                        best, hop = d, v\n                row[y] = (best, hop)\n            new[x] = row\n        changed = new != self.table\n        self.table = new\n        return changed\n\n    def run(self, max_rounds=100):\n        n = 0\n        while n < max_rounds and self.step():\n            n += 1\n        return n\n\n    def dist(self, x, y):\n        return self.table[x][y][0]\n\n    def next_hop(self, x, y):\n        return self.table[x][y][1]\n",
   "tests": [
    {
     "label": "Converging on a triangle",
     "type": "assert",
     "code": "n = DVNetwork({(\"x\", \"y\"): 2, (\"y\", \"z\"): 1, (\"x\", \"z\"): 7})\nr = n.run()\nassert r == 2, f\"expected 2 rounds that change something, got {r}\"\nassert n.dist(\"x\", \"z\") == 3 and n.next_hop(\"x\", \"z\") == \"y\"\nassert n.dist(\"z\", \"x\") == 3 and n.next_hop(\"z\", \"x\") == \"y\"\nassert n.dist(\"x\", \"x\") == 0\n"
    },
    {
     "label": "After one round, only neighbours are known",
     "type": "assert",
     "code": "n = DVNetwork({(\"A\", \"B\"): 1, (\"B\", \"C\"): 1, (\"C\", \"D\"): 1})\nn.step()\nassert n.dist(\"A\", \"B\") == 1 and n.dist(\"A\", \"C\") == 16 and n.next_hop(\"A\", \"C\") is None\nassert n.run() == 2\nassert n.dist(\"A\", \"D\") == 3\n"
    },
    {
     "label": "Good news travels fast",
     "type": "assert",
     "code": "n = DVNetwork({(\"x\", \"y\"): 4, (\"y\", \"z\"): 1, (\"x\", \"z\"): 50})\nn.run()\nn.set_link(\"x\", \"y\", 1)\nassert n.run() == 2\nassert n.dist(\"z\", \"x\") == 2 and n.next_hop(\"z\", \"x\") == \"y\"\n"
    },
    {
     "label": "Counting to infinity",
     "type": "assert",
     "code": "n = DVNetwork({(\"A\", \"B\"): 1, (\"B\", \"C\"): 1})\nn.run()\nn.set_link(\"A\", \"B\", None)\nr = n.run()\nassert n.dist(\"C\", \"A\") == 16 and n.next_hop(\"C\", \"A\") is None\nassert r == 15, f\"expected 15 rounds of counting up, got {r}\"\n"
    },
    {
     "label": "Poisoned reverse stops the count",
     "type": "assert",
     "code": "n = DVNetwork({(\"A\", \"B\"): 1, (\"B\", \"C\"): 1}, poison=True)\nn.run()\nn.set_link(\"A\", \"B\", None)\nr = n.run()\nassert n.dist(\"C\", \"A\") == 16 and n.dist(\"B\", \"A\") == 16\nassert r == 2, f\"expected 2 rounds, got {r}\"\n"
    },
    {
     "label": "Bad news with an alternative path",
     "type": "assert",
     "hidden": true,
     "code": "n = DVNetwork({(\"x\", \"y\"): 4, (\"y\", \"z\"): 1, (\"x\", \"z\"): 10}, infinity=100)\nn.run()\nn.set_link(\"x\", \"y\", 60)\nr = n.run()\nassert n.dist(\"y\", \"x\") == 11 and n.next_hop(\"y\", \"x\") == \"z\"\nassert n.dist(\"z\", \"x\") == 10 and n.next_hop(\"z\", \"x\") == \"x\"\nassert r == 7, r\n"
    }
   ]
  }
 ],
 "nw5": [
  {
   "id": "go_back_n",
   "title": "A go-back-N sender over a lossy channel",
   "prompt": "<p>Simulate go-back-N in whole time steps (\"ticks\"). Write <code>gbn(n, window, delay, timeout, lost=(), lost_acks=())</code>: the sender must deliver packets 0 to <code>n</code> − 1; a packet or ACK takes <code>delay</code> ticks (at least 1) to cross the channel. Return <code>(sends, finish)</code>: the list of <code>(tick, seq)</code> for every data transmission, in order, and the tick at which the sender learns that every packet has arrived.</p>\n<p>At each tick <em>t</em> = 0, 1, 2, …, the sender does three things in this order:</p>\n<ol>\n<li>Each ACK arriving at <em>t</em> carries a number <em>a</em> meaning \"I have everything before <em>a</em>\". If <em>a</em> &gt; base, set base = <em>a</em>; then if packets are still unacknowledged (base &lt; next), restart the timer at <em>t</em>, otherwise stop it.</li>\n<li>If the timer is running and <em>t</em> − (its start) ≥ <code>timeout</code>, go back: next = base, and restart the timer at <em>t</em>.</li>\n<li>If next &lt; base + <code>window</code> and next &lt; <code>n</code>, send packet next (at most one packet per tick), start the timer if it isn't running, and increase next.</li>\n</ol>\n<p>The receiver keeps <em>expected</em>, initially 0. When packet <em>s</em> arrives, if <em>s</em> = expected it increases expected; either way it sends back an ACK carrying expected. Data transmissions are numbered 0, 1, 2, … in the order sent, and transmission <em>k</em> is lost if <em>k</em> is in <code>lost</code>; ACKs are numbered the same way in the order the receiver sends them, and lost if their number is in <code>lost_acks</code>. The finish tick is the tick at which base reaches <code>n</code>.</p>",
   "starter": "def gbn(n, window, delay, timeout, lost=(), lost_acks=()):\n    pass\n",
   "hint": "<p>Keep two dicts from arrival tick to what arrives: data at the receiver and ACKs at the sender. Because the sender sends at most once per tick, at most one packet arrives per tick, and at most one ACK. Process the receiver's arrival for tick <em>t</em> before the sender's step, or after: with <code>delay</code> ≥ 1 it makes no difference.</p>",
   "solution": "def gbn(n, window, delay, timeout, lost=(), lost_acks=()):\n    lost, lost_acks = set(lost), set(lost_acks)\n    base = nxt = 0\n    timer = None\n    expected = 0\n    data_at, ack_at = {}, {}\n    sends = []\n    n_tx = n_ack = 0\n    t = 0\n    while base < n:\n        if t in data_at:                       # receiver\n            s = data_at.pop(t)\n            if s == expected:\n                expected += 1\n            if n_ack not in lost_acks:\n                ack_at[t + delay] = expected\n            n_ack += 1\n        if t in ack_at:                        # 1. ACK\n            a = ack_at.pop(t)\n            if a > base:\n                base = a\n                timer = t if base < nxt else None\n        if base >= n:\n            break\n        if timer is not None and t - timer >= timeout:   # 2. timeout\n            nxt = base\n            timer = t\n        if nxt < base + window and nxt < n:     # 3. send\n            sends.append((t, nxt))\n            if n_tx not in lost:\n                data_at[t + delay] = nxt\n            n_tx += 1\n            if timer is None:\n                timer = t\n            nxt += 1\n        t += 1\n        if t > 100000:\n            raise RuntimeError(\"no progress\")\n    return sends, t\n",
   "tests": [
    {
     "label": "No losses",
     "call": "gbn(4, 2, 2, 10)",
     "expect": "([(0, 0), (1, 1), (4, 2), (5, 3)], 9)"
    },
    {
     "label": "A big enough window keeps the pipe full",
     "call": "gbn(4, 4, 2, 10)",
     "expect": "([(0, 0), (1, 1), (2, 2), (3, 3)], 7)"
    },
    {
     "label": "One lost packet: go back",
     "call": "gbn(4, 3, 1, 5, lost={1})",
     "expect": "([(0, 0), (1, 1), (2, 2), (3, 3), (7, 1), (8, 2), (9, 3)], 11)"
    },
    {
     "label": "A lost ACK is covered by the next one",
     "call": "gbn(3, 3, 1, 5, lost_acks={0})",
     "expect": "([(0, 0), (1, 1), (2, 2)], 4)"
    },
    {
     "label": "Stop-and-wait is go-back-1",
     "call": "gbn(3, 1, 1, 4, lost={1})",
     "expect": "([(0, 0), (2, 1), (6, 1), (8, 2)], 10)"
    },
    {
     "label": "A burst of losses",
     "call": "gbn(5, 3, 2, 6, lost={0, 1, 2})",
     "expect": "([(0, 0), (1, 1), (2, 2), (6, 0), (7, 1), (8, 2), (10, 3), (11, 4)], 15)",
     "hidden": true
    }
   ]
  },
  {
   "id": "selective_repeat",
   "title": "A selective-repeat receiver",
   "prompt": "<p>Write a class <code>SRReceiver(window, seq_space)</code> for selective repeat with sequence numbers 0 to <code>seq_space</code> − 1, reused cyclically. Raise <code>ValueError</code> if <code>window</code> is less than 1 or more than <code>seq_space // 2</code>, since a larger window lets an old retransmission be mistaken for new data.</p>\n<p>The receiver keeps <code>base</code>, the sequence number of the first packet it hasn't yet delivered (initially 0). <code>receive(seq, data)</code> returns <code>(ack, delivered)</code>:</p>\n<ul>\n<li>If <code>seq</code> is in the window, the <code>window</code> numbers from base on (counting modulo <code>seq_space</code>), buffer the data (a duplicate replaces nothing), ACK <code>seq</code>, and deliver every buffered packet from base onwards that has no gap before it, moving base past them.</li>\n<li>If <code>seq</code> is in the <code>window</code> numbers before base, it is a retransmission of something already delivered (its ACK was lost): ACK it again and deliver nothing.</li>\n<li>Otherwise ignore it: return <code>(None, [])</code>.</li>\n</ul>\n<p><code>delivered</code> is the list of <code>data</code> values handed to the application, in order.</p>",
   "starter": "class SRReceiver:\n    def __init__(self, window, seq_space):\n        pass\n\n    def receive(self, seq, data):\n        pass\n",
   "hint": "<p><code>(seq - self.base) % seq_space</code> is how far <code>seq</code> is ahead of base, counting around the circle: it is in the window if that is less than <code>window</code>. Similarly <code>(self.base - seq) % seq_space</code> between 1 and <code>window</code> means it is just behind.</p>",
   "solution": "class SRReceiver:\n    def __init__(self, window, seq_space):\n        if not 1 <= window <= seq_space // 2:\n            raise ValueError(\"window must be between 1 and half the sequence space\")\n        self.w, self.m = window, seq_space\n        self.base = 0\n        self.buf = {}\n\n    def receive(self, seq, data):\n        ahead = (seq - self.base) % self.m\n        if ahead < self.w:\n            self.buf.setdefault(seq, data)\n            out = []\n            while self.base in self.buf:\n                out.append(self.buf.pop(self.base))\n                self.base = (self.base + 1) % self.m\n            return seq, out\n        if 1 <= (self.base - seq) % self.m <= self.w:\n            return seq, []\n        return None, []\n",
   "tests": [
    {
     "label": "In order",
     "type": "assert",
     "code": "r = SRReceiver(3, 8)\nassert r.receive(0, \"a\") == (0, [\"a\"])\nassert r.receive(1, \"b\") == (1, [\"b\"])\nassert r.base == 2\n"
    },
    {
     "label": "A gap is filled later",
     "type": "assert",
     "code": "r = SRReceiver(4, 8)\nassert r.receive(0, \"a\") == (0, [\"a\"])\nassert r.receive(2, \"c\") == (2, [])\nassert r.receive(3, \"d\") == (3, [])\nassert r.receive(1, \"b\") == (1, [\"b\", \"c\", \"d\"])\nassert r.base == 4\n"
    },
    {
     "label": "Old retransmissions are re-ACKed, far ones ignored",
     "type": "assert",
     "code": "r = SRReceiver(3, 8)\nfor s, d in ((0, \"a\"), (1, \"b\"), (2, \"c\")):\n    r.receive(s, d)\nassert r.receive(1, \"b\") == (1, []), \"a retransmission of delivered data must be ACKed again\"\nassert r.receive(6, \"?\") == (None, []), \"6 is neither in the window 3-5 nor in 0-2\"\n"
    },
    {
     "label": "Sequence numbers wrap around",
     "type": "assert",
     "code": "r = SRReceiver(2, 4)\nout = []\nfor s, d in ((0, \"a\"), (1, \"b\"), (2, \"c\"), (3, \"d\")):\n    out += r.receive(s, d)[1]\nassert r.base == 0\nassert r.receive(1, \"f\") == (1, [])\nassert r.receive(0, \"e\") == (0, [\"e\", \"f\"])\nassert out == [\"a\", \"b\", \"c\", \"d\"]\n"
    },
    {
     "label": "Window too big",
     "type": "assert",
     "code": "for w, m in ((3, 4), (0, 8), (5, 8)):\n    try:\n        SRReceiver(w, m)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f\"SRReceiver({w}, {m}) should raise ValueError\")\nSRReceiver(4, 8)\n"
    },
    {
     "label": "Duplicates in the window aren't delivered twice",
     "type": "assert",
     "hidden": true,
     "code": "r = SRReceiver(4, 16)\nassert r.receive(2, \"c\") == (2, [])\nassert r.receive(2, \"c2\") == (2, [])\nassert r.receive(0, \"a\") == (0, [\"a\"])\nassert r.receive(1, \"b\") == (1, [\"b\", \"c\"])\n"
    }
   ]
  }
 ],
 "nw6": [
  {
   "id": "rto",
   "title": "Estimating RTT and setting TCP's timeout",
   "prompt": "<p>Write a class <code>RTOEstimator(min_rto=1.0, max_rto=60.0)</code> that follows RFC 6298, with times in seconds:</p>\n<ul>\n<li>Before any measurement, <code>rto</code> (an attribute) is 1.0.</li>\n<li><code>sample(r, retransmitted=False)</code> takes one RTT measurement <code>r</code>. If the segment was retransmitted, ignore the sample (Karn's algorithm). For the first sample, set SRTT = <em>r</em> and RTTVAR = <em>r</em>/2. After that, set RTTVAR = (3/4)·RTTVAR + (1/4)·|SRTT − <em>r</em>| (using the old SRTT), then SRTT = (7/8)·SRTT + (1/8)·<em>r</em>. Then set <code>rto</code> = SRTT + 4·RTTVAR, raised to <code>min_rto</code> if smaller and lowered to <code>max_rto</code> if larger.</li>\n<li><code>timeout()</code>: the timer expired, so back off: double <code>rto</code>, up to <code>max_rto</code>.</li>\n<li>Attributes <code>srtt</code> and <code>rttvar</code> hold the current estimates (<code>None</code> before the first sample).</li>\n</ul>",
   "starter": "class RTOEstimator:\n    def __init__(self, min_rto=1.0, max_rto=60.0):\n        pass\n\n    def sample(self, r, retransmitted=False):\n        pass\n\n    def timeout(self):\n        pass\n",
   "hint": "<p>Update RTTVAR before SRTT: it needs the old SRTT. The order of the two clamps doesn't matter as long as <code>min_rto</code> ≤ <code>max_rto</code>.</p>",
   "solution": "class RTOEstimator:\n    def __init__(self, min_rto=1.0, max_rto=60.0):\n        self.min_rto, self.max_rto = min_rto, max_rto\n        self.srtt = self.rttvar = None\n        self.rto = 1.0\n\n    def sample(self, r, retransmitted=False):\n        if retransmitted:\n            return\n        if self.srtt is None:\n            self.srtt, self.rttvar = r, r / 2\n        else:\n            self.rttvar = 0.75 * self.rttvar + 0.25 * abs(self.srtt - r)\n            self.srtt = 0.875 * self.srtt + 0.125 * r\n        self.rto = min(self.max_rto, max(self.min_rto, self.srtt + 4 * self.rttvar))\n\n    def timeout(self):\n        self.rto = min(self.max_rto, 2 * self.rto)\n",
   "tests": [
    {
     "label": "First sample",
     "type": "assert",
     "code": "e = RTOEstimator(min_rto=0.2)\nassert e.rto == 1.0 and e.srtt is None\ne.sample(0.1)\nassert abs(e.srtt - 0.1) < 1e-12 and abs(e.rttvar - 0.05) < 1e-12\nassert abs(e.rto - 0.3) < 1e-12, e.rto\n"
    },
    {
     "label": "A series of samples",
     "type": "assert",
     "code": "e = RTOEstimator(min_rto=0.0)\nfor r in (0.100, 0.120, 0.080, 0.300):\n    e.sample(r)\nassert abs(e.srtt - 0.1247265625) < 1e-9, e.srtt\nassert abs(e.rttvar - 0.078203125) < 1e-9, e.rttvar\nassert abs(e.rto - 0.4375390625) < 1e-9, e.rto\n"
    },
    {
     "label": "The 1 second floor",
     "type": "assert",
     "code": "e = RTOEstimator()\ne.sample(0.05)\nassert e.rto == 1.0, e.rto\n"
    },
    {
     "label": "Backoff and Karn's rule",
     "type": "assert",
     "code": "e = RTOEstimator(min_rto=0.2)\ne.sample(0.1)\ne.timeout(); e.timeout()\nassert abs(e.rto - 1.2) < 1e-12, e.rto\ne.sample(5.0, retransmitted=True)\nassert abs(e.rto - 1.2) < 1e-12, \"a retransmitted segment's sample must be ignored\"\ne.sample(0.1)\nassert abs(e.rto - (0.1 + 4 * 0.0375)) < 1e-12, e.rto\n"
    },
    {
     "label": "The 60 second cap",
     "type": "assert",
     "hidden": true,
     "code": "e = RTOEstimator()\nfor _ in range(10):\n    e.timeout()\nassert e.rto == 60.0, e.rto\ne.sample(40.0)\nassert e.rto == 60.0, e.rto\n"
    }
   ]
  },
  {
   "id": "cwnd_trace",
   "title": "Tracing TCP's congestion window",
   "prompt": "<p>Model TCP Reno's congestion window one round trip at a time, in units of segments (MSS). Write <code>cwnd_trace(rounds, losses, ssthresh=64)</code> that returns the list of the window sizes at the start of rounds 0, 1, …, <code>rounds</code> − 1. The window starts at 1. <code>losses</code> maps a round number to <code>\"dup\"</code> (a loss detected by three duplicate ACKs in that round) or <code>\"timeout\"</code>. At the end of each round:</p>\n<ul>\n<li>on <code>\"dup\"</code>: ssthresh = max(cwnd // 2, 2) and cwnd = ssthresh (fast recovery);</li>\n<li>on <code>\"timeout\"</code>: ssthresh = max(cwnd // 2, 2) and cwnd = 1;</li>\n<li>otherwise, in slow start (cwnd &lt; ssthresh): cwnd = min(2 · cwnd, ssthresh); in congestion avoidance: cwnd = cwnd + 1.</li>\n</ul>\n<p>Also write <code>avg_throughput(trace, mss_bytes, rtt_s)</code>: the average sending rate in bits per second over the trace, if each round sends a full window and lasts one RTT.</p>",
   "starter": "def cwnd_trace(rounds, losses, ssthresh=64):\n    pass\n\ndef avg_throughput(trace, mss_bytes, rtt_s):\n    pass\n",
   "hint": "<p>Append the current cwnd first, then apply the end-of-round rule. Throughput is total bits sent divided by total time: <code>sum(trace) * mss_bytes * 8 / (len(trace) * rtt_s)</code>.</p>",
   "solution": "def cwnd_trace(rounds, losses, ssthresh=64):\n    cwnd, out = 1, []\n    for r in range(rounds):\n        out.append(cwnd)\n        event = losses.get(r)\n        if event in (\"dup\", \"timeout\"):\n            ssthresh = max(cwnd // 2, 2)\n            cwnd = ssthresh if event == \"dup\" else 1\n        elif cwnd < ssthresh:\n            cwnd = min(2 * cwnd, ssthresh)\n        else:\n            cwnd += 1\n    return out\n\ndef avg_throughput(trace, mss_bytes, rtt_s):\n    return sum(trace) * mss_bytes * 8 / (len(trace) * rtt_s)\n",
   "tests": [
    {
     "label": "Slow start up to ssthresh, then linear",
     "call": "cwnd_trace(8, {}, ssthresh=8)",
     "expect": "[1, 2, 4, 8, 9, 10, 11, 12]"
    },
    {
     "label": "Slow start stops exactly at ssthresh",
     "call": "cwnd_trace(6, {}, ssthresh=6)",
     "expect": "[1, 2, 4, 6, 7, 8]"
    },
    {
     "label": "Triple duplicate ACK halves the window",
     "call": "cwnd_trace(10, {5: 'dup'}, ssthresh=16)",
     "expect": "[1, 2, 4, 8, 16, 17, 8, 9, 10, 11]"
    },
    {
     "label": "A timeout restarts slow start",
     "call": "cwnd_trace(10, {5: 'timeout'}, ssthresh=16)",
     "expect": "[1, 2, 4, 8, 16, 17, 1, 2, 4, 8]"
    },
    {
     "label": "Average throughput",
     "call": "avg_throughput([10, 11, 12, 13], 1000, 0.1)",
     "expect": "920000.0"
    },
    {
     "label": "A sawtooth",
     "call": "cwnd_trace(14, {3: 'dup', 9: 'dup'}, ssthresh=4)",
     "expect": "[1, 2, 4, 5, 2, 3, 4, 5, 6, 7, 3, 4, 5, 6]",
     "hidden": true
    }
   ]
  }
 ],
 "nw7": [
  {
   "id": "dns_parse",
   "title": "Parsing a DNS response",
   "prompt": "<p>Write <code>parse_dns(msg)</code> that parses a DNS message given as <code>bytes</code> (format in the lesson) and returns a dict with keys:</p>\n<ul>\n<li><code>\"id\"</code>, <code>\"qr\"</code> (bool: is it a response), <code>\"rcode\"</code> (the low 4 bits of the flags);</li>\n<li><code>\"questions\"</code>: a list of <code>(name, qtype)</code>;</li>\n<li><code>\"answers\"</code>: a list of <code>(name, rtype, ttl, data)</code> for the answer section only. <code>data</code> is a dotted-quad string for type 1 (A), the name for types 2 (NS) and 5 (CNAME), and the raw RDATA bytes for any other type.</li>\n</ul>\n<p>Names are written without a final dot, like <code>\"www.example.com\"</code> (the root is <code>\"\"</code>). Support compression pointers: a length byte whose top two bits are 11 means that it and the next byte form a 14-bit offset from the start of the message where the rest of the name is. Raise <code>ValueError</code> if the message ends early, or if pointers loop.</p>",
   "starter": "def parse_dns(msg):\n    pass\n",
   "hint": "<p>Write <code>read_name(msg, pos)</code> returning <code>(name, next_pos)</code>, where <code>next_pos</code> is just after the name <em>where it started</em> (after the 2-byte pointer if there was one). Follow pointers in a loop, counting jumps; more jumps than the message has bytes means a loop. <code>struct.unpack_from(\"!HHHHHH\", msg, 0)</code> reads the header.</p>",
   "solution": "import struct\n\ndef _read_name(msg, pos):\n    labels, end, jumps = [], None, 0\n    while True:\n        if pos >= len(msg):\n            raise ValueError(\"name runs past the end\")\n        n = msg[pos]\n        if n & 0xC0 == 0xC0:\n            if pos + 1 >= len(msg):\n                raise ValueError(\"truncated pointer\")\n            if end is None:\n                end = pos + 2\n            jumps += 1\n            if jumps > len(msg):\n                raise ValueError(\"pointer loop\")\n            pos = ((n & 0x3F) << 8) | msg[pos + 1]\n        elif n == 0:\n            return \".\".join(labels), (end if end is not None else pos + 1)\n        else:\n            if pos + 1 + n > len(msg):\n                raise ValueError(\"label runs past the end\")\n            labels.append(msg[pos + 1:pos + 1 + n].decode(\"ascii\"))\n            pos += 1 + n\n\ndef parse_dns(msg):\n    if len(msg) < 12:\n        raise ValueError(\"short header\")\n    ident, flags, qd, an, ns, ar = struct.unpack_from(\"!HHHHHH\", msg, 0)\n    pos = 12\n    questions = []\n    for _ in range(qd):\n        name, pos = _read_name(msg, pos)\n        if pos + 4 > len(msg):\n            raise ValueError(\"short question\")\n        qtype, _ = struct.unpack_from(\"!HH\", msg, pos)\n        pos += 4\n        questions.append((name, qtype))\n    answers = []\n    for _ in range(an):\n        name, pos = _read_name(msg, pos)\n        if pos + 10 > len(msg):\n            raise ValueError(\"short record\")\n        rtype, _, ttl, rdlen = struct.unpack_from(\"!HHIH\", msg, pos)\n        pos += 10\n        if pos + rdlen > len(msg):\n            raise ValueError(\"short rdata\")\n        rdata = msg[pos:pos + rdlen]\n        if rtype == 1 and rdlen == 4:\n            data = \".\".join(str(b) for b in rdata)\n        elif rtype in (2, 5):\n            data = _read_name(msg, pos)[0]\n        else:\n            data = rdata\n        pos += rdlen\n        answers.append((name, rtype, ttl, data))\n    return {\"id\": ident, \"qr\": bool(flags & 0x8000), \"rcode\": flags & 0xF,\n            \"questions\": questions, \"answers\": answers}\n",
   "tests": [
    {
     "label": "A query",
     "call": "parse_dns(bytes.fromhex('1a2b01000001000000000000076578616d706c6503636f6d0000010001'))",
     "expect": "{'id': 6699, 'qr': False, 'rcode': 0, 'questions': [('example.com', 1)], 'answers': []}"
    },
    {
     "label": "An answer with a compression pointer",
     "call": "parse_dns(bytes.fromhex('1a2b81800001000100000000076578616d706c6503636f6d0000010001c00c0001000100000e1000045db8d822'))['answers']",
     "expect": "[('example.com', 1, 3600, '93.184.216.34')]"
    },
    {
     "label": "A CNAME chain",
     "call": "parse_dns(bytes.fromhex('000181800001000200000000037777770673747564696f03636f6d0000010001c00c000500010000012c000b046564676503636463c010c02c000100010000003c00040a000005'))['answers']",
     "expect": "[('www.studio.com', 5, 300, 'edge.cdc.studio.com'), ('edge.cdc.studio.com', 1, 60, '10.0.0.5')]"
    },
    {
     "label": "Error code and other record types",
     "type": "assert",
     "code": "m = parse_dns(bytes.fromhex(\"beef8183000100000000000002786e0000010001\"))\nassert m[\"rcode\"] == 3 and m[\"qr\"] is True, m\nassert m[\"questions\"] == [(\"xn\", 1)], m[\"questions\"]\nm = parse_dns(bytes.fromhex(\"00078180000100010000000001610000100001c00c001000010000001e000403616263\"))\nassert m[\"answers\"] == [(\"a\", 16, 30, b\"\\x03abc\")], m[\"answers\"]\n"
    },
    {
     "label": "Truncated messages and loops",
     "type": "assert",
     "code": "good = bytes.fromhex(\"1a2b81800001000100000000076578616d706c6503636f6d0000010001c00c0001000100000e1000045db8d822\")\nloop = bytes.fromhex(\"000081800001000000000000c00c00010001\")\nfor bad in (good[:-2], good[:20], good[:5], loop):\n    try:\n        parse_dns(bad)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f\"{bad.hex()} should raise ValueError\")\n"
    },
    {
     "label": "The root name",
     "call": "parse_dns(bytes.fromhex('00098100000100000000000000000200 01'.replace(' ', '')))['questions']",
     "expect": "[('', 2)]",
     "hidden": true
    }
   ]
  },
  {
   "id": "http_parse",
   "title": "Reading HTTP responses from a connection",
   "prompt": "<p>On a persistent HTTP/1.1 connection, responses arrive one after another as a single stream of bytes. Write <code>parse_responses(data)</code> that splits <code>data</code> into responses and returns a list of <code>(status, reason, headers, body)</code>: the status code as an int, the reason phrase as a string, a dict of headers with lowercase names (strip spaces around values; if a name repeats, join the values with <code>\", \"</code>), and the body as bytes.</p>\n<p>Lines end with CRLF (<code>b\"\\r\\n\"</code>) and the headers end with an empty line. The body is framed as follows:</p>\n<ul>\n<li>Status 1xx, 204 and 304 never have a body.</li>\n<li>Otherwise, if <code>Transfer-Encoding</code> is <code>chunked</code>: a series of chunks, each a size line in hexadecimal (anything after a <code>;</code> on that line is ignored), CRLF, that many bytes, CRLF; a chunk of size 0 ends the body, followed by optional trailer lines and an empty line. The body is the chunks joined.</li>\n<li>Otherwise, if <code>Content-Length</code> is present, the body is that many bytes.</li>\n<li>Otherwise the body is everything to the end of the data (the server closes the connection to end it).</li>\n</ul>\n<p>Raise <code>ValueError</code> if the data ends in the middle of a response or a status line is malformed.</p>",
   "starter": "def parse_responses(data):\n    pass\n",
   "hint": "<p>Keep a position <code>pos</code> into <code>data</code>. <code>data.index(b\"\\r\\n\", pos)</code> finds the end of a line (and raises <code>ValueError</code> if there is none, which is what you want). The status line splits as <code>version, code, reason = line.split(\" \", 2)</code>; the reason may be empty. <code>int(size_line, 16)</code> reads a chunk size.</p>",
   "solution": "def _line(data, pos):\n    end = data.index(b\"\\r\\n\", pos)          # ValueError if missing\n    return data[pos:end].decode(\"latin-1\"), end + 2\n\ndef parse_responses(data):\n    out, pos = [], 0\n    while pos < len(data):\n        line, pos = _line(data, pos)\n        parts = line.split(\" \", 2)\n        if len(parts) < 2 or not parts[0].startswith(\"HTTP/\") or not (parts[1].isdigit() and len(parts[1]) == 3):\n            raise ValueError(f\"bad status line {line!r}\")\n        status, reason = int(parts[1]), parts[2] if len(parts) == 3 else \"\"\n        headers = {}\n        while True:\n            line, pos = _line(data, pos)\n            if line == \"\":\n                break\n            name, sep, value = line.partition(\":\")\n            if not sep:\n                raise ValueError(f\"bad header {line!r}\")\n            name, value = name.strip().lower(), value.strip()\n            headers[name] = headers[name] + \", \" + value if name in headers else value\n        if 100 <= status < 200 or status in (204, 304):\n            body = b\"\"\n        elif headers.get(\"transfer-encoding\", \"\").lower() == \"chunked\":\n            chunks = []\n            while True:\n                line, pos = _line(data, pos)\n                size = int(line.split(\";\")[0].strip(), 16)\n                if size == 0:\n                    break\n                if pos + size + 2 > len(data) or data[pos + size:pos + size + 2] != b\"\\r\\n\":\n                    raise ValueError(\"truncated chunk\")\n                chunks.append(data[pos:pos + size])\n                pos += size + 2\n            while True:\n                line, pos = _line(data, pos)\n                if line == \"\":\n                    break\n            body = b\"\".join(chunks)\n        elif \"content-length\" in headers:\n            n = int(headers[\"content-length\"])\n            if pos + n > len(data):\n                raise ValueError(\"truncated body\")\n            body, pos = data[pos:pos + n], pos + n\n        else:\n            body, pos = data[pos:], len(data)\n        out.append((status, reason, headers, body))\n    return out\n",
   "tests": [
    {
     "label": "One response with Content-Length",
     "call": "parse_responses(b'HTTP/1.1 200 OK\\r\\nContent-Type: text/plain\\r\\nContent-Length: 5\\r\\n\\r\\nhello')",
     "expect": "[(200, 'OK', {'content-type': 'text/plain', 'content-length': '5'}, b'hello')]"
    },
    {
     "label": "Two responses on one connection",
     "call": "[(s, b) for s, r, h, b in parse_responses(b'HTTP/1.1 200 OK\\r\\nContent-Length: 2\\r\\n\\r\\nhiHTTP/1.1 404 Not Found\\r\\nContent-Length: 9\\r\\n\\r\\nnot found')]",
     "expect": "[(200, b'hi'), (404, b'not found')]"
    },
    {
     "label": "A chunked body",
     "call": "parse_responses(b'HTTP/1.1 200 OK\\r\\nTransfer-Encoding: chunked\\r\\n\\r\\n4\\r\\nWiki\\r\\n6;x=1\\r\\npedia \\r\\nE\\r\\nin \\r\\n\\r\\nchunks.\\r\\n0\\r\\n\\r\\n')[0][3]",
     "expect": "b'Wikipedia in \\r\\n\\r\\nchunks.'"
    },
    {
     "label": "No body for 304 and 204",
     "call": "[(s, b) for s, r, h, b in parse_responses(b'HTTP/1.1 304 Not Modified\\r\\nETag: \"v2\"\\r\\nContent-Length: 120\\r\\n\\r\\nHTTP/1.1 204 No Content\\r\\n\\r\\n')]",
     "expect": "[(304, b''), (204, b'')]"
    },
    {
     "label": "Repeated headers, spaces, and a body to the end",
     "call": "parse_responses(b'HTTP/1.0 200 \\r\\nVia: a\\r\\nvia:   b  \\r\\n\\r\\nrest of it')",
     "expect": "[(200, '', {'via': 'a, b'}, b'rest of it')]"
    },
    {
     "label": "Truncated or malformed",
     "type": "assert",
     "code": "bad = [b\"HTTP/1.1 200 OK\\r\\nContent-Length: 10\\r\\n\\r\\nshort\",\n       b\"HTTP/1.1 200 OK\\r\\nContent-Length: 1\",\n       b\"HTTP/1.1 OK\\r\\n\\r\\n\",\n       b\"HTTP/1.1 200 OK\\r\\nTransfer-Encoding: chunked\\r\\n\\r\\n5\\r\\nab\"]\nfor d in bad:\n    try:\n        parse_responses(d)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f\"{d!r} should raise ValueError\")\n"
    },
    {
     "label": "Chunked with a trailer, then another response",
     "hidden": true,
     "call": "[(s, b) for s, r, h, b in parse_responses(b'HTTP/1.1 200 OK\\r\\nTransfer-Encoding: Chunked\\r\\n\\r\\n3\\r\\nabc\\r\\n0\\r\\nX-Sum: 1\\r\\n\\r\\nHTTP/1.1 100 Continue\\r\\n\\r\\n')]",
     "expect": "[(200, b'abc'), (100, b'')]"
    }
   ]
  }
 ],
 "nw8": [
  {
   "id": "traceroute",
   "title": "Traceroute in a simulated network",
   "prompt": "<p>Simulate traceroute. The network is given by <code>routes</code>, which maps every node to a dict from destination to next hop (a node with no entry for a destination drops packets for it), and <code>delays</code>, which maps links <code>(a, b)</code> to one-way delays in milliseconds (a link may be listed as <code>(a, b)</code> or <code>(b, a)</code>).</p>\n<p>Write <code>traceroute(routes, delays, src, dst, silent=(), max_hops=30)</code>. For TTL = 1, 2, …, <code>src</code> sends a probe to <code>dst</code> with that TTL. The probe follows next hops from <code>src</code>. When it arrives at <code>dst</code>, <code>dst</code> replies. When it arrives at any other node, that node decreases the TTL; if the TTL is now 0, the node discards the probe and replies with an ICMP Time Exceeded message, unless it is in <code>silent</code> (it sends nothing). Otherwise the node forwards it. Replies travel back over the same links.</p>\n<p>Return a list with one entry per TTL: <code>(ttl, node, rtt_ms)</code> for the node that replied and the round-trip time (twice the sum of the one-way delays to it), or <code>(ttl, None, None)</code> if no reply came. Stop after the probe that reached <code>dst</code>, or after <code>max_hops</code> probes.</p>",
   "starter": "def traceroute(routes, delays, src, dst, silent=(), max_hops=30):\n    pass\n",
   "hint": "<p>For each TTL, walk the probe: <code>node = src</code>, then repeatedly <code>nxt = routes[node].get(dst)</code>, add that link's delay, and check what happens at <code>nxt</code>. A helper <code>delay(a, b)</code> that looks up both orders keeps the walk short.</p>",
   "solution": "def traceroute(routes, delays, src, dst, silent=(), max_hops=30):\n    def delay(a, b):\n        return delays[(a, b)] if (a, b) in delays else delays[(b, a)]\n    out = []\n    for ttl in range(1, max_hops + 1):\n        node, left, oneway, reply = src, ttl, 0, None\n        while True:\n            nxt = routes.get(node, {}).get(dst)\n            if nxt is None:\n                break                          # no route: dropped\n            oneway += delay(node, nxt)\n            node = nxt\n            if node == dst:\n                reply = node\n                break\n            left -= 1\n            if left == 0:\n                reply = None if node in silent else node\n                break\n        if reply is None:\n            out.append((ttl, None, None))\n        else:\n            out.append((ttl, reply, round(2 * oneway, 6)))\n        if reply == dst:\n            break\n    return out\n",
   "tests": [
    {
     "label": "A three-router path",
     "call": "traceroute({'h': {'d': 'r1'}, 'r1': {'d': 'r2'}, 'r2': {'d': 'r3'}, 'r3': {'d': 'd'}}, {('h', 'r1'): 1, ('r1', 'r2'): 5, ('r2', 'r3'): 20, ('r3', 'd'): 2}, 'h', 'd')",
     "expect": "[(1, 'r1', 2), (2, 'r2', 12), (3, 'r3', 52), (4, 'd', 56)]"
    },
    {
     "label": "A router that doesn't answer",
     "call": "traceroute({'h': {'d': 'a'}, 'a': {'d': 'b'}, 'b': {'d': 'd'}}, {('a', 'h'): 1, ('a', 'b'): 1, ('b', 'd'): 1}, 'h', 'd', silent={'a'})",
     "expect": "[(1, None, None), (2, 'b', 4), (3, 'd', 6)]"
    },
    {
     "label": "A routing loop",
     "call": "traceroute({'h': {'d': 'a'}, 'a': {'d': 'b'}, 'b': {'d': 'a'}}, {('h', 'a'): 1, ('a', 'b'): 2}, 'h', 'd', max_hops=5)",
     "expect": "[(1, 'a', 2), (2, 'b', 6), (3, 'a', 10), (4, 'b', 14), (5, 'a', 18)]"
    },
    {
     "label": "No route beyond a router",
     "call": "traceroute({'h': {'d': 'a'}, 'a': {}}, {('h', 'a'): 3}, 'h', 'd', max_hops=3)",
     "expect": "[(1, 'a', 6), (2, None, None), (3, None, None)]"
    },
    {
     "label": "Directly connected",
     "call": "traceroute({'h': {'d': 'd'}}, {('d', 'h'): 0.25}, 'h', 'd')",
     "expect": "[(1, 'd', 0.5)]",
     "hidden": true
    }
   ]
  },
  {
   "id": "firewall",
   "title": "A stateful firewall",
   "prompt": "<p>Write a class <code>Firewall(rules)</code>. Each rule is a tuple <code>(action, proto, src, dst, ports)</code>: <code>action</code> is <code>\"allow\"</code> or <code>\"deny\"</code>; <code>proto</code> is <code>\"tcp\"</code>, <code>\"udp\"</code> or <code>\"any\"</code>; <code>src</code> and <code>dst</code> are CIDR prefixes like <code>\"10.0.0.0/8\"</code> (<code>\"0.0.0.0/0\"</code> matches everything); <code>ports</code> is a pair <code>(low, high)</code> of destination ports, inclusive, or <code>None</code> for any port.</p>\n<p><code>check(proto, src, sport, dst, dport)</code> returns <code>\"allow\"</code> or <code>\"deny\"</code> for one packet:</p>\n<ol>\n<li>If the packet is a reply on a connection the firewall has already allowed, that is, an earlier allowed packet had the same protocol with source and destination (addresses and ports) swapped, allow it.</li>\n<li>Otherwise the first rule that matches decides. If no rule matches, deny.</li>\n<li>When a packet is allowed by a rule, remember its connection, so that replies are allowed by step 1.</li>\n</ol>\n<p>You may use the <code>ipaddress</code> module: <code>ipaddress.ip_address(a) in ipaddress.ip_network(p)</code> tests whether an address is in a prefix.</p>",
   "starter": "class Firewall:\n    def __init__(self, rules):\n        pass\n\n    def check(self, proto, src, sport, dst, dport):\n        pass\n",
   "hint": "<p>Parse each rule's prefixes once, in <code>__init__</code>. Keep a set of allowed connections as tuples <code>(proto, src, sport, dst, dport)</code>; a packet is a reply if <code>(proto, dst, dport, src, sport)</code> is in the set.</p>",
   "solution": "import ipaddress\n\nclass Firewall:\n    def __init__(self, rules):\n        self.rules = [(a, p, ipaddress.ip_network(s), ipaddress.ip_network(d), ports)\n                      for a, p, s, d, ports in rules]\n        self.conns = set()\n\n    def check(self, proto, src, sport, dst, dport):\n        if (proto, dst, dport, src, sport) in self.conns:\n            return \"allow\"\n        s, d = ipaddress.ip_address(src), ipaddress.ip_address(dst)\n        for action, p, sn, dn, ports in self.rules:\n            if p not in (\"any\", proto) or s not in sn or d not in dn:\n                continue\n            if ports is not None and not ports[0] <= dport <= ports[1]:\n                continue\n            if action == \"allow\":\n                self.conns.add((proto, src, sport, dst, dport))\n            return action\n        return \"deny\"\n",
   "tests": [
    {
     "label": "Outbound allowed, replies allowed, unsolicited inbound denied",
     "type": "assert",
     "code": "fw = Firewall([(\"allow\", \"any\", \"10.0.0.0/8\", \"0.0.0.0/0\", None)])\nassert fw.check(\"tcp\", \"10.0.0.5\", 50000, \"93.184.216.34\", 443) == \"allow\"\nassert fw.check(\"tcp\", \"93.184.216.34\", 443, \"10.0.0.5\", 50000) == \"allow\", \"reply on an allowed connection\"\nassert fw.check(\"tcp\", \"93.184.216.34\", 443, \"10.0.0.5\", 50001) == \"deny\", \"a different port is not a reply\"\nassert fw.check(\"tcp\", \"6.6.6.6\", 1234, \"10.0.0.5\", 22) == \"deny\"\n"
    },
    {
     "label": "First match wins",
     "type": "assert",
     "code": "fw = Firewall([(\"deny\", \"tcp\", \"0.0.0.0/0\", \"10.0.0.9/32\", (22, 22)),\n               (\"allow\", \"tcp\", \"0.0.0.0/0\", \"10.0.0.0/24\", (1, 1023))])\nassert fw.check(\"tcp\", \"8.8.8.8\", 4000, \"10.0.0.9\", 22) == \"deny\"\nassert fw.check(\"tcp\", \"8.8.8.8\", 4000, \"10.0.0.8\", 22) == \"allow\"\nassert fw.check(\"tcp\", \"8.8.8.8\", 4000, \"10.0.0.8\", 8080) == \"deny\", \"port outside the range\"\nassert fw.check(\"tcp\", \"8.8.8.8\", 4000, \"10.0.1.8\", 80) == \"deny\", \"address outside the prefix\"\n"
    },
    {
     "label": "Protocols must match",
     "type": "assert",
     "code": "fw = Firewall([(\"allow\", \"udp\", \"0.0.0.0/0\", \"10.0.0.53/32\", (53, 53))])\nassert fw.check(\"udp\", \"1.2.3.4\", 5555, \"10.0.0.53\", 53) == \"allow\"\nassert fw.check(\"tcp\", \"1.2.3.4\", 5555, \"10.0.0.53\", 53) == \"deny\"\nassert fw.check(\"tcp\", \"10.0.0.53\", 53, \"1.2.3.4\", 5555) == \"deny\", \"the udp connection doesn't open tcp\"\nassert fw.check(\"udp\", \"10.0.0.53\", 53, \"1.2.3.4\", 5555) == \"allow\"\n"
    },
    {
     "label": "Denied packets open nothing",
     "type": "assert",
     "code": "fw = Firewall([(\"deny\", \"any\", \"0.0.0.0/0\", \"0.0.0.0/0\", None)])\nassert fw.check(\"tcp\", \"10.0.0.5\", 1000, \"1.1.1.1\", 80) == \"deny\"\nassert fw.check(\"tcp\", \"1.1.1.1\", 80, \"10.0.0.5\", 1000) == \"deny\"\n"
    },
    {
     "label": "No rules means deny",
     "call": "Firewall([]).check('tcp', '1.1.1.1', 1, '2.2.2.2', 2)",
     "expect": "'deny'",
     "hidden": true
    }
   ]
  }
 ]
});
