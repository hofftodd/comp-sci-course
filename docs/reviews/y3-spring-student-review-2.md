# Student review: Year 3 Spring

*Round 2, part A (CS 330, CS 380, CS 365). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a third-year CS student. Before this term I took the first- and second-year core: programming (CS 101/102), discrete maths I and II, calculus, physics, data structures, Computer Systems I, linear algebra, probability and statistics, Algorithms I, architecture, Software Engineering I, operating systems, theory of computation, databases and graphics. I know C and x86-64 at the level of CS 210, RISC-V from CS 230, Python well, and regular and context-free languages from CS 320. This term I read CS 330 Computer Networks, CS 380 Security Fundamentals and CS 365 Compilers, in order, and tried every quiz and practice problem.

### CS 330 Computer Networks

#### nw1: How networks work

1. "Second, Poisson arrivals come at random moments, so an arriving packet finds N packets there on average". I couldn't follow why an arriving packet should see the time-average number N. The sentence states it but doesn't explain it, and the whole derivation of T = (L/R)/(1 − ρ) depends on it.
2. "If instead every packet has the same size, waits are shorter: the average time is (L/R)(1 + ρ/(2(1 − ρ)))". This formula appears with no derivation or source. The memoryless argument just given doesn't apply to fixed-size packets, so I can't see where it comes from.

#### nw2: The link layer

3. The key term says "Binary exponential backoff: After the m-th collision, wait a random number of slot times from 0 to 2^m − 1", but the notes say "waits K × 512 bit times". "Slot time" is never defined. I assume it means 512 bit times, but the lesson doesn't say so.

#### nw4: Routing

4. The link_state hint says: "Run CS 220's Dijkstra with heap entries (cost, first_hop, router)... the heap breaks cost ties by first hop for you". The notes' dijkstra only pushes an entry when `d + w < dist.get(...)`, strictly less. Done that way, a second equal-cost path with an alphabetically earlier first hop is never pushed, so the heap can't break the tie. I couldn't tell whether I'm meant to push equal-cost entries, or drop the dist check entirely.
5. P4 (b): "If A also peers with another provider E". I couldn't tell whether E is A's peer or A's provider. The answer depends on which: a peer gets A's customer routes, and a provider gets them too, but for a different reason.

#### nw5: Transport and reliable delivery

6. (blocking) P2 (c): "How many bits of sequence number does go-back-N need for that window, and how many does selective repeat need?" The lesson derives the selective-repeat limit (N ≤ 2ᵏ/2) but never gives any sequence-number limit for go-back-N. I can't answer the go-back-N half from the lesson.

#### nw6: TCP

7. P2: "What is the RTO before the 1-second floor after each? Then the timer expires twice in a row: what is the RTO (with the floor)?" The notes say "When the timer expires, the RTO doubles", but not whether the doubling starts from the floored value or the raw SRTT + 4·RTTVAR. After the 500 ms sample the raw value is about 0.7 s, so the two readings give 4 s or 2.8 s. (The rto programming problem implies the floored value, but the lesson text doesn't say.)

### CS 380 Security Fundamentals

#### sc2: Symmetric cryptography

8. "sealed = aead.encrypt(n12, b"pay ana $100", b"msg 17")". The third argument is never identified. I guessed it is the "associated data" from the paragraph above, but the code doesn't say so. It also doesn't say that the 16-byte tag is appended to `sealed`, which P4 assumes ("12 bytes plus a 16-byte tag").

#### sc3: Hashes, MACs and passwords

9. The notes say "MATH 121 Lesson 6 showed that among m equally likely values, a repeat is expected after about √(πm/2) random draws", but P1 says "Use the approximation k ≈ 1.18√m from MATH 121 Lesson 6". These are two different constants (about 1.25 and 1.18), both credited to the same lesson. The notes don't explain that one is the expected count and the other the 50% point, so I wasn't sure which to use where.
10. The notes say "PBKDF2-HMAC-SHA256 with 600,000 iterations is a current recommendation", but the password_store problem has `hash_password(password, iterations=100_000)` as its default. No reason is given for using a sixth of the recommended count.

#### sc7: Access control and side channels

11. The notes' leaky_equal compares with zip and returns `len(a) == len(b), steps`, so strings of different lengths still count the byte comparisons. The constant_time problem says "leaky_equal(a, b): ... (a length mismatch returns (False, 0))". The two versions behave differently, and I couldn't tell which one the tests expect.

#### sc8: Security in practice

12. P2: "Why is comparing versions as strings wrong?" Version numbers and how to compare them aren't mentioned anywhere in the lesson. I can guess the answer ("2.4.10" < "2.4.3" as strings), but nothing in the course text sets it up.

### CS 365 Compilers

#### cp1: Compiler structure and lexing

13. "(CS 360, which you may be taking alongside this course, builds interpreters that walk a syntax tree directly...)". CS 360 isn't one of my courses this term or before, so I don't know what it covers or whether I'm missing something this course depends on.

#### cp2: Parsing

14. precedence_climbing: "The starter's tokenize turns the text into tokens (kind, text, line, col)". The example "(so -2 ^ 2 is (-2) ^ 2)" uses ^, which isn't a Mini token. The lesson's tokenizers would reject ^. I don't know which characters the starter tokenizer accepts as operators, so I can't tell which tables I can test with.

#### cp4: Code generation for a stack machine

15. In the CPython sidebar: "some are followed by extra space the interpreter uses to cache what it learned about the operand types last time (that is why offset 8 is missing)". Offset 14 is missing too, after the second BINARY_OP at 12, and that isn't mentioned. I wasn't sure whether 14 has the same cause or some other reason.

#### cp6: Register allocation and the back end

16. The notes define spill cost as "one load per use and one store per definition" and later say spilling c means a store "after each definition (c is a parameter, so once on entry)". But the simplify table gives c a cost of one ("c once"), counting only its single use. By the definition, c's entry definition should also cost a store, making its cost 2, which ties a, b and t1. The P2 hint likewise counts "x is used 3 times" and leaves out x's entry definition. I couldn't tell whether parameters' entry definitions count.

### Across courses

17. CS 330 nw8 and CS 380 sc8 both have a programming problem called "firewall" that describes rules differently. CS 330 uses `(action, proto, src, dst, ports)` with a stateful `Firewall` class and `ports` possibly None. CS 380 uses `(action, proto, src, ports)` with no destination, a stateless `decide`, and `ports` always a pair. Taking both courses at once, I mixed up which rule format belongs to which problem.

## Professor's response (part A: CS 330, CS 380, CS 365)

1. nw1: The derivation now says why an arriving packet sees the time-average N. Poisson arrivals come at moments that have nothing to do with the queue's state, so the moments they see are a fair sample of all moments. A counterexample shows why the assumption is needed: packets that take 1 ms to send and arrive exactly every 2 ms always find the link empty, though the time-average N is 0.5. The memoryless fact is now a separate third step.
2. nw1: The equal-size formula is now derived in four sentences, using the same Little's-law argument. W = (queued packets) · L/R + (remaining part of the packet being sent). The link is busy a fraction ρ of the time, and the remaining part averages half a transmission, so the second term is ρ(L/R)/2. That gives W = ρW + ρ(L/R)/2, so W = (L/R)·ρ/(2(1−ρ)) and T = (L/R)(1 + ρ/(2(1−ρ))). Checked: 5.5 at ρ = 0.9.
3. nw2: The notes now define a slot time as 512 bit times, the time to send the minimum 64-byte frame (51.2 µs at 10 Mb/s). The key term repeats this.
4. nw4 link_state hint (cs330_spec.py): The student is right that the notes' strict `d + w < dist` test throws away equal-cost paths. The hint now says to drop that test. Instead, pop entries `(cost, first_hop, router)`, record a router the first time it is popped, and push entries for its unrecorded neighbours. Tuple order then pops the cheapest entry first, and breaks ties by the earlier first hop. This is what the solution does. Regenerated, and all tests pass.
5. nw4 P4(b): The question now says that E is A's peer: "A also has a peer E, another large provider (A and E exchange traffic as peers; neither is the other's customer)". The answer, which already treats E as a peer, is unchanged.
6. nw5 (blocking): The notes now give the go-back-N limit after the selective-repeat one. GBN's receiver accepts only `expected`, and an old copy still in flight is one of the N numbers just below it. So those N numbers plus `expected` must all differ: N ≤ 2ᵏ − 1. The notes add that window 3 with numbers 0 to 3 is safe for GBN. P2(c)'s answer (7 bits for GBN, 8 for SR) now follows from the notes.
7. nw6: The notes now say that on a timeout, the RTO in use (the value after the floor) doubles, and stays doubled until a new sample recomputes it. This matches P2's answer (1 s → 4 s) and the rto problem.
8. sc2: The AEAD code now has comments. One names the arguments (nonce, plaintext, associated data). Another says that `sealed` is the 12-byte ciphertext followed by the 16-byte tag, 28 bytes in all. A sentence after the code explains that the third argument is the associated data, a message number sent in the clear and covered by the tag, and that the nonce is sent with the message too.
9. sc3: The notes now give both MATH 121 Lesson 6 results, as that lesson states them. The chance of a repeat passes 50% after √(2 ln 2 · m) ≈ 1.18√m draws (23 people). The average number of draws until the first repeat is √(πm/2) ≈ 1.25√m (about 24). Both are a constant times √m. I removed the old pairing of √(πm/2) with "23 people", which was slightly off: that formula gives 23.9. Constants checked: 1.1774, 1.2533, 22.49, 23.94.
10. sc3 password_store (cs380_spec.py): The default is now `iterations=600_000`, the notes' recommendation. The prompt adds that the tests pass small counts so that the pure-Python PBKDF2 runs quickly. Every test already passed an explicit count, so no test changed.
11. sc7: The notes' `leaky_equal` now checks length first and returns `(False, 0)` on a mismatch, exactly like the problem's. The three printed examples all use equal-length strings, and their outputs are unchanged (the lesson-code checker confirms them).
12. sc8: The Dependencies bullet now explains what an advisory is: a notice that names the affected versions, such as "below 2.4.3". It adds that versions are usually written major.minor.patch, and that a scanner compares versions part by part, as numbers. P2's string-comparison question now has its setup, and the answer isn't given away.
13. cp1: The CS 360 pointer now explains the idea in place: a simpler kind of interpreter runs the syntax tree itself, visiting each node and doing what it says. It then mentions CS 360 as a course offered this term that builds several, and says plainly: "Nothing in this course depends on it: everything Mini needs is built here." A student not taking CS 360 loses nothing.
14. cp2 precedence_climbing (cs365_spec.py): The prompt now lists the operators the starter's tokenizer accepts (`** <= >= == != && ||` and `- + * / % ^ < > ! ( ) ,`). It says that `^` and `**` aren't Mini operators; here they are just names for operators that the student's own table gives an entry, with an example entry `{"^": (7, "right")}`.
15. cp4 CPython sidebar: The sidebar now says that each `BINARY_OP` has one two-byte cache entry after it, so offsets 8 and 14 are both missing. It also says that `dis.dis(f, show_caches=True)` shows these entries as `CACHE`. Checked with Python 3.12, which shows CACHE at 8 and 14.
16. cp6: The cost rule now says that a parameter counts one definition on entry, since spilling it means storing the value it arrives with. This agrees with the existing "store once on entry". The simplify table now gives a 3, b 3, c 2 and t1 2. c and t1 tie at 2/3 and c comes first by name, so c is still spilled, and the rest of the example is unchanged. In P2's hint, x (live on entry) costs 1 + 3 = 4, and the answer's "x 3/2" is now "x 4/2". a is still spilled. In the spec, NOTES_COST is now a 3, b 3, c 2, and the practice-graph test uses x 4. The expected outputs regenerated from the solution are the same allocations.
17. firewall problems: The two problems legitimately differ (stateful with a destination, against a stateless filter for one server), and each prompt is now self-contained.
   - CS 380's prompt says the filter guards a single server, like the web server in Practice 1, so rules don't name a destination. It calls the rule "a tuple of four fields", says `ports` is always a pair, with `(0, 65535)` for every port, and says that `"0.0.0.0/0"` matches every address.
   - CS 330's prompt calls its rule "a tuple of five fields".
   - Each prompt now ends its format description with a one-line note: "If you are also taking CS 3x0, its … problem uses a different, N-field rule format; the two are separate problems."

The problem ids are unchanged, so students' progress is kept. CS 365 was edited in its part files (cp1.js, cp6.js, tail.js) and rebuilt with build.py. Before editing, I confirmed that a rebuild reproduced data/cs365.js byte for byte.

---

# Student review: Year 3 Spring

*Round 2, part B (CS 360, CS 370). Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a third-year CS student. Before this term I finished the first two and a half years of the degree: Programming I and II, Data Structures, Algorithms I, Computer Systems I, Computer Architecture, Software Engineering I, Operating Systems, Theory of Computation, Databases and Computer Graphics, plus Discrete Math I–II, Calculus I–II with multivariable calculus, Linear Algebra, Probability and Statistics, the two physics courses, Computing in Society and Writing for Technical Audiences. I know Python, C and SQL. I've only seen OCaml, Haskell, Rust, C++ and Java in passing. I read both dumps in full, in lesson order, and tried every quiz question and practice problem.

### CS 360 Programming Languages

#### pl1: What a language is

1. P1(b): "How many nodes does its AST have?" The figure treats an operator as the label of an internal node, so the tree for (+ 1 (* 2 3)) has 5 nodes. But P3's hint says "For a list, the operator is a leaf of depth 1", so in the list representation the operator is a separate leaf. Under the first reading (2 * x) - (1 + 1) has 7 nodes; under the second it has 9 or so. I couldn't tell which count is wanted.

#### pl2: An interpreter: variables and scope

2. The scope_check problem says "every global is visible everywhere, even before its definition". But the notes' run evaluates globals in order, with `globals_env[name] = ev(rhs, globals_env)`. So (define y x) (define x 1) would raise NameError in run, while the checker is told to accept it. The checker and the interpreter seem to disagree about what counts as an error.

#### pl3: Functions, closures and the lambda calculus

(No items.)

#### pl4: Functional programming

3. The Haskell examples get a paragraph explaining their syntax ("Reading the Haskell: main = do runs the lines…"). The OCaml examples get none: `let () = Printf.printf "%.1f\n" …`, `let rec sum_to n acc = if n = 0 then …`, `print_int`. I wasn't sure what `rec` does, what `let () =` means, or whether `=` in `n = 0` is comparison or binding.

#### pl5: Types and type checking

4. The notes say "Recursive functions need one more annotation, the result type". The typecheck_functions problem instead uses "(letrec (f T e1) e2), with a declared type T for f", and T is the whole function type, not just the result type. Lesson 3's letrec also had no type in it. I wasn't sure which annotation the language actually has.

#### pl6: Type inference and polymorphism

5. "so reverse(map(f, xs)) equals map(f, reverse(xs)) for every f, a fact you can read off its type." I followed "can only drop, duplicate or rearrange elements". I couldn't follow the step from that to "therefore it commutes with map". No argument is given for why the type alone guarantees this.

#### pl7: State, parameter passing and objects

6. Call-by-value is described as "C, Java, OCaml and Mini work this way". The key term then defines "Call-by-sharing: Python's and Java's rule". So I don't know whether Java is call-by-value or call-by-sharing, or whether these are the same thing.

7. "this is the style SICP uses to introduce objects." The abbreviation SICP is never defined. Lesson 1 gave the full title, Structure and Interpretation of Computer Programs, but didn't say this is what SICP stands for.

#### pl8: Memory management and language design

8. P1: "build a doubly linked list of three nodes N1, N2, N3 … referenced from one variable that names N1." RefHeap.new always starts an object at count 1, "referenced by one variable". So creating N2 and N3 also gives each of them a variable reference. I couldn't tell whether I should drop those references first, or whether there's a way to create a node that no variable refers to. My answer depends on which.

9. Sidebar: "despite training, code review, sanitizers and fuzzing". Sanitizers and fuzzing are never explained.

### CS 370 Introduction to AI and Machine Learning

#### ml1: Search: state spaces, uniform cost and A*

10. (blocking) P4 asks how expansions grow on an open n × n grid with the Manhattan heuristic. The hint asks "is the Manhattan distance ever wrong?" On an open grid it is exact, so every square on some shortest corner-to-corner path has f = C*, and from corner to corner that is every square. The notes only say A* "expands every state with f below the optimal cost C* and none with f above it". They don't say what happens among states with f exactly C*. Ties are broken by g and then by node name (smaller g first), and I couldn't work out whether that makes A* expand about n states or about n² states.

#### ml2: Games and constraint satisfaction

(No items.)

#### ml3: Reasoning under uncertainty

11. "Burglary and Earthquake are independent (no path of arrows leads from one to the other)". The rule the lesson states is "each variable is conditionally independent of its non-descendants given its parents". The parenthetical gives a different test, "no path of arrows". I don't know whether "no directed path" is a general test for independence. It also seems to say nothing about why the two become dependent once Alarm is observed.

12. "This is the log-sum-exp trick, and the same subtraction appears again in Lessons 5 and 8." I found it in Lesson 8's softmax. In Lesson 5 the only related thing is the stable sigmoid, which switches to eᶻ/(1 + eᶻ) for negative z and subtracts nothing, so I couldn't find "the same subtraction" there.

#### ml4: Learning from data: linear regression and gradient descent

13. Lesson 1 says "Everything is written from scratch in standard-library Python". Lesson 4 then does `import numpy as np` and uses `np.array` and `np.linalg.eigvalsh`. NumPy hasn't been introduced in any course I've taken. Only eigvalsh is explained, in one parenthetical.

#### ml5: Classification and honest evaluation

(No items.)

#### ml6: Decision trees, ensembles and clustering

(No items.)

#### ml7: Neural networks and backpropagation

14. P4: "roughly how many [multiplications] does the backward pass take?" The notes only say the backward pass costs "a small constant times" the forward pass. I couldn't give a number: is it about 2× or 3×, and why?

#### ml8: Language models, and the limits of AI

(No items.)

### Across courses

15. No confusion that spans both courses beyond the items above.

## Professor's response (part B: CS 360, CS 370)

1. Correct, the two readings disagreed. P1(b) now says to count nodes as the figure draws them: the operator labels its expression's node and isn't a separate leaf. That gives 7, as the answer says. P3's hint now says a list is one node whose depth is 1 more than its deepest operand. It adds that the operator symbol, an atom of depth 1, can't change the maximum, so taking the maximum over all list items is equivalent. Both readings give 3 for `(+ 1 (* 2 3))`.

2. Correct: `run` evaluates global right-hand sides in order, so `(define y x) (define x 1)` raises NameError, but the checker accepted it. The checker now matches the interpreter:
   - A function body sees all globals, because it runs only when called, after `run` has defined every global.
   - A global's right-hand side sees only `let`-bound names and globals defined earlier.
   - The main expression sees all globals.

   The prompt explains why, and says what the checker doesn't try to catch (a right-hand side that calls a function using a later global). I edited the spec's solution and added a visible test, "A global's right-hand side sees only earlier globals": `((define y x) (define x 1) (+ x y))` gives `['unbound variable x in y']`, and a program whose function uses a later global is accepted. All earlier tests still pass. I regenerated the problem file: 0 problems, the starter still fails, and Pyodide prints only "ok".

3. Added a "Reading the OCaml" paragraph after the first OCaml example (pl4). It covers `type … | C of …`, `*` in a type, `let f x = …`, `match … with | p -> e`, application by juxtaposition, `let () = e`, `()`, `Printf.printf`, comments and `*.`. After the tail-call example, a second paragraph covers `let rec`, `=` as comparison, two curried arguments, `print_int` and `10_000_000`.

4. The notes now say the typed `letrec` declares the function's whole type, `(letrec (f T e1) e2)`, because the checker needs the result type when it reaches the recursive call; the parameter types are already in the lambda. They give a typed `fact` example, compare it with Lesson 3's untyped `letrec`, and state the rule: put `f : T` in the environment, check `e1`, and require its type to be `T`. This agrees with the problem.

5. Added the argument. A function of type ∀a. list[a] → list[a] can't inspect elements, so output position i holds the input element at some position p(i) that depends only on the length. `map` keeps the length and puts f(xs[j]) at position j. So both sides hold f(xs[p(i)]) at position i (assuming the function terminates without error).

6. The call-by-sharing paragraph now says call-by-sharing isn't a separate rule: it is call-by-value where the values are references. Java is call-by-value, with primitives copied and object references copied, so it is call-by-sharing for objects. The key term now says the same, so the list item "C, Java, OCaml and Mini work this way" is consistent with it.

7. pl7 now names *Structure and Interpretation of Computer Programs* in full, gives SICP as its common abbreviation, and notes it is the textbook quoted in Lesson 1.

8. P1 (pl8) now spells out the setup: as in the notes' A → B → C example, `new` gives each node one variable. After adding the pointers, drop the variables naming N2 and N3, then drop N1's. This matches the answer's code and counts ({'N1': 1, 'N2': 2, 'N3': 1}, checked by the lesson-code checker).

9. In the memory-safety sidebar, sanitizers and fuzzing are now each defined in a parenthesis. Sanitizers are compiler options, such as GCC's `-fsanitize=address`, that add checks so a bad memory access stops the program with a report. Fuzzing means running a program on huge numbers of random or mutated inputs to find crashes.

10. (blocking) Correct: the notes didn't say what happens to states with f exactly C*. The optimality paragraph (ml1) now says A* expands those it pops before the goal, and which ones depends on tie-breaking. The notes' code breaks ties by smaller g, so states near the start come out first and the goal, with the largest g, comes out last; ties by larger g favour states near the goal. P4 now names the notes' code, asks the student to consider pop order, and asks separately what happens if ties go to the larger g. The answer is unchanged. I re-ran it on a 20 × 20 open grid: A* expands 399 states with smaller-g ties and 38 with larger-g ties, uniform-cost search expands 399, and every path costs 38.

11. Correct: "no path of arrows" isn't the lesson's rule and isn't a general test. The sentence now derives the independence from the stated rule: Burglary has no parents and Earthquake is not its descendant. It explains that the rule says nothing about conditioning on a common child, Alarm, which is why observing it makes the two dependent. It also gives a counterexample to the "no path" test: JohnCalls and MaryCalls have no arrow path between them but are dependent (each is evidence the alarm rang), and they become independent given Alarm.

12. Correct, Lesson 5 didn't show the subtraction. I kept the forward reference and made Lesson 5 explicit. σ(z) = e^z/(e^z + e^0) normalizes the scores z and 0, and subtracting the larger score from both gives 1/(1 + e^(−z)) for z ≥ 0 and e^z/(1 + e^z) for z < 0. So the careful sigmoid is the same log-sum-exp subtraction, and no exponent is ever positive.

13. MATH 220 does teach NumPy: Lesson 1's "NumPy in five minutes", with `np.linalg.solve`, `lstsq` and `eigh` in later lessons, though not `eigvalsh`. But CS 370 promises that lessons and graded problems use only the standard library and run in the page, so I replaced the NumPy check with standard-library code instead of citing it. The lesson now finds the eigenvalues of H = (2/n)AᵀA as roots of det(H − λI) = 0 (MATH 220 Lesson 7). It computes the 3 × 3 determinant by cofactor expansion (MATH 220 Lesson 4) and finds the roots by bisection (CS 101 Lesson 5, MATH 130 Lesson 4) after a log-spaced scan from 0.001 to 100,000. Since a symmetric 3 × 3 matrix has three real eigenvalues (MATH 220 Lesson 8), finding three sign changes means all three were found. It prints [0.098, 0.291, 13949.277], the same values as before; I checked them against NumPy's eigvalsh outside the course. CS 370 no longer uses NumPy anywhere in its lessons.

14. The backprop paragraph (ml7) now counts multiplications. A product c = a × b takes one multiplication forward and two backward (b·∂L/∂c and a·∂L/∂c, which is what the lesson's `Value.__mul__` local gradients give). A network made mostly of weight-times-input products therefore takes about twice the forward multiplications going backward, and about three times in all. This matches P4's answer.

15. Acknowledged: nothing across courses.
