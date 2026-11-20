# Student review: Year 3 Spring

*Round 5, part A (CS 330, CS 380, CS 365). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a third-year student. Before this term I took CS 100, WRIT 100, CS 101/102, MATH 120/121, MATH 130/131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240, PHYS 250, CS 310, CS 320, CS 340 and CS 350. I read all three courses lesson by lesson and tried every quiz and practice problem in my head, checking the arithmetic in the worked examples as I went. Nearly all of it followed. The items below are the places where I got stuck or found two statements that disagree.

### CS 330 Computer Networks

#### nw2: The link layer

1. "a slot time is 512 bit times (the time to send the minimum 64-byte frame)". The Ethernet frame table, introduced as "A frame looks like this", lists Preamble (8 bytes) as a field. With the minimum 46-byte payload that table adds up to 8 + 6 + 6 + 2 + 46 + 4 = 72 bytes, not 64. Lesson 1, though, says "on the wire each frame is also preceded by an 8-byte preamble", which treats the preamble as outside the frame. I couldn't tell whether the preamble is part of the frame, or where the 64 comes from.

2. These two statements seem to contradict each other. One says "Detection is not correction: a frame that fails its check is simply discarded, and recovering it (if anyone cares) is the job of a higher layer (Lesson 5)". The other, about Wi-Fi, says "A missing acknowledgement is treated as a collision or loss, and the sender backs off and retries". So Wi-Fi does recover lost frames at the link layer. Lesson 1's sidebar also says "Lesson 2's link-layer checks discard bad frames without trying to guarantee delivery". I wasn't sure which statement holds for Wi-Fi.

3. "With a generator of degree r whose first and last bits are both 1, every single-bit error is caught, every burst of r or fewer consecutive bits is caught". The notes have just set up the polynomial view, where an error goes unnoticed only if E is a multiple of G. They then state these guarantees without showing why such an E can't be a multiple of G. I couldn't follow the step from "E is a multiple of G" to "no burst of r or fewer bits".

#### nw8: Networks in practice

4. "SYN cookies defend against it by encoding the connection's state in the server's initial sequence number, so the server stores nothing until the final ACK proves the client is real." I couldn't see how a server that stores nothing can check that a final ACK is genuine. I also couldn't see what "state" fits in a 32-bit ISN.

### CS 380 Security Fundamentals

#### sc2: Symmetric cryptography

5. "from cryptography.hazmat.primitives.ciphers.aead import AESGCM ..." The course notes elsewhere that the site's in-browser Python lacks some modules: "The Python on this site ... lacks it" in sc3, and CS 330's "It can't run in this page". This example gives no such note, so I didn't know whether the cryptography package exists here or whether I should try to run it.

#### sc3: Hashes, MACs and passwords

6. "code = int.from_bytes(mac[off:off + 4], "big") & 0x7FFFFFFF". The only explanation of dynamic truncation is the comment "pick 4 bytes". Nothing says why the top bit is masked off, or why the offset comes from the low 4 bits of the last byte.

#### sc6: Web security

7. "' with &#x27;" in html_escape. The notes' html.escape example output shows only &lt;, &gt; and &quot;, and the table just says "(and quotes, for safety)". I didn't know what &#x27; is, why a single quote gets that form instead of a named entity, or how the browser reads it.

#### sc7: Access control and side channels

8. "y = array2[array1[x] * 4096];". The notes say this "loads one line of array2 chosen by it", but don't say why the index is multiplied by 4096. I wasn't sure whether 4096 is the page size, the cache-line size or something else, or why a smaller multiplier wouldn't work.

### CS 365 Compilers

#### cp1: Compiler structure and lexing

9. In the token table: "operators and punctuation | <= >= == != && || and + - * / % ! < > = ( ) { } , ; :". The word "and" sits inside a list of lexemes, so at first I read it as an operator, like Python's and. Only later, from KEYWORDS and TWO_CHAR, could I tell it was English joining two lists.

#### cp6: Register allocation and the back end

10. "print(select(("le", "t1", "x", 10), {"t1": "t0", "x": "a0"}))" and P3's "t1 in t0 and t2 in a1". The TAC temporaries t1, t2, … have the same names as the RISC-V registers t0–t6. The notes also say "this code reserves t5 and t6 for that, so the allocator must not use them". I couldn't always tell whether a given "t1" meant a TAC variable or a register. I also wasn't sure whether TAC temporaries named t5 or t6 clash with the reserved scratch registers.

### Across courses

No other confusions spanned courses. The two firewall programming problems, CS 330 nw8 and CS 380 sc8, use different rule formats, but each prompt says so explicitly. The descriptions of TLS in CS 330 nw8 and CS 380 sc4/sc8 agree.

## Professor's response (part A: CS 330, CS 380, CS 365)

1. **Preamble and the 64-byte minimum (nw2).** The student was right that the table presented the preamble as a frame field. The table's introduction now says it shows "the preamble that precedes it on the wire (Lesson 1)", and the preamble row says it is "sent before the frame, not counted as part of it", which agrees with Lesson 1. The slot-time sentence now spells out where the 64 bytes come from: "64 bytes from destination address to check sequence, 6 + 6 + 2 + 46 + 4, not counting the preamble".

2. **Discard versus Wi-Fi retries (nw2, nw1 sidebar).** The detection paragraph now separates the two cases. Ethernet errors are rare, so a bad frame is just discarded and recovery is left to a higher layer (Lesson 5). Wi-Fi loses far more frames, so it also acknowledges and resends at the link layer, but only a few times before it gives up, which means guaranteed delivery is still the higher layer's job. Lesson 1's end-to-end sidebar now says "Lesson 2's Ethernet checks discard bad frames without trying to guarantee delivery (Wi-Fi's link-layer retries only make loss rarer)".

3. **Why bursts of length r or less are caught (nw2).** I added a short argument after the guarantees. Write any nonzero multiple of G as x^j · P′ · G, with P′ ending in 1. Then P′ · G ends in 1 (1 · 1) and has degree at least r. So every multiple of G spans at least r + 1 bit positions from its lowest 1 bit to its highest. A burst of b ≤ r flipped bits spans only b positions, so its E can't be a multiple of G. A single-bit error is the case b = 1.

4. **SYN cookies (nw8).** The sentence now says what goes into the 32-bit ISN, using the classic layout (Bernstein's, as first used in Linux): a 24-bit hash of the addresses, the ports, a coarse clock and a server secret; 5 bits of a clock that ticks every 64 seconds; and 3 bits encoding the client's MSS. It also says how the server checks the final ACK: subtract 1 from the acknowledgement number, check that the clock is recent, recompute the hash from the ACK's own addresses and ports, and compare. A spoofer never sees the SYN-ACK and can't compute the hash without the secret. It also notes the cost: options such as window scale are lost.

5. **Can the AES-GCM example run here? (sc2).** The block was labelled "not run here", but the text the student read didn't say so. The sentence that introduces it now says the code uses the `cryptography` package, which isn't in the standard library (`pip install cryptography`) or in the site's in-browser Python, so students should run it on their own computer. I ran the example locally with cryptography 50.0.1: it gives a 28-byte sealed value and decrypts back to `b'pay ana $100'`.

6. **TOTP dynamic truncation (sc3).** The paragraph after the code now explains both lines. `mac[-1] & 0x0F` keeps the low 4 bits of the last byte, an offset from 0 to 15, so the 4 bytes starting there always fit inside SHA-1's 20 bytes (at most bytes 15 to 18). Taking the offset from the tag just makes the choice of bytes vary from code to code. `& 0x7FFFFFFF` clears the top bit, leaving 0 to 2^31 − 1, so languages that read 4 bytes as signed and languages that read them as unsigned get the same code. This is the reason RFC 4226 itself gives.

7. **`&#x27;` (sc6).** After the attribute explanation, the notes now say that each escape is a character reference, which the browser shows as the character instead of reading it as markup. `&lt;` is a reference by name. `&#x27;` is a reference by number: hexadecimal 27, which is 39, the apostrophe. `html.escape` uses the number for `'` because the name `&apos;` wasn't part of HTML 4. I checked that `html.escape("'")` gives `&#x27;`. This is the form the sc6 programming problem asks for.

8. **Why `* 4096` (sc7).** The Spectre paragraph now explains the factor. It places the 256 possible byte values 4,096 bytes apart, one 4 KB page each (CS 310 Lesson 6), so each value has its own 64-byte cache line (CS 210 Lesson 7) far from the others. A multiplier of 64 would also give separate lines, but neighbouring ones, and the processor's prefetcher (defined in the same sentence) would load those too, which would hide which line was really touched.

9. **"and" in the token table (cp1).** The operators cell now reads "two characters: `<= >= == != && ||`; one character: `+ - * / % ! < > = ( ) { } , ; :`". The English "and" is gone, and the split matches the lexer's TWO_CHAR set.

10. **TAC temporaries versus registers (cp5, cp6).** I did the rename. `Lower.temp` in Lesson 5 now makes temporaries named `v1`, `v2`, …, and every TAC temporary in Lessons 5 and 6 now has that form. That covers the notes, tables, figure, quiz choices and answers, and the problem specs for `constant_folding`, `dead_code`, `interference_graph` and `graph_coloring`, whose test data now say `v1` and so on. As a result, every `t0`–`t6` in Lesson 6 is a RISC-V register. Lesson 5's definition of temporaries says why they're named with a v. Lesson 6 replaces round 4's "beware a clash of names" note with a shorter one: in this lesson every t0–t6 is a register, a map such as `{"v1": "t0"}` puts temporary v1 in register t0, and a TAC name reaches the machine code only through the map. That last point answers the t5/t6 question: even a Mini variable named `t5` wouldn't clash with the reserved scratch registers. P3 now reads "the TAC temporary v1 in register t0". The rename doesn't change any results, because `v` sorts after `a`, `b` and `c` just as `t` did, so the alphabetical tie-breaks and every allocation are the same. Problem ids are unchanged.

   A note on files: the cs365 part files already contained round 4's fix for this item (the clash note and the reworded P3), but the committed data/cs365.js didn't have it. That is why the student still saw the old text. A rebuild from the parts differed from the committed file only in those two places, so I treated the parts as the source and rebuilt from them. data/cs365.js now matches the parts exactly. In data/cs365-code.js I kept the committed set ordering and applied only the renames, so the diff is 16 changed lines, each identical to the old line apart from t1–t4 becoming v1–v4.

**Across courses.** The student reported nothing here, so no change was needed.

### Checks

- `node --check` on data/cs330.js, data/cs380.js, data/cs365.js and data/cs365-code.js: all pass.
- Regenerating cs365-code.js with `gen_code.py`: 0 problems need attention. Starters still fail.
- Pyodide test run of data/cs365-code.js (`pyrun.mjs`): 136 lines, all "ok".
- `validate_content.js`: all good.
- `check_problems.py`: 303 problems, 0 problems found.
- `check_lesson_code.py` filtered to cs330, cs380 and cs365: no lines.
- `lesson_time.js` slow estimates: nothing is over 100. cp5 is 96, unchanged. nw2 is 74, nw8 72, sc3 70, sc6 64, sc7 63, cp1 77 and cp6 81.
- `test_dump_course.js`: all checks passed.

---

# Student review: Year 3 Spring

*Round 5, part B (CS 360, CS 370). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I am a third-year student. Before this term I finished CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240, PHYS 250, CS 310, CS 320, CS 340 and CS 350. So I know Python well, some C and x86-64 assembly, grammars and parsing, Rice's theorem, Dijkstra's algorithm, eigenvalues and least squares, and basic probability and statistics. I read both dumps in full, lesson by lesson, and tried every quiz question and practice problem. I re-derived many of the printed numbers along the way (the naive Bayes table, the alarm-network terms, the house-data sums, the perceptron trace, the k-means trace, the attention weights, the bigram probabilities). Those all matched, so the list below covers only the places where I actually got stuck.

### CS 360 Programming Languages

#### pl4: Functional programming

1. "Both must work on lists of 100,000 elements, so foldr can't simply recurse." The hint then says "my_map puts f(x) in front of the list built from the rest (foldr)", which I read as `[f(x)] + acc`. On a 100,000-element list that copies the accumulator every step, so it is quadratic. I couldn't tell whether the 100,000-element requirement covers only foldl and foldr, or also my_map, my_reverse and flatten. If it covers all of them, I don't see how to write them with folds alone and no loops without hitting that quadratic cost.

#### pl5: Types and type checking

2. "Progress. A well-typed expression is either a value, or it can take a step. It is never stuck." Earlier the same paragraph says "Variables have no rule, because substitution replaces them before they are reached." With Γ = {x : int}, the expression x is well typed (the derivation in the notes uses exactly this Γ), yet it is not a value and no step rule applies. So it looks stuck, which contradicts the lemma. I couldn't tell whether progress is meant only for expressions typed in the empty environment. The notes never say so.

#### pl6: Type inference and polymorphism

3. "Since r can't look inside the elements, which positions it copies into its output can depend only on the input's length: output position i holds the input's element at some position p(i), the same p for every list of that length." The whole reverse/map argument rests on this step, and it is stated rather than shown. I could accept that r can't compare or inspect elements. I couldn't see why that forces the same p for every list of a given length.

### CS 370 Introduction to AI and Machine Learning

#### ml2: Games and constraint satisfaction

4. P3: "Then solve it with the notes' backtrack, giving the schedule." The notes' `backtrack` reads the global `neighbors` dict, which is the Australia map. It doesn't take the constraint graph as an argument. I wasn't sure whether to overwrite that global with the exam conflicts or rewrite the function. Either is doable, but the problem reads as if the function could be reused unchanged.

#### ml4: Learning from data: linear regression and gradient descent

5. "Here the curvatures are the eigenvalues (MATH 220 Lesson 7) of the matrix of second partial derivatives of L … Gradient descent diverges unless α < 2/13,949." The MATH 131 example f = x² + 2y² was already separated into x and y, so each coordinate shrank on its own. Here the matrix is not diagonal (its entries are 6, 480, 15, …), and the notes never say why gradient descent still acts separately along each eigenvector, multiplying by 1 − αλ per step. That per-step factor first appears only in the hint to P4. Without it I couldn't follow where the bound 2/λ comes from in the notes themselves.

### Across courses

I didn't find any confusion that spans the two courses. Where a symbol is reused (α in CS 370, "normal" in CS 360's lambda-calculus section), the notes already say what it means each time.

## Professor's response (part B: CS 360, CS 370)

### CS 360 Programming Languages

1. **Fixed (prompt and hint of `pl4/folds`, id unchanged).** I checked by running. Only the "Long lists" test uses 100,000 elements, and it calls only `foldl` and `foldr`. `my_map`, `my_filter`, `my_reverse` and `flatten` are tested on lists of at most five elements. A fold-only solution of the hinted shape (`foldr` looping over `reversed(xs)`, `my_map` as `foldr(lambda x, acc: [f(x)] + acc, xs, [])`, `my_reverse` as `foldl(lambda acc, x: [x] + acc, [], xs)`) passes all five tests in Pyodide. The slowest test, "Long lists", took 43 ms against the 5-second limit. You are right that the `+` version is quadratic: in Pyodide, `my_map` built that way took 0.09 s on 10,000 elements and 0.79 s on 30,000, so it would take several seconds on 100,000. The prompt now says "These two must work on lists of 100,000 elements" and adds that the four derived functions "are tested only on short lists, so they may build each new accumulator with `+`, as in `[f(x)] + acc`, even though that copies the list at every step and takes time quadratic in its length." The hint now shows `[f(x)] + acc` explicitly. I regenerated the spec: 0 problems, and the starter still fails.

2. **Fixed (pl5, "Soundness" section, and the Progress key term).** Progress is now stated for *closed* well-typed expressions, meaning ones typed in the empty environment Γ = {}. A parenthetical uses your counterexample: with Γ = {`x` : int}, `x` alone is well typed but stuck. It also says why closed terms are the case that matters: a whole program is closed, and a step never creates a free variable.

3. **Fixed (pl6, the parametricity paragraph).** The notes now argue the step instead of just stating it. Because r's code must work for every type, it has no operation it can apply to an element. So each decision it makes (which branch, how long to loop, what to copy where) can depend only on the list's length. Two lists of the same length therefore drive r through the same steps and copy the same positions to the same places. That fixed position map is p, and running r on [0, 1, …, n − 1] shows it.

### CS 370 Introduction to AI and Machine Learning

4. **Fixed (ml2 P3 question).** The question now says that `backtrack` reads the constraint graph from the global `neighbors` dict, so you set `neighbors` to the conflict graph first, and that the function itself needs no change. This matches what the model answer already does and its closing note.

5. **Fixed (ml4, the conditioning paragraph).** The notes now derive the per-step factor before they use it. Call the matrix H. Since the gradient (2/n)Aᵀ(Aθ − y) is zero at θ*, subtracting gives ∇L(θ) = H(θ − θ*). One step therefore maps the offset d to (I − αH)d. H is symmetric, so it has an orthonormal eigenvector basis (the spectral theorem, MATH 220 Lesson 8). In that basis each component is multiplied by 1 − αλₖ, just as each coordinate was in MATH 131's example. A component grows when α > 2/λₖ, which gives the bound 2/13,949. No numbers changed.

### Across courses

The student reported no problems that span the two courses, so no change was needed.
