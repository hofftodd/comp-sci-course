CSA.addCourse({
  id: "cs330",
  code: "CS 330",
  title: "Computer Networks",
  credits: 4,
  kind: "required",
  term: "y3s",
  summary: "How the internet moves data between programs: packets, layers and the delays they meet; links and Ethernet switches; IP addressing, forwarding and routing (from Dijkstra and Bellman–Ford to BGP); reliable transport and TCP's congestion control; DNS, HTTP and content delivery; and networks in practice: queues, measurement, datacenters and security. Real sockets appear as labelled code; every graded problem is a Python simulation or a parser working on real packet formats.",
  prereqs: ["CS 210 Computer Systems I", "CS 220 Algorithms I", "CS 240 Software Engineering I", "CS 310 Operating Systems"],
  outcomes: [
    "Compute transmission, propagation and queueing delays, throughput and the bandwidth-delay product for a path",
    "Explain layering and encapsulation, and read real headers (Ethernet, IPv4, UDP, TCP, DNS) from bytes",
    "Compute and check the Internet checksum and a CRC, and explain what each can detect",
    "Explain how learning switches, ARP, DHCP and NAT let hosts on a network find each other",
    "Divide address space with CIDR prefixes and forward packets by longest-prefix match",
    "Compute routes with link-state and distance-vector algorithms, explain count-to-infinity, and describe BGP's policy routing",
    "Design reliable delivery over a lossy channel and compute the utilization of stop-and-wait and sliding-window protocols",
    "Trace TCP's connection setup, sequence numbers, timeouts, flow control and congestion window",
    "Explain how DNS resolves names and how HTTP/1.1, HTTP/2 and HTTP/3, caches and CDNs deliver content",
    "Measure paths with ping and traceroute, reason about bufferbloat and datacenter topologies, and place TLS and firewalls in the stack"
  ],
  rubric: {
    criteriaFor: "problem sets and projects",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 25, desc: "Weekly: the lesson's programming problems, plus written exercises such as delay calculations, subnet plans, routing tables by hand and TCP window traces." },
      { name: "Projects", weight: 30, desc: "Four projects with real sockets on your own computer: a packet decoder for captured traffic, reliable file transfer over UDP through a lossy network emulator, a distance-vector router in a network simulator, and an HTTP/1.1 server with a caching proxy." },
      { name: "Midterm exam", weight: 15, desc: "Performance, links, IP and routing (lessons 1–4)." },
      { name: "Final exam", weight: 20, desc: "Cumulative, with emphasis on transport, TCP, the application layer and networks in practice (lessons 5–8)." }
    ],
    criteria: [
      { name: "Correctness", desc: "Does it work, including when the network misbehaves?", levels: [
        "Correct on every test, including loss, reordering, duplication, malformed input and timeouts.",
        "Correct in normal operation; a rare loss pattern or malformed packet breaks it.",
        "Works only on a perfect network.",
        "Doesn't work." ] },
      { name: "Protocol reasoning", desc: "Are the design and its behaviour explained?", levels: [
        "States what each side knows and when, explains why the protocol is correct, and backs performance claims with numbers or measurements.",
        "Mostly sound reasoning, with gaps.",
        "Claims without reasons.",
        "No reasoning." ] },
      { name: "Design", desc: "Is it simple and well structured?", levels: [
        "Parsing, state and timers are cleanly separated; no needless complexity; resources such as sockets are always closed.",
        "Sound, with some duplication or tangled state.",
        "Works but is hard to follow or leaks resources.",
        "No discernible structure." ] },
      { name: "Presentation", desc: "Can a reader follow it?", levels: [
        "Readable code and a clear write-up, with timeline or topology diagrams where they help.",
        "Mostly clear.",
        "Hard to follow.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Tools:</b> projects use Python 3 with its <code>socket</code> module on your own computer, plus Wireshark to watch packets and the command-line tools ping, traceroute and dig. The graded problems on this site run in your browser, which can't open network connections, so they work on packets as bytes and on simulated networks.",
      "<b>Network etiquette:</b> run projects on your own machine or the course's lab network. Never scan, flood or probe networks you don't own or haven't been given permission to test.",
      "<b>Collaboration:</b> discuss ideas freely; write your own code and name your collaborators. Projects include short oral checks.",
      "<b>AI assistants:</b> you may use them to explain concepts and error messages, and must say how. Code you submit must be your own, and you must be able to explain every line.",
      "<b>Late work:</b> four late days for projects, used in whole days; then 10% a day."
    ]
  },
  units: [
    {
      id: "nw1",
      title: "How networks work",
      minutes: 90,
      summary: "Packet switching, protocols and the five layers of the internet, encapsulation, how the internet is put together from access networks and ISPs, and performance: transmission, propagation and queueing delay, throughput and the bandwidth-delay product, with worked numbers.",
      notes: `
<p>CS 100 Lesson 1 told how ARPANET sent data as <strong>packets</strong>, small pieces routed separately, in 1969. CS 240 Lesson 6 sent HTTP requests to a server, and CS 310 Lesson 1 noted that a network card interrupts the processor when a packet arrives. This course fills in everything in between: how a request typed in one program reaches another program on a machine across the world, and why it takes the time it does.</p>

<h3>Packets and protocols</h3>
<p>A <strong>network</strong> is a set of <strong>nodes</strong> joined by <strong>links</strong>. Nodes at the edge, such as laptops, phones and servers, are <strong>hosts</strong> (or end systems); nodes inside that pass data along are <strong>switches</strong> and <strong>routers</strong>. A link may be a copper cable, an optical fibre or a radio channel; what matters for now is that it carries bits at some <strong>rate</strong> (or bandwidth), in bits per second.</p>
<p>The old telephone network used <strong>circuit switching</strong>: placing a call reserved a fixed share of every link along the path for the whole call, used or not. The internet uses <strong>packet switching</strong>: a message is cut into packets, each carrying a <strong>header</strong> (where it's going, among other things) in front of its <strong>payload</strong> (the data), and each link is shared on demand. A switch receives a whole packet, stores it, looks at its header and sends it on: <strong>store-and-forward</strong>. When several packets want the same outgoing link at once, the extras wait in a <strong>queue</strong>, and if the queue's memory (its <strong>buffer</strong>) is full, a packet is dropped. Packet switching wastes nothing on silent connections, which is why it won, but it gives no guarantees: packets can be delayed, lost, duplicated or arrive out of order.</p>
<p>Programs on two hosts can only cooperate if they agree on the rules. A <strong>protocol</strong> defines the format of the messages two parties exchange, their order, and what each party does when it sends or receives one, or when something expected doesn't happen. HTTP is a protocol: CS 240 Lesson 6 showed its message format, and that a client that sends a request expects a response with a status code.</p>

<h3>Layers</h3>
<p>Getting data across the world takes many jobs: encoding bits as signals, getting a frame across one link, finding a path across many networks, delivering data to the right program reliably, and the application's own conversation. The internet splits them into <strong>layers</strong>. Each layer provides a service to the layer above, using only the service of the layer below, just as CS 102's abstraction barriers let you use a class without knowing its insides.</p>
<table>
<tr><th>Layer</th><th>Job</th><th>Unit of data</th><th>Examples</th></tr>
<tr><td>5. Application</td><td>What programs say to each other</td><td>message</td><td>HTTP, DNS, SMTP (email)</td></tr>
<tr><td>4. Transport</td><td>Data between two programs (processes)</td><td>segment</td><td>TCP, UDP</td></tr>
<tr><td>3. Network</td><td>Packets between two hosts, across many links</td><td>datagram (packet)</td><td>IP</td></tr>
<tr><td>2. Link</td><td>Frames between two neighbouring nodes</td><td>frame</td><td>Ethernet, Wi-Fi</td></tr>
<tr><td>1. Physical</td><td>Bits as signals on a wire, fibre or radio</td><td>bit</td><td>voltages, light pulses</td></tr>
</table>
<p>The International Organization for Standardization's <strong>OSI model</strong> has seven layers, adding <em>presentation</em> and <em>session</em> between transport and application. The internet doesn't separate those two, but the OSI numbering survives in everyday speech: a "layer 2 switch" works with frames, a "layer 7 load balancer" reads HTTP.</p>
<p>The network layer has a single protocol, IP (the Internet Protocol), which every host and router speaks. Above it, many transport and application protocols; below it, many kinds of link. This shape, called the <em>hourglass</em> or narrow waist, is why any application can run over any link: a new application needs only IP below it, and a new kind of link needs only to carry IP packets.</p>
<p>Routers implement layers 1 to 3 and link-layer switches layers 1 and 2; only hosts implement all five. So TCP and HTTP run only at the ends, while the middle of the network just moves packets. Keeping the core simple and putting intelligence at the edges is the <strong>end-to-end principle</strong>, which the sidebar returns to.</p>

<h3>Encapsulation</h3>
<p>Each layer adds its own header to whatever the layer above hands it, and the receiving side's layers remove them in reverse order: <strong>encapsulation</strong>. Here is a browser's HTTP request on its way out of a laptop over Ethernet.</p>
<figure class="fig"><svg viewBox="0 0 520 190" width="520" role="img" aria-label="Encapsulation: an HTTP message becomes the payload of a TCP segment, which becomes the payload of an IP datagram, which becomes the payload of an Ethernet frame with a header in front and a check sequence at the end.">
<g class="hl"><rect x="300" y="15" width="200" height="28"/></g>
<g class="box"><rect x="250" y="60" width="50" height="28"/><rect x="200" y="105" width="50" height="28"/><rect x="140" y="150" width="60" height="28"/><rect x="500" y="150" width="20" height="28"/></g>
<g class="soft"><rect x="300" y="60" width="200" height="28"/><rect x="250" y="105" width="250" height="28"/><rect x="200" y="150" width="300" height="28"/></g>
<g class="text">
<text x="400" y="34" text-anchor="middle">HTTP request</text>
<text x="275" y="79" text-anchor="middle">TCP</text><text x="400" y="79" text-anchor="middle" class="m">payload: the HTTP message</text>
<text x="225" y="124" text-anchor="middle">IP</text><text x="375" y="124" text-anchor="middle" class="m">payload: the TCP segment</text>
<text x="170" y="169" text-anchor="middle">Ethernet</text><text x="350" y="169" text-anchor="middle" class="m">payload: the IP datagram</text>
<text x="10" y="34">application</text><text x="10" y="79">transport</text><text x="10" y="124">network</text><text x="10" y="169">link</text>
</g></svg><figcaption>Each layer's whole unit becomes the payload of the layer below. The Ethernet frame also ends with a 4-byte frame check sequence (Lesson 2).</figcaption></figure>
<p>Headers cost bytes. A full-size Ethernet frame carries at most 1,500 bytes of payload. TCP and IP headers take 20 bytes each, leaving 1,460 bytes of application data. Ethernet adds a 14-byte header and a 4-byte check sequence, and on the wire each frame is also preceded by an 8-byte preamble and followed by a gap of 12 byte-times of silence. So each 1,460 bytes of data occupies 1,460 + 40 + 18 + 20 = 1,538 byte-times on the link: an efficiency of 1,460 / 1,538 = 94.9%. A "1 Gb/s" Ethernet link can deliver at most about 949 Mb/s of application data over TCP.</p>

<h3>The internet's structure</h3>
<p>The internet is a network of networks. Hosts connect through an <strong>access network</strong>: home Wi-Fi to a cable or fibre line, a phone to a cellular base station, a server to its datacenter's switches. Access networks belong to an <strong>Internet service provider</strong> (ISP). Local ISPs pay larger regional or national ISPs to carry their traffic, and those pay the dozen or so global "tier 1" networks, which reach every destination without paying anyone. Networks of similar size often agree to <strong>peer</strong>: exchange each other's customers' traffic for free, often at an <strong>internet exchange point</strong> (IXP), a building full of routers from many networks. Large content companies such as Google, Netflix and Akamai run their own networks and place servers inside ISPs, close to users (Lesson 7). Each independently run network is an <em>autonomous system</em>, and Lesson 4 shows how they agree on routes.</p>

<h3>Where the time goes</h3>
<p>A packet crossing one link experiences four delays.</p>
<ul>
<li><strong>Processing</strong>: examining the header and choosing the outgoing link, typically microseconds or less in a router.</li>
<li><strong>Queueing</strong>: waiting for packets ahead of it on the outgoing link. From zero to many milliseconds, depending on load.</li>
<li><strong>Transmission</strong>: pushing all the packet's bits onto the link. A packet of <em>L</em> bits on a link of rate <em>R</em> bits per second takes <em>L</em>/<em>R</em>.</li>
<li><strong>Propagation</strong>: the time for a bit to travel the link's length <em>d</em> at the signal's speed <em>s</em>, which is about 2 × 10<sup>8</sup> m/s in fibre or copper (two-thirds of the speed of light): <em>d</em>/<em>s</em>.</li>
</ul>
<p>Transmission and propagation are easy to confuse. Transmission depends on the packet's size and the link's rate, not its length; propagation depends on the length, not the packet. A 1,500-byte packet is 12,000 bits, so on a 100 Mb/s link its transmission delay is 12,000 / 10<sup>8</sup> s = 120 µs, whether the link is 1 m or 1,000 km long. Propagating 1,000 km takes 10<sup>6</sup> / (2 × 10<sup>8</sup>) s = 5 ms, whether the packet is 1 byte or 1,500.</p>
<p>Networking counts in powers of ten: 1 kb/s is 1,000 bits per second, 1 Mb/s is 10<sup>6</sup>. Rates are in bits (lowercase b) and sizes often in bytes (uppercase B), so watch for the factor of 8.</p>
<p><strong>Store-and-forward across several links.</strong> Send one packet of <em>L</em> bits across <em>N</em> links of rate <em>R</em> (ignore propagation for a moment). Each switch must receive the whole packet before sending it on, so the packet takes <em>N</em> · <em>L</em>/<em>R</em>. Now send <em>P</em> packets back to back. The links work like a pipeline (CS 230 Lesson 6): while the second packet crosses link 1, the first crosses link 2. The first packet arrives at <em>N</em> · <em>L</em>/<em>R</em>, and one more arrives every <em>L</em>/<em>R</em> after that, so the last arrives at (<em>N</em> + <em>P</em> − 1) · <em>L</em>/<em>R</em>, plus the links' propagation delays. For 3 links at 1 Mb/s, three 12,000-bit packets (12 ms each to transmit) and 1 ms of propagation per link, the packets arrive at 3 × 12 + 3 = 39 ms, 51 ms and 63 ms. The first programming problem simulates this, including links of different rates.</p>

<h3>Throughput and the bottleneck</h3>
<p><strong>Throughput</strong> is the rate at which data actually arrives at the receiver. A path's throughput is limited by its slowest link, the <strong>bottleneck</strong>: if a server connects at 1 Gb/s, the core links are far faster, and your home connection is 50 Mb/s, a large download can't go faster than 50 Mb/s. If the bottleneck link is shared by 10 busy flows, each gets about a tenth of it.</p>
<p>Worked example: downloading a 25 MB file over a path whose bottleneck is 50 Mb/s with a round-trip time (RTT, the time for a message to go and a reply to come back) of 40 ms. The data is 25 × 8 = 200 Mb, which takes 200 / 50 = 4 s to transmit. Opening the connection and sending the request costs a couple of RTTs (Lesson 6), 80 ms, so about 4.1 s in all. For a 25 KB web page, the arithmetic flips: transmission is 0.2 Mb / 50 Mb/s = 4 ms, so the two RTTs dominate. Large transfers are limited by bandwidth; small ones by latency, and no amount of extra bandwidth helps them.</p>

<h3>The bandwidth-delay product</h3>
<p>How much data is "in the pipe" at once? A link of rate <em>R</em> with one-way propagation delay <em>d</em> holds <em>R</em> · <em>d</em> bits in flight. For a 100 Mb/s path with a 40 ms RTT, a sender that waits for a reply before continuing must have <em>R</em> · RTT = 10<sup>8</sup> × 0.040 = 4 × 10<sup>6</sup> bits = 500 KB sent but not yet acknowledged to keep the path busy. This quantity, the <strong>bandwidth-delay product</strong>, is the window a protocol needs, and it will set the size of TCP's windows (Lessons 5 and 6). Fast, long paths have huge products: 10 Gb/s across an ocean with a 100 ms RTT needs 125 MB in flight.</p>

<h3>Queueing delay</h3>
<p>Queueing is the variable part. Suppose packets of <em>L</em> bits arrive at a link at an average of <em>a</em> packets per second. The <strong>traffic intensity</strong> is <em>ρ</em> = <em>La</em>/<em>R</em>, the fraction of the link's capacity that arrivals demand. If <em>ρ</em> &gt; 1, the queue grows without limit (until the buffer overflows and packets are lost). If <em>ρ</em> ≤ 1, the queue's behaviour depends on how arrivals bunch up. If packets arrived perfectly evenly, none would ever wait. Real traffic is bursty.</p>
<p>A standard model takes arrivals as a Poisson process (MATH 230 Lesson 2) and packet sizes, and so transmission times, as exponential (MATH 230 Lesson 3), with mean size <em>L</em>. Then the average time <em>T</em> a packet spends at the link, waiting plus being sent, is (<em>L</em>/<em>R</em>) / (1 − <em>ρ</em>). Here is a short argument from two facts. First, <em>Little's law</em>: in a steady state, the average number of packets at the link is <em>N</em> = <em>aT</em> (if <em>a</em> packets arrive each second and each stays <em>T</em> seconds, about <em>aT</em> are there at any moment). Second, an arriving packet finds <em>N</em> packets there on average. This needs Poisson arrivals: each comes at a moment that has nothing to do with the queue's state, so the moments arrivals see are a fair sample of all moments, and the average over arrivals equals the average over time. (Regular arrivals can break this: packets that take 1 ms to send and arrive exactly every 2 ms always find the link empty, though over time it holds <em>N</em> = 0.5 packets on average.) Third, exponential times are memoryless, so even the one being sent still has <em>L</em>/<em>R</em> to go on average. The new packet's time is its own <em>L</em>/<em>R</em> plus <em>N</em> · <em>L</em>/<em>R</em>: <em>T</em> = (1 + <em>aT</em>) · <em>L</em>/<em>R</em> = <em>L</em>/<em>R</em> + <em>ρT</em>, so <em>T</em> = (<em>L</em>/<em>R</em>) / (1 − <em>ρ</em>). The simulation below checks this for packets averaging 1,000 bytes on an 8 Mb/s link, where the mean <em>L</em>/<em>R</em> = 1 ms.</p>
<pre><code>import random

def avg_time(rho, n=200_000, seed=1):
    """Average ms a packet spends at the link: Poisson arrivals, exponential sizes, mean 1 ms to send."""
    rng = random.Random(seed)
    t = free = total = 0.0              # arrival time, when the link is next free, sum of times
    for _ in range(n):
        t += rng.expovariate(rho)       # gaps between arrivals: mean 1/rho ms
        start = max(t, free)            # wait if the link is busy
        free = start + rng.expovariate(1.0)
        total += free - t
    return total / n

for rho in (0.5, 0.8, 0.9, 0.95):
    print(rho, round(avg_time(rho), 1), round(1 / (1 - rho), 1))
# 0.5 2.0 2.0
# 0.8 5.0 5.0
# 0.9 9.9 10.0
# 0.95 22.0 20.0</code></pre>
<p>(<code>rng.expovariate(lam)</code> draws an exponential random number with rate <code>lam</code>, so mean 1/<code>lam</code>.) At half load a packet spends twice its transmission time at the link; at 90% load, ten times; and the delay blows up as <em>ρ</em> approaches 1. Near full load the average also becomes hard to measure, which is why the 0.95 run, even with 200,000 packets, misses by 10%: rare long queues dominate it. If instead every packet has the same size, waits are shorter. Split <em>T</em> into the packet's own <em>L</em>/<em>R</em> plus its wait <em>W</em>. On arrival it waits for each packet already queued, a full <em>L</em>/<em>R</em> each, plus the rest of the one being sent. The link is busy a fraction <em>ρ</em> of the time, and a busy link is equally likely to be anywhere in the current transmission, so the rest averages <em>ρ</em> · (<em>L</em>/<em>R</em>)/2, not the full <em>L</em>/<em>R</em> that memorylessness gave. Little's law for the queue alone says <em>aW</em> packets are queued on average, so <em>W</em> = <em>aW</em> · <em>L</em>/<em>R</em> + <em>ρ</em>(<em>L</em>/<em>R</em>)/2 = <em>ρW</em> + <em>ρ</em>(<em>L</em>/<em>R</em>)/2, which gives <em>W</em> = (<em>L</em>/<em>R</em>) · <em>ρ</em>/(2(1 − <em>ρ</em>)) and <em>T</em> = (<em>L</em>/<em>R</em>)(1 + <em>ρ</em>/(2(1 − <em>ρ</em>))): 5.5 transmission times at <em>ρ</em> = 0.9 instead of 10 (the same simulation with <code>free = start + 1.0</code> gives 5.5). The exponential model is the usual rough estimate, a little pessimistic for equal-sized packets, and both blow up as <em>ρ</em> approaches 1. The lesson for design is that a link run near 100% utilization has long, unpredictable delays. Lesson 8 returns to what large buffers do to this.</p>
`,
      terms: [
        ["Packet switching", "Sending data in separately handled packets that share links on demand, instead of reserving capacity for each conversation."],
        ["Store-and-forward", "A switch receives a whole packet before sending any of it on the next link."],
        ["Protocol", "The agreed format and order of messages between parties, and the actions taken on sending, receiving or timing out."],
        ["Layer", "One level of the network's design, giving a service to the layer above using only the layer below: application, transport, network, link, physical."],
        ["Encapsulation", "Each layer wrapping the unit from the layer above in its own header (and sometimes trailer)."],
        ["End-to-end principle", "Put functions such as reliability in the end hosts unless the network can do them completely and correctly."],
        ["ISP", "Internet service provider: a network that sells connectivity to hosts or to other networks."],
        ["Transmission delay", "L/R: the time to put all L bits of a packet onto a link of rate R."],
        ["Propagation delay", "d/s: the time for a bit to travel a link of length d at signal speed s."],
        ["Queueing delay", "Time a packet waits in a buffer for packets ahead of it."],
        ["Throughput", "The rate at which data actually arrives; limited by the bottleneck link."],
        ["RTT", "Round-trip time: the time from sending a message to receiving its reply."],
        ["Bandwidth-delay product", "Rate times delay: the amount of data in flight on a path; with RTT, the window needed to keep the path busy."],
        ["Traffic intensity", "ρ = La/R: the fraction of a link's capacity that arriving traffic demands."]
      ],
      quiz: [
        { q: "A 1,000-byte packet is sent over a 10 Mb/s link that is 200 km long (signal speed 2 × 10^8 m/s). What are its transmission and propagation delays?", choices: ["0.8 ms and 1 ms", "0.1 ms and 1 ms", "0.8 ms and 0.1 ms", "1 ms and 0.8 ms"], answer: 0, why: "Transmission: 8,000 bits / 10^7 b/s = 0.8 ms. Propagation: 2 × 10^5 m / 2 × 10^8 m/s = 1 ms." },
        { q: "Which layer delivers data to the right program (process) on a host?", choices: ["Link", "Network", "Transport", "Physical"], answer: 2, why: "The network layer gets packets to the right host; the transport layer (TCP, UDP) gets data to the right process." },
        { q: "Which devices implement the transport layer?", choices: ["Every router on the path", "Only the end hosts", "Only link-layer switches", "Only the first and last router"], answer: 1, why: "Routers implement layers 1 to 3; TCP and UDP run only at the ends, as the end-to-end principle suggests." },
        { q: "A path has links of 1 Gb/s, 100 Mb/s and 20 Mb/s. Ignoring other traffic, what is the throughput of a long transfer?", choices: ["1.12 Gb/s", "1 Gb/s", "373 Mb/s", "20 Mb/s"], answer: 3, why: "The slowest link is the bottleneck." },
        { q: "What is the bandwidth-delay product of a 1 Gb/s path with a 20 ms RTT?", choices: ["2.5 MB", "20 MB", "50 MB", "200 KB"], answer: 0, why: "10^9 × 0.02 = 2 × 10^7 bits = 2.5 × 10^6 bytes." },
        { q: "A link's traffic intensity rises from 0.5 to 0.9. In the queueing model of the notes, how does the average time at the link change?", choices: ["It barely changes", "It rises by 80%", "It rises fivefold, from 2 to 10 transmission times", "It falls"], answer: 2, why: "(L/R)/(1 − ρ) goes from 2 L/R to 10 L/R." }
      ],
      practice: [
        {
          q: `<p>Host A sends a 1,500-byte packet to host B through one router. Both links run at 10 Mb/s; the first is 2 km long and the second 3,000 km (signal speed 2 × 10<sup>8</sup> m/s). The router's processing takes 5 µs and there is no other traffic. How long from A starting to send until B has the whole packet? Which delay dominates?</p>`,
          hint: `<p>Two transmissions (store-and-forward), two propagations and one processing delay.</p>`,
          a: `<p>Transmission per link: 12,000 / 10<sup>7</sup> = 1.2 ms, twice: 2.4 ms. Propagation: 2,000 / (2 × 10<sup>8</sup>) = 10 µs and 3 × 10<sup>6</sup> / (2 × 10<sup>8</sup>) = 15 ms. Processing 5 µs. Total 2.4 + 0.01 + 15 + 0.005 = 17.415 ms, dominated by the long link's propagation. Doubling the link rate would save only 1.2 ms.</p>`
        },
        {
          q: `<p>A 10 MB file is sent as 1,000-byte packets over 4 links of 100 Mb/s each, store-and-forward, with negligible propagation. (a) How long does it take? (b) How long would it take if the whole file were sent as one 10 MB message? (c) What does this say about packet size?</p>`,
          a: `<p>(a) <em>L</em>/<em>R</em> = 8,000 / 10<sup>8</sup> = 80 µs, and there are <em>P</em> = 10,000 packets, so (<em>N</em> + <em>P</em> − 1) · <em>L</em>/<em>R</em> = 10,003 × 80 µs = 0.80024 s. (b) One message of 8 × 10<sup>7</sup> bits takes 0.8 s per link, and each router must receive it all first: 4 × 0.8 = 3.2 s. (c) Small packets let the links work in parallel (pipelining), so the total is close to one link's time. Very small packets would waste capacity on headers, so packet sizes trade header overhead against pipelining.</p>`
        },
        {
          q: `<p>Your home connection is 200 Mb/s down. You download a 2 GB game update from a server 75 ms away (RTT), and also load a 50 KB web page from the same distance. Estimate both times, allowing two RTTs to set up and request. Which would benefit more from a 1 Gb/s connection?</p>`,
          a: `<p>The update: 2 × 10<sup>9</sup> × 8 = 1.6 × 10<sup>10</sup> bits / 2 × 10<sup>8</sup> b/s = 80 s, plus 0.15 s: about 80 s. The page: 4 × 10<sup>5</sup> bits / 2 × 10<sup>8</sup> = 2 ms, plus 150 ms: about 0.15 s. At 1 Gb/s the update takes 16 s (five times faster); the page still takes about 0.15 s. The page is latency-bound; only shorter RTTs (closer servers, Lesson 7) or fewer round trips would help it.</p>`
        },
        {
          q: `<p>A router's 100 Mb/s output link receives an average of 7,500 packets per second, Poisson arrivals with exponentially distributed sizes averaging 1,500 bytes. (a) What is the traffic intensity? (b) Using the notes' model, what is the average time a packet spends at the link, and how much of it is waiting? (c) What happens if the arrival rate rises to 9,000 packets per second?</p>`,
          a: `<p>(a) <em>La</em> = 12,000 × 7,500 = 9 × 10<sup>7</sup> b/s, so <em>ρ</em> = 0.9. (b) <em>L</em>/<em>R</em> = 120 µs, so the average time is 120 / (1 − 0.9) = 1,200 µs = 1.2 ms, of which 1.08 ms is waiting and 0.12 ms is transmission. (c) <em>ρ</em> = 1.08 &gt; 1: arrivals exceed capacity, the queue grows until the buffer fills, and then the excess is dropped: the link carries 8,333 packets a second, so about 667 a second (0.08/1.08, or 7.4% of arrivals) are lost.</p>`
        }
      ],
      sources: ["pdbook", "cerfkahn74", "saltzer84"]
    },
    {
      id: "nw2",
      title: "The link layer",
      minutes: 90,
      summary: "Getting a frame across one link: framing with flags and byte stuffing, detecting errors with parity, the Internet checksum and CRCs, Ethernet frames and MAC addresses, learning switches, and sharing one medium with ALOHA, CSMA/CD and Wi-Fi's CSMA/CA.",
      notes: `
<p>The link layer moves a <strong>frame</strong> from one node to a neighbouring node over a single link: from your laptop to the Wi-Fi access point, from a switch to a router. It is implemented mostly in the <strong>network interface card</strong> (NIC), with a driver in the kernel (CS 310 Lesson 8). It has to solve three problems: where does a frame begin and end, was it damaged on the way, and, when several nodes share one medium, who may send?</p>

<h3>Framing</h3>
<p>The physical layer delivers a stream of bits; the receiver must find the frames in it. One method is a special <strong>flag</strong> byte that marks each end of a frame. PPP, used on serial links, uses 0x7E. But the data itself may contain 0x7E. The fix is <strong>byte stuffing</strong>: before sending, replace each 0x7E in the data by the two bytes 0x7D 0x5E, and each 0x7D (the <em>escape</em> byte) by 0x7D 0x5D; that is, write the escape byte followed by the original XOR 0x20. The receiver reverses it. Now a 0x7E on the line can only be a flag.</p>
<pre><code>FLAG, ESC = 0x7E, 0x7D

def stuff(payload):
    out = bytearray([FLAG])
    for b in payload:
        if b in (FLAG, ESC):
            out += bytes([ESC, b ^ 0x20])
        else:
            out.append(b)
    out.append(FLAG)
    return bytes(out)

def unstuff(frame):
    body, out, i = frame[1:-1], bytearray(), 0
    while i &lt; len(body):
        if body[i] == ESC:
            out.append(body[i + 1] ^ 0x20)
            i += 2
        else:
            out.append(body[i])
            i += 1
    return bytes(out)

data = bytes([0x41, 0x7E, 0x42, 0x7D])
f = stuff(data)
print(f.hex(" "))            # 7e 41 7d 5e 42 7d 5d 7e
print(unstuff(f) == data)    # True</code></pre>
<p>(<code>bytes.hex(" ")</code> writes the bytes in hexadecimal separated by spaces; <code>bytearray</code> is a mutable sequence of bytes.) Stuffing makes the frame's length depend on its contents: in the worst case, every byte doubles. Ethernet does framing differently: each frame starts with a fixed 8-byte <em>preamble</em> that lets the receiver synchronize, and frames are separated by idle time on the line.</p>

<h3>Detecting errors</h3>
<p>Noise flips bits. The sender adds some redundant bits computed from the data; the receiver recomputes them and compares. Detection is not correction: a frame that fails its check is simply discarded, and recovering it (if anyone cares) is the job of a higher layer (Lesson 5). No check catches every error; the question is which errors a scheme is guaranteed to catch, and how likely the rest are to slip through.</p>
<p><strong>Parity.</strong> Add one bit so that the number of 1 bits is even. Any single flipped bit, or any odd number, makes the count odd and is detected; two flipped bits cancel and aren't. Errors often come in bursts, so a single parity bit is weak. <strong>Two-dimensional parity</strong> arranges the data in rows and adds a parity bit to each row and each column. A single flipped bit then shows up in exactly one row and one column, which pinpoints it, so the receiver can even correct it.</p>
<table>
<tr><th></th><th>data</th><th>row parity</th></tr>
<tr><td>row 1</td><td>1 0 1 1</td><td>1</td></tr>
<tr><td>row 2</td><td>0 1 1 0</td><td>0</td></tr>
<tr><td>row 3</td><td>1 1 0 1</td><td>1</td></tr>
<tr><td>column parity</td><td>0 0 0 0</td><td>0</td></tr>
</table>
<p>If the second bit of row 3 flips, row 3's count becomes odd and so does column 2's: the error is where they cross.</p>
<p><strong>The Internet checksum.</strong> IP, UDP and TCP use a check that is cheap to compute in software. Treat the data as a sequence of 16-bit numbers (big-endian, CS 210 Lesson 1; pad with a zero byte if the length is odd), add them using <strong>one's complement addition</strong>, in which a carry out of the top bit is added back in at the bottom (an "end-around carry"), and send the bitwise complement of the sum. RFC 1071's example: the bytes 00 01 f2 03 f4 f5 f6 f7 are the words 0x0001, 0xf203, 0xf4f5 and 0xf6f7.</p>
<table>
<tr><th>Step</th><th>Running sum</th></tr>
<tr><td>0x0001 + 0xf203</td><td>0xf204</td></tr>
<tr><td>+ 0xf4f5</td><td>0x1e6f9: a carry out of 16 bits, so fold: 0xe6f9 + 1 = 0xe6fa</td></tr>
<tr><td>+ 0xf6f7</td><td>0x1ddf1: fold: 0xddf1 + 1 = 0xddf2</td></tr>
<tr><td>complement</td><td>~0xddf2 = 0x220d, the checksum</td></tr>
</table>
<p>The receiver adds all the words, checksum included. One's complement sum of a value and its complement is 0xffff, so an undamaged packet sums to 0xffff, and the complement of that is 0: "checksum 0" means correct. (Folding the carries at the end instead of after every step gives the same result.) The checksum catches any single-bit error, but misses many others: swapping two 16-bit words leaves the sum unchanged, and so do errors that add to one word what they take from another. It was chosen because it is simple to compute byte by byte in software and can be updated cheaply when a router changes one field (Lesson 3).</p>

<h3>Cyclic redundancy checks</h3>
<p>Link hardware uses a stronger check, the <strong>cyclic redundancy check</strong> (CRC). It is long division, with XOR in place of subtraction. Sender and receiver agree on a <strong>generator</strong> <em>G</em> of <em>r</em> + 1 bits whose first bit is 1. To protect data bits <em>D</em>, the sender appends <em>r</em> zeros and divides by <em>G</em>, where each step of the division XORs <em>G</em> into the bits under it whenever the leading bit is 1; the <em>r</em>-bit remainder <em>R</em> is the CRC, sent in place of the zeros. For <em>D</em> = 101110 and <em>G</em> = 1001 (so <em>r</em> = 3):</p>
<pre data-label="Division"><code>101110000     data with 3 zeros appended
1001          leading bit 1 at position 0: XOR G
001010000
  1001        next leading 1 at position 2
000011000
    1001      position 4
000001010
     1001     position 5
000000011     remainder R = 011; send 101110011</code></pre>
<p>Why does this help? Think of a bit string as a polynomial with coefficients 0 or 1: 1001 is <em>x</em><sup>3</sup> + 1. With coefficients added modulo 2 (MATH 121 Lesson 4's modular arithmetic, with modulus 2), addition and subtraction are both XOR, and there are no carries. Appending <em>r</em> zeros multiplies <em>D</em> by <em>x</em><sup><em>r</em></sup>, and the division gives <em>D</em> · <em>x</em><sup><em>r</em></sup> = <em>Q</em> · <em>G</em> + <em>R</em>. Since minus is plus, <em>D</em> · <em>x</em><sup><em>r</em></sup> + <em>R</em>, which is exactly the bits sent, equals <em>Q</em> · <em>G</em>: the codeword is divisible by <em>G</em>. The receiver divides what it got by <em>G</em> (without appending anything) and accepts only a remainder of zero. An error flips some bits, which adds an error polynomial <em>E</em>; it goes unnoticed only if <em>E</em> is itself a multiple of <em>G</em>. With a generator of degree <em>r</em> whose first and last bits are both 1, every single-bit error is caught, every burst of <em>r</em> or fewer consecutive bits is caught, and longer random damage slips through with probability about 2<sup>−<em>r</em></sup>. Ethernet uses a 33-bit generator, CRC-32; it catches every burst up to 32 bits. CRCs are a few XOR gates and a shift register in hardware (CS 230 Lesson 3), which is why links use them and software protocols used the checksum.</p>
<p>Python's <code>zlib.crc32</code> computes Ethernet's CRC-32. It gives different numbers from the plain division above, because the standard also processes each byte's bits starting from the least significant and inverts the register at the start and end; the error-detecting properties are the same.</p>
<pre><code>import zlib
print(hex(zlib.crc32(b"hello")))   # 0x3610a686
print(hex(zlib.crc32(b"hellp")))   # 0xbb18ab73</code></pre>

<h3>Ethernet and MAC addresses</h3>
<p>Ethernet is the wired link layer of nearly every office, home and datacenter. A frame looks like this:</p>
<table>
<tr><th>Field</th><th>Bytes</th><th>Contents</th></tr>
<tr><td>Preamble</td><td>8</td><td>alternating bits for synchronization, ending in a start marker</td></tr>
<tr><td>Destination address</td><td>6</td><td>MAC address of the receiver</td></tr>
<tr><td>Source address</td><td>6</td><td>MAC address of the sender</td></tr>
<tr><td>EtherType</td><td>2</td><td>what the payload is: 0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP</td></tr>
<tr><td>Payload</td><td>46–1,500</td><td>usually an IP datagram; padded to 46 if shorter</td></tr>
<tr><td>Frame check sequence</td><td>4</td><td>CRC-32 of the addresses, type and payload</td></tr>
</table>
<p>A <strong>MAC address</strong> (media access control address) is 48 bits, written as six hexadecimal bytes such as <code>3c:22:fb:91:0a:5e</code>. It is assigned to the interface by its manufacturer: the first three bytes identify the manufacturer, and the manufacturer makes the rest unique. MAC addresses are flat, like a national ID number, rather than hierarchical like a postal address: they say who, not where, so they can't be used to route across the internet. (Phones now often make up a random MAC address for each Wi-Fi network, so that they can't be tracked from network to network.) The address <code>ff:ff:ff:ff:ff:ff</code> is the <strong>broadcast</strong> address: every node on the network accepts it. A NIC normally ignores frames addressed to anyone else.</p>
<p>The EtherType field is the first <em>demultiplexing key</em> we've met: it tells the receiving host which protocol to hand the payload to. Every layer has one: IP's protocol field (Lesson 3) and TCP's and UDP's ports (Lesson 5).</p>

<h3>Switches</h3>
<p>A <strong>switch</strong> connects many links (one per port) into one network. When a frame arrives, the switch looks up the destination MAC address in its <strong>forwarding table</strong> and sends the frame out of only that port. Nobody configures this table. The switch is <em>self-learning</em>:</p>
<ol>
<li>When a frame from source address <em>S</em> arrives on port <em>p</em>, record "<em>S</em> is on port <em>p</em>", with the time.</li>
<li>Look up the destination <em>D</em>. If <em>D</em> is the broadcast address or isn't in the table, <strong>flood</strong>: send the frame out of every port except <em>p</em>. If <em>D</em> is on port <em>p</em>, the destination already has the frame (it is on the same segment), so <strong>filter</strong>: drop it. Otherwise send it out of <em>D</em>'s port only.</li>
<li>Remove entries not refreshed for a while (300 seconds is common), so that a machine that moves is found again.</li>
</ol>
<p>Example: hosts A, B and C on ports 1, 2 and 3 of an empty switch. A sends to B: the switch learns A → 1 and floods to ports 2 and 3; B takes the frame and C ignores it. B replies to A: the switch learns B → 2 and, knowing A, sends only to port 1. From now on A and B's traffic stays off port 3. Switches are transparent: hosts don't know they exist, and the switch never changes the frames.</p>
<p>Flooding has a danger. If switches are cabled in a loop, a flooded broadcast frame goes round forever, multiplying at each switch: a <em>broadcast storm</em> that can stop a network in seconds. Switches therefore run the <strong>spanning tree protocol</strong>: they agree on a tree (CS 220 Lesson 6) among their links and disable the ports not on it, keeping redundant cables as spares that are switched on when a tree link fails.</p>

<h3>Sharing one medium</h3>
<p>The first Ethernet, and every radio network, is a <strong>broadcast medium</strong>: one channel heard by all. If two nodes send at once, their signals <em>collide</em> and both frames are garbled. A <strong>multiple access protocol</strong> decides who sends when.</p>
<p><strong>ALOHA.</strong> The ALOHAnet radio network in Hawaii (1971) let nodes send whenever they liked and resend after a random delay if no acknowledgement came. In <em>slotted</em> ALOHA, time is divided into slots of one frame each; each of <em>N</em> busy nodes sends in a slot with probability <em>p</em>. A slot carries a frame successfully if exactly one node sends: probability <em>Np</em>(1 − <em>p</em>)<sup><em>N</em>−1</sup>. Differentiating, the maximum is at <em>p</em> = 1/<em>N</em>, giving (1 − 1/<em>N</em>)<sup><em>N</em>−1</sup>, which tends to 1/<em>e</em> ≈ 0.37 as <em>N</em> grows. At best, 63% of the slots are wasted on collisions or silence.</p>
<p><strong>CSMA/CD.</strong> Classic Ethernet did better with two rules. <em>Carrier sense</em>: listen first, and don't send while someone else is. <em>Collision detection</em>: while sending, listen; if the signal on the wire differs from yours, stop at once. Collisions still happen, because a signal takes time to propagate, so two nodes may both hear silence and start. After a collision, a node waits a random time chosen by <strong>binary exponential backoff</strong>: after its <em>m</em>-th collision on the same frame, it picks <em>K</em> uniformly from 0 to 2<sup><em>m</em></sup> − 1 (the exponent stops growing at 10) and waits <em>K</em> <em>slot times</em>, where a slot time is 512 bit times (the time to send the minimum 64-byte frame), 51.2 µs at 10 Mb/s. This is CS 240 Lesson 8's backoff with jitter: the more collisions, the more spread out the retries, so the protocol adapts to the number of senders without knowing it. Modern wired Ethernet has no shared medium at all: each host has its own <em>full-duplex</em> cable to a switch, one that carries signals in both directions at once on separate wire pairs or fibres, so there are no collisions and CSMA/CD is switched off.</p>
<p><strong>Wi-Fi: CSMA/CA.</strong> A radio can't detect a collision while it sends: its own signal drowns out the faint signal of a distant node. And two laptops on opposite sides of an access point may each be out of range of the other, the <em>hidden terminal</em> problem, so carrier sense misses some transmissions. Wi-Fi (IEEE 802.11) therefore uses <em>collision avoidance</em>: after sensing the channel idle, a node waits a further random backoff before sending, and the receiver acknowledges every frame it gets intact. A missing acknowledgement is treated as a collision or loss, and the sender backs off and retries. Optionally, a node first sends a short Request to Send and the access point answers Clear to Send, which every node in range of the access point hears and respects. The link-layer acknowledgements are a first sight of a pattern Lesson 5 develops fully: sequence numbers, acknowledgements and timeouts turn an unreliable channel into a reliable one.</p>
`,
      terms: [
        ["Frame", "The link layer's unit of data: a header, a payload and usually a check."],
        ["Byte stuffing", "Escaping flag and escape bytes inside a frame's data so that the flag can mark frame boundaries."],
        ["Parity bit", "A bit chosen to make the number of 1s even; detects any odd number of flipped bits."],
        ["Internet checksum", "The complement of the one's complement sum of 16-bit words; used by IP, UDP and TCP."],
        ["One's complement addition", "Binary addition in which a carry out of the top bit is added back at the bottom."],
        ["CRC", "Cyclic redundancy check: the remainder of dividing the data, shifted by r bits, by a generator using XOR; detects all bursts of up to r bits."],
        ["MAC address", "A 48-bit link-layer address assigned to a network interface; flat, not hierarchical."],
        ["Broadcast address", "ff:ff:ff:ff:ff:ff: a frame sent to it is accepted by every node on the network."],
        ["EtherType", "The Ethernet header field that says which protocol the payload belongs to."],
        ["Learning switch", "A switch that builds its forwarding table from the source addresses of frames it receives, flooding frames for unknown destinations."],
        ["Spanning tree protocol", "Switches agreeing on a loop-free tree of links, so that flooded frames can't circulate forever."],
        ["CSMA/CD", "Carrier sense multiple access with collision detection: listen before sending, stop on a collision, back off randomly."],
        ["Binary exponential backoff", "After the m-th collision, wait a random number of slot times (512 bit times each) from 0 to 2^m − 1."],
        ["Hidden terminal", "Two radio nodes that can't hear each other but both reach a third, so carrier sense can't prevent their collisions."]
      ],
      quiz: [
        { q: "With byte stuffing as in PPP, how is the data byte 0x7E sent?", choices: ["As 0x7E", "As 0x7D 0x5E", "As 0x7E 0x7E", "It can't be sent"], answer: 1, why: "The escape byte 0x7D, then 0x7E XOR 0x20 = 0x5E." },
        { q: "A single even-parity bit protects 8 data bits. Which error goes undetected?", choices: ["One flipped bit", "Three flipped bits", "Two flipped bits", "Flipping the parity bit alone"], answer: 2, why: "Two flips leave the number of 1s even." },
        { q: "Which change to a packet does the Internet checksum always miss?", choices: ["Flipping one bit", "Swapping two 16-bit words", "Setting a byte to zero", "Truncating the packet by 2 bytes"], answer: 1, why: "Addition doesn't depend on order, so the sum is unchanged." },
        { q: "What is the CRC of the data 1011 with the 2-bit generator 11?", choices: ["0", "1", "10", "11"], answer: 1, why: "Divide 10110: XOR 11 at position 0 gives 01110, at position 1 gives 00010, at position 3 gives 00001; the remainder is 1. With generator 11 the CRC is just a parity bit: 1011 has three 1s, so the bit 1 makes the count even." },
        { q: "A switch has just been powered on. Host A on port 1 sends a frame to host B on port 4 of an 8-port switch. Where does the switch send it?", choices: ["Only port 4", "Ports 2 to 8", "All 8 ports", "Nowhere: it drops it"], answer: 1, why: "B is unknown, so the switch floods to every port except the one the frame arrived on, after learning that A is on port 1." },
        { q: "Why does Wi-Fi acknowledge every frame at the link layer while switched Ethernet doesn't?", choices: ["Wi-Fi frames are larger", "A radio can't detect collisions while sending and suffers more errors, so the sender needs to know whether the frame got through", "Ethernet has no errors", "Acknowledgements are required by IP"], answer: 1, why: "Collision detection doesn't work on radio, and losses are common, so Wi-Fi uses acknowledgements and retries (CSMA/CA)." }
      ],
      practice: [
        {
          q: `<p>Compute the Internet checksum of the bytes <code>45 00 00 1c 12 34</code> by hand, showing each addition. Then check your answer: add the words and your checksum and confirm the result is 0xffff.</p>`,
          hint: `<p>The words are 0x4500, 0x001c and 0x1234.</p>`,
          a: `<p>0x4500 + 0x001c = 0x451c; + 0x1234 = 0x5750, with no carries. The checksum is ~0x5750 = 0xa8af. Check: 0x5750 + 0xa8af = 0xffff. ✓</p>
<pre><code>print(hex(0x4500 + 0x001c + 0x1234))    # 0x5750
print(hex(~0x5750 &amp; 0xFFFF))            # 0xa8af</code></pre>`
        },
        {
          q: `<p>Compute the CRC of the data 1101 with generator 101, and then check the codeword at the receiver. What remainder does the receiver get if the second bit of the codeword is flipped?</p>`,
          a: `<p>Append 2 zeros: 110100. XOR 101 at position 0: 011100. Position 1 has a 1: XOR 101 there: 001000. Position 2 has a 1: 000010. Position 3 is 0, so stop: the remainder is the last two bits, 10. Send 110110. The receiver divides 110110: position 0 gives 011110, position 1 gives 001010, position 2 gives 000000: remainder 00, accepted. With the second bit flipped, 100110: position 0 gives 001110, position 2 gives 000100, position 3 gives 000001: remainder 01, not zero, so the error is detected.</p>`
        },
        {
          q: `<p>A switch with ports 1 to 4 starts empty. Hosts A, B, C and D are on ports 1, 2, 3 and 4. For each frame in turn, give the ports it is sent out of and the table afterwards: (a) A → D; (b) D → A; (c) C → ff:ff:ff:ff:ff:ff; (d) B → C; (e) A moves to port 3 and sends A → D; (f) D → A.</p>`,
          a: `<p>(a) Learn A:1; D unknown, flood to 2, 3, 4. (b) Learn D:4; A is on 1: send to 1. (c) Learn C:3; broadcast: flood to 1, 2, 4. (d) Learn B:2; C is on 3: send to 3. (e) Learn A:3 (replacing A:1); D is on 4: send to 4. (f) A is now on 3: send to 3. Final table: A:3, B:2, C:3, D:4. Had A moved silently, frames for it would have gone to port 1 until the entry aged out or A sent something.</p>`
        },
        {
          q: `<p>(a) In slotted ALOHA with <em>N</em> = 10 nodes, what fraction of slots succeed when <em>p</em> = 1/10? When <em>p</em> = 1/5? (b) A node on classic 10 Mb/s Ethernet has collided 3 times on the same frame. What values may <em>K</em> take, and what is the longest it may wait?</p>`,
          a: `<p>(a) With <em>p</em> = 0.1: 10 × 0.1 × 0.9<sup>9</sup> = 0.387. With <em>p</em> = 0.2: 10 × 0.2 × 0.8<sup>9</sup> = 0.268: being too eager causes more collisions. (b) <em>K</em> ∈ {0, 1, …, 7}, so it waits at most 7 × 51.2 µs = 358.4 µs.</p>
<pre><code>print(round(10 * 0.1 * 0.9 ** 9, 3), round(10 * 0.2 * 0.8 ** 9, 3))   # 0.387 0.268</code></pre>`
        }
      ],
      sources: ["pdbook", "rfc1071"]
    },
    {
      id: "nw3",
      title: "IP: addresses and forwarding",
      minutes: 90,
      summary: "The network layer: IPv4 addresses, subnets and CIDR prefixes, forwarding by longest-prefix match, the IPv4 header with its TTL, checksum and fragmentation, and the protocols that make a network usable: ARP, DHCP and NAT. Then IPv6 in brief.",
      notes: `
<p>The link layer gets a frame to a neighbour. The <strong>network layer</strong> gets a packet, called a <strong>datagram</strong>, from any host to any other, across many links of different kinds. Its protocol is IP. IP is <em>best effort</em>: it tries to deliver each datagram, but makes no promise that it will arrive, arrive once, arrive in order or arrive intact. Everything else is built on top.</p>
<p>The network layer has two jobs that are easy to confuse. <strong>Forwarding</strong> is what one router does with one packet: look at its destination and move it to the right output link, in nanoseconds, in hardware. <strong>Routing</strong> is how all the routers together decide which paths to use and fill in their forwarding tables, over seconds or minutes, in software. This lesson is about forwarding and addresses; Lesson 4 is routing.</p>

<h3>IPv4 addresses</h3>
<p>An IPv4 <strong>address</strong> is 32 bits, written in <em>dotted-quad</em> notation: each byte in decimal, separated by dots, such as 192.168.1.20. An address belongs to an <strong>interface</strong>, not a host: a router with four links has four addresses, and a laptop with Wi-Fi and Ethernet has two.</p>
<p>Unlike a MAC address, an IP address is hierarchical. Its first bits name a network, the <strong>prefix</strong>, and the rest name an interface on it. A prefix is written <em>address</em>/<em>length</em>: 200.23.16.0/20 means the addresses whose first 20 bits equal those of 200.23.16.0. That is <strong>CIDR</strong> notation (classless inter-domain routing, from 1993; before it, prefixes could only be 8, 16 or 24 bits long, and the address space was wasted). The same thing as a <strong>subnet mask</strong> is 20 one bits followed by 12 zeros, 255.255.240.0. A /20 holds 2<sup>12</sup> = 4,096 addresses, from 200.23.16.0 (all host bits 0, the network's own address) to 200.23.31.255 (all host bits 1, its broadcast address), so 4,094 are usable by interfaces.</p>
<p>The arithmetic is CS 210's bit operations. Converting an address to a 32-bit integer and masking it:</p>
<pre><code>def to_int(addr):
    a, b, c, d = (int(x) for x in addr.split("."))
    return (a &lt;&lt; 24) | (b &lt;&lt; 16) | (c &lt;&lt; 8) | d

def to_str(n):
    return ".".join(str((n &gt;&gt; s) &amp; 255) for s in (24, 16, 8, 0))

def mask(length):
    return ((1 &lt;&lt; length) - 1) &lt;&lt; (32 - length)

print(to_str(mask(20)))                                  # 255.255.240.0
n = to_int("200.23.18.77")
print(to_str(n &amp; mask(20)))                              # 200.23.16.0
print(to_str((n &amp; mask(20)) | (~mask(20) &amp; 0xFFFFFFFF))) # 200.23.31.255</code></pre>
<p>(Python's <code>~</code> on a positive int gives a negative number, so <code>&amp; 0xFFFFFFFF</code> keeps just the low 32 bits.) Python's <code>ipaddress</code> module does the same work, and is the tool to use in real code:</p>
<pre><code>import ipaddress
net = ipaddress.ip_network("200.23.16.0/20")
print(net.num_addresses, net.netmask, net.broadcast_address)   # 4096 255.255.240.0 200.23.31.255
print([str(s) for s in net.subnets(new_prefix=23)][:3])        # ['200.23.16.0/23', '200.23.18.0/23', '200.23.20.0/23']
print(ipaddress.ip_address("200.23.18.77") in net)             # True</code></pre>
<p>A <strong>subnet</strong> is a set of interfaces that can reach each other without a router: everything on one switched Ethernet or Wi-Fi network. All interfaces on a subnet share its prefix. The hierarchy is the point. An ISP that owns 200.23.16.0/20 can hand out eight /23s to eight customers (200.23.16.0/23, 200.23.18.0/23, …, 200.23.30.0/23), and still tell the rest of the internet just one thing: "send me anything in 200.23.16.0/20". This <em>route aggregation</em> keeps routing tables manageable: the whole internet needs about a million prefixes, not four billion addresses.</p>
<p>Addresses are assigned top down: the Internet Assigned Numbers Authority (IANA) gives large blocks to five regional registries, which give them to ISPs and organizations. IANA handed out its last free blocks of IPv4 addresses in 2011. 2<sup>32</sup> is about 4.3 billion, fewer than the devices that want addresses; NAT and IPv6, below, are the two responses.</p>

<h3>Forwarding: longest-prefix match</h3>
<p>A router's <strong>forwarding table</strong> maps prefixes to output links (or to the next router's address). Prefixes may overlap, and the rule is <strong>longest-prefix match</strong>: use the most specific prefix that matches the destination. Consider this table:</p>
<table>
<tr><th>Prefix</th><th>Next hop</th></tr>
<tr><td>0.0.0.0/0</td><td>ISP (the default route: matches everything)</td></tr>
<tr><td>200.23.16.0/20</td><td>link 1</td></tr>
<tr><td>200.23.18.0/23</td><td>link 2</td></tr>
<tr><td>200.23.18.128/25</td><td>link 3</td></tr>
</table>
<p>A packet for 200.23.18.200 matches all four (its first 25 bits equal 200.23.18.128's), so it goes to link 3. For 200.23.19.4: /0, /20 and /23 match, but the /25 doesn't (19 = 00010011 differs from 18 = 00010010 in the last bit of the third byte, bit 24 of the address), so link 2. For 200.23.25.1: only /0 and /20, so link 1. For 8.8.8.8: only the default route. Longest-prefix match is what makes exceptions possible: a customer that moves its /23 to another ISP keeps its addresses, and the new ISP announces the /23, which wins over the old ISP's /20 everywhere.</p>
<p>A router may do hundreds of millions of lookups a second, so the table is not scanned linearly. Software routers use a binary trie on the address bits (CS 201 Lesson 8), where the lookup walks down at most 32 levels remembering the last prefix seen; hardware routers use <em>ternary content-addressable memory</em> (TCAM), which stores each prefix as bits that are 0, 1 or "don't care" (for the bits past the prefix length) and compares the address against every entry at once in a single cycle, with the entries ordered so that the longest matching prefix wins. The first programming problem builds a fast table with one dictionary per prefix length.</p>

<h3>The IPv4 header</h3>
<p>An IPv4 datagram starts with a header of at least 20 bytes, laid out in 32-bit rows (byte offsets on the left):</p>
<table>
<tr><th>Bytes</th><th>Fields</th></tr>
<tr><td>0–3</td><td>version (4 bits, = 4) · header length in 32-bit words (4 bits, usually 5) · type of service (8 bits) · total length in bytes, header included (16 bits)</td></tr>
<tr><td>4–7</td><td>identification (16 bits) · flags (3 bits: reserved, DF "don't fragment", MF "more fragments") · fragment offset in units of 8 bytes (13 bits)</td></tr>
<tr><td>8–11</td><td>time to live (8 bits) · protocol (8 bits: 6 TCP, 17 UDP, 1 ICMP) · header checksum (16 bits)</td></tr>
<tr><td>12–15</td><td>source address</td></tr>
<tr><td>16–19</td><td>destination address</td></tr>
<tr><td>20–</td><td>options (rare), then the payload</td></tr>
</table>
<p>The <strong>time to live</strong> (TTL) is decreased by 1 at every router, and a router that brings it to 0 discards the packet and sends an error message back to the source (with ICMP, the Internet Control Message Protocol). If a routing mistake creates a loop, packets therefore die after at most 255 hops instead of circling forever. Lesson 8 shows how traceroute uses this. The <strong>protocol</strong> field is IP's demultiplexing key: it tells the destination which transport protocol gets the payload.</p>
<p>The <strong>header checksum</strong> is Lesson 2's Internet checksum over the header only (the payload has its own checks at the transport layer). Here is a real header, with the checksum bytes b8 61 in bytes 10–11:</p>
<pre data-label="Hex"><code>45 00 00 73   00 00 40 00   40 11 b8 61   c0 a8 00 01   c0 a8 00 c7</code></pre>
<p>Read it: version 4, header length 5 words (20 bytes), total length 0x73 = 115 bytes, identification 0, flags 0x4000 (DF set), TTL 0x40 = 64, protocol 0x11 = 17 (UDP), from 192.168.0.1 to 192.168.0.199. To compute the checksum, set it to zero and add the ten words: 0x4500 + 0x0073 + 0x0000 + 0x4000 + 0x4011 + 0x0000 + 0xc0a8 + 0x0001 + 0xc0a8 + 0x00c7 = 0x2479c. Folding the carry gives 0x479c + 0x2 = 0x479e, and its complement is 0xb861. ✓</p>
<p>Because the TTL changes at every hop, every router must also fix the checksum. The TTL is the high byte of the word 0x4011; decreasing it subtracts 0x0100 from the sum, so the checksum (its complement) goes up by 0x0100, to 0xb961. Routers use this kind of incremental update rather than re-adding the whole header.</p>
<p><strong>Fragmentation.</strong> Each link has a <strong>maximum transmission unit</strong> (MTU): the largest payload its frames can carry, 1,500 bytes for Ethernet. A router that must send a bigger datagram onto a smaller-MTU link can split it into <strong>fragments</strong>, each a datagram with a copy of the header, the same identification, an offset saying where its data belongs, and MF set on all but the last. Only the destination reassembles them. A 4,000-byte datagram (20 header + 3,980 data bytes) on a 1,500-byte MTU becomes three fragments with 1,480, 1,480 and 1,020 data bytes (fragment data must be a multiple of 8 bytes, except in the last), at offsets 0, 185 and 370 (in 8-byte units: 1,480 / 8 = 185). Losing any one fragment loses the whole datagram, and fragments burden routers, so today senders avoid it: they set DF, and a router that would have to fragment drops the packet and sends back an ICMP "fragmentation needed" message giving the MTU. This is <em>path MTU discovery</em>.</p>

<h3>From an IP address to a frame: ARP</h3>
<p>Suppose host 192.168.1.20 (on 192.168.1.0/24) wants to send to 192.168.1.30. They are on the same subnet, so the datagram can go straight there in an Ethernet frame, but the frame needs the destination's MAC address. The <strong>Address Resolution Protocol</strong> (ARP) finds it: the host broadcasts "who has 192.168.1.30? tell 192.168.1.20 (at 3c:22:fb:91:0a:5e)", and the owner replies directly with its MAC address. Both cache the answer for a few minutes, in the <strong>ARP table</strong>.</p>
<p>Now suppose the destination is 93.184.216.34, which is not on the subnet (masking it with /24 doesn't give 192.168.1.0). The host sends the datagram to its <strong>default gateway</strong>, the router on its subnet, say 192.168.1.1. It ARPs for the router's MAC address and sends a frame whose <em>link-layer</em> destination is the router but whose <em>IP</em> destination is still 93.184.216.34. The router strips off the frame, looks up 93.184.216.34 in its forwarding table, decreases the TTL, and wraps the datagram in a new frame for the next link. The IP addresses stay the same end to end; the MAC addresses change at every hop.</p>

<h3>Getting an address: DHCP</h3>
<p>A laptop joining a network needs an address, a subnet mask, a default gateway and a DNS server (Lesson 7). The <strong>Dynamic Host Configuration Protocol</strong> (DHCP) provides them. It must work before the host has an address, so it uses broadcasts, over UDP (Lesson 5) from port 68 to port 67, in four messages: <em>discover</em> (from 0.0.0.0 to 255.255.255.255: "is there a DHCP server?"), <em>offer</em> ("you can have 192.168.1.20 for 24 hours"), <em>request</em> ("I'll take it"), and <em>acknowledge</em>. The address is a <em>lease</em> that the host renews before it expires.</p>

<h3>Sharing one address: NAT</h3>
<p>Most homes get one public IPv4 address from their ISP but have dozens of devices. Inside, the devices use <strong>private addresses</strong>, which anyone may use and which are never routed on the public internet: 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. The home router performs <strong>network address translation</strong> (NAT). When a device at 10.0.0.2 opens a connection from port 3345 to a web server, the router rewrites the packet's source to its public address and a port of its choosing, say 138.76.29.7 port 5001, and records the pair in its <strong>translation table</strong>:</p>
<table>
<tr><th>Public side</th><th>Private side</th></tr>
<tr><td>138.76.29.7 : 5001</td><td>10.0.0.2 : 3345</td></tr>
</table>
<p>A reply arriving for 138.76.29.7:5001 is rewritten back to 10.0.0.2:3345 and delivered. (Ports identify connections at the transport layer, Lesson 5; NAT changes them too, so it must recompute the transport checksums as well as the IP one.) NAT bought IPv4 decades of extra life, and it acts as a crude firewall: a packet from outside that matches no table entry has nowhere to go. But it breaks the original model in which every host could be reached at its address. A server behind NAT can't be contacted unless the router is configured to forward a port to it, and peer-to-peer applications such as video calls need tricks to get through.</p>

<h3>IPv6</h3>
<p>IPv6 (standardized in 1998, now RFC 8200) is the long-term answer. Its addresses are 128 bits: 2<sup>128</sup> ≈ 3.4 × 10<sup>38</sup>. They are written as eight groups of four hex digits separated by colons, dropping leading zeros in each group and replacing one run of zero groups by <code>::</code>, so 2001:0db8:0000:0000:0000:0000:0000:0001 is <code>2001:db8::1</code>. Typically the first 64 bits name the network and the last 64 the interface. The header is simpler than IPv4's, a fixed 40 bytes: there is no header checksum (the link and transport layers check already, and routers save the update work), routers never fragment (senders use path MTU discovery), and the TTL is renamed <em>hop limit</em>, which says what it is. IPv4 and IPv6 can't talk to each other directly, so the transition has taken decades of running both side by side; today a large share of traffic to major services, from phones especially, uses IPv6.</p>
`,
      terms: [
        ["IP", "The Internet Protocol: the network layer's best-effort delivery of datagrams between hosts."],
        ["Forwarding", "One router moving one packet from an input to the right output link, using its forwarding table."],
        ["Routing", "The network-wide process that chooses paths and fills in forwarding tables."],
        ["Prefix", "The leading bits of an address that name a network, written address/length."],
        ["CIDR", "Classless inter-domain routing: prefixes of any length, written a.b.c.d/n."],
        ["Subnet mask", "A 32-bit value with the prefix's bits set to 1, such as 255.255.240.0 for /20."],
        ["Subnet", "Interfaces that reach each other without a router, sharing one prefix."],
        ["Longest-prefix match", "Forwarding by the most specific table entry that matches the destination."],
        ["TTL", "Time to live: a hop counter decreased by each router; at 0 the packet is discarded."],
        ["MTU", "Maximum transmission unit: the largest payload a link's frames can carry."],
        ["Fragmentation", "Splitting a datagram into smaller datagrams for a link with a smaller MTU; reassembled at the destination."],
        ["ARP", "Address Resolution Protocol: finds the MAC address for an IP address on the same subnet."],
        ["Default gateway", "The router a host sends to for every destination outside its subnet."],
        ["DHCP", "Dynamic Host Configuration Protocol: gives a joining host an address lease, mask, gateway and DNS server."],
        ["NAT", "Network address translation: a router rewriting private addresses and ports to its public address, tracked in a table."],
        ["IPv6", "The successor to IPv4, with 128-bit addresses and a simpler fixed header."]
      ],
      quiz: [
        { q: "How many addresses does the prefix 10.4.0.0/14 contain?", choices: ["16,384", "262,144", "65,536", "4,096"], answer: 1, why: "32 − 14 = 18 host bits: 2^18 = 262,144." },
        { q: "Is 10.7.200.1 inside 10.4.0.0/14?", choices: ["Yes: its first 14 bits match", "No: the second byte differs", "Only if the mask is 255.255.0.0", "It can't be determined"], answer: 0, why: "A /14 covers second bytes 4 to 7 (the mask's second byte is 252 = 11111100), so 10.7.x.x is inside." },
        { q: "A table has 0.0.0.0/0 → A, 128.0.0.0/1 → B and 192.168.0.0/16 → C. Where does 192.168.5.5 go?", choices: ["A", "B", "C", "It is dropped"], answer: 2, why: "All three match; /16 is the longest." },
        { q: "A host sends a packet to a server on another network. Which address in the packet changes at every router?", choices: ["The destination IP address", "The source IP address", "The destination MAC address", "None"], answer: 2, why: "Each hop puts the datagram in a new frame addressed to the next node; the IP addresses stay the same (unless a NAT rewrites them)." },
        { q: "Why does DHCP use broadcast?", choices: ["It is faster", "A new host has no address yet and doesn't know the server's", "Routers require it", "To save energy"], answer: 1, why: "Before it is configured, the host can only send to everyone and listen for an offer." },
        { q: "What does the IPv6 header leave out that IPv4's has?", choices: ["Addresses", "The hop count", "A header checksum", "A version number"], answer: 2, why: "IPv6 drops the header checksum (other layers check) and router fragmentation; the TTL survives as the hop limit." }
      ],
      practice: [
        {
          q: `<p>An organization has 192.168.40.0/22. (a) How many addresses does it hold, and what are its first and last? (b) Split it into four equal subnets: give each prefix. (c) Instead, the engineering floor needs 500 addresses and two labs need 100 each. Choose prefixes inside the /22 for them.</p>`,
          a: `<p>(a) 2<sup>10</sup> = 1,024 addresses, 192.168.40.0 to 192.168.43.255. (b) Four /24s: 192.168.40.0/24, 192.168.41.0/24, 192.168.42.0/24, 192.168.43.0/24. (c) 500 usable addresses need 9 host bits (510 usable), a /23: 192.168.40.0/23. 100 needs 7 host bits (126 usable), a /25: 192.168.42.0/25 and 192.168.42.128/25. That leaves 192.168.43.0/24 free for later.</p>`
        },
        {
          q: `<p>Using the forwarding table in the notes (default, 200.23.16.0/20, 200.23.18.0/23, 200.23.18.128/25), find the next hop for 200.23.18.127, 200.23.17.250, 200.23.32.1 and 200.23.18.255. Show the bits where it matters.</p>`,
          hint: `<p>All four start 200.23; look at the third byte in binary: 16 = 00010000, 17 = 00010001, 18 = 00010010, 32 = 00100000.</p>`,
          a: `<p>200.23.18.127: the /20 and /23 match (the third byte is 18 itself); the /25 also needs the fourth byte's first bit to be 1, as in 128 = 10000000, but 127 = 01111111: link 2. 200.23.17.250: 17 = 00010001 matches the /20's 0001xxxx but not the /23's 0001001x: link 1. 200.23.32.1: 32 = 00100000 doesn't match 0001xxxx: default route. 200.23.18.255: 255 starts with 1: link 3.</p>`
        },
        {
          q: `<p>A datagram with total length 3,000 bytes (20-byte header), identification 777 and DF clear arrives at a router whose next link has an MTU of 1,000 bytes. List the fragments: total length, MF flag and fragment offset of each.</p>`,
          a: `<p>Each fragment's data must fit in 1,000 − 20 = 980 bytes and be a multiple of 8: 976 bytes. The 2,980 data bytes become 976, 976, 976 and 52. Fragments: total length 996, MF 1, offset 0; 996, MF 1, offset 122 (976/8); 996, MF 1, offset 244; 72, MF 0, offset 366. All carry identification 777.</p>
<pre><code>data, per = 2980, 976
print([(min(per, data - o) + 20, o + per &lt; data, o // 8) for o in range(0, data, per)])
# [(996, True, 0), (996, True, 122), (996, True, 244), (72, False, 366)]</code></pre>`
        },
        {
          q: `<p>Your laptop (10.0.0.5, behind a home NAT router whose public address is 203.0.113.9) loads a page from 93.184.216.34 port 443 using source port 51000, and the router maps it to public port 40001. (a) Write the source and destination of the outgoing packet before and after the router, and of the reply before and after. (b) Someone on the internet sends a packet to 203.0.113.9 port 40002. What happens?</p>`,
          a: `<p>(a) Outgoing, inside: 10.0.0.5:51000 → 93.184.216.34:443. Outside: 203.0.113.9:40001 → 93.184.216.34:443. Reply, outside: 93.184.216.34:443 → 203.0.113.9:40001. Inside, after translation: 93.184.216.34:443 → 10.0.0.5:51000. (b) Port 40002 has no table entry, so the router has no inside host to send it to and drops it (unless a port forward has been configured).</p>`
        }
      ],
      sources: ["pdbook", "rfc791", "rfc8200"]
    },
    {
      id: "nw4",
      title: "Routing",
      minutes: 90,
      summary: "How routers fill their forwarding tables: the network as a weighted graph; link-state routing with flooding and Dijkstra's algorithm; distance-vector routing with the Bellman–Ford equation, count-to-infinity and its partial fixes; and the internet's two-level hierarchy, with OSPF inside autonomous systems and BGP's policy-driven path-vector routing between them.",
      notes: `
<p>Lesson 3's routers forwarded by looking up a table. <strong>Routing</strong> is how those tables get filled in: the routers of a network cooperate to find good paths, and keep finding them as links fail and recover. To a routing protocol, a network is a weighted graph (CS 201 Lesson 7): routers are vertices, links are edges, and each link has a <strong>cost</strong> set by the operator, which may reflect delay, inverse capacity, or money. A path's cost is the sum of its links' costs. Routing then means: each router finds, for every destination, the first hop of a least-cost path. Because a least-cost path's tail is itself least-cost (CS 220 Lesson 5's optimal substructure), knowing just the next hop at every router is enough to send a packet along the whole path.</p>
<figure class="fig"><svg viewBox="0 0 420 210" width="420" role="img" aria-label="A network of six routers u, v, w, x, y, z. Links: u–v cost 2, u–x 1, u–w 5, v–x 2, v–w 3, w–x 3, w–y 1, w–z 5, x–y 1, y–z 2.">
<g class="ln"><line x1="40" y1="105" x2="140" y2="35"/><line x1="40" y1="105" x2="140" y2="175"/><line x1="40" y1="105" x2="270" y2="35"/>
<line x1="140" y1="35" x2="140" y2="175"/><line x1="140" y1="35" x2="270" y2="35"/><line x1="270" y1="35" x2="140" y2="175"/>
<line x1="270" y1="35" x2="270" y2="175"/><line x1="270" y1="35" x2="380" y2="105"/><line x1="140" y1="175" x2="270" y2="175"/><line x1="270" y1="175" x2="380" y2="105"/></g>
<g class="box"><circle cx="40" cy="105" r="16"/><circle cx="140" cy="35" r="16"/><circle cx="140" cy="175" r="16"/><circle cx="270" cy="35" r="16"/><circle cx="270" cy="175" r="16"/><circle cx="380" cy="105" r="16"/></g>
<g class="text"><text x="40" y="110" text-anchor="middle">u</text><text x="140" y="40" text-anchor="middle">v</text><text x="140" y="180" text-anchor="middle">x</text>
<text x="270" y="40" text-anchor="middle">w</text><text x="270" y="180" text-anchor="middle">y</text><text x="380" y="110" text-anchor="middle">z</text>
<text x="80" y="62" class="m">2</text><text x="80" y="158" class="m">1</text><text x="195" y="82" class="m">5</text><text x="128" y="110" class="m">2</text>
<text x="205" y="27" class="m">3</text><text x="222" y="118" class="m">3</text><text x="278" y="110" class="m">1</text><text x="330" y="62" class="m">5</text>
<text x="205" y="193" class="m">1</text><text x="330" y="158" class="m">2</text></g>
</svg><figcaption>A small network with link costs, used throughout this lesson and in its first programming problem.</figcaption></figure>
<p>There are two classic designs. In <strong>link-state</strong> routing every router learns the whole graph and computes paths itself. In <strong>distance-vector</strong> routing routers know only their neighbours, and learn about the rest from what neighbours tell them.</p>

<h3>Link-state routing</h3>
<p>Each router discovers its neighbours (by sending small "hello" messages on each link) and puts its links and their costs into a <strong>link-state advertisement</strong> (LSA). It then <strong>floods</strong> the LSA: it sends it on every link, and every router that receives an LSA it hasn't seen before stores it and sends it on every link except the one it came in on. Each LSA carries a sequence number, so a router can tell a new advertisement from an old copy and stop the flood. After the flood, every router has the same map, and each runs Dijkstra's algorithm (CS 220 Lesson 5) with itself as the source. Its forwarding table records, for each destination, the first hop of the shortest path, found by following the predecessor links back from the destination.</p>
<pre><code>import heapq

G = {"u": {"v": 2, "x": 1, "w": 5}, "v": {"u": 2, "x": 2, "w": 3},
     "w": {"u": 5, "v": 3, "x": 3, "y": 1, "z": 5}, "x": {"u": 1, "v": 2, "w": 3, "y": 1},
     "y": {"x": 1, "w": 1, "z": 2}, "z": {"w": 5, "y": 2}}

def dijkstra(graph, source):
    dist, prev, heap, done = {source: 0}, {}, [(0, source)], set()
    while heap:
        d, u = heapq.heappop(heap)
        if u in done:
            continue
        done.add(u)
        for v, w in graph[u].items():
            if d + w &lt; dist.get(v, float("inf")):
                dist[v], prev[v] = d + w, u
                heapq.heappush(heap, (d + w, v))
    return dist, prev

def first_hop(prev, source, dest):
    while prev[dest] != source:     # walk back until the step out of the source
        dest = prev[dest]
    return dest

dist, prev = dijkstra(G, "u")
print({d: (first_hop(prev, "u", d), dist[d]) for d in sorted(dist) if d != "u"})
# {'v': ('v', 2), 'w': ('x', 3), 'x': ('x', 1), 'y': ('x', 2), 'z': ('x', 4)}</code></pre>
<p>So u sends traffic for w, y and z to x: the path u–x–y–w costs 3, better than u's direct link to w at 5. Dijkstra with a heap costs O(<em>E</em> log <em>V</em>), cheap even for a network of thousands of routers, and the flood sends each LSA once over each link, O(<em>V</em> · <em>E</em>) messages in all. When a link fails, the routers at its ends flood new LSAs, everyone recomputes, and the network <em>converges</em> on new paths within a fraction of a second. While the new LSA is spreading, routers briefly disagree, and packets may loop between a router that has updated and one that hasn't; the TTL (Lesson 3) kills any that circle too long. <strong>OSPF</strong> (Open Shortest Path First) and <strong>IS-IS</strong> are the link-state protocols used inside most ISPs and large organizations.</p>

<h3>Distance-vector routing</h3>
<p>Let D<sub><em>x</em></sub>(<em>y</em>) be the cost of the least-cost path from <em>x</em> to <em>y</em>. The <strong>Bellman–Ford equation</strong> says that a least-cost path from <em>x</em> starts with a link to some neighbour <em>v</em> and continues along a least-cost path from <em>v</em>:</p>
<p class="math">D<sub><em>x</em></sub>(<em>y</em>) = min over neighbours <em>v</em> of [ c(<em>x</em>, <em>v</em>) + D<sub><em>v</em></sub>(<em>y</em>) ]</p>
<p>This is the relaxation step of CS 220's Bellman–Ford algorithm, run in a distributed way. Each router keeps a <strong>distance vector</strong>, its current estimate of D<sub><em>x</em></sub>(<em>y</em>) for every destination <em>y</em>, and sends it to its neighbours. On receiving a neighbour's vector, it recomputes its own with the equation, and if anything changed, sends the new vector on. The neighbour that gives the minimum is the next hop. Nobody needs the whole graph, and the computation is spread over all routers. Started with every estimate infinite except D<sub><em>x</em></sub>(<em>x</em>) = 0, the estimates converge to the true costs, just as Bellman–Ford's do after enough rounds.</p>
<p>Take three routers with c(x, y) = 2, c(y, z) = 1 and c(x, z) = 7, and suppose all routers exchange vectors in synchronous rounds. After round 1 each knows its direct links: x has D<sub>x</sub>(z) = 7. In round 2, x hears from y that D<sub>y</sub>(z) = 1, computes min(7 + 0, 2 + 1) = 3 via y, and z likewise finds D<sub>z</sub>(x) = 3 via y. Round 3 changes nothing: the network has converged.</p>

<h3>Good news travels fast, bad news slowly</h3>
<p>Now take c(x, y) = 4, c(y, z) = 1 and c(x, z) = 50. After convergence, D<sub>y</sub>(x) = 4 (direct) and D<sub>z</sub>(x) = 5 (via y). If the x–y cost drops to 1, y learns D<sub>y</sub>(x) = 1 in the next round and z learns 2 in the round after: two rounds.</p>
<p>Suppose instead the x–y cost rises to 60. In the next round y computes D<sub>y</sub>(x) = min(60 + 0, 1 + D<sub>z</sub>(x)) = min(60, 1 + 5) = 6, via z. But z's 5 was itself a path through y! z, hearing that D<sub>y</sub>(x) is now 6, updates to min(50, 1 + 6) = 7, via y; then y to 8, z to 9, and so on, each going up by 2 every two rounds, while packets for x bounce between y and z. Only when z's estimate through y passes its direct cost of 50 does z switch to its direct link, and then y follows. With synchronous rounds, where each router uses the vectors its neighbours sent at the end of the previous round, the two take turns:</p>
<table>
<tr><th>After round</th><th>1</th><th>2</th><th>3</th><th>4</th><th>…</th><th>44</th><th>45</th><th>46</th><th>47</th></tr>
<tr><td>D<sub>y</sub>(x)</td><td>6</td><td>6</td><td>8</td><td>8</td><td>…</td><td>48</td><td>50</td><td>50</td><td>51</td></tr>
<tr><td>D<sub>z</sub>(x)</td><td>5</td><td>7</td><td>7</td><td>9</td><td>…</td><td>49</td><td>49</td><td>50</td><td>50</td></tr>
</table>
<p>In round 1, z still hears y's old 4, so it keeps 5. After that, y changes in odd rounds and z in even rounds, and whoever changes in round <em>r</em> has <em>r</em> + 5. In round 45, y reaches 50; in round 46, z computes min(50, 1 + 50) = 50 and switches to its direct link; in round 47, y computes min(60, 1 + 50) = 51 via z; round 48 changes nothing. So it takes 47 rounds. If the x–y link fails completely and there is no other path, the estimates climb forever: <strong>count to infinity</strong>. The programming problems simulate both cases.</p>
<p>Two fixes help. <strong>Split horizon with poisoned reverse</strong>: if z routes to x through y, z tells y that its distance to x is infinite, so y never tries to reach x through z. In the example, y then switches to its direct cost of 60 at once, z switches to its direct 50 a round later, and y finds 51 via z: three rounds. But poisoned reverse only prevents loops between two neighbours; a loop through three or more routers can still count. The blunt fix is to make "infinity" small. <strong>RIP</strong> (Routing Information Protocol), the classic distance-vector protocol, uses hop counts as costs and treats 16 as infinity, which caps the count but limits RIP to networks less than 16 hops across.</p>
<table>
<tr><th></th><th>Link-state</th><th>Distance-vector</th></tr>
<tr><td>What a router knows</td><td>the whole graph</td><td>its neighbours' distance vectors</td></tr>
<tr><td>Messages</td><td>each LSA flooded to every router</td><td>vectors exchanged only between neighbours</td></tr>
<tr><td>Convergence</td><td>fast: recompute after one flood</td><td>can be slow; may count to infinity</td></tr>
<tr><td>A faulty router</td><td>can lie only about its own links</td><td>can advertise wrong costs that spread everywhere</td></tr>
<tr><td>Examples</td><td>OSPF, IS-IS</td><td>RIP; BGP is its descendant</td></tr>
</table>

<h3>Hierarchy: autonomous systems</h3>
<p>Neither algorithm could run across the whole internet as one network: hundreds of thousands of routers flooding LSAs, or vectors with a million destinations changing all the time. And the networks that make up the internet don't want to share their internal maps, or to let someone else decide how traffic crosses them. So routing is split in two levels. Each <strong>autonomous system</strong> (AS), a network under one administration with its own number such as AS15169 (Google), runs an <em>intra-domain</em> protocol of its choice, usually OSPF or IS-IS, inside. Between ASes, everyone runs one <em>inter-domain</em> protocol: <strong>BGP</strong>, the Border Gateway Protocol. There are about 75,000 ASes in use today.</p>

<h3>BGP</h3>
<p>BGP is a <strong>path-vector</strong> protocol: a distance-vector protocol in which an advertisement carries the whole list of ASes on the path, not just a cost. Neighbouring ASes' border routers hold BGP sessions over TCP, and an announcement says, for example, "138.16.64.0/22 is reachable via AS-PATH 2 1 7", meaning through AS 2, then AS 1, to AS 7 where the prefix lives. An AS that receives an announcement whose AS-PATH already contains its own number rejects it, which prevents loops and with them count-to-infinity. Within an AS, the border routers share what they've learned using internal BGP, and the AS's other routers learn which border router to use for each prefix.</p>
<p>The essential difference from the algorithms above is that BGP doesn't look for the cheapest path. Each AS chooses among the routes it has heard by its own <strong>policy</strong>, and decides by policy which routes to tell its neighbours. Policies follow money. Two kinds of relationship dominate:</p>
<ul>
<li><strong>Customer and provider</strong>: the customer pays the provider to carry its traffic to and from the rest of the internet.</li>
<li><strong>Peers</strong>: two ASes exchange traffic between their own customers for free, because both benefit.</li>
</ul>
<p>An AS therefore prefers routes through its customers (they pay it), then through peers (free), then through providers (it pays). And it tells its routes to neighbours selectively. Routes learned from customers it announces to everyone, since carrying traffic to its customers earns money. Routes learned from a peer or a provider it announces only to its customers: if it announced a provider's route to a peer, it would be offering to carry that peer's traffic to its provider, paying for traffic that earns it nothing. These rules (studied by Lixin Gao and Jennifer Rexford around 2000) are why internet paths go "up" through providers, at most once across a peer link, and "down" through customers, and they also guarantee that BGP settles on stable routes when everyone follows them.</p>
<p>Among routes its policy ranks equally, a router's choice has several tie-breaking steps: first the AS's local preference (the policy), then the shortest AS-PATH, then the closest exit from its own network (<strong>hot-potato routing</strong>: hand the packet to the neighbouring AS as soon as possible, so it travels less in your own network), then further tie-breaks. One consequence is that internet paths are often asymmetric: traffic from A to B may take a different path from B to A, because each AS chose its own exit.</p>
<p>BGP trusts what neighbours say. If an AS announces a prefix it doesn't own, or a more specific one that wins by longest-prefix match, traffic follows the lie. The sidebar tells of one such incident. The <em>RPKI</em> (Resource Public Key Infrastructure) now lets address holders publish signed statements of which AS may originate their prefixes, and many networks drop announcements that contradict them.</p>
`,
      terms: [
        ["Link cost", "A number an operator assigns to a link; routing finds paths of least total cost."],
        ["Link-state routing", "Each router floods its links' costs to all routers and computes paths with Dijkstra's algorithm."],
        ["Link-state advertisement", "A router's list of its links and their costs, with a sequence number, flooded to every router."],
        ["Flooding", "Sending a message on every link, each router forwarding new messages on all links but the arrival one."],
        ["Distance-vector routing", "Each router keeps estimated costs to every destination and updates them from neighbours' estimates using the Bellman–Ford equation."],
        ["Bellman–Ford equation", "D_x(y) = min over neighbours v of c(x, v) + D_v(y)."],
        ["Convergence", "The state in which every router's table is correct and stops changing."],
        ["Count to infinity", "Distance-vector routers raising each other's estimates step by step after a cost increase or failure, because their routes point at each other."],
        ["Poisoned reverse", "Advertising an infinite cost to the neighbour you route through, to stop two-router loops."],
        ["Autonomous system", "A network under one administration, with its own AS number and internal routing."],
        ["BGP", "Border Gateway Protocol: the path-vector protocol by which autonomous systems exchange reachability and choose routes by policy."],
        ["AS-PATH", "The list of ASes a BGP route passes through; used to detect loops and as a tie-break."],
        ["Peering", "Two networks exchanging their customers' traffic without payment."],
        ["Hot-potato routing", "Choosing the exit that gets a packet out of your own network soonest."]
      ],
      quiz: [
        { q: "In link-state routing, what does each router send in its advertisements?", choices: ["Its whole forwarding table", "The costs of its own links", "Its distance to every destination", "Only the identity of its neighbours, without costs"], answer: 1, why: "Each LSA describes only the router's own links; everyone assembles the map from all of them." },
        { q: "Router x has neighbours v (cost 1) and w (cost 4). v says D_v(y) = 6 and w says D_w(y) = 2. What is D_x(y), and the next hop?", choices: ["6 via w", "7 via v", "2 via w", "5 via v"], answer: 0, why: "min(1 + 6, 4 + 2) = 6, via w." },
        { q: "What causes count to infinity?", choices: ["Floods that never stop", "Routers whose routes to a destination point at each other, raising their estimates in small steps after a failure", "Negative link costs", "Dijkstra's algorithm on a graph with cycles"], answer: 1, why: "Each believes the other still has a path, built on its own old route." },
        { q: "Why does RIP treat 16 as infinity?", choices: ["Hop counts are stored in 4 bits", "To bound how long counting to infinity can last", "Because 16 is the maximum TTL", "So that paths are at most 16 bytes"], answer: 1, why: "A small infinity caps the count, at the price of limiting the network's diameter." },
        { q: "AS 100 learns a route to a prefix from its provider. To whom does it announce it?", choices: ["Everyone", "Its peers and providers", "Only its customers", "No one"], answer: 2, why: "Announcing it to peers or other providers would mean carrying their traffic to its provider at its own cost." },
        { q: "How does BGP prevent routing loops?", choices: ["By running Dijkstra", "By rejecting routes whose AS-PATH contains the receiving AS's own number", "With poisoned reverse", "With a TTL of 16"], answer: 1, why: "The path vector shows the whole route, so an AS can see that it is already on it." }
      ],
      practice: [
        {
          q: `<p>Run Dijkstra's algorithm by hand from router z in the figure. Give the order in which routers are finished, each one's distance, and z's forwarding table (destination → next hop).</p>`,
          a: `<p>Start z = 0; neighbours y = 2, w = 5. Finish y (2): relax x = 3, w = min(5, 3) = 3. Finish x (3) (a tie with w; take either): relax u = 4, v = 5. Finish w (3): v stays 5 (3 + 3 = 6), u stays 4. Finish u (4), then v (5). Distances: y 2, x 3, w 3, u 4, v 5. Every shortest path starts z–y, so the table sends everything to y.</p>
<pre><code>dist, prev = dijkstra(G, "z")
print({d: (first_hop(prev, "z", d), dist[d]) for d in sorted(dist) if d != "z"})
# {'u': ('y', 4), 'v': ('y', 5), 'w': ('y', 3), 'x': ('y', 3), 'y': ('y', 2)}</code></pre>`
        },
        {
          q: `<p>Four routers in a row, A–B–C–D, each link of cost 1, run distance-vector in synchronous rounds starting from knowing only themselves. (a) After how many rounds does A know its distance to D? (b) The C–D link then fails. Without poisoned reverse, describe the first three rounds of B's and C's estimates of their distance to D.</p>`,
          a: `<p>(a) Round 1: neighbours (A knows B). Round 2: A learns C through B. Round 3: A learns D = 3. In general a router learns a destination <em>k</em> hops away in round <em>k</em>. (b) Before the failure, D<sub>C</sub>(D) = 1, D<sub>B</sub>(D) = 2 (via C), D<sub>A</sub>(D) = 3. Round 1: C has lost its direct link; its only neighbour B says 2, so C computes 1 + 2 = 3 via B. B still hears C's old 1: stays 2. Round 2: C hears B's 2: 3; B hears C's 3: 4. Round 3: C hears 4: 5; B hears 3: 4. The estimates climb by 2 every two rounds until they reach infinity.</p>`
        },
        {
          q: `<p>In the "bad news" example (c(x, y) rises from 4 to 60, c(y, z) = 1, c(x, z) = 50), explain why poisoned reverse gives D<sub>y</sub>(x) = 60 in the first round after the change, and what the final routes are.</p>`,
          a: `<p>Before the change, z routes to x via y, so with poisoned reverse z tells y that D<sub>z</sub>(x) = ∞. When the cost rises, y computes min(60 + 0, 1 + ∞) = 60, direct. z, hearing y's old 4, computes min(50, 1 + 4) = 5, still via y. Next round z hears 60 and switches to direct 50; y still hears ∞ from z. Next round z, now routing directly, tells y the truth, 50, and y computes min(60, 1 + 50) = 51 via z. Final: y reaches x via z at cost 51, z directly at 50. Three rounds instead of 47.</p>`
        },
        {
          q: `<p>AS A is a provider of B and C; B and C are peers; D is a customer of C. D announces its prefix. (a) Which ASes hear about it, and with what AS-PATH? (b) A also has a peer E, another large provider (A and E exchange traffic as peers; neither is the other's customer). Does E hear about D's prefix from A? (c) Which path does traffic from B to D take?</p>`,
          a: `<p>(a) D announces to its provider C (path D). C learned it from a customer, so announces it to everyone: to its peer B (path C D) and its provider A (path C D). A learned it from its customer C, so announces it to everyone, including its customer B (path A C D). (b) Yes: A learned it from a customer, so it announces it to its peer E. (c) B has two routes: C D from a peer and A C D from a provider. It prefers the peer route (free over paid), and the path is shorter too: B → C → D.</p>`
        }
      ],
      sources: ["pdbook", "rfc4271", "clrs"]
    },
    {
      id: "nw5",
      title: "Transport and reliable delivery",
      minutes: 90,
      summary: "From hosts to processes: ports, sockets and UDP. Then building reliable delivery over a channel that corrupts and loses packets, step by step: checksums, acknowledgements, sequence numbers and timeouts give stop-and-wait; its utilization is poor, so pipelining with go-back-N and selective repeat, and how big the sequence space must be.",
      notes: `
<p>IP delivers datagrams to a host, best effort. The <strong>transport layer</strong> delivers data to a particular <em>process</em> on that host, and may add guarantees that IP lacks. Like TCP and HTTP, it runs only on the end hosts (Lesson 1's end-to-end principle).</p>

<h3>Ports and sockets</h3>
<p>Many processes on one host use the network at once: a browser with twenty tabs, a mail client, a game. The transport layer tells their traffic apart with 16-bit <strong>port numbers</strong>. A server listens on a <em>well-known port</em> (below 1024): 53 for DNS, 80 for HTTP, 443 for HTTPS, 22 for SSH. A client's operating system picks an unused <em>ephemeral port</em> (on Linux by default from 32768 up to 60999) for each conversation. A program reaches the network through a <strong>socket</strong>: an endpoint the kernel creates for it, identified by an address and a port, which the program reads and writes through a file descriptor (CS 310 Lesson 1), much like a file.</p>
<p>When a segment arrives, the kernel <em>demultiplexes</em> it to a socket by looking at its header: for UDP, the destination address and port; for TCP, which keeps a separate socket for each connection, all four of source address, source port, destination address and destination port.</p>

<h3>UDP</h3>
<p>The <strong>User Datagram Protocol</strong> (UDP) adds almost nothing to IP: ports and a checksum. Its header is 8 bytes: source port, destination port, length (header plus data, in bytes) and checksum, 16 bits each. The checksum is Lesson 2's Internet checksum over the UDP header and data plus a <em>pseudo-header</em> of the IP source and destination addresses, the protocol number and the length, so that a datagram delivered to the wrong host is also caught. UDP datagrams can be lost, duplicated or reordered, just like IP's. Why use it? Because it adds no delay: no connection setup, no waiting for retransmissions, no slowing down when the network is busy. DNS (Lesson 7) sends one small query and one reply, and simply asks again if no reply comes. Voice and video calls would rather skip a lost packet than wait for it. And new protocols such as QUIC (Lesson 7) are built on UDP in user space, with their own reliability, because UDP passes through the internet's <em>middleboxes</em> where a new transport protocol would not. A middlebox is a device on the path that does more than forward IP packets: a NAT router (Lesson 3) or a firewall. Both read the transport header (a NAT must rewrite its ports), so they handle only protocols they know, TCP and UDP, and many drop packets whose IP protocol number is anything else.</p>
<p>Here is a UDP echo server and a client using Python's <code>socket</code> module. It can't run in this page, whose Python has no network access; run it on your own computer, server first, in two terminals.</p>
<pre data-label="Python: udp_echo.py (run on your computer)"><code>import socket, sys

if sys.argv[1] == "server":
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)   # IPv4, UDP
    s.bind(("127.0.0.1", 9999))                            # listen on port 9999 of this host
    while True:
        data, addr = s.recvfrom(2048)                      # blocks until a datagram arrives
        print("from", addr, data)
        s.sendto(data.upper(), addr)
else:
    c = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    c.settimeout(1.0)                                      # UDP may lose it: don't wait forever
    c.sendto(b"hello", ("127.0.0.1", 9999))
    try:
        print(c.recvfrom(2048))
    except socket.timeout:
        print("no reply")</code></pre>
<pre data-label="Terminal"><code>$ python3 udp_echo.py server             $ python3 udp_echo.py client
from ('127.0.0.1', 54012) b'hello'        (b'HELLO', ('127.0.0.1', 9999))</code></pre>
<p>The client never chose a port: the kernel gave it 54012 when it first sent. <code>127.0.0.1</code> is the <em>loopback</em> address, which means "this host", so the datagram never leaves the machine. A TCP client looks different, because TCP sets up a connection and then carries a stream of bytes:</p>
<pre data-label="Python: tcp_get.py (run on your computer)"><code>import socket

with socket.create_connection(("example.com", 80), timeout=5) as s:   # TCP handshake (Lesson 6)
    s.sendall(b"GET / HTTP/1.1\\r\\nHost: example.com\\r\\nConnection: close\\r\\n\\r\\n")
    chunks = []
    while True:
        data = s.recv(4096)        # some bytes of the stream: any amount up to 4096
        if not data:               # empty: the server closed the connection
            break
        chunks.append(data)
print(b"".join(chunks)[:15])       # b'HTTP/1.1 200 OK'</code></pre>
<p><code>recv</code> returns whatever bytes have arrived, which may be part of a response or several responses at once: TCP preserves the order of bytes, not the boundaries of the writes. The application must find its own message boundaries, as Lesson 7's HTTP parser does. With UDP, by contrast, each <code>recvfrom</code> returns exactly one datagram.</p>

<h3>Building reliable delivery</h3>
<p>Suppose we want every byte delivered exactly once, in order, over a channel that may corrupt, lose, delay and reorder packets. We build a protocol up one problem at a time.</p>
<p><strong>Corruption.</strong> Add a checksum, and have the receiver reply: an <strong>acknowledgement</strong> (ACK) if the packet arrived intact, or say nothing if not. The sender waits for the ACK before sending the next packet.</p>
<p><strong>Damaged or lost ACKs.</strong> If the ACK is lost, the sender can't tell whether its packet arrived, so it must resend; but then the receiver may get the same packet twice and can't tell a retransmission from new data. Fix: number the packets. A <strong>sequence number</strong> on each packet lets the receiver recognize a duplicate, discard it, and ACK it again. For one packet in flight at a time, one bit is enough (alternate 0, 1, 0, 1, …), and the ACK carries the number of the packet it acknowledges.</p>
<p><strong>Loss.</strong> If the packet itself is lost, no ACK ever comes. The sender sets a <strong>timer</strong> when it sends, and if no ACK has come when it expires, it resends. The timeout must be longer than an RTT, or the sender will resend packets that weren't lost; a duplicate is harmless (sequence numbers catch it) but wastes capacity. Lesson 6 shows how TCP chooses the timeout.</p>
<p>The result is <strong>stop-and-wait</strong> (also called the <em>alternating-bit protocol</em>): send packet <em>k</em>, start the timer, and wait; on an ACK for <em>k</em>, move on to <em>k</em> + 1; on a timeout, resend <em>k</em>. Checksums, ACKs, sequence numbers and timers are the ingredients of every reliable protocol.</p>
<p>How many sends does a packet need? If each packet and each ACK is lost independently with probability <em>p</em>, a round succeeds when both survive, with probability (1 − <em>p</em>)<sup>2</sup>. The number of rounds is geometric (MATH 121 Lesson 7), with mean 1/(1 − <em>p</em>)<sup>2</sup>: 1.02 sends per packet at 1% loss, 1.23 at 10%.</p>

<h3>Stop-and-wait wastes the link</h3>
<p>Take a 1 Gb/s link with a 30 ms RTT and 1,500-byte packets. Sending a packet takes <em>L</em>/<em>R</em> = 12,000 / 10<sup>9</sup> s = 12 µs, and then the sender waits for the ACK, which arrives one RTT after the packet's first bit went out (ignoring the ACK's own tiny transmission time), at 30.012 ms. The sender's <strong>utilization</strong>, the fraction of time it is sending, is</p>
<p class="math">U = (<em>L</em>/<em>R</em>) / (RTT + <em>L</em>/<em>R</em>) = 0.012 / 30.012 ≈ 0.0004</p>
<p>The throughput is one packet per 30.012 ms, 12,000 bits / 0.030012 s ≈ 400 kb/s, on a 1 Gb/s link: 0.04% of it. The cure is <strong>pipelining</strong>: allow up to <em>N</em> packets sent but not yet acknowledged, a <strong>window</strong> of <em>N</em>. Then <em>U</em> = <em>N</em> · (<em>L</em>/<em>R</em>) / (RTT + <em>L</em>/<em>R</em>), as long as that is at most 1. With <em>N</em> = 1,000, <em>U</em> ≈ 0.40; to fill the link takes <em>N</em> = (RTT + <em>L</em>/<em>R</em>) / (<em>L</em>/<em>R</em>) = 2,501 packets, about 3.75 MB: Lesson 1's bandwidth-delay product. Pipelining needs more than one bit of sequence number, buffers at the sender for packets that may need resending, and a rule for what to do on a loss. There are two classic rules.</p>

<h3>Go-back-N</h3>
<p>In <strong>go-back-N</strong> (GBN), the sender keeps <em>base</em>, the oldest unacknowledged sequence number, and <em>next</em>, the next one to send, and may send while next &lt; base + <em>N</em>. The receiver is as simple as possible: it keeps only <em>expected</em>, the next sequence number it wants. An in-order packet is delivered and expected increases; anything else is discarded. Either way it sends back a <strong>cumulative ACK</strong> carrying expected, meaning "I have everything before this". The sender keeps one timer, for the oldest unacknowledged packet. An ACK of <em>a</em> &gt; base moves base to <em>a</em> (and restarts the timer if packets are still outstanding). On a timeout, the sender goes back: it resends every packet from base on.</p>
<p>Trace it with window 3, packets 0 to 3, a one-way delay of 1 tick, a timeout of 5 ticks, at most one send per tick, and packet 1's first transmission lost:</p>
<table>
<tr><th>Tick</th><th>Sender</th><th>Receiver</th></tr>
<tr><td>0</td><td>send 0</td><td></td></tr>
<tr><td>1</td><td>send 1 (lost)</td><td>gets 0, delivers it, ACK 1</td></tr>
<tr><td>2</td><td>ACK 1 arrives: base = 1, restart timer; send 2</td><td></td></tr>
<tr><td>3</td><td>send 3 (window 1–3 now full)</td><td>gets 2: out of order, discard, ACK 1</td></tr>
<tr><td>4</td><td>duplicate ACK 1: nothing changes</td><td>gets 3: discard, ACK 1</td></tr>
<tr><td>7</td><td>timer (started at 2) expires: resend 1</td><td></td></tr>
<tr><td>8, 9</td><td>resend 2, 3; ACK 2 arrives at 9</td><td>gets 1: deliver, ACK 2; then 2: ACK 3</td></tr>
<tr><td>10, 11</td><td>ACK 3, then ACK 4: done at tick 11</td><td>gets 3: ACK 4</td></tr>
</table>
<p>Packets 2 and 3 crossed the channel twice though only packet 1 was lost. That is go-back-N's weakness: with a large window, one loss costs a whole window of retransmissions. Its strength is simplicity: the receiver needs no buffer, and a lost ACK does no harm, since a later cumulative ACK covers it. The first programming problem implements this sender exactly.</p>

<h3>Selective repeat</h3>
<p>In <strong>selective repeat</strong> (SR), the receiver buffers packets that arrive out of order and acknowledges each packet individually; the sender keeps a timer per packet and resends only those that time out. The receiver has its own window, the <em>N</em> sequence numbers from its rcv_base (the first number it hasn't yet delivered): a packet in the window is buffered and ACKed, and when rcv_base arrives, it and every buffered packet after it without a gap are delivered, and the window slides. A packet from the <em>N</em> numbers just below rcv_base has already been delivered: its ACK must have been lost, so the receiver ACKs it again (otherwise the sender would resend it forever). In the trace above, SR would resend only packet 1.</p>
<p>Real sequence numbers have a fixed number of bits, so they wrap around: with <em>k</em> bits they run 0 to 2<sup><em>k</em></sup> − 1 and start again. That limits the window. Take sequence numbers 0 to 3 and a window of 3. The sender sends 0, 1, 2; all arrive, and the receiver's window moves to 3, 0, 1. Now consider two cases. (a) All three ACKs are lost; the sender times out and resends the <em>old</em> packet 0. (b) The ACKs arrive; the sender sends 3, which is lost, then a <em>new</em> packet 0. In both cases the receiver sees a packet numbered 0 arrive into its window, and it can't tell which it is; in case (a) it would deliver old data as new. The fix is to keep the window at most half the sequence space: <em>N</em> ≤ 2<sup><em>k</em></sup> / 2. Then the old copies (the <em>N</em> numbers below rcv_base) and the new window never overlap. Go-back-N needs less. Its receiver accepts only the one number <em>expected</em>, and an old copy still in flight is one of the <em>N</em> numbers just below it, so those <em>N</em> numbers and <em>expected</em> must all differ: <em>N</em> + 1 ≤ 2<sup><em>k</em></sup>, that is <em>N</em> ≤ 2<sup><em>k</em></sup> − 1 (window 3 with numbers 0 to 3 is safe for GBN). The second programming problem builds an SR receiver that enforces this.</p>
<p>TCP, next lesson, is a hybrid: cumulative ACKs like go-back-N, but a receiver that buffers out-of-order data and a sender that usually resends only the missing segment, like selective repeat. Its sequence numbers count bytes, not packets, and are 32 bits long.</p>
`,
      terms: [
        ["Port", "A 16-bit number identifying a process's endpoint on a host; well-known ports below 1024 belong to standard services."],
        ["Socket", "The endpoint a program uses to send and receive network data, identified by an address and a port and used through a file descriptor."],
        ["Demultiplexing", "Delivering an arriving segment to the right socket using header fields such as ports."],
        ["UDP", "User Datagram Protocol: IP plus ports and a checksum; no connection, no reliability, no ordering."],
        ["Acknowledgement (ACK)", "A message from the receiver confirming what it has received."],
        ["Sequence number", "A number on each packet (or byte) that lets the receiver detect duplicates and order data."],
        ["Timeout", "Retransmitting when no acknowledgement arrives within a set time."],
        ["Stop-and-wait", "Sending one packet and waiting for its ACK before sending the next."],
        ["Utilization", "The fraction of time a sender spends sending."],
        ["Pipelining", "Having several packets sent but unacknowledged at once."],
        ["Window", "The maximum number of packets (or bytes) that may be sent but not yet acknowledged."],
        ["Go-back-N", "A sliding-window protocol with cumulative ACKs and a receiver that discards out-of-order packets; on a timeout, the sender resends everything unacknowledged."],
        ["Cumulative ACK", "An ACK meaning that everything before a given sequence number has arrived."],
        ["Selective repeat", "A sliding-window protocol in which the receiver buffers out-of-order packets and ACKs each one, and the sender resends only the lost ones."]
      ],
      quiz: [
        { q: "A UDP segment arrives for 10.0.0.5 port 53. What does the kernel use to choose the socket?", choices: ["Only the source port", "The destination address and port", "All four of the source and destination addresses and ports", "The checksum"], answer: 1, why: "A UDP socket is identified by its own address and port; TCP connections use all four fields." },
        { q: "Why does stop-and-wait need sequence numbers?", choices: ["To order packets for the application", "So the receiver can recognize a retransmitted packet whose ACK was lost", "To compute the checksum", "To measure the RTT"], answer: 1, why: "Without them, a retransmission after a lost ACK would look like new data." },
        { q: "A link runs at 100 Mb/s with an RTT of 10 ms. What is stop-and-wait's utilization with 1,250-byte packets?", choices: ["About 1%", "About 10%", "About 0.1%", "About 50%"], answer: 0, why: "L/R = 10,000 / 10^8 = 0.1 ms; U = 0.1 / 10.1 ≈ 0.0099." },
        { q: "In go-back-N with window 4, packets 10 to 13 are sent and packet 11 is lost. What does the receiver do with 12 and 13?", choices: ["Buffers them", "Discards them and ACKs 11 again", "Delivers them", "ACKs them individually"], answer: 1, why: "The GBN receiver accepts only the expected packet and repeats its cumulative ACK, 11 (everything before 11)." },
        { q: "Selective repeat uses 3-bit sequence numbers (0 to 7). What is the largest safe window?", choices: ["7", "8", "4", "3"], answer: 2, why: "The window must be at most half the sequence space: 8 / 2 = 4." },
        { q: "Why might an application choose UDP over TCP?", choices: ["UDP is reliable", "It wants no setup delay and would rather lose late data than wait for it", "UDP has larger packets", "UDP encrypts data"], answer: 1, why: "DNS, voice and video, and protocols with their own reliability such as QUIC choose UDP for exactly that." }
      ],
      practice: [
        {
          q: `<p>Packets and ACKs are each lost independently with probability 5%. With stop-and-wait over a path with a 20 ms RTT and a timeout of 50 ms, estimate the average time to deliver one packet (ignore transmission time). Hint: count the failed rounds, which each cost a timeout, and the successful one, which costs an RTT.</p>`,
          a: `<p>A round succeeds with probability 0.95<sup>2</sup> = 0.9025. The number of rounds is geometric with mean 1/0.9025 ≈ 1.108, so on average 0.108 rounds fail. Average time ≈ 0.108 × 50 + 20 ≈ 25.4 ms.</p>
<pre><code>q = 0.95 ** 2
print(round((1 / q - 1) * 50 + 20, 1))   # 25.4</code></pre>`
        },
        {
          q: `<p>A sender on a 10 Mb/s link with a 100 ms RTT sends 1,000-byte packets. (a) What window size (in packets) gives 50% utilization? (b) What window fills the link? (c) How many bits of sequence number does go-back-N need for that window, and how many does selective repeat need?</p>`,
          a: `<p><em>L</em>/<em>R</em> = 8,000 / 10<sup>7</sup> = 0.8 ms; RTT + <em>L</em>/<em>R</em> = 100.8 ms. (a) <em>N</em> · 0.8 / 100.8 = 0.5 gives <em>N</em> = 63. (b) <em>N</em> = 100.8 / 0.8 = 126. (c) Go-back-N's receiver accepts only the one expected number, so it needs <em>N</em> ≤ 2<sup><em>k</em></sup> − 1: 7 bits (127). Selective repeat needs <em>N</em> ≤ 2<sup><em>k</em></sup>/2: 8 bits (256/2 = 128).</p>`
        },
        {
          q: `<p>Redo the notes' go-back-N trace (window 3, delay 1, timeout 5, packets 0 to 3) when instead the ACK for packet 0 (the first ACK the receiver sends) is lost. Which packets are sent when, and when does the sender finish?</p>`,
          a: `<p>Sends 0, 1, 2 at ticks 0, 1, 2 (the window is 0–2 and no ACK has arrived). Packet 0 arrives at tick 1 and its ACK 1 is lost. Packet 1 arrives at tick 2: ACK 2 arrives at tick 3, moving base to 2, so packet 3 is sent at tick 3. ACK 3 arrives at tick 4 and ACK 4 at tick 5: done at tick 5, with no retransmission. The cumulative ACK 2 covered the lost ACK 1.</p>`
        },
        {
          q: `<p>Run the notes' sequence-number ambiguity with a window of 2 instead of 3 (sequence numbers 0 to 3). After packets 0 and 1 arrive, what is the receiver's window? Show that a retransmitted old packet 0 can no longer be confused with new data.</p>`,
          a: `<p>After 0 and 1 are delivered, rcv_base = 2 and the window is {2, 3}. An old retransmitted 0 or 1 falls in the 2 numbers below the base, {0, 1}, so the receiver recognizes it as old and re-ACKs it. The sender can't send a new 0 until 2 and 3 are acknowledged, and the receiver's window moves to {0, 1} only after it has received 2 and 3, which the sender sent after it learned that the old 0 and 1 had arrived. So a packet numbered 0 that arrives into the window {0, 1} is new, provided the channel doesn't hold an old copy for so long that it arrives after all of that. (TCP guards against such ancient packets with a maximum segment lifetime, Lesson 6.)</p>`
        }
      ],
      sources: ["pdbook", "rfc768", "pysocket"]
    },
    {
      id: "nw6",
      title: "TCP",
      minutes: 90,
      summary: "The internet's reliable byte stream: TCP's segment format, the three-way handshake and teardown, byte sequence numbers and cumulative ACKs, fast retransmit, estimating RTT and setting the timeout, flow control with the receive window, and congestion control: slow start, AIMD, fast recovery, the sawtooth and why it shares links fairly.",
      notes: `
<p>TCP, the Transmission Control Protocol, carries most of the internet's bytes. It gives an application a <strong>reliable, in-order byte stream</strong> in each direction between two sockets, built from Lesson 5's ingredients. It adds two things Lesson 5 didn't need: a <strong>connection</strong>, set up and torn down explicitly, and <strong>congestion control</strong>, which slows senders down when the network is overloaded.</p>

<h3>The segment</h3>
<p>The application writes bytes; TCP cuts them into <strong>segments</strong>, each carrying at most one <strong>maximum segment size</strong> (MSS) of data, usually 1,460 bytes so that a segment fits in a 1,500-byte Ethernet payload with the TCP and IP headers. The header is at least 20 bytes:</p>
<table>
<tr><th>Bytes</th><th>Fields</th></tr>
<tr><td>0–3</td><td>source port · destination port</td></tr>
<tr><td>4–7</td><td>sequence number (32 bits)</td></tr>
<tr><td>8–11</td><td>acknowledgement number (32 bits)</td></tr>
<tr><td>12–15</td><td>header length (4 bits, in 32-bit words) · flags (CWR, ECE, URG, ACK, PSH, RST, SYN, FIN) · receive window (16 bits)</td></tr>
<tr><td>16–19</td><td>checksum (over a pseudo-header, header and data, as for UDP) · urgent pointer</td></tr>
<tr><td>20–</td><td>options, such as the MSS, window scaling, selective ACKs and timestamps; then the data</td></tr>
</table>
<p>The sections below explain SYN, ACK, FIN and RST, and the congestion-control section explains ECE and CWR. The other two are rarely used. PSH (push) asks the receiver to hand the data to the application at once instead of waiting to collect more. URG says the segment carries urgent data, and the urgent pointer gives the offset where it ends; this was meant for things like an interrupt key in a remote terminal, and new applications don't use it.</p>
<p>TCP numbers <em>bytes</em>, not segments. A segment's <strong>sequence number</strong> is the number of its first data byte. The <strong>acknowledgement number</strong> is the number of the next byte the sender of the ACK expects: a cumulative ACK, as in go-back-N. If a host has received bytes 0 to 999 and 2,000 to 2,999, it ACKs 1,000, however many times later segments arrive. Every segment after the first carries an ACK, so data and acknowledgements ride together in a two-way conversation.</p>

<h3>Opening and closing a connection</h3>
<p>Each side chooses a random <strong>initial sequence number</strong> (ISN), so that segments from an old connection between the same ports are unlikely to fall in the new one's range, and so that an attacker who can't see the traffic can't guess valid numbers. The <strong>three-way handshake</strong> exchanges them:</p>
<ol>
<li>The client sends a <strong>SYN</strong> segment (the SYN flag set, no data) with sequence number <em>x</em>, its ISN.</li>
<li>The server, if a socket is listening on that port, replies with a <strong>SYN-ACK</strong>: its own ISN <em>y</em>, and ACK <em>x</em> + 1.</li>
<li>The client replies with an ACK of <em>y</em> + 1, and may include data with sequence number <em>x</em> + 1.</li>
</ol>
<p>A SYN counts as one byte of sequence space, which is why the ACKs are <em>x</em> + 1 and <em>y</em> + 1. Example: the client's ISN is 4,000 and the server's 9,000. SYN seq 4000; SYN-ACK seq 9000 ack 4001; ACK seq 4001 ack 9001, carrying a 300-byte HTTP request (bytes 4,001 to 4,300). The server's reply, 1,000 bytes, has seq 9001 and ack 4301, and the client acknowledges it with ack 10001. The handshake costs one RTT before any data can flow, which is why Lesson 7 cares about reusing connections. (Why not two messages? The server must know that the client received its ISN before it trusts the connection, and the third message is the proof.)</p>
<p>Closing is done per direction. A side that has no more to send sends a <strong>FIN</strong> (which also counts as one byte), and the other ACKs it; it may keep sending until it too sends a FIN. The side that sent the first FIN then waits in the <strong>TIME_WAIT</strong> state for twice the <em>maximum segment lifetime</em> (2 MSL, typically 60 seconds on Linux) before forgetting the connection, so that a retransmitted final FIN can still be answered, and so that delayed segments of this connection die out before the same ports are reused. A segment with the <strong>RST</strong> flag aborts a connection at once; it is also the reply to a SYN for a port where nothing is listening ("connection refused").</p>

<h3>Retransmission</h3>
<p>TCP's sender keeps one retransmission timer, for the oldest unacknowledged segment, like go-back-N. But receivers usually buffer out-of-order segments, and on a timeout the sender resends only the oldest unacknowledged segment, not the whole window, so TCP behaves much like selective repeat.</p>
<p>Waiting for a timeout is slow. When a segment is lost but later ones arrive, the receiver sends an ACK for each, all carrying the same acknowledgement number: <strong>duplicate ACKs</strong>. A duplicate ACK could just mean reordering, but three duplicates (four ACKs with the same number) almost certainly mean a loss, so the sender resends the missing segment at once, without waiting for the timer: <strong>fast retransmit</strong>. The <em>selective acknowledgement</em> (SACK) option goes further, letting the receiver list the blocks it holds beyond the cumulative ACK so that the sender can fill several holes in one round trip.</p>

<h3>Choosing the timeout</h3>
<p>The timeout must exceed the RTT, but RTTs vary with distance and with queues (Lesson 1). TCP measures a <em>sample</em> RTT for a segment (from sending it to receiving its ACK) and keeps smoothed estimates, as RFC 6298 specifies. With <em>α</em> = 1/8 and <em>β</em> = 1/4, for each new sample <em>R</em>:</p>
<p class="math">RTTVAR ← (1 − <em>β</em>) · RTTVAR + <em>β</em> · |SRTT − <em>R</em>|<br>SRTT ← (1 − <em>α</em>) · SRTT + <em>α</em> · <em>R</em><br>RTO = SRTT + 4 · RTTVAR</p>
<p>SRTT is an <em>exponentially weighted moving average</em>: each sample counts 1/8, and older samples' weight decays by 7/8 per sample. RTTVAR estimates how much samples deviate from it, so that the timeout leaves more slack when RTTs are erratic. The first sample sets SRTT = <em>R</em> and RTTVAR = <em>R</em>/2. Samples of 100, 120, 80, 300 and 100 ms give:</p>
<table>
<tr><th>Sample (ms)</th><th>SRTT</th><th>RTTVAR</th><th>SRTT + 4 · RTTVAR</th></tr>
<tr><td>100</td><td>100.0</td><td>50.0</td><td>300.0</td></tr>
<tr><td>120</td><td>102.5</td><td>42.5</td><td>272.5</td></tr>
<tr><td>80</td><td>99.7</td><td>37.5</td><td>249.7</td></tr>
<tr><td>300</td><td>124.7</td><td>78.2</td><td>437.5</td></tr>
<tr><td>100</td><td>121.6</td><td>64.8</td><td>381.0</td></tr>
</table>
<p>(Row 2: RTTVAR = 0.75 × 50 + 0.25 × |100 − 120| = 42.5, then SRTT = 0.875 × 100 + 0.125 × 120 = 102.5.) The single 300 ms sample raised the timeout by three-quarters, mostly through RTTVAR. RFC 6298 also puts a floor of 1 second under the RTO (Linux uses 200 ms), and two more rules. When the timer expires, the RTO in use, the value after the floor, doubles, since the network may be badly congested (exponential backoff, again); it stays doubled until a new sample recomputes it. And <strong>Karn's algorithm</strong>: never take a sample from a retransmitted segment, because an ACK for it can't be matched to the original or the copy. The first programming problem implements this estimator.</p>

<h3>Flow control</h3>
<p>The receiving application may read slowly, and the receiver's kernel buffer is finite. Each segment's <strong>receive window</strong> field tells the other side how many more bytes, beyond the acknowledgement number, the receiver can accept. The sender keeps the bytes sent but not yet acknowledged at most this value. If the window reaches 0, the sender stops and periodically sends a one-byte probe to learn when it opens. The field is 16 bits, so at most 65,535 bytes, which limits a connection with a 100 ms RTT to 65,535 × 8 / 0.1 ≈ 5.2 Mb/s. The <em>window scale</em> option, agreed in the handshake, multiplies the field by a power of two, allowing windows of up to 1 GB, enough for any bandwidth-delay product.</p>

<h3>Congestion control</h3>
<p>Flow control protects the receiver; <strong>congestion control</strong> protects the network. If senders send faster than a bottleneck link can carry, its queue fills, packets are dropped, senders retransmit, and the link fills with retransmissions of packets that were already delivered or will be dropped again. In 1986 the young internet suffered such a <em>congestion collapse</em> (sidebar). Van Jacobson's fix, still the basis of TCP, is for each sender to infer congestion from loss and to adjust its own rate, with no help from routers.</p>
<p>The sender keeps a <strong>congestion window</strong>, cwnd, and keeps the bytes in flight at most min(cwnd, receive window). Since it sends about one window per RTT, its rate is about cwnd / RTT. The rules, in units of MSS (TCP Reno, as in RFC 5681):</p>
<ul>
<li><strong>Slow start.</strong> A new connection starts with a small cwnd (1 MSS in the classic algorithm; most systems now start at 10) and adds 1 MSS for every ACK, so the window doubles every RTT: exponential growth, "slow" only compared with sending a whole window at once. It continues until cwnd reaches the <strong>slow-start threshold</strong>, ssthresh, or a loss occurs.</li>
<li><strong>Congestion avoidance.</strong> Above ssthresh, cwnd grows by 1 MSS per RTT (by MSS/cwnd for each ACK): <strong>additive increase</strong>, probing gently for spare capacity.</li>
<li><strong>Loss by three duplicate ACKs.</strong> The network is still delivering later segments, so the congestion is moderate: fast retransmit the missing segment, set ssthresh = cwnd / 2 and cwnd = ssthresh, and continue in congestion avoidance. Halving is the <strong>multiplicative decrease</strong>. (Reno's <em>fast recovery</em> also inflates cwnd temporarily by the duplicate ACKs while the hole is repaired; our model skips that detail.)</li>
<li><strong>Loss by timeout.</strong> Nothing is getting through: set ssthresh = cwnd / 2 and cwnd = 1, and slow-start again.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 440 215" width="440" role="img" aria-label="Congestion window over 26 round trips: slow start doubles from 1 to 16, then additive increase to 21, a triple duplicate ACK halves it to 10, it grows to 18, a timeout drops it to 1, then slow start up to 8 and linear growth again.">
<g class="ln"><line x1="40" y1="185" x2="425" y2="185"/><line x1="40" y1="185" x2="40" y2="30"/></g>
<g class="hl"><polyline fill="none" points="40,178 55,171 70,157 85,129 100,73 115,66 130,59 145,52 160,45 175,38 190,115 205,108 220,101 235,94 250,87 265,80 280,73 295,66 310,59 325,178 340,171 355,157 370,129 385,122 400,115 415,108"/></g>
<g class="text"><text x="34" y="189" text-anchor="end" class="m">0</text><text x="34" y="119" text-anchor="end" class="m">10</text><text x="34" y="49" text-anchor="end" class="m">20</text>
<text x="40" y="202" text-anchor="middle" class="m">0</text><text x="115" y="202" text-anchor="middle" class="m">5</text><text x="190" y="202" text-anchor="middle" class="m">10</text><text x="265" y="202" text-anchor="middle" class="m">15</text><text x="340" y="202" text-anchor="middle" class="m">20</text><text x="415" y="202" text-anchor="middle" class="m">25</text>
<text x="230" y="214" text-anchor="middle" class="m">round trip</text><text x="8" y="22" class="m">cwnd (MSS)</text>
<text x="180" y="30" class="m">3 dup ACKs</text><text x="318" y="50" class="m">timeout</text><text x="105" y="125" class="m">slow start</text></g>
</svg><figcaption>cwnd at the start of each round trip, with ssthresh initially 16, a triple duplicate ACK in round 9 and a timeout in round 18: the output of <code>cwnd_trace(26, {9: "dup", 18: "timeout"}, ssthresh=16)</code> from the second programming problem.</figcaption></figure>
<p>Read the figure: 1, 2, 4, 8, 16 (slow start reaches ssthresh), then 17, 18, …, 21. A triple duplicate ACK at 21 sets ssthresh = 10 and cwnd = 10, and additive increase resumes. A timeout at 18 sets ssthresh = 9 and cwnd = 1; slow start doubles to 8, then (the next doubling would pass ssthresh) the window grows linearly from 9. In steady state, a long-running TCP connection's window traces this <strong>sawtooth</strong>, climbing by 1 MSS per RTT and halving at each loss.</p>

<h3>How fast, and how fair</h3>
<p>If losses happen whenever the window reaches <em>W</em>, the window cycles between <em>W</em>/2 and <em>W</em>, averaging 3<em>W</em>/4, so the average throughput is about 0.75 · <em>W</em> · MSS / RTT. How big is <em>W</em>? Climbing from <em>W</em>/2 to <em>W</em> at 1 MSS per RTT takes <em>W</em>/2 RTTs, in which about (3<em>W</em>/4) · (<em>W</em>/2) = 3<em>W</em><sup>2</sup>/8 segments are sent, with one loss at the end. So the loss rate is <em>p</em> = 8/(3<em>W</em><sup>2</sup>), giving <em>W</em> = √(8/(3<em>p</em>)), and the throughput is (3/4) · √(8/(3<em>p</em>)) · MSS / RTT = √(3/2) · MSS / (RTT · √<em>p</em>). This is a famous approximation (Mathis and others, 1997): with loss rate <em>p</em>, throughput ≈ 1.22 · MSS / (RTT · √<em>p</em>). Throughput falls with the RTT and with the square root of the loss rate. To reach 10 Gb/s with 1,460-byte segments and a 100 ms RTT, <em>p</em> must be at most (1.22 × 11,680 / (0.1 × 10<sup>10</sup>))<sup>2</sup> ≈ 2 × 10<sup>−10</sup>: one loss in five billion segments. That is one reason high-speed networks use other algorithms.</p>
<p>AIMD also shares a bottleneck fairly. Picture two connections through a link of capacity <em>C</em>, with rates <em>x</em> and <em>y</em>. Additive increase adds the same amount to both, moving the pair (<em>x</em>, <em>y</em>) parallel to the line <em>x</em> = <em>y</em>. When <em>x</em> + <em>y</em> exceeds <em>C</em>, both see losses and halve, moving the pair halfway towards (0, 0), which halves the difference <em>x</em> − <em>y</em>. Additive increase never changes the difference, and each decrease halves it, so the rates converge to equal shares, <em>C</em>/2 each, from any starting point (Chiu and Jain, 1989). Additive decrease or multiplicative increase wouldn't converge. The fairness is only per connection, though: a connection with a shorter RTT grows faster and gets more, and an application that opens ten parallel connections gets ten shares.</p>
<p>Reno is the textbook algorithm, not the most common one. Linux, and with it most servers, has used <strong>CUBIC</strong> by default since 2006: after a loss it grows the window along a cubic curve in time, regaining its old window quickly and then probing cautiously, which works better on fast long paths. Google's <strong>BBR</strong> (2016) doesn't treat loss as the signal at all: it measures the bottleneck bandwidth and the minimum RTT and paces packets to match them, keeping queues short. And with <strong>explicit congestion notification</strong> (ECN), routers mark packets instead of dropping them when their queues build up, and the receiver echoes the mark back (the ECE and CWR flags), so senders can slow down before any packet is lost.</p>
`,
      terms: [
        ["TCP", "Transmission Control Protocol: a connection-oriented, reliable, in-order byte stream with flow and congestion control."],
        ["MSS", "Maximum segment size: the most data bytes one TCP segment carries, typically 1,460."],
        ["Sequence number (TCP)", "The byte-stream number of the first data byte in a segment."],
        ["Acknowledgement number", "The number of the next byte the receiver expects; acknowledges every byte before it."],
        ["Three-way handshake", "SYN, SYN-ACK, ACK: the exchange that opens a TCP connection and synchronizes both initial sequence numbers."],
        ["FIN and RST", "FIN closes one direction of a connection gracefully; RST aborts it."],
        ["TIME_WAIT", "The state in which the side that closed first waits 2 MSL before reusing the connection's ports."],
        ["Fast retransmit", "Resending a segment after three duplicate ACKs, without waiting for the timer."],
        ["RTO", "Retransmission timeout: SRTT + 4 · RTTVAR, at least 1 second in RFC 6298, doubled after each expiry."],
        ["Karn's algorithm", "Never measure RTT on a retransmitted segment."],
        ["Receive window", "The space the receiver advertises in each segment; the sender keeps unacknowledged bytes within it (flow control)."],
        ["Congestion window", "cwnd: the sender's own limit on bytes in flight, adjusted to the network's congestion."],
        ["Slow start", "Doubling cwnd each RTT from a small value until it reaches ssthresh or a loss occurs."],
        ["AIMD", "Additive increase, multiplicative decrease: +1 MSS per RTT, halve on loss; gives the sawtooth and converges to fair shares."],
        ["ssthresh", "The slow-start threshold: the window size at which TCP switches from slow start to additive increase."]
      ],
      quiz: [
        { q: "A client's ISN is 500. It sends a SYN, gets a SYN-ACK with seq 7000, and sends 100 bytes of data. What are the sequence and acknowledgement numbers of that data segment?", choices: ["seq 500, ack 7000", "seq 501, ack 7001", "seq 501, ack 7000", "seq 600, ack 7001"], answer: 1, why: "The SYN used byte 500, so data starts at 501; the server's SYN used 7000, so the client expects 7001." },
        { q: "A receiver has bytes 0–1,999 and 3,000–3,999. What acknowledgement number does it send?", choices: ["2000", "3000", "4000", "1999"], answer: 0, why: "TCP ACKs are cumulative: the next byte expected is 2,000." },
        { q: "Why does TCP never take an RTT sample from a retransmitted segment?", choices: ["It would be too small", "The ACK can't be matched to the original or the retransmission", "Retransmissions have no timestamp field", "RFC 6298 forbids all samples after a loss"], answer: 1, why: "That is Karn's algorithm: the sample could be off by a whole timeout." },
        { q: "A TCP sender has cwnd = 40 MSS, the receiver advertises 20 MSS, and the RTT is 50 ms with MSS 1,000 bytes. About what rate can it send at?", choices: ["6.4 Mb/s", "3.2 Mb/s", "0.8 Mb/s", "12.8 Mb/s"], answer: 1, why: "min(40, 20) = 20 MSS per 50 ms: 20 × 8,000 / 0.05 = 3.2 Mb/s." },
        { q: "In TCP Reno, cwnd = 24 MSS when three duplicate ACKs arrive. What are ssthresh and cwnd afterwards?", choices: ["12 and 1", "12 and 12", "24 and 12", "23 and 23"], answer: 1, why: "Multiplicative decrease: ssthresh = 24/2 = 12 and cwnd = 12; a timeout would instead set cwnd to 1." },
        { q: "Why does AIMD converge to a fair share between two flows?", choices: ["Routers enforce it", "Additive increase keeps the difference between their rates while each multiplicative decrease halves it", "Both flows have the same RTT by definition", "Slow start equalizes them"], answer: 1, why: "Repeated halving drives the difference to zero while the sum stays near capacity." }
      ],
      practice: [
        {
          q: `<p>Write out the full sequence of segments, with flags, sequence and acknowledgement numbers, for: handshake (client ISN 100, server ISN 800); the client sends 200 bytes; the server replies with 500 bytes; the client closes; the server closes. Assume each data segment is acknowledged on its own.</p>`,
          a: `<p>1. C→S SYN seq 100. 2. S→C SYN-ACK seq 800 ack 101. 3. C→S ACK seq 101 ack 801. 4. C→S data seq 101 (200 bytes: 101–300) ack 801. 5. S→C ACK ack 301. 6. S→C data seq 801 (500 bytes: 801–1,300) ack 301. 7. C→S ACK seq 301 ack 1301. 8. C→S FIN seq 301 ack 1301. 9. S→C ACK seq 1301 ack 302. 10. S→C FIN seq 1301 ack 302. 11. C→S ACK seq 302 ack 1302; the client enters TIME_WAIT. Each FIN, like each SYN, uses one sequence number.</p>`
        },
        {
          q: `<p>Continue the notes' RTO table with two more samples, 110 ms and 500 ms. What is the RTO before the 1-second floor after each? Then the timer expires twice in a row: what is the RTO (with the floor)?</p>`,
          a: `<p>From SRTT 121.64 and RTTVAR 64.83 (keep the unrounded values). Sample 110: RTTVAR = 0.75 × 64.83 + 0.25 × |121.64 − 110| = 51.53; SRTT = 0.875 × 121.64 + 0.125 × 110 = 120.18; RTO = 120.18 + 4 × 51.53 = 326.3 ms. Sample 500: RTTVAR = 0.75 × 51.53 + 0.25 × 379.82 = 133.61; SRTT = 0.875 × 120.18 + 0.125 × 500 = 167.66; RTO = 702.1 ms. With the 1-second floor the RTO is 1 s, and two expiries double it twice: 4 s.</p>
<pre><code>srtt, var = 0.1, 0.05
for r in (0.12, 0.08, 0.3, 0.1, 0.11, 0.5):
    var = 0.75 * var + 0.25 * abs(srtt - r)
    srtt = 0.875 * srtt + 0.125 * r
    print(round(1000 * (srtt + 4 * var), 1))
# 272.5
# 249.7
# 437.5
# 381.0
# 326.3
# 702.1</code></pre>`
        },
        {
          q: `<p>A TCP Reno connection starts with cwnd = 1 MSS and ssthresh = 32. Give cwnd at the start of each of the first 12 round trips if a triple duplicate ACK occurs in round 7 (counting from 0) and nothing else goes wrong. During which rounds is it in slow start?</p>`,
          a: `<p>1, 2, 4, 8, 16, 32 (slow start in rounds 0–4, reaching ssthresh at round 5), 33, 34 (congestion avoidance); the loss in round 7 at cwnd 34 sets ssthresh = cwnd = 17; then 17, 18, 19, 20. So: 1, 2, 4, 8, 16, 32, 33, 34, 17, 18, 19, 20.</p>`
        },
        {
          q: `<p>Two TCP flows share a 10 Mb/s bottleneck. Flow A starts at 1 Mb/s and flow B at 7 Mb/s. Model AIMD in steps: each step both add 1 Mb/s, and whenever the total exceeds 10 both halve. List the rates through the first three decreases. What does the difference A − B do?</p>`,
          a: `<p>(1, 7) → (2, 8) → (3, 9): total 12 &gt; 10, halve: (1.5, 4.5). Then (2.5, 5.5), (3.5, 6.5), (4.5, 7.5): total 12, halve: (2.25, 3.75). Then (3.25, 4.75), (4.25, 5.75): total 10, not over; (5.25, 6.75): halve: (2.625, 3.375). The difference goes 6, 3, 1.5, 0.75: halved at each decrease and unchanged by increases, so the rates converge.</p>`
        }
      ],
      sources: ["pdbook", "rfc9293", "rfc6298", "rfc5681", "jacobson88"]
    },
    {
      id: "nw7",
      title: "The application layer: DNS, HTTP and content delivery",
      minutes: 90,
      summary: "How names become addresses: DNS's hierarchy of servers, recursive and iterative resolution, caching and TTLs, records, and the message format byte by byte. Then HTTP beyond CS 240: message framing, persistent connections and what round trips cost, HTTP/2's multiplexing and HTTP/3 over QUIC, caching with validators, and content delivery networks.",
      notes: `
<p>Applications are where the network meets users. This lesson takes the two application protocols nearly every interaction starts with: DNS, which turns a name like <code>www.example.com</code> into an address, and HTTP, which CS 240 Lesson 6 introduced as requests and responses and which we now follow down onto TCP and QUIC.</p>

<h3>DNS: a distributed database</h3>
<p>People use names; IP needs addresses. The <strong>Domain Name System</strong> (DNS) maps one to the other, and much more. A single server for every name on the internet would be a single point of failure, overwhelmed by traffic and far from most users. DNS is instead a hierarchy, with responsibility delegated down the tree of names.</p>
<ul>
<li>The <strong>root</strong> servers know the servers for each top-level domain. There are 13 root server names, a.root-servers.net to m.root-servers.net, together run as well over a thousand copies around the world (the CDN section explains how).</li>
<li><strong>Top-level domain</strong> (TLD) servers, for <code>.com</code>, <code>.org</code>, <code>.uk</code> and so on, know the servers for each domain under them.</li>
<li><strong>Authoritative</strong> servers, run by an organization or its DNS provider, hold the actual records for its names. A domain such as <code>example.com</code> together with its records is a <em>zone</em>.</li>
</ul>
<p>A host doesn't walk the tree itself. Its <em>stub resolver</em> (part of the operating system) asks a <strong>recursive resolver</strong>, typically run by the ISP or a public service, whose address DHCP supplied (Lesson 3). The recursive resolver does the work with <em>iterative</em> queries: it asks a root server about <code>www.example.com</code>, which answers with a referral, "ask the <code>.com</code> servers, here are their names and addresses"; it asks a <code>.com</code> server, which refers it to <code>example.com</code>'s authoritative servers; it asks one of those, which answers with the address. Then it returns the answer to the host.</p>
<p>That would be three round trips to distant servers for every lookup, but for <strong>caching</strong>. Every record has a <strong>time to live</strong> (TTL) in seconds, chosen by its owner, and resolvers keep answers until it expires. The addresses of the <code>.com</code> servers (TTL two days) are almost always cached, so a typical uncached lookup costs one round trip to the authoritative server, and popular names are answered from the resolver's cache in a few milliseconds. TTLs are a trade-off: long TTLs reduce load and latency, short ones let an owner move a service quickly. Resolvers also cache negative answers ("no such name") for a time the zone specifies.</p>
<p>Each record has a name, a type, a class (always IN, internet), a TTL and data. The common types:</p>
<table>
<tr><th>Type</th><th>Number</th><th>Data</th></tr>
<tr><td>A</td><td>1</td><td>an IPv4 address</td></tr>
<tr><td>NS</td><td>2</td><td>the name of an authoritative server for the zone</td></tr>
<tr><td>CNAME</td><td>5</td><td>the canonical name this name is an alias for</td></tr>
<tr><td>MX</td><td>15</td><td>a mail server for the domain, with a preference number</td></tr>
<tr><td>TXT</td><td>16</td><td>arbitrary text (used for e-mail authentication and domain verification)</td></tr>
<tr><td>AAAA</td><td>28</td><td>an IPv6 address</td></tr>
</table>
<p>A CNAME lets <code>www.studio.com</code> point to <code>edge.cdc.studio.com</code>, and the resolver then looks that name up too; content delivery networks rely on this.</p>

<h3>The DNS message, byte by byte</h3>
<p>DNS queries and responses usually travel in a single UDP datagram each, to port 53 (Lesson 5). Both use one format: a 12-byte header, then four sections: questions, answers, authority records (referrals) and additional records (such as the addresses of the servers in a referral). The header holds six 16-bit big-endian fields:</p>
<table>
<tr><th>Bytes</th><th>Field</th></tr>
<tr><td>0–1</td><td>ID: chosen by the client, copied into the response so it can be matched to its query</td></tr>
<tr><td>2–3</td><td>flags: QR (bit 15: 0 query, 1 response), opcode, AA (authoritative answer), TC (truncated), RD (recursion desired, bit 8), RA (recursion available), and in the low 4 bits the response code (0 no error, 3 no such name)</td></tr>
<tr><td>4–11</td><td>the number of entries in each of the four sections</td></tr>
</table>
<p>A name is written as a sequence of <em>labels</em>, each one length byte followed by that many characters, ending with a zero byte (the root): <code>example.com</code> becomes 7 <code>example</code> 3 <code>com</code> 0. A question is a name, a 16-bit type and a 16-bit class. Python's <code>struct</code> module packs numbers into bytes: in its format strings <code>!</code> means network byte order, which is big-endian, and <code>H</code> is a 16-bit unsigned integer (<code>I</code> would be 32 bits).</p>
<pre><code>import struct

def encode_name(name):
    out = b""
    for label in name.split("."):
        out += bytes([len(label)]) + label.encode("ascii")
    return out + b"\\x00"

def build_query(ident, name, qtype=1):
    header = struct.pack("!HHHHHH", ident, 0x0100, 1, 0, 0, 0)   # RD set; one question
    return header + encode_name(name) + struct.pack("!HH", qtype, 1)

q = build_query(0x1a2b, "example.com")
print(q.hex(" "))
# 1a 2b 01 00 00 01 00 00 00 00 00 00 07 65 78 61 6d 70 6c 65 03 63 6f 6d 00 00 01 00 01
print(len(q))   # 29</code></pre>
<p>A resource record in the answer section is a name, then type (16 bits), class (16), TTL (32), the data's length RDLENGTH (16), and RDLENGTH bytes of data. The response to this query repeats the header (now with flags 0x8180: a response, RD and RA set, no error, and one answer) and the question, then has this answer:</p>
<pre data-label="Hex"><code>c0 0c   00 01   00 01   00 00 0e 10   00 04   5d b8 d8 22</code></pre>
<p>The type is 1 (A), the class 1 (IN), the TTL 0x0e10 = 3,600 seconds, the data 4 bytes long: 0x5d, 0xb8, 0xd8, 0x22 = 93.184.216.34. And the name? The same name appears many times in a response, so DNS uses <strong>compression</strong>: a length byte whose top two bits are both 1 can't be a label (labels are at most 63 bytes), and instead starts a two-byte <em>pointer</em>. Its low 14 bits are an offset from the start of the message where the rest of the name is found. 0xc00c is a pointer to offset 12, where the question's <code>example.com</code> begins. A name may be some labels followed by a pointer, as in a CNAME's data pointing into an earlier name. The first programming problem parses responses like this one; it must also guard against a malicious message whose pointers form a loop.</p>
<p>DNS was designed with no security. An attacker who can guess a query's ID and port can send a forged response that resolvers cache (<em>cache poisoning</em>); resolvers now randomize both. <strong>DNSSEC</strong> lets zones sign their records so resolvers can verify them, and DNS over HTTPS or TLS encrypts the conversation between a host and its resolver, so that the network in between can't see or alter which names you look up.</p>

<h3>HTTP on the wire</h3>
<p>CS 240 Lesson 6 showed HTTP's messages: a request line (method, path, version), headers, a blank line and an optional body; a response with a status line, headers and body. In HTTP/1.1 these are text, with each line ending in CR LF (the bytes 0x0d 0x0a, written <code>\\r\\n</code> in Python), sent over a TCP connection, port 80, or port 443 with TLS for HTTPS (Lesson 8). The <code>Host</code> header is required, because one server address may host many sites.</p>
<p>TCP delivers a byte stream without message boundaries (Lesson 5), so the receiver must find where each message ends. The headers end at the first empty line. The body is framed in one of three ways: a <code>Content-Length</code> header gives its size in bytes; or <code>Transfer-Encoding: chunked</code> sends it in pieces, each preceded by its size in hexadecimal on a line of its own, ending with a piece of size 0, which lets a server start sending before it knows the total; or, in a response with neither, the body runs until the server closes the connection. Some responses never have a body: 204 No Content, 304 Not Modified, and the 1xx informational codes.</p>
<pre data-label="HTTP"><code>HTTP/1.1 200 OK
Content-Type: text/plain
Transfer-Encoding: chunked

4
Wiki
6
pedia
0
</code></pre>
<p>The body is <code>Wikipedia </code> (the second chunk is 6 bytes, ending with a space). The second programming problem parses a stream of such responses.</p>

<h3>Connections and round trips</h3>
<p>A web page is many objects: the HTML, then dozens of stylesheets, scripts and images it refers to. With one TCP connection per object, as in HTTP/1.0, each object costs a handshake RTT and a request RTT. A page with 10 small images and an RTT of 50 ms then takes 11 × 2 × 50 = 1.1 s, even ignoring transmission. HTTP/1.1 made connections <strong>persistent</strong> by default: after a response, the connection stays open for the next request. Then the page costs one handshake plus one RTT per object: (1 + 11) × 50 = 600 ms if requests are sent one at a time. A request can't usefully be sent before the previous response finishes, and a slow response holds up everything behind it: <strong>head-of-line blocking</strong>. So browsers open up to six connections to each server and spread requests across them. Every new connection also pays TCP's slow start (Lesson 6), and, for HTTPS, a TLS handshake: one more RTT with TLS 1.3.</p>
<p><strong>HTTP/2</strong> (2015) keeps HTTP's meaning (methods, status codes, headers) and changes the encoding. Messages become binary <em>frames</em> belonging to numbered <em>streams</em>, and one TCP connection carries many streams at once, interleaving their frames, so many requests can be outstanding together without six connections. Headers are compressed (HPACK), since successive requests repeat most of them. But HTTP/2 still runs on one TCP connection, and TCP delivers bytes in order: one lost segment stalls every stream until it is retransmitted, even streams whose data all arrived. The head-of-line blocking moved down a layer.</p>
<p><strong>HTTP/3</strong> (2022) runs over <strong>QUIC</strong>, a transport protocol built on UDP. QUIC provides reliable streams itself, each delivered in order independently, so a loss stalls only its own stream. It integrates TLS 1.3, so a new connection's transport and encryption handshakes take one RTT together instead of TCP's one plus TLS's one, and a client returning to a server it knows can send its request in the very first packet (0-RTT). Its connections are named by a connection ID instead of addresses and ports, so a phone moving from Wi-Fi to cellular keeps its connections. Being in user space on top of UDP, it can be upgraded with an application instead of an operating system; a large share of traffic from browsers to big sites now uses it.</p>

<h3>Caching</h3>
<p>The fastest request is one that never crosses the network. HTTP responses say how they may be cached. <code>Cache-Control: max-age=3600</code> lets any cache reuse the response for an hour without asking; <code>no-store</code> forbids keeping it; <code>private</code> allows only the user's own browser to keep it. After a response goes stale, a cache can <em>revalidate</em> it cheaply. If the response carried a <strong>validator</strong>, such as an <code>ETag</code> (a version tag chosen by the server, like <code>"v2"</code>) or a <code>Last-Modified</code> date, the cache sends a <em>conditional request</em> with <code>If-None-Match: "v2"</code> or <code>If-Modified-Since</code>. If nothing changed, the server answers <strong>304 Not Modified</strong>, with no body, and the cache serves its copy: one round trip but almost no bytes.</p>

<h3>Content delivery networks</h3>
<p>For a popular site, the remaining cost is distance: RTTs to a far-away origin server. A <strong>content delivery network</strong> (CDN) is a set of caching servers in hundreds of locations, many inside ISPs' networks, that serve a site's content from near each user. Users reach a nearby server in one of two ways. With <em>DNS redirection</em>, the site's name is a CNAME for a name in the CDN's domain, and the CDN's authoritative DNS server answers each resolver with the address of a server close to that resolver. With <strong>anycast</strong>, many servers in different places announce the same IP prefix in BGP (Lesson 4), and each user's packets go to whichever is closest by BGP's routes; the root DNS servers use anycast to run well over a thousand copies under their 13 names.</p>
<p>A CDN's effect is easy to estimate. Suppose 80% of requests hit the edge cache, which is 10 ms away, and the rest go on to the origin, 100 ms away. The average time is 0.8 × 10 + 0.2 × 100 = 28 ms instead of 100, and the origin sees one-fifth of the requests. Video streaming services push this furthest, placing their own servers inside ISPs and filling them overnight with what they expect people to watch.</p>
`,
      terms: [
        ["DNS", "Domain Name System: the distributed, hierarchical database that maps names to addresses and other records."],
        ["Root and TLD servers", "The top levels of DNS: root servers refer queries to top-level domain servers, which refer them to a domain's authoritative servers."],
        ["Authoritative server", "A DNS server that holds the records of a zone itself."],
        ["Recursive resolver", "A DNS server that answers a host's queries by asking other servers iteratively and caching the results."],
        ["TTL (DNS)", "How many seconds a DNS record may be cached."],
        ["CNAME", "A DNS record saying a name is an alias for another (canonical) name."],
        ["Name compression", "A two-byte pointer, marked by its top two bits being 1, to a name earlier in a DNS message."],
        ["Persistent connection", "An HTTP connection kept open for several requests and responses."],
        ["Chunked transfer encoding", "Sending an HTTP body as pieces each preceded by its size in hexadecimal, ending with a zero-size piece."],
        ["Head-of-line blocking", "Later data waiting behind an earlier, delayed request or lost packet."],
        ["HTTP/2", "HTTP with binary frames, many multiplexed streams on one TCP connection and compressed headers."],
        ["QUIC", "A transport protocol on UDP with independent reliable streams, built-in TLS 1.3 and connection IDs; it carries HTTP/3."],
        ["Validator", "A response's ETag or Last-Modified value, which a cache sends back in a conditional request; 304 Not Modified means its copy is current."],
        ["CDN", "Content delivery network: many caching servers placed near users, reached by DNS redirection or anycast."],
        ["Anycast", "Announcing the same IP prefix from many places, so that each packet reaches the nearest one."]
      ],
      quiz: [
        { q: "A recursive resolver with an empty cache looks up www.example.com. Which servers does it ask, in order?", choices: ["The authoritative server only", "A root server, a .com server, then example.com's authoritative server", "The .com server, then the root", "Every server in the hierarchy at once"], answer: 1, why: "Each referral points one level down the tree." },
        { q: "In a DNS message, what does the byte 0xC0 at the start of a name mean?", choices: ["A label of 192 characters", "The start of a two-byte compression pointer", "The end of the name", "An error"], answer: 1, why: "Both top bits set marks a pointer; labels are at most 63 bytes, so it can't be a length." },
        { q: "How is example.com encoded as a DNS name?", choices: ["\"example.com\" followed by 0", "7 example 3 com 0", "11 example.com", "example 0 com 0"], answer: 1, why: "Each label is preceded by its length, and a zero byte ends the name." },
        { q: "A response has neither Content-Length nor Transfer-Encoding, and its status is 200. Where does its body end?", choices: ["At the next blank line", "After 512 bytes", "When the server closes the connection", "It has no body"], answer: 2, why: "That is HTTP/1.1's third framing rule, which is why it can't be followed by another response." },
        { q: "Why does HTTP/3 avoid the head-of-line blocking that HTTP/2 suffers after a packet loss?", choices: ["It sends fewer packets", "QUIC delivers each stream in order independently, so a loss stalls only its own stream", "It uses TCP with bigger windows", "It disables encryption"], answer: 1, why: "HTTP/2's streams share one TCP byte stream; QUIC's don't." },
        { q: "A cache sends If-None-Match: \"v7\" and the resource hasn't changed. What does the server send?", choices: ["200 with the full body", "304 Not Modified with no body", "404", "412 Precondition Failed"], answer: 1, why: "A matching validator means the cached copy is still good." }
      ],
      practice: [
        {
          q: `<p>Decode this DNS query by hand: <code>ab cd 01 00 00 01 00 00 00 00 00 00 03 77 77 77 02 63 73 03 65 64 75 00 00 1c 00 01</code>. Give the ID, which flags are set, the name and the query type.</p>`,
          hint: `<p>0x77 is the letter w, 0x63 is c and 0x1c is 28.</p>`,
          a: `<p>ID 0xabcd. Flags 0x0100: a query (QR = 0) with recursion desired. One question. Name: 3 "www", 2 "cs", 3 "edu", 0: <code>www.cs.edu</code>. Type 0x001c = 28, AAAA (an IPv6 address), class 1.</p>
<pre><code>print(bytes.fromhex("777777"), bytes.fromhex("6373"), bytes.fromhex("656475"))   # b'www' b'cs' b'edu'</code></pre>`
        },
        {
          q: `<p>A page's HTML refers to 8 images on the same server. The RTT is 40 ms; ignore transmission time. How long does the whole page take with (a) a new TCP connection per object, one at a time; (b) one persistent connection, one request at a time; (c) one HTTP/2 connection with all 8 image requests sent at once after the HTML arrives? Add the TLS 1.3 handshake to each connection in (d) for case (b).</p>`,
          a: `<p>(a) 9 objects × (1 handshake + 1 request) RTT = 18 × 40 = 720 ms. (b) 1 handshake + 9 requests = 10 RTT = 400 ms. (c) handshake, HTML, then one RTT for all 8 images: 3 RTT = 120 ms. (d) TLS 1.3 adds one RTT to the one connection: 11 RTT = 440 ms.</p>`
        },
        {
          q: `<p>Your company's site has a DNS record with a TTL of 86,400 seconds. You must move the site to a new address with as little disruption as possible. Explain what goes wrong if you just change the record, and give a better plan.</p>`,
          a: `<p>Resolvers that cached the old record may keep using it for up to a day, sending users to the old address. Better: a day or more ahead, lower the TTL to, say, 300 seconds; wait for the old long TTL to expire everywhere; then change the address, so caches pick up the new one within 5 minutes; keep the old server running (or redirecting) for a while; then raise the TTL again.</p>`
        },
        {
          q: `<p>A CDN edge server is 15 ms from users and the origin is 120 ms away. (a) What hit ratio gives an average latency of 40 ms? (b) The site gets 5,000 requests a second. How many reach the origin at that hit ratio, and how many at a 95% hit ratio?</p>`,
          a: `<p>(a) <em>h</em> × 15 + (1 − <em>h</em>) × 120 = 40 gives 120 − 105<em>h</em> = 40, so <em>h</em> = 80/105 ≈ 0.762. (b) At 76.2%, about 5,000 × 0.238 ≈ 1,190 requests a second reach the origin; at 95%, 250. Going from 76% to 95% hits cuts the origin's load almost fivefold.</p>`
        }
      ],
      sources: ["pdbook", "rfc1035", "rfc9110", "rfc9000"]
    },
    {
      id: "nw8",
      title: "Networks in practice",
      minutes: 90,
      summary: "What happens in real networks: large buffers and bufferbloat, and active queue management; measuring paths with ping and traceroute (and what TTL has to do with it); how datacenter networks are built from fat trees and ECMP; and security at the network level: attacks, where TLS fits, firewalls and denial of service, with the cryptography left to CS 380.",
      notes: `
<p>The previous lessons built the internet's mechanisms one layer at a time. This one looks at the whole system as engineers meet it: why your video call stutters when someone uploads a file, how to see the path your packets take, how the networks inside datacenters differ from the internet, and how networks are attacked and defended.</p>

<h3>Queues and bufferbloat</h3>
<p>Lesson 1 showed that queueing delay grows as a link's load approaches its capacity. A router or modem's buffer decides how long the queue can get, and the delay it adds is easy to compute: a backlog of <em>B</em> bits ahead of a packet on a link of rate <em>R</em> takes <em>B</em>/<em>R</em> to drain. A home modem with a 10 Mb/s upload link and 1 MB of buffer can hold 8 × 10<sup>6</sup> / 10<sup>7</sup> = 0.8 s of queue.</p>
<p>That queue fills, because of how TCP works. Loss-based congestion control (Lesson 6) keeps raising cwnd until a packet is dropped, and with drop-tail queueing (Lesson 1's programming problem) nothing is dropped until the buffer is full. So a single upload keeps the modem's buffer nearly full, and every packet through it, including your video call's and your game's, waits 0.8 s. Large buffers were added in good faith, because memory was cheap and dropping packets seemed bad; the resulting high, variable latency was named <strong>bufferbloat</strong> by Jim Gettys in 2010.</p>
<p>How big should a buffer be? It must be big enough that the link stays busy while TCP recovers from a loss. Take a single long flow on a link of capacity <em>C</em>, with RTT the round-trip time when the queue is empty and a buffer of <em>B</em> bits. The flow loses a packet when its window fills both the path and the buffer: <em>W</em> = <em>C</em> · RTT + <em>B</em>. It then halves its window, and the link stays busy only if the halved window still fills the path: <em>W</em>/2 ≥ <em>C</em> · RTT. Putting the two together, (<em>C</em> · RTT + <em>B</em>)/2 ≥ <em>C</em> · RTT, so <em>B</em> ≥ <em>C</em> · RTT: the buffer must hold a bandwidth-delay product. That was the long-standing rule of thumb. With many flows whose sawtooths aren't synchronized, the total varies much less, and <em>C</em> · RTT / √<em>n</em> suffices for <em>n</em> flows (Appenzeller, Keslassy and McKeown, 2004). A backbone link of 100 Gb/s with RTTs of 250 ms and 10,000 flows needs 10<sup>11</sup> × 0.25 / 100 bits ≈ 31 MB instead of 3.1 GB.</p>
<p>The other fix is to make the queue smarter: <strong>active queue management</strong> (AQM) drops or ECN-marks (Lesson 6) packets <em>before</em> the buffer is full, to tell senders to slow down while the queue is still short. RED (random early detection, 1993) dropped with a probability rising with the average queue length, but was hard to tune. <strong>CoDel</strong> (Nichols and Jacobson, 2012) measures how long each packet waited in the queue, and starts dropping when even the shortest wait over the past 100 ms exceeds a 5 ms target: a queue that never empties is a "standing" queue, which adds delay and no throughput. Combined with a separate queue per flow, served in turn (FQ-CoDel), it keeps an upload from delaying a video call; it is the default queueing discipline in many Linux distributions and runs in many home routers.</p>

<h3>Measuring: ping</h3>
<p>The network layer has a helper protocol for errors and diagnostics, <strong>ICMP</strong> (Internet Control Message Protocol), carried inside IP datagrams with protocol number 1. Its messages include <em>echo request</em> and <em>echo reply</em>, <em>destination unreachable</em> (for example, "port unreachable" from a host with no socket on that UDP port), <em>time exceeded</em> (TTL reached 0, Lesson 3) and "fragmentation needed". The <code>ping</code> tool sends echo requests and times the replies. The output below, and the traceroute output later in this lesson, is illustrative: written for this lesson to show typical results, not captured from a real network. Its addresses come from ranges reserved for documentation.</p>
<pre data-label="Illustrative output"><code>$ ping -c 3 example.net
PING example.net (203.0.113.10): 56 data bytes
64 bytes from 203.0.113.10: icmp_seq=0 ttl=52 time=71.8 ms
64 bytes from 203.0.113.10: icmp_seq=1 ttl=52 time=70.9 ms
64 bytes from 203.0.113.10: icmp_seq=2 ttl=55 time=93.4 ms
--- example.net ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 70.9/78.7/93.4/10.4 ms</code></pre>
<p>The RTT bounds the distance: a signal covers at most 2 × 10<sup>8</sup> m/s in fibre, so a 70.9 ms RTT means the server is at most 0.0709 / 2 × 2 × 10<sup>8</sup> ≈ 7,100 km away by cable, and real cables don't run straight. The variation between samples is queueing. The <code>ttl</code> in each reply is what remained of the reply's TTL on arrival; senders usually start at 64, so 52 suggests 12 routers on the way back, and the change to 55 hints that the third reply took a different path.</p>

<h3>Measuring: traceroute</h3>
<p><code>traceroute</code> shows the routers on a path, using nothing but the TTL. It sends a probe with TTL 1: the first router decreases it to 0, discards the probe and sends back an ICMP time exceeded message, whose source address is that router's. Then TTL 2, which the second router answers, and so on. The Unix version sends UDP probes to an unlikely high port, so when a probe finally reaches the destination, the destination answers "port unreachable", and traceroute knows it has arrived. It sends three probes per TTL and prints each RTT. Here is illustrative output (made up, like the ping output above):</p>
<pre data-label="Illustrative output"><code>$ traceroute example.net
traceroute to example.net (203.0.113.10), 30 hops max, 60 byte packets
 1  192.168.1.1     1.2 ms   1.0 ms   1.1 ms
 2  198.51.100.1    8.9 ms   9.4 ms   8.7 ms
 3  198.51.100.45  10.2 ms  10.5 ms  11.0 ms
 4  * * *
 5  192.0.2.17     12.8 ms  12.4 ms  12.9 ms
 6  192.0.2.130    70.3 ms  70.1 ms  70.8 ms
 7  203.0.113.10   71.5 ms  71.2 ms  71.9 ms</code></pre>
<p>Hop 1 is the home router; hop 2's 8 ms is the access link (queues and the modem); hop 4 didn't answer (many routers ignore probes or limit how many ICMP messages they send, which is why the first programming problem has silent routers); and the jump from 13 to 70 ms at hop 6 is a long cable, probably across an ocean. Read traceroute output with care. Each line is a different probe, and with ECMP (below) successive probes may take different paths. The time is the round trip <em>to that router and back</em>, and the way back may be a different path (Lesson 4's hot-potato routing). And a router generates ICMP messages in slow software, so one hop's time can be higher than the next one's.</p>

<h3>Datacenter networks</h3>
<p>A large datacenter holds hundreds of thousands of servers, and much of its traffic is between servers inside it: a web request fans out to hundreds of machines that each hold part of an index, and data-processing jobs shuffle terabytes. Servers sit in racks of about 40, connected to a <em>top-of-rack</em> switch. The classic design joined racks in a tree, with ever bigger and more expensive switches towards the root. Its links near the root were <em>oversubscribed</em>: if the racks could together send 10 times what the upper links carry, servers in different racks get a tenth of their link's speed.</p>
<p>Modern datacenters instead use <strong>Clos networks</strong>, also called <em>leaf-spine</em> or <strong>fat-tree</strong> topologies, built from many identical cheap switches. In the fat tree of Al-Fares, Loukissas and Vahdat (2008), switches with <em>k</em> ports are arranged in <em>k</em> pods. Each pod has <em>k</em>/2 edge switches, each connecting <em>k</em>/2 servers and <em>k</em>/2 aggregation switches in the pod; the (<em>k</em>/2)<sup>2</sup> core switches form <em>k</em>/2 groups of <em>k</em>/2, and the <em>i</em>-th aggregation switch of every pod connects to all <em>k</em>/2 core switches of group <em>i</em>. So each core switch uses its <em>k</em> ports for one link to each pod, and from a core switch there is exactly one way down into any given pod. That supports <em>k</em><sup>3</sup>/4 servers, 27,648 with 48-port switches, and any half of the servers can send to the other half at full speed (full <em>bisection bandwidth</em>), because there are many equal-cost paths between any two racks.</p>
<p>Using all those paths takes <strong>ECMP</strong> (equal-cost multipath): a switch with several equally good next hops chooses one by hashing the packet's <em>five-tuple</em>, its source and destination addresses and ports and its protocol. Every packet of a connection hashes the same way, so it stays on one path and arrives in order (TCP would mistake reordering for loss), while different connections spread across all paths. Datacenter RTTs are tens of microseconds, so bandwidth-delay products are small and switch buffers shallow. When hundreds of servers answer one request at the same moment, their replies overflow the buffer of the requester's switch port: <em>incast</em>. Datacenter TCP variants such as DCTCP use ECN marks to react to queues before they overflow.</p>

<h3>Network security</h3>
<p>The internet was designed among trusting researchers, and its protocols authenticate almost nothing. Anyone on the path can read and alter packets. A host can put any source address in an IP header (<em>spoofing</em>). Lesson 4 showed that BGP believes what it hears, and Lesson 7 that DNS answers can be forged. The main threats at the network level:</p>
<ul>
<li><strong>Eavesdropping</strong>: reading traffic, for example on open Wi-Fi or at an ISP.</li>
<li><strong>Tampering and impersonation</strong>: changing packets, or pretending to be a server, for example by poisoning DNS or hijacking a prefix.</li>
<li><strong>Denial of service</strong> (DoS): flooding a target so that legitimate users can't get through. A <em>SYN flood</em> sends SYNs from spoofed addresses so that the server fills its memory with half-open connections; <em>SYN cookies</em> defend against it by encoding the connection's state in the server's initial sequence number, so the server stores nothing until the final ACK proves the client is real. A <em>reflection</em> attack sends small requests with the victim's address as the source to servers that send large replies; a 60-byte DNS query that brings back a 3,000-byte answer amplifies the attacker's traffic 50 times. A distributed DoS (DDoS) does this from thousands of compromised machines at once.</li>
</ul>
<p><strong>TLS</strong> (Transport Layer Security) is the standard answer to the first two. It runs on top of TCP, beneath the application: HTTPS is HTTP over TLS over TCP, and QUIC builds TLS 1.3 into the transport (Lesson 7). TLS gives a connection <em>confidentiality</em> (eavesdroppers see only ciphertext), <em>integrity</em> (any change is detected) and <em>authentication</em> of the server, which proves its identity with a certificate signed by an authority the client trusts. Its handshake agrees on fresh keys in one round trip in TLS 1.3. How the encryption, signatures and key agreement work, and how they fail, is the subject of CS 380. Note also what TLS leaves visible: the IP addresses and ports, the sizes and timing of packets, and usually the name of the site, which the client sends in the clear in its first message (Encrypted Client Hello is a recent extension that hides it). End-to-end encryption protects the content, not the fact of communication.</p>
<p>A <strong>firewall</strong> enforces a policy on which packets may pass between networks. A <em>packet filter</em> checks each packet's header fields (addresses, protocol, ports) against an ordered list of rules, and the first match decides, with a final rule that denies everything else (<em>default deny</em>). A <em>stateful</em> firewall also remembers connections that were allowed, so that their replies are let back in without a rule for every possible reply. For a small office:</p>
<table>
<tr><th>#</th><th>Action</th><th>Protocol</th><th>Source</th><th>Destination</th><th>Destination port</th></tr>
<tr><td>1</td><td>allow</td><td>TCP</td><td>any</td><td>203.0.113.80/32 (web server)</td><td>443</td></tr>
<tr><td>2</td><td>allow</td><td>any</td><td>10.0.0.0/8 (inside)</td><td>any</td><td>any</td></tr>
<tr><td>3</td><td>deny</td><td>any</td><td>any</td><td>any</td><td>any</td></tr>
</table>
<p>Outsiders reach only the web server's HTTPS port; insiders may start connections to anywhere, and the stateful firewall lets the replies in. The second programming problem builds this. Firewalls are one layer of defence, not a perimeter that makes the inside safe: a laptop infected elsewhere carries its attacker inside, and many organizations now authenticate and encrypt every connection even between their own machines ("zero trust"). A <em>VPN</em> (virtual private network) is the reverse tool: it wraps a remote machine's packets in an encrypted tunnel to a trusted network, so they appear to come from inside it.</p>
<p>Finally, a point of practice and law. Probing networks you don't own, even with ping and traceroute in bulk, and certainly scanning for open ports or sending floods, can break laws on computer misuse and the policies of your ISP and university. Measure your own networks, or with permission.</p>
`,
      terms: [
        ["Bufferbloat", "Excessive delay caused by large, full buffers in the network, because loss-based TCP fills them."],
        ["Active queue management", "Dropping or marking packets before a buffer is full, to keep queues short; RED and CoDel are examples."],
        ["CoDel", "An AQM that drops when the minimum time packets spend in the queue over 100 ms exceeds a 5 ms target."],
        ["ICMP", "Internet Control Message Protocol: IP's error and diagnostic messages, such as echo, time exceeded and destination unreachable."],
        ["ping", "A tool that sends ICMP echo requests and reports the round-trip times of the replies."],
        ["traceroute", "A tool that finds the routers on a path by sending probes with TTL 1, 2, 3, … and collecting the time exceeded messages."],
        ["Fat tree (Clos network)", "A datacenter topology of many identical switches with many equal-cost paths, giving full bisection bandwidth."],
        ["Oversubscription", "The ratio of the traffic hosts could send to the capacity of the links above them."],
        ["ECMP", "Equal-cost multipath: spreading flows over equally good paths by hashing their five-tuple."],
        ["Denial of service", "Making a service unavailable, usually by flooding it with traffic or requests."],
        ["Reflection and amplification", "Sending small spoofed requests that make servers send large replies to a victim."],
        ["TLS", "Transport Layer Security: encryption, integrity and server authentication for a connection, between the transport and application layers."],
        ["Firewall", "A device or program that allows or denies packets according to rules; a stateful one also tracks connections."],
        ["Default deny", "A policy whose last rule denies anything not explicitly allowed."]
      ],
      quiz: [
        { q: "A cable modem's 20 Mb/s uplink has a 2.5 MB buffer that an upload keeps full. How much delay does it add to a game's packets?", choices: ["12.5 ms", "125 ms", "1 s", "8 s"], answer: 2, why: "2.5 × 8 = 20 Mb of backlog / 20 Mb/s = 1 s." },
        { q: "What does CoDel react to?", choices: ["The buffer being full", "Packets' time in the queue staying above a target for an interval", "The number of flows", "Packet sizes"], answer: 1, why: "A queue whose minimum waiting time stays above 5 ms for 100 ms is a standing queue, so CoDel starts dropping." },
        { q: "How does traceroute learn the address of the third router on a path?", choices: ["It asks DNS", "It sends a probe with TTL 3; that router replies with ICMP time exceeded", "The router's address is in the destination's reply", "It reads the IP options of the reply"], answer: 1, why: "The router that decreases the TTL to 0 reports it, from its own address." },
        { q: "Why do datacenter switches pick among equal-cost paths by hashing the five-tuple rather than sending each packet on a random path?", choices: ["Hashing is faster to compute than a random number", "To keep a connection's packets on one path, in order", "To balance traffic exactly evenly", "Because TCP requires a single path"], answer: 1, why: "Reordering would trigger duplicate ACKs and spurious retransmissions." },
        { q: "Which of these does TLS hide from someone watching the network?", choices: ["The server's IP address", "The size of each packet", "The content of the HTTP requests", "The port number"], answer: 2, why: "TLS encrypts the application's data; addresses, ports, sizes and timing remain visible." },
        { q: "A firewall's rules are: 1 allow TCP to 10.0.0.5 port 22 from 192.0.2.0/24; 2 deny TCP to port 22 from anywhere; 3 allow everything else. A packet from 192.0.2.9 to 10.0.0.5 port 22 arrives. What happens?", choices: ["Denied by rule 2", "Allowed by rule 1", "Allowed by rule 3", "Denied by default"], answer: 1, why: "The first matching rule decides, and rule 1 matches." }
      ],
      practice: [
        {
          q: `<p>A home has a 50 Mb/s downlink with a 400 KB buffer at the ISP's end and a 5 Mb/s uplink with a 400 KB buffer in the modem. (a) What is the worst-case queueing delay in each direction? (b) While someone uploads a large video, a video call sends packets both ways. Which direction hurts, and roughly what RTT will the call see if the base RTT is 30 ms? (c) What would FQ-CoDel change?</p>`,
          a: `<p>(a) 400 KB = 3.2 Mb: 3.2 / 50 = 64 ms down, 3.2 / 5 = 640 ms up. (b) The upload fills the uplink buffer, so the call's outgoing packets wait about 640 ms: RTT ≈ 670 ms, which makes conversation nearly impossible. (c) FQ-CoDel gives the call's flow its own queue, served in turn with the upload's, so the call's packets barely wait; and it drops the upload's packets once its queue's delay stays above 5 ms, so TCP keeps that queue short. The upload still gets nearly all the spare capacity.</p>`
        },
        {
          q: `<p>Look at the notes' traceroute output. (a) Between which hops is there a long-distance link, and at most how far could it be? (b) Hop 4 printed <code>* * *</code>. Was the packet lost there? (c) Could hop 5 have shown a <em>higher</em> RTT than hop 6? Why?</p>`,
          a: `<p>(a) Hops 5 to 6: the RTT jumps by about 57.5 ms, so at most 0.0575 / 2 × 2 × 10<sup>8</sup> ≈ 5,750 km of fibre, one way. (b) No: hops 5 to 7 answered, so probes passed through hop 4; that router just didn't send time exceeded messages (or rate-limited them). (c) Yes. Generating ICMP is slow-path work for a router, and the reply may return by a different, longer path, so a hop's time isn't always less than the next hop's.</p>`
        },
        {
          q: `<p>A fat tree is built from 32-port switches. (a) How many servers does it support, how many pods, and how many switches of each kind (edge, aggregation, core)? (b) Two servers in different pods: how many shortest paths join them?</p>`,
          a: `<p>(a) <em>k</em> = 32: <em>k</em><sup>3</sup>/4 = 8,192 servers in 32 pods. Each pod has 16 edge and 16 aggregation switches: 512 of each, and (<em>k</em>/2)<sup>2</sup> = 256 core switches: 1,280 switches in all, all identical. (b) The path goes edge → one of 16 aggregation switches in its pod → one of 16 core switches attached to that aggregation switch → down through that core switch's one link into the other pod, to the aggregation switch there that leads to the destination's edge switch: 16 × 16 = (<em>k</em>/2)<sup>2</sup> = 256 paths, one through each core switch.</p>`
        },
        {
          q: `<p>An attacker controls 1,000 machines, each with a 10 Mb/s upload, and finds open DNS resolvers that answer a 64-byte query with a 3,200-byte response. (a) What is the amplification factor, and what traffic could they aim at a victim? (b) Why does this attack need the resolvers to accept spoofed source addresses, and what can networks do about it?</p>`,
          a: `<p>(a) 3,200 / 64 = 50. The machines send 1,000 × 10 Mb/s = 10 Gb/s of queries, which become 500 Gb/s of responses at the victim. (b) The responses go to the query's source address, so the attacker writes the victim's address there. Defences: ISPs drop outgoing packets whose source address isn't one of their own customers' (<em>ingress filtering</em>, BCP 38); resolvers answer only their own users and limit response rates; victims buy capacity from DDoS-scrubbing services that absorb and filter the flood.</p>`
        }
      ],
      sources: ["pdbook", "bufferbloat11", "alfares08", "manpages"]
    }
  ]
});

CSA.addAsides("cs330", {
  nw1: [
    { kind: "history", title: "A network of networks, and the end-to-end argument", html: `<p>By the early 1970s ARPANET worked, but it was one network, and others were appearing: packet radio, satellite links, networks in Europe. In May 1974 Vint Cerf and Bob Kahn published "A Protocol for Packet Network Intercommunication", which proposed connecting dissimilar networks through <em>gateways</em> (today's routers) that knew nothing about the hosts' conversations, with the hosts themselves responsible for retransmission, ordering and flow control. Their single protocol was later split in two, around 1978: IP, the minimal datagram service every network could carry, and TCP, the reliable stream on top, so that applications such as voice that didn't want reliability could use IP directly (through UDP). On 1 January 1983, a planned "flag day", ARPANET switched from its old protocol to TCP/IP, and the internet in today's sense began.</p><p>In 1984 Jerome Saltzer, David Reed and David Clark gave the design philosophy a name in "End-to-End Arguments in System Design". Their example is a careful file transfer: even if every link checks and retransmits, the file can still be damaged by a bug in a router's memory or in the receiving host, so the end hosts must check the file anyway. A function can be implemented completely and correctly only with the knowledge of the applications at the ends; doing it in the network as well is at most a performance optimization. This is why Lesson 2's link-layer checks discard bad frames without trying to guarantee delivery, and why TCP, not IP, provides reliability.</p>`, sources: ["cerfkahn74", "saltzer84"] }
  ],
  nw4: [
    { kind: "practice", title: "How Pakistan took YouTube off the internet", html: `<p>On 24 February 2008, Pakistan's government ordered the country's ISPs to block YouTube. Pakistan Telecom (AS17557) did it by announcing in BGP the prefix 208.65.153.0/24, which contains YouTube's servers, so that traffic for them would go to a dead end inside Pakistan. The announcement was meant to stay inside the country, but it leaked to Pakistan Telecom's provider, PCCW Global (AS3491), which passed it on, and within minutes routers around the world had heard it. YouTube itself announced 208.65.152.0/22, and a /24 is more specific than a /22, so by longest-prefix match (Lesson 3) most of the internet's traffic for YouTube went to Pakistan. YouTube's engineers fought back by announcing the same /24 and then two even more specific /25s, which won by the same rule, and after about two hours PCCW stopped accepting the bogus route. The RIPE NCC's analysis, using BGP data collected at exchange points around the world, showed the whole sequence minute by minute. Nothing in BGP had checked that Pakistan Telecom had any right to the prefix: providers were expected to filter what their customers announce, and PCCW hadn't. Filtering and, more recently, the RPKI's signed route origins exist to stop exactly this.</p>`, sources: ["ripe08"] }
  ],
  nw6: [
    { kind: "history", title: "The congestion collapse of 1986", html: `<p>In October 1986 the link between Lawrence Berkeley Laboratory and UC Berkeley, sites about 400 yards apart, saw its throughput fall from 32 kb/s to 40 b/s: a factor of nearly a thousand. The cause was TCP itself. Senders started each connection by sending a full window at once, and retransmitted on timeouts computed from a crude RTT estimate that ignored its variance, so as queues grew, timers fired early and the network filled with copies of packets that weren't lost. Van Jacobson and Michael Karels worked out why and what to do, and their 1988 paper "Congestion Avoidance and Control" introduced slow start, additive-increase multiplicative-decrease congestion avoidance, RTT variance in the timeout (the RTTVAR of RFC 6298), Karn's rule and exponential backoff of the timer, changes first shipped in the BSD Unix kernel in 1988. Their insight was that a sender should obey a "conservation of packets" principle: in equilibrium, put a new packet into the network only when an old one leaves it, which the arrival of ACKs signals. Almost every TCP since descends from that code.</p>`, sources: ["jacobson88"] }
  ],
  nw8: [
    { kind: "ethics", title: "Surveillance, encryption and who the network serves", html: `<p>In 2013, documents leaked by Edward Snowden described intelligence agencies collecting internet traffic in bulk, including by tapping fibre-optic cables and the links between companies' datacenters. The Internet Engineering Task Force, which writes the internet's protocol standards, responded in 2014 with RFC 7258, "Pervasive Monitoring Is an Attack": large-scale monitoring is a technical attack on users' privacy, whoever carries it out, and protocol designers should design to resist it. Since then, encryption has become the default. Free, automated certificates from Let's Encrypt (2015) removed the cost of HTTPS, browsers began warning about unencrypted pages, and QUIC (Lesson 7) encrypts even most of its transport headers. Encryption by default has costs and opponents. Network operators lose visibility they used for troubleshooting and for detecting attacks; schools and companies that filter content must intercept TLS on their own devices; and governments argue that it lets criminals hide. A related debate concerns <em>network neutrality</em>, the principle that ISPs should not block, slow down or charge extra for particular sites or applications; its rules have been adopted and repealed several times in different countries. Both debates ask the same question that BGP's policies and CDN placement answer quietly every day: whose interests does the network serve, and who decides? Consider what principles from CS 100 Lesson 3 you would use to weigh them.</p>`, sources: ["rfc7258"] }
  ]
});
