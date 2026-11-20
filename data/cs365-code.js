/* Auto-graded programming problems for CS 365 Compilers, by lesson. Generated from a Python spec,
   so every string is JSON. Together the problems build the Mini compiler: tokens are tuples, ASTs are
   the nested tuples of Lesson 2, bytecode is Lesson 4's tuples and TAC is Lesson 5's. */
CSA.addCode("cs365", {
 "cp1": [
  {
   "id": "mini_lexer",
   "title": "The Mini lexer",
   "prompt": "<p>Write <code>tokenize(src)</code>, the complete lexer for Mini. It returns a list of tokens, each a tuple <code>(kind, text, line, col)</code>, ending with one <code>(\"eof\", \"\", line, col)</code> token. Lines and columns count from 1; a tab counts as one column.</p>\n<ul>\n<li>Numbers: one or more ASCII digits <code>0</code>–<code>9</code>, kind <code>\"num\"</code>, text as written (<code>\"007\"</code> stays <code>\"007\"</code>).</li>\n<li>Names: an ASCII letter or <code>_</code>, then ASCII letters, digits or <code>_</code>, kind <code>\"name\"</code>. The keywords <code>fun var if else while return print true false int bool</code> have their own text as their kind, as do the operators <code>&lt;= &gt;= == != &amp;&amp; ||</code> and <code>+ - * / % ! &lt; &gt; = ( ) { } , ; :</code>.</li>\n<li>Maximal munch everywhere: <code>iffy</code> is one name, <code>&lt;=</code> one token, and <code>12ab</code> is the number <code>12</code> followed by the name <code>ab</code>.</li>\n<li>Skip spaces, tabs, carriage returns (<code>\"\\r\"</code>) and newlines, and comments from <code>//</code> to the end of the line.</li>\n<li>The <code>eof</code> token's position is just after the last character: for <code>\"ab\"</code> it is (1, 3), and for <code>\"a\\n\"</code> it is (2, 1).</li>\n<li>Any other character (a lone <code>&amp;</code> or <code>|</code>, <code>#</code>, a non-ASCII letter such as <code>é</code>) raises <code>LexError</code> (an exception class defined in the starter) with a message that begins <code>line:col:</code>, for example <code>1:7: unexpected character '&amp;'</code>.</li>\n</ul>",
   "starter": "class LexError(Exception):\n    pass\n\ndef tokenize(src):\n    pass\n",
   "hint": "<p>Start from the lexer in the notes and add two counters, <code>line</code> and <code>col</code>. Record a token's position <em>before</em> advancing past it. Every time you move past a character, add 1 to <code>col</code>, except for a newline, which adds 1 to <code>line</code> and resets <code>col</code> to 1. Test for <code>//</code> before testing for a single <code>/</code>.</p>",
   "solution": "class LexError(Exception):\n    pass\n\nKEYWORDS = {\"fun\", \"var\", \"if\", \"else\", \"while\", \"return\", \"print\", \"true\", \"false\", \"int\", \"bool\"}\nTWO = {\"<=\", \">=\", \"==\", \"!=\", \"&&\", \"||\"}\nONE = set(\"+-*/%!<>=(){},;:\")\nDIGITS = set(\"0123456789\")\nLETTERS = set(\"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_\")\n\ndef tokenize(src):\n    tokens, i, line, col = [], 0, 1, 1\n    while i < len(src):\n        c = src[i]\n        if c == \"\\n\":\n            i += 1\n            line += 1\n            col = 1\n        elif c in \" \\t\\r\":\n            i += 1\n            col += 1\n        elif src.startswith(\"//\", i):\n            while i < len(src) and src[i] != \"\\n\":\n                i += 1\n                col += 1\n        elif c in DIGITS or c in LETTERS:\n            j = i\n            ok = DIGITS if c in DIGITS else DIGITS | LETTERS\n            while j < len(src) and src[j] in ok:\n                j += 1\n            text = src[i:j]\n            kind = \"num\" if c in DIGITS else (text if text in KEYWORDS else \"name\")\n            tokens.append((kind, text, line, col))\n            col += j - i\n            i = j\n        elif src[i:i + 2] in TWO:\n            tokens.append((src[i:i + 2], src[i:i + 2], line, col))\n            i += 2\n            col += 2\n        elif c in ONE:\n            tokens.append((c, c, line, col))\n            i += 1\n            col += 1\n        else:\n            raise LexError(f\"{line}:{col}: unexpected character {c!r}\")\n    tokens.append((\"eof\", \"\", line, col))\n    return tokens\n",
   "tests": [
    {
     "label": "if x<=10 { y = y+1; }",
     "call": "[t[:2] for t in tokenize('if x<=10 { y = y+1; }')]",
     "expect": "[('if', 'if'), ('name', 'x'), ('<=', '<='), ('num', '10'), ('{', '{'), ('name', 'y'), ('=', '='), ('name', 'y'), ('+', '+'), ('num', '1'), (';', ';'), ('}', '}'), ('eof', '')]"
    },
    {
     "label": "Positions on one line",
     "call": "tokenize('var x2: bool')",
     "expect": "[('var', 'var', 1, 1), ('name', 'x2', 1, 5), (':', ':', 1, 7), ('bool', 'bool', 1, 9), ('eof', '', 1, 13)]"
    },
    {
     "label": "Keywords and names",
     "call": "[t[0] for t in tokenize('iffy if whilex while _int int print printer')]",
     "expect": "['name', 'if', 'name', 'while', 'name', 'int', 'print', 'name', 'eof']"
    },
    {
     "label": "Maximal munch on operators",
     "call": "[t[1] for t in tokenize('a<=b==c!=d&&e||!f<g>h=i>=j')]",
     "expect": "['a', '<=', 'b', '==', 'c', '!=', 'd', '&&', 'e', '||', '!', 'f', '<', 'g', '>', 'h', '=', 'i', '>=', 'j', '']"
    },
    {
     "label": "Numbers then names",
     "call": "tokenize('12ab 007')",
     "expect": "[('num', '12', 1, 1), ('name', 'ab', 1, 3), ('num', '007', 1, 6), ('eof', '', 1, 9)]"
    },
    {
     "label": "Lines, tabs and comments",
     "call": "tokenize('fun // a comment\\n\\tx = 1; // end\\n  }')",
     "expect": "[('fun', 'fun', 1, 1), ('name', 'x', 2, 2), ('=', '=', 2, 4), ('num', '1', 2, 6), (';', ';', 2, 7), ('}', '}', 3, 3), ('eof', '', 3, 4)]"
    },
    {
     "label": "Division is not a comment",
     "call": "[t[1] for t in tokenize('a/b//c')]",
     "expect": "['a', '/', 'b', '']"
    },
    {
     "label": "Empty input and eof positions",
     "type": "assert",
     "code": "assert tokenize('') == [('eof', '', 1, 1)], tokenize('')\nassert tokenize('ab')[-1] == ('eof', '', 1, 3), tokenize('ab')\nassert tokenize('a\\n')[-1] == ('eof', '', 2, 1), tokenize('a\\n')\nassert tokenize('x // no newline at the end') == [('name', 'x', 1, 1), ('eof', '', 1, 27)], tokenize('x // no newline at the end')\n"
    },
    {
     "label": "Carriage returns are whitespace",
     "call": "tokenize('a\\r\\nb')",
     "expect": "[('name', 'a', 1, 1), ('name', 'b', 2, 1), ('eof', '', 2, 2)]"
    },
    {
     "label": "A lone & is an error at 1:7",
     "type": "assert",
     "code": "try:\n    tokenize('x = 1 & 2')\nexcept LexError as e:\n    assert str(e).startswith('1:7:'), \"message should start with 1:7:: \" + str(e)\nelse:\n    assert False, \"no LexError raised for 'x = 1 & 2'\"\n"
    },
    {
     "label": "Errors on later lines",
     "type": "assert",
     "code": "try:\n    tokenize('fun f() {\\n  return a | b;\\n}')\nexcept LexError as e:\n    assert str(e).startswith('2:12:'), \"message should start with 2:12:: \" + str(e)\nelse:\n    assert False, \"no LexError raised for 'fun f() {\\n  return a | b;\\n}'\"\n\ntry:\n    tokenize('x\\n\\n  #')\nexcept LexError as e:\n    assert str(e).startswith('3:3:'), \"message should start with 3:3:: \" + str(e)\nelse:\n    assert False, \"no LexError raised for 'x\\n\\n  #'\"\n"
    },
    {
     "label": "Non-ASCII letters are errors",
     "type": "assert",
     "code": "try:\n    tokenize('var café: int')\nexcept LexError as e:\n    assert str(e).startswith('1:8:'), \"message should start with 1:8:: \" + str(e)\nelse:\n    assert False, \"no LexError raised for 'var café: int'\"\n",
     "hidden": true
    },
    {
     "label": "A whole function",
     "call": "len(tokenize('fun gcd(a: int, b: int): int {\\n  while b != 0 { var t: int = a % b; a = b; b = t; }\\n  return a;\\n}'))",
     "expect": "42",
     "hidden": true
    }
   ]
  },
  {
   "id": "lexer_generator",
   "title": "A lexer generator",
   "prompt": "<p>A lexer generator builds a lexer from a list of rules. Write <code>make_lexer(rules)</code>, where <code>rules</code> is a list of pairs <code>(kind, pattern)</code>: <code>kind</code> is a string, or <code>None</code> for text to skip (such as whitespace), and <code>pattern</code> is a Python regular expression. It returns a function <code>lex(text)</code> that returns the list of <code>(kind, lexeme)</code> pairs for <code>text</code> (no end-of-input token), following the two rules of the notes:</p>\n<ul>\n<li><strong>Maximal munch:</strong> at each position, the token is the <em>longest</em> non-empty match of any rule's pattern there. (Python's <code>|</code> takes the first alternative that matches, not the longest, so don't simply join the patterns.)</li>\n<li><strong>Priority:</strong> if several rules give the same longest match, the earliest rule in the list wins.</li>\n</ul>\n<p>Matches of length zero don't count. If no rule matches a non-empty prefix at index <code>i</code>, raise <code>LexError</code> (defined in the starter) with the message <code>no token at index i</code> (for example <code>no token at index 4</code>). Compile each pattern once, in <code>make_lexer</code>, with <code>re.compile</code>; <code>pattern.match(text, i)</code> tries to match starting at index <code>i</code>.</p>",
   "starter": "import re\n\nclass LexError(Exception):\n    pass\n\ndef make_lexer(rules):\n    def lex(text):\n        pass\n    return lex\n",
   "hint": "<p>In <code>lex</code>, loop while <code>i &lt; len(text)</code>. Try every compiled pattern at <code>i</code>, and keep the best match: a later rule replaces the best only if its match is strictly longer, which makes earlier rules win ties. Then emit the token unless its kind is <code>None</code>, and set <code>i</code> to the end of the match.</p>",
   "solution": "import re\n\nclass LexError(Exception):\n    pass\n\ndef make_lexer(rules):\n    compiled = [(kind, re.compile(p)) for kind, p in rules]\n    def lex(text):\n        out, i = [], 0\n        while i < len(text):\n            best_kind, best_end = None, i\n            for kind, pat in compiled:\n                m = pat.match(text, i)\n                if m and m.end() > best_end:\n                    best_kind, best_end = kind, m.end()\n            if best_end == i:\n                raise LexError(f\"no token at index {i}\")\n            if best_kind is not None:\n                out.append((best_kind, text[i:best_end]))\n            i = best_end\n        return out\n    return lex\n",
   "tests": [
    {
     "label": "Keywords beat names on ties",
     "type": "assert",
     "code": "lex = make_lexer([(\"if\", \"if\"), (\"name\", \"[a-z]+\"), (None, \" +\")])\nassert lex(\"if iffy fi\") == [(\"if\", \"if\"), (\"name\", \"iffy\"), (\"name\", \"fi\")], lex(\"if iffy fi\")\n"
    },
    {
     "label": "Rule order decides ties",
     "type": "assert",
     "code": "lex = make_lexer([(\"name\", \"[a-z]+\"), (\"if\", \"if\"), (None, \" +\")])\nassert lex(\"if\") == [(\"name\", \"if\")], lex(\"if\")\n"
    },
    {
     "label": "Longest match, not first alternative",
     "type": "assert",
     "code": "lex = make_lexer([(\"lt\", \"<\"), (\"le\", \"<=\"), (\"assign\", \"=\"), (\"eq\", \"==\")])\nassert lex(\"<=<===\") == [(\"le\", \"<=\"), (\"le\", \"<=\"), (\"eq\", \"==\")], lex(\"<=<===\")\n"
    },
    {
     "label": "Numbers with and without a fraction",
     "type": "assert",
     "code": "lex = make_lexer([(\"float\", r\"[0-9]+\\.[0-9]+\"), (\"int\", r\"[0-9]+\"), (\"dot\", r\"\\.\"), (\"name\", \"[a-z]+\"), (None, r\"\\s+\")])\nassert lex(\"3.14 3.x 42\") == [(\"float\", \"3.14\"), (\"int\", \"3\"), (\"dot\", \".\"), (\"name\", \"x\"), (\"int\", \"42\")], lex(\"3.14 3.x 42\")\n"
    },
    {
     "label": "Skipped rules and comments",
     "type": "assert",
     "code": "lex = make_lexer([(None, r\"[ \\t\\n]+\"), (None, r\"#[^\\n]*\"), (\"num\", \"[0-9]+\"), (\"op\", r\"[-+*/]\")])\nassert lex(\"1 + 2 # a comment\\n* 3\") == [(\"num\", \"1\"), (\"op\", \"+\"), (\"num\", \"2\"), (\"op\", \"*\"), (\"num\", \"3\")], lex(\"1 + 2 # a comment\\n* 3\")\nassert lex(\"\") == []\n"
    },
    {
     "label": "Empty matches don't count",
     "type": "assert",
     "code": "lex = make_lexer([(\"as\", \"a*\"), (\"b\", \"b\")])\nassert lex(\"aab\") == [(\"as\", \"aa\"), (\"b\", \"b\")], lex(\"aab\")\nassert lex(\"b\") == [(\"b\", \"b\")], lex(\"b\")\n"
    },
    {
     "label": "No token raises LexError",
     "type": "assert",
     "code": "lex = make_lexer([(\"name\", \"[a-z]+\"), (None, \" \")])\ntry:\n    lex(\"ab c?d\")\nexcept LexError as e:\n    assert str(e) == \"no token at index 4\", str(e)\nelse:\n    assert False, \"no LexError raised\"\n"
    },
    {
     "label": "Patterns are compiled once",
     "type": "assert",
     "code": "import re\ncalls = []\nreal = re.compile\ndef counting(p, *a):\n    calls.append(p)\n    return real(p, *a)\nre.compile = counting\ntry:\n    lex = make_lexer([(\"name\", \"[a-z]+\"), (None, \" +\")])\n    before = len(calls)\n    for _ in range(20):\n        lex(\"a b c\")\n    assert len(calls) == before, \"re.compile was called while lexing\"\nfinally:\n    re.compile = real\n",
     "hidden": true
    },
    {
     "label": "Mini's operators",
     "type": "assert",
     "code": "ops = [\"<=\", \">=\", \"==\", \"!=\", \"&&\", r\"\\|\\|\", \"<\", \">\", \"=\", \"!\", r\"\\+\", \"-\", r\"\\*\", \"/\", \"%\", r\"\\(\", r\"\\)\", \"{\", \"}\", \",\", \";\", \":\"]\nrules = [(\"kw\", \"fun|var|if|else|while|return|print|true|false|int|bool\"), (\"name\", \"[A-Za-z_][A-Za-z0-9_]*\"), (\"num\", \"[0-9]+\")] + [(\"op\", o) for o in ops] + [(None, r\"\\s+\")]\nlex = make_lexer(rules)\ngot = lex(\"while whilex != 0 { x=x+1; }\")\nassert got == [(\"kw\", \"while\"), (\"name\", \"whilex\"), (\"op\", \"!=\"), (\"num\", \"0\"), (\"op\", \"{\"), (\"name\", \"x\"), (\"op\", \"=\"), (\"name\", \"x\"), (\"op\", \"+\"), (\"num\", \"1\"), (\"op\", \";\"), (\"op\", \"}\")], got\n",
     "hidden": true
    }
   ]
  }
 ],
 "cp2": [
  {
   "id": "precedence_climbing",
   "title": "Precedence climbing with any operator table",
   "prompt": "<p>Write <code>parse_expression(text, binary)</code>, a precedence-climbing parser for expressions whose binary operators are given by a table: <code>binary</code> maps each operator to <code>(precedence, associativity)</code>, where a larger precedence binds tighter and associativity is <code>\"left\"</code> or <code>\"right\"</code>. For Mini, <code>binary</code> would be <code>{\"||\": (1, \"left\"), \"&amp;&amp;\": (2, \"left\"), ..., \"%\": (6, \"left\")}</code>. Return the AST as nested tuples, in Lesson 2's format:</p>\n<ul>\n<li><code>(\"num\", 42)</code> for a number (an int), <code>(\"var\", \"x\")</code> for a name;</li>\n<li><code>(\"call\", \"f\", [args])</code> for a name followed by <code>(</code>, with zero or more comma-separated argument expressions;</li>\n<li><code>(\"unary\", op, e)</code> for a prefix <code>-</code> or <code>!</code>, which binds tighter than every binary operator (so <code>-2 ^ 2</code> is <code>(-2) ^ 2</code>);</li>\n<li><code>(\"bin\", op, left, right)</code>, and parentheses for grouping.</li>\n</ul>\n<p>The starter's <code>tokenize</code> turns the text into tokens <code>(kind, text, line, col)</code>. Besides numbers and names, it accepts more operators than Mini has, so that your tables can use them: <code>** &lt;= &gt;= == != &amp;&amp; ||</code> and the single characters <code>- + * / % ^ &lt; &gt; ! ( ) ,</code>. (Mini has no <code>^</code> or <code>**</code>; here they are just names for operators you give a table entry, such as <code>{\"^\": (7, \"right\")}</code>.) A token whose text isn't in <code>binary</code> is not a binary operator here, even if it is <code>*</code>. Raise <code>ParseError</code> (defined in the starter) for anything malformed, with a message beginning <code>1:col:</code> where <code>col</code> is the column of the offending token: a missing operand, a missing <code>)</code>, or tokens left over after a complete expression (as in <code>1 2</code>, or <code>1 * 2</code> when <code>*</code> isn't in the table).</p>",
   "starter": "import re\n\nclass ParseError(Exception):\n    pass\n\nTOKEN = re.compile(r\"\\s*(?:([0-9]+)|([A-Za-z_][A-Za-z0-9_]*)|(\\*\\*|<=|>=|==|!=|&&|\\|\\||[-+*/%^<>!(),]))\")\n\ndef tokenize(text):\n    \"\"\"Tokens (kind, text, line, col); kind is \"num\", \"name\", the operator itself, or \"eof\".\"\"\"\n    tokens, i = [], 0\n    while True:\n        m = TOKEN.match(text, i)\n        if m is None or m.end() == i:\n            rest = text[i:].lstrip()\n            col = len(text) - len(rest) + 1\n            if rest:\n                raise ParseError(f\"1:{col}: unexpected character {rest[0]!r}\")\n            tokens.append((\"eof\", \"\", 1, col))\n            return tokens\n        num, name, op = m.groups()\n        start = m.start(m.lastindex) + 1\n        if num is not None:\n            tokens.append((\"num\", num, 1, start))\n        elif name is not None:\n            tokens.append((\"name\", name, 1, start))\n        else:\n            tokens.append((op, op, 1, start))\n        i = m.end()\n\ndef parse_expression(text, binary):\n    pass\n",
   "hint": "<p>Copy the structure of the notes' <code>Parser</code>: a position into the token list, <code>peek</code>, <code>advance</code> and <code>expect</code>. In <code>expr(min_prec)</code>, loop while the next token's text is in <code>binary</code> with precedence at least <code>min_prec</code>; parse the right operand with <code>expr(p + 1)</code> for a left-associative operator and <code>expr(p)</code> for a right-associative one. After parsing, the next token must be <code>eof</code>.</p>",
   "solution": "import re\n\nclass ParseError(Exception):\n    pass\n\nTOKEN = re.compile(r\"\\s*(?:([0-9]+)|([A-Za-z_][A-Za-z0-9_]*)|(\\*\\*|<=|>=|==|!=|&&|\\|\\||[-+*/%^<>!(),]))\")\n\ndef tokenize(text):\n    \"\"\"Tokens (kind, text, line, col); kind is \"num\", \"name\", the operator itself, or \"eof\".\"\"\"\n    tokens, i = [], 0\n    while True:\n        m = TOKEN.match(text, i)\n        if m is None or m.end() == i:\n            rest = text[i:].lstrip()\n            col = len(text) - len(rest) + 1\n            if rest:\n                raise ParseError(f\"1:{col}: unexpected character {rest[0]!r}\")\n            tokens.append((\"eof\", \"\", 1, col))\n            return tokens\n        num, name, op = m.groups()\n        start = m.start(m.lastindex) + 1\n        if num is not None:\n            tokens.append((\"num\", num, 1, start))\n        elif name is not None:\n            tokens.append((\"name\", name, 1, start))\n        else:\n            tokens.append((op, op, 1, start))\n        i = m.end()\n\ndef parse_expression(text, binary):\n    tokens, pos = tokenize(text), [0]\n    lowest = min([p for p, _ in binary.values()], default=0)\n\n    def peek():\n        return tokens[pos[0]]\n\n    def advance():\n        tok = tokens[pos[0]]\n        if tok[0] != \"eof\":\n            pos[0] += 1\n        return tok\n\n    def fail(tok, what):\n        found = \"end of input\" if tok[0] == \"eof\" else repr(tok[1])\n        raise ParseError(f\"{tok[2]}:{tok[3]}: expected {what} but found {found}\")\n\n    def expect(kind):\n        if peek()[0] != kind:\n            fail(peek(), repr(kind))\n        return advance()\n\n    def expr(min_prec):\n        left = unary()\n        while peek()[1] in binary and binary[peek()[1]][0] >= min_prec:\n            op = advance()[1]\n            prec, assoc = binary[op]\n            right = expr(prec + 1 if assoc == \"left\" else prec)\n            left = (\"bin\", op, left, right)\n        return left\n\n    def unary():\n        if peek()[0] in (\"-\", \"!\"):\n            op = advance()[0]\n            return (\"unary\", op, unary())\n        return primary()\n\n    def primary():\n        tok = peek()\n        if tok[0] == \"num\":\n            advance()\n            return (\"num\", int(tok[1]))\n        if tok[0] == \"name\":\n            advance()\n            if peek()[0] == \"(\":\n                advance()\n                args = []\n                if peek()[0] != \")\":\n                    args.append(expr(lowest))\n                    while peek()[0] == \",\":\n                        advance()\n                        args.append(expr(lowest))\n                expect(\")\")\n                return (\"call\", tok[1], args)\n            return (\"var\", tok[1])\n        if tok[0] == \"(\":\n            advance()\n            e = expr(lowest)\n            expect(\")\")\n            return e\n        fail(tok, \"an expression\")\n\n    e = expr(lowest)\n    if peek()[0] != \"eof\":\n        fail(peek(), \"an operator or the end\")\n    return e\n",
   "tests": [
    {
     "label": "Mini precedence: a - b * c + d",
     "call": "parse_expression('a - b * c + d', {\"||\": (1, \"left\"), \"&&\": (2, \"left\"), \"==\": (3, \"left\"), \"!=\": (3, \"left\"), \"<\": (4, \"left\"), \"<=\": (4, \"left\"), \">\": (4, \"left\"), \">=\": (4, \"left\"), \"+\": (5, \"left\"), \"-\": (5, \"left\"), \"*\": (6, \"left\"), \"/\": (6, \"left\"), \"%\": (6, \"left\")})",
     "expect": "('bin', '+', ('bin', '-', ('var', 'a'), ('bin', '*', ('var', 'b'), ('var', 'c'))), ('var', 'd'))"
    },
    {
     "label": "Mini: || and && and comparisons",
     "call": "parse_expression('a < 1 || b == c && !d', {\"||\": (1, \"left\"), \"&&\": (2, \"left\"), \"==\": (3, \"left\"), \"!=\": (3, \"left\"), \"<\": (4, \"left\"), \"<=\": (4, \"left\"), \">\": (4, \"left\"), \">=\": (4, \"left\"), \"+\": (5, \"left\"), \"-\": (5, \"left\"), \"*\": (6, \"left\"), \"/\": (6, \"left\"), \"%\": (6, \"left\")})",
     "expect": "('bin', '||', ('bin', '<', ('var', 'a'), ('num', 1)), ('bin', '&&', ('bin', '==', ('var', 'b'), ('var', 'c')), ('unary', '!', ('var', 'd'))))"
    },
    {
     "label": "Left associativity: 8 - 3 - 2",
     "call": "parse_expression('8 - 3 - 2', {\"||\": (1, \"left\"), \"&&\": (2, \"left\"), \"==\": (3, \"left\"), \"!=\": (3, \"left\"), \"<\": (4, \"left\"), \"<=\": (4, \"left\"), \">\": (4, \"left\"), \">=\": (4, \"left\"), \"+\": (5, \"left\"), \"-\": (5, \"left\"), \"*\": (6, \"left\"), \"/\": (6, \"left\"), \"%\": (6, \"left\")})",
     "expect": "('bin', '-', ('bin', '-', ('num', 8), ('num', 3)), ('num', 2))"
    },
    {
     "label": "Right associativity: 2 ^ 3 ^ 2",
     "call": "parse_expression('2 ^ 3 ^ 2', {'+': (1, 'left'), '^': (2, 'right')})",
     "expect": "('bin', '^', ('num', 2), ('bin', '^', ('num', 3), ('num', 2)))"
    },
    {
     "label": "Mixed: 1 + 2 ** 3 ** 2 * 4",
     "call": "parse_expression('1 + 2 ** 3 ** 2 * 4', {'+': (1, 'left'), '*': (2, 'left'), '**': (3, 'right')})",
     "expect": "('bin', '+', ('num', 1), ('bin', '*', ('bin', '**', ('num', 2), ('bin', '**', ('num', 3), ('num', 2))), ('num', 4)))"
    },
    {
     "label": "Unary binds tightest",
     "call": "parse_expression('-2 ^ 2 - -x', {'-': (1, 'left'), '^': (2, 'right')})",
     "expect": "('bin', '-', ('bin', '^', ('unary', '-', ('num', 2)), ('num', 2)), ('unary', '-', ('var', 'x')))"
    },
    {
     "label": "Parentheses and calls",
     "call": "parse_expression('f(g(1), (2 + 3) * x, h())', {\"||\": (1, \"left\"), \"&&\": (2, \"left\"), \"==\": (3, \"left\"), \"!=\": (3, \"left\"), \"<\": (4, \"left\"), \"<=\": (4, \"left\"), \">\": (4, \"left\"), \">=\": (4, \"left\"), \"+\": (5, \"left\"), \"-\": (5, \"left\"), \"*\": (6, \"left\"), \"/\": (6, \"left\"), \"%\": (6, \"left\")})",
     "expect": "('call', 'f', [('call', 'g', [('num', 1)]), ('bin', '*', ('bin', '+', ('num', 2), ('num', 3)), ('var', 'x')), ('call', 'h', [])])"
    },
    {
     "label": "Precedence is relative, not absolute",
     "call": "parse_expression('a + b * c', {'+': (10, 'left'), '*': (20, 'left')})",
     "expect": "('bin', '+', ('var', 'a'), ('bin', '*', ('var', 'b'), ('var', 'c')))"
    },
    {
     "label": "Reversed precedence",
     "call": "parse_expression('a + b * c', {'+': (2, 'left'), '*': (1, 'left')})",
     "expect": "('bin', '*', ('bin', '+', ('var', 'a'), ('var', 'b')), ('var', 'c'))"
    },
    {
     "label": "Missing operand",
     "type": "assert",
     "code": "try:\n    parse_expression('1 +', {\"||\": (1, \"left\"), \"&&\": (2, \"left\"), \"==\": (3, \"left\"), \"!=\": (3, \"left\"), \"<\": (4, \"left\"), \"<=\": (4, \"left\"), \">\": (4, \"left\"), \">=\": (4, \"left\"), \"+\": (5, \"left\"), \"-\": (5, \"left\"), \"*\": (6, \"left\"), \"/\": (6, \"left\"), \"%\": (6, \"left\")})\nexcept ParseError as e:\n    assert str(e).startswith('1:4:'), str(e)\nelse:\n    assert False, \"no ParseError raised\"\n"
    },
    {
     "label": "Missing )",
     "type": "assert",
     "code": "try:\n    parse_expression('(1 + 2', {\"||\": (1, \"left\"), \"&&\": (2, \"left\"), \"==\": (3, \"left\"), \"!=\": (3, \"left\"), \"<\": (4, \"left\"), \"<=\": (4, \"left\"), \">\": (4, \"left\"), \">=\": (4, \"left\"), \"+\": (5, \"left\"), \"-\": (5, \"left\"), \"*\": (6, \"left\"), \"/\": (6, \"left\"), \"%\": (6, \"left\")})\nexcept ParseError as e:\n    assert str(e).startswith('1:7:'), str(e)\nelse:\n    assert False, \"no ParseError raised\"\n\ntry:\n    parse_expression('f(1,', {\"||\": (1, \"left\"), \"&&\": (2, \"left\"), \"==\": (3, \"left\"), \"!=\": (3, \"left\"), \"<\": (4, \"left\"), \"<=\": (4, \"left\"), \">\": (4, \"left\"), \">=\": (4, \"left\"), \"+\": (5, \"left\"), \"-\": (5, \"left\"), \"*\": (6, \"left\"), \"/\": (6, \"left\"), \"%\": (6, \"left\")})\nexcept ParseError as e:\n    assert str(e).startswith('1:5:'), str(e)\nelse:\n    assert False, \"no ParseError raised\"\n"
    },
    {
     "label": "Leftover tokens",
     "type": "assert",
     "code": "try:\n    parse_expression('1 2', {\"||\": (1, \"left\"), \"&&\": (2, \"left\"), \"==\": (3, \"left\"), \"!=\": (3, \"left\"), \"<\": (4, \"left\"), \"<=\": (4, \"left\"), \">\": (4, \"left\"), \">=\": (4, \"left\"), \"+\": (5, \"left\"), \"-\": (5, \"left\"), \"*\": (6, \"left\"), \"/\": (6, \"left\"), \"%\": (6, \"left\")})\nexcept ParseError as e:\n    assert str(e).startswith('1:3:'), str(e)\nelse:\n    assert False, \"no ParseError raised\"\n\ntry:\n    parse_expression('1 * 2', {'+': (1, 'left')})\nexcept ParseError as e:\n    assert str(e).startswith('1:3:'), str(e)\nelse:\n    assert False, \"no ParseError raised\"\n"
    },
    {
     "label": "Empty input and a stray )",
     "type": "assert",
     "code": "try:\n    parse_expression('', {\"||\": (1, \"left\"), \"&&\": (2, \"left\"), \"==\": (3, \"left\"), \"!=\": (3, \"left\"), \"<\": (4, \"left\"), \"<=\": (4, \"left\"), \">\": (4, \"left\"), \">=\": (4, \"left\"), \"+\": (5, \"left\"), \"-\": (5, \"left\"), \"*\": (6, \"left\"), \"/\": (6, \"left\"), \"%\": (6, \"left\")})\nexcept ParseError as e:\n    pass\nelse:\n    assert False, \"no ParseError raised\"\n\ntry:\n    parse_expression(')', {\"||\": (1, \"left\"), \"&&\": (2, \"left\"), \"==\": (3, \"left\"), \"!=\": (3, \"left\"), \"<\": (4, \"left\"), \"<=\": (4, \"left\"), \">\": (4, \"left\"), \">=\": (4, \"left\"), \"+\": (5, \"left\"), \"-\": (5, \"left\"), \"*\": (6, \"left\"), \"/\": (6, \"left\"), \"%\": (6, \"left\")})\nexcept ParseError as e:\n    assert str(e).startswith('1:1:'), str(e)\nelse:\n    assert False, \"no ParseError raised\"\n",
     "hidden": true
    },
    {
     "label": "A long chain",
     "type": "assert",
     "code": "e = parse_expression(' - '.join(str(i) for i in range(30)), {\"||\": (1, \"left\"), \"&&\": (2, \"left\"), \"==\": (3, \"left\"), \"!=\": (3, \"left\"), \"<\": (4, \"left\"), \"<=\": (4, \"left\"), \">\": (4, \"left\"), \">=\": (4, \"left\"), \"+\": (5, \"left\"), \"-\": (5, \"left\"), \"*\": (6, \"left\"), \"/\": (6, \"left\"), \"%\": (6, \"left\")})\ndepth = 0\nwhile e[0] == 'bin':\n    assert e[3][0] == 'num', 'the right operand of each - should be a number'\n    e = e[2]\n    depth += 1\nassert depth == 29, depth\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "first_follow",
   "title": "FIRST, FOLLOW and LL(1)",
   "prompt": "<p>A grammar is a dict from each variable to a list of alternatives; each alternative is a list of symbols, and <code>[]</code> is an ε-alternative. Any symbol that isn't a key of the dict is a terminal. For example, <code>{\"E\": [[\"T\", \"E'\"]], \"E'\": [[\"+\", \"T\", \"E'\"], []], \"T\": [[\"num\"], [\"(\", \"E\", \")\"]]}</code>. Write:</p>\n<ul>\n<li><code>first_sets(grammar)</code>, returning <code>(first, nullable)</code>: <code>first</code> maps every variable to its FIRST set (a set of terminals), and <code>nullable</code> is the set of variables that can derive ε.</li>\n<li><code>first_of(symbols, first, nullable)</code>, returning <code>(s, n)</code>: the FIRST set of a sequence of symbols, and whether the whole sequence can derive ε (so <code>first_of([], ...)</code> is <code>(set(), True)</code>).</li>\n<li><code>follow_sets(grammar, start)</code>, returning a dict from every variable to its FOLLOW set. The end of input is the terminal <code>\"$\"</code>, which is in FOLLOW(<code>start</code>).</li>\n<li><code>is_ll1(grammar, start)</code>: <code>True</code> if one token of lookahead always chooses the alternative, that is, for every variable, any two alternatives α and β have disjoint FIRST sets, at most one of them is nullable, and if α is nullable then FIRST(β) and FOLLOW of the variable are disjoint.</li>\n</ul>\n<p>Compute each set by iterating the rules from the notes until nothing changes.</p>",
   "starter": "def first_sets(grammar):\n    pass\n\ndef first_of(symbols, first, nullable):\n    pass\n\ndef follow_sets(grammar, start):\n    pass\n\ndef is_ll1(grammar, start):\n    pass\n",
   "hint": "<p>For FIRST, loop until no set changes: for each rule <em>A</em> → <em>X</em><sub>1</sub>…<em>X<sub>n</sub></em>, add FIRST of the sequence (computed with <code>first_of</code>, which walks the symbols until one isn't nullable) to FIRST(<em>A</em>), and mark <em>A</em> nullable if the whole sequence is. For FOLLOW, for every occurrence of a variable <em>B</em> in a rule <em>A</em> → α <em>B</em> β, add FIRST(β) to FOLLOW(<em>B</em>), and if β is nullable, add FOLLOW(<em>A</em>) too; again loop until nothing changes.</p>",
   "solution": "def first_of(symbols, first, nullable):\n    out = set()\n    for x in symbols:\n        if x in first:\n            out |= first[x]\n            if x not in nullable:\n                return out, False\n        else:\n            out.add(x)\n            return out, False\n    return out, True\n\ndef first_sets(grammar):\n    first = {a: set() for a in grammar}\n    nullable = set()\n    changed = True\n    while changed:\n        changed = False\n        for a, alts in grammar.items():\n            for alt in alts:\n                s, n = first_of(alt, first, nullable)\n                if not s <= first[a]:\n                    first[a] |= s\n                    changed = True\n                if n and a not in nullable:\n                    nullable.add(a)\n                    changed = True\n    return first, nullable\n\ndef follow_sets(grammar, start):\n    first, nullable = first_sets(grammar)\n    follow = {a: set() for a in grammar}\n    follow[start].add(\"$\")\n    changed = True\n    while changed:\n        changed = False\n        for a, alts in grammar.items():\n            for alt in alts:\n                for i, b in enumerate(alt):\n                    if b not in grammar:\n                        continue\n                    s, n = first_of(alt[i + 1:], first, nullable)\n                    if n:\n                        s = s | follow[a]\n                    if not s <= follow[b]:\n                        follow[b] |= s\n                        changed = True\n    return follow\n\ndef is_ll1(grammar, start):\n    first, nullable = first_sets(grammar)\n    follow = follow_sets(grammar, start)\n    for a, alts in grammar.items():\n        info = [first_of(alt, first, nullable) for alt in alts]\n        for i in range(len(info)):\n            for j in range(len(info)):\n                if i == j:\n                    continue\n                (si, ni), (sj, nj) = info[i], info[j]\n                if i < j and (si & sj or (ni and nj)):\n                    return False\n                if ni and sj & follow[a]:\n                    return False\n    return True\n",
   "tests": [
    {
     "label": "The expression grammar from the notes",
     "type": "assert",
     "code": "G = {\"E\": [[\"T\", \"E'\"]], \"E'\": [[\"+\", \"T\", \"E'\"], []], \"T\": [[\"F\", \"T'\"]], \"T'\": [[\"*\", \"F\", \"T'\"], []], \"F\": [[\"(\", \"E\", \")\"], [\"num\"]]}\nfirst, nullable = first_sets(G)\nassert first == {\"E\": {\"(\", \"num\"}, \"E'\": {\"+\"}, \"T\": {\"(\", \"num\"}, \"T'\": {\"*\"}, \"F\": {\"(\", \"num\"}}, first\nassert nullable == {\"E'\", \"T'\"}, nullable\n"
    },
    {
     "label": "first_of a sequence",
     "type": "assert",
     "code": "G = {\"A\": [[\"a\"], []], \"B\": [[\"b\"]]}\nfirst, nullable = first_sets(G)\nassert first_of([\"A\", \"B\"], first, nullable) == ({\"a\", \"b\"}, False)\nassert first_of([\"A\", \"A\"], first, nullable) == ({\"a\"}, True)\nassert first_of([], first, nullable) == (set(), True)\nassert first_of([\"c\", \"A\"], first, nullable) == ({\"c\"}, False)\n"
    },
    {
     "label": "Nullable through a chain",
     "type": "assert",
     "code": "G = {\"S\": [[\"A\", \"B\", \"c\"]], \"A\": [[\"B\"], [\"a\"]], \"B\": [[], [\"b\"]]}\nfirst, nullable = first_sets(G)\nassert nullable == {\"A\", \"B\"}, nullable\nassert first[\"S\"] == {\"a\", \"b\", \"c\"}, first[\"S\"]\n"
    },
    {
     "label": "FOLLOW sets",
     "type": "assert",
     "code": "G = {\"E\": [[\"T\", \"E'\"]], \"E'\": [[\"+\", \"T\", \"E'\"], []], \"T\": [[\"F\", \"T'\"]], \"T'\": [[\"*\", \"F\", \"T'\"], []], \"F\": [[\"(\", \"E\", \")\"], [\"num\"]]}\nf = follow_sets(G, \"E\")\nassert f == {\"E\": {\")\", \"$\"}, \"E'\": {\")\", \"$\"}, \"T\": {\"+\", \")\", \"$\"}, \"T'\": {\"+\", \")\", \"$\"}, \"F\": {\"*\", \"+\", \")\", \"$\"}}, f\n"
    },
    {
     "label": "The practice problem: S -> A b | c, A -> a A | ε",
     "type": "assert",
     "code": "G = {\"S\": [[\"A\", \"b\"], [\"c\"]], \"A\": [[\"a\", \"A\"], []]}\nfirst, nullable = first_sets(G)\nassert first == {\"S\": {\"a\", \"b\", \"c\"}, \"A\": {\"a\"}} and nullable == {\"A\"}\nassert follow_sets(G, \"S\") == {\"S\": {\"$\"}, \"A\": {\"b\"}}\nassert is_ll1(G, \"S\") is True\n"
    },
    {
     "label": "LL(1) and not",
     "type": "assert",
     "code": "G = {\"E\": [[\"T\", \"E'\"]], \"E'\": [[\"+\", \"T\", \"E'\"], []], \"T\": [[\"num\"], [\"(\", \"E\", \")\"]]}\nassert is_ll1(G, \"E\") is True\nleft = {\"E\": [[\"E\", \"+\", \"T\"], [\"T\"]], \"T\": [[\"num\"]]}\nassert is_ll1(left, \"E\") is False, \"left recursion gives a FIRST/FIRST conflict\"\nstmt = {\"S\": [[\"name\", \"=\", \"num\"], [\"name\", \"(\", \")\"]]}\nassert is_ll1(stmt, \"S\") is False, \"both alternatives start with name\"\n"
    },
    {
     "label": "A FIRST/FOLLOW conflict",
     "type": "assert",
     "code": "G = {\"S\": [[\"A\", \"a\"]], \"A\": [[\"a\"], []]}\nassert is_ll1(G, \"S\") is False\n"
    },
    {
     "label": "Two nullable alternatives",
     "type": "assert",
     "code": "G = {\"S\": [[\"A\"], [\"B\"]], \"A\": [[]], \"B\": [[]]}\nassert is_ll1(G, \"S\") is False\n",
     "hidden": true
    },
    {
     "label": "The dangling-else grammar is not LL(1)",
     "type": "assert",
     "code": "G = {\"S\": [[\"if\", \"S\", \"R\"], [\"x\"]], \"R\": [[\"else\", \"S\"], []]}\nassert follow_sets(G, \"S\") == {\"S\": {\"$\", \"else\"}, \"R\": {\"$\", \"else\"}}\nassert is_ll1(G, \"S\") is False\n",
     "hidden": true
    }
   ]
  }
 ],
 "cp3": [
  {
   "id": "resolver",
   "title": "Resolving names to slots",
   "prompt": "<p>Write <code>resolve(fun)</code> for one Mini function, given as Lesson 2's tuple <code>(\"fun\", name, [(param, type), ...], return_type, body)</code>. It returns <code>(body, nslots)</code>: a copy of the body in which every name of a local variable is replaced by its slot number, and the number of slots the function needs.</p>\n<ul>\n<li>Parameters get slots 0, 1, … in order. Each <code>(\"vardecl\", x, type, e)</code> gets the next unused slot, in the order the declarations are reached (slots are never reused).</li>\n<li>Replace <code>(\"var\", x)</code> by <code>(\"local\", slot)</code>, <code>(\"assign\", x, e)</code> by <code>(\"assign\", slot, e)</code> and <code>(\"vardecl\", x, type, e)</code> by <code>(\"vardecl\", slot, type, e)</code>, resolving inside <code>e</code> too. Calls keep their function name: <code>(\"call\", \"f\", [args])</code>, with the arguments resolved. Every other node is rebuilt with its parts resolved (an <code>if</code> without an else keeps its <code>None</code>).</li>\n<li>Scopes: the parameters form the outermost scope; every block, including the body, opens a new scope inside the current one. A use refers to the innermost declaration of that name that is still in scope. The initializer of a <code>vardecl</code> is resolved <em>before</em> the new variable is declared.</li>\n<li>Raise <code>ScopeError</code> (defined in the starter) for a use or assignment of a name that isn't declared, for a declaration of a name already declared in the same scope, and for two parameters with the same name.</li>\n</ul>\n<p>Each test shows the Mini source; the function receives its parsed tuple.</p>",
   "starter": "class ScopeError(Exception):\n    pass\n\ndef resolve(fun):\n    pass\n",
   "hint": "<p>Use a list of dictionaries as the scope stack, mapping names to slots, and a counter for the next slot. Write two recursive helpers, one for expressions and one for statements, each returning a new tuple. For a block: push a dictionary, resolve each statement, pop. For a vardecl: resolve the initializer first, then declare.</p>",
   "solution": "class ScopeError(Exception):\n    pass\n\ndef resolve(fun):\n    _, name, params, rettype, body = fun\n    scopes = [{}]\n    count = [0]\n\n    def declare(x):\n        if x in scopes[-1]:\n            raise ScopeError(f\"'{x}' is already declared in this scope\")\n        scopes[-1][x] = count[0]\n        count[0] += 1\n        return scopes[-1][x]\n\n    def lookup(x):\n        for scope in reversed(scopes):\n            if x in scope:\n                return scope[x]\n        raise ScopeError(f\"'{x}' is not declared\")\n\n    def expr(e):\n        kind = e[0]\n        if kind == \"var\":\n            return (\"local\", lookup(e[1]))\n        if kind == \"unary\":\n            return (\"unary\", e[1], expr(e[2]))\n        if kind == \"bin\":\n            return (\"bin\", e[1], expr(e[2]), expr(e[3]))\n        if kind == \"call\":\n            return (\"call\", e[1], [expr(a) for a in e[2]])\n        return e\n\n    def stmt(s):\n        kind = s[0]\n        if kind == \"vardecl\":\n            e = expr(s[3])\n            return (\"vardecl\", declare(s[1]), s[2], e)\n        if kind == \"assign\":\n            e = expr(s[2])\n            return (\"assign\", lookup(s[1]), e)\n        if kind == \"block\":\n            scopes.append({})\n            out = [stmt(t) for t in s[1]]\n            scopes.pop()\n            return (\"block\", out)\n        if kind == \"if\":\n            return (\"if\", expr(s[1]), stmt(s[2]), None if s[3] is None else stmt(s[3]))\n        if kind == \"while\":\n            return (\"while\", expr(s[1]), stmt(s[2]))\n        return (kind, expr(s[1]))\n\n    for p, _ in params:\n        declare(p)\n    return stmt(body), count[0]\n",
   "tests": [
    {
     "label": "The notes' example: shadowing a parameter",
     "call": "resolve(('fun', 'f', [('x', 'int')], 'int', ('block', [('vardecl', 'y', 'int', ('bin', '+', ('var', 'x'), ('num', 1))), ('block', [('vardecl', 'x', 'bool', ('bin', '>', ('var', 'y'), ('num', 2))), ('print', ('var', 'x'))]), ('return', ('bin', '+', ('var', 'x'), ('var', 'y')))])))",
     "expect": "(('block', [('vardecl', 1, 'int', ('bin', '+', ('local', 0), ('num', 1))), ('block', [('vardecl', 2, 'bool', ('bin', '>', ('local', 1), ('num', 2))), ('print', ('local', 2))]), ('return', ('bin', '+', ('local', 0), ('local', 1)))]), 3)"
    },
    {
     "label": "gcd",
     "call": "resolve(('fun', 'gcd', [('a', 'int'), ('b', 'int')], 'int', ('block', [('while', ('bin', '!=', ('var', 'b'), ('num', 0)), ('block', [('vardecl', 't', 'int', ('bin', '%', ('var', 'a'), ('var', 'b'))), ('assign', 'a', ('var', 'b')), ('assign', 'b', ('var', 't'))])), ('return', ('var', 'a'))])))",
     "expect": "(('block', [('while', ('bin', '!=', ('local', 1), ('num', 0)), ('block', [('vardecl', 2, 'int', ('bin', '%', ('local', 0), ('local', 1))), ('assign', 0, ('local', 1)), ('assign', 1, ('local', 2))])), ('return', ('local', 0))]), 3)"
    },
    {
     "label": "Calls keep their names",
     "call": "resolve(('fun', 'f', [('n', 'int')], 'int', ('block', [('if', ('bin', '<', ('var', 'n'), ('num', 2)), ('block', [('return', ('var', 'n'))]), ('block', [('return', ('bin', '+', ('call', 'f', [('bin', '-', ('var', 'n'), ('num', 1))]), ('call', 'f', [('bin', '-', ('var', 'n'), ('num', 2))])))]))])))",
     "expect": "(('block', [('if', ('bin', '<', ('local', 0), ('num', 2)), ('block', [('return', ('local', 0))]), ('block', [('return', ('bin', '+', ('call', 'f', [('bin', '-', ('local', 0), ('num', 1))]), ('call', 'f', [('bin', '-', ('local', 0), ('num', 2))])))]))]), 1)"
    },
    {
     "label": "The initializer sees the outer x",
     "call": "resolve(('fun', 'f', [('x', 'int')], 'int', ('block', [('vardecl', 'x', 'int', ('bin', '+', ('var', 'x'), ('num', 1))), ('return', ('var', 'x'))])))",
     "expect": "(('block', [('vardecl', 1, 'int', ('bin', '+', ('local', 0), ('num', 1))), ('return', ('local', 1))]), 2)"
    },
    {
     "label": "Sibling blocks get separate slots",
     "call": "resolve(('fun', 'f', [], 'int', ('block', [('block', [('vardecl', 'a', 'int', ('num', 1)), ('print', ('var', 'a'))]), ('block', [('vardecl', 'a', 'int', ('num', 2)), ('print', ('var', 'a'))]), ('return', ('num', 0))])))",
     "expect": "(('block', [('block', [('vardecl', 0, 'int', ('num', 1)), ('print', ('local', 0))]), ('block', [('vardecl', 1, 'int', ('num', 2)), ('print', ('local', 1))]), ('return', ('num', 0))]), 2)"
    },
    {
     "label": "Undeclared variable",
     "type": "raises",
     "call": "resolve(('fun', 'f', [], 'int', ('block', [('return', ('var', 'y'))])))",
     "error": "ScopeError"
    },
    {
     "label": "Assignment to an undeclared variable",
     "type": "raises",
     "call": "resolve(('fun', 'f', [], 'int', ('block', [('assign', 'z', ('num', 1)), ('return', ('num', 0))])))",
     "error": "ScopeError"
    },
    {
     "label": "Redeclaration in the same scope",
     "type": "raises",
     "call": "resolve(('fun', 'f', [], 'int', ('block', [('vardecl', 'a', 'int', ('num', 1)), ('vardecl', 'a', 'int', ('num', 2)), ('return', ('var', 'a'))])))",
     "error": "ScopeError"
    },
    {
     "label": "A variable is gone after its block",
     "type": "raises",
     "call": "resolve(('fun', 'f', [], 'int', ('block', [('block', [('vardecl', 'a', 'int', ('num', 1))]), ('return', ('var', 'a'))])))",
     "error": "ScopeError"
    },
    {
     "label": "Duplicate parameters",
     "type": "raises",
     "call": "resolve(('fun', 'f', [('a', 'int'), ('a', 'bool')], 'int', ('block', [('return', ('num', 0))])))",
     "error": "ScopeError"
    },
    {
     "label": "Using a variable in its own initializer",
     "type": "raises",
     "call": "resolve(('fun', 'f', [], 'int', ('block', [('vardecl', 'a', 'int', ('var', 'a')), ('return', ('var', 'a'))])))",
     "error": "ScopeError",
     "hidden": true
    },
    {
     "label": "Deep nesting",
     "call": "resolve(('fun', 'g', [('a', 'int'), ('b', 'int')], 'int', ('block', [('vardecl', 'c', 'int', ('var', 'a')), ('while', ('bin', '<', ('var', 'c'), ('var', 'b')), ('block', [('vardecl', 'a', 'int', ('bin', '*', ('var', 'c'), ('num', 2))), ('assign', 'c', ('bin', '+', ('var', 'a'), ('num', 1))), ('if', ('bin', '>', ('var', 'a'), ('num', 10)), ('block', [('vardecl', 'd', 'bool', ('bool', True)), ('print', ('var', 'd'))]), None)])), ('vardecl', 'd', 'int', ('bin', '+', ('var', 'c'), ('var', 'a'))), ('return', ('var', 'd'))])))",
     "expect": "(('block', [('vardecl', 2, 'int', ('local', 0)), ('while', ('bin', '<', ('local', 2), ('local', 1)), ('block', [('vardecl', 3, 'int', ('bin', '*', ('local', 2), ('num', 2))), ('assign', 2, ('bin', '+', ('local', 3), ('num', 1))), ('if', ('bin', '>', ('local', 3), ('num', 10)), ('block', [('vardecl', 4, 'bool', ('bool', True)), ('print', ('local', 4))]), None)])), ('vardecl', 5, 'int', ('bin', '+', ('local', 2), ('local', 0))), ('return', ('local', 5))]), 6)",
     "hidden": true
    }
   ]
  },
  {
   "id": "type_checker",
   "title": "The Mini type checker",
   "prompt": "<p>Write <code>check_program(prog)</code> for a whole program <code>(\"program\", [fun, ...])</code>, returning the list of every error it finds, in the order below, as tuples:</p>\n<table>\n<tr><th>Error</th><th>When</th></tr>\n<tr><td><code>(\"redeclared\", name)</code></td><td>a second function with the same name; a parameter repeated; a <code>var</code> already declared in the same scope</td></tr>\n<tr><td><code>(\"undeclared\", name)</code></td><td>a variable used or assigned, or a function called, that isn't declared</td></tr>\n<tr><td><code>(\"operand\", op)</code></td><td>an operator applied to the wrong types (the table in the notes)</td></tr>\n<tr><td><code>(\"args\", f)</code></td><td>a call to <code>f</code> with the wrong number of arguments, or with one or more arguments of the wrong type: one error per call, however many arguments are wrong (the notes' <code>type_of</code> gives one message per argument instead)</td></tr>\n<tr><td><code>(\"mismatch\", x)</code></td><td>a <code>var</code> initializer or an assignment whose type differs from variable <code>x</code>'s</td></tr>\n<tr><td><code>(\"condition\", \"if\")</code>, <code>(\"condition\", \"while\")</code></td><td>a condition that isn't bool</td></tr>\n<tr><td><code>(\"return\", f)</code></td><td>a returned value of the wrong type in function <code>f</code></td></tr>\n<tr><td><code>(\"noreturn\", f)</code></td><td><code>f</code>'s body doesn't return on every path (the notes' <code>returns</code>)</td></tr>\n</table>\n<p>Order: first, one pass over the functions records each signature (reporting repeats; the first definition is the one used). Then each function is checked in order: its parameters, its body statement by statement, then <code>noreturn</code>. Within a statement, check its expression(s) before the statement's own rule; within an expression, operands left to right before the operator, and a call's arguments before the call itself. Scopes follow the previous problem. An erroneous subexpression has type <code>\"error\"</code>, which every rule accepts without a further message; a call that can't be checked against its definition still has the function's declared result type, unless the function is undeclared. A <code>var</code> is declared with its stated type even when its initializer is wrong. Variables and functions are separate: <code>(\"var\", \"f\")</code> looks only at variables, and a call only at functions.</p>",
   "starter": "def check_program(prog):\n    pass\n",
   "hint": "<p>Build on the notes' <code>type_of</code> and <code>returns</code>, but record tuples instead of strings and keep the scope stack yourself. A statement checker with one case per statement kind does the rest: for example, for <code>(\"assign\", x, e)</code>, compute the type of <code>e</code>, then look up <code>x</code> and report <code>undeclared</code> or <code>mismatch</code>.</p>",
   "solution": "ARITH = {\"+\", \"-\", \"*\", \"/\", \"%\"}\nORDER = {\"<\", \"<=\", \">\", \">=\"}\n\ndef returns(s):\n    kind = s[0]\n    if kind == \"return\":\n        return True\n    if kind == \"block\":\n        return any(returns(t) for t in s[1])\n    if kind == \"if\":\n        return s[3] is not None and returns(s[2]) and returns(s[3])\n    return False\n\ndef check_program(prog):\n    errors = []\n    funs = {}\n    for _, name, params, rt, body in prog[1]:\n        if name in funs:\n            errors.append((\"redeclared\", name))\n        else:\n            funs[name] = ([t for _, t in params], rt)\n    for _, name, params, rt, body in prog[1]:\n        scopes = [{}]\n        for p, t in params:\n            if p in scopes[-1]:\n                errors.append((\"redeclared\", p))\n            scopes[-1][p] = t\n\n        def lookup(x):\n            for scope in reversed(scopes):\n                if x in scope:\n                    return scope[x]\n            return None\n\n        def ty(e):\n            kind = e[0]\n            if kind == \"num\":\n                return \"int\"\n            if kind == \"bool\":\n                return \"bool\"\n            if kind == \"var\":\n                t = lookup(e[1])\n                if t is None:\n                    errors.append((\"undeclared\", e[1]))\n                    return \"error\"\n                return t\n            if kind == \"unary\":\n                t = ty(e[2])\n                want = \"int\" if e[1] == \"-\" else \"bool\"\n                if t == \"error\":\n                    return \"error\"\n                if t != want:\n                    errors.append((\"operand\", e[1]))\n                    return \"error\"\n                return want\n            if kind == \"bin\":\n                op, a, b = e[1], ty(e[2]), ty(e[3])\n                if a == \"error\" or b == \"error\":\n                    return \"error\"\n                if op in ARITH or op in ORDER:\n                    ok = a == b == \"int\"\n                elif op in (\"&&\", \"||\"):\n                    ok = a == b == \"bool\"\n                else:\n                    ok = a == b\n                if not ok:\n                    errors.append((\"operand\", op))\n                    return \"error\"\n                return \"int\" if op in ARITH else \"bool\"\n            if kind == \"call\":\n                args = [ty(a) for a in e[2]]\n                if e[1] not in funs:\n                    errors.append((\"undeclared\", e[1]))\n                    return \"error\"\n                params_t, result = funs[e[1]]\n                if len(args) != len(params_t) or any(a != p and a != \"error\" for a, p in zip(args, params_t)):\n                    errors.append((\"args\", e[1]))\n                return result\n\n        def stmt(s):\n            kind = s[0]\n            if kind == \"vardecl\":\n                t = ty(s[3])\n                if s[1] in scopes[-1]:\n                    errors.append((\"redeclared\", s[1]))\n                elif t not in (s[2], \"error\"):\n                    errors.append((\"mismatch\", s[1]))\n                scopes[-1][s[1]] = s[2]\n            elif kind == \"assign\":\n                t = ty(s[2])\n                vt = lookup(s[1])\n                if vt is None:\n                    errors.append((\"undeclared\", s[1]))\n                elif t not in (vt, \"error\"):\n                    errors.append((\"mismatch\", s[1]))\n            elif kind in (\"if\", \"while\"):\n                if ty(s[1]) not in (\"bool\", \"error\"):\n                    errors.append((\"condition\", kind))\n                stmt(s[2])\n                if kind == \"if\" and s[3] is not None:\n                    stmt(s[3])\n            elif kind == \"return\":\n                if ty(s[1]) not in (rt, \"error\"):\n                    errors.append((\"return\", name))\n            elif kind in (\"print\", \"expr\"):\n                ty(s[1])\n            elif kind == \"block\":\n                scopes.append({})\n                for t in s[1]:\n                    stmt(t)\n                scopes.pop()\n\n        stmt(body)\n        if not returns(body):\n            errors.append((\"noreturn\", name))\n    return errors\n",
   "tests": [
    {
     "label": "A correct program has no errors",
     "call": "check_program(('program', [('fun', 'gcd', [('a', 'int'), ('b', 'int')], 'int', ('block', [('while', ('bin', '!=', ('var', 'b'), ('num', 0)), ('block', [('vardecl', 't', 'int', ('bin', '%', ('var', 'a'), ('var', 'b'))), ('assign', 'a', ('var', 'b')), ('assign', 'b', ('var', 't'))])), ('return', ('var', 'a'))])), ('fun', 'main', [], 'int', ('block', [('print', ('call', 'gcd', [('num', 48), ('num', 18)])), ('vardecl', 'ok', 'bool', ('bin', '&&', ('bin', '==', ('call', 'gcd', [('num', 4), ('num', 2)]), ('num', 2)), ('bool', True))), ('return', ('num', 0))]))]))",
     "expect": "[]"
    },
    {
     "label": "Calls before definitions and recursion",
     "call": "check_program(('program', [('fun', 'main', [], 'int', ('block', [('print', ('call', 'even', [('num', 10)])), ('return', ('num', 0))])), ('fun', 'even', [('n', 'int')], 'bool', ('block', [('if', ('bin', '==', ('var', 'n'), ('num', 0)), ('block', [('return', ('bool', True))]), ('block', [('return', ('call', 'odd', [('bin', '-', ('var', 'n'), ('num', 1))]))]))])), ('fun', 'odd', [('n', 'int')], 'bool', ('block', [('if', ('bin', '==', ('var', 'n'), ('num', 0)), ('block', [('return', ('bool', False))]), ('block', [('return', ('call', 'even', [('bin', '-', ('var', 'n'), ('num', 1))]))]))]))]))",
     "expect": "[]"
    },
    {
     "label": "The lesson's first example",
     "call": "check_program(('program', [('fun', 'main', [], 'int', ('block', [('vardecl', 'x', 'int', ('bin', '+', ('var', 'y'), ('num', 1))), ('vardecl', 'ok', 'bool', ('num', 3)), ('if', ('var', 'x'), ('block', [('print', ('num', 1))]), None), ('return', ('call', 'gcd', [('var', 'x')]))]))]))",
     "expect": "[('undeclared', 'y'), ('mismatch', 'ok'), ('condition', 'if'), ('undeclared', 'gcd')]"
    },
    {
     "label": "Operand errors and no cascades",
     "call": "check_program(('program', [('fun', 'f', [('n', 'int'), ('ok', 'bool')], 'int', ('block', [('print', ('bin', '<', ('bin', '<', ('var', 'n'), ('num', 1)), ('num', 2))), ('print', ('bin', '&&', ('var', 'ok'), ('bin', '+', ('var', 'm'), ('num', 1)))), ('print', ('bin', '+', ('bin', '*', ('unary', '-', ('var', 'ok')), ('num', 2)), ('num', 3))), ('print', ('unary', '!', ('bin', '==', ('var', 'n'), ('var', 'ok')))), ('return', ('var', 'n'))]))]))",
     "expect": "[('operand', '<'), ('undeclared', 'm'), ('operand', '-'), ('operand', '==')]"
    },
    {
     "label": "Arguments",
     "call": "check_program(('program', [('fun', 'g', [('a', 'int'), ('b', 'bool')], 'int', ('block', [('return', ('var', 'a'))])), ('fun', 'main', [], 'int', ('block', [('print', ('call', 'g', [('num', 1)])), ('print', ('call', 'g', [('bool', True), ('num', 1)])), ('print', ('call', 'g', [('num', 1), ('bool', True)])), ('print', ('call', 'g', [('var', 'z'), ('bool', True)])), ('return', ('bin', '+', ('call', 'g', [('num', 1), ('bin', '<', ('num', 2), ('num', 3))]), ('num', 0)))]))]))",
     "expect": "[('args', 'g'), ('args', 'g'), ('undeclared', 'z')]"
    },
    {
     "label": "Assignments and declarations",
     "call": "check_program(('program', [('fun', 'main', [], 'int', ('block', [('vardecl', 'a', 'int', ('num', 1)), ('assign', 'a', ('bool', True)), ('assign', 'b', ('num', 2)), ('vardecl', 'a', 'bool', ('bool', False)), ('block', [('vardecl', 'a', 'bool', ('bool', True)), ('assign', 'a', ('bool', False))]), ('vardecl', 'c', 'bool', ('var', 'a')), ('return', ('num', 0))]))]))",
     "expect": "[('mismatch', 'a'), ('undeclared', 'b'), ('redeclared', 'a')]"
    },
    {
     "label": "Conditions, returns and missing returns",
     "call": "check_program(('program', [('fun', 'f', [('x', 'int')], 'bool', ('block', [('if', ('var', 'x'), ('block', [('return', ('num', 1))]), None), ('while', ('bin', '<', ('var', 'x'), ('num', 1)), ('block', []))])), ('fun', 'g', [('x', 'int')], 'int', ('block', [('if', ('bin', '>', ('var', 'x'), ('num', 0)), ('block', [('return', ('num', 1))]), ('block', [('if', ('bin', '<', ('var', 'x'), ('num', 0)), ('block', [('return', ('unary', '-', ('num', 1)))]), None)]))])), ('fun', 'h', [('x', 'int')], 'int', ('block', [('if', ('bin', '>', ('var', 'x'), ('num', 0)), ('block', [('return', ('num', 1))]), None), ('return', ('num', 0))]))]))",
     "expect": "[('condition', 'if'), ('return', 'f'), ('noreturn', 'f'), ('noreturn', 'g')]"
    },
    {
     "label": "Duplicate functions and parameters",
     "call": "check_program(('program', [('fun', 'f', [('a', 'int'), ('a', 'int')], 'int', ('block', [('return', ('var', 'a'))])), ('fun', 'f', [], 'bool', ('block', [('return', ('bool', True))])), ('fun', 'main', [], 'int', ('block', [('vardecl', 'b', 'int', ('call', 'f', [('num', 1), ('num', 2)])), ('return', ('num', 0))]))]))",
     "expect": "[('redeclared', 'f'), ('redeclared', 'a')]"
    },
    {
     "label": "Scopes end with their blocks",
     "call": "check_program(('program', [('fun', 'main', [], 'int', ('block', [('if', ('bool', True), ('block', [('vardecl', 't', 'int', ('num', 1))]), None), ('print', ('var', 't')), ('while', ('bool', False), ('block', [('vardecl', 'u', 'bool', ('bool', True))])), ('assign', 'u', ('num', 2)), ('return', ('num', 0))]))]))",
     "expect": "[('undeclared', 't'), ('undeclared', 'u')]",
     "hidden": true
    },
    {
     "label": "Calling an undeclared function, and a variable named like a function",
     "call": "check_program(('program', [('fun', 'f', [], 'int', ('block', [('return', ('num', 1))])), ('fun', 'main', [], 'int', ('block', [('vardecl', 'x', 'int', ('var', 'f')), ('print', ('call', 'nope', [('bin', '+', ('num', 1), ('bool', True))])), ('return', ('call', 'f', []))]))]))",
     "expect": "[('undeclared', 'f'), ('operand', '+'), ('undeclared', 'nope')]",
     "hidden": true
    }
   ]
  }
 ],
 "cp4": [
  {
   "id": "stack_vm",
   "title": "The virtual machine, with calls",
   "prompt": "<p>Write <code>run(code)</code>, the complete virtual machine for Lesson 4's bytecode. <code>code</code> is a list of instruction tuples; start at address 0 with an empty stack and <code>fp = 0</code>, and return the list of values printed when <code>(\"halt\",)</code> is reached. Implement every instruction in the notes' table:</p>\n<ul>\n<li><code>const</code>, <code>pop</code>, <code>print</code>, <code>halt</code>, <code>jump</code>, <code>jumpz</code>, <code>neg</code>, <code>not</code>, and the binary operations <code>add sub mul div mod lt le gt ge eq ne</code> (pop <em>b</em>, then <em>a</em>; push <em>a</em> op <em>b</em>; comparisons push 1 or 0). <code>div</code> rounds toward zero and <code>mod</code> is <em>a</em> − <em>b</em> × (<em>a</em> <code>div</code> <em>b</em>), as in C; division or <code>mod</code> by 0 raises <code>ZeroDivisionError</code>.</li>\n<li><code>(\"load\", i)</code> and <code>(\"store\", i)</code> use <code>stack[fp + i]</code>; <code>(\"alloc\", k)</code> pushes <em>k</em> zeros.</li>\n<li><code>(\"call\", t, n)</code>: save the pair (return address, <code>fp</code>) on a separate list of frames, where the return address is the address just after the call; set <code>fp</code> to <code>len(stack) - n</code>, so the top <em>n</em> values become slots 0 to <em>n</em> − 1; jump to <em>t</em>.</li>\n<li><code>(\"ret\",)</code>: pop the return value, delete the stack from <code>fp</code> up, restore the return address and <code>fp</code> from the frames list, and push the return value.</li>\n</ul>",
   "starter": "def run(code):\n    pass\n",
   "hint": "<p>Start from the notes' <code>run</code>, which handles everything except frames. Add <code>fp</code> and a <code>frames</code> list, change <code>load</code> and <code>store</code> to index from <code>fp</code>, and add <code>call</code> and <code>ret</code>. Remember that <code>pc</code> has already been advanced past the call when you save it.</p>",
   "solution": "def cdiv(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\nBINARY = {\n    \"add\": lambda a, b: a + b, \"sub\": lambda a, b: a - b, \"mul\": lambda a, b: a * b,\n    \"div\": cdiv, \"mod\": lambda a, b: a - b * cdiv(a, b),\n    \"lt\": lambda a, b: int(a < b), \"le\": lambda a, b: int(a <= b),\n    \"gt\": lambda a, b: int(a > b), \"ge\": lambda a, b: int(a >= b),\n    \"eq\": lambda a, b: int(a == b), \"ne\": lambda a, b: int(a != b),\n}\n\ndef run(code):\n    stack, frames, out = [], [], []\n    pc, fp = 0, 0\n    while True:\n        ins = code[pc]\n        op = ins[0]\n        pc += 1\n        if op == \"const\":\n            stack.append(ins[1])\n        elif op == \"load\":\n            stack.append(stack[fp + ins[1]])\n        elif op == \"store\":\n            stack[fp + ins[1]] = stack.pop()\n        elif op == \"alloc\":\n            stack.extend([0] * ins[1])\n        elif op in BINARY:\n            b = stack.pop()\n            a = stack.pop()\n            if op in (\"div\", \"mod\") and b == 0:\n                raise ZeroDivisionError(\"division by zero\")\n            stack.append(BINARY[op](a, b))\n        elif op == \"neg\":\n            stack.append(-stack.pop())\n        elif op == \"not\":\n            stack.append(1 if stack.pop() == 0 else 0)\n        elif op == \"jump\":\n            pc = ins[1]\n        elif op == \"jumpz\":\n            if stack.pop() == 0:\n                pc = ins[1]\n        elif op == \"call\":\n            frames.append((pc, fp))\n            fp = len(stack) - ins[2]\n            pc = ins[1]\n        elif op == \"ret\":\n            value = stack.pop()\n            del stack[fp:]\n            pc, fp = frames.pop()\n            stack.append(value)\n        elif op == \"pop\":\n            stack.pop()\n        elif op == \"print\":\n            out.append(stack.pop())\n        elif op == \"halt\":\n            return out\n        else:\n            raise ValueError(\"unknown instruction \" + op)\n",
   "tests": [
    {
     "label": "Arithmetic and printing",
     "call": "run([('const', 6), ('const', 7), ('mul',), ('print',), ('const', 2), ('const', 9), ('sub',), ('print',), ('halt',)])",
     "expect": "[42, -7]"
    },
    {
     "label": "Division rounds toward zero",
     "call": "run([('const', -7), ('const', 2), ('div',), ('print',), ('const', -7), ('const', 2), ('mod',), ('print',), ('const', 7), ('const', -2), ('div',), ('print',), ('const', 7), ('const', -2), ('mod',), ('print',), ('halt',)])",
     "expect": "[-3, -1, -3, 1]"
    },
    {
     "label": "Comparisons, neg and not",
     "call": "run([('const', 3), ('const', 5), ('lt',), ('print',), ('const', 5), ('const', 5), ('le',), ('print',), ('const', 2), ('const', 1), ('gt',), ('not',), ('print',), ('const', 4), ('neg',), ('print',), ('const', 0), ('const', 0), ('ne',), ('print',), ('halt',)])",
     "expect": "[1, 1, 0, -4, 0]"
    },
    {
     "label": "A loop with locals (the notes' example)",
     "call": "run([('alloc', 2), ('const', 4), ('store', 0), ('const', 0), ('store', 1), ('load', 0), ('const', 0), ('gt',), ('jumpz', 18), ('load', 1), ('load', 0), ('add',), ('store', 1), ('load', 0), ('const', 1), ('sub',), ('store', 0), ('jump', 5), ('load', 1), ('print',), ('halt',)])",
     "expect": "[10]"
    },
    {
     "label": "A call with two arguments, in order",
     "call": "run([('const', 10), ('const', 3), ('call', 4, 2), ('halt',), ('load', 0), ('load', 1), ('sub',), ('print',), ('const', 0), ('ret',)])",
     "expect": "[7]"
    },
    {
     "label": "ret removes the callee's frame",
     "call": "run([('const', 100), ('const', 5), ('call', 7, 1), ('add',), ('print',), ('halt',), ('halt',), ('alloc', 2), ('const', 1), ('const', 2), ('load', 0), ('const', 2), ('mul',), ('ret',)])",
     "expect": "[110]"
    },
    {
     "label": "Recursive factorial",
     "call": "run([('call', 16, 0), ('halt',), ('alloc', 0), ('load', 0), ('const', 1), ('le',), ('jumpz', 9), ('const', 1), ('ret',), ('load', 0), ('load', 0), ('const', 1), ('sub',), ('call', 2, 1), ('mul',), ('ret',), ('alloc', 0), ('const', 5), ('call', 2, 1), ('print',), ('const', 0), ('ret',)])",
     "expect": "[120]"
    },
    {
     "label": "gcd with a local variable",
     "call": "run([('call', 18, 0), ('halt',), ('alloc', 1), ('load', 1), ('const', 0), ('ne',), ('jumpz', 16), ('load', 0), ('load', 1), ('mod',), ('store', 2), ('load', 1), ('store', 0), ('load', 2), ('store', 1), ('jump', 3), ('load', 0), ('ret',), ('alloc', 0), ('const', 48), ('const', 18), ('call', 2, 2), ('print',), ('const', 17), ('const', 5), ('call', 2, 2), ('print',), ('const', 0), ('ret',)])",
     "expect": "[6, 1]"
    },
    {
     "label": "Fibonacci: many nested calls",
     "call": "run([('call', 19, 0), ('halt',), ('alloc', 0), ('load', 0), ('const', 2), ('lt',), ('jumpz', 9), ('load', 0), ('ret',), ('load', 0), ('const', 1), ('sub',), ('call', 2, 1), ('load', 0), ('const', 2), ('sub',), ('call', 2, 1), ('add',), ('ret',), ('alloc', 0), ('const', 15), ('call', 2, 1), ('print',), ('const', 0), ('ret',)])",
     "expect": "[610]"
    },
    {
     "label": "Division by zero raises ZeroDivisionError",
     "type": "raises",
     "call": "run([('const', 1), ('const', 0), ('div',), ('halt',)])",
     "error": "ZeroDivisionError"
    },
    {
     "label": "mod by zero too",
     "type": "raises",
     "call": "run([('const', 1), ('const', 0), ('mod',), ('halt',)])",
     "error": "ZeroDivisionError",
     "hidden": true
    },
    {
     "label": "Mutual recursion and pop",
     "call": "run([('call', 31, 0), ('halt',), ('alloc', 0), ('load', 0), ('const', 0), ('eq',), ('jumpz', 9), ('const', 1), ('ret',), ('load', 0), ('const', 1), ('sub',), ('call', 14, 1), ('ret',), ('alloc', 0), ('load', 0), ('const', 0), ('eq',), ('jumpz', 21), ('const', 0), ('ret',), ('load', 0), ('const', 1), ('sub',), ('call', 2, 1), ('ret',), ('alloc', 0), ('load', 0), ('print',), ('load', 0), ('ret',), ('alloc', 0), ('const', 7), ('call', 26, 1), ('pop',), ('const', 10), ('call', 2, 1), ('print',), ('const', 7), ('call', 14, 1), ('print',), ('const', 3), ('call', 2, 1), ('print',), ('const', 0), ('ret',)])",
     "expect": "[7, 1, 1, 0]",
     "hidden": true
    }
   ]
  },
  {
   "id": "codegen",
   "title": "Compiling Mini to bytecode",
   "prompt": "<p>Write <code>compile_program(prog)</code>, which compiles a whole, already checked Mini program (Lesson 2's tuple <code>(\"program\", [fun, ...])</code>) to a list of bytecode instructions for the VM of the previous problem. The tests run your code on a reference VM and compare what it prints.</p>\n<ul>\n<li>Start with <code>(\"call\", main, 0)</code> and <code>(\"halt\",)</code>, where <code>main</code> is the address of the function <code>main</code>; then compile each function in order.</li>\n<li>A function with <em>p</em> parameters starts with <code>(\"alloc\", k)</code>, where <em>k</em> is the number of <code>var</code> declarations in its body. Slots follow the resolver problem: parameters 0 to <em>p</em> − 1, then each declaration the next number, in order, with nested scopes and shadowing.</li>\n<li>Expressions as in the notes: <code>true</code> and <code>false</code> are 1 and 0; <code>-</code> and <code>!</code> are <code>neg</code> and <code>not</code>; <code>&amp;&amp;</code> and <code>||</code> must short-circuit (the right side must not run when the left decides the answer); a call pushes its arguments left to right, then <code>(\"call\", address, n)</code>.</li>\n<li>Statements: <code>var</code> and assignment store into the slot; <code>print</code>; <code>return e</code> is <code>e</code> then <code>ret</code>; an expression statement is <code>e</code> then <code>pop</code>; <code>if</code>, <code>else</code> and <code>while</code> with jumps, as in the notes.</li>\n<li>Calls may name functions defined later: backpatch their addresses after all functions are placed.</li>\n</ul>\n<p>At <code>halt</code>, the stack must hold exactly one value, <code>main</code>'s return value (the tests check this, which catches an expression statement that forgets its <code>pop</code>). Each test shows the Mini source; the function receives its parsed tuple.</p>",
   "starter": "def compile_program(prog):\n    pass\n",
   "hint": "<p>Keep one code list for the whole program, a dict of function addresses, and a list of (call position, function name) pairs to patch at the end. For each function, keep a scope stack mapping names to slots and a slot counter; emit <code>(\"alloc\", 0)</code> first and patch its count when the function is finished. Reuse the notes' <code>CodeGen</code> methods for expressions and statements, and add <code>||</code>, calls, <code>return</code> and expression statements.</p>",
   "solution": "OPS = {\"+\": \"add\", \"-\": \"sub\", \"*\": \"mul\", \"/\": \"div\", \"%\": \"mod\", \"<\": \"lt\", \"<=\": \"le\",\n       \">\": \"gt\", \">=\": \"ge\", \"==\": \"eq\", \"!=\": \"ne\"}\n\ndef compile_program(prog):\n    code = [(\"call\", None, 0), (\"halt\",)]\n    calls = [(0, \"main\")]\n    address = {}\n\n    def emit(*ins):\n        code.append(ins)\n        return len(code) - 1\n\n    def patch(at):\n        code[at] = (code[at][0], len(code))\n\n    for _, name, params, rettype, body in prog[1]:\n        address[name] = len(code)\n        scopes = [{p: i for i, (p, _) in enumerate(params)}]\n        count = [len(params)]\n        alloc_at = emit(\"alloc\", 0)\n\n        def slot(x):\n            for scope in reversed(scopes):\n                if x in scope:\n                    return scope[x]\n\n        def expr(e):\n            kind = e[0]\n            if kind == \"num\":\n                emit(\"const\", e[1])\n            elif kind == \"bool\":\n                emit(\"const\", 1 if e[1] else 0)\n            elif kind == \"var\":\n                emit(\"load\", slot(e[1]))\n            elif kind == \"unary\":\n                expr(e[2])\n                emit(\"neg\" if e[1] == \"-\" else \"not\")\n            elif kind == \"bin\" and e[1] == \"&&\":\n                expr(e[2])\n                j1 = emit(\"jumpz\", None)\n                expr(e[3])\n                j2 = emit(\"jump\", None)\n                patch(j1)\n                emit(\"const\", 0)\n                patch(j2)\n            elif kind == \"bin\" and e[1] == \"||\":\n                expr(e[2])\n                j1 = emit(\"jumpz\", None)\n                emit(\"const\", 1)\n                j2 = emit(\"jump\", None)\n                patch(j1)\n                expr(e[3])\n                patch(j2)\n            elif kind == \"bin\":\n                expr(e[2])\n                expr(e[3])\n                emit(OPS[e[1]])\n            elif kind == \"call\":\n                for a in e[2]:\n                    expr(a)\n                calls.append((emit(\"call\", None, len(e[2])), e[1]))\n\n        def stmt(s):\n            kind = s[0]\n            if kind == \"vardecl\":\n                expr(s[3])\n                scopes[-1][s[1]] = count[0]\n                count[0] += 1\n                emit(\"store\", scopes[-1][s[1]])\n            elif kind == \"assign\":\n                expr(s[2])\n                emit(\"store\", slot(s[1]))\n            elif kind == \"print\":\n                expr(s[1])\n                emit(\"print\")\n            elif kind == \"expr\":\n                expr(s[1])\n                emit(\"pop\")\n            elif kind == \"return\":\n                expr(s[1])\n                emit(\"ret\")\n            elif kind == \"block\":\n                scopes.append({})\n                for t in s[1]:\n                    stmt(t)\n                scopes.pop()\n            elif kind == \"if\":\n                expr(s[1])\n                j_else = emit(\"jumpz\", None)\n                stmt(s[2])\n                if s[3] is None:\n                    patch(j_else)\n                else:\n                    j_end = emit(\"jump\", None)\n                    patch(j_else)\n                    stmt(s[3])\n                    patch(j_end)\n            elif kind == \"while\":\n                top = len(code)\n                expr(s[1])\n                j_end = emit(\"jumpz\", None)\n                stmt(s[2])\n                emit(\"jump\", top)\n                patch(j_end)\n\n        stmt(body)\n        code[alloc_at] = (\"alloc\", count[0] - len(params))\n    for at, name in calls:\n        code[at] = (\"call\", address[name], code[at][2])\n    return code\n",
   "tests": [
    {
     "label": "Printing arithmetic",
     "type": "assert",
     "code": "def cdiv(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\nBINARY = {\n    \"add\": lambda a, b: a + b, \"sub\": lambda a, b: a - b, \"mul\": lambda a, b: a * b,\n    \"div\": cdiv, \"mod\": lambda a, b: a - b * cdiv(a, b),\n    \"lt\": lambda a, b: int(a < b), \"le\": lambda a, b: int(a <= b),\n    \"gt\": lambda a, b: int(a > b), \"ge\": lambda a, b: int(a >= b),\n    \"eq\": lambda a, b: int(a == b), \"ne\": lambda a, b: int(a != b),\n}\n\ndef ref_run(code):\n    stack, frames, out = [], [], []\n    pc, fp = 0, 0\n    while True:\n        ins = code[pc]\n        op = ins[0]\n        pc += 1\n        if op == \"const\":\n            stack.append(ins[1])\n        elif op == \"load\":\n            stack.append(stack[fp + ins[1]])\n        elif op == \"store\":\n            stack[fp + ins[1]] = stack.pop()\n        elif op == \"alloc\":\n            stack.extend([0] * ins[1])\n        elif op in BINARY:\n            b = stack.pop()\n            a = stack.pop()\n            if op in (\"div\", \"mod\") and b == 0:\n                raise ZeroDivisionError(\"division by zero\")\n            stack.append(BINARY[op](a, b))\n        elif op == \"neg\":\n            stack.append(-stack.pop())\n        elif op == \"not\":\n            stack.append(1 if stack.pop() == 0 else 0)\n        elif op == \"jump\":\n            pc = ins[1]\n        elif op == \"jumpz\":\n            if stack.pop() == 0:\n                pc = ins[1]\n        elif op == \"call\":\n            frames.append((pc, fp))\n            fp = len(stack) - ins[2]\n            pc = ins[1]\n        elif op == \"ret\":\n            value = stack.pop()\n            del stack[fp:]\n            pc, fp = frames.pop()\n            stack.append(value)\n        elif op == \"pop\":\n            stack.pop()\n        elif op == \"print\":\n            out.append(stack.pop())\n        elif op == \"halt\":\n            return out, stack\n        else:\n            raise ValueError(\"unknown instruction \" + op)\n\nprog = ('program', [('fun', 'main', [], 'int', ('block', [('print', ('bin', '+', ('num', 1), ('bin', '*', ('num', 2), ('num', 3)))), ('print', ('bin', '*', ('bin', '+', ('num', 1), ('num', 2)), ('num', 3))), ('print', ('bin', '/', ('unary', '-', ('num', 7)), ('num', 2))), ('print', ('bin', '%', ('unary', '-', ('num', 7)), ('num', 2))), ('print', ('bin', '-', ('bin', '%', ('num', 17), ('num', 5)), ('bin', '/', ('num', 10), ('num', 3)))), ('return', ('num', 0))]))])\nout, stack = ref_run(compile_program(prog))\nassert out == [7, 9, -3, -1, -1], (\"printed\", out, \"expected\", [7, 9, -3, -1, -1])\nassert len(stack) == 1, (\"at halt the stack should hold only main's return value\", stack)\n"
    },
    {
     "label": "Variables and assignment",
     "type": "assert",
     "code": "def cdiv(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\nBINARY = {\n    \"add\": lambda a, b: a + b, \"sub\": lambda a, b: a - b, \"mul\": lambda a, b: a * b,\n    \"div\": cdiv, \"mod\": lambda a, b: a - b * cdiv(a, b),\n    \"lt\": lambda a, b: int(a < b), \"le\": lambda a, b: int(a <= b),\n    \"gt\": lambda a, b: int(a > b), \"ge\": lambda a, b: int(a >= b),\n    \"eq\": lambda a, b: int(a == b), \"ne\": lambda a, b: int(a != b),\n}\n\ndef ref_run(code):\n    stack, frames, out = [], [], []\n    pc, fp = 0, 0\n    while True:\n        ins = code[pc]\n        op = ins[0]\n        pc += 1\n        if op == \"const\":\n            stack.append(ins[1])\n        elif op == \"load\":\n            stack.append(stack[fp + ins[1]])\n        elif op == \"store\":\n            stack[fp + ins[1]] = stack.pop()\n        elif op == \"alloc\":\n            stack.extend([0] * ins[1])\n        elif op in BINARY:\n            b = stack.pop()\n            a = stack.pop()\n            if op in (\"div\", \"mod\") and b == 0:\n                raise ZeroDivisionError(\"division by zero\")\n            stack.append(BINARY[op](a, b))\n        elif op == \"neg\":\n            stack.append(-stack.pop())\n        elif op == \"not\":\n            stack.append(1 if stack.pop() == 0 else 0)\n        elif op == \"jump\":\n            pc = ins[1]\n        elif op == \"jumpz\":\n            if stack.pop() == 0:\n                pc = ins[1]\n        elif op == \"call\":\n            frames.append((pc, fp))\n            fp = len(stack) - ins[2]\n            pc = ins[1]\n        elif op == \"ret\":\n            value = stack.pop()\n            del stack[fp:]\n            pc, fp = frames.pop()\n            stack.append(value)\n        elif op == \"pop\":\n            stack.pop()\n        elif op == \"print\":\n            out.append(stack.pop())\n        elif op == \"halt\":\n            return out, stack\n        else:\n            raise ValueError(\"unknown instruction \" + op)\n\nprog = ('program', [('fun', 'main', [], 'int', ('block', [('vardecl', 'x', 'int', ('num', 5)), ('vardecl', 'y', 'int', ('bin', '*', ('var', 'x'), ('num', 2))), ('assign', 'x', ('bin', '-', ('var', 'y'), ('num', 1))), ('print', ('var', 'x')), ('print', ('var', 'y')), ('return', ('num', 0))]))])\nout, stack = ref_run(compile_program(prog))\nassert out == [9, 10], (\"printed\", out, \"expected\", [9, 10])\nassert len(stack) == 1, (\"at halt the stack should hold only main's return value\", stack)\n"
    },
    {
     "label": "if, else if and else",
     "type": "assert",
     "code": "def cdiv(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\nBINARY = {\n    \"add\": lambda a, b: a + b, \"sub\": lambda a, b: a - b, \"mul\": lambda a, b: a * b,\n    \"div\": cdiv, \"mod\": lambda a, b: a - b * cdiv(a, b),\n    \"lt\": lambda a, b: int(a < b), \"le\": lambda a, b: int(a <= b),\n    \"gt\": lambda a, b: int(a > b), \"ge\": lambda a, b: int(a >= b),\n    \"eq\": lambda a, b: int(a == b), \"ne\": lambda a, b: int(a != b),\n}\n\ndef ref_run(code):\n    stack, frames, out = [], [], []\n    pc, fp = 0, 0\n    while True:\n        ins = code[pc]\n        op = ins[0]\n        pc += 1\n        if op == \"const\":\n            stack.append(ins[1])\n        elif op == \"load\":\n            stack.append(stack[fp + ins[1]])\n        elif op == \"store\":\n            stack[fp + ins[1]] = stack.pop()\n        elif op == \"alloc\":\n            stack.extend([0] * ins[1])\n        elif op in BINARY:\n            b = stack.pop()\n            a = stack.pop()\n            if op in (\"div\", \"mod\") and b == 0:\n                raise ZeroDivisionError(\"division by zero\")\n            stack.append(BINARY[op](a, b))\n        elif op == \"neg\":\n            stack.append(-stack.pop())\n        elif op == \"not\":\n            stack.append(1 if stack.pop() == 0 else 0)\n        elif op == \"jump\":\n            pc = ins[1]\n        elif op == \"jumpz\":\n            if stack.pop() == 0:\n                pc = ins[1]\n        elif op == \"call\":\n            frames.append((pc, fp))\n            fp = len(stack) - ins[2]\n            pc = ins[1]\n        elif op == \"ret\":\n            value = stack.pop()\n            del stack[fp:]\n            pc, fp = frames.pop()\n            stack.append(value)\n        elif op == \"pop\":\n            stack.pop()\n        elif op == \"print\":\n            out.append(stack.pop())\n        elif op == \"halt\":\n            return out, stack\n        else:\n            raise ValueError(\"unknown instruction \" + op)\n\nprog = ('program', [('fun', 'main', [], 'int', ('block', [('vardecl', 'n', 'int', ('num', 0)), ('while', ('bin', '<', ('var', 'n'), ('num', 4)), ('block', [('if', ('bin', '==', ('var', 'n'), ('num', 0)), ('block', [('print', ('num', 100))]), ('block', [('if', ('bin', '==', ('var', 'n'), ('num', 1)), ('block', [('print', ('num', 200))]), ('block', [('print', ('var', 'n'))]))])), ('assign', 'n', ('bin', '+', ('var', 'n'), ('num', 1)))])), ('return', ('num', 0))]))])\nout, stack = ref_run(compile_program(prog))\nassert out == [100, 200, 2, 3], (\"printed\", out, \"expected\", [100, 200, 2, 3])\nassert len(stack) == 1, (\"at halt the stack should hold only main's return value\", stack)\n"
    },
    {
     "label": "A while loop: sum of 1 to 10",
     "type": "assert",
     "code": "def cdiv(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\nBINARY = {\n    \"add\": lambda a, b: a + b, \"sub\": lambda a, b: a - b, \"mul\": lambda a, b: a * b,\n    \"div\": cdiv, \"mod\": lambda a, b: a - b * cdiv(a, b),\n    \"lt\": lambda a, b: int(a < b), \"le\": lambda a, b: int(a <= b),\n    \"gt\": lambda a, b: int(a > b), \"ge\": lambda a, b: int(a >= b),\n    \"eq\": lambda a, b: int(a == b), \"ne\": lambda a, b: int(a != b),\n}\n\ndef ref_run(code):\n    stack, frames, out = [], [], []\n    pc, fp = 0, 0\n    while True:\n        ins = code[pc]\n        op = ins[0]\n        pc += 1\n        if op == \"const\":\n            stack.append(ins[1])\n        elif op == \"load\":\n            stack.append(stack[fp + ins[1]])\n        elif op == \"store\":\n            stack[fp + ins[1]] = stack.pop()\n        elif op == \"alloc\":\n            stack.extend([0] * ins[1])\n        elif op in BINARY:\n            b = stack.pop()\n            a = stack.pop()\n            if op in (\"div\", \"mod\") and b == 0:\n                raise ZeroDivisionError(\"division by zero\")\n            stack.append(BINARY[op](a, b))\n        elif op == \"neg\":\n            stack.append(-stack.pop())\n        elif op == \"not\":\n            stack.append(1 if stack.pop() == 0 else 0)\n        elif op == \"jump\":\n            pc = ins[1]\n        elif op == \"jumpz\":\n            if stack.pop() == 0:\n                pc = ins[1]\n        elif op == \"call\":\n            frames.append((pc, fp))\n            fp = len(stack) - ins[2]\n            pc = ins[1]\n        elif op == \"ret\":\n            value = stack.pop()\n            del stack[fp:]\n            pc, fp = frames.pop()\n            stack.append(value)\n        elif op == \"pop\":\n            stack.pop()\n        elif op == \"print\":\n            out.append(stack.pop())\n        elif op == \"halt\":\n            return out, stack\n        else:\n            raise ValueError(\"unknown instruction \" + op)\n\nprog = ('program', [('fun', 'main', [], 'int', ('block', [('vardecl', 'i', 'int', ('num', 1)), ('vardecl', 's', 'int', ('num', 0)), ('while', ('bin', '<=', ('var', 'i'), ('num', 10)), ('block', [('assign', 's', ('bin', '+', ('var', 's'), ('var', 'i'))), ('assign', 'i', ('bin', '+', ('var', 'i'), ('num', 1)))])), ('print', ('var', 's')), ('return', ('num', 0))]))])\nout, stack = ref_run(compile_program(prog))\nassert out == [55], (\"printed\", out, \"expected\", [55])\nassert len(stack) == 1, (\"at halt the stack should hold only main's return value\", stack)\n"
    },
    {
     "label": "Booleans print as 1 and 0",
     "type": "assert",
     "code": "def cdiv(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\nBINARY = {\n    \"add\": lambda a, b: a + b, \"sub\": lambda a, b: a - b, \"mul\": lambda a, b: a * b,\n    \"div\": cdiv, \"mod\": lambda a, b: a - b * cdiv(a, b),\n    \"lt\": lambda a, b: int(a < b), \"le\": lambda a, b: int(a <= b),\n    \"gt\": lambda a, b: int(a > b), \"ge\": lambda a, b: int(a >= b),\n    \"eq\": lambda a, b: int(a == b), \"ne\": lambda a, b: int(a != b),\n}\n\ndef ref_run(code):\n    stack, frames, out = [], [], []\n    pc, fp = 0, 0\n    while True:\n        ins = code[pc]\n        op = ins[0]\n        pc += 1\n        if op == \"const\":\n            stack.append(ins[1])\n        elif op == \"load\":\n            stack.append(stack[fp + ins[1]])\n        elif op == \"store\":\n            stack[fp + ins[1]] = stack.pop()\n        elif op == \"alloc\":\n            stack.extend([0] * ins[1])\n        elif op in BINARY:\n            b = stack.pop()\n            a = stack.pop()\n            if op in (\"div\", \"mod\") and b == 0:\n                raise ZeroDivisionError(\"division by zero\")\n            stack.append(BINARY[op](a, b))\n        elif op == \"neg\":\n            stack.append(-stack.pop())\n        elif op == \"not\":\n            stack.append(1 if stack.pop() == 0 else 0)\n        elif op == \"jump\":\n            pc = ins[1]\n        elif op == \"jumpz\":\n            if stack.pop() == 0:\n                pc = ins[1]\n        elif op == \"call\":\n            frames.append((pc, fp))\n            fp = len(stack) - ins[2]\n            pc = ins[1]\n        elif op == \"ret\":\n            value = stack.pop()\n            del stack[fp:]\n            pc, fp = frames.pop()\n            stack.append(value)\n        elif op == \"pop\":\n            stack.pop()\n        elif op == \"print\":\n            out.append(stack.pop())\n        elif op == \"halt\":\n            return out, stack\n        else:\n            raise ValueError(\"unknown instruction \" + op)\n\nprog = ('program', [('fun', 'main', [], 'int', ('block', [('vardecl', 't', 'bool', ('bool', True)), ('print', ('var', 't')), ('print', ('unary', '!', ('var', 't'))), ('print', ('bin', '==', ('bin', '>', ('num', 3), ('num', 2)), ('bool', True))), ('print', ('unary', '-', ('bin', '-', ('num', 4), ('num', 9)))), ('return', ('num', 0))]))])\nout, stack = ref_run(compile_program(prog))\nassert out == [1, 0, 1, 5], (\"printed\", out, \"expected\", [1, 0, 1, 5])\nassert len(stack) == 1, (\"at halt the stack should hold only main's return value\", stack)\n"
    },
    {
     "label": "gcd and factorial: calls, recursion, a local",
     "type": "assert",
     "code": "def cdiv(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\nBINARY = {\n    \"add\": lambda a, b: a + b, \"sub\": lambda a, b: a - b, \"mul\": lambda a, b: a * b,\n    \"div\": cdiv, \"mod\": lambda a, b: a - b * cdiv(a, b),\n    \"lt\": lambda a, b: int(a < b), \"le\": lambda a, b: int(a <= b),\n    \"gt\": lambda a, b: int(a > b), \"ge\": lambda a, b: int(a >= b),\n    \"eq\": lambda a, b: int(a == b), \"ne\": lambda a, b: int(a != b),\n}\n\ndef ref_run(code):\n    stack, frames, out = [], [], []\n    pc, fp = 0, 0\n    while True:\n        ins = code[pc]\n        op = ins[0]\n        pc += 1\n        if op == \"const\":\n            stack.append(ins[1])\n        elif op == \"load\":\n            stack.append(stack[fp + ins[1]])\n        elif op == \"store\":\n            stack[fp + ins[1]] = stack.pop()\n        elif op == \"alloc\":\n            stack.extend([0] * ins[1])\n        elif op in BINARY:\n            b = stack.pop()\n            a = stack.pop()\n            if op in (\"div\", \"mod\") and b == 0:\n                raise ZeroDivisionError(\"division by zero\")\n            stack.append(BINARY[op](a, b))\n        elif op == \"neg\":\n            stack.append(-stack.pop())\n        elif op == \"not\":\n            stack.append(1 if stack.pop() == 0 else 0)\n        elif op == \"jump\":\n            pc = ins[1]\n        elif op == \"jumpz\":\n            if stack.pop() == 0:\n                pc = ins[1]\n        elif op == \"call\":\n            frames.append((pc, fp))\n            fp = len(stack) - ins[2]\n            pc = ins[1]\n        elif op == \"ret\":\n            value = stack.pop()\n            del stack[fp:]\n            pc, fp = frames.pop()\n            stack.append(value)\n        elif op == \"pop\":\n            stack.pop()\n        elif op == \"print\":\n            out.append(stack.pop())\n        elif op == \"halt\":\n            return out, stack\n        else:\n            raise ValueError(\"unknown instruction \" + op)\n\nprog = ('program', [('fun', 'gcd', [('a', 'int'), ('b', 'int')], 'int', ('block', [('while', ('bin', '!=', ('var', 'b'), ('num', 0)), ('block', [('vardecl', 't', 'int', ('bin', '%', ('var', 'a'), ('var', 'b'))), ('assign', 'a', ('var', 'b')), ('assign', 'b', ('var', 't'))])), ('return', ('var', 'a'))])), ('fun', 'fact', [('n', 'int')], 'int', ('block', [('if', ('bin', '<=', ('var', 'n'), ('num', 1)), ('block', [('return', ('num', 1))]), None), ('return', ('bin', '*', ('var', 'n'), ('call', 'fact', [('bin', '-', ('var', 'n'), ('num', 1))])))])), ('fun', 'main', [], 'int', ('block', [('print', ('call', 'gcd', [('num', 48), ('num', 18)])), ('print', ('call', 'fact', [('num', 6)])), ('return', ('num', 0))]))])\nout, stack = ref_run(compile_program(prog))\nassert out == [6, 720], (\"printed\", out, \"expected\", [6, 720])\nassert len(stack) == 1, (\"at halt the stack should hold only main's return value\", stack)\n"
    },
    {
     "label": "&& short-circuits (no division by zero)",
     "type": "assert",
     "code": "def cdiv(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\nBINARY = {\n    \"add\": lambda a, b: a + b, \"sub\": lambda a, b: a - b, \"mul\": lambda a, b: a * b,\n    \"div\": cdiv, \"mod\": lambda a, b: a - b * cdiv(a, b),\n    \"lt\": lambda a, b: int(a < b), \"le\": lambda a, b: int(a <= b),\n    \"gt\": lambda a, b: int(a > b), \"ge\": lambda a, b: int(a >= b),\n    \"eq\": lambda a, b: int(a == b), \"ne\": lambda a, b: int(a != b),\n}\n\ndef ref_run(code):\n    stack, frames, out = [], [], []\n    pc, fp = 0, 0\n    while True:\n        ins = code[pc]\n        op = ins[0]\n        pc += 1\n        if op == \"const\":\n            stack.append(ins[1])\n        elif op == \"load\":\n            stack.append(stack[fp + ins[1]])\n        elif op == \"store\":\n            stack[fp + ins[1]] = stack.pop()\n        elif op == \"alloc\":\n            stack.extend([0] * ins[1])\n        elif op in BINARY:\n            b = stack.pop()\n            a = stack.pop()\n            if op in (\"div\", \"mod\") and b == 0:\n                raise ZeroDivisionError(\"division by zero\")\n            stack.append(BINARY[op](a, b))\n        elif op == \"neg\":\n            stack.append(-stack.pop())\n        elif op == \"not\":\n            stack.append(1 if stack.pop() == 0 else 0)\n        elif op == \"jump\":\n            pc = ins[1]\n        elif op == \"jumpz\":\n            if stack.pop() == 0:\n                pc = ins[1]\n        elif op == \"call\":\n            frames.append((pc, fp))\n            fp = len(stack) - ins[2]\n            pc = ins[1]\n        elif op == \"ret\":\n            value = stack.pop()\n            del stack[fp:]\n            pc, fp = frames.pop()\n            stack.append(value)\n        elif op == \"pop\":\n            stack.pop()\n        elif op == \"print\":\n            out.append(stack.pop())\n        elif op == \"halt\":\n            return out, stack\n        else:\n            raise ValueError(\"unknown instruction \" + op)\n\nprog = ('program', [('fun', 'main', [], 'int', ('block', [('vardecl', 'x', 'int', ('num', 0)), ('if', ('bin', '&&', ('bin', '!=', ('var', 'x'), ('num', 0)), ('bin', '>', ('bin', '/', ('num', 10), ('var', 'x')), ('num', 1))), ('block', [('print', ('num', 1))]), ('block', [('print', ('num', 2))])), ('assign', 'x', ('num', 5)), ('print', ('bin', '&&', ('bin', '!=', ('var', 'x'), ('num', 0)), ('bin', '>', ('bin', '/', ('num', 10), ('var', 'x')), ('num', 1)))), ('print', ('bin', '&&', ('bin', '>', ('var', 'x'), ('num', 9)), ('bin', '==', ('bin', '/', ('num', 1), ('num', 0)), ('num', 0)))), ('return', ('num', 0))]))])\nout, stack = ref_run(compile_program(prog))\nassert out == [2, 1, 0], (\"printed\", out, \"expected\", [2, 1, 0])\nassert len(stack) == 1, (\"at halt the stack should hold only main's return value\", stack)\n"
    },
    {
     "label": "|| short-circuits",
     "type": "assert",
     "code": "def cdiv(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\nBINARY = {\n    \"add\": lambda a, b: a + b, \"sub\": lambda a, b: a - b, \"mul\": lambda a, b: a * b,\n    \"div\": cdiv, \"mod\": lambda a, b: a - b * cdiv(a, b),\n    \"lt\": lambda a, b: int(a < b), \"le\": lambda a, b: int(a <= b),\n    \"gt\": lambda a, b: int(a > b), \"ge\": lambda a, b: int(a >= b),\n    \"eq\": lambda a, b: int(a == b), \"ne\": lambda a, b: int(a != b),\n}\n\ndef ref_run(code):\n    stack, frames, out = [], [], []\n    pc, fp = 0, 0\n    while True:\n        ins = code[pc]\n        op = ins[0]\n        pc += 1\n        if op == \"const\":\n            stack.append(ins[1])\n        elif op == \"load\":\n            stack.append(stack[fp + ins[1]])\n        elif op == \"store\":\n            stack[fp + ins[1]] = stack.pop()\n        elif op == \"alloc\":\n            stack.extend([0] * ins[1])\n        elif op in BINARY:\n            b = stack.pop()\n            a = stack.pop()\n            if op in (\"div\", \"mod\") and b == 0:\n                raise ZeroDivisionError(\"division by zero\")\n            stack.append(BINARY[op](a, b))\n        elif op == \"neg\":\n            stack.append(-stack.pop())\n        elif op == \"not\":\n            stack.append(1 if stack.pop() == 0 else 0)\n        elif op == \"jump\":\n            pc = ins[1]\n        elif op == \"jumpz\":\n            if stack.pop() == 0:\n                pc = ins[1]\n        elif op == \"call\":\n            frames.append((pc, fp))\n            fp = len(stack) - ins[2]\n            pc = ins[1]\n        elif op == \"ret\":\n            value = stack.pop()\n            del stack[fp:]\n            pc, fp = frames.pop()\n            stack.append(value)\n        elif op == \"pop\":\n            stack.pop()\n        elif op == \"print\":\n            out.append(stack.pop())\n        elif op == \"halt\":\n            return out, stack\n        else:\n            raise ValueError(\"unknown instruction \" + op)\n\nprog = ('program', [('fun', 'main', [], 'int', ('block', [('vardecl', 'x', 'int', ('num', 0)), ('print', ('bin', '||', ('bin', '==', ('var', 'x'), ('num', 0)), ('bin', '>', ('bin', '/', ('num', 1), ('var', 'x')), ('num', 0)))), ('print', ('bin', '||', ('bin', '>', ('var', 'x'), ('num', 0)), ('bin', '<', ('var', 'x'), ('num', 0)))), ('print', ('bin', '||', ('bool', False), ('bool', True))), ('return', ('num', 0))]))])\nout, stack = ref_run(compile_program(prog))\nassert out == [1, 0, 1], (\"printed\", out, \"expected\", [1, 0, 1])\nassert len(stack) == 1, (\"at halt the stack should hold only main's return value\", stack)\n"
    },
    {
     "label": "Functions defined after use, and argument order",
     "type": "assert",
     "code": "def cdiv(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\nBINARY = {\n    \"add\": lambda a, b: a + b, \"sub\": lambda a, b: a - b, \"mul\": lambda a, b: a * b,\n    \"div\": cdiv, \"mod\": lambda a, b: a - b * cdiv(a, b),\n    \"lt\": lambda a, b: int(a < b), \"le\": lambda a, b: int(a <= b),\n    \"gt\": lambda a, b: int(a > b), \"ge\": lambda a, b: int(a >= b),\n    \"eq\": lambda a, b: int(a == b), \"ne\": lambda a, b: int(a != b),\n}\n\ndef ref_run(code):\n    stack, frames, out = [], [], []\n    pc, fp = 0, 0\n    while True:\n        ins = code[pc]\n        op = ins[0]\n        pc += 1\n        if op == \"const\":\n            stack.append(ins[1])\n        elif op == \"load\":\n            stack.append(stack[fp + ins[1]])\n        elif op == \"store\":\n            stack[fp + ins[1]] = stack.pop()\n        elif op == \"alloc\":\n            stack.extend([0] * ins[1])\n        elif op in BINARY:\n            b = stack.pop()\n            a = stack.pop()\n            if op in (\"div\", \"mod\") and b == 0:\n                raise ZeroDivisionError(\"division by zero\")\n            stack.append(BINARY[op](a, b))\n        elif op == \"neg\":\n            stack.append(-stack.pop())\n        elif op == \"not\":\n            stack.append(1 if stack.pop() == 0 else 0)\n        elif op == \"jump\":\n            pc = ins[1]\n        elif op == \"jumpz\":\n            if stack.pop() == 0:\n                pc = ins[1]\n        elif op == \"call\":\n            frames.append((pc, fp))\n            fp = len(stack) - ins[2]\n            pc = ins[1]\n        elif op == \"ret\":\n            value = stack.pop()\n            del stack[fp:]\n            pc, fp = frames.pop()\n            stack.append(value)\n        elif op == \"pop\":\n            stack.pop()\n        elif op == \"print\":\n            out.append(stack.pop())\n        elif op == \"halt\":\n            return out, stack\n        else:\n            raise ValueError(\"unknown instruction \" + op)\n\nprog = ('program', [('fun', 'main', [], 'int', ('block', [('print', ('call', 'sub', [('num', 10), ('num', 3)])), ('print', ('call', 'sub', [('num', 3), ('num', 10)])), ('return', ('call', 'sub', [('num', 1), ('num', 1)]))])), ('fun', 'sub', [('a', 'int'), ('b', 'int')], 'int', ('block', [('return', ('bin', '-', ('var', 'a'), ('var', 'b')))]))])\nout, stack = ref_run(compile_program(prog))\nassert out == [7, -7], (\"printed\", out, \"expected\", [7, -7])\nassert len(stack) == 1, (\"at halt the stack should hold only main's return value\", stack)\n"
    },
    {
     "label": "Expression statements pop their result",
     "type": "assert",
     "code": "def cdiv(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\nBINARY = {\n    \"add\": lambda a, b: a + b, \"sub\": lambda a, b: a - b, \"mul\": lambda a, b: a * b,\n    \"div\": cdiv, \"mod\": lambda a, b: a - b * cdiv(a, b),\n    \"lt\": lambda a, b: int(a < b), \"le\": lambda a, b: int(a <= b),\n    \"gt\": lambda a, b: int(a > b), \"ge\": lambda a, b: int(a >= b),\n    \"eq\": lambda a, b: int(a == b), \"ne\": lambda a, b: int(a != b),\n}\n\ndef ref_run(code):\n    stack, frames, out = [], [], []\n    pc, fp = 0, 0\n    while True:\n        ins = code[pc]\n        op = ins[0]\n        pc += 1\n        if op == \"const\":\n            stack.append(ins[1])\n        elif op == \"load\":\n            stack.append(stack[fp + ins[1]])\n        elif op == \"store\":\n            stack[fp + ins[1]] = stack.pop()\n        elif op == \"alloc\":\n            stack.extend([0] * ins[1])\n        elif op in BINARY:\n            b = stack.pop()\n            a = stack.pop()\n            if op in (\"div\", \"mod\") and b == 0:\n                raise ZeroDivisionError(\"division by zero\")\n            stack.append(BINARY[op](a, b))\n        elif op == \"neg\":\n            stack.append(-stack.pop())\n        elif op == \"not\":\n            stack.append(1 if stack.pop() == 0 else 0)\n        elif op == \"jump\":\n            pc = ins[1]\n        elif op == \"jumpz\":\n            if stack.pop() == 0:\n                pc = ins[1]\n        elif op == \"call\":\n            frames.append((pc, fp))\n            fp = len(stack) - ins[2]\n            pc = ins[1]\n        elif op == \"ret\":\n            value = stack.pop()\n            del stack[fp:]\n            pc, fp = frames.pop()\n            stack.append(value)\n        elif op == \"pop\":\n            stack.pop()\n        elif op == \"print\":\n            out.append(stack.pop())\n        elif op == \"halt\":\n            return out, stack\n        else:\n            raise ValueError(\"unknown instruction \" + op)\n\nprog = ('program', [('fun', 'show', [('x', 'int')], 'int', ('block', [('print', ('var', 'x')), ('return', ('var', 'x'))])), ('fun', 'main', [], 'int', ('block', [('vardecl', 'i', 'int', ('num', 0)), ('while', ('bin', '<', ('var', 'i'), ('num', 5)), ('block', [('expr', ('call', 'show', [('bin', '*', ('var', 'i'), ('var', 'i'))])), ('assign', 'i', ('bin', '+', ('var', 'i'), ('num', 1)))])), ('return', ('num', 0))]))])\nout, stack = ref_run(compile_program(prog))\nassert out == [0, 1, 4, 9, 16], (\"printed\", out, \"expected\", [0, 1, 4, 9, 16])\nassert len(stack) == 1, (\"at halt the stack should hold only main's return value\", stack)\n"
    },
    {
     "label": "Shadowing in nested blocks",
     "type": "assert",
     "code": "def cdiv(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\nBINARY = {\n    \"add\": lambda a, b: a + b, \"sub\": lambda a, b: a - b, \"mul\": lambda a, b: a * b,\n    \"div\": cdiv, \"mod\": lambda a, b: a - b * cdiv(a, b),\n    \"lt\": lambda a, b: int(a < b), \"le\": lambda a, b: int(a <= b),\n    \"gt\": lambda a, b: int(a > b), \"ge\": lambda a, b: int(a >= b),\n    \"eq\": lambda a, b: int(a == b), \"ne\": lambda a, b: int(a != b),\n}\n\ndef ref_run(code):\n    stack, frames, out = [], [], []\n    pc, fp = 0, 0\n    while True:\n        ins = code[pc]\n        op = ins[0]\n        pc += 1\n        if op == \"const\":\n            stack.append(ins[1])\n        elif op == \"load\":\n            stack.append(stack[fp + ins[1]])\n        elif op == \"store\":\n            stack[fp + ins[1]] = stack.pop()\n        elif op == \"alloc\":\n            stack.extend([0] * ins[1])\n        elif op in BINARY:\n            b = stack.pop()\n            a = stack.pop()\n            if op in (\"div\", \"mod\") and b == 0:\n                raise ZeroDivisionError(\"division by zero\")\n            stack.append(BINARY[op](a, b))\n        elif op == \"neg\":\n            stack.append(-stack.pop())\n        elif op == \"not\":\n            stack.append(1 if stack.pop() == 0 else 0)\n        elif op == \"jump\":\n            pc = ins[1]\n        elif op == \"jumpz\":\n            if stack.pop() == 0:\n                pc = ins[1]\n        elif op == \"call\":\n            frames.append((pc, fp))\n            fp = len(stack) - ins[2]\n            pc = ins[1]\n        elif op == \"ret\":\n            value = stack.pop()\n            del stack[fp:]\n            pc, fp = frames.pop()\n            stack.append(value)\n        elif op == \"pop\":\n            stack.pop()\n        elif op == \"print\":\n            out.append(stack.pop())\n        elif op == \"halt\":\n            return out, stack\n        else:\n            raise ValueError(\"unknown instruction \" + op)\n\nprog = ('program', [('fun', 'f', [('x', 'int')], 'int', ('block', [('vardecl', 'y', 'int', ('bin', '+', ('var', 'x'), ('num', 1))), ('block', [('vardecl', 'x', 'int', ('bin', '*', ('var', 'y'), ('num', 10))), ('print', ('var', 'x')), ('block', [('vardecl', 'y', 'int', ('bin', '+', ('var', 'x'), ('num', 1))), ('print', ('var', 'y'))]), ('print', ('var', 'y'))]), ('return', ('bin', '+', ('var', 'x'), ('var', 'y')))])), ('fun', 'main', [], 'int', ('block', [('print', ('call', 'f', [('num', 2)])), ('return', ('num', 0))]))])\nout, stack = ref_run(compile_program(prog))\nassert out == [30, 31, 3, 5], (\"printed\", out, \"expected\", [30, 31, 3, 5])\nassert len(stack) == 1, (\"at halt the stack should hold only main's return value\", stack)\n",
     "hidden": true
    },
    {
     "label": "Mutual recursion and Fibonacci",
     "type": "assert",
     "code": "def cdiv(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\nBINARY = {\n    \"add\": lambda a, b: a + b, \"sub\": lambda a, b: a - b, \"mul\": lambda a, b: a * b,\n    \"div\": cdiv, \"mod\": lambda a, b: a - b * cdiv(a, b),\n    \"lt\": lambda a, b: int(a < b), \"le\": lambda a, b: int(a <= b),\n    \"gt\": lambda a, b: int(a > b), \"ge\": lambda a, b: int(a >= b),\n    \"eq\": lambda a, b: int(a == b), \"ne\": lambda a, b: int(a != b),\n}\n\ndef ref_run(code):\n    stack, frames, out = [], [], []\n    pc, fp = 0, 0\n    while True:\n        ins = code[pc]\n        op = ins[0]\n        pc += 1\n        if op == \"const\":\n            stack.append(ins[1])\n        elif op == \"load\":\n            stack.append(stack[fp + ins[1]])\n        elif op == \"store\":\n            stack[fp + ins[1]] = stack.pop()\n        elif op == \"alloc\":\n            stack.extend([0] * ins[1])\n        elif op in BINARY:\n            b = stack.pop()\n            a = stack.pop()\n            if op in (\"div\", \"mod\") and b == 0:\n                raise ZeroDivisionError(\"division by zero\")\n            stack.append(BINARY[op](a, b))\n        elif op == \"neg\":\n            stack.append(-stack.pop())\n        elif op == \"not\":\n            stack.append(1 if stack.pop() == 0 else 0)\n        elif op == \"jump\":\n            pc = ins[1]\n        elif op == \"jumpz\":\n            if stack.pop() == 0:\n                pc = ins[1]\n        elif op == \"call\":\n            frames.append((pc, fp))\n            fp = len(stack) - ins[2]\n            pc = ins[1]\n        elif op == \"ret\":\n            value = stack.pop()\n            del stack[fp:]\n            pc, fp = frames.pop()\n            stack.append(value)\n        elif op == \"pop\":\n            stack.pop()\n        elif op == \"print\":\n            out.append(stack.pop())\n        elif op == \"halt\":\n            return out, stack\n        else:\n            raise ValueError(\"unknown instruction \" + op)\n\nprog = ('program', [('fun', 'even', [('n', 'int')], 'bool', ('block', [('if', ('bin', '==', ('var', 'n'), ('num', 0)), ('block', [('return', ('bool', True))]), None), ('return', ('call', 'odd', [('bin', '-', ('var', 'n'), ('num', 1))]))])), ('fun', 'odd', [('n', 'int')], 'bool', ('block', [('if', ('bin', '==', ('var', 'n'), ('num', 0)), ('block', [('return', ('bool', False))]), None), ('return', ('call', 'even', [('bin', '-', ('var', 'n'), ('num', 1))]))])), ('fun', 'fib', [('n', 'int')], 'int', ('block', [('if', ('bin', '<', ('var', 'n'), ('num', 2)), ('block', [('return', ('var', 'n'))]), None), ('return', ('bin', '+', ('call', 'fib', [('bin', '-', ('var', 'n'), ('num', 1))]), ('call', 'fib', [('bin', '-', ('var', 'n'), ('num', 2))])))])), ('fun', 'main', [], 'int', ('block', [('print', ('call', 'even', [('num', 12)])), ('print', ('call', 'odd', [('num', 12)])), ('print', ('call', 'fib', [('num', 12)])), ('return', ('num', 0))]))])\nout, stack = ref_run(compile_program(prog))\nassert out == [1, 0, 144], (\"printed\", out, \"expected\", [1, 0, 144])\nassert len(stack) == 1, (\"at halt the stack should hold only main's return value\", stack)\n",
     "hidden": true
    }
   ]
  }
 ],
 "cp5": [
  {
   "id": "constant_folding",
   "title": "Folding, propagation and simplification",
   "prompt": "<p>Write <code>fold(block)</code> for one basic block of Lesson 5's TAC tuples, returning a new list. Walk the block in order, keeping a dictionary of variables known to hold a constant, and rewrite each instruction:</p>\n<ul>\n<li>Replace every variable operand whose value is known by the constant (in binary and unary operations, copies, <code>print</code>, <code>return</code> and <code>jumpz</code>).</li>\n<li>If a binary operation then has two constant operands, replace it by <code>(\"copy\", d, value)</code>, computed with Mini's semantics: <code>div</code> rounds toward zero, <code>mod</code> is <em>a</em> − <em>b</em> × (<em>a</em> div <em>b</em>), comparisons give 1 or 0. Never fold a <code>div</code> or <code>mod</code> by 0: keep the instruction, with its operands substituted. <code>neg</code> and <code>not</code> of a constant fold too (<code>not</code> gives 1 for 0 and 0 otherwise).</li>\n<li>Otherwise, if exactly one operand is a constant, apply these identities: <code>x + 0</code>, <code>0 + x</code>, <code>x - 0</code>, <code>x * 1</code>, <code>1 * x</code> and <code>x / 1</code> become <code>(\"copy\", d, x)</code>; <code>x * 0</code> and <code>0 * x</code> become <code>(\"copy\", d, 0)</code>. No others.</li>\n<li><code>(\"jumpz\", c, L)</code> with a constant <code>c</code> becomes <code>(\"jump\", L)</code> if <code>c</code> is 0, and is deleted otherwise.</li>\n<li>After an instruction that writes <code>d</code>: if it is now a copy of a constant, record <code>d</code>'s value; otherwise forget any value recorded for <code>d</code>.</li>\n</ul>\n<p>Labels and <code>jump</code> are unchanged. Don't modify the input list.</p>",
   "starter": "def fold(block):\n    pass\n",
   "hint": "<p>Start from the notes' <code>fold_block</code>. Write a helper <code>val(x)</code> that returns the known constant for a variable and leaves anything else alone, and use it on every operand. Then test the cases in the order given: two constants, then the identities, then leave the instruction alone. Keep the \"record or forget\" step at the end, for every instruction that writes a variable.</p>",
   "solution": "def cdiv(a, b):\n    q = abs(a) // abs(b)\n    return q if (a < 0) == (b < 0) else -q\n\nFOLD = {\"add\": lambda a, b: a + b, \"sub\": lambda a, b: a - b, \"mul\": lambda a, b: a * b,\n        \"div\": cdiv, \"mod\": lambda a, b: a - b * cdiv(a, b),\n        \"lt\": lambda a, b: int(a < b), \"le\": lambda a, b: int(a <= b), \"gt\": lambda a, b: int(a > b),\n        \"ge\": lambda a, b: int(a >= b), \"eq\": lambda a, b: int(a == b), \"ne\": lambda a, b: int(a != b)}\n\ndef fold(block):\n    known, out = {}, []\n\n    def val(x):\n        return known.get(x, x) if isinstance(x, str) else x\n\n    for ins in block:\n        op = ins[0]\n        if op in FOLD:\n            d, a, b = ins[1], val(ins[2]), val(ins[3])\n            if isinstance(a, int) and isinstance(b, int):\n                if op in (\"div\", \"mod\") and b == 0:\n                    ins = (op, d, a, b)\n                else:\n                    ins = (\"copy\", d, FOLD[op](a, b))\n            elif (op in (\"add\", \"sub\") and b == 0) or (op in (\"mul\", \"div\") and b == 1):\n                ins = (\"copy\", d, a)\n            elif (op == \"add\" and a == 0) or (op == \"mul\" and a == 1):\n                ins = (\"copy\", d, b)\n            elif op == \"mul\" and (a == 0 or b == 0):\n                ins = (\"copy\", d, 0)\n            else:\n                ins = (op, d, a, b)\n        elif op in (\"neg\", \"not\"):\n            a = val(ins[2])\n            if isinstance(a, int):\n                ins = (\"copy\", ins[1], -a if op == \"neg\" else int(a == 0))\n            else:\n                ins = (op, ins[1], a)\n        elif op == \"copy\":\n            ins = (\"copy\", ins[1], val(ins[2]))\n        elif op in (\"print\", \"return\"):\n            ins = (op, val(ins[1]))\n        elif op == \"jumpz\":\n            a = val(ins[1])\n            if isinstance(a, int):\n                if a == 0:\n                    out.append((\"jump\", ins[2]))\n                continue\n            ins = (\"jumpz\", a, ins[2])\n        if op in FOLD or op in (\"neg\", \"not\", \"copy\"):\n            if ins[0] == \"copy\" and isinstance(ins[2], int):\n                known[ins[1]] = ins[2]\n            else:\n                known.pop(ins[1], None)\n        out.append(ins)\n    return out\n",
   "tests": [
    {
     "label": "The notes' example",
     "call": "fold([('copy', 'x', 4), ('mul', 'y', 'x', 2), ('add', 'z', 'y', 'a'), ('sub', 'w', 'x', 4), ('copy', 'x', 'a'), ('add', 'v', 'x', 1), ('div', 'q', 'y', 'w')])",
     "expect": "[('copy', 'x', 4), ('copy', 'y', 8), ('add', 'z', 8, 'a'), ('copy', 'w', 0), ('copy', 'x', 'a'), ('add', 'v', 'x', 1), ('div', 'q', 8, 0)]"
    },
    {
     "label": "Comparisons fold to 1 and 0",
     "call": "fold([('copy', 'a', 3), ('lt', 'v1', 'a', 5), ('ge', 'v2', 'a', 5), ('eq', 'v3', 'v1', 1), ('ne', 'v4', 'a', 'a')])",
     "expect": "[('copy', 'a', 3), ('copy', 'v1', 1), ('copy', 'v2', 0), ('copy', 'v3', 1), ('copy', 'v4', 0)]"
    },
    {
     "label": "Mini's division and remainder",
     "call": "fold([('div', 'q', -7, 2), ('mod', 'r', -7, 2), ('div', 'q2', 7, -2), ('mod', 'r2', 7, -2)])",
     "expect": "[('copy', 'q', -3), ('copy', 'r', -1), ('copy', 'q2', -3), ('copy', 'r2', 1)]"
    },
    {
     "label": "Division by zero is not folded",
     "call": "fold([('copy', 'z', 0), ('div', 'q', 10, 'z'), ('mod', 'r', 'z', 'z'), ('add', 's', 'q', 1)])",
     "expect": "[('copy', 'z', 0), ('div', 'q', 10, 0), ('mod', 'r', 0, 0), ('add', 's', 'q', 1)]"
    },
    {
     "label": "Algebraic identities",
     "call": "fold([('add', 'a', 'x', 0), ('add', 'b', 0, 'x'), ('sub', 'c', 'x', 0), ('mul', 'd', 'x', 1), ('mul', 'e', 1, 'x'), ('div', 'f', 'x', 1), ('mul', 'g', 'x', 0), ('mul', 'h', 0, 'x'), ('sub', 'i', 0, 'x'), ('div', 'j', 1, 'x')])",
     "expect": "[('copy', 'a', 'x'), ('copy', 'b', 'x'), ('copy', 'c', 'x'), ('copy', 'd', 'x'), ('copy', 'e', 'x'), ('copy', 'f', 'x'), ('copy', 'g', 0), ('copy', 'h', 0), ('sub', 'i', 0, 'x'), ('div', 'j', 1, 'x')]"
    },
    {
     "label": "A zero from propagation enables an identity",
     "call": "fold([('copy', 'zero', 0), ('mul', 't', 'y', 'zero'), ('add', 'u', 't', 5), ('add', 'v', 'y', 'zero')])",
     "expect": "[('copy', 'zero', 0), ('copy', 't', 0), ('copy', 'u', 5), ('copy', 'v', 'y')]"
    },
    {
     "label": "Unary operations",
     "call": "fold([('copy', 'a', 5), ('neg', 'b', 'a'), ('not', 'c', 'a'), ('not', 'd', 0), ('neg', 'e', 'x')])",
     "expect": "[('copy', 'a', 5), ('copy', 'b', -5), ('copy', 'c', 0), ('copy', 'd', 1), ('neg', 'e', 'x')]"
    },
    {
     "label": "Constant conditions",
     "call": "fold([('copy', 't', 0), ('jumpz', 't', 'L1')])",
     "expect": "[('copy', 't', 0), ('jump', 'L1')]"
    },
    {
     "label": "A true condition deletes the jump",
     "call": "fold([('lt', 't', 1, 2), ('jumpz', 't', 'L1'), ('print', 't')])",
     "expect": "[('copy', 't', 1), ('print', 1)]"
    },
    {
     "label": "A unary operation forgets a constant too",
     "call": "fold([('copy', 'x', 4), ('neg', 'x', 'y'), ('add', 'z', 'x', 1), ('copy', 'b', 2), ('not', 'b', 'c'), ('return', 'b')])",
     "expect": "[('copy', 'x', 4), ('neg', 'x', 'y'), ('add', 'z', 'x', 1), ('copy', 'b', 2), ('not', 'b', 'c'), ('return', 'b')]"
    },
    {
     "label": "Redefinition forgets a constant",
     "call": "fold([('copy', 'x', 1), ('add', 'y', 'x', 1), ('add', 'x', 'x', 'n'), ('add', 'z', 'x', 1), ('copy', 'x', 7), ('return', 'x')])",
     "expect": "[('copy', 'x', 1), ('copy', 'y', 2), ('add', 'x', 1, 'n'), ('add', 'z', 'x', 1), ('copy', 'x', 7), ('return', 7)]"
    },
    {
     "label": "print, return and unknown conditions",
     "call": "fold([('copy', 'k', 9), ('print', 'k'), ('jumpz', 'c', 'L2'), ('return', 'k')])",
     "expect": "[('copy', 'k', 9), ('print', 9), ('jumpz', 'c', 'L2'), ('return', 9)]",
     "hidden": true
    },
    {
     "label": "The input is not modified",
     "type": "assert",
     "code": "block = [(\"copy\", \"x\", 4), (\"mul\", \"y\", \"x\", 2)]\ncopy = list(block)\nfold(block)\nassert block == copy, block\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "dead_code",
   "title": "Basic blocks and dead-code elimination",
   "prompt": "<p>Write two functions for a whole function's TAC, given as a list that includes <code>(\"label\", L)</code> instructions:</p>\n<ul>\n<li><code>build_cfg(code)</code> returns <code>(names, blocks, succ)</code>. Split the code into basic blocks with the notes' leader rules (a new block starts at every label, and at an instruction just after <code>jump</code>, <code>jumpz</code> or <code>return</code>). A block that starts with a label is named by it, and the label instruction is not part of its instruction list; any other block is named <code>\"B\"</code> followed by its position in the list of blocks, counting from 0. <code>names</code> lists the names in order; <code>blocks</code> maps each name to its list of instructions (possibly empty, for a label followed directly by another label); <code>succ</code> maps each name to its successors: <code>[L]</code> after <code>(\"jump\", L)</code>; the next block then <code>L</code> after <code>(\"jumpz\", c, L)</code> (just one entry if they are the same block); <code>[]</code> after <code>return</code>; otherwise the next block, or <code>[]</code> for the last block.</li>\n<li><code>eliminate_dead(code)</code> returns the code with dead assignments removed, labels kept in place. Repeat until nothing changes: build the CFG, compute liveness (nothing is live after the last block or after a <code>return</code>), and walk each block backward from its live-out set, deleting any instruction that writes a variable not live just after it, except a <code>div</code> or <code>mod</code> whose divisor isn't a non-zero constant (it might fail). Never delete <code>print</code>, <code>return</code>, jumps or labels.</li>\n</ul>\n<p>Use the same instruction tuples as the notes; you may copy the notes' <code>uses</code>, <code>defines</code> and <code>liveness</code>.</p>",
   "starter": "def build_cfg(code):\n    pass\n\ndef eliminate_dead(code):\n    pass\n",
   "hint": "<p>For <code>build_cfg</code>, first split the code into a list of [label or None, instructions] pairs in one pass: a label always starts a new pair, and so does an ordinary instruction when the current pair's last instruction is a jump or return. Then name the pairs and compute successors from each block's last instruction. <code>eliminate_dead</code> can reuse that split to put the labels back.</p>",
   "solution": "BINOPS = {\"add\", \"sub\", \"mul\", \"div\", \"mod\", \"lt\", \"le\", \"gt\", \"ge\", \"eq\", \"ne\"}\n\ndef uses(ins):\n    op = ins[0]\n    if op in BINOPS:\n        args = ins[2:4]\n    elif op in (\"copy\", \"neg\", \"not\"):\n        args = ins[2:3]\n    elif op in (\"print\", \"return\", \"jumpz\"):\n        args = ins[1:2]\n    else:\n        args = ()\n    return {a for a in args if isinstance(a, str)}\n\ndef defines(ins):\n    return ins[1] if ins[0] in BINOPS or ins[0] in (\"copy\", \"neg\", \"not\") else None\n\ndef split(code):\n    parts = []                                # [label or None, instructions]\n    for ins in code:\n        if ins[0] == \"label\":\n            parts.append([ins[1], []])\n        else:\n            if not parts or (parts[-1][1] and parts[-1][1][-1][0] in (\"jump\", \"jumpz\", \"return\")):\n                parts.append([None, []])\n            parts[-1][1].append(ins)\n    return parts\n\ndef build_cfg(code):\n    parts = split(code)\n    names = [label if label is not None else f\"B{i}\" for i, (label, _) in enumerate(parts)]\n    blocks = {n: list(p[1]) for n, p in zip(names, parts)}\n    succ = {}\n    for i, n in enumerate(names):\n        nxt = [names[i + 1]] if i + 1 < len(names) else []\n        last = blocks[n][-1] if blocks[n] else None\n        if last is not None and last[0] == \"jump\":\n            succ[n] = [last[1]]\n        elif last is not None and last[0] == \"jumpz\":\n            succ[n] = nxt + ([last[2]] if last[2] not in nxt else [])\n        elif last is not None and last[0] == \"return\":\n            succ[n] = []\n        else:\n            succ[n] = nxt\n    return names, blocks, succ\n\ndef liveness(blocks, succ):\n    use, kill = {}, {}\n    for b, code in blocks.items():\n        use[b], kill[b] = set(), set()\n        for ins in code:\n            use[b] |= uses(ins) - kill[b]\n            if defines(ins) is not None:\n                kill[b].add(defines(ins))\n    live_in = {b: set() for b in blocks}\n    live_out = {b: set() for b in blocks}\n    changed = True\n    while changed:\n        changed = False\n        for b in blocks:\n            out = set()\n            for s in succ[b]:\n                out |= live_in[s]\n            inn = use[b] | (out - kill[b])\n            if out != live_out[b] or inn != live_in[b]:\n                live_out[b], live_in[b] = out, inn\n                changed = True\n    return live_in, live_out\n\ndef removable(ins):\n    if ins[0] in (\"div\", \"mod\"):\n        return isinstance(ins[3], int) and ins[3] != 0\n    return defines(ins) is not None\n\ndef eliminate_dead(code):\n    code = list(code)\n    while True:\n        names, blocks, succ = build_cfg(code)\n        _, live_out = liveness(blocks, succ)\n        parts = split(code)\n        new, changed = [], False\n        for name, (label, instrs) in zip(names, parts):\n            live, kept = set(live_out[name]), []\n            for ins in reversed(instrs):\n                d = defines(ins)\n                if d is not None and d not in live and removable(ins):\n                    changed = True\n                    continue\n                if d is not None:\n                    live.discard(d)\n                live |= uses(ins)\n                kept.append(ins)\n            if label is not None:\n                new.append((\"label\", label))\n            new.extend(reversed(kept))\n        code = new\n        if not changed:\n            return code\n",
   "tests": [
    {
     "label": "The notes' running example",
     "call": "build_cfg([('copy', 'x', 4), ('mul', 'y', 'x', 2), ('copy', 's', 0), ('label', 'L1'), ('gt', 'v1', 'a', 0), ('jumpz', 'v1', 'L2'), ('add', 's', 's', 'y'), ('sub', 'a', 'a', 1), ('jump', 'L1'), ('label', 'L2'), ('return', 's')])",
     "expect": "(['B0', 'L1', 'B2', 'L2'], {'B0': [('copy', 'x', 4), ('mul', 'y', 'x', 2), ('copy', 's', 0)], 'L1': [('gt', 'v1', 'a', 0), ('jumpz', 'v1', 'L2')], 'B2': [('add', 's', 's', 'y'), ('sub', 'a', 'a', 1), ('jump', 'L1')], 'L2': [('return', 's')]}, {'B0': ['L1'], 'L1': ['B2', 'L2'], 'B2': ['L1'], 'L2': []})"
    },
    {
     "label": "The practice problem's loop",
     "call": "build_cfg([('copy', 'i', 0), ('label', 'L1'), ('lt', 'v1', 'i', 'n'), ('jumpz', 'v1', 'L3'), ('mod', 'v2', 'i', 2), ('jumpz', 'v2', 'L2'), ('print', 'i'), ('label', 'L2'), ('add', 'i', 'i', 1), ('jump', 'L1'), ('label', 'L3'), ('return', 'i')])",
     "expect": "(['B0', 'L1', 'B2', 'B3', 'L2', 'L3'], {'B0': [('copy', 'i', 0)], 'L1': [('lt', 'v1', 'i', 'n'), ('jumpz', 'v1', 'L3')], 'B2': [('mod', 'v2', 'i', 2), ('jumpz', 'v2', 'L2')], 'B3': [('print', 'i')], 'L2': [('add', 'i', 'i', 1), ('jump', 'L1')], 'L3': [('return', 'i')]}, {'B0': ['L1'], 'L1': ['B2', 'L3'], 'B2': ['B3', 'L2'], 'B3': ['L2'], 'L2': ['L1'], 'L3': []})"
    },
    {
     "label": "Unreachable code after a jump, and the last block",
     "call": "build_cfg([('jump', 'L1'), ('copy', 'x', 1), ('label', 'L1'), ('print', 2)])",
     "expect": "(['B0', 'B1', 'L1'], {'B0': [('jump', 'L1')], 'B1': [('copy', 'x', 1)], 'L1': [('print', 2)]}, {'B0': ['L1'], 'B1': ['L1'], 'L1': []})"
    },
    {
     "label": "Two labels in a row; jumpz to the next block",
     "call": "build_cfg([('copy', 'a', 1), ('label', 'L1'), ('label', 'L2'), ('jumpz', 'a', 'L3'), ('label', 'L3'), ('return', 'a')])",
     "expect": "(['B0', 'L1', 'L2', 'L3'], {'B0': [('copy', 'a', 1)], 'L1': [], 'L2': [('jumpz', 'a', 'L3')], 'L3': [('return', 'a')]}, {'B0': ['L1'], 'L1': ['L2'], 'L2': ['L3'], 'L3': []})"
    },
    {
     "label": "Empty code",
     "call": "build_cfg([])",
     "expect": "([], {}, {})"
    },
    {
     "label": "The running example after folding",
     "call": "eliminate_dead([('copy', 'x', 4), ('copy', 'y', 8), ('copy', 's', 0), ('label', 'L1'), ('gt', 'v1', 'a', 0), ('jumpz', 'v1', 'L2'), ('add', 's', 's', 'y'), ('sub', 'a', 'a', 1), ('jump', 'L1'), ('label', 'L2'), ('return', 's')])",
     "expect": "[('copy', 'y', 8), ('copy', 's', 0), ('label', 'L1'), ('gt', 'v1', 'a', 0), ('jumpz', 'v1', 'L2'), ('add', 's', 's', 'y'), ('sub', 'a', 'a', 1), ('jump', 'L1'), ('label', 'L2'), ('return', 's')]"
    },
    {
     "label": "Dead code that needs a second round",
     "call": "eliminate_dead([('copy', 'a', 1), ('add', 'b', 'a', 1), ('jump', 'L1'), ('label', 'L1'), ('mul', 'c', 'b', 2), ('return', 0)])",
     "expect": "[('jump', 'L1'), ('label', 'L1'), ('return', 0)]"
    },
    {
     "label": "Values used around a loop stay",
     "call": "eliminate_dead([('copy', 'i', 0), ('label', 'L1'), ('lt', 'v1', 'i', 'n'), ('jumpz', 'v1', 'L3'), ('mod', 'v2', 'i', 2), ('jumpz', 'v2', 'L2'), ('print', 'i'), ('label', 'L2'), ('add', 'i', 'i', 1), ('jump', 'L1'), ('label', 'L3'), ('return', 'i')])",
     "expect": "[('copy', 'i', 0), ('label', 'L1'), ('lt', 'v1', 'i', 'n'), ('jumpz', 'v1', 'L3'), ('mod', 'v2', 'i', 2), ('jumpz', 'v2', 'L2'), ('print', 'i'), ('label', 'L2'), ('add', 'i', 'i', 1), ('jump', 'L1'), ('label', 'L3'), ('return', 'i')]"
    },
    {
     "label": "Divisions that might fail stay",
     "call": "eliminate_dead([('div', 'p', 'x', 'y'), ('div', 'q', 'x', 2), ('mod', 'r', 'x', 0), ('mod', 's', 9, 'x'), ('return', 0)])",
     "expect": "[('div', 'p', 'x', 'y'), ('mod', 'r', 'x', 0), ('mod', 's', 9, 'x'), ('return', 0)]"
    },
    {
     "label": "A dead value overwritten before use",
     "call": "eliminate_dead([('copy', 'x', 1), ('copy', 'x', 2), ('print', 'x'), ('neg', 'y', 'x'), ('not', 'z', 'y'), ('return', 'x')])",
     "expect": "[('copy', 'x', 2), ('print', 'x'), ('return', 'x')]"
    },
    {
     "label": "Conditions keep their inputs",
     "call": "eliminate_dead([('lt', 't', 'a', 'b'), ('copy', 'u', 5), ('jumpz', 't', 'L1'), ('copy', 'u', 6), ('label', 'L1'), ('return', 'a')])",
     "expect": "[('lt', 't', 'a', 'b'), ('jumpz', 't', 'L1'), ('label', 'L1'), ('return', 'a')]",
     "hidden": true
    },
    {
     "label": "A variable used only in a later loop iteration",
     "call": "eliminate_dead([('copy', 'p', 0), ('copy', 'q', 0), ('label', 'L1'), ('jumpz', 'n', 'L2'), ('add', 'r', 'p', 1), ('copy', 'p', 'q'), ('copy', 'q', 'r'), ('sub', 'n', 'n', 1), ('jump', 'L1'), ('label', 'L2'), ('return', 'p')])",
     "expect": "[('copy', 'p', 0), ('copy', 'q', 0), ('label', 'L1'), ('jumpz', 'n', 'L2'), ('add', 'r', 'p', 1), ('copy', 'p', 'q'), ('copy', 'q', 'r'), ('sub', 'n', 'n', 1), ('jump', 'L1'), ('label', 'L2'), ('return', 'p')]",
     "hidden": true
    }
   ]
  }
 ],
 "cp6": [
  {
   "id": "interference_graph",
   "title": "Building the interference graph",
   "prompt": "<p>Write <code>interference(block, live_out)</code> for one basic block of Lesson 5's TAC and the set of variables live after it. Return the interference graph as a dict from each variable to the set of variables it interferes with. Every variable that the block reads or writes, or that is in <code>live_out</code>, is a key (with an empty set if it interferes with nothing). Build it with the notes' backward walk:</p>\n<ol>\n<li>Start with <code>live</code> = a copy of <code>live_out</code>.</li>\n<li>For each instruction, from last to first: if it writes a variable <em>d</em>, add an edge between <em>d</em> and every other variable in <code>live</code>, except that for a copy <code>(\"copy\", d, s)</code> with <em>s</em> a variable, there is no edge between <em>d</em> and <em>s</em>; then remove <em>d</em> from <code>live</code>. Then add the variables the instruction reads to <code>live</code>.</li>\n<li>At the end, <code>live</code> holds the variables live on entry; add an edge between every two of them.</li>\n</ol>\n<p>Edges go both ways: if <em>a</em> is in <code>graph[b]</code>, then <em>b</em> is in <code>graph[a]</code>. No variable interferes with itself.</p>",
   "starter": "def interference(block, live_out):\n    pass\n",
   "hint": "<p>Use Lesson 5's <code>uses</code> and <code>defines</code>. A small helper <code>edge(a, b)</code> that adds both directions, and does nothing when <code>a == b</code>, keeps the walk short. Create a key for every variable as soon as you see it, so that variables with no edges still appear.</p>",
   "solution": "BINOPS = {\"add\", \"sub\", \"mul\", \"div\", \"mod\", \"lt\", \"le\", \"gt\", \"ge\", \"eq\", \"ne\"}\n\ndef uses(ins):\n    op = ins[0]\n    if op in BINOPS:\n        args = ins[2:4]\n    elif op in (\"copy\", \"neg\", \"not\"):\n        args = ins[2:3]\n    elif op in (\"print\", \"return\", \"jumpz\"):\n        args = ins[1:2]\n    else:\n        args = ()\n    return {a for a in args if isinstance(a, str)}\n\ndef defines(ins):\n    return ins[1] if ins[0] in BINOPS or ins[0] in (\"copy\", \"neg\", \"not\") else None\n\ndef interference(block, live_out):\n    graph = {}\n\n    def node(v):\n        graph.setdefault(v, set())\n\n    def edge(a, b):\n        if a != b:\n            node(a)\n            node(b)\n            graph[a].add(b)\n            graph[b].add(a)\n\n    live = set(live_out)\n    for v in live:\n        node(v)\n    for ins in reversed(block):\n        d = defines(ins)\n        for v in uses(ins):\n            node(v)\n        if d is not None:\n            node(d)\n            for v in live:\n                if not (ins[0] == \"copy\" and v == ins[2]):\n                    edge(d, v)\n            live.discard(d)\n        live |= uses(ins)\n    for a in live:\n        for b in live:\n            edge(a, b)\n    return graph\n",
   "tests": [
    {
     "label": "The notes' example",
     "call": "interference([('add', 'v1', 'a', 'b'), ('sub', 'v2', 'a', 'b'), ('mul', 'v3', 'v1', 'v2'), ('add', 'v4', 'v3', 'c'), ('return', 'v4')], set())",
     "expect": "{'a': {'c', 'b', 'v1'}, 'b': {'a', 'c', 'v1'}, 'c': {'v1', 'a', 'b', 'v2', 'v3'}, 'v1': {'a', 'c', 'b', 'v2'}, 'v2': {'c', 'v1'}, 'v3': {'c'}, 'v4': set()}"
    },
    {
     "label": "The practice problem",
     "call": "interference([('mul', 'a', 'x', 2), ('add', 'b', 'x', 1), ('add', 'c', 'a', 'b'), ('mul', 'd', 'c', 'x'), ('return', 'd')], set())",
     "expect": "{'a': {'x', 'b'}, 'b': {'a', 'x'}, 'c': {'x'}, 'd': set(), 'x': {'a', 'c', 'b'}}"
    },
    {
     "label": "Live out of the block",
     "call": "interference([('add', 't', 'x', 1), ('mul', 'y', 't', 't')], {'x', 'y'})",
     "expect": "{'t': {'x'}, 'x': {'t', 'y'}, 'y': {'x'}}"
    },
    {
     "label": "A copy doesn't make its two sides interfere",
     "call": "interference([('copy', 'b', 'a'), ('add', 'c', 'b', 1), ('print', 'a'), ('return', 'c')], set())",
     "expect": "{'a': {'c'}, 'b': set(), 'c': {'a'}}"
    },
    {
     "label": "A copy's destination still interferes with other live values",
     "call": "interference([('copy', 'b', 'a'), ('add', 'c', 'b', 'x'), ('return', 'c')], set())",
     "expect": "{'a': {'x'}, 'b': {'x'}, 'c': set(), 'x': {'a', 'b'}}"
    },
    {
     "label": "A dead definition still interferes",
     "call": "interference([('copy', 'u', 1), ('copy', 'v', 2), ('print', 'u')], set())",
     "expect": "{'u': {'v'}, 'v': {'u'}}"
    },
    {
     "label": "Variables live on entry interfere with each other",
     "call": "interference([('print', 'p'), ('print', 'q'), ('print', 'r')], set())",
     "expect": "{'p': {'r', 'q'}, 'q': {'p', 'r'}, 'r': {'p', 'q'}}"
    },
    {
     "label": "An empty block",
     "call": "interference([], {'n', 'm'})",
     "expect": "{'m': {'n'}, 'n': {'m'}}",
     "hidden": true
    },
    {
     "label": "Symmetric, and no self-loops",
     "type": "assert",
     "code": "g = interference([(\"add\", \"x\", \"x\", 1), (\"mul\", \"y\", \"x\", \"z\"), (\"sub\", \"z\", \"y\", \"x\"), (\"return\", \"z\")], {\"q\"})\nfor v, ns in g.items():\n    assert v not in ns, (\"self-loop\", v)\n    for n in ns:\n        assert v in g[n], (\"not symmetric\", v, n)\nassert set(g) == {\"x\", \"y\", \"z\", \"q\"}, set(g)\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "graph_coloring",
   "title": "Register allocation by graph colouring",
   "prompt": "<p>Write <code>allocate(graph, k, cost)</code>, Chaitin's simplify-and-select allocator with optimistic spilling, exactly as in the notes. <code>graph</code> is an interference graph (a dict from variable to a set of neighbours, symmetric), <code>k</code> the number of registers, and <code>cost</code> a dict giving each variable's spill cost. Return <code>(colors, spilled)</code>: a dict from each coloured variable to a colour 0 to <em>k</em> − 1, and the set of spilled variables. Every variable is in exactly one of the two.</p>\n<ol>\n<li><strong>Simplify:</strong> until the graph is empty, remove a vertex and push it on a stack. If some vertices have fewer than <em>k</em> neighbours <em>in the remaining graph</em>, remove the first of them in alphabetical order. Otherwise remove the vertex with the smallest <code>cost[v] / degree</code> (its degree in the remaining graph), breaking ties alphabetically.</li>\n<li><strong>Select:</strong> pop vertices one at a time; give each the smallest colour not used by any of its neighbours (in the original graph) that already have a colour. If all <em>k</em> colours are used, the vertex is spilled.</li>\n</ol>\n<p>Don't modify <code>graph</code>.</p>",
   "starter": "def allocate(graph, k, cost):\n    pass\n",
   "hint": "<p>Work on a copy of the graph, <code>{v: set(ns) for v, ns in graph.items()}</code>, so that removing a vertex can delete it from its neighbours' sets. <code>min(g, key=lambda v: (cost[v] / len(g[v]), v))</code> picks the spill candidate with the tie rule. In select, look at the neighbours in the original <code>graph</code>, because the copy is empty by then.</p>",
   "solution": "def allocate(graph, k, cost):\n    g = {v: set(ns) for v, ns in graph.items()}\n    stack = []\n    while g:\n        low = sorted(v for v in g if len(g[v]) < k)\n        if low:\n            v = low[0]\n        else:\n            v = min(g, key=lambda v: (cost[v] / len(g[v]), v))\n        stack.append(v)\n        for n in g[v]:\n            g[n].discard(v)\n        del g[v]\n    colors, spilled = {}, set()\n    while stack:\n        v = stack.pop()\n        used = {colors[n] for n in graph[v] if n in colors}\n        free = [c for c in range(k) if c not in used]\n        if free:\n            colors[v] = free[0]\n        else:\n            spilled.add(v)\n    return colors, spilled\n",
   "tests": [
    {
     "label": "The notes' example with 4 registers",
     "call": "allocate({'v4': set(), 'v3': {'c'}, 'c': {'v1', 'a', 'b', 'v2', 'v3'}, 'v2': {'c', 'v1'}, 'v1': {'a', 'c', 'b', 'v2'}, 'a': {'c', 'b', 'v1'}, 'b': {'a', 'c', 'v1'}}, 4, {'a': 3, 'b': 3, 'c': 2, 'v1': 2, 'v2': 2, 'v3': 2, 'v4': 2})",
     "expect": "({'v4': 0, 'v3': 0, 'v2': 0, 'v1': 1, 'c': 2, 'b': 0, 'a': 3}, set())"
    },
    {
     "label": "The notes' example with 3 registers spills c",
     "call": "allocate({'v4': set(), 'v3': {'c'}, 'c': {'v1', 'a', 'b', 'v2', 'v3'}, 'v2': {'c', 'v1'}, 'v1': {'a', 'c', 'b', 'v2'}, 'a': {'c', 'b', 'v1'}, 'b': {'a', 'c', 'v1'}}, 3, {'a': 3, 'b': 3, 'c': 2, 'v1': 2, 'v2': 2, 'v3': 2, 'v4': 2})",
     "expect": "({'v1': 0, 'b': 1, 'a': 2, 'v4': 0, 'v3': 0, 'v2': 1}, {'c'})"
    },
    {
     "label": "The practice problem with 2 registers",
     "call": "allocate({'a': {'x', 'b'}, 'b': {'a', 'x'}, 'c': {'x'}, 'd': set(), 'x': {'a', 'c', 'b'}}, 2, {'x': 4, 'a': 2, 'b': 2, 'c': 2, 'd': 2})",
     "expect": "({'x': 0, 'b': 1, 'd': 0, 'c': 1}, {'a'})"
    },
    {
     "label": "A square needs only 2 colours: optimism pays",
     "call": "allocate({'v0': {'v3', 'v1'}, 'v1': {'v0', 'v2'}, 'v2': {'v3', 'v1'}, 'v3': {'v0', 'v2'}}, 2, {'v0': 1, 'v1': 1, 'v2': 1, 'v3': 1})",
     "expect": "({'v3': 0, 'v2': 1, 'v1': 0, 'v0': 1}, set())"
    },
    {
     "label": "A 5-cycle with 2 colours must spill",
     "call": "allocate({'v0': {'v1', 'v4'}, 'v1': {'v0', 'v2'}, 'v2': {'v3', 'v1'}, 'v3': {'v4', 'v2'}, 'v4': {'v3', 'v0'}}, 2, {'v0': 1, 'v1': 1, 'v2': 1, 'v3': 1, 'v4': 1})",
     "expect": "({'v4': 0, 'v3': 1, 'v2': 0, 'v1': 1}, {'v0'})"
    },
    {
     "label": "A 5-cycle with 3 colours",
     "call": "allocate({'v0': {'v1', 'v4'}, 'v1': {'v0', 'v2'}, 'v2': {'v3', 'v1'}, 'v3': {'v4', 'v2'}, 'v4': {'v3', 'v0'}}, 3, {'v0': 1, 'v1': 1, 'v2': 1, 'v3': 1, 'v4': 1})",
     "expect": "({'v4': 0, 'v3': 1, 'v2': 0, 'v1': 1, 'v0': 2}, set())"
    },
    {
     "label": "Cost decides the spill",
     "call": "allocate({'hot': {'a', 'b'}, 'a': {'b', 'hot'}, 'b': {'a', 'hot'}}, 2, {'hot': 50, 'a': 3, 'b': 4})",
     "expect": "({'hot': 0, 'b': 1}, {'a'})"
    },
    {
     "label": "Vertices with no edges share one register",
     "call": "allocate({'p': set(), 'q': set()}, 1, {'p': 1, 'q': 1})",
     "expect": "({'q': 0, 'p': 0}, set())"
    },
    {
     "label": "Empty graph",
     "call": "allocate({}, 3, {})",
     "expect": "({}, set())"
    },
    {
     "label": "Valid on a larger graph, and graph unchanged",
     "type": "assert",
     "code": "import random\nrng = random.Random(7)\nnames = [f\"n{i}\" for i in range(30)]\ng = {v: set() for v in names}\nfor _ in range(80):\n    a, b = rng.sample(names, 2)\n    g[a].add(b)\n    g[b].add(a)\nbefore = {v: set(ns) for v, ns in g.items()}\ncolors, spilled = allocate(g, 4, {v: rng.randint(1, 9) for v in names})\nassert g == before, \"allocate changed its input\"\nassert set(colors) | spilled == set(names) and not (set(colors) & spilled)\nfor v, c in colors.items():\n    assert 0 <= c < 4\n    for n in g[v]:\n        assert colors.get(n) != c, (\"neighbours share a colour\", v, n)\n",
     "hidden": true
    },
    {
     "label": "A clique of 5 with 4 registers",
     "call": "allocate({'a': {'c', 'b', 'd', 'e'}, 'b': {'a', 'c', 'd', 'e'}, 'c': {'a', 'b', 'd', 'e'}, 'd': {'a', 'c', 'b', 'e'}, 'e': {'a', 'c', 'b', 'd'}}, 4, {'a': 5, 'b': 1, 'c': 3, 'd': 1, 'e': 2})",
     "expect": "({'e': 0, 'd': 1, 'c': 2, 'a': 3}, {'b'})",
     "hidden": true
    }
   ]
  }
 ]
});
