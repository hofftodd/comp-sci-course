CSA.addCourse({
  id: "math130",
  code: "MATH 130",
  title: "Calculus I",
  credits: 4,
  kind: "required",
  term: "y1f",
  summary: "Limits, derivatives and the first steps of integration, taught with an eye on computing: numerical approximation, optimization and the gradient methods behind modern machine learning.",
  prereqs: ["High-school algebra and trigonometry"],
  outcomes: [
    "Compute limits and decide where functions are continuous",
    "Explain the derivative as a limit and as a rate of change",
    "Differentiate using the power, product, quotient and chain rules",
    "Solve optimization problems and use linear approximation",
    "Relate derivatives and integrals through the Fundamental Theorem of Calculus"
  ],
  units: [
    {
      id: "u1",
      title: "Functions and limits",
      minutes: 60,
      summary: "What it means for f(x) to approach a value, one-sided limits, and limit laws.",
      notes: `
<p>The limit lim<sub>x→a</sub> f(x) = L means that f(x) gets as close to L as we like by taking x close enough to a, but not equal to a. The value f(a) itself does not matter, and need not exist.</p>

<h3>Example: a hole in the graph</h3>
<p>f(x) = (x² − 1)/(x − 1) is undefined at x = 1. For x ≠ 1 it simplifies to x + 1, so lim<sub>x→1</sub> f(x) = 2.</p>

<h3>One-sided limits</h3>
<p>lim<sub>x→a⁻</sub> approaches from the left, lim<sub>x→a⁺</sub> from the right. The two-sided limit exists only if both one-sided limits exist and agree. For f(x) = |x|/x, the left limit at 0 is −1 and the right limit is 1, so the limit does not exist.</p>

<h3>Limit laws</h3>
<p>If the limits of f and g exist at a, then limits of sums, differences, products and quotients (when the denominator's limit is not 0) are the sums, differences, products and quotients of the limits. For polynomials, the limit is just the value: lim<sub>x→2</sub> (x³ − x) = 6.</p>

<h3>Limits at infinity</h3>
<p>lim<sub>x→∞</sub> (3x² + 1)/(x² − 5) = 3: divide top and bottom by x² and the small terms vanish. This is the same reasoning you will use for big-O notation in Algorithms: only the dominant term matters for large inputs.</p>

<h3>The precise definition</h3>
<p>For every ε &gt; 0 there is a δ &gt; 0 such that 0 &lt; |x − a| &lt; δ implies |f(x) − L| &lt; ε. Read it as a game: an opponent names a tolerance ε, and you must find a δ that guarantees it. Notice the nested quantifiers ∀ε ∃δ from Discrete Math.</p>

<h3>Estimating limits numerically</h3>
<div class="multi">
<pre data-lang="python"><code>import math
for h in [0.1, 0.01, 0.001, 0.0001]:
    print(h, math.sin(h) / h)
# 0.998..., 0.99998..., approaching 1</code></pre>
<pre data-lang="java"><code>for (double h : new double[]{0.1, 0.01, 0.001, 0.0001}) {
    System.out.println(h + " " + Math.sin(h) / h);
}</code></pre>
<pre data-lang="cpp"><code>for (double h : {0.1, 0.01, 0.001, 0.0001}) {
    std::cout &lt;&lt; h &lt;&lt; " " &lt;&lt; std::sin(h) / h &lt;&lt; "\\n";
}</code></pre>
</div>
<p>Numerical evidence suggests a limit; it does not prove one.</p>
`,
      terms: [
        ["Limit", "The value f(x) approaches as x approaches a."],
        ["One-sided limit", "A limit taken from only the left or only the right."],
        ["ε–δ definition", "The precise, quantifier-based definition of a limit."]
      ],
      quiz: [
        { q: "What is lim<sub>x→3</sub> (x² − 9)/(x − 3)?", choices: ["0", "3", "6", "It does not exist"], answer: 2, why: "Factor: (x − 3)(x + 3)/(x − 3) = x + 3 for x ≠ 3, which approaches 6." },
        { q: "If f(2) is undefined, can lim<sub>x→2</sub> f(x) exist?", choices: ["Yes", "No"], answer: 0, why: "A limit depends only on values near 2, not at 2." },
        { q: "What is lim<sub>x→∞</sub> (5x³ + x)/(2x³ − 7)?", choices: ["0", "5/2", "∞", "−5/7"], answer: 1, why: "The leading terms dominate: 5x³/2x³ = 5/2." }
      ],
      sources: ["openstaxcalc", "eoc"]
    },
    {
      id: "u2",
      title: "Continuity",
      minutes: 45,
      summary: "Continuous functions, kinds of discontinuity, and the Intermediate Value Theorem.",
      notes: `
<p>f is <strong>continuous at a</strong> if three things hold: f(a) is defined, lim<sub>x→a</sub> f(x) exists, and the two are equal. Informally, you can draw the graph without lifting the pen.</p>

<h3>Kinds of discontinuity</h3>
<ul>
  <li><strong>Removable:</strong> the limit exists but differs from f(a) or f(a) is undefined (a hole).</li>
  <li><strong>Jump:</strong> the one-sided limits exist but differ, as in a step function.</li>
  <li><strong>Infinite:</strong> the function grows without bound, as 1/x at 0.</li>
</ul>
<p>Polynomials, exponentials, sine and cosine are continuous everywhere. Rational functions are continuous wherever the denominator is non-zero.</p>

<h3>The Intermediate Value Theorem</h3>
<p>If f is continuous on [a, b] and N is between f(a) and f(b), then f(c) = N for some c in [a, b].</p>
<p>The consequence for computing: if a continuous f changes sign on [a, b], it has a root there. That is exactly why bisection from CS 101 works. Each step keeps the half where the sign changes, and the IVT guarantees the root is still inside.</p>
<div class="multi">
<pre data-lang="python"><code>def bisect(f, lo, hi, tol=1e-10):
    while hi - lo &gt; tol:
        mid = (lo + hi) / 2
        if f(lo) * f(mid) &lt;= 0:
            hi = mid
        else:
            lo = mid
    return (lo + hi) / 2

bisect(lambda x: x**2 - 2, 0, 2)   # 1.41421356...</code></pre>
<pre data-lang="java"><code>static double bisect(DoubleUnaryOperator f, double lo, double hi) {
    while (hi - lo &gt; 1e-10) {
        double mid = (lo + hi) / 2;
        if (f.applyAsDouble(lo) * f.applyAsDouble(mid) &lt;= 0) hi = mid;
        else lo = mid;
    }
    return (lo + hi) / 2;
}
bisect(x -&gt; x * x - 2, 0, 2);   // 1.41421356...</code></pre>
<pre data-lang="cpp"><code>double bisect(std::function&lt;double(double)&gt; f, double lo, double hi) {
    while (hi - lo &gt; 1e-10) {
        double mid = (lo + hi) / 2;
        if (f(lo) * f(mid) &lt;= 0) hi = mid;
        else lo = mid;
    }
    return (lo + hi) / 2;
}
bisect([](double x) { return x * x - 2; }, 0, 2);   // 1.41421356...</code></pre>
</div>
`,
      terms: [
        ["Continuous", "f(a) exists, the limit at a exists, and they are equal."],
        ["Removable discontinuity", "A hole that could be filled by redefining one value."],
        ["Intermediate Value Theorem", "A continuous function takes every value between f(a) and f(b) on [a, b]."]
      ],
      quiz: [
        { q: "f(x) = x³ − x − 1 has f(1) = −1 and f(2) = 5. What does the IVT tell you?", choices: ["f has a root in (1, 2)", "f has no roots", "f(1.5) = 2", "f is increasing"], answer: 0, why: "f is continuous and changes sign, so it crosses 0 between 1 and 2." },
        { q: "The floor function ⌊x⌋ has what kind of discontinuity at each integer?", choices: ["Removable", "Jump", "Infinite", "None"], answer: 1, why: "The left and right limits differ by 1." }
      ],
      sources: ["openstaxcalc", "mit6100l"]
    },
    {
      id: "u3",
      title: "The derivative",
      minutes: 60,
      summary: "Derivatives as limits of difference quotients, as slopes, and as rates of change.",
      notes: `
<p>The <strong>derivative</strong> of f at a is</p>
<p class="math">f′(a) = lim<sub>h→0</sub> [f(a + h) − f(a)] / h</p>
<p>The fraction is the slope of the secant line through two nearby points. As h shrinks, the secant becomes the <em>tangent line</em>, and its slope is the instantaneous rate of change.</p>

<h3>From the definition</h3>
<p>For f(x) = x²: [(x + h)² − x²]/h = (2xh + h²)/h = 2x + h → 2x. So f′(x) = 2x.</p>

<h3>Interpretations</h3>
<ul>
  <li>If s(t) is position, s′(t) is velocity and s″(t) is acceleration.</li>
  <li>If C(n) is the cost of making n items, C′(n) is the marginal cost of one more.</li>
  <li>If L(w) is a model's error for parameter w, L′(w) says which way to move w to reduce the error.</li>
</ul>

<h3>Notation</h3>
<p>f′(x), dy/dx and d/dx f(x) all mean the same thing. Newton wrote ẏ; Leibniz wrote dy/dx, which is the notation that won.</p>

<h3>Differentiable implies continuous</h3>
<p>If f′(a) exists, f is continuous at a. The converse fails: |x| is continuous at 0 but has a corner, where the left slope is −1 and the right slope is 1.</p>

<h3>Numerical derivatives</h3>
<p>A computer can estimate f′(a) with a small h. The <em>central difference</em> [f(a + h) − f(a − h)]/(2h) is far more accurate than the one-sided version. But making h too small backfires: subtracting two nearly equal floating-point numbers loses digits. A value near h = 10⁻⁵ to 10⁻⁶ is a common compromise in double precision.</p>
`,
      terms: [
        ["Difference quotient", "[f(a + h) − f(a)]/h, the slope of a secant line."],
        ["Tangent line", "The line through (a, f(a)) with slope f′(a)."],
        ["Differentiable", "Having a derivative at a point."],
        ["Central difference", "A numerical derivative using points on both sides of a."]
      ],
      quiz: [
        { q: "Using the definition, what is the derivative of f(x) = 3x + 5?", choices: ["3x", "3", "5", "8"], answer: 1, why: "[3(x + h) + 5 − 3x − 5]/h = 3h/h = 3." },
        { q: "Is f(x) = |x| differentiable at 0?", choices: ["Yes, f′(0) = 0", "Yes, f′(0) = 1", "No, the left and right slopes differ"], answer: 2, why: "The slope is −1 from the left and +1 from the right, so the limit does not exist." },
        { q: "Why not use h = 10⁻¹⁵ for a numerical derivative in double precision?", choices: ["It is too slow", "Rounding error in f(a + h) − f(a) dominates", "Computers cannot store it", "It always gives 0 exactly"], answer: 1, why: "The two function values agree in almost every digit, so their difference is mostly rounding noise." }
      ],
      sources: ["openstaxcalc", "eoc"]
    },
    {
      id: "u4",
      title: "Differentiation rules",
      minutes: 75,
      summary: "Power, sum, product, quotient and chain rules, and derivatives of exponential, log and trig functions.",
      notes: `
<h3>The rules</h3>
<table>
  <thead><tr><th>Rule</th><th>Formula</th></tr></thead>
  <tbody>
    <tr><td>Constant</td><td>(c)′ = 0</td></tr>
    <tr><td>Power</td><td>(xⁿ)′ = n·xⁿ⁻¹</td></tr>
    <tr><td>Sum</td><td>(f + g)′ = f′ + g′</td></tr>
    <tr><td>Product</td><td>(fg)′ = f′g + fg′</td></tr>
    <tr><td>Quotient</td><td>(f/g)′ = (f′g − fg′)/g²</td></tr>
    <tr><td>Chain</td><td>(f(g(x)))′ = f′(g(x))·g′(x)</td></tr>
  </tbody>
</table>

<h3>Common derivatives</h3>
<ul>
  <li>(eˣ)′ = eˣ, and (aˣ)′ = aˣ ln a</li>
  <li>(ln x)′ = 1/x</li>
  <li>(sin x)′ = cos x, and (cos x)′ = −sin x</li>
</ul>

<h3>The chain rule is the one that matters most</h3>
<p>For a composition, multiply the derivatives of each layer, evaluated at the right place.</p>
<p><strong>Example.</strong> y = (3x² + 1)⁵. The outer function is u⁵, the inner is u = 3x² + 1. So y′ = 5(3x² + 1)⁴ · 6x.</p>
<p><strong>Example.</strong> y = e<sup>−x²</sup>. y′ = e<sup>−x²</sup> · (−2x).</p>
<p>In Leibniz notation the rule looks like fractions cancelling: dy/dx = (dy/du)(du/dx). A neural network is a long chain of composed functions, and <em>backpropagation</em> is the chain rule applied layer by layer.</p>

<h3>Implicit differentiation</h3>
<p>When y is defined by an equation like x² + y² = 25, differentiate both sides with respect to x, treating y as a function of x: 2x + 2y·y′ = 0, so y′ = −x/y.</p>
`,
      terms: [
        ["Power rule", "The derivative of xⁿ is n·xⁿ⁻¹."],
        ["Chain rule", "The derivative of a composition is the product of the layers' derivatives."],
        ["Implicit differentiation", "Differentiating an equation without solving for y first."],
        ["Backpropagation", "Computing gradients in a neural network by applying the chain rule backward."]
      ],
      quiz: [
        { q: "What is d/dx [x³ sin x]?", choices: ["3x² cos x", "3x² sin x + x³ cos x", "3x² sin x − x³ cos x", "x³ cos x"], answer: 1, why: "Product rule: (x³)′ sin x + x³ (sin x)′." },
        { q: "What is d/dx [ln(x² + 1)]?", choices: ["1/(x² + 1)", "2x/(x² + 1)", "2x ln(x² + 1)", "1/(2x)"], answer: 1, why: "Chain rule: 1/u · u′ with u = x² + 1 and u′ = 2x." },
        { q: "Backpropagation in neural networks is an application of which rule?", choices: ["Quotient rule", "Power rule", "Chain rule", "L'Hôpital's rule"], answer: 2, why: "A network is a composition of layers; gradients flow back through it by the chain rule." }
      ],
      sources: ["openstaxcalc", "eoc"]
    },
    {
      id: "u5",
      title: "Applications: optimization and approximation",
      minutes: 75,
      summary: "Critical points, the first and second derivative tests, optimization, linear approximation and Newton's method.",
      notes: `
<h3>Finding extremes</h3>
<p>A <strong>critical point</strong> is where f′(x) = 0 or f′ does not exist. On a closed interval [a, b], a continuous function reaches its maximum and minimum either at a critical point or at an endpoint (the Extreme Value Theorem). So: find the critical points, evaluate f at them and at the endpoints, and compare.</p>
<ul>
  <li><strong>First derivative test:</strong> if f′ changes from + to −, it is a local max; from − to +, a local min.</li>
  <li><strong>Second derivative test:</strong> at a critical point, f″ &gt; 0 means local min (concave up), f″ &lt; 0 means local max.</li>
</ul>

<h3>An optimization problem</h3>
<p>A farmer has 400 m of fence for a rectangular pen along a river (no fence needed on the river side). Maximize the area. With width x and length 400 − 2x, area A(x) = x(400 − 2x). A′(x) = 400 − 4x = 0 gives x = 100, so the pen is 100 m × 200 m with area 20,000 m². A″ = −4 &lt; 0 confirms a maximum.</p>

<h3>Linear approximation</h3>
<p>Near a, f(x) ≈ f(a) + f′(a)(x − a). Example: √4.1 ≈ 2 + (1/4)(0.1) = 2.025. The true value is 2.02485…</p>

<h3>Newton's method</h3>
<p>To solve f(x) = 0, start from a guess and repeatedly jump to where the tangent line crosses zero: x<sub>n+1</sub> = x<sub>n</sub> − f(x<sub>n</sub>)/f′(x<sub>n</sub>). Near a simple root, the number of correct digits roughly doubles each step, far faster than bisection.</p>
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

<h3>Gradient descent</h3>
<p>To minimize a function, step against the derivative: w ← w − η·f′(w), where η is the step size (learning rate). With one variable this is just "walk downhill". With millions of variables, it is how neural networks are trained. See the optional lesson.</p>
`,
      terms: [
        ["Critical point", "Where f′ is zero or undefined."],
        ["Concavity", "Whether a graph curves up (f″ > 0) or down (f″ < 0)."],
        ["Linear approximation", "Using the tangent line to estimate nearby values."],
        ["Newton's method", "Root finding by repeatedly following tangent lines."],
        ["Learning rate", "The step size η in gradient descent."]
      ],
      quiz: [
        { q: "f(x) = x³ − 3x. Where are its critical points?", choices: ["x = 0", "x = ±1", "x = ±3", "x = ±√3"], answer: 1, why: "f′(x) = 3x² − 3 = 0 gives x = ±1." },
        { q: "At x = 1 for f(x) = x³ − 3x, f″(1) = 6. What is x = 1?", choices: ["Local max", "Local min", "Inflection point", "Not enough information"], answer: 1, why: "f″ > 0 means concave up, so a local minimum." },
        { q: "Using linear approximation at a = 1, estimate ln(1.05).", choices: ["0.05", "1.05", "0.5", "0"], answer: 0, why: "ln 1 = 0 and (ln x)′ = 1 at x = 1, so ln(1.05) ≈ 0 + 1·0.05." }
      ],
      sources: ["openstaxcalc", "eoc"]
    },
    {
      id: "u6",
      title: "Integrals and the Fundamental Theorem",
      minutes: 75,
      summary: "Area as a limit of sums, antiderivatives, and the theorem that connects them.",
      notes: `
<h3>Area as a limit of sums</h3>
<p>Split [a, b] into n strips of width Δx = (b − a)/n and add up rectangles: Σ f(xᵢ)Δx. This is a <strong>Riemann sum</strong>. As n → ∞, it approaches the <strong>definite integral</strong> ∫<sub>a</sub><sup>b</sup> f(x) dx.</p>
<div class="multi">
<pre data-lang="python"><code>def riemann(f, a, b, n):
    dx = (b - a) / n
    return sum(f(a + (i + 0.5) * dx) for i in range(n)) * dx   # midpoint rule

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

<h3>Antiderivatives</h3>
<p>F is an <strong>antiderivative</strong> of f if F′ = f. Antiderivatives are unique only up to a constant: ∫ x² dx = x³/3 + C.</p>

<h3>The Fundamental Theorem of Calculus</h3>
<ol>
  <li>If F(x) = ∫<sub>a</sub><sup>x</sup> f(t) dt, then F′(x) = f(x). Accumulating a quantity and then asking its rate of change gives back the original function.</li>
  <li>If F′ = f, then ∫<sub>a</sub><sup>b</sup> f(x) dx = F(b) − F(a).</li>
</ol>
<p>So ∫<sub>0</sub><sup>1</sup> x² dx = 1/3 − 0 = 1/3, matching the numerical answer above. Differentiation and integration are inverse operations. This connection is the central idea of calculus.</p>

<h3>Substitution</h3>
<p>The chain rule in reverse. For ∫ 2x·cos(x²) dx, let u = x², du = 2x dx, giving ∫ cos u du = sin(x²) + C.</p>

<h3>Why CS cares</h3>
<p>Integrals compute probabilities (the area under a probability density), expected values, physics in games and simulations, and the average behavior of algorithms. Many integrals have no closed form and must be computed numerically, as above.</p>
`,
      terms: [
        ["Riemann sum", "An approximation of area by rectangles."],
        ["Definite integral", "The limit of Riemann sums; signed area under a curve."],
        ["Antiderivative", "A function whose derivative is f."],
        ["Fundamental Theorem of Calculus", "The theorem that differentiation and integration are inverse processes."]
      ],
      quiz: [
        { q: "What is ∫<sub>1</sub><sup>3</sup> 2x dx?", choices: ["4", "8", "9", "6"], answer: 1, why: "Antiderivative x²: 9 − 1 = 8." },
        { q: "If F(x) = ∫<sub>0</sub><sup>x</sup> cos(t²) dt, what is F′(x)?", choices: ["sin(x²)", "cos(x²)", "2x cos(x²)", "−sin(x²)"], answer: 1, why: "FTC part 1: the derivative of the accumulation is the integrand evaluated at x." },
        { q: "Why does the antiderivative include + C?", choices: ["It is a convention with no reason", "Constants have derivative 0, so many functions share a derivative", "To make integrals positive", "C stands for curve"], answer: 1, why: "x² and x² + 7 have the same derivative, so the antiderivative is a family." }
      ],
      sources: ["openstaxcalc", "eoc"]
    }
  ]
});

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
  u4: [
    { kind: "practice", title: "Automatic differentiation", html: `<p>Machine learning libraries such as PyTorch and JAX compute exact derivatives of programs, not by symbolic algebra and not by small-h approximation, but by applying the chain rule to every operation as the program runs. This technique, automatic differentiation, is why you can train a model without ever writing a derivative by hand.</p>` }
  ],
  u5: [
    { kind: "lang", title: "Languages built for numbers", html: `<p>FORTRAN (1957) was created to turn formulas like these into fast machine code, and it still runs many weather and physics simulations. MATLAB (1984) made matrix computation interactive. Python became the main language for numerical work through NumPy (2006), which wraps compiled C and Fortran libraries. Julia (2012) was designed to be as easy as Python and as fast as C.</p>`, sources: ["hopl"] }
  ],
  u6: [
    { kind: "history", title: "The Fundamental Theorem's discovery", html: `<p>Isaac Barrow, Newton's teacher at Cambridge, proved a geometric version of the connection between tangents and areas in 1670. Newton and Leibniz turned it into a general method, which is why calculus became a tool rather than a collection of clever tricks.</p>`, sources: ["mactutorcalc"] }
  ]
});

CSA.addOptional("math130", [
  {
    id: "deep",
    kind: "deep",
    title: "Calculus inside machine learning",
    minutes: 40,
    summary: "How derivatives, the chain rule and gradient descent train every modern neural network, including large language models.",
    notes: `
<p>Training a machine learning model means finding parameters that make a <strong>loss function</strong>, a number measuring error, as small as possible. This is an optimization problem, exactly like Unit 5, at an enormous scale.</p>

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
<p>Real models have millions to trillions of parameters. The derivative becomes the <strong>gradient</strong>, a vector of partial derivatives, one per parameter, which you will meet in Multivariable Calculus next term. The gradient points uphill; training steps the other way.</p>

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
<p>Greek mathematicians avoided the infinite but found ways around it. Eudoxus and Archimedes computed areas and volumes by squeezing shapes between simpler ones. Archimedes found the area of a parabolic segment with what amounts to a geometric series.</p>

<h3>Medieval and early modern steps</h3>
<p>Mathematicians in Kerala, India, led by Madhava of Sangamagrama (14th century), found infinite series for sine, cosine and π, centuries before they were known in Europe. In the 1600s Fermat found tangents and maxima with a method close to differentiation, and Cavalieri computed areas by summing "indivisibles".</p>

<h3>Newton and Leibniz</h3>
<p>Between 1665 and 1686 Newton and Leibniz each turned these techniques into a general system with rules that worked for any function. Newton used it to derive the laws of planetary motion in the <em>Principia</em> (1687). Leibniz's notation spread across continental Europe, where the Bernoullis and Euler developed calculus rapidly in the 18th century.</p>

<h3>Making it rigorous</h3>
<p>Calculus worked, but its foundations were shaky. Cauchy (1820s) and Weierstrass (1860s) defined limits precisely, and Riemann defined the integral as a limit of sums. In the 1960s Abraham Robinson showed that infinitesimals could be made rigorous after all, in "nonstandard analysis".</p>

<h3>Calculus and computers</h3>
<p>The first electronic computers were built largely to solve differential equations: ENIAC's first jobs included artillery tables and calculations for nuclear weapons. Numerical calculus remains one of the largest uses of computing, from weather forecasts to training AI models.</p>
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
