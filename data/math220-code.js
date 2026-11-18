/* Auto-graded programming problems for MATH 220, by lesson. Generated from a Python spec, so every
   string is JSON. Problems use plain Python lists (no NumPy), so each step of the algorithm is yours. */
CSA.addCode("math220", {
 "la1": [
  {
   "id": "cosine_search",
   "title": "Ranking documents by cosine similarity",
   "prompt": "<p>Write <code>cosine(u, v)</code>, the cosine similarity of two vectors given as lists (if either vector is all zeros, return 0.0), and <code>rank_documents(query, docs)</code>, which returns the indexes of the documents in <code>docs</code> in order of decreasing cosine similarity with <code>query</code>, breaking ties by the smaller index.</p>\n<p>With the notes' example, <code>rank_documents([1, 0, 0, 1], [[3, 0, 1, 2], [1, 1, 0, 2], [0, 2, 0, 1]])</code> is <code>[0, 1, 2]</code>.</p>",
   "starter": "def cosine(u, v):\n    pass\n\ndef rank_documents(query, docs):\n    pass\n",
   "hint": "<p>Compute the dot product and both lengths with <code>sum</code> and <code>math.sqrt</code>. For the ranking, sort the indexes with a key of <code>(-similarity, index)</code>.</p>",
   "solution": "import math\n\ndef cosine(u, v):\n    dot = sum(a * b for a, b in zip(u, v))\n    nu = math.sqrt(sum(a * a for a in u))\n    nv = math.sqrt(sum(b * b for b in v))\n    if nu == 0 or nv == 0:\n        return 0.0\n    return dot / (nu * nv)\n\ndef rank_documents(query, docs):\n    return sorted(range(len(docs)), key=lambda i: (-cosine(query, docs[i]), i))\n",
   "tests": [
    {
     "label": "Cosine values",
     "type": "assert",
     "code": "import math\nassert math.isclose(cosine([1, 0], [1, 1]), 1 / math.sqrt(2))\nassert math.isclose(cosine([2, 0, 4], [1, 0, 2]), 1.0)\nassert cosine([1, 0], [0, 3]) == 0.0\n"
    },
    {
     "label": "Zero vector gives 0.0",
     "call": "cosine([0, 0], [1, 2])",
     "expect": "0.0"
    },
    {
     "label": "The notes' example",
     "call": "rank_documents([1, 0, 0, 1], [[3, 0, 1, 2], [1, 1, 0, 2], [0, 2, 0, 1]])",
     "expect": "[0, 1, 2]"
    },
    {
     "label": "Ties keep index order",
     "call": "rank_documents([1, 1], [[0, 1], [2, 2], [1, 0], [5, 5]])",
     "expect": "[1, 3, 0, 2]"
    }
   ]
  }
 ],
 "la2": [
  {
   "id": "gauss_solve",
   "title": "Gaussian elimination with partial pivoting",
   "prompt": "<p>Write <code>solve(A, b)</code> that solves the square system <em>A</em><b>x</b> = <b>b</b> by Gaussian elimination with partial pivoting and back substitution, and returns <b>x</b> as a list of floats. <code>A</code> is a list of rows. Don't change the caller's lists. If some column has no usable pivot (every candidate has absolute value below 1e-12), raise <code>ValueError</code>: the matrix is singular.</p>",
   "starter": "def solve(A, b):\n    pass\n",
   "hint": "<p>Copy the rows into an augmented matrix: <code>M = [row[:] + [bi] for row, bi in zip(A, b)]</code>. For each column <em>k</em>: find the row <em>p</em> ≥ <em>k</em> with the largest <code>abs(M[p][k])</code>, swap it into row <em>k</em>, then for each row below subtract <code>M[i][k] / M[k][k]</code> times row <em>k</em>. Back substitution then goes from the last row up.</p>",
   "solution": "def solve(A, b):\n    n = len(A)\n    M = [list(map(float, row)) + [float(bi)] for row, bi in zip(A, b)]\n    for k in range(n):\n        p = max(range(k, n), key=lambda i: abs(M[i][k]))\n        if abs(M[p][k]) < 1e-12:\n            raise ValueError(\"matrix is singular\")\n        M[k], M[p] = M[p], M[k]\n        for i in range(k + 1, n):\n            f = M[i][k] / M[k][k]\n            for j in range(k, n + 1):\n                M[i][j] -= f * M[k][j]\n    x = [0.0] * n\n    for i in range(n - 1, -1, -1):\n        s = sum(M[i][j] * x[j] for j in range(i + 1, n))\n        x[i] = (M[i][n] - s) / M[i][i]\n    return x\n",
   "tests": [
    {
     "label": "The notes' 3 × 3 system",
     "type": "assert",
     "code": "import math\nx = solve([[1, 3, 2], [2, 1, -1], [-1, 1, 4]], [13, 1, 13])\nassert all(math.isclose(a, e) for a, e in zip(x, [1, 2, 3])), x\n"
    },
    {
     "label": "Needs a row swap (zero first pivot)",
     "type": "assert",
     "code": "import math\nx = solve([[0, 1], [1, 1]], [3, 5])\nassert math.isclose(x[0], 2) and math.isclose(x[1], 3), x\n"
    },
    {
     "label": "A tiny pivot doesn't ruin the answer",
     "type": "assert",
     "code": "x = solve([[1e-20, 1], [1, 1]], [1, 2])\nassert abs(x[0] - 1) < 1e-9 and abs(x[1] - 1) < 1e-9, f\"got {x}: without pivoting, x would be 0\"\n"
    },
    {
     "label": "Singular matrix raises ValueError",
     "type": "raises",
     "call": "solve([[1, 2], [2, 4]], [3, 6])",
     "error": "ValueError"
    },
    {
     "label": "Doesn't change the inputs",
     "type": "assert",
     "code": "A, b = [[2, 1], [1, 3]], [3, 5]\nsolve(A, b)\nassert A == [[2, 1], [1, 3]] and b == [3, 5], \"solve changed its arguments\"\n"
    },
    {
     "label": "A random 30 × 30 system",
     "type": "assert",
     "hidden": true,
     "code": "import random\nrandom.seed(8)\nn = 30\nA = [[random.uniform(-1, 1) for _ in range(n)] for _ in range(n)]\nx0 = [random.uniform(-5, 5) for _ in range(n)]\nb = [sum(A[i][j] * x0[j] for j in range(n)) for i in range(n)]\nx = solve(A, b)\nassert max(abs(a - e) for a, e in zip(x, x0)) < 1e-8\n"
    },
    {
     "label": "Doesn't use NumPy",
     "type": "source",
     "code": "assert \"numpy\" not in __source__, \"Use plain Python lists here.\"\n"
    }
   ]
  },
  {
   "id": "classify_system",
   "title": "One, none or infinitely many",
   "prompt": "<p>Write <code>classify(A, b)</code> that returns <code>\"one\"</code>, <code>\"none\"</code> or <code>\"infinite\"</code>: how many solutions the system <em>A</em><b>x</b> = <b>b</b> has. <code>A</code> may be any <em>m</em> × <em>n</em> list of rows of integers. Use exact arithmetic with <code>fractions.Fraction</code>, so that rounding can't hide a zero.</p>",
   "starter": "from fractions import Fraction\n\ndef classify(A, b):\n    pass\n",
   "hint": "<p>Eliminate on the augmented matrix, column by column, keeping a counter <code>r</code> of the next pivot row. In each column, find a row at or below <code>r</code> with a nonzero entry; if there is none, the column is free. After elimination: a row that is zero on the left but nonzero on the right means <code>\"none\"</code>; otherwise, if every one of the <em>n</em> columns got a pivot (<code>r == n</code>) the answer is <code>\"one\"</code>, and if some column is free it is <code>\"infinite\"</code>. (Lesson 5 will call the number of pivots the <em>rank</em>.)</p>",
   "solution": "from fractions import Fraction\n\ndef classify(A, b):\n    m, n = len(A), len(A[0])\n    M = [[Fraction(v) for v in row] + [Fraction(bi)] for row, bi in zip(A, b)]\n    r = 0\n    for c in range(n):\n        p = next((i for i in range(r, m) if M[i][c] != 0), None)\n        if p is None:\n            continue\n        M[r], M[p] = M[p], M[r]\n        for i in range(m):\n            if i != r and M[i][c] != 0:\n                f = M[i][c] / M[r][c]\n                M[i] = [x - f * y for x, y in zip(M[i], M[r])]\n        r += 1\n        if r == m:\n            break\n    for row in M:\n        if all(v == 0 for v in row[:n]) and row[n] != 0:\n            return \"none\"\n    return \"one\" if r == n else \"infinite\"\n",
   "tests": [
    {
     "label": "Unique solution",
     "call": "classify([[1, 3, 2], [2, 1, -1], [-1, 1, 4]], [13, 1, 13])",
     "expect": "'one'"
    },
    {
     "label": "Parallel lines: none",
     "call": "classify([[1, 2], [2, 4]], [3, 7])",
     "expect": "'none'"
    },
    {
     "label": "Same line twice: infinite",
     "call": "classify([[1, 2], [2, 4]], [3, 6])",
     "expect": "'infinite'"
    },
    {
     "label": "More unknowns than equations",
     "call": "classify([[1, 1, 1], [1, -1, 2]], [6, 5])",
     "expect": "'infinite'"
    },
    {
     "label": "More equations than unknowns",
     "type": "assert",
     "code": "assert classify([[1, 0], [0, 1], [1, 1]], [1, 2, 3]) == \"one\"\nassert classify([[1, 0], [0, 1], [1, 1]], [1, 2, 4]) == \"none\"\n"
    },
    {
     "label": "Exactness matters",
     "call": "classify([[1, 1], [10**18, 10**18 + 1]], [2, 2 * 10**18 + 1])",
     "expect": "'one'",
     "hidden": true
    }
   ]
  }
 ],
 "la3": [
  {
   "id": "matmul",
   "title": "Matrix multiplication",
   "prompt": "<p>Write <code>matmul(A, B)</code> that returns the product of two matrices given as lists of rows. If the sizes don't match (columns of A ≠ rows of B), raise <code>ValueError</code>. Then write <code>rotation(degrees)</code>, the 2 × 2 matrix rotating the plane counterclockwise by that angle, and <code>apply(M, points)</code>, which returns the list of points (pairs) <em>M</em> sends them to.</p>",
   "starter": "import math\n\ndef matmul(A, B):\n    pass\n\ndef rotation(degrees):\n    pass\n\ndef apply(M, points):\n    pass\n",
   "hint": "<p>(AB)<sub>ij</sub> is the dot product of row <em>i</em> of A with column <em>j</em> of B; column <em>j</em> of B is <code>[row[j] for row in B]</code>. For the rotation, convert with <code>math.radians</code>.</p>",
   "solution": "import math\n\ndef matmul(A, B):\n    if len(A[0]) != len(B):\n        raise ValueError(\"sizes don't match\")\n    return [[sum(A[i][k] * B[k][j] for k in range(len(B))) for j in range(len(B[0]))]\n            for i in range(len(A))]\n\ndef rotation(degrees):\n    t = math.radians(degrees)\n    return [[math.cos(t), -math.sin(t)], [math.sin(t), math.cos(t)]]\n\ndef apply(M, points):\n    return [(M[0][0] * x + M[0][1] * y, M[1][0] * x + M[1][1] * y) for x, y in points]\n",
   "tests": [
    {
     "label": "The notes' example",
     "type": "assert",
     "code": "R = [[0, -1], [1, 0]]; S = [[2, 0], [0, 1]]\nassert matmul(R, S) == [[0, -1], [2, 0]] and matmul(S, R) == [[0, -2], [1, 0]]\n"
    },
    {
     "label": "Non-square sizes",
     "call": "matmul([[1, 2, 3]], [[1], [0], [2]])",
     "expect": "[[7]]"
    },
    {
     "label": "Mismatched sizes raise ValueError",
     "type": "raises",
     "call": "matmul([[1, 2]], [[1, 2]])",
     "error": "ValueError"
    },
    {
     "label": "Rotations compose",
     "type": "assert",
     "code": "import math\nP = matmul(rotation(30), rotation(60))\nQ = rotation(90)\nassert all(math.isclose(P[i][j], Q[i][j], abs_tol=1e-12) for i in range(2) for j in range(2))\n"
    },
    {
     "label": "Applying a rotation",
     "type": "assert",
     "code": "import math\n(x, y), = apply(rotation(90), [(1, 0)])\nassert math.isclose(x, 0, abs_tol=1e-12) and math.isclose(y, 1)\n"
    }
   ]
  }
 ],
 "la4": [
  {
   "id": "det_inverse",
   "title": "Determinant and inverse by elimination",
   "prompt": "<p>Using exact <code>Fraction</code> arithmetic, write:</p>\n<ul>\n<li><code>det(A)</code>: the determinant of a square matrix, computed by elimination as the product of the pivots, with a sign change for each row swap.</li>\n<li><code>inverse(A)</code>: the inverse by Gauss–Jordan elimination on [A | I], returned as a list of rows of <code>Fraction</code>s. Raise <code>ValueError</code> if A is singular.</li>\n</ul>\n<p>Don't use cofactor expansion: one test uses a 12 × 12 matrix.</p>",
   "starter": "from fractions import Fraction\n\ndef det(A):\n    pass\n\ndef inverse(A):\n    pass\n",
   "hint": "<p>For <code>det</code>, copy A into Fractions, then for each column find a nonzero pivot at or below the diagonal (if none, the determinant is 0), swap it up (flipping the sign), and eliminate below. Multiply the pivots. For <code>inverse</code>, start from rows <code>A[i] + I[i]</code>, divide each pivot row by its pivot, and eliminate above <em>and</em> below.</p>",
   "solution": "from fractions import Fraction\n\ndef det(A):\n    n = len(A)\n    M = [[Fraction(v) for v in row] for row in A]\n    result = Fraction(1)\n    for k in range(n):\n        p = next((i for i in range(k, n) if M[i][k] != 0), None)\n        if p is None:\n            return Fraction(0)\n        if p != k:\n            M[k], M[p] = M[p], M[k]\n            result = -result\n        result *= M[k][k]\n        for i in range(k + 1, n):\n            f = M[i][k] / M[k][k]\n            M[i] = [x - f * y for x, y in zip(M[i], M[k])]\n    return result\n\ndef inverse(A):\n    n = len(A)\n    M = [[Fraction(v) for v in row] + [Fraction(int(i == j)) for j in range(n)] for i, row in enumerate(A)]\n    for k in range(n):\n        p = next((i for i in range(k, n) if M[i][k] != 0), None)\n        if p is None:\n            raise ValueError(\"matrix is singular\")\n        M[k], M[p] = M[p], M[k]\n        pivot = M[k][k]\n        M[k] = [x / pivot for x in M[k]]\n        for i in range(n):\n            if i != k and M[i][k] != 0:\n                f = M[i][k]\n                M[i] = [x - f * y for x, y in zip(M[i], M[k])]\n    return [row[n:] for row in M]\n",
   "tests": [
    {
     "label": "2 × 2 and 3 × 3 determinants",
     "type": "assert",
     "code": "assert det([[4, 2], [3, 5]]) == 14\nassert det([[1, 3, 2], [2, 1, -1], [-1, 1, 4]]) == -10\nassert det([[1, 2, 3], [0, 4, 5], [1, 0, 6]]) == 22\n"
    },
    {
     "label": "Row swap changes the sign",
     "call": "det([[0, 1], [1, 0]])",
     "expect": "-1"
    },
    {
     "label": "Singular matrix has determinant 0",
     "call": "det([[1, 2], [2, 4]])",
     "expect": "0"
    },
    {
     "label": "Inverse of the notes' 2 × 2",
     "type": "assert",
     "code": "from fractions import Fraction as F\nassert inverse([[3, 1], [2, 4]]) == [[F(2, 5), F(-1, 10)], [F(-1, 5), F(3, 10)]], inverse([[3, 1], [2, 4]])\n"
    },
    {
     "label": "A times its inverse is I",
     "type": "assert",
     "code": "A = [[2, 1, 0], [1, 3, 1], [0, 1, 2]]\nB = inverse(A)\nP = [[sum(A[i][k] * B[k][j] for k in range(3)) for j in range(3)] for i in range(3)]\nassert P == [[1, 0, 0], [0, 1, 0], [0, 0, 1]], P\n"
    },
    {
     "label": "Singular inverse raises ValueError",
     "type": "raises",
     "call": "inverse([[1, 2], [3, 6]])",
     "error": "ValueError"
    },
    {
     "label": "A 12 × 12 determinant",
     "type": "assert",
     "limit": 6,
     "code": "n = 12\nH = [[1 if abs(i - j) <= 1 else 0 for j in range(n)] for i in range(n)]   # tridiagonal ones\nassert det(H) == 1, det(H)\n"
    }
   ]
  }
 ],
 "la5": [
  {
   "id": "rank_independence",
   "title": "Rank and independence",
   "prompt": "<p>Write <code>rank(A)</code> that returns the rank of any <em>m</em> × <em>n</em> matrix of integers (exact, with <code>Fraction</code>), and <code>independent(vectors)</code> that says whether a list of vectors (all the same length) is linearly independent.</p>",
   "starter": "from fractions import Fraction\n\ndef rank(A):\n    pass\n\ndef independent(vectors):\n    pass\n",
   "hint": "<p>Rank is the number of pivots found by elimination. Vectors are independent exactly when the matrix with them as columns (or as rows: the rank is the same) has rank equal to the number of vectors.</p>",
   "solution": "from fractions import Fraction\n\ndef rank(A):\n    M = [[Fraction(v) for v in row] for row in A]\n    m, n = len(M), len(M[0]) if M else 0\n    r = 0\n    for c in range(n):\n        p = next((i for i in range(r, m) if M[i][c] != 0), None)\n        if p is None:\n            continue\n        M[r], M[p] = M[p], M[r]\n        for i in range(r + 1, m):\n            f = M[i][c] / M[r][c]\n            M[i] = [x - f * y for x, y in zip(M[i], M[r])]\n        r += 1\n    return r\n\ndef independent(vectors):\n    return rank(vectors) == len(vectors)\n",
   "tests": [
    {
     "label": "The notes' matrix B",
     "call": "rank([[1, 2, 3], [2, 4, 6], [1, 0, 1]])",
     "expect": "2"
    },
    {
     "label": "Full rank and zero",
     "type": "assert",
     "code": "assert rank([[1, 0], [0, 1]]) == 2\nassert rank([[0, 0], [0, 0]]) == 0\nassert rank([[1, 2, 3, 4]]) == 1\n"
    },
    {
     "label": "Independence",
     "type": "assert",
     "code": "assert independent([[1, 0, 0], [0, 1, 0]]) is True\nassert independent([[1, 0, 0], [0, 1, 0], [1, 1, 0]]) is False\nassert independent([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) is False\nassert independent([[1, 1], [1, -1]]) is True\n"
    },
    {
     "label": "More vectors than dimensions",
     "call": "independent([[1, 2], [3, 4], [5, 7]])",
     "expect": "False"
    }
   ]
  }
 ],
 "la6": [
  {
   "id": "least_squares_line",
   "title": "Fitting a line by least squares",
   "prompt": "<p>Write <code>fit_line(xs, ys)</code> that returns <code>(c, m)</code>, the intercept and slope of the least-squares line <em>y</em> = <em>c</em> + <em>mx</em>, by solving the 2 × 2 normal equations from the notes. If all the <em>x</em>-values are equal, raise <code>ValueError</code>.</p>",
   "starter": "def fit_line(xs, ys):\n    pass\n",
   "hint": "<p>The normal equations are <em>nc</em> + (Σ<em>x</em>)<em>m</em> = Σ<em>y</em> and (Σ<em>x</em>)<em>c</em> + (Σ<em>x</em>²)<em>m</em> = Σ<em>xy</em>. Solve with the 2 × 2 inverse formula; its determinant <em>n</em>Σ<em>x</em>² − (Σ<em>x</em>)² is 0 exactly when all <em>x</em> are equal.</p>",
   "solution": "def fit_line(xs, ys):\n    n = len(xs)\n    sx, sy = sum(xs), sum(ys)\n    sxx = sum(x * x for x in xs)\n    sxy = sum(x * y for x, y in zip(xs, ys))\n    d = n * sxx - sx * sx\n    if d == 0:\n        raise ValueError(\"all x values are equal\")\n    m = (n * sxy - sx * sy) / d\n    c = (sy - m * sx) / n\n    return (c, m)\n",
   "tests": [
    {
     "label": "The notes' data",
     "type": "assert",
     "code": "import math\nc, m = fit_line([0, 1, 2, 3], [1, 3, 4, 4])\nassert math.isclose(c, 1.5) and math.isclose(m, 1.0), (c, m)\n"
    },
    {
     "label": "Points exactly on a line",
     "type": "assert",
     "code": "import math\nc, m = fit_line([1, 2, 3, 4], [5, 7, 9, 11])\nassert math.isclose(c, 3) and math.isclose(m, 2)\n"
    },
    {
     "label": "Practice problem data",
     "type": "assert",
     "code": "import math\nc, m = fit_line([1, 2, 3], [2, 3, 5])\nassert math.isclose(c, 1 / 3) and math.isclose(m, 1.5), (c, m)\n"
    },
    {
     "label": "Vertical data raises ValueError",
     "type": "raises",
     "call": "fit_line([2, 2, 2], [1, 2, 3])",
     "error": "ValueError"
    },
    {
     "label": "Residuals are orthogonal to the columns",
     "type": "assert",
     "hidden": true,
     "code": "import random\nrandom.seed(6)\nxs = [random.uniform(0, 10) for _ in range(50)]\nys = [3 - 0.5 * x + random.gauss(0, 1) for x in xs]\nc, m = fit_line(xs, ys)\ne = [y - (c + m * x) for x, y in zip(xs, ys)]\nassert abs(sum(e)) < 1e-8 and abs(sum(a * b for a, b in zip(e, xs))) < 1e-7\n"
    }
   ]
  },
  {
   "id": "gram_schmidt",
   "title": "Gram–Schmidt",
   "prompt": "<p>Write <code>gram_schmidt(vectors)</code> that returns an orthonormal basis (a list of lists of floats) for the span of the given vectors, processing them in order. If a vector is a combination of the earlier ones (its remainder has length below 1e-10), skip it, so the result may be shorter than the input.</p>",
   "starter": "import math\n\ndef gram_schmidt(vectors):\n    pass\n",
   "hint": "<p>Start from the notes' version. Subtract the projection onto each basis vector found so far, using the <em>current</em> remainder <code>w</code> in the dot product (this \"modified\" Gram–Schmidt is more accurate), then skip or normalize.</p>",
   "solution": "import math\n\ndef gram_schmidt(vectors):\n    basis = []\n    for v in vectors:\n        w = [float(a) for a in v]\n        for q in basis:\n            c = sum(a * b for a, b in zip(q, w))\n            w = [wi - c * qi for wi, qi in zip(w, q)]\n        length = math.sqrt(sum(a * a for a in w))\n        if length > 1e-10:\n            basis.append([a / length for a in w])\n    return basis\n",
   "tests": [
    {
     "label": "The notes' example",
     "type": "assert",
     "code": "import math\nB = gram_schmidt([[3, 4], [1, 0]])\nassert all(math.isclose(a, e, abs_tol=1e-12) for a, e in zip(B[0] + B[1], [0.6, 0.8, 0.8, -0.6])), B\n"
    },
    {
     "label": "Result is orthonormal",
     "type": "assert",
     "code": "import math\nB = gram_schmidt([[1, 1, 0], [1, 0, 1], [0, 1, 1]])\nassert len(B) == 3\nfor i in range(3):\n    for j in range(3):\n        d = sum(a * b for a, b in zip(B[i], B[j]))\n        assert math.isclose(d, 1.0 if i == j else 0.0, abs_tol=1e-12), (i, j, d)\n"
    },
    {
     "label": "Dependent vectors are skipped",
     "type": "assert",
     "code": "B = gram_schmidt([[1, 0, 0], [2, 0, 0], [0, 1, 0], [1, 1, 0]])\nassert len(B) == 2, f\"the span is a plane, so 2 vectors; got {len(B)}\"\n"
    },
    {
     "label": "Spans the same space",
     "type": "assert",
     "hidden": true,
     "code": "import math\nvs = [[1, 2, 2], [0, 1, 3]]\nB = gram_schmidt(vs)\nfor v in vs:\n    proj = [sum(sum(a * b for a, b in zip(q, v)) * q[i] for q in B) for i in range(3)]\n    assert all(math.isclose(p, a, abs_tol=1e-9) for p, a in zip(proj, v))\n"
    }
   ]
  }
 ],
 "la7": [
  {
   "id": "power_method",
   "title": "Power iteration",
   "prompt": "<p>Write <code>dominant_eigen(A, tol=1e-10, max_steps=10000)</code> that uses power iteration, starting from the all-ones vector, to return <code>(eigenvalue, eigenvector)</code> for the eigenvalue of largest absolute value of the square matrix <code>A</code>. Normalize the vector to length 1 at each step, estimate the eigenvalue as <b>v</b> · <em>A</em><b>v</b>, and stop when the estimate changes by less than <code>tol</code>. Return the eigenvector with its largest-magnitude entry positive. Raise <code>RuntimeError</code> if it doesn't converge within <code>max_steps</code>.</p>",
   "starter": "import math\n\ndef dominant_eigen(A, tol=1e-10, max_steps=10000):\n    pass\n",
   "hint": "<p>Write a helper for <em>A</em><b>v</b>. Each step: <b>w</b> = <em>A</em><b>v</b>, <b>v</b> = <b>w</b>/‖<b>w</b>‖, λ = <b>v</b> · <em>A</em><b>v</b>. At the end, if the entry with the largest absolute value is negative, negate the whole vector.</p>",
   "solution": "import math\n\ndef dominant_eigen(A, tol=1e-10, max_steps=10000):\n    n = len(A)\n    mul = lambda v: [sum(A[i][j] * v[j] for j in range(n)) for i in range(n)]\n    v = [1.0] * n\n    lam = None\n    for _ in range(max_steps):\n        w = mul(v)\n        norm = math.sqrt(sum(x * x for x in w))\n        v = [x / norm for x in w]\n        new = sum(a * b for a, b in zip(v, mul(v)))\n        if lam is not None and abs(new - lam) < tol:\n            big = max(v, key=abs)\n            if big < 0:\n                v = [-x for x in v]\n            return new, v\n        lam = new\n    raise RuntimeError(\"did not converge\")\n",
   "tests": [
    {
     "label": "[[2, 1], [1, 2]]",
     "type": "assert",
     "code": "import math\nlam, v = dominant_eigen([[2, 1], [1, 2]])\nassert math.isclose(lam, 3, rel_tol=1e-8), lam\nassert all(math.isclose(a, 1 / math.sqrt(2), rel_tol=1e-4) for a in v), v\n"
    },
    {
     "label": "[[4, 1], [2, 3]] has eigenvalue 5",
     "type": "assert",
     "code": "import math\nlam, v = dominant_eigen([[4, 1], [2, 3]])\nassert math.isclose(lam, 5, rel_tol=1e-8), lam\nassert math.isclose(v[0], v[1], rel_tol=1e-4), \"the eigenvector is along (1, 1)\"\n"
    },
    {
     "label": "Fibonacci matrix gives the golden ratio",
     "type": "assert",
     "code": "import math\nlam, v = dominant_eigen([[1, 1], [1, 0]])\nassert math.isclose(lam, (1 + math.sqrt(5)) / 2, rel_tol=1e-8), lam\n"
    },
    {
     "label": "Too few steps raises RuntimeError",
     "type": "raises",
     "call": "dominant_eigen([[2, 1], [1, 2]], max_steps=1)",
     "error": "RuntimeError"
    }
   ]
  },
  {
   "id": "pagerank",
   "title": "PageRank",
   "prompt": "<p>Write <code>pagerank(links, d=0.85, steps=100)</code>. <code>links</code> is a dict mapping each page to the list of pages it links to; every page appears as a key. Start every page at rank 1/<em>N</em>, then repeat <code>steps</code> times: each page's new rank is (1 − d)/<em>N</em>, plus d times the sum, over pages <em>q</em> linking to it, of rank(<em>q</em>) divided by <em>q</em>'s number of links. A page with no links (a \"dangling\" page) spreads its rank evenly over all <em>N</em> pages. Return a dict of ranks.</p>",
   "starter": "def pagerank(links, d=0.85, steps=100):\n    pass\n",
   "hint": "<p>Each step, start a new dict with (1 − d)/<em>N</em> for every page. Then for each page <em>q</em>, share d · rank(<em>q</em>) equally among its links, or among all pages if it has none.</p>",
   "solution": "def pagerank(links, d=0.85, steps=100):\n    pages = list(links)\n    n = len(pages)\n    rank = {p: 1 / n for p in pages}\n    for _ in range(steps):\n        new = {p: (1 - d) / n for p in pages}\n        for q in pages:\n            targets = links[q] or pages\n            share = d * rank[q] / len(targets)\n            for t in targets:\n                new[t] += share\n        rank = new\n    return rank\n",
   "tests": [
    {
     "label": "The notes' four pages",
     "type": "assert",
     "code": "import math\nr = pagerank({\"A\": [\"B\", \"C\"], \"B\": [\"C\"], \"C\": [\"A\"], \"D\": [\"C\"]})\nwant = {\"A\": 0.37252685, \"B\": 0.19582391, \"C\": 0.39414924, \"D\": 0.0375}\nassert all(math.isclose(r[p], want[p], abs_tol=1e-6) for p in want), r\n"
    },
    {
     "label": "Ranks add up to 1",
     "type": "assert",
     "code": "import math\nr = pagerank({\"A\": [\"B\"], \"B\": [\"C\"], \"C\": [\"A\", \"B\"], \"D\": []})\nassert math.isclose(sum(r.values()), 1.0), sum(r.values())\n"
    },
    {
     "label": "A cycle gives equal ranks",
     "type": "assert",
     "code": "import math\nr = pagerank({\"X\": [\"Y\"], \"Y\": [\"Z\"], \"Z\": [\"X\"]})\nassert all(math.isclose(v, 1 / 3) for v in r.values()), r\n"
    },
    {
     "label": "Dangling pages share evenly",
     "type": "assert",
     "code": "import math\nr = pagerank({\"A\": [\"B\"], \"B\": []}, steps=200)\nassert math.isclose(r[\"A\"] + r[\"B\"], 1.0) and r[\"B\"] > r[\"A\"], r\n"
    }
   ]
  }
 ],
 "la8": [
  {
   "id": "pca2d",
   "title": "Principal components in two dimensions",
   "prompt": "<p>Write <code>pca_2d(points)</code> for a list of at least two (<em>x</em>, <em>y</em>) points. Return <code>(direction, fraction)</code>: the first principal component as a unit vector (a tuple) with a non-negative <em>x</em> component (or, if <em>x</em> is 0, positive <em>y</em>), and the fraction of the total variance along it. Use the covariance matrix [<em>a</em> <em>b</em>; <em>b</em> <em>c</em>] with denominator <em>n</em> − 1 and the closed-form eigenvalues of a symmetric 2 × 2 matrix: λ = (<em>a</em> + <em>c</em>)/2 ± √(((<em>a</em> − <em>c</em>)/2)² + <em>b</em>²).</p>",
   "starter": "import math\n\ndef pca_2d(points):\n    pass\n",
   "hint": "<p>Center the points, then a = Σ<em>x</em>²/(<em>n</em> − 1), b = Σ<em>xy</em>/(<em>n</em> − 1), c = Σ<em>y</em>²/(<em>n</em> − 1). For the larger eigenvalue λ, an eigenvector is (<em>b</em>, λ − <em>a</em>) when <em>b</em> ≠ 0; if <em>b</em> = 0, it is (1, 0) when <em>a</em> ≥ <em>c</em> and (0, 1) otherwise. Normalize it.</p>",
   "solution": "import math\n\ndef pca_2d(points):\n    n = len(points)\n    mx = sum(p[0] for p in points) / n\n    my = sum(p[1] for p in points) / n\n    xs = [p[0] - mx for p in points]\n    ys = [p[1] - my for p in points]\n    a = sum(x * x for x in xs) / (n - 1)\n    b = sum(x * y for x, y in zip(xs, ys)) / (n - 1)\n    c = sum(y * y for y in ys) / (n - 1)\n    mid, rad = (a + c) / 2, math.sqrt(((a - c) / 2) ** 2 + b * b)\n    big, small = mid + rad, mid - rad\n    if b != 0:\n        v = (b, big - a)\n    else:\n        v = (1.0, 0.0) if a >= c else (0.0, 1.0)\n    length = math.hypot(*v)\n    v = (v[0] / length, v[1] / length)\n    if v[0] < 0 or (v[0] == 0 and v[1] < 0):\n        v = (-v[0], -v[1])\n    total = big + small\n    return v, (big / total if total else 1.0)\n",
   "tests": [
    {
     "label": "The notes' five points",
     "type": "assert",
     "code": "import math\nv, f = pca_2d([(2, 1), (3, 3), (4, 3), (5, 5), (6, 5)])\nassert math.isclose(v[0], 0.6856, abs_tol=1e-3) and math.isclose(v[1], 0.7280, abs_tol=1e-3), v\nassert math.isclose(f, 0.9725, abs_tol=1e-3), f\n"
    },
    {
     "label": "Points on a line",
     "type": "assert",
     "code": "import math\nv, f = pca_2d([(1, 1), (2, 2), (3, 3)])\nassert math.isclose(v[0], 1 / math.sqrt(2)) and math.isclose(v[1], 1 / math.sqrt(2)) and math.isclose(f, 1.0)\n"
    },
    {
     "label": "Spread along the y-axis",
     "type": "assert",
     "code": "import math\nv, f = pca_2d([(0, -3), (0.1, 0), (0, 3), (-0.1, 0)])\nassert math.isclose(abs(v[1]), 1, abs_tol=1e-6) and v[1] > 0, v\n"
    },
    {
     "label": "Negative slope",
     "type": "assert",
     "code": "import math\nv, f = pca_2d([(0, 4), (1, 3), (2, 2.2), (3, 0.8), (4, 0)])\nassert v[0] > 0 and v[1] < 0, v\n"
    }
   ]
  }
 ]
});
