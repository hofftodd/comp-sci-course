CSA.addCourse({
  id: "cs365",
  code: "CS 365",
  title: "Compilers",
  credits: 4,
  kind: "optional",
  term: "y3s",
  summary: "How a program's text becomes instructions a machine runs. Over the term you build one complete compiler, in Python, for Mini, a small imperative language with integers, booleans, variables, if, while and functions: a lexer driven by maximal munch, a recursive-descent parser with precedence climbing, scopes and a type checker, a code generator for a stack-machine bytecode and the virtual machine that runs it, an optimizer built on control-flow graphs and dataflow analysis, and a register allocator by graph colouring, with real RISC-V output from Clang to compare. Every graded program is checked by what it computes. A track elective.",
  prereqs: ["CS 320 Theory of Computation", "CS 230 Computer Architecture and Digital Logic", "CS 201 Data Structures"],
  outcomes: [
    "Describe the phases of a compiler and the data structure each one passes to the next",
    "Write a lexer that follows maximal munch and reports errors with line and column, and explain it as a DFA built from regular expressions",
    "Write a recursive-descent parser with precedence climbing that builds an abstract syntax tree, compute FIRST sets, and recognize when a grammar is not LL(1)",
    "Resolve names through nested scopes and type-check a program, reporting every error without cascades",
    "Compile expressions, control flow and function calls to stack-machine bytecode with backpatched jumps, and run it on a virtual machine whose frames mirror the hardware stack",
    "Optimize three-address code with constant folding, constant propagation and dead-code elimination, using liveness solved as a dataflow analysis to a fixed point",
    "Allocate registers by colouring an interference graph, decide what to spill, and translate to RISC-V under its calling convention"
  ],
  rubric: {
    criteriaFor: "programming assignments, the compiler project and exams",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Programming assignments", weight: 30, desc: "The lessons' auto-graded problems, plus a short written answer for each lesson tracing one test by hand: the tokens, the tree, the bytecode or the sets your code produced, and why." },
      { name: "Compiler project", weight: 25, desc: "Extend the Mini compiler you build in Lessons 1–4 with one substantial feature carried through every phase (arrays with bounds checks, for loops and break, a RISC-V back end that runs in a simulator, or a global constant-propagation pass), with tests on program output and a two-page report." },
      { name: "Midterm exam", weight: 15, desc: "Lexing, parsing and semantic analysis (Lessons 1–3), worked by hand: tokens, trees, FIRST sets, scopes and type errors." },
      { name: "Final exam", weight: 20, desc: "Cumulative, with emphasis on code generation, optimization and register allocation (Lessons 4–6)." }
    ],
    criteria: [
      { name: "Correctness", desc: "Does the compiler preserve the program's meaning?", levels: [
        "Every phase is correct, including the edge cases: empty input, errors at the last character, division by zero, nested scopes, short-circuit operators.",
        "Correct on ordinary programs, with a gap in an edge case.",
        "Produces wrong code or wrong answers for some ordinary programs.",
        "Doesn't run." ] },
      { name: "Design", desc: "Are the phases cleanly separated?", levels: [
        "Each phase has one job and a clear data structure between it and the next; adding a feature touches each phase in one obvious place.",
        "Mostly separated, with some phases reaching into others.",
        "Phases tangled together, so a change breaks unrelated parts.",
        "No discernible structure." ] },
      { name: "Verification", desc: "How do you know it works?", levels: [
        "Tests that run compiled programs and compare their output, tests for each error message, and a case worked by hand (tokens, tree, bytecode or dataflow sets).",
        "Good tests of the main behaviour, with gaps in errors or edge cases.",
        "Checked only on one or two example programs.",
        "No checking." ] },
      { name: "Explanation", desc: "Can you say why it works?", levels: [
        "Explains each algorithm and why it terminates and is safe, connects it to automata, grammars, the stack or graph colouring, and points out what would go wrong otherwise.",
        "Mostly clear, with some steps asserted rather than explained.",
        "Describes what the code does but not why.",
        "No explanation." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Collaboration:</b> discuss ideas and debug together; write your own code and reports, and list who you worked with.",
      "<b>AI assistants:</b> allowed for explanations and debugging. You must be able to explain every line of your project, and your report must say how an assistant was used.",
      "<b>Libraries:</b> assignments use only Python's standard library, and no parser generators, so that you write every phase yourself. The project may use a RISC-V simulator such as RARS to run generated code.",
      "<b>Late work:</b> four late days in total for the programming assignments; the project deadline is fixed."
    ]
  }
});

CSA.addUnits("cs365", [
  {
    id: "cp1",
    title: "Compiler structure and lexing",
    minutes: 90,
    summary: "What a compiler is and the phases it runs in; Mini, the language this course compiles; tokens; describing tokens with regular expressions and recognizing them with a DFA; maximal munch and the rule that keywords beat names; a hand-written lexer; and reporting errors by line and column.",
    notes: `
<p>A <strong>compiler</strong> is a program that translates a program written in one language (the <em>source</em> language) into an equivalent program in another (the <em>target</em> language), usually one a machine can run directly. CS 210 Lesson 5 read the x86-64 that GCC produces from C, and CS 230 Lesson 4 wrote RISC-V by hand. This course is about the program in between: how text such as <code>n * fact(n - 1)</code> becomes instructions.</p>
<p>Over six lessons we build one complete compiler, in Python, for a small language called <strong>Mini</strong>. Here is a Mini program:</p>
<pre data-label="Mini"><code>// greatest common divisor, by Euclid's algorithm
fun gcd(a: int, b: int): int {
    while b != 0 {
        var t: int = a % b;
        a = b;
        b = t;
    }
    return a;
}

fun main(): int {
    print(gcd(48, 18));    // prints 6
    return 0;
}</code></pre>
<p>Mini has two types, <code>int</code> and <code>bool</code>; variables declared with <code>var</code>, a type and a starting value; assignment; <code>if</code>/<code>else</code> and <code>while</code> with braces around every body; functions with typed parameters and a return type; <code>print</code>; and the operators <code>+ - * / %</code>, <code>&lt; &lt;= &gt; &gt;= == !=</code>, <code>&amp;&amp; || !</code> and unary <code>-</code>. Running a program calls <code>main</code>. It is a tiny C, small enough to compile completely in a term, and big enough to need every idea a real compiler uses.</p>

<h3>The phases of a compiler</h3>
<p>A compiler is a pipeline. Each <strong>phase</strong> takes one representation of the program and produces the next, so each can be written and tested alone:</p>
<figure class="fig"><svg viewBox="0 0 640 150" width="640" role="img" aria-label="The compiler pipeline: source text goes to the lexer, which produces tokens; the parser produces a syntax tree; semantic analysis checks it; the optimizer and code generator produce bytecode or machine code.">
<g class="box"><rect x="10" y="40" width="90" height="40"/><rect x="135" y="40" width="90" height="40"/><rect x="260" y="40" width="110" height="40"/><rect x="405" y="40" width="90" height="40"/><rect x="530" y="40" width="100" height="40"/></g>
<g class="text"><text x="55" y="65" text-anchor="middle">lexer</text><text x="180" y="65" text-anchor="middle">parser</text><text x="315" y="58" text-anchor="middle">semantic</text><text x="315" y="74" text-anchor="middle">analysis</text><text x="450" y="65" text-anchor="middle">optimizer</text><text x="580" y="58" text-anchor="middle">code</text><text x="580" y="74" text-anchor="middle">generator</text></g>
<g class="ln"><line x1="100" y1="60" x2="135" y2="60"/><line x1="225" y1="60" x2="260" y2="60"/><line x1="370" y1="60" x2="405" y2="60"/><line x1="495" y1="60" x2="530" y2="60"/><line x1="55" y1="20" x2="55" y2="40"/><line x1="580" y1="80" x2="580" y2="100"/></g>
<g class="text m"><text x="55" y="14" text-anchor="middle">source text</text><text x="117" y="100" text-anchor="middle">tokens</text><text x="242" y="100" text-anchor="middle">tree</text><text x="387" y="100" text-anchor="middle">checked</text><text x="387" y="114" text-anchor="middle">tree, IR</text><text x="512" y="100" text-anchor="middle">IR</text><text x="580" y="116" text-anchor="middle">bytecode or</text><text x="580" y="130" text-anchor="middle">machine code</text></g>
<g class="text m"><text x="180" y="145" text-anchor="middle">front end: Lessons 1–3</text><text x="450" y="145" text-anchor="middle">middle and back end: Lessons 4–6</text></g>
</svg><figcaption>The phases of the Mini compiler. The labels under the arrows are what passes between phases.</figcaption></figure>
<ol>
<li><strong>Lexing</strong> (this lesson) groups characters into <strong>tokens</strong>: <code>while</code>, <code>b</code>, <code>!=</code>, <code>0</code>, <code>{</code>.</li>
<li><strong>Parsing</strong> (Lesson 2) groups tokens into a tree that shows the program's structure: this <code>while</code> has this condition and this body.</li>
<li><strong>Semantic analysis</strong> (Lesson 3) checks what a grammar can't: every name is declared, and every operator gets operands of the right type.</li>
<li><strong>Code generation</strong> (Lesson 4) produces instructions for a target, here a <em>bytecode</em> for a small virtual machine (VM) that we also write.</li>
<li><strong>Optimization</strong> (Lesson 5) rewrites an <strong>intermediate representation</strong> (IR), a simple program form between the tree and the target, so that it computes the same results faster. In a full compiler, optimization comes before final code generation; we build the simpler code generator first.</li>
<li><strong>Register allocation and instruction selection</strong> (Lesson 6) map the IR onto a real processor's registers and instructions, here RISC-V.</li>
</ol>
<p>So Mini gets two back ends. Lesson 4's goes straight from the checked tree to bytecode for our VM, without optimizing. Lessons 5 and 6 build the second: tree to IR, optimized IR, then RISC-V. The optimized IR is never turned back into bytecode, so the programs our VM runs are unoptimized; the figure shows both routes as one pipeline.</p>
<p>The phases up to semantic analysis depend only on the source language and form the <strong>front end</strong>; the phases that depend only on the target form the <strong>back end</strong>. Between them sits an IR that knows neither. That split is how GCC and LLVM support many languages and many processors without writing every pair: a new language needs only a front end, and a new processor only a back end.</p>
<p>An <strong>interpreter</strong> runs a program instead of translating it. The line is blurry: CPython compiles Python to bytecode and then interprets the bytecode, which is exactly what our Mini system does. (A simpler kind of interpreter skips the bytecode and runs the syntax tree itself, visiting each node and doing what it says; CS 360, a course offered this term, builds several. Nothing in this course depends on it: everything Mini needs is built here.)</p>

<h3>Tokens</h3>
<p>To the lexer, a program is one long string. Its job is to cut the string into <strong>tokens</strong>, the "words" of the language, and throw away what doesn't matter to the meaning: spaces, newlines and comments. Each token has a <strong>kind</strong> (number, name, a particular keyword or operator) and its <strong>lexeme</strong>, the exact text it came from. Mini's tokens:</p>
<table>
<tr><th>Kind</th><th>Lexemes</th><th>Described by</th></tr>
<tr><td>num</td><td><code>0</code>, <code>42</code>, <code>007</code></td><td>one or more digits</td></tr>
<tr><td>name</td><td><code>gcd</code>, <code>x2</code>, <code>_tmp</code></td><td>a letter or <code>_</code>, then letters, digits or <code>_</code></td></tr>
<tr><td>keywords</td><td><code>fun var if else while return print true false int bool</code></td><td>exactly that text</td></tr>
<tr><td>operators and punctuation</td><td>two characters: <code>&lt;= &gt;= == != &amp;&amp; ||</code>; one character: <code>+ - * / % ! &lt; &gt; = ( ) { } , ; :</code></td><td>exactly that text</td></tr>
<tr><td>(skipped)</td><td>spaces, tabs, newlines; <code>//</code> to the end of the line</td><td></td></tr>
</table>
<p>For <code>if x&lt;=10 { y = y+1; }</code> the lexer produces 12 tokens: <code>if</code>, name <code>x</code>, <code>&lt;=</code>, num <code>10</code>, <code>{</code>, name <code>y</code>, <code>=</code>, name <code>y</code>, <code>+</code>, num <code>1</code>, <code>;</code>, <code>}</code>, followed by an end-of-input token, <code>eof</code>, so that the parser always has a next token to look at. Spacing made no difference: <code>x&lt;=10</code> and <code>x &lt;= 10</code> give the same tokens.</p>

<h3>Regular expressions and DFAs</h3>
<p>Every token class above is a regular language, so it can be written as a regular expression (CS 320 Lesson 3). In Python's <code>re</code> notation, a name is <code>[A-Za-z_][A-Za-z0-9_]*</code> and a number <code>[0-9]+</code>; a keyword or operator is just its own text.</p>
<pre><code>import re
NAME = re.compile(r"[A-Za-z_][A-Za-z0-9_]*")
NUM = re.compile(r"[0-9]+")
print(NAME.match("count2 = 0").group(), NUM.match("42;").group())   # count2 42</code></pre>
<p><code>match(s)</code> tries to match at the start of <code>s</code> and returns the matched text through <code>.group()</code> (or <code>None</code> if there is no match). A lexer could try every token's expression at each position, but there is a faster way, and it is the reason lexing is a solved problem. Take the union of all the token expressions; Thompson's construction turns it into an NFA, and the subset construction turns that into a DFA (CS 320 Lessons 2 and 3). Mark each accepting DFA state with the token kind it recognizes. The lexer then reads each character once, following one transition per character: linear time, with no backtracking over alternatives. Tools called <strong>lexer generators</strong> (lex, flex, re2c) do exactly this from a list of expressions.</p>
<p>Here is a hand-built DFA for five of Mini's operators. State 0 is the start; reading <code>&lt;</code> goes to state 1, which accepts <code>&lt;</code>; reading <code>=</code> from there goes to state 2, which accepts <code>&lt;=</code>. A missing transition means "no way to continue".</p>
<pre><code>DELTA = {(0, "&lt;"): 1, (1, "="): 2, (0, "="): 3, (3, "="): 4, (0, "&amp;"): 5, (5, "&amp;"): 6}
ACCEPT = {1: "&lt;", 2: "&lt;=", 3: "=", 4: "==", 6: "&amp;&amp;"}

def longest_token(text, i):
    state, j, last = 0, i, None
    while j &lt; len(text) and (state, text[j]) in DELTA:
        state = DELTA[(state, text[j])]
        j += 1
        if state in ACCEPT:
            last = (ACCEPT[state], j)    # the longest token seen so far, and where it ends
    return last

print(longest_token("&lt;=3", 0))   # ('&lt;=', 2)
print(longest_token("=&lt;", 0))    # ('=', 1)
print(longest_token("&amp;x", 0))    # None</code></pre>
<p>On <code>&amp;x</code> the DFA reaches state 5, which isn't accepting, and has no transition on <code>x</code>, so no token starts there: Mini has <code>&amp;&amp;</code> but no single <code>&amp;</code>. That is a lexical error.</p>

<h3>Maximal munch</h3>
<p>Token expressions overlap, so the lexer needs rules for choosing. Should <code>&lt;=</code> be one token or <code>&lt;</code> followed by <code>=</code>? Should <code>iffy</code> be the keyword <code>if</code> followed by the name <code>fy</code>? Two rules settle it, and almost every language uses them:</p>
<ul>
<li><strong>Maximal munch</strong>: at each position, take the <em>longest</em> prefix of the remaining input that is a token. So <code>&lt;=</code> is one token and <code>iffy</code> is one name.</li>
<li><strong>Priority</strong>: if two token classes match the same longest text, the one listed first wins. List keywords before names, so <code>if</code> is the keyword even though it also matches the name expression.</li>
</ul>
<p>That's why <code>longest_token</code> keeps going after reaching an accepting state and remembers the <em>last</em> accepting state it passed. If it gets stuck, it backs up to that point. Backing up can cross more than one character. Imagine a language with tokens <code>.</code> and <code>...</code> but not <code>..</code>:</p>
<pre><code>DOTS = {(0, "."): 1, (1, "."): 2, (2, "."): 3}
DOT_ACCEPT = {1: ".", 3: "..."}

def longest(text, i, delta, accept):
    state, j, last = 0, i, None
    while j &lt; len(text) and (state, text[j]) in delta:
        state = delta[(state, text[j])]
        j += 1
        if state in accept:
            last = (accept[state], j)
    return last

print(longest("...", 0, DOTS, DOT_ACCEPT), longest("..x", 0, DOTS, DOT_ACCEPT))   # ('...', 3) ('.', 1)</code></pre>
<p>On <code>..x</code> the DFA reads two dots, reaching non-accepting state 2, then gets stuck on <code>x</code>; it returns to the last accepting point, after one dot, and the next token starts at the second dot. Maximal munch is greedy and doesn't look further ahead. In C, <code>x+++y</code> is lexed as <code>x ++ + y</code>, and <code>x+++++y</code> as <code>x ++ ++ + y</code>, which is a compile error, even though <code>x ++ + ++ y</code> would have been legal. The lexer doesn't know what the parser wants.</p>

<h3>A hand-written lexer</h3>
<p>Many production compilers (GCC, Clang, Go, Rust) use hand-written lexers rather than generated ones: they are easy to read, fast, and give better error messages. A hand-written lexer is the same DFA written as code: look at the current character, and loop while the token can continue. For keywords, it is simpler to scan a whole name and then look it up in a set of keywords than to give the DFA separate states for <code>i</code>, <code>if</code>, <code>w</code>, <code>wh</code> and so on: maximal munch scans <code>iffy</code> in full, and the lookup applies the priority rule.</p>
<pre><code>KEYWORDS = {"fun", "var", "if", "else", "while", "return", "print", "true", "false", "int", "bool"}
TWO_CHAR = {"&lt;=", "&gt;=", "==", "!=", "&amp;&amp;", "||"}
ONE_CHAR = set("+-*/%!&lt;&gt;=(){},;:")
DIGITS = set("0123456789")
LETTERS = set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_")

def tokenize(src):
    tokens, i = [], 0
    while i &lt; len(src):
        c = src[i]
        if c in " \\t\\n":
            i += 1
        elif c in DIGITS:
            j = i
            while j &lt; len(src) and src[j] in DIGITS:
                j += 1
            tokens.append(("num", src[i:j]))
            i = j
        elif c in LETTERS:
            j = i
            while j &lt; len(src) and (src[j] in LETTERS or src[j] in DIGITS):
                j += 1
            word = src[i:j]
            tokens.append((word if word in KEYWORDS else "name", word))
            i = j
        elif src[i:i + 2] in TWO_CHAR:          # try two characters before one: maximal munch
            tokens.append((src[i:i + 2], src[i:i + 2]))
            i += 2
        elif c in ONE_CHAR:
            tokens.append((c, c))
            i += 1
        else:
            raise ValueError("unexpected character " + repr(c))
    tokens.append(("eof", ""))
    return tokens

toks = tokenize("if x&lt;=10 { y = y+1; }")
print(len(toks), toks[:4])   # 13 [('if', 'if'), ('name', 'x'), ('&lt;=', '&lt;='), ('num', '10')]</code></pre>
<p>Each token is a pair (kind, lexeme). For keywords and operators the kind is the text itself, which makes the parser read naturally ("is the next token <code>while</code>?"). The lexer keeps a number as its text, <code>"10"</code>; converting to an integer is the parser's job. The character sets are spelled out because Python's <code>str.isdigit</code> and <code>str.isalpha</code> also accept non-ASCII characters such as <code>²</code> and <code>é</code>, which Mini doesn't allow.</p>
<p>Comments are skipped like whitespace: on <code>//</code>, advance to the next newline. This lexer doesn't handle them yet; the first programming problem adds them.</p>

<h3>Errors and positions</h3>
<p>A compiler's error messages are part of its user interface, and every message must say <em>where</em>. The usual form is <code>line:column: message</code>, with both counted from 1, which editors can turn into a link to the spot. A lexer can keep the line and column as it goes (add 1 to the column per character; on a newline, add 1 to the line and reset the column to 1), or compute them from a character index when needed:</p>
<pre><code>def position(src, i):
    line = src.count("\\n", 0, i) + 1         # newlines before index i
    col = i - (src.rfind("\\n", 0, i) + 1) + 1  # rfind gives -1 when there is no earlier newline
    return line, col

src = "fun main(): int {\\n    print(1 &amp; 2);\\n}"
i = src.index("&amp;")
print(position(src, i))   # (2, 13)</code></pre>
<p>Most compilers also print the line with a caret under the column:</p>
<pre data-label="Output"><code>2:13: unexpected character '&amp;'
    print(1 &amp; 2);
            ^</code></pre>
<p>Tokens carry their position so that later phases can report errors too: the type checker in Lesson 3 needs to say where <code>1 + true</code> is. A lexer can also <strong>recover</strong> from an error by skipping the bad character and continuing, so that one run reports every bad character instead of only the first. Lexical errors are rare in practice: a stray character, an unterminated string or comment, a number too large for its type. Most errors are found by the parser.</p>
<p class="note">Why it matters: lexing is the one phase where CS 320's theorems turn directly into code. Every token class is a regular expression, the union of regular languages is regular, and so one DFA reads the whole program in a single left-to-right pass. The next phase needs more power, because programs nest, and that is CS 320's context-free grammars.</p>
`,
    terms: [
      ["Compiler", "A program that translates a program in a source language into an equivalent program in a target language."],
      ["Phase", "One stage of a compiler, transforming one representation of the program into the next."],
      ["Front end", "The phases that depend on the source language: lexing, parsing and semantic analysis."],
      ["Back end", "The phases that depend on the target machine: instruction selection, register allocation and output."],
      ["Intermediate representation (IR)", "A program form between the syntax tree and the target code, independent of both, on which optimizations work."],
      ["Interpreter", "A program that runs another program directly rather than translating it."],
      ["Token", "A unit of the program text, such as a name, number, keyword or operator, with a kind and a lexeme."],
      ["Lexeme", "The exact characters a token came from."],
      ["Lexer", "The first phase: splits the source text into tokens and discards whitespace and comments."],
      ["Lexer generator", "A tool (lex, flex) that builds a DFA-based lexer from a list of regular expressions."],
      ["Maximal munch", "The rule that the lexer always takes the longest prefix of the remaining input that forms a token."],
      ["Priority rule", "When two token classes match the same longest text, the one listed first wins; it makes keywords beat names."],
      ["Error recovery", "Continuing after an error, so that one run reports many errors."]
    ],
    quiz: [
      { q: "Which phase reports that the character & on its own is not part of Mini?", choices: ["The lexer", "The parser", "The type checker", "The code generator"], answer: 0, why: "No token begins with a single &, so the lexer can't form any token there." },
      { q: "By maximal munch with keywords listed before names, how is \"whilex\" lexed?", choices: ["The keyword while, then the name x", "One name, whilex", "An error", "Six one-letter names"], answer: 1, why: "The longest token at the start is the name whilex (6 characters); the keyword while matches only 5." },
      { q: "And how is \"while\" lexed?", choices: ["As a name, because names are more general", "As the keyword while, because the keyword rule is listed first and both match 5 characters", "As an error", "As w followed by hile"], answer: 1, why: "Both classes match the same longest text, so the priority rule decides." },
      { q: "A lexer's DFA has read \"..\" in a language whose tokens include \".\" and \"...\" but not \"..\", and the next character is \"x\". What does maximal munch produce first?", choices: ["The token .. ", "The token . (then lexing resumes at the second dot)", "An error, because .. isn't a token", "The token ..."], answer: 1, why: "It backs up to the last accepting state it passed, after one dot." },
      { q: "Why can one DFA recognize all of a language's tokens?", choices: ["Because tokens are short", "Because each token class is regular and a union of regular languages is regular", "Because DFAs can count nested parentheses", "Because Python's re module is a DFA"], answer: 1, why: "Closure under union (CS 320 Lesson 1) lets one automaton recognize every class, with each accepting state labelled by its kind." },
      { q: "What are the line and column of the character x in the string \"ab\\n  x\" (a newline after ab, then two spaces)?", choices: ["(1, 5)", "(2, 3)", "(2, 2)", "(1, 3)"], answer: 1, why: "It is on line 2, after two spaces, so in column 3." }
    ],
    practice: [
      {
        q: `<p>List the tokens the lexer produces for <code>var x2: bool = !(a&lt;=b)||c;</code>, as (kind, lexeme) pairs.</p>`,
        a: `<p><code>var</code>, (name, <code>x2</code>), <code>:</code>, <code>bool</code>, <code>=</code>, <code>!</code>, <code>(</code>, (name, <code>a</code>), <code>&lt;=</code>, (name, <code>b</code>), <code>)</code>, <code>||</code>, (name, <code>c</code>), <code>;</code>, then <code>eof</code>: 15 tokens. <code>x2</code> is one name (a letter, then a digit), and <code>&lt;=</code> and <code>||</code> are single tokens by maximal munch.</p>
<pre><code>print([t[1] for t in tokenize("var x2: bool = !(a&lt;=b)||c;")])   # ['var', 'x2', ':', 'bool', '=', '!', '(', 'a', '&lt;=', 'b', ')', '||', 'c', ';', '']</code></pre>`
      },
      {
        q: `<p>Draw (as a transition table) a DFA for the Mini tokens <code>!</code>, <code>!=</code>, <code>&gt;</code> and <code>&gt;=</code>, with each accepting state labelled by its token. Then say what <code>longest_token</code> returns on <code>!==</code>, and what tokens the whole string becomes.</p>`,
        a: `<p>States: 0 start; 0 –<code>!</code>→ 1 (accepts <code>!</code>); 1 –<code>=</code>→ 2 (accepts <code>!=</code>); 0 –<code>&gt;</code>→ 3 (accepts <code>&gt;</code>); 3 –<code>=</code>→ 4 (accepts <code>&gt;=</code>). On <code>!==</code> the DFA reads <code>!=</code>, reaching state 2, and has no transition on the next <code>=</code>, so the first token is <code>!=</code> (ending at index 2). Lexing resumes at the last <code>=</code>; with the full Mini lexer that is the token <code>=</code>, so the string becomes <code>!=</code>, <code>=</code>.</p>
<pre><code>D2 = {(0, "!"): 1, (1, "="): 2, (0, "&gt;"): 3, (3, "="): 4}
A2 = {1: "!", 2: "!=", 3: "&gt;", 4: "&gt;="}
print(longest("!==", 0, D2, A2))   # ('!=', 2)</code></pre>`
      },
      {
        q: `<p>Suppose Mini added the operator <code>=&gt;</code> (for a new feature). With maximal munch, how would <code>x=&gt;y</code> and <code>x= &gt;y</code> be lexed? Could adding an operator change the meaning of programs that were already legal?</p>`,
        hint: `<p>Was <code>x=&gt;y</code> legal Mini before the change? What tokens did it have then?</p>`,
        a: `<p><code>x=&gt;y</code> becomes <code>x</code>, <code>=&gt;</code>, <code>y</code>; <code>x= &gt;y</code> becomes <code>x</code>, <code>=</code>, <code>&gt;</code>, <code>y</code>, because the space ends the token. Before the change, <code>x=&gt;y</code> lexed as <code>x = &gt; y</code>, which the parser rejects (an assignment needs an expression after <code>=</code>, and no expression starts with <code>&gt;</code>), so no legal program changes. In general, though, a new longer token can split old programs differently: C++11 had to add a special rule so that <code>&gt;&gt;</code> closing two template argument lists (as in <code>vector&lt;vector&lt;int&gt;&gt;</code>) is not lexed as the shift operator. Language designers check new tokens against existing code for exactly this reason.</p>`
      },
      {
        q: `<p>A lexer with error recovery reports a bad character, skips it and continues. On <code>x = 3 # 4 $ 5;</code>, what errors does it report, and what tokens does it produce? Why is this better than stopping at the first error, and what is the risk?</p>`,
        a: `<p>It reports <code>#</code> at column 7 and <code>$</code> at column 11, and produces <code>x</code>, <code>=</code>, <code>3</code>, <code>4</code>, <code>5</code>, <code>;</code>, <code>eof</code>. Reporting both at once saves the programmer a compile-fix-compile cycle per error. The risk is that the tokens after an error are not what the programmer meant (here <code>3 4 5</code>, which the parser will also reject), so later messages may be consequences of the first rather than separate mistakes. Compilers usually report the first error in a region and suppress others until they are confident they have resynchronized.</p>`
      }
    ],
    sources: ["dragonbook", "crafting", "sipser", "thompson68"]
  },
  {
    id: "cp2",
    title: "Parsing",
    minutes: 90,
    summary: "From tokens to a tree: abstract syntax trees and Mini's grammar; a regex-driven lexer with positions; recursive descent for statements; precedence climbing (Pratt parsing) for expressions, with associativity; FIRST sets, nullable symbols and the LL(1) condition; and syntax errors that say where and what was expected.",
    notes: `
<p>The lexer turned the program into a flat list of tokens. The parser finds its structure: which tokens form an expression, which statements form a loop body, where each function begins and ends. CS 320 Lesson 5 introduced the tools: context-free grammars, parse trees, ambiguity and recursive descent, with a calculator that evaluated as it parsed. A compiler doesn't evaluate while parsing; it builds a tree for the later phases to walk.</p>

<h3>Abstract syntax trees</h3>
<p>A parse tree records every grammar rule used, including the parentheses and semicolons. An <strong>abstract syntax tree</strong> (AST) keeps only what matters for meaning: <code>(a + b) * c</code> becomes a multiplication whose left operand is an addition, and the parentheses disappear because the tree's shape already says what they said. Our ASTs are Python tuples whose first element names the kind of node:</p>
<table>
<tr><th>Node</th><th>Meaning</th></tr>
<tr><td><code>("num", 42)</code>, <code>("bool", True)</code></td><td>literals</td></tr>
<tr><td><code>("var", "x")</code></td><td>a variable's value</td></tr>
<tr><td><code>("unary", "-", e)</code>, <code>("bin", "+", l, r)</code></td><td>operators</td></tr>
<tr><td><code>("call", "f", [e1, e2])</code></td><td>a function call</td></tr>
<tr><td><code>("vardecl", "x", "int", e)</code>, <code>("assign", "x", e)</code></td><td>declaration and assignment</td></tr>
<tr><td><code>("if", cond, block, block_or_None)</code>, <code>("while", cond, block)</code></td><td>control flow</td></tr>
<tr><td><code>("return", e)</code>, <code>("print", e)</code>, <code>("expr", e)</code>, <code>("block", [stmts])</code></td><td>other statements</td></tr>
<tr><td><code>("fun", name, [(param, type)], return_type, block)</code>, <code>("program", [funs])</code></td><td>functions and the whole program</td></tr>
</table>
<p>Tuples keep the examples short and easy to print and compare. A production compiler uses a class per node kind with fields (a dataclass, as in CS 102 Lesson 2) and stores each node's source position in it for error messages.</p>

<h3>Mini's grammar</h3>
<p>The grammar is written in EBNF (extended Backus–Naur form): <code>|</code> separates alternatives, <code>( ... )*</code> means "zero or more times", <code>?</code> means "optional", quoted symbols are tokens, and NAME and NUM are the token kinds from Lesson 1.</p>
<pre data-label="Grammar"><code>program  := function* EOF
function := 'fun' NAME '(' (param (',' param)*)? ')' ':' type block
param    := NAME ':' type
type     := 'int' | 'bool'
block    := '{' stmt* '}'
stmt     := 'var' NAME ':' type '=' expr ';'
          | 'if' expr block ('else' (block | stmt_if))?
          | 'while' expr block
          | 'return' expr ';'
          | 'print' '(' expr ')' ';'
          | block
          | NAME '=' expr ';'
          | expr ';'
expr     := unary (BINOP unary)*      -- grouped by the precedence table below
unary    := ('-' | '!') unary | primary
primary  := NUM | 'true' | 'false' | NAME | NAME '(' (expr (',' expr)*)? ')' | '(' expr ')'</code></pre>
<p>(<code>stmt_if</code> means the <code>if</code> alternative of <code>stmt</code>, so <code>else if</code> works.) Because every <code>if</code> and <code>while</code> body is a braced block, Mini has no dangling-else problem (CS 320 Lesson 5): in <code>if a { if b { x = 1; } else { x = 2; } }</code> the braces show which <code>if</code> owns the <code>else</code>. Go and Rust made the same choice.</p>

<h3>Tokens with positions</h3>
<p>Here is a second way to write Lesson 1's lexer, with one regular expression whose alternatives are <strong>named groups</strong>: <code>(?P&lt;num&gt;...)</code> names a group, and after a match <code>m.lastgroup</code> says which group matched. Each token now carries its line and column, as (kind, lexeme, line, column).</p>
<pre><code>import re

class CompileError(Exception):
    pass

KEYWORDS = {"fun", "var", "if", "else", "while", "return", "print", "true", "false", "int", "bool"}
TOKEN = re.compile(r"""
    (?P&lt;skip&gt;[ \\t]+|//[^\\n]*)
  | (?P&lt;newline&gt;\\n)
  | (?P&lt;num&gt;[0-9]+)
  | (?P&lt;name&gt;[A-Za-z_][A-Za-z0-9_]*)
  | (?P&lt;op&gt;&lt;=|&gt;=|==|!=|&amp;&amp;|\\|\\||[-+*/%!&lt;&gt;=(){},;:])
""", re.VERBOSE)

def tokenize(src):
    tokens, i, line, line_start = [], 0, 1, 0
    while i &lt; len(src):
        m = TOKEN.match(src, i)
        if m is None:
            raise CompileError(f"{line}:{i - line_start + 1}: unexpected character {src[i]!r}")
        kind, text, col = m.lastgroup, m.group(), i - line_start + 1
        if kind == "newline":
            line, line_start = line + 1, m.end()
        elif kind != "skip":
            if kind == "op" or (kind == "name" and text in KEYWORDS):
                kind = text
            tokens.append((kind, text, line, col))
        i = m.end()
    tokens.append(("eof", "", line, i - line_start + 1))
    return tokens

print(tokenize("while b != 0 {")[:3])   # [('while', 'while', 1, 1), ('name', 'b', 1, 7), ('!=', '!=', 1, 9)]</code></pre>
<p><code>re.VERBOSE</code> lets the pattern span lines with spaces that don't count (except inside <code>[...]</code>), and <code>match(src, i)</code> matches starting at index <code>i</code>. One trap: a regular-expression engine like Python's tries alternatives <em>in order</em> and takes the first that matches, not the longest (CS 320 Lesson 3 explained that it backtracks rather than building a DFA). So <code>&lt;=</code> must come before the single-character class, or <code>&lt;=</code> would lex as <code>&lt;</code> then <code>=</code>. Names are safe because <code>[A-Za-z_][A-Za-z0-9_]*</code> is greedy and takes the whole word before the keyword lookup.</p>

<h3>Precedence climbing</h3>
<p>Mini has six levels of binary operators. All are left associative.</p>
<table>
<tr><th>Level</th><th>Operators</th></tr>
<tr><td>1 (loosest)</td><td><code>||</code></td></tr>
<tr><td>2</td><td><code>&amp;&amp;</code></td></tr>
<tr><td>3</td><td><code>== !=</code></td></tr>
<tr><td>4</td><td><code>&lt; &lt;= &gt; &gt;=</code></td></tr>
<tr><td>5</td><td><code>+ -</code></td></tr>
<tr><td>6 (tightest)</td><td><code>* / %</code></td></tr>
</table>
<p>Unary <code>-</code> and <code>!</code> bind tighter than all of them. CS 320 Lesson 5 handled two levels with one grammar variable and one function per level (expr, term, factor). Six levels would need six nearly identical functions. <strong>Precedence climbing</strong> replaces them with one function and a table. <code>expr(min_prec)</code> parses the longest expression whose operators all have precedence at least <code>min_prec</code>:</p>
<ol>
<li>Parse an operand (a unary expression) as <code>left</code>.</li>
<li>While the next token is a binary operator with precedence <em>p</em> ≥ <code>min_prec</code>: consume it, parse the right operand with <code>expr(p + 1)</code>, and make <code>left</code> the new node <code>("bin", op, left, right)</code>.</li>
</ol>
<p>The right operand may contain only operators that bind <em>tighter</em> than <em>p</em>, so they are grouped below this one; an operator at the same level as <em>p</em> stops it and is picked up by the loop, which puts the existing <code>left</code> underneath. That gives left associativity. For a right-associative operator such as exponentiation, parse the right operand with <code>expr(p)</code> instead, so that an equal operator joins the right side.</p>
<pre><code>PREC = {"||": 1, "&amp;&amp;": 2, "==": 3, "!=": 3, "&lt;": 4, "&lt;=": 4, "&gt;": 4, "&gt;=": 4,
        "+": 5, "-": 5, "*": 6, "/": 6, "%": 6}

class Parser:
    def __init__(self, src):
        self.tokens, self.pos = tokenize(src), 0

    def peek(self, k=0):                    # the token k places ahead, without consuming it
        return self.tokens[min(self.pos + k, len(self.tokens) - 1)]

    def advance(self):
        tok = self.peek()
        self.pos += 1
        return tok

    def expect(self, kind):
        tok = self.peek()
        if tok[0] != kind:
            found = "end of input" if tok[0] == "eof" else repr(tok[1])
            raise CompileError(f"{tok[2]}:{tok[3]}: expected {kind!r} but found {found}")
        return self.advance()

    def expr(self, min_prec=1):             # precedence climbing
        left = self.unary()
        while self.peek()[0] in PREC and PREC[self.peek()[0]] &gt;= min_prec:
            op = self.advance()[0]
            right = self.expr(PREC[op] + 1)
            left = ("bin", op, left, right)
        return left

    def unary(self):                        # unary := ('-' | '!') unary | primary
        if self.peek()[0] in ("-", "!"):
            op = self.advance()[0]
            return ("unary", op, self.unary())
        return self.primary()

    def primary(self):
        tok = self.advance()
        if tok[0] == "num":
            return ("num", int(tok[1]))
        if tok[0] in ("true", "false"):
            return ("bool", tok[0] == "true")
        if tok[0] == "name" and self.peek()[0] == "(":
            self.advance()
            args = []
            if self.peek()[0] != ")":
                args.append(self.expr())
                while self.peek()[0] == ",":
                    self.advance()
                    args.append(self.expr())
            self.expect(")")
            return ("call", tok[1], args)
        if tok[0] == "name":
            return ("var", tok[1])
        if tok[0] == "(":
            e = self.expr()
            self.expect(")")
            return e
        found = "end of input" if tok[0] == "eof" else repr(tok[1])
        raise CompileError(f"{tok[2]}:{tok[3]}: expected an expression but found {found}")

def parse_expr(src):
    p = Parser(src)
    e = p.expr()
    p.expect("eof")                         # the whole input must be one expression
    return e

print(parse_expr("a - b * c + d"))   # ('bin', '+', ('bin', '-', ('var', 'a'), ('bin', '*', ('var', 'b'), ('var', 'c'))), ('var', 'd'))</code></pre>
<p>The trace for <code>a - b * c + d</code>, with each call's <code>min_prec</code>:</p>
<ol>
<li><code>expr(1)</code> reads <code>a</code>. Next is <code>-</code> (5 ≥ 1): consume it and call <code>expr(6)</code> for the right side.</li>
<li><code>expr(6)</code> reads <code>b</code>. Next is <code>*</code> (6 ≥ 6): consume it and call <code>expr(7)</code>, which reads <code>c</code> and stops at <code>+</code> (5 &lt; 7). Now <code>left</code> = <code>b * c</code>. Next is <code>+</code> (5 &lt; 6): return <code>b * c</code>.</li>
<li>Back in <code>expr(1)</code>: <code>left</code> = <code>a - (b * c)</code>. Next is <code>+</code> (5 ≥ 1): consume it; <code>expr(6)</code> reads <code>d</code> and stops at the end. <code>left</code> = <code>(a - (b * c)) + d</code>.</li>
</ol>
<figure class="fig"><svg viewBox="0 0 340 200" width="340" role="img" aria-label="The tree for a - b * c + d: the root is plus, with left child minus and right child d; minus has children a and times; times has children b and c.">
<g class="ln"><line x1="200" y1="32" x2="128" y2="68"/><line x1="200" y1="32" x2="272" y2="68"/><line x1="120" y1="82" x2="78" y2="118"/><line x1="120" y1="82" x2="164" y2="118"/><line x1="170" y1="132" x2="136" y2="168"/><line x1="170" y1="132" x2="206" y2="168"/></g>
<g class="box"><circle cx="200" cy="25" r="14"/><circle cx="120" cy="75" r="14"/><circle cx="170" cy="125" r="14"/></g>
<g class="text"><text x="200" y="30" text-anchor="middle">+</text><text x="120" y="80" text-anchor="middle">−</text><text x="170" y="130" text-anchor="middle">*</text><text x="280" y="80" text-anchor="middle">d</text><text x="70" y="130" text-anchor="middle">a</text><text x="130" y="180" text-anchor="middle">b</text><text x="212" y="180" text-anchor="middle">c</text></g>
</svg><figcaption>The AST for <code>a - b * c + d</code>. Tighter operators sit lower in the tree, and of two operators at the same level, the left one sits lower.</figcaption></figure>
<p>Vaughan Pratt published a general form of this idea in 1973. In a <strong>Pratt parser</strong>, each kind of token says how it <em>starts</em> an expression (a number, a name, a prefix operator, an opening parenthesis) and how it <em>continues</em> one already parsed on its left (a binary operator; also <code>(</code> after a name, for a call), together with its binding power. The loop is the same as above. Pratt parsers are popular in hand-written compilers because adding an operator means adding one table entry; the bytecode compiler in Nystrom's <em>Crafting Interpreters</em> is built around one.</p>
<p>Because comparisons are left associative too, <code>a &lt; b &lt; c</code> parses as <code>(a &lt; b) &lt; c</code>, which compares a boolean with an integer. The parser accepts it; Lesson 3's type checker rejects it. Python instead treats <code>a &lt; b &lt; c</code> as <code>a &lt; b and b &lt; c</code>, a special case in its grammar.</p>

<h3>Recursive descent for statements</h3>
<p>For statements, recursive descent applies directly: one method per grammar variable, each choosing its alternative by looking at the next token. A subclass adds them to the expression parser:</p>
<pre><code>class MiniParser(Parser):
    def type_(self):
        tok = self.advance()
        if tok[0] not in ("int", "bool"):
            raise CompileError(f"{tok[2]}:{tok[3]}: expected a type but found {tok[1]!r}")
        return tok[0]

    def block(self):                        # block := '{' stmt* '}'
        self.expect("{")
        stmts = []
        while self.peek()[0] not in ("}", "eof"):
            stmts.append(self.stmt())
        self.expect("}")
        return ("block", stmts)

    def stmt(self):
        kind = self.peek()[0]
        if kind == "var":
            self.advance()
            name = self.expect("name")[1]
            self.expect(":")
            t = self.type_()
            self.expect("=")
            e = self.expr()
            self.expect(";")
            return ("vardecl", name, t, e)
        if kind == "if":
            self.advance()
            cond = self.expr()
            then = self.block()
            other = None
            if self.peek()[0] == "else":
                self.advance()
                other = ("block", [self.stmt()]) if self.peek()[0] == "if" else self.block()
            return ("if", cond, then, other)
        if kind == "while":
            self.advance()
            cond = self.expr()
            return ("while", cond, self.block())
        if kind == "return":
            self.advance()
            e = self.expr()
            self.expect(";")
            return ("return", e)
        if kind == "print":
            self.advance()
            self.expect("(")
            e = self.expr()
            self.expect(")")
            self.expect(";")
            return ("print", e)
        if kind == "{":
            return self.block()
        if kind == "name" and self.peek(1)[0] == "=":   # two tokens of lookahead
            name = self.advance()[1]
            self.advance()
            e = self.expr()
            self.expect(";")
            return ("assign", name, e)
        e = self.expr()                     # an expression statement, such as a call
        self.expect(";")
        return ("expr", e)

    def function(self):
        self.expect("fun")
        name = self.expect("name")[1]
        self.expect("(")
        params = []
        while self.peek()[0] != ")":
            if params:
                self.expect(",")
            p = self.expect("name")[1]
            self.expect(":")
            params.append((p, self.type_()))
        self.expect(")")
        self.expect(":")
        return ("fun", name, params, self.type_(), self.block())

    def program(self):
        funs = []
        while self.peek()[0] != "eof":
            funs.append(self.function())
        return ("program", funs)

def parse(src):
    return MiniParser(src).program()

tree = parse("fun f(n: int): int { if n &lt; 2 { return n; } return f(n - 1) + f(n - 2); }")
print(tree[1][0][4][1][0])   # ('if', ('bin', '&lt;', ('var', 'n'), ('num', 2)), ('block', [('return', ('var', 'n'))]), None)</code></pre>
<p>(<code>tree[1][0]</code> is the first function, <code>[4]</code> its body block, <code>[1][0]</code> the block's first statement.) The call stack mirrors the tree: <code>program</code> calls <code>function</code>, which calls <code>block</code>, which calls <code>stmt</code> for the <code>if</code>, which calls <code>expr</code> for the condition and <code>block</code> again for the body.</p>

<h3>FIRST sets and LL(1)</h3>
<p>Each <code>if</code> in <code>stmt</code> asks one question: can the next token begin this alternative? The set of tokens that can begin strings derived from a grammar symbol or sequence α is <strong>FIRST</strong>(α). For Mini's statements:</p>
<table>
<tr><th>Alternative</th><th>FIRST</th></tr>
<tr><td><code>'var' ...</code>, <code>'if' ...</code>, <code>'while' ...</code>, <code>'return' ...</code>, <code>'print' ...</code></td><td>{var}, {if}, {while}, {return}, {print}</td></tr>
<tr><td><code>block</code></td><td>{<code>'{'</code>}: the set whose one member is the token <code>{</code></td></tr>
<tr><td><code>NAME '=' expr ';'</code></td><td>{NAME}</td></tr>
<tr><td><code>expr ';'</code></td><td>FIRST(expr) = {NUM, NAME, true, false, <code>(</code>, <code>-</code>, <code>!</code>}</td></tr>
</table>
<p>A grammar is <strong>LL(1)</strong> (read Left to right, build a Leftmost derivation, with 1 token of lookahead) when one token is always enough to choose: for every variable, the FIRST sets of its alternatives are pairwise disjoint. (If an alternative can derive the empty string ε, the tokens that can come <em>after</em> the variable, its FOLLOW set, must not begin another alternative either.) Mini's statements aren't LL(1): NAME is in the FIRST set of both the assignment and the expression statement. <code>x = 1;</code> and <code>x + 1;</code> both start with a name, and only the second token tells them apart. Our parser looks two tokens ahead (<code>peek(1)</code>), which makes this one choice LL(2). Another common fix, used by C compilers, is to parse an expression first and, if <code>=</code> follows, check that the expression was a plain variable.</p>
<p>FIRST sets are computed by repeating simple rules until nothing changes. A variable is <strong>nullable</strong> if it can derive ε. For a rule <em>A</em> → <em>X</em><sub>1</sub><em>X</em><sub>2</sub>…<em>X</em><sub><em>n</em></sub>: add FIRST(<em>X</em><sub>1</sub>) to FIRST(<em>A</em>) (FIRST of a token is just that token); if <em>X</em><sub>1</sub> is nullable, add FIRST(<em>X</em><sub>2</sub>) too, and so on; if every <em>X<sub>i</sub></em> is nullable, <em>A</em> is nullable. Sets only grow and there are finitely many tokens, so the repetition stops. Take CS 320's expression grammar with its left recursion removed (<em>E</em>′ is a separate variable):</p>
<p class="math"><em>E</em> → <em>T E</em>′    <em>E</em>′ → + <em>T E</em>′ | ε    <em>T</em> → <em>F T</em>′    <em>T</em>′ → * <em>F T</em>′ | ε    <em>F</em> → ( <em>E</em> ) | num</p>
<p>First pass, in the order <em>F</em>, <em>T</em>′, <em>T</em>, <em>E</em>′, <em>E</em>: FIRST(<em>F</em>) = {(, num}; FIRST(<em>T</em>′) = {*} and <em>T</em>′ is nullable; FIRST(<em>T</em>) = FIRST(<em>F</em>) = {(, num}, and <em>T</em> isn't nullable because <em>F</em> isn't; FIRST(<em>E</em>′) = {+}, nullable; FIRST(<em>E</em>) = FIRST(<em>T</em>) = {(, num}. A second pass changes nothing, so these are the answers. Check LL(1) for <em>E</em>′: its alternatives begin with {+} and ε. What can follow <em>E</em>′? FOLLOW sets come from rules repeated in the same way. Put eof, the end of input, in FOLLOW of the start variable. Then for every rule <em>A</em> → α <em>B</em> β with <em>B</em> a variable (α and β are any sequences of symbols, possibly empty): add FIRST(β) to FOLLOW(<em>B</em>), and if β is nullable or empty, add FOLLOW(<em>A</em>) too, since whatever follows <em>A</em> can then follow <em>B</em>. Here <em>E</em> is the start, and <em>F</em> → ( <em>E</em> ) puts ) after it, so FOLLOW(<em>E</em>) = {), eof}. <em>E</em>′ appears only at the ends of <em>E</em> → <em>T E</em>′ and <em>E</em>′ → + <em>T E</em>′, so FOLLOW(<em>E</em>′) = FOLLOW(<em>E</em>) = {), eof}, which doesn't contain +. <em>T</em>′ and <em>F</em> check the same way, so the grammar is LL(1). This is what the loops in recursive descent rely on: "keep going while the next token is <code>+</code>".</p>
<p>Parser generators such as yacc and Bison instead build <strong>LR</strong> parsers, which read tokens onto a stack and decide which rule to apply only after seeing the whole right-hand side. LR handles more grammars, including left recursion directly, at the cost of tables too large to write by hand.</p>

<h3>Syntax errors</h3>
<p><code>expect</code> produces messages of the form "where: expected what, but found what":</p>
<pre><code>for bad in ["fun main(): int { return 1 + ; }", "fun main(): int {\\n  var x = 1;\\n}", "fun main(): int { print(1) }"]:
    try:
        parse(bad)
    except CompileError as e:
        print(e)</code></pre>
<pre data-label="Output"><code>1:30: expected an expression but found ';'
2:9: expected ':' but found '='
1:28: expected ';' but found '}'</code></pre>
<p>The third error is reported at the <code>}</code>, one token after the real mistake: the parser only knows a semicolon is missing when it sees something else. Many compilers point at the end of the previous token instead ("expected ';' after expression"), which is usually where the fix goes.</p>
<p>Stopping at the first syntax error is acceptable for Mini. Production parsers use <strong>panic-mode recovery</strong>: on an error, record the message, skip tokens until a <strong>synchronizing token</strong> where a new statement probably starts (after <code>;</code>, or at <code>}</code>, <code>var</code>, <code>if</code>, <code>while</code>), and resume parsing statements there. One mistake then produces one message instead of a cascade, and errors in later functions are still found.</p>
<p class="note">Why it matters: the tree built here is the only thing later phases see. Every phase from now on is a recursive function over these tuples, with one case per node kind.</p>
`,
    terms: [
      ["Abstract syntax tree (AST)", "A tree of the program's meaningful structure, without punctuation or grammar-only steps; the parser's output."],
      ["EBNF", "Extended Backus–Naur form: grammar notation with | for alternatives, ( )* for repetition and ? for optional parts."],
      ["Recursive descent", "A parser with one function per grammar variable, choosing alternatives by the next token."],
      ["Precedence climbing", "Parsing binary operators with one function and a precedence table: parse the right operand with the minimum precedence raised above the operator's."],
      ["Pratt parser", "A generalization of precedence climbing in which each token kind defines how it starts and how it continues an expression, with a binding power."],
      ["Left associative", "a − b − c groups as (a − b) − c; achieved by parsing the right operand at one level higher."],
      ["Right associative", "a ^ b ^ c groups as a ^ (b ^ c); achieved by parsing the right operand at the same level."],
      ["FIRST set", "The set of tokens that can begin a string derived from a grammar symbol or sequence."],
      ["Nullable", "A grammar variable that can derive the empty string."],
      ["FOLLOW set", "The set of tokens that can appear immediately after a variable in some derivation."],
      ["LL(1) grammar", "A grammar in which one token of lookahead always determines which alternative to use."],
      ["Lookahead", "The tokens a parser examines, but hasn't yet consumed, to decide what to do."],
      ["Panic-mode recovery", "After a syntax error, skipping tokens to a synchronizing token such as ; or } and resuming there."]
    ],
    quiz: [
      { q: "With Mini's precedence table, how does a || b && c parse?", choices: ["(a || b) && c", "a || (b && c)", "It is ambiguous", "A syntax error"], answer: 1, why: "&& (level 2) binds tighter than || (level 1), so it is grouped lower in the tree." },
      { q: "In precedence climbing, the right operand of a left-associative operator with precedence p is parsed with expr(p + 1). What changes if it is parsed with expr(p)?", choices: ["Nothing", "The operator becomes right associative", "Precedence is ignored", "It loops forever"], answer: 1, why: "An operator of equal precedence can then join the right operand, so a − b − c would group as a − (b − c)." },
      { q: "Why do x = 1; and x + 1; make Mini's stmt rule not LL(1)?", choices: ["Both are ambiguous", "Both alternatives have NAME in their FIRST sets, so one token can't choose", "Assignment is left recursive", "Expressions can be empty"], answer: 1, why: "The second token (= or +) is needed to tell them apart." },
      { q: "In the grammar E → T E′, E′ → + T E′ | ε, T → num, which variables are nullable?", choices: ["E only", "E′ only", "E and E′", "None"], answer: 1, why: "E′ has an ε alternative; E needs a T, which must be a num." },
      { q: "What is FIRST(E) in that grammar?", choices: ["{+}", "{num}", "{num, +}", "{num, ε}"], answer: 1, why: "E starts with T, and T is num and isn't nullable." },
      { q: "In Python's re, what does the pattern <|<= match at the start of \"<=\"?", choices: ["<=", "<", "Nothing", "An error"], answer: 1, why: "Alternatives are tried in order and the first that matches wins, so < matches; list <= first to get maximal munch." }
    ],
    practice: [
      {
        q: `<p>Give the AST that <code>parse_expr</code> builds for <code>!a == b || c * -d &gt; 2</code>, and draw it as a bracketed expression.</p>`,
        a: `<p>Unary <code>!</code> binds tightest, so it applies to <code>a</code> alone. Then <code>*</code> (level 6) groups <code>c * -d</code>, <code>&gt;</code> (level 4) compares that with 2, <code>==</code> (level 3) compares <code>!a</code> with <code>b</code>, and <code>||</code> (level 1) joins the two: <code>((!a) == b) || ((c * (-d)) &gt; 2)</code>.</p>
<pre><code>print(parse_expr("!a == b || c * -d &gt; 2"))   # ('bin', '||', ('bin', '==', ('unary', '!', ('var', 'a')), ('var', 'b')), ('bin', '&gt;', ('bin', '*', ('var', 'c'), ('unary', '-', ('var', 'd'))), ('num', 2)))</code></pre>`
      },
      {
        q: `<p>Trace <code>expr(1)</code> on <code>8 - 3 - 2</code>, giving each call to <code>expr</code> with its <code>min_prec</code> and what it returns. Then say what changes if the right operand is parsed with <code>expr(PREC[op])</code>.</p>`,
        a: `<p><code>expr(1)</code> reads 8, sees <code>-</code> (5 ≥ 1), calls <code>expr(6)</code>, which reads 3 and stops at the second <code>-</code> (5 &lt; 6), returning 3. Now left = (8 − 3). The loop sees the second <code>-</code> (5 ≥ 1) and calls <code>expr(6)</code>, which returns 2. Result: (8 − 3) − 2 = 3. With <code>expr(PREC[op])</code>, the first inner call is <code>expr(5)</code>, which reads 3, sees <code>-</code> (5 ≥ 5) and takes <code>3 - 2</code>, so the result is 8 − (3 − 2) = 7: right associative, and wrong for subtraction.</p>
<pre><code>print(parse_expr("8 - 3 - 2"))   # ('bin', '-', ('bin', '-', ('num', 8), ('num', 3)), ('num', 2))</code></pre>`
      },
      {
        q: `<p>Compute nullable and FIRST for every variable of this grammar, and decide whether it is LL(1): <em>S</em> → <em>A</em> b | c; <em>A</em> → a <em>A</em> | ε.</p>`,
        hint: `<p>What can follow <em>A</em>? Look at where <em>A</em> appears on a right-hand side.</p>`,
        a: `<p><em>A</em> is nullable (it has ε), with FIRST(<em>A</em>) = {a}. <em>S</em> → <em>A</em> b: <em>A</em> is nullable, so FIRST(<em>A</em> b) = {a} ∪ {b} = {a, b}; FIRST(c) = {c}. So FIRST(<em>S</em>) = {a, b, c} and <em>S</em> isn't nullable. LL(1) check: <em>S</em>'s alternatives have FIRST sets {a, b} and {c}, disjoint. <em>A</em>'s alternatives are a <em>A</em> (FIRST {a}) and ε; FOLLOW(<em>A</em>) = {b} (in <em>S</em> → <em>A</em> b it is followed by b, and in <em>A</em> → a <em>A</em> it is followed by whatever follows <em>A</em>). {a} and {b} are disjoint, so the grammar is LL(1): on a, take a <em>A</em>; on b, take ε.</p>`
      },
      {
        q: `<p>The parser reports <code>1:28: expected ';' but found '}'</code> for <code>fun main(): int { print(1) }</code>. Describe how panic-mode recovery would handle this program with a second mistake, <code>fun main(): int { print(1) var x: int = ; return x; }</code>: which messages appear, and where does parsing resume after each?</p>`,
        a: `<p>After <code>print(1)</code> the parser expects <code>;</code> but finds <code>var</code>: message 1 (at the <code>var</code>). <code>var</code> is a synchronizing token, so it resumes there and parses the declaration until <code>=</code>, then expects an expression but finds <code>;</code>: message 2. It skips to just after the <code>;</code> and resumes, and <code>return x;</code> and the closing brace parse normally. Two real mistakes, two messages. Without recovery, only the first would be reported.</p>`
      }
    ],
    sources: ["dragonbook", "crafting", "pratt73", "sipser"]
  },
  {
    id: "cp3",
    title: "Semantic analysis",
    minutes: 90,
    summary: "What a grammar can't check; symbol tables as a stack of scopes; declaration before use, shadowing and redeclaration; a first pass for function signatures; resolving names to frame slots; type rules and a type checker that reports every error without cascades; checking that every path returns, and why the check must be conservative; and writing good error messages.",
    notes: `
<p>A grammar describes what programs <em>look like</em>. Many programs that look fine are still meaningless:</p>
<pre data-label="Mini"><code>fun main(): int {
    var x: int = y + 1;     // y was never declared
    var ok: bool = 3;       // an int where a bool is needed
    if x { print(1); }      // the condition is an int
    return gcd(x);          // no function gcd, and it would need two arguments
}</code></pre>
<p>Every line parses. Catching these mistakes is <strong>semantic analysis</strong>: checks that depend on what names mean and what types values have. In principle a grammar could say "every variable is declared before use", but not a context-free one (matching each use to an earlier declaration of the same name is, at its core, the language {<em>ww</em>} of strings written twice, which CS 320 Lesson 6 showed isn't context-free). So compilers parse with a context-free grammar and then check the rest with ordinary code that walks the tree.</p>

<h3>Symbol tables and scopes</h3>
<p>A <strong>symbol table</strong> maps each name to what the compiler knows about it: for a Mini variable, its type (and later its storage slot); for a function, its parameter types and result type. Names have <strong>scopes</strong>, the regions of the program where they can be used. In Mini, as in C and Java, the scopes are <em>lexical</em>: a variable declared in a block can be used from its declaration to the end of that block, including in blocks nested inside. Nested scopes behave like a stack, so the symbol table is a stack of dictionaries, one per open scope:</p>
<ul>
<li>entering a block <strong>pushes</strong> an empty dictionary, and leaving it <strong>pops</strong> it;</li>
<li>a declaration adds the name to the <em>innermost</em> dictionary, and is an error if the name is already there;</li>
<li>a use looks the name up from the innermost dictionary outward, and is an error if no dictionary has it.</li>
</ul>
<pre><code>class CompileError(Exception):
    pass

class Scopes:
    def __init__(self):
        self.stack = [{}]                     # the innermost scope is last

    def push(self):
        self.stack.append({})

    def pop(self):
        self.stack.pop()

    def declare(self, name, info):
        if name in self.stack[-1]:
            raise CompileError(f"'{name}' is already declared in this scope")
        self.stack[-1][name] = info

    def lookup(self, name):
        for scope in reversed(self.stack):    # innermost first
            if name in scope:
                return scope[name]
        raise CompileError(f"'{name}' is not declared")

s = Scopes()
s.declare("x", "int")        # parameter x
s.declare("y", "int")
s.push()                     # entering a block
s.declare("x", "bool")       # shadows the parameter
print(s.lookup("x"), s.lookup("y"))   # bool int
s.pop()                      # leaving the block
print(s.lookup("x"))   # int
try:
    s.declare("y", "bool")
except CompileError as e:
    print(e)   # 'y' is already declared in this scope</code></pre>
<p>Declaring <code>x</code> again in an inner block <strong>shadows</strong> the outer <code>x</code>: until the block ends, <code>x</code> means the inner one. Mini allows shadowing, as C does; Java forbids a local variable from shadowing another local, to prevent confusion; Rust even allows redeclaring in the same scope. Each is a language-design choice, and the symbol table implements whichever one the language picked.</p>
<p>Three more rules complete Mini's scoping:</p>
<ul>
<li>In Mini each function's parameters form the outermost scope of that function, and the body block opens a new scope inside it. So a <code>var</code> in the body may shadow a parameter. Each function starts with a fresh stack: functions can't see each other's variables.</li>
<li>In <code>var x: int = e;</code> the initializer <code>e</code> is checked <em>before</em> <code>x</code> is declared, so <code>var x: int = x + 1;</code> refers to an outer <code>x</code> (or is an error if there is none), never to the variable being declared.</li>
<li>Functions are global and may be called before their definition, which recursion and mutual recursion need. So the checker makes <strong>two passes</strong>: the first records every function's signature (parameter types and result type) in a global table and reports duplicates; the second checks each body against that table.</li>
</ul>

<h3>Resolving names to slots</h3>
<p>Once the checker knows which declaration each use refers to, it can record that in the tree, so that later phases never look names up again. This is <strong>name resolution</strong>. The code generator in Lesson 4 stores each function's variables in numbered <strong>slots</strong> of its stack frame: parameters get slots 0, 1, … in order, and each <code>var</code> gets the next unused number, in the order the declarations appear. The resolver replaces every <code>("var", name)</code> by <code>("local", slot)</code>, and every declaration and assignment's name by its slot:</p>
<pre data-label="Mini"><code>fun f(x: int): int {           // x: slot 0
    var y: int = x + 1;        // y: slot 1; this x is slot 0
    {
        var x: bool = y &gt; 2;   // this x: slot 2 (shadows slot 0)
        print(x);              // slot 2
    }
    return x + y;              // slots 0 and 1
}</code></pre>
<p>The two <code>x</code>s get different slots even though they have the same name: after resolution, names don't matter at all. Slots aren't reused here, so a function needs as many slots as it has parameters and declarations; a real compiler reuses the slot of a variable whose scope has ended, and Lesson 6 goes further and shares registers between variables that are never needed at the same time.</p>

<h3>Types and type rules</h3>
<p>A <strong>type</strong> is a set of values together with the operations allowed on them. Mini's two types are <code>int</code> and <code>bool</code>. <strong>Type checking</strong> works out the type of every expression, bottom-up, and rejects any operation applied to the wrong types. The rules:</p>
<table>
<tr><th>Expression</th><th>Requires</th><th>Has type</th></tr>
<tr><td>number literal; <code>true</code>, <code>false</code></td><td></td><td>int; bool</td></tr>
<tr><td>variable</td><td>declared</td><td>its declared type</td></tr>
<tr><td><code>-e</code>; <code>!e</code></td><td><code>e</code>: int; <code>e</code>: bool</td><td>int; bool</td></tr>
<tr><td><code>a + b</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code></td><td>both int</td><td>int</td></tr>
<tr><td><code>a &lt; b</code>, <code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code></td><td>both int</td><td>bool</td></tr>
<tr><td><code>a == b</code>, <code>!=</code></td><td>same type</td><td>bool</td></tr>
<tr><td><code>a &amp;&amp; b</code>, <code>||</code></td><td>both bool</td><td>bool</td></tr>
<tr><td><code>f(e1, …, en)</code></td><td><code>f</code> declared with <em>n</em> parameters, each <code>ei</code> of the parameter's type</td><td><code>f</code>'s result type</td></tr>
</table>
<p>Each rule says: if the parts have these types, the whole has this type. The checker is a recursive function with one case per row. One design point matters a lot for the user. When a subexpression is wrong, report it once and give it the special type <code>"error"</code>, which every rule accepts silently. Without that, one mistake produces a <strong>cascade</strong>: <code>(m + 1) * 2 &lt; n</code> with <code>m</code> undeclared would also complain about <code>*</code> and <code>&lt;</code>.</p>
<pre><code>ARITH = {"+", "-", "*", "/", "%"}
ORDER = {"&lt;", "&lt;=", "&gt;", "&gt;="}
LOGIC = {"&amp;&amp;", "||"}

def type_of(e, scopes, funs, errors):
    kind = e[0]
    if kind == "num":
        return "int"
    if kind == "bool":
        return "bool"
    if kind == "var":
        try:
            return scopes.lookup(e[1])
        except CompileError as err:
            errors.append(str(err))
            return "error"
    if kind == "unary":
        t = type_of(e[2], scopes, funs, errors)
        want = "int" if e[1] == "-" else "bool"
        if t == "error":
            return "error"
        if t != want:
            errors.append(f"'{e[1]}' needs {want}, got {t}")
            return "error"
        return want
    if kind == "bin":
        op = e[1]
        a = type_of(e[2], scopes, funs, errors)
        b = type_of(e[3], scopes, funs, errors)
        if a == "error" or b == "error":
            return "error"                    # already reported: don't cascade
        if op in ARITH or op in ORDER:
            ok = a == "int" and b == "int"
        elif op in LOGIC:
            ok = a == "bool" and b == "bool"
        else:                                 # == and != need two operands of the same type
            ok = a == b
        if not ok:
            errors.append(f"'{op}' can't be applied to {a} and {b}")
            return "error"
        return "int" if op in ARITH else "bool"
    if kind == "call":
        args = [type_of(a, scopes, funs, errors) for a in e[2]]
        if e[1] not in funs:
            errors.append(f"function '{e[1]}' is not declared")
            return "error"
        params, result = funs[e[1]]
        if len(args) != len(params):
            errors.append(f"'{e[1]}' takes {len(params)} arguments, got {len(args)}")
        else:
            for i, (a, p) in enumerate(zip(args, params)):
                if a != p and a != "error":
                    errors.append(f"argument {i + 1} of '{e[1]}' should be {p}, got {a}")
        return result                         # the declared result type, even after an error

funs = {"gcd": (["int", "int"], "int")}       # from the first pass
scopes = Scopes()
scopes.declare("n", "int")
scopes.declare("ok", "bool")
for e in [("bin", "&lt;", ("var", "n"), ("call", "gcd", [("var", "n"), ("num", 4)])),   # n &lt; gcd(n, 4)
          ("bin", "&lt;", ("bin", "&lt;", ("var", "n"), ("num", 1)), ("num", 2)),          # n &lt; 1 &lt; 2
          ("bin", "&amp;&amp;", ("var", "ok"), ("bin", "+", ("var", "m"), ("num", 1))),      # ok &amp;&amp; m + 1
          ("call", "gcd", [("var", "ok")])]:                                        # gcd(ok)
    errors = []
    print(type_of(e, scopes, funs, errors), errors)</code></pre>
<pre data-label="Output"><code>bool []
error ["'&lt;' can't be applied to bool and int"]
error ["'m' is not declared"]
int ["'gcd' takes 2 arguments, got 1"]</code></pre>
<p>In the third expression <code>m</code> is undeclared, so <code>m + 1</code> has type error, and <code>&amp;&amp;</code> doesn't add a second complaint. In the fourth, the call is wrong, but its result type is still int, because that is what the programmer evidently meant; the expression around it can go on being checked normally. Note the order of the checks: the arguments are checked first, so mistakes inside them are reported even when the function is unknown.</p>

<h3>Checking statements</h3>
<p>Statements have no type, but each checks its parts:</p>
<ul>
<li><code>var x: T = e;</code> — <code>e</code> has type <em>T</em>; then declare <code>x</code> with type <em>T</em> in the innermost scope (even if <code>e</code> was wrong, so that later uses of <code>x</code> don't cascade).</li>
<li><code>x = e;</code> — <code>x</code> is declared and <code>e</code> has its type.</li>
<li><code>if e</code> and <code>while e</code> — <code>e</code> has type bool. (C accepts an integer condition and treats non-zero as true; Mini, like Java, is stricter.)</li>
<li><code>return e;</code> — <code>e</code> has the enclosing function's result type.</li>
<li><code>print(e);</code> and <code>e;</code> — <code>e</code> is well-typed.</li>
<li>a block — push a scope, check each statement in order, pop.</li>
</ul>
<p>One more check is about control flow: a function must not reach its closing brace without returning a value. A statement <strong>returns on every path</strong> if it is a <code>return</code>; a block whose statements include one that does; or an <code>if</code> with an <code>else</code> where both branches do. A <code>while</code> never counts, because its body might run zero times.</p>
<pre><code>def returns(s):
    """Does statement s return on every path through it?"""
    kind = s[0]
    if kind == "return":
        return True
    if kind == "block":
        return any(returns(t) for t in s[1])
    if kind == "if":
        return s[3] is not None and returns(s[2]) and returns(s[3])
    return False                              # while, assignments, print, ...

one = ("block", [("if", ("var", "ok"), ("block", [("return", ("num", 1))]), None)])
both = ("block", [("if", ("var", "ok"), ("block", [("return", ("num", 1))]), ("block", [("return", ("num", 2))]))])
print(returns(one), returns(both))   # False True</code></pre>
<p>This check is <strong>conservative</strong>: it rejects some functions that can never fall off the end, such as one whose body is <code>while true { return 1; }</code>. That isn't laziness. Whether a function can reach its end depends on whether loops terminate, so deciding it exactly for all programs would decide the halting problem; by Rice's theorem (CS 320 Lesson 8) no interesting question about what programs <em>do</em> can be decided exactly. Every static check therefore either rejects some correct programs or accepts some wrong ones. Compilers choose to reject, and the programmer adds a <code>return</code> that never runs. The <code>while true</code> case is easy to special-case, and Java does exactly that, but it still rejects a method like <code>r</code> in the practice problems below: some correct program will always be rejected.</p>

<h3>Good error messages</h3>
<p>A semantic error message should say where (line and column, which is why tokens carried positions in Lesson 2 and a production compiler stores them in AST nodes), what was expected and what was found, and should name the program's own identifiers. Report every error in one run, but only one per cause. Many compilers also suggest a fix for a misspelled name by finding the declared name most similar to it. Python's standard library has a helper for that:</p>
<pre><code>import difflib
print(difflib.get_close_matches("cout", ["count", "total", "n"]))   # ['count']</code></pre>
<p>With positions stored in the tree, the program at the top of this lesson would produce:</p>
<pre data-label="Output"><code>2:18: 'y' is not declared
3:20: variable 'ok' is bool, but its initial value is int
4:8: the condition of 'if' must be bool, not int
5:12: function 'gcd' is not declared</code></pre>
<p>Four mistakes, four messages; the call to the missing <code>gcd</code> is reported once, not again for its argument count.</p>

<h3>Static and dynamic checking</h3>
<p>Mini is <strong>statically typed</strong>: every type error is found before the program runs. Python is <strong>dynamically typed</strong>: <code>1 + True</code> is legal, and <code>1 + "a"</code> raises <code>TypeError</code> only when that line runs. (CS 102's type hints are checked statically by a separate tool, mypy, which CS 240 used, not by Python itself.) Because Mini's checker has proved that every operation gets the right types, the generated code never needs to check types at run time. The types are <strong>erased</strong>: in Lesson 4's virtual machine, <code>true</code> and <code>false</code> are just the integers 1 and 0, and nothing records which values were booleans.</p>
<p class="note">Why it matters: after this phase the program is known to be meaningful, every name points to one declaration, and every expression has a known type. The code generator can then translate without checking anything, which is what makes it simple.</p>
`,
    terms: [
      ["Semantic analysis", "Checks that depend on meaning rather than form: declared names, matching types, returns on every path."],
      ["Symbol table", "A map from each name to what the compiler knows about it, such as its type, slot or signature."],
      ["Scope", "The region of the program in which a declaration can be used."],
      ["Lexical scope", "Scoping determined by the program text: a name declared in a block is visible to the end of that block, including nested blocks."],
      ["Shadowing", "A declaration in an inner scope hiding one with the same name in an outer scope."],
      ["Name resolution", "Determining which declaration each use of a name refers to, and recording it (for example as a slot number)."],
      ["Slot", "A numbered place in a function's stack frame that holds one parameter or local variable."],
      ["Signature", "A function's parameter types and result type."],
      ["Type", "A set of values together with the operations allowed on them."],
      ["Type checking", "Computing the type of every expression from type rules and rejecting operations on the wrong types."],
      ["Error cascade", "Many error messages caused by a single mistake; avoided by giving a bad subexpression an error type that is accepted silently."],
      ["Conservative analysis", "An analysis that, when it can't be sure, assumes the worst, so it may reject some correct programs but never accepts a wrong one."],
      ["Static typing", "Checking types before the program runs."],
      ["Type erasure", "Generated code keeping no record of types, because the checker has already proved them correct."]
    ],
    quiz: [
      { q: "In Mini, what does the x in \"var x: int = x + 1;\" on the right-hand side refer to?", choices: ["The variable being declared", "An x declared in an enclosing scope (an error if there is none)", "Always an error", "The value 0"], answer: 1, why: "The initializer is checked before the new x is declared." },
      { q: "Why does the checker record all function signatures in a first pass?", choices: ["To make it faster", "So that functions can be called before their definitions, which recursion and mutual recursion need", "To find unused functions", "Because the parser can't read them"], answer: 1, why: "When the body of an early function calls a later one, the later signature must already be known." },
      { q: "What type does 3 == 4 have, and what about true == 4?", choices: ["int; bool", "bool; an error", "bool; bool", "an error; an error"], answer: 1, why: "== needs both operands of the same type and gives bool; true == 4 compares bool with int." },
      { q: "Why does the type checker give a wrong subexpression the type \"error\" and accept it silently?", choices: ["To make the compiler faster", "To avoid a cascade of messages caused by one mistake", "Because error is a Mini type", "To skip the rest of the function"], answer: 1, why: "Otherwise every enclosing operator would report the same mistake again." },
      { q: "Which body returns on every path?", choices: ["while x > 0 { return 1; }", "if c { return 1; }", "if c { return 1; } else { x = 2; }", "{ print(1); if c { return 1; } else { return 2; } }"], answer: 3, why: "The block contains an if whose two branches both return." },
      { q: "Why can't a compiler decide exactly whether a function can reach its end without returning?", choices: ["Because it would take exponential time", "Because it depends on whether loops terminate, which is undecidable in general", "Because of shadowing", "It can; compilers just don't bother"], answer: 1, why: "By Rice's theorem no nontrivial property of program behaviour is decidable, so the check must be conservative." }
    ],
    practice: [
      {
        q: `<p>For this function, say which declaration each use of a name refers to, and give the slot of every variable (parameters first, then declarations in order):</p>
<pre data-label="Mini"><code>fun g(a: int, b: int): int {
    var c: int = a;
    while c &lt; b {
        var a: int = c * 2;
        c = a + 1;
    }
    var d: int = c + a;
    return d;
}</code></pre>`,
        a: `<p>Slots: <code>a</code> (parameter) 0, <code>b</code> 1, <code>c</code> 2, the inner <code>a</code> 3, <code>d</code> 4: five slots. <code>var c: int = a</code> uses slot 0. <code>c &lt; b</code>: slots 2 and 1. Inside the loop, <code>var a: int = c * 2</code> reads slot 2 and declares slot 3; <code>c = a + 1</code> writes slot 2 and reads slot 3 (the inner <code>a</code>). After the loop the inner scope is gone, so <code>c + a</code> reads slots 2 and 0 (the parameter), and <code>return d</code> reads slot 4.</p>`
      },
      {
        q: `<p>With <code>n: int</code> and <code>ok: bool</code> declared, give the type of each expression or the first error the checker reports, using the rules in the table: (a) <code>-n * 2 &gt;= 7 == ok</code>; (b) <code>!n &lt; 3</code>; (c) <code>ok || n</code>; (d) <code>(n % 2 == 0) != (ok &amp;&amp; true)</code>.</p>`,
        a: `<p>(a) <code>-n * 2</code> is int, <code>&gt;=</code> 7 gives bool, and <code>bool == bool</code> is bool. (b) Unary <code>!</code> binds tightest, so it is <code>(!n) &lt; 3</code>: <code>!</code> needs bool, got int; that part becomes error and <code>&lt;</code> says nothing more. (c) <code>||</code> can't be applied to bool and int. (d) Both sides are bool, so <code>!=</code> gives bool.</p>
<pre><code>e = ("bin", "==", ("bin", "&gt;=", ("bin", "*", ("unary", "-", ("var", "n")), ("num", 2)), ("num", 7)), ("var", "ok"))
errs = []
print(type_of(e, scopes, funs, errs), errs)   # bool []
errs = []
print(type_of(("bin", "&lt;", ("unary", "!", ("var", "n")), ("num", 3)), scopes, funs, errs), errs)   # error ["'!' needs bool, got int"]</code></pre>`
      },
      {
        q: `<p>Does each function body return on every path, by the rules of this lesson? Which of them can actually reach the end at run time?</p>
<pre data-label="Mini"><code>fun p(x: int): int { if x &gt; 0 { return 1; } else { if x &lt; 0 { return -1; } } }
fun q(x: int): int { if x &gt; 0 { return 1; } return 0; }
fun r(x: int): int { if x &gt; 0 { return 1; } else { if x &lt;= 0 { return 0; } } }</code></pre>`,
        a: `<p><code>p</code>: no. The outer <code>if</code> has an else, but the else block's only statement is an <code>if</code> without an else. It really can reach the end, when <code>x</code> is 0. <code>q</code>: yes, because the block's last statement is a <code>return</code>. <code>r</code>: no by the rules, for the same reason as <code>p</code>, yet it can never reach the end, because when <code>x &gt; 0</code> is false, <code>x &lt;= 0</code> is true. The checker rejects <code>r</code> because it doesn't reason about values: a conservative analysis.</p>`
      },
      {
        q: `<p>A student's type checker returns <code>"int"</code> instead of <code>"error"</code> for an undeclared variable, "to keep going". What does it report for <code>var ok: bool = m;</code> and for <code>print(m &amp;&amp; true);</code>, with <code>m</code> undeclared? Why is <code>"error"</code> better than any real type?</p>`,
        a: `<p>For the first it reports that <code>m</code> is undeclared and then that <code>ok</code> is bool but its value is int: two messages for one mistake, and the second is misleading, because the programmer may well have meant a bool. For the second, it reports <code>m</code> and then that <code>&amp;&amp;</code> can't be applied to int and bool. Any real type is a guess that is wrong in some context; <code>"error"</code> is compatible with every context, so each mistake is reported exactly once.</p>`
      }
    ],
    sources: ["dragonbook", "crafting", "appel", "sipser"]
  },
  {
    id: "cp4",
    title: "Code generation for a stack machine",
    minutes: 90,
    summary: "A stack-machine bytecode and a virtual machine that runs it; compiling expressions by a postorder walk; jumps, labels and backpatching for if and while; short-circuit && and ||; activation records, frame pointers and a calling convention that mirrors the CS 210 stack frame; and compiling whole programs with function calls.",
    notes: `
<p>After Lesson 3, the program is a checked tree, and the resolver can give every variable a slot. Now we translate it into instructions. Our target is a <strong>stack machine</strong>: instructions take their operands from the top of a stack and push their results back, so there are no registers to manage. The Java Virtual Machine, CPython, .NET and WebAssembly are all stack machines for the same reason: generating code for them is simple, and the code is compact. The program is called <strong>bytecode</strong>, and the program that runs it is a <strong>virtual machine</strong> (VM). Lesson 6 compiles to a real register machine, RISC-V, for comparison.</p>

<h3>The instruction set</h3>
<p>Each instruction is a tuple, and a program is a list of them, numbered from 0. Values are integers; booleans are 1 and 0 (Lesson 3's type erasure).</p>
<table>
<tr><th>Instruction</th><th>Effect</th></tr>
<tr><td><code>("const", n)</code></td><td>push <em>n</em></td></tr>
<tr><td><code>("load", i)</code>, <code>("store", i)</code></td><td>push the value of slot <em>i</em>; pop a value into slot <em>i</em></td></tr>
<tr><td><code>("add",)</code> <code>sub mul div mod</code></td><td>pop <em>b</em>, pop <em>a</em>, push <em>a</em> op <em>b</em></td></tr>
<tr><td><code>("lt",)</code> <code>le gt ge eq ne</code></td><td>pop <em>b</em>, pop <em>a</em>, push 1 if the comparison holds, else 0</td></tr>
<tr><td><code>("neg",)</code>, <code>("not",)</code></td><td>replace the top <em>v</em> by −<em>v</em>; by 1 if <em>v</em> = 0, else 0</td></tr>
<tr><td><code>("jump", t)</code></td><td>continue at instruction <em>t</em></td></tr>
<tr><td><code>("jumpz", t)</code></td><td>pop <em>v</em>; if <em>v</em> = 0, continue at <em>t</em></td></tr>
<tr><td><code>("alloc", k)</code></td><td>push <em>k</em> zeros: room for local variables</td></tr>
<tr><td><code>("call", t, n)</code>, <code>("ret",)</code></td><td>call the function at <em>t</em> with the top <em>n</em> values as arguments; return the top value (below)</td></tr>
<tr><td><code>("print",)</code>, <code>("pop",)</code>, <code>("halt",)</code></td><td>pop and print; pop and discard; stop</td></tr>
</table>
<p>Mini's <code>/</code> and <code>%</code> follow C and RISC-V, not Python: division rounds toward zero, so −7 / 2 is −3 and −7 % 2 is −1, while Python's <code>//</code> rounds down and gives −4, with <code>%</code> giving 1. A compiler must implement the <em>source</em> language's arithmetic exactly, whatever the language it is written in does. Here is the VM without calls. Until calls arrive, slot <em>i</em> is simply position <em>i</em> of the stack, counted from the bottom.</p>
<pre><code>def cdiv(a, b):                       # integer division rounding toward zero, as in C and RISC-V
    q = abs(a) // abs(b)
    return q if (a &lt; 0) == (b &lt; 0) else -q

BINARY = {
    "add": lambda a, b: a + b, "sub": lambda a, b: a - b, "mul": lambda a, b: a * b,
    "div": cdiv, "mod": lambda a, b: a - b * cdiv(a, b),
    "lt": lambda a, b: int(a &lt; b), "le": lambda a, b: int(a &lt;= b),
    "gt": lambda a, b: int(a &gt; b), "ge": lambda a, b: int(a &gt;= b),
    "eq": lambda a, b: int(a == b), "ne": lambda a, b: int(a != b),
}

def run(code):
    stack, out, pc = [], [], 0          # pc: the program counter, the next instruction's address
    while True:
        ins = code[pc]
        op = ins[0]
        pc += 1
        if op == "const":
            stack.append(ins[1])
        elif op == "load":
            stack.append(stack[ins[1]])
        elif op == "store":
            stack[ins[1]] = stack.pop()
        elif op == "alloc":
            stack.extend([0] * ins[1])
        elif op in BINARY:
            b = stack.pop()
            a = stack.pop()
            stack.append(BINARY[op](a, b))
        elif op == "neg":
            stack.append(-stack.pop())
        elif op == "not":
            stack.append(1 if stack.pop() == 0 else 0)
        elif op == "jump":
            pc = ins[1]
        elif op == "jumpz":
            if stack.pop() == 0:
                pc = ins[1]
        elif op == "pop":
            stack.pop()
        elif op == "print":
            out.append(stack.pop())
        elif op == "halt":
            return out
        else:
            raise ValueError("unknown instruction " + op)

print(run([("const", 7), ("neg",), ("const", 2), ("div",), ("print",),
           ("const", 7), ("neg",), ("const", 2), ("mod",), ("print",), ("halt",)]))   # [-3, -1]
print(-7 // 2, -7 % 2)   # -4 1</code></pre>
<p>(<code>lambda a, b: a + b</code> is a small unnamed function, CS 102 Lesson 5; the dictionary maps each operator's name to the function that computes it. The VM returns the printed values as a list so that tests can check them.) This loop, fetch an instruction, decode it, execute it, is the same cycle CS 230 Lesson 5's processor performs in hardware.</p>

<h3>Compiling expressions</h3>
<p>One simplification first. To keep the examples short, this lesson's <code>CodeGen</code> takes trees that still say <code>("var", name)</code>, together with a dictionary from names to slots. A single dictionary can't tell two declarations of the same name apart, so it is enough only for functions with no shadowing, which is true of every example here. Given Lesson 3's resolved tree, the case would instead be <code>("local", slot)</code>, emitting <code>("load", slot)</code> with no lookup at all. The second programming problem, which must handle shadowing, starts from the unresolved tree and keeps its own scope stack, as Lesson 3's resolver does.</p>
<p>To compile an expression for a stack machine, compile its operands, which leaves their values on the stack, then emit the operator, which replaces them by the result. This is a <strong>postorder</strong> walk of the tree (children first, then the node, as in CS 102 Lesson 8), and it works at every depth because each subexpression's code leaves exactly one value on top of whatever was there before. For <code>(a + 2) * b</code> with <code>a</code> in slot 0 and <code>b</code> in slot 1:</p>
<pre><code>OPS = {"+": "add", "-": "sub", "*": "mul", "/": "div", "%": "mod", "&lt;": "lt", "&lt;=": "le",
       "&gt;": "gt", "&gt;=": "ge", "==": "eq", "!=": "ne"}

class CodeGen:
    def __init__(self, slots):
        self.code = []
        self.slots = slots                # name -&gt; slot (no shadowing: see above)

    def emit(self, *ins):
        self.code.append(ins)
        return len(self.code) - 1         # the new instruction's address

    def here(self):
        return len(self.code)             # the address the next instruction will get

    def patch(self, at, target):          # fill in a jump's target
        self.code[at] = (self.code[at][0], target)

    def expr(self, e):
        kind = e[0]
        if kind == "num":
            self.emit("const", e[1])
        elif kind == "bool":
            self.emit("const", 1 if e[1] else 0)
        elif kind == "var":
            self.emit("load", self.slots[e[1]])
        elif kind == "unary":
            self.expr(e[2])
            self.emit("neg" if e[1] == "-" else "not")
        elif kind == "bin" and e[1] == "&amp;&amp;":
            self.expr(e[2])
            j_false = self.emit("jumpz", None)    # left is false: skip the right side
            self.expr(e[3])
            j_end = self.emit("jump", None)
            self.patch(j_false, self.here())
            self.emit("const", 0)
            self.patch(j_end, self.here())
        elif kind == "bin":
            self.expr(e[2])
            self.expr(e[3])
            self.emit(OPS[e[1]])

g = CodeGen({"a": 0, "b": 1})
g.expr(("bin", "*", ("bin", "+", ("var", "a"), ("num", 2)), ("var", "b")))
print(g.code)   # [('load', 0), ('const', 2), ('add',), ('load', 1), ('mul',)]</code></pre>
<p>With <code>a</code> = 5 and <code>b</code> = 3, the stack goes [5], [5, 2], [7], [7, 3], [21]. The <code>&amp;&amp;</code> case is explained below.</p>

<h3>Jumps, labels and backpatching</h3>
<p>Control flow becomes jumps, just as CS 210 Lesson 5 saw in GCC's output. An <code>if</code> with an <code>else</code> compiles to:</p>
<pre data-label="Bytecode"><code>    code for the condition
    jumpz ELSE          ; condition false: skip the then-part
    code for the then-part
    jump END
ELSE:
    code for the else-part
END:</code></pre>
<p>and a <code>while</code> loop to:</p>
<pre data-label="Bytecode"><code>TOP:
    code for the condition
    jumpz END
    code for the body
    jump TOP
END:</code></pre>
<p>ELSE, TOP and END are <strong>labels</strong>, names for addresses. A backward jump such as <code>jump TOP</code> is easy, because TOP's address is already known when the jump is emitted. A forward jump isn't: when <code>jumpz ELSE</code> is emitted, the then-part hasn't been compiled, so nobody knows how long it is. <strong>Backpatching</strong> solves this. Emit the jump with an empty target, remember its address, and fill in the target once the label's position is reached. (An assembler does the same for labels in CS 230's RISC-V programs; another approach emits symbolic labels and resolves them all in a second pass.)</p>
<pre><code>class StmtGen(CodeGen):
    def stmt(self, s):
        kind = s[0]
        if kind in ("vardecl", "assign"):
            self.expr(s[-1])                  # the value is the last field of both nodes
            self.emit("store", self.slots[s[1]])
        elif kind == "print":
            self.expr(s[1])
            self.emit("print")
        elif kind == "block":
            for t in s[1]:
                self.stmt(t)
        elif kind == "if":
            self.expr(s[1])
            j_else = self.emit("jumpz", None)
            self.stmt(s[2])
            if s[3] is None:
                self.patch(j_else, self.here())
            else:
                j_end = self.emit("jump", None)
                self.patch(j_else, self.here())
                self.stmt(s[3])
                self.patch(j_end, self.here())
        elif kind == "while":
            top = self.here()
            self.expr(s[1])
            j_end = self.emit("jumpz", None)
            self.stmt(s[2])
            self.emit("jump", top)
            self.patch(j_end, self.here())

def listing(code):
    for addr, ins in enumerate(code):
        print(f"{addr:3}  " + " ".join(str(x) for x in ins))

# var n: int = 4; var s: int = 0; while n &gt; 0 { s = s + n; n = n - 1; } print(s);
body = ("block", [("vardecl", "n", "int", ("num", 4)), ("vardecl", "s", "int", ("num", 0)),
        ("while", ("bin", "&gt;", ("var", "n"), ("num", 0)),
            ("block", [("assign", "s", ("bin", "+", ("var", "s"), ("var", "n"))),
                       ("assign", "n", ("bin", "-", ("var", "n"), ("num", 1)))])),
        ("print", ("var", "s"))])
g = StmtGen({"n": 0, "s": 1})
g.emit("alloc", 2)                    # room for n and s
g.stmt(body)
g.emit("halt")
listing(g.code)
print(run(g.code))   # [10]</code></pre>
<pre data-label="Output"><code>  0  alloc 2
  1  const 4
  2  store 0
  3  const 0
  4  store 1
  5  load 0
  6  const 0
  7  gt
  8  jumpz 18
  9  load 1
 10  load 0
 11  add
 12  store 1
 13  load 0
 14  const 1
 15  sub
 16  store 0
 17  jump 5
 18  load 1
 19  print
 20  halt
[10]</code></pre>
<p>The <code>jumpz</code> at address 8 was emitted as <code>("jumpz", None)</code>, and patched to 18 once the loop body and its <code>jump 5</code> were in place.</p>

<h3>Short-circuit operators</h3>
<p>In <code>x != 0 &amp;&amp; 10 / x &gt; 1</code>, the right side must not run when <code>x</code> is 0: <code>&amp;&amp;</code> and <code>||</code> <strong>short-circuit</strong>, evaluating the right operand only when the left one doesn't already decide the answer. So they can't be compiled like <code>+</code>, which evaluates both operands; they are control flow. For <code>a &amp;&amp; b</code>: compute <code>a</code>; if it is 0, the answer is 0 without computing <code>b</code>; otherwise the answer is <code>b</code>. That is the <code>&amp;&amp;</code> case in <code>expr</code> above. For <code>x &gt; 0 &amp;&amp; x &lt; 10</code>:</p>
<pre><code>g = CodeGen({"x": 0})
g.expr(("bin", "&amp;&amp;", ("bin", "&gt;", ("var", "x"), ("num", 0)), ("bin", "&lt;", ("var", "x"), ("num", 10))))
listing(g.code)</code></pre>
<pre data-label="Output"><code>  0  load 0
  1  const 0
  2  gt
  3  jumpz 8
  4  load 0
  5  const 10
  6  lt
  7  jump 9
  8  const 0</code></pre>
<p>Both paths reach address 9 with exactly one value pushed: <code>x &lt; 10</code>'s result, or the 0 at address 8. <code>a || b</code> is the mirror image: if <code>a</code> is non-zero, the answer is 1 without computing <code>b</code>.</p>

<h3>Functions and activation records</h3>
<p>Each call needs its own copy of the function's parameters and local variables, because a recursive function has several calls in progress at once. The storage for one call is its <strong>activation record</strong>, or <strong>stack frame</strong>: exactly CS 210 Lesson 6's picture, where each x86-64 call had a frame holding its locals, the saved frame pointer <code>%rbp</code> and the return address. Our VM's frames live on its value stack:</p>
<ul>
<li>A register-like variable <code>fp</code>, the <strong>frame pointer</strong>, holds the stack index where the current call's slots begin. Slot <em>i</em> is <code>stack[fp + i]</code>, so <code>load</code> and <code>store</code> become <code>stack[fp + i]</code>. Above the slots, the call computes its temporaries.</li>
<li><strong>Caller:</strong> push the arguments, left to right, then <code>("call", t, n)</code>. The VM saves the <strong>return address</strong> (the address after the call) and the caller's <code>fp</code> on a separate list, <code>frames</code>, sets <code>fp = len(stack) - n</code> so that the <em>n</em> arguments become slots 0 to <em>n</em> − 1, and jumps to <em>t</em>.</li>
<li><strong>Callee:</strong> starts with <code>("alloc", k)</code> to make room for its <em>k</em> local variables, the slots after the parameters.</li>
<li><code>("ret",)</code>: pop the return value, delete everything from <code>fp</code> up (the whole frame), restore the return address and the caller's <code>fp</code> from <code>frames</code>, and push the return value, so that to the caller the call looks like any expression that left one value.</li>
</ul>
<p>An agreement like this between caller and callee is a <strong>calling convention</strong>. A real machine keeps the return address and saved frame pointer in the frame itself, in memory, as x86-64's <code>call</code> and <code>push %rbp</code> did; we keep them in a separate Python list so that slot numbers stay simple. Here is the VM's state as <code>fact(5)</code> has recursed down to the start of <code>fact(3)</code>, for the program below:</p>
<table>
<tr><th>Stack index</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr>
<tr><td>value</td><td>5</td><td>5</td><td>4</td><td>4</td><td>3</td></tr>
<tr><td>meaning</td><td><code>fact(5)</code>'s <em>n</em></td><td>temporary <em>n</em>, waiting for the multiply</td><td><code>fact(4)</code>'s <em>n</em></td><td>temporary</td><td><code>fact(3)</code>'s <em>n</em> (<code>fp</code> = 4)</td></tr>
</table>
<p>and <code>frames</code> holds four (return address, saved <code>fp</code>) pairs: (1, 0) from the start-up call of <code>main</code>, (19, 0) from <code>main</code>'s call, (14, 0) from <code>fact(5)</code>'s call and (14, 2) from <code>fact(4)</code>'s. Each pending multiplication's left operand waits on the stack, inside its own call's region, until the inner call returns.</p>

<h3>Compiling whole programs</h3>
<p>A whole program compiles to a start-up sequence, <code>("call", main, 0)</code> then <code>("halt",)</code>, followed by each function: an <code>alloc</code>, then its body. A call to a function compiled later has the same problem as a forward jump, so call targets are backpatched too: record where each call was emitted and which function it names, and fill in the addresses once every function has been placed. Every Mini function ends in a <code>return</code> on every path (Lesson 3 checked that), and an expression statement such as <code>f(x);</code> emits <code>("pop",)</code> to discard the unused result. For the recursive factorial and the GCD program from Lesson 1, the compiler you write in the second programming problem produces:</p>
<pre data-label="Mini"><code>fun fact(n: int): int {
    if n &lt;= 1 { return 1; }
    return n * fact(n - 1);
}
fun main(): int { print(fact(5)); return 0; }</code></pre>
<pre data-label="Output"><code>  0  call 16 0
  1  halt
  2  alloc 0            fact: no locals besides n (slot 0)
  3  load 0
  4  const 1
  5  le
  6  jumpz 9
  7  const 1
  8  ret
  9  load 0
 10  load 0
 11  const 1
 12  sub
 13  call 2 1
 14  mul
 15  ret
 16  alloc 0            main
 17  const 5
 18  call 2 1
 19  print
 20  const 0
 21  ret
output: [120]</code></pre>
<p>The call at address 0 was emitted before <code>main</code>'s address (16) was known and patched afterwards. For <code>gcd</code>, whose body declares <code>t</code>, the function begins with <code>alloc 1</code>, and <code>t</code> is slot 2, after the parameters <code>a</code> and <code>b</code>.</p>
<p class="note">Why it matters: this is a complete compiler. Source text goes in and a runnable program comes out, through the lexer, parser, checker and code generator. What remains is making the output fast, by optimizing it (Lesson 5) and by targeting real registers (Lesson 6).</p>
`,
    terms: [
      ["Stack machine", "A machine whose instructions take operands from, and push results onto, a stack rather than naming registers."],
      ["Bytecode", "The instruction format of a virtual machine, such as the JVM's or CPython's."],
      ["Virtual machine (VM)", "A program that executes bytecode with a fetch, decode and execute loop."],
      ["Program counter", "The address of the next instruction to execute."],
      ["Postorder code generation", "Emitting code for an expression's operands before its operator, so each subexpression leaves one value on the stack."],
      ["Label", "A name for a code address, used as a jump target."],
      ["Backpatching", "Emitting a forward jump with an unknown target and filling the target in when it becomes known."],
      ["Short-circuit evaluation", "Evaluating the right operand of && or || only when the left one doesn't decide the result."],
      ["Activation record (stack frame)", "The storage for one function call: its parameters, locals and temporaries, plus the return address and saved frame pointer."],
      ["Frame pointer", "The address (here, stack index) where the current call's slots begin."],
      ["Return address", "The address of the instruction after a call, where execution resumes when the callee returns."],
      ["Calling convention", "The caller and callee's agreement on where arguments, results, the return address and saved state go."]
    ],
    quiz: [
      { q: "What bytecode does the compiler emit for 4 - x * 2, with x in slot 0?", choices: ["const 4, load 0, const 2, mul, sub", "const 4, load 0, sub, const 2, mul", "load 0, const 2, mul, const 4, sub", "const 4, const 2, load 0, mul, sub"], answer: 0, why: "Postorder: the left operand 4, then the right operand x * 2 (its operands, then mul), then sub." },
      { q: "In Mini, what are -9 / 4 and -9 % 4?", choices: ["−3 and 3", "−2 and −1", "−2 and 1", "−3 and −1"], answer: 1, why: "Division rounds toward zero: −9 / 4 = −2, and −9 − 4 × (−2) = −1." },
      { q: "Why does a forward jump need backpatching but a backward jump doesn't?", choices: ["Forward jumps are longer", "When a forward jump is emitted, the code it skips hasn't been generated yet, so its target address is unknown", "Backward jumps don't have targets", "The VM can't execute forward jumps"], answer: 1, why: "A backward target has already been emitted and its address is known." },
      { q: "For while c { body }, which jumps are emitted?", choices: ["One jumpz back to the top", "A jumpz to the end after the condition, and a jump back to the top after the body", "Only a jump to the end", "A jump to the top before the condition"], answer: 1, why: "The condition's jumpz leaves the loop; the final jump repeats it." },
      { q: "Why can't a && b be compiled as: code for a, code for b, then a multiply?", choices: ["Multiplication is slower", "b must not be evaluated when a is false, because it might fail or have effects", "The result would be wrong when both are true", "Multiplication of booleans is not allowed in bytecode"], answer: 1, why: "Short-circuit evaluation is part of the meaning: x != 0 && 10 / x > 1 must not divide by zero." },
      { q: "During a call to a function with 2 parameters and 1 local variable, made when the stack held 3 values before the arguments were pushed, what is fp, and which index holds the local?", choices: ["fp = 3; index 5", "fp = 5; index 6", "fp = 0; index 2", "fp = 3; index 4"], answer: 0, why: "After pushing 2 arguments the stack has 5 values, so fp = 5 − 2 = 3; slots 0 and 1 are the parameters (indexes 3, 4), and alloc puts the local, slot 2, at index 5." }
    ],
    practice: [
      {
        q: `<p>Write the bytecode for <code>if x % 2 == 0 { y = x / 2; } else { y = 3 * x + 1; }</code> with <code>x</code> in slot 0 and <code>y</code> in slot 1, starting at address 0, with every jump target filled in. Then check it with <code>StmtGen</code>.</p>`,
        a: `<pre data-label="Bytecode"><code> 0 load 0      5 jumpz 11    10 jump 17     15 add
 1 const 2     6 load 0      11 const 3     16 store 1
 2 mod         7 const 2     12 load 0
 3 const 0     8 div         13 mul
 4 eq          9 store 1     14 const 1</code></pre>
<p>The <code>jumpz</code> at 5 goes to the else-part at 11; the then-part's <code>jump</code> at 10 goes past the else-part to 17.</p>
<pre><code>g = StmtGen({"x": 0, "y": 1})
g.stmt(("if", ("bin", "==", ("bin", "%", ("var", "x"), ("num", 2)), ("num", 0)),
        ("block", [("assign", "y", ("bin", "/", ("var", "x"), ("num", 2)))]),
        ("block", [("assign", "y", ("bin", "+", ("bin", "*", ("num", 3), ("var", "x")), ("num", 1)))])))
print(g.code[5], g.code[10], len(g.code))   # ('jumpz', 11) ('jump', 17) 17</code></pre>`
      },
      {
        q: `<p>Write the bytecode for <code>a || b</code> (with <code>a</code> and <code>b</code> in slots 0 and 1, starting at address 0), following the pattern of <code>&amp;&amp;</code>, and check that each path leaves one value. Then add the case to <code>CodeGen.expr</code> in your head: which lines change?</p>`,
        a: `<pre data-label="Bytecode"><code>0  load 0
1  jumpz 4       ; a is false: the answer is b
2  const 1       ; a is true: the answer is 1
3  jump 5
4  load 1
5  ...</code></pre>
<p>If <code>a</code> is non-zero, the path 0, 1, 2, 3 pushes 1. If it is 0, the path 0, 1, 4 pushes <code>b</code>. In the code: compile the left side, emit <code>jumpz</code> (patched to the right side's start), emit <code>const 1</code> and a <code>jump</code> (patched to the end), then compile the right side.</p>`
      },
      {
        q: `<p>Trace the VM on this code, giving the stack after each instruction: <code>const 2, const 3, const 4, mul, add, const 5, lt, print, halt</code>. What is printed?</p>`,
        a: `<p>[2], [2, 3], [2, 3, 4], [2, 12], [14], [14, 5], [0] (14 &lt; 5 is false), then <code>print</code> pops 0, leaving [], and <code>halt</code> stops. It prints 0.</p>
<pre><code>print(run([("const", 2), ("const", 3), ("const", 4), ("mul",), ("add",), ("const", 5), ("lt",), ("print",), ("halt",)]))   # [0]</code></pre>`
      },
      {
        q: `<p>In the factorial program's bytecode, the instruction after <code>call 2 1</code> at address 13 is <code>mul</code>. What two values does it multiply, and where was each pushed? Why does the VM's <code>ret</code> delete everything from <code>fp</code> up before pushing the result?</p>`,
        hint: `<p>Look at addresses 9 to 12: what is on the stack, in the caller's frame, just before the call?</p>`,
        a: `<p>Address 9 pushed <em>n</em> (the left operand of <code>n * fact(n - 1)</code>), and addresses 10 to 12 pushed <em>n</em> − 1, the argument. The call turns that argument into the callee's slot 0; when the callee returns, <code>ret</code> has removed its whole frame (the argument and any temporaries) and pushed the result, so the stack holds <em>n</em> and fact(<em>n</em> − 1), and <code>mul</code> multiplies them. Deleting the frame is what makes a call behave like any other expression: it consumes its arguments and leaves exactly one value. If <code>ret</code> left the frame behind, the caller's temporaries would be buried under the callee's leftovers, and <code>mul</code> would multiply the wrong values.</p>`
      }
    ],
    sources: ["crafting", "dragonbook", "appel", "pydis"]
  },
  {
    id: "cp5",
    title: "Intermediate code and optimization",
    minutes: 90,
    summary: "Three-address code as an intermediate representation; lowering expressions and control flow to it; basic blocks and control-flow graphs; constant folding, constant propagation and algebraic simplification, and the semantics they must preserve; liveness as a dataflow analysis solved by iterating to a fixed point; and dead-code elimination.",
    notes: `
<p>Lesson 4's compiler translates each node of the tree on its own, so its output repeats work a person would not: <code>var y: int = 4 * 2;</code> computes 4 × 2 every time it runs. An <strong>optimizer</strong> rewrites the program to compute the same results with less work. "Optimizer" overstates it, since nothing finds the best program (that is undecidable, by the same argument as Lesson 3's return check), but the improvements are large: code from GCC or Clang at <code>-O2</code> often runs several times faster than the same program compiled at <code>-O0</code>.</p>
<p>The tree and the stack bytecode are both awkward to optimize. A tree hides the order of operations and the flow of control; stack code hides which value is which, because values have no names, only positions. So optimizers work on an intermediate representation designed for analysis. This lesson lowers the checked tree to that IR and optimizes it; Lesson 6 translates the result to RISC-V. Lesson 4's bytecode generator stays as it is, a separate route that doesn't use the optimizer.</p>

<h3>Three-address code</h3>
<p>In <strong>three-address code</strong> (TAC) each instruction does one operation on at most two operands and names its result: <code>v1 = a + 2</code>. Operands are variables, constants, or <strong>temporaries</strong> (<code>v1</code>, <code>v2</code>, …), new variables the compiler invents (named with a v, not a t, so that they can't be mixed up with RISC-V's registers t0–t6 in Lesson 6) for intermediate results. Control flow uses labels and jumps. Our TAC instructions are tuples:</p>
<table>
<tr><th>Tuple</th><th>Written as</th></tr>
<tr><td><code>("add", "v1", "a", 2)</code> (and <code>sub mul div mod lt le gt ge eq ne</code>)</td><td><code>v1 = a + 2</code></td></tr>
<tr><td><code>("copy", "x", 4)</code>; <code>("neg", "t", "a")</code>, <code>("not", "t", "a")</code></td><td><code>x = 4</code>; <code>t = -a</code>, <code>t = !a</code></td></tr>
<tr><td><code>("label", "L1")</code>, <code>("jump", "L1")</code>, <code>("jumpz", "v1", "L2")</code></td><td><code>L1:</code>, <code>jump L1</code>, <code>jumpz v1 L2</code> (jump if <code>v1</code> is 0)</td></tr>
<tr><td><code>("print", "x")</code>, <code>("return", "s")</code></td><td><code>print x</code>, <code>return s</code></td></tr>
</table>
<p>A variable name is a string and a constant is an int, so the code can tell them apart with <code>isinstance</code>. Lowering an expression to TAC is a postorder walk again, but each node now returns the <em>name</em> of the operand that holds its value instead of leaving it on a stack:</p>
<pre><code>OPS = {"+": "add", "-": "sub", "*": "mul", "/": "div", "%": "mod", "&lt;": "lt", "&lt;=": "le",
       "&gt;": "gt", "&gt;=": "ge", "==": "eq", "!=": "ne"}
SYMBOL = {v: k for k, v in OPS.items()}

def show(ins):                            # TAC tuple -&gt; readable text
    op = ins[0]
    if op in SYMBOL:
        return f"{ins[1]} = {ins[2]} {SYMBOL[op]} {ins[3]}"
    if op == "copy":
        return f"{ins[1]} = {ins[2]}"
    if op in ("neg", "not"):
        return f"{ins[1]} = {'-' if op == 'neg' else '!'}{ins[2]}"
    if op == "label":
        return ins[1] + ":"
    return " ".join(str(x) for x in ins)

class Lower:
    def __init__(self):
        self.code, self.count = [], 0

    def temp(self):                       # a fresh temporary
        self.count += 1
        return f"v{self.count}"

    def expr(self, e, dest=None):         # emit code for e; return the operand holding its value
        if e[0] in ("num", "var"):
            if dest is None:
                return e[1]
            self.code.append(("copy", dest, e[1]))   # x = 4 or x = y
            return dest
        a = self.expr(e[2])
        b = self.expr(e[3])
        t = dest or self.temp()           # the result goes into dest if one is given
        self.code.append((OPS[e[1]], t, a, b))
        return t

low = Lower()
result = low.expr(("bin", "*", ("bin", "+", ("var", "a"), ("num", 2)), ("bin", "-", ("var", "a"), ("var", "b"))))
for ins in low.code:
    print(show(ins))
print(result)   # v3</code></pre>
<pre data-label="Output"><code>v1 = a + 2
v2 = a - b
v3 = v1 * v2
v3</code></pre>
<p>An assignment <code>x = e</code> passes <code>x</code> as the destination, <code>expr(e, "x")</code>, so the last instruction writes straight into <code>x</code> instead of a fresh temporary that would then need a copy; a constant or variable <code>e</code> becomes a copy:</p>
<pre><code>low = Lower()
low.expr(("num", 4), "x")
low.expr(("bin", "*", ("var", "x"), ("num", 2)), "y")
low.expr(("bin", "+", ("var", "s"), ("bin", "*", ("var", "y"), ("num", 3))), "s")
print([show(ins) for ins in low.code])   # ['x = 4', 'y = x * 2', 'v1 = y * 3', 's = s + v1']</code></pre>
<p>Inner operations still get temporaries, as <code>v1</code> shows. Other statements lower as in Lesson 4, with named labels instead of addresses: <code>while</code> becomes a label, the condition, a <code>jumpz</code> out, the body and a <code>jump</code> back. (A short-circuit <code>&amp;&amp;</code> becomes jumps too; the lowering above handles only arithmetic, to keep it short.) Here is a Mini function and its TAC, the running example for the rest of the lesson:</p>
<pre data-label="Mini"><code>fun f(a: int): int {
    var x: int = 4;
    var y: int = x * 2;
    var s: int = 0;
    while a &gt; 0 {
        s = s + y;
        a = a - 1;
    }
    return s;
}</code></pre>
<pre data-label="TAC"><code>    x = 4
    y = x * 2
    s = 0
L1: v1 = a &gt; 0
    jumpz v1 L2
    s = s + y
    a = a - 1
    jump L1
L2: return s</code></pre>

<h3>Basic blocks and control-flow graphs</h3>
<p>A <strong>basic block</strong> is a maximal sequence of instructions that control enters only at the first and leaves only at the last: no label inside it (so no jump lands in the middle) and no jump before its end. Within a block, every instruction runs exactly when the first one does, so a block can be analysed like straight-line code. To split code into blocks, find the <strong>leaders</strong>, the instructions that start a block:</p>
<ol>
<li>the first instruction;</li>
<li>every label (a jump may land there);</li>
<li>every instruction just after a <code>jump</code>, <code>jumpz</code> or <code>return</code> (control may not fall into it).</li>
</ol>
<p>Each block runs from a leader up to, not including, the next leader. The <strong>control-flow graph</strong> (CFG) has the blocks as vertices and an edge from <em>B</em> to <em>C</em> when control can pass directly from <em>B</em> to <em>C</em>: <em>B</em> ends in <code>jump</code> to <em>C</em>'s label; <em>B</em> ends in <code>jumpz</code>, giving edges to the label's block and to the next block (the condition may go either way); or <em>B</em> doesn't end in a jump or return and <em>C</em> follows it. A block that ends in <code>return</code> has no successors. For the example, naming each block after its label, or B plus its position if it has none:</p>
<figure class="fig"><svg viewBox="0 0 440 250" width="440" role="img" aria-label="The control-flow graph: B0 (x = 4, y = x * 2, s = 0) leads to L1 (v1 = a > 0, jumpz v1 L2). L1 leads to B2 (s = s + y, a = a - 1, jump L1) and to L2 (return s). B2 leads back to L1.">
<defs><marker id="cp5arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path class="ln" d="M0 0 L10 5 L0 10 z"/></marker></defs>
<g class="box"><rect x="140" y="10" width="160" height="56"/><rect x="140" y="100" width="160" height="40"/><rect x="290" y="180" width="140" height="56"/><rect x="20" y="186" width="120" height="30"/></g>
<g class="text code"><text x="150" y="28">x = 4</text><text x="150" y="44">y = x * 2</text><text x="150" y="60">s = 0</text>
<text x="150" y="116">v1 = a > 0</text><text x="150" y="132">jumpz v1 L2</text>
<text x="300" y="198">s = s + y</text><text x="300" y="214">a = a - 1</text><text x="300" y="230">jump L1</text>
<text x="30" y="206">return s</text></g>
<g class="text m"><text x="132" y="30" text-anchor="end">B0</text><text x="132" y="120" text-anchor="end">L1</text><text x="438" y="176" text-anchor="end">B2</text><text x="20" y="180">L2</text></g>
<g class="ln" fill="none"><line x1="220" y1="66" x2="220" y2="98" marker-end="url(#cp5arr)"/><line x1="250" y1="140" x2="320" y2="178" marker-end="url(#cp5arr)"/><line x1="180" y1="140" x2="110" y2="184" marker-end="url(#cp5arr)"/><path d="M400 180 C400 120 360 120 302 120" marker-end="url(#cp5arr)"/></g>
</svg><figcaption>The CFG of <code>f</code>. The loop is the cycle L1 → B2 → L1.</figcaption></figure>
<p>Optimizations are <strong>local</strong> if they work inside one block and <strong>global</strong> if they work on a whole function's CFG.</p>

<h3>Constant folding and propagation</h3>
<p><strong>Constant folding</strong> computes, at compile time, an operation whose operands are all constants: <code>t = 4 * 2</code> becomes <code>t = 8</code>. <strong>Constant propagation</strong> replaces a variable that is known to hold a constant by the constant: after <code>x = 4</code>, the <code>x</code> in <code>y = x * 2</code> can be 4, which then folds. Together, in one pass over a block, they keep a dictionary of variables known to be constant at the current point. A variable leaves the dictionary when it is assigned something non-constant.</p>
<pre><code>def cdiv(a, b):                       # Mini's division: round toward zero
    q = abs(a) // abs(b)
    return q if (a &lt; 0) == (b &lt; 0) else -q

FOLD = {"add": lambda a, b: a + b, "sub": lambda a, b: a - b, "mul": lambda a, b: a * b,
        "div": cdiv, "mod": lambda a, b: a - b * cdiv(a, b),
        "lt": lambda a, b: int(a &lt; b), "le": lambda a, b: int(a &lt;= b), "gt": lambda a, b: int(a &gt; b),
        "ge": lambda a, b: int(a &gt;= b), "eq": lambda a, b: int(a == b), "ne": lambda a, b: int(a != b)}

def fold_block(block):
    known, out = {}, []                   # known: variable -&gt; its constant value at this point
    for ins in block:
        op = ins[0]
        if op in FOLD:
            d = ins[1]
            a, b = [known.get(x, x) if isinstance(x, str) else x for x in ins[2:]]
            if isinstance(a, int) and isinstance(b, int) and not (op in ("div", "mod") and b == 0):
                ins = ("copy", d, FOLD[op](a, b))          # folded
            else:
                ins = (op, d, a, b)                        # propagated what we could
        elif op in ("neg", "not"):
            a = known.get(ins[2], ins[2]) if isinstance(ins[2], str) else ins[2]
            if isinstance(a, int):
                ins = ("copy", ins[1], -a if op == "neg" else int(a == 0))   # folded
            else:
                ins = (op, ins[1], a)
        elif op == "copy" and isinstance(ins[2], str):
            ins = ("copy", ins[1], known.get(ins[2], ins[2]))
        if op in FOLD or op in ("copy", "neg", "not"):   # every instruction that writes a variable
            if ins[0] == "copy" and isinstance(ins[2], int):
                known[ins[1]] = ins[2]
            else:
                known.pop(ins[1], None)                    # no longer a known constant
        out.append(ins)
    return out

block = [("copy", "x", 4), ("mul", "y", "x", 2), ("add", "z", "y", "a"), ("sub", "w", "x", 4),
         ("copy", "x", "a"), ("add", "v", "x", 1), ("div", "q", "y", "w")]
for ins in fold_block(block):
    print(show(ins))</code></pre>
<pre data-label="Output"><code>x = 4
y = 8
z = 8 + a
w = 0
x = a
v = x + 1
q = 8 / 0</code></pre>
<p>Follow the dictionary: after <code>x = 4</code> it is {x: 4}; <code>y = x * 2</code> folds to 8 and adds y; <code>z = y + a</code> becomes <code>8 + a</code>, which can't fold, so z is not known; <code>w = x - 4</code> folds to 0. Then <code>x = a</code> removes x, because x is no longer 4, so <code>v = x + 1</code> stays. Finally <code>q = y / w</code> becomes <code>8 / 0</code> and is <em>not</em> folded.</p>
<p>Every instruction that writes a variable must update the dictionary, <code>neg</code> and <code>not</code> included (<code>!</code> gives 1 for 0 and 0 otherwise). If <code>x = -a</code> left the entry x: 4 in place, the next use of x would wrongly become 4:</p>
<pre><code>print([show(i) for i in fold_block([("copy", "x", 4), ("neg", "x", "a"), ("add", "y", "x", 1), ("not", "z", 0)])])   # ['x = 4', 'x = -a', 'y = x + 1', 'z = 1']</code></pre>
<p>That last line is the rule every optimization obeys: <strong>preserve the program's meaning exactly</strong>, including its errors. Folding <code>8 / 0</code> would crash the compiler, or remove a crash the program is supposed to have. Folding must also use the source language's arithmetic: <code>cdiv</code>, not Python's <code>//</code>, and in a language with 32-bit integers, wrap-around (CS 210 Lesson 1). Some rewrites that are true in mathematics are false for computers: <code>(a + b) - b</code> is <code>a</code> for integers, but not for floating point, where <code>(1e16 + 1) - 1e16</code> is 0 (CS 210 Lesson 2), so compilers never apply it to floats unless told to (GCC's <code>-ffast-math</code>).</p>
<p><strong>Algebraic simplification</strong> uses identities that hold whatever a variable's value: <code>x + 0</code>, <code>x - 0</code>, <code>x * 1</code> and <code>x / 1</code> are just <code>x</code>, and <code>x * 0</code> is 0. A related idea, <strong>strength reduction</strong>, replaces an expensive operation by a cheaper one: <code>x * 8</code> by a shift left by 3 (CS 210 Lesson 1).</p>

<h3>Liveness</h3>
<p>After folding, <code>x = 4</code> in block B0 is useless: nothing reads that <code>x</code> any more. Removing it is <strong>dead-code elimination</strong>, and to do it safely we need to know which values may still be needed. A variable is <strong>live</strong> at a point in the program if some path from that point reads it before assigning it again; otherwise it is <strong>dead</strong> there. An assignment to a variable that is dead just after it can be deleted (if it has no other effect).</p>
<p>Liveness flows backward: whether <em>x</em> is live here depends on what happens later. For each block <em>B</em>, define:</p>
<ul>
<li>use[<em>B</em>]: the variables <em>B</em> reads before writing them (live on entry whatever follows);</li>
<li>def[<em>B</em>]: the variables <em>B</em> writes;</li>
<li>in[<em>B</em>] and out[<em>B</em>]: the variables live on entry to and exit from <em>B</em>.</li>
</ul>
<p>They satisfy the <strong>dataflow equations</strong>:</p>
<p class="math">out[<em>B</em>] = ∪ in[<em>S</em>] over the successors <em>S</em> of <em>B</em>    in[<em>B</em>] = use[<em>B</em>] ∪ (out[<em>B</em>] − def[<em>B</em>])</p>
<p>A variable is live leaving <em>B</em> if some successor needs it; it is live entering <em>B</em> if <em>B</em> reads it first, or if it is needed later and <em>B</em> doesn't overwrite it. The equations refer to each other around the loop (in[L1] depends on out[L1], which depends on in[B2], which depends on out[B2] = in[L1]), so they can't be solved in one pass. Instead, start with every set empty and apply the equations to every block, again and again, until a whole round changes nothing. The result is a <strong>fixed point</strong>: sets that satisfy every equation at once.</p>
<pre><code>def uses(ins):                            # variables an instruction reads
    op = ins[0]
    if op in FOLD:
        args = ins[2:4]
    elif op in ("copy", "neg", "not"):
        args = ins[2:3]
    elif op in ("print", "return", "jumpz"):
        args = ins[1:2]
    else:
        args = ()
    return {a for a in args if isinstance(a, str)}

def defines(ins):                         # the variable an instruction writes, or None
    return ins[1] if ins[0] in FOLD or ins[0] in ("copy", "neg", "not") else None

def liveness(blocks, succ):
    use, kill = {}, {}                    # kill is def[B]; def is a Python keyword
    for b, code in blocks.items():
        use[b], kill[b] = set(), set()
        for ins in code:
            use[b] |= uses(ins) - kill[b]     # read before any write in this block
            if defines(ins) is not None:
                kill[b].add(defines(ins))
    live_in = {b: set() for b in blocks}
    live_out = {b: set() for b in blocks}
    changed = True
    while changed:
        changed = False
        for b in blocks:
            out = set()
            for s in succ[b]:
                out |= live_in[s]
            inn = use[b] | (out - kill[b])
            if out != live_out[b] or inn != live_in[b]:
                live_out[b], live_in[b] = out, inn
                changed = True
    return live_in, live_out

blocks = {
    "B0": [("copy", "x", 4), ("mul", "y", "x", 2), ("copy", "s", 0)],
    "L1": [("gt", "v1", "a", 0), ("jumpz", "v1", "L2")],
    "B2": [("add", "s", "s", "y"), ("sub", "a", "a", 1), ("jump", "L1")],
    "L2": [("return", "s")],
}
succ = {"B0": ["L1"], "L1": ["B2", "L2"], "B2": ["L1"], "L2": []}
live_in, live_out = liveness(blocks, succ)
for b in blocks:
    print(b, sorted(live_in[b]), sorted(live_out[b]))</code></pre>
<pre data-label="Output"><code>B0 ['a'] ['a', 's', 'y']
L1 ['a', 's', 'y'] ['a', 's', 'y']
B2 ['a', 's', 'y'] ['a', 's', 'y']
L2 ['s'] []</code></pre>
<p>Here use and def are: B0 uses nothing and defines x, y, s; L1 uses a and defines v1; B2 uses a, s, y and defines a, s; L2 uses s. Visiting the blocks in the order B0, L1, B2, L2, the sets (in / out) after each round are:</p>
<table>
<tr><th>Round</th><th>B0</th><th>L1</th><th>B2</th><th>L2</th></tr>
<tr><td>1</td><td>∅ / ∅</td><td>{a} / ∅</td><td>{a, s, y} / {a}</td><td>{s} / ∅</td></tr>
<tr><td>2</td><td>{a} / {a}</td><td>{a, s, y} / {a, s, y}</td><td>{a, s, y} / {a, s, y}</td><td>{s} / ∅</td></tr>
<tr><td>3</td><td>{a} / {a, s, y}</td><td>unchanged</td><td>unchanged</td><td>unchanged</td></tr>
<tr><td>4</td><td colspan="4">no changes: fixed point</td></tr>
</table>
<p>In round 1, L1 is visited before B2 and L2 have any live variables, so its out set is still empty; information about the loop arrives in round 2. Visiting the blocks in reverse order, which suits a backward analysis, reaches the same answer in 3 rounds.</p>
<p>Why does the iteration stop, and with the right answer? Each set only ever grows: starting from empty, the equations take unions, and if every in set is larger, every out set computed from them is at least as large, so a set never shrinks from one round to the next. The sets are drawn from the finitely many variables of the function, so they can't grow forever; with <em>b</em> blocks and <em>v</em> variables there are at most <em>bv</em> additions before every round is unchanged. And because we started from empty and only added what the equations force, the result is the <em>smallest</em> solution, so no variable is called live without a reason. The same pattern, sets over a CFG, equations that only grow the sets, iterate to a fixed point, solves a whole family of <strong>dataflow analyses</strong>: which assignments may reach a point (reaching definitions, run forward), which expressions are already computed (available expressions), and more. Gary Kildall described this general framework in 1973. Lesson 2's FIRST sets were computed by a small fixed-point iteration of the same kind.</p>

<h3>Dead-code elimination</h3>
<p>With out[<em>B</em>] known, walk each block backward from its end, keeping the set of variables live at the current point. An instruction that defines a variable not in the set is dead and is deleted. Otherwise, remove the variable it defines from the set (it is written here, so it isn't needed before this point) and add the variables it reads. Deleting an instruction also deletes its reads, so the walk finds chains of dead code within a block in one pass. We keep every <code>div</code> and <code>mod</code>, which might divide by zero, and every <code>print</code>, <code>jump</code> and <code>return</code>: they have effects beyond the value they compute.</p>
<pre><code>def remove_dead(block, live):
    live, kept = set(live), []
    for ins in reversed(block):
        d = defines(ins)
        if d is not None and d not in live and ins[0] not in ("div", "mod"):
            continue                          # dead: nothing later reads d
        if d is not None:
            live.discard(d)
        live |= uses(ins)
        kept.append(ins)
    return kept[::-1]

b0 = fold_block(blocks["B0"])
print([show(i) for i in b0])   # ['x = 4', 'y = 8', 's = 0']
print([show(i) for i in remove_dead(b0, live_out["B0"])])   # ['y = 8', 's = 0']</code></pre>
<p>Folding made <code>x = 4</code> dead, and liveness proved it: x isn't in out[B0], and the block no longer reads it. One optimization creates opportunities for another, so compilers run them in sequence, often several times. Removing code can also make code in <em>other</em> blocks dead. Liveness was computed before anything was deleted, so if a deleted instruction in one block was the only reader of a variable defined in an earlier block, that variable is still in the earlier block's out set, and its definition survives the walk. So dead-code elimination is repeated, recomputing liveness, until a pass deletes nothing.</p>
<p>Two other kinds of optimization matter enormously in practice. <strong>Loop-invariant code motion</strong> moves a computation that gives the same value on every iteration out of the loop: a loop that computes <code>n * 4</code> each time with <code>n</code> unchanged can compute it once before the loop. <strong>Inlining</strong> replaces a call by a copy of the callee's body, which removes the call's overhead and, more importantly, exposes the body to every other optimization in the context of its arguments.</p>
<p class="note">Why it matters: an optimization is only as good as the analysis that proves it safe. Liveness, the analysis built here, also drives register allocation in Lesson 6: two variables that are never live at the same time can share a register.</p>
`,
    terms: [
      ["Three-address code (TAC)", "An IR in which each instruction performs one operation on at most two operands and names its result."],
      ["Temporary", "A variable the compiler invents to hold an intermediate result."],
      ["Basic block", "A maximal sequence of instructions entered only at the first and left only at the last."],
      ["Leader", "An instruction that starts a basic block: the first instruction, a label, or one after a jump or return."],
      ["Control-flow graph (CFG)", "A directed graph whose vertices are basic blocks and whose edges show where control can go next."],
      ["Constant folding", "Computing an operation on constant operands at compile time."],
      ["Constant propagation", "Replacing a variable known to hold a constant by that constant."],
      ["Algebraic simplification", "Rewriting by identities that hold for every value, such as x + 0 = x and x × 1 = x."],
      ["Strength reduction", "Replacing an expensive operation by a cheaper equivalent, such as a multiplication by 8 with a shift."],
      ["Live variable", "A variable whose current value may be read later, on some path, before being overwritten."],
      ["Dataflow analysis", "Computing facts at each point of a CFG from equations relating each block to its neighbours, solved by iteration."],
      ["Fixed point", "A solution that applying the equations again leaves unchanged."],
      ["Dead-code elimination", "Deleting instructions whose results are never used and that have no other effect."],
      ["Loop-invariant code motion", "Moving a computation whose value doesn't change between iterations out of the loop."],
      ["Inlining", "Replacing a function call with a copy of the function's body."]
    ],
    quiz: [
      { q: "Which of these instructions start a basic block (are leaders)? 1: a = 1   2: L1:   3: b = a + 1   4: jumpz b L2   5: c = 2   6: L2:   7: return c", choices: ["1, 2, 5, 6", "1, 3, 5, 7", "2 and 6 only", "1, 2, 4, 6"], answer: 0, why: "The first instruction, the labels L1 and L2, and c = 2, which follows the jumpz." },
      { q: "In a block, after x = 6 and y = x / 3, what do constant propagation and folding give for z = y - 2?", choices: ["z = y - 2", "z = 0", "z = 2 - 2", "z = 4"], answer: 1, why: "y = 6 / 3 folds to 2, so z = 2 − 2 folds to 0." },
      { q: "Why must the optimizer not fold q = 8 / 0?", choices: ["Python can't compute it", "It would change the program's behaviour: the division must fail when it runs, and only if it runs", "Division can never be folded", "8 / 0 is 0 in Mini"], answer: 1, why: "Optimizations must preserve meaning, including errors, and the compiler must not crash." },
      { q: "In the equations in[B] = use[B] ∪ (out[B] − def[B]), why is def[B] subtracted?", choices: ["To make the sets smaller for speed", "A variable written in B before being read isn't needed on entry to B: its old value is overwritten", "Because def[B] is always empty", "To avoid counting temporaries"], answer: 1, why: "Values needed after B that B itself produces don't have to come in." },
      { q: "Why is liveness solved by iteration rather than one pass over the blocks?", choices: ["Python is slow", "Loops make the equations depend on each other in a cycle", "The sets are infinite", "Liveness is undecidable"], answer: 1, why: "Around a loop, each block's sets depend on the others, so information must travel around the cycle." },
      { q: "Why does the iteration always stop?", choices: ["Because CFGs are acyclic", "Because the sets only grow and are subsets of the finite set of variables", "Because each block is visited once", "It doesn't always stop"], answer: 1, why: "A growing sequence of subsets of a finite set must stop changing." }
    ],
    practice: [
      {
        q: `<p>Lower <code>(x - 1) * (x + y) / 2</code> to TAC with <code>Lower</code>, then run <code>fold_block</code> on the result after first adding <code>("copy", "x", 3)</code> at the front. What remains?</p>`,
        a: `<p>Lowering gives <code>v1 = x - 1</code>, <code>v2 = x + y</code>, <code>v3 = v1 * v2</code>, <code>v4 = v3 / 2</code>. With x = 3: <code>v1 = 2</code> folds; <code>v2 = 3 + y</code> can't (y unknown); <code>v3 = 2 * v2</code>; <code>v4 = v3 / 2</code>. Is <code>2 * v2 / 2</code> just <code>v2</code>? For Mini's unbounded integers, yes, and an algebraic rule could simplify it. With 32-bit wrap-around arithmetic it isn't when 2 × <code>v2</code> overflows, so whether a compiler may apply such a rule depends on the language's integer semantics. (C compilers do apply it to signed integers, because C declares signed overflow undefined; see this lesson's sidebar.)</p>
<pre><code>low = Lower()
low.expr(("bin", "/", ("bin", "*", ("bin", "-", ("var", "x"), ("num", 1)), ("bin", "+", ("var", "x"), ("var", "y"))), ("num", 2)))
print([show(i) for i in fold_block([("copy", "x", 3)] + low.code)])   # ['x = 3', 'v1 = 2', 'v2 = 3 + y', 'v3 = 2 * v2', 'v4 = v3 / 2']</code></pre>`
      },
      {
        q: `<p>Split this TAC into basic blocks and give each block's successors:</p>
<pre data-label="TAC"><code>    i = 0
L1: v1 = i &lt; n
    jumpz v1 L3
    v2 = i % 2
    jumpz v2 L2
    print i
L2: i = i + 1
    jump L1
L3: return i</code></pre>`,
        a: `<p>Leaders: <code>i = 0</code> (first), <code>L1</code>, <code>v2 = i % 2</code> (after a jumpz), <code>print i</code> (after a jumpz), <code>L2</code>, <code>L3</code>. Blocks: B0 = [i = 0] → L1. L1 = [v1 = i &lt; n, jumpz v1 L3] → B2 and L3. B2 = [v2 = i % 2, jumpz v2 L2] → B3 and L2. B3 = [print i] → L2 (falls through). L2 = [i = i + 1, jump L1] → L1. L3 = [return i], no successors. (Blocks without labels are named B plus their position, 0 to 5.)</p>`
      },
      {
        q: `<p>Compute use, def, in and out for every block of the previous problem, with the iterative method. Which variables are live at the start of the function?</p>`,
        hint: `<p>Work backward from L3. Remember that <code>n</code> is read but never written.</p>`,
        a: `<p>use/def: B0: ∅ / {i}; L1: {i, n} / {v1}; B2: {i} / {v2}; B3: {i} / ∅; L2: {i} / {i}; L3: {i} / ∅. Solution: in[L3] = {i}; L1's in and out sets are {i, n}, as are those of B2, B3 and L2 (n is needed on every trip back to the test); out[L3] = ∅; in[B0] = {n}, out[B0] = {i, n}. So only <code>n</code> is live at the start: it is the function's input, while <code>i</code> is written before it is read.</p>
<pre><code>bl = {"B0": [("copy", "i", 0)], "L1": [("lt", "v1", "i", "n"), ("jumpz", "v1", "L3")],
      "B2": [("mod", "v2", "i", 2), ("jumpz", "v2", "L2")], "B3": [("print", "i")],
      "L2": [("add", "i", "i", 1), ("jump", "L1")], "L3": [("return", "i")]}
sc = {"B0": ["L1"], "L1": ["B2", "L3"], "B2": ["B3", "L2"], "B3": ["L2"], "L2": ["L1"], "L3": []}
li, lo = liveness(bl, sc)
print(sorted(li["B0"]), sorted(lo["B2"]), sorted(li["L3"]))   # ['n'] ['i', 'n'] ['i']</code></pre>`
      },
      {
        q: `<p>Run <code>remove_dead</code> by hand on the block <code>a = b + 1; c = a * 2; a = 7; d = c / b; e = a + 1</code> with only <code>e</code> live on exit. Which instructions survive, and why does the division survive even though <code>d</code> is dead? What would happen in a second round?</p>`,
        a: `<p>Backward, with live = {e}: <code>e = a + 1</code> is kept; live = {a}. <code>d = c / b</code>: d is dead, but it is a division, kept; live = {a, b, c}. <code>a = 7</code> is kept (a is live); live = {b, c}. <code>c = a * 2</code> kept; live = {a, b}. <code>a = b + 1</code> kept; live = {b}. Everything survives, only because the division might fail when b is 0, and must then fail exactly as the original program does. If the language (or a proof that b ≠ 0) let us delete it, the walk would continue with live = {a} at that point: <code>a = 7</code> kept, then <code>c = a * 2</code> and <code>a = b + 1</code> deleted, leaving <code>a = 7; e = a + 1</code>, and constant folding would then make it <code>a = 7; e = 8</code>.</p>
<pre><code>blk = [("add", "a", "b", 1), ("mul", "c", "a", 2), ("copy", "a", 7), ("div", "d", "c", "b"), ("add", "e", "a", 1)]
print(len(remove_dead(blk, {"e"})))   # 5</code></pre>`
      }
    ],
    sources: ["dragonbook", "appel", "kildall73"]
  },
  {
    id: "cp6",
    title: "Register allocation and the back end",
    minutes: 90,
    summary: "Why registers matter; interference graphs built from liveness; register allocation as graph colouring, which is NP-complete; Chaitin's simplify-and-select heuristic, spill costs and spill code; instruction selection from three-address code to RISC-V; the RISC-V calling convention and how it constrains allocation; a comparison with Clang's output; and where production compilers and JITs go further.",
    notes: `
<p>Lesson 4's VM keeps every value on a stack in memory. A real processor computes on <strong>registers</strong>: RISC-V has 32 (CS 230 Lesson 4), and an <code>add</code> on registers takes one cycle, while a load that misses the cache can take a hundred or more (CS 210 Lesson 7). So the most important job of a compiler's back end is to keep the values in use in registers. A function has many more variables and temporaries than there are registers, but not all of them are needed at once, and that is where Lesson 5's liveness comes in.</p>

<h3>Interference</h3>
<p>Two variables <strong>interfere</strong> if they are live at the same point, so they hold values that are both still needed and can't share a register. Two that never interfere can share one: once a value is dead, its register is free for another. Take this block, the TAC for <code>(a + b) * (a - b) + c</code>, with <code>a</code>, <code>b</code> and <code>c</code> live on entry (they are parameters) and nothing live after the return:</p>
<table>
<tr><th>Instruction</th><th>Live just after it</th></tr>
<tr><td>(entry)</td><td>a, b, c</td></tr>
<tr><td><code>v1 = a + b</code></td><td>a, b, c, v1</td></tr>
<tr><td><code>v2 = a - b</code></td><td>c, v1, v2</td></tr>
<tr><td><code>v3 = v1 * v2</code></td><td>c, v3</td></tr>
<tr><td><code>v4 = v3 + c</code></td><td>v4</td></tr>
<tr><td><code>return v4</code></td><td>(none)</td></tr>
</table>
<p>The table is computed backward, exactly as <code>remove_dead</code> walked a block in Lesson 5: start from the live-out set, and at each instruction remove the variable it defines and add the ones it reads. The <strong>interference graph</strong> has a vertex per variable and an edge between every two that interfere. It is built in the same backward walk: at each instruction that defines <em>d</em>, add an edge from <em>d</em> to every other variable live just after it. (If the instruction is a copy <code>d = s</code>, skip the edge to <em>s</em>: the two hold the same value, so sharing a register is fine, and then the copy disappears.) The variables live together on entry also interfere with each other. For the block:</p>
<table>
<tr><th>Variable</th><th>Interferes with</th></tr>
<tr><td>a</td><td>b, c, v1</td></tr>
<tr><td>b</td><td>a, c, v1</td></tr>
<tr><td>c</td><td>a, b, v1, v2, v3</td></tr>
<tr><td>v1</td><td>a, b, c, v2</td></tr>
<tr><td>v2</td><td>c, v1</td></tr>
<tr><td>v3</td><td>c</td></tr>
<tr><td>v4</td><td>(none)</td></tr>
</table>
<p>Just after <code>v1 = a + b</code>, four values are live: a, b, c and v1 form a <strong>clique</strong>, four vertices all joined to each other, so they need four different registers. The largest number of values live at one point is called the <strong>register pressure</strong>, and no allocation can use fewer registers than that.</p>

<h3>Allocation as graph colouring</h3>
<p>Give each register a colour. An assignment of registers to variables in which interfering variables get different registers is exactly a <strong>colouring</strong> of the interference graph in which adjacent vertices get different colours. With <em>k</em> registers, the question "can every variable have a register?" is "is the graph <em>k</em>-colourable?", and CS 220 Lesson 8 showed that graph colouring is NP-complete. Gregory Chaitin and his colleagues at IBM made this connection practical in 1981–82, with a fast heuristic that works very well on real programs. It rests on one observation:</p>
<div class="callout"><p>If a vertex has fewer than <em>k</em> neighbours, it can always be coloured, whatever colours its neighbours get: they use at most <em>k</em> − 1 colours, leaving one free. So remove it, colour the rest of the graph, and put it back last.</p></div>
<p>Removing a vertex lowers its neighbours' degrees, which may let them be removed too. The algorithm has two phases:</p>
<ol>
<li><strong>Simplify.</strong> Repeatedly remove a vertex with fewer than <em>k</em> neighbours (in the graph that remains), pushing it on a stack. If every remaining vertex has <em>k</em> or more neighbours, choose a <strong>spill candidate</strong>, the vertex whose value is cheapest to keep in memory instead, and remove and push it anyway.</li>
<li><strong>Select.</strong> Pop the vertices in reverse order, giving each the lowest-numbered colour not used by its neighbours that are already coloured. A vertex removed because its degree was below <em>k</em> always gets a colour. A spill candidate might too, if its neighbours happened to share colours; if no colour is free, it is <strong>spilled</strong>: it lives in memory.</li>
</ol>
<p>The spill cost of a variable estimates the memory traffic that spilling it adds: one load per use and one store per definition. Here every use or definition counts 1, and a parameter counts one definition on entry, since spilling it means storing the value it arrives with; real allocators multiply by 10 for each loop the instruction is inside, since it runs many times. Dividing the cost by the vertex's current degree favours spilling a variable that is cheap and that frees many neighbours. With <em>k</em> = 3, using cost / degree and breaking ties by name, the simplify phase runs:</p>
<table>
<tr><th>Step</th><th>Removed</th><th>Why</th></tr>
<tr><td>1</td><td>v2</td><td>degree 2 &lt; 3 (v3 and v4 qualify too; take names in alphabetical order)</td></tr>
<tr><td>2</td><td>v3</td><td>degree 1</td></tr>
<tr><td>3</td><td>v4</td><td>degree 0</td></tr>
<tr><td>4</td><td>c</td><td>stuck: a, b, c, v1 all have degree 3. Costs: a and b are defined on entry and used twice, 3 each; c is defined on entry and used once, 2; v1 is defined once and used once, 2. So c and v1 tie for the lowest cost / degree, 2/3, and c comes first by name</td></tr>
<tr><td>5–7</td><td>a, b, v1</td><td>a triangle: degrees 2, 1, 0 as each is removed</td></tr>
</table>
<p>Select pops v1, b, a and gives them colours 0, 1, 2. Then c: its neighbours a, b and v1 use all three colours, so c is spilled. v4, v3 and v2 get colours 0, 0 and 1. With <em>k</em> = 4 nothing gets stuck, and every variable gets a register.</p>
<p>Spilling c means keeping it in a slot of the stack frame and rewriting the code: store after each definition (c is a parameter, so once on entry) and load into a fresh temporary just before each use: <code>c1 = load c</code> right before <code>v4 = v3 + c1</code>. The new temporary is live for one instruction, so register pressure drops: the largest live set is now three (a, b, v1 after the first instruction). The allocator then rebuilds the graph and colours again, and this time it succeeds with three registers. Spilling is why a variable inside a hot loop should rarely be chosen: its loads and stores would run on every iteration.</p>
<p>Two refinements matter in practice. <strong>Coalescing</strong> merges the vertices of a copy <code>d = s</code> when they don't interfere, so both get the same register and the copy is deleted; much of the code that lowering produces is copies. <strong>Precolouring</strong> fixes some vertices in advance: a function's parameters arrive in particular registers and its result must leave in one, as the next section explains. Just-in-time compilers, which must allocate in microseconds, often use <strong>linear scan</strong> (Poletto and Sarkar, 1999) instead: sort the variables' live ranges by start and assign registers in one sweep, giving up a little quality for speed.</p>

<h3>Instruction selection for RISC-V</h3>
<p><strong>Instruction selection</strong> chooses machine instructions for each IR operation. For RISC-V most TAC instructions map to one instruction. Multiplication, division and remainder are in the <strong>M extension</strong> (<code>mul</code>, <code>div</code>, <code>rem</code>, which round toward zero like Mini), which nearly every RISC-V processor that runs an operating system has; the base RV32I of CS 230 has none of them. RISC-V has only one comparison that produces a value, <code>slt rd, rs1, rs2</code> ("set if less than": rd = 1 if rs1 &lt; rs2, else 0), so the others are built from it: <em>a</em> &gt; <em>b</em> is <em>b</em> &lt; <em>a</em>, and <em>a</em> ≤ <em>b</em> is "not (<em>b</em> &lt; <em>a</em>)", where <code>xori rd, rd, 1</code> flips a 0/1 value. For equality, <em>a</em> = <em>b</em> exactly when <em>a</em> − <em>b</em> = 0, and the assembler's pseudo-instructions <code>seqz rd, rs</code> and <code>snez rd, rs</code> (set if equal to zero, not equal to zero) test that. <code>beqz rs, L</code> (branch if zero) implements <code>jumpz</code>. A constant operand either goes in an instruction's 12-bit immediate (CS 230 Lesson 4), as with <code>addi</code>, or is loaded into a scratch register with <code>li</code>; this code reserves <code>t5</code> and <code>t6</code> for that, so the allocator must not use them. Lesson 5 named its temporaries <code>v1</code>, <code>v2</code>, … so that they can't be confused with these registers: in this lesson every <code>t0</code>–<code>t6</code> is a register. In the register maps below, each key is a TAC name and each value a register, so <code>{"v1": "t0"}</code> puts the temporary v1 in the register t0. A TAC name reaches the machine code only through the map, so even a Mini variable that happened to be called <code>t5</code> would be safe.</p>
<pre><code>SIMPLE = {"add": "add", "sub": "sub", "mul": "mul", "div": "div", "mod": "rem", "lt": "slt"}

def select(ins, reg):
    """Translate one TAC instruction to RISC-V, given a register for every variable."""
    out = []
    def src(x, scratch):                  # a register holding operand x
        if isinstance(x, int):
            out.append(f"li   {scratch}, {x}")
            return scratch
        return reg[x]
    op = ins[0]
    if op == "label":
        return [ins[1] + ":"]
    if op == "jump":
        return [f"j    {ins[1]}"]
    if op == "jumpz":
        return [f"beqz {src(ins[1], 't6')}, {ins[2]}"]
    if op == "return":
        a = src(ins[1], "a0")
        if a != "a0":
            out.append(f"mv   a0, {a}")
        return out + ["ret"]
    d = reg[ins[1]]
    if op == "copy":
        a = src(ins[2], d)
        if a != d:
            out.append(f"mv   {d}, {a}")
        return out
    if op in ("add", "sub") and isinstance(ins[3], int):
        n = ins[3] if op == "add" else -ins[3]
        if -2048 &lt;= n &lt;= 2047:            # fits addi's 12-bit immediate
            a = src(ins[2], "t5")
            return out + [f"addi {d}, {a}, {n}"]
    a, b = src(ins[2], "t5"), src(ins[3], "t6")
    if op in SIMPLE:
        out.append(f"{SIMPLE[op]:4} {d}, {a}, {b}")
    elif op == "gt":                      # a &gt; b  is  b &lt; a
        out.append(f"slt  {d}, {b}, {a}")
    elif op == "le":                      # a &lt;= b  is  not (b &lt; a)
        out += [f"slt  {d}, {b}, {a}", f"xori {d}, {d}, 1"]
    elif op == "ge":                      # a &gt;= b  is  not (a &lt; b)
        out += [f"slt  {d}, {a}, {b}", f"xori {d}, {d}, 1"]
    elif op == "eq":                      # a == b  is  (a - b) == 0
        out += [f"sub  {d}, {a}, {b}", f"seqz {d}, {d}"]
    elif op == "ne":
        out += [f"sub  {d}, {a}, {b}", f"snez {d}, {d}"]
    return out

print(select(("le", "v1", "x", 10), {"v1": "t0", "x": "a0"}))   # ['li   t6, 10', 'slt  t0, t6, a0', 'xori t0, t0, 1']</code></pre>
<p>(<code>{SIMPLE[op]:4}</code> pads the mnemonic to four characters, so the operands line up.) Pattern-matching one IR instruction at a time is the simplest kind of instruction selection. Production back ends match larger patterns: on RISC-V, <code>t = a + 8</code> followed by a load from address <code>t</code> becomes one <code>lw rd, 8(rs)</code>, where <code>rs</code> stands for the register holding <code>a</code> and <code>rd</code> for the one that receives the loaded word (not the return-address register <code>ra</code>), since loads take an offset.</p>

<h3>The calling convention</h3>
<p>Separately compiled functions can call each other only if they agree where things go: CS 210 Lesson 6's calling convention, now for RISC-V. Its ABI (the RISC-V psABI, the rules CS 230 Lesson 4 mentioned) says:</p>
<ul>
<li>Arguments go in <code>a0</code>–<code>a7</code> (more go on the stack), and the result comes back in <code>a0</code>.</li>
<li><code>jal ra, f</code> (written <code>call f</code>) puts the return address in <code>ra</code>, and <code>ret</code> jumps back to it.</li>
<li><code>sp</code> is the stack pointer; the stack grows down, and <code>sp</code> stays a multiple of 16.</li>
<li><strong>Callee-saved</strong> registers <code>s0</code>–<code>s11</code> (and <code>sp</code>) must have the same values when a function returns as when it was called; a function that uses one saves it in its frame first and restores it at the end. <strong>Caller-saved</strong> registers <code>t0</code>–<code>t6</code>, <code>a0</code>–<code>a7</code> and <code>ra</code> may be changed by any call.</li>
</ul>
<p>The convention shapes allocation. Parameters are precoloured: <code>a</code>, <code>b</code>, <code>c</code> arrive in <code>a0</code>, <code>a1</code>, <code>a2</code>, and the returned value must end in <code>a0</code>. A value live <em>across</em> a call can't stay in a caller-saved register, so the allocator puts it in an <code>s</code> register (paying for one save and restore per function) or spills it; values that aren't live across a call are best in <code>t</code> and <code>a</code> registers, which cost nothing to use. A function that calls nothing (a <em>leaf</em>) usually needs no stack frame at all.</p>
<p>Colouring the example with parameters precoloured: v1 interferes with a, b and c, so it needs a fourth register, say <code>a3</code>; v2, v3 and v4 interfere only with values in other registers and can all reuse <code>a0</code>, which also puts the result where the convention wants it.</p>
<pre><code>block = [("add", "v1", "a", "b"), ("sub", "v2", "a", "b"), ("mul", "v3", "v1", "v2"),
         ("add", "v4", "v3", "c"), ("return", "v4")]
reg = {"a": "a0", "b": "a1", "c": "a2", "v1": "a3", "v2": "a0", "v3": "a0", "v4": "a0"}
for ins in block:
    for line in select(ins, reg):
        print(line)</code></pre>
<pre data-label="Output"><code>add  a3, a0, a1
sub  a0, a0, a1
mul  a0, a3, a0
add  a0, a0, a2
ret</code></pre>
<p>Here is what Clang 18 produces for the same function written in C, <code>int h(int a, int b, int c) { return (a + b) * (a - b) + c; }</code>, compiled for RISC-V with <code>clang --target=riscv32 -march=rv32im -O1 -S</code>:</p>
<pre data-label="RISC-V"><code>h:
	add	a3, a1, a0
	sub	a0, a0, a1
	mul	a0, a3, a0
	add	a0, a0, a2
	ret</code></pre>
<p>The same five instructions, with the same registers (Clang wrote the commutative <code>a + b</code> as <code>a1, a0</code>). Our stack bytecode for this function needs 11 instructions (counting its <code>alloc 0</code> and <code>ret</code>), every one of which reads or writes the stack in memory. At <code>-O0</code>, Clang keeps every variable in the stack frame, as our VM does, and the same function takes 18 instructions, including a prologue that saves <code>ra</code> and <code>s0</code> and moves <code>sp</code>, and loads and stores for every variable.</p>
<p>Real compilers also transform whole functions. For Lesson 4's recursive factorial in C, Clang at <code>-O1</code> produces no call at all:</p>
<pre data-label="RISC-V"><code>fact:
	mv	a1, a0
	li	a0, 1
	li	a2, 2
	blt	a1, a2, .LBB2_2
.LBB2_1:
	addi	a3, a1, -1
	mul	a0, a0, a1
	mv	a1, a3
	bge	a1, a2, .LBB2_1
.LBB2_2:
	ret</code></pre>
<p>It noticed that <code>n * fact(n - 1)</code> can be computed by keeping a running product (here in <code>a0</code>) and turned the recursion into a loop: no stack frames, and no stack overflow for large <em>n</em>.</p>

<h3>Beyond this course</h3>
<ul>
<li><strong>SSA form.</strong> Most modern optimizers, including GCC's and LLVM's, use <em>static single assignment</em>, an IR in which every variable is assigned exactly once (a reassigned variable gets a new numbered version, and special φ instructions merge versions where control flow joins). Many analyses, including constant propagation across blocks, become simple and fast on it. LLVM's IR, used by Clang, Rust and Swift, is in SSA form.</li>
<li><strong>Instruction scheduling</strong> reorders independent instructions so that a load's result isn't needed by the very next instruction, avoiding the pipeline stalls of CS 230 Lesson 6.</li>
<li><strong>Vectorization</strong> turns a loop over array elements into SIMD instructions that process several elements per instruction (CS 230 Lesson 8's data-level parallelism).</li>
<li><strong>Just-in-time (JIT) compilers</strong>, such as Java's HotSpot, JavaScript's V8 and Python's PyPy, compile while the program runs. They start by interpreting bytecode, count which parts (functions or loops) run most, and compile those to machine code, using what they observed (this variable has always been an integer) to optimize, with a check that falls back to the interpreter if the assumption ever fails.</li>
</ul>
<p class="note">Why it matters: every phase of this course is in every production compiler, from the lexer to the register allocator. When code is slow, reading the compiler's output (Clang's <code>-S</code>, or the Compiler Explorer website) shows which of these transformations happened and which didn't.</p>
`,
    terms: [
      ["Register allocation", "Assigning the program's variables and temporaries to the machine's registers, keeping the rest in memory."],
      ["Interference", "Two variables interfere if they are live at the same point, so they can't share a register."],
      ["Interference graph", "A graph with a vertex per variable and an edge between every two that interfere."],
      ["Register pressure", "The largest number of values live at one point; a lower bound on the registers needed without spilling."],
      ["Graph colouring", "Assigning colours to vertices so that adjacent vertices differ; k-colourability is NP-complete for k ≥ 3."],
      ["Simplify and select", "Chaitin's heuristic: remove vertices of degree below k onto a stack, then pop them and give each a free colour."],
      ["Spill", "Keeping a variable in memory instead of a register, with loads before its uses and stores after its definitions."],
      ["Spill cost", "An estimate of the loads and stores spilling a variable would add, weighted by how often the code runs."],
      ["Coalescing", "Giving the two sides of a copy the same register when they don't interfere, so the copy can be deleted."],
      ["Precolouring", "Fixing some variables to specific registers in advance, as the calling convention requires for arguments and results."],
      ["Linear scan", "A fast register allocator that sweeps over live ranges sorted by start, used in JIT compilers."],
      ["Instruction selection", "Choosing target-machine instructions to implement each IR operation."],
      ["Callee-saved register", "A register a called function must restore before returning (RISC-V s0–s11)."],
      ["Caller-saved register", "A register any call may change, so a caller must save it if its value is needed afterwards (RISC-V t0–t6, a0–a7)."],
      ["SSA form", "An IR in which every variable is assigned exactly once, with φ instructions where control flow merges."],
      ["Just-in-time (JIT) compiler", "A compiler that runs while the program runs, compiling the frequently executed parts using observed behaviour."]
    ],
    quiz: [
      { q: "In the block v1 = x + 1; v2 = v1 * y; return v2, with x and y live on entry, which pairs interfere?", choices: ["x–y, v1–y", "x–v1, y–v2", "All pairs", "x–y only"], answer: 0, why: "x and y are live together on entry; just after v1 = x + 1, v1 and y are live (x is dead); v2 is defined when only v2 is live." },
      { q: "Why can a vertex with fewer than k neighbours be removed during simplify?", choices: ["It has no value", "However its neighbours are coloured, they use at most k − 1 colours, so one is left for it", "It will be spilled anyway", "Its neighbours have more than k neighbours"], answer: 1, why: "That guarantee is why it can be coloured last." },
      { q: "If every remaining vertex has degree at least k, what does the allocator do?", choices: ["Report an error", "Choose a spill candidate, cheap to keep in memory, and remove it anyway", "Add a register", "Remove the vertex with the smallest degree"], answer: 1, why: "It may still get a colour in select; if not, it is spilled." },
      { q: "Which RISC-V instructions compute d = (a >= b), for a and b in registers?", choices: ["slt d, b, a", "slt d, a, b then xori d, d, 1", "sub d, a, b", "slt d, b, a then xori d, d, 1"], answer: 1, why: "a ≥ b is the negation of a < b." },
      { q: "A variable's value is needed after a call. Which kind of register should it be in?", choices: ["A caller-saved t register", "An a register", "A callee-saved s register (or memory)", "ra"], answer: 2, why: "The callee may overwrite t and a registers; it must preserve s registers." },
      { q: "What is the register pressure of the block in this lesson's interference table, and what does it imply?", choices: ["3, so 3 registers suffice", "4, so at least 4 registers are needed to avoid spilling", "7, one per variable", "5, the largest degree"], answer: 1, why: "a, b, c and v1 are live together after the first instruction." }
    ],
    practice: [
      {
        q: `<p>Build the interference graph for this block, with <code>x</code> live on entry and nothing live after <code>return</code>. How many registers does it need?</p>
<pre data-label="TAC"><code>a = x * 2
b = x + 1
c = a + b
d = c * x
return d</code></pre>`,
        a: `<p>Backward: after <code>return d</code>: ∅; before it: {d}. <code>d = c * x</code>: defines d with nothing else live; then live = {c, x}. <code>c = a + b</code>: c interferes with x; live = {a, b, x}. <code>b = x + 1</code>: b interferes with a and x; live = {a, x}. <code>a = x * 2</code>: a interferes with x; live = {x}. Edges: c–x, a–b, b–x, a–x; d is alone. The largest clique is {a, b, x}, so 3 registers are needed, and 3 suffice: x, a, b get three colours, c can share a's or b's, and d any.</p>`
      },
      {
        q: `<p>Run simplify and select with <em>k</em> = 2 on the graph from the previous problem, with spill cost = number of uses and definitions, choosing the lowest cost / degree when stuck and breaking every tie by name. Which variable is spilled?</p>`,
        hint: `<p>Costs: x is live on entry, so count it as defined once there, and it is used 3 times: 4. a, b, c and d are each defined once and used once: 2.</p>`,
        a: `<p>Degrees: a 2, b 2, c 1, d 0, x 3. Remove c (degree 1), then d (0). Now a, b and x form a triangle, each with degree 2: stuck. Cost / degree: a 2/2, b 2/2, x 4/2; a and b tie, so a is the candidate (alphabetical). Remove a; then b (degree 1) and x (0). Select pops x (colour 0), b (1), a: its neighbours b and x use 0 and 1, so a is spilled. Then d gets 0, and c, whose only neighbour is x, gets 1. With <em>a</em> spilled, it is stored after <code>a = x * 2</code> and reloaded just before <code>c = a + b</code>.</p>`
      },
      {
        q: `<p>Use <code>select</code> to translate this TAC with the given registers, and check each line: <code>v1 = n != 0</code>, <code>jumpz v1 L2</code>, <code>v2 = n - 1</code>, <code>L2:</code>, <code>return n</code>, with the variable n in register a0, the TAC temporary v1 in register t0, and the temporary v2 in register a1 (the register map <code>{"n": "a0", "v1": "t0", "v2": "a1"}</code>).</p>`,
        a: `<p><code>v1 = n != 0</code> becomes <code>li t6, 0</code>, <code>sub t0, a0, t6</code>, <code>snez t0, t0</code> (a peephole optimizer would notice that subtracting 0 is pointless and emit just <code>snez t0, a0</code>); <code>jumpz</code> becomes <code>beqz t0, L2</code>; <code>v2 = n - 1</code> becomes <code>addi a1, a0, -1</code>; the label stays; and <code>return n</code> is just <code>ret</code>, since n is already in a0.</p>
<pre><code>prog = [("ne", "v1", "n", 0), ("jumpz", "v1", "L2"), ("sub", "v2", "n", 1), ("label", "L2"), ("return", "n")]
regs = {"n": "a0", "v1": "t0", "v2": "a1"}
print([line for ins in prog for line in select(ins, regs)])   # ['li   t6, 0', 'sub  t0, a0, t6', 'snez t0, t0', 'beqz t0, L2', 'addi a1, a0, -1', 'L2:', 'ret']</code></pre>`
      },
      {
        q: `<p>A function computes <code>x = f(a)</code> and then returns <code>x + a</code>, where f is another function. Under the RISC-V calling convention, where can <code>a</code> be kept during the call, and what does each choice cost? Why is <code>x</code> easy?</p>`,
        a: `<p><code>a</code> arrives in a0, but a0 carries f's argument and result, and f may change any caller-saved register, so <code>a</code> can't stay in a0 or a t register across the call. Either copy it into a callee-saved register such as s0, which our function must save on entry and restore on exit (a store and a load, plus a stack frame, needed anyway to save ra across the call), or spill it to the stack around the call (a store before and a load after). Both cost about the same here; in a loop with many calls, the s register is cheaper because the save and restore happen once per function, not once per call. <code>x</code> is defined by the call's result in a0 and isn't live across any call, so it can stay in a0 or a t register at no cost.</p>`
      }
    ],
    sources: ["chaitin82", "poletto99", "appel", "riscvabi", "riscvspec", "llvm04"]
  }
]);

CSA.addAsides("cs365", {
  cp1: [
    { kind: "ethics", title: "Trusting the compiler", html: `<p>In "Reflections on Trusting Trust", the lecture he gave on receiving the 1983 Turing Award (published in <em>Communications of the ACM</em> in August 1984), Ken Thompson described an attack that no reading of source code can find. Change the C compiler so that when it compiles the Unix <code>login</code> program it inserts a secret password that always works. That change is visible in the compiler's source, so add a second one: when the compiler compiles <em>itself</em>, it inserts both changes into the new compiler binary. Now delete both changes from the source. Every compiler built from the clean source by the infected binary is infected, and so is every <code>login</code> it builds, forever. Thompson's moral: "You can't trust code that you did not totally create yourself", and that includes the tools that built it. The danger is real. In 2015 a modified copy of Apple's Xcode development tools, downloaded from unofficial sites, added data-collecting code to every app its users built, and infected apps, including widely used ones, reached Apple's App Store before they were found and removed. Defences include getting tools only from their publisher and checking signatures, and <em>reproducible builds</em>, in which independent parties compile the same source and check that they get bit-for-bit identical binaries. If you ever write or distribute a compiler, build tool or library, you are part of everyone's chain of trust.</p>`, sources: ["thompson84", "xcodeghost"] }
  ],
  cp4: [
    { kind: "lang", title: "Python's own bytecode", html: `<p>CPython compiles every function to bytecode for a stack machine much like ours, and the standard <code>dis</code> module prints it. For <code>def f(a, b): return (a + 2) * b</code>, Python 3.12 prints:</p>
<pre data-label="Output"><code>  3           0 RESUME                   0

  4           2 LOAD_FAST                0 (a)
              4 LOAD_CONST               1 (2)
              6 BINARY_OP                0 (+)
             10 LOAD_FAST                1 (b)
             12 BINARY_OP                5 (*)
             16 RETURN_VALUE</code></pre>
<p>The left column is the source line and the next is the byte offset. <code>LOAD_FAST 0</code> is our <code>load 0</code>, the first local slot; the postorder shape is exactly Lesson 4's. The differences are revealing. One <code>BINARY_OP</code> handles every operator, because Python is dynamically typed: the VM must look at the operands' types at run time to decide what <code>+</code> means (integer addition, string concatenation, a class's <code>__add__</code>), which is much of why Python is slower than compiled C. Each instruction takes two bytes, and some are followed by extra space the interpreter uses to cache what it learned about the operand types last time. Each <code>BINARY_OP</code> here has one two-byte cache entry after it, which is why offsets 8 and 14 are missing (<code>dis.dis(f, show_caches=True)</code> shows them as <code>CACHE</code>). And for a <code>while</code> loop, CPython copies the loop's condition to the bottom of the loop, so that each iteration takes one conditional jump instead of a test at the top plus a jump back. Run <code>import dis; dis.dis(f)</code> on your own functions: the output changes between Python versions, since the bytecode is an internal detail, not a stable interface.</p>`, sources: ["pydis"] }
  ],
  cp5: [
    { kind: "practice", title: "Undefined behaviour and the optimizer", html: `<p>Mini's integers never overflow, but C's signed integers can, and the C standard says that signed overflow is <em>undefined behaviour</em>: the standard places no requirement at all on what a program that does it will do. Optimizers use that licence. They may assume the program never overflows, and simplify accordingly. With GCC 13 or Clang 18 at <code>-O2</code>, <code>int f(int x) { return x + 1 &gt; x; }</code> compiles to "return 1", although with wrap-around arithmetic it would be false for the largest <code>int</code>; and <code>x * 2 / 2</code> compiles to just <code>x</code> for an <code>int</code>, but not for an <code>unsigned</code>, whose arithmetic is defined to wrap, so the compiler must keep the effect of the lost top bit. Each rewrite is correct by the standard, and each makes ordinary loops faster. But a programmer who writes an overflow check such as <code>if (x + 1 &lt; x)</code> may find that the optimizer has deleted it as impossible. Dereferencing a null pointer and reading past the end of an array are undefined too, with the same consequences. The practical rules: know which operations in your language are undefined; check for overflow <em>before</em> doing the operation (<code>if (x == INT_MAX)</code>) or with the checked-arithmetic built-ins GCC and Clang provide; and test with a sanitizer: like CS 210 Lesson 4's AddressSanitizer, GCC and Clang's <code>-fsanitize=undefined</code> adds checks that report undefined behaviour when it happens. Safer languages define these cases: Java's integers wrap, and Rust panics on overflow in debug builds.</p>`, sources: ["lattner11"] }
  ],
  cp6: [
    { kind: "history", title: "From FORTRAN to LLVM", html: `<p>In 1952 Grace Hopper described programs for the UNIVAC that assembled a program from a library of subroutines, and called them compilers; the word stuck. The first compiler in the modern sense, translating formulas into efficient machine code, was FORTRAN ("formula translation"), delivered to users of the IBM 704 in April 1957 by a team led by John Backus. Their 1957 paper reports that the translator took two and a half years and 18 person-years of work. Their main worry was the speed of the code: programmers who wrote machine code by hand would not use a translator whose output ran much slower than their own. So FORTRAN I already analysed the program's flow of control and estimated how often each part ran, to decide which values to keep in the 704's three index registers. Twenty-five years later, Gregory Chaitin at IBM Research, working on the PL.8 compiler for IBM's experimental 801 RISC processor, showed that register allocation is graph colouring and that spilling fits naturally into the colouring algorithm (published 1982); allocators built on that idea are still used. In 2000, Chris Lattner and Vikram Adve began LLVM at the University of Illinois: a reusable optimizer and set of back ends built around one well-defined SSA intermediate representation. With the Clang front end for C and C++, it became the compiler behind Apple's platforms, Android's native code, Rust and Swift, and received the ACM Software System Award in 2012. Each step made the front end, middle and back end more separate, so that a new language or a new processor needs only its own part.</p>`, sources: ["hopper52", "backus57", "chaitin82", "llvm04"] }
  ]
});
