/* Auto-graded programming problems for CS 350 Computer Graphics, by lesson. Generated from a Python
   spec, so every string is JSON. Images are lists of rows of (r, g, b) tuples; tests check pixel
   values, counts and coordinates, never how a picture looks. */
CSA.addCode("cs350", {
 "gr1": [
  {
   "id": "blend",
   "title": "Blending in linear light",
   "prompt": "<p>Colors are <code>(r, g, b)</code> tuples of sRGB-encoded integers 0–255. Write:</p>\n<ul>\n<li><code>to_linear(v)</code>: decode one sRGB value 0–255 to linear light, a float from 0 to 1, with the sRGB formula from the notes.</li>\n<li><code>to_srgb(x)</code>: encode linear light back to an integer 0–255. Clamp <code>x</code> to [0, 1] first, apply the sRGB encoding, multiply by 255 and round to nearest with <code>int(e * 255 + 0.5)</code>.</li>\n<li><code>over(fg, alpha, bg)</code>: composite color <code>fg</code> with opacity <code>alpha</code> (0 to 1) over the opaque color <code>bg</code>, channel by channel in linear light, and return the sRGB tuple.</li>\n<li><code>average(colors)</code>: the correct average of a non-empty list of colors (average the linear values, then encode).</li>\n</ul>",
   "starter": "def to_linear(v):\n    pass\n\ndef to_srgb(x):\n    pass\n\ndef over(fg, alpha, bg):\n    pass\n\ndef average(colors):\n    pass\n",
   "hint": "<p>Decode: <code>c = v / 255</code>; if <code>c &lt;= 0.04045</code> the result is <code>c / 12.92</code>, otherwise <code>((c + 0.055) / 1.055) ** 2.4</code>. Encode: if <code>x &lt;= 0.0031308</code> it is <code>12.92 * x</code>, otherwise <code>1.055 * x ** (1 / 2.4) - 0.055</code>. Write <code>over</code> and <code>average</code> using only these two functions.</p>",
   "solution": "def to_linear(v):\n    c = v / 255\n    if c <= 0.04045:\n        return c / 12.92\n    return ((c + 0.055) / 1.055) ** 2.4\n\ndef to_srgb(x):\n    x = min(1.0, max(0.0, x))\n    if x <= 0.0031308:\n        e = 12.92 * x\n    else:\n        e = 1.055 * x ** (1 / 2.4) - 0.055\n    return int(e * 255 + 0.5)\n\ndef over(fg, alpha, bg):\n    return tuple(to_srgb(alpha * to_linear(f) + (1 - alpha) * to_linear(b)) for f, b in zip(fg, bg))\n\ndef average(colors):\n    n = len(colors)\n    return tuple(to_srgb(sum(to_linear(c[i]) for c in colors) / n) for i in range(3))\n",
   "tests": [
    {
     "label": "Decoding",
     "type": "assert",
     "code": "import math\nassert to_linear(0) == 0 and math.isclose(to_linear(255), 1.0)\nassert math.isclose(to_linear(128), 0.21586, rel_tol=1e-4), to_linear(128)\nassert math.isclose(to_linear(10), 10 / 255 / 12.92), \"the linear segment near black\"\n"
    },
    {
     "label": "Encoding, with clamping",
     "type": "assert",
     "code": "assert to_srgb(0.5) == 188, to_srgb(0.5)\nassert to_srgb(0.0) == 0 and to_srgb(1.0) == 255\nassert to_srgb(1.7) == 255 and to_srgb(-0.2) == 0\nassert isinstance(to_srgb(0.25), int)\n"
    },
    {
     "label": "Round trip for every value",
     "type": "assert",
     "code": "assert all(to_srgb(to_linear(v)) == v for v in range(256))\n"
    },
    {
     "label": "Half-transparent white over black",
     "call": "over((255, 255, 255), 0.5, (0, 0, 0))",
     "expect": "(188, 188, 188)"
    },
    {
     "label": "Red at 25% over blue",
     "call": "over((255, 0, 0), 0.25, (0, 0, 255))",
     "expect": "(137, 0, 225)"
    },
    {
     "label": "Alpha 0 and 1",
     "type": "assert",
     "code": "assert over((10, 200, 30), 0, (40, 50, 60)) == (40, 50, 60) and over((10, 200, 30), 1, (40, 50, 60)) == (10, 200, 30)\n"
    },
    {
     "label": "Average of a checkerboard's colors",
     "call": "average([(0, 0, 0), (255, 255, 255)])",
     "expect": "(188, 188, 188)"
    },
    {
     "label": "Average of three",
     "call": "average([(255, 0, 0), (0, 255, 0), (0, 0, 255)])",
     "expect": "(156, 156, 156)",
     "hidden": true
    }
   ]
  },
  {
   "id": "lines",
   "title": "Bresenham's lines and a PPM file",
   "prompt": "<p>Write <code>line_pixels(x0, y0, x1, y1)</code> returning the list of pixels <code>(x, y)</code> on the line between two integer points, in order from the first point to the second, using Bresenham's integer-only method for every direction (all eight octants). For each step along the longer axis, the pixel chosen must be the one nearest the true line. (When the true line passes exactly halfway between two pixels either is acceptable; the tests avoid those cases.) Don't use <code>/</code>, <code>float</code>, <code>round</code> or <code>math</code> anywhere in your program, not even in comments: <code>//</code> is fine.</p>\n<p>Then write <code>draw_line(img, x0, y0, x1, y1, color)</code>, which sets those pixels of the image <code>img</code> (a list of rows, <code>img[y][x]</code>) to <code>color</code>, skipping any outside the image, and <code>to_ppm(img)</code>, which returns the image as P3 text: the line <code>P3</code>, then <code>width height</code>, then <code>255</code>, then one line per row with every number separated by single spaces, and a final newline.</p>",
   "starter": "def line_pixels(x0, y0, x1, y1):\n    pass\n\ndef draw_line(img, x0, y0, x1, y1, color):\n    pass\n\ndef to_ppm(img):\n    pass\n",
   "hint": "<p>Reduce every case to the first octant. Let <code>dx = abs(x1 - x0)</code>, <code>dy = abs(y1 - y0)</code>, and step signs <code>sx</code>, <code>sy</code> of ±1. If <code>dy &gt; dx</code> the line is steep: swap the roles of <em>x</em> and <em>y</em> (and of <code>dx</code> and <code>dy</code>). Then run the notes' loop: always step the long axis, and step the short axis when <code>d &gt; 0</code>.</p>",
   "solution": "def line_pixels(x0, y0, x1, y1):\n    dx, dy = abs(x1 - x0), abs(y1 - y0)\n    sx = 1 if x1 >= x0 else -1\n    sy = 1 if y1 >= y0 else -1\n    steep = dy > dx\n    if steep:\n        dx, dy = dy, dx\n    d = 2 * dy - dx\n    x, y = x0, y0\n    pts = []\n    for _ in range(dx + 1):\n        pts.append((x, y))\n        if d > 0:\n            if steep:\n                x += sx\n            else:\n                y += sy\n            d -= 2 * dx\n        d += 2 * dy\n        if steep:\n            y += sy\n        else:\n            x += sx\n    return pts\n\ndef draw_line(img, x0, y0, x1, y1, color):\n    h, w = len(img), len(img[0])\n    for x, y in line_pixels(x0, y0, x1, y1):\n        if 0 <= x < w and 0 <= y < h:\n            img[y][x] = color\n\ndef to_ppm(img):\n    lines = [\"P3\", f\"{len(img[0])} {len(img)}\", \"255\"]\n    for row in img:\n        lines.append(\" \".join(f\"{r} {g} {b}\" for r, g, b in row))\n    return \"\\n\".join(lines) + \"\\n\"\n",
   "tests": [
    {
     "label": "A gentle slope",
     "call": "line_pixels(0, 0, 5, 2)",
     "expect": "[(0, 0), (1, 0), (2, 1), (3, 1), (4, 2), (5, 2)]"
    },
    {
     "label": "Steep, going up the screen",
     "call": "line_pixels(2, 7, 0, 0)",
     "expect": "[(2, 7), (2, 6), (1, 5), (1, 4), (1, 3), (1, 2), (0, 1), (0, 0)]"
    },
    {
     "label": "Horizontal, vertical, diagonal and a single point",
     "type": "assert",
     "code": "assert line_pixels(3, 1, 0, 1) == [(3, 1), (2, 1), (1, 1), (0, 1)]\nassert line_pixels(0, 0, 0, 3) == [(0, 0), (0, 1), (0, 2), (0, 3)]\nassert line_pixels(0, 0, -3, 3) == [(0, 0), (-1, 1), (-2, 2), (-3, 3)]\nassert line_pixels(4, 4, 4, 4) == [(4, 4)]\n"
    },
    {
     "label": "Every octant matches the nearest pixel",
     "type": "assert",
     "code": "from fractions import Fraction\nimport itertools\ndef nearest(x0, y0, x1, y1):\n    dx, dy = x1 - x0, y1 - y0\n    n = max(abs(dx), abs(dy))\n    out = []\n    for k in range(n + 1):\n        if abs(dx) >= abs(dy):\n            x = x0 + k * (1 if dx >= 0 else -1)\n            y = Fraction(y0) + Fraction(dy * (x - x0), dx)\n            out.append((x, int((y + Fraction(1, 2)) // 1)))\n        else:\n            y = y0 + k * (1 if dy >= 0 else -1)\n            x = Fraction(x0) + Fraction(dx * (y - y0), dy)\n            out.append((int((x + Fraction(1, 2)) // 1), y))\n    return out\nfor x0, y0, x1, y1 in itertools.product(range(-3, 4), repeat=4):\n    if max(abs(x1 - x0), abs(y1 - y0)) % 2 == 1:\n        got = line_pixels(x0, y0, x1, y1)\n        assert got == nearest(x0, y0, x1, y1), ((x0, y0, x1, y1), got)\n"
    },
    {
     "label": "Long lines: one pixel per step, all 8-connected",
     "type": "assert",
     "code": "for args in [(0, 0, 40, 17), (0, 0, -13, 50), (5, -9, -30, 2)]:\n    p = line_pixels(*args)\n    assert len(p) == max(abs(args[2] - args[0]), abs(args[3] - args[1])) + 1\n    assert p[0] == args[:2] and p[-1] == args[2:]\n    assert all(max(abs(a[0] - b[0]), abs(a[1] - b[1])) == 1 for a, b in zip(p, p[1:]))\n"
    },
    {
     "label": "Integer arithmetic only",
     "type": "source",
     "code": "s = __source__.replace(\"//\", \"\")\nfor bad in [\"/\", \"float\", \"round\", \"math\"]:\n    assert bad not in s, \"found \" + bad\n"
    },
    {
     "label": "Drawing, clipped to the image",
     "type": "assert",
     "code": "img = [[(0, 0, 0)] * 4 for _ in range(3)]\ndraw_line(img, -1, 0, 5, 2, (255, 0, 0))\nlit = sorted((x, y) for y in range(3) for x in range(4) if img[y][x] == (255, 0, 0))\nassert lit == [(0, 0), (1, 1), (2, 1), (3, 1)], lit\n"
    },
    {
     "label": "PPM text",
     "type": "assert",
     "code": "img = [[(255, 0, 0), (0, 255, 0)], [(0, 0, 255), (255, 255, 255)]]\nassert to_ppm(img) == \"P3\\n2 2\\n255\\n255 0 0 0 255 0\\n0 0 255 255 255 255\\n\", repr(to_ppm(img))\n"
    }
   ]
  }
 ],
 "gr2": [
  {
   "id": "transform2d",
   "title": "2D transforms in homogeneous coordinates",
   "prompt": "<p>Represent 2D transforms as 3 × 3 matrices (lists of three rows) acting on homogeneous points (<em>x</em>, <em>y</em>, 1). Write <code>translate(tx, ty)</code>, <code>scale(sx, sy)</code>, <code>rotate(degrees)</code> (counterclockwise, with <em>y</em> pointing up), <code>matmul(A, B)</code> for 3 × 3 matrices, and <code>compose(*ms)</code>, which returns the matrix product of its arguments in order, <code>matmul(ms[0], matmul(ms[1], ... ms[-1]))</code> (so the <em>last</em> matrix acts first; with no arguments, the identity). <code>apply(M, p)</code> takes a point <code>(x, y)</code> and returns the transformed <code>(x, y)</code>. Finally, <code>rotate_about(degrees, cx, cy)</code> returns the matrix rotating about the point (<em>cx</em>, <em>cy</em>) instead of the origin.</p>",
   "starter": "import math\n\ndef translate(tx, ty):\n    pass\n\ndef scale(sx, sy):\n    pass\n\ndef rotate(degrees):\n    pass\n\ndef matmul(A, B):\n    pass\n\ndef compose(*ms):\n    pass\n\ndef apply(M, p):\n    pass\n\ndef rotate_about(degrees, cx, cy):\n    pass\n",
   "hint": "<p>Rotating about a point is three steps: move the point to the origin, rotate, move it back. Write those as a composition, remembering which matrix acts first.</p>",
   "solution": "import math\n\ndef translate(tx, ty):\n    return [[1, 0, tx], [0, 1, ty], [0, 0, 1]]\n\ndef scale(sx, sy):\n    return [[sx, 0, 0], [0, sy, 0], [0, 0, 1]]\n\ndef rotate(degrees):\n    t = math.radians(degrees)\n    c, s = math.cos(t), math.sin(t)\n    return [[c, -s, 0], [s, c, 0], [0, 0, 1]]\n\ndef matmul(A, B):\n    return [[sum(A[i][k] * B[k][j] for k in range(3)) for j in range(3)] for i in range(3)]\n\ndef compose(*ms):\n    M = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]\n    for m in ms:\n        M = matmul(M, m)\n    return M\n\ndef apply(M, p):\n    x, y = p\n    return (M[0][0] * x + M[0][1] * y + M[0][2], M[1][0] * x + M[1][1] * y + M[1][2])\n\ndef rotate_about(degrees, cx, cy):\n    return compose(translate(cx, cy), rotate(degrees), translate(-cx, -cy))\n",
   "tests": [
    {
     "label": "Translation moves points",
     "call": "apply(translate(3, -2), (1, 1))",
     "expect": "(4, -1)"
    },
    {
     "label": "Rotation by 90°",
     "type": "assert",
     "code": "import math\nx, y = apply(rotate(90), (1, 0))\nassert abs(x) < 1e-12 and math.isclose(y, 1), (x, y)\n"
    },
    {
     "label": "Order matters",
     "type": "assert",
     "code": "import math\na = apply(compose(translate(5, 0), scale(2, 2)), (1, 1))\nb = apply(compose(scale(2, 2), translate(5, 0)), (1, 1))\nassert a == (7, 2), a\nassert b == (12, 2), b\n"
    },
    {
     "label": "The notes' example: scale, rotate, translate",
     "type": "assert",
     "code": "import math\nx, y = apply(compose(translate(4, 1), rotate(90), scale(2, 1)), (1, 1))\nassert math.isclose(x, 3) and math.isclose(y, 3), (x, y)\n"
    },
    {
     "label": "compose with no arguments is the identity",
     "call": "compose()",
     "expect": "[[1, 0, 0], [0, 1, 0], [0, 0, 1]]"
    },
    {
     "label": "Rotation about a point",
     "type": "assert",
     "code": "import math\nx, y = apply(rotate_about(90, 2, 3), (4, 3))\nassert math.isclose(x, 2) and math.isclose(y, 5), (x, y)\ncx, cy = apply(rotate_about(37, 2, 3), (2, 3))\nassert math.isclose(cx, 2) and math.isclose(cy, 3), \"the centre must stay fixed\"\n"
    },
    {
     "label": "Twelve rotations by 30° return home",
     "type": "assert",
     "code": "import math\nM = compose(*[rotate(30)] * 12)\nx, y = apply(M, (3, 4))\nassert math.isclose(x, 3) and math.isclose(y, 4), (x, y)\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "transform3d",
   "title": "3D transforms and normals",
   "prompt": "<p>Now in 3D with 4 × 4 matrices. Write <code>rotate_x(deg)</code>, <code>rotate_y(deg)</code> and <code>rotate_z(deg)</code> (right-handed: counterclockwise when you look from the positive end of the axis toward the origin), <code>translate3(tx, ty, tz)</code> and <code>scale3(sx, sy, sz)</code>. Then <code>transform_point(M, p)</code> (treat <code>p</code> as (<em>x</em>, <em>y</em>, <em>z</em>, 1) and return a 3-tuple), <code>transform_vector(M, v)</code> (a direction: <em>w</em> = 0, so translation doesn't affect it), and <code>transform_normal(M, n)</code>, which returns the unit-length normal (<em>A</em><sup>−1</sup>)<sup>T</sup><strong>n</strong>, normalized, where <em>A</em> is the upper-left 3 × 3 block of <code>M</code>. Raise <code>ValueError</code> if <em>A</em> isn't invertible.</p>",
   "starter": "import math\n\ndef rotate_x(deg):\n    pass\n\ndef rotate_y(deg):\n    pass\n\ndef rotate_z(deg):\n    pass\n\ndef translate3(tx, ty, tz):\n    pass\n\ndef scale3(sx, sy, sz):\n    pass\n\ndef transform_point(M, p):\n    pass\n\ndef transform_vector(M, v):\n    pass\n\ndef transform_normal(M, n):\n    pass\n",
   "hint": "<p>The notes give a shortcut for (<em>A</em><sup>−1</sup>)<sup>T</sup>: if <strong>a</strong>, <strong>b</strong>, <strong>c</strong> are the columns of <em>A</em>, its columns are <strong>b</strong> × <strong>c</strong>, <strong>c</strong> × <strong>a</strong> and <strong>a</strong> × <strong>b</strong>, divided by det <em>A</em> = <strong>a</strong> · (<strong>b</strong> × <strong>c</strong>). Since you normalize at the end, you can skip dividing by the determinant only if you keep its sign.</p>",
   "solution": "import math\n\ndef _rot(deg, i, j):\n    t = math.radians(deg)\n    c, s = math.cos(t), math.sin(t)\n    M = [[1.0 if r == k else 0.0 for k in range(4)] for r in range(4)]\n    M[i][i], M[i][j], M[j][i], M[j][j] = c, -s, s, c\n    return M\n\ndef rotate_x(deg):\n    return _rot(deg, 1, 2)\n\ndef rotate_y(deg):\n    return _rot(deg, 2, 0)\n\ndef rotate_z(deg):\n    return _rot(deg, 0, 1)\n\ndef translate3(tx, ty, tz):\n    return [[1, 0, 0, tx], [0, 1, 0, ty], [0, 0, 1, tz], [0, 0, 0, 1]]\n\ndef scale3(sx, sy, sz):\n    return [[sx, 0, 0, 0], [0, sy, 0, 0], [0, 0, sz, 0], [0, 0, 0, 1]]\n\ndef transform_point(M, p):\n    v = (p[0], p[1], p[2], 1)\n    return tuple(sum(M[i][k] * v[k] for k in range(4)) for i in range(3))\n\ndef transform_vector(M, v):\n    return tuple(sum(M[i][k] * v[k] for k in range(3)) for i in range(3))\n\ndef _cross(a, b):\n    return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])\n\ndef transform_normal(M, n):\n    a, b, c = [tuple(M[r][k] for r in range(3)) for k in range(3)]\n    cols = [_cross(b, c), _cross(c, a), _cross(a, b)]\n    det = sum(x * y for x, y in zip(a, cols[0]))\n    if abs(det) < 1e-12:\n        raise ValueError(\"matrix is not invertible\")\n    out = [sum(cols[k][i] * n[k] for k in range(3)) / det for i in range(3)]\n    length = math.sqrt(sum(x * x for x in out))\n    return tuple(x / length for x in out)\n",
   "tests": [
    {
     "label": "Each rotation's direction",
     "type": "assert",
     "code": "import math\ndef close(a, b):\n    return all(abs(x - y) < 1e-9 for x, y in zip(a, b))\nassert close(transform_point(rotate_z(90), (1, 0, 0)), (0, 1, 0)), \"z: x goes to y\"\nassert close(transform_point(rotate_x(90), (0, 1, 0)), (0, 0, 1)), \"x: y goes to z\"\nassert close(transform_point(rotate_y(90), (0, 0, 1)), (1, 0, 0)), \"y: z goes to x\"\n"
    },
    {
     "label": "Points translate, vectors don't",
     "type": "assert",
     "code": "assert transform_point(translate3(1, 2, 3), (1, 1, 1)) == (2, 3, 4)\nassert transform_vector(translate3(1, 2, 3), (1, 1, 1)) == (1, 1, 1)\n"
    },
    {
     "label": "A composite transform",
     "type": "assert",
     "code": "def mm(A, B):\n    return [[sum(A[i][k] * B[k][j] for k in range(4)) for j in range(4)] for i in range(4)]\nM = mm(translate3(0, 0, -5), mm(rotate_y(90), scale3(2, 2, 2)))\np = transform_point(M, (1, 0, 0))\nassert all(abs(x - y) < 1e-9 for x, y in zip(p, (0, 0, -7))), p\n"
    },
    {
     "label": "Non-uniform scale: the normal stays perpendicular",
     "type": "assert",
     "code": "import math\nM = scale3(2, 1, 1)\nn = transform_normal(M, (1, 1, 0))\nassert math.isclose(n[0], 1 / math.sqrt(5)) and math.isclose(n[1], 2 / math.sqrt(5)) and abs(n[2]) < 1e-12, n\nt = transform_vector(M, (1, -1, 0))\nassert abs(sum(a * b for a, b in zip(n, t))) < 1e-12\n"
    },
    {
     "label": "A general matrix: normal ⟂ transformed tangents",
     "type": "assert",
     "code": "import math\nM = [[1, 2, 0, 3], [0, 1, 4, 0], [2, 0, 1, 1], [0, 0, 0, 1]]\nn = transform_normal(M, (0, 0, 1))\nfor t in [(1, 0, 0), (0, 1, 0)]:\n    tt = transform_vector(M, t)\n    assert abs(sum(a * b for a, b in zip(n, tt))) < 1e-9\nassert math.isclose(sum(x * x for x in n), 1.0)\n"
    },
    {
     "label": "A reflection keeps the normal's orientation consistent",
     "type": "assert",
     "code": "n = transform_normal(scale3(-1, 1, 1), (1, 0, 0))\nassert all(abs(x - y) < 1e-12 for x, y in zip(n, (-1, 0, 0))), n\n"
    },
    {
     "label": "Singular matrix",
     "type": "raises",
     "call": "transform_normal(scale3(1, 0, 1), (0, 1, 0))",
     "error": "ValueError"
    }
   ]
  }
 ],
 "gr3": [
  {
   "id": "lookat",
   "title": "A look-at camera",
   "prompt": "<p>Write <code>look_at(eye, target, up)</code> returning the 4 × 4 view matrix of a camera at <code>eye</code> looking toward <code>target</code>, using the notes' construction: <strong>w</strong> = normalize(eye − target), <strong>u</strong> = normalize(up × <strong>w</strong>), <strong>v</strong> = <strong>w</strong> × <strong>u</strong>; the rows are (<strong>u</strong>, −<strong>u</strong>·eye), (<strong>v</strong>, −<strong>v</strong>·eye), (<strong>w</strong>, −<strong>w</strong>·eye) and (0, 0, 0, 1). Raise <code>ValueError</code> if <code>eye</code> equals <code>target</code> or <code>up</code> is parallel to the viewing direction. Also write <code>to_camera(view, p)</code>, returning the camera coordinates (<em>x</em>, <em>y</em>, <em>z</em>) of world point <code>p</code>.</p>",
   "starter": "import math\n\ndef look_at(eye, target, up):\n    pass\n\ndef to_camera(view, p):\n    pass\n",
   "hint": "<p>Write small helpers first: <code>sub</code>, <code>dot</code>, <code>cross</code> and <code>normalize</code>. The parallel test is a zero (or nearly zero) cross product <code>up × w</code>.</p>",
   "solution": "import math\n\ndef _sub(a, b):\n    return tuple(x - y for x, y in zip(a, b))\n\ndef _dot(a, b):\n    return sum(x * y for x, y in zip(a, b))\n\ndef _cross(a, b):\n    return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])\n\ndef _normalize(a):\n    n = math.sqrt(_dot(a, a))\n    if n < 1e-12:\n        raise ValueError(\"zero-length vector\")\n    return tuple(x / n for x in a)\n\ndef look_at(eye, target, up):\n    w = _normalize(_sub(eye, target))\n    u = _normalize(_cross(up, w))\n    v = _cross(w, u)\n    return [list(u) + [-_dot(u, eye)], list(v) + [-_dot(v, eye)],\n            list(w) + [-_dot(w, eye)], [0, 0, 0, 1]]\n\ndef to_camera(view, p):\n    q = (p[0], p[1], p[2], 1)\n    return tuple(sum(view[i][k] * q[k] for k in range(4)) for i in range(3))\n",
   "tests": [
    {
     "label": "Camera at (0, 0, 5) looking at the origin",
     "type": "assert",
     "code": "V = look_at((0, 0, 5), (0, 0, 0), (0, 1, 0))\np = to_camera(V, (0, 0, 0))\nassert all(abs(a - b) < 1e-12 for a, b in zip(p, (0, 0, -5))), p\np = to_camera(V, (1, 2, 0))\nassert all(abs(a - b) < 1e-12 for a, b in zip(p, (1, 2, -5))), p\n"
    },
    {
     "label": "The notes' camera",
     "type": "assert",
     "code": "V = look_at((4, 3, 4), (0, 1, 0), (0, 1, 0))\np = to_camera(V, (0, 1, 0))\nassert all(abs(a - b) < 1e-9 for a, b in zip(p, (0, 0, -6))), p\np = to_camera(V, (0, 3, 0))\nassert all(abs(a - b) < 1e-4 for a, b in zip(p, (0, 1.8856, -5.3333))), p\n"
    },
    {
     "label": "The basis is orthonormal",
     "type": "assert",
     "code": "import math\nV = look_at((1, -2, 3), (4, 0, -1), (0, 0, 1))\nrows = [V[i][:3] for i in range(3)]\nfor i in range(3):\n    for j in range(3):\n        d = sum(a * b for a, b in zip(rows[i], rows[j]))\n        assert abs(d - (1 if i == j else 0)) < 1e-12, (i, j, d)\n"
    },
    {
     "label": "The target is straight ahead",
     "type": "assert",
     "code": "import math\neye, target = (1, -2, 3), (4, 0, -1)\nx, y, z = to_camera(look_at(eye, target, (0, 0, 1)), target)\nassert abs(x) < 1e-12 and abs(y) < 1e-12 and math.isclose(z, -math.dist(eye, target)), (x, y, z)\n"
    },
    {
     "label": "Up parallel to the view direction",
     "type": "raises",
     "call": "look_at((0, 5, 0), (0, 0, 0), (0, 1, 0))",
     "error": "ValueError"
    },
    {
     "label": "Eye at the target",
     "type": "raises",
     "call": "look_at((1, 1, 1), (1, 1, 1), (0, 1, 0))",
     "error": "ValueError"
    }
   ]
  },
  {
   "id": "project",
   "title": "From world point to pixel",
   "prompt": "<p>Write <code>perspective(fov_y, aspect, near, far)</code> returning the 4 × 4 perspective matrix from the notes (OpenGL's convention: the camera looks down −<em>z</em>; <code>fov_y</code> in degrees; <code>aspect</code> = width/height). Write <code>to_pixel(clip, width, height)</code>: given clip coordinates (<em>x</em>, <em>y</em>, <em>z</em>, <em>w</em>), do the perspective divide and the viewport mapping, returning <code>(px, py, depth)</code> where <code>px = (x_ndc + 1) / 2 * width</code>, <code>py = (1 - y_ndc) / 2 * height</code> and <code>depth</code> is <em>z</em><sub>ndc</sub>. Finally <code>project_point(p, view, proj, width, height)</code> takes a world point, applies the view matrix and then the projection, and returns <code>to_pixel</code>'s result, or <code>None</code> if the point is outside the view frustum (<em>w</em> ≤ 0, or any NDC coordinate outside [−1, 1]).</p>",
   "starter": "import math\n\ndef perspective(fov_y, aspect, near, far):\n    pass\n\ndef to_pixel(clip, width, height):\n    pass\n\ndef project_point(p, view, proj, width, height):\n    pass\n",
   "hint": "<p>With <em>f</em> = 1/tan(fov_y/2), the matrix rows are (<em>f</em>/aspect, 0, 0, 0), (0, <em>f</em>, 0, 0), (0, 0, (far + near)/(near − far), 2·far·near/(near − far)) and (0, 0, −1, 0). Test the clip <em>w</em> before dividing by it.</p>",
   "solution": "import math\n\ndef perspective(fov_y, aspect, near, far):\n    f = 1 / math.tan(math.radians(fov_y) / 2)\n    return [[f / aspect, 0, 0, 0], [0, f, 0, 0],\n            [0, 0, (far + near) / (near - far), 2 * far * near / (near - far)],\n            [0, 0, -1, 0]]\n\ndef to_pixel(clip, width, height):\n    x, y, z, w = clip\n    xn, yn, zn = x / w, y / w, z / w\n    return ((xn + 1) / 2 * width, (1 - yn) / 2 * height, zn)\n\ndef _mul(M, v):\n    return tuple(sum(M[i][k] * v[k] for k in range(4)) for i in range(4))\n\ndef project_point(p, view, proj, width, height):\n    clip = _mul(proj, _mul(view, (p[0], p[1], p[2], 1)))\n    w = clip[3]\n    if w <= 0:\n        return None\n    if any(abs(c / w) > 1 for c in clip[:3]):\n        return None\n    return to_pixel(clip, width, height)\n",
   "tests": [
    {
     "label": "The matrix",
     "type": "assert",
     "code": "import math\nP = perspective(90, 2.0, 1, 3)\nassert math.isclose(P[0][0], 0.5) and math.isclose(P[1][1], 1.0), P\nassert math.isclose(P[2][2], -2.0) and math.isclose(P[2][3], -3.0) and P[3][2] == -1 and P[3][3] == 0, P\n"
    },
    {
     "label": "Near and far planes map to depth −1 and +1",
     "type": "assert",
     "code": "import math\nP = perspective(60, 1.0, 0.5, 20)\nI = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]\nassert math.isclose(project_point((0, 0, -0.5), I, P, 100, 100)[2], -1.0)\nassert math.isclose(project_point((0, 0, -20), I, P, 100, 100)[2], 1.0)\nx, y, d = project_point((0, 0, -3), I, P, 100, 100)\nassert math.isclose(x, 50) and math.isclose(y, 50), (x, y)\n"
    },
    {
     "label": "The notes' example",
     "type": "assert",
     "code": "import math\nP = perspective(90, 64 / 48, 1, 100)\nI = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]\npx, py, d = project_point((1, 1, -4), I, P, 64, 48)\nassert math.isclose(px, 38.0) and math.isclose(py, 18.0), (px, py)\nassert math.isclose(d, 0.51515, rel_tol=1e-4), d\n"
    },
    {
     "label": "Behind the camera or outside the frustum",
     "type": "assert",
     "code": "P = perspective(90, 1.0, 1, 100)\nI = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]\nassert project_point((0, 0, 5), I, P, 32, 32) is None, \"behind\"\nassert project_point((5, 0, -4), I, P, 32, 32) is None, \"off to the right\"\nassert project_point((0, 0, -0.5), I, P, 32, 32) is None, \"nearer than the near plane\"\nassert project_point((0, 0, -200), I, P, 32, 32) is None, \"beyond the far plane\"\n"
    },
    {
     "label": "With a look-at camera",
     "type": "assert",
     "code": "import math\ndef look(eye, target, up):\n    def sub(a, b): return [x - y for x, y in zip(a, b)]\n    def dot(a, b): return sum(x * y for x, y in zip(a, b))\n    def cross(a, b): return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]\n    def norm(a): n = math.sqrt(dot(a, a)); return [x / n for x in a]\n    w = norm(sub(eye, target)); u = norm(cross(up, w)); v = cross(w, u)\n    return [u + [-dot(u, eye)], v + [-dot(v, eye)], w + [-dot(w, eye)], [0, 0, 0, 1]]\nV = look((4, 3, 4), (0, 1, 0), (0, 1, 0))\nP = perspective(60, 1.0, 0.1, 100)\npx, py, d = project_point((0, 1, 0), V, P, 64, 64)\nassert math.isclose(px, 32) and math.isclose(py, 32), (px, py)\npx, py, d = project_point((0, 3, 0), V, P, 64, 64)\nassert math.isclose(px, 32) and math.isclose(py, 12.4, rel_tol=1e-3), (px, py)\n",
     "hidden": true
    }
   ]
  }
 ],
 "gr4": [
  {
   "id": "barycentric",
   "title": "Edge functions and barycentric coordinates",
   "prompt": "<p>Points are <code>(x, y)</code> pairs in screen coordinates. Write <code>edge(a, b, p)</code> = (<em>b<sub>x</sub></em> − <em>a<sub>x</sub></em>)(<em>p<sub>y</sub></em> − <em>a<sub>y</sub></em>) − (<em>b<sub>y</sub></em> − <em>a<sub>y</sub></em>)(<em>p<sub>x</sub></em> − <em>a<sub>x</sub></em>); <code>barycentric(p, a, b, c)</code>, returning (<em>λ</em><sub>a</sub>, <em>λ</em><sub>b</sub>, <em>λ</em><sub>c</sub>) and raising <code>ValueError</code> for a degenerate (zero-area) triangle; <code>inside(p, a, b, c)</code>, true when <code>p</code> is inside or on the boundary, for either vertex order; and <code>interpolate(p, a, b, c, va, vb, vc)</code>, which blends three values (numbers or equal-length tuples) with the barycentric weights.</p>",
   "starter": "def edge(a, b, p):\n    pass\n\ndef barycentric(p, a, b, c):\n    pass\n\ndef inside(p, a, b, c):\n    pass\n\ndef interpolate(p, a, b, c, va, vb, vc):\n    pass\n",
   "hint": "<p><em>λ</em><sub>a</sub> = <code>edge(b, c, p) / edge(a, b, c)</code>, and cycle the letters for the others. Dividing by the signed area makes the weights independent of vertex order, so <code>inside</code> is just \"all three are ≥ 0\".</p>",
   "solution": "def edge(a, b, p):\n    return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])\n\ndef barycentric(p, a, b, c):\n    area = edge(a, b, c)\n    if area == 0:\n        raise ValueError(\"degenerate triangle\")\n    return (edge(b, c, p) / area, edge(c, a, p) / area, edge(a, b, p) / area)\n\ndef inside(p, a, b, c):\n    return all(l >= 0 for l in barycentric(p, a, b, c))\n\ndef interpolate(p, a, b, c, va, vb, vc):\n    la, lb, lc = barycentric(p, a, b, c)\n    if isinstance(va, (int, float)):\n        return la * va + lb * vb + lc * vc\n    return tuple(la * x + lb * y + lc * z for x, y, z in zip(va, vb, vc))\n",
   "tests": [
    {
     "label": "Edge function signs",
     "type": "assert",
     "code": "assert edge((0, 0), (4, 0), (1, 3)) == 12\nassert edge((0, 0), (4, 0), (1, -3)) == -12\nassert edge((0, 0), (4, 0), (2, 0)) == 0\n"
    },
    {
     "label": "The notes' triangle",
     "type": "assert",
     "code": "import math\nl = barycentric((3, 2), (1, 1), (7, 2), (2, 6))\nassert all(math.isclose(x, y) for x, y in zip(l, (16 / 29, 9 / 29, 4 / 29))), l\nassert math.isclose(sum(l), 1.0)\n"
    },
    {
     "label": "Vertices have weights (1, 0, 0) and so on",
     "type": "assert",
     "code": "a, b, c = (1, 1), (7, 2), (2, 6)\nassert barycentric(a, a, b, c) == (1, 0, 0) and barycentric(b, a, b, c) == (0, 1, 0) and barycentric(c, a, b, c) == (0, 0, 1)\n"
    },
    {
     "label": "Inside, outside, on an edge, either order",
     "type": "assert",
     "code": "a, b, c = (0, 0), (8, 0), (0, 8)\nassert inside((2, 2), a, b, c) and inside((2, 2), a, c, b)\nassert not inside((5, 5), a, b, c) and not inside((5, 5), c, b, a)\nassert inside((4, 4), a, b, c) and inside((0, 3), a, c, b)\nassert not inside((-0.01, 3), a, b, c)\n"
    },
    {
     "label": "Interpolating colors and numbers",
     "type": "assert",
     "code": "import math\na, b, c = (0, 0), (8, 0), (0, 8)\ncol = interpolate((2, 4), a, b, c, (255, 0, 0), (0, 255, 0), (0, 0, 255))\nassert all(math.isclose(x, y) for x, y in zip(col, (63.75, 63.75, 127.5))), col\nassert math.isclose(interpolate((2, 4), a, b, c, 1.0, 3.0, 5.0), 3.5)\n"
    },
    {
     "label": "Degenerate triangle",
     "type": "raises",
     "call": "barycentric((1, 1), (0, 0), (1, 1), (2, 2))",
     "error": "ValueError"
    }
   ]
  },
  {
   "id": "zbuffer",
   "title": "A triangle rasterizer with a z-buffer",
   "prompt": "<p>Write <code>rasterize(width, height, triangles, background=(0, 0, 0))</code>. Each triangle is <code>(v0, v1, v2, color)</code> where each vertex is <code>(x, y, z)</code> in pixel coordinates (<em>x</em> right, <em>y</em> down) and <em>z</em> is depth: smaller is nearer. Pixel (<em>i</em>, <em>j</em>) is sampled at its centre (<em>i</em> + 0.5, <em>j</em> + 0.5). A sample is covered when each of its three barycentric weights is either positive, or zero on an edge that owns its boundary under the notes' top-left rule (the gradient <strong>g</strong> of that edge's weight has <em>g<sub>x</sub></em> &gt; 0, or <em>g<sub>x</sub></em> = 0 and <em>g<sub>y</sub></em> &gt; 0). So a sample exactly on a vertex, where two weights are zero, is covered only if both of the edges meeting there own their boundary. A covered sample's depth is the barycentric blend of the three <em>z</em> values; it is written, color and depth, only if it is strictly less than the depth already stored. Skip zero-area triangles; triangles may be in either vertex order and may extend past the image. Return <code>(image, depth)</code>: <code>image[j][i]</code> is a color, and <code>depth[j][i]</code> starts at <code>math.inf</code>.</p>",
   "starter": "import math\n\ndef rasterize(width, height, triangles, background=(0, 0, 0)):\n    pass\n",
   "hint": "<p>Loop only over the triangle's bounding box, clipped to the image. With <em>A</em> = <code>edge(v0, v1, v2)</code>, the weight of <code>v0</code> is <code>edge(v1, v2, p) / A</code>, whose gradient is (−(<em>y</em><sub>2</sub> − <em>y</em><sub>1</sub>), <em>x</em><sub>2</sub> − <em>x</em><sub>1</sub>)/<em>A</em>; compute each edge's \"owns its boundary\" flag once per triangle, before the pixel loop.</p>",
   "solution": "import math\n\ndef _edge(a, b, p):\n    return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])\n\ndef rasterize(width, height, triangles, background=(0, 0, 0)):\n    image = [[background] * width for _ in range(height)]\n    depth = [[math.inf] * width for _ in range(height)]\n    for v0, v1, v2, color in triangles:\n        area = _edge(v0, v1, v2)\n        if area == 0:\n            continue\n        edges = [(v1, v2), (v2, v0), (v0, v1)]\n        owns = []\n        for a, b in edges:\n            gx, gy = -(b[1] - a[1]) / area, (b[0] - a[0]) / area\n            owns.append(gx > 0 or (gx == 0 and gy > 0))\n        xs = [v0[0], v1[0], v2[0]]\n        ys = [v0[1], v1[1], v2[1]]\n        x_lo = max(0, math.floor(min(xs)))\n        x_hi = min(width - 1, math.ceil(max(xs)))\n        y_lo = max(0, math.floor(min(ys)))\n        y_hi = min(height - 1, math.ceil(max(ys)))\n        for j in range(y_lo, y_hi + 1):\n            for i in range(x_lo, x_hi + 1):\n                p = (i + 0.5, j + 0.5)\n                ls = [_edge(a, b, p) / area for a, b in edges]\n                if all(l > 0 or (l == 0 and o) for l, o in zip(ls, owns)):\n                    z = ls[0] * v0[2] + ls[1] * v1[2] + ls[2] * v2[2]\n                    if z < depth[j][i]:\n                        depth[j][i] = z\n                        image[j][i] = color\n    return image, depth\n",
   "tests": [
    {
     "label": "One triangle: pixel count",
     "type": "assert",
     "code": "R = (255, 0, 0)\nimg, dep = rasterize(16, 16, [((0, 0, 1), (16, 0, 1), (0, 16, 1), R)])\nn = sum(row.count(R) for row in img)\nassert n == 120, n\nassert img[0][0] == R and img[15][15] == (0, 0, 0)\n"
    },
    {
     "label": "A square from two triangles: every pixel exactly once",
     "type": "assert",
     "code": "A, B = (255, 0, 0), (0, 0, 255)\nt1 = ((0, 0, 1), (16, 0, 1), (0, 16, 1), A)\nt2 = ((16, 0, 1), (16, 16, 1), (0, 16, 1), B)\nn1 = sum(row.count(A) for row in rasterize(16, 16, [t1])[0])\nn2 = sum(row.count(B) for row in rasterize(16, 16, [t2])[0])\nassert n1 + n2 == 256, (n1, n2)\nimg, _ = rasterize(16, 16, [t1, t2])\nassert sum(row.count(A) + row.count(B) for row in img) == 256\n"
    },
    {
     "label": "Shared edges in a fan are drawn once",
     "type": "assert",
     "code": "c = (12.0, 12.0, 0)\nring = [(2, 2), (22, 3), (21, 20), (5, 22), (1, 11)]\ntris = [((ring[k][0], ring[k][1], 0), (ring[(k + 1) % 5][0], ring[(k + 1) % 5][1], 0), c, (k + 1, 0, 0)) for k in range(5)]\ntotal = sum(sum(1 for row in rasterize(24, 24, [t])[0] for px in row if px != (0, 0, 0)) for t in tris)\nimg, _ = rasterize(24, 24, tris)\nunion = sum(1 for row in img for px in row if px != (0, 0, 0))\nassert total == union, (total, union)\n"
    },
    {
     "label": "A sample on a vertex needs both of its edges to own it",
     "type": "assert",
     "code": "C = (1, 2, 3)\nfor tri in [((2.5, 2.5, 0), (10.5, 2.5, 0), (2.5, 10.5, 0), C), ((2.5, 10.5, 0), (10.5, 2.5, 0), (2.5, 2.5, 0), C)]:\n    img, _ = rasterize(12, 12, [tri])\n    assert img[2][2] == C, \"top-left vertex: top edge and left edge both own it\"\n    assert img[2][10] == (0, 0, 0), \"top-right vertex: the slanted edge doesn't own it\"\n    assert img[10][2] == (0, 0, 0), \"bottom-left vertex: the slanted edge doesn't own it\"\n"
    },
    {
     "label": "Either vertex order, and clipping",
     "type": "assert",
     "code": "G = (0, 255, 0)\na, _ = rasterize(20, 20, [((-5, 2.3, 0), (30, 7.1, 0), (9.2, 25, 0), G)])\nb, _ = rasterize(20, 20, [((9.2, 25, 0), (30, 7.1, 0), (-5, 2.3, 0), G)])\nassert a == b\nn = sum(row.count(G) for row in a)\nassert n == 273, n\n"
    },
    {
     "label": "The z-buffer keeps the nearer triangle",
     "type": "assert",
     "code": "import math\nR, B = (255, 0, 0), (0, 0, 255)\nfar = ((0, 0, 0.8), (32, 0, 0.8), (0, 32, 0.8), R)\nnear = ((4, 4, 0.2), (30, 6, 0.2), (8, 28, 0.6), B)\nfor order in ([far, near], [near, far]):\n    img, dep = rasterize(32, 32, order)\n    assert sum(row.count(B) for row in img) == 296, sum(row.count(B) for row in img)\n    assert sum(row.count(R) for row in img) == 279, sum(row.count(R) for row in img)\n    assert img[10][10] == B and math.isclose(dep[10][10], 0.3012987, rel_tol=1e-6), dep[10][10]\n    assert img[1][1] == R and math.isclose(dep[1][1], 0.8)\n    assert dep[31][31] == math.inf\n"
    },
    {
     "label": "Intersecting triangles",
     "type": "assert",
     "code": "R, B = (255, 0, 0), (0, 0, 255)\nt1 = ((0, 0, 0.0), (32, 0, 1.0), (0, 32, 0.0), R)\nt2 = ((0, 0, 1.0), (32, 0, 0.0), (0, 32, 1.0), B)\nimg, dep = rasterize(32, 32, [t1, t2])\nassert sum(row.count(R) for row in img) == 376 and sum(row.count(B) for row in img) == 120\n",
     "hidden": true
    },
    {
     "label": "Degenerate triangles are skipped",
     "type": "assert",
     "code": "img, dep = rasterize(8, 8, [((0, 0, 0), (4, 4, 0), (8, 8, 0), (9, 9, 9))])\nassert all(px == (0, 0, 0) for row in img for px in row)\n"
    }
   ]
  }
 ],
 "gr5": [
  {
   "id": "blinnphong",
   "title": "Lambert and Blinn–Phong shading",
   "prompt": "<p>Vectors are 3-tuples. Write <code>lambert(n, l)</code> = max(0, <strong>n̂</strong> · <strong>l̂</strong>) (normalize both first). Then write <code>shade(p, n, eye, light, light_color, kd, ks, shininess, ambient)</code> returning the linear RGB color at surface point <code>p</code> with normal <code>n</code>, seen from <code>eye</code> and lit by a point light at <code>light</code>. With <strong>l</strong> = normalize(light − p), <strong>v</strong> = normalize(eye − p), <strong>n</strong> normalized and <strong>h</strong> = normalize(<strong>l</strong> + <strong>v</strong>), each channel <em>c</em> is</p>\n<p class=\"math\">ambient · kd<sub>c</sub> + light_color<sub>c</sub> · (kd<sub>c</sub> · max(0, <strong>n</strong>·<strong>l</strong>) + ks · spec)</p>\n<p>where spec = max(0, <strong>n</strong>·<strong>h</strong>)<sup>shininess</sup> if <strong>n</strong>·<strong>l</strong> &gt; 0 and 0 otherwise. <code>kd</code> and <code>light_color</code> are RGB tuples; <code>ks</code>, <code>shininess</code> and <code>ambient</code> are numbers. Don't clamp. (There is no falloff with distance in this model.)</p>",
   "starter": "import math\n\ndef lambert(n, l):\n    pass\n\ndef shade(p, n, eye, light, light_color, kd, ks, shininess, ambient):\n    pass\n",
   "hint": "<p>Write <code>sub</code>, <code>dot</code> and <code>normalize</code> helpers first. If <strong>l</strong> + <strong>v</strong> is the zero vector (light exactly opposite the viewer) the surface faces away from one of them; you may treat spec as 0 then.</p>",
   "solution": "import math\n\ndef _sub(a, b):\n    return tuple(x - y for x, y in zip(a, b))\n\ndef _dot(a, b):\n    return sum(x * y for x, y in zip(a, b))\n\ndef _norm(a):\n    n = math.sqrt(_dot(a, a))\n    return tuple(x / n for x in a)\n\ndef lambert(n, l):\n    return max(0.0, _dot(_norm(n), _norm(l)))\n\ndef shade(p, n, eye, light, light_color, kd, ks, shininess, ambient):\n    n = _norm(n)\n    l = _norm(_sub(light, p))\n    v = _norm(_sub(eye, p))\n    ndl = _dot(n, l)\n    diff = max(0.0, ndl)\n    spec = 0.0\n    hv = tuple(a + b for a, b in zip(l, v))\n    if ndl > 0 and _dot(hv, hv) > 0:\n        spec = max(0.0, _dot(n, _norm(hv))) ** shininess\n    return tuple(ambient * k + lc * (k * diff + ks * spec) for k, lc in zip(kd, light_color))\n",
   "tests": [
    {
     "label": "Lambert's cosine",
     "type": "assert",
     "code": "import math\nassert math.isclose(lambert((0, 0, 1), (0, 0, 5)), 1.0)\nassert math.isclose(lambert((0, 0, 2), (0, 1, 1)), math.sqrt(0.5))\nassert lambert((0, 0, 1), (0, 0, -1)) == 0\n"
    },
    {
     "label": "The notes' example",
     "type": "assert",
     "code": "import math\nc = shade((0, 0, 0), (0, 0, 1), (0, 0, 5), (3, 0, 4), (1, 1, 1), (0.8, 0.2, 0.2), 0.5, 32, 0.1)\nwant = (0.8127, 0.2727, 0.2727)\nassert all(math.isclose(x, y, abs_tol=1e-4) for x, y in zip(c, want)), c\n"
    },
    {
     "label": "Mirror direction: the highlight's peak",
     "type": "assert",
     "code": "import math\nc = shade((0, 0, 0), (0, 1, 0), (-1, 1, 0), (1, 1, 0), (1, 1, 1), (0.5, 0.5, 0.5), 1.0, 50, 0.0)\nwant = 0.5 * math.sqrt(0.5) + 1.0\nassert all(math.isclose(x, want) for x in c), c\n"
    },
    {
     "label": "Light behind the surface: ambient only",
     "type": "assert",
     "code": "import math\nc = shade((0, 0, 0), (0, 0, 1), (0, 0, 5), (0, 1, -3), (1, 1, 1), (0.6, 0.4, 0.2), 0.9, 10, 0.25)\nassert all(math.isclose(x, y) for x, y in zip(c, (0.15, 0.1, 0.05))), c\n"
    },
    {
     "label": "Colored light, unnormalized normal",
     "type": "assert",
     "code": "import math\nc = shade((1, 2, 3), (0, 3, 0), (1, 10, 9), (5, 6, 3), (1.0, 0.5, 0.0), (0.2, 0.9, 0.4), 0.3, 8, 0.05)\nwant = (0.2344706, 0.4047226, 0.02)\nassert all(math.isclose(x, y, abs_tol=1e-6) for x, y in zip(c, want)), c\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "texture",
   "title": "Texture sampling: nearest and bilinear",
   "prompt": "<p>A texture is a list of rows of texels, each a tuple of linear floats; <code>tex[row][col]</code>, with <em>W</em> columns and <em>H</em> rows. Texture coordinates (<em>u</em>, <em>v</em>) run from 0 to 1 across the texture, <em>u</em> to the right and <em>v</em> downward, so texel (col, row) covers <em>u</em> from col/<em>W</em> to (col + 1)/<em>W</em>. Write <code>sample_nearest(tex, u, v)</code>, returning the texel containing (<em>u</em>, <em>v</em>), and <code>sample_bilinear(tex, u, v)</code>, which blends the four texels whose centres surround (<em>u</em>, <em>v</em>) as in the notes. Both clamp to the edge: column and row indices outside the texture are clamped to the nearest valid index. Return tuples.</p>",
   "starter": "import math\n\ndef sample_nearest(tex, u, v):\n    pass\n\ndef sample_bilinear(tex, u, v):\n    pass\n",
   "hint": "<p>For bilinear, move to texel-centre coordinates: <em>x</em> = <em>u</em>·<em>W</em> − 0.5, <em>y</em> = <em>v</em>·<em>H</em> − 0.5. The four texels are at columns ⌊<em>x</em>⌋ and ⌊<em>x</em>⌋ + 1 and rows ⌊<em>y</em>⌋ and ⌊<em>y</em>⌋ + 1 (clamped), with weights from the fractional parts <em>x</em> − ⌊<em>x</em>⌋ and <em>y</em> − ⌊<em>y</em>⌋.</p>",
   "solution": "import math\n\ndef _texel(tex, col, row):\n    h, w = len(tex), len(tex[0])\n    return tex[min(h - 1, max(0, row))][min(w - 1, max(0, col))]\n\ndef sample_nearest(tex, u, v):\n    h, w = len(tex), len(tex[0])\n    return tuple(_texel(tex, math.floor(u * w), math.floor(v * h)))\n\ndef sample_bilinear(tex, u, v):\n    h, w = len(tex), len(tex[0])\n    x, y = u * w - 0.5, v * h - 0.5\n    x0, y0 = math.floor(x), math.floor(y)\n    fx, fy = x - x0, y - y0\n    t00, t10 = _texel(tex, x0, y0), _texel(tex, x0 + 1, y0)\n    t01, t11 = _texel(tex, x0, y0 + 1), _texel(tex, x0 + 1, y0 + 1)\n    return tuple((1 - fx) * (1 - fy) * a + fx * (1 - fy) * b + (1 - fx) * fy * c + fx * fy * d\n                 for a, b, c, d in zip(t00, t10, t01, t11))\n",
   "tests": [
    {
     "label": "Nearest texel",
     "type": "assert",
     "code": "tex = [[(0.0,), (1.0,)], [(2.0,), (3.0,)]]\nassert sample_nearest(tex, 0.1, 0.1) == (0.0,)\nassert sample_nearest(tex, 0.9, 0.2) == (1.0,)\nassert sample_nearest(tex, 0.3, 0.7) == (2.0,)\nassert sample_nearest(tex, 1.0, 1.0) == (3.0,), \"u = 1 clamps to the last column\"\n"
    },
    {
     "label": "Bilinear: the notes' example",
     "type": "assert",
     "code": "import math\ntex = [[(0.0,), (1.0,)], [(2.0,), (3.0,)]]\nassert math.isclose(sample_bilinear(tex, 0.5, 0.5)[0], 1.5)\nassert math.isclose(sample_bilinear(tex, 0.6, 0.4)[0], 1.3), sample_bilinear(tex, 0.6, 0.4)\n"
    },
    {
     "label": "At texel centres bilinear equals nearest",
     "type": "assert",
     "code": "import math\ntex = [[(float(r * 10 + c), float(c)) for c in range(5)] for r in range(3)]\nfor r in range(3):\n    for c in range(5):\n        u, v = (c + 0.5) / 5, (r + 0.5) / 3\n        b = sample_bilinear(tex, u, v)\n        assert all(math.isclose(x, y) for x, y in zip(b, tex[r][c])), (r, c, b)\n"
    },
    {
     "label": "Clamping at the edges",
     "type": "assert",
     "code": "import math\ntex = [[(0.0, 0.0, 0.0), (1.0, 1.0, 1.0)]]\nassert sample_bilinear(tex, 0.0, 0.5) == (0.0, 0.0, 0.0)\nassert sample_bilinear(tex, 1.0, 0.5) == (1.0, 1.0, 1.0)\nassert sample_nearest(tex, -0.5, 3.0) == (0.0, 0.0, 0.0)\nassert all(math.isclose(x, 0.5) for x in sample_bilinear(tex, 0.5, 0.9))\n"
    },
    {
     "label": "A 4 × 4 gradient",
     "type": "assert",
     "code": "import math\ntex = [[(c / 3, r / 3, 0.5) for c in range(4)] for r in range(4)]\nb = sample_bilinear(tex, 0.3, 0.8)\nassert all(math.isclose(x, y) for x, y in zip(b, (0.7 / 3, 0.9, 0.5))), b\n",
     "hidden": true
    }
   ]
  }
 ],
 "gr6": [
  {
   "id": "intersect",
   "title": "Ray–sphere and ray–plane intersection",
   "prompt": "<p>A ray is an origin <strong>o</strong> and a direction <strong>d</strong> (not necessarily unit length), the points <strong>o</strong> + <em>t</em><strong>d</strong>. Write <code>hit_sphere(o, d, center, radius)</code> and <code>hit_plane(o, d, point, normal)</code>, each returning the smallest <em>t</em> greater than <code>EPS = 1e-6</code> at which the ray meets the surface, or <code>None</code>. A ray parallel to the plane misses it. Also write <code>reflect(d, n)</code> = <strong>d</strong> − 2(<strong>d</strong>·<strong>n</strong>)<strong>n</strong> for a unit normal <strong>n</strong>.</p>",
   "starter": "import math\n\nEPS = 1e-6\n\ndef hit_sphere(o, d, center, radius):\n    pass\n\ndef hit_plane(o, d, point, normal):\n    pass\n\ndef reflect(d, n):\n    pass\n",
   "hint": "<p>For the sphere, solve <em>at</em>² + <em>bt</em> + <em>c</em> = 0 with <em>a</em> = <strong>d</strong>·<strong>d</strong>, <em>b</em> = 2<strong>d</strong>·(<strong>o</strong> − <strong>c</strong>), <em>c</em> = |<strong>o</strong> − <strong>c</strong>|² − <em>r</em>². Try the smaller root first; if it isn't greater than <code>EPS</code>, try the larger one (the origin may be inside the sphere).</p>",
   "solution": "import math\n\nEPS = 1e-6\n\ndef _dot(a, b):\n    return sum(x * y for x, y in zip(a, b))\n\ndef hit_sphere(o, d, center, radius):\n    oc = tuple(x - y for x, y in zip(o, center))\n    a = _dot(d, d)\n    b = 2 * _dot(d, oc)\n    c = _dot(oc, oc) - radius * radius\n    disc = b * b - 4 * a * c\n    if disc < 0:\n        return None\n    s = math.sqrt(disc)\n    for t in ((-b - s) / (2 * a), (-b + s) / (2 * a)):\n        if t > EPS:\n            return t\n    return None\n\ndef hit_plane(o, d, point, normal):\n    denom = _dot(normal, d)\n    if abs(denom) < 1e-12:\n        return None\n    t = _dot(normal, tuple(p - q for p, q in zip(point, o))) / denom\n    return t if t > EPS else None\n\ndef reflect(d, n):\n    k = 2 * _dot(d, n)\n    return tuple(x - k * y for x, y in zip(d, n))\n",
   "tests": [
    {
     "label": "Straight at a sphere",
     "type": "assert",
     "code": "import math\nassert math.isclose(hit_sphere((0, 0, 0), (0, 0, -1), (0, 0, -5), 1), 4)\n"
    },
    {
     "label": "The notes' example",
     "type": "assert",
     "code": "import math\nt = hit_sphere((0, 0, 0), (0.6, 0, -0.8), (0, 0, -5), 4)\nassert math.isclose(t, 4 - math.sqrt(7)), t\n"
    },
    {
     "label": "Unnormalized direction",
     "type": "assert",
     "code": "import math\nassert math.isclose(hit_sphere((0, 0, 0), (0, 0, -2), (0, 0, -5), 1), 2)\n"
    },
    {
     "label": "Misses and spheres behind",
     "type": "assert",
     "code": "assert hit_sphere((0, 0, 0), (0, 1, 0), (0, 0, -5), 1) is None\nassert hit_sphere((0, 0, 0), (0, 0, 1), (0, 0, -5), 1) is None\n"
    },
    {
     "label": "From inside the sphere",
     "type": "assert",
     "code": "import math\nassert math.isclose(hit_sphere((0, 0, -5), (0, 0, -1), (0, 0, -5), 2), 2)\n"
    },
    {
     "label": "Tangent ray",
     "type": "assert",
     "code": "import math\nassert math.isclose(hit_sphere((0, 1, 0), (0, 0, -1), (0, 0, -5), 1), 5)\n"
    },
    {
     "label": "Planes",
     "type": "assert",
     "code": "import math\nassert math.isclose(hit_plane((0, 1, 0), (0, -1, -1), (0, -1, 0), (0, 1, 0)), 2)\nassert hit_plane((0, 1, 0), (1, 0, 0), (0, -1, 0), (0, 1, 0)) is None, \"parallel\"\nassert hit_plane((0, 1, 0), (0, 1, 0), (0, -1, 0), (0, 1, 0)) is None, \"pointing away\"\nassert math.isclose(hit_plane((0, -3, 0), (0, 1, 0), (0, -1, 0), (0, 1, 0)), 2), \"from below\"\n"
    },
    {
     "label": "Reflection",
     "type": "assert",
     "code": "r = reflect((1, -1, 0), (0, 1, 0))\nassert r == (1, 1, 0), r\n"
    }
   ]
  },
  {
   "id": "raytracer",
   "title": "A tiny ray tracer",
   "prompt": "<p>Write <code>render(scene, width, height)</code> returning an image (list of rows of sRGB tuples) by following these rules exactly.</p>\n<ul>\n<li><b>Camera:</b> at the origin, looking down −<em>z</em>, <em>y</em> up. With <em>s</em> = tan(fov/2), where fov = <code>scene[\"fov\"]</code> in degrees, the ray through pixel (<em>i</em>, <em>j</em>) has direction normalize(<em>x</em>, <em>y</em>, −1), with <em>x</em> = (2(<em>i</em> + 0.5)/width − 1)·<em>s</em>·width/height and <em>y</em> = (1 − 2(<em>j</em> + 0.5)/height)·<em>s</em>.</li>\n<li><b>Objects</b> in <code>scene[\"objects\"]</code>: <code>(\"sphere\", center, radius, color, refl)</code> or <code>(\"plane\", point, normal, color, refl)</code>; <code>color</code> is linear RGB 0–1 and <code>refl</code> the reflectivity, 0–1. Use your <code>hit_sphere</code> and <code>hit_plane</code> (EPS = 1e-6); the nearest hit wins.</li>\n<li><b>No hit:</b> the color is <code>scene[\"background\"]</code>.</li>\n<li><b>Normal:</b> for a sphere (<strong>P</strong> − center)/radius; for a plane, its normalized normal. If <strong>N</strong> · <strong>d</strong> &gt; 0, flip <strong>N</strong>.</li>\n<li><b>Local color:</b> color × (ambient + diffuse), where ambient = <code>scene[\"ambient\"]</code>, and diffuse = <code>scene[\"light_power\"]</code> × max(0, <strong>N</strong> · <strong>L</strong>) with <strong>L</strong> the unit vector toward <code>scene[\"light\"]</code>, or 0 if the point is in shadow: a ray from <strong>P</strong> + 10<sup>−4</sup><strong>N</strong> in direction <strong>L</strong> hits any object at a distance less than the light's.</li>\n<li><b>Reflection:</b> if refl &gt; 0 and depth &lt; <code>scene[\"max_depth\"]</code>, trace a ray from <strong>P</strong> + 10<sup>−4</sup><strong>N</strong> in direction reflect(<strong>d</strong>, <strong>N</strong>) with depth + 1, and return (1 − refl)·local + refl·reflected. Primary rays have depth 0.</li>\n<li><b>Output:</b> each channel through <code>to_srgb</code> from Lesson 1 (clamp, encode, round with <code>int(e * 255 + 0.5)</code>).</li>\n</ul>",
   "starter": "import math\n\nEPS = 1e-6\n\ndef hit_sphere(o, d, center, radius):\n    pass\n\ndef hit_plane(o, d, point, normal):\n    pass\n\ndef to_srgb(x):\n    pass\n\ndef render(scene, width, height):\n    pass\n",
   "hint": "<p>Write <code>nearest_hit(o, d)</code> returning (<em>t</em>, object) or <code>None</code>, then a recursive <code>trace(o, d, depth)</code> returning a linear color; <code>render</code> calls <code>trace</code> once per pixel. Normalize the primary ray's direction: the shadow test compares a <em>t</em> along a unit vector with the light's distance.</p>",
   "solution": "import math\n\nEPS = 1e-6\n\ndef _add(a, b): return tuple(x + y for x, y in zip(a, b))\ndef _sub(a, b): return tuple(x - y for x, y in zip(a, b))\ndef _mul(a, k): return tuple(x * k for x in a)\ndef _dot(a, b): return sum(x * y for x, y in zip(a, b))\ndef _norm(a): return _mul(a, 1 / math.sqrt(_dot(a, a)))\n\ndef hit_sphere(o, d, center, radius):\n    oc = _sub(o, center)\n    a, b, c = _dot(d, d), 2 * _dot(d, oc), _dot(oc, oc) - radius * radius\n    disc = b * b - 4 * a * c\n    if disc < 0:\n        return None\n    s = math.sqrt(disc)\n    for t in ((-b - s) / (2 * a), (-b + s) / (2 * a)):\n        if t > EPS:\n            return t\n    return None\n\ndef hit_plane(o, d, point, normal):\n    denom = _dot(normal, d)\n    if abs(denom) < 1e-12:\n        return None\n    t = _dot(normal, _sub(point, o)) / denom\n    return t if t > EPS else None\n\ndef to_srgb(x):\n    x = min(1.0, max(0.0, x))\n    e = 12.92 * x if x <= 0.0031308 else 1.055 * x ** (1 / 2.4) - 0.055\n    return int(e * 255 + 0.5)\n\ndef _nearest(scene, o, d):\n    best = None\n    for obj in scene[\"objects\"]:\n        t = (hit_sphere if obj[0] == \"sphere\" else hit_plane)(o, d, obj[1], obj[2])\n        if t is not None and (best is None or t < best[0]):\n            best = (t, obj)\n    return best\n\ndef _trace(scene, o, d, depth):\n    h = _nearest(scene, o, d)\n    if h is None:\n        return tuple(scene[\"background\"])\n    t, obj = h\n    kind, a, b, color, refl = obj\n    P = _add(o, _mul(d, t))\n    N = _mul(_sub(P, a), 1 / b) if kind == \"sphere\" else _norm(b)\n    if _dot(N, d) > 0:\n        N = _mul(N, -1)\n    to_light = _sub(scene[\"light\"], P)\n    dist = math.sqrt(_dot(to_light, to_light))\n    L = _mul(to_light, 1 / dist)\n    start = _add(P, _mul(N, 1e-4))\n    s = _nearest(scene, start, L)\n    diffuse = 0.0 if (s is not None and s[0] < dist) else scene[\"light_power\"] * max(0.0, _dot(N, L))\n    local = _mul(color, scene[\"ambient\"] + diffuse)\n    if refl > 0 and depth < scene[\"max_depth\"]:\n        k = 2 * _dot(d, N)\n        r = _sub(d, _mul(N, k))\n        rc = _trace(scene, start, r, depth + 1)\n        return tuple((1 - refl) * x + refl * y for x, y in zip(local, rc))\n    return local\n\ndef render(scene, width, height):\n    s = math.tan(math.radians(scene[\"fov\"]) / 2)\n    img = []\n    for j in range(height):\n        row = []\n        for i in range(width):\n            x = (2 * (i + 0.5) / width - 1) * s * width / height\n            y = (1 - 2 * (j + 0.5) / height) * s\n            c = _trace(scene, (0, 0, 0), _norm((x, y, -1)), 0)\n            row.append(tuple(to_srgb(v) for v in c))\n        img.append(row)\n    return img\n",
   "tests": [
    {
     "label": "One sphere: background, centre and edge",
     "type": "assert",
     "code": "scene = {\"fov\": 60, \"background\": (0.0, 0.0, 0.0), \"ambient\": 0.1, \"light\": (0, 0, 0),\n         \"light_power\": 0.9, \"max_depth\": 0,\n         \"objects\": [(\"sphere\", (0, 0, -3), 1.0, (1.0, 0.5, 0.25), 0.0)]}\nimg = render(scene, 16, 16)\nassert len(img) == 16 and len(img[0]) == 16\nassert img[0][0] == (0, 0, 0), img[0][0]\nc = img[8][8]\nassert all(abs(x - y) <= 1 for x, y in zip(c, (254, 187, 136))), c\nassert sum(1 for row in img for px in row if px != (0, 0, 0)) == 76\n"
    },
    {
     "label": "Shadow on the floor",
     "type": "assert",
     "code": "scene = {\"fov\": 60, \"background\": (0.2, 0.3, 0.5), \"ambient\": 0.1, \"light\": (0, 5, -3),\n         \"light_power\": 1.0, \"max_depth\": 0,\n         \"objects\": [(\"sphere\", (0, 0, -3), 0.7, (0.9, 0.1, 0.1), 0.0),\n                     (\"plane\", (0, -1, 0), (0, 1, 0), (0.8, 0.8, 0.8), 0.0)]}\nimg = render(scene, 32, 24)\ndef near(a, b): return all(abs(x - y) <= 1 for x, y in zip(a, b))\nassert near(img[0][0], (124, 149, 188)), img[0][0]\nassert near(img[19][16], (80, 80, 80)), (\"in shadow\", img[19][16])\nassert near(img[23][1], (237, 237, 237)), (\"lit floor\", img[23][1])\nassert near(img[8][16], (191, 68, 68)), (\"top of the sphere\", img[8][16])\n"
    },
    {
     "label": "A mirror sphere reflects the floor",
     "type": "assert",
     "code": "scene = {\"fov\": 50, \"background\": (0.0, 0.0, 0.0), \"ambient\": 0.2, \"light\": (5, 10, 0),\n         \"light_power\": 0.8, \"max_depth\": 2,\n         \"objects\": [(\"sphere\", (0, 0, -4), 1.0, (1.0, 1.0, 1.0), 0.8),\n                     (\"plane\", (0, -1, 0), (0, 1, 0), (0.1, 0.8, 0.1), 0.0)]}\nimg = render(scene, 24, 24)\ndef near(a, b): return all(abs(x - y) <= 1 for x, y in zip(a, b))\nassert near(img[14][12], (96, 208, 96)), (\"lower half reflects the green floor\", img[14][12])\nassert near(img[8][12], (105, 105, 105)), (\"upper half reflects the black sky\", img[8][12])\nassert near(img[1][1], (0, 0, 0)), img[1][1]\n"
    },
    {
     "label": "Reflection depth limit",
     "type": "assert",
     "code": "scene = {\"fov\": 50, \"background\": (0.0, 0.0, 0.0), \"ambient\": 0.2, \"light\": (5, 10, 0),\n         \"light_power\": 0.8, \"max_depth\": 0,\n         \"objects\": [(\"sphere\", (0, 0, -4), 1.0, (1.0, 1.0, 1.0), 0.8),\n                     (\"plane\", (0, -1, 0), (0, 1, 0), (0.1, 0.8, 0.1), 0.0)]}\nimg = render(scene, 24, 24)\nassert all(abs(x - y) <= 1 for x, y in zip(img[14][12], (126, 126, 126))), img[14][12]\n",
     "hidden": true
    }
   ]
  }
 ]
});
