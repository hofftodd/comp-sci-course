CSA.addCourse({
  id: "math220",
  code: "MATH 220",
  title: "Linear Algebra",
  credits: 4,
  kind: "required",
  term: "y2f",
  summary: "The mathematics of vectors and matrices, which underlies graphics, data science, machine learning, search engines and scientific computing: linear systems and elimination, matrices as transformations, inverses and determinants, vector spaces and rank, orthogonality and least squares, eigenvalues, and the singular value decomposition. Every idea is computed by hand on small examples and in Python on large ones.",
  prereqs: ["MATH 131 Calculus II and Multivariable Calculus", "CS 101 Programming I"],
  outcomes: [
    "Compute with vectors and matrices, and interpret matrices as linear transformations",
    "Solve linear systems by Gaussian elimination and describe when a solution exists and is unique",
    "Compute and interpret inverses, determinants, rank and null spaces",
    "Find bases and dimensions of subspaces",
    "Use projections and least squares to fit models to data",
    "Compute eigenvalues and eigenvectors, and apply them to Markov chains and PageRank",
    "Explain the singular value decomposition and use it for low-rank approximation and PCA"
  ],
  rubric: {
    criteriaFor: "problem sets and the project",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 25, desc: "Weekly: the lesson's practice problems written up with full reasoning, plus its programming problems." },
      { name: "Project", weight: 15, desc: "Apply least squares, PageRank or PCA to a real dataset of your choice, with a 4-page report explaining the method, the computation and what the result means." },
      { name: "Midterm exam", weight: 20, desc: "Vectors, elimination, matrices, inverses and determinants (lessons 1–4)." },
      { name: "Final exam", weight: 30, desc: "Cumulative, with emphasis on vector spaces, orthogonality, eigenvalues and the SVD (lessons 5–8)." }
    ],
    criteria: [
      { name: "Correctness", desc: "Are the computations right?", levels: [
        "All computations correct, with results checked (by substitution, by a second method, or in Python).",
        "Minor arithmetic slips that don't affect the method.",
        "Errors in method on some problems.",
        "Mostly incorrect." ] },
      { name: "Reasoning", desc: "Is each step justified?", levels: [
        "Every step follows from definitions or results from the course, stated clearly; proofs are complete.",
        "Sound reasoning with a gap or an unstated assumption.",
        "Steps asserted without justification.",
        "No coherent argument." ] },
      { name: "Interpretation", desc: "Does it say what the numbers mean?", levels: [
        "Connects results to geometry or to the application (what a zero determinant or a large eigenvalue means here).",
        "Interprets most results.",
        "Reports numbers without meaning.",
        "No interpretation." ] },
      { name: "Presentation", desc: "Can a reader follow it?", levels: [
        "Organized, with notation defined and consistent.",
        "Mostly clear.",
        "Hard to follow.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Show your work:</b> an answer without reasoning earns little credit, even if it's correct.",
      "<b>Software:</b> you may use Python (with or without NumPy, introduced at the end of Lesson 1) to check computations, and must for large ones. Exams are by hand.",
      "<b>Collaboration and AI:</b> discuss problems with classmates; write your own solutions and name collaborators. AI tools may explain concepts, and you must say how you used them; submitted solutions must be your own work.",
      "<b>Late work:</b> problem sets are accepted up to two days late for 80% credit."
    ]
  },
  units: [
    {
      id: "la1",
      title: "Vectors, linear combinations and the dot product",
      minutes: 90,
      summary: "Vectors as lists of numbers and as arrows, adding and scaling them, linear combinations and span, and the dot product with its geometry: length, angle, orthogonality, and cosine similarity for comparing documents.",
      notes: `
<p>MATH 131 and PHYS 150 used vectors in two and three dimensions: positions, velocities, gradients. Linear algebra takes the same idea to any number of dimensions. A <strong>vector</strong> in ℝ<sup><em>n</em></sup> is an ordered list of <em>n</em> real numbers, its <strong>components</strong>. We write vectors in bold: <b>v</b> = (3, −1, 2) is a vector in ℝ³. A vector can be pictured as an arrow from the origin to the point with those coordinates, but it needn't be geometric at all: a customer's ratings of 5,000 movies, the pixel brightnesses of an image, and the word counts of a document are all vectors.</p>

<h3>Adding and scaling</h3>
<p>Vectors of the same size are added component by component, and multiplied by a number (a <strong>scalar</strong>) component by component:</p>
<p class="math">(1, 2) + (3, −1) = (4, 1)     3 · (1, 2) = (3, 6)</p>
<p>Geometrically, <b>u</b> + <b>v</b> puts the arrows head to tail; <em>c</em><b>v</b> stretches <b>v</b> by a factor <em>c</em> (and reverses it if <em>c</em> &lt; 0). The <strong>zero vector</strong> <b>0</b> has every component 0.</p>
<p>In Python, a list of numbers is a fine vector. Note that <code>+</code> on lists joins them, so vector addition needs a loop or <code>zip</code>:</p>
<pre><code>def add(u, v):
    return [a + b for a, b in zip(u, v)]

def scale(c, v):
    return [c * a for a in v]

print(add([1, 2], [3, -1]), scale(3, [1, 2]))   # [4, 1] [3, 6]</code></pre>
<p>(The NumPy library, introduced at the end of this lesson, makes <code>+</code> and <code>*</code> work component by component on its arrays, and is much faster.)</p>

<h3>Linear combinations and span</h3>
<p>A <strong>linear combination</strong> of vectors <b>v</b><sub>1</sub>, …, <b>v</b><sub><em>k</em></sub> is any sum <em>c</em><sub>1</sub><b>v</b><sub>1</sub> + … + <em>c</em><sub><em>k</em></sub><b>v</b><sub><em>k</em></sub> with scalar coefficients. This one idea runs through the whole course. The set of all linear combinations of some vectors is their <strong>span</strong>.</p>
<ul>
<li>The span of one nonzero vector in ℝ² or ℝ³ is the line through the origin in its direction.</li>
<li>The span of two vectors in ℝ³ that don't lie on one line is a plane through the origin.</li>
<li>(1, 0) and (0, 1) span all of ℝ²: every (<em>x</em>, <em>y</em>) = <em>x</em>(1, 0) + <em>y</em>(0, 1). So do (1, 1) and (1, −1), less obviously: (<em>x</em>, <em>y</em>) = ((<em>x</em> + <em>y</em>)/2)(1, 1) + ((<em>x</em> − <em>y</em>)/2)(1, −1).</li>
<li>(1, 2) and (2, 4) span only a line, since the second is twice the first.</li>
</ul>
<p>A central question of linear algebra is: given some vectors and a target vector <b>b</b>, is <b>b</b> in their span, and with which coefficients? Lesson 2 answers it by solving equations.</p>

<h3>The dot product</h3>
<p>The <strong>dot product</strong> of two vectors of the same size multiplies matching components and adds:</p>
<p class="math"><b>u</b> · <b>v</b> = u<sub>1</sub>v<sub>1</sub> + u<sub>2</sub>v<sub>2</sub> + … + u<sub>n</sub>v<sub>n</sub></p>
<p>For example, (1, 2, 2) · (3, 0, −1) = 3 + 0 − 2 = 1. The result is a number, not a vector. The dot product connects algebra to geometry in three ways:</p>
<ul>
<li><strong>Length.</strong> The length (or <strong>norm</strong>) of <b>v</b> is ‖<b>v</b>‖ = √(<b>v</b> · <b>v</b>), the Pythagorean theorem in <em>n</em> dimensions. ‖(1, 2, 2)‖ = √(1 + 4 + 4) = 3. A vector of length 1 is a <strong>unit vector</strong>; dividing any nonzero vector by its length gives one.</li>
<li><strong>Angle.</strong> For nonzero vectors, <b>u</b> · <b>v</b> = ‖<b>u</b>‖ ‖<b>v</b>‖ cos θ, where θ is the angle between them. (In two dimensions this follows from the law of cosines; in <em>n</em> dimensions it is how we <em>define</em> the angle.) For example, (1, 0) · (1, 1) = 1 = 1 · √2 · cos θ, so cos θ = 1/√2 and θ = 45°.</li>
<li><strong>Perpendicularity.</strong> <b>u</b> and <b>v</b> are <strong>orthogonal</strong> (perpendicular) exactly when <b>u</b> · <b>v</b> = 0.</li>
</ul>
<p>Since |cos θ| ≤ 1, it follows that |<b>u</b> · <b>v</b>| ≤ ‖<b>u</b>‖ ‖<b>v</b>‖, the <strong>Cauchy–Schwarz inequality</strong>, one of the most used inequalities in mathematics. (It can also be proved directly from the algebra, without angles, which is what justifies the angle definition in high dimensions.)</p>

<h3>Cosine similarity</h3>
<p>The angle between vectors measures how alike their <em>directions</em> are, ignoring their lengths. This makes it useful far from geometry. Represent each document by its word counts over a fixed vocabulary, here (data, python, recipe, chart):</p>
<table>
<thead><tr><th></th><th>data</th><th>python</th><th>recipe</th><th>chart</th></tr></thead>
<tbody>
<tr><td>Document 1</td><td>3</td><td>0</td><td>1</td><td>2</td></tr>
<tr><td>Document 2</td><td>1</td><td>1</td><td>0</td><td>2</td></tr>
<tr><td>Document 3</td><td>0</td><td>2</td><td>0</td><td>1</td></tr>
<tr><td>Query "data chart"</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
</tbody>
</table>
<p>The <strong>cosine similarity</strong> of two vectors is cos θ = <b>u</b> · <b>v</b> / (‖<b>u</b>‖ ‖<b>v</b>‖). It's 1 for vectors pointing the same way, 0 for orthogonal ones (no words in common) and, for counts, never negative.</p>
<pre><code>import math

def dot(u, v):
    return sum(a * b for a, b in zip(u, v))

def cosine(u, v):
    return dot(u, v) / (math.sqrt(dot(u, u)) * math.sqrt(dot(v, v)))

query = [1, 0, 0, 1]
docs = [[3, 0, 1, 2], [1, 1, 0, 2], [0, 2, 0, 1]]
print([round(cosine(query, d), 3) for d in docs])   # [0.945, 0.866, 0.316]</code></pre>
<p>Document 1 matches best, even though Document 2 has the same number of "chart"s: Document 1's words are mostly the query's words. Because cosine ignores length, a long document isn't favored just for being long. Early search engines ranked results this way, and modern AI systems compare <em>embeddings</em>, vectors of hundreds of numbers representing the meaning of text or images, with the same formula.</p>

<h3>NumPy in five minutes</h3>
<p>Plain lists are fine for small examples, and every programming problem in this course uses them, so that you write each step yourself. For larger computations, the lessons use <strong>NumPy</strong>, the standard Python library for arrays of numbers. Later lessons' NumPy code uses only what this section shows, plus one <code>np.linalg</code> function per lesson, explained where it appears.</p>
<p>NumPy isn't part of Python's standard library, so install it once. In a terminal (not inside Python), run <code>python3 -m pip install numpy</code>; on Windows, <code>py -m pip install numpy</code>. <code>pip</code> is Python's installer for outside packages. By convention the library is imported under the short name <code>np</code>.</p>
<pre><code>import numpy as np

u = np.array([1, 2, 2])     # an array: like a list, but of numbers only
v = np.array([3, 0, -1])
print(u + v)                # [4 2 1]
print(3 * u)                # [3 6 6]
print(u * v)                # [ 3  0 -2]
print(u @ v)                # 1
print(np.sqrt(u @ u))       # 3.0
print(u.shape, u[0], u[-1]) # (3,) 1 2</code></pre>
<p>Arithmetic on arrays is <strong>element-wise</strong>: <code>u + v</code> and <code>u * v</code> combine matching entries, and <code>3 * u</code> multiplies every entry by 3. (On lists, <code>+</code> would join them and <code>*</code> would repeat them.) The <code>@</code> operator is the dot product, so <code>np.sqrt(u @ u)</code> is the length ‖<b>u</b>‖ = 3. An array's <code>shape</code> is a tuple of its sizes: <code>(3,)</code> means one dimension of length 3. Indexing works as for lists. NumPy prints arrays without commas, and prints a float such as 1.0 as <code>1.</code>.</p>
<p>A <strong>2-D array</strong> is a table of numbers, given as a list of its rows. Lesson 2 calls such a table a <em>matrix</em>. Its shape is (rows, columns). An index takes a row and a column, separated by a comma and counted from 0, and a <code>:</code> on its own means "all of them":</p>
<pre><code>M = np.array([[1, 2, 3],
              [4, 5, 6]])
print(M.shape)              # (2, 3): 2 rows, 3 columns
print(M[0, 2])              # 3: row 0, column 2
print(M[1])                 # [4 5 6]: row 1
print(M[:, 0])              # [1 4]: all rows, column 0; that is, column 0
print(M[:, -1])             # [3 6]: the last column
print(M.T)                  # the transpose: rows become columns
# [[1 4]
#  [2 5]
#  [3 6]]
print(M.mean(axis=0))       # [2.5 3.5 4.5]: the mean of each column
print(M.mean(axis=1))       # [2. 5.]: the mean of each row
print(M - M.mean(axis=0))   # each column minus its own mean
# [[-1.5 -1.5 -1.5]
#  [ 1.5  1.5  1.5]]</code></pre>
<ul>
<li><code>M.T</code> is the <strong>transpose</strong> of <code>M</code>, the same numbers with rows and columns swapped. Lesson 3 uses it.</li>
<li>Functions such as <code>mean</code> and <code>sum</code> take an <code>axis</code>. With <code>axis=0</code> they work down the rows and give one result per column. With <code>axis=1</code> they work across the columns and give one result per row. With no axis, they use every entry.</li>
<li>Combining a 2-D array with a 1-D array whose length is the number of columns applies the 1-D array to every row. So <code>M - M.mean(axis=0)</code> subtracts each column's mean from that column.</li>
<li>With 2-D arrays, <code>@</code> is the matrix product of Lessons 2 and 3: <code>M @ x</code> is <em>M</em><b>x</b>.</li>
</ul>
<p>The linear-algebra functions live in <code>np.linalg</code>. Lesson 2 uses <code>np.linalg.solve</code>, Lesson 4 mentions <code>np.linalg.inv</code>, Lesson 6 uses <code>np.linalg.lstsq</code> and Lesson 8 uses <code>np.linalg.eigh</code>. Each is explained where it appears. MATH 230 Lesson 8 uses one more function, <code>np.polyfit</code>, and explains it there.</p>
`,
      terms: [
        ["Vector", "An ordered list of n real numbers (its components); an element of ℝⁿ."],
        ["Scalar", "A single number, used to multiply a vector."],
        ["Linear combination", "A sum c₁v₁ + … + cₖvₖ of scalar multiples of vectors."],
        ["Span", "The set of all linear combinations of a collection of vectors."],
        ["Dot product", "u · v = u₁v₁ + … + uₙvₙ, a number; equal to ‖u‖‖v‖cos θ."],
        ["Norm", "The length of a vector, ‖v‖ = √(v · v)."],
        ["Orthogonal", "Perpendicular; u and v are orthogonal when u · v = 0."],
        ["Cosine similarity", "u · v / (‖u‖‖v‖), the cosine of the angle between two vectors; measures how alike their directions are."],
        ["NumPy array", "NumPy's list of numbers (1-D) or table of numbers (2-D), on which arithmetic is element-wise and @ is the dot or matrix product."],
        ["Element-wise", "Applied to matching entries separately: for arrays, u * v multiplies u's first entry by v's first entry, and so on."]
      ],
      quiz: [
        { q: "What is (2, −1, 3) · (1, 4, 2)?", choices: ["4", "6", "(2, −4, 6)", "12"], answer: 0, why: "2 − 4 + 6 = 4." },
        { q: "What is the length of (2, 3, 6)?", choices: ["11", "7", "√11", "49"], answer: 1, why: "√(4 + 9 + 36) = √49 = 7." },
        { q: "Which pair is orthogonal?", choices: ["(1, 2) and (2, 1)", "(1, 2) and (2, −1)", "(1, 2) and (−1, −2)", "(1, 0) and (1, 1)"], answer: 1, why: "1·2 + 2·(−1) = 0." },
        { q: "What is the span of (1, 2) and (3, 6) in ℝ²?", choices: ["All of ℝ²", "A line through the origin", "Just the two points", "The empty set"], answer: 1, why: "(3, 6) = 3(1, 2), so every combination is a multiple of (1, 2)." },
        { q: "Two documents have word-count vectors (2, 0, 4) and (1, 0, 2). What is their cosine similarity?", choices: ["0.5", "1", "2", "0"], answer: 1, why: "The vectors point the same way (one is twice the other), so the angle is 0." }
      ],
      practice: [
        {
          q: `<p>Write (5, 1) as a linear combination of (1, 1) and (1, −1). Check your answer by computing the combination.</p>`,
          a: `<p>Using the formula from the notes, coefficients (5 + 1)/2 = 3 and (5 − 1)/2 = 2: 3(1, 1) + 2(1, −1) = (3 + 2, 3 − 2) = (5, 1).</p>`
        },
        {
          q: `<p>Find the angle between (1, 1, 0) and (0, 1, 1) in degrees.</p>`,
          a: `<p>Dot product 1; lengths √2 and √2; cos θ = 1/2, so θ = 60°.</p>`
        },
        {
          q: `<p>Find all vectors (<em>x</em>, <em>y</em>) orthogonal to (3, 4). Then find the two unit vectors among them.</p>`,
          a: `<p>3<em>x</em> + 4<em>y</em> = 0, so (<em>x</em>, <em>y</em>) = <em>t</em>(4, −3) for any <em>t</em>: a line through the origin. (4, −3) has length 5, so the unit vectors are (4/5, −3/5) and (−4/5, 3/5).</p>`
        },
        {
          q: `<p>Use Cauchy–Schwarz with <b>u</b> = (<em>a</em>, <em>b</em>) and <b>v</b> = (1, 1) to prove that (<em>a</em> + <em>b</em>)² ≤ 2(<em>a</em>² + <em>b</em>²) for all real <em>a</em>, <em>b</em>. When is it an equality?</p>`,
          a: `<p><b>u</b> · <b>v</b> = <em>a</em> + <em>b</em>, ‖<b>u</b>‖ = √(<em>a</em>² + <em>b</em>²), ‖<b>v</b>‖ = √2. Cauchy–Schwarz gives |<em>a</em> + <em>b</em>| ≤ √2 · √(<em>a</em>² + <em>b</em>²); squaring gives the result. Equality holds when <b>u</b> is a multiple of <b>v</b>, that is, when <em>a</em> = <em>b</em>.</p>`
        },
        {
          q: `<p>Add a fourth document, "data data chart chart", to the table, so its vector is (2, 0, 0, 2). What is its cosine similarity with the query? Why does doubling every count not change it?</p>`,
          a: `<p>(2, 0, 0, 2) is twice the query (1, 0, 0, 1), so the angle is 0 and the similarity is 1. Scaling a vector by a positive number multiplies both the dot product and its length by that number, which cancels in the ratio.</p>`
        }
      ],
      sources: ["mit1806", "ila", "eola"]
    },
    {
      id: "la2",
      title: "Linear systems and Gaussian elimination",
      minutes: 90,
      summary: "Writing a system of linear equations as a matrix equation, the row and column pictures, solving by elimination and back substitution, the three possible outcomes, and the cost and numerical care of elimination on a computer.",
      notes: `
<p>A <strong>linear equation</strong> in the unknowns <em>x</em>, <em>y</em>, <em>z</em> involves only constants times unknowns, added: 2<em>x</em> + <em>y</em> − <em>z</em> = 1 is linear; <em>xy</em> = 1 and <em>x</em>² = 4 are not. Systems of linear equations appear everywhere: balancing chemical equations, electrical circuits, network flows, economic models, fitting curves to data, and as the innermost step of countless numerical algorithms. Computers solve systems with millions of unknowns. This lesson shows how.</p>

<h3>Matrix form</h3>
<p>Take the system</p>
<pre data-label="System"><code> x + 3y + 2z = 13
2x +  y −  z =  1
−x +  y + 4z = 13</code></pre>
<p>A <strong>matrix</strong> is a rectangular array of numbers; an <em>m</em> × <em>n</em> matrix has <em>m</em> rows and <em>n</em> columns. The system's coefficients form a 3 × 3 matrix <em>A</em>, the unknowns a vector <b>x</b> and the right-hand sides a vector <b>b</b>, and the whole system is written <em>A</em><b>x</b> = <b>b</b>:</p>
<pre data-label="Matrix"><code>⎡ 1  3  2 ⎤ ⎡x⎤   ⎡13⎤
⎢ 2  1 −1 ⎥ ⎢y⎥ = ⎢ 1⎥
⎣−1  1  4 ⎦ ⎣z⎦   ⎣13⎦</code></pre>
<p>The product <em>A</em><b>x</b> is defined so that this means exactly the three equations: entry <em>i</em> of <em>A</em><b>x</b> is the dot product of row <em>i</em> of <em>A</em> with <b>x</b>.</p>

<h3>Two pictures</h3>
<p>The same system can be seen two ways.</p>
<ul>
<li><strong>Row picture:</strong> each equation is a plane in ℝ³ (a line, in ℝ²), and a solution is a point lying on all of them.</li>
<li><strong>Column picture:</strong> <em>A</em><b>x</b> is also <em>x</em> times column 1 plus <em>y</em> times column 2 plus <em>z</em> times column 3, a linear combination of the columns (Lesson 1). Solving the system asks: which combination of the columns of <em>A</em> produces <b>b</b>? A solution exists exactly when <b>b</b> is in the span of the columns.</li>
</ul>
<p>The column picture is the more powerful one, and the rest of the course builds on it.</p>

<h3>Elimination</h3>
<p><strong>Gaussian elimination</strong> transforms the system into an equivalent one that is easy to solve, using operations that never change the solutions:</p>
<ul>
<li>subtract a multiple of one equation from another;</li>
<li>swap two equations;</li>
<li>multiply an equation by a nonzero number.</li>
</ul>
<p>We work on the <strong>augmented matrix</strong> [<em>A</em> | <b>b</b>], which is the system without the variable names. The goal is <strong>row echelon form</strong>: zeros below a staircase of leading entries called <strong>pivots</strong>.</p>
<pre data-label="Elimination"><code>⎡ 1  3  2 | 13⎤
⎢ 2  1 −1 |  1⎥   R2 ← R2 − 2·R1
⎣−1  1  4 | 13⎦   R3 ← R3 + 1·R1

⎡ 1  3  2 |  13⎤
⎢ 0 −5 −5 | −25⎥
⎣ 0  4  6 |  26⎦   R3 ← R3 + (4/5)·R2

⎡ 1  3  2 |  13⎤
⎢ 0 −5 −5 | −25⎥
⎣ 0  0  2 |   6⎦</code></pre>
<p>The pivots are 1, −5 and 2. Each step subtracts a multiple of the pivot row from a row below it. The number it is multiplied by, called the <strong>multiplier</strong>, is the entry to be cleared divided by the pivot. In the first step the multipliers are 2/1 = 2 for row 2 and −1/1 = −1 for row 3; subtracting −1 times R1 is the same as adding R1, which is why the step is written R3 ← R3 + 1·R1. In the second step the multiplier is 4/(−5) = −4/5, and subtracting −4/5 times R2 is adding 4/5 times it. Now <strong>back substitution</strong> solves from the bottom up:</p>
<ul>
<li>2<em>z</em> = 6, so <em>z</em> = 3;</li>
<li>−5<em>y</em> − 5(3) = −25, so <em>y</em> = 2;</li>
<li><em>x</em> + 3(2) + 2(3) = 13, so <em>x</em> = 1.</li>
</ul>
<p>Check in the original equations: 1 + 6 + 6 = 13, 2 + 2 − 3 = 1, −1 + 2 + 12 = 13. Always check.</p>
<p>Continuing until every pivot is 1 with zeros above and below it as well (<strong>Gauss–Jordan elimination</strong>) gives the <strong>reduced row echelon form</strong>, from which the solution can be read directly.</p>

<h3>Three possible outcomes</h3>
<p>Every linear system has exactly one solution, no solution, or infinitely many. Elimination tells you which:</p>
<ul>
<li><strong>One solution:</strong> every column of <em>A</em> gets a pivot, as above.</li>
<li><strong>No solution:</strong> elimination produces a row 0 0 0 | <em>c</em> with <em>c</em> ≠ 0, the equation 0 = <em>c</em>. In the row picture, the planes have no common point; in the column picture, <b>b</b> is not in the span of the columns.</li>
<li><strong>Infinitely many:</strong> there's no contradiction, but some column has no pivot. Its variable is <strong>free</strong>: it can take any value, and the pivot variables are then determined by it.</li>
</ul>
<p>Example of the last case: <em>x</em> + 2<em>y</em> = 3 and 2<em>x</em> + 4<em>y</em> = 6. Subtracting twice the first from the second gives 0 = 0. Only <em>x</em> has a pivot; <em>y</em> is free. The solutions are <em>x</em> = 3 − 2<em>t</em>, <em>y</em> = <em>t</em> for any <em>t</em>: a whole line. Change the 6 to 7 and the second equation becomes 0 = 1: no solutions, two parallel lines.</p>

<h3>Elimination on a computer</h3>
<p>Count the work for <em>n</em> equations in <em>n</em> unknowns. Clearing the first column changes the <em>n</em> − 1 rows below the first pivot, and in each of them about <em>n</em> entries: one multiplication and one subtraction per entry, so about 2<em>n</em>² operations. The second column then needs about 2(<em>n</em> − 1)², the third 2(<em>n</em> − 2)², and so on down to 2 · 1². The total is about 2(1² + 2² + … + <em>n</em>²). That sum of squares is close to the area under <em>y</em> = <em>x</em>² from 0 to <em>n</em>, which is ∫<sub>0</sub><sup><em>n</em></sup> <em>x</em>² <em>dx</em> = <em>n</em>³/3 (MATH 130); its exact value is <em>n</em>(<em>n</em> + 1)(2<em>n</em> + 1)/6, which is also about <em>n</em>³/3 for large <em>n</em>. So elimination takes about (2/3)<em>n</em>³ arithmetic operations: Θ(<em>n</em>³). Doubling the size makes it 8 times slower. Back substitution is only Θ(<em>n</em>²). Systems from real applications often have special structure (most coefficients zero, or a band along the diagonal) that specialized algorithms exploit.</p>
<p>In floating point (CS 210 Lesson 2), elimination needs care. Dividing by a tiny pivot produces huge multipliers that magnify rounding errors. Consider 0.0001<em>x</em> + <em>y</em> = 1 and <em>x</em> + <em>y</em> = 2. Eliminating with the tiny pivot 0.0001 multiplies the first row by 10,000 before subtracting, which swamps the second equation's information. The standard fix is <strong>partial pivoting</strong>: before eliminating in a column, swap rows so the entry with the largest absolute value becomes the pivot. Every serious linear algebra library does this. NumPy's <code>np.linalg.solve(A, b)</code> calls LAPACK, a Fortran library refined since the 1990s, which uses elimination with partial pivoting. In NumPy (Lesson 1's last section), the matrix is a 2-D array given row by row, and the solution comes back as an array of floats:</p>
<pre><code>import numpy as np
A = np.array([[1, 3, 2], [2, 1, -1], [-1, 1, 4]])
b = np.array([13, 1, 13])
print(np.linalg.solve(A, b))     # [1. 2. 3.]</code></pre>
`,
      terms: [
        ["Linear equation", "An equation in which each unknown appears only multiplied by a constant, with the terms added."],
        ["Matrix", "A rectangular array of numbers; m × n means m rows and n columns."],
        ["Augmented matrix", "The coefficient matrix with the right-hand side vector attached as an extra column: [A | b]."],
        ["Row echelon form", "A matrix with zeros below a staircase of leading entries (pivots)."],
        ["Pivot", "The first nonzero entry of a row in echelon form, used to eliminate the entries below it."],
        ["Back substitution", "Solving an echelon-form system from the last equation up."],
        ["Free variable", "A variable whose column has no pivot; it can take any value."],
        ["Partial pivoting", "Swapping rows so the largest available entry becomes the pivot, to limit rounding errors."]
      ],
      quiz: [
        { q: "In the column picture, when does Ax = b have a solution?", choices: ["When A is square", "When b is in the span of the columns of A", "When b is zero", "Always"], answer: 1, why: "Ax is a combination of A's columns, so we need b to be one." },
        { q: "Elimination produces the row 0 0 | 5. What does this mean?", choices: ["x = 5", "The system has no solution", "There are infinitely many solutions", "Elimination made a mistake"], answer: 1, why: "The row says 0 = 5, a contradiction." },
        { q: "A system of 3 equations in 4 unknowns has no contradictions after elimination. How many solutions can it have?", choices: ["Exactly one", "None", "Infinitely many", "Exactly four"], answer: 2, why: "At most 3 columns can have pivots, so at least one variable is free." },
        { q: "About how much longer does elimination take on a 2000 × 2000 system than on a 1000 × 1000 one?", choices: ["2 times", "4 times", "8 times", "1000 times"], answer: 2, why: "The cost grows like n³, and 2³ = 8." },
        { q: "Why do libraries use partial pivoting?", choices: ["To find all solutions", "To avoid dividing by tiny pivots, which magnifies rounding errors", "To make matrices symmetric", "It's faster"], answer: 1, why: "Large multipliers amplify floating-point error." }
      ],
      practice: [
        {
          q: `<p>Solve by elimination and back substitution: 2<em>x</em> + <em>y</em> = 5, 4<em>x</em> − 3<em>y</em> = 5. Check your answer.</p>`,
          a: `<p>R2 − 2·R1: −5<em>y</em> = −5, so <em>y</em> = 1, then 2<em>x</em> + 1 = 5, <em>x</em> = 2. Check: 4 + 1 = 5 and 8 − 3 = 5.</p>`
        },
        {
          q: `<p>For which values of <em>k</em> does the system <em>x</em> + 2<em>y</em> = 3, 3<em>x</em> + <em>ky</em> = 9 have (a) exactly one solution, (b) infinitely many, (c) none?</p>`,
          a: `<p>R2 − 3·R1: (<em>k</em> − 6)<em>y</em> = 0. (a) If <em>k</em> ≠ 6, <em>y</em> = 0 and <em>x</em> = 3: one solution. (b) If <em>k</em> = 6, the row is 0 = 0 and <em>y</em> is free: infinitely many. (c) Never: the right side became 0, so no contradiction is possible. (Change 9 to 10 and <em>k</em> = 6 would give none.)</p>`
        },
        {
          q: `<p>Describe all solutions of <em>x</em> + <em>y</em> + <em>z</em> = 6, <em>x</em> − <em>y</em> + 2<em>z</em> = 5. What shape is the solution set?</p>`,
          a: `<p>R2 − R1: −2<em>y</em> + <em>z</em> = −1, so <em>y</em> = (1 + <em>z</em>)/2. With <em>z</em> = <em>t</em> free: <em>y</em> = (1 + <em>t</em>)/2, <em>x</em> = 6 − <em>y</em> − <em>z</em> = (11 − 3<em>t</em>)/2. A line in ℝ³: the intersection of two planes. (Check <em>t</em> = 1: (4, 1, 1) satisfies both.)</p>`
        },
        {
          q: `<p>Solve 0.0001<em>x</em> + <em>y</em> = 1, <em>x</em> + <em>y</em> = 2 by elimination, rounding every intermediate result to 3 significant digits, (a) using 0.0001 as the pivot and (b) after swapping the rows. Compare with the true solution, which is very close to <em>x</em> = 1, <em>y</em> = 1.</p>`,
          hint: `<p>In (a), the multiplier is 10,000, so the second row becomes (1 − 10,000)<em>y</em> = 2 − 10,000. Round both sides to 3 digits.</p>`,
          a: `<p>(a) −9999<em>y</em> = −9998 rounds to −10,000<em>y</em> = −10,000, so <em>y</em> = 1, then 0.0001<em>x</em> = 1 − 1 = 0 and <em>x</em> = 0: badly wrong. (b) Pivot 1: the multiplier is 0.0001, and the second row becomes (1 − 0.0001)<em>y</em> = 1 − 0.0002, which rounds to <em>y</em> = 1; then <em>x</em> = 2 − 1 = 1. Correct. Partial pivoting chose the large pivot and kept the multiplier small.</p>`
        }
      ],
      sources: ["mit1806", "ila"]
    },
    {
      id: "la3",
      title: "Matrices as transformations",
      minutes: 90,
      summary: "Matrix-vector multiplication as a combination of columns, matrices as linear transformations of space (rotations, scalings, shears, projections), matrix multiplication as composition, and why the order of multiplication matters.",
      notes: `
<p>Lesson 2 used a matrix to hold the coefficients of equations. This lesson changes the point of view: a matrix is a <em>function</em> that takes a vector in and gives a vector out. That view explains why matrix multiplication is defined the way it is, and it is how computer graphics, robotics and neural networks use matrices.</p>

<h3>Multiplying a matrix by a vector</h3>
<p>For an <em>m</em> × <em>n</em> matrix <em>A</em> and a vector <b>x</b> in ℝ<sup><em>n</em></sup>, the product <em>A</em><b>x</b> is a vector in ℝ<sup><em>m</em></sup>. There are two equivalent ways to compute it:</p>
<ul>
<li><strong>By rows:</strong> entry <em>i</em> is the dot product of row <em>i</em> with <b>x</b>.</li>
<li><strong>By columns:</strong> <em>A</em><b>x</b> = <em>x</em><sub>1</sub>(column 1) + <em>x</em><sub>2</sub>(column 2) + … + <em>x</em><sub><em>n</em></sub>(column <em>n</em>).</li>
</ul>
<pre data-label="Example"><code>⎡1  2⎤ ⎡5⎤   ⎡1·5 + 2·6⎤   ⎡17⎤        ⎡1⎤     ⎡2⎤   ⎡17⎤
⎣3  4⎦ ⎣6⎦ = ⎣3·5 + 4·6⎦ = ⎣39⎦   = 5 ⎣3⎦ + 6 ⎣4⎦ = ⎣39⎦</code></pre>
<p>The column view gives a key fact at once: <em>A</em> times the <em>j</em>th standard basis vector <b>e</b><sub><em>j</em></sub> (1 in position <em>j</em>, 0 elsewhere) is the <em>j</em>th column of <em>A</em>. <strong>The columns of a matrix are where it sends the basis vectors.</strong></p>

<h3>Linear transformations</h3>
<p>A function <em>T</em> from ℝ<sup><em>n</em></sup> to ℝ<sup><em>m</em></sup> is <strong>linear</strong> if it respects addition and scaling: <em>T</em>(<b>u</b> + <b>v</b>) = <em>T</em>(<b>u</b>) + <em>T</em>(<b>v</b>) and <em>T</em>(<em>c</em><b>v</b>) = <em>c</em><em>T</em>(<b>v</b>). Every matrix gives a linear transformation, <b>x</b> ↦ <em>A</em><b>x</b>. Conversely, every linear transformation is multiplication by some matrix: since any <b>x</b> is a combination of the basis vectors, a linear <em>T</em> is determined by where it sends them, and those images are the columns of its matrix.</p>
<p>So to find the matrix of a transformation of the plane, ask where (1, 0) and (0, 1) go:</p>
<table>
<thead><tr><th>Transformation</th><th>(1, 0) goes to</th><th>(0, 1) goes to</th><th>Matrix (rows)</th></tr></thead>
<tbody>
<tr><td>Scale x by 2</td><td>(2, 0)</td><td>(0, 1)</td><td>[2 0; 0 1]</td></tr>
<tr><td>Rotate 90° counterclockwise</td><td>(0, 1)</td><td>(−1, 0)</td><td>[0 −1; 1 0]</td></tr>
<tr><td>Rotate by θ</td><td>(cos θ, sin θ)</td><td>(−sin θ, cos θ)</td><td>[cos θ −sin θ; sin θ cos θ]</td></tr>
<tr><td>Reflect across the x-axis</td><td>(1, 0)</td><td>(0, −1)</td><td>[1 0; 0 −1]</td></tr>
<tr><td>Shear (slide x by y)</td><td>(1, 0)</td><td>(1, 1)</td><td>[1 1; 0 1]</td></tr>
<tr><td>Project onto the x-axis</td><td>(1, 0)</td><td>(0, 0)</td><td>[1 0; 0 0]</td></tr>
</tbody>
</table>
<p>(We write a matrix's rows separated by semicolons: [<em>a</em> <em>b</em>; <em>c</em> <em>d</em>] has first row <em>a</em>, <em>b</em> and second row <em>c</em>, <em>d</em>.) Linear transformations keep the origin fixed, send lines to lines (or to a point), and keep grid lines parallel and evenly spaced. Translation (shifting everything by a fixed vector) is <em>not</em> linear, because it moves the origin; graphics systems handle it with a trick, adding an extra coordinate fixed at 1 (<em>homogeneous coordinates</em>).</p>

<h3>Matrix multiplication is composition</h3>
<p>If <em>B</em> transforms <b>x</b> and then <em>A</em> transforms the result, the combined transformation is <b>x</b> ↦ <em>A</em>(<em>B</em><b>x</b>). It is linear, so it has a matrix, and that matrix is defined to be the product <em>AB</em>. Its columns are <em>A</em> applied to the columns of <em>B</em> (where the combined map sends each basis vector). In entries, for <em>A</em> of size <em>m</em> × <em>n</em> and <em>B</em> of size <em>n</em> × <em>p</em>:</p>
<p class="math">(AB)<sub>ij</sub> = row i of A · column j of B = Σ<sub>k</sub> A<sub>ik</sub>B<sub>kj</sub></p>
<p>The inner sizes must match (the <em>n</em>), and the product is <em>m</em> × <em>p</em>. Computing it with three nested loops takes Θ(<em>mnp</em>) operations, Θ(<em>n</em>³) for square matrices. (CS 210 Lesson 7 showed that the loop order matters for speed.)</p>
<pre><code>def matmul(A, B):
    n, p = len(B), len(B[0])
    return [[sum(A[i][k] * B[k][j] for k in range(n)) for j in range(p)]
            for i in range(len(A))]

R = [[0, -1], [1, 0]]      # rotate 90° counterclockwise
S = [[2, 0], [0, 1]]       # stretch x by 2
print(matmul(R, S))        # [[0, -1], [2, 0]]: stretch, then rotate
print(matmul(S, R))        # [[0, -2], [1, 0]]: rotate, then stretch</code></pre>
<p>The two products differ: <strong>matrix multiplication is not commutative</strong>. Rotating then stretching isn't the same as stretching then rotating (try it on (1, 0): <em>RS</em> sends it to (0, 2), <em>SR</em> to (0, 1)). Notice too the order of reading: in <em>AB</em><b>x</b>, <em>B</em> acts first. Matrix multiplication <em>is</em> associative, (<em>AB</em>)<em>C</em> = <em>A</em>(<em>BC</em>), because composing functions is.</p>
<p>The <strong>identity matrix</strong> <em>I</em>, with 1s on the diagonal and 0s elsewhere, is the transformation that changes nothing: <em>AI</em> = <em>IA</em> = <em>A</em>. The <strong>transpose</strong> <em>A</em><sup>T</sup> swaps rows and columns: (<em>A</em><sup>T</sup>)<sub><em>ij</em></sub> = <em>A</em><sub><em>ji</em></sub>. It satisfies (<em>AB</em>)<sup>T</sup> = <em>B</em><sup>T</sup><em>A</em><sup>T</sup> and connects to the dot product: <b>u</b> · <b>v</b> = <b>u</b><sup>T</sup><b>v</b> when vectors are treated as one-column matrices.</p>

<h3>Where you'll meet this</h3>
<ul>
<li><strong>Graphics:</strong> every frame of a 3-D game multiplies millions of vertex coordinates by 4 × 4 matrices that combine rotation, scaling, translation (in homogeneous coordinates) and perspective; graphics cards are built to do exactly this quickly.</li>
<li><strong>Neural networks:</strong> each layer computes a matrix times a vector (followed by a simple non-linear function), and training them is dominated by matrix multiplications.</li>
<li><strong>Markov chains and PageRank</strong> (Lesson 7) repeatedly multiply a vector by one matrix.</li>
</ul>
`,
      terms: [
        ["Matrix-vector product", "Ax: a linear combination of A's columns with the entries of x as coefficients."],
        ["Linear transformation", "A function T with T(u + v) = T(u) + T(v) and T(cv) = cT(v); always multiplication by a matrix."],
        ["Standard basis vector", "eⱼ, with 1 in position j and 0 elsewhere; Aeⱼ is column j of A."],
        ["Matrix product", "AB, the matrix of applying B and then A; (AB)ᵢⱼ = row i of A · column j of B."],
        ["Identity matrix", "I, with 1s on the diagonal and 0s elsewhere; AI = IA = A."],
        ["Transpose", "Aᵀ, the matrix with rows and columns swapped."]
      ],
      quiz: [
        { q: "What is [2 1; 0 3] times (4, −1)?", choices: ["(7, −3)", "(8, −3)", "(7, 3)", "(9, 0)"], answer: 0, why: "Rows: 2·4 + 1·(−1) = 7; 0·4 + 3·(−1) = −3." },
        { q: "A linear transformation sends (1, 0) to (3, 1) and (0, 1) to (−2, 5). What is its matrix?", choices: ["[3 1; −2 5]", "[3 −2; 1 5]", "[1 3; 5 −2]", "[3 5; 1 −2]"], answer: 1, why: "The images of the basis vectors are the columns." },
        { q: "If A is 2 × 3 and B is 3 × 4, what size is AB?", choices: ["3 × 3", "2 × 4", "4 × 2", "Undefined"], answer: 1, why: "Inner sizes (3) match; the result is outer sizes, 2 × 4." },
        { q: "In ABx, which matrix acts on x first?", choices: ["A", "B", "Whichever is larger", "They act together"], answer: 1, why: "ABx = A(Bx)." },
        { q: "Why isn't translation by (1, 0) a linear transformation?", choices: ["It changes lengths", "It moves the origin, but T(0) must be 0", "It isn't continuous", "It changes angles"], answer: 1, why: "Linearity forces T(0) = T(0·0) = 0·T(0) = 0." }
      ],
      practice: [
        {
          q: `<p>Find the matrix that rotates the plane by 45° counterclockwise, and apply it to (1, 0) and (1, 1).</p>`,
          a: `<p>[cos 45° −sin 45°; sin 45° cos 45°] = (1/√2)[1 −1; 1 1]. (1, 0) ↦ (1/√2, 1/√2); (1, 1) ↦ (0, 2/√2) = (0, √2). Lengths are preserved: both images have the same length as the originals.</p>`
        },
        {
          q: `<p>Compute <em>AB</em> and <em>BA</em> for <em>A</em> = [1 2; 0 1] and <em>B</em> = [1 0; 3 1]. Describe each matrix as a transformation.</p>`,
          a: `<p><em>AB</em> = [1·1 + 2·3, 1·0 + 2·1; 0 + 3, 1] = [7 2; 3 1]. <em>BA</em> = [1 2; 3 7]. <em>A</em> is a horizontal shear (<em>x</em> += 2<em>y</em>); <em>B</em> is a vertical shear (<em>y</em> += 3<em>x</em>). Shearing in the two orders gives different results.</p>`
        },
        {
          q: `<p>Show that rotating by α and then by β is the same as rotating by α + β, by multiplying the two rotation matrices. Which trigonometric identities appear?</p>`,
          a: `<p>The (1, 1) entry of <em>R</em>(β)<em>R</em>(α) is cos β cos α − sin β sin α = cos(α + β); the (2, 1) entry is sin β cos α + cos β sin α = sin(α + β); similarly for the other column. So the product is <em>R</em>(α + β). These are the angle-addition formulas, which this computation also proves.</p>`
        },
        {
          q: `<p>The matrix <em>P</em> = [1 0; 0 0] projects onto the <em>x</em>-axis. Compute <em>P</em>² and explain the result geometrically.</p>`,
          a: `<p><em>P</em>² = <em>P</em>. Projecting a second time changes nothing, because the point is already on the <em>x</em>-axis. Matrices with <em>P</em>² = <em>P</em> are called projections.</p>`
        }
      ],
      sources: ["mit1806", "eola", "ila"]
    },
    {
      id: "la4",
      title: "Inverses and determinants",
      minutes: 90,
      summary: "When a transformation can be undone, how to compute an inverse and why you rarely should, the determinant as the factor by which a matrix scales area or volume, how to compute it, and how it tells invertible matrices from singular ones.",
      notes: `
<p>If a matrix <em>A</em> transforms <b>x</b> into <b>b</b>, can we go back from <b>b</b> to <b>x</b>? Sometimes. This lesson finds out when, and introduces a single number, the determinant, that decides it.</p>

<h3>The inverse</h3>
<p>A square matrix <em>A</em> is <strong>invertible</strong> if there's a matrix <em>A</em><sup>−1</sup> with <em>A</em><sup>−1</sup><em>A</em> = <em>AA</em><sup>−1</sup> = <em>I</em>. Then <em>A</em><b>x</b> = <b>b</b> has exactly one solution, <b>x</b> = <em>A</em><sup>−1</sup><b>b</b>. A matrix with no inverse is <strong>singular</strong>.</p>
<p>Geometrically, <em>A</em> is invertible when its transformation loses no information. A rotation can be undone (rotate back). A projection onto the <em>x</em>-axis can't: (2, 5) and (2, −3) both land on (2, 0), and nothing can tell which one you started from. Connecting to Lesson 2, these are equivalent for an <em>n</em> × <em>n</em> matrix:</p>
<ul>
<li><em>A</em> is invertible;</li>
<li>elimination gives <em>n</em> pivots;</li>
<li><em>A</em><b>x</b> = <b>b</b> has exactly one solution for every <b>b</b>;</li>
<li><em>A</em><b>x</b> = <b>0</b> has only the solution <b>x</b> = <b>0</b>;</li>
<li>the columns of <em>A</em> span ℝ<sup><em>n</em></sup>.</li>
</ul>
<p>For a 2 × 2 matrix there's a formula:</p>
<p class="math">[a b; c d]<sup>−1</sup> = (1/(ad − bc)) · [d −b; −c a],   provided ad − bc ≠ 0</p>
<p>For example, <em>M</em> = [3 1; 2 4] has <em>ad</em> − <em>bc</em> = 12 − 2 = 10, so <em>M</em><sup>−1</sup> = (1/10)[4 −1; −2 3] = [0.4 −0.1; −0.2 0.3]. Check: <em>MM</em><sup>−1</sup> has (1, 1) entry 3(0.4) + 1(−0.2) = 1 and (1, 2) entry 3(−0.1) + 1(0.3) = 0, and so on.</p>
<p>For larger matrices, <strong>Gauss–Jordan elimination</strong> computes the inverse: row-reduce the augmented matrix [<em>A</em> | <em>I</em>] until the left half becomes <em>I</em>; the right half is then <em>A</em><sup>−1</sup>. (Each row operation is itself multiplication by a simple matrix, and their product, the record of everything done to turn <em>A</em> into <em>I</em>, is <em>A</em><sup>−1</sup>.) Two useful rules: (<em>AB</em>)<sup>−1</sup> = <em>B</em><sup>−1</sup><em>A</em><sup>−1</sup> (undo the last step first, like taking off shoes before socks), and (<em>A</em><sup>T</sup>)<sup>−1</sup> = (<em>A</em><sup>−1</sup>)<sup>T</sup>.</p>
<div class="callout"><p><strong>Don't invert to solve.</strong> To solve <em>A</em><b>x</b> = <b>b</b> on a computer, use elimination (<code>np.linalg.solve(A, b)</code>, Lesson 2), not <code>np.linalg.inv(A) @ b</code>, which first computes the inverse matrix with <code>np.linalg.inv</code> and then multiplies it by <b>b</b> with <code>@</code> (Lesson 1's NumPy section). Computing the inverse takes about three times as much work and is less accurate. The inverse is a tool for thinking and for formulas, not usually for computing.</p></div>

<h3>The determinant</h3>
<p>A linear transformation of the plane turns the unit square (with corners at <b>0</b>, <b>e</b><sub>1</sub>, <b>e</b><sub>2</sub> and <b>e</b><sub>1</sub> + <b>e</b><sub>2</sub>) into a parallelogram whose sides are the matrix's columns. The <strong>determinant</strong>, det <em>A</em>, is the signed area of that parallelogram: the factor by which <em>A</em> scales every area. For a 2 × 2 matrix:</p>
<p class="math">det [a b; c d] = ad − bc</p>
<p>The same number appeared in the inverse formula, and for a good reason. If det <em>A</em> = 0, the parallelogram is flat: the columns lie on one line, the whole plane is squashed onto a line or a point, information is lost, and <em>A</em> is singular. If det <em>A</em> ≠ 0, <em>A</em> is invertible. The <em>sign</em> records orientation: a negative determinant means the transformation flips the plane over, as a reflection does.</p>
<p>The sign also depends on the order of the columns. Write det [<b>u</b> <b>v</b>] for the 2 × 2 matrix with columns <b>u</b> and <b>v</b>. Turning from <b>e</b><sub>1</sub> = (1, 0) to <b>e</b><sub>2</sub> = (0, 1) is a counterclockwise turn of 90°, and det [<b>e</b><sub>1</sub> <b>e</b><sub>2</sub>] = det <em>I</em> = 1 is positive. In general, det [<b>u</b> <b>v</b>] is positive when the shorter turn from <b>u</b> to <b>v</b> (less than 180°) is counterclockwise, as from <b>e</b><sub>1</sub> to <b>e</b><sub>2</sub>; negative when it is clockwise; and zero when <b>u</b> and <b>v</b> lie on one line. Swapping the columns reverses the turn and changes the sign: det [<b>e</b><sub>2</sub> <b>e</b><sub>1</sub>] = 0 · 0 − 1 · 1 = −1. (Why: with <b>u</b> = (<em>a</em>, <em>c</em>) at angle α and <b>v</b> = (<em>b</em>, <em>d</em>) at angle β, <em>ad</em> − <em>bc</em> = ‖<b>u</b>‖ ‖<b>v</b>‖ (cos α sin β − sin α cos β) = ‖<b>u</b>‖ ‖<b>v</b>‖ sin(β − α), and sin(β − α) is positive exactly when the turn from α to β is counterclockwise and less than 180°.) Finally, the triangle with corners <b>0</b>, <b>u</b> and <b>v</b> is half of the parallelogram (the diagonal from <b>u</b> to <b>v</b> cuts it into two equal triangles), so its area is |det [<b>u</b> <b>v</b>]|/2.</p>
<ul>
<li>Rotations have determinant 1: they preserve area and orientation.</li>
<li>[2 0; 0 3] has determinant 6: it scales areas by 6.</li>
<li>The shear [1 1; 0 1] has determinant 1: it slants the square into a parallelogram of the same area.</li>
<li>The reflection [1 0; 0 −1] has determinant −1.</li>
<li>The projection [1 0; 0 0] has determinant 0.</li>
</ul>
<p>In three dimensions, the determinant is the signed <em>volume</em> of the parallelepiped spanned by the columns, and the same story holds in any dimension.</p>

<h3>Properties and computation</h3>
<p>The determinant has a few properties that make it useful:</p>
<ul>
<li>det(<em>AB</em>) = det <em>A</em> · det <em>B</em>. (Scaling area by one factor and then another multiplies the factors.) So det(<em>A</em><sup>−1</sup>) = 1/det <em>A</em>.</li>
<li>det <em>A</em><sup>T</sup> = det <em>A</em>.</li>
<li>Swapping two rows changes the sign; multiplying a row by <em>c</em> multiplies the determinant by <em>c</em>; adding a multiple of one row to another doesn't change it.</li>
<li>The determinant of a triangular matrix (all zeros below, or above, the diagonal) is the product of its diagonal entries.</li>
</ul>
<p>The last two give the efficient way to compute determinants: eliminate to echelon form, which is triangular, keeping track of row swaps. Then det <em>A</em> = ± (product of the pivots), with a minus sign for an odd number of swaps. For the matrix in Lesson 2, the pivots were 1, −5 and 2 with no swaps, so its determinant is 1 · (−5) · 2 = −10. This costs Θ(<em>n</em>³), like elimination.</p>
<p>For a 3 × 3 matrix there is also a direct formula, <strong>cofactor expansion</strong> along the first row:</p>
<p class="math">det [a b c; d e f; g h i] = a(ei − fh) − b(di − fg) + c(dh − eg)</p>
<p>For <em>B</em> = [2 1 0; 1 3 1; 0 1 2]: 2(6 − 1) − 1(2 − 0) + 0 = 10 − 2 = 8. Cofactor expansion generalizes to <em>n</em> × <em>n</em>, but it then involves <em>n</em>! terms, hopeless for large <em>n</em>: 20! is about 2.4 × 10<sup>18</sup>. Elimination needs about 5,000 operations for <em>n</em> = 20.</p>

<h3>Why determinants matter</h3>
<p>Beyond deciding invertibility, determinants measure how transformations change size. In MATH 131's double integrals, changing variables (for example to polar coordinates) multiplies the area element by the absolute value of a determinant, the <em>Jacobian</em>, which is where the extra <em>r</em> in <em>r</em> <em>dr</em> <em>dθ</em> comes from. In Lesson 7, determinants find eigenvalues. In computational geometry, the sign of a 2 × 2 determinant tells whether three points turn left or right, the basic test in algorithms for convex hulls and polygon intersection.</p>
`,
      terms: [
        ["Inverse", "A⁻¹, the matrix with A⁻¹A = AA⁻¹ = I; undoes the transformation A."],
        ["Invertible / singular", "A square matrix with an inverse, or without one."],
        ["Gauss–Jordan elimination", "Row-reducing [A | I] to [I | A⁻¹] to compute an inverse."],
        ["Determinant", "det A, the signed factor by which A scales areas (or volumes); zero exactly when A is singular."],
        ["Triangular matrix", "A square matrix with all zeros below (or above) the diagonal; its determinant is the product of the diagonal."],
        ["Cofactor expansion", "A formula for the determinant as a signed sum of entries times smaller determinants; impractical for large n."]
      ],
      quiz: [
        { q: "What is det [4 2; 3 5]?", choices: ["14", "26", "20", "−2"], answer: 0, why: "4·5 − 2·3 = 20 − 6 = 14." },
        { q: "What is the inverse of [2 0; 0 4]?", choices: ["[−2 0; 0 −4]", "[0.5 0; 0 0.25]", "[4 0; 0 2]", "It has none"], answer: 1, why: "Undo each scaling: divide x by 2 and y by 4." },
        { q: "det A = 3 and det B = −2. What is det(AB)?", choices: ["1", "−6", "6", "−1"], answer: 1, why: "det(AB) = det A · det B." },
        { q: "A 2 × 2 matrix has determinant 0. Which is true?", choices: ["It is a rotation", "Its columns lie on one line, and it has no inverse", "It is the identity", "It doubles areas"], answer: 1, why: "Zero area means the plane is flattened, losing information." },
        { q: "Why is cofactor expansion a poor way to compute a 30 × 30 determinant?", choices: ["It gives the wrong answer", "It involves about 30! terms", "It needs complex numbers", "It only works for 3 × 3"], answer: 1, why: "30! ≈ 2.7 × 10³²; elimination needs about 18,000 operations." }
      ],
      practice: [
        {
          q: `<p>Find the inverse of [2 3; 1 2] with the formula, and use it to solve 2<em>x</em> + 3<em>y</em> = 7, <em>x</em> + 2<em>y</em> = 4.</p>`,
          a: `<p>det = 4 − 3 = 1, so the inverse is [2 −3; −1 2]. Then (<em>x</em>, <em>y</em>) = [2 −3; −1 2](7, 4) = (14 − 12, −7 + 8) = (2, 1). Check: 4 + 3 = 7, 2 + 2 = 4.</p>`
        },
        {
          q: `<p>Compute the determinant of [1 2 3; 0 4 5; 1 0 6] by elimination, then check with cofactor expansion.</p>`,
          a: `<p>R3 − R1: [1 2 3; 0 4 5; 0 −2 3]. R3 + (1/2)R2: [1 2 3; 0 4 5; 0 0 5.5]. det = 1 · 4 · 5.5 = 22. Cofactors: 1(24 − 0) − 2(0 − 5) + 3(0 − 4) = 24 + 10 − 12 = 22.</p>`
        },
        {
          q: `<p>For which <em>k</em> is [1 <em>k</em>; <em>k</em> 4] singular? Describe what the matrix does to the plane in that case.</p>`,
          a: `<p>det = 4 − <em>k</em>², which is 0 for <em>k</em> = ±2. For <em>k</em> = 2 the columns (1, 2) and (2, 4) are parallel: every vector is sent onto the line through (1, 2), squashing the plane onto a line.</p>`
        },
        {
          q: `<p>A triangle has corners (0, 0), (3, 1) and (1, 2). Use a determinant to find its area. Then explain why the sign of the determinant tells whether going from (3, 1) to (1, 2) turns counterclockwise around the origin.</p>`,
          a: `<p>The parallelogram spanned by (3, 1) and (1, 2) has area |det [3 1; 1 2]| = |6 − 1| = 5, and the triangle is half: 2.5. The determinant is positive, so (3, 1) then (1, 2) has the same orientation as <b>e</b><sub>1</sub> then <b>e</b><sub>2</sub>: a counterclockwise turn. Swapping the two vectors would give −5, a clockwise turn.</p>`
        }
      ],
      sources: ["mit1806", "eola", "ila"]
    }
  ]
});

CSA.addUnits("math220", [
    {
      id: "la5",
      title: "Vector spaces, bases and rank",
      minutes: 90,
      summary: "Subspaces, linear independence, bases and dimension; the column space and null space of a matrix; rank and the rank–nullity theorem; and what they say about solving linear systems.",
      notes: `
<p>Lessons 1–4 worked with particular vectors and matrices. This lesson introduces the vocabulary for talking about whole families of vectors at once. It answers precise versions of questions like: how many of these vectors are really needed? How much freedom does this system of equations leave?</p>

<h3>Subspaces</h3>
<p>A <strong>subspace</strong> of ℝ<sup><em>n</em></sup> is a set of vectors that contains <b>0</b> and is closed under addition and scaling: adding two vectors in the set, or scaling one, gives a vector still in the set. In ℝ³ the subspaces are: just {<b>0</b>}, lines through the origin, planes through the origin, and ℝ³ itself. A line that misses the origin is <em>not</em> a subspace (it doesn't contain <b>0</b>, and adding two of its vectors leaves the line).</p>
<p>The span of any vectors is a subspace, and every subspace is the span of some vectors. Linear algebra calls a set closed under addition and scaling a <strong>vector space</strong>; the idea applies beyond lists of numbers, to polynomials, functions and signals, but in this course our vector spaces are subspaces of ℝ<sup><em>n</em></sup>.</p>

<h3>Linear independence</h3>
<p>Vectors <b>v</b><sub>1</sub>, …, <b>v</b><sub><em>k</em></sub> are <strong>linearly independent</strong> if the only combination giving zero is the trivial one:</p>
<p class="math">c<sub>1</sub><b>v</b><sub>1</sub> + … + c<sub>k</sub><b>v</b><sub>k</sub> = <b>0</b>   only when   c<sub>1</sub> = … = c<sub>k</sub> = 0</p>
<p>Otherwise they're <strong>dependent</strong>, and at least one of them is a combination of the others, so it adds nothing to their span. (1, 0, 0), (0, 1, 0), (1, 1, 0) are dependent: the third is the sum of the first two, and all three span only the <em>xy</em>-plane. To test independence, put the vectors in the columns of a matrix <em>A</em> and eliminate: they are independent exactly when every column gets a pivot, that is, when <em>A</em><b>c</b> = <b>0</b> has only <b>c</b> = <b>0</b>.</p>

<h3>Basis and dimension</h3>
<p>A <strong>basis</strong> of a subspace is a set of vectors that is linearly independent and spans the subspace: enough vectors to reach everything, and none wasted. Every vector in the subspace is then a combination of the basis vectors in exactly one way; the coefficients are its <strong>coordinates</strong> in that basis.</p>
<p>A subspace has many bases. (1, 0), (0, 1) is a basis of ℝ², and so is (1, 1), (1, −1) (Lesson 1). But every basis of a given subspace has the same number of vectors, called its <strong>dimension</strong>. ℝ<sup><em>n</em></sup> has dimension <em>n</em>; a plane through the origin has dimension 2; a line, 1; {<b>0</b>}, 0. Two consequences: in ℝ<sup><em>n</em></sup>, more than <em>n</em> vectors must be dependent, and fewer than <em>n</em> can't span.</p>
<p>Choosing a good basis is one of the main tools of applied mathematics. JPEG image compression rewrites each 8 × 8 block of pixels in a basis of cosine patterns, in which most coordinates are nearly zero and can be dropped. Lessons 7 and 8 find bases in which a matrix becomes especially simple.</p>

<h3>The column space and the null space</h3>
<p>Every <em>m</em> × <em>n</em> matrix <em>A</em> has two subspaces that answer the two questions about <em>A</em><b>x</b> = <b>b</b>:</p>
<ul>
<li>The <strong>column space</strong> C(<em>A</em>) is the span of the columns, a subspace of ℝ<sup><em>m</em></sup>. <em>A</em><b>x</b> = <b>b</b> has a solution exactly when <b>b</b> is in C(<em>A</em>). This is the <em>existence</em> question.</li>
<li>The <strong>null space</strong> N(<em>A</em>) is the set of all <b>x</b> with <em>A</em><b>x</b> = <b>0</b>, a subspace of ℝ<sup><em>n</em></sup>. If <b>x</b><sub>p</sub> is one solution of <em>A</em><b>x</b> = <b>b</b>, then <em>every</em> solution is <b>x</b><sub>p</sub> + <b>n</b> for some <b>n</b> in N(<em>A</em>), because <em>A</em>(<b>x</b><sub>p</sub> + <b>n</b>) = <b>b</b> + <b>0</b>. This is the <em>uniqueness</em> question: the solution is unique exactly when N(<em>A</em>) = {<b>0</b>}.</li>
</ul>
<p>Lesson 2's line of solutions, <em>x</em> = 3 − 2<em>t</em>, <em>y</em> = <em>t</em>, is exactly this shape: one solution (3, 0) plus any multiple of (−2, 1), which spans the null space of [1 2; 2 4].</p>

<h3>Rank</h3>
<p>The <strong>rank</strong> of <em>A</em> is the number of pivots elimination produces. It equals the dimension of the column space (the pivot columns of <em>A</em> form a basis of it). It also equals the dimension of the <strong>row space</strong>, the span of the rows of <em>A</em> (a subspace of ℝ<sup><em>n</em></sup>). That is less obvious, but elimination shows it: row operations replace rows by combinations of rows, so they never change the row space, and at the end the nonzero rows, one per pivot, are independent and span it. Each free column contributes one independent vector to the null space, so</p>
<p class="math">rank(A) + dim N(A) = n   (the number of columns)</p>
<p>This is the <strong>rank–nullity theorem</strong>: each column either adds a new direction to the output or adds a direction of input that is lost. For example,</p>
<pre data-label="Matrix"><code>    ⎡1  2  3⎤
B = ⎢2  4  6⎥
    ⎣1  0  1⎦</code></pre>
<p>Row 2 is twice row 1, so elimination makes it zero; rows 1 and 3 give two pivots. So rank <em>B</em> = 2, the column space is a plane in ℝ³, and the null space has dimension 3 − 2 = 1. Solving <em>B</em><b>x</b> = <b>0</b> gives the line spanned by (1, 1, −1): check 1 + 2 − 3 = 0, 2 + 4 − 6 = 0, 1 + 0 − 1 = 0.</p>
<p>Rank is the honest size of a matrix: how many independent things it really does. A 1000 × 1000 matrix of rank 10 is described by far fewer numbers than its million entries, an idea Lesson 8 exploits. In data, rank deficiency means redundant measurements: a spreadsheet with a "price in dollars" column and a "price in euros" column has dependent columns.</p>
`,
      terms: [
        ["Subspace", "A set of vectors containing 0 and closed under addition and scaling."],
        ["Linearly independent", "No vector in the set is a combination of the others; only the trivial combination gives 0."],
        ["Basis", "A linearly independent set that spans a subspace."],
        ["Dimension", "The number of vectors in any basis of a subspace."],
        ["Column space", "C(A), the span of A's columns; Ax = b is solvable exactly when b is in it."],
        ["Null space", "N(A), all x with Ax = 0; the solutions of Ax = b are one solution plus the null space."],
        ["Row space", "The span of the rows of a matrix; its dimension is also the rank."],
        ["Rank", "The number of pivots; the dimension of the column space (and of the row space)."],
        ["Rank–nullity theorem", "rank(A) + dim N(A) = number of columns of A."]
      ],
      quiz: [
        { q: "Which set is a subspace of ℝ²?", choices: ["The line y = x + 1", "The line y = 3x", "The first quadrant", "The unit circle"], answer: 1, why: "It contains 0 and is closed under addition and scaling." },
        { q: "Are (1, 2, 3), (4, 5, 6), (7, 8, 9) linearly independent?", choices: ["Yes", "No: (7, 8, 9) = 2(4, 5, 6) − (1, 2, 3)", "Only in ℝ²", "It can't be decided"], answer: 1, why: "2(4, 5, 6) − (1, 2, 3) = (7, 8, 9)." },
        { q: "What is the dimension of a plane through the origin in ℝ³?", choices: ["1", "2", "3", "Infinite"], answer: 1, why: "Any basis has two vectors." },
        { q: "A 5 × 7 matrix has rank 4. What is the dimension of its null space?", choices: ["1", "2", "3", "4"], answer: 2, why: "Rank–nullity: 7 − 4 = 3." },
        { q: "Ax = b has a solution, and N(A) contains a nonzero vector. How many solutions are there?", choices: ["Exactly one", "None", "Infinitely many", "Exactly two"], answer: 2, why: "Adding any multiple of the null vector to a solution gives another." }
      ],
      practice: [
        {
          q: `<p>Find a basis of the plane <em>x</em> + 2<em>y</em> − <em>z</em> = 0 in ℝ³, and give the coordinates of (1, 1, 3) in your basis.</p>`,
          a: `<p><em>z</em> = <em>x</em> + 2<em>y</em>, so the plane is all (<em>x</em>, <em>y</em>, <em>x</em> + 2<em>y</em>) = <em>x</em>(1, 0, 1) + <em>y</em>(0, 1, 2). Basis: (1, 0, 1), (0, 1, 2). (1, 1, 3) = 1(1, 0, 1) + 1(0, 1, 2), so its coordinates are (1, 1). (Check: 1 + 2 − 3 = 0, so it is in the plane.)</p>`
        },
        {
          q: `<p>Find the rank of [1 1 2; 2 3 5; 1 2 3] and a basis of its null space.</p>`,
          a: `<p>R2 − 2R1 = (0, 1, 1); R3 − R1 = (0, 1, 1); then R3 − R2 = 0. Two pivots: rank 2. With <em>z</em> = <em>t</em> free: <em>y</em> = −<em>t</em>, <em>x</em> = −<em>y</em> − 2<em>z</em> = −<em>t</em>. Null space basis: (−1, −1, 1). Check: −1 − 1 + 2 = 0, −2 − 3 + 5 = 0, −1 − 2 + 3 = 0.</p>`
        },
        {
          q: `<p>Explain why four vectors in ℝ³ must be linearly dependent, using elimination.</p>`,
          a: `<p>Put them in the columns of a 3 × 4 matrix. Elimination gives at most 3 pivots (one per row), so at least one of the 4 columns has none. Its variable is free, so <em>A</em><b>c</b> = <b>0</b> has a nonzero solution: a nontrivial combination equal to zero.</p>`
        },
        {
          q: `<p>A dataset has 1,000 rows and these columns: height in cm, height in inches, weight in kg, and body-mass index (BMI = weight / height² in meters). What is the largest possible rank of the 1000 × 4 data matrix? Which columns cause linear dependence, and which relationship is <em>not</em> linear?</p>`,
          a: `<p>Height in inches = height in cm / 2.54, an exact linear relationship, so those two columns are dependent and the rank is at most 3. BMI depends on weight and height, but not linearly (it divides by height squared), so it doesn't lower the rank; with real data the rank will be 3.</p>`
        }
      ],
      sources: ["mit1806", "ila"]
    },
    {
      id: "la6",
      title: "Orthogonality and least squares",
      minutes: 90,
      summary: "Projecting a vector onto a line or subspace, the least-squares solution of an equation with no exact solution, fitting a line to data with the normal equations, and orthonormal bases from Gram–Schmidt.",
      notes: `
<p>Real data rarely fits a model exactly. Measurements have noise, and a straight line won't pass through every point. When <em>A</em><b>x</b> = <b>b</b> has no solution, the next best thing is the <b>x</b> that makes <em>A</em><b>x</b> as close as possible to <b>b</b>. Finding it is a problem about perpendicularity.</p>

<h3>Projection onto a line</h3>
<p>The point on the line through <b>a</b> that is closest to <b>b</b> is the <strong>projection</strong> of <b>b</b> onto <b>a</b>, written <b>p</b>. It's where you'd land by dropping a perpendicular from <b>b</b>: the error <b>e</b> = <b>b</b> − <b>p</b> is orthogonal to <b>a</b>. Since <b>p</b> = <em>t</em><b>a</b> for some number <em>t</em>, the condition <b>a</b> · (<b>b</b> − <em>t</em><b>a</b>) = 0 gives</p>
<p class="math">t = (<b>a</b> · <b>b</b>) / (<b>a</b> · <b>a</b>),     <b>p</b> = ((<b>a</b> · <b>b</b>) / (<b>a</b> · <b>a</b>)) <b>a</b></p>
<p>For <b>a</b> = (1, 2) and <b>b</b> = (3, 1): <em>t</em> = (3 + 2)/5 = 1, so <b>p</b> = (1, 2) and <b>e</b> = (2, −1). Check: <b>e</b> · <b>a</b> = 2 − 2 = 0. The distance from <b>b</b> to the line is ‖<b>e</b>‖ = √5.</p>
<p>Why is the perpendicular point the closest? For any other point <b>q</b> on the line, <b>b</b> − <b>q</b> = <b>e</b> + (<b>p</b> − <b>q</b>), and <b>e</b> is orthogonal to <b>p</b> − <b>q</b> (which lies along <b>a</b>). By the Pythagorean theorem, ‖<b>b</b> − <b>q</b>‖² = ‖<b>e</b>‖² + ‖<b>p</b> − <b>q</b>‖² ≥ ‖<b>e</b>‖².</p>

<h3>Least squares</h3>
<p>Now suppose <em>A</em><b>x</b> = <b>b</b> has no solution: <b>b</b> isn't in the column space of <em>A</em>. The vectors <em>A</em><b>x</b> make up the column space, so the closest one to <b>b</b> is the projection of <b>b</b> onto the column space. The error <b>b</b> − <em>A</em><b>x̂</b> must be orthogonal to every column of <em>A</em>, which says <em>A</em><sup>T</sup>(<b>b</b> − <em>A</em><b>x̂</b>) = <b>0</b>, or</p>
<p class="math">A<sup>T</sup>A <b>x̂</b> = A<sup>T</sup><b>b</b></p>
<p>These are the <strong>normal equations</strong> ("normal" means perpendicular). Their solution <b>x̂</b> is the <strong>least-squares solution</strong>: it minimizes ‖<b>b</b> − <em>A</em><b>x</b>‖², the sum of squared errors. If the columns of <em>A</em> are independent, <em>A</em><sup>T</sup><em>A</em> is invertible and <b>x̂</b> is unique.</p>

<h3>Fitting a line</h3>
<p>Fit a line <em>y</em> = <em>c</em> + <em>m</em><em>x</em> to the points (0, 1), (1, 3), (2, 4), (3, 4). We'd like all four equations to hold:</p>
<pre data-label="System"><code>c + 0m = 1
c + 1m = 3            ⎡1 0⎤         ⎡1⎤
c + 2m = 4      A  =  ⎢1 1⎥   b  =  ⎢3⎥
c + 3m = 4            ⎢1 2⎥         ⎢4⎥
                      ⎣1 3⎦         ⎣4⎦</code></pre>
<p>Four equations in two unknowns, with no exact solution. The normal equations:</p>
<p class="math">A<sup>T</sup>A = [4 6; 6 14],   A<sup>T</sup><b>b</b> = (12, 23)</p>
<p>(<em>A</em><sup>T</sup><em>A</em> has entries 4 = number of points, 6 = Σ<em>x</em>, 14 = Σ<em>x</em>²; <em>A</em><sup>T</sup><b>b</b> has Σ<em>y</em> = 12 and Σ<em>xy</em> = 0 + 3 + 8 + 12 = 23.) Solving 4<em>c</em> + 6<em>m</em> = 12 and 6<em>c</em> + 14<em>m</em> = 23: multiplying the first by 1.5 and subtracting gives 5<em>m</em> = 5, so <em>m</em> = 1 and <em>c</em> = 1.5. The best line is <em>y</em> = 1.5 + <em>x</em>. Its errors at the four points are −0.5, 0.5, 0.5, −0.5: they sum to zero and are orthogonal to the <em>x</em>-values (0, 1, 2, 3), as the normal equations require.</p>
<p>In NumPy (Lesson 1's last section), <code>np.ones(4)</code> is an array of four 1s, and <code>np.column_stack</code> puts arrays side by side as the columns of a 2-D array, which builds <em>A</em>. <code>np.linalg.lstsq(A, y, rcond=None)</code> finds the least-squares solution. It returns four things (the solution, the sum of squared errors, the rank of <em>A</em> and the singular values of Lesson 8), and <code>[0]</code> keeps the first. <code>rcond=None</code> selects NumPy's recommended rule for when a tiny number counts as zero; older versions of NumPy print a warning without it.</p>
<pre><code>import numpy as np
x = np.array([0, 1, 2, 3])
y = np.array([1, 3, 4, 4])
A = np.column_stack([np.ones(4), x])
print(A.shape)     # (4, 2)
coef = np.linalg.lstsq(A, y, rcond=None)[0]
print(coef)        # [1.5 1. ]: c = 1.5, m = 1</code></pre>
<p>The same method fits any model that is linear in its unknown coefficients: a parabola <em>c</em> + <em>mx</em> + <em>qx</em>² (add a column of <em>x</em>²), or a sum of sines and cosines. It is the basis of linear regression in statistics (MATH 230 Lesson 8) and of countless calibrations in engineering. Least squares was published by Legendre in 1805 and developed by Gauss, who used it to predict where the newly discovered asteroid Ceres would reappear, and was right.</p>

<h3>Orthonormal bases</h3>
<p>Vectors <b>q</b><sub>1</sub>, …, <b>q</b><sub><em>k</em></sub> are <strong>orthonormal</strong> if each has length 1 and each pair is orthogonal. Orthonormal bases make everything easy: the coordinates of <b>b</b> are just the dot products <b>q</b><sub><em>i</em></sub> · <b>b</b>, with no system to solve, and the projection onto their span is (<b>q</b><sub>1</sub> · <b>b</b>)<b>q</b><sub>1</sub> + … + (<b>q</b><sub><em>k</em></sub> · <b>b</b>)<b>q</b><sub><em>k</em></sub>.</p>
<p>The <strong>Gram–Schmidt process</strong> turns any independent vectors into an orthonormal basis of the same span. Take each vector in turn, subtract its projections onto the orthonormal vectors already found, and divide the remainder by its length.</p>
<pre><code>import math

def gram_schmidt(vectors):
    basis = []
    for v in vectors:
        w = list(v)
        for q in basis:
            c = sum(a * b for a, b in zip(q, v))       # q · v
            w = [wi - c * qi for wi, qi in zip(w, q)]  # remove the q part
        length = math.sqrt(sum(a * a for a in w))
        basis.append([a / length for a in w])
    return basis

for q in gram_schmidt([[3, 4], [1, 0]]):
    print([round(a, 2) for a in q])
# [0.6, 0.8]
# [0.8, -0.6]</code></pre>
<p>A square matrix <em>Q</em> with orthonormal columns is called <strong>orthogonal</strong>. It satisfies <em>Q</em><sup>T</sup><em>Q</em> = <em>I</em>, so its inverse is just its transpose, and it preserves lengths and angles: ‖<em>Q</em><b>x</b>‖ = ‖<b>x</b>‖. Rotations and reflections are orthogonal matrices.</p>
<p>Gram–Schmidt also gives a way to write any matrix <em>A</em> with independent columns <b>a</b><sub>1</sub>, …, <b>a</b><sub><em>n</em></sub> as a product <em>A</em> = <em>QR</em>. <em>Q</em> holds the orthonormal vectors <b>q</b><sub>1</sub>, …, <b>q</b><sub><em>n</em></sub> as its columns (if <em>A</em> isn't square, <em>Q</em> isn't either, but still <em>Q</em><sup>T</sup><em>Q</em> = <em>I</em>). <em>R</em> is <em>n</em> × <em>n</em> and records the numbers Gram–Schmidt computed. Each <b>a</b><sub><em>j</em></sub> is a combination of <b>q</b><sub>1</sub>, …, <b>q</b><sub><em>j</em></sub> only, with coefficients <b>q</b><sub><em>i</em></sub> · <b>a</b><sub><em>j</em></sub>, so column <em>j</em> of <em>R</em> holds those dot products in rows 1 to <em>j</em> and zeros below. <em>R</em> is therefore triangular, with zeros below the diagonal. Its diagonal entries are the lengths that Gram–Schmidt divided by. Because <em>Q</em><sup>T</sup><em>Q</em> = <em>I</em>, multiplying <em>A</em> = <em>QR</em> by <em>Q</em><sup>T</sup> gives <em>R</em> = <em>Q</em><sup>T</sup><em>A</em>. For the example above, <b>a</b><sub>1</sub> = (3, 4) = 5<b>q</b><sub>1</sub> and <b>a</b><sub>2</sub> = (1, 0) = 0.6<b>q</b><sub>1</sub> + 0.8<b>q</b><sub>2</sub>, so <em>R</em> = [5 0.6; 0 0.8].</p>
<p>Substituting <em>A</em> = <em>QR</em> into the normal equations gives <em>R</em><sup>T</sup><em>Q</em><sup>T</sup><em>QR</em><b>x̂</b> = <em>R</em><sup>T</sup><em>Q</em><sup>T</sup><b>b</b>, which simplifies (since <em>Q</em><sup>T</sup><em>Q</em> = <em>I</em> and <em>R</em><sup>T</sup> is invertible) to <em>R</em><b>x̂</b> = <em>Q</em><sup>T</sup><b>b</b>, solved by back substitution. This is the most reliable way to compute least squares on a computer, because forming <em>A</em><sup>T</sup><em>A</em> can magnify rounding errors.</p>
`,
      terms: [
        ["Projection", "The closest point to b on a line or subspace; the error b − p is orthogonal to it."],
        ["Normal equations", "AᵀA x̂ = Aᵀb, whose solution minimizes ‖b − Ax‖²."],
        ["Least-squares solution", "The x̂ that makes Ax as close as possible to b, minimizing the sum of squared errors."],
        ["Orthonormal", "Vectors of length 1 that are pairwise orthogonal."],
        ["Gram–Schmidt process", "Turning independent vectors into an orthonormal basis of the same span by subtracting projections and normalizing."],
        ["Orthogonal matrix", "A square matrix with orthonormal columns; Qᵀ = Q⁻¹ and it preserves lengths."]
      ],
      quiz: [
        { q: "What is the projection of (4, 2) onto the line through (1, 0)?", choices: ["(4, 0)", "(0, 2)", "(2, 1)", "(4, 2)"], answer: 0, why: "t = (4 · 1 + 2 · 0)/1 = 4, so p = (4, 0)." },
        { q: "In least squares, the error b − Ax̂ is orthogonal to what?", choices: ["b", "x̂", "Every column of A", "Nothing in particular"], answer: 2, why: "That is exactly what Aᵀ(b − Ax̂) = 0 says." },
        { q: "What quantity does the least-squares line minimize?", choices: ["The largest error", "The sum of the absolute errors", "The sum of the squared vertical errors", "The number of points off the line"], answer: 2, why: "It minimizes ‖b − Ax‖², the sum of squared errors." },
        { q: "Q is orthogonal. What is Q⁻¹?", choices: ["−Q", "Qᵀ", "Q", "It may not exist"], answer: 1, why: "QᵀQ = I." },
        { q: "To fit y = c + mx + qx², what columns does A have?", choices: ["1 and x", "x and x²", "1, x and x²", "x, y and x²"], answer: 2, why: "One column per unknown coefficient: c multiplies 1, m multiplies x, q multiplies x²." }
      ],
      practice: [
        {
          q: `<p>Find the distance from the point (1, 1, 1) to the line through the origin in the direction (1, 2, 2).</p>`,
          a: `<p><em>t</em> = (1 + 2 + 2)/9 = 5/9, <b>p</b> = (5/9, 10/9, 10/9), <b>e</b> = (4/9, −1/9, −1/9). Distance ‖<b>e</b>‖ = √(16 + 1 + 1)/9 = √18/9 = √2/3 ≈ 0.471. (Check: <b>e</b> · (1, 2, 2) = (4 − 2 − 2)/9 = 0.)</p>`
        },
        {
          q: `<p>Fit the best line <em>y</em> = <em>c</em> + <em>mx</em> to the points (1, 2), (2, 3), (3, 5) by the normal equations.</p>`,
          a: `<p><em>A</em><sup>T</sup><em>A</em> = [3 6; 6 14], <em>A</em><sup>T</sup><b>b</b> = (10, 23). From 3<em>c</em> + 6<em>m</em> = 10 and 6<em>c</em> + 14<em>m</em> = 23: subtract twice the first, 2<em>m</em> = 3, <em>m</em> = 1.5; <em>c</em> = (10 − 9)/3 = 1/3. Line <em>y</em> = 1/3 + 1.5<em>x</em>; errors 2 − 11/6 = 1/6, 3 − 10/3 = −1/3, 5 − 29/6 = 1/6, which sum to 0.</p>`
        },
        {
          q: `<p>Apply Gram–Schmidt to (1, 1, 0) and (1, 0, 1).</p>`,
          a: `<p><b>q</b><sub>1</sub> = (1, 1, 0)/√2. <b>q</b><sub>1</sub> · (1, 0, 1) = 1/√2, so subtract (1/√2)<b>q</b><sub>1</sub> = (1/2, 1/2, 0): the remainder is (1/2, −1/2, 1), with length √(3/2). <b>q</b><sub>2</sub> = (1, −1, 2)/√6. Check: <b>q</b><sub>1</sub> · <b>q</b><sub>2</sub> = (1 − 1 + 0)/√12 = 0.</p>`
        },
        {
          q: `<p>Explain in your own words why the least-squares line through data whose <em>x</em>-values have mean 0 has intercept equal to the mean of the <em>y</em>-values.</p>`,
          hint: `<p>Write out the first normal equation, from the column of ones.</p>`,
          a: `<p>The first normal equation is <em>nc</em> + <em>m</em>Σ<em>x</em> = Σ<em>y</em>. If the <em>x</em>-values have mean 0, Σ<em>x</em> = 0, so <em>c</em> = Σ<em>y</em>/<em>n</em>, the mean of <em>y</em>. In general it says the best line passes through the point (mean <em>x</em>, mean <em>y</em>).</p>`
        }
      ],
      sources: ["mit1806", "ila"]
    },
    {
      id: "la7",
      title: "Eigenvalues and eigenvectors",
      minutes: 90,
      summary: "Directions a matrix only stretches, how to find them from the characteristic polynomial, diagonalization and powers of a matrix, the Fibonacci numbers, Markov chains and their steady states, power iteration, and PageRank.",
      notes: `
<p>Most vectors change direction when a matrix multiplies them. A few special directions are only stretched. Those directions, and the stretch factors, reveal what a matrix does far better than its entries do, especially when the matrix is applied over and over.</p>

<h3>Definition</h3>
<p>A nonzero vector <b>v</b> is an <strong>eigenvector</strong> of the square matrix <em>A</em>, with <strong>eigenvalue</strong> λ, if</p>
<p class="math">A<b>v</b> = λ<b>v</b></p>
<p>(<em>Eigen</em> is German for "own" or "characteristic".) <em>A</em> acts on <b>v</b> by simple scaling. For <em>A</em> = [2 1; 1 2]: <em>A</em>(1, 1) = (3, 3) = 3(1, 1), and <em>A</em>(1, −1) = (1, −1). So (1, 1) is an eigenvector with eigenvalue 3, and (1, −1) one with eigenvalue 1. Geometrically, <em>A</em> stretches the plane by 3 along the diagonal and leaves the perpendicular direction alone. Any multiple of an eigenvector is also one, so eigenvectors are really eigen-<em>directions</em>.</p>

<h3>Finding them</h3>
<p><em>A</em><b>v</b> = λ<b>v</b> means (<em>A</em> − λ<em>I</em>)<b>v</b> = <b>0</b> with <b>v</b> ≠ <b>0</b>, so <em>A</em> − λ<em>I</em> must be singular (Lesson 4): its determinant is zero. That gives an equation for λ alone, the <strong>characteristic equation</strong>:</p>
<p class="math">det(A − λI) = 0</p>
<p>For [2 1; 1 2]: det [2 − λ, 1; 1, 2 − λ] = (2 − λ)² − 1 = λ² − 4λ + 3 = (λ − 3)(λ − 1). The eigenvalues are 3 and 1. For each, solve (<em>A</em> − λ<em>I</em>)<b>v</b> = <b>0</b> to find the eigenvectors: for λ = 3, [−1 1; 1 −1]<b>v</b> = <b>0</b> gives <b>v</b> = (1, 1).</p>
<p>Two checks come free: the eigenvalues add up to the <strong>trace</strong> (the sum of the diagonal: 2 + 2 = 4 = 3 + 1) and multiply to the determinant (4 − 1 = 3 = 3 × 1). An <em>n</em> × <em>n</em> matrix has a characteristic polynomial of degree <em>n</em>, so it has at most <em>n</em> eigenvalues. It may have fewer. The 90° rotation [0 −1; 1 0] turns every direction, so no real vector is only stretched, and indeed its characteristic equation, λ² + 1 = 0, has no real solution. (With complex numbers, which this course doesn't use, such equations always have solutions, and the theory extends to them.) The matrices in this course's eigenvalue examples and problems all have real eigenvalues. Large matrices aren't handled with the polynomial at all; libraries use iterative algorithms, such as the QR algorithm, built on Lesson 6's orthogonal matrices.</p>

<h3>Diagonalization and powers</h3>
<p>If an <em>n</em> × <em>n</em> matrix has <em>n</em> independent eigenvectors, put them in the columns of <em>P</em> and the eigenvalues on the diagonal of <em>D</em>. Then <em>AP</em> = <em>PD</em>. To see why, compare the two sides column by column. Column <em>j</em> of <em>AP</em> is <em>A</em> times column <em>j</em> of <em>P</em> (Lesson 3), which is <em>A</em><b>v</b><sub><em>j</em></sub> = λ<sub><em>j</em></sub><b>v</b><sub><em>j</em></sub>. Column <em>j</em> of <em>PD</em> is <em>P</em> times column <em>j</em> of <em>D</em>, which has λ<sub><em>j</em></sub> in position <em>j</em> and zeros elsewhere, so it is λ<sub><em>j</em></sub> times column <em>j</em> of <em>P</em>: again λ<sub><em>j</em></sub><b>v</b><sub><em>j</em></sub>. Since the eigenvectors are independent, <em>P</em> is invertible (Lesson 4), and multiplying both sides of <em>AP</em> = <em>PD</em> on the right by <em>P</em><sup>−1</sup> gives</p>
<p class="math">A = PDP<sup>−1</sup>   and   A<sup>k</sup> = PD<sup>k</sup>P<sup>−1</sup></p>
<p>The middle steps cancel in <em>A</em><sup><em>k</em></sup> = <em>PDP</em><sup>−1</sup><em>PDP</em><sup>−1</sup>⋯, and <em>D</em><sup><em>k</em></sup> just raises each eigenvalue to the <em>k</em>th power. In the eigenvector basis, <em>A</em> is simply a scaling. The long-run behavior of <em>A</em><sup><em>k</em></sup><b>x</b> is controlled by the largest eigenvalue: components along eigenvectors with |λ| &gt; 1 grow, those with |λ| &lt; 1 die away.</p>
<p><strong>Fibonacci numbers.</strong> The rule <em>F</em><sub><em>n</em>+1</sub> = <em>F</em><sub><em>n</em></sub> + <em>F</em><sub><em>n</em>−1</sub> is a matrix step: (<em>F</em><sub><em>n</em>+1</sub>, <em>F</em><sub><em>n</em></sub>) = [1 1; 1 0](<em>F</em><sub><em>n</em></sub>, <em>F</em><sub><em>n</em>−1</sub>). The matrix's characteristic equation is λ² − λ − 1 = 0, with roots φ = (1 + √5)/2 ≈ 1.618 and (1 − √5)/2 ≈ −0.618. Because the second has size less than 1, its part dies away and <em>F</em><sub><em>n</em></sub> grows like φ<sup><em>n</em></sup>: the same answer MATH 121's recurrence lesson found from the characteristic equation, which was this eigenvalue problem in disguise. (Also, [1 1; 1 0]<sup>10</sup> = [89 55; 55 34], containing <em>F</em><sub>11</sub>, <em>F</em><sub>10</sub> and <em>F</em><sub>9</sub>.)</p>

<h3>Markov chains</h3>
<p>A <strong>Markov chain</strong> moves between states at random, with probabilities that depend only on the current state. Suppose tomorrow's weather depends only on today's: a sunny day is followed by sun with probability 0.9 and by rain with 0.1; a rainy day by sun with 0.5 and rain with 0.5. If today's probabilities are (<em>s</em>, <em>r</em>), tomorrow's are</p>
<p class="math">(0.9s + 0.5r, 0.1s + 0.5r) = [0.9 0.5; 0.1 0.5] (s, r)</p>
<p>Each column of this <strong>transition matrix</strong> sums to 1. Applying it day after day, the probabilities approach a <strong>steady state</strong> <b>π</b> that the matrix leaves unchanged: <em>M</em><b>π</b> = <b>π</b>, an eigenvector with eigenvalue 1. Solving 0.1<em>s</em> = 0.5<em>r</em> with <em>s</em> + <em>r</em> = 1 gives <b>π</b> = (5/6, 1/6): in the long run, 5 days in 6 are sunny, whatever the weather today. (The other eigenvalue is 0.4, the trace minus 1, so the influence of today's weather shrinks by a factor 0.4 each day.)</p>

<h3>Power iteration and PageRank</h3>
<p>The simplest way to find the largest eigenvalue's eigenvector is to do what the Markov chain does: multiply a starting vector by <em>A</em> again and again, rescaling each time. The component along the dominant eigenvector grows fastest and takes over. This is <strong>power iteration</strong>.</p>
<pre><code>import math

def power_iteration(A, v, steps):
    for _ in range(steps):
        w = [sum(a * x for a, x in zip(row, v)) for row in A]
        length = math.sqrt(sum(x * x for x in w))
        v = [x / length for x in w]
    Av = [sum(a * x for a, x in zip(row, v)) for row in A]
    return v, sum(a * b for a, b in zip(v, Av))   # eigenvector, eigenvalue estimate

v, lam = power_iteration([[2, 1], [1, 2]], [1, 0], 5)
print([round(x, 3) for x in v], round(lam, 4))   # [0.71, 0.704] 3.0</code></pre>
<p>After 5 steps the vector is close to (1, 1)/√2 ≈ (0.707, 0.707) and the estimate of λ is 2.99997. The error shrinks by the ratio of the two largest eigenvalues, here 1/3, at each step.</p>
<p>In 1998 Larry Page and Sergey Brin, then Stanford graduate students, described <strong>PageRank</strong>, the ranking behind Google's early search engine. Imagine a "random surfer" who, at each step, follows a random link on the current page with probability 0.85, and with probability 0.15 jumps to a page chosen at random from the whole web. This is a Markov chain on web pages, and a page's PageRank is its probability in the steady state: how often the surfer is there in the long run. Pages linked to by many pages, or by important pages, rank high. With billions of pages no one solves the eigenvector equation directly; power iteration, run for some dozens of steps, gives it.</p>
<p><strong>Why the random jump?</strong> A surfer who only follows links runs into two problems.</p>
<ul>
<li>A <strong>dangling page</strong> has no outgoing links, so the surfer has nowhere to go. The usual rule, used in this lesson's programming problem, is that from a dangling page the surfer jumps to a page chosen at random.</li>
<li>A group of pages that link only to one another is a <strong>trap</strong>: once the surfer enters, it never leaves. In the long run all the probability collects in traps, and every other page, however many links point to it, gets rank 0. Worse, if there are two separate traps, the steady state isn't <strong>unique</strong>: there is more than one. Suppose A and B link only to each other, and C and D only to each other. Then (0.5, 0.5, 0, 0), (0, 0, 0.5, 0.5) and every mixture (<em>t</em>/2, <em>t</em>/2, (1 − <em>t</em>)/2, (1 − <em>t</em>)/2) are all left unchanged by a step, and which one the surfer approaches depends on where it started. A ranking that depends on the starting page is no ranking at all.</li>
</ul>
<p>The random jump fixes both. At every step, every page can be reached with probability at least 0.15/<em>N</em>, where <em>N</em> is the number of pages, so no group of pages can hold the surfer forever. A theorem stated here without proof (the Perron–Frobenius theorem) says that when every entry of a transition matrix is positive, as the jump makes it, there is exactly one steady state, and power iteration reaches it from any starting vector. You can check this on the trap example: with the jump, every starting vector leads to (0.25, 0.25, 0.25, 0.25).</p>
<p>For four pages where A links to B and C, B links to C, C links to A, and D links to C, the steady state is about (0.373, 0.196, 0.394, 0.038): C, linked from three pages, ranks first, and A, linked only from C but receiving all of C's weight, ranks a close second. D, which nobody links to, gets only the random jumps.</p>
`,
      terms: [
        ["Eigenvector and eigenvalue", "A nonzero v and number λ with Av = λv: a direction A only stretches, by the factor λ."],
        ["Characteristic equation", "det(A − λI) = 0, whose roots are the eigenvalues."],
        ["Trace", "The sum of the diagonal entries; equal to the sum of the eigenvalues."],
        ["Diagonalization", "Writing A = PDP⁻¹ with eigenvectors in P and eigenvalues on the diagonal of D."],
        ["Markov chain", "A random process moving between states with probabilities that depend only on the current state."],
        ["Steady state", "A probability vector π with Mπ = π: an eigenvector of the transition matrix with eigenvalue 1."],
        ["Power iteration", "Repeatedly multiplying a vector by A and rescaling, which converges to the dominant eigenvector."],
        ["PageRank", "The steady-state probability of a random surfer on the web's link graph."]
      ],
      quiz: [
        { q: "Is (1, 2) an eigenvector of [2 1; 2 3]? If so, with which eigenvalue?", choices: ["Yes, 4", "Yes, 5", "No", "Yes, 1"], answer: 0, why: "[2 1; 2 3](1, 2) = (4, 8) = 4(1, 2)." },
        { q: "What are the eigenvalues of [4 0; 0 −2]?", choices: ["4 and 0", "4 and −2", "2 and 2", "0 and −2"], answer: 1, why: "A diagonal matrix's eigenvalues are its diagonal entries." },
        { q: "A 2 × 2 matrix has trace 7 and determinant 10. What are its eigenvalues?", choices: ["2 and 5", "3 and 4", "1 and 10", "7 and 10"], answer: 0, why: "They add to 7 and multiply to 10." },
        { q: "What eigenvalue does a Markov chain's steady state have?", choices: ["0", "1", "The largest possible", "−1"], answer: 1, why: "The steady state satisfies Mπ = π." },
        { q: "In PageRank, why does the random surfer sometimes jump to a random page?", choices: ["To make computation faster", "So pages with no outgoing links, or closed loops of pages, don't trap the surfer, and the steady state is unique", "To favor new pages", "Search engines require it"], answer: 1, why: "Without jumps, the chain can get stuck and the steady state may not be unique." }
      ],
      practice: [
        {
          q: `<p>Find the eigenvalues and eigenvectors of [4 1; 2 3]. Check that the eigenvalues add to the trace and multiply to the determinant.</p>`,
          a: `<p>det [4 − λ, 1; 2, 3 − λ] = λ² − 7λ + 10 = (λ − 5)(λ − 2). For λ = 5: [−1 1; 2 −2]<b>v</b> = 0 gives <b>v</b> = (1, 1). For λ = 2: [2 1; 2 1]<b>v</b> = 0 gives <b>v</b> = (1, −2). Trace 7 = 5 + 2; determinant 12 − 2 = 10 = 5 × 2.</p>`
        },
        {
          q: `<p>Use diagonalization to compute [2 1; 1 2]<sup>10</sup> (1, 0) without multiplying ten times.</p>`,
          hint: `<p>Write (1, 0) as a combination of the eigenvectors (1, 1) and (1, −1).</p>`,
          a: `<p>(1, 0) = ½(1, 1) + ½(1, −1). Applying <em>A</em><sup>10</sup> multiplies each part by its eigenvalue to the 10th: ½ · 3<sup>10</sup>(1, 1) + ½ · 1<sup>10</sup>(1, −1) = ((59049 + 1)/2, (59049 − 1)/2) = (29525, 29524).</p>`
        },
        {
          q: `<p>A student's study habit is a Markov chain: after a day of studying, they study the next day with probability 0.7; after a day off, they study the next day with probability 0.4. Find the steady-state fraction of days spent studying.</p>`,
          a: `<p>With <em>s</em> = fraction studying: the flow from studying to off, 0.3<em>s</em>, equals the flow from off to studying, 0.4(1 − <em>s</em>). So 0.7<em>s</em> = 0.4 and <em>s</em> = 4/7 ≈ 0.571.</p>`
        },
        {
          q: `<p>Run <code>power_iteration</code> from the notes on [[0, 1], [1, 0]] starting from (1, 0). What happens, and why? (Find the eigenvalues.)</p>`,
          a: `<p>The vector alternates between (0, 1) and (1, 0) forever. The eigenvalues are 1 and −1, with equal sizes, so neither component dominates, and power iteration only converges when one eigenvalue is strictly largest in size. (PageRank's random jumps guarantee that for its matrix.)</p>`
        }
      ],
      sources: ["mit1806", "eola", "pagerank98"]
    },
    {
      id: "la8",
      title: "The singular value decomposition and PCA",
      minutes: 90,
      summary: "Every matrix is a rotation, a stretch and a rotation: the singular value decomposition, low-rank approximation and image compression, and principal component analysis for finding the main directions in data.",
      notes: `
<p>Eigenvectors (Lesson 7) apply only to square matrices, and not every square matrix has enough of them. The <strong>singular value decomposition</strong> (SVD) works for every matrix, of any shape, and has become one of the most useful tools in data science. Many applied mathematicians consider it the high point of a first course in linear algebra.</p>

<h3>The decomposition</h3>
<p>Every <em>m</em> × <em>n</em> matrix <em>A</em> can be written as</p>
<p class="math">A = UΣV<sup>T</sup></p>
<p>where <em>U</em> (<em>m</em> × <em>m</em>) and <em>V</em> (<em>n</em> × <em>n</em>) are orthogonal matrices (Lesson 6) and Σ is an <em>m</em> × <em>n</em> matrix that is zero except for non-negative numbers σ<sub>1</sub> ≥ σ<sub>2</sub> ≥ … on its diagonal, the <strong>singular values</strong>.</p>
<p>Read right to left, it says that <em>every</em> linear transformation is: a rotation (or reflection) <em>V</em><sup>T</sup>, then a stretch along the axes by the singular values Σ, then another rotation <em>U</em>. In two dimensions, <em>A</em> turns the unit circle into an ellipse; the singular values are the lengths of the ellipse's semi-axes, and the columns of <em>U</em> point along those axes.</p>
<p>For example, <em>A</em> = [3 0; 4 5] has singular values 3√5 ≈ 6.708 and √5 ≈ 2.236. It stretches one direction by about 6.7 and the perpendicular one by about 2.2. (Their product, 15, is |det <em>A</em>|: the area scaling of Lesson 4, as it must be, since rotations don't change area.)</p>
<p>Where do they come from? Start with the square matrix <em>A</em><sup>T</sup><em>A</em>, which has two useful properties.</p>
<ul>
<li>It is <strong>symmetric</strong>: equal to its own transpose. By Lesson 3's rule (<em>BC</em>)<sup>T</sup> = <em>C</em><sup>T</sup><em>B</em><sup>T</sup>, (<em>A</em><sup>T</sup><em>A</em>)<sup>T</sup> = <em>A</em><sup>T</sup>(<em>A</em><sup>T</sup>)<sup>T</sup> = <em>A</em><sup>T</sup><em>A</em>.</li>
<li>Its eigenvalues are never negative. If <em>A</em><sup>T</sup><em>A</em><b>v</b> = λ<b>v</b> with <b>v</b> a unit vector, take the dot product of both sides with <b>v</b>. The right side gives λ<b>v</b> · <b>v</b> = λ. The left side is <b>v</b><sup>T</sup><em>A</em><sup>T</sup><em>A</em><b>v</b> = (<em>A</em><b>v</b>)<sup>T</sup>(<em>A</em><b>v</b>) = ‖<em>A</em><b>v</b>‖². So λ = ‖<em>A</em><b>v</b>‖² ≥ 0.</li>
</ul>
<p>A third fact is stated here without proof (it is called the <strong>spectral theorem</strong>): every symmetric <em>n</em> × <em>n</em> matrix has <em>n</em> real eigenvalues and an orthonormal basis of eigenvectors. You can check it on any example with NumPy's <code>np.linalg.eigh</code>, used below, which is designed for symmetric matrices.</p>
<p>The columns <b>v</b><sub>1</sub>, …, <b>v</b><sub><em>n</em></sub> of <em>V</em> are these orthonormal eigenvectors of <em>A</em><sup>T</sup><em>A</em>, in order of decreasing eigenvalue, and are called the <strong>right singular vectors</strong> of <em>A</em>. The singular values are the square roots of the eigenvalues: σ<sub><em>i</em></sub> = √λ<sub><em>i</em></sub> = ‖<em>A</em><b>v</b><sub><em>i</em></sub>‖. The columns of <em>U</em> are the <strong>left singular vectors</strong>. For each nonzero σ<sub><em>i</em></sub>, the column is <b>u</b><sub><em>i</em></sub> = <em>A</em><b>v</b><sub><em>i</em></sub>/σ<sub><em>i</em></sub>, the direction in which <em>A</em> sends <b>v</b><sub><em>i</em></sub>, scaled to length 1. (Multiplying <em>A</em> = <em>U</em>Σ<em>V</em><sup>T</sup> on the right by <em>V</em> gives <em>AV</em> = <em>U</em>Σ, which says exactly <em>A</em><b>v</b><sub><em>i</em></sub> = σ<sub><em>i</em></sub><b>u</b><sub><em>i</em></sub>.) Any remaining columns of <em>U</em> just complete an orthonormal basis. The <b>u</b><sub><em>i</em></sub> are also the eigenvectors of <em>AA</em><sup>T</sup>. For a symmetric matrix with positive eigenvalues, like [2 1; 1 2], the SVD and the eigendecomposition coincide.</p>

<h3>Low-rank approximation</h3>
<p>Multiplying out <em>U</em>Σ<em>V</em><sup>T</sup> writes <em>A</em> as a sum of simple pieces:</p>
<p class="math">A = σ<sub>1</sub><b>u</b><sub>1</sub><b>v</b><sub>1</sub><sup>T</sup> + σ<sub>2</sub><b>u</b><sub>2</sub><b>v</b><sub>2</sub><sup>T</sup> + … + σ<sub>r</sub><b>u</b><sub>r</sub><b>v</b><sub>r</sub><sup>T</sup></p>
<p>Each term <b>u</b><b>v</b><sup>T</sup> (a column times a row) is a matrix of rank 1, and <em>r</em> is the rank of <em>A</em>. The terms come in order of importance. Keeping only the first <em>k</em> gives a rank-<em>k</em> matrix <em>A</em><sub><em>k</em></sub>, and the <strong>Eckart–Young theorem</strong> (1936) says no rank-<em>k</em> matrix is closer to <em>A</em>: the SVD finds the best possible simplification of a matrix.</p>
<p><strong>Image compression.</strong> A grayscale image is a matrix of brightness values. A 1000 × 1000 image has a million numbers. Its rank-50 approximation needs 50 singular values and 50 pairs of columns: 50 × (1 + 1000 + 1000) = 100,050 numbers, about 10% of the original. Because most images have rapidly falling singular values, the approximation often looks nearly identical. (Real image formats such as JPEG use a fixed cosine basis instead, which is faster to compute, but the principle of keeping only the important coordinates is the same.)</p>
<p><strong>Recommendations.</strong> A table of users' ratings of movies is a large matrix with most entries missing. Approximating it by a low-rank matrix models each user and each movie by a handful of hidden factors (how much a movie is a comedy, how much a user likes comedy) and predicts the missing ratings. Methods of this kind were central to the winning entries of the Netflix Prize (2006–2009), the competition whose anonymized data CS 100 discussed for its privacy failure.</p>

<h3>Principal component analysis</h3>
<p><strong>Principal component analysis</strong> (PCA) finds the directions in which a set of data points varies most. Suppose each data point is a vector of measurements. The recipe:</p>
<ol>
<li><strong>Center</strong> the data: subtract the mean of each measurement, so the cloud of points sits around the origin.</li>
<li>Compute the <strong>covariance matrix</strong> <em>C</em> = <em>X</em><sup>T</sup><em>X</em>/(<em>n</em> − 1), where the <em>n</em> rows of <em>X</em> are the centered points. Entry (<em>j</em>, <em>k</em>) of <em>X</em><sup>T</sup><em>X</em> is the dot product of columns <em>j</em> and <em>k</em> of <em>X</em>: the sum, over all points, of (deviation of measurement <em>j</em> from its mean) × (deviation of measurement <em>k</em> from its mean). Divided by <em>n</em> − 1, this is the <strong>sample covariance</strong> of the two measurements. It is positive when they tend to be above their means together, and negative when one tends to be above while the other is below. On the diagonal (<em>j</em> = <em>k</em>) it is the <strong>sample variance</strong>, the sum of squared deviations divided by <em>n</em> − 1. (MATH 230 Lesson 4 defines covariance for random variables and gives these data versions; MATH 230 Lesson 6 explains why the denominator is <em>n</em> − 1 rather than <em>n</em>. For PCA only the directions matter, and dividing by <em>n</em> instead would give the same eigenvectors.)</li>
<li>Find the eigenvectors of <em>C</em>. (These are also the right singular vectors of <em>X</em>, because <em>C</em> is <em>X</em><sup>T</sup><em>X</em> divided by a number.) The eigenvector with the largest eigenvalue is the <strong>first principal component</strong>, the direction of greatest spread; its eigenvalue is the variance of the data along it. The next is the direction of greatest remaining spread, perpendicular to the first, and so on.</li>
</ol>
<p>Example: the points (2, 1), (3, 3), (4, 3), (5, 5), (6, 5) have mean (4, 3.4) and covariance matrix [2.5 2.5; 2.5 2.8]. Its eigenvalues are about 5.15 and 0.15, with the first principal component along about (0.686, 0.728). That direction carries 5.15/(5.15 + 0.15) ≈ 97% of the variance: the data is nearly one-dimensional, lying close to a line, and projecting each point onto that line loses little.</p>
<p>In NumPy, using only Lesson 1's last section and one new function: <code>pts.mean(axis=0)</code> is the mean of each column, (4, 3.4), and subtracting it centers every point. <code>centered.T @ centered</code> is <em>X</em><sup>T</sup><em>X</em>. <code>np.linalg.eigh(C)</code>, for symmetric matrices, returns two arrays: the eigenvalues in increasing order, and a 2-D array whose <em>columns</em> are the matching unit eigenvectors. So <code>vectors[:, -1]</code>, the last column, is the eigenvector of the largest eigenvalue. <code>np.round(a, 3)</code> rounds every entry to 3 decimal places.</p>
<pre><code>import numpy as np
pts = np.array([[2, 1], [3, 3], [4, 3], [5, 5], [6, 5]])
centered = pts - pts.mean(axis=0)
C = centered.T @ centered / (len(pts) - 1)
print(C)                                 # [[2.5 2.5] [2.5 2.8]], printed on two lines
values, vectors = np.linalg.eigh(C)
print(np.round(values, 3))               # [0.146 5.154]
print(np.round(vectors[:, -1], 3))       # [0.686 0.728] (or its negative)</code></pre>
<p>PCA reduces data with hundreds of measurements to the few combinations that matter, for plotting, for compressing, or as a first step before machine learning. It has a well-known limitation: it finds only linear structure, and it measures importance by variance, so measurements in larger units dominate unless the data is standardized first.</p>
`,
      terms: [
        ["Singular value decomposition", "A = UΣVᵀ, with U and V orthogonal and Σ diagonal with non-negative singular values: rotate, stretch, rotate."],
        ["Singular values", "The diagonal entries of Σ, in decreasing order; the square roots of the eigenvalues of AᵀA."],
        ["Rank-k approximation", "The sum of the first k terms σᵢuᵢvᵢᵀ of the SVD; the closest rank-k matrix to A (Eckart–Young)."],
        ["Right and left singular vectors", "The columns vᵢ of V (orthonormal eigenvectors of AᵀA) and uᵢ of U, with Avᵢ = σᵢuᵢ."],
        ["Symmetric matrix", "A square matrix equal to its transpose, such as AᵀA; it has real eigenvalues and orthonormal eigenvectors."],
        ["Covariance matrix", "XᵀX/(n − 1) for centered data X; sample variances on the diagonal and sample covariances off it."],
        ["Principal component", "An eigenvector of the covariance matrix; the first is the direction of greatest variance in the data."]
      ],
      quiz: [
        { q: "Which matrices have a singular value decomposition?", choices: ["Only square matrices", "Only symmetric matrices", "Every matrix", "Only invertible matrices"], answer: 2, why: "The SVD exists for any m × n matrix." },
        { q: "A 2 × 2 matrix has singular values 4 and 0.5. What is |det A|?", choices: ["4.5", "2", "3.5", "8"], answer: 1, why: "The product of the singular values: rotations don't change area." },
        { q: "How many numbers does a rank-10 approximation of a 500 × 300 matrix need?", choices: ["150,000", "10 × (1 + 500 + 300) = 8,010", "3,000", "5,000"], answer: 1, why: "Each term needs a singular value, a 500-vector and a 300-vector." },
        { q: "What is the first principal component of a dataset?", choices: ["The mean point", "The direction of greatest variance", "The point farthest from the mean", "The first column"], answer: 1, why: "It is the eigenvector of the covariance matrix with the largest eigenvalue." },
        { q: "Why center the data before PCA?", choices: ["To make all values positive", "So the covariance matrix measures spread around the mean rather than distance from the origin", "To reduce the number of points", "It's optional and changes nothing"], answer: 1, why: "Without centering, the first component points toward the mean instead of along the spread." }
      ],
      practice: [
        {
          q: `<p>Find the singular values of <em>A</em> = [3 0; 4 5] from the eigenvalues of <em>A</em><sup>T</sup><em>A</em>, and check that their product is |det <em>A</em>|.</p>`,
          a: `<p><em>A</em><sup>T</sup><em>A</em> = [3 4; 0 5][3 0; 4 5] = [25 20; 20 25]. Its eigenvalues: trace 50, determinant 625 − 400 = 225, so λ² − 50λ + 225 = 0, λ = 45 and 5. Singular values √45 = 3√5 ≈ 6.708 and √5 ≈ 2.236. Product √225 = 15 = |det <em>A</em>| = |15 − 0|.</p>`
        },
        {
          q: `<p>Write the rank-1 matrix (1, 2)(3, 1)<sup>T</sup> out in full. What is its rank, and what are its column space and null space?</p>`,
          a: `<p>[3 1; 6 2]. Rank 1: each column is a multiple of (1, 2), which spans the column space. Null space: 3<em>x</em> + <em>y</em> = 0, spanned by (1, −3).</p>`
        },
        {
          q: `<p>Carry out PCA by hand on the three points (1, 1), (2, 2), (3, 3). What fraction of the variance does the first component explain, and why?</p>`,
          a: `<p>Mean (2, 2); centered points (−1, −1), (0, 0), (1, 1); covariance [1 1; 1 1]. Eigenvalues 2 and 0, first component (1, 1)/√2. It explains 100% of the variance: the points lie exactly on a line, so there is no spread in the perpendicular direction.</p>`
        },
        {
          q: `<p>Explain why measuring height in millimetres instead of metres can change the first principal component of a dataset of (height, weight in kg). What should you do about it?</p>`,
          a: `<p>PCA chooses directions of largest variance. In millimetres, heights vary by hundreds rather than tenths, so their variance is a million times larger and the first component points almost exactly along the height axis, for no real reason. Standardize first: divide each centered measurement by its standard deviation, so that every measurement has variance 1 (this is PCA on the correlation matrix).</p>`
        }
      ],
      sources: ["mit1806", "eola", "ila"]
    }
]);

CSA.addAsides("math220", {
  la2: [
    { kind: "history", title: "Elimination before Gauss", html: `<p>The method called Gaussian elimination appears in the Chinese text <em>The Nine Chapters on the Mathematical Art</em>, compiled around the first century BCE or CE, which solves systems of equations by arranging the coefficients on a counting board in columns and subtracting columns from one another, exactly as here. Gauss used and popularized the method in the early 1800s for computing asteroid orbits from observations; the name stuck in the 20th century.</p>` }
  ],
  la7: [
    { kind: "ethics", title: "Whoever ranks controls attention", html: `<p>PageRank made link structure a source of value, and people soon manufactured links to raise their pages: "link farms", paid links and comment spam. Search engines responded by penalizing manipulation and adding hundreds of other signals. The arms race continues with every ranking system, from search to social media feeds to app stores. A ranking algorithm decides what billions of people see, which makes its design a question of fairness and power, not only of mathematics.</p>` }
  ],
  la8: [
    { kind: "history", title: "Eigenfaces", html: `<p>In 1991 Matthew Turk and Alex Pentland applied PCA to photographs of faces, each treated as one long vector of pixel brightnesses. The principal components, displayed as images, looked like ghostly faces and became known as "eigenfaces"; any face could be approximated as the average face plus a combination of a few dozen of them. The method was an early milestone in automatic face recognition, the technology whose accuracy gaps across groups of people CS 100 discussed.</p>` }
  ]
});
