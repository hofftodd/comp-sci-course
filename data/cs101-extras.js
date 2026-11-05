/* CS 101 sidebars and optional lessons. The language-evolution thread runs
   through the sidebars and is covered in full in the "lang" optional lesson. */
CSA.addAsides("cs101", {
  u1: [
    { kind: "lang", title: "Integers without limits", html: `<p>In C, Java and most compiled languages an <code>int</code> has a fixed width, usually 32 bits, and arithmetic past about 2.1 billion silently wraps around or is undefined behavior. Python 2 had two integer types, <code>int</code> and an unlimited <code>long</code>, and promoted between them automatically. Python 3 (2008) merged them into one unlimited <code>int</code>. You pay a little speed for never having to think about overflow.</p>` },
    { kind: "lang", only: "python", title: "Python 2's risky input()", html: `<p>In Python 2, <code>input()</code> treated whatever the user typed as Python code and ran it, so typing an expression could do far more than supply a value. The safe version, which returned plain text, was called <code>raw_input()</code>. Python 3 (2008) renamed <code>raw_input()</code> to <code>input()</code> and dropped the old behavior. If you find old tutorials using <code>raw_input</code>, they were written for Python 2.</p>`, sources: ["pyhistory"] },
    { kind: "history", title: "Why 0.1 + 0.2 is not 0.3", html: `<p>Before 1985, each computer maker handled fractional numbers its own way, and the same program could give different answers on different machines. The IEEE 754 standard, led by William Kahan, fixed one binary format that nearly all hardware now uses. Kahan received the 1989 Turing Award for this work. The format cannot represent 0.1 exactly, any more than decimal can write 1/3 exactly, so tiny rounding errors appear.</p>` }
  ],
  u2: [
    { kind: "history", title: "Structured programming and the goto debate", html: `<p>Early languages controlled flow with jumps: <code>GOTO 340</code>. Large programs became tangles of jumps that nobody could follow. In 1966 Böhm and Jacopini showed that sequence, selection and repetition are enough to express any computable flow. In 1968 Edsger Dijkstra published his letter <em>Go To Statement Considered Harmful</em>. The loops and conditionals you used in this unit are the result: Python has no <code>goto</code> at all.</p>`, sources: ["dijkstra68"] },
    { kind: "lang", title: "Indentation as syntax", html: `<p>Most popular languages mark blocks with braces <code>{ }</code>, a convention C made dominant in the 1970s. Python uses indentation instead, an idea it inherited from ABC, a teaching language that Guido van Rossum worked on at CWI in Amsterdam before he created Python. Since programmers indent their code anyway, Python makes the indentation the structure, so the code cannot look like it does one thing while doing another.</p>`, sources: ["pyhistory"] }
  ],
  u3: [
    { kind: "history", title: "The first subroutines", html: `<p>On EDSAC, one of the first stored-program computers (Cambridge, 1949), David Wheeler devised a way to jump into a shared block of code and return to the caller. That trick, sometimes called the Wheeler jump, is the ancestor of every function call. Wheeler, Wilkes and Gill's 1951 book on EDSAC programming included a library of reusable subroutines.</p>` },
    { kind: "lang", title: "Where lambda comes from", html: `<p>In the 1930s Alonzo Church invented the lambda calculus, a mathematical system built entirely from anonymous functions. John McCarthy brought it into programming with LISP in 1958. Python 1.0 (1994) added <code>lambda</code>, <code>map</code>, <code>filter</code> and <code>reduce</code>, contributed by a user who missed them from LISP. Every major language has since added anonymous functions, including Java in 2014.</p>`, sources: ["mccarthy60", "pyhistory"] }
  ],
  u4: [
    { kind: "lang", title: "Not every language allowed recursion", html: `<p>The original FORTRAN (1957) stored each function's variables at a fixed memory address, so a function could not call itself. Standard Fortran did not allow recursion until Fortran 90. LISP (1958) was built around recursion, and ALGOL 60 required it, which pushed compilers to use a call stack. That design is now universal.</p>`, sources: ["mccarthy60", "hopl"] },
    { kind: "practice", title: "Python deliberately has no tail-call optimization", html: `<p>Some languages, such as Scheme, reuse the current frame when a function's last action is a recursive call, so that recursion uses no extra stack space. Guido van Rossum declined to add this to Python in 2009, arguing that it would hide frames from tracebacks and make debugging harder. In Python, write deep or unbounded repetition as a loop.</p>`, sources: ["pyhistory"] }
  ],
  u5: [
    { kind: "lang", title: "Why indexes start at zero", html: `<p>In BCPL and then C, an array name is a memory address and <code>a[i]</code> means "the item <code>i</code> steps past the start", so the first item is at offset 0. Dijkstra argued for zero-based numbering on separate grounds in a 1982 note: half-open ranges like <code>0 ≤ i &lt; n</code> have length <code>n</code> and join without gaps. Python's <code>range</code> and slices follow the same convention. Fortran, MATLAB, Lua and R start at 1.</p>` },
    { kind: "practice", title: "Dictionaries remember insertion order", html: `<p>Since Python 3.7, the language guarantees that a dict iterates its keys in the order they were inserted. Before 3.6 the order looked random. The change came from a more compact hash table design, and order was then made part of the language specification so that programs could rely on it.</p>` }
  ],
  u6: [
    { kind: "history", title: "The first actual bug", html: `<p>On September 9, 1947, operators of the Harvard Mark II found a moth stuck in a relay and taped it into the logbook with the note "First actual case of bug being found." Grace Hopper often told the story. Engineers had already used "bug" for faults since at least Edison's time, which is why the note says <em>actual</em>. The logbook page is held by the Smithsonian.</p>` },
    { kind: "ethics", title: "Tests protect people", html: `<p>Untested edge cases have killed people. The Therac-25 radiation machine overdosed patients because of a race condition that appeared only when operators typed quickly. The optional ethics lesson, <em>When software fails people</em>, covers this and other cases.</p>`, sources: ["leveson93"] },
    { kind: "lang", title: "From SUnit to pytest", html: `<p>Kent Beck wrote SUnit for Smalltalk around 1989. With Erich Gamma he ported the idea to Java as JUnit in 1997, and the "xUnit" pattern spread to nearly every language, including Python's built-in <code>unittest</code>. <code>pytest</code> later simplified the style to plain functions and <code>assert</code> statements.</p>` }
  ],
  u7: [
    { kind: "history", title: "Unix and Git", html: `<p>The shell commands in this unit come from Unix, which Ken Thompson and Dennis Ritchie began at Bell Labs in 1969. Doug McIlroy's pipes (1973) let small programs be chained: <code>sort names.txt | uniq -c</code>. Git was written by Linus Torvalds in 2005, in about two weeks, after the Linux project lost free access to the version control system it had been using.</p>`, sources: ["missing"] },
    { kind: "ethics", title: "Licenses and attribution", html: `<p>Code you find online is someone's work and usually comes with a license. Permissive licenses (MIT, BSD, Apache) let you reuse code if you keep the copyright notice. Copyleft licenses such as the GPL require that software built from the code be shared under the same terms. Code produced by AI assistants raises open questions about where it came from. When you reuse code, keep the license, credit the author, and follow your course's rules.</p>` }
  ]
});

CSA.addOptional("cs101", [
  {
    id: "lang",
    kind: "history",
    title: "How programming languages evolved",
    minutes: 75,
    summary: "Eighty years of telling machines what to do, from plugboards to Python and Rust, told through the problem each generation of languages set out to solve.",
    notes: `
<p>Every programming language is an answer to a question its designers faced: <em>how can people tell machines what to do with less effort and fewer mistakes?</em> The answers changed as machines got faster, programs got bigger and more people started programming. Six words keep the eras in order:</p>
<div class="callout"><strong>Numbers → Names → Formulas → Structure → Scale → Safety.</strong> Programs as raw numbers, then symbolic names, then math-like formulas, then disciplined structure, then languages for big teams and the web, then languages that prevent whole classes of bugs.</div>
<p>To make the change concrete, this lesson shows the same small job in each era: <strong>add up the numbers from 1 to 10</strong>.</p>

<h3>1. Numbers: programming the bare machine (1940s)</h3>
<p>The first electronic computers had no programming languages at all. <strong>ENIAC</strong> (1945) was programmed by plugging cables and setting thousands of switches. Its first programmers, including Kathleen McNulty, Jean Jennings and Betty Snyder, worked from wiring diagrams with no manuals. A new program could take days to set up.</p>
<p>Stored-program machines such as the Manchester Baby (1948) and EDSAC (1949) improved this: the program was a list of numbers in memory, so it could be loaded, changed and shared. But each instruction was still a number, for example a code meaning "add" followed by a memory address. Programmers wrote these by hand, and a single wrong digit could make the program do something completely different.</p>
<p class="note"><strong>Why it matters:</strong> programs became data that a machine could store and load. That made it possible, later, for programs to <em>write</em> other programs.</p>

<h3>2. Names: assembly language (late 1940s to 1950s)</h3>
<p>The first step up was to let people write short names instead of numbers. Kathleen Booth designed one of the first assembly languages for a machine at Birkbeck College in London in 1947. On EDSAC, David Wheeler's "initial orders" (1949) read instructions written as letters and turned them into binary as the program loaded. A program that does this translation is called an <strong>assembler</strong>, and the notation is <strong>assembly language</strong>. Each line still corresponds to exactly one machine instruction:</p>
<pre data-label="Assembly (x86)"><code>    mov eax, 0      ; total = 0
    mov ecx, 1      ; i = 1
again:
    add eax, ecx    ; total = total + i
    inc ecx         ; i = i + 1
    cmp ecx, 11
    jne again       ; repeat until i is 11</code></pre>
<p>Assembly is still used today where every instruction counts, such as the first code that runs when a computer starts, but it ties a program to one family of processors.</p>
<p class="note"><strong>Why it matters:</strong> using a program to translate for the programmer was the key idea. Every compiler since is a far more ambitious version of it.</p>

<h3>3. Formulas: the first high-level languages (1952 to 1960)</h3>
<p><strong>Grace Hopper</strong> argued that programmers should write something closer to mathematics or English and let the computer do the translating. Her A-0 system (1952) was an early step, and in 1952 Alick Glennie wrote an "Autocode" for the Manchester Mark 1. Many experts doubted the idea: they believed machine-generated code would always be slower than code written by hand.</p>
<p><strong>FORTRAN</strong> ("formula translation"), built at IBM by a team led by <strong>John Backus</strong> and released in 1957, settled the argument. Scientists could write <code>X = A*B + C</code>, and the compiler produced code nearly as fast as an expert's assembly. Within a few years most scientific programs were written in FORTRAN.</p>
<pre data-label="FORTRAN"><code>      ISUM = 0
      DO 10 I = 1, 10
         ISUM = ISUM + I
   10 CONTINUE</code></pre>
<p>Between 1958 and 1960 three more languages appeared whose ideas are still everywhere:</p>
<ul>
  <li><strong>LISP</strong> (John McCarthy, MIT, 1958) treated programs as lists that other programs could build and run. It made recursion the main tool and introduced automatic <em>garbage collection</em>, so programmers no longer had to free memory by hand.</li>
  <li><strong>COBOL</strong> (1959) was designed by a committee of industry and government, with Hopper as an adviser and Jean Sammet among its main designers. It aimed at business records and read almost like English. Banks and governments still run large amounts of COBOL.</li>
  <li><strong>ALGOL 60</strong>, designed by an international committee, introduced nested blocks, local variables, recursion as a standard feature, and a precise notation for describing a language's grammar (Backus–Naur Form). It was not widely used for business, but nearly every later language borrowed its structure.</li>
</ul>
<pre data-label="LISP"><code>(defun sum-to (n)
  (if (= n 0)
      0
      (+ n (sum-to (- n 1)))))

(sum-to 10)   ; 55</code></pre>
<p class="note"><strong>Why it matters:</strong> once compiled code was fast enough, programmers could think in the terms of their problem instead of the machine's. FORTRAN, LISP, COBOL and ALGOL are the ancestors of four families of languages.</p>

<h3>4. Structure: taming growing programs (1960s to 1970s)</h3>
<p>As programs grew to hundreds of thousands of lines, they became hard to understand. Many were tangles of <code>GOTO</code> jumps, and large projects ran years late. In 1968 Edsger Dijkstra's letter "Go To Statement Considered Harmful" launched the <strong>structured programming</strong> movement: build programs from sequences, if/else and loops, which a reader can follow from top to bottom. The decade's languages each attacked a different part of the problem:</p>
<ul>
  <li><strong>BASIC</strong> (John Kemeny and Thomas Kurtz, Dartmouth, 1964) was designed so students in any subject could program. A decade later, versions of BASIC came with almost every home computer. Microsoft's first product was a BASIC for the Altair (1975).</li>
  <li><strong>Simula 67</strong> (Ole-Johan Dahl and Kristen Nygaard, Norway) was built for simulations and introduced <em>classes</em>, <em>objects</em> and <em>inheritance</em>.</li>
  <li><strong>Pascal</strong> (Niklaus Wirth, 1970) brought structured programming into a clean teaching language.</li>
  <li><strong>C</strong> (Dennis Ritchie, Bell Labs, 1972) grew out of BCPL and B. In 1973 the Unix operating system was rewritten in C, so moving Unix to a new computer mostly meant writing a new C compiler. Unix and C spread together, and C became the main language for systems software for fifty years.</li>
  <li><strong>Smalltalk</strong> (Alan Kay, Adele Goldberg, Dan Ingalls and others, Xerox PARC) made everything an object, and Kay coined the term "object-oriented". It was developed alongside the graphical user interface.</li>
  <li><strong>Declarative languages</strong> let you describe <em>what</em> you want instead of <em>how</em> to compute it: <strong>Prolog</strong> (1972) for logic, and <strong>SQL</strong> (IBM, 1974) for database queries. <strong>ML</strong> (Robin Milner, 1973) introduced <em>type inference</em>: the compiler works out each value's type without the programmer writing it down.</li>
</ul>
<pre data-label="C"><code>int total = 0;
for (int i = 1; i &lt;= 10; i++) {
    total += i;
}</code></pre>
<p class="note"><strong>Why it matters:</strong> structured code and objects gave programmers ways to break big programs into understandable pieces. Python's <code>if</code>, <code>for</code>, <code>class</code> and its lack of <code>goto</code> all come from this era.</p>

<h3>5. Scale: big teams, the PC and the web (1980s to 1990s)</h3>
<p>Software now ran businesses and governments, and teams of hundreds worked on one program. Languages added features for building large systems:</p>
<ul>
  <li><strong>C++</strong> (Bjarne Stroustrup, Bell Labs) added Simula's classes to C and was released in 1985. It became the language of games, browsers and other software where speed matters.</li>
  <li><strong>Ada</strong> (1983) was commissioned by the U.S. Department of Defense for reliable military systems, and was named after Ada Lovelace.</li>
  <li><strong>Erlang</strong> (Ericsson, 1986) was designed for telephone switches that must never stop, using many small processes that can fail and restart independently.</li>
  <li><strong>Perl</strong> (1987) and later <strong>Python</strong> made <em>scripting</em> popular: quick, flexible programs that glue other tools together. Guido van Rossum started Python as a hobby project over the Christmas holidays in 1989 and released it in 1991. He named it after the comedy group Monty Python.</li>
  <li><strong>Haskell</strong> (1990) gathered research on pure functional programming into one language.</li>
</ul>
<p>Then came the web, and 1995 was a remarkable year:</p>
<ul>
  <li><strong>Java</strong> (Sun Microsystems, James Gosling) compiled to <em>bytecode</em> for a virtual machine, promising "write once, run anywhere". It brought garbage collection, 37 years after LISP, to mainstream business programming.</li>
  <li><strong>JavaScript</strong> was written by Brendan Eich at Netscape in about ten days to make web pages interactive. Despite the name, chosen for marketing, it has little to do with Java. It became the one language every web browser runs.</li>
  <li><strong>PHP</strong> and <strong>Ruby</strong> also appeared in 1995 and powered much of the early web.</li>
</ul>
<pre data-label="Python"><code>total = sum(range(1, 11))   # 55</code></pre>
<p class="note"><strong>Why it matters:</strong> as computers got cheaper and programmers' time got more expensive, languages traded some speed for convenience and safety. Garbage collection, virtual machines and scripting became normal.</p>

<h3>6. Safety: correctness at internet scale (2000s to today)</h3>
<p>By the 2000s, software faced constant attack over the internet, and studies by Microsoft and Google's Chrome team found that about 70% of their serious security bugs came from memory-safety errors, the kind C and C++ allow. Programs also had to use many processor cores at once. The newest languages respond to both problems:</p>
<ul>
  <li><strong>C#</strong> (Microsoft, 2000), designed by Anders Hejlsberg, brought Java-style safety to Windows. Hejlsberg later designed <strong>TypeScript</strong> (2012), which adds optional types to JavaScript and is now standard on large web projects.</li>
  <li><strong>Go</strong> was designed at Google by Robert Griesemer, Rob Pike and Ken Thompson (one of Unix's creators) and announced in 2009. It aimed for fast builds, simple code and easy concurrency for network servers.</li>
  <li><strong>Rust</strong> began as Graydon Hoare's personal project, was sponsored by Mozilla, and reached version 1.0 in 2015. Its <em>ownership</em> rules let the compiler prove that a program uses memory safely, without a garbage collector. In 2022 the Linux kernel began accepting Rust code.</li>
  <li><strong>Swift</strong> (Apple, 2014) and <strong>Kotlin</strong> (JetBrains, 1.0 in 2016, Google's preferred Android language since 2019) modernized mobile development with type inference and null safety, ideas that go back to ML.</li>
</ul>
<pre data-label="Rust"><code>let total: i32 = (1..=10).sum();   // 55</code></pre>
<p>Types also came back to dynamic languages: Python added optional type hints in 2015. Since 2022, U.S. government agencies including the NSA and CISA have urged organizations to move new code to memory-safe languages.</p>
<p class="note"><strong>Why it matters:</strong> the newest languages try to stop bugs before a program ever runs, instead of finding them in testing or in production.</p>

<h3>And now: plain language</h3>
<p>Since about 2021, AI coding assistants have let people describe what they want in plain language and get code back. This continues the oldest trend in this story: raising the level of abstraction. Each earlier step, from numbers to assembly to FORTRAN to Python, came with the worry that programmers would no longer understand the machine. Each time, the skills that mattered most moved up a level: stating precisely what you want, and checking that you got it.</p>

<h3>The family tree</h3>
<table>
  <thead><tr><th>Ancestor</th><th>Key idea it introduced</th><th>Where the idea lives today</th></tr></thead>
  <tbody>
    <tr><td>FORTRAN (1957)</td><td>Fast compiled formulas</td><td>Modern Fortran, the numerical libraries under NumPy, Julia</td></tr>
    <tr><td>LISP (1958)</td><td>Recursion, garbage collection, code as data</td><td>Scheme, Clojure; closures and garbage collection in Python, JavaScript, Java</td></tr>
    <tr><td>COBOL (1959)</td><td>English-like business records</td><td>COBOL itself, still running banks and governments</td></tr>
    <tr><td>ALGOL 60 (1960)</td><td>Blocks, scope, formal grammar</td><td>Pascal and C, then C++, Java, C#, JavaScript, Go, Python</td></tr>
    <tr><td>Simula 67</td><td>Classes and objects</td><td>Smalltalk, C++, Java, Python, Swift</td></tr>
    <tr><td>ML (1973)</td><td>Type inference</td><td>Haskell, OCaml, Rust, Swift, Kotlin, TypeScript</td></tr>
  </tbody>
</table>

<h3>Patterns to notice</h3>
<ol>
  <li><strong>Abstraction rises</strong> as hardware gets cheaper than programmer time.</li>
  <li><strong>Ideas wait for hardware.</strong> Garbage collection, closures and type inference existed for decades before mainstream languages adopted them.</li>
  <li><strong>Safety and control trade off,</strong> and each generation finds a new balance. Rust is the latest attempt to have both.</li>
  <li><strong>Old code is never fully retired.</strong> COBOL and Fortran still run, so designers must think about systems that will outlive them.</li>
</ol>
`,
    terms: [
      ["Machine code", "Instructions as the raw numbers a processor executes."],
      ["Assembler", "A program that translates assembly language, one line per machine instruction, into machine code."],
      ["Compiler", "A program that translates a whole program into a lower-level language before it runs."],
      ["Interpreter", "A program that executes code directly, statement by statement."],
      ["Garbage collection", "Automatic reclamation of memory the program can no longer reach."],
      ["Declarative language", "One where you describe what result you want, not the steps to get it (e.g. SQL)."],
      ["Type inference", "The compiler working out the types of values without the programmer writing them."],
      ["Memory safety", "A guarantee that a program cannot read or write memory it does not own."]
    ],
    quiz: [
      { q: "Which language first showed that compiled code could be nearly as fast as hand-written assembly?", choices: ["COBOL", "FORTRAN", "LISP", "BASIC"], answer: 1, why: "FORTRAN's 1957 compiler at IBM produced efficient code, which convinced the industry to adopt high-level languages." },
      { q: "Garbage collection first appeared in which language?", choices: ["Java", "C", "LISP", "Python"], answer: 2, why: "LISP had garbage collection in 1958–1960. Java made it mainstream in 1995." },
      { q: "What problem is Rust's ownership system designed to solve?", choices: ["Slow compile times", "Memory safety without a garbage collector", "Running in web browsers", "Making syntax shorter"], answer: 1, why: "Rust checks at compile time that memory is used safely, so it needs no runtime collector." },
      { q: "Which language family does Python's block structure and lexical scope ultimately descend from?", choices: ["ALGOL 60", "COBOL", "Prolog", "Smalltalk"], answer: 0, why: "ALGOL 60 introduced nested blocks and lexical scope, which passed into almost every later imperative language." },
      { q: "Why did C spread so widely in the 1970s and 1980s?", choices: ["It had garbage collection", "Unix was rewritten in C, so both could move to new computers together", "It was designed for web browsers", "It was the first high-level language"], answer: 1, why: "Porting Unix mostly meant writing a C compiler for the new machine, so Unix and C spread together." },
      { q: "What does JavaScript have to do with Java?", choices: ["Very little: the name was chosen for marketing", "JavaScript is a smaller version of Java", "Both run on the Java virtual machine", "Java was written in JavaScript"], answer: 0, why: "Brendan Eich wrote JavaScript at Netscape in 1995. The name borrowed Java's popularity; the languages are unrelated in design." }
    ],
    sources: ["hopl", "pyhistory", "chmrev", "eniac", "mccarthy60", "dijkstra68"]
  },
  {
    id: "ethics",
    kind: "ethics",
    title: "When software fails people",
    minutes: 45,
    summary: "Four real failures, from a radiation machine to a UK scandal, and what each one teaches a first-year programmer.",
    notes: `
<p>The bugs you fix this term cost you points. In deployed systems, bugs can cost lives, money and people's freedom. Each case below connects to a skill from this course.</p>

<h3>Therac-25 (1985–1987): testing and concurrency</h3>
<p>The Therac-25 radiation therapy machine gave at least six patients massive overdoses; several died. Earlier models had hardware interlocks that physically prevented a dangerous beam. The Therac-25 relied on software alone. One bug was a race condition: if an operator edited the treatment settings within a few seconds, the machine could fire a high-power beam without the protective target in place. Another came from a one-byte counter that overflowed back to zero, skipping a safety check. When the machine showed cryptic errors such as "MALFUNCTION 54", operators had learned to override them.</p>
<p><strong>Connection:</strong> edge cases, integer limits, error messages a person can act on, and never assuming software alone is safe.</p>

<h3>Patriot missile at Dhahran (1991): number representation</h3>
<p>The Patriot system counted time in tenths of a second and converted to seconds using a 24-bit fixed-point value of 0.1, which cannot be represented exactly in binary. The error grew the longer the system ran. After about 100 hours, the clock was off by about a third of a second, enough to shift the tracking window by hundreds of meters. On February 25, 1991, a battery failed to intercept an incoming Scud missile, which struck a U.S. Army barracks and killed 28 soldiers. A software fix was already on its way.</p>
<p><strong>Connection:</strong> Unit 1's floating-point sidebar. Small representation errors add up.</p>

<h3>Ariane 5 Flight 501 (1996): reused code and assumptions</h3>
<p>About 37 seconds after launch, Europe's new rocket veered off course and broke apart. Navigation code reused from Ariane 4 converted a 64-bit floating-point velocity into a 16-bit integer. Ariane 5 flew faster, the value no longer fit, and the conversion raised an unhandled exception that shut down both the primary and the backup navigation computers, which ran the same code. Nobody was hurt, but the launch and its payload were lost.</p>
<p><strong>Connection:</strong> preconditions in function specifications, and why a backup that runs identical code is not independent.</p>

<h3>Post Office Horizon (1999–2015): trusting the computer</h3>
<p>The UK Post Office prosecuted more than 900 subpostmasters for theft and false accounting, based on shortfalls reported by its Horizon accounting system. The shortfalls were often caused by software errors. People were jailed, lost their homes and were bankrupted; some died before being cleared. Courts had presumed the computer was reliable unless shown otherwise. Parliament quashed most of the convictions in 2024, and a public inquiry continues to examine what happened.</p>
<p><strong>Connection:</strong> output is not truth. Programmers have a duty to report known defects, and institutions must not treat software as infallible.</p>

<h3>Common threads</h3>
<ul>
  <li>Each failure involved a <em>known kind</em> of bug, not an exotic one.</li>
  <li>People closest to the system often noticed problems that were dismissed.</li>
  <li>Organizations, not just individual programmers, made the decisions that turned bugs into harm.</li>
</ul>

<h3>Discussion questions</h3>
<ol>
  <li>Who was responsible in the Therac-25 case: the programmer, the company, the hospitals, or the regulators? Can responsibility be shared?</li>
  <li>When you reuse a function, what should you check about its assumptions?</li>
  <li>If you found a bug at your job that could affect customers and your manager told you to ignore it, what would you do? What does the ACM Code of Ethics say?</li>
</ol>
`,
    terms: [
      ["Race condition", "A bug whose effect depends on the timing of events, such as two actions happening close together."],
      ["Overflow", "A value exceeding the range of its storage type and wrapping or failing."],
      ["Interlock", "A safety mechanism that prevents a dangerous action regardless of software state."]
    ],
    quiz: [
      { q: "Why did the Patriot clock error grow over time?", choices: ["The hardware clock ran slow", "0.1 cannot be stored exactly in binary, and the error accumulated", "The software was never tested", "Operators set the wrong time"], answer: 1, why: "The truncated binary value of 0.1 was slightly off, and the error grew with every tick over ~100 hours." },
      { q: "Why did the Ariane 5 backup computer fail too?", choices: ["It was turned off", "It ran the same code and hit the same exception", "It was hit by debris", "It had no power"], answer: 1, why: "Redundant hardware running identical software fails identically. The backup offered no protection against a software fault." },
      { q: "What did the Therac-25 remove compared with earlier models?", choices: ["Its display", "Hardware safety interlocks", "Its keyboard", "Error messages"], answer: 1, why: "Earlier machines had physical interlocks. The Therac-25 trusted software alone." }
    ],
    sources: ["leveson93", "gao92", "ariane96", "horizon", "acm"]
  },
  {
    id: "deep",
    kind: "deep",
    title: "How Python actually runs your code",
    minutes: 30,
    summary: "Source, bytecode and the virtual machine, and why 'compiled vs. interpreted' is a spectrum.",
    notes: `
<p>When you run <code>python3 main.py</code>, CPython, the standard implementation, does several things before your first line executes:</p>
<ol>
  <li><strong>Tokenize</strong> the text into names, numbers, operators and indentation.</li>
  <li><strong>Parse</strong> the tokens into an abstract syntax tree (AST).</li>
  <li><strong>Compile</strong> the tree into <em>bytecode</em>, simple instructions for a virtual machine. These are cached in <code>__pycache__</code> folders as <code>.pyc</code> files.</li>
  <li><strong>Execute</strong> the bytecode in a loop that reads one instruction at a time.</li>
</ol>
<p>You can see the bytecode yourself:</p>
<pre><code>import dis

def add_one(x):
    return x + 1

dis.dis(add_one)
# LOAD_FAST   x
# LOAD_CONST  1
# BINARY_OP   +
# RETURN_VALUE   (exact output varies by Python version)</code></pre>

<h3>A spectrum, not a binary</h3>
<p>C is compiled ahead of time to machine code. Python is compiled to bytecode and then interpreted. Java compiles to bytecode, then a <em>just-in-time</em> (JIT) compiler turns frequently run parts into machine code while the program runs. PyPy is a Python implementation with a JIT, and CPython 3.13 (2024) added an experimental JIT of its own, along with an optional build without the global interpreter lock (GIL), which lets threads run Python code in parallel.</p>

<h3>Why it matters</h3>
<p>Understanding these layers explains why a loop that does arithmetic on a million numbers is much faster in NumPy, which runs compiled C code, than in plain Python, which runs many bytecode instructions per item.</p>
`,
    terms: [
      ["Bytecode", "Low-level instructions for a virtual machine rather than for real hardware."],
      ["AST", "Abstract syntax tree: a tree representation of a program's structure."],
      ["JIT compiler", "A compiler that turns code into machine code while the program runs."]
    ],
    quiz: [
      { q: "What is stored in a .pyc file?", choices: ["Machine code", "Compiled bytecode", "The original source", "Test results"], answer: 1, why: "CPython caches bytecode so it does not need to recompile unchanged modules." },
      { q: "Why is NumPy arithmetic on large arrays faster than a Python loop?", choices: ["NumPy uses a different language syntax", "The work runs in compiled C instead of many bytecode steps", "NumPy skips some numbers", "Python loops are limited to 1000 items"], answer: 1, why: "One NumPy call does the whole loop in compiled code." }
    ],
    sources: ["pytutorial", "pyhistory"]
  }
]);
