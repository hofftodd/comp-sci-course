CSA.addCourse({
  id: "cs410",
  code: "CS 410",
  title: "Distributed Systems",
  credits: 4,
  kind: "required",
  term: "y4f",
  summary: "How many computers act as one when messages are lost and delayed, clocks disagree and machines fail independently: partial failure and remote calls, logical time and causal order, replication and its anomalies, consensus with Raft and Paxos, linearizability and the CAP theorem, partitioning and distributed transactions, batch and stream processing, and the engineering that keeps real services available. Every graded problem is a deterministic Python simulation of a real mechanism, with networks, crashes and partitions driven by explicit event lists or seeded schedulers.",
  prereqs: ["CS 330 Computer Networks", "CS 310 Operating Systems", "CS 340 Databases", "CS 201 Data Structures", "MATH 230 Probability and Statistics"],
  outcomes: [
    "Explain partial failure, the two generals problem and the standard system models, and use them to say what an algorithm may assume",
    "Design remote calls with the right failure semantics, using idempotency and deduplication for exactly-once effects",
    "Order events with Lamport and vector clocks, detect concurrency, and implement causal delivery",
    "Compare leader–follower, multi-leader and leaderless replication, reason about quorums and replication lag, and resolve conflicts with CRDTs",
    "State the consensus problem and FLP, and trace Raft's elections, log replication and commit rule step by step",
    "Distinguish linearizability from serializability, check small histories, use leases with fencing tokens, and state CAP and PACELC precisely",
    "Partition data with consistent hashing, run two-phase commit and explain why it blocks, and design sagas",
    "Explain how MapReduce, dataflow and stream processors survive failures, and compute windowed results with watermarks",
    "Apply failure detection, backoff, circuit breakers, hedging, gossip and observability to keep services reliable"
  ],
  rubric: {
    criteriaFor: "problem sets and projects",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 25, desc: "Weekly: the lesson's programming problems, plus written exercises such as vector-clock traces, quorum arguments, Raft log repairs and linearizability checks." },
      { name: "Projects", weight: 30, desc: "Three projects, built and tested against a simulated network that loses, delays and reorders messages and crashes nodes: a fault-tolerant key-value store replicated with Raft; a sharded store with consistent hashing and two-phase commit across shards; and a stream processor with event-time windows and checkpoint recovery." },
      { name: "Midterm exam", weight: 15, desc: "Failure, time, replication and consensus (lessons 1–4)." },
      { name: "Final exam", weight: 20, desc: "Cumulative, with emphasis on consistency models, partitioning, data processing and reliability (lessons 5–8)." }
    ],
    criteria: [
      { name: "Correctness", desc: "Is it safe and live under failures?", levels: [
        "Never violates safety under any tested schedule of delays, losses, partitions and crashes, and makes progress whenever a majority can communicate.",
        "Safe in all tested schedules, but stalls in some it should survive.",
        "Works only when no messages are lost and no node fails.",
        "Doesn't work." ] },
      { name: "Design", desc: "Is it simple and well structured?", levels: [
        "Clear state machines and message handlers, state persisted exactly where the protocol requires, no needless complexity.",
        "Sound, with some redundancy or unclear state.",
        "Works but is hard to follow, or mixes protocol logic with simulation details.",
        "No discernible structure." ] },
      { name: "Analysis", desc: "Is the reasoning about correctness and cost explained?", levels: [
        "States the invariants that make it safe and argues why each holds, and gives message counts, round trips and measured latencies.",
        "Mostly correct reasoning, with gaps.",
        "Claims without reasons.",
        "No analysis." ] },
      { name: "Presentation", desc: "Can a reader follow it?", levels: [
        "Readable code, and a write-up with message diagrams or traces where they help.",
        "Mostly clear.",
        "Hard to follow.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Tools:</b> projects use Python 3 with a provided deterministic network simulator, so every failure you find can be replayed from its seed; you may also use Go, as many real systems do. The graded problems on this site use Python, which runs in your browser.",
      "<b>Collaboration:</b> discuss ideas freely; write your own code and name your collaborators. Distributed bugs are easy to copy and hard to explain, so projects include short oral checks in which you explain a failing trace.",
      "<b>AI assistants:</b> you may use them to explain concepts and error messages, and must say how. Code you submit must be your own, and you must be able to explain every line.",
      "<b>Late work:</b> four late days for projects, used in whole days; then 10% a day."
    ]
  },
  units: [
    {
      id: "di1",
      title: "Why distributed systems are hard",
      minutes: 90,
      summary: "What a distributed system is and why we build them; partial failure and why a missing reply can mean six different things; the two generals problem; the latency numbers every design starts from; system models (synchronous, partially synchronous and asynchronous; crash-stop, crash-recovery and Byzantine faults); and remote procedure calls with their failure semantics: at-most-once, at-least-once, and exactly-once effects through idempotency and deduplication.",
      notes: `
<p>A <strong>distributed system</strong> is a set of computers that cooperate on one job and can communicate only by sending messages over a network. A web search, a bank's payment system, a multiplayer game and the database behind a phone app are all distributed systems. CS 330 taught you how a message gets from one machine to another; CS 310 taught you what happens inside one machine; CS 340 Lesson 8 introduced replication, partitioning and the CAP theorem in a paragraph each. This course is about the problems that appear when the pieces are on different machines, and the algorithms that solve them.</p>

<h3>Why distribute at all?</h3>
<p>A single computer is simpler in every way, so we distribute only for reasons a single computer can't meet:</p>
<ul>
<li><strong>Scale.</strong> The data or the work doesn't fit on one machine. A search index of the web is far larger than one machine's disks, and a popular service gets more requests per second than one machine can answer.</li>
<li><strong>Fault tolerance.</strong> One machine eventually fails: a disk dies, the power supply burns out, someone trips over a cable. If copies of the data and the service run on several machines, the system can keep going when one of them stops.</li>
<li><strong>Latency.</strong> Light takes time to cross the planet (below), so a user in Sydney is served faster by a machine in Sydney than by one in Virginia.</li>
<li><strong>Inherent distribution.</strong> Some jobs are distributed by nature: phones talking to each other, a bank and a shop settling a payment.</li>
</ul>
<p>The price is that the machines must agree about things (who holds the lock, what the latest value is, whether a payment happened) while talking over a network that loses and delays messages, and while some of them may have crashed. That is the whole subject.</p>

<h3>Partial failure</h3>
<p>On one computer, failures are usually total. If the kernel panics or the power goes out, every process stops together (CS 310), and when the machine restarts, everything restarts. In a distributed system, one machine can crash while the others carry on, one network link can fail while others work, and a machine can be slow without being dead. This is <strong>partial failure</strong>, and it is what makes distributed programming different from ordinary programming.</p>
<p>The central difficulty is that a node can learn about another node only through messages. Suppose a client sends a request to a server and no reply comes. The client cannot tell which of these happened:</p>
<figure class="fig"><svg viewBox="0 0 490 230" width="490" role="img" aria-label="Six timelines between a client and a server. 1: the request is lost. 2: the request waits in a queue. 3: the server crashed before handling it. 4: the server is paused, for example by garbage collection. 5: the server handled it and the reply is lost. 6: the reply is delayed.">
<g class="text">
<text x="10" y="24" class="m">1. request lost</text>
<text x="10" y="60" class="m">2. request delayed in a queue</text>
<text x="10" y="96" class="m">3. server crashed before handling it</text>
<text x="10" y="132" class="m">4. server paused (say, garbage collection)</text>
<text x="10" y="168" class="m">5. handled; the reply is lost</text>
<text x="10" y="204" class="m">6. handled; the reply is delayed</text>
<text x="300" y="14" class="m" text-anchor="middle">client</text><text x="440" y="14" class="m" text-anchor="middle">server</text>
</g>
<g class="ln">
<line x1="300" y1="20" x2="300" y2="220"/><line x1="440" y1="20" x2="440" y2="220"/>
<line x1="300" y1="24" x2="360" y2="30"/>
<line x1="300" y1="56" x2="400" y2="64"/>
<line x1="300" y1="92" x2="440" y2="100"/>
<line x1="300" y1="128" x2="440" y2="136"/>
<line x1="300" y1="160" x2="440" y2="166"/><line x1="440" y1="170" x2="380" y2="176"/>
<line x1="300" y1="196" x2="440" y2="202"/><line x1="440" y1="206" x2="400" y2="212"/>
</g>
<g class="text"><text x="366" y="34" class="m">lost</text><text x="446" y="104" class="m">crash</text><text x="446" y="140" class="m">pause</text><text x="340" y="186" class="m">lost</text><text x="404" y="222" class="m">slow</text></g>
</svg><figcaption>Six reasons the client sees no reply. From the client's side they all look the same: silence.</figcaption></figure>
<p>In cases 5 and 6 the server did the work; in cases 1 to 3 it didn't; in case 4 it will, later. The only tool the client has is a <strong>timeout</strong>: after waiting some time, it assumes something went wrong. But a timeout can't say <em>what</em> went wrong, and "the server is dead" may be false. CS 330 Lesson 5 met the same problem in reliable transport: a missing acknowledgement might mean a lost packet or a lost ACK, which is why the receiver needs sequence numbers to recognize duplicates. The same idea will rescue us below.</p>

<h3>The two generals problem</h3>
<p>Can two nodes at least agree on something if messages may be lost? A classic puzzle says no. Two armies, each led by a general, camp on opposite hills with an enemy city in the valley between them. If both attack at dawn they win; if only one attacks, it is destroyed. The generals can communicate only by messengers who cross the valley and may be captured. General A sends "attack at dawn". But A doesn't know whether the messenger got through, so A can't safely attack. B, if the message arrives, sends back "agreed", but B doesn't know whether <em>that</em> messenger got through, and knows that A won't attack without it. A could acknowledge the acknowledgement, and so on forever.</p>
<p>Make the goal precise. General A decides whether to attack (B doesn't know A's choice in advance). A protocol is correct if, however many messengers are captured, the two generals end up doing the same thing, and if no messenger is captured, they both follow A's choice. <strong>Claim:</strong> no protocol with a bounded number of messages is correct. <strong>Proof sketch</strong> (by contradiction, picking a smallest counterexample as in MATH 120's well-ordering proofs). Suppose correct protocols exist, and take one that uses the fewest messages, say <em>k</em>, in the run where A chooses to attack and every message arrives. <em>k</em> can't be 0: with no messages, B can't know A's choice. Look at the last message of that run. Its sender decides without knowing whether it arrived, so the sender does the same thing whether or not it arrives. The receiver must then also do the same thing in both cases, or the generals would act differently in the run where it is lost. So the last message changes no one's action. Now change the protocol so that this message is never sent: its sender, on reaching that point, sends nothing. Every run of the new protocol is a run of the old one in which, at most, that one message was lost, and the old protocol is correct whatever is lost, so the generals still end up doing the same thing however many messengers are captured. With no messenger captured they still follow A's choice, because losing that message changes no one's action. So the new protocol is also correct, and uses <em>k</em> − 1 messages in the run where A attacks. That contradicts the choice of <em>k</em>.</p>
<p>Real systems live with this. When you buy something online, the shop and the bank don't reach certainty; they make the uncertainty harmless. The payment is recorded with an ID, a lost confirmation is followed by a query ("did payment 8812 go through?"), and actions are designed so that repeating them does no harm. The rest of the course is full of such designs.</p>

<h3>Latency numbers</h3>
<p>Distributed designs are driven by how long things take. These are orders of magnitude, not exact values; they vary with hardware and change slowly over the years, but the ratios between them have held for decades.</p>
<table>
<tr><th>Operation</th><th>Typical time</th></tr>
<tr><td>Read from L1 cache (CS 210 Lesson 7)</td><td>1 ns</td></tr>
<tr><td>Read from main memory</td><td>100 ns</td></tr>
<tr><td>Random 4 KB read from an SSD (CS 310 Lesson 8)</td><td>100 µs</td></tr>
<tr><td>Round trip between two machines in one datacenter</td><td>100–500 µs</td></tr>
<tr><td>Random read from a hard disk</td><td>5–10 ms</td></tr>
<tr><td>Round trip across a continent</td><td>40–80 ms</td></tr>
<tr><td>Round trip between continents</td><td>70–300 ms</td></tr>
</table>
<p>The intercontinental numbers have a floor set by physics. Light in fibre travels at about 2 × 10<sup>8</sup> m/s (CS 330 Lesson 1). London to New York is about 5,570 km in a straight line, so one way takes at least</p>
<p class="math">5.57 × 10<sup>6</sup> m / (2 × 10<sup>8</sup> m/s) = 0.02785 s ≈ 27.9 ms,</p>
<p>and a round trip at least 55.7 ms. Real cables don't follow a straight line and routers add queueing delay, so measured round trips are 70 ms or more. No engineering removes this floor. A design that needs three round trips between Europe and America before it can answer a request takes at least 3 × 55.7 ≈ 167 ms (over 200 ms with measured round trips), while one memory access takes 100 ns: a million times less. That ratio is why replicas are placed near users, and why protocols are judged by how many round trips they need.</p>

<h3>System models</h3>
<p>To prove anything about an algorithm we must state what it may assume: a <strong>system model</strong>. It has three parts.</p>
<p><strong>The network.</strong> We usually assume <em>fair-loss</em> links: a message may be lost, duplicated or reordered, but if a node keeps resending a message, it eventually gets through. Retrying with sequence numbers, as TCP does, turns a fair-loss link into a <em>reliable</em> one (every message sent is delivered exactly once, as long as the receiver doesn't crash). A <em>network partition</em> cuts some nodes off from others for a while; it is just many losses at once.</p>
<p><strong>The nodes.</strong> A node can fail in three ways, from mildest to worst:</p>
<ul>
<li><strong>Crash-stop</strong>: it stops and never comes back.</li>
<li><strong>Crash-recovery</strong>: it stops, loses its memory, and may restart later with whatever it wrote to stable storage (a disk). This is the realistic model for servers, and why the algorithms in this course write to disk before replying (as a database's write-ahead log does, CS 340 Lesson 8).</li>
<li><strong>Byzantine</strong>: it behaves arbitrarily, including lying or sending different messages to different nodes, because of a bug or an attacker. The name comes from a 1982 paper by Lamport, Shostak and Pease that told the story with generals of the Byzantine army, some of them traitors. Tolerating <em>f</em> Byzantine nodes needs more than 3<em>f</em> nodes in all; tolerating <em>f</em> crashes needs only 2<em>f</em> + 1 (Lesson 4). Here is why. A node can't wait to hear from all <em>n</em> nodes, since <em>f</em> of them may never answer, so it must act once it has heard from <em>n</em> − <em>f</em>. Two such groups share at least (<em>n</em> − <em>f</em>) + (<em>n</em> − <em>f</em>) − <em>n</em> = <em>n</em> − 2<em>f</em> nodes, and up to <em>f</em> of those may be Byzantine, telling each group something different. For the groups to share at least one honest node, which carries the truth from one to the other, we need <em>n</em> − 2<em>f</em> &gt; <em>f</em>, that is, <em>n</em> &gt; 3<em>f</em>. If nodes crash but never lie, any shared node will do: <em>n</em> − 2<em>f</em> ≥ 1, that is, <em>n</em> ≥ 2<em>f</em> + 1.</li>
</ul>
<p>Inside one organization's datacenter, nodes are usually assumed to crash but not lie. Byzantine fault tolerance matters where participants don't trust each other, as in blockchains.</p>
<p><strong>Timing.</strong></p>
<ul>
<li><strong>Synchronous</strong>: there is a known upper bound on message delay and on how long a node takes to process a step. Then a timeout is a perfect failure detector: no reply within the bound means a crash.</li>
<li><strong>Asynchronous</strong>: no bound at all. A message or a step can take any finite time. Timeouts tell you nothing for certain.</li>
<li><strong>Partially synchronous</strong>: the system is asynchronous for periods of unknown length, but eventually behaves synchronously for long enough to make progress.</li>
</ul>
<p>Real networks are partially synchronous. Usually a datacenter round trip takes under a millisecond, but a congested switch (CS 330 Lesson 8's bufferbloat), a garbage-collection pause of several seconds, a virtual machine descheduled by its host (CS 310 Lesson 8) or a retransmission after a timeout can delay a message arbitrarily. Good algorithms are therefore designed to be <em>safe</em> (never do anything wrong) even in the asynchronous model, and to make <em>progress</em> when the system behaves synchronously. Lesson 4 shows that this split is not just good taste: in the asynchronous model, guaranteed progress is impossible.</p>

<h3>Remote procedure calls</h3>
<p>Most distributed programs are written with <strong>remote procedure calls</strong> (RPC): calling a function that runs on another machine as if it were local. Birrell and Nelson described the idea in 1984; today's frameworks include gRPC, Thrift, and the JSON-over-HTTP APIs of CS 240 Lesson 6, which follow the same pattern. A generated <strong>stub</strong> on the client has the same signature as the remote function. Calling it <em>marshals</em> the arguments (encodes them as bytes, for example as JSON, or as Protocol Buffers, Google's compact binary format, in which both sides compile a shared description of the message's fields into encoding and decoding code), sends them in a request message, waits for the reply, unmarshals the result and returns it. On the server, a matching stub unmarshals the request, calls the real function and sends the result back.</p>
<pre data-label="Python (gRPC style, not run)"><code>balance = bank.deposit(account="A-17", amount=100)   # looks local; it's a network round trip</code></pre>
<p>The illusion is useful but leaky. A local call takes nanoseconds and either returns or raises; a remote call takes at least a round trip and can end in a timeout, after which you don't know whether the function ran. Arguments can't be pointers into your memory (CS 210), since the server has its own address space, so everything must be copied. The art of RPC is deciding what to do after a timeout, and there are three answers.</p>
<ul>
<li><strong>At-most-once</strong>: send the request once and never retry. The function ran zero or one times. Safe for non-repeatable actions, but a single lost packet makes the call fail.</li>
<li><strong>At-least-once</strong>: retry until a reply arrives. If the client eventually gets a reply, the function ran one or more times. Safe only if running it twice is harmless, that is, if it is <strong>idempotent</strong> (CS 240 Lesson 6): "set the balance to 100" is idempotent; "add 100 to the balance" is not.</li>
<li><strong>Exactly-once</strong> delivery is impossible for the two generals' reason: after a timeout the sender can't know whether its message arrived (any acknowledgment could itself have been lost), so it must either resend, risking a second delivery, or not, risking none. No choice guarantees exactly one transmission. What is achievable is an exactly-once <em>effect</em>: retry (at-least-once), and have the server recognize retries and not act on them twice. The client gives each logical request a unique ID; the server stores, for each ID it has executed, the reply it sent, and answers a repeat from that table. This is the idempotency key of CS 240 Lesson 6, and the same idea as a TCP receiver using sequence numbers to discard a segment it already has. (TCP's segments may also arrive twice; the receiver's bookkeeping is what hides it, and only within one connection whose state both ends still hold.)</li>
</ul>
<p>Here is the difference in a simulation. The network loses each request and each reply with probability 0.3, decided by a seeded random-number generator so the run is repeatable. A client makes ten deposits of 100, each with its own request ID, retrying up to ten times.</p>
<pre><code>import random

class Server:
    def __init__(self, dedupe):
        self.balance = 0
        self.dedupe = dedupe
        self.replies = {}                      # request id -> the reply already computed
    def deposit(self, req_id, amount):
        if self.dedupe and req_id in self.replies:
            return self.replies[req_id]        # a retry: answer again, don't act again
        self.balance += amount
        self.replies[req_id] = self.balance
        return self.balance

def call(server, req_id, amount, rng, loss=0.3, tries=10):
    """At-least-once: resend until a reply gets through (or give up)."""
    for attempt in range(tries):
        if rng.random() &lt; loss:                # the request is lost
            continue
        reply = server.deposit(req_id, amount)
        if rng.random() &lt; loss:                # the reply is lost
            continue
        return reply
    return None                                # unknown: it may or may not have happened

for dedupe in (False, True):
    rng = random.Random(1)
    s = Server(dedupe)
    for i in range(10):
        call(s, req_id=i, amount=100, rng=rng)
    print(dedupe, s.balance)</code></pre>
<pre data-label="Output"><code>False 1500
True 1000</code></pre>
<p>Without deduplication, the balance is 1500 for ten deposits: five extra applications, gaining the customer 500 that nobody paid. (Counting per request shows that deposits 4, 8 and 9 were applied twice and deposit 7 three times, each lost reply having caused a retry that was applied again.) With the table, the same lost messages cost only time. (Both runs use the same seed, so they lose exactly the same messages.) A real server must also keep the table from growing forever, for example by having each client number its requests 1, 2, 3, … and promise never to retry an old one once it has sent a newer one; then the server needs only the latest number and reply per client. The table must also survive a crash, or a retry that arrives after a restart will be applied again: it belongs in the same stable storage as the balance, updated in the same atomic write.</p>
`,
      terms: [
        ["Distributed system", "Several computers that cooperate on one job and communicate only by sending messages over a network."],
        ["Partial failure", "Some parts of a system failing (a node, a link) while others keep working, so that no part can be sure which parts are alive."],
        ["Timeout", "Giving up on a reply after waiting a set time; it signals that something went wrong, but not what."],
        ["Two generals problem", "Two parties communicating over a lossy channel can't guarantee agreement with any bounded number of messages."],
        ["System model", "The assumptions an algorithm may make about the network, node failures and timing."],
        ["Crash-stop / crash-recovery", "Failure models: a node stops forever, or stops and may restart with only what it saved to stable storage."],
        ["Byzantine fault", "A node behaving arbitrarily, including lying or sending conflicting messages."],
        ["Synchronous / asynchronous / partially synchronous", "Timing models: known bounds on delays; no bounds; or no bounds for unknown periods, with bounds holding eventually."],
        ["Remote procedure call (RPC)", "Calling a function on another machine through stubs that marshal arguments into a request and the result into a reply."],
        ["Marshalling", "Encoding arguments and results as bytes (for example JSON) so they can be sent in a message."],
        ["At-most-once / at-least-once", "RPC semantics: never retry, so the call runs zero or one times; or retry until a reply, so it runs one or more times."],
        ["Exactly-once effect", "Retrying plus server-side deduplication by request ID, so that a request takes effect once even if delivered several times."]
      ],
      quiz: [
        { q: "A client sends a request and gets no reply before its timeout. What can it conclude?", choices: ["The server crashed", "The request was lost", "Nothing certain: the request or reply may be lost or delayed, or the server slow or crashed, before or after acting", "The server never received the request"], answer: 2, why: "All of these produce the same silence. A timeout signals a problem but can't identify it." },
        { q: "Which RPC semantics is safe for a non-idempotent operation with no server-side deduplication?", choices: ["At-least-once", "At-most-once", "Both", "Neither"], answer: 1, why: "Without deduplication, retrying can apply it twice; at-most-once never retries, so it runs zero or one times." },
        { q: "Light in fibre travels about 2 × 10^8 m/s. What is the minimum round-trip time between two cities 3,000 km apart?", choices: ["1.5 ms", "15 ms", "30 ms", "300 ms"], answer: 2, why: "One way is 3 × 10^6 / 2 × 10^8 = 15 ms, so a round trip is at least 30 ms." },
        { q: "In which timing model is a timeout a perfect failure detector?", choices: ["Asynchronous", "Partially synchronous", "Synchronous", "None"], answer: 2, why: "Only with known bounds on delays does 'no reply within the bound' prove a crash." },
        { q: "A node keeps working after restarting, but forgets everything it didn't write to disk. Which failure model is this?", choices: ["Crash-stop", "Crash-recovery", "Byzantine", "Omission-free"], answer: 1, why: "Crash-recovery: it stops, loses memory, and restarts with its stable storage." },
        { q: "How does a server give a retried request an exactly-once effect?", choices: ["By using TCP", "By remembering each request ID it executed with its reply, and answering repeats from that record", "By making the client wait longer", "By refusing all retries"], answer: 1, why: "Retries make delivery at-least-once; deduplication by ID makes the effect happen once." }
      ],
      practice: [
        {
          q: `<p>For each operation, say whether it is idempotent, and if not, how to make it safe to retry: (a) <code>set_email(user, addr)</code>; (b) <code>append_comment(post, text)</code>; (c) <code>delete_file(path)</code>; (d) <code>transfer(from, to, amount)</code>; (e) <code>increment_views(page)</code>.</p>`,
          a: `<p>(a) Idempotent: setting the same value twice leaves it set. (b) Not idempotent: a retry adds a second comment. Give the comment a client-generated ID and have the server ignore a second comment with the same ID. (c) Idempotent in effect: the file is gone after one or two calls, though the second may report "not found", which the client must treat as success. (d) Not idempotent; send a unique transfer ID and deduplicate on the server, in the same transaction that moves the money. (e) Not idempotent. Either deduplicate by request ID, or accept small errors: for a view counter, an occasional double count may not matter, which is a legitimate design decision.</p>`
        },
        {
          q: `<p>A client's timeout for an RPC within one datacenter is 1 ms. The server usually answers in 0.3 ms, but about once a minute it pauses for 200 ms to collect garbage. What happens to requests that arrive during a pause, and what goes wrong if the client treats a timeout as "the server is dead" and sends its work elsewhere?</p>`,
          hint: `<p>Is the server dead during a pause? What will it do when the pause ends?</p>`,
          a: `<p>Requests that arrive during the pause wait, and the client times out on them after 1 ms. The server is not dead: when the pause ends, it processes the queued requests and replies, too late. If the client declared it dead and resent the work to another server, each of those operations may now run twice, once on each server. For non-idempotent work that is a correctness bug, and if many clients do this at once they move load onto the other servers exactly when it isn't needed. A timeout should mean "I don't know", not "it's dead"; the cure is deduplication plus timeouts chosen from measured latency (Lesson 8).</p>`
        },
        {
          q: `<p>A protocol has three round trips between Frankfurt and Singapore, about 10,300 km apart. Using 2 × 10<sup>8</sup> m/s, what is the least time it can take? If real round trips are 1.6 times the straight-line minimum, what is a realistic time?</p>`,
          a: `<p>One way: 1.03 × 10<sup>7</sup> / (2 × 10<sup>8</sup>) = 0.0515 s = 51.5 ms, so a round trip is at least 103 ms and three are at least 309 ms. Realistically 1.6 × 309 ≈ 494 ms, about half a second, before any computation. A design that needs agreement between these two cities on every request can't answer in under about 0.3 s.</p>`
        },
        {
          q: `<p>In the notes' simulation, the server's deduplication table is kept in memory. The server crashes and restarts (crash-recovery) with its balance restored from disk but an empty table. Describe a sequence of events in which a deposit is applied twice, and say how to fix it.</p>`,
          a: `<p>The client sends deposit 7. The server applies it, writes the new balance to disk, and replies; the reply is lost. The server crashes and restarts with the new balance but no record of request 7. The client times out and resends deposit 7; the server, finding no entry, applies it again. Fix: store the table entry on disk in the same atomic write as the balance (for example in the same database transaction), so that after a restart the server knows exactly which requests are reflected in the balance it recovered.</p>`
        }
      ],
      sources: ["kleppmannds", "ddia", "mit6824"]
    },
    {
      id: "di2",
      title: "Time and order",
      minutes: 90,
      summary: "Why machines disagree about the time: clock drift, time-of-day and monotonic clocks, and how NTP estimates a clock's offset from four timestamps. Then ordering without clocks: Lamport's happens-before relation, Lamport clocks and the total order they give, vector clocks that detect concurrency exactly, and causal delivery of broadcast messages, all with worked traces.",
      notes: `
<p>On one machine, the order of events is easy: there is one clock, and if one thread's write happened before another's read, a lock or the memory system says so (CS 310 Lesson 4). Across machines, both tools disappear. Each machine has its own clock, and the clocks disagree. This lesson first looks at physical clocks and how far they can be trusted, then at <em>logical</em> clocks, which order events by cause and effect instead of by time.</p>

<h3>Physical clocks</h3>
<p>A computer keeps time by counting the oscillations of a quartz crystal. Crystals aren't exact: their frequency varies with manufacturing and temperature. The rate error, the <strong>drift</strong>, is typically quoted in parts per million (ppm); 20 ppm is common. A clock 20 ppm fast gains 20 × 10<sup>−6</sup> × 86,400 s ≈ 1.73 s per day. Two machines drifting in opposite directions move apart twice as fast. The difference between two clocks' readings at one moment is their <strong>skew</strong>.</p>
<p>An operating system offers two kinds of clock, and confusing them is a classic bug.</p>
<ul>
<li>The <strong>time-of-day clock</strong> (<code>time.time()</code> in Python, <code>clock_gettime(CLOCK_REALTIME)</code> in C) gives seconds since 1 January 1970 UTC. It can jump: backwards when synchronization finds it was fast, forwards after a suspend, or by a second around a leap second.</li>
<li>The <strong>monotonic clock</strong> (<code>time.monotonic()</code>, <code>CLOCK_MONOTONIC</code>) counts from an arbitrary starting point and never goes backwards. Its absolute value means nothing, but differences between two readings on the same machine are meaningful.</li>
</ul>
<p>Use the monotonic clock to measure durations and timeouts; a time-of-day clock that jumps back by a second can make a measured duration negative. Use the time-of-day clock only for timestamps people read. Neither kind can be compared across machines without synchronization.</p>

<h3>NTP: estimating a clock's offset</h3>
<p>The <strong>Network Time Protocol</strong> (NTP) keeps clocks close to a reference: servers with GPS receivers or atomic clocks, and layers of servers synchronized from them. The core is one exchange of messages. The client records its clock reading <em>t</em><sub>1</sub> when it sends a request; the server records <em>t</em><sub>2</sub> (its clock) on receipt and <em>t</em><sub>3</sub> when it replies; the client records <em>t</em><sub>4</sub> on receipt. The client's timestamps are on the client's clock and the server's on the server's clock, so neither difference <em>t</em><sub>4</sub> − <em>t</em><sub>1</sub> nor <em>t</em><sub>3</sub> − <em>t</em><sub>2</sub> involves comparing two clocks. From them:</p>
<p class="math">round-trip network delay δ = (<em>t</em><sub>4</sub> − <em>t</em><sub>1</sub>) − (<em>t</em><sub>3</sub> − <em>t</em><sub>2</sub>)</p>
<p class="math">estimated offset θ = ((<em>t</em><sub>2</sub> − <em>t</em><sub>1</sub>) + (<em>t</em><sub>3</sub> − <em>t</em><sub>4</sub>)) / 2</p>
<p>Why the offset formula works: suppose the server's clock is ahead of the client's by θ, and each direction takes δ/2. Then the request arrives at client time <em>t</em><sub>1</sub> + δ/2, which the server reads as <em>t</em><sub>2</sub> = <em>t</em><sub>1</sub> + δ/2 + θ. The reply leaves at server time <em>t</em><sub>3</sub>, which is client time <em>t</em><sub>3</sub> − θ, and arrives at <em>t</em><sub>4</sub> = <em>t</em><sub>3</sub> − θ + δ/2. Subtracting, (<em>t</em><sub>2</sub> − <em>t</em><sub>1</sub>) − (<em>t</em><sub>4</sub> − <em>t</em><sub>3</sub>) = 2θ, which rearranges to the formula. If the two directions aren't equally fast, the estimate is off by up to δ/2, so NTP prefers the samples with the smallest delay.</p>
<pre><code>def ntp(t1, t2, t3, t4):
    offset = ((t2 - t1) + (t3 - t4)) / 2
    delay = (t4 - t1) - (t3 - t2)
    return round(offset, 3), round(delay, 3)

print(ntp(100.000, 100.130, 100.131, 100.041))   # (0.11, 0.04)</code></pre>
<p>Here the round trip took 41 ms, of which the server spent 1 ms, so δ = 40 ms; the server's clock is about 110 ms ahead, give or take 20 ms. The client then corrects its clock, gradually if the offset is small (it <em>slews</em>, running slightly fast or slow) and with a jump if it is large. Over the internet NTP typically keeps clocks within a few milliseconds to tens of milliseconds of each other; within a datacenter, better. But "typically" is the problem: a misconfigured server, a network path that is slow in one direction, or a firewall blocking NTP can leave a clock seconds or minutes off, and nothing on the machine notices.</p>
<p>So timestamps from different machines can't reliably order events that are close together. If machine A writes at 12:00:00.010 by its clock and machine B writes at 12:00:00.005 by its clock, B's write may well have come second. A store that keeps "the write with the latest timestamp" (Lesson 3) will then silently discard the newer value.</p>

<h3>Happens-before</h3>
<p>Leslie Lamport's 1978 paper "Time, Clocks, and the Ordering of Events in a Distributed System" observed that what usually matters is not when events happened but whether one could have influenced another. Model each process as a sequence of events: local steps, sending a message and receiving one. The <strong>happens-before</strong> relation, written <em>a</em> → <em>b</em>, is the smallest relation such that:</p>
<ol>
<li>if <em>a</em> and <em>b</em> are events of the same process and <em>a</em> comes first, then <em>a</em> → <em>b</em>;</li>
<li>if <em>a</em> is the sending of a message and <em>b</em> its receipt, then <em>a</em> → <em>b</em>;</li>
<li>if <em>a</em> → <em>b</em> and <em>b</em> → <em>c</em>, then <em>a</em> → <em>c</em> (it is transitive).</li>
</ol>
<p>If neither <em>a</em> → <em>b</em> nor <em>b</em> → <em>a</em>, the events are <strong>concurrent</strong>, written <em>a</em> ∥ <em>b</em>: neither could have known about the other. In the terms of MATH 120 Lesson 5, happens-before is a strict partial order: irreflexive and transitive, with some pairs incomparable. <em>a</em> → <em>b</em> means there is a path from <em>a</em> to <em>b</em> moving forward along process lines and along message arrows, in a diagram like this one:</p>
<figure class="fig"><svg viewBox="0 0 480 220" width="480" role="img" aria-label="A space-time diagram with three processes. P0 has events a, b, h; P1 has c, d, e; P2 has f, g. A message m1 goes from b on P0 to d on P1; a message m2 goes from e on P1 to g on P2.">
<defs><marker id="arr-di2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
<g class="ln"><line x1="50" y1="40" x2="460" y2="40"/><line x1="50" y1="110" x2="460" y2="110"/><line x1="50" y1="180" x2="460" y2="180"/></g>
<g class="hl"><line x1="150" y1="40" x2="218" y2="108" marker-end="url(#arr-di2)"/><line x1="280" y1="110" x2="378" y2="178" marker-end="url(#arr-di2)"/></g>
<g class="dot"><circle cx="90" cy="40" r="4"/><circle cx="150" cy="40" r="4"/><circle cx="330" cy="40" r="4"/><circle cx="110" cy="110" r="4"/><circle cx="220" cy="110" r="4"/><circle cx="280" cy="110" r="4"/><circle cx="130" cy="180" r="4"/><circle cx="380" cy="180" r="4"/></g>
<g class="text">
<text x="10" y="45">P0</text><text x="10" y="115">P1</text><text x="10" y="185">P2</text>
<text x="90" y="30" text-anchor="middle">a</text><text x="150" y="30" text-anchor="middle">b</text><text x="330" y="30" text-anchor="middle">h</text>
<text x="110" y="100" text-anchor="middle">c</text><text x="226" y="100">d</text><text x="286" y="100">e</text>
<text x="130" y="170" text-anchor="middle">f</text><text x="380" y="170" text-anchor="middle">g</text>
<text x="196" y="66" class="m">m1</text><text x="336" y="140" class="m">m2</text>
<text x="90" y="58" class="m" text-anchor="middle">1 (1,0,0)</text><text x="150" y="16" class="m" text-anchor="middle">2 (2,0,0)</text><text x="330" y="58" class="m" text-anchor="middle">3 (3,0,0)</text>
<text x="110" y="128" class="m" text-anchor="middle">1 (0,1,0)</text><text x="220" y="128" class="m" text-anchor="middle">3 (2,2,0)</text><text x="290" y="128" class="m">4 (2,3,0)</text>
<text x="130" y="198" class="m" text-anchor="middle">1 (0,0,1)</text><text x="380" y="198" class="m" text-anchor="middle">5 (2,3,2)</text>
</g>
</svg><figcaption>Time runs left to right on each process's line. Arrows are messages. Each event is labelled with its Lamport timestamp and its vector timestamp, computed below.</figcaption></figure>
<p>In the figure, <em>a</em> → <em>g</em> by the path a, b, d, e, g. But <em>c</em> ∥ <em>b</em>: no path joins them in either direction. The horizontal position doesn't matter; <em>h</em> is drawn to the right of <em>d</em>, yet <em>h</em> ∥ <em>d</em>.</p>

<h3>Lamport clocks</h3>
<p>A <strong>Lamport clock</strong> is a counter in each process, used to give every event a number <em>L</em>(<em>e</em>):</p>
<ol>
<li>Before each event, a process increments its counter, and the event's timestamp is the new value.</li>
<li>Every message carries the sender's timestamp of the send event.</li>
<li>On receiving a message with timestamp <em>t</em>, the receiver first sets its counter to max(counter, <em>t</em>), then increments it as in rule 1.</li>
</ol>
<p>The guarantee: if <em>a</em> → <em>b</em> then <em>L</em>(<em>a</em>) &lt; <em>L</em>(<em>b</em>). Proof: each of the three ways to get <em>a</em> → <em>b</em> preserves it. Within a process the counter only increases. A receipt's timestamp exceeds the message's timestamp by rule 3. And &lt; is transitive. The converse is false: <em>L</em>(<em>c</em>) = 1 &lt; <em>L</em>(<em>b</em>) = 2, yet <em>c</em> ∥ <em>b</em>. A Lamport timestamp can say "this did not happen before that" (if <em>L</em>(<em>a</em>) ≥ <em>L</em>(<em>b</em>), then not <em>a</em> → <em>b</em>), but never "these are concurrent".</p>
<p>Lamport clocks give a <strong>total order</strong> consistent with causality: order events by (<em>L</em>(<em>e</em>), process id), using the id to break ties. Every process can compute this order from the timestamps alone, without asking anyone. Lamport used it to build a mutual-exclusion algorithm in which processes grant a shared resource in timestamp order, and Lesson 4's consensus algorithms use counters in the same spirit (Raft's terms).</p>
<pre><code># Each event: (name, process, kind, message). kind is "local", "send" or "recv".
trace = [("a", 0, "local", None), ("b", 0, "send", "m1"), ("c", 1, "local", None),
         ("d", 1, "recv", "m1"), ("e", 1, "send", "m2"), ("f", 2, "local", None),
         ("g", 2, "recv", "m2"), ("h", 0, "local", None)]

def lamport(trace, n):
    clock = [0] * n
    sent = {}                       # message -> the timestamp it carries
    stamps = {}
    for name, p, kind, msg in trace:
        if kind == "recv":
            clock[p] = max(clock[p], sent[msg]) + 1
        else:
            clock[p] += 1
        if kind == "send":
            sent[msg] = clock[p]
        stamps[name] = clock[p]
    return stamps

print(lamport(trace, 3))   # {'a': 1, 'b': 2, 'c': 1, 'd': 3, 'e': 4, 'f': 1, 'g': 5, 'h': 3}</code></pre>
<p>The trace lists events in one order in which they could have happened (every receive after its send); any such order gives the same timestamps, because each process's counter depends only on its own events and on the messages it receives.</p>

<h3>Vector clocks</h3>
<p>To detect concurrency we need more information. With <em>n</em> processes, a <strong>vector clock</strong> is a list of <em>n</em> counters kept by each process; entry <em>i</em> of process <em>p</em>'s vector counts the events of process <em>i</em> that <em>p</em> knows about.</p>
<ol>
<li>Before each event, process <em>p</em> increments its own entry <em>V</em>[<em>p</em>], and the event's timestamp is a copy of the whole vector.</li>
<li>Every message carries the sender's vector.</li>
<li>On receipt, the receiver first sets each entry to the maximum of its own and the message's, then increments its own entry.</li>
</ol>
<p>Compare vectors entry by entry: <em>U</em> ≤ <em>V</em> if <em>U</em>[<em>i</em>] ≤ <em>V</em>[<em>i</em>] for every <em>i</em>, and <em>U</em> &lt; <em>V</em> if also <em>U</em> ≠ <em>V</em>. Now the guarantee goes both ways: <em>a</em> → <em>b</em> if and only if <em>V</em>(<em>a</em>) &lt; <em>V</em>(<em>b</em>), and <em>a</em> ∥ <em>b</em> exactly when neither vector is ≤ the other. The reason: <em>V</em>(<em>b</em>)[<em>i</em>] is the number of events of process <em>i</em> that happen before or equal <em>b</em>, since knowledge of them can reach <em>b</em> only along a path of process lines and messages, which is exactly what the max rule propagates. So <em>V</em>(<em>a</em>) ≤ <em>V</em>(<em>b</em>) says that everything <em>a</em> had seen, <em>b</em> has seen too, including <em>a</em> itself.</p>
<pre><code>def vector(trace, n):
    clock = [[0] * n for _ in range(n)]       # clock[p] is process p's vector
    sent = {}
    stamps = {}
    for name, p, kind, msg in trace:
        v = clock[p]
        if kind == "recv":
            for i in range(n):
                v[i] = max(v[i], sent[msg][i])
        v[p] += 1
        if kind == "send":
            sent[msg] = list(v)               # a copy travels with the message
        stamps[name] = tuple(v)
    return stamps

def compare(u, v):
    if u == v:
        return "equal"
    if all(x &lt;= y for x, y in zip(u, v)):
        return "before"
    if all(x &gt;= y for x, y in zip(u, v)):
        return "after"
    return "concurrent"

V = vector(trace, 3)
print(V["d"], V["g"], V["h"])   # (2, 2, 0) (2, 3, 2) (3, 0, 0)
print(compare(V["a"], V["g"]), compare(V["c"], V["b"]), compare(V["h"], V["d"]))   # before concurrent concurrent</code></pre>
<p>Check one by hand: <em>d</em> is P1's second event and it has seen P0's first two (a and b, through m1), so <em>V</em>(<em>d</em>) = (2, 2, 0). <em>h</em> = (3, 0, 0) has a larger P0 entry but a smaller P1 entry, so <em>h</em> ∥ <em>d</em>, although their Lamport timestamps are both 3. The cost of this precision is size: each timestamp holds <em>n</em> numbers, which is fine for a handful of replicas (Lesson 3 uses vectors to detect conflicting writes) and too much for millions of clients.</p>

<h3>Causal delivery</h3>
<p>Here is why order matters to users. In a group chat replicated to three servers, Alice posts "Anyone want lunch?" and Bob, having seen it, replies "Yes!". Carol's server receives Bob's reply first, because Alice's message took a slower path. Carol sees an answer to a question nobody asked. The two messages are causally related (Alice's post → Bob's read → Bob's reply), and a system that respects this should deliver them in that order.</p>
<p><strong>Causal broadcast</strong> guarantees it: if the sending of <em>m</em> happens before the sending of <em>m</em>′, every process delivers <em>m</em> before <em>m</em>′. Concurrent messages may be delivered in different orders at different processes. Note the distinction between <em>receiving</em> a message (it arrives from the network) and <em>delivering</em> it (handing it to the application); between the two, a message can wait in a buffer. The standard algorithm uses vectors that count only broadcasts:</p>
<ul>
<li>Each process <em>p</em> keeps a vector <em>D</em>, where <em>D</em>[<em>i</em>] is the number of process <em>i</em>'s messages that <em>p</em> has delivered.</li>
<li>To broadcast, <em>p</em> stamps the message with a copy of <em>D</em> in which entry <em>p</em> is increased by one (this is <em>p</em>'s own message number), delivers it to itself, and sends it.</li>
<li>A message from <em>j</em> with stamp <em>T</em> can be delivered at <em>p</em> once <em>T</em>[<em>j</em>] = <em>D</em>[<em>j</em>] + 1 (it is the next message from <em>j</em>) and <em>T</em>[<em>k</em>] ≤ <em>D</em>[<em>k</em>] for every other <em>k</em> (<em>p</em> has delivered everything the sender had delivered). Until then it waits. After delivering, set <em>D</em>[<em>j</em>] = <em>T</em>[<em>j</em>] and check whether a buffered message has become deliverable.</li>
</ul>
<p>Trace the chat with processes Alice = 0, Bob = 1, Carol = 2. Alice's post has stamp (1, 0, 0). Bob delivers it (his <em>D</em> becomes (1, 0, 0)) and replies with stamp (1, 1, 0). At Carol, <em>D</em> = (0, 0, 0) and the reply arrives first: <em>T</em>[1] = 1 = <em>D</em>[1] + 1, but <em>T</em>[0] = 1 &gt; <em>D</em>[0] = 0, so it waits. Alice's post arrives: <em>T</em>[0] = 1 = 0 + 1 and the other entries are 0, so it is delivered, making <em>D</em> = (1, 0, 0). Now the buffered reply passes both tests and is delivered. The second programming problem builds this receiver.</p>
<p class="note">Why it matters: "which happened first?" is the question behind every conflict between replicas. When the answer is "neither, they were concurrent", the system must either pick a winner by a rule everyone applies the same way or keep both and merge them, which is Lesson 3's subject. Physical timestamps can't tell concurrency from order; vector clocks can.</p>
`,
      terms: [
        ["Clock drift", "The rate at which a clock gains or loses time relative to true time, often measured in parts per million."],
        ["Clock skew", "The difference between two clocks' readings at the same moment."],
        ["Time-of-day clock", "A clock giving the date and time; it can jump forwards or backwards when it is corrected."],
        ["Monotonic clock", "A clock that never goes backwards, for measuring durations on one machine; its absolute value is meaningless."],
        ["NTP", "The Network Time Protocol, which estimates a clock's offset from a server using four timestamps and corrects it."],
        ["Happens-before", "Lamport's relation a → b: same process and earlier, or the send and receipt of a message, or a chain of these."],
        ["Concurrent events", "Events neither of which happens before the other."],
        ["Lamport clock", "A counter per process, carried on messages and advanced to max + 1 on receipt; a → b implies L(a) < L(b)."],
        ["Vector clock", "A list of one counter per process; a → b exactly when V(a) < V(b) entry by entry."],
        ["Causal broadcast", "Broadcast in which a message is delivered everywhere only after every message that causally precedes it."]
      ],
      quiz: [
        { q: "A clock drifts by 50 ppm. Roughly how far off is it after one day, if never corrected?", choices: ["0.05 s", "0.43 s", "4.3 s", "43 s"], answer: 2, why: "50 × 10^-6 × 86,400 s = 4.32 s." },
        { q: "Which clock should you use to measure how long a request took?", choices: ["The time-of-day clock", "The monotonic clock", "An NTP server", "A Lamport clock"], answer: 1, why: "The monotonic clock never jumps backwards, so differences between its readings are durations." },
        { q: "Process P sends m with Lamport timestamp 7. Q's counter is 4 when m arrives. What timestamp does Q give the receive event?", choices: ["5", "7", "8", "12"], answer: 2, why: "max(4, 7) + 1 = 8." },
        { q: "L(a) = 3 and L(b) = 5. What can you conclude?", choices: ["a → b", "a and b are concurrent", "b does not happen before a", "Nothing"], answer: 2, why: "If b → a then L(b) < L(a), which is false. But a → b and a ∥ b are both possible." },
        { q: "Vector timestamps (2, 1, 0) and (1, 2, 0). How are the events related?", choices: ["The first happens before the second", "The second happens before the first", "They are concurrent", "They are equal"], answer: 2, why: "Neither vector is ≤ the other entry by entry." },
        { q: "Under causal broadcast, Carol's D = (2, 0, 1) and a message arrives from process 1 with stamp (3, 1, 1). What happens?", choices: ["It is delivered", "It waits: Carol hasn't delivered process 0's third message", "It is discarded", "It waits: it's not the next message from process 1"], answer: 1, why: "T[1] = 1 = D[1] + 1 is fine, but T[0] = 3 > D[0] = 2: the sender had seen a message from process 0 that Carol hasn't." }
      ],
      practice: [
        {
          q: `<p>An NTP exchange gives <em>t</em><sub>1</sub> = 50.000, <em>t</em><sub>2</sub> = 49.870, <em>t</em><sub>3</sub> = 49.872, <em>t</em><sub>4</sub> = 50.030 (seconds). Compute the round-trip delay and the estimated offset. Whose clock is ahead? How large could the error in the offset be?</p>`,
          a: `<p>δ = (50.030 − 50.000) − (49.872 − 49.870) = 0.030 − 0.002 = 0.028 s. θ = ((49.870 − 50.000) + (49.872 − 50.030))/2 = (−0.130 − 0.158)/2 = −0.144 s. The offset is negative, so the server's clock is about 144 ms <em>behind</em> the client's, and the client should move its clock back (preferably by slewing). The error is at most δ/2 = 14 ms, if all the delay was in one direction.</p>
<pre><code>print(ntp(50.000, 49.870, 49.872, 50.030))   # (-0.144, 0.028)</code></pre>`
        },
        {
          q: `<p>Three processes. P0: x1 = send m1 to P1, x2 = receive m3. P1: y1 = local, y2 = receive m1, y3 = send m2 to P2. P2: z1 = send m3 to P0, z2 = receive m2. Give every event's Lamport and vector timestamp, and list every pair of concurrent events among x1, y1, z1, x2, z2.</p>`,
          hint: `<p>Write the events in an order in which every receive follows its send: x1, y1, y2, y3, z1, x2, z2 works.</p>`,
          a: `<p>Lamport: x1 = 1, y1 = 1, y2 = max(1, 1) + 1 = 2, y3 = 3, z1 = 1, x2 = max(1, 1) + 1 = 2, z2 = max(1, 3) + 1 = 4. Vectors: x1 = (1,0,0), y1 = (0,1,0), y2 = (1,2,0), y3 = (1,3,0), z1 = (0,0,1), x2 = (2,0,1), z2 = (1,3,2).</p>
<pre><code>t = [("x1", 0, "send", "m1"), ("y1", 1, "local", None), ("y2", 1, "recv", "m1"),
     ("y3", 1, "send", "m2"), ("z1", 2, "send", "m3"), ("x2", 0, "recv", "m3"), ("z2", 2, "recv", "m2")]
print(lamport(t, 3))   # {'x1': 1, 'y1': 1, 'y2': 2, 'y3': 3, 'z1': 1, 'x2': 2, 'z2': 4}
W = vector(t, 3)
print(W["x2"], W["z2"])   # (2, 0, 1) (1, 3, 2)</code></pre>
<p>Among x1, y1, z1, x2, z2: x1 → x2 and x1 → z2 (through m1 and m2), y1 → z2, z1 → x2 and z1 → z2. Concurrent pairs: x1 ∥ y1, x1 ∥ z1, y1 ∥ z1, y1 ∥ x2, and x2 ∥ z2 (x2 = (2,0,1) and z2 = (1,3,2): neither ≤ the other).</p>`
        },
        {
          q: `<p>Suppose <em>a</em> ∥ <em>b</em> (neither vector timestamp is less than the other). Using events from the figure in the notes, show that their Lamport timestamps can then be equal, or smaller for either one. What does this say about using Lamport timestamps to detect concurrency?</p>`,
          a: `<p>These are concurrent pairs, and Lamport clocks say nothing about them. In the figure: <em>h</em> ∥ <em>d</em> with <em>L</em>(<em>h</em>) = <em>L</em>(<em>d</em>) = 3 (equal); <em>c</em> ∥ <em>b</em> with <em>L</em>(<em>c</em>) = 1 &lt; <em>L</em>(<em>b</em>) = 2; <em>h</em> ∥ <em>f</em> with <em>L</em>(<em>h</em>) = 3 &gt; <em>L</em>(<em>f</em>) = 1. So the Lamport order of concurrent events is an accident of how many events each process had, which is why Lamport timestamps can't detect concurrency.</p>`
        },
        {
          q: `<p>In causal broadcast with three processes, process 2 has <em>D</em> = (0, 0, 0) and receives, in this order: <em>A</em> from process 0 with stamp (2, 0, 0), <em>B</em> from process 1 with stamp (1, 1, 0), <em>C</em> from process 0 with stamp (1, 0, 0). When is each delivered?</p>`,
          a: `<p><em>A</em>: <em>T</em>[0] = 2 ≠ <em>D</em>[0] + 1 = 1, so it waits (it is process 0's second message). <em>B</em>: <em>T</em>[1] = 1 = 0 + 1, but <em>T</em>[0] = 1 &gt; 0, so it waits. <em>C</em>: <em>T</em>[0] = 1 = 0 + 1 and the rest are ≤ 0, so it is delivered; <em>D</em> = (1, 0, 0). Rechecking the buffer: <em>A</em> now has <em>T</em>[0] = 2 = 1 + 1 and is delivered (<em>D</em> = (2, 0, 0)); <em>B</em> has <em>T</em>[1] = 1 = 0 + 1 and <em>T</em>[0] = 1 ≤ 2, so it is delivered (<em>D</em> = (2, 1, 0)). Delivery order: <em>C</em>, then <em>A</em> and <em>B</em> (in either order, since <em>A</em> ∥ <em>B</em>: (2,0,0) and (1,1,0) are incomparable).</p>`
        }
      ],
      sources: ["lamport78", "kleppmannds", "ddia"]
    },
    {
      id: "di3",
      title: "Replication",
      minutes: 90,
      summary: "Keeping copies of data on several machines: leader–follower replication, synchronous and asynchronous followers, and failover; the anomalies replication lag causes and the read-your-writes, monotonic-reads and consistent-prefix guarantees that prevent them; multi-leader and leaderless replication with quorums, read repair and anti-entropy; and resolving conflicting writes with last-writer-wins, version vectors and CRDTs.",
      notes: `
<p>CS 340 Lesson 8 introduced <strong>replication</strong>, keeping a copy of the same data on several machines (each copy is a <strong>replica</strong>), in one paragraph: it gives durability (a dead disk loses nothing), availability (another copy can answer) and read capacity. This lesson looks at how it is done and what goes wrong. Everything would be easy if the data never changed; the whole difficulty is handling writes.</p>

<h3>Leader–follower replication</h3>
<p>The most common design makes one replica the <strong>leader</strong> (also called primary or master). Clients send every write to the leader. The leader applies the write to its own copy and appends it to a <strong>replication log</strong>, which it streams to the other replicas, the <strong>followers</strong>. Each follower applies the log's entries in the same order, so it passes through the same sequence of states as the leader, a little later. Reads can go to the leader or to any follower. PostgreSQL, MySQL, MongoDB and Kafka all work this way by default.</p>
<p>What goes in the log? Sending the SQL statements themselves is fragile: <code>UPDATE ... SET t = now()</code> or <code>random()</code> would give different results on each replica. Databases therefore usually ship either the physical changes (the write-ahead log of CS 340 Lesson 8, which says which bytes of which page changed) or a <em>logical</em> log of the rows inserted, deleted and updated, with their final values. The rule to remember is that each log entry must be <strong>deterministic</strong>: applying it must give the same result on every replica.</p>
<p><strong>Synchronous or asynchronous.</strong> When a client writes, the leader can wait for followers to confirm before reporting success, or not.</p>
<ul>
<li>A <strong>synchronous</strong> follower confirms before the client is told "done". If the leader then dies, that follower has every confirmed write. But each write now waits a round trip to the follower, and if the follower is slow or down, writes stop.</li>
<li>An <strong>asynchronous</strong> follower is sent the log but not waited for. Writes are fast and survive follower failures, but if the leader dies, the writes it hadn't yet sent are lost, even though clients were told they succeeded.</li>
</ul>
<p>A common compromise is <em>semi-synchronous</em>: one follower is synchronous and the rest asynchronous, so every confirmed write is on at least two machines, and if the synchronous follower fails, an asynchronous one is promoted to take its place.</p>
<p><strong>Failover.</strong> When the leader fails, a follower must take over. Three steps, each harder than it looks: detect the failure (usually a timeout, which, as Lesson 1 showed, can't distinguish a dead leader from a slow one); choose a new leader (preferably the follower with the most of the log); and make clients and the other followers use it. If the old leader was only slow and comes back still believing it is the leader, there are two leaders accepting writes, a situation called <strong>split brain</strong>, and their writes conflict. Choosing a leader safely is a consensus problem: Lessons 4 and 5.</p>

<h3>Replication lag and its anomalies</h3>
<p>With asynchronous followers, a follower may be some way behind the leader: the <strong>replication lag</strong>. Normally it is a few milliseconds, but under load or after a network problem it can grow to seconds or minutes. If replication stops and all writes stop too, the followers eventually catch up and agree with the leader. This weak promise, that replicas converge if writes stop, is <strong>eventual consistency</strong> (CS 340 Lesson 8). Users notice lag in three specific ways.</p>
<p><strong>Read-your-writes.</strong> A user changes their display name. The write goes to the leader; the page then reloads from a follower that hasn't received it, and shows the old name. The user thinks the change was lost. The <em>read-your-writes</em> guarantee (also called read-after-write consistency) says a user always sees their own writes. Ways to provide it: read data the user may have changed (their own profile) from the leader; or have the client remember the log position of its last write, and read only from a follower that has applied at least that much of the log, else from the leader.</p>
<p><strong>Monotonic reads.</strong> A user loads a comment thread twice. The first load goes to a follower with a lag of 1 s and shows a new comment; the second goes to a follower with a lag of 10 s and doesn't. Time seems to run backwards. <em>Monotonic reads</em> says that once a user has seen data at some point in the log, later reads never show an earlier point. A simple way: route each user's reads to the same replica, for example chosen by a hash of the user ID (falling back to another only if it fails).</p>
<p><strong>Consistent prefix.</strong> If writes have a causal order (a question, then its answer), an observer should see them in that order. With a single leader this holds automatically, since every replica applies one log in order. It breaks when data is partitioned across several leaders (Lesson 6) and different partitions lag by different amounts, so an answer stored in one partition can appear before the question stored in another. This is Lesson 2's causal ordering again.</p>
<p>A worked example. The leader's log has entries 1 to 100. Follower F1 has applied up to 98 and F2 up to 91. A client writes entry 101 (its new name) and remembers position 101. Reading from F1 or F2 would show the old name, so the client reads from the leader, or waits until a follower reports position 101 or more. A client that read from F1 (position 98) and then from F2 (position 91) would see entries 92 to 98 disappear: a monotonic-reads violation, avoided by sticking to F1.</p>

<h3>Multi-leader replication</h3>
<p>With users in several continents, a single leader means every write from far away pays an intercontinental round trip (Lesson 1). <strong>Multi-leader</strong> replication puts a leader in each datacenter; each accepts local writes and replicates them asynchronously to the others. An offline-capable app is an extreme case: every phone is a leader for its own copy, syncing when it reconnects, as calendar and note-taking apps do. The price is <strong>write conflicts</strong>: two leaders can accept concurrent writes to the same item, and they find out only later. We return to resolving them below.</p>

<h3>Leaderless replication and quorums</h3>
<p>Amazon's Dynamo (2007) and its descendants, Cassandra and Riak, have no leader at all. A write is sent to all <em>N</em> replicas of the key, and is successful once <em>W</em> of them acknowledge it. A read is sent to the replicas, and the client waits for <em>R</em> replies. Each stored value carries a version number (or timestamp), and the reader takes the newest value among the replies.</p>
<p>CS 340 Lesson 8 stated the rule: if <em>R</em> + <em>W</em> &gt; <em>N</em>, every read sees the latest acknowledged write. The reason is the pigeonhole principle (MATH 121 Lesson 2). A write set has <em>W</em> replicas and a read set <em>R</em>; if they were disjoint, together they would contain <em>R</em> + <em>W</em> &gt; <em>N</em> distinct replicas, but there are only <em>N</em>. So at least one replica in the read set has the latest write, and the newest version among the replies is the latest. A brute-force check over every possible write set and read set agrees:</p>
<pre><code>from itertools import combinations

def always_overlap(n, w, r):
    for ws in combinations(range(n), w):
        for rs in combinations(range(n), r):
            if not set(ws) &amp; set(rs):
                return False, ws, rs          # a read that misses the write
    return True, None, None

print(always_overlap(3, 2, 2))   # (True, None, None)
print(always_overlap(5, 2, 3))   # (False, (0, 1), (2, 3, 4))</code></pre>
<p>The usual choice is <em>N</em> = 3, <em>W</em> = 2, <em>R</em> = 2: any one replica can be down and both reads and writes still succeed. <em>W</em> = <em>N</em> and <em>R</em> = 1 make reads cheap but writes fail if any replica is down; <em>W</em> = 1 and <em>R</em> = 1 are fast and highly available, but a read can miss a write.</p>
<p>How do stale replicas catch up? Two mechanisms:</p>
<ul>
<li><strong>Read repair.</strong> When a read gets replies with different versions, the reader writes the newest value back to the replicas that returned older ones. Data that is read often is repaired quickly.</li>
<li><strong>Anti-entropy.</strong> A background process compares replicas and copies missing data. To avoid comparing every key, replicas compare <em>Merkle trees</em>: trees of hashes (CS 380 Lesson 3) in which each leaf is the hash of a range of keys and each inner node the hash of its children. If two roots match, the replicas agree everywhere; if not, descend only into the subtrees whose hashes differ.</li>
</ul>
<p>Quorums are weaker than they look. If a write reaches fewer than <em>W</em> replicas it is reported as failed but is not undone on the replicas that took it, so later reads may or may not see it. Two concurrent writes may reach different replicas in different orders. And Dynamo's <em>sloppy quorums</em> let a write count acknowledgements from substitute nodes when the usual replicas are unreachable (the substitute passes the value on later: <em>hinted handoff</em>), which keeps writes available but breaks the overlap argument. Quorums give "probably recent", not "as if there were one copy"; Lesson 5 makes that precise.</p>

<h3>Resolving conflicts</h3>
<p>With multiple leaders or none, two replicas can accept concurrent writes to the same key. All replicas must end up with the same value, so they need a rule that gives the same answer whatever order they see the writes in.</p>
<p><strong>Last writer wins</strong> (LWW). Attach a timestamp to each write and keep the one with the largest. Cassandra does this. It converges, but it silently discards all but one of a set of concurrent writes. Worse, with physical clocks (Lesson 2) the write with the larger timestamp may be the <em>earlier</em> one: if node A's clock is 50 ms fast, A's write at true time 10:00:00.000 is stamped .050 and beats B's write at true time 10:00:00.030, stamped .030, although B's came later. LWW is acceptable only when losing writes doesn't matter, or when each key is written once.</p>
<p><strong>Detecting concurrency.</strong> To keep concurrent writes instead of losing them, a store can attach a <strong>version vector</strong> to each value: a vector clock (Lesson 2) with one entry per replica, counting the writes each replica has made to that key. A read returns the value together with its vector, the <em>context</em>. A write sends back the context it read; the replica handling the write takes that vector, sets its own entry to one more than the largest it has used for that key, and stores the result with the new value. The write replaces every stored version whose vector is ≤ its context entry by entry (versions the writer had seen) and keeps the others beside it as <em>siblings</em> (writes it hadn't seen, concurrent with it). A read that finds siblings returns them all, with the entrywise maximum of their vectors as the context, and the reader (or the application) merges them and writes the result back, which then replaces them all.</p>
<p>For example, with replicas R1 and R2: a client writes cart = {milk} through R1 with an empty context, stored with [1, 0]. Clients X and Y both read it. X writes {milk, eggs} through R1 with context [1, 0], giving [2, 0], which replaces [1, 0]. Y writes {milk, ham} through R2 with context [1, 0], giving [1, 1]; the stored [2, 0] is not ≤ [1, 0], so both are kept. [2, 0] and [1, 1] are concurrent (neither is ≤ the other). The next reader gets both with context [2, 1], merges them to {milk, eggs, ham}, and writes through R1, giving [3, 1], which replaces both siblings. Dynamo's shopping cart merged siblings by taking the union of their items. This loses no additions, but an item deleted on one side could reappear.</p>
<p><strong>CRDTs.</strong> A <strong>conflict-free replicated data type</strong> (CRDT) is a data type designed so that replicas can accept updates independently and merge in any order with a guaranteed common result. For a <em>state-based</em> CRDT, the merge function must be:</p>
<ul>
<li>commutative: merge(<em>a</em>, <em>b</em>) = merge(<em>b</em>, <em>a</em>);</li>
<li>associative: merge(merge(<em>a</em>, <em>b</em>), <em>c</em>) = merge(<em>a</em>, merge(<em>b</em>, <em>c</em>));</li>
<li>idempotent: merge(<em>a</em>, <em>a</em>) = <em>a</em>;</li>
</ul>
<p>and every update must only move the state "upward". Merge defines what upward means: state <em>s</em> is <em>below</em> state <em>t</em> if merge(<em>s</em>, <em>t</em>) = <em>t</em>, that is, <em>t</em> already includes everything <em>s</em> knows. An update must turn each state <em>s</em> into a state <em>s</em>′ with merge(<em>s</em>, <em>s</em>′) = <em>s</em>′: it may add information but never remove it. (For the G-counter below, merge is the entrywise maximum, so <em>s</em> is below <em>t</em> when every entry of <em>s</em> is at most the matching entry of <em>t</em>; an increment raises one entry, so it moves upward, and a decrement would not.) Then replicas that have received the same set of updates, in any order, any number of times, are in the same state. Being idempotent, a merge can be repeated harmlessly, which makes CRDTs ideal for unreliable networks: just keep sending your state. The simplest example is a <strong>G-counter</strong> (grow-only counter), for likes or page views. Each replica keeps a vector with one count per replica and increments only its own entry; the value is the sum; and merge takes the entrywise maximum, which is commutative, associative and idempotent because max is.</p>
<pre><code>class GCounter:
    """A grow-only counter replicated on n replicas; this copy belongs to replica me."""
    def __init__(self, n, me):
        self.counts = [0] * n
        self.me = me
    def increment(self):
        self.counts[self.me] += 1          # each replica changes only its own entry
    def value(self):
        return sum(self.counts)
    def merge(self, other):
        self.counts = [max(a, b) for a, b in zip(self.counts, other.counts)]

a, b = GCounter(2, 0), GCounter(2, 1)
a.increment(); a.increment(); b.increment()      # concurrently: 2 likes at A, 1 at B
a.merge(b); b.merge(a); a.merge(b)               # any order, any number of times
print(a.counts, a.value(), b.value())   # [2, 1] 3 3</code></pre>
<p>Why not a single shared integer, adding the other replica's count on merge? Because merging twice would add twice: addition isn't idempotent. Keeping per-replica entries makes max the right merge. To support decrements, a <strong>PN-counter</strong> keeps two G-counters, one for increments (P) and one for decrements (N), with value P − N.</p>
<p>Sets are harder. If one replica adds <em>x</em> while another concurrently removes it, what should the merged set contain? The <strong>observed-remove set</strong> (OR-set) answers "add wins". Each add attaches a unique tag, such as (replica id, a counter), so the set holds (element, tag) pairs. A remove deletes only the tags for that element that the removing replica has <em>observed</em>, recording them as removed (as "tombstones", so that a merge doesn't bring them back). An element is in the set if it has a tag that hasn't been removed. A concurrent add has a fresh tag the remover never saw, so it survives. The second programming problem builds a PN-counter and an OR-set. Collaborative editors (such as those built on the Automerge and Yjs libraries) use more elaborate CRDTs for text, so that two people typing in the same paragraph offline merge sensibly.</p>
<p class="note">Why it matters: every replicated system chooses, explicitly or by accident, how stale a read may be and what happens to concurrent writes. Asking "what does a user see if they read right after writing?" and "what happens if two people edit this at once?" is the fastest way to understand a design.</p>
`,
      terms: [
        ["Replica", "One of several copies of the same data, kept on different machines."],
        ["Leader–follower replication", "One replica (the leader) accepts writes and streams a log of them to followers, which apply it in order."],
        ["Synchronous / asynchronous replication", "The leader waits for a follower's confirmation before reporting a write as done, or doesn't."],
        ["Failover", "Replacing a failed leader with a follower: detect the failure, choose a new leader, redirect clients."],
        ["Split brain", "Two nodes both acting as leader and accepting conflicting writes."],
        ["Replication lag", "How far a follower's state is behind the leader's."],
        ["Read-your-writes", "The guarantee that a user always sees their own earlier writes."],
        ["Monotonic reads", "The guarantee that a user's later reads never show older data than earlier ones."],
        ["Quorum", "With N replicas, writes wait for W acknowledgements and reads for R replies; R + W > N makes every read set overlap every write set."],
        ["Read repair", "Writing the newest value back to replicas that returned stale values during a read."],
        ["Anti-entropy", "A background process that compares replicas (often with Merkle trees) and copies missing data."],
        ["Last writer wins (LWW)", "Resolving concurrent writes by keeping the one with the largest timestamp, discarding the others."],
        ["Version vector", "A vector clock attached to a stored value, used to tell whether two versions are ordered or concurrent."],
        ["CRDT", "A replicated data type whose merge is commutative, associative and idempotent, so replicas converge regardless of order."],
        ["OR-set", "An observed-remove set: adds carry unique tags and removes delete only observed tags, so a concurrent add wins."]
      ],
      quiz: [
        { q: "The leader replicates asynchronously, acknowledges a write, and crashes before sending it. A follower becomes leader. What happens to the write?", choices: ["It is lost", "The new leader fetches it from the old one", "The client's retry is rejected", "It is applied twice"], answer: 0, why: "Asynchronous replication means an acknowledged write may exist only on the failed leader." },
        { q: "A user posts a comment and immediately reloads the page, but doesn't see the comment. Which guarantee was violated?", choices: ["Monotonic reads", "Read-your-writes", "Consistent prefix", "Linearizability of the leader"], answer: 1, why: "The user didn't see their own write, typically because the read went to a lagging follower." },
        { q: "With N = 5 replicas, which quorum choice guarantees reads overlap writes?", choices: ["W = 2, R = 2", "W = 1, R = 4", "W = 3, R = 2", "W = 4, R = 2"], answer: 3, why: "Only 4 + 2 = 6 > 5. The others sum to at most 5." },
        { q: "Why does a G-counter merge with max rather than by adding the other replica's counts?", choices: ["max is faster", "Merges may be repeated or arrive in any order, and max is idempotent, so a repeat doesn't double-count", "Addition can overflow", "max loses fewer increments"], answer: 1, why: "Adding twice would double-count; max of per-replica entries gives the same result however often it is applied." },
        { q: "Node A's clock is 50 ms fast. Under last-writer-wins, A writes x = 1 at true time 0 ms and B writes x = 2 at true time 30 ms. What is kept?", choices: ["x = 2, the later write", "x = 1, because A's timestamp (50) beats B's (30)", "Both, as siblings", "Neither"], answer: 1, why: "LWW compares timestamps, not true times; the earlier write wins and the later one is silently lost." },
        { q: "In an OR-set, replica 1 removes x while replica 2 concurrently adds x. After merging, is x in the set?", choices: ["No: remove wins", "Yes: the add's tag wasn't observed by the remove, so it survives", "It depends on timestamps", "The merge fails"], answer: 1, why: "A remove deletes only the tags it saw; the concurrent add has a new tag." }
      ],
      practice: [
        {
          q: `<p>A leader has applied log entries 1 to 500. Followers F1, F2 and F3 have applied 497, 480 and 500. A client wrote entry 499 and then reads. (a) Which replicas can serve a read-your-writes read? (b) The client's previous read was served by F1, which had then applied entries up to 497, as it has now. Which replicas can serve this read without violating monotonic reads?</p>`,
          a: `<p>(a) Any replica that has applied entry 499: the leader and F3 (F1 at 497 and F2 at 480 are behind). (b) Any replica at position 497 or more: the leader, F1 and F3. F2 would show the client an older state than it has already seen. Combining both requirements: the leader or F3.</p>`
        },
        {
          q: `<p>A store has <em>N</em> = 3, <em>W</em> = 2, <em>R</em> = 2, and replicas A, B, C all hold x = 5 at version 1. A write of x = 8 (version 2) reaches A and B; C is briefly unreachable. A read then contacts B and C. What does it return, and what does read repair do? What would a read with <em>R</em> = 1 that happened to contact C return?</p>`,
          a: `<p>B replies (8, v2) and C replies (5, v1). The reader returns the newer, 8, and writes (8, v2) back to C, so now all three agree. With <em>R</em> = 1, a read that contacted only C would return the stale 5: 1 + 2 = 3 is not greater than 3, so the read set {C} misses the write set {A, B}.</p>`
        },
        {
          q: `<p>Show that merge for a G-counter is commutative, associative and idempotent, and that it never loses an increment: if replica <em>i</em> has done <em>k</em> increments, every replica that has merged state containing them has entry <em>i</em> ≥ <em>k</em>.</p>`,
          a: `<p>Merge applies max entry by entry, and max on numbers is commutative (max(<em>a</em>, <em>b</em>) = max(<em>b</em>, <em>a</em>)), associative (both groupings give the largest of three) and idempotent (max(<em>a</em>, <em>a</em>) = <em>a</em>); a property that holds in every entry holds for the vectors. Entry <em>i</em> is changed only by replica <em>i</em>'s increments, which raise it by one each, and by merges, which never lower any entry (max(<em>a</em>, <em>b</em>) ≥ <em>a</em>). So once replica <em>i</em>'s entry reaches <em>k</em>, any state merged from it has entry <em>i</em> ≥ <em>k</em>, and the sum counts all <em>k</em> increments. Since only replica <em>i</em> increments entry <em>i</em>, the entry is exactly the number of its increments the state has seen, never more.</p>`
        },
        {
          q: `<p>Two phones edit a shared shopping list offline. Phone 1 removes "milk"; phone 2, which also had "milk", adds "eggs". Later phone 2 adds "milk" again, still offline. Under (a) last-writer-wins on the whole list and (b) an OR-set, what does the merged list contain? Assume phone 2's last edit has the larger timestamp.</p>`,
          a: `<p>(a) LWW on the whole list keeps phone 2's version entirely: milk and eggs, and anything phone 1 changed is discarded (if phone 1 had added "bread", it would be lost). (b) In the OR-set, phone 1's remove deletes the tag of the "milk" it observed. Phone 2's "eggs" add has a new tag, and so does its second "milk" add, which phone 1 never saw. Merged: eggs and milk (the second add's tag survives), plus anything else either phone added. Each element's outcome is decided separately, and no add is lost.</p>`
        }
      ],
      sources: ["ddia", "dynamo07", "crdt11", "kleppmannds"]
    },
    {
      id: "di4",
      title: "Consensus I: Raft",
      minutes: 90,
      summary: "The consensus problem and why replicated systems need it; state machine replication; majorities and why 2f + 1 nodes tolerate f crashes; the FLP impossibility result stated informally, and what it means for real algorithms; and Raft in detail: terms, leader election with randomized timeouts and the voting restriction, log replication with the consistency check, the commit rule, and why committed entries are never lost, traced step by step on five servers.",
      notes: `
<p>Lesson 3 left two problems open: a leader-based system needs to choose a new leader safely when the old one fails, without ever having two; and replicas need to apply the same writes in the same order. Both are instances of one problem, <strong>consensus</strong>, and this lesson and the next are about solving it.</p>

<h3>The consensus problem</h3>
<p>Several nodes each <em>propose</em> a value, and each must <em>decide</em> a value, such that:</p>
<ul>
<li><strong>Agreement</strong>: no two nodes decide different values.</li>
<li><strong>Validity</strong>: the decided value was proposed by some node (so "always decide 0" is ruled out).</li>
<li><strong>Termination</strong>: every node that doesn't crash eventually decides.</li>
</ul>
<p>Agreement and validity are <em>safety</em> properties (nothing bad happens); termination is a <em>liveness</em> property (something good eventually happens). This distinction will matter in a moment.</p>
<p>Why one decision is enough to build a whole database: <strong>state machine replication</strong>. If every replica starts in the same state and applies the same sequence of deterministic commands, they all pass through the same states (Lesson 3's replication log). So it suffices to agree on the log: what command is in slot 1, slot 2, and so on, one consensus decision per slot. Agreeing on such a sequence is also called <strong>total order broadcast</strong>: every node delivers the same messages in the same order. Leader election is consensus too ("who leads in round 7?"), and so are locks ("who holds the lock now?").</p>

<h3>Majorities</h3>
<p>Consensus algorithms for crash faults use <strong>majority quorums</strong>. With <em>n</em> = 2<em>f</em> + 1 nodes, a majority is <em>f</em> + 1. Any two majorities share at least one node, by Lesson 3's pigeonhole argument: (<em>f</em> + 1) + (<em>f</em> + 1) = <em>n</em> + 1 &gt; <em>n</em>. And if at most <em>f</em> nodes crash, the remaining <em>f</em> + 1 still form a majority, so the system can make progress. Five nodes tolerate two crashes; three nodes tolerate one. Adding a fourth node to three doesn't help: a majority of four is three, so four nodes still tolerate only one crash, which is why clusters have odd sizes. (This is Lesson 1's counting argument with no liars: groups of <em>n</em> − <em>f</em> = <em>f</em> + 1 must share a node. Byzantine nodes need the groups to share an honest node, hence 3<em>f</em> + 1.) The overlap is the heart of every safety argument below: whatever one majority decided, any later majority contains a witness who knows about it.</p>

<h3>FLP: the limit</h3>
<p>In 1985 Michael Fischer, Nancy Lynch and Michael Paterson proved a result now known by their initials, <strong>FLP</strong>: in the asynchronous model (Lesson 1: no bound on message delays), no deterministic algorithm solves consensus if even one node may crash. Informally, because a crashed node and a slow one look the same, an algorithm must sometimes decide without hearing from someone; the proof shows that an adversary who controls message delays can always find a schedule that keeps the system undecided, step after step, forever. Every algorithm that is always safe must therefore have executions that never terminate.</p>
<p>FLP doesn't make consensus useless; it says where to give ground. Practical algorithms (Paxos, Raft, and those behind ZooKeeper and etcd) are <em>always safe</em>, even with arbitrary delays and lost messages, and <em>terminate when the network behaves</em>: in the partially synchronous model, once delays stay below the timeouts for long enough. They use timeouts and randomness to make progress likely. When the network misbehaves, they stall rather than decide inconsistently.</p>

<h3>Raft</h3>
<p>Raft was designed by Diego Ongaro and John Ousterhout at Stanford in 2014, explicitly to be easier to understand than Paxos (Lesson 5). It is used in etcd (which stores Kubernetes's state), CockroachDB, TiKV, Consul and many others. Raft replicates a log among a fixed set of servers, usually 3 or 5. At any time each server is a <strong>follower</strong>, a <strong>candidate</strong> or a <strong>leader</strong>. Clients send commands to the leader; the leader appends them to its log and replicates them; followers only respond to the leader and candidates.</p>
<p><strong>Terms.</strong> Time is divided into numbered <strong>terms</strong>. Each term begins with an election and has at most one leader. Every server stores a <code>current_term</code>, and every message carries the sender's term. Two rules make terms act like Lamport clocks (Lesson 2): a server that sees a larger term than its own adopts it and becomes a follower; a server rejects any request carrying a term smaller than its own. So a deposed leader that comes back from a pause learns from the first reply that it is out of date, and steps down.</p>
<p>A server keeps three things on disk, written before it answers any message, because after a crash it must not forget them (crash-recovery model, Lesson 1): <code>current_term</code>, <code>voted_for</code> (the candidate it voted for in this term, or none) and the <code>log</code>. Each log entry holds a command and the term in which the leader received it. Indexes start at 1.</p>

<h4>Leader election</h4>
<p>A leader sends periodic <em>heartbeats</em> (empty AppendEntries messages, below) to keep its followers from starting elections. Each follower has an <strong>election timeout</strong>, chosen at random, for example between 150 and 300 ms. If it hears nothing from a leader for that long, it becomes a candidate: it increments its term, votes for itself, and sends <code>RequestVote(term, candidate_id, last_log_index, last_log_term)</code> to every other server. A server grants its vote if</p>
<ol>
<li>the request's term is at least its own (after adopting a larger term), and</li>
<li>it hasn't voted for anyone else in this term, and</li>
<li>the candidate's log is <strong>at least as up to date</strong> as its own: the candidate's last entry has a larger term than the voter's last entry, or the same term and an index at least as large.</li>
</ol>
<p>A candidate that collects votes from a majority (counting its own) becomes leader and immediately sends heartbeats. If it hears from a leader with a term at least its own, it becomes a follower. If neither happens before its timeout (votes were split among several candidates), it starts a new election with a higher term. Each server votes at most once per term, so two leaders in one term would need two majorities with no voter in common, which can't exist. The random timeouts make split votes rare: usually one server times out well before the others and collects its votes before anyone else starts.</p>
<p>Rule 3 is the <strong>election restriction</strong>. It stops a server with a stale log from becoming leader and overwriting entries that were already committed. Its exact form, comparing last terms first, matters in the safety argument below.</p>

<h4>Log replication</h4>
<p>The leader sends each follower <code>AppendEntries(term, leader_id, prev_log_index, prev_log_term, entries, leader_commit)</code>: some new entries, the index and term of the entry just before them, and the leader's commit index. The follower checks that its own log has an entry at <code>prev_log_index</code> with term <code>prev_log_term</code>. If not, it rejects the request. If so, it accepts: wherever an existing entry conflicts with a new one (same index, different term), it deletes that entry and all that follow it; then it appends any new entries it doesn't have, and sets its commit index to the smaller of <code>leader_commit</code> and the index of its last new entry.</p>
<p>The leader keeps a <code>next_index</code> for each follower, the next entry to send it. When it is elected it sets every <code>next_index</code> to one past the end of its own log (in the trace below S3 is elected with log [1], so it starts at 2, and its first message to each follower has prev = (1, term 1)). On a rejection it decrements <code>next_index</code> and tries again, walking back until the logs match, and from then on the follower's log is overwritten to match the leader's. This consistency check gives the <strong>log matching property</strong>: if two logs have an entry with the same index and term, they are identical up to that index. (Induction on the index, MATH 120: a leader creates at most one entry per index in a term, and a follower appends an entry only if its predecessor matches.)</p>

<h4>The commit rule</h4>
<p>An entry is <strong>committed</strong> once it is safe to apply to the state machine, which means no future leader will ever remove it. The leader decides: an entry from the leader's <em>current term</em> is committed once it is stored on a majority of servers. Entries before it are then committed too, by log matching. Each server applies committed entries, in index order, to its state machine; the leader then answers the client.</p>
<p>The phrase "current term" matters. An entry from an earlier term that happens to be on a majority is <em>not</em> yet safe: it can still be overwritten. The Raft paper gives this sequence on five servers whose logs all start as [1]. S1 leads term 2 and appends an entry at index 2, which reaches only S2 before S1 crashes: S1 and S2 hold [1, 2]. S5 wins term 3 with votes from S3 and S4 (their logs, [1], are no more up to date than its own), appends an entry of term 3 at index 2, and crashes before sending it: S5 holds [1, 3]. S1 recovers, wins term 4 with votes from S2 and S3, and sends its term-2 entry to S3. Now [1, 2] is on S1, S2 and S3, a majority. If S1 crashes now, S5 can win term 5: its last term, 3, is larger than everyone else's, so by rule 3 S2, S3 and S4 all vote for it, and as leader it overwrites index 2 everywhere with its term-3 entry. An entry stored on a majority has been lost. A new leader therefore commits old entries only indirectly, by committing an entry of its own term after them; in practice it appends a no-op entry as soon as it is elected. (Had S1 first got an entry of term 4 onto a majority, S5 could not have won: some voter in every majority would have a last term of 4, larger than S5's 3.)</p>

<h4>Why committed entries survive</h4>
<p>Suppose entry <em>e</em> was committed in term <em>T</em>: it is on a majority <em>M</em>. Take any leader <em>L</em> of a later term. It won votes from a majority <em>V</em>, and <em>M</em> and <em>V</em> share a server <em>s</em>. Server <em>s</em> held <em>e</em> when it voted (it received <em>e</em> before voting in the later term, since a server that has seen the later term rejects term-<em>T</em> messages). Rule 3 says <em>L</em>'s log was at least as up to date as <em>s</em>'s. Why must <em>L</em>'s log then contain <em>e</em>? Suppose not, and take <em>L</em> to be the leader of the <em>first</em> term after <em>T</em> whose leader lacks <em>e</em>; so every leader of a term from <em>T</em> up to <em>L</em>'s has <em>e</em>. Let <em>X</em> be the term of <em>L</em>'s last entry and <em>Y</em> that of <em>s</em>'s. Terms never decrease along a log, and <em>s</em> holds <em>e</em>, so <em>Y</em> ≥ <em>T</em>. Rule 3 leaves two cases.</p>
<ul>
<li><em>X</em> = <em>Y</em>, and <em>L</em>'s last index is at least <em>s</em>'s. Both last entries were created by the one leader of term <em>X</em>, which never deletes entries from its own log, so that leader's log holds both. By log matching, <em>L</em>'s log agrees with that leader's up to <em>L</em>'s last entry, so it has <em>s</em>'s last entry too, and then agrees with <em>s</em>'s log up to there, <em>e</em> included.</li>
<li><em>X</em> &gt; <em>Y</em> ≥ <em>T</em>. <em>L</em>'s last entry was created by the leader of term <em>X</em>, a term after <em>T</em> and before <em>L</em>'s, so by the choice of <em>L</em> that leader had <em>e</em>, at an index before the entries it created. By log matching <em>L</em>'s log agrees with that leader's up to <em>L</em>'s last entry, so <em>L</em> has <em>e</em>.</li>
</ul>
<p>Either way <em>L</em> has <em>e</em>, a contradiction. This is the <strong>leader completeness</strong> property: every committed entry is in the log of every later leader. Leaders never delete entries from their own logs, so committed entries are never lost.</p>

<h3>A trace on five servers</h3>
<p>Servers S1 to S5. Logs are written as the terms of their entries, so [1, 1] means two entries, both from term 1.</p>
<table>
<tr><th>Step</th><th>What happens</th><th>S1</th><th>S2</th><th>S3</th><th>S4</th><th>S5</th></tr>
<tr><td>1</td><td>S1 leads term 1; appends <code>x=3</code> at index 1; S2 and S3 store it. Three of five: committed.</td><td>[1]</td><td>[1]</td><td>[1]</td><td>[ ]</td><td>[ ]</td></tr>
<tr><td>2</td><td>S1 appends <code>y=7</code> at index 2; only S2 stores it; S1 crashes.</td><td>[1, 1]</td><td>[1, 1]</td><td>[1]</td><td>[ ]</td><td>[ ]</td></tr>
<tr><td>3</td><td>S3 times out first: term 2, votes for itself. S2 refuses (its last entry has the same term, 1, and a larger index, 2 &gt; 1). S4 and S5 grant (empty logs). Three votes: S3 leads term 2.</td><td>down</td><td>[1, 1]</td><td>[1]</td><td>[ ]</td><td>[ ]</td></tr>
<tr><td>4</td><td>S3 appends <code>z=1</code> at index 2, term 2.</td><td>down</td><td>[1, 1]</td><td>[1, 2]</td><td>[ ]</td><td>[ ]</td></tr>
<tr><td>5</td><td>To S2: prev (1, term 1) matches; S2's index 2 has term 1, conflicting with term 2: deleted and replaced.</td><td>down</td><td>[1, 2]</td><td>[1, 2]</td><td>[ ]</td><td>[ ]</td></tr>
<tr><td>6</td><td>To S4: prev (1, term 1) fails (S4 has no index 1); S3 sets next_index to 1 and resends with prev (0, –) and both entries; S4 accepts.</td><td>down</td><td>[1, 2]</td><td>[1, 2]</td><td>[1, 2]</td><td>[ ]</td></tr>
<tr><td>7</td><td>Index 2 (term 2, the current term) is on S2, S3 and S4: a majority. Committed, and index 1 with it.</td><td>down</td><td>[1, 2]</td><td>[1, 2]</td><td>[1, 2]</td><td>[ ]</td></tr>
</table>
<p>The entry <code>y=7</code> was lost, and that is correct: it was never on a majority, so it was never committed and its client was never told it succeeded. The client will time out and retry, which is why Lesson 1's request IDs matter here too. Step 3 is safety at work: had S4 (empty log) been the candidate, S2 and S3 would have refused it, so with S1 down it could gather only its own vote and S5's: no majority, and the committed <code>x=3</code> stays safe. When S1 comes back with term 1, the first AppendEntries from S3 carries term 2, and S1 becomes a follower; its index 2 is then replaced as S2's was.</p>
<p>The rule for deciding whether a voter's log is more up to date is short enough to write here; the programming problems build the rest of the vote and append handlers.</p>
<pre><code>def at_least_as_up_to_date(cand_last_term, cand_last_index, my_last_term, my_last_index):
    if cand_last_term != my_last_term:
        return cand_last_term &gt; my_last_term
    return cand_last_index &gt;= my_last_index

print(at_least_as_up_to_date(1, 1, 1, 2))   # False: S3 asking S2 in step 3
print(at_least_as_up_to_date(1, 1, 0, 0))   # True: S3 asking S4 (an empty log has last term 0)
print(at_least_as_up_to_date(2, 1, 1, 5))   # True: a newer last term beats a longer log</code></pre>
<p>Two practical details. Followers redirect clients to the leader; and a leader that can't reach a majority (it is on the small side of a partition) can't commit anything, so clients there see their requests time out: Raft chooses consistency over availability, in CAP's terms (Lesson 5). Changing the set of servers (adding a sixth) needs care, since old and new majorities might not overlap during the change; Raft adds or removes one server at a time.</p>
`,
      terms: [
        ["Consensus", "Nodes proposing values and all deciding the same proposed value (agreement, validity), with every non-crashed node eventually deciding (termination)."],
        ["Safety and liveness", "A safety property says nothing bad ever happens; a liveness property says something good eventually happens."],
        ["State machine replication", "Making replicas identical by having each apply the same sequence of deterministic commands."],
        ["Total order broadcast", "Delivering the same messages in the same order at every node; equivalent to repeated consensus."],
        ["Majority quorum", "More than half of the nodes; any two majorities overlap, and 2f + 1 nodes tolerate f crashes."],
        ["FLP impossibility", "In the asynchronous model, no deterministic consensus algorithm can guarantee termination if one node may crash."],
        ["Term (Raft)", "A numbered period with at most one leader; servers adopt larger terms and reject messages from smaller ones."],
        ["Election timeout", "A randomized wait after which a follower that hasn't heard from a leader starts an election."],
        ["Election restriction", "A server votes only for a candidate whose log is at least as up to date: a larger last term, or the same last term and an index at least as large."],
        ["AppendEntries consistency check", "A follower accepts new entries only if its log has an entry matching the leader's previous index and term."],
        ["Committed entry (Raft)", "An entry that will never be removed: one from the leader's current term stored on a majority, and every entry before it."],
        ["Leader completeness", "Every committed entry is present in the log of every later leader."]
      ],
      quiz: [
        { q: "How many crashed servers can a 5-server Raft cluster tolerate while still committing entries?", choices: ["1", "2", "3", "4"], answer: 1, why: "A majority of 5 is 3, so up to 2 may be down." },
        { q: "What does the FLP result say?", choices: ["Consensus needs synchronized clocks", "In an asynchronous system with one possible crash, no deterministic algorithm guarantees termination", "Consensus is impossible in practice", "Tolerating f crashes needs 3f + 1 nodes"], answer: 1, why: "It rules out guaranteed termination in the asynchronous model; practical algorithms stay safe and terminate when the network behaves." },
        { q: "A follower in term 5 receives AppendEntries with term 4. What does it do?", choices: ["Accepts it", "Rejects it, replying with term 5", "Becomes a candidate", "Adopts term 4"], answer: 1, why: "Requests with a smaller term are rejected; the reply tells the old leader it is out of date." },
        { q: "Voter's log ends with an entry of term 3 at index 7. Which candidate gets its vote (if it hasn't voted this term)?", choices: ["Last term 2, index 10", "Last term 3, index 6", "Last term 3, index 7", "Last term 1, index 20"], answer: 2, why: "Same last term and an index at least as large. A larger index can't make up for an older last term." },
        { q: "A new leader in term 4 finds that an entry from term 2 is stored on a majority. Is it committed?", choices: ["Yes, any entry on a majority is committed", "Not by that alone: the leader commits it only by committing an entry of term 4 after it", "No, it must be deleted", "Only if the client confirms"], answer: 1, why: "Only entries of the current term are committed by counting replicas; earlier ones are committed indirectly." },
        { q: "Why does each server write current_term and voted_for to disk before replying?", choices: ["For speed", "So that after a restart it can't vote twice in the same term", "So that clients can read them", "Because Raft needs synchronized clocks"], answer: 1, why: "A server that forgot its vote could vote for a second candidate in the same term, allowing two leaders." }
      ],
      practice: [
        {
          q: `<p>A follower's log (terms by index, starting at 1) is [1, 1, 2, 2, 2]. For each AppendEntries, say whether it is accepted and give the log afterwards: (a) prev = (3, term 2), entries [term 3 at index 4]; (b) prev = (5, term 3), entries [term 3]; (c) prev = (2, term 1), entries [terms 2, 2] at indexes 3 and 4; (d) prev = (0, –), entries [1, 1, 3].</p>`,
          a: `<p>(a) Index 3 has term 2: accepted. Index 4 holds term 2, which conflicts with the new term 3, so indexes 4 and 5 are deleted and term 3 appended: [1, 1, 2, 3]. (b) Index 5 has term 2, not 3: rejected; the log is unchanged. (c) Index 2 has term 1: accepted. The new entries at 3 and 4 match existing ones (same term), so nothing is deleted and nothing changes: [1, 1, 2, 2, 2]. The follower must <em>not</em> truncate index 5 here, because this might be an old, delayed message, and deleting entries it already has would lose work. (d) prev index 0 always matches. Indexes 1 and 2 match; index 3 has term 2 versus 3: delete from 3 on and append: [1, 1, 3].</p>`
        },
        {
          q: `<p>Five servers. S1's log is [1, 1, 2], S2's [1, 1, 2], S3's [1, 1], S4's [1, 3] and S5's [1]. All are in term 3 or less, and an election for term 4 starts. Which servers could win (getting votes from a majority, counting their own)?</p>`,
          hint: `<p>Compare last terms first. Each candidate needs two other voters whose logs aren't more up to date than its own.</p>`,
          a: `<p>Last (term, index): S1 (2, 3), S2 (2, 3), S3 (1, 2), S4 (3, 2), S5 (1, 1). S4 has the largest last term, so every server would vote for it: S4 can win. S1 is at least as up to date as S1, S2, S3 and S5 (not S4): it can win with, say, S2, S3 and S5. S2 likewise. S3 is at least as up to date only as itself and S5: two votes, not enough. S5 only as itself: no. So S1, S2 or S4.</p>`
        },
        {
          q: `<p>A leader in term 6 has log length 10. Its followers' match indexes (the highest index known to be replicated on each) are S2: 10, S3: 8, S4: 7, S5: 4, and the terms of the leader's entries 7 to 10 are 5, 6, 6, 6. Its commit index is currently 6. What is the new commit index? What would it be if entry 8 had term 5?</p>`,
          a: `<p>The leader itself has all 10. Index 10 is on S1 and S2: 2 of 5. Index 8 is on S1, S2 and S3: 3, a majority, and has term 6 (the current term), so the commit index becomes 8 (index 9 is on only S1 and S2). If entry 8 had term 5, it could not be committed by counting; the next candidate is index 7, also on a majority (S1, S2, S3, S4) but of term 5 too, so the commit index would stay at 6 until an entry of term 6 reached a majority.</p>`
        },
        {
          q: `<p>A three-server cluster is split by a partition: the leader L (term 2) is alone on one side; F1 and F2 are on the other. Describe what happens on each side over the next few seconds, and what happens when the partition heals.</p>`,
          a: `<p>L keeps accepting client commands and appending them to its log, but it can't get them onto a majority, so it commits nothing and its clients time out. On the other side, F1 and F2 stop hearing heartbeats; one (say F1) times out, starts term 3, gets F2's vote (its log is at least as up to date, because L's uncommitted entries never reached them) and becomes leader. Clients that reach F1 succeed. When the partition heals, L sends AppendEntries with term 2 or receives a message with term 3; either way it learns of term 3 and becomes a follower. Its uncommitted entries from term 2 conflict with F1's log and are overwritten. No committed entry is lost, and there were never two leaders able to commit in the same term.</p>`
        }
      ],
      sources: ["raft14", "flp85", "kleppmannds", "mit6824"]
    },
    {
      id: "di5",
      title: "Consensus II and coordination",
      minutes: 90,
      summary: "Paxos in outline, traced on three acceptors and compared with Raft; linearizability, the strongest single-object consistency model, and how it differs from CS 340's serializability; what coordination services such as ZooKeeper and etcd provide, and why locks need leases and fencing tokens; the CAP theorem stated precisely, with its proof idea and its limits; and PACELC, which adds the everyday trade-off between latency and consistency.",
      notes: `
<p>Lesson 4 built a replicated log with Raft. This lesson looks at the older algorithm that Raft was designed to replace, then asks what "consistent" should mean for a replicated system, and what the services built on consensus offer the programmers who use them.</p>

<h3>Paxos in outline</h3>
<p>Leslie Lamport described Paxos in a paper written in 1989 and finally published in 1998, framed as the parliament of a fictional Greek island; his 2001 "Paxos Made Simple" restated it plainly. It was the standard consensus algorithm for twenty years and underlies Google's Chubby lock service and Spanner. <em>Single-decree</em> Paxos chooses one value. Nodes play three roles (one machine often plays all three): <strong>proposers</strong> propose values, <strong>acceptors</strong> vote, and <strong>learners</strong> find out what was chosen. A value is <strong>chosen</strong> when a majority of acceptors have accepted it in the same round.</p>
<p>Each proposal has a <strong>proposal number</strong>, unique and totally ordered (for example a pair (counter, proposer id), compared as a tuple). Each acceptor stores, on disk, the highest number it has promised and the highest-numbered proposal it has accepted, if any.</p>
<ol>
<li><strong>Prepare.</strong> A proposer picks a number <em>n</em> larger than any it has seen and sends <code>prepare(n)</code> to the acceptors. An acceptor that hasn't already promised <em>n</em> or a larger number promises not to accept any proposal numbered below <em>n</em>, and replies with the highest-numbered proposal it has already accepted (number and value), if any. Otherwise it rejects the request; a repeated <code>prepare(n)</code> with the same <em>n</em> is rejected too.</li>
<li><strong>Accept.</strong> If a majority promise, the proposer sends <code>accept(n, v)</code>, where <em>v</em> is the value of the highest-numbered proposal reported in the promises, or, if none of them had accepted anything, any value it likes (its own). An acceptor accepts unless it has since promised a number greater than <em>n</em> (having promised <em>n</em> itself is fine).</li>
</ol>
<p>The key is the choice of <em>v</em> in step 2. If some value might already have been chosen, it was accepted by a majority, and the proposer's majority of promises includes at least one of those acceptors, which reports it. Why the <em>highest-numbered</em> report? Suppose <em>v</em> was chosen in round <em>m</em>. We show, by strong induction on <em>n</em>, that every proposal numbered <em>n</em> &gt; <em>m</em> carries <em>v</em>, assuming it for every number between <em>m</em> and <em>n</em>. The proposer of <em>n</em> has promises from a majority, which includes an acceptor <em>a</em> that accepted (<em>m</em>, <em>v</em>). It accepted it before promising <em>n</em>, since after the promise it would refuse a proposal numbered <em>m</em> &lt; <em>n</em>; so <em>a</em> reports a proposal numbered at least <em>m</em>. Every report is numbered below <em>n</em>. So the highest-numbered report has a number <em>k</em> with <em>m</em> ≤ <em>k</em> &lt; <em>n</em>, and its value is <em>v</em>: if <em>k</em> = <em>m</em> because each round proposes one value, and otherwise by the induction hypothesis. Reports numbered below <em>m</em> can carry other values, which is why the proposer must take the highest one, not any one.</p>
<p>A trace with acceptors A1, A2, A3. Proposer P1 sends <code>prepare(1)</code> to A1 and A2, which promise and report nothing accepted. P1 sends <code>accept(1, "x")</code>, which reaches only A1 before P1 crashes. Nothing is chosen yet (one acceptor out of three). Proposer P2 sends <code>prepare(2)</code>:</p>
<ul>
<li>If its promises come from A2 and A3, neither reports an accepted value, so P2 may propose its own value: <code>accept(2, "y")</code> reaches A2 and A3, and "y" is chosen. A1 still holds (1, "x"), which is harmless: "x" was never on a majority.</li>
<li>If instead its promises come from A1 and A2, A1 reports (1, "x"), and P2 must propose "x": <code>accept(2, "x")</code>. P2 finishes P1's work.</li>
</ul>
<p>Either way only one value is ever chosen. Two proposers can also <em>duel</em>: each one's prepare overtakes the other's accept, round after round, and nothing is chosen. That is FLP (Lesson 4) in action; random delays before retrying make it unlikely.</p>
<p>A log needs one decision per slot. <strong>Multi-Paxos</strong> elects a stable leader that runs phase 1 once for all future slots and then needs only phase 2 (one round trip to a majority) for each command. Multi-Paxos with a stable leader looks very like Raft, and the two are close cousins. The differences are in what the papers specify.</p>
<table>
<tr><th></th><th>Raft</th><th>Multi-Paxos (as usually described)</th></tr>
<tr><td>Leader</td><td>Required; elected with terms and the election restriction</td><td>An optimization; any proposer may run phase 1</td></tr>
<tr><td>Log</td><td>No holes; a leader's log always contains every committed entry</td><td>Slots decided independently, so there can be gaps a new leader must fill</td></tr>
<tr><td>New leader catching up</td><td>Already has all committed entries (election restriction)</td><td>Runs phase 1 to learn accepted values from a majority</td></tr>
<tr><td>Specification</td><td>Complete: elections, logs, membership changes, snapshots</td><td>The core is short; real systems add many unpublished details</td></tr>
</table>

<h3>What should "consistent" mean?</h3>
<p>For a replicated store, the strongest and most intuitive answer is: it behaves as if there were one copy of the data and every operation happened instantly. Herlihy and Wing defined this in 1990 as <strong>linearizability</strong>. Every operation takes time, from its <em>invocation</em> (the client sends it) to its <em>response</em>. A history of operations is linearizable if each operation can be assigned a single point in time between its invocation and response, its <em>linearization point</em>, such that the operations, taken in the order of these points, are correct for a single copy (for a register: every read returns the value of the latest write before it).</p>
<figure class="fig"><svg viewBox="0 0 470 150" width="470" role="img" aria-label="Three clients' operations on register x as bars on a timeline from 0 to 10. A writes 1 from time 0 to 10. B reads 1 from time 2 to 4. C reads 0 from time 6 to 8.">
<g class="ln"><line x1="60" y1="130" x2="460" y2="130"/></g>
<g class="box"><rect x="60" y="20" width="400" height="22"/><rect x="140" y="60" width="80" height="22"/><rect x="300" y="100" width="80" height="22"/></g>
<g class="text">
<text x="10" y="36">A</text><text x="10" y="76">B</text><text x="10" y="116">C</text>
<text x="260" y="36" text-anchor="middle">write(x, 1)</text><text x="180" y="76" text-anchor="middle">read → 1</text><text x="340" y="116" text-anchor="middle">read → 0</text>
<text x="60" y="146" class="m" text-anchor="middle">0</text><text x="140" y="146" class="m" text-anchor="middle">2</text><text x="220" y="146" class="m" text-anchor="middle">4</text><text x="300" y="146" class="m" text-anchor="middle">6</text><text x="380" y="146" class="m" text-anchor="middle">8</text><text x="460" y="146" class="m" text-anchor="middle">10</text>
</g>
</svg><figcaption>x starts at 0. Each bar runs from an operation's invocation to its response.</figcaption></figure>
<p>Is this history linearizable? B's read must take effect between 2 and 4, and returned 1, so the write's point must be before B's point, hence before 4. C's read takes effect between 6 and 8, after the write's point, so it must return 1. It returned 0: not linearizable. Each read alone is fine (the write was in progress, so either value is plausible), but once one client has seen the new value, no later read may return the old one. A quorum store (Lesson 3) can produce exactly this history: B's read happened to reach a replica the write had reached, and C's didn't, and read repair hadn't yet happened. The first programming problem checks small histories for linearizability by searching for linearization points.</p>
<p><strong>Linearizability is not serializability.</strong> The names are easy to confuse, but they answer different questions.</p>
<table>
<tr><th></th><th>Serializability (CS 340 Lesson 7)</th><th>Linearizability</th></tr>
<tr><td>About</td><td>Transactions: groups of operations on many items</td><td>Single operations on one object</td></tr>
<tr><td>Promise</td><td>Equivalent to <em>some</em> serial order</td><td>Equivalent to an order that respects real time</td></tr>
<tr><td>Real time</td><td>Not required: a serial order may put a transaction that started later first</td><td>Required: if op 1 finishes before op 2 starts, op 1 comes first</td></tr>
</table>
<p>A system that provides both, serializable transactions in an order consistent with real time, is <strong>strictly serializable</strong>. Google's Spanner does this across continents. A single-node database using strict two-phase locking also does, because a transaction's locks are held until commit.</p>
<p>Raft gives linearizable writes: each takes effect when it is committed, which happens between the client's request and the reply. Reads need care. A leader that answers from its own state may have been deposed by a partition without knowing, and serve stale data. Safe options: send reads through the log like writes; or have the leader confirm, with one round of heartbeats to a majority, that it is still leader before answering (etcd's "ReadIndex").</p>

<h3>Coordination services</h3>
<p>Most applications don't implement consensus themselves. They use a <strong>coordination service</strong>: a small, strongly consistent key-value store replicated with consensus, such as ZooKeeper (whose protocol, Zab, is close to Raft), etcd, or Google's Chubby. A cluster of 3 or 5 servers holds kilobytes to megabytes of critical data: which node is leader, the configuration, which partition lives where. Besides linearizable writes, they offer:</p>
<ul>
<li><strong>Ephemeral keys</strong> tied to a client's session, deleted automatically when the client stops sending heartbeats. A node registers itself as a live member, or as leader, with one.</li>
<li><strong>Watches</strong>: a client is notified when a key changes, so it can react when a leader disappears.</li>
<li><strong>Compare-and-set</strong> (write a new value only if the key still holds the value you expect, atomically) and sequence numbers that increase with every change, from which locks and elections are built: to take a lock, create the lock key only if it doesn't exist yet.</li>
</ul>
<p><strong>Leases.</strong> A lock in a distributed system can't be held forever, because its holder might crash while holding it. So locks are <strong>leases</strong>: granted for a limited time, say 10 seconds, after which they expire unless renewed. A crashed holder stops renewing, and after 10 s someone else can take over.</p>
<p>Leases have a trap. Client 1 acquires the lease and is about to write to a file in shared storage. It then pauses, for 15 s, for a long garbage collection. Its lease expires; client 2 acquires it and writes. Client 1 wakes up, still believing it holds the lock (it hasn't checked a clock since before the pause), and writes too, overwriting client 2's work. Checking the lease just before writing doesn't help: the pause can come between the check and the write. Something outside the client must refuse the late write.</p>
<p>The fix is a <strong>fencing token</strong>: a number that the lock service increases every time it grants the lock (ZooKeeper's <em>zxid</em>, the sequence number it gives every change to its state, works, since granting the lock is such a change; so does the Raft log index of the grant). The client sends its token with every write, and the storage remembers the largest token it has seen and refuses smaller ones.</p>
<pre><code>class Storage:
    """A storage service that checks fencing tokens."""
    def __init__(self):
        self.max_token = 0
        self.data = {}
    def write(self, token, key, value):
        if token &lt; self.max_token:
            return False                     # from a holder whose lock has expired
        self.max_token = token
        self.data[key] = value
        return True

s = Storage()
print(s.write(33, "report", "draft by client 1"))   # True
print(s.write(34, "report", "final by client 2"))   # True
print(s.write(33, "report", "late write by client 1"))   # False
print(s.data["report"])   # final by client 2</code></pre>
<p>Without the token check, client 1's paused write would have won. The general lesson: a node can't trust its own belief that it holds a lock or is the leader, because time may have passed without its knowledge. Correctness must come from a check the rest of the system enforces, as Raft's terms are checked by every follower.</p>

<h3>The CAP theorem, precisely</h3>
<p>CS 340 Lesson 8 stated CAP informally. Gilbert and Lynch's 2002 proof uses precise definitions:</p>
<ul>
<li><strong>Consistency</strong> means linearizability (not the C of ACID, which is about application invariants).</li>
<li><strong>Availability</strong> means every request received by a node that hasn't failed eventually gets a non-error response.</li>
<li><strong>Partition tolerance</strong>: the network may lose any number of messages between groups of nodes.</li>
</ul>
<p><strong>Theorem:</strong> no system provides consistency and availability in a network that may partition. <strong>Proof idea:</strong> take two replicas, G1 and G2, of a register holding 0, and partition them so that no messages pass. A client writes 1 at G1; by availability, G1 must eventually acknowledge it, without being able to tell G2. Then a client reads at G2; by availability, G2 must answer, and it can only answer 0, because nothing about the write has reached it. The write completed before the read began, so linearizability required 1. Contradiction.</p>
<p>So a system must choose, <em>during a partition</em>: a <strong>CP</strong> system (Raft, ZooKeeper, etcd) refuses requests on the minority side and stays linearizable; an <strong>AP</strong> system (Dynamo-style stores with sloppy quorums) answers everywhere and lets replicas diverge, reconciling afterwards (Lesson 3). A system can also be neither: one that refuses some requests during a partition and serves stale data from others gives up both C and A, and CAP's labels then say little about it.</p>
<p>The theorem is often quoted as "pick two of three", which misleads. Partitions aren't optional, so the real choice is only what to do when one happens. CAP also covers only one consistency model and one kind of failure: it says nothing about the many models between linearizability and eventual consistency, nothing about crashed nodes or slow ones, and nothing about latency. Eric Brewer, who conjectured it, wrote in 2012 that its main value was to make designers think about partitions explicitly.</p>
<p><strong>PACELC</strong> (Daniel Abadi, 2012) adds the case CAP leaves out: if there is a <strong>P</strong>artition, choose between <strong>A</strong>vailability and <strong>C</strong>onsistency; <strong>E</strong>lse, in normal operation, choose between <strong>L</strong>atency and <strong>C</strong>onsistency. Without any failure, a linearizable write must still wait for a majority (a round trip, possibly across continents, Lesson 1), while a write to the nearest replica returns at once. Dynamo-style stores are PA/EL: available in a partition and fast otherwise, at the cost of consistency both times. etcd and Spanner are PC/EC: consistent always, paying in availability during partitions and in latency otherwise. Most systems let applications choose per request, as quorum settings do.</p>
`,
      terms: [
        ["Paxos", "A consensus algorithm with proposers, acceptors and learners; a value is chosen when a majority of acceptors accept it in the same numbered round."],
        ["Prepare / accept phases", "Paxos's two rounds: collect promises (and previously accepted values) from a majority, then ask a majority to accept a value."],
        ["Multi-Paxos", "Paxos for a log, with a stable leader that runs the prepare phase once and then one accept round per command."],
        ["Linearizability", "Each operation appears to take effect at one instant between its invocation and response, as if on a single copy."],
        ["Strict serializability", "Serializable transactions whose serial order respects real time."],
        ["Coordination service", "A small consensus-replicated store, such as ZooKeeper or etcd, offering linearizable writes, ephemeral keys and watches."],
        ["Lease", "A lock or role granted for a limited time, which expires unless renewed."],
        ["Fencing token", "A number that increases with each lock grant; storage rejects writes carrying a token smaller than one it has seen."],
        ["CAP theorem", "In a network that may partition, a system can't be both linearizable and available to every non-failed node."],
        ["PACELC", "During a partition, choose availability or consistency; otherwise, choose latency or consistency."]
      ],
      quiz: [
        { q: "In Paxos phase 2, a proposer's promises report accepted proposals (3, \"a\") and (5, \"b\"). Which value must it propose?", choices: ["Its own value", "\"a\"", "\"b\"", "Either"], answer: 2, why: "It must use the value of the highest-numbered accepted proposal among the promises." },
        { q: "Write(x, 1) runs from time 0 to 10. Read A runs 1–3 and returns 1; read B runs 5–7 and returns 0. Linearizable?", choices: ["Yes, the write was in progress", "No: B starts after A finished, so it can't return the older value", "Yes, if B went to another replica", "Only under serializability"], answer: 1, why: "A's point is before 3 and after the write's point; B's point is after 5, so it must also see 1." },
        { q: "What does serializability not require that linearizability does?", choices: ["That transactions be atomic", "That the equivalent order respect real time", "That reads return written values", "That writes be durable"], answer: 1, why: "Serializability allows any serial order; linearizability requires one consistent with when operations happened." },
        { q: "A client holding a lease pauses for longer than the lease. What stops its late write from corrupting data?", choices: ["Checking the lease before writing", "A fencing token checked by the storage service", "Synchronized clocks", "A longer lease"], answer: 1, why: "The pause can fall between any check and the write, so the storage must reject writes with an old token." },
        { q: "In the CAP theorem, what does C mean?", choices: ["The C of ACID", "Linearizability", "Eventual consistency", "Causal consistency"], answer: 1, why: "Gilbert and Lynch's proof defines consistency as linearizability of a single register." },
        { q: "A Dynamo-style store answers from the nearest replica normally and stays writable during partitions. Its PACELC class is:", choices: ["PC/EC", "PA/EL", "PC/EL", "PA/EC"], answer: 1, why: "Available during partitions; low latency rather than consistency otherwise." }
      ],
      practice: [
        {
          q: `<p>Three acceptors. A1 has accepted (2, "red"), A2 has accepted (4, "blue") and A3 has accepted nothing; A2 and A3 have promised 4 (the <code>accept(4, "blue")</code> sent to A3 was lost) and A1 has promised 2. Proposer P sends <code>prepare(5)</code>. (a) What does P propose if A1 and A3 answer first? (b) If A1 and A2 answer first? (c) Could "red" already have been chosen?</p>`,
          a: `<p>(a) Promises from A1 (reporting (2, "red")) and A3 (nothing): P must propose "red" with <code>accept(5, "red")</code>. (b) A1 reports (2, "red") and A2 (4, "blue"): the higher number is 4, so P proposes "blue". (c) "red" was accepted in round 2 by A1 only; for it to have been chosen, a majority (say A1 and A3) must have accepted it in round 2, but A3 has accepted nothing and A2 accepted a different value, so no. "blue" isn't chosen either (only A2). That is why, in (a), proposing "red" is safe: nothing has been chosen, and Paxos only needs every <em>later</em> proposal to agree with any value that <em>was</em> chosen.</p>`
        },
        {
          q: `<p>Register x starts at 0. Operations (invocation–response): W1 = write(x, 1) at 0–4; W2 = write(x, 2) at 2–6; R1 = read at 5–7 returns 1; R2 = read at 8–9 returns 2. Is the history linearizable? If so, give linearization points in order.</p>`,
          hint: `<p>R1 returns 1, so W2's point must come after R1's, or before W1's.</p>`,
          a: `<p>Yes. Since R1 returns 1, W1's point must come before R1's, and W2's point must not fall between them. Since R2 returns 2, W2's point must come before R2's and after W1's. Choose W1 at 3, R1 at 5, W2 at 5.5, R2 at 8. Each point lies inside its operation's interval (W1 0–4, R1 5–7, W2 2–6, R2 8–9), and in the order W1, R1, W2, R2 a single register gives R1 = 1 and R2 = 2, as observed. (Putting W2 before W1, say at 2.5, would also give R1 = 1, but then R2 would return 1.)</p>`
        },
        {
          q: `<p>A lock service grants 10-second leases with fencing tokens. Client A gets token 7 at time 0 and pauses at time 3. Its lease expires at 10, and client B gets token 8 at 12 and writes at 13. A resumes at 20 and writes. B crashes at 15, so its lease expires at 22; client C gets token 9 at 25 and writes at 26. A write that B sent at 14 was delayed in the network and arrives at 30. Which writes does the storage accept? What would happen without fencing?</p>`,
          a: `<p>13, B with token 8: accepted (8 ≥ 0); max token 8. 20, A with token 7: rejected (7 &lt; 8). 26, C with token 9: accepted; max token 9. 30, B's delayed write with token 8: rejected (8 &lt; 9). Without fencing, all four writes would be applied in arrival order, so A's stale write at 20 would overwrite B's, and B's delayed write at 30 would overwrite C's, the current holder's. Fencing makes the storage's state follow the order of lock grants, whatever the pauses and network delays.</p>`
        },
        {
          q: `<p>For each system, say which side of CAP it takes during a partition (if either), and its PACELC class: (a) a three-node etcd cluster; (b) a Cassandra cluster with <em>N</em> = 3, <em>W</em> = 1, <em>R</em> = 1 and sloppy quorums; (c) a single PostgreSQL server with asynchronous followers that serve reads.</p>`,
          a: `<p>(a) CP: the minority side can't commit and refuses requests. PC/EC: every write waits for a majority even without failures. (b) AP: any reachable node accepts writes and reads, with no overlap guarantee. PA/EL: fast single-replica operations normally too. (c) Writes go only to the leader, so a client cut off from it can't write (not available for writes), and reads from followers can be stale (not linearizable): it is neither CP nor AP in the strict sense, which shows CAP's categories don't fit every design. In PACELC terms its follower reads are EL: lower latency, possibly stale.</p>`
        }
      ],
      sources: ["paxossimple", "kleppmann16lock", "brewer12", "kleppmannds", "ddia"]
    },
    {
      id: "di6",
      title: "Partitioning and distributed transactions",
      minutes: 90,
      summary: "Splitting data that doesn't fit on one machine: range and hash partitioning and their hot spots; why hash-mod-N moves almost every key when N changes; consistent hashing and virtual nodes, measured; rebalancing with fixed partitions or splits, and routing requests. Then transactions that span partitions: two-phase commit, its crash cases and why it blocks, and sagas with compensating actions as the alternative when blocking is unacceptable.",
      notes: `
<p>Replication (Lesson 3) puts the same data on several machines. <strong>Partitioning</strong>, also called <strong>sharding</strong>, puts <em>different</em> data on different machines, so that a dataset too big for one machine, or a write load too heavy for one leader, can be spread over many. The two are combined: each partition is replicated, so a cluster of 30 machines might hold 10 partitions, each on 3 replicas. CS 340 Lesson 8 mentioned both methods of partitioning in a sentence; this lesson works them out.</p>

<h3>Range and hash partitioning</h3>
<p><strong>Range partitioning</strong> gives each partition a contiguous range of keys, like the volumes of an encyclopedia: names A–F on partition 1, G–M on partition 2, and so on. Keys stay sorted, so a range scan ("all orders from March") touches only the partitions covering the range. The boundaries must follow the data, not the alphabet, to keep partitions equal in size. The danger is <strong>hot spots</strong>: if the key is a timestamp, every new write goes to the partition holding "now", while the others sit idle. A common fix is to put something else first in the key (the sensor's ID, then the time), so writes spread out while each sensor's readings stay together.</p>
<p><strong>Hash partitioning</strong> applies a hash function to the key and partitions by hash value. A good hash spreads keys evenly whatever their pattern, which removes the timestamp hot spot, but destroys order: a range scan must ask every partition. (A single extremely popular key, such as a celebrity's account, is still a hot spot under any scheme; applications sometimes split such a key by appending a small random number and reading all the pieces.)</p>
<p>The obvious way to map a hash to one of <em>N</em> nodes is hash mod <em>N</em>. It has a fatal flaw: when <em>N</em> changes, almost every key moves. A key stays put only if <em>h</em> mod 4 = <em>h</em> mod 5, which happens for 4 of every 20 consecutive values of <em>h</em> (0, 1, 2 and 3), so going from 4 nodes to 5 moves 80% of the data, when moving 20% to the new node would have been enough.</p>
<pre><code>import hashlib

def h(s):
    """A stable 64-bit hash of a string (Python's built-in hash() changes between runs)."""
    return int.from_bytes(hashlib.sha256(s.encode()).digest()[:8], "big")

keys = [f"user{i}" for i in range(10000)]
moved = sum(h(k) % 4 != h(k) % 5 for k in keys)
print(moved / len(keys))   # 0.8036</code></pre>
<p>(<code>int.from_bytes(b, "big")</code> reads bytes as a big-endian unsigned integer, CS 210 Lesson 1's byte order. Taking 8 bytes of SHA-256, CS 380 Lesson 3, gives a well-mixed 64-bit number; any good hash would do, since nothing here needs to resist an attacker. A fixed hash is not the randomly chosen function that hashing's proofs assume; it behaves like one only on keys not chosen against it. CS 430 Lesson 5, taken alongside this course, discusses when that is enough.)</p>

<h3>Consistent hashing</h3>
<p><strong>Consistent hashing</strong> (Karger and colleagues, 1997, for web caches) moves only the keys it must. Picture the hash values 0 to 2<sup>64</sup> − 1 arranged in a circle, the <em>ring</em>. Each node is placed on the ring at the hash of its name. A key belongs to the first node at or after the key's hash going clockwise, wrapping around from the top back to 0. When a node joins, it takes over only the keys between its predecessor on the ring and itself; when a node leaves, its keys pass to its successor. Nothing else moves.</p>
<figure class="fig"><svg viewBox="0 0 310 230" width="310" role="img" aria-label="A ring of hash values with nodes A, B, C and D placed on it. Keys k1 and k2 are shown going clockwise to the next node. A new node E is inserted between A and B and takes only the keys in the arc from A to E.">
<g class="ln"><circle cx="150" cy="115" r="85"/></g>
<g class="dot"><circle cx="150" cy="30" r="6"/><circle cx="235" cy="115" r="6"/><circle cx="150" cy="200" r="6"/><circle cx="65" cy="115" r="6"/></g>
<g class="hl"><circle cx="210" cy="55" r="6"/><path d="M150,30 A85,85 0 0,1 210,55"/></g>
<g class="text"><text x="150" y="20" text-anchor="middle">A</text><text x="250" y="120">B</text><text x="150" y="222" text-anchor="middle">C</text><text x="42" y="120">D</text><text x="222" y="48">E (new)</text>
<text x="222" y="198" class="m">k1 → C</text><text x="28" y="50" class="m">k2 → A</text></g>
<g class="soft"><circle cx="208" cy="177" r="4"/><circle cx="92" cy="54" r="4"/></g>
</svg><figcaption>Nodes and keys on one ring of hash values. Each key goes clockwise to the next node. When E joins between A and B, it takes only the highlighted arc from A to E, which used to belong to B; every other key stays where it was.</figcaption></figure>
<p>With one point per node, the arcs are uneven: four random points on a circle rarely split it into four equal parts. The fix is <strong>virtual nodes</strong>: place each physical node at many points (say 100, at the hashes of "A#0", "A#1", …). Each node then owns many small arcs, whose total length is close to 1/<em>N</em> of the ring, and a joining node takes small pieces from <em>every</em> existing node rather than a big piece from one. A measurement with 10,000 keys:</p>
<pre><code>import bisect

class Ring:
    def __init__(self, nodes, vnodes=1):
        self.points = sorted((h(f"{n}#{v}"), n) for n in nodes for v in range(vnodes))
        self.hashes = [p for p, _ in self.points]
    def lookup(self, key):
        i = bisect.bisect_left(self.hashes, h(key)) % len(self.points)   # first point at or after h(key)
        return self.points[i][1]

def loads(ring):
    count = {}
    for k in keys:
        n = ring.lookup(k)
        count[n] = count.get(n, 0) + 1
    return dict(sorted(count.items()))

nodes = ["A", "B", "C", "D"]
print(loads(Ring(nodes)))   # {'A': 1283, 'B': 3344, 'C': 4644, 'D': 729}
print(loads(Ring(nodes, vnodes=100)))   # {'A': 2705, 'B': 2767, 'C': 2181, 'D': 2347}
for v in (1, 100):
    old, new = Ring(nodes, v), Ring(nodes + ["E"], v)
    print(v, sum(old.lookup(k) != new.lookup(k) for k in keys) / len(keys))
old, new = Ring(nodes), Ring(nodes + ["E"])
print({(old.lookup(k), new.lookup(k)) for k in keys if old.lookup(k) != new.lookup(k)})   # {('C', 'E')}</code></pre>
<pre data-label="Output"><code>1 0.2854
100 0.2057</code></pre>
<p><code>bisect.bisect_left(a, x)</code>, from the standard library, does a binary search (CS 201) in the sorted list <code>a</code> and returns the position of the first element greater than or equal to <code>x</code> (its twin <code>bisect_right</code> returns the first element strictly greater); taking it mod the number of points wraps past the top of the ring. With one point per node, the busiest node (C) has 4,644 keys and the idlest (D) 729, a factor of six. With 100 virtual nodes each, the loads are within about 25% of each other (the ideal is 2,500). Adding a fifth node moves 20.6% of the keys, close to the ideal 1/5, all of them to the new node; with one point per node, E happened to land in the middle of C's large arc and took 28.5%, all from C: the last line lists each (old owner, new owner) pair among the moved keys, and there is only one. Dynamo, Cassandra and Riak use consistent hashing with virtual nodes; each key is stored on the first <em>N</em> distinct physical nodes clockwise from its hash, its <em>preference list</em>, which gives Lesson 3's <em>N</em> replicas.</p>

<h3>Rebalancing and routing</h3>
<p>Two other common ways to rebalance:</p>
<ul>
<li><strong>Many fixed partitions.</strong> Create far more partitions than nodes, say 1,000 for 10 nodes, and assign whole partitions to nodes. A new node takes some partitions from each existing node; keys never change partition, only partitions change node. Elasticsearch and Couchbase work this way. The number of partitions is fixed at the start, so it must be chosen for the largest the cluster will grow to.</li>
<li><strong>Dynamic splitting.</strong> For range partitioning, split a partition in two when it grows past a size limit, like a B+ tree node splitting (CS 340 Lesson 5), and move one half elsewhere. HBase and Google's Bigtable do this.</li>
</ul>
<p>Moving data is expensive, so most systems rebalance only when an operator approves. Automatic rebalancing combined with automatic failure detection is risky: a node that is merely overloaded gets declared dead, its data is moved to the others, which overloads them in turn.</p>
<p>A client must also find the right node for a key. Either any node accepts the request and forwards it, or a routing tier forwards it, or clients cache the partition map themselves. In every case the authoritative map (which partition lives on which node) must be agreed on, and it is usually kept in a coordination service such as ZooKeeper or etcd (Lesson 5), whose watches tell routers when it changes.</p>

<h3>Transactions across partitions</h3>
<p>A bank transfer debits an account on partition 1 and credits one on partition 2. Both must happen or neither: <strong>atomic commit</strong>, the A of ACID (CS 340 Lesson 7) across machines. Each partition can commit or abort its own part with its write-ahead log; the problem is making them all decide the same way.</p>
<p><strong>Two-phase commit</strong> (2PC; not to be confused with CS 340's two-phase <em>locking</em>) uses a <strong>coordinator</strong>, often the node where the transaction started, and the partitions involved as <strong>participants</strong>. After the transaction has done its work on every participant:</p>
<ol>
<li><strong>Prepare.</strong> The coordinator sends <code>prepare</code> to every participant. A participant checks that it can commit (no constraint violated, no deadlock abort), writes all the transaction's changes and a "prepared" record to its log on disk, and votes <em>yes</em>. From that moment it has promised to commit if told to, even after a crash and restart; it keeps the transaction's locks. If it can't commit, it votes <em>no</em> and aborts its part.</li>
<li><strong>Commit or abort.</strong> If every vote is yes, the coordinator decides <em>commit</em>; if any vote is no or a participant doesn't answer in time, <em>abort</em>. It writes the decision to its own log on disk (this write is the <strong>commit point</strong>) and sends it to every participant, which applies it, releases its locks and acknowledges. The coordinator resends the decision until every participant has acknowledged.</li>
</ol>
<p>That is two rounds of messages, four messages per participant, and two forced log writes on the critical path. Crashes are handled by the logs:</p>
<table>
<tr><th>Crash</th><th>What happens</th></tr>
<tr><td>A participant, before voting</td><td>The coordinator times out and aborts.</td></tr>
<tr><td>A participant, after voting yes</td><td>On restart it finds "prepared" in its log and asks the coordinator for the decision.</td></tr>
<tr><td>The coordinator, before logging a decision</td><td>On restart it finds no decision, and aborts (<em>presumed abort</em>).</td></tr>
<tr><td>The coordinator, after logging a decision</td><td>On restart it reads the decision and resends it. Meanwhile, participants that voted yes are stuck.</td></tr>
</table>
<p>The last row is 2PC's weakness. A participant that has voted yes is <strong>in doubt</strong>: it may not commit on its own (another participant might have voted no) and may not abort on its own (the coordinator might have decided commit, and others might already have committed). It must wait for the coordinator, holding its locks, for as long as the coordinator is down, and other transactions that need those rows wait too. 2PC is a <strong>blocking</strong> protocol. Asking the other participants helps only sometimes: if any of them received the decision, or voted no, the answer is known; if all voted yes and none heard the decision, no one can decide.</p>
<p>Compare consensus: Raft needs a majority, so it survives a minority of crashes; 2PC needs <em>every</em> participant's yes and the coordinator's decision, so one crash can stop it. The standard remedy is to make the coordinator (and each participant) a Raft or Paxos group instead of a single machine, so the decision survives a crash. Google's Spanner does exactly that: 2PC over Paxos groups.</p>

<h3>Sagas</h3>
<p>When transactions span services owned by different teams or companies (an airline, a hotel, a payment provider), holding locks while waiting for everyone isn't acceptable. A <strong>saga</strong> (Garcia-Molina and Salem, 1987) splits a long transaction into a sequence of local transactions, each committed at once, and gives each one a <strong>compensating transaction</strong> that semantically undoes it: cancel the flight, refund the card. If a step fails, the saga runs the compensations of the completed steps in reverse order.</p>
<pre><code>log = []

def step(name, ok=True):
    def act():
        log.append(name)
        return ok
    return act

def run_saga(steps):
    """steps: list of (action, compensation). Run actions in order; if one fails,
    run the compensations of the completed ones in reverse order."""
    done = []
    for action, compensate in steps:
        if not action():
            for comp in reversed(done):
                comp()
            return "compensated"
        done.append(compensate)
    return "completed"

trip = [(step("book flight"), step("cancel flight")),
        (step("book hotel"), step("cancel hotel")),
        (step("charge card", ok=False), step("refund card"))]
print(run_saga(trip))   # compensated
print(log)   # ['book flight', 'book hotel', 'charge card', 'cancel hotel', 'cancel flight']</code></pre>
<p>Sagas give up isolation: between "book hotel" and "cancel hotel", other customers saw one room fewer, and if the hotel sent a confirmation email, compensation can't unsend it (it can send an apology). Compensations must themselves be retried until they succeed, so they must be idempotent (Lesson 1). And a real saga coordinator must record its progress durably, or a crash halfway through would leave a flight booked and no one responsible for cancelling it.</p>
<p class="note">Why it matters: partitioning is how systems scale, and every operation that touches several partitions pays for coordination. Good designs choose partition keys so that common operations touch one partition (all of a user's data on the user's partition), and reserve 2PC or sagas for the rare operations that must cross.</p>
`,
      terms: [
        ["Partitioning (sharding)", "Splitting a dataset so that each machine holds a different part."],
        ["Range partitioning", "Assigning each partition a contiguous range of keys; supports range scans but risks hot spots."],
        ["Hash partitioning", "Assigning keys to partitions by a hash of the key; spreads load evenly but loses key order."],
        ["Hot spot", "A partition receiving a disproportionate share of the load."],
        ["Consistent hashing", "Placing nodes and keys on a ring of hash values, each key going to the next node clockwise, so a membership change moves only nearby keys."],
        ["Virtual nodes", "Placing each physical node at many points on the ring, to even out load and spread moved keys."],
        ["Preference list", "The first N distinct physical nodes clockwise from a key's hash, which store its replicas."],
        ["Rebalancing", "Moving data between nodes as nodes join, leave or become unevenly loaded."],
        ["Atomic commit", "Ensuring that a transaction spanning several nodes either commits on all of them or aborts on all of them."],
        ["Two-phase commit (2PC)", "A coordinator collects prepare votes from every participant, then logs and sends commit (if all voted yes) or abort."],
        ["In doubt", "The state of a 2PC participant that voted yes but hasn't learned the decision; it can neither commit nor abort alone."],
        ["Saga", "A sequence of local transactions with compensating transactions that undo completed steps if a later one fails."]
      ],
      quiz: [
        { q: "Keys are timestamps and data is range-partitioned. What happens?", choices: ["Load spreads evenly", "Every new write goes to the partition holding the current time: a hot spot", "Range scans become impossible", "Partitions can't split"], answer: 1, why: "New timestamps are all adjacent, so they land in the same range." },
        { q: "With hash mod N, about what fraction of keys move when N goes from 9 to 10?", choices: ["10%", "50%", "90%", "100%"], answer: 2, why: "A key stays only if h mod 9 = h mod 10, which holds for 9 of every 90 values: 10% stay, 90% move." },
        { q: "In consistent hashing without virtual nodes, a new node joins. Which keys move?", choices: ["All keys", "A random 1/N of the keys", "Only the keys between its predecessor on the ring and itself", "Only keys on its successor's replicas"], answer: 2, why: "It takes over the arc just before it, which belonged to its successor; nothing else changes." },
        { q: "What do virtual nodes improve?", choices: ["Lookup speed", "Evenness of load, and spreading moved keys across all nodes", "Hash quality", "Durability"], answer: 1, why: "Many small arcs per node average out the randomness of positions." },
        { q: "A 2PC participant has voted yes and the coordinator has crashed. What may the participant do?", choices: ["Commit on its own", "Abort on its own", "Neither: it must wait for the decision, holding its locks", "Elect a new coordinator and commit"], answer: 2, why: "Others may have committed or voted no; only the decision settles it. This is why 2PC blocks." },
        { q: "What does a saga give up compared with a distributed transaction?", choices: ["Atomicity of each step", "Durability", "Isolation: other transactions can see intermediate states", "The ability to undo steps"], answer: 2, why: "Each step commits immediately, so its effects are visible until compensated." }
      ],
      practice: [
        {
          q: `<p>A store uses hash partitioning with 4 nodes and wants to add 2 more. Compare the fraction of data moved under (a) hash mod <em>N</em> and (b) consistent hashing with many virtual nodes. Show your reasoning.</p>`,
          a: `<p>(a) A key stays only if <em>h</em> mod 4 = <em>h</em> mod 6. Over 12 consecutive values (the least common multiple), this holds for <em>h</em> = 0, 1, 2, 3 (both give <em>h</em>) and for none of 4 to 11 (for example 4 mod 4 = 0, 4 mod 6 = 4). So 4/12 = 1/3 stay and 2/3 move. (b) The new nodes should end up with 2/6 = 1/3 of the data, and consistent hashing moves only what they take: about 1/3.</p>
<pre><code>print(sum(h(k) % 4 != h(k) % 6 for k in keys) / len(keys))   # 0.6603</code></pre>`
        },
        {
          q: `<p>A ring has points (as fractions of the ring) A at 0.10, B at 0.35, C at 0.60 and D at 0.85. (a) Which node owns a key hashing to 0.40? To 0.90? (b) What fraction of the ring does each node own? (c) Node E joins at 0.50: which keys move, and from whom? (d) With <em>N</em> = 2 replicas, what is the preference list of a key at 0.40 after E joins?</p>`,
          a: `<p>(a) 0.40 goes clockwise to C (0.60). 0.90 passes the top and wraps to A (0.10). (b) Each node owns the arc from its predecessor to itself: A owns 0.85 to 0.10 (0.25), B 0.10–0.35, C 0.35–0.60, D 0.60–0.85: 0.25 each, which is luck; random points rarely split this evenly. (c) E takes the arc 0.35 to 0.50 from C, which is left with 0.50 to 0.60. (d) Clockwise from 0.40: E (0.50), then C (0.60): [E, C].</p>`
        },
        {
          q: `<p>A transfer runs 2PC with participants P1 and P2. For each scenario, what is the outcome and how long do locks stay held? (a) P2 votes no. (b) Both vote yes; the coordinator logs commit, sends it to P1, and crashes before sending it to P2; it restarts 10 minutes later. (c) Both vote yes; the coordinator crashes before logging anything; it restarts 10 minutes later.</p>`,
          a: `<p>(a) The coordinator decides abort; P2 already aborted its part; P1 aborts on receiving the decision. Locks are released within a round trip. (b) P1 commits and releases its locks at once. P2 is in doubt for 10 minutes, holding its locks; if it asks P1, it learns "commit" and can commit, so a protocol in which participants ask each other shortens the wait here. On restart, the coordinator reads "commit" and resends it to P2. (c) No decision was logged, so on restart the coordinator aborts (presumed abort) and tells both. Both participants are in doubt for the full 10 minutes, and asking each other doesn't help, since each voted yes and neither heard a decision.</p>`
        },
        {
          q: `<p>Design compensations for a saga that (1) reserves stock in a warehouse, (2) charges a card, (3) books a courier, (4) emails a confirmation. Which step should go last, and why? What must be true of each compensation?</p>`,
          a: `<p>Compensations: (1) release the reserved stock; (2) refund the charge; (3) cancel the courier booking. The email can't be undone, only followed by an apology, so it goes last, after every step that can fail; a step that can't be compensated should be the final one (a "pivot"), so that once it runs, the saga is sure to complete. Each compensation must be idempotent and retried until it succeeds, because a crash or timeout may leave the coordinator unsure whether it ran; and it must work even if other transactions have since run (release stock by quantity, not by restoring an old stock count), since sagas have no isolation.</p>`
        }
      ],
      sources: ["ddia", "dynamo07", "kleppmannds", "mit6824"]
    },
    {
      id: "di7",
      title: "Batch and stream processing",
      minutes: 90,
      summary: "Computing over data spread across many machines: MapReduce's programming model and execution (splits, map tasks, partitioning, the shuffle, reduce tasks), how it survives worker failures by re-execution, stragglers and backup tasks, and the dataflow systems that followed. Then unbounded data: event logs, event time versus processing time, tumbling, sliding and session windows, watermarks and late events, and exactly-once results from replay, checkpoints and idempotent output.",
      notes: `
<p>The lessons so far kept data safe and consistent. This one is about computing on it: counting the words in a billion web pages, or the clicks per minute on a site that never stops getting clicks. Both are done by spreading the work over many machines, and both must give the right answer even though some of those machines will fail during the job.</p>

<h3>MapReduce</h3>
<p>In 2004 Jeffrey Dean and Sanjay Ghemawat described the system Google used to build its search index and for hundreds of other jobs. The programmer writes two functions:</p>
<ul>
<li><code>map(record)</code> takes one input record and emits any number of key–value pairs.</li>
<li><code>reduce(key, values)</code> takes one key and the list of every value emitted for it, and produces the output for that key.</li>
</ul>
<p>The framework does everything else: splitting the input, running thousands of copies of the functions on different machines, moving the data between them, and recovering from failures. CS 360 Lesson 4 met <code>map</code> and folds (Python's <code>functools.reduce</code>) as higher-order functions; the names come from there, though MapReduce's reduce receives the values already grouped by key. Word count is the standard example: map emits (word, 1) for each word, and reduce sums the ones.</p>
<p><strong>Execution.</strong> The input, stored in a distributed file system (Google's GFS; Hadoop's HDFS is the open-source copy), is divided into <em>M</em> <strong>splits</strong> of 64 to 128 MB. A <strong>master</strong> process assigns tasks to <strong>worker</strong> machines:</p>
<ol>
<li><strong>Map tasks</strong>, one per split. A map task reads its split, calls <code>map</code> on each record, and divides the emitted pairs into <em>R</em> buckets with a <strong>partition function</strong>, normally hash(key) mod <em>R</em>, writing them to its own local disk. Every pair with a given key lands in the same bucket number, whichever map task emitted it.</li>
<li><strong>The shuffle.</strong> Reduce task <em>j</em> fetches bucket <em>j</em> from every map task's disk, over the network, and sorts the pairs by key so equal keys are adjacent (an external merge sort, CS 340 Lesson 6, when they don't fit in memory).</li>
<li><strong>Reduce tasks</strong>, <em>R</em> of them. Each calls <code>reduce</code> once per key, in key order, and writes its output to the distributed file system, giving <em>R</em> output files.</li>
</ol>
<p>The whole flow fits in a few lines when the "machines" are just lists:</p>
<pre><code>import zlib

def map_fn(doc):
    for word in doc.lower().split():
        yield word, 1

def reduce_fn(word, counts):
    return sum(counts)

def partition(key, r):
    return zlib.crc32(key.encode()) % r       # the same key always goes to the same reducer

def mapreduce(splits, r):
    # Map phase: one task per split, each writing r buckets (files on its local disk).
    map_outputs = []
    for split in splits:
        buckets = [[] for _ in range(r)]
        for doc in split:
            for k, v in map_fn(doc):
                buckets[partition(k, r)].append((k, v))
        map_outputs.append(buckets)
    # Shuffle, sort and reduce: reducer j fetches bucket j from every map task.
    results = []
    for j in range(r):
        groups = {}
        for k, v in sorted(p for buckets in map_outputs for p in buckets[j]):
            groups.setdefault(k, []).append(v)
        results.append([(k, reduce_fn(k, vs)) for k, vs in groups.items()])
    return results

splits = [["the cat sat", "the dog"], ["a cat and a dog"], ["the end"]]
for j, out in enumerate(mapreduce(splits, 2)):
    print(j, out)</code></pre>
<pre data-label="Output"><code>0 [('cat', 2), ('sat', 1), ('the', 3)]
1 [('a', 2), ('and', 1), ('dog', 2), ('end', 1)]</code></pre>
<p><code>zlib.crc32</code> is the CRC of CS 330 Lesson 2, used here as a fast hash that gives the same value in every process. It spreads ordinary keys evenly, but it is easy to find many keys with the same CRC, so a job whose keys an adversary controls would need a keyed hash instead. (Python dictionaries keep keys in insertion order, so <code>groups</code> lists keys in sorted order.) Notice that "the" appears in two different splits but all three counts reached reducer 0, because the partition function sent every "the" there.</p>
<p>Two refinements matter in practice. Map tasks are scheduled on, or near, the machines whose disks hold their splits, since moving computation is cheaper than moving data (<strong>locality</strong>). And a <strong>combiner</strong>, a reduce run on each map task's own output before the shuffle, turns a split's thousand ("the", 1) pairs into one ("the", 1000), shrinking the shuffle. It is valid when the reduce is associative and commutative, as a sum is.</p>

<h3>Failures and stragglers</h3>
<p>With thousands of machines running for an hour, some will fail. MapReduce's answer is simple: the master pings workers; if one stops answering, every task it was running is rescheduled on another worker. Its <em>completed</em> map tasks are also re-run, because their output lived on its local disk, which is now unreachable. Completed reduce tasks don't need re-running, since their output is in the replicated file system.</p>
<p>Re-execution is correct because tasks are <strong>deterministic</strong> functions of their input, and their output is committed atomically: a reduce task writes to a temporary file and renames it to its final name only when done (on Unix file systems, renaming a file over another is atomic: a reader sees the old file or the new one, never a mixture), so even if two copies of a task finish, the output appears once. This is the exactly-once effect of Lesson 1, achieved by idempotence: running a task twice gives the same file. A map or reduce function with side effects (sending an email per record) would break it.</p>
<p>The slowest tasks determine when a job ends, and some machines are slow without being broken: a failing disk that retries reads, or a machine shared with another job. Such a <strong>straggler</strong> can delay a job by far more than its share of the work. MapReduce's remedy: when the job is nearly finished, the master launches <strong>backup copies</strong> of the remaining in-progress tasks on other workers, and takes whichever copy finishes first. The paper reports that a sort of 1 TB took 44% longer with backup tasks disabled. Lesson 8 applies the same idea to single requests.</p>

<h3>Dataflow systems</h3>
<p>Real jobs chain many MapReduce steps, and each step writes its full output to the replicated file system before the next can start. Dataflow systems such as Apache Spark (2010s) and Apache Flink describe a whole job as a directed acyclic graph of operators (map, filter, join, group by key, and so on; CS 201's DAGs), schedule it as a whole, and pass intermediate data between operators in memory or on local disk. Joins between large datasets use the partitioned sort-merge and hash joins of CS 340 Lesson 6, with both inputs partitioned by the join key so matching rows meet on the same machine. Spark recovers a lost piece of intermediate data by recomputing it from its <em>lineage</em>, the recorded chain of operators that produced it from input that is still stored; this again requires deterministic operators.</p>

<h3>Stream processing</h3>
<p>Batch jobs run over a fixed input. Many inputs never end: clicks, payments, sensor readings. A <strong>stream processor</strong> computes over such <em>unbounded</em> data continuously. Events usually arrive through an <strong>event log</strong> such as Apache Kafka: an append-only log, partitioned for scale and replicated for safety (Lessons 3 and 6), from which each consumer reads at its own pace, remembering its position (an <em>offset</em>) in each partition. Because the log is kept, a consumer that crashes can restart from its last recorded offset and replay what it missed.</p>
<p><strong>Event time and processing time.</strong> Each event has an <strong>event time</strong>, when it happened (stamped by the device that produced it), and a <strong>processing time</strong>, when the stream processor sees it. They can differ by a lot: a phone on a plane records a game played at 14:02 and uploads it at 18:30. Computing "games played per minute" by processing time would put that game in the wrong minute, and replaying a day's log after a bug fix would put a whole day of events into one minute. Correct results use event time.</p>
<p><strong>Windows.</strong> Aggregates over a stream are computed over windows of event time:</p>
<ul>
<li><strong>Tumbling</strong>: fixed-size, non-overlapping windows, such as each minute [0, 60), [60, 120), …; each event is in exactly one.</li>
<li><strong>Sliding</strong> (or hopping): fixed-size windows that overlap, such as 5-minute windows starting every minute; each event is in five of them.</li>
<li><strong>Session</strong>: a window per user that ends after a gap of inactivity, say 30 minutes; its length depends on the data.</li>
</ul>
<p><strong>Watermarks.</strong> When can the processor output the count for the window [0, 10)? Only when it believes no more events with event time below 10 will arrive, and with delays like the plane's, it can never be sure. A <strong>watermark</strong> is the processor's declaration "I don't expect any more events with event time below <em>W</em>". It is usually a heuristic, for example the largest event time seen so far minus an allowed delay. When the watermark passes the end of a window, the window's result is emitted. An event that arrives after its window has been emitted is <strong>late</strong>: it can be dropped (and counted, so someone notices if it happens often), or the system can emit a corrected result.</p>
<p>A trace with tumbling windows of 10 s and watermark = (largest event time seen) − 5. Events arrive with event times 3, 7, 12, 9, 15, 21, 4, 26:</p>
<table>
<tr><th>Arrives</th><th>Largest seen</th><th>Watermark</th><th>Action</th></tr>
<tr><td>3</td><td>3</td><td>−2</td><td>add to [0, 10)</td></tr>
<tr><td>7</td><td>7</td><td>2</td><td>add to [0, 10)</td></tr>
<tr><td>12</td><td>12</td><td>7</td><td>add to [10, 20)</td></tr>
<tr><td>9</td><td>12</td><td>7</td><td>add to [0, 10): out of order, but not late</td></tr>
<tr><td>15</td><td>15</td><td>10</td><td>add to [10, 20); watermark ≥ 10: emit [0, 10) with count 3</td></tr>
<tr><td>21</td><td>21</td><td>16</td><td>add to [20, 30)</td></tr>
<tr><td>4</td><td>21</td><td>16</td><td>late: [0, 10) was already emitted</td></tr>
<tr><td>26</td><td>26</td><td>21</td><td>add to [20, 30); watermark ≥ 20: emit [10, 20) with count 2</td></tr>
</table>
<p>The allowed delay is a trade-off. A larger one (say 60 s) waits longer before emitting each window but declares fewer events late; a smaller one gives faster, less complete answers. Tyler Akidau and colleagues' Dataflow model (2015), the basis of Google Cloud Dataflow and Apache Beam, made this trade-off explicit: results can be emitted early, at the watermark, and again when late data arrives. The second programming problem implements this trace's rules.</p>

<h3>Exactly-once in streams</h3>
<p>A stream processor that crashes must restart without losing events or counting them twice. Replaying the log from the last recorded offset gives <em>at-least-once</em> processing: events processed after the offset was recorded but before the crash are processed again. To get an exactly-once <em>effect</em>, Flink takes periodic <strong>checkpoints</strong>: a consistent snapshot of every operator's state (the partial counts) together with the input offsets that state reflects, written to durable storage. On a crash, every operator rolls back to the last checkpoint and the input is replayed from the checkpoint's offsets, so each event affects the state exactly once. </p>
<p>To make the snapshot consistent without stopping the stream, Flink's sources insert numbered marker messages, <strong>barriers</strong>, into the streams they emit, and record the input offset at which each barrier went in. An operator with one input snapshots its state when barrier 7 arrives and then passes the barrier on, so its snapshot reflects exactly the events that came before barrier 7. An operator with several inputs first <em>aligns</em>: once barrier 7 has arrived on one input, it holds back later events on that input (buffering them) until barrier 7 has arrived on every input; only then does it snapshot and forward the barrier. So every operator's snapshot reflects the same events, those before barrier 7 at the sources, and none after. This is a variant of the snapshot algorithm of Chandy and Lamport (1985), in which a process records its state when the first marker reaches it and then also records the messages that arrive on each of its other incoming channels until that channel's marker comes; alignment avoids recording those in-flight messages by holding them back.</p>
<p>The output is the remaining hole: a result sent to the outside world after the checkpoint, before the crash, will be sent again. So outputs must be idempotent (write "count for window 10–20 is 2" keyed by the window, so that a repeat overwrites itself) or transactional (committed only when the checkpoint completes). "Exactly-once", in every system that claims it, means this combination: replay, plus checkpointed state, plus idempotent or transactional output.</p>
<p class="note">Why it matters: the same three ideas, determinism, re-execution and idempotent output, make MapReduce, Spark and Flink correct despite failures. A job written with side effects or non-deterministic functions (reading the clock, calling a random-number generator without a fixed seed) silently loses that guarantee.</p>
`,
      terms: [
        ["MapReduce", "A programming model in which map emits key–value pairs from each input record and reduce combines all values for each key; the framework parallelizes and handles failures."],
        ["Partition function", "The rule (normally hash(key) mod R) that sends every pair with a given key to the same reduce task."],
        ["Shuffle", "Moving each map task's buckets to the reduce tasks, and sorting them by key."],
        ["Combiner", "A reduce applied to one map task's output before the shuffle, valid for associative and commutative reductions."],
        ["Straggler", "A task that runs much slower than others of its kind, delaying the job."],
        ["Backup task", "A second copy of an in-progress task, launched near the end of a job; whichever finishes first is used."],
        ["Dataflow system", "A system such as Spark or Flink that runs a whole job as a graph of operators, keeping intermediate data out of the replicated file system."],
        ["Event log", "An append-only, partitioned and replicated log of events (such as Kafka) that consumers read from their own offsets."],
        ["Event time / processing time", "When an event happened, versus when the stream processor sees it."],
        ["Tumbling, sliding and session windows", "Fixed non-overlapping windows; fixed overlapping windows; and per-user windows ended by a gap of inactivity."],
        ["Watermark", "A stream processor's declaration that it expects no more events with event time below a given value."],
        ["Late event", "An event that arrives after the watermark has passed the end of its window."],
        ["Checkpoint (streaming)", "A consistent snapshot of every operator's state and the input offsets it reflects, used to restart after a failure."]
      ],
      quiz: [
        { q: "A MapReduce job has 200 map tasks and 10 reduce tasks. How many buckets (intermediate files) do the map tasks write in total?", choices: ["10", "200", "210", "2,000"], answer: 3, why: "Each map task writes one bucket per reduce task: 200 × 10." },
        { q: "A worker that completed three map tasks crashes. What must the master do with those tasks?", choices: ["Nothing: they are complete", "Re-run them, because their output was on the crashed worker's local disk", "Re-run the reduce tasks only", "Restart the whole job"], answer: 1, why: "Map output lives on the mapper's local disk, so it is lost with the machine." },
        { q: "Why can MapReduce re-execute a task safely?", choices: ["Tasks are deterministic and their output is committed atomically, so a second run gives the same result once", "The master locks the output", "Workers never fail twice", "Reduce removes duplicates automatically"], answer: 0, why: "Determinism plus atomic rename makes re-execution idempotent." },
        { q: "Which reduction can't be used as a combiner without changing the answer?", choices: ["Sum", "Maximum", "Count", "Average (computed as the mean of the values received)"], answer: 3, why: "The mean of partial means isn't the overall mean when groups differ in size; send (sum, count) pairs instead." },
        { q: "Tumbling windows of 60 s; the watermark is the largest event time seen minus 10 s. Events with event times 50, 65 and 71 have arrived. Which windows have been emitted?", choices: ["None", "[0, 60)", "[0, 60) and [60, 120)", "Only [60, 120)"], answer: 1, why: "The watermark is 71 − 10 = 61 ≥ 60, so [0, 60) is emitted; [60, 120) needs a watermark of 120." },
        { q: "What does 'exactly-once' mean in a stream processor?", choices: ["Every message is delivered once by the network", "Replay from checkpoints, with checkpointed state and idempotent or transactional output, so each event affects the result once", "Events are never replayed", "Each operator runs on one machine"], answer: 1, why: "Delivery is at-least-once; the effect is made exactly-once by checkpoints and idempotent sinks." }
      ],
      practice: [
        {
          q: `<p>Write map and reduce functions (in words or Python) for each job: (a) for a log of (user, page) visits, the number of distinct users per page; (b) an inverted index: for each word, the sorted list of document IDs containing it; (c) for a table of (student, course, grade) rows, each course's average grade.</p>`,
          a: `<p>(a) map emits (page, user); reduce(page, users) returns <code>len(set(users))</code>. (b) map(doc_id, text) emits (word, doc_id) for each distinct word in the text; reduce(word, ids) returns <code>sorted(set(ids))</code>. (c) map emits (course, (grade, 1)); reduce sums both parts and divides: total grade / total count. Emitting (grade, 1) pairs rather than grades also allows a combiner, because sums of pairs combine correctly where averages don't.</p>
<pre><code>def avg_reduce(course, pairs):
    total = sum(g for g, _ in pairs)
    n = sum(c for _, c in pairs)
    return round(total / n, 2)

print(avg_reduce("cs410", [(90, 1), (170, 2), (80, 1)]))   # 85.0</code></pre>
<p>(The middle pair is the output of a combiner that has already merged two grades, 85 and 85.)</p>`
        },
        {
          q: `<p>A job has 1,000 map tasks of 1 minute each, run on 100 workers. One worker is a straggler that runs 10 times slower than the others. Ignoring scheduling overhead, roughly how long does the map phase take (a) if every worker takes tasks from a queue as it finishes its previous one, without backup tasks, and (b) with backup tasks launched once no tasks remain in the queue?</p>`,
          hint: `<p>With a shared queue, the healthy workers keep taking tasks. What matters is the task the straggler is working on when the queue runs dry.</p>`,
          a: `<p>(a) The healthy workers finish 99 tasks per minute between them. The straggler spends minutes 0 to 10 on its first task. By minute 10 the healthy workers have done 990 tasks and the straggler 1, so 9 remain; at minute 10 all workers are free at once and the straggler takes one of the 9. The healthy workers finish the other 8 by minute 11, but the straggler's task takes until minute 20, so the phase takes about 20 minutes, double the ideal of about 10. (b) The queue is empty from minute 10; the master launches a backup of the straggler's task on a healthy worker, which finishes it at minute 11. The phase ends at about 11 minutes. One slow machine out of 100 nearly doubled the phase without backup tasks.</p>`
        },
        {
          q: `<p>Using the notes' rules (tumbling windows of 10 s, watermark = largest event time seen − 5), process events arriving with event times 2, 11, 8, 14, 6, 19, 30, 17, 29. Which windows are emitted when, with what counts, and which events are late?</p>`,
          a: `<p>2: [0, 10), wm −3. 11: [10, 20), wm 6. 8: [0, 10), wm 6. 14: [10, 20), wm 9. 6: [0, 10), wm 9 (on time, since 9 &lt; 10). 19: [10, 20), wm 14 ≥ 10: emit [0, 10) with count 3 (2, 8, 6). 30: [30, 40), wm 25 ≥ 20: emit [10, 20) with count 3 (11, 14, 19); [20, 30) has no events, so nothing (or a zero count) is emitted for it when the watermark passes 30. 17: late ([10, 20) already emitted). 29: [20, 30), wm still 25: on time, because [20, 30) hasn't been emitted. At the end, [20, 30) holds 1 event and [30, 40) holds 1, waiting for the watermark.</p>`
        },
        {
          q: `<p>A stream job counts payments per minute and writes each count to a database with <code>INSERT INTO counts VALUES (minute, n)</code>. It checkpoints every 10 s and restarts from the last checkpoint after a crash. Explain how a crash can make the database wrong, and change the output step to fix it.</p>`,
          a: `<p>Suppose the job emits the count for 14:02 at 14:03:05 and crashes at 14:03:08, after the last checkpoint at 14:03:00. On restart it rolls back to the 14:03:00 state, replays the input, and emits the count for 14:02 again: a second row, or a duplicate-key error. Fix: make the write idempotent, for example an <em>upsert</em> (update or insert) keyed by the window. SQLite and PostgreSQL write it <code>INSERT INTO counts VALUES (minute, n) ON CONFLICT (minute) DO UPDATE SET n = excluded.n</code>: if a row for that minute exists (<code>minute</code> must be the primary key), it is updated to the new value instead of a second row being added, so a repeat overwrites the row with the same value. Alternatively write outputs inside a transaction that commits only when the next checkpoint completes.</p>`
        }
      ],
      sources: ["mapreduce04", "dataflow15", "ddia", "mit6824"]
    },
    {
      id: "di8",
      title: "Building reliable services",
      minutes: 90,
      summary: "The engineering that keeps real distributed services running: failure detectors, heartbeats and choosing timeouts, including adaptive (phi accrual) detectors; retries done safely, with backoff, jitter, retry budgets and the amplification of retries across layers; circuit breakers and load shedding; tail latency under fan-out and hedged requests, measured; gossip protocols for membership; observability with logs, metrics and distributed traces; and what real outages teach.",
      notes: `
<p>The algorithms of Lessons 2 to 7 assume that nodes can tell, sooner or later, which other nodes are alive, and that requests eventually get through. This lesson is about the engineering underneath those assumptions: detecting failures, retrying without making things worse, keeping latency predictable, tracking membership in large clusters, and seeing what a system is doing. CS 240 Lesson 8 introduced timeouts, exponential backoff with jitter, circuit breakers, logs, metrics and service-level objectives for a single service; here we look at how they behave when many services depend on each other.</p>

<h3>Failure detectors</h3>
<p>A <strong>failure detector</strong> is the part of a system that decides which nodes are suspected of having failed. The usual mechanism is a <strong>heartbeat</strong>: each node sends a small "I'm alive" message every interval (say every second), and a node that hasn't been heard from for a timeout (say 5 s) is suspected. Lesson 1 showed that in a partially synchronous system no detector is perfect, so every detector trades two errors against each other:</p>
<ul>
<li>A short timeout detects real crashes quickly but suspects healthy nodes that were merely slow (a long garbage-collection pause, a congested link). A false suspicion triggers a failover or a rebalancing (Lessons 3 and 6), which costs work and can make the overload worse.</li>
<li>A long timeout makes few false suspicions, but a crashed leader stays unreplaced, and its clients wait, for the whole timeout.</li>
</ul>
<p>A timeout should be chosen from measurements, not guessed: look at the distribution of heartbeat gaps or response times and set the timeout above a high percentile (say the 99.9th), so that false suspicions are rare by design. Better still, adapt it, as TCP does with its retransmission timeout (CS 330 Lesson 6). Cassandra and Akka use the <strong>phi accrual</strong> detector (Hayashibara and colleagues, 2004), which outputs a suspicion level instead of a yes or no. It estimates the distribution of past heartbeat gaps; if the time since the last heartbeat is <em>t</em>, it reports</p>
<p class="math">φ = −log<sub>10</sub> P(a gap at least as long as <em>t</em>)</p>
<p>so φ = 1 means "a gap this long happens 10% of the time", φ = 3 means 0.1%. The application acts when φ crosses a threshold it picks. If gaps were exponentially distributed with mean μ (MATH 230 Lesson 3), P(gap ≥ <em>t</em>) = e<sup>−<em>t</em>/μ</sup>, so φ = <em>t</em> / (μ ln 10): with μ = 1 s, a 5-second silence gives φ = 5 / 2.303 ≈ 2.17. An exponential's standard deviation always equals its mean, so this model can't tell a regular node from an erratic one. The detector of the 2004 paper instead keeps the mean μ and standard deviation σ of the last 1,000 or so gaps and fits a normal distribution (MATH 230 Lesson 3): P(gap ≥ <em>t</em>) = 1 − Φ((<em>t</em> − μ)/σ), with Φ the standard normal CDF. φ = 3 is reached at <em>t</em> = μ + 3.09σ, so with μ = 1 s a node whose heartbeats arrive like clockwork (σ = 0.1 s) becomes suspect after 1.31 s of silence, and an irregular one (σ = 0.5 s) only after 2.55 s.</p>

<h3>Retries that don't make things worse</h3>
<p>CS 240 Lesson 8's rules for a single client: retry only idempotent operations (or ones with idempotency keys, Lesson 1), only on errors that might go away, with exponential backoff and jitter so that thousands of clients don't retry in lockstep. In a system of many services there are two more dangers.</p>
<p><strong>Amplification.</strong> A request passes through a web server, which calls an API service, which calls a database. If each layer tries each call up to 4 times (one attempt and 3 retries), then when the database is down, one user request becomes 4 × 4 × 4 = 64 database attempts. Retries multiply across layers, and they arrive exactly when the bottom layer is struggling. Rules that help: retry at one layer only (usually the one nearest the user); and give each client a <strong>retry budget</strong>, for example retries may be at most 10% of requests, so that when most requests fail, the client stops retrying instead of multiplying the load.</p>
<p><strong>Circuit breakers</strong> (CS 240 Lesson 8) apply the same idea per dependency. A breaker sits in front of calls to a service and has three states. <em>Closed</em>: calls pass through, and failures are counted. After a threshold of consecutive failures it becomes <em>open</em>: calls fail at once without contacting the service, which gives it room to recover and stops callers wasting threads waiting on timeouts. After a cool-down period it becomes <em>half-open</em>: one trial call is let through; if it succeeds the breaker closes, and if it fails the breaker opens again for another cool-down. (In code that is told the time at each call, as in the first programming problem, the breaker becomes half-open at the first call after the cool-down, and that call is the trial.) The first programming problem builds one.</p>
<p><strong>Load shedding.</strong> An overloaded server that accepts every request slows down for everyone: requests queue, each waits longer than its client's timeout, the clients give up and retry, and the server ends up doing work whose results nobody is waiting for. It is better to reject requests beyond capacity immediately (an HTTP 503), and to drop requests whose deadline has already passed. Systems that propagate a deadline with each request (gRPC does) let every layer skip work that can no longer be useful.</p>

<h3>Tail latency and hedged requests</h3>
<p>Users notice slow requests, not average ones, so services track latency <strong>percentiles</strong>: the 99th percentile (p99) latency is the time within which 99% of requests finish (CS 240 Lesson 8). The slowest requests, the <strong>tail</strong>, matter more in a distributed system than their 1% suggests, because of fan-out. A search query may be sent to 100 index servers, each holding one partition (Lesson 6), and can't answer until all have replied. If each server is slow (say over a second) 1% of the time, independently, the query is slow unless all 100 are fast:</p>
<p class="math">P(query slow) = 1 − 0.99<sup>100</sup> ≈ 0.634</p>
<p>Almost two-thirds of queries hit at least one slow server. Jeffrey Dean and Luiz André Barroso's 2013 paper "The Tail at Scale" used exactly this arithmetic to argue that large services must be designed to tolerate slow components, not merely failed ones. One of their techniques is the <strong>hedged request</strong>: send the request to one replica, and if it hasn't answered within about the 95th-percentile latency, send it to a second replica too and use whichever reply comes first. Most of the time the first replica answers in time and no extra work is done. A simulation, with response times that are usually about 12 ms but over a second 2% of the time:</p>
<pre><code>import random

def latency(rng):
    """One server's response time in ms: usually about 12, but 2% of the time over a second."""
    t = 8 + rng.expovariate(1 / 4)          # 8 ms plus an exponential delay with mean 4 ms
    if rng.random() &lt; 0.02:
        t += 1000                           # a pause, a slow disk, a queue behind a big request
    return t

def percentile(xs, p):
    xs = sorted(xs)
    return xs[min(len(xs) - 1, int(p / 100 * len(xs)))]

rng = random.Random(7)
plain, hedged, extra = [], [], 0
for _ in range(100000):
    first = latency(rng)
    plain.append(first)
    if first &gt; 20:                          # no answer after 20 ms: ask a second replica
        extra += 1
        first = min(first, 20 + latency(rng))
    hedged.append(first)

for p in (50, 99, 99.9):
    print(p, round(percentile(plain, p), 1), round(percentile(hedged, p), 1))
print(extra / 100000)   # 0.06847</code></pre>
<pre data-label="Output"><code>50 10.8 10.8
99 1010.7 31.5
99.9 1020.4 42.0
0.06847</code></pre>
<p>(<code>rng.expovariate(λ)</code> draws from the exponential distribution with rate λ, so mean 1/λ.) In this model 20 ms is about the 93rd percentile of one server's latency. Hedging after 20 ms sends a second request for 6.8% of requests, and cuts the p99 from about a second to 31.5 ms. The median doesn't change. In a real system the gain is smaller when slowness is correlated (both replicas share an overloaded switch), and a hedge must be safe to duplicate, so it is used for reads and idempotent operations. MapReduce's backup tasks (Lesson 7) are the same idea for whole tasks.</p>

<h3>Gossip and membership</h3>
<p>Which nodes are in the cluster? A coordination service (Lesson 5) can store the answer, but in a cluster of thousands of nodes, having every node send heartbeats to one place is a bottleneck. <strong>Gossip</strong> protocols spread information the way rumours spread: every round (say every second), each node picks a random other node and exchanges what it knows. Like an epidemic, the number of informed nodes roughly doubles each round at first, so information reaches all <em>n</em> nodes in O(log <em>n</em>) rounds. A simulation of the simplest version, in which each informed node tells one random node per round:</p>
<pre><code>import math

def gossip_rounds(n, seed):
    """Push gossip: each round, every node that knows the rumour tells one random node."""
    rng = random.Random(seed)
    knows = {0}
    rounds = 0
    while len(knows) &lt; n:
        for node in list(knows):
            knows.add(rng.randrange(n))
        rounds += 1
    return rounds

for n in (10, 100, 1000, 10000):
    print(n, gossip_rounds(n, seed=1), round(math.log2(n) + math.log(n), 1))</code></pre>
<pre data-label="Output"><code>10 6 5.6
100 13 11.2
1000 16 16.9
10000 26 22.5</code></pre>
<p>A thousandfold increase in cluster size adds only about 20 rounds. The third column is log<sub>2</sub> <em>n</em> + ln <em>n</em>, the expected number of rounds for push gossip worked out by Pittel in 1987: the log<sub>2</sub> <em>n</em> rounds of doubling, plus about ln <em>n</em> rounds to reach the last few nodes, which is slow because by then most messages go to nodes that already know.</p>
<p>For membership, each node keeps a table of every node it knows about with a <strong>heartbeat counter</strong>, and increments its own counter every round. When two nodes gossip, each takes, for every node, the larger of the two counters (a G-counter-like merge, Lesson 3), and notes the local time at which that node's counter last increased. A node whose counter hasn't increased for some number of rounds is suspected to have failed; after a longer period it is removed. Because news of a heartbeat travels through many paths, one lost message doesn't cause a false suspicion. Cassandra, Consul (using the SWIM protocol, which adds indirect probes through other nodes) and many others manage membership this way. The second programming problem simulates it.</p>

<h3>Observability</h3>
<p>When a request that touches 40 services is slow, which one is to blame? <strong>Observability</strong> (CS 240 Lesson 8) rests on three kinds of data:</p>
<ul>
<li><strong>Logs</strong>: timestamped records of events. In a distributed system they should be structured (key–value fields, often JSON, CS 240 Lesson 6) and carry a request ID, so that one request's entries can be found across every service. Their timestamps come from different clocks (Lesson 2), so their order across machines is only approximate.</li>
<li><strong>Metrics</strong>: numbers aggregated over time, cheap to keep for every request. For each service, the "RED" metrics: <strong>R</strong>ate of requests, <strong>E</strong>rrors, and <strong>D</strong>uration as a histogram from which percentiles are read. Percentiles can't be averaged across servers (the average of ten servers' p99s is not the p99 of all requests), so servers export histograms, which can be added.</li>
<li><strong>Traces</strong>: the path of one request through the system. The first service creates a trace ID; every call it makes carries the ID and a new <em>span</em> ID, with the caller's span as parent; each service records the start and end of its spans. Assembled, the spans form a tree showing where the time went: for example, that a 900 ms request spent 850 ms waiting for one slow database shard. Google's Dapper (2010) introduced the design; OpenTelemetry is the open standard.</li>
</ul>
<p>Alerts should fire on symptoms users feel, such as the error rate or p99 latency exceeding the service-level objective, rather than on every possible cause, which produces noise that teaches people to ignore alerts.</p>

<h3>Lessons from outages</h3>
<p>Published postmortems of large outages (CS 240 Lesson 8 on blameless postmortems) repeat a few patterns, each tied to this course:</p>
<ul>
<li><strong>A small change, applied everywhere at once.</strong> A configuration or command with a typo reaches every server within seconds. Defense: roll changes out gradually (one machine, one datacenter, then all), with automatic rollback when metrics worsen.</li>
<li><strong>Retry storms and thundering herds.</strong> A brief failure makes every client retry or reconnect at once, and the recovering service is knocked over again. Defense: backoff with jitter, retry budgets, load shedding.</li>
<li><strong>Hidden dependencies.</strong> The system used to report or fix an outage depends on the thing that failed. Defense: know your dependency graph, and keep monitoring and control tools independent of what they monitor.</li>
<li><strong>Recovery is slower than expected.</strong> A system that has never been restarted from scratch at its current size may take hours to rebuild its state. Defense: test recovery regularly, at full scale.</li>
</ul>
<p class="note">Why it matters: the gap between an algorithm that is correct and a service that stays up is filled by these techniques. Every one of them comes from the same few facts, which this course began with: messages can be lost or delayed, nodes can be slow without being dead, and a node can never be certain what the rest of the system is doing.</p>
`,
      terms: [
        ["Failure detector", "The mechanism, usually heartbeats and timeouts, that decides which nodes are suspected of having failed."],
        ["Heartbeat", "A small periodic message saying that a node is alive."],
        ["Phi accrual detector", "A failure detector that outputs φ = −log10 of the probability of a heartbeat gap as long as the current one."],
        ["Retry amplification", "Retries at several layers multiplying: k attempts at each of d layers give k^d attempts at the bottom."],
        ["Retry budget", "A limit on retries as a fraction of requests, so that retries stop when most requests fail."],
        ["Circuit breaker", "A wrapper that stops calling a failing service (open), then lets a trial call through (half-open) before resuming (closed)."],
        ["Load shedding", "Rejecting requests beyond capacity quickly, rather than queueing work that will finish too late."],
        ["Tail latency", "The latency of the slowest requests, measured by high percentiles such as p99."],
        ["Hedged request", "Sending a request to a second replica if the first hasn't answered within a short delay, and using the first reply."],
        ["Gossip protocol", "Spreading information by having each node exchange state with random other nodes each round, reaching all nodes in O(log n) rounds."],
        ["Distributed trace", "The tree of timed spans, linked by a trace ID, that records one request's path through many services."]
      ],
      quiz: [
        { q: "Why is a very short failure-detection timeout harmful?", choices: ["It detects crashes too slowly", "It suspects healthy but slow nodes, triggering unnecessary failovers", "It uses too much bandwidth", "It violates FLP"], answer: 1, why: "Slow and dead look alike; a short timeout turns slowness into false failures, and the failover itself costs work." },
        { q: "Three layers each make up to 3 attempts per call. When the bottom service is down, how many attempts reach it per user request?", choices: ["3", "9", "27", "81"], answer: 2, why: "3 × 3 × 3 = 27." },
        { q: "A circuit breaker is open and its cool-down has passed. What happens to the next call?", choices: ["It fails immediately", "It is let through as a trial (half-open); success closes the breaker, failure reopens it", "All queued calls are sent", "The breaker resets its threshold"], answer: 1, why: "Half-open lets one call test whether the service has recovered." },
        { q: "A query fans out to 50 servers, each slow 2% of the time independently. About what fraction of queries are slow?", choices: ["2%", "36%", "64%", "98%"], answer: 2, why: "1 − 0.98^50 ≈ 0.636." },
        { q: "Why are hedged requests normally used only for reads or idempotent operations?", choices: ["Writes are faster", "The request may run on two replicas", "Hedging needs synchronized clocks", "Writes can't time out"], answer: 1, why: "Both copies may execute, so doing it twice must be harmless." },
        { q: "Roughly how many rounds does push gossip need to reach 1,000,000 nodes, using log2 n + ln n?", choices: ["About 7", "About 34", "About 1,000", "About 500,000"], answer: 1, why: "log2(10^6) ≈ 19.9 and ln(10^6) ≈ 13.8, about 34 rounds." }
      ],
      practice: [
        {
          q: `<p>Heartbeat gaps at a node are roughly exponential with mean 0.5 s. (a) What is φ after 2 s of silence? (b) The application suspects a node when φ ≥ 8. How long a silence is that? (c) How often would a healthy node be falsely suspected at that threshold, if gaps really were exponential?</p>`,
          a: `<p>(a) φ = <em>t</em> / (μ ln 10) = 2 / (0.5 × 2.303) ≈ 1.74. (b) <em>t</em> = 8 × 0.5 × ln 10 ≈ 9.2 s. (c) φ = 8 means probability 10<sup>−8</sup> per gap: with one heartbeat every 0.5 s, that is once in about 5 × 10<sup>7</sup> s, roughly a year and a half per node. With 1,000 nodes, though, a false suspicion somewhere every half a day or so; and real gaps have heavier tails than the exponential (pauses), which is why systems measure the distribution rather than assume it.</p>
<pre><code>print(round(2 / (0.5 * math.log(10)), 2), round(8 * 0.5 * math.log(10), 1))   # 1.74 9.2</code></pre>`
        },
        {
          q: `<p>A service receives 1,000 requests per second and normally 0.1% fail. Its clients retry failed requests up to 3 times, immediately. (a) What load does the service see normally? (b) An incident makes 50% of attempts fail. What load does it see now? (c) With a retry budget of 10% of requests, what load does it see?</p>`,
          a: `<p>(a) About 1,000 + 1 retries ≈ 1,001 attempts per second. (b) Each request makes 1 attempt, plus a second with probability 0.5, a third with probability 0.25, a fourth with probability 0.125: 1 + 0.5 + 0.25 + 0.125 = 1.875 attempts, so about 1,875 per second, nearly double, at the worst moment. (c) Retries are capped at 100 per second, so the load is about 1,100 per second; more requests fail outright, but the service isn't pushed further over the edge.</p>`
        },
        {
          q: `<p>A trace of a 600 ms request has spans: <code>web</code> 0–600; <code>auth</code> 10–40 (child of web); <code>search</code> 50–590 (child of web), with children <code>shard1</code> 60–120, <code>shard2</code> 60–580, <code>shard3</code> 60–110; <code>render</code> 590–600 (child of web). Where should the team look, and what technique from this lesson might help?</p>`,
          a: `<p>The request waited on <code>search</code> for 540 ms, and <code>search</code> was waiting on <code>shard2</code> (520 ms), while the other shards took 50–60 ms. Look at why shard2 is slow: a hot partition (Lesson 6), a straggling machine, a slow disk. If shard2's slowness is occasional, hedging its requests to another replica of the shard after, say, 100 ms would let shard2's part finish at about 160 + 60 = 220 ms instead of 580, and the whole request in roughly 250 ms instead of 600. If it's a persistent hot spot, the fix is repartitioning.</p>`
        },
        {
          q: `<p>Choose one technique from this lesson to prevent each failure, and explain how: (a) after a 30-second network outage, 50,000 clients reconnect in the same second and overload the login service; (b) a dependency starts timing out after 2 s, and every request thread in your service is soon blocked waiting on it; (c) a leader is replaced every few minutes although it never crashed, because its garbage-collection pauses exceed the failure detector's 1 s timeout.</p>`,
          a: `<p>(a) Exponential backoff with jitter on reconnection, so the reconnections spread over many seconds; plus load shedding at the login service, so it serves what it can instead of collapsing. (b) A circuit breaker: after a few consecutive timeouts it opens, calls fail immediately (perhaps with a degraded response), threads are freed, and a half-open trial later detects recovery. (c) Choose the timeout from the measured distribution of heartbeat gaps, or use an adaptive (phi accrual) detector, so that normal pauses don't count as failures; and reduce the pauses themselves.</p>`
        }
      ],
      sources: ["tailatscale", "awsbackoff", "srebook", "kleppmannds"]
    }
  ]
});

CSA.addAsides("cs410", {
  di2: [
    { kind: "history", title: "Clocks and relativity", html: `<p>Leslie Lamport has said that the idea behind "Time, Clocks, and the Ordering of Events in a Distributed System" came from special relativity. In relativity there is no single correct order for events far apart in space: two observers moving differently can disagree about which of two distant events happened first. What every observer agrees on is whether one event could have <em>caused</em> another, because nothing travels faster than light. Lamport noticed that messages play the role of light signals: event <em>a</em> can influence event <em>b</em> only if a chain of messages connects them, and that is the happens-before relation. The paper, published in 1978 in Communications of the ACM, also introduced the idea of building a replicated system by having every node run the same state machine on the same totally ordered commands, which Lessons 4 and 5 rely on. It became one of the most cited papers in computer science, and Lamport received the Turing Award in 2013.</p>`, sources: ["lamport78"] }
  ],
  di5: [
    { kind: "history", title: "The part-time parliament", html: `<p>Lamport wrote up Paxos around 1989 as the story of the parliament of Paxos, an imaginary Greek island whose legislators wandered in and out of the chamber and so had to pass laws without ever all being present. He presented the algorithm as an archaeologist's reconstruction, complete with Greek names for the legislators. Reviewers found it baffling and asked for the story to be removed; Lamport declined, and the paper, "The Part-Time Parliament", was not published until 1998, in ACM Transactions on Computer Systems. Meanwhile others reinvented or rediscovered similar ideas, notably Brian Oki and Barbara Liskov's Viewstamped Replication (1988). In 2001 Lamport wrote "Paxos Made Simple", whose abstract reads, in full: "The Paxos algorithm, when presented in plain English, is very simple." Engineers building real systems disagreed; Google's 2007 paper on implementing Paxos for Chubby listed many gaps between the published algorithm and a working one. That difficulty is what Raft's designers set out to fix.</p>`, sources: ["paxossimple", "raft14"] }
  ],
  di8: [
    { kind: "practice", title: "The S3 outage of 2017", html: `<p>On 28 February 2017, Amazon's S3 storage service in its Northern Virginia region stopped serving requests for about four hours, taking down a large part of the web with it. Amazon's public summary explains why. An engineer debugging a slow billing system ran an established command meant to remove a small number of servers from one of S3's subsystems. One input was mistyped, and a much larger set of servers was removed, including those of two subsystems every request depends on: the index, which records where every object is stored, and the placement subsystem, which allocates space for new objects. Both had to be fully restarted, and because they had grown large over years without a full restart, the restart and its safety checks took hours. For a while Amazon couldn't even update its own status dashboard, because the dashboard depended on S3. The fixes named in the summary match this lesson: the tool was changed to remove capacity more slowly and to refuse removals that would take a subsystem below its minimum, other tools were audited for the same safety checks, and work was prioritized to break the index subsystem into smaller partitions, which Amazon calls cells, so that a failure affects less and a restart is faster.</p>`, sources: ["awss3_17"] }
  ]
});
