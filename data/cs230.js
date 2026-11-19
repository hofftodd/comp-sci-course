CSA.addCourse({
  id: "cs230",
  code: "CS 230",
  title: "Computer Architecture and Digital Logic",
  credits: 4,
  kind: "required",
  term: "y2s",
  summary: "How a computer is built from switches: Boolean logic and gates, circuits that add and choose, circuits that remember, the RISC-V instruction set and how its instructions are encoded, a processor datapath that runs them, pipelining, virtual memory, and why modern chips went parallel. Every circuit is simulated in Python.",
  prereqs: ["CS 210 Computer Systems I", "MATH 120 Discrete Mathematics I"],
  outcomes: [
    "Design combinational circuits from truth tables and Boolean algebra",
    "Explain how adders, multiplexers and ALUs are built from gates, and how fast they are",
    "Design sequential circuits with flip-flops and finite state machines",
    "Encode and decode RISC-V instructions, and write short RISC-V programs",
    "Trace instructions through a single-cycle and a pipelined datapath, including hazards",
    "Translate virtual addresses with page tables and TLBs",
    "Reason about performance with CPI, clock rate and Amdahl's law"
  ],
  rubric: {
    criteriaFor: "labs and problem sets",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 25, desc: "Weekly: the lesson's programming problems, plus written exercises on circuits, encodings and timing diagrams." },
      { name: "Labs", weight: 30, desc: "Four labs in a logic simulator and in Python: an 8-bit ALU from gates, a register file and counter, a single-cycle RISC-V processor that runs real programs, and a pipelined version with forwarding." },
      { name: "Midterm exam", weight: 15, desc: "Logic, combinational and sequential circuits, and RISC-V instructions (lessons 1–4)." },
      { name: "Final exam", weight: 20, desc: "Cumulative, with emphasis on datapaths, pipelining, virtual memory and parallelism (lessons 5–8)." }
    ],
    criteria: [
      { name: "Correctness", desc: "Does the design do what's specified?", levels: [
        "Correct for every input, verified by exhaustive tests or a truth table.",
        "Correct for most inputs; an edge case fails.",
        "Works only in simple cases.",
        "Doesn't work." ] },
      { name: "Design", desc: "Is it well structured?", levels: [
        "Built from clearly named, reusable components; no unnecessary gates or states.",
        "Sound, with some redundancy.",
        "Works but is hard to follow or much larger than needed.",
        "No discernible structure." ] },
      { name: "Analysis", desc: "Is its cost explained?", levels: [
        "States gate count, delay or cycle count, with reasons.",
        "Mostly correct analysis.",
        "Analysis missing key costs.",
        "No analysis." ] },
      { name: "Presentation", desc: "Can a reader follow it?", levels: [
        "Clear diagrams and explanations.",
        "Mostly clear.",
        "Hard to follow.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Tools:</b> labs use a free logic simulator (Digital or Logisim-evolution) and Python; RISC-V programs run in the free RARS simulator or a course-provided Python simulator.",
      "<b>Collaboration:</b> discuss freely; build your own circuits and code, and name your collaborators.",
      "<b>AI assistants:</b> you may use them to explain concepts, and must say how. Designs you submit must be your own, and labs include short oral checks.",
      "<b>Late work:</b> four late days for labs, used in whole days; then 10% a day."
    ]
  },
  units: [
    {
      id: "ar1",
      title: "Boolean logic and gates",
      minutes: 90,
      summary: "From switches to logic: transistors as switches, logic gates, truth tables, Boolean algebra and De Morgan's laws, building any function as a sum of products, and why NAND alone is enough.",
      notes: `
<p>CS 210 showed how a program becomes machine code. This course goes one level further down: how a processor that runs machine code is built. The answer starts with a single idea. Everything a computer does is built from <strong>switches</strong> that are on or off, and switches can compute logic.</p>

<h3>Transistors are switches</h3>
<p>A modern chip contains billions of <strong>transistors</strong>. For our purposes, a transistor is a switch controlled by a voltage: one voltage on its control input lets current flow, the other blocks it. (A real switched-on transistor still has some resistance, which is one reason gates take time to switch; PHYS 250 Lesson 3 looks at this.) We call the two voltages 1 (high) and 0 (low). In <strong>CMOS</strong> technology, used in nearly every chip, transistors come in two complementary kinds, one that conducts when its input is 1 and one that conducts when it is 0. Pairing them builds circuits whose outputs are always firmly connected to either the high or the low voltage. We'll work one level up, with <strong>logic gates</strong>, and treat each gate as a small fixed circuit of transistors.</p>

<h3>Gates and truth tables</h3>
<p>A gate computes a fixed function of its 0/1 inputs. A <strong>truth table</strong> lists the output for every combination of inputs: 2<sup><em>n</em></sup> rows for <em>n</em> inputs.</p>
<table>
<thead><tr><th>a</th><th>b</th><th>AND (a·b)</th><th>OR (a + b)</th><th>XOR (a ⊕ b)</th><th>NAND</th><th>NOR</th></tr></thead>
<tbody>
<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>
</tbody>
</table>
<p>NOT (written <em>a</em>′ or ā) inverts a single input. These are MATH 120's logical connectives: AND is ∧, OR is ∨, NOT is ¬. Circuit designers write them as multiplication, addition and a prime, which makes formulas shorter: <em>ab</em> + <em>c</em>′ means (<em>a</em> AND <em>b</em>) OR (NOT <em>c</em>). (Here + is OR, so 1 + 1 = 1.) In CMOS, NAND and NOR are the cheapest gates to build (four transistors each), while AND is a NAND followed by a NOT.</p>

<h3>Boolean algebra</h3>
<p>George Boole's algebra of logic (CS 100's history; MATH 120's optional lesson) gives rules for simplifying circuits. Besides the familiar ones (<em>a</em> + 0 = <em>a</em>, <em>a</em> · 1 = <em>a</em>, commutative, associative and distributive laws), there are some that ordinary algebra lacks:</p>
<ul>
<li><em>a</em> + <em>a</em> = <em>a</em> and <em>a</em> · <em>a</em> = <em>a</em>;</li>
<li><em>a</em> + 1 = 1 and <em>a</em> + <em>a</em>′ = 1, <em>a</em> · <em>a</em>′ = 0;</li>
<li><em>a</em> + <em>bc</em> = (<em>a</em> + <em>b</em>)(<em>a</em> + <em>c</em>) (OR distributes over AND);</li>
<li><strong>De Morgan's laws:</strong> (<em>ab</em>)′ = <em>a</em>′ + <em>b</em>′ and (<em>a</em> + <em>b</em>)′ = <em>a</em>′<em>b</em>′.</li>
</ul>
<p>Every law can be checked by a truth table, which in Python is a loop over all inputs:</p>
<pre><code>from itertools import product

def equivalent(f, g, n):
    """True if f and g agree on all 2**n inputs."""
    return all(f(*bits) == g(*bits) for bits in product((0, 1), repeat=n))

nand = lambda a, b: 1 - (a &amp; b)
print(equivalent(lambda a, b: 1 - (a &amp; b), lambda a, b: (1 - a) | (1 - b), 2))   # True: De Morgan
print(equivalent(lambda a, b, c: a | (b &amp; c), lambda a, b, c: (a | b) &amp; (a | c), 3))   # True</code></pre>
<p>(<code>itertools.product((0, 1), repeat=n)</code> generates every tuple of <em>n</em> bits; <code>&amp;</code> and <code>|</code> are CS 210's bitwise AND and OR, which on 0 and 1 are exactly the logical ones.)</p>

<h3>Any function as a sum of products</h3>
<p>Given any truth table, there's a mechanical way to build a circuit for it. For each row where the output is 1, write a product (AND) of all the inputs, each negated if it's 0 in that row; this product is 1 for that row only. Then OR the products together. The result is the <strong>sum-of-products</strong> form. Example: the <strong>majority</strong> function of three inputs, 1 when at least two inputs are 1. Its 1-rows are 011, 101, 110 and 111, giving</p>
<p class="math">maj = a′bc + ab′c + abc′ + abc</p>
<p>Boolean algebra simplifies it. Since <em>abc</em> + <em>abc</em> = <em>abc</em> (the law <em>a</em> + <em>a</em> = <em>a</em>), we may add two more copies of <em>abc</em> and pair one with each of the first three terms. Then factor each pair (AND distributes over OR, as in ordinary algebra) and use <em>a</em> + <em>a</em>′ = 1 and <em>x</em> · 1 = <em>x</em>:</p>
<p class="math"><em>a</em>′<em>bc</em> + <em>abc</em> = <em>bc</em>(<em>a</em>′ + <em>a</em>) = <em>bc</em> · 1 = <em>bc</em>, and likewise <em>ab</em>′<em>c</em> + <em>abc</em> = <em>ac</em> and <em>abc</em>′ + <em>abc</em> = <em>ab</em>.</p>
<p>So maj = <em>bc</em> + <em>ac</em> + <em>ab</em>: three 2-input ANDs and a 3-input OR. Simplification matters because every gate costs area, power and time. Designers use maps of the truth table (Karnaugh maps) by hand for small functions, and software for large ones.</p>
<p>The sum-of-products construction proves something important: <strong>AND, OR and NOT can build any Boolean function</strong>. A set of gates with this property is called <strong>functionally complete</strong>.</p>

<h3>NAND is enough</h3>
<p>NAND alone is functionally complete, because it can make NOT, AND and OR:</p>
<ul>
<li>NOT <em>a</em> = NAND(<em>a</em>, <em>a</em>);</li>
<li><em>a</em> AND <em>b</em> = NOT(NAND(<em>a</em>, <em>b</em>));</li>
<li><em>a</em> OR <em>b</em> = NAND(NOT <em>a</em>, NOT <em>b</em>), by De Morgan.</li>
</ul>
<p>So a chip could in principle be built from one kind of gate. (NOR is also complete; the Apollo Guidance Computer that flew to the Moon was built entirely from about 5,600 three-input NOR gates.)</p>

<h3>Delay</h3>
<p>A gate's output doesn't change instantly: each gate adds a small <strong>propagation delay</strong>, tens of picoseconds in a modern chip. The delay of a circuit is the delay along its longest path from input to output, its <strong>critical path</strong>, measured in gate levels. A sum-of-products circuit has only two levels (AND then OR), but may need huge gates; deeper circuits use small gates but take longer. This trade-off between size and speed runs through the whole course, starting with adders in the next lesson.</p>
`,
      terms: [
        ["Transistor", "An electronically controlled switch; billions of them make up a chip."],
        ["Logic gate", "A small circuit computing a fixed Boolean function, such as AND, OR, NOT, NAND or XOR."],
        ["Truth table", "A list of a Boolean function's output for every combination of inputs."],
        ["De Morgan's laws", "(ab)′ = a′ + b′ and (a + b)′ = a′b′."],
        ["Sum of products", "A Boolean formula that ORs together ANDs of inputs or their negations; every function has one."],
        ["Functionally complete", "A set of gates that can build every Boolean function; {NAND} alone is one."],
        ["Propagation delay", "The time a gate takes for its output to respond to a change in its inputs."],
        ["Critical path", "The longest path through a circuit, which sets its delay."]
      ],
      quiz: [
        { q: "How many rows does the truth table of a 4-input function have?", choices: ["4", "8", "16", "32"], answer: 2, why: "2⁴ = 16 combinations of inputs." },
        { q: "By De Morgan's law, (a + b)′ equals:", choices: ["a′ + b′", "a′b′", "ab", "(ab)′"], answer: 1, why: "NOT (a OR b) = (NOT a) AND (NOT b)." },
        { q: "How do you make NOT a from NAND gates?", choices: ["NAND(a, 0)", "NAND(a, a)", "NAND(a, 1) twice", "It's impossible"], answer: 1, why: "NAND(a, a) = NOT(a AND a) = NOT a." },
        { q: "In the sum-of-products construction, how many product terms does a function get?", choices: ["One per input", "One per row where the output is 1", "Always 2ⁿ", "One per row where the output is 0"], answer: 1, why: "Each product is 1 on exactly one such row." },
        { q: "What sets the delay of a circuit?", choices: ["The number of gates", "Its longest input-to-output path", "The number of inputs", "The power supply"], answer: 1, why: "The output is ready only when the slowest path has finished." }
      ],
      practice: [
        {
          q: `<p>Write the sum-of-products form of XOR, and build XOR from AND, OR and NOT gates. How many gates does it use?</p>`,
          a: `<p>XOR is 1 on rows 01 and 10: <em>a</em> ⊕ <em>b</em> = <em>a</em>′<em>b</em> + <em>ab</em>′. Two NOTs, two ANDs and one OR: 5 gates. (With NANDs alone, XOR takes 4: NAND(NAND(<em>a</em>, <em>n</em>), NAND(<em>b</em>, <em>n</em>)) where <em>n</em> = NAND(<em>a</em>, <em>b</em>).)</p>`
        },
        {
          q: `<p>Simplify <em>ab</em> + <em>ab</em>′ + <em>a</em>′<em>b</em> using Boolean algebra, and check your answer with a truth table.</p>`,
          a: `<p><em>ab</em> + <em>ab</em>′ = <em>a</em>(<em>b</em> + <em>b</em>′) = <em>a</em>. Then <em>a</em> + <em>a</em>′<em>b</em> = (<em>a</em> + <em>a</em>′)(<em>a</em> + <em>b</em>) = <em>a</em> + <em>b</em>. The truth table of the original is 0, 1, 1, 1: OR.</p>`
        },
        {
          q: `<p>Show that NOR is functionally complete by building NOT, OR and AND from NOR gates.</p>`,
          a: `<p>NOT <em>a</em> = NOR(<em>a</em>, <em>a</em>). <em>a</em> OR <em>b</em> = NOT(NOR(<em>a</em>, <em>b</em>)). <em>a</em> AND <em>b</em> = NOR(NOT <em>a</em>, NOT <em>b</em>), by De Morgan.</p>`
        },
        {
          q: `<p>A security system sounds an alarm if the system is armed (<em>s</em>) and either a door (<em>d</em>) or a window (<em>w</em>) opens, or at any time if the panic button (<em>p</em>) is pressed. Write the Boolean formula and count the gates.</p>`,
          a: `<p>alarm = <em>s</em>(<em>d</em> + <em>w</em>) + <em>p</em>: one OR for <em>d</em> + <em>w</em>, one AND, and one final OR: three 2-input gates, three gate levels deep.</p>`
        }
      ],
      sources: ["hh", "nand2tetris", "patthen"]
    },
    {
      id: "ar2",
      title: "Combinational circuits: choosing and adding",
      minutes: 90,
      summary: "Circuits whose outputs depend only on their current inputs: multiplexers and decoders, the half and full adder, the ripple-carry adder and its delay, faster carry-lookahead, subtraction with two's complement, and an ALU.",
      notes: `
<p>A <strong>combinational circuit</strong> computes its outputs from its current inputs alone, with no memory of the past. This lesson builds the combinational parts of a processor: circuits that choose between values and circuits that do arithmetic.</p>

<h3>Multiplexers and decoders</h3>
<p>A <strong>multiplexer</strong> (mux) is a circuit switch: it has data inputs, select inputs, and one output that copies the data input chosen by the select bits. A 2-to-1 mux with inputs <em>x</em>, <em>y</em> and select <em>s</em> computes <em>s</em>′<em>x</em> + <em>sy</em>. With <em>k</em> select bits, a mux chooses among 2<sup><em>k</em></sup> inputs; it can be built as a tree of 2-to-1 muxes. Processors are full of muxes: choosing the next instruction's address, choosing an operand, choosing which result to write back.</p>
<p>A <strong>decoder</strong> does the reverse: it turns a <em>k</em>-bit number into 2<sup><em>k</em></sup> output lines, exactly one of which is 1. Decoders select which register or memory location an instruction refers to.</p>

<h3>Adding one bit</h3>
<p>Adding two binary numbers works like decimal addition by hand: column by column from the right, with carries. In each column we add two bits <em>a</em> and <em>b</em> plus a carry-in <em>c</em>, producing a sum bit and a carry-out. This is a <strong>full adder</strong>:</p>
<table>
<thead><tr><th>a</th><th>b</th><th>c in</th><th>sum</th><th>c out</th></tr></thead>
<tbody>
<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
<tr><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td></tr>
<tr><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td></tr>
<tr><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
</tbody>
</table>
<p>The sum is 1 when an odd number of inputs are 1: sum = <em>a</em> ⊕ <em>b</em> ⊕ <em>c</em>. The carry-out is the majority function from Lesson 1 (1 when at least two inputs are 1), written in a form that reuses the sum's <em>a</em> ⊕ <em>b</em>: <em>c</em><sub>out</sub> = <em>ab</em> + <em>c</em>(<em>a</em> ⊕ <em>b</em>). To see that it is the same function as <em>bc</em> + <em>ac</em> + <em>ab</em>, check the three possibilities for <em>a</em> and <em>b</em>. If both are 1, both formulas give 1. If both are 0, both give 0 (<em>a</em> ⊕ <em>b</em> = 0, and <em>c</em> alone is not a majority). If exactly one is 1, <em>a</em> ⊕ <em>b</em> = 1 and <em>ab</em> = 0, so the new formula gives <em>c</em>; the majority is also <em>c</em>, since <em>c</em> decides whether there are one or two 1s. (A <em>half adder</em> is the same without a carry-in: sum = <em>a</em> ⊕ <em>b</em>, carry = <em>ab</em>.)</p>

<h3>The ripple-carry adder</h3>
<p>Chain <em>n</em> full adders, feeding each carry-out into the next column's carry-in, and you have an <em>n</em>-bit adder. Here it is in Python, with numbers as lists of bits, least significant first:</p>
<pre><code>def full_adder(a, b, c):
    s = a ^ b ^ c
    carry = (a &amp; b) | (c &amp; (a ^ b))
    return s, carry

def ripple_add(xs, ys, carry=0):
    """xs, ys: lists of bits, least significant first. Returns (sum bits, carry out)."""
    out = []
    for a, b in zip(xs, ys):
        s, carry = full_adder(a, b, carry)
        out.append(s)
    return out, carry

def to_bits(n, width):
    return [(n &gt;&gt; i) &amp; 1 for i in range(width)]

def from_bits(bits):
    return sum(b &lt;&lt; i for i, b in enumerate(bits))

s, c = ripple_add(to_bits(11, 4), to_bits(6, 4))
print(from_bits(s), c)   # 1 1: 11 + 6 = 17 = 16 + 1, so the 4-bit result is 1 with a carry out</code></pre>
<p>The ripple-carry adder is small (<em>n</em> full adders) but slow: the carry may have to "ripple" through all <em>n</em> columns (adding 1 to 0111…1), so its delay grows like Θ(<em>n</em>). For 64-bit numbers that's 64 carry stages in a row, far too slow for a processor running billions of additions a second.</p>

<h3>Carry lookahead</h3>
<p>The fix is to compute carries in parallel. Column <em>i</em> <strong>generates</strong> a carry if <em>g</em><sub><em>i</em></sub> = <em>a</em><sub><em>i</em></sub><em>b</em><sub><em>i</em></sub> (both bits 1), and <strong>propagates</strong> an incoming carry if <em>p</em><sub><em>i</em></sub> = <em>a</em><sub><em>i</em></sub> ⊕ <em>b</em><sub><em>i</em></sub> (exactly one bit is 1). Then</p>
<p class="math">c<sub>i+1</sub> = g<sub>i</sub> + p<sub>i</sub>c<sub>i</sub> = g<sub>i</sub> + p<sub>i</sub>g<sub>i−1</sub> + p<sub>i</sub>p<sub>i−1</sub>g<sub>i−2</sub> + … + p<sub>i</sub>⋯p<sub>0</sub>c<sub>0</sub></p>
<p>Every carry is now a two-level formula in the inputs, computable at once, though the formulas grow with <em>i</em>. Real <strong>carry-lookahead</strong> adders instead combine (<em>g</em>, <em>p</em>) pairs in a tree, block by block. Give a block of adjacent columns a pair (<em>G</em>, <em>P</em>): <em>G</em> = 1 if the block produces a carry out of its top column even with no carry in, and <em>P</em> = 1 if a carry into the block would pass all the way through it. Two neighboring blocks, a high one (<em>G</em><sub>h</sub>, <em>P</em><sub>h</sub>) and a low one (<em>G</em><sub>l</sub>, <em>P</em><sub>l</sub>), form one bigger block with</p>
<p class="math">G = G<sub>h</sub> + P<sub>h</sub>G<sub>l</sub>,   P = P<sub>h</sub>P<sub>l</sub></p>
<p>The big block generates a carry if the high block does, or if the low block does and the high block passes it on; a carry passes through the big block only if it passes through both. Each combine is two gate levels. Start with the <em>n</em> single columns (<em>g</em><sub><em>i</em></sub>, <em>p</em><sub><em>i</em></sub>), combine neighbors in pairs, then pairs of pairs, and so on: the block size doubles each level, so after log₂ <em>n</em> levels one block covers all <em>n</em> bits, and its carry-out is <em>G</em> + <em>Pc</em><sub>0</sub>.</p>
<pre><code>def combine(high, low):
    """(G, P) of two adjacent blocks -&gt; (G, P) of the block they form."""
    gh, ph = high
    gl, pl = low
    return gh | (ph &amp; gl), ph &amp; pl

def block_gp(xs, ys):
    pairs = [(a &amp; b, a ^ b) for a, b in zip(xs, ys)]   # one (g, p) per column
    while len(pairs) &gt; 1:                              # one tree level per pass
        pairs = [combine(pairs[i + 1], pairs[i]) for i in range(0, len(pairs), 2)]
    return pairs[0]

G, P = block_gp(to_bits(11, 4), to_bits(6, 4))
print(G, P)   # 1 0: the 4-bit block generates a carry out, so 11 + 6 carries
G, P = block_gp(to_bits(9, 4), to_bits(6, 4))
print(G, P)   # 0 1: 9 + 6 = 15 = 1111, so a carry in would pass straight through</code></pre>
<p>(The function needs a power-of-two width.) The carries into the middle columns come from the same tree, in a second pass that runs from the root back down. Each node is told the carry <em>c</em> into its block (the root gets <em>c</em><sub>0</sub>). It passes <em>c</em> unchanged to its low half, and passes <em>G</em><sub>l</sub> + <em>P</em><sub>l</sub><em>c</em> to its high half, using the low half's pair saved from the first pass. Each node does one such step, the tree has log₂ <em>n</em> levels, and at the bottom every column has its carry in. So all carries take Θ(log <em>n</em>) gate levels: 6 levels of combining for 64 bits instead of 64 ripple stages. This is the divide-and-conquer idea from CS 220 Lesson 1, in hardware.</p>

<h3>Subtraction</h3>
<p>Two's complement (CS 210 Lesson 1) makes subtraction free: <em>a</em> − <em>b</em> = <em>a</em> + (−<em>b</em>) = <em>a</em> + <em>b</em>′ + 1. Invert every bit of <em>b</em> (an XOR with 1 on each bit does it) and set the adder's carry-in to 1. One adder, plus a row of XOR gates controlled by a "subtract" signal, does both operations. Overflow is detected the way CS 210 described: when the carry into the top column differs from the carry out of it.</p>

<h3>The ALU</h3>
<p>The <strong>arithmetic logic unit</strong> (ALU) is the processor's calculator. It takes two operands and an operation code, computes several results in parallel (sum, difference, AND, OR, XOR, comparison), and uses a mux to output the one the operation code selects. It also produces <strong>flags</strong> such as "the result is zero", which branch instructions test (CS 210's <code>cmp</code> and <code>jne</code>).</p>
<pre><code>def alu(op, a, b, width=8):
    mask = (1 &lt;&lt; width) - 1
    results = {
        "add": (a + b) &amp; mask,
        "sub": (a - b) &amp; mask,
        "and": a &amp; b,
        "or": a | b,
        "xor": a ^ b,
        "slt": 1 if (a - b) &amp; (1 &lt;&lt; (width - 1)) else 0,   # "set if less than" (signed, if no overflow)
    }
    result = results[op]          # the mux
    return result, result == 0    # value and zero flag

print(alu("sub", 5, 9))   # (252, False): 5 - 9 = -4, which is 252 in 8-bit two's complement</code></pre>
<p>Every operation is computed every time; the mux simply picks one. Hardware doesn't skip work the way software can, because the circuits are all there anyway. (This simple <code>slt</code> reads the sign of the difference, which is wrong when the subtraction overflows; real ALUs correct for that using the overflow signal.)</p>
`,
      terms: [
        ["Combinational circuit", "A circuit whose outputs depend only on its current inputs."],
        ["Multiplexer", "A circuit that copies one of several inputs to its output, chosen by select bits."],
        ["Decoder", "A circuit that turns a k-bit number into 2^k lines, exactly one of which is 1."],
        ["Full adder", "A circuit adding two bits and a carry-in, giving a sum bit and a carry-out."],
        ["Ripple-carry adder", "n full adders chained by their carries; small but with delay Θ(n)."],
        ["Carry lookahead", "Computing all carries in parallel from generate and propagate signals; delay Θ(log n)."],
        ["ALU", "The arithmetic logic unit: computes arithmetic and logic operations and selects one by an operation code."]
      ],
      quiz: [
        { q: "A multiplexer has 3 select bits. How many data inputs can it choose among?", choices: ["3", "6", "8", "9"], answer: 2, why: "2³ = 8." },
        { q: "What does a full adder output for a = 1, b = 1, carry-in = 1?", choices: ["sum 0, carry 1", "sum 1, carry 1", "sum 1, carry 0", "sum 0, carry 0"], answer: 1, why: "1 + 1 + 1 = 3 = binary 11." },
        { q: "Why is a ripple-carry adder slow for 64 bits?", choices: ["It has too many gates", "A carry may pass through all 64 columns one after another", "It can't add negative numbers", "It needs a clock"], answer: 1, why: "Its delay grows linearly with the width." },
        { q: "How does an adder compute a − b?", choices: ["With a separate subtractor", "a + (b with every bit inverted) + 1, using carry-in 1", "By dividing", "By shifting b"], answer: 1, why: "That's −b in two's complement." },
        { q: "When the ALU is asked to add, what happens to its AND circuit?", choices: ["It's switched off", "It still computes a result, which the output mux ignores", "It adds too", "It raises an error"], answer: 1, why: "All operations are computed in parallel; the mux selects one." }
      ],
      practice: [
        {
          q: `<p>Build a 4-to-1 multiplexer from 2-to-1 multiplexers. How many do you need, and how are the two select bits used?</p>`,
          a: `<p>Three: two first-level muxes choose between inputs 0/1 and 2/3 using select bit <em>s</em><sub>0</sub>, and a second-level mux chooses between their outputs using <em>s</em><sub>1</sub>. In general, 2<sup><em>k</em></sup> − 1 two-input muxes, <em>k</em> levels deep.</p>`
        },
        {
          q: `<p>Add 0110 and 0111 with a 4-bit ripple-carry adder, showing the carry into each column. Is there signed overflow?</p>`,
          a: `<p>Column 0: 0 + 1 = 1, carry 0. Column 1: 1 + 1 = 0, carry 1. Column 2: 1 + 1 + 1 = 1, carry 1. Column 3: 0 + 0 + 1 = 1, carry 0. Result 1101. As signed 4-bit numbers, 6 + 7 = 13 doesn't fit (range −8 to 7): 1101 reads as −3. Overflow, detected because the carry into column 3 (1) differs from the carry out (0).</p>`
        },
        {
          q: `<p>Compute <em>g</em> and <em>p</em> for each column of 1011 + 0110, and use the lookahead formula to find <em>c</em><sub>2</sub> without rippling (carry-in <em>c</em><sub>0</sub> = 0).</p>`,
          a: `<p>Least significant first: <em>a</em> = 1,1,0,1 and <em>b</em> = 0,1,1,0. g = 0,1,0,0; p = 1,0,1,1. <em>c</em><sub>2</sub> = <em>g</em><sub>1</sub> + <em>p</em><sub>1</sub><em>g</em><sub>0</sub> + <em>p</em><sub>1</sub><em>p</em><sub>0</sub><em>c</em><sub>0</sub> = 1 + 0 + 0 = 1. Check by rippling: column 0 gives carry 0, column 1 (1 + 1) gives carry 1. ✓</p>`
        },
        {
          q: `<p>Using the <code>alu</code> function, compute <code>alu("slt", 3, 250)</code> and explain the result in signed 8-bit terms.</p>`,
          a: `<p>250 is −6 in 8-bit two's complement, so the question is "is 3 &lt; −6?", and the answer should be 0. 3 − 250 = −247, and −247 &amp; 255 = 9, whose top bit is 0, so the function returns (0, True): result 0, and the zero flag is set because the result is 0.</p>`
        }
      ],
      sources: ["hh", "patthen", "nand2tetris"]
    },
    {
      id: "ar3",
      title: "Sequential logic: circuits that remember",
      minutes: 90,
      summary: "How circuits store bits: feedback, the SR latch, the D latch and the edge-triggered flip-flop, the clock, registers and counters, and finite state machines as the design method for sequential circuits.",
      notes: `
<p>A combinational circuit forgets: change its inputs and its output follows. A computer also needs <strong>state</strong>: registers that hold values, a program counter that remembers where it is, memory. Circuits with state are called <strong>sequential</strong>, because their outputs depend on the sequence of past inputs.</p>

<h3>Feedback: the SR latch</h3>
<p>Memory comes from <strong>feedback</strong>: connecting a gate's output back to its input. Take two NOR gates and connect each one's output to an input of the other. The remaining inputs are <em>S</em> (set) and <em>R</em> (reset), and the outputs are <em>Q</em> and its complement.</p>
<ul>
<li><em>S</em> = 1, <em>R</em> = 0 forces <em>Q</em> = 1.</li>
<li><em>S</em> = 0, <em>R</em> = 1 forces <em>Q</em> = 0.</li>
<li><em>S</em> = 0, <em>R</em> = 0: each gate's output holds the other in place, so <em>Q</em> keeps whatever value it had. The circuit <em>remembers</em> one bit.</li>
<li><em>S</em> = <em>R</em> = 1 is not allowed: it forces both outputs to 0, and releasing both inputs at once leaves the latch in an unpredictable state.</li>
</ul>
<p>This <strong>SR latch</strong> is the simplest memory element. We can simulate it by applying the gate equations repeatedly until nothing changes:</p>
<pre><code>def nor(a, b):
    return 1 - (a | b)

def sr_latch(S, R, Q):
    """Settle the cross-coupled NOR gates; Q is the stored value before the inputs change."""
    Qbar = 1 - Q
    for _ in range(4):                 # a few rounds are enough to settle
        Q, Qbar = nor(R, Qbar), nor(S, Q)
    return Q

Q = 0
for S, R in [(1, 0), (0, 0), (0, 1), (0, 0)]:
    Q = sr_latch(S, R, Q)
    print(S, R, "-&gt;", Q)
# 1 0 -&gt; 1   (set)
# 0 0 -&gt; 1   (remembers)
# 0 1 -&gt; 0   (reset)
# 0 0 -&gt; 0   (remembers)</code></pre>

<h3>The D latch and the clock</h3>
<p>A more convenient element has a data input <em>D</em> and an enable input: while enabled, <em>Q</em> follows <em>D</em>; while disabled, <em>Q</em> holds its value. This <strong>D latch</strong> is an SR latch with a little logic in front (<em>S</em> = <em>D</em> · enable, <em>R</em> = <em>D</em>′ · enable), which also rules out the forbidden <em>S</em> = <em>R</em> = 1.</p>
<p>Processors coordinate all their memory elements with a <strong>clock</strong>: a signal that alternates between 0 and 1 billions of times a second (a 3 GHz clock has a period of about 0.33 ns). The clock divides time into <strong>cycles</strong>. During each cycle, combinational logic computes new values from the stored ones; at the end of the cycle, the memory elements capture the new values all at once.</p>

<h3>Edge-triggered flip-flops</h3>
<p>A D latch is "transparent" while enabled: if its output feeds back through logic to its own input, values could race around the loop several times within one cycle. The solution is the <strong>edge-triggered D flip-flop</strong>, which samples <em>D</em> only at the instant the clock rises from 0 to 1 (the <em>rising edge</em>), and holds that value for the whole next cycle. It can be built from two D latches in a row, enabled on opposite halves of the clock. The first latch is enabled while the clock is 0, so it follows <em>D</em>; the second is enabled while the clock is 1 and copies the first latch's output to <em>Q</em>. When the clock rises, the first latch closes, holding whatever <em>D</em> was at that instant, and the second opens and passes that held value to <em>Q</em>. While the clock is 1, <em>D</em> can change freely, because the first latch is closed. When the clock falls, the second latch closes, holding <em>Q</em>, and the first opens again, but its changes can't reach <em>Q</em> until the next rise. At no moment are both latches open, so <em>Q</em> changes only at a rising edge, to the value <em>D</em> had then. With flip-flops, each cycle's results are captured exactly once, so a loop through logic and back is safe. The clock period must be long enough for the slowest combinational path (Lesson 1's critical path) to settle before the next edge: this sets the maximum clock speed.</p>

<h3>Registers and counters</h3>
<p>A <strong>register</strong> is a row of flip-flops sharing a clock: a 64-bit register is 64 flip-flops. A processor's <strong>register file</strong> is an array of registers (32 in RISC-V) with decoders to choose which one to write and multiplexers to choose which ones to read.</p>
<p>A <strong>counter</strong> is a register whose input is its own output plus 1, through an adder: each clock edge, it counts up. The program counter is a counter (usually adding 4, the size of an instruction) with a mux that can load a jump target instead.</p>

<h3>Finite state machines</h3>
<p>The general way to design sequential circuits is the <strong>finite state machine</strong> (FSM): a finite set of states, a start state, and rules saying, for each state and input, which state comes next and what to output. The state is stored in flip-flops; the rules are combinational logic. The same model appears throughout computer science, in protocol design, user interfaces, text processing (Theory of Computation studies FSMs as a model of computation) and game AI.</p>
<p><strong>Example: detecting "101".</strong> A circuit receives one bit per cycle and should output 1 whenever the last three bits were 1, 0, 1 (overlaps allowed). States record how much of the pattern has been seen: "nothing useful" (A), "seen 1" (B), "seen 10" (C).</p>
<table>
<thead><tr><th>State</th><th>Input 0</th><th>Input 1</th></tr></thead>
<tbody>
<tr><td>A (nothing)</td><td>A</td><td>B</td></tr>
<tr><td>B (seen 1)</td><td>C</td><td>B</td></tr>
<tr><td>C (seen 10)</td><td>A</td><td>B, and output 1</td></tr>
</tbody>
</table>
<p>From C, a 1 completes "101" and, since that 1 could start a new match, goes to B.</p>
<pre><code>NEXT = {("A", 0): "A", ("A", 1): "B", ("B", 0): "C", ("B", 1): "B", ("C", 0): "A", ("C", 1): "B"}

def detect_101(bits):
    state, out = "A", []
    for b in bits:
        out.append(1 if (state, b) == ("C", 1) else 0)
        state = NEXT[(state, b)]
    return out

print(detect_101([1, 0, 1, 0, 1, 1, 0, 1]))   # [0, 0, 1, 0, 1, 0, 0, 1]</code></pre>
<p>In hardware, three states need two flip-flops (encoding A = 00, B = 01, C = 10), and the table becomes a small truth table for the next-state and output logic.</p>
`,
      terms: [
        ["Sequential circuit", "A circuit with state, whose outputs depend on past inputs as well as current ones."],
        ["Latch", "A memory element whose output follows its input while enabled and holds while disabled."],
        ["Clock", "A regularly alternating signal that divides time into cycles and synchronizes memory elements."],
        ["Flip-flop", "An edge-triggered memory element that captures its input only at the clock's rising edge."],
        ["Register", "A group of flip-flops storing a multi-bit value, sharing a clock."],
        ["Finite state machine", "A model with finitely many states, transition rules on inputs, and outputs; implemented with flip-flops and logic."]
      ],
      quiz: [
        { q: "What makes an SR latch remember?", choices: ["A capacitor", "Feedback: each gate's output holds the other gate in place", "The clock", "A transistor that stays on"], answer: 1, why: "With S = R = 0, the cross-coupled gates keep each other's outputs stable." },
        { q: "When does an edge-triggered D flip-flop change its output?", choices: ["Whenever D changes", "Only at the clock's rising edge", "When the clock is 1", "Never"], answer: 1, why: "It samples D at the edge and holds that value for the cycle." },
        { q: "A clock runs at 2 GHz. What is its period?", choices: ["2 ns", "0.5 ns", "500 ns", "0.2 ns"], answer: 1, why: "1 / (2 × 10⁹) s = 0.5 ns." },
        { q: "What limits how fast a processor's clock can run?", choices: ["The number of registers", "The delay of the slowest combinational path between flip-flops", "The size of memory", "The instruction set"], answer: 1, why: "Values must settle before the next edge captures them." },
        { q: "How many flip-flops does an FSM with 5 states need, at least?", choices: ["2", "3", "5", "1"], answer: 1, why: "2 flip-flops encode 4 states; 3 encode up to 8." }
      ],
      practice: [
        {
          q: `<p>Trace the "101" detector on the input 1 1 0 1 0 1 0. List the state before each bit and the outputs.</p>`,
          a: `<p>States A, B, B, C, B, C, B, then C after the last 0. Outputs: 0, 0, 0, 1, 0, 1, 0. Matches end at positions 4 and 6 (counting from 1); they overlap in the shared middle 1.</p>`
        },
        {
          q: `<p>Design an FSM for a vending machine that accepts 5¢ and 10¢ coins and dispenses an item (output 1) once 15¢ or more has been inserted, then resets. In this version the machine keeps any excess (inserting 10¢ + 10¢ buys one item and gives no change); the programming problem "A vending machine" adds an output that returns the excess as change. Give the states and transitions.</p>`,
          a: `<p>States by amount inserted: 0, 5, 10. From 0: 5¢ → 5, 10¢ → 10. From 5: 5¢ → 10, 10¢ → dispense, back to 0. From 10: 5¢ or 10¢ → dispense, back to 0. Three states need two flip-flops.</p>`
        },
        {
          q: `<p>A 3-bit counter starts at 000 and counts up on each clock edge, wrapping from 111 to 000. Write the next-state formula for the lowest bit, and explain why the highest bit changes only when the two lower bits are both 1.</p>`,
          a: `<p>The lowest bit flips every cycle: <em>q</em><sub>0</sub>′ (next) = NOT <em>q</em><sub>0</sub>. Adding 1 carries into bit 2 only when bits 1 and 0 are both 1 (…011 + 1 = …100), so bit 2's next value is <em>q</em><sub>2</sub> ⊕ (<em>q</em><sub>1</sub><em>q</em><sub>0</sub>): the ripple-carry adder's logic, specialized to adding 1.</p>`
        }
      ],
      sources: ["hh", "patthen", "nand2tetris"]
    },
    {
      id: "ar4",
      title: "The RISC-V instruction set",
      minutes: 90,
      summary: "What an instruction set specifies, the design of RISC-V: registers, a load/store architecture, the instruction formats and how instructions are encoded as 32-bit numbers, and short RISC-V programs with loops and memory.",
      notes: `
<p>CS 210 read x86-64 assembly, the instruction set of most laptops. It has accumulated over 1,000 instructions and variable-length encodings over 45 years. To understand how a processor executes instructions, a simpler and cleaner instruction set is better. This course uses <strong>RISC-V</strong> ("risk five"), designed at the University of California, Berkeley, starting in 2010, by Krste Asanović, Yunsup Lee and Andrew Waterman, with David Patterson. It is an <em>open standard</em>: anyone may build a RISC-V chip without paying licence fees, and it is now used in billions of devices, from microcontrollers to data-center chips.</p>

<h3>The programmer's view</h3>
<p>The base instruction set, RV32I (with a 64-bit variant, RV64I), specifies:</p>
<ul>
<li><strong>32 registers</strong>, x0 to x31, each 32 bits (64 in RV64). Register x0 always reads as 0 and ignores writes, which turns out to be very useful. The registers also have <strong>ABI names</strong> that describe their conventional roles. The ABI (<em>application binary interface</em>) is the set of rules that compiled code agrees on so that separately compiled functions can call each other, like CS 210's x86-64 calling convention: which registers carry arguments and return values, which ones a function must preserve. The hardware treats x10 and a0 identically; the name records the convention: a0–a7 for arguments and return values, t0–t6 for temporaries, s0–s11 for values saved across calls, sp for the stack pointer, ra for the return address.</li>
<li>A <strong>program counter</strong>.</li>
<li>Byte-addressed memory, little-endian (CS 210 Lesson 1).</li>
<li>About 40 instructions, all exactly <strong>32 bits</strong> long.</li>
</ul>
<p>RISC-V is a <strong>load/store architecture</strong>: arithmetic works only on registers, and only load and store instructions touch memory. (x86 lets an <code>add</code> read memory directly.) This regularity is the "RISC" idea, for <em>reduced instruction set computer</em>, from research in the early 1980s by Patterson at Berkeley and John Hennessy at Stanford, who shared the 2017 Turing Award for it.</p>

<h3>Instructions</h3>
<p>RISC-V assembly puts the destination register <em>first</em> (the reverse of CS 210's x86 syntax):</p>
<pre data-label="RISC-V"><code>add  x5, x6, x7      # x5 = x6 + x7
sub  x5, x6, x7      # x5 = x6 - x7
addi x5, x6, -3      # x5 = x6 + (-3): "immediate" constant in the instruction
lw   x5, 8(x6)       # load word: x5 = memory[x6 + 8], 4 bytes
sw   x5, 12(x6)      # store word: memory[x6 + 12] = x5
beq  x5, x6, label   # branch to label if x5 == x6
jal  ra, func        # jump to func, saving the return address in ra</code></pre>
<p>There's no "move" or "load constant" instruction: <code>addi x5, x0, 42</code> puts 42 in x5 (adding to x0, which is always 0), and <code>add x5, x6, x0</code> copies x6. The assembler accepts <code>li</code> and <code>mv</code> as shorthand for these. Removing special cases this way keeps the hardware simple.</p>

<h3>Encoding</h3>
<p>Each instruction is a 32-bit number, divided into fields. The <strong>opcode</strong> (the low 7 bits) says which kind of instruction it is; other fields name registers (5 bits each, enough for 32 registers) and give constants. RISC-V has six formats. Each cell below gives a field and, in parentheses, the instruction bits it occupies; a field that spans several columns occupies all of their bits.</p>
<table>
<thead><tr><th>Format</th><th>Bits 31–25</th><th>Bits 24–20</th><th>Bits 19–15</th><th>Bits 14–12</th><th>Bits 11–7</th><th>Bits 6–0</th><th>Used by</th></tr></thead>
<tbody>
<tr><td>R</td><td>funct7 (31–25)</td><td>rs2 (24–20)</td><td>rs1 (19–15)</td><td>funct3 (14–12)</td><td>rd (11–7)</td><td>opcode (6–0)</td><td>add, sub, and, or, slt</td></tr>
<tr><td>I</td><td colspan="2">imm[11:0] (31–20)</td><td>rs1 (19–15)</td><td>funct3 (14–12)</td><td>rd (11–7)</td><td>opcode (6–0)</td><td>addi, lw, jalr</td></tr>
<tr><td>S</td><td>imm[11:5] (31–25)</td><td>rs2 (24–20)</td><td>rs1 (19–15)</td><td>funct3 (14–12)</td><td>imm[4:0] (11–7)</td><td>opcode (6–0)</td><td>sw</td></tr>
<tr><td>B</td><td>imm[12, 10:5] (31–25)</td><td>rs2 (24–20)</td><td>rs1 (19–15)</td><td>funct3 (14–12)</td><td>imm[4:1, 11] (11–7)</td><td>opcode (6–0)</td><td>beq, bne, blt, bge</td></tr>
<tr><td>U</td><td colspan="4">imm[31:12] (31–12)</td><td>rd (11–7)</td><td>opcode (6–0)</td><td>lui</td></tr>
<tr><td>J</td><td colspan="4">imm[20, 10:1, 11, 19:12] (31–12)</td><td>rd (11–7)</td><td>opcode (6–0)</td><td>jal</td></tr>
</tbody>
</table>
<p>(rd is the destination register, rs1 and rs2 the source registers, and imm[11:0] means bits 11 to 0 of the immediate. imm[12, 10:5] means immediate bit 12 followed by bits 10 to 5, from the instruction's bit 31 down.) The registers always sit in the same bit positions in every format, so the processor can start reading registers before it has even finished decoding the instruction. That's why S-format splits its immediate into two pieces: to keep rs2 where R-format has it.</p>
<p>The other three formats follow the same rule. <strong>B</strong> (branches) is S with its immediate bits shuffled. The immediate is the distance in bytes from the branch to its target; instructions sit at even addresses, so that distance is always even, its bit 0 is always 0 and isn't stored, and the 12 stored bits are bits 12 to 1 (targets up to 4,096 bytes away in either direction). <code>beq x5, x6, label</code> branches when x5 = x6. <strong>U</strong> holds a 20-bit constant for the upper bits of a register: <code>lui x5, 0x12345</code> ("load upper immediate") sets x5 = 0x12345000, and an <code>addi</code> can then add in the low 12 bits. Like every RISC-V immediate, addi's 12-bit immediate is <strong>sign-extended</strong> first: its top bit (bit 11) is copied into all the higher bits, so it is read as a two's-complement number from −2048 to 2047. <strong>J</strong> is U with its bits shuffled, holding <code>jal</code>'s jump distance (again even: 20 stored bits, bits 20 to 1, so up to about a million bytes away). The shuffles look odd, but they keep each immediate bit in the same instruction bit across formats as often as possible, which saves wiring in the decoder.</p>
<p>Two jumps matter for function calls. <code>jal rd, label</code> jumps to the label and saves the address of the next instruction (the return address) in rd. <code>jalr rd, imm(rs1)</code>, in I format, jumps to the address rs1 + imm, again saving the return address in rd. A call is <code>jal ra, func</code>; a return is <code>jalr x0, 0(ra)</code>, which jumps back to the saved address and throws away its own return address by writing it to x0.</p>
<p><strong>Encoding <code>add x5, x6, x7</code>.</strong> R-format, opcode 0110011 (0x33), funct3 000, funct7 0000000 (sub differs only in funct7 = 0100000). rd = 5, rs1 = 6, rs2 = 7:</p>
<pre data-label="Bits"><code>funct7   rs2   rs1   funct3 rd    opcode
0000000  00111 00110 000    00101 0110011   = 0x007302B3</code></pre>
<p>In Python, encoding is shifting each field into place and ORing them together (CS 210's bit operations):</p>
<pre><code>def encode_r(funct7, rs2, rs1, funct3, rd, opcode):
    return (funct7 &lt;&lt; 25) | (rs2 &lt;&lt; 20) | (rs1 &lt;&lt; 15) | (funct3 &lt;&lt; 12) | (rd &lt;&lt; 7) | opcode

def encode_i(imm, rs1, funct3, rd, opcode):
    return ((imm &amp; 0xFFF) &lt;&lt; 20) | (rs1 &lt;&lt; 15) | (funct3 &lt;&lt; 12) | (rd &lt;&lt; 7) | opcode

print(hex(encode_r(0, 7, 6, 0, 5, 0x33)))     # 0x7302b3      add x5, x6, x7
print(hex(encode_r(0x20, 7, 6, 0, 5, 0x33)))  # 0x407302b3    sub x5, x6, x7
print(hex(encode_i(-3, 6, 0, 5, 0x13)))       # 0xffd30293    addi x5, x6, -3
print(hex(encode_i(8, 6, 2, 5, 0x03)))        # 0x832283      lw x5, 8(x6)</code></pre>
<p>The 12-bit immediate is two's complement, so it holds −2048 to 2047; <code>&amp; 0xFFF</code> keeps its low 12 bits (−3 becomes 0xFFD). These encodings match what a real RISC-V assembler produces.</p>

<h3>A program: summing an array</h3>
<p>Sum the <em>n</em> words of an array whose address is in a0 and whose length is in a1, returning the total in a0:</p>
<pre data-label="RISC-V"><code>sum:
    li   t0, 0           # total = 0
loop:
    beq  a1, x0, done    # if n == 0, finish
    lw   t1, 0(a0)       # t1 = the current element
    add  t0, t0, t1      # total += t1
    addi a0, a0, 4       # move to the next word (4 bytes on)
    addi a1, a1, -1      # n -= 1
    j    loop            # j is shorthand for jal x0, loop
done:
    mv   a0, t0          # return the total in a0
    ret                  # shorthand for jalr x0, 0(ra)</code></pre>
<p>Compare CS 210's x86-64 <code>sum_to</code>: the shape is the same (a test, a body, a backward jump), but every RISC-V instruction is one simple operation, and memory is reached only through <code>lw</code>. The free RARS simulator runs programs like this one step at a time.</p>
`,
      terms: [
        ["Instruction set architecture", "The contract between software and hardware: registers, instructions, their encodings and their effects."],
        ["RISC-V", "An open, modular RISC instruction set from UC Berkeley (2010), with 32 registers and 32-bit instructions."],
        ["Load/store architecture", "A design in which only load and store instructions access memory; arithmetic uses registers."],
        ["Opcode", "The field of an instruction (in RISC-V, the low 7 bits) that identifies its kind."],
        ["Immediate", "A constant encoded inside an instruction."],
        ["Instruction format", "The layout of an instruction's fields; RISC-V's main formats are R, I, S, B, U and J."]
      ],
      quiz: [
        { q: "What value does RISC-V register x0 always hold?", choices: ["The program counter", "0", "The stack pointer", "The last result"], answer: 1, why: "x0 is hardwired to 0, which simplifies many instructions." },
        { q: "In RISC-V assembly, which register does add x1, x2, x3 write?", choices: ["x1", "x2", "x3", "None"], answer: 0, why: "The destination comes first in RISC-V syntax." },
        { q: "How does RISC-V copy x6 into x5?", choices: ["mov x5, x6", "addi x5, x6, 0 (or add x5, x6, x0)", "lw x5, x6", "It can't"], answer: 1, why: "Adding zero copies; mv is assembler shorthand for it." },
        { q: "How many bits does an I-format immediate have, and what range does it hold?", choices: ["5 bits: 0–31", "12 bits: −2048 to 2047", "16 bits: 0–65535", "32 bits"], answer: 1, why: "A 12-bit two's complement number." },
        { q: "Why do rs1 and rs2 sit in the same bit positions in every format?", choices: ["Tradition", "So the processor can start reading registers before it finishes decoding", "To save bits", "It's required by C"], answer: 1, why: "Uniform positions simplify and speed up the hardware." }
      ],
      practice: [
        {
          q: `<p>Encode <code>and x10, x11, x12</code> (R-format, opcode 0x33, funct3 = 7, funct7 = 0) in binary and hex.</p>`,
          a: `<p>funct7 0000000, rs2 01100, rs1 01011, funct3 111, rd 01010, opcode 0110011: 0000000 01100 01011 111 01010 0110011 = 0x00C5F533.</p>`
        },
        {
          q: `<p>Decode 0x00A00093: which instruction is it? (Opcode 0x13 is the I-format arithmetic group; funct3 = 0 is addi.)</p>`,
          a: `<p>Opcode 0x13, rd = bits 11–7 = 00001 (x1), funct3 = 000, rs1 = bits 19–15 = 00000 (x0), immediate = bits 31–20 = 0x00A = 10. So <code>addi x1, x0, 10</code>: put 10 in x1 (<code>li ra, 10</code>).</p>`
        },
        {
          q: `<p>Write RISC-V code that sets t0 to the larger of t1 and t2. (<code>blt a, b, label</code> branches if a &lt; b, signed.)</p>`,
          a: `<pre data-label="RISC-V"><code>    mv   t0, t1          # assume t1 is larger
    blt  t2, t1, done    # if t2 &lt; t1, keep t1
    mv   t0, t2
done:</code></pre>`
        },
        {
          q: `<p>The 32-bit constant 0x12345678 doesn't fit in a 12-bit immediate. RISC-V's <code>lui rd, imm</code> ("load upper immediate") puts a 20-bit value in the top 20 bits of rd. Show how <code>lui</code> and <code>addi</code> load 0x12345678, and what goes wrong if the low 12 bits are 0x800 or more.</p>`,
          a: `<p><code>lui t0, 0x12345</code> gives 0x12345000; <code>addi t0, t0, 0x678</code> gives 0x12345678. If the low part were, say, 0x9AB, addi would sign-extend it as negative (0x9AB = −1621 as a 12-bit number), so the assembler adds 1 to the upper part first: 0x1234B9AB is loaded as lui 0x1234C then addi −0x655.</p>`
        }
      ],
      sources: ["patthen", "riscvspec", "hh"]
    }
  ]
});

CSA.addUnits("cs230", [
    {
      id: "ar5",
      title: "A single-cycle processor",
      minutes: 90,
      summary: "Putting the pieces together: the datapath that fetches, decodes and executes RISC-V instructions, the control signals that steer it, tracing add, lw, sw and beq through it, and the performance equation.",
      notes: `
<p>Lessons 1–4 built the components: gates, muxes, an ALU, registers and an instruction set. This lesson connects them into a processor that runs RISC-V instructions. The simplest design, a <strong>single-cycle</strong> processor, executes each instruction completely in one clock cycle.</p>

<h3>The datapath</h3>
<p>The <strong>datapath</strong> is the hardware that moves and transforms data. For our subset of RISC-V (add, sub, and, or, slt, addi, lw, sw, beq), it has:</p>
<ul>
<li>the <strong>program counter</strong> (PC), a 32-bit register holding the address of the current instruction;</li>
<li><strong>instruction memory</strong>, which outputs the instruction at the PC's address;</li>
<li>the <strong>register file</strong>: 32 registers, with two read ports (outputs for rs1 and rs2) and one write port (rd), written at the clock edge;</li>
<li>an <strong>immediate generator</strong> that pulls the immediate out of the instruction's bits and sign-extends it to 32 bits;</li>
<li>the <strong>ALU</strong> (Lesson 2);</li>
<li><strong>data memory</strong> for lw and sw;</li>
<li>an adder computing PC + 4, another computing the branch target PC + offset, and muxes to choose between alternatives.</li>
</ul>

<h3>An instruction's journey</h3>
<p>Every instruction follows the same steps:</p>
<ol>
<li><strong>Fetch:</strong> read the instruction at PC.</li>
<li><strong>Decode:</strong> split it into fields; read registers rs1 and rs2; generate the immediate.</li>
<li><strong>Execute:</strong> the ALU computes, with its second input chosen by a mux: rs2 for R-format, the immediate for addi, lw and sw.</li>
<li><strong>Memory:</strong> lw reads data memory at the address the ALU computed; sw writes rs2's value there.</li>
<li><strong>Write back:</strong> write the result into rd, chosen by a mux: the ALU result for arithmetic, the loaded value for lw.</li>
</ol>
<p>Meanwhile the next PC is chosen: PC + 4 normally, or PC + offset for a taken branch. Tracing the four kinds of instruction:</p>
<ul>
<li><code>add x5, x6, x7</code>: read x6 and x7; ALU adds; no memory access; write the sum to x5.</li>
<li><code>lw x5, 8(x6)</code>: read x6; ALU adds the immediate 8 to form an address; read data memory there; write the loaded word to x5.</li>
<li><code>sw x5, 12(x6)</code>: read x6 and x5; ALU forms x6 + 12; write x5's value to memory; no register write.</li>
<li><code>beq x5, x6, label</code>: read both; ALU subtracts; if the zero flag is set, the next PC is the branch target.</li>
</ul>

<h3>Control</h3>
<p>The same datapath runs every instruction; what differs is how the muxes are set and which parts write. A <strong>control unit</strong>, a combinational circuit fed by the opcode (and funct3 and funct7), produces these control signals:</p>
<table>
<thead><tr><th>Instruction</th><th>RegWrite</th><th>ALUSrc (immediate?)</th><th>MemRead</th><th>MemWrite</th><th>MemToReg</th><th>Branch</th><th>ALU operation</th></tr></thead>
<tbody>
<tr><td>R-format (add, sub, …)</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>from funct3/funct7</td></tr>
<tr><td>addi</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td><td>0</td><td>add</td></tr>
<tr><td>lw</td><td>1</td><td>1</td><td>1</td><td>0</td><td>1</td><td>0</td><td>add</td></tr>
<tr><td>sw</td><td>0</td><td>1</td><td>0</td><td>1</td><td>–</td><td>0</td><td>add</td></tr>
<tr><td>beq</td><td>0</td><td>0</td><td>0</td><td>0</td><td>–</td><td>1</td><td>subtract</td></tr>
</tbody>
</table>
<p>("–" means "doesn't matter", because nothing is written.) The table is a truth table, so the control unit is exactly the kind of circuit Lesson 1 built.</p>

<h3>A simulator</h3>
<p>A processor simulator is the datapath in software: a loop that fetches, decodes, executes and writes back. Here, instructions are given already decoded as tuples to keep the code short; decoding real 32-bit words means undoing Lesson 4's encoding, which the processor lab asks you to do. (That lab, one of the course's four, has you build a single-cycle RISC-V processor that decodes real 32-bit instruction words and runs real programs.)</p>
<pre><code>def run(program, regs=None, mem=None, max_steps=10_000):
    x = [0] * 32 if regs is None else regs
    mem = {} if mem is None else mem
    pc = 0
    for _ in range(max_steps):
        if pc // 4 &gt;= len(program):
            return x, mem
        op, *f = program[pc // 4]         # fetch and decode
        next_pc = pc + 4
        if op == "add":   rd, rs1, rs2 = f; x[rd] = x[rs1] + x[rs2]
        elif op == "sub": rd, rs1, rs2 = f; x[rd] = x[rs1] - x[rs2]
        elif op == "addi": rd, rs1, imm = f; x[rd] = x[rs1] + imm
        elif op == "lw":  rd, rs1, imm = f; x[rd] = mem.get(x[rs1] + imm, 0)
        elif op == "sw":  rs2, rs1, imm = f; mem[x[rs1] + imm] = x[rs2]
        elif op == "beq":
            rs1, rs2, off = f
            if x[rs1] == x[rs2]:
                next_pc = pc + off
        x[0] = 0                           # x0 stays 0 whatever was written
        pc = next_pc
    raise RuntimeError("too many steps")

# sum the 3 words at addresses 100, 104, 108 into x10
prog = [("addi", 5, 0, 100), ("addi", 6, 0, 3), ("addi", 10, 0, 0),
        ("beq", 6, 0, 24),                 # loop: if count == 0, skip 6 instructions ahead
        ("lw", 7, 5, 0), ("add", 10, 10, 7), ("addi", 5, 5, 4), ("addi", 6, 6, -1),
        ("beq", 0, 0, -20)]                # x0 == x0 always: jump back to the loop test
x, mem = run(prog, mem={100: 7, 104: 11, 108: 2})
print(x[10])   # 20</code></pre>

<h3>Performance</h3>
<p>The time a program takes is</p>
<p class="math">time = instructions × CPI × clock period</p>
<p>where <strong>CPI</strong> is the average number of clock cycles per instruction. A single-cycle processor has CPI = 1, which sounds ideal, but its clock period must fit the <em>slowest</em> instruction. lw uses every step (fetch, register read, ALU, memory, write back), so every instruction, even a simple add, takes as long as a load. With 1 billion instructions and a 2 ns period, the program takes 10<sup>9</sup> × 1 × 2 ns = 2 seconds. Improving any of the three factors helps: fewer instructions (a better compiler or ISA), lower CPI, or a shorter clock period. Pipelining, the next lesson, attacks the clock period without giving up much CPI.</p>
`,
      terms: [
        ["Datapath", "The hardware that moves and transforms data: PC, memories, register file, ALU, adders and muxes."],
        ["Control unit", "The circuit that sets a processor's muxes and write enables from each instruction's opcode."],
        ["Control signal", "A wire from the control unit that steers the datapath, such as RegWrite or ALUSrc."],
        ["Single-cycle processor", "A design that executes every instruction in one clock cycle, with the cycle long enough for the slowest instruction."],
        ["CPI", "Cycles per instruction: the average number of clock cycles each instruction takes."],
        ["Performance equation", "Time = instructions × CPI × clock period."]
      ],
      quiz: [
        { q: "For which instruction is ALUSrc set to choose the immediate?", choices: ["add", "beq", "lw", "sub"], answer: 2, why: "lw computes rs1 + immediate as its address." },
        { q: "Why is RegWrite 0 for sw?", choices: ["sw is slow", "sw writes memory, not a register", "sw has no rs1", "It's a mistake"], answer: 1, why: "A store changes memory only." },
        { q: "What sets the clock period of a single-cycle processor?", choices: ["The fastest instruction", "The average instruction", "The slowest instruction (typically lw)", "The number of registers"], answer: 2, why: "Every instruction must finish within one cycle." },
        { q: "A program runs 2 × 10⁹ instructions at CPI 1.5 with a 0.5 ns clock period. How long does it take?", choices: ["1.5 s", "3 s", "0.75 s", "6 s"], answer: 0, why: "2 × 10⁹ × 1.5 × 0.5 × 10⁻⁹ = 1.5 s." },
        { q: "How does beq decide whether to branch?", choices: ["It compares opcodes", "The ALU subtracts rs2 from rs1 and the zero flag says whether they're equal", "It reads memory", "The PC decides"], answer: 1, why: "Equal values give a zero difference." }
      ],
      practice: [
        {
          q: `<p>Trace <code>lw x8, -4(x9)</code> through the datapath when x9 = 200 and memory address 196 holds 42. Give the value on each main wire and the control signals.</p>`,
          a: `<p>Fetch the instruction; decode: rs1 = x9 (200), immediate = −4. ALUSrc = 1, so the ALU adds 200 + (−4) = 196. MemRead = 1: data memory outputs 42. MemToReg = 1 selects it, and RegWrite = 1 writes 42 into x8. Next PC = PC + 4.</p>`
        },
        {
          q: `<p>Use the simulator to compute 5 × 4 by repeated addition: put 5 in x5 and 4 in x6, and leave the product in x10. Write the program as a list of tuples.</p>`,
          a: `<pre><code>prog = [("addi", 5, 0, 5), ("addi", 6, 0, 4), ("addi", 10, 0, 0),
        ("beq", 6, 0, 16),          # done after the loop's 3 instructions + the jump
        ("add", 10, 10, 5), ("addi", 6, 6, -1),
        ("beq", 0, 0, -12)]         # back to the test
print(run(prog)[0][10])   # 20</code></pre>`
        },
        {
          q: `<p>Suppose a load takes 800 ps (200 fetch, 100 register read, 200 ALU, 200 memory, 100 write back), and adds don't use memory, so they need only 600 ps. In a program that is 25% loads and 75% instructions that, like adds, need 600 ps, what fraction of the single-cycle processor's time is wasted?</p>`,
          a: `<p>Every instruction gets 800 ps. Loads use all of it; the other 75% use only 600 ps, wasting 200 ps each. Average waste 0.75 × 200 = 150 ps per instruction: 150/800 ≈ 19% of the time.</p>`
        }
      ],
      sources: ["patthen", "hh", "riscvspec"]
    },
    {
      id: "ar6",
      title: "Pipelining",
      minutes: 90,
      summary: "Overlapping instructions like an assembly line: the five-stage pipeline, throughput versus latency, data hazards and forwarding, load-use stalls, control hazards and branch prediction.",
      notes: `
<p>Doing laundry with one washer and one dryer, you don't wait for the first load to dry before washing the second. While load 1 dries, load 2 washes. Each load takes as long as before, but loads finish far more often. A <strong>pipelined</strong> processor applies the same idea to instructions.</p>

<h3>The five-stage pipeline</h3>
<p>Split the single-cycle datapath (Lesson 5) into five <strong>stages</strong>, one per step, separated by <strong>pipeline registers</strong> that hold each instruction's intermediate values: <strong>IF</strong> (instruction fetch), <strong>ID</strong> (decode and register read), <strong>EX</strong> (ALU), <strong>MEM</strong> (data memory) and <strong>WB</strong> (write back). Each clock cycle, every instruction moves one stage forward, so up to five instructions are in progress at once.</p>
<pre data-label="Pipeline"><code>cycle:        1    2    3    4    5    6    7
instr 1       IF   ID   EX   MEM  WB
instr 2            IF   ID   EX   MEM  WB
instr 3                 IF   ID   EX   MEM  WB</code></pre>
<p>With stage times of 200, 100, 200, 200 and 100 ps, the single-cycle processor needs an 800 ps cycle. The pipeline's cycle must fit the slowest <em>stage</em>, 200 ps. One instruction now takes 5 × 200 = 1000 ps from start to finish: its <strong>latency</strong> got worse. But once the pipeline is full, one instruction finishes every 200 ps: <strong>throughput</strong> is four times higher. For <em>n</em> instructions the pipeline takes (<em>n</em> + 4) cycles: 1,000,000 instructions take about 200 µs instead of 800 µs. Ideally the speedup equals the number of stages; uneven stages and the hazards below reduce it.</p>

<h3>Data hazards and forwarding</h3>
<p>Overlapping creates <strong>hazards</strong>: situations where the next instruction can't safely proceed in the next cycle. A <strong>data hazard</strong> occurs when an instruction needs a result that an earlier instruction hasn't written yet:</p>
<pre data-label="RISC-V"><code>add x5, x6, x7       # writes x5 in WB (cycle 5)
sub x8, x5, x9       # reads x5 in ID (cycle 3): too early!</code></pre>
<p>Waiting (inserting empty cycles, called <strong>stalls</strong> or <strong>bubbles</strong>) would cost two cycles, not three, because of how the register file is built: it is written in the first half of a cycle and read in the second. So an instruction can read, in its ID stage, a value written in WB during the same cycle. sub's ID can therefore move from cycle 3 to cycle 5, the cycle of add's WB: a delay of two cycles.</p>
<pre data-label="Pipeline"><code>cycle:        1    2    3    4    5    6    7    8
add           IF   ID   EX   MEM  WB
sub                IF   --   --   ID   EX   MEM  WB      (-- = stall)</code></pre>
<p>But the sum already exists at the end of add's EX stage, cycle 3, and sub needs it at the start of its own EX stage, cycle 4. <strong>Forwarding</strong> (or bypassing) adds wires and muxes that pass the value straight from the pipeline register after EX into the ALU's input, so no stall is needed. The forwarding unit compares the destination register of instructions ahead in the pipeline with the source registers of the one in EX.</p>
<p>One case forwarding can't fully fix: a value loaded from memory exists only after MEM.</p>
<pre data-label="RISC-V"><code>lw  x5, 0(x6)        # x5 available after MEM (end of cycle 4)
add x7, x5, x8       # needs x5 at the start of its EX (cycle 4): one cycle short</code></pre>
<p>This <strong>load-use hazard</strong> costs one stall cycle. Compilers reduce it by <em>scheduling</em>: moving an independent instruction between the load and its use.</p>

<h3>Control hazards and branch prediction</h3>
<p>A branch's outcome isn't known until it is evaluated, but the pipeline has to fetch the next instruction every cycle. This is a <strong>control hazard</strong>. Options:</p>
<ul>
<li><strong>Stall</strong> until the outcome is known: simple, but every branch costs cycles, and roughly one instruction in five or six is a branch.</li>
<li><strong>Predict</strong> the outcome and keep fetching. If the prediction was wrong, <strong>flush</strong> the wrongly fetched instructions (turn them into bubbles) and fetch the right ones: a penalty of a few cycles, paid only on mispredictions.</li>
</ul>
<p>The simplest prediction is "not taken". Real processors use <strong>dynamic branch prediction</strong>: they remember each branch's recent behavior. A common scheme keeps a <strong>2-bit saturating counter</strong> per branch, a number from 0 to 3: 0 and 1 mean "predict not taken" (strongly and weakly), 2 and 3 mean "predict taken" (weakly and strongly). Each time the branch is taken the counter goes up by 1, and each time it isn't the counter goes down by 1, but it never goes below 0 or above 3 ("saturating"). A counter at 3 that sees one surprise only drops to 2 and still predicts taken; it takes two wrong predictions in a row to change its mind. (A counter at 1 changes its mind after a single taken branch.) So a loop branch that is taken 99 times and then falls through costs one misprediction per loop (at the exit). A 1-bit predictor, which just predicts whatever the branch did last time, would cost two: one at the exit, and another when the loop next starts, because it now predicts not taken. Modern predictors, using patterns of many recent branches, are right well over 90% of the time on typical programs, and deep pipelines of 15–20 stages depend on it, because each misprediction throws away many cycles of work.</p>
<p>Structural hazards (two instructions needing the same hardware in the same cycle) are avoided by design: separate instruction and data memories (in practice, separate caches), and a register file written in the first half of a cycle and read in the second.</p>

<h3>Beyond the basic pipeline</h3>
<p>Modern processors go further: <strong>superscalar</strong> designs fetch and execute several instructions per cycle (CPI below 1), and <strong>out-of-order</strong> execution lets later independent instructions run while an earlier one waits for memory, then <strong>retires</strong> results in program order (makes each one final, writing it to the registers or memory the program sees, only after every earlier instruction has) so the program can't tell. These techniques are why a modern core executes several instructions per cycle at billions of cycles per second.</p>
`,
      terms: [
        ["Pipelining", "Overlapping the execution of instructions by splitting it into stages, like an assembly line."],
        ["Latency and throughput", "How long one instruction takes from start to finish, and how many instructions finish per unit of time."],
        ["Hazard", "A situation in which the next instruction can't proceed in the next cycle: structural, data or control."],
        ["Forwarding", "Passing a result directly from a later pipeline stage to an earlier one, avoiding a stall."],
        ["Stall (bubble)", "An empty cycle inserted into the pipeline to wait for a hazard to clear."],
        ["Load-use hazard", "An instruction needing a value loaded by the instruction just before it; costs one stall even with forwarding."],
        ["Branch prediction", "Guessing a branch's outcome so fetching can continue; wrong guesses are flushed."]
      ],
      quiz: [
        { q: "Stages take 200, 100, 200, 200 and 100 ps. What is the pipeline's clock period?", choices: ["100 ps", "160 ps", "200 ps", "800 ps"], answer: 2, why: "The slowest stage sets the clock." },
        { q: "What does pipelining improve?", choices: ["The latency of each instruction", "Throughput: instructions completed per unit time", "The number of instructions", "Memory size"], answer: 1, why: "Each instruction takes as long or longer, but they overlap." },
        { q: "add x5, x6, x7 is followed by sub x8, x5, x9. With forwarding, how many stalls are needed?", choices: ["0", "1", "2", "3"], answer: 0, why: "The sum is forwarded from after add's EX into sub's EX." },
        { q: "Why does lw followed immediately by a use of its result still cost a stall?", choices: ["Loads are always slow", "The value exists only after MEM, one cycle after the next instruction's EX begins", "Forwarding doesn't work for registers", "The register file is busy"], answer: 1, why: "Forwarding can't send a value back in time." },
        { q: "What happens when a branch is mispredicted?", choices: ["The program crashes", "The wrongly fetched instructions are flushed and the correct ones fetched, costing a few cycles", "Nothing", "The branch is retried"], answer: 1, why: "Speculative work is discarded." }
      ],
      practice: [
        {
          q: `<p>How many cycles does a 5-stage pipeline (no hazards) take for 100 instructions? What is the speedup over a single-cycle processor whose cycle is 4 times longer?</p>`,
          a: `<p>100 + 4 = 104 cycles. Single-cycle: 100 long cycles = 400 short ones. Speedup 400/104 ≈ 3.85, approaching 4 as the number of instructions grows.</p>`
        },
        {
          q: `<p>Find the hazards in this code and the stalls needed with forwarding:</p><pre data-label="RISC-V"><code>lw   x1, 0(x2)
add  x3, x1, x4
sw   x3, 4(x2)
addi x5, x5, 1</code></pre><p>Then reorder it to remove the stall without changing the result.</p>`,
          a: `<p>lw → add: load-use, 1 stall. add → sw: forwarded, no stall. Moving the independent <code>addi</code> between <code>lw</code> and <code>add</code> fills the slot: lw, addi, add, sw, with no stalls.</p>`
        },
        {
          q: `<p>A loop's branch is taken 9 times, then not taken once, and the loop runs 10 times in a row. How many mispredictions does a 1-bit predictor (predict what happened last time) make per loop run, after the first, compared with a 2-bit saturating counter?</p>`,
          a: `<p>1-bit: it mispredicts at the exit (predicted taken), then again at the first iteration of the next run (predicted not taken): 2 per run. 2-bit: the single not-taken at the exit moves the counter from "strongly taken" to "weakly taken", which still predicts taken next time: 1 misprediction per run.</p>`
        }
      ],
      sources: ["patthen", "hh"]
    },
    {
      id: "ar7",
      title: "Virtual memory",
      minutes: 90,
      summary: "How every process gets its own private address space: pages and page tables, translating virtual to physical addresses, page faults, multi-level page tables, the TLB that makes translation fast, and protection between processes.",
      notes: `
<p>CS 210 Lesson 8 said that each process has its own <em>virtual</em> address space: address 0x1000 in one process is unrelated to address 0x1000 in another. This lesson explains how hardware and the operating system make that work, and why it's worth the trouble.</p>

<h3>Why virtual memory?</h3>
<ul>
<li><strong>Isolation:</strong> one process can't read or overwrite another's memory, or the operating system's, even by mistake or on purpose.</li>
<li><strong>Simplicity:</strong> every program can be linked as if it had the whole address space to itself, starting at the same addresses.</li>
<li><strong>Using memory efficiently:</strong> physical memory is handed out in small pieces wherever it's free, shared where useful (one copy of a shared library, CS 210 Lesson 8), and parts of a program not in use can be kept on disk.</li>
</ul>

<h3>Pages and translation</h3>
<p>Memory is divided into fixed-size <strong>pages</strong>, typically 4 KB (2<sup>12</sup> bytes). A <strong>virtual address</strong> splits into a <strong>virtual page number</strong> (VPN) and an <strong>offset</strong> within the page, the low 12 bits for 4 KB pages. The operating system keeps, for each process, a <strong>page table</strong> mapping each virtual page number to a <strong>physical frame number</strong> (where that page actually is in RAM), plus permission bits. Translation replaces the page number and keeps the offset:</p>
<p class="math">physical address = frame number × page size + offset</p>
<p><strong>Example.</strong> Virtual address 0x12345 with 4 KB pages: offset = the low 12 bits = 0x345 (837), VPN = 0x12 (18). If the page table maps page 18 to frame 7, the physical address is 7 × 4096 + 837 = 0x7345.</p>
<pre><code>PAGE = 4096

def translate(vaddr, page_table):
    vpn, offset = divmod(vaddr, PAGE)      # same as vaddr &gt;&gt; 12 and vaddr &amp; 0xFFF
    if vpn not in page_table:
        raise MemoryError(f"page fault at {hex(vaddr)}")
    return page_table[vpn] * PAGE + offset

print(hex(translate(0x12345, {0x12: 7})))   # 0x7345</code></pre>

<h3>Page faults</h3>
<p>Each page-table entry has a <strong>valid</strong> bit. If a process touches a page that isn't in memory, the hardware raises a <strong>page fault</strong>: an exception that runs operating-system code. The OS then decides:</p>
<ul>
<li>The page is legitimately the process's but isn't loaded yet (it's on disk, or it's new memory that should be zero-filled): find a free frame, possibly evicting another page to disk, load it, update the table, and restart the instruction. The program never notices, except for the time it took.</li>
<li>The address isn't the process's at all, or the access breaks the page's permissions (writing a read-only page, executing a non-executable one): the OS kills the process. This is the <strong>segmentation fault</strong> of CS 210 Lesson 4.</li>
</ul>
<p>Loading a page from an SSD takes around 100 µs; from a hard disk, several milliseconds: hundreds of thousands to millions of cycles. A system that keeps evicting pages it soon needs again spends all its time on page faults, which is called <strong>thrashing</strong>. CS 210 Lesson 7's zero-page effect (an untouched array reads as zeros instantly) is also virtual memory at work: untouched pages all map to one shared page of zeros until written.</p>

<h3>Multi-level page tables</h3>
<p>A flat table is too big. With 32-bit addresses and 4 KB pages there are 2<sup>20</sup> virtual pages; at 4 bytes per entry, each process's table would take 4 MB, mostly describing pages it never uses. With 64-bit addresses, it's impossible. The solution is a tree: split the VPN into pieces, and use each piece to index one level of table, allocating lower-level tables only where the process actually has memory. x86-64 uses 48-bit virtual addresses: 12 bits of offset and four 9-bit indexes into four levels of 512-entry tables. Recent processors add a fifth level for larger address spaces.</p>

<h3>The TLB</h3>
<p>A four-level table means four extra memory reads for every memory access: far too slow. The fix is a cache (CS 210 Lesson 7) for translations, the <strong>translation lookaside buffer</strong> (TLB): a small, fast table of recent VPN-to-frame mappings, checked on every access. Because of locality, programs reuse the same pages heavily, and TLB hit rates are typically above 99%. With a 1-cycle TLB lookup and a 100-cycle page walk on a miss, a 99% hit rate gives an average of 0.99 × 1 + 0.01 × (1 + 100) = 2 cycles per translation.</p>
<p>When the OS switches to another process, the old translations are wrong for the new process, so TLB entries are either flushed or tagged with a process identifier.</p>

<h3>Protection in hardware</h3>
<p>Page-table entries carry permission bits: readable, writable, executable, and whether user programs (rather than only the operating system) may access the page. The non-executable stack of CS 210 Lesson 6 is exactly one of these bits. Because every access goes through translation, a process physically can't reach memory the operating system hasn't mapped for it. Virtual memory is the hardware foundation of the isolation that operating systems, browsers and cloud computing depend on.</p>
`,
      terms: [
        ["Virtual address", "An address as a program sees it, translated by hardware to a physical address."],
        ["Page", "A fixed-size block of virtual memory (typically 4 KB); the unit of translation."],
        ["Page table", "The operating system's per-process map from virtual page numbers to physical frames and permissions."],
        ["Page fault", "An exception raised when an access needs a page that isn't mapped or isn't in memory."],
        ["Multi-level page table", "A tree of tables indexed by parts of the virtual page number, allocated only where memory is used."],
        ["TLB", "Translation lookaside buffer: a small cache of recent virtual-to-physical translations."],
        ["Thrashing", "A state in which a system spends most of its time handling page faults."]
      ],
      quiz: [
        { q: "With 4 KB pages, what is the offset of virtual address 0x3A7F2?", choices: ["0x3A", "0x7F2", "0xA7F2", "0x2"], answer: 1, why: "The low 12 bits (3 hex digits)." },
        { q: "What happens on a page fault for a valid page that's on disk?", choices: ["The process is killed", "The OS loads the page into a frame, updates the table and restarts the instruction", "The TLB is flushed", "The page is skipped"], answer: 1, why: "The program continues as if nothing happened, only slower." },
        { q: "Why are page tables multi-level?", choices: ["For speed", "So tables are only allocated for the parts of the address space a process uses", "Because pages are small", "For security only"], answer: 1, why: "A flat table for a huge address space would be enormous and mostly empty." },
        { q: "With TLB hits taking 1 cycle and misses 101, what is the average with a 99% hit rate?", choices: ["1 cycle", "2 cycles", "51 cycles", "101 cycles"], answer: 1, why: "0.99 × 1 + 0.01 × 101 = 2." },
        { q: "How does virtual memory stop one process reading another's data?", choices: ["Encryption", "Every access is translated through the process's own page table, which maps only its own pages", "The compiler checks", "It doesn't"], answer: 1, why: "Unmapped addresses fault; the other process's frames aren't reachable." }
      ],
      practice: [
        {
          q: `<p>With 4 KB pages and the page table {0: 5, 1: 2, 4: 9}, translate 0x1A3C, 0x4004 and 0x2000.</p>`,
          a: `<p>0x1A3C: VPN 1, offset 0xA3C → frame 2 → 0x2A3C. 0x4004: VPN 4, offset 4 → frame 9 → 0x9004. 0x2000: VPN 2 is not mapped → page fault.</p>`
        },
        {
          q: `<p>A system has 32-bit virtual addresses and 8 KB pages. How many bits are the offset and the VPN, and how many entries would a flat page table have?</p>`,
          a: `<p>8 KB = 2<sup>13</sup>, so 13 offset bits and 32 − 13 = 19 VPN bits: 2<sup>19</sup> = 524,288 entries.</p>`
        },
        {
          q: `<p>Explain why sequentially reading a 1 MB array causes about 256 TLB misses (with 4 KB pages and a cold TLB), while reading it with a stride of 4,096 bytes 256 times causes the same number, and reading one byte from each of 256 random pages in a 1 GB array also causes about 256. What differs?</p>`,
          a: `<p>Each case touches 256 distinct pages, and each new page costs one miss. What differs is the work per miss: the sequential read does 4,096 useful byte reads per page (great locality), while the strided and random reads do one per page, so the misses dominate their running time. In the random case the page-table walks also miss in the cache more often.</p>`
        }
      ],
      sources: ["patthen", "ostep", "csapp"]
    },
    {
      id: "ar8",
      title: "Parallelism and performance",
      minutes: 90,
      summary: "Why clock speeds stopped rising and chips went parallel: Moore's law and the end of Dennard scaling, the power wall, multicore processors and Amdahl's law, SIMD and GPUs, and specialized accelerators.",
      notes: `
<p>For three decades, programs got faster every year without anyone changing them: new processors simply ran at higher clock speeds. Around 2005 that stopped. This lesson explains why, and what replaced it.</p>

<h3>Moore's law and Dennard scaling</h3>
<p>In 1965 Gordon Moore, later a founder of Intel, observed that the number of transistors that could economically be put on a chip was doubling every year; in 1975 he revised it to every two years. This <strong>Moore's law</strong> is an observation about manufacturing progress, not a law of nature, and it held for about fifty years: chips went from thousands of transistors in the early 1970s to tens of billions today. It has slowed recently, as transistors approach the size of a few dozen atoms.</p>
<p>For most of that time a second effect, <strong>Dennard scaling</strong> (described by Robert Dennard and colleagues in 1974), came along with it. As transistors shrank, they also needed less voltage and switched faster, so the power per area stayed constant. Smaller transistors meant more of them, running faster, at the same power density. Clock speeds rose from about 1 MHz in the 1970s to over 3 GHz by the early 2000s.</p>

<h3>The power wall</h3>
<p>The dynamic power of a chip is roughly proportional to <em>CV</em><sup>2</sup><em>f</em>: capacitance, voltage squared and clock frequency. Around 2005, voltages could no longer be lowered much further without transistors leaking too much current when switched off. Raising the frequency then meant raising power and heat, and a desktop chip can only dissipate about 100–200 watts before it can't be cooled. Clock speeds stalled at around 3–5 GHz, where they remain. This is the <strong>power wall</strong>.</p>
<p>Moore's law still supplied more transistors, so manufacturers used them differently: several complete processors, or <strong>cores</strong>, on one chip. A laptop chip today has 8 to 16 or more cores. But a program only runs faster on more cores if it is written to do several things at once. The burden of speed moved from hardware designers to programmers.</p>

<h3>Amdahl's law</h3>
<p>If a fraction <em>p</em> of a program's work can be split among <em>s</em> cores and the rest must run serially, then the speedup is</p>
<p class="math">speedup = 1 / ((1 − p) + p/s)</p>
<p>This is <strong>Amdahl's law</strong> (Gene Amdahl, 1967). Its lesson is sobering: the serial part dominates. With 90% parallel work, 10 cores give a speedup of only 1/(0.1 + 0.09) ≈ 5.3, and even infinitely many cores can't beat 1/0.1 = 10. With 95% parallel work on 16 cores, the speedup is about 9.1.</p>
<pre><code>def amdahl(p, s):
    return 1 / ((1 - p) + p / s)

for p in (0.5, 0.9, 0.99):
    print(p, [round(amdahl(p, s), 1) for s in (2, 8, 64, 1024)])
# 0.5 [1.3, 1.8, 2.0, 2.0]
# 0.9 [1.8, 4.7, 8.8, 9.9]
# 0.99 [2.0, 7.5, 39.3, 91.2]</code></pre>
<p>The same law applies to any improvement: speeding up part of a system helps only as much as that part's share of the time. (It's also why CS 201's advice was to measure before optimizing.) <strong>Gustafson's law</strong> (1988) offers the optimistic view: with more cores, people usually solve <em>bigger</em> problems, whose parallel part grows while the serial part stays fixed, so the achievable speedup grows too.</p>

<h3>Kinds of parallelism</h3>
<ul>
<li><strong>Instruction-level parallelism</strong>: pipelining, superscalar and out-of-order execution (Lesson 6), found automatically by the hardware.</li>
<li><strong>Data-level parallelism (SIMD)</strong>: one instruction operating on several values at once. A 256-bit SIMD register holds eight 32-bit numbers, and one instruction adds eight pairs. Compilers "vectorize" simple loops to use these instructions (CS 210 Lesson 5's term); NumPy's speed comes partly from them.</li>
<li><strong>Thread-level parallelism</strong>: several threads, on several cores, sharing memory. Coordinating them correctly (avoiding <em>data races</em>, where two threads update the same memory at once) is hard, and is a central topic of Operating Systems in Year 3.</li>
<li><strong>GPUs</strong> (graphics processing units) take data parallelism to the extreme: thousands of simple cores running the same program on different data. Built for graphics (MATH 220's matrix transformations on millions of vertices), they turned out to suit machine learning, whose main work is large matrix multiplications.</li>
<li><strong>Specialized accelerators</strong> give up generality for efficiency: Google's TPUs for neural networks, video codecs, and cryptography units in phones. As transistor gains slow, specialization has become a main route to performance.</li>
</ul>
<p>The arc of this course, from switches to gates, adders, registers, a datapath, a pipeline and virtual memory, ends here: the free speedups are over, and performance now comes from understanding the machine, choosing algorithms well (CS 220) and making work parallel.</p>
`,
      terms: [
        ["Moore's law", "The observation that the number of transistors on a chip doubles about every two years."],
        ["Dennard scaling", "The historical trend that smaller transistors used proportionally less power, keeping power density constant; it ended around 2005."],
        ["Power wall", "The limit on clock speed set by the power and heat a chip can dissipate."],
        ["Core", "A complete processor; multicore chips contain several on one die (the single piece of silicon a chip is built on)."],
        ["Amdahl's law", "Speedup = 1/((1 − p) + p/s) when a fraction p of the work is sped up by a factor s."],
        ["SIMD", "Single instruction, multiple data: one instruction operating on several values at once."],
        ["GPU", "A graphics processing unit: thousands of simple cores for massively data-parallel work."]
      ],
      quiz: [
        { q: "Why did clock speeds stop rising around 2005?", choices: ["Moore's law ended", "Voltage couldn't keep shrinking, so higher frequencies meant too much power and heat", "Software couldn't use them", "Memory was too slow"], answer: 1, why: "The end of Dennard scaling hit the power wall." },
        { q: "75% of a program can be parallelized perfectly. What is the largest possible speedup?", choices: ["4", "75", "Unlimited", "1.33"], answer: 0, why: "1/(1 − 0.75) = 4." },
        { q: "What does Amdahl's law give for p = 0.8 and s = 4?", choices: ["2.5", "3.2", "4", "1.8"], answer: 0, why: "1/(0.2 + 0.2) = 2.5." },
        { q: "What kind of parallelism do GPUs mainly exploit?", choices: ["Instruction-level", "Data-level: the same operation on many values", "Disk parallelism", "None"], answer: 1, why: "Thousands of cores run the same program on different data." },
        { q: "What did manufacturers do with extra transistors once clock speeds stalled?", choices: ["Nothing", "Put multiple cores (and accelerators) on each chip", "Made bigger caches only", "Raised the voltage"], answer: 1, why: "Multicore chips became standard." }
      ],
      practice: [
        {
          q: `<p>A program spends 60% of its time in a function you can make 5 times faster. What is the overall speedup? What if you could make it infinitely fast?</p>`,
          a: `<p>1/(0.4 + 0.6/5) = 1/0.52 ≈ 1.92. Infinitely fast: 1/0.4 = 2.5. The other 40% now dominates.</p>`
        },
        {
          q: `<p>A chip's dynamic power is proportional to <em>V</em>²<em>f</em>. If a design lowers the voltage by 10% and the frequency by 10%, by what factor does power fall? How might two such cores compare with one core at full speed?</p>`,
          a: `<p>0.9² × 0.9 = 0.729: about 27% less power per core. Two slower cores use about 1.46 times the power of one full-speed core but offer 1.8 times its total throughput, if the work parallelizes. This trade is why chips moved to multiple slower cores.</p>`
        },
        {
          q: `<p>How many cores are needed for a speedup of 8 when 95% of the work is parallel? Is a speedup of 25 possible?</p>`,
          a: `<p>Solve 1/(0.05 + 0.95/<em>s</em>) = 8: 0.05 + 0.95/<em>s</em> = 0.125, so 0.95/<em>s</em> = 0.075 and <em>s</em> ≈ 12.7: 13 cores. The limit is 1/0.05 = 20, so a speedup of 25 is impossible however many cores are used.</p>`
        }
      ],
      sources: ["patthen", "hh"]
    }
]);

CSA.addAsides("cs230", {
  ar1: [
    { kind: "history", title: "Shannon's master's thesis", html: `<p>In 1937 Claude Shannon, a 21-year-old student at MIT, showed in his master's thesis that circuits of relay switches could implement Boolean algebra, and that Boolean algebra could therefore be used to design and simplify switching circuits. It has been called the most important master's thesis of the twentieth century: it turned circuit design from an art into mathematics. MATH 120's optional lesson on Boole and Shannon tells the longer story.</p>`, sources: ["shannon37"] }
  ],
  ar6: [
    { kind: "ethics", title: "Spectre and Meltdown", html: `<p>In January 2018, researchers disclosed Spectre and Meltdown, attacks that exploit speculative execution: a processor that predicts a branch runs instructions that might later be thrown away. Their results are discarded, but they leave traces in the cache (CS 210 Lesson 7), and by timing memory accesses, an attacker can read data the speculative instructions touched, such as passwords or keys from another program. Nearly every high-performance processor from the previous two decades was affected. The fixes, in operating systems, browsers and new chips, cost measurable performance. The episode showed that optimizations invisible to a program's results can still leak information through timing.</p>` }
  ],
  ar8: [
    { kind: "history", title: "The Apollo Guidance Computer", html: `<p>The computer that guided Apollo 11 to the Moon in 1969 was built from about 2,800 integrated circuits, each holding two three-input NOR gates (Lesson 1). Its clock ticked about a million times a second (1.024 MHz, so about 1 µs per tick), but one step of its work, a memory access, took 12 ticks: its basic machine cycle was about 12 µs (11.7 µs), and an addition took two such cycles, so it managed about 40,000 additions a second. It had 2,048 words of erasable memory. Its software, led by Margaret Hamilton at MIT, was designed to drop low-priority work when overloaded, which saved the landing when the computer raised alarms during the descent. A phone today has billions of transistors and millions of times its speed.</p>` }
  ]
});
