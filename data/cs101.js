CSA.addCourse({
  id: "cs101",
  code: "CS 101",
  title: "Programming I",
  credits: 4,
  kind: "required",
  term: "y1f",
  summary: "Learn to write, run, test and debug programs in Python. The course starts from installing Python and builds through values, decisions, loops, functions, strings and collections, recursion, files, and the first ideas about efficiency, and ends with the everyday tools working programmers use.",
  prereqs: [],
  outcomes: [
    "Install Python, run programs from a terminal, and read error messages calmly",
    "Read and write Python programs that use variables, conditionals, loops and functions",
    "Break a problem into small functions with clear inputs, outputs and contracts",
    "Choose between strings, lists, tuples, dictionaries and sets for a task",
    "Think recursively and recognize when recursion is the natural fit",
    "Read and write files, organize code into modules, and use the standard library",
    "Compare algorithms by how their running time grows",
    "Write tests, trace code by hand, debug methodically, and use Git"
  ],
  rubric: {
    criteriaFor: "problem sets and projects",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your two lowest quiz scores are dropped." },
      { name: "Weekly problem sets", weight: 30, desc: "Programs based on each week's practice problems, submitted with a short note on how you tested them. Graded with the criteria below." },
      { name: "Programming projects", weight: 20, desc: "Two larger programs, due in week 6 and week 13, that combine several units. Each includes a five-minute walkthrough where you explain your code." },
      { name: "Midterm exam", weight: 15, desc: "Reading and tracing code, predicting output, and writing short functions by hand. Covers lessons 1–6, from setup through lists and dictionaries." },
      { name: "Final exam", weight: 20, desc: "Cumulative, with emphasis on lessons 7–11: recursion, testing, files, efficiency, and tools." },
      { name: "Participation", weight: 5, desc: "Coming to section or office hours, and one short reflection every two weeks on what you found hardest and how you worked through it." }
    ],
    criteria: [
      { name: "Correctness", desc: "Does it work?", levels: [
        "Produces correct results for typical, edge and error cases.",
        "Correct for typical cases; misses one or two edge cases.",
        "Works for some typical cases; fails several others.",
        "Does not run, or produces mostly wrong results." ] },
      { name: "Design", desc: "Is the problem broken into sensible pieces?", levels: [
        "Small functions, each with one clear job and a docstring; no repeated code.",
        "Mostly well divided; some functions do too much or code is repeated.",
        "Most logic sits in one long block; little use of functions.",
        "No discernible structure." ] },
      { name: "Readability", desc: "Can another person follow it?", levels: [
        "Clear names, consistent style (PEP 8), comments explain why, not what.",
        "Generally clear; a few unclear names or inconsistent formatting.",
        "Hard to follow: cryptic names, little formatting, misleading comments.",
        "Very difficult to read." ] },
      { name: "Testing", desc: "Did you check it?", levels: [
        "Tests cover typical, edge and error cases, and the tests pass.",
        "Tests cover typical cases and some edge cases.",
        "A few ad-hoc checks, such as print statements.",
        "No evidence of testing." ] },
      { name: "Explanation", desc: "Do you understand your code?", levels: [
        "Can explain every line and why it was written that way, and predict how changes would behave.",
        "Can explain nearly all of it, with small gaps.",
        "Can explain the main idea but not important details.",
        "Cannot explain how the code works." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Collaboration:</b> discuss ideas with classmates freely, but write your own code. If you get help on a specific problem, name the person in your submission.",
      "<b>AI assistants:</b> allowed for explanations, hints and feedback, including this site's professor. Say in each submission whether and how you used one. You must be able to explain every line you submit; the Explanation criterion checks this.",
      "<b>Late work:</b> you have three late days for the term, usable on any problem set (not projects or exams). After that, late work earns half credit for up to two days.",
      "<b>Regrades:</b> ask within one week of getting work back, in writing, saying which criterion you think was misjudged and why."
    ]
  }
});

CSA.addUnits("cs101", [
  {
    id: "u0",
    title: "Getting set up and your first program",
    minutes: 90,
    summary: "Install Python, open a terminal, use the interactive console, write and run your first program, and learn to read your first error messages.",
    notes: `
<p>Before you can program, you need three things: <strong>Python itself</strong>, an <strong>editor</strong> to write code in, and a <strong>terminal</strong> to run it. This lesson sets all three up and walks you through your first program. Expect the setup to take about 20 minutes; the rest is practice.</p>

<h3>Install Python</h3>
<p>Python is free. Install the latest Python 3 release:</p>
<ul>
  <li><strong>Windows:</strong> download the installer from python.org. On the first screen, tick <strong>"Add python.exe to PATH"</strong> before you click Install. Without it, the terminal won't find Python.</li>
  <li><strong>macOS:</strong> download the installer from python.org and run it. macOS may already include an older Python; the one you install is the one you want.</li>
  <li><strong>Linux:</strong> Python 3 is usually already installed. If not, use your package manager, for example <code>sudo apt install python3</code> on Ubuntu.</li>
</ul>

<h3>Choose an editor</h3>
<p>An editor is where you write code. Two good choices:</p>
<ul>
  <li><strong>Thonny</strong>: built for beginners. It includes its own Python and shows variables changing as your program runs.</li>
  <li><strong>Visual Studio Code</strong>: used by professionals. Install its Python extension. It is more powerful, with more settings to learn.</li>
</ul>
<p>Either is fine for this course. A word processor such as Word is <em>not</em>: it inserts formatting and "smart quotes" that Python can't read.</p>

<h3>Open a terminal</h3>
<p>A <strong>terminal</strong> (also called a shell or command line) is a window where you type commands instead of clicking.</p>
<ul>
  <li><strong>macOS:</strong> press Cmd+Space, type <em>Terminal</em>, press Enter.</li>
  <li><strong>Windows:</strong> open the Start menu and search for <em>Terminal</em> or <em>PowerShell</em>.</li>
  <li><strong>Linux:</strong> on Ubuntu, press Ctrl+Alt+T.</li>
</ul>
<p>Check that Python is installed by asking for its version. On macOS and Linux type <code>python3 --version</code>; on Windows type <code>py --version</code>. You should see something like <code>Python 3.13.1</code>. In this course, examples use <code>python3</code>; on Windows, type <code>py</code> instead. This rule holds <em>everywhere</em> in the course, including later commands such as <code>python3 -m pip install pytest</code> (on Windows: <code>py -m pip install pytest</code>) and <code>python3 -m pytest</code> (<code>py -m pytest</code>). Only the first word changes. Inside an activated virtual environment (<a href="#c-cs101-u7">Lesson 11</a>), plain <code>python</code> works on every system.</p>

<h3>Moving around in the terminal</h3>
<p>The terminal always has a <strong>current folder</strong> (also called the working directory). Commands act on files there. A few commands cover most daily work, and they are the same in macOS, Linux and Windows PowerShell:</p>
<pre data-label="Terminal"><code>pwd             # print working directory: where am I?
ls              # list the files and folders here
mkdir cs101     # make a new folder called cs101
cd cs101        # change directory: move into cs101
cd ..           # move up one level, to the parent folder</code></pre>
<p>A <strong>path</strong> names a file's location. <code>cs101/hello.py</code> is a <em>relative</em> path: it starts from the current folder. <code>/Users/ada/cs101/hello.py</code> (macOS) or <code>C:\\Users\\ada\\cs101\\hello.py</code> (Windows) is an <em>absolute</em> path: it starts from the top of the disk. The special names <code>.</code> and <code>..</code> mean "this folder" and "the folder above".</p>

<h3>The interactive console</h3>
<p>Type <code>python3</code> (or <code>py</code>) with nothing after it. You'll see a <code>&gt;&gt;&gt;</code> prompt. This is the <strong>interactive console</strong>, also called the <strong>REPL</strong> (read, evaluate, print, loop). Type an expression, press Enter, and Python shows its value:</p>
<pre data-label="Python console"><code>&gt;&gt;&gt; 2 + 3
5
&gt;&gt;&gt; 2 ** 100
1267650600228229401496703205376
&gt;&gt;&gt; "Hello, " + "world"
'Hello, world'
&gt;&gt;&gt; print("Hello, world")
Hello, world</code></pre>
<p>Python's arithmetic symbols are <code>+</code>, <code>-</code>, <code>*</code> (multiply) and <code>/</code> (divide), with multiplication and division done before addition and subtraction, as in algebra. <code>**</code> means "to the power of", so <code>2 ** 100</code> is 2<sup>100</sup>. <code>+</code> also joins two strings (pieces of text in quotes), and <code>*</code> between a string and a whole number repeats the string: <code>"ab" * 2</code> is <code>'abab'</code>. The next lesson covers all of these properly.</p>
<p>The console is perfect for trying small things. Everything disappears when you leave it, which you do with <code>exit()</code>, or Ctrl+D on macOS and Linux, or Ctrl+Z then Enter on Windows.</p>

<h3>Your first program</h3>
<p>A <strong>program</strong> is a file of instructions that Python runs from top to bottom. You will write it in your editor and save it inside your <code>cs101</code> folder. Editors do not save there by default (many choose your Documents or home folder), so do it this way:</p>
<ol>
  <li>In the terminal, make the folder once: <code>mkdir cs101</code>.</li>
  <li><strong>VS Code:</strong> choose <em>File → Open Folder…</em> and pick <code>cs101</code>. Then, in the Explorer panel on the left, hover over the folder's name, click the <em>New File</em> icon, type <code>hello.py</code> and press Enter; the file is created inside <code>cs101</code>. VS Code's built-in terminal (<em>Terminal → New Terminal</em>) also starts in that folder. <strong>Thonny:</strong> type the code, choose <em>File → Save as…</em>, browse to <code>cs101</code>, and name the file <code>hello.py</code>.</li>
  <li>In the terminal, <code>cd</code> into <code>cs101</code> and type <code>ls</code> (<code>dir</code> also works on Windows). You should see <code>hello.py</code> in the list. If it isn't there, the file was saved somewhere else, and <code>python3 hello.py</code> will say <em>No such file or directory</em>.</li>
</ol>
<p>Here is the program:</p>
<pre><code># hello.py: my first Python program
print("Hello, world!")
print("I am learning to program.")
print("2 + 3 =", 2 + 3)</code></pre>
<p>Then run it from the terminal, in the same folder:</p>
<pre data-label="Terminal"><code>$ python3 hello.py
Hello, world!
I am learning to program.
2 + 3 = 5</code></pre>
<p>Three things to notice:</p>
<ul>
  <li>Lines starting with <code>#</code> are <strong>comments</strong>. Python ignores them; they are notes for people.</li>
  <li><code>print</code> shows text. When you give it several values separated by commas, it prints them with spaces between.</li>
  <li>The <code>.py</code> ending tells your editor and your computer that the file contains Python.</li>
</ul>
<p class="note">In the console you see a value just by typing it. In a program you must <code>print</code> it. A program that computes <code>2 + 3</code> without printing it shows nothing.</p>

<h3>Your first error messages</h3>
<p>Everyone's programs break, constantly. Professional programmers spend much of their day reading error messages, and Python's are written to help you. Two you will meet in your first hour:</p>
<pre data-label="Terminal"><code>$ python3 hello.py
  File "hello.py", line 2
    print("I am learning to program."
         ^
SyntaxError: '(' was never closed</code></pre>
<p>A <strong>SyntaxError</strong> means Python couldn't understand the shape of your code, so nothing ran at all. Python tells you the file, the line, and points with <code>^</code> at where it got confused. Here a closing parenthesis is missing. (The real mistake is sometimes on the line just before the one Python points to.)</p>
<pre data-label="Terminal"><code>$ python3 hello.py
Hello, world!
Traceback (most recent call last):
  File "hello.py", line 3, in &lt;module&gt;
    prnt("2 + 3 =", 2 + 3)
    ^^^^
NameError: name 'prnt' is not defined. Did you mean: 'print'?</code></pre>
<p>A <strong>NameError</strong> happens while the program is running: the first line ran, then Python reached a name it didn't know. Read error messages from the <strong>bottom up</strong>: the last line says what went wrong, and the lines above say where.</p>

<h3>How to study programming</h3>
<p>Programming is learned by doing, like a language or an instrument. A few habits make a big difference:</p>
<ol>
  <li><strong>Type the examples yourself</strong> rather than copying and pasting. Your fingers learn the syntax.</li>
  <li><strong>Predict before you run.</strong> Say what you think the output will be, then check. Surprises are where learning happens.</li>
  <li><strong>Change things on purpose.</strong> Break a working example and see what error you get.</li>
  <li><strong>Do the practice problems before opening the solutions.</strong> Being stuck for a while is normal and useful.</li>
  <li><strong>Ask early.</strong> Use the "Ask the professor" button or your instructor's office hours when you've been stuck for more than about 20 minutes.</li>
</ol>
`,
    terms: [
      ["Terminal", "A window where you run programs and manage files by typing commands. Also called a shell or command line."],
      ["Working directory", "The folder the terminal is currently in. Commands and programs act on files there."],
      ["Path", "The location of a file. Relative paths start from the working directory; absolute paths start from the top of the disk."],
      ["Interactive console (REPL)", "Python's >>> prompt, which evaluates each line as you type it."],
      ["Program", "A file of instructions, such as hello.py, that Python runs from top to bottom."],
      ["Comment", "Text after # that Python ignores; a note for human readers."],
      ["SyntaxError", "An error meaning Python cannot understand the code's structure, so nothing runs."]
    ],
    quiz: [
      { q: "You typed <code>2 + 3</code> on a line of <code>hello.py</code> and ran the program. What appears?", choices: ["5", "2 + 3", "Nothing", "An error"], answer: 2, why: "A program only shows what it prints. The console shows values automatically; a program does not." },
      { q: "Which terminal command moves you into a folder called <code>cs101</code>?", choices: ["<code>pwd cs101</code>", "<code>ls cs101</code>", "<code>cd cs101</code>", "<code>mkdir cs101</code>"], answer: 2, why: "<code>cd</code> changes directory. <code>mkdir</code> creates a folder, <code>ls</code> lists, and <code>pwd</code> prints where you are." },
      { q: "What does <code>..</code> mean in a path?", choices: ["The current folder", "The folder above the current one", "The home folder", "Every folder"], answer: 1, why: "<code>..</code> is the parent folder. A single <code>.</code> is the current folder." },
      { q: "Python shows <code>SyntaxError: '(' was never closed</code>. What ran?", choices: ["Everything up to that line", "Nothing", "Everything except that line", "Only the comments"], answer: 1, why: "Python checks the whole file's structure first. A SyntaxError stops the program before any line runs." },
      { q: "Where should you start reading a Python error message?", choices: ["The first line", "The last line", "The middle", "The file name"], answer: 1, why: "The last line names the error and explains it. The lines above show where it happened." }
    ],
    practice: [
      { q: `<p>Install Python and an editor, open a terminal, and run <code>python3 --version</code> (or <code>py --version</code> on Windows). Write down the version you see.</p>`, hint: `<p>On Windows, if the terminal says Python isn't found, run the installer again and tick "Add python.exe to PATH". On macOS, use <code>python3</code>, not <code>python</code>.</p>`, a: `<p>You should see <code>Python 3.</code> followed by more numbers, for example <code>Python 3.13.1</code>. If you see <code>Python 2</code>, you are running an old system Python: use <code>python3</code> instead.</p>` },
      { q: `<p>Start the console and <strong>predict, then check</strong> each of these: <code>7 + 3 * 2</code>, <code>(7 + 3) * 2</code>, <code>10 / 4</code>, <code>2 ** 10</code>, <code>"ha" * 3</code>.</p>`, a: `<p><code>13</code> (multiplication first), <code>20</code>, <code>2.5</code>, <code>1024</code>, and <code>'hahaha'</code>. Repeating a string with <code>*</code> surprises most people the first time.</p>` },
      { q: `<p>Using only terminal commands, make a folder called <code>practice</code> inside your <code>cs101</code> folder, move into it, and confirm where you are.</p>`, a: `<pre data-label="Terminal"><code>cd cs101
mkdir practice
cd practice
pwd</code></pre><p><code>pwd</code> should print a path ending in <code>cs101/practice</code> (or <code>cs101\\practice</code> on Windows).</p>` },
      { q: `<p>Write a program <code>about_me.py</code> that prints three lines: your name, what you hope to study, and the result of <code>365 * 24</code> with a label, like <code>Hours in a year: 8760</code>. Run it from the terminal.</p>`, a: `<pre><code># about_me.py
print("Name: Ada")
print("I hope to study computer science.")
print("Hours in a year:", 365 * 24)</code></pre><p>Notice that <code>365 * 24</code> is computed by Python, not typed as 8760. Programs should calculate, not just display.</p>` },
      { q: `<p>This program has three mistakes. Find them by running it and reading each error, fixing one at a time.</p><pre><code>print("Welcome to CS 101)
Print("Let's begin.")
print("Lessons:", 11 x 90, "minutes")</code></pre>`, hint: `<p>Each run reports only the first error Python finds. Fix it, run again, and repeat.</p>`, a: `<ol><li>Line 1 is missing the closing quote: <code>"Welcome to CS 101"</code>. Python reports a <code>SyntaxError</code> (unterminated string).</li><li>Line 2 says <code>Print</code>. Python is case-sensitive, so the name must be <code>print</code>; the error is a <code>NameError</code>.</li><li>Line 3 uses <code>x</code> for multiplication. Python uses <code>*</code>: <code>11 * 90</code>. The output is <code>Lessons: 990 minutes</code>.</li></ol>` },
      { q: `<p>In your own words: when would you use the interactive console, and when would you write a <code>.py</code> file?</p>`, a: `<p>The console is for quick experiments: checking what an expression does, testing a function you just learned. It forgets everything when you close it. A file is for anything you want to keep, run again, change, or hand in. Most programmers use both: they try small ideas in the console, then put working code into a file.</p>` }
    ],
    sources: ["pytutorial", "thinkpython", "missing", "cs50p"]
  },
  {
    id: "u1",
    title: "Values, types and expressions",
    minutes: 90,
    summary: "How Python represents numbers, text and true/false values, how it evaluates expressions, how variables name values, and how a program talks with its user.",
    notes: `
<p>Every program, however large, is built from a few simple ingredients: <strong>values</strong> (pieces of data), <strong>expressions</strong> that combine them, and <strong>variables</strong> that give them names. This lesson covers all three, then shows how a program reads input and prints output.</p>

<h3>Values and types</h3>
<p>Every piece of data in Python is a <em>value</em>, and every value has a <em>type</em> that decides what you can do with it. Four types cover most of what you'll write this term:</p>
<table>
  <thead><tr><th>Type</th><th>What it holds</th><th>Examples</th><th>Notes</th></tr></thead>
  <tbody>
    <tr><td><code>int</code></td><td>Whole numbers</td><td><code>42</code>, <code>-7</code>, <code>0</code></td><td>No size limit: <code>2 ** 1000</code> works.</td></tr>
    <tr><td><code>float</code></td><td>Numbers with a fractional part</td><td><code>3.14</code>, <code>-0.5</code>, <code>2.0</code></td><td>Stored in binary, so some decimals are approximate.</td></tr>
    <tr><td><code>str</code></td><td>Text (a "string" of characters)</td><td><code>"hello"</code>, <code>'A'</code>, <code>""</code></td><td>Single or double quotes both work. <code>""</code> is the empty string.</td></tr>
    <tr><td><code>bool</code></td><td>True or false</td><td><code>True</code>, <code>False</code></td><td>Capitalized. Produced by comparisons like <code>3 &gt; 2</code>.</td></tr>
  </tbody>
</table>
<p>There is also a special value <code>None</code>, meaning "no value", which you'll meet with functions. Ask Python for any value's type with <code>type()</code>:</p>
<pre data-label="Python console"><code>&gt;&gt;&gt; type(42)
&lt;class 'int'&gt;
&gt;&gt;&gt; type(42.0)
&lt;class 'float'&gt;
&gt;&gt;&gt; type("42")
&lt;class 'str'&gt;</code></pre>
<p>Those three values look alike but are different things. <code>42</code> is a number you can do arithmetic with; <code>"42"</code> is two characters of text.</p>

<h3>Arithmetic</h3>
<div class="multi">
<pre data-lang="python"><code>7 / 2     # 3.5   true division always gives a float
7 // 2    # 3     floor division
7 % 2     # 1     remainder
2 ** 10   # 1024  exponent
"ab" * 3  # 'ababab'</code></pre>
<pre data-lang="java"><code>7 / 2            // 3     both ints, so integer division
7 / 2.0          // 3.5   one double makes it true division
7 % 2            // 1     remainder
Math.pow(2, 10)  // 1024.0  (returns a double)
"ab".repeat(3)   // "ababab"</code></pre>
<pre data-lang="cpp"><code>7 / 2            // 3     both ints, so integer division
7 / 2.0          // 3.5   one double makes it true division
7 % 2            // 1     remainder
std::pow(2, 10)  // 1024  (returns a double, needs &lt;cmath&gt;)
std::string(3, 'a')  // "aaa"  (no built-in string repeat)</code></pre>
</div>
<p><code>//</code> and <code>%</code> look odd at first but are used constantly. <code>a // b</code> is how many whole times <code>b</code> fits into <code>a</code>, and <code>a % b</code> (read "a mod b") is what's left over. Some everyday uses:</p>
<ul>
  <li><strong>Even or odd:</strong> <code>n % 2</code> is <code>0</code> for even numbers and <code>1</code> for odd ones.</li>
  <li><strong>Last digit:</strong> <code>1987 % 10</code> is <code>7</code>, and <code>1987 // 10</code> is <code>198</code> (the number with its last digit removed).</li>
  <li><strong>Converting units:</strong> 135 minutes is <code>135 // 60</code> = 2 hours and <code>135 % 60</code> = 15 minutes.</li>
</ul>
<p>Floor division rounds <em>down</em>, toward negative infinity, so <code>-7 // 2</code> is <code>-4</code>, not <code>-3</code>.</p>

<h3>Order of operations</h3>
<p>Python follows the precedence rules you know from math, with exponents first, then multiplication and division (including <code>//</code> and <code>%</code>), then addition and subtraction. Operators of equal precedence go left to right, except <code>**</code>, which goes right to left. Parentheses override everything. Here is an expression evaluated one step at a time:</p>
<table>
  <thead><tr><th>Step</th><th>Expression</th><th>What happened</th></tr></thead>
  <tbody>
    <tr><td>0</td><td><code>2 + 3 * 4 ** 2 // 5</code></td><td>Start</td></tr>
    <tr><td>1</td><td><code>2 + 3 * 16 // 5</code></td><td><code>**</code> first: 4² = 16</td></tr>
    <tr><td>2</td><td><code>2 + 48 // 5</code></td><td><code>*</code> and <code>//</code> left to right: 3 × 16 = 48</td></tr>
    <tr><td>3</td><td><code>2 + 9</code></td><td>48 // 5 = 9</td></tr>
    <tr><td>4</td><td><code>11</code></td><td>Addition last</td></tr>
  </tbody>
</table>
<p>When in doubt, add parentheses. <code>(2 + 3) * 4</code> is clearer than relying on a reader to remember the rules.</p>

<h3>Binary numbers, bits and bytes</h3>
<p>Computers store every number as a pattern of <strong>bits</strong>. A bit (short for <em>binary digit</em>) is a 0 or a 1, like a switch that is off or on. Writing numbers with only these two digits is called <strong>binary</strong>, or base 2.</p>
<p>In ordinary decimal, each place is worth ten times the place to its right: 1, 10, 100, 1000. In binary, each place is worth <em>two</em> times the place to its right: 1, 2, 4, 8, 16, and so on. So binary <code>1101</code> means</p>
<p class="math">1×8 + 1×4 + 0×2 + 1×1 = 13.</p>
<p>To go the other way, from 13 to binary, divide by 2 again and again and write down each remainder. The remainders, read from the last one back to the first, are the binary digits:</p>
<table>
  <thead><tr><th>Number</th><th>÷ 2 gives</th><th>Remainder (a binary digit)</th></tr></thead>
  <tbody>
    <tr><td>13</td><td>6</td><td>1 (the last digit)</td></tr>
    <tr><td>6</td><td>3</td><td>0</td></tr>
    <tr><td>3</td><td>1</td><td>1</td></tr>
    <tr><td>1</td><td>0</td><td>1 (the first digit)</td></tr>
  </tbody>
</table>
<p>Reading the remainders from the bottom up gives <code>1101</code>. In Python, <code>13 % 2</code> is the last digit and <code>13 // 2</code> is the number with that digit removed, exactly as <code>% 10</code> and <code>// 10</code> work for decimal digits. Python can check your work: <code>bin(13)</code> gives <code>'0b1101'</code> (the <code>0b</code> just marks it as binary), and <code>int("1101", 2)</code> gives <code>13</code>.</p>
<p>With <em>n</em> bits there are 2<sup><em>n</em></sup> different patterns, because each bit doubles the number of choices. A <strong>byte</strong> is 8 bits, so it holds 2<sup>8</sup> = 256 patterns, the whole numbers 0 to 255. Sizes you'll meet often:</p>
<table>
  <thead><tr><th>Bits</th><th>Patterns</th><th>Roughly</th></tr></thead>
  <tbody>
    <tr><td>8 (one byte)</td><td>2<sup>8</sup> = 256</td><td>256</td></tr>
    <tr><td>16</td><td>2<sup>16</sup> = 65,536</td><td>65 thousand</td></tr>
    <tr><td>32</td><td>2<sup>32</sup> = 4,294,967,296</td><td>4.3 billion</td></tr>
    <tr><td>64</td><td>2<sup>64</sup> = 18,446,744,073,709,551,616</td><td>1.8 × 10<sup>19</sup></td></tr>
  </tbody>
</table>
<p>If half of the 32-bit patterns are used for negative numbers, the largest positive one is 2<sup>31</sup> − 1 = 2,147,483,647, about 2.1 billion. A fixed number of bits can only count so far. Adding 1 to the largest value <strong>overflows</strong>: like a car's odometer rolling from 999999 to 000000, a one-byte counter at 255 <em>wraps around</em> to 0. Python's own <code>int</code> grows as needed, so you won't see this in Python, but many other languages and machines have fixed-size numbers. A Python <code>float</code> uses 64 bits (called <strong>double precision</strong>), which is enough for about 16 <strong>significant digits</strong>: the digits that carry information, not counting leading zeros. (Precisely: 53 of the 64 bits hold the digits, and 2<sup>53</sup> ≈ 9.0 × 10<sup>15</sup>, which is just under 16 decimal digits' worth. Any decimal number with 15 significant digits is stored faithfully, and 17 digits are always enough to write a float out exactly. "About 16" is the figure to use in this course and in MATH 130.) That limit is where the surprises below come from.</p>

<h3>Floats are approximate</h3>
<p>Floats are stored in binary, and many decimal fractions, like 0.1, can't be written exactly in binary, just as 1/3 can't be written exactly in decimal. So <code>0.1 + 0.2</code> gives <code>0.30000000000000004</code>. Two consequences:</p>
<ul>
  <li>Don't test floats with <code>==</code>: two calculations that should agree can differ in the last digit. Use <code>math.isclose(a, b)</code>, which checks whether they are nearly equal. It lives in <code>math</code>, a <em>module</em> (a file of extra functions that comes with Python), so first write <code>import math</code> on its own line, once, at the top of your program or in the console. Without it you get <code>NameError: name 'math' is not defined</code>. The table near the end of this lesson shows where modules fit, and the Files and modules lesson explains <code>import</code> fully. This applies throughout the course: when a result is a float, check it with <code>math.isclose</code> unless you know it is exact. <code>==</code> is fine for ints and strings, and for floats that are whole numbers or simple halves and quarters, such as <code>6 / 3 == 2</code> or <code>1 / 4 == 0.25</code>, which binary stores exactly. When in doubt, use <code>math.isclose</code>.</li>
  <li>Use <code>round(x, 2)</code> to show a sensible number of decimal places: <code>round(0.1 + 0.2, 2)</code> is <code>0.3</code>. (An <em>f-string</em> such as <code>f"{x:.2f}"</code> does the same job when printing; it is explained in the output section at the end of this lesson.)</li>
</ul>
<p>Very large and very small floats are written in <strong>scientific notation</strong> with an <code>e</code>, meaning "times ten to the power": <code>2.5e3</code> is 2.5 × 10<sup>3</sup> = <code>2500.0</code>, and <code>1e-10</code> is 1 × 10<sup>−10</sup> = 0.0000000001. Python prints tiny or huge floats this way too, and you can type them this way. You'll see <code>1e-10</code> used as "a very small tolerance" in later lessons and in MATH 130.</p>

<h3>Strings, a first look</h3>
<p>Strings support <code>+</code> (joining, called <em>concatenation</em>) and <code>*</code> (repetition), and <code>len()</code> gives their length. You can't add a string and a number directly; convert first:</p>
<pre data-label="Python console"><code>&gt;&gt;&gt; "data" + "base"
'database'
&gt;&gt;&gt; len("database")
8
&gt;&gt;&gt; "Age: " + 36
TypeError: can only concatenate str (not "int") to str
&gt;&gt;&gt; "Age: " + str(36)
'Age: 36'</code></pre>
<p>The error is Python protecting you: should <code>"5" + 3</code> be <code>"53"</code> or <code>8</code>? Rather than guess, Python makes you say which you mean. The Strings lesson covers them in depth.</p>

<h3>Variables are names, not boxes</h3>
<p>The assignment <code>x = 5</code> makes the name <code>x</code> refer to the value <code>5</code>. Python first evaluates the right side, then attaches the name on the left to the result. The <code>=</code> sign means "make this name refer to", not "is equal to". That is why <code>count = count + 1</code> makes sense: the old value is read, one is added, and the name is pointed at the new value.</p>
<figure class="fig">
<svg viewBox="0 0 440 150" role="img" aria-label="Diagram: name x points to value 6; name y points to value 5; a dashed line shows x used to point to 5">
  <defs><marker id="arr-u1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
  <text x="20" y="18" class="m">Names</text><text x="280" y="18" class="m">Values</text>
  <rect x="20" y="30" width="60" height="34" rx="6" class="soft"/><text x="44" y="52" class="code">x</text>
  <rect x="20" y="96" width="60" height="34" rx="6" class="soft"/><text x="44" y="118" class="code">y</text>
  <rect x="280" y="30" width="70" height="34" rx="4" class="box"/><text x="310" y="52" class="code">6</text>
  <rect x="280" y="96" width="70" height="34" rx="4" class="box"/><text x="310" y="118" class="code">5</text>
  <line x1="82" y1="47" x2="276" y2="47" class="cv" marker-end="url(#arr-u1)"/>
  <line x1="82" y1="113" x2="276" y2="113" class="cv" marker-end="url(#arr-u1)"/>
  <line x1="82" y1="52" x2="276" y2="106" class="ax dash"/>
  <text x="150" y="88" class="m">x used to point here</text>
</svg>
<figcaption>After <code>x = 5</code>, <code>y = x</code>, <code>x = x + 1</code>: <code>y = x</code> pointed <code>y</code> at the same value as <code>x</code>, which was 5. Changing what <code>x</code> refers to later doesn't change <code>y</code>.</figcaption>
</figure>
<p>Some rules and conventions for names:</p>
<ul>
  <li>Names use letters, digits and underscores, and can't start with a digit: <code>total2</code> is fine, <code>2total</code> is not.</li>
  <li>Names are case-sensitive: <code>Total</code> and <code>total</code> are different.</li>
  <li>You can't use a keyword such as <code>if</code>, <code>for</code> or <code>class</code> as a name.</li>
  <li>Python style (called PEP 8) uses lowercase words joined by underscores: <code>hours_worked</code>, not <code>HoursWorked</code> or <code>hw</code>. Choose names that say what the value means.</li>
</ul>
<p>Two handy shortcuts. <strong>Augmented assignment</strong> combines an operation with assignment: <code>score += 10</code> means <code>score = score + 10</code>, and <code>-=</code>, <code>*=</code> and <code>//=</code> work the same way. (That is exactly true for numbers and strings. Lists, which come later, are an exception: the Lists lesson shows how <code>+=</code> behaves on them.) <strong>Multiple assignment</strong> sets several names at once: <code>a, b = 1, 2</code>. It even swaps two values in one line: <code>a, b = b, a</code>.</p>

<h3>Tracing code by hand</h3>
<p>To <em>trace</em> code, go line by line and write down what each name refers to after that line runs. It feels slow at first, but tracing is the single most useful skill you can build this term: it is how you find bugs and how you answer exam questions.</p>
<pre><code>a = 3
b = a * 2
a = a + b
b = b - 1</code></pre>
<table>
  <thead><tr><th>After line</th><th><code>a</code></th><th><code>b</code></th></tr></thead>
  <tbody>
    <tr><td>1</td><td>3</td><td>(not yet defined)</td></tr>
    <tr><td>2</td><td>3</td><td>6</td></tr>
    <tr><td>3</td><td>9</td><td>6</td></tr>
    <tr><td>4</td><td>9</td><td>5</td></tr>
  </tbody>
</table>

<h3>Converting between types</h3>
<table>
  <thead><tr><th>Call</th><th>Result</th><th>Note</th></tr></thead>
  <tbody>
    <tr><td><code>int("42")</code></td><td><code>42</code></td><td>Text to whole number</td></tr>
    <tr><td><code>float("3.5")</code></td><td><code>3.5</code></td><td>Text to decimal number</td></tr>
    <tr><td><code>str(7)</code></td><td><code>"7"</code></td><td>Anything to text</td></tr>
    <tr><td><code>int(3.9)</code></td><td><code>3</code></td><td>Cuts off the fraction; doesn't round</td></tr>
    <tr><td><code>round(3.7)</code></td><td><code>4</code></td><td>Rounds to the nearest whole number</td></tr>
    <tr><td><code>int("3.5")</code></td><td><code>ValueError</code></td><td>Not a whole number; use <code>float()</code></td></tr>
  </tbody>
</table>
<p>One surprise: <code>round(2.5)</code> is <code>2</code>, not 3. Python rounds exact halves to the nearest <em>even</em> number, which avoids bias when rounding many values. So <code>round(3.5)</code> is <code>4</code>, and <code>round(0.125, 2)</code> is <code>0.12</code> (0.125 is exactly 1/8, a true half-way case, and 2 is even). A second, different surprise comes from binary floats: <code>round(2.675, 2)</code> gives <code>2.67</code>. The decimal 2.675 can't be stored exactly; the float actually stored is 2.67499999999999982…, which is slightly <em>below</em> half-way, so it rounds down. Neither result means you misunderstood rounding.</p>

<h3>Talking to the user: output and input</h3>
<p>Programs communicate with people through <em>output</em>, showing text, and <em>input</em>, reading what the user types. Every language provides a way to do both. Here is a complete program that asks two questions and replies.</p>
<div class="multi">
<pre data-lang="python"><code># greet.py
name = input("What's your name? ")
age = int(input("How old are you? "))
print(f"Hi {name}, next year you'll be {age + 1}.")</code></pre>
<pre data-lang="java"><code>// Greet.java
import java.util.Scanner;

public class Greet {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        System.out.print("What's your name? ");
        String name = in.nextLine();
        System.out.print("How old are you? ");
        int age = Integer.parseInt(in.nextLine());
        System.out.println("Hi " + name + ", next year you'll be " + (age + 1) + ".");
    }
}</code></pre>
<pre data-lang="cpp"><code>// greet.cpp
#include &lt;iostream&gt;
#include &lt;string&gt;

int main() {
    std::string name;
    int age;
    std::cout &lt;&lt; "What's your name? ";
    std::getline(std::cin, name);
    std::cout &lt;&lt; "How old are you? ";
    std::cin &gt;&gt; age;
    std::cout &lt;&lt; "Hi " &lt;&lt; name &lt;&lt; ", next year you'll be " &lt;&lt; age + 1 &lt;&lt; ".\n";
}</code></pre>
</div>
<div data-only="python">
<p>Run it from a terminal, and the conversation looks like this (you type the parts after the question marks and press Enter):</p>
<pre data-label="Terminal"><code>$ python3 greet.py
What's your name? Ada
How old are you? 36
Hi Ada, next year you'll be 37.</code></pre>
</div>
<div data-only="java">
<p>Java is compiled before it runs. <code>javac</code> turns <code>Greet.java</code> into bytecode in <code>Greet.class</code>, and <code>java</code> runs it. You type the parts after the question marks and press Enter:</p>
<pre data-label="Terminal"><code>$ javac Greet.java
$ java Greet
What's your name? Ada
How old are you? 36
Hi Ada, next year you'll be 37.</code></pre>
<p>Since Java 11 you can also skip the separate compile step for a one-file program and run <code>java Greet.java</code> directly.</p>
</div>
<div data-only="cpp">
<p>C++ is compiled to a native program before it runs. <code>g++</code> (or <code>clang++</code>) produces an executable called <code>greet</code>, which you then run. The <code>-Wall</code> option turns on warnings, which catch many mistakes. You type the parts after the question marks and press Enter:</p>
<pre data-label="Terminal"><code>$ g++ -std=c++17 -Wall -o greet greet.cpp
$ ./greet
What's your name? Ada
How old are you? 36
Hi Ada, next year you'll be 37.</code></pre>
</div>

<h4>What happens when the program reads input</h4>
<div data-only="python">
<p>When Python reaches <code>input("What's your name? ")</code>, four things happen in order:</p>
<ol>
  <li>It prints the text you passed in, the <em>prompt</em>, without starting a new line.</li>
  <li>It <strong>pauses the program</strong> and waits. Nothing after that line runs yet.</li>
  <li>The user types and presses Enter.</li>
  <li><code>input()</code> <strong>returns</strong> what they typed, as a string, without the Enter at the end. Here that string is stored in <code>name</code>.</li>
</ol>
<p>The result is <em>always</em> a string, even if the user types digits. <code>"36"</code> is text, not the number 36, and <code>"36" + 1</code> is an error. That is why the program wraps the second call in <code>int(...)</code>, which converts text to an integer. Use <code>float(...)</code> for numbers with a decimal point. If the text is not a valid number, such as <code>"thirty"</code>, the conversion raises a <code>ValueError</code>; you will learn to handle that gracefully in the testing and debugging lesson.</p>
<p><code>print()</code> works the other way: it takes values, turns them into text and writes them out, followed by a new line. The <code>f</code> before the quotes in the last line makes an <strong>f-string</strong>. Python evaluates each expression inside <code>{ }</code> and inserts the result into the text, so <code>{age + 1}</code> becomes <code>37</code>. You can also put a <em>format specification</em> after a colon inside the braces: <code>f"{3.14159:.2f}"</code> gives <code>'3.14'</code>, because <code>:.2f</code> means "show as a float with two decimal places". The tip-calculator practice problem below uses it for money.</p>
</div>
<div data-only="java">
<p>When the program reaches the first question, four things happen in order:</p>
<ol>
  <li><code>System.out.print(...)</code> shows the prompt. Unlike <code>println</code>, it does not start a new line, so the cursor waits right after the question.</li>
  <li><code>in.nextLine()</code> <strong>pauses the program</strong> and waits. Nothing after that line runs yet.</li>
  <li>The user types and presses Enter.</li>
  <li><code>nextLine()</code> <strong>returns</strong> what they typed as a <code>String</code>, without the line ending. Here it is stored in <code>name</code>.</li>
</ol>
<p>The reading is done by a <code>Scanner</code> object, created once with <code>new Scanner(System.in)</code>. <code>System.in</code> is the program's standard input, explained below.</p>
<p>The result of <code>nextLine()</code> is always a <code>String</code>, even if the user types digits. To get a number, the program passes the text to <code>Integer.parseInt(...)</code>; use <code>Double.parseDouble(...)</code> for numbers with a decimal point. If the text is not a valid number, such as <code>"thirty"</code>, <code>parseInt</code> throws a <code>NumberFormatException</code>, which you will learn to handle with <code>try</code> and <code>catch</code>.</p>
<p><code>Scanner</code> also has <code>nextInt()</code>, which reads a number directly. Mixing <code>nextInt()</code> with <code>nextLine()</code> is a classic beginner trap: <code>nextInt()</code> leaves the Enter key's line ending behind, so the next <code>nextLine()</code> returns an empty string. Reading whole lines and converting them, as this program does, avoids the problem.</p>
<p><code>System.out.println(...)</code> writes text and then starts a new line. The <code>+</code> operator joins strings: <code>"Hi " + name</code> gives <code>"Hi Ada"</code>. The parentheses around <code>(age + 1)</code> matter. <code>+</code> works from left to right, so without them Java would first join <code>"...you'll be "</code> and <code>36</code> into text, then append <code>1</code>, printing <code>361</code>.</p>
</div>
<div data-only="cpp">
<p>When the program reaches the first question, four things happen in order:</p>
<ol>
  <li><code>std::cout &lt;&lt; "What's your name? "</code> sends the prompt to the screen.</li>
  <li><code>std::getline(std::cin, name)</code> <strong>pauses the program</strong> until the user presses Enter.</li>
  <li>It stores the whole line, without the line ending, in the <code>std::string</code> variable <code>name</code>.</li>
  <li>Later, <code>std::cin &gt;&gt; age</code> reads the next number the user types and converts it straight into the <code>int</code> variable <code>age</code>.</li>
</ol>
<p>The two ways of reading behave differently. <code>getline</code> reads a whole line, spaces included. The <code>&gt;&gt;</code> operator skips leading spaces, reads one word or number, and stops at the first character that doesn't fit. If the program used <code>std::cin &gt;&gt; name</code>, a user typing <code>Ada Lovelace</code> would get only <code>Ada</code>.</p>
<p>When <code>&gt;&gt;</code> cannot convert the text, for example <code>thirty</code> into an <code>int</code>, the program does not crash. Instead <code>std::cin</code> enters a <em>fail state</em>, the variable is set to 0, and every later read quietly fails until the error is cleared. Careful programs check each read: <code>if (!(std::cin &gt;&gt; age)) { ... }</code>. Also watch out for mixing the two: <code>&gt;&gt;</code> leaves the line ending behind, so a <code>getline</code> right after it returns an empty line. In this program <code>getline</code> comes first, so the problem doesn't arise.</p>
<p><code>&lt;&lt;</code> sends each value to <code>std::cout</code> in turn, and <code>"\n"</code> starts a new line. You will also see <code>std::endl</code>, which starts a new line and then <em>flushes</em> the output, forcing it to the screen immediately. That is slower when printing a lot.</p>
</div>

<h4>Is reading input part of the language or a library?</h4>
<div data-only="python">
<p>Neither, exactly. Python code is built from four layers, and it helps to know which one you are using:</p>
<table>
  <thead><tr><th>Layer</th><th>Examples</th><th>How you get it</th></tr></thead>
  <tbody>
    <tr><td><strong>Keywords</strong>: the grammar of the language itself</td><td><code>if</code>, <code>for</code>, <code>def</code>, <code>return</code>, <code>True</code></td><td>Always there. You cannot use them as names.</td></tr>
    <tr><td><strong>Built-in functions</strong></td><td><code>print</code>, <code>input</code>, <code>len</code>, <code>type</code>, <code>int</code></td><td>Always available, with no <code>import</code>. Python has about 70.</td></tr>
    <tr><td><strong>Standard library</strong></td><td><code>math</code>, <code>random</code>, <code>datetime</code></td><td>Installed with Python, but you must <code>import</code> a module first, e.g. <code>import math</code>.</td></tr>
    <tr><td><strong>Third-party packages</strong></td><td><code>numpy</code>, <code>requests</code></td><td>Installed separately with <code>pip</code>, then imported.</td></tr>
  </tbody>
</table>
<p><code>input()</code> is a <strong>built-in function</strong>. It comes with every Python installation and needs no import, but it is an ordinary function, not special syntax. You call it with parentheses like any other function, and it returns a value like any other function.</p>
</div>
<div data-only="java">
<p>Java code is built from four layers, and it helps to know which one you are using:</p>
<table>
  <thead><tr><th>Layer</th><th>Examples</th><th>How you get it</th></tr></thead>
  <tbody>
    <tr><td><strong>Keywords</strong>: the grammar of the language itself</td><td><code>if</code>, <code>class</code>, <code>public</code>, <code>return</code>, <code>new</code></td><td>Always there. You cannot use them as names.</td></tr>
    <tr><td><strong>The <code>java.lang</code> package</strong></td><td><code>String</code>, <code>Integer</code>, <code>Math</code>, <code>System</code></td><td>Part of the standard library, imported into every program automatically.</td></tr>
    <tr><td><strong>The rest of the standard library</strong></td><td><code>java.util.Scanner</code>, <code>java.util.ArrayList</code>, <code>java.time</code></td><td>Comes with the JDK, but needs an <code>import</code> statement.</td></tr>
    <tr><td><strong>Third-party libraries</strong></td><td>Gson, JUnit</td><td>Downloaded with a build tool such as Maven or Gradle, then imported.</td></tr>
  </tbody>
</table>
<p>Reading input is <strong>not built into the Java language</strong>. <code>Scanner</code> is a class in the <code>java.util</code> package of the standard library, which is why the program starts with <code>import java.util.Scanner;</code>. Printing needs no import only because <code>System</code> lives in <code>java.lang</code>, which every program imports automatically.</p>
</div>
<div data-only="cpp">
<p>C++ code is built from three layers, and it helps to know which one you are using:</p>
<table>
  <thead><tr><th>Layer</th><th>Examples</th><th>How you get it</th></tr></thead>
  <tbody>
    <tr><td><strong>Keywords</strong>: the grammar of the language itself</td><td><code>int</code>, <code>if</code>, <code>return</code>, <code>class</code></td><td>Always there. You cannot use them as names.</td></tr>
    <tr><td><strong>The standard library</strong></td><td><code>std::cin</code>, <code>std::cout</code>, <code>std::string</code>, <code>std::vector</code></td><td>Ships with every compiler. <code>#include</code> the right header, such as <code>&lt;iostream&gt;</code> or <code>&lt;string&gt;</code>.</td></tr>
    <tr><td><strong>Third-party libraries</strong></td><td>Boost, fmt</td><td>Installed separately, then included and linked into your program.</td></tr>
  </tbody>
</table>
<p>The core C++ language has <strong>no input or output at all</strong>. <code>std::cin</code> and <code>std::cout</code> are objects defined in the standard library's <code>&lt;iostream&gt;</code> header, which is why the program begins with <code>#include &lt;iostream&gt;</code>. The <code>std::</code> prefix says they belong to the standard library's <em>namespace</em>, its own set of names.</p>
</div>

<h4>Does it work in a program, or only in a console?</h4>
<div data-only="python">
<p>Both. In a program run from the terminal, as above, <code>input()</code> pauses the program and waits for the user. In the <strong>interactive console</strong>, the <code>&gt;&gt;&gt;</code> prompt you get by typing <code>python3</code> with no file name, it does the same thing, and you can see the result right away:</p>
<pre data-label="Python console"><code>&gt;&gt;&gt; answer = input("Type something: ")
Type something: 42
&gt;&gt;&gt; answer
'42'
&gt;&gt;&gt; type(answer)
&lt;class 'str'&gt;
&gt;&gt;&gt; int(answer) + 1
43</code></pre>
<p>It also works inside editors such as Thonny and VS Code (and IDLE, the simple editor that comes with Python), where you type your answer into the editor's terminal or console panel.</p>
<p>Where <code>input()</code> does need care is when <strong>no one is at the keyboard</strong>. Technically, <code>input()</code> reads from <strong>standard input</strong>, the program's incoming text stream. Normally that stream is connected to your keyboard, but it can be connected to a file instead. Automated graders use this to test your program without a person present:</p>
<pre data-label="Terminal"><code>$ python3 greet.py &lt; answers.txt</code></pre>
<p>Here each call to <code>input()</code> reads the next line of <code>answers.txt</code>. If the program asks for more lines than the file has, <code>input()</code> raises an <code>EOFError</code> ("end of file"). You can cause the same thing yourself by pressing Ctrl+D (macOS and Linux) or Ctrl+Z then Enter (Windows) at an input prompt.</p>
</div>
<div data-only="java">
<p>Both. A Java program reads input the same way whether you start it with <code>java Greet</code> in a terminal or from an editor such as IntelliJ IDEA or VS Code, where you type your answers into the editor's console panel.</p>
<p>Java also has an interactive console, <strong>jshell</strong> (included since Java 9), where you can try one line at a time without writing a class:</p>
<pre data-label="jshell"><code>jshell&gt; Integer.parseInt("36") + 1
$1 ==&gt; 37</code></pre>
<p>Where reading needs care is when <strong>no one is at the keyboard</strong>. <code>System.in</code> is the program's <strong>standard input</strong>, its incoming text stream. Normally that stream is connected to your keyboard, but it can be connected to a file instead. Automated graders use this to test your program without a person present:</p>
<pre data-label="Terminal"><code>$ java Greet &lt; answers.txt</code></pre>
<p>Here each call to <code>nextLine()</code> reads the next line of <code>answers.txt</code>. If the program asks for more lines than the file has, <code>nextLine()</code> throws a <code>NoSuchElementException</code>. You can cause the same thing by pressing Ctrl+D (macOS and Linux) or Ctrl+Z then Enter (Windows) at a prompt.</p>
</div>
<div data-only="cpp">
<p>A C++ program reads input whenever it runs with a terminal attached: started as <code>./greet</code>, or from an editor such as Visual Studio, CLion or VS Code, where you type your answers into the editor's console panel. Unlike Python and Java, standard C++ has no interactive console. You always write a program, compile it and run it.</p>
<p>Where reading needs care is when <strong>no one is at the keyboard</strong>. <code>std::cin</code> reads the program's <strong>standard input</strong>, its incoming text stream. Normally that stream is connected to your keyboard, but it can be connected to a file instead. Automated graders use this to test your program without a person present:</p>
<pre data-label="Terminal"><code>$ ./greet &lt; answers.txt</code></pre>
<p>Here each read takes the next part of <code>answers.txt</code>. If the program asks for more than the file has, there is no crash and no exception: the read fails and <code>std::cin</code>'s end-of-file state is set. Check for it the same way as any failed read, for example <code>if (!std::getline(std::cin, name)) { ... }</code>. You can cause the same thing by pressing Ctrl+D (macOS and Linux) or Ctrl+Z then Enter (Windows) at a prompt.</p>
</div>
<p>Programs that run in the background, such as web servers, have no keyboard attached at all. They get their input from network requests and files instead.</p>
`,
    terms: [
      ["Value", "A piece of data, such as 3, 'hi' or True."],
      ["Type", "The category of a value, such as int, float, str or bool. It determines which operations are allowed."],
      ["Expression", "Code that evaluates to a value, such as 2 + 3 or len(name)."],
      ["Statement", "A complete instruction, such as an assignment or a print call."],
      ["Variable", "A name bound to a value."],
      ["Modulo (%)", "The remainder after division: 17 % 5 is 2."],
      ["Concatenation", "Joining strings end to end with +."],
      ["Augmented assignment", "A shortcut such as x += 1, meaning x = x + 1."],
      ["Tracing", "Following code by hand, recording each variable's value after each line."],
      ["Built-in function", "A function that is always available in Python without an import, such as print, input and len."],
      ["Standard input", "A program's incoming text stream, normally the keyboard but redirectable from a file."],
      ["Interactive console", "Python's >>> prompt (also called the REPL), which runs each line as you type it."],
      ["f-string", "A string starting with f whose {expressions} are evaluated and inserted into the text."]
    ],
    quiz: [
      ...[
 {
  "q": "What does <code>17 // 5</code> evaluate to?",
  "choices": [
   "3.4",
   "3",
   "2",
   "4"
  ],
  "answer": 1,
  "why": "<code>//</code> is floor division: 17 divided by 5 is 3.4, rounded down to 3.",
  "langs": {
   "java": {
    "q": "In Java, what does <code>17 / 5</code> evaluate to?",
    "why": "Both values are <code>int</code>, so <code>/</code> is integer division: 3.4 loses its fraction and becomes 3."
   },
   "cpp": {
    "q": "In C++, what does <code>17 / 5</code> evaluate to?",
    "why": "Both values are <code>int</code>, so <code>/</code> is integer division: 3.4 loses its fraction and becomes 3."
   }
  }
 },
 {
  "q": "After <code>x = 4</code> then <code>x = x * x - 1</code>, what is <code>x</code>?",
  "choices": [
   "15",
   "12",
   "3",
   "An error"
  ],
  "answer": 0,
  "why": "The right side is evaluated with the old x: 4 × 4 − 1 = 15."
 },
 {
  "q": "What is the type of <code>input()</code>'s return value?",
  "choices": [
   "int",
   "It depends on what the user types",
   "str",
   "float"
  ],
  "answer": 2,
  "why": "<code>input()</code> always returns a string. You must convert it with <code>int()</code> or <code>float()</code>.",
  "langs": {
   "java": {
    "q": "What type does <code>in.nextLine()</code> return?",
    "choices": [
     "int",
     "It depends on what the user types",
     "String",
     "double"
    ],
    "answer": 2,
    "why": "<code>nextLine()</code> always returns a <code>String</code>. Convert it with <code>Integer.parseInt()</code> or <code>Double.parseDouble()</code>."
   },
   "cpp": {
    "q": "<code>int age;</code> then <code>std::cin &gt;&gt; age;</code>, and the user types <code>thirty</code>. What happens?",
    "choices": [
     "age becomes 30",
     "The program crashes with an exception",
     "The read fails: std::cin enters a fail state and age is set to 0",
     "age becomes the text \"thirty\""
    ],
    "answer": 2,
    "why": "A failed numeric read sets the variable to 0 and puts <code>std::cin</code> in a fail state. Always check whether a read succeeded."
   }
  }
 },
 {
  "q": "What must you do before calling <code>input()</code> in a Python program?",
  "choices": [
   "<code>import input</code>",
   "<code>import sys</code>",
   "Nothing: it is a built-in function",
   "Start the interactive console"
  ],
  "answer": 2,
  "why": "Built-in functions like <code>input</code>, <code>print</code> and <code>len</code> are always available. It works in scripts and in the console alike.",
  "langs": {
   "java": {
    "q": "What must a Java program do before using <code>Scanner</code>?",
    "choices": [
     "Nothing: it is built into the language",
     "<code>import java.util.Scanner;</code>",
     "<code>#include &lt;scanner&gt;</code>",
     "Start jshell"
    ],
    "answer": 1,
    "why": "<code>Scanner</code> is in the <code>java.util</code> package of the standard library, so it must be imported. Classes in <code>java.lang</code>, such as <code>String</code> and <code>System</code>, need no import."
   },
   "cpp": {
    "q": "What must a C++ program do before using <code>std::cin</code>?",
    "choices": [
     "Nothing: it is built into the language",
     "<code>#include &lt;iostream&gt;</code>",
     "<code>import cin;</code>",
     "Install a third-party library"
    ],
    "answer": 1,
    "why": "<code>std::cin</code> and <code>std::cout</code> are declared in the standard library's <code>&lt;iostream&gt;</code> header. The core language has no input or output."
   }
  }
 },
 {
  "q": "An automated grader runs your program with no one at the keyboard. Where do your <code>input()</code> calls get their text?",
  "choices": [
   "They wait forever",
   "From standard input, which the grader connects to a file of answers",
   "Python invents a value",
   "From the clipboard"
  ],
  "answer": 1,
  "why": "<code>input()</code> reads standard input, which can come from a file. If the file runs out, it raises <code>EOFError</code>.",
  "langs": {
   "java": {
    "q": "A grader runs your Java program with <code>java Greet &lt; answers.txt</code>, and the file runs out of lines before the program stops asking. What happens?",
    "choices": [
     "It waits forever",
     "<code>nextLine()</code> throws a <code>NoSuchElementException</code>",
     "<code>nextLine()</code> returns an empty string",
     "Java invents a value"
    ],
    "answer": 1,
    "why": "Standard input came from the file. When it is exhausted, <code>Scanner.nextLine()</code> throws <code>NoSuchElementException</code>."
   },
   "cpp": {
    "q": "A grader runs your C++ program with <code>./greet &lt; answers.txt</code>, and the file runs out before the program stops reading. What happens?",
    "choices": [
     "An exception is thrown",
     "The read fails and std::cin's end-of-file state is set, so the program must check for it",
     "It waits forever",
     "The variable is set to the text EOF"
    ],
    "answer": 1,
    "why": "C++ streams report problems through their state, not exceptions, by default. Write <code>if (!std::getline(std::cin, name))</code> to detect it."
   }
  }
 },
 {
  "q": "What does <code>print(f\"{2 + 3} apples\")</code> display?",
  "choices": [
   "{2 + 3} apples",
   "5 apples",
   "2 + 3 apples",
   "An error"
  ],
  "answer": 1,
  "why": "In an f-string, each expression in braces is evaluated and inserted: 2 + 3 becomes 5.",
  "langs": {
   "java": {
    "q": "What does <code>System.out.println(\"Total: \" + 2 + 3);</code> print?",
    "choices": [
     "Total: 5",
     "Total: 23",
     "Total: 2 + 3",
     "An error"
    ],
    "answer": 1,
    "why": "<code>+</code> works left to right: <code>\"Total: \" + 2</code> makes a <code>String</code>, then <code>3</code> is appended as text. Write <code>(2 + 3)</code> to add first."
   },
   "cpp": {
    "q": "What does <code>std::cout &lt;&lt; \"Total: \" &lt;&lt; 2 + 3;</code> print?",
    "choices": [
     "Total: 5",
     "Total: 23",
     "Total: 2 + 3",
     "An error"
    ],
    "answer": 0,
    "why": "<code>+</code> binds more tightly than <code>&lt;&lt;</code>, so <code>2 + 3</code> is computed first and 5 is printed."
   }
  }
 }
],
      { q: "What is <code>2 + 3 * 4 ** 2 // 5</code>?", choices: ["11", "16", "50", "9"], answer: 0, why: "4 ** 2 = 16, then 3 * 16 = 48, then 48 // 5 = 9, and finally 2 + 9 = 11." },
      { q: "Which is a valid Python variable name?", choices: ["<code>2nd_place</code>", "<code>second-place</code>", "<code>second_place</code>", "<code>class</code>"], answer: 2, why: "Names can't start with a digit, can't contain hyphens, and can't be keywords such as <code>class</code>." },
      { q: "After <code>a, b = 1, 2</code> and then <code>a, b = b, a</code>, what are <code>a</code> and <code>b</code>?", choices: ["1 and 2", "2 and 1", "2 and 2", "1 and 1"], answer: 1, why: "The right side is evaluated first, giving (2, 1), and then both names are assigned at once." }
    ],
    practice: [
      { q: `<p>Predict each value, then check in the console: <code>17 % 5</code>, <code>-7 // 2</code>, <code>2 ** 3 ** 2</code>, <code>"3" * 3</code>, <code>int("12") + 3</code>, <code>10 / 5</code>.</p>`, a: `<p><code>2</code>; <code>-4</code> (floor division rounds down); <code>512</code> (<code>**</code> goes right to left: 3 ** 2 = 9, then 2 ** 9); <code>'333'</code>; <code>15</code>; <code>2.0</code> (true division always gives a float).</p>` },
      { q: `<p>Trace this code and give the final values of <code>x</code>, <code>y</code> and <code>z</code>.</p><pre><code>x = 4
y = x + 3
x = y * 2
z = x % y
y += z</code></pre>`, a: `<table><thead><tr><th>After line</th><th>x</th><th>y</th><th>z</th></tr></thead><tbody><tr><td>1</td><td>4</td><td>-</td><td>-</td></tr><tr><td>2</td><td>4</td><td>7</td><td>-</td></tr><tr><td>3</td><td>14</td><td>7</td><td>-</td></tr><tr><td>4</td><td>14</td><td>7</td><td>0</td></tr><tr><td>5</td><td>14</td><td>7</td><td>0</td></tr></tbody></table><p>14 is exactly divisible by 7, so <code>z</code> is 0 and <code>y += z</code> leaves <code>y</code> at 7.</p>` },
      { q: `<p>Write a program that asks for a number of seconds and prints it as hours, minutes and seconds. For <code>3725</code> it should print <code>1 h 2 min 5 s</code>.</p>`, hint: `<p>Use <code>//</code> to find whole hours, then <code>%</code> to find the seconds left over. Repeat for minutes.</p>`, a: `<pre><code>total = int(input("Seconds: "))
hours = total // 3600
remaining = total % 3600
minutes = remaining // 60
seconds = remaining % 60
print(f"{hours} h {minutes} min {seconds} s")</code></pre><p>For 3725: 3725 // 3600 = 1 hour, leaving 125 seconds; 125 // 60 = 2 minutes, leaving 5 seconds.</p>` },
      { q: `<p>This line crashes. Explain why, and give two different fixes.</p><pre><code>print("You are " + 19 + " years old")</code></pre>`, a: `<p>Python won't add a string and an int, so it raises <code>TypeError: can only concatenate str (not "int") to str</code>. Fixes: convert with <code>str</code>, as in <code>"You are " + str(19) + " years old"</code>, or use an f-string: <code>f"You are {19} years old"</code>. You could also pass separate values to <code>print("You are", 19, "years old")</code>.</p>` },
      { q: `<p>Write a tip calculator. Ask for the bill amount and the tip percentage, then print the tip and the total, each with exactly two decimal places. For a bill of 48.50 and 18 percent, print <code>Tip: $8.73</code> and <code>Total: $57.23</code>.</p>`, a: `<pre><code>bill = float(input("Bill amount: "))
percent = float(input("Tip percent: "))
tip = bill * percent / 100
print(f"Tip: \${tip:.2f}")
print(f"Total: \${bill + tip:.2f}")</code></pre><p>48.50 × 18 / 100 = 8.73, and 48.50 + 8.73 = 57.23. Use <code>float</code>, not <code>int</code>, because money has cents.</p>` },
      { q: `<p>Swap the values of <code>left</code> and <code>right</code> two ways: first using a third variable, then in one line.</p>`, a: `<pre><code># With a temporary variable
temp = left
left = right
right = temp

# In one line
left, right = right, left</code></pre><p>Without the temporary variable, <code>left = right</code> followed by <code>right = left</code> would leave both names with the same value: the original value of <code>left</code> is lost.</p>` },
      { q: `<p>In the console, <code>0.1 + 0.2 == 0.3</code> is <code>False</code>. Explain why, and show how to check whether two floats are equal "enough".</p>`, a: `<p>0.1 and 0.2 can't be represented exactly in binary, so their sum is very slightly more than 0.3: <code>0.30000000000000004</code>. Compare with a tolerance instead:</p><pre><code>import math
math.isclose(0.1 + 0.2, 0.3)   # True</code></pre>` }
    ],
    sources: ["thinkpython", "mit6100l", "pytutorial"]
  }
]);

CSA.addUnits("cs101", [
  {
    id: "u2",
    title: "Branching and iteration",
    minutes: 90,
    summary: "Make decisions with if, elif and else, and repeat work with while and for loops. Includes the accumulator pattern, nested loops, and searching by bisection.",
    notes: `
<p>So far our programs run every line once, top to bottom. Real programs need to <strong>make decisions</strong> (do this only if something is true) and <strong>repeat work</strong> (do this for every student, or until the user types "quit"). These two ideas, branching and iteration, plus the values from the last lesson, are enough to compute anything a computer can compute.</p>

<h3>Comparisons and booleans</h3>
<p>A comparison produces a <code>bool</code>: <code>True</code> or <code>False</code>.</p>
<table>
  <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr></thead>
  <tbody>
    <tr><td><code>==</code></td><td>equal to</td><td><code>3 == 3</code></td><td><code>True</code></td></tr>
    <tr><td><code>!=</code></td><td>not equal to</td><td><code>3 != 4</code></td><td><code>True</code></td></tr>
    <tr><td><code>&lt;</code>, <code>&gt;</code></td><td>less than, greater than</td><td><code>5 &lt; 2</code></td><td><code>False</code></td></tr>
    <tr><td><code>&lt;=</code>, <code>&gt;=</code></td><td>at most, at least</td><td><code>5 &gt;= 5</code></td><td><code>True</code></td></tr>
  </tbody>
</table>
<p>Don't confuse <code>=</code> (assignment: make a name refer to a value) with <code>==</code> (comparison: are these equal?). Python lets you <em>chain</em> comparisons the way math does: <code>0 &lt;= score &lt;= 100</code> means "score is between 0 and 100".</p>
<p>Strings compare alphabetically, character by character, using each character's code number. Every character is stored as a number: <code>A</code> to <code>Z</code> are 65 to 90, and <code>a</code> to <code>z</code> are 97 to 122 (the Strings lesson shows how to look these up with <code>ord</code>). So all uppercase letters come before all lowercase ones, so <code>"Zebra" &lt; "apple"</code> is <code>True</code>. When case shouldn't matter, convert both sides to lowercase first: <code>"Zebra".lower()</code> gives <code>"zebra"</code>, and <code>"Zebra".lower() &lt; "apple".lower()</code> is <code>False</code>. Writing <code>.lower()</code> after a string calls a <em>method</em>, a function that belongs to the value; the Strings lesson covers methods properly.</p>

<h3>Combining conditions: and, or, not</h3>
<p><code>and</code> is true only when both sides are true; <code>or</code> is true when at least one side is; <code>not</code> flips a value. These are the logical connectives ∧, ∨ and ¬ from Discrete Mathematics.</p>
<pre><code>age = 20
has_ticket = True
can_enter = age &gt;= 18 and has_ticket      # True
is_weekend = day == "Sat" or day == "Sun"  # careful: not  day == "Sat" or "Sun"</code></pre>
<p>Python <strong>short-circuits</strong>: in <code>a and b</code>, if <code>a</code> is false, <code>b</code> is never evaluated, because the answer is already known. That makes guards like <code>x != 0 and 10 / x &gt; 1</code> safe: the division only happens when <code>x</code> isn't zero.</p>
<p>A condition doesn't have to be a <code>bool</code>. Python decides whether any value counts as true or false; this is called <strong>truthiness</strong>. The values <code>0</code>, <code>0.0</code>, the empty string <code>""</code>, <code>None</code> and empty collections (such as an empty list, which you'll meet later) count as false, and almost everything else counts as true. So <code>if name:</code> means "if name is not empty", and the non-empty string <code>"Sun"</code> counts as true.</p>
<p class="note">A classic bug that comes from truthiness: <code>if day == "Sat" or "Sun":</code> is always true. Python reads it as <code>(day == "Sat") or ("Sun")</code>, and the right side, <code>"Sun"</code>, is a non-empty string, so it counts as true. Write the comparison out in full on both sides: <code>day == "Sat" or day == "Sun"</code>.</p>

<h3>if, elif and else</h3>
<pre><code>temp = float(input("Temperature in °C: "))

if temp &gt;= 30:
    print("Hot. Drink water.")
elif temp &gt;= 15:
    print("Pleasant.")
elif temp &gt;= 0:
    print("Cold. Bring a jacket.")
else:
    print("Freezing. Watch for ice.")
print("Have a good day.")</code></pre>
<p>Python checks each condition from the top and runs the block under the <strong>first</strong> one that is true, then skips the rest. <code>else</code> catches everything that didn't match. The last line isn't indented, so it runs no matter which branch was taken.</p>
<p><strong>Indentation is part of the syntax.</strong> The lines indented under an <code>if</code> (by convention, four spaces) form its <em>block</em>. Mixing tabs and spaces, or indenting inconsistently, causes an <code>IndentationError</code>.</p>
<p>Order matters. If the first condition were <code>temp &gt;= 0</code>, a temperature of 35 would print "Cold", because the first true condition wins. Put the most specific conditions first.</p>
<p>For a simple either-or value, Python has a one-line <strong>conditional expression</strong>:</p>
<pre><code>label = "even" if n % 2 == 0 else "odd"</code></pre>
<p>Read it as "label is 'even' if n is divisible by 2, otherwise 'odd'".</p>

<h3>while loops: repeat until something changes</h3>
<p>A <code>while</code> loop checks its condition, runs its block if the condition is true, then checks again, and so on. It stops the first time the condition is false.</p>
<pre><code>count = 3
while count &gt; 0:
    print(count)
    count -= 1
print("Liftoff!")</code></pre>
<p>This prints 3, 2, 1, then "Liftoff!". Something inside the loop must eventually make the condition false. If you forget <code>count -= 1</code>, the loop runs forever. When that happens, press <strong>Ctrl+C</strong> to stop the program.</p>
<p>A very common use is <strong>input validation</strong>: keep asking until the answer is acceptable.</p>
<pre><code>age = int(input("Age: "))
while age &lt; 0 or age &gt; 130:
    print("That doesn't look like a real age.")
    age = int(input("Age: "))
print("Thanks!")</code></pre>
<p>Here is a complete program that uses a <code>while</code> loop, a branch inside it, and the <code>random</code> module from Python's standard library:</p>
<pre><code>import random

secret = random.randint(1, 100)   # a random whole number from 1 to 100
guesses = 0
guess = 0
while guess != secret:
    guess = int(input("Guess a number from 1 to 100: "))
    guesses += 1
    if guess &lt; secret:
        print("Higher.")
    elif guess &gt; secret:
        print("Lower.")
print(f"Correct! You took {guesses} guesses.")</code></pre>
<p>The first line, <code>import random</code>, loads the <code>random</code> <em>module</em>: a file of ready-made functions that comes with Python but isn't available until you ask for it. After the import, you reach its functions with a dot: <code>random.randint(1, 100)</code> means "the <code>randint</code> function from <code>random</code>", which returns a random whole number from 1 to 100, both ends included. Put imports at the top of the file. The Files and modules lesson explains modules fully.</p>

<h3>for loops: repeat for each item</h3>
<p>A <code>for</code> loop runs its block once for each item in a sequence, with a variable set to the current item. <code>range</code> produces sequences of whole numbers:</p>
<table>
  <thead><tr><th>Call</th><th>Produces</th></tr></thead>
  <tbody>
    <tr><td><code>range(5)</code></td><td>0, 1, 2, 3, 4</td></tr>
    <tr><td><code>range(2, 6)</code></td><td>2, 3, 4, 5</td></tr>
    <tr><td><code>range(1, 10, 3)</code></td><td>1, 4, 7 (start, stop, step)</td></tr>
    <tr><td><code>range(5, 0, -1)</code></td><td>5, 4, 3, 2, 1</td></tr>
  </tbody>
</table>
<p>The stop value is never included. <code>range(5)</code> has five numbers, starting at 0. A <code>for</code> loop also works directly on a string, one character at a time:</p>
<pre><code>for ch in "loop":
    print(ch)      # prints l, o, o, p on separate lines</code></pre>
<p>The word <code>in</code> also works as a test on its own: <code>ch in "aeiou"</code> is <code>True</code> when the character <code>ch</code> appears in the string <code>"aeiou"</code>, so it's a short way to write <code>ch == "a" or ch == "e" or ...</code>. And when a loop just needs to repeat and never uses its variable, programmers name the variable <code>_</code> (an underscore), which signals "I don't use this value": <code>for _ in range(3): print("hi")</code> prints <code>hi</code> three times.</p>
<p>Use <code>for</code> when you know what you are iterating over (each number in a range, each character). Use <code>while</code> when you are waiting for a condition to change (until the guess is right).</p>

<h3>The accumulator pattern</h3>
<p>Many loops build up an answer: a total, a count, a largest value. Start the accumulator before the loop, and update it inside:</p>
<pre><code>total = 0
for i in range(1, 6):
    total += i
print(total)   # 15</code></pre>
<table>
  <thead><tr><th>Pass</th><th><code>i</code></th><th><code>total</code> after the pass</th></tr></thead>
  <tbody>
    <tr><td>before the loop</td><td>-</td><td>0</td></tr>
    <tr><td>1</td><td>1</td><td>1</td></tr>
    <tr><td>2</td><td>2</td><td>3</td></tr>
    <tr><td>3</td><td>3</td><td>6</td></tr>
    <tr><td>4</td><td>4</td><td>10</td></tr>
    <tr><td>5</td><td>5</td><td>15</td></tr>
  </tbody>
</table>
<p>The same shape counts things (<code>count += 1</code> inside an <code>if</code>) or tracks a maximum (<code>if x &gt; biggest: biggest = x</code>).</p>
<div class="callout"><strong>Loop invariant.</strong> For any loop, ask: what is true at the start of every pass? Here, before each pass, <code>total</code> equals 1 + 2 + … + (i − 1), the sum of everything handled so far. If that statement is true before the first pass and each pass keeps it true, then when the loop ends it tells you the result is right. This is exactly the reasoning of a proof by induction, which you'll meet in Discrete Mathematics.</div>

<h3>break and continue</h3>
<p><code>break</code> leaves the loop immediately. <code>continue</code> skips the rest of the current pass and moves to the next one.</p>
<pre><code># break: find the first multiple of 7 greater than 100
n = 101
while True:
    if n % 7 == 0:
        break
    n += 1
print(n)   # 105

# continue: add up only the positive numbers
total = 0
for x in range(-3, 4):
    if x &lt;= 0:
        continue
    total += x
print(total)   # 1 + 2 + 3 = 6</code></pre>
<p><code>while True:</code> with a <code>break</code> inside is a common way to write "loop until something happens". Use these sparingly; a clear loop condition is usually easier to read.</p>

<h3>Nested loops</h3>
<p>A loop inside a loop runs its inner block completely for every pass of the outer one. This prints a multiplication table:</p>
<pre><code>for row in range(1, 4):
    for col in range(1, 6):
        print(f"{row * col:4}", end="")
    print()</code></pre>
<pre data-label="Output"><code>   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15</code></pre>
<p>Two new details: <code>:4</code> inside an f-string pads a value to four characters wide, so the columns line up; and <code>end=""</code> tells <code>print</code> not to start a new line. <code>end=""</code> is a <em>keyword argument</em>: a value passed to a function by name rather than by position. It isn't special to <code>print</code>; any function can accept named arguments, and the next lesson shows how to write your own. (<code>print</code>'s <code>end</code> is normally <code>"\\n"</code>, a new line; here we replace it with nothing.) The empty <code>print()</code> ends each row. The inner block ran 3 × 5 = 15 times.</p>

<h3>Searching with loops: guess-and-check and bisection</h3>
<p>Loops let a program search for an answer. Suppose we want √2 without using a square root function. <strong>Guess-and-check</strong> tries values in small steps until one is close enough:</p>
<pre><code>x = 0.0
step = 0.0001
while x * x &lt; 2:
    x += step
print(x)   # about 1.4143, after more than 14,000 passes</code></pre>
<p><strong>Bisection</strong> is far faster. We know the answer is between 0 and 2, because 0² &lt; 2 &lt; 2². Check the middle of that range: if its square is too big, the answer is in the lower half; otherwise it's in the upper half. Each pass cuts the range in half.</p>
<pre><code>low, high = 0.0, 2.0
while high - low &gt; 0.000001:
    mid = (low + high) / 2
    if mid * mid &gt; 2:
        high = mid
    else:
        low = mid
print(low)   # 1.414213..., after only 21 passes</code></pre>
<p>Twenty-one halvings shrink a range of width 2 to less than one millionth, because 2²¹ is about two million. Bisection appears again in Calculus (where a theorem guarantees it works) and in the efficiency lesson later in this course (where it becomes binary search).</p>

<h3>A loop with surprises: the Collatz sequence</h3>
<p>Start with any positive whole number. If it's even, halve it; if it's odd, triple it and add one. Repeat until you reach 1.</p>
<pre><code>n = 27
steps = 0
while n != 1:
    n = n // 2 if n % 2 == 0 else 3 * n + 1
    steps += 1
print(steps)   # 111</code></pre>
<p>Starting from 27, it takes 111 steps and climbs as high as 9,232 before falling to 1. Every starting number ever tested eventually reaches 1, but nobody has proved that it always does. This is the <strong>Collatz conjecture</strong>, an open problem since 1937, and a reminder that a five-line loop can be beyond our ability to fully analyze.</p>
`,
    terms: [
      ["Boolean", "A value that is True or False."],
      ["Short-circuit evaluation", "Stopping evaluation of and/or as soon as the result is known."],
      ["Truthiness", "How Python treats non-boolean values in conditions: 0, empty strings, empty collections and None count as false."],
      ["Block", "The indented lines that belong to an if, while, for or def."],
      ["Iteration", "Repeating a block of code."],
      ["Accumulator", "A variable that builds up a result across the passes of a loop, such as a running total."],
      ["Loop invariant", "A condition that is true at the start of every pass through a loop."],
      ["Bisection search", "Finding a value by repeatedly halving an interval that contains it."]
    ],
    quiz: [
      { q: "How many times does the body of <code>for i in range(3, 10, 2):</code> run?", choices: ["3", "4", "7", "5"], answer: 1, why: "It produces 3, 5, 7, 9. Four values; 10 is excluded." },
      { q: "In <code>x != 0 and 10 / x &gt; 1</code>, what happens when <code>x</code> is 0?", choices: ["ZeroDivisionError", "The expression is False", "The expression is True", "SyntaxError"], answer: 1, why: "Short-circuiting: <code>x != 0</code> is False, so Python never evaluates the division." },
      { q: "Bisection on an interval of width 1 needs about how many steps to reach width 0.001?", choices: ["3", "10", "100", "1000"], answer: 1, why: "Each step halves the width. 2<sup>10</sup> = 1024, so 10 halvings get below 0.001." },
      { q: "With <code>day = \"Mon\"</code>, what does <code>if day == \"Sat\" or \"Sun\":</code> do?", choices: ["Skips the block", "Runs the block, because a non-empty string counts as true", "Raises an error", "Compares day to both strings"], answer: 1, why: "It means <code>(day == \"Sat\") or \"Sun\"</code>, and <code>\"Sun\"</code> is truthy. Write <code>day == \"Sat\" or day == \"Sun\"</code>." },
      { q: "A program should keep asking for a password until the user types the right one. Which loop fits best?", choices: ["for i in range(10)", "while", "A nested for loop", "No loop is needed"], answer: 1, why: "You don't know in advance how many tries it will take, so loop while the condition (wrong password) holds." },
      { q: "In the accumulator loop that sums 1 to 5, what is true at the start of every pass?", choices: ["total equals i", "total equals 1 + 2 + … + (i − 1)", "total equals 15", "total is even"], answer: 1, why: "That is the loop invariant: total holds the sum of everything handled before this pass." }
    ],
    practice: [
      { q: `<p><strong>FizzBuzz.</strong> Print the numbers 1 to 30, but print <code>Fizz</code> for multiples of 3, <code>Buzz</code> for multiples of 5, and <code>FizzBuzz</code> for multiples of both.</p>`, hint: `<p>Check the "both" case first. Why does the order of the conditions matter?</p>`, a: `<pre><code>for n in range(1, 31):
    if n % 15 == 0:
        print("FizzBuzz")
    elif n % 3 == 0:
        print("Fizz")
    elif n % 5 == 0:
        print("Buzz")
    else:
        print(n)</code></pre><p>If <code>n % 3 == 0</code> came first, 15 would print "Fizz" and the FizzBuzz branch would never run. Multiples of both 3 and 5 are exactly the multiples of 15.</p>` },
      { q: `<p>Write a program that asks for a whole number and prints the sum of its digits. For <code>4096</code> it prints <code>19</code>. Use <code>%</code> and <code>//</code>, not strings.</p>`, hint: `<p><code>n % 10</code> is the last digit and <code>n // 10</code> removes it. Repeat while there are digits left.</p>`, a: `<pre><code>n = int(input("Number: "))
total = 0
while n &gt; 0:
    total += n % 10
    n //= 10
print(total)</code></pre><p>Trace for 4096: total becomes 6, then 6 + 9 = 15, then 15 + 0 = 15, then 15 + 4 = 19, and n reaches 0.</p>` },
      { q: `<p>Count the vowels (a, e, i, o, u, upper or lower case) in a word the user types. <code>Education</code> has 5.</p>`, a: `<pre><code>word = input("Word: ")
count = 0
for ch in word.lower():
    if ch in "aeiou":
        count += 1
print(count)</code></pre><p><code>ch in "aeiou"</code> checks whether the character appears in that string. Lowercasing first means you only need to check five letters.</p>` },
      { q: `<p>Ask the user for numbers one at a time until they enter 0, then print the largest number they entered (not counting the 0). Don't use the built-in <code>max</code>.</p>`, hint: `<p>What should the "largest so far" start as? Think about what happens if every number is negative.</p>`, a: `<pre><code>x = int(input("Number (0 to stop): "))
largest = x
while x != 0:
    if x &gt; largest:
        largest = x
    x = int(input("Number (0 to stop): "))
if largest == 0:
    print("No numbers entered.")
else:
    print("Largest:", largest)</code></pre><p>Starting <code>largest</code> at the first number entered, not at 0, makes it work when every number is negative.</p>` },
      { q: `<p>Use nested loops to print this triangle for a height the user chooses (here, 4):</p><pre data-label="Output"><code>*
**
***
****</code></pre>`, a: `<pre><code>height = int(input("Height: "))
for row in range(1, height + 1):
    for _ in range(row):
        print("*", end="")
    print()</code></pre><p>Using <code>_</code> as the loop variable signals "I don't use this value". A shorter version uses string repetition: <code>print("*" * row)</code>.</p>` },
      { q: `<p>Trace this loop. What does it print, and how many times does the body run?</p><pre><code>n = 10
result = 1
while n &gt; 1:
    result *= n
    n -= 3
print(result)</code></pre>`, a: `<table><thead><tr><th>Pass</th><th>result after</th><th>n after</th></tr></thead><tbody><tr><td>1</td><td>10</td><td>7</td></tr><tr><td>2</td><td>70</td><td>4</td></tr><tr><td>3</td><td>280</td><td>1</td></tr></tbody></table><p>After the third pass <code>n</code> is 1, so the condition <code>n &gt; 1</code> is false. The body ran 3 times and the program prints <code>280</code>.</p>` },
      { q: `<p>Change the bisection program to compute the cube root of 10 to within 0.000001. What range should you start with, and how did you choose it?</p>`, a: `<pre><code>low, high = 0.0, 10.0      # 0³ &lt; 10 &lt; 10³, so the answer is in here
while high - low &gt; 0.000001:
    mid = (low + high) / 2
    if mid ** 3 &gt; 10:
        high = mid
    else:
        low = mid
print(low)   # about 2.154435</code></pre><p>Any starting range works as long as the answer is guaranteed to be inside it. For a target of at least 1, 0 to the target itself works, because the cube root of a number at least 1 is no bigger than the number.</p>` }
    ],
    sources: ["mit6100l", "thinkpython", "pytutorial"]
  },
  {
    id: "u3",
    title: "Functions and abstraction",
    minutes: 90,
    summary: "Package logic into functions with parameters and return values, understand how calls and scope work, write specifications, and use functions as values.",
    notes: `
<p>As programs grow, writing everything in one long sequence becomes unmanageable. A <strong>function</strong> gives a name to a piece of computation. Once it works, you can use it without thinking about how it works inside, the same way you use <code>print</code> without knowing how it puts text on the screen. That idea, <strong>abstraction</strong>, is the most important tool for managing complexity in every program you'll ever write.</p>
<p>Functions also let you <strong>reuse</strong> code instead of copying it, <strong>test</strong> one piece at a time, and give names that make a program read like a description of what it does.</p>

<h3>Defining and calling a function</h3>
<div class="multi">
<pre data-lang="python"><code>def hypotenuse(a, b):
    """Return the length of the hypotenuse of a right triangle."""
    return (a ** 2 + b ** 2) ** 0.5

print(hypotenuse(3, 4))   # 5.0</code></pre>
<pre data-lang="java"><code>/** Return the length of the hypotenuse of a right triangle. */
static double hypotenuse(double a, double b) {
    return Math.sqrt(a * a + b * b);
}

System.out.println(hypotenuse(3, 4));   // 5.0</code></pre>
<pre data-lang="cpp"><code>// Return the length of the hypotenuse of a right triangle.
double hypotenuse(double a, double b) {
    return std::sqrt(a * a + b * b);
}

std::cout &lt;&lt; hypotenuse(3, 4) &lt;&lt; "\\n";   // 5</code></pre>
</div>
<p>The parts of a definition:</p>
<ul>
  <li><code>def</code> starts the definition, followed by the function's name and its <strong>parameters</strong> in parentheses: here <code>a</code> and <code>b</code>.</li>
  <li>The indented block is the function's <strong>body</strong>.</li>
  <li>The string just under the <code>def</code> line is a <strong>docstring</strong>. It says what the function does. <code>help(hypotenuse)</code> displays it.</li>
  <li><code>return</code> ends the function and hands a value back to whoever called it.</li>
</ul>
<p>Defining a function doesn't run it. It runs only when <strong>called</strong>, as in <code>hypotenuse(3, 4)</code>. The values in the call, <code>3</code> and <code>4</code>, are <strong>arguments</strong>; they are assigned to the parameters in order, so inside this call <code>a</code> is 3 and <code>b</code> is 4.</p>

<h3>What happens during a call</h3>
<p>When Python reaches a call, it pauses where it is, jumps into the function, runs the body, and then comes back to the exact spot it left, with the returned value in place of the call:</p>
<pre><code>def square(x):
    return x * x          # 3. runs with x = 4, returns 16

print("start")           # 1.
result = square(4) + 1    # 2. pauses, calls square(4); 4. gets 16, computes 17
print(result)             # 5. prints 17</code></pre>

<h3>return versus print</h3>
<p>This is the most common confusion in a first programming course, so it's worth slowing down.</p>
<pre><code>def area_print(w, h):
    print(w * h)

def area_return(w, h):
    return w * h

x = area_print(3, 4)    # shows 12 on the screen
y = area_return(3, 4)   # shows nothing
print(x)                # None
print(y)                # 12
print(y + 1)            # 13</code></pre>
<p><code>print</code> shows text to a person and then the value is gone. <code>return</code> gives the value back to the program, which can store it, print it, or use it in more calculations. A function with no <code>return</code> statement returns the special value <code>None</code>. As a rule, functions that <em>compute</em> something should return it, and leave printing to the code that calls them.</p>
<p>A function can have several <code>return</code> statements; the first one reached ends the call. This is often the clearest way to handle special cases:</p>
<pre><code>def sign(n):
    if n &gt; 0:
        return "positive"
    if n &lt; 0:
        return "negative"
    return "zero"</code></pre>

<h3>Default and keyword arguments</h3>
<p>A parameter can have a <strong>default value</strong>, used when the caller leaves that argument out. Callers can also name arguments, which makes calls easier to read and lets them skip optional ones:</p>
<pre><code>def greet(name, greeting="Hello", punctuation="!"):
    return f"{greeting}, {name}{punctuation}"

greet("Ada")                       # 'Hello, Ada!'
greet("Ada", "Welcome")            # 'Welcome, Ada!'
greet("Ada", punctuation=".")      # 'Hello, Ada.'</code></pre>
<p>You've already used keyword arguments: <code>print(x, end="")</code> passes <code>end</code> by name.</p>

<h3>Scope: each call has its own names</h3>
<p>Each call creates a new <strong>frame</strong>: a private set of names for that call. Parameters and variables assigned inside a function live in its frame and disappear when it returns. Names defined outside any function live in the <strong>global</strong> frame.</p>
<pre><code>x = 10
def bump(x):
    x = x + 1
    return x

print(bump(x))   # 11
print(x)         # 10: the global x never changed</code></pre>
<figure class="fig">
<svg viewBox="0 0 440 160" role="img" aria-label="Two frames: the global frame has x referring to 10; the frame for bump has its own x referring to 11">
  <rect x="10" y="20" width="190" height="120" rx="6" class="box"/><text x="22" y="40" class="m">global frame</text>
  <text x="30" y="75" class="code">x</text><text x="60" y="75" class="code">→ 10</text>
  <text x="30" y="105" class="code">bump</text><text x="76" y="105" class="code">→ function</text>
  <rect x="235" y="20" width="190" height="120" rx="6" class="soft"/><text x="247" y="40" class="m">frame for bump(x)</text>
  <text x="255" y="75" class="code">x</text><text x="285" y="75" class="code">→ 10, then 11</text>
  <text x="255" y="112" class="m">disappears after return</text>
</svg>
<figcaption>The <code>x</code> inside <code>bump</code> is a different name from the global <code>x</code>, in a different frame. Reassigning it changes only the function's own copy of the name.</figcaption>
</figure>
<p>A function <em>can read</em> global names, but if it assigns to a name, that name is local to the function unless declared with <code>global</code>. Here is what goes wrong without it, and what the declaration looks like:</p>
<pre><code>count = 0

def add_one():
    count = count + 1     # assigning makes count local, so reading it first fails

add_one()   # UnboundLocalError: cannot access local variable 'count' ...

def add_one_global():
    global count          # "count in this function means the global name"
    count = count + 1

add_one_global()
print(count)   # 1</code></pre>
<p>Avoid <code>global</code>: functions that take inputs as parameters and give results back with <code>return</code> are far easier to test and reuse. The better version is <code>def add_one(n): return n + 1</code>, called as <code>count = add_one(count)</code>.</p>

<h3>Specifications</h3>
<p>A good function has a <strong>contract</strong> between the function and its callers, written in the docstring:</p>
<ul>
  <li>The <strong>precondition</strong> says what the caller must provide.</li>
  <li>The <strong>postcondition</strong> says what the function promises to return or do, if the precondition holds.</li>
</ul>
<pre><code>def is_leap_year(year):
    """Return True if year is a leap year in the Gregorian calendar.

    Precondition: year is a positive int.
    """
    if year % 400 == 0:
        return True
    if year % 100 == 0:
        return False
    return year % 4 == 0</code></pre>
<p>The rule is: years divisible by 4 are leap years, except years divisible by 100, except years divisible by 400. So 2024 and 2000 are leap years, but 1900 is not. Writing the specification first forces you to decide exactly what the function is for before you write it.</p>

<h3>Decomposition: building with functions</h3>
<p>Once <code>is_leap_year</code> works, other functions can use it without caring how it works:</p>
<pre><code>def days_in_month(month, year):
    """Return the number of days in a month (1 to 12) of a given year."""
    if month == 2:
        return 29 if is_leap_year(year) else 28
    if month in (4, 6, 9, 11):
        return 30
    return 31</code></pre>
<p>Two small pieces of new notation here. <code>29 if is_leap_year(year) else 28</code> is a one-line choice: it gives 29 when the condition is true and 28 otherwise. <code>(4, 6, 9, 11)</code> is a <em>tuple</em>, a fixed group of values in parentheses (the Lists lesson covers tuples), and <code>month in (4, 6, 9, 11)</code> is <code>True</code> when <code>month</code> is one of them, just as <code>ch in "aeiou"</code> tests a character in Lesson 3.</p>
<p>This is <strong>decomposition</strong>: breaking a problem into small functions, each with one clear job. A useful test: if describing a function needs the word "and", or if it's longer than your screen, split it.</p>

<h3>Functions are values</h3>
<p>A function is a value like any other: you can store it in a variable or pass it to another function.</p>
<pre><code>def apply_twice(f, x):
    return f(f(x))

def triple(n):
    return n * 3

apply_twice(triple, 2)   # triple(triple(2)) = 18</code></pre>
<p>For a tiny function you only need once, Python has <strong>lambda</strong>, a way to write a function in a single expression without giving it a name. <code>lambda n: n * 3</code> means "a function that takes <code>n</code> and returns <code>n * 3</code>". So <code>apply_twice(lambda n: n * 3, 2)</code> also gives 18. You'll see lambdas used with sorting (in the lists lesson) and in the math courses' code. For example, <a href="#c-math130-u2">MATH 130, Continuity</a> defines a function <code>bisect(f, lo, hi)</code> that finds where <code>f</code> crosses zero. <code>bisect</code> is not built into Python, so you must define it before calling it, or you get a <code>NameError</code>. Here is a short version you can type in and try:</p>
<pre><code>def bisect(f, lo, hi, tol=1e-10):
    """Find x in [lo, hi] with f(x) close to 0; f(lo) and f(hi) must differ in sign."""
    while hi - lo &gt; tol:
        mid = (lo + hi) / 2
        if f(lo) * f(mid) &lt;= 0:   # sign change in the left half
            hi = mid
        else:
            lo = mid
    return (lo + hi) / 2

print(bisect(lambda x: x**2 - 2, 0, 2))   # 1.414213562355144, close to √2</code></pre>
<p>The lambda <code>lambda x: x**2 - 2</code> is the function whose zero we want; writing it inline saves defining a named function just for this call. <code>tol=1e-10</code> is a default argument: the loop stops once the interval is narrower than 10<sup>−10</sup> (<code>1e-10</code> is scientific notation, from <a href="#c-cs101-u1">Lesson 2</a>).</p>

<h3>Checking functions with assert</h3>
<p>Because functions take inputs and return outputs, they are easy to check:</p>
<pre><code>assert is_leap_year(2024)
assert is_leap_year(2000)
assert not is_leap_year(1900)
assert days_in_month(2, 2023) == 28</code></pre>
<p><code>assert</code> does nothing if the condition is true and stops the program with an <code>AssertionError</code> if it's false. The testing lesson builds on this.</p>
`,
    terms: [
      ["Function", "A named, reusable piece of computation."],
      ["Parameter", "A name in a function definition that receives an argument."],
      ["Argument", "The value passed to a function when it is called."],
      ["Return value", "The value a function hands back to its caller. Without a return statement it is None."],
      ["Default argument", "A parameter value used when the caller doesn't supply one."],
      ["Frame", "The private set of names created for one function call."],
      ["Scope", "The region of code where a name is visible."],
      ["Docstring", "A string just under a def line that describes what the function does."],
      ["Precondition / postcondition", "What a caller must provide, and what the function promises in return."],
      ["Abstraction", "Hiding how something works behind what it does."],
      ["Lambda", "A small unnamed function written as a single expression, such as lambda x: x + 1."]
    ],
    quiz: [
      { q: "What does a Python function return if it has no return statement?", choices: ["0", "An empty string", "None", "It raises an error"], answer: 2, why: "Every function returns something. Without a <code>return</code>, that is <code>None</code>." },
      { q: "A function prints its result but does not return it. What does <code>y = f()</code> store in <code>y</code>?", choices: ["The printed text", "None", "True", "The function itself"], answer: 1, why: "Printing does not produce a return value, so <code>y</code> becomes <code>None</code>." },
      { q: "Why does changing a parameter inside a function not change the caller's variable with the same name?", choices: ["Python copies every value", "Each call has its own frame of names", "Parameters are read-only", "It does change it"], answer: 1, why: "Rebinding a name in the function's frame does not affect names in other frames." },
      { q: "With <code>def greet(name, greeting=\"Hello\")</code>, what does <code>greet(\"Ada\", greeting=\"Hi\")</code> return if the body is <code>return f\"{greeting}, {name}\"</code>?", choices: ["Hello, Ada", "Hi, Ada", "Ada, Hi", "An error"], answer: 1, why: "The keyword argument overrides the default value." },
      { q: "What is <code>(lambda x: x * x + 1)(3)</code>?", choices: ["7", "10", "16", "An error"], answer: 1, why: "The lambda is a function; calling it with 3 computes 3 × 3 + 1 = 10." },
      { q: "Is 1900 a leap year?", choices: ["Yes, it's divisible by 4", "No, it's divisible by 100 but not by 400", "Yes, it's divisible by 100", "Only in some countries"], answer: 1, why: "Century years are leap years only when divisible by 400, which is why 2000 was one and 1900 was not." }
    ],
    practice: [
      { q: `<p>Write <code>is_even(n)</code> that returns <code>True</code> if <code>n</code> is even. Then write <code>count_evens(a, b)</code> that uses it to count the even numbers from <code>a</code> to <code>b</code> inclusive.</p>`, a: `<pre><code>def is_even(n):
    """Return True if n is even."""
    return n % 2 == 0

def count_evens(a, b):
    """Return how many even numbers are in a..b, inclusive."""
    count = 0
    for n in range(a, b + 1):
        if is_even(n):
            count += 1
    return count

assert count_evens(1, 10) == 5</code></pre><p>Note <code>return n % 2 == 0</code>: the comparison is already a boolean, so there's no need for <code>if ...: return True else: return False</code>.</p>` },
      { q: `<p>Write <code>c_to_f(c)</code> and <code>f_to_c(f)</code> to convert between Celsius and Fahrenheit (F = C × 9/5 + 32). Check with <code>assert</code> that converting 100 °C to F and back gives 100. The results are floats, so compare them with <code>math.isclose</code>, not <code>==</code> (<a href="#c-cs101-u1">Lesson 2, Floats are approximate</a>).</p>`, a: `<pre><code>import math

def c_to_f(c):
    return c * 9 / 5 + 32

def f_to_c(f):
    return (f - 32) * 5 / 9

assert math.isclose(c_to_f(100), 212)
assert math.isclose(f_to_c(c_to_f(100)), 100)</code></pre><p>Using <code>math.isclose</code> for the round trip guards against tiny floating-point errors. For 100 the round trip happens to come back exactly, but try 1: <code>f_to_c(c_to_f(1))</code> is <code>0.9999999999999984</code>, so <code>== 1</code> would fail even though the functions are correct.</p>` },
      { q: `<p>This program is supposed to print the average of two test scores, but it prints <code>None</code>. Explain the bug and fix it.</p><pre><code>def average(a, b):
    print((a + b) / 2)

result = average(80, 91)
print("Average:", result)</code></pre>`, a: `<p><code>average</code> prints the value but doesn't return it, so it returns <code>None</code>, which is what <code>result</code> holds. (The program actually prints <code>85.5</code> and then <code>Average: None</code>.) Fix: replace <code>print((a + b) / 2)</code> with <code>return (a + b) / 2</code>.</p>` },
      { q: `<p>Write <code>max_of_three(a, b, c)</code> without using the built-in <code>max</code>. Test it with at least four calls, including one where two values tie for largest.</p>`, a: `<pre><code>def max_of_three(a, b, c):
    biggest = a
    if b &gt; biggest:
        biggest = b
    if c &gt; biggest:
        biggest = c
    return biggest

assert max_of_three(1, 2, 3) == 3
assert max_of_three(3, 2, 1) == 3
assert max_of_three(2, 3, 1) == 3
assert max_of_three(5, 5, 1) == 5</code></pre><p>Testing each position for the largest value, plus a tie, catches the most common mistakes.</p>` },
      { q: `<p>What does this program print? Draw the frames to explain.</p><pre><code>total = 0

def add(n):
    total = n + 1
    return total

print(add(5))
print(total)</code></pre>`, a: `<p>It prints <code>6</code>, then <code>0</code>. The assignment <code>total = n + 1</code> inside <code>add</code> creates a new local name in <code>add</code>'s frame. The global <code>total</code> is a different name and is never changed.</p>` },
      { q: `<p>Write <code>format_name(first, last, last_first=False)</code>. By default it returns <code>"Ada Lovelace"</code>; called with <code>last_first=True</code> it returns <code>"Lovelace, Ada"</code>. Write a docstring with a precondition.</p>`, a: `<pre><code>def format_name(first, last, last_first=False):
    """Return a full name.

    Precondition: first and last are non-empty strings.
    If last_first is True, return "Last, First"; otherwise "First Last".
    """
    if last_first:
        return f"{last}, {first}"
    return f"{first} {last}"</code></pre>` },
      { q: `<p>Write <code>apply_n(f, x, n)</code> that applies function <code>f</code> to <code>x</code> exactly <code>n</code> times. Use it with a lambda to compute 2 doubled 10 times.</p>`, a: `<pre><code>def apply_n(f, x, n):
    for _ in range(n):
        x = f(x)
    return x

apply_n(lambda v: v * 2, 2, 10)   # 2048</code></pre><p>2 doubled 10 times is 2 × 2¹⁰ = 2048.</p>` }
    ],
    sources: ["thinkpython", "mit6100l", "pytutorial"]
  }
]);

CSA.addUnits("cs101", [
  {
    id: "str",
    title: "Strings",
    minutes: 90,
    summary: "Work with text: indexing and slicing, immutability, string methods, formatting, character codes, and common text-processing patterns.",
    notes: `
<p>Text is everywhere in computing: names, messages, web pages, source code itself. Python represents text as a <strong>string</strong> (type <code>str</code>), a sequence of characters. This lesson covers how to pick strings apart, build new ones, and process text one word or character at a time.</p>

<h3>Writing strings</h3>
<p>Strings can use single or double quotes; pick whichever avoids clashing with the text: <code>"It's"</code> or <code>'She said "hi"'</code>. Some characters can't be typed directly inside quotes, so Python uses <strong>escape sequences</strong> that start with a backslash:</p>
<table>
  <thead><tr><th>Escape</th><th>Means</th></tr></thead>
  <tbody>
    <tr><td><code>\\n</code></td><td>New line</td></tr>
    <tr><td><code>\\t</code></td><td>Tab</td></tr>
    <tr><td><code>\\"</code> and <code>\\'</code></td><td>A quote character inside a string</td></tr>
    <tr><td><code>\\\\</code></td><td>A single backslash</td></tr>
  </tbody>
</table>
<p>Triple quotes (<code>"""..."""</code>) allow a string to span several lines; you've seen them in docstrings. <code>len(s)</code> gives the number of characters, and <code>""</code> is the empty string, with length 0.</p>

<h3>Indexing: one character at a time</h3>
<p>Each character has a position, its <strong>index</strong>, starting at 0. Negative indexes count from the end, so <code>-1</code> is always the last character.</p>
<table>
  <thead><tr><th>Character</th><th>p</th><th>y</th><th>t</th><th>h</th><th>o</th><th>n</th></tr></thead>
  <tbody>
    <tr><td>Index</td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr>
    <tr><td>Negative index</td><td>−6</td><td>−5</td><td>−4</td><td>−3</td><td>−2</td><td>−1</td></tr>
  </tbody>
</table>
<pre><code>s = "python"
s[0]     # 'p'
s[5]     # 'n'
s[-1]    # 'n'
s[6]     # IndexError: string index out of range</code></pre>
<p>A string of length <em>n</em> has valid indexes 0 to <em>n</em> − 1. Asking for <code>s[len(s)]</code> is one of the most common off-by-one errors.</p>

<h3>Slicing: pieces of a string</h3>
<p><code>s[a:b]</code> gives the characters from index <code>a</code> up to <em>but not including</em> <code>b</code>, the same rule as <code>range</code>. Leave out <code>a</code> to start at the beginning, or <code>b</code> to go to the end. A third number is the step.</p>
<pre><code>s = "python"
s[1:4]    # 'yth'   (indexes 1, 2, 3)
s[:2]     # 'py'
s[2:]     # 'thon'
s[-3:]    # 'hon'   (the last three characters)
s[::2]    # 'pto'   (every second character)
s[::-1]   # 'nohtyp' (reversed)</code></pre>
<p>A helpful picture: indexes sit <em>between</em> characters, and a slice cuts at two of those positions. That's why <code>s[1:4]</code> has length 4 − 1 = 3. Unlike indexing, slicing never raises an error: <code>s[2:100]</code> just gives <code>'thon'</code>.</p>

<h3>Strings are immutable</h3>
<p>You can't change a string in place:</p>
<pre><code>s = "python"
s[0] = "j"          # TypeError: 'str' object does not support item assignment
s = "j" + s[1:]     # build a new string instead: 'jython'</code></pre>
<p>Every operation that seems to change a string actually creates a new one. That's why string methods <em>return</em> results instead of modifying the original: <code>name.upper()</code> leaves <code>name</code> unchanged, so you write <code>name = name.upper()</code> to keep the result.</p>

<h3>String methods</h3>
<p>A <strong>method</strong> is a function that belongs to a value, called with a dot: <code>s.upper()</code>. These are the ones you'll use most:</p>
<table>
  <thead><tr><th>Method</th><th>Example</th><th>Result</th></tr></thead>
  <tbody>
    <tr><td><code>lower()</code>, <code>upper()</code></td><td><code>"Ada".upper()</code></td><td><code>'ADA'</code></td></tr>
    <tr><td><code>strip()</code></td><td><code>"  hi \\n".strip()</code></td><td><code>'hi'</code> (removes surrounding spaces and new lines)</td></tr>
    <tr><td><code>replace(old, new)</code></td><td><code>"a-b-c".replace("-", "+")</code></td><td><code>'a+b+c'</code></td></tr>
    <tr><td><code>split()</code></td><td><code>"to be or not".split()</code></td><td><code>['to', 'be', 'or', 'not']</code>. With no argument it splits at any run of spaces, tabs or new lines and ignores them at the ends, so <code>"  to   be ".split()</code> is also <code>['to', 'be']</code></td></tr>
    <tr><td><code>split(sep)</code></td><td><code>"3,14,15".split(",")</code></td><td><code>['3', '14', '15']</code></td></tr>
    <tr><td><code>sep.join(items)</code></td><td><code>"-".join(["a", "b", "c"])</code></td><td><code>'a-b-c'</code></td></tr>
    <tr><td><code>find(sub)</code></td><td><code>"banana".find("na")</code></td><td><code>2</code> (or <code>-1</code> if not found)</td></tr>
    <tr><td><code>count(sub)</code></td><td><code>"banana".count("a")</code></td><td><code>3</code></td></tr>
    <tr><td><code>startswith</code>, <code>endswith</code></td><td><code>"report.pdf".endswith(".pdf")</code></td><td><code>True</code></td></tr>
    <tr><td><code>isdigit()</code>, <code>isalpha()</code></td><td><code>"2024".isdigit()</code></td><td><code>True</code></td></tr>
    <tr><td><code>isupper()</code>, <code>islower()</code></td><td><code>"A".isupper()</code>, <code>"a".isupper()</code></td><td><code>True</code>, <code>False</code></td></tr>
    <tr><td><code>isalnum()</code></td><td><code>"R2D2".isalnum()</code>, <code>"R2-D2".isalnum()</code></td><td><code>True</code>, <code>False</code> (letters or digits only: "alphanumeric")</td></tr>
  </tbody>
</table>
<p><code>split</code> and <code>join</code> are opposites: <code>split</code> breaks a string into a <em>list</em> of pieces (lists are the next lesson; for now, a list is a sequence of values in square brackets, such as <code>['to', 'be']</code>, and it can be indexed and sliced just like a string, so <code>['to', 'be'][::-1]</code> is <code>['be', 'to']</code>), and <code>join</code> glues a list of strings together with a separator. The <code>in</code> operator checks for a substring: <code>"ana" in "banana"</code> is <code>True</code>.</p>

<h3>Looping over strings</h3>
<p>A <code>for</code> loop visits each character. When you also need each position, use <code>enumerate</code>, which gives pairs of (index, character):</p>
<pre><code>for i, ch in enumerate("hey"):
    print(i, ch)
# 0 h
# 1 e
# 2 y</code></pre>
<p>A very common pattern builds a new string piece by piece:</p>
<pre><code>def remove_vowels(text):
    result = ""
    for ch in text:
        if ch.lower() not in "aeiou":
            result += ch
    return result

remove_vowels("Programming")   # 'Prgrmmng'</code></pre>

<h3>Formatting with f-strings</h3>
<p>After the value in an f-string, a colon introduces a <strong>format specification</strong>:</p>
<table>
  <thead><tr><th>Code</th><th>Result</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td><code>f"{3.14159:.2f}"</code></td><td><code>3.14</code></td><td>Two decimal places</td></tr>
    <tr><td><code>f"{1234567:,}"</code></td><td><code>1,234,567</code></td><td>Thousands separators</td></tr>
    <tr><td><code>f"{42:5}"</code></td><td><code>&nbsp;&nbsp;&nbsp;42</code></td><td>Width 5 (numbers align right)</td></tr>
    <tr><td><code>f"{'ab':&gt;5}"</code></td><td><code>&nbsp;&nbsp;&nbsp;ab</code></td><td>Width 5, aligned right</td></tr>
    <tr><td><code>f"{0.256:.1%}"</code></td><td><code>25.6%</code></td><td>As a percentage</td></tr>
  </tbody>
</table>

<h3>Characters are numbers underneath</h3>
<p>Computers store each character as a number. <code>ord(ch)</code> gives a character's number and <code>chr(n)</code> goes the other way: <code>ord("A")</code> is 65, <code>ord("a")</code> is 97, and <code>chr(66)</code> is <code>'B'</code>. Python strings use <strong>Unicode</strong>, which assigns numbers to the characters of nearly every writing system, plus emoji. That's why <code>"Zebra" &lt; "apple"</code>: the code for <code>Z</code> (90) is less than the code for <code>a</code> (97).</p>
<p>Character codes make a classic exercise possible: the <strong>Caesar cipher</strong>, which shifts each letter a fixed number of places through the alphabet.</p>
<pre><code>def caesar(text, shift):
    """Shift each lowercase letter by shift places, wrapping z back to a."""
    result = ""
    for ch in text:
        if "a" &lt;= ch &lt;= "z":
            offset = (ord(ch) - ord("a") + shift) % 26
            result += chr(ord("a") + offset)
        else:
            result += ch
    return result

caesar("hello, world", 3)    # 'khoor, zruog'
caesar("khoor, zruog", -3)   # 'hello, world'</code></pre>
<p>The <code>% 26</code> makes the alphabet wrap around: shifting <code>z</code> by 1 gives 26 % 26 = 0, which is <code>a</code>.</p>

<h3>Worked example: is it a palindrome?</h3>
<p>A palindrome reads the same backward, ignoring case, spaces and punctuation, as in "A man, a plan, a canal: Panama". Break the problem into two steps: clean the text, then compare.</p>
<p>First, <code>clean</code> written with the loop pattern you already know. <code>isalnum()</code> (in the table above) is true for letters and digits:</p>
<pre><code>def clean(text):
    """Return only the letters and digits of text, in lowercase."""
    result = ""
    for ch in text:
        if ch.isalnum():
            result += ch.lower()
    return result</code></pre>
<p>Python programmers often write the same function in one line, and you will see this form in other people's code:</p>
<pre><code>def clean(text):
    """Return only the letters and digits of text, in lowercase."""
    return "".join(ch.lower() for ch in text if ch.isalnum())

def is_palindrome(text):
    c = clean(text)
    return c == c[::-1]

is_palindrome("A man, a plan, a canal: Panama")   # True
is_palindrome("Python")                           # False</code></pre>
<p>Both versions do exactly the same thing; use whichever you find clearer. In the one-line version, the expression inside <code>join</code> is a <em>generator expression</em>. Read it like the loop: "<code>ch.lower()</code>, for each <code>ch</code> in <code>text</code>, if <code>ch.isalnum()</code>". It hands those characters to <code>join</code> one at a time, and <code>join</code> glues them together with <code>""</code> (nothing) between them. You'll meet its close relative, the list comprehension, in the next lesson.</p>
`,
    terms: [
      ["String", "A sequence of characters, type str."],
      ["Index", "A character's position, starting at 0; negative indexes count from the end."],
      ["Slice", "A substring s[a:b] from index a up to but not including b."],
      ["Immutable", "Unable to be changed after creation. Strings are immutable."],
      ["Method", "A function attached to a value and called with a dot, such as s.upper()."],
      ["Escape sequence", "A backslash code for a special character, such as \\n for a new line."],
      ["Unicode", "The standard that assigns a number to every character in nearly every writing system."]
    ],
    quiz: [
      { q: "What does <code>'python'[1:4]</code> evaluate to?", choices: ["'pyt'", "'yth'", "'ytho'", "'pyth'"], answer: 1, why: "Slices include the start index and exclude the end: indexes 1, 2, 3 are y, t, h." },
      { q: "What is <code>\"banana\"[-2]</code>?", choices: ["'b'", "'a'", "'n'", "An error"], answer: 2, why: "−1 is the last character ('a'), so −2 is the one before it ('n')." },
      { q: "After <code>name = \"ada\"</code> and <code>name.upper()</code>, what is <code>name</code>?", choices: ["'ADA'", "'ada'", "'Ada'", "None"], answer: 1, why: "Strings are immutable. <code>upper()</code> returns a new string; you must assign it: <code>name = name.upper()</code>." },
      { q: "What does <code>\" \".join(\"to be\".split()[::-1])</code> produce?", choices: ["'be to'", "'eb ot'", "'to be'", "An error"], answer: 0, why: "split gives ['to', 'be'], [::-1] reverses the list, and join puts the words back together with a space." },
      { q: "Why is <code>\"Zebra\" &lt; \"apple\"</code> True?", choices: ["Z is the last letter", "Uppercase letters have smaller character codes than lowercase ones", "Shorter words come first", "It is False"], answer: 1, why: "Strings compare by character codes, and 'Z' (90) is less than 'a' (97). Lowercase both to compare alphabetically." }
    ],
    practice: [
      { q: `<p>With <code>s = "computer science"</code>, predict each value: <code>s[0]</code>, <code>s[-1]</code>, <code>s[3:7]</code>, <code>s[:8]</code>, <code>s[9:]</code>, <code>s[::3]</code>, <code>len(s)</code>.</p>`, a: `<p><code>'c'</code>, <code>'e'</code>, <code>'pute'</code>, <code>'computer'</code>, <code>'science'</code>, <code>'cpesee'</code> (indexes 0, 3, 6, 9, 12 and 15 are c, p, e, s, e and e; index 8 is the space), and <code>16</code>.</p>` },
      { q: `<p>Write <code>initials(full_name)</code> that returns the capitalized initials of a name: <code>initials("grace brewster hopper")</code> returns <code>"GBH"</code>.</p>`, a: `<pre><code>def initials(full_name):
    result = ""
    for word in full_name.split():
        result += word[0].upper()
    return result</code></pre><p>Using <code>split()</code> with no argument also handles extra spaces between words.</p>` },
      { q: `<p>Write <code>reverse_words(sentence)</code> that reverses the order of the words but not the letters: <code>"the quick brown fox"</code> becomes <code>"fox brown quick the"</code>.</p>`, a: `<pre><code>def reverse_words(sentence):
    return " ".join(sentence.split()[::-1])</code></pre><p>Split into a list of words, reverse the list with a slice, and join with spaces.</p>` },
      { q: `<p>Write <code>is_valid_password(pw)</code>: a password is valid if it has at least 8 characters, at least one digit, and at least one uppercase letter.</p>`, hint: `<p>Use two boolean "flags" that start <code>False</code> and become <code>True</code> when you see a digit or an uppercase letter.</p>`, a: `<pre><code>def is_valid_password(pw):
    if len(pw) &lt; 8:
        return False
    has_digit = False
    has_upper = False
    for ch in pw:
        if ch.isdigit():
            has_digit = True
        if ch.isupper():
            has_upper = True
    return has_digit and has_upper

assert not is_valid_password("short1A")
assert not is_valid_password("nouppercase1")
assert is_valid_password("Secret123")</code></pre>` },
      { q: `<p>Write <code>count_words(text)</code> that returns the number of words, and <code>longest_word(text)</code> that returns the longest one (the first, if there's a tie). Ignore punctuation for now.</p>`, a: `<pre><code>def count_words(text):
    return len(text.split())

def longest_word(text):
    best = ""
    for word in text.split():
        if len(word) &gt; len(best):
            best = word
    return best</code></pre><p>Using <code>&gt;</code> rather than <code>&gt;=</code> keeps the first of several equally long words.</p>` },
      { q: `<p>Decode this message, which was encrypted with a Caesar shift of 7: <code>"jvumpkluaphs"</code>. Use the <code>caesar</code> function from the notes.</p>`, a: `<p><code>caesar("jvumpkluaphs", -7)</code> gives <code>"confidential"</code>. Decrypting means shifting the other way, by −7 (or equivalently by 19, since 26 − 7 = 19).</p>` },
      { q: `<p>Write <code>compress(s)</code> that replaces runs of the same character with the character and a count: <code>"aaabccdddd"</code> becomes <code>"a3b1c2d4"</code>.</p>`, hint: `<p>Walk through the string keeping the current character and how many times you've seen it in a row. When the character changes, write out the previous run.</p>`, a: `<pre><code>def compress(s):
    if s == "":
        return ""
    result = ""
    current = s[0]
    count = 1
    for ch in s[1:]:
        if ch == current:
            count += 1
        else:
            result += current + str(count)
            current = ch
            count = 1
    result += current + str(count)   # the last run
    return result

assert compress("aaabccdddd") == "a3b1c2d4"
assert compress("x") == "x1"</code></pre><p>The line after the loop is easy to forget: the final run is never followed by a different character, so it has to be written out separately. This technique is called <em>run-length encoding</em>.</p>` }
    ],
    sources: ["thinkpython", "pytutorial", "mit6100l"]
  },
  {
    id: "u5",
    title: "Lists, tuples, dictionaries and sets",
    minutes: 90,
    summary: "Python's built-in collections: lists you can change, tuples you can't, dictionaries for lookup by key, and sets for membership. Also aliasing, comprehensions, and choosing the right structure.",
    notes: `
<p>Programs rarely work with one value at a time. A gradebook has many scores, a dictionary app has many words, a social network has many friendships. Python has four built-in <strong>collections</strong> for grouping values, each suited to a different job.</p>

<h3>Lists</h3>
<p>A <strong>list</strong> is an ordered sequence of values, written in square brackets. Lists support the same indexing, slicing, <code>len</code>, <code>in</code> and <code>for</code> loops as strings, but unlike strings they are <strong>mutable</strong>: you can change them in place.</p>
<pre><code>scores = [88, 92, 79]
scores[0]          # 88
scores[-1]         # 79
scores[1] = 95     # change an element: [88, 95, 79]
len(scores)        # 3
92 in scores       # False (it was replaced)</code></pre>
<p>A list can hold values of any type, even other lists: <code>grid = [[1, 2], [3, 4]]</code>, where <code>grid[1][0]</code> is 3 (row 1, then column 0).</p>

<h3>Changing lists</h3>
<table>
  <thead><tr><th>Operation</th><th>Effect on <code>xs = [3, 1, 2]</code></th><th>Returns</th></tr></thead>
  <tbody>
    <tr><td><code>xs.append(5)</code></td><td><code>[3, 1, 2, 5]</code></td><td><code>None</code></td></tr>
    <tr><td><code>xs.insert(0, 9)</code></td><td><code>[9, 3, 1, 2]</code></td><td><code>None</code></td></tr>
    <tr><td><code>xs.pop()</code></td><td><code>[3, 1]</code></td><td><code>2</code> (the removed item)</td></tr>
    <tr><td><code>xs.pop(0)</code></td><td><code>[1, 2]</code></td><td><code>3</code></td></tr>
    <tr><td><code>xs.remove(1)</code></td><td><code>[3, 2]</code> (first matching value)</td><td><code>None</code></td></tr>
    <tr><td><code>xs.sort()</code></td><td><code>[1, 2, 3]</code></td><td><code>None</code></td></tr>
    <tr><td><code>sorted(xs)</code></td><td>unchanged</td><td>a new sorted list <code>[1, 2, 3]</code></td></tr>
    <tr><td><code>xs + [7]</code></td><td>unchanged</td><td>a new list <code>[3, 1, 2, 7]</code></td></tr>
    <tr><td><code>xs += [7]</code></td><td><code>[3, 1, 2, 7]</code> (changed in place)</td><td>(a statement; no value)</td></tr>
    <tr><td><code>xs.extend([7, 8])</code></td><td><code>[3, 1, 2, 7, 8]</code> (appends every item of another list, in place; same effect as <code>xs += [7, 8]</code>)</td><td><code>None</code></td></tr>
  </tbody>
</table>
<p>Notice the pattern: methods that change a list in place, like <code>append</code> and <code>sort</code>, return <code>None</code>. So <code>xs = xs.sort()</code> is a bug: it sorts the list, then replaces it with <code>None</code>. Use either <code>xs.sort()</code> on its own line, or <code>ys = sorted(xs)</code> to get a new list and keep the original.</p>

<h3>Aliasing: two names, one list</h3>
<p>Assignment never copies. After <code>b = a</code>, both names refer to the same list, so a change made through one is visible through the other.</p>
<pre><code>a = [1, 2, 3]
b = a
b.append(4)
print(a)        # [1, 2, 3, 4]
c = a.copy()    # or a[:] or list(a)
c.append(5)
print(a)        # [1, 2, 3, 4]  unchanged
print(c)        # [1, 2, 3, 4, 5]</code></pre>
<figure class="fig">
<svg viewBox="0 0 460 170" role="img" aria-label="Names a and b both point to one list [1, 2, 3, 4]; name c points to a separate list [1, 2, 3, 4, 5]">
  <defs><marker id="arr-alias" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
  <rect x="20" y="20" width="44" height="30" rx="6" class="soft"/><text x="37" y="40" class="code">a</text>
  <rect x="20" y="64" width="44" height="30" rx="6" class="soft"/><text x="37" y="84" class="code">b</text>
  <rect x="20" y="124" width="44" height="30" rx="6" class="soft"/><text x="37" y="144" class="code">c</text>
  <rect x="230" y="38" width="160" height="36" rx="4" class="box"/><text x="246" y="61" class="code">[1, 2, 3, 4]</text>
  <rect x="230" y="120" width="200" height="36" rx="4" class="box"/><text x="246" y="143" class="code">[1, 2, 3, 4, 5]</text>
  <line x1="66" y1="35" x2="226" y2="52" class="cv" marker-end="url(#arr-alias)"/>
  <line x1="66" y1="79" x2="226" y2="62" class="cv" marker-end="url(#arr-alias)"/>
  <line x1="66" y1="139" x2="226" y2="139" class="cv" marker-end="url(#arr-alias)"/>
</svg>
<figcaption><code>a</code> and <code>b</code> are aliases: two names for one list. <code>c</code> refers to a separate copy.</figcaption>
</figure>
<p>Aliasing matters most when you pass a list to a function. The parameter becomes another name for the caller's list, so a function that calls <code>append</code> on it changes the caller's list too. Sometimes that's what you want; if not, work on a copy. Strings and numbers don't have this issue, because they can't be changed in place.</p>
<h4>A trap: <code>+=</code> on a list changes it in place</h4>
<p>In <a href="#c-cs101-u1">Lesson 2</a> you learned that <code>count += 1</code> means <code>count = count + 1</code>. For numbers and strings that is exactly right: they can't be changed, so <code>+=</code> builds a new value and points the name at it. <strong>Lists are different.</strong> For a list, <code>b += [3]</code> changes the existing list in place (it works like <code>b.extend([3])</code>), while <code>b = b + [3]</code> builds a new list and points <code>b</code> at it. With an alias, you can see the difference:</p>
<pre><code>a = [1, 2]
b = a
b += [3]         # changes the one shared list
print(a)         # [1, 2, 3]

a = [1, 2]
b = a
b = b + [3]      # makes a new list; only b moves
print(a)         # [1, 2]
print(b)         # [1, 2, 3]</code></pre>
<p>Rule of thumb: on a list, <code>+=</code>, <code>append</code>, <code>sort</code> and item assignment all change the list itself; <code>+</code>, <code>sorted</code> and slicing make new lists.</p>
<h4>Copying a list of lists</h4>
<p><code>a.copy()</code> makes a new <em>outer</em> list, but it doesn't copy what's inside. For a list of lists, the copy holds the same inner lists, so changing a row through one is visible through the other. This is called a <strong>shallow copy</strong>.</p>
<pre><code>grid = [[1, 2], [3, 4]]
g2 = grid.copy()
g2[0].append(99)      # changes the inner list both share
print(grid)           # [[1, 2, 99], [3, 4]]

grid = [[1, 2], [3, 4]]
g3 = [row.copy() for row in grid]   # copy each row too
g3[0].append(99)
print(grid)           # [[1, 2], [3, 4]]  unchanged</code></pre>
<p>The line that makes <code>g3</code> is a one-line loop called a <em>list comprehension</em>, explained in the next section. It means the same as starting with <code>g3 = []</code> and running <code>for row in grid: g3.append(row.copy())</code>.</p>
<p>Copying every level is a <strong>deep copy</strong>. For lists nested more than one level, <code>import copy</code> and use <code>copy.deepcopy(grid)</code>.</p>

<h3>Building lists and comprehensions</h3>
<p>The accumulator pattern builds a new list from an old one:</p>
<pre><code>squares = []
for n in range(1, 6):
    squares.append(n * n)
# [1, 4, 9, 16, 25]</code></pre>
<p>This is so common that Python has a shorter form, the <strong>list comprehension</strong>. Read it as "a list of <em>expression</em> for each <em>item</em> in <em>sequence</em>, if <em>condition</em>":</p>
<pre><code>squares = [n * n for n in range(1, 6)]            # [1, 4, 9, 16, 25]
evens   = [n for n in range(10) if n % 2 == 0]    # [0, 2, 4, 6, 8]
lengths = [len(w) for w in ["to", "be", "or"]]    # [2, 2, 2]</code></pre>
<p>Use a comprehension when it fits on one readable line. If you need several steps per item, a regular loop is clearer.</p>

<h3>Tuples</h3>
<p>A <strong>tuple</strong> is like a list that can't be changed. Write it with parentheses: <code>point = (3, 4)</code>. Use tuples for small fixed groups of values that belong together, such as coordinates, a date, or a name and an age. Tuples support <strong>unpacking</strong>, assigning each part to its own name:</p>
<pre><code>point = (3, 4)
x, y = point            # x is 3, y is 4

def min_max(xs):
    return min(xs), max(xs)    # returns a tuple

low, high = min_max([7, 2, 9])  # low is 2, high is 9</code></pre>
<p>Returning a tuple and unpacking it is the usual way for a function to return more than one value.</p>

<h3>Dictionaries</h3>
<p>A <strong>dictionary</strong> (<code>dict</code>) stores <strong>key–value pairs</strong>, and you look values up by key instead of by position. Think of a real dictionary: the word is the key, the definition is the value.</p>
<pre><code>ages = {"Ada": 36, "Alan": 41}
ages["Ada"]               # 36
ages["Grace"] = 85        # add a new pair
ages["Ada"] = 37          # replace a value
"Alan" in ages            # True: in checks keys
ages["Linus"]             # KeyError: 'Linus'
ages.get("Linus", 0)      # 0: get returns a default instead of failing
del ages["Alan"]          # remove a pair</code></pre>
<p>Loop over a dictionary's pairs with <code>.items()</code>. Dictionaries remember the order in which keys were added.</p>
<pre><code>for name, age in ages.items():
    print(f"{name} is {age}")</code></pre>
<p>Looking up a key takes about the same time whether the dictionary has ten entries or ten million. (The efficiency lesson explains why that matters.) That makes dictionaries the go-to tool for <strong>counting</strong> and <strong>indexing</strong>:</p>
<pre><code>def word_counts(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts

word_counts("the cat and the hat")
# {'the': 2, 'cat': 1, 'and': 1, 'hat': 1}</code></pre>
<p>The line <code>counts.get(word, 0) + 1</code> says "the current count, or 0 if we haven't seen this word yet, plus one". Keys must be <strong>hashable</strong>, which in practice means immutable: strings, numbers and tuples work, but lists don't. Values can be anything, including lists: <code>{"Ada": [88, 95], "Alan": [79]}</code>.</p>
<h4>What "hashable" means</h4>
<p>A dictionary is fast because it doesn't search. Inside, it keeps a row of numbered slots. To store a key, Python computes a whole number from the key, called its <strong>hash</strong> (try <code>hash("Ada")</code>), and uses that number to choose a slot. A tiny example with 8 slots and whole-number keys, whose hash is the number itself, choosing the slot as hash % 8:</p>
<table>
  <thead><tr><th>Key</th><th><code>hash(key)</code></th><th>Slot: hash % 8</th></tr></thead>
  <tbody>
    <tr><td><code>12</code></td><td>12</td><td>4</td></tr>
    <tr><td><code>7</code></td><td>7</td><td>7</td></tr>
    <tr><td><code>33</code></td><td>33</td><td>1</td></tr>
  </tbody>
</table>
<p>To look up 33 later, Python computes 33 % 8 = 1 again and goes straight to slot 1, without checking the other keys. (Real dictionaries are a bit more elaborate, and string hashes are big numbers that change each time Python starts, but the idea is the same.) Now you can see why keys must not change: if a key changed after it was stored, its hash would change, and Python would look in the wrong slot. So Python refuses mutable keys: <code>{[1, 2]: "x"}</code> raises <code>TypeError: unhashable type: 'list'</code>. A value is <strong>hashable</strong> if it has a hash that never changes. <a href="#c-cs101-algo">The efficiency lesson</a> returns to this, including what happens when two keys land in the same slot.</p>

<h3>Sets</h3>
<p>A <strong>set</strong> is an unordered collection with no duplicates, written with braces: <code>{1, 2, 3}</code>. (An empty set is <code>set()</code>, because <code>{}</code> is an empty dictionary.) Sets are fast at answering "is this in here?" and support the operations from Discrete Mathematics:</p>
<pre><code>a = {"Ada", "Alan", "Grace"}
b = {"Grace", "Linus"}
a | b      # union:        {'Ada', 'Alan', 'Grace', 'Linus'}
a &amp; b      # intersection: {'Grace'}
a - b      # difference:   {'Ada', 'Alan'}
set([3, 1, 3, 2, 1])   # remove duplicates: {1, 2, 3}

seen = set()
seen.add("Ada")        # add one item: {'Ada'}
seen.add("Ada")        # already there, so no change
"Ada" in seen          # True</code></pre>
<p><code>.add(x)</code> puts one item into a set, much as <code>.append(x)</code> does for a list. A common pattern starts with an empty set and adds items as a loop meets them, so that <code>x in seen</code> answers "have I met this before?" quickly.</p>

<h3>Sorting with a key</h3>
<p><code>sorted</code> takes an optional <code>key</code>: a function applied to each item to decide the order. This is where lambdas earn their keep.</p>
<pre><code>words = ["banana", "fig", "cherry"]
sorted(words)                    # ['banana', 'cherry', 'fig'] (alphabetical)
sorted(words, key=len)           # ['fig', 'banana', 'cherry'] (by length)

students = [("Ada", 91), ("Alan", 85), ("Grace", 97)]
sorted(students, key=lambda s: s[1], reverse=True)
# [('Grace', 97), ('Ada', 91), ('Alan', 85)]</code></pre>
<h4>Sorting by two things at once</h4>
<p>Often you want to sort by one thing and break ties with another: most common word first, and words with the same count in alphabetical order. Two facts make this easy.</p>
<p>First, <strong>tuples compare item by item</strong>, like words in a dictionary: Python compares the first items, and only if they are equal does it look at the second. So <code>(2, "z") &lt; (3, "a")</code> is <code>True</code> (2 &lt; 3 settles it), and <code>(3, "b") &lt; (3, "c")</code> is <code>True</code> (a tie on 3, so "b" &lt; "c" settles it). A key function can therefore return a tuple: the main thing to sort by, then the tie-breaker.</p>
<p>Second, <code>reverse=True</code> reverses <em>everything</em>, tie-breakers included, so it can't give "count high to low, but names A to Z". Instead, sort by the <em>negative</em> count: the largest count has the smallest negative, so it comes first, while the names still sort A to Z.</p>
<pre><code>pairs = [("fig", 2), ("banana", 3), ("cherry", 2), ("apple", 3)]

sorted(pairs, key=lambda p: p[1], reverse=True)
# [('banana', 3), ('apple', 3), ('fig', 2), ('cherry', 2)]   ties not alphabetical

sorted(pairs, key=lambda p: (-p[1], p[0]))
# [('apple', 3), ('banana', 3), ('cherry', 2), ('fig', 2)]   count high to low, then A to Z</code></pre>

<h3>Choosing a structure</h3>
<table>
  <thead><tr><th>You need…</th><th>Use</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>An ordered collection that grows and changes</td><td><code>list</code></td><td>Scores in the order they arrived</td></tr>
    <tr><td>A small fixed record</td><td><code>tuple</code></td><td>A point <code>(x, y)</code>; a date <code>(2026, 9, 1)</code></td></tr>
    <tr><td>To find values by name or ID</td><td><code>dict</code></td><td>Student ID → record; word → count</td></tr>
    <tr><td>Fast "is it in here?" and no duplicates</td><td><code>set</code></td><td>Usernames already taken</td></tr>
  </tbody>
</table>
`,
    terms: [
      ["List", "An ordered, mutable sequence: [1, 2, 3]."],
      ["Tuple", "An ordered, immutable sequence: (1, 2)."],
      ["Dictionary", "A mapping from keys to values: {\"a\": 1}."],
      ["Set", "An unordered collection with no duplicates: {1, 2}."],
      ["Mutable", "Able to be changed in place after creation."],
      ["Aliasing", "Two names referring to the same object."],
      ["Unpacking", "Assigning the parts of a tuple or list to separate names: x, y = point."],
      ["Hashable", "Usable as a dictionary key or set member: the value has a hash that never changes. Immutable built-ins are hashable; lists are not."],
      ["Hash", "A whole number computed from a value, used to choose where a dictionary or set stores it."],
      ["Shallow copy", "A new outer list holding the same inner objects, as made by xs.copy(); a deep copy also copies everything inside."],
      ["Comprehension", "A compact expression that builds a list, dict or set from an iterable."]
    ],
    quiz: [
      { q: "After <code>a = [1, 2]; b = a; b += [3]</code>, what is <code>a</code>?", choices: ["[1, 2]", "[1, 2, 3]", "[3]", "An error"], answer: 1, why: "<code>b</code> is an alias for the same list, and <code>+=</code> on a list changes it in place (like <code>extend</code>). This differs from <code>b = b + [3]</code>, which would build a new list and leave <code>a</code> as <code>[1, 2]</code>; see \"A trap: += on a list\" above." },
      { q: "Which of these can be a dictionary key?", choices: ["[1, 2]", "{1, 2}", "(1, 2)", "{'a': 1}"], answer: 2, why: "Only the tuple is immutable and hashable." },
      { q: "What is <code>xs</code> after <code>xs = [3, 1, 2]</code> and <code>xs = xs.sort()</code>?", choices: ["[1, 2, 3]", "[3, 1, 2]", "None", "An error"], answer: 2, why: "<code>sort()</code> sorts in place and returns <code>None</code>, which is then assigned to <code>xs</code>." },
      { q: "What does <code>[n * 2 for n in range(4) if n != 2]</code> produce?", choices: ["[0, 2, 4, 6]", "[0, 2, 6]", "[2, 6]", "[0, 1, 3]"], answer: 1, why: "n takes 0, 1, 3 (2 is skipped), doubled to 0, 2, 6." },
      { q: "<code>ages = {\"Ada\": 36}</code>. What does <code>ages.get(\"Alan\", 0)</code> return?", choices: ["KeyError", "None", "0", "36"], answer: 2, why: "<code>get</code> returns the default when the key is missing, instead of raising KeyError." }
    ],
    practice: [
      { q: `<p>Write <code>stats(xs)</code> that returns a tuple <code>(smallest, largest, mean)</code> for a non-empty list of numbers, using a single loop and no built-in <code>min</code>, <code>max</code> or <code>sum</code>.</p>`, a: `<pre><code>def stats(xs):
    smallest = largest = xs[0]
    total = 0
    for x in xs:
        if x &lt; smallest:
            smallest = x
        if x &gt; largest:
            largest = x
        total += x
    return smallest, largest, total / len(xs)

lo, hi, avg = stats([4, 8, 1, 7])   # (1, 8, 5.0)</code></pre>` },
      { q: `<p>Write <code>dedupe(xs)</code> that removes duplicates but keeps the first occurrence of each item <strong>in its original order</strong>: <code>[3, 1, 3, 2, 1]</code> becomes <code>[3, 1, 2]</code>. Why doesn't <code>list(set(xs))</code> work?</p>`, a: `<pre><code>def dedupe(xs):
    seen = set()
    result = []
    for x in xs:
        if x not in seen:
            seen.add(x)
            result.append(x)
    return result</code></pre><p>Sets are unordered, so <code>list(set(xs))</code> removes duplicates but may scramble the order. The set here is used only for fast "have I seen this?" checks.</p>` },
      { q: `<p>Given <code>grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]</code>, write code to compute (a) the sum of each row, (b) the sum of the main diagonal (1 + 5 + 9).</p>`, a: `<pre><code>row_sums = [sum(row) for row in grid]          # [6, 15, 24]
diagonal = sum(grid[i][i] for i in range(len(grid)))   # 15</code></pre><p>The diagonal entries are where the row index equals the column index.</p>` },
      { q: `<p>Using <code>word_counts</code> from the notes, print the three most common words in a text with their counts.</p>`, hint: `<p>Sort the <code>(word, count)</code> pairs from <code>.items()</code> by count, largest first.</p>`, a: `<pre><code>counts = word_counts(text)
top = sorted(counts.items(), key=lambda pair: pair[1], reverse=True)[:3]
for word, n in top:
    print(word, n)</code></pre>` },
      { q: `<p>Write <code>invert(d)</code> that swaps keys and values: <code>{"a": 1, "b": 2}</code> becomes <code>{1: "a", 2: "b"}</code>. What goes wrong if two keys share a value, and how could you handle it?</p>`, a: `<pre><code>def invert(d):
    return {value: key for key, value in d.items()}</code></pre><p>If two keys share a value, the later one overwrites the earlier one, so information is lost. To keep everything, map each value to a list of keys:</p><pre><code>def invert_all(d):
    result = {}
    for key, value in d.items():
        result.setdefault(value, []).append(key)
    return result</code></pre>` },
      { q: `<p>Alice follows <code>{"ada", "alan", "grace", "linus"}</code> and Bob follows <code>{"grace", "linus", "margaret"}</code>. Use set operations to find: people both follow, people only Alice follows, and everyone either follows.</p>`, a: `<pre><code>alice = {"ada", "alan", "grace", "linus"}
bob = {"grace", "linus", "margaret"}
alice &amp; bob    # {'grace', 'linus'}
alice - bob    # {'ada', 'alan'}
alice | bob    # all five names</code></pre>` },
      { q: `<p>This function is meant to return a new list with an item added, leaving the original alone. Explain the bug and fix it.</p><pre><code>def with_item(xs, item):
    xs.append(item)
    return xs

original = [1, 2]
new = with_item(original, 3)
print(original)   # expected [1, 2]</code></pre>`, a: `<p>The parameter <code>xs</code> is an alias for <code>original</code>, so <code>append</code> changes the caller's list, and <code>original</code> prints <code>[1, 2, 3]</code>. Fix: build a new list, with <code>return xs + [item]</code>, or copy first: <code>new_xs = xs.copy()</code>, append to that, and return it.</p>` }
    ],
    sources: ["thinkpython", "pytutorial", "mit6100l"]
  },
  {
    id: "u4",
    title: "Recursion",
    minutes: 90,
    summary: "Solve problems by reducing them to smaller instances of the same problem: base cases, the call stack, recursion on lists and strings, divide and conquer, and memoization.",
    notes: `
<p>A function is <strong>recursive</strong> when it calls itself. That sounds circular, but it's one of the most powerful ideas in computer science: to solve a big problem, solve a smaller version of the same problem, then use that answer. Every correct recursive function has two parts:</p>
<ul>
  <li>A <strong>base case</strong>: an input small enough to answer directly, without recursion.</li>
  <li>A <strong>recursive case</strong>: reduce the problem to a smaller one, call the function on it, and build the answer from the result.</li>
</ul>

<h3>A first example: factorial</h3>
<p>The factorial of <em>n</em>, written <em>n</em>!, is 1 × 2 × … × <em>n</em>, and 0! is defined as 1. Notice that 4! = 4 × 3!. In general <em>n</em>! = <em>n</em> × (<em>n</em> − 1)!, which is a recursive definition.</p>
<div class="multi">
<pre data-lang="python"><code>def factorial(n):
    if n == 0:            # base case
        return 1
    return n * factorial(n - 1)   # recursive case</code></pre>
<pre data-lang="java"><code>static long factorial(int n) {
    if (n == 0) {                  // base case
        return 1;
    }
    return n * factorial(n - 1);   // recursive case
}</code></pre>
<pre data-lang="cpp"><code>long long factorial(int n) {
    if (n == 0) {                  // base case
        return 1;
    }
    return n * factorial(n - 1);   // recursive case
}</code></pre>
</div>

<h3>The call stack</h3>
<p>Recall that each call gets its own frame. Calling <code>factorial(3)</code> creates a stack of frames, each waiting for the one above it:</p>
<figure class="fig">
<svg viewBox="0 0 470 210" role="img" aria-label="Stack of four frames: factorial(3) at the bottom waits on factorial(2), which waits on factorial(1), which waits on factorial(0). Return values 1, 1, 2, 6 flow back down.">
  <rect x="20" y="20" width="200" height="36" rx="4" class="soft"/><text x="34" y="43" class="code">factorial(0)</text>
  <rect x="20" y="64" width="200" height="36" rx="4" class="box"/><text x="34" y="87" class="code">factorial(1): 1 * ?</text>
  <rect x="20" y="108" width="200" height="36" rx="4" class="box"/><text x="34" y="131" class="code">factorial(2): 2 * ?</text>
  <rect x="20" y="152" width="200" height="36" rx="4" class="box"/><text x="34" y="175" class="code">factorial(3): 3 * ?</text>
  <text x="240" y="43" class="code">returns 1 (base case)</text>
  <text x="240" y="87" class="code">returns 1 * 1 = 1</text>
  <text x="240" y="131" class="code">returns 2 * 1 = 2</text>
  <text x="240" y="175" class="code">returns 3 * 2 = 6</text>
  <text x="20" y="205" class="m">Calls stack upward; return values flow back down.</text>
</svg>
<figcaption>Each call waits for the smaller one. When the base case returns, the waiting calls finish one by one, from the top of the stack down.</figcaption>
</figure>
<p>This is the <strong>call stack</strong>. Python limits its depth (by default to about 1,000 frames). A recursive function with no base case, or one that never gets closer to it, keeps adding frames until Python stops it with <code>RecursionError: maximum recursion depth exceeded</code>.</p>

<h3>The recursive leap of faith</h3>
<p>Tracing every frame is useful for understanding, but it's not how you <em>write</em> recursive functions. Instead, assume the function already works for smaller inputs, and ask only: <em>if I had the answer for the smaller problem, how would I build the answer for this one?</em> For factorial: if I trust that <code>factorial(n - 1)</code> is correct, then <code>n * factorial(n - 1)</code> is clearly correct too. This is the same reasoning as proof by induction in Discrete Mathematics, where the "trust" is called the inductive hypothesis.</p>

<h3>Recursion on lists and strings</h3>
<p>Lists and strings have a natural recursive structure: a non-empty sequence is its first item plus the rest, and the rest is a shorter sequence.</p>
<pre><code>def total(xs):
    """Return the sum of a list of numbers."""
    if not xs:                        # base case: empty list
        return 0
    return xs[0] + total(xs[1:])      # first item + sum of the rest

def is_palindrome(s):
    if len(s) &lt;= 1:                   # "" and one-character strings are palindromes
        return True
    return s[0] == s[-1] and is_palindrome(s[1:-1])</code></pre>
<p>These are written for clarity, not speed, and they have two costs worth knowing:</p>
<ul>
  <li><strong>Copying.</strong> The slice <code>xs[1:]</code> builds a new list each call, so a list of <em>n</em> items copies (<em>n</em> − 1) + (<em>n</em> − 2) + … + 1 + 0 = <em>n</em>(<em>n</em> − 1)/2 items in total: 404,550 copies for 900 items. You can avoid the copying by passing a position instead of a shorter list: <code>def total_from(xs, i=0)</code> returns 0 when <code>i == len(xs)</code> and otherwise <code>xs[i] + total_from(xs, i + 1)</code>.</li>
  <li><strong>Depth.</strong> Either way, each item adds one frame to the call stack, so the stack ends up about as deep as the list is long. With Python's limit of about 1,000 frames, <code>total(list(range(900)))</code> works, but <code>total(list(range(2000)))</code> stops with <code>RecursionError</code>. For long lists, use a loop or the built-in <code>sum</code>, which gives 1999000 instantly.</li>
</ul>
<p>Recursion shines on <strong>nested</strong> data, where loops become awkward. A list can contain lists, which contain more lists:</p>
<pre><code>def flatten(items):
    """Return a flat list of all non-list items, in order."""
    out = []
    for x in items:
        if isinstance(x, list):
            out.extend(flatten(x))    # a list: flatten it recursively
        else:
            out.append(x)
    return out

flatten([1, [2, [3, 4]], 5])   # [1, 2, 3, 4, 5]</code></pre>
<p><code>isinstance(x, list)</code> checks whether <code>x</code> is a list, and <code>extend</code> appends every item of another list. The shape of the code matches the shape of the data: however deep the nesting, the same small function handles it. File systems (folders inside folders), web pages (elements inside elements) and the programs that compilers process all have this nested structure.</p>

<h3>Recursion versus loops</h3>
<p>Anything written recursively can be written with a loop, and vice versa. Factorial as a loop:</p>
<pre><code>def factorial_loop(n):
    result = 1
    for k in range(2, n + 1):
        result *= k
    return result</code></pre>
<p>For simple counting like this, the loop is just as clear and avoids the depth limit. Recursion wins when the problem itself is recursive: nested data, and problems that split into smaller copies of themselves.</p>

<h3>Divide and conquer</h3>
<p>Some problems split into <em>halves</em> rather than into "one smaller". Computing <em>x</em><sup>n</sup> by multiplying <em>n</em> times takes <em>n</em> steps, but <em>x</em><sup>n</sup> = (<em>x</em><sup>n/2</sup>)² when <em>n</em> is even:</p>
<pre><code>def power(x, n):
    """Return x ** n for a whole number n &gt;= 0."""
    if n == 0:
        return 1
    half = power(x, n // 2)
    if n % 2 == 0:
        return half * half
    return half * half * x</code></pre>
<p>Each call halves <em>n</em>, so <code>power(2, 1000)</code> needs only about 10 levels of calls instead of 1,000 multiplications. The same idea of splitting in half powers binary search and merge sort in the efficiency lesson.</p>

<h3>A classic puzzle: the Towers of Hanoi</h3>
<p>Three pegs, and <em>n</em> disks stacked from largest to smallest on the first. Move them all to the third peg, one disk at a time, never putting a larger disk on a smaller one. The recursive insight: to move <em>n</em> disks from A to C, move the top <em>n</em> − 1 to B (out of the way), move the largest disk to C, then move the <em>n</em> − 1 disks from B onto it.</p>
<pre><code>def hanoi(n, source, spare, target):
    if n == 0:
        return
    hanoi(n - 1, source, target, spare)
    print(f"Move disk {n} from {source} to {target}")
    hanoi(n - 1, spare, source, target)

hanoi(3, "A", "B", "C")    # prints 7 moves</code></pre>
<p>Solving it with loops is surprisingly hard. With recursion it's six lines. Moving <em>n</em> disks takes 2<sup>n</sup> − 1 moves, so 64 disks would take more than 18 quintillion moves.</p>

<h3>When recursion repeats work: memoization</h3>
<p>The Fibonacci numbers are 0, 1, 1, 2, 3, 5, 8, …, where each is the sum of the two before. The direct recursive translation is correct but slow:</p>
<pre><code>def fib(n):
    if n &lt; 2:
        return n
    return fib(n - 1) + fib(n - 2)</code></pre>
<p><code>fib(5)</code> calls <code>fib(4)</code> and <code>fib(3)</code>, but <code>fib(4)</code> also calls <code>fib(3)</code>, and so on: the same values are computed over and over. <code>fib(30)</code> makes about 2.7 million calls. The number of calls grows roughly like 1.6<sup>n</sup> (more precisely 1.618…<sup>n</sup>), so each extra step makes about 1.6 times as many calls, about 60% more work. Growth by a fixed factor at every step is called <strong>exponential</strong>. You'll sometimes see naive Fibonacci described as O(2<sup>n</sup>) instead: each call makes at most two more, so 2<sup>n</sup> is an easy <em>upper bound</em> (the count never exceeds it), while 1.6<sup>n</sup> is the closer estimate. Both say the same important thing: exponential, and hopeless for large <em>n</em>. <a href="#c-cs101-algo">The efficiency lesson</a> explains this O notation.</p>
<p>The fix is <strong>memoization</strong>: store each answer the first time it's computed and reuse it after that.</p>
<p>The first line below uses a new form of <code>import</code>. <code>from functools import cache</code> brings in just one name, <code>cache</code>, from the standard module <code>functools</code>, so you can write <code>cache</code> instead of <code>functools.cache</code>. (<a href="#c-cs101-files">Files and modules</a> covers both forms.)</p>
<pre><code>from functools import cache

@cache
def fib(n):
    if n &lt; 2:
        return n
    return fib(n - 1) + fib(n - 2)

fib(100)   # 354224848179261915075, instantly</code></pre>
<p>The line <code>@cache</code> is a <strong>decorator</strong>. Writing <code>@cache</code> above <code>def fib</code> is shorthand for <code>fib = cache(fib)</code> after the definition: <code>cache</code> is a function that takes your function and returns a new one that sits around the old one, like a wrapper. When you call <code>fib(k)</code>, the new function first looks in a dictionary of answers it has saved; if <code>k</code> is there, it returns the saved answer, and if not, it calls your original <code>fib</code>, saves the result and returns it. Because the recursive calls inside <code>fib</code> also use the name <code>fib</code>, they go through the saved answers too. You'll write your own decorators in <a href="#c-cs102-c5">CS 102, Lesson 5</a>; for now, using <code>@cache</code> is enough. Now each <code>fib(k)</code> is computed only once, so <code>fib(n)</code> takes about <em>n</em> steps. Without memoization, <code>fib(100)</code> would take longer than the age of the universe.</p>
`,
    terms: [
      ["Recursion", "Defining a function in terms of itself on smaller inputs."],
      ["Base case", "An input the function answers without recursing."],
      ["Recursive case", "The part that reduces the problem and calls the function on the smaller input."],
      ["Call stack", "The chain of active function calls, each waiting on the one above it."],
      ["Divide and conquer", "Solving a problem by splitting it into smaller pieces, often halves, and combining the results."],
      ["Memoization", "Caching results of calls so each input is computed only once."],
      ["Decorator", "A line such as @cache placed above a function definition that wraps the function with extra behavior."]
    ],
    quiz: [
      { q: "What happens if a recursive function has no base case?", choices: ["It returns None", "It recurses until Python raises RecursionError", "Python adds one automatically", "It returns 0"], answer: 1, why: "Each call adds a frame. Python stops at its recursion limit and raises <code>RecursionError</code>." },
      { q: "For <code>sum_list(xs)</code>, which recursive case is correct?", choices: ["<code>return xs[0] + sum_list(xs)</code>", "<code>return sum_list(xs[1:])</code>", "<code>return xs[0] + sum_list(xs[1:])</code>", "<code>return xs[0] * sum_list(xs[1:])</code>"], answer: 2, why: "Take the first item and add the sum of the rest. The input shrinks every call." },
      { q: "Why is naive recursive Fibonacci slow?", choices: ["Recursion is always slow in Python", "It recomputes the same subproblems many times", "Integers get very large", "It has no base case"], answer: 1, why: "fib(n−2) is computed inside both fib(n) and fib(n−1), and so on down. Memoization removes the repeats." },
      { q: "How many moves does the Towers of Hanoi take for 4 disks?", choices: ["4", "8", "15", "16"], answer: 2, why: "2⁴ − 1 = 15. Each extra disk doubles the moves and adds one." },
      { q: "About how many levels of recursive calls does <code>power(2, 1024)</code> make?", choices: ["About 10", "About 100", "1,024", "About 1 million"], answer: 0, why: "Each call halves n: 1024, 512, …, 1, 0. That's about log₂ 1024 = 10 levels, plus the base case." }
    ],
    practice: [
      { q: `<p>Write a recursive <code>count_down(n)</code> that prints <em>n</em>, <em>n</em> − 1, …, 1 and then <code>Go!</code>. What is the base case?</p>`, a: `<pre><code>def count_down(n):
    if n == 0:
        print("Go!")
        return
    print(n)
    count_down(n - 1)</code></pre><p>The base case is <code>n == 0</code>. Each call prints one number and hands the rest of the job to a smaller call.</p>` },
      { q: `<p>Write a recursive <code>sum_digits(n)</code>: <code>sum_digits(4096)</code> returns 19. Use <code>%</code> and <code>//</code>.</p>`, a: `<pre><code>def sum_digits(n):
    if n &lt; 10:
        return n
    return n % 10 + sum_digits(n // 10)</code></pre><p>The last digit plus the digit sum of everything before it. A one-digit number is its own digit sum.</p>` },
      { q: `<p>Write a recursive <code>reverse(s)</code> that reverses a string without slicing with a negative step.</p>`, a: `<pre><code>def reverse(s):
    if s == "":
        return ""
    return reverse(s[1:]) + s[0]</code></pre><p>Reverse everything after the first character, then put the first character at the end. Trace <code>reverse("abc")</code>: <code>reverse("bc") + "a"</code> = <code>(reverse("c") + "b") + "a"</code> = <code>"cba"</code>.</p>` },
      { q: `<p>Write <code>count_all(items, target)</code> that counts how many times <code>target</code> appears anywhere in a nested list. <code>count_all([1, [2, 1, [1]], 3], 1)</code> returns 3.</p>`, a: `<pre><code>def count_all(items, target):
    count = 0
    for x in items:
        if isinstance(x, list):
            count += count_all(x, target)
        elif x == target:
            count += 1
    return count</code></pre>` },
      { q: `<p>Draw the call stack for <code>total([4, 5, 6])</code> using the <code>total</code> function from the notes. Show what each call returns.</p>`, a: `<table><thead><tr><th>Call</th><th>Returns</th></tr></thead><tbody><tr><td><code>total([])</code></td><td>0 (base case)</td></tr><tr><td><code>total([6])</code></td><td>6 + 0 = 6</td></tr><tr><td><code>total([5, 6])</code></td><td>5 + 6 = 11</td></tr><tr><td><code>total([4, 5, 6])</code></td><td>4 + 11 = 15</td></tr></tbody></table><p>The calls go down to the empty list, then the sums are built on the way back.</p>` },
      { q: `<p>This function is meant to compute 1 + 2 + … + <em>n</em>, but <code>add_up(5)</code> crashes with <code>RecursionError</code>. Find and fix the bug.</p><pre><code>def add_up(n):
    if n == 0:
        return 0
    return n + add_up(n)</code></pre>`, a: `<p>The recursive call uses <code>n</code> again instead of a smaller value, so it never gets closer to the base case. Change it to <code>return n + add_up(n - 1)</code>. Every recursive call must make progress toward a base case.</p>` },
      { q: `<p>Write <code>binary(n)</code> that returns the binary representation of a non-negative whole number as a string: <code>binary(13)</code> returns <code>"1101"</code>. (<a href="#c-cs101-u1">Lesson 2, Binary numbers, bits and bytes</a> shows how to convert by hand; turn that method into a recursive function.)</p>`, hint: `<p>The last binary digit is <code>n % 2</code>. The digits before it are the binary representation of <code>n // 2</code>.</p>`, a: `<pre><code>def binary(n):
    if n &lt; 2:
        return str(n)
    return binary(n // 2) + str(n % 2)

assert binary(13) == "1101"
assert binary(0) == "0"</code></pre><p>13 // 2 = 6 with remainder 1; 6 // 2 = 3 with remainder 0; 3 // 2 = 1 with remainder 1; reading the remainders back up gives 1101.</p>` }
    ],
    sources: ["mit6100l", "thinkpython", "mcs"]
  }
]);

CSA.addUnits("cs101", [
  {
    id: "u6",
    title: "Testing, debugging and exceptions",
    minutes: 90,
    summary: "Find bugs on purpose: write automated tests, read tracebacks, recognize common errors, debug methodically, and raise and handle exceptions deliberately.",
    notes: `
<p>Every programmer writes bugs. What separates experienced programmers is not that they make fewer mistakes, but that they <strong>find</strong> them quickly and systematically. This lesson covers the three tools for that: tests that catch mistakes automatically, a method for tracking down the ones that slip through, and exceptions for handling things that go wrong while a program runs.</p>

<h3>What to test</h3>
<p>A test runs code on an input whose correct answer you know, and checks the result. Good tests cover three kinds of input:</p>
<ul>
  <li><strong>Typical cases</strong> that represent normal use.</li>
  <li><strong>Edge cases</strong> at the boundaries: empty strings and lists, zero, negative numbers, a single element, the largest allowed value, the exact point where behavior changes (like a score of exactly 90 in a grading function).</li>
  <li><strong>Error cases</strong>: inputs the function should reject, where you check that it fails in the right way.</li>
</ul>
<p>Most bugs live at the edges. If a function works for <code>[3, 1, 2]</code>, it probably works for <code>[5, 9, 7]</code>; it's <code>[]</code> and <code>[4]</code> that break it.</p>

<h3>Automated tests with pytest</h3>
<p><code>assert</code> statements work for quick checks, but real projects use a testing tool. <strong>pytest</strong> is the most popular for Python. It doesn't come with Python, so you install it once. Python includes an installer for extra packages called <strong>pip</strong>; you run it from the terminal (not from inside the <code>&gt;&gt;&gt;</code> console):</p>
<pre data-label="Terminal"><code>python3 -m pip install pytest      # Windows: py -m pip install pytest
python3 -m pytest --version         # check: prints something like "pytest 9.2.0"</code></pre>
<p><code>-m pip</code> means "run the pip module that belongs to this Python", which guarantees pytest is installed for the same Python you run your code with. If the install stops with an error that says <em>externally-managed-environment</em> (this happens with some Linux and Homebrew Pythons), make a private <em>virtual environment</em> in your <code>cs101</code> folder and install there:</p>
<pre data-label="Terminal"><code>python3 -m venv .venv
source .venv/bin/activate           # Windows: .venv\\Scripts\\activate
python -m pip install pytest</code></pre>
<p>(On Windows PowerShell, if activation says "running scripts is disabled", see the note in <a href="#c-cs101-u7">Lesson 11</a>, "Packages, pip and virtual environments".)</p>
<p>After activating, use <code>python</code> for the rest of that terminal session, and run <code>source .venv/bin/activate</code> again in each new terminal. The toolkit lesson, <a href="#c-cs101-u7">Lesson 11</a>, explains pip and virtual environments properly; these commands are all you need until then.</p>
<p>Suppose <code>stats.py</code> contains a <code>mean</code> function. Put tests in a file whose name starts with <code>test_</code>, in the same folder. Each test is a function whose name also starts with <code>test_</code>:</p>
<pre><code># test_stats.py
import pytest
from stats import mean     # use the mean function from stats.py

def test_typical():
    assert mean([1, 2, 3]) == 2

def test_single_item():
    assert mean([5]) == 5

def test_negative_numbers():
    assert mean([-2, 2]) == 0

def test_empty_list_raises():
    with pytest.raises(ValueError):
        mean([])</code></pre>
<p>The line <code>from stats import mean</code> loads a function from another file; the Files and modules lesson explains imports properly. The last test checks that something <em>fails</em> correctly: <code>with pytest.raises(ValueError):</code> means "the indented lines below must raise <code>ValueError</code>". If <code>mean([])</code> raises it, the test passes; if it raises nothing, the test fails. (<code>with</code> sets something up around a block of code; you'll see it again for opening files in the Files lesson.) Run all the tests from the terminal:</p>
<pre data-label="Terminal"><code>$ python3 -m pytest
==================== 4 passed in 0.01s ====================</code></pre>
<p>If a test fails, pytest shows which one, the line that failed, and the values involved. A failing test is good news: it found a bug before a user did.</p>
<p>Two habits make tests far more useful. First, <strong>run them after every change</strong>; a test suite catches the bug you introduced while fixing a different one. Second, when you find a bug, <strong>write a test that reproduces it before you fix it</strong>. The test proves the bug exists, proves your fix works, and guarantees it never quietly comes back.</p>

<h3>Reading a traceback</h3>
<p>When an error isn't handled, Python prints a <strong>traceback</strong>: the chain of calls that led to the error.</p>
<pre data-label="Terminal"><code>Traceback (most recent call last):
  File "report.py", line 12, in &lt;module&gt;
    print(summary(scores))
  File "report.py", line 8, in summary
    avg = mean(values)
  File "stats.py", line 4, in mean
    return sum(xs) / len(xs)
ZeroDivisionError: division by zero</code></pre>
<p>Read it from the <strong>bottom up</strong>:</p>
<ol>
  <li>The last line says <em>what</em> went wrong: dividing by zero.</li>
  <li>The line above says <em>where</em>: line 4 of <code>stats.py</code>, inside <code>mean</code>.</li>
  <li>Going up shows <em>how we got there</em>: <code>summary</code> called <code>mean</code>, and the main program called <code>summary</code>. In a traceback, <code>in &lt;module&gt;</code> means "in the main program": code at the top level of the file, not inside any function.</li>
</ol>
<p>The crash is in <code>mean</code>, but the real mistake may be higher up: <code>summary</code> passed an empty list. The traceback tells you where to start looking, not necessarily where the fix goes.</p>

<h3>Common errors and what they usually mean</h3>
<table>
  <thead><tr><th>Error</th><th>Usually means</th><th>Example cause</th></tr></thead>
  <tbody>
    <tr><td><code>SyntaxError</code></td><td>Python can't parse the code</td><td>Missing colon, quote or parenthesis</td></tr>
    <tr><td><code>IndentationError</code></td><td>Blocks aren't lined up</td><td>Mixed tabs and spaces</td></tr>
    <tr><td><code>NameError</code></td><td>A name isn't defined</td><td>A typo, or using a variable before assigning it</td></tr>
    <tr><td><code>TypeError</code></td><td>An operation got the wrong type</td><td><code>"Age: " + 36</code>; calling a function with too few arguments</td></tr>
    <tr><td><code>ValueError</code></td><td>Right type, unacceptable value</td><td><code>int("thirty")</code></td></tr>
    <tr><td><code>IndexError</code></td><td>A list or string index is out of range</td><td><code>xs[len(xs)]</code></td></tr>
    <tr><td><code>KeyError</code></td><td>A dictionary key isn't there</td><td><code>ages["Linus"]</code></td></tr>
    <tr><td><code>AttributeError</code></td><td>A value doesn't have that method</td><td><code>[1, 2].upper()</code>; often a <code>None</code> where you expected a value</td></tr>
    <tr><td><code>ZeroDivisionError</code></td><td>Division by zero</td><td>Averaging an empty list</td></tr>
    <tr><td><code>FileNotFoundError</code></td><td>No such file at that path</td><td>Running from a different folder</td></tr>
  </tbody>
</table>

<h3>A method for debugging</h3>
<p>Debugging is the scientific method applied to code. Guessing and changing things at random wastes hours.</p>
<ol>
  <li><strong>Reproduce</strong> the bug reliably, with the smallest input you can find.</li>
  <li><strong>Hypothesize</strong> where the program's state first goes wrong. Which variable has an unexpected value, and at which line?</li>
  <li><strong>Test the hypothesis</strong>. Print values at key points, or use a debugger to pause and inspect.</li>
  <li><strong>Fix the cause</strong>, not the symptom, then rerun all your tests.</li>
</ol>
<p>For quick inspection, an f-string with <code>=</code> prints a variable's name and value: <code>print(f"{total=}")</code> prints <code>total=42</code>. For more control, put <code>breakpoint()</code> on a line. When the program reaches it, it pauses and starts <strong>pdb</strong>, the Python debugger that comes with Python, which shows a <code>(Pdb)</code> prompt. There you type short commands: <code>p total</code> prints a value, <code>n</code> runs the next line, <code>s</code> steps into a function call, <code>c</code> continues until the next breakpoint or the end, <code>l</code> lists the code around the current line, and <code>q</code> quits the debugger and stops the program. Remember to delete the <code>breakpoint()</code> line when you're done. Editors such as VS Code and Thonny offer the same thing with buttons.</p>
<p>And when you're stuck, explain the code out loud, line by line, to someone else or even to a rubber duck on your desk. Saying exactly what each line does often reveals the line that doesn't do what you thought. Programmers really do call this <strong>rubber duck debugging</strong>.</p>

<h3>Exceptions: raising them</h3>
<p>An <strong>exception</strong> is Python's way of signaling that something went wrong. You can raise one yourself when a caller breaks your function's contract:</p>
<pre><code>def mean(xs):
    """Return the average of a non-empty list of numbers."""
    if not xs:
        raise ValueError("mean() of empty list")
    return sum(xs) / len(xs)</code></pre>
<p>Raising an exception with a clear message is much better than returning a strange value like <code>0</code> or <code>None</code>: the caller can't accidentally ignore it, and the traceback points straight to the problem.</p>

<h3>Exceptions: handling them</h3>
<p>When you can do something useful about an error, catch it with <code>try</code> and <code>except</code>:</p>
<pre><code>while True:
    text = input("Enter a whole number: ")
    try:
        value = int(text)
    except ValueError:
        print(f"'{text}' isn't a whole number. Try again.")
    else:
        break          # runs only if no exception happened
print("You entered", value)</code></pre>
<p>Python runs the <code>try</code> block. If a <code>ValueError</code> happens, it jumps to the matching <code>except</code> block; if nothing goes wrong, it runs the optional <code>else</code> block. A <code>finally</code> block, if present, runs either way, which is useful for cleanup. Write <code>except ValueError as e:</code> to get the exception itself, and <code>print(e)</code> to see its message.</p>
<p>Why use <code>else</code> instead of putting the code at the end of the <code>try</code> block? Keep the <code>try</code> block to the lines you expect might fail, so the <code>except</code> can only catch errors from those lines. Code in <code>else</code> runs only on success, but its own errors are <em>not</em> caught by that <code>except</code>. Here is a mistake that <code>else</code> prevents (with <code>import math</code> at the top):</p>
<pre><code>try:
    n = int(text)
    print(math.sqrt(n))   # math.sqrt(-4) also raises ValueError!
except ValueError:
    print("Not a whole number.")</code></pre>
<p>If the user types <code>-4</code>, the conversion works, but <code>math.sqrt</code> raises <code>ValueError: math domain error</code>, and the program wrongly says "Not a whole number." Moving the second line into <code>else</code> fixes it: the <code>except</code> now covers only <code>int(text)</code>, and the square-root problem shows up as its own error.</p>
<pre><code>try:
    n = int(text)
except ValueError:
    print("Not a whole number.")
else:
    print(math.sqrt(n))</code></pre>
<p>For very short code like the loop above, either style works; the rule matters as blocks grow.</p>
<p>Two rules keep exception handling from hiding bugs:</p>
<ul>
  <li><strong>Catch specific exceptions.</strong> A bare <code>except:</code> catches everything, including a <code>NameError</code> from a typo, and your program carries on in a broken state.</li>
  <li><strong>Catch only where you can respond.</strong> If a function can't do anything sensible about an error, let it pass up to the caller.</li>
</ul>

<h3>Assertions versus exceptions</h3>
<p><code>assert condition</code> states something you believe is <em>always</em> true at that point in your own code. If it's false, the program stops at once, close to the real cause. Use assertions to catch your own mistakes, and raise exceptions for problems caused by the caller or the outside world, such as bad input or a missing file. (Python can be run with assertions switched off, so never rely on them to check user input.)</p>
`,
    terms: [
      ["Unit test", "A small automated check of one function's behavior."],
      ["Edge case", "An input at the boundary of what a function accepts, where bugs are most likely."],
      ["pytest", "A popular tool that finds and runs test functions and reports failures."],
      ["Traceback", "Python's report of the chain of calls that led to an error. Read it from the bottom up."],
      ["Exception", "An object signaling an error, which travels up the call stack until caught."],
      ["try / except", "Code that runs a block and handles specific exceptions if they occur."],
      ["Breakpoint", "A place where a debugger pauses the program so you can inspect its state."],
      ["Assertion", "A statement that a condition must hold at that point."]
    ],
    quiz: [
      { q: "Which part of a traceback should you read first?", choices: ["The first line", "The last line", "The middle", "Only the file names"], answer: 1, why: "The last line names the exception and the message. Then work upward through the calls." },
      { q: "Which is an edge case for a function that finds the maximum of a list?", choices: ["[3, 7, 2]", "[10, 20, 30]", "[]", "[5, 1, 4]"], answer: 2, why: "The empty list is the boundary: there is no maximum, so the function must decide what to do." },
      { q: "Why is <code>except:</code> with no exception type risky?", choices: ["It is a syntax error", "It catches every error, hiding real bugs", "It runs slower", "It only catches ValueError"], answer: 1, why: "It catches everything, including typos that raise NameError, so the program keeps going in a broken state." },
      { q: "<code>[1, 2].upper()</code> raises which error?", choices: ["TypeError", "NameError", "AttributeError", "ValueError"], answer: 2, why: "Lists don't have an <code>upper</code> method. AttributeError means \"this kind of value has no such attribute or method\"." },
      { q: "You found a bug. What should you write before fixing it?", choices: ["A comment", "A test that fails because of the bug", "A new function", "Nothing"], answer: 1, why: "The test proves the bug exists, proves the fix works, and stops it from coming back." }
    ],
    practice: [
      { q: `<p>Write pytest tests for <code>is_leap_year</code> from the Functions lesson. Include at least one typical leap year, one typical non-leap year, and each of the edge cases in the rule. Copy <code>is_leap_year</code> into a file <code>dates.py</code>, write the tests in <code>test_dates.py</code> in the same folder, and run <code>python3 -m pytest</code> there. (If pytest isn't installed yet, see "Automated tests with pytest" above.)</p>`, a: `<p>With <code>dates.py</code> holding the <code>is_leap_year</code> function from the Functions lesson:</p><pre><code># test_dates.py
from dates import is_leap_year

def test_typical_leap_year():
    assert is_leap_year(2024)

def test_typical_common_year():
    assert not is_leap_year(2023)

def test_century_not_leap():
    assert not is_leap_year(1900)

def test_400_year_is_leap():
    assert is_leap_year(2000)</code></pre><p>The rule has three parts (divisible by 4, by 100, by 400), so the edge cases are a century year like 1900 and a 400th year like 2000. A function that only checked <code>year % 4 == 0</code> would pass the first two tests and fail the third. Running <code>python3 -m pytest</code> in the folder should end with <code>4 passed</code>.</p>` },
      { q: `<p>Read this traceback. What went wrong, in which function, and what is the most likely real cause?</p><pre data-label="Terminal"><code>Traceback (most recent call last):
  File "grades.py", line 15, in &lt;module&gt;
    print(letter(scores["Grace"]))
KeyError: 'Grace'</code></pre>`, a: `<p>The dictionary <code>scores</code> has no key <code>'Grace'</code>, and the error happened on line 15 of the main program, before <code>letter</code> was even called. Likely causes: Grace's score was never added, or the key is spelled differently, for example <code>'grace'</code> or <code>'Grace '</code> with a trailing space. Print <code>scores.keys()</code> to check.</p>` },
      { q: `<p>Write <code>ask_float(prompt, low, high)</code> that keeps asking until the user types a number between <code>low</code> and <code>high</code>, handling text that isn't a number, and returns the number.</p>`, a: `<pre><code>def ask_float(prompt, low, high):
    while True:
        text = input(prompt)
        try:
            value = float(text)
        except ValueError:
            print("Please type a number.")
            continue
        if low &lt;= value &lt;= high:
            return value
        print(f"Please type a number from {low} to {high}.")</code></pre>` },
      { q: `<p>What's wrong with this code, and how would you fix it?</p><pre><code>try:
    total = sum(prices) / len(prices)
    print(f"Average: {totl:.2f}")
except:
    print("No prices yet.")</code></pre>`, a: `<p>The bare <code>except:</code> catches the <code>NameError</code> from the typo <code>totl</code>, so the program prints "No prices yet." even when there are prices. Catch only the error you expect, here <code>ZeroDivisionError</code> from an empty list, and the typo will show up as a real error you can fix:</p><pre><code>try:
    total = sum(prices) / len(prices)
except ZeroDivisionError:
    print("No prices yet.")
else:
    print(f"Average: {total:.2f}")</code></pre>` },
      { q: `<p>This function should return the last <em>n</em> items of a list, but <code>last_n([1, 2, 3, 4], 2)</code> returns <code>[2, 3, 4]</code>. Use the debugging method to find the bug, then write a test that would have caught it.</p><pre><code>def last_n(xs, n):
    return xs[len(xs) - n - 1:]</code></pre>`, a: `<p>For <code>xs = [1, 2, 3, 4]</code> and <code>n = 2</code>, the start index is 4 − 2 − 1 = 1, which gives three items. The <code>- 1</code> is an off-by-one error: it should be <code>xs[len(xs) - n:]</code>, or simply <code>xs[-n:]</code>. Watch the edge case <code>n == 0</code>: <code>xs[-0:]</code> is <code>xs[0:]</code>, the whole list, so the first version is safer.</p><pre><code>def test_last_two():
    assert last_n([1, 2, 3, 4], 2) == [3, 4]

def test_last_zero():
    assert last_n([1, 2, 3], 0) == []</code></pre>` },
      { q: `<p>Name the error each line raises: <code>int("4.5")</code>, <code>"abc"[3]</code>, <code>len(42)</code>, <code>{"a": 1}["b"]</code>, <code>prnt("hi")</code>, <code>10 % 0</code>.</p>`, a: `<p><code>ValueError</code> (not a whole number); <code>IndexError</code> (valid indexes are 0 to 2); <code>TypeError</code> (an int has no length); <code>KeyError</code>; <code>NameError</code>; <code>ZeroDivisionError</code> (remainder by zero is also division by zero).</p>` }
    ],
    sources: ["mit6100l", "thinkpython", "cs50p", "pytutorial"]
  },
  {
    id: "files",
    title: "Files and modules",
    minutes: 90,
    summary: "Read and write text files and CSV data, save structured data as JSON, organize code into modules, and use Python's standard library.",
    notes: `
<p>Every program so far has forgotten everything when it stopped. To keep data between runs, programs read and write <strong>files</strong>. And as programs grow beyond one file, you need to split them into <strong>modules</strong>. This lesson covers both, plus a tour of the tools that come with Python.</p>

<h3>Reading a text file</h3>
<p>Suppose <code>poem.txt</code>, in the same folder as your program, contains a few lines of text. The standard way to read it:</p>
<pre><code>with open("poem.txt", encoding="utf-8") as f:
    text = f.read()          # the whole file as one string
print(text)</code></pre>
<p>Line by line:</p>
<ul>
  <li><code>open</code> takes a path and returns a <strong>file object</strong>. <code>encoding="utf-8"</code> tells Python how the characters are stored; UTF-8 is the standard today and handles every language.</li>
  <li><code>with ... as f:</code> gives the file the name <code>f</code> inside the block and <strong>closes it automatically</strong> when the block ends, even if an error happens. Always open files this way.</li>
</ul>
<p>More often, you'll process a file one line at a time. A <code>for</code> loop over a file gives its lines in order:</p>
<pre><code>with open("poem.txt", encoding="utf-8") as f:
    for number, line in enumerate(f, start=1):
        print(number, line.strip())</code></pre>
<p>Each line still ends with its new-line character, which is why <code>.strip()</code> appears so often in file code. Looping line by line also means a program can handle a file bigger than the computer's memory.</p>

<h3>Writing a file</h3>
<p>Pass a <strong>mode</strong> as the second argument: <code>"w"</code> to write, which creates the file or <em>replaces</em> it if it exists, and <code>"a"</code> to append to the end.</p>
<pre><code>tasks = ["read chapter 4", "problem set 3", "email advisor"]
with open("todo.txt", "w", encoding="utf-8") as f:
    for task in tasks:
        f.write(task + "\\n")

with open("todo.txt", "a", encoding="utf-8") as f:
    f.write("buy coffee\\n")</code></pre>
<p>Unlike <code>print</code>, <code>write</code> doesn't add a new line, so you add <code>"\\n"</code> yourself. Be careful with <code>"w"</code>: opening an existing file in write mode erases it immediately.</p>

<h3>Where is the file? Paths and the working folder</h3>
<p>A relative path like <code>"poem.txt"</code> is looked up in the <strong>working directory</strong>: the folder the terminal was in when you started the program, which isn't necessarily the folder the program file is in. Running <code>python3 code/report.py</code> from the folder above <code>code</code> means <code>open("data.csv")</code> looks for <code>data.csv</code> in the folder above. When you see <code>FileNotFoundError</code>, check <code>pwd</code> first.</p>
<p>The <code>pathlib</code> module makes paths easier and works the same on every operating system:</p>
<pre><code>from pathlib import Path
here = Path(__file__).parent          # the folder this program file is in
data = here / "data" / "grades.csv"   # / joins path parts
print(data.exists())</code></pre>
<p>Two pieces need explaining. <code>__file__</code> (two underscores on each side) is a name Python sets automatically in every program file: it holds the path of that file, as a string. <code>Path(__file__)</code> turns it into a <code>Path</code> object, and <code>.parent</code> is the folder containing it. So <code>here</code> is the program's own folder, wherever the terminal happens to be. (<code>__file__</code> isn't defined in the <code>&gt;&gt;&gt;</code> console, because there's no file.) The <code>/</code> is not division here: <code>Path</code> objects define <code>/</code> to mean "join with a path separator". It's a deliberate choice because <code>/</code> already separates folders on macOS and Linux, and <code>pathlib</code> uses <code>\\</code> on Windows for you.</p>

<h3>CSV files: tables of data</h3>
<p>A <strong>CSV</strong> (comma-separated values) file stores a table as text, one row per line, which spreadsheets can open and save. Suppose <code>grades.csv</code> holds:</p>
<pre data-label="grades.csv"><code>name,quiz1,quiz2,quiz3
Ada,88,92,95
Alan,79,85,91
Grace,97,94,99</code></pre>
<p>The <code>csv</code> module handles the details, such as values that contain commas. <code>DictReader</code> uses the first row as column names and gives each later row as a dictionary:</p>
<pre><code>import csv

with open("grades.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        scores = [int(row["quiz1"]), int(row["quiz2"]), int(row["quiz3"])]
        print(f"{row['name']}: {sum(scores) / len(scores):.1f}")
# Ada: 91.7
# Alan: 85.0
# Grace: 96.7</code></pre>
<p>Notice <code>int(...)</code>: everything read from a text file is a string, just like <code>input()</code>. Writing a CSV uses <code>csv.writer</code> and its <code>writerow</code> method.</p>
<p>Why <code>newline=""</code>? Normally, when Python reads or writes a text file, it translates line endings for you (Windows ends lines with two characters, <code>\\r\\n</code>; macOS and Linux use one, <code>\\n</code>). The <code>csv</code> module wants to handle line endings itself, because a quoted value in a CSV may legitimately contain a line break. <code>newline=""</code> switches Python's translation off and lets <code>csv</code> do it. Without it, files written on Windows get an extra blank line after every row. The rule is simple: whenever you open a file for <code>csv</code>, reading or writing, pass <code>newline=""</code>.</p>

<h3>JSON: saving structured data</h3>
<p>For data that isn't a simple table, such as a dictionary of lists or settings, use <strong>JSON</strong>, a text format that looks almost exactly like Python dictionaries and lists and is used by most web services.</p>
<pre><code>import json

settings = {"theme": "dark", "font_size": 14, "recent": ["a.py", "b.py"]}
with open("settings.json", "w", encoding="utf-8") as f:
    json.dump(settings, f, indent=2)

with open("settings.json", encoding="utf-8") as f:
    loaded = json.load(f)
print(loaded["recent"])   # ['a.py', 'b.py']</code></pre>

<h3>When the file isn't there</h3>
<p>Files are part of the outside world, so expect problems: a missing file, a folder with no permission, a badly formatted line. Handle the ones you can respond to:</p>
<pre><code>try:
    with open("settings.json", encoding="utf-8") as f:
        settings = json.load(f)
except FileNotFoundError:
    settings = {"theme": "light", "font_size": 12}   # first run: use defaults</code></pre>

<h3>Modules: splitting a program into files</h3>
<p>Every <code>.py</code> file is a <strong>module</strong>. You can use one module's functions from another with <code>import</code>. Suppose <code>geometry.py</code> contains:</p>
<pre data-label="geometry.py"><code>import math

def circle_area(r):
    return math.pi * r ** 2

def hypotenuse(a, b):
    return math.sqrt(a ** 2 + b ** 2)</code></pre>
<p>Another file in the same folder can use it in several ways:</p>
<pre><code>import geometry
geometry.circle_area(2)          # use the module name as a prefix

from geometry import hypotenuse
hypotenuse(3, 4)                 # import one name directly

import geometry as g
g.circle_area(1)                 # a shorter nickname</code></pre>
<p>The prefix style, <code>geometry.circle_area</code>, makes it obvious where a function came from, which helps in larger programs.</p>

<h3>Running a module versus importing it</h3>
<p>When Python imports a module, it runs the whole file. If <code>geometry.py</code> had test code at the bottom, such as <code>print(circle_area(2))</code>, that would run on every import. The fix is a special check:</p>
<pre><code>if __name__ == "__main__":
    print(circle_area(2))    # runs only when this file is run directly</code></pre>
<p>Python sets the variable <code>__name__</code> to <code>"__main__"</code> in the file you run, and to the module's name, here <code>"geometry"</code>, when the file is imported. You'll see this line at the bottom of most Python programs.</p>

<h3>The standard library</h3>
<p>Python comes "batteries included": hundreds of modules ship with it. A few worth knowing now:</p>
<table>
  <thead><tr><th>Module</th><th>For</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td><code>math</code></td><td>Math functions and constants</td><td><code>math.sqrt(2)</code>, <code>math.pi</code></td></tr>
    <tr><td><code>random</code></td><td>Random numbers and choices</td><td><code>random.choice(["a", "b"])</code></td></tr>
    <tr><td><code>statistics</code></td><td>Mean, median, standard deviation</td><td><code>statistics.median([3, 1, 2])</code></td></tr>
    <tr><td><code>datetime</code></td><td>Dates and times</td><td><code>datetime.date.today()</code></td></tr>
    <tr><td><code>collections</code></td><td>Extra data structures</td><td><code>Counter("banana").most_common(1)</code> gives <code>[('a', 3)]</code></td></tr>
    <tr><td><code>pathlib</code>, <code>csv</code>, <code>json</code></td><td>Files and data formats</td><td>See above</td></tr>
  </tbody>
</table>
<p>A <code>Counter</code>, from <code>collections</code> (bring it in with <code>from collections import Counter</code>), is a dictionary that counts. Give it any sequence, such as a string or a list of words, and it maps each item to how many times it appears. <code>c.most_common(k)</code> returns the <code>k</code> most frequent items as a list of <code>(item, count)</code> tuples, highest count first, and a missing item counts as 0 instead of raising <code>KeyError</code>:</p>
<pre><code>from collections import Counter
c = Counter(["to", "be", "or", "not", "to", "be"])
print(c.most_common(2))   # [('to', 2), ('be', 2)]
print(c["to"], c["xyz"])  # 2 0</code></pre>
<p>Before writing something general, such as counting, sorting or parsing dates, check whether the standard library already does it. Its code has been tested by millions of users.</p>
`,
    terms: [
      ["File object", "The value returned by open(), used to read or write a file."],
      ["with statement", "A block that automatically closes a file (or other resource) when it ends."],
      ["Mode", "How a file is opened: \"r\" to read (the default), \"w\" to write (replacing), \"a\" to append."],
      ["Encoding", "How characters are stored as bytes. UTF-8 is the modern standard."],
      ["CSV", "Comma-separated values: a plain-text table, one row per line."],
      ["JSON", "A text format for nested data, close to Python dicts and lists."],
      ["Module", "A .py file whose functions and variables other files can import."],
      ["__name__ == \"__main__\"", "A check that is true only in the file being run directly, not when it is imported."]
    ],
    quiz: [
      { q: "Why open files with <code>with open(...) as f:</code>?", choices: ["It's faster", "The file is closed automatically, even if an error happens", "It's required for reading", "It creates the file"], answer: 1, why: "The with block guarantees the file is closed when the block ends." },
      { q: "A file <code>log.txt</code> has 100 lines. What happens after <code>open(\"log.txt\", \"w\")</code>?", choices: ["New text is added to the end", "The file is emptied immediately", "An error, because the file exists", "Nothing until you call write"], answer: 1, why: "Write mode replaces the file's contents as soon as it is opened. Use \"a\" to append." },
      { q: "You read the number 42 from a CSV file. What is its type?", choices: ["int", "float", "str", "It depends on the file"], answer: 2, why: "Everything read from a text file is a string. Convert with int() or float()." },
      { q: "<code>open(\"data.csv\")</code> raises FileNotFoundError, but the file is right next to your program. What's the most likely cause?", choices: ["The file is too large", "The terminal's working directory is a different folder", "CSV files need the csv module to open", "Python can't open CSV files"], answer: 1, why: "Relative paths are looked up from the working directory, not from the program's folder." },
      { q: "When is the code under <code>if __name__ == \"__main__\":</code> run?", choices: ["Every time the module is imported", "Only when the file is run directly", "Never", "Only in the interactive console"], answer: 1, why: "__name__ is \"__main__\" only in the file Python was asked to run." }
    ],
    practice: [
      { q: `<p>Write <code>file_stats(path)</code> that returns a tuple <code>(lines, words, characters)</code> for a text file, like the Unix <code>wc</code> command.</p>`, a: `<pre><code>def file_stats(path):
    lines = words = chars = 0
    with open(path, encoding="utf-8") as f:
        for line in f:
            lines += 1
            words += len(line.split())
            chars += len(line)
    return lines, words, chars</code></pre><p>Reading line by line keeps memory use small for huge files. Note that the character count includes the new-line characters.</p>` },
      { q: `<p>Write a program that asks the user for tasks until they enter a blank line, saves them to <code>todo.txt</code> one per line, then reads the file back and prints the tasks numbered from 1.</p>`, a: `<pre><code>tasks = []
while True:
    task = input("Task (blank to finish): ").strip()
    if task == "":
        break
    tasks.append(task)

with open("todo.txt", "w", encoding="utf-8") as f:
    for task in tasks:
        f.write(task + "\\n")

with open("todo.txt", encoding="utf-8") as f:
    for i, line in enumerate(f, start=1):
        print(f"{i}. {line.strip()}")</code></pre>` },
      { q: `<p>Using <code>grades.csv</code> from the notes, write a program that prints the name of the student with the highest average and the class average on each quiz.</p>`, a: `<pre><code>import csv

quizzes = ["quiz1", "quiz2", "quiz3"]
rows = []
with open("grades.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        rows.append(row)

def average(row):
    return sum(int(row[q]) for q in quizzes) / len(quizzes)

best = max(rows, key=average)
print("Top student:", best["name"])
for q in quizzes:
    avg = sum(int(r[q]) for r in rows) / len(rows)
    print(f"{q}: {avg:.1f}")</code></pre><p>Ada averages 91.7, Alan 85.0 and Grace 96.7, so Grace is top. The quiz averages are 88.0, 90.3 and 95.0.</p>` },
      { q: `<p>Use <code>collections.Counter</code> to print the ten most common words in a text file, ignoring case.</p>`, a: `<pre><code>from collections import Counter

with open("book.txt", encoding="utf-8") as f:
    words = f.read().lower().split()

for word, count in Counter(words).most_common(10):
    print(f"{word:15}{count}")</code></pre><p><code>Counter</code> does the job of the <code>word_counts</code> function you wrote by hand in the collections lesson. Punctuation still sticks to words ("end." vs "end"); stripping it is a good extension.</p>` },
      { q: `<p>Move <code>is_leap_year</code> and <code>days_in_month</code> into a module <code>dates.py</code>, with a few test calls guarded by <code>if __name__ == "__main__":</code>. Then use the module from a second file <code>calendar_app.py</code> that prints the number of days in each month of 2028.</p>`, a: `<pre data-label="dates.py"><code>def is_leap_year(year):
    if year % 400 == 0:
        return True
    if year % 100 == 0:
        return False
    return year % 4 == 0

def days_in_month(month, year):
    if month == 2:
        return 29 if is_leap_year(year) else 28
    if month in (4, 6, 9, 11):
        return 30
    return 31

if __name__ == "__main__":
    print(is_leap_year(2000), is_leap_year(1900))   # True False</code></pre><pre data-label="calendar_app.py"><code>import dates

for month in range(1, 13):
    print(month, dates.days_in_month(month, 2028))</code></pre><p>Running <code>calendar_app.py</code> doesn't print <code>True False</code>, because the guarded code only runs when <code>dates.py</code> is run directly. 2028 is a leap year, so February has 29 days.</p>` },
      { q: `<p>Write <code>load_scores(path)</code> that reads a JSON file mapping names to lists of scores, and returns an empty dictionary if the file doesn't exist. Write <code>save_scores(path, scores)</code> too.</p>`, a: `<pre><code>import json

def load_scores(path):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def save_scores(path, scores):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(scores, f, indent=2)</code></pre>` }
    ],
    sources: ["pytutorial", "thinkpython", "cs50p"]
  },
  {
    id: "algo",
    title: "Searching, sorting and efficiency",
    minutes: 90,
    summary: "Compare algorithms by how their work grows with input size: linear and binary search, an informal introduction to big-O notation, the cost of Python's data structures, and two sorting algorithms.",
    notes: `
<p>Two correct programs can differ enormously in speed. One might answer in a millisecond and the other take hours on the same data. This lesson introduces how computer scientists compare algorithms: not by timing them on one computer, but by asking <strong>how the amount of work grows as the input grows</strong>.</p>

<h3>Linear search</h3>
<p>To find an item in a list, the simplest approach checks each item in turn:</p>
<pre><code>def linear_search(xs, target):
    """Return the index of target in xs, or -1 if it isn't there."""
    for i in range(len(xs)):
        if xs[i] == target:
            return i
    return -1</code></pre>
<p>In the worst case, when the target is last or missing, this checks all <em>n</em> items. A list ten times longer takes about ten times longer. We say linear search takes <strong>linear time</strong>. Python's <code>x in xs</code> and <code>xs.index(x)</code> work this way on lists.</p>

<h3>Binary search</h3>
<p>If the list is <strong>sorted</strong>, we can do much better, the way you look up a word in a printed dictionary. Look at the middle item. If the target is smaller, it can only be in the left half; if larger, only in the right half. Each check throws away half of what's left.</p>
<pre><code>def binary_search(xs, target):
    """Return the index of target in sorted list xs, or -1."""
    low, high = 0, len(xs) - 1
    while low &lt;= high:
        mid = (low + high) // 2
        if xs[mid] == target:
            return mid
        if xs[mid] &lt; target:
            low = mid + 1      # target is in the right half
        else:
            high = mid - 1     # target is in the left half
    return -1</code></pre>
<p>Trace a search for 23 in <code>[2, 5, 8, 12, 16, 23, 38, 56, 72, 91]</code>:</p>
<table>
  <thead><tr><th>Step</th><th>low</th><th>high</th><th>mid</th><th><code>xs[mid]</code></th><th>Decision</th></tr></thead>
  <tbody>
    <tr><td>1</td><td>0</td><td>9</td><td>4</td><td>16</td><td>16 &lt; 23: go right</td></tr>
    <tr><td>2</td><td>5</td><td>9</td><td>7</td><td>56</td><td>56 &gt; 23: go left</td></tr>
    <tr><td>3</td><td>5</td><td>6</td><td>5</td><td>23</td><td>Found at index 5</td></tr>
  </tbody>
</table>
<p>How many steps in the worst case? Each step halves the range, so the question is how many times you can halve <em>n</em> before reaching 1. That's log₂ <em>n</em>. For a million items, that's only about 20 steps; for a billion, about 30. This is the bisection idea from the branching lesson, applied to a list.</p>

<h3>Counting steps: big-O notation</h3>
<p>Exact timings depend on the computer, the language and what else is running. So we describe algorithms by their <strong>order of growth</strong>, written in <strong>big-O notation</strong>: the dominant way the work grows with input size <em>n</em>, ignoring constant factors and smaller terms. An algorithm that does 3<em>n</em> + 7 steps is O(<em>n</em>); one that does <em>n</em>² + 100<em>n</em> is O(<em>n</em>²), because for large <em>n</em> the <em>n</em>² term dominates. (This is the same "only the dominant term matters" idea as limits at infinity in Calculus.)</p>
<table>
  <thead><tr><th>Order</th><th>Name</th><th>Example</th><th>n = 10</th><th>n = 1,000</th><th>n = 1,000,000</th></tr></thead>
  <tbody>
    <tr><td>O(1)</td><td>constant</td><td>Dictionary lookup</td><td>1</td><td>1</td><td>1</td></tr>
    <tr><td>O(log <em>n</em>)</td><td>logarithmic</td><td>Binary search</td><td>3</td><td>10</td><td>20</td></tr>
    <tr><td>O(<em>n</em>)</td><td>linear</td><td>Linear search</td><td>10</td><td>1,000</td><td>1,000,000</td></tr>
    <tr><td>O(<em>n</em> log <em>n</em>)</td><td>linearithmic</td><td>Merge sort</td><td>33</td><td>10,000</td><td>20,000,000</td></tr>
    <tr><td>O(<em>n</em>²)</td><td>quadratic</td><td>Selection sort</td><td>100</td><td>1,000,000</td><td>1,000,000,000,000</td></tr>
    <tr><td>O(2<sup>n</sup>)</td><td>exponential</td><td>Trying every subset of <em>n</em> items</td><td>1,024</td><td>a 302-digit number</td><td>hopeless</td></tr>
  </tbody>
</table>
<p>Naive Fibonacci from <a href="#c-cs101-u4">the Recursion lesson</a> is exponential too. Its number of calls grows like about 1.6<sup>n</sup>, which is always less than 2<sup>n</sup>, so O(2<sup>n</sup>) is a correct upper bound for it, though not a tight one. (Big-O promises only "grows no faster than".) Any growth like <em>b</em><sup>n</sup> with <em>b</em> &gt; 1 belongs in the hopeless row: 1.6<sup>1000</sup> has 205 digits.</p>
<p>At a billion simple steps per second, the quadratic algorithm on a million items takes about 17 minutes; the linearithmic one takes a fiftieth of a second. Choosing a better algorithm usually matters far more than a faster computer.</p>

<h3>Reading the order from code</h3>
<p>A few rules of thumb cover most code you'll write this term:</p>
<ul>
  <li>A fixed number of simple operations, with no loop over the input: <strong>O(1)</strong>.</li>
  <li>One loop over the input: <strong>O(<em>n</em>)</strong>.</li>
  <li>A loop inside a loop, both over the input: <strong>O(<em>n</em>²)</strong>.</li>
  <li>A loop that halves the remaining work each time: <strong>O(log <em>n</em>)</strong>.</li>
  <li>Watch for hidden loops: <code>x in some_list</code>, <code>xs.index(x)</code>, <code>xs.insert(0, x)</code>, <code>xs.remove(x)</code> and slicing all take O(<em>n</em>) time on a list.</li>
</ul>
<pre><code>def has_duplicate(xs):          # O(n²): compares every pair
    for i in range(len(xs)):
        for j in range(i + 1, len(xs)):
            if xs[i] == xs[j]:
                return True
    return False

def has_duplicate_fast(xs):     # O(n): one pass with a set
    seen = set()
    for x in xs:
        if x in seen:           # O(1) on a set
            return True
        seen.add(x)
    return False</code></pre>

<h3>The cost of Python's data structures</h3>
<table>
  <thead><tr><th>Operation</th><th>list</th><th>set or dict</th></tr></thead>
  <tbody>
    <tr><td>Check membership: <code>x in c</code></td><td>O(<em>n</em>)</td><td>O(1) on average</td></tr>
    <tr><td>Add at the end: <code>append</code>, <code>add</code></td><td>O(1) on average</td><td>O(1) on average</td></tr>
    <tr><td>Insert or remove at the front</td><td>O(<em>n</em>): everything shifts</td><td>not applicable</td></tr>
    <tr><td>Get by position: <code>xs[i]</code></td><td>O(1)</td><td>not applicable</td></tr>
  </tbody>
</table>
<p>Sets and dictionaries use a <strong>hash table</strong>: they compute a number from each key, its <em>hash</em>, that tells them where to store it, so finding a key doesn't require searching. The Lists lesson showed the first step (<a href="#c-cs101-u5">"What hashable means"</a>). Here is a small worked example, with 8 slots, whole-number keys (whose hash is the number itself), and slot = hash % 8:</p>
<table>
  <thead><tr><th>Insert key</th><th>12 % 8</th><th>7 % 8</th><th>33 % 8</th><th>20 % 8</th></tr></thead>
  <tbody>
    <tr><td>Slot</td><td>4</td><td>7</td><td>1</td><td>4: already taken by 12</td></tr>
  </tbody>
</table>
<p>Two keys landing in the same slot is called a <strong>collision</strong>. One simple fix is to let each slot hold a short list: slot 4 holds <code>[12, 20]</code>. To check <code>20 in table</code>, compute 20 % 8 = 4 and look only through slot 4's two keys, never the rest. When the table fills up, it doubles its number of slots and reinserts everything, which keeps the lists short. That's why lookups are O(1) <em>on average</em>: a few steps, however many keys there are. (Python's real tables resolve collisions a little differently, by trying another slot, but the idea is the same.) You'll build hash tables yourself in CS 102 and Data Structures. You can see the difference in speed yourself:</p>
<pre><code>import time

n = 1_000_000
as_list = list(range(n))
as_set = set(as_list)

start = time.perf_counter()
for _ in range(100):
    (n - 1) in as_list        # searches to the end each time
print("list:", time.perf_counter() - start)

start = time.perf_counter()
for _ in range(100):
    (n - 1) in as_set
print("set: ", time.perf_counter() - start)</code></pre>
<p>On a typical laptop the list version takes around a second and the set version well under a millisecond. (The underscores in <code>1_000_000</code> are just for readability. The loop variable <code>_</code> is the "I don't use this value" name from <a href="#c-cs101-u2">Lesson 3, for loops</a>: the loop just repeats 100 times.)</p>

<h3>Sorting: selection sort</h3>
<p>Sorting is one of the most studied problems in computer science, because so much else depends on it, binary search included. The simplest method, <strong>selection sort</strong>, repeatedly finds the smallest remaining item and moves it to the front:</p>
<pre><code>def selection_sort(xs):
    xs = xs.copy()                    # don't change the caller's list
    for i in range(len(xs)):
        smallest = i
        for j in range(i + 1, len(xs)):
            if xs[j] &lt; xs[smallest]:
                smallest = j
        xs[i], xs[smallest] = xs[smallest], xs[i]   # swap
    return xs</code></pre>
<p>The inner loop runs <em>n</em> − 1 times, then <em>n</em> − 2, and so on: about <em>n</em>²/2 comparisons in total, so selection sort is O(<em>n</em>²). Fine for 100 items; painfully slow for a million.</p>

<h3>Sorting: merge sort</h3>
<p><strong>Merge sort</strong> uses divide and conquer from the recursion lesson. Split the list in half, sort each half recursively, then <em>merge</em> the two sorted halves by repeatedly taking the smaller front item.</p>
<pre><code>def merge(left, right):
    """Combine two sorted lists into one sorted list."""
    result = []
    i = j = 0
    while i &lt; len(left) and j &lt; len(right):
        if left[i] &lt;= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    return result + left[i:] + right[j:]   # whatever remains

def merge_sort(xs):
    if len(xs) &lt;= 1:                  # base case: already sorted
        return xs
    mid = len(xs) // 2
    return merge(merge_sort(xs[:mid]), merge_sort(xs[mid:]))</code></pre>
<p>Halving <em>n</em> items takes about log₂ <em>n</em> levels, and each level does about <em>n</em> work merging, so merge sort is O(<em>n</em> log <em>n</em>). It can be proved that no sorting method based on comparing items can do better than that in the worst case. The intuition: <em>n</em> items can arrive in <em>n</em>! different orders (3 items: 6 orders), and the sort must tell them all apart, since each needs different moves. Each comparison has only two answers, so it can at most halve the orders still possible. Getting from <em>n</em>! possibilities down to 1 therefore takes at least log₂(<em>n</em>!) comparisons in the worst case (for 3 items: 3 comparisons, because 2 comparisons can only separate 4 cases). And log₂(<em>n</em>!) grows like <em>n</em> log₂ <em>n</em>: for <em>n</em> = 1,000 it is about 8,530, compared with <em>n</em> log₂ <em>n</em> ≈ 9,966. <a href="#c-math131-k1">MATH 131, Lesson 1</a> computes this with Stirling's approximation, and you'll prove it carefully in Algorithms.</p>
<p>In practice, use Python's built-in <code>sorted</code> and <code>.sort()</code>. They use <strong>Timsort</strong>, designed by Tim Peters for Python in 2002, which is O(<em>n</em> log <em>n</em>) and especially fast on data that is already partly sorted. Java, Android and other platforms later adopted it.</p>

<div class="callout"><strong>The big idea.</strong> Before optimizing code line by line, ask what its order of growth is and whether a different algorithm or data structure changes it. Turning O(<em>n</em>²) into O(<em>n</em>) with a set, or O(<em>n</em>) into O(log <em>n</em>) by sorting once and using binary search, beats any amount of fine-tuning.</div>
`,
    terms: [
      ["Algorithm", "A precise, step-by-step method for solving a problem."],
      ["Linear search", "Checking items one by one; O(n)."],
      ["Binary search", "Searching a sorted list by repeatedly halving the range; O(log n)."],
      ["Order of growth", "How an algorithm's work increases as its input gets larger."],
      ["Big-O notation", "A description of order of growth that ignores constant factors and smaller terms, such as O(n²)."],
      ["Hash table", "The structure behind sets and dicts, which finds keys without searching."],
      ["Merge sort", "A divide-and-conquer sorting algorithm; O(n log n)."]
    ],
    quiz: [
      { q: "About how many steps does binary search need on a sorted list of 1,000,000 items, in the worst case?", choices: ["About 20", "About 1,000", "About 500,000", "About 1,000,000"], answer: 0, why: "2²⁰ is about a million, so about 20 halvings reduce the range to one item." },
      { q: "What is the order of growth of 5n² + 100n + 3?", choices: ["O(n)", "O(n²)", "O(5n²)", "O(100n)"], answer: 1, why: "Drop constant factors and smaller terms: for large n, the n² term dominates." },
      { q: "Which is fastest for checking whether a username is already taken, with a million users?", choices: ["A list and <code>in</code>", "A sorted list and linear search", "A set and <code>in</code>", "They are all the same"], answer: 2, why: "Membership in a set takes O(1) time on average; in a list it takes O(n)." },
      { q: "What must be true before you can use binary search?", choices: ["The list has no duplicates", "The list is sorted", "The list has an even length", "The list holds numbers"], answer: 1, why: "Binary search decides which half to discard by comparing with the middle item, which only works on sorted data." },
      { q: "A function has a loop over the input inside another loop over the input. What is its order of growth, typically?", choices: ["O(log n)", "O(n)", "O(n²)", "O(2ⁿ)"], answer: 2, why: "The inner loop runs about n times for each of the n outer passes." }
    ],
    practice: [
      { q: `<p>Trace <code>binary_search</code> looking for 7 in <code>[1, 3, 5, 7, 9, 11, 13]</code>. Then trace a search for 8. Show low, high and mid at each step.</p>`, a: `<p>For 7: low 0, high 6, mid 3, <code>xs[3]</code> = 7, found at index 3 on the first step.</p><p>For 8: (0, 6, mid 3: 7 &lt; 8, go right) → (4, 6, mid 5: 11 &gt; 8, go left) → (4, 4, mid 4: 9 &gt; 8, go left) → low 4 &gt; high 3, so the loop ends and the function returns −1. Three comparisons to prove 8 isn't there.</p>` },
      { q: `<p>Give the big-O order of each function, in terms of the length <em>n</em> of <code>xs</code>.</p><pre><code>def a(xs):
    return xs[0] + xs[-1]

def b(xs):
    total = 0
    for x in xs:
        total += x
    for x in xs:
        total -= 1
    return total

def c(xs):
    count = 0
    for x in xs:
        if x in xs:
            count += 1
    return count

def d(n):
    steps = 0
    while n &gt; 1:
        n //= 2
        steps += 1
    return steps</code></pre>`, a: `<p><code>a</code>: O(1), a fixed amount of work. <code>b</code>: O(<em>n</em>); two loops one after the other is about 2<em>n</em> steps, and constants are dropped. <code>c</code>: O(<em>n</em>²), because <code>x in xs</code> is itself a hidden loop over the list. <code>d</code>: O(log <em>n</em>), since <em>n</em> halves each time.</p>` },
      { q: `<p><strong>Two-sum.</strong> Given a list of numbers and a target, return <code>True</code> if any two different items add up to the target. Write an O(<em>n</em>²) version with nested loops, then an O(<em>n</em>) version using a set.</p>`, hint: `<p>For each number <code>x</code>, the partner you need is <code>target - x</code>. Have you already seen it?</p>`, a: `<pre><code>def two_sum_slow(xs, target):
    for i in range(len(xs)):
        for j in range(i + 1, len(xs)):
            if xs[i] + xs[j] == target:
                return True
    return False

def two_sum(xs, target):
    seen = set()
    for x in xs:
        if target - x in seen:
            return True
        seen.add(x)
    return False

assert two_sum([3, 9, 14, 5], 19)       # 14 + 5
assert not two_sum([3, 9, 14, 5], 4)</code></pre>` },
      { q: `<p>Show the list after each pass of the outer loop of <code>selection_sort</code> on <code>[29, 10, 14, 37, 13]</code>.</p>`, a: `<table><thead><tr><th>After pass</th><th>List</th></tr></thead><tbody><tr><td>i = 0</td><td>[10, 29, 14, 37, 13]</td></tr><tr><td>i = 1</td><td>[10, 13, 14, 37, 29]</td></tr><tr><td>i = 2</td><td>[10, 13, 14, 37, 29]</td></tr><tr><td>i = 3</td><td>[10, 13, 14, 29, 37]</td></tr><tr><td>i = 4</td><td>[10, 13, 14, 29, 37]</td></tr></tbody></table><p>After pass <em>i</em>, the first <em>i</em> + 1 positions hold the smallest items in order: that's the loop invariant that proves selection sort correct.</p>` },
      { q: `<p>Run the list-versus-set timing experiment from the notes on your computer, then repeat it with <code>n = 100_000</code> and <code>n = 10_000_000</code>. How do the two times change as <em>n</em> grows by a factor of 10 each time? Does that match big-O?</p>`, a: `<p>The list time should grow roughly tenfold each time <em>n</em> grows tenfold, as O(<em>n</em>) predicts. The set time should stay about the same, as O(1) predicts. Exact numbers vary by computer; what matters is the pattern. (Building the 10-million-item list and set takes a few seconds and a fair amount of memory.)</p>` },
      { q: `<p>You have a sorted list of a million student IDs and need to check 10,000 IDs against it. Compare the total work for (a) 10,000 linear searches, (b) 10,000 binary searches, (c) building a set once and checking membership.</p>`, a: `<p>(a) Up to 10,000 × 1,000,000 = 10 billion comparisons. (b) About 10,000 × 20 = 200,000 comparisons. (c) About 1,000,000 steps to build the set, then 10,000 constant-time checks, so about a million steps. Both (b) and (c) are thousands of times faster than (a); (b) needs no extra memory, while (c) is simpler and also works on unsorted data.</p>` }
    ],
    sources: ["mit6100l", "thinkpython"]
  },
  {
    id: "u7",
    title: "Version control and the programmer's toolkit",
    minutes: 90,
    summary: "Track your work with Git and GitHub, manage packages with virtual environments and pip, keep code tidy with formatters and linters, and use AI coding assistants without outsourcing your learning.",
    notes: `
<p>Writing code is only part of programming. Professionals also keep a history of every change, share code with teammates, manage the libraries their projects depend on, and use tools that catch mistakes automatically. This lesson covers the tools you'll use in every later course and in any software job.</p>

<h3>Why version control?</h3>
<p>Without version control, projects end up as <code>essay_final.py</code>, <code>essay_final2.py</code> and <code>essay_REALLY_final.py</code>, and nobody knows which works. <strong>Git</strong> solves this. It records <strong>snapshots</strong> of your project, called <strong>commits</strong>, each with a message saying what changed and why. With Git you can see exactly what changed and when, go back to any earlier version, try ideas without risk, and work with others on the same code. Linus Torvalds created Git in 2005 for developing Linux, and it is now used for almost all software.</p>

<h3>The three places your work lives</h3>
<figure class="fig">
<svg viewBox="0 0 560 190" role="img" aria-label="Diagram: working folder, then git add to staging area, then git commit to repository history, then git push to GitHub">
  <defs><marker id="arr-git" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
  <rect x="10" y="30" width="140" height="70" rx="6" class="box"/><text x="22" y="56">Working folder</text><text x="22" y="80" class="m">files you edit</text>
  <rect x="210" y="30" width="140" height="70" rx="6" class="warm"/><text x="222" y="56">Staging area</text><text x="222" y="80" class="m">changes chosen</text>
  <rect x="410" y="30" width="140" height="70" rx="6" class="soft"/><text x="422" y="56">Repository</text><text x="422" y="80" class="m">history of commits</text>
  <rect x="410" y="135" width="140" height="44" rx="6" class="box"/><text x="422" y="162">GitHub (remote)</text>
  <line x1="152" y1="65" x2="206" y2="65" class="cv" marker-end="url(#arr-git)"/><text x="154" y="56" class="code">git add</text>
  <line x1="352" y1="65" x2="406" y2="65" class="cv" marker-end="url(#arr-git)"/><text x="350" y="56" class="code">git commit</text>
  <line x1="480" y1="102" x2="480" y2="131" class="cv" marker-end="url(#arr-git)"/><text x="400" y="122" class="code">git push</text>
</svg>
<figcaption>You edit files in the working folder, choose which changes to include with <code>git add</code>, record them as a commit, and copy commits to a server such as GitHub with <code>git push</code>.</figcaption>
</figure>
<p>The <strong>staging area</strong> confuses most beginners, so here's why it exists: you might change five files but want to record only two of them in this commit, because the other three are part of a different, unfinished change. <code>git add</code> picks what goes into the next snapshot; <code>git commit</code> takes the snapshot.</p>
<p>Git only keeps history for files you have added at least once; those are <strong>tracked</strong>. A new file in the folder that you have never added is <strong>untracked</strong>: Git notices it and lists it under "Untracked files" in <code>git status</code>, but ignores its contents until you <code>git add</code> it.</p>

<h3>The everyday commands</h3>
<pre data-label="Terminal"><code>git init                       # start tracking the current folder (once per project)
git status                     # what has changed? what is staged? what is untracked?
git diff                       # show the exact lines changed
git add stats.py               # stage one file  (git add . stages everything)
git commit -m "Handle empty list in mean()"
git log --oneline              # list past commits
git restore stats.py           # throw away uncommitted changes to a file</code></pre>
<p>A typical cycle is: edit, run your tests, <code>git status</code> and <code>git diff</code> to review, <code>git add</code>, <code>git commit</code>. Commit small working steps, each with a message that says <em>why</em>, in the present tense: "Handle empty list in mean()" rather than "changes" or "fixed stuff". Your commit history becomes a lab notebook of the project.</p>
<p>If you type <code>git commit</code> without <code>-m</code>, Git opens a text editor for you to write the message, and on many systems that editor is <strong>Vim</strong>, which doesn't respond to the keys you expect. To get out: press <strong>Esc</strong>, then type <code>:wq</code> and press Enter to save the message and commit, or type <code>:q!</code> and press Enter to quit without saving (with an empty message, Git cancels the commit). To choose a friendlier editor once and for all, run <code>git config --global core.editor "code --wait"</code> for VS Code, or <code>git config --global core.editor nano</code> on macOS and Linux.</p>
<p>Some files shouldn't be tracked: temporary files, the <code>__pycache__</code> folder (Python creates it next to modules you import, to store a translated copy that loads faster next time; it is rebuilt automatically, so it never needs saving), virtual environments (explained below), and anything containing passwords. List them in a file called <code>.gitignore</code>:</p>
<pre data-label=".gitignore"><code>__pycache__/
.venv/
*.log
secrets.txt</code></pre>

<h3>GitHub and remotes</h3>
<p>Git works entirely on your computer. A <strong>remote</strong> is a copy of the repository on a server, such as GitHub, GitLab or your university's server, that you and others can share. <code>git clone URL</code> copies a remote repository to your computer; <code>git push</code> sends your new commits up; <code>git pull</code> brings down commits others have made. GitHub also serves as a portfolio: employers and graduate programs often look at students' public projects.</p>
<p>Never commit passwords or API keys. (An <em>API</em>, application programming interface, is a set of functions one program offers to others; online services offer theirs over the internet, and an <em>API key</em> is a secret code, like a password, that identifies your program to the service and is often tied to your account or credit card.) Even if you delete them in a later commit, they remain in the history, and public repositories are scanned by bots looking for leaked keys.</p>

<h3>Packages, pip and virtual environments</h3>
<p>Beyond the standard library, hundreds of thousands of third-party <strong>packages</strong> are published on the Python Package Index (PyPI). <strong>pip</strong> installs them: <code>python3 -m pip install requests</code>.</p>
<p>Different projects often need different versions of the same package. A <strong>virtual environment</strong> is a private folder of packages for one project, so installing something for one project can't break another:</p>
<pre data-label="Terminal"><code>python3 -m venv .venv            # create the environment (once per project)
source .venv/bin/activate        # activate it on macOS or Linux
.venv\\Scripts\\activate           # activate it on Windows
python -m pip install pytest     # installs into this project only
python -m pip freeze &gt; requirements.txt   # record exact versions
deactivate                       # leave the environment</code></pre>
<p class="note"><strong>Windows PowerShell:</strong> activation may fail with "running scripts is disabled on this system". PowerShell blocks script files by default, and <code>activate</code> is one. Run this once, in PowerShell, to allow scripts you create yourself (and signed ones you download): <code>Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser</code>, then try again. If you'd rather not change the setting, open a Command Prompt instead and run <code>.venv\\Scripts\\activate.bat</code>, or skip activation and call the environment's Python directly: <code>.venv\\Scripts\\python -m pytest</code>.</p>
<p>While an environment is active, your prompt usually shows <code>(.venv)</code>. Commit <code>requirements.txt</code> (but not the <code>.venv</code> folder), and anyone can recreate your setup with <code>python -m pip install -r requirements.txt</code>.</p>

<h3>Tools that catch mistakes for you</h3>
<ul>
  <li>A <strong>formatter</strong> such as Black or Ruff rewrites your code into a consistent style automatically, so you never argue about spacing.</li>
  <li>A <strong>linter</strong> such as Ruff points out likely bugs and style problems: unused variables, names used before they're assigned, a bare <code>except:</code>.</li>
  <li>Your editor's <strong>debugger</strong> lets you pause at a breakpoint, step line by line, and watch variables change, as described in the testing lesson.</li>
</ul>
<p>Set your editor to format on save and to show linter warnings. It's like having a careful reviewer looking over your shoulder.</p>

<h3>Using AI coding assistants well</h3>
<p>AI assistants, including this site's professor, can explain error messages, suggest test cases, review your code and draft new code. They are genuinely useful, and you'll use them throughout your career. But in an introductory course the goal is to build skills in your own head, and an assistant that writes your code for you also does your learning for you.</p>
<p>Ask for help in ways that keep you thinking. Compare:</p>
<ul>
  <li><em>"Write a function that checks whether a password is valid."</em> You get code, and you learn little.</li>
  <li><em>"Here's my password checker. It accepts 'abc12345' when it shouldn't. Don't fix it; give me a hint about where to look."</em> You learn to debug.</li>
  <li><em>"Explain what this traceback means in plain English."</em> You learn to read errors yourself next time.</li>
  <li><em>"What edge cases should I test for this function?"</em> You learn to think about testing.</li>
</ul>
<p>Three rules: attempt a problem yourself before asking; never submit code you can't explain line by line; and check what the assistant says, because it can produce confident, plausible code that is wrong, especially at edge cases. Follow your course's policy, and say when you used one.</p>
`,
    terms: [
      ["Version control", "A system that records changes to files over time so you can review and restore them."],
      ["Commit", "A saved snapshot of a project in Git, with a message."],
      ["Staging area", "Where you collect the changes that will go into the next commit."],
      ["Repository", "A project folder whose history Git tracks."],
      ["Remote", "A copy of a repository on a server, such as GitHub."],
      [".gitignore", "A file listing paths Git should not track."],
      ["Package", "Third-party code installed with pip from the Python Package Index."],
      ["Virtual environment", "An isolated set of Python packages for one project."],
      ["Linter", "A tool that flags likely bugs and style problems without running the code."]
    ],
    quiz: [
      { q: "Which command shows which files have changed since your last commit?", choices: ["git log", "git status", "git init", "git commit"], answer: 1, why: "<code>git status</code> lists modified, staged and untracked files." },
      { q: "What is the main reason to use a virtual environment?", choices: ["It makes Python faster", "It isolates each project's package versions", "It is required to run Python", "It backs up your code"], answer: 1, why: "Projects can need conflicting versions of the same package; a venv keeps them apart." },
      { q: "An AI assistant gives you working code for an assignment. What should you do before using it?", choices: ["Submit it", "Make sure you can explain every line and test it", "Rename the variables", "Nothing"], answer: 1, why: "You are responsible for code you submit. Understand it, test it, and follow your course policy." },
      { q: "You changed four files but want to commit only two. What do you do?", choices: ["Commit everything and undo later", "<code>git add</code> just those two files, then commit", "Delete the other two", "Use git push"], answer: 1, why: "The staging area exists for exactly this: you choose what goes into the next commit." },
      { q: "You accidentally committed a file containing a password, then deleted it in the next commit. Is it safe now?", choices: ["Yes, it's deleted", "No, it's still in the repository's history", "Only if you used git restore", "Only on Windows"], answer: 1, why: "Git keeps every commit. The password should be changed, and the history cleaned with special tools." }
    ],
    practice: [
      { q: `<p>Create a Git repository for your CS 101 work. Make at least three commits: one adding <code>hello.py</code>, one adding your <code>dates.py</code> module, and one improving something. Then run <code>git log --oneline</code>.</p>`, a: `<pre data-label="Terminal"><code>cd cs101
git init
git add hello.py
git commit -m "Add first program"
git add dates.py
git commit -m "Add leap year and days-in-month functions"
# edit dates.py ...
git add dates.py
git commit -m "Document preconditions in dates.py"
git log --oneline</code></pre><p>The log lists the three commits, newest first, each with a short ID. If Git asks for your name and email the first time, set them with <code>git config --global user.name "Your Name"</code> and <code>git config --global user.email you@example.com</code>.</p>` },
      { q: `<p>Explain what this <code>git status</code> output tells you, and what you'd type to commit only the change to <code>report.py</code>.</p><pre data-label="Terminal"><code>Changes not staged for commit:
        modified:   report.py
        modified:   notes.txt
Untracked files:
        draft.py</code></pre>`, a: `<p>Two tracked files have changed since the last commit, and neither change is staged yet. <code>draft.py</code> is a new file Git isn't tracking. To commit only <code>report.py</code>: <code>git add report.py</code> then <code>git commit -m "..."</code>. The other changes stay in your working folder, uncommitted.</p>` },
      { q: `<p>Rewrite these commit messages to be useful: "stuff", "fixed it", "asdf", "changes to file".</p>`, a: `<p>Good messages say what changed and why, for example: "Add input validation to tip calculator", "Fix off-by-one error in last_n", "Rename variables in grades.py for clarity", "Handle missing settings file on first run". Someone reading the log a month later, including you, should know what each commit did without opening it.</p>` },
      { q: `<p>Create a virtual environment for a new project, install <code>pytest</code> into it, save the requirements, and write a <code>.gitignore</code> that keeps the environment out of Git.</p>`, a: `<pre data-label="Terminal"><code>mkdir project
cd project
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\\Scripts\\activate
python -m pip install pytest
python -m pip freeze &gt; requirements.txt</code></pre><pre data-label=".gitignore"><code>.venv/
__pycache__/</code></pre>` },
      { q: `<p>You're stuck on a practice problem: your <code>compress</code> function returns <code>"a3b1c2"</code> for <code>"aaabccdddd"</code>. Write a prompt for an AI assistant that will help you learn, rather than just giving you the answer.</p>`, a: `<p>For example: "My run-length encoding function returns 'a3b1c2' for 'aaabccdddd' instead of 'a3b1c2d4'. Here's my code: … Without rewriting it, can you ask me a question or give a hint that helps me find why the last run is missing?" A good prompt shares the code, the input, the expected and actual output, and asks for a hint rather than a fix.</p>` }
    ],
    sources: ["missing", "cs50p"]
  }
]);
