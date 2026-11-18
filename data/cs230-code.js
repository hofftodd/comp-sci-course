/* Auto-graded programming problems for CS 230, by lesson. Generated from a Python spec, so every
   string is JSON. Circuits and processors are simulated in Python; the labs use a logic simulator. */
CSA.addCode("cs230", {
 "ar1": [
  {
   "id": "truth_tables",
   "title": "Truth tables and equivalence",
   "prompt": "<p>Write <code>truth_table(f, n)</code> that returns the list of outputs of the <em>n</em>-input Boolean function <code>f</code> (taking <em>n</em> arguments, each 0 or 1) for all 2<sup><em>n</em></sup> inputs in binary counting order (000, 001, 010, …, with the first argument as the most significant bit). Then write <code>equivalent(f, g, n)</code>, which says whether two functions agree on every input.</p>",
   "starter": "from itertools import product\n\ndef truth_table(f, n):\n    pass\n\ndef equivalent(f, g, n):\n    pass\n",
   "hint": "<p><code>itertools.product((0, 1), repeat=n)</code> generates the inputs in exactly this order. Return <code>int(f(*bits))</code> so that <code>True</code>/<code>False</code> results become 1/0.</p>",
   "solution": "from itertools import product\n\ndef truth_table(f, n):\n    return [int(f(*bits)) for bits in product((0, 1), repeat=n)]\n\ndef equivalent(f, g, n):\n    return truth_table(f, n) == truth_table(g, n)\n",
   "tests": [
    {
     "label": "AND, OR, XOR",
     "type": "assert",
     "code": "assert truth_table(lambda a, b: a & b, 2) == [0, 0, 0, 1]\nassert truth_table(lambda a, b: a | b, 2) == [0, 1, 1, 1]\nassert truth_table(lambda a, b: a ^ b, 2) == [0, 1, 1, 0]\n"
    },
    {
     "label": "Majority of three",
     "call": "truth_table(lambda a, b, c: (a & b) | (a & c) | (b & c), 3)",
     "expect": "[0, 0, 0, 1, 0, 1, 1, 1]"
    },
    {
     "label": "Booleans become 0 and 1",
     "call": "truth_table(lambda a: not a, 1)",
     "expect": "[1, 0]"
    },
    {
     "label": "De Morgan holds; a wrong law doesn't",
     "type": "assert",
     "code": "assert equivalent(lambda a, b: 1 - (a & b), lambda a, b: (1 - a) | (1 - b), 2)\nassert not equivalent(lambda a, b: 1 - (a & b), lambda a, b: (1 - a) & (1 - b), 2)\n"
    }
   ]
  },
  {
   "id": "sum_of_products",
   "title": "Sum of products from a truth table",
   "prompt": "<p>Write <code>sop(outputs, names)</code>. <code>outputs</code> is a truth table in the order of the previous problem (length 2<sup><em>n</em></sup>), and <code>names</code> is a string of <em>n</em> one-letter input names. Return the sum-of-products formula as a string: one product per row whose output is 1, in table order, joined by <code>\" + \"</code>. In each product, write each input in order, followed by <code>'</code> if it is 0 in that row. Return <code>\"0\"</code> if no row is 1. For XOR, <code>sop([0, 1, 1, 0], \"ab\")</code> is <code>\"a'b + ab'\"</code>.</p>",
   "starter": "def sop(outputs, names):\n    pass\n",
   "hint": "<p>Row <em>r</em>'s input bits are the binary digits of <em>r</em>, most significant first: the bit for input <em>i</em> is <code>(r &gt;&gt; (n - 1 - i)) &amp; 1</code>.</p>",
   "solution": "def sop(outputs, names):\n    n = len(names)\n    terms = []\n    for r, out in enumerate(outputs):\n        if out:\n            terms.append(\"\".join(name + (\"\" if (r >> (n - 1 - i)) & 1 else \"'\") for i, name in enumerate(names)))\n    return \" + \".join(terms) if terms else \"0\"\n",
   "tests": [
    {
     "label": "XOR",
     "call": "sop([0, 1, 1, 0], 'ab')",
     "expect": "\"a'b + ab'\""
    },
    {
     "label": "Majority",
     "call": "sop([0, 0, 0, 1, 0, 1, 1, 1], 'abc')",
     "expect": "\"a'bc + ab'c + abc' + abc\""
    },
    {
     "label": "Constant 0 and 1",
     "type": "assert",
     "code": "assert sop([0, 0], 'x') == '0'\nassert sop([1, 1], 'x') == \"x' + x\"\n"
    },
    {
     "label": "The formula computes the function",
     "type": "assert",
     "hidden": true,
     "code": "import itertools, random\nrandom.seed(1)\nfor _ in range(20):\n    outs = [random.randint(0, 1) for _ in range(8)]\n    f = sop(outs, \"abc\")\n    for r, bits in enumerate(itertools.product((0, 1), repeat=3)):\n        env = dict(zip(\"abc\", bits))\n        val = 0 if f == \"0\" else int(any(all(env[t[i]] == (0 if i + 1 < len(t) and t[i + 1] == \"'\" else 1) for i in range(len(t)) if t[i] != \"'\") for t in f.split(\" + \")))\n        assert val == outs[r], (outs, f)\n"
    }
   ]
  }
 ],
 "ar2": [
  {
   "id": "adder_circuit",
   "title": "A ripple-carry adder and subtractor",
   "prompt": "<p>Numbers are lists of bits, least significant first. Write <code>full_adder(a, b, c)</code> returning <code>(sum, carry)</code> using only the operators <code>&amp;</code>, <code>|</code> and <code>^</code> on bits; <code>add(xs, ys, carry=0)</code> returning <code>(bits, carry_out)</code> by chaining full adders; and <code>subtract(xs, ys)</code> returning the bits of <em>x</em> − <em>y</em> modulo 2<sup><em>n</em></sup>, computed as <em>x</em> + (<em>y</em> with every bit flipped) + 1 with the adder (don't use Python's <code>-</code> on the numbers).</p>",
   "starter": "def full_adder(a, b, c):\n    pass\n\ndef add(xs, ys, carry=0):\n    pass\n\ndef subtract(xs, ys):\n    pass\n",
   "hint": "<p>Flip a bit with <code>b ^ 1</code>. For subtraction, call <code>add(xs, flipped, carry=1)</code> and ignore the carry-out.</p>",
   "solution": "def full_adder(a, b, c):\n    return a ^ b ^ c, (a & b) | (c & (a ^ b))\n\ndef add(xs, ys, carry=0):\n    out = []\n    for a, b in zip(xs, ys):\n        s, carry = full_adder(a, b, carry)\n        out.append(s)\n    return out, carry\n\ndef subtract(xs, ys):\n    return add(xs, [b ^ 1 for b in ys], carry=1)[0]\n",
   "tests": [
    {
     "label": "Full adder truth table",
     "type": "assert",
     "code": "for a in (0, 1):\n    for b in (0, 1):\n        for c in (0, 1):\n            assert full_adder(a, b, c) == ((a + b + c) % 2, (a + b + c) // 2), (a, b, c)\n"
    },
    {
     "label": "11 + 6 in 4 bits",
     "call": "add([1, 1, 0, 1], [0, 1, 1, 0])",
     "expect": "([1, 0, 0, 0], 1)"
    },
    {
     "label": "All 8-bit sums",
     "type": "assert",
     "code": "bits = lambda n: [(n >> i) & 1 for i in range(8)]\nnum = lambda bs: sum(b << i for i, b in enumerate(bs))\nfor x in range(0, 256, 7):\n    for y in range(0, 256, 11):\n        s, c = add(bits(x), bits(y))\n        assert num(s) + 256 * c == x + y, (x, y)\n"
    },
    {
     "label": "Subtraction wraps like two's complement",
     "type": "assert",
     "code": "bits = lambda n: [(n >> i) & 1 for i in range(8)]\nnum = lambda bs: sum(b << i for i, b in enumerate(bs))\nassert num(subtract(bits(5), bits(9))) == 252\nassert num(subtract(bits(200), bits(55))) == 145\n"
    }
   ]
  },
  {
   "id": "alu_flags",
   "title": "An ALU with flags",
   "prompt": "<p>Write <code>alu(op, a, b, width=8)</code> for <em>a</em>, <em>b</em> given as unsigned <em>width</em>-bit values (0 ≤ a, b &lt; 2<sup>width</sup>). Operations: <code>\"add\"</code>, <code>\"sub\"</code>, <code>\"and\"</code>, <code>\"or\"</code>, <code>\"xor\"</code>. Return <code>(result, flags)</code>, where <code>result</code> is the <em>width</em>-bit result and <code>flags</code> is a dict with:</p>\n<ul>\n<li><code>\"zero\"</code>: the result is 0;</li>\n<li><code>\"negative\"</code>: the result's top bit is 1;</li>\n<li><code>\"overflow\"</code>: for add and sub, the signed (two's complement) result doesn't fit in <em>width</em> bits; always <code>False</code> for logic operations.</li>\n</ul>",
   "starter": "def alu(op, a, b, width=8):\n    pass\n",
   "hint": "<p>Convert to signed with CS 210's <code>wrap</code> idea: a value with the top bit set means value − 2<sup>width</sup>. Overflow means the true signed sum or difference is outside −2<sup>width−1</sup> to 2<sup>width−1</sup> − 1.</p>",
   "solution": "def alu(op, a, b, width=8):\n    mask = (1 << width) - 1\n    top = 1 << (width - 1)\n    signed = lambda v: v - (1 << width) if v & top else v\n    if op == \"add\":\n        result, true = (a + b) & mask, signed(a) + signed(b)\n    elif op == \"sub\":\n        result, true = (a - b) & mask, signed(a) - signed(b)\n    elif op in (\"and\", \"or\", \"xor\"):\n        result = {\"and\": a & b, \"or\": a | b, \"xor\": a ^ b}[op]\n        true = signed(result)\n    else:\n        raise ValueError(op)\n    overflow = op in (\"add\", \"sub\") and not (-top <= true < top)\n    return result, {\"zero\": result == 0, \"negative\": bool(result & top), \"overflow\": overflow}\n",
   "tests": [
    {
     "label": "5 - 9 in 8 bits",
     "type": "assert",
     "code": "r, f = alu(\"sub\", 5, 9)\nassert r == 252 and f == {\"zero\": False, \"negative\": True, \"overflow\": False}, (r, f)\n"
    },
    {
     "label": "127 + 1 overflows",
     "type": "assert",
     "code": "r, f = alu(\"add\", 127, 1)\nassert r == 128 and f[\"overflow\"] and f[\"negative\"]\n"
    },
    {
     "label": "Zero flag",
     "type": "assert",
     "code": "r, f = alu(\"xor\", 0b1010, 0b1010)\nassert r == 0 and f[\"zero\"] and not f[\"overflow\"]\n"
    },
    {
     "label": "4-bit width",
     "type": "assert",
     "code": "r, f = alu(\"add\", 6, 7, width=4)\nassert r == 13 and f[\"overflow\"] and f[\"negative\"], (r, f)\nr, f = alu(\"sub\", 8, 1, width=4)\nassert r == 7 and f[\"overflow\"], (r, f)\n"
    }
   ]
  }
 ],
 "ar3": [
  {
   "id": "mealy_machine",
   "title": "Running a finite state machine",
   "prompt": "<p>Write <code>run_fsm(table, start, inputs)</code>. <code>table</code> maps <code>(state, input)</code> to <code>(next_state, output)</code>. Starting in <code>start</code>, feed the inputs one at a time and return the list of outputs. If a <code>(state, input)</code> pair is missing from the table, raise <code>ValueError</code>.</p>\n<p>Then write <code>DETECT_101</code>, a table for the notes' \"101\" detector (states <code>\"A\"</code>, <code>\"B\"</code>, <code>\"C\"</code>, inputs 0 and 1, output 1 exactly when the last three inputs were 1, 0, 1).</p>",
   "starter": "def run_fsm(table, start, inputs):\n    pass\n\nDETECT_101 = {}\n",
   "hint": "<p>Each step: look up <code>table[(state, x)]</code>, append its output, move to its next state. The detector's only output 1 is on <code>(\"C\", 1)</code>.</p>",
   "solution": "def run_fsm(table, start, inputs):\n    state, out = start, []\n    for x in inputs:\n        if (state, x) not in table:\n            raise ValueError(f\"no transition from {state!r} on {x!r}\")\n        state, o = table[(state, x)]\n        out.append(o)\n    return out\n\nDETECT_101 = {(\"A\", 0): (\"A\", 0), (\"A\", 1): (\"B\", 0), (\"B\", 0): (\"C\", 0), (\"B\", 1): (\"B\", 0),\n              (\"C\", 0): (\"A\", 0), (\"C\", 1): (\"B\", 1)}\n",
   "tests": [
    {
     "label": "The notes' input",
     "call": "run_fsm(DETECT_101, 'A', [1, 0, 1, 0, 1, 1, 0, 1])",
     "expect": "[0, 0, 1, 0, 1, 0, 0, 1]"
    },
    {
     "label": "The practice input",
     "call": "run_fsm(DETECT_101, 'A', [1, 1, 0, 1, 0, 1, 0])",
     "expect": "[0, 0, 0, 1, 0, 1, 0]"
    },
    {
     "label": "A parity machine",
     "type": "assert",
     "code": "parity = {(\"even\", 0): (\"even\", 0), (\"even\", 1): (\"odd\", 1), (\"odd\", 0): (\"odd\", 1), (\"odd\", 1): (\"even\", 0)}\nassert run_fsm(parity, \"even\", [1, 1, 0, 1]) == [1, 0, 0, 1]\n"
    },
    {
     "label": "Missing transition raises ValueError",
     "type": "raises",
     "call": "run_fsm({('s', 0): ('s', 0)}, 's', [0, 1])",
     "error": "ValueError"
    }
   ]
  },
  {
   "id": "vending_fsm",
   "title": "A vending machine",
   "prompt": "<p>An item costs 15¢. Write <code>vend(coins)</code> for a list of coins, each 5 or 10. The machine keeps the amount inserted so far (0, 5 or 10). After each coin it outputs a pair <code>(dispense, change)</code>: when the total reaches 15 or more, it dispenses (<code>True</code>), returns the excess as change (0 or 5), and goes back to 0; otherwise it outputs <code>(False, 0)</code>. Return the list of outputs. Raise <code>ValueError</code> for any other coin.</p>",
   "starter": "def vend(coins):\n    pass\n",
   "hint": "<p>The state is the amount inserted. After adding a coin, if the new total is at least 15, output <code>(True, total - 15)</code> and reset to 0.</p>",
   "solution": "def vend(coins):\n    total, out = 0, []\n    for c in coins:\n        if c not in (5, 10):\n            raise ValueError(f\"bad coin {c}\")\n        total += c\n        if total >= 15:\n            out.append((True, total - 15))\n            total = 0\n        else:\n            out.append((False, 0))\n    return out\n",
   "tests": [
    {
     "label": "Three nickels",
     "call": "vend([5, 5, 5])",
     "expect": "[(False, 0), (False, 0), (True, 0)]"
    },
    {
     "label": "Change given",
     "call": "vend([10, 10])",
     "expect": "[(False, 0), (True, 5)]"
    },
    {
     "label": "Several items",
     "call": "vend([10, 5, 5, 10, 10, 10])",
     "expect": "[(False, 0), (True, 0), (False, 0), (True, 0), (False, 0), (True, 5)]"
    },
    {
     "label": "Bad coin",
     "type": "raises",
     "call": "vend([5, 25])",
     "error": "ValueError"
    }
   ]
  }
 ],
 "ar4": [
  {
   "id": "riscv_encode",
   "title": "Encoding RISC-V instructions",
   "prompt": "<p>Write <code>encode(text)</code> that turns one RISC-V instruction into its 32-bit encoding (an int). Support:</p>\n<ul>\n<li>R-format <code>add</code>, <code>sub</code>, <code>and</code>, <code>or</code>, <code>xor</code> (opcode 0x33; funct3 0, 0, 7, 6, 4; funct7 0 except sub's 0x20), written like <code>add x5, x6, x7</code>;</li>\n<li><code>addi</code> (opcode 0x13, funct3 0), written <code>addi x5, x6, -3</code>;</li>\n<li><code>lw</code> (I-format, opcode 0x03, funct3 2) and <code>sw</code> (S-format, opcode 0x23, funct3 2), written <code>lw x5, 8(x6)</code> and <code>sw x5, 12(x6)</code>.</li>\n</ul>\n<p>Registers are written x0 to x31. Immediates must be in −2048 to 2047; otherwise raise <code>ValueError</code>.</p>",
   "starter": "def encode(text):\n    pass\n",
   "hint": "<p>Split off the mnemonic, then replace \"(\" and \")\" with spaces and split on commas and spaces to get the operands. For S-format, imm[11:5] goes in bits 31–25 and imm[4:0] in bits 11–7; mask the immediate with <code>&amp; 0xFFF</code> first.</p>",
   "solution": "R = {\"add\": (0, 0), \"sub\": (0, 0x20), \"and\": (7, 0), \"or\": (6, 0), \"xor\": (4, 0)}\n\ndef _reg(t):\n    n = int(t.strip()[1:])\n    if not 0 <= n < 32:\n        raise ValueError(t)\n    return n\n\ndef encode(text):\n    op, rest = text.split(None, 1)\n    parts = [p for p in rest.replace(\"(\", \" \").replace(\")\", \" \").replace(\",\", \" \").split() if p]\n    if op in R:\n        f3, f7 = R[op]\n        rd, rs1, rs2 = map(_reg, parts)\n        return (f7 << 25) | (rs2 << 20) | (rs1 << 15) | (f3 << 12) | (rd << 7) | 0x33\n    if op in (\"addi\", \"lw\", \"sw\"):\n        if op == \"addi\":\n            rd, rs1, imm = _reg(parts[0]), _reg(parts[1]), int(parts[2], 0)\n        else:\n            rd, imm, rs1 = _reg(parts[0]), int(parts[1], 0), _reg(parts[2])\n        if not -2048 <= imm <= 2047:\n            raise ValueError(f\"immediate {imm} out of range\")\n        imm &= 0xFFF\n        if op == \"addi\":\n            return (imm << 20) | (rs1 << 15) | (rd << 7) | 0x13\n        if op == \"lw\":\n            return (imm << 20) | (rs1 << 15) | (2 << 12) | (rd << 7) | 0x03\n        return ((imm >> 5) << 25) | (rd << 20) | (rs1 << 15) | (2 << 12) | ((imm & 0x1F) << 7) | 0x23\n    raise ValueError(f\"unsupported instruction {op}\")\n",
   "tests": [
    {
     "label": "R-format (checked against a real assembler)",
     "type": "assert",
     "code": "assert encode(\"add x5, x6, x7\") == 0x007302B3\nassert encode(\"sub x5, x6, x7\") == 0x407302B3\nassert encode(\"and x10, x11, x12\") == 0x00C5F533\n"
    },
    {
     "label": "addi and lw",
     "type": "assert",
     "code": "assert encode(\"addi x5, x6, -3\") == 0xFFD30293\nassert encode(\"addi x1, x0, 10\") == 0x00A00093\nassert encode(\"lw x5, 8(x6)\") == 0x00832283\n"
    },
    {
     "label": "sw splits its immediate",
     "call": "encode('sw x5, 12(x6)')",
     "expect": "0x00532623"
    },
    {
     "label": "Out-of-range immediate",
     "type": "raises",
     "call": "encode('addi x1, x1, 4096')",
     "error": "ValueError"
    }
   ]
  },
  {
   "id": "riscv_decode",
   "title": "Decoding RISC-V instructions",
   "prompt": "<p>Write <code>decode(word)</code>, the inverse of the previous problem for the same instructions: given a 32-bit int, return the instruction text in the same format, for example <code>\"addi x5, x6, -3\"</code> or <code>\"sw x5, 12(x6)\"</code>. Raise <code>ValueError</code> for anything else.</p>",
   "starter": "def decode(word):\n    pass\n",
   "hint": "<p>Extract fields with shifts and masks: opcode = <code>word &amp; 0x7F</code>, rd = <code>(word &gt;&gt; 7) &amp; 0x1F</code>, and so on. Sign-extend a 12-bit immediate by subtracting 4096 when bit 11 is set.</p>",
   "solution": "def decode(word):\n    op = word & 0x7F\n    rd = (word >> 7) & 0x1F\n    f3 = (word >> 12) & 7\n    rs1 = (word >> 15) & 0x1F\n    rs2 = (word >> 20) & 0x1F\n    f7 = word >> 25\n    sx = lambda v: v - 4096 if v & 0x800 else v\n    if op == 0x33:\n        names = {(0, 0): \"add\", (0, 0x20): \"sub\", (7, 0): \"and\", (6, 0): \"or\", (4, 0): \"xor\"}\n        if (f3, f7) in names:\n            return f\"{names[(f3, f7)]} x{rd}, x{rs1}, x{rs2}\"\n    elif op == 0x13 and f3 == 0:\n        return f\"addi x{rd}, x{rs1}, {sx(word >> 20)}\"\n    elif op == 0x03 and f3 == 2:\n        return f\"lw x{rd}, {sx(word >> 20)}(x{rs1})\"\n    elif op == 0x23 and f3 == 2:\n        imm = sx((f7 << 5) | rd)\n        return f\"sw x{rs2}, {imm}(x{rs1})\"\n    raise ValueError(f\"can't decode {word:#010x}\")\n",
   "tests": [
    {
     "label": "Known encodings",
     "type": "assert",
     "code": "assert decode(0x007302B3) == \"add x5, x6, x7\"\nassert decode(0x407302B3) == \"sub x5, x6, x7\"\nassert decode(0xFFD30293) == \"addi x5, x6, -3\"\nassert decode(0x00832283) == \"lw x5, 8(x6)\"\nassert decode(0x00532623) == \"sw x5, 12(x6)\"\n"
    },
    {
     "label": "Practice problem",
     "call": "decode(0x00A00093)",
     "expect": "'addi x1, x0, 10'"
    },
    {
     "label": "Negative store offset",
     "type": "assert",
     "code": "w = ((0xFF8 >> 5) << 25) | (9 << 20) | (2 << 15) | (2 << 12) | ((0xFF8 & 0x1F) << 7) | 0x23\nassert decode(w) == \"sw x9, -8(x2)\", decode(w)\n"
    },
    {
     "label": "Unknown instruction",
     "type": "raises",
     "call": "decode(0x0000006F)",
     "error": "ValueError"
    }
   ]
  }
 ],
 "ar5": [
  {
   "id": "mini_cpu",
   "title": "A single-cycle RISC-V simulator",
   "prompt": "<p>Write <code>run(program, mem=None, max_steps=10000)</code> that simulates the notes' processor on a list of decoded instructions, tuples like <code>(\"add\", rd, rs1, rs2)</code>, <code>(\"addi\", rd, rs1, imm)</code>, <code>(\"lw\", rd, rs1, imm)</code>, <code>(\"sw\", rs2, rs1, imm)</code>, <code>(\"beq\", rs1, rs2, offset)</code>, <code>(\"bne\", rs1, rs2, offset)</code> and <code>(\"slt\", rd, rs1, rs2)</code> (rd = 1 if rs1 &lt; rs2, else 0). Instruction <em>i</em> is at address 4<em>i</em>, and branch offsets are in bytes from the branch's own address. <code>mem</code> is a dict from address to word (missing addresses read as 0). Run until the PC goes past the last instruction, then return <code>(registers, mem)</code>, where registers is a list of 32 ints with x0 always 0. More than <code>max_steps</code> instructions raises <code>RuntimeError</code>.</p>",
   "starter": "def run(program, mem=None, max_steps=10000):\n    pass\n",
   "hint": "<p>Start from the notes' <code>run</code> and add <code>bne</code> and <code>slt</code>. Remember to reset <code>x[0] = 0</code> after every instruction.</p>",
   "solution": "def run(program, mem=None, max_steps=10000):\n    x = [0] * 32\n    mem = {} if mem is None else mem\n    pc = 0\n    for _ in range(max_steps):\n        if pc // 4 >= len(program):\n            return x, mem\n        op, a, b, c = program[pc // 4]\n        nxt = pc + 4\n        if op == \"add\": x[a] = x[b] + x[c]\n        elif op == \"sub\": x[a] = x[b] - x[c]\n        elif op == \"slt\": x[a] = 1 if x[b] < x[c] else 0\n        elif op == \"addi\": x[a] = x[b] + c\n        elif op == \"lw\": x[a] = mem.get(x[b] + c, 0)\n        elif op == \"sw\": mem[x[b] + c] = x[a]\n        elif op == \"beq\":\n            if x[a] == x[b]: nxt = pc + c\n        elif op == \"bne\":\n            if x[a] != x[b]: nxt = pc + c\n        else:\n            raise ValueError(op)\n        x[0] = 0\n        pc = nxt\n    raise RuntimeError(\"too many steps\")\n",
   "tests": [
    {
     "label": "The notes' array sum",
     "type": "assert",
     "code": "prog = [(\"addi\", 5, 0, 100), (\"addi\", 6, 0, 3), (\"addi\", 10, 0, 0),\n        (\"beq\", 6, 0, 24), (\"lw\", 7, 5, 0), (\"add\", 10, 10, 7), (\"addi\", 5, 5, 4), (\"addi\", 6, 6, -1),\n        (\"beq\", 0, 0, -20)]\nx, mem = run(prog, mem={100: 7, 104: 11, 108: 2})\nassert x[10] == 20, x[10]\n"
    },
    {
     "label": "x0 stays zero",
     "type": "assert",
     "code": "x, _ = run([('addi', 0, 0, 5), ('add', 1, 0, 0)])\nassert x[0] == 0 and x[1] == 0\n"
    },
    {
     "label": "Store, then load",
     "type": "assert",
     "code": "x, mem = run([(\"addi\", 1, 0, 42), (\"addi\", 2, 0, 200), (\"sw\", 1, 2, 8), (\"lw\", 3, 2, 8)])\nassert mem[208] == 42 and x[3] == 42\n"
    },
    {
     "label": "slt and bne: count down",
     "type": "assert",
     "code": "prog = [(\"addi\", 1, 0, 5), (\"addi\", 2, 0, 0),\n        (\"addi\", 2, 2, 1), (\"addi\", 1, 1, -1), (\"bne\", 1, 0, -8),\n        (\"slt\", 3, 1, 2)]\nx, _ = run(prog)\nassert x[2] == 5 and x[1] == 0 and x[3] == 1\n"
    },
    {
     "label": "Infinite loop raises RuntimeError",
     "type": "raises",
     "call": "run([('beq', 0, 0, 0)])",
     "error": "RuntimeError"
    }
   ]
  }
 ],
 "ar6": [
  {
   "id": "pipeline_timing",
   "title": "Counting pipeline cycles",
   "prompt": "<p>Write <code>cycles(instrs)</code> for a 5-stage pipeline with full forwarding, where the only hazard that costs time is a <strong>load-use hazard</strong>: an instruction that reads a register written by a <code>lw</code> immediately before it costs 1 stall cycle. Each instruction is a tuple <code>(op, dest, src1, src2)</code>, with <code>None</code> for unused fields (stores have <code>dest=None</code>). With <em>n</em> instructions and <em>s</em> stalls, the total is <em>n</em> + 4 + <em>s</em> cycles (0 for an empty list). Writing to register 0 never creates a hazard.</p>",
   "starter": "def cycles(instrs):\n    pass\n",
   "hint": "<p>Walk through adjacent pairs: a stall happens when the first is a <code>lw</code> with a nonzero destination that equals one of the second's sources.</p>",
   "solution": "def cycles(instrs):\n    if not instrs:\n        return 0\n    stalls = 0\n    for (op1, d1, _, _), (_, _, s1, s2) in zip(instrs, instrs[1:]):\n        if op1 == \"lw\" and d1 and d1 in (s1, s2):\n            stalls += 1\n    return len(instrs) + 4 + stalls\n",
   "tests": [
    {
     "label": "No hazards",
     "call": "cycles([('add', 1, 2, 3), ('add', 4, 5, 6), ('sub', 7, 8, 9)])",
     "expect": "7"
    },
    {
     "label": "Forwarded ALU result: no stall",
     "call": "cycles([('add', 5, 6, 7), ('sub', 8, 5, 9)])",
     "expect": "6"
    },
    {
     "label": "Load-use costs one stall",
     "call": "cycles([('lw', 1, 2, None), ('add', 3, 1, 4), ('sw', None, 3, 2), ('addi', 5, 5, None)])",
     "expect": "9"
    },
    {
     "label": "Reordered: no stall",
     "call": "cycles([('lw', 1, 2, None), ('addi', 5, 5, None), ('add', 3, 1, 4), ('sw', None, 3, 2)])",
     "expect": "8"
    },
    {
     "label": "Loads into x0 never stall",
     "call": "cycles([('lw', 0, 2, None), ('add', 3, 0, 0)])",
     "expect": "6"
    },
    {
     "label": "Empty",
     "call": "cycles([])",
     "expect": "0"
    }
   ]
  },
  {
   "id": "branch_predictor",
   "title": "Branch predictors",
   "prompt": "<p>Write <code>mispredictions(outcomes, bits)</code> for one branch whose actual outcomes (<code>True</code> = taken) are listed in order. For <code>bits=1</code>, predict whatever happened last time, starting with \"not taken\". For <code>bits=2</code>, use a saturating counter from 0 to 3 starting at 1: predict taken when the counter is 2 or 3; after each outcome, add 1 if taken (at most 3) or subtract 1 if not (at least 0). Return the number of wrong predictions.</p>",
   "starter": "def mispredictions(outcomes, bits):\n    pass\n",
   "hint": "<p>Keep the predictor's state in a variable and update it after comparing its prediction with each outcome.</p>",
   "solution": "def mispredictions(outcomes, bits):\n    wrong = 0\n    if bits == 1:\n        last = False\n        for t in outcomes:\n            wrong += (last != t)\n            last = t\n    elif bits == 2:\n        c = 1\n        for t in outcomes:\n            wrong += ((c >= 2) != t)\n            c = min(3, c + 1) if t else max(0, c - 1)\n    else:\n        raise ValueError(bits)\n    return wrong\n",
   "tests": [
    {
     "label": "A loop run 10 times, three times over",
     "type": "assert",
     "code": "runs = ([True] * 9 + [False]) * 3\nassert mispredictions(runs, 1) == 6, mispredictions(runs, 1)\nassert mispredictions(runs, 2) == 4, mispredictions(runs, 2)\n"
    },
    {
     "label": "Always taken",
     "type": "assert",
     "code": "assert mispredictions([True] * 20, 1) == 1 and mispredictions([True] * 20, 2) == 1\n"
    },
    {
     "label": "Alternating defeats both",
     "type": "assert",
     "code": "alt = [True, False] * 10\nassert mispredictions(alt, 1) == 20\nassert mispredictions(alt, 2) == 20, mispredictions(alt, 2)\n"
    },
    {
     "label": "Empty history",
     "call": "mispredictions([], 2)",
     "expect": "0"
    }
   ]
  }
 ],
 "ar7": [
  {
   "id": "page_translation",
   "title": "Translating virtual addresses",
   "prompt": "<p>Write <code>translate(vaddr, page_table, access, page_size=4096)</code>. <code>page_table</code> maps a virtual page number to a pair <code>(frame, permissions)</code>, where permissions is a string containing any of <code>\"r\"</code>, <code>\"w\"</code>, <code>\"x\"</code>. <code>access</code> is one of those letters. Return the physical address. If the page isn't mapped, raise <code>MemoryError</code> (a page fault); if it's mapped but the access isn't permitted, raise <code>PermissionError</code> (a protection fault).</p>",
   "starter": "def translate(vaddr, page_table, access, page_size=4096):\n    pass\n",
   "hint": "<p><code>vpn, offset = divmod(vaddr, page_size)</code>; the physical address is <code>frame * page_size + offset</code>.</p>",
   "solution": "def translate(vaddr, page_table, access, page_size=4096):\n    vpn, offset = divmod(vaddr, page_size)\n    if vpn not in page_table:\n        raise MemoryError(f\"page fault at {vaddr:#x}\")\n    frame, perms = page_table[vpn]\n    if access not in perms:\n        raise PermissionError(f\"{access} access to {vaddr:#x} not allowed\")\n    return frame * page_size + offset\n",
   "tests": [
    {
     "label": "The notes' example",
     "call": "translate(0x12345, {0x12: (7, 'rw')}, 'r')",
     "expect": "0x7345"
    },
    {
     "label": "Practice problem",
     "type": "assert",
     "code": "pt = {0: (5, \"rx\"), 1: (2, \"rw\"), 4: (9, \"r\")}\nassert translate(0x1A3C, pt, \"w\") == 0x2A3C and translate(0x4004, pt, \"r\") == 0x9004\n"
    },
    {
     "label": "Unmapped page faults",
     "type": "raises",
     "call": "translate(0x2000, {0: (5, 'r')}, 'r')",
     "error": "MemoryError"
    },
    {
     "label": "Writing a read-only page",
     "type": "raises",
     "call": "translate(0x10, {0: (5, 'rx')}, 'w')",
     "error": "PermissionError"
    },
    {
     "label": "Other page sizes",
     "call": "translate(0x5FFF, {2: (3, 'r')}, 'r', page_size=8192)",
     "expect": "3 * 8192 + 0x1FFF"
    }
   ]
  },
  {
   "id": "tlb_sim",
   "title": "A TLB simulator",
   "prompt": "<p>Write <code>tlb_hits(addresses, entries, page_size=4096)</code> that simulates a fully associative TLB with the given number of entries and least-recently-used replacement, over a list of virtual addresses. Return <code>(hits, misses)</code>. (On a miss, the translation is loaded into the TLB, evicting the least recently used entry if it's full.)</p>",
   "starter": "def tlb_hits(addresses, entries, page_size=4096):\n    pass\n",
   "hint": "<p>Keep a list of page numbers ordered from least to most recently used, as in CS 210's set-associative cache problem.</p>",
   "solution": "def tlb_hits(addresses, entries, page_size=4096):\n    tlb, hits, misses = [], 0, 0\n    for a in addresses:\n        vpn = a // page_size\n        if vpn in tlb:\n            hits += 1\n            tlb.remove(vpn)\n        else:\n            misses += 1\n            if len(tlb) == entries:\n                tlb.pop(0)\n        tlb.append(vpn)\n    return hits, misses\n",
   "tests": [
    {
     "label": "Sequential bytes of a 1 MB array",
     "call": "tlb_hits(range(0, 2**20, 64), 16)",
     "expect": "(16128, 256)"
    },
    {
     "label": "Reuse within the TLB",
     "call": "tlb_hits([0, 4096, 0, 8192, 4096, 0], 2)",
     "expect": "(1, 5)"
    },
    {
     "label": "Too many pages in rotation",
     "call": "tlb_hits([0, 4096, 8192] * 3, 2)",
     "expect": "(0, 9)"
    },
    {
     "label": "Empty",
     "call": "tlb_hits([], 4)",
     "expect": "(0, 0)"
    }
   ]
  }
 ],
 "ar8": [
  {
   "id": "amdahl_problem",
   "title": "Amdahl's law",
   "prompt": "<p>Write <code>speedup(p, s)</code> by Amdahl's law (a fraction <em>p</em> of the work sped up by a factor <em>s</em>), <code>max_speedup(p)</code> (the limit as <em>s</em> → ∞; return <code>float(\"inf\")</code> when <em>p</em> = 1), and <code>cores_needed(p, target)</code>: the smallest whole number of cores <em>s</em> ≥ 1 with <code>speedup(p, s) &gt;= target</code>, or <code>None</code> if the target is not less than the maximum (and so can't be reached).</p>",
   "starter": "def speedup(p, s):\n    pass\n\ndef max_speedup(p):\n    pass\n\ndef cores_needed(p, target):\n    pass\n",
   "hint": "<p>Solve 1/((1 − p) + p/s) ≥ target for <em>s</em>: <em>s</em> ≥ p / (1/target − (1 − p)). Round up with <code>math.ceil</code>, and check the boundary with <code>speedup</code> in case of floating-point rounding.</p>",
   "solution": "import math\n\ndef speedup(p, s):\n    return 1 / ((1 - p) + p / s)\n\ndef max_speedup(p):\n    return float(\"inf\") if p == 1 else 1 / (1 - p)\n\ndef cores_needed(p, target):\n    if target <= 1:\n        return 1\n    if target >= max_speedup(p):\n        return None\n    s = max(1, math.ceil(p / (1 / target - (1 - p)) - 1e-9))\n    while speedup(p, s) < target:\n        s += 1\n    return s\n",
   "tests": [
    {
     "label": "The notes' examples",
     "type": "assert",
     "code": "import math\nassert math.isclose(speedup(0.9, 10), 1 / 0.19)\nassert math.isclose(speedup(0.95, 16), 9.142857142857142)\nassert math.isclose(max_speedup(0.9), 10)\n"
    },
    {
     "label": "Perfectly parallel",
     "type": "assert",
     "code": "import math\nassert math.isclose(speedup(1, 8), 8) and max_speedup(1) == float('inf')\n"
    },
    {
     "label": "Cores needed",
     "type": "assert",
     "code": "assert cores_needed(0.95, 8) == 13\nassert cores_needed(0.9, 5) == 9\nassert cores_needed(0.5, 1) == 1\n"
    },
    {
     "label": "Unreachable target",
     "type": "assert",
     "code": "assert cores_needed(0.95, 25) is None and cores_needed(0.9, 11) is None\n"
    }
   ]
  }
 ]
});
