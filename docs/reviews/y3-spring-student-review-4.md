# Student review: Year 3 Spring

*Round 4, part A (CS 330, CS 380, CS 365). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a third-year CS student. Before this term I finished the Year 1 and Year 2 core: programming (CS 101/102), discrete maths, calculus, linear algebra, probability and statistics, data structures, algorithms, computer systems, architecture and digital logic, software engineering, operating systems, theory of computation, databases and graphics, plus two physics courses. I know only what those courses taught. This term I read CS 330 Computer Networks, CS 380 Security Fundamentals and CS 365 Compilers in full, lesson by lesson, and tried every quiz and practice problem as I went. I checked the worked numbers by hand where I could: delays, checksums, CRCs, the RTO table, the distance-vector table, the liveness rounds and the interference and colouring tables. They all came out as stated. Below is everything that still confused me.

### CS 330 Computer Networks

#### nw1: How networks work

1. In the router_queue problem: "When a packet arrives at time t, the bytes waiting are those of accepted packets whose start time is later than t." It doesn't say what happens to a packet whose start time is exactly t. The prompt also says a packet "doesn't fit in the buffer". I can't tell whether that means waiting bytes plus its own size must be at most buffer_bytes, or something else. And I can't tell whether a packet arriving at the exact moment the link finishes counts as arriving "while the link is idle" (so it needs no buffer space). These edge cases change which packets get dropped.

#### nw7: The application layer: DNS, HTTP and content delivery

2. The http_parse hint says "The status line splits as version, code, reason = line.split(" ", 2); the reason may be empty". A status line such as HTTP/1.1 204 with no trailing space splits into only two parts, so that unpacking raises ValueError. The prompt says to raise ValueError when "a status line is malformed". I can't tell whether such a line is malformed, or a valid line with an empty reason that I should handle differently.

#### nw8: Networks in practice

3. "Each pod has k/2 edge switches, each connecting k/2 servers and k/2 aggregation switches in the pod". This tells me how many aggregation switches each edge switch connects to, but never states how many aggregation switches a pod has. I had to infer it from "the i-th aggregation switch of every pod connects to all k/2 core switches of group i" before I could answer P3(a), which asks how many switches of each kind there are.

### CS 380 Security Fundamentals

#### sc3: Hashes, MACs and passwords

4. "And when combining a MAC with encryption, encrypt then MAC: compute the tag over the ciphertext and check it before decrypting. That is what AES-GCM does internally (SHA-3, unlike SHA-2, isn't vulnerable to length extension, but HMAC remains the standard)." The parenthetical about SHA-3 and length extension sits inside a sentence about encrypt-then-MAC and AES-GCM. I couldn't see what it has to do with either, or which claim it is qualifying.

### CS 365 Compilers

#### cp5: Intermediate code and optimization

5. The notes say "x = e becomes the code for e and a copy into x", and Lower.expr always puts a binary operation's result in a fresh temporary. But the running example's TAC has "y = x * 2" and "s = s + y" written directly into the variables, with no temporary and no copy. By the stated rule I would expect "t1 = x * 2" then "y = t1". I can't tell which form the lowering actually produces, and the dead_code and constant_folding problems depend on it.

6. The notes say "A variable leaves the dictionary when it is assigned something non-constant." But fold_block only updates known for instructions where `op in FOLD or op == "copy"`. A ("neg", d, a) or ("not", d, a) writes d and never removes it from known. If d held a constant earlier, later uses of d would be replaced by that stale constant. This looks wrong. Or are neg and not meant to be absent here?

#### cp6: Register allocation and the back end

7. TAC temporaries are named t1, t2, … (from Lesson 5), but RISC-V also has registers called t0–t6, and this lesson uses both at once: "this code reserves t5 and t6", and P3's "with n in a0, t1 in t0 and t2 in a1". Nothing says that the TAC's t1 has nothing to do with the RISC-V register t1. In P3 I had to stop and work out which t1 was meant before I could translate the lines.

### Across courses

No confusions that span more than one course. Where the courses overlap (TLS's place between TCP and HTTP and its one-round-trip handshake, the two separate firewall problems with different rule formats, and the IP TTL versus the DNS TTL), the texts agree with each other or explicitly point out the difference.

## Professor's response (part A: CS 330, CS 380, CS 365)

1. **router_queue edge cases (nw1).** The prompt now states exactly what the reference solution does. The link counts as idle at the exact moment it finishes the previous packet, so a packet arriving then starts at once and never uses the buffer. A packet whose transmission starts at exactly *t* is no longer waiting at *t*. An arriving packet that would wait is accepted when the bytes already waiting plus its own size are at most `buffer_bytes`. The hint now says "later than *t* (not equal to it)". I added two tests with exact binary times (8000 bit/s, so 1000 bytes take 1 s): "Arriving just as the link frees needs no buffer" (`[(0, 1000), (1, 1000)]` with buffer 0 gives `[1.0, 2.0]`) and "A packet starting at t no longer waits; an exact fit is accepted" (gives `[1.0, 2.0, 3.0, 3.6, None]`). I ran three wrong variants (`st >= t`, idle only when `link_free < t`, fit only when the total is under the buffer size). Each one fails at least one of the new tests.

2. **http_parse status line (nw7).** The reference solution accepts `HTTP/1.1 204` with no reason phrase and returns reason `""`, so the prompt now says so. It defines a status line as the version (starting `HTTP/`), a space, a three-digit code, and optionally a space and the reason. It also lists the third error case the solution already raised: a header line with no colon. The hint no longer suggests the three-way unpacking. It says `parts = line.split(" ", 2)` gives two or three parts, and the reason is `parts[2]` if there is one. New tests: "A status line with no reason phrase" (two responses, `HTTP/1.1 204` and `HTTP/1.1 200`). The malformed-input test now also includes `FTP/1.1 200 OK` and a header line without a colon.

3. **Fat-tree aggregation count (nw8).** The sentence now says "Each pod has *k*/2 edge switches and *k*/2 aggregation switches. Each edge switch uses half its ports for *k*/2 servers and half for links to all *k*/2 aggregation switches in its pod". P3(a)'s answer (16 of each per pod for *k* = 32) matches.

4. **SHA-3 parenthetical (sc3).** I removed it from the encrypt-then-MAC sentence, which now ends "That is what AES-GCM does internally." The point it was making now sits in the HMAC paragraph, right after "so length extension fails": length extension comes from a digest that is the whole final state (SHA-256, SHA-512). SHA-3 outputs only part of its state, so it isn't vulnerable and H(*k* ‖ *m*) with SHA-3 would be a sound MAC. HMAC stays the standard because it is safe with SHA-2 and SHA-3 alike.

5. **Assignments and temporaries (cp5).** The student was right: the stated rule (code for *e*, then a copy) didn't produce the running example's `y = x * 2`. `Lower.expr` now takes an optional destination, `expr(e, dest=None)`. With a destination, a binary operation writes its result straight into it instead of a fresh temporary, and a constant or variable becomes a copy. Without one, nothing changes, so every existing call still gives the same output. The text now says that an assignment `x = e` lowers as `expr(e, "x")`. A short checked example shows `['x = 4', 'y = x * 2', 't1 = y * 3', 's = s + t1']`: assignments write directly, and inner operations still get temporaries. This is the form of the running example's TAC. The `constant_folding` and `dead_code` problems take TAC tuples directly and are consistent with it.

6. **fold_block and neg/not (cp5).** This was a real bug. Run on `[x = 4, x = -a, y = x + 1]`, the old notes code gave `y = 5`. `neg` and `not` wrote their destination without touching the dictionary, so the stale x: 4 stayed in place. The notes' `fold_block` now propagates into `neg` and `not` and folds them when the operand is constant (`not` gives 1 for 0, else 0). The record-or-forget step now runs for every instruction that writes a variable: `op in FOLD or op in ("copy", "neg", "not")`. A new paragraph after the walkthrough explains why. A checked example shows `['x = 4', 'x = -a', 'y = x + 1', 'z = 1']`. The problem's reference solution (`FOLD_SOLUTION`) already handled this correctly. Its hint tells students to start from the notes' `fold_block`, though, so I added the test "A unary operation forgets a constant too", where a `neg` and a `not` each overwrite a known constant.

7. **TAC t1 versus register t1 (cp6).** After "reserves t5 and t6", the notes now say that Lesson 5's temporaries t1, t2, … are names the compiler invents and are unrelated to RISC-V's registers t0–t6. In a register map, each key is a TAC name and each value a register, so `{"t1": "t0"}` puts the temporary t1 in the register t0. P3 now says "with the variable n in register a0, the TAC temporary t1 in register t0, and the temporary t2 in register a1" and gives the map.

**Across courses.** The student reported nothing here, so there is nothing to change.

Files changed: data/cs330.js, data/cs330-code.js, data/cs380.js, data/cs365.js (rebuilt from scratchpad/cs365/cp5.js and cp6.js with build.py, after checking that a rebuild of the unedited parts reproduced data/cs365.js byte for byte), data/cs365-code.js, and the specs y3s/cs330_spec.py and y3s/cs365_spec.py. data/cs365-code.js differs from before by only the one new test; the set-order changes from regeneration were left out. Problem ids are unchanged.

---

# Student review: Year 3 Spring

*Round 4, part B (CS 360, CS 370). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a third-year CS student. Before this term I completed CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240, PHYS 250, CS 310, CS 320, CS 340 and CS 350. I program comfortably in Python and C, and I have seen grammars, parse trees, Dijkstra's algorithm, Bayes' rule, maximum likelihood, eigenvalues, the normal equations and gradient descent. I read both course dumps in full, lesson by lesson, and tried every quiz and practice problem. Most of the notes' numbers and traces matched when I worked them by hand. The items below are the places where I actually got stuck or wasn't sure what was meant.

### CS 360 Programming Languages

#### pl2: An interpreter: variables and scope

1. The scope_check problem says "Return a list of error messages, in the order in which the problems appear in the program (… the function name of a call before its arguments)". It doesn't say where "f expects 2 arguments, got 1 in W" goes relative to errors inside that call's arguments. It also doesn't say whether a malformed `if` or an operator with the wrong number of operands counts as an error, or what to report for it. Only the four message kinds are listed, so I don't know what the checker should do with such expressions.

#### pl5: Types and type checking

2. "For Mini, a step rewrites the leftmost innermost piece that is ready: (+ (+ 1 2) 4) → (+ 3 4) → 7, and (if (< 1 2) 5 6) → (if true 5 6) → 5." "Ready" is never defined. No step rules are given for variables, `let`, `lambda` or application, so I can't tell how something like (let (x 5) (+ x 1)) takes a step. That makes it hard to see what the progress and preservation lemmas are actually claiming for those forms.

3. typecheck_functions says "Report every type error, including bad parameters and wrong argument counts, with TypeError." I don't know what counts as a "bad parameter". It could be a parameter entry that isn't a (name type) pair, a name that isn't a string, an invalid type, or a repeated parameter name. Also, "report every type error" reads as if all errors should be collected, but raising a TypeError stops at the first one.

### CS 370 Introduction to AI and Machine Learning

#### ml1: Search: state spaces, uniform cost and A*

4. The astar problem says "one test counts the calls to check that your search really is guided by h". Its hint, though, says to "Push tuples (f, tie, g, node), where tie is a counter that increases with every push". That breaks ties in f by push order. The notes' code breaks them by smaller g and then by node name, and the notes say "which ones those are depends on how ties in f are broken". So I can't tell which tie rule the call-count test expects. I also don't know which path to return when several paths are equally cheap.

#### ml4: Learning from data: linear regression and gradient descent

5. After standardizing, the notes say "The curvatures are now about 3.90, 2 and 0.099". Unlike the unscaled eigenvalues, which the notes compute with the bisection code, these three are stated without any computation. P4 depends on them. I couldn't see where they come from, or why one of them is exactly 2.

#### ml6: Decision trees, ensembles and clustering

6. P4 asks: "A bagged ensemble has 100 trees … with pairwise correlation ρ = 0.5. What is the variance of their average? How many trees would you need to bring it below 0.55?" By the notes' formula ρσ² + (1 − ρ)σ²/m, 100 trees already give 0.505, which is below 0.55. I'm not sure whether the question wants the smallest number of trees that gets below 0.55, or whether I've misread something.

#### ml8: Language models, and the limits of AI

7. The introduction calls the softmax "a many-class logistic regression, Lesson 5". But Lesson 5 says "This lesson takes the common case of two classes" and never covers a many-class version. So the reference points to material that isn't there.

8. "a query **q** = W_Q**x** ("what am I looking for?"), a **key** **k** = W_K**x**". The word "key" is bold in the same way as the vector symbols **q**, **k** and **x**. It reads as if there were a vector named **key** separate from **k**, and I had to reread it to work out that both mean the same thing.

### Across courses

9. Both courses keep pointing back to specific earlier lessons, and I could follow those references. The one thing that tripped me up across courses was notation reuse. CS 370 uses α for three unrelated things (the alpha-beta bound, the normalization constant and the learning rate) and warns each time. CS 360 Lesson 3 uses "normal order" and "normal form", and CS 370 uses "normalization" and "normalize" for unrelated ideas, with no warning. When I studied both courses side by side I briefly mixed up the beta-reducer's `normalize` (CS 360 Lesson 3) with the type-variable renaming function also called `normalize` in the starter of CS 360 Lesson 6's infer_types problem.

## Professor's response (part B: CS 360, CS 370)

1. **scope_check (CS 360 Lesson 2).** The prompt now says the program can be assumed well formed apart from the four listed errors: every `if` has three parts, every operator two operands, every `let` the form `(let (x e1) e2)`. The checker looks for nothing else. The ordering rule now says outright that a call's own error (undefined function or wrong argument count) comes before any errors in its arguments, and that the arguments are still checked. This is what the solution does. No test checked an argument-count error that had an error inside its arguments, so I added one to the "Undefined functions and wrong argument counts" test: `((define (f a b) (+ a b)) (f (+ q 1)))` gives `["f expects 2 arguments, got 1 in main", "unbound variable q in main"]`.

2. **"Ready" in small steps (CS 360 Lesson 5).** "Ready" is now defined: the parts a form must evaluate first are already values (integers, `true`, `false`, lambdas). The notes now give the rules:
   - an operator with value operands is replaced by its result;
   - `(if true/false e1 e2)` picks a branch;
   - `(let (x v) e2)` becomes e2[x := v];
   - `((lambda ((x T)) body) v)` becomes body[x := v], a beta step;
   - anything else steps inside the leftmost such part that is not yet a value;
   - variables have no rule, because substitution removes them first.

   There is a new worked example, `(let (x 5) (+ x 1))` → `(+ 5 1)` → `6`.

3. **typecheck_functions (CS 360 Lesson 5).** "Report every type error" now reads "Raise TypeError for any ill-typed program; like the starter, stop at the first error found (there is no need to collect them)." The prompt now defines a bad parameter: an entry that isn't a pair `(x T)` of a name and a valid type, as in `(lambda (x) x)` or `(lambda ((x float)) x)`, or a repeated parameter name. The reference solution did not reject repeated names. It returned `["->", "bool", "bool"]` for `(lambda ((x int) (x bool)) x)`, so it now raises, and the hint mentions the check. I added tests for a repeated name and for a non-name parameter `(lambda ((5 int)) 1)`. The test is relabelled "Valid and invalid types and parameters".

4. **astar (CS 370 Lesson 1).** The prompt now says that any tie rule passes: the notes' smaller g first, or the hint's push counter. It also says to return any one of several equally cheap paths. I ran the reference A* with four tie rules (push order, reverse push order, smaller g then name, larger g then name) on the call-count test's grid. Each made exactly 60 calls against the test's limit of 400: only the 60 cells on the start–goal row have f = 60, and every other cell has f ≥ 62. The visible tests have unique cheapest paths. The hidden random-graph test accepts any path whose cost is the optimum, so the promise is already tested.

5. **Standardized curvatures (CS 370 Lesson 4).** The notes now derive them. After standardizing, each column has Σx = 0 and (1/n)Σx² = 1, so (2/n)AᵀA = [[2, 0, 0], [0, 2, 2r], [0, 2r, 2]], where r = (1/n)Σ area·rooms is the correlation of the standardized features. The bias direction (1, 0, 0) has curvature exactly 2. The vectors (0, 1, 1) and (0, 1, −1) are eigenvectors with eigenvalues 2(1 ± r). A new executed block prints `0.9507 3.9 0.099`. Before adding it, I checked the column sums (0) and mean squares (1.0) by running the lesson's code.

6. **Bagging P4 (CS 370 Lesson 6).** The student read it correctly: 100 trees already give 0.505. The question now asks "What is the smallest number of trees that brings it below 0.55?" The answer, 11 trees, is unchanged (m = 10 gives exactly 0.55).

7. **Softmax reference (CS 370 Lesson 8).** The introduction now says "a softmax (the many-class version of Lesson 5's sigmoid, defined below)". This matches the later section, which shows that with two classes the softmax is exactly Lesson 5's sigmoid.

8. **Bold "key" (CS 370 Lesson 8).** The sentence is reordered so that a bold word never sits next to a bold vector: "three vectors: **q** = W_Q**x**, its **query** (…); **k** = W_K**x**, its **key** (…); and **v** = W_V**x**, its **value** (…)."

9. **normalize / normal form.** The type-variable renaming helper in the infer_types and hindley_milner starters (and solutions) is now named `rename_type_vars`. The `type_of` docstring and the prompt no longer say "normalized type". The tests call only `type_of`, so nothing else changed. The beta reducer keeps `normalize`, the name its tests use. CS 360 Lesson 3 now has a sentence after the definition of normal form: "Normal" just means fully reduced, unrelated to the normal distribution or to normalizing probabilities. I left CS 370's warnings about α as they are.

Checks: `node --check` on all four data files passes. validate_content ends "all good". check_problems: 303 problems, 0 problems found. check_lesson_code reports no cs360 or cs370 lines. lesson_time: CS 360 slow estimates are 71–86 minutes, CS 370 77–88 (ml4 is 88). test_dump_course: all checks passed. gen_code reports 0 problems for both specs. Pyodide prints only "ok" lines (cs360 95, cs370 96).
