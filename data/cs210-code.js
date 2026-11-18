/* Auto-graded programming problems for CS 210, by lesson. Generated from a Python spec, so every
   string is JSON. The C labs are graded outside the browser; these problems simulate the same ideas
   in Python so they can run here. */
CSA.addCode("cs210", {
 "sy1": [
  {
   "id": "twos_complement",
   "title": "Two's complement by hand",
   "prompt": "<p>Write two functions without using <code>bin</code>, <code>format</code> or f-string formatting:</p>\n<ul>\n<li><code>to_twos(x, w)</code> returns the <em>w</em>-bit two's complement pattern of <em>x</em> as a string of <code>\"0\"</code>s and <code>\"1\"</code>s, most significant bit first. If <em>x</em> doesn't fit in <em>w</em> bits (outside −2<sup><em>w</em>−1</sup> to 2<sup><em>w</em>−1</sup> − 1), raise <code>OverflowError</code>.</li>\n<li><code>from_twos(bits)</code> does the reverse: it reads a string of bits as a two's complement number.</li>\n</ul>\n<p>For example, <code>to_twos(-5, 8)</code> is <code>\"11111011\"</code> and <code>from_twos(\"10000000\")</code> is −128.</p>",
   "starter": "def to_twos(x, w):\n    pass\n\ndef from_twos(bits):\n    pass\n",
   "hint": "<p>For <code>to_twos</code>, check the range, then turn a negative <em>x</em> into its unsigned equivalent by adding 2<sup><em>w</em></sup>; build the string by testing bits from <em>w</em> − 1 down to 0 with <code>(u &gt;&gt; i) &amp; 1</code>. For <code>from_twos</code>, compute the unsigned value, then subtract 2<sup><em>w</em></sup> if the first bit is 1.</p>",
   "solution": "def to_twos(x, w):\n    if not -(1 << (w - 1)) <= x < (1 << (w - 1)):\n        raise OverflowError(f\"{x} doesn't fit in {w} bits\")\n    u = x + (1 << w) if x < 0 else x\n    return \"\".join(\"1\" if (u >> i) & 1 else \"0\" for i in range(w - 1, -1, -1))\n\ndef from_twos(bits):\n    u = 0\n    for b in bits:\n        u = 2 * u + (b == \"1\")\n    return u - (1 << len(bits)) if bits[0] == \"1\" else u\n",
   "tests": [
    {
     "label": "to_twos examples",
     "type": "assert",
     "code": "assert to_twos(-5, 8) == \"11111011\", to_twos(-5, 8)\nassert to_twos(5, 8) == \"00000101\"\nassert to_twos(-1, 4) == \"1111\" and to_twos(0, 3) == \"000\"\n"
    },
    {
     "label": "Range edges",
     "type": "assert",
     "code": "assert to_twos(127, 8) == \"01111111\" and to_twos(-128, 8) == \"10000000\"\n"
    },
    {
     "label": "Out of range raises OverflowError",
     "type": "raises",
     "call": "to_twos(128, 8)",
     "error": "OverflowError"
    },
    {
     "label": "from_twos examples",
     "type": "assert",
     "code": "assert from_twos(\"10000000\") == -128\nassert from_twos(\"01111111\") == 127\nassert from_twos(\"11111111\") == -1 and from_twos(\"0\") == 0\n"
    },
    {
     "label": "Round trip for every 8-bit value",
     "type": "assert",
     "hidden": true,
     "code": "for x in range(-128, 128):\n    assert from_twos(to_twos(x, 8)) == x, x\n"
    },
    {
     "label": "Doesn't use bin or format",
     "type": "source",
     "code": "assert \"bin(\" not in __source__ and \"format(\" not in __source__ and \":b}\" not in __source__ and \":0\" not in __source__, \"Build the bits yourself with shifts and masks.\"\n"
    }
   ]
  },
  {
   "id": "bit_tricks",
   "title": "Bit tricks",
   "prompt": "<p>Write these functions for non-negative integers, using bitwise operators (no strings, no <code>bin</code>, no <code>bit_count</code>):</p>\n<ul>\n<li><code>count_ones(x)</code>: the number of 1 bits.</li>\n<li><code>is_power_of_two(x)</code>: <code>True</code> if <em>x</em> is 1, 2, 4, 8, … (0 is not).</li>\n<li><code>lowest_set_bit(x)</code>: the value of the lowest 1 bit (for 12 = 0b1100 it is 4); 0 if <em>x</em> is 0.</li>\n<li><code>reverse_bits(x, w)</code>: the <em>w</em>-bit pattern of <em>x</em> in reverse order (for <em>w</em> = 4, 0b0011 becomes 0b1100).</li>\n</ul>",
   "starter": "def count_ones(x):\n    pass\n\ndef is_power_of_two(x):\n    pass\n\ndef lowest_set_bit(x):\n    pass\n\ndef reverse_bits(x, w):\n    pass\n",
   "hint": "<p>The notes show that <code>x &amp; (x - 1)</code> clears the lowest 1 bit; the lowest set bit is what it cleared, <code>x - (x &amp; (x - 1))</code> (or <code>x &amp; -x</code>). For <code>reverse_bits</code>, take bits off the bottom of <em>x</em> with <code>&amp; 1</code> and <code>&gt;&gt;= 1</code>, and push them onto the bottom of the result with <code>(result &lt;&lt; 1) | bit</code>, <em>w</em> times.</p>",
   "solution": "def count_ones(x):\n    n = 0\n    while x:\n        x &= x - 1\n        n += 1\n    return n\n\ndef is_power_of_two(x):\n    return x > 0 and x & (x - 1) == 0\n\ndef lowest_set_bit(x):\n    return x & -x\n\ndef reverse_bits(x, w):\n    out = 0\n    for _ in range(w):\n        out = (out << 1) | (x & 1)\n        x >>= 1\n    return out\n",
   "tests": [
    {
     "label": "count_ones",
     "type": "assert",
     "code": "assert [count_ones(x) for x in (0, 1, 7, 8, 255, 2**40 + 3)] == [0, 1, 3, 1, 8, 3]\n"
    },
    {
     "label": "is_power_of_two",
     "type": "assert",
     "code": "assert [is_power_of_two(x) for x in (0, 1, 2, 3, 64, 96, 2**50)] == [False, True, True, False, True, False, True]\n"
    },
    {
     "label": "lowest_set_bit",
     "type": "assert",
     "code": "assert [lowest_set_bit(x) for x in (0, 1, 12, 40, 2**33)] == [0, 1, 4, 8, 2**33]\n"
    },
    {
     "label": "reverse_bits",
     "type": "assert",
     "code": "assert reverse_bits(0b0011, 4) == 0b1100\nassert reverse_bits(1, 8) == 128\nassert reverse_bits(0b10110000, 8) == 0b00001101\n"
    },
    {
     "label": "Doesn't use strings or bit_count",
     "type": "source",
     "code": "assert \"bin(\" not in __source__ and \"bit_count\" not in __source__ and \"str(\" not in __source__ and \"format(\" not in __source__, \"Use bitwise operators only.\"\n"
    }
   ]
  }
 ],
 "sy2": [
  {
   "id": "decode_float32",
   "title": "Decoding a 32-bit float",
   "prompt": "<p>Write <code>decode_float32(bits)</code> that takes a 32-bit pattern as an integer (for example <code>0x40D00000</code>) and returns the value it represents in IEEE 754 single precision, as a Python float. Handle normal numbers, zeros (return <code>0.0</code> or <code>-0.0</code>), subnormal numbers, infinities and NaN (return <code>float(\"nan\")</code>). Don't use the <code>struct</code> module: extract the sign, exponent and fraction fields with shifts and masks and apply the formulas from the notes.</p>",
   "starter": "def decode_float32(bits):\n    pass\n",
   "hint": "<p>sign = <code>bits &gt;&gt; 31</code>; exponent field = <code>(bits &gt;&gt; 23) &amp; 0xFF</code>; fraction field = <code>bits &amp; 0x7FFFFF</code>. A normal number is (−1)<sup>s</sup> × (1 + f/2<sup>23</sup>) × 2<sup>e − 127</sup>. With exponent field 0 it's (−1)<sup>s</sup> × (f/2<sup>23</sup>) × 2<sup>−126</sup>; with 255 it's infinity or NaN.</p>",
   "solution": "def decode_float32(bits):\n    sign = -1.0 if bits >> 31 else 1.0\n    e = (bits >> 23) & 0xFF\n    f = bits & 0x7FFFFF\n    if e == 255:\n        return sign * float(\"inf\") if f == 0 else float(\"nan\")\n    if e == 0:\n        return sign * (f / 2**23) * 2.0**-126\n    return sign * (1 + f / 2**23) * 2.0**(e - 127)\n",
   "tests": [
    {
     "label": "Normal numbers",
     "type": "assert",
     "code": "assert decode_float32(0x40D00000) == 6.5\nassert decode_float32(0xBF800000) == -1.0\nassert decode_float32(0x41200000) == 10.0\nassert decode_float32(0xBF400000) == -0.75\n"
    },
    {
     "label": "0.1 is approximate",
     "type": "assert",
     "code": "assert decode_float32(0x3DCCCCCD) == 0.10000000149011612, decode_float32(0x3DCCCCCD)\n"
    },
    {
     "label": "Zeros",
     "type": "assert",
     "code": "import math\nassert decode_float32(0) == 0.0 and math.copysign(1, decode_float32(0x80000000)) == -1, \"0x80000000 is -0.0\"\n"
    },
    {
     "label": "Infinity and NaN",
     "type": "assert",
     "code": "import math\nassert decode_float32(0x7F800000) == math.inf and decode_float32(0xFF800000) == -math.inf\nassert math.isnan(decode_float32(0x7FC00000))\n"
    },
    {
     "label": "Subnormals and extremes",
     "type": "assert",
     "hidden": true,
     "code": "assert decode_float32(0x00000001) == 2.0**-149\nassert decode_float32(0x007FFFFF) == (1 - 2**-23) * 2.0**-126\nassert decode_float32(0x7F7FFFFF) == (2 - 2**-23) * 2.0**127\n"
    },
    {
     "label": "Doesn't use struct",
     "type": "source",
     "code": "assert \"struct\" not in __source__, \"Decode the fields yourself.\"\n"
    }
   ]
  },
  {
   "id": "next_float",
   "title": "The gap after a float",
   "prompt": "<p>Write <code>float_parts(x)</code> that returns the three fields of the 64-bit double <code>x</code> as a tuple of integers <code>(sign, exponent_field, fraction_field)</code>. Use <code>struct.pack(\"&gt;d\", x)</code> to get its 8 bytes and <code>int.from_bytes(..., \"big\")</code> to turn them into one integer, then extract the fields (1, 11 and 52 bits).</p>\n<p>Then write <code>ulp(x)</code>, the gap between a positive normal double <em>x</em> and the next larger double: 2<sup>E − 52</sup>, where E = exponent_field − 1023. For example <code>ulp(1.0)</code> is 2<sup>−52</sup>.</p>",
   "starter": "import struct\n\ndef float_parts(x):\n    pass\n\ndef ulp(x):\n    pass\n",
   "hint": "<p>With <code>n = int.from_bytes(struct.pack(\"&gt;d\", x), \"big\")</code>: sign is <code>n &gt;&gt; 63</code>, the exponent field is <code>(n &gt;&gt; 52) &amp; 0x7FF</code>, and the fraction is <code>n &amp; ((1 &lt;&lt; 52) - 1)</code>.</p>",
   "solution": "import struct\n\ndef float_parts(x):\n    n = int.from_bytes(struct.pack(\">d\", x), \"big\")\n    return (n >> 63, (n >> 52) & 0x7FF, n & ((1 << 52) - 1))\n\ndef ulp(x):\n    e = float_parts(x)[1] - 1023\n    return 2.0 ** (e - 52)\n",
   "tests": [
    {
     "label": "1.0 and -2.0",
     "type": "assert",
     "code": "assert float_parts(1.0) == (0, 1023, 0), float_parts(1.0)\nassert float_parts(-2.0) == (1, 1024, 0), float_parts(-2.0)\n"
    },
    {
     "label": "1.5 has fraction 0.5",
     "call": "float_parts(1.5)",
     "expect": "(0, 1023, 2**51)"
    },
    {
     "label": "ulp of 1, 2 and 1e16",
     "type": "assert",
     "code": "assert ulp(1.0) == 2.0**-52\nassert ulp(2.0) == 2.0**-51 and ulp(3.9) == 2.0**-51\nassert ulp(1e16) == 2.0, ulp(1e16)\n"
    },
    {
     "label": "Adding the ulp gives the next float",
     "type": "assert",
     "hidden": true,
     "code": "import math\nfor x in (1.0, 3.7, 123456.789, 1e100):\n    assert math.nextafter(x, math.inf) == x + ulp(x), x\n"
    }
   ]
  }
 ],
 "sy3": [
  {
   "id": "c_division",
   "title": "C's integer division",
   "prompt": "<p>Write <code>c_div(a, b)</code> and <code>c_mod(a, b)</code> that compute C's integer division and remainder for integers with <code>b != 0</code>: the quotient truncates toward zero, and the remainder satisfies <code>c_div(a, b) * b + c_mod(a, b) == a</code>. Don't use <code>math.trunc</code>, <code>int(a / b)</code> or <code>math.fmod</code> (floats lose precision for large numbers): use Python's <code>//</code> and <code>%</code> and fix the sign.</p>",
   "starter": "def c_div(a, b):\n    pass\n\ndef c_mod(a, b):\n    pass\n",
   "hint": "<p>Compute <code>abs(a) // abs(b)</code>, then make it negative if exactly one of <em>a</em> and <em>b</em> is negative. The remainder then follows from the identity.</p>",
   "solution": "def c_div(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\ndef c_mod(a, b):\n    return a - b * c_div(a, b)\n",
   "tests": [
    {
     "label": "Positive operands",
     "call": "(c_div(7, 2), c_mod(7, 2))",
     "expect": "(3, 1)"
    },
    {
     "label": "Negative dividend",
     "call": "(c_div(-7, 2), c_mod(-7, 2))",
     "expect": "(-3, -1)"
    },
    {
     "label": "Negative divisor",
     "call": "(c_div(7, -2), c_mod(7, -2))",
     "expect": "(-3, 1)"
    },
    {
     "label": "Both negative",
     "call": "(c_div(-7, -2), c_mod(-7, -2))",
     "expect": "(3, -1)"
    },
    {
     "label": "Exact for huge numbers",
     "type": "assert",
     "code": "a = -(10**30 + 7)\nassert c_div(a, 10) == -(10**29), c_div(a, 10)\nassert c_mod(a, 10) == -7\n"
    },
    {
     "label": "Doesn't go through floats",
     "type": "source",
     "code": "assert \"trunc\" not in __source__ and \"fmod\" not in __source__ and \" / \" not in __source__, \"Use integer operations only.\"\n"
    }
   ]
  },
  {
   "id": "c_strings",
   "title": "C strings in a byte buffer",
   "prompt": "<p>Simulate C strings with Python <code>bytearray</code>s. A <code>bytearray</code> is a list-like sequence of bytes that you can change in place. <code>bytearray(6)</code> makes 6 bytes that are all 0, and <code>bytearray(b\"hi\\x00\")</code> makes the 3 bytes of a <code>bytes</code> value (Lesson 1 showed the <code>b'...'</code> notation; <code>\\x00</code> is the byte 0, C's terminator). Indexing gives a whole number from 0 to 255: if <code>buf = bytearray(b\"hi\\x00\")</code>, then <code>buf[0]</code> is 104, the code of <code>h</code>, and <code>buf[2]</code> is 0. You can assign <code>buf[i] = 65</code>, and <code>len(buf)</code> is the number of bytes. The tests build every buffer this way.</p>\n<ul>\n<li><code>c_strlen(buf)</code> returns the number of bytes before the first 0 byte. If there is no 0 byte, raise <code>ValueError</code> (a real <code>strlen</code> would run past the end of the buffer).</li>\n<li><code>safe_copy(dest, src)</code> copies the C string in <code>src</code> into <code>dest</code> (both bytearrays) <em>including</em> its terminator, like <code>strcpy</code>, but first checks that it fits: if <code>c_strlen(src) + 1 &gt; len(dest)</code>, raise <code>OverflowError</code> and leave <code>dest</code> unchanged. It returns the number of characters copied, not counting the terminator.</li>\n</ul>",
   "starter": "def c_strlen(buf):\n    pass\n\ndef safe_copy(dest, src):\n    pass\n",
   "hint": "<p>Walk through <code>buf</code> with an index until you find a 0; if you reach <code>len(buf)</code> first, raise. Copy byte by byte with <code>dest[i] = src[i]</code>.</p>",
   "solution": "def c_strlen(buf):\n    for i, b in enumerate(buf):\n        if b == 0:\n            return i\n    raise ValueError(\"no terminator: strlen would read past the end\")\n\ndef safe_copy(dest, src):\n    n = c_strlen(src)\n    if n + 1 > len(dest):\n        raise OverflowError(f\"{n + 1} bytes don't fit in {len(dest)}\")\n    for i in range(n + 1):\n        dest[i] = src[i]\n    return n\n",
   "tests": [
    {
     "label": "strlen stops at the first 0",
     "type": "assert",
     "code": "assert c_strlen(bytearray(b\"Grace\\x00\")) == 5\nassert c_strlen(bytearray(b\"hi\\x00there\\x00\")) == 2\nassert c_strlen(bytearray(b\"\\x00\")) == 0\n"
    },
    {
     "label": "Missing terminator raises ValueError",
     "type": "raises",
     "call": "c_strlen(bytearray(b\"hello\"))",
     "error": "ValueError"
    },
    {
     "label": "Copy that fits",
     "type": "assert",
     "code": "dest = bytearray(8)\nassert safe_copy(dest, bytearray(b\"cat\\x00junk\")) == 3\nassert dest[:4] == b\"cat\\x00\", dest\n"
    },
    {
     "label": "Exactly full",
     "type": "assert",
     "code": "dest = bytearray(6)\nsafe_copy(dest, bytearray(b\"hello\\x00\"))\nassert dest == bytearray(b\"hello\\x00\")\n"
    },
    {
     "label": "Too long raises and changes nothing",
     "type": "assert",
     "code": "dest = bytearray(b\"xxxxx\")\ntry:\n    safe_copy(dest, bytearray(b\"hello\\x00\"))\nexcept OverflowError:\n    pass\nelse:\n    raise AssertionError(\"6 bytes into 5 should raise OverflowError\")\nassert dest == bytearray(b\"xxxxx\"), \"dest changed before the error\"\n"
    }
   ]
  }
 ],
 "sy4": [
  {
   "id": "byte_memory",
   "title": "Memory, addresses and endianness",
   "prompt": "<p>Write a class <code>Memory</code> that simulates byte-addressed memory:</p>\n<ul>\n<li><code>Memory(size)</code> creates <em>size</em> bytes, all 0, at addresses 0 to size − 1. Store them in a <code>bytearray(size)</code> (Lesson 3's <em>C strings in a byte buffer</em> problem explains the type); each item is a number from 0 to 255.</li>\n<li><code>store32(addr, value)</code> writes the 32-bit unsigned value (0 ≤ value &lt; 2<sup>32</sup>) as 4 bytes in <strong>little-endian</strong> order at addresses addr to addr + 3; <code>load32(addr)</code> reads it back.</li>\n<li><code>byte(addr)</code> returns the byte at one address.</li>\n<li>Any access outside the memory raises <code>IndexError</code> (a segmentation fault, in C terms).</li>\n</ul>\n<p>Then write <code>array_get(mem, base, i)</code> that returns element <em>i</em> of an array of 32-bit ints starting at address <code>base</code>, using the pointer-arithmetic rule from the notes.</p>",
   "starter": "class Memory:\n    def __init__(self, size):\n        pass\n\n    def byte(self, addr):\n        pass\n\n    def store32(self, addr, value):\n        pass\n\n    def load32(self, addr):\n        pass\n\ndef array_get(mem, base, i):\n    pass\n",
   "hint": "<p>Store the bytes in a <code>bytearray</code>. In little-endian order, the byte at addr + k is <code>(value &gt;&gt; (8 * k)) &amp; 0xFF</code>. Check <code>0 &lt;= addr</code> and <code>addr + 4 &lt;= size</code> before touching anything. Element <em>i</em> is at <code>base + 4 * i</code>.</p>",
   "solution": "class Memory:\n    def __init__(self, size):\n        self._b = bytearray(size)\n\n    def _check(self, addr, n):\n        if addr < 0 or addr + n > len(self._b):\n            raise IndexError(f\"address {addr} is outside memory\")\n\n    def byte(self, addr):\n        self._check(addr, 1)\n        return self._b[addr]\n\n    def store32(self, addr, value):\n        self._check(addr, 4)\n        for k in range(4):\n            self._b[addr + k] = (value >> (8 * k)) & 0xFF\n\n    def load32(self, addr):\n        self._check(addr, 4)\n        return sum(self._b[addr + k] << (8 * k) for k in range(4))\n\ndef array_get(mem, base, i):\n    return mem.load32(base + 4 * i)\n",
   "tests": [
    {
     "label": "Little-endian layout",
     "type": "assert",
     "code": "m = Memory(16)\nm.store32(4, 0x12345678)\nassert [m.byte(a) for a in range(4, 8)] == [0x78, 0x56, 0x34, 0x12], [hex(m.byte(a)) for a in range(4, 8)]\nassert m.load32(4) == 0x12345678\n"
    },
    {
     "label": "New memory is zero",
     "type": "assert",
     "code": "m = Memory(8)\nassert m.load32(0) == 0 and m.byte(7) == 0\n"
    },
    {
     "label": "Out of bounds raises IndexError",
     "type": "assert",
     "code": "m = Memory(8)\nfor op in (lambda: m.byte(8), lambda: m.load32(5), lambda: m.store32(-1, 1), lambda: m.store32(6, 1)):\n    try:\n        op()\n    except IndexError:\n        continue\n    raise AssertionError(\"an access outside memory should raise IndexError\")\n"
    },
    {
     "label": "Array indexing by pointer arithmetic",
     "type": "assert",
     "code": "m = Memory(64)\nbase = 16\nfor i, v in enumerate([10, 20, 30, 2**32 - 1]):\n    m.store32(base + 4 * i, v)\nassert [array_get(m, base, i) for i in range(4)] == [10, 20, 30, 2**32 - 1]\n"
    }
   ]
  },
  {
   "id": "first_fit",
   "title": "A first-fit allocator",
   "prompt": "<p>Write a class <code>Allocator</code> that manages a heap of <code>size</code> bytes at addresses 0 to size − 1, like a tiny <code>malloc</code>:</p>\n<ul>\n<li><code>malloc(n)</code> finds the free block with the <em>lowest address</em> that has at least <em>n</em> bytes (first fit), takes the first <em>n</em> bytes of it, and returns their start address. If no free block is big enough, return <code>None</code>. Raise <code>ValueError</code> if n ≤ 0.</li>\n<li><code>free(addr)</code> releases the block that <code>malloc</code> returned at <code>addr</code>, and merges it with free neighbors on either side (<em>coalescing</em>). Freeing an address that isn't the start of an allocated block (including freeing twice) raises <code>ValueError</code>.</li>\n<li><code>free_blocks()</code> returns the free blocks as a sorted list of <code>(start, length)</code> tuples.</li>\n</ul>",
   "starter": "class Allocator:\n    def __init__(self, size):\n        pass\n\n    def malloc(self, n):\n        pass\n\n    def free(self, addr):\n        pass\n\n    def free_blocks(self):\n        pass\n",
   "hint": "<p>Keep a sorted list of free <code>[start, length]</code> blocks and a dict from allocated start to length. In <code>free</code>, insert the block into the free list in order, then merge it with the next block if <code>start + length</code> equals the next start, and with the previous block if the previous block ends at <code>start</code>.</p>",
   "solution": "class Allocator:\n    def __init__(self, size):\n        self._free = [[0, size]] if size > 0 else []\n        self._used = {}\n\n    def malloc(self, n):\n        if n <= 0:\n            raise ValueError(\"size must be positive\")\n        for i, (start, length) in enumerate(self._free):\n            if length >= n:\n                if length == n:\n                    self._free.pop(i)\n                else:\n                    self._free[i] = [start + n, length - n]\n                self._used[start] = n\n                return start\n        return None\n\n    def free(self, addr):\n        if addr not in self._used:\n            raise ValueError(f\"{addr} is not an allocated block\")\n        n = self._used.pop(addr)\n        i = 0\n        while i < len(self._free) and self._free[i][0] < addr:\n            i += 1\n        self._free.insert(i, [addr, n])\n        if i + 1 < len(self._free) and addr + n == self._free[i + 1][0]:\n            self._free[i][1] += self._free.pop(i + 1)[1]\n        if i > 0 and self._free[i - 1][0] + self._free[i - 1][1] == addr:\n            self._free[i - 1][1] += self._free.pop(i)[1]\n\n    def free_blocks(self):\n        return [tuple(b) for b in self._free]\n",
   "tests": [
    {
     "label": "Allocations come from the lowest free address",
     "type": "assert",
     "code": "a = Allocator(100)\nassert a.malloc(10) == 0 and a.malloc(20) == 10 and a.malloc(5) == 30\nassert a.free_blocks() == [(35, 65)], a.free_blocks()\n"
    },
    {
     "label": "Out of memory returns None",
     "type": "assert",
     "code": "a = Allocator(16)\nassert a.malloc(16) == 0 and a.malloc(1) is None\n"
    },
    {
     "label": "Freed space is reused first-fit",
     "type": "assert",
     "code": "a = Allocator(100)\nx, y, z = a.malloc(10), a.malloc(10), a.malloc(10)\na.free(y)\nassert a.malloc(4) == 10, \"the 10-byte hole at 10 is the first that fits\"\nassert a.free_blocks() == [(14, 6), (30, 70)], a.free_blocks()\n"
    },
    {
     "label": "Freeing coalesces neighbors",
     "type": "assert",
     "code": "a = Allocator(30)\nx, y, z = a.malloc(10), a.malloc(10), a.malloc(10)\na.free(x); a.free(z)\nassert a.free_blocks() == [(0, 10), (20, 10)]\na.free(y)\nassert a.free_blocks() == [(0, 30)], f\"all three blocks should merge into one, got {a.free_blocks()}\"\n"
    },
    {
     "label": "Double free and bad free raise ValueError",
     "type": "assert",
     "code": "a = Allocator(20)\np = a.malloc(5)\na.free(p)\nfor bad in (p, 3, 99):\n    try:\n        a.free(bad)\n    except ValueError:\n        continue\n    raise AssertionError(f\"free({bad}) should raise ValueError\")\n"
    },
    {
     "label": "Zero-size request raises ValueError",
     "type": "raises",
     "call": "Allocator(10).malloc(0)",
     "error": "ValueError"
    }
   ]
  }
 ],
 "sy5": [
  {
   "id": "teaching_machine",
   "title": "Simulating the teaching machine",
   "prompt": "<p>Write <code>run(program, regs=None)</code> that simulates the teaching machine from the notes. <code>program</code> is a list of lines. A line may start with one or more labels (<code>loop:</code>), and anything after <code>#</code> is a comment; blank lines are ignored. <code>regs</code> is an optional dict of starting values such as <code>{\"r1\": 3}</code>; other registers start at 0. Run until <code>halt</code> or until execution falls off the end of the program, then return the 8 registers as a list. If more than 100,000 instructions run, raise <code>RuntimeError</code> (the program probably loops forever).</p>",
   "starter": "def run(program, regs=None):\n    pass\n",
   "hint": "<p>First pass: strip comments, peel off labels (record each label's instruction number), and split each remaining instruction into words. Second pass: a <code>while pc &lt; len(code)</code> loop that fetches <code>code[pc]</code>, adds 1 to <code>pc</code>, and executes it; a jump just sets <code>pc</code> to the label's number.</p>",
   "solution": "def run(program, regs=None, limit=100000):\n    lines = [l.split(\"#\")[0].strip() for l in program]\n    labels, code = {}, []\n    for l in lines:\n        if not l:\n            continue\n        while \":\" in l:\n            name, l = l.split(\":\", 1)\n            labels[name.strip()] = len(code)\n            l = l.strip()\n        if l:\n            code.append(l.split())\n    r = [0] * 8\n    for k, v in (regs or {}).items():\n        r[int(k[1:])] = v\n    reg = lambda t: int(t[1:])\n    pc, steps = 0, 0\n    while pc < len(code):\n        steps += 1\n        if steps > limit:\n            raise RuntimeError(\"too many steps\")\n        op, *a = code[pc]\n        pc += 1\n        if op == \"set\": r[reg(a[0])] = int(a[1])\n        elif op == \"mov\": r[reg(a[0])] = r[reg(a[1])]\n        elif op == \"add\": r[reg(a[0])] += r[reg(a[1])]\n        elif op == \"sub\": r[reg(a[0])] -= r[reg(a[1])]\n        elif op == \"mul\": r[reg(a[0])] *= r[reg(a[1])]\n        elif op == \"addi\": r[reg(a[0])] += int(a[1])\n        elif op == \"jmp\": pc = labels[a[0]]\n        elif op == \"jz\":\n            if r[reg(a[0])] == 0: pc = labels[a[1]]\n        elif op == \"jlt\":\n            if r[reg(a[0])] < r[reg(a[1])]: pc = labels[a[2]]\n        elif op == \"halt\": break\n        else: raise ValueError(op)\n    return r\n",
   "tests": [
    {
     "label": "Arithmetic",
     "call": "run([\"set r0 2\", \"set r1 3\", \"mul r0 r1\", \"addi r0 -1\", \"halt\"])[:2]",
     "expect": "[5, 3]"
    },
    {
     "label": "Starting registers",
     "call": "run([\"mov r0 r1\", \"sub r0 r2\"], {\"r1\": 10, \"r2\": 4})[0]",
     "expect": "6"
    },
    {
     "label": "The sum program from the notes",
     "type": "assert",
     "code": "prog = ['        set r0 0          # total',\n        '        set r2 1          # i',\n        'loop:   jlt r1 r2 done    # if n < i, stop',\n        '        add r0 r2',\n        '        addi r2 1',\n        '        jmp loop',\n        'done:   halt']\nassert run(prog, {\"r1\": 100})[0] == 5050\nassert run(prog, {\"r1\": 0})[0] == 0\n"
    },
    {
     "label": "jz and labels on their own line",
     "type": "assert",
     "code": "prog = [\"set r1 4\", \"set r0 1\",\n        \"top:\",\n        \"jz r1 end\", \"set r2 2\", \"mul r0 r2\", \"addi r1 -1\", \"jmp top\",\n        \"end: halt\"]\nassert run(prog)[0] == 16, run(prog)\n"
    },
    {
     "label": "Infinite loops raise RuntimeError",
     "type": "raises",
     "call": "run([\"spin: jmp spin\"])",
     "error": "RuntimeError"
    }
   ]
  },
  {
   "id": "machine_program",
   "title": "Programming the teaching machine",
   "prompt": "<p>Write a teaching-machine program, as a Python list of strings named <code>POWER</code>, that computes r0 = r1<sup>r2</sup> for r1 ≥ 0 and r2 ≥ 0 (with 0<sup>0</sup> = 1), using only the instructions from the notes. The tests run it on a simulator. It must not change r1.</p>",
   "starter": "POWER = [\n    \"halt\",\n]\n",
   "hint": "<p>Start r0 at 1 and copy r2 into a counter register. Loop: if the counter is 0, stop; otherwise multiply r0 by r1 and subtract 1 from the counter.</p>",
   "solution": "POWER = [\n    \"        set r0 1\",\n    \"        mov r3 r2        # counter\",\n    \"loop:   jz r3 done\",\n    \"        mul r0 r1\",\n    \"        addi r3 -1\",\n    \"        jmp loop\",\n    \"done:   halt\",\n]\n",
   "tests": [
    {
     "label": "2 to the 10th",
     "type": "assert",
     "setup": "\n",
     "code": "def run_reference(program, regs=None, limit=100000):\n    lines = [l.split(\"#\")[0].strip() for l in program]\n    labels, code = {}, []\n    for l in lines:\n        if not l:\n            continue\n        while \":\" in l:\n            name, l = l.split(\":\", 1)\n            labels[name.strip()] = len(code)\n            l = l.strip()\n        if l:\n            code.append(l.split())\n    r = [0] * 8\n    for k, v in (regs or {}).items():\n        r[int(k[1:])] = v\n    reg = lambda t: int(t[1:])\n    pc, steps = 0, 0\n    while pc < len(code):\n        steps += 1\n        if steps > limit:\n            raise RuntimeError(\"too many steps\")\n        op, *a = code[pc]\n        pc += 1\n        if op == \"set\": r[reg(a[0])] = int(a[1])\n        elif op == \"mov\": r[reg(a[0])] = r[reg(a[1])]\n        elif op == \"add\": r[reg(a[0])] += r[reg(a[1])]\n        elif op == \"sub\": r[reg(a[0])] -= r[reg(a[1])]\n        elif op == \"mul\": r[reg(a[0])] *= r[reg(a[1])]\n        elif op == \"addi\": r[reg(a[0])] += int(a[1])\n        elif op == \"jmp\": pc = labels[a[0]]\n        elif op == \"jz\":\n            if r[reg(a[0])] == 0: pc = labels[a[1]]\n        elif op == \"jlt\":\n            if r[reg(a[0])] < r[reg(a[1])]: pc = labels[a[2]]\n        elif op == \"halt\": break\n        else: raise ValueError(op)\n    return r\n\nr = run_reference(POWER, {\"r1\": 2, \"r2\": 10})\nassert r[0] == 1024, f\"r0 is {r[0]}\"\nassert r[1] == 2, \"r1 changed\"\n"
    },
    {
     "label": "Zero exponent",
     "type": "assert",
     "code": "def run_reference(program, regs=None, limit=100000):\n    lines = [l.split(\"#\")[0].strip() for l in program]\n    labels, code = {}, []\n    for l in lines:\n        if not l:\n            continue\n        while \":\" in l:\n            name, l = l.split(\":\", 1)\n            labels[name.strip()] = len(code)\n            l = l.strip()\n        if l:\n            code.append(l.split())\n    r = [0] * 8\n    for k, v in (regs or {}).items():\n        r[int(k[1:])] = v\n    reg = lambda t: int(t[1:])\n    pc, steps = 0, 0\n    while pc < len(code):\n        steps += 1\n        if steps > limit:\n            raise RuntimeError(\"too many steps\")\n        op, *a = code[pc]\n        pc += 1\n        if op == \"set\": r[reg(a[0])] = int(a[1])\n        elif op == \"mov\": r[reg(a[0])] = r[reg(a[1])]\n        elif op == \"add\": r[reg(a[0])] += r[reg(a[1])]\n        elif op == \"sub\": r[reg(a[0])] -= r[reg(a[1])]\n        elif op == \"mul\": r[reg(a[0])] *= r[reg(a[1])]\n        elif op == \"addi\": r[reg(a[0])] += int(a[1])\n        elif op == \"jmp\": pc = labels[a[0]]\n        elif op == \"jz\":\n            if r[reg(a[0])] == 0: pc = labels[a[1]]\n        elif op == \"jlt\":\n            if r[reg(a[0])] < r[reg(a[1])]: pc = labels[a[2]]\n        elif op == \"halt\": break\n        else: raise ValueError(op)\n    return r\n\nassert run_reference(POWER, {\"r1\": 7, \"r2\": 0})[0] == 1\nassert run_reference(POWER, {\"r1\": 0, \"r2\": 0})[0] == 1\n"
    },
    {
     "label": "Several cases",
     "type": "assert",
     "code": "def run_reference(program, regs=None, limit=100000):\n    lines = [l.split(\"#\")[0].strip() for l in program]\n    labels, code = {}, []\n    for l in lines:\n        if not l:\n            continue\n        while \":\" in l:\n            name, l = l.split(\":\", 1)\n            labels[name.strip()] = len(code)\n            l = l.strip()\n        if l:\n            code.append(l.split())\n    r = [0] * 8\n    for k, v in (regs or {}).items():\n        r[int(k[1:])] = v\n    reg = lambda t: int(t[1:])\n    pc, steps = 0, 0\n    while pc < len(code):\n        steps += 1\n        if steps > limit:\n            raise RuntimeError(\"too many steps\")\n        op, *a = code[pc]\n        pc += 1\n        if op == \"set\": r[reg(a[0])] = int(a[1])\n        elif op == \"mov\": r[reg(a[0])] = r[reg(a[1])]\n        elif op == \"add\": r[reg(a[0])] += r[reg(a[1])]\n        elif op == \"sub\": r[reg(a[0])] -= r[reg(a[1])]\n        elif op == \"mul\": r[reg(a[0])] *= r[reg(a[1])]\n        elif op == \"addi\": r[reg(a[0])] += int(a[1])\n        elif op == \"jmp\": pc = labels[a[0]]\n        elif op == \"jz\":\n            if r[reg(a[0])] == 0: pc = labels[a[1]]\n        elif op == \"jlt\":\n            if r[reg(a[0])] < r[reg(a[1])]: pc = labels[a[2]]\n        elif op == \"halt\": break\n        else: raise ValueError(op)\n    return r\n\nfor b in range(5):\n    for e in range(6):\n        assert run_reference(POWER, {\"r1\": b, \"r2\": e})[0] == b ** e, (b, e)\n"
    }
   ]
  }
 ],
 "sy6": [
  {
   "id": "machine_calls",
   "title": "A stack for the teaching machine",
   "prompt": "<p>Extend the teaching machine with a stack, so that it can run functions and recursion. Write <code>run_with_stack(program, regs=None)</code> supporting every instruction from the notes plus:</p>\n<ul>\n<li><code>push r1</code>: push r1's value onto the stack; <code>pop r1</code>: pop the top value into r1.</li>\n<li><code>call f</code>: push the return address (the number of the next instruction) and jump to label <code>f</code>; <code>ret</code>: pop an address and jump to it.</li>\n</ul>\n<p>The stack is a Python list. If it would hold more than 1,000 values, raise <code>RecursionError</code> (\"stack overflow\"); popping or returning with an empty stack raises <code>IndexError</code>. As before, more than 100,000 instructions raises <code>RuntimeError</code>, and the function returns the 8 registers.</p>",
   "starter": "def run_with_stack(program, regs=None):\n    pass\n",
   "hint": "<p>Start from your <code>run</code> from Lesson 5. A return address is just an instruction number, so <code>call</code> appends <code>pc</code> (already pointing at the next instruction) and sets <code>pc</code> to the label; <code>ret</code> sets <code>pc = stack.pop()</code>. Check the size limit in <code>push</code> and <code>call</code>.</p>",
   "solution": "def run_with_stack(program, regs=None):\n    labels, code = {}, []\n    for line in program:\n        line = line.split(\"#\")[0].strip()\n        while \":\" in line:\n            name, line = line.split(\":\", 1)\n            labels[name.strip()] = len(code)\n            line = line.strip()\n        if line:\n            code.append(line.split())\n    r = [0] * 8\n    for k, v in (regs or {}).items():\n        r[int(k[1:])] = v\n    reg = lambda t: int(t[1:])\n    stack, pc, steps = [], 0, 0\n\n    def push(v):\n        if len(stack) >= 1000:\n            raise RecursionError(\"stack overflow\")\n        stack.append(v)\n\n    while pc < len(code):\n        steps += 1\n        if steps > 100000:\n            raise RuntimeError(\"too many steps\")\n        op, *a = code[pc]\n        pc += 1\n        if op == \"set\": r[reg(a[0])] = int(a[1])\n        elif op == \"mov\": r[reg(a[0])] = r[reg(a[1])]\n        elif op == \"add\": r[reg(a[0])] += r[reg(a[1])]\n        elif op == \"sub\": r[reg(a[0])] -= r[reg(a[1])]\n        elif op == \"mul\": r[reg(a[0])] *= r[reg(a[1])]\n        elif op == \"addi\": r[reg(a[0])] += int(a[1])\n        elif op == \"jmp\": pc = labels[a[0]]\n        elif op == \"jz\":\n            if r[reg(a[0])] == 0: pc = labels[a[1]]\n        elif op == \"jlt\":\n            if r[reg(a[0])] < r[reg(a[1])]: pc = labels[a[2]]\n        elif op == \"push\": push(r[reg(a[0])])\n        elif op == \"pop\": r[reg(a[0])] = stack.pop()\n        elif op == \"call\":\n            push(pc)\n            pc = labels[a[0]]\n        elif op == \"ret\": pc = stack.pop()\n        elif op == \"halt\": break\n        else: raise ValueError(f\"unknown instruction {op}\")\n    return r\n",
   "tests": [
    {
     "label": "push and pop",
     "call": "run_with_stack([\"set r1 5\", \"set r2 9\", \"push r1\", \"push r2\", \"pop r3\", \"pop r4\", \"halt\"])[3:5]",
     "expect": "[9, 5]"
    },
    {
     "label": "call and ret",
     "type": "assert",
     "code": "prog = [\"set r1 3\",\n        \"call double\",\n        \"call double\",\n        \"halt\",\n        \"double: add r1 r1\",\n        \"ret\"]\nassert run_with_stack(prog)[1] == 12\n"
    },
    {
     "label": "Recursive factorial",
     "type": "assert",
     "code": "prog = [\"        call fact\",\n        \"        halt\",\n        \"fact:   set r2 2\",\n        \"        jlt r1 r2 base     # n < 2: return 1\",\n        \"        push r1\",\n        \"        addi r1 -1\",\n        \"        call fact          # r0 = fact(n - 1)\",\n        \"        pop r1\",\n        \"        mul r0 r1\",\n        \"        ret\",\n        \"base:   set r0 1\",\n        \"        ret\"]\nassert run_with_stack(prog, {\"r1\": 6})[0] == 720\nassert run_with_stack(prog, {\"r1\": 1})[0] == 1\n"
    },
    {
     "label": "Unbounded recursion overflows",
     "type": "raises",
     "call": "run_with_stack([\"f: call f\"])",
     "error": "RecursionError"
    },
    {
     "label": "ret with an empty stack raises IndexError",
     "type": "raises",
     "call": "run_with_stack([\"ret\"])",
     "error": "IndexError"
    }
   ]
  },
  {
   "id": "frame_sizes",
   "title": "How deep can recursion go?",
   "prompt": "<p>A program's stack holds frames for a chain of nested calls. Write <code>max_depth(stack_bytes, frame_bytes)</code> that returns how many nested calls fit, given the stack size and the size of one frame (both positive integers). Then write <code>stack_needed(calls)</code>: <code>calls</code> is a list of frame sizes, one per call in a chain (the first is <code>main</code>), and the function returns the total bytes, where each frame is first rounded <em>up</em> to a multiple of 16 bytes.</p>\n<p>Why 16? x86-64 keeps the stack <em>16-byte aligned</em>: at every <code>call</code>, the stack pointer must hold an address that is a multiple of 16, because some instructions that move large values to and from memory need such addresses. So compilers pad each frame to a multiple of 16 bytes. In <code>stack_needed</code> you do that padding yourself. In <code>max_depth</code>, <code>frame_bytes</code> is already the full, padded size of a frame, so don't round it: just count how many whole frames fit in <code>stack_bytes</code>.</p>",
   "starter": "def max_depth(stack_bytes, frame_bytes):\n    pass\n\ndef stack_needed(calls):\n    pass\n",
   "hint": "<p>Integer division gives whole frames. To round <em>n</em> up to a multiple of 16, use <code>(n + 15) // 16 * 16</code>.</p>",
   "solution": "def max_depth(stack_bytes, frame_bytes):\n    return stack_bytes // frame_bytes\n\ndef stack_needed(calls):\n    return sum((n + 15) // 16 * 16 for n in calls)\n",
   "tests": [
    {
     "label": "8 MB stack, 32-byte frames",
     "call": "max_depth(8 * 2**20, 32)",
     "expect": "262144"
    },
    {
     "label": "Frames that don't divide evenly",
     "call": "max_depth(100, 30)",
     "expect": "3"
    },
    {
     "label": "Rounding to 16 bytes",
     "call": "stack_needed([48, 20, 17, 16, 1])",
     "expect": "48 + 32 + 32 + 16 + 16"
    },
    {
     "label": "No calls",
     "call": "stack_needed([])",
     "expect": "0"
    }
   ]
  }
 ],
 "sy7": [
  {
   "id": "direct_mapped",
   "title": "A direct-mapped cache simulator",
   "prompt": "<p>Write a class <code>DirectMappedCache(num_lines, line_size)</code> (both powers of 2). <code>access(addr)</code> simulates reading the byte at <code>addr</code>: it returns <code>\"hit\"</code> if the line containing <code>addr</code> is in its slot, and otherwise <code>\"miss\"</code>, after placing that line in the slot (evicting whatever was there). Keep counts in <code>hits</code> and <code>misses</code>.</p>\n<p>The line number is <code>addr // line_size</code>, the slot is <code>line % num_lines</code>, and the tag is <code>line // num_lines</code>. The cache starts empty.</p>",
   "starter": "class DirectMappedCache:\n    def __init__(self, num_lines, line_size):\n        self.hits = 0\n        self.misses = 0\n\n    def access(self, addr):\n        pass\n",
   "hint": "<p>Store one tag per slot in a list, with <code>None</code> for an empty slot. A hit means <code>tags[slot] == tag</code>.</p>",
   "solution": "class DirectMappedCache:\n    def __init__(self, num_lines, line_size):\n        self.num_lines, self.line_size = num_lines, line_size\n        self.tags = [None] * num_lines\n        self.hits = 0\n        self.misses = 0\n\n    def access(self, addr):\n        line = addr // self.line_size\n        slot, tag = line % self.num_lines, line // self.num_lines\n        if self.tags[slot] == tag:\n            self.hits += 1\n            return \"hit\"\n        self.tags[slot] = tag\n        self.misses += 1\n        return \"miss\"\n",
   "tests": [
    {
     "label": "The worked example",
     "type": "assert",
     "code": "c = DirectMappedCache(4, 16)\ngot = [c.access(a) for a in [0, 4, 64, 0, 20]]\nassert got == [\"miss\", \"hit\", \"miss\", \"miss\", \"miss\"], got\nassert (c.hits, c.misses) == (1, 4)\n"
    },
    {
     "label": "Sequential access misses once per line",
     "type": "assert",
     "code": "c = DirectMappedCache(64, 64)\nfor a in range(0, 4096, 4):          # 1,024 four-byte ints\n    c.access(a)\nassert c.misses == 64 and c.hits == 960, (c.hits, c.misses)\n"
    },
    {
     "label": "Row order beats column order",
     "type": "assert",
     "code": "def run(order):\n    c = DirectMappedCache(256, 64)\n    n = 256\n    for i in range(n):\n        for j in range(n):\n            r, col = (i, j) if order == \"rows\" else (j, i)\n            c.access((r * n + col) * 4)\n    return c.misses\nrows, cols = run(\"rows\"), run(\"cols\")\nassert rows == 4096 and cols == 65536, (rows, cols)\n"
    }
   ]
  },
  {
   "id": "lru_cache_sim",
   "title": "A set-associative LRU cache",
   "prompt": "<p>Write a class <code>SetAssociativeCache(num_sets, ways, line_size)</code>. Each memory line maps to set <code>line % num_sets</code> and can occupy any of that set's <code>ways</code> slots. <code>access(addr)</code> returns <code>\"hit\"</code> or <code>\"miss\"</code>; on a miss in a full set, evict the <strong>least recently used</strong> line of that set (the one accessed longest ago). Keep <code>hits</code> and <code>misses</code> counts.</p>",
   "starter": "class SetAssociativeCache:\n    def __init__(self, num_sets, ways, line_size):\n        self.hits = 0\n        self.misses = 0\n\n    def access(self, addr):\n        pass\n",
   "hint": "<p>Keep each set as a list of tags ordered from least to most recently used. On a hit, move the tag to the end. On a miss, append it, and if the list is now longer than <code>ways</code>, remove the first item.</p>",
   "solution": "class SetAssociativeCache:\n    def __init__(self, num_sets, ways, line_size):\n        self.num_sets, self.ways, self.line_size = num_sets, ways, line_size\n        self.sets = [[] for _ in range(num_sets)]\n        self.hits = 0\n        self.misses = 0\n\n    def access(self, addr):\n        line = addr // self.line_size\n        s, tag = self.sets[line % self.num_sets], line // self.num_sets\n        if tag in s:\n            s.remove(tag)\n            s.append(tag)\n            self.hits += 1\n            return \"hit\"\n        s.append(tag)\n        if len(s) > self.ways:\n            s.pop(0)\n        self.misses += 1\n        return \"miss\"\n",
   "tests": [
    {
     "label": "Two-way set removes the conflict miss",
     "type": "assert",
     "code": "c = SetAssociativeCache(2, 2, 16)\ngot = [c.access(a) for a in [0, 64, 0, 64]]\nassert got == [\"miss\", \"miss\", \"hit\", \"hit\"], got\n"
    },
    {
     "label": "Least recently used is evicted",
     "type": "assert",
     "code": "c = SetAssociativeCache(1, 2, 16)      # one set, two ways\nfor a in [0, 16, 0, 32]:               # lines 0, 1, 0, 2: line 1 is least recent\n    c.access(a)\nassert c.access(0) == \"hit\", \"line 0 was used recently and should still be cached\"\nassert c.access(16) == \"miss\", \"line 1 should have been evicted\"\n"
    },
    {
     "label": "Counts",
     "type": "assert",
     "code": "c = SetAssociativeCache(4, 2, 64)\nfor a in range(0, 1024, 8):\n    c.access(a)\nassert (c.hits, c.misses) == (112, 16), (c.hits, c.misses)\n"
    },
    {
     "label": "Equal to direct-mapped when ways is 1",
     "type": "assert",
     "hidden": true,
     "code": "import random\nrandom.seed(4)\naddrs = [random.randrange(4096) for _ in range(2000)]\nc1 = SetAssociativeCache(8, 1, 32)\nout = [c1.access(a) for a in addrs]\ntags = [None] * 8\nwant = []\nfor a in addrs:\n    line = a // 32\n    if tags[line % 8] == line // 8:\n        want.append(\"hit\")\n    else:\n        tags[line % 8] = line // 8\n        want.append(\"miss\")\nassert out == want\n"
    }
   ]
  }
 ],
 "sy8": [
  {
   "id": "linker",
   "title": "Resolving symbols like a linker",
   "prompt": "<p>Model object files as dicts: <code>{\"name\": \"main.o\", \"defines\": [\"main\"], \"uses\": [\"printf\", \"average\"]}</code>. Write <code>link(objects)</code> that returns a dict mapping every <em>used</em> symbol to the name of the object file that defines it. Raise <code>LookupError</code> with a message containing <code>undefined reference</code> and the symbol if a used symbol is defined nowhere, and <code>ValueError</code> with a message containing <code>multiple definition</code> and the symbol if two objects define the same symbol. (Check for multiple definitions first.)</p>",
   "starter": "def link(objects):\n    pass\n",
   "hint": "<p>First build a dict from each defined symbol to its object's name, raising on duplicates. Then go through every object's uses and look each one up.</p>",
   "solution": "def link(objects):\n    where = {}\n    for obj in objects:\n        for sym in obj[\"defines\"]:\n            if sym in where:\n                raise ValueError(f\"multiple definition of '{sym}' in {where[sym]} and {obj['name']}\")\n            where[sym] = obj[\"name\"]\n    resolved = {}\n    for obj in objects:\n        for sym in obj[\"uses\"]:\n            if sym not in where:\n                raise LookupError(f\"{obj['name']}: undefined reference to '{sym}'\")\n            resolved[sym] = where[sym]\n    return resolved\n",
   "tests": [
    {
     "label": "Two files and a library",
     "type": "assert",
     "code": "objs = [{\"name\": \"main.o\", \"defines\": [\"main\"], \"uses\": [\"printf\", \"average\"]},\n        {\"name\": \"stats.o\", \"defines\": [\"average\"], \"uses\": []},\n        {\"name\": \"libc.so\", \"defines\": [\"printf\", \"malloc\"], \"uses\": []}]\nassert link(objs) == {\"printf\": \"libc.so\", \"average\": \"stats.o\"}, link(objs)\n"
    },
    {
     "label": "Undefined reference",
     "type": "assert",
     "code": "try:\n    link([{\"name\": \"main.o\", \"defines\": [\"main\"], \"uses\": [\"average\"]}])\nexcept LookupError as e:\n    assert \"undefined reference\" in str(e) and \"average\" in str(e), str(e)\nelse:\n    raise AssertionError(\"expected LookupError\")\n"
    },
    {
     "label": "Multiple definition",
     "type": "assert",
     "code": "try:\n    link([{\"name\": \"a.o\", \"defines\": [\"helper\"], \"uses\": []},\n          {\"name\": \"b.o\", \"defines\": [\"helper\"], \"uses\": [\"helper\"]}])\nexcept ValueError as e:\n    assert \"multiple definition\" in str(e) and \"helper\" in str(e), str(e)\nelse:\n    raise AssertionError(\"expected ValueError\")\n"
    },
    {
     "label": "Nothing used",
     "call": "link([{\"name\": \"a.o\", \"defines\": [\"main\"], \"uses\": []}])",
     "expect": "{}"
    }
   ]
  },
  {
   "id": "fd_table",
   "title": "A file descriptor table",
   "prompt": "<p>Write a class <code>FdTable</code> that models a process's file descriptors. It starts with 0, 1 and 2 open, referring to <code>\"stdin\"</code>, <code>\"stdout\"</code> and <code>\"stderr\"</code>.</p>\n<ul>\n<li><code>open(name)</code> returns the <em>lowest</em> unused descriptor number and records that it refers to <code>name</code> (as Unix does).</li>\n<li><code>close(fd)</code> frees it; closing a descriptor that isn't open raises <code>OSError</code>.</li>\n<li><code>dup2(old, new)</code> makes <code>new</code> refer to the same file as <code>old</code>, closing <code>new</code> first if it was open, and returns <code>new</code>; if <code>old</code> isn't open, raise <code>OSError</code>. This is how a shell redirects output: <code>dup2(fd_of_out_txt, 1)</code>.</li>\n<li><code>target(fd)</code> returns the name a descriptor refers to (<code>OSError</code> if it isn't open).</li>\n</ul>",
   "starter": "class FdTable:\n    def __init__(self):\n        pass\n\n    def open(self, name):\n        pass\n\n    def close(self, fd):\n        pass\n\n    def dup2(self, old, new):\n        pass\n\n    def target(self, fd):\n        pass\n",
   "hint": "<p>A dict from descriptor number to name works. For <code>open</code>, count up from 0 until you find a number not in the dict.</p>",
   "solution": "class FdTable:\n    def __init__(self):\n        self._fds = {0: \"stdin\", 1: \"stdout\", 2: \"stderr\"}\n\n    def open(self, name):\n        fd = 0\n        while fd in self._fds:\n            fd += 1\n        self._fds[fd] = name\n        return fd\n\n    def close(self, fd):\n        if fd not in self._fds:\n            raise OSError(f\"bad file descriptor {fd}\")\n        del self._fds[fd]\n\n    def dup2(self, old, new):\n        if old not in self._fds:\n            raise OSError(f\"bad file descriptor {old}\")\n        self._fds[new] = self._fds[old]\n        return new\n\n    def target(self, fd):\n        if fd not in self._fds:\n            raise OSError(f\"bad file descriptor {fd}\")\n        return self._fds[fd]\n",
   "tests": [
    {
     "label": "Starts with 0, 1, 2; open uses 3",
     "type": "assert",
     "code": "t = FdTable()\nassert [t.target(i) for i in range(3)] == [\"stdin\", \"stdout\", \"stderr\"]\nassert t.open(\"a.txt\") == 3 and t.open(\"b.txt\") == 4\n"
    },
    {
     "label": "Lowest free descriptor is reused",
     "type": "assert",
     "code": "t = FdTable()\nt.open(\"a\"); t.open(\"b\"); t.open(\"c\")      # 3, 4, 5\nt.close(4)\nassert t.open(\"d\") == 4\nt.close(0)\nassert t.open(\"e\") == 0, \"closing stdin frees descriptor 0\"\n"
    },
    {
     "label": "Redirecting standard output",
     "type": "assert",
     "code": "t = FdTable()\nfd = t.open(\"out.txt\")\nassert t.dup2(fd, 1) == 1\nt.close(fd)\nassert t.target(1) == \"out.txt\", t.target(1)\n"
    },
    {
     "label": "Errors raise OSError",
     "type": "assert",
     "code": "t = FdTable()\nfor op in (lambda: t.close(7), lambda: t.dup2(9, 1), lambda: t.target(5)):\n    try:\n        op()\n    except OSError:\n        continue\n    raise AssertionError(\"expected OSError\")\n"
    }
   ]
  }
 ]
});
