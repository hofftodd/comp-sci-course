CSA.addCourse({
  id: "cs210",
  code: "CS 210",
  title: "Computer Systems I",
  credits: 4,
  kind: "required",
  term: "y2f",
  summary: "What happens beneath a program: how integers and decimals are stored as bits, the C language and its pointers, how the processor runs machine code, how function calls use the stack, why memory access patterns decide speed, and how programs are linked and run as processes. Taught through C, with every idea also simulated in Python.",
  prereqs: ["CS 102 Programming II", "MATH 120 Discrete Mathematics I"],
  outcomes: [
    "Represent integers in unsigned and two's complement form, predict overflow, and manipulate bits",
    "Explain IEEE 754 floating point and its rounding behavior",
    "Write, compile and debug small C programs using pointers, arrays and dynamic memory",
    "Read simple x86-64 assembly and explain how C constructs and function calls become machine code",
    "Explain the memory hierarchy and write cache-friendly code",
    "Describe compilation, linking, processes and system calls"
  ],
  rubric: {
    criteriaFor: "labs and problem sets",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 20, desc: "The lesson's programming problems, plus short written exercises on representations and machine code." },
      { name: "Labs", weight: 35, desc: "Five C labs: a bit-manipulation puzzle set, a string library, a memory allocator, a defusing exercise that requires reading assembly in a debugger, and a cache-friendly matrix transpose. Each lab is graded by tests and a short written explanation." },
      { name: "Midterm exam", weight: 15, desc: "Integers, floating point, C and pointers (lessons 1–4)." },
      { name: "Final exam", weight: 20, desc: "Cumulative, with emphasis on machine code, the stack, caches and linking (lessons 5–8)." }
    ],
    criteria: [
      { name: "Correctness", desc: "Does it work, including at the edges?", levels: [
        "Correct for all inputs, including boundary values (0, the largest and smallest integers, empty strings); no memory errors under AddressSanitizer.",
        "Correct for typical inputs; an edge case is missed.",
        "Works only for some inputs, or has memory errors.",
        "Does not compile or run." ] },
      { name: "Memory safety", desc: "Is every byte accounted for?", levels: [
        "Every allocation is freed exactly once; no out-of-bounds access; sizes are checked.",
        "One leak or missing check in an unusual path.",
        "Several leaks or unchecked sizes.",
        "Frequent crashes or corruption." ] },
      { name: "Explanation", desc: "Can you say why it works?", levels: [
        "Explains the representation or machine-level behavior precisely, with evidence (output, a debugger session, measurements).",
        "Mostly correct explanation with a gap.",
        "Describes what the code does without why.",
        "No explanation." ] },
      { name: "Style", desc: "Can another person read it?", levels: [
        "Compiles with no warnings under -Wall -Wextra; clear names; comments explain intent.",
        "A few warnings or unclear names.",
        "Many warnings; hard to follow.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Tools:</b> labs are done on Linux with GCC (or Clang). On Windows use WSL; on a Mac, Clang from the Xcode command-line tools works for everything except the assembly lab, which runs on the course's Linux server.",
      "<b>Collaboration:</b> discuss ideas freely; write your own code, and name the people you discussed it with.",
      "<b>AI assistants:</b> you may use them to explain error messages and concepts, and must say how. You must be able to explain every line you submit; labs include short oral checks.",
      "<b>Late work:</b> each student has four late days for labs, used in whole days. After that, labs lose 10% a day."
    ]
  },
  units: [
    {
      id: "sy1",
      title: "Bits, bytes and integers",
      minutes: 90,
      summary: "How whole numbers are stored in a fixed number of bits: hexadecimal, unsigned integers, two's complement, overflow, and the bitwise operators that let programs work on individual bits.",
      notes: `
<p>CS 101 showed that a computer stores everything in binary, and that Python's integers can be as large as you like. Python hides a fact that most of the computing world can't: at the hardware level, a number lives in a fixed number of bits, usually 8, 16, 32 or 64. This lesson is about what fixed width means, and the surprises it causes.</p>

<h3>Bits, bytes and hexadecimal</h3>
<p>A <strong>bit</strong> is a 0 or a 1; a <strong>byte</strong> is 8 bits, the smallest unit of memory that has its own address. Long binary numbers are hard to read, so programmers write them in <strong>hexadecimal</strong> (base 16), with digits 0–9 and A–F (A = 10, …, F = 15). Each hex digit stands for exactly 4 bits, so converting is a matter of grouping:</p>
<pre data-label="Example"><code>binary   1101 0110 0011 1111
hex         D    6    3    F      written 0xD63F</code></pre>
<p>The prefix <code>0x</code> marks a hex number, both in C and in Python: <code>0xFF</code> is 255, one byte of all ones. Python's <code>hex()</code> and <code>bin()</code> convert for you: <code>hex(255)</code> is <code>'0xff'</code>.</p>

<h3>Unsigned integers</h3>
<p>With <em>w</em> bits <em>b</em><sub><em>w</em>−1</sub> … <em>b</em><sub>1</sub><em>b</em><sub>0</sub>, the <strong>unsigned</strong> interpretation is the ordinary binary value</p>
<p class="math">b<sub>w−1</sub>·2<sup>w−1</sup> + … + b<sub>1</sub>·2 + b<sub>0</sub></p>
<p>which ranges from 0 to 2<sup><em>w</em></sup> − 1. For 8 bits, 0 to 255; for 32 bits, 0 to 4,294,967,295; for 64 bits, about 1.8 × 10<sup>19</sup>.</p>

<h3>Two's complement</h3>
<p>To store negative numbers, nearly every computer uses <strong>two's complement</strong>. The rule is one change to the unsigned formula: the top bit counts <em>negatively</em>.</p>
<p class="math">value = −b<sub>w−1</sub>·2<sup>w−1</sup> + b<sub>w−2</sub>·2<sup>w−2</sup> + … + b<sub>0</sub></p>
<p>With 8 bits, <code>00000101</code> is 5, <code>10000000</code> is −128, and <code>11111111</code> is −128 + 127 = −1. The range is −2<sup><em>w</em>−1</sup> to 2<sup><em>w</em>−1</sup> − 1: for 8 bits, −128 to 127; for 32 bits, −2,147,483,648 to 2,147,483,647. There is one more negative number than positive, because zero takes one of the non-negative patterns. The top bit tells you the sign (1 means negative), but it is not a "sign bit" with the rest giving the size: −1 is all ones, not a 1 followed by 0000001.</p>
<p>To <strong>negate</strong> a two's complement number, invert every bit and add 1. For 5 = <code>00000101</code>: invert to <code>11111010</code>, add 1 to get <code>11111011</code>, which is −128 + 64 + 32 + 16 + 8 + 2 + 1 = −5. (Why it works: <em>x</em> plus its inversion is all ones, which is −1, so the inversion is −1 − <em>x</em>, and adding 1 gives −<em>x</em>.)</p>
<p>Why this scheme? Because the same addition circuit works for signed and unsigned numbers. Adding the bit patterns and throwing away any carry out of the top bit gives the right answer in both interpretations, as long as the true answer fits. Hardware designers need only one adder.</p>

<h3>Overflow</h3>
<p>When the true result doesn't fit in <em>w</em> bits, the extra high bits are thrown away: arithmetic happens <strong>modulo 2<sup><em>w</em></sup></strong> (the "clock arithmetic" of MATH 121 Lesson 4). This is <strong>overflow</strong>. With 8-bit two's complement, 127 + 1 has pattern <code>10000000</code>, which is −128. The C language lets us see it (CS 210's C is introduced properly in Lesson 3; for now, read the comments):</p>
<pre data-label="C"><code>#include &lt;stdio.h&gt;
#include &lt;stdint.h&gt;

int main(void) {
    int8_t a = 127;                  /* an 8-bit signed integer */
    a = a + 1;                       /* 128 as an int, stored back in 8 bits */
    printf("%d\\n", a);              /* -128 */
    unsigned int u = 0;
    u = u - 1;
    printf("%u\\n", u);              /* 4294967295 */
    printf("%d\\n", -1 &lt; 0u);        /* 0: -1 becomes 4294967295 */
    return 0;
}</code></pre>
<p>The last line shows a classic trap. The <code>u</code> at the end of <code>0u</code> makes the constant <em>unsigned</em>: <code>0u</code> is the number 0 with type <code>unsigned int</code>, while plain <code>0</code> is a signed <code>int</code>. When C compares a signed and an unsigned integer, it converts the signed one to unsigned, so −1 becomes 4,294,967,295 and "−1 &lt; 0" is false. In C, overflow of <em>unsigned</em> arithmetic is defined to wrap around; overflow of <em>signed</em> arithmetic is undefined behavior (CS 101's sidebar on integers), which compilers may assume never happens.</p>
<p>So why is the first example, which seems to overflow a signed number, safe to show? Because no signed arithmetic overflows in it. C never does arithmetic on types narrower than <code>int</code>: in <code>a + 1</code>, the 8-bit <code>a</code> is first converted to an <code>int</code> (this is called <em>integer promotion</em>), and the sum is the <code>int</code> 128, which fits easily. The overflow happens only when <code>a = …</code> stores 128 back into an <code>int8_t</code>, which can't hold it. That is a <em>conversion</em>, not arithmetic, and the C standard makes its result <em>implementation-defined</em>: each compiler must pick a result and document it. GCC, Clang and other common compilers keep the low 8 bits, which gives −128. Arithmetic that overflows in the <code>int</code> type itself, such as adding 1 to an <code>int</code> holding 2,147,483,647, is different: that is undefined behavior, and no result is promised.</p>
<p>Overflow causes real failures. In 1996 the first Ariane 5 rocket self-destructed 37 seconds after launch when a 64-bit floating-point value was converted to a 16-bit signed integer that couldn't hold it (CS 101's optional ethics lesson tells the story). In 2014, the YouTube view counter for the music video "Gangnam Style" approached 2<sup>31</sup> − 1 = 2,147,483,647, the limit of a signed 32-bit integer; YouTube switched to 64-bit counters. And many systems count time as signed 32-bit seconds since 1 January 1970, which overflows at 03:14:07 UTC on 19 January 2038, the "Year 2038 problem".</p>

<h3>Simulating fixed width in Python</h3>
<p>Python's integers never overflow, but we can simulate <em>w</em>-bit arithmetic by keeping only the low <em>w</em> bits, then reading the pattern as signed if needed. The function below uses two operators that the next section explains in full. <code>1 &lt;&lt; w</code> ("shift 1 left by <em>w</em> places") is 2<sup><em>w</em></sup>, so <code>(1 &lt;&lt; w) - 1</code> is <em>w</em> ones in binary. And <code>x &amp; m</code> keeps exactly the bits of <em>x</em> where <em>m</em> has a 1. Together, <code>x &amp; ((1 &lt;&lt; w) - 1)</code> keeps the low <em>w</em> bits of <em>x</em>, which is <em>x</em> mod 2<sup><em>w</em></sup>.</p>
<pre><code>def wrap(x, w):
    """The w-bit two's complement value with the same low w bits as x."""
    x &amp;= (1 &lt;&lt; w) - 1                 # keep the low w bits (unsigned value)
    if x &gt;= 1 &lt;&lt; (w - 1):              # top bit set: it's negative
        x -= 1 &lt;&lt; w
    return x

print(wrap(127 + 1, 8))      # -128
print(wrap(-1, 8) &amp; 0xFF)    # 255: the bit pattern of -1 is all ones
print(wrap(2**31, 32))       # -2147483648</code></pre>

<h3>Bitwise operators</h3>
<p>Programs often treat an integer as a row of individual bits: flags, permissions, masks, compact sets. Python and C share the operators:</p>
<table>
<thead><tr><th>Operator</th><th>Meaning</th><th>Example (8-bit)</th></tr></thead>
<tbody>
<tr><td><code>a &amp; b</code></td><td>AND: 1 where both are 1</td><td><code>11110000 &amp; 00111100 = 00110000</code></td></tr>
<tr><td><code>a | b</code></td><td>OR: 1 where either is 1</td><td><code>11110000 | 00111100 = 11111100</code></td></tr>
<tr><td><code>a ^ b</code></td><td>XOR: 1 where they differ</td><td><code>11110000 ^ 00111100 = 11001100</code></td></tr>
<tr><td><code>~a</code></td><td>NOT: invert every bit</td><td><code>~11110000 = 00001111</code></td></tr>
<tr><td><code>a &lt;&lt; k</code></td><td>shift left by k (multiply by 2<sup>k</sup>, dropping overflow)</td><td><code>00000011 &lt;&lt; 2 = 00001100</code></td></tr>
<tr><td><code>a &gt;&gt; k</code></td><td>shift right by k (divide by 2<sup>k</sup>, rounding down)</td><td><code>00001100 &gt;&gt; 2 = 00000011</code></td></tr>
</tbody>
</table>
<p>A <strong>mask</strong> picks out bits. To test bit <em>i</em>: <code>(x &gt;&gt; i) &amp; 1</code>. To set it: <code>x | (1 &lt;&lt; i)</code>. To clear it: <code>x &amp; ~(1 &lt;&lt; i)</code>. To flip it: <code>x ^ (1 &lt;&lt; i)</code>. Unix file permissions are a well-known example: <code>chmod 754</code> sets three 3-bit groups (read = 4, write = 2, execute = 1) for the owner, group and everyone else. The number 754 is written in <strong>octal</strong> (base 8), not decimal: each octal digit, 0 to 7, is exactly three bits, so the digits are read one at a time. 7 = <code>111</code> gives the owner read, write and execute; 5 = <code>101</code> gives the group read and execute; 4 = <code>100</code> gives everyone else read only. (As a single number, octal 754 is 7 × 64 + 5 × 8 + 4 = 492 in decimal.)</p>
<p>Two details differ between languages. Right-shifting a negative number in Python (and on nearly all C compilers) is an <strong>arithmetic shift</strong> that copies the sign bit in from the left, so <code>-8 &gt;&gt; 1</code> is −4; an unsigned right shift in C is a <strong>logical shift</strong> that brings in zeros. And because Python integers have no fixed width, <code>~x</code> is −<em>x</em> − 1: the infinite two's complement pattern with every bit flipped. Mask with <code>&amp; 0xFF</code> (or the right width) to see the bits you mean.</p>
<p>Some useful tricks follow from the arithmetic. <code>x &amp; (x - 1)</code> clears the lowest 1 bit (subtracting 1 turns the lowest 1 into 0 and the 0s below it into 1s). So a positive <em>x</em> is a power of two exactly when <code>x &amp; (x - 1) == 0</code>, and repeating the trick until <em>x</em> is 0 counts the 1 bits.</p>

<h3>Byte order</h3>
<p>A 32-bit integer takes 4 bytes in memory. In which order? <strong>Little-endian</strong> machines (x86 and, in practice, ARM) store the least significant byte at the lowest address; <strong>big-endian</strong> ones store the most significant byte first, which is also the standard order for numbers sent over networks. The value 0x12345678 is stored as the bytes 78 56 34 12 on a little-endian machine. Byte order matters when data moves between machines or files, and when you look at raw memory in a debugger. Python can show both: <code>(0x12345678).to_bytes(4, "little")</code> is <code>b'xV4\\x12'</code> (the bytes 0x78, 0x56, 0x34, 0x12; Python prints bytes that are printable letters as letters).</p>
`,
      terms: [
        ["Hexadecimal", "Base 16, with digits 0–9 and A–F; each hex digit stands for exactly 4 bits."],
        ["Unsigned integer", "A w-bit pattern read as ordinary binary, from 0 to 2^w − 1."],
        ["Two's complement", "The standard signed representation: the top bit counts as −2^(w−1); range −2^(w−1) to 2^(w−1) − 1."],
        ["Overflow", "A result too large or too small for the bits available; fixed-width arithmetic wraps around modulo 2^w."],
        ["Mask", "A bit pattern used with &, | or ^ to select, set, clear or flip particular bits."],
        ["Arithmetic and logical shift", "Right shifts that fill from the left with copies of the sign bit, or with zeros."],
        ["Endianness", "The order of a multi-byte value's bytes in memory: little-endian puts the least significant byte first."]
      ],
      quiz: [
        { q: "What is 0x2F in decimal?", choices: ["29", "47", "215", "32"], answer: 1, why: "2 × 16 + 15 = 47." },
        { q: "What value does the 8-bit two's complement pattern 11111110 represent?", choices: ["254", "−2", "−126", "−1"], answer: 1, why: "−128 + 64 + 32 + 16 + 8 + 4 + 2 = −2." },
        { q: "In C, what is printed by printf(\"%d\", -1 &lt; 0u)?", choices: ["1", "0", "-1", "It doesn't compile"], answer: 1, why: "−1 is converted to unsigned (4,294,967,295) before the comparison." },
        { q: "Which expression clears bit 3 of x?", choices: ["x | (1 &lt;&lt; 3)", "x ^ 3", "x &amp; ~(1 &lt;&lt; 3)", "x &gt;&gt; 3"], answer: 2, why: "~(1 &lt;&lt; 3) has every bit set except bit 3; AND keeps all other bits." },
        { q: "How is 0x0A0B0C0D stored on a little-endian machine, lowest address first?", choices: ["0A 0B 0C 0D", "0D 0C 0B 0A", "0B 0A 0D 0C", "D0 C0 B0 A0"], answer: 1, why: "Least significant byte first." }
      ],
      practice: [
        {
          q: `<p>Write −20 as an 8-bit two's complement pattern, in binary and hex. Check your answer with the <code>wrap</code> function or <code>(-20) &amp; 0xFF</code>.</p>`,
          a: `<p>20 = <code>00010100</code>; invert to <code>11101011</code>; add 1: <code>11101100</code> = 0xEC. Check: −128 + 64 + 32 + 8 + 4 = −20, and <code>(-20) &amp; 0xFF</code> is 236 = 0xEC.</p>`
        },
        {
          q: `<p>With 8-bit two's complement, compute 100 + 50 and −100 + (−50). What does the hardware produce in each case, and how could it detect that overflow happened from the signs alone?</p>`,
          a: `<p>150 doesn't fit: the pattern is <code>10010110</code> = −106. −150 doesn't fit either: <code>01101010</code> = 106. Overflow happened exactly when two numbers of the same sign produce a result of the other sign. Adding numbers of different signs can never overflow.</p>`
        },
        {
          q: `<p>Explain why <code>x &amp; (x - 1)</code> clears the lowest 1 bit, using <em>x</em> = 0b10110100 as an example. Then use it to write <code>count_ones(x)</code> for non-negative <em>x</em>. How many loop passes does it take?</p>`,
          a: `<p><em>x</em> − 1 = 0b10110011: the lowest 1 (bit 2) became 0 and the zeros below became ones. ANDing with <em>x</em> keeps the higher bits and zeros out bit 2 and below: 0b10110000.</p><pre><code>def count_ones(x):
    count = 0
    while x:
        x &amp;= x - 1
        count += 1
    return count</code></pre><p>One pass per 1 bit, not per bit position.</p>`
        },
        {
          q: `<p>The signed 32-bit seconds counter used by many systems overflows in 2038. Using Python, find the date: <code>datetime.datetime.fromtimestamp(2**31 - 1, datetime.timezone.utc)</code>. What date does the counter jump to after overflowing?</p>`,
          a: `<p>2038-01-19 03:14:07 UTC. One second later the counter wraps to −2<sup>31</sup>, which is 2<sup>31</sup> seconds <em>before</em> 1970: 13 December 1901, 20:45:52 UTC (<code>fromtimestamp(-2**31, timezone.utc)</code>).</p>`
        }
      ],
      sources: ["csapp", "cppref"]
    },
    {
      id: "sy2",
      title: "Floating point",
      minutes: 90,
      summary: "How IEEE 754 stores real numbers as a sign, an exponent and a fraction; normal and subnormal numbers, infinities and NaN; rounding; and the practical consequences for comparisons and sums.",
      notes: `
<p>CS 101 showed that <code>0.1 + 0.2</code> isn't exactly 0.3 and that floats keep about 16 significant digits. This lesson opens the box: the exact format of a <code>float</code>, and why its behavior follows from that format.</p>

<h3>Scientific notation in binary</h3>
<p>Decimal scientific notation writes 6,022 as 6.022 × 10<sup>3</sup>: a sign, a significand with one digit before the point, and an exponent. <strong>Floating point</strong> does the same in base 2. Every nonzero number can be written as</p>
<p class="math">(−1)<sup>s</sup> × 1.f × 2<sup>E</sup></p>
<p>where 1.<em>f</em> is a binary number between 1 and 2.</p>
<p>Binary digits after the point work like decimal ones, but each place is worth half the one before: ½, ¼, ⅛, and so on. So 0.1 in binary is ½, 0.01 is ¼, and 110.1 in binary is 4 + 2 + ½ = 6.5. To convert a decimal fraction to binary, double it again and again. Each time, the whole-number part (0 or 1) is the next binary digit; drop it and keep doubling the fraction that remains. For 0.75: doubling gives 1.5, so the first digit is 1, leaving 0.5; doubling 0.5 gives 1.0, so the next digit is 1, leaving 0, and we stop. So 0.75 = 0.11 in binary (½ + ¼). Some fractions never reach 0 and repeat forever, as "Precision and rounding" below shows for 0.1.</p>
<p>For example, 6.5 = 110.1 in binary = 1.101 × 2<sup>2</sup>, so <em>s</em> = 0, <em>f</em> = 101 and <em>E</em> = 2. Because the digit before the point is always 1, it doesn't need to be stored: the format gets one bit of precision for free.</p>

<h3>The IEEE 754 formats</h3>
<p>The IEEE 754 standard (1985), which William Kahan led and CS 101's sidebar described, fixes how many bits each part gets:</p>
<table>
<thead><tr><th>Format</th><th>Sign</th><th>Exponent</th><th>Fraction</th><th>Bias</th><th>About</th></tr></thead>
<tbody>
<tr><td>single (C <code>float</code>)</td><td>1</td><td>8</td><td>23</td><td>127</td><td>7 decimal digits, up to 3.4 × 10<sup>38</sup></td></tr>
<tr><td>double (C <code>double</code>, Python <code>float</code>)</td><td>1</td><td>11</td><td>52</td><td>1023</td><td>16 decimal digits, up to 1.8 × 10<sup>308</sup></td></tr>
</tbody>
</table>
<p>The exponent is stored with a <strong>bias</strong>: the stored field <em>e</em> is <em>E</em> + 127 for single precision, so that it is never negative. For 6.5 in single precision: sign 0, exponent field 2 + 127 = 129 = <code>10000001</code>, fraction <code>10100000000000000000000</code>. The full 32 bits are</p>
<pre data-label="Bits"><code>0 10000001 10100000000000000000000     = 0x40D00000</code></pre>
<p>Python's <code>struct</code> module can show the bits of any float:</p>
<pre><code>import struct

def float32_bits(x):
    """The 32-bit pattern of x stored as a single-precision float, in hex."""
    return struct.pack("&gt;f", x).hex()

print(float32_bits(6.5))     # 40d00000
print(float32_bits(-1.0))    # bf800000
print(float32_bits(0.1))     # 3dcccccd</code></pre>
<p>(<code>"&gt;f"</code> means a big-endian 32-bit float, so the bytes print most significant first.)</p>

<h3>Special values</h3>
<p>The smallest and largest exponent fields are reserved:</p>
<ul>
<li><strong>Exponent all zeros: zero and subnormal numbers.</strong> With fraction 0, the value is ±0 (yes, there are two zeros; they compare equal). With a nonzero fraction, the number is <em>subnormal</em>: 0.<em>f</em> × 2<sup>−126</sup> in single precision, with no hidden 1. The bias rule would suggest 2<sup>0 − 127</sup> = 2<sup>−127</sup>, but the standard deliberately uses −126, the same exponent as the smallest normal numbers (exponent field 1, values 1.<em>f</em> × 2<sup>−126</sup>). That way the largest subnormal, 0.111…1 × 2<sup>−126</sup>, sits just one step below the smallest normal number, 1.000…0 × 2<sup>−126</sup>, and the numbers stay evenly spaced across the boundary. With 2<sup>−127</sup>, the subnormals would stop at 2<sup>−127</sup>, leaving a gap up to 2<sup>−126</sup>. (Double precision likewise uses 2<sup>−1022</sup>.) Subnormals fill the gap between 0 and the smallest normal number, so that <em>x</em> − <em>y</em> is zero only when <em>x</em> = <em>y</em>. A result too small even for a subnormal (below about 1.4 × 10<sup>−45</sup> in single precision, or 4.9 × 10<sup>−324</sup> in double) rounds to 0. This loss of tiny results, first to subnormals with fewer digits and then to 0, is called <strong>underflow</strong>. In Python, <code>1e-200 * 1e-200</code> is <code>0.0</code>. Multiplying many small numbers, such as hundreds of probabilities, underflows in the same way, which is why such programs add logarithms instead of multiplying.</li>
<li><strong>Exponent all ones: infinity and NaN.</strong> With fraction 0, the value is ±∞, produced by overflow (<code>1e308 * 10</code> in Python is <code>inf</code>) and in C by dividing a nonzero number by zero. With a nonzero fraction, it is <strong>NaN</strong> ("not a number"), the result of meaningless operations like ∞ − ∞ or 0/0 in C. NaN is not equal to anything, including itself: <code>x != x</code> is the classic test for NaN.</li>
</ul>
<pre><code>inf = float("inf")
print(inf - inf)                  # nan
nan = float("nan")
print(nan == nan, nan != nan)     # False True
print(-0.0 == 0.0)                # True</code></pre>
<p>(Python raises <code>ZeroDivisionError</code> for <code>1.0 / 0.0</code> rather than returning infinity, a deliberate choice to catch mistakes early; C and most other languages follow IEEE 754 and return ∞.)</p>

<h3>Precision and rounding</h3>
<p>Between 1 and 2, a double can represent the numbers 1, 1 + 2<sup>−52</sup>, 1 + 2 · 2<sup>−52</sup>, …: the gap is 2<sup>−52</sup> ≈ 2.2 × 10<sup>−16</sup>, a value called <strong>machine epsilon</strong> (Python's <code>sys.float_info.epsilon</code>). Between 2 and 4 the gap doubles, between 4 and 8 it doubles again: floats are spread evenly on a logarithmic scale, so the <em>relative</em> spacing stays about the same everywhere. Above 2<sup>53</sup>, the gap exceeds 1 and not every integer is representable: <code>2.0**53 + 1 == 2.0**53</code> is <code>True</code>.</p>
<p>Every arithmetic result is <strong>rounded to the nearest</strong> representable number (ties go to the one whose last bit is 0, called "round half to even"). So each operation adds a relative error of at most half an epsilon, about 1.1 × 10<sup>−16</sup>. That's tiny for one operation, but it has consequences:</p>
<ul>
<li><strong>Decimal fractions are approximated.</strong> 0.1 is 1/10, whose binary expansion repeats forever (0.000110011001100…), like 1/3 in decimal. It is stored rounded, which is why <code>0.1 + 0.2 != 0.3</code>.</li>
<li><strong>Addition isn't associative.</strong> <code>(1e16 + 1.0) - 1e16</code> is 0.0, because 1e16 + 1 rounds back to 1e16 (the gap there is 2), but <code>1e16 - 1e16 + 1.0</code> is 1.0. The order of a sum can change the answer, which matters when a compiler or a parallel program reorders it.</li>
<li><strong>Subtracting nearly equal numbers loses digits.</strong> If <em>x</em> and <em>y</em> agree in their first 12 digits, <em>x</em> − <em>y</em> has only about 4 correct digits left. This <strong>catastrophic cancellation</strong> is why MATH 130's numerical derivative got worse as <em>h</em> got very small.</li>
</ul>

<h3>Practical rules</h3>
<ul>
<li>Compare floats with a tolerance: <code>math.isclose(a, b)</code>, not <code>a == b</code>.</li>
<li>Never use floats for money. Use integer cents, or Python's <code>decimal</code> module.</li>
<li>When adding many numbers, add the small ones together before adding them to a large total, or use a function that tracks the lost low-order bits. Python's <code>math.fsum</code> returns the correctly rounded sum, and since Python 3.12 the built-in <code>sum</code> of floats also compensates for most of the lost bits. A plain loop, in Python or C, does not.</li>
<li>Use double precision unless you have a reason not to. Single precision (and even smaller formats, such as the 16-bit floats used to train neural networks) saves memory and time at the cost of digits.</li>
</ul>
<pre><code>import math
total = 0.0
for _ in range(10):
    total += 0.1                # ten roundings, one per addition
print(total)                    # 0.9999999999999999
print(math.fsum([0.1] * 10))    # 1.0
print(math.isclose(0.1 + 0.2, 0.3))   # True</code></pre>
`,
      terms: [
        ["Floating point", "Representing a real number as a sign, a significand and an exponent, in base 2: (−1)^s × 1.f × 2^E."],
        ["IEEE 754", "The standard floating-point formats and rules, used by nearly all hardware: single (32-bit) and double (64-bit)."],
        ["Bias", "A constant added to the exponent so it can be stored as an unsigned field: 127 for single, 1023 for double precision."],
        ["Subnormal number", "A tiny number with exponent field 0 and no hidden leading 1, filling the gap near zero."],
        ["Underflow", "A result too small in magnitude to store with full precision: it becomes a subnormal with fewer digits, or rounds to 0."],
        ["NaN", "\"Not a number\": the result of an undefined operation such as ∞ − ∞; it is not equal to itself."],
        ["Machine epsilon", "The gap between 1 and the next float: 2^−52 ≈ 2.2 × 10^−16 for doubles."],
        ["Catastrophic cancellation", "The loss of significant digits when subtracting two nearly equal numbers."]
      ],
      quiz: [
        { q: "In single precision, what exponent field stores the true exponent E = −3?", choices: ["−3", "124", "130", "3"], answer: 1, why: "The field is E + bias = −3 + 127 = 124." },
        { q: "Why doesn't the format store the leading 1 of 1.f?", choices: ["It saves time", "For normal numbers it is always 1, so storing it would waste a bit", "Because it might be 0", "IEEE 754 forbids it"], answer: 1, why: "A hidden bit gives one extra bit of precision for free." },
        { q: "What does (1e16 + 1.0) - 1e16 give in Python?", choices: ["1.0", "0.0", "1e16", "An error"], answer: 1, why: "Near 1e16 the gap between doubles is 2, so 1e16 + 1 rounds back to 1e16." },
        { q: "How can you test whether a float x is NaN without math.isnan?", choices: ["x == float('nan')", "x != x", "x is None", "x == 0"], answer: 1, why: "NaN is the only value not equal to itself." },
        { q: "Which is the safest way to store prices in a shopping-cart program?", choices: ["float dollars", "Integer cents", "Strings", "Single-precision floats"], answer: 1, why: "Integers are exact; binary floats can't store most decimal fractions exactly." }
      ],
      practice: [
        {
          q: `<p>Find the single-precision bit pattern of −0.75 by hand (sign, exponent field, fraction), give it in hex, and check with <code>float32_bits</code>.</p>`,
          a: `<p>0.75 = 0.11 in binary = 1.1 × 2<sup>−1</sup>. Sign 1; exponent field −1 + 127 = 126 = <code>01111110</code>; fraction <code>100…0</code>. Bits: <code>1 01111110 10000000000000000000000</code> = 0xBF400000; <code>float32_bits(-0.75)</code> gives <code>bf400000</code>.</p>`
        },
        {
          q: `<p>Decode the single-precision pattern 0x41200000 by hand.</p>`,
          a: `<p>0x41200000 = <code>0 10000010 01000000000000000000000</code>. Sign 0; exponent field 130, so E = 3; significand 1.01 in binary = 1.25. Value 1.25 × 2³ = 10.0.</p>`
        },
        {
          q: `<p>What is the largest integer <em>n</em> such that every integer from 0 to <em>n</em> is exactly representable as a double? Show in Python where the first gap appears.</p>`,
          a: `<p>2<sup>53</sup> = 9,007,199,254,740,992: up to there, the 53-bit significand (52 stored bits plus the hidden 1) can hold every integer. <code>float(2**53 + 1) == float(2**53)</code> is <code>True</code>: 2<sup>53</sup> + 1 is the first integer that isn't representable.</p>`
        },
        {
          q: `<p>Add up 1/<em>k</em> for <em>k</em> = 1 to 10<sup>6</sup> with a plain loop (<code>total += 1 / k</code>), once with <em>k</em> going up and once going down. Compare both totals with <code>math.fsum</code> of the same terms. Which order is more accurate, and why? (Use a loop: Python 3.12's built-in <code>sum</code> compensates for rounding and would hide the effect.)</p>`,
          a: `<p>On one machine the upward loop was off by about 7 × 10<sup>−13</sup> and the downward loop by about 5 × 10<sup>−14</sup>: the reverse order (smallest terms first) is about 15 times more accurate. Adding small terms to an already large running total discards their low-order bits; adding the small ones together first lets them accumulate before they meet the large ones. The difference is in the last few digits, around 10<sup>−14</sup>, but in long computations such errors add up.</p>`
        }
      ],
      sources: ["csapp", "goldberg91"]
    },
    {
      id: "sy3",
      title: "C for Python programmers",
      minutes: 90,
      summary: "A first C program: compiling, static types, printf, functions and control flow, how C's arithmetic differs from Python's, fixed-size arrays without bounds checks, and strings as arrays of characters ending in a zero byte.",
      notes: `
<p>C was created by Dennis Ritchie at Bell Labs in the early 1970s to write the Unix operating system. Fifty years later, operating systems, databases, language interpreters (including CPython itself), embedded devices and much of the internet's infrastructure are still written in C or its descendant C++. C gives you nearly direct control of the machine, which is why it's the language of this course, and almost no protection from mistakes, which is why the course is careful.</p>

<h3>A first program</h3>
<pre data-label="C"><code>#include &lt;stdio.h&gt;

int square(int x) {
    return x * x;
}

int main(void) {
    for (int i = 1; i &lt;= 3; i++) {
        printf("%d squared is %d\\n", i, square(i));
    }
    return 0;
}</code></pre>
<pre data-label="Output"><code>1 squared is 1
2 squared is 4
3 squared is 9</code></pre>
<p>Line by line, compared with Python:</p>
<ul>
<li><code>#include &lt;stdio.h&gt;</code> makes the standard input/output functions, including <code>printf</code>, available, much like an <code>import</code>.</li>
<li>Every variable, parameter and return value has a declared <strong>type</strong> that never changes: <code>int square(int x)</code> takes an <code>int</code> and returns one. The compiler checks types before the program runs.</li>
<li>Blocks are marked with braces <code>{ }</code>, and statements end with semicolons. Indentation is for readers only.</li>
<li>The <code>for</code> loop has three parts: start (<code>int i = 1</code>), condition (<code>i &lt;= 3</code>), and step (<code>i++</code>, which adds 1).</li>
<li><code>printf</code> prints using a format string: <code>%d</code> for an <code>int</code>, <code>%f</code> for a <code>double</code>, <code>%s</code> for a string, <code>%c</code> for a character. Unlike Python's <code>print</code>, it adds no newline unless you write <code>\\n</code>. A number between <code>%</code> and <code>f</code> sets the decimal places: <code>printf("%.1f", 2.0 / 3)</code> prints <code>0.7</code>, and <code>%.2f</code> would print <code>0.67</code>, rounding the last digit. (Plain <code>%f</code> prints six decimal places: <code>0.666667</code>.) Other types have their own codes: <code>%u</code> for an <code>unsigned int</code>, <code>%ld</code> for a <code>long</code>, and <code>%zu</code> for a <code>size_t</code> (below).</li>
<li>Execution starts at <code>main</code>. Its return value goes to the operating system: 0 means success.</li>
<li><code>void</code> means "nothing". Inside the parentheses, <code>int main(void)</code> says that <code>main</code> takes no parameters. As a return type, as in <code>void swap(int *a, int *b)</code> in Lesson 4, it says the function returns no value, like a Python function with no <code>return</code>; such a function ends with a bare <code>return;</code> or by reaching its closing brace.</li>
</ul>

<h3>Compiling</h3>
<p>Python runs your source code directly. C must first be <strong>compiled</strong> into a machine-code executable:</p>
<pre data-label="Shell"><code>gcc -Wall -Wextra -g -o squares squares.c
./squares</code></pre>
<p><code>gcc</code> is the GNU C compiler (<code>clang</code> takes the same options). <code>-Wall -Wextra</code> turns on warnings, which in C often point to real bugs: always use them, and treat warnings as errors to fix. <code>-g</code> keeps information for the debugger, and <code>-o squares</code> names the output. Lesson 8 shows what happens inside <code>gcc</code>.</p>

<h3>Types</h3>
<table>
<thead><tr><th>Type</th><th>Typical size on a 64-bit machine</th><th>Holds</th></tr></thead>
<tbody>
<tr><td><code>char</code></td><td>1 byte</td><td>a small integer, usually used for a character</td></tr>
<tr><td><code>int</code></td><td>4 bytes</td><td>a signed integer, −2,147,483,648 to 2,147,483,647</td></tr>
<tr><td><code>long</code></td><td>8 bytes (on Linux and macOS)</td><td>a larger signed integer</td></tr>
<tr><td><code>unsigned int</code></td><td>4 bytes</td><td>0 to 4,294,967,295</td></tr>
<tr><td><code>double</code></td><td>8 bytes</td><td>an IEEE 754 double (Lesson 2)</td></tr>
<tr><td><code>int32_t</code>, <code>uint8_t</code>, …</td><td>exactly as named</td><td>fixed-width integers from <code>&lt;stdint.h&gt;</code></td></tr>
</tbody>
</table>
<p>The C standard sets only minimum sizes, so <code>int</code> and <code>long</code> can differ between systems, while the <code>&lt;stdint.h&gt;</code> types are exact everywhere. The <code>sizeof</code> operator gives the size in bytes of a type, <code>sizeof(int)</code>, or of a variable, <code>sizeof(x)</code>. Its result has type <code>size_t</code>, an unsigned integer type used for sizes and counts, which <code>printf</code> prints with <code>%zu</code>. Everything from Lesson 1 applies: an <code>int</code> overflows past 2,147,483,647.</p>

<h3>Arithmetic differences</h3>
<p>Integer division in C <em>truncates toward zero</em>, while Python's <code>//</code> rounds down (toward −∞). In each language the remainder follows the quotient, so that dividing and multiplying back gives <em>a</em>: in C, <code>(a / b) * b + a % b == a</code>; in Python, where <code>/</code> is true division, the same rule is <code>(a // b) * b + a % b == a</code>. Because the quotients differ for negative numbers, so do the remainders:</p>
<table>
<thead><tr><th>Expression</th><th>C</th><th>Python</th></tr></thead>
<tbody>
<tr><td>7 / 2</td><td>3 (both <code>int</code>)</td><td>3.5 (<code>7 // 2</code> is 3)</td></tr>
<tr><td>−7 / 2</td><td>−3</td><td><code>-7 // 2</code> is −4</td></tr>
<tr><td>−7 % 2</td><td>−1</td><td>1</td></tr>
</tbody>
</table>
<p>In C, <code>/</code> on two integers is integer division; to get 3.5, at least one operand must be a <code>double</code>: <code>7 / 2.0</code>. And C has no exponent operator: <code>2 ^ 3</code> is bitwise XOR, which is 1. Use <code>pow(2, 3)</code> from <code>&lt;math.h&gt;</code> for doubles, or a shift, <code>1 &lt;&lt; 3</code>, for powers of 2.</p>

<h3>Arrays</h3>
<pre data-label="C"><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int sum(int xs[], int n) {
    int total = 0;
    for (int i = 0; i &lt; n; i++) {
        total += xs[i];
    }
    return total;
}

int main(void) {
    int scores[4] = {90, 85, 77, 92};
    printf("%d\\n", sum(scores, 4));          /* 344 */
    printf("%zu\\n", sizeof(scores));         /* 16: four 4-byte ints */
    char name[6] = "Grace";                  /* 5 letters + '\\0' */
    printf("%s has %zu letters\\n", name, strlen(name));
    printf("%d\\n", name[5]);                 /* 0, the terminator */
    return 0;
}</code></pre>
<p>A C array is exactly CS 201's fixed array: a block of equal-sized slots. It has no <code>len</code>, no <code>append</code> and no slicing. Two facts cause most C bugs:</p>
<ul>
<li><strong>An array passed to a function doesn't know its own length.</strong> Inside <code>sum</code>, <code>xs</code> is really just the address of the first element (Lesson 4 explains), so the length must be passed separately.</li>
<li><strong>There are no bounds checks.</strong> <code>scores[4]</code> or <code>scores[-1]</code> compile and run, reading or writing whatever memory happens to be there. The result is <em>undefined behavior</em>: the program might crash, give wrong answers, or seem fine until it's attacked.</li>
</ul>

<h3>Strings</h3>
<p>C has no string type. A string is an array of <code>char</code> ending in a <strong>null terminator</strong>, the byte 0, written <code>'\\0'</code>. "Grace" needs 6 bytes: five letters and the terminator. Functions like <code>printf("%s")</code> and <code>strlen</code> walk through memory until they find the 0 byte, so <code>strlen</code> costs Θ(<em>n</em>), not Θ(1). If the terminator is missing, they keep reading past the end of the array.</p>
<p>Copying a string into an array that's too small is the most famous C bug. The old function <code>strcpy(dest, src)</code> copies until it reaches <code>src</code>'s terminator, however small <code>dest</code> is. Safer code checks sizes, for example with <code>snprintf(dest, sizeof dest, "%s", src)</code>, which never writes more than the size it's given. (<code>sizeof dest</code> is the same as <code>sizeof(dest)</code>: when <code>sizeof</code> is applied to a variable, the parentheses may be left out. They are required around a type name, as in <code>sizeof(int)</code>. Here <code>dest</code> must be an array declared in the same function, so that its size is known. An array parameter, like <code>xs</code> in <code>sum</code> above, is only an address, and <code>sizeof</code> would give the size of the address.)</p>
<p>The terminator also needs room when you initialize an array. <code>char name[6] = "Grace"</code> fits all 6 bytes, and <code>char name[] = "Grace"</code> lets the compiler count them. A string one character longer than the array, as in <code>char word[5] = "hello"</code>, is a special case: C allows it and silently leaves out the terminator, so <code>word</code> holds five letters and no 0 byte. GCC 13 compiles it without even a warning under <code>-Wall -Wextra</code>. Printing it with <code>%s</code> then reads past the end of the array. (A string with more letters than the array has bytes, such as <code>char w[4] = "hello"</code>, breaks a rule of the language, and GCC warns that the initializer is too long.)</p>

<h3>No exceptions</h3>
<p>C has no exceptions. Functions signal errors through their return value: <code>-1</code>, <code>NULL</code> (Lesson 4), or a special code, often with details in a global variable called <code>errno</code>. Every call that can fail must be checked by the caller. Forgetting to check is a common source of bugs, and part of why newer systems languages such as Rust and Go make errors harder to ignore.</p>
`,
      terms: [
        ["Compiler", "A program that translates source code (such as C) into machine code before the program runs."],
        ["Static typing", "Every variable has a type fixed when the code is written and checked by the compiler."],
        ["printf", "C's formatted-printing function: %d for int, %f for double, %s for a string, %c for a character."],
        ["Truncating division", "C's integer division, which rounds toward zero: −7 / 2 is −3."],
        ["Null terminator", "The 0 byte that marks the end of a C string."],
        ["Undefined behavior", "An operation, such as reading past the end of an array, whose result the C standard doesn't define."]
      ],
      quiz: [
        { q: "What does printf(\"%d\", -7 / 2) print in C?", choices: ["-4", "-3", "-3.5", "-3.0"], answer: 1, why: "C's integer division truncates toward zero." },
        { q: "How many bytes does the C string \"hello\" occupy in a char array?", choices: ["5", "6", "8", "It depends on the font"], answer: 1, why: "Five characters plus the null terminator." },
        { q: "What happens in C if you write to scores[10] in an array of 4 ints?", choices: ["An IndexError", "The array grows", "Undefined behavior: whatever memory is there may be overwritten", "The compiler always refuses"], answer: 2, why: "C doesn't check bounds." },
        { q: "Why does the sum function take the length n as a separate parameter?", choices: ["For speed", "An array passed to a function is only an address; it doesn't carry its length", "C requires two parameters", "So it can sum part of the array"], answer: 1, why: "Inside the function, xs is the address of the first element." },
        { q: "What is 2 ^ 3 in C?", choices: ["8", "6", "1", "9"], answer: 2, why: "^ is bitwise XOR: 010 ^ 011 = 001." }
      ],
      practice: [
        {
          q: `<p>Write a C program that prints the Celsius equivalents of 0, 20, 40, …, 100 °F (C = (F − 32) × 5 / 9) with one decimal place. Then explain why <code>(f - 32) * 5 / 9</code> with an <code>int f</code> gives slightly different numbers than <code>(f - 32) * 5 / 9.0</code>.</p>`,
          a: `<pre data-label="C"><code>#include &lt;stdio.h&gt;

int main(void) {
    for (int f = 0; f &lt;= 100; f += 20) {
        printf("%d F = %.1f C\\n", f, (f - 32) * 5 / 9.0);
    }
    return 0;
}</code></pre><p>With all-<code>int</code> operands, <code>/ 9</code> is integer division truncating toward zero: for 0 °F, −160 / 9 is −17 instead of −17.8. Dividing by <code>9.0</code> makes the arithmetic happen in <code>double</code>. (<code>%.1f</code> prints one decimal place.)</p>`
        },
        {
          q: `<p>Work out by hand, without running anything, what C gives for <code>a / b</code> and <code>a % b</code>, and what Python gives for <code>a // b</code> and <code>a % b</code>, for (<em>a</em>, <em>b</em>) = (7, 2), (−7, 2), (7, −2) and (−7, −2). Check that each language's identity from the notes holds in all four cases. What rule decides the sign of the remainder in each language? (The programming problem <em>C's integer division</em> then asks you to compute C's results in Python.)</p>`,
          a: `<p>C, quotient truncated toward zero: 3 and 1; −3 and −1; −3 and 1; 3 and −1. Python, quotient rounded down: 3 and 1; −4 and 1; −4 and −1; 3 and −1. Check for (−7, 2): in C, (−3)(2) + (−1) = −7; in Python, (−4)(2) + 1 = −7. The other cases work the same way. In C the remainder has the sign of <em>a</em> (or is 0); in Python it has the sign of <em>b</em> (or is 0).</p>`
        },
        {
          q: `<p>What does this print, and what is wrong with it? <code>char word[5] = "hello"; printf("%s\\n", word);</code></p>`,
          a: `<p>"hello" needs 6 bytes, but the array has 5, so there's no room for the terminator (C allows this initialization, silently dropping the 0). <code>printf</code> prints "hello" and then keeps reading whatever bytes follow in memory until it happens to find a 0: undefined behavior. Declare <code>char word[6]</code>, or <code>char word[] = "hello"</code> to let the compiler count.</p>`
        }
      ],
      sources: ["kr", "cppref", "csapp"]
    },
    {
      id: "sy4",
      title: "Pointers and memory",
      minutes: 90,
      summary: "Addresses and pointers, the & and * operators, pointer arithmetic and its link to arrays, the stack and the heap, malloc and free, and the memory bugs C programmers must avoid, with the tools that find them.",
      notes: `
<p>Every Python variable is secretly a reference: a name bound to an object somewhere in memory (CS 101's aliasing lesson). C makes references explicit and gives you their raw form, the <strong>pointer</strong>: a variable whose value is a memory address.</p>

<h3>Addresses, & and *</h3>
<p>Every variable lives at some address in memory. The <code>&amp;</code> operator gives a variable's address, and a pointer variable stores it. The <code>*</code> operator <strong>dereferences</strong> a pointer: it means "the thing at this address".</p>
<pre data-label="C"><code>int x = 42;
int *p = &amp;x;         /* p is a pointer to int; it holds x's address */
printf("%d\\n", *p);  /* 42: the int at that address */
*p = 7;              /* writes through the pointer */
printf("%d\\n", x);   /* 7: x itself changed */</code></pre>
<p>The type <code>int *</code> means "pointer to int". The type matters: it tells the compiler how many bytes to read at the address (4 for an <code>int</code>) and how to interpret them. A pointer that points nowhere is set to <code>NULL</code> (address 0); dereferencing it crashes the program with a <strong>segmentation fault</strong>. The operating system gives each running program only certain ranges of addresses to use, and address 0 is never one of them. When a program reads or writes an address outside its ranges, the hardware stops the access and the operating system ends the program. The shell then prints <code>Segmentation fault</code> (often shortened to "segfault"). Lesson 8 says more about how the operating system gives each program its own addresses.</p>

<h3>Why pointers: changing the caller's variables</h3>
<p>C passes arguments by value: a function gets copies. To let a function change the caller's variables, pass their addresses:</p>
<pre data-label="C"><code>#include &lt;stdio.h&gt;

void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void) {
    int x = 3, y = 7;
    swap(&amp;x, &amp;y);
    printf("%d %d\\n", x, y);   /* 7 3 */
    return 0;
}</code></pre>
<p>This is also how C functions return several results: <code>scanf("%d", &amp;n)</code> reads a number from input and stores it through the pointer it was given.</p>

<h3>Pointer arithmetic and arrays</h3>
<p>Adding an integer to a pointer moves it by that many <em>elements</em>, not bytes: if <code>p</code> is an <code>int *</code>, then <code>p + 1</code> is the address 4 bytes later. And an array's name, used in an expression, becomes a pointer to its first element. Together these explain C's array indexing: <code>a[i]</code> is defined to mean <code>*(a + i)</code>, "the element <em>i</em> places after the start", which is CS 201's formula <em>base</em> + <em>i</em> · <em>s</em>.</p>
<pre data-label="C"><code>int nums[3] = {10, 20, 30};
int *p = nums;                         /* same as &amp;nums[0] */
printf("%d %d\\n", *p, *(p + 2));       /* 10 30 */
printf("%d\\n", p[1]);                  /* 20: p[1] means *(p + 1) */</code></pre>
<p>This is why a function receiving an array (Lesson 3) gets only an address: <code>int xs[]</code> as a parameter is the same as <code>int *xs</code>.</p>
<p>How far may a pointer go? C allows exactly one position past the end of an array. For <code>nums</code> above, <code>nums + 3</code> (also written <code>&amp;nums[3]</code>) is a legal address to compute and to compare with other pointers into the array; loops often use it as their stopping point. But it doesn't point at an element, so reading or writing <code>*(nums + 3)</code>, that is <code>nums[3]</code>, is undefined behavior. Even computing an address further out, such as <code>nums + 4</code> or <code>nums - 1</code>, is undefined behavior, although it usually seems to work.</p>

<h3>The stack and the heap</h3>
<p>A running C program keeps its data in several regions of memory:</p>
<ul>
<li>The <strong>stack</strong> holds each active function call's local variables. They are created when the function is called and destroyed when it returns, automatically. Lesson 6 looks at the stack in detail.</li>
<li>The <strong>heap</strong> holds memory the program requests explicitly, which lives until the program explicitly gives it back. It's needed when data must outlive the function that creates it, or when its size is only known while the program runs.</li>
<li>Global variables and the program's code live in their own fixed regions.</li>
</ul>
<p>Heap memory is managed with two functions from <code>&lt;stdlib.h&gt;</code>. <code>malloc(n)</code> reserves <em>n</em> bytes and returns a pointer to them (or <code>NULL</code> if it can't). <code>free(p)</code> returns them.</p>
<pre data-label="C"><code>int n = 5;
int *squares = malloc(n * sizeof(int));   /* room for 5 ints */
if (squares == NULL) {
    return 1;                             /* out of memory */
}
for (int i = 0; i &lt; n; i++) {
    squares[i] = i * i;
}
printf("%d\\n", squares[4]);               /* 16 */
free(squares);                            /* give it back, exactly once */</code></pre>
<p>Python and Java do this bookkeeping for you with a <strong>garbage collector</strong>, which frees objects once nothing refers to them. In C, the programmer is the garbage collector.</p>

<h3>Memory bugs</h3>
<p>Manual memory management makes possible a family of bugs that Python programmers never see:</p>
<table>
<thead><tr><th>Bug</th><th>What happens</th></tr></thead>
<tbody>
<tr><td><strong>Buffer overflow</strong></td><td>Writing past the end of an array overwrites neighboring data, possibly other variables, heap bookkeeping or (Lesson 6) a function's return address.</td></tr>
<tr><td><strong>Use after free</strong></td><td>Using memory after <code>free</code>: it may already belong to something else.</td></tr>
<tr><td><strong>Double free</strong></td><td>Freeing the same block twice corrupts the allocator's records.</td></tr>
<tr><td><strong>Memory leak</strong></td><td>Never freeing memory you no longer need; a long-running program slowly uses up memory.</td></tr>
<tr><td><strong>Dangling pointer</strong></td><td>Returning the address of a local variable, which is destroyed when the function returns.</td></tr>
<tr><td><strong>Uninitialized read</strong></td><td>Reading a local variable or <code>malloc</code>ed memory before writing it: its value is whatever was there before.</td></tr>
</tbody>
</table>
<p>These bugs matter far beyond crashes. Microsoft and Google have each reported that about 70% of the serious security vulnerabilities they fix are memory-safety bugs of these kinds. That figure is a major reason governments and companies now encourage memory-safe languages such as Rust, Go, Java and Python for new code.</p>

<h3>Tools that find memory bugs</h3>
<p>You don't have to find these bugs by staring. Compile with <strong>AddressSanitizer</strong> (<code>-fsanitize=address</code>, in both GCC and Clang) and the program checks every memory access as it runs:</p>
<pre data-label="C"><code>int *a = malloc(3 * sizeof(int));
a[3] = 42;                /* one past the end */
free(a);</code></pre>
<pre data-label="Shell"><code>gcc -g -fsanitize=address -o bug bug.c &amp;&amp; ./bug
==4041==ERROR: AddressSanitizer: heap-buffer-overflow on address 0x50200000001c ...
WRITE of size 4 at 0x50200000001c thread T0
0x50200000001c is located 0 bytes after 12-byte region ...</code></pre>
<p>It reports the exact line, the bad address, and that it was 0 bytes past a 12-byte block: the array of 3 ints. <strong>Valgrind</strong> is a similar tool that runs an unmodified program and also reports leaks at exit. Run your labs under one of them every time.</p>
`,
      terms: [
        ["Pointer", "A variable whose value is a memory address, with a type saying what kind of value is stored there."],
        ["Dereference", "Accessing the value at a pointer's address, written *p."],
        ["NULL", "A pointer value (address 0) meaning \"points to nothing\"; dereferencing it crashes the program."],
        ["Segmentation fault", "The crash that happens when a program touches an address the operating system hasn't given it, such as NULL."],
        ["Pointer arithmetic", "Adding an integer to a pointer moves it by that many elements of its type; a[i] means *(a + i)."],
        ["Stack", "Memory for each active function call's local variables, created and destroyed automatically."],
        ["Heap", "Memory requested with malloc and returned with free, which lives until it is freed."],
        ["Memory leak", "Memory that is no longer needed but never freed."],
        ["AddressSanitizer", "A compiler option that adds checks to every memory access and reports the first invalid one."]
      ],
      quiz: [
        { q: "After int x = 5; int *p = &amp;x; *p = *p + 1; what is x?", choices: ["5", "6", "The address of x plus 1", "It doesn't compile"], answer: 1, why: "*p is x itself, so the assignment changes x." },
        { q: "If p is an int * holding address 1000, what address does p + 3 hold (4-byte ints)?", choices: ["1003", "1012", "1024", "3000"], answer: 1, why: "Pointer arithmetic moves by elements: 1000 + 3 × 4." },
        { q: "Why does swap take int * parameters instead of int?", choices: ["Pointers are faster", "C passes copies, so to change the caller's variables the function needs their addresses", "int can't be swapped", "To save memory"], answer: 1, why: "With int parameters, swap would only exchange its own copies." },
        { q: "A function returns the address of one of its local variables. What is the problem?", choices: ["None", "The local variable is destroyed when the function returns, so the pointer dangles", "It leaks memory", "Locals have no address"], answer: 1, why: "Stack memory for the call is reused after it returns." },
        { q: "Which bug does AddressSanitizer report as \"heap-buffer-overflow\"?", choices: ["A memory leak", "Writing past the end of a malloc'd block", "Dividing by zero", "An infinite loop"], answer: 1, why: "It checks every heap access against the block's bounds." }
      ],
      practice: [
        {
          q: `<p>Write a C function <code>void min_max(int xs[], int n, int *lo, int *hi)</code> that stores the smallest and largest of the <em>n</em> ≥ 1 numbers through the two pointers, and show how <code>main</code> calls it.</p>`,
          a: `<pre data-label="C"><code>void min_max(int xs[], int n, int *lo, int *hi) {
    *lo = *hi = xs[0];
    for (int i = 1; i &lt; n; i++) {
        if (xs[i] &lt; *lo) *lo = xs[i];
        if (xs[i] &gt; *hi) *hi = xs[i];
    }
}

/* in main: */
int a[] = {4, -2, 9, 7}, smallest, largest;
min_max(a, 4, &amp;smallest, &amp;largest);
printf("%d %d\\n", smallest, largest);   /* -2 9 */</code></pre>`
        },
        {
          q: `<p>An array <code>double v[10]</code> starts at address 0x1000. What are the addresses of <code>v[1]</code>, <code>v[9]</code> and <code>&amp;v[10]</code> (one past the end)? Is it legal to compute <code>&amp;v[10]</code>? To read <code>v[10]</code>?</p>`,
          a: `<p>Each double is 8 bytes: 0x1008, 0x1048 (0x1000 + 72) and 0x1050 (0x1000 + 80). C explicitly allows computing the one-past-the-end address (loops use it as a stopping point), but reading or writing <code>v[10]</code> is undefined behavior.</p>`
        },
        {
          q: `<p>Find every memory bug in this function and fix it. (<code>toupper(c)</code>, from <code>&lt;ctype.h&gt;</code>, returns the uppercase form of a lowercase letter and returns any other character unchanged: <code>toupper('a')</code> is <code>'A'</code> and <code>toupper('!')</code> is <code>'!'</code>. Assume <code>&lt;ctype.h&gt;</code>, <code>&lt;stdlib.h&gt;</code> and <code>&lt;string.h&gt;</code> are included.)</p><pre data-label="C"><code>char *copy_upper(char *s) {
    char *out = malloc(strlen(s));
    for (int i = 0; s[i] != '\\0'; i++)
        out[i] = toupper(s[i]);
    return out;
}</code></pre>`,
          a: `<p>(1) <code>malloc(strlen(s))</code> leaves no room for the terminator: use <code>strlen(s) + 1</code>. (2) The loop never writes the terminator: add <code>out[strlen(s)] = '\\0'</code> (or copy it inside the loop). (3) It doesn't check whether <code>malloc</code> returned <code>NULL</code>. The caller must also <code>free</code> the result, which the function's comment should say.</p>`
        },
        {
          q: `<p>Python has no pointers, yet CS 101 showed that two names can refer to one list. Explain how a Python variable resembles a C pointer and two ways it differs.</p>`,
          a: `<p>Like a pointer, a Python name refers to an object stored elsewhere, and assignment copies the reference, not the object (aliasing). Differences: you can't do arithmetic on a Python reference or see its address in a usable way (<code>id()</code> is only an identifier); every reference refers to a valid object or to <code>None</code>, never to freed or random memory; and the garbage collector frees objects automatically when no references remain.</p>`
        }
      ],
      sources: ["kr", "csapp", "cppref"]
    }
  ]
});

CSA.addUnits("cs210", [
    {
      id: "sy5",
      title: "Machine code and assembly",
      minutes: 90,
      summary: "How a processor runs a program: registers, instructions and the fetch-decode-execute cycle; reading x86-64 assembly produced by a C compiler; how ifs and loops become jumps; and a small teaching machine you can simulate in Python.",
      notes: `
<p>A processor doesn't understand C or Python. It understands <strong>machine code</strong>: a sequence of numbered instructions, each a few bytes, from a fixed menu called its <strong>instruction set architecture</strong> (ISA). Laptops and servers mostly use the x86-64 ISA (Intel and AMD); phones and Apple's recent Macs use ARM. A compiler's job is to translate C into this menu. <strong>Assembly language</strong> is machine code written as readable text, one instruction per line.</p>

<h3>The processor's view</h3>
<p>A processor has a small number of <strong>registers</strong>: storage cells inside the processor itself, each holding one 64-bit value, and far faster to reach than memory. x86-64 has 16 general-purpose registers with names like <code>%rax</code>, <code>%rdi</code> and <code>%rsi</code>. One special register, the <strong>program counter</strong> (<code>%rip</code> on x86-64), holds the address of the next instruction. The processor repeats one cycle, billions of times a second:</p>
<ol>
<li><strong>Fetch</strong> the instruction at the address in the program counter.</li>
<li><strong>Decode</strong> it: which operation, which registers or memory locations.</li>
<li><strong>Execute</strong> it, and move the program counter to the next instruction (or, for a jump, to the jump's target).</li>
</ol>
<p>Instructions do small things: copy a value between registers and memory, add or compare two values, jump to another instruction. Everything a program does is built from these.</p>

<h3>Reading compiler output</h3>
<p>GCC shows you the assembly it produces with the <code>-S</code> option. Here is a small C function and its x86-64 assembly at optimization level 1 (<code>gcc -O1 -S</code>), with the assembler's bookkeeping lines removed:</p>
<pre data-label="C"><code>long add_and_scale(long a, long b) {
    return (a + b) * 3;
}</code></pre>
<pre data-label="x86-64"><code>add_and_scale:
    addq    %rsi, %rdi            # rdi = rdi + rsi       (a + b)
    leaq    (%rdi,%rdi,2), %rax   # rax = rdi + 2 * rdi   (times 3)
    ret                           # return; the result is in rax</code></pre>
<p>Some conventions of this syntax (called AT&amp;T syntax, the default on Linux): register names start with <code>%</code>, constants with <code>$</code>, and the destination comes <em>last</em>, so <code>addq %rsi, %rdi</code> means "<code>rdi</code> += <code>rsi</code>". The <code>q</code> suffix ("quad word") means a 64-bit operation. By the calling rules on Linux and macOS, the first two arguments arrive in <code>%rdi</code> and <code>%rsi</code>, and the return value goes in <code>%rax</code> (Lesson 6 covers the rules). Notice the compiler's trick: it multiplied by 3 with <code>leaq</code>, an instruction meant for computing addresses, because <em>x</em> + 2<em>x</em> is cheaper than a multiplication.</p>
<p>The operand <code>(%rdi,%rdi,2)</code> is an example of x86-64's general <strong>address form</strong>, written <code>offset(base,index,scale)</code>. It stands for the number</p>
<p class="math">offset + base + index × scale</p>
<p>where <em>base</em> and <em>index</em> are registers, <em>scale</em> is 1, 2, 4 or 8, and <em>offset</em> is a constant. Any part may be left out: a missing offset is 0, a missing scale is 1, and a missing base or index counts as 0, though the commas stay. So <code>(%rdi,%rdi,2)</code> is rdi + 2 · rdi, <code>8(%rsp)</code> is rsp + 8, and <code>4(,%rsi,8)</code> is 4 + 8 · rsi. Most instructions use this form to name a memory location; <code>leaq</code> ("load effective address") computes the number itself and stores it, without touching memory, which is why compilers borrow it for arithmetic.</p>

<h3>Branches and loops become jumps</h3>
<p>Machine code has no <code>if</code>, <code>while</code> or <code>for</code>. It has <strong>compare</strong> instructions, which set status flags, and <strong>jumps</strong>, which change the program counter either always (<code>jmp</code>) or only when the flags say so (<code>jle</code>: jump if less or equal; <code>jne</code>: jump if not equal; and so on). Labels like <code>.L4</code> name jump targets.</p>
<pre data-label="C"><code>long sum_to(long n) {
    long total = 0;
    for (long i = 1; i &lt;= n; i++) {
        total += i;
    }
    return total;
}</code></pre>
<pre data-label="x86-64"><code>sum_to:
    testq   %rdi, %rdi       # compare n with 0 (see below)
    jle     .L5              # if n &lt;= 0, skip the loop
    addq    $1, %rdi         # rdi = n + 1, the loop's stopping value
    movl    $1, %eax         # i = 1      (in rax)
    movl    $0, %edx         # total = 0  (in rdx)
.L4:
    addq    %rax, %rdx       # total += i
    addq    $1, %rax         # i++
    cmpq    %rdi, %rax       # compare i with n + 1
    jne     .L4              # if not equal, go round again
.L2:
    movq    %rdx, %rax       # return total
    ret
.L5:
    movl    $0, %edx         # n &lt;= 0: total = 0
    jmp     .L2</code></pre>
<p>The <code>for</code> loop became a test before the loop, a body, and a backward jump. Three details:</p>
<ul>
<li><code>testq a, b</code> computes a AND b, bit by bit (Lesson 1), throws the result away and keeps only the flags, which record whether the result was zero or negative. ANDing <em>n</em> with itself gives <em>n</em>, so <code>testq %rdi, %rdi</code> is a short way to compare <em>n</em> with 0, and <code>jle</code> then jumps if <em>n</em> ≤ 0. (<code>cmpq b, a</code> does the same for a − b: it sets the flags from the subtraction and discards the result.)</li>
<li><code>%eax</code> is the name for the low 32 bits of <code>%rax</code>, and <code>%edx</code> for the low 32 bits of <code>%rdx</code>. Each 64-bit register has such a 32-bit name, used with 32-bit instructions like <code>movl</code> ("l" for "long", 32 bits here). So <code>movl $1, %eax</code> sets rax to 1.</li>
<li><code>movl</code> writes a 32-bit value; on x86-64 that also clears the register's top 32 bits, so it's a shorter way to set a small 64-bit value.</li>
</ul>
<p>The compiler also rearranged the loop to compare <code>i</code> with <em>n</em> + 1 using "not equal", which is equivalent here and simpler. Optimized code often differs from the source's shape like this; compiling with <code>-O0</code> gives a more literal translation, and a debugger such as <code>gdb</code> can step through it one instruction at a time.</p>

<h3>A teaching machine</h3>
<p>Real ISAs have hundreds of instructions. To experiment, this course uses a tiny made-up machine with 8 registers, <code>r0</code> to <code>r7</code>, all starting at 0, and these instructions:</p>
<table>
<thead><tr><th>Instruction</th><th>Effect</th></tr></thead>
<tbody>
<tr><td><code>set r1 5</code></td><td>r1 = 5</td></tr>
<tr><td><code>mov r1 r2</code></td><td>r1 = r2</td></tr>
<tr><td><code>add r1 r2</code>, <code>sub r1 r2</code>, <code>mul r1 r2</code></td><td>r1 = r1 + r2 (or −, ×)</td></tr>
<tr><td><code>addi r1 -1</code></td><td>r1 = r1 + (a constant)</td></tr>
<tr><td><code>jmp done</code></td><td>jump to the label <code>done</code></td></tr>
<tr><td><code>jz r1 done</code></td><td>jump to <code>done</code> if r1 is 0</td></tr>
<tr><td><code>jlt r1 r2 loop</code></td><td>jump to <code>loop</code> if r1 &lt; r2</td></tr>
<tr><td><code>halt</code></td><td>stop</td></tr>
</tbody>
</table>
<p>A line ending in a colon, like <code>loop:</code>, is a label. Here is a program that computes r0 = 1 + 2 + … + r1, written like the compiler's loop above:</p>
<pre data-label="Teaching machine"><code>        set r0 0          # total
        set r2 1          # i
loop:   jlt r1 r2 done    # if n &lt; i, stop
        add r0 r2         # total += i
        addi r2 1         # i += 1
        jmp loop
done:   halt</code></pre>
<p>A simulator for this machine is a short Python program: find the labels, then fetch, decode and execute in a loop, exactly the cycle above. Writing it is this lesson's first programming problem, <em>Simulating the teaching machine</em>. Simulators like this are how processor designers test a new ISA before any hardware exists.</p>

<h3>Why read assembly?</h3>
<p>You will rarely write assembly. But reading it lets you see what the compiler really did: whether a loop was <em>vectorized</em> (rewritten to use instructions that each work on several numbers at once, for example adding four pairs of <code>int</code>s in one step), why a "harmless" change slowed a program down, what a crash in a library without source code was doing. Security work depends on it: malware analysis and finding vulnerabilities start from machine code. The online tool Compiler Explorer (godbolt.org) shows the assembly for C, C++, Rust and many other languages side by side with the source, and is a good place to experiment.</p>
`,
      terms: [
        ["Instruction set architecture", "The menu of machine instructions a processor family understands, such as x86-64 or ARM."],
        ["Assembly language", "Machine code written as human-readable text, one instruction per line."],
        ["Register", "A small, very fast storage cell inside the processor, holding one value."],
        ["Program counter", "The register holding the address of the next instruction to execute."],
        ["Fetch-decode-execute", "The cycle a processor repeats: read the next instruction, work out what it means, carry it out."],
        ["Conditional jump", "An instruction that changes the program counter only if a comparison came out a certain way."]
      ],
      quiz: [
        { q: "In AT&amp;T syntax, what does subq %rsi, %rax do?", choices: ["rsi = rsi − rax", "rax = rax − rsi", "rax = rsi", "It compares them"], answer: 1, why: "The destination comes last: rax −= rsi." },
        { q: "Where does a function's return value go on x86-64 Linux?", choices: ["%rdi", "%rsi", "%rax", "On the heap"], answer: 2, why: "By the calling convention, %rax holds the return value." },
        { q: "How does a C for loop appear in machine code?", choices: ["As a loop instruction with a counter", "As compares and conditional jumps backward to the body", "It can't be compiled", "As a function call"], answer: 1, why: "Machine code has only jumps; loops are built from them." },
        { q: "Why did the compiler use leaq (%rdi,%rdi,2) to multiply by 3?", choices: ["Multiplication isn't available", "It computes rdi + 2·rdi in one cheap instruction", "To save a register", "It's required by the calling convention"], answer: 1, why: "Compilers replace multiplication by small constants with cheaper address arithmetic." },
        { q: "In the teaching machine, what does r0 hold after: set r0 2; set r1 3; mul r0 r1; addi r0 -1; halt?", choices: ["5", "6", "4", "2"], answer: 0, why: "2 × 3 = 6, then 6 − 1 = 5." }
      ],
      practice: [
        {
          q: `<p>Trace the teaching-machine sum program with r1 = 3. List the instructions executed and the registers after each pass through the loop. How many instructions run in total?</p>`,
          a: `<p>Two <code>set</code>s, then four passes: (r2 = 1: jlt false, add → r0 = 1, addi → r2 = 2, jmp), (r0 = 3, r2 = 3), (r0 = 6, r2 = 4), then <code>jlt r1 r2</code> with 3 &lt; 4 jumps to <code>done</code>, and <code>halt</code>. Total: 2 + 3 × 4 + 1 + 1 = 16 instructions. r0 = 6.</p>`
        },
        {
          q: `<p>Write a teaching-machine program that sets r0 to the larger of r1 and r2.</p>`,
          a: `<pre data-label="Teaching machine"><code>        mov r0 r1
        jlt r2 r1 done    # if r2 &lt; r1, r1 is larger: keep it
        mov r0 r2
done:   halt</code></pre><p>Compare GCC's <code>max2</code>, which uses a "conditional move" (<code>cmovge</code>) instead of a jump: real processors run code faster when they don't have to guess which way a jump will go.</p>`
        },
        {
          q: `<p>Compile this function with <code>gcc -O1 -S</code> (or on godbolt.org) and explain each line of the output: <code>long f(long x) { return x * 8 + 1; }</code></p>`,
          a: `<p>A typical result is <code>leaq 1(,%rdi,8), %rax</code> then <code>ret</code>: one instruction computes 8·x + 1 using the address form from the notes (offset 1, no base, index rdi, scale 8: 1 + 8 · rdi) and puts it in rax. Exact output varies with compiler version, but you should see no multiply instruction. Many Linux compilers also put <code>endbr64</code> first: a marker instruction for a processor security feature (control-flow protection), which <code>-fcf-protection=none</code> turns off; the listings in the notes were made with it off.</p>`
        }
      ],
      sources: ["csapp", "patthen"]
    },
    {
      id: "sy6",
      title: "Procedures and the stack",
      minutes: 90,
      summary: "How function calls work in machine code: the call stack, stack frames, return addresses, the calling convention, recursion and stack overflow, and how buffer overflows on the stack let attackers take control.",
      notes: `
<p>CS 101 pictured the call stack as a pile of frames, one for each function call that hasn't returned. This lesson shows that the picture is literal: the stack is a region of memory, and a register points at its top.</p>

<h3>The stack in memory</h3>
<p>On x86-64 the register <code>%rsp</code>, the <strong>stack pointer</strong>, holds the address of the top of the stack. By long tradition the stack grows <em>downward</em>, toward lower addresses: pushing a value subtracts 8 from <code>%rsp</code> and writes the value there; popping reads it and adds 8. On Linux the main stack is 8 MB by default.</p>

<h3>Call and return</h3>
<p>Two instructions implement function calls:</p>
<ul>
<li><code>call f</code> pushes the <strong>return address</strong> (the address of the instruction after the call) onto the stack, then jumps to <code>f</code>.</li>
<li><code>ret</code> pops the return address from the stack and jumps to it.</li>
</ul>
<p>That's all a call is at the machine level. Because each call pushes its own return address, recursion works with no extra machinery: each pending call's return address waits on the stack in order.</p>

<h3>The calling convention</h3>
<p>Caller and callee must agree on where arguments and results go. This agreement is the <strong>calling convention</strong>. On Linux and macOS (the "System V" convention for x86-64):</p>
<ul>
<li>The first six integer or pointer arguments go in <code>%rdi</code>, <code>%rsi</code>, <code>%rdx</code>, <code>%rcx</code>, <code>%r8</code>, <code>%r9</code>; more go on the stack.</li>
<li>The return value goes in <code>%rax</code>.</li>
<li>Some registers are <strong>callee-saved</strong>: a function that uses them must restore their old values before returning. These are <code>%rbx</code>, <code>%rbp</code> and <code>%r12</code> to <code>%r15</code> (and <code>%rsp</code>, which every function must leave as it found it). The rest are <strong>caller-saved</strong>: <code>%rax</code>, <code>%rcx</code>, <code>%rdx</code>, <code>%rsi</code>, <code>%rdi</code> and <code>%r8</code> to <code>%r11</code>. Any call may change them, so a caller that needs one of their values after the call must save it first, for example by pushing it on the stack.</li>
</ul>
<p>Windows uses a different convention, one reason compiled code isn't portable between operating systems.</p>

<h3>Stack frames</h3>
<p>Each call's region of the stack is its <strong>stack frame</strong>: the return address, saved registers, and local variables that don't fit in registers. Here is a recursive factorial compiled without optimization (<code>-O0</code>), which keeps every variable in memory and so shows the frame clearly:</p>
<pre data-label="C"><code>long fact(long n) {
    if (n &lt;= 1) return 1;
    return n * fact(n - 1);
}</code></pre>
<pre data-label="x86-64"><code>fact:
    pushq   %rbp               # save the caller's frame pointer
    movq    %rsp, %rbp         # rbp marks this frame's base
    subq    $16, %rsp          # reserve 16 bytes for locals
    movq    %rdi, -8(%rbp)     # store n in the frame
    cmpq    $1, -8(%rbp)       # compare n with 1
    jg      .L2                # if n &gt; 1, recurse
    movl    $1, %eax           # return 1
    jmp     .L3
.L2:
    movq    -8(%rbp), %rax
    subq    $1, %rax
    movq    %rax, %rdi         # argument: n - 1
    call    fact               # push return address, jump
    imulq   -8(%rbp), %rax     # rax = fact(n - 1) * n
.L3:
    leave                      # rsp = rbp; pop rbp (undo the frame)
    ret                        # pop return address, jump back</code></pre>
<p>The notation <code>-8(%rbp)</code> means "the memory at address rbp − 8": the local copy of <em>n</em>. During <code>fact(3)</code>, three frames sit on the stack, each with its own <em>n</em>, saved <code>%rbp</code> and return address, just as in CS 101's picture.</p>
<figure class="fig"><svg viewBox="0 0 440 230" role="img" aria-label="The stack during fact(3) calling fact(2) calling fact(1): three frames stacked downward, each holding a return address, a saved frame pointer and its local n.">
<g class="box"><rect x="120" y="20" width="200" height="56"/><rect x="120" y="86" width="200" height="56"/><rect x="120" y="152" width="200" height="56"/></g>
<g class="text"><text x="220" y="40" text-anchor="middle">fact(3): return address</text><text x="220" y="62" text-anchor="middle" class="m">saved rbp, n = 3</text>
<text x="220" y="106" text-anchor="middle">fact(2): return address</text><text x="220" y="128" text-anchor="middle" class="m">saved rbp, n = 2</text>
<text x="220" y="172" text-anchor="middle">fact(1): return address</text><text x="220" y="194" text-anchor="middle" class="m">saved rbp, n = 1</text>
<text x="20" y="40" class="m">higher addresses</text><text x="20" y="200" class="m">lower addresses</text>
<text x="335" y="214">← rsp (top)</text></g>
<g class="ln"><line x1="60" y1="55" x2="60" y2="180"/></g>
</svg><figcaption>The stack grows downward. Each frame holds the return address its <code>call</code> pushed, the caller's saved frame pointer, and its own copy of <em>n</em>.</figcaption></figure>

<h3>Stack overflow</h3>
<p>Each frame uses stack space, so recursion that goes too deep (or never stops) uses up the stack. In C, the program crashes with a segmentation fault when it runs off the end; this is the original <strong>stack overflow</strong>. Python protects itself with a recursion limit (about 1,000 calls by default) and raises <code>RecursionError</code> before the real stack is exhausted.</p>

<h3>Buffer overflows on the stack</h3>
<p>Local arrays live in the stack frame, just below the saved frame pointer and the return address. If a function copies input into a local array without checking its length, input that is too long overwrites whatever lies above the array, including the return address. When the function executes <code>ret</code>, it jumps to an address chosen by whoever wrote the input.</p>
<pre data-label="C"><code>void greet(void) {
    char name[16];
    gets(name);                 /* reads a line of ANY length into 16 bytes */
    printf("Hello, %s\\n", name);
}</code></pre>
<p>This is a <strong>stack buffer overflow</strong>, one of the most important vulnerabilities in computing history. The Morris worm of 1988, one of the first worms to spread across the internet, used exactly this bug in a Unix network service that called <code>gets</code>. The function <code>gets</code> can never be used safely, and was removed from the C standard in 2011. Its replacement, <code>fgets(name, sizeof name, stdin)</code>, takes the buffer size. With a buffer of <em>n</em> bytes, <code>fgets</code> reads characters from standard input (<code>stdin</code>) until it has read a newline or <em>n</em> − 1 characters, whichever comes first, and then adds the terminator, so it never writes past the buffer. If the whole line fits, the newline is kept as the last character before the terminator. If the line is too long, the rest of it, newline included, stays unread in the input, where the next read will find it. <code>fgets</code> returns <code>NULL</code> if there was no input left to read.</p>
<p>Modern systems add layers of defense, none of which makes unchecked copying safe:</p>
<ul>
<li><strong>Stack canaries:</strong> the compiler places a random value between local arrays and the return address and checks it before returning; an overflow that reaches the return address changes the canary and the program stops.</li>
<li><strong>Non-executable stacks:</strong> the processor refuses to run instructions stored in stack memory, so attackers can't simply jump into code they injected there.</li>
<li><strong>Address space layout randomization (ASLR):</strong> the stack, heap and libraries are placed at random addresses each run, so an attacker doesn't know where to jump.</li>
</ul>
<p>Attackers have found ways around each defense individually, which is why the real fix is code that never writes out of bounds, and why memory-safe languages matter (Lesson 4).</p>
`,
      terms: [
        ["Stack pointer", "The register (%rsp on x86-64) holding the address of the top of the stack."],
        ["Return address", "The address of the instruction after a call, pushed by call and popped by ret."],
        ["Calling convention", "The agreement on where arguments, return values and saved registers go during a call."],
        ["Stack frame", "A call's region of the stack: its return address, saved registers and local variables."],
        ["Stack overflow", "Running out of stack space, usually from recursion that is too deep."],
        ["Stack buffer overflow", "Writing past the end of a local array, which can overwrite the return address."],
        ["Stack canary", "A random value placed before the return address and checked on return, to detect overflows."]
      ],
      quiz: [
        { q: "What does the call instruction do?", choices: ["Jumps only", "Pushes the return address, then jumps", "Pops the return address", "Saves every register"], answer: 1, why: "ret later pops that address to come back." },
        { q: "Where is the third integer argument passed on x86-64 Linux?", choices: ["%rdi", "%rsi", "%rdx", "On the stack"], answer: 2, why: "The order is rdi, rsi, rdx, rcx, r8, r9." },
        { q: "Why can a stack buffer overflow let an attacker run code of their choice?", choices: ["It deletes the program", "It can overwrite the return address, so ret jumps where the attacker chose", "It changes the source code", "It disables the stack"], answer: 1, why: "The return address sits above local arrays in the frame." },
        { q: "Why does recursion need no special support in machine code?", choices: ["It doesn't work in C", "Each call pushes its own return address and frame, so pending calls wait on the stack in order", "Compilers turn it into loops", "The heap handles it"], answer: 1, why: "The stack keeps every pending call's state separate." },
        { q: "What does a stack canary detect?", choices: ["Memory leaks", "Overwriting of the region between local arrays and the return address", "Division by zero", "Uninitialized variables"], answer: 1, why: "The canary is checked before the function returns." }
      ],
      practice: [
        {
          q: `<p>During a call to <code>fact(4)</code> compiled as above, how many <code>fact</code> frames are on the stack at the deepest point, and how many bytes do they use, given that each frame holds a return address (8 bytes), a saved <code>%rbp</code> (8 bytes) and 16 bytes of locals?</p>`,
          a: `<p>fact(4), fact(3), fact(2), fact(1): 4 frames of 8 + 8 + 16 = 32 bytes, so 128 bytes. With an 8 MB stack, about 260,000 nested calls fit before overflowing.</p>`
        },
        {
          q: `<p>Explain why the function below is wrong even though it compiles, and fix it. <code>int *make_counter(void) { int count = 0; return &amp;count; }</code></p>`,
          a: `<p><code>count</code> lives in <code>make_counter</code>'s stack frame, which is released when the function returns; the next call reuses that memory, so the returned pointer dangles. Fix: allocate on the heap (<code>int *c = malloc(sizeof *c); *c = 0; return c;</code>, and have the caller free it), or let the caller pass in a pointer to its own variable.</p>`
        },
        {
          q: `<p>Rewrite <code>greet</code> safely with <code>fgets</code>. What happens to input longer than the buffer?</p>`,
          a: `<pre data-label="C"><code>void greet(void) {
    char name[16];
    if (fgets(name, sizeof name, stdin) == NULL) return;
    name[strcspn(name, "\\n")] = '\\0';   /* drop the newline, if any */
    printf("Hello, %s\\n", name);
}</code></pre><p><code>fgets</code> stores at most 15 characters plus the terminator; the rest of a long line stays unread in the input. (<code>strcspn</code>, from <code>&lt;string.h&gt;</code>, finds the position of the newline.)</p>`
        }
      ],
      sources: ["csapp", "aleph1"]
    },
    {
      id: "sy7",
      title: "Caches and the memory hierarchy",
      minutes: 90,
      summary: "Why memory access, not arithmetic, usually limits speed: the memory hierarchy, locality, cache lines, how a cache decides where data goes, hits and misses, and how loop order can make the same computation ten times faster.",
      notes: `
<p>Asymptotic analysis (CS 201) counts steps as if every memory access cost the same. On real machines they differ enormously. The same Θ(<em>n</em>²) loop can run ten times faster or slower depending only on the order in which it touches memory. This lesson explains why.</p>

<h3>The memory hierarchy</h3>
<p>Fast memory is expensive and small; large memory is cheap and slow. So computers use a hierarchy, each level a smaller, faster copy of part of the level below. Rough figures for a modern laptop:</p>
<table>
<thead><tr><th>Level</th><th>Typical size</th><th>Time to access</th></tr></thead>
<tbody>
<tr><td>Registers</td><td>a few hundred bytes</td><td>under 1 ns (about 1 cycle)</td></tr>
<tr><td>L1 cache</td><td>32–64 KB per core</td><td>about 1 ns (4 cycles)</td></tr>
<tr><td>L2 cache</td><td>0.5–2 MB per core</td><td>about 4 ns</td></tr>
<tr><td>L3 cache</td><td>tens of MB, shared</td><td>about 10–20 ns</td></tr>
<tr><td>Main memory (DRAM)</td><td>8–64 GB</td><td>about 80–100 ns</td></tr>
<tr><td>SSD</td><td>about a terabyte</td><td>about 100 µs (100,000 ns)</td></tr>
<tr><td>Hard disk</td><td>several terabytes</td><td>about 5–10 ms</td></tr>
</tbody>
</table>
<p>A processor running at 3 GHz can do hundreds of simple operations in the time one main-memory access takes. If it had to wait for memory on every access, it would spend nearly all its time waiting. Caches hide most of that wait, but only if programs use memory in a way caches can exploit.</p>

<h3>Locality</h3>
<p>Caches work because most programs show <strong>locality</strong>:</p>
<ul>
<li><strong>Temporal locality:</strong> data used recently is likely to be used again soon (a loop counter, a running total, the top of the stack).</li>
<li><strong>Spatial locality:</strong> data near recently used data is likely to be used soon (the next item of an array).</li>
</ul>
<p>To exploit spatial locality, caches move memory in blocks called <strong>cache lines</strong>, 64 bytes on current x86 and most ARM processors. Reading one <code>int</code> brings in the 15 neighboring <code>int</code>s too, so walking through an array sequentially costs one slow access per 16 elements.</p>

<h3>How a cache finds data</h3>
<p>A cache has a fixed number of slots, each holding one line. When the processor asks for an address, the cache must decide which slot could hold it. In a <strong>direct-mapped</strong> cache, each memory line can go in exactly one slot. The address is split into three fields:</p>
<pre data-label="Address"><code>| tag | index | offset |</code></pre>
<ul>
<li>The <strong>offset</strong> picks the byte within the line: with 64-byte lines, the low 6 bits.</li>
<li>The <strong>index</strong> picks the slot: with 512 slots, the next 9 bits.</li>
<li>The <strong>tag</strong> is the remaining high bits. The slot stores the tag of the line it holds, so the cache can check whether it's the right one.</li>
</ul>
<p>If the slot holds the right tag, the access is a <strong>hit</strong>. Otherwise it's a <strong>miss</strong>: the line is fetched from the next level and replaces whatever was in the slot.</p>
<p><strong>Worked example.</strong> A tiny direct-mapped cache has 4 slots of 16 bytes. So the offset is the low 4 bits of an address, the index the next 2 bits, and the tag the rest. Access addresses 0, 4, 64, 0, 20 in that order:</p>
<table>
<thead><tr><th>Address</th><th>Line (address // 16)</th><th>Index (line % 4)</th><th>Tag (line // 4)</th><th>Result</th></tr></thead>
<tbody>
<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>miss (slot 0 empty)</td></tr>
<tr><td>4</td><td>0</td><td>0</td><td>0</td><td>hit (same line)</td></tr>
<tr><td>64</td><td>4</td><td>0</td><td>1</td><td>miss; evicts line 0</td></tr>
<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>miss; evicts line 4</td></tr>
<tr><td>20</td><td>1</td><td>1</td><td>0</td><td>miss (slot 1 empty)</td></tr>
</tbody>
</table>
<p>Addresses 0 and 64 fight over slot 0 even though the rest of the cache is empty: a <strong>conflict miss</strong>. A <strong>set-associative</strong> cache reduces this by letting each line go in any of several slots (a <em>set</em>); when the set is full, it usually evicts the <strong>least recently used</strong> (LRU) line. A cache whose sets have <em>k</em> slots is called <em>k</em>-way set associative. The address is split in the same three fields, but the index now chooses a <em>set</em> instead of a slot: a cache with <em>S</em> sets uses log₂ <em>S</em> index bits, and the cache compares the tag with every slot of that set. (A direct-mapped cache is the 1-way case, with one slot per set.) Real L1 caches are typically 8- to 12-way set associative.</p>
<p>Misses come in three kinds. A <strong>compulsory miss</strong> happens on the first use of a line, which can't already be in the cache. A <strong>capacity miss</strong> happens when the program's <strong>working set</strong>, the data it uses during a stretch of time, is larger than the whole cache, so lines are evicted before they're used again. A <strong>conflict miss</strong>, as above, happens when lines compete for the same slot or set although other parts of the cache are free. More associativity reduces conflict misses; a bigger cache reduces capacity misses.</p>

<h3>Loop order matters</h3>
<p>The example in this section uses three pieces of C not yet shown. <code>#define N 4096</code> gives the constant 4096 a name: before compiling, every <code>N</code> in the file is replaced by 4096 (Lesson 8 shows the stage that does this). <code>int grid[N][N]</code> is a <strong>two-dimensional array</strong>, N rows of N <code>int</code>s, stored as one block, and <code>grid[r][c]</code> is the item in row <em>r</em> and column <em>c</em>. Because <code>grid</code> is declared outside any function, it is a global variable: it lives in the fixed region for globals (Lesson 4) instead of on the stack, which at 8 MB (Lesson 6) is far too small for 64 MB. The word <code>static</code> in front of it keeps the name private to this file, so other files linked with it (Lesson 8) can't see it.</p>
<p>C stores a two-dimensional array <strong>row by row</strong> ("row-major" order): <code>grid[r][c]</code> and <code>grid[r][c + 1]</code> are neighbors in memory, while <code>grid[r + 1][c]</code> is a whole row away. Summing the same array in two orders:</p>
<pre data-label="C"><code>#include &lt;stdio.h&gt;
#include &lt;time.h&gt;

#define N 4096
static int grid[N][N];              /* 4096 x 4096 ints = 64 MB */

int main(void) {
    for (int r = 0; r &lt; N; r++)     /* fill grid, so the memory is really in use */
        for (int c = 0; c &lt; N; c++)
            grid[r][c] = r + c;

    long total = 0;
    clock_t start = clock();
    for (int r = 0; r &lt; N; r++)     /* row by row: neighbors in memory */
        for (int c = 0; c &lt; N; c++)
            total += grid[r][c];
    double rows = (double)(clock() - start) / CLOCKS_PER_SEC;

    start = clock();
    for (int c = 0; c &lt; N; c++)     /* column by column: 16 KB jumps */
        for (int r = 0; r &lt; N; r++)
            total += grid[r][c];
    double cols = (double)(clock() - start) / CLOCKS_PER_SEC;

    printf("total %ld\\n", total);
    printf("rows %.3f s, columns %.3f s\\n", rows, cols);
    return 0;
}</code></pre>
<pre data-label="Output"><code>total 137405399040
rows 0.013 s, columns 0.152 s</code></pre>
<p>To time part of a program, <code>clock()</code> from <code>&lt;time.h&gt;</code> returns the processor time the program has used so far, as a <code>clock_t</code> count of ticks. As with Python's <code>time.perf_counter()</code> (CS 102 Lesson 5), one reading means nothing, but the difference between two readings is the time in between, and dividing by the constant <code>CLOCKS_PER_SEC</code> turns ticks into seconds. The <code>(double)</code> in front converts the tick count to a <code>double</code> first, so the division isn't integer division. To time a whole program instead, put the shell command <code>time</code> in front of it: <code>time ./grid</code> runs the program and then prints how long it took (<code>real</code> is the time on a wall clock).</p>
<p>The fill loop matters because of how the operating system hands out memory. A global array starts as all zeros, and until the program writes to it, the operating system doesn't give it real memory of its own: every page of it is mapped to one shared page of zeros (Operating Systems explains this). Summing an unwritten array would keep reading that same small page, which stays in the cache, and both orders would look fast. Writing every element first makes the 64 MB really exist in memory. The program prints <code>total</code> so that the compiler can't decide the sums are unused and delete the loops.</p>
<p>Compile it with <code>gcc -Wall -O1 -o grid grid.c</code> and run <code>./grid</code>. Both loops add the same 16 million numbers; the column-by-column loop was about 10 times slower on the test machine. The row loop uses all 16 <code>int</code>s of each cache line it fetches. The column loop jumps 16 KB at each step, uses one <code>int</code> per line, and by the time it comes back for the line's next <code>int</code>, the line has long been evicted.</p>
<p>The lesson generalizes. In matrix multiplication, reordering the three nested loops so the innermost loop walks along rows can make it several times faster with identical arithmetic. Libraries go further, splitting matrices into small blocks that fit in the cache ("blocking" or "tiling"). This is also why Python lists of lists are slow for numerical work: each row is a separate object, and each number is itself a separate object reached by a pointer, scattered through memory. NumPy arrays store numbers contiguously, like C arrays.</p>
`,
      terms: [
        ["Memory hierarchy", "Layers of storage from small and fast (registers, caches) to large and slow (DRAM, disks)."],
        ["Temporal locality", "The tendency to reuse recently accessed data soon."],
        ["Spatial locality", "The tendency to access data near recently accessed data."],
        ["Cache line", "The block of memory (usually 64 bytes) moved into or out of a cache at once."],
        ["Cache hit / miss", "Whether requested data is already in the cache, or must be fetched from a slower level."],
        ["Direct-mapped cache", "A cache in which each memory line can be stored in only one slot, chosen by the index bits."],
        ["Set-associative cache", "A cache in which each line can go in any slot of one small set; a full set evicts, often, the least recently used line."],
        ["Row-major order", "Storing a 2-D array row by row, as C does."]
      ],
      quiz: [
        { q: "Roughly how many times slower is a main-memory access than an L1 cache access?", choices: ["About 2", "About 100", "About 1,000,000", "They're the same"], answer: 1, why: "About 1 ns versus about 100 ns." },
        { q: "Summing an int array sequentially with 64-byte cache lines causes about how many misses per element?", choices: ["1", "1/16", "16", "0"], answer: 1, why: "Each line holds 16 four-byte ints; one miss brings in all 16." },
        { q: "A direct-mapped cache has 64-byte lines and 256 slots. How many bits are the offset and index?", choices: ["6 and 8", "8 and 6", "64 and 256", "5 and 7"], answer: 0, why: "2⁶ = 64 bytes per line and 2⁸ = 256 slots." },
        { q: "Why is summing a C array column by column slow?", choices: ["It does more additions", "Each access is in a different cache line, so most accesses miss", "C forbids it", "It overflows"], answer: 1, why: "Row-major storage puts column neighbors a whole row apart." },
        { q: "Which kind of miss does set associativity reduce?", choices: ["Compulsory misses, on a line's first use", "Conflict misses, where lines compete for one slot", "Capacity misses, from a working set larger than the cache", "Disk misses"], answer: 1, why: "Several slots per set let competing lines coexist. A line's first use misses however the cache is organized, and a working set larger than the whole cache needs a bigger cache." }
      ],
      practice: [
        {
          q: `<p>Continue the worked example's 4-slot direct-mapped cache (16-byte lines) with the accesses 68, 0, 36, 4. State hit or miss for each and the cache contents at the end.</p>`,
          a: `<p>After the example, slot 0 holds line 0 and slot 1 holds line 1. 68: line 4, index 0, tag 1: miss, evicts line 0. 0: line 0, index 0: miss, evicts line 4. 36: line 2, index 2: miss (slot 2 empty). 4: line 0: hit. Final: slot 0 = line 0, slot 1 = line 1, slot 2 = line 2, slot 3 empty.</p>`
        },
        {
          q: `<p>A 32 KB, 8-way set-associative cache has 64-byte lines. How many lines, sets, and index bits does it have?</p>`,
          a: `<p>32,768 / 64 = 512 lines; 512 / 8 = 64 sets; log₂ 64 = 6 index bits (with 6 offset bits, the tag is the rest of the address).</p>`
        },
        {
          q: `<p>Save the row-versus-column program from the notes as <code>grid.c</code>, compile it with <code>gcc -Wall -O1 -o grid grid.c</code> on your own computer and run it. Then change <code>N</code> to 256. What happens to the ratio, and why?</p>`,
          hint: `<p>At N = 256 each sum takes well under a millisecond, too short for <code>clock()</code> to measure, so the program may print 0.000 for both. Put each pair of summing loops inside <code>for (int rep = 0; rep &lt; 256; rep++)</code> so each order sums the array 256 times.</p>`,
          a: `<p>At N = 4096 the column order is typically 5–15 times slower (about 10 on the test machine). At N = 256 the array is 256 KB, small enough to fit in the L2 cache, so after the first pass the column order's misses in L1 are served by L2, a few nanoseconds away, instead of by main memory. With each loop repeated 256 times, the test machine took 0.005 s by rows and 0.016 s by columns: the ratio fell from about 10 to about 3. Locality matters most when the data is larger than the cache.</p>`
        },
        {
          q: `<p>For the matrix product C = AB of n × n arrays in C, the obvious loop order is <code>i, j, k</code> with <code>C[i][j] += A[i][k] * B[k][j]</code>. Which array is accessed with poor locality in the innermost loop? Suggest a reordering that fixes it.</p>`,
          a: `<p>With <em>k</em> innermost, <code>B[k][j]</code> walks down a column of B: a stride of a whole row each step. Ordering the loops <code>i, k, j</code> makes the innermost loop walk along row <em>k</em> of B and row <em>i</em> of C, both sequential, while <code>A[i][k]</code> stays fixed. The arithmetic is identical; only the access pattern changes.</p>`
        }
      ],
      sources: ["csapp", "patthen"]
    },
    {
      id: "sy8",
      title: "Linking, processes and system calls",
      minutes: 90,
      summary: "What gcc does in its four stages, how the linker joins object files and libraries by symbol name, what a process is and how Unix creates one with fork and exec, and how programs ask the operating system for services through system calls.",
      notes: `
<p>This last lesson looks at the program as a whole: how separate source files become one executable, how that executable becomes a running process, and how the process talks to the operating system. It leads directly into Operating Systems in Year 3.</p>

<h3>Inside gcc</h3>
<p>The <code>gcc</code> command runs four programs in sequence. You can stop after any of them:</p>
<table>
<thead><tr><th>Stage</th><th>Command</th><th>Produces</th></tr></thead>
<tbody>
<tr><td>1. Preprocess</td><td><code>gcc -E prog.c</code></td><td>C with <code>#include</code> files pasted in and <code>#define</code> macros replaced</td></tr>
<tr><td>2. Compile</td><td><code>gcc -S prog.c</code></td><td>Assembly, <code>prog.s</code> (Lesson 5)</td></tr>
<tr><td>3. Assemble</td><td><code>gcc -c prog.c</code></td><td>An <strong>object file</strong>, <code>prog.o</code>: machine code with unresolved names</td></tr>
<tr><td>4. Link</td><td><code>gcc prog.o util.o -o prog</code></td><td>An executable</td></tr>
</tbody>
</table>
<p>Large programs are split into many source files, each compiled separately to an object file. After a change, only the changed files need recompiling, which is what build tools like <code>make</code> organize.</p>

<h3>Linking and symbols</h3>
<p>An object file contains machine code plus a <strong>symbol table</strong>: the names it defines (functions and global variables) and the names it uses but doesn't define. A call to <code>printf</code> in <code>prog.o</code> is just a placeholder saying "the address of <code>printf</code> goes here". The <strong>linker</strong> collects all the object files and libraries, matches every use of a name with exactly one definition, decides where everything goes in memory, and fills in the addresses.</p>
<p>The tool <code>nm</code> lists an object file's symbols: <code>T</code> means a function defined here, <code>U</code> means undefined (needed from elsewhere). The two classic linker errors follow from the matching rule:</p>
<ul>
<li><strong>undefined reference to 'foo'</strong>: something uses <code>foo</code> but no file or library defines it (you forgot a file, a library, or misspelled a name).</li>
<li><strong>multiple definition of 'foo'</strong>: two files define the same global name.</li>
</ul>
<p>A <strong>header file</strong> (<code>util.h</code>) contains only declarations, such as <code>int square(int x);</code>, so that every file using <code>square</code> knows its type; exactly one <code>.c</code> file contains the definition. Your own header is included with quotation marks instead of angle brackets:</p>
<pre data-label="C"><code>/* util.h */
int square(int x);

/* util.c */
#include "util.h"

int square(int x) {
    return x * x;
}

/* prog.c */
#include &lt;stdio.h&gt;
#include "util.h"

int main(void) {
    printf("%d\\n", square(7));      /* 49 */
    return 0;
}</code></pre>
<pre data-label="Shell"><code>gcc -Wall -c prog.c          # makes prog.o
gcc -Wall -c util.c          # makes util.o
gcc prog.o util.o -o prog    # links them
./prog</code></pre>
<p><code>#include "util.h"</code> looks first in the folder of the file being compiled, then in the system's folders. <code>#include &lt;util.h&gt;</code> looks only in the system's folders, where the standard headers such as <code>stdio.h</code> live, so it fails with <code>fatal error: util.h: No such file or directory</code>. <code>util.c</code> includes its own header too, so the compiler checks that the declaration matches the definition.</p>

<h3>Libraries</h3>
<p>A <strong>library</strong> is a bundle of object files. A <em>static</em> library (<code>libm.a</code>) is copied into the executable at link time. A <em>shared</em> (dynamic) library (<code>libc.so</code> on Linux, <code>.dylib</code> on macOS, <code>.dll</code> on Windows) is linked when the program starts, and one copy in memory is shared by every program using it. A security fix to a shared library helps every program at once; the cost is that a program can break if the library it finds at run time differs from the one it was built with. <code>ldd prog</code> lists the shared libraries a Linux program needs.</p>

<h3>Processes</h3>
<p>A <strong>program</strong> is a file of machine code. A <strong>process</strong> is a program running: its memory (code, stack, heap), its registers, its open files, and an identifying number, its <strong>process ID</strong>. The operating system gives each process the illusion of having the whole machine to itself. Each process has its own <em>virtual</em> address space, so address 0x1000 in one process is unrelated to address 0x1000 in another, and the operating system switches the processor between processes many times a second. Operating Systems covers how.</p>
<p>Unix creates processes in two steps. <code>fork()</code> makes an almost exact copy of the calling process; both copies continue from the same point, but <code>fork</code> returns 0 in the new child and the child's process ID in the parent. <code>exec</code> then replaces the child's program with a different one. The parent can <code>wait</code> for the child to finish and read its exit code (the value <code>main</code> returned).</p>
<pre data-label="C"><code>#include &lt;stdio.h&gt;
#include &lt;unistd.h&gt;
#include &lt;sys/wait.h&gt;

int main(void) {
    pid_t pid = fork();                 /* now two processes are running this code */
    if (pid == 0) {
        printf("child: my pid is %d\\n", getpid());
        fflush(stdout);                 /* exec would discard unprinted output */
        execlp("echo", "echo", "hello from echo", (char *)NULL);
        perror("execlp");               /* only reached if exec failed */
        return 1;
    }
    int status;
    waitpid(pid, &amp;status, 0);           /* the parent waits for the child */
    printf("parent: child %d exited with %d\\n", pid, WEXITSTATUS(status));
    return 0;
}</code></pre>
<pre data-label="Output"><code>child: my pid is 4218
hello from echo
parent: child 4218 exited with 0</code></pre>
<p>(The process ID differs every run.) The new names in the program:</p>
<ul>
<li><code>pid_t</code> is the integer type for process IDs, and <code>getpid()</code> returns the current process's ID.</li>
<li><code>execlp(file, arg0, arg1, …, (char *)NULL)</code> runs the program <code>file</code>, searching the folders where the shell looks for commands (that's the <code>p</code>; the <code>l</code> means the arguments are given as a list). The remaining arguments become the new program's command-line arguments, the strings a Python program would find in <code>sys.argv</code>. By convention the first of them, argument 0, is the program's own name. That is why <code>"echo"</code> appears twice: once to say which file to run, and once as argument 0. A C function can't count how many arguments it was given, so the list ends with a null pointer as a marker. The cast <code>(char *)</code> makes that <code>NULL</code> a pointer of the same type as the strings.</li>
<li><code>perror("execlp")</code> prints its argument, a colon and a description of the last error (taken from <code>errno</code>, Lesson 3), for example <code>execlp: No such file or directory</code>. It is reached only if <code>execlp</code> failed: when it succeeds, the child is running <code>echo</code> and never comes back to this code.</li>
<li><code>waitpid(pid, &amp;status, 0)</code> waits until the child with that ID ends, then stores information about how it ended in <code>status</code>, through the pointer (Lesson 4). The 0 means no special options.</li>
<li><code>status</code> packs several facts into one <code>int</code>, and the macro <code>WEXITSTATUS(status)</code> extracts the exit code, the value the child's <code>main</code> returned.</li>
</ul>
<p>This is exactly what a shell does for every command you type: fork, exec the command in the child, wait. The <code>fflush</code> line is a lesson in itself: <code>printf</code> collects output in a buffer in the process's memory, and <code>exec</code> replaces that memory, so anything not yet written out would be lost.</p>

<h3>System calls</h3>
<p>A process can't touch hardware or other processes directly. To read a file, print, allocate more memory, or create a process, it asks the operating system's <strong>kernel</strong> through a <strong>system call</strong>: a special instruction that switches the processor into a privileged mode and runs kernel code on the process's behalf. <code>fork</code>, <code>execve</code>, <code>read</code>, <code>write</code> and <code>open</code> are system calls; library functions like <code>printf</code> and <code>malloc</code> are ordinary code that makes system calls when it needs to. "Exec" is the name of a whole family. Only <code>execve(path, argv, envp)</code> is a system call: it takes the program's full path, an array of argument strings and an array of environment settings. The others, such as the <code>execlp</code> used above, are functions in the C library that do the convenient parts in ordinary code, such as collecting the arguments from a list or searching the command folders, and then call <code>execve</code>.</p>
<p>Open files are identified by small integers called <strong>file descriptors</strong>. Every process starts with three: 0 is standard input, 1 standard output, 2 standard error. When a shell runs <code>sort &lt; in.txt &gt; out.txt</code>, it opens the files in the child before exec, arranging for descriptor 0 to be <code>in.txt</code> and 1 to be <code>out.txt</code>; <code>sort</code> just reads 0 and writes 1, never knowing. A pipe (<code>ls | sort</code>, from CS 101's sidebar on Unix) connects one process's descriptor 1 to another's descriptor 0.</p>
<pre data-label="C"><code>#include &lt;unistd.h&gt;

int main(void) {
    write(1, "hi\\n", 3);      /* file descriptor 1 is standard output */
    return 0;
}</code></pre>
<p>On Linux, <code>strace</code> prints every system call a program makes; running the program above under <code>strace -e trace=write</code> shows <code>write(1, "hi\\n", 3) = 3</code>, the return value being the number of bytes written. Try <code>strace -c python3 -c "print(1)"</code> to see how many system calls even a tiny Python program makes as it starts.</p>
`,
      terms: [
        ["Object file", "The output of compiling and assembling one source file: machine code plus a symbol table, with external names unresolved."],
        ["Linker", "The program that combines object files and libraries, matches each used symbol to one definition, and fills in addresses."],
        ["Symbol", "A name of a function or global variable that a file defines or uses."],
        ["Shared library", "A library linked when a program starts, with one copy in memory shared by all programs using it."],
        ["Process", "A running program: its memory, registers, open files and process ID."],
        ["fork and exec", "Unix's way to start a program: fork copies the current process; exec replaces the copy's program."],
        ["System call", "A request from a process to the operating system kernel, made with a special instruction."],
        ["File descriptor", "A small integer identifying an open file in a process; 0, 1 and 2 are standard input, output and error."]
      ],
      quiz: [
        { q: "Which gcc option stops after producing an object file?", choices: ["-E", "-S", "-c", "-o"], answer: 2, why: "-c compiles and assembles but doesn't link." },
        { q: "The linker reports \"undefined reference to 'parse_line'\". What is the likely cause?", choices: ["A syntax error in parse_line", "No object file or library being linked defines parse_line", "parse_line is defined twice", "The header file is missing a semicolon"], answer: 1, why: "Every used symbol needs exactly one definition at link time." },
        { q: "What does fork() return in the child process?", choices: ["The child's process ID", "The parent's process ID", "0", "−1"], answer: 2, why: "The parent gets the child's ID; the child gets 0." },
        { q: "Which of these is a system call rather than an ordinary library function?", choices: ["printf", "strlen", "write", "sqrt"], answer: 2, why: "write asks the kernel to output bytes; printf formats text and then calls write." },
        { q: "In `sort &lt; in.txt`, how does sort read the file?", choices: ["It opens in.txt itself", "The shell arranges for file descriptor 0 to refer to in.txt before running sort", "The kernel copies the file into sort's code", "Through a pipe from cat"], answer: 1, why: "sort just reads standard input." }
      ],
      practice: [
        {
          q: `<p>A program is split into <code>main.c</code> (which calls <code>average</code>) and <code>stats.c</code> (which defines it). Write <code>stats.h</code>, show the <code>#include</code> line in <code>main.c</code>, and give the commands that compile each file separately and link them.</p>`,
          a: `<pre data-label="C"><code>/* stats.h */
double average(const double xs[], int n);

/* main.c starts with */
#include "stats.h"</code></pre><pre data-label="Shell"><code>gcc -Wall -c main.c        # makes main.o
gcc -Wall -c stats.c       # makes stats.o
gcc main.o stats.o -o app  # links them</code></pre><p>Quotation marks in <code>#include "stats.h"</code> look in the current folder; angle brackets look in the system's folders. <code>stats.c</code> should include <code>stats.h</code> too, so the compiler checks that the declaration matches the definition.</p>`
        },
        {
          q: `<p>How many lines does this program print, and why? <code>int main(void) { fork(); fork(); printf("hi\\n"); return 0; }</code></p>`,
          a: `<p>4. The first <code>fork</code> makes 2 processes; each runs the second <code>fork</code>, making 4; each of the 4 prints once. With <em>k</em> forks in a row, 2<sup><em>k</em></sup> processes print.</p>`
        },
        {
          q: `<p>Run <code>strace -c ls</code> (on Linux) and list the three system calls it makes most often. What is each for?</p>`,
          a: `<p>Typical answers include <code>mmap</code> (mapping files and memory, for example loading shared libraries), <code>openat</code>/<code>close</code> (opening files such as libraries and the directory), <code>newfstatat</code>/<code>fstat</code> (getting file information), <code>getdents64</code> (reading directory entries) and <code>write</code> (printing the listing). The exact counts depend on the system; the point is that even a simple command makes dozens of system calls, most of them during startup.</p>`
        }
      ],
      sources: ["csapp", "ostep"]
    }
]);

CSA.addAsides("cs210", {
  sy1: [
    { kind: "history", title: "Gulliver's eggs", html: `<p>The terms big-endian and little-endian come from <em>Gulliver's Travels</em> (1726), in which two nations go to war over which end of a boiled egg to crack. Danny Cohen borrowed them in a 1980 note, "On Holy Wars and a Plea for Peace", arguing that the choice of byte order mattered far less than everyone agreeing on one. Networks did agree, on big-endian; processors never did, though little-endian has largely won.</p>` }
  ],
  sy2: [
    { kind: "history", title: "The Pentium division bug", html: `<p>In 1994, mathematician Thomas Nicely noticed that Intel's new Pentium processor occasionally gave wrong answers to floating-point division, wrong in the fourth significant digit or later. A few entries were missing from a lookup table in the chip's division hardware. Intel at first offered replacements only to customers who could show they needed them, then, after public outcry, to everyone, at a cost of about $475 million. The episode is a reason hardware arithmetic is now verified with mathematical proof tools.</p>` }
  ],
  sy3: [
    { kind: "lang", title: "C's family", html: `<p>C descends from BCPL (1967) through Ken Thompson's B (1969). Brian Kernighan and Dennis Ritchie's book <em>The C Programming Language</em> (1978), known as "K&amp;R", defined the language until ANSI standardized it in 1989. Bjarne Stroustrup's C++ (1985) added classes and later templates on top of C; Objective-C (1984) added Smalltalk-style messages and became the language of Apple's platforms. Java (1995) and C# (2000) kept C's braces and syntax while adding garbage collection and bounds checking. Go (2009) and Rust (2015) are recent systems languages designed to keep C's speed while removing whole classes of its bugs.</p>`, sources: ["kr"] }
  ],
  sy6: [
    { kind: "ethics", title: "The first internet worm", html: `<p>On 2 November 1988, Robert Tappan Morris, a Cornell graduate student, released a self-copying program that exploited a stack buffer overflow in the <code>fingerd</code> network service, along with weak passwords and a debugging feature in the mail system. A bug made it reinfect machines far more aggressively than intended, and it slowed or stopped thousands of the roughly 60,000 computers then on the internet. Morris became the first person convicted under the U.S. Computer Fraud and Abuse Act. The incident led to the creation of the first Computer Emergency Response Team (CERT) and to decades of work on the vulnerability class it used.</p>` }
  ]
});
