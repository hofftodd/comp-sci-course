# Degree consistency audit (November 2026)

Each term's student reviews saw only that term's courses, so nobody had checked what later courses say about earlier ones. This pass did. A script confirmed that every "COURSE Lesson N" reference (711 of them) names a lesson that exists. Then six auditor agents checked, against the course text, that each reference and recap is accurate, that terms defined in several courses agree, and that conventions don't drift. Four professor agents fixed the findings. The auditors' reports are below unedited, each followed by the professor's response. The fixers were split by year, so a response can cover items from several reports. Responses: F1 Year 1–2 math and physics, F2 Year 2 CS, F3 Year 3, F4 Year 4.

---

## Degree audit: cross-references from Y1–Y3 Fall

I checked 200 items and found 5 problems: 3 wrong references and 2 wrong recaps. No files were edited.

1. **Wrong reference (Therac-25)**
   - **Where:** cs240, se3 (Lesson 3, Testing in depth), the sidebar "ethics: When testing is a safety question". Item 1-64.
   - **Quote:** "CS 100 Lesson 5 discussed the Therac-25 for the same reasons."
   - **Problem:** CS 100 Lesson 5 (AI in society) never mentions the Therac-25. The case is taught in CS 101.
   - **Evidence:** Searched cs100.txt for "Therac" and found nothing. The case appears in cs101 Lesson 11 (u6, Testing, debugging and exceptions), in the sidebar "[SIDEBAR ethics: Tests protect people] … The Therac-25 radiation machine overdosed patients because of a race condition…". It is covered fully in cs101's optional lesson "ethics: When software fails people", section "### Therac-25 (1985–1987): testing and concurrency", which ends with Q3 "What did the Therac-25 remove compared with earlier models? … Hardware safety interlocks".
   - **Fix target:** data/cs240.js. Change the reference to "CS 101 Lesson 11's sidebar and its optional ethics lesson, When software fails people, discussed the Therac-25…".

2. **Wrong reference (central differences)**
   - **Where:** phys250, em2 (Lesson 2, Potential and capacitance), notes. Item 1-187.
   - **Quote:** "Here is the field recovered numerically from a potential, with the central differences of MATH 131 Lesson 3"
   - **Problem:** MATH 131 Lesson 3 covers numerical integration (trapezoid, Simpson) and improper integrals. It never mentions numerical differentiation or central differences.
   - **Evidence:** math130 Lesson 5 (u3, The derivative) says "The central difference (f(a + h) − f(a − h))/(2h) is much more accurate than the one-sided version…" and lists the key term "Central difference". math131 Lesson 7 uses it for gradients: "Numerically, with the central difference from MATH 130's lesson on the derivative…". Searched math131 Lesson 3 for "difference" and "derivative" and found only error-bound uses.
   - **Fix target:** data/phys250.js. Change to "MATH 130 Lesson 5". Since the example computes a gradient, "MATH 131 Lesson 7" would also work.

3. **Wrong reference (semi-implicit Euler)**
   - **Where:** phys250, em4 (Lesson 4, Magnetism), notes, in the passage on simulating charged-particle motion. Item 1-195.
   - **Quote:** "updating velocity first doesn't produce the cancellation that PHYS 150 Lesson 6 found"
   - **Problem:** The analysis showing that semi-implicit Euler's errors cancel over a cycle is in PHYS 150 Lesson 4, not Lesson 6. Lesson 6 (Oscillations) only uses the method.
   - **Evidence:** phys150 Lesson 4 (p4, Energy and momentum) says "Semi-implicit Euler moves the position with the velocity it has just corrected, so its small errors don't all push the same way… they cancel over a cycle", and lists the key term "Symplectic integrator". phys150 Lesson 6 mentions the method only in passing ("the same semi-implicit stepping you've used all term", and the CODE spring_period problem). Searched Lesson 6 for "cancel" and found only "the string's tension cancels".
   - **Fix target:** data/phys250.js. Change to "PHYS 150 Lesson 4".

4. **Wrong recap (transitive closure)**
   - **Where:** cs340, db3 (Lesson 3, SQL II: grouping, subqueries, views and parameters), notes on recursive queries. Item 1-111.
   - **Quote:** "it computes the transitive closure of the relation "needs" (MATH 120 Lesson 5)"
   - **Problem:** MATH 120 Lesson 5 defines transitive relations but never defines "transitive closure". No earlier course defines it either, so the citation points students to a definition that isn't there.
   - **Evidence:** math120 Lesson 5 has "Transitive | a R b and b R c imply a R c" and covers equivalence relations and partial orders. Searched every dump for "transitive closure" and found it only in cs340, at this sentence.
   - **Fix target:** data/cs340.js. Define the term in place, for example "the transitive closure of "needs" (the smallest transitive relation containing it: every course reachable by following prerequisites; transitivity is from MATH 120 Lesson 5)". Alternatively, add the definition to MATH 120 Lesson 5.

5. **Wrong recap (PEP 456)**
   - **Where:** cs240, se6 (Lesson 6, APIs and data formats), notes, in the paragraph on compatibility. Item 1-57.
   - **Quote:** "Python deliberately randomizes string hashing for a related reason (PEP 456, from CS 201 Lesson 3)."
   - **Problem:** CS 201 Lesson 3 never names PEP 456. It credits randomization to Python 3.3 and SipHash to 3.4. Also, from my own knowledge rather than the course text: PEP 456 is the 3.4 SipHash change, not the 3.3 randomization, so the label doesn't match what CS 201 describes.
   - **Evidence:** cs201 Lesson 3 says "Since Python 3.3, string hashes are randomized with a secret value chosen each time Python starts… since 3.4, Python uses SipHash, a hash function designed to resist this attack." Searched cs201.txt for "PEP" and found nothing.
   - **Fix target:** data/cs240.js. Drop "PEP 456" and write "(CS 201 Lesson 3: since Python 3.3, to defeat hash-flooding attacks)".

The other 195 items check out against the cited lesson text. Some are brief but correct and aren't findings:
- **1-23:** MATH 131 Lesson 4 gives the finite geometric sum, and "dominated by its largest term" follows from it.
- **1-82:** CS 210 Lesson 8 names open, read and write as system calls but doesn't give their signatures.
- **1-132:** CS 350 states "det Aᵀ = det A" without saying where it was taught, and MATH 220 never states it. Since the course doesn't claim MATH 220 taught it, I didn't count it.

---

## Degree audit: cross-references from Y3 Spring

I checked 193 items and found 9 problems: 3 wrong references and 6 smaller recap or coverage problems. The other 184 references were confirmed against the text of the cited lessons.

1. **Wrong reference: no-execute bit**
   - **Where:** cs380, sc5 (Lesson 5, Memory safety), item 2-168.
   - **Quote:** "Non-executable memory (NX, also called DEP, data execution prevention): page-table entries carry a no-execute bit (CS 310 Lesson 6)"
   - **Problem:** CS 310 Lesson 6 never mentions an execute or no-execute permission. Its page-table entries have only present, writable and user bits, and the permission check it describes covers only those.
   - **Evidence:** I searched CS 310 Lesson 6 for "execut" and found nothing. It is in CS 230 Lesson 7 (ar7, Virtual memory), under "Protection in hardware": "Page-table entries carry permission bits: readable, writable, executable, … The non-executable stack of CS 210 Lesson 6 is exactly one of these bits." CS 210 Lesson 6 also lists "Non-executable stacks".
   - **Fix target:** data/cs380.js. Cite CS 230 Lesson 7 (and optionally CS 210 Lesson 6).

2. **Wrong reference: optimal substructure**
   - **Where:** cs330, nw4 (Lesson 4, Routing), item 2-15.
   - **Quote:** "Because a least-cost path's tail is itself least-cost (CS 220 Lesson 5's optimal substructure)"
   - **Problem:** CS 220 Lesson 5 never uses the term "optimal substructure". It also never states that a part of a shortest path is itself a shortest path. The term is defined in CS 220 Lesson 3.
   - **Evidence:** CS 220 al3 (Lesson 3, Dynamic programming I): "Two properties are needed. Optimal substructure: an optimal solution is built from optimal solutions to subproblems…", with a key term of the same name. I searched al5 for "substructure" and "subpath" and found nothing.
   - **Fix target:** data/cs330.js. Use "CS 220 Lesson 3's optimal substructure", or keep Lesson 5 for the shortest-path setting and add Lesson 3 for the term.

3. **Wrong reference: multivariable chain rule and backpropagation**
   - **Where:** cs370, ml7 (Lesson 7, Neural networks and backpropagation), item 2-128.
   - **Quote:** "If a value feeds several nodes, the loss depends on it along several paths, and the multivariable chain rule (MATH 131 Lesson 8) says the contributions add"
   - **Problem:** MATH 131 Lesson 8 has only the chain rule along a straight line, g′ = f_x p + f_y q. The idea that contributions add along several paths, and reverse-mode automatic differentiation itself, are taught in MATH 131 Lesson 9. CS 370 then introduces backpropagation and automatic differentiation as new, without saying that students have already met them.
   - **Evidence:** MATH 131 k9 (Lesson 9), sections "Programs are compositions" and "Reverse mode: backpropagation": "The chain rule says how a change in x flows through. Here x reaches f by two paths, and their contributions add". I searched cs370 for "MATH 131 Lesson 9" and found nothing.
   - **Fix target:** data/cs370.js. Cite MATH 131 Lesson 9 here, and say that reverse-mode automatic differentiation was introduced there.

4. **Wrong recap: the limit (1 − 1/n)ⁿ → 1/e**
   - **Where:** cs370, ml6 (Lesson 6, Decision trees, ensembles and clustering), item 2-124.
   - **Quote:** "MATH 131 Lesson 4 showed (1 + 1/n)n → e; the same argument gives (1 − 1/n)n → 1/e"
   - **Problem:** MATH 131 Lesson 4 only states this limit as an example. There is no argument to reuse, and none appears in MATH 130 either.
   - **Evidence:** MATH 131 k4: "So 1/n → 0, (1 + 1/n)ⁿ → e, and (−1)ⁿ diverges". This is the only occurrence. I searched math130 and math131 for other forms of the limit and found none.
   - **Fix target:** data/cs370.js. Say "MATH 131 Lesson 4 stated", and either give a one-line reason for the 1/e case or state it as a fact.

5. **Point not taught in the cited lesson: harms not measured in money**
   - **Where:** cs380, sc1 (Lesson 1, Thinking about security), item 2-144.
   - **Quote:** "some harms, such as exposing a vulnerable person's address, aren't measured in money at all (CS 100 Lesson 4)"
   - **Problem:** CS 100 Lesson 4 (Privacy, data and surveillance) says nothing about such harms or about exposing someone's address. The closest case is in CS 100 Lesson 3.
   - **Evidence:** I searched CS 100 Lesson 4 for "harm" and "address" and found nothing. CS 100 Lesson 3: "A friend who has dealt with a stalker is worried… a stalker using the app is a harm that is easy to foresee… A live location is among the most sensitive data an app can collect."
   - **Fix target:** data/cs380.js. Cite CS 100 Lesson 3, or Lessons 3 and 4.

6. **Point not taught in the cited lesson: ACM Code on authorized access**
   - **Where:** cs380, sc8 (Lesson 8, Security in practice), item 2-192.
   - **Quote:** "the ACM Code of Ethics (CS 100 Lesson 3) says to access computing resources only when authorized or when compelled by the public good"
   - **Problem:** CS 100 Lesson 3 covers only principles 1.1 to 1.7 and two professional responsibilities. It never mentions the Code's principle on authorized access (2.8), so a student who looks it up won't find it.
   - **Evidence:** I searched cs100 for "authoriz" and found nothing. The principles Lesson 3 actually covers are listed under "The ACM Code of Ethics".
   - **Fix target:** data/cs380.js. Say this is a further principle of the Code (2.8), which CS 100 Lesson 3 introduced, rather than implying that Lesson 3 taught it.

7. **Recap goes beyond the cited lesson: dependent columns in least squares**
   - **Where:** cs370, ml4 (Lesson 4, Learning from data: linear regression and gradient descent), item 2-112.
   - **Quote:** "the columns of A are dependent, A^(T)A isn't invertible, and there are infinitely many best weights (MATH 220 Lesson 6)"
   - **Problem:** MATH 220 Lesson 6 covers only the case of independent columns. It never covers the dependent case or says there are infinitely many least-squares solutions.
   - **Evidence:** MATH 220 la6: "If the columns of A are independent, A^(T)A is invertible and **x̂** is unique." There is nothing about the dependent case in la6. Students could work it out from la2 ("Infinitely many…") and the null-space quiz in la5.
   - **Fix target:** data/cs370.js. Say it follows from MATH 220 Lesson 6 together with Lesson 2 or 5, or add the half-sentence of reasoning.

8. **Term not taught: shift register**
   - **Where:** cs330, nw2 (Lesson 2, The link layer), item 2-10.
   - **Quote:** "CRCs are a few XOR gates and a shift register in hardware (CS 230 Lesson 3)"
   - **Problem:** CS 230 Lesson 3 covers registers, counters and flip-flops, but never shift registers. The term doesn't appear anywhere in cs230.
   - **Evidence:** I searched cs230 for "shift register" and found nothing. Lesson 3 has "Registers and counters": "A register is a row of flip-flops sharing a clock…"
   - **Fix target:** data/cs330.js. Briefly say what a shift register is ("a register whose bits move one place each clock"), or cite Lesson 3 only for registers.

9. **Recap goes beyond the cited lesson: Git tree objects**
   - **Where:** cs360, pl4 (Lesson 4, Functional programming), item 2-35.
   - **Quote:** "Git's history is persistent in the same way (CS 240 Lesson 2): a new commit stores new trees only for directories that changed and points to the old objects for the rest."
   - **Problem:** CS 240 Lesson 2 talks only about snapshots and blobs. It never mentions Git tree objects or directories, so "new trees" reads as already taught when it isn't.
   - **Evidence:** CS 240 se2: "Git doesn't store changes; it stores whole snapshots… (It saves space by storing each distinct file content only once.)" I searched se2 for "tree" and "director" and found nothing.
   - **Fix target:** data/cs360.js. Say that Git also stores a tree object for each directory, and present it as new.

**Outside my set of items:** CS 320 Lesson 8 (Y3 Fall) says "A type checker that rejects some correct programs is how CS 240's mypy stays decidable", but mypy is taught in CS 102 Lesson 4, not in CS 240. The fix belongs in data/cs320.js.

---

## Degree audit: cross-references from Y4 Fall

I checked all 177 items and found 4 problems. The other 173 references check out against the cited lesson text. A few minor wording notes, not counted as problems, follow the list.

1. **Wrong recap: L2 regularization formula (item 3-94)**
   - **Where:** cs470, Lesson 3 (dl3, "Generalization and regularization"), section "Weight decay".
   - **Quote:** "CS 370 Lesson 5's L2 regularization adds (λ/2)Σw² to the loss (the ½ makes the gradient tidy), which adds λw to each weight's gradient."
   - **Problem:** CS 370 Lesson 5 does not use the ½. It adds λΣw², so its gradient term is 2λw, not λw. A student who checks the earlier lesson finds a different penalty and a gradient off by a factor of 2, and it is λ that sets the weight-decay factor 1 − αλ.
   - **Evidence:** cs370 Lesson 5 (ml5), "Regularization": "L2 regularization adds a penalty on the size of the weights to the loss, L + λ Σ_j w_j², which adds 2λw_j to each weight's gradient (that is the lam term in the code)."
   - **Fix target:** data/cs470.js, Lesson 3. Say that CS 370 Lesson 5 added λΣw² (gradient 2λw), and that this course writes the penalty as (λ/2)Σw² so the gradient is λw: the same thing with λ rescaled by 2.

2. **Wrong reference: the merge step of merge sort (item 3-112)**
   - **Where:** cs490, Lesson 1 (pj1), programming problem `meeting_slots`, hint.
   - **Quote:** "two sorted lists of disjoint intervals can be intersected with two indexes, as in the merge step of merge sort (CS 201 Lesson 6)"
   - **Problem:** CS 201 Lesson 6 only mentions merge sort, for comparison and in its table. It never shows the two-index merge step. That code is in CS 101 Lesson 13.
   - **Evidence:**
     - cs201 Lesson 6 starts: "CS 101 compared selection sort, Θ(n²), with merge sort, Θ(n log n). This lesson completes the picture: two more important algorithms…". It has no merge code.
     - cs101 Lesson 13 (algo), "Sorting: merge sort": "merge the two sorted halves by repeatedly taking the smaller front item. ``` def merge(left, right): … i = j = 0 while i < len(left) and j < len(right):".
     - cs220 Lesson 1 also credits merge sort to "CS 101 Lesson 13".
   - **Fix target:** data/cs490.js, the `meeting_slots` hint. Change the reference to "(CS 101 Lesson 13)".

3. **Wrong recap: Hamiltonian cycle as one of Karp's 21 (item 3-61)**
   - **Where:** cs430, Lesson 3 (aa3, "Approximation algorithms"), inapproximability of general TSP.
   - **Quote:** "a Hamiltonian cycle, a cycle through every vertex exactly once (one of Karp's 21 NP-complete problems, CS 220 Lesson 8)"
   - **Problem:** CS 220 Lesson 8 never mentions Hamiltonian cycles. Its own example list of Karp's problems names TSP and independent set instead. A student following the reference can't confirm the claim, and the two courses give different examples of what was on Karp's list.
   - **Evidence:** cs220 Lesson 8 (al8): "In 1972 Richard Karp reduced SAT to 21 other famous problems, showing that all of them are NP-complete too, among them independent set, vertex cover, clique, graph coloring, the traveling salesperson problem, and knapsack." I searched cs220 for "Hamiltonian" and found nothing.
     - From my own knowledge, not checked against any source (web search was not allowed): Karp's 1972 list of 21 includes SAT itself and the directed and undirected Hamiltonian circuit problems. It does not include TSP or independent set as such. So cs430's statement is historically right and CS 220's list is the one that looks off.
   - **Fix target:**
     - data/cs220.js, Lesson 8: give accurate examples (for example clique, vertex cover, Hamiltonian cycle, graph coloring, knapsack), and say "21 problems, SAT among them" rather than "21 other".
     - Or, more simply, data/cs430.js: keep the Karp attribution but drop the claim that CS 220 Lesson 8 showed this problem.

4. **Relies on an elective without saying so: WRIT 100 Lesson 7 (items 3-120, 3-122, 3-135, 3-137, 3-139)**
   - **Where:** cs490, Lesson 1 (pj1), the scope and proposal passages, and Lesson 4 (pj4), "The design document" and its alternatives section.
   - **Quote:**
     - "Write the scope as goals and non-goals (WRIT 100 Lesson 7)"
     - "it follows WRIT 100 Lesson 7's rules"
     - "WRIT 100 Lesson 7 showed how to write a design document"
     - "Use WRIT 100 Lesson 7's outline"
   - **Problem:** The README lists WRIT 100 as an elective. CS 490 is a core course but cites WRIT 100 as if every student had taken it. In the same course, its CS 350 citation is flagged: "CS 350 Computer Graphics Lesson 1, a Year 3 elective, explains this sRGB encoding". Each cited WRIT 100 point is accurate (I checked goals and non-goals, request first, the problem in the reader's terms, evidence, the six-part outline, and alternatives earning trust). The issue is only the assumed prerequisite.
   - **Evidence:**
     - README.md: "| WRIT 100 Writing for Technical Audiences (elective) |".
     - cs490 Lesson 7 flags the other elective: "(…CS 350 Computer Graphics Lesson 1, a Year 3 elective…)". I found no "elective" wording near any WRIT 100 reference in cs490.
   - **Fix target:** data/cs490.js, Lessons 1 and 4. At the first WRIT 100 reference, say it is the Year 1 elective and that the essentials are summarized here. The outline and the proposal rules are already listed in place, so little else needs to change.

### Notes (minor, not counted)

- **3-145 (cs490 Lesson 5), possible misreading:** "They build on CS 240's processes and on the charter from Lesson 1." The charter is in CS 490's own Lesson 1, but the sentence can be read as CS 240 Lesson 1, which has no charter. Suggest "this course's Lesson 1".
- **3-25 (cs410 Lesson 6), elective called "alongside":** "CS 430, taken alongside this course" describes CS 430 as if everyone takes it. CS 430 is an elective. The sentence does say "If you want more… nothing here depends on either", so this is mild.
- **3-102 (cs470 Lesson 6), detail not in the cited lesson:** "UTF-8 encoding (CS 101 Lesson 12), which stores each character as one to four bytes". CS 101 Lesson 12 only says "UTF-8 is the standard today and handles every language". The byte length is new here (true, but not from CS 101).
- **3-12 (cs410 Lesson 2), shorter definition:** "a strict partial order: irreflexive and transitive". MATH 120 Lesson 5 defines it as "irreflexive (no a R a), antisymmetric and transitive". The two are equivalent, since irreflexive and transitive imply antisymmetric, but the recap leaves out a property the earlier definition lists.
- **Not one of my 177 items:** cs201 Lesson 6 says "MATH 121 Lesson 7 proved," about randomized quicksort, while MATH 121 Lesson 7 itself says "You'll do the full calculation in Algorithms", and cs430 Lesson 2 calls it "sketched". The CS 201 wording overstates what MATH 121 did.

Files consulted: /tmp/dump/*.txt for all courses, and /home/user/comp-sci-course/README.md for which courses are electives. My helper scripts are in /tmp/claude-0/-home-user-comp-sci-course/a2ccb18d-524c-5c42-98fa-2a4e8519f16d/scratchpad/a3/. I edited no repository files.

---

## Degree audit: cross-references from Y4 Spring

I checked all 137 items and found 2 problems, both minor. The other 135 references point to the right lesson, and every recap in them matches the cited lesson's text, numbers included. For example: CS 310 Lesson 4's 1,000 schedules with FlagsOnly failing in 542 and Peterson in 0; C(20, 10) = 184,756; CS 490 Lesson 1's hours model; CS 490 Lesson 3's PERT and burndown method; CS 490 Lesson 7's nearest-rank percentile ⌈p × n/100⌉; CS 490 Lesson 8's SUS benchmark of 68, five participants and three severity levels; CS 100 Lesson 3's four questions; and CS 380 Lesson 8's sidebar on the CFAA, Van Buren, the 2022 DOJ policy and the Computer Misuse Act.

1. **Where:** cs491, the lesson on beta evaluation (SUS and time on task), the code comment in the SUS interval example (dump line 296).
   - **Quote:** "half = 2.093 * s / math.sqrt(len(sus))       # t value for 19 degrees of freedom (MATH 230 Lesson 6)"
   - **Problem:** MATH 230 Lesson 6 introduces the t distribution and degrees of freedom, but it never gives 2.093 and gives no table or method for looking up other values. A student can't confirm the number from the cited lesson. 2.093 appears nowhere else in the degree.
   - **Evidence:** MATH 230 Lesson 6 (ps6): "the number that replaces 1.96 for a 95% interval is 2.776 for 5 values, 2.262 for 10, 2.045 for 30 and 1.984 for 100." Searched every dump for "2.093": it appears only in cs491.
   - **Fix target:** data/cs491.js. Say where 2.093 comes from (for example, `scipy.stats.t.ppf(0.975, 19)`, or the simulation method MATH 230 Lesson 6 uses to check 2.262), or state it as given, as MATH 230 does.

2. **Where:** cs491, the lesson on maintenance and dependencies (the section on numbering your own releases, dump line 928).
   - **Quote:** "a breaking change ... means a new major version, a migration note and, ideally, a deprecation period (CS 240 Lesson 6)"
   - **Problem:** CS 240 Lesson 6 never mentions deprecation or a migration note. The nearest it comes is keeping an old web API version running while clients move.
   - **Evidence:** CS 240 Lesson 6 (se6) says only "Web APIs usually put the major version in the path (/v2/books) and keep the old version running while clients move." A case-insensitive search of cs240 for "deprecat" finds only Lesson 8: "Deprecating features takes care too (Lesson 6): announce, warn, give users time, then remove." That sentence is itself an unsupported self-reference inside CS 240, outside this batch.
   - **Fix target:** data/cs491.js. Cite CS 240 Lesson 8 for deprecation (announce, warn, give users time, then remove), and cite Lesson 6 only for semver. Separately, either data/cs240.js Lesson 6 should get a sentence on deprecation, or its Lesson 8 should stop pointing to Lesson 6 for it.

Other references were loose but defensible, so I didn't count them:
- cs450 says CS 320 Lesson 8 "proved" Cook–Levin; the lesson calls it "the idea of the proof".
- cs480 cites CS 380 Lesson 7 for an insecure-direct-object-reference example. That lesson covers access control in general; the closest worked example is CS 380 Lesson 1's "may Ana see grade 1042?".
- cs491 says "CS 240 Lesson 8's table shows the cost of each nine"; the table shows error budgets, and the prose beside it says the cost rises.
- cs491 cites MATH 230 Lesson 5 for Monte Carlo simulation; Lesson 5 discusses Monte Carlo error but credits the method to MATH 131 Lesson 9.

My working files are in /tmp/claude-0/-home-user-comp-sci-course/a2ccb18d-524c-5c42-98fa-2a4e8519f16d/scratchpad/x4/ (just a lesson-extraction helper). Another agent overwrote the shared `les.sh` in the parent scratchpad folder during the run, so I stopped using it.

---

## Degree audit: unnumbered recaps

I checked 165 references that make a claim. They came from 379 lines that name a course without a lesson number; the other lines are course titles, sample data or plain forward pointers. I found 15 problems: 11 wrong recaps and 4 minor mismatches (items 12–15).

1. **Where:** cs101, algo (Lesson 13), "hash tables" section
   - **Quote:** "You'll build hash tables yourself in CS 102 and Data Structures."
   - **Problem:** CS 102 never builds a hash table. It only explains buckets for `__hash__`. Only CS 201 builds one.
   - **Evidence:** cs102 c2: "A set keeps its items in many numbered slots, called buckets…" (explanation only; no hash-table problem in cs102). cs201 ds3: "This lesson builds a hash table and analyzes it."
   - **Fix target:** cs101.js: "You'll build hash tables yourself in Data Structures (CS 201)."

2. **Where:** math130, u3 (Lesson 5), sidebar "Floating point strikes again"
   - **Quote:** "Numerical derivatives show the trade-off from CS 101's floating-point sidebar."
   - **Problem:** CS 101's floating-point sidebar is about the history of IEEE 754. The cancellation and rounding-noise point is in the lesson text, not a sidebar.
   - **Evidence:** cs101 u1, "[SIDEBAR history: Why 0.1 + 0.2 is not 0.3] Before 1985, each computer maker…". The cancellation material is in the cs101 u1 section "Floats are approximate", third bullet. math130 u1 itself cites it correctly: "see the third bullet of 'Floats are approximate' in CS 101, Values, types and expressions".
   - **Fix target:** math130.js: "…the trade-off from CS 101's 'Floats are approximate' (Values, types and expressions)".

3. **Where:** math220, la4 (Lesson 4)
   - **Quote:** "In MATH 131's double integrals, changing variables (for example to polar coordinates) multiplies the area element by the absolute value of a determinant, the Jacobian, which is where the extra r in r dr dθ comes from."
   - **Problem:** MATH 131 never teaches change of variables, polar double integrals or r dr dθ.
   - **Evidence:** math131 k9 "Double integrals" covers only rectangles and Fubini, plus a Monte Carlo estimate. The only mention of polar is in math131 k3: "You don't need the proof, which uses a double integral in polar coordinates". A search of math131 for "dθ", "r dr" and "Jacobian" finds nothing.
   - **Fix target:** math220.js. Either say this is beyond MATH 131 ("In multivariable calculus, changing variables…, which is where the extra r in polar coordinates' r dr dθ comes from") or drop the attribution.

4. **Where:** math230, ps2 (Lesson 2), Poisson limit
   - **Quote:** "The third tends to e^(−λ), the limit from MATH 130."
   - **Problem:** MATH 130 never states the limit (1 − λ/n)ⁿ → e^(−λ). MATH 130 defines e by the slope of eˣ.
   - **Evidence:** The only related statement is in math131 k4: "(1 + 1/n)ⁿ → e". A search of math130 for "/n)ⁿ" finds nothing.
   - **Fix target:** math230.js. Cite MATH 131's sequences lesson and state the general form (1 + x/n)ⁿ → eˣ, or give the one-line derivation via ln.

5. **Where:** cs220, al6 (Lesson 6)
   - **Quote:** "Every spanning tree of a graph with V vertices has exactly V − 1 edges (a tree on V vertices always does; MATH 120's induction proves it)."
   - **Problem:** MATH 120 never discusses graph trees or this fact, so the induction proof isn't there.
   - **Evidence:** A search of math120 for "tree" finds nothing. math121's "tree" hits are all recursion trees. CS 201 doesn't prove it either.
   - **Fix target:** cs220.js. Give the short induction proof here (remove a leaf), or say "provable by induction (MATH 120's method)".

6. **Where:** cs230, ar1 (Lesson 1)
   - **Quote:** "George Boole's algebra of logic (CS 100's history; MATH 120's optional lesson)"
   - **Problem:** CS 100 never mentions Boole.
   - **Evidence:** A search of cs100 for "Boole" finds nothing. Boole appears in the math120 u1 sidebar "From Aristotle to Boole" and the math120 optional lesson "From Boole to Shannon".
   - **Fix target:** cs230.js: "(MATH 120's sidebar and optional history lesson)".

7. **Where:** cs230, ar2 (Lesson 2)
   - **Quote:** "Overflow is detected the way CS 210 described: when the carry into the top column differs from the carry out of it."
   - **Problem:** CS 210 described the sign rule, not the carry rule. The two rules are equivalent, but CS 210 never states the carry rule.
   - **Evidence:** cs210 sy1 P2 asks how to "detect that overflow happened from the signs alone". Its solution in data/cs210.js reads: "Overflow happened exactly when two numbers of the same sign produce a result of the other sign." A search of cs210 for "carry into" finds nothing.
   - **Fix target:** cs230.js: "CS 210 detected overflow from the signs (two operands of the same sign giving a result of the other sign); in the circuit, the same condition is: carry into the top column ≠ carry out."

8. **Where:** cs240, se1 (Lesson 1)
   - **Quote:** "accessibility (WCAG, as WRIT 100 discussed)"
   - **Problem:** WRIT 100 never mentions WCAG or accessibility.
   - **Evidence:** A search of writ100 for "WCAG", "accessib", "screen reader" and "alt text" finds nothing.
   - **Fix target:** cs240.js. Drop the WRIT 100 attribution and define WCAG (Web Content Accessibility Guidelines) in place.

9. **Where:** cs240, se7 (Lesson 7)
   - **Quote:** "By Rice's theorem, a cousin of the halting problem from MATH 121"
   - **Problem:** MATH 121 has no halting problem. It is in MATH 120's optional history lesson.
   - **Evidence:** math120, Optional lesson "From Boole to Shannon": "Alan Turing … proved that no such machine can decide in general whether another machine halts", with the key term "Halting problem". A search of math121 for "halt" finds nothing.
   - **Fix target:** cs240.js: "from MATH 120's optional history lesson". Since that lesson is optional, a one-clause definition would help too.

10. **Where:** cs240, se8 (Lesson 8)
    - **Quote:** "(MATH 230 and CS 100 discussed privacy law)"
    - **Problem:** MATH 230 never discusses privacy or privacy law. CS 100 does.
    - **Evidence:** A search of math230 for "privacy", "anonym" and "GDPR" finds nothing. cs100 u4: "Modern privacy law grew from the Fair Information Practice Principles…"
    - **Fix target:** cs240.js: "(CS 100 discussed privacy law)".

11. **Where:** cs240, se8 (Lesson 8)
    - **Quote:** "CS 100's case studies (the Therac-25, Ariane 5) are postmortems of this kind."
    - **Problem:** Neither case is in CS 100. Both are in CS 101's optional ethics lesson.
    - **Evidence:** A search of cs100 for "Therac" and "Ariane" finds nothing. cs101, Optional lesson "ethics: When software fails people", has the sections "Therac-25 (1985–1987)" and "Ariane 5 Flight 501 (1996)". cs210 sy1 and cs480 et7 both attribute them correctly to CS 101's optional ethics lesson.
    - **Fix target:** cs240.js: "CS 101's optional ethics lesson's case studies (the Therac-25, Ariane 5)".

12. **Where:** cs240, se7 (Lesson 7)
    - **Quote:** "the 2024 attack on the xz compression library showed (CS 102's sidebar on open source)"
    - **Problem:** It is an optional lesson in CS 102, not a sidebar. A student looking for a sidebar won't find one.
    - **Evidence:** cs102, "======== Optional lesson: oss: Open source: licenses, communities and responsibility", which contains "The xz utils backdoor (2024)".
    - **Fix target:** cs240.js: "CS 102's optional lesson on open source".

13. **Where:** cs310, os3 (Lesson 3)
    - **Quote:** "C(m + n, m) of them (MATH 120's binomial coefficient)"
    - **Problem:** Binomial coefficients are taught in MATH 121, not MATH 120.
    - **Evidence:** math121 d1 "Counting: rules, permutations and combinations" and d2 "Binomial coefficients…". A search of math120 for "C(n, k)" and "binomial" finds nothing.
    - **Fix target:** cs310.js: "MATH 121's binomial coefficient".

14. **Where:** cs340, db5 (Lesson 5), "Indexes in SQLite"
    - **Quote:** "An index b-tree is a B-tree in CS 201's sense: each entry is stored once, in an interior page or a leaf, with no copies as signposts."
    - **Problem:** This credits CS 201 with a definition it never gives. CS 201 only mentions B-trees in passing, so the B-tree vs B+ tree distinction comes from CS 340 itself.
    - **Evidence:** cs201 ds4 says only: "Databases and file systems use B-trees, which store hundreds of keys per node…" Its key term reads: "B-tree: A balanced search tree with many keys per node, designed for disks".
    - **Fix target:** cs340.js: "a B-tree in the sense above (the original kind)", pointing to CS 340's own earlier definition.

15. **Where:** cs470, dl5 (Lesson 5), "Masks"
    - **Quote:** "With three tokens used as their own queries, keys and values (CS 370's example):"
    - **Problem:** CS 370's example differs. Its values were not the tokens themselves, and only the third token had a query. The output therefore differs from CS 370's, which a student comparing the two will notice.
    - **Evidence:** In cs370's attention section, "the keys are (1, 0), (0, 1) and (1, 1), the values (1, 0), (0, 1) and (0.5, 0.5), and the third token's query is (1, 1)", and the output is "[0.5, 0.5]". cs470 uses V = X and gets "[0.752, 0.752]" for the third row. The weights [0.248, 0.248, 0.503] match.
    - **Fix target:** cs470.js: "With CS 370's three key vectors, now used as each token's query, key and value (CS 370 had different values, so the outputs differ):"

No problems with the claims that a topic is "new" or "not covered before": a search for phrases like "haven't met", "for the first time" and "never seen" turned up only one such claim (erf in math131 k1), and it is correct. Term order was respected everywhere: every recap points to an earlier term, or to a same-term course the text marks as taken alongside. The scratch helper I used is `/tmp/claude-0/-home-user-comp-sci-course/a2ccb18d-524c-5c42-98fa-2a4e8519f16d/scratchpad/ur/loc.py`. No repository files were changed.

---

## Degree audit: terms and conventions

I checked 165 key terms that appear in more than one course, plus 14 recurring conventions, and found 6 problems. All are minor or low severity: they are notation or sense drift, not wrong facts.

The conventions checked were: log bases; whether 0 is a natural number; big-O, Ω and Θ; logic symbols; Boolean algebra notation; sample vs population variance; confidence interval and p-value interpretation; row vs column vectors and matrices; vector length notation; tree-height conventions; Python version claims (dict order, hash randomization, sum() in 3.12, round(), the recursion limit, // and % with negatives); byte units; physical constants; percentiles.

1. **Learning-rate symbol changes from η to α without comment.**
   - **Where:** MATH 131 Lesson 8 (k8, "Optimization and gradient descent"), the notes and key terms. Also CS 370 Lesson 4 (ml4).
   - **Quote:** MATH 131: "where α > 0 is the step size, called the learning rate in machine learning". MATH 131 key terms: "Learning rate: The step size α in gradient descent." CS 370: "MATH 131 Lesson 8 introduced gradient descent … with a learning rate α > 0 … α is the usual letter for a learning rate, as in MATH 131."
   - **Problem:** MATH 130 already taught gradient descent with η one term earlier. MATH 131 presents it as new and switches to α without mentioning MATH 130 or η. CS 370 says MATH 131 introduced it, when MATH 130 did first (in one variable).
   - **Evidence:** MATH 130 Lesson 8 (u5): "w ← w − η · f′(w). Here η (eta) is the step size, called the learning rate"; key term "Learning rate: The step size η in gradient descent." MATH 130 optional lesson "Calculus inside machine learning" also uses η.
   - **Fix target:** `data/math131.js` Lesson 8. Add a line such as "MATH 130 Lesson 8 used this in one variable, writing the step size η; we write α, as most machine-learning texts do." Optionally, in `data/cs370.js` Lesson 4, change "MATH 131 Lesson 8 introduced" to "MATH 130 Lesson 8 introduced gradient descent and MATH 131 Lesson 8 extended it to several variables".

2. **Vector length notation changes from |v| to ‖v‖ without comment.**
   - **Where:** MATH 220 Lesson 1, "The dot product". Later, CS 350 Lesson 2 goes back to |·|.
   - **Quote:** MATH 220: "The length (or norm) of **v** is ‖**v**‖ = √(**v** · **v**)". CS 350: "Its length is |**a**||**b**| sin θ"; "(normalize(**a**) means **a**/|**a**| …)".
   - **Problem:** MATH 131 introduced length as |**v**| and explained the notation carefully, including the physics shorthand. PHYS 150 and PHYS 250 also use |**v**|. MATH 220 switches to ‖**v**‖ and never says it is the same thing. MATH 230 then uses ‖·‖, while CS 350 uses |·| again. In MATH 220 a student also sees |cos θ| and ‖**u**‖ side by side in the Cauchy–Schwarz line.
   - **Evidence:** MATH 131 Lesson 7: "The length of **v** … is also a scalar, written |**v**|." MATH 220 mentions MATH 131 at line 6 but not the notation. Searching MATH 220 for "|**" found only the |cos θ| and |**u** · **v**| uses.
   - **Fix target:** `data/math220.js` Lesson 1. Add "(MATH 131 and the physics courses write |**v**|; the double bars avoid confusion with absolute value and are standard in linear algebra.)"

3. **"Heap" (memory) is introduced the same term as "binary heap", with no note that they are unrelated.**
   - **Where:** CS 210 Lesson 4 (sy4, "Pointers and memory"), section "The stack and the heap", and its key terms.
   - **Quote:** "The heap holds memory the program requests explicitly…"; key term "Heap: Memory requested with malloc and returned with free".
   - **Problem:** CS 201 Lesson 5 (ds5, "Heaps and priority queues") is taken the same term and defines a heap as a tree with heap order. CS 210 never says the memory heap has nothing to do with that data structure. A student meeting both in the same weeks could plausibly expect malloc's heap to be heap-ordered.
   - **Evidence:** CS 201 Lesson 5 key terms: "Binary heap: A complete binary tree, stored in an array, in which every node's key is at most its children's keys." Searching CS 210 for "CS 201" or "priority queue" near "heap" found nothing.
   - **Fix target:** `data/cs210.js` Lesson 4. Add one parenthetical: "(No relation to CS 201's binary heap: this 'heap' just means a pool of memory.)"

4. **CAP's "consistent" means something different from ACID's Consistency one lesson earlier, and "partition" changes meaning between adjacent paragraphs.**
   - **Where:** CS 340 Lesson 8, section "Replication, partitioning and CAP", and quiz Q5.
   - **Quote:** "Partitioning (sharding) splits the data across machines … a transaction touching several partitions…", then the next paragraph: "the replicas are split into groups that can't reach each other, a partition. The CAP theorem … cannot be both consistent (every read returns the latest write, as if there were one copy)…". Q5 offers the distractor "A database can't have all of ACID".
   - **Problem:** Lesson 7 defined the C of ACID as preserving constraints. Lesson 8 uses "consistent" for linearizability without saying it is a different property, and the quiz invites mixing the two up. Separately, "partition" means a data shard in one paragraph and a network split in the next, also unflagged. CS 410 later corrects the first point explicitly, but CS 340 doesn't.
   - **Evidence:** CS 340 Lesson 7: "Consistency: a transaction that starts with the data satisfying every constraint ends with it satisfying them too." CS 410 Lesson 5: "Consistency means linearizability (not the C of ACID, which is about application invariants)", and its Q5 answer is "Linearizability".
   - **Fix target:** `data/cs340.js` Lesson 8. After "consistent (…)", add "(not the C of ACID from Lesson 7)". After "a partition", add "(a network partition, not a data partition as in sharding)".

5. **Two different percentile rules are used in the same term without comment.**
   - **Where:** CS 410 Lesson 8 (di8, "Building reliable services"), the hedged-request code.
   - **Quote:** `def percentile(xs, p): xs = sorted(xs); return xs[min(len(xs) - 1, int(p / 100 * len(xs)))]`
   - **Problem:** This takes 0-based position ⌊pn/100⌋. CS 490 Lesson 7, taken the same term (Y4 Fall), defines the pth percentile by nearest rank: 1-based position ⌈pn/100⌉. The two disagree by one place whenever pn/100 is a whole number, for example p = 99 and n = 100,000. CS 491 does point out the off-by-one between its bootstrap positions and nearest rank, and says "what matters is to state the rule and keep to it". CS 410 states no rule.
   - **Evidence:** CS 490 Lesson 7: "The pth percentile, by the nearest-rank method, is the value at position ⌈p × n/100⌉ of the sorted measurements, counting from 1." CS 491 Lesson 1 and its Lesson 7 thesis-evaluation section both cite that rule.
   - **Fix target:** `data/cs410.js` Lesson 8. Either use nearest rank, `xs[max(0, math.ceil(p * len(xs) / 100) - 1)]`, or add a comment saying it uses a simpler rule than CS 490's and that the difference is one position. The printed results (p99 of about 31.5 ms) should be re-run if the code changes.

6. **Low severity: CS 102's "average" wording for amortized cost goes uncorrected when CS 201 warns against it.**
   - **Where:** CS 201 Lesson 2 (ds2), "Amortized analysis", and quiz Q3.
   - **Quote:** "Unlike average-case analysis, there is no randomness…"; Q3 "How does amortized cost differ from average-case cost?"
   - **Problem:** CS 102 defined amortized cost as an average. CS 201 rightly says it is not average-case, but doesn't tie this back to CS 102's wording, so a student who learned CS 102's key term may be confused. This is a small clarity gap, not a factual contradiction.
   - **Evidence:** CS 102 Lesson 7: "the average cost per append stays O(1). This is called amortized O(1)"; key term "Amortized cost: The average cost per operation over a long sequence". CS 201 line 222 recaps CS 102 only on over-allocation.
   - **Fix target:** `data/cs201.js` Lesson 2. Optionally add "(CS 102 called this an average; it is an average over a sequence, which is different from an average over random inputs.)"

### Checked and consistent

- **Natural numbers:** ℕ starts at 0 in both MATH 120 and CS 320.
- **Logarithms:** MATH 130 defines ln and log_b. Entropy uses log₂ and cross-entropy uses ln, both stated (CS 370, CS 470). CS 201 explains converting ln to log₂.
- **Asymptotic notation:** CS 101 calls big-O an upper bound, not necessarily tight. CS 201 and MATH 121 define O, Ω and Θ the same way.
- **Logic symbols:** MATH 120's → is the same as CS 450's ⇒, and CS 450 explains ⇒ as ¬a ∨ b. CS 230 maps ·, + and ′ to MATH 120's ∧, ∨ and ¬.
- **Variance and statistics:** sample vs population variance (n − 1 vs n) is stated in MATH 230, MATH 220 and CS 370 (pstdev), and statistics.variance vs pvariance is explained. MATH 230 interprets confidence intervals and p-values correctly. CS 491's Wald and power formulas match MATH 230 Lessons 6 and 7.
- **Row and column vectors:** CS 470 flags its row convention against CS 370's columns. CS 350 reads matrix products right to left, consistent with MATH 220.
- **Tree height:** CS 201 flags that it counts nodes where CS 102 counted edges, and CS 340's B+ tree "levels" agrees with CS 201.
- **Laplace smoothing:** CS 370 explains its +|V| against MATH 230's +2.
- **Python behaviour:** dict ordering (3.6 and 3.7), hash randomization (3.3 and 3.4), sum() compensation (3.12), round() ties to even, // and % with negatives in Python vs C, the recursion limit of 1000, and CPython's 1.125× list growth all agree across courses.
- **Other:** the floating-point exponent bias of 127/1023 and machine epsilon agree. CS 380 updates CS 240's SHA-1 claim. CS 470 flags tensor rank, and CS 370 flags "Variance (of a model)" and its third use of α.

All other duplicated terms are either the same definition worded differently, or homonyms in clearly separate contexts (terminal, frame, tuple, kernel, pivot, regression, and so on).

One problem inside a single course, outside this audit's scope: `data/cs370-code.js`, problem "A bigram language model", says "add-k smoothing, as in the notes", but the CS 370 Lesson 8 notes describe only add-one smoothing.

No files were edited.

---

## Professor's response (F1)


### find-ur.md #1 (cs101 algo, hash tables)
Verified: CS 102 only mentions hash-table buckets; CS 201 ds3 builds one. data/cs101.js: "You'll build hash tables yourself in Data Structures (CS 201)." No other copies of the mistake found.

### find-ur.md #2 (math130 u3 sidebar)
Verified. data/math130.js, practice sidebar "Floating point strikes again": now "the trade-off from "Floats are approximate" in CS 101, Values, types and expressions." No other "floating-point sidebar" citations remain.

### find-ur.md #3 (math220 la4, Jacobian)
Verified: MATH 131 k9 does rectangles only; polar appears only as an aside in k3. data/math220.js Lesson 4: "In multivariable calculus (beyond MATH 131's double integrals over rectangles), changing variables … which is where the extra r in polar coordinates' area element r dr dθ comes from."

### find-ur.md #4 (math230 ps2, Poisson limit)
Verified: MATH 130 never states the limit; MATH 131 k4 states (1 + 1/n)ⁿ → e. data/math230.js Lesson 2: replaced "the limit from MATH 130" with a one-line reason: its log is n ln(1 − λ/n) ≈ −λ, since ln(1 + u) ≈ u for small u (the general form of MATH 131's (1 + 1/n)ⁿ → e).

### find-terms.md #1 (math131 part)
Verified: MATH 130 Lesson 8 (u5) uses η. data/math131.js Lesson 8, after defining the learning rate: "(MATH 130 Lesson 8 did this in one variable, writing the step size η; we write α, as many machine-learning texts do.)" with a link to #c-math130-u5. The cs370 part was left to the other professor, as assigned.

### find-terms.md #2 (math220 norm notation)
Verified. data/math220.js Lesson 1, Length bullet: added "(MATH 131 and the physics courses write |v|; it is the same length. The double bars avoid confusion with absolute value and are standard in linear algebra.)" CS 350's use of |·| is in a file I wasn't given, so I didn't change it. It may not need a change anyway.

### find-x1.md #2 (phys250 em2, central differences)
Verified. data/phys250.js: "MATH 131 Lesson 3" became "MATH 130 Lesson 5".

### find-x1.md #3 (phys250 em4, semi-implicit Euler)
Verified: the cancellation analysis is in PHYS 150 Lesson 4 (p4). data/phys250.js: "PHYS 150 Lesson 6 found" became "PHYS 150 Lesson 4 found". The other two "PHYS 150 Lesson 6" references in phys250 (the spring and resonance) are correct and stay as they are.

### Extra A (PHYS 150 as an elective)
- data/math131.js Lesson 6: "If you take the elective PHYS 150, you'll use it there to simulate a thrown ball…"
- data/math131.js Lesson 7: "(Next year's Linear Algebra goes further, as does Lesson 2 of the elective PHYS 150 if you take it.)". Also "Physics, including the elective PHYS 150, often shortens…", and "In both courses, a letter with a subscript…" became "Either way, a letter with a subscript…".
- data/math220.js Lesson 1: "MATH 131 used vectors in two dimensions, for gradients (as does the elective PHYS 150, for positions and velocities)."

### Checks
- node --check on all six data files: OK
- validate_content: all good
- check_problems: 407 problems, 0 problems found
- check_lesson_code: only the known cs101 false alarms; nothing for math130/131/220/230 or phys250
- lesson_time: no lesson in my courses over 100 minutes (slow estimate)
- test_dump_course: All checks passed

---

## Professor's response (F2)


- **find-ur.md #5** (cs220 al6): verified, MATH 120 has no graph trees. Replaced "MATH 120's induction proves it" with the short proof in place: by induction on V, the far end of a longest path is a leaf (a vertex with one edge), and removing it leaves a tree on V − 1 vertices.
- **find-ur.md #6** (cs230 ar1): verified, CS 100 never mentions Boole. Now "(MATH 120's sidebar and optional history lesson)".
- **find-ur.md #7** (cs230 ar2): verified. Now: "CS 210 detected overflow from the signs: two operands of the same sign giving a result of the other sign. In the circuit, the same condition is simpler to test: the carry into the top column differs from the carry out of it."
- **find-ur.md #8** (cs240 se1): verified, WRIT 100 doesn't cover WCAG. But CS 100 Lesson 6 (core) does, so it now reads "accessibility (for the web, the Web Content Accessibility Guidelines, WCAG, from CS 100 Lesson 6)".
- **find-ur.md #9** (cs240 se7): verified. Now "a cousin of the halting problem (no program can decide, for every program and input, whether that program eventually stops; MATH 120's optional history lesson tells how Turing proved it)".
- **find-ur.md #10** (cs240 se8): verified. Now "(CS 100 discussed privacy law)".
- **find-ur.md #11** (cs240 se8): verified. Now "The case studies in CS 101's optional ethics lesson, When software fails people (the Therac-25, Ariane 5), are postmortems of this kind."
- **find-ur.md #12** (cs240 se7): verified. Now "(CS 102's optional lesson on open source)".
- **find-x1.md #1** (cs240 se3 sidebar): verified (the CS 101 sidebar is in Lesson 11, u6). Now "CS 101 Lesson 11's sidebar and its optional ethics lesson, When software fails people, discussed the Therac-25 for the same reasons."
- **find-x1.md #5** (cs240 se6): verified. Now "(CS 201 Lesson 3: since Python 3.3, to defeat hash-flooding attacks)". (cs201 L3's sources list still cites pep456, which is fine as a reading.)
- **find-terms.md #3** (cs210 sy4): added after the heap bullet: "(No relation to CS 201's binary heap: this "heap" just means a pool of memory, with no ordering.)"
- **find-terms.md #6** (cs201 ds2): added "(CS 102 called amortized cost an average; it is an average over a sequence of operations, which is different from an average over random inputs.)"
- **A**: added to CS 240 Lesson 6 (se6), end of the semantic versioning paragraph: "Removing a feature takes care too: **deprecate** it first (announce it, make it warn when used, and give users time, at least a release or two, to move), then remove it in the next major version." Lesson 8's pointer "(Lesson 6)" is now correct. **CS 240 Lesson 6 covers deprecation.** (Lesson 6's practice solution also already shows a deprecated alias.)
- **B**: cs220 Lesson 8 now: "In 1972 Richard Karp showed, by chains of reductions from SAT, that 21 famous problems, SAT among them, are NP-complete; his list includes clique, vertex cover, graph coloring, Hamiltonian cycle (a cycle through every vertex exactly once) and knapsack. Independent set follows from vertex cover by the reduction above, and the traveling salesperson problem from Hamiltonian cycle (give the graph's edges length 1 and the missing pairs length 2, and ask for a route of length at most n)." This keeps independent set and TSP NP-complete (the earlier forward references to Lesson 8 for knapsack and for independent set on general graphs still hold). No other Karp-list claim in cs220 or any data file.
- **C**: cs201 Lesson 6 now "MATH 121 Lesson 7 sketched the argument, with indicator variables: randomized quicksort makes about 2n ln n ≈ 1.39 n log₂ n comparisons on average, for every input."
- **D**: cs230 L1: "the PHYS 250 elective looks at the physics" (the point, resistance slows switching, is already stated in place). cs240 L2: "Lead with the point: the first sentence should say what the change does, so a reviewer knows what to look for (the WRIT 100 elective practices this kind of writing)." cs240 L8: "documentation for the next person, written to be read cold by someone who wasn't there" (WRIT 100 dropped). **Not changed, flag:** data/cs240.js line 9 lists "WRIT 100 Writing for Technical Audiences" in `prereqs`, so a core course still formally lists an elective as a prerequisite. I left it since it may be a program-structure decision; remove it if the rule applies to prereq lists.

Grep for repeated wrong attributions (Therac/CS 100, sidebar on open source, PEP 456, MATH 120's induction, MATH 121 Lesson 7 proved, Karp): none left in any data file.

### Checks
- node --check on cs201, cs210, cs220, cs230, cs240: ok
- validate_content: all good
- check_problems: 407 problems, 0 problems found
- check_lesson_code: nothing for cs201/cs210/cs220/cs230/cs240 (only cs101/cs102 known false alarms)
- lesson_time: 0 over 100 minutes in the slow estimate
- test_dump_course: All checks passed

---

## Professor's response (F3)


All findings were checked against /tmp/dump before editing. All of them were correct.

- **find-x2.md #1** (cs380 sc5, NX): changed "(CS 310 Lesson 6)" to "page-table entries carry an executable permission bit (CS 230 Lesson 7; CS 210 Lesson 6's non-executable stack uses it)". The grep found no other NX or no-execute citation of CS 310. The separate "4 KB page (CS 310 Lesson 6)" in sc7 is a different claim and was left alone.
- **find-x2.md #2** (cs330 nw4): "CS 220 Lesson 5's optimal substructure" is now "CS 220 Lesson 3's". There are no other occurrences.
- **find-x2.md #3** (cs370 ml7): the citation for "contributions add" along several paths is now MATH 131 Lesson 9. The backpropagation parenthesis now reads "(it is the reverse-mode automatic differentiation of MATH 131 Lesson 9, described before that by others)", so it tells students they have met the idea before.
- **find-x2.md #4** (cs370 ml6, 1/e): the parenthesis now gives a one-line reason: n ln(1 − 1/n) = −1 − 1/(2n) − ⋯ → −1, using the ln(1 + x) series from MATH 131 Lesson 5. It also says "MATH 131 Lesson 4 stated" the companion limit (1 + 1/n)ⁿ → e.
- **find-x2.md #5** (cs380 sc1): "(CS 100 Lesson 4)" is now "(CS 100 Lesson 3's live-location case)".
- **find-x2.md #6** (cs380 sc8): the sentence now reads "the ACM Code of Ethics, introduced in CS 100 Lesson 3, says in a further principle (2.8) to access computing resources only when authorized…". I also checked the other ACM citations: cs490 cites the high-quality-work responsibility, which CS 100 Lesson 3 does cover, so it is fine.
- **find-x2.md #7** (cs370 ml4): "(MATH 220 Lesson 6)" is replaced by ": MATH 220 Lesson 6's normal equations still have a solution, and adding any vector of A's null space (MATH 220 Lesson 5) to it gives another."
- **find-x2.md #8** (cs330 nw2): a definition is added in place: "(a register, CS 230 Lesson 3, whose bits move one place along at each clock tick)".
- **find-x2.md #9** (cs360 pl4): the sentence now reads "CS 240 Lesson 2 described each commit as a snapshot; inside, Git also stores a *tree* object for each directory, listing its files and subdirectories, and a new commit stores new trees only for directories that changed…". The tree object is now presented as new.
- **find-x2.md "outside my set"** is the same issue as extra item A (see below).
- **find-ur.md #13** (cs310 os3): "MATH 120's binomial coefficient" is now "MATH 121 Lesson 2's binomial coefficient". It doesn't appear elsewhere.
- **find-ur.md #14** (cs340 db5): "a B-tree in CS 201's sense" is now "a B-tree of the original kind, which CS 201 only named". I also changed "they are of the two kinds above" to "they are of two different kinds", because the lesson above never describes the original B-tree as its own kind. The definition follows in the same sentence ("each entry is stored once…").
- **find-x1.md #4** (cs340 db3): the term is defined in place: "computes the **transitive closure** of the relation "needs": the smallest transitive relation containing it (transitivity is from MATH 120 Lesson 5), here every course reachable by following prerequisites." It isn't cited anywhere else.
- **find-terms.md #4** (cs340 db8): added "; not the C of ACID from Lesson 7" inside the definition of consistent, and "(a network partition, not a data partition as in sharding)" after "a partition". Quiz Q5 is unchanged: its distractor now plainly contradicts the notes.
- **find-terms.md #1, cs370 part** (cs370 ml4): the sentence now reads "MATH 130 Lesson 8 introduced gradient descent in one variable, and MATH 131 Lesson 8 extended it to several: …". The α remark ends "as in MATH 131; MATH 130 wrote η." The math131 part belongs to someone else and was not touched.
- **A** (cs320 tc8): "how CS 240's mypy stays decidable" is now "how mypy (CS 102 Lesson 4) stays decidable". There are no other occurrences.
- **B** (cs370 ml8 and the bigram problem): I fixed this in the notes, so the prompt did not change. After |V| = 9, the notes now say: "More generally, **add-k smoothing** adds a constant k > 0 (often less than 1) to every count: P(b | a) = (count(a, b) + k)/(count(a) + k|V|), and k = 1 is add-one." This matches the formula in the prompt and the solution. The prompt, spec and code file are unchanged, so I did not regenerate them or rerun them in Pyodide.

### Checks

- node --check on cs310, cs320, cs330, cs340, cs360, cs370 and cs380: all pass.
- validate_content: "all good".
- export_problems + check_problems: "407 problems, 0 problems found".
- check_lesson_code: no lines for cs310, cs320, cs330, cs340, cs360, cs370 or cs380. The mismatches it reports are the known cs101/cs102 false alarms. No code blocks were changed.
- lesson_time: the largest slow estimate in these courses is 90, for cs370 ml4. Nothing is over 100.
- test_dump_course: "All checks passed."

---

## Professor's response (F4)


### find-x3.md #1 (cs470 Lesson 3, L2 formula) - fixed
Verified: CS 370 Lesson 5 adds λΣw² (gradient 2λw). data/cs470.js "Weight decay" now says CS 370 Lesson 5 added λΣw² (gradient 2λw), that deep learning usually writes (λ/2)Σw² so the gradient term is λw, the same penalty with λ rescaled by 2, and that this course uses that form. The rest of the lesson (1 − αλ, AdamW) is unchanged and consistent.

### find-x3.md #2 (cs490 meeting_slots hint) - fixed
Verified: CS 201 Lesson 6 has no merge code; CS 101 Lesson 13 has it. The spec matched data/cs490-code.js exactly (diffed first). Edited scratchpad/y4f/cs490_spec.py, "(CS 201 Lesson 6)" became "(CS 101 Lesson 13)", and regenerated (0 problems; pyrun all ok). Grep: no other "merge ... CS 201 Lesson 6" anywhere. (cs490 Lesson 2's "inversion (CS 201 Lesson 6)" is correct: CS 201 Lesson 6 defines inversions.)

### find-x3.md #4 (cs490 relies on WRIT 100) - fixed
data/cs490.js:
- prereqs: "WRIT 100 Writing for Technical Audiences (elective, recommended)".
- Lesson 1 scope: non-goals now defined in place ("the things the project deliberately won't do, stated so that nobody expects them"), with "WRIT 100 Lesson 7 covered this; WRIT 100 is the Year 1 elective, so this course restates each point it uses".
- Lesson 1 proposal: "follows the usual rules for a proposal (WRIT 100 Lesson 7): the request first, ..." (the rules were already listed in place).
- Lesson 4 intro: "WRIT 100 Lesson 7, the Year 1 elective, covered writing a design document; the outline is given again below."
- Lesson 4 design document: "Use the standard outline (WRIT 100 Lesson 7): context, goals and non-goals, ..." (outline already given in place). The alternatives sentence already states its point in place; left as is.
Other file: data/cs240.js line 9 also lists WRIT 100 as a prereq of a core course without marking it elective (not my file).

### find-x4.md #1 (cs491 t value 2.093) - fixed
2.093 is correct (t, 19 df, 97.5%). Code comment now "t value for 19 degrees of freedom, from a t table". A sentence before the interval result says it uses the t distribution with 19 degrees of freedom (MATH 230 Lesson 6), that MATH 230 stated such values from a table (2.262 for 10 values), that 2.093 is the table's value for 20 values, and that MATH 230 Lesson 6's simulation checks it the same way. No code output changed.

### find-x4.md #2 (cs491 deprecation citation) - fixed (cs491 part)
"(CS 240 Lesson 6)" became "(CS 240 Lesson 6 for semver; CS 240 Lesson 8 for deprecation: announce, warn, give users time, then remove)". The cs240 self-reference is in another professor's file.

### find-ur.md #15 (cs470 Lesson 5, "CS 370's example") - fixed
Verified: CS 370 had values (1,0),(0,1),(0.5,0.5) and only the third token's query; output (0.5, 0.5). Now: "With CS 370's three key vectors, now used as each token's query, key and value (CS 370 had different values and only one query, so the outputs differ from its (0.5, 0.5)):".

### find-terms.md #5 (cs410 Lesson 8 percentile rule) - fixed
percentile() now uses nearest rank, `xs[max(0, math.ceil(p * len(xs) / 100) - 1)]`, with a docstring citing CS 490 Lesson 7; `import math` added to that block. Re-ran: p50 and p99 unchanged (10.8/10.8, 1010.7/31.5); p99.9 hedged changed 42.0 → 41.7, output block updated. (Checked that 99.9 * 100000 / 100 is exactly 99900.0, so ceil has no float problem.) No prose or quiz quoted 42.0. check_lesson_code reports no cs410 mismatch.

### A (cs430 Lesson 3, Karp / Hamiltonian cycle) - fixed
"(one of Karp's 21 NP-complete problems; CS 220 Lesson 8 introduced Karp's list)". No other "Karp's 21" citation in my files.

### B. Minor notes
- 3-145 (cs490 Lesson 5): "the team charter from this course's Lesson 1".
- 3-25 (cs410 Lesson 6): "CS 430, the Year 4 elective taught this term, shows ..." (the sentence already says nothing depends on it).
- 3-102 (cs470 Lesson 6): "UTF-8 encoding (the standard encoding named in CS 101 Lesson 12), which stores each character as one to four bytes (one for the ASCII characters, more for others)" so the byte detail is clearly new here.
- 3-12 (cs410 Lesson 2): "irreflexive, antisymmetric and transitive (the antisymmetry follows from the other two)", matching MATH 120 Lesson 5.
- cs450 Cook–Levin: "CS 320 Lesson 8 stated it as the Cook–Levin theorem and gave the idea of the proof" (verified CS 320's wording "Here is the idea of the proof").
- cs480 IDOR: now "an authorization failure, the "may Ana see grade 1042?" question of CS 380 Lesson 1, answered wrongly; CS 380 Lesson 7 covers access control in general, and this kind of bug is often called an insecure direct object reference". No legal claims added or changed.
- cs491 "cost of each nine": "CS 240 Lesson 8's table shows each extra nine cutting the error budget tenfold, and its text says each one costs far more than the last" (matches CS 240's "Each extra nine cuts the budget tenfold, and costs far more than the last").
- cs491 Monte Carlo: "(MATH 131 Lesson 9; MATH 230 Lesson 5 showed how its error shrinks with the number of trials)".
- Not my file: cs201 Lesson 6 "MATH 121 Lesson 7 proved" (x3 note).

### C (cs491 WRIT 100) - fixed
- Lesson on handover docs: "WRIT 100, the Year 1 elective, covered READMEs, docstrings and comments (its Lesson 5) and design documents (its Lesson 7); what this lesson needs from them is stated here."
- Presentation: "Some rules for the slides (standard advice, which WRIT 100, the Year 1 elective, also gives): one idea per slide, ..." (rules already stated in place).

### Checks
- node --check on cs410, cs430, cs450, cs470, cs480, cs490, cs490-code, cs491: all pass.
- validate_content.js: "all good".
- export_problems + check_problems.py: "407 problems, 0 problems found".
- check_lesson_code.py: only the known cs101 false alarms; nothing for cs410/430/450/470/480/490/491.
- lesson_time.js: no CS 4xx lesson over 100 (slowest CS 430 aa5 at 86).
- test_dump_course.js: "All checks passed."
- cs490 spec regenerated: 0 problems; pyrun.mjs: all "ok".
