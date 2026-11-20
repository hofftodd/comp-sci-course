CSA.addCourse({
  id: "cs360",
  code: "CS 360",
  title: "Programming Languages",
  credits: 4,
  kind: "required",
  term: "y3s",
  summary: "What programs mean, learned by building the languages that run them. Starting from abstract syntax trees and a tiny arithmetic language, you write interpreters in Python that add variables and scope, first-class functions and closures, types and a type checker, type inference with polymorphism, mutable state and objects, and finally look at how languages manage memory. Along the way: the lambda calculus, functional programming, typing rules and soundness, unification and Hindley–Milner, parameter passing, dynamic dispatch, garbage collection and Rust's ownership. OCaml, Haskell, C, Java and Rust examples were compiled and run; every graded problem is in Python.",
  prereqs: ["CS 102 Programming II", "CS 201 Data Structures", "CS 210 Computer Systems I", "CS 320 Theory of Computation", "MATH 120 Discrete Mathematics I"],
  outcomes: [
    "Distinguish a language's syntax from its semantics, represent programs as abstract syntax trees, and write an evaluator by structural recursion",
    "Write an environment-based interpreter, and explain substitution, free and bound variables, and the difference between lexical and dynamic scope",
    "Implement first-class functions as closures, use higher-order functions and currying, and reduce lambda-calculus terms by beta reduction",
    "Program in a functional style with immutable data, folds, algebraic data types and pattern matching, and explain tail calls and lazy evaluation",
    "Read and write typing rules, build a type checker, and state what type soundness guarantees and what it doesn't",
    "Infer types by unification, explain parametric polymorphism and let-polymorphism, and reason about subtyping and variance",
    "Model mutable state with a store, compare call-by-value, call-by-reference and call-by-name, and explain how objects, inheritance and dynamic dispatch work",
    "Compare manual memory management, reference counting, tracing collectors and Rust's ownership, and explain how such trade-offs shape a language's design"
  ],
  rubric: {
    criteriaFor: "problem sets, the interpreter project and the exams",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 25, desc: "Weekly: the lesson's programming problems, plus written exercises such as derivations with evaluation and typing rules, beta reductions, unification by hand and heap diagrams." },
      { name: "Interpreter project", weight: 30, desc: "In four milestones over the term, one interpreter for a small language of your design, in Python: closures and recursion; a static type checker with inference; mutable state; and a garbage-collected heap. Each milestone comes with tests and a two-page write-up of its semantics." },
      { name: "Midterm exam", weight: 15, desc: "Syntax, interpreters, scope, closures, the lambda calculus and functional programming (lessons 1–4)." },
      { name: "Final exam", weight: 20, desc: "Cumulative, with emphasis on types, inference, state, objects and memory management (lessons 5–8)." }
    ],
    criteria: [
      { name: "Correctness", desc: "Does the interpreter, checker or proof do what the semantics says?", levels: [
        "Correct on every test, including edge cases such as shadowing, recursion, errors and unusual inputs, with tests that show it.",
        "Correct on the main cases; an edge case such as shadowing or an error path is wrong.",
        "Works only on simple programs.",
        "Doesn't work." ] },
      { name: "Semantics", desc: "Is the language precisely specified?", levels: [
        "Every construct has a clear rule (evaluation and typing), and the code follows the rules case by case.",
        "Rules are mostly clear, with a gap or an informal case.",
        "Behavior is described only by examples.",
        "No specification." ] },
      { name: "Analysis", desc: "Are design choices and trade-offs explained?", levels: [
        "Explains why each choice was made, what it rules out and what it costs, with examples that tell the alternatives apart.",
        "Mostly sound reasoning, with gaps.",
        "Claims without reasons.",
        "No analysis." ] },
      { name: "Presentation", desc: "Can a reader follow the code and write-up?", levels: [
        "Readable code organized by the language's constructs, and a clear write-up with derivations where they help.",
        "Mostly clear.",
        "Hard to follow.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Tools:</b> everything graded is in Python 3, which runs in your browser on this site. Examples in OCaml, Haskell, C, Java and Rust are for reading; installing those languages to try them is encouraged but not required.",
      "<b>Collaboration:</b> discuss ideas freely; write your own code and name your collaborators. Project milestones include short oral checks in which you explain a part of your interpreter.",
      "<b>AI assistants:</b> you may use them to explain concepts and error messages, and must say how. Code you submit must be your own, and you must be able to explain every line.",
      "<b>Late work:</b> four late days for project milestones, used in whole days; then 10% a day."
    ]
  },
  units: [
    {
      id: "pl1",
      title: "What a language is",
      minutes: 90,
      summary: "Syntax versus semantics; concrete and abstract syntax; programs as trees; s-expressions and a minimal reader; Python's match statement; and evaluating a tiny arithmetic language by structural recursion, with its meaning written as rules.",
      notes: `
<p>You have used Python, C and SQL, and in CS 320 you described languages with grammars. This course asks what a programming language <em>is</em>: what exactly a program means, and how a machine can find that meaning. Our method is to build languages. Each lesson grows a small interpreter, written in Python, that runs programs in a language of our own. By the end it will have variables, functions, types, type inference, mutable state and objects, and you will have seen how real languages make the same choices. As <em>Structure and Interpretation of Computer Programs</em> puts it, "the evaluator, which determines the meaning of expressions in a programming language, is just another program."</p>

<h3>Syntax and semantics</h3>
<p>A language has two parts. Its <strong>syntax</strong> says which strings are programs and how they are structured. Its <strong>semantics</strong> says what those programs mean: what value they compute, or what they do. The two are independent. The same syntax can mean different things:</p>
<ul>
<li><code>7 / 2</code> is 3.5 in Python 3, but 3 in C (and in Python 2), where dividing two integers throws away the fraction.</li>
<li><code>x = x + 1</code> is a sensible statement in Python and a false equation in algebra.</li>
</ul>
<p>And different syntax can mean the same thing: in C, <code>a[i]</code> and <code>*(a + i)</code> are the same expression (CS 210 Lesson 4), and <code>x += 1</code> means <code>x = x + 1</code> in both C and Python for numbers. A feature that only adds a nicer way to write something the language already has is called <strong>syntactic sugar</strong>.</p>

<h3>Concrete and abstract syntax</h3>
<p>The text of a program is its <strong>concrete syntax</strong>. A parser reads it and builds a tree (CS 320 Lesson 5 built parse trees from grammars). For running the program, most details of the text don't matter: spaces, comments, and even parentheses, whose only job was to say how to group things. What matters is the structure, which an <strong>abstract syntax tree</strong> (AST) keeps: each node is an operation or a construct, and its children are the parts it combines. The texts <code>1 + 2 * 3</code>, <code>1+(2*3)</code> and <code>(1 + (2 * 3))</code> are different strings with the same AST.</p>
<figure class="fig"><svg viewBox="0 0 400 200" width="400" role="img" aria-label="The abstract syntax tree of 1 + 2 * 3: a plus node at the root, with children 1 and a times node; the times node has children 2 and 3.">
<g class="ln"><line x1="200" y1="45" x2="125" y2="88"/><line x1="200" y1="45" x2="275" y2="88"/><line x1="275" y1="115" x2="225" y2="158"/><line x1="275" y1="115" x2="325" y2="158"/></g>
<g class="box"><circle cx="200" cy="32" r="16"/><circle cx="120" cy="102" r="16"/><circle cx="275" cy="102" r="16"/><circle cx="220" cy="172" r="16"/><circle cx="330" cy="172" r="16"/></g>
<g class="text"><text x="200" y="38" text-anchor="middle">+</text><text x="120" y="108" text-anchor="middle">1</text><text x="275" y="108" text-anchor="middle">*</text><text x="220" y="178" text-anchor="middle">2</text><text x="330" y="178" text-anchor="middle">3</text></g>
</svg><figcaption>The AST of <code>1 + 2 * 3</code>. Precedence is gone from the tree: the multiplication is simply lower down, so it happens first.</figcaption></figure>
<p>Python will show you its own AST for any code, with the standard <code>ast</code> module (CS 102 Lesson 8 tried it):</p>
<pre><code>import ast
print(ast.dump(ast.parse("1 + 2 * 3", mode="eval").body))</code></pre>
<pre data-label="Output"><code>BinOp(left=Constant(value=1), op=Add(), right=BinOp(left=Constant(value=2), op=Mult(), right=Constant(value=3)))</code></pre>
<p>(<code>mode="eval"</code> parses a single expression rather than a whole program, and <code>.body</code> is that expression's tree.) Every Python tool that reads code, from the interpreter to mypy and linters, works on this tree, not on the text.</p>

<h3>S-expressions</h3>
<p>Parsing a language with precedence and many kinds of statements is a subject of its own (CS 320 Lesson 5, and the CS 365 elective). To spend our time on meaning instead, our languages use the notation of Lisp, the language John McCarthy designed in 1958: <strong>s-expressions</strong> (symbolic expressions). An s-expression is either an <em>atom</em>, such as a number <code>42</code> or a name <code>x</code>, or a parenthesized list of s-expressions. A compound expression puts the operator first:</p>
<table>
<tr><th>Usual notation</th><th>S-expression</th><th>Python value we use as its AST</th></tr>
<tr><td><code>1 + 2 * 3</code></td><td><code>(+ 1 (* 2 3))</code></td><td><code>['+', 1, ['*', 2, 3]]</code></td></tr>
<tr><td><code>(1 + 2) * 3</code></td><td><code>(* (+ 1 2) 3)</code></td><td><code>['*', ['+', 1, 2], 3]</code></td></tr>
<tr><td><code>10 - 4 - 3</code></td><td><code>(- (- 10 4) 3)</code></td><td><code>['-', ['-', 10, 4], 3]</code></td></tr>
</table>
<p>Because every compound expression is parenthesized and starts with its operator, there is no precedence and no ambiguity: the text already <em>is</em> the tree, written with brackets. In Python we represent an s-expression directly: a number as an <code>int</code>, a name as a <code>str</code>, and a list as a Python list. That nested list is our AST.</p>
<p>Turning text into these lists takes two small steps. A <strong>tokenizer</strong> splits the text into tokens; putting spaces around each parenthesis lets <code>split</code> do all the work:</p>
<pre><code>def tokenize(text):
    return text.replace("(", " ( ").replace(")", " ) ").split()

print(tokenize("(+ 1 (* 2 3))"))   # ['(', '+', '1', '(', '*', '2', '3', ')', ')']</code></pre>
<p>Then a <strong>reader</strong> (Lisp's name for this tiny parser) builds the nested lists. <code>read_from(tokens, i)</code> reads one s-expression starting at position <code>i</code> and returns it together with the position just after it. An open parenthesis starts a list: read s-expressions until the matching close parenthesis. Anything else is an atom: an integer if <code>int</code> accepts it, otherwise a name.</p>
<pre><code>def atom(token):
    try:
        return int(token)
    except ValueError:
        return token

def read_from(tokens, i):
    if i == len(tokens):
        raise SyntaxError("unexpected end of input")
    token = tokens[i]
    if token == ")":
        raise SyntaxError("unexpected )")
    if token != "(":
        return atom(token), i + 1
    items = []
    i += 1                                  # skip the "("
    while i &lt; len(tokens) and tokens[i] != ")":
        item, i = read_from(tokens, i)      # each item may itself be a list
        items.append(item)
    if i == len(tokens):
        raise SyntaxError("missing )")
    return items, i + 1                     # skip the ")"

def read(text):
    tokens = tokenize(text)
    expr, i = read_from(tokens, 0)
    if i != len(tokens):
        raise SyntaxError("extra input after the expression")
    return expr

print(read("(+ 1 (* 2 3))"))   # ['+', 1, ['*', 2, 3]]
print(read("42"))              # 42</code></pre>
<p>This is a recursive-descent parser for the grammar <em>S</em> → atom | ( <em>S</em>* ), the kind CS 320 Lesson 5 wrote with one function per variable. On <code>"(+ 1 2"</code> it raises <code>SyntaxError: missing )</code>, on <code>")"</code> it raises <code>unexpected )</code>, and on <code>"(+ 1 2) 3"</code> it raises <code>extra input after the expression</code>. <code>SyntaxError</code> is Python's built-in exception for malformed code, and we reuse it for ours.</p>

<h3>Python's match statement</h3>
<p>An interpreter mostly asks "what shape is this tree?", and Python 3.10 added a statement for exactly that question. A <code>match</code> statement compares a value against <strong>patterns</strong>, one <code>case</code> at a time, and runs the body of the first case that matches:</p>
<pre><code>def describe(x):
    match x:
        case 0:
            return "zero"
        case int(n) if n &lt; 0:
            return "negative"
        case int(n):
            return f"the number {n}"
        case ["+", left, right]:
            return f"a sum of {left!r} and {right!r}"
        case [first, *rest]:
            return f"a list starting with {first!r} and {len(rest)} more"
        case str():
            return "a name"
        case _:
            return "something else"

print(describe(-5))              # negative
print(describe(7))               # the number 7
print(describe(["+", 1, 2]))     # a sum of 1 and 2
print(describe(["*", 1, 2, 3]))  # a list starting with '*' and 3 more
print(describe("x"))             # a name
print(describe([]))              # something else</code></pre>
<p>The kinds of pattern used in this course:</p>
<ul>
<li>A <strong>literal</strong> such as <code>0</code> or <code>"+"</code> matches a value equal to it.</li>
<li>A <strong>capture pattern</strong>, a bare name such as <code>left</code>, matches anything and binds the name to it. The name <code>_</code> is a <strong>wildcard</strong>: it matches anything and binds nothing.</li>
<li>A <strong>sequence pattern</strong> in square brackets matches a list or tuple (never a string) with exactly that many elements, each matching its sub-pattern. <code>*rest</code> collects any remaining elements into a list, so <code>[first, *rest]</code> matches any non-empty list.</li>
<li>A <strong>class pattern</strong> <code>int(n)</code> matches a value for which <code>isinstance(value, int)</code> is true and binds <code>n</code> to it; <code>str()</code> just checks the type.</li>
<li>A <strong>guard</strong>, <code>if</code> and a condition after the pattern, must also be true for the case to match.</li>
</ul>
<p>Two warnings. If no case matches, <code>match</code> does nothing at all, so an interpreter should end with <code>case _:</code> and raise an error. And <code>bool</code> is a subclass of <code>int</code> in Python, so <code>int(n)</code> also matches <code>True</code> and <code>False</code>; Lesson 2 puts a <code>bool()</code> case first for that reason.</p>

<h3>Evaluation by structural recursion</h3>
<p>Our first language, which we'll call Calc, has integers and the three operators <code>+</code>, <code>-</code> and <code>*</code>, each with two operands. Its evaluator has one case for each kind of node:</p>
<pre><code>def evaluate(e):
    match e:
        case int(n):
            return n
        case ["+", left, right]:
            return evaluate(left) + evaluate(right)
        case ["-", left, right]:
            return evaluate(left) - evaluate(right)
        case ["*", left, right]:
            return evaluate(left) * evaluate(right)
        case _:
            raise ValueError(f"not an expression: {e!r}")

print(evaluate(read("(+ 1 (* 2 3))")))          # 7
print(evaluate(read("(* (+ 1 2) (- 10 4))")))   # 18</code></pre>
<p>Trace the second one. <code>evaluate</code> sees a <code>*</code> node, so it evaluates the left child <code>['+', 1, 2]</code>, which evaluates 1 and 2 and returns 3; then the right child <code>['-', 10, 4]</code>, which returns 6; then it returns 3 × 6 = 18. Each call handles one node and leaves its children to recursive calls. This shape, one case per kind of node, recursing on the children, is called <strong>structural recursion</strong>, and it is the shape of almost every function in this course: evaluators, type checkers, printers and optimizers.</p>
<p>Structural recursion always terminates on a finite tree, because each recursive call is on a proper subtree, which has fewer nodes. It also invites proofs by <strong>structural induction</strong>, which is strong induction (MATH 120 Lesson 6) on the size of the tree: to show every expression has some property, show it for atoms, and show it for a compound node assuming it holds for the children. For example: <em>for every Calc expression e, evaluate(e) returns an integer</em>. An atom <code>n</code> returns the integer <code>n</code>. For <code>['+', l, r]</code>, by the induction hypothesis <code>evaluate(l)</code> and <code>evaluate(r)</code> return integers, and their sum is an integer; <code>-</code> and <code>*</code> are the same. (Malformed input such as <code>['+', 1]</code> isn't a Calc expression; it raises <code>ValueError: not an expression: ['+', 1]</code>.)</p>

<h3>Semantics written as rules</h3>
<p>The evaluator defines Calc's meaning, but only by being a Python program, which inherits Python's meaning. Language designers also write semantics in a notation that is independent of any implementation. Write <em>e</em> ⇓ <em>v</em>, read "<em>e</em> evaluates to <em>v</em>". An <strong>inference rule</strong> has premises above a line and a conclusion below it: if everything above holds, the conclusion holds. A rule with no premises is an axiom.</p>
<pre data-label="Rules"><code>                     e1 ⇓ n1    e2 ⇓ n2
  ───── (num)     ─────────────────────── (add)
  n ⇓ n             (+ e1 e2) ⇓ n1 + n2

    e1 ⇓ n1    e2 ⇓ n2
  ─────────────────────── (mul)
    (* e1 e2) ⇓ n1 × n2</code></pre>
<p>(The rule for <code>-</code> is like (add).) This style, relating an expression directly to its final value, is called <strong>big-step</strong> or natural semantics. Each rule corresponds to one <code>case</code> of <code>evaluate</code>, and a run of the evaluator corresponds to a <strong>derivation</strong>: a tree of rule uses whose root is the conclusion we want. Here is the derivation for <code>(+ 1 (* 2 3)) ⇓ 7</code>, with the root at the bottom:</p>
<pre data-label="Derivation"><code>              2 ⇓ 2 (num)   3 ⇓ 3 (num)
              ───────────────────────── (mul)
  1 ⇓ 1 (num)      (* 2 3) ⇓ 6
  ───────────────────────────────────── (add)
           (+ 1 (* 2 3)) ⇓ 7</code></pre>
<p>Lesson 5 uses the same notation for typing rules. Rules like these are how the definitions of Standard ML, WebAssembly and other languages are written, and they let you prove facts about every program, as we just did by induction.</p>

<h3>Interpreters and compilers</h3>
<p>An <strong>interpreter</strong> runs a program by walking its AST, as <code>evaluate</code> does. A <strong>compiler</strong> translates it into another language, often machine code (CS 210 Lessons 5 and 6 read the x86-64 that GCC produces), and the CS 365 elective builds one. Real systems mix the two: CPython compiles your code to bytecode and then interprets the bytecode (CS 101's optional lesson "How Python actually runs your code"). An interpreter written in a well-understood language is also a precise definition of a new one, called a <strong>definitional interpreter</strong>. That is how we'll use ours.</p>
`,
      terms: [
        ["Syntax", "The rules for which strings are programs and how they are structured."],
        ["Semantics", "What programs mean: the values they compute and the effects they have."],
        ["Syntactic sugar", "A construct that only provides a more convenient way to write something the language can already express."],
        ["Concrete syntax", "The text of a program, including details such as spaces and parentheses."],
        ["Abstract syntax tree (AST)", "A tree representing a program's structure, with a node for each construct and its parts as children."],
        ["S-expression", "Lisp's notation: an atom, or a parenthesized list of s-expressions with the operator first."],
        ["Tokenizer", "The step that splits program text into tokens such as numbers, names and parentheses."],
        ["Reader", "A minimal parser that turns s-expression tokens into nested lists."],
        ["Pattern matching", "Choosing a case by the shape of a value, and binding names to its parts; Python's match statement."],
        ["Structural recursion", "Recursion with one case per kind of node, calling itself on the node's children."],
        ["Structural induction", "Proving a property of all trees by proving it for leaves and for each node assuming it for the children."],
        ["Big-step semantics", "Semantics given by rules for e ⇓ v, relating an expression directly to its final value."],
        ["Inference rule", "A rule with premises above a line and a conclusion below: if the premises hold, so does the conclusion."],
        ["Definitional interpreter", "An interpreter used as the precise definition of a language's meaning."]
      ],
      quiz: [
        { q: "In C, 7 / 2 is 3; in Python 3 it is 3.5. What do the two languages differ in here?", choices: ["Syntax only", "Semantics: the same text means different things", "Neither; it is a compiler bug", "Tokenization"], answer: 1, why: "The expression is written identically, so the syntax agrees; the meaning of / on integers differs." },
        { q: "Which of these is the s-expression for (8 - 3) * 2?", choices: ["(- 8 (* 3 2))", "(* (- 8 3) 2)", "(8 - 3 * 2)", "(* 2 - 8 3)"], answer: 1, why: "The operator comes first, and the subtraction is the left operand of the multiplication." },
        { q: "What does read(\"((1))\") return?", choices: ["1", "[1]", "[[1]]", "It raises SyntaxError"], answer: 2, why: "Each pair of parentheses is a list; the outer list holds one item, the inner list [1]." },
        { q: "In a match statement, which pattern matches the list [\"-\", 5, 2] and binds a to 5?", choices: ["case [\"-\", a]", "case [\"-\", a, _]", "case (\"-\" a b)", "case str(a)"], answer: 1, why: "A sequence pattern must have exactly three elements here; _ matches the 2 without binding it." },
        { q: "Why does evaluate always terminate on a finite Calc expression?", choices: ["Python limits recursion depth", "Each recursive call is on a proper subtree, which has fewer nodes", "Because integers are bounded", "Because match statements cannot loop"], answer: 1, why: "The size of the argument strictly decreases on each call, so the recursion bottoms out at atoms." },
        { q: "In the rule (add), what must be true before we may conclude (+ e1 e2) ⇓ n1 + n2?", choices: ["Nothing; it is an axiom", "e1 ⇓ n1 and e2 ⇓ n2", "n1 and n2 are positive", "e1 and e2 are numbers"], answer: 1, why: "The premises above the line are e1 ⇓ n1 and e2 ⇓ n2; e1 and e2 may be any expressions." }
      ],
      practice: [
        {
          q: `<p>(a) Write <code>(2 * x) - (1 + 1)</code> as an s-expression and as the Python list <code>read</code> returns. (b) How many nodes does its AST have, drawn as in the figure (each operator labels the node for its expression; it isn't a separate leaf)? (c) What does <code>evaluate</code> do with it, and why?</p>`,
          a: `<p>(a) <code>(- (* 2 x) (+ 1 1))</code>, read as <code>['-', ['*', 2, 'x'], ['+', 1, 1]]</code>. (b) 7 nodes: <code>-</code>, <code>*</code>, 2, x, <code>+</code>, 1, 1. (c) It raises <code>ValueError</code> when it reaches <code>'x'</code>: a string matches none of Calc's cases, because Calc has no variables yet. Lesson 2 adds them.</p>`
        },
        {
          q: `<p>Write the derivation of <code>(* (+ 1 2) (- 5 1)) ⇓ 12</code> using the rules in the notes (the rule (sub) for <code>-</code> is like (add)).</p>`,
          a: `<pre data-label="Derivation"><code>  1 ⇓ 1   2 ⇓ 2            5 ⇓ 5   1 ⇓ 1
  ───────────── (add)      ───────────── (sub)
  (+ 1 2) ⇓ 3              (- 5 1) ⇓ 4
  ──────────────────────────────────────── (mul)
          (* (+ 1 2) (- 5 1)) ⇓ 12</code></pre><p>Each number at the top is justified by (num). The two premises of (mul) are themselves conclusions of (add) and (sub).</p>`
        },
        {
          q: `<p>Write <code>depth(e)</code>, the number of nodes on the longest path from the root of an s-expression to a leaf (an atom has depth 1), using <code>match</code>. Check that <code>depth(read("(+ 1 (* 2 3))"))</code> is 3.</p>`,
          hint: `<p>An atom is anything that isn't a list. A list is one node, and its depth is 1 more than the deepest of its operands. In the Python list the operator symbol is also an item, an atom of depth 1, but no operand is shallower than 1, so you may simply take the maximum over all the items and add 1.</p>`,
          a: `<pre><code>def depth(e):
    match e:
        case [*items]:
            return 1 + max((depth(x) for x in items), default=0)
        case _:
            return 1

print(depth(read("(+ 1 (* 2 3))")))   # 3
print(depth(7))                       # 1</code></pre><p><code>[*items]</code> matches any list and binds all its elements. <code>max</code> with <code>default=0</code> handles the empty list <code>()</code>, whose depth is 1.</p>`
        },
        {
          q: `<p>Add unary negation to Calc: <code>(neg e)</code> evaluates to minus the value of <code>e</code>. Write its rule, and add its case to <code>evaluate</code>. Does the order of cases matter here?</p>`,
          a: `<pre data-label="Rules"><code>      e ⇓ n
  ───────────── (neg)
  (neg e) ⇓ −n</code></pre><pre><code>def evaluate(e):
    match e:
        case int(n):
            return n
        case ["neg", inner]:
            return -evaluate(inner)
        case ["+", left, right]:
            return evaluate(left) + evaluate(right)
        case ["-", left, right]:
            return evaluate(left) - evaluate(right)
        case ["*", left, right]:
            return evaluate(left) * evaluate(right)
        case _:
            raise ValueError(f"not an expression: {e!r}")

print(evaluate(read("(neg (- 2 5))")))   # 3</code></pre><p>Here the order doesn't matter, because no two cases can match the same value: <code>["neg", inner]</code> has two elements and the others three, and the first elements differ. Order matters when patterns overlap, as with <code>case 0</code> before <code>case int(n)</code> in <code>describe</code>; the catch-all <code>case _</code> must always come last.</p>`
        }
      ],
      sources: ["sicp", "plai", "pymatch", "crafting"]
    },
    {
      id: "pl2",
      title: "An interpreter: variables and scope",
      minutes: 90,
      summary: "Variables and let; free and bound variables and shadowing; two ways to give variables meaning, substitution and environments; booleans and if; and top-level functions, used to tell lexical (static) scope from dynamic scope.",
      notes: `
<p>Calc can only compute with constants. Real programs name things. This lesson adds variables to the language, which we'll call <strong>Mini</strong> from now on and grow for the rest of the course, and then asks the central question about names: when a program mentions <code>x</code>, <em>which</em> <code>x</code> does it mean?</p>

<p>Programs are written as s-expressions and turned into nested lists by Lesson 1's reader. Here it is again, condensed into one function with the helper inside it; this and later lessons use it without comment.</p>
<pre><code>def read(text):
    """Lesson 1's reader, as one function: s-expression text to nested lists."""
    tokens = text.replace("(", " ( ").replace(")", " ) ").split()

    def item(i):                            # read one s-expression at tokens[i]
        if i == len(tokens):
            raise SyntaxError("unexpected end of input")
        if tokens[i] == ")":
            raise SyntaxError("unexpected )")
        if tokens[i] != "(":
            try:
                return int(tokens[i]), i + 1
            except ValueError:
                return tokens[i], i + 1
        items, i = [], i + 1
        while i &lt; len(tokens) and tokens[i] != ")":
            x, i = item(i)
            items.append(x)
        if i == len(tokens):
            raise SyntaxError("missing )")
        return items, i + 1

    expr, i = item(0)
    if i != len(tokens):
        raise SyntaxError("extra input after the expression")
    return expr</code></pre>

<h3>let, booleans and if</h3>
<p>Mini adds three things to Calc:</p>
<ul>
<li><code>(let (x e1) e2)</code> evaluates <code>e1</code>, then evaluates <code>e2</code> with <code>x</code> standing for that value. <code>(let (x 5) (* x x))</code> is 25. It is like Python's <code>x = 5</code> followed by <code>x * x</code>, except that the name exists only inside <code>e2</code>.</li>
<li>The constants <code>true</code> and <code>false</code>, and the comparisons <code>(&lt; a b)</code> and <code>(= a b)</code>.</li>
<li><code>(if c e1 e2)</code>, which evaluates <code>c</code> and then only <em>one</em> of <code>e1</code> and <code>e2</code>.</li>
</ul>
<p>A variable is just a name, so in the AST it is a string such as <code>'x'</code>; <code>read("(let (x 5) (* x x))")</code> gives <code>['let', ['x', 5], ['*', 'x', 'x']]</code>.</p>

<h3>Environments</h3>
<p>To evaluate <code>(* x x)</code> the evaluator must know what <code>x</code> stands for. An <strong>environment</strong> is a mapping from names to values; in Python, a dict. The evaluator takes it as a second argument:</p>
<pre><code>OPS = {
    "+": lambda a, b: a + b,
    "-": lambda a, b: a - b,
    "*": lambda a, b: a * b,
    "&lt;": lambda a, b: a &lt; b,
    "=": lambda a, b: a == b,
}

def evaluate(e, env):
    match e:
        case bool(b):                        # before int: True is an int too
            return b
        case int(n):
            return n
        case "true":
            return True
        case "false":
            return False
        case str(name):
            if name not in env:
                raise NameError(f"unbound variable {name}")
            return env[name]
        case [str(op), left, right] if op in OPS:
            return OPS[op](evaluate(left, env), evaluate(right, env))
        case ["if", test, then, other]:
            if evaluate(test, env):
                return evaluate(then, env)
            return evaluate(other, env)
        case ["let", [str(name), rhs], body]:
            value = evaluate(rhs, env)
            return evaluate(body, env | {name: value})
        case _:
            raise ValueError(f"not an expression: {e!r}")

print(evaluate(read("(let (x 5) (* x x))"), {}))                     # 25
print(evaluate(read("(let (x 2) (let (y (+ x 1)) (* x y)))"), {}))   # 6
print(evaluate(read("(if (&lt; 3 4) 10 20)"), {}))                     # 10</code></pre>
<p><code>OPS</code> maps each operator to a function, so one case handles all five: the class pattern <code>str(op)</code> checks that the first element is a string, and the guard checks that it is one of the five. (Testing <code>op in OPS</code> on a list would raise <code>TypeError</code>, because a list can't be a dict key; that matters once operators can be expressions, in Lesson 3.) The <code>let</code> case is the heart of it: <code>env | {name: value}</code> builds a <em>new</em> dict containing the entries of <code>env</code> plus the new binding (when a name is in both, the right-hand dict wins). The old dict is untouched, so when <code>evaluate(body, ...)</code> returns, the binding is gone, which is exactly the "only inside the body" rule. Evaluating <code>(+ y 1)</code> in the empty environment raises <code>NameError: unbound variable y</code>.</p>
<p>The <code>if</code> case evaluates only one branch. That is not an optimization; it is the meaning of <code>if</code>. Under a rule that evaluated both, <code>(if (= d 0) 0 (/ 10 d))</code> would fail when <code>d</code> is 0. This is why <code>if</code> must be built into the evaluator rather than defined as an ordinary function: a function's arguments are all evaluated before it is called. (Python's <code>and</code> and <code>or</code> are special for the same reason.)</p>

<h3>Bound, free and shadowed</h3>
<p>In <code>(let (x e1) e2)</code>, the <code>x</code> after <code>let</code> is a <strong>binding occurrence</strong>, and <code>e2</code> is its <strong>scope</strong>: the region of the program where that binding is visible. A use of a variable inside the scope of a binding of the same name is <strong>bound</strong> by the nearest enclosing such binding; a use that isn't inside any is <strong>free</strong>. In <code>(let (x y) (+ x z))</code>, <code>x</code> is bound, and <code>y</code> and <code>z</code> are free. A free variable needs a value from outside; a program with a free variable and an empty environment is an error.</p>
<p>When an inner binding has the same name as an outer one, it <strong>shadows</strong> it inside its own scope:</p>
<pre><code>print(evaluate(read("(let (x 1) (+ (let (x 2) x) x))"), {}))   # 3</code></pre>
<p>The inner <code>x</code> is 2, and the last <code>x</code>, outside the inner <code>let</code>, is the outer one, 1. Free variables can be computed by structural recursion, with <code>let</code> the only interesting case: the body's free variables, minus the bound name, plus those of the right-hand side (which is not in the scope of the new binding).</p>
<pre><code>def free_vars(e):
    match e:
        case "true" | "false":
            return set()
        case str(name):
            return {name}
        case ["let", [name, rhs], body]:
            return free_vars(rhs) | (free_vars(body) - {name})
        case [str(op), *args] if op in OPS or op == "if":
            return set().union(*(free_vars(a) for a in args))
        case _:
            return set()                     # numbers and booleans

print(sorted(free_vars(read("(let (x y) (+ x z))"))))   # ['y', 'z']</code></pre>
<p>(The pattern <code>"true" | "false"</code> matches either alternative. <code>set().union(*sets)</code> is the union of any number of sets.) The name of a bound variable doesn't matter: <code>(let (x 5) (* x x))</code> and <code>(let (w 5) (* w w))</code> mean the same thing. Renaming a bound variable consistently, without capturing any other name, is called <strong>alpha-renaming</strong>, and two expressions that differ only that way are <strong>alpha-equivalent</strong>.</p>

<h3>Substitution: another way to give let its meaning</h3>
<p>There is a second, older way to explain <code>let</code>, the one from algebra: to evaluate <code>(let (x 5) (* x x))</code>, replace every <code>x</code> in the body by 5 and evaluate <code>(* 5 5)</code>. Writing <em>e</em>[<em>x</em> := <em>v</em>] for "<em>e</em> with <em>v</em> substituted for the free occurrences of <em>x</em>", the rule is</p>
<pre data-label="Rules"><code>   e1 ⇓ v1      e2[x := v1] ⇓ v2
  ──────────────────────────────── (let)
       (let (x e1) e2) ⇓ v2</code></pre>
<p>The word <em>free</em> is essential. Substituting into a <code>let</code> that rebinds the same name must stop at its body, because inside it the name means something else:</p>
<pre><code>def subst(e, name, value):
    match e:
        case str() if e == name:
            return value
        case ["let", [x, rhs], body]:
            rhs = subst(rhs, name, value)          # the rhs is outside the new scope
            if x == name:
                return ["let", [x, rhs], body]     # shadowed: leave the body alone
            return ["let", [x, rhs], subst(body, name, value)]
        case [*items]:
            return [subst(item, name, value) for item in items]
        case _:
            return e

print(subst(read("(+ x (let (x 2) x))"), "x", 7))   # ['+', 7, ['let', ['x', 2], 'x']]

def eval_subst(e):
    match e:
        case bool() | int():
            return e
        case "true":
            return True
        case "false":
            return False
        case str(name):
            raise NameError(f"unbound variable {name}")   # every bound name was replaced
        case [str(op), left, right] if op in OPS:
            return OPS[op](eval_subst(left), eval_subst(right))
        case ["if", test, then, other]:
            return eval_subst(then) if eval_subst(test) else eval_subst(other)
        case ["let", [name, rhs], body]:
            return eval_subst(subst(body, name, eval_subst(rhs)))
        case _:
            raise ValueError(f"not an expression: {e!r}")

print(eval_subst(read("(let (x 1) (+ (let (x 2) x) x))")))   # 3</code></pre>
<p>Substituting a value puts a Python <code>True</code> or <code>False</code> into the tree, which is one reason the evaluators accept <code>bool</code> values as well as the names <code>true</code> and <code>false</code>. Both evaluators give the same answer on every Mini program, but they work differently. Substitution rewrites the program, copying the body once for every <code>let</code>, which is slow. An environment does no rewriting: it carries the bindings along and looks a name up only when it is used. Substitution is the easier one to reason with on paper, and it returns in the lambda calculus next lesson; environments are how interpreters are built.</p>

<h3>Functions, and which x a function sees</h3>
<p>To ask the scope question properly we need functions. For now Mini gets <em>top-level</em> definitions, as in C: a program is a list of forms, the last of which is the expression to evaluate. <code>(define x 1)</code> defines a global variable, <code>(define (f y) body)</code> a function, and <code>(f 5)</code> calls it. Here is the test program:</p>
<pre data-label="Mini"><code>(define x 1)
(define (f y) (+ x y))
(define (g x) (f 0))
(g 5)</code></pre>
<p>The call <code>(g 5)</code> binds <code>g</code>'s parameter <code>x</code> to 5 and calls <code>(f 0)</code>. Inside <code>f</code>, <code>x</code> is free. Is it the global <code>x</code>, which is 1, or <code>g</code>'s <code>x</code>, which is 5 and is in effect at the moment <code>f</code> runs? Both answers have been used by real languages.</p>
<ul>
<li>Under <strong>lexical scope</strong> (also <strong>static scope</strong>), a free variable refers to the binding that encloses it <em>in the program text</em>. <code>f</code> is written at the top level, where <code>x</code> is the global, so the answer is 1. You can tell what a name refers to by reading the code around it.</li>
<li>Under <strong>dynamic scope</strong>, a free variable refers to the most recent binding <em>still in effect at run time</em>, whoever made it. <code>f</code> was called from <code>g</code>, whose <code>x</code> is 5, so the answer is 5.</li>
</ul>
<p>In an interpreter the difference is a single line: which environment the function's body is evaluated in. Lexically, it is the global environment (where <code>f</code> was defined) plus the parameters; dynamically, it is the <em>caller's</em> environment plus the parameters.</p>
<pre><code>def run(forms, dynamic=False):
    globals_env, funcs = {}, {}

    def ev(e, env):
        match e:
            case [str(f), *args] if f in funcs:
                params, body = funcs[f]
                values = [ev(a, env) for a in args]
                base = env if dynamic else globals_env       # the one line
                return ev(body, base | dict(zip(params, values)))
            case [str(op), left, right] if op in OPS:
                return OPS[op](ev(left, env), ev(right, env))
            case ["if", test, then, other]:
                return ev(then, env) if ev(test, env) else ev(other, env)
            case ["let", [str(name), rhs], body]:
                return ev(body, env | {name: ev(rhs, env)})
            case _:
                return evaluate(e, env)                      # numbers, booleans, variables

    *defs, main = forms
    for d in defs:
        match d:
            case ["define", [str(name), *params], body]:
                funcs[name] = (params, body)
            case ["define", str(name), rhs]:
                globals_env[name] = ev(rhs, globals_env)
    return ev(main, globals_env)

program = read("((define x 1) (define (f y) (+ x y)) (define (g x) (f 0)) (g 5))")
print(run(program))                 # 1
print(run(program, dynamic=True))   # 5</code></pre>
<p><code>ev</code> is defined inside <code>run</code> so that it can use <code>funcs</code>, <code>globals_env</code> and <code>dynamic</code> without passing them around (a closure, CS 102 Lesson 5). <code>*defs, main = forms</code> splits the list into all forms but the last, and the last. <code>dict(zip(params, values))</code> pairs each parameter with its argument's value. Recursion works under both rules, because <code>funcs</code> is consulted at each call: <code>(define (fact n) (if (&lt; n 1) 1 (* n (fact (- n 1)))))</code> followed by <code>(fact 5)</code> gives 120.</p>

<h3>Why lexical scope won</h3>
<p>Dynamic scope is easy to implement (early Lisps used it, and it is still how variables work in shell scripts), but it has a fatal flaw: a function's meaning depends on the local variable names of every function that might call it. Rename <code>g</code>'s parameter from <code>x</code> to <code>w</code>, a change that should be invisible from outside <code>g</code>, and under dynamic scope <code>(g 5)</code> changes from 5 to 1. Alpha-renaming no longer preserves meaning, and no function can be understood by reading it alone. The Bash shell, for example, is dynamically scoped for variables declared <code>local</code>:</p>
<pre data-label="Shell"><code>x=1
f() { echo "f sees x=$x"; }
g() { local x=5; f; }
g       # f sees x=5
f       # f sees x=1</code></pre>
<p>Almost every language designed since the 1970s, including Python, C, Java, JavaScript and Rust, uses lexical scope, and Emacs Lisp, one of the last major dynamically scoped languages, added lexical scope in 2012. Dynamic scope survives where its "action at a distance" is the point: a setting that every function called from here should see, such as Python's <code>decimal.localcontext()</code> for the precision of decimal arithmetic. Lexical scope also lets a compiler resolve every name before the program runs; Python does this for each function, which is why assigning to <code>x</code> anywhere in a function makes every <code>x</code> in that function local, even uses earlier in the body. Reading such an <code>x</code> before the assignment has run raises <code>UnboundLocalError</code> (a subclass of <code>NameError</code>): the name is known to be local, but the local has no value yet.</p>
<p>So far functions live only at the top level. Next lesson makes them values that can be created anywhere, passed and returned, and lexical scope then needs a new mechanism: the closure.</p>
`,
      terms: [
        ["Environment", "A mapping from variable names to values, used by an interpreter to look up variables."],
        ["Binding occurrence", "The place where a name is introduced, such as the x in (let (x e1) e2)."],
        ["Scope", "The region of a program in which a binding is visible."],
        ["Bound variable", "A use of a name inside the scope of a binding of that name."],
        ["Free variable", "A use of a name that no enclosing binding binds; it must get its value from outside."],
        ["Shadowing", "An inner binding hiding an outer binding of the same name within the inner scope."],
        ["Substitution", "Replacing the free occurrences of a variable in an expression by a value or expression, written e[x := v]."],
        ["Alpha-equivalence", "Two expressions are alpha-equivalent if they differ only by consistently renaming bound variables."],
        ["Lexical (static) scope", "A free variable refers to the binding that encloses it in the program text."],
        ["Dynamic scope", "A free variable refers to the most recent binding of that name still in effect at run time."]
      ],
      quiz: [
        { q: "What does (let (x 3) (let (y (* x x)) (- y x))) evaluate to?", choices: ["0", "3", "6", "9"], answer: 2, why: "y is 9, and 9 − 3 = 6." },
        { q: "In (let (x (+ y 1)) (* x z)), which variables are free?", choices: ["x only", "y and z", "x, y and z", "None"], answer: 1, why: "x is bound by the let; y (in the right-hand side, outside the new scope) and z are free." },
        { q: "What is (+ x (let (x 2) x))[x := 7]?", choices: ["(+ 7 (let (x 2) 7))", "(+ 7 (let (x 2) x))", "(+ 7 (let (7 2) 7))", "(+ x (let (x 2) 7))"], answer: 1, why: "Only free occurrences are replaced; inside the inner let, x refers to the inner binding." },
        { q: "Why must if be built into the evaluator rather than defined as a function?", choices: ["Functions can't return booleans", "A function's arguments are all evaluated before the call, but if must evaluate only one branch", "if needs three arguments", "For speed only"], answer: 1, why: "Evaluating both branches would change the meaning, for example dividing by zero in the branch that should be skipped." },
        { q: "With (define x 1) (define (f) x) (define (h x) (f)), what is (h 9) under dynamic scope?", choices: ["1", "9", "An error", "10"], answer: 1, why: "Under dynamic scope f sees the most recent binding of x in effect at run time, h's parameter, which is 9." },
        { q: "What is the main problem with dynamic scope?", choices: ["It is slow to implement", "A function's meaning can change when a caller renames its local variables", "It doesn't allow recursion", "It requires a garbage collector"], answer: 1, why: "Free variables are resolved through callers' bindings, so renaming a caller's local, which should be invisible, changes behavior." }
      ],
      practice: [
        {
          q: `<p>For each use of a variable in <code>(let (a 1) (let (b (+ a 1)) (let (a (* a b)) (+ a b))))</code>, say which binding it refers to, then evaluate the expression.</p>`,
          a: `<p>The <code>a</code> in <code>(+ a 1)</code> is the outer <code>a</code> (1), so <code>b</code> is 2. In <code>(* a b)</code>, which is the right-hand side of the third <code>let</code> and therefore outside its scope, <code>a</code> is still the outer one, so the new <code>a</code> is 1 × 2 = 2. In <code>(+ a b)</code>, <code>a</code> is the inner one (2) and <code>b</code> is 2. Result: 4.</p><pre><code>print(evaluate(read("(let (a 1) (let (b (+ a 1)) (let (a (* a b)) (+ a b))))"), {}))   # 4</code></pre>`
        },
        {
          q: `<p>Evaluate <code>(let (x 3) (let (y x) (let (x 10) (+ x y))))</code> by substitution, writing each step.</p>`,
          a: `<p>Evaluate the right-hand side 3, then substitute 3 for <code>x</code> in the body: <code>(let (y 3) (let (x 10) (+ x y)))</code>. The inner <code>let</code> rebinds <code>x</code>, so its body was left alone, but its right-hand side <code>10</code> had no <code>x</code> anyway. Next, substitute 3 for <code>y</code>: <code>(let (x 10) (+ x 3))</code>. Then 10 for <code>x</code>: <code>(+ 10 3)</code>, which is 13.</p><pre><code>print(eval_subst(read("(let (x 3) (let (y x) (let (x 10) (+ x y))))")))   # 13</code></pre>`
        },
        {
          q: `<p>Write a Mini program, with top-level definitions, whose result is 10 under lexical scope and 20 under dynamic scope. Check it with <code>run</code>.</p>`,
          hint: `<p>You need a function with a free variable, and a caller that has a local binding of the same name.</p>`,
          a: `<pre><code>p = read("((define n 10) (define (get) n) (define (caller n) (get)) (caller 20))")
print(run(p))                 # 10
print(run(p, dynamic=True))   # 20</code></pre><p><code>get</code>'s free <code>n</code> is the global 10 lexically, but dynamically it is the binding made by <code>caller</code>, which is still in effect when <code>get</code> runs.</p>`
        },
        {
          q: `<p>This Python program raises an error. Which one, and what does it show about how Python decides scope?</p><pre data-label="Python"><code>x = 1
def f():
    print(x)
    x = 2
f()</code></pre>`,
          a: `<p>It raises <code>UnboundLocalError: cannot access local variable 'x' where it is not associated with a value</code> (the exact wording varies between Python versions). Python decides scope from the text of each function before running it: because <code>f</code> assigns to <code>x</code>, every <code>x</code> in <code>f</code> is local, including the one in <code>print(x)</code>, which runs before the local has a value. The global <code>x</code> is never consulted. This is lexical scope resolved at compile time, applied to the whole function body rather than from the point of assignment; <code>global x</code> at the top of <code>f</code> would make every <code>x</code> in it refer to the global instead.</p>`
        }
      ],
      sources: ["plai", "sicp", "mccarthy79", "pytutorial"]
    },
    {
      id: "pl3",
      title: "Functions, closures and the lambda calculus",
      minutes: 90,
      summary: "First-class functions in Mini; closures as code plus environment and why lexical scope needs them; higher-order functions and currying; recursion through the environment with letrec; and the lambda calculus: its syntax, beta reduction, capture-avoiding substitution, normal order and Church numerals.",
      notes: `
<p>In Lesson 2, functions were defined once, at the top level, by name. In Python you can do much more: create a function inside another, pass it to <code>sorted</code> as a key, return it from a function (CS 102 Lesson 5 did all three). A language whose functions are values like any other, which can be stored, passed, returned and created at run time, has <strong>first-class functions</strong>. This lesson adds them to Mini and then strips a language down to nothing <em>but</em> functions.</p>

<p>As in Lesson 2, programs are read with <code>read</code>, Lesson 1's reader written as one function, repeated here so that this lesson's code runs on its own:</p>
<pre><code>def read(text):
    """Lesson 1's reader, as one function: s-expression text to nested lists."""
    tokens = text.replace("(", " ( ").replace(")", " ) ").split()

    def item(i):                            # read one s-expression at tokens[i]
        if i == len(tokens):
            raise SyntaxError("unexpected end of input")
        if tokens[i] == ")":
            raise SyntaxError("unexpected )")
        if tokens[i] != "(":
            try:
                return int(tokens[i]), i + 1
            except ValueError:
                return tokens[i], i + 1
        items, i = [], i + 1
        while i &lt; len(tokens) and tokens[i] != ")":
            x, i = item(i)
            items.append(x)
        if i == len(tokens):
            raise SyntaxError("missing )")
        return items, i + 1

    expr, i = item(0)
    if i != len(tokens):
        raise SyntaxError("extra input after the expression")
    return expr</code></pre>
<h3>lambda and application</h3>
<p>Mini gets two new forms. <code>(lambda (x y) body)</code> is an anonymous function with parameters <code>x</code> and <code>y</code>, like Python's <code>lambda x, y: body</code>. And any list whose first element isn't a keyword or an operator is an <strong>application</strong>: <code>(f 1 2)</code> calls the value of <code>f</code> with arguments 1 and 2. The function position can be any expression, so <code>((lambda (x y) (* x y)) 6 7)</code> is 42.</p>
<p>What value should <code>(lambda (n) ...)</code> produce? Consider a function that makes adders:</p>
<pre data-label="Mini"><code>(let (add (lambda (n) (lambda (x) (+ x n))))
  (let (add5 (add 5))
    (add5 10)))</code></pre>
<p>The call <code>(add 5)</code> returns the inner function. By the time <code>add5</code> is called, <code>add</code> has returned, and its binding of <code>n</code> to 5 is no longer in any environment the caller has. Yet the inner function's body mentions <code>n</code>, and under lexical scope that <code>n</code> means the one in the text around it, which was 5. So a function value must carry the environment it was created in. That pair, the code of a function and the environment in which it was created, is a <strong>closure</strong>.</p>
<pre><code>from dataclasses import dataclass

@dataclass
class Closure:
    params: list
    body: object
    env: dict
    def __repr__(self):
        return f"&lt;closure with parameters {self.params}&gt;"</code></pre>
<p>(A closure's environment can contain the closure itself, as we'll see with recursion, so the dataclass's generated <code>__repr__</code>, which would print the whole environment, is replaced by a short one.) The evaluator from Lesson 2 gets three new cases, placed after the existing ones so that keywords and operators are tried first:</p>
<pre><code>OPS = {
    "+": lambda a, b: a + b, "-": lambda a, b: a - b, "*": lambda a, b: a * b,
    "&lt;": lambda a, b: a &lt; b, "=": lambda a, b: a == b,
}

def evaluate(e, env):
    match e:
        case bool(b):
            return b
        case int(n):
            return n
        case "true":
            return True
        case "false":
            return False
        case str(name):
            if name not in env:
                raise NameError(f"unbound variable {name}")
            return env[name]
        case [str(op), left, right] if op in OPS:
            return OPS[op](evaluate(left, env), evaluate(right, env))
        case ["if", test, then, other]:
            return evaluate(then, env) if evaluate(test, env) else evaluate(other, env)
        case ["let", [str(name), rhs], body]:
            return evaluate(body, env | {name: evaluate(rhs, env)})
        case ["lambda", [*params], body]:
            return Closure(params, body, env)                     # capture env
        case ["letrec", [str(name), rhs], body]:
            rec_env = env | {}                                    # a new dict
            rec_env[name] = evaluate(rhs, rec_env)
            return evaluate(body, rec_env)
        case [fn, *args]:
            f = evaluate(fn, env)
            values = [evaluate(a, env) for a in args]
            if not isinstance(f, Closure):
                raise TypeError(f"not a function: {f!r}")
            if len(values) != len(f.params):
                raise TypeError(f"expected {len(f.params)} arguments, got {len(values)}")
            return evaluate(f.body, f.env | dict(zip(f.params, values)))   # the closure's env
        case _:
            raise ValueError(f"not an expression: {e!r}")

def run(text):
    return evaluate(read(text), {})

print(run("(let (add (lambda (n) (lambda (x) (+ x n)))) (let (add5 (add 5)) (add5 10)))"))   # 15
print(run("((lambda (x y) (* x y)) 6 7)"))   # 42
print(run("(lambda (x) x)"))                 # &lt;closure with parameters ['x']&gt;</code></pre>
<p>Two lines carry the idea. Evaluating a <code>lambda</code> doesn't run anything: it packages the parameters and body with the <em>current</em> environment. Applying a closure evaluates its body in the closure's <em>saved</em> environment extended with the parameters, and the caller's environment plays no part. That is lexical scope, now for functions created anywhere. Lesson 2's test, rewritten with <code>lambda</code>, gives the lexical answer:</p>
<pre><code>print(run("(let (x 1) (let (f (lambda (y) (+ x y))) (let (x 100) (f 0))))"))   # 1</code></pre>
<p>Had we evaluated the body in the caller's environment instead (dynamic scope), <code>(add5 10)</code> would have raised <code>NameError: unbound variable n</code>, because no binding of <code>n</code> is in effect when <code>add5</code> runs. Early Lisp ran into exactly this, under the name of the <em>funarg problem</em>; this lesson's sidebar tells the story.</p>
<p>Python's functions are closures too, and you can look inside one:</p>
<pre><code>def make_adder(n):
    def add(x):
        return x + n
    return add

add5 = make_adder(5)
print(add5(10))                              # 15
print(add5.__code__.co_freevars)             # ('n',)
print(add5.__closure__[0].cell_contents)     # 5</code></pre>
<p><code>__code__</code> is the compiled body, shared by every function <code>make_adder</code> returns, and <code>co_freevars</code> lists its free variables. <code>__closure__</code> holds one <em>cell</em> per free variable for this particular function. A cell is a box holding a variable, not a copy of its value, which is why Python closures see later assignments to a captured variable (CS 102 Lesson 5's loop-variable surprise) and why <code>nonlocal</code> can change one.</p>

<h3>Higher-order functions and currying</h3>
<p>A <strong>higher-order function</strong> takes or returns functions. With closures they cost nothing extra:</p>
<pre><code>print(run("(let (twice (lambda (f x) (f (f x)))) (twice (lambda (n) (* n 2)) 5))"))   # 20</code></pre>
<p>Any function of two arguments can be turned into a function of one argument that returns a function of the other. <code>(lambda (x y) (- x y))</code> becomes <code>(lambda (x) (lambda (y) (- x y)))</code>, applied as <code>((f 10) 3)</code>. This transformation is <strong>currying</strong> (after the logician Haskell Curry), and it means that one-argument functions are enough in principle. Calling a curried function with only its first argument, <strong>partial application</strong>, is useful in practice: <code>(add 5)</code> above was one.</p>
<pre><code>print(run("(((lambda (x) (lambda (y) (- x y))) 10) 3)"))   # 7

def curry2(f):
    return lambda x: lambda y: f(x, y)

print(curry2(pow)(2)(10))   # 1024</code></pre>
<p>In OCaml and Haskell every function is curried: OCaml's <code>let add x y = x + y</code> has type <code>int -&gt; int -&gt; int</code>, read as <code>int -&gt; (int -&gt; int)</code>, and <code>add 5</code> is a function. Python's <code>functools.partial(f, 2)</code> does partial application without currying.</p>

<h3>Recursion needs the environment to contain the function</h3>
<p>Try factorial with <code>let</code>:</p>
<pre data-label="Mini"><code>(let (fact (lambda (n) (if (&lt; n 1) 1 (* n (fact (- n 1))))))
  (fact 10))</code></pre>
<p>This raises <code>NameError: unbound variable fact</code>. The <code>lambda</code> is evaluated in the environment <em>outside</em> the <code>let</code>, where <code>fact</code> doesn't exist yet, so the closure's saved environment has no <code>fact</code> in it. Lexical scope is working as designed: the right-hand side isn't in the scope of the binding. Recursion needs a binding form whose right-hand side <em>is</em> in its own scope. <code>letrec</code> (from Scheme) does this by building the closure's environment first and then putting the closure into it:</p>
<pre><code>print(run("(letrec (fact (lambda (n) (if (&lt; n 1) 1 (* n (fact (- n 1)))))) (fact 10))"))   # 3628800</code></pre>
<p><code>rec_env = env | {}</code> makes a fresh dict; the lambda captures that dict; then <code>rec_env[name] = ...</code> adds the closure to the very dict the closure holds. The closure points to the environment and the environment points back to the closure: a cycle, which is how recursion is represented in memory. (Cycles will matter again in Lesson 8, when we reclaim memory.) Python does the same thing differently: a global function's name is looked up in the module's globals each time it is called, and by then the <code>def</code> has stored it.</p>

<h3>The lambda calculus</h3>
<p>How small can a language be and still compute everything? In the 1930s Alonzo Church answered with the <strong>lambda calculus</strong>, which has only variables, functions and application. Its terms are</p>
<p class="math"><em>e</em> ::= <em>x</em> &nbsp;|&nbsp; λ<em>x</em>. <em>e</em> &nbsp;|&nbsp; <em>e</em> <em>e</em></p>
<p>A variable; an <em>abstraction</em> λ<em>x</em>. <em>e</em>, a one-argument function with parameter <em>x</em> and body <em>e</em> (Mini's <code>(lambda (x) e)</code>); and an application <em>e</em><sub>1</sub> <em>e</em><sub>2</sub>. Two conventions save parentheses: application associates to the left, so <em>f a b</em> means (<em>f a</em>) <em>b</em>, and a body extends as far right as possible, so λ<em>x</em>. <em>x y</em> means λ<em>x</em>. (<em>x y</em>). Free and bound variables are as in Lesson 2, with λ<em>x</em> binding <em>x</em> in its body. In Python we represent terms as a string for a variable, <code>("lam", x, body)</code> and <code>("app", f, a)</code>:</p>
<pre><code>def fv(t):
    match t:
        case str(x):
            return {x}
        case ("lam", x, body):
            return fv(body) - {x}
        case ("app", f, a):
            return fv(f) | fv(a)

print(sorted(fv(("lam", "x", ("app", "x", "y")))))   # ['y']</code></pre>
<p>Computation is one rule, <strong>beta reduction</strong>: an application of an abstraction reduces by substituting the argument for the parameter.</p>
<p class="math">(λ<em>x</em>. <em>e</em>) <em>a</em> &nbsp;→&nbsp; <em>e</em>[<em>x</em> := <em>a</em>]</p>
<p>A term of the form (λ<em>x</em>. <em>e</em>) <em>a</em> is a <strong>redex</strong> (reducible expression). For example, (λ<em>x</em>. <em>x x</em>) (λ<em>y</em>. <em>y</em>) → (λ<em>y</em>. <em>y</em>) (λ<em>y</em>. <em>y</em>) → λ<em>y</em>. <em>y</em>. A term with no redex anywhere in it is in <strong>normal form</strong>; that is the answer.</p>
<p>Substitution is subtler than in Lesson 2, because now we substitute <em>terms</em> that may have free variables, not just values. Reduce (λ<em>x</em>. λ<em>y</em>. <em>x</em>) <em>y</em>. The function takes <em>x</em> and returns a function that ignores its argument and returns <em>x</em>; applied to the free variable <em>y</em>, the result should be a function that ignores its argument and returns <em>y</em>. Naive substitution gives λ<em>y</em>. <em>y</em>, the identity function: the free <em>y</em> has been <strong>captured</strong> by the inner λ<em>y</em>. The fix is to alpha-rename the bound variable first: λ<em>y</em>. <em>x</em> is the same function as λ<em>y</em>1. <em>x</em>, and substituting into that gives λ<em>y</em>1. <em>y</em>, the right answer. <strong>Capture-avoiding substitution</strong> is defined case by case:</p>
<ul>
<li><em>x</em>[<em>x</em> := <em>a</em>] = <em>a</em>, and <em>z</em>[<em>x</em> := <em>a</em>] = <em>z</em> for any other variable <em>z</em>;</li>
<li>(<em>e</em><sub>1</sub> <em>e</em><sub>2</sub>)[<em>x</em> := <em>a</em>] = <em>e</em><sub>1</sub>[<em>x</em> := <em>a</em>] <em>e</em><sub>2</sub>[<em>x</em> := <em>a</em>];</li>
<li>(λ<em>x</em>. <em>e</em>)[<em>x</em> := <em>a</em>] = λ<em>x</em>. <em>e</em> (<em>x</em> is shadowed, as in Lesson 2);</li>
<li>(λ<em>y</em>. <em>e</em>)[<em>x</em> := <em>a</em>] = λ<em>y</em>. <em>e</em>[<em>x</em> := <em>a</em>] if <em>y</em> isn't free in <em>a</em>; otherwise first rename <em>y</em> in λ<em>y</em>. <em>e</em> to a variable that is free in neither <em>a</em> nor <em>e</em>, and then substitute.</li>
</ul>
<p>Lesson 2 never needed the renaming because it only substituted values, which have no free variables. Interpreters with environments avoid substitution altogether, which is one reason they use environments.</p>

<h3>Order of reduction</h3>
<p>A term can contain several redexes, and the choice of which to reduce can matter. Let Ω = (λ<em>x</em>. <em>x x</em>) (λ<em>x</em>. <em>x x</em>). Its only redex reduces to Ω itself, so it reduces forever and has no normal form. Now take (λ<em>x</em>. <em>z</em>) Ω. Reducing the argument first loops forever; reducing the outer redex first gives <em>z</em> in one step, because the function ignores its argument. <strong>Normal order</strong> always reduces the leftmost, outermost redex first. A theorem of the lambda calculus (the standardization theorem) says that if a term has a normal form at all, normal order reaches it. And by the Church–Rosser theorem, all orders that do reach a normal form reach the same one, up to renaming bound variables. Evaluating arguments first, as Python and Mini do, is called <strong>applicative order</strong>; Lesson 4 returns to the trade-off as laziness, and Lesson 7 as call-by-name.</p>

<h3>Everything from functions: Church numerals</h3>
<p>The lambda calculus has no numbers, but it can represent them. The <strong>Church numeral</strong> for <em>n</em> is the function that applies <em>f</em> to <em>x</em> <em>n</em> times: 0 = λ<em>f</em>. λ<em>x</em>. <em>x</em>, 1 = λ<em>f</em>. λ<em>x</em>. <em>f x</em>, 2 = λ<em>f</em>. λ<em>x</em>. <em>f</em> (<em>f x</em>). Arithmetic is then a matter of applying functions: the successor applies <em>f</em> once more, and <em>m</em> + <em>n</em> applies <em>f</em> <em>n</em> times and then <em>m</em> more times.</p>
<p class="math">succ = λ<em>n</em>. λ<em>f</em>. λ<em>x</em>. <em>f</em> (<em>n f x</em>) &nbsp;&nbsp;&nbsp; plus = λ<em>m</em>. λ<em>n</em>. λ<em>f</em>. λ<em>x</em>. <em>m f</em> (<em>n f x</em>) &nbsp;&nbsp;&nbsp; times = λ<em>m</em>. λ<em>n</em>. λ<em>f</em>. <em>m</em> (<em>n f</em>)</p>
<p>Python's <code>lambda</code> is close enough to run them. To read a numeral as an ordinary integer, apply it to "add one" and 0:</p>
<pre><code>zero = lambda f: lambda x: x
succ = lambda n: lambda f: lambda x: f(n(f)(x))
plus = lambda m: lambda n: lambda f: lambda x: m(f)(n(f)(x))
times = lambda m: lambda n: lambda f: m(n(f))
to_int = lambda n: n(lambda k: k + 1)(0)

two = succ(succ(zero))
three = succ(two)
print(to_int(plus(two)(three)), to_int(times(two)(three)))   # 5 6</code></pre>
<p>Booleans work the same way: true = λ<em>a</em>. λ<em>b</em>. <em>a</em> chooses its first argument and false = λ<em>a</em>. λ<em>b</em>. <em>b</em> its second, so "if <em>c</em> then <em>t</em> else <em>e</em>" is just <em>c t e</em>. Pairs, lists and even recursion (through a term called the Y combinator, which appears in this lesson's practice) can be encoded too. The lambda calculus can compute exactly the functions Turing machines can (CS 320 Lesson 7): it was one of the formalisms behind the Church–Turing thesis. Its reductions are also the seed of every functional language: Lisp, ML, Haskell and the <code>lambda</code> in Python all descend from it.</p>
`,
      terms: [
        ["First-class function", "A function that is a value: it can be stored, passed, returned and created at run time."],
        ["Closure", "A function's code together with the environment in which it was created."],
        ["Higher-order function", "A function that takes functions as arguments or returns a function."],
        ["Currying", "Turning a function of several arguments into a chain of one-argument functions."],
        ["Partial application", "Supplying only some of a function's arguments, getting a function of the rest."],
        ["letrec", "A binding form whose right-hand side is in the scope of its own binding, so it can define recursive functions."],
        ["Lambda calculus", "Church's model of computation with only variables, one-argument functions (abstractions) and application."],
        ["Beta reduction", "The rule (λx. e) a → e[x := a]."],
        ["Redex", "A term of the form (λx. e) a, which can be beta-reduced."],
        ["Normal form", "A term containing no redex."],
        ["Variable capture", "A free variable of a substituted term becoming bound by a λ inside the term it is substituted into."],
        ["Normal order", "Reducing the leftmost, outermost redex first; it finds a normal form whenever one exists."],
        ["Applicative order", "Reducing a function's argument to a value before applying the function."],
        ["Church numeral", "The encoding of n as λf. λx. f applied n times to x."]
      ],
      quiz: [
        { q: "What does a closure contain?", choices: ["Only the function's code", "The function's code and the environment where it was created", "The function's code and the caller's environment", "The function's result"], answer: 1, why: "The saved environment is what lets free variables keep their lexical meaning after the creating function has returned." },
        { q: "What does (let (n 1) (let (f (lambda (x) (+ x n))) (let (n 50) (f 1)))) evaluate to in Mini?", choices: ["2", "51", "An error", "50"], answer: 0, why: "f's closure saved the environment where n is 1; the later binding of n doesn't affect it." },
        { q: "Why does defining factorial with let (instead of letrec) fail in Mini?", choices: ["Mini has no multiplication", "The lambda is evaluated outside the scope of the let's binding, so its closure has no fact", "if cannot be recursive", "Closures cannot call functions"], answer: 1, why: "The right-hand side of let isn't in the scope of its own binding; letrec puts it there." },
        { q: "What is the normal form of (λx. λy. x) a b?", choices: ["a", "b", "λy. a", "a b"], answer: 0, why: "It is ((λx. λy. x) a) b → (λy. a) b → a." },
        { q: "Substituting y for x in λy. x y must give which term (up to renaming)?", choices: ["λy. y y", "λz. y z", "λy. x y", "λz. z y"], answer: 1, why: "The bound y is renamed first to avoid capturing the free y: λz. x z, then substitute: λz. y z." },
        { q: "Which order of reduction reaches z from (λx. z) Ω, where Ω has no normal form?", choices: ["Applicative order", "Normal order", "Both", "Neither"], answer: 1, why: "Normal order reduces the outer redex first and discards Ω; applicative order tries to reduce Ω forever." }
      ],
      practice: [
        {
          q: `<p>Write <code>compose</code> in Mini, a function of two functions <code>f</code> and <code>g</code> that returns the function <em>x</em> ↦ <em>f</em>(<em>g</em>(<em>x</em>)). Use it to build "add 1, then double" and apply it to 5.</p>`,
          a: `<pre><code>print(run("""
(let (compose (lambda (f g) (lambda (x) (f (g x)))))
  (let (inc-then-double (compose (lambda (n) (* n 2)) (lambda (n) (+ n 1))))
    (inc-then-double 5)))"""))   # 12</code></pre><p>The returned closure saves the environment in which <code>f</code> and <code>g</code> are bound. "Add 1, then double" is <code>compose(double, inc)</code>, because <code>g</code> runs first: (5 + 1) × 2 = 12. (Names like <code>inc-then-double</code> are fine in Mini: the tokenizer splits only on spaces and parentheses.)</p>`
        },
        {
          q: `<p>Reduce to normal form in normal order, showing each step: (a) (λ<em>x</em>. <em>x</em> <em>x</em>) (λ<em>z</em>. <em>z</em>) <em>w</em>; (b) (λ<em>f</em>. λ<em>x</em>. <em>f</em> (<em>f</em> <em>x</em>)) (λ<em>y</em>. <em>y</em>).</p>`,
          a: `<p>(a) The term is ((λ<em>x</em>. <em>x x</em>) (λ<em>z</em>. <em>z</em>)) <em>w</em>. The leftmost redex: → ((λ<em>z</em>. <em>z</em>) (λ<em>z</em>. <em>z</em>)) <em>w</em> → (λ<em>z</em>. <em>z</em>) <em>w</em> → <em>w</em>.</p><p>(b) → λ<em>x</em>. (λ<em>y</em>. <em>y</em>) ((λ<em>y</em>. <em>y</em>) <em>x</em>). Now the leftmost, outermost redex inside the body is the outer application: → λ<em>x</em>. (λ<em>y</em>. <em>y</em>) <em>x</em> → λ<em>x</em>. <em>x</em>. Applying the identity twice is the identity.</p>`
        },
        {
          q: `<p>Using the Python Church numerals in the notes, define <code>exp</code> so that <code>exp(m)(n)</code> is the numeral for <em>n</em><sup><em>m</em></sup>. (Hint: what does applying the numeral <em>m</em> to the function <code>times(n)</code> do?) Check that <code>to_int(exp(three)(two))</code> is 8.</p>`,
          hint: `<p>A numeral <em>m</em> applies a function <em>m</em> times. Applying "multiply by <em>n</em>" <em>m</em> times to the numeral 1 gives <em>n</em><sup><em>m</em></sup>.</p>`,
          a: `<pre><code>one = succ(zero)
exp = lambda m: lambda n: m(times(n))(one)
print(to_int(exp(three)(two)))   # 8
print(to_int(exp(two)(three)))   # 9</code></pre><p><code>m(times(n))</code> is the function "multiply by <em>n</em>, <em>m</em> times", applied to 1. (The pure lambda-calculus answer is even shorter, λ<em>m</em>. λ<em>n</em>. <em>m n</em>, because applying <em>n</em> composes with itself; try reducing it for 2 and 2.)</p>`
        },
        {
          q: `<p>The Y combinator is Y = λ<em>f</em>. (λ<em>x</em>. <em>f</em> (<em>x x</em>)) (λ<em>x</em>. <em>f</em> (<em>x x</em>)). Show that Y <em>g</em> reduces to <em>g</em> (something that Y <em>g</em> also reduces to), so that Y <em>g</em> behaves as a fixed point of <em>g</em>. Why does this give recursion without names?</p>`,
          a: `<p>Y <em>g</em> → (λ<em>x</em>. <em>g</em> (<em>x x</em>)) (λ<em>x</em>. <em>g</em> (<em>x x</em>)) → <em>g</em> ((λ<em>x</em>. <em>g</em> (<em>x x</em>)) (λ<em>x</em>. <em>g</em> (<em>x x</em>))). The argument of <em>g</em> is exactly the term Y <em>g</em> reduced to after its first step. So Y <em>g</em> = <em>g</em> (Y <em>g</em>) up to reduction. If <em>g</em> = λ<em>self</em>. λ<em>n</em>. (… <em>self</em> (<em>n</em> − 1) …) is a factorial "with the recursive call as a parameter", then Y <em>g</em> is a function that receives itself as <em>self</em>: recursion, although no name refers to itself. Under applicative order, as in Python, Y loops forever (it keeps expanding <em>x x</em>); the variant Z = λ<em>f</em>. (λ<em>x</em>. <em>f</em> (λ<em>v</em>. <em>x x v</em>)) (λ<em>x</em>. <em>f</em> (λ<em>v</em>. <em>x x v</em>)) delays it inside a λ and works there.</p>`
        }
      ],
      sources: ["plai", "sicp", "landin64", "seplambda"]
    },
    {
      id: "pl4",
      title: "Functional programming",
      minutes: 90,
      summary: "Programming without mutation: referential transparency, persistent data structures that share structure, map, filter and the two folds, algebraic data types and exhaustive pattern matching (in Python and OCaml), tail calls and why Python doesn't optimize them, and lazy evaluation with generators and thunks.",
      notes: `
<p>Mini has no assignment. Its variables are names for values, fixed once bound, and its programs compute only by evaluating expressions and applying functions. That style is <strong>functional programming</strong>, and languages built around it (Lisp, ML, OCaml, Haskell, and in large part Scala, Elixir and Clojure) have shaped the rest: <code>map</code>, <code>lambda</code>, pattern matching, immutable records and generics all came from them. This lesson is about programming that way, in Python and with glimpses of OCaml and Haskell.</p>

<h3>Immutability and referential transparency</h3>
<p>In a language without mutation, an expression always has the same value, so it can be replaced by its value anywhere without changing the program's meaning. This property is called <strong>referential transparency</strong>. If <code>f(3)</code> is 10 once, it is 10 everywhere, and <code>f(3) + f(3)</code> can be computed as <code>2 * f(3)</code>. A Python function that reads a global that someone else changes, or that appends to its argument, doesn't have this property, and you must know the history of the program to know what it does. A function whose result depends only on its arguments and that changes nothing is called <strong>pure</strong>.</p>
<p>Purity makes code easier to test (no setup or hidden state), to reuse, and to run in parallel: CS 310's race conditions need two threads and shared <em>mutable</em> data; data that no one can change needs no lock.</p>

<h3>Persistent data structures</h3>
<p>If values can't change, how do you "add" to a list? You build a new one. That sounds wasteful, but the new structure can <em>share</em> almost everything with the old one, and sharing is safe precisely because neither can change. A structure whose old versions remain valid after an update is called <strong>persistent</strong>. The classic example is Lisp's list, built from pairs (CS 102 Lesson 7's linked list, with tuples as nodes):</p>
<pre><code>def cons(head, tail):
    return (head, tail)

def to_list(xs):
    out = []
    while xs is not None:
        out.append(xs[0])
        xs = xs[1]
    return out

a = cons(1, cons(2, cons(3, None)))
b = cons(0, a)          # [0, 1, 2, 3], sharing all of a
c = cons(9, a[1])       # [9, 2, 3], sharing a's tail
print(to_list(a), to_list(b), to_list(c))   # [1, 2, 3] [0, 1, 2, 3] [9, 2, 3]
print(b[1] is a, c[1] is a[1])              # True True</code></pre>
<p>Adding at the front costs one new pair, O(1), and <code>a</code> is untouched. Trees work the same way through <strong>path copying</strong>: to insert into a persistent binary search tree, copy only the nodes on the path from the root to the insertion point, and reuse every subtree off that path.</p>
<pre><code>def insert(t, k):
    """t is None or a tuple (left, key, right); returns a new tree."""
    if t is None:
        return (None, k, None)
    left, key, right = t
    if k &lt; key:
        return (insert(left, k), key, right)       # right subtree reused
    if k &gt; key:
        return (left, key, insert(right, k))       # left subtree reused
    return t

t1 = None
for k in [5, 2, 8, 1, 9]:
    t1 = insert(t1, k)
t2 = insert(t1, 7)
print(t2[0] is t1[0])   # True: the whole left subtree is shared
print(t2[2] is t1[2])   # False: 8's node is on the path to 7</code></pre>
<figure class="fig"><svg viewBox="0 0 440 200" width="440" role="img" aria-label="Two versions of a search tree. Version 1 has root 5, left child 2 with child 1, right child 8 with child 9. Version 2 has a new root 5 and a new node 8 with new child 7; it points to the same node 2 and the same node 9 as version 1.">
<g class="ln"><line x1="110" y1="38" x2="80" y2="92"/><line x1="110" y1="38" x2="170" y2="92"/><line x1="80" y1="108" x2="50" y2="162"/><line x1="170" y1="108" x2="200" y2="162"/>
<line x1="330" y1="38" x2="88" y2="96"/><line x1="330" y1="38" x2="300" y2="92"/><line x1="300" y1="108" x2="270" y2="162"/><line x1="300" y1="108" x2="208" y2="166"/></g>
<g class="box"><circle cx="110" cy="30" r="14"/><circle cx="80" cy="100" r="14"/><circle cx="170" cy="100" r="14"/><circle cx="50" cy="170" r="14"/><circle cx="200" cy="170" r="14"/></g>
<g class="hl"><circle cx="330" cy="30" r="14"/><circle cx="300" cy="100" r="14"/><circle cx="270" cy="170" r="14"/></g>
<g class="text"><text x="110" y="35" text-anchor="middle">5</text><text x="80" y="105" text-anchor="middle">2</text><text x="170" y="105" text-anchor="middle">8</text><text x="50" y="175" text-anchor="middle">1</text><text x="200" y="175" text-anchor="middle">9</text>
<text x="330" y="35" text-anchor="middle">5</text><text x="300" y="105" text-anchor="middle">8</text><text x="270" y="175" text-anchor="middle">7</text>
<text x="70" y="22" class="m" text-anchor="end">t1</text><text x="370" y="22" class="m">t2</text></g>
</svg><figcaption>Inserting 7 creates three new nodes (highlighted): 5, 8 and 7. The new tree t2 points at t1's node 2 (with its child 1) and node 9, unchanged.</figcaption></figure>
<p>In a balanced tree (CS 201 Lesson 4) the path has O(log <em>n</em>) nodes, so an update costs O(log <em>n</em>) time and space, and every old version stays usable: undo is free. Git's history is persistent in the same way (CS 240 Lesson 2): a new commit stores new trees only for directories that changed and points to the old objects for the rest. In Python, tuples, strings, <code>frozenset</code> and <code>@dataclass(frozen=True)</code> classes are immutable; <code>dataclasses.replace(p, x=3)</code> returns a copy of a frozen dataclass with one field changed.</p>

<h3>map, filter and fold</h3>
<p>Most loops over a list follow a few patterns, and functional languages name them. <code>map(f, xs)</code> applies <code>f</code> to each element and <code>filter(p, xs)</code> keeps the elements satisfying <code>p</code> (CS 102 Lesson 5). The most general is the <strong>fold</strong>, which combines the elements with a function and a starting value. There are two, depending on which way the combining goes:</p>
<p class="math">foldl(<em>f</em>, <em>a</em>, [<em>x</em><sub>1</sub>, <em>x</em><sub>2</sub>, <em>x</em><sub>3</sub>]) = <em>f</em>(<em>f</em>(<em>f</em>(<em>a</em>, <em>x</em><sub>1</sub>), <em>x</em><sub>2</sub>), <em>x</em><sub>3</sub>) &nbsp;&nbsp;&nbsp;&nbsp; foldr(<em>f</em>, [<em>x</em><sub>1</sub>, <em>x</em><sub>2</sub>, <em>x</em><sub>3</sub>], <em>a</em>) = <em>f</em>(<em>x</em><sub>1</sub>, <em>f</em>(<em>x</em><sub>2</sub>, <em>f</em>(<em>x</em><sub>3</sub>, <em>a</em>)))</p>
<p>A left fold carries an accumulator from left to right, like a <code>for</code> loop; Python's <code>functools.reduce(f, xs, a)</code> is <code>foldl</code>. A right fold replaces the list's structure: think of [1, 2, 3] as <code>cons(1, cons(2, cons(3, None)))</code>, and <code>foldr</code> replaces each <code>cons</code> by <code>f</code> and the final <code>None</code> by <code>a</code>.</p>
<pre><code>from functools import reduce

def foldl(f, acc, xs):
    for x in xs:
        acc = f(acc, x)
    return acc

def foldr(f, xs, acc):
    for x in reversed(xs):
        acc = f(x, acc)
    return acc

print(reduce(lambda acc, d: acc * 10 + d, [1, 2, 3], 0))     # 123
print(foldl(lambda acc, x: acc - x, 0, [1, 2, 3]))           # -6
print(foldr(lambda x, acc: x - acc, [1, 2, 3], 0))           # 2
print(foldl(lambda acc, x: [x] + acc, [], [1, 2, 3]))        # [3, 2, 1]
print(foldr(lambda x, acc: (x, acc), [1, 2, 3], None))       # (1, (2, (3, None)))</code></pre>
<p>With subtraction the two differ: ((0 − 1) − 2) − 3 = −6, but 1 − (2 − (3 − 0)) = 2. Folding with "put <em>x</em> in front" reverses a list from the left, and rebuilds it unchanged from the right, which shows that <code>foldr</code> really does replace the structure. Sum, product, length, maximum, reverse, map and filter are all folds, so a function written once for "any fold" works for all of them. (Large-scale data systems are built on this: MapReduce's "reduce" is a fold.)</p>

<h3>Algebraic data types and pattern matching</h3>
<p>Functional languages describe data as combinations of two building blocks. A <strong>product type</strong> holds several values together: a rectangle has a width <em>and</em> a height, like a tuple or a dataclass. A <strong>sum type</strong> is one of several alternatives: a shape is a circle <em>or</em> a rectangle, each alternative (a <em>constructor</em>) carrying its own fields. Types built from sums of products are called <strong>algebraic data types</strong> (ADTs), and they are taken apart by pattern matching. In OCaml:</p>
<pre data-label="OCaml"><code>type shape =
  | Circle of float
  | Rect of float * float

let area s =
  match s with
  | Circle r -&gt; 3.14159 *. r *. r
  | Rect (w, h) -&gt; w *. h

let () = Printf.printf "%.1f\\n" (area (Rect (2.0, 3.0)))   (* prints 6.0 *)</code></pre>
<p>Reading the OCaml: <code>type shape = | Circle of float | Rect of float * float</code> declares the sum type, one line per constructor, and <code>float * float</code> is the pair type (a product). <code>let area s = …</code> defines a function <code>area</code> of one parameter <code>s</code>; <code>match … with</code> lists the cases, each <code>| pattern -&gt; result</code>. A function is applied by writing its argument after it, with no parentheses or commas, so <code>area (Rect (2.0, 3.0))</code> is <code>area(Rect(2.0, 3.0))</code> in Python. <code>let () = e</code> runs <code>e</code> when the program starts; <code>()</code> is the value that a printing call returns, like Python's <code>None</code>. <code>Printf.printf</code> works like C's <code>printf</code>, and <code>(* … *)</code> is a comment. OCaml writes floating-point multiplication as <code>*.</code>. The compiler knows every constructor of <code>shape</code>, so it checks that a <code>match</code> covers them all. Add <code>| Triangle of float * float * float</code> to the type and leave <code>area</code> alone, and compiling gives:</p>
<pre data-label="Output"><code>Warning 8 [partial-match]: this pattern-matching is not exhaustive.
Here is an example of a case that is not matched:
Triangle (_, _, _)</code></pre>
<p>Every function that must handle the new case is found for you. Python expresses the same thing with frozen dataclasses for the constructors and a union of their types; a class pattern with positional sub-patterns, <code>Rect(w, h)</code>, matches an instance and binds its fields in the order given by the class's <code>__match_args__</code>, which <code>@dataclass</code> generates from the field order.</p>
<pre><code>import math
from dataclasses import dataclass

@dataclass(frozen=True)
class Circle:
    radius: float

@dataclass(frozen=True)
class Rect:
    width: float
    height: float

Shape = Circle | Rect

def area(s: Shape) -&gt; float:
    match s:
        case Circle(r):
            return math.pi * r * r
        case Rect(w, h):
            return w * h

print(area(Rect(2.0, 3.0)), Rect.__match_args__)   # 6.0 ('width', 'height')</code></pre>
<p>Python itself won't warn about a missing case, but mypy (CS 102 Lesson 4) can: end the match with <code>case _: assert_never(s)</code> (from <code>typing</code>), and if you add a <code>Triangle</code> class to the union mypy reports <code>Argument 1 to "assert_never" has incompatible type "Triangle"; expected "Never"</code>. This works because mypy <em>narrows</em> the type of <code>s</code> as it goes through the cases: after <code>case Circle(r)</code> fails, <code>s</code> can only be the remaining members of the union. <code>Never</code> is the type with no values at all, and <code>assert_never</code>'s parameter has that type. If every member has its own case, nothing is left, <code>s</code> has type <code>Never</code> in the last case, and the call type-checks; if <code>Triangle</code> is unhandled, <code>s</code> is a <code>Triangle</code> there and the call is an error. (If the line is ever reached at run time, <code>assert_never</code> raises <code>AssertionError</code>.)</p>
<p>One sum type deserves its own name. A function that may not produce a value can return an <strong>option type</strong>: OCaml's <code>'a option</code> has constructors <code>None</code> and <code>Some x</code> (the <code>'a</code>, read "alpha", stands for any type, so an <code>int option</code> is <code>None</code> or <code>Some</code> of an int; Lesson 6 explains these type variables), and a caller can only get at <code>x</code> by matching, which forces it to decide what to do with <code>None</code>. Python's <code>int | None</code> is the same idea, and mypy enforces it: given <code>def find(...) -&gt; int | None</code>, the expression <code>find(names, target) + 1</code> is rejected with <code>Unsupported operand types for + ("None" and "int")</code>. This lesson's sidebar explains why languages without this check have paid dearly.</p>

<h3>Tail calls</h3>
<p>A call is in <strong>tail position</strong> if it is the last thing the function does: its result is returned directly, with nothing left to compute. In <code>return n * fact(n - 1)</code> the recursive call is not a tail call (the multiplication is still pending). In this sum, it is:</p>
<pre><code>import sys

def tail_sum(xs, i=0, acc=0):
    if i == len(xs):
        return acc
    return tail_sum(xs, i + 1, acc + xs[i])     # a tail call

print(tail_sum([1, 2, 3, 4]))      # 10
print(sys.getrecursionlimit())     # 1000
try:
    tail_sum(list(range(5000)))
except RecursionError:
    print("too deep")              # too deep</code></pre>
<p>After a tail call, the caller's stack frame (CS 210 Lesson 6) holds nothing that will be needed again, so an implementation can reuse it: the call becomes a jump, and tail recursion runs in constant stack space, like a loop. This is <strong>tail-call optimization</strong>. Scheme's standard requires it, and OCaml and most functional compilers do it, so recursion is how loops are written there. OCaml runs this sum of 10 million numbers without trouble:</p>
<pre data-label="OCaml"><code>let rec sum_to n acc = if n = 0 then acc else sum_to (n - 1) (acc + n)
let () = print_int (sum_to 10_000_000 0)   (* prints 50000005000000 *)</code></pre>
<p>Here <code>let rec</code> defines a function that may call itself (a plain <code>let</code> name isn't in scope in its own definition, as with Mini's <code>let</code> in Lesson 3), <code>n = 0</code> inside an expression is a comparison, like Python's <code>==</code>, and <code>sum_to (n - 1) (acc + n)</code> passes two arguments, curried as in Lesson 3. <code>print_int</code> prints an integer, and <code>10_000_000</code> is ten million, with underscores for readability as in Python.</p>
<p>GCC does it as an optimization. Compiling the same function in C with <code>-O1</code> keeps the <code>call</code>, but with <code>-Os</code> (optimize for size) it becomes a loop that jumps back to its own test:</p>
<pre data-label="C"><code>long sum_to(long n, long acc) {
    if (n == 0)
        return acc;
    return sum_to(n - 1, acc + n);
}</code></pre>
<pre data-label="x86-64 (gcc -Os)"><code>sum_to:
        movq    %rsi, %rax        # acc is the result register
.L3:
        testq   %rdi, %rdi        # n == 0?
        je      .L4
        addq    %rdi, %rax        # acc += n
        decq    %rdi              # n -= 1
        jmp     .L3               # the "call", now a jump
.L4:
        ret</code></pre>
<p>CPython never does this. Guido van Rossum declined to add it because it would remove frames from tracebacks (CS 101 Lesson 10's sidebar), so each call uses a frame and recursion deeper than the limit, 1000 by default, raises <code>RecursionError</code>. In Python, write a tail-recursive function as a loop: the parameters become variables updated at the end of each iteration (<code>i, acc = i + 1, acc + xs[i]</code>). That is a mechanical translation, and it is exactly what the compiler did above.</p>

<h3>Laziness</h3>
<p>Mini, Python and OCaml evaluate a function's arguments before calling it: <strong>strict</strong> (or <strong>eager</strong>) evaluation, the applicative order of Lesson 3. Haskell is <strong>lazy</strong>: an expression is evaluated only when its value is needed, and then only once. That makes infinite structures ordinary values:</p>
<pre data-label="Haskell"><code>main = do
  print (take 5 (filter even [1 ..]))                   -- [2,4,6,8,10]
  print (length [1, 2, error "boom" :: Int])            -- 3: the error is never evaluated
  let fibs = 0 : 1 : zipWith (+) fibs (tail fibs) :: [Integer]
  print (take 10 fibs)                                  -- [0,1,1,2,3,5,8,13,21,34]</code></pre>
<p>Reading the Haskell: <code>main = do</code> runs the lines below it in order; <code>x : xs</code> is the list with <code>x</code> in front of the list <code>xs</code> (like <code>[x] + xs</code>); <code>e :: T</code> states that <code>e</code> has type <code>T</code> (<code>Int</code> is a fixed-width integer, <code>Integer</code> an unbounded one like Python's <code>int</code>). <code>[1 ..]</code> is the infinite list of positive integers, and <code>filter</code> only ever computes as much of it as <code>take 5</code> asks for.</p>
<p><code>fibs</code> is defined in terms of itself. <code>tail fibs</code> is <code>fibs</code> without its first element, and <code>zipWith (+) a b</code> adds two lists element by element, like <code>[x + y for x, y in zip(a, b)]</code>. So after the first two elements 0 and 1, element <em>k</em> + 2 of <code>fibs</code> is element <em>k</em> of <code>fibs</code> plus element <em>k</em> of <code>tail fibs</code> (which is element <em>k</em> + 1 of <code>fibs</code>): the sum of the two before it. Laziness makes this work, because each element is computed only when asked for, and by then the two it needs already exist.</p>
<p>Python's generators (CS 102 Lesson 5) give you lazy sequences explicitly:</p>
<pre><code>import itertools

def naturals():
    n = 0
    while True:
        yield n
        n += 1

evens = (n for n in naturals() if n % 2 == 0)
print(list(itertools.islice(evens, 5)))   # [0, 2, 4, 6, 8]</code></pre>
<p>A lazy language implements "evaluate when needed, only once" with <strong>thunks</strong>: a suspended computation that remembers its result the first time it is forced.</p>
<pre><code>class Lazy:
    def __init__(self, compute):
        self.compute = compute        # a function of no arguments
        self.done = False

    def force(self):
        if not self.done:
            self.value = self.compute()
            self.done = True
            self.compute = None       # let the function be freed
        return self.value

x = Lazy(lambda: print("computing...") or 42)
print("created")    # created
print(x.force())    # prints computing... and then 42
print(x.force())    # 42, without computing again</code></pre>
<p>(<code>print(...)</code> returns <code>None</code>, so <code>print("computing...") or 42</code> prints and then evaluates to 42.) Laziness has costs. Every value may be a pending thunk, which takes memory and time to manage, and a chain of unevaluated thunks can hold on to far more memory than the value it will eventually produce (a <em>space leak</em>). Worse, when evaluation happens depends on who needs what, so side effects such as printing would happen in an unpredictable order. That is why Haskell is also pure, and handles input and output through types that sequence effects explicitly. Most languages are strict and offer laziness where it is asked for: generators in Python, <code>lazy</code> in OCaml, and <code>and</code>, <code>or</code> and <code>if</code>, which every language evaluates lazily.</p>
`,
      terms: [
        ["Functional programming", "Programming by evaluating expressions and applying functions, without mutable state."],
        ["Referential transparency", "The property that an expression can be replaced by its value without changing the program's meaning."],
        ["Pure function", "A function whose result depends only on its arguments and that has no side effects."],
        ["Persistent data structure", "A structure whose earlier versions remain valid and unchanged after an update."],
        ["Path copying", "Updating a persistent tree by copying only the nodes on the path to the change and sharing the rest."],
        ["Fold", "Combining a list's elements with a function and a starting value: foldl from the left, foldr from the right."],
        ["Product type", "A type whose values hold several fields together, like a tuple or record."],
        ["Sum type", "A type whose values are one of several alternatives (constructors), each with its own fields."],
        ["Algebraic data type", "A type built as a sum of products, taken apart by pattern matching."],
        ["Exhaustiveness check", "A compiler or checker's verification that a match covers every constructor of a type."],
        ["Option type", "A sum type with an empty case (None) and a case holding a value (Some x)."],
        ["Tail call", "A call whose result is returned directly, with nothing left for the caller to do."],
        ["Tail-call optimization", "Reusing the caller's frame for a tail call, so tail recursion runs in constant stack space."],
        ["Lazy evaluation", "Evaluating an expression only when its value is needed, and at most once."],
        ["Thunk", "A suspended computation, evaluated when forced and then remembered."]
      ],
      quiz: [
        { q: "Inserting one key into a persistent balanced BST with n keys creates how many new nodes?", choices: ["1", "O(log n)", "O(n)", "O(n log n)"], answer: 1, why: "Only the nodes on the path from the root to the insertion point are copied; everything else is shared." },
        { q: "What is foldl(lambda acc, x: acc * 2 + x, 0, [1, 0, 1])?", choices: ["2", "3", "5", "6"], answer: 2, why: "((0·2 + 1)·2 + 0)·2 + 1 = 5: it reads the bits 101 as a binary number." },
        { q: "What does foldr(lambda x, acc: [x] + acc, [1, 2, 3], []) return?", choices: ["[3, 2, 1]", "[1, 2, 3]", "[]", "[[1], [2], [3]]"], answer: 1, why: "foldr replaces each cons by 'put x in front' and the end by [], rebuilding the same list." },
        { q: "Why does the OCaml compiler warn when a match on a variant type misses a constructor?", choices: ["It guesses from the function's name", "The type declaration lists every constructor, so the compiler can check that each one is covered", "OCaml checks at run time", "Because OCaml is lazy"], answer: 1, why: "A sum type is closed: its constructors are all known, which makes the exhaustiveness check possible." },
        { q: "Which call is a tail call?", choices: ["return 1 + f(n - 1)", "return f(n - 1) * n", "return f(n - 1, acc * n)", "return [f(n - 1)]"], answer: 2, why: "Only in the third is the call's result returned directly with nothing left to do." },
        { q: "In Haskell, length [1, 2, error \"boom\"] is 3. Why?", choices: ["error returns 0", "Lazy evaluation: length never needs the elements' values, so the error is never evaluated", "Haskell ignores errors", "The list is evaluated at compile time"], answer: 1, why: "Counting elements needs the list's structure, not the values in it." }
      ],
      practice: [
        {
          q: `<p>Using <code>foldr</code> from the notes (no loops), write <code>my_map(f, xs)</code> and <code>my_filter(p, xs)</code> returning Python lists. Then write <code>maximum(xs)</code> for a non-empty list with <code>foldl</code>.</p>`,
          a: `<pre><code>def my_map(f, xs):
    return foldr(lambda x, acc: [f(x)] + acc, xs, [])

def my_filter(p, xs):
    return foldr(lambda x, acc: [x] + acc if p(x) else acc, xs, [])

def maximum(xs):
    return foldl(lambda best, x: x if x &gt; best else best, xs[0], xs[1:])

print(my_map(lambda x: x * x, [1, 2, 3]))            # [1, 4, 9]
print(my_filter(lambda x: x &gt; 1, [3, 1, 2]))         # [3, 2]
print(maximum([4, 9, 2]))                            # 9</code></pre><p>The right fold rebuilds the list, transforming (map) or skipping (filter) elements on the way. <code>maximum</code> uses the first element as the starting value. (<code>[x] + acc</code> copies <code>acc</code>, so these take O(<em>n</em><sup>2</sup>) time on Python lists; with the persistent <code>cons</code> list it would be O(1) per element.)</p>`
        },
        {
          q: `<p>Write <code>fact</code> tail-recursively with an accumulator, then translate it mechanically into a <code>while</code> loop. Which version can compute 1000! in CPython?</p>`,
          a: `<pre><code>def fact_tail(n, acc=1):
    if n == 0:
        return acc
    return fact_tail(n - 1, acc * n)

def fact_loop(n, acc=1):
    while n != 0:
        n, acc = n - 1, acc * n
    return acc

print(fact_tail(10), fact_loop(10))   # 3628800 3628800
print(len(str(fact_loop(1000))))      # 2568</code></pre><p>The loop: each tail call <code>fact_tail(n - 1, acc * n)</code> becomes a simultaneous update of the parameters followed by a jump back to the test. 1000! has 2,568 digits, and <code>fact_loop</code> computes it at once; <code>fact_tail(1000)</code> needs 1001 nested calls, more than the limit of 1000 frames, and raises <code>RecursionError</code>, because CPython doesn't optimize tail calls.</p>`
        },
        {
          q: `<p>Define an ADT for Calc expressions (Lesson 1) with frozen dataclasses <code>Num(value)</code> and <code>BinOp(op, left, right)</code>, and write <code>evaluate</code> for it with <code>match</code>. What does this representation give you that the nested lists didn't?</p>`,
          a: `<pre><code>@dataclass(frozen=True)
class Num:
    value: int

@dataclass(frozen=True)
class BinOp:
    op: str
    left: "Expr"
    right: "Expr"

Expr = Num | BinOp

def eval_adt(e: Expr) -&gt; int:
    match e:
        case Num(n):
            return n
        case BinOp("+", l, r):
            return eval_adt(l) + eval_adt(r)
        case BinOp("-", l, r):
            return eval_adt(l) - eval_adt(r)
        case BinOp("*", l, r):
            return eval_adt(l) * eval_adt(r)
        case _:
            raise ValueError(f"bad expression {e!r}")

print(eval_adt(BinOp("+", Num(1), BinOp("*", Num(2), Num(3)))))   # 7</code></pre><p>The type says exactly what an expression can be, so mypy can check that constructors get the right fields and (with <code>assert_never</code>) that every kind of node is handled; a typo such as <code>BinOp("+", 1)</code> fails immediately. The nested lists are quicker to write and print, which is why our interpreters keep using them. (<code>"Expr"</code> in quotes is a forward reference: the name is defined only after the class.)</p>`
        },
        {
          q: `<p>Write a generator <code>primes()</code> that yields the primes 2, 3, 5, 7, … forever, keeping the primes found so far and testing each candidate only against those up to its square root. Print the first ten with <code>itertools.islice</code>. Where is the laziness?</p>`,
          a: `<pre><code>def primes():
    found = []
    n = 2
    while True:
        if all(n % p != 0 for p in found if p * p &lt;= n):
            found.append(n)
            yield n
        n += 1

print(list(itertools.islice(primes(), 10)))   # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]</code></pre><p>The generator is an infinite sequence that does work only when the next element is requested: <code>islice</code> asks for ten and the generator stops computing after the tenth. (Inside, <code>all</code> stops at the first divisor, and the generator expression skips primes above √<em>n</em> without testing them; the loop over <code>found</code> still visits every earlier prime, which is fine at this size.)</p>`
        }
      ],
      sources: ["plai", "sicp", "okasaki", "ocamlmanual", "pymatch"]
    },
    {
      id: "pl5",
      title: "Types and type checking",
      minutes: 90,
      summary: "What a type system guarantees and what it can't; typing judgments and typing rules written as inference rules; a type checker for Mini, including function types; soundness as progress and preservation; why every checker rejects some safe programs; static versus dynamic and strong versus weak typing; and Python's type hints checked by mypy.",
      notes: `
<p>Mini will happily start evaluating <code>(+ 1 true)</code> and fail halfway, and <code>(if false (+ 1 true) 2)</code> runs to 2 because the bad branch is never reached. A <strong>type system</strong> classifies expressions by the kind of value they produce, and a <strong>type checker</strong> uses that classification to reject such programs <em>before</em> they run, by reading the code alone. This lesson writes one for Mini and asks exactly what it guarantees.</p>

<p>As in Lesson 2, programs are read with <code>read</code>, Lesson 1's reader written as one function, repeated here so that this lesson's code runs on its own:</p>
<pre><code>def read(text):
    """Lesson 1's reader, as one function: s-expression text to nested lists."""
    tokens = text.replace("(", " ( ").replace(")", " ) ").split()

    def item(i):                            # read one s-expression at tokens[i]
        if i == len(tokens):
            raise SyntaxError("unexpected end of input")
        if tokens[i] == ")":
            raise SyntaxError("unexpected )")
        if tokens[i] != "(":
            try:
                return int(tokens[i]), i + 1
            except ValueError:
                return tokens[i], i + 1
        items, i = [], i + 1
        while i &lt; len(tokens) and tokens[i] != ")":
            x, i = item(i)
            items.append(x)
        if i == len(tokens):
            raise SyntaxError("missing )")
        return items, i + 1

    expr, i = item(0)
    if i != len(tokens):
        raise SyntaxError("extra input after the expression")
    return expr</code></pre>
<h3>What a type error is</h3>
<p>A <strong>type error</strong> is an attempt to apply an operation to a value it isn't defined for: adding a number to a boolean, calling a number as a function, using an integer as the condition of <code>if</code>. A language can catch type errors at two times:</p>
<ul>
<li><strong>Dynamically</strong>, at run time: every value carries a tag saying what it is, and every operation checks the tags. Python, JavaScript, Ruby and Lisp do this. <code>"1" + 1</code> in Python raises <code>TypeError</code> when the line runs.</li>
<li><strong>Statically</strong>, before the program runs: a checker assigns a type to every expression, and refuses to run a program in which some operation might get the wrong kind of value. OCaml, Haskell, Java, Rust and C do this (C less thoroughly, as we'll see).</li>
</ul>
<p>Static checking finds errors in code that hasn't run yet (the branch your tests missed), documents what each function expects, and lets a compiler drop the tags and checks. Dynamic checking accepts every program that doesn't actually go wrong, and is simpler. A separate question is whether the language lets operations be misapplied <em>without</em> any error. JavaScript converts silently: <code>"1" + 1</code> is <code>"11"</code> and <code>"3" * "4"</code> is 12. C converts too (<code>int i = 3.7;</code> stores 3), and worse, it lets you read past the end of an array or treat any bytes as any type through a pointer cast. Languages that never let a value be used as the wrong type are informally called <strong>strongly typed</strong> or <strong>type safe</strong>; Python is dynamically and strongly typed, C statically and weakly typed.</p>

<h3>Typing judgments and rules</h3>
<p>Types for Mini are <code>int</code>, <code>bool</code>, and function types written <code>(-&gt; int int bool)</code>, meaning "takes two ints and returns a bool". The statement "in the type environment Γ, expression <em>e</em> has type <em>T</em>" is written</p>
<p class="math">Γ ⊢ <em>e</em> : <em>T</em></p>
<p>and called a <strong>typing judgment</strong>. Γ (gamma) maps the variables in scope to their types, just as an environment maps them to values; Γ, <em>x</em> : <em>T</em> is Γ with <em>x</em> given type <em>T</em>, replacing any earlier type for <em>x</em>. The typing rules use the inference-rule notation of Lesson 1:</p>
<pre data-label="Rules"><code>                                               Γ(x) = T
  ─────────── (num)   ─────────────── (bool)   ────────── (var)
  Γ ⊢ n : int         Γ ⊢ true : bool          Γ ⊢ x : T

  Γ ⊢ e1 : int   Γ ⊢ e2 : int         Γ ⊢ e1 : int   Γ ⊢ e2 : int
  ─────────────────────────── (add)   ─────────────────────────── (lt)
      Γ ⊢ (+ e1 e2) : int                 Γ ⊢ (&lt; e1 e2) : bool

  Γ ⊢ c : bool    Γ ⊢ e1 : T    Γ ⊢ e2 : T
  ──────────────────────────────────────── (if)
           Γ ⊢ (if c e1 e2) : T

  Γ ⊢ e1 : T1    Γ, x : T1 ⊢ e2 : T2
  ────────────────────────────────── (let)
      Γ ⊢ (let (x e1) e2) : T2</code></pre>
<p>(<code>false</code>, <code>-</code>, <code>*</code> and <code>=</code> have the same rules as <code>true</code>, <code>+</code> and <code>&lt;</code>.) Compare them with the evaluation rules. Where (add) for evaluation says "the value is the sum of the operands' values", (add) for typing says "if both operands are ints, so is the sum", without knowing what the numbers are. The (if) rule demands that both branches have the same type <em>T</em>, because the checker can't know which branch will run; that is the price of checking before running. (let) checks the right-hand side, then checks the body with the variable's type added, which mirrors the evaluator adding its value.</p>
<p>A type checker is again structural recursion, one case per rule. It returns the type, or raises an error that says which rule failed. (We raise Python's <code>TypeError</code> to report a <em>Mini</em> type error.)</p>
<pre><code>ARITH = {"+", "-", "*"}
COMPARE = {"&lt;", "="}

def expect(actual, wanted, where):
    if actual != wanted:
        raise TypeError(f"{where} expects {wanted}, got {actual}")

def typecheck(e, tenv):
    match e:
        case bool():
            return "bool"
        case int():
            return "int"
        case "true" | "false":
            return "bool"
        case str(name):
            if name not in tenv:
                raise TypeError(f"unbound variable {name}")
            return tenv[name]
        case [str(op), left, right] if op in ARITH or op in COMPARE:
            expect(typecheck(left, tenv), "int", op)
            expect(typecheck(right, tenv), "int", op)
            return "int" if op in ARITH else "bool"
        case ["if", test, then, other]:
            expect(typecheck(test, tenv), "bool", "if")
            t1 = typecheck(then, tenv)
            t2 = typecheck(other, tenv)
            if t1 != t2:
                raise TypeError(f"if branches differ: {t1} and {t2}")
            return t1
        case ["let", [str(name), rhs], body]:
            return typecheck(body, tenv | {name: typecheck(rhs, tenv)})
        case _:
            raise TypeError(f"cannot type {e!r}")

print(typecheck(read("(let (x 5) (if (&lt; x 10) (* x 2) 0))"), {}))   # int
print(typecheck(read("(= (+ 1 2) 3)"), {}))                         # bool</code></pre>
<p>On <code>(+ 1 true)</code> it raises <code>+ expects int, got bool</code>; on <code>(if 1 2 3)</code>, <code>if expects bool, got int</code>; and on <code>(let (x true) (- x 1))</code>, <code>- expects int, got bool</code>. Note that it never evaluates anything: it would reject <code>(if false (+ 1 true) 2)</code>, which runs fine, because the rule (if) checks both branches.</p>
<p>The derivation for a judgment is a tree, like the evaluation derivations of Lesson 1. With Γ = {<em>x</em> : int}:</p>
<pre data-label="Derivation"><code>                Γ(x) = int
                ────────── (var)    ─────────── (num)
                Γ ⊢ x : int         Γ ⊢ 2 : int
  ─────── (num) ─────────────────────────────── (add)
  ⊢ 5 : int          Γ ⊢ (+ x 2) : int
  ──────────────────────────────────────── (let)
          ⊢ (let (x 5) (+ x 2)) : int</code></pre>
<p>(⊢ with nothing on its left means the empty environment.)</p>

<h3>Function types</h3>
<p>A checker must know the type of a function's parameters to check its body, but in <code>(lambda (x) (+ x 1))</code> nothing says what <code>x</code> is. So in typed Mini, every parameter is annotated: <code>(lambda ((x int) (y int)) (&lt; x y))</code>. The rules for functions and calls are</p>
<pre data-label="Rules"><code>        Γ, x1 : T1, …, xn : Tn ⊢ e : R
  ───────────────────────────────────────────────── (lambda)
   Γ ⊢ (lambda ((x1 T1) … (xn Tn)) e) : (-&gt; T1 … Tn R)

   Γ ⊢ f : (-&gt; T1 … Tn R)    Γ ⊢ a1 : T1   …   Γ ⊢ an : Tn
  ───────────────────────────────────────────────────────── (app)
                  Γ ⊢ (f a1 … an) : R</code></pre>
<p>The body is checked once, with the parameters' declared types, and the function's type records them. At a call, each argument must have the corresponding parameter type, and the result has the return type. In Python we represent a function type by its s-expression, so <code>(-&gt; int int bool)</code> is the list <code>['-&gt;', 'int', 'int', 'bool']</code> and types can be compared with <code>==</code>. For example:</p>
<ul>
<li><code>(lambda ((x int)) (+ x 1))</code> has type <code>(-&gt; int int)</code>.</li>
<li><code>(lambda ((f (-&gt; int int)) (x int)) (f (f x)))</code>, Lesson 3's <code>twice</code> for ints, has type <code>(-&gt; (-&gt; int int) int int)</code>.</li>
<li><code>((lambda ((x int)) x) true)</code> is rejected by (app): the argument is a bool where an int is expected.</li>
</ul>
<p>Recursive functions need one more annotation. The parameters' types are already in the lambda, but while the checker is still checking the body it meets the recursive call and must know the function's result type too. So the typed <code>letrec</code> declares the function's whole type, <code>(letrec (f T e1) e2)</code>: for example <code>(letrec (fact (-&gt; int int) (lambda ((n int)) …)) (fact 5))</code>, where Lesson 3's untyped version had just <code>(letrec (fact (lambda (n) …)) …)</code>. The checker puts <code>f : T</code> in the environment, checks <code>e1</code>, and requires its type to be <code>T</code>. This lesson's first programming problem adds <code>letrec</code> that way, and you will write the cases for these rules there, too.</p>

<h3>Soundness: what "well typed" buys</h3>
<p>Robin Milner summed up the goal in 1978: "well-typed programs cannot go wrong." Made precise, a type system is <strong>sound</strong> if every program the checker accepts, when run, never encounters a type error. Mini's rules so far are <em>big-step</em>: <em>e</em> ⇓ <em>v</em> jumps straight from an expression to its final value. Soundness proofs usually use a <strong>small-step</strong> semantics instead, a relation <em>e</em> → <em>e′</em> that does one reduction at a time, as beta reduction does in the lambda calculus. For Mini, a step rewrites the leftmost innermost piece that is ready: <code>(+ (+ 1 2) 4)</code> → <code>(+ 3 4)</code> → <code>7</code>, and <code>(if (&lt; 1 2) 5 6)</code> → <code>(if true 5 6)</code> → <code>5</code>. An expression with no rule that applies and that is not a value is <em>stuck</em>. With small steps, soundness is usually proved as two lemmas, by structural induction on typing derivations:</p>
<ul>
<li><strong>Progress.</strong> A well-typed expression is either a value, or it can take a step. It is never stuck, like <code>(+ 1 true)</code>, with no rule that applies.</li>
<li><strong>Preservation.</strong> If <em>e</em> has type <em>T</em> and steps to <em>e′</em>, then <em>e′</em> also has type <em>T</em>.</li>
</ul>
<p>Together: start from a well-typed program; by progress it can step, by preservation the result is well typed with the same type, and so on forever, so it never gets stuck. And if it finishes, its value has the predicted type: a program of type <code>int</code> produces an integer.</p>
<p>Soundness is a promise about <em>type</em> errors only. Mini's types don't prevent division by zero, an index out of range, or an infinite loop; a well-typed program may still crash in those ways, or never finish. Richer type systems rule out more (Rust's rules out data races, Lesson 8), but no checker can rule out all bad behaviour. Whether a program ever does something bad when run is a semantic property of what it computes, so by Rice's theorem (CS 320 Lesson 8) no algorithm decides it exactly. A sound checker must therefore be <strong>conservative</strong>: it rejects some programs that would never go wrong, such as <code>(if true 1 false)</code>, which evaluates to 1 but has branches of different types. Language design keeps trading between rejecting too much and checking too little.</p>
<p>Soundness is also something a language can fail to have. C's casts and arrays let well-typed programs corrupt memory. Java's arrays have a known hole that is closed by a run-time check (Lesson 6). TypeScript, which adds types to JavaScript, chooses some unsound rules on purpose, to accept common JavaScript code.</p>

<h3>Python: dynamic typing with optional static checks</h3>
<p>Python is dynamically typed, and its type hints (CS 102 Lesson 4) don't change that: the interpreter ignores them. A separate checker such as mypy reads them and checks the program statically. Python thus has <strong>gradual typing</strong>: annotated parts are checked, unannotated parts and anything of type <code>Any</code> are trusted, and the two meet at run time with no checks between them. Precisely, by default: mypy always checks module-level code, and checks every call against the callee's signature if it has one; the standard library's signatures come from <strong>stubs</strong>, files of type descriptions shipped with mypy, so <code>len(5)</code> is reported even in a file with no annotations. A function with no annotations at all is treated as taking and returning <code>Any</code>: calls to it are not checked, and neither is its body.</p>
<pre data-label="hints.py"><code>from typing import Any


def total(prices: list[float]) -&gt; float:
    return sum(prices)


def label(n: int) -&gt; str:
    return "item " + n


x: Any = "3"
print(total([1.5, 2.5]) + x)
print(total(["a", "b"]))</code></pre>
<pre data-label="Shell"><code>$ mypy hints.py
hints.py:9: error: Unsupported operand types for + ("str" and "int")  [operator]
hints.py:14: error: List item 0 has incompatible type "str"; expected "float"  [list-item]
hints.py:14: error: List item 1 has incompatible type "str"; expected "float"  [list-item]
Found 3 errors in 1 file (checked 1 source file)
$ python3 hints.py
Traceback (most recent call last):
  File "hints.py", line 13, in &lt;module&gt;
    print(total([1.5, 2.5]) + x)
TypeError: unsupported operand type(s) for +: 'float' and 'str'</code></pre>
<p>mypy found the bug in <code>label</code>, which never even runs, using only the annotation <code>n: int</code>, exactly as our (add) rule did for Mini. It said nothing about line 13, because <code>x</code> is declared <code>Any</code>, which mypy accepts everywhere: <code>Any</code> switches the checker off for that value, and Python's own dynamic check caught the error when the line ran. Gradual typing is how dynamically typed languages add static checking to existing code, a module at a time: TypeScript did this for JavaScript, and companies such as Dropbox and Meta added types to millions of lines of Python the same way.</p>
`,
      terms: [
        ["Type system", "Rules that classify expressions by the kind of value they produce, used to rule out type errors."],
        ["Type error", "Applying an operation to a value it isn't defined for, such as adding a number to a boolean."],
        ["Dynamic typing", "Checking types at run time, using a tag carried by each value."],
        ["Static typing", "Checking types before the program runs, from its text alone."],
        ["Strong (type-safe) typing", "Informally: values are never used as the wrong type without an error."],
        ["Typing judgment", "Γ ⊢ e : T, the statement that e has type T in type environment Γ."],
        ["Type environment", "A mapping Γ from variables in scope to their types."],
        ["Function type", "The type of a function, giving its parameter types and result type, such as (-> int int bool)."],
        ["Soundness", "The guarantee that programs accepted by the type checker never encounter a type error when run."],
        ["Progress", "A well-typed expression is a value or can take a step: it is never stuck."],
        ["Preservation", "Taking a step from a well-typed expression gives an expression of the same type."],
        ["Conservative checker", "A checker that rejects some programs that would never go wrong, as every sound checker must."],
        ["Gradual typing", "Mixing statically checked and unchecked code in one program, as Python with mypy and Any does."]
      ],
      quiz: [
        { q: "Which program does Mini's type checker reject even though it evaluates without error?", choices: ["(if (< 1 2) 3 4)", "(if true 1 false)", "(let (x 1) (+ x x))", "(= 1 1)"], answer: 1, why: "The (if) rule requires both branches to have the same type; it doesn't evaluate the condition." },
        { q: "What type does (lambda ((f (-> int bool)) (x int)) (if (f x) 1 0)) have?", choices: ["(-> int bool)", "(-> (-> int bool) int int)", "(-> int int int)", "int"], answer: 1, why: "Its parameters have types (-> int bool) and int, and its body has type int." },
        { q: "In the rule (let), in what environment is the body e2 checked?", choices: ["Γ", "Γ extended with x : T1, the type of e1", "The empty environment", "Γ extended with x : T2"], answer: 1, why: "The body sees the new variable, with the type of its right-hand side." },
        { q: "In a language with a sound type system like Mini's, which of these can a well-typed program still do when run?", choices: ["Add a number to a boolean", "Use an int as an if condition", "Loop forever (using letrec)", "Call a number as a function"], answer: 2, why: "Soundness rules out type errors only; non-termination (and division by zero, if Mini had division) are not type errors." },
        { q: "Why must every sound type checker reject some programs that would run correctly?", choices: ["Because computers are finite", "Because whether a program ever goes wrong is undecidable (Rice's theorem), so the checker must err on the side of rejecting", "Because type checkers don't read the whole program", "They don't have to"], answer: 1, why: "An exact checker would decide a semantic property of programs, which Rice's theorem rules out." },
        { q: "mypy accepts print(total([1.5, 2.5]) + x) when x is declared Any, but the line fails at run time. Why?", choices: ["mypy has a bug", "Any is compatible with every type, so mypy doesn't check it; Python's dynamic check catches the error", "Type hints are checked at run time", "float + str is allowed in Python"], answer: 1, why: "Any is the gradual-typing escape hatch: it turns off static checking for that value." }
      ],
      practice: [
        {
          q: `<p>Write the full typing derivation for <code>(if (&lt; 1 2) (+ 3 4) 5)</code> in the empty environment.</p>`,
          a: `<pre data-label="Derivation"><code>  ⊢ 1 : int  ⊢ 2 : int      ⊢ 3 : int  ⊢ 4 : int
  ───────────────── (lt)    ───────────────── (add)
  ⊢ (&lt; 1 2) : bool          ⊢ (+ 3 4) : int          ⊢ 5 : int
  ───────────────────────────────────────────────────────────── (if)
                 ⊢ (if (&lt; 1 2) (+ 3 4) 5) : int</code></pre><p>Each number is justified by (num). The (if) rule needs a bool condition and two branches of one type <em>T</em>, here int.</p>`
        },
        {
          q: `<p>Give the type of each, or say why it is rejected (which typing rule fails, or that it isn't a well-formed expression at all): (a) <code>(lambda ((x bool) (y int)) (if x y 0))</code>; (b) <code>(lambda ((g (-&gt; int int))) (g true))</code>; (c) <code>((lambda ((x int)) (&lt; x 3)) 2)</code>; (d) <code>(lambda ((n int)) n n)</code>.</p>`,
          a: `<p>(a) <code>(-&gt; bool int int)</code>. (b) Rejected by (app): <code>g</code> expects an int and gets a bool. (c) <code>bool</code>: the function has type <code>(-&gt; int bool)</code> and is applied to an int. (d) Not well formed: a <code>lambda</code> has exactly one body, so this doesn't match the syntax at all, before typing is even considered (our checker would report <code>cannot type</code>).</p>`
        },
        {
          q: `<p>Add a typing rule and a checker case for <code>(neg e)</code> (Lesson 1's negation) and for <code>(and e1 e2)</code> (boolean and). Check <code>(and (&lt; 1 2) (neg 3))</code>.</p>`,
          a: `<pre data-label="Rules"><code>     Γ ⊢ e : int                  Γ ⊢ e1 : bool    Γ ⊢ e2 : bool
  ────────────────── (neg)       ──────────────────────────────── (and)
   Γ ⊢ (neg e) : int                  Γ ⊢ (and e1 e2) : bool</code></pre><pre><code>base_typecheck = typecheck

def typecheck(e, tenv):
    match e:
        case ["neg", inner]:
            expect(typecheck(inner, tenv), "int", "neg")
            return "int"
        case ["and", left, right]:
            expect(typecheck(left, tenv), "bool", "and")
            expect(typecheck(right, tenv), "bool", "and")
            return "bool"
        case _:
            return base_typecheck(e, tenv)

try:
    typecheck(read("(and (&lt; 1 2) (neg 3))"), {})
except TypeError as err:
    print(err)   # and expects bool, got int</code></pre><p>The new cases are tried first and everything else goes to the old checker. This works even for a <code>neg</code> nested inside an <code>if</code> or <code>let</code>: the old checker's recursive calls look up the global name <code>typecheck</code> each time, and it now names the new function.</p>`
        },
        {
          q: `<p>For each, say whether Python raises an error, mypy reports one, both, or neither: (a) <code>def f(x: int) -&gt; int: return x + "1"</code>, never called; (b) <code>n: int = "five"</code>; (c) <code>print(len(5))</code> in a file without annotations; (d) <code>def g(x): return x + 1</code> followed by <code>g("a")</code>.</p>`,
          a: `<p>(a) Only mypy, which checks the body against the annotation without running it; Python never runs the body. (b) Only mypy (incompatible types in assignment); Python ignores the annotation and stores the string. (c) Both: Python raises <code>TypeError</code> when the line runs, and mypy knows <code>len</code>'s signature from its stubs (type descriptions of the standard library) and reports that an <code>int</code> has no length. (d) Only Python, at run time: <code>g</code> has no annotations, so mypy treats its parameter and result as <code>Any</code> and checks nothing about the call (by default mypy doesn't even check the bodies of unannotated functions).</p>`
        }
      ],
      sources: ["plai", "tapl", "wright94", "milner78", "mypydocs"]
    },
    {
      id: "pl6",
      title: "Type inference and polymorphism",
      minutes: 90,
      summary: "Generic functions in Python, OCaml and Java; parametric polymorphism and what a type alone reveals about a function; type inference as constraint solving; unification with the occurs check; Hindley–Milner inference with let-polymorphism; and subtyping, variance, and a Java bug that variance explains.",
      notes: `
<p>Typed Mini needs an annotation on every parameter, and a function such as Lesson 3's <code>twice</code> had to be written once for ints, again for bools, and again for every other type. Both problems have the same solution. Let a type contain <em>variables</em>, so that one function can have a type like "for any type <em>a</em>, (<em>a</em> → <em>a</em>) → <em>a</em> → <em>a</em>", and let the checker work out such types by itself.</p>

<p>As in Lesson 2, programs are read with <code>read</code>, Lesson 1's reader written as one function, repeated here so that this lesson's code runs on its own:</p>
<pre><code>def read(text):
    """Lesson 1's reader, as one function: s-expression text to nested lists."""
    tokens = text.replace("(", " ( ").replace(")", " ) ").split()

    def item(i):                            # read one s-expression at tokens[i]
        if i == len(tokens):
            raise SyntaxError("unexpected end of input")
        if tokens[i] == ")":
            raise SyntaxError("unexpected )")
        if tokens[i] != "(":
            try:
                return int(tokens[i]), i + 1
            except ValueError:
                return tokens[i], i + 1
        items, i = [], i + 1
        while i &lt; len(tokens) and tokens[i] != ")":
            x, i = item(i)
            items.append(x)
        if i == len(tokens):
            raise SyntaxError("missing )")
        return items, i + 1

    expr, i = item(0)
    if i != len(tokens):
        raise SyntaxError("extra input after the expression")
    return expr</code></pre>
<h3>Generics and parametric polymorphism</h3>
<p>A function is <strong>polymorphic</strong> if it can be used at more than one type. When it works the same way for every type, because it never looks inside the values of that type, it is <strong>parametrically polymorphic</strong>, or <strong>generic</strong>. Taking the first element of a list is the same code for a list of ints and a list of strings. Python 3.12 lets you say so with a <strong>type parameter</strong> in square brackets:</p>
<pre data-label="gen.py"><code>def first[T](xs: list[T]) -&gt; T:
    return xs[0]

reveal_type(first([1, 2, 3]))
reveal_type(first(["a"]))
n: int = first(["a"])</code></pre>
<pre data-label="Shell"><code>$ mypy gen.py
gen.py:4: note: Revealed type is "int"
gen.py:5: note: Revealed type is "str"
gen.py:6: error: Incompatible types in assignment (expression has type "str", variable has type "int")  [assignment]</code></pre>
<p>(<code>reveal_type</code> is understood only by mypy, which prints the type it computed.) At each call mypy <em>instantiates</em> <code>T</code>: with <code>int</code> for the first call, with <code>str</code> for the second, and then it knows the result types. Older Python code writes the same thing with <code>T = TypeVar("T")</code> from <code>typing</code>. Java writes <code>static &lt;T&gt; T first(List&lt;T&gt; xs)</code>, and OCaml needs no annotation at all: it <em>infers</em> that <code>let first xs = List.hd xs</code> has type <code>'a list -&gt; 'a</code>, where <code>'a</code> (read "alpha") is a type variable.</p>
<p>Parametric polymorphism is a strong constraint on the function. A function of type ∀<em>a</em>. <em>a</em> → <em>a</em> ("for all types <em>a</em>") receives a value it knows nothing about: it can't add to it, compare it or print it, because the code must work for every type. So all it can do is return its argument (or loop forever or crash). A function of type ∀<em>a</em>. list[<em>a</em>] → list[<em>a</em>] can only drop, duplicate or rearrange elements, never invent new ones. Here is why that makes any such function <em>r</em> (such as <code>reverse</code>) commute with <code>map</code>. Since <em>r</em> can't look inside the elements, which positions it copies into its output can depend only on the input's length: output position <em>i</em> holds the input's element at some position <em>p</em>(<em>i</em>), the same <em>p</em> for every list of that length. <code>map(f, xs)</code> has the same length as <code>xs</code> and holds <em>f</em>(<code>xs[j]</code>) at position <em>j</em>. So position <em>i</em> of <code>r(map(f, xs))</code> is <em>f</em>(<code>xs[p(i)]</code>), and so is position <em>i</em> of <code>map(f, r(xs))</code>. Hence <code>reverse(map(f, xs))</code> equals <code>map(f, reverse(xs))</code> for every <code>f</code>, a fact you can read off the type without reading the code (assuming <em>r</em> doesn't loop forever or crash). Contrast <strong>ad hoc polymorphism</strong>, or overloading, where one name has different code at different types: <code>+</code> adds ints and concatenates strings. And <strong>subtype polymorphism</strong>, where a function written for <code>Animal</code> also accepts a <code>Dog</code>, which ends this lesson.</p>

<h3>Inference as constraint solving</h3>
<p>For the rest of the lesson, Mini's functions are curried, with one parameter and no annotations: <code>(lambda (x) body)</code> and calls <code>(f a)</code>. Types are <code>int</code>, <code>bool</code>, function types <code>['-&gt;', A, B]</code> meaning <em>A</em> → <em>B</em>, and type variables, written as strings starting with a quote: <code>"'a"</code>, <code>"'t0"</code>.</p>
<p>To infer types, the checker gives every unknown a fresh type variable and collects <strong>constraints</strong>, equations that must hold, from the typing rules. Take <code>(lambda (x) (+ x 1))</code>. Give <code>x</code> the type <code>'a</code>. The rule (add) needs both operands to be int, which gives the equation <code>'a = int</code>. Solving it, the function has type int → int.</p>
<p>A more interesting one is <code>twice</code>, <code>(lambda (f) (lambda (x) (f (f x))))</code>:</p>
<ol>
<li><code>f</code> gets type <code>'t0</code> and <code>x</code> gets <code>'t1</code>.</li>
<li>The inner call <code>(f x)</code>: the function's type must be "argument's type → something". Call the result <code>'t2</code>; the constraint is <code>'t0 = 't1 → 't2</code>.</li>
<li>The outer call <code>(f (f x))</code>: its argument has type <code>'t2</code>. Call the result <code>'t3</code>; the constraint is <code>'t0 = 't2 → 't3</code>.</li>
<li>The whole expression has type <code>'t0 → 't1 → 't3</code>.</li>
</ol>
<p>Both constraints on <code>'t0</code> must hold, so <code>'t1 → 't2 = 't2 → 't3</code>, which needs <code>'t1 = 't2</code> and <code>'t2 = 't3</code>. Everything is <code>'t3</code>: the type is <code>('t3 → 't3) → 't3 → 't3</code>, or, renaming, <code>('a → 'a) → 'a → 'a</code>. Nothing forced <code>'a</code> to be any particular type, so <code>twice</code> works for all of them. (Arrows group to the right: <code>'a → 'b → 'c</code> means <code>'a → ('b → 'c)</code>, a curried function of two arguments.)</p>

<h3>Unification</h3>
<p>Solving such equations is <strong>unification</strong>: given two types containing variables, find a <strong>substitution</strong> (a mapping from type variables to types) that makes them equal, or report that none exists. The algorithm is structural recursion on both types at once:</p>
<ul>
<li>If the two types are already equal, nothing is needed.</li>
<li>If one is a variable <code>'v</code>, map <code>'v</code> to the other type. But first check that <code>'v</code> doesn't occur inside the other type: <code>'a = 'a → int</code> has no finite solution (<code>'a</code> would be <code>('a → int) → int</code>, and so on forever). This is the <strong>occurs check</strong>.</li>
<li>If both are function types, unify their argument types and then their result types, carrying the substitution along.</li>
<li>Otherwise (int against bool, or int against a function) they can't be unified: a type error.</li>
</ul>
<pre><code>def is_var(t):
    return isinstance(t, str) and t.startswith("'")

def resolve(t, s):
    """Apply the substitution s to t, all the way down."""
    if is_var(t) and t in s:
        return resolve(s[t], s)
    if isinstance(t, list):
        return [t[0]] + [resolve(x, s) for x in t[1:]]
    return t

def occurs(v, t):
    return v == t or (isinstance(t, list) and any(occurs(v, x) for x in t[1:]))

def unify(a, b, s):
    a, b = resolve(a, s), resolve(b, s)
    if a == b:
        return s
    if is_var(a):
        if occurs(a, b):
            raise TypeError(f"infinite type: {a} = {show_type(b)}")
        return s | {a: b}
    if is_var(b):
        return unify(b, a, s)
    if isinstance(a, list) and isinstance(b, list) and len(a) == len(b) and a[0] == b[0]:
        for x, y in zip(a[1:], b[1:]):
            s = unify(x, y, s)
        return s
    raise TypeError(f"cannot unify {show_type(a)} with {show_type(b)}")

def show_type(t):
    match t:
        case ["-&gt;", ["-&gt;", *_] as arg, res]:
            return f"({show_type(arg)}) -&gt; {show_type(res)}"
        case ["-&gt;", arg, res]:
            return f"{show_type(arg)} -&gt; {show_type(res)}"
        case _:
            return t

print(unify(["-&gt;", "'a", "int"], ["-&gt;", "bool", "'b"], {}))   # {"'a": 'bool', "'b": 'int'}
print(unify(["-&gt;", "'a", "'a"], ["-&gt;", "int", "'b"], {}))     # {"'a": 'int', "'b": 'int'}</code></pre>
<p>A substitution may map a variable to a type that mentions another variable that is mapped in turn, so <code>resolve</code> follows the chain. In the second example <code>'a</code> is mapped to <code>int</code>, after which <code>'a</code> against <code>'b</code> becomes <code>int</code> against <code>'b</code>. (In a pattern, <code>p as name</code> matches <code>p</code> and also binds the whole matched value to <code>name</code>; <code>show_type</code> uses it to parenthesize a function type on the left of an arrow.) Unifying <code>'a → 'a</code> with <code>int → bool</code> fails with <code>cannot unify int with bool</code>, and <code>'a</code> with <code>'a → int</code> fails the occurs check. The substitution unification finds is the <em>most general</em> one: any other solution is a special case of it, so no option is ruled out that didn't have to be.</p>

<h3>Inferring types</h3>
<p>The inference function walks the expression, as the checker of Lesson 5 did, but it returns a type that may contain variables, along with the substitution found so far:</p>
<pre><code>import itertools

counter = itertools.count()

def fresh():
    return f"'t{next(counter)}"

def infer(e, tenv, s):
    """Return (type, substitution) for e in type environment tenv."""
    match e:
        case int():
            return "int", s
        case str(name):
            if name not in tenv:
                raise TypeError(f"unbound variable {name}")
            return tenv[name], s
        case ["lambda", [str(x)], body]:
            tx = fresh()                                 # x's type is unknown
            tbody, s = infer(body, tenv | {x: tx}, s)
            return ["-&gt;", tx, tbody], s
        case [str(op), left, right] if op in ("+", "-", "*"):
            tl, s = infer(left, tenv, s)
            s = unify(tl, "int", s)
            tr, s = infer(right, tenv, s)
            s = unify(tr, "int", s)
            return "int", s
        case [fn, arg]:
            tf, s = infer(fn, tenv, s)
            ta, s = infer(arg, tenv, s)
            result = fresh()
            s = unify(tf, ["-&gt;", ta, result], s)          # fn must be ta -&gt; result
            return result, s
        case _:
            raise TypeError(f"cannot type {e!r}")

def type_of(text):
    global counter
    counter = itertools.count()                          # number from 't0 again
    t, s = infer(read(text), {}, {})
    return show_type(resolve(t, s))

print(type_of("(lambda (x) (+ x 1))"))                    # int -&gt; int
print(type_of("(lambda (f) (lambda (x) (f (f x))))"))     # ('t3 -&gt; 't3) -&gt; 't3 -&gt; 't3</code></pre>
<p>(<code>itertools.count()</code> yields 0, 1, 2, … so each call to <code>fresh</code> gives a new variable; <code>type_of</code> restarts the count, and <code>global counter</code> lets it replace the module-level variable.) The output for <code>twice</code> matches the hand derivation above. Variable numbers depend on the order in which they were made, so this lesson's problems rename them in order of appearance to <code>'a</code>, <code>'b</code>, …; with that, <code>twice</code> prints as <code>('a -&gt; 'a) -&gt; 'a -&gt; 'a</code>, and <code>(lambda (x) (lambda (y) x))</code> as <code>'a -&gt; 'b -&gt; 'a</code>. The cases for booleans, comparisons, <code>if</code> and <code>let</code> are yours to write in this lesson's first programming problem. Self-application is rejected: in <code>(lambda (x) (x x))</code>, <code>x : 'a</code> must equal <code>'a → 'b</code>, which fails the occurs check. (Ω from Lesson 3 has no type, which is a hint that well-typed terms of this little language always terminate; they do.)</p>

<h3>Let-polymorphism: Hindley–Milner</h3>
<p>Our inference has one weakness. In</p>
<pre data-label="Mini"><code>(let (id (lambda (x) x))
  (if (id true) (id 1) 0))</code></pre>
<p><code>id</code> gets the type <code>'t0 → 't0</code>. Then <code>(id true)</code> unifies <code>'t0</code> with bool, and <code>(id 1)</code> tries to unify bool with int and fails. Yet <code>id</code> is fine at both types; the trouble is that <code>'t0</code> is a single unknown, shared by every use. The fix, discovered by Roger Hindley (1969) for logic and by Robin Milner (1978) for the ML language, is to <strong>generalize</strong> at <code>let</code>. After inferring the right-hand side's type, every type variable in it that isn't constrained by anything else in scope is turned into a "for all", giving a <strong>type scheme</strong>: <code>id</code> : ∀<em>a</em>. <em>a</em> → <em>a</em>. Each <em>use</em> of <code>id</code> then <strong>instantiates</strong> the scheme with fresh variables, so <code>(id true)</code> uses <code>'t5 → 't5</code> and <code>(id 1)</code> uses <code>'t7 → 't7</code>, and they no longer interfere. This is <strong>let-polymorphism</strong>, and the whole system is <strong>Hindley–Milner</strong> type inference (Milner's algorithm for it is called algorithm W). It is the core of type inference in OCaml, Standard ML, F# and Haskell, and the idea behind type inference in Rust and Swift.</p>
<p>Two details matter. First, a variable must not be generalized if it also appears in the type of something else in scope, because then it isn't free to be anything. In <code>(lambda (y) (let (f (lambda (x) y)) ...))</code>, <code>f</code>'s type is <code>'tx → 'ty</code>, and <code>'ty</code> is <code>y</code>'s type, fixed for the whole lambda; only <code>'tx</code> may be generalized. Second, only <code>let</code> generalizes, not <code>lambda</code>: <code>(lambda (id) (if (id true) (id 1) 0))</code> is rejected even under Hindley–Milner, because a parameter's type must be a single type for the whole body. Allowing polymorphic parameters makes inference undecidable, which is why ML stops here: full type inference, with no annotations at all, for a large and useful set of programs. Its cost is usually close to linear in practice, although contrived programs (deeply nested <code>let</code>s whose types double in size) can make it exponential.</p>

<h3>Subtyping and variance</h3>
<p>Object-oriented languages add another relation between types. <em>S</em> is a <strong>subtype</strong> of <em>T</em>, written <em>S</em> &lt;: <em>T</em>, if a value of type <em>S</em> can be used anywhere a <em>T</em> is expected: <code>Dog</code> &lt;: <code>Animal</code> when <code>Dog</code> is a subclass that keeps <code>Animal</code>'s behaviour (Barbara Liskov's substitution principle, CS 102 Lesson 3). The hard question is how subtyping extends to types built from other types. If <code>Dog</code> &lt;: <code>Animal</code>, is a list of dogs a list of animals?</p>
<ul>
<li>For a structure you can only read, yes: anything you read from a sequence of dogs is an animal. A type constructor that keeps the direction is <strong>covariant</strong>.</li>
<li>For a function, the argument goes the other way. A function that accepts any animal can be used where a function on dogs is expected, but not the reverse. So (<code>Animal</code> → <em>R</em>) &lt;: (<code>Dog</code> → <em>R</em>): functions are <strong>contravariant</strong> in their argument and covariant in their result.</li>
<li>A mutable list is both read and written, so it must be <strong>invariant</strong>: <code>list[Dog]</code> and <code>list[Animal]</code> are unrelated.</li>
</ul>
<p>Here is the bug invariance prevents, in Python, which mypy catches:</p>
<pre data-label="variance.py"><code>from collections.abc import Sequence


class Animal:
    def name(self) -&gt; str:
        return "animal"


class Dog(Animal):
    def bark(self) -&gt; str:
        return "woof"


class Cat(Animal):
    pass


def add_cat(animals: list[Animal]) -&gt; None:
    animals.append(Cat())


def names(animals: Sequence[Animal]) -&gt; list[str]:
    return [a.name() for a in animals]


dogs: list[Dog] = [Dog()]
print(names(dogs))
add_cat(dogs)
print(dogs[1].bark())</code></pre>
<pre data-label="Shell"><code>$ mypy variance.py
variance.py:28: error: Argument 1 to "add_cat" has incompatible type "list[Dog]"; expected "list[Animal]"  [arg-type]
variance.py:28: note: "list" is invariant -- see https://mypy.readthedocs.io/en/stable/common_issues.html#variance
variance.py:28: note: Consider using "Sequence" instead, which is covariant
$ python3 variance.py
['animal']
Traceback (most recent call last):
  ...
AttributeError: 'Cat' object has no attribute 'bark'</code></pre>
<p>Passing <code>dogs</code> to <code>names</code> is accepted, because <code>Sequence</code> is read-only and covariant. Passing it to <code>add_cat</code> would let a cat into a list of dogs, and the program then fails when it treats the cat as a dog. Java made the opposite choice for arrays in 1995, before it had generics: <code>String[]</code> is a subtype of <code>Object[]</code>. To stay sound it must check every store into an array at run time:</p>
<pre data-label="Java"><code>String[] strings = {"a", "b"};
Object[] objects = strings;          // allowed: arrays are covariant
objects[0] = Integer.valueOf(42);    // compiles; fails when it runs</code></pre>
<pre data-label="Output"><code>Exception in thread "main" java.lang.ArrayStoreException: java.lang.Integer</code></pre>
<p>Java's later generic lists, added in 2004, are invariant (<code>List&lt;String&gt;</code> is not a <code>List&lt;Object&gt;</code>), with wildcards such as <code>List&lt;? extends Animal&gt;</code> for the read-only, covariant use.</p>
`,
      terms: [
        ["Polymorphism", "One piece of code usable at more than one type."],
        ["Parametric polymorphism", "Code that works uniformly for every type, without inspecting values of that type; generics."],
        ["Type parameter (type variable)", "A variable standing for a type, such as T in first[T] or 'a in OCaml."],
        ["Instantiation", "Replacing a polymorphic type's variables by particular types (or fresh variables) at a use."],
        ["Ad hoc polymorphism", "Overloading: one name with different code at different types."],
        ["Type inference", "Computing the types of expressions without annotations, by generating and solving constraints."],
        ["Unification", "Finding a substitution of types for type variables that makes two types equal."],
        ["Substitution (of types)", "A mapping from type variables to types."],
        ["Occurs check", "Refusing to bind a variable to a type that contains it, which would need an infinite type."],
        ["Type scheme", "A type with universally quantified variables, such as ∀a. a → a."],
        ["Let-polymorphism", "Generalizing the type of a let-bound name, so each use can instantiate it differently."],
        ["Hindley–Milner", "The type system and inference algorithm of ML: unification plus let-polymorphism, with no annotations needed."],
        ["Subtype", "S <: T if a value of type S can be used wherever a T is expected."],
        ["Covariant, contravariant, invariant", "A type constructor that preserves, reverses, or ignores the subtype relation of its argument."]
      ],
      quiz: [
        { q: "Which substitution unifies 'a -> int with bool -> 'b?", choices: ["{'a: int, 'b: bool}", "{'a: bool, 'b: int}", "{'a: 'b}", "None exists"], answer: 1, why: "Unify the argument types ('a with bool) and the result types (int with 'b)." },
        { q: "Why does unifying 'a with 'a -> int fail?", choices: ["int is not a type variable", "The occurs check: 'a appears inside 'a -> int, so no finite type solves it", "Arrows can't be unified", "'a is already bound"], answer: 1, why: "Any solution would have to be an infinite type." },
        { q: "What type does Hindley–Milner infer for (lambda (x) (lambda (y) x))?", choices: ["'a -> 'a -> 'a", "'a -> 'b -> 'a", "'a -> 'b -> 'b", "int -> int -> int"], answer: 1, why: "Nothing relates x and y, so they get independent variables, and the result is x's type." },
        { q: "Why does (let (id (lambda (x) x)) (if (id true) (id 1) 0)) type-check under Hindley–Milner but not with plain unification?", choices: ["Because if is special", "id's type is generalized at let to ∀a. a → a, and each use gets fresh variables", "Because 1 and true have the same type", "Because the condition is ignored"], answer: 1, why: "Without generalization, one variable is shared by both uses and must be both bool and int." },
        { q: "A function of type ∀a. a -> a, which always terminates without error, must be:", choices: ["Any function on numbers", "The identity function", "A constant function", "Impossible to write"], answer: 1, why: "Knowing nothing about the type, it can only return the value it was given." },
        { q: "Java's String[] is a subtype of Object[]. What does this force Java to do?", choices: ["Nothing", "Check every store into an array at run time, raising ArrayStoreException on a mismatch", "Copy arrays when passing them", "Forbid arrays of objects"], answer: 1, why: "Covariant mutable arrays are unsound without a run-time check, since an Object[] reference might really be a String[]." }
      ],
      practice: [
        {
          q: `<p>Unify by hand, giving the resulting substitution or the reason it fails: (a) <code>'a → 'b</code> with <code>int → 'a</code>; (b) <code>('a → 'a) → 'b</code> with <code>(int → bool) → int</code>; (c) <code>'a → 'b</code> with <code>'b → ('a → int)</code>.</p>`,
          a: `<p>(a) Arguments: <code>'a = int</code>. Results: <code>'b</code> against <code>'a</code>, which is now int, so <code>'b = int</code>. Substitution {<code>'a</code>: int, <code>'b</code>: int}. (b) Arguments: <code>'a → 'a</code> against <code>int → bool</code> gives <code>'a = int</code>, then int against bool: fails. (c) Arguments: <code>'a = 'b</code>. Results: <code>'b</code> against <code>'a → int</code>, which resolves to <code>'b → int</code>; <code>'b</code> occurs in it, so the occurs check fails.</p><pre><code>print(unify(["-&gt;", "'a", "'b"], ["-&gt;", "int", "'a"], {}))   # {"'a": 'int', "'b": 'int'}
try:
    unify(["-&gt;", "'a", "'b"], ["-&gt;", "'b", ["-&gt;", "'a", "int"]], {})
except TypeError as err:
    print(err)   # infinite type: 'b = 'b -&gt; int</code></pre>`
        },
        {
          q: `<p>Infer the type of <code>compose</code>, <code>(lambda (f) (lambda (g) (lambda (x) (f (g x)))))</code>, by hand: assign variables, write the constraints, solve them.</p>`,
          a: `<p><code>f : 'f</code>, <code>g : 'g</code>, <code>x : 'x</code>. <code>(g x)</code> has a new result <code>'r1</code> with <code>'g = 'x → 'r1</code>. <code>(f (g x))</code> has result <code>'r2</code> with <code>'f = 'r1 → 'r2</code>. The whole is <code>'f → 'g → 'x → 'r2</code> = <code>('r1 → 'r2) → ('x → 'r1) → 'x → 'r2</code>. Renamed in order of appearance: <code>('a → 'b) → ('c → 'a) → 'c → 'b</code>. The output type of <code>g</code> must be the input type of <code>f</code>, and nothing else is constrained.</p><pre><code>print(type_of("(lambda (f) (lambda (g) (lambda (x) (f (g x)))))"))</code></pre><p>The notes' <code>type_of</code> doesn't rename, so it prints the same type with numbered variables.</p>`
        },
        {
          q: `<p>Which of these should Hindley–Milner accept? Give the type, or the reason it fails. (a) <code>(let (k (lambda (x) (lambda (y) x))) ((k 1) true))</code>; (b) <code>(let (k (lambda (x) (lambda (y) x))) (+ ((k 1) true) ((k 2) 3)))</code>; (c) <code>(lambda (k) (+ ((k 1) true) ((k 2) 3)))</code>.</p>`,
          a: `<p>(a) int: <code>k</code> : ∀<em>a</em> <em>b</em>. <em>a</em> → <em>b</em> → <em>a</em>, instantiated with <em>a</em> = int, <em>b</em> = bool. (b) int: the two uses instantiate the scheme separately (<em>b</em> = bool, then <em>b</em> = int), and both return int. (c) Rejected: <code>k</code> is a parameter, so it has one monomorphic type <code>'k</code>. The first use forces <code>'k = int → bool → 'r</code>, the second needs <code>int → int → 's</code>, and unifying bool with int fails, even though the body would run correctly if passed the <code>k</code> of (a).</p>`
        },
        {
          q: `<p>Using the variance rules, decide each, where <code>Dog</code> &lt;: <code>Animal</code>: (a) is <code>Callable[[Animal], str]</code> a subtype of <code>Callable[[Dog], str]</code>? (b) is <code>Callable[[], Dog]</code> a subtype of <code>Callable[[], Animal]</code>? (c) is <code>dict[str, Dog]</code> a subtype of <code>dict[str, Animal]</code>? Explain (a) with an example. (<code>Callable[[A], R]</code>, from <code>collections.abc</code>, is the type of functions from <code>A</code> to <code>R</code>.)</p>`,
          a: `<p>(a) Yes, by contravariance: a function that can describe any animal can stand in wherever a function that describes dogs is expected, because every argument it will receive is a dog, which is an animal. For example, a <code>describe_all(dogs, describe_dog)</code> helper can be given <code>describe_animal</code> instead. The reverse would hand a cat to code that expects a dog. (b) Yes, by covariance of results: a function that returns dogs returns animals. (c) No: a <code>dict</code> is mutable, so it is invariant in its value type, for the same reason as <code>list</code> (you could store a cat in it). The read-only <code>Mapping[str, Dog]</code> is a subtype of <code>Mapping[str, Animal]</code>.</p>`
        }
      ],
      sources: ["milner78", "tapl", "plai", "mypydocs", "liskov87"]
    },
    {
      id: "pl7",
      title: "State, parameter passing and objects",
      minutes: 90,
      summary: "Mutation modeled with a store of locations, and a store-passing interpreter; order of evaluation and aliasing; call-by-value, call-by-reference, call-by-name and call-by-need, with examples that tell them apart; objects as closures; inheritance, self and dynamic dispatch; and the vtable that makes a virtual call one indirect jump.",
      notes: `
<p>Every language you've programmed in before Mini had assignment: <code>x = x + 1</code>, <code>xs.append(4)</code>, <code>*p = 0</code>. With it comes a new question for the semantics. After <code>x</code> is changed, who sees the change? This lesson adds assignment to Mini, uses it to compare the ways languages pass arguments, and then builds objects.</p>

<p>As in Lesson 2, programs are read with <code>read</code>, Lesson 1's reader written as one function, repeated here so that this lesson's code runs on its own:</p>
<pre><code>def read(text):
    """Lesson 1's reader, as one function: s-expression text to nested lists."""
    tokens = text.replace("(", " ( ").replace(")", " ) ").split()

    def item(i):                            # read one s-expression at tokens[i]
        if i == len(tokens):
            raise SyntaxError("unexpected end of input")
        if tokens[i] == ")":
            raise SyntaxError("unexpected )")
        if tokens[i] != "(":
            try:
                return int(tokens[i]), i + 1
            except ValueError:
                return tokens[i], i + 1
        items, i = [], i + 1
        while i &lt; len(tokens) and tokens[i] != ")":
            x, i = item(i)
            items.append(x)
        if i == len(tokens):
            raise SyntaxError("missing )")
        return items, i + 1

    expr, i = item(0)
    if i != len(tokens):
        raise SyntaxError("extra input after the expression")
    return expr</code></pre>
<h3>Environment and store</h3>
<p>Until now an environment mapped a name directly to a value. With assignment, two names can refer to the same changeable thing, and a closure can see later changes to a variable it captured (Lesson 3's cells). So a mutable variable needs two steps: the environment maps the name to a <strong>location</strong>, and a separate <strong>store</strong> maps each location to its current value. Binding creates a new location; assignment changes the store at an existing location; and reading a variable looks up its location and then the store. This is the model behind CS 210's memory: locations are addresses, the store is RAM, and a C variable's name stands for an address.</p>
<p>Mini gets <code>(set x e)</code>, which assigns the value of <code>e</code> to the variable <code>x</code> and returns it, and <code>(begin e1 … en)</code>, which evaluates the expressions in order and returns the last value. To make the store's role explicit, the interpreter takes the store as an argument and returns the store it leaves behind, along with the value: a <strong>store-passing</strong> interpreter. Stores are dicts that are never changed in place; each update builds a new one, as environments did.</p>
<pre><code>OPS = {
    "+": lambda a, b: a + b, "-": lambda a, b: a - b, "*": lambda a, b: a * b,
    "&lt;": lambda a, b: a &lt; b, "=": lambda a, b: a == b,
}

def ev(e, env, store):
    """env maps names to locations; store maps locations to values.
    Returns (value, store after evaluating e)."""
    match e:
        case int(n):
            return n, store
        case str(name):
            return store[env[name]], store
        case [str(op), left, right] if op in OPS:
            a, store = ev(left, env, store)
            b, store = ev(right, env, store)       # sees left's changes
            return OPS[op](a, b), store
        case ["if", test, then, other]:
            c, store = ev(test, env, store)
            return ev(then if c else other, env, store)
        case ["let", [str(name), rhs], body]:
            value, store = ev(rhs, env, store)
            loc = len(store)                       # a location not used yet
            return ev(body, env | {name: loc}, store | {loc: value})
        case ["set", str(name), rhs]:
            value, store = ev(rhs, env, store)
            return value, store | {env[name]: value}
        case ["begin", *exprs]:
            value = None
            for x in exprs:
                value, store = ev(x, env, store)
            return value, store
        case _:
            raise ValueError(f"not an expression: {e!r}")

def run(text):
    value, store = ev(read(text), {}, {})
    return value

print(run("(let (x 1) (begin (set x (+ x 1)) (set x (* x 10)) x))"))   # 20</code></pre>
<p>(Locations are numbered 0, 1, 2, …, and because this store never frees one, <code>len(store)</code> is always the next unused number. Lesson 8 is about freeing them.) Look at how the store flows: every case passes the store returned by one subexpression into the next. That threading <em>is</em> the order of evaluation, which with mutation is part of the meaning:</p>
<pre><code>print(run("(let (x 0) (+ (begin (set x 1) x) (begin (set x 10) x)))"))   # 11</code></pre>
<p>Left to right, the operands are 1 and 10. Python also guarantees left-to-right evaluation of operands. C does not: in <code>f() + g()</code> either call may run first, and an expression such as <code>i++ + i++</code>, which modifies <code>i</code> twice without an order between them, has undefined behavior. The pure Mini of Lessons 2 to 6 needed no such rule, since order can't matter without effects.</p>
<p>A <code>let</code> copies the <em>value</em> into a fresh location, so <code>(let (x 5) (let (y x) (begin (set y 7) x)))</code> returns 5, with store <code>{0: 5, 1: 7}</code>: <code>y</code> got its own location. Two names that share one location are <strong>aliases</strong>, and assigning through one changes what the other sees. Mini can't create aliases yet; parameter passing can.</p>

<h3>Parameter passing</h3>
<p>When a function is called with a variable as its argument, <code>f(x)</code>, and assigns to its parameter, does the caller's <code>x</code> change? Languages differ, and the differences have names.</p>
<ul>
<li><strong>Call-by-value.</strong> The argument is evaluated, and the parameter gets a <em>new</em> location holding a copy of the value, just like <code>let</code>. Assigning to the parameter changes only the copy. C, Java, OCaml and Mini work this way.</li>
<li><strong>Call-by-reference.</strong> If the argument is a variable, the parameter becomes an alias for the caller's location. Assigning to the parameter assigns to the caller's variable. C++ offers it with <code>&amp;</code> in the parameter type, and Pascal with <code>var</code>.</li>
</ul>
<pre data-label="C++"><code>#include &lt;cstdio&gt;

void swap_ref(int &amp;a, int &amp;b) { int t = a; a = b; b = t; }
void swap_val(int a, int b) { int t = a; a = b; b = t; }

int main() {
    int x = 1, y = 2;
    swap_val(x, y);
    std::printf("%d %d\\n", x, y);   // 1 2: only the copies were swapped
    swap_ref(x, y);
    std::printf("%d %d\\n", x, y);   // 2 1
}</code></pre>
<p>C has only call-by-value, so to let a function change the caller's variable you pass its address, a pointer, by value (<code>swap(&amp;x, &amp;y)</code>, CS 210 Lesson 4): explicit call-by-reference. Python is call-by-value too, but its values are references to objects, so the copied reference points to the same object. Mutating the object through the parameter is visible to the caller; assigning a new object to the parameter is not. This is sometimes called <strong>call-by-sharing</strong>; it isn't a different rule but call-by-value where the values are references. Java is the same: its <code>int</code>s and other primitive values are copied, and its objects are reached through references, which are copied too, so Java is call-by-value with call-by-sharing for objects:</p>
<pre><code>def f(xs):
    xs.append(4)     # mutates the caller's list
    xs = [0]         # rebinds only the local name
    return xs

a = [1, 2, 3]
print(f(a), a)       # [0] [1, 2, 3, 4]</code></pre>
<p>Two more strategies delay the argument instead of evaluating it at the call, as normal order did in the lambda calculus (Lesson 3).</p>
<ul>
<li><strong>Call-by-name</strong> (Algol 60): the argument expression is passed unevaluated, as a thunk, and re-evaluated in the caller's environment <em>every time</em> the parameter is used. Assigning to the parameter assigns to the argument expression in the caller's environment, which works when that expression is a variable or an element such as <code>a[i]</code>: passing <code>x</code> by name and doing <code>p = p + 1</code> inside the function increments the caller's <code>x</code>. (Assigning to a by-name parameter whose argument is, say, <code>x + 1</code> is not allowed.)</li>
<li><strong>Call-by-need</strong> (Haskell): like call-by-name, but the thunk remembers its value after the first use, as Lesson 4's <code>Lazy</code> did.</li>
</ul>
<p>The four strategies agree on pure code that terminates. They disagree when an argument has a side effect, or doesn't terminate, or isn't used. Here the argument is a call that increments a counter, and Python thunks model the delayed strategies:</p>
<pre><code>counter = 0
def next_id():
    global counter
    counter += 1
    return counter

def double_by_value(x):
    return x + x

def double_by_name(x):              # x is a function of no arguments
    return x() + x()

class Lazy:
    def __init__(self, compute):
        self.compute, self.done = compute, False
    def force(self):
        if not self.done:
            self.value, self.done = self.compute(), True
        return self.value

def double_by_need(x):
    return x.force() + x.force()

counter = 0
print(double_by_value(next_id()))      # 2
counter = 0
print(double_by_name(next_id))         # 3: evaluated twice, giving 1 + 2
counter = 0
print(double_by_need(Lazy(next_id)))   # 2: evaluated once</code></pre>
<p>If the function never used its parameter, call-by-value would still run <code>next_id</code> (and would loop forever on an argument that loops), while call-by-name and call-by-need would not. Call-by-name's re-evaluation was once used for tricks such as <em>Jensen's device</em>, passing both <code>i</code> and an expression <code>a[i]</code> to a summing procedure that changed <code>i</code>, but its cost and surprises are why no major language uses it today, except in specific constructs (Scala's by-name parameters, macros). Call-by-need is what lets Haskell build infinite lists cheaply.</p>

<h3>Objects as closures</h3>
<p>An object is state together with operations that use it. A closure is code together with the variables it captured. With mutable variables, they are the same thing seen from two sides:</p>
<pre><code>def make_account(balance):
    def deposit(amount):
        nonlocal balance
        balance += amount
        return balance
    def withdraw(amount):
        nonlocal balance
        if amount &gt; balance:
            raise ValueError("insufficient funds")
        balance -= amount
        return balance
    def dispatch(message, *args):
        if message == "deposit":
            return deposit(*args)
        if message == "withdraw":
            return withdraw(*args)
        if message == "balance":
            return balance
        raise AttributeError(message)
    return dispatch

acct = make_account(100)
acct("deposit", 50)
acct("withdraw", 30)
other = make_account(5)
print(acct("balance"), other("balance"))   # 120 5</code></pre>
<p>Each call to <code>make_account</code> creates a new location for <code>balance</code>, captured by three closures. <code>balance</code> is private: no code outside can reach it except through the messages. <code>dispatch</code> chooses the code to run from the <em>message</em> at run time, which is what a method call does. Smalltalk described every method call as sending a message to an object, and this is the style <em>Structure and Interpretation of Computer Programs</em> (often called SICP, the textbook quoted in Lesson 1) uses to introduce objects.</p>

<h3>Inheritance, self and dynamic dispatch</h3>
<p>A class-based language adds two things to this picture. A class shares one set of methods among all its instances, so each object stores only its fields plus a reference to its class. And a class can <strong>inherit</strong> from a superclass, reusing methods it doesn't redefine (CS 102 Lesson 3). A method call <code>obj.m()</code> is resolved by <strong>dynamic dispatch</strong>: at run time, look up <code>m</code> in the class of the object, then in its superclass, and so on. The crucial detail is that the methods receive the object itself, <code>self</code>, and calls on <code>self</code> are dispatched again, from the object's actual class:</p>
<pre><code>class Shape:
    def area(self):
        raise NotImplementedError
    def describe(self):
        return f"{type(self).__name__} with area {self.area()}"

class Rect(Shape):
    def __init__(self, w, h):
        self.w, self.h = w, h
    def area(self):
        return self.w * self.h

class Square(Rect):
    def __init__(self, side):
        super().__init__(side, side)
    def describe(self):
        return "a square: " + super().describe()

print(Rect(2, 3).describe())    # Rect with area 6
print(Square(4).describe())     # a square: Square with area 16</code></pre>
<p><code>describe</code> is written in <code>Shape</code>, which knows nothing about rectangles, yet its call <code>self.area()</code> runs <code>Rect.area</code>. Because a method's calls through <code>self</code> can reach code written later, in subclasses, this is called <strong>open recursion</strong>; it is the source of inheritance's power and of its fragility (changing which of its own methods a superclass calls can break subclasses). <code>super().describe()</code> starts the lookup in the superclass instead, so <code>Square</code> extends <code>describe</code> rather than replacing it. Python searches the classes in the order given by the class's <em>method resolution order</em>, <code>Square.__mro__</code>, which here is <code>Square</code>, <code>Rect</code>, <code>Shape</code>, <code>object</code>:</p>
<pre><code>def lookup(obj, name):
    for cls in type(obj).__mro__:
        if name in cls.__dict__:          # the class's own methods
            return cls.__dict__[name]
    raise AttributeError(name)

sq = Square(4)
method = lookup(sq, "area")
print(method.__qualname__, method(sq))   # Rect.area 16</code></pre>
<p>(<code>cls.__dict__</code> holds the attributes defined in that class itself; <code>__qualname__</code> is a function's name with its class.) <code>method(sq)</code> passes the object explicitly, which is all that <code>sq.area()</code> does behind the scenes.</p>

<h3>The vtable</h3>
<p>Python performs these dictionary lookups at run time (with caches to make them fast). Statically typed languages such as C++, Java and C# know at compile time which methods each class has, so they can do better. Each class gets a <strong>virtual method table</strong> (vtable): an array of pointers to its methods' machine code, with each method at a fixed position (index) that is the same in every subclass. Each object starts with a hidden pointer to its class's vtable. A call becomes: load the object's vtable pointer, load the entry at the method's index, call the code at that address. Here it is written out in C, which needs two features CS 210 didn't use. A <code>struct</code> is a record of named fields, laid out consecutively in memory (<code>s-&gt;a</code> is the field <code>a</code> of the struct that pointer <code>s</code> points to). A <em>function pointer</em> holds the address of a function's code: <code>double (*area)(struct Shape *)</code> declares <code>area</code> as a pointer to a function that takes a <code>struct Shape *</code> and returns a <code>double</code>, and <code>p-&gt;area(s)</code> calls whatever function it points to. Two smaller pieces of syntax appear below. <code>struct Shape;</code> is a <em>forward declaration</em>: it announces that a struct of that name exists, so <code>struct VTable</code> can mention pointers to it before its fields are given. And a struct is initialized with its field values in order inside braces, so <code>{ &amp;RECT, 2, 3 }</code> sets <code>vt</code>, <code>a</code> and <code>b</code>; an array of structs is a braced list of these.</p>
<pre data-label="C"><code>#include &lt;stdio.h&gt;

struct Shape;
struct VTable {
    double (*area)(struct Shape *self);
    const char *(*name)(struct Shape *self);
};
struct Shape {
    const struct VTable *vt;     /* every object starts with its class's table */
    double a, b;
};

double rect_area(struct Shape *s) { return s-&gt;a * s-&gt;b; }
const char *rect_name(struct Shape *s) { return "rectangle"; }
double tri_area(struct Shape *s) { return s-&gt;a * s-&gt;b / 2; }
const char *tri_name(struct Shape *s) { return "triangle"; }

const struct VTable RECT = { rect_area, rect_name };
const struct VTable TRI = { tri_area, tri_name };

double area_of(struct Shape *s) {
    return s-&gt;vt-&gt;area(s);       /* dynamic dispatch */
}

int main(void) {
    struct Shape shapes[] = { { &amp;RECT, 2, 3 }, { &amp;TRI, 4, 5 } };
    for (int i = 0; i &lt; 2; i++)
        printf("%s: %.1f\\n", shapes[i].vt-&gt;name(&amp;shapes[i]), area_of(&amp;shapes[i]));
    return 0;
}</code></pre>
<pre data-label="Output"><code>rectangle: 6.0
triangle: 10.0</code></pre>
<figure class="fig"><svg viewBox="0 0 470 170" width="470" role="img" aria-label="An object with fields vt, a and b. The vt field points to the RECT table, whose two entries point to the functions rect_area and rect_name.">
<g class="box"><rect x="20" y="40" width="90" height="30"/><rect x="20" y="70" width="90" height="30"/><rect x="20" y="100" width="90" height="30"/>
<rect x="190" y="40" width="100" height="30"/><rect x="190" y="70" width="100" height="30"/>
<rect x="350" y="30" width="105" height="30"/><rect x="350" y="80" width="105" height="30"/></g>
<g class="text"><text x="65" y="60" text-anchor="middle" class="code">vt</text><text x="65" y="90" text-anchor="middle" class="code">a = 2</text><text x="65" y="120" text-anchor="middle" class="code">b = 3</text>
<text x="240" y="60" text-anchor="middle" class="code">area</text><text x="240" y="90" text-anchor="middle" class="code">name</text>
<text x="402" y="50" text-anchor="middle" class="code">rect_area</text><text x="402" y="100" text-anchor="middle" class="code">rect_name</text>
<text x="65" y="30" text-anchor="middle" class="m">object</text><text x="240" y="30" text-anchor="middle" class="m">RECT vtable</text><text x="402" y="150" text-anchor="middle" class="m">machine code</text></g>
<g class="ln"><line x1="110" y1="55" x2="190" y2="55"/><line x1="290" y1="55" x2="350" y2="45"/><line x1="290" y1="85" x2="350" y2="95"/></g>
</svg><figcaption>Dispatch through a vtable: the object points to its class's table, and the table's entries point to the methods' code. Every rectangle shares the one table.</figcaption></figure>
<p>GCC compiles <code>area_of</code> (with <code>-O1</code>) to exactly the three steps:</p>
<pre data-label="x86-64"><code>area_of:
        subq    $8, %rsp          # keep the stack 16-byte aligned for the call
        movq    (%rdi), %rax      # rax = s-&gt;vt   (the first field, at offset 0)
        call    *(%rax)           # call the address stored at vt[0], area
        addq    $8, %rsp
        ret</code></pre>
<p>The argument <code>s</code> arrives in <code>%rdi</code> (CS 210 Lesson 6's calling convention) and stays there as the first argument of the call. <code>call *(%rax)</code> is an <em>indirect</em> call: the target is read from memory. A C++ compiler generates the same code for a call to a <code>virtual</code> function. So a virtual call costs two loads and an indirect jump, roughly as fast as a normal call when the processor predicts the target correctly; the larger cost is that the compiler usually can't inline it, because it doesn't know which function will run.</p>
`,
      terms: [
        ["Location", "A place in the store that holds a value; a mutable variable's name is bound to one."],
        ["Store", "The mapping from locations to their current values; assignment changes it."],
        ["Store-passing interpreter", "An interpreter that takes the store as input and returns the updated store with each value."],
        ["Alias", "One of two or more names for the same location or object."],
        ["Call-by-value", "Passing a copy of the argument's value in a new location."],
        ["Call-by-reference", "Making the parameter an alias for the caller's variable, so assignments to it change the caller's variable."],
        ["Call-by-sharing", "Call-by-value where the values are references to objects (Python, and Java for objects): the reference is copied, so mutations are shared but rebinding the parameter is not."],
        ["Call-by-name", "Passing the argument unevaluated and re-evaluating it at each use of the parameter."],
        ["Call-by-need", "Call-by-name with memoization: the argument is evaluated at its first use, at most once."],
        ["Dynamic dispatch", "Choosing which method to run at run time, from the class of the receiving object."],
        ["Open recursion", "Calls made through self are dispatched from the object's actual class, so they can reach subclass methods."],
        ["Method resolution order", "The order in which Python searches a class and its ancestors for an attribute (cls.__mro__)."],
        ["Virtual method table (vtable)", "A per-class array of pointers to method code, used to make dynamic dispatch an indexed indirect call."],
        ["Function pointer", "In C, a value holding the address of a function's code, through which it can be called."]
      ],
      quiz: [
        { q: "In the store-passing interpreter, what does (let (x 2) (begin (set x (* x x)) (set x (+ x 1)) x)) return?", choices: ["2", "4", "5", "9"], answer: 2, why: "x becomes 2 · 2 = 4, then 4 + 1 = 5." },
        { q: "Why must the store be threaded from the left operand into the right one?", choices: ["For speed", "So that the right operand sees the left operand's assignments: the order of evaluation is part of the meaning", "Because dicts are immutable", "It needn't be"], answer: 1, why: "With mutation, evaluating the operands in a different order can give a different result." },
        { q: "A C++ function void inc(int &n) { n = n + 1; } is called as inc(x) with x = 5. What is x afterwards?", choices: ["5", "6", "Undefined", "0"], answer: 1, why: "& makes n a reference: an alias for x's location." },
        { q: "def f(xs): xs = xs + [1] is called with a = [0]. What is a afterwards in Python?", choices: ["[0, 1]", "[0]", "[1]", "An error"], answer: 1, why: "xs + [1] builds a new list and rebinds only the local name; the caller's list is unchanged." },
        { q: "Under call-by-name, a function that uses its parameter three times is called with an argument that prints 'hi' and returns 1. How many times is 'hi' printed?", choices: ["0", "1", "3", "It depends on the order"], answer: 2, why: "Call-by-name re-evaluates the argument at each use; call-by-need would print it once." },
        { q: "A virtual method call in C++ compiles to which sequence?", choices: ["A direct call to a fixed address", "Load the object's vtable pointer, load the method's entry, call through it", "A dictionary lookup by method name", "A system call"], answer: 1, why: "The method's index in the vtable is known at compile time; only the table depends on the object." }
      ],
      practice: [
        {
          q: `<p>Trace <code>(let (x 1) (let (y 2) (begin (set x (+ x y)) (set y (* x y)) (+ x y))))</code> in the store-passing interpreter, writing the environment and the store after each step.</p>`,
          a: `<p>The outer <code>let</code> gives env {x: 0} and store {0: 1}; the inner one env {x: 0, y: 1} and store {0: 1, 1: 2}. <code>(set x (+ x y))</code> computes 3 and makes the store {0: 3, 1: 2}. <code>(set y (* x y))</code> reads x = 3 from the new store and computes 6: {0: 3, 1: 6}. <code>(+ x y)</code> is 9.</p><pre><code>print(run("(let (x 1) (let (y 2) (begin (set x (+ x y)) (set y (* x y)) (+ x y))))"))   # 9</code></pre>`
        },
        {
          q: `<p>Add <code>(while c body)</code> to the store-passing interpreter: evaluate <code>c</code>; if it is true, evaluate <code>body</code> and repeat; return 0 when the loop ends. Use it to compute 10! with a loop.</p>`,
          a: `<pre><code>base_ev = ev

def ev(e, env, store):
    match e:
        case ["while", test, body]:
            while True:
                c, store = ev(test, env, store)
                if not c:
                    return 0, store
                _, store = ev(body, env, store)
        case _:
            return base_ev(e, env, store)

print(run("""
(let (n 10) (let (acc 1)
  (begin
    (while (&lt; 0 n) (begin (set acc (* acc n)) (set n (- n 1))))
    acc)))"""))   # 3628800</code></pre><p>The store flows around the loop: each test sees the assignments made by the previous iteration's body. A Python <code>while</code> loop is used rather than recursion so that long loops don't hit the recursion limit (Lesson 4). As in Lesson 5's practice, the old <code>ev</code>'s recursive calls find the new <code>ev</code> by its global name, so a <code>while</code> nested inside a <code>let</code> works.</p>`
        },
        {
          q: `<p>Consider <code>def f(a, b): a = a + 1; return a + b</code> called as <code>f(x, x)</code> with <code>x = 10</code>. What does it return, and what is <code>x</code> afterwards, under call-by-value, call-by-reference, and call-by-name?</p>`,
          a: `<p><strong>By value:</strong> <code>a</code> and <code>b</code> are separate copies of 10; <code>a</code> becomes 11; it returns 11 + 10 = 21, and <code>x</code> stays 10. <strong>By reference:</strong> <code>a</code> and <code>b</code> are both aliases of <code>x</code>; <code>a = a + 1</code> makes <code>x</code> 11, so <code>b</code> is 11 too; it returns 22, and <code>x</code> is 11. <strong>By name:</strong> each use of <code>a</code> or <code>b</code> re-evaluates the expression <code>x</code> in the caller's environment, and assigning to <code>a</code> assigns to <code>x</code> (the argument expression is a variable); same as by reference here: 22, with <code>x</code> = 11. Aliasing made one assignment visible through two names.</p>`
        },
        {
          q: `<p>Add a <code>Circle</code> to the C vtable example: what must you write, and what doesn't change? Why can't the C compiler inline <code>s-&gt;vt-&gt;area(s)</code> in <code>area_of</code>?</p>`,
          a: `<p>Write <code>circle_area</code> (for example <code>3.14159 * s-&gt;a * s-&gt;a</code>, using <code>a</code> as the radius) and <code>circle_name</code>, and one table <code>const struct VTable CIRCLE = { circle_area, circle_name };</code>; create circles as <code>{ &amp;CIRCLE, 1.5, 0 }</code>. <code>area_of</code>, and every other function that uses shapes, stays the same, and needn't even be recompiled: that is the point of dynamic dispatch. The compiler can't inline the call because the function it reaches depends on which table the object points to, which is known only at run time; it could be a function that didn't exist when <code>area_of</code> was compiled.</p>`
        }
      ],
      sources: ["plai", "sicp", "eopl", "csapp", "kay93"]
    },
    {
      id: "pl8",
      title: "Memory management and language design",
      minutes: 90,
      summary: "Why values outlive function calls; manual memory and its bugs; reachability and roots; reference counting, cycles and what CPython does about them; mark-and-sweep and copying collection; Rust's ownership and borrowing, checked at compile time; and how such choices trade safety, control, speed and simplicity in real languages.",
      notes: `
<p>Lesson 7's store handed out a new location for every <code>let</code> and never took one back. A real program running for days would run out of memory that way. This lesson is about reclaiming memory: who decides that a value is no longer needed, and when. It is one of the choices that most shapes what a language is like to use.</p>

<h3>Stack and heap</h3>
<p>Some values have lifetimes that match function calls: a local variable lives exactly as long as its call, so it can live in the call's stack frame and disappear when the call returns (CS 210 Lesson 6). Other values outlive the call that created them: the list a function returns, a node added to a tree, or the environment captured by a closure. Lesson 3's <code>make_adder</code> returned a closure whose <code>n</code> must survive after <code>make_adder</code>'s frame is gone. Such values live in the <strong>heap</strong>, and something must eventually free them.</p>

<h3>Manual memory management</h3>
<p>In C the programmer decides: <code>malloc</code> reserves a block and <code>free</code> returns it (CS 210 Lesson 4). This is fast and predictable, and C's run time does nothing behind your back. But nothing checks you, and the mistakes are among the most damaging bugs in software:</p>
<ul>
<li>a <strong>memory leak</strong>: never freeing a block that is no longer used, so memory use grows until the program fails;</li>
<li>a <strong>use after free</strong>: using a block after freeing it, when the allocator may have given it to someone else (a <strong>dangling pointer</strong> is a pointer to freed memory);</li>
<li>a <strong>double free</strong>: freeing a block twice, which corrupts the allocator's records.</li>
</ul>
<p>An attacker who can make a program use freed memory can often arrange for it to contain data of their choosing, and from there take control of the program. This lesson's sidebar gives the numbers, and CS 380 shows such attacks.</p>
<p>The alternative is <strong>automatic memory management</strong>: the language run time frees a block once the program can no longer use it. "Can no longer use it" is undecidable in general (Rice's theorem again), so collectors use a safe approximation, <strong>reachability</strong>. The <strong>roots</strong> are the references the program can use directly: global variables, the local variables in every stack frame, and registers. An object is <strong>reachable</strong> if some chain of references leads to it from a root. An unreachable object can never be used again, because there is no way to name it, so it is <strong>garbage</strong> and can be freed. (The reverse doesn't hold: a reachable object that will never be used again, such as an entry in a cache nobody reads, is kept. That is how programs in garbage-collected languages still leak.)</p>

<h3>Reference counting</h3>
<p>The simplest automatic scheme keeps a count in every object of the references to it. Creating a reference increments the count; destroying or overwriting one decrements it; when the count reaches 0 the object is unreachable, so it is freed at once, and the references it held are destroyed in turn, which may free more objects. Here is a simulation, with objects named by strings:</p>
<pre><code>class RefHeap:
    def __init__(self):
        self.count = {}      # object -&gt; number of references to it
        self.refs = {}       # object -&gt; the objects it refers to

    def new(self, name):     # create an object, referenced by one variable
        self.count[name] = 1
        self.refs[name] = []

    def point(self, src, dst):
        self.refs[src].append(dst)
        self.count[dst] += 1

    def drop(self, name):    # destroy one reference to name
        self.count[name] -= 1
        if self.count[name] == 0:
            print("free", name)
            for child in self.refs.pop(name):
                self.drop(child)
            del self.count[name]

h = RefHeap()
h.new("A"); h.new("B"); h.new("C")
h.point("A", "B"); h.point("B", "C")   # A -&gt; B -&gt; C
h.drop("B"); h.drop("C")               # the variables naming B and C go away
h.drop("A")                            # prints free A, free B, free C</code></pre>
<p>Reference counting frees memory as soon as it becomes garbage, in small steps spread through the program, which makes its timing predictable: a file object closes its file the moment the last reference disappears. Its costs are an update on every reference assignment (expensive with threads, where the updates must be atomic), and one thing it can't do at all: free a <strong>cycle</strong>.</p>
<pre><code>h.new("X"); h.new("Y")
h.point("X", "Y"); h.point("Y", "X")   # X and Y refer to each other
h.drop("X"); h.drop("Y")               # no variable refers to either any more
print(h.count)                         # {'X': 1, 'Y': 1}</code></pre>
<p>X and Y are unreachable, but each still has a count of 1, from the other. Cycles are common: a doubly linked list, a tree whose nodes point to their parents, or a recursive closure that sits in its own environment (Lesson 3's <code>letrec</code>).</p>
<p>CPython uses reference counting, and you can watch it. <code>sys.getrefcount(x)</code> reports the count of <code>x</code>'s object, plus one for the reference held by the call's own argument. <code>weakref.finalize(obj, f, ...)</code> registers <code>f</code> to be called when <code>obj</code> is freed, without itself keeping <code>obj</code> alive (a <em>weak reference</em> doesn't count).</p>
<pre><code>import gc
import sys
import weakref

x = []
print(sys.getrefcount(x))   # 2: x, and the argument
y = x
print(sys.getrefcount(x))   # 3

class Node:
    def __init__(self, name):
        self.name = name
        self.other = None

def report(name):
    print("freed", name)

a = Node("a")
weakref.finalize(a, report, "a")
a = None                    # prints freed a, immediately

p, q = Node("p"), Node("q")
p.other, q.other = q, p     # a cycle
weakref.finalize(p, report, "p")
weakref.finalize(q, report, "q")
p = q = None                # nothing printed: the counts are still 1
found = gc.collect()        # prints freed p and freed q
print(found &gt;= 2)           # True</code></pre>
<p>(These counts are from CPython 3.12; other versions and implementations can differ.) For cycles, CPython adds a <strong>cycle collector</strong>, the <code>gc</code> module, which runs from time to time (or when <code>gc.collect()</code> is called) and finds groups of <em>container</em> objects that are referenced only from inside the group. A container is an object that can hold references to other objects, such as a list, dict, set or class instance; only containers can form a cycle, so numbers and strings are left to reference counting alone. <code>gc.collect()</code> returns the number of unreachable objects it found. Swift and Objective-C also count references, without a cycle collector, so programmers mark back-pointers as <code>weak</code>; Rust's <code>Rc</code> type does the same with <code>Weak</code>.</p>

<h3>Tracing collection: mark and sweep</h3>
<p>A <strong>tracing</strong> collector ignores counts and computes reachability directly, from time to time. The first garbage collector, in John McCarthy's Lisp (1960), was a <strong>mark-and-sweep</strong> collector:</p>
<ol>
<li><strong>Mark.</strong> Starting from the roots, follow every reference, depth-first or breadth-first (CS 201 Lesson 7), setting a mark bit on each object reached. Objects already marked aren't visited again, so cycles cause no trouble.</li>
<li><strong>Sweep.</strong> Walk through every object in the heap. Free each unmarked one (it is unreachable), and clear the mark on the others, ready for next time.</li>
</ol>
<p>Cycles of garbage are found like any other garbage, because nothing from the roots leads to them. The costs: marking takes time proportional to the live objects, sweeping time proportional to the whole heap, and, in the simple version, the program must stop while the collector runs (a <strong>stop-the-world pause</strong>). Freed blocks are left wherever they were, so free memory becomes <strong>fragmented</strong> into holes between live objects, and the allocator has to search for a hole that fits, like CS 210's first-fit allocator.</p>

<h3>Copying collection</h3>
<p>A <strong>copying collector</strong> divides the heap into two halves, from-space and to-space. The program allocates in from-space simply by advancing a pointer: the next object goes right after the last one, which is as cheap as allocation gets. When from-space is full, the collector copies every reachable object into to-space, packed together, and the halves swap roles. Whatever was left in from-space is garbage and is reclaimed all at once, without looking at it.</p>
<p>C. J. Cheney's algorithm (1970) does the copying breadth-first, using to-space itself as the queue. Two pointers move through to-space: <em>free</em>, where the next copy goes, and <em>scan</em>, the next copied object whose references haven't been updated yet.</p>
<ol>
<li>Copy each object a root refers to into to-space at <em>free</em>, and update the root to the new address.</li>
<li>While <em>scan</em> is behind <em>free</em>: for each reference in the object at <em>scan</em>, copy the referenced object (if it hasn't been copied already) and update the reference to its new address; then advance <em>scan</em> past the object.</li>
<li>When <em>scan</em> catches up with <em>free</em>, every reachable object has been copied and every reference updated.</li>
</ol>
<p>"If it hasn't been copied already" is handled with a <strong>forwarding address</strong>: when an object is copied, its old copy is overwritten with a note of its new address, so the second reference to reach it is simply redirected. This keeps shared objects shared and lets cycles be copied once. For example, with roots → A, A → B and C, B → A, and D unreachable: A is copied to address 0; scanning A copies B to 1 and C to 2; scanning B finds A already forwarded to 0; scanning C finds nothing; D is never touched. The cost is proportional to the live objects only, which is why copying wins when most objects are garbage, and the copy compacts memory, so there is no fragmentation. The price is that half the memory sits empty, and objects move, so the language must let the collector find and update every reference (which rules out C's freedom to treat pointers as integers).</p>
<p>Most objects die young: a temporary list, a string built for one message. This <em>generational hypothesis</em> leads to <strong>generational collectors</strong>, which allocate in a small nursery that is collected often by copying (cheap, since few objects survive) and promote survivors to an older generation collected rarely. Java's and .NET's collectors work this way, and modern collectors also run mostly <em>concurrently</em> with the program, to keep pauses to milliseconds.</p>

<h3>Ownership: Rust's compile-time answer</h3>
<p>Rust frees memory without counting references or tracing them, by checking at compile time that every heap value has exactly one owner, and freeing it when the owner goes away. Its rules:</p>
<ul>
<li>Each value has one <strong>owner</strong>, a variable. When the owner goes out of scope, the value is <em>dropped</em> (freed), at a point the compiler knows exactly.</li>
<li>Assigning or passing the value <strong>moves</strong> it: ownership passes to the new variable, and the old one can't be used any more. (Values of types that own no heap memory, such as integers, floats and booleans, are copied instead; a <code>Vec</code> or <code>String</code> owns heap memory, so it is moved.)</li>
<li>Code can <strong>borrow</strong> a value without owning it, through a reference: any number of shared references <code>&amp;T</code>, which can only read, or exactly one mutable reference <code>&amp;mut T</code>, never both at once. A reference can't outlive the value it borrows.</li>
</ul>
<p>Reading the Rust below: <code>let</code> declares a variable, which can't be reassigned or changed unless declared <code>let mut</code>; <code>i32</code> is a 32-bit signed integer; <code>Vec&lt;i32&gt;</code> is Rust's growable array (the dynamic array of CS 201 Lesson 2) with its elements on the heap, and <code>String::from("hi")</code> likewise builds a heap-allocated, growable string from a literal. A name ending in <code>!</code>, such as <code>vec![1, 2, 3]</code> (build a <code>Vec</code> with these elements) or <code>println!</code>, is a <em>macro</em>, expanded into ordinary code at compile time; <code>println!("{}", x)</code> prints <code>x</code> in place of <code>{}</code>, like Python's <code>format</code>. <code>v.iter().sum()</code> adds up the elements. A <em>trait</em> is a named set of operations that a type can declare it supports, like an interface; the <code>Copy</code> trait marks the types that are copied rather than moved on assignment.</p>
<pre data-label="Rust"><code>fn total(v: &amp;Vec&lt;i32&gt;) -&gt; i32 {
    v.iter().sum()
}

fn main() {
    let a = vec![1, 2, 3];
    let b = a;                      // ownership moves to b
    println!("{}", total(&amp;b));      // borrow b: fine
    println!("{}", a.len());        // error: a was moved
}</code></pre>
<pre data-label="Output"><code>error[E0382]: borrow of moved value: 'a'
 --&gt; own.rs:9:20
  |
6 |     let a = vec![1, 2, 3];
  |         - move occurs because 'a' has type 'Vec&lt;i32&gt;', which does not implement the 'Copy' trait
7 |     let b = a;                      // ownership moves to b
  |             - value moved here
8 |     println!("{}", total(&amp;b));      // borrow b: fine
9 |     println!("{}", a.len());        // error: a was moved
  |                    ^ value borrowed here after move</code></pre>
<p>(The compiler's messages are shortened here, and it writes names in backquotes where they are shown in quotes.) Because the vector has one owner, it is freed exactly once, when <code>b</code> goes out of scope: no leak, no double free. The borrowing rules prevent dangling references. Here a reference into a vector is kept while the vector is changed:</p>
<pre data-label="Rust"><code>fn main() {
    let mut v = vec![1, 2, 3];
    let first = &amp;v[0];
    v.push(4);
    println!("{}", first);
}</code></pre>
<pre data-label="Output"><code>error[E0502]: cannot borrow 'v' as mutable because it is also borrowed as immutable
 --&gt; borrow.rs:4:5
  |
3 |     let first = &amp;v[0];
  |                  - immutable borrow occurs here
4 |     v.push(4);
  |     ^^^^^^^^^ mutable borrow occurs here
5 |     println!("{}", first);
  |                    ----- immutable borrow later used here</code></pre>
<p>The compiler is right to object. <code>push</code> may find the vector's array full, allocate a bigger one and free the old one (the dynamic array of CS 201 Lesson 2), and then <code>first</code> would point into freed memory: a use after free, the C bug, caught before the program runs. The same rule, one writer or many readers, also means two threads can never write the same data at once without a lock, so Rust rules out <em>data races</em> (CS 310 Lesson 3) at compile time. Rust's checks are a type system in the sense of Lesson 5, conservative like all of them: some correct programs are rejected, and structures with shared or cyclic ownership, like a doubly linked list, need <code>Rc</code> (reference counting), or <code>unsafe</code> code that the programmer vouches for.</p>

<h3>Design is trade-offs</h3>
<p>Every lesson in this course has been a choice that a language designer must make, and none has a free answer:</p>
<table>
<tr><th>Choice</th><th>One end</th><th>The other end</th></tr>
<tr><td>Scope (Lesson 2)</td><td>Lexical: readable, compilable; needs closures</td><td>Dynamic: simple to implement; fragile</td></tr>
<tr><td>Evaluation (Lessons 3, 4, 7)</td><td>Strict: predictable cost and effects</td><td>Lazy: infinite structures, but space leaks and hidden order</td></tr>
<tr><td>Mutation (Lessons 4, 7)</td><td>Pure: easy reasoning and parallelism</td><td>Mutable: direct, efficient algorithms; aliasing bugs</td></tr>
<tr><td>Typing (Lessons 5, 6)</td><td>Static: errors found early; some good programs rejected</td><td>Dynamic: flexible; errors found when the line runs</td></tr>
<tr><td>Memory (Lesson 8)</td><td>Manual or ownership: control and no collector</td><td>Garbage collection: safety and convenience; pauses and memory overhead</td></tr>
</table>
<p>Languages are bundles of these choices made for a purpose. C (1972) chose control and a thin layer over the machine, for writing an operating system on small computers. Java (1995) chose static types, garbage collection and a virtual machine, for safe programs that run anywhere. Python (1991) chose dynamic typing and reference counting, for programs that are quick to write and easy to read. Haskell (1990) chose purity and laziness to study them. Rust (2015) chose ownership to get C's control with memory safety, at the price of a stricter compiler. When you meet a new language, ask the questions of this course: what are its values, how are names resolved, when are things evaluated, what do its types promise, and who frees the memory. The answers tell you most of what you need to know.</p>
`,
      terms: [
        ["Heap", "The region of memory for values whose lifetime isn't tied to a single function call."],
        ["Memory leak", "Memory that is no longer needed but never freed."],
        ["Use after free", "Using memory after it has been freed, through a dangling pointer."],
        ["Double free", "Freeing the same block twice, corrupting the allocator."],
        ["Roots", "The references a program can use directly: globals, local variables in stack frames, registers."],
        ["Reachable", "An object is reachable if a chain of references leads to it from a root; unreachable objects are garbage."],
        ["Reference counting", "Keeping a count of references to each object and freeing it when the count reaches zero."],
        ["Cycle collector", "CPython's gc module, which finds groups of objects referenced only from each other."],
        ["Weak reference", "A reference that doesn't keep its object alive or count toward its reference count."],
        ["Mark and sweep", "Tracing collection that marks everything reachable from the roots, then frees every unmarked object."],
        ["Copying collector", "Tracing collection that copies reachable objects into a fresh space, compacting them, and abandons the old space."],
        ["Forwarding address", "A note left in an object's old copy, giving its new address, so later references are redirected."],
        ["Generational collection", "Collecting young objects often and old ones rarely, because most objects die young."],
        ["Ownership", "Rust's rule that each value has one owner variable, and is freed when the owner goes out of scope."],
        ["Borrowing", "Using a value through a reference without owning it: many shared references or one mutable one."]
      ],
      quiz: [
        { q: "Why must Lesson 3's closures live on the heap rather than in a stack frame?", choices: ["Closures are large", "A closure can outlive the call that created it, as when make_adder returns one", "The stack is read-only", "Python requires it"], answer: 1, why: "The captured environment must survive after the creating function's frame is gone." },
        { q: "Objects X and Y refer only to each other, and nothing else refers to either. What happens under pure reference counting?", choices: ["Both are freed at once", "Neither is ever freed: each has a count of 1", "Only X is freed", "The program crashes"], answer: 1, why: "Each count stays at 1 because of the other object; reference counting can't see that the pair is unreachable." },
        { q: "In a mark-and-sweep collector, what is the cost of the sweep phase proportional to?", choices: ["The number of live objects", "The size of the whole heap", "The number of roots", "The number of cycles"], answer: 1, why: "Sweeping visits every object in the heap to free the unmarked ones." },
        { q: "What is the main advantage of a copying collector over mark-and-sweep?", choices: ["It uses less memory", "Its cost depends only on live objects, and it compacts the heap so allocation is a pointer bump", "It never moves objects", "It needs no roots"], answer: 1, why: "Garbage is never visited, and survivors are packed together; the price is half the memory." },
        { q: "In Cheney's algorithm, what does a forwarding address prevent?", choices: ["Copying garbage", "Copying an object twice when it is reached by two references (or a cycle)", "Stack overflow", "Fragmentation of to-space"], answer: 1, why: "The second reference to reach an already-copied object finds the forwarding address and is redirected to the copy." },
        { q: "Why does Rust reject taking &v[0] and then calling v.push(4) while the reference is still used?", choices: ["push is slow", "push needs a mutable borrow while a shared borrow is alive, and could free the memory the reference points to", "Vectors can't hold integers", "References must be mutable"], answer: 1, why: "If push reallocates, the reference would dangle; the borrow rules prevent this at compile time." }
      ],
      practice: [
        {
          q: `<p>Using <code>RefHeap</code>, build a doubly linked list of three nodes N1, N2, N3 (each points to the next and to the previous). As in the notes' A → B → C example, <code>new</code> gives each node one variable; after adding the pointers, drop the variables naming N2 and N3, so that only the variable naming N1 remains. Then drop that variable too. What is freed, and why? How would weak back-pointers change the result?</p>`,
          a: `<pre><code>h = RefHeap()
for n in ["N1", "N2", "N3"]:
    h.new(n)
h.point("N1", "N2"); h.point("N2", "N3")    # next pointers
h.point("N2", "N1"); h.point("N3", "N2")    # prev pointers
h.drop("N2"); h.drop("N3")                  # only the variable naming N1 remains
h.drop("N1")
print(h.count)   # {'N1': 1, 'N2': 2, 'N3': 1}</code></pre><p>Nothing is freed. N1's count falls to 1, from N2's back-pointer; N2 still has 2 (N1's next pointer and N3's back-pointer), and N3 has 1 (N2's next pointer). Every node is kept alive by a neighbour, so the whole list leaks. If back-pointers were weak (not counted), N1 would reach 0 when the variable is dropped and be freed, which drops N2 to 0, and so on down the list.</p>`
        },
        {
          q: `<p>A heap has objects A to F with references A → B, B → C, C → A, D → E, E → F, F → E, and the only root refers to D. Which objects does mark-and-sweep free, and which would pure reference counting free (assuming no variables refer to them other than the root)?</p>`,
          a: `<p>Marking from D reaches D, E and F; the sweep frees A, B and C. Reference counting frees nothing: A, B and C form a cycle, so each has count 1, and D, E, F are all reachable. Had the root been dropped, reference counting would free D (count 0) but leave the cycle E ⇄ F, and A, B, C as well.</p>`
        },
        {
          q: `<p>Run Cheney's algorithm on: root → P; P refers to Q and R (in that order); Q refers to R; R refers to P; S refers to Q. Give each object's new address (to-space starts at 0, one address per object), and the order in which <em>scan</em> processes them.</p>`,
          a: `<p>Copy P to 0 (root updated). Scan P (scan = 0): Q isn't copied, so copy it to 1; R to 2; P's references become 1 and 2. Scan Q (1): R already has forwarding address 2, so Q's reference becomes 2. Scan R (2): P has forwarding address 0. <em>scan</em> = 3 = <em>free</em>: done. New addresses P = 0, Q = 1, R = 2; S is never copied, because nothing reachable refers to it. Scanning order P, Q, R, which is breadth-first order from the root.</p>`
        },
        {
          q: `<p>For each Rust snippet inside <code>main</code>, say whether it compiles, and why: (a) <code>let s = String::from("hi"); let t = s; println!("{}", t);</code> (b) <code>let n = 5; let m = n; println!("{} {}", n, m);</code> (c) <code>let mut v = vec![1]; let r = &amp;mut v; let q = &amp;mut v; r.push(2);</code></p>`,
          a: `<p>(a) Compiles: ownership moves to <code>t</code>, and only <code>t</code> is used afterwards. (b) Compiles: integers are <code>Copy</code> types, so <code>let m = n</code> copies and both stay usable. (c) Doesn't compile (error E0499, "cannot borrow <code>v</code> as mutable more than once at a time"): <code>r</code> is still used after <code>q</code> is created, so two mutable borrows would be alive at once. Remove the last line and it compiles, because <code>r</code>'s borrow then ends before <code>q</code>'s begins.</p>`
        }
      ],
      sources: ["csapp", "mccarthy60", "cheney70", "pygc", "rustbook", "gchandbook"]
    }
  ]
});

CSA.addAsides("cs360", {
  pl2: [
    { kind: "history", title: "Lisp's accidental dynamic scope", html: `<p>John McCarthy's first Lisp interpreter (1958–60) looked up variables in a list of name–value pairs that grew as functions were called, so a function's free variables found whatever binding its callers had made most recently: dynamic scope, although nobody had a name for it yet. The problem surfaced when James Slagle wrote a function that took another function as an argument, and it returned the wrong answers, because the argument's free variables were captured by Slagle's own local names. McCarthy later wrote that he regarded this as a bug and expected it to be fixed; in modern terms, he wanted lexical scope and had built dynamic scope. Steve Russell's fix, the FUNARG device, made a function argument carry the environment in which it was written, which is a closure in all but name (Lesson 3). Lisps kept dynamic variables for years afterwards, partly because they were cheap to implement. Scheme, designed by Gerald Sussman and Guy Steele in 1975, was the first Lisp dialect with lexical scope throughout, and Common Lisp (1984) made lexical scope the default, keeping dynamic scope only for variables declared "special".</p>`, sources: ["mccarthy79"] }
  ],
  pl3: [
    { kind: "history", title: "Landin and the closure", html: `<p>Peter Landin, a British computer scientist, showed in the early 1960s that the lambda calculus could serve as the core of real programming languages. His 1964 paper "The Mechanical Evaluation of Expressions" described a machine for evaluating such expressions, the SECD machine (named for its four registers: stack, environment, control and dump), and introduced the word <em>closure</em> for the value it builds from a lambda expression: the expression together with the environment that gives its free variables their meaning. The same paper coined the term <em>syntactic sugar</em>, which Lesson 1 used for features such as <code>x += 1</code>: notation that can be translated into a smaller core language. In 1966, "The Next 700 Programming Languages" sketched ISWIM ("If you See What I Mean"), a language family that was never implemented but shaped ML and Haskell; it also proposed the "off-side rule", using indentation to group code, which Python and Haskell follow.</p>`, sources: ["landin64"] }
  ],
  pl4: [
    { kind: "history", title: "The billion-dollar mistake", html: `<p>In 1965 Tony Hoare was designing ALGOL W, one of the first languages with typed references to records. He added a special <em>null</em> reference that refers to nothing. In a 2009 talk he called it his "billion-dollar mistake": "I couldn't resist the temptation to put in a null reference, simply because it was so easy to implement." Because null belonged to every reference type, the type checker couldn't tell a reference that might be null from one that couldn't, and every use of a reference became a possible crash: C's segmentation faults on NULL, Java's <code>NullPointerException</code>, Python's <code>'NoneType' object has no attribute</code>. The option types of this lesson are the remedy. When "no value" is a separate constructor, the type says whether a value can be missing, and the compiler makes the caller deal with it. OCaml and Haskell had this from the start; Rust has no null at all, only <code>Option</code>; Swift and Kotlin made references non-null by default; and mypy treats <code>int | None</code> as a different type from <code>int</code>.</p>`, sources: ["hoare09"] }
  ],
  pl8: [
    { kind: "ethics", title: "Memory safety is a security decision", html: `<p>In 2019 Microsoft's security response team reported that about 70% of the vulnerabilities it assigned a CVE (a public identifier for a security flaw) each year were memory-safety issues: buffer overflows, use after free and the like, mostly in code written in C and C++. The proportion had stayed about the same for over a decade despite training, code review, sanitizers (compiler options, such as GCC's <code>-fsanitize=address</code>, that add checks to a program so that a bad memory access stops it with a report instead of silently corrupting memory) and fuzzing (running a program on huge numbers of random or mutated inputs to find ones that crash it), because the language leaves every one of these mistakes possible. The figure changed the debate about language choice from one of taste and performance to one of safety. Microsoft, Google and others began writing new systems code in memory-safe languages, Rust in particular, and governments have since urged software makers to do the same. The questions are partly ethical. Who bears the cost when a library written in an unsafe language is exploited: its users, who never chose the language? When is it responsible to keep extending a large C++ code base, and who pays for rewriting it? Choosing a language is choosing which classes of bugs your users will be exposed to.</p>`, sources: ["msrc19"] }
  ]
});
