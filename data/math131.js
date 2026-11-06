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
      { name: "Final exam", weight: 30, desc: "Cumulative, with emphasis on Taylor series, differential equations and multivariable calculus (lessons 5–8)." }
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
<p>The Fundamental Theorem of Calculus turns integration into finding antiderivatives. Differentiation is mechanical: every function built from the usual pieces has a derivative you can compute by rules. Antidifferentiation is not: there's no product rule or chain rule that always works backwards, and some functions, like e<sup>−<em>x</em>²</sup>, have no antiderivative made of elementary functions at all. This lesson covers the two techniques that handle most cases you'll meet, and a strategy for choosing between them.</p>

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
<p><strong>Example.</strong> ∫ <em>x</em> e<sup><em>x</em></sup> <em>dx</em>. Let <em>u</em> = <em>x</em> (simplifies to 1), <em>dv</em> = e<sup><em>x</em></sup> <em>dx</em>, so <em>du</em> = <em>dx</em>, <em>v</em> = e<sup><em>x</em></sup>. Then ∫ <em>x</em> e<sup><em>x</em></sup> <em>dx</em> = <em>x</em> e<sup><em>x</em></sup> − ∫ e<sup><em>x</em></sup> <em>dx</em> = (<em>x</em> − 1) e<sup><em>x</em></sup> + <em>C</em>. Check: ((<em>x</em> − 1)e<sup><em>x</em></sup>)′ = e<sup><em>x</em></sup> + (<em>x</em> − 1)e<sup><em>x</em></sup> = <em>x</em> e<sup><em>x</em></sup>. ✓ The other choice, <em>u</em> = e<sup><em>x</em></sup>, would give ∫ (<em>x</em>²/2) e<sup><em>x</em></sup> <em>dx</em>, which is worse.</p>
<p><strong>Example: ln <em>x</em>.</strong> ∫ ln <em>x dx</em> has only one factor, so take <em>u</em> = ln <em>x</em> and <em>dv</em> = <em>dx</em>. Then <em>du</em> = <em>dx</em>/<em>x</em>, <em>v</em> = <em>x</em>, and ∫ ln <em>x dx</em> = <em>x</em> ln <em>x</em> − ∫ 1 <em>dx</em> = <em>x</em> ln <em>x</em> − <em>x</em> + <em>C</em>.</p>
<p><strong>Repeated and circular parts.</strong> ∫ <em>x</em>² e<sup><em>x</em></sup> <em>dx</em> needs parts twice. ∫ e<sup><em>x</em></sup> sin <em>x dx</em> returns, after two rounds, to a multiple of itself; solve for it algebraically: the answer is e<sup><em>x</em></sup>(sin <em>x</em> − cos <em>x</em>)/2 + <em>C</em>.</p>
<p>A computer-science connection: ∫<sub>1</sub><sup><em>n</em></sup> ln <em>x dx</em> = <em>n</em> ln <em>n</em> − <em>n</em> + 1 approximates ln(<em>n</em>!) = ln 1 + ln 2 + … + ln <em>n</em>. That's the heart of <strong>Stirling's approximation</strong>, ln <em>n</em>! ≈ <em>n</em> ln <em>n</em> − <em>n</em>, which shows that sorting by comparisons needs about <em>n</em> log₂ <em>n</em> comparisons (there are <em>n</em>! orders to tell apart).</p>

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
  <li><strong>Still stuck?</strong> Use a table or computer algebra (SymPy: <code>sympy.integrate(x*sympy.exp(x), x)</code>), or compute the definite integral numerically (Lesson 3).</li>
</ol>
<p>Always check an antiderivative by differentiating it. It takes a minute and catches most mistakes.</p>
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
      { q: `<p>Evaluate ∫<sub>0</sub><sup>1</sup> <em>x</em>² e<sup><em>x</em></sup> <em>dx</em> using parts twice. Check numerically.</p>`, a: `<p>∫ <em>x</em>² e<sup><em>x</em></sup> <em>dx</em> = <em>x</em>² e<sup><em>x</em></sup> − 2∫ <em>x</em> e<sup><em>x</em></sup> <em>dx</em> = <em>x</em>² e<sup><em>x</em></sup> − 2(<em>x</em> − 1)e<sup><em>x</em></sup> = (<em>x</em>² − 2<em>x</em> + 2)e<sup><em>x</em></sup>. From 0 to 1: e − 2 ≈ 0.718. A midpoint sum with 1000 rectangles gives 0.71828.</p>` },
      { q: `<p>Evaluate ∫ <em>x</em>√(<em>x</em> + 1) <em>dx</em>. (Hint: let <em>u</em> = <em>x</em> + 1, so <em>x</em> = <em>u</em> − 1.)</p>`, a: `<p>∫ (<em>u</em> − 1)<em>u</em><sup>1/2</sup> <em>du</em> = ∫ (<em>u</em><sup>3/2</sup> − <em>u</em><sup>1/2</sup>) <em>du</em> = (2/5)<em>u</em><sup>5/2</sup> − (2/3)<em>u</em><sup>3/2</sup> + <em>C</em> = (2/5)(<em>x</em> + 1)<sup>5/2</sup> − (2/3)(<em>x</em> + 1)<sup>3/2</sup> + <em>C</em>.</p>` },
      { q: `<p>Use partial fractions to evaluate ∫<sub>1</sub><sup><em>n</em></sup> <em>dx</em>/(<em>x</em>(<em>x</em> + 1)) and find its limit as <em>n</em> → ∞.</p>`, a: `<p>[ln <em>x</em> − ln(<em>x</em> + 1)] from 1 to <em>n</em> = ln(<em>n</em>/(<em>n</em> + 1)) + ln 2. As <em>n</em> → ∞, <em>n</em>/(<em>n</em> + 1) → 1, so the integral approaches ln 2 ≈ 0.693.</p>` },
      { q: `<p>Use SymPy to check your answer to ∫ e<sup><em>x</em></sup> sin <em>x dx</em>, and ask it for ∫ e<sup>−<em>x</em>²</sup> <em>dx</em>. What does it return for the second, and why?</p>`, a: `<pre><code>import sympy as sp
x = sp.symbols("x")
print(sp.integrate(sp.exp(x) * sp.sin(x), x))   # exp(x)*sin(x)/2 - exp(x)*cos(x)/2
print(sp.integrate(sp.exp(-x**2), x))           # sqrt(pi)*erf(x)/2</code></pre><p>The second has no elementary antiderivative, so SymPy expresses it with <code>erf</code>, the "error function", which is <em>defined</em> as this integral (up to a constant). It's essential in probability, for the normal distribution.</p>` }
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
<p><strong>Checking a formula you know.</strong> A sphere of radius <em>r</em> is the rotation of <em>y</em> = √(<em>r</em>² − <em>x</em>²) for −<em>r</em> ≤ <em>x</em> ≤ <em>r</em>: <em>V</em> = ∫<sub>−<em>r</em></sub><sup><em>r</em></sup> π(<em>r</em>² − <em>x</em>²) <em>dx</em> = π(2<em>r</em>³ − 2<em>r</em>³/3) = (4/3)π<em>r</em>³. ✓ Archimedes found this around 250 BCE by a remarkably similar slicing argument.</p>

<h3>Average value</h3>
<p>The average of finitely many numbers is their sum divided by how many there are. The average of a function over [<em>a</em>, <em>b</em>] is its integral divided by the length:</p>
<p class="math"><em>f</em><sub>avg</sub> = (1/(<em>b</em> − <em>a</em>)) ∫<sub><em>a</em></sub><sup><em>b</em></sup> <em>f</em>(<em>x</em>) <em>dx</em></p>
<p>The average of sin <em>x</em> over [0, π] is (1/π) · 2 ≈ 0.64. An AC power supply rated by its average uses exactly this. A server's average load over a day, from a load curve, is the same calculation.</p>

<h3>Work</h3>
<p>Work is force times distance when the force is constant. When the force varies with position, slice the path: <em>W</em> = ∫<sub><em>a</em></sub><sup><em>b</em></sup> <em>F</em>(<em>x</em>) <em>dx</em>. A spring with constant <em>k</em> = 200 N/m pushes back with force <em>kx</em> when stretched <em>x</em> meters (Hooke's law). Stretching it 0.1 m takes ∫<sub>0</sub><sup>0.1</sup> 200<em>x dx</em> = 1 joule. You'll use this in Physics.</p>

<h3>Probability density functions</h3>
<p>Discrete probability (MATH 121) assigns probabilities to individual outcomes. For a continuous quantity, such as a waiting time or a measurement error, any single exact value has probability 0; instead, a <strong>probability density function</strong> <em>p</em>(<em>x</em>) ≥ 0 gives probabilities as areas:</p>
<p class="math">P(<em>a</em> ≤ <em>X</em> ≤ <em>b</em>) = ∫<sub><em>a</em></sub><sup><em>b</em></sup> <em>p</em>(<em>x</em>) <em>dx</em>,  with ∫<sub>−∞</sub><sup>∞</sup> <em>p</em>(<em>x</em>) <em>dx</em> = 1</p>
<p>and the expected value is E[<em>X</em>] = ∫ <em>x p</em>(<em>x</em>) <em>dx</em>, the continuous version of Σ <em>x</em> P(<em>X</em> = <em>x</em>). The time between requests arriving at a web server is often modeled by the <strong>exponential distribution</strong>, <em>p</em>(<em>x</em>) = λe<sup>−λ<em>x</em></sup> for <em>x</em> ≥ 0, where λ is the average rate. If requests arrive at λ = 2 per second, P(wait more than 1 second) = ∫<sub>1</sub><sup>∞</sup> 2e<sup>−2<em>x</em></sup> <em>dx</em> = e<sup>−2</sup> ≈ 0.135, and the mean wait is 1/λ = 0.5 s (integration by parts). Integrals over infinite intervals are the subject of the next lesson.</p>
`,
    terms: [
      ["Area between curves", "∫ (top − bottom) dx over the interval where one curve is above the other."],
      ["Volume by slicing", "V = ∫ A(x) dx, where A(x) is the cross-sectional area."],
      ["Disk method", "Volume of a solid of revolution about the x-axis: ∫ π f(x)² dx."],
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
      { q: `<p>For the exponential density <em>p</em>(<em>x</em>) = λe<sup>−λ<em>x</em></sup>, show that P(<em>X</em> &gt; <em>s</em> + <em>t</em> | <em>X</em> &gt; <em>s</em>) = P(<em>X</em> &gt; <em>t</em>). What does this "memoryless" property mean for a server waiting for requests?</p>`, a: `<p>P(<em>X</em> &gt; <em>a</em>) = ∫<sub><em>a</em></sub><sup>∞</sup> λe<sup>−λ<em>x</em></sup> <em>dx</em> = e<sup>−λ<em>a</em></sup>. So the conditional probability is e<sup>−λ(<em>s</em>+<em>t</em>)</sup>/e<sup>−λ<em>s</em></sup> = e<sup>−λ<em>t</em></sup>. Having already waited <em>s</em> seconds tells you nothing about how much longer you'll wait: the next request is no more "due" than it was.</p>` },
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

<h3>Simpson's rule</h3>
<p>Instead of straight lines, fit a parabola through each three consecutive points. For an even <em>n</em>:</p>
<p class="math"><em>S<sub>n</sub></em> = (<em>h</em>/3) [ <em>f</em>(<em>x</em>₀) + 4<em>f</em>(<em>x</em>₁) + 2<em>f</em>(<em>x</em>₂) + 4<em>f</em>(<em>x</em>₃) + … + 4<em>f</em>(<em>x</em><sub><em>n</em>−1</sub>) + <em>f</em>(<em>x<sub>n</sub></em>) ]</p>
<p>Its error is proportional to <em>h</em>⁴ (with the fourth derivative in place of the second): doubling <em>n</em> cuts the error by about 16. On ∫<sub>0</sub><sup>1</sup> 4/(1 + <em>x</em>²) <em>dx</em> = π:</p>
<table>
  <thead><tr><th><em>n</em></th><th>Trapezoid error</th><th>Simpson error</th></tr></thead>
  <tbody>
    <tr><td>4</td><td>1.0 × 10⁻²</td><td>2.4 × 10⁻⁵</td></tr>
    <tr><td>8</td><td>2.6 × 10⁻³</td><td>1.5 × 10⁻⁷</td></tr>
    <tr><td>16</td><td>6.5 × 10⁻⁴</td><td>2.4 × 10⁻⁹</td></tr>
  </tbody>
</table>
<p>The table shows the orders in action: each doubling divides the trapezoid error by 4. Simpson's error drops much faster on this function. With higher-order methods, a few dozen function evaluations reach the limits of floating-point accuracy. Libraries like SciPy (<code>scipy.integrate.quad</code>) use adaptive methods, which add points only where the function is hard to approximate, and report an error estimate along with the answer.</p>
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
<p><strong>Comparison.</strong> If 0 ≤ <em>f</em> ≤ <em>g</em> and ∫ <em>g</em> converges, so does ∫ <em>f</em>; if ∫ <em>f</em> diverges, so does ∫ <em>g</em>. For example, e<sup>−<em>x</em>²</sup> ≤ e<sup>−<em>x</em></sup> for <em>x</em> ≥ 1, so ∫<sub>1</sub><sup>∞</sup> e<sup>−<em>x</em>²</sup> <em>dx</em> converges, even though we can't compute an antiderivative. (In fact ∫<sub>−∞</sub><sup>∞</sup> e<sup>−<em>x</em>²</sup> <em>dx</em> = √π, which you'll prove in a later course with a double integral.)</p>

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
      { q: "Why is [−1/<em>x</em>] from −1 to 1 not the value of ∫<sub>−1</sub><sup>1</sup> <em>dx</em>/<em>x</em>²?", choices: ["Arithmetic mistake", "The integrand is unbounded at 0 inside the interval, so the FTC doesn't apply; the integral diverges", "It is the right value", "Because −1/x is not an antiderivative"], answer: 1, why: "The Fundamental Theorem needs f continuous on the whole interval." }
    ],
    practice: [
      { q: `<p>Compute <em>T</em>₄ for ∫<sub>0</sub><sup>2</sup> <em>x</em>² <em>dx</em> by hand and compare with the exact value. Why is the estimate too large?</p>`, a: `<p><em>h</em> = 0.5; values 0, 0.25, 1, 2.25, 4. <em>T</em>₄ = 0.5(0/2 + 0.25 + 1 + 2.25 + 4/2) = 0.5 · 5.5 = 2.75. Exact: 8/3 ≈ 2.667. The curve is concave up (<em>f</em>″ &gt; 0), so the straight tops of the trapezoids lie above it.</p>` },
      { q: `<p>How large must <em>n</em> be to guarantee the trapezoid rule approximates ∫<sub>0</sub><sup>1</sup> e<sup><em>x</em></sup> <em>dx</em> within 10⁻⁶?</p>`, a: `<p><em>f</em>″ = e<sup><em>x</em></sup> ≤ e on [0, 1], so <em>K</em> = e. Need e · 1 · (1/<em>n</em>)²/12 ≤ 10⁻⁶, so <em>n</em>² ≥ e · 10⁶/12 ≈ 226,523, giving <em>n</em> ≥ 476.</p>` },
      { q: `<p>Write <code>simpson(f, a, b, n)</code> in Python and reproduce the Simpson column of the table for ∫<sub>0</sub><sup>1</sup> 4/(1 + <em>x</em>²) <em>dx</em>.</p>`, a: `<pre><code>import math

def simpson(f, a, b, n):
    if n % 2:
        raise ValueError("n must be even")
    h = (b - a) / n
    s = f(a) + f(b)
    for i in range(1, n):
        s += (4 if i % 2 else 2) * f(a + i * h)
    return h * s / 3

f = lambda x: 4 / (1 + x * x)
for n in (4, 8, 16):
    print(n, abs(simpson(f, 0, 1, n) - math.pi))</code></pre>` },
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
<p>meaning each divided by the next tends to 0. This is the same hierarchy as the big-O classes from CS 101.</p>

<h3>Series and partial sums</h3>
<p>A <strong>series</strong> Σ<sub><em>n</em>=1</sub><sup>∞</sup> <em>a<sub>n</sub></em> is defined through its <strong>partial sums</strong> <em>S<sub>N</sub></em> = <em>a</em>₁ + … + <em>a<sub>N</sub></em>. The series converges to <em>S</em> if the sequence of partial sums converges to <em>S</em>.</p>

<h3>Geometric series</h3>
<p class="math">Σ<sub><em>n</em>=0</sub><sup>∞</sup> <em>ar<sup>n</sup></em> = <em>a</em> + <em>ar</em> + <em>ar</em>² + … = <em>a</em>/(1 − <em>r</em>)  if |<em>r</em>| &lt; 1, and diverges if |<em>r</em>| ≥ 1</p>
<p><strong>Why:</strong> <em>S<sub>N</sub></em> = <em>a</em> + <em>ar</em> + … + <em>ar<sup>N</sup></em>. Multiply by <em>r</em> and subtract: <em>S<sub>N</sub></em> − <em>rS<sub>N</sub></em> = <em>a</em> − <em>ar</em><sup><em>N</em>+1</sup>, so <em>S<sub>N</sub></em> = <em>a</em>(1 − <em>r</em><sup><em>N</em>+1</sup>)/(1 − <em>r</em>). If |<em>r</em>| &lt; 1, <em>r</em><sup><em>N</em>+1</sup> → 0. Zeno's runner: 1/2 + 1/4 + 1/8 + … = (1/2)/(1 − 1/2) = 1.</p>
<p>Geometric series appear constantly in computing. A dynamic array that doubles when full copies 1 + 2 + 4 + … + <em>n</em> &lt; 2<em>n</em> items in total, which is why appending is O(1) amortized (CS 102). A recursion that does half as much work at each level does total work at most twice the top level. And the repeating decimal 0.999… = 9/10 + 9/100 + … = (9/10)/(1 − 1/10) = 1 exactly.</p>

<h3>The divergence test</h3>
<p>If Σ <em>a<sub>n</sub></em> converges, then <em>a<sub>n</sub></em> → 0. Equivalently, <strong>if the terms don't go to 0, the series diverges</strong>. Σ <em>n</em>/(<em>n</em> + 1) diverges because its terms approach 1. But the converse is false, as the next example shows.</p>

<h3>The harmonic series</h3>
<p class="math">1 + 1/2 + 1/3 + 1/4 + … = ∞</p>
<p>The terms go to 0, yet the sum diverges. Nicole Oresme's proof (around 1350) groups the terms: 1/3 + 1/4 &gt; 1/2; 1/5 + … + 1/8 &gt; 4 · 1/8 = 1/2; 1/9 + … + 1/16 &gt; 1/2; and so on, infinitely many halves. The partial sums <em>H<sub>N</sub></em> grow like ln <em>N</em> (more precisely, <em>H<sub>N</sub></em> ≈ ln <em>N</em> + 0.5772). So the series diverges, but extremely slowly: it takes about 1.5 × 10⁴³ terms to pass 100. You met <em>H<sub>n</sub></em> in the coupon collector problem, and it's why quicksort's average cost involves ln <em>n</em>.</p>

<h3>The integral test</h3>
<p>If <em>f</em> is positive and decreasing and <em>a<sub>n</sub></em> = <em>f</em>(<em>n</em>), then Σ <em>a<sub>n</sub></em> and ∫<sub>1</sub><sup>∞</sup> <em>f</em>(<em>x</em>) <em>dx</em> both converge or both diverge. (Picture the terms as rectangles of width 1 above and below the curve.) Combined with last lesson's <em>p</em>-integrals:</p>
<p class="math">Σ 1/<em>n<sup>p</sup></em> converges if and only if <em>p</em> &gt; 1</p>
<p>So Σ 1/<em>n</em>² converges (Euler showed in 1734 that its sum is π²/6), and Σ 1/√<em>n</em> diverges.</p>

<h3>Comparison tests</h3>
<p>For series of positive terms: if <em>a<sub>n</sub></em> ≤ <em>b<sub>n</sub></em> and Σ <em>b<sub>n</sub></em> converges, so does Σ <em>a<sub>n</sub></em>; if Σ <em>a<sub>n</sub></em> diverges, so does Σ <em>b<sub>n</sub></em>. The <strong>limit comparison test</strong> is often easier: if <em>a<sub>n</sub></em>/<em>b<sub>n</sub></em> → a positive finite limit, the two series behave the same. Σ 1/(<em>n</em>² + 3<em>n</em>) behaves like Σ 1/<em>n</em>², so converges. The habit: <strong>look at the dominant terms</strong>.</p>

<h3>The ratio test</h3>
<p>If |<em>a</em><sub><em>n</em>+1</sub>/<em>a<sub>n</sub></em>| → <em>L</em>, then the series converges (absolutely) if <em>L</em> &lt; 1, diverges if <em>L</em> &gt; 1, and the test says nothing if <em>L</em> = 1. It compares a series with a geometric one, and is ideal for factorials and exponentials. For Σ 2<sup><em>n</em></sup>/<em>n</em>!, the ratio is 2/(<em>n</em> + 1) → 0, so it converges. For any harmonic-like series the ratio tends to 1, and the test fails, which is why you need the others.</p>

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
<p><strong>The geometric series</strong> from last lesson, read as a function: 1/(1 − <em>x</em>) = 1 + <em>x</em> + <em>x</em>² + … for |<em>x</em>| &lt; 1. Integrating it term by term gives <strong>ln</strong>: ln(1 + <em>x</em>) = <em>x</em> − <em>x</em>²/2 + <em>x</em>³/3 − … for −1 &lt; <em>x</em> ≤ 1. (At <em>x</em> = 1 this is the alternating harmonic series, sum ln 2.)</p>

<h3>How good is the approximation?</h3>
<p><strong>Taylor's theorem</strong> bounds the error <em>R<sub>n</sub></em>(<em>x</em>) = <em>f</em>(<em>x</em>) − <em>T<sub>n</sub></em>(<em>x</em>): if |<em>f</em><sup>(<em>n</em>+1)</sup>| ≤ <em>M</em> between <em>a</em> and <em>x</em>, then</p>
<p class="math">|<em>R<sub>n</sub></em>(<em>x</em>)| ≤ <em>M</em> |<em>x</em> − <em>a</em>|<sup><em>n</em>+1</sup> / (<em>n</em> + 1)!</p>
<p>The error looks like the next term of the series. Two lessons follow: approximations are best <strong>close to <em>a</em></strong> (small |<em>x</em> − <em>a</em>|), and the factorial in the denominator eventually wins against any power, so more terms help. For sin(0.1) with <em>T</em>₃ = 0.1 − 0.001/6, all derivatives are bounded by 1, so the error is at most 0.1⁴/4! ≈ 4 × 10⁻⁶ (actually less, since the next nonzero term is degree 5: 0.1⁵/120 ≈ 8 × 10⁻⁸). Physicists' "small-angle approximation" sin θ ≈ θ is <em>T</em>₁, accurate to 1% up to about 14°.</p>

<h3>Power series and radius of convergence</h3>
<p>A <strong>power series</strong> is a "polynomial of infinite degree", Σ <em>c<sub>n</sub></em>(<em>x</em> − <em>a</em>)<sup><em>n</em></sup>. Every power series has a <strong>radius of convergence</strong> <em>R</em>: it converges for |<em>x</em> − <em>a</em>| &lt; <em>R</em> and diverges for |<em>x</em> − <em>a</em>| &gt; <em>R</em>. The ratio test finds <em>R</em>. For Σ <em>x<sup>n</sup></em>/<em>n</em>!, the ratio is |<em>x</em>|/(<em>n</em> + 1) → 0 for every <em>x</em>, so <em>R</em> = ∞: the series for e<sup><em>x</em></sup>, sin and cos converge everywhere. The series for 1/(1 − <em>x</em>) and ln(1 + <em>x</em>) have <em>R</em> = 1. Inside its radius, a power series can be differentiated and integrated term by term, which is how many series are found.</p>
<p>A beautiful consequence: substitute <em>x</em> = <em>iθ</em> into the series for e<sup><em>x</em></sup>, where <em>i</em>² = −1, and group real and imaginary terms. You get <strong>Euler's formula</strong>, e<sup><em>iθ</em></sup> = cos θ + <em>i</em> sin θ. It underlies signal processing, the Fourier transform and quantum computing.</p>

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
<p>Check: <em>dy</em>/<em>dt</em> = <em>ky</em>₀e<sup><em>kt</em></sup> = <em>ky</em>, and <em>y</em>(0) = <em>y</em>₀. If <em>k</em> &gt; 0 it's growth (unchecked populations, compound interest, the early spread of an epidemic); if <em>k</em> &lt; 0 it's decay (radioactive atoms, drug concentrations in the blood). The <strong>half-life</strong> is the time for <em>y</em> to halve: e<sup><em>kT</em></sup> = 1/2 gives <em>T</em> = ln 2/|<em>k</em>|. Carbon-14 has a half-life of about 5730 years, which is how radiocarbon dating works.</p>

<h3>Separation of variables</h3>
<p>If an equation can be written <em>dy</em>/<em>dx</em> = <em>g</em>(<em>x</em>)<em>h</em>(<em>y</em>), move all the <em>y</em>'s to one side and integrate:</p>
<p class="math">∫ <em>dy</em>/<em>h</em>(<em>y</em>) = ∫ <em>g</em>(<em>x</em>) <em>dx</em></p>
<p><strong>Newton's law of cooling.</strong> A cup of coffee at temperature <em>T</em> in a room at 20 °C: <em>dT</em>/<em>dt</em> = −<em>k</em>(<em>T</em> − 20). Separate: ∫ <em>dT</em>/(<em>T</em> − 20) = −∫ <em>k dt</em>, so ln |<em>T</em> − 20| = −<em>kt</em> + <em>C</em>, and <em>T</em>(<em>t</em>) = 20 + (<em>T</em>₀ − 20)e<sup>−<em>kt</em></sup>. If coffee at 90 °C is 60 °C after 10 minutes, then 40 = 70e<sup>−10<em>k</em></sup>, so <em>k</em> = ln(7/4)/10 ≈ 0.056 per minute. It reaches 40 °C when 20 = 70e<sup>−<em>kt</em></sup>: <em>t</em> = ln(3.5)/<em>k</em> ≈ 22.4 minutes.</p>

<h3>The logistic model</h3>
<p>Nothing grows exponentially forever. The <strong>logistic equation</strong> slows growth as the population <em>P</em> approaches a carrying capacity <em>K</em>:</p>
<p class="math"><em>dP</em>/<em>dt</em> = <em>rP</em>(1 − <em>P</em>/<em>K</em>)</p>
<p>When <em>P</em> is small, it's nearly exponential; as <em>P</em> → <em>K</em>, growth stops. Separation and partial fractions (Lesson 1) give</p>
<p class="math"><em>P</em>(<em>t</em>) = <em>K</em> / (1 + <em>A</em>e<sup>−<em>rt</em></sup>),  <em>A</em> = (<em>K</em> − <em>P</em>₀)/<em>P</em>₀</p>
<p>an S-shaped curve. It models populations, the spread of a rumor or a technology, and early epidemics. The same S-shaped function, 1/(1 + e<sup>−<em>x</em></sup>), called the <strong>sigmoid</strong>, appears in machine learning, in logistic regression and early neural networks.</p>

<h3>Slope fields</h3>
<p>A first-order equation <em>dy</em>/<em>dt</em> = <em>f</em>(<em>t</em>, <em>y</em>) tells you the slope of the solution at every point of the plane. Drawing short line segments with those slopes gives a <strong>slope field</strong>; solutions are curves that follow the segments. You can see the long-run behavior (does everything approach <em>K</em>? blow up? oscillate?) without solving anything. Equilibria are values where <em>f</em> = 0: for the logistic equation, <em>P</em> = 0 (unstable: nearby solutions move away) and <em>P</em> = <em>K</em> (stable: nearby solutions approach).</p>

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
<p>The error at a fixed time is roughly proportional to <em>h</em>: Euler's method is a <strong>first-order</strong> method. Halving <em>h</em> halves the error but doubles the work. Better methods, such as the fourth-order <strong>Runge–Kutta</strong> method (error ∝ <em>h</em>⁴), sample the slope several times per step; SciPy's <code>solve_ivp</code> uses adaptive versions. Simulations in physics, climate science, epidemiology and video-game engines are all built on this idea. In PHYS 150 you'll use it to simulate a thrown ball with air resistance, which has no formula solution.</p>
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

<h3>Partial derivatives</h3>
<p>The <strong>partial derivative</strong> ∂<em>f</em>/∂<em>x</em> is the rate of change of <em>f</em> as <em>x</em> changes with <em>y</em> held fixed. Compute it by treating <em>y</em> as a constant and differentiating as usual:</p>
<p class="math"><em>f</em>(<em>x</em>, <em>y</em>) = <em>x</em>²<em>y</em> + sin(<em>xy</em>):   ∂<em>f</em>/∂<em>x</em> = 2<em>xy</em> + <em>y</em> cos(<em>xy</em>),   ∂<em>f</em>/∂<em>y</em> = <em>x</em>² + <em>x</em> cos(<em>xy</em>)</p>
<p>Geometrically, ∂<em>f</em>/∂<em>x</em> is the slope of the surface in the <em>x</em>-direction: slice the surface with the plane <em>y</em> = constant and take the slope of the resulting curve. Other notations: <em>f<sub>x</sub></em>, <em>f<sub>y</sub></em>. Second partial derivatives work the same way: <em>f<sub>xx</sub></em>, <em>f<sub>yy</sub></em>, and the mixed <em>f<sub>xy</sub></em>, which equals <em>f<sub>yx</sub></em> for all the functions you'll meet (Clairaut's theorem).</p>
<p>Numerically, as in CS 101's derivative estimates: ∂<em>f</em>/∂<em>x</em> ≈ (<em>f</em>(<em>x</em> + <em>h</em>, <em>y</em>) − <em>f</em>(<em>x</em> − <em>h</em>, <em>y</em>))/(2<em>h</em>).</p>

<h3>Linear approximation and the tangent plane</h3>
<p>Near a point (<em>a</em>, <em>b</em>), a smooth function is approximately linear:</p>
<p class="math"><em>f</em>(<em>x</em>, <em>y</em>) ≈ <em>f</em>(<em>a</em>, <em>b</em>) + <em>f<sub>x</sub></em>(<em>a</em>, <em>b</em>)(<em>x</em> − <em>a</em>) + <em>f<sub>y</sub></em>(<em>a</em>, <em>b</em>)(<em>y</em> − <em>b</em>)</p>
<p>The right side's graph is the <strong>tangent plane</strong>. Each small change contributes its own slope times its own size, and the contributions add. For example, the volume of a cylinder <em>V</em> = π<em>r</em>²<em>h</em> with <em>r</em> = 3, <em>h</em> = 10: <em>V<sub>r</sub></em> = 2π<em>rh</em> = 60π, <em>V<sub>h</sub></em> = π<em>r</em>² = 9π. Errors of 0.1 in each measurement change the volume by about 60π(0.1) + 9π(0.1) = 6.9π ≈ 21.7, out of 90π ≈ 283. Note the radius error matters almost seven times as much as the height error; partial derivatives tell you which measurements to improve.</p>

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
<p>How fast does <em>f</em> change if you move in the direction of a unit vector <strong>u</strong> = (<em>u</em>₁, <em>u</em>₂)? By the linear approximation, moving a small distance <em>t</em> changes <em>f</em> by about <em>t</em>(<em>f<sub>x</sub>u</em>₁ + <em>f<sub>y</sub>u</em>₂). So the <strong>directional derivative</strong> is the dot product</p>
<p class="math"><em>D</em><sub><strong>u</strong></sub><em>f</em> = ∇<em>f</em> · <strong>u</strong> = |∇<em>f</em>| cos θ</p>
<p>where θ is the angle between ∇<em>f</em> and <strong>u</strong>. This proves the properties above: the rate is largest when θ = 0 (moving along the gradient), equal to −|∇<em>f</em>| when θ = π (moving against it), and zero when θ = π/2 (along the level curve).</p>
<p><strong>Example.</strong> At (1, 1) on <em>f</em> = <em>x</em>² + 2<em>y</em>², moving in the direction <strong>u</strong> = (1, 0) gives <em>D</em> = 2; in the direction (0, 1), 4; in the gradient direction (2, 4)/√20, the maximum rate √20 ≈ 4.47; and in the direction (2, −1)/√5, perpendicular to the gradient, 0.</p>
<p>Everything extends to any number of variables: a function of a million parameters has a gradient with a million components, still pointing uphill. The next lesson uses that to find minimums.</p>
`,
    terms: [
      ["Level curve", "A curve f(x, y) = c along which a function is constant; a contour map shows several."],
      ["Partial derivative", "The rate of change of f with respect to one variable, the others held fixed."],
      ["Tangent plane", "The graph of the linear approximation of f(x, y) near a point."],
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
    title: "Optimization, gradient descent and double integrals",
    minutes: 90,
    summary: "Finding minima and maxima of functions of several variables, least-squares fitting, gradient descent and the learning rate, and a first look at double integrals.",
    notes: `
<p>Optimization, finding the best choice among many, is everywhere in computing: fitting a line to data, routing deliveries, allocating servers, and, above all, training machine-learning models, which means adjusting millions of parameters to minimize an error. This lesson extends Calculus I's optimization to several variables, introduces the algorithm that trains nearly every neural network, and ends with integration over regions of the plane.</p>

<h3>Critical points</h3>
<p>At a local minimum or maximum of a smooth function, the surface is flat in every direction, so every partial derivative is zero: <strong>∇<em>f</em> = 0</strong>. Points where this happens are <strong>critical points</strong>. For <em>f</em>(<em>x</em>, <em>y</em>) = <em>x</em>² + <em>y</em>² − 4<em>x</em> + 6<em>y</em>: <em>f<sub>x</sub></em> = 2<em>x</em> − 4 = 0 and <em>f<sub>y</sub></em> = 2<em>y</em> + 6 = 0, so (2, −3) is the only critical point. Completing the square, <em>f</em> = (<em>x</em> − 2)² + (<em>y</em> + 3)² − 13, so it's a minimum with value −13.</p>
<p>In two variables a new possibility appears: a <strong>saddle point</strong>, like the center of <em>f</em> = <em>x</em>² − <em>y</em>², which is a minimum along the <em>x</em>-direction and a maximum along the <em>y</em>-direction. The <strong>second derivative test</strong> distinguishes the cases. At a critical point, compute <em>D</em> = <em>f<sub>xx</sub>f<sub>yy</sub></em> − (<em>f<sub>xy</sub></em>)²:</p>
<ul>
  <li><em>D</em> &gt; 0 and <em>f<sub>xx</sub></em> &gt; 0: local minimum.</li>
  <li><em>D</em> &gt; 0 and <em>f<sub>xx</sub></em> &lt; 0: local maximum.</li>
  <li><em>D</em> &lt; 0: saddle point.</li>
  <li><em>D</em> = 0: the test says nothing.</li>
</ul>
<p>For <em>x</em>² − <em>y</em>²: <em>f<sub>xx</sub></em> = 2, <em>f<sub>yy</sub></em> = −2, <em>f<sub>xy</sub></em> = 0, so <em>D</em> = −4 &lt; 0: a saddle. In high dimensions, saddle points vastly outnumber minima, which is one reason training large neural networks is subtle.</p>

<h3>Least squares: fitting a line</h3>
<p>Given data points (<em>x<sub>i</sub></em>, <em>y<sub>i</sub></em>), which line <em>y</em> = <em>mx</em> + <em>b</em> fits best? The standard answer minimizes the sum of squared vertical errors:</p>
<p class="math"><em>E</em>(<em>m</em>, <em>b</em>) = Σ (<em>y<sub>i</sub></em> − (<em>mx<sub>i</sub></em> + <em>b</em>))²</p>
<p>This is a function of the two unknowns <em>m</em> and <em>b</em>. Setting ∂<em>E</em>/∂<em>m</em> = 0 and ∂<em>E</em>/∂<em>b</em> = 0 gives two linear equations, the <strong>normal equations</strong>:</p>
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
<p>In machine learning, <em>f</em> is the average error over a training set, often millions of examples. <strong>Stochastic gradient descent</strong> estimates the gradient from a small random batch at each step, which is noisy but vastly cheaper. Combined with automatic differentiation to compute gradients, this simple loop trains essentially every modern neural network.</p>
<p>A caveat: gradient descent finds a <em>local</em> minimum, wherever the downhill walk leads. For a <strong>convex</strong> function (bowl-shaped everywhere, like least squares), any local minimum is the global one. Most machine-learning objectives aren't convex, yet gradient descent works remarkably well on them, for reasons that are still an active research question.</p>

<h3>Constrained optimization, briefly</h3>
<p>Often the variables must satisfy a constraint: maximize <em>f</em>(<em>x</em>, <em>y</em>) subject to <em>g</em>(<em>x</em>, <em>y</em>) = <em>c</em>. At the best point, the level curve of <em>f</em> just touches the constraint curve, so their gradients are parallel: ∇<em>f</em> = λ∇<em>g</em> for some number λ, the <strong>Lagrange multiplier</strong>. For example, the rectangle of perimeter 40 with the largest area: maximize <em>xy</em> subject to 2<em>x</em> + 2<em>y</em> = 40. ∇(<em>xy</em>) = (<em>y</em>, <em>x</em>) = λ(2, 2) gives <em>x</em> = <em>y</em> = 10: a square.</p>

<h3>Double integrals</h3>
<p>Single integrals add up <em>f</em>(<em>x</em>) <em>dx</em> over an interval. Double integrals add up <em>f</em>(<em>x</em>, <em>y</em>) <em>dA</em> over a region <em>R</em> of the plane, where <em>dA</em> is a tiny area. If <em>f</em> ≥ 0, the result is the volume under the surface. Over a rectangle [<em>a</em>, <em>b</em>] × [<em>c</em>, <em>d</em>], compute it as an <strong>iterated integral</strong>: integrate in one variable with the other fixed, then integrate the result.</p>
<p class="math">∬<sub><em>R</em></sub> (<em>x</em> + <em>y</em>) <em>dA</em> over [0, 1] × [0, 2] = ∫<sub>0</sub><sup>1</sup> ( ∫<sub>0</sub><sup>2</sup> (<em>x</em> + <em>y</em>) <em>dy</em> ) <em>dx</em> = ∫<sub>0</sub><sup>1</sup> (2<em>x</em> + 2) <em>dx</em> = 3</p>
<p>Fubini's theorem says the order doesn't matter for well-behaved functions; integrating in <em>x</em> first gives the same 3. Double integrals compute masses of plates with varying density, averages over regions (the average of <em>x</em> + <em>y</em> on that rectangle is 3/2), and probabilities for two random variables at once. For regions in many dimensions, numerical methods break down (a grid with 10 points per side in 100 dimensions has 10¹⁰⁰ points), so scientists use <strong>Monte Carlo integration</strong>: average <em>f</em> at random points. Its error shrinks like 1/√<em>N</em> regardless of dimension.</p>
`,
    terms: [
      ["Critical point", "A point where ∇f = 0."],
      ["Saddle point", "A critical point that is a minimum in some directions and a maximum in others."],
      ["Second derivative test", "D = f_xx f_yy − f_xy² classifies critical points as minima, maxima or saddles."],
      ["Least squares", "Choosing model parameters to minimize the sum of squared errors."],
      ["Gradient descent", "Minimizing f by repeatedly stepping opposite the gradient: x ← x − α∇f(x)."],
      ["Learning rate", "The step size α in gradient descent."],
      ["Convex function", "A bowl-shaped function, for which every local minimum is a global minimum."],
      ["Double integral", "∬ f dA, the sum of f over a region of the plane; computed as an iterated integral."]
    ],
    quiz: [
      { q: "At a local minimum of a smooth <em>f</em>(<em>x</em>, <em>y</em>):", choices: ["∇f points down", "∇f = 0", "f = 0", "D < 0"], answer: 1, why: "Every partial derivative is zero at an interior extreme point." },
      { q: "At a critical point, <em>f<sub>xx</sub></em> = 4, <em>f<sub>yy</sub></em> = 1, <em>f<sub>xy</sub></em> = 3. The point is:", choices: ["A minimum", "A maximum", "A saddle", "Can't tell"], answer: 2, why: "D = 4 − 9 = −5 < 0." },
      { q: "Gradient descent steps in which direction?", choices: ["Along ∇f", "Opposite ∇f", "Perpendicular to ∇f", "Randomly"], answer: 1, why: "−∇f is the direction of steepest decrease." },
      { q: "For <em>f</em> = <em>x</em>² + 2<em>y</em>², which learning rate makes gradient descent diverge?", choices: ["0.05", "0.2", "0.45", "0.6"], answer: 3, why: "The y factor is 1 − 4α; it has magnitude above 1 when α > 0.5." },
      { q: "∫<sub>0</sub><sup>2</sup>∫<sub>0</sub><sup>3</sup> <em>xy</em> <em>dy dx</em> equals:", choices: ["9", "6", "18", "4.5"], answer: 0, why: "∫₀³ y dy = 4.5, ∫₀² x dx = 2; product 9." }
    ],
    practice: [
      { q: `<p>Find and classify the critical points of <em>f</em>(<em>x</em>, <em>y</em>) = <em>x</em>³ − 3<em>x</em> + <em>y</em>².</p>`, a: `<p><em>f<sub>x</sub></em> = 3<em>x</em>² − 3 = 0 gives <em>x</em> = ±1; <em>f<sub>y</sub></em> = 2<em>y</em> = 0 gives <em>y</em> = 0. <em>f<sub>xx</sub></em> = 6<em>x</em>, <em>f<sub>yy</sub></em> = 2, <em>f<sub>xy</sub></em> = 0. At (1, 0): <em>D</em> = 12 &gt; 0, <em>f<sub>xx</sub></em> &gt; 0: local minimum (value −2). At (−1, 0): <em>D</em> = −12: saddle.</p>` },
      { q: `<p>Fit a least-squares line to (1, 2), (2, 3), (3, 5).</p>`, a: `<p>Σ<em>x</em> = 6, Σ<em>y</em> = 10, Σ<em>x</em>² = 14, Σ<em>xy</em> = 2 + 6 + 15 = 23, <em>n</em> = 3. Equations: 14<em>m</em> + 6<em>b</em> = 23, 6<em>m</em> + 3<em>b</em> = 10. Doubling the second: 12<em>m</em> + 6<em>b</em> = 20; subtract: 2<em>m</em> = 3, <em>m</em> = 1.5, <em>b</em> = (10 − 9)/3 = 1/3. Line: <em>y</em> = 1.5<em>x</em> + 1/3.</p>` },
      { q: `<p>Run gradient descent by hand for two steps on <em>f</em>(<em>x</em>, <em>y</em>) = (<em>x</em> − 3)² + (<em>y</em> + 1)², from (0, 0) with α = 0.25. Where is it heading?</p>`, a: `<p>∇<em>f</em> = (2(<em>x</em> − 3), 2(<em>y</em> + 1)). At (0, 0): (−6, 2); step: (0, 0) − 0.25(−6, 2) = (1.5, −0.5). At (1.5, −0.5): (−3, 1); step: (2.25, −0.75). Each step halves the distance to the minimum at (3, −1).</p>` },
      { q: `<p>Use gradient descent in Python to fit the least-squares line for the lesson's four points, starting from <em>m</em> = <em>b</em> = 0, and compare with <em>m</em> = 1.6, <em>b</em> = 1.1. Try learning rates 0.01, 0.05 and 0.1.</p>`, a: `<pre><code>xs, ys = [0, 1, 2, 3], [1, 3, 4, 6]

def grad(m, b):
    gm = sum(-2 * x * (y - (m * x + b)) for x, y in zip(xs, ys))
    gb = sum(-2 * (y - (m * x + b)) for x, y in zip(xs, ys))
    return gm, gb

for rate in (0.01, 0.05, 0.1):
    m = b = 0.0
    for _ in range(2000):
        gm, gb = grad(m, b)
        m, b = m - rate * gm, b - rate * gb
    print(rate, m, b)</code></pre><p>0.01 and 0.05 converge to (1.6, 1.1); 0.1 is too large here and diverges. Choosing the learning rate is a real practical problem in machine learning.</p>` },
      { q: `<p>Estimate ∬ e<sup>−(<em>x</em>² + <em>y</em>²)</sup> <em>dA</em> over the square [−3, 3] × [−3, 3] by Monte Carlo with 100,000 random points. Compare with π (the integral over the whole plane).</p>`, a: `<pre><code>import random, math
N = 100_000
total = sum(math.exp(-(random.uniform(-3, 3)**2 + random.uniform(-3, 3)**2)) for _ in range(N))
print(36 * total / N, math.pi)   # about 3.14 (area 36 times the average value)</code></pre><p>The square misses only a tiny amount of the function's mass. This integral is also how one proves ∫ e<sup>−<em>x</em>²</sup> <em>dx</em> = √π over the whole line.</p>` }
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
<p>The chain rule says how a change in <em>x</em> flows through: ∂<em>f</em>/∂<em>x</em> = ∂<em>f</em>/∂<em>b</em> · ∂<em>b</em>/∂<em>a</em> · ∂<em>a</em>/∂<em>x</em> + ∂<em>f</em>/∂<em>x</em>(direct) = 1 · cos(<em>a</em>) · <em>y</em> + 1.</p>

<h3>Forward mode: dual numbers</h3>
<p>Carry, alongside every value, its derivative with respect to one chosen input. Each operation updates both, using its derivative rule. This is elegantly implemented with operator overloading (CS 102, Lesson 2):</p>
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
  <li>Use your <code>Dual</code> class inside Newton's method to find a root of cos <em>x</em> = <em>x</em> without writing the derivative by hand.</li>
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
