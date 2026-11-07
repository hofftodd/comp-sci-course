CSA.addCourse({
  id: "math131",
  code: "MATH 131",
  title: "Calculus II and Multivariable Calculus",
  credits: 4,
  kind: "required",
  term: "y1s",
  summary: "Techniques and applications of integration, numerical methods, infinite series and Taylor polynomials, an introduction to differential equations, and calculus in several variables: partial derivatives, gradients and the gradient descent that trains machine-learning models.",
  prereqs: ["MATH 130 Calculus I"],
  outcomes: [
    "Integrate by substitution and by parts, and choose a technique",
    "Use integrals to compute areas, volumes, averages and probabilities",
    "Approximate integrals numerically and estimate the error; evaluate improper integrals",
    "Decide whether series converge, and approximate functions with Taylor polynomials",
    "Model change with differential equations and solve them exactly or with Euler's method",
    "Compute partial derivatives and gradients, and find and approximate minima of functions of several variables"
  ],
  rubric: {
    criteriaFor: "written solutions on problem sets and exams",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Weekly problem sets", weight: 25, desc: "Computation, application and short explanation problems based on each lesson's practice set. Show your work." },
      { name: "Computing labs", weight: 15, desc: "Four Python notebooks: numerical integration and error, Taylor approximations, Euler's method for a population model, and gradient descent on a function of two variables. Graded on correctness and a written interpretation." },
      { name: "Midterm exam", weight: 20, desc: "Integration techniques and applications, numerical integration and series (lessons 1–4)." },
      { name: "Final exam", weight: 30, desc: "Cumulative, with emphasis on Taylor series, differential equations and multivariable calculus (lessons 5–9)." }
    ],
    criteria: [
      { name: "Setup", desc: "Is the problem translated correctly?", levels: [
        "Defines variables with units, draws a picture when helpful, and writes the correct integral, series or equation.",
        "Correct setup with a minor omission, such as missing units or limits not explained.",
        "Setup partly wrong, such as wrong limits of integration or a missing factor.",
        "No meaningful setup." ] },
      { name: "Technique", desc: "Is the mathematics carried out correctly?", levels: [
        "Appropriate technique, executed correctly, with steps shown.",
        "Correct technique with a small algebra or arithmetic slip.",
        "Technique misapplied (for example, a series test used where its conditions fail).",
        "Incorrect or missing." ] },
      { name: "Verification", desc: "Is the answer checked?", levels: [
        "Checks the answer: differentiates an antiderivative, compares with a numerical estimate, or tests units and signs.",
        "Some checking.",
        "No check, and the answer has an obvious problem (negative volume, wrong units).",
        "No answer." ] },
      { name: "Interpretation", desc: "Is the result explained?", levels: [
        "States the answer in a sentence with units and explains what it means.",
        "Correct answer, little interpretation.",
        "An interpretation that contradicts the result.",
        "No interpretation." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Collaboration:</b> discuss problems freely; write up your own solutions and list who you worked with.",
      "<b>Calculators, computer algebra and AI assistants:</b> allowed for checking work and in labs. On problem sets, show the steps; exams are taken without them.",
      "<b>Late work:</b> two late days for the term on problem sets and labs.",
      "<b>Exam corrections:</b> after the midterm you may submit corrections with explanations for up to a third of the lost points."
    ]
  }
});

CSA.addUnits("math131", [
  {
    id: "k1",
    title: "Techniques of integration",
    minutes: 90,
    summary: "Undoing the chain rule with substitution, undoing the product rule with integration by parts, partial fractions in brief, and how to choose a technique.",
    notes: `
<p>The Fundamental Theorem of Calculus turns integration into finding antiderivatives. Differentiation is mechanical: every function built from the usual pieces has a derivative you can compute by rules. Antidifferentiation is not: there's no product rule or chain rule that always works backwards, and some functions, like e<sup>−<em>x</em>²</sup>, have no antiderivative made of <strong>elementary functions</strong> at all. The elementary functions are the ones you can write with a formula from MATH 130's toolkit: polynomials, roots, exponentials, logarithms, trig functions and their inverses, combined by +, −, ×, ÷ and composition (plugging one into another). Something like ln(1 + sin² <em>x</em>)/√<em>x</em> is elementary; an answer that can only be written as an integral is not. This lesson covers the two techniques that handle most cases you'll meet, and a strategy for choosing between them.</p>

<h3>Substitution: undoing the chain rule</h3>
<p>The chain rule says (<em>F</em>(<em>g</em>(<em>x</em>)))′ = <em>F</em>′(<em>g</em>(<em>x</em>)) <em>g</em>′(<em>x</em>). Read backwards, an integrand of the form <em>f</em>(<em>g</em>(<em>x</em>)) <em>g</em>′(<em>x</em>) has antiderivative <em>F</em>(<em>g</em>(<em>x</em>)). In practice, let <em>u</em> = <em>g</em>(<em>x</em>), so <em>du</em> = <em>g</em>′(<em>x</em>) <em>dx</em>:</p>
<p class="math">∫ <em>f</em>(<em>g</em>(<em>x</em>)) <em>g</em>′(<em>x</em>) <em>dx</em> = ∫ <em>f</em>(<em>u</em>) <em>du</em></p>
<p><strong>Example.</strong> ∫ 2<em>x</em> cos(<em>x</em>²) <em>dx</em>. The inside function is <em>x</em>², and its derivative 2<em>x</em> is right there. Let <em>u</em> = <em>x</em>², <em>du</em> = 2<em>x dx</em>: the integral becomes ∫ cos <em>u du</em> = sin <em>u</em> + <em>C</em> = sin(<em>x</em>²) + <em>C</em>. <strong>Check</strong> by differentiating: (sin(<em>x</em>²))′ = cos(<em>x</em>²) · 2<em>x</em>. ✓</p>
<p><strong>Adjusting constants.</strong> ∫ <em>x</em> e<sup>3<em>x</em>²</sup> <em>dx</em>: let <em>u</em> = 3<em>x</em>², <em>du</em> = 6<em>x dx</em>, so <em>x dx</em> = <em>du</em>/6. The integral is (1/6)∫ e<sup><em>u</em></sup> <em>du</em> = e<sup>3<em>x</em>²</sup>/6 + <em>C</em>. Constant factors can be fixed this way; a missing <em>x</em> can't. ∫ e<sup><em>x</em>²</sup> <em>dx</em> has no elementary antiderivative.</p>
<p><strong>Definite integrals.</strong> Change the limits along with the variable: when <em>x</em> goes from <em>a</em> to <em>b</em>, <em>u</em> goes from <em>g</em>(<em>a</em>) to <em>g</em>(<em>b</em>).</p>
<p class="math">∫<sub>0</sub><sup>1</sup> <em>x</em>/(1 + <em>x</em>²) <em>dx</em> = (1/2)∫<sub>1</sub><sup>2</sup> <em>du</em>/<em>u</em> = (1/2) ln 2 ≈ 0.347   (with <em>u</em> = 1 + <em>x</em>²)</p>
<p>A useful pattern from this example: ∫ <em>g</em>′(<em>x</em>)/<em>g</em>(<em>x</em>) <em>dx</em> = ln |<em>g</em>(<em>x</em>)| + <em>C</em>. That's how ∫ tan <em>x dx</em> = −ln |cos <em>x</em>| + <em>C</em> is found.</p>

<h3>Integration by parts: undoing the product rule</h3>
<p>The product rule (<em>uv</em>)′ = <em>u</em>′<em>v</em> + <em>uv</em>′, integrated and rearranged, gives</p>
<p class="math">∫ <em>u dv</em> = <em>uv</em> − ∫ <em>v du</em></p>
<p>It trades one integral for another; the trick is to choose <em>u</em> and <em>dv</em> so the new integral is easier. Choose <em>u</em> to be something that gets <em>simpler</em> when differentiated (a polynomial, or a logarithm), and <em>dv</em> something you can integrate.</p>
<p>When the choice isn't obvious, a rule of thumb called <strong>LIATE</strong> helps. Pick <em>u</em> as whichever factor comes <em>first</em> in this list, and let <em>dv</em> be everything else:</p>
<p class="math"><strong>L</strong>ogarithms (ln <em>x</em>) → <strong>I</strong>nverse trig (arctan <em>x</em>) → <strong>A</strong>lgebraic (<em>x</em>, <em>x</em>², polynomials) → <strong>T</strong>rig (sin, cos) → <strong>E</strong>xponentials (e<sup><em>x</em></sup>)</p>
<p>The reason: functions early in the list become simpler when differentiated (ln <em>x</em> becomes 1/<em>x</em>, <em>x</em>² becomes 2<em>x</em>), while those late in the list are easy to integrate and don't get worse. For ∫ <em>x</em> e<sup><em>x</em></sup> <em>dx</em>, <em>x</em> (algebraic) comes before e<sup><em>x</em></sup>, so <em>u</em> = <em>x</em>; for ∫ <em>x</em>² ln <em>x dx</em>, ln comes first, so <em>u</em> = ln <em>x</em>. It's a guide, not a law: if your choice leads to a harder integral, go back and swap.</p>
<p><strong>Example.</strong> ∫ <em>x</em> e<sup><em>x</em></sup> <em>dx</em>. Let <em>u</em> = <em>x</em> (simplifies to 1), <em>dv</em> = e<sup><em>x</em></sup> <em>dx</em>, so <em>du</em> = <em>dx</em>, <em>v</em> = e<sup><em>x</em></sup>. Then ∫ <em>x</em> e<sup><em>x</em></sup> <em>dx</em> = <em>x</em> e<sup><em>x</em></sup> − ∫ e<sup><em>x</em></sup> <em>dx</em> = (<em>x</em> − 1) e<sup><em>x</em></sup> + <em>C</em>. Check: ((<em>x</em> − 1)e<sup><em>x</em></sup>)′ = e<sup><em>x</em></sup> + (<em>x</em> − 1)e<sup><em>x</em></sup> = <em>x</em> e<sup><em>x</em></sup>. ✓ The other choice, <em>u</em> = e<sup><em>x</em></sup>, would give ∫ (<em>x</em>²/2) e<sup><em>x</em></sup> <em>dx</em>, which is worse.</p>
<p><strong>Example: ln <em>x</em>.</strong> ∫ ln <em>x dx</em> has only one factor, so take <em>u</em> = ln <em>x</em> and <em>dv</em> = <em>dx</em>. Then <em>du</em> = <em>dx</em>/<em>x</em>, <em>v</em> = <em>x</em>, and ∫ ln <em>x dx</em> = <em>x</em> ln <em>x</em> − ∫ 1 <em>dx</em> = <em>x</em> ln <em>x</em> − <em>x</em> + <em>C</em>.</p>
<p><strong>Repeated parts.</strong> ∫ <em>x</em>² e<sup><em>x</em></sup> <em>dx</em> needs parts twice: the first round lowers <em>x</em>² to 2<em>x</em>, the second lowers 2<em>x</em> to a constant (practice 2 works it through).</p>
<p><strong>Circular parts: ∫ e<sup><em>x</em></sup> sin <em>x dx</em>.</strong> Neither factor gets simpler when differentiated, but something useful still happens. Call the integral <em>I</em>.</p>
<ol>
  <li>First round: <em>u</em> = sin <em>x</em>, <em>dv</em> = e<sup><em>x</em></sup> <em>dx</em>, so <em>du</em> = cos <em>x dx</em>, <em>v</em> = e<sup><em>x</em></sup>:
  <p class="math"><em>I</em> = e<sup><em>x</em></sup> sin <em>x</em> − ∫ e<sup><em>x</em></sup> cos <em>x dx</em></p></li>
  <li>Second round, on the new integral, again with the exponential as <em>dv</em>: <em>u</em> = cos <em>x</em>, <em>dv</em> = e<sup><em>x</em></sup> <em>dx</em>, so <em>du</em> = −sin <em>x dx</em>, <em>v</em> = e<sup><em>x</em></sup>:
  <p class="math">∫ e<sup><em>x</em></sup> cos <em>x dx</em> = e<sup><em>x</em></sup> cos <em>x</em> − ∫ e<sup><em>x</em></sup>(−sin <em>x</em>) <em>dx</em> = e<sup><em>x</em></sup> cos <em>x</em> + <em>I</em></p></li>
  <li>Substitute this into step 1. The original integral has come back:
  <p class="math"><em>I</em> = e<sup><em>x</em></sup> sin <em>x</em> − e<sup><em>x</em></sup> cos <em>x</em> − <em>I</em></p></li>
  <li>Treat <em>I</em> as an unknown and solve: 2<em>I</em> = e<sup><em>x</em></sup>(sin <em>x</em> − cos <em>x</em>), so
  <p class="math">∫ e<sup><em>x</em></sup> sin <em>x dx</em> = e<sup><em>x</em></sup>(sin <em>x</em> − cos <em>x</em>)/2 + <em>C</em></p></li>
</ol>
<p>Check by differentiating with the product rule: (e<sup><em>x</em></sup>(sin <em>x</em> − cos <em>x</em>))′ = e<sup><em>x</em></sup>(sin <em>x</em> − cos <em>x</em>) + e<sup><em>x</em></sup>(cos <em>x</em> + sin <em>x</em>) = 2e<sup><em>x</em></sup> sin <em>x</em>; half of that is the integrand. ✓ Two cautions. Keep the same kind of choice in both rounds: if the second round used <em>u</em> = e<sup><em>x</em></sup>, it would undo the first and give the useless identity <em>I</em> = <em>I</em>. And the constant <em>C</em> is added only at the end, after solving for <em>I</em>.</p>
<p>A computer-science connection: ∫<sub>1</sub><sup><em>n</em></sup> ln <em>x dx</em> = <em>n</em> ln <em>n</em> − <em>n</em> + 1 approximates ln(<em>n</em>!) = ln 1 + ln 2 + … + ln <em>n</em>. That's the heart of <strong>Stirling's approximation</strong>, ln <em>n</em>! ≈ <em>n</em> ln <em>n</em> − <em>n</em>. Here is why it matters for sorting. A sorting algorithm that learns about its input only by comparing two items must, in effect, figure out which of the <em>n</em>! possible orders the input is in. Each comparison has two outcomes, so <em>k</em> comparisons can tell apart at most 2<sup><em>k</em></sup> different inputs: 1 comparison splits the possibilities into 2 groups, 2 comparisons into 4, and so on. To tell all <em>n</em>! orders apart you need 2<sup><em>k</em></sup> ≥ <em>n</em>!, that is, <em>k</em> ≥ log₂(<em>n</em>!) comparisons in the worst case. To convert Stirling's approximation to base 2, use log₂ <em>y</em> = ln <em>y</em> / ln 2 and divide every term by ln 2 ≈ 0.693: log₂(<em>n</em>!) ≈ (<em>n</em> ln <em>n</em> − <em>n</em>)/ln 2 = <em>n</em> log₂ <em>n</em> − <em>n</em>/ln 2 ≈ <em>n</em> log₂ <em>n</em> − 1.443<em>n</em>. For <em>n</em> = 1000 that's 9,966 − 1,443 ≈ 8,523 comparisons (the exact value of log₂(1000!) is about 8,529; Stirling's approximation leaves out smaller terms), against <em>n</em> log₂ <em>n</em> ≈ 9,966. So no comparison sort can beat roughly <em>n</em> log₂ <em>n</em>, and merge sort is close to the best possible. You'll prove this carefully in Algorithms.</p>

<h3>Partial fractions, briefly</h3>
<p>A rational function can often be split into simpler fractions, each easy to integrate:</p>
<p class="math">1/(<em>x</em>(<em>x</em> + 1)) = 1/<em>x</em> − 1/(<em>x</em> + 1),  so  ∫ <em>dx</em>/(<em>x</em>(<em>x</em> + 1)) = ln |<em>x</em>| − ln |<em>x</em> + 1| + <em>C</em></p>
<p>To find the split, write 1/(<em>x</em>(<em>x</em> + 1)) = <em>A</em>/<em>x</em> + <em>B</em>/(<em>x</em> + 1), multiply through: 1 = <em>A</em>(<em>x</em> + 1) + <em>Bx</em>. Setting <em>x</em> = 0 gives <em>A</em> = 1; <em>x</em> = −1 gives <em>B</em> = −1. You'll use this in Lesson 6 to solve the logistic equation.</p>

<h3>Choosing a technique</h3>
<ol>
  <li><strong>Simplify first.</strong> Expand, cancel, use identities: ∫ (<em>x</em> + 1)²/<em>x dx</em> = ∫ (<em>x</em> + 2 + 1/<em>x</em>) <em>dx</em>.</li>
  <li><strong>Is it a basic form?</strong> Powers, e<sup><em>x</em></sup>, 1/<em>x</em>, sin, cos, 1/(1 + <em>x</em>²).</li>
  <li><strong>Is there a function and its derivative?</strong> Substitution.</li>
  <li><strong>Is it a product of different kinds of function</strong> (polynomial times exponential or trig; anything with ln)? Parts.</li>
  <li><strong>Is it a rational function?</strong> Partial fractions.</li>
  <li><strong>Still stuck?</strong> Use a table or computer algebra (SymPy, below), or compute the definite integral numerically (below, and properly in Lesson 3).</li>
</ol>
<p>Always check an antiderivative by differentiating it. It takes a minute and catches most mistakes.</p>

<h3>Checking with a computer</h3>
<p><strong>Symbolically, with SymPy.</strong> SymPy is a free Python library for algebra with formulas rather than numbers. Install it once in a terminal with <code>python -m pip install sympy</code>. In ordinary Python, <code>x</code> must already hold a number before you can write <code>x * 2</code>; SymPy needs <code>x</code> to be a <em>symbol</em>, a stand-in for an unknown, so you create one first:</p>
<pre><code>import sympy as sp
x = sp.symbols("x")                        # x is now a symbol, not a number
print(sp.integrate(x * sp.exp(x), x))      # (x - 1)*exp(x)
print(sp.integrate(x**2 * sp.exp(x), (x, 0, 1)))   # -2 + E   (a definite integral)</code></pre>
<p>Use SymPy's own functions (<code>sp.exp</code>, <code>sp.sin</code>, <code>sp.log</code>) on symbols, not the ones in <code>math</code>, which only accept numbers. SymPy writes <code>E</code> for <em>e</em> and leaves out the + <em>C</em>.</p>
<p><strong>Numerically, with a midpoint sum.</strong> A definite integral can be checked without any antiderivative, using the Riemann sums from <a href="#c-math130-u6">MATH 130</a>: split [<em>a</em>, <em>b</em>] into <em>n</em> thin strips of width <em>h</em> = (<em>b</em> − <em>a</em>)/<em>n</em>, and add up (height at the middle of each strip) × <em>h</em>.</p>
<pre><code>import math

def midpoint(f, a, b, n=1000):
    h = (b - a) / n
    return h * sum(f(a + (i + 0.5) * h) for i in range(n))

print(midpoint(lambda t: t * math.exp(t), 0, 1))   # 0.99999981...; the exact value is 1</code></pre>
<p>Two pieces of Python from CS 101 appear here. <code>sum(f(…) for i in range(n))</code> is a <em>generator expression</em> (<a href="#c-cs101-str">CS 101, Strings</a>): it adds up <code>f(a + (i + 0.5) * h)</code> for each <code>i</code>, like a loop with a running total. <code>lambda t: t * math.exp(t)</code> is a <em>lambda</em> (<a href="#c-cs101-u3">CS 101, Functions and abstraction</a>): a function with no name, the same as a <code>def</code> that takes <code>t</code> and returns <code>t * math.exp(t)</code>, written inline so it can be handed straight to <code>midpoint</code>. <a href="#c-cs102-c5">CS 102, Lesson 5</a> goes further with both. This course uses lambdas often to pass a formula to a numerical method.</p>
<p>If your antiderivative <em>F</em> is right, <em>F</em>(<em>b</em>) − <em>F</em>(<em>a</em>) should agree with the sum to several decimal places. <a href="#c-math131-k3">Lesson 3</a> explains how accurate this is and how to do better.</p>
`,
    terms: [
      ["Substitution", "Integration technique reversing the chain rule: set u = g(x), du = g′(x) dx."],
      ["Integration by parts", "∫ u dv = uv − ∫ v du, reversing the product rule."],
      ["Partial fractions", "Splitting a rational function into a sum of simpler fractions."],
      ["Elementary function", "A function built from polynomials, exponentials, logarithms, trig functions and their inverses by arithmetic and composition."]
    ],
    quiz: [
      { q: "For ∫ 3<em>x</em>²(<em>x</em>³ + 1)⁵ <em>dx</em>, the best substitution is:", choices: ["u = 3x²", "u = x³ + 1", "u = (x³ + 1)⁵", "Parts"], answer: 1, why: "Its derivative, 3x², is the other factor. The answer is (x³ + 1)⁶/6 + C." },
      { q: "For ∫ <em>x</em> sin <em>x dx</em> by parts, choose:", choices: ["u = sin x, dv = x dx", "u = x, dv = sin x dx", "u = x sin x", "Substitution instead"], answer: 1, why: "x simplifies when differentiated. The result is −x cos x + sin x + C." },
      { q: "What is ∫ ln <em>x dx</em>?", choices: ["1/x + C", "x ln x − x + C", "(ln x)²/2 + C", "x ln x + C"], answer: 1, why: "Parts with u = ln x, dv = dx." },
      { q: "∫<sub>0</sub><sup>2</sup> <em>x</em> e<sup><em>x</em>²</sup> <em>dx</em> with <em>u</em> = <em>x</em>² becomes:", choices: ["∫₀² eᵘ du", "(1/2)∫₀⁴ eᵘ du", "2∫₀⁴ eᵘ du", "(1/2)∫₀² eᵘ du"], answer: 1, why: "x dx = du/2, and the limits become 0² and 2²." },
      { q: "What's the most reliable way to check an antiderivative?", choices: ["Compare with a classmate", "Differentiate it", "Plug in x = 0", "Integrate it again"], answer: 1, why: "If its derivative is the integrand, it's right (up to the constant)." }
    ],
    practice: [
      { q: `<p>Evaluate ∫ sin³ <em>x</em> cos <em>x dx</em> and ∫ <em>dx</em>/(<em>x</em> ln <em>x</em>).</p>`, a: `<p>First: <em>u</em> = sin <em>x</em>, <em>du</em> = cos <em>x dx</em>: ∫ <em>u</em>³ <em>du</em> = sin⁴ <em>x</em>/4 + <em>C</em>. Second: <em>u</em> = ln <em>x</em>, <em>du</em> = <em>dx</em>/<em>x</em>: ∫ <em>du</em>/<em>u</em> = ln |ln <em>x</em>| + <em>C</em>.</p>` },
      { q: `<p>Evaluate ∫<sub>0</sub><sup>1</sup> <em>x</em>² e<sup><em>x</em></sup> <em>dx</em> using parts twice. Check your answer numerically with a midpoint sum (the <code>midpoint</code> function in "Checking with a computer" above).</p>`, a: `<p>∫ <em>x</em>² e<sup><em>x</em></sup> <em>dx</em> = <em>x</em>² e<sup><em>x</em></sup> − 2∫ <em>x</em> e<sup><em>x</em></sup> <em>dx</em> = <em>x</em>² e<sup><em>x</em></sup> − 2(<em>x</em> − 1)e<sup><em>x</em></sup> = (<em>x</em>² − 2<em>x</em> + 2)e<sup><em>x</em></sup>. From 0 to 1: e − 2 ≈ 0.718. <code>midpoint(lambda t: t**2 * math.exp(t), 0, 1)</code>, with 1000 strips, gives 0.71828.</p>` },
      { q: `<p>Evaluate ∫ <em>x</em>√(<em>x</em> + 1) <em>dx</em>. (Hint: let <em>u</em> = <em>x</em> + 1, so <em>x</em> = <em>u</em> − 1.)</p>`, a: `<p>∫ (<em>u</em> − 1)<em>u</em><sup>1/2</sup> <em>du</em> = ∫ (<em>u</em><sup>3/2</sup> − <em>u</em><sup>1/2</sup>) <em>du</em> = (2/5)<em>u</em><sup>5/2</sup> − (2/3)<em>u</em><sup>3/2</sup> + <em>C</em> = (2/5)(<em>x</em> + 1)<sup>5/2</sup> − (2/3)(<em>x</em> + 1)<sup>3/2</sup> + <em>C</em>.</p>` },
      { q: `<p>Use partial fractions to evaluate ∫<sub>1</sub><sup><em>n</em></sup> <em>dx</em>/(<em>x</em>(<em>x</em> + 1)) and find its limit as <em>n</em> → ∞.</p>`, a: `<p>[ln <em>x</em> − ln(<em>x</em> + 1)] from 1 to <em>n</em> = ln(<em>n</em>/(<em>n</em> + 1)) + ln 2. As <em>n</em> → ∞, <em>n</em>/(<em>n</em> + 1) → 1, so the integral approaches ln 2 ≈ 0.693.</p>` },
      { q: `<p>Use SymPy to check your answer to ∫ e<sup><em>x</em></sup> sin <em>x dx</em>, and ask it for ∫ e<sup>−<em>x</em>²</sup> <em>dx</em>. The second answer uses a function you haven't met, <code>erf</code>, the <em>error function</em>, which is defined by an integral: erf(<em>x</em>) = (2/√π) ∫<sub>0</sub><sup><em>x</em></sup> e<sup>−<em>t</em>²</sup> <em>dt</em>. Why does SymPy have to answer with a function defined this way, instead of a formula like the first answer's? (Look back at the definition of an elementary function at the start of this lesson.)</p>`, a: `<pre><code>import sympy as sp
x = sp.symbols("x")
print(sp.integrate(sp.exp(x) * sp.sin(x), x))   # exp(x)*sin(x)/2 - exp(x)*cos(x)/2
print(sp.integrate(sp.exp(-x**2), x))           # sqrt(pi)*erf(x)/2</code></pre><p>The first agrees with the four-step worked example. The second has no elementary antiderivative: no formula built from polynomials, exponentials, logs and trig functions has derivative e<sup>−<em>x</em>²</sup> (this was proved in the 19th century). So the only way to write the answer is to give the integral itself a name, which is what erf is. Differentiating SymPy's answer with the Fundamental Theorem checks it: the derivative of (√π/2) · erf(<em>x</em>) is (√π/2) · (2/√π) e<sup>−<em>x</em>²</sup> = e<sup>−<em>x</em>²</sup>. It's essential in probability, for the normal distribution.</p>` }
    ],
    sources: ["openstaxcalc2", "eoc"]
  },
  {
    id: "k2",
    title: "Applications of integration",
    minutes: 90,
    summary: "Integrals as accumulated quantities: area between curves, volumes by slicing, average value, work, and probability density functions.",
    notes: `
<p>In Calculus I, the definite integral was the area under a curve. The real power of integration is more general: whenever a quantity can be split into many small pieces, each approximately (something) × (a small change), the integral adds the pieces exactly. The method is always the same, and once you see it you can set up integrals for problems you've never met.</p>

<h3>The method: slice, approximate, add</h3>
<ol>
  <li><strong>Slice</strong> the quantity into thin pieces along some variable, say <em>x</em>, with thickness Δ<em>x</em>.</li>
  <li><strong>Approximate</strong> one piece: its contribution is roughly <em>f</em>(<em>x</em>) Δ<em>x</em> for some <em>f</em>.</li>
  <li><strong>Add</strong> the pieces and let Δ<em>x</em> → 0: the total is ∫<sub><em>a</em></sub><sup><em>b</em></sup> <em>f</em>(<em>x</em>) <em>dx</em>.</li>
</ol>
<p>Check units: <em>f</em>(<em>x</em>) <em>dx</em> must have the units of the quantity. If <em>x</em> is in meters and the answer should be in cubic meters, <em>f</em> must be in square meters (an area of a cross-section).</p>

<h3>Area between curves</h3>
<figure class="fig">
<svg viewBox="0 0 300 220" role="img" aria-label="The line y = x and the parabola y = x² between x = 0 and x = 1, with the region between them shaded, and one thin vertical slice of height x − x².">
  <path d="M40.0,200.0 L240.0,40.0 L233.3,50.5 L226.7,60.6 L220.0,70.4 L213.3,79.8 L206.7,88.9 L200.0,97.6 L193.3,106.0 L186.7,114.0 L180.0,121.6 L173.3,128.9 L166.7,135.8 L160.0,142.4 L153.3,148.6 L146.7,154.5 L140.0,160.0 L133.3,165.2 L126.7,170.0 L120.0,174.4 L113.3,178.5 L106.7,182.2 L100.0,185.6 L93.3,188.6 L86.7,191.3 L80.0,193.6 L73.3,195.6 L66.7,197.2 L60.0,198.4 L53.3,199.3 L46.7,199.8 L40.0,200.0 Z" class="shade"/>
  <line x1="20" y1="200" x2="290" y2="200" class="ax"/><line x1="40" y1="212" x2="40" y2="8" class="ax"/>
  <path d="M40.0,200.0 L270.0,16.0" class="cv"/>
  <path d="M40.0,200.0 L51.5,199.5 L63.0,197.9 L74.5,195.2 L86.0,191.5 L97.5,186.8 L109.0,181.0 L120.5,174.1 L132.0,166.1 L143.5,157.2 L155.0,147.1 L166.5,136.0 L178.0,123.8 L189.5,110.6 L201.0,96.3 L212.5,81.0 L224.0,64.6 L235.5,47.1 L247.0,28.6 L252.8,18.9" class="cv"/>
  <rect x="136" y="120" width="8" height="40" class="box soft"/>
  <line x1="240" y1="40" x2="240" y2="200" class="ax dash"/>
  <text x="236" y="214" class="m">1</text><text x="34" y="214" class="m">0</text>
  <text x="200" y="20">y = x</text><text x="256" y="40">y = x²</text>
  <line x1="144" y1="160" x2="156" y2="176" class="ax"/><text x="158" y="186" class="m">height x − x²</text>
</svg>
<figcaption>The region between y = x (above) and y = x² (below). A slice at x has height x − x² and width dx.</figcaption>
</figure>
<p>A vertical slice at <em>x</em> between a top curve <em>f</em> and a bottom curve <em>g</em> has area about (<em>f</em>(<em>x</em>) − <em>g</em>(<em>x</em>)) Δ<em>x</em>, so the area between them is ∫<sub><em>a</em></sub><sup><em>b</em></sup> (<em>f</em>(<em>x</em>) − <em>g</em>(<em>x</em>)) <em>dx</em>. The curves <em>y</em> = <em>x</em> and <em>y</em> = <em>x</em>² cross where <em>x</em> = <em>x</em>², at 0 and 1, and <em>x</em> is on top in between:</p>
<p class="math">∫<sub>0</sub><sup>1</sup> (<em>x</em> − <em>x</em>²) <em>dx</em> = 1/2 − 1/3 = 1/6</p>
<p>Always find the crossing points first, and check which curve is on top; if they swap, split the integral.</p>

<h3>Volumes by slicing</h3>
<p>If a solid's cross-section at position <em>x</em> has area <em>A</em>(<em>x</em>), a slab of thickness Δ<em>x</em> has volume about <em>A</em>(<em>x</em>) Δ<em>x</em>, so the volume is ∫ <em>A</em>(<em>x</em>) <em>dx</em>.</p>
<p><strong>Solids of revolution.</strong> Rotate the region under <em>y</em> = <em>f</em>(<em>x</em>) about the <em>x</em>-axis: each cross-section is a disk of radius <em>f</em>(<em>x</em>), so <em>V</em> = ∫ π <em>f</em>(<em>x</em>)² <em>dx</em>. Rotating <em>y</em> = √<em>x</em> from 0 to 4 gives a bowl of volume ∫<sub>0</sub><sup>4</sup> π<em>x dx</em> = 8π.</p>
<p><strong>Solids with a hole: washers.</strong> Rotate the region <em>between</em> two curves, with <em>f</em>(<em>x</em>) on the outside and <em>g</em>(<em>x</em>) on the inside, about the <em>x</em>-axis. Now each cross-section is a <strong>washer</strong>: a disk of radius <em>f</em>(<em>x</em>) with a disk of radius <em>g</em>(<em>x</em>) cut out of its middle. Its area is the big disk minus the hole, π<em>f</em>(<em>x</em>)² − π<em>g</em>(<em>x</em>)², so</p>
<p class="math"><em>V</em> = ∫<sub><em>a</em></sub><sup><em>b</em></sup> π ( <em>f</em>(<em>x</em>)² − <em>g</em>(<em>x</em>)² ) <em>dx</em></p>
<p>Example: rotate the region between <em>y</em> = <em>x</em> and <em>y</em> = <em>x</em>² (the one pictured above) about the <em>x</em>-axis. For 0 ≤ <em>x</em> ≤ 1, the outer radius is <em>x</em> and the inner radius is <em>x</em>², so <em>V</em> = ∫<sub>0</sub><sup>1</sup> π(<em>x</em>² − <em>x</em>⁴) <em>dx</em> = π(1/3 − 1/5) = 2π/15 ≈ 0.419. A common mistake is π(<em>f</em> − <em>g</em>)², which squares the height of the slice instead of subtracting two disk areas; here it would give π/30, a quarter of the right answer.</p>
<p><strong>Checking a formula you know.</strong> A sphere of radius <em>r</em> is the rotation of <em>y</em> = √(<em>r</em>² − <em>x</em>²) for −<em>r</em> ≤ <em>x</em> ≤ <em>r</em>: <em>V</em> = ∫<sub>−<em>r</em></sub><sup><em>r</em></sup> π(<em>r</em>² − <em>x</em>²) <em>dx</em> = π(2<em>r</em>³ − 2<em>r</em>³/3) = (4/3)π<em>r</em>³. ✓ Archimedes found this around 250 BCE by a remarkably similar slicing argument.</p>

<h3>Average value</h3>
<p>The average of finitely many numbers is their sum divided by how many there are. The average of a function over [<em>a</em>, <em>b</em>] is its integral divided by the length:</p>
<p class="math"><em>f</em><sub>avg</sub> = (1/(<em>b</em> − <em>a</em>)) ∫<sub><em>a</em></sub><sup><em>b</em></sup> <em>f</em>(<em>x</em>) <em>dx</em></p>
<p>The average of sin <em>x</em> over [0, π] is (1/π) · 2 ≈ 0.64. Electricity gives a real use, and a warning about choosing the interval. Mains (AC) voltage follows a sine wave, and over a <em>full</em> cycle [0, 2π] its average is 0, since the negative half cancels the positive half; so the plain average is useless as a rating. A <em>rectifier</em>, the circuit in a phone charger that flips the negative halves upward, produces |sin <em>x</em>|, whose average is the half-cycle value 2/π ≈ 0.64 of the peak: that is the steady (DC) level it delivers before smoothing. AC supplies themselves are rated differently, by the <em>root-mean-square</em> value √(average of sin² <em>x</em>) = 1/√2 ≈ 0.71 of the peak, because power depends on voltage squared: a "230 V" supply peaks at about 325 V. (Why 1/2 for the average of sin² <em>x</em> over a full cycle? cos <em>x</em> is sin <em>x</em> shifted by π/2, so over a full cycle sin² <em>x</em> and cos² <em>x</em> have the same average; they add up to 1 everywhere, so each averages 1/2.) A server's average load over a day, from a load curve, is the same calculation as the plain average.</p>

<h3>Work</h3>
<p>Work is force times distance when the force is constant. When the force varies with position, slice the path: <em>W</em> = ∫<sub><em>a</em></sub><sup><em>b</em></sup> <em>F</em>(<em>x</em>) <em>dx</em>. A spring with constant <em>k</em> = 200 N/m pushes back with force <em>kx</em> when stretched <em>x</em> meters (Hooke's law). Stretching it 0.1 m takes ∫<sub>0</sub><sup>0.1</sup> 200<em>x dx</em> = 1 joule. You'll use this in Physics.</p>

<h3>Probability density functions</h3>
<p>Discrete probability (<a href="#c-math121-d6">MATH 121, Lesson 6</a>) assigns probabilities to individual outcomes. For a continuous quantity, such as a waiting time or a measurement error, any single exact value has probability 0; instead, a <strong>probability density function</strong> <em>p</em>(<em>x</em>) ≥ 0 gives probabilities as areas:</p>
<p class="math">P(<em>a</em> ≤ <em>X</em> ≤ <em>b</em>) = ∫<sub><em>a</em></sub><sup><em>b</em></sup> <em>p</em>(<em>x</em>) <em>dx</em>,  with ∫<sub>−∞</sub><sup>∞</sup> <em>p</em>(<em>x</em>) <em>dx</em> = 1</p>
<p>and the expected value is E[<em>X</em>] = ∫ <em>x p</em>(<em>x</em>) <em>dx</em>, the continuous version of Σ <em>x</em> P(<em>X</em> = <em>x</em>). The time between requests arriving at a web server is often modeled by the <strong>exponential distribution</strong>, <em>p</em>(<em>x</em>) = λe<sup>−λ<em>x</em></sup> for <em>x</em> ≥ 0, where λ is the average rate. If requests arrive at λ = 2 per second, P(wait more than 1 second) = ∫<sub>1</sub><sup>∞</sup> 2e<sup>−2<em>x</em></sup> <em>dx</em> = e<sup>−2</sup> ≈ 0.135, and the mean wait is 1/λ = 0.5 s.</p>
<p>The mean comes from integration by parts. E[<em>X</em>] = ∫<sub>0</sub><sup>∞</sup> <em>x</em> · λe<sup>−λ<em>x</em></sup> <em>dx</em>. Following LIATE, take <em>u</em> = <em>x</em> and <em>dv</em> = λe<sup>−λ<em>x</em></sup> <em>dx</em>, so <em>du</em> = <em>dx</em> and <em>v</em> = −e<sup>−λ<em>x</em></sup> (check: the derivative of −e<sup>−λ<em>x</em></sup> is λe<sup>−λ<em>x</em></sup>). Then</p>
<p class="math">∫<sub>0</sub><sup>∞</sup> <em>x</em> λe<sup>−λ<em>x</em></sup> <em>dx</em> = [ −<em>x</em> e<sup>−λ<em>x</em></sup> ]<sub>0</sub><sup>∞</sup> + ∫<sub>0</sub><sup>∞</sup> e<sup>−λ<em>x</em></sup> <em>dx</em> = (0 − 0) + [ −e<sup>−λ<em>x</em></sup>/λ ]<sub>0</sub><sup>∞</sup> = 0 + (0 + 1/λ) = 1/λ</p>
<p>The value of −<em>x</em>e<sup>−λ<em>x</em></sup> "at ∞" means its limit as <em>x</em> → ∞, which is 0 because exponential decay beats any power of <em>x</em>; at 0 it is 0 too. Integrals over infinite intervals like this one are made precise in the next lesson.</p>
`,
    terms: [
      ["Area between curves", "∫ (top − bottom) dx over the interval where one curve is above the other."],
      ["Volume by slicing", "V = ∫ A(x) dx, where A(x) is the cross-sectional area."],
      ["Disk method", "Volume of a solid of revolution about the x-axis: ∫ π f(x)² dx."],
      ["Washer method", "Volume when the rotated region lies between an outer curve f and an inner curve g: ∫ π (f(x)² − g(x)²) dx."],
      ["Average value", "f_avg = (1/(b − a)) ∫ₐᵇ f(x) dx."],
      ["Probability density function", "A function p ≥ 0 with total area 1, giving probabilities as areas under it."]
    ],
    quiz: [
      { q: "The area between <em>y</em> = 4 and <em>y</em> = <em>x</em>² is:", choices: ["∫₋₂² (x² − 4) dx", "∫₋₂² (4 − x²) dx = 32/3", "∫₀⁴ (4 − x²) dx", "16"], answer: 1, why: "They cross at x = ±2, with 4 on top." },
      { q: "Rotating <em>y</em> = <em>x</em> for 0 ≤ <em>x</em> ≤ 3 about the <em>x</em>-axis makes a cone of volume:", choices: ["9π/2", "9π", "27π", "3π"], answer: 1, why: "∫₀³ πx² dx = 9π, matching (1/3)πr²h = (1/3)π·9·3." },
      { q: "The average value of <em>f</em>(<em>x</em>) = <em>x</em>² on [0, 3] is:", choices: ["9", "3", "4.5", "1"], answer: 1, why: "(1/3)·∫₀³ x² dx = (1/3)·9 = 3." },
      { q: "For a continuous random variable with density <em>p</em>, P(<em>X</em> = 2) is:", choices: ["p(2)", "0", "1", "Undefined"], answer: 1, why: "A single point has zero width, so zero area." },
      { q: "If <em>x</em> is in seconds and <em>f</em>(<em>x</em>) in liters per second, ∫ <em>f</em>(<em>x</em>) <em>dx</em> is in:", choices: ["liters per second²", "liters", "seconds", "liters·seconds"], answer: 1, why: "(liters/second) × seconds = liters." }
    ],
    practice: [
      { q: `<p>Find the area enclosed by <em>y</em> = <em>x</em>² and <em>y</em> = 2<em>x</em> + 3.</p>`, a: `<p>Crossings: <em>x</em>² = 2<em>x</em> + 3 → (<em>x</em> − 3)(<em>x</em> + 1) = 0, so <em>x</em> = −1, 3. The line is on top. ∫<sub>−1</sub><sup>3</sup> (2<em>x</em> + 3 − <em>x</em>²) <em>dx</em> = [<em>x</em>² + 3<em>x</em> − <em>x</em>³/3] = (9 + 9 − 9) − (1 − 3 + 1/3) = 9 + 5/3 = 32/3.</p>` },
      { q: `<p>A pyramid has a square base of side 6 m and height 9 m. Set up and evaluate an integral for its volume by slicing horizontally.</p>`, a: `<p>At height <em>y</em> above the base, the cross-section is a square of side 6(1 − <em>y</em>/9). <em>V</em> = ∫<sub>0</sub><sup>9</sup> 36(1 − <em>y</em>/9)² <em>dy</em>. Substituting <em>u</em> = 1 − <em>y</em>/9: 36 · 9 · ∫<sub>0</sub><sup>1</sup> <em>u</em>² <em>du</em> = 108 m³, matching (1/3) · base · height = (1/3)(36)(9).</p>` },
      { q: `<p>A server's request rate over an 8-hour shift is <em>r</em>(<em>t</em>) = 100 + 50 sin(π<em>t</em>/8) requests per minute, with <em>t</em> in hours. What is the average rate over the shift?</p>`, a: `<p>(1/8)∫<sub>0</sub><sup>8</sup> (100 + 50 sin(π<em>t</em>/8)) <em>dt</em> = (1/8)[800 + 50 · (16/π)] = 100 + 100/π ≈ 131.8 requests per minute.</p>` },
      { q: `<p>For the exponential density <em>p</em>(<em>x</em>) = λe<sup>−λ<em>x</em></sup>, show that P(<em>X</em> &gt; <em>s</em> + <em>t</em> | <em>X</em> &gt; <em>s</em>) = P(<em>X</em> &gt; <em>t</em>). What does this "memoryless" property mean for a server waiting for requests? (The vertical bar means "given": P(<em>A</em> | <em>B</em>) is the probability of <em>A</em> once you know <em>B</em> happened, and it equals P(<em>A</em> and <em>B</em>)/P(<em>B</em>). That's all you need here; <a href="#c-math121-d6">MATH 121, Lesson 6</a> treats conditional probability fully.)</p>`, a: `<p>P(<em>X</em> &gt; <em>a</em>) = ∫<sub><em>a</em></sub><sup>∞</sup> λe<sup>−λ<em>x</em></sup> <em>dx</em> = e<sup>−λ<em>a</em></sup>. If <em>X</em> &gt; <em>s</em> + <em>t</em>, then certainly <em>X</em> &gt; <em>s</em>, so "both happen" is just <em>X</em> &gt; <em>s</em> + <em>t</em>, and the conditional probability is P(<em>X</em> &gt; <em>s</em> + <em>t</em>)/P(<em>X</em> &gt; <em>s</em>) = e<sup>−λ(<em>s</em>+<em>t</em>)</sup>/e<sup>−λ<em>s</em></sup> = e<sup>−λ<em>t</em></sup>. Having already waited <em>s</em> seconds tells you nothing about how much longer you'll wait: the next request is no more "due" than it was.</p>` },
      { q: `<p>Estimate the volume of the bowl from rotating <em>y</em> = √<em>x</em>, 0 ≤ <em>x</em> ≤ 4, with a Python sum of 1000 thin disks, and compare with 8π.</p>`, a: `<pre><code>import math
n = 1000
dx = 4 / n
V = sum(math.pi * (math.sqrt((i + 0.5) * dx)) ** 2 * dx for i in range(n))
print(V, 8 * math.pi)   # both 25.1327...</code></pre>` }
    ],
    sources: ["openstaxcalc2", "eoc"]
  },
  {
    id: "k3",
    title: "Numerical integration and improper integrals",
    minutes: 90,
    summary: "Computing integrals that have no formula: the trapezoid and Simpson's rules and their errors; and integrals over infinite intervals or of unbounded functions.",
    notes: `
<p>Most integrals that arise in practice can't be done with formulas, either because the antiderivative isn't elementary or because the function is only known from data, such as sensor readings every second. Computers evaluate them numerically. This lesson covers the standard methods, how accurate they are, and how to handle integrals over infinite ranges.</p>

<h3>From Riemann sums to the trapezoid rule</h3>
<p>Split [<em>a</em>, <em>b</em>] into <em>n</em> pieces of width <em>h</em> = (<em>b</em> − <em>a</em>)/<em>n</em>, with points <em>x</em><sub>0</sub>, …, <em>x<sub>n</sub></em>. Left and right Riemann sums use rectangles; their error shrinks only in proportion to <em>h</em>. The <strong>midpoint rule</strong> uses each rectangle's middle and does much better. The <strong>trapezoid rule</strong> joins neighboring points with straight lines:</p>
<p class="math"><em>T<sub>n</sub></em> = <em>h</em> [ <em>f</em>(<em>x</em>₀)/2 + <em>f</em>(<em>x</em>₁) + <em>f</em>(<em>x</em>₂) + … + <em>f</em>(<em>x</em><sub><em>n</em>−1</sub>) + <em>f</em>(<em>x<sub>n</sub></em>)/2 ]</p>
<figure class="fig">
<svg viewBox="0 0 320 210" role="img" aria-label="The curve y = 1/(1 + x²) from 0 to 2 with four trapezoids under it. The trapezoids' slanted tops are close to the curve.">
  <path d="M40.0,190.0 L40.0,40.0 L100.0,70.0 L100.0,190.0 Z" class="box soft"/>
  <path d="M100.0,190.0 L100.0,70.0 L160.0,115.0 L160.0,190.0 Z" class="box soft"/>
  <path d="M160.0,190.0 L160.0,115.0 L220.0,143.8 L220.0,190.0 Z" class="box soft"/>
  <path d="M220.0,190.0 L220.0,143.8 L280.0,160.0 L280.0,190.0 Z" class="box soft"/>
  <line x1="20" y1="190" x2="310" y2="190" class="ax"/><line x1="40" y1="200" x2="40" y2="15" class="ax"/>
  <path d="M40.0,40.0 L48.8,40.8 L57.6,43.2 L66.4,46.9 L75.2,51.9 L84.0,57.8 L92.8,64.3 L101.6,71.3 L110.4,78.4 L119.2,85.5 L128.0,92.5 L136.8,99.1 L145.6,105.5 L154.4,111.4 L163.2,117.0 L172.0,122.1 L180.8,126.9 L189.6,131.3 L198.4,135.3 L207.2,139.0 L216.0,142.4 L224.8,145.5 L233.6,148.4 L242.4,151.0 L251.2,153.4 L260.0,155.6 L268.8,157.6 L277.6,159.5 L286.4,161.2 L295.2,162.8 L304.0,164.3" class="cv"/>
  <text x="36" y="204" class="m">0</text><text x="156" y="204" class="m">1</text><text x="276" y="204" class="m">2</text>
  <text x="120" y="40">y = 1/(1 + x²)</text>
</svg>
<figcaption>The trapezoid rule with n = 4 on ∫₀² dx/(1 + x²). The exact value is arctan 2 ≈ 1.1071; T₄ ≈ 1.1038.</figcaption>
</figure>
<pre><code>def trapezoid(f, a, b, n):
    h = (b - a) / n
    total = (f(a) + f(b)) / 2
    for i in range(1, n):
        total += f(a + i * h)
    return h * total</code></pre>

<h3>How fast does the error shrink?</h3>
<p>For a function with a continuous second derivative, the trapezoid rule's error is at most</p>
<p class="math">|<em>E<sub>T</sub></em>| ≤ <em>K</em>(<em>b</em> − <em>a</em>)<em>h</em>² / 12,  where |<em>f</em>″(<em>x</em>)| ≤ <em>K</em> on [<em>a</em>, <em>b</em>]</p>
<p>The error is proportional to <em>h</em>²: doubling the number of pieces cuts the error by about 4. The midpoint rule has the same order (and about half the error). The intuition: a straight line misses a curve by an amount that depends on how much it bends, which is <em>f</em>″.</p>
<p><strong>What is <em>K</em>, and how do you find it?</strong> <em>K</em> is any number that the size of the second derivative never exceeds on the interval: |<em>f</em>″(<em>x</em>)| ≤ <em>K</em> for every <em>x</em> in [<em>a</em>, <em>b</em>]. It measures the most the function bends. To find one: compute <em>f</em>″, then find the largest value of |<em>f</em>″| on [<em>a</em>, <em>b</em>], using the Calculus I method of checking the endpoints and the points where <em>f</em>‴ = 0, or plotting it. Any larger number is also a valid <em>K</em>; it just gives a weaker bound. Example: <em>f</em>(<em>x</em>) = 1/(1 + <em>x</em>²) on [0, 2] (the figure). Then <em>f</em>″(<em>x</em>) = (6<em>x</em>² − 2)/(1 + <em>x</em>²)³, which is −2 at <em>x</em> = 0 and smaller in size everywhere else on [0, 2], so <em>K</em> = 2. With <em>n</em> = 4, <em>h</em> = 0.5, the bound is 2 · 2 · 0.5²/12 ≈ 0.083. The actual error, 1.1071 − 1.1038 ≈ 0.0033, is far smaller: the formula is a <em>guarantee</em>, usually pessimistic, and it's most useful for choosing <em>n</em> in advance (practice 2).</p>

<h3>Simpson's rule</h3>
<p>Instead of straight lines, fit a parabola through each three consecutive points. For an even <em>n</em>:</p>
<p class="math"><em>S<sub>n</sub></em> = (<em>h</em>/3) [ <em>f</em>(<em>x</em>₀) + 4<em>f</em>(<em>x</em>₁) + 2<em>f</em>(<em>x</em>₂) + 4<em>f</em>(<em>x</em>₃) + … + 4<em>f</em>(<em>x</em><sub><em>n</em>−1</sub>) + <em>f</em>(<em>x<sub>n</sub></em>) ]</p>
<p>Its error is proportional to <em>h</em>⁴: the bound is |<em>E<sub>S</sub></em>| ≤ <em>K</em>(<em>b</em> − <em>a</em>)<em>h</em>⁴/180, with <em>K</em> now a bound on the <em>fourth</em> derivative. Doubling <em>n</em> halves <em>h</em>, which divides <em>h</em>⁴ by 2⁴ = 16. On ∫<sub>0</sub><sup>1</sup> e<sup><em>x</em></sup> <em>dx</em> = e − 1:</p>
<table>
  <thead><tr><th><em>n</em></th><th>Trapezoid error</th><th>Ratio to previous</th><th>Simpson error</th><th>Ratio to previous</th></tr></thead>
  <tbody>
    <tr><td>4</td><td>8.9 × 10⁻³</td><td></td><td>3.7 × 10⁻⁵</td><td></td></tr>
    <tr><td>8</td><td>2.2 × 10⁻³</td><td>4.0</td><td>2.3 × 10⁻⁶</td><td>15.9</td></tr>
    <tr><td>16</td><td>5.6 × 10⁻⁴</td><td>4.0</td><td>1.5 × 10⁻⁷</td><td>16.0</td></tr>
  </tbody>
</table>
<p>The table shows the orders in action: each doubling divides the trapezoid error by 4 and Simpson's error by 16.</p>
<p><strong>When the pattern looks different.</strong> On ∫<sub>0</sub><sup>1</sup> 4/(1 + <em>x</em>²) <em>dx</em> = π, Simpson's errors for <em>n</em> = 4, 8, 16 and 32 are 2.4 × 10⁻⁵, 1.5 × 10⁻⁷, 2.4 × 10⁻⁹ and 3.7 × 10⁻¹¹: they fall by about 160, then 64, then 64, not 16. That doesn't contradict the rule. "Divide by 16" describes the leading part of the error, which for Simpson's rule is proportional to <em>h</em>⁴ · (<em>f</em>‴(<em>b</em>) − <em>f</em>‴(<em>a</em>)). For this particular function <em>f</em>‴(0) = <em>f</em>‴(1) = 0, so that part vanishes, and the next part of the error, proportional to <em>h</em>⁶, takes over: halving <em>h</em> divides it by 2⁶ = 64. The first ratio, 160, comes from <em>n</em> = 4, too few points for any pattern to have settled. So: expect 16 in general, get something better by luck on special functions, and always remember the bound is an upper limit, not a prediction. (Even 1/(1 + <em>x</em>²) on [0, 2] from the figure, where nothing cancels, shows ratios of about 235 and 28 before settling at 16 from <em>n</em> = 16 onward. The pattern is a statement about small <em>h</em>.)</p>
<p>With higher-order methods, a few dozen function evaluations reach the limits of floating-point accuracy. Libraries like SciPy (<code>scipy.integrate.quad</code>) use adaptive methods, which add points only where the function is hard to approximate, and report an error estimate along with the answer.</p>
<p>The idea of an error's <strong>order</strong>, how it scales with step size, is central to all numerical computing, from simulating physics to training neural networks. It's the same kind of reasoning as big-O for algorithms.</p>

<h3>Improper integrals: infinite intervals</h3>
<p>An integral over an infinite interval is defined as a limit:</p>
<p class="math">∫<sub><em>a</em></sub><sup>∞</sup> <em>f</em>(<em>x</em>) <em>dx</em> = lim<sub><em>t</em>→∞</sub> ∫<sub><em>a</em></sub><sup><em>t</em></sup> <em>f</em>(<em>x</em>) <em>dx</em></p>
<p>If the limit exists, the integral <strong>converges</strong>; otherwise it <strong>diverges</strong>.</p>
<ul>
  <li>∫<sub>1</sub><sup>∞</sup> <em>dx</em>/<em>x</em>² = lim (1 − 1/<em>t</em>) = 1. Converges: an infinitely long region with finite area.</li>
  <li>∫<sub>1</sub><sup>∞</sup> <em>dx</em>/<em>x</em> = lim ln <em>t</em> = ∞. Diverges, although 1/<em>x</em> → 0.</li>
  <li>In general ∫<sub>1</sub><sup>∞</sup> <em>dx</em>/<em>x<sup>p</sup></em> converges if and only if <em>p</em> &gt; 1. These <strong><em>p</em>-integrals</strong> are the standard comparisons.</li>
  <li>∫<sub>0</sub><sup>∞</sup> e<sup>−<em>x</em></sup> <em>dx</em> = 1. Exponential decay beats any power.</li>
</ul>
<p><strong>Comparison.</strong> If 0 ≤ <em>f</em> ≤ <em>g</em> and ∫ <em>g</em> converges, so does ∫ <em>f</em>; if ∫ <em>f</em> diverges, so does ∫ <em>g</em>. For example, e<sup>−<em>x</em>²</sup> ≤ e<sup>−<em>x</em></sup> for <em>x</em> ≥ 1, so ∫<sub>1</sub><sup>∞</sup> e<sup>−<em>x</em>²</sup> <em>dx</em> converges, even though we can't compute an antiderivative. (In fact ∫<sub>−∞</sub><sup>∞</sup> e<sup>−<em>x</em>²</sup> <em>dx</em> = √π. You don't need the proof, which uses a double integral in polar coordinates; <a href="#c-math131-k9">Lesson 9</a>'s Practice 2 checks the value numerically, through its square.)</p>

<h3>Improper integrals: unbounded functions</h3>
<p>If <em>f</em> blows up at an endpoint, take a limit there too. ∫<sub>0</sub><sup>1</sup> <em>dx</em>/√<em>x</em> = lim<sub><em>s</em>→0⁺</sub> (2 − 2√<em>s</em>) = 2, which converges. ∫<sub>0</sub><sup>1</sup> <em>dx</em>/<em>x</em> diverges. Near 0 the rule is reversed: ∫<sub>0</sub><sup>1</sup> <em>dx</em>/<em>x<sup>p</sup></em> converges if and only if <em>p</em> &lt; 1. Watch for singularities <em>inside</em> the interval: ∫<sub>−1</sub><sup>1</sup> <em>dx</em>/<em>x</em>² is not [−1/<em>x</em>] = −2 (a negative area of a positive function!); it diverges. Numerical methods can be fooled the same way, so always look at the function before integrating it.</p>
`,
    terms: [
      ["Trapezoid rule", "Numerical integration joining sample points with straight lines; error proportional to h²."],
      ["Simpson's rule", "Numerical integration fitting parabolas through triples of points; error proportional to h⁴."],
      ["Order of a method", "How the error scales with step size h, e.g. O(h²)."],
      ["Improper integral", "An integral over an infinite interval or of an unbounded function, defined as a limit."],
      ["Convergent / divergent", "Whether the limit defining an improper integral (or a series) exists and is finite."]
    ],
    quiz: [
      { q: "With the trapezoid rule, if you double <em>n</em>, the error is roughly:", choices: ["Halved", "Divided by 4", "Divided by 16", "Unchanged"], answer: 1, why: "The error is proportional to h²." },
      { q: "Simpson's rule requires <em>n</em> to be:", choices: ["Odd", "Even", "A power of 2", "Prime"], answer: 1, why: "Each parabola covers two subintervals." },
      { q: "∫<sub>1</sub><sup>∞</sup> <em>dx</em>/<em>x</em><sup>1.01</sup>:", choices: ["Diverges", "Converges to 100", "Converges to 1", "Converges to 0.01"], answer: 1, why: "p = 1.01 > 1; the value is 1/(p − 1) = 100." },
      { q: "∫<sub>0</sub><sup>1</sup> <em>dx</em>/<em>x</em>²:", choices: ["Converges to 1", "Diverges", "Equals −1", "Equals 0"], answer: 1, why: "Near 0 it converges only for p < 1." },
      { q: "Why is [−1/<em>x</em>] from −1 to 1 not the value of ∫<sub>−1</sub><sup>1</sup> <em>dx</em>/<em>x</em>²?", choices: ["Arithmetic mistake", "The integrand is unbounded at 0 inside the interval, so the Fundamental Theorem of Calculus doesn't apply; the integral diverges", "It is the right value", "Because −1/x is not an antiderivative"], answer: 1, why: "The Fundamental Theorem needs f continuous on the whole interval." }
    ],
    practice: [
      { q: `<p>Compute <em>T</em>₄ for ∫<sub>0</sub><sup>2</sup> <em>x</em>² <em>dx</em> by hand and compare with the exact value. Why is the estimate too large?</p>`, a: `<p><em>h</em> = 0.5; values 0, 0.25, 1, 2.25, 4. <em>T</em>₄ = 0.5(0/2 + 0.25 + 1 + 2.25 + 4/2) = 0.5 · 5.5 = 2.75. Exact: 8/3 ≈ 2.667. The curve is concave up (<em>f</em>″ &gt; 0), so the straight tops of the trapezoids lie above it.</p>` },
      { q: `<p>How large must <em>n</em> be to guarantee the trapezoid rule approximates ∫<sub>0</sub><sup>1</sup> e<sup><em>x</em></sup> <em>dx</em> within 10⁻⁶?</p>`, a: `<p><em>f</em>″ = e<sup><em>x</em></sup> ≤ e on [0, 1], so <em>K</em> = e. Need e · 1 · (1/<em>n</em>)²/12 ≤ 10⁻⁶, so <em>n</em>² ≥ e · 10⁶/12 ≈ 226,523, giving <em>n</em> ≥ 476.</p>` },
      { q: `<p>Write <code>simpson(f, a, b, n)</code> in Python. Reproduce the Simpson column of the table for ∫<sub>0</sub><sup>1</sup> e<sup><em>x</em></sup> <em>dx</em>, then compute the errors for ∫<sub>0</sub><sup>1</sup> 4/(1 + <em>x</em>²) <em>dx</em> = π and the ratios between them.</p>`, a: `<pre><code>import math

def simpson(f, a, b, n):
    if n % 2:
        raise ValueError("n must be even")
    h = (b - a) / n
    s = f(a) + f(b)
    for i in range(1, n):
        s += (4 if i % 2 else 2) * f(a + i * h)
    return h * s / 3

for f, exact in ((math.exp, math.e - 1), (lambda x: 4 / (1 + x * x), math.pi)):
    prev = None
    for n in (4, 8, 16, 32):
        err = abs(simpson(f, 0, 1, n) - exact)
        print(n, f"{err:.1e}", round(prev / err, 1) if prev else "")
        prev = err</code></pre><p>For e<sup><em>x</em></sup> the ratios are about 16; for 4/(1 + <em>x</em>²) they are about 159, 64 and 64, for the reason explained in the lesson: that function's <em>h</em>⁴ error term cancels.</p>` },
      { q: `<p>Decide whether each converges, and find the value if it does: (a) ∫<sub>0</sub><sup>∞</sup> <em>x</em>e<sup>−<em>x</em></sup> <em>dx</em>; (b) ∫<sub>2</sub><sup>∞</sup> <em>dx</em>/(<em>x</em> ln <em>x</em>); (c) ∫<sub>1</sub><sup>∞</sup> (sin² <em>x</em>)/<em>x</em>² <em>dx</em>.</p>`, a: `<p>(a) By parts, ∫ <em>x</em>e<sup>−<em>x</em></sup> <em>dx</em> = −(<em>x</em> + 1)e<sup>−<em>x</em></sup>; from 0 to ∞ it's 0 − (−1) = 1. Converges to 1. (b) Substituting <em>u</em> = ln <em>x</em> gives ln(ln <em>t</em>) − ln(ln 2) → ∞. Diverges (very slowly). (c) 0 ≤ sin² <em>x</em>/<em>x</em>² ≤ 1/<em>x</em>², and ∫ 1/<em>x</em>² converges, so this converges by comparison.</p>` },
      { q: `<p>Gabriel's horn: rotate <em>y</em> = 1/<em>x</em>, <em>x</em> ≥ 1, about the <em>x</em>-axis. Show its volume is finite. (Its surface area turns out to be infinite: a horn you could fill with paint but never paint.)</p>`, a: `<p><em>V</em> = ∫<sub>1</sub><sup>∞</sup> π/<em>x</em>² <em>dx</em> = π. The surface area is at least ∫<sub>1</sub><sup>∞</sup> 2π/<em>x dx</em>, which diverges.</p>` }
    ],
    sources: ["openstaxcalc2"]
  },
  {
    id: "k4",
    title: "Sequences and series",
    minutes: 90,
    summary: "What it means to add infinitely many numbers: sequences and limits, geometric and harmonic series, and the integral, comparison and ratio tests for convergence.",
    notes: `
<p>Can you add infinitely many numbers and get a finite answer? Zeno's paradox says a runner must cover half the distance, then a quarter, then an eighth, forever, yet runners finish races. This lesson makes "infinite sums" precise. Series are how calculators compute sin and e<sup><em>x</em></sup>, how algorithms' running times are summed, and the basis of the Taylor series in the next lesson.</p>

<h3>Sequences</h3>
<p>A <strong>sequence</strong> is an infinite list <em>a</em>₁, <em>a</em>₂, <em>a</em>₃, …, a function from the positive integers. It <strong>converges</strong> to <em>L</em> if its terms get and stay as close to <em>L</em> as you like: lim<sub><em>n</em>→∞</sub> <em>a<sub>n</sub></em> = <em>L</em>. So 1/<em>n</em> → 0, (1 + 1/<em>n</em>)<sup><em>n</em></sup> → e, and (−1)<sup><em>n</em></sup> diverges (it alternates forever). Limits of sequences behave like limits of functions, and the same algebra applies. Growth rates matter a lot: as <em>n</em> → ∞,</p>
<p class="math">ln <em>n</em> ≪ <em>n<sup>p</sup></em> ≪ <em>b<sup>n</sup></em> ≪ <em>n</em>! ≪ <em>n<sup>n</sup></em>   (for <em>p</em> &gt; 0, <em>b</em> &gt; 1)</p>
<p>The symbol ≪ reads "is much smaller than (for large <em>n</em>)" or "grows much more slowly than": <em>a<sub>n</sub></em> ≪ <em>b<sub>n</sub></em> means <em>a<sub>n</sub></em>/<em>b<sub>n</sub></em> → 0. So each function in the chain divided by the next one tends to 0; for example, <em>n</em>²/2<sup><em>n</em></sup> → 0. This is the same hierarchy as the big-O classes from <a href="#c-cs101-algo">CS 101's lesson on efficiency</a>.</p>

<h3>Series and partial sums</h3>
<p>A <strong>series</strong> Σ<sub><em>n</em>=1</sub><sup>∞</sup> <em>a<sub>n</sub></em> is defined through its <strong>partial sums</strong> <em>S<sub>N</sub></em> = <em>a</em>₁ + … + <em>a<sub>N</sub></em>. The series converges to <em>S</em> if the sequence of partial sums converges to <em>S</em>.</p>

<h3>Geometric series</h3>
<p class="math">Σ<sub><em>n</em>=0</sub><sup>∞</sup> <em>ar<sup>n</sup></em> = <em>a</em> + <em>ar</em> + <em>ar</em>² + … = <em>a</em>/(1 − <em>r</em>)  if |<em>r</em>| &lt; 1, and diverges if |<em>r</em>| ≥ 1</p>
<p><strong>Why:</strong> <em>S<sub>N</sub></em> = <em>a</em> + <em>ar</em> + … + <em>ar<sup>N</sup></em>. Multiply by <em>r</em> and subtract: <em>S<sub>N</sub></em> − <em>rS<sub>N</sub></em> = <em>a</em> − <em>ar</em><sup><em>N</em>+1</sup>, so <em>S<sub>N</sub></em> = <em>a</em>(1 − <em>r</em><sup><em>N</em>+1</sup>)/(1 − <em>r</em>). If |<em>r</em>| &lt; 1, <em>r</em><sup><em>N</em>+1</sup> → 0. Zeno's runner: 1/2 + 1/4 + 1/8 + … = (1/2)/(1 − 1/2) = 1.</p>
<p>Geometric series appear constantly in computing. A dynamic array that doubles when full, filled with <em>n</em> items, copies 1 + 2 + 4 + … + <em>s</em> items in total, where the last copy <em>s</em> is at most <em>n</em>. Read backwards, that is <em>s</em>(1 + 1/2 + 1/4 + …) &lt; 2<em>s</em> ≤ 2<em>n</em>: fewer than 2 copies per append, which is why appending is O(1) amortized. (<a href="#c-cs102-c7">CS 102, Lesson 7</a> shows the total is between about <em>n</em> and 2<em>n</em>, depending on where <em>n</em> falls between powers of 2.) A recursion that does half as much work at each level does total work at most twice the top level. And the repeating decimal 0.999… = 9/10 + 9/100 + … = (9/10)/(1 − 1/10) = 1 exactly.</p>

<h3>The divergence test</h3>
<p>If Σ <em>a<sub>n</sub></em> converges, then <em>a<sub>n</sub></em> → 0. Equivalently, <strong>if the terms don't go to 0, the series diverges</strong>. Σ <em>n</em>/(<em>n</em> + 1) diverges because its terms approach 1. But the converse is false, as the next example shows.</p>

<h3>The harmonic series</h3>
<p class="math">1 + 1/2 + 1/3 + 1/4 + … = ∞</p>
<p>The terms go to 0, yet the sum diverges. Nicole Oresme's proof (around 1350) groups the terms: 1/3 + 1/4 &gt; 1/2; 1/5 + … + 1/8 &gt; 4 · 1/8 = 1/2; 1/9 + … + 1/16 &gt; 1/2; and so on, infinitely many halves. The partial sums <em>H<sub>N</sub></em> = 1 + 1/2 + … + 1/<em>N</em>, called the <strong>harmonic numbers</strong>, grow like ln <em>N</em> (more precisely, <em>H<sub>N</sub></em> ≈ ln <em>N</em> + 0.5772; the integral test below shows why). So the series diverges, but extremely slowly: it takes about 1.5 × 10⁴³ terms to pass 100. Harmonic numbers turn up whenever an algorithm's steps cost 1, 1/2, 1/3, …: <a href="#c-math121-d7">MATH 121, Lesson 7</a> uses them for the coupon collector problem and for quicksort's average cost, quoting the approximation ln <em>N</em> + 0.577 that this lesson justifies. Whichever lesson you reach first, the definition is the same.</p>

<h3>The integral test</h3>
<p>If <em>f</em> is positive and decreasing and <em>a<sub>n</sub></em> = <em>f</em>(<em>n</em>), then Σ <em>a<sub>n</sub></em> and ∫<sub>1</sub><sup>∞</sup> <em>f</em>(<em>x</em>) <em>dx</em> both converge or both diverge. The reason is a picture: draw each term as a rectangle of width 1, so its <em>area</em> equals the term.</p>
<figure class="fig">
<svg viewBox="0 0 450 220" role="img" aria-label="The curve y = 1/x from x = 1 to 6 with rectangles of width 1. Outlined rectangles of heights a1 to a5 start at the curve's value on their left edge and lie above the curve. Shaded rectangles of heights a2 to a6 lie below the curve.">
  <rect x="50.0" y="50.0" width="70" height="140.0" class="outline"/>
  <rect x="120.0" y="120.0" width="70" height="70.0" class="outline"/>
  <rect x="190.0" y="143.3" width="70" height="46.7" class="outline"/>
  <rect x="260.0" y="155.0" width="70" height="35.0" class="outline"/>
  <rect x="330.0" y="162.0" width="70" height="28.0" class="outline"/>
  <rect x="50.0" y="120.0" width="70" height="70.0" class="shade"/>
  <rect x="120.0" y="143.3" width="70" height="46.7" class="shade"/>
  <rect x="190.0" y="155.0" width="70" height="35.0" class="shade"/>
  <rect x="260.0" y="162.0" width="70" height="28.0" class="shade"/>
  <rect x="330.0" y="166.7" width="70" height="23.3" class="shade"/>
  <line x1="40" y1="190" x2="440" y2="190" class="ax"/><line x1="50" y1="200" x2="50" y2="30" class="ax"/>
  <path d="M50.0,50.0 L57.0,62.7 L64.0,73.3 L71.0,82.3 L78.0,90.0 L85.0,96.7 L92.0,102.5 L99.0,107.6 L106.0,112.2 L113.0,116.3 L120.0,120.0 L127.0,123.3 L134.0,126.4 L141.0,129.1 L148.0,131.7 L155.0,134.0 L162.0,136.2 L169.0,138.1 L176.0,140.0 L183.0,141.7 L190.0,143.3 L197.0,144.8 L204.0,146.3 L211.0,147.6 L218.0,148.8 L225.0,150.0 L232.0,151.1 L239.0,152.2 L246.0,153.2 L253.0,154.1 L260.0,155.0 L267.0,155.9 L274.0,156.7 L281.0,157.4 L288.0,158.2 L295.0,158.9 L302.0,159.6 L309.0,160.2 L316.0,160.8 L323.0,161.4 L330.0,162.0 L337.0,162.5 L344.0,163.1 L351.0,163.6 L358.0,164.1 L365.0,164.5 L372.0,165.0 L379.0,165.4 L386.0,165.9 L393.0,166.3 L400.0,166.7 L407.0,167.0 L414.0,167.4 L421.0,167.8 L428.0,168.1" class="cv"/>
  <text x="85.0" y="45.0" text-anchor="middle" class="m">a₁</text>
  <text x="155.0" y="115.0" text-anchor="middle" class="m">a₂</text>
  <text x="225.0" y="138.3" text-anchor="middle" class="m">a₃</text>
  <text x="295.0" y="150.0" text-anchor="middle" class="m">a₄</text>
  <text x="365.0" y="157.0" text-anchor="middle" class="m">a₅</text>
  <text x="50.0" y="205" text-anchor="middle" class="m">1</text><text x="120.0" y="205" text-anchor="middle" class="m">2</text><text x="190.0" y="205" text-anchor="middle" class="m">3</text>
  <text x="260.0" y="205" text-anchor="middle" class="m">4</text><text x="330.0" y="205" text-anchor="middle" class="m">5</text><text x="400.0" y="205" text-anchor="middle" class="m">6</text>
  <text x="330" y="100">y = f(x) = 1/x</text>
</svg>
<figcaption>Terms of Σ 1/n drawn as rectangles of width 1. The outlined rectangles (heights a₁, …, a₅) stick out above the curve; the shaded ones (heights a₂, …, a₆) fit under it.</figcaption>
</figure>
<p>Read the two families of rectangles from the figure:</p>
<ul>
  <li><strong>Outlined, above the curve.</strong> On [<em>n</em>, <em>n</em> + 1] the rectangle has height <em>a<sub>n</sub></em> = <em>f</em>(<em>n</em>), the curve's value at the left edge, and since <em>f</em> is decreasing the curve stays below that height. So <em>a</em>₁ + … + <em>a<sub>N</sub></em> ≥ ∫<sub>1</sub><sup><em>N</em>+1</sup> <em>f</em>(<em>x</em>) <em>dx</em>. If the integral grows without bound, so do the partial sums: the series diverges.</li>
  <li><strong>Shaded, below the curve.</strong> On [<em>n</em>, <em>n</em> + 1] the rectangle has height <em>a</em><sub><em>n</em>+1</sub>, the value at the right edge, so it fits under the curve. So <em>a</em>₂ + … + <em>a<sub>N</sub></em> ≤ ∫<sub>1</sub><sup><em>N</em></sup> <em>f</em>(<em>x</em>) <em>dx</em> ≤ ∫<sub>1</sub><sup>∞</sup> <em>f</em>(<em>x</em>) <em>dx</em>. If that integral is finite, the partial sums keep increasing (every term is positive) but never pass <em>a</em>₁ + ∫<sub>1</sub><sup>∞</sup> <em>f</em>; numbers that increase but stay below a fixed ceiling must approach a limit, so the series converges.</li>
</ul>
<p>For <em>f</em>(<em>x</em>) = 1/<em>x</em>, the integral is ln <em>N</em>, which grows without bound, so the harmonic series diverges, and the two bounds squeeze <em>H<sub>N</sub></em> between ln(<em>N</em> + 1) and 1 + ln <em>N</em>. That's why <em>H<sub>N</sub></em> grows like ln <em>N</em>. Combined with last lesson's <em>p</em>-integrals:</p>
<p class="math">Σ 1/<em>n<sup>p</sup></em> converges if and only if <em>p</em> &gt; 1</p>
<p>So Σ 1/<em>n</em>² converges (Euler showed in 1734 that its sum is π²/6), and Σ 1/√<em>n</em> diverges.</p>

<h3>Comparison tests</h3>
<p>For series of positive terms: if <em>a<sub>n</sub></em> ≤ <em>b<sub>n</sub></em> and Σ <em>b<sub>n</sub></em> converges, so does Σ <em>a<sub>n</sub></em>; if Σ <em>a<sub>n</sub></em> diverges, so does Σ <em>b<sub>n</sub></em>. The <strong>limit comparison test</strong> is often easier: if <em>a<sub>n</sub></em>/<em>b<sub>n</sub></em> → a positive finite limit, the two series behave the same. Σ 1/(<em>n</em>² + 3<em>n</em>) behaves like Σ 1/<em>n</em>², so converges. The habit: <strong>look at the dominant terms</strong>.</p>

<h3>The ratio test</h3>
<p>Some series have both positive and negative terms. A series Σ <em>a<sub>n</sub></em> <strong>converges absolutely</strong> if the series of absolute values, Σ |<em>a<sub>n</sub></em>|, converges. Absolute convergence is the stronger kind: a series that converges absolutely always converges, because making some terms negative can only cause cancellation, never growth. (The last section shows a series that converges but not absolutely.)</p>
<p>The ratio test: if |<em>a</em><sub><em>n</em>+1</sub>/<em>a<sub>n</sub></em>| → <em>L</em>, then the series converges absolutely if <em>L</em> &lt; 1, diverges if <em>L</em> &gt; 1, and the test says nothing if <em>L</em> = 1. It compares a series with a geometric one, and is ideal for factorials and exponentials. For Σ 2<sup><em>n</em></sup>/<em>n</em>!, the ratio is 2/(<em>n</em> + 1) → 0, so it converges. For any harmonic-like series the ratio tends to 1, and the test fails, which is why you need the others.</p>

<h3>Alternating series</h3>
<p>If the terms alternate in sign, decrease in size and tend to 0, the series converges, and stopping after <em>N</em> terms gives an error smaller than the first omitted term. The alternating harmonic series 1 − 1/2 + 1/3 − 1/4 + … converges to ln 2. But it converges only <strong>conditionally</strong>: the absolute values form the harmonic series, which diverges. Strangely, rearranging the terms of a conditionally convergent series can change its sum (Riemann's rearrangement theorem). The floating-point lesson for programmers: the order in which you add numbers changes the rounded result, so libraries use careful summation algorithms such as Kahan summation and Python's <code>math.fsum</code>.</p>
`,
    terms: [
      ["Sequence", "An infinite ordered list a₁, a₂, …; converges if its terms approach a limit."],
      ["Series", "An infinite sum Σ aₙ, defined as the limit of its partial sums."],
      ["Geometric series", "Σ arⁿ; converges to a/(1 − r) when |r| < 1."],
      ["Harmonic series", "Σ 1/n; diverges, with partial sums growing like ln n."],
      ["p-series", "Σ 1/nᵖ; converges exactly when p > 1."],
      ["Ratio test", "If |aₙ₊₁/aₙ| → L < 1 the series converges; L > 1 diverges; L = 1 is inconclusive."],
      ["Absolute convergence", "Σ aₙ converges absolutely if Σ |aₙ| converges; this implies Σ aₙ converges."],
      ["Conditional convergence", "Convergence of a series whose absolute values diverge."]
    ],
    quiz: [
      { q: "What is 3 + 1 + 1/3 + 1/9 + …?", choices: ["4", "4.5", "6", "Diverges"], answer: 1, why: "Geometric with a = 3, r = 1/3: 3/(2/3) = 4.5." },
      { q: "Σ 1/<em>n</em> diverges even though:", choices: ["its terms are negative", "its terms tend to 0", "it is geometric", "its ratio is 1/2"], answer: 1, why: "Terms going to 0 is necessary but not sufficient." },
      { q: "Which converges?", choices: ["Σ 1/√n", "Σ 1/n^1.5", "Σ n/(n + 1)", "Σ 1/n"], answer: 1, why: "A p-series with p = 1.5 > 1." },
      { q: "The ratio test on Σ <em>n</em>!/10<sup><em>n</em></sup> gives:", choices: ["L = 0, converges", "L = ∞, diverges", "L = 1, inconclusive", "L = 1/10, converges"], answer: 1, why: "The ratio is (n + 1)/10 → ∞. Factorials beat exponentials." },
      { q: "A dynamic array doubles from 1 slot up to <em>n</em>. Total items copied is at most about:", choices: ["n log n", "2n", "n²", "log n"], answer: 1, why: "1 + 2 + 4 + … + n is a geometric sum less than 2n." }
    ],
    practice: [
      { q: `<p>Find the sum: Σ<sub><em>n</em>=1</sub><sup>∞</sup> 3 · (−2/5)<sup><em>n</em></sup>.</p>`, a: `<p>First term (<em>n</em> = 1): 3 · (−2/5) = −6/5; ratio −2/5. Sum = (−6/5)/(1 + 2/5) = (−6/5)/(7/5) = −6/7.</p>` },
      { q: `<p>Decide convergence: (a) Σ (<em>n</em> + 1)/(<em>n</em>³ + 2); (b) Σ 3<sup><em>n</em></sup>/(<em>n</em> · 2<sup><em>n</em></sup>); (c) Σ ln <em>n</em>/<em>n</em>.</p>`, a: `<p>(a) Behaves like Σ 1/<em>n</em>² (limit comparison): converges. (b) Terms (3/2)<sup><em>n</em></sup>/<em>n</em> → ∞: diverges by the divergence test. (c) For <em>n</em> ≥ 3, ln <em>n</em>/<em>n</em> &gt; 1/<em>n</em>, and the harmonic series diverges, so this diverges by comparison.</p>` },
      { q: `<p>Show that Σ <em>n</em>/2<sup><em>n</em></sup> converges using the ratio test. (Its sum is 2; the series appears in analyzing building a binary heap in linear time.)</p>`, a: `<p>Ratio: ((<em>n</em> + 1)/2<sup><em>n</em>+1</sup>)/(<em>n</em>/2<sup><em>n</em></sup>) = (<em>n</em> + 1)/(2<em>n</em>) → 1/2 &lt; 1. Converges.</p>` },
      { q: `<p>How many terms of 1 − 1/2 + 1/3 − 1/4 + … guarantee an error below 0.001? Is that practical?</p>`, a: `<p>The error is less than the first omitted term 1/(<em>N</em> + 1), so <em>N</em> = 1000 terms suffice. That's slow; better series for ln 2 converge geometrically, such as ln 2 = Σ 1/(<em>n</em> · 2<sup><em>n</em></sup>), where 10 terms give about 4 digits.</p>` },
      { q: `<p>Write Python to compute <em>H<sub>N</sub></em> − ln <em>N</em> for <em>N</em> = 10, 1000, 10⁶. What does it approach?</p>`, a: `<pre><code>import math
for N in (10, 1000, 10**6):
    H = math.fsum(1 / k for k in range(1, N + 1))
    print(N, H - math.log(N))
# 0.626..., 0.5777..., 0.5772161...</code></pre><p>It approaches the Euler–Mascheroni constant γ ≈ 0.5772. (Nobody knows whether γ is rational.)</p>` }
    ],
    sources: ["openstaxcalc2", "eoc"]
  }
]);

CSA.addUnits("math131", [
  {
    id: "k5",
    title: "Power series and Taylor polynomials",
    minutes: 90,
    summary: "Approximating functions by polynomials: Taylor polynomials and their error, the series for eˣ, sin, cos and ln, radius of convergence, and how computers really evaluate these functions.",
    notes: `
<p>Polynomials are the easiest functions to compute: only multiplication and addition. Your calculator doesn't know how to compute sin(0.3) directly, but it can evaluate polynomials very quickly. Taylor polynomials are the bridge: they approximate a smooth function near a point by a polynomial that matches its value and its derivatives there. Taken to infinitely many terms, they become power series, which represent functions exactly.</p>

<h3>Matching derivatives</h3>
<p>The tangent line from Calculus I is the best <em>linear</em> approximation: <em>f</em>(<em>x</em>) ≈ <em>f</em>(<em>a</em>) + <em>f</em>′(<em>a</em>)(<em>x</em> − <em>a</em>). It matches <em>f</em>'s value and slope at <em>a</em>. To do better, match the second derivative (curvature) too, then the third, and so on. The polynomial of degree <em>n</em> matching the first <em>n</em> derivatives of <em>f</em> at <em>a</em> is the <strong>Taylor polynomial</strong>:</p>
<p class="math"><em>T<sub>n</sub></em>(<em>x</em>) = <em>f</em>(<em>a</em>) + <em>f</em>′(<em>a</em>)(<em>x</em> − <em>a</em>) + <em>f</em>″(<em>a</em>)(<em>x</em> − <em>a</em>)²/2! + … + <em>f</em><sup>(<em>n</em>)</sup>(<em>a</em>)(<em>x</em> − <em>a</em>)<sup><em>n</em></sup>/<em>n</em>!</p>
<p>Why the factorials? Differentiating (<em>x</em> − <em>a</em>)<sup><em>k</em></sup> <em>k</em> times gives <em>k</em>!, so dividing by <em>k</em>! makes the <em>k</em>-th derivative of <em>T<sub>n</sub></em> at <em>a</em> come out to exactly <em>f</em><sup>(<em>k</em>)</sup>(<em>a</em>). When <em>a</em> = 0 it's also called a Maclaurin polynomial.</p>

<h3>The essential examples</h3>
<p><strong>e<sup><em>x</em></sup></strong>: every derivative is e<sup><em>x</em></sup>, which is 1 at 0. So</p>
<p class="math">e<sup><em>x</em></sup> = 1 + <em>x</em> + <em>x</em>²/2! + <em>x</em>³/3! + … = Σ <em>x<sup>n</sup></em>/<em>n</em>!</p>
<p><strong>sin <em>x</em></strong>: derivatives cycle sin, cos, −sin, −cos, with values 0, 1, 0, −1 at 0. Only odd powers survive:</p>
<p class="math">sin <em>x</em> = <em>x</em> − <em>x</em>³/3! + <em>x</em>⁵/5! − <em>x</em>⁷/7! + …     cos <em>x</em> = 1 − <em>x</em>²/2! + <em>x</em>⁴/4! − …</p>
<figure class="fig">
<svg viewBox="0 0 400 220" role="img" aria-label="Graph of sin x from about −3.6 to 3.6, with its Taylor polynomials of degree 1, 3 and 5. Each higher degree stays close to sin x over a wider interval.">
  <line x1="15" y1="110" x2="390" y2="110" class="ax"/><line x1="200" y1="210" x2="200" y2="8" class="ax"/>
  <path d="M80.0,206.0 L200.0,110.0 L320.0,14.0" class="ln dash"/>
  <path d="M50.0,50.0 L60.0,75.7 L70.0,96.8 L80.0,113.8 L90.0,127.0 L100.0,136.7 L110.0,143.1 L120.0,146.7 L130.0,147.7 L140.0,146.5 L150.0,143.3 L160.0,138.6 L170.0,132.6 L180.0,125.6 L190.0,117.9 L200.0,110.0 L210.0,102.1 L220.0,94.4 L230.0,87.4 L240.0,81.4 L250.0,76.7 L260.0,73.5 L270.0,72.3 L280.0,73.3 L290.0,76.9 L300.0,83.3 L310.0,93.0 L320.0,106.2 L330.0,123.2 L340.0,144.3 L350.0,170.0" class="hl"/>
  <path d="M20.0,144.5 L29.0,136.1 L38.0,131.9 L47.0,130.8 L56.0,132.0 L65.0,134.6 L74.0,138.0 L83.0,141.6 L92.0,144.9 L101.0,147.6 L110.0,149.4 L119.0,150.2 L128.0,149.8 L137.0,148.1 L146.0,145.3 L155.0,141.3 L164.0,136.4 L173.0,130.6 L182.0,124.1 L191.0,117.2 L200.0,110.0 L209.0,102.8 L218.0,95.9 L227.0,89.4 L236.0,83.6 L245.0,78.7 L254.0,74.7 L263.0,71.9 L272.0,70.2 L281.0,69.8 L290.0,70.6 L299.0,72.4 L308.0,75.1 L317.0,78.4 L326.0,82.0 L335.0,85.4 L344.0,88.0 L353.0,89.2 L362.0,88.1 L371.0,83.9 L380.0,75.5" class="ln"/>
  <path d="M20.0,92.3 L29.0,99.0 L38.0,106.1 L47.0,113.3 L56.0,120.3 L65.0,127.1 L74.0,133.3 L83.0,138.7 L92.0,143.3 L101.0,146.7 L110.0,149.0 L119.0,150.0 L128.0,149.7 L137.0,148.1 L146.0,145.3 L155.0,141.3 L164.0,136.4 L173.0,130.6 L182.0,124.1 L191.0,117.2 L200.0,110.0 L209.0,102.8 L218.0,95.9 L227.0,89.4 L236.0,83.6 L245.0,78.7 L254.0,74.7 L263.0,71.9 L272.0,70.3 L281.0,70.0 L290.0,71.0 L299.0,73.3 L308.0,76.7 L317.0,81.3 L326.0,86.7 L335.0,92.9 L344.0,99.7 L353.0,106.7 L362.0,113.9 L371.0,121.0 L380.0,127.7" class="cv"/>
  <text x="326" y="26" class="m">T₁ = x</text><text x="336" y="196" class="m">T₃</text><text x="356" y="76" class="m">T₅</text><text x="84" y="172">sin x</text>
</svg>
<figcaption>sin x (thick) and its Taylor polynomials of degree 1, 3 and 5 at 0, for x from about −3.6 to 3.6. Each added term extends the range where the approximation is good.</figcaption>
</figure>
<p><strong>The geometric series</strong> from last lesson, read as a function: 1/(1 − <em>x</em>) = 1 + <em>x</em> + <em>x</em>² + … for |<em>x</em>| &lt; 1. Two steps turn it into a series for <strong>ln</strong>. First replace <em>x</em> by −<em>x</em> (allowed, since |−<em>x</em>| &lt; 1 too): 1/(1 + <em>x</em>) = 1 − <em>x</em> + <em>x</em>² − <em>x</em>³ + …. Then integrate both sides from 0 to <em>x</em>, term by term. Since <em>x</em> is now the upper limit, the variable inside the integral needs a different name; call it <em>t</em> (any letter would do), so the equation being integrated is 1/(1 + <em>t</em>) = 1 − <em>t</em> + <em>t</em>² − …, with <em>t</em> running from 0 to <em>x</em>. The left side gives ln(1 + <em>x</em>) − ln 1 = ln(1 + <em>x</em>), and each <em>t<sup>k</sup></em> on the right gives <em>x</em><sup><em>k</em>+1</sup>/(<em>k</em> + 1): ln(1 + <em>x</em>) = <em>x</em> − <em>x</em>²/2 + <em>x</em>³/3 − … for −1 &lt; <em>x</em> ≤ 1. (Integrating 1/(1 − <em>x</em>) directly gives the same thing in another form, −ln(1 − <em>x</em>) = <em>x</em> + <em>x</em>²/2 + <em>x</em>³/3 + ….) (At <em>x</em> = 1 this is the alternating harmonic series, sum ln 2.)</p>

<h3>How good is the approximation?</h3>
<p><strong>Taylor's theorem</strong> bounds the error <em>R<sub>n</sub></em>(<em>x</em>) = <em>f</em>(<em>x</em>) − <em>T<sub>n</sub></em>(<em>x</em>): if |<em>f</em><sup>(<em>n</em>+1)</sup>| ≤ <em>M</em> between <em>a</em> and <em>x</em>, then</p>
<p class="math">|<em>R<sub>n</sub></em>(<em>x</em>)| ≤ <em>M</em> |<em>x</em> − <em>a</em>|<sup><em>n</em>+1</sup> / (<em>n</em> + 1)!</p>
<p>The error looks like the next term of the series. Two lessons follow: approximations are best <strong>close to <em>a</em></strong> (small |<em>x</em> − <em>a</em>|), and the factorial in the denominator eventually wins against any power, so more terms help. <strong>Example.</strong> Estimate the error of sin(0.1) ≈ <em>T</em>₃(0.1) = 0.1 − 0.1³/6. Every derivative of sin is ±sin or ±cos, so <em>M</em> = 1 works for any <em>n</em>. Taylor's theorem with <em>n</em> = 3 gives |<em>R</em>₃| ≤ 0.1⁴/4! ≈ 4.2 × 10⁻⁶. But look again at the series: the <em>x</em>⁴ term of sin is 0, so the degree-4 Taylor polynomial is the very same polynomial, <em>T</em>₄ = <em>T</em>₃. That means we may also apply the theorem with <em>n</em> = 4: |<em>R</em>₄| ≤ 0.1⁵/5! ≈ 8.3 × 10⁻⁸. Both statements are true; they bound the same error, and the second is sharper. (The actual error is about 8.3 × 10⁻⁸.) On an exam, either bound is correct if you justify it; use the sharper one when you notice that the next term of the series is zero, and say why you were allowed to "skip" it: <em>T</em>₃ and <em>T</em>₄ are equal. Physicists' "small-angle approximation" sin θ ≈ θ is <em>T</em>₁, accurate to 1% up to about 14°.</p>

<h3>Power series and radius of convergence</h3>
<p>A <strong>power series</strong> is a "polynomial of infinite degree", Σ <em>c<sub>n</sub></em>(<em>x</em> − <em>a</em>)<sup><em>n</em></sup>. Every power series has a <strong>radius of convergence</strong> <em>R</em>: it converges for |<em>x</em> − <em>a</em>| &lt; <em>R</em> and diverges for |<em>x</em> − <em>a</em>| &gt; <em>R</em>. The ratio test finds <em>R</em>. For Σ <em>x<sup>n</sup></em>/<em>n</em>!, the ratio is |<em>x</em>|/(<em>n</em> + 1) → 0 for every <em>x</em>, so <em>R</em> = ∞: the series for e<sup><em>x</em></sup>, sin and cos converge everywhere. The series for 1/(1 − <em>x</em>) and ln(1 + <em>x</em>) have <em>R</em> = 1. Inside its radius, a power series can be differentiated and integrated term by term, which is how many series are found.</p>
<p><em>A look ahead, which you don't need for this course:</em> mathematicians extend numbers with a new number <em>i</em> whose square is −1, giving the <strong>complex numbers</strong>, which you'll meet properly in later courses on linear algebra and signals. Substitute <em>x</em> = <em>iθ</em> into the series for e<sup><em>x</em></sup>. The powers of <em>i</em> repeat in a cycle of four, <em>i</em>, −1, −<em>i</em>, 1, so the terms sort themselves into two groups: the ones without <em>i</em> are exactly the series for cos θ, and the ones with <em>i</em> are <em>i</em> times the series for sin θ. The result is <strong>Euler's formula</strong>, e<sup><em>iθ</em></sup> = cos θ + <em>i</em> sin θ. It underlies signal processing, the Fourier transform and quantum computing.</p>

<h3>How computers compute sin and e<sup><em>x</em></sup></h3>
<p>Math libraries don't just sum Taylor series; they would be slow far from 0. A typical implementation of sin:</p>
<ol>
  <li><strong>Range reduction</strong>: use periodicity and symmetry to bring <em>x</em> into a small interval like [−π/4, π/4], where few terms are needed.</li>
  <li><strong>Polynomial approximation</strong>: evaluate a polynomial of about degree 13, with coefficients tuned (usually slightly different from Taylor's, to spread the error evenly over the interval) so the error is below floating-point precision.</li>
  <li><strong>Horner's method</strong>: evaluate <em>c</em>₀ + <em>x</em>(<em>c</em>₁ + <em>x</em>(<em>c</em>₂ + …)) to use one multiplication and one addition per coefficient.</li>
</ol>
<pre><code>import math

def exp_taylor(x, terms=20):
    total, term = 0.0, 1.0
    for n in range(terms):
        total += term
        term *= x / (n + 1)    # next term from the previous one
    return total

print(exp_taylor(1), math.e)   # 2.7182818284590455 2.718281828459045</code></pre>
<p>Notice the code computes each term from the previous one rather than computing <em>x<sup>n</sup></em> and <em>n</em>! separately, which would overflow for large <em>n</em>. Numerical code is full of such care.</p>
`,
    terms: [
      ["Taylor polynomial", "The degree-n polynomial matching f and its first n derivatives at a point a."],
      ["Maclaurin series", "A Taylor series centered at a = 0."],
      ["Taylor remainder", "The error f(x) − Tₙ(x), bounded by M|x − a|ⁿ⁺¹/(n + 1)!."],
      ["Power series", "A series Σ cₙ(x − a)ⁿ, a polynomial of infinite degree."],
      ["Radius of convergence", "The R such that a power series converges for |x − a| < R and diverges for |x − a| > R."],
      ["Horner's method", "Evaluating a polynomial with nested multiplication, one multiply and add per coefficient."]
    ],
    quiz: [
      { q: "The coefficient of <em>x</em>³ in the Maclaurin series of e<sup><em>x</em></sup> is:", choices: ["1/3", "1/6", "3", "1"], answer: 1, why: "1/3! = 1/6." },
      { q: "Which function's Maclaurin series has only even powers?", choices: ["sin x", "cos x", "eˣ", "ln(1 + x)"], answer: 1, why: "cos is an even function." },
      { q: "The radius of convergence of Σ <em>x<sup>n</sup></em> (the geometric series) is:", choices: ["0", "1", "e", "∞"], answer: 1, why: "It converges exactly when |x| < 1." },
      { q: "Taylor approximations are generally most accurate:", choices: ["Far from the center a", "Near the center a", "At x = 1", "Equally everywhere"], answer: 1, why: "The error grows like |x − a|ⁿ⁺¹." },
      { q: "Why do math libraries use range reduction before evaluating a polynomial for sin <em>x</em>?", choices: ["To avoid negative numbers", "So x is small, where few terms give full precision", "Because sin isn't periodic", "To use integers"], answer: 1, why: "Small |x| makes the error term tiny with a low-degree polynomial." }
    ],
    practice: [
      { q: `<p>Find the Taylor polynomial of degree 2 for √<em>x</em> at <em>a</em> = 4, and use it to estimate √4.1.</p>`, a: `<p><em>f</em>(4) = 2, <em>f</em>′ = 1/(2√<em>x</em>) → 1/4, <em>f</em>″ = −1/(4<em>x</em><sup>3/2</sup>) → −1/32. <em>T</em>₂ = 2 + (<em>x</em> − 4)/4 − (<em>x</em> − 4)²/64. At 4.1: 2 + 0.025 − 0.00015625 = 2.02484375. True value 2.0248457…: error about 2 × 10⁻⁶.</p>` },
      { q: `<p>Find the Maclaurin series of <em>x</em>e<sup>−<em>x</em>²</sup> by substituting into a known series.</p>`, a: `<p>e<sup><em>u</em></sup> = Σ <em>u<sup>n</sup></em>/<em>n</em>! with <em>u</em> = −<em>x</em>²: e<sup>−<em>x</em>²</sup> = Σ (−1)<sup><em>n</em></sup><em>x</em><sup>2<em>n</em></sup>/<em>n</em>!. Multiply by <em>x</em>: Σ (−1)<sup><em>n</em></sup><em>x</em><sup>2<em>n</em>+1</sup>/<em>n</em>! = <em>x</em> − <em>x</em>³ + <em>x</em>⁵/2 − <em>x</em>⁷/6 + …</p>` },
      { q: `<p>How many terms of the series for e<sup><em>x</em></sup> guarantee e¹ to within 10⁻¹⁰? (Use <em>M</em> = 3 as a bound for e<sup><em>x</em></sup> on [0, 1].)</p>`, a: `<p>Need 3/(<em>n</em> + 1)! &lt; 10⁻¹⁰, so (<em>n</em> + 1)! &gt; 3 × 10¹⁰. 13! ≈ 6.2 × 10⁹ is too small; 14! ≈ 8.7 × 10¹⁰ works. So <em>n</em> = 13: the terms up to <em>x</em>¹³/13!, 14 terms in all.</p>` },
      { q: `<p>Find the radius of convergence of Σ <em>n x<sup>n</sup></em>/3<sup><em>n</em></sup>.</p>`, a: `<p>Ratio: |(<em>n</em> + 1)<em>x</em><sup><em>n</em>+1</sup>/3<sup><em>n</em>+1</sup>| / |<em>n x<sup>n</sup></em>/3<sup><em>n</em></sup>| = ((<em>n</em> + 1)/<em>n</em>)|<em>x</em>|/3 → |<em>x</em>|/3. Converges for |<em>x</em>| &lt; 3, so <em>R</em> = 3.</p>` },
      { q: `<p>Write <code>sin_taylor(x, n)</code> summing the first <em>n</em> nonzero terms, and plot or print its error at <em>x</em> = 1, 3 and 10 for <em>n</em> = 5. Then add range reduction using <code>x % (2 * math.pi)</code> and compare.</p>`, a: `<pre><code>import math

def sin_taylor(x, n):
    total, term = 0.0, x
    for k in range(n):
        total += term
        term *= -x * x / ((2 * k + 2) * (2 * k + 3))
    return total

for x in (1, 3, 10):
    print(x, abs(sin_taylor(x, 5) - math.sin(x)),
          abs(sin_taylor((x + math.pi) % (2 * math.pi) - math.pi, 5) - math.sin(x)))</code></pre><p>Without reduction the error at <em>x</em> = 10 is enormous (hundreds); reducing to [−π, π] first brings it to about 10⁻³. Reducing further, to [−π/4, π/4] with identities, would give near full precision.</p>` }
    ],
    sources: ["openstaxcalc2", "eoc"]
  },
  {
    id: "k6",
    title: "Differential equations",
    minutes: 90,
    summary: "Equations that describe change: exponential growth and decay, Newton's law of cooling, the logistic model, separation of variables, slope fields, and Euler's method for solving any equation numerically.",
    notes: `
<p>Many laws of nature and models of systems don't say what a quantity <em>is</em>; they say how it <em>changes</em>. "A population grows at a rate proportional to its size." "A cup of coffee cools at a rate proportional to its temperature difference with the room." "Acceleration equals force divided by mass." Each is a <strong>differential equation</strong>: an equation involving an unknown function and its derivatives. Solving one means finding the function. This lesson introduces the simplest kinds, and a numerical method that works for nearly all of them, which you'll use in Physics to simulate motion.</p>

<h3>Exponential growth and decay</h3>
<p>The equation <em>dy</em>/<em>dt</em> = <em>ky</em> says the rate of change is proportional to the amount. Its solutions are</p>
<p class="math"><em>y</em>(<em>t</em>) = <em>y</em>₀ e<sup><em>kt</em></sup></p>
<p>Check: <em>dy</em>/<em>dt</em> = <em>ky</em>₀e<sup><em>kt</em></sup> = <em>ky</em>, and <em>y</em>(0) = <em>y</em>₀. The equation alone has a whole family of solutions, one for each <em>y</em>₀. An equation together with the solution's value at a starting time, such as <em>y</em>(0) = <em>y</em>₀, is called an <strong>initial value problem</strong>, and it picks out just one solution. If <em>k</em> &gt; 0 it's growth (unchecked populations, compound interest, the early spread of an epidemic); if <em>k</em> &lt; 0 it's decay (radioactive atoms, drug concentrations in the blood). The <strong>half-life</strong> is the time for <em>y</em> to halve: e<sup><em>kT</em></sup> = 1/2 gives <em>T</em> = ln 2/|<em>k</em>|. Carbon-14 has a half-life of about 5730 years, which is how radiocarbon dating works.</p>

<h3>Separation of variables</h3>
<p>If an equation can be written <em>dy</em>/<em>dx</em> = <em>g</em>(<em>x</em>)<em>h</em>(<em>y</em>), move all the <em>y</em>'s to one side and integrate:</p>
<p class="math">∫ <em>dy</em>/<em>h</em>(<em>y</em>) = ∫ <em>g</em>(<em>x</em>) <em>dx</em></p>
<p><strong>Why can we treat <em>dy</em>/<em>dx</em> like a fraction?</strong> We aren't really splitting it; the shorthand stands for a substitution, which is a valid step. Divide both sides of <em>dy</em>/<em>dx</em> = <em>g</em>(<em>x</em>)<em>h</em>(<em>y</em>) by <em>h</em>(<em>y</em>), then integrate both sides with respect to <em>x</em>:</p>
<p class="math">∫ (1/<em>h</em>(<em>y</em>(<em>x</em>))) · <em>y</em>′(<em>x</em>) <em>dx</em> = ∫ <em>g</em>(<em>x</em>) <em>dx</em></p>
<p>The left side has exactly the form of Lesson 1's substitution rule, a function of <em>y</em>(<em>x</em>) times <em>y</em>′(<em>x</em>), so substituting <em>u</em> = <em>y</em>(<em>x</em>), <em>du</em> = <em>y</em>′(<em>x</em>) <em>dx</em> turns it into ∫ <em>du</em>/<em>h</em>(<em>u</em>). Leibniz designed his notation so that "multiplying by <em>dx</em>" gives the same result as this careful version. One caution: dividing by <em>h</em>(<em>y</em>) assumes it isn't zero. Values where <em>h</em>(<em>y</em>) = 0 are constant solutions (below, the coffee already at room temperature, <em>T</em> = 20), which you check separately.</p>
<p><strong>Newton's law of cooling.</strong> A cup of coffee at temperature <em>T</em> in a room at 20 °C: <em>dT</em>/<em>dt</em> = −<em>k</em>(<em>T</em> − 20). Separate: ∫ <em>dT</em>/(<em>T</em> − 20) = −∫ <em>k dt</em>, so ln |<em>T</em> − 20| = −<em>kt</em> + <em>C</em>. Exponentiate: |<em>T</em> − 20| = e<sup><em>C</em></sup>e<sup>−<em>kt</em></sup>, so <em>T</em> − 20 = <em>B</em>e<sup>−<em>kt</em></sup> for some constant <em>B</em>, and <em>t</em> = 0 gives <em>B</em> = <em>T</em>₀ − 20: <em>T</em>(<em>t</em>) = 20 + (<em>T</em>₀ − 20)e<sup>−<em>kt</em></sup>. If coffee at 90 °C is 60 °C after 10 minutes, then 40 = 70e<sup>−10<em>k</em></sup>, so <em>k</em> = ln(7/4)/10 ≈ 0.056 per minute. It reaches 40 °C when 20 = 70e<sup>−<em>kt</em></sup>: <em>t</em> = ln(3.5)/<em>k</em> ≈ 22.4 minutes.</p>

<h3>The logistic model</h3>
<p>Nothing grows exponentially forever. The <strong>logistic equation</strong> slows growth as the population <em>P</em> approaches a carrying capacity <em>K</em>:</p>
<p class="math"><em>dP</em>/<em>dt</em> = <em>rP</em>(1 − <em>P</em>/<em>K</em>)</p>
<p>When <em>P</em> is small, it's nearly exponential; as <em>P</em> → <em>K</em>, growth stops. Here is the solution step by step, for a population between 0 and <em>K</em>:</p>
<ol>
  <li><strong>Rewrite.</strong> <em>rP</em>(1 − <em>P</em>/<em>K</em>) = <em>rP</em>(<em>K</em> − <em>P</em>)/<em>K</em>.</li>
  <li><strong>Separate.</strong> Put all the <em>P</em>'s on the left: <em>K dP</em>/(<em>P</em>(<em>K</em> − <em>P</em>)) = <em>r dt</em>.</li>
  <li><strong>Partial fractions</strong> (Lesson 1). Write <em>K</em>/(<em>P</em>(<em>K</em> − <em>P</em>)) = <em>A</em>/<em>P</em> + <em>B</em>/(<em>K</em> − <em>P</em>). Multiplying through: <em>K</em> = <em>A</em>(<em>K</em> − <em>P</em>) + <em>BP</em>. Setting <em>P</em> = 0 gives <em>A</em> = 1; setting <em>P</em> = <em>K</em> gives <em>B</em> = 1. So the left side is (1/<em>P</em> + 1/(<em>K</em> − <em>P</em>)) <em>dP</em>.</li>
  <li><strong>Integrate.</strong> ∫ <em>dP</em>/<em>P</em> = ln <em>P</em>, and ∫ <em>dP</em>/(<em>K</em> − <em>P</em>) = −ln(<em>K</em> − <em>P</em>) (substitute <em>u</em> = <em>K</em> − <em>P</em>, <em>du</em> = −<em>dP</em>). So ln <em>P</em> − ln(<em>K</em> − <em>P</em>) = <em>rt</em> + <em>C</em>, that is, ln(<em>P</em>/(<em>K</em> − <em>P</em>)) = <em>rt</em> + <em>C</em>.</li>
  <li><strong>Exponentiate.</strong> <em>P</em>/(<em>K</em> − <em>P</em>) = <em>D</em>e<sup><em>rt</em></sup>, where <em>D</em> = e<sup><em>C</em></sup>. At <em>t</em> = 0 this says <em>D</em> = <em>P</em>₀/(<em>K</em> − <em>P</em>₀).</li>
  <li><strong>Solve for <em>P</em>.</strong> <em>P</em> = (<em>K</em> − <em>P</em>)<em>D</em>e<sup><em>rt</em></sup>, so <em>P</em>(1 + <em>D</em>e<sup><em>rt</em></sup>) = <em>KD</em>e<sup><em>rt</em></sup> and <em>P</em> = <em>KD</em>e<sup><em>rt</em></sup>/(1 + <em>D</em>e<sup><em>rt</em></sup>). Divide the top and bottom by <em>D</em>e<sup><em>rt</em></sup>:</li>
</ol>
<p class="math"><em>P</em>(<em>t</em>) = <em>K</em> / (1 + <em>A</em>e<sup>−<em>rt</em></sup>),  <em>A</em> = 1/<em>D</em> = (<em>K</em> − <em>P</em>₀)/<em>P</em>₀</p>
<p>(The <em>A</em> here is a new constant, not the one from step 3.) Check: at <em>t</em> = 0, <em>P</em> = <em>K</em>/(1 + (<em>K</em> − <em>P</em>₀)/<em>P</em>₀) = <em>K P</em>₀/<em>K</em> = <em>P</em>₀. ✓ The result is an S-shaped curve. It models populations, the spread of a rumor or a technology, and early epidemics. The same S-shaped function, 1/(1 + e<sup>−<em>x</em></sup>), called the <strong>sigmoid</strong>, appears in machine learning, in logistic regression and early neural networks.</p>

<h3>Slope fields</h3>
<p>A first-order equation <em>dy</em>/<em>dt</em> = <em>f</em>(<em>t</em>, <em>y</em>) tells you the slope of the solution at every point of the plane. Drawing short line segments with those slopes gives a <strong>slope field</strong>; solutions are curves that follow the segments.</p>
<figure class="fig">
<svg viewBox="0 0 530 215" role="img" aria-label="Slope field of dP/dt = P(1 − P) for t from 0 to 6 and P from 0 to 1.4. Segments are flat along P = 0 and P = 1, rise between them, and fall above P = 1. One solution starting at 0.05 rises in an S shape toward 1; another starting at 1.3 falls toward 1.">
  <line x1="30" y1="190" x2="420" y2="190" class="ax"/><line x1="40" y1="200" x2="40" y2="8" class="ax"/>
  <line x1="40" y1="70" x2="420" y2="70" class="ax dash"/>
  <g class="ln"><line x1="31.4" y1="168.7" x2="48.6" y2="163.3"/><line x1="31.9" y1="145.9" x2="48.1" y2="138.1"/><line x1="31.9" y1="121.9" x2="48.1" y2="114.1"/><line x1="31.4" y1="96.7" x2="48.6" y2="91.3"/><line x1="31.0" y1="70.0" x2="49.0" y2="70.0"/><line x1="31.9" y1="42.1" x2="48.1" y2="49.9"/><line x1="34.0" y1="15.3" x2="46.0" y2="28.7"/><line x1="61.0" y1="190.0" x2="79.0" y2="190.0"/><line x1="61.4" y1="168.7" x2="78.6" y2="163.3"/><line x1="61.9" y1="145.9" x2="78.1" y2="138.1"/><line x1="61.9" y1="121.9" x2="78.1" y2="114.1"/><line x1="61.4" y1="96.7" x2="78.6" y2="91.3"/><line x1="61.0" y1="70.0" x2="79.0" y2="70.0"/><line x1="61.9" y1="42.1" x2="78.1" y2="49.9"/><line x1="64.0" y1="15.3" x2="76.0" y2="28.7"/><line x1="91.0" y1="190.0" x2="109.0" y2="190.0"/><line x1="91.4" y1="168.7" x2="108.6" y2="163.3"/><line x1="91.9" y1="145.9" x2="108.1" y2="138.1"/><line x1="91.9" y1="121.9" x2="108.1" y2="114.1"/><line x1="91.4" y1="96.7" x2="108.6" y2="91.3"/><line x1="91.0" y1="70.0" x2="109.0" y2="70.0"/><line x1="91.9" y1="42.1" x2="108.1" y2="49.9"/><line x1="94.0" y1="15.3" x2="106.0" y2="28.7"/><line x1="121.0" y1="190.0" x2="139.0" y2="190.0"/><line x1="121.4" y1="168.7" x2="138.6" y2="163.3"/><line x1="121.9" y1="145.9" x2="138.1" y2="138.1"/><line x1="121.9" y1="121.9" x2="138.1" y2="114.1"/><line x1="121.4" y1="96.7" x2="138.6" y2="91.3"/><line x1="121.0" y1="70.0" x2="139.0" y2="70.0"/><line x1="121.9" y1="42.1" x2="138.1" y2="49.9"/><line x1="124.0" y1="15.3" x2="136.0" y2="28.7"/><line x1="151.0" y1="190.0" x2="169.0" y2="190.0"/><line x1="151.4" y1="168.7" x2="168.6" y2="163.3"/><line x1="151.9" y1="145.9" x2="168.1" y2="138.1"/><line x1="151.9" y1="121.9" x2="168.1" y2="114.1"/><line x1="151.4" y1="96.7" x2="168.6" y2="91.3"/><line x1="151.0" y1="70.0" x2="169.0" y2="70.0"/><line x1="151.9" y1="42.1" x2="168.1" y2="49.9"/><line x1="154.0" y1="15.3" x2="166.0" y2="28.7"/><line x1="181.0" y1="190.0" x2="199.0" y2="190.0"/><line x1="181.4" y1="168.7" x2="198.6" y2="163.3"/><line x1="181.9" y1="145.9" x2="198.1" y2="138.1"/><line x1="181.9" y1="121.9" x2="198.1" y2="114.1"/><line x1="181.4" y1="96.7" x2="198.6" y2="91.3"/><line x1="181.0" y1="70.0" x2="199.0" y2="70.0"/><line x1="181.9" y1="42.1" x2="198.1" y2="49.9"/><line x1="184.0" y1="15.3" x2="196.0" y2="28.7"/><line x1="211.0" y1="190.0" x2="229.0" y2="190.0"/><line x1="211.4" y1="168.7" x2="228.6" y2="163.3"/><line x1="211.9" y1="145.9" x2="228.1" y2="138.1"/><line x1="211.9" y1="121.9" x2="228.1" y2="114.1"/><line x1="211.4" y1="96.7" x2="228.6" y2="91.3"/><line x1="211.0" y1="70.0" x2="229.0" y2="70.0"/><line x1="211.9" y1="42.1" x2="228.1" y2="49.9"/><line x1="214.0" y1="15.3" x2="226.0" y2="28.7"/><line x1="241.0" y1="190.0" x2="259.0" y2="190.0"/><line x1="241.4" y1="168.7" x2="258.6" y2="163.3"/><line x1="241.9" y1="145.9" x2="258.1" y2="138.1"/><line x1="241.9" y1="121.9" x2="258.1" y2="114.1"/><line x1="241.4" y1="96.7" x2="258.6" y2="91.3"/><line x1="241.0" y1="70.0" x2="259.0" y2="70.0"/><line x1="241.9" y1="42.1" x2="258.1" y2="49.9"/><line x1="244.0" y1="15.3" x2="256.0" y2="28.7"/><line x1="271.0" y1="190.0" x2="289.0" y2="190.0"/><line x1="271.4" y1="168.7" x2="288.6" y2="163.3"/><line x1="271.9" y1="145.9" x2="288.1" y2="138.1"/><line x1="271.9" y1="121.9" x2="288.1" y2="114.1"/><line x1="271.4" y1="96.7" x2="288.6" y2="91.3"/><line x1="271.0" y1="70.0" x2="289.0" y2="70.0"/><line x1="271.9" y1="42.1" x2="288.1" y2="49.9"/><line x1="274.0" y1="15.3" x2="286.0" y2="28.7"/><line x1="301.0" y1="190.0" x2="319.0" y2="190.0"/><line x1="301.4" y1="168.7" x2="318.6" y2="163.3"/><line x1="301.9" y1="145.9" x2="318.1" y2="138.1"/><line x1="301.9" y1="121.9" x2="318.1" y2="114.1"/><line x1="301.4" y1="96.7" x2="318.6" y2="91.3"/><line x1="301.0" y1="70.0" x2="319.0" y2="70.0"/><line x1="301.9" y1="42.1" x2="318.1" y2="49.9"/><line x1="304.0" y1="15.3" x2="316.0" y2="28.7"/><line x1="331.0" y1="190.0" x2="349.0" y2="190.0"/><line x1="331.4" y1="168.7" x2="348.6" y2="163.3"/><line x1="331.9" y1="145.9" x2="348.1" y2="138.1"/><line x1="331.9" y1="121.9" x2="348.1" y2="114.1"/><line x1="331.4" y1="96.7" x2="348.6" y2="91.3"/><line x1="331.0" y1="70.0" x2="349.0" y2="70.0"/><line x1="331.9" y1="42.1" x2="348.1" y2="49.9"/><line x1="334.0" y1="15.3" x2="346.0" y2="28.7"/><line x1="361.0" y1="190.0" x2="379.0" y2="190.0"/><line x1="361.4" y1="168.7" x2="378.6" y2="163.3"/><line x1="361.9" y1="145.9" x2="378.1" y2="138.1"/><line x1="361.9" y1="121.9" x2="378.1" y2="114.1"/><line x1="361.4" y1="96.7" x2="378.6" y2="91.3"/><line x1="361.0" y1="70.0" x2="379.0" y2="70.0"/><line x1="361.9" y1="42.1" x2="378.1" y2="49.9"/><line x1="364.0" y1="15.3" x2="376.0" y2="28.7"/><line x1="391.0" y1="190.0" x2="409.0" y2="190.0"/><line x1="391.4" y1="168.7" x2="408.6" y2="163.3"/><line x1="391.9" y1="145.9" x2="408.1" y2="138.1"/><line x1="391.9" y1="121.9" x2="408.1" y2="114.1"/><line x1="391.4" y1="96.7" x2="408.6" y2="91.3"/><line x1="391.0" y1="70.0" x2="409.0" y2="70.0"/><line x1="391.9" y1="42.1" x2="408.1" y2="49.9"/><line x1="394.0" y1="15.3" x2="406.0" y2="28.7"/></g>
  <path d="M40.0,184.0 L55.0,182.4 L70.0,180.4 L85.0,178.0 L100.0,175.0 L115.0,171.4 L130.0,167.1 L145.0,162.1 L160.0,156.4 L175.0,150.0 L190.0,143.1 L205.0,135.8 L220.0,128.3 L235.0,120.9 L250.0,113.7 L265.0,107.1 L280.0,101.0 L295.0,95.6 L310.0,90.9 L325.0,86.9 L340.0,83.6 L355.0,80.9 L370.0,78.6 L385.0,76.8 L400.0,75.4" class="cv"/>
  <path d="M40.0,34.0 L55.0,43.7 L70.0,50.5 L85.0,55.3 L100.0,58.9 L115.0,61.5 L130.0,63.5 L145.0,65.0 L160.0,66.1 L175.0,67.0 L190.0,67.7 L205.0,68.2 L220.0,68.6 L235.0,68.9 L250.0,69.2 L265.0,69.3 L280.0,69.5 L295.0,69.6 L310.0,69.7 L325.0,69.8 L340.0,69.8 L355.0,69.9 L370.0,69.9 L385.0,69.9 L400.0,69.9" class="cv"/>
  <text x="426" y="74" class="m">P = K: stable</text><text x="426" y="194" class="m">P = 0: unstable</text>
  <text x="14" y="74" class="m">K</text><text x="14" y="194" class="m">0</text>
  <text x="396" y="208" class="m">t = 6</text>
</svg>
<figcaption>The slope field of the logistic equation dP/dt = P(1 − P/K), with r = 1 and K = 1, and two solutions. Every segment is the slope the equation demands at that point. Solutions starting below K rise in an S shape toward K; those starting above it fall toward K.</figcaption>
</figure>
<p>From the field you can see the long-run behavior (does everything approach <em>K</em>? blow up? oscillate?) without solving anything. Equilibria are values where <em>f</em> = 0: for the logistic equation, <em>P</em> = 0 (unstable: nearby solutions move away) and <em>P</em> = <em>K</em> (stable: nearby solutions approach).</p>

<h3>Euler's method</h3>
<p>Most differential equations, including most from physics and engineering, can't be solved with formulas. Euler's method (1768) follows the slope field in small steps of size <em>h</em>:</p>
<p class="math"><em>t</em><sub><em>n</em>+1</sub> = <em>t<sub>n</sub></em> + <em>h</em>,   <em>y</em><sub><em>n</em>+1</sub> = <em>y<sub>n</sub></em> + <em>h</em> · <em>f</em>(<em>t<sub>n</sub></em>, <em>y<sub>n</sub></em>)</p>
<p>It's linear approximation, repeated: at each step, assume the slope stays constant for a short time.</p>
<figure class="fig">
<svg viewBox="0 0 320 220" role="img" aria-label="The exact solution y = eᵗ of y′ = y from t = 0 to 2, curving up to about 7.4, and Euler's method with step 0.5, a sequence of straight segments that falls further below the curve at each step, ending near 5.1.">
  <line x1="25" y1="200" x2="310" y2="200" class="ax"/><line x1="40" y1="210" x2="40" y2="10" class="ax"/>
  <path d="M40.0,178.0 L52.0,175.7 L64.0,173.1 L76.0,170.3 L88.0,167.2 L100.0,163.7 L112.0,159.9 L124.0,155.7 L136.0,151.0 L148.0,145.9 L160.0,140.2 L172.0,133.9 L184.0,127.0 L196.0,119.3 L208.0,110.8 L220.0,101.4 L232.0,91.0 L244.0,79.6 L256.0,66.9 L268.0,52.9 L280.0,37.4" class="cv"/>
  <path d="M40.0,178.0 L100.0,167.0 L160.0,150.5 L220.0,125.8 L280.0,88.6" class="hl"/>
  <circle cx="40" cy="178" r="3.5" class="dot"/><circle cx="100" cy="167" r="3.5" class="dot"/><circle cx="160" cy="150.5" r="3.5" class="dot"/><circle cx="220" cy="125.8" r="3.5" class="dot"/><circle cx="280" cy="88.6" r="3.5" class="dot"/>
  <text x="36" y="214" class="m">0</text><text x="156" y="214" class="m">1</text><text x="276" y="214" class="m">2</text>
  <text x="200" y="40">exact: y = eᵗ</text><text x="230" y="140" class="m">Euler, h = 0.5</text>
  <text x="288" y="40" class="m">7.39</text><text x="288" y="92" class="m">5.06</text>
</svg>
<figcaption>Euler's method for y′ = y, y(0) = 1, with step h = 0.5. Each step follows the slope at its starting point, so it falls behind the curving exact solution.</figcaption>
</figure>
<pre><code>def euler(f, t0, y0, h, steps):
    t, y = t0, y0
    for _ in range(steps):
        y += h * f(t, y)
        t += h
    return y

f = lambda t, y: y
for h in (0.5, 0.1, 0.01):
    print(h, euler(f, 0, 1, h, round(2 / h)))   # 5.06, 6.73, 7.32  (exact 7.389)</code></pre>
<p>The error at a fixed time is roughly proportional to <em>h</em>: Euler's method is a <strong>first-order</strong> method. Halving <em>h</em> halves the error but doubles the work. Better methods, such as the fourth-order <strong>Runge–Kutta</strong> method (error ∝ <em>h</em>⁴), sample the slope several times per step; SciPy's <code>solve_ivp</code> uses adaptive versions. Simulations in physics, climate science, epidemiology and video-game engines are all built on this idea. In <a href="#c-phys150-p3">PHYS 150</a> you'll use it to simulate a thrown ball with air resistance, which has no formula solution.</p>
<p>One caution: with too large a step, numerical solutions can be qualitatively wrong. Euler's method on <em>y</em>′ = −<em>ky</em> with <em>h</em> &gt; 2/<em>k</em> oscillates and blows up, though the true solution quietly decays. This is called <strong>instability</strong>, and choosing stable methods and step sizes is a central concern of scientific computing.</p>
`,
    terms: [
      ["Differential equation", "An equation relating an unknown function and its derivatives."],
      ["Initial value problem", "A differential equation together with the value of the solution at a starting time."],
      ["Separation of variables", "Solving dy/dx = g(x)h(y) by integrating dy/h(y) = g(x) dx."],
      ["Logistic equation", "dP/dt = rP(1 − P/K): growth that levels off at a carrying capacity K."],
      ["Equilibrium", "A constant solution, where the rate of change is zero; stable if nearby solutions approach it."],
      ["Euler's method", "Numerical solution by small steps: yₙ₊₁ = yₙ + h·f(tₙ, yₙ); error proportional to h."]
    ],
    quiz: [
      { q: "The solution of <em>dy</em>/<em>dt</em> = −0.2<em>y</em>, <em>y</em>(0) = 50 is:", choices: ["50 − 0.2t", "50e^(−0.2t)", "50e^(0.2t)", "−0.2e^(50t)"], answer: 1, why: "Exponential decay with k = −0.2." },
      { q: "A substance has half-life 10 years. What fraction remains after 30 years?", choices: ["1/3", "1/8", "1/6", "1/30"], answer: 1, why: "Three half-lives: (1/2)³." },
      { q: "For <em>dP</em>/<em>dt</em> = 0.5<em>P</em>(1 − <em>P</em>/1000), starting at <em>P</em> = 10, the long-run population is:", choices: ["0", "500", "1000", "Infinite"], answer: 2, why: "Solutions starting between 0 and K approach the stable equilibrium K = 1000." },
      { q: "One step of Euler's method for <em>y</em>′ = <em>t</em> + <em>y</em> from (0, 1) with <em>h</em> = 0.1 gives:", choices: ["1.0", "1.1", "1.2", "0.1"], answer: 1, why: "y₁ = 1 + 0.1·(0 + 1) = 1.1." },
      { q: "Halving the step size in Euler's method roughly:", choices: ["Halves the error", "Quarters the error", "Doesn't change the error", "Doubles the error"], answer: 0, why: "It's a first-order method: error ∝ h." }
    ],
    practice: [
      { q: `<p>A bacteria culture grows from 1000 to 3000 in 2 hours, exponentially. When does it reach 50,000?</p>`, a: `<p>3 = e<sup>2<em>k</em></sup>, so <em>k</em> = ln 3/2 ≈ 0.549 per hour. 50 = e<sup><em>kt</em></sup> gives <em>t</em> = ln 50/<em>k</em> = 2 ln 50/ln 3 ≈ 7.12 hours.</p>` },
      { q: `<p>Solve <em>dy</em>/<em>dx</em> = <em>xy</em>², <em>y</em>(0) = 1. Where does the solution blow up?</p>`, a: `<p>Separate: ∫ <em>y</em>⁻² <em>dy</em> = ∫ <em>x dx</em>, so −1/<em>y</em> = <em>x</em>²/2 + <em>C</em>. <em>y</em>(0) = 1 gives <em>C</em> = −1. So <em>y</em> = 1/(1 − <em>x</em>²/2) = 2/(2 − <em>x</em>²), which blows up at <em>x</em> = ±√2. A nonlinear equation can have solutions that exist only for a limited time, something no slope field drawing on a small window would warn you about.</p>` },
      { q: `<p>For the logistic equation with <em>r</em> = 0.3, <em>K</em> = 500 and <em>P</em>₀ = 50, write <em>P</em>(<em>t</em>) and find when <em>P</em> = 250.</p>`, a: `<p><em>A</em> = (500 − 50)/50 = 9, <em>P</em>(<em>t</em>) = 500/(1 + 9e<sup>−0.3<em>t</em></sup>). <em>P</em> = 250 when 9e<sup>−0.3<em>t</em></sup> = 1: <em>t</em> = ln 9/0.3 ≈ 7.32. This is the inflection point, where growth is fastest.</p>` },
      { q: `<p>Apply Euler's method by hand to <em>y</em>′ = −2<em>y</em>, <em>y</em>(0) = 1, with <em>h</em> = 0.25 and then <em>h</em> = 1.5, for a few steps. Compare with the exact solution e<sup>−2<em>t</em></sup>. What goes wrong with the larger step?</p>`, a: `<p><em>h</em> = 0.25: each step multiplies by 1 − 2(0.25) = 0.5, giving 1, 0.5, 0.25, 0.125 at <em>t</em> = 0, 0.25, 0.5, 0.75 (exact: 1, 0.61, 0.37, 0.22): too fast, but decaying. <em>h</em> = 1.5: each step multiplies by 1 − 3 = −2: 1, −2, 4, −8, oscillating and growing, while the true solution decays to 0. The step exceeds 2/<em>k</em> = 1, so the method is unstable.</p>` },
      { q: `<p>Simulate the logistic equation from the previous question with Euler's method (<em>h</em> = 0.1) up to <em>t</em> = 20, and compare <em>P</em>(20) with the formula.</p>`, a: `<pre><code>import math
r, K, P, h = 0.3, 500, 50.0, 0.1
for _ in range(200):
    P += h * r * P * (1 - P / K)
print(P, K / (1 + 9 * math.exp(-0.3 * 20)))   # about 489.3 and 489.1</code></pre>` }
    ],
    sources: ["openstaxcalc2"]
  },
  {
    id: "k7",
    title: "Functions of several variables and the gradient",
    minutes: 90,
    summary: "Functions of two or more variables, graphs and contour maps, partial derivatives, the tangent plane, the gradient vector, and directional derivatives.",
    notes: `
<p>Most quantities depend on more than one thing. The temperature in a room depends on position (<em>x</em>, <em>y</em>, <em>z</em>) and time. A machine-learning model's error depends on millions of parameters. The cost of a server cluster depends on how many machines of each type you buy. Calculus extends to these functions with surprisingly few new ideas, and the central new object, the gradient, is the engine of modern machine learning.</p>

<h3>Functions of two variables</h3>
<p>A function <em>f</em>(<em>x</em>, <em>y</em>) assigns a number to each point of (part of) the plane. Its graph <em>z</em> = <em>f</em>(<em>x</em>, <em>y</em>) is a surface in three dimensions: <em>f</em>(<em>x</em>, <em>y</em>) = <em>x</em>² + 2<em>y</em>² is a bowl, and <em>f</em>(<em>x</em>, <em>y</em>) = <em>x</em>² − <em>y</em>² is a saddle. Surfaces are hard to draw, so we usually use a <strong>contour map</strong> instead: the <strong>level curves</strong> <em>f</em>(<em>x</em>, <em>y</em>) = <em>c</em> for several values of <em>c</em>, like the contour lines on a hiking map. Closely spaced contours mean the function changes quickly; widely spaced means it's nearly flat.</p>
<figure class="fig">
<svg viewBox="0 0 340 220" role="img" aria-label="Contour map of f(x, y) = x² + 2y²: nested ellipses centered at the origin, wider than they are tall. At three points on the ellipse f = 3, gradient arrows point outward, perpendicular to the ellipse.">
  <defs><marker id="k7arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="hl"/></marker></defs>
  <line x1="40" y1="110" x2="300" y2="110" class="ax"/><line x1="170" y1="200" x2="170" y2="20" class="ax"/>
  <ellipse cx="170" cy="110" rx="31.8" ry="22.5" class="ln"/>
  <ellipse cx="170" cy="110" rx="55.1" ry="39.0" class="ln"/>
  <ellipse cx="170" cy="110" rx="77.9" ry="55.1" class="cv"/>
  <ellipse cx="170" cy="110" rx="100.6" ry="71.2" class="ln"/>
  <line x1="215" y1="65" x2="228.4" y2="38.2" class="hl" marker-end="url(#k7arr)"/>
  <line x1="125" y1="65" x2="111.6" y2="38.2" class="hl" marker-end="url(#k7arr)"/>
  <line x1="233.6" y1="141.8" x2="254.8" y2="163" class="hl" marker-end="url(#k7arr)"/>
  <circle cx="215" cy="65" r="3" class="dot"/><circle cx="125" cy="65" r="3" class="dot"/><circle cx="233.6" cy="141.8" r="3" class="dot"/>
  <text x="286" y="182" class="m">f = 5</text>
  <text x="232" y="34" class="m">∇f(1, 1) = (2, 4)</text>
</svg>
<figcaption>Level curves of f(x, y) = x² + 2y² for f = 0.5, 1.5, 3 and 5. The gradient at each marked point on the curve f = 3 points straight uphill, perpendicular to the level curve.</figcaption>
</figure>
<p><strong>Drawing a contour map by hand.</strong> Take <em>f</em>(<em>x</em>, <em>y</em>) = <em>x</em>² + 2<em>y</em>², the function in the figure.</p>
<ol>
  <li><strong>Choose a few levels</strong> <em>c</em> that the function actually reaches, spread over the region you care about. Here <em>f</em> ≥ 0, so take <em>c</em> = 0.5, 1.5, 3 and 5.</li>
  <li><strong>For each level, write the equation <em>f</em>(<em>x</em>, <em>y</em>) = <em>c</em> and recognize or plot the curve.</strong> For <em>c</em> = 3: <em>x</em>² + 2<em>y</em>² = 3. Easy points first: setting <em>y</em> = 0 gives <em>x</em> = ±√3 ≈ ±1.73; setting <em>x</em> = 0 gives <em>y</em> = ±√1.5 ≈ ±1.22. One more point, (1, 1): 1 + 2 = 3, so it's on the curve too, and by symmetry so are (±1, ±1). Joining these points smoothly gives an ellipse, wider than it is tall.</li>
  <li><strong>Repeat for the other levels.</strong> The same steps give ellipses of the same shape, with intercepts ±√<em>c</em> on the <em>x</em>-axis and ±√(<em>c</em>/2) on the <em>y</em>-axis.</li>
  <li><strong>Label each curve with its value <em>c</em></strong>, and read the picture. At the same distance from the center, <em>f</em> is twice as large along the <em>y</em>-axis (2<em>y</em>²) as along the <em>x</em>-axis (<em>x</em>²), so each level is reached sooner going up than going sideways: that's why the ellipses are squashed vertically. If you choose equally spaced levels, places where the curves crowd together are where <em>f</em> changes fastest.</li>
</ol>
<p>When the equation is hard to recognize, solve it for <em>y</em> in terms of <em>x</em> (as in the practice problem on <em>y</em> − <em>x</em>²) or make a small table of points. Computers draw contour maps the same way, on a fine grid.</p>

<h3>Partial derivatives</h3>
<p>The <strong>partial derivative</strong> ∂<em>f</em>/∂<em>x</em> is the rate of change of <em>f</em> as <em>x</em> changes with <em>y</em> held fixed. Compute it by treating <em>y</em> as a constant and differentiating as usual:</p>
<p class="math"><em>f</em>(<em>x</em>, <em>y</em>) = <em>x</em>²<em>y</em> + sin(<em>xy</em>):   ∂<em>f</em>/∂<em>x</em> = 2<em>xy</em> + <em>y</em> cos(<em>xy</em>),   ∂<em>f</em>/∂<em>y</em> = <em>x</em>² + <em>x</em> cos(<em>xy</em>)</p>
<p>Geometrically, ∂<em>f</em>/∂<em>x</em> is the slope of the surface in the <em>x</em>-direction: slice the surface with the plane <em>y</em> = constant and take the slope of the resulting curve. Other notations: <em>f<sub>x</sub></em>, <em>f<sub>y</sub></em>. Second partial derivatives work the same way: <em>f<sub>xx</sub></em>, <em>f<sub>yy</sub></em>, and the mixed <em>f<sub>xy</sub></em>, which equals <em>f<sub>yx</sub></em> for all the functions you'll meet (Clairaut's theorem).</p>
<p>Numerically, with the central difference from <a href="#c-math130-u3">MATH 130's lesson on the derivative</a>: ∂<em>f</em>/∂<em>x</em> ≈ (<em>f</em>(<em>x</em> + <em>h</em>, <em>y</em>) − <em>f</em>(<em>x</em> − <em>h</em>, <em>y</em>))/(2<em>h</em>).</p>

<h3>Linear approximation and the tangent plane</h3>
<p>Near a point (<em>a</em>, <em>b</em>), a smooth function is approximately linear:</p>
<p class="math"><em>f</em>(<em>x</em>, <em>y</em>) ≈ <em>f</em>(<em>a</em>, <em>b</em>) + <em>f<sub>x</sub></em>(<em>a</em>, <em>b</em>)(<em>x</em> − <em>a</em>) + <em>f<sub>y</sub></em>(<em>a</em>, <em>b</em>)(<em>y</em> − <em>b</em>)</p>
<p>The right side's graph is the <strong>tangent plane</strong>. Each small change contributes its own slope times its own size, and the contributions add. For example, the volume of a cylinder <em>V</em> = π<em>r</em>²<em>h</em> with <em>r</em> = 3, <em>h</em> = 10: <em>V<sub>r</sub></em> = 2π<em>rh</em> = 60π, <em>V<sub>h</sub></em> = π<em>r</em>² = 9π. Errors of 0.1 in each measurement change the volume by about 60π(0.1) + 9π(0.1) = 6.9π ≈ 21.7, out of 90π ≈ 283. Note the radius error matters almost seven times as much as the height error; partial derivatives tell you which measurements to improve.</p>

<h3>A primer: vectors, unit vectors and the dot product</h3>
<p>The rest of this lesson needs a few facts about vectors. Here is everything you need, from scratch. (<a href="#c-phys150-p2">PHYS 150, Lesson 2</a> and next year's Linear Algebra go further.)</p>
<p><strong>Vectors.</strong> A <strong>vector</strong> in the plane is an ordered pair of numbers, <strong>v</strong> = (<em>v</em>₁, <em>v</em>₂), called its <strong>components</strong>. Picture it as an arrow from the origin to the point (<em>v</em>₁, <em>v</em>₂), or as a step: "3 units in the <em>x</em>-direction and 1 in the <em>y</em>-direction". A vector has a direction and a size; where you draw it doesn't matter. Vectors are written in bold (<strong>v</strong>; by hand, put an arrow over the letter), and ordinary numbers are called <strong>scalars</strong> to tell them apart. The plain letters <em>v</em>₁ and <em>v</em>₂ are scalars: the components of <strong>v</strong>. The length of <strong>v</strong>, defined below, is also a scalar, written |<strong>v</strong>|. (Physics, including <a href="#c-phys150-p2">PHYS 150</a>, often shortens |<strong>v</strong>| to a plain <em>v</em> with no subscript, and names the components <em>v<sub>x</sub></em>, <em>v<sub>y</sub></em>. In both courses, a letter with a subscript is a component.)</p>
<ul>
  <li><strong>Adding</strong> works component by component: (3, 1) + (1, 2) = (4, 3). Geometrically, take one step and then the other.</li>
  <li><strong>Multiplying by a scalar</strong> scales each component: 2(3, 1) = (6, 2), twice as long in the same direction; a negative scalar reverses the direction.</li>
  <li>The <strong>length</strong> (or magnitude) of <strong>v</strong> is |<strong>v</strong>| = √(<em>v</em>₁² + <em>v</em>₂²), by Pythagoras: the components are the two shorter sides of a right triangle. For example |(3, 4)| = √(9 + 16) = 5.</li>
</ul>
<p><strong>Unit vectors.</strong> A <strong>unit vector</strong> is a vector of length 1. Its only job is to record a <em>direction</em>. To get the unit vector pointing the same way as any nonzero vector, divide by its length: (3, 4)/5 = (0.6, 0.8), and indeed 0.6² + 0.8² = 0.36 + 0.64 = 1. The unit vector at angle θ from the positive <em>x</em>-axis is (cos θ, sin θ); the unit vectors along the axes are (1, 0) and (0, 1). We write unit vectors as <strong>u</strong>.</p>
<p><strong>The dot product.</strong> The <strong>dot product</strong> of two vectors is a single number, not a vector:</p>
<p class="math"><strong>a</strong> · <strong>b</strong> = <em>a</em>₁<em>b</em>₁ + <em>a</em>₂<em>b</em>₂</p>
<p>For example (3, 1) · (1, 2) = 3 · 1 + 1 · 2 = 5. Its meaning is geometric:</p>
<p class="math"><strong>a</strong> · <strong>b</strong> = |<strong>a</strong>| |<strong>b</strong>| cos θ,  where θ is the angle between the two arrows</p>
<figure class="fig">
<svg viewBox="0 0 320 200" role="img" aria-label="Two arrows from the same starting point: a = (3, 1), drawn with its components 3 and 1 as dashed lines, and b = (1, 2). The angle between them, theta, is 45 degrees.">
  <defs><marker id="k7vec" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="hl"/></marker></defs>
  <line x1="50" y1="170" x2="185" y2="170" class="ln dash"/><line x1="185" y1="170" x2="185" y2="125" class="ln dash"/>
  <line x1="50" y1="170" x2="185" y2="125" class="hl" marker-end="url(#k7vec)"/>
  <line x1="50" y1="170" x2="95" y2="80" class="hl" marker-end="url(#k7vec)"/>
  <path d="M78.5,160.5 A30,30 0 0 0 63.4,143.2" class="ln"/>
  <circle cx="50" cy="170" r="3" class="dot"/>
  <text x="84" y="145">θ</text>
  <text x="192" y="122" class="code">a = (3, 1)</text><text x="102" y="78" class="code">b = (1, 2)</text>
  <text x="114" y="187" class="m">3</text><text x="191" y="152" class="m">1</text>
</svg>
<figcaption>a · b = 3·1 + 1·2 = 5, and |a| |b| = √10 · √5 = √50 ≈ 7.07, so cos θ = 5/√50 ≈ 0.707 and θ = 45°.</figcaption>
</figure>
<p><em>Why the two formulas agree.</em> The arrows <strong>a</strong>, <strong>b</strong> and the segment joining their tips form a triangle; that third side is the vector <strong>a</strong> − <strong>b</strong>. The law of cosines from trigonometry (Pythagoras for any triangle) says |<strong>a</strong> − <strong>b</strong>|² = |<strong>a</strong>|² + |<strong>b</strong>|² − 2|<strong>a</strong>||<strong>b</strong>| cos θ. Computing the same length from components instead: |<strong>a</strong> − <strong>b</strong>|² = (<em>a</em>₁ − <em>b</em>₁)² + (<em>a</em>₂ − <em>b</em>₂)² = |<strong>a</strong>|² + |<strong>b</strong>|² − 2(<em>a</em>₁<em>b</em>₁ + <em>a</em>₂<em>b</em>₂). Comparing the two lines, <em>a</em>₁<em>b</em>₁ + <em>a</em>₂<em>b</em>₂ = |<strong>a</strong>||<strong>b</strong>| cos θ.</p>
<p>Three consequences you'll use immediately:</p>
<ul>
  <li><strong>Perpendicular vectors have dot product 0</strong>, since cos 90° = 0. For example (2, 4) · (2, −1) = 4 − 4 = 0.</li>
  <li>If <strong>u</strong> is a unit vector, <strong>b</strong> · <strong>u</strong> = |<strong>b</strong>| cos θ: how far <strong>b</strong> reaches in the direction <strong>u</strong>. It's largest, equal to |<strong>b</strong>|, when <strong>u</strong> points the same way as <strong>b</strong>; it's −|<strong>b</strong>| when <strong>u</strong> points the opposite way.</li>
  <li>Everything works the same with three or a million components: add more terms to the sums.</li>
</ul>
<p>In Python, with vectors stored as tuples, the dot product is a short function, and the length uses it, since <strong>v</strong> · <strong>v</strong> = |<strong>v</strong>|²:</p>
<pre><code>import math

def dot(a, b):
    return sum(x * y for x, y in zip(a, b))   # zip pairs up matching components

def length(v):
    return math.sqrt(dot(v, v))

print(dot((1, 2), (3, 4)))   # 11
print(length((3, 4)))        # 5.0</code></pre>

<h3>The gradient</h3>
<p>Collect the partial derivatives into a vector, the <strong>gradient</strong>:</p>
<p class="math">∇<em>f</em> = (∂<em>f</em>/∂<em>x</em>, ∂<em>f</em>/∂<em>y</em>)</p>
<p>For <em>f</em> = <em>x</em>² + 2<em>y</em>², ∇<em>f</em> = (2<em>x</em>, 4<em>y</em>); at (1, 1) it's (2, 4). The gradient is a vector at each point, and it has three key properties:</p>
<ol>
  <li><strong>It points in the direction of steepest increase</strong> of <em>f</em>.</li>
  <li><strong>Its length is the rate of increase</strong> in that direction.</li>
  <li><strong>It is perpendicular to the level curve</strong> through the point (as in the figure): moving along a level curve doesn't change <em>f</em>, so it's the direction of zero change.</li>
</ol>

<h3>Directional derivatives</h3>
<p>How fast does <em>f</em> change if you move in the direction of a unit vector <strong>u</strong> = (<em>u</em>₁, <em>u</em>₂)? Moving a distance <em>t</em> from (<em>a</em>, <em>b</em>) in that direction takes you to (<em>a</em> + <em>tu</em>₁, <em>b</em> + <em>tu</em>₂). (This is why <strong>u</strong> must be a <em>unit</em> vector: then <em>t</em> really is the distance moved, and the rate is "per unit of distance".) So <em>x</em> changes by <em>tu</em>₁ and <em>y</em> by <em>tu</em>₂, and by the linear approximation <em>f</em> changes by about <em>f<sub>x</sub></em> · <em>tu</em>₁ + <em>f<sub>y</sub></em> · <em>tu</em>₂. Dividing by the distance <em>t</em> gives the rate of change, <em>f<sub>x</sub>u</em>₁ + <em>f<sub>y</sub>u</em>₂, which is exactly the dot product of (<em>f<sub>x</sub></em>, <em>f<sub>y</sub></em>) with <strong>u</strong>. So the <strong>directional derivative</strong> is</p>
<p class="math"><em>D</em><sub><strong>u</strong></sub><em>f</em> = ∇<em>f</em> · <strong>u</strong> = |∇<em>f</em>| cos θ</p>
<p>where θ is the angle between ∇<em>f</em> and <strong>u</strong>. This proves the properties above: the rate is largest when θ = 0 (moving along the gradient), equal to −|∇<em>f</em>| when θ = π (moving against it), and zero when θ = π/2 (along the level curve).</p>
<p><strong>Example.</strong> At (1, 1) on <em>f</em> = <em>x</em>² + 2<em>y</em>², moving in the direction <strong>u</strong> = (1, 0) gives <em>D</em> = 2; in the direction (0, 1), 4; in the gradient direction (2, 4)/√20, the maximum rate √20 ≈ 4.47; and in the direction (2, −1)/√5, perpendicular to the gradient, 0.</p>
<p>Everything extends to any number of variables: a function of a million parameters has a gradient with a million components, still pointing uphill. The next lesson uses that to find minimums.</p>
`,
    terms: [
      ["Level curve", "A curve f(x, y) = c along which a function is constant; a contour map shows several."],
      ["Partial derivative", "The rate of change of f with respect to one variable, the others held fixed."],
      ["Tangent plane", "The graph of the linear approximation of f(x, y) near a point."],
      ["Vector", "An ordered pair (or list) of numbers, its components, pictured as an arrow with a direction and a length √(v₁² + v₂²)."],
      ["Unit vector", "A vector of length 1, used to specify a direction; v/|v| is the unit vector in the direction of v."],
      ["Dot product", "a · b = a₁b₁ + a₂b₂ = |a||b| cos θ; zero exactly when nonzero vectors are perpendicular."],
      ["Gradient ∇f", "The vector of partial derivatives; points in the direction of steepest increase, perpendicular to level curves."],
      ["Directional derivative", "The rate of change of f in the direction of a unit vector u: ∇f · u."]
    ],
    quiz: [
      { q: "For <em>f</em>(<em>x</em>, <em>y</em>) = 3<em>x</em>²<em>y</em> + <em>y</em>³, ∂<em>f</em>/∂<em>x</em> is:", choices: ["6xy + 3y²", "6xy", "3x² + 3y²", "6x"], answer: 1, why: "Treat y as a constant: the derivative of y³ with respect to x is 0." },
      { q: "On a contour map, closely spaced level curves mean:", choices: ["The function is nearly constant", "The function changes rapidly there", "The gradient is zero", "There's a minimum"], answer: 1, why: "A small move crosses many levels." },
      { q: "The gradient of <em>f</em> at a point is:", choices: ["Tangent to the level curve", "Perpendicular to the level curve", "Always zero", "Always (1, 1)"], answer: 1, why: "f doesn't change along the level curve, so the steepest direction is perpendicular to it." },
      { q: "If ∇<em>f</em> = (3, 4) at a point, the maximum rate of increase there is:", choices: ["3", "4", "5", "7"], answer: 2, why: "|∇f| = √(9 + 16) = 5." },
      { q: "In the direction <strong>u</strong> = (0.6, 0.8), with ∇<em>f</em> = (3, 4), the directional derivative is:", choices: ["5", "4.8", "0", "1.4"], answer: 0, why: "3(0.6) + 4(0.8) = 5: u points along the gradient." }
    ],
    practice: [
      { q: `<p>Find all first and second partial derivatives of <em>f</em>(<em>x</em>, <em>y</em>) = e<sup><em>x</em></sup> sin <em>y</em> + <em>x</em>³<em>y</em>², and check that <em>f<sub>xy</sub></em> = <em>f<sub>yx</sub></em>.</p>`, a: `<p><em>f<sub>x</sub></em> = e<sup><em>x</em></sup> sin <em>y</em> + 3<em>x</em>²<em>y</em>², <em>f<sub>y</sub></em> = e<sup><em>x</em></sup> cos <em>y</em> + 2<em>x</em>³<em>y</em>. <em>f<sub>xx</sub></em> = e<sup><em>x</em></sup> sin <em>y</em> + 6<em>xy</em>², <em>f<sub>yy</sub></em> = −e<sup><em>x</em></sup> sin <em>y</em> + 2<em>x</em>³, <em>f<sub>xy</sub></em> = e<sup><em>x</em></sup> cos <em>y</em> + 6<em>x</em>²<em>y</em> = <em>f<sub>yx</sub></em>.</p>` },
      { q: `<p>Let <strong>a</strong> = (1, −2) and <strong>b</strong> = (4, 2). Find |<strong>a</strong>|, the unit vector in the direction of <strong>a</strong>, and <strong>a</strong> · <strong>b</strong>. What is the angle between <strong>a</strong> and <strong>b</strong>?</p>`, a: `<p>|<strong>a</strong>| = √(1 + 4) = √5 ≈ 2.236. Unit vector: (1, −2)/√5 ≈ (0.447, −0.894); check 0.2 + 0.8 = 1. <strong>a</strong> · <strong>b</strong> = 1 · 4 + (−2) · 2 = 0, so cos θ = 0 and the vectors are perpendicular: θ = 90°.</p>` },
      { q: `<p>Sketch the level curves of <em>f</em>(<em>x</em>, <em>y</em>) = <em>y</em> − <em>x</em>² for <em>c</em> = −1, 0, 1, 2. What do they look like?</p>`, a: `<p><em>y</em> = <em>x</em>² + <em>c</em>: parabolas, each shifted up by 1 from the last, all the same shape. The gradient (−2<em>x</em>, 1) always has a positive <em>y</em>-component, so <em>f</em> increases as you move up.</p>` },
      { q: `<p>The temperature on a metal plate is <em>T</em>(<em>x</em>, <em>y</em>) = 100 − <em>x</em>² − 3<em>y</em>². An ant at (2, 1) wants to cool off as fast as possible. In which direction should it move, and how fast does the temperature drop initially (per unit distance)?</p>`, a: `<p>∇<em>T</em> = (−2<em>x</em>, −6<em>y</em>) = (−4, −6) at (2, 1). To cool fastest, move opposite the gradient: direction (4, 6), or the unit vector (2, 3)/√13. The rate of decrease is |∇<em>T</em>| = √52 ≈ 7.2 degrees per unit.</p>` },
      { q: `<p>Use linear approximation to estimate √(3.02² + 3.97²), starting from (3, 4).</p>`, a: `<p><em>f</em> = √(<em>x</em>² + <em>y</em>²), <em>f</em>(3, 4) = 5, <em>f<sub>x</sub></em> = <em>x</em>/<em>f</em> = 0.6, <em>f<sub>y</sub></em> = 0.8. Estimate: 5 + 0.6(0.02) + 0.8(−0.03) = 5 + 0.012 − 0.024 = 4.988. True value 4.98812…</p>` },
      { q: `<p>Write a Python function <code>grad(f, x, y, h=1e-6)</code> that estimates the gradient with central differences, and test it on <em>f</em> = <em>x</em>² + 2<em>y</em>² at (1, 1).</p>`, a: `<pre><code>def grad(f, x, y, h=1e-6):
    return ((f(x + h, y) - f(x - h, y)) / (2 * h),
            (f(x, y + h) - f(x, y - h)) / (2 * h))

print(grad(lambda x, y: x**2 + 2 * y**2, 1, 1))   # about (2.0, 4.0)</code></pre><p>This needs two function evaluations per variable. For a model with a million parameters that's two million evaluations per gradient, which is why machine learning uses <em>automatic differentiation</em> instead (see the optional lesson).</p>` }
    ],
    sources: ["openstaxcalc3", "eoc"]
  },
  {
    id: "k8",
    title: "Optimization and gradient descent",
    minutes: 90,
    summary: "Finding minima and maxima of functions of several variables, the second derivative test, least-squares fitting, and gradient descent and the learning rate.",
    notes: `
<p>Optimization, finding the best choice among many, is everywhere in computing: fitting a line to data, routing deliveries, allocating servers, and, above all, training machine-learning models, which means adjusting millions of parameters to minimize an error. This lesson extends Calculus I's optimization to several variables, and introduces the algorithm that trains nearly every neural network. <a href="#c-math131-k9">The next lesson</a> adds constraints to optimization and extends integration to regions of the plane.</p>

<h3>Critical points</h3>
<p>At a local minimum or maximum of a smooth function, the surface is flat in every direction, so every partial derivative is zero: <strong>∇<em>f</em> = 0</strong>. Points where this happens are <strong>critical points</strong>. For <em>f</em>(<em>x</em>, <em>y</em>) = <em>x</em>² + <em>y</em>² − 4<em>x</em> + 6<em>y</em>: <em>f<sub>x</sub></em> = 2<em>x</em> − 4 = 0 and <em>f<sub>y</sub></em> = 2<em>y</em> + 6 = 0, so (2, −3) is the only critical point. Completing the square, <em>f</em> = (<em>x</em> − 2)² + (<em>y</em> + 3)² − 13, so it's a minimum with value −13.</p>
<p>In two variables a new possibility appears: a <strong>saddle point</strong>, like the center of <em>f</em> = <em>x</em>² − <em>y</em>², which is a minimum along the <em>x</em>-direction and a maximum along the <em>y</em>-direction. The <strong>second derivative test</strong> distinguishes the cases. At a critical point, compute <em>D</em> = <em>f<sub>xx</sub>f<sub>yy</sub></em> − (<em>f<sub>xy</sub></em>)²:</p>
<ul>
  <li><em>D</em> &gt; 0 and <em>f<sub>xx</sub></em> &gt; 0: local minimum.</li>
  <li><em>D</em> &gt; 0 and <em>f<sub>xx</sub></em> &lt; 0: local maximum.</li>
  <li><em>D</em> &lt; 0: saddle point.</li>
  <li><em>D</em> = 0: the test says nothing.</li>
</ul>
<p><strong>Where <em>D</em> comes from.</strong> Near a critical point the gradient is zero, so the linear part of the approximation vanishes and the second derivatives decide the shape. Lesson 5's Taylor polynomials were for one variable, but we can reduce to that case by walking along a straight line. Fix a small step (<em>p</em>, <em>q</em>) and look at <em>f</em> along the line through the critical point (<em>a</em>, <em>b</em>) in that direction: <em>g</em>(<em>t</em>) = <em>f</em>(<em>a</em> + <em>tp</em>, <em>b</em> + <em>tq</em>). This is an ordinary function of one variable, so its degree-2 Taylor polynomial at 0 gives <em>g</em>(1) ≈ <em>g</em>(0) + <em>g</em>′(0) + ½<em>g</em>″(0).</p>
<ul>
  <li><strong>First derivative.</strong> When <em>t</em> grows by a small Δ<em>t</em>, the point moves by (<em>p</em> Δ<em>t</em>, <em>q</em> Δ<em>t</em>), and Lesson 7's tangent plane gives Δ<em>g</em> ≈ <em>f<sub>x</sub> p</em> Δ<em>t</em> + <em>f<sub>y</sub> q</em> Δ<em>t</em>, with the partials taken at the current point. Divide by Δ<em>t</em>: Δ<em>g</em>/Δ<em>t</em> ≈ <em>f<sub>x</sub> p</em> + <em>f<sub>y</sub> q</em>. The approximation's error shrinks faster than Δ<em>t</em> for smooth <em>f</em> (just as <em>f</em>(<em>x</em> + <em>h</em>) ≈ <em>f</em>(<em>x</em>) + <em>f</em>′(<em>x</em>)<em>h</em> does in one variable), so in the limit Δ<em>t</em> → 0 it disappears and the derivative is exact: <em>g</em>′(<em>t</em>) = <em>f<sub>x</sub> p</em> + <em>f<sub>y</sub> q</em>, evaluated at the moving point (<em>a</em> + <em>tp</em>, <em>b</em> + <em>tq</em>). This is the <em>chain rule</em> for a function of two variables along a path. At a critical point both partials are 0, so <em>g</em>′(0) = 0.</li>
  <li><strong>Second derivative.</strong> <em>p</em> and <em>q</em> are constants, so differentiating <em>g</em>′ means differentiating <em>f<sub>x</sub></em> and <em>f<sub>y</sub></em> along the same moving point. Each is itself a function of two variables, so the rule just found applies to it: the derivative of <em>f<sub>x</sub></em> along the line is <em>f<sub>xx</sub> p</em> + <em>f<sub>xy</sub> q</em>, and that of <em>f<sub>y</sub></em> is <em>f<sub>yx</sub> p</em> + <em>f<sub>yy</sub> q</em>. Multiply by the constants <em>p</em> and <em>q</em> and add: <em>g</em>″ = (<em>f<sub>xx</sub> p</em> + <em>f<sub>xy</sub> q</em>)<em>p</em> + (<em>f<sub>yx</sub> p</em> + <em>f<sub>yy</sub> q</em>)<em>q</em> = <em>f<sub>xx</sub> p</em>² + 2<em>f<sub>xy</sub> pq</em> + <em>f<sub>yy</sub> q</em>², using <em>f<sub>xy</sub></em> = <em>f<sub>yx</sub></em> (true for the smooth functions in this course). Check on <em>f</em> = <em>x</em>² − <em>y</em>² at (0, 0): <em>g</em>(<em>t</em>) = <em>t</em>²(<em>p</em>² − <em>q</em>²), so <em>g</em>″ = 2<em>p</em>² − 2<em>q</em>², and the formula gives 2<em>p</em>² + 0 − 2<em>q</em>².</li>
</ul>
<p>So a small step (<em>p</em>, <em>q</em>) away from the critical point changes <em>f</em> by about <em>g</em>(1) − <em>g</em>(0) ≈ ½<em>g</em>″(0), that is</p>
<p class="math">½ ( <em>A p</em>² + 2<em>B pq</em> + <em>C q</em>² ),   where <em>A</em> = <em>f<sub>xx</sub></em>, <em>B</em> = <em>f<sub>xy</sub></em>, <em>C</em> = <em>f<sub>yy</sub></em></p>
<p>with the second derivatives taken at the critical point. This is the two-variable degree-2 Taylor polynomial (with the linear part gone). If the derivation feels quick, the formula is what matters for the test.</p>
<p>Is this change positive in every direction (a minimum), negative in every direction (a maximum), or mixed (a saddle)? Complete the square, assuming <em>A</em> ≠ 0:</p>
<p class="math"><em>A p</em>² + 2<em>B pq</em> + <em>C q</em>² = <em>A</em> (<em>p</em> + (<em>B</em>/<em>A</em>)<em>q</em>)² + ((<em>AC</em> − <em>B</em>²)/<em>A</em>) <em>q</em>²</p>
<p>(Multiply out the right side to check.) Both squares are never negative, so everything depends on the two coefficients, <em>A</em> and (<em>AC</em> − <em>B</em>²)/<em>A</em> = <em>D</em>/<em>A</em>. If <em>D</em> &gt; 0 and <em>A</em> &gt; 0, both are positive, so every step increases <em>f</em>: a minimum. If <em>D</em> &gt; 0 and <em>A</em> &lt; 0, both are negative: a maximum. If <em>D</em> &lt; 0, the two coefficients have opposite signs, so some steps increase <em>f</em> and others decrease it: a saddle. That is the whole test; <em>D</em> is exactly the quantity that decides whether the two coefficients agree in sign.</p>
<p>For <em>x</em>² − <em>y</em>²: <em>f<sub>xx</sub></em> = 2, <em>f<sub>yy</sub></em> = −2, <em>f<sub>xy</sub></em> = 0, so <em>D</em> = −4 &lt; 0: a saddle. In high dimensions, saddle points vastly outnumber minima, which is one reason training large neural networks is subtle.</p>

<h3>Least squares: fitting a line</h3>
<p>Given data points (<em>x<sub>i</sub></em>, <em>y<sub>i</sub></em>), which line <em>y</em> = <em>mx</em> + <em>b</em> fits best? The standard answer minimizes the sum of squared vertical errors:</p>
<p class="math"><em>E</em>(<em>m</em>, <em>b</em>) = Σ (<em>y<sub>i</sub></em> − (<em>mx<sub>i</sub></em> + <em>b</em>))²</p>
<p>This is a function of the two unknowns <em>m</em> and <em>b</em>; the data <em>x<sub>i</sub></em>, <em>y<sub>i</sub></em> are fixed numbers. At the minimum both partial derivatives are zero. Differentiate each squared term with the chain rule: the derivative of (<em>y<sub>i</sub></em> − <em>mx<sub>i</sub></em> − <em>b</em>)² is 2(<em>y<sub>i</sub></em> − <em>mx<sub>i</sub></em> − <em>b</em>) times the derivative of the inside, which is −<em>x<sub>i</sub></em> with respect to <em>m</em> and −1 with respect to <em>b</em>:</p>
<p class="math">∂<em>E</em>/∂<em>m</em> = Σ −2<em>x<sub>i</sub></em>(<em>y<sub>i</sub></em> − <em>mx<sub>i</sub></em> − <em>b</em>) = 0,     ∂<em>E</em>/∂<em>b</em> = Σ −2(<em>y<sub>i</sub></em> − <em>mx<sub>i</sub></em> − <em>b</em>) = 0</p>
<p>Divide each by −2 and split the sums. The first becomes Σ<em>x<sub>i</sub>y<sub>i</sub></em> − <em>m</em> Σ<em>x<sub>i</sub></em>² − <em>b</em> Σ<em>x<sub>i</sub></em> = 0. In the second, <em>b</em> is added once for each of the <em>n</em> points, so Σ <em>b</em> = <em>bn</em>, and it becomes Σ<em>y<sub>i</sub></em> − <em>m</em> Σ<em>x<sub>i</sub></em> − <em>bn</em> = 0. Moving terms across gives two linear equations in <em>m</em> and <em>b</em>, the <strong>normal equations</strong>:</p>
<p class="math"><em>m</em> Σ<em>x<sub>i</sub></em>² + <em>b</em> Σ<em>x<sub>i</sub></em> = Σ<em>x<sub>i</sub>y<sub>i</sub></em>,     <em>m</em> Σ<em>x<sub>i</sub></em> + <em>bn</em> = Σ<em>y<sub>i</sub></em></p>
<p>For the points (0, 1), (1, 3), (2, 4), (3, 6): Σ<em>x</em> = 6, Σ<em>y</em> = 14, Σ<em>x</em>² = 14, Σ<em>xy</em> = 29, <em>n</em> = 4. Solving 14<em>m</em> + 6<em>b</em> = 29 and 6<em>m</em> + 4<em>b</em> = 14 gives <em>m</em> = 1.6, <em>b</em> = 1.1. This method, <strong>linear regression</strong>, published by Legendre in 1805 and Gauss in 1809, is still the first model data scientists try. Linear algebra (next year) generalizes it to any number of variables.</p>

<h3>Gradient descent</h3>
<p>Setting ∇<em>f</em> = 0 and solving works when the equations are simple. For a neural network with millions of parameters and a complicated error function, it's hopeless. Instead, start somewhere and walk downhill. The gradient points uphill, so step the other way:</p>
<p class="math"><strong>x</strong><sub><em>k</em>+1</sub> = <strong>x</strong><sub><em>k</em></sub> − α ∇<em>f</em>(<strong>x</strong><sub><em>k</em></sub>)</p>
<p>where α &gt; 0 is the step size, called the <strong>learning rate</strong> in machine learning. Repeat until the gradient is nearly zero.</p>
<pre><code>def gradient_descent(grad, x, y, rate, steps):
    for _ in range(steps):
        gx, gy = grad(x, y)
        x, y = x - rate * gx, y - rate * gy
    return x, y

grad = lambda x, y: (2 * x, 4 * y)          # f(x, y) = x² + 2y²
print(gradient_descent(grad, 2.0, 1.0, 0.1, 50))   # very close to (0, 0)
print(gradient_descent(grad, 2.0, 1.0, 0.6, 50))   # y explodes</code></pre>
<p>For this <em>f</em>, each step multiplies <em>x</em> by (1 − 2α) and <em>y</em> by (1 − 4α). With α = 0.1 those are 0.8 and 0.6: both shrink, and the iterates approach the minimum. With α = 0.6, the <em>y</em> factor is −1.4: <em>y</em> overshoots the valley, flips sign and grows. Too small a learning rate is slow; too large diverges. And the steepest direction (the <em>y</em>-direction here) limits how large α can be, even though the <em>x</em>-direction would tolerate more. Elongated valleys like this make plain gradient descent zigzag, which is why practical optimizers such as momentum and Adam adjust the step for each direction.</p>
<p>In machine learning, <em>f</em> is usually the <em>average</em> error over a training set rather than the sum. Dividing by the number of points doesn't move the minimum, but it divides the gradient too, so a learning rate that works for one may fail for the other (the last part of Practice 4 shows this). Training sets often have millions of examples, so <strong>stochastic gradient descent</strong> estimates the gradient from a small random batch at each step, which is noisy but vastly cheaper. Combined with automatic differentiation to compute gradients, this simple loop trains essentially every modern neural network.</p>
<p>A caveat: gradient descent finds a <em>local</em> minimum, wherever the downhill walk leads. For a <strong>convex</strong> function (bowl-shaped everywhere, like least squares), any local minimum is the global one. Most machine-learning objectives aren't convex, yet gradient descent works remarkably well on them, for reasons that are still an active research question.</p>
`,
    terms: [
      ["Critical point", "A point where ∇f = 0."],
      ["Saddle point", "A critical point that is a minimum in some directions and a maximum in others."],
      ["Second derivative test", "D = f_xx f_yy − f_xy² classifies critical points as minima, maxima or saddles."],
      ["Least squares", "Choosing model parameters to minimize the sum of squared errors."],
      ["Gradient descent", "Minimizing f by repeatedly stepping opposite the gradient: x ← x − α∇f(x)."],
      ["Learning rate", "The step size α in gradient descent."],
      ["Convex function", "A bowl-shaped function, for which every local minimum is a global minimum."]
    ],
    quiz: [
      { q: "At a local minimum of a smooth <em>f</em>(<em>x</em>, <em>y</em>):", choices: ["∇f points down", "∇f = 0", "f = 0", "D < 0"], answer: 1, why: "Every partial derivative is zero at an interior extreme point." },
      { q: "At a critical point, <em>f<sub>xx</sub></em> = 4, <em>f<sub>yy</sub></em> = 1, <em>f<sub>xy</sub></em> = 3. The point is:", choices: ["A minimum", "A maximum", "A saddle", "Can't tell"], answer: 2, why: "D = 4 − 9 = −5 < 0." },
      { q: "Gradient descent steps in which direction?", choices: ["Along ∇f", "Opposite ∇f", "Perpendicular to ∇f", "Randomly"], answer: 1, why: "−∇f is the direction of steepest decrease." },
      { q: "For <em>f</em> = <em>x</em>² + 2<em>y</em>², which learning rate makes gradient descent diverge?", choices: ["0.05", "0.2", "0.45", "0.6"], answer: 3, why: "The y factor is 1 − 4α; it has magnitude above 1 when α > 0.5." }
    ],
    practice: [
      { q: `<p>Find and classify the critical points of <em>f</em>(<em>x</em>, <em>y</em>) = <em>x</em>³ − 3<em>x</em> + <em>y</em>².</p>`, a: `<p><em>f<sub>x</sub></em> = 3<em>x</em>² − 3 = 0 gives <em>x</em> = ±1; <em>f<sub>y</sub></em> = 2<em>y</em> = 0 gives <em>y</em> = 0. <em>f<sub>xx</sub></em> = 6<em>x</em>, <em>f<sub>yy</sub></em> = 2, <em>f<sub>xy</sub></em> = 0. At (1, 0): <em>D</em> = 12 &gt; 0, <em>f<sub>xx</sub></em> &gt; 0: local minimum (value −2). At (−1, 0): <em>D</em> = −12: saddle.</p>` },
      { q: `<p>Fit a least-squares line to (1, 2), (2, 3), (3, 5).</p>`, a: `<p>Σ<em>x</em> = 6, Σ<em>y</em> = 10, Σ<em>x</em>² = 14, Σ<em>xy</em> = 2 + 6 + 15 = 23, <em>n</em> = 3. Equations: 14<em>m</em> + 6<em>b</em> = 23, 6<em>m</em> + 3<em>b</em> = 10. Doubling the second: 12<em>m</em> + 6<em>b</em> = 20; subtract: 2<em>m</em> = 3, <em>m</em> = 1.5, <em>b</em> = (10 − 9)/3 = 1/3. Line: <em>y</em> = 1.5<em>x</em> + 1/3.</p>` },
      { q: `<p>Run gradient descent by hand for two steps on <em>f</em>(<em>x</em>, <em>y</em>) = (<em>x</em> − 3)² + (<em>y</em> + 1)², from (0, 0) with α = 0.25. Where is it heading?</p>`, a: `<p>∇<em>f</em> = (2(<em>x</em> − 3), 2(<em>y</em> + 1)). At (0, 0): (−6, 2); step: (0, 0) − 0.25(−6, 2) = (1.5, −0.5). At (1.5, −0.5): (−3, 1); step: (2.25, −0.75). Each step halves the distance to the minimum at (3, −1).</p>` },
      { q: `<p>Use gradient descent in Python to fit the least-squares line for the lesson's four points, starting from <em>m</em> = <em>b</em> = 0, and compare with <em>m</em> = 1.6, <em>b</em> = 1.1. Minimize the lesson's <em>E</em>, the <em>sum</em> of squared errors, using the partial derivatives worked out above. Try learning rates 0.01, 0.05 and 0.1 for 2000 steps each. Then try 0.1 again on the <em>average</em> error <em>E</em>/4.</p>`, a: `<pre><code>xs, ys = [0, 1, 2, 3], [1, 3, 4, 6]

def grad(m, b):
    gm = sum(-2 * x * (y - (m * x + b)) for x, y in zip(xs, ys))
    gb = sum(-2 * (y - (m * x + b)) for x, y in zip(xs, ys))
    return gm, gb

for rate in (0.01, 0.05, 0.1):
    m = b = 0.0
    for _ in range(2000):
        gm, gb = grad(m, b)
        m, b = m - rate * gm, b - rate * gb
    print(rate, m, b)</code></pre><p>0.01 and 0.05 converge to (1.6, 1.1) (0.05 is faster); 0.1 is too large for the sum and diverges, overflowing to <code>nan</code> ("not a number"). For the sum, rates up to about 0.059 converge for these four points. The average <em>E</em>/4 has a gradient 4 times smaller, so dividing <code>gm</code> and <code>gb</code> by 4 lets 0.1 (and even 0.2) converge to the same (1.6, 1.1): the same line, a different safe learning rate. Choosing the learning rate is a real practical problem in machine learning.</p>` }
    ],
    sources: ["openstaxcalc3", "eoc"]
  },
  {
    id: "k9",
    title: "Constrained optimization and double integrals",
    minutes: 90,
    summary: "Optimizing with a constraint using Lagrange multipliers, and integrating over regions of the plane with double integrals and Monte Carlo estimates.",
    notes: `
<p>This lesson adds two more tools for functions of several variables. The first finishes <a href="#c-math131-k8">the previous lesson's</a> story about optimization: finding the best point when the variables must satisfy a constraint. The second extends integration from intervals to regions of the plane.</p>

<h3>Constrained optimization: Lagrange multipliers</h3>
<p>Often the variables must satisfy a constraint: maximize <em>f</em>(<em>x</em>, <em>y</em>) subject to <em>g</em>(<em>x</em>, <em>y</em>) = <em>c</em>. You can only move along the curve <em>g</em> = <em>c</em>. Walk along it, watching the level curves of <em>f</em> you cross. While you cross them, <em>f</em> is still increasing in one direction along the path, so you aren't at the best point. At the best point the path stops crossing levels and just <em>touches</em> a level curve of <em>f</em>. Two curves that touch have the same perpendicular direction there, and gradients are perpendicular to level curves, so ∇<em>f</em> and ∇<em>g</em> point along the same line:</p>
<p class="math">∇<em>f</em> = λ ∇<em>g</em>  for some number λ, the <strong>Lagrange multiplier</strong></p>
<p><strong>The method.</strong> Write out the equations and solve them together:</p>
<ol>
  <li><em>f<sub>x</sub></em> = λ<em>g<sub>x</sub></em>,  <em>f<sub>y</sub></em> = λ<em>g<sub>y</sub></em>,  and the constraint <em>g</em>(<em>x</em>, <em>y</em>) = <em>c</em>: three equations for the three unknowns <em>x</em>, <em>y</em>, λ.</li>
  <li>A useful trick: eliminate λ first, for example by dividing one equation by the other, to get a relation between <em>x</em> and <em>y</em>; then substitute into the constraint.</li>
  <li>Evaluate <em>f</em> at every solution. The largest value is the maximum and the smallest the minimum. (The method finds candidates; comparing values tells you which is which.)</li>
</ol>
<p><strong>Example 1.</strong> The rectangle of perimeter 40 with the largest area: maximize <em>f</em> = <em>xy</em> subject to <em>g</em> = 2<em>x</em> + 2<em>y</em> = 40. The equations are <em>y</em> = 2λ, <em>x</em> = 2λ, 2<em>x</em> + 2<em>y</em> = 40. The first two give <em>x</em> = <em>y</em>; the constraint then gives <em>x</em> = <em>y</em> = 10, area 100: a square. (Check against another rectangle with the same perimeter: 5 × 15 has area 75.)</p>
<p><strong>Example 2.</strong> Find the largest and smallest values of <em>f</em> = <em>x</em> + <em>y</em> on the circle <em>x</em>² + <em>y</em>² = 2. Here ∇<em>f</em> = (1, 1) and ∇<em>g</em> = (2<em>x</em>, 2<em>y</em>), so 1 = 2λ<em>x</em> and 1 = 2λ<em>y</em>. Neither <em>x</em> nor λ can be 0 (the equations would say 1 = 0), so dividing gives <em>x</em> = <em>y</em>. The constraint becomes 2<em>x</em>² = 2, so <em>x</em> = ±1: candidates (1, 1) and (−1, −1). <em>f</em>(1, 1) = 2 is the maximum and <em>f</em>(−1, −1) = −2 the minimum.</p>
<p>That's all you need in this course: two variables, one constraint. Problems with many constraints, and inequality constraints such as <em>x</em> ≥ 0, are the subject of optimization courses later in the program.</p>

<h3>Double integrals</h3>
<p>Single integrals add up <em>f</em>(<em>x</em>) <em>dx</em> over an interval. Double integrals add up <em>f</em>(<em>x</em>, <em>y</em>) <em>dA</em> over a region <em>R</em> of the plane, where <em>dA</em> is a tiny area. If <em>f</em> ≥ 0, the result is the volume under the surface. Over a rectangle [<em>a</em>, <em>b</em>] × [<em>c</em>, <em>d</em>], compute it as an <strong>iterated integral</strong>: integrate in one variable with the other fixed, then integrate the result.</p>
<p class="math">∬<sub><em>R</em></sub> (<em>x</em> + <em>y</em>) <em>dA</em> over [0, 1] × [0, 2] = ∫<sub>0</sub><sup>1</sup> ( ∫<sub>0</sub><sup>2</sup> (<em>x</em> + <em>y</em>) <em>dy</em> ) <em>dx</em> = ∫<sub>0</sub><sup>1</sup> (2<em>x</em> + 2) <em>dx</em> = 3</p>
<p>Fubini's theorem says the order doesn't matter for well-behaved functions; integrating in <em>x</em> first gives the same 3. Double integrals compute masses of plates with varying density, averages over regions (the average of <em>x</em> + <em>y</em> on that rectangle is 3/2), and probabilities for two random variables at once. For regions in many dimensions, numerical methods break down (a grid with 10 points per side in 100 dimensions has 10¹⁰⁰ points), so scientists use <strong>Monte Carlo integration</strong>. Pick <em>N</em> points uniformly at random in the region <em>R</em> (every part of <em>R</em> equally likely) and average <em>f</em> at them. In Python, <code>random.uniform(a, b)</code> from the <code>random</code> module returns a random float between <code>a</code> and <code>b</code>, every value equally likely, so <code>(random.uniform(a, b), random.uniform(c, d))</code> is a uniformly random point in the rectangle [<em>a</em>, <em>b</em>] × [<em>c</em>, <em>d</em>]. That average estimates the <em>average value</em> of <em>f</em> on <em>R</em>, which is the integral divided by the area (just as in one variable, Lesson 2). So to estimate the integral itself, <strong>multiply the average by the area of <em>R</em></strong>:</p>
<p class="math">∬<sub><em>R</em></sub> <em>f dA</em> ≈ area(<em>R</em>) × (1/<em>N</em>) [ <em>f</em>(<em>P</em>₁) + … + <em>f</em>(<em>P<sub>N</sub></em>) ]</p>
<p>For example, on the rectangle [0, 1] × [0, 2] above (area 2), the average of <em>x</em> + <em>y</em> at random points comes out near 3/2, and 2 × 3/2 = 3 is the integral. Its error shrinks like 1/√<em>N</em> regardless of dimension.</p>
<p>Why 1/√<em>N</em>? The estimate is an average of <em>N</em> independent random values <em>f</em>(<em>P</em>₁), …, <em>f</em>(<em>P<sub>N</sub></em>). Let σ² be the <em>variance</em> of one value: the average of (value − mean)², a measure of how spread out the values are; its square root σ, the <em>standard deviation</em>, is a typical distance from the mean. (That's all you need here; <a href="#c-math121-d7">MATH 121, Lesson 7</a> covers variance properly, including the two facts used next.) For independent random variables variances add, so the sum of the <em>N</em> values has variance <em>N</em>σ². Multiplying a random variable by a constant <em>c</em> multiplies every distance from the mean by <em>c</em>, so it multiplies the variance by <em>c</em>². Dividing the sum by <em>N</em> to get the average is multiplying by <em>c</em> = 1/<em>N</em>, so it divides the variance by <em>N</em>², leaving σ²/<em>N</em>. The typical error is the standard deviation, the square root: σ/√<em>N</em>. So 100 times as many points make the error 10 times smaller. Nothing in that argument mentions the dimension, which is why the method works where grids fail; the price is slow convergence, since each extra digit of accuracy costs 100 times more points.</p>`,
    terms: [
      ["Lagrange multiplier", "The number λ in ∇f = λ∇g, the condition met at the best point of f on the constraint curve g = c."],
      ["Double integral", "∬ f dA, the sum of f over a region of the plane; computed as an iterated integral."]
    ],
    quiz: [
      { q: "∫<sub>0</sub><sup>2</sup>∫<sub>0</sub><sup>3</sup> <em>xy</em> <em>dy dx</em> equals:", choices: ["9", "6", "18", "4.5"], answer: 0, why: "∫₀³ y dy = 4.5, ∫₀² x dx = 2; product 9." },
      { q: "At the best point of a constrained optimization problem (maximize <em>f</em> subject to <em>g</em> = <em>c</em>), the gradients ∇<em>f</em> and ∇<em>g</em> are:", choices: ["Perpendicular", "Parallel", "Both zero", "Unrelated"], answer: 1, why: "The level curve of f just touches the constraint curve there, so ∇f = λ∇g." },
      { q: "In Monte Carlo integration, using 100 times as many random points makes the typical error:", choices: ["100 times smaller", "10 times smaller", "About the same", "2 times smaller"], answer: 1, why: "The error shrinks like 1/√N, and √100 = 10." }
    ],
    practice: [
      { q: `<p>Use a Lagrange multiplier to find the point on the line <em>x</em> + 2<em>y</em> = 10 closest to the origin. (Minimize the squared distance <em>x</em>² + <em>y</em>², which has the same minimum point and is easier to differentiate.)</p>`, a: `<p><em>f</em> = <em>x</em>² + <em>y</em>², <em>g</em> = <em>x</em> + 2<em>y</em>. Equations: 2<em>x</em> = λ, 2<em>y</em> = 2λ, <em>x</em> + 2<em>y</em> = 10. The first two give λ = 2<em>x</em> and <em>y</em> = λ = 2<em>x</em>. The constraint: <em>x</em> + 4<em>x</em> = 10, so <em>x</em> = 2, <em>y</em> = 4. The closest point is (2, 4), at distance √20 ≈ 4.47. (A line has no farthest point, so this single candidate is the minimum. Notice (2, 4) is a multiple of (1, 2), the gradient of <em>g</em>: the shortest path to a line is perpendicular to it.)</p>` },
      { q: `<p>Estimate ∬ e<sup>−(<em>x</em>² + <em>y</em>²)</sup> <em>dA</em> over the square [−3, 3] × [−3, 3] by Monte Carlo with 100,000 random points (the square has area 36). Compare with π (the integral over the whole plane). Then explain why this checks Lesson 3's claim that ∫<sub>−∞</sub><sup>∞</sup> e<sup>−<em>x</em>²</sup> <em>dx</em> = √π.</p>`, hint: `<p>Each random point is <code>(random.uniform(-3, 3), random.uniform(-3, 3))</code>. Add up <code>math.exp(-(x**2 + y**2))</code> over the points, divide by <em>N</em> for the average, and multiply by the area 36.</p>`, a: `<pre><code>import random, math
N = 100_000
total = sum(math.exp(-(random.uniform(-3, 3)**2 + random.uniform(-3, 3)**2)) for _ in range(N))
est = 36 * total / N                          # area 36 times the average value
print(est, math.pi)                           # about 3.14 (varies by a few hundredths), 3.14159...
print(math.sqrt(est), math.sqrt(math.pi))     # about 1.77, 1.77245...</code></pre><p>The square misses only a tiny amount of the function's mass. The link to √π: e<sup>−(<em>x</em>² + <em>y</em>²)</sup> = e<sup>−<em>x</em>²</sup> e<sup>−<em>y</em>²</sup>. As an iterated integral, the inner integral in <em>y</em> treats e<sup>−<em>x</em>²</sup> as a constant, so it comes out as e<sup>−<em>x</em>²</sup> · <em>I</em>, where <em>I</em> = ∫<sub>−3</sub><sup>3</sup> e<sup>−<em>y</em>²</sup> <em>dy</em>. The outer integral then gives <em>I</em> · <em>I</em> = <em>I</em>². So the double integral is the <em>square</em> of the single one: if it is π, the single integral is √π ≈ 1.772. (Over [−3, 3] the single integral is 1.77241…, within 0.0001 of √π.)</p>` },
      { q: `<p>Compute ∬ (<em>x</em> + 2<em>y</em>) <em>dA</em> over the rectangle [0, 2] × [0, 1] as an iterated integral both ways round (integrate in <em>y</em> first, then in <em>x</em> first) and check that the answers agree.</p>`, a: `<p><em>y</em> first: ∫<sub>0</sub><sup>2</sup> [<em>xy</em> + <em>y</em>²]<sub>0</sub><sup>1</sup> <em>dx</em> = ∫<sub>0</sub><sup>2</sup> (<em>x</em> + 1) <em>dx</em> = 2 + 2 = 4. <em>x</em> first: ∫<sub>0</sub><sup>1</sup> [<em>x</em>²/2 + 2<em>xy</em>]<sub>0</sub><sup>2</sup> <em>dy</em> = ∫<sub>0</sub><sup>1</sup> (2 + 4<em>y</em>) <em>dy</em> = 2 + 2 = 4. They agree, as Fubini's theorem promises.</p>` }
    ],
    sources: ["openstaxcalc3", "eoc"]
  }
]);

CSA.addAsides("math131", {
  k1: [
    { kind: "lang", title: "Computer algebra", html: `<p>Programs that manipulate formulas symbolically date to the 1960s: MACSYMA (MIT, 1968) could integrate many functions, using an algorithm by Robert Risch (1969) that decides whether an elementary antiderivative exists. Today's systems include Mathematica, Maple and the free Python library SymPy. They're excellent for checking your work, but a course asks you to integrate by hand for the same reason a programming course asks you to write a sort: to understand what the tool does and when it fails.</p>` }
  ],
  k3: [
    { kind: "practice", title: "Floating point and numerical integration", html: `<p>Shrinking the step size doesn't improve accuracy forever. Each function value carries a rounding error around 10⁻¹⁶, and adding millions of them accumulates error. Past some point, more steps make the answer <em>worse</em>. Higher-order methods reach high accuracy with few steps, avoiding the problem; this trade-off between truncation error and rounding error appears throughout scientific computing.</p>` }
  ],
  k4: [
    { kind: "history", title: "Euler and the Basel problem", html: `<p>The value of 1 + 1/4 + 1/9 + 1/16 + … defeated the best mathematicians of the 17th century, including the Bernoulli brothers of Basel. In 1734 the 27-year-old Leonhard Euler showed it equals π²/6, by treating sin <em>x</em>/<em>x</em> as an infinite polynomial and comparing its factors with its series. His argument wasn't rigorous by later standards, but it was right, and he later proved it properly. The result made him famous.</p>`, sources: ["mactutorseries"] }
  ],
  k5: [
    { kind: "history", title: "Series in Kerala, two centuries before Taylor", html: `<p>Around 1400, Madhava of Sangamagrama in Kerala, India, found the power series for sine, cosine and arctangent, including π/4 = 1 − 1/3 + 1/5 − …, along with error corrections to speed up its convergence. His school's work was recorded in texts such as the <em>Yuktibhasha</em> (around 1530). In Europe, James Gregory (1671), Newton, Brook Taylor (1715) and Colin Maclaurin (1742) developed the general theory, and the series bear their names.</p>`, sources: ["mactutorseries"] }
  ],
  k6: [
    { kind: "history", title: "Katherine Johnson's orbits", html: `<p>Katherine Johnson, a NASA mathematician, calculated trajectories for the first American human spaceflights. John Glenn asked her personally to verify the electronic computer's orbital calculations before his 1962 flight. She used numerical methods for differential equations, including Euler's method, to compute paths that had no formula solution. She received the Presidential Medal of Freedom in 2015, and her story, with those of her colleagues Dorothy Vaughan and Mary Jackson, was told in <em>Hidden Figures</em>.</p>`, sources: ["nasahidden"] }
  ],
  k7: [
    { kind: "practice", title: "Gradients of images", html: `<p>A grayscale image is a function of two variables: brightness at (<em>x</em>, <em>y</em>). Its gradient is large at edges, where brightness changes sharply, and points across the edge. Edge detectors in computer vision, like the Sobel filter (1968), estimate the gradient with finite differences over neighboring pixels.</p>` }
  ],
  k8: [
    { kind: "ethics", title: "What are we optimizing?", html: `<p>Gradient descent faithfully minimizes whatever function it's given. If a recommendation system is trained to maximize watch time, it will find whatever maximizes watch time, which may include content that is outrageous or harmful. Choosing the objective, and noticing what it leaves out, is a human decision with ethical consequences, sometimes summarized by Goodhart's law: "when a measure becomes a target, it ceases to be a good measure."</p>` }
  ]
});

CSA.addOptional("math131", [
  {
    id: "autodiff",
    kind: "deep",
    title: "Automatic differentiation: how neural networks get their gradients",
    minutes: 60,
    summary: "Neither symbolic nor numerical: how computers compute exact derivatives of programs by applying the chain rule to every operation, and why reverse mode (backpropagation) makes deep learning possible.",
    notes: `
<p>Gradient descent needs gradients. For a neural network with a billion parameters, how are they computed? Not symbolically (the formulas would be astronomically long) and not with finite differences (two billion function evaluations per step, each with rounding error). The answer is <strong>automatic differentiation</strong> (AD): computing exact derivatives of a <em>program</em> by applying the chain rule to each elementary operation it performs.</p>

<h3>Programs are compositions</h3>
<p>Any numerical program, however long, is built from simple operations (+, ×, sin, exp, …) whose derivatives are known. Write <em>f</em>(<em>x</em>, <em>y</em>) = sin(<em>xy</em>) + <em>x</em> as a sequence of steps:</p>
<pre><code>a = x * y
b = sin(a)
f = b + x</code></pre>
<p>The chain rule says how a change in <em>x</em> flows through. Here <em>x</em> reaches <em>f</em> by two paths, and their contributions add:</p>
<ul>
  <li><strong>Through <em>a</em> and <em>b</em>:</strong> <em>x</em> changes <em>a</em> (by ∂<em>a</em>/∂<em>x</em> = <em>y</em> per unit), <em>a</em> changes <em>b</em> (by cos <em>a</em>), and <em>b</em> changes <em>f</em> (by 1). Multiplying along the path gives 1 · cos(<em>a</em>) · <em>y</em>.</li>
  <li><strong>Directly:</strong> the last line, <code>f = b + x</code>, also uses <em>x</em> itself. Holding <em>b</em> fixed, that line changes <em>f</em> by 1 per unit of <em>x</em>.</li>
</ul>
<p class="math">∂<em>f</em>/∂<em>x</em> = (1 · cos(<em>a</em>) · <em>y</em>) + 1 = <em>y</em> cos(<em>xy</em>) + 1</p>
<p>(Check by differentiating sin(<em>xy</em>) + <em>x</em> directly.) AD does exactly this bookkeeping, one line of the program at a time.</p>

<h3>Forward mode: dual numbers</h3>
<p>Carry, alongside every value, its derivative with respect to one chosen input. Each operation updates both, using its derivative rule. This is elegantly implemented with operator overloading (<a href="#c-cs102-c2">CS 102, Lesson 2</a>):</p>
<pre><code>import math

class Dual:
    """A value and its derivative with respect to one input."""
    def __init__(self, val, der=0.0):
        self.val, self.der = val, der

    def __add__(self, other):
        other = other if isinstance(other, Dual) else Dual(other)
        return Dual(self.val + other.val, self.der + other.der)

    def __mul__(self, other):
        other = other if isinstance(other, Dual) else Dual(other)
        return Dual(self.val * other.val,
                    self.der * other.val + self.val * other.der)   # product rule

def sin(d):
    return Dual(math.sin(d.val), math.cos(d.val) * d.der)          # chain rule

x, y = Dual(2.0, 1.0), Dual(3.0)      # differentiate with respect to x
f = sin(x * y) + x
print(f.val, f.der)                   # f and ∂f/∂x = 3·cos(6) + 1</code></pre>
<p>The derivative is exact (to floating-point precision), and costs only a small constant factor more than computing <em>f</em>. But forward mode gives the derivative with respect to <em>one</em> input per run. For a billion parameters, that's a billion runs.</p>

<h3>Reverse mode: backpropagation</h3>
<p><strong>Reverse mode</strong> runs the program forward once, recording each operation, then walks the record <em>backwards</em>, computing ∂<em>f</em>/∂(each intermediate value) from the output toward the inputs. One backward pass gives the derivative of the single output with respect to <em>every</em> input, for a cost of a small multiple of one forward pass. A loss function has one output and many inputs, which is exactly the case reverse mode is good at. In neural networks, reverse mode is called <strong>backpropagation</strong>; its use for training networks was popularized by Rumelhart, Hinton and Williams in 1986, building on earlier work by Seppo Linnainmaa (1970) and Paul Werbos (1974).</p>
<p>Libraries like PyTorch and JAX are, at their core, reverse-mode AD systems: you write ordinary-looking code, and calling <code>.backward()</code> or <code>jax.grad</code> produces gradients. Everything you learned in this course, the chain rule, partial derivatives, gradients and gradient descent, is running inside them.</p>

<h3>Exercises</h3>
<ol>
  <li>Extend <code>Dual</code> with <code>__sub__</code>, <code>__truediv__</code> (quotient rule) and an <code>exp</code> function, and check the derivative of <em>x</em>e<sup><em>x</em></sup> at <em>x</em> = 1 against (<em>x</em> + 1)e<sup><em>x</em></sup>.</li>
  <li><strong>Newton's method</strong> solves <em>g</em>(<em>x</em>) = 0 from a starting guess by repeating <em>x</em> ← <em>x</em> − <em>g</em>(<em>x</em>)/<em>g</em>′(<em>x</em>). Each step replaces the curve by its tangent line at <em>x</em> and jumps to where that line crosses zero. Write <code>cos</code> for <code>Dual</code> (like <code>sin</code>; the derivative of cos is −sin), then, with <code>__sub__</code> from Exercise 1, use Newton's method with <em>g</em>(<em>x</em>) = cos <em>x</em> − <em>x</em>, starting at <em>x</em> = 1, to solve cos <em>x</em> = <em>x</em>. Get <em>g</em>(<em>x</em>) and <em>g</em>′(<em>x</em>) together from one evaluation of <code>g(Dual(x, 1.0))</code>, without writing the derivative by hand. (Four steps give 0.7390851332.)</li>
  <li>Why does forward mode suit a function with one input and many outputs, while reverse mode suits many inputs and one output?</li>
</ol>
`,
    terms: [
      ["Automatic differentiation", "Computing exact derivatives of a program by applying the chain rule to each operation."],
      ["Forward mode", "AD that carries derivatives forward alongside values; one input direction per run."],
      ["Reverse mode (backpropagation)", "AD that records a computation and propagates derivatives backwards; all input derivatives in one pass."],
      ["Dual number", "A pair (value, derivative) whose arithmetic implements forward-mode AD."]
    ],
    quiz: [
      { q: "Why don't neural networks compute gradients with finite differences?", choices: ["They're too accurate", "They need about two evaluations per parameter and have rounding error", "Finite differences don't exist in Python", "They only work for linear functions"], answer: 1, why: "With a billion parameters that's billions of evaluations per step." },
      { q: "For a function with a million inputs and one output, which AD mode is efficient?", choices: ["Forward mode", "Reverse mode", "Neither", "Both equally"], answer: 1, why: "One backward pass gives all million partial derivatives." },
      { q: "In the Dual class, which calculus rule does <code>__mul__</code> implement?", choices: ["Chain rule", "Product rule", "Quotient rule", "Power rule"], answer: 1, why: "(uv)′ = u′v + uv′." }
    ],
    sources: ["eoc"]
  },
  {
    id: "calchist",
    kind: "history",
    title: "Newton, Leibniz and the infinite",
    minutes: 45,
    summary: "How calculus was invented twice, the bitter priority dispute that followed, and the two centuries it took to put infinite processes on solid ground.",
    notes: `
<p>Calculus was developed independently by Isaac Newton in England (from 1665–66) and Gottfried Wilhelm Leibniz in Germany (from 1675). Their approaches, and the dispute between them, shaped mathematics for centuries.</p>

<h3>Newton's fluxions and series</h3>
<p>During the plague years of 1665–66, when Cambridge was closed, the young Newton developed his "method of fluxions" (derivatives), the generalized binomial theorem for any exponent, and the use of infinite series to compute areas. For Newton, series were the main tool: he expanded functions as infinite polynomials and integrated term by term. He used his calculus in the <em>Principia</em> (1687) to derive planetary orbits from his laws of motion and gravitation, though he wrote the book in the language of classical geometry, which his readers could follow. He published his calculus itself only much later.</p>

<h3>Leibniz's notation</h3>
<p>Leibniz thought carefully about notation, believing good symbols would do the thinking for you. He introduced <em>dx</em>, <em>dy</em>/<em>dx</em> and the elongated S, ∫, for "summa". His notation makes the chain rule (<em>dy</em>/<em>dx</em> = <em>dy</em>/<em>du</em> · <em>du</em>/<em>dx</em>) and substitution look like algebra with fractions, which is why it won. He published first, in 1684 and 1686.</p>

<h3>The priority dispute</h3>
<p>In the 1690s and 1700s, Newton's supporters accused Leibniz of plagiarism. In 1712 the Royal Society, whose president was Newton, issued a report finding for Newton; Newton had written much of it himself, anonymously. Historians now agree the two worked independently. The dispute had a lasting cost: British mathematicians clung to Newton's notation and methods and fell behind the continent, where the Bernoullis and Euler built on Leibniz for most of the 18th century.</p>

<h3>The problem with infinitesimals</h3>
<p>Both men reasoned with "infinitely small" quantities that were somehow nonzero when divided by but zero when convenient. In 1734 the philosopher George Berkeley mocked them as "the ghosts of departed quantities". Euler's brilliant manipulations of divergent series sometimes produced nonsense. The foundations weren't fixed until the 19th century: Augustin-Louis Cauchy (1820s) based calculus on limits, and Karl Weierstrass (1860s) gave the ε–δ definition of a limit that students learn today. Infinitesimals were finally made rigorous in 1961 by Abraham Robinson's nonstandard analysis.</p>

<h3>Discussion questions</h3>
<ol>
  <li>Leibniz's notation outlived Newton's. What makes a notation good? Compare with programming-language syntax: what makes code readable?</li>
  <li>Calculus was used successfully for 150 years before its foundations were secure. Is it reasonable to use a method you can't fully justify? What parallels can you find in computing?</li>
  <li>How might the priority dispute have gone differently if both had published their work promptly? What role does open publication play in science and software today?</li>
</ol>
`,
    terms: [
      ["Fluxion", "Newton's term for the rate of change of a quantity: a derivative."],
      ["Infinitesimal", "An \"infinitely small\" quantity; used informally by the founders of calculus, made rigorous only in 1961."],
      ["ε–δ definition", "Weierstrass's precise definition of a limit, which made calculus rigorous."]
    ],
    quiz: [
      { q: "Which notation is due to Leibniz?", choices: ["ẋ (dot notation)", "dy/dx and ∫", "f′(x)", "Dₓf"], answer: 1, why: "Newton used dots; Lagrange introduced f′." },
      { q: "Who gave the ε–δ definition of a limit?", choices: ["Newton", "Leibniz", "Weierstrass", "Berkeley"], answer: 2, why: "In the 1860s, building on Cauchy." }
    ],
    sources: ["mactutorcalc", "newton1687"]
  }
]);
