# Student review: Year 2 Spring

*Round 4. Written by a student agent started with no context, using the prompt in `CLAUDE.md`. Saved unedited.*

I'm a second-year CS student. Before this term I took CS 100, WRIT 100, CS 101, CS 102, MATH 120, MATH 121, MATH 130, MATH 131, PHYS 150, CS 201, CS 210, MATH 220 and MATH 230. I worked through CS 220, CS 230, CS 240 and PHYS 250 lesson by lesson, from the text produced by `scripts/dump_course.js`, and tried every quiz question and practice problem in my head. I checked most of the worked numbers and code outputs by hand. Most of them came out as stated. The items below are the places where I actually got stuck or found something that didn't fit.

### CS 220 Algorithms I

#### al6: Minimum spanning trees

1. "With a heap it takes O(E log V), by the same argument as Dijkstra's." Lesson 5's argument gave Dijkstra O(V + E log E), which it then rewrote as O((V + E) log V). It never gave O(E log V). I couldn't tell whether the V term was dropped on purpose (for example because the graph is connected) or whether the two bounds are meant to be the same.
2. "(Versions that use a decrease-key operation keep each outside vertex in the heap once…)" Decrease-key is never defined. Lesson 5 only says "Instead of decreasing a key in the heap", and CS 201's priority queue (as referenced) doesn't seem to include it. I don't know what operation this is or what it costs.

#### al8: Intractability: P, NP and coping

3. Q2: "You reduce a known NP-complete problem A to a new problem B. What does that show? … ans: B is at least as hard as A, so B is NP-hard." NP-hard is defined as "every problem in NP reduces to it". Getting from "A reduces to B" to "every NP problem reduces to B" needs reductions to chain: NP problem → A → B, still polynomial overall. The lesson never says that composing two reductions gives a reduction. I could guess the answer but couldn't justify it from the notes.

### CS 230 Computer Architecture and Digital Logic

#### ar6: Pipelining

4. "So a loop branch that is taken 99 times and then falls through costs one misprediction per loop, not two." At this point the notes haven't described any scheme that would cost two. The 1-bit "predict what happened last time" predictor first appears in P3, later. On first reading I didn't know what "two" was being compared against.

### CS 240 Software Engineering I

#### se5: Design patterns

5. In count_calls, "wrapper.calls += 1" and "wrapper.calls = 0" store a counter as an attribute on a function object. Then "square.calls" reads it. No earlier course showed that a function can have attributes set on it. It's also unclear how wrapper can refer to itself by name inside its own body when the attribute is assigned only after the def. The notes explain @, *args and **kwargs, but not this.

#### se7: Continuous integration, code review and static analysis

6. The GitHub Actions file uses "uses: actions/checkout@v4", "uses: actions/setup-python@v5", "with:", "jobs:", "runs-on: ubuntu-latest" and "pip install -r requirements.txt". YAML syntax is never shown; Lesson 6 only names YAML as a configuration format. "uses" (a reusable action, with a version after @) is not explained, and requirements.txt is not explained either. Later, "If requirements.txt says only requests" assumes I know what this file is and what format it has.

### PHYS 250 Physics II: Electricity and Magnetism with Computation

#### em1: Charge and electric fields

7. "the total flux of **E** out through any closed surface, roughly the number of field lines crossing it". Flux is only described "roughly" here, but it is then used as a calculation. For the sphere, "the flux is E times the area 4πr²". In em2, the capacitor box has "Only the face in the gap has flux through it, Ea", and the Laplace derivation uses "[E_x(x + dx) − E_x(x)] dy" (only the component perpendicular to each face). The rule that flux uses the perpendicular component times the area isn't stated until em5 (Φ = BA cos θ, and that is for **B**). In em1 and em2 I couldn't see why the sides of the box contribute nothing, or why only E_x counts on the left and right faces.

#### em5: Induction

8. "Push a magnet's north pole toward a coil, and the induced current makes the near end of the coil a north pole, repelling the magnet." The course never defines which end of a current loop or coil is its "north pole". em4 mentions north and south poles of a bar magnet only in passing. I couldn't use this rule to find the direction of an induced current. For P1's "Which way does the current circulate" I had to work from the right-hand rule and "opposes the change in flux" instead.

#### em6: Electromagnetic waves

9. P4: "Compare the intensity with sunlight's 1,360 W/m², and explain why you must never look into the beam." (blocking for the last part) My calculation gives roughly 1,300 W/m², about the same as sunlight. Nothing in the lesson explains why the laser would then be more dangerous. The answer presumably involves the eye focusing a narrow, parallel beam onto a tiny spot, and optics and the eye were never covered.

### Across courses

10. None of the cross-course references I checked contradicted each other. I checked CV²f in CS 230 Lesson 8 against PHYS 250 Lesson 2, gate delay against RC in PHYS 250 Lesson 3, the Apollo NOR gate counts, LCS and diff, @cache, Spectre, and spanning trees in the Kirchhoff sidebar. The only cross-course gaps I found are the ones listed above.

## Professor's response

1. CS 220 al6: Prim's bound is now stated as O((V + E) log V) "by the same argument as Dijkstra's", which matches Lesson 5. The notes then say that a spanning tree needs a connected graph, which has E ≥ V − 1, so the V term is absorbed and the bound is usually written O(E log V).
2. CS 220 al5/al6: Lesson 5 now defines **decrease-key** where it first comes up: lowering an entry's priority in place. It also says why Python's heapq lacks it (finding the entry would take a linear search). Lesson 6's parenthesis points back to that definition.
3. CS 220 al8: The NP-completeness recipe now explains that reductions chain. Every NP problem reduces to A, A reduces to X, and doing one reduction after the other is still polynomial, because (n^a)^b = n^(ab). So X is NP-hard. Q2's explanation mentions chaining too.
4. CS 230 ar6: The sentence now says what "two" refers to. A 1-bit predictor (predict what happened last time) mispredicts at the loop exit and again when the loop next starts, so it costs two; the 2-bit counter costs one.
5. CS 240 se5: There is a new paragraph after count_calls. It says that functions are objects, so `wrapper.calls = 0` sets an attribute just as on an instance. It also explains how the body can refer to `wrapper` before the attribute is set: the body runs only at call time, and the name is found in the enclosing function (a closure, CS 102). Since `square` names the wrapper, `square.calls` reads the count. The code output was checked: `9 16 2 square`.
6. CS 240 se7: There is a short "How to read it" paragraph after the workflow file. It covers YAML `key: value` pairs, nesting by indentation, `- ` list items, inline lists, `with:`, `run:` versus `uses:` (a reusable action named `owner/name@version`), `runs-on`, and what requirements.txt is, with a pointer back to CS 101 Lesson 14 and its format (one package per line, optionally `==version`).
7. PHYS 250 em1/em2: Lesson 1 now states the flux rule where Gauss's law first uses it. The flux through a small flat patch is the perpendicular component of the field times the area, EA cos θ, summed over the patches. A field along a surface gives no flux. In Lesson 2 the capacitor box now says why the other faces add nothing (zero field in the metal, and the field runs along the sides), and the Laplace derivation says that only E_x is perpendicular to the left and right faces.
8. PHYS 250 em4/em5: Lesson 4 now defines a magnet's north pole as the end its field lines come out of. Lesson 5 restates this and gives the rule for a coil: curl your right-hand fingers along the current, and your thumb points to the coil's north end. This comes just before Lenz's magnet example.
9. PHYS 250 em6 P4 (blocking): The problem now gives the needed physics. The eye's lens focuses a parallel beam onto a spot about 0.01 mm across, while sunlight from the sun's wide disc is spread over a larger image. It asks for the intensity in that spot. The solution computes about 1.3 × 10^7 W/m², 10,000 times the beam's 1,270 W/m² (both checked in Python), and explains the danger.
10. No change needed.
