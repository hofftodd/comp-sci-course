CSA.addCourse({
  id: "phys250",
  code: "PHYS 250",
  title: "Physics II: Electricity and Magnetism with Computation",
  credits: 4,
  kind: "optional",
  term: "y2s",
  summary: "The physics underneath every computer: electric charge and fields, potential and capacitors, circuits, magnetism, induction, and electromagnetic waves. As in PHYS 150, each lesson pairs the physics with Python simulations, here including solving circuits as linear systems, relaxation methods for potential, and a simulation of light itself. The recommended second science elective.",
  prereqs: ["PHYS 150 Physics I", "MATH 131 Calculus II and Multivariable Calculus", "MATH 220 Linear Algebra (or taken at the same time)"],
  outcomes: [
    "Compute electric forces and fields from charges by superposition, by hand and numerically",
    "Use electric potential and its gradient, and compute potentials numerically by relaxation",
    "Analyze DC circuits with Ohm's and Kirchhoff's laws, solving them as linear systems, and simulate RC circuits",
    "Compute magnetic forces on charges and currents, and the fields that currents make",
    "Apply Faraday's and Lenz's laws to generators, transformers and inductors",
    "Explain how Maxwell's equations predict electromagnetic waves, and simulate a wave numerically"
  ],
  rubric: {
    criteriaFor: "problem sets, simulation labs and exams",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 25, desc: "Weekly problems solved with diagrams, equations and units, drawn from each lesson's practice set." },
      { name: "Simulation labs", weight: 25, desc: "Six labs, one per lesson: the auto-graded programming problems plus a short report comparing the simulation with theory or with a measurement made with an inexpensive circuit kit." },
      { name: "Midterm exam", weight: 15, desc: "Electric fields, potential and circuits (lessons 1–3)." },
      { name: "Final exam", weight: 25, desc: "Cumulative, with emphasis on magnetism, induction and waves (lessons 4–6)." }
    ],
    criteria: [
      { name: "Physical model", desc: "Is the situation modeled correctly?", levels: [
        "Clear diagram, all charges, currents and fields identified, directions shown, assumptions stated.",
        "Correct model with a minor omission.",
        "A missing contribution or a wrong direction that changes the answer.",
        "No coherent model." ] },
      { name: "Mathematics", desc: "Is it solved correctly?", levels: [
        "Correct equations, solved symbolically before substituting numbers, with units throughout.",
        "Correct approach with a small algebra or arithmetic slip.",
        "Errors that make the answer wrong, or units missing.",
        "Incorrect or missing." ] },
      { name: "Simulation", desc: "Does the code model the physics?", levels: [
        "Correct, readable code; grid or step size justified; results validated against a known case.",
        "Works, but not validated, or the step size isn't discussed.",
        "Runs but gives physically wrong results.",
        "Doesn't run." ] },
      { name: "Sense-making", desc: "Does the answer make sense?", levels: [
        "Checks units, sign, size and limiting cases, and explains the result physically.",
        "Some checking.",
        "Accepts an implausible answer (a 1 µF capacitor storing a megajoule).",
        "No check." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Collaboration:</b> work together on problems and labs; write your own solutions, code and reports, and list who you worked with.",
      "<b>AI assistants:</b> allowed for explanations and debugging. Your lab report must explain your code and your validation in your own words.",
      "<b>Safety:</b> the lab kits use batteries of at most 9 V. Never experiment with mains electricity.",
      "<b>Units:</b> a numerical answer without units earns at most half credit."
    ]
  }
});

CSA.addUnits("phys250", [
  {
    id: "em1",
    title: "Charge and electric fields",
    minutes: 90,
    summary: "Electric charge and its conservation, Coulomb's law, superposition, the electric field and field lines, the field of a dipole, fields of continuous charge computed by summing small pieces, and Gauss's law for symmetric charge.",
    notes: `
<p>PHYS 150 was about gravity and contact forces. Nearly every other force you meet, including friction, the normal force, tension and the forces that hold atoms and molecules together, is electromagnetic underneath. So is every signal in a computer. This course studies electricity and magnetism with the same method as PHYS 150: write down the physics, and then compute what the formulas alone can't.</p>

<h3>Electric charge</h3>
<p>Matter is made of atoms: a tiny nucleus of protons and neutrons, surrounded by electrons. Protons and electrons carry <strong>electric charge</strong>, a property that comes in two kinds, called positive (protons) and negative (electrons). Like charges repel and opposite charges attract. Charge is measured in <strong>coulombs</strong> (C). Every proton has charge <em>e</em> = 1.602 × 10<sup>−19</sup> C and every electron −<em>e</em>, so ordinary objects are neutral, with equal numbers of each, and a charged object has gained or lost electrons. One coulomb is about 6.24 × 10<sup>18</sup> electrons' worth.</p>
<p>Two facts are fundamental. Charge is <strong>conserved</strong>: it can move from one object to another, but the total never changes. And charge is <strong>quantized</strong>: every free charge is a whole multiple of <em>e</em>.</p>
<p>In <strong>conductors</strong>, such as metals, some electrons are free to move through the material, which is why metals carry current. In <strong>insulators</strong>, such as glass and plastic, electrons are bound to their atoms. <strong>Semiconductors</strong> such as silicon, the material of CS 230's transistors, are in between, and their conductivity can be controlled.</p>

<h3>Coulomb's law</h3>
<p>The force between two point charges <em>q</em><sub>1</sub> and <em>q</em><sub>2</sub> a distance <em>r</em> apart has magnitude</p>
<p class="math"><em>F</em> = <em>k</em> |<em>q</em><sub>1</sub><em>q</em><sub>2</sub>| / <em>r</em>²,&nbsp;&nbsp;&nbsp;<em>k</em> = 8.99 × 10<sup>9</sup> N·m²/C²</p>
<p>and acts along the line between them: repulsive for like charges, attractive for opposite. It is an inverse-square law, exactly like Newton's gravitation in PHYS 150 Lesson 5, but enormously stronger. In a hydrogen atom, the electric attraction between the proton and the electron is about 10<sup>39</sup> times their gravitational attraction. Gravity dominates at large scales only because matter is almost perfectly neutral, so electric forces cancel. The constant is often written <em>k</em> = 1/(4π<em>ε</em><sub>0</sub>), where <em>ε</em><sub>0</sub> = 8.854 × 10<sup>−12</sup> C²/(N·m²) is the <em>permittivity of free space</em>.</p>
<p>In vector form, the force on charge 2 from charge 1 is</p>
<p class="math"><strong>F</strong> = <em>k q</em><sub>1</sub><em>q</em><sub>2</sub> <strong>r</strong> / <em>r</em>³</p>
<p>where <strong>r</strong> is the vector from charge 1 to charge 2 and <em>r</em> is its length. Dividing by <em>r</em>³ rather than <em>r</em>² makes <strong>r</strong>/<em>r</em> a unit vector, and the sign of <em>q</em><sub>1</sub><em>q</em><sub>2</sub> gives the direction automatically: positive pushes charge 2 away, negative pulls it in.</p>

<h3>Superposition</h3>
<p>With several charges, the force on one is the vector sum of the forces from each of the others, computed as if the others weren't there. This <strong>principle of superposition</strong> is an experimental fact, and it is what makes electrostatics computable: add up the contributions.</p>
<pre><code>import math

K = 8.99e9

def force_on(i, charges):
    """Net force on charges[i] from all the others; each charge is (q, x, y) in C and m."""
    qi, xi, yi = charges[i]
    fx = fy = 0.0
    for j, (qj, xj, yj) in enumerate(charges):
        if j == i:
            continue
        dx, dy = xi - xj, yi - yj
        r = math.hypot(dx, dy)
        f = K * qi * qj / r**3
        fx += f * dx
        fy += f * dy
    return fx, fy

# two +1 µC charges 1 m apart on the x-axis, and a −1 µC charge 1 m above the first
charges = [(1e-6, 0, 0), (1e-6, 1, 0), (-1e-6, 0, 1)]
fx, fy = force_on(0, charges)
print(round(fx, 5), round(fy, 5))   # -0.00899 0.00899</code></pre>
<p>Charge 0 is pushed left (−<em>x</em>) by the like charge on its right and pulled up (+<em>y</em>) by the opposite charge above it, each with magnitude <em>k</em>(10<sup>−6</sup>)²/1² = 0.00899 N.</p>

<h3>The electric field</h3>
<p>Instead of asking for the force between pairs, we can say that charges create an <strong>electric field</strong> <strong>E</strong> at every point in space, and that the field pushes on any charge placed there: <strong>F</strong> = <em>q</em><strong>E</strong>. The field at a point is the force per unit charge that a small test charge would feel there, measured in newtons per coulomb (N/C), or equivalently volts per metre (V/m, Lesson 2). A point charge <em>Q</em> makes the field</p>
<p class="math"><strong>E</strong> = <em>kQ</em> <strong>r</strong> / <em>r</em>³</p>
<p>pointing away from a positive charge and toward a negative one, with magnitude <em>kQ</em>/<em>r</em>². Fields obey superposition too. The field is more than bookkeeping: Lesson 6 shows that fields carry energy and travel as waves on their own, which is what light is.</p>
<p><strong>Field lines</strong> draw a field: curves that are tangent to <strong>E</strong> everywhere, starting on positive charges and ending on negative ones, crowded together where the field is strong. Two opposite charges close together form an <strong>electric dipole</strong>, the arrangement of charge in many molecules, including water.</p>
<figure class="fig">
<svg viewBox="0 0 440 220" width="440" role="img" aria-label="Field lines of a dipole: lines leave the positive charge on the left, curve around and enter the negative charge on the right.">
  <path class="ln" d="M150 110 L290 110"/>
  <path class="ln" d="M150 110 C 190 60, 250 60, 290 110"/>
  <path class="ln" d="M150 110 C 190 160, 250 160, 290 110"/>
  <path class="ln" d="M150 110 C 170 20, 270 20, 290 110"/>
  <path class="ln" d="M150 110 C 170 200, 270 200, 290 110"/>
  <path class="ln" d="M150 110 C 110 30, 60 40, 40 60"/>
  <path class="ln" d="M150 110 C 110 190, 60 180, 40 160"/>
  <path class="ln" d="M290 110 C 330 30, 380 40, 400 60"/>
  <path class="ln" d="M290 110 C 330 190, 380 180, 400 160"/>
  <path class="ln" d="M150 110 L40 110"/><path class="ln" d="M290 110 L400 110"/>
  <polygon class="hl" points="222,105 232,110 222,115"/>
  <polygon class="hl" points="222,73 232,77 222,81"/>
  <polygon class="hl" points="222,139 232,143 222,147"/>
  <polygon class="hl" points="70,105 60,110 70,115"/>
  <polygon class="hl" points="380,105 370,110 380,115"/>
  <circle class="box" cx="150" cy="110" r="14"/><text class="text" x="150" y="115" text-anchor="middle">+</text>
  <circle class="box" cx="290" cy="110" r="14"/><text class="text" x="290" y="115" text-anchor="middle">−</text>
</svg>
<figcaption>Field lines of a dipole. They leave the positive charge and end on the negative one; the arrows show the direction of <strong>E</strong>, the push on a positive test charge.</figcaption>
</figure>
<p>Here is the field computed by superposition, used to check a result you can derive by hand: on the line through a dipole, far away, the field falls off as 1/<em>r</em>³, faster than a single charge's 1/<em>r</em>², because the two charges' fields nearly cancel.</p>
<pre><code>def field(x, y, charges):
    ex = ey = 0.0
    for q, cx, cy in charges:
        dx, dy = x - cx, y - cy
        r = math.hypot(dx, dy)
        ex += K * q * dx / r**3
        ey += K * q * dy / r**3
    return ex, ey

d = 0.01                                   # charges 1 cm apart
dipole = [(1e-9, -d / 2, 0), (-1e-9, d / 2, 0)]
for x in (1.0, 2.0, 4.0):
    ex, ey = field(x, 0, dipole)
    print(x, f"{ex:.4g}")
# 1.0 -0.1798
# 2.0 -0.02248
# 4.0 -0.002809</code></pre>
<p>Each doubling of the distance divides the field by 8 = 2³. (The field on this line points in −<em>x</em>, toward the negative charge, which is nearer.) Here is the hand derivation. At a point <em>x</em> on the axis, to the right of both charges, the +<em>q</em> at −<em>d</em>/2 pushes in +<em>x</em> with <em>kq</em>/(<em>x</em> + <em>d</em>/2)², and the −<em>q</em> at +<em>d</em>/2 pulls in −<em>x</em> with <em>kq</em>/(<em>x</em> − <em>d</em>/2)². Over a common denominator,</p>
<p class="math"><em>E<sub>x</sub></em> = <em>kq</em> [(<em>x</em> − <em>d</em>/2)² − (<em>x</em> + <em>d</em>/2)²] / (<em>x</em>² − <em>d</em>²/4)² = −2<em>kqdx</em> / (<em>x</em>² − <em>d</em>²/4)²</p>
<p>since the squares in the bracket differ by 2<em>xd</em>. Far away, <em>x</em> ≫ <em>d</em>, the <em>d</em>²/4 is negligible beside <em>x</em>², the denominator is <em>x</em>⁴, and <em>E<sub>x</sub></em> ≈ −2<em>kp</em>/<em>x</em>³, where <em>p</em> = <em>qd</em> is the <em>dipole moment</em>. Here <em>p</em> = 10<sup>−9</sup> × 0.01 = 10<sup>−11</sup> C·m, and 2 × 8.99 × 10<sup>9</sup> × 10<sup>−11</sup> = 0.1798, the value printed at <em>x</em> = 1.</p>

<h3>Continuous charge: sum the pieces</h3>
<p>Real charge is often spread over a wire or a surface. The method is the one MATH 131 used for integrals: chop the charge into small pieces, treat each as a point charge, and add up their fields. As the pieces shrink, the sum becomes an integral. For a ring of radius <em>R</em> carrying total charge <em>Q</em>, the field on its axis at height <em>z</em> works out by integration to</p>
<p class="math"><em>E<sub>z</sub></em> = <em>kQz</em> / (<em>z</em>² + <em>R</em>²)<sup>3/2</sup></p>
<p>(by symmetry the sideways parts cancel). The sum gives the same answer without any integration, and works for shapes with no formula:</p>
<pre><code>def ring_field_z(Q, R, z, n=1000):
    ez = 0.0
    for i in range(n):
        a = 2 * math.pi * i / n
        x, y = R * math.cos(a), R * math.sin(a)   # piece position; the point is (0, 0, z)
        r = math.sqrt(x**2 + y**2 + z**2)
        ez += K * (Q / n) * z / r**3
    return ez

Q, R, z = 1e-9, 0.1, 0.05
print(f"{ring_field_z(Q, R, z):.5g}", f"{K * Q * z / (z**2 + R**2) ** 1.5:.5g}")   # 321.64 321.64</code></pre>
<p>At the ring's centre (<em>z</em> = 0) the field is zero, since every piece is balanced by the one opposite it, and far away (<em>z</em> ≫ <em>R</em>) the formula becomes <em>kQ</em>/<em>z</em>², the field of a point charge, as it must.</p>

<h3>Gauss's law</h3>
<p>For very symmetric charge, a shortcut exists. <strong>Gauss's law</strong> says that the total <em>flux</em> of <strong>E</strong> out through any closed surface, roughly the number of field lines crossing it, counted positive outward, equals the charge enclosed divided by <em>ε</em><sub>0</sub>. To compute flux, split the surface into small patches: through a flat patch of area <em>A</em> where the field is uniform, the flux is the field's component perpendicular to the patch times <em>A</em>, which is <em>EA</em> cos <em>θ</em> with <em>θ</em> the angle between <strong>E</strong> and the outward perpendicular. Add the patches. A field running along a surface (<em>θ</em> = 90°) puts no flux through it; a field straight through it gives <em>EA</em>. Field lines start and end only on charges, so the lines leaving a closed surface count the charge inside. For a sphere of radius <em>r</em> around a point charge <em>Q</em>, the field is the same size <em>E</em> everywhere on it and points straight out, so the flux is <em>E</em> times the area 4π<em>r</em>². Setting that equal to <em>Q</em>/<em>ε</em><sub>0</sub> gives <em>E</em> = <em>Q</em>/(4π<em>ε</em><sub>0</sub><em>r</em>²), which is Coulomb's law again.</p>
<p>The same argument proves two useful facts. Outside any spherically symmetric ball of charge, the field is the same as if all the charge were at the centre (the same result Newton proved for gravity). And in a conductor at rest, the field inside is zero: otherwise free charges would keep moving. Now draw any closed surface lying entirely inside the metal. The field is zero at every point of it, so the flux out of it is zero, and by Gauss's law it encloses no net charge. Such a surface can be drawn around any region of the interior, as close to the outer surface as you like, so no part of the interior holds net charge. Any extra charge on a conductor must therefore sit on its surface, and a closed metal box shields its inside from outside electric fields. This <em>Faraday cage</em> is why cars protect passengers from lightning, and why phones lose signal in metal-walled lifts.</p>
`,
    terms: [
      ["Electric charge", "A property of particles, positive or negative, measured in coulombs; like charges repel, opposite charges attract."],
      ["Elementary charge e", "1.602 × 10⁻¹⁹ C, the charge of a proton; an electron has −e."],
      ["Conservation of charge", "The total charge of an isolated system never changes."],
      ["Conductor", "A material in which charges can move freely, such as a metal."],
      ["Insulator", "A material in which charges are bound in place."],
      ["Coulomb's law", "The force between point charges: F = k|q₁q₂|/r², along the line between them."],
      ["Superposition", "The net force or field from several charges is the vector sum of each one's contribution."],
      ["Electric field", "Force per unit charge, E = F/q, created by charges at every point in space; units N/C or V/m."],
      ["Field line", "A curve tangent to the field everywhere, from positive to negative charge."],
      ["Electric dipole", "Two equal and opposite charges a small distance apart; its far field falls off as 1/r³."],
      ["Gauss's law", "The electric flux out of a closed surface equals the enclosed charge divided by ε₀."],
      ["Faraday cage", "A conducting enclosure, inside which outside electric fields are cancelled."]
    ],
    quiz: [
      { q: "Two charges are moved from 1 m apart to 3 m apart. By what factor does the force between them change?", choices: ["1/3", "1/9", "3", "9"], answer: 1, why: "Inverse square: (1/3)² = 1/9." },
      { q: "A balloon rubbed on hair gains −8 × 10⁻⁹ C. About how many extra electrons is that?", choices: ["5 × 10¹⁰", "8 × 10⁹", "1.3 × 10⁻²⁷", "5 × 10²⁸"], answer: 0, why: "8 × 10⁻⁹ / 1.602 × 10⁻¹⁹ ≈ 5 × 10¹⁰." },
      { q: "An electron is placed where the electric field points east. Which way is the force on it?", choices: ["East", "West", "North", "No force"], answer: 1, why: "F = qE with q negative: opposite to E." },
      { q: "How does the far field of a dipole fall off along its axis?", choices: ["1/r", "1/r²", "1/r³", "It doesn't"], answer: 2, why: "The two charges' fields nearly cancel, leaving 1/r³." },
      { q: "What is the electric field inside a solid metal object in equilibrium?", choices: ["The same as outside", "Zero", "Infinite", "Twice the outside field"], answer: 1, why: "Otherwise its free charges would move." },
      { q: "What is the field at the centre of a uniformly charged ring?", choices: ["kQ/R²", "Zero", "kQ/R", "2kQ/R²"], answer: 1, why: "Each piece's field is cancelled by the opposite piece's." }
    ],
    practice: [
      {
        q: `<p>Charges +2 µC at (0, 0) and −3 µC at (4 cm, 0). Find the force on the second charge (magnitude and direction), and the electric field at (2 cm, 0), halfway between.</p>`,
        a: `<p>Force: <em>k</em>(2 × 10<sup>−6</sup>)(3 × 10<sup>−6</sup>)/(0.04)² = 8.99 × 10<sup>9</sup> × 6 × 10<sup>−12</sup>/0.0016 ≈ 33.7 N, attractive, so pointing in −<em>x</em> (toward the first charge). Field at the midpoint: the +2 µC charge contributes <em>k</em>(2 × 10<sup>−6</sup>)/(0.02)² ≈ 4.50 × 10<sup>7</sup> N/C pointing +<em>x</em> (away from it); the −3 µC charge contributes <em>k</em>(3 × 10<sup>−6</sup>)/(0.02)² ≈ 6.74 × 10<sup>7</sup> N/C, also pointing +<em>x</em> (toward it). Total ≈ 1.12 × 10<sup>8</sup> N/C in +<em>x</em>. Check with <code>field(0.02, 0, [(2e-6, 0, 0), (-3e-6, 0.04, 0)])</code>.</p>`
      },
      {
        q: `<p>Compare the electric and gravitational forces between a proton and an electron in hydrogen (<em>r</em> = 5.3 × 10<sup>−11</sup> m). Use <em>G</em> = 6.674 × 10<sup>−11</sup> N·m²/kg², <em>m</em><sub>p</sub> = 1.673 × 10<sup>−27</sup> kg and <em>m</em><sub>e</sub> = 9.109 × 10<sup>−31</sup> kg. Does the ratio depend on <em>r</em>?</p>`,
        a: `<p>Electric: <em>ke</em>²/<em>r</em>² = 8.99 × 10<sup>9</sup> × (1.602 × 10<sup>−19</sup>)²/(5.3 × 10<sup>−11</sup>)² ≈ 8.2 × 10<sup>−8</sup> N. Gravitational: <em>Gm</em><sub>p</sub><em>m</em><sub>e</sub>/<em>r</em>² ≈ 3.6 × 10<sup>−47</sup> N. Ratio ≈ 2.3 × 10<sup>39</sup>. Both forces are inverse-square, so the ratio <em>ke</em>²/(<em>Gm</em><sub>p</sub><em>m</em><sub>e</sub>) doesn't depend on <em>r</em> at all.</p>`
      },
      {
        q: `<p>Use <code>ring_field_z</code> to find the height <em>z</em> above the ring (<em>R</em> = 0.1 m) at which the axial field is strongest. Then confirm by setting the derivative of <em>z</em>/(<em>z</em>² + <em>R</em>²)<sup>3/2</sup> to zero.</p>`,
        a: `<p>Scanning <em>z</em> from 0 to 0.3 m in small steps finds the maximum near 0.0707 m. The derivative is ((<em>z</em>² + <em>R</em>²) − 3<em>z</em>²)/(<em>z</em>² + <em>R</em>²)<sup>5/2</sup>, which is zero when <em>R</em>² = 2<em>z</em>², so <em>z</em> = <em>R</em>/√2 ≈ 0.0707 m.</p>
<pre><code>best = max((ring_field_z(1e-9, 0.1, z / 10000, n=200), z / 10000) for z in range(1, 3000))
print(best[1])   # 0.0707</code></pre>`
      },
      {
        q: `<p>A hollow metal sphere has +5 nC placed on it. Where does the charge go? What is the field at the centre, and at 1 m from the centre (outside the sphere)?</p>`,
        a: `<p>The charge spreads evenly over the outer surface (in a conductor, excess charge sits on the surface). Inside, the field is zero: a Gaussian sphere inside encloses no charge, and by symmetry the field would have to be the same size all over it. Outside, the field is as if all the charge were at the centre: <em>kQ</em>/<em>r</em>² = 8.99 × 10<sup>9</sup> × 5 × 10<sup>−9</sup>/1 ≈ 45 N/C, pointing outward.</p>`
      }
    ],
    sources: ["openstaxphys2", "feynman2"]
  },
  {
    id: "em2",
    title: "Potential and capacitance",
    minutes: 90,
    summary: "Electric potential energy and potential (voltage), potential of point charges by superposition, the field as minus the gradient of the potential, equipotentials, computing potential numerically by relaxation, conductors, and capacitors and the energy they store.",
    notes: `
<p>Fields are vectors, and adding vectors is work. This lesson introduces a single number at each point, the <em>potential</em>, from which the field can be recovered, and which is what a voltmeter measures and what a computer's logic levels are.</p>

<h3>Potential energy and potential</h3>
<p>PHYS 150 Lesson 4 showed that for a conservative force, such as gravity, work can be stored as potential energy. The electric force between charges is conservative too: the work done moving a charge from one point to another doesn't depend on the path. Two point charges have <strong>electric potential energy</strong></p>
<p class="math"><em>U</em> = <em>kq</em><sub>1</sub><em>q</em><sub>2</sub> / <em>r</em></p>
<p>measured from zero at infinite separation. It is positive for like charges (you must push them together) and negative for opposite charges (they are bound).</p>
<p>The <strong>electric potential</strong> <em>V</em> at a point is the potential energy per unit charge that a test charge would have there: <em>U</em> = <em>qV</em>. Its unit is the <strong>volt</strong>, one joule per coulomb. A point charge <em>Q</em> makes the potential</p>
<p class="math"><em>V</em> = <em>kQ</em> / <em>r</em></p>
<p>and, by superposition, several charges make the sum of their potentials. Because potential is a number, not a vector, this sum is much simpler than adding fields. Only <em>differences</em> in potential matter physically, like differences in height. A 9 V battery keeps one terminal 9 V above the other; moving charge <em>q</em> from the low terminal to the high one through the battery takes work <em>q</em> × 9 V, which the battery's chemistry supplies.</p>
<p>A convenient energy unit for single particles is the <strong>electron-volt</strong> (eV), the energy an electron gains falling through 1 V: 1.602 × 10<sup>−19</sup> J. Chemical bonds are a few eV; a 1.0 V signal in a chip moves each electron through 1 eV.</p>

<h3>From potential to field</h3>
<p>Potential is to the field as height is to slope. Moving a small distance <em>dx</em> along the field lowers the potential by <em>E dx</em>, so in one dimension <em>E<sub>x</sub></em> = −<em>dV</em>/<em>dx</em>. In two or three dimensions, using MATH 131 Lesson 7's gradient,</p>
<p class="math"><strong>E</strong> = −∇<em>V</em> = −(∂<em>V</em>/∂<em>x</em>, ∂<em>V</em>/∂<em>y</em>, ∂<em>V</em>/∂<em>z</em>)</p>
<p>The field points downhill in potential, in the direction of steepest descent, and its size is the steepness. This is why the field's units, N/C, equal V/m. (CS students have met this direction before: MATH 131's gradient descent walks in the direction of −∇, which is the way a positive charge is pushed.) Here is the field recovered numerically from a potential, with the central differences of MATH 131 Lesson 3:</p>
<pre><code>import math

K = 8.99e9

def potential(x, y, charges):
    return sum(K * q / math.hypot(x - cx, y - cy) for q, cx, cy in charges)

def field_from_potential(x, y, charges, h=1e-6):
    ex = -(potential(x + h, y, charges) - potential(x - h, y, charges)) / (2 * h)
    ey = -(potential(x, y + h, charges) - potential(x, y - h, charges)) / (2 * h)
    return ex, ey

one = [(1e-9, 0, 0)]                        # 1 nC at the origin
print(round(potential(0.5, 0, one), 3))     # 17.98
ex, ey = field_from_potential(0.5, 0, one)
print(round(ex, 3), round(K * 1e-9 / 0.5**2, 3))   # 35.96 35.96</code></pre>
<p><strong>Equipotentials</strong> are surfaces (curves, in a 2D picture) of constant potential, like contour lines on a map. The field is always perpendicular to them, as the gradient is perpendicular to contour lines, and no work is done moving a charge along one. Around a point charge they are spheres. The surface of a conductor in equilibrium is always an equipotential, since the field has no component along it.</p>

<h3>Computing potential by relaxation</h3>
<p>Often you don't know where the charges are, only the potentials of some conductors: a chip's wires held at 0 V and 1 V, say, or the plates of a device. In the empty space between them, the potential obeys an equation that comes from Gauss's law. Take a tiny box of sides <em>dx</em> and <em>dy</em> (in a 2D picture) containing no charge. On the right and left faces only <em>E<sub>x</sub></em> is perpendicular to the face (Lesson 1's rule), so the flux out through them is [<em>E<sub>x</sub></em>(<em>x</em> + <em>dx</em>) − <em>E<sub>x</sub></em>(<em>x</em>)] <em>dy</em> ≈ (∂<em>E<sub>x</sub></em>/∂<em>x</em>) <em>dx dy</em>, and through its top and bottom (∂<em>E<sub>y</sub></em>/∂<em>y</em>) <em>dx dy</em>. With no charge inside the total is zero, so ∂<em>E<sub>x</sub></em>/∂<em>x</em> + ∂<em>E<sub>y</sub></em>/∂<em>y</em> = 0, and substituting <em>E<sub>x</sub></em> = −∂<em>V</em>/∂<em>x</em>, <em>E<sub>y</sub></em> = −∂<em>V</em>/∂<em>y</em> gives <strong>Laplace's equation</strong>:</p>
<p class="math">∂²<em>V</em>/∂<em>x</em>² + ∂²<em>V</em>/∂<em>y</em>² = 0</p>
<p>Its meaning is simple, and gives a way to compute it: <em>the potential at each point is the average of the potential around it</em>. To see why, put the potential on a grid of spacing <em>h</em>. The second derivative is the change in the slope: the slope just right of a point is (<em>V</em><sub>right</sub> − <em>V</em>)/<em>h</em> and just left of it is (<em>V</em> − <em>V</em><sub>left</sub>)/<em>h</em>, so</p>
<p class="math">∂²<em>V</em>/∂<em>x</em>² ≈ (<em>V</em><sub>right</sub> − 2<em>V</em> + <em>V</em><sub>left</sub>) / <em>h</em>²</p>
<p>and the same in <em>y</em> with the points above and below. Adding the two and setting the sum to zero gives <em>V</em><sub>right</sub> + <em>V</em><sub>left</sub> + <em>V</em><sub>up</sub> + <em>V</em><sub>down</sub> − 4<em>V</em> = 0: each point's value is the average of its four neighbours. (Check with <em>V</em> = <em>x</em>² − <em>y</em>², which satisfies Laplace's equation: at (0.3, 0.2) it is 0.05, and its four neighbours at spacing 0.1 have values 0.12, 0, 0 and 0.08, whose average is 0.05.) If a point were higher than the average of its surroundings, the curvatures would add to something negative, not zero.</p>
<p>The <strong>relaxation method</strong> (Jacobi's method) starts from any guess, holds the boundary points fixed, and repeatedly replaces every interior value by the average of its neighbours until nothing changes much. Each sweep spreads information from the boundaries inward, and the values settle on the solution:</p>
<pre><code>def relax(grid, fixed, sweeps):
    """grid: list of rows of potentials; fixed: set of (row, col) whose values never change."""
    rows, cols = len(grid), len(grid[0])
    for _ in range(sweeps):
        new = [row[:] for row in grid]
        for i in range(1, rows - 1):
            for j in range(1, cols - 1):
                if (i, j) not in fixed:
                    new[i][j] = (grid[i - 1][j] + grid[i + 1][j] + grid[i][j - 1] + grid[i][j + 1]) / 4
        grid = new
    return grid

# a 1 cm square box, 21 x 21 grid: the top edge at 10 V, the other three edges at 0 V
n = 21
grid = [[10.0 if i == 0 else 0.0 for j in range(n)] for i in range(n)]
for j in (0, n - 1):
    for i in range(1, n):
        grid[i][j] = 0.0
fixed = {(i, j) for i in range(n) for j in range(n) if i in (0, n - 1) or j in (0, n - 1)}
v = relax(grid, fixed, 2000)
print(round(v[n // 2][n // 2], 3))   # 2.5</code></pre>
<p>The centre settles at 2.5 V. There's a neat check: by symmetry, if each of the four sides in turn were at 10 V with the others at 0 V, the four solutions would be rotations of each other with the same centre value. Adding them (superposition again) gives a box with all four sides at 10 V, whose potential is 10 V everywhere. So the centre value must be 10/4 = 2.5 V. The same method, with smarter variants that converge faster, is used to design chips, capacitors and particle detectors, and to solve heat-flow problems governed by the same equation.</p>

<h3>Capacitors</h3>
<p>A <strong>capacitor</strong> is two conductors separated by an insulator, used to store charge and energy. Put charge +<em>Q</em> on one and −<em>Q</em> on the other, and a potential difference <em>V</em> appears between them, proportional to <em>Q</em>. The ratio is the <strong>capacitance</strong>:</p>
<p class="math"><em>C</em> = <em>Q</em> / <em>V</em></p>
<p>measured in <strong>farads</strong> (F, coulombs per volt). A farad is huge; typical capacitors are microfarads (µF, 10<sup>−6</sup> F) to picofarads (pF, 10<sup>−12</sup> F). For two parallel plates of area <em>A</em> a small distance <em>d</em> apart, the charges attract each other onto the plates' facing surfaces, each spread evenly with <em>Q</em>/<em>A</em> per square metre. Away from the edges, the plates look infinite from any point between them, so by symmetry the field there points straight across the gap. Apply Gauss's law to a small closed box of face area <em>a</em>, with one face inside the metal of the positive plate (where the field is zero), the opposite face in the gap, and its sides parallel to the field. Only the face in the gap has flux through it, <em>Ea</em> (the field is zero at the face in the metal and runs along the sides, so they add nothing), and the box encloses charge (<em>Q</em>/<em>A</em>)<em>a</em>. So <em>Ea</em> = <em>Qa</em>/(<em>ε</em><sub>0</sub><em>A</em>), and</p>
<p class="math"><em>E</em> = <em>Q</em> / (<em>ε</em><sub>0</sub><em>A</em>)</p>
<p>whichever point of the gap the face is at: the field is uniform. Then <em>V</em> = <em>Ed</em> and</p>
<p class="math"><em>C</em> = <em>ε</em><sub>0</sub><em>A</em> / <em>d</em></p>
<p>Bigger plates and a smaller gap store more charge per volt. Filling the gap with an insulator (a <strong>dielectric</strong>), whose molecules are polarized by the field into small dipoles that partly cancel it, multiplies <em>C</em> by the material's dielectric constant κ, which is about 4 for glass and 80 for water.</p>
<p>Capacitors are often combined. Two capacitors in <strong>parallel</strong>, each connected across the same two points, have the same voltage <em>V</em>, and their charges add: <em>Q</em> = <em>C</em><sub>1</sub><em>V</em> + <em>C</em><sub>2</sub><em>V</em>, so the pair acts as one capacitor with <em>C</em> = <em>C</em><sub>1</sub> + <em>C</em><sub>2</sub> (it is like one capacitor with the plate areas added). Two in <strong>series</strong>, one after the other, carry the same charge: the plate joining them to each other was neutral and nothing can reach it, so if +<em>Q</em> arrives on one side of the chain, −<em>Q</em> and +<em>Q</em> separate on that middle piece, and every capacitor holds ±<em>Q</em>. Their voltages add: <em>V</em> = <em>Q</em>/<em>C</em><sub>1</sub> + <em>Q</em>/<em>C</em><sub>2</sub>, so 1/<em>C</em> = 1/<em>C</em><sub>1</sub> + 1/<em>C</em><sub>2</sub>. Two equal capacitors in series have half the capacitance of one, like a single capacitor with twice the gap.</p>
<p>Charging a capacitor takes work, because each new bit of charge is pushed against the voltage already there. The voltage rises from 0 to <em>V</em> as the charge builds up, so the average voltage during charging is <em>V</em>/2, and the stored energy is</p>
<p class="math"><em>U</em> = ½<em>QV</em> = ½<em>CV</em>²</p>
<pre><code>EPS0 = 8.854e-12

def parallel_plate(area, gap, kappa=1.0):
    return kappa * EPS0 * area / gap

C = parallel_plate(0.01, 1e-3)   # 10 cm x 10 cm plates, 1 mm apart, air
print(f"{C:.3g} F")               # 8.85e-11 F
print(f"{0.5 * C * 100**2:.3g} J at 100 V")   # 4.43e-07 J at 100 V</code></pre>
<p>Capacitors are everywhere in computers. Every wire and transistor gate on a chip has a small capacitance that must be charged to switch a signal from 0 to 1, which is why switching costs energy. Charging a capacitance <em>C</em> to <em>V</em> moves charge <em>Q</em> = <em>CV</em> out of a supply at voltage <em>V</em>, which costs the supply <em>QV</em> = <em>CV</em>². Only half of that, ½<em>CV</em>², ends up stored; by conservation of energy, the other half must have become heat in the transistors and wires the current flowed through. Switching back to 0 discharges the capacitor and turns the stored ½<em>CV</em>² into heat as well. So each charge-and-discharge cycle costs <em>CV</em>², and a node that does this <em>f</em> times a second uses power of about <em>CV</em>²<em>f</em>. Near the end of the term, CS 230 Lesson 8 uses this <em>dynamic power</em> formula to explain why clock speeds stopped rising. A DRAM memory cell stores each bit as charge on a capacitor of a few femtofarads (10<sup>−15</sup> F), which leaks away and must be refreshed every few milliseconds.</p>
`,
    terms: [
      ["Electric potential energy", "Energy stored in an arrangement of charges: U = kq₁q₂/r for two point charges."],
      ["Electric potential (voltage)", "Potential energy per unit charge, V = U/q, in volts (J/C)."],
      ["Volt", "One joule per coulomb."],
      ["Electron-volt (eV)", "The energy gained by an electron moving through 1 V: 1.602 × 10⁻¹⁹ J."],
      ["E = −∇V", "The field points in the direction of steepest decrease of the potential, with size equal to the steepness."],
      ["Equipotential", "A surface on which the potential is constant; the field is perpendicular to it."],
      ["Laplace's equation", "The equation potential obeys where there is no charge: each value is the average of its surroundings."],
      ["Relaxation method", "Solving Laplace's equation on a grid by repeatedly replacing each value with the average of its neighbours."],
      ["Capacitor", "Two conductors separated by an insulator, storing equal and opposite charges."],
      ["Capacitance", "C = Q/V, in farads."],
      ["Dielectric", "An insulator placed between a capacitor's plates, increasing its capacitance by a factor κ."],
      ["Capacitor energy", "U = ½CV²."]
    ],
    quiz: [
      { q: "An electron moves from a point at 0 V to a point at +5 V. What happens to its potential energy?", choices: ["It rises by 5 eV", "It falls by 5 eV", "It doesn't change", "It rises by 5 J"], answer: 1, why: "U = qV with q = −e: a rise in V lowers its energy by 5 eV." },
      { q: "The potential along x is V(x) = 20 − 4x volts (x in metres). What is the field?", choices: ["4 V/m in +x", "4 V/m in −x", "20 V/m", "Zero"], answer: 0, why: "E = −dV/dx = +4 V/m." },
      { q: "How is the electric field oriented relative to an equipotential surface?", choices: ["Parallel to it", "Perpendicular to it", "At 45°", "It depends on the charge"], answer: 1, why: "No work is done moving along an equipotential, so E has no component along it." },
      { q: "The gap between a capacitor's plates is halved, with the same area. Its capacitance:", choices: ["halves", "doubles", "quadruples", "doesn't change"], answer: 1, why: "C = ε₀A/d." },
      { q: "A capacitor's voltage is doubled. Its stored energy:", choices: ["doubles", "quadruples", "halves", "doesn't change"], answer: 1, why: "U = ½CV²." },
      { q: "In the relaxation method, what is each interior grid value replaced by?", choices: ["The largest neighbour", "The average of its four neighbours", "Zero", "The boundary value"], answer: 1, why: "That is Laplace's equation on a grid." }
    ],
    practice: [
      {
        q: `<p>Charges +4 nC at (0, 0) and −4 nC at (6 cm, 0). Find the potential at (3 cm, 0) and at (3 cm, 4 cm). How much work does it take to bring a +1 nC charge from far away to (3 cm, 4 cm)?</p>`,
        a: `<p>At (3 cm, 0) both charges are 3 cm away with opposite signs, so the potentials cancel: <em>V</em> = 0. At (3 cm, 4 cm) both are 5 cm away: again <em>V</em> = 0. (The whole perpendicular bisector of a dipole is an equipotential at 0 V.) The work is <em>qV</em> = 0, even though the field there is not zero: zero potential doesn't mean zero field.</p>`
      },
      {
        q: `<p>Modify the relaxation example so that the top edge is at 10 V and the bottom at −10 V, with the sides at 0 V. Predict the centre value before running it.</p>`,
        a: `<p>By superposition, this is the original box (top at 10 V) plus a copy turned upside down with −10 V on the bottom. The first contributes 2.5 V at the centre and the second −2.5 V, so the centre is 0 V. Running the code confirms it. By symmetry the whole horizontal centre line is at 0 V.</p>`
      },
      {
        q: `<p>A DRAM cell's capacitor is 25 fF and is charged to 1.0 V. How many electrons does it store, and how much energy? If it must be refreshed every 64 ms, what average power must the supply provide to 8 × 10<sup>9</sup> cells just for refresh, assuming each refresh recharges an empty cell? (Count what the supply pays per recharge, not only what ends up stored.)</p>`,
        a: `<p><em>Q</em> = <em>CV</em> = 25 × 10<sup>−15</sup> C, or 25 × 10<sup>−15</sup>/1.602 × 10<sup>−19</sup> ≈ 156,000 electrons. <em>U</em> = ½<em>CV</em>² = 1.25 × 10<sup>−14</sup> J. Recharging a cell costs the supply <em>CV</em>² = 2.5 × 10<sup>−14</sup> J, twice the stored energy, since the other half becomes heat. For 8 × 10<sup>9</sup> cells, 2.0 × 10<sup>−4</sup> J per refresh cycle; divided by 0.064 s, about 3.1 mW, of which half (1.6 mW) is the stored energy and half is heat in the wires and transistors. (Real refresh costs more, because the circuits that read and rewrite the cells use energy too.)</p>`
      },
      {
        q: `<p>Use <code>field_from_potential</code> to find the field at (3 cm, 4 cm) for the dipole in the first problem. Which way does it point, and why is that consistent with <em>V</em> = 0 there?</p>`,
        a: `<p>Running <code>field_from_potential(0.03, 0.04, [(4e-9, 0, 0), (-4e-9, 0.06, 0)])</code> gives about (1.73 × 10<sup>4</sup>, 0) N/C: pointing in +<em>x</em>, from the positive charge's side toward the negative's, and perpendicular to the bisector, which is the 0 V equipotential. Moving along the bisector costs no work, but crossing it does.</p>`
      }
    ],
    sources: ["openstaxphys2", "feynman2"]
  },
  {
    id: "em3",
    title: "Current and circuits",
    minutes: 90,
    summary: "Electric current, resistance and Ohm's law, power, series and parallel resistors, Kirchhoff's laws and solving circuits as linear systems with nodal analysis, and RC circuits: charging, discharging, the time constant, and why it limits how fast a chip can switch.",
    notes: `
<p>A <strong>current</strong> is a flow of charge, measured in <strong>amperes</strong> (A, coulombs per second): <em>I</em> = <em>dQ</em>/<em>dt</em>. By convention, current flows from high potential to low, the direction positive charge would move, even though in metal wires the moving charges are electrons going the other way. (Benjamin Franklin chose the signs before electrons were known.)</p>

<h3>Resistance and Ohm's law</h3>
<p>Pushing current through a material takes a potential difference, because the moving electrons keep colliding with the material's atoms. For many materials, including metals at a steady temperature, the current is proportional to the voltage. That is <strong>Ohm's law</strong>:</p>
<p class="math"><em>V</em> = <em>IR</em></p>
<p>where <em>R</em> is the <strong>resistance</strong>, in <strong>ohms</strong> (Ω, volts per ampere). A wire of length <em>L</em> and cross-sectional area <em>A</em> has <em>R</em> = <em>ρL</em>/<em>A</em>, where the <em>resistivity</em> <em>ρ</em> is a property of the material: about 1.7 × 10<sup>−8</sup> Ω·m for copper, and around 10<sup>16</sup> Ω·m for glass. Components made to have a particular resistance are <strong>resistors</strong>. Not everything obeys Ohm's law, and that is what makes some components useful. A <strong>diode</strong> conducts easily in one direction and almost not at all in the other, a one-way valve for current. A transistor's resistance between two of its terminals is set by the voltage on a third, its control input: low when it is on, very high when it is off. CS 230 treats this as a switch, closed or open; when a closed switch passes current it behaves roughly as a resistance, which is how this lesson's RC section models it.</p>
<p>The electrons themselves drift slowly, typically a fraction of a millimetre per second, but a signal travels along a wire at a large fraction of the speed of light, because the field that pushes them is set up along the whole wire almost at once (Lesson 6).</p>

<h3>Power</h3>
<p>Moving charge <em>Q</em> through a potential difference <em>V</em> takes energy <em>QV</em>, so the rate of energy delivery is</p>
<p class="math"><em>P</em> = <em>IV</em> = <em>I</em>²<em>R</em> = <em>V</em>²/<em>R</em></p>
<p>in watts. In a resistor, this energy becomes heat. That heating is how toasters work, and why chips need cooling.</p>

<h3>Series and parallel</h3>
<p>Resistors in <strong>series</strong>, one after another, carry the same current, and their voltages add, so their resistances add: <em>R</em> = <em>R</em><sub>1</sub> + <em>R</em><sub>2</sub> + …. Resistors in <strong>parallel</strong>, side by side between the same two points, have the same voltage, and their currents add, so their <em>conductances</em> 1/<em>R</em> add: 1/<em>R</em> = 1/<em>R</em><sub>1</sub> + 1/<em>R</em><sub>2</sub> + …. Two equal resistors in parallel have half the resistance of one, because there are twice as many paths. The parallel combination is always less than the smallest of the resistors. Household appliances are wired in parallel, so each gets the full supply voltage whatever the others are doing.</p>

<h3>Kirchhoff's laws</h3>
<p>Circuits that aren't just series and parallel combinations need two general laws.</p>
<ul>
<li><strong>The junction rule</strong> (current law): the total current flowing into any junction equals the total flowing out. This is conservation of charge: charge doesn't pile up at a point.</li>
<li><strong>The loop rule</strong> (voltage law): around any closed loop, the potential differences add to zero. This is conservation of energy: a charge that goes round and returns to its starting point has the same potential it started with.</li>
</ul>
<p>Together they give enough linear equations to find every current, which is a job for MATH 220 Lesson 2. The most systematic method is <strong>nodal analysis</strong>. Choose one node (a junction, with the wires joined to it) as ground, at 0 V, and treat the other nodes' potentials as the unknowns. For each unknown node, the junction rule says that the currents flowing out through its resistors, each (<em>V</em><sub>node</sub> − <em>V</em><sub>neighbour</sub>)/<em>R</em> by Ohm's law, add to zero: whatever flows in through one resistor flows out through the others. (If a current source fed a known current into the node, the sum would equal that current instead; this lesson's circuits have none, so the sum is always 0.) That is one linear equation per node.</p>
<figure class="fig">
<svg viewBox="0 0 460 210" width="460" role="img" aria-label="Circuit: a 10 V source feeds node A through 1 kilohm; node A connects to ground through 2 kilohm and to node B through 1 kilohm; node B connects to ground through 1 kilohm.">
  <line class="ln" x1="40" y1="40" x2="90" y2="40"/>
  <rect class="box" x="90" y="28" width="70" height="24"/><text class="text m" x="125" y="45" text-anchor="middle">1 kΩ</text>
  <line class="ln" x1="160" y1="40" x2="260" y2="40"/>
  <rect class="box" x="260" y="28" width="70" height="24"/><text class="text m" x="295" y="45" text-anchor="middle">1 kΩ</text>
  <line class="ln" x1="330" y1="40" x2="400" y2="40"/>
  <line class="ln" x1="210" y1="40" x2="210" y2="80"/>
  <rect class="box" x="198" y="80" width="24" height="70"/><text class="text m" x="232" y="120">2 kΩ</text>
  <line class="ln" x1="210" y1="150" x2="210" y2="180"/>
  <line class="ln" x1="400" y1="40" x2="400" y2="80"/>
  <rect class="box" x="388" y="80" width="24" height="70"/><text class="text m" x="420" y="120">1 kΩ</text>
  <line class="ln" x1="400" y1="150" x2="400" y2="180"/>
  <line class="ln" x1="40" y1="180" x2="400" y2="180"/>
  <line class="ln" x1="40" y1="40" x2="40" y2="95"/><line class="ln" x1="40" y1="125" x2="40" y2="180"/>
  <line class="ln" x1="25" y1="95" x2="55" y2="95"/><line class="ln" x1="32" y1="105" x2="48" y2="105"/>
  <line class="ln" x1="25" y1="115" x2="55" y2="115"/><line class="ln" x1="32" y1="125" x2="48" y2="125"/>
  <text class="text m" x="62" y="114">10 V</text>
  <circle class="hl" cx="210" cy="40" r="5"/><text class="text" x="210" y="22" text-anchor="middle">A</text>
  <circle class="hl" cx="400" cy="40" r="5"/><text class="text" x="400" y="22" text-anchor="middle">B</text>
  <text class="text m" x="220" y="200" text-anchor="middle">ground (0 V)</text>
</svg>
<figcaption>A circuit with two unknown node potentials, <em>V<sub>A</sub></em> and <em>V<sub>B</sub></em>. The battery holds the left wire at 10 V above ground.</figcaption>
</figure>
<p>For this circuit, with resistances in kΩ (so currents come out in mA):</p>
<ul>
<li>at A: (<em>V<sub>A</sub></em> − 10)/1 + <em>V<sub>A</sub></em>/2 + (<em>V<sub>A</sub></em> − <em>V<sub>B</sub></em>)/1 = 0, that is, 2.5 <em>V<sub>A</sub></em> − <em>V<sub>B</sub></em> = 10;</li>
<li>at B: (<em>V<sub>B</sub></em> − <em>V<sub>A</sub></em>)/1 + <em>V<sub>B</sub></em>/1 = 0, that is, −<em>V<sub>A</sub></em> + 2 <em>V<sub>B</sub></em> = 0.</li>
</ul>
<p>A short Gaussian elimination solves this, or any circuit, the same way:</p>
<pre><code>import math

def solve(A, b):
    """Gaussian elimination with partial pivoting (MATH 220 Lesson 2)."""
    n = len(A)
    M = [row[:] + [bi] for row, bi in zip(A, b)]
    for c in range(n):
        p = max(range(c, n), key=lambda r: abs(M[r][c]))
        M[c], M[p] = M[p], M[c]
        for r in range(c + 1, n):
            f = M[r][c] / M[c][c]
            for k in range(c, n + 1):
                M[r][k] -= f * M[c][k]
    x = [0.0] * n
    for r in range(n - 1, -1, -1):
        x[r] = (M[r][n] - sum(M[r][k] * x[k] for k in range(r + 1, n))) / M[r][r]
    return x

va, vb = solve([[2.5, -1], [-1, 2]], [10, 0])
print(round(va, 3), round(vb, 3))      # 5.0 2.5
print(round((10 - va) / 1, 3), "mA from the battery")   # 5.0 mA from the battery</code></pre>
<p>Check with the junction rule at A: 5 mA arrives from the battery, <em>V<sub>A</sub></em>/2 = 2.5 mA goes down the 2 kΩ resistor, and (5 − 2.5)/1 = 2.5 mA goes on to B and then to ground. Circuit simulators such as SPICE, used to design every chip, are built on exactly this: one equation per node, and a large, sparse linear system.</p>

<h3>RC circuits</h3>
<p>Connect a capacitor <em>C</em> through a resistor <em>R</em> to a source of voltage <em>V<sub>s</sub></em>. At first the capacitor is uncharged, the full <em>V<sub>s</sub></em> appears across the resistor, and a current <em>V<sub>s</sub></em>/<em>R</em> flows. As charge builds up, the capacitor's voltage <em>V</em> rises, leaving less across the resistor, so the current slows. The current is <em>I</em> = (<em>V<sub>s</sub></em> − <em>V</em>)/<em>R</em>, and it charges the capacitor at <em>dV</em>/<em>dt</em> = <em>I</em>/<em>C</em>, so</p>
<p class="math"><em>dV</em>/<em>dt</em> = (<em>V<sub>s</sub></em> − <em>V</em>) / (<em>RC</em>)</p>
<p>This is the differential equation of MATH 131 Lesson 6 (the same form as Newton's law of cooling). Its solution, starting from <em>V</em> = 0, is</p>
<p class="math"><em>V</em>(<em>t</em>) = <em>V<sub>s</sub></em>(1 − e<sup>−<em>t</em>/<em>RC</em></sup>)</p>
<p>The product <em>τ</em> = <em>RC</em> is the <strong>time constant</strong> (ohms times farads is seconds). After one time constant the capacitor is 1 − 1/e ≈ 63% charged; after 5<em>τ</em>, over 99%. Discharging through the resistor, the voltage falls as <em>V</em><sub>0</sub>e<sup>−<em>t</em>/<em>RC</em></sup>. Euler's method from PHYS 150 reproduces the curve, and checks the formula:</p>
<pre><code>def charge(vs, r, c, t_end, dt):
    v, t = 0.0, 0.0
    while t &lt; t_end - 1e-12:
        v += (vs - v) / (r * c) * dt
        t += dt
    return v

R, C = 1e3, 1e-6                        # 1 kΩ and 1 µF: τ = 1 ms
tau = R * C
for dt in (1e-4, 1e-5):
    print(dt, round(charge(5, R, C, tau, dt), 4))
print("exact", round(5 * (1 - math.exp(-1)), 4))
# 0.0001 3.2566
# 1e-05 3.1698
# exact 3.1606</code></pre>
<p>With a step one tenth of <em>τ</em> the simulation is 3% high; with one hundredth, 0.3%: Euler's error shrinks in proportion to the step, as MATH 131 found. (There's only one variable here, so the semi-implicit ordering of PHYS 150 doesn't arise.)</p>
<p>RC circuits set the speed of computers. Every logic gate drives a wire and the next gates' inputs, which together act as a capacitor, through its transistors, which, when switched on, act as a resistance (an ideal switch would have none, but a real transistor that is on still resists the current somewhat). A signal can't change faster than the time constant allows, and a gate's delay is a few <em>τ</em>. This is CS 230's propagation delay seen from physics: smaller transistors mean smaller <em>C</em> and faster gates, and long wires, which have both more <em>R</em> and more <em>C</em>, are slow. Their delay grows with the square of their length, which is why chips insert <em>repeaters</em> along long wires: gates that receive the weak, slowed signal and drive a fresh copy onward. A wire cut into <em>k</em> pieces has <em>k</em> delays each proportional to (<em>L</em>/<em>k</em>)², a total proportional to <em>L</em>²/<em>k</em>, plus the repeaters' own small delays.</p>
`,
    terms: [
      ["Current", "The rate of flow of charge, I = dQ/dt, in amperes; conventionally from high potential to low."],
      ["Ohm's law", "V = IR, for materials whose current is proportional to voltage."],
      ["Resistance", "The ratio V/I, in ohms; for a wire, R = ρL/A."],
      ["Resistivity", "A material's resistance to current, ρ, in Ω·m."],
      ["Electrical power", "P = IV = I²R = V²/R, in watts."],
      ["Series", "Components one after another, carrying the same current; resistances add."],
      ["Parallel", "Components across the same two points, with the same voltage; conductances (1/R) add."],
      ["Kirchhoff's junction rule", "The current into a junction equals the current out (conservation of charge)."],
      ["Kirchhoff's loop rule", "Potential differences around any closed loop sum to zero (conservation of energy)."],
      ["Nodal analysis", "Solving a circuit with node potentials as unknowns and one junction-rule equation per node."],
      ["Time constant", "τ = RC, the time for an RC circuit to get 63% of the way to its final voltage."]
    ],
    quiz: [
      { q: "A 12 V supply drives 3 A through a heater. What is its resistance and power?", choices: ["4 Ω, 36 W", "36 Ω, 4 W", "4 Ω, 4 W", "0.25 Ω, 36 W"], answer: 0, why: "R = V/I = 4 Ω; P = IV = 36 W." },
      { q: "What is the combined resistance of 6 Ω and 3 Ω in parallel?", choices: ["9 Ω", "2 Ω", "4.5 Ω", "18 Ω"], answer: 1, why: "1/R = 1/6 + 1/3 = 1/2." },
      { q: "Which conservation law does Kirchhoff's junction rule express?", choices: ["Energy", "Charge", "Momentum", "Mass"], answer: 1, why: "Charge doesn't pile up at a junction." },
      { q: "What is the time constant of a 10 kΩ resistor with a 100 nF capacitor?", choices: ["1 ms", "1 µs", "1 s", "10 ms"], answer: 0, why: "10⁴ × 10⁻⁷ = 10⁻³ s." },
      { q: "After one time constant, a charging capacitor is at about what fraction of the supply voltage?", choices: ["37%", "50%", "63%", "99%"], answer: 2, why: "1 − e⁻¹ ≈ 0.632." },
      { q: "Why do smaller transistors make faster logic gates?", choices: ["Electrons move faster in them", "They have smaller capacitance, so the RC time to switch is shorter", "They use higher voltage", "They have more resistance"], answer: 1, why: "Gate delay is a few RC time constants." }
    ],
    practice: [
      {
        q: `<p>A 9 V battery is connected to a 100 Ω resistor in series with a parallel pair of 300 Ω and 600 Ω. Find the current from the battery, the voltage across the parallel pair, and the current through the 600 Ω resistor.</p>`,
        a: `<p>Parallel pair: 1/(1/300 + 1/600) = 200 Ω. Total 300 Ω, so <em>I</em> = 9/300 = 30 mA. The pair has 30 mA × 200 Ω = 6 V across it (and the 100 Ω resistor has 3 V). The 600 Ω resistor carries 6/600 = 10 mA, and the 300 Ω carries 20 mA, which add to 30 mA, as the junction rule requires.</p>`
      },
      {
        q: `<p>Set up and solve the nodal equations for the circuit in the figure, with the 2 kΩ resistor replaced by 4 kΩ. Check one node with the junction rule.</p>`,
        a: `<p>At A: (<em>V<sub>A</sub></em> − 10) + <em>V<sub>A</sub></em>/4 + (<em>V<sub>A</sub></em> − <em>V<sub>B</sub></em>) = 0, so 2.25<em>V<sub>A</sub></em> − <em>V<sub>B</sub></em> = 10. At B: −<em>V<sub>A</sub></em> + 2<em>V<sub>B</sub></em> = 0. Then <em>V<sub>A</sub></em> = 2<em>V<sub>B</sub></em>, so 4.5<em>V<sub>B</sub></em> − <em>V<sub>B</sub></em> = 10, <em>V<sub>B</sub></em> ≈ 2.857 V and <em>V<sub>A</sub></em> ≈ 5.714 V. At A: 4.286 mA in from the battery; 1.429 mA down the 4 kΩ and 2.857 mA on to B; 1.429 + 2.857 = 4.286. ✓</p>`
      },
      {
        q: `<p>A camera flash charges a 100 µF capacitor to 300 V through a 10 kΩ resistor. How long until it is 99% charged, and how much energy does it then store? Why does the flash itself (discharging through a lamp of about 1 Ω) last only a fraction of a millisecond?</p>`,
        a: `<p><em>τ</em> = 10<sup>4</sup> × 10<sup>−4</sup> = 1 s. 99% charged when e<sup>−<em>t</em>/<em>τ</em></sup> = 0.01, so <em>t</em> = <em>τ</em> ln 100 ≈ 4.6 s. Energy ½<em>CV</em>² = ½ × 10<sup>−4</sup> × 9 × 10<sup>4</sup> = 4.5 J. Discharging through about 1 Ω gives <em>τ</em> = 10<sup>−4</sup> s = 0.1 ms, so the same energy comes out about 10,000 times faster, a peak power of tens of kilowatts.</p>`
      },
      {
        q: `<p>Modify <code>charge</code> to simulate <em>discharging</em> a capacitor from 5 V through <em>R</em> (with no source). With <em>R</em> = 1 kΩ and <em>C</em> = 1 µF, how long until it falls below 1 V? Compare with the exact formula.</p>`,
        a: `<p>Change the update to <code>v += -v / (r * c) * dt</code> and loop while <code>v &gt;= 1</code>, counting time. Exact: 5e<sup>−<em>t</em>/<em>τ</em></sup> = 1 gives <em>t</em> = <em>τ</em> ln 5 ≈ 1.609 ms. With <code>dt = 1e-6</code> the simulation gives 1.609 ms as well, to within a few microseconds.</p>`
      }
    ],
    sources: ["openstaxphys2", "hh", "mit1805"]
  },
  {
    id: "em4",
    title: "Magnetism",
    minutes: 90,
    summary: "Magnetic fields and the cross product, the Lorentz force on moving charges, circular motion and the cyclotron frequency, simulating charged particles, forces on currents and how motors work, and the magnetic fields that currents make (long wires, loops and the Biot–Savart law).",
    notes: `
<p>Magnets were known in antiquity, and compasses guided ships for centuries before anyone knew what magnetism was. In 1820 Hans Christian Ørsted noticed that a current in a wire deflected a nearby compass needle: magnetism and electricity are connected. Magnetic fields are made by moving charges, and they push on moving charges. This lesson describes both halves.</p>

<h3>The cross product</h3>
<p>Magnetic forces point sideways, perpendicular to both the velocity and the field, and describing them needs a new vector operation. The <strong>cross product</strong> of two vectors in three dimensions is</p>
<p class="math"><strong>a</strong> × <strong>b</strong> = (<em>a<sub>y</sub>b<sub>z</sub></em> − <em>a<sub>z</sub>b<sub>y</sub></em>,&nbsp; <em>a<sub>z</sub>b<sub>x</sub></em> − <em>a<sub>x</sub>b<sub>z</sub></em>,&nbsp; <em>a<sub>x</sub>b<sub>y</sub></em> − <em>a<sub>y</sub>b<sub>x</sub></em>)</p>
<p>Its key properties, all of which you can check from the formula:</p>
<ul>
<li>It is perpendicular to both <strong>a</strong> and <strong>b</strong> (its dot product with each, MATH 220 Lesson 1, is zero).</li>
<li>Its length is |<strong>a</strong>||<strong>b</strong>| sin <em>θ</em>, where <em>θ</em> is the angle between them, so it is zero for parallel vectors and largest for perpendicular ones.</li>
<li>Its direction follows the <strong>right-hand rule</strong>: point the fingers of your right hand along <strong>a</strong> and curl them toward <strong>b</strong>; your thumb points along <strong>a</strong> × <strong>b</strong>. For the unit vectors along the axes, <strong>x̂</strong> × <strong>ŷ</strong> = <strong>ẑ</strong>, <strong>ŷ</strong> × <strong>ẑ</strong> = <strong>x̂</strong> and <strong>ẑ</strong> × <strong>x̂</strong> = <strong>ŷ</strong>.</li>
<li>Order matters: <strong>b</strong> × <strong>a</strong> = −(<strong>a</strong> × <strong>b</strong>).</li>
</ul>
<pre><code>import math

def cross(a, b):
    return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])

def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

a, b = (1, 2, 0), (0, 1, 3)
c = cross(a, b)
print(c, dot(c, a), dot(c, b))            # (6, -3, 1) 0 0
print(cross((1, 0, 0), (0, 1, 0)))        # (0, 0, 1)</code></pre>
<p>(PHYS 150 Lesson 5 mentioned that angular momentum is a cross product, <strong>r</strong> × <em>m</em><strong>v</strong>; now you can compute it.)</p>

<h3>The magnetic force on a moving charge</h3>
<p>A charge <em>q</em> moving with velocity <strong>v</strong> through a magnetic field <strong>B</strong> feels the force <em>q</em><strong>v</strong> × <strong>B</strong>. Together with the electric force, this is the <strong>Lorentz force</strong>:</p>
<p class="math"><strong>F</strong> = <em>q</em>(<strong>E</strong> + <strong>v</strong> × <strong>B</strong>)</p>
<p>The magnetic field is measured in <strong>teslas</strong> (T). Earth's field is about 50 µT; a fridge magnet, about 5 mT; an MRI scanner, 1.5 to 3 T. The magnetic force has unusual properties. A charge at rest feels none. A charge moving along the field feels none. And because the force is always perpendicular to the velocity, it does no work: it changes a charge's direction but never its speed or kinetic energy.</p>

<h3>Circular motion and the cyclotron frequency</h3>
<p>A charge moving perpendicular to a uniform field feels a force of constant size <em>qvB</em> that is always sideways, so it moves in a circle, just like PHYS 150 Lesson 5's circular motion, with the magnetic force as the centripetal force. Setting <em>qvB</em> = <em>mv</em>²/<em>r</em> gives the radius and the period:</p>
<p class="math"><em>r</em> = <em>mv</em> / (|<em>q</em>|<em>B</em>),&nbsp;&nbsp;&nbsp;<em>T</em> = 2π<em>m</em> / (|<em>q</em>|<em>B</em>)</p>
<p>The period doesn't depend on the speed: faster particles move in bigger circles and take the same time. The frequency <em>f</em> = |<em>q</em>|<em>B</em>/(2π<em>m</em>) is the <strong>cyclotron frequency</strong>, after the particle accelerator that exploits it. A <strong>mass spectrometer</strong> uses <em>r</em> = <em>mv</em>/(<em>qB</em>) the other way round: ions of different masses, given the same speed, curve with different radii, which identifies the molecules in a sample.</p>
<p>Simulating this motion is a good test of an integrator, because the exact answer is a closed circle at constant speed. Semi-implicit Euler, which served PHYS 150 well, isn't quite enough here: the force depends on velocity, not position, so updating velocity first doesn't produce the cancellation that PHYS 150 Lesson 6 found, and the speed slowly grows. The standard method, used in plasma simulations everywhere, is the <strong>Boris method</strong>. Plain Euler computes the force from the old velocity alone. Boris computes it from the <em>average</em> of the old velocity <strong>v</strong> and the new one <strong>v</strong>′:</p>
<p class="math"><strong>v</strong>′ = <strong>v</strong> + (<em>q</em>/<em>m</em>) ½(<strong>v</strong> + <strong>v</strong>′) × <strong>B</strong> Δ<em>t</em></p>
<p>That one change makes the speed exactly right. Subtract <strong>v</strong> from both sides, and take the dot product of each side with <strong>v</strong>′ + <strong>v</strong>. On the left, (<strong>v</strong>′ − <strong>v</strong>) · (<strong>v</strong>′ + <strong>v</strong>) = |<strong>v</strong>′|² − |<strong>v</strong>|², because the cross terms <strong>v</strong>′ · <strong>v</strong> and <strong>v</strong> · <strong>v</strong>′ cancel. On the right is a cross product with <strong>v</strong> + <strong>v</strong>′ as a factor, so it is perpendicular to <strong>v</strong> + <strong>v</strong>′ and the dot product is zero. So |<strong>v</strong>′| = |<strong>v</strong>|. Dotting with <strong>B</strong> instead shows the same way that the component of velocity along <strong>B</strong> doesn't change. A vector that keeps its length and its component along <strong>B</strong> can only turn about <strong>B</strong>: each step is an exact <em>rotation</em> of the velocity.</p>
<p>The catch is that <strong>v</strong>′ appears on both sides. Write <strong>t</strong> = (<em>q</em>/<em>m</em>)<strong>B</strong> Δ<em>t</em>/2; then the equation is <strong>v</strong>′ − <strong>v</strong>′ × <strong>t</strong> = <strong>v</strong> + <strong>v</strong> × <strong>t</strong>, three linear equations for the three components of <strong>v</strong>′, which MATH 220's elimination could solve every step. Boris found the solution in closed form: compute <strong>v</strong><sub>1</sub> = <strong>v</strong> + <strong>v</strong> × <strong>t</strong>, then <strong>v</strong>′ = <strong>v</strong> + <strong>v</strong><sub>1</sub> × <strong>s</strong> with <strong>s</strong> = 2<strong>t</strong>/(1 + <strong>t</strong> · <strong>t</strong>). Deriving that takes some vector algebra; the code below instead checks that the formula's answer satisfies the averaged equation.</p>
<pre><code>def euler_step(v, q_m, B, dt):
    a = tuple(q_m * c for c in cross(v, B))
    return tuple(vi + ai * dt for vi, ai in zip(v, a))

def boris_step(v, q_m, B, dt):
    t = tuple(q_m * b * dt / 2 for b in B)
    s = tuple(2 * ti / (1 + dot(t, t)) for ti in t)
    v1 = tuple(vi + ci for vi, ci in zip(v, cross(v, t)))
    return tuple(vi + ci for vi, ci in zip(v, cross(v1, s)))

# check: the new velocity solves v' = v + (q/m) (v + v')/2 x B dt, for an arbitrary case
v, q_m, B, dt = (1.0, 0.5, 0.3), 2.0, (0.2, -0.4, 1.0), 0.1
w = boris_step(v, q_m, B, dt)
avg = tuple((a + b) / 2 for a, b in zip(v, w))
rhs = tuple(vi + q_m * c * dt for vi, c in zip(v, cross(avg, B)))
print(max(abs(a - b) for a, b in zip(w, rhs)) &lt; 1e-12, round(dot(v, v), 9), round(dot(w, w), 9))   # True 1.34 1.34

def speed_after(step, turns=10, per_turn=200):
    q_m, B = 1.0, (0.0, 0.0, 1.0)             # units chosen so the period is 2π
    v, dt = (1.0, 0.0, 0.0), 2 * math.pi / per_turn
    for _ in range(turns * per_turn):
        v = step(v, q_m, B, dt)
    return math.sqrt(dot(v, v))

print(round(speed_after(euler_step), 3), round(speed_after(boris_step), 6))   # 2.682 1.0</code></pre>
<p>After 10 turns, plain Euler's particle is moving 2.7 times too fast, spiralling outward, and it gets worse every turn; the Boris particle's speed is exactly right. (In a real program, positions are updated from each new velocity as in PHYS 150.) As in PHYS 150, the lesson is that an integrator must respect the physics' conserved quantities.</p>

<h3>Forces on currents, and motors</h3>
<p>A current is moving charge, so a wire carrying current <em>I</em> in a field feels a force. For a straight length <strong>L</strong> (pointing along the current),</p>
<p class="math"><strong>F</strong> = <em>I</em> <strong>L</strong> × <strong>B</strong></p>
<p>with magnitude <em>ILB</em> sin <em>θ</em>. A rectangular loop of wire in a field feels opposite forces on its two sides, which make a twisting force (a <em>torque</em>) that turns it. That is an electric motor: reverse the current every half-turn (with a switch called a commutator, or electronically), and the loop keeps turning. Loudspeakers, hard-disk arms and the vibration motor in a phone all use this force.</p>

<h3>Magnetic fields from currents</h3>
<p>Ørsted's discovery was the other half: currents create magnetic fields. A long straight wire carrying current <em>I</em> makes a field that circles the wire, with magnitude</p>
<p class="math"><em>B</em> = <em>μ</em><sub>0</sub><em>I</em> / (2π<em>r</em>)</p>
<p>at distance <em>r</em>, where <em>μ</em><sub>0</sub> = 4π × 10<sup>−7</sup> T·m/A ≈ 1.257 × 10<sup>−6</sup> T·m/A is the <em>permeability of free space</em>. The direction follows another right-hand rule: thumb along the current, fingers curl the way the field circles. At 1 cm from a wire carrying 10 A, <em>B</em> = 2 × 10<sup>−4</sup> T, four times Earth's field, which is why Ørsted's compass moved. Two parallel wires carrying currents in the same direction attract each other, and in opposite directions they repel.</p>
<p>The general rule, the <strong>Biot–Savart law</strong>, gives the field from each small piece of wire <em>d</em><strong>l</strong> carrying current <em>I</em>, at displacement <strong>r</strong> from it:</p>
<p class="math"><em>d</em><strong>B</strong> = (<em>μ</em><sub>0</sub>/4π) <em>I</em> <em>d</em><strong>l</strong> × <strong>r</strong> / <em>r</em>³</p>
<p>It plays the role Coulomb's law plays for electric fields, and the method from Lesson 1 applies: chop the wire into pieces and add their contributions. For a circular loop of radius <em>R</em>, the field at the centre works out to <em>μ</em><sub>0</sub><em>I</em>/(2<em>R</em>):</p>
<pre><code>MU0 = 4 * math.pi * 1e-7

def loop_field_center(I, R, n=1000):
    b = [0.0, 0.0, 0.0]
    for k in range(n):
        a0, a1 = 2 * math.pi * k / n, 2 * math.pi * (k + 1) / n
        p0 = (R * math.cos(a0), R * math.sin(a0), 0.0)
        p1 = (R * math.cos(a1), R * math.sin(a1), 0.0)
        dl = tuple(e - s for s, e in zip(p0, p1))
        mid = tuple((s + e) / 2 for s, e in zip(p0, p1))
        r = tuple(-m for m in mid)                    # from the piece to the centre
        rlen = math.sqrt(dot(r, r))
        db = cross(dl, r)
        b = [bi + MU0 / (4 * math.pi) * I * dbi / rlen**3 for bi, dbi in zip(b, db)]
    return b

print([f"{x:.4g}" for x in loop_field_center(1.0, 0.05)], f"{MU0 * 1.0 / (2 * 0.05):.4g}")
# ['0', '0', '1.257e-05'] 1.257e-05</code></pre>
<p>The field points along +<em>z</em>, out of the loop's plane, for current flowing anticlockwise when seen from above: curl the fingers of your right hand along the current, and your thumb gives the field. A coil of many loops, a <strong>solenoid</strong>, makes a strong, nearly uniform field inside, <em>B</em> = <em>μ</em><sub>0</sub><em>nI</em> with <em>n</em> turns per metre. With an iron core it is an electromagnet. Permanent magnets get their fields from the same source, on an atomic scale: electrons spin and orbit, and in iron, many of these tiny current loops line up.</p>

<h3>Ampère's law, and no magnetic charges</h3>
<p>The long-wire field is one case of a general law. Go once around any closed loop and, at each small step <em>d</em><strong>l</strong>, take the component of <strong>B</strong> along the step times its length, <strong>B</strong> · <em>d</em><strong>l</strong>. The total, written ∮ <strong>B</strong> · <em>d</em><strong>l</strong>, is the <em>circulation</em> of <strong>B</strong> around the loop. <strong>Ampère's law</strong> says</p>
<p class="math">∮ <strong>B</strong> · <em>d</em><strong>l</strong> = <em>μ</em><sub>0</sub><em>I</em><sub>through</sub></p>
<p>where <em>I</em><sub>through</sub> is the current passing through the loop: the current crossing a surface whose edge is the loop, like a soap film on a wire frame. For a circle of radius <em>r</em> around a long wire, <strong>B</strong> points along the circle with the same size everywhere on it, so the circulation is <em>B</em> × 2π<em>r</em>, and setting it equal to <em>μ</em><sub>0</sub><em>I</em> gives back <em>B</em> = <em>μ</em><sub>0</sub><em>I</em>/(2π<em>r</em>). For a solenoid, take a rectangle with one side of length ℓ inside the coil, along the field, and the opposite side outside, where the field is nearly zero; the short sides are perpendicular to the field and add nothing. The circulation is <em>B</em>ℓ, the current through the rectangle is <em>n</em>ℓ<em>I</em>, and <em>B</em> = <em>μ</em><sub>0</sub><em>nI</em>. Ampère's law is to magnetism what Gauss's law is to electric fields: Biot–Savart always works, and Ampère's law is a shortcut when symmetry makes <strong>B</strong> constant along a loop.</p>
<p>Magnetism also differs from electricity in one basic way: there are no magnetic charges. Cut a bar magnet in half and you get two smaller magnets, each with a north pole (where its field lines come out) and a south pole (where they go back in); no one has ever isolated a single pole. Electric field lines start and end on charges, but magnetic field lines never start or end. They close on themselves: circles around a wire, or along the inside of a solenoid and back around the outside. So the flux of <strong>B</strong> out of any closed surface is zero, since every line that leaves comes back in. This is <em>Gauss's law for magnetism</em>.</p>
<p>Hard disks stored bits as the direction of magnetization of tiny regions of a magnetic film, written by a small electromagnet in the head and, in modern drives, read with sensors whose resistance depends on the magnetic field.</p>
`,
    terms: [
      ["Cross product", "a × b, a vector perpendicular to both, of length |a||b| sin θ, directed by the right-hand rule."],
      ["Right-hand rule", "Fingers along a, curled toward b: the thumb points along a × b."],
      ["Magnetic field", "B, in teslas; it pushes on moving charges and is created by currents."],
      ["Lorentz force", "F = q(E + v × B), the total electromagnetic force on a charge."],
      ["Cyclotron frequency", "f = |q|B/(2πm), the frequency of a charge's circular motion in a uniform field, independent of its speed."],
      ["Boris method", "An integrator for charged particles that rotates the velocity exactly, so a magnetic field can't change the speed."],
      ["Force on a current", "F = I L × B for a straight wire of length L in a field."],
      ["Permeability of free space", "μ₀ = 4π × 10⁻⁷ T·m/A, the constant in the fields made by currents."],
      ["Field of a long wire", "B = μ₀I/(2πr), circling the wire."],
      ["Biot–Savart law", "The field from a small piece of current: dB = (μ₀/4π) I dl × r / r³."],
      ["Solenoid", "A coil of wire; inside, B = μ₀nI."],
      ["Ampère's law", "The circulation of B around a closed loop equals μ₀ times the current passing through the loop."],
      ["Gauss's law for magnetism", "There are no magnetic charges: magnetic field lines close on themselves, so the flux of B out of any closed surface is zero."]
    ],
    quiz: [
      { q: "What is x̂ × ẑ?", choices: ["ŷ", "−ŷ", "x̂", "0"], answer: 1, why: "ẑ × x̂ = ŷ, and reversing the order changes the sign." },
      { q: "A magnetic field does no work on a moving charge. Why?", choices: ["Fields are weak", "The force is always perpendicular to the velocity", "Charges don't feel magnetic forces", "It cancels the electric force"], answer: 1, why: "A force perpendicular to motion changes direction, not speed." },
      { q: "A proton's speed is doubled in a uniform magnetic field. Its circle's radius and period:", choices: ["both double", "radius doubles, period unchanged", "radius unchanged, period halves", "both unchanged"], answer: 1, why: "r = mv/(qB); T = 2πm/(qB) doesn't depend on v." },
      { q: "What is the field 2 cm from a long wire carrying 5 A?", choices: ["5 × 10⁻⁵ T", "2 × 10⁻⁵ T", "5 × 10⁻³ T", "1.6 × 10⁻⁴ T"], answer: 0, why: "μ₀I/(2πr) = 2 × 10⁻⁷ × 5/0.02 = 5 × 10⁻⁵ T." },
      { q: "Two parallel wires carry currents in the same direction. They:", choices: ["attract", "repel", "feel no force", "twist"], answer: 0, why: "Each sits in the other's field; with parallel currents the force pulls them together." },
      { q: "Why does plain Euler fail for a charge circling in a magnetic field?", choices: ["It's too slow", "Its speed grows every step, so the particle spirals outward", "It can't handle vectors", "It doesn't fail"], answer: 1, why: "Each step moves along a tangent, outside the circle; the Boris method rotates exactly." }
    ],
    practice: [
      {
        q: `<p>An electron moves at 2 × 10<sup>6</sup> m/s in +<em>x</em> through a field of 0.01 T in +<em>z</em>. Find the force (magnitude and direction), the radius of its circle, and its cyclotron frequency. (<em>m</em><sub>e</sub> = 9.109 × 10<sup>−31</sup> kg.)</p>`,
        a: `<p><strong>v</strong> × <strong>B</strong> points along <strong>x̂</strong> × <strong>ẑ</strong> = −<strong>ŷ</strong>; the electron's charge is negative, so the force is along +<strong>ŷ</strong>, with magnitude <em>evB</em> = 1.602 × 10<sup>−19</sup> × 2 × 10<sup>6</sup> × 0.01 ≈ 3.2 × 10<sup>−15</sup> N. Radius <em>mv</em>/(<em>eB</em>) ≈ 1.14 mm. Frequency <em>eB</em>/(2π<em>m</em>) ≈ 2.8 × 10<sup>8</sup> Hz, 280 MHz.</p>`
      },
      {
        q: `<p>Use <code>cross</code> to verify that <strong>a</strong> × <strong>b</strong> = −(<strong>b</strong> × <strong>a</strong>) for <strong>a</strong> = (2, −1, 3), <strong>b</strong> = (0, 4, 1), and that the length of <strong>a</strong> × <strong>b</strong> equals |<strong>a</strong>||<strong>b</strong>| sin <em>θ</em>, finding <em>θ</em> from the dot product.</p>`,
        a: `<p><code>cross((2, -1, 3), (0, 4, 1))</code> is (−13, −2, 8), and the reverse is (13, 2, −8). Its length is √(169 + 4 + 64) = √237 ≈ 15.39. |<strong>a</strong>| = √14, |<strong>b</strong>| = √17, and <strong>a</strong> · <strong>b</strong> = −4 + 3 = −1, so cos <em>θ</em> = −1/√238 and sin <em>θ</em> = √(1 − 1/238) = √(237/238). Then |<strong>a</strong>||<strong>b</strong>| sin <em>θ</em> = √238 × √(237/238) = √237. ✓</p>`
      },
      {
        q: `<p>A 20 cm length of wire carrying 3 A runs along +<em>y</em> through a field of 0.5 T along +<em>x</em>. Find the force on it.</p>`,
        a: `<p><strong>F</strong> = <em>I</em><strong>L</strong> × <strong>B</strong> = 3 × 0.5 × 0.2 (<strong>ŷ</strong> × <strong>x̂</strong>) = 0.3 N × (−<strong>ẑ</strong>): 0.3 N in the −<em>z</em> direction.</p>`
      },
      {
        q: `<p>Modify <code>loop_field_center</code> to compute the field on the loop's axis at height <em>z</em> above its centre, and compare with the formula <em>B</em> = <em>μ</em><sub>0</sub><em>IR</em>²/(2(<em>R</em>² + <em>z</em>²)<sup>3/2</sup>) at <em>z</em> = <em>R</em>.</p>`,
        a: `<p>Replace the displacement with <code>r = (-mid[0], -mid[1], z)</code>. For <em>I</em> = 1 A, <em>R</em> = 0.05 m and <em>z</em> = 0.05 m, both give about 4.443 × 10<sup>−6</sup> T along +<em>z</em>: the formula is <em>μ</em><sub>0</sub>/(2 × 2<sup>3/2</sup> × 0.05) = 1/(2√2) of the centre value. The sideways components cancel by symmetry, as in Lesson 1's ring.</p>`
      }
    ],
    sources: ["openstaxphys2", "feynman2"]
  },
  {
    id: "em5",
    title: "Induction",
    minutes: 90,
    summary: "Changing magnetic fields make electric fields: magnetic flux, Faraday's law and Lenz's law, generators and the electric grid, transformers, inductors and RL circuits, and LC circuits that oscillate like PHYS 150's springs.",
    notes: `
<p>Ørsted showed that currents make magnetic fields. Michael Faraday spent years looking for the reverse, and in 1831 found it, with a twist: a <em>steady</em> magnetic field makes no current, but a <em>changing</em> one does. Almost all the world's electricity is generated by this effect, and it is how transformers, wireless chargers and induction cookers work.</p>

<h3>Magnetic flux</h3>
<p>The <strong>magnetic flux</strong> through a loop measures how much field passes through it. For a flat loop of area <em>A</em> in a uniform field <em>B</em> at angle <em>θ</em> to the loop's perpendicular,</p>
<p class="math">Φ = <em>BA</em> cos <em>θ</em></p>
<p>in webers (Wb, T·m²). It is largest when the field passes straight through and zero when the field lies along the loop's plane. For a non-uniform field, the flux is the integral of the perpendicular component of <strong>B</strong> over the area, a double integral of the kind in MATH 131 Lesson 9.</p>

<h3>Faraday's law</h3>
<p><strong>Faraday's law</strong> says that a changing flux through a loop produces an <strong>electromotive force</strong> (EMF) around it, a voltage that drives current just as a battery would:</p>
<p class="math">ℰ = −<em>N dΦ</em>/<em>dt</em></p>
<p>for a coil of <em>N</em> turns. The flux can change because the field changes, because the loop moves into or out of a field, because its area changes, or because it rotates. All produce the same effect. What is happening physically is that a changing magnetic field creates an electric field, with field lines that loop around rather than starting and ending on charges. Lesson 6 shows that this, with its reverse, is what makes light possible.</p>

<h3>Lenz's law</h3>
<p>The minus sign has a meaning, called <strong>Lenz's law</strong>: the induced current flows in the direction whose own magnetic field <em>opposes the change</em> in flux. Outside a magnet, its field lines leave the <strong>north pole</strong> and enter the south pole. A coil carrying current has poles too: curl the fingers of your right hand along the current, and your thumb points along the field inside the coil, toward the end where the lines come out, its north pole. Push a magnet's north pole toward a coil, and the induced current makes the near end of the coil a north pole, repelling the magnet. So you must do work to push the magnet in, and that work becomes the electrical energy. If the induced current helped the change instead, a small push would grow without limit, creating energy from nothing. Lenz's law is conservation of energy.</p>
<p>A striking example is <em>eddy current braking</em>. A magnet dropped through a copper pipe falls slowly, because the currents it induces in the pipe walls make fields that oppose its motion. Trains and roller coasters use the same effect to brake without contact or wear.</p>

<h3>Generators</h3>
<p>A coil of <em>N</em> turns and area <em>A</em> rotating at angular speed <em>ω</em> in a uniform field has flux Φ = <em>BA</em> cos <em>ωt</em>, so</p>
<p class="math">ℰ = <em>NBAω</em> sin <em>ωt</em></p>
<p>an alternating voltage. That is a <strong>generator</strong>: a turbine (driven by steam, water or wind) turns a coil, or magnets past coils, and mechanical work becomes electrical energy. The world's grids alternate at 50 or 60 Hz because their generators turn at that rate. A generator is a motor run backwards. Electric cars use this in regenerative braking: the motor becomes a generator, and slowing the car charges the battery. Here is the EMF from the flux by numerical differentiation, checked against the formula:</p>
<pre><code>import math

def emf_numeric(flux, t, n_turns=1, h=1e-7):
    return -n_turns * (flux(t + h) - flux(t - h)) / (2 * h)

N, B, A, w = 200, 0.1, 0.01, 2 * math.pi * 60          # 200 turns, 0.1 T, 10 cm x 10 cm, 60 Hz
flux = lambda t: B * A * math.cos(w * t)
t = 0.001
print(round(emf_numeric(flux, t, N), 2), round(N * B * A * w * math.sin(w * t), 2))   # 27.76 27.76
print("peak", round(N * B * A * w, 1), "V")                                       # peak 75.4 V</code></pre>

<h3>Transformers</h3>
<p>Two coils wound on one iron core share the same changing flux. An alternating voltage on the first (the <em>primary</em>, <em>N</em><sub>p</sub> turns) induces a voltage in the second (the <em>secondary</em>, <em>N</em><sub>s</sub> turns) in proportion to the number of turns, since each turn sees the same <em>d</em>Φ/<em>dt</em>:</p>
<p class="math"><em>V</em><sub>s</sub> / <em>V</em><sub>p</sub> = <em>N</em><sub>s</sub> / <em>N</em><sub>p</sub></p>
<p>An ideal transformer loses no energy, so <em>V</em><sub>p</sub><em>I</em><sub>p</sub> = <em>V</em><sub>s</sub><em>I</em><sub>s</sub>: stepping the voltage up steps the current down. This is why grids transmit power at hundreds of kilovolts. The power lost in a line of resistance <em>R</em> is <em>I</em>²<em>R</em> (Lesson 3), so carrying the same power at 100 times the voltage needs one hundredth of the current and loses one ten-thousandth as much. Transformers only work with changing currents, which is the main reason grids use alternating current. A phone charger's first job is to step the wall's voltage down (modern chargers switch at high frequency so that their transformers can be tiny), then convert it to the steady 5 V or so a phone needs.</p>

<h3>Inductors and RL circuits</h3>
<p>A coil's current makes a flux through the coil itself. If the current changes, that flux changes, and by Lenz's law the coil induces an EMF that opposes the change. This <em>self-inductance</em> is measured by the coil's <strong>inductance</strong> <em>L</em>, in henries (H): the induced EMF is −<em>L dI</em>/<em>dt</em>. An <strong>inductor</strong> resists changes in current the way mass resists changes in velocity. Connect a voltage source <em>V<sub>s</sub></em> to an inductor through a resistor <em>R</em>, and the current rises gradually, with</p>
<p class="math"><em>L dI</em>/<em>dt</em> = <em>V<sub>s</sub></em> − <em>IR</em>,&nbsp;&nbsp;&nbsp;<em>I</em>(<em>t</em>) = (<em>V<sub>s</sub></em>/<em>R</em>)(1 − e<sup>−<em>tR</em>/<em>L</em></sup>)</p>
<p>the same shape as the RC circuit, with time constant <em>τ</em> = <em>L</em>/<em>R</em>. Inductors store energy in their magnetic field. To push current <em>I</em> through an inductor against its EMF, a source must supply the voltage <em>L dI</em>/<em>dt</em>, so the power going in is <em>P</em> = <em>IL dI</em>/<em>dt</em>. Building the current up from 0 to <em>I</em> stores <em>U</em> = ∫<em>P dt</em> = ∫<sub>0</sub><sup><em>I</em></sup> <em>LI</em>′ <em>dI</em>′ = ½<em>LI</em>², just as a capacitor stores ½<em>CV</em>² in its electric field. Interrupting an inductor's current suddenly makes <em>dI</em>/<em>dt</em> huge, and so the induced voltage. That is how a car's ignition coil makes the spark, and why circuits that switch motors or relays (which contain coils) need a protective diode across the coil. The diode (Lesson 3: it conducts in one direction only) is wired so that it carries no current while the switch is closed; when the switch opens, it gives the coil's current a path to keep flowing and die away gradually, so <em>dI</em>/<em>dt</em>, and the voltage, stay small instead of destroying the switching transistor.</p>

<h3>LC circuits: electrical oscillation</h3>
<p>Connect a charged capacitor across an inductor. The capacitor drives a current through the inductor; the current builds up slowly (the inductor resists change) and carries on after the capacitor is empty (the inductor resists change again), charging it the other way; and the process repeats. Let <em>Q</em> be the charge on the capacitor's top plate and <em>I</em> = <em>dQ</em>/<em>dt</em> the current flowing <em>onto</em> that plate, so a discharging capacitor has <em>I</em> &lt; 0. Go around the loop in the direction of <em>I</em>, starting at the top plate, and add up the potential changes; by the loop rule (Lesson 3) they sum to zero. Crossing the capacitor from its top plate to its bottom plate, the potential falls by <em>Q</em>/<em>C</em>: a change of −<em>Q</em>/<em>C</em>. Crossing the inductor in the direction of the current, the potential changes by its EMF, −<em>L dI</em>/<em>dt</em>. So −<em>Q</em>/<em>C</em> − <em>L dI</em>/<em>dt</em> = 0, that is, <em>Q</em>/<em>C</em> = −<em>L dI</em>/<em>dt</em>. (Check the sign: when <em>Q</em> &gt; 0 the capacitor pushes current off the top plate, making <em>I</em> more negative, so <em>dI</em>/<em>dt</em> &lt; 0.) With <em>dI</em>/<em>dt</em> = <em>d</em>²<em>Q</em>/<em>dt</em>², the charge obeys</p>
<p class="math"><em>L d</em>²<em>Q</em>/<em>dt</em>² = −<em>Q</em>/<em>C</em></p>
<p>which is exactly PHYS 150 Lesson 6's spring, <em>m d</em>²<em>x</em>/<em>dt</em>² = −<em>kx</em>, with inductance playing the part of mass and 1/<em>C</em> of stiffness. So the charge oscillates at angular frequency <em>ω</em> = 1/√(<em>LC</em>), and energy sloshes between the capacitor's electric field and the inductor's magnetic field as it did between potential and kinetic energy. The same semi-implicit Euler simulation works, with the current <em>I</em> = <em>dQ</em>/<em>dt</em> in place of velocity:</p>
<pre><code>def lc_period(L, C, dt, q0=1e-6):
    q, i, t = q0, 0.0, 0.0
    crossings = []
    while len(crossings) &lt; 3:
        i += -q / (L * C) * dt          # current first (like velocity) ...
        q_new = q + i * dt              # ... then charge, with the new current
        if q > 0 >= q_new or q &lt; 0 &lt;= q_new:
            crossings.append(t + dt)
        q, t = q_new, t + dt
    return crossings[2] - crossings[0]   # time from 1st to 3rd zero crossing: one period

L, C = 1e-3, 1e-9                         # 1 mH and 1 nF
print(f"{lc_period(L, C, 1e-9):.4g}", f"{2 * math.pi * math.sqrt(L * C):.4g}")   # 6.283e-06 6.283e-06</code></pre>
<p>That is a frequency of about 159 kHz. Every radio tuner contains an LC circuit: adjusting <em>C</em> changes the frequency at which it oscillates, and the circuit responds strongly only to signals near that frequency, the resonance of PHYS 150 Lesson 6. Adding resistance gives the damped oscillator.</p>
`,
    terms: [
      ["Magnetic flux", "Φ = BA cos θ, the amount of magnetic field through a loop, in webers."],
      ["Electromotive force (EMF)", "The voltage that drives current around a loop, from a battery or from induction."],
      ["Faraday's law", "A changing magnetic flux induces an EMF: ℰ = −N dΦ/dt."],
      ["Lenz's law", "The induced current flows so that its field opposes the change in flux."],
      ["Eddy currents", "Loops of current induced in a conductor by a changing field, which oppose motion."],
      ["Generator", "A machine that turns rotation into an alternating EMF, ℰ = NBAω sin ωt."],
      ["Transformer", "Two coils on a shared core; Vs/Vp = Ns/Np."],
      ["Inductance", "L, in henries: a coil's opposition to changes in its current, with EMF −L dI/dt."],
      ["Time constant (RL)", "τ = L/R."],
      ["LC circuit", "A capacitor and inductor that exchange energy, oscillating at ω = 1/√(LC)."]
    ],
    quiz: [
      { q: "A magnet sits still inside a coil. What current flows?", choices: ["A steady current", "None", "An alternating current", "It depends on the magnet's strength"], answer: 1, why: "Only a changing flux induces an EMF." },
      { q: "A loop's flux falls from 0.06 Wb to 0 in 0.02 s. What is the average EMF in a 1-turn loop?", choices: ["0.003 V", "3 V", "0.06 V", "1.2 V"], answer: 1, why: "|ΔΦ/Δt| = 0.06/0.02 = 3 V." },
      { q: "Why must you do work to push a magnet into a coil connected to a resistor?", choices: ["Friction", "The induced current's field repels the magnet (Lenz's law)", "Gravity", "You don't"], answer: 1, why: "That work becomes the electrical energy." },
      { q: "A transformer has 500 primary and 25 secondary turns, with 230 V on the primary. What is the secondary voltage?", choices: ["11.5 V", "4,600 V", "230 V", "9.2 V"], answer: 0, why: "230 × 25/500 = 11.5 V." },
      { q: "Why do grids transmit power at very high voltage?", choices: ["It's safer", "For the same power, the current is smaller, and line losses I²R fall with its square", "Generators require it", "To make it alternate"], answer: 1, why: "100 times the voltage cuts losses 10,000-fold." },
      { q: "In the LC circuit's analogy with a mass on a spring, what plays the part of mass?", choices: ["Capacitance", "Inductance", "Resistance", "Charge"], answer: 1, why: "Inductance resists changes in current as mass resists changes in velocity." }
    ],
    practice: [
      {
        q: `<p>A square loop 10 cm on a side, with resistance 0.5 Ω, sits in a field perpendicular to it that increases steadily from 0 to 0.8 T in 0.2 s. Find the EMF, the current, and the energy dissipated. Which way does the current circulate, seen from the side the field points toward?</p>`,
        a: `<p>Φ goes from 0 to 0.8 × 0.01 = 0.008 Wb, so ℰ = 0.008/0.2 = 0.04 V, <em>I</em> = 0.04/0.5 = 0.08 A, and the energy is <em>I</em>²<em>R t</em> = 0.0064 × 0.5 × 0.2 = 0.64 mJ. The induced field must oppose the increase, so it points against the applied field. Seen from the side the field points toward, so that the field points toward you, the current must circulate clockwise to make a field pointing away from you (right-hand rule).</p>`
      },
      {
        q: `<p>A wind turbine's generator has a 300-turn coil of area 0.05 m² rotating at 25 revolutions per second in 0.4 T. What is the peak EMF? To double it, list three things you could change.</p>`,
        a: `<p><em>ω</em> = 2π × 25 ≈ 157.1 rad/s; peak ℰ = <em>NBAω</em> = 300 × 0.4 × 0.05 × 157.1 ≈ 942 V. Double any one of <em>N</em>, <em>B</em>, <em>A</em> or <em>ω</em>. Doubling the speed also doubles the frequency, which a grid generator can't do, so grid machines change the others.</p>`
      },
      {
        q: `<p>A power station sends 10 MW through lines with a total resistance of 5 Ω. Find the power lost at 20 kV and at 400 kV.</p>`,
        a: `<p>At 20 kV: <em>I</em> = 10<sup>7</sup>/(2 × 10<sup>4</sup>) = 500 A, loss <em>I</em>²<em>R</em> = 250,000 × 5 = 1.25 MW (12.5%). At 400 kV: <em>I</em> = 25 A, loss 625 × 5 = 3.1 kW (0.03%). Twenty times the voltage, 400 times less loss.</p>`
      },
      {
        q: `<p>Add a resistor to <code>lc_period</code>'s circuit: the current update becomes <code>i += (-q / C - r * i) / L * dt</code>. With <em>R</em> = 100 Ω, roughly how many oscillations does it take for the peak charge to fall to 1/e of its start? Compare with the prediction that the amplitude decays as e<sup>−<em>Rt</em>/(2<em>L</em>)</sup>.</p>`,
        a: `<p>The amplitude reaches 1/e at <em>t</em> = 2<em>L</em>/<em>R</em> = 2 × 10<sup>−3</sup>/100 = 20 µs, about 20/6.283 ≈ 3.2 periods. Simulating with <code>dt = 1e-9</code> and recording the size of each peak of <code>q</code> shows the same: peaks of about 0.73, 0.53, 0.39 and 0.29 of the start, one period apart, crossing 1/e ≈ 0.37 between the third and fourth. This is PHYS 150's damped oscillator, with <em>R</em> as friction.</p>`
      }
    ],
    sources: ["openstaxphys2", "feynman2", "faraday1832"]
  },
  {
    id: "em6",
    title: "Electromagnetic waves",
    minutes: 90,
    summary: "Maxwell's equations, the displacement current, and the prediction that changing fields travel as waves at the speed of light; the electromagnetic spectrum, energy and intensity, simulating a wave with the finite-difference time-domain method, and what the speed of light means for computers.",
    notes: `
<p>By the 1860s, four laws described electricity and magnetism: Gauss's law for electric fields (Lesson 1); Gauss's law for magnetism, which says magnetic field lines never start or end because there are no magnetic charges (Lesson 4); Faraday's law (Lesson 5); and Ampère's law, which says currents make circulating magnetic fields (Lesson 4). James Clerk Maxwell noticed that, as written, Ampère's law contradicted conservation of charge in a circuit containing a charging capacitor. His fix changed physics.</p>

<h3>Maxwell's correction</h3>
<p>While a capacitor charges, current <em>I</em> flows in the wires but not across the gap between its plates. Draw a circular loop around one of the wires near the capacitor. Ampère's law (Lesson 4) needs the current through the loop, meaning the current crossing a surface whose edge is the loop, and any such surface should give the same answer. A flat disc spanning the loop is crossed by the wire, so the current through it is <em>I</em>. But a surface with the same edge, bulging out like a bag so that it passes through the gap between the plates without touching the wire, is crossed by no current at all. One loop, two answers: the law as Ampère wrote it is inconsistent here.</p>
<p>Maxwell proposed that a changing <em>electric</em> field also makes a magnetic field, just as a changing magnetic field makes an electric one. In the gap the electric field is growing. Lesson 2 found it to be <em>E</em> = <em>Q</em>/(<em>ε</em><sub>0</sub><em>A</em>), so the electric flux through the gap, <em>E</em> times the plate area, is Φ<sub><em>E</em></sub> = <em>EA</em> = <em>Q</em>/<em>ε</em><sub>0</sub>, and</p>
<p class="math"><em>ε</em><sub>0</sub> <em>d</em>Φ<sub><em>E</em></sub>/<em>dt</em> = <em>dQ</em>/<em>dt</em> = <em>I</em></p>
<p>This quantity, <em>ε</em><sub>0</sub> times the rate of change of the electric flux through a surface, has units of current and here equals exactly the current in the wire. Maxwell called it the <em>displacement current</em> and added it to the current in Ampère's law: ∮ <strong>B</strong> · <em>d</em><strong>l</strong> = <em>μ</em><sub>0</sub>(<em>I</em><sub>through</sub> + <em>ε</em><sub>0</sub> <em>d</em>Φ<sub><em>E</em></sub>/<em>dt</em>). Now the flat disc counts the wire's current, the bag counts the same amount of displacement current, and the two surfaces agree.</p>
<p>With it, the four laws, now called <strong>Maxwell's equations</strong>, became:</p>
<ul>
<li>electric field lines start and end on charges (Gauss);</li>
<li>magnetic field lines never start or end;</li>
<li>a changing magnetic field makes a circulating electric field (Faraday);</li>
<li>a current, <em>or a changing electric field</em>, makes a circulating magnetic field (Ampère–Maxwell).</li>
</ul>
<p>In their full form they are four equations in vector calculus, a subject beyond MATH 131. In words, they describe all of classical electromagnetism, from batteries to radio.</p>

<h3>Waves</h3>
<p>The last two laws feed each other. A changing electric field makes a magnetic field; if that field changes, it makes an electric field; and so on. Maxwell showed that this mutual regeneration travels through empty space as a <strong>wave</strong>, with no charges or currents needed to carry it, at a speed fixed by the two constants:</p>
<p class="math"><em>c</em> = 1 / √(<em>μ</em><sub>0</sub><em>ε</em><sub>0</sub>)</p>
<pre><code>import math

EPS0 = 8.8541878128e-12
MU0 = 1.25663706212e-6
print(round(1 / math.sqrt(MU0 * EPS0)))   # 299792458</code></pre>
<p>That is the speed of light, which had been measured independently. Maxwell wrote in 1864 that "light is an electromagnetic disturbance propagated through the field according to electromagnetic laws". Constants measured with charges and coils on a bench predicted the speed of light. In 1887 Heinrich Hertz made and detected such waves with sparks and wire loops: the first radio.</p>
<p>In an electromagnetic wave, the electric and magnetic fields are perpendicular to each other and to the direction of travel, and they oscillate in step, with <em>E</em> = <em>cB</em>. Like any wave, it has a frequency <em>f</em> and a wavelength <em>λ</em>, with <em>c</em> = <em>fλ</em>. The direction of the electric field is the wave's <strong>polarization</strong>. Polarizing sunglasses block light whose field is horizontal, which is how glare reflected off water mostly arrives.</p>

<h3>The electromagnetic spectrum</h3>
<p>Electromagnetic waves span a vast range of frequencies, all moving at <em>c</em> in a vacuum:</p>
<table>
<tr><th>Kind</th><th>Typical wavelength</th><th>Typical frequency</th><th>Uses</th></tr>
<tr><td>Radio</td><td>1 m to 1 km</td><td>300 kHz to 300 MHz</td><td>broadcasting</td></tr>
<tr><td>Microwave</td><td>1 mm to 1 m</td><td>300 MHz to 300 GHz</td><td>Wi-Fi (12.5 cm at 2.4 GHz), phones, radar, ovens</td></tr>
<tr><td>Infrared</td><td>700 nm to 1 mm</td><td>300 GHz to 4.3 × 10<sup>14</sup> Hz</td><td>remote controls, heat, fibre-optic links (1.55 µm)</td></tr>
<tr><td>Visible light</td><td>400 to 700 nm</td><td>4.3 to 7.5 × 10<sup>14</sup> Hz</td><td>sight, displays</td></tr>
<tr><td>Ultraviolet</td><td>10 to 400 nm</td><td>7.5 × 10<sup>14</sup> to 3 × 10<sup>16</sup> Hz</td><td>sterilization; making chips (lithography at 13.5 nm)</td></tr>
<tr><td>X-rays and gamma rays</td><td>below 10 nm</td><td>above 3 × 10<sup>16</sup> Hz</td><td>medical imaging, cancer treatment</td></tr>
</table>
<p>Each row's two ranges match through <em>c</em> = <em>fλ</em>: for example, at 1 mm, <em>f</em> = (3.00 × 10<sup>8</sup> m/s)/(10<sup>−3</sup> m) = 3 × 10<sup>11</sup> Hz = 300 GHz, where microwaves end and infrared begins. The boundaries are conventions; the physics changes smoothly across them.</p>
<p>Waves carry energy, stored in their fields. Lesson 2's parallel-plate capacitor shows how much energy an electric field holds. Its stored energy is ½<em>CV</em>², with <em>C</em> = <em>ε</em><sub>0</sub><em>A</em>/<em>d</em> and <em>V</em> = <em>Ed</em>, so</p>
<p class="math"><em>U</em> = ½ (<em>ε</em><sub>0</sub><em>A</em>/<em>d</em>)(<em>Ed</em>)² = ½<em>ε</em><sub>0</sub><em>E</em>² × <em>Ad</em></p>
<p>and <em>Ad</em> is the volume between the plates, where the field is. So an electric field stores <em>energy density</em> (energy per cubic metre) <em>u<sub>E</sub></em> = ½<em>ε</em><sub>0</sub><em>E</em>². The magnetic counterpart comes the same way from a solenoid of length ℓ, area <em>A</em> and <em>n</em> turns per metre. Lesson 5's two expressions for its EMF, <em>N dΦ</em>/<em>dt</em> and <em>L dI</em>/<em>dt</em>, give <em>N dΦ</em>/<em>dt</em> = <em>L dI</em>/<em>dt</em>. The flux is proportional to the current (Φ = <em>μ</em><sub>0</sub><em>nIA</em> below, and zero when <em>I</em> = 0), so Φ = <em>kI</em> for a constant <em>k</em> and <em>d</em>Φ/<em>dt</em> = <em>k dI</em>/<em>dt</em>; then <em>Nk</em> = <em>L</em>, that is, <em>L</em> = <em>N</em>Φ/<em>I</em>. With <em>N</em> = <em>n</em>ℓ turns and Φ = <em>BA</em> = <em>μ</em><sub>0</sub><em>nIA</em> through each, <em>L</em> = <em>μ</em><sub>0</sub><em>n</em>²<em>A</em>ℓ, and the stored energy ½<em>LI</em>² = (<em>μ</em><sub>0</sub><em>nI</em>)²/(2<em>μ</em><sub>0</sub>) × <em>A</em>ℓ = <em>B</em>²/(2<em>μ</em><sub>0</sub>) × volume. So <em>u<sub>B</sub></em> = <em>B</em>²/(2<em>μ</em><sub>0</sub>).</p>
<p>In a wave, <em>B</em> = <em>E</em>/<em>c</em> and <em>c</em>² = 1/(<em>μ</em><sub>0</sub><em>ε</em><sub>0</sub>), so <em>u<sub>B</sub></em> = <em>E</em>²<em>μ</em><sub>0</sub><em>ε</em><sub>0</sub>/(2<em>μ</em><sub>0</sub>) = ½<em>ε</em><sub>0</sub><em>E</em>² = <em>u<sub>E</sub></em>: the two fields carry equal shares, and the total is <em>ε</em><sub>0</sub><em>E</em>². The field oscillates as <em>E</em><sub>0</sub> sin(2π<em>ft</em>), and the average of sin² over a cycle is ½, so the average energy density is ½<em>ε</em><sub>0</sub><em>E</em><sub>0</sub>². That energy moves at <em>c</em>, so in one second a square metre facing the wave is crossed by the energy in a column <em>c</em> metres long. The <strong>intensity</strong>, power per unit area, of a wave with peak field <em>E</em><sub>0</sub> is therefore</p>
<p class="math"><em>I</em> = ½<em>cε</em><sub>0</sub><em>E</em><sub>0</sub>²</p>
<p>Sunlight at Earth delivers about 1,360 W/m² above the atmosphere, which corresponds to a peak field of about 1,000 V/m. From a small source, the power spreads over spheres of area 4π<em>r</em>², so the intensity falls as 1/<em>r</em>², one reason a Wi-Fi signal weakens quickly with distance.</p>

<h3>Simulating a wave</h3>
<p>Take a wave travelling along <em>x</em>, with <strong>E</strong> along <em>y</em> and <strong>B</strong> along <em>z</em>, each depending only on <em>x</em> and <em>t</em>. Faraday's and Ampère–Maxwell's laws, applied to thin rectangles, turn into two equations for them.</p>
<p><em>Faraday.</em> Take a rectangle in the <em>xy</em>-plane, of width <em>dx</em> and height <em>h</em>, and go around it anticlockwise as seen from +<em>z</em>. The EMF around it is the sum of <strong>E</strong> · <em>d</em><strong>l</strong> along its sides. Going up the right side contributes <em>E</em>(<em>x</em> + <em>dx</em>)<em>h</em>, going down the left side −<em>E</em>(<em>x</em>)<em>h</em>, and the top and bottom, perpendicular to <strong>E</strong>, nothing: in total (∂<em>E</em>/∂<em>x</em>) <em>dx h</em>. The flux of <strong>B</strong> through it is <em>B dx h</em> (the right-hand rule makes anticlockwise go with +<em>z</em>). Faraday's law, EMF = −<em>d</em>Φ/<em>dt</em>, gives ∂<em>E</em>/∂<em>x</em> = −∂<em>B</em>/∂<em>t</em>.</p>
<p><em>Ampère–Maxwell.</em> Take a rectangle in the <em>xz</em>-plane, of width <em>dx</em> and height <em>h</em>, through which <strong>E</strong> passes along +<em>y</em>, and go around it the way that goes with +<em>y</em>: up (+<em>z</em>) the side at <em>x</em> and down the side at <em>x</em> + <em>dx</em>. The circulation of <strong>B</strong> is <em>B</em>(<em>x</em>)<em>h</em> − <em>B</em>(<em>x</em> + <em>dx</em>)<em>h</em> = −(∂<em>B</em>/∂<em>x</em>) <em>dx h</em>. No current flows in empty space, so this equals <em>μ</em><sub>0</sub><em>ε</em><sub>0</sub> times the rate of change of the flux <em>E dx h</em>, which gives ∂<em>E</em>/∂<em>t</em> = −<em>c</em>² ∂<em>B</em>/∂<em>x</em>.</p>
<p>In units where <em>c</em> = 1 (so <em>E</em> = <em>B</em> in a wave), the pair is</p>
<p class="math">∂<em>B</em>/∂<em>t</em> = −∂<em>E</em>/∂<em>x</em>,&nbsp;&nbsp;&nbsp;∂<em>E</em>/∂<em>t</em> = −∂<em>B</em>/∂<em>x</em></p>
<p>Each field's rate of change in time is set by how the other varies in space. (You can check that any shape <em>E</em> = <em>B</em> = <em>g</em>(<em>x</em> − <em>t</em>) satisfies both: a pulse moving right at speed 1 without changing shape.) The <strong>finite-difference time-domain</strong> (FDTD) method, invented by Kane Yee in 1966 and now the workhorse of antenna and chip design, puts <em>E</em> and <em>B</em> on two interleaved grids and updates them in turn, like the velocity-then-position leapfrog of semi-implicit Euler. Each <code>b[i]</code> sits between <code>e[i]</code> and <code>e[i + 1]</code>, so <code>e[i + 1] - e[i]</code> is ∂<em>E</em>/∂<em>x</em> at <code>b[i]</code> (the grid spacing is 1). The time step is <code>courant</code> (in these units, where light moves at speed 1 and cells are 1 apart, the time step is also the fraction of a cell that light crosses in one step, a quantity called the <em>Courant number</em>, hence the name), so Euler's step for the first equation is <code>b[i] -= courant * (e[i + 1] - e[i])</code>. Likewise <code>b[i] - b[i - 1]</code> is ∂<em>B</em>/∂<em>x</em> at <code>e[i]</code>, and the second equation gives <code>e[i] -= courant * (b[i] - b[i - 1])</code>:</p>
<pre><code>def fdtd(n_cells, steps, courant=0.5, source_at=50):
    """1D FDTD in units where c = 1 and the grid spacing is 1. Returns the E field after the given number of steps."""
    e = [0.0] * n_cells
    b = [0.0] * n_cells
    for step in range(steps):
        for i in range(n_cells - 1):               # update B from the change in E across each cell
            b[i] -= courant * (e[i + 1] - e[i])
        for i in range(1, n_cells):                # then update E from the change in the new B
            e[i] -= courant * (b[i] - b[i - 1])
        e[source_at] += math.exp(-((step - 30) / 10) ** 2)   # a short pulse, injected at one point
    return e

e = fdtd(400, 300)
peak_right = max(range(100, 400), key=lambda i: abs(e[i]))
print(peak_right)   # 184</code></pre>
<p>The pulse is injected at cell 50 around step 30 and splits into two pulses travelling in opposite directions. At <code>courant=0.5</code>, a wave moves half a cell per step, so after the remaining 270 steps the right-moving pulse should have gone about 135 cells, to about 185. It is at 184, within a cell of the prediction. (The left-moving pulse reaches the end of the grid, where <em>E</em> is held at 0 like a metal wall, and reflects back upside down, which is why the search starts at cell 100.) The <code>courant</code> number is the fraction of a cell that light crosses in one time step. If it exceeds 1, the simulation becomes unstable and blows up, because information would have to travel more than one cell per step while the method only lets it move one. This <strong>Courant condition</strong> limits the time step of every explicit wave simulation, from weather to earthquakes.</p>

<h3>Light speed and computers</h3>
<p>Light is fast, but not infinitely fast, and computers notice. In one cycle of a 3 GHz clock, light in a vacuum travels 10 cm, and signals in a chip's wires and a circuit board's traces travel roughly half that or less. A signal can't cross a large chip and back in one cycle, which is one reason modern processors are divided into regions with their own clocks, and why memory is placed as close to the processor as possible. Across the world, the limit is fundamental. Light in optical fibre travels at about two thirds of <em>c</em>, so a message from New York to London (about 5,600 km) takes at least 28 ms one way, whatever the hardware. That is why services keep copies of data in data centres near their users, and why some financial firms built straighter cables and microwave links to shave milliseconds off trading times.</p>
<p>Two final connections. Light also comes in lumps, <em>photons</em>, each with energy <em>hf</em> (Planck's constant <em>h</em> = 6.626 × 10<sup>−34</sup> J·s), which quantum mechanics explains and which matters for how semiconductors absorb light in a camera sensor or emit it in an LED. And the fact that Maxwell's equations give the same <em>c</em> for every observer, however fast they move, led Einstein to special relativity in 1905; GPS satellites must correct for it, and for general relativity, to keep their clocks accurate.</p>
`,
    terms: [
      ["Maxwell's equations", "The four laws of classical electromagnetism: Gauss's laws for E and B, Faraday's law and the Ampère–Maxwell law."],
      ["Displacement current", "ε₀ times the rate of change of electric flux through a surface; it makes a magnetic field just as a current does."],
      ["Energy density", "Energy per unit volume stored in a field: ½ε₀E² for an electric field, B²/(2μ₀) for a magnetic one."],
      ["Electromagnetic wave", "Mutually regenerating electric and magnetic fields travelling at c = 1/√(μ₀ε₀)."],
      ["Speed of light", "c = 299,792,458 m/s in a vacuum."],
      ["Wavelength and frequency", "For any EM wave in vacuum, c = fλ."],
      ["Polarization", "The direction in which a wave's electric field oscillates."],
      ["Electromagnetic spectrum", "The range of EM waves: radio, microwave, infrared, visible, ultraviolet, X-rays and gamma rays."],
      ["Intensity", "Power per unit area carried by a wave; I = ½cε₀E₀²."],
      ["FDTD", "The finite-difference time-domain method: updating E and B in turn on interleaved grids."],
      ["Courant condition", "In an explicit wave simulation, a wave must not cross more than one cell per time step."],
      ["Photon", "A quantum of light, with energy hf."]
    ],
    quiz: [
      { q: "What did Maxwell add to Ampère's law?", choices: ["Magnetic charges", "A changing electric field also makes a magnetic field", "Resistance", "Gravity"], answer: 1, why: "The displacement current." },
      { q: "What is the wavelength of 2.4 GHz Wi-Fi?", choices: ["12.5 cm", "1.25 m", "2.4 m", "0.8 mm"], answer: 0, why: "λ = c/f = 3 × 10⁸/2.4 × 10⁹ = 0.125 m." },
      { q: "In an EM wave travelling in +x with E along y, which way does B point?", choices: ["x", "Along z", "Along y", "B is zero"], answer: 1, why: "E, B and the direction of travel are mutually perpendicular." },
      { q: "A radio station's intensity is 1 µW/m² at 10 km. What is it at 20 km (no obstacles)?", choices: ["0.5 µW/m²", "0.25 µW/m²", "2 µW/m²", "1 µW/m²"], answer: 1, why: "Intensity falls as 1/r²." },
      { q: "What does the Courant condition prevent?", choices: ["Slow simulations", "Instability when a wave would cross more than one cell per step", "Waves leaving the grid", "Rounding errors"], answer: 1, why: "Beyond it, the explicit method blows up." },
      { q: "What is the minimum one-way time for a signal in fibre (speed ≈ 2 × 10⁸ m/s) across 4,000 km?", choices: ["2 ms", "20 ms", "200 ms", "13 ms"], answer: 1, why: "4 × 10⁶ / 2 × 10⁸ = 0.02 s." }
    ],
    practice: [
      {
        q: `<p>Find the frequency of green light (550 nm) and the energy of one of its photons in eV. A camera sensor's silicon needs about 1.1 eV to free an electron. Can green light do it? Can 1.55 µm infrared?</p>`,
        a: `<p><em>f</em> = <em>c</em>/<em>λ</em> = 3 × 10<sup>8</sup>/5.5 × 10<sup>−7</sup> ≈ 5.45 × 10<sup>14</sup> Hz. <em>E</em> = <em>hf</em> ≈ 3.61 × 10<sup>−19</sup> J ≈ 2.25 eV, more than enough. For 1.55 µm, <em>E</em> ≈ 0.80 eV, which is not enough: silicon is transparent to it, which is why fibre-optic receivers use other semiconductors.</p>`
      },
      {
        q: `<p>Run <code>fdtd</code> with <code>courant=1.0</code> and with <code>courant=1.05</code>, and compare the largest |<em>E</em>| on the grid. What happens, and why?</p>`,
        a: `<p>At 1.0 the pulses travel exactly one cell per step without distortion (a special case in one dimension), and the largest field stays at about 0.5, half the injected pulse in each direction. At 1.05 the largest field grows enormously, to about 10<sup>76</sup> after 300 steps, as the fastest-varying ripples on the grid double and redouble. The Courant condition is violated: the update rule can't carry information as fast as the physics requires, and small errors grow exponentially, as explicit Euler's energy did in PHYS 150, but far faster.</p>`
      },
      {
        q: `<p>A chip runs at 5 GHz. If signals in its wires travel at 0.4<em>c</em>, how far can a signal go in one clock cycle? Is that more or less than the width of a typical 2 cm processor die (the piece of silicon the chip is built on)?</p>`,
        a: `<p>One cycle is 0.2 ns; 0.4 × 3 × 10<sup>8</sup> × 2 × 10<sup>−10</sup> = 2.4 cm. That is about one die width, so a signal can't cross the die and return within a cycle, even ignoring the RC delays of Lesson 3, which are usually worse. Designs keep critical paths short and local.</p>`
      },
      {
        q: `<p>A laser pointer emits 1 mW in a beam 1 mm in diameter. Find its intensity and the peak electric field. Compare the intensity with sunlight's 1,360 W/m². The eye's lens focuses a parallel beam like this one onto a spot on the retina about 0.01 mm across, while it spreads sunlight, which arrives from the sun's whole disc, over a much larger image. Find the intensity in that spot, and explain why you must never look into the beam.</p>`,
        a: `<p>Area π(0.0005)² ≈ 7.85 × 10<sup>−7</sup> m², so <em>I</em> ≈ 1,270 W/m², about the same as full sunlight. <em>E</em><sub>0</sub> = √(2<em>I</em>/(<em>cε</em><sub>0</sub>)) ≈ √(2 × 1,270/(3 × 10<sup>8</sup> × 8.85 × 10<sup>−12</sup>)) ≈ 980 V/m. On the retina all 1 mW lands on an area π(5 × 10<sup>−6</sup>)² ≈ 7.85 × 10<sup>−11</sup> m², so the intensity there is about 1.3 × 10<sup>7</sup> W/m², 10,000 times the beam's (the area is 100² times smaller). Concentrated like that, even a few milliwatts can permanently damage the retina. Sunlight of the same intensity cannot be focused that tightly, because it comes from a wide disc, not a parallel beam.</p>`
      }
    ],
    sources: ["openstaxphys2", "feynman2", "maxwell1865", "yee66"]
  }
]);

CSA.addAsides("phys250", {
  em1: [
    { kind: "history", title: "Franklin's sign convention", html: `<p>In the 1740s Benjamin Franklin proposed that electricity was a single fluid, and that objects with an excess were "positive" and those with a deficit "negative". He had to guess which was which, and he chose glass rubbed with silk as positive. Over 150 years later, J. J. Thomson discovered the electron (1897) and found that it is the electrons that move in a wire, and they are negative. So conventional current points the opposite way to the actual flow of electrons in metals. Nobody has changed the convention: the physics works either way, as long as you're consistent.</p>` }
  ],
  em3: [
    { kind: "history", title: "Kirchhoff and the first circuit theory", html: `<p>Gustav Kirchhoff stated his two circuit laws in 1845, as a 21-year-old student, in a paper that extended Ohm's work to networks of any shape. Two years later he showed how to write down the right number of independent equations by choosing a <em>spanning tree</em> of the circuit's graph: a set of its wires that connects every junction without forming any loop. (Later this term, CS 220 Lesson 6 builds minimum spanning trees.) This was among the first uses of what became graph theory in engineering. Ohm himself had been ridiculed when he published his law in 1827; his colleagues thought experiments couldn't reveal such simple mathematical rules.</p>` }
  ],
  em5: [
    { kind: "history", title: "Faraday's field lines", html: `<p>Michael Faraday was the son of a blacksmith, left school at 13 to work for a bookbinder, and taught himself science from the books he bound. He became the greatest experimenter of his century, discovering induction, the electric motor's principle and the laws of electrolysis. He had little mathematics, so he thought in pictures: "lines of force" filling space, which he believed were physically real. Physicists of his time thought this naive. Maxwell, who had the mathematics, took Faraday's lines seriously and turned them into the equations of the field, writing that he was only translating Faraday's ideas.</p>`, sources: ["faraday1832"] }
  ],
  em6: [
    { kind: "history", title: "Hertz: \"of no use whatever\"", html: `<p>When Heinrich Hertz demonstrated electromagnetic waves in 1887, sending a spark across a gap in a wire loop several metres from the spark that created it, a student asked him what use they might be. Hertz reportedly replied: "It's of no use whatsoever. This is just an experiment that proves Maestro Maxwell was right." Within a decade, Guglielmo Marconi was sending radio messages across kilometres, and in 1901 across the Atlantic. Every wireless network today, Wi-Fi and 5G included, descends from that experiment. The unit of frequency, the hertz, is named after him.</p>` }
  ]
});
