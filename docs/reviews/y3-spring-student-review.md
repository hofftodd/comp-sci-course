# Student review: Year 3 Spring

*Round 1, part A (CS 330, CS 380, CS 365). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a third-year CS student. Before this term I completed CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240, PHYS 250, CS 310, CS 320, CS 340 and CS 350. I can program in Python, read some C and x86-64/RISC-V assembly, and I know basic probability, automata and grammars, graph algorithms, and operating systems. I read the dumped text of CS 330, CS 380 and CS 365 in lesson order and tried every quiz and practice problem in my head.

### CS 330 Computer Networks

#### nw1: How networks work

1. "A standard model takes arrivals as a Poisson process and transmission times as exponential … The simulation below checks this for 1,000-byte packets on an 8 Mb/s link". The simulation's docstring says "exponential sizes", but the prose says the packets are 1,000 bytes. Fixed-size packets don't have exponential transmission times. P4 then uses fixed 1,500-byte packets with the same formula, so I don't know whether the formula is supposed to apply to them.
2. "Queueing theory shows that the average time a packet spends at the link … is then (L/R) / (1 − ρ)." This formula is given with no derivation or reasoning. I can only take it on trust and check it against the simulation.
3. Q5: "What is the bandwidth-delay product of a 1 Gb/s path with a 20 ms RTT? | 2.5 MB / 20 Mb / …" 10⁹ × 0.020 = 2 × 10⁷ bits, which is 20 Mb, and that equals 2.5 MB. Two options are the same quantity, but only "2.5 MB" is marked correct.

#### nw2: The link layer

4. "each host has its own full-duplex cable to a switch". The term "full-duplex" isn't defined anywhere.

#### nw3: IP: addresses and forwarding

5. "hardware routers use special memories (TCAM) that compare the address against every entry at once". TCAM isn't expanded or explained beyond "special memories".

#### nw4: Routing

6. "With synchronous rounds this takes 47 rounds." I traced a few rounds by hand and they alternate in a way that isn't simply "up by 2 every two rounds" for both routers, so I can't see how to get 47. No calculation is shown.

#### nw5: Transport and reliable delivery

7. "because UDP passes through the internet's middleboxes where a new transport protocol would not". "Middleboxes" isn't defined, and the lesson doesn't say why they would block a new transport protocol.

#### nw6: TCP

8. "flags (CWR, ECE, URG, ACK, PSH, RST, SYN, FIN) … urgent pointer". The notes explain SYN, ACK, FIN and RST, and later CWR and ECE. URG, PSH and the urgent pointer are never explained.
9. "Working through how often losses must happen for that cycle gives a famous approximation (Mathis and others, 1997): with loss rate p, throughput ≈ 1.22 · MSS / (RTT · √p)." The step from the 3W/4 average to this formula is skipped. I can't see where the 1.22 or the √p comes from.

#### nw7: The application layer: DNS, HTTP and content delivery

10. The DNS section says the 13 root names are "together run as well over a thousand copies around the world". The CDN section says "the root DNS servers use anycast to run hundreds of copies at 13 names". The two numbers disagree.

#### nw8: Networks in practice

11. "for the link to stay busy during the following RTT, the buffer must have held the difference, which works out to the bandwidth-delay product, C · RTT". "Works out to" skips the reasoning. I can't see why the difference between W and W/2 equals C · RTT.
12. P3(b): "Two servers in different pods: how many shortest paths join them?" (blocking) The notes say only that "each aggregation switch connects to k/2 of the (k/2)² core switches", not which core switches. Without knowing how core switches connect to pods, I can't count the paths.

### CS 380 Security Fundamentals

#### sc1: Thinking about security

13. "This is the cryptographers' Kerckhoffs's principle, from 1883 (Lesson 2)." Lesson 2 never mentions Kerckhoffs or the principle, so the cross-reference leads nowhere.

#### sc2: Symmetric cryptography

14. The programming problem "Build counter (CTR) mode on a toy pseudorandom function" names a pseudorandom function and a function prf. The lesson defines a pseudorandom permutation (PRP) but never a pseudorandom function, or how one differs from a PRP.

#### sc3: Hashes, MACs and passwords

15. "HMAC is provably a secure MAC if the compression function behaves like a PRF." "PRF" is used again without definition (see item 14), so I can't tell what condition is being assumed.

#### sc4: Public-key cryptography

16. "Modern systems mostly use the same idea on an elliptic curve group, such as X25519". "Group" and "elliptic curve" are never explained. I know modular arithmetic, but not what makes something a group.
17. "With e = 3 and m = 42, c = 42³ = 74,088 is less than n". The only n in this lesson is the toy 3233 (with e = 17), and 74,088 is larger than that. The n meant here is never given.
18. "The CS 330 networks course places TLS between TCP and HTTP; Lesson 8 returns to what TLS does and doesn't protect." I can't tell whether "Lesson 8" means CS 330 Lesson 8 or CS 380 Lesson 8. Both discuss it.

#### sc5: Memory safety

19. "movq %fs:40, %rax # load the process's random canary". The %fs: prefix (a segment register or thread-local storage) wasn't covered in CS 210's x86-64, and the lesson doesn't explain it.

### CS 365 Compilers

#### cp1: Compiler structure and lexing

20. Both programming problems say to "raise LexError", but neither says where LexError comes from. The precedence-climbing problem says ParseError is "defined in the starter"; these two don't, so I don't know whether to define LexError myself.

#### cp2: Parsing

21. In the FIRST-set table, the block row reads "block | { { } |". I can't tell whether this means the set containing the token {, or something else.

#### cp4: Code generation for a stack machine

22. Lesson 3 says "The resolver replaces every ("var", name) by ("local", slot)", and Lesson 4 opens "After Lesson 3, the program is a checked tree in which every name has a slot". But CodeGen still handles ("var", name) and looks names up in a single dict `slots  # name -> slot, from the resolver (Lesson 3)`. A flat name-to-slot dict can't tell apart two shadowed variables with the same name (Lesson 3's example gives two xs different slots). The code doesn't match what the resolver was said to produce.

#### cp6: Register allocation and the back end

23. "t = a + 8 followed by a load from address t becomes one lw rd, 8(ra)". In the calling-convention section, ra is the return-address register. I can't tell whether ra here means "the register holding a" or the actual ra register. If it means ra, the instruction seems wrong.

### Across courses

24. CS 365 Lesson 1's sidebar says Thompson's "1983 Turing Award lecture, 'Reflections on Trusting Trust'". CS 380 Lesson 8's sidebar says "In his 1984 Turing Award lecture, Ken Thompson…". The two courses give different years for the same lecture.

## Professor's response (part A: CS 330, CS 380, CS 365)

### CS 330 Computer Networks

1. **Fixed or exponential sizes (nw1).** The prose now says the model takes packet *sizes*, and so transmission times, as exponential with mean size L, and the simulation is described as "packets averaging 1,000 bytes" with "mean L/R = 1 ms", which matches its docstring. After the simulation, a new sentence gives the result for equal-sized packets, (L/R)(1 + ρ/(2(1 − ρ))), which is 5.5 transmission times at ρ = 0.9 instead of 10. I checked this by running the notes' simulation with `free = start + 1.0`: it gives 1.5, 2.98 and 5.5 at ρ = 0.5, 0.8 and 0.9, against formula values of 1.5, 3.0 and 5.5. The new sentence also calls the exponential model a slightly pessimistic estimate for equal-sized packets. Practice 4 now says "Poisson arrivals with exponentially distributed sizes averaging 1,500 bytes", so the notes' formula applies to it exactly. Its answer is unchanged.
2. **(L/R)/(1 − ρ) with no reasoning (nw1).** Added a short derivation from two facts. The first is Little's law, N = aT, with a one-line reason. The second is that Poisson arrivals see the average number N, and memorylessness means even the packet being sent has L/R left on average. From these, T = (1 + aT)·L/R = L/R + ρT, so T = (L/R)/(1 − ρ).
3. **Q5's two equal options (nw1).** The distractor "20 Mb" is now "20 MB", which is wrong, so only "2.5 MB" is correct.
4. **Full-duplex (nw2).** Defined where it first appears: a cable that carries signals in both directions at once, on separate wire pairs or fibres.
5. **TCAM (nw3).** Expanded to ternary content-addressable memory. The notes now explain that it stores each prefix as 0, 1 or "don't care" bits, compares the address against every entry at once in one cycle, and orders entries so the longest match wins.
6. **47 rounds (nw4).** Added a table of D_y(x) and D_z(x) after rounds 1 to 4 and 44 to 47, with the argument. In round 1, z still hears y's old 4. After that, y changes in odd rounds and z in even rounds, and whoever changes in round r has r + 5. y reaches 50 in round 45, z switches to its direct link in round 46, and y gets 51 in round 47. I verified this with a synchronous simulation, which converges after round 47.
7. **Middleboxes (nw5).** Defined: a device on the path that does more than forward IP packets, such as a NAT router (Lesson 3) or a firewall. The notes add that these read the transport header, since a NAT must rewrite ports, so many of them pass only TCP and UDP.
8. **URG, PSH and the urgent pointer (nw6).** Added a paragraph after the header table. It points to where SYN, ACK, FIN, RST, ECE and CWR are explained, then explains PSH, URG and the urgent pointer, and says that URG is effectively unused today.
9. **Where 1.22 and √p come from (nw6).** Added the derivation. One sawtooth cycle lasts W/2 RTTs and sends 3W²/8 segments with one loss, so p = 8/(3W²) and W = √(8/(3p)). Then throughput = (3/4)·√(8/(3p))·MSS/RTT = √(3/2)·MSS/(RTT·√p), and √1.5 = 1.2247 (computed). The existing example, p ≈ 2.03 × 10⁻¹⁰, was rechecked.
10. **Root server copies (nw7).** The CDN section now says "well over a thousand copies under their 13 names", which matches the DNS section. The figure is correct: root-servers.org lists well over a thousand instances.
11. **Buffer = C·RTT (nw8).** Replaced "works out to" with the argument. Loss happens at W = C·RTT + B. After halving, the link stays busy only if W/2 ≥ C·RTT. Together these give B ≥ C·RTT.
12. **Fat-tree paths (nw8, blocking).** The notes now give the wiring: the (k/2)² core switches form k/2 groups of k/2, and the i-th aggregation switch of every pod connects to all of group i. So each core switch has exactly one link into each pod. The P3(b) answer now spells out the path down through that one link, which gives 16 × 16 = 256 paths, one per core switch.

**C1. Made-up ping and traceroute output (nw8).** The paragraph before the ping block now says that this output and the later traceroute output are illustrative: written for the lesson to show typical results, not captured from a real network, using documentation addresses. The traceroute intro says the same ("illustrative output (made up, like the ping output above)"). Both blocks are now labelled "Illustrative output" instead of "Terminal". The old parenthetical about documentation addresses was removed, since the new sentence covers it.

### CS 380 Security Fundamentals

13. **Kerckhoffs reference (sc1 → sc2).** Lesson 2 now names the principle where AES is introduced. Its design is public and was chosen in an open competition, which follows Kerckhoffs's principle (Auguste Kerckhoffs, 1883), Lesson 1's open design: a cipher must stay secure even if everything except the key is known. Lesson 1's "(Lesson 2)" now leads somewhere.
14. **PRF undefined (sc2, programming problem).** The block-ciphers section now defines a pseudorandom function: a keyed function, not necessarily invertible, indistinguishable from a random function to anyone without the key. It also says that a PRP is a PRF that is a permutation, and that CTR mode computes only E, so a PRF is enough. The CTR problem's prompt (cs380_spec.py, regenerated) points to that definition and says why a PRF suffices.
15. **PRF in HMAC (sc3).** Now reads "behaves like a PRF (a pseudorandom function, Lesson 2)", which is defined there now (item 14).
16. **Group and elliptic curve (sc4).** Added a short definition. A group is a set with an associative operation, an identity and inverses, and 1 to p − 1 under multiplication mod p is one. The elliptic-curve group is the points mod a prime on an equation such as Curve25519's y² = x³ + 486662x² + x (mod 2²⁵⁵ − 19), with a rule for combining points. In X25519, g^a becomes "combine the base point with itself a times". The algebra is marked as beyond the course. While there, I corrected "similar security" to "similar to a 3072-bit prime's", which is the standard comparison for 256-bit curves.
17. **Which n (sc4).** Now reads "With e = 3, a real 2048-bit n and m = 42, c = 42³ = 74,088 is far less than n".
18. **Which Lesson 8 (sc4).** Now reads "The CS 330 networks course, taken alongside this one, places TLS between TCP and HTTP; this course's Lesson 8 returns to …". CS 380 Lesson 8 does have the "What TLS does and doesn't protect" section.
19. **%fs:40 (sc5).** Added before the listing: the canary is kept in thread-local storage, a per-thread area whose address the OS keeps in the %fs segment register. %fs:40 is the 8 bytes at offset 40 there, which the C library fills with random bytes at start-up.

### CS 365 Compilers

20. **Where LexError comes from (cp1).** Both prompts now say LexError is "defined in the starter". Both starters already define `class LexError(Exception)`. Specs edited and problems regenerated.
21. **"{ { }" in the FIRST table (cp2).** The row now reads "{'{'}: the set whose one member is the token {".
22. **CodeGen uses ("var", name) and a flat dict (cp4).** The student is right that the code doesn't match the resolver's output. The lesson's opening now says the resolver *can* give every variable a slot. A new paragraph before "Compiling expressions" states the simplification: the notes' CodeGen takes unresolved ("var", name) trees and a name-to-slot dict, which works only without shadowing, and that holds for every example in the lesson. On a resolved tree the case would be ("local", slot) → ("load", slot) with no lookup. The paragraph also says the second programming problem (compile_program), which must handle shadowing, keeps its own scope stack as Lesson 3's resolver does, which is what its prompt and hint already say. The dict's comment now reads "name -> slot (no shadowing: see above)". I chose not to rewrite all of cp4's code to resolved trees, since every example and the codegen problem's tests are built on unresolved trees.
23. **lw rd, 8(ra) (cp6).** This was wrong in spirit: "ra" there was meant as "the register holding a", which clashes with RISC-V's return-address register. It now reads `lw rd, 8(rs)`, with rs the register holding a and rd the destination, and says explicitly that this is not the return-address register ra.

### Across courses

24. **Thompson's lecture year.** Checked. Thompson (with Ritchie) received the 1983 Turing Award, and "Reflections on Trusting Trust" was published in Communications of the ACM 27(8), August 1984 (the thompson84 source in program.js). Both sidebars now say the same thing: "In "Reflections on Trusting Trust", the lecture he gave on receiving the 1983 Turing Award (published in Communications of the ACM in August 1984), Ken Thompson …". This is in CS 380's "Reflections on trusting trust" sidebar and CS 365's "Trusting the compiler" sidebar.

### Files and build

- Edited data/cs330.js and data/cs380.js directly.
- CS 365: I edited the part files (scratchpad/cs365/cp2.js, cp4.js, cp6.js, tail.js) and rebuilt data/cs365.js with build.py. Before editing, I confirmed that a rebuild reproduced the existing data file byte for byte, so the parts are **not** stale.
- I edited cs380_spec.py and cs365_spec.py and regenerated data/cs380-code.js and data/cs365-code.js. Both regenerations reported "0 problem(s) need attention". Apart from the two prompts, the cs365-code.js diff only changes the printed order of Python sets in a few graph-problem test strings, caused by hash randomization in the generator. The values are unchanged and all tests pass.
- data/cs330-code.js, cs330_spec.py and scratchpad/cs365/mini.py were not changed.

### Checks

- `node --check` on data/cs330.js, data/cs380.js, data/cs365.js, data/cs380-code.js and data/cs365-code.js: all OK.
- Pyodide test runs printed only "ok" lines: cs330-code (pyrun.mjs), cs365-code (pyrun.mjs, 135 ok) and cs380-code (pyrun380.mjs, 78 ok).
- `validate_content.js`: all good.
- `check_problems.py`: 303 problems, 0 problems found.
- `check_lesson_code.py`: nothing for cs330, cs380 or cs365. The only mismatches are the known cs101/cs102 false alarms.
- `lesson_time.js`: the longest slow estimate is cp5 at 91 minutes; cp5 was not touched. Nothing is over 100.
- `test_dump_course.js`: all checks passed.

---

# Student review: Year 3 Spring

*Round 1, part B (CS 360, CS 370). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a third-year CS student. Before this term I completed CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220, MATH 230, CS 220, CS 230, CS 240, PHYS 250, CS 310, CS 320, CS 340 and CS 350. I program comfortably in Python and know some C and x86-64 assembly from CS 210. I have never seen OCaml, Haskell, Rust or C++. I read the dumped text of CS 360 and CS 370 in order and tried each quiz and practice problem in my head.

### CS 360 Programming Languages

#### pl2: An interpreter: variables and scope

1. P4: "This Python program raises an error. Which one, and what does it show about how Python decides scope?" The notes say that "assigning to x anywhere in a function makes every x in that function local, even uses earlier in the body". They never say which exception this causes, so I can explain why it fails but can't name the error. (blocking)

#### pl3: Functions, closures and the lambda calculus

2. Sidebar: "The same paper used the term syntactic sugar for notation that can be translated into a smaller core, the idea behind Lesson 1's s-expressions." Lesson 1 presented s-expressions as a notation with no precedence, chosen to avoid parsing. It never presented them as sugar translated into a smaller core. Lesson 1 defined syntactic sugar separately, using examples like `x += 1`. I don't see how syntactic sugar is "the idea behind" s-expressions, so the two lessons seem to contradict each other.

#### pl4: Functional programming

3. "OCaml's 'a option has constructors None and Some x". The `'a` notation isn't explained until Lesson 6 ("where 'a (read "alpha") is a type variable"). Here I didn't know what `'a` meant.

4. "end the match with case _: assert_never(s) (from typing), and if you add a Triangle class to the union mypy reports ... expected "Never"". The notes don't explain what `assert_never` does or what the type `Never` is. I can't see why calling it makes mypy detect a missing case.

5. In the Haskell example, `zipWith (+) fibs (tail fibs)`, the `:` in `0 : 1 : ...`, `:: [Integer]` / `:: Int`, and `main = do` are not explained. The notes only explain `[1 ..]` and say in words what fibs does. I can't follow how the fibs line computes each element.

#### pl5: Types and type checking

6. "For a language described by small steps (one reduction at a time, as in the lambda calculus), soundness is usually proved as two lemmas". Mini was only given big-step rules (e ⇓ v). Progress and preservation talk about "e steps to e′", but no step relation was ever defined for Mini. I don't know what a "step" of a Mini expression is, so the two lemmas are hard to understand.

7. Q4 says "Loop forever, if Mini had recursion". Mini does have recursion: Lesson 3 added `letrec`, and this lesson's own programming problem adds a typed `letrec`. The phrase "if Mini had recursion" contradicts both.

8. P4(c) and (d): "print(len(5)) in a file without annotations" and "def g(x): return x + 1 followed by g("a")". The notes only say "unannotated parts and anything of type Any are trusted". I can't tell whether mypy checks module-level calls to library functions like `len` in a file with no annotations. I also can't tell whether it checks a call to an unannotated function. (blocking)

9. P2(d): "(lambda ((n int)) n n)" asks me to "say which rule fails". No rule covers a lambda with two body expressions, so I'm not sure whether the expected answer is a rule failing or "not an expression".

#### pl7: State, parameter passing and objects

10. P3: "under call-by-value, call-by-reference, and call-by-name" for `def f(a, b): a = a + 1; return a + b` called as `f(x, x)`. Call-by-name is defined only for using a parameter ("re-evaluated in the caller's environment every time the parameter is used"). The notes never say what assigning to a call-by-name parameter does. Jensen's device hints that it changes the caller's variable, but this is never stated. (blocking)

11. In the C vtable example, the lone line `struct Shape;` before `struct VTable` and the nested initializer `{ { &RECT, 2, 3 }, { &TRI, 4, 5 } }` are not explained. The notes explain structs and function pointers, but not forward declarations or this initializer syntax.

#### pl8: Memory management and language design

12. "finds groups of container objects that are referenced only from inside the group". The notes never say what a "container object" is, or which objects the cycle collector ignores.

13. The Rust examples use `vec![...]`, `println!`, `i32`, `v.iter().sum()`, `let mut` and `String::from`. The error message also mentions "does not implement the 'Copy' trait". None of these (including "trait") is explained. P4(a) depends on whether a `String` is moved or copied, and the notes only say "Small values such as integers are copied instead". I had to guess that a String isn't "small".

### CS 370 Introduction to AI and Machine Learning

#### ml2: Games and constraint satisfaction

14. P2: "The first MAX child of the root in a depth-3 tree (MAX, MIN, MAX, leaves) ... under the second MIN child, alpha-beta can stop as soon as one of its MAX children has value ≤ 10, but must examine all the leaves of that first MAX grandchild." With levels MAX, MIN, MAX, the root's children are MIN nodes, so "the first MAX child of the root" contradicts "the second MIN child". I can't work out which node has value 10. (blocking)

15. "It solves the million-queens puzzle in a few dozen steps". The n-queens puzzle is never described, so I don't know what is being solved or what its variables and constraints are.

#### ml3: Reasoning under uncertainty

16. bayes_net hint: "product((True, False), repeat=k) yields every tuple of k truth values." The notes never introduce or import a function called `product`, and don't say which module it comes from.

#### ml4: Learning from data: linear regression and gradient descent

17. "the matrix of second partial derivatives of L, which works out to (2/n) A^(T)A". This step is skipped: the notes don't show why the second derivatives of the MSE form this matrix. Then "They are about 13,949, 0.29 and 0.098" is given with no way to check it.

#### ml5: Classification and honest evaluation

18. P2: "Explain why the leave-one-out accuracy of 1-NN on the nine points is 5/9: which points does it get wrong". For (6, 6) and (7, 6), the two nearest neighbours are at equal distance and have different labels, so the answer depends on how ties are broken. The notes never say. The tie rule (stable sort, original order) only appears later, in the knn_cv programming problem. (blocking)

19. "The ROC curve plots the true-positive rate against the false-positive rate". Neither rate is defined. I can guess that the true-positive rate is recall, but not what the false-positive rate's denominator is. P3 then says "a false-positive rate of 1%" and expects me to use it.

20. "for linear regression it is called ridge regression, and it also cures Lesson 4's singular A^(T)A". The notes don't explain why adding the penalty makes A^(T)A invertible, or what the normal equations become with it.

#### ml6: Decision trees, ensembles and clustering

21. "If the predictors are correlated with correlation ρ, the average's variance is ρσ² + (1 − ρ)σ²/m". This formula is stated without derivation. MATH 230 only covered the independent case (σ²/m). P4 depends entirely on this formula.

22. "Small boosted trees reduce the bias of a simple model rather than the variance of a complex one". "Variance (of a model)" is defined, but "bias" in this sense is not. In Lesson 4, "bias" meant the intercept b, so I didn't know what bias a boosted tree reduces. "a gradient step taken in the space of functions" was also unclear to me.

#### ml8: Language models, and the limits of AI

23. "Each block applies multi-head attention, then a small two-layer network to each position separately ... the vectors are rescaled to a standard size (layer normalization)". The notes don't say how the outputs of several attention heads are combined into one vector. They also don't explain what "rescaled to a standard size" means, or what the "recurrent networks" they contrast with are.

### Across courses

24. In CS 370, α means three different things: α and β in alpha-beta pruning (Lesson 2), the normalization constant "α ⟨0.12, 0.08⟩" (Lesson 3), and the learning rate "with a learning rate α > 0" (Lesson 4). Meanwhile CS 360 uses "alpha" for alpha-renaming. The notes never point out the reuse. In Lesson 4 I first read "α ∇L" as the normalization constant.

## Professor's response (part B: CS 360, CS 370)

### CS 360 Programming Languages

1. pl2: the notes paragraph on Python's compile-time scope now names the error. Reading such an `x` before its assignment raises `UnboundLocalError` (a subclass of `NameError`), because the name is known to be local but has no value yet. I checked this in Python 3.12, which prints "cannot access local variable 'x' where it is not associated with a value".
2. pl3 sidebar: the sentence linking the sidebar to s-expressions was wrong. It now says that Landin coined the term *syntactic sugar*, the term Lesson 1 used for features such as `x += 1`: notation that can be translated into a smaller core language.
3. pl4: the option-type sentence now explains `'a` where it first appears. It is read "alpha" and stands for any type, so an `int option` is `None` or `Some` of an int. It also points forward to Lesson 6.
4. pl4: added an explanation of `assert_never`. mypy narrows the type of `s` through the cases. `Never` is the type with no values, and `assert_never`'s parameter has that type. If every member of the union is handled, `s` is `Never` in the final case and the call type-checks; if `Triangle` is unhandled, the call is an error. At run time the call raises `AssertionError`. I checked both mypy's message (mypy 2.3.1) and the run-time exception.
5. pl4: added a short guide to the Haskell syntax: `main = do`, `x : xs`, `e :: T`, and `Int` versus `Integer`. A new paragraph also works through `fibs`: `tail fibs`, `zipWith (+)` written as the equivalent Python comprehension, and why element k+2 is the sum of elements k and k+1. It explains why laziness makes this work.
6. pl5: before the soundness lemmas, the notes now say that Mini's rules are big-step and define a small-step relation e → e′. Two worked examples are given: `(+ (+ 1 2) 4) → (+ 3 4) → 7` and the `if` case. "Stuck" is defined there too.
7. pl5 Q4: the choice now reads "Loop forever (using letrec)". The contradictory "if Mini had recursion" is gone.
8. pl5: the gradual-typing paragraph now states mypy's default rules precisely:
   - Module-level code is always checked.
   - Calls are checked against the callee's signature when it has one.
   - Standard-library signatures come from stubs, so `len(5)` is reported even in a file with no annotations.
   - A completely unannotated function takes and returns `Any`, so neither calls to it nor its body are checked.

   I verified (c) and (d) with mypy 2.3.1: `len(5)` gives `Argument 1 to "len" has incompatible type "int"; expected "Sized"`, and `g("a")` gives no issues. P4 can now be answered from the notes.
9. pl5 P2: the prompt now reads "Give the type of each, or say why it is rejected (which typing rule fails, or that it isn't a well-formed expression at all)". The existing answer for (d), "not well formed", now matches what the prompt asks for.
10. pl7: the call-by-name definition now says what assigning to a by-name parameter does. The assignment goes to the argument expression in the caller's environment, which works for a variable or an element such as `a[i]`, and an example is given. Assigning when the argument is an expression like `x + 1` is not allowed. P3's answer already uses this rule.
11. pl7: after the struct and function-pointer explanation, the notes now explain the forward declaration `struct Shape;` and brace initializers: `{ &RECT, 2, 3 }` sets `vt`, `a` and `b` in order, and an array of structs is a braced list of these.
12. pl8: the cycle-collector sentence now defines a container: an object that can hold references to others, such as a list, dict, set or class instance. It also says that only containers can form cycles, so numbers and strings are left to reference counting.
13. pl8:
   - A "Reading the Rust" paragraph now covers `let` and `let mut`, `i32`, `Vec<i32>`, `String::from`, macros ending in `!` (`vec!`, `println!` and its `{}`), `v.iter().sum()`, and what a trait is, including `Copy`.
   - The ownership rule now says that values of types owning no heap memory (integers, floats, booleans) are copied, while a `Vec` or `String` is moved.
   - P4(a) can now be decided from the notes.

### CS 370 Introduction to AI and Machine Learning

14. ml2 P2: the prompt was wrong ("first MAX child of the root" in a MAX/MIN/MAX tree). It now describes the tree level by level. The root's *first MIN child* has value 10, and the question is about the second MIN child and that node's first MAX child. The existing answer already fits this reading.
15. ml2: the n-queens puzzle is now described where it is mentioned: no two queens share a row, column or diagonal. As a CSP it has one variable per column (the queen's row) and a constraint between every pair of columns. I also made the claim precise: Minton et al. report about 50 steps on average for a million queens, after a greedy initial assignment, which is the figure Russell and Norvig quote.
16. ml3 bayes_net hint (in the spec): the hint now says that `product` comes from the standard `itertools` module and gives the import line. It describes what `product((True, False), repeat=k)` yields, 2^k tuples starting with `(True, True, ...)`, which I checked in Python. I regenerated `data/cs370-code.js` with gen_code.py (0 problems); only that hint line changed.
17. ml4:
   - The curvature paragraph now derives the second derivatives. ∂L/∂θ_j = (2/n) Σ_i error_i a_ij, and differentiating again by θ_k gives (2/n) Σ_i a_ij a_ik, which is entry (j, k) of (2/n) AᵀA. It is constant because L is quadratic.
   - The normal-equations section, where `AtA` is computed, now ends with a runnable check: `np.linalg.eigvalsh` of (2/n)AᵀA prints `[0.098, 0.291, 13949.277]`. numpy is already used in MATH 220. The lesson-code checker ran the block and its output matches.
   - The condition number is 141,725, consistent with "about 140,000".
18. ml5: after the k-NN code, the notes now state the tie rules. `sorted` is stable, so of two examples at equal distance the one listed first in `train` counts as nearer. Among equally frequent labels, `most_common` returns the one counted first. With this, P2's answer for (7, 6) follows from the notes alone. (For (6, 6) there is no tie in labels, since both of its nearest neighbours are blue.)
19. ml5: the ROC sentence now defines both rates. The true-positive rate is TP/(TP + FN), which is recall. The false-positive rate is FP/(FP + TN), the fraction of actual negatives that are flagged, worked on the screening example: 495/9,900 = 5%. P3's "false-positive rate of 1%" is now defined.
20. ml5:
   - The ridge sentence now gives the regularized normal equations, (AᵀA + nλD)z = Aᵀy, where D is the identity with 0 in the bias position.
   - A two-line argument shows the matrix is invertible for any λ > 0. If it sent z to 0, then |Az|² + nλΣw_j² = 0, so all weights are 0, so b·(1, …, 1) = 0, so b = 0.
   - I checked numerically that proportional features make AᵀA rank 2 and the ridge matrix rank 3.
21. ml6: the correlated-variance formula is now derived from MATH 230's Var(X + Y) = Var X + Var Y + 2 Cov(X, Y), extended to m terms. The sum's variance is mσ² + m(m − 1)ρσ², and dividing by m² gives ρσ² + (1 − ρ)σ²/m. P4's numbers are unchanged; I rechecked them (0.505, m > 10, 0.208).
22. ml6:
   - **Bias:** the notes now define bias in its second sense, explicitly not Lesson 4's intercept: the error caused by a model too simple to fit the pattern (underfitting). This is the counterpart of variance.
   - **Gradient boosting:** the description now says that each tree is fitted to the residuals y − F(x) and added with a small weight. For squared error the residual is, up to a factor 2, the negative gradient of the loss with respect to each prediction, so each step changes the predicted function rather than a parameter vector.
23. ml8:
   - **Combining heads:** the multi-head sentence now says that the heads' outputs are concatenated and multiplied by one more learned matrix, giving one vector per position.
   - **Layer normalization:** it is now defined: subtract the mean of the vector's entries, divide by their standard deviation, then apply a learned scale and shift. The notes also say why it is used.
   - **Recurrent networks:** they are now described as reading one token at a time, computing a new hidden vector from the previous one and the current token, which is why they can't be computed in parallel.

### Across courses

24. In CS 370:
   - At the normalization constant in ml3, the notes now say "(here 1/0.2 = 5). This α has nothing to do with alpha-beta's α in Lesson 2: AI reuses the letter, and each lesson says what it means."
   - At the learning rate in ml4, they say it is a third, unrelated use of α, and the usual letter for a learning rate, as in MATH 131.

   I made no change in CS 360. There, "alpha" appears only in the name "alpha-renaming", never as the symbol α, and CS 360 is a separate course taken in parallel. The ml4 note is where a reader of "α ∇L" would need the warning.

### Checks

- `node --check` passes on data/cs360.js, cs360-code.js, cs370.js and cs370-code.js.
- `validate_content.js` ends "all good".
- `check_problems.py`: 303 problems, 0 problems found.
- `check_lesson_code.py`: no lines for cs360 or cs370 (the 29 suspected mismatches it reports are all in other courses, such as the known cs101/cs102 false alarms).
- `lesson_time.js`: in the slow estimate, CS 360 lessons are at most 84 minutes and CS 370 lessons at most 82.
- `test_dump_course.js`: "All checks passed".
- gen_code.py on cs370_spec.py: 0 problems.
- Pyodide `pyrun.mjs data/cs370-code.js`: 96 "ok" lines and nothing else.
- I did not change the cs360 spec or cs360-code.js.
