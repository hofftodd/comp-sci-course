# Student review: Year 3 Spring

*Round 3, part A (CS 330, CS 380, CS 365). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a third-year CS student. Before this term I took CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240, PHYS 250, CS 310, CS 320, CS 340 and CS 350. This term I'm taking CS 330 Computer Networks, CS 380 Security Fundamentals and CS 365 Compilers. I read each course's dump in lesson order and tried every quiz and practice problem in my head. I checked the worked numbers where I could do them by hand: the checksums, CRCs, the RTO table, the distance-vector table, the go-back-N trace, the liveness rounds, the interference graph and simplify/select, the frame layouts, the error columns and the DH values. They all came out as stated. The items below are the places where I actually got stuck or found an inconsistency.

### CS 330 Computer Networks

#### nw1: How networks work

1. "Here is a short argument from two facts. First, Little's law … Second, an arriving packet finds N packets there on average … Third, exponential times are memoryless". The text says two facts and then lists three. I wasn't sure whether memorylessness is a separate assumption of the argument or part of the second fact.

#### nw2: The link layer

2. "Differentiating, the maximum is at p = 1/N, giving (1 − 1/N)^(N−1), which tends to 1/e ≈ 0.37 as N grows." Both the derivative of Np(1 − p)^(N−1) and the limit are skipped. I could redo the derivative, but I didn't see right away why (1 − 1/N)^(N−1) tends to 1/e, since the familiar limit has exponent N.

#### nw3: IP: addresses and forwarding

3. "19 = 00010011 differs from 18 = 00010010 in the last bit of the third byte, bit 24 of the address". This counts bits from 1 at the left. The same lesson's ipv4_header hint says "bit 14 is DF, bit 13 is MF", which counts from 0 at the right of the 16-bit value, and nw7 calls QR "bit 15" and RD "bit 8" the same way. No convention for numbering bits is stated, so I had to work out which one each sentence meant.

#### nw4: Routing

4. The distance_vector problem has "DVNetwork(links, poison=False, infinity=16)", and the notes say "The programming problems simulate both cases" of the bad-news example. That example uses c(x, z) = 50 and c(x, y) = 60, which are above the default infinity of 16, and "capped at infinity" would make x unreachable. I wasn't sure whether I'm meant to pass a larger infinity to reproduce the 47-round table, or whether the example isn't meant to be reproduced.

#### nw6: TCP

5. Header row "12–15 | header length (4 bits, in 32-bit words) · flags (CWR, ECE, URG, ACK, PSH, RST, SYN, FIN) · receive window (16 bits)". The IPv4 table gave every field's width, but this one gives no width for the flags. Eight one-bit flags plus 4 + 16 bits is 28 bits, not 32, so 4 bits of the row are unaccounted for.

6. "A triple duplicate ACK at 21 sets ssthresh = 10 and cwnd = 10". The rule given earlier is "set ssthresh = cwnd / 2", which gives 10.5. Rounding down (max(cwnd // 2, 2)) only appears in the cwnd_trace problem, so from the notes alone I didn't know whether windows are rounded, or how.

#### nw7: The application layer

7. P2: "Add the TLS 1.3 handshake to each connection in (d) for case (b)." I can't parse this. Part (d) refers to itself, and case (b) has only one connection, so "each connection" is confusing. Is (d) meant to be (b) plus one TLS RTT?

8. The header table gives bit positions only for QR (bit 15) and RD (bit 8). It names opcode, AA, TC and RA without positions, but the response is then described as "flags 0x8180: a response, RD and RA set". I can't confirm from the lesson that 0x0080 is RA, and P1 ("which flags are set") could only be fully answered if the other positions were given.

### CS 380 Security Fundamentals

#### sc1: Thinking about security

9. P1: "Sketch a threat model for the course website you are reading: students' progress is stored in their own browser, the professor chat sends messages to a language model, and instructors can approve rewrites of lessons." None of these features (a professor chat, lesson rewrites, who instructors are) is described anywhere in what I was given. So I don't know the components, data flows or trust boundaries I'm supposed to model.

#### sc3: Hashes, MACs and passwords

10. The notes call TOTP "the 6-digit codes of authenticator apps", but the code is "def totp(secret, t, digits=8, step=30)", prints the 8-digit "94287082", and P4 asks for "the 8-digit code". It isn't said whether apps really use 6 digits while the RFC test vectors use 8, or why the default is 8.

#### sc4: Public-key cryptography

11. OAEP: "use a hash-based mask function G to compute X = (m ‖ zeros) ⊕ G(r) and Y = r ⊕ H(X)". G is introduced only by name. H was just used for the toy H(data, n), which takes two arguments and reduces mod n, so it isn't clear which H is meant here. The output lengths of G(r) and H(X) also have to match X and r for the XORs to work, and nothing says how that is arranged.

#### sc5: Memory safety

12. "The canary is kept in thread-local storage, a small per-thread memory area", but the assembly comment says "movq %fs:40, %rax  # load the process's random canary". Is there one canary per thread or one per process?

### CS 365 Compilers

#### cp2: Parsing

13. The first_follow problem says "Compute each set by iterating the rules from the notes." The notes give iteration rules for nullable and FIRST, but for FOLLOW they only reason through one example ("It ends E, and E is followed by ) or the end of input, so FOLLOW(E′) = {), eof}"). The general FOLLOW rules (add FIRST(β) for A → α B β, and add FOLLOW(A) when β is nullable) appear only in the problem's hint.

#### cp3: Semantic analysis

14. (blocking) type_checker: "("args", f) | a call to f with the wrong number of arguments, or an argument of the wrong type". It isn't clear whether a call with two wrongly typed arguments produces one ("args", f) or two. The notes' type_of appends one message per wrong argument ("argument {i + 1} of …"). Since the tests compare exact lists, I couldn't tell which output is expected.

#### cp5: Intermediate code and optimization

15. Two sentences seem to say opposite things. First: "Deleting an instruction also deletes its reads, so the walk can find chains of dead code in one pass." A paragraph later: "Removing code can make other code dead (the deleted instruction's operands may now be unread), so dead-code elimination is repeated, recomputing liveness, until nothing changes." I couldn't tell when the repetition is actually needed. I assume across blocks, but the notes don't say so, and the eliminate_dead problem requires repeating.

16. Lesson 1 says "In the pipeline, optimization comes before final code generation", and its figure has the optimizer and code generator producing "bytecode or machine code". But Lesson 4's code generator compiles the AST directly to stack bytecode, and Lesson 5's optimized TAC is never translated back into that bytecode. Lesson 6 instead translates TAC to RISC-V. I couldn't see how the optimized TAC is supposed to reach the Mini VM, or whether the Mini system ever uses the optimizer at all.

### Across courses

17. CS 380 sc1 Q4 says a firewall rule list that ends with "allow everything else" violates fail-safe defaults, and CS 380 sc8 Q1 says the last rule should be "Deny everything". But CS 330 nw8 Q6 gives the rules "1 allow TCP to 10.0.0.5 port 22 from 192.0.2.0/24; 2 deny TCP to port 22 from anywhere; 3 allow everything else" as an ordinary rule set and doesn't comment on it. Read together, I wasn't sure whether CS 330's example is meant to be bad practice or acceptable.

## Professor's response (part A: CS 330, CS 380, CS 365)

1. **nw1, "two facts" then three.** The sentence now says "three facts". Memorylessness is the third assumption of the argument. It is separate from the second fact, which needs Poisson arrivals.

2. **nw2, the ALOHA maximum.** The notes now give the derivative, N(1 − p)^(N−2)(1 − Np), and say where its sign changes, so the maximum is at p = 1/N. They also explain the limit. The log of (1 − 1/N)^N is N ln(1 − 1/N), which tends to −1 because ln(1 − x) ≈ −x. The extra factor 1/(1 − 1/N) tends to 1. The notes add the value at N = 10: 0.387, rounded to 0.39 (checked).

3. **nw3/nw7, bit numbering.** After the IPv4 header table the notes now state the course's rule. A field is numbered like an integer: bit 0 is the least significant bit and bit 15 is the top bit of a 16-bit value. DF is bit 14 (0x4000) and MF is bit 13 (0x2000). The notes also say that prefix lengths count bits from the left. The longest-prefix sentence now reads "the 24th bit counting from the left of the address". The ipv4_header hint repeats the rule and gives the hex values.

4. **nw4, distance_vector and infinity.** The notes now say the problem's `infinity` must be larger than every real distance. To reproduce the 47-round example, pass `infinity=100`; with the default of 16 (RIP's value), the costs 50 and 60 would already count as unreachable. The problem prompt says the same thing. I added a hidden test that runs the notes' example with `infinity=100`. It gives 47 rounds, D_y(x) = 51 via z and D_z(x) = 50 direct, all checked against the solution. With the default 16, the same run gives 12 rounds and both routers unreachable.

5. **nw6, the TCP header row.** The row now lists the 4 reserved bits and gives the flags as 8 one-bit fields. The widths add up to 4 + 4 + 8 + 16 = 32.

6. **nw6, rounding in ssthresh.** A paragraph after the Reno rules says the model counts windows in whole segments. It rounds down and keeps RFC 5681's floor of two segments: ssthresh = max(⌊cwnd / 2⌋, 2). It gives examples: 21 gives 10, and 3 gives 2. This matches cwnd_trace and the figure's timeout at 18 giving 9.

7. **nw7 P2, part (d).** Part (d) is now its own sentence: "(d) Redo (b) for HTTPS: the page is fetched over TLS 1.3 on top of TCP, and TLS's handshake takes one RTT after TCP's." The answer now spells out the count: one connection, so 1 + 1 + 9 = 11 RTT = 440 ms.

8. **nw7, DNS flag positions.** The header table now gives every flag's bit and value: QR 15 (0x8000), opcode 14–11, AA 10 (0x0400), TC 9 (0x0200), RD 8 (0x0100), RA 7 (0x0080), bits 6–4 reserved, rcode 3–0. So 0x8180 = QR + RD + RA can be checked, and P1's 0x0100 is RD alone.

9. **sc1 P1, the threat model.** The problem now describes the system itself and no longer refers to the site's own features:
   - a web server sends public lessons over HTTPS;
   - quiz scores are kept only in each student's browser;
   - a help chat sends the question and the lesson text through the server to a chatbot run by another company;
   - instructors log in with a password and can edit lessons that every student sees.

   The answer now names only these parts: assets, a student forging an edit (integrity), a Wi-Fi eavesdropper (confidentiality), and the chatbot's company as a third party that sees the questions. The prompt-injection adversary is gone, since the course hasn't taught it yet.

10. **sc3, TOTP digits.** The notes now explain the default. It is 8 digits because RFC 6238's test vectors are 8-digit codes. Authenticator apps use `digits=6`, which keeps the last six digits of the same number: `totp(..., 59, digits=6)` is 287082 (checked).

11. **sc4, OAEP's G and H.** The notes now define the mask function G (MGF1). It is SHA-256(s ‖ 0) ‖ SHA-256(s ‖ 1) ‖ …, with each counter written as 4 bytes, cut to the length wanted. The same G is used both times, so there is no undefined H any more. The notes state the output lengths: as long as m ‖ zeros for X, and as long as r for Y. They also say this G is not the toy H(data, n) above it.

12. **sc5, one canary per process or per thread.** The notes now say that glibc picks one random canary at startup. Each thread's local storage holds a copy of that same value, so there is one canary per process, stored in every thread's area. The assembly comment now reads "load the canary (this thread's copy)".

13. **cp2, FOLLOW rules.** The general rules are now in the notes, before the example uses them. Put eof in FOLLOW(start). For every rule A → α B β, add FIRST(β) to FOLLOW(B), and if β is nullable or empty, add FOLLOW(A) too. Repeat until nothing changes. The E′ example now applies these rules step by step: FOLLOW(E) = {), eof}, and E′ appears only at the ends of rules, so FOLLOW(E′) = FOLLOW(E).

14. **cp3 type_checker, one error or several (blocking).** The `("args", f)` row now says there is one error per call, however many arguments are wrong. It also notes that the notes' `type_of` reports each argument separately. The existing "Arguments" test already checks this case: `g(true, 1)` gives one `("args", "g")`.

15. **cp5, one pass or repeated.** The first sentence now says that one walk finds chains of dead code within a block. The second explains why the pass is repeated. Liveness was computed before anything was deleted, so a variable whose only reader was deleted in a later block is still in an earlier block's out set. Its definition survives the walk until liveness is recomputed.

16. **cp1/cp5, how optimized code reaches the VM.** cp1 now says that Mini has two back ends:
   - Lesson 4 goes straight from the checked tree to bytecode for the VM, without optimizing.
   - Lessons 5 and 6 go from the tree to the IR, optimize the IR, then produce RISC-V.

   The optimized IR is never turned back into bytecode, so the programs the VM runs are unoptimized; the figure draws both routes as one pipeline. "In the pipeline" is now "In a full compiler". cp5's introduction says the same in one sentence.

17. **Across courses, "allow everything else".** The nw8 quiz question's rules now end with a specific allow rule (rule 3, HTTPS to 10.0.0.80) and then "4 deny everything else". This matches nw8's own default-deny paragraph and CS 380's fail-safe defaults. The answer is still rule 1, and the explanation now adds that the default deny is never reached.

Files changed:
- data/cs330.js
- data/cs380.js
- data/cs365.js, rebuilt from the parts cp1.js, cp2.js and cp5.js with build.py. Before editing, I checked that a rebuild reproduced the original file byte for byte.
- data/cs330-code.js and data/cs365-code.js, regenerated from cs330_spec.py and cs365_spec.py.

The regeneration also reordered the set literals in several cs365 cp6 test strings, because set order changes from run to run. I kept only the type_checker prompt change and left everything else as it was in HEAD. mini.py is unchanged. All problem ids are unchanged.

---

# Student review: Year 3 Spring

*Round 3, part B (CS 360, CS 370). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a third-year CS student. Before this term I took CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240, PHYS 250, CS 310, CS 320, CS 340 and CS 350. I can program in Python and C, I've seen x86-64 assembly, grammars and parsing, and I know calculus, linear algebra and probability at that level. I read every lesson of CS 360 and CS 370 in order and tried each quiz and practice problem in my head. Both courses were mostly easy to follow: almost every new term, symbol and piece of foreign-language syntax is explained where it first appears. The items below are the places where I actually got stuck or found something contradictory.

### CS 360 Programming Languages

#### pl3: Functions, closures and the lambda calculus

1. "Early Lisp ran into exactly this, under the name of the funarg problem; this lesson's sidebar tells the story." This lesson's sidebar, "Landin and the closure", is about Landin, the SECD machine and ISWIM, and never mentions the funarg problem. The funarg story (Slagle, Russell's FUNARG device) is in Lesson 2's sidebar, "Lisp's accidental dynamic scope". So this sentence sends me to the wrong place.

2. "case ("lam", x, body):" and "case ("app", f, a):" in fv. Lesson 1 described sequence patterns only as "A sequence pattern in square brackets matches a list or tuple (never a string)". Patterns written in round parentheses were never shown. I couldn't tell whether ("lam", x, body) is the same kind of pattern, or whether it only matches tuples and not lists. That matters for the beta_reducer problem, which uses these tuple terms.

#### pl5: Types and type checking

3. typecheck_data: "Also write check_type(t), returning t if it is a valid type and raising TypeError otherwise", and "(nil T) … T must be a valid type (int, bool, or a pair or list type)". The previous problem's check_type accepted function types (-> …), and the starter is described only as "Lesson 5's type checker". The notes' version of that checker has no lambda or application. I couldn't tell whether a function type such as (-> int int) counts as valid in this problem (for example in (nil (-> int int)) or inside a pair), or whether the starter supports functions at all.

#### pl7: State, parameter passing and objects

4. store_passing: "Raise NameError for an unbound variable (including set of one), TypeError for a wrong number of arguments, and ValueError for an unknown mode or anything else malformed." It doesn't say what to raise for a call (g 1) to a procedure that was never defined. That could be read as an unbound name (NameError) or as "anything else malformed" (ValueError), and I couldn't decide which the tests expect.

### CS 370 Introduction to AI and Machine Learning

#### ml2: Games and constraint satisfaction

5. P1: "Run alpha-beta on the tree [[5, 6], [7, 4, 5], [3, 9]] … Then reorder the root's children to maximize pruning and say how many leaves are evaluated." In the given order the root's children have values 5, 4 and 3, so the best move is already first. Alpha-beta evaluates 5, 6, 7, 4, 3, which is five leaves. Every reordering I tried evaluates five leaves or more (putting [7, 4, 5] first gives six). The question implies that some reordering prunes more than the original order, and I couldn't find one. I don't know whether I've misunderstood, or whether it means reordering leaves inside the MIN nodes too.

#### ml5: Classification and honest evaluation

6. P4: "After choosing λ, what do you train the final model on, and what number do you report?" The scenario has only the 1,000 examples, all used for 5-fold cross-validation, and no separate test set. The notes say a score used to make a choice is optimistic ("If the test set guides any choice … the reported score is optimistic"). So I couldn't tell whether reporting the cross-validation score of the chosen λ is acceptable here, or whether the answer is supposed to be that a test set should have been held out first.

#### ml8: Language models, and the limits of AI

7. "often with reinforcement learning from human feedback (RLHF): … a separate model is trained to predict their rankings, and the language model is adjusted to produce responses that this reward model scores highly." "Reinforcement learning" is never defined in this course or in any earlier one. I don't see how the language model is "adjusted" toward high reward scores. Every other training step in the course is gradient descent on a loss computed against known targets, and here there's no target text, only a score for a sampled response.

### Across courses

No problems that span both courses. The reuse of α (alpha-beta, normalization, learning rate) and the several meanings of "bias" are pointed out where they occur, so they didn't confuse me.

## Professor's response (part B: CS 360, CS 370)

1. **pl3, funarg pointer.** Correct: the funarg story is in Lesson 2's sidebar. The sentence now reads "Lesson 2's sidebar, "Lisp's accidental dynamic scope", tells the story."

2. **pl3, round-parenthesis patterns.** Lesson 1's list of pattern kinds now says that round parentheses mean exactly the same as square brackets: `("lam", x, body)` is also a sequence pattern, matches a list or a tuple, and the bracket shape never restricts the type. (Checked in Python 3.12: both forms match both a list and a tuple.)

3. **pl5, typecheck_data and function types.** The prompt now says what the starter contains (integers, booleans, arithmetic, comparisons, `if` and `let`; no `lambda` or application, so the problem has no function types), and the `nil` rule says a valid type is `int`, `bool`, or a pair or list type built from valid types, with function types such as `(-> int int)` not valid anywhere in a type. This matches the existing hidden test, which expects `check_type(['->', 'int', 'int'])` to raise `TypeError`.

4. **pl7, store_passing and undefined procedures.** The prompt now names this case: a call such as `(g 1)` of a procedure that was never defined raises `ValueError`, because procedure names aren't variables. This matches the existing test.

5. **ml2 P1, reordering for alpha-beta.** You're right: reordering only the root's children can't beat five leaves, because the best move is already first. The question now says you may reorder both the root's children and the leaves inside each MIN node. The answer says the root order is already best (putting `[7, 4, 5]` first costs a leaf), that the gain comes from putting the smallest leaf first in the later MIN nodes, and why four leaves is the minimum: the first MIN node needs both leaves to set α, and each other MIN node needs at least one. I checked every ordering by brute force: root orders give 5, 5, 6, 6, 6 and 7 leaves, and the minimum over all orders is 4.

6. **ml5 P4, what to report.** The scenario now says a separate test set has been set aside and not looked at, and the cross-validation uses the remaining 1,000 training examples. The answer adds that if all the data had gone into cross-validation, there would be no honest number to report, and the fix is to hold out a test set before choosing anything.

7. **ml8, reinforcement learning.** The RLHF bullet now defines reinforcement learning as learning from a numerical reward for what the model did, rather than from a known correct answer. It also explains the adjustment: the model samples a response, the reward model scores it, and a gradient step raises the log-probability of that response's tokens if its score is above average (and lowers it if below). A penalty for drifting from the original model's probabilities is usually added. There is also a new key term, "Reinforcement learning".

Problem ids are unchanged. data/cs360-code.js was regenerated from cs360_spec.py (prompt text only).
