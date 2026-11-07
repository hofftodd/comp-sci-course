CSA.addCourse({
  id: "math130",
  code: "MATH 130",
  title: "Calculus I",
  credits: 4,
  kind: "required",
  term: "y1f",
  summary: "Limits, derivatives and integrals, taught with an eye on computing: numerical approximation, optimization, and the gradient methods behind modern machine learning. Starts with a review of the precalculus you'll need.",
  prereqs: ["High-school algebra and trigonometry"],
  outcomes: [
    "Work fluently with functions, exponents, logarithms and trigonometric functions",
    "Compute limits by several techniques and decide where functions are continuous",
    "Explain the derivative as a limit, a slope and a rate of change",
    "Differentiate using the power, product, quotient and chain rules, and implicitly",
    "Solve optimization and related-rates problems, and use the Mean Value Theorem",
    "Use linear approximation, L'Hôpital's rule and Newton's method",
    "Compute definite integrals with Riemann sums and the Fundamental Theorem of Calculus"
  ],
  rubric: {
    criteriaFor: "written solutions on problem sets and exams",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Weekly problem sets", weight: 25, desc: "Computation, application and short explanation problems based on each lesson's practice set. Graded with the criteria below; show your work." },
      { name: "Computing labs", weight: 10, desc: "Three short Python notebooks: numerical limits and derivatives, Newton's method and gradient descent, and Riemann sums. Graded on correctness and a written interpretation of the results." },
      { name: "Midterm exams", weight: 25, desc: "Two in-class exams: precalculus through derivatives (lessons 1–7), then applications (lessons 8–9)." },
      { name: "Final exam", weight: 30, desc: "Cumulative, with emphasis on integration (lessons 10–11). A one-page sheet of formulas is provided." }
    ],
    criteria: [
      { name: "Setup", desc: "Is the problem modeled correctly?", levels: [
        "Defines variables with units, draws a diagram where useful, and writes the correct equation or integral.",
        "Correct setup with a small omission, such as missing units.",
        "Partly correct setup; an important relationship is missing or wrong.",
        "No meaningful setup." ] },
      { name: "Method", desc: "Are the right techniques applied correctly?", levels: [
        "Chooses an appropriate technique and applies every rule correctly.",
        "Right technique with one minor slip, such as a sign error.",
        "Right idea, but a rule is applied incorrectly, such as the chain rule missed.",
        "Inappropriate technique or none." ] },
      { name: "Justification", desc: "Are the steps explained?", levels: [
        "Each step is shown and justified; theorems are named and their conditions checked.",
        "Most steps are shown; a theorem's conditions aren't checked.",
        "Key steps are missing, so the reader must guess how the answer was reached.",
        "Only a final answer." ] },
      { name: "Answer and interpretation", desc: "Is the result correct and meaningful?", levels: [
        "Correct, simplified, with units, and interpreted in context; checked for reasonableness.",
        "Correct but not interpreted or missing units.",
        "Incorrect, but consistent with an earlier error.",
        "Incorrect and unreasonable, such as a negative length." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Show your work:</b> a correct final answer without supporting work earns little credit; clear work with a small arithmetic slip earns most of it.",
      "<b>Collaboration:</b> discuss problem sets freely, but write up your own solutions and name your collaborators.",
      "<b>Calculators and AI:</b> allowed on problem sets and labs (say how you used them), not on exams. Use them to check your work, not to replace it.",
      "<b>Late work:</b> two late days for the term on problem sets and labs."
    ]
  }
});

CSA.addUnits("math130", [
  {
    id: "pre",
    title: "Functions: a precalculus review",
    minutes: 90,
    summary: "Functions, domain and range, lines and slope, polynomials, exponents, and exponential and logarithmic functions: the algebra calculus relies on.",
    notes: `
<p>Calculus is the mathematics of change, and everything in it is about <strong>functions</strong>. Most mistakes in a first calculus course aren't calculus mistakes at all; they're algebra, exponent, logarithm or trigonometry slips. This lesson and <a href="#c-math130-trig">the next</a> review exactly what you'll need: this one covers functions, lines, polynomials, exponents, exponentials and logarithms, and the next covers trigonometry, inverse functions and transformations. If it all feels familiar, work the practice problems to confirm it and move on.</p>

<h3>Functions, domain and range</h3>
<p>A <strong>function</strong> <em>f</em> assigns to each input <em>x</em> in its <strong>domain</strong> exactly one output <em>f</em>(<em>x</em>). The set of outputs is its <strong>range</strong>. When a function is given by a formula, its domain is usually every real number for which the formula makes sense. Two restrictions come up constantly:</p>
<ul>
  <li>You can't divide by zero: <em>f</em>(<em>x</em>) = 1/(<em>x</em> − 3) has domain all <em>x</em> ≠ 3.</li>
  <li>You can't take the square root (or any even root) of a negative number, or the logarithm of a non-positive one: √(<em>x</em> − 2) needs <em>x</em> ≥ 2, and ln <em>x</em> needs <em>x</em> &gt; 0.</li>
</ul>
<p>The <strong>graph</strong> of <em>f</em> is the set of points (<em>x</em>, <em>f</em>(<em>x</em>)). A curve is the graph of a function exactly when every vertical line crosses it at most once (the vertical line test): one input, one output.</p>

<h3>Lines and slope</h3>
<p>The <strong>slope</strong> of the line through (<em>x</em>₁, <em>y</em>₁) and (<em>x</em>₂, <em>y</em>₂) is</p>
<p class="math">m = (y₂ − y₁) / (x₂ − x₁) = rise / run</p>
<p>It measures how fast <em>y</em> changes per unit change in <em>x</em>. The <strong>point-slope form</strong> of a line through (<em>a</em>, <em>b</em>) with slope <em>m</em> is <em>y</em> − <em>b</em> = <em>m</em>(<em>x</em> − <em>a</em>), and the slope-intercept form is <em>y</em> = <em>mx</em> + <em>c</em>. Point-slope form is the one calculus uses most, because the derivative gives you a slope at a specific point. Slope is the single most important idea to have firmly in mind before calculus: the derivative is "the slope of a curve".</p>

<h3>Polynomials and rational functions</h3>
<p>A <strong>polynomial</strong> is a sum of terms <em>a</em>·<em>x</em><sup>n</sup> with whole-number powers, like 3<em>x</em>⁴ − <em>x</em> + 7. Its <strong>degree</strong> is the highest power. A <strong>rational function</strong> is a ratio of polynomials, like (<em>x</em>² − 1)/(<em>x</em> − 1). Know how to factor:</p>
<ul>
  <li>Difference of squares: <em>a</em>² − <em>b</em>² = (<em>a</em> − <em>b</em>)(<em>a</em> + <em>b</em>)</li>
  <li>Simple quadratics: <em>x</em>² − 5<em>x</em> + 6 = (<em>x</em> − 2)(<em>x</em> − 3), found by asking which two numbers multiply to 6 and add to −5</li>
  <li>The quadratic formula: <em>ax</em>² + <em>bx</em> + <em>c</em> = 0 has solutions <em>x</em> = (−<em>b</em> ± √(<em>b</em>² − 4<em>ac</em>)) / 2<em>a</em></li>
</ul>
<p>Factoring is the main technique for limits in the next lesson, so it's worth getting quick at it.</p>

<h3>Exponents</h3>
<table>
  <thead><tr><th>Rule</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td><em>a</em><sup>m</sup> · <em>a</em><sup>n</sup> = <em>a</em><sup>m+n</sup></td><td>2³ · 2⁴ = 2⁷</td></tr>
    <tr><td><em>a</em><sup>m</sup> / <em>a</em><sup>n</sup> = <em>a</em><sup>m−n</sup></td><td><em>x</em>⁵/<em>x</em>² = <em>x</em>³</td></tr>
    <tr><td>(<em>a</em><sup>m</sup>)<sup>n</sup> = <em>a</em><sup>mn</sup></td><td>(<em>x</em>²)³ = <em>x</em>⁶</td></tr>
    <tr><td><em>a</em>⁰ = 1</td><td>7⁰ = 1</td></tr>
    <tr><td><em>a</em><sup>−n</sup> = 1/<em>a</em><sup>n</sup></td><td><em>x</em><sup>−2</sup> = 1/<em>x</em>²</td></tr>
    <tr><td><em>a</em><sup>1/n</sup> = ⁿ√<em>a</em></td><td><em>x</em><sup>1/2</sup> = √<em>x</em>; 8<sup>1/3</sup> = 2</td></tr>
  </tbody>
</table>
<p>The last two rows matter for derivatives: before differentiating 1/<em>x</em>³ or √<em>x</em>, rewrite them as <em>x</em><sup>−3</sup> and <em>x</em><sup>1/2</sup>. A common mistake: (<em>a</em> + <em>b</em>)² is <em>not</em> <em>a</em>² + <em>b</em>²; it's <em>a</em>² + 2<em>ab</em> + <em>b</em>².</p>

<h3>Exponential functions and logarithms</h3>
<p>An <strong>exponential function</strong> has the variable in the exponent: <em>f</em>(<em>x</em>) = <em>b</em><sup>x</sup> with <em>b</em> &gt; 0. It grows by the same <em>factor</em> every time <em>x</em> increases by 1, which is how populations and compound interest grow. (Later this term, CS 101's Recursion lesson shows a short program whose running time grows this way too.) The most important base is <strong><em>e</em> ≈ 2.71828</strong>. Here is what singles it out. Every graph <em>y</em> = <em>b</em><sup>x</sup> passes through (0, 1), but at different steepness: there, 2<sup>x</sup> rises with slope about 0.69 and 3<sup>x</sup> with slope about 1.10. Somewhere between 2 and 3 is the base whose graph has slope <em>exactly</em> 1 at (0, 1), and that base is <em>e</em>. You can check it numerically: for a tiny step <em>h</em>, the slope (<em>b</em><sup>h</sup> − 1)/<em>h</em> with <em>h</em> = 0.000001 is 0.693… for <em>b</em> = 2, 1.0986… for <em>b</em> = 3, and 1.0000005 for <em>b</em> = 2.718281828, where the tiny excess over 1 comes from <em>h</em> not being exactly 0. (Limits make "slope at a point" precise in the next lessons.) This one fact is why <em>e</em><sup>x</sup> turns out to be its own derivative, as <a href="#c-math130-u4">Differentiation rules</a> shows.</p>
<p>A <strong>logarithm</strong> undoes an exponential: log<sub>b</sub> <em>x</em> = <em>y</em> means <em>b</em><sup>y</sup> = <em>x</em>. So log₂ 8 = 3 because 2³ = 8, and log₁₀ 1000 = 3. The natural logarithm ln <em>x</em> is log<sub>e</sub> <em>x</em>.</p>
<table>
  <thead><tr><th>Rule</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>log(<em>xy</em>) = log <em>x</em> + log <em>y</em></td><td>log₂ 32 = log₂ 4 + log₂ 8 = 2 + 3</td></tr>
    <tr><td>log(<em>x</em>/<em>y</em>) = log <em>x</em> − log <em>y</em></td><td>ln(<em>e</em>⁵/<em>e</em>²) = 5 − 2 = 3</td></tr>
    <tr><td>log(<em>x</em><sup>p</sup>) = <em>p</em> · log <em>x</em></td><td>log₂ 2<sup>10</sup> = 10</td></tr>
    <tr><td>log<sub>b</sub> 1 = 0 and log<sub>b</sub> <em>b</em> = 1</td><td>ln 1 = 0, ln <em>e</em> = 1</td></tr>
    <tr><td>log<sub>b</sub> <em>x</em> = ln <em>x</em> / ln <em>b</em></td><td>log₂ 10 = ln 10 / ln 2 ≈ 3.32</td></tr>
  </tbody>
</table>
<p>Logarithms are everywhere in computer science: binary search takes about log₂ <em>n</em> steps, writing a number <em>n</em> in binary takes about log₂ <em>n</em> bits (binary digits; 1000 needs 10 bits because 2<sup>10</sup> = 1024 is just above it; see <a href="#c-cs101-u1">CS 101, Values, types and expressions</a>), and a tournament of <em>n</em> players where half are knocked out each round takes about log₂ <em>n</em> rounds. Exponentials and logs are inverse functions: <em>e</em><sup>ln <em>x</em></sup> = <em>x</em> and ln(<em>e</em><sup>x</sup>) = <em>x</em>.</p>
`,
    terms: [
      ["Domain", "The set of inputs for which a function is defined."],
      ["Range", "The set of outputs a function actually produces."],
      ["Slope", "Rise over run: how fast y changes per unit change in x."],
      ["Point-slope form", "y − b = m(x − a), the line through (a, b) with slope m."],
      ["Exponential function", "A function with the variable in the exponent, such as eˣ or 2ˣ."],
      ["Logarithm", "log_b x = y means b^y = x; the inverse of an exponential."]
    ],
    quiz: [
      { q: "What is the domain of f(x) = √(x − 4) / (x − 6)?", choices: ["x ≥ 4", "x ≥ 4 and x ≠ 6", "x > 6", "All real numbers"], answer: 1, why: "The square root needs x − 4 ≥ 0, and the denominator can't be zero, so x ≠ 6." },
      { q: "Rewrite 1/√x as a power of x.", choices: ["x^(1/2)", "x^(−2)", "x^(−1/2)", "x^2"], answer: 2, why: "√x = x^(1/2), and 1/x^(1/2) = x^(−1/2)." },
      { q: "What is log₂ 64?", choices: ["5", "6", "8", "32"], answer: 1, why: "2⁶ = 64." },
      { q: "What is ln(e<sup>5</sup> · e<sup>2</sup>)?", choices: ["7", "10", "e<sup>7</sup>", "5/2"], answer: 0, why: "ln(e<sup>5</sup> · e<sup>2</sup>) = ln e<sup>7</sup> = 7; or, by the product rule for logs, 5 + 2." }
    ],
    practice: [
      { q: `<p>Find the domain of each: (a) <em>f</em>(<em>x</em>) = 1/(<em>x</em>² − 9). (b) <em>g</em>(<em>x</em>) = √(5 − 2<em>x</em>). (c) <em>h</em>(<em>x</em>) = ln(<em>x</em> + 1).</p>`, a: `<p>(a) <em>x</em>² − 9 = 0 at <em>x</em> = ±3, so all <em>x</em> except 3 and −3. (b) 5 − 2<em>x</em> ≥ 0, so <em>x</em> ≤ 5/2. (c) <em>x</em> + 1 &gt; 0, so <em>x</em> &gt; −1.</p>` },
      { q: `<p>Find the equation of the line through (2, 5) with slope −3, in point-slope and slope-intercept form. Where does it cross the <em>x</em>-axis?</p>`, a: `<p>Point-slope: <em>y</em> − 5 = −3(<em>x</em> − 2). Expanding: <em>y</em> = −3<em>x</em> + 11. It crosses the <em>x</em>-axis where <em>y</em> = 0: <em>x</em> = 11/3.</p>` },
      { q: `<p>Factor: (a) <em>x</em>² − 16. (b) <em>x</em>² + <em>x</em> − 12. (c) <em>x</em>³ − 4<em>x</em>. Then solve 2<em>x</em>² − 3<em>x</em> − 2 = 0 with the quadratic formula.</p>`, a: `<p>(a) (<em>x</em> − 4)(<em>x</em> + 4). (b) (<em>x</em> + 4)(<em>x</em> − 3). (c) <em>x</em>(<em>x</em>² − 4) = <em>x</em>(<em>x</em> − 2)(<em>x</em> + 2). For 2<em>x</em>² − 3<em>x</em> − 2: <em>x</em> = (3 ± √(9 + 16))/4 = (3 ± 5)/4, so <em>x</em> = 2 or <em>x</em> = −1/2.</p>` },
      { q: `<p>Simplify, writing each as a single power of <em>x</em>: (a) <em>x</em>³ · <em>x</em><sup>−5</sup>. (b) (<em>x</em><sup>2/3</sup>)³. (c) √<em>x</em> / <em>x</em>². (d) 1/∛(<em>x</em>²).</p>`, a: `<p>(a) <em>x</em><sup>−2</sup>. (b) <em>x</em>². (c) <em>x</em><sup>1/2 − 2</sup> = <em>x</em><sup>−3/2</sup>. (d) <em>x</em><sup>−2/3</sup>.</p>` },
      { q: `<p>Solve for <em>x</em>: (a) 2<sup>x</sup> = 32. (b) <em>e</em><sup>2x</sup> = 7. (c) log₃(<em>x</em> − 1) = 2. (d) ln <em>x</em> + ln 4 = ln 20.</p>`, a: `<p>(a) <em>x</em> = 5. (b) Take ln of both sides: 2<em>x</em> = ln 7, so <em>x</em> = (ln 7)/2 ≈ 0.973. (c) <em>x</em> − 1 = 3² = 9, so <em>x</em> = 10. (d) ln(4<em>x</em>) = ln 20, so 4<em>x</em> = 20 and <em>x</em> = 5.</p>` },
      { q: `<p>A sorted list of a billion (10⁹) items is searched with binary search, which takes about log₂ <em>n</em> steps. Estimate the number of steps without a calculator, using 2¹⁰ ≈ 10³.</p>`, a: `<p>10⁹ = (10³)³ ≈ (2¹⁰)³ = 2³⁰, so log₂ 10⁹ ≈ 30 steps.</p>` }
    ],
    sources: ["openstaxcalc"]
  },
  {
    id: "trig",
    title: "Trigonometry, inverse functions and transformations",
    minutes: 90,
    summary: "Angles in radians and the trigonometric functions, composing and transforming functions, inverse functions including arcsin, arccos and arctan, and floor and ceiling.",
    notes: `
<p>This lesson finishes the precalculus review begun in <a href="#c-math130-pre">the previous lesson</a>. It covers angles and the trigonometric functions, building new functions by composing and transforming old ones, inverse functions (including the inverse trigonometric functions that integrals will need), and the floor and ceiling functions.</p>

<h3>Trigonometric functions, in radians</h3>
<p>Calculus measures angles in <strong>radians</strong>, not degrees: an angle's radian measure is the length of the arc it cuts from a circle of radius 1. A full turn is 2π radians, so 180° = π and 90° = π/2. Calculus formulas, such as "the derivative of sin <em>x</em> is cos <em>x</em>", are only true in radians, and Python's <code>math.sin</code> expects radians too.</p>
<p>On the unit circle, the point at angle θ is (cos θ, sin θ). The values to know by heart:</p>
<table>
  <thead><tr><th>θ</th><th>0</th><th>π/6 (30°)</th><th>π/4 (45°)</th><th>π/3 (60°)</th><th>π/2 (90°)</th><th>π (180°)</th></tr></thead>
  <tbody>
    <tr><td>sin θ</td><td>0</td><td>1/2</td><td>√2/2</td><td>√3/2</td><td>1</td><td>0</td></tr>
    <tr><td>cos θ</td><td>1</td><td>√3/2</td><td>√2/2</td><td>1/2</td><td>0</td><td>−1</td></tr>
  </tbody>
</table>
<p>Also tan θ = sin θ / cos θ, and the identity sin² θ + cos² θ = 1 (which is the Pythagorean theorem on the unit circle). Sine and cosine repeat every 2π, which is why they model anything periodic: sound waves, seasons, alternating current.</p>
<p>Three more functions are reciprocals of these, and they appear in derivative formulas: the <strong>secant</strong> sec θ = 1/cos θ, the <strong>cosecant</strong> csc θ = 1/sin θ, and the <strong>cotangent</strong> cot θ = cos θ/sin θ. Each is undefined where its denominator is 0. Dividing sin² θ + cos² θ = 1 by cos² θ gives a second identity you'll use with them:</p>
<p class="math">1 + tan² θ = sec² θ</p>

<h3>Combining and transforming functions</h3>
<p>The <strong>composition</strong> (<em>f</em> ∘ <em>g</em>)(<em>x</em>) = <em>f</em>(<em>g</em>(<em>x</em>)) feeds one function's output into another. Spotting compositions is the key skill for the chain rule later: √(<em>x</em>² + 1) is the square root function applied to <em>x</em>² + 1, and <em>e</em><sup>3x</sup> is the exponential applied to 3<em>x</em>.</p>
<p>Changing a formula moves its graph predictably:</p>
<ul>
  <li><em>f</em>(<em>x</em>) + <em>c</em> shifts the graph up by <em>c</em>; <em>f</em>(<em>x</em> − <em>c</em>) shifts it right by <em>c</em> (note the minus sign).</li>
  <li><em>c</em> · <em>f</em>(<em>x</em>) stretches it vertically by <em>c</em>; −<em>f</em>(<em>x</em>) flips it over the <em>x</em>-axis.</li>
</ul>
<p>So (<em>x</em> − 2)² + 1 is the parabola <em>x</em>² moved right 2 and up 1, with its lowest point at (2, 1).</p>
<h3>Inverse functions and inverse trigonometric functions</h3>
<p>The <strong>inverse</strong> of a function <em>f</em>, written <em>f</em><sup>−1</sup>, undoes it: if <em>f</em>(<em>a</em>) = <em>b</em>, then <em>f</em><sup>−1</sup>(<em>b</em>) = <em>a</em>. You have already met one pair: ln undoes <em>e</em><sup>x</sup>. An inverse exists only if <em>f</em> never gives two inputs the same output; otherwise the inverse wouldn't know which input to return. The graph of <em>f</em><sup>−1</sup> is the graph of <em>f</em> reflected in the line <em>y</em> = <em>x</em>, because reflecting swaps each point (<em>a</em>, <em>b</em>) with (<em>b</em>, <em>a</em>).</p>
<p>Sine, cosine and tangent repeat, so they give many inputs the same output (sin 0 = sin π = 0). To invert them we restrict each to one stretch where it takes every value exactly once. The table uses <strong>interval notation</strong>: [<em>a</em>, <em>b</em>] means all numbers from <em>a</em> to <em>b</em> <em>including</em> both ends, and (<em>a</em>, <em>b</em>) means all numbers strictly between them, <em>excluding</em> both ends. So [−1, 1] includes −1 and 1, while (−π/2, π/2) does not include ±π/2.</p>
<table>
  <thead><tr><th>Inverse</th><th>Means</th><th>Accepts <em>x</em> in</th><th>Returns an angle in</th><th>Examples</th></tr></thead>
  <tbody>
    <tr><td>arcsin <em>x</em></td><td>the angle whose sine is <em>x</em></td><td>[−1, 1]</td><td>[−π/2, π/2]</td><td>arcsin(1/2) = π/6, arcsin 1 = π/2</td></tr>
    <tr><td>arccos <em>x</em></td><td>the angle whose cosine is <em>x</em></td><td>[−1, 1]</td><td>[0, π]</td><td>arccos(1/2) = π/3, arccos 0 = π/2</td></tr>
    <tr><td>arctan <em>x</em></td><td>the angle whose tangent is <em>x</em></td><td>all real numbers</td><td>(−π/2, π/2)</td><td>arctan 1 = π/4, arctan(−1) = −π/4, arctan √3 = π/3</td></tr>
  </tbody>
</table>
<p>To evaluate one, ask the question it names, using the table of known values above. <em>Example:</em> arctan √3 asks "which angle between −π/2 and π/2 has tangent √3?" Since tan(π/3) = (√3/2)/(1/2) = √3, the answer is π/3. Note also that arcsin 2 is undefined: no angle has sine 2.</p>
<figure class="fig">
<svg viewBox="0 0 440 200" role="img" aria-label="Graph of y = arctan x for x from −6 to 6: an S-shaped curve through the origin that rises steeply near 0 and levels off toward the dashed horizontal asymptotes y = π/2 above and y = −π/2 below. The point (1, π/4) is marked.">
  <line x1="20" y1="100" x2="425" y2="100" class="ax"/><line x1="220" y1="10" x2="220" y2="192" class="ax"/>
  <line x1="30.0" y1="97" x2="30.0" y2="103" class="ax"/><line x1="93.3" y1="97" x2="93.3" y2="103" class="ax"/><line x1="156.7" y1="97" x2="156.7" y2="103" class="ax"/><line x1="283.3" y1="97" x2="283.3" y2="103" class="ax"/><line x1="346.7" y1="97" x2="346.7" y2="103" class="ax"/><line x1="410.0" y1="97" x2="410.0" y2="103" class="ax"/>
  <text x="279.3" y="116" class="m">2</text><text x="342.7" y="116" class="m">4</text><text x="148.7" y="116" class="m">−2</text><text x="85.3" y="116" class="m">−4</text>
  <line x1="20" y1="21.5" x2="425" y2="21.5" class="ax dash"/><line x1="20" y1="178.5" x2="425" y2="178.5" class="ax dash"/>
  <path d="M30.0,170.3 L37.9,169.9 L45.8,169.5 L53.8,169.1 L61.7,168.7 L69.6,168.2 L77.5,167.6 L85.4,167.0 L93.3,166.3 L101.2,165.5 L109.2,164.6 L117.1,163.6 L125.0,162.5 L132.9,161.1 L140.8,159.5 L148.8,157.6 L156.7,155.4 L164.6,152.6 L172.5,149.1 L180.4,144.8 L188.3,139.3 L196.2,132.2 L204.2,123.2 L212.1,112.2 L220.0,100.0 L227.9,87.8 L235.8,76.8 L243.8,67.8 L251.7,60.7 L259.6,55.2 L267.5,50.9 L275.4,47.4 L283.3,44.6 L291.2,42.4 L299.2,40.5 L307.1,38.9 L315.0,37.5 L322.9,36.4 L330.8,35.4 L338.8,34.5 L346.7,33.7 L354.6,33.0 L362.5,32.4 L370.4,31.8 L378.3,31.3 L386.2,30.9 L394.2,30.5 L402.1,30.1 L410.0,29.7" class="cv" fill="none"/>
  <circle cx="251.7" cy="60.7" r="4" class="dot"/>
  <text x="259.7" y="78.7" class="m">(1, π/4)</text>
  <text x="26" y="16.5" class="m">y = π/2</text>
  <text x="340" y="172.5" class="m">y = −π/2</text>
  <text x="328" y="66">y = arctan x</text>
</svg>
<figcaption>arctan takes any real number and returns an angle strictly between −π/2 and π/2. As <em>x</em> grows, the angle approaches π/2 but never reaches it.</figcaption>
</figure>
<p>arctan matters most in calculus. It is defined for every real number, and its graph has two horizontal <strong>asymptotes</strong>, the dashed lines in the figure: lines that the curve gets closer and closer to without reaching. In symbols, arctan <em>x</em> → π/2 as <em>x</em> → ∞ (read "arctan <em>x</em> approaches π/2 as <em>x</em> grows without bound") and → −π/2 as <em>x</em> → −∞. <a href="#c-math130-u1">Lesson 3</a> makes this notation precise. In <a href="#c-math130-chain">Lesson 7</a> you'll see that its derivative is 1/(1 + <em>x</em>²), which is why arctan appears whenever you integrate 1/(1 + <em>x</em>²) in MATH 131.</p>
<p class="note">Notation: many books and calculators write sin<sup>−1</sup> <em>x</em> for arcsin <em>x</em>. This −1 means "inverse function", not a power: sin<sup>−1</sup> <em>x</em> is not 1/sin <em>x</em> (that's csc <em>x</em>). In Python, the inverses are <code>math.asin</code>, <code>math.acos</code> and <code>math.atan</code>, and they return radians: <code>math.atan(1)</code> is <code>0.7853981633974483</code>, which is π/4.</p>

<h3>Floor and ceiling</h3>
<p>Two step-shaped functions come up in both calculus and discrete mathematics. The <strong>floor</strong> ⌊<em>x</em>⌋ is the greatest integer less than or equal to <em>x</em>: <em>x</em> rounded <em>down</em>. The <strong>ceiling</strong> ⌈<em>x</em>⌉ is the least integer greater than or equal to <em>x</em>: <em>x</em> rounded <em>up</em>.</p>
<table>
  <thead><tr><th><em>x</em></th><th>2.7</th><th>4</th><th>−2.3</th><th>2.1</th><th>−2.1</th></tr></thead>
  <tbody>
    <tr><td>⌊<em>x</em>⌋</td><td>2</td><td>4</td><td>−3</td><td>2</td><td>−3</td></tr>
    <tr><td>⌈<em>x</em>⌉</td><td>3</td><td>4</td><td>−2</td><td>3</td><td>−2</td></tr>
  </tbody>
</table>
<p>Watch the negative numbers: rounding down −2.3 goes to −3, further from zero. The graph of ⌊<em>x</em>⌋ is a staircase: flat at height <em>n</em> for <em>n</em> ≤ <em>x</em> &lt; <em>n</em> + 1, then jumping up by 1 at each integer. In Python, <code>math.floor</code> and <code>math.ceil</code> compute them, and for integers <code>a // b</code> is ⌊<em>a</em>/<em>b</em>⌋, so <code>-7 // 2</code> is <code>-4</code>.</p>
<figure class="fig">
<svg viewBox="0 0 440 220" role="img" aria-label="Graph of y = floor of x for x from −3 to 3: a staircase of horizontal steps, each one unit long, at heights −3, −2, −1, 0, 1 and 2. Each step has a filled dot at its left end, which belongs to the step, and an open circle at its right end, which does not; at each integer the graph jumps up by 1.">
  <line x1="20" y1="110" x2="425" y2="110" class="ax"/><line x1="220" y1="10" x2="220" y2="212" class="ax"/>
  <line x1="40" y1="107" x2="40" y2="113" class="ax"/><line x1="100" y1="107" x2="100" y2="113" class="ax"/><line x1="160" y1="107" x2="160" y2="113" class="ax"/><line x1="280" y1="107" x2="280" y2="113" class="ax"/><line x1="340" y1="107" x2="340" y2="113" class="ax"/><line x1="400" y1="107" x2="400" y2="113" class="ax"/><line x1="217" y1="200" x2="223" y2="200" class="ax"/><line x1="217" y1="170" x2="223" y2="170" class="ax"/><line x1="217" y1="140" x2="223" y2="140" class="ax"/><line x1="217" y1="80" x2="223" y2="80" class="ax"/><line x1="217" y1="50" x2="223" y2="50" class="ax"/><line x1="217" y1="20" x2="223" y2="20" class="ax"/>
  <text x="31" y="126" class="m">−3</text><text x="91" y="126" class="m">−2</text><text x="151" y="126" class="m">−1</text><text x="275" y="126" class="m">1</text><text x="335" y="126" class="m">2</text><text x="395" y="126" class="m">3</text><text x="206" y="54" class="m">2</text><text x="206" y="84" class="m">1</text><text x="234" y="144" class="m">−1</text><text x="234" y="174" class="m">−2</text>
  <line x1="40" y1="200" x2="100" y2="200" class="cv"/><circle cx="40" cy="200" r="4" class="dot"/><circle cx="100" cy="200" r="4" class="hole"/>
  <line x1="100" y1="170" x2="160" y2="170" class="cv"/><circle cx="100" cy="170" r="4" class="dot"/><circle cx="160" cy="170" r="4" class="hole"/>
  <line x1="160" y1="140" x2="220" y2="140" class="cv"/><circle cx="160" cy="140" r="4" class="dot"/><circle cx="220" cy="140" r="4" class="hole"/>
  <line x1="220" y1="110" x2="280" y2="110" class="cv"/><circle cx="220" cy="110" r="4" class="dot"/><circle cx="280" cy="110" r="4" class="hole"/>
  <line x1="280" y1="80" x2="340" y2="80" class="cv"/><circle cx="280" cy="80" r="4" class="dot"/><circle cx="340" cy="80" r="4" class="hole"/>
  <line x1="340" y1="50" x2="400" y2="50" class="cv"/><circle cx="340" cy="50" r="4" class="dot"/><circle cx="400" cy="50" r="4" class="hole"/>
  <text x="292" y="35">y = ⌊x⌋</text>
</svg>
<figcaption>The floor function is a staircase. A filled dot marks a point on the graph and an open circle marks a point that is not: ⌊1⌋ = 1, not 0, so at <em>x</em> = 1 the graph is on the upper step.</figcaption>
</figure>

<p class="note">Throughout this course, you can check any calculation in Python. <code>import math</code> gives <code>math.exp</code>, <code>math.log</code> (natural log), <code>math.log2</code>, <code>math.sin</code>, <code>math.cos</code>, <code>math.atan</code>, <code>math.floor</code>, <code>math.pi</code> and <code>math.e</code>.</p>`,
    terms: [
      ["Radian", "Angle measured by arc length on a unit circle; 2π radians is a full turn."],
      ["Composition", "(f ∘ g)(x) = f(g(x)): one function applied to another's output."],
      ["Secant", "sec θ = 1/cos θ; with csc θ = 1/sin θ and cot θ = cos θ/sin θ, the reciprocal trigonometric functions."],
      ["Inverse function", "f⁻¹ undoes f: f⁻¹(b) = a exactly when f(a) = b. Its graph is f's reflected in y = x."],
      ["arctan", "The angle in (−π/2, π/2) whose tangent is x. Defined for every real x; also written tan⁻¹ x."],
      ["Floor and ceiling", "⌊x⌋ is x rounded down to an integer; ⌈x⌉ is x rounded up."]
    ],
    quiz: [
      { q: "What is cos(π/3)?", choices: ["√3/2", "1/2", "√2/2", "0"], answer: 1, why: "π/3 is 60°, and cos 60° = 1/2." },
      { q: "What is arctan(−1)?", choices: ["3π/4", "−π/4", "−1/tan 1", "Undefined"], answer: 1, why: "arctan returns the angle between −π/2 and π/2 whose tangent is −1. tan(−π/4) = −1. (3π/4 also has tangent −1 but is outside the range.)" },
      { q: "How is the graph of y = (x + 3)² related to y = x²?", choices: ["Shifted right 3", "Shifted left 3", "Shifted up 3", "Stretched by 3"], answer: 1, why: "f(x − c) shifts right by c, so f(x + 3) = f(x − (−3)) shifts left by 3." }
    ],
    practice: [
      { q: `<p>Let <em>f</em>(<em>x</em>) = √<em>x</em> and <em>g</em>(<em>x</em>) = 3<em>x</em> + 1. Find (<em>f</em> ∘ <em>g</em>)(5) and (<em>g</em> ∘ <em>f</em>)(4). Then write <em>h</em>(<em>x</em>) = sin(<em>x</em>²) and <em>k</em>(<em>x</em>) = (2<em>x</em> − 1)⁷ as compositions of two simpler functions.</p>`, a: `<p>(<em>f</em> ∘ <em>g</em>)(5) = <em>f</em>(16) = 4. (<em>g</em> ∘ <em>f</em>)(4) = <em>g</em>(2) = 7. <em>h</em> is sin applied to <em>x</em>²: outer function sin <em>u</em>, inner <em>u</em> = <em>x</em>². <em>k</em> has outer <em>u</em>⁷ and inner <em>u</em> = 2<em>x</em> − 1. Recognizing the outer and inner functions is exactly what the chain rule needs.</p>` },
      { q: `<p>Evaluate without a calculator: (a) arcsin(√2/2). (b) arccos(−1). (c) arctan 0. (d) sec(π/3). (e) ⌊−0.5⌋ and ⌈−0.5⌉. Then explain why arccos 3 is undefined.</p>`, a: `<p>(a) π/4, since sin(π/4) = √2/2 and π/4 is in [−π/2, π/2]. (b) π, since cos π = −1 and π is in [0, π]. (c) 0. (d) 1/cos(π/3) = 1/(1/2) = 2. (e) ⌊−0.5⌋ = −1 (down is toward −∞) and ⌈−0.5⌉ = 0. arccos 3 would be an angle whose cosine is 3, but cosines are always between −1 and 1. Check in Python: <code>math.asin(math.sqrt(2) / 2)</code> gives <code>0.7853981633974484</code> ≈ π/4.</p>` },
      { q: `<p>Starting from <em>y</em> = sin <em>x</em>, describe step by step how to get <em>y</em> = 2 sin(<em>x</em> − π/4) + 1. What are its largest and smallest values, and at which <em>x</em> in [0, 2π] does it first reach its largest value?</p>`, a: `<p>Shift right by π/4, stretch vertically by 2, then shift up by 1. Since sin ranges from −1 to 1, the function ranges from 2(−1) + 1 = −1 to 2(1) + 1 = 3. It reaches 3 when <em>x</em> − π/4 = π/2, at <em>x</em> = 3π/4.</p>` },
      { q: `<p>Find ⌊3.7⌋, ⌈3.7⌉, ⌊−2.5⌋ and ⌈−2.5⌉. A document has 95 lines and a page holds 30. Write the number of pages it needs using floor or ceiling, and evaluate it.</p>`, a: `<p>3, 4, −3 and −2 (floor rounds down, toward −∞, so ⌊−2.5⌋ is −3). The document needs ⌈95/30⌉ = ⌈3.17…⌉ = 4 pages: three full pages hold only 90 lines.</p>` }
    ],
    sources: ["openstaxcalc"]
  },
  {
    id: "u1",
    title: "Limits",
    minutes: 90,
    summary: "What it means for f(x) to approach a value: numerical and graphical intuition, one-sided and infinite limits, the limit laws, algebraic techniques, limits at infinity, the squeeze theorem, and the precise ε–δ definition.",
    notes: `
<p>Calculus rests on one idea: the <strong>limit</strong>. Derivatives (instantaneous rates of change) and integrals (exact areas) are both defined as limits. A limit describes the value a function <em>approaches</em> as its input approaches some point, whether or not the function actually reaches it.</p>

<h3>The idea, numerically</h3>
<p>Consider <em>f</em>(<em>x</em>) = (<em>x</em>² − 1)/(<em>x</em> − 1). At <em>x</em> = 1 it's 0/0, which is undefined. But what happens <em>near</em> 1?</p>
<table>
  <thead><tr><th><em>x</em></th><th>0.9</th><th>0.99</th><th>0.999</th><th>1</th><th>1.001</th><th>1.01</th><th>1.1</th></tr></thead>
  <tbody><tr><td><em>f</em>(<em>x</em>)</td><td>1.9</td><td>1.99</td><td>1.999</td><td>undefined</td><td>2.001</td><td>2.01</td><td>2.1</td></tr></tbody>
</table>
<p>As <em>x</em> gets close to 1 from either side, <em>f</em>(<em>x</em>) gets close to 2. We write</p>
<p class="math">lim<sub><em>x</em>→1</sub> (<em>x</em>² − 1)/(<em>x</em> − 1) = 2</p>
<p>In general, lim<sub><em>x</em>→<em>a</em></sub> <em>f</em>(<em>x</em>) = <em>L</em> means we can make <em>f</em>(<em>x</em>) as close to <em>L</em> as we like by taking <em>x</em> close enough to <em>a</em>, but <strong>not equal to <em>a</em></strong>. The value <em>f</em>(<em>a</em>) itself plays no role; it doesn't even have to exist.</p>
<p>Algebra confirms the table: for <em>x</em> ≠ 1, (<em>x</em>² − 1)/(<em>x</em> − 1) = (<em>x</em> − 1)(<em>x</em> + 1)/(<em>x</em> − 1) = <em>x</em> + 1. So the graph is the line <em>y</em> = <em>x</em> + 1 with a single point missing.</p>
<figure class="fig">
<svg viewBox="0 0 300 220" role="img" aria-label="Graph of the line y = x + 1 with an open circle at the point (1, 2), showing the function is undefined there but approaches 2">
  <line x1="10" y1="190" x2="285" y2="190" class="ax"/><line x1="40" y1="205" x2="40" y2="10" class="ax"/>
  <line x1="10" y1="170" x2="220" y2="30" class="cv"/>
  <line x1="100" y1="114" x2="100" y2="190" class="ax dash"/><line x1="40" y1="110" x2="96" y2="110" class="ax dash"/>
  <circle cx="100" cy="110" r="5" class="hole"/>
  <text x="96" y="208" class="m">1</text><text x="26" y="114" class="m">2</text>
  <text x="150" y="160">y = (x² − 1)/(x − 1)</text>
  <text x="112" y="130" class="m">hole at (1, 2)</text>
</svg>
<figcaption>The function is undefined at <em>x</em> = 1, but its values approach 2 from both sides, so the limit is 2.</figcaption>
</figure>

<h3>One-sided limits</h3>
<p>lim<sub><em>x</em>→<em>a</em>⁻</sub> <em>f</em>(<em>x</em>) is the limit as <em>x</em> approaches <em>a</em> from the left (values less than <em>a</em>), and lim<sub><em>x</em>→<em>a</em>⁺</sub> from the right. The two-sided limit exists only if both one-sided limits exist and are equal. For <em>f</em>(<em>x</em>) = |<em>x</em>|/<em>x</em>, which is −1 for negative <em>x</em> and 1 for positive <em>x</em>, the left limit at 0 is −1 and the right limit is 1, so lim<sub><em>x</em>→0</sub> |<em>x</em>|/<em>x</em> does not exist.</p>

<h3>Infinite limits</h3>
<p>As <em>x</em> → 0, 1/<em>x</em>² grows without bound. We write lim<sub><em>x</em>→0</sub> 1/<em>x</em>² = ∞. This is a way of saying the limit doesn't exist, in a specific way: the values blow up. The graph has a <strong>vertical asymptote</strong> at <em>x</em> = 0. For 1/<em>x</em>, the right limit is ∞ and the left limit is −∞.</p>

<h3>The limit laws</h3>
<p>If lim <em>f</em>(<em>x</em>) and lim <em>g</em>(<em>x</em>) both exist as <em>x</em> → <em>a</em>, then limits of sums, differences, products, constant multiples and powers are the sums, differences, products, constant multiples and powers of the limits, and the limit of a quotient is the quotient of the limits as long as the denominator's limit isn't 0. A consequence: <strong>for polynomials, and for rational functions where the denominator isn't zero, the limit is just the value</strong>. lim<sub><em>x</em>→2</sub> (<em>x</em>³ − <em>x</em>) = 8 − 2 = 6. Direct substitution should always be your first try.</p>

<h3>Techniques when substitution gives 0/0</h3>
<p>A result of 0/0 is called an <strong>indeterminate form</strong>: it tells you nothing yet. The limit might be any number, or might not exist. Rewrite the expression until substitution works:</p>
<p><strong>Factor and cancel.</strong> lim<sub><em>x</em>→3</sub> (<em>x</em>² − 9)/(<em>x</em> − 3) = lim<sub><em>x</em>→3</sub> (<em>x</em> − 3)(<em>x</em> + 3)/(<em>x</em> − 3) = lim<sub><em>x</em>→3</sub> (<em>x</em> + 3) = 6. Canceling is allowed because the limit only looks at <em>x</em> ≠ 3.</p>
<p><strong>Rationalize.</strong> For lim<sub><em>x</em>→0</sub> (√(<em>x</em> + 4) − 2)/<em>x</em>, multiply top and bottom by the <strong>conjugate</strong> √(<em>x</em> + 4) + 2. The conjugate of <em>a</em> − <em>b</em> is <em>a</em> + <em>b</em> (and of <em>a</em> + <em>b</em>, it is <em>a</em> − <em>b</em>). Their product is <em>a</em>² − <em>b</em>², so when <em>a</em> or <em>b</em> is a square root, multiplying by the conjugate squares the root away. The same trick works when the root is in the denominator, as in √<em>x</em> − 2, whose conjugate is √<em>x</em> + 2.</p>
<p class="math">(√(x + 4) − 2)(√(x + 4) + 2) / (x(√(x + 4) + 2)) = ((x + 4) − 4) / (x(√(x + 4) + 2)) = 1 / (√(x + 4) + 2)</p>
<p>Now substitute <em>x</em> = 0: the limit is 1/4.</p>
<p><strong>Combine fractions.</strong> For lim<sub><em>x</em>→0</sub> (1/(<em>x</em> + 2) − 1/2)/<em>x</em>, the numerator is (2 − (<em>x</em> + 2))/(2(<em>x</em> + 2)) = −<em>x</em>/(2(<em>x</em> + 2)). Dividing by <em>x</em> leaves −1/(2(<em>x</em> + 2)), which approaches −1/4.</p>

<h3>Limits at infinity</h3>
<p>lim<sub><em>x</em>→∞</sub> <em>f</em>(<em>x</em>) describes the long-run behavior as <em>x</em> grows. For rational functions, divide top and bottom by the highest power of <em>x</em> in the denominator:</p>
<p class="math">lim<sub>x→∞</sub> (3x² + 5x) / (x² − 7) = lim<sub>x→∞</sub> (3 + 5/x) / (1 − 7/x²) = 3</p>
<p>because 5/<em>x</em> and 7/<em>x</em>² go to 0. In general, comparing the degrees of the top and bottom gives the answer: if the bottom's degree is larger the limit is 0; if they're equal it's the ratio of the leading coefficients; if the top's is larger the limit is ±∞. Only the dominant terms matter for large inputs. Near the end of the term, CS 101 uses this same idea, under the name <em>big-O notation</em>, to compare how fast programs slow down as their inputs grow.</p>

<h3>The squeeze theorem</h3>
<p>If <em>g</em>(<em>x</em>) ≤ <em>f</em>(<em>x</em>) ≤ <em>h</em>(<em>x</em>) near <em>a</em>, and <em>g</em> and <em>h</em> have the same limit <em>L</em> at <em>a</em>, then <em>f</em> is squeezed to <em>L</em> too. The same theorem holds for limits as <em>x</em> → ∞: there, "near <em>a</em>" becomes "for all sufficiently large <em>x</em>".</p>
<p><strong>Example.</strong> <em>x</em>² sin(1/<em>x</em>) oscillates wildly near 0, but since −1 ≤ sin(1/<em>x</em>) ≤ 1, we have −<em>x</em>² ≤ <em>x</em>² sin(1/<em>x</em>) ≤ <em>x</em>². Both outer functions go to 0, so lim<sub><em>x</em>→0</sub> <em>x</em>² sin(1/<em>x</em>) = 0.</p>
<p><strong>The most important trigonometric limit.</strong> Take an angle <em>x</em> between 0 and π/2 (in radians) at the center <em>O</em> of the unit circle, with one side along the <em>x</em>-axis to <em>A</em> = (1, 0) and the other meeting the circle at <em>P</em> = (cos <em>x</em>, sin <em>x</em>). Three regions, each inside the next, have these areas:</p>
<ul>
  <li>the triangle <em>OAP</em>: base 1, height sin <em>x</em>, so area ½ sin <em>x</em>;</li>
  <li>the sector (pie slice) <em>OAP</em>: a fraction <em>x</em>/(2π) of the circle's area π, so area ½<em>x</em>;</li>
  <li>the larger triangle <em>OAT</em>, where <em>T</em> is the point at which side <em>OP</em>, extended, meets the vertical tangent line at <em>A</em>. It has a right angle at <em>A</em> and the angle <em>x</em> at <em>O</em>. Since tan = opposite/adjacent, tan <em>x</em> = <em>AT</em>/<em>OA</em> = <em>AT</em>/1, so its height <em>AT</em> is tan <em>x</em>, and with base 1 its area is ½ tan <em>x</em>.</li>
</ul>
<p>So sin <em>x</em> ≤ <em>x</em> ≤ tan <em>x</em>. Dividing by sin <em>x</em> (positive) gives 1 ≤ <em>x</em>/sin <em>x</em> ≤ 1/cos <em>x</em>, and flipping each fraction reverses the inequalities: cos <em>x</em> ≤ (sin <em>x</em>)/<em>x</em> ≤ 1. (For negative <em>x</em> the same holds, because both cos <em>x</em> and (sin <em>x</em>)/<em>x</em> are unchanged when <em>x</em> is replaced by −<em>x</em>.) Since cos <em>x</em> → 1, the squeeze theorem gives</p>
<p class="math">lim<sub>x→0</sub> (sin x)/x = 1</p>
<p>This limit is why the derivative of sin <em>x</em> is cos <em>x</em>, and it only holds in radians. Numerically:</p>
<div class="multi">
<pre data-lang="python"><code>import math
for h in [0.1, 0.01, 0.001, 0.0001]:
    print(h, math.sin(h) / h)
# 0.998..., 0.99998..., approaching 1</code></pre>
<p class="note">If CS 101 hasn't reached loops yet: <code>for h in [0.1, 0.01, 0.001, 0.0001]:</code> runs the indented line below it once for each number in the square brackets, with <code>h</code> set to that number each time. So this prints four lines. CS 101's Loops lesson covers loops fully.</p>
<pre data-lang="java"><code>for (double h : new double[]{0.1, 0.01, 0.001, 0.0001}) {
    System.out.println(h + " " + Math.sin(h) / h);
}</code></pre>
<pre data-lang="cpp"><code>for (double h : {0.1, 0.01, 0.001, 0.0001}) {
    std::cout &lt;&lt; h &lt;&lt; " " &lt;&lt; std::sin(h) / h &lt;&lt; "\\n";
}</code></pre>
</div>
<p>Numerical evidence suggests a limit, but it can't prove one. sin(π/<em>x</em>) is exactly 0 at <em>x</em> = 0.1, 0.01, 0.001, …, which would suggest a limit of 0 at <em>x</em> = 0, yet the function keeps oscillating between −1 and 1 and has no limit there.</p>

<h3>The precise definition</h3>
<p>"As close as we like" is made precise by the <strong>ε–δ definition</strong> (ε is "epsilon", δ is "delta"):</p>
<p class="math">lim<sub>x→a</sub> f(x) = L means: for every ε &gt; 0 there is a δ &gt; 0 such that 0 &lt; |x − a| &lt; δ implies |f(x) − L| &lt; ε.</p>
<p>Read it as a challenge. A skeptic names a tolerance ε: "get <em>f</em>(<em>x</em>) within ε of <em>L</em>". You must answer with a δ: "fine, just keep <em>x</em> within δ of <em>a</em>". If you can always answer, however small ε is, the limit is <em>L</em>. Notice the nested quantifiers ∀ε ∃δ from Discrete Mathematics.</p>
<p><strong>Worked example.</strong> Prove lim<sub><em>x</em>→1</sub> (2<em>x</em> + 1) = 3.</p>
<p><em>Scratch work:</em> we need |(2<em>x</em> + 1) − 3| &lt; ε, that is, |2<em>x</em> − 2| &lt; ε, that is, 2|<em>x</em> − 1| &lt; ε, so |<em>x</em> − 1| &lt; ε/2. That suggests δ = ε/2.</p>
<p><em>Proof.</em> Let ε &gt; 0 and choose δ = ε/2. If 0 &lt; |<em>x</em> − 1| &lt; δ, then |(2<em>x</em> + 1) − 3| = 2|<em>x</em> − 1| &lt; 2δ = ε. ∎</p>
<p>You won't need to write many ε–δ proofs in this course, but understanding the definition makes everything else in calculus precise. <strong>What you're expected to do:</strong> on exams, ε–δ proofs are for linear functions like the one above. Nonlinear limits need one extra idea, shown below for interest; it is practiced properly in a real analysis course.</p>
<p><em>A nonlinear example (not on the exam).</em> Prove lim<sub><em>x</em>→3</sub> <em>x</em>² = 9. Scratch work: |<em>x</em>² − 9| = |<em>x</em> − 3| · |<em>x</em> + 3|. The factor |<em>x</em> − 3| is the one we control; the extra idea is to keep the other factor bounded. If we insist that |<em>x</em> − 3| &lt; 1, then 2 &lt; <em>x</em> &lt; 4, so |<em>x</em> + 3| &lt; 7. Then |<em>x</em>² − 9| &lt; 7|<em>x</em> − 3|, which is less than ε when |<em>x</em> − 3| &lt; ε/7. <em>Proof.</em> Let ε &gt; 0 and choose δ = the smaller of 1 and ε/7. If 0 &lt; |<em>x</em> − 3| &lt; δ, then |<em>x</em> + 3| &lt; 7 and |<em>x</em> − 3| &lt; ε/7, so |<em>x</em>² − 9| &lt; 7 · ε/7 = ε. ∎</p>
`,
    terms: [
      ["Limit", "The value f(x) approaches as x approaches a, regardless of f(a)."],
      ["One-sided limit", "A limit taken from only the left (x → a⁻) or only the right (x → a⁺)."],
      ["Indeterminate form", "An expression like 0/0 that gives no information until it is rewritten."],
      ["Vertical asymptote", "A vertical line x = a near which a function grows without bound."],
      ["Squeeze theorem", "If g ≤ f ≤ h and g and h have the same limit, so does f."],
      ["ε–δ definition", "The precise, quantifier-based definition of a limit."]
    ],
    quiz: [
      ...[{"q": "What is lim<sub>x→3</sub> (x² − 9)/(x − 3)?", "choices": ["0", "3", "6", "It does not exist"], "answer": 2, "why": "Factor: (x − 3)(x + 3)/(x − 3) = x + 3 for x ≠ 3, which approaches 6."}, {"q": "If f(2) is undefined, can lim<sub>x→2</sub> f(x) exist?", "choices": ["Yes", "No"], "answer": 0, "why": "A limit depends only on values near 2, not at 2."}, {"q": "What is lim<sub>x→∞</sub> (5x³ + x)/(2x³ − 7)?", "choices": ["0", "5/2", "∞", "−5/7"], "answer": 1, "why": "The leading terms dominate: 5x³/2x³ = 5/2."}],
      { q: "What is lim<sub>x→0</sub> (√(x + 9) − 3)/x?", choices: ["0", "1/6", "1/3", "It does not exist"], answer: 1, why: "Rationalize: the expression becomes 1/(√(x + 9) + 3), which approaches 1/6." },
      { q: "What is lim<sub>x→0</sub> x² cos(1/x)?", choices: ["1", "0", "It does not exist", "∞"], answer: 1, why: "−x² ≤ x² cos(1/x) ≤ x², and both bounds go to 0, so by the squeeze theorem the limit is 0." },
      { q: "In the proof that lim<sub>x→2</sub> 5x = 10, which δ works for a given ε?", choices: ["δ = ε", "δ = 5ε", "δ = ε/5", "δ = ε + 5"], answer: 2, why: "|5x − 10| = 5|x − 2| < ε when |x − 2| < ε/5." }
    ],
    practice: [
      { q: `<p>Compute each limit: (a) lim<sub><em>x</em>→2</sub> (<em>x</em>² + 3<em>x</em> − 10)/(<em>x</em> − 2). (b) lim<sub><em>x</em>→−1</sub> (<em>x</em>² − 1)/(<em>x</em>² + 3<em>x</em> + 2). (c) lim<sub><em>x</em>→4</sub> (<em>x</em> − 4)/(√<em>x</em> − 2).</p>`, a: `<p>(a) Factor: (<em>x</em> + 5)(<em>x</em> − 2)/(<em>x</em> − 2) = <em>x</em> + 5 → 7. (b) (<em>x</em> − 1)(<em>x</em> + 1)/((<em>x</em> + 1)(<em>x</em> + 2)) = (<em>x</em> − 1)/(<em>x</em> + 2) → −2/1 = −2. (c) Write <em>x</em> − 4 = (√<em>x</em> − 2)(√<em>x</em> + 2), so the expression is √<em>x</em> + 2 → 4.</p>` },
      { q: `<p>For <em>f</em>(<em>x</em>) = <em>x</em> + 1 when <em>x</em> &lt; 2 and <em>f</em>(<em>x</em>) = <em>x</em>² − 1 when <em>x</em> ≥ 2, find lim<sub><em>x</em>→2⁻</sub> <em>f</em>(<em>x</em>), lim<sub><em>x</em>→2⁺</sub> <em>f</em>(<em>x</em>), and lim<sub><em>x</em>→2</sub> <em>f</em>(<em>x</em>).</p>`, a: `<p>From the left, <em>x</em> + 1 → 3. From the right, <em>x</em>² − 1 → 3. They agree, so the limit is 3.</p>` },
      { q: `<p>Find: (a) lim<sub><em>x</em>→∞</sub> (4<em>x</em>³ − <em>x</em>)/(2<em>x</em>³ + 9). (b) lim<sub><em>x</em>→∞</sub> (5<em>x</em> + 2)/(<em>x</em>² + 1). (c) lim<sub><em>x</em>→∞</sub> (<em>x</em>² + 1)/(<em>x</em> − 3).</p>`, a: `<p>(a) Equal degrees: ratio of leading coefficients, 4/2 = 2. (b) Bottom degree is larger: 0. (c) Top degree is larger: ∞.</p>` },
      { q: `<p>Find lim<sub><em>x</em>→0⁺</sub> 1/<em>x</em>, lim<sub><em>x</em>→0⁻</sub> 1/<em>x</em>, and lim<sub><em>x</em>→3</sub> 1/(<em>x</em> − 3)². Describe the graphs near those points.</p>`, a: `<p>∞, −∞, and ∞. 1/<em>x</em> has a vertical asymptote at 0, shooting up on the right and down on the left. 1/(<em>x</em> − 3)² has a vertical asymptote at 3 and shoots up on both sides, because the square is always positive.</p>` },
      { q: `<p>Use the squeeze theorem to find lim<sub><em>x</em>→∞</sub> (sin <em>x</em>)/<em>x</em>.</p>`, a: `<p>For <em>x</em> &gt; 0, −1/<em>x</em> ≤ (sin <em>x</em>)/<em>x</em> ≤ 1/<em>x</em>, since −1 ≤ sin <em>x</em> ≤ 1. Both bounds go to 0, so the limit is 0. Compare with lim<sub><em>x</em>→0</sub> (sin <em>x</em>)/<em>x</em> = 1: the same expression has different limits at different points.</p>` },
      { q: `<p>Write a Python loop that estimates lim<sub><em>x</em>→0</sub> (<em>e</em><sup>x</sup> − 1)/<em>x</em> by evaluating at <em>x</em> = 10<sup>−1</sup>, 10<sup>−2</sup>, …, 10<sup>−12</sup>. What happens at the smallest values, and why? (In Python, 10<sup>−<em>k</em></sup> is <code>10 ** -k</code>; 10<sup>−12</sup> can also be typed as <code>1e-12</code>. For the "why", see the third bullet of "Floats are approximate" in <a href="#c-cs101-u1">CS 101, Values, types and expressions</a>: a float keeps about 16 significant digits, and subtracting two nearly equal floats leaves only the digits where they differ.)</p>`, hint: `<p>Use the same shape as the sin(<em>h</em>)/<em>h</em> loop in the squeeze theorem section. <code>for k in range(1, 13):</code> runs its indented lines with <code>k</code> = 1, 2, …, 12 in turn (<code>range(1, 13)</code> stops just before 13). Inside the loop, set <code>x = 10 ** -k</code> and print <code>x</code> and the quotient.</p>`, a: `<pre><code>import math
for k in range(1, 13):
    x = 10 ** -k
    print(x, (math.exp(x) - 1) / x)</code></pre><p>The values approach 1 at first, which is the true limit. For the tiniest <em>x</em>, <code>math.exp(x)</code> is so close to 1 that subtracting 1 loses most of the significant digits, and the estimates get worse: at 10<sup>−7</sup> the output is 1.0000000494336803, at 10<sup>−9</sup> it is 1.000000082740371, and at 10<sup>−12</sup> it is 1.000088900582341, wrong in the fifth digit. Here is why. <em>e</em><sup>10<sup>−12</sup></sup> = 1.000000000001000…, but a float stores only about 16 significant digits, so after the leading 1.00000000000 only about four digits of the part we care about survive. Subtracting 1 throws away the leading 1 and keeps just those few digits, plus their rounding error, and dividing by 10<sup>−12</sup> magnifies that error. This effect, <em>loss of significance</em> when subtracting nearly equal numbers, comes back in <a href="#c-math130-u3">Lesson 5, The derivative</a>. Floating-point rounding limits how far numerical estimation can go. (Python's <code>math.expm1(x)</code> computes <em>e</em><sup>x</sup> − 1 accurately for exactly this reason.)</p>` },
      { q: `<p>Prove using the ε–δ definition: lim<sub><em>x</em>→3</sub> (4<em>x</em> − 5) = 7.</p>`, a: `<p><strong>Proof.</strong> Let ε &gt; 0 and choose δ = ε/4. If 0 &lt; |<em>x</em> − 3| &lt; δ, then |(4<em>x</em> − 5) − 7| = |4<em>x</em> − 12| = 4|<em>x</em> − 3| &lt; 4δ = ε. ∎</p>` }
    ],
    sources: ["openstaxcalc", "eoc"]
  },
  {
    id: "u2",
    title: "Continuity",
    minutes: 90,
    summary: "Continuous functions and the three ways continuity fails, continuity of common functions, making piecewise functions continuous, the Intermediate Value Theorem and bisection, and the Extreme Value Theorem.",
    notes: `
<p>Informally, a function is continuous if you can draw its graph without lifting your pen. Continuity is what makes many functions predictable: small changes in input cause small changes in output. Several of the most useful theorems in calculus, and the guarantee that bisection finds a root, need continuity.</p>

<h3>The definition</h3>
<p><em>f</em> is <strong>continuous at <em>a</em></strong> if three things all hold:</p>
<ol>
  <li><em>f</em>(<em>a</em>) is defined;</li>
  <li>lim<sub><em>x</em>→<em>a</em></sub> <em>f</em>(<em>x</em>) exists;</li>
  <li>the two are equal: lim<sub><em>x</em>→<em>a</em></sub> <em>f</em>(<em>x</em>) = <em>f</em>(<em>a</em>).</li>
</ol>
<p>In words: the function's value is exactly what its nearby values lead you to expect. A function is continuous on an interval if it's continuous at every point in it (at an endpoint, only the one-sided limit from inside the interval is required).</p>

<h3>How continuity fails</h3>
<figure class="fig">
<svg viewBox="0 0 560 175" role="img" aria-label="Three graphs: a removable discontinuity, a line with a hole and the function's value plotted elsewhere; a jump discontinuity, a step; and an infinite discontinuity, a curve shooting up on both sides of a vertical asymptote">
  <line x1="10" y1="140" x2="175" y2="140" class="ax"/><line x1="20" y1="150" x2="20" y2="10" class="ax"/>
  <line x1="25" y1="130" x2="165" y2="40" class="cv"/>
  <circle cx="95" cy="85" r="4.5" class="hole"/><circle cx="95" cy="50" r="4.5" class="dot"/>
  <text x="40" y="168" class="m">removable</text>
  <line x1="195" y1="140" x2="360" y2="140" class="ax"/><line x1="205" y1="150" x2="205" y2="10" class="ax"/>
  <line x1="210" y1="110" x2="280" y2="110" class="cv"/><circle cx="280" cy="110" r="4.5" class="dot"/>
  <line x1="284" y1="60" x2="352" y2="60" class="cv"/><circle cx="280" cy="60" r="4.5" class="hole"/>
  <text x="250" y="168" class="m">jump</text>
  <line x1="380" y1="140" x2="545" y2="140" class="ax"/><line x1="390" y1="150" x2="390" y2="10" class="ax"/>
  <line x1="465" y1="10" x2="465" y2="140" class="ax dash"/>
  <path d="M395,128 Q450,124 459,15" class="cv"/><path d="M471,15 Q480,124 537,128" class="cv"/>
  <text x="430" y="168" class="m">infinite</text>
</svg>
<figcaption>The three kinds of discontinuity. A filled dot marks the function's value; an open circle marks a missing point.</figcaption>
</figure>
<ul>
  <li><strong>Removable:</strong> the limit exists, but <em>f</em>(<em>a</em>) is undefined or has the wrong value. Redefining one point would fix it. Example: (<em>x</em>² − 1)/(<em>x</em> − 1) at 1.</li>
  <li><strong>Jump:</strong> the one-sided limits exist but differ, as in a step. Examples: the floor function ⌊<em>x</em>⌋ (<em>x</em> rounded down; see <a href="#c-math130-trig">Lesson 2</a>) at every integer; a shipping price that jumps at 1 kg.</li>
  <li><strong>Infinite:</strong> the function blows up near <em>a</em>, as 1/<em>x</em>² does at 0.</li>
</ul>
<p>(Some functions fail in stranger ways, like sin(1/<em>x</em>) at 0, which oscillates infinitely often with no limit at all.)</p>
<p>A note on wording. A formula like 1/<em>x</em>² gives no value at 0, so in the sense of <a href="#c-math120-u5">MATH 120, Functions</a> it is a function on all real numbers <em>except</em> 0, not on ℝ. It is continuous at every point of that domain. When we say it "has an infinite discontinuity at 0", we mean only that 0 is a gap in the domain where condition 1 above fails, so no rule that needs continuity at 0, or on an interval containing 0, can be applied to it.</p>

<h3>Which functions are continuous?</h3>
<p>Polynomials, sin, cos and <em>e</em><sup>x</sup> are continuous everywhere. Rational functions are continuous wherever the denominator isn't zero; √<em>x</em> and ln <em>x</em> are continuous on their domains. Sums, differences, products and compositions of continuous functions are continuous, and quotients are too wherever the denominator isn't zero. So most formulas you write down are continuous except at obvious trouble spots.</p>
<p>That's why direct substitution works for limits of continuous functions: continuity at <em>a</em> means exactly that lim<sub><em>x</em>→<em>a</em></sub> <em>f</em>(<em>x</em>) = <em>f</em>(<em>a</em>).</p>

<h3>Making a piecewise function continuous</h3>
<p>For which constant <em>c</em> is this function continuous everywhere?</p>
<p class="math">f(x) = cx + 1 for x &lt; 2, and f(x) = x² for x ≥ 2</p>
<p>Each piece is a polynomial, so the only question is <em>x</em> = 2. The left limit is 2<em>c</em> + 1, and the right limit and the value are both 2² = 4. Continuity needs 2<em>c</em> + 1 = 4, so <em>c</em> = 3/2.</p>

<h3>The Intermediate Value Theorem</h3>
<p><strong>Theorem (IVT).</strong> If <em>f</em> is continuous on the closed interval [<em>a</em>, <em>b</em>] and <em>N</em> is any number between <em>f</em>(<em>a</em>) and <em>f</em>(<em>b</em>), then there is at least one <em>c</em> in [<em>a</em>, <em>b</em>] with <em>f</em>(<em>c</em>) = <em>N</em>.</p>
<p>In pictures: a continuous graph that starts below a horizontal line and ends above it must cross it somewhere. If you were 50 cm tall at birth and 170 cm at 18, at some moment you were exactly 1 m tall. The theorem needs continuity: the step function in the figure jumps over every value in between.</p>
<p>The most useful special case: <strong>if a continuous function changes sign on an interval, it has a root there</strong>. <em>Example:</em> does <em>x</em>³ − <em>x</em> − 1 = 0 have a solution? At <em>x</em> = 1 the left side is −1, and at <em>x</em> = 2 it's 5. The polynomial is continuous, so by the IVT it equals 0 somewhere between 1 and 2. The IVT tells us a root exists, not where it is or how many there are.</p>
<p><strong>Worked example: comparing two quantities.</strong> Often the question is about two changing quantities, not one equation. On a spring day, the temperature in town A rises from 10 °C at 6:00 to 25 °C at 14:00, and in town B it rises from 14 °C to 22 °C over the same hours. Was there a moment when the two towns had exactly the same temperature? The recipe has four steps.</p>
<ol>
  <li><strong>Name each quantity as a function of the same variable.</strong> Let <em>A</em>(<em>t</em>) and <em>B</em>(<em>t</em>) be the temperatures at time <em>t</em> hours, for 6 ≤ <em>t</em> ≤ 14. Temperatures change without jumps, so both are continuous.</li>
  <li><strong>Subtract to get one function whose zeros are the answer.</strong> Let <em>D</em>(<em>t</em>) = <em>A</em>(<em>t</em>) − <em>B</em>(<em>t</em>). The towns match exactly when <em>D</em>(<em>t</em>) = 0. <em>D</em> is continuous, as a difference of continuous functions.</li>
  <li><strong>Check the signs at the ends.</strong> <em>D</em>(6) = 10 − 14 = −4 &lt; 0 and <em>D</em>(14) = 25 − 22 = 3 &gt; 0.</li>
  <li><strong>Apply the IVT and translate back.</strong> <em>D</em> changes sign on [6, 14], so <em>D</em>(<em>c</em>) = 0 for some time <em>c</em>, and at that moment <em>A</em>(<em>c</em>) = <em>B</em>(<em>c</em>): the towns had the same temperature.</li>
</ol>
<p>Notice that we never needed formulas for <em>A</em> and <em>B</em>, only continuity and the values at the ends. Turning "are these two ever equal?" into "does their difference have a zero?" is the standard move.</p>

<h3>Bisection: the IVT as an algorithm</h3>
<p>The IVT turns into an algorithm for finding the root: check the midpoint, keep the half where the sign still changes, and repeat. The IVT guarantees the root is always inside the remaining interval.</p>
<div class="multi">
<pre data-lang="python"><code>def bisect(f, lo, hi, tol=1e-10):
    """Find a root of continuous f on [lo, hi], where f(lo) and f(hi) differ in sign."""
    while hi - lo &gt; tol:
        mid = (lo + hi) / 2
        if f(lo) * f(mid) &lt;= 0:
            hi = mid
        else:
            lo = mid
    return (lo + hi) / 2

bisect(lambda x: x**3 - x - 1, 1, 2)   # 1.3247179...</code></pre>
<pre data-lang="java"><code>static double bisect(DoubleUnaryOperator f, double lo, double hi) {
    while (hi - lo &gt; 1e-10) {
        double mid = (lo + hi) / 2;
        if (f.applyAsDouble(lo) * f.applyAsDouble(mid) &lt;= 0) hi = mid;
        else lo = mid;
    }
    return (lo + hi) / 2;
}
bisect(x -&gt; x * x * x - x - 1, 1, 2);   // 1.3247179...</code></pre>
<pre data-lang="cpp"><code>double bisect(std::function&lt;double(double)&gt; f, double lo, double hi) {
    while (hi - lo &gt; 1e-10) {
        double mid = (lo + hi) / 2;
        if (f(lo) * f(mid) &lt;= 0) hi = mid;
        else lo = mid;
    }
    return (lo + hi) / 2;
}
bisect([](double x) { return x * x * x - x - 1; }, 1, 2);   // 1.3247179...</code></pre>
</div>
<p class="note">Reading the Python, if CS 101 hasn't reached functions yet: <code>def bisect(f, lo, hi, tol=1e-10):</code> defines a function named <code>bisect</code> with four inputs, and <code>return</code> sends back its answer. <code>while</code> repeats the indented lines as long as its condition is true. The first input, <code>f</code>, is itself a function: in Python a function is a value that can be handed to another function, and <code>f(mid)</code> calls it. <code>lambda x: x**3 - x - 1</code> is a short way to write a function without giving it a name: it takes <code>x</code> and returns <em>x</em>³ − <em>x</em> − 1 (<code>**</code> means "to the power"). CS 101's Loops and Functions lessons cover all of this.</p>
<p><code>f(lo) * f(mid) &lt;= 0</code> is a compact test for "<em>f</em>(lo) and <em>f</em>(mid) have different signs, or one is zero". Each pass halves the interval, so about 34 passes shrink an interval of width 1 below 10<sup>−10</sup>. (<code>1e-10</code> is Python's scientific notation for 10<sup>−10</sup>, from <a href="#c-cs101-u1">CS 101, Values, types and expressions</a>. Writing <code>tol=1e-10</code> in the definition makes it a <em>default argument</em>: a call that leaves <code>tol</code> out, like the one above, uses 10<sup>−10</sup>. <a href="#c-cs101-u3">CS 101, Functions and abstraction</a> covers default arguments.)</p>

<h3>The Extreme Value Theorem</h3>
<p><strong>Theorem (EVT).</strong> A function continuous on a closed interval [<em>a</em>, <em>b</em>] reaches both a maximum and a minimum value somewhere on that interval.</p>
<p>Both conditions matter. On the open interval (0, 1), <em>f</em>(<em>x</em>) = <em>x</em> never reaches a maximum: it gets ever closer to 1 but never gets there. And 1/<em>x</em> has no value at 0, so it isn't a function on all of [−1, 1], let alone a continuous one; the EVT doesn't apply, and indeed on [−1, 1] with 0 removed it has no maximum, since it grows without bound just to the right of 0. The EVT is the reason optimization works in <a href="#c-math130-u5">Lesson 8</a>: on a closed interval, there's always an answer to find.</p>
`,
    terms: [
      ["Continuous at a", "f(a) exists, the limit at a exists, and they are equal."],
      ["Removable discontinuity", "A hole that could be filled by redefining one value."],
      ["Jump discontinuity", "One-sided limits that exist but differ."],
      ["Infinite discontinuity", "The function grows without bound near the point."],
      ["Intermediate Value Theorem", "A continuous function on [a, b] takes every value between f(a) and f(b)."],
      ["Extreme Value Theorem", "A continuous function on a closed interval has a maximum and a minimum there."]
    ],
    quiz: [
      ...[{"q": "f(x) = x³ − x − 1 has f(1) = −1 and f(2) = 5. What does the IVT tell you?", "choices": ["f has a root in (1, 2)", "f has no roots", "f(1.5) = 2", "f is increasing"], "answer": 0, "why": "f is continuous and changes sign, so it crosses 0 between 1 and 2."}, {"q": "The floor function ⌊x⌋ has what kind of discontinuity at each integer?", "choices": ["Removable", "Jump", "Infinite", "None"], "answer": 1, "why": "The left and right limits differ by 1."}],
      { q: "For which c is f continuous, where f(x) = x + c for x < 1 and f(x) = 3x for x ≥ 1?", choices: ["c = 1", "c = 2", "c = 3", "No value works"], answer: 1, why: "The left limit at 1 is 1 + c and the value is 3, so c = 2." },
      { q: "f(x) = 1/x, defined for x ≠ 0, has f(−1) = −1 and f(1) = 1. Does the IVT guarantee a root in [−1, 1]?", choices: ["Yes", "No, because f has no value at 0, so it isn't continuous on [−1, 1]"], answer: 1, why: "The IVT needs f continuous at every point of [−1, 1], and f isn't even defined at 0. So the IVT doesn't apply, and in fact 1/x is never 0." },
      { q: "Does f(x) = x² have a maximum on the open interval (0, 2)?", choices: ["Yes, at x = 2", "Yes, at x = 0", "No"], answer: 2, why: "x² approaches 4 as x approaches 2 but never reaches it on the open interval. The EVT needs a closed interval." }
    ],
    practice: [
      { q: `<p>Where is each function discontinuous, and what kind of discontinuity is it? (a) (<em>x</em> − 2)/(<em>x</em>² − 4). (b) 1/(<em>x</em> − 5). (c) ⌊<em>x</em>⌋ on [0, 3].</p>`, a: `<p>(a) (<em>x</em> − 2)/((<em>x</em> − 2)(<em>x</em> + 2)) = 1/(<em>x</em> + 2) for <em>x</em> ≠ 2: removable at <em>x</em> = 2 (the limit is 1/4) and infinite at <em>x</em> = −2. (b) Infinite at <em>x</em> = 5. (c) Jumps at <em>x</em> = 1, 2 and 3 (at 3 the left limit is 2 but the value is 3).</p>` },
      { q: `<p>Find <em>k</em> so that <em>f</em> is continuous everywhere: <em>f</em>(<em>x</em>) = <em>kx</em>² for <em>x</em> ≤ 3, and <em>f</em>(<em>x</em>) = 2<em>x</em> + <em>k</em> for <em>x</em> &gt; 3.</p>`, a: `<p>At <em>x</em> = 3 the left side gives 9<em>k</em> and the right side's limit is 6 + <em>k</em>. Set 9<em>k</em> = 6 + <em>k</em>, so 8<em>k</em> = 6 and <em>k</em> = 3/4.</p>` },
      { q: `<p>Use the IVT to show that cos <em>x</em> = <em>x</em> has a solution between 0 and π/2.</p>`, a: `<p>Let <em>g</em>(<em>x</em>) = cos <em>x</em> − <em>x</em>, which is continuous. <em>g</em>(0) = 1 &gt; 0 and <em>g</em>(π/2) = 0 − π/2 &lt; 0. By the IVT, <em>g</em>(<em>c</em>) = 0 for some <em>c</em> in between, so cos <em>c</em> = <em>c</em>. (Turning an equation <em>f</em> = <em>g</em> into a root-finding problem <em>f</em> − <em>g</em> = 0 is a standard trick.)</p>` },
      { q: `<p>Use the <code>bisect</code> function, with its default <code>tol=1e-10</code>, to solve cos <em>x</em> = <em>x</em> on [0, π/2]. The answer is then within 10<sup>−10</sup> of the true root, which is what "about 10 decimal places" means here. How many passes of the loop does it take? Work it out on paper first, then check by adding a counter to <code>bisect</code>: set <code>passes = 0</code> before the loop, add 1 inside it, and print it before returning.</p>`, a: `<pre><code>import math

def bisect(f, lo, hi, tol=1e-10):
    passes = 0
    while hi - lo &gt; tol:
        passes += 1
        mid = (lo + hi) / 2
        if f(lo) * f(mid) &lt;= 0:
            hi = mid
        else:
            lo = mid
    print("passes:", passes)
    return (lo + hi) / 2

root = bisect(lambda x: math.cos(x) - x, 0, math.pi / 2)
print(root)   # passes: 34, then 0.7390851332452747</code></pre><p>On paper: the starting width is π/2 ≈ 1.57, and each pass halves it. We need 1.57 / 2<sup><em>n</em></sup> &lt; 10<sup>−10</sup>, so 2<sup><em>n</em></sup> &gt; 1.57 × 10<sup>10</sup>. Since log₂(1.57 × 10<sup>10</sup>) ≈ 33.9, the smallest whole <em>n</em> is 34, which the counter confirms.</p>` },
      { q: `<p>A hiker starts up a mountain at 7:00 one morning and reaches the top at 5:00 pm. The next day she starts down at 7:00 am by the same path and reaches the bottom at 5:00 pm. Show there's a point on the path that she passes at the same time of day on both days.</p>`, hint: `<p>Follow the worked example on comparing two quantities. Measure her position as distance along the path from the bottom: let <em>u</em>(<em>t</em>) and <em>d</em>(<em>t</em>) be that distance at time <em>t</em> on the way up and on the way down. Consider <em>u</em>(<em>t</em>) − <em>d</em>(<em>t</em>).</p>`, a: `<p>Follow the four steps of the worked example. (1) Let <em>L</em> be the length of the path, and let <em>u</em>(<em>t</em>) and <em>d</em>(<em>t</em>) be her distance along the path from the bottom at time <em>t</em> (in hours, 7 ≤ <em>t</em> ≤ 17) on the way up and on the way down. She walks without teleporting, so both are continuous. (2) Let <em>D</em>(<em>t</em>) = <em>u</em>(<em>t</em>) − <em>d</em>(<em>t</em>), also continuous; it is 0 exactly when she is at the same point at the same time of day. (3) At 7:00 she is at the bottom going up and at the top going down, so <em>D</em>(7) = 0 − <em>L</em> &lt; 0; at 17:00, <em>D</em>(17) = <em>L</em> − 0 &gt; 0. (4) By the IVT, <em>D</em>(<em>c</em>) = 0 at some time <em>c</em>, so at time <em>c</em> on both days she was at the same point. Using distance along the path, not height, matters if the path goes up and down: two points can have the same height. Notice the IVT tells us this time exists without telling us when it is.</p>` },
      { q: `<p>Give an example of a function on [0, 1] that has no maximum, and explain which condition of the Extreme Value Theorem it breaks.</p>`, a: `<p>For example, <em>f</em>(<em>x</em>) = 1/<em>x</em> for <em>x</em> &gt; 0 and <em>f</em>(0) = 0. It grows without bound near 0, so it has no maximum. It breaks continuity at 0. Another: <em>f</em>(<em>x</em>) = <em>x</em> for <em>x</em> &lt; 1 and <em>f</em>(1) = 0, which approaches 1 but never reaches it, again because of a discontinuity at 1.</p>` }
    ],
    sources: ["openstaxcalc", "eoc"]
  },
  {
    id: "u3",
    title: "The derivative",
    minutes: 90,
    summary: "From average to instantaneous rate of change: the derivative as a limit, as the slope of the tangent line, and as a rate; computing derivatives from the definition; tangent lines; higher derivatives; and where derivatives don't exist.",
    notes: `
<p>The derivative answers the question: <em>how fast is this changing, right now?</em> A car's speedometer reading, the rate a population is growing today, how a model's error changes when you adjust a parameter: all are derivatives. This lesson defines the derivative carefully and computes it from scratch; the next lesson gives rules that make it fast.</p>

<h3>From average rate to instantaneous rate</h3>
<p>A stone dropped from a cliff falls <em>s</em>(<em>t</em>) = 16<em>t</em>² feet after <em>t</em> seconds (ignoring air resistance). How fast is it falling at exactly <em>t</em> = 1?</p>
<p>We can compute the <strong>average velocity</strong> over a short interval [1, 1 + <em>h</em>]: distance divided by time.</p>
<p class="math">(s(1 + h) − s(1)) / h = (16(1 + h)² − 16) / h = (32h + 16h²) / h = 32 + 16h</p>
<table>
  <thead><tr><th><em>h</em></th><th>1</th><th>0.1</th><th>0.01</th><th>0.001</th></tr></thead>
  <tbody><tr><td>Average velocity (ft/s)</td><td>48</td><td>33.6</td><td>32.16</td><td>32.016</td></tr></tbody>
</table>
<p>As the interval shrinks, the average velocity approaches 32. The <strong>instantaneous velocity</strong> at <em>t</em> = 1 is the limit: lim<sub><em>h</em>→0</sub> (32 + 16<em>h</em>) = 32 feet per second.</p>

<h3>The definition</h3>
<p>The <strong>derivative</strong> of <em>f</em> at <em>a</em> is</p>
<p class="math">f′(a) = lim<sub>h→0</sub> (f(a + h) − f(a)) / h</p>
<p>if the limit exists. The fraction is a <strong>difference quotient</strong>: the change in output divided by the change in input. Geometrically, it's the slope of the <strong>secant line</strong> through the points (<em>a</em>, <em>f</em>(<em>a</em>)) and (<em>a</em> + <em>h</em>, <em>f</em>(<em>a</em> + <em>h</em>)). As <em>h</em> → 0, the secant line pivots into the <strong>tangent line</strong>, the line that just touches the curve at <em>a</em>, and its slope becomes <em>f</em>′(<em>a</em>).</p>
<figure class="fig">
<svg viewBox="0 0 330 225" role="img" aria-label="A parabola with a secant line through the points at a and a + h, and the tangent line at a, which is less steep">
  <line x1="30" y1="200" x2="300" y2="200" class="ax"/><line x1="40" y1="212" x2="40" y2="10" class="ax"/>
  <path d="M40,200 Q150,200 260,24" class="cv"/>
  <line x1="81.25" y1="200" x2="246.25" y2="68" class="hl"/>
  <line x1="67.5" y1="200" x2="271" y2="118.6" class="ln"/>
  <line x1="95" y1="189" x2="95" y2="200" class="ax dash"/><line x1="205" y1="101" x2="205" y2="200" class="ax dash"/>
  <circle cx="95" cy="189" r="4" class="dot"/><circle cx="205" cy="101" r="4" class="dot"/>
  <text x="91" y="216" class="m">a</text><text x="190" y="216" class="m">a + h</text>
  <text x="178" y="62">secant</text><text x="232" y="138">tangent at a</text>
</svg>
<figcaption>The secant line through <em>a</em> and <em>a</em> + <em>h</em> has slope equal to the difference quotient. As <em>h</em> shrinks, the second point slides down the curve toward <em>a</em> and the secant becomes the tangent.</figcaption>
</figure>

<h3>Computing derivatives from the definition</h3>
<p><strong><em>f</em>(<em>x</em>) = <em>x</em>².</strong> (( <em>x</em> + <em>h</em>)² − <em>x</em>²)/<em>h</em> = (2<em>xh</em> + <em>h</em>²)/<em>h</em> = 2<em>x</em> + <em>h</em> → 2<em>x</em>. So <em>f</em>′(<em>x</em>) = 2<em>x</em>. At <em>x</em> = 3 the parabola has slope 6; at <em>x</em> = 0 it's flat; at <em>x</em> = −1 it slopes down.</p>
<p><strong><em>f</em>(<em>x</em>) = 1/<em>x</em>.</strong> Combine fractions:</p>
<p class="math">(1/(x + h) − 1/x) / h = (x − (x + h)) / (h·x(x + h)) = −h / (h·x(x + h)) = −1 / (x(x + h)) → −1/x²</p>
<p><strong><em>f</em>(<em>x</em>) = √<em>x</em>.</strong> Rationalize, as in the limits lesson:</p>
<p class="math">(√(x + h) − √x) / h = ((x + h) − x) / (h(√(x + h) + √x)) = 1 / (√(x + h) + √x) → 1/(2√x)</p>
<p>The derivative of a function is itself a function, <em>f</em>′(<em>x</em>), giving the slope at every point. Notice a pattern: <em>x</em>² gives 2<em>x</em>, <em>x</em><sup>−1</sup> gives −<em>x</em><sup>−2</sup>, and <em>x</em><sup>1/2</sup> gives ½<em>x</em><sup>−1/2</sup>. The next lesson turns this into the power rule.</p>

<h3>Tangent lines</h3>
<p>The tangent line to <em>y</em> = <em>f</em>(<em>x</em>) at <em>x</em> = <em>a</em> passes through (<em>a</em>, <em>f</em>(<em>a</em>)) with slope <em>f</em>′(<em>a</em>), so by point-slope form:</p>
<p class="math">y = f(a) + f′(a)(x − a)</p>
<p><em>Example:</em> the tangent to <em>y</em> = <em>x</em>² at <em>x</em> = 3 goes through (3, 9) with slope 6: <em>y</em> = 9 + 6(<em>x</em> − 3) = 6<em>x</em> − 9. Near <em>x</em> = 3, the curve and the line are almost indistinguishable, which is the basis of linear approximation in <a href="#c-math130-rates">Lesson 9</a>.</p>

<h3>Notation and meaning</h3>
<p>The derivative has several notations: <em>f</em>′(<em>x</em>), <em>dy</em>/<em>dx</em>, <em>d</em>/<em>dx</em> <em>f</em>(<em>x</em>), and <em>ẏ</em> when the variable is time. Leibniz's <em>dy</em>/<em>dx</em> suggests "a tiny change in <em>y</em> over a tiny change in <em>x</em>", which is a useful way to think about it.</p>
<p>The derivative's units are the output's units per input unit. That makes it meaningful in any context:</p>
<ul>
  <li>If <em>s</em>(<em>t</em>) is position in meters at time <em>t</em> in seconds, <em>s</em>′(<em>t</em>) is velocity in m/s.</li>
  <li>If <em>C</em>(<em>n</em>) is the cost in dollars of producing <em>n</em> items, <em>C</em>′(<em>n</em>) in dollars per item is the <em>marginal cost</em>: roughly, the cost of making one more.</li>
  <li>If <em>L</em>(<em>w</em>) is a machine learning model's error when a parameter is <em>w</em>, then <em>L</em>′(<em>w</em>) tells you which way to adjust <em>w</em> to reduce the error, and how sensitive the error is.</li>
</ul>
<p>The sign of the derivative tells you direction: <em>f</em>′ &gt; 0 means <em>f</em> is increasing there, <em>f</em>′ &lt; 0 decreasing, and <em>f</em>′ = 0 means the tangent is flat, as at the top of a hill or the bottom of a valley.</p>

<h3>Higher derivatives</h3>
<p>The derivative of <em>f</em>′ is the <strong>second derivative</strong> <em>f</em>″ (or <em>d</em>²<em>y</em>/<em>dx</em>²), the rate of change of the rate of change. For the falling stone, <em>s</em>(<em>t</em>) = 16<em>t</em>², velocity is <em>s</em>′(<em>t</em>) = 32<em>t</em> and acceleration is <em>s</em>″(<em>t</em>) = 32 ft/s², the constant acceleration of gravity. The second derivative also describes how a graph bends, which <a href="#c-math130-u5">Lesson 8</a> uses.</p>

<h3>Where derivatives don't exist</h3>
<p>We say <em>f</em> is <strong>differentiable</strong> at <em>a</em> when <em>f</em>′(<em>a</em>) exists, that is, when the limit of the difference quotient is a finite number. "Differentiable on (<em>a</em>, <em>b</em>)" means differentiable at every point of that interval. If <em>f</em>′(<em>a</em>) exists, then <em>f</em> is continuous at <em>a</em>: a function can't have a well-defined slope at a point where it jumps. But a continuous function can still fail to have a derivative:</p>
<ul>
  <li>A <strong>corner</strong>: |<em>x</em>| at 0 has slope −1 from the left and 1 from the right, so the difference quotient has no limit.</li>
  <li>A <strong>vertical tangent</strong>: ∛<em>x</em> at 0 becomes vertical, and the slope is infinite.</li>
  <li>A <strong>cusp</strong>: a sharp point where both sides of the graph turn vertical, like <em>x</em><sup>2/3</sup> at 0, whose slope goes to −∞ from the left and +∞ from the right.</li>
  <li><strong>Wild oscillation</strong>: <em>x</em> sin(1/<em>x</em>) isn't defined at 0 as written, so define <em>f</em>(0) = 0 to fill the gap. This <em>f</em> is continuous at 0 (it is squeezed between −|<em>x</em>| and |<em>x</em>|), but its difference quotient at 0 is (<em>f</em>(<em>h</em>) − 0)/<em>h</em> = sin(1/<em>h</em>), which keeps swinging between −1 and 1 as <em>h</em> → 0 and has no limit.</li>
</ul>
<p>The ReLU function, max(0, <em>x</em>), used in most modern neural networks, has a corner at 0. Machine learning libraries simply pick a value for the derivative there, and it works fine in practice.</p>

<h3>Numerical derivatives</h3>
<p>A computer can estimate <em>f</em>′(<em>a</em>) by evaluating the difference quotient with a small <em>h</em>. The <strong>central difference</strong> (<em>f</em>(<em>a</em> + <em>h</em>) − <em>f</em>(<em>a</em> − <em>h</em>))/(2<em>h</em>) is much more accurate than the one-sided version, because its errors on the two sides largely cancel. In the code, <code>h=1e-5</code> makes <em>h</em> default to 10<sup>−5</sup> (<code>1e-5</code> is Python's way of writing 1 × 10<sup>−5</sup>).</p>
<pre><code>import math

def derivative(f, a, h=1e-5):
    return (f(a + h) - f(a - h)) / (2 * h)

derivative(math.sin, 0)            # 0.99999999998... (cos 0 = 1)
derivative(lambda x: x**2, 3)      # 6.00000000004... (exact: 6)</code></pre>
<p>As with <code>bisect</code> in <a href="#c-math130-u2">Continuity</a>, <code>f</code> is a function passed in as an input. <code>math.sin</code> is passed by name, without parentheses, because we hand over the function itself rather than calling it; <code>lambda x: x**2</code> makes the function <em>x</em> ↦ <em>x</em>² on the spot.</p>
<p>But making <em>h</em> too small backfires: <em>f</em>(<em>a</em> + <em>h</em>) and <em>f</em>(<em>a</em> − <em>h</em>) become nearly equal, and subtracting them loses most of the significant digits. (Python floats use <em>double precision</em>, 64 bits, which keeps about 16 <em>significant digits</em>, the digits that carry information; see <a href="#c-cs101-u1">CS 101, Values, types and expressions</a>. As CS 101 explains, if two numbers agree in their first 12 digits, their difference has only about 4 trustworthy digits left.) Try it: <code>derivative(lambda x: x**2, 3, h=1e-15)</code> gives 5.329070518200751 instead of 6. A value of <em>h</em> around 10<sup>−5</sup> to 10<sup>−6</sup> is a good compromise in double precision.</p>
`,
    terms: [
      ["Average rate of change", "(f(b) − f(a))/(b − a): the slope of the secant line."],
      ["Derivative", "f′(a) = lim as h → 0 of (f(a + h) − f(a))/h: the instantaneous rate of change."],
      ["Difference quotient", "(f(a + h) − f(a))/h."],
      ["Tangent line", "y = f(a) + f′(a)(x − a), the line through (a, f(a)) with slope f′(a)."],
      ["Second derivative", "The derivative of the derivative; for position, acceleration."],
      ["Differentiable", "Having a derivative at a point."],
      ["Central difference", "A numerical derivative using points on both sides of a."]
    ],
    quiz: [
      ...[{"q": "Using the definition, what is the derivative of f(x) = 3x + 5?", "choices": ["3x", "3", "5", "8"], "answer": 1, "why": "[3(x + h) + 5 − 3x − 5]/h = 3h/h = 3."}, {"q": "Is f(x) = |x| differentiable at 0?", "choices": ["Yes, f′(0) = 0", "Yes, f′(0) = 1", "No, the left and right slopes differ"], "answer": 2, "why": "The slope is −1 from the left and +1 from the right, so the limit does not exist."}, {"q": "Why not use h = 10⁻¹⁵ for a numerical derivative in double precision?", "choices": ["It is too slow", "Rounding error in the subtraction f(a + h) − f(a − h) dominates", "Computers cannot store it", "It always gives 0 exactly"], "answer": 1, "why": "The two function values agree in almost every digit, so their difference is mostly rounding noise. (The one-sided f(a + h) − f(a) has the same problem.)"}],
      { q: "What is the tangent line to y = x² at x = −2?", choices: ["y = −4x − 4", "y = 4x + 4", "y = −4x + 4", "y = −2x"], answer: 0, why: "The point is (−2, 4) and the slope is 2(−2) = −4, so y = 4 − 4(x + 2) = −4x − 4." },
      { q: "C(n) is the cost in dollars of making n phones, and C′(1000) = 52. What does that mean?", choices: ["1000 phones cost $52", "The 1000th phone is the cheapest", "Making one more phone, at 1000, costs about $52", "Each phone costs $52 on average"], answer: 2, why: "The derivative is the marginal cost: the approximate cost of one more unit at that production level." }
    ],
    practice: [
      { q: `<p>For <em>f</em>(<em>x</em>) = <em>x</em>² + 3<em>x</em>, compute the average rate of change on [1, 3], then use the definition to find <em>f</em>′(<em>x</em>) and <em>f</em>′(1).</p>`, a: `<p>Average rate: (<em>f</em>(3) − <em>f</em>(1))/2 = (18 − 4)/2 = 7. Definition: ((<em>x</em> + <em>h</em>)² + 3(<em>x</em> + <em>h</em>) − <em>x</em>² − 3<em>x</em>)/<em>h</em> = (2<em>xh</em> + <em>h</em>² + 3<em>h</em>)/<em>h</em> = 2<em>x</em> + <em>h</em> + 3 → 2<em>x</em> + 3. So <em>f</em>′(1) = 5.</p>` },
      { q: `<p>Use the definition of the derivative to find <em>f</em>′(<em>x</em>) for <em>f</em>(<em>x</em>) = 1/(<em>x</em> + 1).</p>`, a: `<p>(1/(<em>x</em> + <em>h</em> + 1) − 1/(<em>x</em> + 1))/<em>h</em> = ((<em>x</em> + 1) − (<em>x</em> + <em>h</em> + 1))/(<em>h</em>(<em>x</em> + <em>h</em> + 1)(<em>x</em> + 1)) = −1/((<em>x</em> + <em>h</em> + 1)(<em>x</em> + 1)) → −1/(<em>x</em> + 1)².</p>` },
      { q: `<p>Find the equation of the tangent line to <em>y</em> = √<em>x</em> at <em>x</em> = 4, using <em>f</em>′(<em>x</em>) = 1/(2√<em>x</em>). Use it to estimate √4.4 and compare with the true value.</p>`, a: `<p>The point is (4, 2) and the slope is 1/(2 · 2) = 1/4. Tangent: <em>y</em> = 2 + (<em>x</em> − 4)/4. At 4.4: 2 + 0.1 = 2.1. The true value is √4.4 ≈ 2.0976, so the estimate is off by about 0.0024.</p>` },
      { q: `<p>A ball thrown upward has height <em>h</em>(<em>t</em>) = 48<em>t</em> − 16<em>t</em>² feet. (a) Find its velocity and acceleration as functions of time. (b) When is it at its highest point, and how high is that? (c) What is its velocity when it lands?</p>`, a: `<p>(a) Velocity <em>h</em>′(<em>t</em>) = 48 − 32<em>t</em> ft/s; acceleration <em>h</em>″(<em>t</em>) = −32 ft/s². (b) Highest when velocity is 0: <em>t</em> = 1.5 s, at <em>h</em>(1.5) = 72 − 36 = 36 ft. (c) It lands when <em>h</em>(<em>t</em>) = 0, which is at <em>t</em> = 3 (not 0); velocity there is 48 − 96 = −48 ft/s, the same speed it was thrown with, now moving downward.</p>` },
      { q: `<p>Where is <em>f</em>(<em>x</em>) = |<em>x</em> − 2| + 1 not differentiable? Sketch it and explain.</p>`, a: `<p>At <em>x</em> = 2. The graph is a V with its corner at (2, 1). The slope is −1 to the left and 1 to the right, so the difference quotient approaches different values from each side and has no limit. Everywhere else the function is a straight line and differentiable.</p>` },
      { q: `<p>Use the <code>derivative</code> function from the notes to estimate the derivative of <em>e</em><sup>x</sup> at <em>x</em> = 0, 1 and 2. Compare each estimate with <em>e</em><sup>x</sup> itself. What do you notice?</p>`, a: `<pre><code>import math
for a in [0, 1, 2]:
    print(a, derivative(math.exp, a), math.exp(a))
# 0 1.00000000001... 1.0
# 1 2.71828182847... 2.718281828459045
# 2 7.38905609898... 7.38905609893065</code></pre><p>The derivative of <em>e</em><sup>x</sup> equals <em>e</em><sup>x</sup>: the function's slope at every point equals its height. That property defines the number <em>e</em>, and the next lesson uses it.</p>` },
      { q: `<p>Run the <code>derivative</code> function for sin at <em>x</em> = 1 with <em>h</em> = 10<sup>−1</sup>, 10<sup>−3</sup>, 10<sup>−5</sup>, 10<sup>−8</sup>, 10<sup>−11</sup> and 10<sup>−14</sup>. Compare each with cos 1. Which <em>h</em> gives the best estimate, and why does the error grow again for tiny <em>h</em>?</p>`, a: `<pre><code>import math
for k in [1, 3, 5, 8, 11, 14]:
    h = 10 ** -k
    est = (math.sin(1 + h) - math.sin(1 - h)) / (2 * h)
    print(h, abs(est - math.cos(1)))</code></pre><p>The error shrinks as <em>h</em> shrinks, down to about 10<sup>−11</sup> near <em>h</em> = 10<sup>−5</sup> or 10<sup>−6</sup>, then grows again. For large <em>h</em> the error comes from the approximation itself; for tiny <em>h</em> it comes from floating-point rounding when subtracting two nearly equal numbers. The best <em>h</em> balances the two.</p>` }
    ],
    sources: ["openstaxcalc", "eoc"]
  }
]);

CSA.addUnits("math130", [
  {
    id: "u4",
    title: "Differentiation rules",
    minutes: 90,
    summary: "The rules that make derivatives fast: constant, power, sum, product and quotient rules, and the derivatives of exponential, logarithmic and trigonometric functions.",
    notes: `
<p>Computing every derivative from the limit definition would be slow and error-prone. Instead, we prove a small set of <strong>rules</strong> once, from the definition, and then combine them. This lesson covers the rules for sums, products and quotients and for the basic functions. Together with the chain rule in <a href="#c-math130-chain">the next lesson</a>, they let you differentiate almost any formula you'll meet.</p>

<h3>The basic rules</h3>
<table>
  <thead><tr><th>Rule</th><th>Formula</th><th>Example</th></tr></thead>
  <tbody>
    <tr><td>Constant</td><td>(<em>c</em>)′ = 0</td><td>(7)′ = 0</td></tr>
    <tr><td>Power</td><td>(<em>x</em><sup>n</sup>)′ = <em>n</em><em>x</em><sup>n−1</sup>, for any real <em>n</em></td><td>(<em>x</em>⁵)′ = 5<em>x</em>⁴</td></tr>
    <tr><td>Constant multiple</td><td>(<em>c</em> · <em>f</em>)′ = <em>c</em> · <em>f</em>′</td><td>(3<em>x</em>²)′ = 6<em>x</em></td></tr>
    <tr><td>Sum and difference</td><td>(<em>f</em> ± <em>g</em>)′ = <em>f</em>′ ± <em>g</em>′</td><td>(<em>x</em>³ − <em>x</em>)′ = 3<em>x</em>² − 1</td></tr>
  </tbody>
</table>
<p>The power rule works for negative and fractional powers too, so rewrite roots and fractions as powers first:</p>
<ul>
  <li>1/<em>x</em>³ = <em>x</em><sup>−3</sup>, so its derivative is −3<em>x</em><sup>−4</sup> = −3/<em>x</em>⁴.</li>
  <li>√<em>x</em> = <em>x</em><sup>1/2</sup>, so its derivative is ½<em>x</em><sup>−1/2</sup> = 1/(2√<em>x</em>), matching what we found from the definition.</li>
</ul>
<p><strong>Worked example.</strong> Differentiate <em>f</em>(<em>x</em>) = 4<em>x</em>³ − 2/<em>x</em> + 5√<em>x</em> − 7. Rewrite as 4<em>x</em>³ − 2<em>x</em><sup>−1</sup> + 5<em>x</em><sup>1/2</sup> − 7, then apply the rules term by term:</p>
<p class="math">f′(x) = 12x² + 2x<sup>−2</sup> + (5/2)x<sup>−1/2</sup> = 12x² + 2/x² + 5/(2√x)</p>

<h3>The product rule</h3>
<p>The derivative of a product is <em>not</em> the product of the derivatives. Instead:</p>
<p class="math">(f · g)′ = f′ · g + f · g′</p>
<p>Why? Picture <em>f</em> · <em>g</em> as the area of a rectangle with sides <em>f</em> and <em>g</em>. If both sides grow a little, the area grows by a strip along one side (<em>f</em>′ · <em>g</em>) plus a strip along the other (<em>f</em> · <em>g</em>′); the tiny corner piece is negligible.</p>
<p><strong>Example.</strong> (<em>x</em>² sin <em>x</em>)′ = 2<em>x</em> sin <em>x</em> + <em>x</em>² cos <em>x</em>.</p>

<h3>The quotient rule</h3>
<p class="math">(f / g)′ = (f′ · g − f · g′) / g²</p>
<p>A memory aid: "low d-high minus high d-low, over low squared". The order in the numerator matters because of the minus sign.</p>
<p><strong>Example.</strong> ((<em>x</em> + 1)/(<em>x</em> − 1))′ = (1 · (<em>x</em> − 1) − (<em>x</em> + 1) · 1)/(<em>x</em> − 1)² = −2/(<em>x</em> − 1)².</p>

<h3>Exponential, logarithmic and trigonometric functions</h3>
<table>
  <thead><tr><th>Function</th><th>Derivative</th><th>Note</th></tr></thead>
  <tbody>
    <tr><td><em>e</em><sup>x</sup></td><td><em>e</em><sup>x</sup></td><td>Its own derivative; this is what makes <em>e</em> special</td></tr>
    <tr><td><em>a</em><sup>x</sup></td><td><em>a</em><sup>x</sup> ln <em>a</em></td><td>(2<sup>x</sup>)′ = 2<sup>x</sup> ln 2 ≈ 0.693 · 2<sup>x</sup></td></tr>
    <tr><td>ln <em>x</em></td><td>1/<em>x</em></td><td>For <em>x</em> &gt; 0</td></tr>
    <tr><td>log<sub><em>b</em></sub> <em>x</em></td><td>1/(<em>x</em> ln <em>b</em>)</td><td>Since log<sub><em>b</em></sub> <em>x</em> = ln <em>x</em> / ln <em>b</em> (change of base), and 1/ln <em>b</em> is a constant</td></tr>
    <tr><td>sin <em>x</em></td><td>cos <em>x</em></td><td>Radians only</td></tr>
    <tr><td>cos <em>x</em></td><td>−sin <em>x</em></td><td>Note the minus sign</td></tr>
    <tr><td>tan <em>x</em></td><td>sec² <em>x</em> = 1/cos² <em>x</em></td><td>From the quotient rule on sin/cos</td></tr>
    <tr><td>arctan <em>x</em></td><td>1/(1 + <em>x</em>²)</td><td>Defined for all <em>x</em>; derived in the next lesson</td></tr>
    <tr><td>arcsin <em>x</em></td><td>1/√(1 − <em>x</em>²)</td><td>For −1 &lt; <em>x</em> &lt; 1; derived in the next lesson</td></tr>
  </tbody>
</table>
<p>Here sec <em>x</em> = 1/cos <em>x</em> is the secant, and arctan and arcsin are the inverse trigonometric functions; all three are reviewed in <a href="#c-math130-trig">Lesson 2</a>. The rules for <em>a</em><sup>x</sup>, ln <em>x</em>, arctan and arcsin each follow in a line or two from the chain rule, so we derive them in <a href="#c-math130-chain">the next lesson</a>, once the chain rule is in hand.</p>
<p><strong>Why <em>e</em><sup>x</sup> is its own derivative.</strong> Use the definition. Since <em>e</em><sup>x + h</sup> = <em>e</em><sup>x</sup> · <em>e</em><sup>h</sup>,</p>
<p class="math">(e<sup>x+h</sup> − e<sup>x</sup>) / h = e<sup>x</sup> · (e<sup>h</sup> − 1) / h</p>
<p>The second factor, (<em>e</em><sup>h</sup> − 1)/<em>h</em>, is the slope of the graph of <em>e</em><sup>x</sup> at 0 as <em>h</em> → 0, and <em>e</em> was chosen in <a href="#c-math130-pre">Lesson 1</a> to be exactly the base that makes this slope 1. (<a href="#c-math130-u1">Lesson 3</a>'s Practice 6 checks numerically that lim (<em>e</em><sup>h</sup> − 1)/<em>h</em> = 1.) So the whole quotient approaches <em>e</em><sup>x</sup> · 1 = <em>e</em><sup>x</sup>. For any other base the same steps give <em>b</em><sup>x</sup> times the slope of <em>b</em><sup>x</sup> at 0, which is about 0.693 for 2; the derivation of (<em>a</em><sup>x</sup>)′ in <a href="#c-math130-chain">the next lesson</a> shows that this number is ln <em>a</em>.</p>
<p><strong>Why sin <em>x</em> has derivative cos <em>x</em>.</strong> This one needs two facts. The first is the angle-addition formula from trigonometry, sin(<em>x</em> + <em>h</em>) = sin <em>x</em> cos <em>h</em> + cos <em>x</em> sin <em>h</em>. The second is a companion to lim (sin <em>h</em>)/<em>h</em> = 1 from <a href="#c-math130-u1">Lesson 3</a>: lim<sub><em>h</em>→0</sub> (cos <em>h</em> − 1)/<em>h</em> = 0. To see it, multiply top and bottom by the conjugate cos <em>h</em> + 1 and use cos² <em>h</em> − 1 = −sin² <em>h</em>:</p>
<p class="math">(cos h − 1)/h = −sin² h / (h(cos h + 1)) = −(sin h / h) · (sin h / (cos h + 1)) → −1 · 0/2 = 0</p>
<p>Now the difference quotient splits into two familiar pieces:</p>
<p class="math">(sin(x + h) − sin x)/h = sin x · (cos h − 1)/h + cos x · (sin h)/h → sin x · 0 + cos x · 1 = cos x</p>
<p>The limit (sin <em>h</em>)/<em>h</em> → 1 holds only when angles are measured in radians, which is why the rule needs radians. The derivative of cos <em>x</em> comes the same way from cos(<em>x</em> + <em>h</em>) = cos <em>x</em> cos <em>h</em> − sin <em>x</em> sin <em>h</em>, which gives −sin <em>x</em>.</p>
<p>Exponential growth has a natural interpretation: for <em>e</em><sup>x</sup>, the rate of growth always equals the current amount, like a population whose growth rate is proportional to its size.</p>
`,
    terms: [
      ["Power rule", "The derivative of xⁿ is n·xⁿ⁻¹, for any real n."],
      ["Product rule", "(fg)′ = f′g + fg′."],
      ["Quotient rule", "(f/g)′ = (f′g − fg′)/g²."]
    ],
    quiz: [
      {"q": "What is d/dx [x³ sin x]?", "choices": ["3x² cos x", "3x² sin x + x³ cos x", "3x² sin x − x³ cos x", "x³ cos x"], "answer": 1, "why": "Product rule: (x³)′ sin x + x³ (sin x)′."},
      { q: "What is d/dx [1/x²]?", choices: ["−2/x³", "1/(2x)", "−1/x²", "2/x³"], answer: 0, why: "Rewrite as x⁻², then the power rule gives −2x⁻³ = −2/x³." },
      { q: "What is d/dx [e<sup><em>x</em></sup> cos <em>x</em>]?", choices: ["−e<sup><em>x</em></sup> sin <em>x</em>", "e<sup><em>x</em></sup> cos <em>x</em> − e<sup><em>x</em></sup> sin <em>x</em>", "e<sup><em>x</em></sup> cos <em>x</em> + e<sup><em>x</em></sup> sin <em>x</em>", "e<sup><em>x</em></sup> sin <em>x</em>"], answer: 1, why: "Product rule: (e<sup><em>x</em></sup>)′ cos <em>x</em> + e<sup><em>x</em></sup> (cos <em>x</em>)′ = e<sup><em>x</em></sup> cos <em>x</em> − e<sup><em>x</em></sup> sin <em>x</em>." }
    ],
    practice: [
      { q: `<p>Differentiate: (a) 7<em>x</em>⁴ − 3<em>x</em> + 2. (b) 5/<em>x</em>² + ∛<em>x</em>. (c) (<em>x</em>² + 1)(<em>x</em>³ − <em>x</em>), two ways: by expanding first, and with the product rule.</p>`, a: `<p>(a) 28<em>x</em>³ − 3. (b) 5<em>x</em><sup>−2</sup> + <em>x</em><sup>1/3</sup> → −10<em>x</em><sup>−3</sup> + ⅓<em>x</em><sup>−2/3</sup>. (c) Expanding: <em>x</em>⁵ − <em>x</em>, so 5<em>x</em>⁴ − 1. Product rule: 2<em>x</em>(<em>x</em>³ − <em>x</em>) + (<em>x</em>² + 1)(3<em>x</em>² − 1) = 2<em>x</em>⁴ − 2<em>x</em>² + 3<em>x</em>⁴ + 2<em>x</em>² − 1 = 5<em>x</em>⁴ − 1. Getting the same answer two ways is a good check.</p>` },
      { q: `<p>Differentiate: (a) <em>x</em>/(<em>x</em>² + 1). (b) <em>e</em><sup>x</sup>/<em>x</em>. (c) tan <em>x</em>, using the quotient rule on sin <em>x</em>/cos <em>x</em>.</p>`, a: `<p>(a) ((<em>x</em>² + 1) − <em>x</em> · 2<em>x</em>)/(<em>x</em>² + 1)² = (1 − <em>x</em>²)/(<em>x</em>² + 1)². (b) (<em>e</em><sup>x</sup> · <em>x</em> − <em>e</em><sup>x</sup>)/<em>x</em>² = <em>e</em><sup>x</sup>(<em>x</em> − 1)/<em>x</em>². (c) (cos <em>x</em> · cos <em>x</em> − sin <em>x</em> · (−sin <em>x</em>))/cos² <em>x</em> = (cos² <em>x</em> + sin² <em>x</em>)/cos² <em>x</em> = 1/cos² <em>x</em>.</p>` },
      { q: `<p>Differentiate: (a) e<sup><em>x</em></sup> sin <em>x</em>. (b) <em>x</em>² ln <em>x</em>. (c) (<em>x</em> + 1)/e<sup><em>x</em></sup>. (d) 5<sup><em>x</em></sup>.</p>`, a: `<p>(a) Product rule: e<sup><em>x</em></sup> sin <em>x</em> + e<sup><em>x</em></sup> cos <em>x</em> = e<sup><em>x</em></sup>(sin <em>x</em> + cos <em>x</em>). (b) 2<em>x</em> ln <em>x</em> + <em>x</em>² · (1/<em>x</em>) = 2<em>x</em> ln <em>x</em> + <em>x</em>. (c) Quotient rule: (1 · e<sup><em>x</em></sup> − (<em>x</em> + 1)e<sup><em>x</em></sup>)/e<sup>2<em>x</em></sup> = −<em>x</em>e<sup><em>x</em></sup>/e<sup>2<em>x</em></sup> = −<em>x</em>/e<sup><em>x</em></sup>. (d) 5<sup><em>x</em></sup> ln 5.</p>` }
    ],
    sources: ["openstaxcalc", "eoc"]
  },
  {
    id: "chain",
    title: "The chain rule and implicit differentiation",
    minutes: 90,
    summary: "Differentiating compositions with the chain rule, combining rules, implicit differentiation, and where the derivatives of exponentials, logarithms and arctan come from.",
    notes: `
<p><a href="#c-math130-u4">The previous lesson</a> gave rules for sums, products, quotients and the basic functions. This lesson adds the most important rule of all, the chain rule, for functions applied to other functions. With it you can differentiate almost any formula, differentiate curves given by equations (implicit differentiation), and see where the derivatives of the exponential, the logarithm and arctan come from.</p>

<h3>The chain rule</h3>
<p>The chain rule handles <strong>compositions</strong>, a function applied to another function, and it is the most important rule in this lesson:</p>
<p class="math">(f(g(x)))′ = f′(g(x)) · g′(x)</p>
<p>In words: <strong>the derivative of the outer function, evaluated at the inner function, times the derivative of the inner function.</strong> In Leibniz notation, with <em>u</em> = <em>g</em>(<em>x</em>), it reads like fractions canceling: <em>dy</em>/<em>dx</em> = (<em>dy</em>/<em>du</em>) · (<em>du</em>/<em>dx</em>). If a gear <em>u</em> turns 3 times as fast as <em>x</em>, and <em>y</em> turns 2 times as fast as <em>u</em>, then <em>y</em> turns 6 times as fast as <em>x</em>.</p>
<p><strong>Why it's true.</strong> A derivative is a stretch factor for small changes: near a point, a small change Δ<em>x</em> in the input changes <em>g</em>(<em>x</em>) by about <em>g</em>′(<em>x</em>) · Δ<em>x</em>. Follow a small change through both functions:</p>
<ol>
  <li>Change <em>x</em> by Δ<em>x</em>. The inner value <em>u</em> = <em>g</em>(<em>x</em>) changes by Δ<em>u</em> ≈ <em>g</em>′(<em>x</em>) · Δ<em>x</em>.</li>
  <li>That change in <em>u</em> changes <em>y</em> = <em>f</em>(<em>u</em>) by Δ<em>y</em> ≈ <em>f</em>′(<em>u</em>) · Δ<em>u</em> ≈ <em>f</em>′(<em>g</em>(<em>x</em>)) · <em>g</em>′(<em>x</em>) · Δ<em>x</em>.</li>
  <li>Divide by Δ<em>x</em>: Δ<em>y</em>/Δ<em>x</em> ≈ <em>f</em>′(<em>g</em>(<em>x</em>)) · <em>g</em>′(<em>x</em>). As Δ<em>x</em> → 0 the approximations become exact, and the left side becomes <em>dy</em>/<em>dx</em>.</li>
</ol>
<figure class="fig">
<svg viewBox="0 0 480 170" role="img" aria-label="Three number lines labeled x, u = g(x) and y = f(u). A small change Δx on the first line becomes a change three times as long on the u line, and that becomes a change twice as long again, six times Δx, on the y line.">
  <line x1="110" y1="40" x2="470" y2="40" class="ax"/>
  <text x="10" y="45" class="m">x</text>
  <line x1="150" y1="40" x2="180" y2="40" class="cv"/>
  <line x1="150" y1="33" x2="150" y2="47" class="cv"/><line x1="180" y1="33" x2="180" y2="47" class="cv"/>
  <text x="150" y="28" class="m">Δx</text>
  <line x1="110" y1="95" x2="470" y2="95" class="ax"/>
  <text x="10" y="100" class="m">u = g(x)</text>
  <line x1="150" y1="95" x2="240" y2="95" class="cv"/>
  <line x1="150" y1="88" x2="150" y2="102" class="cv"/><line x1="240" y1="88" x2="240" y2="102" class="cv"/>
  <text x="150" y="83" class="m">Δu ≈ g′ · Δx = 3Δx</text>
  <line x1="110" y1="150" x2="470" y2="150" class="ax"/>
  <text x="10" y="155" class="m">y = f(u)</text>
  <line x1="150" y1="150" x2="330" y2="150" class="cv"/>
  <line x1="150" y1="143" x2="150" y2="157" class="cv"/><line x1="330" y1="143" x2="330" y2="157" class="cv"/>
  <text x="150" y="138" class="m">Δy ≈ f′ · Δu = 6Δx</text>
  <text x="340" y="70" class="m">× 3 (inner rate)</text>
  <text x="340" y="125" class="m">× 2 (outer rate)</text>
</svg>
<figcaption>Rates multiply. Where the inner function stretches small changes by <em>g</em>′ = 3 and the outer one stretches them by <em>f</em>′ = 2, a small change in <em>x</em> becomes a change 6 times as big in <em>y</em>.</figcaption>
</figure>
<p><em>A check with numbers:</em> for <em>y</em> = sin(5<em>x</em>) at <em>x</em> = 0.2, take Δ<em>x</em> = 0.001. Then <em>u</em> = 5<em>x</em> moves from 1 to 1.005 (Δ<em>u</em> = 0.005), and sin <em>u</em> changes by about cos(1) · 0.005 ≈ 0.0027. So Δ<em>y</em>/Δ<em>x</em> ≈ 2.7, matching the chain rule's 5 cos(1) ≈ 2.7015. (A complete proof also handles inner functions whose Δ<em>u</em> can be exactly 0; you don't need that detail here.)</p>
<p>A reliable method: name the inner function <em>u</em>, differentiate the outer function with respect to <em>u</em>, then multiply by <em>du</em>/<em>dx</em>.</p>
<table>
  <thead><tr><th>Function</th><th>Outer, inner</th><th>Derivative</th></tr></thead>
  <tbody>
    <tr><td>(3<em>x</em>² + 1)⁵</td><td><em>u</em>⁵, <em>u</em> = 3<em>x</em>² + 1</td><td>5(3<em>x</em>² + 1)⁴ · 6<em>x</em> = 30<em>x</em>(3<em>x</em>² + 1)⁴</td></tr>
    <tr><td><em>e</em><sup>−x²</sup></td><td><em>e</em><sup>u</sup>, <em>u</em> = −<em>x</em>²</td><td><em>e</em><sup>−x²</sup> · (−2<em>x</em>)</td></tr>
    <tr><td>sin(5<em>x</em>)</td><td>sin <em>u</em>, <em>u</em> = 5<em>x</em></td><td>5 cos(5<em>x</em>)</td></tr>
    <tr><td>√(<em>x</em>² + 9)</td><td><em>u</em><sup>1/2</sup>, <em>u</em> = <em>x</em>² + 9</td><td>½(<em>x</em>² + 9)<sup>−1/2</sup> · 2<em>x</em> = <em>x</em>/√(<em>x</em>² + 9)</td></tr>
    <tr><td>ln(<em>x</em>² + 1)</td><td>ln <em>u</em>, <em>u</em> = <em>x</em>² + 1</td><td>2<em>x</em>/(<em>x</em>² + 1)</td></tr>
  </tbody>
</table>
<p>The most common mistake in all of first-year calculus is forgetting the inner derivative: writing cos(5<em>x</em>) instead of 5 cos(5<em>x</em>). For deeper compositions, apply the rule repeatedly, peeling one layer at a time: (sin(<em>x</em>³))² has derivative 2 sin(<em>x</em>³) · cos(<em>x</em>³) · 3<em>x</em>².</p>
<p>A neural network is a long chain of composed functions, and <strong>backpropagation</strong>, the algorithm that trains it, is the chain rule applied layer by layer from the output back to the input. The optional lesson on calculus in machine learning shows how.</p>

<h3>Combining rules</h3>
<p>Real problems mix rules. Work from the outermost structure inward.</p>
<p><strong>Example.</strong> <em>y</em> = <em>x</em>² <em>e</em><sup>3x</sup>. The outermost structure is a product, so use the product rule, and the chain rule for <em>e</em><sup>3x</sup>:</p>
<p class="math">y′ = 2x · e<sup>3x</sup> + x² · 3e<sup>3x</sup> = x e<sup>3x</sup>(2 + 3x)</p>

<h3>Implicit differentiation</h3>
<p>Sometimes <em>y</em> isn't given as a formula in <em>x</em> but by an equation, like the circle <em>x</em>² + <em>y</em>² = 25. Differentiate both sides with respect to <em>x</em>, treating <em>y</em> as a function of <em>x</em>, so the chain rule gives (<em>y</em>²)′ = 2<em>y</em> · <em>y</em>′:</p>
<p class="math">2x + 2y·y′ = 0, so y′ = −x/y</p>
<p>At the point (3, 4) on the circle, the slope is −3/4, and the tangent line is <em>y</em> − 4 = −¾(<em>x</em> − 3). This makes sense geometrically: the tangent to a circle is perpendicular to the radius, which has slope 4/3. Implicit differentiation is the key technique for related rates in <a href="#c-math130-rates">Lesson 9</a>.</p>

<h3>Where the exponential, logarithm and inverse-trig rules come from</h3>
<p>With the chain rule and implicit differentiation, each rule in the table in <a href="#c-math130-u4">Differentiation rules</a> takes only a line or two.</p>
<ul>
  <li><strong><em>a</em><sup>x</sup>.</strong> Since <em>a</em> = <em>e</em><sup>ln <em>a</em></sup>, we can write <em>a</em><sup>x</sup> = <em>e</em><sup>x ln <em>a</em></sup>. This is <em>e</em><sup>u</sup> with inner function <em>u</em> = <em>x</em> ln <em>a</em>, whose derivative is the constant ln <em>a</em>. By the chain rule, (<em>a</em><sup>x</sup>)′ = <em>e</em><sup>x ln <em>a</em></sup> · ln <em>a</em> = <em>a</em><sup>x</sup> ln <em>a</em>.</li>
  <li><strong>ln <em>x</em>.</strong> ln is the inverse of <em>e</em><sup>x</sup>: <em>y</em> = ln <em>x</em> means <em>e</em><sup>y</sup> = <em>x</em>. Differentiate both sides implicitly: <em>e</em><sup>y</sup> · <em>y</em>′ = 1, so <em>y</em>′ = 1/<em>e</em><sup>y</sup> = 1/<em>x</em>.</li>
  <li><strong>arctan <em>x</em>.</strong> <em>y</em> = arctan <em>x</em> means tan <em>y</em> = <em>x</em>, with −π/2 &lt; <em>y</em> &lt; π/2. Differentiate implicitly: sec² <em>y</em> · <em>y</em>′ = 1, so <em>y</em>′ = 1/sec² <em>y</em>. By the identity sec² <em>y</em> = 1 + tan² <em>y</em> = 1 + <em>x</em>², this is <strong>1/(1 + <em>x</em>²)</strong>.</li>
  <li><strong>arcsin <em>x</em>.</strong> <em>y</em> = arcsin <em>x</em> means sin <em>y</em> = <em>x</em>, with −π/2 ≤ <em>y</em> ≤ π/2. Then cos <em>y</em> · <em>y</em>′ = 1, so <em>y</em>′ = 1/cos <em>y</em>. On that interval cos <em>y</em> ≥ 0, so cos <em>y</em> = √(1 − sin² <em>y</em>) = √(1 − <em>x</em>²), giving 1/√(1 − <em>x</em>²).</li>
</ul>
<p>The same method works for any inverse function: write <em>f</em>(<em>y</em>) = <em>x</em>, differentiate implicitly, and express the answer in terms of <em>x</em>. Chain-rule example: (arctan(<em>x</em>²))′ = 1/(1 + <em>x</em>⁴) · 2<em>x</em> = 2<em>x</em>/(1 + <em>x</em>⁴), which is 1 at <em>x</em> = 1. A Python check with the <code>derivative</code> function from the previous lesson: <code>derivative(math.atan, 1)</code> gives <code>0.50000000000882…</code>, matching 1/(1 + 1²) = 0.5, and <code>derivative(lambda x: math.atan(x**2), 1)</code> gives <code>0.99999999996…</code>, matching 1.</p>`,
    terms: [
      ["Chain rule", "(f(g(x)))′ = f′(g(x))·g′(x): outer derivative at the inner function, times the inner derivative."],
      ["Implicit differentiation", "Differentiating both sides of an equation, treating y as a function of x."],
      ["Derivative of arctan", "d/dx arctan x = 1/(1 + x²), found by differentiating tan y = x implicitly."],
      ["Backpropagation", "Computing gradients in a neural network by applying the chain rule backward through its layers."]
    ],
    quiz: [
      {"q": "What is d/dx [ln(x² + 1)]?", "choices": ["1/(x² + 1)", "2x/(x² + 1)", "2x ln(x² + 1)", "1/(2x)"], "answer": 1, "why": "Chain rule: 1/u · u′ with u = x² + 1 and u′ = 2x."},
      {"q": "Backpropagation in neural networks is an application of which rule?", "choices": ["Quotient rule", "Power rule", "Chain rule", "L'Hôpital's rule"], "answer": 2, "why": "A network is a composition of layers; gradients flow back through it by the chain rule."},
      { q: "What is d/dx [cos(3x)]?", choices: ["−sin(3x)", "−3 sin(3x)", "3 sin(3x)", "sin(3x)"], answer: 1, why: "Outer derivative −sin evaluated at 3x, times the inner derivative 3." },
      { q: "What is d/dx [arctan(3x)]?", choices: ["1/(1 + 9x²)", "3/(1 + 9x²)", "3/(1 + x²)", "3 sec²(3x)"], answer: 1, why: "Chain rule: the outer derivative 1/(1 + u²) at u = 3x, times the inner derivative 3." },
      { q: "For x² + y² = 25, what is the slope of the tangent at (−3, 4)?", choices: ["3/4", "−3/4", "4/3", "−4/3"], answer: 0, why: "y′ = −x/y = −(−3)/4 = 3/4." }
    ],
    practice: [
      { q: `<p>Use the chain rule: (a) (2<em>x</em> − 5)¹⁰. (b) <em>e</em><sup>sin <em>x</em></sup>. (c) ln(cos <em>x</em>). (d) √(1 − <em>x</em>²).</p>`, a: `<p>(a) 10(2<em>x</em> − 5)⁹ · 2 = 20(2<em>x</em> − 5)⁹. (b) <em>e</em><sup>sin <em>x</em></sup> cos <em>x</em>. (c) (1/cos <em>x</em>) · (−sin <em>x</em>) = −tan <em>x</em>. (d) ½(1 − <em>x</em>²)<sup>−1/2</sup> · (−2<em>x</em>) = −<em>x</em>/√(1 − <em>x</em>²).</p>` },
      { q: `<p>Differentiate <em>y</em> = <em>x</em>³ ln <em>x</em> and <em>y</em> = sin²(4<em>x</em>).</p>`, a: `<p><em>x</em>³ ln <em>x</em>: product rule, 3<em>x</em>² ln <em>x</em> + <em>x</em>³ · (1/<em>x</em>) = 3<em>x</em>² ln <em>x</em> + <em>x</em>². sin²(4<em>x</em>) = (sin(4<em>x</em>))²: chain rule twice, 2 sin(4<em>x</em>) · cos(4<em>x</em>) · 4 = 8 sin(4<em>x</em>) cos(4<em>x</em>).</p>` },
      { q: `<p>A student writes d/dx [sin(<em>x</em>²)] = cos(2<em>x</em>). Explain the two mistakes and give the right answer.</p>`, a: `<p>The outer derivative cos must be evaluated at the inner function <em>x</em>², not at its derivative, and then multiplied by the inner derivative 2<em>x</em>. Correct: 2<em>x</em> cos(<em>x</em>²).</p>` },
      { q: `<p>Find the slope of the curve <em>x</em>² + <em>xy</em> + <em>y</em>² = 7 at the point (1, 2).</p>`, hint: `<p>Use the product rule on <em>xy</em>: its derivative is 1 · <em>y</em> + <em>x</em> · <em>y</em>′.</p>`, a: `<p>Differentiate: 2<em>x</em> + (<em>y</em> + <em>x</em><em>y</em>′) + 2<em>y</em><em>y</em>′ = 0, so <em>y</em>′(<em>x</em> + 2<em>y</em>) = −(2<em>x</em> + <em>y</em>), and <em>y</em>′ = −(2<em>x</em> + <em>y</em>)/(<em>x</em> + 2<em>y</em>). At (1, 2): −4/5.</p>` },
      { q: `<p>Check your answer to <em>y</em> = <em>x</em>² <em>e</em><sup>3x</sup> at <em>x</em> = 1 numerically with the central-difference <code>derivative</code> function from the previous lesson.</p>`, a: `<pre><code>import math
f = lambda x: x**2 * math.exp(3 * x)
exact = lambda x: x * math.exp(3 * x) * (2 + 3 * x)
print(derivative(f, 1), exact(1))   # both about 100.428</code></pre><p>The formula gives 1 · <em>e</em>³ · 5 = 5<em>e</em>³ ≈ 100.43. Checking symbolic answers numerically is a habit that catches many algebra mistakes.</p>` },
      { q: `<p>Differentiate: (a) arctan(<em>x</em>/2). (b) <em>x</em> arctan <em>x</em>. (c) 10<sup>x</sup>. Then (d) find the slope of <em>y</em> = arctan <em>x</em> at <em>x</em> = 0 and at <em>x</em> = 3, and say what happens to the slope as <em>x</em> grows.</p>`, a: `<p>(a) 1/(1 + <em>x</em>²/4) · ½ = 2/(4 + <em>x</em>²). (b) Product rule: arctan <em>x</em> + <em>x</em>/(1 + <em>x</em>²). (c) 10<sup>x</sup> ln 10 ≈ 2.303 · 10<sup>x</sup>. (d) 1/(1 + 0) = 1 at 0, and 1/(1 + 9) = 0.1 at 3. The slope 1/(1 + <em>x</em>²) shrinks toward 0 as <em>x</em> grows, which is why the graph levels off toward its asymptote π/2.</p>` }
    ],
    sources: ["openstaxcalc", "eoc"]
  },
  {
    id: "u5",
    title: "Extreme values, the Mean Value Theorem and optimization",
    minutes: 90,
    summary: "What derivatives say about a graph: increasing and decreasing, critical points, local and absolute extremes, concavity and inflection points, the Mean Value Theorem, solving optimization problems, and gradient descent.",
    notes: `
<p>The derivative tells you how a function is changing, so it tells you about the shape of its graph: where it rises and falls, where it peaks, and how it bends. That's enough to find the best possible value of something, which is <strong>optimization</strong>, one of calculus's most useful applications in science, engineering, economics and machine learning.</p>

<h3>Increasing, decreasing and critical points</h3>
<p>Where <em>f</em>′(<em>x</em>) &gt; 0 the function is increasing; where <em>f</em>′(<em>x</em>) &lt; 0 it's decreasing. It can only switch between the two where <em>f</em>′ is zero or undefined. Those inputs are the <strong>critical points</strong>: values <em>c</em> in the domain where <em>f</em>′(<em>c</em>) = 0 or <em>f</em>′(<em>c</em>) doesn't exist.</p>
<p>A <strong>local maximum</strong> is a point higher than all nearby points: a hilltop. A <strong>local minimum</strong> is a valley floor. Local extremes in the interior of the domain can only occur at critical points, because if the slope were positive or negative there, you could move a little and go higher or lower.</p>
<p>But not every critical point is an extreme: <em>x</em>³ has <em>f</em>′(0) = 0, yet it keeps rising through 0. To classify a critical point, use one of two tests.</p>
<ul>
  <li><strong>First derivative test:</strong> if <em>f</em>′ changes from + to − at <em>c</em>, it's a local max; from − to +, a local min; if it doesn't change sign, neither.</li>
  <li><strong>Second derivative test:</strong> if <em>f</em>′(<em>c</em>) = 0 and <em>f</em>″(<em>c</em>) &lt; 0, local max; if <em>f</em>″(<em>c</em>) &gt; 0, local min; if <em>f</em>″(<em>c</em>) = 0, the test tells you nothing.</li>
</ul>

<h3>Concavity and inflection points</h3>
<p>The second derivative describes how the graph bends. Where <em>f</em>″ &gt; 0 the graph is <strong>concave up</strong>, shaped like a cup, with its slope increasing. Where <em>f</em>″ &lt; 0 it's <strong>concave down</strong>, shaped like a cap. A point where the concavity changes is an <strong>inflection point</strong>. That's why the second derivative test works: at a flat point in a cup you're at the bottom, and in a cap you're at the top.</p>

<h3>Worked example: analyzing a function</h3>
<p>Analyze <em>f</em>(<em>x</em>) = <em>x</em>³ − 3<em>x</em>.</p>
<ul>
  <li><em>f</em>′(<em>x</em>) = 3<em>x</em>² − 3 = 3(<em>x</em> − 1)(<em>x</em> + 1), so the critical points are <em>x</em> = −1 and <em>x</em> = 1.</li>
  <li>Sign of <em>f</em>′: positive for <em>x</em> &lt; −1, negative between −1 and 1, positive for <em>x</em> &gt; 1. So <em>f</em> rises, falls, then rises.</li>
  <li><em>f</em>″(<em>x</em>) = 6<em>x</em>. At <em>x</em> = −1, <em>f</em>″ = −6 &lt; 0: local max, <em>f</em>(−1) = 2. At <em>x</em> = 1, <em>f</em>″ = 6 &gt; 0: local min, <em>f</em>(1) = −2.</li>
  <li><em>f</em>″ changes sign at <em>x</em> = 0, so (0, 0) is an inflection point: concave down to the left, concave up to the right.</li>
</ul>
<p>With these facts you can sketch the graph without plotting points: a rise to a peak at (−1, 2), a fall through the inflection point at the origin to a valley at (1, −2), and a rise again.</p>

<h3>Absolute extremes on a closed interval</h3>
<p>The Extreme Value Theorem promises that a continuous function on a closed interval [<em>a</em>, <em>b</em>] has an absolute maximum and minimum. They can only occur at critical points or at the endpoints. That gives the <strong>closed interval method</strong>: evaluate <em>f</em> at every critical point in the interval and at both endpoints, then compare.</p>
<p><em>Example:</em> <em>f</em>(<em>x</em>) = <em>x</em>³ − 3<em>x</em> on [−2, 3]. The candidates are <em>f</em>(−2) = −2, <em>f</em>(−1) = 2, <em>f</em>(1) = −2, and <em>f</em>(3) = 18. The absolute maximum is 18, at the endpoint <em>x</em> = 3; the absolute minimum is −2, reached at both <em>x</em> = −2 and <em>x</em> = 1. The local max at −1 isn't the absolute max: endpoints matter.</p>

<h3>The Mean Value Theorem</h3>
<p><strong>Theorem (MVT).</strong> If <em>f</em> is continuous on [<em>a</em>, <em>b</em>] and differentiable on (<em>a</em>, <em>b</em>), then there is some <em>c</em> between <em>a</em> and <em>b</em> where</p>
<p class="math">f′(c) = (f(b) − f(a)) / (b − a)</p>
<p>In words: at some moment, the instantaneous rate of change equals the average rate of change. Geometrically: somewhere, the tangent line is parallel to the secant line joining the endpoints.</p>
<p><em>Example:</em> you drive 120 miles in 1.5 hours, an average of 80 mph. The MVT guarantees that at some instant your speedometer read exactly 80 mph. Average-speed cameras, such as Italy's Tutor system on its highways, issue speeding tickets using exactly this reasoning: if your average speed between two cameras was over the limit, you must have exceeded it at some moment.</p>
<p>The MVT is what justifies facts we've been using: if <em>f</em>′ &gt; 0 on an interval, <em>f</em> is increasing there; and if <em>f</em>′ = 0 everywhere on an interval, <em>f</em> is constant there. (A special case, when <em>f</em>(<em>a</em>) = <em>f</em>(<em>b</em>), is called Rolle's theorem: somewhere in between the tangent is flat.)</p>

<h3>Solving optimization problems</h3>
<p>Word problems follow the same steps every time:</p>
<ol>
  <li><strong>Draw a picture</strong> and name the quantities, with units.</li>
  <li><strong>Write the quantity to optimize</strong> as a formula.</li>
  <li><strong>Use the constraint</strong> to reduce it to one variable, and find that variable's allowed range.</li>
  <li><strong>Find the critical points</strong> and check the endpoints.</li>
  <li><strong>Answer the question that was asked</strong>, in context, with units.</li>
</ol>
<p><strong>Example: the fence.</strong> A farmer has 400 m of fence for a rectangular pen along a river, with no fence needed on the river side. What dimensions give the largest area?</p>
<figure class="fig">
<svg viewBox="0 0 320 175" role="img" aria-label="A rectangle against a river on top. The two sides perpendicular to the river are each x meters; the side parallel to the river is 400 minus 2x meters.">
  <path d="M10,28 Q30,18 50,28 T90,28 T130,28 T170,28 T210,28 T250,28 T290,28 T310,28" class="cv"/>
  <text x="105" y="16" class="m">river (no fence needed)</text>
  <line x1="60" y1="40" x2="60" y2="140" class="ln"/><line x1="260" y1="40" x2="260" y2="140" class="ln"/><line x1="60" y1="140" x2="260" y2="140" class="ln"/>
  <text x="40" y="95">x</text><text x="268" y="95">x</text><text x="125" y="160">400 − 2x</text>
  <text x="120" y="95" class="m">area A = x(400 − 2x)</text>
</svg>
<figcaption>The two sides perpendicular to the river are <em>x</em> each, so the side parallel to the river gets the remaining 400 − 2<em>x</em> meters.</figcaption>
</figure>
<p>The area is <em>A</em>(<em>x</em>) = <em>x</em>(400 − 2<em>x</em>) = 400<em>x</em> − 2<em>x</em>², with 0 ≤ <em>x</em> ≤ 200. <em>A</em>′(<em>x</em>) = 400 − 4<em>x</em> = 0 gives <em>x</em> = 100. At the endpoints the area is 0, and <em>A</em>(100) = 20,000. So the pen should be 100 m deep and 200 m wide along the river, enclosing 20,000 m².</p>
<p><strong>Example: the box.</strong> An open-top box is made from a 12 cm × 12 cm sheet by cutting a square of side <em>x</em> from each corner and folding up the sides. Its volume is <em>V</em>(<em>x</em>) = <em>x</em>(12 − 2<em>x</em>)², with 0 ≤ <em>x</em> ≤ 6. Using the product and chain rules, <em>V</em>′(<em>x</em>) = (12 − 2<em>x</em>)² − 4<em>x</em>(12 − 2<em>x</em>) = (12 − 2<em>x</em>)(12 − 6<em>x</em>). The critical points are <em>x</em> = 6 (an endpoint, with volume 0) and <em>x</em> = 2, giving <em>V</em>(2) = 2 · 8² = 128 cm³, the maximum.</p>

<h3>When you can't solve f′ = 0: gradient descent</h3>
<p>For complicated functions, solving <em>f</em>′(<em>x</em>) = 0 by algebra is impossible. Instead, computers search: start somewhere, and repeatedly step <em>downhill</em>, against the derivative.</p>
<p class="math">w ← w − η · f′(w)</p>
<p>Here η (eta) is the step size, called the <strong>learning rate</strong>. If <em>f</em>′ is positive, the function rises to the right, so we step left, and vice versa. With one variable this is "walk downhill"; with millions of variables, it's how neural networks are trained. The optional lesson on calculus in machine learning works through an example.</p>
`,
    terms: [
      ["Critical point", "A point in the domain where f′ is zero or undefined."],
      ["Local maximum / minimum", "A point higher (or lower) than all nearby points."],
      ["Absolute maximum / minimum", "The largest (or smallest) value on the whole domain or interval."],
      ["Concavity", "Whether a graph curves up (f″ > 0) or down (f″ < 0)."],
      ["Inflection point", "A point where concavity changes."],
      ["Mean Value Theorem", "Somewhere in (a, b), the instantaneous rate equals the average rate over [a, b]."],
      ["Learning rate", "The step size η in gradient descent."]
    ],
    quiz: [
      ...[{"q": "f(x) = x³ − 3x. Where are its critical points?", "choices": ["x = 0", "x = ±1", "x = ±3", "x = ±√3"], "answer": 1, "why": "f′(x) = 3x² − 3 = 0 gives x = ±1."}, {"q": "At x = 1 for f(x) = x³ − 3x, f″(1) = 6. What is x = 1?", "choices": ["Local max", "Local min", "Inflection point", "Not enough information"], "answer": 1, "why": "f″ > 0 means concave up, so a local minimum."}],
      { q: "f is continuous on [0, 4] with critical points at x = 1 and x = 3. Where can the absolute maximum be?", choices: ["Only at x = 1 or x = 3", "Only at x = 0 or x = 4", "At any of x = 0, 1, 3, 4", "Anywhere in [0, 4]"], answer: 2, why: "The closed interval method: compare the critical points and both endpoints." },
      { q: "A car travels 150 km in 2 hours. What does the Mean Value Theorem guarantee?", choices: ["It always went 75 km/h", "At some moment it went exactly 75 km/h", "It never exceeded 75 km/h", "Nothing"], answer: 1, why: "At some instant the speed equals the average speed, 150/2 = 75 km/h." },
      { q: "Where is f(x) = x³ − 6x² concave up?", choices: ["x < 2", "x > 2", "x > 0", "Everywhere"], answer: 1, why: "f″(x) = 6x − 12, which is positive when x > 2." }
    ],
    practice: [
      { q: `<p>For <em>f</em>(<em>x</em>) = <em>x</em>⁴ − 4<em>x</em>³, find the critical points, the intervals where <em>f</em> increases and decreases, the local extremes, and the inflection points.</p>`, a: `<p><em>f</em>′(<em>x</em>) = 4<em>x</em>³ − 12<em>x</em>² = 4<em>x</em>²(<em>x</em> − 3), so the critical points are 0 and 3. <em>f</em>′ is negative for <em>x</em> &lt; 3 (except 0, where it's zero) and positive for <em>x</em> &gt; 3. So <em>f</em> decreases on (−∞, 3) and increases on (3, ∞). <em>x</em> = 0 is <em>not</em> an extreme, since <em>f</em>′ doesn't change sign; <em>x</em> = 3 is a local (and absolute) minimum, <em>f</em>(3) = −27. <em>f</em>″(<em>x</em>) = 12<em>x</em>² − 24<em>x</em> = 12<em>x</em>(<em>x</em> − 2) changes sign at 0 and 2, so the inflection points are (0, 0) and (2, −16).</p>` },
      { q: `<p>Find the absolute maximum and minimum of <em>f</em>(<em>x</em>) = 2<em>x</em>³ − 3<em>x</em>² − 12<em>x</em> + 1 on [−2, 3].</p>`, a: `<p><em>f</em>′(<em>x</em>) = 6<em>x</em>² − 6<em>x</em> − 12 = 6(<em>x</em> − 2)(<em>x</em> + 1), so the critical points are −1 and 2. Values: <em>f</em>(−2) = −3, <em>f</em>(−1) = 8, <em>f</em>(2) = −19, <em>f</em>(3) = −8. Absolute max 8 at <em>x</em> = −1; absolute min −19 at <em>x</em> = 2.</p>` },
      { q: `<p>Verify the Mean Value Theorem for <em>f</em>(<em>x</em>) = <em>x</em>² on [1, 5]: find the <em>c</em> it promises.</p>`, a: `<p>The average rate is (25 − 1)/(5 − 1) = 6. <em>f</em>′(<em>c</em>) = 2<em>c</em> = 6 gives <em>c</em> = 3, which is indeed in (1, 5).</p>` },
      { q: `<p>Find two positive numbers whose sum is 20 and whose product is as large as possible.</p>`, a: `<p>Let the numbers be <em>x</em> and 20 − <em>x</em>, with 0 &lt; <em>x</em> &lt; 20. Product <em>P</em>(<em>x</em>) = 20<em>x</em> − <em>x</em>², <em>P</em>′(<em>x</em>) = 20 − 2<em>x</em> = 0 at <em>x</em> = 10, and <em>P</em>″ = −2 &lt; 0 confirms a max. The numbers are 10 and 10, with product 100.</p>` },
      { q: `<p>A cylindrical can must hold 500 cm³. What radius minimizes the amount of metal (its surface area, including top and bottom)? Use <em>V</em> = π<em>r</em>²<em>h</em> and <em>A</em> = 2π<em>r</em>² + 2π<em>rh</em>.</p>`, hint: `<p>Use the volume constraint to write <em>h</em> in terms of <em>r</em>, then substitute into <em>A</em>.</p>`, a: `<p>From 500 = π<em>r</em>²<em>h</em>, <em>h</em> = 500/(π<em>r</em>²). Then <em>A</em>(<em>r</em>) = 2π<em>r</em>² + 1000/<em>r</em>. <em>A</em>′(<em>r</em>) = 4π<em>r</em> − 1000/<em>r</em>² = 0 gives <em>r</em>³ = 250/π, so <em>r</em> ≈ 4.30 cm, and then <em>h</em> ≈ 8.60 cm. <em>A</em>″ = 4π + 2000/<em>r</em>³ &gt; 0, so it's a minimum. Notice <em>h</em> = 2<em>r</em>: the best can is as tall as it is wide.</p>` },
      { q: `<p>A rectangle has its base on the <em>x</em>-axis and its two upper corners on the parabola <em>y</em> = 12 − <em>x</em>². What is the largest possible area?</p>`, a: `<p>With corners at (±<em>x</em>, 12 − <em>x</em>²), the area is <em>A</em>(<em>x</em>) = 2<em>x</em>(12 − <em>x</em>²) = 24<em>x</em> − 2<em>x</em>³ for 0 ≤ <em>x</em> ≤ √12. <em>A</em>′ = 24 − 6<em>x</em>² = 0 at <em>x</em> = 2, and <em>A</em>(2) = 4 · 8 = 32. The endpoints give 0, so the maximum area is 32.</p>` },
      { q: `<p>Write a Python gradient descent loop to minimize <em>f</em>(<em>x</em>) = <em>x</em>² − 6<em>x</em> + 13 starting from <em>x</em> = 0 with learning rate 0.1. Where does it converge, and does that match calculus?</p>`, a: `<pre><code>x, lr = 0.0, 0.1
for step in range(100):
    grad = 2 * x - 6        # f′(x)
    x -= lr * grad
print(x)   # about 3.0</code></pre><p><em>f</em>′(<em>x</em>) = 2<em>x</em> − 6 = 0 at <em>x</em> = 3, where <em>f</em>(3) = 4 is the minimum. Each step multiplies the distance from 3 by 0.8, so the loop closes in quickly.</p>` }
    ],
    sources: ["openstaxcalc", "eoc"]
  },
  {
    id: "rates",
    title: "Related rates, approximation and L'Hôpital's rule",
    minutes: 90,
    summary: "More uses of the derivative: rates of change linked by an equation, approximating functions with tangent lines, evaluating difficult limits with L'Hôpital's rule, and solving equations with Newton's method.",
    notes: `
<p>This lesson collects four more applications of the derivative. Each one is built on the same picture: near any point, a differentiable function looks almost like its tangent line.</p>

<h3>Related rates</h3>
<p>When two quantities are linked by an equation and both change over time, their rates of change are linked too. Differentiate the equation with respect to time <em>t</em>, using the chain rule, and you get an equation linking the rates.</p>
<p>A reliable method:</p>
<ol>
  <li>Draw a picture and name every changing quantity as a function of time.</li>
  <li>Write the equation that relates them, true at every moment.</li>
  <li>Differentiate both sides with respect to <em>t</em>.</li>
  <li>Only now substitute the values at the moment you care about, and solve for the unknown rate.</li>
</ol>
<p>Substituting numbers before differentiating is the classic mistake: it turns changing quantities into constants, whose derivatives are zero.</p>
<p><strong>Example: the sliding ladder.</strong> A 10 ft ladder leans against a wall. Its bottom slides away from the wall at 1 ft/s. How fast is the top sliding down when the bottom is 6 ft from the wall?</p>
<p>Let <em>x</em> be the distance from the wall to the bottom and <em>y</em> the height of the top. At every moment, <em>x</em>² + <em>y</em>² = 100. Differentiate with respect to <em>t</em>: 2<em>x</em> · <em>dx</em>/<em>dt</em> + 2<em>y</em> · <em>dy</em>/<em>dt</em> = 0. At the moment in question, <em>x</em> = 6, so <em>y</em> = 8, and <em>dx</em>/<em>dt</em> = 1. Then 12 + 16 · <em>dy</em>/<em>dt</em> = 0, so <em>dy</em>/<em>dt</em> = −0.75 ft/s. The top slides down at 0.75 ft/s, and it speeds up as the ladder falls further.</p>
<p><strong>Example: the balloon.</strong> Air is pumped into a spherical balloon at 100 cm³/s. How fast is the radius growing when <em>r</em> = 5 cm? <em>V</em> = (4/3)π<em>r</em>³, so <em>dV</em>/<em>dt</em> = 4π<em>r</em>² · <em>dr</em>/<em>dt</em>. Substituting, 100 = 4π · 25 · <em>dr</em>/<em>dt</em>, so <em>dr</em>/<em>dt</em> = 1/π ≈ 0.32 cm/s. As the balloon grows, the same airflow makes the radius grow more slowly.</p>
<p><strong>When a formula has one variable too many.</strong> A cone's volume ⅓π<em>r</em>²<em>h</em> involves both <em>r</em> and <em>h</em>, but in a cone-shaped cup the water's radius and depth are tied together. The water forms a smaller cone with the same shape as the whole cup, so by <em>similar triangles</em> (matching triangles of the same shape have sides in the same ratio) <em>r</em>/<em>h</em> is the same as the cup's top radius over its height. For a cup 12 cm tall with top radius 4 cm, <em>r</em>/<em>h</em> = 4/12, so <em>r</em> = <em>h</em>/3 at every moment, and <em>V</em> = ⅓π(<em>h</em>/3)²<em>h</em> = π<em>h</em>³/27 depends on <em>h</em> alone. Make this substitution in step 2, before differentiating.</p>

<h3>Linear approximation</h3>
<p>Near <em>x</em> = <em>a</em>, a differentiable function is close to its tangent line:</p>
<p class="math">f(x) ≈ f(a) + f′(a)(x − a)</p>
<p><em>Example:</em> estimate √4.1. With <em>f</em>(<em>x</em>) = √<em>x</em> and <em>a</em> = 4, <em>f</em>(4) = 2 and <em>f</em>′(4) = 1/4, so √4.1 ≈ 2 + 0.1/4 = 2.025. The true value is 2.02485…, off by only 0.00015. The approximation is excellent close to <em>a</em> and gets worse further away, and the second derivative tells you which way it errs: for a concave-down function like √<em>x</em>, the tangent line lies above the curve, so the estimate is slightly too big.</p>
<p>Two approximations near 0 are used constantly in physics and engineering: sin <em>x</em> ≈ <em>x</em> (the tangent to sine at 0 is <em>y</em> = <em>x</em>), and (1 + <em>x</em>)<sup>n</sup> ≈ 1 + <em>nx</em>. For example, 1.01¹⁰ ≈ 1.1; the true value is 1.1046.</p>
<p>In the same spirit, a small change Δ<em>x</em> in the input causes a change in output of about <em>f</em>′(<em>x</em>) · Δ<em>x</em>. If a sphere's radius is measured as 10 cm with a possible error of 0.1 cm, the volume's error is about <em>V</em>′(10) · 0.1 = 4π · 100 · 0.1 ≈ 126 cm³. This is how engineers estimate how measurement errors spread through a calculation.</p>

<h3>L'Hôpital's rule</h3>
<p>Some limits give the indeterminate forms 0/0 or ∞/∞, and algebra can't easily simplify them. <strong>L'Hôpital's rule</strong> says that in these cases (and only these), you can replace the functions by their derivatives:</p>
<p class="math">If lim f(x)/g(x) is 0/0 or ∞/∞, then lim f(x)/g(x) = lim f′(x)/g′(x), if the latter exists.</p>
<p>Here "∞/∞" includes any mix of signs: −∞/∞, ∞/−∞ and −∞/−∞ all count, since the rule only needs top and bottom each to grow without bound in size.</p>
<p>The idea: near a point where both are zero, <em>f</em> and <em>g</em> are both close to their tangent lines, so their ratio is close to the ratio of their slopes. Note that you differentiate the top and bottom <em>separately</em>, not with the quotient rule.</p>
<table>
  <thead><tr><th>Limit</th><th>Form</th><th>After L'Hôpital</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>lim<sub>x→0</sub> sin <em>x</em> / <em>x</em></td><td>0/0</td><td>lim cos <em>x</em> / 1</td><td>1</td></tr>
    <tr><td>lim<sub>x→0</sub> (<em>e</em><sup>x</sup> − 1)/<em>x</em></td><td>0/0</td><td>lim <em>e</em><sup>x</sup>/1</td><td>1</td></tr>
    <tr><td>lim<sub>x→∞</sub> <em>x</em>/<em>e</em><sup>x</sup></td><td>∞/∞</td><td>lim 1/<em>e</em><sup>x</sup></td><td>0</td></tr>
    <tr><td>lim<sub>x→∞</sub> ln <em>x</em> / <em>x</em></td><td>∞/∞</td><td>lim (1/<em>x</em>)/1</td><td>0</td></tr>
    <tr><td>lim<sub>x→0</sub> (1 − cos <em>x</em>)/<em>x</em>²</td><td>0/0</td><td>lim sin <em>x</em>/(2<em>x</em>), then lim cos <em>x</em>/2</td><td>1/2</td></tr>
  </tbody>
</table>
<p>The last example applies the rule twice, since the first application still gives 0/0. The middle rows matter in computer science: they say <strong>exponentials grow faster than any power, and powers grow faster than logarithms</strong>. Applying the rule <em>n</em> times shows <em>x</em><sup>n</sup>/<em>e</em><sup>x</sup> → 0 for every <em>n</em>. That's the calculus behind the ordering O(log <em>n</em>) &lt; O(<em>n</em>) &lt; O(<em>n</em>²) &lt; O(2<sup>n</sup>) that <a href="#c-cs101-algo">CS 101, Searching, sorting and efficiency</a> uses to rank algorithms; there, O(<em>g</em>(<em>n</em>)) means, roughly, "grows no faster than <em>g</em>(<em>n</em>)".</p>
<p><strong>Use it only on 0/0 or ∞/∞.</strong> lim<sub><em>x</em>→0</sub> (<em>x</em> + 1)/(<em>x</em> + 2) is simply 1/2 by substitution; applying L'Hôpital would wrongly give 1. Other indeterminate forms, such as 0 · ∞, can be rewritten as a quotient first: as <em>x</em> → 0⁺, <em>x</em> ln <em>x</em> = (ln <em>x</em>)/(1/<em>x</em>) is −∞/∞ (ln <em>x</em> → −∞), and the rule gives (1/<em>x</em>)/(−1/<em>x</em>²) = −<em>x</em> → 0.</p>

<h3>Newton's method</h3>
<p>To solve <em>f</em>(<em>x</em>) = 0, start with a guess <em>x</em>₀. Replace the curve by its tangent line at that guess, and find where the <em>line</em> crosses zero; that's the next guess. Solving 0 = <em>f</em>(<em>x</em><sub>n</sub>) + <em>f</em>′(<em>x</em><sub>n</sub>)(<em>x</em> − <em>x</em><sub>n</sub>) gives</p>
<p class="math">x<sub>n+1</sub> = x<sub>n</sub> − f(x<sub>n</sub>) / f′(x<sub>n</sub>)</p>
<figure class="fig">
<svg viewBox="0 0 280 235" role="img" aria-label="Newton's method on the curve y = x squared minus 2: the tangent at x0 = 3 crosses the axis at x1, and the tangent at x1 crosses at x2, closer to the root at the square root of 2">
  <line x1="30" y1="170" x2="260" y2="170" class="ax"/><line x1="40" y1="225" x2="40" y2="10" class="ax"/>
  <path d="M40,210 Q130,210 220,30" class="cv"/>
  <line x1="220" y1="30" x2="150" y2="170" class="hl"/>
  <line x1="150" y1="170" x2="150" y2="142.8" class="ax dash"/>
  <line x1="150" y1="142.8" x2="127.7" y2="170" class="hl"/>
  <circle cx="220" cy="30" r="3.5" class="dot"/><circle cx="150" cy="142.8" r="3.5" class="dot"/>
  <line x1="220" y1="30" x2="220" y2="170" class="ax dash"/>
  <text x="214" y="186" class="m">x₀</text><text x="146" y="186" class="m">x₁</text><text x="118" y="186" class="m">x₂</text>
  <text x="106" y="205" class="m">√2 is just left of x₂</text>
</svg>
<figcaption>Newton's method for <em>x</em>² − 2 = 0 starting at <em>x</em>₀ = 3: each tangent line's zero is the next, better guess.</figcaption>
</figure>
<p>For <em>f</em>(<em>x</em>) = <em>x</em>² − 2, the update is <em>x</em> − (<em>x</em>² − 2)/(2<em>x</em>), which computes √2:</p>
<div class="multi">
<pre data-lang="python"><code>def newton_sqrt(a, x=1.0):
    for _ in range(6):
        x = x - (x * x - a) / (2 * x)
    return x

newton_sqrt(2)   # 1.4142135623730951</code></pre>
<pre data-lang="java"><code>static double newtonSqrt(double a) {
    double x = 1.0;
    for (int i = 0; i &lt; 6; i++) x = x - (x * x - a) / (2 * x);
    return x;
}</code></pre>
<pre data-lang="cpp"><code>double newton_sqrt(double a) {
    double x = 1.0;
    for (int i = 0; i &lt; 6; i++) x = x - (x * x - a) / (2 * x);
    return x;
}</code></pre>
</div>
<p>Starting from 1, the guesses are 1.5, 1.41667, 1.4142157, 1.41421356237469, … Near a root, the number of correct digits roughly <em>doubles</em> each step, compared with one extra binary digit per step for bisection (each halving pins down one more bit of the answer, about 0.3 of a decimal digit, which is why 10 decimal places took 34 passes in <a href="#c-math130-u2">Lesson 4</a>). This speed is why Newton's method (and its relatives) runs inside calculators, graphics engines and scientific software.</p>
<p>But Newton's method can fail where bisection can't: if <em>f</em>′(<em>x</em><sub>n</sub>) = 0 the update divides by zero, and from a bad starting guess the iterates can jump far away or bounce back and forth forever. Practical software often combines the two: bisection for safety, Newton for speed.</p>
`,
    terms: [
      ["Related rates", "Rates of change linked because the quantities are linked by an equation."],
      ["Linear approximation", "f(x) ≈ f(a) + f′(a)(x − a): using the tangent line to estimate nearby values."],
      ["L'Hôpital's rule", "For 0/0 or ∞/∞ forms, lim f/g = lim f′/g′."],
      ["Indeterminate form", "0/0, ∞/∞, 0·∞ and similar: forms that need more work to evaluate."],
      ["Newton's method", "Root finding by repeatedly jumping to where the tangent line crosses zero."]
    ],
    quiz: [
      ...[{"q": "Using linear approximation at a = 1, estimate ln(1.05).", "choices": ["0.05", "1.05", "0.5", "0"], "answer": 0, "why": "ln 1 = 0 and (ln x)′ = 1 at x = 1, so ln(1.05) ≈ 0 + 1·0.05."}],
      { q: "What is lim<sub>x→0</sub> (e^(2x) − 1)/x?", choices: ["0", "1", "2", "It does not exist"], answer: 2, why: "0/0, so apply L'Hôpital: lim 2e^(2x)/1 = 2." },
      { q: "A circle's radius grows at 3 cm/s. How fast is its area growing when r = 10 cm?", choices: ["30 cm²/s", "60π cm²/s", "100π cm²/s", "6π cm²/s"], answer: 1, why: "A = πr², so dA/dt = 2πr · dr/dt = 2π · 10 · 3 = 60π." },
      { q: "Which grows fastest as x → ∞?", choices: ["x¹⁰⁰", "eˣ", "(ln x)¹⁰⁰", "They grow equally"], answer: 1, why: "Repeated L'Hôpital shows x¹⁰⁰/eˣ → 0: exponentials beat any power." },
      { q: "Why can't you use L'Hôpital's rule on lim<sub>x→1</sub> (x + 1)/(x + 3)?", choices: ["The limit doesn't exist", "It isn't an indeterminate form; substitution gives 1/2", "The functions aren't differentiable", "You can"], answer: 1, why: "L'Hôpital applies only to 0/0 or ∞/∞. Here substitution works directly." }
    ],
    practice: [
      { q: `<p>A 13 ft ladder slides down a wall. The top slides down at 2 ft/s. How fast is the bottom moving away from the wall when the top is 5 ft above the ground?</p>`, a: `<p><em>x</em>² + <em>y</em>² = 169, so 2<em>x</em> · <em>dx</em>/<em>dt</em> + 2<em>y</em> · <em>dy</em>/<em>dt</em> = 0. When <em>y</em> = 5, <em>x</em> = 12, and <em>dy</em>/<em>dt</em> = −2. Then 24 · <em>dx</em>/<em>dt</em> − 20 = 0, so <em>dx</em>/<em>dt</em> = 5/6 ≈ 0.83 ft/s.</p>` },
      { q: `<p>A conical tank (point down) has height 10 m and top radius 5 m. Water flows in at 2 m³/min. How fast is the water level rising when the water is 4 m deep? (Cone volume: <em>V</em> = ⅓π<em>r</em>²<em>h</em>.)</p>`, hint: `<p>By similar triangles, the water's radius is always half its depth: <em>r</em> = <em>h</em>/2. Substitute before differentiating so <em>V</em> depends on <em>h</em> only.</p>`, a: `<p>With <em>r</em> = <em>h</em>/2, <em>V</em> = ⅓π(<em>h</em>/2)²<em>h</em> = π<em>h</em>³/12. Then <em>dV</em>/<em>dt</em> = (π<em>h</em>²/4) · <em>dh</em>/<em>dt</em>. At <em>h</em> = 4: 2 = 4π · <em>dh</em>/<em>dt</em>, so <em>dh</em>/<em>dt</em> = 1/(2π) ≈ 0.16 m/min. (Substituting <em>r</em> = <em>h</em>/2 first is fine because that relationship holds at every moment, not just at <em>h</em> = 4.)</p>` },
      { q: `<p>Use linear approximation to estimate (a) ∛27.5, (b) ln(1.1), (c) cos(0.05). Check each with a calculator.</p>`, a: `<p>(a) <em>f</em>(<em>x</em>) = <em>x</em><sup>1/3</sup>, <em>a</em> = 27: 3 + (1/27)(0.5) ≈ 3.0185; true 3.01846. (b) ln(1 + <em>x</em>) ≈ <em>x</em>, so 0.1; true 0.0953. (c) The tangent to cos at 0 is flat, so cos(0.05) ≈ 1; true 0.99875. The approximation is good, but it can't see the curvature, which the second derivative describes.</p>` },
      { q: `<p>Evaluate with L'Hôpital's rule, checking the form first: (a) lim<sub><em>x</em>→0</sub> tan <em>x</em> / <em>x</em>. (b) lim<sub><em>x</em>→∞</sub> <em>x</em>²/<em>e</em><sup>x</sup>. (c) lim<sub><em>x</em>→1</sub> ln <em>x</em> /(<em>x</em> − 1). (d) lim<sub><em>x</em>→0</sub> (<em>x</em> − sin <em>x</em>)/<em>x</em>³.</p>`, a: `<p>(a) 0/0: sec² <em>x</em> / 1 → 1. (b) ∞/∞: 2<em>x</em>/<em>e</em><sup>x</sup>, still ∞/∞, then 2/<em>e</em><sup>x</sup> → 0. (c) 0/0: (1/<em>x</em>)/1 → 1. (d) 0/0 three times: (1 − cos <em>x</em>)/(3<em>x</em>²) → sin <em>x</em>/(6<em>x</em>) → cos <em>x</em>/6 → 1/6.</p>` },
      { q: `<p>Find lim<sub><em>x</em>→0⁺</sub> <em>x</em> ln <em>x</em> and lim<sub><em>n</em>→∞</sub> log₂ <em>n</em> / <em>n</em>. What does the second say about binary search versus linear search?</p>`, a: `<p>The first is 0 (worked in the notes). For the second, log₂ <em>n</em> = ln <em>n</em>/ln 2, so the limit is (1/ln 2) · lim ln <em>n</em>/<em>n</em> = 0. The ratio of binary search's steps to linear search's steps goes to 0: for large lists binary search is not just faster, it's faster by a factor that keeps growing without bound.</p>` },
      { q: `<p>Apply two steps of Newton's method to <em>f</em>(<em>x</em>) = <em>x</em>³ − 2<em>x</em> − 5 starting from <em>x</em>₀ = 2. (This is the equation Newton himself used as an example.)</p>`, a: `<p><em>f</em>′(<em>x</em>) = 3<em>x</em>² − 2. Step 1: <em>f</em>(2) = −1, <em>f</em>′(2) = 10, so <em>x</em>₁ = 2 + 0.1 = 2.1. Step 2: <em>f</em>(2.1) = 9.261 − 4.2 − 5 = 0.061, <em>f</em>′(2.1) = 11.23, so <em>x</em>₂ = 2.1 − 0.00543 ≈ 2.09457. The true root is 2.0945515…, so two steps already give four correct decimal places.</p>` },
      { q: `<p>Write a general <code>newton(f, df, x0)</code> function that stops when successive guesses differ by less than 10<sup>−12</sup>, or after 50 steps. Use it to solve cos <em>x</em> = <em>x</em>, and compare the number of steps with bisection (about 34 in the continuity lesson).</p>`, a: `<pre><code>import math

def newton(f, df, x0, tol=1e-12, max_steps=50):
    x = x0
    for step in range(1, max_steps + 1):
        x_new = x - f(x) / df(x)
        if abs(x_new - x) &lt; tol:
            return x_new, step
        x = x_new
    raise RuntimeError("Newton's method did not converge")

root, steps = newton(lambda x: math.cos(x) - x,
                     lambda x: -math.sin(x) - 1, 1.0)
print(root, steps)   # 0.7390851332151607, about 5 steps</code></pre><p>About 5 steps instead of 34, because the number of correct digits doubles each step.</p>` }
    ],
    sources: ["openstaxcalc", "eoc"]
  },
  {
    id: "u6",
    title: "Riemann sums and antiderivatives",
    minutes: 90,
    summary: "Sigma notation, area as a limit of sums (Riemann sums and the definite integral), properties of the integral, and antiderivatives.",
    notes: `
<p>The derivative answers "how fast is it changing?" The <strong>integral</strong> answers the reverse question: "if I know how fast it's changing, how much has accumulated?" If you know a car's speed at every moment, how far did it go? If you know the rate water flows into a tank, how much is in it? Geometrically, the integral is the <strong>area under a curve</strong>. The surprise at the heart of calculus is that these two ideas, rates and areas, are inverses of each other. This lesson defines the integral as a limit of sums and introduces antiderivatives; <a href="#c-math130-ftc">the next lesson</a> proves the connection between them, the Fundamental Theorem of Calculus.</p>

<h3>Sigma notation</h3>
<p>Integrals start as sums of many terms, so we need a compact way to write sums. The Greek capital sigma means "add up":</p>
<p class="math">Σ<sub>i=1</sub><sup>n</sup> a<sub>i</sub> = a<sub>1</sub> + a<sub>2</sub> + ⋯ + a<sub>n</sub></p>
<p>The variable <em>i</em> starts at the bottom value, goes up by 1 each time to the top value, and you add the expression for each <em>i</em>. Examples: Σ<sub>i=1</sub><sup>4</sup> <em>i</em>² = 1 + 4 + 9 + 16 = 30, and Σ<sub>i=1</sub><sup>5</sup> 2 = 10. In Python, Σ is a loop with an accumulator, or <code>sum(i**2 for i in range(1, 5))</code>.</p>
<p>Three formulas, each provable by induction as in Discrete Math, are useful: Σ<sub>i=1</sub><sup>n</sup> <em>i</em> = <em>n</em>(<em>n</em> + 1)/2, Σ<sub>i=1</sub><sup>n</sup> <em>i</em>² = <em>n</em>(<em>n</em> + 1)(2<em>n</em> + 1)/6, and Σ<sub>i=1</sub><sup>n</sup> <em>c</em> = <em>cn</em>.</p>

<h3>Area as a limit of sums</h3>
<p>To find the area under <em>y</em> = <em>f</em>(<em>x</em>) from <em>a</em> to <em>b</em>, split [<em>a</em>, <em>b</em>] into <em>n</em> strips of width Δ<em>x</em> = (<em>b</em> − <em>a</em>)/<em>n</em>, approximate each strip by a rectangle, and add up the rectangles' areas:</p>
<p class="math">Σ<sub>i=1</sub><sup>n</sup> f(x<sub>i</sub>*) Δx</p>
<p>where <em>x</em><sub>i</sub>* is a sample point in the <em>i</em>-th strip: its left end, right end, or middle. This is a <strong>Riemann sum</strong>, named after Bernhard Riemann, who defined the integral this way in 1854.</p>
<figure class="fig">
<svg viewBox="0 0 320 225" role="img" aria-label="The curve y = x squared from 0 to 1 with five rectangles underneath whose heights are the curve's values at the midpoints of the strips">
  <rect x="40" y="198.3" width="50" height="1.7" class="soft"/>
  <rect x="90" y="184.7" width="50" height="15.3" class="soft"/>
  <rect x="140" y="157.5" width="50" height="42.5" class="soft"/>
  <rect x="190" y="116.7" width="50" height="83.3" class="soft"/>
  <rect x="240" y="62.3" width="50" height="137.7" class="soft"/>
  <line x1="30" y1="200" x2="305" y2="200" class="ax"/><line x1="40" y1="212" x2="40" y2="15" class="ax"/>
  <path d="M40,200 Q165,200 290,30" class="cv"/>
  <text x="36" y="216" class="m">0</text><text x="286" y="216" class="m">1</text>
  <text x="150" y="60">y = x²</text>
</svg>
<figcaption>A midpoint Riemann sum for ∫₀¹ <em>x</em>² <em>dx</em> with five rectangles. Each rectangle's height is the curve's value at the middle of its strip; the total area is 0.33, close to the exact value 1/3.</figcaption>
</figure>
<p>As <em>n</em> → ∞ and the strips get thinner, the sum approaches the exact area. That limit is the <strong>definite integral</strong>:</p>
<p class="math">∫<sub>a</sub><sup>b</sup> f(x) dx = lim<sub>n→∞</sub> Σ<sub>i=1</sub><sup>n</sup> f(x<sub>i</sub>*) Δx</p>
<p><strong>Worked example: an exact area from the limit.</strong> Find ∫<sub>0</sub><sup>1</sup> <em>x</em>² <em>dx</em> using right endpoints. With <em>n</em> strips, Δ<em>x</em> = 1/<em>n</em>, and the right end of strip <em>i</em> is <em>x</em><sub>i</sub> = <em>i</em>/<em>n</em>. So the sum is</p>
<p class="math">Σ<sub>i=1</sub><sup>n</sup> (i/n)² · (1/n) = (1/n³) Σ<sub>i=1</sub><sup>n</sup> i² = (1/n³) · n(n + 1)(2n + 1)/6 = (n + 1)(2n + 1)/(6n²)</p>
<p>The constant 1/<em>n</em>³ comes out of the sum because it is the same in every term; then the Σ<em>i</em>² formula above does the rest. For <em>n</em> = 5 this is 0.44, and for <em>n</em> = 1000 it is 0.3338335. As <em>n</em> → ∞, the top and bottom both have degree 2, so the limit is the ratio of leading coefficients, 2/6 = 1/3. The exact area is 1/3. This works, but it needs a sum formula for each power; <a href="#c-math130-ftc">the next lesson</a> gives a much faster way.</p>
<p>The notation tells the story: ∫ is a stretched S for "sum", and <em>f</em>(<em>x</em>) <em>dx</em> is a rectangle of height <em>f</em>(<em>x</em>) and tiny width <em>dx</em>. A computer can approximate it directly:</p>
<div class="multi">
<pre data-lang="python"><code>def riemann(f, a, b, n):
    dx = (b - a) / n
    return sum(f(a + (i + 0.5) * dx) for i in range(n)) * dx   # midpoint rule

riemann(lambda x: x**2, 0, 1, 5)      # 0.33
riemann(lambda x: x**2, 0, 1, 1000)   # 0.33333325</code></pre>
<pre data-lang="java"><code>static double riemann(DoubleUnaryOperator f, double a, double b, int n) {
    double dx = (b - a) / n, total = 0;
    for (int i = 0; i &lt; n; i++) total += f.applyAsDouble(a + (i + 0.5) * dx);
    return total * dx;
}</code></pre>
<pre data-lang="cpp"><code>double riemann(std::function&lt;double(double)&gt; f, double a, double b, int n) {
    double dx = (b - a) / n, total = 0;
    for (int i = 0; i &lt; n; i++) total += f(a + (i + 0.5) * dx);
    return total * dx;
}</code></pre>
</div>
<p>Where <em>f</em> is negative, the rectangles have negative height, so the integral counts area below the axis as negative. The definite integral is <strong>signed area</strong>: ∫<sub>0</sub><sup>2π</sup> sin <em>x</em> <em>dx</em> = 0, because the positive hump and the negative hump cancel.</p>

<h3>Properties of the integral</h3>
<ul>
  <li><strong>Linearity:</strong> ∫(<em>f</em> + <em>g</em>) = ∫<em>f</em> + ∫<em>g</em>, and ∫<em>c</em><em>f</em> = <em>c</em>∫<em>f</em>.</li>
  <li><strong>Additivity:</strong> ∫<sub>a</sub><sup>b</sup> <em>f</em> + ∫<sub>b</sub><sup>c</sup> <em>f</em> = ∫<sub>a</sub><sup>c</sup> <em>f</em>.</li>
  <li><strong>Reversing the limits</strong> changes the sign: ∫<sub>b</sub><sup>a</sup> <em>f</em> = −∫<sub>a</sub><sup>b</sup> <em>f</em>, and ∫<sub>a</sub><sup>a</sup> <em>f</em> = 0.</li>
</ul>

<h3>Antiderivatives</h3>
<p>An <strong>antiderivative</strong> of <em>f</em> is a function <em>F</em> with <em>F</em>′ = <em>f</em>: differentiation run in reverse. Since constants have derivative 0, antiderivatives come in families: <em>x</em>³/3 + 5 and <em>x</em>³/3 − 2 both have derivative <em>x</em>². We write the whole family as an <strong>indefinite integral</strong>, ∫ <em>x</em>² <em>dx</em> = <em>x</em>³/3 + <em>C</em>. Reading the derivative table backward:</p>
<table>
  <thead><tr><th><em>f</em>(<em>x</em>)</th><th>∫ <em>f</em>(<em>x</em>) <em>dx</em></th></tr></thead>
  <tbody>
    <tr><td><em>x</em><sup>n</sup>, <em>n</em> ≠ −1</td><td><em>x</em><sup>n+1</sup>/(<em>n</em> + 1) + <em>C</em></td></tr>
    <tr><td>1/<em>x</em></td><td>ln |<em>x</em>| + <em>C</em></td></tr>
    <tr><td><em>e</em><sup>x</sup></td><td><em>e</em><sup>x</sup> + <em>C</em></td></tr>
    <tr><td>cos <em>x</em></td><td>sin <em>x</em> + <em>C</em></td></tr>
    <tr><td>sin <em>x</em></td><td>−cos <em>x</em> + <em>C</em></td></tr>
    <tr><td>1/(1 + <em>x</em>²)</td><td>arctan <em>x</em> + <em>C</em></td></tr>
  </tbody>
</table>
<p>You can always check an antiderivative by differentiating it.</p>
<p><strong>Why ln |<em>x</em>| and not ln <em>x</em>?</strong> The function 1/<em>x</em> is defined for negative <em>x</em> too, but ln <em>x</em> isn't, so ln <em>x</em> can only be its antiderivative for <em>x</em> &gt; 0. For <em>x</em> &lt; 0, try ln(−<em>x</em>), which is defined there: by the chain rule its derivative is (1/(−<em>x</em>)) · (−1) = 1/<em>x</em>. So ln(−<em>x</em>) works on the negative side, and ln |<em>x</em>| combines both: it is ln <em>x</em> for <em>x</em> &gt; 0 and ln(−<em>x</em>) for <em>x</em> &lt; 0, and its derivative is 1/<em>x</em> on each side. So ∫ (1/<em>x</em>) <em>dx</em> = ln |<em>x</em>| + <em>C</em> on any interval that doesn't contain 0, where 1/<em>x</em> blows up. <a href="#c-math130-ftc">The next lesson</a> uses this to find a definite integral over negative numbers.</p>
`,
    terms: [
      ["Sigma notation", "Σ for a sum: Σᵢ₌₁ⁿ aᵢ = a₁ + a₂ + ⋯ + aₙ."],
      ["Riemann sum", "An approximation of area by rectangles: Σ f(xᵢ*)Δx."],
      ["Definite integral", "The limit of Riemann sums: signed area under a curve from a to b."],
      ["Antiderivative", "A function whose derivative is f."],
      ["Indefinite integral", "The family of all antiderivatives, ∫ f(x) dx = F(x) + C."]
    ],
    quiz: [
      {"q": "Why does the antiderivative include + C?", "choices": ["It is a convention with no reason", "Constants have derivative 0, so many functions share a derivative", "To make integrals positive", "C stands for curve"], "answer": 1, "why": "x² and x² + 7 have the same derivative, so the antiderivative is a family."},
      { q: "What is Σ<sub>i=1</sub><sup>4</sup> (2i + 1)?", choices: ["20", "24", "25", "16"], answer: 1, why: "3 + 5 + 7 + 9 = 24." },
      { q: "A midpoint sum with 2 strips for ∫<sub>0</sub><sup>2</sup> <em>x</em>² <em>dx</em> gives:", choices: ["2", "2.5", "8/3", "5"], answer: 1, why: "The strips are [0, 1] and [1, 2], width 1, with midpoints 0.5 and 1.5: 0.25 + 2.25 = 2.5. (The exact value is 8/3.)" }
    ],
    practice: [
      { q: `<p>Compute: (a) Σ<sub>i=1</sub><sup>5</sup> <em>i</em>². (b) Σ<sub>k=0</sub><sup>3</sup> 2<sup>k</sup>. (c) Σ<sub>i=1</sub><sup>100</sup> <em>i</em>, using a formula. Then write (c) as one line of Python.</p>`, a: `<p>(a) 1 + 4 + 9 + 16 + 25 = 55. (b) 1 + 2 + 4 + 8 = 15. (c) 100 · 101/2 = 5050, or <code>sum(range(1, 101))</code>.</p>` },
      { q: `<p>Estimate ∫<sub>0</sub><sup>2</sup> <em>x</em>² <em>dx</em> by hand with a left Riemann sum using 4 strips. Then find the exact value as a limit of right-endpoint sums, as in the worked example. Is the left sum too big or too small, and why?</p>`, hint: `<p>For the exact value, Δ<em>x</em> = 2/<em>n</em> and the right end of strip <em>i</em> is 2<em>i</em>/<em>n</em>. Pull the constants out of the sum, then use the formula for Σ<em>i</em>².</p>`, a: `<p>Left sum: Δ<em>x</em> = 0.5, left endpoints 0, 0.5, 1, 1.5: (0 + 0.25 + 1 + 2.25) × 0.5 = 1.75. Exact: the right sum is Σ<sub>i=1</sub><sup>n</sup> (2<em>i</em>/<em>n</em>)² · (2/<em>n</em>) = (8/<em>n</em>³) Σ <em>i</em>² = 8(<em>n</em> + 1)(2<em>n</em> + 1)/(6<em>n</em>²), which tends to 16/6 = 8/3 ≈ 2.667. (For <em>n</em> = 4 it is 3.75; for <em>n</em> = 1000, 2.670668.) The left sum is too small because <em>x</em>² is increasing on [0, 2], so each rectangle uses the lowest height in its strip.</p>` },
      { q: `<p>Find the antiderivatives: (a) ∫ (6<em>x</em>² − 4<em>x</em> + 1) <em>dx</em>. (b) ∫ (1/<em>x</em>² + √<em>x</em>) <em>dx</em>. (c) ∫ (3<em>e</em><sup>x</sup> − 2 cos <em>x</em>) <em>dx</em>. Check (b) by differentiating.</p>`, a: `<p>(a) 2<em>x</em>³ − 2<em>x</em>² + <em>x</em> + <em>C</em>. (b) ∫ (<em>x</em><sup>−2</sup> + <em>x</em><sup>1/2</sup>) <em>dx</em> = −<em>x</em><sup>−1</sup> + (2/3)<em>x</em><sup>3/2</sup> + <em>C</em>; differentiating gives <em>x</em><sup>−2</sup> + <em>x</em><sup>1/2</sup>, as required. (c) 3<em>e</em><sup>x</sup> − 2 sin <em>x</em> + <em>C</em>.</p>` }
    ],
    sources: ["openstaxcalc", "eoc", "mactutorcalc"]
  },
  {
    id: "ftc",
    title: "The Fundamental Theorem and substitution",
    minutes: 90,
    summary: "The Fundamental Theorem of Calculus, which connects rates and areas; area between curves and average value; and substitution, the chain rule in reverse.",
    notes: `
<p><a href="#c-math130-u6">The previous lesson</a> defined the integral as a limit of sums, which is exact but slow to compute, and introduced antiderivatives. This lesson connects the two. The Fundamental Theorem of Calculus says that to find an area you only need an antiderivative, and it turns integration into one of the most useful tools in science and computing.</p>

<h3>The Fundamental Theorem of Calculus</h3>
<p>The theorem has two parts, which together say that differentiation and integration undo each other.</p>
<p><strong>A note on the letter <em>t</em>.</strong> In ∫<sub>a</sub><sup>b</sup> <em>f</em>(<em>x</em>) <em>dx</em>, the letter <em>x</em> is a <strong>dummy variable</strong>: it only labels the points we add up along the way, and the answer doesn't depend on it, so ∫<sub>0</sub><sup>1</sup> <em>x</em>² <em>dx</em> = ∫<sub>0</sub><sup>1</sup> <em>t</em>² <em>dt</em> = 1/3. (It's like the loop variable in <code>sum(i * i for i in range(4))</code>: renaming <code>i</code> to <code>k</code> changes nothing.) When the upper limit is itself the variable <em>x</em>, we must use a different letter inside, or ∫<sub>a</sub><sup>x</sup> <em>f</em>(<em>x</em>) <em>dx</em> would use <em>x</em> for two different things at once: the fixed right edge and the moving point. So we write ∫<sub>a</sub><sup>x</sup> <em>f</em>(<em>t</em>) <em>dt</em>: <em>t</em> runs from <em>a</em> to <em>x</em>, and the result is a function of <em>x</em>.</p>
<p><strong>Part 1.</strong> If <em>f</em> is continuous and <em>A</em>(<em>x</em>) = ∫<sub>a</sub><sup>x</sup> <em>f</em>(<em>t</em>) <em>dt</em> is the area accumulated from <em>a</em> up to <em>x</em>, then <em>A</em>′(<em>x</em>) = <em>f</em>(<em>x</em>). The rate at which area accumulates is the height of the curve at the edge. Picture moving the right edge a tiny distance <em>h</em>: the area grows by a thin strip of height about <em>f</em>(<em>x</em>) and width <em>h</em>, so (<em>A</em>(<em>x</em> + <em>h</em>) − <em>A</em>(<em>x</em>))/<em>h</em> ≈ <em>f</em>(<em>x</em>).</p>
<p><strong>When the upper limit is a function of <em>x</em>.</strong> Part 1 needs the upper limit to be exactly <em>x</em>. If it's something else, such as <em>x</em>³, combine Part 1 with the chain rule. <em>Example:</em> find <em>H</em>′(<em>x</em>) for <em>H</em>(<em>x</em>) = ∫<sub>0</sub><sup><em>x</em>³</sup> cos <em>t</em> <em>dt</em>.</p>
<ol>
  <li>Name the inside: let <em>A</em>(<em>u</em>) = ∫<sub>0</sub><sup><em>u</em></sup> cos <em>t</em> <em>dt</em>. Then <em>H</em>(<em>x</em>) = <em>A</em>(<em>x</em>³), a composition with inner function <em>u</em> = <em>x</em>³.</li>
  <li>Outer derivative, by Part 1: <em>A</em>′(<em>u</em>) = cos <em>u</em>.</li>
  <li>Chain rule: <em>H</em>′(<em>x</em>) = <em>A</em>′(<em>x</em>³) · (<em>x</em>³)′ = cos(<em>x</em>³) · 3<em>x</em>².</li>
</ol>
<p><em>Check:</em> here we can also compute the integral directly: <em>H</em>(<em>x</em>) = sin(<em>x</em>³) − sin 0 = sin(<em>x</em>³), whose derivative is 3<em>x</em>² cos(<em>x</em>³), the same. In general: d/d<em>x</em> ∫<sub>a</sub><sup><em>g</em>(<em>x</em>)</sup> <em>f</em>(<em>t</em>) <em>dt</em> = <em>f</em>(<em>g</em>(<em>x</em>)) · <em>g</em>′(<em>x</em>).</p>
<p><strong>Part 2.</strong> If <em>F</em> is any antiderivative of <em>f</em>, then</p>
<p class="math">∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a)</p>
<p>This is the computational miracle: instead of taking a limit of sums, find an antiderivative and subtract. The constant <em>C</em> cancels, so any antiderivative works. We write <em>F</em>(<em>b</em>) − <em>F</em>(<em>a</em>) as [<em>F</em>(<em>x</em>)]<sub>a</sub><sup>b</sup>.</p>
<p>A car's odometer and speedometer show the theorem in action. The speedometer shows the rate (the derivative of distance); the distance driven between two times is the integral of the speed, which equals the difference of the odometer readings.</p>
<p><strong>Examples.</strong></p>
<ul>
  <li>∫<sub>0</sub><sup>1</sup> <em>x</em>² <em>dx</em> = [<em>x</em>³/3]<sub>0</sub><sup>1</sup> = 1/3, matching the Riemann sum.</li>
  <li>∫<sub>0</sub><sup>2</sup> (3<em>x</em>² − 2<em>x</em>) <em>dx</em> = [<em>x</em>³ − <em>x</em>²]<sub>0</sub><sup>2</sup> = (8 − 4) − 0 = 4.</li>
  <li>∫<sub>0</sub><sup>π</sup> sin <em>x</em> <em>dx</em> = [−cos <em>x</em>]<sub>0</sub><sup>π</sup> = −(−1) − (−1) = 2. The area under one hump of the sine curve is exactly 2.</li>
  <li>∫<sub>−3</sub><sup>−1</sup> (1/<em>x</em>) <em>dx</em> = [ln |<em>x</em>|]<sub>−3</sub><sup>−1</sup> = ln 1 − ln 3 = −ln 3 ≈ −1.0986, negative because the curve is below the axis there. This is where the absolute value in the antiderivative table matters: ln <em>x</em> isn't defined on [−3, −1], but ln |<em>x</em>| is. (An interval of integration must not cross 0, where 1/<em>x</em> blows up.)</li>
</ul>

<h3>Area between curves and average value</h3>
<p>The area between two curves, with <em>f</em> on top and <em>g</em> below on [<em>a</em>, <em>b</em>], is ∫<sub>a</sub><sup>b</sup> (<em>f</em>(<em>x</em>) − <em>g</em>(<em>x</em>)) <em>dx</em>. <em>Example:</em> <em>y</em> = <em>x</em> and <em>y</em> = <em>x</em>² cross at 0 and 1, with <em>x</em> on top in between. The area between them is ∫<sub>0</sub><sup>1</sup> (<em>x</em> − <em>x</em>²) <em>dx</em> = 1/2 − 1/3 = 1/6.</p>
<p>The <strong>average value</strong> of <em>f</em> on [<em>a</em>, <em>b</em>] is (1/(<em>b</em> − <em>a</em>)) ∫<sub>a</sub><sup>b</sup> <em>f</em>(<em>x</em>) <em>dx</em>: the height of the rectangle with the same width and the same area. The average of <em>x</em>² on [0, 3] is (1/3) · 9 = 3.</p>

<h3>Substitution: the chain rule in reverse</h3>
<p>Many integrands contain a function and (a multiple of) its derivative, the pattern the chain rule produces. Substitution undoes it. Let <em>u</em> be the inner function and replace <em>du</em> = <em>u</em>′(<em>x</em>) <em>dx</em>.</p>
<p>Isn't <em>du</em>/<em>dx</em> "not really a fraction"? It isn't, and <em>du</em> = <em>u</em>′(<em>x</em>) <em>dx</em> is bookkeeping, not arithmetic with tiny numbers. The chain rule is what makes the bookkeeping honest. If <em>F</em>′ = <em>f</em>, then (<em>F</em>(<em>u</em>(<em>x</em>)))′ = <em>f</em>(<em>u</em>(<em>x</em>)) · <em>u</em>′(<em>x</em>), so</p>
<p class="math">∫ f(u(x)) u′(x) dx = F(u(x)) + C,</p>
<p>which is exactly what you get by writing ∫ <em>f</em>(<em>u</em>) <em>du</em> = <em>F</em>(<em>u</em>) + <em>C</em> and then putting <em>u</em> = <em>u</em>(<em>x</em>) back. The notation is designed so that treating <em>du</em> and <em>dx</em> like quantities, including moving a constant across as in <em>x</em> <em>dx</em> = <em>du</em>/2 below, always gives the answer the chain rule guarantees.</p>
<p><strong>Example.</strong> ∫ 2<em>x</em> cos(<em>x</em>²) <em>dx</em>. Let <em>u</em> = <em>x</em>², so <em>du</em> = 2<em>x</em> <em>dx</em>. The integral becomes ∫ cos <em>u</em> <em>du</em> = sin <em>u</em> + <em>C</em> = sin(<em>x</em>²) + <em>C</em>. Check: the derivative of sin(<em>x</em>²) is cos(<em>x</em>²) · 2<em>x</em>.</p>
<p><strong>Example with limits.</strong> ∫<sub>0</sub><sup>1</sup> <em>x</em> <em>e</em><sup>x²</sup> <em>dx</em>. Let <em>u</em> = <em>x</em>², <em>du</em> = 2<em>x</em> <em>dx</em>, so <em>x</em> <em>dx</em> = <em>du</em>/2. When <em>x</em> = 0, <em>u</em> = 0; when <em>x</em> = 1, <em>u</em> = 1. The integral becomes ½∫<sub>0</sub><sup>1</sup> <em>e</em><sup>u</sup> <em>du</em> = (<em>e</em> − 1)/2 ≈ 0.859. Changing the limits to <em>u</em>-values saves substituting back.</p>

<h3>Why computer science cares</h3>
<p>Integrals compute probabilities (the area under a probability density curve, central to statistics and machine learning), expected values and averages, physics in games and simulations (integrating acceleration to get velocity and position, frame by frame), and the total resources used by a process over time. Many integrals, such as ∫ <em>e</em><sup>−x²</sup> <em>dx</em> from the bell curve, have no formula in terms of familiar functions at all, so they must be computed numerically, with methods descended from the Riemann sum.</p>`,
    terms: [
      ["Fundamental Theorem of Calculus", "Accumulated area has derivative f, and ∫ₐᵇ f = F(b) − F(a)."],
      ["Average value", "(1/(b − a)) ∫ₐᵇ f(x) dx."],
      ["Dummy variable", "The letter inside an integral, such as t in ∫ₐˣ f(t) dt; renaming it doesn't change the value."],
      ["Substitution", "Reversing the chain rule by letting u be an inner function."]
    ],
    quiz: [
      {"q": "What is ∫<sub>1</sub><sup>3</sup> 2x dx?", "choices": ["4", "8", "9", "6"], "answer": 1, "why": "Antiderivative x²: 9 − 1 = 8."},
      {"q": "If F(x) = ∫<sub>0</sub><sup>x</sup> cos(t²) dt, what is F′(x)?", "choices": ["sin(x²)", "cos(x²)", "2x cos(x²)", "−sin(x²)"], "answer": 1, "why": "FTC part 1: the derivative of the accumulation is the integrand evaluated at x."},
      { q: "What is ∫<sub>0</sub><sup>π</sup> sin x dx?", choices: ["0", "1", "2", "π"], answer: 2, why: "[−cos x] from 0 to π = 1 − (−1) = 2." },
      { q: "What is the average value of f(x) = 2x on [0, 4]?", choices: ["2", "4", "8", "16"], answer: 1, why: "(1/4) ∫₀⁴ 2x dx = (1/4) · 16 = 4, which is also f at the midpoint, since f is linear." }
    ],
    practice: [
      { q: `<p>Evaluate: (a) ∫<sub>1</sub><sup>3</sup> (<em>x</em>² − 1) <em>dx</em>. (b) ∫<sub>1</sub><sup><em>e</em></sup> (1/<em>x</em>) <em>dx</em>. (c) ∫<sub>0</sub><sup>π/2</sup> cos <em>x</em> <em>dx</em>.</p>`, a: `<p>(a) [<em>x</em>³/3 − <em>x</em>]<sub>1</sub><sup>3</sup> = (9 − 3) − (1/3 − 1) = 6 + 2/3 = 20/3. (b) [ln <em>x</em>]<sub>1</sub><sup><em>e</em></sup> = 1 − 0 = 1. (c) [sin <em>x</em>]<sub>0</sub><sup>π/2</sup> = 1.</p>` },
      { q: `<p>Find the area of the region between <em>y</em> = 4 − <em>x</em>² and <em>y</em> = 0 (the <em>x</em>-axis).</p>`, a: `<p>The parabola crosses the axis at <em>x</em> = ±2. Area = ∫<sub>−2</sub><sup>2</sup> (4 − <em>x</em>²) <em>dx</em> = [4<em>x</em> − <em>x</em>³/3]<sub>−2</sub><sup>2</sup> = (8 − 8/3) − (−8 + 8/3) = 32/3.</p>` },
      { q: `<p>If <em>F</em>(<em>x</em>) = ∫<sub>0</sub><sup>x</sup> √(1 + <em>t</em>³) <em>dt</em>, find <em>F</em>′(2). If <em>G</em>(<em>x</em>) = ∫<sub>0</sub><sup>x²</sup> sin <em>t</em> <em>dt</em>, find <em>G</em>′(<em>x</em>).</p>`, hint: `<p>For <em>G</em>, the upper limit is a function of <em>x</em>, so you also need the chain rule.</p>`, a: `<p>By Part 1, <em>F</em>′(<em>x</em>) = √(1 + <em>x</em>³), so <em>F</em>′(2) = √9 = 3. You never need to compute the integral itself. For <em>G</em>, write <em>G</em>(<em>x</em>) = <em>A</em>(<em>x</em>²) with <em>A</em>(<em>u</em>) = ∫<sub>0</sub><sup>u</sup> sin <em>t</em> <em>dt</em>; by the chain rule <em>G</em>′(<em>x</em>) = sin(<em>x</em>²) · 2<em>x</em>.</p>` },
      { q: `<p>Use substitution: (a) ∫ (2<em>x</em> + 3)⁵ <em>dx</em>. (b) ∫ cos <em>x</em> · sin³ <em>x</em> <em>dx</em>. (c) ∫<sub>0</sub><sup>2</sup> <em>x</em>/(<em>x</em>² + 1) <em>dx</em>.</p>`, a: `<p>(a) <em>u</em> = 2<em>x</em> + 3, <em>du</em> = 2 <em>dx</em>: ½∫<em>u</em>⁵ <em>du</em> = (2<em>x</em> + 3)⁶/12 + <em>C</em>. (b) <em>u</em> = sin <em>x</em>, <em>du</em> = cos <em>x</em> <em>dx</em>: ∫<em>u</em>³ <em>du</em> = sin⁴ <em>x</em>/4 + <em>C</em>. (c) <em>u</em> = <em>x</em>² + 1, <em>du</em> = 2<em>x</em> <em>dx</em>, limits 1 to 5: ½∫<sub>1</sub><sup>5</sup> (1/<em>u</em>) <em>du</em> = ½ ln 5 ≈ 0.805.</p>` },
      { q: `<p>The area under the bell curve <em>e</em><sup>−x²</sup> from −∞ to ∞ is known to be √π, but there's no antiderivative formula. Use the <code>riemann</code> function from <a href="#c-math130-u6">Riemann sums and antiderivatives</a> to estimate ∫<sub>−5</sub><sup>5</sup> <em>e</em><sup>−x²</sup> <em>dx</em> with <em>n</em> = 1000 and compare with √π.</p>`, a: `<pre><code>import math
print(riemann(lambda x: math.exp(-x * x), -5, 5, 1000))   # 1.7724538509...
print(math.sqrt(math.pi))                                 # 1.7724538509...</code></pre><p>They agree to about ten digits: beyond ±5 the curve is smaller than <em>e</em><sup>−25</sup>, so cutting off the tails costs almost nothing, and the midpoint rule is very accurate for smooth functions like this. This integral underlies the normal distribution in statistics.</p>` }
    ],
    sources: ["openstaxcalc", "eoc", "mactutorcalc"]
  }
]);

CSA.addAsides("math130", {
  u1: [
    { kind: "history", title: "Zeno and Archimedes", html: `<p>Around 450 BCE Zeno of Elea argued that a runner can never finish a race, because they must first cover half the distance, then half the remainder, forever. The resolution, that infinitely many steps can add to a finite total, is the idea of a limit. Around 250 BCE Archimedes used the "method of exhaustion", squeezing a shape between polygons with more and more sides, to compute areas and to bound π between 3 10/71 and 3 1/7.</p>`, sources: ["mactutorcalc"] }
  ],
  u2: [
    { kind: "history", title: "Rigor arrives in the 1800s", html: `<p>Newton and Leibniz used "infinitely small" quantities without a clear definition, and critics such as Bishop Berkeley mocked them as "ghosts of departed quantities". In the 19th century Augustin-Louis Cauchy and Karl Weierstrass replaced infinitesimals with the ε–δ definition of limits and continuity, giving calculus a solid foundation.</p>`, sources: ["mactutorcalc"] }
  ],
  u3: [
    { kind: "history", title: "Newton versus Leibniz", html: `<p>Isaac Newton developed his "method of fluxions" in the 1660s but published little of it. Gottfried Leibniz developed calculus independently and published first, in 1684. A bitter priority dispute followed, and the Royal Society, with Newton as its president, ruled for Newton. Historians now agree they worked independently. Leibniz's notation, dy/dx and ∫, was easier to work with and is the one used today.</p>`, sources: ["mactutorcalc"] },
    { kind: "practice", title: "Floating point strikes again", html: `<p>Numerical derivatives show the trade-off from CS 101's floating-point sidebar. A large h gives a poor approximation; a tiny h gives rounding noise. Error analysis like this is the subject of numerical analysis, an elective in the Computational Science track.</p>` }
  ],
  chain: [
    { kind: "practice", title: "Automatic differentiation", html: `<p>Machine learning libraries such as PyTorch and JAX compute exact derivatives of programs, not by symbolic algebra and not by small-h approximation, but by applying the chain rule to every operation as the program runs. This technique, automatic differentiation, is why you can train a model without ever writing a derivative by hand.</p>` }
  ],
  u5: [
    { kind: "lang", title: "Languages built for numbers", html: `<p>FORTRAN (1957) was created to turn formulas like these into fast machine code, and it still runs many weather and physics simulations. MATLAB (1984) made matrix computation interactive. Python became the main language for numerical work through NumPy (2006), which wraps compiled C and Fortran libraries. Julia (2012) was designed to be as easy as Python and as fast as C.</p>`, sources: ["hopl"] }
  ],
  ftc: [
    { kind: "history", title: "The Fundamental Theorem's discovery", html: `<p>Isaac Barrow, Newton's teacher at Cambridge, proved a geometric version of the connection between tangents and areas in 1670. Newton and Leibniz turned it into a general method, which is why calculus became a tool rather than a collection of clever tricks.</p>`, sources: ["mactutorcalc"] }
  ],
});

CSA.addOptional("math130", [
  {
    id: "deep",
    kind: "deep",
    title: "Calculus inside machine learning",
    minutes: 40,
    summary: "How derivatives, the chain rule and gradient descent train every modern neural network, including large language models.",
    notes: `
<p>Training a machine learning model means finding parameters that make a <strong>loss function</strong>, a number measuring error, as small as possible. This is an optimization problem, exactly like the optimization lesson, at an enormous scale.</p>

<h3>One parameter</h3>
<p>Fit a line y = w·x through the point (2, 6). The squared error is L(w) = (2w − 6)². Its derivative is L′(w) = 4(2w − 6). Gradient descent repeats w ← w − η·L′(w).</p>
<div class="multi">
<pre data-lang="python"><code>w, lr = 0.0, 0.05
for step in range(20):
    grad = 4 * (2 * w - 6)
    w -= lr * grad
print(w)   # approaches 3.0</code></pre>
<pre data-lang="java"><code>double w = 0.0, lr = 0.05;
for (int step = 0; step &lt; 20; step++) {
    double grad = 4 * (2 * w - 6);
    w -= lr * grad;
}
System.out.println(w);   // approaches 3.0</code></pre>
<pre data-lang="cpp"><code>double w = 0.0, lr = 0.05;
for (int step = 0; step &lt; 20; step++) {
    double grad = 4 * (2 * w - 6);
    w -= lr * grad;
}
std::cout &lt;&lt; w &lt;&lt; "\\n";   // approaches 3.0</code></pre>
</div>
<p>If the learning rate is too large (try 0.3), each step overshoots and w diverges. Choosing step sizes is one of the practical arts of training.</p>

<h3>Many parameters</h3>
<p>Real models have millions to trillions of parameters. The derivative becomes the <strong>gradient</strong>, a vector of partial derivatives, one per parameter, which you will meet in <a href="#c-math131-k7">MATH 131, Lesson 7</a> next term. A quick preview of the two words: a <em>vector</em> here is just an ordered list of numbers, like a Python list <code>[0.3, -1.2, 5.0]</code>. A <em>partial derivative</em> of a function of several inputs is the ordinary derivative with respect to one input while all the others are held fixed: for <em>f</em>(<em>w</em>, <em>b</em>) = <em>w</em>² + 3<em>b</em>, the partial derivative with respect to <em>w</em> is 2<em>w</em> (treating <em>b</em> as a constant), and with respect to <em>b</em> it is 3. The gradient lists them all: (2<em>w</em>, 3). The gradient points uphill; training steps the other way.</p>

<h3>The chain rule at scale</h3>
<p>A neural network is a composition f<sub>n</sub>(…f<sub>2</sub>(f<sub>1</sub>(x))). Backpropagation, popularized for neural networks by Rumelhart, Hinton and Williams in 1986, computes every partial derivative in one backward pass by applying the chain rule from the output toward the input, reusing intermediate results. Its cost is about the same as running the network forward once.</p>

<h3>What calculus does not tell you</h3>
<p>Calculus finds where slopes are zero. It does not guarantee the global minimum, and it says nothing about whether a trained model is fair, safe or accurate on data it has not seen. Those questions belong to statistics, ethics and the AI courses later in the program.</p>
`,
    terms: [
      ["Loss function", "A number measuring how wrong a model's predictions are."],
      ["Gradient", "The vector of partial derivatives; it points in the direction of steepest increase."],
      ["Gradient descent", "Repeatedly stepping against the gradient to reduce a function."]
    ],
    quiz: [
      { q: "In gradient descent, why do we subtract the derivative?", choices: ["To make the parameter smaller", "The derivative points uphill, so subtracting moves downhill", "It is faster to compute", "To avoid overflow"], answer: 1, why: "A positive slope means the loss increases to the right, so we move left, and vice versa." },
      { q: "What happens if the learning rate is too large?", choices: ["Training is more accurate", "Steps overshoot and may diverge", "Nothing changes", "The gradient becomes zero"], answer: 1, why: "Big steps jump past the minimum and can grow without bound." }
    ],
    sources: ["eoc", "openstaxcalc"]
  },
  {
    id: "history",
    kind: "history",
    title: "Two thousand years of calculus",
    minutes: 30,
    summary: "From Archimedes' polygons to Newton and Leibniz to the ε–δ definition: the long road to the course you are taking.",
    notes: `
<h3>Ancient roots</h3>
<p>Greek mathematicians avoided the infinite but found ways around it. Eudoxus and Archimedes computed areas and volumes by squeezing shapes between simpler ones. Archimedes found the area of a parabolic segment with what amounts to a <em>geometric series</em>: an endless sum in which each term is a fixed fraction of the one before, here 1 + ¼ + 1/16 + 1/64 + ⋯, whose total is 4/3. "Total" means the number the running sums approach: 1, 1.25, 1.3125, 1.328125, … get ever closer to 4/3 without passing it, the same idea as a limit in <a href="#c-math130-u1">Lesson 3</a>. To find it, call the total <em>S</em>. Multiplying every term by ¼ gives ¼ + 1/16 + ⋯, which is <em>S</em> − 1, so <em>S</em>/4 = <em>S</em> − 1 and <em>S</em> = 4/3.</p>

<h3>Medieval and early modern steps</h3>
<p>Mathematicians in Kerala, India, led by Madhava of Sangamagrama (14th century), found infinite series for sine, cosine and π, centuries before they were known in Europe. In the 1600s Fermat found tangents and maxima with a method close to differentiation, and Cavalieri computed areas by summing "indivisibles".</p>

<h3>Newton and Leibniz</h3>
<p>Between 1665 and 1686 Newton and Leibniz each turned these techniques into a general system with rules that worked for any function. Newton used it to derive the laws of planetary motion in the <em>Principia</em> (1687). Leibniz's notation spread across continental Europe, where the Bernoullis and Euler developed calculus rapidly in the 18th century.</p>

<h3>Making it rigorous</h3>
<p>Calculus worked, but its foundations were shaky. Cauchy (1820s) and Weierstrass (1860s) defined limits precisely, and Riemann defined the integral as a limit of sums. In the 1960s Abraham Robinson showed that infinitesimals could be made rigorous after all, in "nonstandard analysis".</p>

<h3>Calculus and computers</h3>
<p>The first electronic computers were built largely to solve <em>differential equations</em>, equations that describe how a quantity changes by giving its derivative (for example, a shell's velocity changes according to gravity and air resistance) and ask for the quantity itself: ENIAC's first jobs included artillery tables and calculations for nuclear weapons. Numerical calculus remains one of the largest uses of computing, from weather forecasts to training AI models.</p>
`,
    terms: [
      ["Method of exhaustion", "Approximating an area by inscribed and circumscribed shapes."],
      ["Infinitesimal", "An infinitely small quantity, used informally by Newton and Leibniz."]
    ],
    quiz: [
      { q: "Whose notation (dy/dx, ∫) is used in calculus today?", choices: ["Newton", "Leibniz", "Archimedes", "Cauchy"], answer: 1, why: "Leibniz's notation proved more practical and became standard." },
      { q: "Who found infinite series for sine and cosine in 14th-century India?", choices: ["Madhava of Sangamagrama", "Fermat", "Euler", "Cavalieri"], answer: 0, why: "Madhava and the Kerala school found these series about 300 years before Europe." }
    ],
    sources: ["mactutorcalc", "openstaxcalc", "chmrev"]
  }
]);
