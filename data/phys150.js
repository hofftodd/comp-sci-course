CSA.addCourse({
  id: "phys150",
  code: "PHYS 150",
  title: "Physics I: Mechanics with Computation",
  credits: 4,
  kind: "optional",
  term: "y1s",
  summary: "Classical mechanics taught through simulation: motion, forces, energy, momentum, orbits and oscillations. Every lesson pairs the physics with a short Python program that simulates it, so you can model problems that have no formula solution. The recommended science elective for computer science students.",
  prereqs: ["MATH 130 Calculus I", "CS 101 Programming I", "MATH 131 (taken at the same time)"],
  outcomes: [
    "Describe motion in one and two dimensions with position, velocity and acceleration vectors",
    "Apply Newton's laws with free-body diagrams, including friction and air resistance",
    "Use conservation of energy and momentum to solve problems and check simulations",
    "Explain circular motion and gravitation, and simulate orbits",
    "Analyze simple harmonic motion, damping and resonance",
    "Write numerical simulations of physical systems, choose a step size and integration method, and validate the results"
  ],
  rubric: {
    criteriaFor: "problem sets, simulation labs and exams",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 25, desc: "Weekly problems solved with diagrams, equations and units, drawn from each lesson's practice set." },
      { name: "Simulation labs", weight: 25, desc: "Six labs, one per lesson: the auto-graded programming problems plus a short report comparing your simulation with theory or measurement, including a plot." },
      { name: "Midterm exam", weight: 15, desc: "Kinematics, Newton's laws and energy (lessons 1–4)." },
      { name: "Final exam", weight: 25, desc: "Cumulative, with emphasis on momentum, gravitation and oscillations (lessons 4–6)." }
    ],
    criteria: [
      { name: "Physical model", desc: "Is the situation modeled correctly?", levels: [
        "Clear diagram, all forces or quantities identified, assumptions stated (e.g. no air resistance).",
        "Correct model with a minor omission.",
        "A missing force or a wrong assumption that changes the answer.",
        "No coherent model." ] },
      { name: "Mathematics", desc: "Is it solved correctly?", levels: [
        "Correct equations, solved symbolically before substituting numbers, with units throughout.",
        "Correct approach with a small algebra or arithmetic slip.",
        "Errors that make the answer wrong, or units missing.",
        "Incorrect or missing." ] },
      { name: "Simulation", desc: "Does the code model the physics?", levels: [
        "Correct, readable code; step size justified; results validated against a known case or a conservation law.",
        "Works, but not validated, or the step size isn't discussed.",
        "Runs but gives physically wrong results.",
        "Doesn't run." ] },
      { name: "Sense-making", desc: "Does the answer make sense?", levels: [
        "Checks units, sign, size and limiting cases, and explains the result physically.",
        "Some checking.",
        "Accepts an implausible answer (a ball thrown upward at 3000 m/s).",
        "No check." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Collaboration:</b> work together on problems and labs; write your own solutions, code and reports, and list who you worked with.",
      "<b>AI assistants:</b> allowed for explanations and debugging. Your lab report must explain your code and your validation in your own words.",
      "<b>Late work:</b> two late days for the term on problem sets and labs.",
      "<b>Units:</b> a numerical answer without units earns at most half credit."
    ]
  }
});

CSA.addUnits("phys150", [
  {
    id: "p1",
    title: "Motion in one dimension, and your first simulation",
    minutes: 90,
    summary: "Position, velocity and acceleration as derivatives; the constant-acceleration equations; free fall; and stepping a simulation forward in time.",
    notes: `
<p>Physics describes how things change, and calculus is its language. This course pairs each topic with a simulation: a program that steps a physical system forward in small time increments. Simulations let you study situations no formula can solve, such as a skydiver with air resistance or three bodies orbiting each other, and they are how engineers design bridges, games simulate motion, and scientists model the climate.</p>

<h3>Position, velocity and acceleration</h3>
<p>An object moving along a line has a <strong>position</strong> <em>x</em>(<em>t</em>), in meters. Its <strong>velocity</strong> is the rate of change of position, and its <strong>acceleration</strong> is the rate of change of velocity:</p>
<p class="math"><em>v</em>(<em>t</em>) = <em>dx</em>/<em>dt</em> (m/s),   <em>a</em>(<em>t</em>) = <em>dv</em>/<em>dt</em> = <em>d</em>²<em>x</em>/<em>dt</em>² (m/s²)</p>
<p>Velocity has a sign (direction); <strong>speed</strong> is its magnitude. Going the other way, integration recovers velocity from acceleration and position from velocity, given starting values: <em>v</em>(<em>t</em>) = <em>v</em>₀ + ∫<sub>0</sub><sup><em>t</em></sup> <em>a</em> <em>dt</em>′.</p>

<h3>Constant acceleration</h3>
<p>When <em>a</em> is constant, integrating twice gives the equations of motion you'll use constantly:</p>
<p class="math"><em>v</em> = <em>v</em>₀ + <em>at</em>     <em>x</em> = <em>x</em>₀ + <em>v</em>₀<em>t</em> + ½<em>at</em>²     <em>v</em>² = <em>v</em>₀² + 2<em>a</em>(<em>x</em> − <em>x</em>₀)</p>
<p>The third comes from eliminating <em>t</em> from the first two, and is handy when time isn't asked for.</p>

<h3>Free fall</h3>
<p>Near Earth's surface, ignoring air resistance, every object falls with the same acceleration, <em>g</em> ≈ 9.8 m/s² downward, whatever its mass. (Galileo argued this around 1600; astronaut David Scott demonstrated it on the Moon in 1971 by dropping a hammer and a feather together.) Taking up as positive, <em>a</em> = −<em>g</em>.</p>
<p><strong>Example.</strong> A ball is thrown straight up at 20 m/s. At the top, <em>v</em> = 0: from <em>v</em> = <em>v</em>₀ − <em>gt</em>, it takes <em>t</em> = 20/9.8 ≈ 2.04 s to get there. From <em>v</em>² = <em>v</em>₀² − 2<em>gh</em>, the maximum height is <em>h</em> = <em>v</em>₀²/(2<em>g</em>) = 400/19.6 ≈ 20.4 m. By symmetry, it returns to the hand after about 4.08 s, moving at 20 m/s downward.</p>
<p><strong>Problem-solving habit.</strong> Draw a picture, choose a positive direction, list what you know and want, pick the equation that connects them, solve symbolically, and only then substitute numbers. Check units and whether the answer is reasonable.</p>

<h3>Simulation: stepping through time</h3>
<p>A simulation stores the current state (position and velocity) and updates it by a small time step Δ<em>t</em>, using the definitions of velocity and acceleration as approximations:</p>
<p class="math"><em>v</em> ← <em>v</em> + <em>a</em> Δ<em>t</em>,   <em>x</em> ← <em>x</em> + <em>v</em> Δ<em>t</em></p>
<p>This is Euler's method from <a href="#c-math131-k6">MATH 131, Lesson 6</a>, applied to the pair of equations <em>dx</em>/<em>dt</em> = <em>v</em>, <em>dv</em>/<em>dt</em> = <em>a</em>. There are two ways to order the two updates, and the difference is only which velocity moves the position:</p>
<pre><code># explicit ("plain") Euler: both updates use the OLD values
x, v = x + v * dt, v + a * dt

# semi-implicit Euler: update v first, then move x with the NEW v
v = v + a * dt
x = x + v * dt</code></pre>
<p>In the explicit version, the tuple assignment computes both right-hand sides before changing anything, so <em>x</em> moves with the velocity from the start of the step. In the semi-implicit (or symplectic) version, <em>x</em> moves with the velocity from the end of the step. For a falling ball over a few seconds, both give nearly the same answer when Δ<em>t</em> is small. For things that swing or orbit, run for a long time, the semi-implicit version is far better: the explicit one slowly gains energy that doesn't exist. Lesson 4 shows this and explains why. <strong>In this course, always use the semi-implicit order</strong>, as in the code below and in practice 4: the velocity line comes first.</p>
<pre><code>g = 9.8
dt = 0.001                  # seconds
t, y, v = 0.0, 0.0, 20.0    # thrown upward at 20 m/s
max_y = 0.0
while True:
    v -= g * dt
    y += v * dt
    t += dt
    max_y = max(max_y, y)
    if y &lt;= 0:
        break
print(f"lands after {t:.2f} s, max height {max_y:.2f} m")   # 4.08 s, 20.40 m</code></pre>
<p>Run it with Δ<em>t</em> = 0.1 and 0.01 and watch the answers converge. That's the first rule of simulation: <strong>validate</strong> against a case you can solve exactly, and check that shrinking the step doesn't change the answer much. Once the simulation is trusted, you can change the physics, for example adding air resistance (Lesson 3), and get answers no formula provides.</p>

<h3>Reading motion graphs</h3>
<p>On a graph of <em>x</em> against <em>t</em>, the slope is velocity. On a graph of <em>v</em> against <em>t</em>, the slope is acceleration and the area under the curve is displacement. For the thrown ball, <em>x</em>(<em>t</em>) is a downward parabola, <em>v</em>(<em>t</em>) a straight line falling from +20 through 0 at the top to −20, and <em>a</em>(<em>t</em>) a constant −9.8. A common misconception is that the acceleration is zero at the top; it isn't, because the velocity is still changing there.</p>
`,
    terms: [
      ["Velocity", "Rate of change of position, dx/dt; has a direction (sign)."],
      ["Acceleration", "Rate of change of velocity, dv/dt."],
      ["Free fall", "Motion under gravity alone; acceleration g ≈ 9.8 m/s² downward, independent of mass."],
      ["Time step Δt", "The small time increment by which a simulation advances."],
      ["Semi-implicit Euler", "Update velocity first, then position using the new velocity; well suited to physics simulations."],
      ["Validation", "Checking a simulation against a case with a known answer."]
    ],
    quiz: [
      { q: "A car speeds up from 0 to 30 m/s in 6 s. Its average acceleration is:", choices: ["180 m/s²", "5 m/s²", "0.2 m/s²", "36 m/s²"], answer: 1, why: "Δv/Δt = 30/6." },
      { q: "At the top of a ball's upward flight, its acceleration is:", choices: ["0", "9.8 m/s² downward", "9.8 m/s² upward", "Undefined"], answer: 1, why: "Gravity acts the whole time; only the velocity is momentarily zero." },
      { q: "Dropped from rest, how far does a stone fall in 3 s (ignoring air)?", choices: ["29.4 m", "44.1 m", "88.2 m", "14.7 m"], answer: 1, why: "½gt² = 0.5 · 9.8 · 9." },
      { q: "On a velocity–time graph, the area under the curve gives:", choices: ["Acceleration", "Displacement", "Speed", "Force"], answer: 1, why: "Integrating velocity over time gives change in position." },
      { q: "How should you check a new simulation?", choices: ["Use the largest time step", "Compare with an exactly solvable case and confirm the result is stable as Δt shrinks", "Trust the computer", "Run it once"], answer: 1, why: "Validation and convergence checks." }
    ],
    practice: [
      { q: `<p>A train slows uniformly from 25 m/s to rest over 500 m. Find its acceleration and the time it takes.</p>`, a: `<p><em>v</em>² = <em>v</em>₀² + 2<em>a</em>Δ<em>x</em>: 0 = 625 + 1000<em>a</em>, so <em>a</em> = −0.625 m/s². Time: <em>t</em> = (0 − 25)/(−0.625) = 40 s.</p>` },
      { q: `<p>A stone is dropped into a well and the splash is heard 3.0 s later. Ignoring the time for sound to travel, how deep is the well? Is the true depth more or less?</p>`, a: `<p>½ · 9.8 · 3² = 44.1 m. Sound takes some of the 3 s (about 0.13 s at 340 m/s), so the stone fell for less time: the true depth is less, about 40 m.</p>` },
      { q: `<p>A ball is thrown upward from a 15 m tall building at 10 m/s. When does it hit the ground? (Solve the quadratic.)</p>`, a: `<p>Take up as positive and the ground as 0: 0 = 15 + 10<em>t</em> − 4.9<em>t</em>². <em>t</em> = (10 + √(100 + 294))/9.8 = (10 + 19.85)/9.8 ≈ 3.05 s (the negative root is meaningless here).</p>` },
      { q: `<p>Modify the simulation in the notes to record (<em>t</em>, <em>y</em>, <em>v</em>) every 0.1 s, and check that the recorded <em>v</em> values change by 0.98 m/s each time.</p>`, a: `<pre><code>g, dt = 9.8, 0.001
t, y, v = 0.0, 0.0, 20.0
log, next_log = [], 0.0
while y &gt;= 0:
    if t &gt;= next_log - 1e-9:
        log.append((round(t, 1), y, v))
        next_log += 0.1
    v -= g * dt
    y += v * dt
    t += dt
for (t1, _, v1), (t2, _, v2) in zip(log, log[1:]):
    assert abs((v1 - v2) - 0.98) &lt; 1e-6</code></pre><p>The loop body is semi-implicit Euler: <code>v</code> is updated first, and the new <code>v</code> moves <code>y</code>. (Here the velocity check would pass with either order, because <em>v</em> changes by exactly <em>g</em> Δ<em>t</em> each step whatever <em>y</em> does.)</p>` },
      { q: `<p>Your simulation of the thrown ball gives a maximum height of 20.4 m with Δ<em>t</em> = 0.001 but 19.4 m with Δ<em>t</em> = 0.1. Which do you trust, and how would you decide in a problem with no exact answer?</p>`, a: `<p>Trust the smaller step, which agrees with <em>v</em>₀²/(2<em>g</em>) = 20.4 m. In general, halve Δ<em>t</em> repeatedly until the answer stops changing to the precision you need; the remaining change estimates the error.</p>` }
    ],
    sources: ["openstaxphys", "feynman"]
  },
  {
    id: "p2",
    title: "Vectors and motion in two dimensions",
    minutes: 90,
    summary: "Vectors and components, velocity and acceleration as vectors, projectile motion, and simulating in two dimensions with vector arithmetic.",
    notes: `
<p>Real motion happens in two or three dimensions. The key insight that makes it manageable: <strong>motion in perpendicular directions is independent</strong>. A ball thrown horizontally from a table and a ball dropped from the same height hit the floor at the same moment. So you can treat each direction as a one-dimensional problem, using vectors to keep track.</p>

<h3>Vectors</h3>
<p>A <strong>vector</strong> has a magnitude and a direction: displacement, velocity, acceleration and force are vectors; mass, time and temperature are <strong>scalars</strong>. In two dimensions, write a vector by its components, <strong>v</strong> = (<em>v<sub>x</sub></em>, <em>v<sub>y</sub></em>). Converting between components and magnitude-and-angle:</p>
<p class="math"><em>v<sub>x</sub></em> = <em>v</em> cos θ,  <em>v<sub>y</sub></em> = <em>v</em> sin θ;   <em>v</em> = √(<em>v<sub>x</sub></em>² + <em>v<sub>y</sub></em>²),  θ = atan2(<em>v<sub>y</sub></em>, <em>v<sub>x</sub></em>)</p>
<p>Vectors add component by component, and multiplying by a scalar scales each component. Geometrically, addition is <strong>tip to tail</strong>: draw <strong>a</strong>, then draw <strong>b</strong> starting from the tip of <strong>a</strong>; the sum <strong>a</strong> + <strong>b</strong> is the arrow from the start of <strong>a</strong> to the tip of <strong>b</strong>. Think of two walks taken one after the other.</p>
<figure class="fig">
<svg viewBox="0 0 300 200" role="img" aria-label="Tip-to-tail vector addition. Arrow a = (3, 1) starts at the origin; arrow b = (1, 2) starts at the tip of a; the sum a + b = (4, 3) goes from the origin to the tip of b. Dashed copies of b from the origin and a from b's tip complete a parallelogram.">
  <defs><marker id="p2arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="hl"/></marker></defs>
  <line x1="40" y1="170" x2="80" y2="90" class="ln dash"/><line x1="80" y1="90" x2="200" y2="50" class="ln dash"/>
  <line x1="40" y1="170" x2="160" y2="130" class="hl" marker-end="url(#p2arr)"/>
  <line x1="160" y1="130" x2="200" y2="50" class="hl" marker-end="url(#p2arr)"/>
  <line x1="40" y1="170" x2="200" y2="50" class="cv" marker-end="url(#p2arr)"/>
  <circle cx="40" cy="170" r="3" class="dot"/>
  <text x="96" y="168" class="code">a = (3, 1)</text>
  <text x="190" y="100" class="code">b = (1, 2)</text>
  <text x="40" y="40" class="em">a + b = (4, 3)</text><line x1="100" y1="46" x2="140" y2="94" class="ax dash"/>
</svg>
<figcaption>Tip to tail: a, then b from a's tip, gives a + b = (3 + 1, 1 + 2) = (4, 3). Adding in the other order (dashed) reaches the same point, so a + b = b + a.</figcaption>
</figure>
<p>This is exactly the <code>Vector2</code> class you built in <a href="#c-cs102-c2">CS 102, Lesson 2</a>; physics engines in games are built on such classes. (Use <code>math.atan2(vy, vx)</code> rather than <code>atan(vy / vx)</code>: it handles all four quadrants and <em>v<sub>x</sub></em> = 0.)</p>

<h3>Motion in two dimensions</h3>
<p>Position <strong>r</strong>(<em>t</em>) = (<em>x</em>(<em>t</em>), <em>y</em>(<em>t</em>)), velocity <strong>v</strong> = <em>d</em><strong>r</strong>/<em>dt</em>, and acceleration <strong>a</strong> = <em>d</em><strong>v</strong>/<em>dt</em>, each differentiated component by component. Velocity is always tangent to the path.</p>

<h3>Projectile motion</h3>
<p>A projectile (ignoring air) has <strong>a</strong> = (0, −<em>g</em>): constant velocity horizontally, free fall vertically. Launched at speed <em>v</em>₀ and angle θ from the ground:</p>
<p class="math"><em>x</em>(<em>t</em>) = <em>v</em>₀ cos θ · <em>t</em>,   <em>y</em>(<em>t</em>) = <em>v</em>₀ sin θ · <em>t</em> − ½<em>gt</em>²</p>
<p>Eliminating <em>t</em> shows the path is a parabola. Useful results, for landing at launch height:</p>
<ul>
  <li><strong>Time of flight</strong>: <em>y</em> = 0 again at <em>T</em> = 2<em>v</em>₀ sin θ/<em>g</em>.</li>
  <li><strong>Range</strong>: <em>R</em> = <em>v</em>₀ cos θ · <em>T</em> = <em>v</em>₀² sin 2θ/<em>g</em>, largest at θ = 45°.</li>
  <li><strong>Maximum height</strong>: <em>H</em> = (<em>v</em>₀ sin θ)²/(2<em>g</em>).</li>
</ul>
<p>At 20 m/s and 45°: <em>R</em> = 400/9.8 ≈ 40.8 m and <em>H</em> ≈ 10.2 m. Complementary angles (30° and 60°) give the same range, since sin 2θ is the same.</p>
<figure class="fig">
<svg viewBox="0 0 310 210" role="img" aria-label="Two trajectories launched at 20 m/s and 45 degrees. Without air resistance the path is a symmetric parabola landing at about 41 m. With air resistance the path is lower, lands at about 22 m, and comes down more steeply than it went up.">
  <line x1="25" y1="190" x2="300" y2="190" class="ax"/><line x1="40" y1="200" x2="40" y2="30" class="ax"/>
  <path d="M40.0,190.0 L52.2,166.7 L64.5,145.9 L76.7,127.6 L89.0,111.6 L101.2,98.2 L113.5,87.1 L125.7,78.6 L138.0,72.4 L150.2,68.8 L162.4,67.6 L174.7,68.8 L186.9,72.4 L199.2,78.6 L211.4,87.1 L223.7,98.2 L235.9,111.6 L248.2,127.6 L260.4,145.9 L272.7,166.7 L284.9,190.0" class="cv"/>
  <path d="M40.0,190.0 L49.8,171.2 L59.1,155.2 L67.8,141.7 L76.0,130.6 L83.9,121.6 L91.4,114.7 L98.7,109.7 L105.6,106.6 L112.4,105.2 L118.9,105.6 L125.2,107.6 L131.3,111.2 L137.3,116.3 L143.0,123.0 L148.5,131.1 L153.9,140.6 L159.0,151.4 L164.0,163.4 L168.8,176.7 L173.1,190.0" class="hl"/>
  <text x="200" y="60">no air: 40.8 m</text><text x="178" y="174" class="m">with drag: 22 m</text>
  <text x="34" y="204" class="m">0</text><text x="276" y="204" class="m">40 m</text>
</svg>
<figcaption>A projectile at 20 m/s and 45°, without air resistance (a parabola) and with quadratic drag (simulated). Drag shortens the range and makes the descent steeper than the climb.</figcaption>
</figure>

<h3>Simulating in two dimensions</h3>
<p>The simulation is the same as Lesson 1, with vectors. Using separate variables for components:</p>
<pre><code>import math

def simulate_projectile(speed, angle_deg, dt=0.001, g=9.8):
    th = math.radians(angle_deg)
    x, y = 0.0, 0.0
    vx, vy = speed * math.cos(th), speed * math.sin(th)
    while True:
        vy -= g * dt          # acceleration only in y
        x += vx * dt
        y += vy * dt
        if y &lt; 0:
            return x          # range

print(simulate_projectile(20, 45), 20**2 / 9.8)   # both about 40.8</code></pre>
<p>The figure's second curve came from the same loop with a drag acceleration added (next lesson). Two lessons from it: without air, the formula and simulation agree, which validates the code; with air, only the simulation gives an answer.</p>

<h3>Relative motion</h3>
<p>Velocities depend on the observer. A passenger walking forward at 1 m/s on a train moving at 30 m/s moves at 31 m/s relative to the ground: velocities add as vectors. A plane flying north at 200 m/s in a 30 m/s wind from the west moves at √(200² + 30²) ≈ 202 m/s over the ground, heading about 8.5° east of north. Navigation systems, from airliners to GPS, constantly make these corrections.</p>
`,
    terms: [
      ["Vector", "A quantity with magnitude and direction, written in components (vx, vy)."],
      ["Scalar", "A quantity with magnitude only, such as mass or time."],
      ["Components", "The projections of a vector onto the axes: v cos θ and v sin θ."],
      ["Projectile", "An object moving under gravity alone after launch; its path is a parabola."],
      ["Range", "Horizontal distance traveled by a projectile; v₀² sin 2θ/g on level ground."]
    ],
    quiz: [
      { q: "A ball rolls off a table at 3 m/s while another is dropped from the same height at the same moment. Which lands first?", choices: ["The rolling ball", "The dropped ball", "They land together", "Depends on mass"], answer: 2, why: "Vertical motion is independent of horizontal motion." },
      { q: "The components of a 10 m/s velocity at 30° above horizontal are:", choices: ["(5, 8.66)", "(8.66, 5)", "(10, 30)", "(7.07, 7.07)"], answer: 1, why: "(10 cos 30°, 10 sin 30°)." },
      { q: "Ignoring air, which launch angle gives the same range as 20°?", choices: ["40°", "70°", "160°", "45°"], answer: 1, why: "Complementary angles have equal sin 2θ." },
      { q: "At the top of a projectile's path, its velocity is:", choices: ["Zero", "Horizontal, equal to v₀ cos θ", "Vertical", "Equal to v₀"], answer: 1, why: "The vertical component is zero; the horizontal never changes." },
      { q: "Why use <code>atan2(vy, vx)</code> instead of <code>atan(vy / vx)</code>?", choices: ["It's faster", "It gives the correct quadrant and handles vx = 0", "atan doesn't exist", "It returns degrees"], answer: 1, why: "atan(vy/vx) can't tell (1, 1) from (−1, −1)." }
    ],
    practice: [
      { q: `<p>A soccer ball is kicked at 25 m/s at 35°. Find its time of flight, range and maximum height (level ground, no air).</p>`, a: `<p><em>v<sub>x</sub></em> = 25 cos 35° ≈ 20.5 m/s, <em>v<sub>y</sub></em> = 25 sin 35° ≈ 14.3 m/s. <em>T</em> = 2(14.3)/9.8 ≈ 2.93 s. <em>R</em> = 20.5 × 2.93 ≈ 60 m. <em>H</em> = 14.3²/19.6 ≈ 10.5 m.</p>` },
      { q: `<p>A package is dropped from a plane flying horizontally at 70 m/s at a height of 500 m. How far ahead of the target must it be released?</p>`, a: `<p>Fall time: √(2 · 500/9.8) ≈ 10.1 s. Horizontal distance: 70 × 10.1 ≈ 707 m. The package keeps the plane's horizontal velocity, so it lands directly below the plane (without air resistance).</p>` },
      { q: `<p>Show that the maximum range is at 45° by differentiating <em>R</em>(θ) = <em>v</em>₀² sin 2θ/<em>g</em>.</p>`, a: `<p><em>R</em>′(θ) = 2<em>v</em>₀² cos 2θ/<em>g</em> = 0 when 2θ = 90°, so θ = 45°. <em>R</em>″ = −4<em>v</em>₀² sin 2θ/<em>g</em> &lt; 0 there, so it's a maximum.</p>` },
      { q: `<p>Use <code>simulate_projectile</code> to find the angle that maximizes range when launching from a 10 m cliff at 20 m/s. (Change the stopping condition to <em>y</em> &lt; −10.) Is it more or less than 45°? Why?</p>`, a: `<pre><code>def range_from_cliff(angle):
    th = math.radians(angle)
    x, y, vx, vy, dt = 0, 0, 20 * math.cos(th), 20 * math.sin(th), 0.001
    while y &gt;= -10:
        vy -= 9.8 * dt; x += vx * dt; y += vy * dt
    return x

best = max(range(0, 91), key=range_from_cliff)
print(best)   # about 39°</code></pre><p>Less than 45°: the projectile gets extra flight time from the drop, so it pays to put more of the speed into horizontal motion.</p>` },
      { q: `<p>A swimmer can swim at 1.5 m/s in still water and wants to cross a 60 m wide river flowing at 0.9 m/s. Swimming straight across (relative to the water), how long does it take and how far downstream do they land?</p>`, a: `<p>Crossing time depends only on the across-river component: 60/1.5 = 40 s. Downstream drift: 0.9 × 40 = 36 m.</p>` }
    ],
    sources: ["openstaxphys"]
  },
  {
    id: "p3",
    title: "Newton's laws and forces",
    minutes: 90,
    summary: "Newton's three laws, mass and weight, free-body diagrams, normal force, friction, tension, air resistance and terminal velocity, and force-based simulation.",
    notes: `
<p>Lessons 1 and 2 described motion. Now we explain it. Isaac Newton's three laws (1687) connect motion to its causes, forces, and they let us predict motion from first principles. They remain accurate for everything from baseballs to spacecraft, failing only at speeds near light (relativity) and at atomic scales (quantum mechanics).</p>

<h3>The three laws</h3>
<ol>
  <li><strong>Inertia.</strong> An object stays at rest or moves at constant velocity unless a net force acts on it. Motion doesn't need a cause; <em>changes</em> in motion do. This contradicted two thousand years of Aristotelian physics, in which moving objects naturally came to rest.</li>
  <li><strong><strong>F</strong><sub>net</sub> = <em>m</em><strong>a</strong>.</strong> The net (total) force on an object equals its mass times its acceleration. Force is measured in newtons: 1 N = 1 kg·m/s².</li>
  <li><strong>Action and reaction.</strong> If A pushes on B, B pushes on A with an equal and opposite force. The two forces act on <em>different</em> objects, so they don't cancel.</li>
</ol>
<p>Mass measures how hard an object is to accelerate (kilograms). <strong>Weight</strong> is the gravitational force on it: <em>W</em> = <em>mg</em>, so a 70 kg person weighs about 686 N on Earth and about 113 N on the Moon, with the same mass.</p>

<h3>Free-body diagrams</h3>
<p>To apply Newton's second law, isolate one object and draw every force acting <em>on it</em>, as arrows from its center. Then choose axes and write <strong>F</strong><sub>net</sub> = <em>m</em><strong>a</strong> for each component. The common forces:</p>
<ul>
  <li><strong>Weight</strong> <em>mg</em>, straight down.</li>
  <li><strong>Normal force</strong> <em>N</em>: a surface pushes perpendicular to itself, as hard as needed to prevent the object passing through it.</li>
  <li><strong>Friction</strong>, parallel to the surface, opposing sliding. Kinetic friction (sliding) is <em>f<sub>k</sub></em> = μ<sub><em>k</em></sub><em>N</em>; static friction (not sliding) adjusts up to a maximum μ<sub><em>s</em></sub><em>N</em>.</li>
  <li><strong>Tension</strong> <em>T</em>, along a rope, pulling.</li>
  <li><strong>Drag</strong>, opposing motion through air or water (below).</li>
</ul>
<figure class="fig">
<svg viewBox="0 0 300 200" role="img" aria-label="Free-body diagram of a box being pulled to the right along a floor: weight mg points down, normal force N points up, applied force F points right, and friction f points left.">
  <defs><marker id="p3arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="hl"/></marker></defs>
  <line x1="20" y1="140" x2="280" y2="140" class="ax"/>
  <rect x="115" y="80" width="70" height="60" class="box soft"/>
  <line x1="150" y1="110" x2="150" y2="185" class="hl" marker-end="url(#p3arr)"/>
  <line x1="150" y1="110" x2="150" y2="35" class="hl" marker-end="url(#p3arr)"/>
  <line x1="150" y1="110" x2="250" y2="110" class="hl" marker-end="url(#p3arr)"/>
  <line x1="150" y1="110" x2="80" y2="110" class="hl" marker-end="url(#p3arr)"/>
  <text x="158" y="190" class="m">weight mg</text><text x="158" y="40" class="m">normal N</text>
  <text x="222" y="102" class="m">pull F</text><text x="60" y="102" class="m">friction f</text>
</svg>
<figcaption>Forces on a box pulled along a floor. Vertically, N = mg (no vertical acceleration). Horizontally, F − f = ma.</figcaption>
</figure>
<p><strong>Example.</strong> A 20 kg box is pulled with 100 N across a floor with μ<sub><em>k</em></sub> = 0.3. Vertically, <em>N</em> = <em>mg</em> = 196 N. Friction is 0.3 × 196 = 58.8 N. Horizontally, 100 − 58.8 = 20<em>a</em>, so <em>a</em> ≈ 2.06 m/s².</p>
<p><strong>Inclines.</strong> On a ramp at angle θ, tilt the axes along and perpendicular to the surface. Weight splits into <em>mg</em> sin θ down the slope and <em>mg</em> cos θ into it, so <em>N</em> = <em>mg</em> cos θ. Without friction, <em>a</em> = <em>g</em> sin θ down the slope.</p>

<h3>Air resistance and terminal velocity</h3>
<p>For most everyday objects moving through air, drag is roughly proportional to the square of speed: <em>F</em><sub>drag</sub> = <em>kv</em>², where <em>k</em> = ½ρ<em>C<sub>d</sub>A</em> depends on air density ρ, the object's shape (drag coefficient <em>C<sub>d</sub></em>) and its cross-sectional area <em>A</em>. A falling object speeds up until drag balances weight; then the net force is zero and it falls at constant <strong>terminal velocity</strong>:</p>
<p class="math"><em>kv<sub>t</sub></em>² = <em>mg</em>  ⟹  <em>v<sub>t</sub></em> = √(<em>mg</em>/<em>k</em>)</p>
<p>A skydiver (<em>m</em> = 80 kg, <em>k</em> ≈ 0.25 kg/m) reaches about √(80 · 9.8/0.25) = 56 m/s, roughly 200 km/h. Spreading out increases <em>k</em> and slows the fall; a parachute increases it about a hundredfold.</p>
<p><strong>Why <em>v</em>², and when is drag proportional to <em>v</em> instead?</strong> A moving object has to shove air out of its way. In one second it sweeps through a column of air of volume <em>Av</em>, with mass ρ<em>Av</em>, and pushes that air to a speed comparable to its own, <em>v</em>. The momentum given to the air each second, which by Newton's second law and third law is the force on the object, is about (ρ<em>Av</em>) × <em>v</em> = ρ<em>Av</em>². Double the speed and you hit twice as much air each second, twice as hard: four times the force. That reasoning holds for balls, cars, people and planes. For very small or very slow objects in a "thick" fluid, such as dust and fog droplets drifting in air, bacteria swimming, or a marble sinking in honey, the fluid's stickiness (its <em>viscosity</em>) dominates instead, and drag is proportional to <em>v</em>: <em>F</em> = <em>bv</em>. A number called the Reynolds number, which you'd meet in a fluids course, decides which regime applies.</p>
<p><strong>Units and measuring <em>k</em>.</strong> From <em>F</em> = <em>kv</em>², <em>k</em> = <em>F</em>/<em>v</em>², with units N/(m/s)² = (kg·m/s²) · (s²/m²) = kg/m. The easiest measurement uses terminal velocity itself: drop the object from high enough that it stops speeding up, measure <em>v<sub>t</sub></em> (from a video, say), and compute <em>k</em> = <em>mg</em>/<em>v<sub>t</sub></em>². Alternatively, estimate it from <em>k</em> = ½ρ<em>C<sub>d</sub>A</em> with ρ ≈ 1.2 kg/m³ for air at sea level and a drag coefficient from a table (about 0.5 for a ball, about 1 for a person falling belly-down). A belly-down skydiver with <em>A</em> ≈ 0.4 m² gives ½ · 1.2 · 1 · 0.4 ≈ 0.24 kg/m, close to the 0.25 used above.</p>
<p><strong>The exact solution in one dimension.</strong> With drag, the falling speed obeys <em>m dv</em>/<em>dt</em> = <em>mg</em> − <em>kv</em>². Dividing by <em>m</em> and using <em>k</em>/<em>m</em> = <em>g</em>/<em>v<sub>t</sub></em>² (from the terminal-velocity formula):</p>
<p class="math"><em>dv</em>/<em>dt</em> = <em>g</em>(1 − <em>v</em>²/<em>v<sub>t</sub></em>²)</p>
<p>This separates (<a href="#c-math131-k6">MATH 131, Lesson 6</a>) and partial fractions do the integral, just as for the logistic equation. Starting from rest, the result is</p>
<p class="math"><em>v</em>(<em>t</em>) = <em>v<sub>t</sub></em> tanh(<em>gt</em>/<em>v<sub>t</sub></em>)</p>
<p>where tanh is the <strong>hyperbolic tangent</strong>, tanh <em>z</em> = (e<sup><em>z</em></sup> − e<sup>−<em>z</em></sup>)/(e<sup><em>z</em></sup> + e<sup>−<em>z</em></sup>), a function that rises smoothly from 0 toward 1, just as the speed rises from 0 toward <em>v<sub>t</sub></em>. You can check the formula by differentiating: (tanh <em>z</em>)′ = 1 − tanh² <em>z</em>, so <em>dv</em>/<em>dt</em> = <em>v<sub>t</sub></em> · (<em>g</em>/<em>v<sub>t</sub></em>)(1 − <em>v</em>²/<em>v<sub>t</sub></em>²), which is the equation. To find when the speed reaches a fraction <em>f</em> of <em>v<sub>t</sub></em>, solve tanh(<em>gt</em>/<em>v<sub>t</sub></em>) = <em>f</em> using the inverse function, atanh (<code>math.atanh</code> in Python; atanh <em>f</em> = ½ ln((1 + <em>f</em>)/(1 − <em>f</em>))):</p>
<p class="math"><em>t</em> = (<em>v<sub>t</sub></em>/<em>g</em>) atanh(<em>f</em>)</p>
<p>For the skydiver and <em>f</em> = 0.95: <em>t</em> = (56/9.8) × atanh(0.95) ≈ 5.71 × 1.832 ≈ 10.47 s. The auto-graded problem for this lesson checks your simulation against this formula.</p>
<p>In two dimensions (a thrown ball with drag), there's no formula. Simulation handles it with one extra line, since drag points opposite the velocity:</p>
<pre><code>import math

def step(x, y, vx, vy, m, k, dt, g=9.8):
    speed = math.hypot(vx, vy)
    ax = -(k / m) * speed * vx            # drag opposes velocity
    ay = -g - (k / m) * speed * vy
    vx, vy = vx + ax * dt, vy + ay * dt
    return x + vx * dt, y + vy * dt, vx, vy</code></pre>
<p>This is the general pattern of every physics engine: <strong>add up the forces, divide by mass to get acceleration, step velocity, step position</strong>. Changing the physics means changing only the force calculation.</p>

<h3>Newton's third law in practice</h3>
<p>When you walk, your foot pushes back on the ground, and the ground pushes you forward. A rocket pushes exhaust gas backward, and the gas pushes the rocket forward; it doesn't need air to push against, which is why rockets work in space. A common error is to think the third-law pair cancels. It doesn't: the forces act on different objects, and each object accelerates according to the net force on <em>it</em>.</p>
`,
    terms: [
      ["Net force", "The vector sum of all forces on an object."],
      ["Newton's second law", "F_net = ma."],
      ["Weight", "The gravitational force on an object, W = mg."],
      ["Normal force", "The perpendicular push of a surface on an object resting on it."],
      ["Friction", "A force parallel to a surface opposing sliding; kinetic friction is μₖN."],
      ["Free-body diagram", "A sketch of one object showing every force acting on it."],
      ["Terminal velocity", "The constant speed at which drag balances weight."]
    ],
    quiz: [
      { q: "A hockey puck slides on frictionless ice at constant velocity. The net force on it is:", choices: ["In the direction of motion", "Zero", "Opposite to the motion", "Equal to its weight"], answer: 1, why: "Constant velocity means zero acceleration, so zero net force (first law)." },
      { q: "What net force accelerates a 1200 kg car at 3 m/s²?", choices: ["400 N", "3600 N", "1203 N", "11,760 N"], answer: 1, why: "F = ma = 1200 × 3." },
      { q: "A book rests on a table. The third-law partner of the book's weight is:", choices: ["The normal force from the table", "The book's gravitational pull on Earth", "Friction", "The table's weight"], answer: 1, why: "Earth pulls the book; the book pulls Earth. The normal force is a different interaction." },
      { q: "If a skydiver's drag constant <em>k</em> is made 4 times larger, terminal velocity:", choices: ["Is 4 times smaller", "Is halved", "Doubles", "Doesn't change"], answer: 1, why: "v_t = √(mg/k), so it scales as 1/√k." },
      { q: "In a physics engine, what changes when you add a new kind of force?", choices: ["The position update", "Only the force (acceleration) calculation", "The time step", "Everything"], answer: 1, why: "Sum forces → acceleration → velocity → position; only the first step changes." }
    ],
    practice: [
      { q: `<p>An elevator of mass 800 kg accelerates upward at 1.5 m/s². What is the cable tension? What would a 60 kg passenger's bathroom scale read (in newtons)?</p>`, a: `<p><em>T</em> − <em>mg</em> = <em>ma</em>: <em>T</em> = 800(9.8 + 1.5) = 9040 N. The scale reads the normal force on the passenger: <em>N</em> = 60(9.8 + 1.5) = 678 N, more than their weight of 588 N.</p>` },
      { q: `<p>A sled slides down a 20° slope with μ<sub><em>k</em></sub> = 0.1. Find its acceleration.</p>`, a: `<p>Along the slope: <em>mg</em> sin θ − μ<em>mg</em> cos θ = <em>ma</em>, so <em>a</em> = 9.8(sin 20° − 0.1 cos 20°) = 9.8(0.342 − 0.094) ≈ 2.43 m/s². The mass cancels.</p>` },
      { q: `<p>What is the smallest coefficient of static friction that keeps a box at rest on a 30° ramp?</p>`, a: `<p>Need μ<sub><em>s</em></sub><em>mg</em> cos θ ≥ <em>mg</em> sin θ, so μ<sub><em>s</em></sub> ≥ tan 30° ≈ 0.577.</p>` },
      { q: `<p>Two blocks, 3 kg and 5 kg, sit side by side on a frictionless floor. You push the 3 kg block with 16 N, and it pushes the 5 kg block. Find the acceleration and the force between the blocks.</p>`, a: `<p>Together: 16 = 8<em>a</em>, so <em>a</em> = 2 m/s². The 5 kg block is pushed only by the 3 kg block: <em>F</em> = 5 × 2 = 10 N. By the third law, the 5 kg block pushes back on the 3 kg block with 10 N, so the 3 kg block's net force is 16 − 10 = 6 N = 3 × 2. ✓</p>` },
      { q: `<p>Simulate the 80 kg skydiver (<em>k</em> = 0.25 kg/m) falling from rest, and find how long it takes to reach 95% of terminal velocity.</p>`, a: `<pre><code>import math
m, k, g, dt = 80, 0.25, 9.8, 0.001
vt = math.sqrt(m * g / k)
t, v = 0.0, 0.0
while v &lt; 0.95 * vt:
    v += (g - (k / m) * v * v) * dt
    t += dt
print(round(vt, 1), round(t, 1))   # 56.0 m/s after about 10.5 s</code></pre>` }
    ],
    sources: ["openstaxphys", "newton1687"]
  },
  {
    id: "p4",
    title: "Energy and momentum",
    minutes: 90,
    summary: "Work and kinetic energy, potential energy, conservation of energy, power, momentum and impulse, collisions, and using conservation laws to check simulations.",
    notes: `
<p>Newton's laws can solve any mechanics problem in principle, but following forces moment by moment is often hard. Conservation laws offer a shortcut: some quantities stay constant no matter how complicated the motion. They also give programmers a powerful check: a simulation that slowly creates energy from nothing is wrong, however good its pictures look.</p>

<h3>Work and kinetic energy</h3>
<p>A force <em>F</em> acting along a displacement <em>d</em> does <strong>work</strong> <em>W</em> = <em>Fd</em> cos θ, where θ is the angle between them. Work is measured in joules: 1 J = 1 N·m. A force perpendicular to the motion, like the normal force on a sliding box, does no work.</p>
<p>Yes, the cos θ is the dot product from <a href="#c-math131-k7">MATH 131, Lesson 7</a>: <em>W</em> = <strong>F</strong> · <strong>d</strong> = |<strong>F</strong>||<strong>d</strong>| cos θ. Only the part of the force along the motion does work. In components it's often easier: a force <strong>F</strong> = (3, 4) N acting while the object moves <strong>d</strong> = (2, 0) m does <em>W</em> = 3 · 2 + 4 · 0 = 6 J; the upward 4 N does nothing to a horizontal move. When the force varies along the path, add up the small pieces: <em>W</em> = ∫ <strong>F</strong> · <em>d</em><strong>r</strong>, which in one dimension is the integral ∫ <em>F</em>(<em>x</em>) <em>dx</em> of <a href="#c-math131-k2">MATH 131, Lesson 2</a>.</p>
<p>The <strong>kinetic energy</strong> of a moving object is <em>K</em> = ½<em>mv</em>². The <strong>work–energy theorem</strong> says the net work on an object equals its change in kinetic energy: <em>W</em><sub>net</sub> = Δ<em>K</em>. (Proof sketch: <em>W</em> = ∫ <em>ma dx</em> = ∫ <em>m</em>(<em>dv</em>/<em>dt</em>) <em>v dt</em> = ∫ <em>mv dv</em> = Δ(½<em>mv</em>²).) Because <em>K</em> grows with <em>v</em>², a car at 100 km/h has four times the kinetic energy of one at 50 km/h, and needs about four times the distance to brake.</p>

<h3>Potential energy and conservation</h3>
<p>Some forces, called <strong>conservative</strong>, store the work they absorb and give it back: gravity and springs, but not friction. For these we define a <strong>potential energy</strong> <em>U</em>:</p>
<ul>
  <li>Gravity near Earth: <em>U</em> = <em>mgh</em>, where <em>h</em> is height above any chosen reference level.</li>
  <li>A spring stretched or compressed by <em>x</em>: <em>U</em> = ½<em>kx</em>² (from integrating Hooke's law, <em>F</em> = −<em>kx</em>).</li>
</ul>
<p>When only conservative forces do work, <strong>mechanical energy is conserved</strong>:</p>
<p class="math"><em>K</em> + <em>U</em> = constant,  i.e.  ½<em>mv</em>₁² + <em>U</em>₁ = ½<em>mv</em>₂² + <em>U</em>₂</p>
<p><strong>Example.</strong> A roller coaster starts at rest 40 m above the bottom of a dip. Ignoring friction, its speed at the bottom is √(2<em>gh</em>) = √(2 · 9.8 · 40) ≈ 28 m/s, regardless of the track's shape. Doing this with forces would require knowing the shape at every point. Friction converts mechanical energy to heat, so total energy is still conserved, but mechanical energy decreases.</p>
<p><strong>Power</strong> is the rate of doing work, <em>P</em> = <em>dW</em>/<em>dt</em>, in watts (J/s). Lifting a 70 kg person up a 3 m flight of stairs in 4 s takes 70 · 9.8 · 3/4 ≈ 515 W. A data center's power use, in megawatts, is an energy-per-second budget of the same kind.</p>

<h3>Momentum and impulse</h3>
<p>The <strong>momentum</strong> of an object is <strong>p</strong> = <em>m</em><strong>v</strong>, a vector. Newton actually wrote his second law as <strong>F</strong> = <em>d</em><strong>p</strong>/<em>dt</em>. Integrating over a collision, the <strong>impulse</strong> ∫ <strong>F</strong> <em>dt</em> equals the change in momentum. Spreading the same change in momentum over a longer time means a smaller force: that's what airbags, crumple zones and bending your knees when you land are for.</p>
<p><strong>Conservation of momentum.</strong> When objects interact only with each other, Newton's third law means their internal forces are equal and opposite, so the impulses cancel: the <em>total</em> momentum stays constant. This holds even in violent, complicated collisions where forces are unknown.</p>

<h3>Collisions</h3>
<ul>
  <li><strong>Perfectly inelastic</strong>: objects stick together. Momentum is conserved; kinetic energy is not (it becomes heat, sound and deformation). A 1000 kg car at 20 m/s hits a stationary 1500 kg car and they lock together: (1000)(20) = 2500<em>v</em>, so <em>v</em> = 8 m/s. Kinetic energy drops from 200 kJ to 80 kJ.</li>
  <li><strong>Elastic</strong>: kinetic energy is also conserved (nearly true for billiard balls and exactly for atoms). In one dimension, solving both conservation equations gives</li>
</ul>
<p class="math"><em>v</em>₁′ = ((<em>m</em>₁ − <em>m</em>₂)<em>v</em>₁ + 2<em>m</em>₂<em>v</em>₂)/(<em>m</em>₁ + <em>m</em>₂),   <em>v</em>₂′ = ((<em>m</em>₂ − <em>m</em>₁)<em>v</em>₂ + 2<em>m</em>₁<em>v</em>₁)/(<em>m</em>₁ + <em>m</em>₂)</p>
<p>Where do these come from? Write the two conservation laws, with primes for "after", and move each object's terms to its own side:</p>
<p class="math">momentum: <em>m</em>₁(<em>v</em>₁ − <em>v</em>₁′) = <em>m</em>₂(<em>v</em>₂′ − <em>v</em>₂)     energy (times 2): <em>m</em>₁(<em>v</em>₁² − <em>v</em>₁′²) = <em>m</em>₂(<em>v</em>₂′² − <em>v</em>₂²)</p>
<p>Factor the energy equation as a difference of squares: <em>m</em>₁(<em>v</em>₁ − <em>v</em>₁′)(<em>v</em>₁ + <em>v</em>₁′) = <em>m</em>₂(<em>v</em>₂′ − <em>v</em>₂)(<em>v</em>₂′ + <em>v</em>₂). Divide it by the momentum equation (assuming the collision changed something, so neither side is zero). Everything cancels except</p>
<p class="math"><em>v</em>₁ + <em>v</em>₁′ = <em>v</em>₂ + <em>v</em>₂′,  i.e.  <em>v</em>₂′ − <em>v</em>₁′ = −(<em>v</em>₂ − <em>v</em>₁)</p>
<p>In words: in an elastic collision the objects separate as fast as they approached. Now there are two <em>linear</em> equations. From the last one, <em>v</em>₂′ = <em>v</em>₁ + <em>v</em>₁′ − <em>v</em>₂. Substitute into the momentum equation: <em>m</em>₁<em>v</em>₁ − <em>m</em>₁<em>v</em>₁′ = <em>m</em>₂(<em>v</em>₁ + <em>v</em>₁′ − 2<em>v</em>₂). Collect the <em>v</em>₁′ terms: (<em>m</em>₁ + <em>m</em>₂)<em>v</em>₁′ = (<em>m</em>₁ − <em>m</em>₂)<em>v</em>₁ + 2<em>m</em>₂<em>v</em>₂, which is the first formula. The second follows the same way, or by swapping the labels 1 and 2.</p>
<p>With equal masses, the objects simply swap velocities, which is what you see when a cue ball stops dead after a head-on hit. A ball bouncing off a much heavier wall reverses its velocity.</p>

<h3>Energy as a simulation check</h3>
<p>Simulate a ball on a spring with the plain (explicit) Euler method, where position is updated with the <em>old</em> velocity, and plot the total energy: it grows steadily, and the oscillation spirals outward. Semi-implicit Euler, which you've used since Lesson 1, keeps the energy oscillating within a small band forever. Methods with this property are called <strong>symplectic</strong>, and they're the standard choice for long simulations of orbits, molecules and game physics.</p>
<pre><code>def energy_after(steps, dt, semi_implicit):
    k = m = 1.0
    x, v = 1.0, 0.0
    for _ in range(steps):
        a = -k * x / m
        if semi_implicit:
            v += a * dt; x += v * dt
        else:
            x, v = x + v * dt, v + a * dt
    return 0.5 * m * v * v + 0.5 * k * x * x

print(energy_after(10_000, 0.01, False))   # about 1.36: energy has grown from 0.5
print(energy_after(10_000, 0.01, True))    # about 0.5: conserved</code></pre>
<p><strong>Why does the order of two lines matter so much?</strong> Picture the state as a point (<em>x</em>, <em>v</em>) on a graph. For this spring (<em>k</em> = <em>m</em> = 1) the energy is ½(<em>x</em>² + <em>v</em>²), so states with the same energy lie on a circle around the origin, and the true motion goes round and round one circle.</p>
<ul>
  <li><strong>Explicit Euler</strong> uses only the old values, so each step moves the point straight along the tangent to its current circle. A tangent line always lies <em>outside</em> the circle, so every step lands on a slightly bigger circle. You can compute exactly how much: the new <em>x</em>² + <em>v</em>² is (<em>x</em> + <em>v</em>Δ<em>t</em>)² + (<em>v</em> − <em>x</em>Δ<em>t</em>)² = (<em>x</em>² + <em>v</em>²)(1 + Δ<em>t</em>²). The energy is multiplied by 1 + Δ<em>t</em>² at <em>every</em> step, so it grows without limit: after 10,000 steps of 0.01, by (1.0001)<sup>10,000</sup> ≈ 2.72, which is why the code prints about 1.36.</li>
  <li><strong>Semi-implicit Euler</strong> moves the position with the velocity it has just corrected, so its small errors don't all push the same way: in one part of each cycle they push outward, and in another inward, and they cancel over a cycle. You can check that this method keeps a slightly tilted version of the energy, <em>x</em>² + <em>v</em>² − Δ<em>t</em> · <em>xv</em>, <em>exactly</em> constant. Since that differs from the true <em>x</em>² + <em>v</em>² only by the small term Δ<em>t</em> · <em>xv</em>, the true energy can only wobble in a narrow band (here within about 0.5%), never drift away.</li>
</ul>
<p>The word <strong>symplectic</strong> names the underlying property: the method preserves <em>areas</em> in the (<em>x</em>, <em>v</em>) plane. Take a small patch of starting states and step them all; with explicit Euler the patch grows by a factor 1 + Δ<em>t</em>² every step, while with semi-implicit Euler its area stays exactly the same. A method that can't grow areas can't spiral outward.</p>
`,
    terms: [
      ["Work", "W = Fd cos θ, energy transferred by a force acting through a displacement (joules)."],
      ["Kinetic energy", "K = ½mv², energy of motion."],
      ["Potential energy", "Stored energy of position: mgh for gravity, ½kx² for a spring."],
      ["Conservation of mechanical energy", "K + U stays constant when only conservative forces do work."],
      ["Power", "Rate of doing work, in watts (J/s)."],
      ["Momentum", "p = mv; conserved in a system with no external forces."],
      ["Elastic collision", "A collision that conserves kinetic energy as well as momentum."],
      ["Symplectic integrator", "A numerical method, such as semi-implicit Euler, that keeps energy bounded over long simulations."]
    ],
    quiz: [
      { q: "Doubling a car's speed multiplies its kinetic energy by:", choices: ["2", "4", "√2", "8"], answer: 1, why: "K = ½mv²." },
      { q: "A ball is dropped from 5 m. Ignoring air, its speed just before landing is about:", choices: ["5 m/s", "9.9 m/s", "49 m/s", "98 m/s"], answer: 1, why: "√(2 · 9.8 · 5) ≈ 9.9 m/s." },
      { q: "In a perfectly inelastic collision:", choices: ["Momentum and kinetic energy are both conserved", "Momentum is conserved; kinetic energy is not", "Neither is conserved", "Only kinetic energy is conserved"], answer: 1, why: "The objects stick; some kinetic energy becomes heat and deformation." },
      { q: "Two equal-mass carts collide elastically; one was at rest. Afterward:", choices: ["Both move at half speed", "The moving cart stops and the other moves off at its speed", "Both stop", "They bounce apart at equal speeds"], answer: 1, why: "Equal masses swap velocities." },
      { q: "A simulation's total energy keeps increasing for a frictionless spring. This suggests:", choices: ["New physics", "A numerical method that isn't energy-conserving, such as explicit Euler", "The spring is getting stiffer", "Correct behavior"], answer: 1, why: "A frictionless system's energy should stay constant; the integrator is at fault." }
    ],
    practice: [
      { q: `<p>A 0.5 kg ball is thrown up at 12 m/s. Use energy to find its maximum height.</p>`, a: `<p>½<em>mv</em>² = <em>mgh</em>: <em>h</em> = <em>v</em>²/(2<em>g</em>) = 144/19.6 ≈ 7.3 m. The mass cancels.</p>` },
      { q: `<p>A spring (<em>k</em> = 400 N/m) is compressed 0.15 m and launches a 0.2 kg ball horizontally. How fast does the ball leave?</p>`, a: `<p>½<em>kx</em>² = ½<em>mv</em>²: <em>v</em> = <em>x</em>√(<em>k</em>/<em>m</em>) = 0.15√2000 ≈ 6.7 m/s.</p>` },
      { q: `<p>A 0.15 kg baseball arrives at 40 m/s and leaves the bat at 50 m/s in the opposite direction. The contact lasts 1.2 ms. Find the impulse and the average force.</p>`, a: `<p>Taking the outgoing direction as positive: Δ<em>p</em> = 0.15(50 − (−40)) = 13.5 kg·m/s. Average force: 13.5/0.0012 ≈ 11,250 N, more than a ton's weight, for about a millisecond.</p>` },
      { q: `<p>A 2 kg cart moving at 3 m/s collides elastically with a 1 kg cart at rest. Find both velocities afterward and check that kinetic energy is conserved.</p>`, a: `<p><em>v</em>₁′ = (2 − 1)(3)/3 = 1 m/s; <em>v</em>₂′ = 2(2)(3)/3 = 4 m/s. Momentum: 6 = 2 + 4. ✓ Energy: ½(2)(9) = 9 J; after: ½(2)(1) + ½(1)(16) = 1 + 8 = 9 J. ✓</p>` },
      { q: `<p>A 60 kg skier starts at rest at the top of a 25 m high slope and reaches the bottom at 18 m/s. How much energy did friction and air resistance remove?</p>`, a: `<p>Initial: <em>mgh</em> = 60 · 9.8 · 25 = 14,700 J. Final: ½ · 60 · 324 = 9,720 J. Removed: about 4,980 J, converted to heat.</p>` }
    ],
    sources: ["openstaxphys", "feynman"]
  },
  {
    id: "p5",
    title: "Circular motion, gravitation and orbits",
    minutes: 90,
    summary: "Centripetal acceleration, Newton's law of universal gravitation, orbital speed and period, Kepler's laws, and simulating an orbit.",
    notes: `
<p>Newton's greatest achievement was showing that the force pulling an apple to the ground is the same force holding the Moon in orbit. This lesson develops circular motion, then gravitation, then orbits, ending with a simulation that reproduces Kepler's laws from Newton's, the same calculation that guides every satellite and space probe.</p>

<h3>Uniform circular motion</h3>
<p>An object moving in a circle at constant speed is accelerating, because its velocity keeps changing direction. The acceleration points toward the center (<strong>centripetal</strong>, "center-seeking") and has magnitude</p>
<p class="math"><em>a<sub>c</sub></em> = <em>v</em>²/<em>r</em> = ω²<em>r</em></p>
<p>where ω = <em>v</em>/<em>r</em> is the angular speed in radians per second.</p>
<p><strong>Where <em>v</em>²/<em>r</em> comes from.</strong> The picture first. In a short time Δ<em>t</em> the object moves a distance <em>v</em>Δ<em>t</em> along the circle, turning through the angle Δθ = <em>v</em>Δ<em>t</em>/<em>r</em> (in radians, angle = arc length / radius). Its velocity keeps the same length <em>v</em> but turns through the same angle Δθ, because velocity is always perpendicular to the radius. Draw the two velocity arrows from one point: the change Δ<strong>v</strong> joins their tips, and it points toward the center of the circle. For a small angle, its length is about the arc of a circle of radius <em>v</em>: |Δ<strong>v</strong>| ≈ <em>v</em> Δθ = <em>v</em> · <em>v</em>Δ<em>t</em>/<em>r</em>. Dividing by Δ<em>t</em>, the acceleration has size <em>v</em>²/<em>r</em>.</p>
<figure class="fig">
<svg viewBox="0 0 400 190" role="img" aria-label="Left: an object on a circle at two nearby moments, with velocity arrows v1 and v2 tangent to the circle, and the angle delta theta between the two radii. Right: the same two velocity arrows drawn from a single point, with the change delta v joining their tips; delta v points toward the circle's center.">
  <defs><marker id="p5arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="hl"/></marker></defs>
  <circle cx="100" cy="105" r="70" class="ln"/>
  <line x1="100" y1="105" x2="145" y2="51.4" class="ln dash"/><line x1="100" y1="105" x2="87.8" y2="36.1" class="ln dash"/>
  <path d="M111.6,91.2 A18,18 0 0 0 96.9,87.3" class="ln"/>
  <circle cx="100" cy="105" r="3" class="dot"/><circle cx="145" cy="51.4" r="3" class="dot"/><circle cx="87.8" cy="36.1" r="3" class="dot"/>
  <line x1="145" y1="51.4" x2="102.9" y2="16" class="hl" marker-end="url(#p5arr)"/>
  <line x1="87.8" y1="36.1" x2="33.7" y2="45.6" class="hl" marker-end="url(#p5arr)"/>
  <text x="104" y="76" class="m">Δθ</text><text x="128" y="26">v₁</text><text x="40" y="34">v₂</text>
  <circle cx="320" cy="150" r="3" class="dot"/>
  <line x1="320" y1="150" x2="277.9" y2="114.6" class="hl" marker-end="url(#p5arr)"/>
  <line x1="320" y1="150" x2="265.8" y2="159.6" class="hl" marker-end="url(#p5arr)"/>
  <line x1="277.9" y1="114.6" x2="265.8" y2="159.6" class="cv" marker-end="url(#p5arr)"/>
  <text x="303" y="124">v₁</text><text x="290" y="176">v₂</text><text x="232" y="140" class="em">Δv</text>
</svg>
<figcaption>Left: the velocity turns through the same angle Δθ as the radius. Right: moved to a common starting point, the two velocities differ by Δv, which points toward the center. Its length is about v Δθ = v²Δt/r.</figcaption>
</figure>
<p>The same result with calculus: put the circle's center at the origin, so the position is <strong>r</strong>(<em>t</em>) = (<em>r</em> cos ω<em>t</em>, <em>r</em> sin ω<em>t</em>). Differentiate each component twice: <strong>v</strong> = (−<em>r</em>ω sin ω<em>t</em>, <em>r</em>ω cos ω<em>t</em>) and <strong>a</strong> = (−<em>r</em>ω² cos ω<em>t</em>, −<em>r</em>ω² sin ω<em>t</em>) = −ω²<strong>r</strong>(<em>t</em>). The acceleration is −ω² times the position: it points from the object to the center, with size ω²<em>r</em> = <em>v</em>²/<em>r</em>, since <em>v</em> = ω<em>r</em>.</p>
<p>By Newton's second law, some real force must supply <em>F</em> = <em>mv</em>²/<em>r</em> toward the center: tension for a ball on a string, friction for a car on a curve, gravity for a satellite. There is no separate "centrifugal force" pushing outward; that's what inertia feels like from inside the turning object.</p>
<p><strong>Example.</strong> A car takes a curve of radius 50 m at 15 m/s. It needs <em>a<sub>c</sub></em> = 225/50 = 4.5 m/s², supplied by friction: μ<sub><em>s</em></sub><em>mg</em> ≥ <em>mv</em>²/<em>r</em> requires μ<sub><em>s</em></sub> ≥ 4.5/9.8 ≈ 0.46. Dry asphalt (μ ≈ 0.7) is fine; ice (μ ≈ 0.1) is not.</p>

<h3>Universal gravitation</h3>
<p>Every pair of masses attracts with a force along the line between them:</p>
<p class="math"><em>F</em> = <em>Gm</em>₁<em>m</em>₂/<em>r</em>²,   <em>G</em> = 6.674 × 10⁻¹¹ N·m²/kg²</p>
<p>It's an <strong>inverse-square law</strong>: double the distance, a quarter of the force. Near Earth's surface, <em>Gm</em><sub>E</sub>/<em>R</em><sub>E</sub>² works out to 9.8 m/s², which is <em>g</em>. Henry Cavendish first measured <em>G</em> in a laboratory in 1798, which also gave the first measurement of Earth's mass ("weighing the Earth").</p>

<h3>Circular orbits</h3>
<p>A satellite in a circular orbit is falling continuously, but moving sideways fast enough that the ground curves away beneath it. Setting gravity equal to the centripetal force:</p>
<p class="math"><em>GMm</em>/<em>r</em>² = <em>mv</em>²/<em>r</em>  ⟹  <em>v</em> = √(<em>GM</em>/<em>r</em>),   period <em>T</em> = 2π<em>r</em>/<em>v</em></p>
<p>For the International Space Station, about 400 km up (<em>r</em> ≈ 6771 km, <em>GM</em><sub>E</sub> = 3.986 × 10¹⁴ m³/s²): <em>v</em> ≈ 7.67 km/s, <em>T</em> ≈ 92 minutes, so astronauts see about 16 sunrises a day. The astronauts float not because gravity is absent (it's about 90% as strong as on the ground) but because they and the station fall together.</p>
<p>Squaring the period formula gives <em>T</em>² = 4π²<em>r</em>³/(<em>GM</em>): the square of the period is proportional to the cube of the radius. A geostationary satellite, with <em>T</em> = 1 day, must orbit at <em>r</em> ≈ 42,200 km, which is where weather and TV satellites sit.</p>

<h3>Kepler's laws</h3>
<p>Johannes Kepler found three laws of planetary motion (1609–1619) by fitting Tycho Brahe's careful naked-eye observations, without knowing why they held:</p>
<ol>
  <li>Planets move in <strong>ellipses</strong>, with the Sun at one focus.</li>
  <li>A line from the Sun to a planet sweeps out <strong>equal areas in equal times</strong>: planets move faster when closer to the Sun.</li>
  <li><em>T</em>² is proportional to <em>a</em>³, where <em>a</em> is the ellipse's semi-major axis.</li>
</ol>
<p>Newton showed all three follow from <strong>F</strong> = <em>m</em><strong>a</strong> and the inverse-square law. The second law is conservation of angular momentum, which holds for any force pointing toward a fixed center.</p>
<h3>Angular momentum</h3>
<p>Momentum <em>m</em><strong>v</strong> measures "how much motion" an object has in a straight line. <strong>Angular momentum</strong> measures how much motion it has <em>around a center</em>. For an object at position <strong>r</strong> = (<em>x</em>, <em>y</em>), measured from the center, with velocity <strong>v</strong> = (<em>v<sub>x</sub></em>, <em>v<sub>y</sub></em>), it is</p>
<p class="math"><em>L</em> = <em>m</em>(<em>x v<sub>y</sub></em> − <em>y v<sub>x</sub></em>) = <em>m r v</em><sub>⊥</sub></p>
<p>where <em>r</em> is the distance from the center and <em>v</em><sub>⊥</sub> is the part of the velocity perpendicular to the radius, the sideways part that carries the object around. Motion straight toward or away from the center contributes nothing. (In three dimensions <em>L</em> is a vector, the "cross product" of <strong>r</strong> and <em>m</em><strong>v</strong>; in a flat orbit, this one number is all you need. Its sign says which way round the object goes.)</p>
<p><strong>Angular momentum is conserved when the force points along the radius</strong>, toward or away from the center, as gravity does. Such a force can speed the object up or slow it down along the radius, but it can't push it sideways around the center, so <em>L</em> can't change. (With calculus: <em>dL</em>/<em>dt</em> = <em>m</em>(<em>x a<sub>y</sub></em> − <em>y a<sub>x</sub></em>), since the terms <em>v<sub>x</sub>v<sub>y</sub></em> − <em>v<sub>y</sub>v<sub>x</sub></em> cancel, and for an acceleration pointing along (<em>x</em>, <em>y</em>), <em>x a<sub>y</sub></em> = <em>y a<sub>x</sub></em>.) So in an orbit <em>r v</em><sub>⊥</sub> stays fixed: where the planet is closer, it must move faster. In a short time Δ<em>t</em> the line from the Sun sweeps a thin triangle of area ½ <em>r</em> · <em>v</em><sub>⊥</sub>Δ<em>t</em>, so constant <em>L</em> means equal areas in equal times: Kepler's second law.</p>
<p>In the simulation below, units are chosen so that <em>m</em> = 1 and <em>GM</em> = 1. A body starting at (1, 0) with velocity (0, 1.2) has <em>L</em> = 1 · 1.2 − 0 · 0 = 1.2, and it keeps that value all the way round. At the farthest and nearest points of the orbit, the velocity is perpendicular to the radius, so there <em>v</em> = <em>L</em>/<em>r</em> = 1.2/<em>r</em>.</p>
<h3>Gravitational energy and escape velocity</h3>
<p>Lesson 4's <em>U</em> = <em>mgh</em> assumes gravity is the same at every height, which is only true near the surface. For the full inverse-square force, the potential energy at distance <em>r</em> from the center is</p>
<p class="math"><em>U</em> = −<em>GMm</em>/<em>r</em></p>
<p>It's negative and rises toward 0 as <em>r</em> → ∞: you must do work against gravity to move away, and an object infinitely far away has <em>U</em> = 0. (Check: the force is minus the derivative, −<em>dU</em>/<em>dr</em> = −<em>GMm</em>/<em>r</em>², the inverse-square pull toward the center.) So in an orbit the total energy ½<em>mv</em>² − <em>GMm</em>/<em>r</em> is constant; in our units, <em>v</em>²/2 − 1/<em>r</em>.</p>
<p><strong>Escape velocity.</strong> To escape forever, an object must still have kinetic energy ≥ 0 when it gets infinitely far away, where <em>U</em> = 0. Energy is conserved, so its total energy must be at least 0 from the start: ½<em>mv</em>² − <em>GMm</em>/<em>r</em> ≥ 0, that is,</p>
<p class="math"><em>v</em><sub>esc</sub> = √(2<em>GM</em>/<em>r</em>) = √2 · √(<em>GM</em>/<em>r</em>)</p>
<p>and √(<em>GM</em>/<em>r</em>) is exactly the circular orbital speed. So escape velocity is √2 ≈ 1.41 times circular speed at the same distance. From the ISS's altitude that's about 1.41 × 7.67 ≈ 10.9 km/s; from Earth's surface (ignoring air), about 11.2 km/s.</p>

<h3>Simulating an orbit</h3>
<p>Using units where <em>GM</em> = 1, start at (1, 0) with velocity (0, 1), which is exactly circular speed. Gravity's acceleration is −<em>GM</em> <strong>r</strong>/|<strong>r</strong>|³ (inverse-square magnitude, pointing toward the center):</p>
<pre><code>import math

def orbit(vx0, vy0, dt=0.001, steps=20_000):
    x, y, vx, vy = 1.0, 0.0, vx0, vy0
    path = []
    for _ in range(steps):
        r3 = (x * x + y * y) ** 1.5
        vx -= x / r3 * dt          # semi-implicit Euler
        vy -= y / r3 * dt
        x += vx * dt
        y += vy * dt
        path.append((x, y))
    return path

circle = orbit(0, 1.0)     # stays at radius 1; one orbit takes 2π ≈ 6.28 time units
ellipse = orbit(0, 1.2)    # an ellipse, farthest from the center on the opposite side</code></pre>
<p>Starting faster than circular speed gives an ellipse; at √2 times circular speed (the escape velocity derived above), the orbit becomes a parabola and never returns. Measuring the simulated ellipse lets you check Kepler's second and third laws numerically, as in the practice problems. With the plain Euler method, the "circular" orbit spirals outward, gaining energy every step, another example of why integrators matter.</p>
<p>Simulating three or more bodies works the same way, summing the forces from every other body. Unlike two bodies, the three-body problem has no general formula solution, and its motion can be chaotic: tiny differences in starting conditions grow until predictions fail. Space agencies plan missions by numerical simulation, as Katherine Johnson did by hand and with early computers for the first American orbital flights.</p>
`,
    terms: [
      ["Centripetal acceleration", "The acceleration v²/r toward the center of a circular path."],
      ["Angular speed ω", "Rate of rotation in radians per second; v = ωr."],
      ["Universal gravitation", "F = Gm₁m₂/r², an attraction between every pair of masses."],
      ["Inverse-square law", "A force that falls off as 1/r² with distance."],
      ["Orbital speed", "v = √(GM/r) for a circular orbit."],
      ["Kepler's laws", "Elliptical orbits, equal areas in equal times, and T² ∝ a³."],
      ["Escape velocity", "The speed needed to leave a body's gravity permanently: √2 times circular orbital speed at that distance."],
      ["Angular momentum", "L = m(x v_y − y v_x) = m r v⊥ about a center; conserved when the force points along the radius."],
      ["Gravitational potential energy", "U = −GMm/r, zero infinitely far away; mgh is its approximation near the surface."]
    ],
    quiz: [
      { q: "A ball whirled on a string in a horizontal circle; the string breaks. The ball moves:", choices: ["Outward, along the radius", "Along the tangent, in a straight line (plus falling)", "In a smaller circle", "Toward the center"], answer: 1, why: "With no centripetal force, it continues with its current velocity (first law)." },
      { q: "If the distance between two masses triples, the gravitational force becomes:", choices: ["1/3 as strong", "1/9 as strong", "3 times as strong", "1/27 as strong"], answer: 1, why: "Inverse square: 1/3²." },
      { q: "Astronauts on the ISS float because:", choices: ["There's no gravity in orbit", "They and the station are in free fall together", "The station spins", "They're above the atmosphere"], answer: 1, why: "Gravity there is still about 90% of surface gravity." },
      { q: "By Kepler's third law, a planet at 4 times Earth's orbital radius has a year lasting:", choices: ["4 Earth years", "8 Earth years", "16 Earth years", "2 Earth years"], answer: 1, why: "T ∝ a^(3/2) = 4^1.5 = 8." },
      { q: "A planet moves fastest:", choices: ["Farthest from the Sun", "Closest to the Sun", "At the same speed everywhere", "Halfway around"], answer: 1, why: "Equal areas in equal times requires faster motion when closer." }
    ],
    practice: [
      { q: `<p>A 0.2 kg ball on a 0.8 m string is whirled in a horizontal circle (ignore gravity) twice per second. Find its speed and the string tension.</p>`, a: `<p><em>v</em> = 2π<em>r</em> × 2 = 2π(0.8)(2) ≈ 10.05 m/s. <em>T</em> = <em>mv</em>²/<em>r</em> = 0.2 × 101/0.8 ≈ 25.3 N.</p>` },
      { q: `<p>The Moon orbits at about 384,000 km in 27.3 days. Use this to estimate Earth's mass.</p>`, a: `<p><em>M</em> = 4π²<em>r</em>³/(<em>GT</em>²). <em>r</em> = 3.84 × 10⁸ m, <em>T</em> = 27.3 × 86,400 ≈ 2.36 × 10⁶ s. <em>M</em> ≈ 4π²(5.66 × 10²⁵)/(6.674 × 10⁻¹¹ × 5.57 × 10¹²) ≈ 6.0 × 10²⁴ kg. ✓</p>` },
      { q: `<p>Find the radius of a geostationary orbit (<em>T</em> = 86,164 s, one sidereal day).</p>`, a: `<p><em>r</em> = (<em>GMT</em>²/(4π²))<sup>1/3</sup> = (3.986 × 10¹⁴ × 7.42 × 10⁹/39.48)<sup>1/3</sup> ≈ (7.49 × 10²²)<sup>1/3</sup> ≈ 4.22 × 10⁷ m, about 42,200 km from Earth's center, 35,800 km above the surface.</p>` },
      { q: `<p>Using the <code>orbit</code> function, start with velocity (0, 1.2) and find the maximum distance from the center. Check it against energy conservation: <em>v</em>²/2 − 1/<em>r</em> is constant, and at the far point the velocity is perpendicular to the radius.</p>`, a: `<p>Simulating gives a maximum distance of about 2.57. Check: energy <em>E</em> = 1.44/2 − 1 = −0.28; angular momentum <em>L</em> = 1.2, so at the far point <em>v</em> = 1.2/<em>r</em>. Solving 0.72/<em>r</em>² − 1/<em>r</em> = −0.28 gives 0.28<em>r</em>² − <em>r</em> + 0.72 = 0, so <em>r</em> = (1 + √(1 − 0.8064))/0.56 ≈ 2.57. ✓</p>` },
      { q: `<p>Run the circular orbit with explicit Euler (update position with the old velocity) and with semi-implicit Euler for 10 orbits, and compare the final radius. Explain.</p>`, a: `<p>Explicit Euler drifts outward: with <em>dt</em> = 0.001, the radius grows by about 11% after 10 orbits, and much more with larger steps. Semi-implicit Euler stays at radius 1 to about 0.1%. Each explicit step moves along the tangent of the current circle, which always lands slightly outside it, adding energy every step.</p>` }
    ],
    sources: ["openstaxphys", "newton1687", "nasahidden"]
  },
  {
    id: "p6",
    title: "Oscillations",
    minutes: 90,
    summary: "Simple harmonic motion of springs and pendulums, period and frequency, energy in oscillation, damping, driven oscillation and resonance.",
    notes: `
<p>Oscillations are everywhere: a mass on a spring, a swinging pendulum, a vibrating guitar string, alternating current, a quartz crystal keeping time in your computer, atoms in a solid. Remarkably, almost all of them, for small enough motions, obey the same equation. Learn it once and you understand them all.</p>

<h3>Simple harmonic motion</h3>
<p>A mass <em>m</em> on a spring with constant <em>k</em> feels a restoring force <em>F</em> = −<em>kx</em> (Hooke's law), always pulling toward equilibrium. Newton's second law gives a differential equation:</p>
<p class="math"><em>m</em> <em>d</em>²<em>x</em>/<em>dt</em>² = −<em>kx</em>,  i.e.  <em>d</em>²<em>x</em>/<em>dt</em>² = −ω²<em>x</em>  with ω = √(<em>k</em>/<em>m</em>)</p>
<p>We need a function whose second derivative is a negative multiple of itself: sines and cosines. The solution is</p>
<p class="math"><em>x</em>(<em>t</em>) = <em>A</em> cos(ω<em>t</em> + φ)</p>
<p>Check it by differentiating twice with the chain rule (each derivative of the inside, ω<em>t</em> + φ, brings out a factor ω): <em>x</em>′ = −<em>A</em>ω sin(ω<em>t</em> + φ), and <em>x</em>″ = −<em>A</em>ω² cos(ω<em>t</em> + φ) = −ω² <em>x</em>. ✓ That works for any <em>A</em> and φ, which is why they are free to match the starting conditions.</p>
<p>The <strong>amplitude</strong> <em>A</em> is the largest displacement. The <strong>phase</strong> φ (an angle, in radians) says where in its cycle the motion is at <em>t</em> = 0. With φ = 0, <em>x</em>(0) = <em>A</em>: the mass starts at its farthest point, as when you pull it out and let go. With φ = −π/2, <em>x</em> = <em>A</em> cos(ω<em>t</em> − π/2) = <em>A</em> sin ω<em>t</em>: it starts at the middle, moving in the positive direction, as when you give a resting mass a tap. Changing φ slides the whole graph sideways in time without changing its shape. In general the starting position and velocity fix both constants: <em>x</em>(0) = <em>A</em> cos φ and <em>v</em>(0) = −<em>A</em>ω sin φ.</p>
<figure class="fig">
<svg viewBox="0 0 430 195" role="img" aria-label="Two graphs of x against t with the same amplitude and period. The curve with phase 0 starts at its maximum. The curve with phase minus pi over 2 starts at zero going up and reaches each maximum a quarter period later.">
  <defs><marker id="p6arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="hl"/></marker></defs>
  <line x1="30" y1="100" x2="410" y2="100" class="ax"/><line x1="40" y1="185" x2="40" y2="15" class="ax"/>
  <path d="M40.0,40.0 L48.4,42.7 L56.8,50.5 L65.2,62.7 L73.6,78.3 L82.0,95.8 L90.4,113.6 L98.8,130.3 L107.2,144.2 L115.6,154.2 L124.0,159.4 L132.4,159.2 L140.8,153.8 L149.2,143.6 L157.6,129.4 L166.0,112.6 L174.4,94.8 L182.8,77.3 L191.2,61.9 L199.6,49.9 L208.0,42.4 L216.4,40.0 L224.8,43.0 L233.2,51.1 L241.6,63.5 L250.0,79.2 L258.4,96.8 L266.8,114.6 L275.2,131.2 L283.6,144.9 L292.0,154.7 L300.4,159.5 L308.8,159.1 L317.2,153.4 L325.6,142.9 L334.0,128.5 L342.4,111.7 L350.8,93.7 L359.2,76.4 L367.6,61.1 L376.0,49.4 L384.4,42.1 L392.8,40.0" class="cv"/>
  <path d="M40.0,100.0 L48.4,82.3 L56.8,66.1 L65.2,53.0 L73.6,44.1 L82.0,40.2 L90.4,41.6 L98.8,48.2 L107.2,59.5 L115.6,74.4 L124.0,91.5 L132.4,109.5 L140.8,126.6 L149.2,141.3 L157.6,152.3 L166.0,158.7 L174.4,159.8 L182.8,155.5 L191.2,146.4 L199.6,133.0 L208.0,116.8 L216.4,99.0 L224.8,81.3 L233.2,65.3 L241.6,52.4 L250.0,43.7 L258.4,40.1 L266.8,41.8 L275.2,48.7 L283.6,60.2 L292.0,75.3 L300.4,92.5 L308.8,110.5 L317.2,127.5 L325.6,142.0 L334.0,152.8 L342.4,158.9 L350.8,159.7 L359.2,155.2 L367.6,145.7 L376.0,132.2 L384.4,115.8 L392.8,98.0" class="hl dash"/>
  <line x1="220" y1="30" x2="256" y2="30" class="hl" marker-start="url(#p6arr)" marker-end="url(#p6arr)"/>
  <text x="228" y="22" class="m">T/4</text>
  <text x="24" y="44" class="m">A</text><text x="18" y="164" class="m">−A</text><text x="414" y="104" class="m">t</text>
  <text x="105" y="180">φ = 0</text><text x="60" y="28">φ = −π/2 (dashed)</text>
</svg>
<figcaption>x = A cos(ωt + φ) for φ = 0 (solid) and φ = −π/2 (dashed). Same amplitude, same period; the dashed curve runs a quarter period behind, because a phase difference of π/2 out of a full cycle of 2π is a quarter of the period T.</figcaption>
</figure>
<p>This is <strong>simple harmonic motion</strong> (SHM). The <strong>period</strong> and <strong>frequency</strong> are</p>
<p class="math"><em>T</em> = 2π/ω = 2π√(<em>m</em>/<em>k</em>),   <em>f</em> = 1/<em>T</em> (hertz)</p>
<p><strong>ω or <em>f</em>?</strong> Both measure how fast the oscillation repeats, in different units, and ω = 2π<em>f</em>. The frequency <em>f</em> counts <em>cycles</em> per second, in hertz (Hz): it's what you'd count with a stopwatch and what specifications quote (a 440 Hz tuning fork, a 32,768 Hz quartz crystal). The angular frequency ω counts <em>radians</em> per second (rad/s): one cycle is 2π radians, because the angle ω<em>t</em> + φ inside the cosine must advance by 2π for the motion to repeat. Use ω inside formulas, since <em>x</em> = <em>A</em> cos(ω<em>t</em> + φ) and ω = √(<em>k</em>/<em>m</em>) are written with it, and convert to <em>f</em> = ω/(2π) or <em>T</em> = 1/<em>f</em> when you report or measure. For example, ω = 20 rad/s means <em>f</em> = 20/(2π) ≈ 3.18 Hz and <em>T</em> ≈ 0.314 s. Since radians have no units, both are "per second", which is exactly why it's important to write rad/s or Hz: a factor of 2π (about 6.3) is a common and costly mistake.</p>
<p>Notice what's missing: the period doesn't depend on the amplitude. A spring oscillates at the same rate whether stretched a little or a lot. That's what makes oscillators good clocks.</p>

<h3>The pendulum</h3>
<p>A pendulum of length <em>L</em> swinging through angle θ has restoring acceleration −(<em>g</em>/<em>L</em>) sin θ. For small angles, sin θ ≈ θ (the Taylor approximation from <a href="#c-math131-k5">MATH 131, Lesson 5</a>), giving SHM with</p>
<p class="math"><em>T</em> = 2π√(<em>L</em>/<em>g</em>)</p>
<p>A 1 m pendulum has a period of about 2.0 s, independent of the mass and (for small swings) of the amplitude. Galileo noticed this around 1602, and Christiaan Huygens built the first pendulum clock in 1656, improving timekeeping from minutes per day to seconds. For large swings the approximation fails and the period grows: at 90° it's about 18% longer. There's no elementary formula then, but a simulation handles it easily.</p>

<h3>Energy in oscillation</h3>
<p>For a spring, energy sloshes between kinetic and potential: ½<em>mv</em>² + ½<em>kx</em>² = ½<em>kA</em>², constant. The mass moves fastest passing through equilibrium (<em>v</em><sub>max</sub> = ω<em>A</em>, all kinetic) and stops momentarily at the extremes (all potential).</p>

<h3>Damping</h3>
<p>Real oscillators lose energy to friction. Adding a damping force −<em>bv</em> (proportional to velocity, as for a shock absorber):</p>
<p class="math"><em>m</em> <em>x</em>″ + <em>b x</em>′ + <em>kx</em> = 0</p>
<ul>
  <li><strong>Underdamped</strong> (small <em>b</em>): oscillates with an exponentially shrinking amplitude, <em>A</em>e<sup>−<em>bt</em>/(2<em>m</em>)</sup>.</li>
  <li><strong>Critically damped</strong> (<em>b</em> = 2√(<em>km</em>)): returns to equilibrium as fast as possible without overshooting. Car suspensions and door closers aim close to this.</li>
  <li><strong>Overdamped</strong> (large <em>b</em>): creeps back slowly without oscillating.</li>
</ul>
<p>The same equation, with inductance, resistance and capacitance in place of mass, damping and spring constant, describes electrical circuits. In computing, the "spring" animations in phone interfaces, which overshoot slightly and settle, are damped oscillators chosen for how they feel.</p>

<h3>Driven oscillation and resonance</h3>
<p>Push an oscillator periodically, at frequency ω<sub>d</sub>, and after a while it oscillates at that driving frequency. The amplitude depends on how close ω<sub>d</sub> is to the natural frequency ω₀ = √(<em>k</em>/<em>m</em>): near ω₀ it can become very large, limited only by damping. That's <strong>resonance</strong>, the reason a child on a swing goes higher when pushed in rhythm.</p>
<p>Resonance is useful: radios tune to one station by making a circuit resonate at its frequency, and MRI machines detect atomic nuclei resonating in a magnetic field. It's also dangerous. On its opening day in June 2000, London's Millennium Bridge began swaying sideways when crowds crossed: pedestrians unconsciously fell into step with the bridge's small sideways motion, pushing it at its natural frequency. It closed for two years to fit dampers. (The famous 1940 collapse of the Tacoma Narrows Bridge is often called resonance, but engineers attribute it to <em>aeroelastic flutter</em>, a self-reinforcing interaction between wind and the twisting deck, which is related but different.)</p>

<h3>Simulating a damped, driven oscillator</h3>
<pre><code>import math

def amplitude(drive_freq, m=1.0, k=1.0, b=0.1, F0=0.1, dt=0.01, t_end=300):
    x = v = 0.0
    biggest = 0.0
    t = 0.0
    while t &lt; t_end:
        a = (-k * x - b * v + F0 * math.cos(drive_freq * t)) / m
        v += a * dt
        x += v * dt
        t += dt
        if t &gt; t_end - 50:                # measure after transients die out
            biggest = max(biggest, abs(x))
    return biggest

for w in (0.5, 0.9, 1.0, 1.1, 1.5):
    print(w, round(amplitude(w), 2))   # peaks sharply near the natural frequency 1.0</code></pre>
`,
    terms: [
      ["Simple harmonic motion", "Oscillation x = A cos(ωt + φ) caused by a restoring force proportional to displacement."],
      ["Period / frequency", "Time for one cycle, T; cycles per second, f = 1/T (hertz)."],
      ["Angular frequency ω", "2πf; for a spring, √(k/m)."],
      ["Amplitude", "The maximum displacement from equilibrium."],
      ["Damping", "Energy loss that makes oscillations shrink; critical damping returns fastest without overshoot."],
      ["Resonance", "Large-amplitude response when an oscillator is driven near its natural frequency."]
    ],
    quiz: [
      { q: "A mass on a spring has period 2 s. If the mass is quadrupled, the period becomes:", choices: ["1 s", "4 s", "8 s", "2 s"], answer: 1, why: "T ∝ √m: √4 = 2 times longer." },
      { q: "If you double the amplitude of a spring's oscillation, the period:", choices: ["Doubles", "Halves", "Stays the same", "Quadruples"], answer: 2, why: "SHM's period is independent of amplitude." },
      { q: "A pendulum clock is taken to the Moon (<em>g</em> about 1/6 of Earth's). It runs:", choices: ["Faster", "Slower", "The same", "Not at all"], answer: 1, why: "T = 2π√(L/g) increases by √6 ≈ 2.4." },
      { q: "Where is a mass on a spring moving fastest?", choices: ["At maximum stretch", "At equilibrium", "At maximum compression", "Speed is constant"], answer: 1, why: "All the energy is kinetic there." },
      { q: "A car's shock absorbers should be close to:", choices: ["Undamped", "Critically damped", "Highly overdamped", "Driven at resonance"], answer: 1, why: "Settle quickly without bouncing." }
    ],
    practice: [
      { q: `<p>A 0.5 kg mass on a spring with <em>k</em> = 200 N/m is pulled 0.1 m and released. Find ω, the period, the maximum speed and the total energy.</p>`, a: `<p>ω = √(200/0.5) = 20 rad/s. <em>T</em> = 2π/20 ≈ 0.314 s. <em>v</em><sub>max</sub> = ω<em>A</em> = 2 m/s. <em>E</em> = ½<em>kA</em>² = ½(200)(0.01) = 1 J (check: ½(0.5)(2²) = 1 J ✓).</p>` },
      { q: `<p>What length pendulum has a period of exactly 1 s?</p>`, a: `<p><em>L</em> = <em>g</em>(<em>T</em>/2π)² = 9.8/(4π²) ≈ 0.248 m.</p>` },
      { q: `<p>Write <code>x(t) = 0.1 cos(20t)</code> for the spring above. Differentiate to find <em>v</em>(<em>t</em>) and <em>a</em>(<em>t</em>), and verify that <em>a</em> = −(<em>k</em>/<em>m</em>)<em>x</em>.</p>`, a: `<p><em>v</em> = −2 sin(20<em>t</em>), <em>a</em> = −40 cos(20<em>t</em>) = −400 · 0.1 cos(20<em>t</em>) = −400<em>x</em>, and <em>k</em>/<em>m</em> = 400. ✓</p>` },
      { q: `<p>Simulate a pendulum without the small-angle approximation (θ″ = −(<em>g</em>/<em>L</em>) sin θ) for <em>L</em> = 1 m, released from rest at 10°, 45° and 90°, and measure each period. Compare with 2π√(<em>L</em>/<em>g</em>).</p>`, a: `<pre><code>import math

def period(theta0_deg, L=1.0, g=9.8, dt=1e-5):
    th, w, t = math.radians(theta0_deg), 0.0, 0.0
    while True:                  # time until it first swings through the bottom
        w -= g / L * math.sin(th) * dt
        th += w * dt
        t += dt
        if th &lt;= 0:
            return 4 * t         # a quarter period

for a in (10, 45, 90):
    print(a, round(period(a), 3), round(2 * math.pi * math.sqrt(1 / 9.8), 3))
# about 2.011, 2.087, 2.369 versus 2.007</code></pre>` },
      { q: `<p>For the damped oscillator <em>m</em> = 1 kg, <em>k</em> = 16 N/m, find the critical damping coefficient. If <em>b</em> = 1 kg/s, how long until the amplitude falls to half?</p>`, a: `<p><em>b</em><sub>c</sub> = 2√(<em>km</em>) = 8 kg/s. With <em>b</em> = 1, the amplitude is <em>A</em>e<sup>−<em>t</em>/2</sup>, which halves when <em>t</em> = 2 ln 2 ≈ 1.39 s.</p>` }
    ],
    sources: ["openstaxphys", "feynman"]
  }
]);

CSA.addAsides("phys150", {
  p1: [
    { kind: "lang", title: "FORTRAN: written for physics", html: `<p>The first widely used high-level language, FORTRAN ("FORmula TRANslation", IBM, 1957), was designed for scientists and engineers writing exactly the kind of numerical loops in this course. Physics and weather simulations drove computing from the start: ENIAC's early jobs included calculations for ballistics and nuclear weapons, and in 1950 it ran the first computer weather forecast. Much of today's scientific computing still runs on Fortran libraries, often called from Python.</p>`, sources: ["hopl"] }
  ],
  p2: [
    { kind: "practice", title: "Game physics", html: `<p>A game engine updates every object's position and velocity 60 or more times per second with exactly the loop in this lesson. Because the frame time varies, many engines use a <em>fixed</em> physics time step and run several steps per frame when needed; otherwise the same jump could reach different heights on fast and slow computers.</p>` }
  ],
  p3: [
    { kind: "history", title: "Newton's Principia", html: `<p><em>Philosophiæ Naturalis Principia Mathematica</em> (1687) stated the three laws of motion and universal gravitation and used them to explain the tides, the orbits of the planets and comets, and the shape of the Earth. Edmond Halley persuaded Newton to write it and paid for its printing. The English translation of 1729 is in the public domain and freely available.</p>`, sources: ["newton1687"] }
  ],
  p4: [
    { kind: "ethics", title: "Energy and computing", html: `<p>Every computation dissipates energy as heat. Data centers used roughly 1–2% of the world's electricity in the early 2020s, and training and running large AI models has made demand grow quickly. Engineers measure efficiency (operations per joule) and data-center overhead (power usage effectiveness). Choosing efficient algorithms, hardware and locations is an engineering decision with environmental consequences.</p>` }
  ],
  p5: [
    { kind: "history", title: "Simulating the solar system", html: `<p>In 1758 Alexis Clairaut, Jérôme Lalande and Nicole-Reine Lepaute spent months calculating by hand how Jupiter and Saturn would delay the return of Halley's comet. They predicted its closest approach to the Sun within about a month. Today, NASA's Jet Propulsion Laboratory publishes ephemerides, numerical integrations of the whole solar system, accurate enough to land spacecraft on Mars.</p>` }
  ],
  p6: [
    { kind: "practice", title: "The clock in your computer", html: `<p>Most computers and watches keep time with a quartz crystal cut to vibrate at 32,768 Hz (2¹⁵), driven by a small circuit at resonance. Counting 2¹⁵ vibrations with a 15-stage binary counter gives exactly one second. A good quartz watch drifts only a few seconds a month.</p>` }
  ]
});

CSA.addOptional("phys150", [
  {
    id: "chaos",
    kind: "deep",
    title: "Chaos: the limits of prediction",
    minutes: 45,
    summary: "Deterministic systems whose behavior can't be predicted in practice: the double pendulum, Lorenz's weather model, the butterfly effect, and what it means for simulation.",
    notes: `
<p>Newton's laws are deterministic: the present state fixes the future exactly. In the 18th century Pierre-Simon Laplace imagined an intellect that, knowing every position and force, could predict everything. In the 20th century we learned that even simple deterministic systems can be unpredictable in practice. This is <strong>chaos</strong>.</p>

<h3>Sensitive dependence on initial conditions</h3>
<p>In 1961 the meteorologist Edward Lorenz reran a weather simulation from the middle, typing in numbers from a printout rounded to three decimal places instead of six. The new run matched at first, then diverged completely within a few simulated months. Tiny differences, far smaller than any measurement error, grew exponentially. His 1963 paper and a later talk titled "Does the flap of a butterfly's wings in Brazil set off a tornado in Texas?" gave the phenomenon its popular name: the <strong>butterfly effect</strong>.</p>
<p>The rate of growth is measured by the <strong>Lyapunov exponent</strong> λ: errors grow like e<sup>λ<em>t</em></sup>. If errors double every two days, improving your measurements a thousandfold buys only about 20 extra days of forecast (2<sup>10</sup> ≈ 1000, ten doublings). That's why weather forecasts beyond about two weeks have little skill, however powerful the computers.</p>

<h3>The double pendulum</h3>
<p>Attach a second pendulum to the end of the first. For small swings it behaves regularly. For large swings it tumbles erratically, and two simulations started 10⁻⁹ radians apart soon look nothing alike. You can try this with the same semi-implicit stepping you've used all term (the equations of motion are longer; your textbook or the lab handout gives them).</p>

<h3>What chaos means for simulation</h3>
<ul>
  <li><strong>Individual trajectories can't be trusted</strong> far into the future, even with perfect code, because floating-point rounding is itself a tiny perturbation.</li>
  <li><strong>Statistics can be.</strong> Climate models can't predict the weather on a particular day in 2060, but they can predict averages and distributions, which are stable even when trajectories aren't. Weather services run <em>ensembles</em> of dozens of simulations from slightly different starting states and report the spread as a probability.</li>
  <li><strong>Reproducibility</strong> needs care: a chaotic simulation can give different results on different hardware or compilers, because floating-point operations may be ordered differently.</li>
</ul>

<h3>Discussion</h3>
<ol>
  <li>If the solar system is chaotic (it is, on timescales of millions of years), how can NASA land a probe on Mars?</li>
  <li>A forecast says "70% chance of rain". What does that mean, and how could an ensemble of simulations produce it?</li>
</ol>
`,
    terms: [
      ["Chaos", "Deterministic behavior that is unpredictable in practice because of extreme sensitivity to initial conditions."],
      ["Butterfly effect", "Popular name for sensitive dependence on initial conditions."],
      ["Lyapunov exponent", "The exponential rate at which nearby trajectories separate."],
      ["Ensemble forecast", "Many simulations from slightly different starting states, used to estimate probabilities."]
    ],
    quiz: [
      { q: "Chaotic systems are:", choices: ["Random", "Deterministic but extremely sensitive to initial conditions", "Always unstable", "Impossible to simulate"], answer: 1, why: "They follow exact laws, but small errors grow exponentially." },
      { q: "Why do weather services run ensembles?", choices: ["To use spare computers", "To estimate the probability of outcomes given uncertain starting conditions", "Because one simulation always crashes", "To average out bugs"], answer: 1, why: "The spread of the ensemble shows the forecast's uncertainty." }
    ],
    sources: ["feynman"]
  },
  {
    id: "galileo",
    kind: "history",
    title: "From Galileo to Newton: the birth of physics",
    minutes: 45,
    summary: "How experiment and mathematics replaced Aristotle's physics in about eighty years, and the conflict with authority along the way.",
    notes: `
<p>For nearly two thousand years, physics in Europe and the Islamic world followed Aristotle: heavy objects fall faster than light ones, moving objects naturally slow to a stop, and the heavens are perfect and unchanging. Between about 1600 and 1687, a handful of people replaced this with the mechanics of this course.</p>

<h3>Galileo Galilei (1564–1642)</h3>
<p>Galileo combined careful experiments with mathematics. Rolling balls down inclined planes to slow the motion enough to time it (with water clocks and his pulse), he found that distance grows with the square of time: uniform acceleration. He argued that, without air resistance, all bodies fall at the same rate, and that a ball on a level frictionless surface would roll forever, an early statement of inertia. With a telescope he built in 1609, he saw mountains on the Moon, the phases of Venus and the moons of Jupiter, evidence against the Earth-centered cosmos. In 1633 the Roman Inquisition convicted him of heresy for advocating Copernicus's Sun-centered system; he spent his last years under house arrest, where he wrote his book on motion, <em>Two New Sciences</em> (1638).</p>

<h3>Kepler and Brahe</h3>
<p>Tycho Brahe recorded planetary positions with unprecedented accuracy over twenty years. Johannes Kepler, his assistant, spent years trying to fit Mars's orbit with circles; a discrepancy of just 8 arcminutes (about a quarter of the Moon's width) convinced him to abandon circles for ellipses. It's a lesson in taking data seriously when it contradicts a beautiful theory.</p>

<h3>Newton's synthesis</h3>
<p>Newton unified Galileo's mechanics on Earth with Kepler's laws in the heavens: one set of laws for everything, the same gravity for the apple and the Moon. Newton credited predecessors with "If I have seen further, it is by standing on the shoulders of giants" (1675), a phrase older than him, in a letter to Robert Hooke, with whom he had bitter disputes over credit for the inverse-square law.</p>

<h3>Discussion questions</h3>
<ol>
  <li>Galileo slowed falling motion with inclined planes so he could measure it. How is that like choosing a time step or a test case in a simulation?</li>
  <li>Kepler rejected his own elegant theory over an 8-arcminute discrepancy. When should a small mismatch between a model and data make you abandon the model?</li>
  <li>Why might Galileo's conflict with authority still matter to scientists and engineers today?</li>
</ol>
`,
    terms: [
      ["Inertia", "The tendency of an object to keep its state of motion; Newton's first law."],
      ["Heliocentrism", "The model with the Sun at the center of the solar system, proposed by Copernicus in 1543."]
    ],
    quiz: [
      { q: "Why did Galileo use inclined planes?", choices: ["To make balls roll faster", "To slow the motion enough to measure it", "Because he had no towers", "To demonstrate friction"], answer: 1, why: "Timing free fall directly was impossible with the clocks of the day." },
      { q: "What made Kepler abandon circular orbits?", choices: ["A religious objection", "An 8-arcminute discrepancy with Brahe's data for Mars", "Newton's laws", "A telescope observation"], answer: 1, why: "He trusted the data over the theory." }
    ],
    sources: ["newton1687", "feynman"]
  }
]);

/* Auto-graded simulation problems. */
CSA.addCode("phys150", {
  p1: [
    {
      id: "fall_time",
      title: "Simulate a fall",
      prompt: `<p>Write <code>fall_time(height, dt=0.001)</code> that simulates an object dropped from rest at <code>height</code> meters with semi-implicit Euler steps (update velocity, then position) and returns the simulated time until it reaches the ground (<em>y</em> ≤ 0). Use <em>g</em> = 9.8 m/s² and no air resistance.</p><p>Also write <code>exact_fall_time(height)</code> returning √(2<em>h</em>/<em>g</em>), so you can compare.</p>`,
      starter: `import math\n\nG = 9.8\n\ndef fall_time(height, dt=0.001):\n    pass\n\ndef exact_fall_time(height):\n    pass\n`,
      hint: `<p>Keep <code>t</code>, <code>y</code> and <code>v</code>. In a loop: <code>v -= G * dt</code>, <code>y += v * dt</code>, <code>t += dt</code>; stop when <code>y &lt;= 0</code>.</p>`,
      solution: `import math\n\nG = 9.8\n\ndef fall_time(height, dt=0.001):\n    t, y, v = 0.0, height, 0.0\n    while y > 0:\n        v -= G * dt\n        y += v * dt\n        t += dt\n    return t\n\ndef exact_fall_time(height):\n    return math.sqrt(2 * height / G)\n`,
      tests: [
        { label: "Exact formula", type: "call", call: `exact_fall_time(19.6)`, expect: `2.0` },
        { label: "Simulation matches theory for 20 m", type: "assert", code: `t = fall_time(20)\nassert abs(t - exact_fall_time(20)) < 0.01, f"fall_time(20) gave {t:.4f}; expected about {exact_fall_time(20):.4f}"` },
        { label: "Simulation matches theory for 100 m", type: "assert", code: `t = fall_time(100)\nassert abs(t - 4.5175) < 0.01, f"fall_time(100) gave {t:.4f}; expected about 4.5175"` },
        { label: "Smaller steps are closer", type: "assert", code: `e1 = abs(fall_time(50, 0.01) - exact_fall_time(50))\ne2 = abs(fall_time(50, 0.0001) - exact_fall_time(50))\nassert e2 < e1, "The error should shrink when dt shrinks"` }
      ]
    }
  ],
  p2: [
    {
      id: "projectile",
      title: "Projectile range: formula and simulation",
      prompt: `<p>Write two functions for a projectile launched from the ground at <code>speed</code> m/s and <code>angle</code> degrees, with <em>g</em> = 9.8 and no air:</p>
<ul>
  <li><code>range_formula(speed, angle)</code>: <em>v</em>² sin(2θ)/<em>g</em>.</li>
  <li><code>range_sim(speed, angle, dt=0.001)</code>: simulate with semi-implicit Euler until <em>y</em> &lt; 0 (after launch), and return <em>x</em>.</li>
</ul>
<p>Then write <code>best_angle(speed)</code> that returns the whole-number angle from 1 to 89 with the largest simulated range.</p>`,
      starter: `import math\n\nG = 9.8\n\ndef range_formula(speed, angle):\n    pass\n\ndef range_sim(speed, angle, dt=0.001):\n    pass\n\ndef best_angle(speed):\n    pass\n`,
      hint: `<p>Convert degrees with <code>math.radians</code>. Split the velocity into <code>vx = speed * cos</code>, <code>vy = speed * sin</code>; only <code>vy</code> changes. For <code>best_angle</code>, use <code>max(range(1, 90), key=...)</code>.</p>`,
      solution: `import math\n\nG = 9.8\n\ndef range_formula(speed, angle):\n    return speed ** 2 * math.sin(2 * math.radians(angle)) / G\n\ndef range_sim(speed, angle, dt=0.001):\n    th = math.radians(angle)\n    x, y = 0.0, 0.0\n    vx, vy = speed * math.cos(th), speed * math.sin(th)\n    while True:\n        vy -= G * dt\n        x += vx * dt\n        y += vy * dt\n        if y < 0:\n            return x\n\ndef best_angle(speed):\n    return max(range(1, 90), key=lambda a: range_sim(speed, a, 0.001))\n`,
      tests: [
        { label: "Formula at 45°", type: "assert", code: `assert abs(range_formula(20, 45) - 400 / 9.8) < 1e-9, f"range_formula(20, 45) gave {range_formula(20, 45)}"` },
        { label: "Complementary angles", type: "assert", code: `assert abs(range_formula(25, 30) - range_formula(25, 60)) < 1e-9, "30° and 60° should give the same range"` },
        { label: "Simulation agrees with the formula", type: "assert", code: `for a in (20, 45, 70):\n    s, f = range_sim(20, a), range_formula(20, a)\n    assert abs(s - f) < 0.1, f"At {a}°, simulated {s:.3f} vs formula {f:.3f}"` },
        { label: "Best angle is 45°", type: "assert", code: `b = best_angle(15)\nassert b in (44, 45, 46), f"best_angle(15) returned {b}"`, limit: 10 }
      ]
    }
  ],
  p3: [
    {
      id: "terminal",
      title: "Terminal velocity",
      prompt: `<p>An object of mass <code>m</code> kg falls from rest with quadratic drag <em>F</em> = <em>kv</em>². Write:</p>
<ul>
  <li><code>terminal_velocity(m, k)</code>: √(<em>mg</em>/<em>k</em>), with <em>g</em> = 9.8.</li>
  <li><code>time_to_fraction(m, k, fraction, dt=0.001)</code>: simulate the fall (speed <em>v</em> ≥ 0, acceleration <em>g</em> − (<em>k</em>/<em>m</em>)<em>v</em>²) and return the time when <em>v</em> first reaches <code>fraction</code> × terminal velocity.</li>
</ul><p>The tests compare your simulated time with the exact answer derived in the lesson, <em>t</em> = (<em>v<sub>t</sub></em>/<em>g</em>) atanh(<code>fraction</code>).</p>`,
      starter: `import math\n\nG = 9.8\n\ndef terminal_velocity(m, k):\n    pass\n\ndef time_to_fraction(m, k, fraction, dt=0.001):\n    pass\n`,
      hint: `<p>Loop while <code>v &lt; fraction * vt</code>: <code>v += (G - k / m * v * v) * dt</code>; <code>t += dt</code>. The fraction must be below 1, or the loop never ends.</p>`,
      solution: `import math\n\nG = 9.8\n\ndef terminal_velocity(m, k):\n    return math.sqrt(m * G / k)\n\ndef time_to_fraction(m, k, fraction, dt=0.001):\n    vt = terminal_velocity(m, k)\n    t, v = 0.0, 0.0\n    while v < fraction * vt:\n        v += (G - k / m * v * v) * dt\n        t += dt\n    return t\n`,
      tests: [
        { label: "Skydiver's terminal velocity", type: "assert", code: `assert abs(terminal_velocity(80, 0.25) - 56.0) < 1e-6, f"Got {terminal_velocity(80, 0.25)}"` },
        { label: "Time to 95%", type: "assert", code: `t = time_to_fraction(80, 0.25, 0.95)\nexact = 56.0 / 9.8 * math.atanh(0.95)\nassert abs(t - exact) < 0.02, f"Got {t:.3f} s; expected about {exact:.3f} s"` },
        { label: "Heavier objects take longer to reach terminal speed", type: "assert", code: `assert time_to_fraction(160, 0.25, 0.9) > time_to_fraction(80, 0.25, 0.9), "A heavier object (same k) has a higher terminal velocity and takes longer to reach 90% of it"` }
      ]
    }
  ],
  p4: [
    {
      id: "collision",
      title: "Elastic collisions",
      prompt: `<p>Write <code>elastic(m1, v1, m2, v2)</code> returning the tuple of final velocities <code>(v1_after, v2_after)</code> for a one-dimensional elastic collision. Then write <code>momentum(m1, v1, m2, v2)</code> and <code>kinetic_energy(m1, v1, m2, v2)</code> returning the totals, so you can check conservation.</p>`,
      starter: `def elastic(m1, v1, m2, v2):\n    pass\n\ndef momentum(m1, v1, m2, v2):\n    pass\n\ndef kinetic_energy(m1, v1, m2, v2):\n    pass\n`,
      hint: `<p>Use the formulas in the lesson: <em>v</em>₁′ = ((<em>m</em>₁ − <em>m</em>₂)<em>v</em>₁ + 2<em>m</em>₂<em>v</em>₂)/(<em>m</em>₁ + <em>m</em>₂), and the symmetric one for <em>v</em>₂′.</p>`,
      solution: `def elastic(m1, v1, m2, v2):\n    total = m1 + m2\n    return ((m1 - m2) * v1 + 2 * m2 * v2) / total, ((m2 - m1) * v2 + 2 * m1 * v1) / total\n\ndef momentum(m1, v1, m2, v2):\n    return m1 * v1 + m2 * v2\n\ndef kinetic_energy(m1, v1, m2, v2):\n    return 0.5 * m1 * v1 ** 2 + 0.5 * m2 * v2 ** 2\n`,
      tests: [
        { label: "Equal masses swap velocities", type: "call", call: `elastic(1, 5, 1, 0)`, expect: `(0.0, 5.0)` },
        { label: "Lesson example", type: "call", call: `elastic(2, 3, 1, 0)`, expect: `(1.0, 4.0)` },
        { label: "Momentum and energy are conserved", type: "assert", code: `import random\nrng = random.Random(7)\nfor _ in range(50):\n    m1, m2 = rng.uniform(0.1, 10), rng.uniform(0.1, 10)\n    v1, v2 = rng.uniform(-10, 10), rng.uniform(-10, 10)\n    a, b = elastic(m1, v1, m2, v2)\n    assert abs(momentum(m1, v1, m2, v2) - momentum(m1, a, m2, b)) < 1e-9, "Momentum changed"\n    assert abs(kinetic_energy(m1, v1, m2, v2) - kinetic_energy(m1, a, m2, b)) < 1e-9, "Kinetic energy changed"` },
        { label: "Bouncing off a very heavy wall", type: "assert", code: `a, b = elastic(1, 4, 1e9, 0)\nassert abs(a + 4) < 1e-6 and abs(b) < 1e-6, f"A light ball hitting a huge mass should bounce back at -4; got {a}"` }
      ]
    }
  ],
  p5: [
    {
      id: "orbit",
      title: "Simulate an orbit",
      prompt: `<p>In units where <em>GM</em> = 1, write <code>orbit(vy0, dt=0.001, steps=6283)</code> that starts a body at (1, 0) with velocity (0, <code>vy0</code>), steps it with semi-implicit Euler under gravity (acceleration −<strong>r</strong>/|<strong>r</strong>|³), and returns the list of positions <code>(x, y)</code> after each step.</p><p>Then write <code>max_distance(vy0)</code> returning the largest distance from the origin reached during a simulation of 8000 steps (long enough for the far side of the orbit).</p>`,
      starter: `import math\n\ndef orbit(vy0, dt=0.001, steps=6283):\n    pass\n\ndef max_distance(vy0):\n    pass\n`,
      hint: `<p>Each step: <code>r3 = (x*x + y*y) ** 1.5</code>; <code>vx -= x / r3 * dt</code>; <code>vy -= y / r3 * dt</code>; then update <code>x</code> and <code>y</code> with the new velocity and append the position.</p>`,
      solution: `import math\n\ndef orbit(vy0, dt=0.001, steps=6283):\n    x, y, vx, vy = 1.0, 0.0, 0.0, vy0\n    path = []\n    for _ in range(steps):\n        r3 = (x * x + y * y) ** 1.5\n        vx -= x / r3 * dt\n        vy -= y / r3 * dt\n        x += vx * dt\n        y += vy * dt\n        path.append((x, y))\n    return path\n\ndef max_distance(vy0):\n    return max(math.hypot(x, y) for x, y in orbit(vy0, steps=8000))\n`,
      tests: [
        { label: "Returns one position per step", type: "assert", code: `p = orbit(1.0, steps=100)\nassert len(p) == 100 and len(p[0]) == 2, "orbit should return a list of (x, y) pairs, one per step"` },
        { label: "A circular orbit stays circular", type: "assert", code: `p = orbit(1.0)\nrs = [math.hypot(x, y) for x, y in p]\nassert max(abs(r - 1) for r in rs) < 0.01, f"Radius strayed to between {min(rs):.4f} and {max(rs):.4f}"` },
        { label: "One orbit returns to the start", type: "assert", code: `x, y = orbit(1.0)[-1]\nassert math.hypot(x - 1, y) < 0.02, f"After 2π time units the body is at ({x:.3f}, {y:.3f}), not near (1, 0)"` },
        { label: "Faster start gives an ellipse reaching about 2.57", type: "assert", code: `d = max_distance(1.2)\nassert abs(d - 2.571) < 0.03, f"max_distance(1.2) gave {d:.3f}; energy conservation predicts about 2.571"`, limit: 8 }
      ]
    }
  ],
  p6: [
    {
      id: "spring_period",
      title: "Measure a period from a simulation",
      prompt: `<p>Write <code>simulated_period(m, k, x0=1.0, dt=0.0001)</code> that releases a mass <code>m</code> on a spring <code>k</code> from rest at <code>x0</code>, simulates with semi-implicit Euler, and returns the period, measured as the time between the first two moments the mass passes through <em>x</em> = 0 moving in the <em>same</em> direction. (Hint: the first time it crosses going negative, then the next time it crosses going negative.)</p><p>Also write <code>exact_period(m, k)</code> returning 2π√(<em>m</em>/<em>k</em>).</p>`,
      starter: `import math\n\ndef simulated_period(m, k, x0=1.0, dt=0.0001):\n    pass\n\ndef exact_period(m, k):\n    pass\n`,
      hint: `<p>Track the previous <code>x</code>. A downward crossing is when the previous <code>x</code> was positive and the new one is zero or negative. Record the time of the first two such crossings and subtract.</p>`,
      solution: `import math\n\ndef simulated_period(m, k, x0=1.0, dt=0.0001):\n    x, v, t = x0, 0.0, 0.0\n    crossings = []\n    while len(crossings) < 2:\n        prev = x\n        v += -k / m * x * dt\n        x += v * dt\n        t += dt\n        if prev > 0 and x <= 0:\n            crossings.append(t)\n    return crossings[1] - crossings[0]\n\ndef exact_period(m, k):\n    return 2 * math.pi * math.sqrt(m / k)\n`,
      tests: [
        { label: "Exact period", type: "assert", code: `assert abs(exact_period(1, 4) - math.pi) < 1e-9, f"exact_period(1, 4) gave {exact_period(1, 4)}"` },
        { label: "Simulation matches theory", type: "assert", code: `for m, k in [(1, 1), (0.5, 200), (2, 8)]:\n    s, e = simulated_period(m, k), exact_period(m, k)\n    assert abs(s - e) < 0.002 * e + 1e-3, f"m={m}, k={k}: simulated {s:.4f}, exact {e:.4f}"`, limit: 10 },
        { label: "Period doesn't depend on amplitude", type: "assert", code: `a, b = simulated_period(1, 1, x0=0.1), simulated_period(1, 1, x0=5)\nassert abs(a - b) < 0.002, f"Amplitudes 0.1 and 5 gave periods {a:.4f} and {b:.4f}"`, limit: 10 }
      ]
    }
  ]
});
