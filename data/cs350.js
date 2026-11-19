CSA.addCourse({
  id: "cs350",
  code: "CS 350",
  title: "Computer Graphics",
  credits: 4,
  kind: "optional",
  term: "y3f",
  summary: "How a computer turns a description of a scene into the color of every pixel. Starting from images, color and drawing lines, the course builds the two great rendering methods from first principles in pure Python: rasterization (transformations, cameras and projection, triangle filling with a z-buffer, shading and textures), the method inside every GPU, and ray tracing, the method behind film. Every graded program is checked by its pixel values. The term's track elective.",
  prereqs: ["MATH 220 Linear Algebra", "CS 201 Data Structures", "MATH 131 Calculus II and Multivariable Calculus"],
  outcomes: [
    "Represent images as arrays of pixels, convert between sRGB and linear light, composite with alpha, and draw lines with integer arithmetic",
    "Build 2D and 3D transformations as matrices in homogeneous coordinates, compose them in the right order, and transform normals correctly",
    "Set up a camera with look-at, and carry a world point through perspective or orthographic projection to pixel coordinates",
    "Rasterize triangles with edge functions, barycentric interpolation, a consistent fill rule and a z-buffer",
    "Shade surfaces with ambient, Lambertian and Blinn–Phong terms, sample textures with nearest and bilinear filtering, and reduce aliasing by supersampling",
    "Write a recursive ray tracer with shadows and reflections, and explain how GPUs, real-time ray tracing and the rendering equation fit together"
  ],
  rubric: {
    criteriaFor: "programming assignments, the rendering project and exams",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Programming assignments", weight: 30, desc: "The lessons' auto-graded problems, plus a short written answer for each lesson explaining one result: why a test value is what it is, worked by hand." },
      { name: "Rendering project", weight: 25, desc: "Extend your Lesson 4 rasterizer or your Lesson 6 ray tracer with one substantial feature (texture-mapped meshes loaded from a file, soft shadows, refraction, anti-aliasing, or a bounding volume hierarchy), with tests on pixel values and a two-page report with images." },
      { name: "Midterm exam", weight: 15, desc: "Images, transformations and projection (lessons 1–3), worked by hand." },
      { name: "Final exam", weight: 20, desc: "Cumulative, with emphasis on rasterization, shading and ray tracing (lessons 4–6)." }
    ],
    criteria: [
      { name: "Mathematics", desc: "Is the geometry right?", levels: [
        "Correct transforms, coordinate systems and formulas, with conventions (handedness, y direction, row or column vectors) stated.",
        "Correct approach with a small slip, such as a sign or the order of two matrices.",
        "A wrong coordinate system or formula that changes the picture.",
        "Incorrect or missing." ] },
      { name: "Implementation", desc: "Does the code compute the right pixels?", levels: [
        "Correct, readable code; colors handled in linear light; edge cases (degenerate triangles, rays that miss, points behind the camera) handled.",
        "Works for the main cases, with a gap in edge cases.",
        "Runs but produces wrong pixels in ordinary cases.",
        "Doesn't run." ] },
      { name: "Verification", desc: "How do you know it's right?", levels: [
        "Tests on exact pixel values, counts and coordinates, including a case worked by hand and an invariant (such as every pixel of a shared edge drawn exactly once).",
        "Good tests of the main behavior, with gaps.",
        "Checked only by looking at the picture.",
        "No checking." ] },
      { name: "Explanation", desc: "Can you say why it works?", levels: [
        "Explains each step and its cost, connects it to the linear algebra, and points out what would go wrong otherwise.",
        "Mostly clear, with some steps asserted rather than explained.",
        "Describes what the code does but not why.",
        "No explanation." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Collaboration:</b> discuss ideas and debug together; write your own code and reports, and list who you worked with.",
      "<b>AI assistants:</b> allowed for explanations and debugging. You must be able to explain every line of your project, and your report must say how an assistant was used.",
      "<b>Libraries:</b> assignments use only Python's standard library, so that you write every step yourself. The project may use NumPy for speed once the pure-Python version passes its tests.",
      "<b>Late work:</b> four late days in total for the programming assignments; the project deadline is fixed."
    ]
  }
});

CSA.addUnits("cs350", [
  {
    id: "gr1",
    title: "Images and color",
    minutes: 90,
    summary: "Pixels and raster images, RGB color and color depth, the PPM file format, gamma and the sRGB encoding (and why averaging stored color values is wrong), alpha compositing with the over operator, and Bresenham's integer-only line algorithm.",
    notes: `
<p>Every picture on a screen is a grid of colored dots. Computer graphics is the craft of computing those dots: starting from a description of a scene (shapes, lights, materials, a camera), work out the color of each one. This course builds the two main ways of doing that from scratch. <strong>Rasterization</strong> (Lessons 2–5) takes each shape and finds the pixels it covers; it is what every graphics card and game does. <strong>Ray tracing</strong> (Lesson 6) takes each pixel and finds what it sees; it is how films are rendered. Everything is plain Python on small images, so every result can be checked pixel by pixel.</p>

<h3>Pixels and raster images</h3>
<p>A <strong>raster image</strong> is a rectangular grid of <strong>pixels</strong> ("picture elements"), each holding one color. An image <em>W</em> pixels wide and <em>H</em> high has <em>W</em> × <em>H</em> pixels. We name a pixel by (<em>x</em>, <em>y</em>): <em>x</em> is the column, counted from 0 at the left, and <em>y</em> is the row, counted from 0 at the <em>top</em>. So <em>y</em> points down, as in a page of text and as in memory, where images are stored row by row (row-major order, as in CS 210 Lesson 7). When we need a pixel's position as a point, pixel (<em>x</em>, <em>y</em>) is the unit square from <em>x</em> to <em>x</em> + 1 and <em>y</em> to <em>y</em> + 1, with its centre at (<em>x</em> + 0.5, <em>y</em> + 0.5).</p>
<p>In Python we store an image as a list of rows, each a list of colors, so the pixel at (<em>x</em>, <em>y</em>) is <code>img[y][x]</code>: row first.</p>
<pre><code>def blank(width, height, color=(0, 0, 0)):
    return [[color] * width for _ in range(height)]

img = blank(4, 3)
img[1][2] = (255, 0, 0)        # the pixel at x = 2, y = 1
print(len(img), len(img[0]))   # 3 4</code></pre>
<p>(Each row is built separately by the list comprehension. Writing <code>[[color] * width] * height</code> would make every row the same list object, so changing one pixel would change a whole column.)</p>

<h3>RGB and color depth</h3>
<p>The human eye has three kinds of color-sensitive cells (cones), most sensitive to long, medium and short wavelengths of light. Because of that, a mix of just three <strong>primary</strong> lights, red, green and blue, can match most colors we see. A screen pixel is three tiny lights, and a color is stored as three numbers (<em>r</em>, <em>g</em>, <em>b</em>), each from 0 (off) to 255 (full): (255, 0, 0) is red, (255, 255, 0) yellow (red and green light add), (255, 255, 255) white and (0, 0, 0) black. Each number is a <strong>channel</strong>.</p>
<p>The number of bits per pixel is the <strong>color depth</strong>. With 8 bits per channel, a pixel takes 24 bits and can be any of 2<sup>24</sup> = 16,777,216 colors. A 1920 × 1080 frame then takes 1920 × 1080 × 3 = 6,220,800 bytes, and at 60 frames a second the display reads about 373 MB of pixels every second. High-dynamic-range displays use 10 or more bits per channel.</p>

<h3>The PPM file format</h3>
<p>To look at an image we must write it to a file. The simplest format is <strong>PPM</strong> (portable pixmap), from the Netpbm tools. The text version, called P3, is a header (the letters <code>P3</code>, the width and height, and the maximum value, 255) followed by the channel values of every pixel, row by row from the top, separated by whitespace. A 2 × 2 image with red, green, blue and white pixels is:</p>
<pre data-label="PPM"><code>P3
2 2
255
255 0 0 0 255 0
0 0 255 255 255 255</code></pre>
<p>Many image viewers and editors open PPM files. Write one with <code>open("out.ppm", "w").write(text)</code>. The format stores every number in full, with no compression, so files are large; PNG compresses without losing anything, and JPEG compresses further by discarding detail the eye is unlikely to notice. Lesson 1's second programming problem writes PPM text.</p>

<h3>Gamma: stored values are not amounts of light</h3>
<p>Here is a fact that surprises most programmers: a pixel value of 128 does not give half the light of 255. It gives about 22%. The stored numbers are <em>encoded</em>, and the standard encoding for screens and the web is <strong>sRGB</strong>. To get the <strong>linear</strong> light intensity <em>L</em> (0 to 1, proportional to the physical amount of light) from a stored value <em>v</em>, let <em>c</em> = <em>v</em>/255 and compute</p>
<p class="math"><em>L</em> = <em>c</em>/12.92 if <em>c</em> ≤ 0.04045, otherwise <em>L</em> = ((<em>c</em> + 0.055)/1.055)<sup>2.4</sup></p>
<p>and to encode, run it backwards: <em>e</em> = 12.92<em>L</em> if <em>L</em> ≤ 0.0031308, otherwise <em>e</em> = 1.055<em>L</em><sup>1/2.4</sup> − 0.055, and store 255<em>e</em> rounded. Apart from the short straight segment near black (which avoids an infinitely steep curve at 0), this is close to <em>L</em> = <em>c</em><sup>2.2</sup>. The exponent is traditionally called gamma (<em>γ</em>), so the encoding is often called <strong>gamma encoding</strong>.</p>
<pre><code>def to_linear(v):
    c = v / 255
    return c / 12.92 if c &lt;= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def to_srgb(x):
    x = min(1.0, max(0.0, x))
    e = 12.92 * x if x &lt;= 0.0031308 else 1.055 * x ** (1 / 2.4) - 0.055
    return int(e * 255 + 0.5)

print(round(to_linear(128), 4))   # 0.2159
print(to_srgb(0.5))               # 188</code></pre>
<p>Why encode at all? Our perception of brightness is far from linear: we notice small differences between dark shades much more than between bright ones. With only 256 codes, storing linear light would waste most of them on bright shades we can't tell apart and leave visible bands in the shadows. sRGB spends its codes where the eye is sensitive. In linear storage, the darkest 1% of light would get just 3 codes (0, 1 and 2); in sRGB it gets 26 (0 to 25). Old cathode-ray-tube screens happened to turn voltage into light with a similar power law, which is where the convention began.</p>
<p>The consequence is the most important rule of this lesson. Light adds: two lamps shining on a wall give the sum of their light. So any computation that models light (blending, averaging, shading, resizing an image) must be done on <em>linear</em> values. Decode, compute, encode.</p>
<div class="callout"><p><b>Example.</b> A checkerboard of black and white pixels, seen from far enough away that the squares blur together, sends the eye half of white's light: linear 0.5, which is sRGB 188. Averaging the stored codes instead gives (0 + 255)/2 ≈ 128, which is only 22% of white's light: much too dark. Image-resizing programs that average stored codes make fine bright detail (text, hair, stars) darker when they shrink an image.</p></div>
<pre><code>print(to_srgb((to_linear(0) + to_linear(255)) / 2))   # 188</code></pre>

<h3>Alpha compositing</h3>
<p>To place one image on top of another (a window shadow, a sprite in a game, a subtitle on a video), each pixel of the upper layer carries a fourth number, <strong>alpha</strong> (<em>α</em>), its opacity: 1 is opaque, 0 fully transparent. RGB plus alpha is <strong>RGBA</strong>, 32 bits with 8 per channel. Porter and Duff's <strong>over</strong> operator puts a foreground color <em>F</em> with opacity <em>α</em> over an opaque background <em>B</em>:</p>
<p class="math"><em>C</em> = <em>α F</em> + (1 − <em>α</em>) <em>B</em>&nbsp;&nbsp;&nbsp;(each channel, in linear light)</p>
<p>Example: 60%-opaque orange (255, 128, 0) over (40, 40, 200). Decoding, blending each channel and encoding gives (205, 104, 132). Blending the codes directly gives (169, 93, 80), noticeably darker and muddier, for the same reason as the checkerboard. Many programs nonetheless blend stored codes directly, because it is cheaper and it is what their users are used to; be aware which one your tools do.</p>
<p>Layers stack by applying over repeatedly, from the back to the front. When the background may itself be partly transparent, each layer has its own opacity: <em>α</em><sub>F</sub> for the foreground and <em>α</em><sub>B</sub> for the background. It's then simpler to store <strong>premultiplied alpha</strong>: keep each color already multiplied by its own opacity, <em>F</em><sub>p</sub> = <em>α</em><sub>F</sub> · <em>F</em> and <em>B</em><sub>p</sub> = <em>α</em><sub>B</sub> · <em>B</em> (p for premultiplied). Then over becomes <em>C</em><sub>p</sub> = <em>F</em><sub>p</sub> + (1 − <em>α</em><sub>F</sub>) · <em>B</em><sub>p</sub>, with combined opacity <em>α</em><sub>C</sub> = <em>α</em><sub>F</sub> + (1 − <em>α</em><sub>F</sub>) · <em>α</em><sub>B</sub>. The result is premultiplied too (the displayed color is <em>C</em><sub>p</sub>/<em>α</em><sub>C</sub>), so it can be the background of the next layer and stacking stays a single formula. With an opaque background (<em>α</em><sub>B</sub> = 1, so <em>B</em><sub>p</sub> = <em>B</em>) it is the formula above. Graphics hardware and most compositing software use it.</p>

<h3>Drawing lines: Bresenham's algorithm</h3>
<p>Our first drawing task: light up the pixels on the segment between the centres of two pixels (<em>x</em><sub>0</sub>, <em>y</em><sub>0</sub>) and (<em>x</em><sub>1</sub>, <em>y</em><sub>1</sub>). In this section only, it is simpler to shift coordinates by ½ so that each pixel's centre is at an integer point: the point (<em>x</em>, <em>y</em>) <em>is</em> the centre of pixel (<em>x</em>, <em>y</em>) (the point (<em>x</em> + 0.5, <em>y</em> + 0.5) of the convention above), and pixel (<em>x</em>, <em>y</em>) covers <em>x</em> ± ½, <em>y</em> ± ½. Suppose first that the line is shallow and goes right: <em>dx</em> = <em>x</em><sub>1</sub> − <em>x</em><sub>0</sub> &gt; 0 and 0 ≤ <em>dy</em> = <em>y</em><sub>1</sub> − <em>y</em><sub>0</sub> ≤ <em>dx</em> (the "first octant": slopes from 0 to 1). Then the line should get exactly one pixel per column, the one nearest the true line. The obvious way computes <em>y</em> = <em>y</em><sub>0</sub> + (<em>dy</em>/<em>dx</em>)(<em>x</em> − <em>x</em><sub>0</sub>) and rounds it, which needs a division, a multiplication and a rounding per pixel, and floating-point error (CS 210 Lesson 2). Bresenham's algorithm uses only integer additions and one comparison per pixel, and is exact.</p>
<p>Suppose we have just drawn (<em>x</em>, <em>y</em>). The next pixel is either (<em>x</em> + 1, <em>y</em>) or (<em>x</em> + 1, <em>y</em> + 1), whichever is nearer the line, and that depends on which side of the line the <strong>midpoint</strong> <em>M</em> = (<em>x</em> + 1, <em>y</em> + ½) between their centres lies (<em>M</em> is on the border between the two pixels). To decide, use the line's implicit form</p>
<p class="math"><em>F</em>(<em>x</em>, <em>y</em>) = <em>dy</em>(<em>x</em> − <em>x</em><sub>0</sub>) − <em>dx</em>(<em>y</em> − <em>y</em><sub>0</sub>)</p>
<p><em>F</em> is 0 exactly on the line. Increasing <em>y</em> decreases <em>F</em> (because <em>dx</em> &gt; 0), so <em>F</em>(<em>M</em>) &gt; 0 means the midpoint's <em>y</em> is smaller than the line's: the line passes beyond the midpoint, nearer to row <em>y</em> + 1, and we step to <em>y</em> + 1. Otherwise we stay at row <em>y</em>.</p>
<p>The ½ in <em>M</em> is the only fraction, so track the <strong>decision variable</strong> <em>D</em> = 2<em>F</em>(<em>M</em>), always an integer. At the start, <em>M</em> = (<em>x</em><sub>0</sub> + 1, <em>y</em><sub>0</sub> + ½) and <em>D</em> = 2(<em>dy</em> − <em>dx</em>/2) = 2<em>dy</em> − <em>dx</em>. Each step right increases <em>F</em> by <em>dy</em>, so adds 2<em>dy</em> to <em>D</em>; each step from row <em>y</em> to row <em>y</em> + 1 (one row down the screen, since <em>y</em> points down) decreases <em>F</em> by <em>dx</em>, so subtracts 2<em>dx</em>.</p>
<pre><code>def bresenham(x0, y0, x1, y1):
    """Pixels from (x0, y0) to (x1, y1), for 0 &lt;= y1 - y0 &lt;= x1 - x0."""
    dx, dy = x1 - x0, y1 - y0
    d = 2 * dy - dx
    y = y0
    pts = []
    for x in range(x0, x1 + 1):
        pts.append((x, y))
        if d > 0:
            y += 1
            d -= 2 * dx
        d += 2 * dy
    return pts

print(bresenham(0, 0, 5, 2))   # [(0, 0), (1, 0), (2, 1), (3, 1), (4, 2), (5, 2)]</code></pre>
<table>
<tr><th><em>x</em></th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
<tr><td><em>D</em> tested after drawing this pixel (it decides the row in column <em>x</em> + 1)</td><td>−1</td><td>3</td><td>−3</td><td>1</td><td>−5</td><td>−1</td></tr>
<tr><td>pixel</td><td>(0, 0)</td><td>(1, 0)</td><td>(2, 1)</td><td>(3, 1)</td><td>(4, 2)</td><td>(5, 2)</td></tr>
<tr><td>true <em>y</em> = 0.4<em>x</em></td><td>0</td><td>0.4</td><td>0.8</td><td>1.2</td><td>1.6</td><td>2</td></tr>
</table>
<p>For the line from (0, 0) to (5, 2), <em>dx</em> = 5 and <em>dy</em> = 2, so <em>D</em> starts at −1 and each column adds 4, with 10 subtracted whenever <em>D</em> &gt; 0 moves us on to the next row. Every chosen row is the true <em>y</em> rounded to the nearest integer. Because <em>D</em> is always exactly 2<em>F</em>(<em>M</em>), there is no rounding error to accumulate, however long the line.</p>
<figure class="fig">
<svg viewBox="0 0 300 160" width="300" role="img" aria-label="A grid of 6 columns and 3 rows of pixels. The pixels (0,0), (1,0), (2,1), (3,1), (4,2) and (5,2) are shaded. A straight line runs from the centre of pixel (0,0) to the centre of pixel (5,2), passing close to each shaded pixel's centre. A dot marks the midpoint between pixels (1,0) and (1,1).">
  <rect class="soft" x="30" y="20" width="40" height="40"/>
  <rect class="soft" x="70" y="20" width="40" height="40"/>
  <rect class="soft" x="110" y="60" width="40" height="40"/>
  <rect class="soft" x="150" y="60" width="40" height="40"/>
  <rect class="soft" x="190" y="100" width="40" height="40"/>
  <rect class="soft" x="230" y="100" width="40" height="40"/>
  <path class="ln" d="M30 20 H270 M30 60 H270 M30 100 H270 M30 140 H270 M30 20 V140 M70 20 V140 M110 20 V140 M150 20 V140 M190 20 V140 M230 20 V140 M270 20 V140"/>
  <line class="cv" x1="50" y1="40" x2="250" y2="120"/>
  <circle class="dot" cx="90" cy="60" r="3.5"/>
  <text class="text m" x="96" y="74">M</text>
  <text class="text m" x="50" y="14" text-anchor="middle">0</text><text class="text m" x="250" y="14" text-anchor="middle">5</text>
  <text class="text m" x="18" y="44" text-anchor="middle">0</text><text class="text m" x="18" y="124" text-anchor="middle">2</text>
</svg>
<figcaption>The line from (0, 0) to (5, 2), with <em>y</em> pointing down. At <em>x</em> = 1 the line passes above the midpoint <em>M</em> = (1, ½) on the screen, so <em>F</em>(<em>M</em>) &lt; 0 and the pixel stays in row 0.</figcaption>
</figure>
<p>The other seven octants follow by symmetry. If the line goes left or up, step by −1 instead of +1 (use <em>dx</em> = |<em>x</em><sub>1</sub> − <em>x</em><sub>0</sub>| and <em>dy</em> = |<em>y</em><sub>1</sub> − <em>y</em><sub>0</sub>|). If it is steep (<em>dy</em> &gt; <em>dx</em>), swap the roles of <em>x</em> and <em>y</em>: step one row at a time and decide whether to change column. When <em>D</em> = 0 the midpoint lies exactly on the line and both pixels are equally near; this version keeps the row, so a line drawn from <em>A</em> to <em>B</em> can differ by a pixel from one drawn from <em>B</em> to <em>A</em>. Drawing libraries that need identical results either way always draw in a fixed direction.</p>
<p class="note">Why it matters: the pattern in Bresenham's algorithm (turn a geometric test into an integer function, then update it incrementally instead of recomputing it) reappears in Lesson 4, where edge functions decide which pixels a triangle covers.</p>
`,
    terms: [
      ["Pixel", "One element of a raster image, holding a single color; pixel (x, y) is in column x and row y, counted from the top-left."],
      ["Raster image", "A rectangular grid of pixels, stored row by row."],
      ["RGB", "A color given as the intensities of red, green and blue primary lights."],
      ["Color depth", "The number of bits per pixel; 24 bits (8 per channel) gives 16,777,216 colors."],
      ["PPM", "A simple uncompressed image format: a header (P3, width, height, maximum value) followed by every pixel's channel values."],
      ["Linear light", "A value proportional to the physical amount of light; light from several sources adds in linear values."],
      ["sRGB", "The standard encoding of stored color values, roughly linear light to the power 1/2.2, which spends more codes on dark shades."],
      ["Gamma encoding", "Storing light intensity through a power law; computations on light must decode to linear values first."],
      ["Alpha", "A pixel's opacity, from 0 (transparent) to 1 (opaque)."],
      ["Over operator", "C = αF + (1 − α)B: a foreground with opacity α composited over a background."],
      ["Premultiplied alpha", "Storing αF instead of F, which makes stacking and filtering transparent layers simpler."],
      ["Bresenham's algorithm", "Draws a line using only integer additions and comparisons, by tracking twice the line's implicit function at the next midpoint."]
    ],
    quiz: [
      { q: "How many different colors can a pixel with 8 bits per RGB channel show?", choices: ["768", "65,536", "16,777,216", "4,294,967,296"], answer: 2, why: "24 bits give 2²⁴ = 16,777,216 combinations." },
      { q: "In sRGB, about how much light does a stored value of 128 give, compared with 255?", choices: ["50%", "About 22%", "About 73%", "Exactly 128/255 of it"], answer: 1, why: "Decoding gives ((128/255 + 0.055)/1.055)^2.4 ≈ 0.216." },
      { q: "A black and a white pixel are averaged correctly, in linear light. What is the sRGB value of the result?", choices: ["128", "188", "255", "64"], answer: 1, why: "Linear 0.5 encodes to 188; 128 is what averaging the codes gives, and is too dark." },
      { q: "White with alpha 0.25 is composited over black in linear light. What is the linear result?", choices: ["0.25", "0.75", "0.5", "0.0625"], answer: 0, why: "C = 0.25 × 1 + 0.75 × 0 = 0.25 (sRGB 137)." },
      { q: "What is Bresenham's starting decision value D for the line from (0, 0) to (7, 3)?", choices: ["−1", "3", "−7", "1"], answer: 0, why: "D = 2dy − dx = 6 − 7 = −1." },
      { q: "Why does Bresenham's algorithm track D = 2F(M) instead of F(M)?", choices: ["It converges faster", "The midpoint has a ½ in it, and doubling keeps every value an integer", "To avoid negative numbers", "Because there are two candidate pixels"], answer: 1, why: "F at (x + 1, y + ½) can be a half-integer; 2F never is." }
    ],
    practice: [
      {
        q: `<p>How many bytes does a 640 × 480 image take with 8 bits per channel and no alpha? A P3 PPM file of the same image writes each value as up to three digits followed by a space or newline. What is the largest the pixel data can be, and why do real programs prefer binary formats?</p>`,
        a: `<p>640 × 480 × 3 = 921,600 bytes. In P3 text each value takes up to 4 characters, so the pixel data can reach 4 × 921,600 = 3,686,400 bytes, four times as much, and the reader must also parse every number. The binary variant P6 stores each value as one byte, and compressed formats such as PNG are smaller still.</p>`
      },
      {
        q: `<p>A photo editor shrinks an image by averaging pairs of pixels. Two neighbours are (200, 200, 200) and (50, 50, 50). What does averaging the codes give, and what is the correct average?</p>`,
        a: `<p>Averaging codes: 125. Correctly: <code>to_linear(200)</code> ≈ 0.5776 and <code>to_linear(50)</code> ≈ 0.0319, average ≈ 0.3048, which encodes to 150. The naive result is visibly darker.</p>
<pre><code>print(to_srgb((to_linear(200) + to_linear(50)) / 2))   # 150</code></pre>`
      },
      {
        q: `<p>Trace Bresenham's algorithm for the line from (0, 0) to (7, 3): give <em>D</em> as each pixel is drawn and the pixels chosen. Check each against the true <em>y</em> = 3<em>x</em>/7.</p>`,
        a: `<p><em>dx</em> = 7, <em>dy</em> = 3: start at <em>D</em> = −1; add 6 each column, and subtract 14 after any step where <em>D</em> &gt; 0. The values of <em>D</em> at <em>x</em> = 0…7 are −1, 5, −3, 3, −5, 1, −7, −1, and the pixels are (0, 0), (1, 0), (2, 1), (3, 1), (4, 2), (5, 2), (6, 3), (7, 3). The true <em>y</em> values 0, 0.43, 0.86, 1.29, 1.71, 2.14, 2.57, 3 round to exactly those rows.</p>
<pre><code>print(bresenham(0, 0, 7, 3))   # [(0, 0), (1, 0), (2, 1), (3, 1), (4, 2), (5, 2), (6, 3), (7, 3)]</code></pre>`
      },
      {
        q: `<p>A 50%-opaque pure blue layer lies over a white background, and a 50%-opaque pure red layer lies on top of both. Composite back to front in linear light and give the final sRGB color.</p>`,
        a: `<p>Blue over white, in linear values: 0.5(0, 0, 1) + 0.5(1, 1, 1) = (0.5, 0.5, 1). Red over that: 0.5(1, 0, 0) + 0.5(0.5, 0.5, 1) = (0.75, 0.25, 0.5). Encoding gives (225, 137, 188).</p>
<pre><code>print([to_srgb(x) for x in (0.75, 0.25, 0.5)])   # [225, 137, 188]</code></pre>`
      }
    ],
    sources: ["fcg", "netpbm", "srgb96", "porterduff84", "bresenham65"]
  },
  {
    id: "gr2",
    title: "Transformations",
    minutes: 90,
    summary: "2D transformations as matrices, homogeneous coordinates so that translation is a matrix too, composing transformations and why order matters, points versus directions, 3D transforms and rotations about the axes, the cross product, and why normals transform by the inverse transpose.",
    notes: `
<p>A game character is modeled once, in its own coordinates, and then drawn a thousand times: walking, turning, scaled up, far away. Each placement is a <strong>transformation</strong> applied to every vertex (corner point) of the model. MATH 220 Lesson 3 showed that a linear transformation is multiplication by a matrix, and that composing transformations multiplies their matrices. This lesson adds the one piece graphics needs on top: translation.</p>

<h3>2D transformations as matrices</h3>
<p>Recall the method from MATH 220: the columns of a 2 × 2 matrix are where it sends (1, 0) and (0, 1). So scaling by <em>s<sub>x</sub></em> and <em>s<sub>y</sub></em> is [<em>s<sub>x</sub></em> 0; 0 <em>s<sub>y</sub></em>], and rotation counterclockwise by <em>θ</em> (with <em>y</em> pointing up) is [cos <em>θ</em> −sin <em>θ</em>; sin <em>θ</em> cos <em>θ</em>]. (Rows are separated by semicolons, as in MATH 220.) Reflections and shears are matrices too.</p>
<p>But moving every point by a fixed amount, <strong>translation</strong> (<em>x</em>, <em>y</em>) ↦ (<em>x</em> + <em>t<sub>x</sub></em>, <em>y</em> + <em>t<sub>y</sub></em>), is not linear: it moves the origin, and a linear map must send 0 to 0. Yet we want a single kind of object for every placement, so that a whole chain of moves can be multiplied into one matrix.</p>

<h3>Homogeneous coordinates</h3>
<p>The trick is to add a third coordinate fixed at 1: the point (<em>x</em>, <em>y</em>) becomes (<em>x</em>, <em>y</em>, 1), its <strong>homogeneous coordinates</strong>. Now translation is a 3 × 3 matrix:</p>
<p class="math">[1 0 <em>t<sub>x</sub></em>; 0 1 <em>t<sub>y</sub></em>; 0 0 1] (<em>x</em>, <em>y</em>, 1) = (<em>x</em> + <em>t<sub>x</sub></em>, <em>y</em> + <em>t<sub>y</sub></em>, 1)</p>
<p>The third column is multiplied by the 1 and added in. Geometrically, the plane sits inside 3D space as the plane <em>z</em> = 1, and this 3 × 3 matrix is a linear map of 3D space (a shear) that slides that plane along itself. A 2 × 2 matrix <em>A</em> becomes [<em>A</em> 0; 0 1], with the old matrix in the top-left corner, so every earlier transformation still works. The most general matrix of this shape, [<em>A</em> <strong>t</strong>; 0 1], applies <em>A</em> and then translates by <strong>t</strong>; such maps are called <strong>affine</strong>. They keep straight lines straight and parallel lines parallel.</p>
<p>The extra coordinate also separates two kinds of object. A <strong>point</strong> (a position) has 1 as its last coordinate. A <strong>vector</strong> (a direction or displacement, such as the direction a camera faces) has 0, so the translation column is multiplied by 0 and vectors are rotated and scaled but never translated. That is right: moving a car doesn't change which way it points. And the difference of two points, (<em>x</em><sub>1</sub>, <em>y</em><sub>1</sub>, 1) − (<em>x</em><sub>0</sub>, <em>y</em><sub>0</sub>, 1), has last coordinate 0: a vector, as it should be.</p>

<h3>Composition and order</h3>
<p>To scale a shape, then rotate it, then move it into place, multiply the matrices. In <em>M</em> = <em>TRS</em> applied to a point <strong>p</strong>, <em>M</em><strong>p</strong> = <em>T</em>(<em>R</em>(<em>S</em><strong>p</strong>)): the matrix <em>nearest the point acts first</em>, so read right to left. Here is <em>S</em> = scale <em>x</em> by 2, <em>R</em> = rotate 90°, <em>T</em> = translate by (4, 1), applied to (1, 1), with MATH 220's <code>matmul</code>:</p>
<pre><code>def matmul(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(len(B))) for j in range(len(B[0]))]
            for i in range(len(A))]

T = [[1, 0, 4], [0, 1, 1], [0, 0, 1]]     # translate by (4, 1)
R = [[0, -1, 0], [1, 0, 0], [0, 0, 1]]    # rotate 90° counterclockwise
S = [[2, 0, 0], [0, 1, 0], [0, 0, 1]]     # stretch x by 2
M = matmul(T, matmul(R, S))
print(M)                            # [[0, -1, 4], [2, 0, 1], [0, 0, 1]]
print(matmul(M, [[1], [1], [1]]))   # [[3], [3], [1]]</code></pre>
<p>Step by step: <em>S</em> sends (1, 1) to (2, 1); <em>R</em> sends that to (−1, 2); <em>T</em> moves it to (3, 3). The one matrix <em>M</em> does all three, which is the point of composing: a model with 100,000 vertices is multiplied by one matrix, not three.</p>
<p>Order matters, because matrix multiplication isn't commutative. Reversing the order, <em>SRT</em>, translates first and then rotates and stretches the translated point:</p>
<pre><code>print(matmul(matmul(S, matmul(R, T)), [[1], [1], [1]]))   # [[-4], [5], [1]]</code></pre>
<p>A common need is rotating about a point <strong>c</strong> other than the origin (a door about its hinge). Move <strong>c</strong> to the origin, rotate, and move it back: <em>T</em>(<strong>c</strong>) <em>R</em> <em>T</em>(−<strong>c</strong>), where the rightmost matrix acts first.</p>

<h3>Three dimensions</h3>
<p>Everything carries over with one more coordinate: 3D points are (<em>x</em>, <em>y</em>, <em>z</em>, 1), vectors (<em>x</em>, <em>y</em>, <em>z</em>, 0), and transformations are 4 × 4 matrices [<em>A</em> <strong>t</strong>; 0 1] with a 3 × 3 block <em>A</em> and a translation column <strong>t</strong>. We use a <strong>right-handed</strong> coordinate system: if <em>x</em> points right and <em>y</em> up, then <em>z</em> points toward you, out of the screen. Rotation about each axis is a 2D rotation of the other two coordinates, counterclockwise when you look from the positive end of the axis toward the origin:</p>
<table>
<tr><th>Rotation by <em>θ</em> about</th><th>Rows of the 3 × 3 block (<em>c</em> = cos <em>θ</em>, <em>s</em> = sin <em>θ</em>)</th><th>Sends</th></tr>
<tr><td><em>x</em></td><td>[1 0 0; 0 <em>c</em> −<em>s</em>; 0 <em>s</em> <em>c</em>]</td><td><em>y</em> toward <em>z</em></td></tr>
<tr><td><em>y</em></td><td>[<em>c</em> 0 <em>s</em>; 0 1 0; −<em>s</em> 0 <em>c</em>]</td><td><em>z</em> toward <em>x</em></td></tr>
<tr><td><em>z</em></td><td>[<em>c</em> −<em>s</em> 0; <em>s</em> <em>c</em> 0; 0 0 1]</td><td><em>x</em> toward <em>y</em></td></tr>
</table>
<p>The <em>y</em> rotation's signs look reversed only because the cycle is <em>x</em> → <em>y</em> → <em>z</em> → <em>x</em>: rotating about <em>y</em> turns <em>z</em> toward <em>x</em>, so the pattern is the 2D one written for the pair (<em>z</em>, <em>x</em>). Any orientation can be built as a product of three such rotations (yaw, pitch and roll, for an aircraft), though games often store orientations as <em>quaternions</em>, four numbers that interpolate smoothly between orientations; we won't need them.</p>

<h3>The cross product</h3>
<p>We need one more operation on 3D vectors. The <strong>cross product</strong> of <strong>a</strong> = (<em>a</em><sub>1</sub>, <em>a</em><sub>2</sub>, <em>a</em><sub>3</sub>) and <strong>b</strong> = (<em>b</em><sub>1</sub>, <em>b</em><sub>2</sub>, <em>b</em><sub>3</sub>) is</p>
<p class="math"><strong>a</strong> × <strong>b</strong> = (<em>a</em><sub>2</sub><em>b</em><sub>3</sub> − <em>a</em><sub>3</sub><em>b</em><sub>2</sub>, <em>a</em><sub>3</sub><em>b</em><sub>1</sub> − <em>a</em><sub>1</sub><em>b</em><sub>3</sub>, <em>a</em><sub>1</sub><em>b</em><sub>2</sub> − <em>a</em><sub>2</sub><em>b</em><sub>1</sub>)</p>
<p>(If you took PHYS 250, this is Lesson 4's cross product.) It is perpendicular to both <strong>a</strong> and <strong>b</strong>: expand <strong>a</strong> · (<strong>a</strong> × <strong>b</strong>) and every term cancels. Its length is |<strong>a</strong>||<strong>b</strong>| sin <em>θ</em>, the area of the parallelogram the two vectors span, and its direction follows the <strong>right-hand rule</strong>: (1, 0, 0) × (0, 1, 0) = (0, 0, 1), so <em>x</em> × <em>y</em> = <em>z</em>. Swapping the order flips the sign: <strong>b</strong> × <strong>a</strong> = −(<strong>a</strong> × <strong>b</strong>).</p>
<p>Its main use in graphics is the <strong>normal</strong> of a surface: a vector perpendicular to it, which says which way the surface faces and drives all of Lesson 5's lighting. For a triangle with vertices <strong>p</strong><sub>0</sub>, <strong>p</strong><sub>1</sub>, <strong>p</strong><sub>2</sub>, the vector (<strong>p</strong><sub>1</sub> − <strong>p</strong><sub>0</sub>) × (<strong>p</strong><sub>2</sub> − <strong>p</strong><sub>0</sub>) is a normal, and half its length is the triangle's area. Listing a triangle's vertices counterclockwise, as seen from outside the object, makes this normal point outward; every 3D file format fixes some such convention.</p>
<pre><code>def cross(a, b):
    return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])

print(cross((1, 0, 0), (0, 1, 0)))   # (0, 0, 1)
print(cross((2, 0, 0), (0, 3, 0)))   # (0, 0, 6)</code></pre>
<p>The second line is the normal of the triangle (0, 0, 0), (2, 0, 0), (0, 3, 0), which lies in the <em>xy</em>-plane: it points along +<em>z</em>, and half its length, 3, is the triangle's area (base 2, height 3).</p>

<h3>Transforming normals</h3>
<p>When a model is transformed by <em>M</em>, its normals must change too. For rotations, apply <em>M</em> to the normal as to any vector. But for a non-uniform scale, that gives the wrong answer. Take the 2D line through (1, 0) and (0, 1): its direction (a <strong>tangent</strong>) is <strong>t</strong> = (1, −1) and its normal is <strong>n</strong> = (1, 1). Stretch <em>x</em> by 2, <em>A</em> = [2 0; 0 1]. The line now runs through (2, 0) and (0, 1), with tangent <em>A</em><strong>t</strong> = (2, −1). But <em>A</em><strong>n</strong> = (2, 1), and (2, 1) · (2, −1) = 3 ≠ 0: it is no longer perpendicular.</p>
<p>The fix comes from the condition that defines a normal: <strong>n</strong> · <strong>t</strong> = <strong>n</strong><sup>T</sup><strong>t</strong> = 0 for every tangent <strong>t</strong>. Tangents transform as <strong>t</strong>′ = <em>A</em><strong>t</strong>. We want <strong>n</strong>′ with <strong>n</strong>′<sup>T</sup><em>A</em><strong>t</strong> = 0. Try <strong>n</strong>′ = (<em>A</em><sup>−1</sup>)<sup>T</sup><strong>n</strong>: using MATH 220 Lesson 3's rule (<em>XY</em>)<sup>T</sup> = <em>Y</em><sup>T</sup><em>X</em><sup>T</sup>, <strong>n</strong>′<sup>T</sup> = <strong>n</strong><sup>T</sup><em>A</em><sup>−1</sup>, so</p>
<p class="math"><strong>n</strong>′<sup>T</sup><strong>t</strong>′ = <strong>n</strong><sup>T</sup><em>A</em><sup>−1</sup><em>A</em><strong>t</strong> = <strong>n</strong><sup>T</sup><strong>t</strong> = 0</p>
<p>So normals transform by the <strong>inverse transpose</strong> (<em>A</em><sup>−1</sup>)<sup>T</sup> of the upper-left block (translation doesn't affect a direction), followed by normalizing to length 1. In the example, (<em>A</em><sup>−1</sup>)<sup>T</sup> = [½ 0; 0 1] sends (1, 1) to (½, 1), and (½, 1) · (2, −1) = 0. For a rotation, <em>A</em> is orthogonal (MATH 220 Lesson 6), <em>A</em><sup>−1</sup> = <em>A</em><sup>T</sup>, so (<em>A</em><sup>−1</sup>)<sup>T</sup> = <em>A</em> and normals transform like any vector. For a uniform scale the two differ only in length, which normalizing removes.</p>
<p>In 3D, the cross product gives (<em>A</em><sup>−1</sup>)<sup>T</sup> without elimination. If <strong>a</strong>, <strong>b</strong>, <strong>c</strong> are the columns of <em>A</em>, let <em>B</em> have columns <strong>b</strong> × <strong>c</strong>, <strong>c</strong> × <strong>a</strong>, <strong>a</strong> × <strong>b</strong>. Entry (<em>i</em>, <em>j</em>) of <em>B</em><sup>T</sup><em>A</em> is column <em>i</em> of <em>B</em> dotted with column <em>j</em> of <em>A</em>: (<strong>b</strong> × <strong>c</strong>) · <strong>a</strong> on the diagonal, and zero off it, because each cross product is perpendicular to the two columns it was made from. The diagonal entries are all equal to det <em>A</em>. Writing out <strong>a</strong> · (<strong>b</strong> × <strong>c</strong>) gives exactly MATH 220 Lesson 4's cofactor formula for the matrix with rows <strong>a</strong>, <strong>b</strong>, <strong>c</strong>, which is <em>A</em><sup>T</sup>, and det <em>A</em><sup>T</sup> = det <em>A</em>. Writing out the other two, (<strong>c</strong> × <strong>a</strong>) · <strong>b</strong> and (<strong>a</strong> × <strong>b</strong>) · <strong>c</strong>, gives the same six terms. So <em>B</em><sup>T</sup><em>A</em> = (det <em>A</em>)<em>I</em>, which means (<em>A</em><sup>−1</sup>)<sup>T</sup> = <em>B</em>/det <em>A</em>.</p>
<p class="note">Why it matters: forgetting the inverse transpose is a classic bug. Models that are only rotated and uniformly scaled look fine; the first squashed model is lit as if its surfaces faced the wrong way.</p>
`,
    terms: [
      ["Transformation", "A function applied to every point of a model, here always a matrix multiplication."],
      ["Homogeneous coordinates", "Writing a 2D point as (x, y, 1) or a 3D point as (x, y, z, 1), so that translation becomes a matrix."],
      ["Affine transformation", "A linear map followed by a translation; its matrix is [A t; 0 1]."],
      ["Point vs vector", "A point has last homogeneous coordinate 1 and is translated; a vector (direction) has 0 and is not."],
      ["Composition", "Applying transformations in sequence; the product matrix, read right to left, does the same."],
      ["Right-handed coordinates", "With x right and y up, z points toward the viewer; x × y = z."],
      ["Cross product", "a × b, a vector perpendicular to a and b whose length is the area of the parallelogram they span."],
      ["Normal", "A vector perpendicular to a surface, showing which way it faces."],
      ["Inverse transpose", "(A⁻¹)ᵀ, the matrix that transforms normals so they stay perpendicular to the transformed surface."]
    ],
    quiz: [
      { q: "What are the homogeneous coordinates of the 2D point (3, 4)?", choices: ["(3, 4, 0)", "(3, 4, 1)", "(1, 3, 4)", "(3, 4, 7)"], answer: 1, why: "Points get a last coordinate of 1; directions get 0." },
      { q: "In M = TRS applied to a point p, which transformation acts on p first?", choices: ["T", "R", "S", "All at once, so order doesn't matter"], answer: 2, why: "Mp = T(R(Sp)): the matrix nearest the point acts first." },
      { q: "What does a translation matrix do to the direction vector (1, 2, 0) in 2D homogeneous coordinates?", choices: ["Adds the translation to it", "Nothing: the translation column is multiplied by 0", "Reverses it", "Normalizes it"], answer: 1, why: "Directions have last coordinate 0, so translation doesn't change them." },
      { q: "Rotating (1, 0, 0) by 90° about the z-axis gives:", choices: ["(0, 1, 0)", "(0, −1, 0)", "(0, 0, 1)", "(−1, 0, 0)"], answer: 0, why: "Rotation about z turns x toward y." },
      { q: "A model is transformed by a matrix with upper-left block A. Its normals should be transformed by:", choices: ["A", "Aᵀ", "(A⁻¹)ᵀ", "A⁻¹"], answer: 2, why: "This keeps n′ · t′ = nᵀA⁻¹At = n · t = 0 for every tangent t." },
      { q: "What is (0, 1, 0) × (1, 0, 0)?", choices: ["(0, 0, 1)", "(0, 0, −1)", "(1, 1, 0)", "(0, 0, 0)"], answer: 1, why: "x × y = z, and swapping the order flips the sign: y × x = −z." }
    ],
    practice: [
      {
        q: `<p>Write the 3 × 3 matrix that rotates the plane by 30° counterclockwise about the point (2, 1), as a product of three matrices, and apply it to (4, 1).</p>`,
        a: `<p><em>M</em> = <em>T</em>(2, 1) <em>R</em>(30°) <em>T</em>(−2, −1). The rightmost moves (4, 1) to (2, 0); rotating by 30° gives (2 cos 30°, 2 sin 30°) = (1.732, 1); moving back gives (3.732, 2). Check: the result is still at distance 2 from (2, 1), and the angle has turned from 0° to 30°.</p>`
      },
      {
        q: `<p>Show that translations commute with each other but not with rotations: compare <em>T</em>(<strong>a</strong>)<em>T</em>(<strong>b</strong>) with <em>T</em>(<strong>b</strong>)<em>T</em>(<strong>a</strong>), and compute <em>R</em>(90°)<em>T</em>(1, 0) and <em>T</em>(1, 0)<em>R</em>(90°) applied to the origin.</p>`,
        a: `<p>Multiplying [1 0 <em>a</em><sub>1</sub>; 0 1 <em>a</em><sub>2</sub>; 0 0 1] by [1 0 <em>b</em><sub>1</sub>; 0 1 <em>b</em><sub>2</sub>; 0 0 1] gives [1 0 <em>a</em><sub>1</sub> + <em>b</em><sub>1</sub>; 0 1 <em>a</em><sub>2</sub> + <em>b</em><sub>2</sub>; 0 0 1] in either order: <em>T</em>(<strong>a</strong> + <strong>b</strong>). But <em>R</em>(90°)<em>T</em>(1, 0) moves the origin to (1, 0) and then rotates it to (0, 1), while <em>T</em>(1, 0)<em>R</em>(90°) rotates the origin (which stays put) and then moves it to (1, 0).</p>`
      },
      {
        q: `<p>The plane <em>x</em> + <em>y</em> + <em>z</em> = 1 has normal (1, 1, 1). Scale space by 2 in <em>x</em> only. Find the transformed plane from the images of its points (1, 0, 0), (0, 1, 0) and (0, 0, 1), and check that (<em>A</em><sup>−1</sup>)<sup>T</sup> gives its normal while <em>A</em> doesn't.</p>`,
        a: `<p>The points go to (2, 0, 0), (0, 1, 0), (0, 0, 1), which lie on <em>x</em>/2 + <em>y</em> + <em>z</em> = 1, with normal (½, 1, 1). Here <em>A</em> = diag(2, 1, 1), so (<em>A</em><sup>−1</sup>)<sup>T</sup> = diag(½, 1, 1), which sends (1, 1, 1) to (½, 1, 1): correct. <em>A</em> would give (2, 1, 1), and the tangent (0, 1, 0) − (2, 0, 0) = (−2, 1, 0) has (2, 1, 1) · (−2, 1, 0) = −3 ≠ 0, so that isn't a normal.</p>`
      },
      {
        q: `<p>Find a normal and the area of the triangle with vertices (1, 0, 0), (0, 2, 0) and (0, 0, 3). Which side does your normal point to?</p>`,
        a: `<p>Edges: <strong>p</strong><sub>1</sub> − <strong>p</strong><sub>0</sub> = (−1, 2, 0) and <strong>p</strong><sub>2</sub> − <strong>p</strong><sub>0</sub> = (−1, 0, 3). Cross product: (2·3 − 0·0, 0·(−1) − (−1)·3, (−1)·0 − 2·(−1)) = (6, 3, 2), of length √(36 + 9 + 4) = 7, so the area is 3.5. The normal has all components positive, so it points away from the origin, which lies on the other side of the triangle.</p>
<pre><code>print(cross((-1, 2, 0), (-1, 0, 3)))   # (6, 3, 2)</code></pre>`
      }
    ],
    sources: ["fcg", "scratchapixel", "mit1806"]
  },
  {
    id: "gr3",
    title: "Viewing and projection",
    minutes: 90,
    summary: "Camera coordinates and the look-at construction, perspective projection from similar triangles, the projection matrix and the perspective divide, the view frustum and clipping, normalized device coordinates and the viewport mapping to pixels, depth precision, and orthographic projection.",
    notes: `
<p>Lesson 2 placed objects in a shared <strong>world</strong> coordinate system. Now we look at the world through a camera. Rasterization moves every vertex through a fixed chain of coordinate systems, each reached by a matrix or a simple formula:</p>
<p class="math">world → camera → clip → normalized device coordinates → pixels</p>
<p>This lesson builds each step, so that by the end we can take any world point and say which pixel it lands on, and how far away it is.</p>

<h3>Camera coordinates and look-at</h3>
<p>It is easiest to project when the camera sits at the origin looking along a fixed axis. The convention (OpenGL's, used throughout this course) is that in <strong>camera coordinates</strong> the camera is at the origin, looking down the <em>negative z</em>-axis, with <em>x</em> to its right and <em>y</em> up. Points in front of the camera therefore have negative <em>z</em>, and −<em>z</em> is their distance in front.</p>
<p>A camera is usually specified by where it is (the <strong>eye</strong> <strong>e</strong>), a point it looks at (the <strong>target</strong>) and which way is roughly up (the <strong>up</strong> vector, often (0, 1, 0)). The <strong>look-at</strong> construction builds the camera's three axes as unit vectors in world coordinates:</p>
<ul>
<li><strong>w</strong> = normalize(<strong>e</strong> − target): backward, since the camera looks along −<strong>w</strong>;</li>
<li><strong>u</strong> = normalize(up × <strong>w</strong>): to the right, perpendicular to both up and the viewing direction;</li>
<li><strong>v</strong> = <strong>w</strong> × <strong>u</strong>: the camera's true up, perpendicular to both.</li>
</ul>
<p>(normalize(<strong>a</strong>) means <strong>a</strong>/|<strong>a</strong>|, the unit vector in the same direction.) The given up vector needn't be perpendicular to the view direction; the cross products fix that. It must not be parallel to it, or up × <strong>w</strong> = 0: a camera looking straight down has no defined "right" from up = (0, 1, 0).</p>
<p>The three vectors are orthonormal, so a point's camera coordinates are its components along them, measured from the eye: (<strong>u</strong> · (<strong>p</strong> − <strong>e</strong>), <strong>v</strong> · (<strong>p</strong> − <strong>e</strong>), <strong>w</strong> · (<strong>p</strong> − <strong>e</strong>)). As a matrix, the <strong>view matrix</strong> has rows (<strong>u</strong>, −<strong>u</strong> · <strong>e</strong>), (<strong>v</strong>, −<strong>v</strong> · <strong>e</strong>), (<strong>w</strong>, −<strong>w</strong> · <strong>e</strong>) and (0, 0, 0, 1): a rotation whose rows are the camera axes, after a translation by −<strong>e</strong>.</p>
<pre><code>import math

def sub(a, b): return tuple(x - y for x, y in zip(a, b))
def dot(a, b): return sum(x * y for x, y in zip(a, b))
def cross(a, b): return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])
def normalize(a): n = math.sqrt(dot(a, a)); return tuple(x / n for x in a)

eye, target, up = (4, 3, 4), (0, 1, 0), (0, 1, 0)
w = normalize(sub(eye, target))
u = normalize(cross(up, w))
v = cross(w, u)
print([round(x, 4) for x in w])   # [0.6667, 0.3333, 0.6667]
print([round(x, 4) for x in u])   # [0.7071, 0.0, -0.7071]
print([round(x, 4) for x in v])   # [-0.2357, 0.9428, -0.2357]
p = (0, 1, 0)
print([round(dot(a, sub(p, eye)), 4) for a in (u, v, w)])   # [0.0, 0.0, -6.0]</code></pre>
<p>The target is straight ahead (<em>x</em> = <em>y</em> = 0) at distance 6, which is |(4, 2, 4)|, as it must be.</p>

<h3>Perspective projection</h3>
<p>A camera, like an eye, sees along straight lines through a single point. Picture an <strong>image plane</strong> at distance <em>d</em> in front of the eye. A point at height <em>y</em> and distance −<em>z</em> projects to the height <em>y</em><sub>s</sub> where the line from the eye to the point crosses the plane, and by similar triangles</p>
<p class="math"><em>y</em><sub>s</sub> / <em>d</em> = <em>y</em> / (−<em>z</em>),&nbsp;&nbsp; so&nbsp;&nbsp; <em>y</em><sub>s</sub> = <em>d</em> · <em>y</em> / (−<em>z</em>)</p>
<p>and the same for <em>x</em>. Dividing by distance is what makes far things small: twice as far, half as big.</p>
<figure class="fig">
<svg viewBox="0 0 440 200" width="440" role="img" aria-label="Side view of a camera. The eye is at the left. Two lines spread out from it to form the view frustum, cut by a short vertical near plane and a taller far plane, with the image plane between them. A point inside the frustum at height y and distance minus z is joined to the eye by a line, which crosses the image plane at height y sub s.">
  <line class="ax" x1="30" y1="150" x2="420" y2="150"/>
  <text class="text m" x="404" y="168">−z</text>
  <line class="ln" x1="30" y1="150" x2="400" y2="20"/>
  <line class="ln" x1="30" y1="150" x2="400" y2="190"/>
  <line class="ln dash" x1="100" y1="126" x2="100" y2="158"/>
  <text class="text m" x="86" y="118">near</text>
  <line class="ln dash" x1="380" y1="27" x2="380" y2="188"/>
  <text class="text m" x="388" y="110">far</text>
  <line class="hl" x1="160" y1="104" x2="160" y2="164"/>
  <text class="text m" x="130" y="184">image plane</text>
  <line class="cv" x1="30" y1="150" x2="320" y2="60"/>
  <circle class="dot" cx="320" cy="60" r="4"/>
  <text class="text" x="326" y="80">(y, z)</text>
  <line class="ln dash" x1="320" y1="60" x2="320" y2="150"/>
  <circle class="dot" cx="160" cy="109.7" r="3.5"/>
  <text class="text m" x="166" y="132">y<tspan baseline-shift="sub">s</tspan></text>
  <text class="text m" x="20" y="170">eye</text>
  <text class="text m" x="92" y="172">d</text>
</svg>
<figcaption>Side view. The triangle from the eye to the point and the triangle from the eye to its image are similar, so <em>y</em><sub>s</sub>/<em>d</em> = <em>y</em>/(−<em>z</em>). The near and far planes and the two slanted sides bound the view frustum.</figcaption>
</figure>
<p>The camera sees only a <strong>field of view</strong>: an angle fov<sub>y</sub> from the bottom of the picture to the top. With the image plane at <em>d</em> = 1, the top of the view is at <em>y</em><sub>s</sub> = tan(fov<sub>y</sub>/2). We want the visible range to come out as −1 to 1, so we scale by <em>f</em> = 1/tan(fov<sub>y</sub>/2). The picture is wider than tall by the <strong>aspect ratio</strong> = width/height, so <em>x</em> is also divided by the aspect: then a square in the scene stays square in the image.</p>

<h3>The projection matrix and the perspective divide</h3>
<p>Division by −<em>z</em> is not a linear map, so no matrix can do it. Homogeneous coordinates rescue us again. Allow the last coordinate <em>w</em> to be any nonzero number, and agree that (<em>x</em>, <em>y</em>, <em>z</em>, <em>w</em>) means the same point as (<em>x</em>/<em>w</em>, <em>y</em>/<em>w</em>, <em>z</em>/<em>w</em>, 1). Then a matrix can put −<em>z</em> into <em>w</em>, and the division happens afterwards in one step, the <strong>perspective divide</strong>. The standard <strong>perspective matrix</strong>, for near and far distances <em>n</em> and <em>f</em><sub>ar</sub> (explained below), has rows</p>
<p class="math">(<em>f</em>/aspect, 0, 0, 0), (0, <em>f</em>, 0, 0), (0, 0, (<em>f</em><sub>ar</sub> + <em>n</em>)/(<em>n</em> − <em>f</em><sub>ar</sub>), 2<em>f</em><sub>ar</sub><em>n</em>/(<em>n</em> − <em>f</em><sub>ar</sub>)), (0, 0, −1, 0)</p>
<p>Multiplying a camera-space point (<em>x</em>, <em>y</em>, <em>z</em>, 1) by it gives <strong>clip coordinates</strong>, whose last row puts <em>w</em> = −<em>z</em>, the distance. Dividing by <em>w</em> gives <strong>normalized device coordinates</strong> (NDC): <em>x</em><sub>ndc</sub> = (<em>f</em>/aspect)<em>x</em>/(−<em>z</em>) and <em>y</em><sub>ndc</sub> = <em>f y</em>/(−<em>z</em>), exactly the similar-triangles formula, scaled so the visible picture runs from −1 to 1.</p>
<p>The third row keeps depth, needed in Lesson 4 to decide which surface is in front. It is chosen so that <em>z</em><sub>ndc</sub> = (<em>Az</em> + <em>B</em>)/(−<em>z</em>) is −1 at the near distance (<em>z</em> = −<em>n</em>) and +1 at the far one (<em>z</em> = −<em>f</em><sub>ar</sub>). Those give −<em>An</em> + <em>B</em> = −<em>n</em> and −<em>Af</em><sub>ar</sub> + <em>B</em> = <em>f</em><sub>ar</sub>; subtracting, −<em>A</em>(<em>f</em><sub>ar</sub> − <em>n</em>) = <em>f</em><sub>ar</sub> + <em>n</em>, so <em>A</em> = (<em>f</em><sub>ar</sub> + <em>n</em>)/(<em>n</em> − <em>f</em><sub>ar</sub>), and substituting back gives <em>B</em> = 2<em>f</em><sub>ar</sub><em>n</em>/(<em>n</em> − <em>f</em><sub>ar</sub>). Depth still increases with distance, but not linearly: most of the range −1 to 1 is used up close to the camera.</p>
<pre><code>n, far = 1, 100
for z in (-1, -2, -5, -10, -50, -100):
    print(z, round((far + n) / (far - n) + 2 * far * n / ((far - n) * z), 4))</code></pre>
<pre data-label="Output"><code>-1 -1.0
-2 0.0101
-5 0.6162
-10 0.8182
-50 0.9798
-100 1.0</code></pre>
<p>Half of the depth range covers only distances 1 to 2. Depth is stored with limited precision, so surfaces far away that are close together can get the same stored depth and flicker through each other ("z-fighting"). The cure is to push the near plane out as far as the scene allows: the ratio <em>f</em><sub>ar</sub>/<em>n</em> is what matters.</p>

<h3>The view frustum and clipping</h3>
<p>The visible region is a <strong>view frustum</strong>: a pyramid with its tip at the eye, cut off by the <strong>near plane</strong> at distance <em>n</em> and the <strong>far plane</strong> at <em>f</em><sub>ar</sub>. After the divide it becomes the cube −1 ≤ <em>x</em><sub>ndc</sub>, <em>y</em><sub>ndc</sub>, <em>z</em><sub>ndc</sub> ≤ 1, so "is this point visible?" becomes six simple comparisons. Points behind the camera have <em>w</em> = −<em>z</em> ≤ 0, and dividing by a negative <em>w</em> would flip them into view upside down, so they must be rejected first. A triangle that is partly inside is <strong>clipped</strong>: cut against the frustum's planes in clip coordinates, before the divide, into a smaller polygon that lies inside. (The graded problems simply reject points outside.)</p>

<h3>The viewport: NDC to pixels</h3>
<p>Last, the <strong>viewport mapping</strong> stretches NDC to the image: <em>x</em> from −1…1 to 0…width, and <em>y</em> from −1…1 to height…0, flipped because pixel rows count downward while camera <em>y</em> points up:</p>
<p class="math"><em>p<sub>x</sub></em> = (<em>x</em><sub>ndc</sub> + 1)/2 · width,&nbsp;&nbsp; <em>p<sub>y</sub></em> = (1 − <em>y</em><sub>ndc</sub>)/2 · height</p>
<p>These are continuous positions: the point lies in pixel (⌊<em>p<sub>x</sub></em>⌋, ⌊<em>p<sub>y</sub></em>⌋), and a pixel's centre (<em>i</em> + 0.5, <em>j</em> + 0.5) is where Lesson 4 will test coverage. NDC values of exactly ±1 count as inside the view. A point exactly on the right or bottom edge has <em>p<sub>x</sub></em> = width or <em>p<sub>y</sub></em> = height, one past the last column or row, so it is clamped into the last one: column min(⌊<em>p<sub>x</sub></em>⌋, width − 1), row min(⌊<em>p<sub>y</sub></em>⌋, height − 1).</p>
<div class="callout"><p><b>Example.</b> A camera at the origin (so camera and world coordinates agree) with fov<sub>y</sub> = 90°, a 64 × 48 image (aspect 4/3), <em>n</em> = 1 and <em>f</em><sub>ar</sub> = 100. Project (1, 1, −4). Here <em>f</em> = 1/tan 45° = 1. Clip coordinates: <em>x</em> = 1/(4/3) = 0.75, <em>y</em> = 1, <em>w</em> = 4. NDC: (0.1875, 0.25). Pixels: <em>p<sub>x</sub></em> = 1.1875/2 × 64 = 38, <em>p<sub>y</sub></em> = 0.75/2 × 48 = 18. Depth: (101/(−99))(−4) + 200/(−99) = 2.0606 in clip space, so <em>z</em><sub>ndc</sub> = 2.0606/4 ≈ 0.515.</p></div>

<h3>Orthographic projection</h3>
<p>Sometimes we want no perspective at all: engineering drawings, maps, 2D games, and the shadow maps of real-time renderers. <strong>Orthographic projection</strong> projects along parallel lines, so distance doesn't change size and parallel lines stay parallel. It maps a box (left <em>l</em> to right <em>r</em>, bottom <em>b</em> to top <em>t</em>, near <em>n</em> to far <em>f</em><sub>ar</sub>) to the NDC cube with a scale and a translation:</p>
<p class="math"><em>x</em><sub>ndc</sub> = 2(<em>x</em> − <em>l</em>)/(<em>r</em> − <em>l</em>) − 1,&nbsp; <em>y</em><sub>ndc</sub> = 2(<em>y</em> − <em>b</em>)/(<em>t</em> − <em>b</em>) − 1,&nbsp; <em>z</em><sub>ndc</sub> = −2(<em>z</em> + <em>n</em>)/(<em>f</em><sub>ar</sub> − <em>n</em>) − 1</p>
<p>Its matrix's last row is (0, 0, 0, 1), so <em>w</em> stays 1 and the divide does nothing. Depth is linear in distance here. The rest of the pipeline is unchanged: the same viewport mapping, the same rasterizer.</p>
<p class="note">Why it matters: a graphics card runs a small program (a vertex shader) on every vertex whose main job is exactly this lesson: multiply by the combined model, view and projection matrix. The hardware then does the divide and the viewport mapping itself.</p>
`,
    terms: [
      ["World coordinates", "The shared coordinate system in which a scene's objects are placed."],
      ["Camera coordinates", "Coordinates with the camera at the origin, looking down −z, x to its right and y up."],
      ["Look-at", "Building the camera's axes from the eye, a target and an up vector with two cross products."],
      ["View matrix", "The matrix taking world coordinates to camera coordinates."],
      ["Field of view", "The angle the camera sees, here measured from the bottom of the picture to the top."],
      ["Aspect ratio", "Image width divided by height."],
      ["Perspective matrix", "A 4 × 4 matrix that puts the distance −z into w, scales x and y to the field of view, and maps depth between the near and far planes."],
      ["Perspective divide", "Dividing clip coordinates by w, which makes distant things smaller."],
      ["Normalized device coordinates", "Coordinates after the divide, in which the visible region is the cube from −1 to 1."],
      ["View frustum", "The visible region: a pyramid from the eye, cut by the near and far planes."],
      ["Clipping", "Cutting triangles against the frustum so that only the visible part remains."],
      ["Viewport mapping", "Scaling NDC to pixel positions, flipping y because rows count downward."],
      ["Orthographic projection", "Projection along parallel lines, with no perspective divide."]
    ],
    quiz: [
      { q: "In camera coordinates (the OpenGL convention), which way does the camera look?", choices: ["+z", "−z", "+y", "+x"], answer: 1, why: "Points in front of the camera have negative z." },
      { q: "In the perspective divide, clip coordinates are divided by w. What is w for a camera-space point?", choices: ["Always 1", "Its distance in front of the camera, −z", "The aspect ratio", "The near-plane distance"], answer: 1, why: "The matrix's last row is (0, 0, −1, 0)." },
      { q: "With a perspective matrix, where does a point on the near plane end up in depth?", choices: ["z_ndc = 0", "z_ndc = −1", "z_ndc = 1", "Depends on its x and y"], answer: 1, why: "A and B are chosen so the near plane maps to −1 and the far plane to +1." },
      { q: "Why does the viewport mapping use (1 − y_ndc) rather than (y_ndc + 1)?", choices: ["To keep values positive", "Camera y points up but pixel rows count down", "To correct for the aspect ratio", "It's a gamma correction"], answer: 1, why: "y_ndc = 1 (the top of the view) must become row 0." },
      { q: "What does orthographic projection preserve that perspective does not?", choices: ["Nothing", "The size of objects regardless of distance, and parallel lines", "Depth precision near the camera", "Color"], answer: 1, why: "It projects along parallel lines with no divide." },
      { q: "Why must the up vector not be parallel to the viewing direction in look-at?", choices: ["The cross product up × w would be zero, so no right vector can be made", "The view would be upside down", "The perspective divide fails", "It makes the field of view zero"], answer: 0, why: "A zero vector can't be normalized." }
    ],
    practice: [
      {
        q: `<p>A person 2 m tall stands 10 m in front of a pinhole camera whose image plane is 1 cm behind the hole. How tall is the image? How tall at 20 m?</p>`,
        a: `<p>By similar triangles, image height = <em>d</em> · <em>y</em>/distance = 0.01 × 2/10 = 0.002 m = 2 mm (upside down, since it's behind the hole). At 20 m, 1 mm: twice as far, half as tall.</p>`
      },
      {
        q: `<p>Project the camera-space point (−2, 0.5, −8) with fov<sub>y</sub> = 60°, aspect 1 and a 100 × 100 image. Which pixel does it land in?</p>`,
        a: `<p><em>f</em> = 1/tan 30° ≈ 1.7321 and <em>w</em> = 8. NDC: <em>x</em> = 1.7321 × (−2)/8 ≈ −0.4330, <em>y</em> = 1.7321 × 0.5/8 ≈ 0.1083. Pixels: <em>p<sub>x</sub></em> = (1 − 0.4330)/2 × 100 ≈ 28.35, <em>p<sub>y</sub></em> = (1 − 0.1083)/2 × 100 ≈ 44.59. So pixel (28, 44): left of centre and a little above it, as expected for a point to the left and slightly up.</p>`
      },
      {
        q: `<p>A game uses <em>n</em> = 0.1 and <em>f</em><sub>ar</sub> = 1000. What is <em>z</em><sub>ndc</sub> for a point 1 unit away? What fraction of the depth range [−1, 1] covers everything beyond that point? What would you change?</p>`,
        a: `<p><em>z</em><sub>ndc</sub> = 1000.1/999.9 + 2 × 1000 × 0.1/(999.9 × (−1)) ≈ 1.0002 − 0.2000 = 0.8002. Everything from 1 to 1000 units shares the range 0.8002 to 1, about 10% of the total, so distant surfaces get very few depth values and z-fighting is likely. Move the near plane out (to 1, say): the ratio <em>f</em><sub>ar</sub>/<em>n</em> controls the precision.</p>`
      },
      {
        q: `<p>An orthographic camera sees the box <em>l</em> = −4, <em>r</em> = 4, <em>b</em> = −3, <em>t</em> = 3, <em>n</em> = 1, <em>f</em><sub>ar</sub> = 11. Find the NDC of the camera-space point (2, −3, −6), and its pixel in a 80 × 60 image.</p>`,
        a: `<p><em>x</em><sub>ndc</sub> = 2(2 + 4)/8 − 1 = 0.5; <em>y</em><sub>ndc</sub> = 2(−3 + 3)/6 − 1 = −1 (the bottom edge); <em>z</em><sub>ndc</sub> = −2(−6 + 1)/10 − 1 = 0 (halfway between near and far, since orthographic depth is linear). Pixels: <em>p<sub>x</sub></em> = 1.5/2 × 80 = 60 and <em>p<sub>y</sub></em> = 2/2 × 60 = 60, the bottom edge of the image. Row 60 doesn't exist (rows are 0–59), so the point is clamped into the last row: pixel (60, 59).</p>`
      }
    ],
    sources: ["fcg", "scratchapixel"]
  }
]);

CSA.addUnits("cs350", [
  {
    id: "gr4",
    title: "Rasterizing triangles",
    minutes: 90,
    summary: "Why everything is made of triangles, edge functions and the inside test, barycentric coordinates, fill rules (the top-left rule) so that shared edges are drawn exactly once, interpolating colors and depth across a triangle, perspective-correct interpolation, the z-buffer for hidden surfaces, and how the pieces form a complete software rasterizer.",
    notes: `
<p>Lesson 3 carried each vertex of a model to a position on the screen. Now we fill in the shapes between them. Almost every real-time renderer draws only <strong>triangles</strong>: any surface can be approximated by a <strong>mesh</strong> of them, three points always lie in one plane, and a triangle stays a triangle under every transformation and projection of Lessons 2 and 3. A detailed game character has tens of thousands of triangles; graphics cards fill billions a second. This lesson builds the filling, called <strong>rasterization</strong>, from one function.</p>

<h3>Edge functions</h3>
<p>For screen points <strong>a</strong>, <strong>b</strong> and <strong>p</strong>, the <strong>edge function</strong> is</p>
<p class="math"><em>E</em>(<strong>a</strong>, <strong>b</strong>, <strong>p</strong>) = (<em>b<sub>x</sub></em> − <em>a<sub>x</sub></em>)(<em>p<sub>y</sub></em> − <em>a<sub>y</sub></em>) − (<em>b<sub>y</sub></em> − <em>a<sub>y</sub></em>)(<em>p<sub>x</sub></em> − <em>a<sub>x</sub></em>)</p>
<p>It is the <em>z</em>-component of the cross product (<strong>b</strong> − <strong>a</strong>) × (<strong>p</strong> − <strong>a</strong>), so its size is twice the area of the triangle <strong>a</strong>, <strong>b</strong>, <strong>p</strong>, and its sign says which side of the line through <strong>a</strong> and <strong>b</strong> the point <strong>p</strong> is on. It is zero exactly on the line. Like Bresenham's <em>F</em> in Lesson 1, it is linear in <strong>p</strong>: moving <strong>p</strong> one pixel right changes it by the constant −(<em>b<sub>y</sub></em> − <em>a<sub>y</sub></em>), and one pixel down by <em>b<sub>x</sub></em> − <em>a<sub>x</sub></em>. (With <em>y</em> pointing down the screen, <em>E</em> &gt; 0 means <strong>p</strong> is on your right as you walk from <strong>a</strong> to <strong>b</strong>.)</p>
<p>A point is inside a triangle exactly when it is on the inner side of all three edges. If the vertices are listed in the order that makes <em>E</em>(<strong>a</strong>, <strong>b</strong>, <strong>c</strong>) &gt; 0, that means all three of <em>E</em>(<strong>b</strong>, <strong>c</strong>, <strong>p</strong>), <em>E</em>(<strong>c</strong>, <strong>a</strong>, <strong>p</strong>) and <em>E</em>(<strong>a</strong>, <strong>b</strong>, <strong>p</strong>) are positive. This idea is Pineda's (1988), and it suits hardware: every pixel's test is independent of every other's, so thousands can run in parallel.</p>

<h3>Barycentric coordinates</h3>
<p>Divide each edge function by the whole triangle's <em>E</em>(<strong>a</strong>, <strong>b</strong>, <strong>c</strong>):</p>
<p class="math"><em>λ</em><sub>a</sub> = <em>E</em>(<strong>b</strong>, <strong>c</strong>, <strong>p</strong>) / <em>E</em>(<strong>a</strong>, <strong>b</strong>, <strong>c</strong>),&nbsp; <em>λ</em><sub>b</sub> = <em>E</em>(<strong>c</strong>, <strong>a</strong>, <strong>p</strong>) / <em>E</em>(<strong>a</strong>, <strong>b</strong>, <strong>c</strong>),&nbsp; <em>λ</em><sub>c</sub> = <em>E</em>(<strong>a</strong>, <strong>b</strong>, <strong>p</strong>) / <em>E</em>(<strong>a</strong>, <strong>b</strong>, <strong>c</strong>)</p>
<p>These are the <strong>barycentric coordinates</strong> of <strong>p</strong>: <em>λ</em><sub>a</sub> is the area of the small triangle opposite <strong>a</strong> as a fraction of the whole. They always add up to 1 (the three small triangles fill the big one), and</p>
<p class="math"><strong>p</strong> = <em>λ</em><sub>a</sub><strong>a</strong> + <em>λ</em><sub>b</sub><strong>b</strong> + <em>λ</em><sub>c</sub><strong>c</strong></p>
<p>At vertex <strong>a</strong>, <em>λ</em><sub>a</sub> = 1 and the others are 0; along the edge opposite <strong>a</strong>, <em>λ</em><sub>a</sub> = 0. Dividing by the signed area also makes the vertex order irrelevant: <strong>p</strong> is inside exactly when all three weights are positive, whichever way round the triangle was listed. The weights are what we'll use to blend colors and depths across the triangle.</p>
<pre><code>def edge(a, b, p):
    return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])

a, b, c = (1, 1), (7, 2), (2, 6)
p = (3, 2)
print(edge(a, b, c))                               # 29
print(edge(b, c, p), edge(c, a, p), edge(a, b, p))   # 16 9 4</code></pre>
<p>So <strong>p</strong> = (3, 2) has weights 16/29, 9/29 and 4/29: all positive, so it is inside, nearest to <strong>a</strong>. Check: (16(1, 1) + 9(7, 2) + 4(2, 6))/29 = (87, 58)/29 = (3, 2).</p>
<figure class="fig">
<svg viewBox="0 0 270 205" width="270" role="img" aria-label="A triangle with vertices a at top left, b at right and c at the bottom, drawn over a pixel grid. A point p inside is joined to all three vertices, splitting the triangle into three smaller triangles; the one opposite a is shaded and labelled lambda a.">
  <path class="ln" d="M10 5 H250 M10 35 H250 M10 65 H250 M10 95 H250 M10 125 H250 M10 155 H250 M10 185 H250 M10 5 V185 M40 5 V185 M70 5 V185 M100 5 V185 M130 5 V185 M160 5 V185 M190 5 V185 M220 5 V185 M250 5 V185" opacity="0.35"/>
  <polygon class="soft" points="220,65 70,185 100,65"/>
  <polygon class="outline" points="40,35 220,65 70,185"/>
  <line class="ln dash" x1="100" y1="65" x2="40" y2="35"/>
  <line class="ln dash" x1="100" y1="65" x2="220" y2="65"/>
  <line class="ln dash" x1="100" y1="65" x2="70" y2="185"/>
  <circle class="dot" cx="100" cy="65" r="4"/>
  <text class="text" x="26" y="32">a</text><text class="text" x="226" y="62">b</text><text class="text" x="56" y="198">c</text>
  <text class="text" x="100" y="56">p</text>
  <text class="text m" x="120" y="105">λa</text>
</svg>
<figcaption>Vertices <strong>a</strong> = (1, 1), <strong>b</strong> = (7, 2), <strong>c</strong> = (2, 6) on a pixel grid (<em>y</em> down), with <strong>p</strong> = (3, 2). The shaded triangle <strong>p</strong>, <strong>b</strong>, <strong>c</strong> is 16/29 of the whole, so <em>λ</em><sub>a</sub> = 16/29.</figcaption>
</figure>

<h3>Covering pixels, and fill rules</h3>
<p>A pixel belongs to a triangle when its <em>centre</em> (<em>i</em> + 0.5, <em>j</em> + 0.5) is inside. Rather than test every pixel of the image, test only those in the triangle's <strong>bounding box</strong>, the smallest rectangle of pixels containing its three vertices, clipped to the image.</p>
<p>What about a centre exactly on an edge, with a weight of exactly 0? Meshes share edges: two triangles that make up a square share the diagonal. If both include such centres, those pixels are drawn twice (wrong if the triangles are transparent, since the pixel gets blended twice); if neither does, there are holes. Count both choices for an 8 × 8 square split along its diagonal, whose centres (<em>i</em> + 0.5, <em>j</em> + 0.5) with <em>i</em> + <em>j</em> = 7 lie exactly on the diagonal:</p>
<pre><code>def count(tri, width, height, rule):
    a, b, c = tri
    area = edge(a, b, c)
    n = 0
    for j in range(height):
        for i in range(width):
            p = (i + 0.5, j + 0.5)
            ws = [edge(b, c, p) / area, edge(c, a, p) / area, edge(a, b, p) / area]
            if rule(ws):
                n += 1
    return n

upper_left = ((0, 0), (8, 0), (0, 8))
lower_right = ((8, 0), (8, 8), (0, 8))
include = lambda ws: all(w >= 0 for w in ws)
exclude = lambda ws: all(w > 0 for w in ws)
print(count(upper_left, 8, 8, include) + count(lower_right, 8, 8, include))   # 72
print(count(upper_left, 8, 8, exclude) + count(lower_right, 8, 8, exclude))   # 56</code></pre>
<p>The square has 64 pixels: including edges draws the 8 diagonal pixels twice, excluding them leaves 8 holes. A <strong>fill rule</strong> decides, for each edge, whether it owns the centres that lie exactly on it, so that of two triangles sharing an edge exactly one does. The standard choice, used by Direct3D and most hardware, is the <strong>top-left rule</strong>: a centre on an edge counts if the edge is a <em>left</em> edge (the triangle's interior lies on its screen-right side, toward +<em>x</em>) or a <em>top</em> edge (exactly horizontal, with the interior below it). Here "right" means the +<em>x</em> direction on the screen, not your right as you walk along the edge as in the remark about <em>E</em> above; walking direction doesn't matter.</p>
<p>The gradient of a weight makes this a simple test. As <strong>p</strong> moves, <em>λ</em><sub>a</sub> = <em>E</em>(<strong>b</strong>, <strong>c</strong>, <strong>p</strong>)/<em>A</em> (where <em>A</em> = <em>E</em>(<strong>a</strong>, <strong>b</strong>, <strong>c</strong>)) changes at the constant rates <strong>g</strong> = (−(<em>c<sub>y</sub></em> − <em>b<sub>y</sub></em>), <em>c<sub>x</sub></em> − <em>b<sub>x</sub></em>)/<em>A</em> per pixel, and since <em>λ</em><sub>a</sub> grows toward the inside, <strong>g</strong> points from the edge into the triangle. So the edge is a left edge when <em>g<sub>x</sub></em> &gt; 0, and a top edge when <em>g<sub>x</sub></em> = 0 and <em>g<sub>y</sub></em> &gt; 0 (<em>y</em> points down). Two triangles sharing an edge see it with opposite gradients, so exactly one of them owns it. At a vertex two weights are zero, and the centre counts only if both edges meeting there own it. In the square, the diagonal's gradient points up and left (<em>g<sub>x</sub></em> &lt; 0) for the upper-left triangle and down and right for the lower-right one, so the lower-right triangle gets the 8 diagonal pixels: 28 + 36 = 64. Every pixel exactly once.</p>

<h3>Interpolating attributes</h3>
<p>Vertices carry more than positions: colors, depths, texture coordinates (Lesson 5), normals. Inside the triangle, blend them with the weights: a value <em>q</em> given at the vertices becomes <em>q</em> = <em>λ</em><sub>a</sub><em>q</em><sub>a</sub> + <em>λ</em><sub>b</sub><em>q</em><sub>b</sub> + <em>λ</em><sub>c</sub><em>q</em><sub>c</sub> at each covered pixel. With red, green and blue vertices this gives the familiar smoothly shaded triangle.</p>
<p>There is a subtlety. The weights are computed on the screen, after the perspective divide, and the divide doesn't preserve proportions along a line: equal steps across the screen are not equal steps across the surface in 3D. Blending screen-space weights directly makes textures on a receding floor visibly swim. The fix uses the fact that, after the divide, 1/<em>w</em> and <em>q</em>/<em>w</em> <em>do</em> vary linearly across the screen (here <em>w</em> = −<em>z</em> is the vertex's clip <em>w</em> from Lesson 3). So interpolate those two and divide: this is <strong>perspective-correct interpolation</strong>.</p>
<pre><code># one end of an edge has q = 0 at w = 1, the other q = 1 at w = 3
s = 0.5                                   # halfway across the screen
naive = (1 - s) * 0 + s * 1
correct = ((1 - s) * 0 / 1 + s * 1 / 3) / ((1 - s) / 1 + s / 3)
print(naive, correct)                     # 0.5 0.25</code></pre>
<p>Check with real points: (−1, 0, −1) and (3, 0, −3) project (with <em>f</em> = 1) to screen <em>x</em> = −1 and 1. The screen midpoint, <em>x</em> = 0, is where (−1 + 4<em>t</em>, 0, −1 − 2<em>t</em>) has <em>x</em> = 0, at <em>t</em> = 0.25 along the 3D segment, not 0.5. The near half of the segment fills more of the screen, as it should. Graphics hardware does this division at every pixel. (Depth itself needs no correction: Lesson 3's <em>z</em><sub>ndc</sub> = −<em>A</em> − <em>B</em>/<em>z</em> is a combination of 1 and 1/<em>w</em>, so it is already linear on the screen.)</p>

<h3>Hidden surfaces: the z-buffer</h3>
<p>When triangles overlap, the nearer one must win, whatever order they are drawn in. The <strong>z-buffer</strong> (or depth buffer), introduced by Catmull in 1974, stores a depth for every pixel alongside its color, starting at infinity (nothing drawn). For each covered pixel, interpolate the triangle's depth there; if it is less than the stored depth, write both color and depth; otherwise skip the pixel. Each pixel ends up showing the nearest surface at its centre. The cost is one comparison per covered pixel and one number of memory per pixel; it handles triangles that cross each other, which no ordering of whole triangles can.</p>
<pre><code>import math

def rasterize(width, height, tris):
    depth = [[math.inf] * width for _ in range(height)]
    image = [["."] * width for _ in range(height)]
    for v0, v1, v2, ch in tris:
        area = edge(v0, v1, v2)
        for j in range(height):
            for i in range(width):
                p = (i + 0.5, j + 0.5)
                l0 = edge(v1, v2, p) / area
                l1 = edge(v2, v0, p) / area
                l2 = edge(v0, v1, p) / area
                if l0 >= 0 and l1 >= 0 and l2 >= 0:
                    z = l0 * v0[2] + l1 * v1[2] + l2 * v2[2]
                    if z &lt; depth[j][i]:
                        depth[j][i] = z
                        image[j][i] = ch
    return image

tris = [((1, 1, 0.5), (19, 2, 0.5), (4, 9, 0.5), "#"),
        ((6, 0, 0.9), (18, 9, 0.1), (2, 7, 0.9), "o")]
for row in rasterize(20, 10, tris):
    print("".join(row))</code></pre>
<pre data-label="Output"><code>......o.............
.#########..........
..################..
..##############....
..############......
...########oo.......
..o######oooooo.....
...####ooooooooo....
....#.........ooo...
....................</code></pre>
<p>The "#" triangle is at constant depth 0.5. The "o" triangle tilts from depth 0.9 at its top two corners to 0.1 at its lower right, so it passes <em>through</em> the other one: hidden at the top, in front at the bottom. (This simple version tests every pixel and includes edges; the graded problem adds the bounding box and the top-left rule.)</p>

<h3>A complete tiny rasterizer</h3>
<p>Everything so far fits together into the pipeline that every graphics card implements in hardware:</p>
<ol>
<li>For each vertex: multiply by the model, view and projection matrices (Lessons 2 and 3) to get clip coordinates.</li>
<li>Clip triangles against the frustum, then divide by <em>w</em> and apply the viewport mapping to get pixel positions and depths.</li>
<li>For each triangle: loop over its bounding box, test each pixel centre with the edge functions and the fill rule.</li>
<li>For each covered pixel: interpolate depth and run the z-test; if it passes, interpolate the other attributes (perspective-correctly), compute a color (Lesson 5) and write it.</li>
<li>Write the image as PPM (Lesson 1), encoding linear colors to sRGB.</li>
</ol>
<p>A cube is 12 triangles (two per face); a 64 × 64 image of it takes only a few thousand edge tests, quick even in pure Python. Optionally, triangles facing away from the camera can be skipped before step 3, found from the sign of <em>E</em>(<strong>a</strong>, <strong>b</strong>, <strong>c</strong>) on the screen. Take a mesh listed counterclockwise as seen from outside (Lesson 2). A face turned toward the camera is seen from outside, so it looks counterclockwise on the screen too. But with <em>y</em> pointing down, <em>E</em> is positive for triangles that look <em>clockwise</em>: the example above, <strong>a</strong> → <strong>b</strong> → <strong>c</strong> going top left, right, bottom left, has <em>E</em> = 29. So front faces have <em>E</em> &lt; 0, and back faces, seen from inside so that their order looks reversed, have <em>E</em> &gt; 0; those are the ones skipped. This <strong>back-face culling</strong> halves the work for closed objects, whose back faces are always hidden.</p>
<p class="note">Why it matters: steps 3 and 4 are where a GPU's thousands of cores go. The edge tests and interpolations for different pixels are independent, the data parallelism of CS 230 Lesson 8.</p>
`,
    terms: [
      ["Mesh", "A surface approximated by triangles that share vertices and edges."],
      ["Rasterization", "Finding the pixels a shape covers and computing a color for each."],
      ["Edge function", "E(a, b, p), twice the signed area of triangle a, b, p: zero on the line through a and b, its sign giving the side."],
      ["Barycentric coordinates", "Weights λa, λb, λc summing to 1 with p = λa·a + λb·b + λc·c; all are positive exactly inside the triangle."],
      ["Bounding box", "The smallest rectangle of pixels containing a triangle; only these need testing."],
      ["Fill rule", "A rule deciding which triangle owns pixel centres lying exactly on a shared edge."],
      ["Top-left rule", "A centre on an edge is covered only if the edge is a left edge or a horizontal top edge of the triangle."],
      ["Perspective-correct interpolation", "Interpolating q/w and 1/w linearly on the screen and dividing, so attributes vary correctly across a surface in 3D."],
      ["Z-buffer", "A per-pixel array of the nearest depth drawn so far; a new pixel is written only if it is nearer."],
      ["Back-face culling", "Skipping triangles that face away from the camera, detected from the sign of their screen area."]
    ],
    quiz: [
      { q: "What does E(a, b, p) = 0 mean?", choices: ["p is at vertex a", "p lies on the line through a and b", "p is inside the triangle", "The triangle is degenerate"], answer: 1, why: "The edge function is zero exactly on the line through a and b." },
      { q: "What do the three barycentric coordinates of any point always add up to?", choices: ["0", "1", "The triangle's area", "It depends on the point"], answer: 1, why: "The three small triangles together make up the whole triangle." },
      { q: "Why does a rasterizer need a fill rule such as the top-left rule?", choices: ["To speed up the edge tests", "So that pixels on an edge shared by two triangles are drawn exactly once", "To make triangles look smoother", "To decide which triangle is in front"], answer: 1, why: "Including both gives double drawing; excluding both gives holes." },
      { q: "What value should each entry of the z-buffer start with?", choices: ["0", "Infinity (farther than anything)", "−1", "The near-plane distance"], answer: 1, why: "Any surface drawn must be nearer than 'nothing'." },
      { q: "To interpolate a texture coordinate q perspective-correctly, which quantities are interpolated linearly across the screen?", choices: ["q and z", "q/w and 1/w", "q·w and w", "Only q"], answer: 1, why: "After the divide, q/w and 1/w are linear in screen coordinates; divide one by the other." },
      { q: "Two triangles cross each other in 3D. What draws them correctly?", choices: ["Drawing the farther triangle first", "Drawing the nearer triangle first", "A per-pixel z-buffer", "Back-face culling"], answer: 2, why: "Neither triangle is entirely in front, so no order of whole triangles works; a per-pixel depth test does." }
    ],
    practice: [
      {
        q: `<p>Find the barycentric coordinates of (4, 3) in the triangle (0, 0), (8, 0), (0, 8). If the vertices have depths 0.2, 0.6 and 1.0, what depth does the pixel get?</p>`,
        a: `<p><em>E</em>(<strong>a</strong>, <strong>b</strong>, <strong>c</strong>) = 8 · 8 − 0 · 0 = 64. <em>E</em>(<strong>b</strong>, <strong>c</strong>, <strong>p</strong>) = (0 − 8)(3 − 0) − (8 − 0)(4 − 8) = −24 + 32 = 8; <em>E</em>(<strong>c</strong>, <strong>a</strong>, <strong>p</strong>) = (0 − 0)(3 − 8) − (0 − 8)(4 − 0) = 32; <em>E</em>(<strong>a</strong>, <strong>b</strong>, <strong>p</strong>) = 8 · 3 − 0 · 4 = 24. Weights 1/8, 1/2, 3/8 (sum 1). Check: (1/2)(8, 0) + (3/8)(0, 8) = (4, 3). Depth: 0.2/8 + 0.6/2 + 3(1.0)/8 = 0.025 + 0.3 + 0.375 = 0.7.</p>
<pre><code>print(edge((8, 0), (0, 8), (4, 3)), edge((0, 8), (0, 0), (4, 3)), edge((0, 0), (8, 0), (4, 3)))   # 8 32 24</code></pre>`
      },
      {
        q: `<p>For the triangle (2, 1), (10, 1), (6, 9) on the screen (<em>y</em> down), which edges own the pixel centres that lie exactly on them under the top-left rule?</p>`,
        a: `<p>The edge from (2, 1) to (10, 1) is horizontal with the interior below it: a top edge, so it owns its centres (here none lie on it, since centres have <em>y</em> = <em>j</em> + 0.5). The edge from (6, 9) to (2, 1) has the interior on its screen-right (+<em>x</em>) side: a left edge, which owns its centres. The edge from (10, 1) to (6, 9) has the interior on its −<em>x</em> side: a right edge, which doesn't. You can confirm with the gradient: for the right edge, the weight of (2, 1) grows toward the left, so <em>g<sub>x</sub></em> &lt; 0.</p>`
      },
      {
        q: `<p>A thin triangle runs diagonally from (0, 0) to (100, 100) with its third vertex at (1, 0). How many pixels does it roughly cover, and how many does its bounding box contain? What does this suggest about the bounding-box method?</p>`,
        a: `<p>Its area is half of |<em>E</em>| = |(100)(0) − (100)(1)|/2 = 50 square pixels, so it covers about 50 pixels, but its bounding box is 100 × 100 = 10,000 pixels: 99.5% of the tests fail. Real rasterizers split the screen into small tiles and skip tiles that lie wholly outside an edge, or walk along the triangle row by row; long thin triangles are also avoided when building meshes.</p>`
      },
      {
        q: `<p>An edge has <em>q</em> = 0 at a vertex with <em>w</em> = 2 and <em>q</em> = 1 at a vertex with <em>w</em> = 4. What is the perspective-correct <em>q</em> a quarter of the way across the screen from the first vertex?</p>`,
        a: `<p>With <em>s</em> = 1/4: <em>q</em>/<em>w</em> interpolates to (3/4)(0/2) + (1/4)(1/4) = 1/16, and 1/<em>w</em> to (3/4)(1/2) + (1/4)(1/4) = 7/16. Dividing, <em>q</em> = 1/7 ≈ 0.143, less than the naive 0.25 because the near end fills more of the screen.</p>
<pre><code>s = 0.25
print(round((s * 1 / 4) / ((1 - s) / 2 + s / 4), 4))   # 0.1429</code></pre>`
      }
    ],
    sources: ["fcg", "scratchapixel", "pineda88"]
  },
  {
    id: "gr5",
    title: "Shading and lighting",
    minutes: 90,
    summary: "Surface normals for meshes, Lambert's cosine law for diffuse light, Phong and Blinn–Phong specular highlights, ambient light, flat, Gouraud and per-pixel shading, textures and texture coordinates, nearest and bilinear filtering, and aliasing and supersampling.",
    notes: `
<p>Lesson 4 filled each triangle with interpolated colors. Real surfaces get their colors from light: a ball is bright where it faces the lamp, dark on the far side, with a small shiny highlight. This lesson computes such colors with a <strong>local illumination model</strong>: the light reaching the eye from a surface point, worked out from the point's normal, the direction to a light and the direction to the eye. Every computation here is in linear light (Lesson 1), and the final color is encoded to sRGB at the end.</p>

<h3>Normals for meshes</h3>
<p>Lesson 2 gave a triangle's normal as a cross product of two edges. That gives a <strong>face normal</strong>, the same over the whole triangle, which makes a smooth surface such as a sphere look faceted. For a mesh approximating a smooth surface, store a <strong>vertex normal</strong> at each vertex: the true surface normal there, if known (for a sphere, the direction from the centre), or else the normalized average of the face normals of the triangles that share the vertex. Normals are always made unit length before use, written <strong>n̂</strong> or simply <strong>n</strong> below.</p>
<p>Three unit vectors describe the geometry at a surface point: the normal <strong>n</strong>, the direction <strong>l</strong> toward the light, and the direction <strong>v</strong> toward the viewer. All point <em>away</em> from the surface.</p>
<figure class="fig">
<svg viewBox="0 0 360 190" width="360" role="img" aria-label="A flat surface with a point P. The normal n points straight up from P. The vector l points up and to the left toward a light; v points up and to the right toward the eye. The mirror direction r of l is on the right, close to v. The halfway vector h lies between l and v, close to n.">
  <defs><marker id="arr-gr5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" class="hl"/></marker></defs>
  <line class="ln" x1="30" y1="160" x2="330" y2="160"/>
  <line class="hl" x1="180" y1="160" x2="180" y2="40" marker-end="url(#arr-gr5)"/>
  <line class="hl" x1="180" y1="160" x2="90" y2="50" marker-end="url(#arr-gr5)"/>
  <line class="hl" x1="180" y1="160" x2="290" y2="70" marker-end="url(#arr-gr5)"/>
  <line class="ln dash" x1="180" y1="160" x2="270" y2="50"/>
  <line class="ln dash" x1="180" y1="160" x2="190" y2="42"/>
  <text class="text" x="174" y="32">n</text>
  <text class="text" x="78" y="44">l</text>
  <text class="text" x="296" y="70">v</text>
  <text class="text m" x="272" y="44">r</text>
  <text class="text m" x="196" y="50">h</text>
  <text class="text m" x="174" y="178">P</text>
  <text class="text m" x="46" y="70">light</text><text class="text m" x="300" y="88">eye</text>
</svg>
<figcaption>The vectors at a surface point: normal <strong>n</strong>, light direction <strong>l</strong>, view direction <strong>v</strong>, the mirror direction <strong>r</strong> of <strong>l</strong>, and the halfway vector <strong>h</strong> between <strong>l</strong> and <strong>v</strong>.</figcaption>
</figure>

<h3>Diffuse reflection: Lambert's law</h3>
<p>A matte surface (paper, plaster, unpolished wood) scatters incoming light equally in all directions, so it looks equally bright from every viewpoint. How much light it receives depends on its angle to the light. A beam of cross-section <em>A</em> arriving at angle <em>θ</em> from the normal spreads over an area <em>A</em>/cos <em>θ</em> of surface, so each unit of surface gets cos <em>θ</em> as much light as when the beam arrives head-on. This is <strong>Lambert's cosine law</strong>, and for unit vectors cos <em>θ</em> = <strong>n</strong> · <strong>l</strong>:</p>
<p class="math">diffuse = <em>k</em><sub>d</sub> · <em>I</em> · max(0, <strong>n</strong> · <strong>l</strong>)</p>
<p>where <em>I</em> is the light's intensity (one value per color channel) and <em>k</em><sub>d</sub> the surface's <strong>diffuse color</strong>, the fraction of each channel it reflects. The max with 0 handles surfaces facing away from the light, which get nothing. Sunlight at 60° from the normal delivers cos 60° = half of its head-on light; that is why winter sunlight, arriving at a low angle, warms the ground less.</p>

<h3>Specular highlights: Phong and Blinn–Phong</h3>
<p>Shiny surfaces (plastic, polished metal, wet skin) also reflect light near the mirror direction, producing a <strong>specular highlight</strong> that moves as the viewer moves. A perfect mirror would send the light only in the reflected direction <strong>r</strong> = 2(<strong>n</strong> · <strong>l</strong>)<strong>n</strong> − <strong>l</strong>: keep the part of <strong>l</strong> along <strong>n</strong> and reverse the part along the surface. Real surfaces are slightly rough, so the highlight is spread out. Phong's model (1975) makes the highlight fall off as a power of the angle between <strong>r</strong> and <strong>v</strong>:</p>
<p class="math">specular = <em>k</em><sub>s</sub> · <em>I</em> · max(0, <strong>r</strong> · <strong>v</strong>)<sup><em>s</em></sup></p>
<p>The <strong>shininess</strong> exponent <em>s</em> controls the size: around 10 for a broad, dull sheen, several hundred for a tight, glossy spot. Blinn (1977) proposed a cheaper and better-behaved variant using the <strong>halfway vector</strong> <strong>h</strong> = normalize(<strong>l</strong> + <strong>v</strong>), the direction halfway between light and viewer. The highlight is brightest when <strong>h</strong> = <strong>n</strong>, which happens exactly when <strong>v</strong> is the mirror direction, so <strong>Blinn–Phong</strong> replaces <strong>r</strong> · <strong>v</strong> by <strong>n</strong> · <strong>h</strong>:</p>
<p class="math">specular = <em>k</em><sub>s</sub> · <em>I</em> · max(0, <strong>n</strong> · <strong>h</strong>)<sup><em>s</em></sup></p>
<p>The angle between <strong>n</strong> and <strong>h</strong> is about half that between <strong>r</strong> and <strong>v</strong>, so Blinn–Phong needs an exponent about four times larger for a highlight of the same size. The reason: for a small angle <em>θ</em>, cos <em>θ</em> ≈ 1 − <em>θ</em><sup>2</sup>/2 (its degree-2 Taylor polynomial, MATH 131 Lesson 5), and 1 − <em>x</em> ≈ <em>e</em><sup>−<em>x</em></sup> for small <em>x</em>, so cos <em>θ</em> ≈ <em>e</em><sup>−<em>θ</em>²/2</sup> and cos<sup><em>n</em></sup> <em>θ</em> ≈ <em>e</em><sup>−<em>nθ</em>²/2</sup>. The highlight's brightness depends on <em>nθ</em><sup>2</sup>: halving <em>θ</em> divides <em>θ</em><sup>2</sup> by 4, so <em>n</em> must be 4 times larger to give the same value. (For example, cos<sup>100</sup> 0.1 = 0.606 and <em>e</em><sup>−0.5</sup> = 0.607.) It is the model in OpenGL's original fixed-function pipeline. A specular term is only added when <strong>n</strong> · <strong>l</strong> &gt; 0: a surface facing away from the light can't reflect it.</p>

<h3>Ambient light and the full model</h3>
<p>Light bounces off walls and floors, so even surfaces facing away from every light aren't black. Computing those bounces is the subject of Lesson 6; the local model fakes them with a constant <strong>ambient</strong> term <em>k</em><sub>d</sub> · <em>I</em><sub>a</sub>. The full Blinn–Phong model, per channel, is</p>
<p class="math">color = <em>k</em><sub>d</sub><em>I</em><sub>a</sub> + <em>I</em>(<em>k</em><sub>d</sub> max(0, <strong>n</strong> · <strong>l</strong>) + <em>k</em><sub>s</sub> max(0, <strong>n</strong> · <strong>h</strong>)<sup><em>s</em></sup>)</p>
<p>summed over the lights. Specular light usually has the light's color, not the surface's (a red plastic ball has a white highlight), which is why <em>k</em><sub>s</sub> is a single number here.</p>
<div class="callout"><p><b>Example.</b> Surface point at the origin, <strong>n</strong> = (0, 0, 1), eye at (0, 0, 5), a white light (<em>I</em> = 1) at (3, 0, 4). <em>k</em><sub>d</sub> = (0.8, 0.2, 0.2), <em>k</em><sub>s</sub> = 0.5, <em>s</em> = 32, <em>I</em><sub>a</sub> = 0.1.</p></div>
<pre><code>import math

def dot(a, b): return sum(x * y for x, y in zip(a, b))
def normalize(a): n = math.sqrt(dot(a, a)); return tuple(x / n for x in a)

n = (0, 0, 1)
l = normalize((3, 0, 4))
v = normalize((0, 0, 5))
h = normalize(tuple(a + b for a, b in zip(l, v)))
r = tuple(2 * dot(n, l) * ni - li for ni, li in zip(n, l))
print(dot(n, l))                    # 0.8
print([round(x, 4) for x in r])     # [-0.6, 0.0, 0.8]
print(round(dot(r, v) ** 32, 5))    # 0.00079
print(round(dot(n, h) ** 32, 4))    # 0.1853
red = 0.8 * 0.1 + 1 * (0.8 * dot(n, l) + 0.5 * dot(n, h) ** 32)
print(round(red, 4))                # 0.8127</code></pre>
<p>The light is 36.9° from the normal, so diffuse is 0.8 of full. The viewer is 36.9° from the mirror direction: Phong's term (0.8<sup>32</sup>) is almost nothing, while Blinn–Phong's, with the half-size angle, is 0.185; the four-times-larger exponent would bring them close. The red channel is 0.8127, and green and blue are 0.02 + 0.16 + 0.0927 = 0.2727 each. In sRGB: (233, 143, 143).</p>

<h3>Where to shade: flat, Gouraud and per-pixel</h3>
<p>The model can be evaluated at different places:</p>
<ul>
<li><strong>Flat shading</strong>: once per triangle, with its face normal. Cheap, and the facets show.</li>
<li><strong>Gouraud shading</strong> (1971): once per vertex, with the vertex normals, then interpolate the resulting colors across the triangle (Lesson 4). Smooth, but a highlight that falls in the middle of a large triangle, away from every vertex, is missed or smeared.</li>
<li><strong>Per-pixel</strong> (often called Phong shading, a separate idea from Phong's highlight formula): interpolate the <em>normals</em> across the triangle, renormalize, and evaluate the model at every pixel. Highlights land where they should.</li>
</ul>
<p>Per-pixel shading costs a model evaluation per pixel instead of per vertex, which once mattered; modern GPUs run a <em>fragment shader</em> program for every pixel, and per-pixel lighting is standard.</p>

<h3>Textures</h3>
<p>Painting detail with ever-smaller triangles is wasteful. Instead, a <strong>texture</strong> (an image) is wrapped onto the surface, and its texels (texture pixels) supply <em>k</em><sub>d</sub> or other values. Each vertex stores <strong>texture coordinates</strong> (<em>u</em>, <em>v</em>), usually from 0 to 1 across the texture, which are interpolated, perspective-correctly, across the triangle. In this course <em>u</em> runs right and <em>v</em> runs down the texture, like pixel rows; OpenGL puts <em>v</em> = 0 at the bottom instead, a perennial source of upside-down textures. For a texture <em>W</em> texels wide and <em>H</em> high, texel (col, row) covers <em>u</em> from col/<em>W</em> to (col + 1)/<em>W</em> and <em>v</em> from row/<em>H</em> to (row + 1)/<em>H</em>; its centre is at ((col + 0.5)/<em>W</em>, (row + 0.5)/<em>H</em>).</p>
<p><strong>Nearest</strong> filtering takes the texel containing (<em>u</em>, <em>v</em>): column ⌊<em>uW</em>⌋, row ⌊<em>vH</em>⌋, clamped to the texture. When the texture is magnified (one texel covers many pixels), that gives blocky squares. <strong>Bilinear</strong> filtering blends the four texels whose centres surround the sample. Shift to texel-centre coordinates <em>x</em> = <em>uW</em> − 0.5, <em>y</em> = <em>vH</em> − 0.5; the four texels are at columns ⌊<em>x</em>⌋, ⌊<em>x</em>⌋ + 1 and rows ⌊<em>y</em>⌋, ⌊<em>y</em>⌋ + 1, with fractions <em>f<sub>x</sub></em> = <em>x</em> − ⌊<em>x</em>⌋ and <em>f<sub>y</sub></em> = <em>y</em> − ⌊<em>y</em>⌋. Blend along <em>x</em> in both rows, then between the rows:</p>
<p class="math">(1 − <em>f<sub>x</sub></em>)(1 − <em>f<sub>y</sub></em>)<em>t</em><sub>00</sub> + <em>f<sub>x</sub></em>(1 − <em>f<sub>y</sub></em>)<em>t</em><sub>10</sub> + (1 − <em>f<sub>x</sub></em>)<em>f<sub>y</sub></em><em>t</em><sub>01</sub> + <em>f<sub>x</sub></em><em>f<sub>y</sub></em><em>t</em><sub>11</sub></p>
<p>For the 2 × 2 texture with values 0, 1 in its top row and 2, 3 in its bottom row, sampled at (<em>u</em>, <em>v</em>) = (0.6, 0.4): <em>x</em> = 0.7, <em>y</em> = 0.3, so <em>f<sub>x</sub></em> = 0.7 and <em>f<sub>y</sub></em> = 0.3, and the value is 0.21 · 0 + 0.49 · 1 + 0.09 · 2 + 0.21 · 3 = 1.3. Nearest filtering would return the top-right texel's 1. As with any blending of light, texels should be blended as linear values; GPUs decode sRGB textures before filtering.</p>

<h3>Aliasing and supersampling</h3>
<p>A pixel's color comes from a single sample at its centre. That causes <strong>aliasing</strong>: detail finer than the pixel spacing is misrepresented rather than lost. Edges come out as staircases ("jaggies"), thin objects break into dashes, and a finely striped texture far away can turn into large, false patterns (moiré). Think of a pattern of stripes. Its <strong>spatial frequency</strong> is how many cycles (one dark plus one light stripe) it has per unit of distance, here per pixel. The <em>sampling theorem</em> (Nyquist and Shannon) says that a pattern can be represented faithfully only if it is sampled more than twice per cycle of its finest detail, that is, at more than twice its highest frequency. Stripes that repeat every 1.5 pixels (frequency 2/3 per pixel) get only 1.5 samples per cycle: sampled at the pixel centres, they give exactly the same values as stripes repeating every 3 pixels, a false, coarser pattern.</p>
<p>The direct remedy is <strong>supersampling</strong>: take several samples per pixel, for example a 4 × 4 grid of 16, compute the color at each, and average them in linear light. An edge pixel half covered by a white triangle over black gets linear 0.5, sRGB 188, a smooth step instead of a jump. If 5 of 16 samples are covered, it gets 5/16 = 0.3125, sRGB 152. The cost is the number of samples; hardware's <em>multisample anti-aliasing</em> (MSAA) saves most of it by testing coverage at several points per pixel but shading only once. For textures seen from far away, where many texels fall in one pixel, GPUs use <strong>mipmaps</strong>: precomputed copies of the texture at half, quarter, eighth… size, so that a sample reads from a copy whose texels are about pixel-sized.</p>
<p class="note">Why it matters: these few formulas (Lambert, Blinn–Phong, a texture lookup) were the whole of real-time lighting for decades. Modern games use physically based models that obey energy conservation, but the vectors <strong>n</strong>, <strong>l</strong>, <strong>v</strong> and <strong>h</strong> are the same.</p>
`,
    terms: [
      ["Face normal", "The normal of a triangle's plane, the same everywhere on it."],
      ["Vertex normal", "A normal stored at a vertex, such as the average of neighbouring face normals, for smooth shading."],
      ["Lambert's cosine law", "A matte surface receives light in proportion to cos θ = n · l."],
      ["Diffuse color", "kd, the fraction of each color channel a matte surface reflects."],
      ["Specular highlight", "A bright spot near the mirror direction of a light, which moves with the viewer."],
      ["Phong reflection model", "Specular light proportional to max(0, r · v)^s, with r the mirror direction of the light."],
      ["Halfway vector", "h = normalize(l + v), halfway between the directions to the light and to the viewer."],
      ["Blinn–Phong model", "Specular light proportional to max(0, n · h)^s."],
      ["Ambient term", "A constant kd·Ia approximating light that arrives indirectly, after bouncing."],
      ["Gouraud shading", "Lighting computed at the vertices and the colors interpolated across each triangle."],
      ["Per-pixel shading", "Normals interpolated across the triangle and lighting computed at every pixel."],
      ["Texture coordinates", "(u, v) values at each vertex saying which point of a texture image belongs there."],
      ["Bilinear filtering", "Blending the four texels nearest a sample point by their distances."],
      ["Aliasing", "Errors from sampling detail finer than the sample spacing: jaggies, broken lines, moiré."],
      ["Supersampling", "Taking several samples per pixel and averaging them."]
    ],
    quiz: [
      { q: "A light arrives at 60° from a matte surface's normal. What fraction of its head-on brightness does the surface show?", choices: ["0.5", "0.866", "0.25", "1"], answer: 0, why: "Lambert's law: cos 60° = 0.5." },
      { q: "Which term of the Blinn–Phong model changes when only the viewer moves?", choices: ["Ambient", "Diffuse", "Specular", "None of them"], answer: 2, why: "Diffuse and ambient don't involve v; the halfway vector does." },
      { q: "Raising the shininess exponent s makes the highlight:", choices: ["Larger and dimmer", "Smaller and sharper", "Change color", "Disappear"], answer: 1, why: "A higher power of a number below 1 falls off faster away from the peak." },
      { q: "Why can Gouraud shading miss a highlight?", choices: ["It doesn't use normals", "It computes lighting only at vertices, so a highlight inside a large triangle never appears", "It uses the wrong exponent", "It doesn't interpolate"], answer: 1, why: "Interpolating vertex colors can't create a peak no vertex has." },
      { q: "Bilinear filtering of a texture sample blends how many texels?", choices: ["1", "2", "4", "9"], answer: 2, why: "The four whose centres surround the sample point." },
      { q: "An edge pixel is half covered by a white triangle on black. With supersampling averaged in linear light, what sRGB value does it get?", choices: ["128", "188", "255", "64"], answer: 1, why: "Linear 0.5 encodes to 188 (Lesson 1)." }
    ],
    practice: [
      {
        q: `<p>Explain Lambert's law with a flashlight: shine a beam 2 cm across straight onto a table, then at 60° from the normal. What area does the beam cover each time, and how bright is the lit patch relative to the first?</p>`,
        a: `<p>Head-on, the beam covers a disc of area π(1 cm)² ≈ 3.14 cm². At 60°, the patch stretches by 1/cos 60° = 2 in the tilt direction: an ellipse of about 6.28 cm². The same light over twice the area makes each square centimetre half as bright: cos 60° = 0.5.</p>`
      },
      {
        q: `<p>Show that Phong's <strong>r</strong> · <strong>v</strong> = 1 exactly when Blinn's <strong>n</strong> · <strong>h</strong> = 1, for unit vectors with <strong>n</strong> · <strong>l</strong> &gt; 0.</p>`,
        a: `<p><strong>r</strong> · <strong>v</strong> = 1 means <strong>v</strong> = <strong>r</strong>, the mirror image of <strong>l</strong> in <strong>n</strong>. Then <strong>l</strong> + <strong>v</strong> = <strong>l</strong> + 2(<strong>n</strong> · <strong>l</strong>)<strong>n</strong> − <strong>l</strong> = 2(<strong>n</strong> · <strong>l</strong>)<strong>n</strong>, a positive multiple of <strong>n</strong>, so <strong>h</strong> = <strong>n</strong>. Conversely, if <strong>h</strong> = <strong>n</strong> then <strong>l</strong> and <strong>v</strong> are unit vectors whose sum points along <strong>n</strong>, so they make equal angles with <strong>n</strong> on opposite sides: <strong>v</strong> is the mirror direction.</p>`
      },
      {
        q: `<p>A 2 × 2 texture has values 0 and 10 in its top row and 20 and 30 in its bottom row. Sample it with bilinear filtering at (<em>u</em>, <em>v</em>) = (0.4, 0.6), and with nearest filtering.</p>`,
        a: `<p><em>x</em> = 0.8 − 0.5 = 0.3 and <em>y</em> = 1.2 − 0.5 = 0.7, so the four texels are the whole texture with <em>f<sub>x</sub></em> = 0.3, <em>f<sub>y</sub></em> = 0.7: 0.7 · 0.3 · 0 + 0.3 · 0.3 · 10 + 0.7 · 0.7 · 20 + 0.3 · 0.7 · 30 = 0 + 0.9 + 9.8 + 6.3 = 17.0. Nearest: column ⌊0.8⌋ = 0, row ⌊1.2⌋ = 1, value 20.</p>`
      },
      {
        q: `<p>With 16 samples per pixel, 5 samples of a pixel fall inside a white shape and the rest on black. What sRGB value does the pixel get if the samples are averaged correctly? If the shape is red (255, 0, 0) on blue (0, 0, 255)?</p>`,
        a: `<p>Linear average 5/16 = 0.3125, which encodes to 152. For red on blue: red channel 0.3125 → 152, blue channel 11/16 = 0.6875 → 216, so (152, 0, 216). Averaging codes would give 80 for the first case, much too dark.</p>`
      }
    ],
    sources: ["fcg", "scratchapixel", "phong75"]
  },
  {
    id: "gr6",
    title: "Ray tracing",
    minutes: 90,
    summary: "Rendering by following rays from the eye: generating camera rays, ray–sphere intersection as a quadratic, ray–plane intersection, shading at the hit point, shadow rays, mirror reflection and recursion depth, the cost of ray tracing and acceleration structures, how GPUs and real-time ray tracing fit in, and the rendering equation in words.",
    notes: `
<p>Rasterization asks, for each triangle, "which pixels do you cover?" <strong>Ray tracing</strong> asks the opposite question, for each pixel: "what do you see?" It follows the path of light backwards, from the eye through the pixel into the scene, finds the first surface the path hits, and works out the light arriving there. Shadows and reflections, awkward to fake in a rasterizer, come out of the method almost for free. Whitted's 1980 paper on recursive ray tracing produced the first images with convincing reflections and refractions; this lesson builds his algorithm.</p>

<h3>Rays and camera rays</h3>
<p>A <strong>ray</strong> is a half-line: an origin <strong>o</strong> and a direction <strong>d</strong>, the points <strong>p</strong>(<em>t</em>) = <strong>o</strong> + <em>t</em><strong>d</strong> for <em>t</em> &gt; 0. If <strong>d</strong> is a unit vector, <em>t</em> is the distance along the ray.</p>
<p>Put the camera at the origin looking down −<em>z</em> (Lesson 3's camera coordinates). Lesson 3's projection, run backwards, gives the ray through each pixel: with <em>s</em> = tan(fov<sub>y</sub>/2), the centre of pixel (<em>i</em>, <em>j</em>) lies on the image plane <em>z</em> = −1 at</p>
<p class="math"><em>x</em> = (2(<em>i</em> + 0.5)/width − 1) · <em>s</em> · aspect,&nbsp;&nbsp; <em>y</em> = (1 − 2(<em>j</em> + 0.5)/height) · <em>s</em></p>
<p>and the camera ray is <strong>o</strong> = (0, 0, 0), <strong>d</strong> = normalize(<em>x</em>, <em>y</em>, −1). These are the viewport and NDC formulas solved for the camera-space point. For a camera elsewhere, use the look-at axes: <strong>d</strong> = normalize(<em>x</em><strong>u</strong> + <em>y</em><strong>v</strong> − <strong>w</strong>), from the eye.</p>

<h3>Ray–sphere intersection</h3>
<p>A sphere with centre <strong>c</strong> and radius <em>r</em> is the set of points with |<strong>p</strong> − <strong>c</strong>|² = <em>r</em>². Substitute the ray and write <strong>m</strong> = <strong>o</strong> − <strong>c</strong>:</p>
<p class="math">|<strong>m</strong> + <em>t</em><strong>d</strong>|² = <em>r</em>²&nbsp;&nbsp; ⇔&nbsp;&nbsp; (<strong>d</strong> · <strong>d</strong>)<em>t</em>² + 2(<strong>d</strong> · <strong>m</strong>)<em>t</em> + (<strong>m</strong> · <strong>m</strong> − <em>r</em>²) = 0</p>
<p>expanding with the dot product's rules, (<strong>m</strong> + <em>t</em><strong>d</strong>) · (<strong>m</strong> + <em>t</em><strong>d</strong>) = <strong>m</strong> · <strong>m</strong> + 2<em>t</em>(<strong>d</strong> · <strong>m</strong>) + <em>t</em>²(<strong>d</strong> · <strong>d</strong>). That is a quadratic <em>at</em>² + <em>bt</em> + <em>c</em> = 0 with <em>a</em> = <strong>d</strong> · <strong>d</strong>, <em>b</em> = 2<strong>d</strong> · <strong>m</strong>, <em>c</em> = <strong>m</strong> · <strong>m</strong> − <em>r</em>². Its <strong>discriminant</strong> <em>b</em>² − 4<em>ac</em> tells the story: negative, the ray's line misses the sphere; zero, it grazes it; positive, it enters and leaves at <em>t</em> = (−<em>b</em> ∓ √(<em>b</em>² − 4<em>ac</em>))/(2<em>a</em>). We want the nearest hit in front of the origin: the smaller root if it is positive, else the larger (the origin is inside the sphere), else none.</p>
<pre><code>import math

def dot(a, b): return sum(x * y for x, y in zip(a, b))

o, d = (0, 0, 0), (0.6, 0, -0.8)
center, radius = (0, 0, -5), 4
m = tuple(x - y for x, y in zip(o, center))
a, b, c = dot(d, d), 2 * dot(d, m), dot(m, m) - radius ** 2
disc = b * b - 4 * a * c
print(a, b, c, disc)                  # 1.0 -8.0 9 28.0
t = (-b - math.sqrt(disc)) / (2 * a)
print(round(t, 4))                    # 1.3542
p = tuple(x + t * y for x, y in zip(o, d))
print([round(x, 4) for x in p])       # [0.8125, 0.0, -1.0834]</code></pre>
<p>So <em>t</em> = 4 − √7 ≈ 1.354. The hit point is at distance 4 from the centre, as a check confirms. The <strong>normal</strong> at a hit point <strong>p</strong> on a sphere is (<strong>p</strong> − <strong>c</strong>)/<em>r</em>, already unit length.</p>
<p>In practice, a ray is only allowed to hit at <em>t</em> greater than a small tolerance <em>ε</em> (such as 10<sup>−6</sup>), for a reason explained with shadow rays in "Shading, shadows and reflection" below.</p>

<h3>Ray–plane intersection</h3>
<p>A plane through point <strong>q</strong> with normal <strong>n</strong> is the set of <strong>p</strong> with <strong>n</strong> · (<strong>p</strong> − <strong>q</strong>) = 0. Substituting the ray, <strong>n</strong> · (<strong>o</strong> + <em>t</em><strong>d</strong> − <strong>q</strong>) = 0 is linear in <em>t</em>:</p>
<p class="math"><em>t</em> = <strong>n</strong> · (<strong>q</strong> − <strong>o</strong>) / (<strong>n</strong> · <strong>d</strong>)</p>
<p>If <strong>n</strong> · <strong>d</strong> = 0 the ray runs parallel to the plane and misses it (or lies in it); if <em>t</em> ≤ <em>ε</em> the plane is behind. For a floor <em>y</em> = −1 (<strong>q</strong> = (0, −1, 0), <strong>n</strong> = (0, 1, 0)) and a ray from (0, 1, 0) in direction (0, −1, −1): <em>t</em> = (−2)/(−1) = 2, hitting (0, −1, −2). A triangle is a plane hit followed by Lesson 4's inside test, using barycentric coordinates in 3D.</p>

<h3>Shading, shadows and reflection</h3>
<p>At the nearest hit point <strong>P</strong> with unit normal <strong>N</strong> (flipped to face the incoming ray if <strong>N</strong> · <strong>d</strong> &gt; 0), shade with Lesson 5's model. The light direction is <strong>L</strong> = normalize(light − <strong>P</strong>) and the view direction is −<strong>d</strong>.</p>
<p><strong>Shadows</strong> take one more ray. A point is in shadow if something lies between it and the light, so cast a <strong>shadow ray</strong> from <strong>P</strong> toward the light and see whether it hits any object closer than the light is. If it does, leave out that light's diffuse and specular terms. The ray must start slightly off the surface, at <strong>P</strong> + <em>ε</em><strong>N</strong>: started exactly at <strong>P</strong>, rounding error (CS 210 Lesson 2) can put the computed point a hair inside the surface, so the shadow ray hits the surface it started on, and random pixels go dark. This speckled <strong>shadow acne</strong> is the classic first ray-tracer bug.</p>
<p><strong>Reflection</strong> takes another. A mirror sends the incoming ray off in the direction <strong>R</strong> = <strong>d</strong> − 2(<strong>d</strong> · <strong>N</strong>)<strong>N</strong> (reverse the component along the normal), so trace a new ray from <strong>P</strong> + <em>ε</em><strong>N</strong> in direction <strong>R</strong>, and mix the color it returns with the local color: (1 − <em>k</em><sub>r</sub>) · local + <em>k</em><sub>r</sub> · reflected, for a reflectivity <em>k</em><sub>r</sub> between 0 and 1. Tracing that ray is the same job as tracing a camera ray, so the tracer calls itself: it is <strong>recursive</strong>. Two mirrors facing each other would recurse forever, so a <strong>maximum depth</strong> stops it: after a few bounces, return the local color only. Each further bounce contributes a factor <em>k</em><sub>r</sub> less, so little is lost. Glass adds a refracted ray at each hit, bent where it crosses the surface by an amount that depends on the two materials (the rule is Snell's law, from optics, which this course doesn't need); with both, each hit spawns two rays, and depth 3 allows up to 1 + 2 + 4 + 8 = 15 rays per pixel.</p>
<pre data-label="Pseudocode"><code>trace(ray, depth):
    hit = nearest intersection of ray with any object (t > ε)
    if no hit: return background
    local = ambient + (diffuse + specular, unless the shadow ray to the light is blocked)
    if hit object is reflective and depth &lt; max_depth:
        return (1 − kr) · local + kr · trace(reflected ray, depth + 1)
    return local</code></pre>

<h3>Cost, acceleration, and GPUs</h3>
<p>A plain ray tracer tests every ray against every object. A 640 × 480 image of 100 spheres, with one shadow ray per pixel, needs 307,200 × 100 × 2 ≈ 61 million intersection tests. Scenes have millions of triangles, so real ray tracers organize objects into an <strong>acceleration structure</strong>, usually a <strong>bounding volume hierarchy</strong> (BVH): a tree (CS 201) whose leaves are objects and whose every node stores a box enclosing everything below it. A ray that misses a node's box skips its whole subtree, so a ray typically visits about log<sub>2</sub> <em>N</em> levels instead of testing all <em>N</em> objects.</p>
<p>For decades, real-time graphics meant rasterization: GPUs run <em>vertex shaders</em> (Lesson 3's matrices) and <em>fragment shaders</em> (Lesson 5's lighting) on thousands of cores, with fixed hardware for Lesson 4's triangle setup, interpolation and z-buffer. Ray tracing was for film, where an hour per frame is acceptable. In 2018 consumer GPUs gained dedicated ray-tracing units that traverse BVHs and intersect triangles in hardware. Games now render <strong>hybrid</strong> frames: rasterize what the camera sees directly, then trace a few rays per pixel for shadows, reflections and indirect light, and remove the resulting noise with filters (often trained neural networks).</p>

<h3>The rendering equation</h3>
<p>Whitted's tracer follows only mirror bounces and direct light from point lights; everything else is the ambient fudge of Lesson 5. In reality, light arriving at a point comes from <em>every</em> direction: off the walls, the floor, the ceiling. Kajiya (1986) wrote down the full balance, the <strong>rendering equation</strong>. In words: the light leaving a point in a given direction equals the light the point emits itself, plus the sum (an integral over all incoming directions above the surface) of the light arriving from each direction, times how much of it the material reflects toward the outgoing direction, times the cosine of the incoming angle (Lambert's factor again). The light arriving from each direction is itself the light leaving some other point, so the equation is recursive, like the tracer.</p>
<p class="math"><em>L</em><sub>o</sub>(<strong>x</strong>, <strong>ω</strong><sub>o</sub>) = <em>L</em><sub>e</sub>(<strong>x</strong>, <strong>ω</strong><sub>o</sub>) + ∫ <em>f</em><sub>r</sub>(<strong>x</strong>, <strong>ω</strong><sub>i</sub>, <strong>ω</strong><sub>o</sub>) <em>L</em><sub>i</sub>(<strong>x</strong>, <strong>ω</strong><sub>i</sub>) (<strong>n</strong> · <strong>ω</strong><sub>i</sub>) d<strong>ω</strong><sub>i</sub></p>
<p>Here <strong>ω</strong><sub>o</sub> and <strong>ω</strong><sub>i</sub> are the outgoing and incoming directions, and <em>f</em><sub>r</sub>, the material's reflectance function, says what fraction of light from <strong>ω</strong><sub>i</sub> leaves toward <strong>ω</strong><sub>o</sub>; Lambert and Blinn–Phong are simple choices of it.</p>
<p>The integral is over directions, not over an interval of numbers. Picture every direction above the surface as a point on a hemisphere of radius 1 centred at <strong>x</strong>. Split the hemisphere into many small patches; each patch is a narrow cone of directions, and its size d<strong>ω</strong><sub>i</sub> is the patch's area on that unit hemisphere (the whole hemisphere has area 2π). The integral is what the sum, over all the patches, of (the integrand for a direction in the patch) × (the patch's area) approaches as the patches shrink: a Riemann sum like MATH 131's midpoint sums, with patches of a hemisphere in place of strips of an interval. Its domain, the hemisphere above the surface, is often written as a subscript Ω on the integral sign.</p>
<p>No formula solves the equation for a real scene. <strong>Path tracing</strong> estimates it by Monte Carlo sampling (MATH 230): at each hit, choose one random incoming direction, trace it, and average many such random paths per pixel. The error of an average of <em>N</em> random samples shrinks like 1/√<em>N</em>, so halving the noise takes four times the samples; that is why path-traced film frames take hours, and why real-time path tracing leans on denoisers. Films have been rendered this way since the 2010s.</p>
<p class="note">Why it matters: rasterization and ray tracing answer the same question from opposite ends, and modern renderers use both. Everything in this course, from gamma to the z-buffer to the quadratic formula, is still inside them.</p>
`,
    terms: [
      ["Ray", "A half-line o + td for t > 0, with origin o and direction d."],
      ["Camera ray", "The ray from the eye through the centre of a pixel."],
      ["Discriminant", "b² − 4ac in the ray–sphere quadratic: negative means a miss, zero a graze, positive two intersections."],
      ["Shadow ray", "A ray from a hit point toward a light; if it hits something nearer than the light, the point is in shadow."],
      ["Shadow acne", "Speckled false shadows caused by a shadow ray hitting its own surface through rounding error; fixed by offsetting its origin."],
      ["Reflection direction", "R = d − 2(d · N)N, the incoming direction with its normal component reversed."],
      ["Recursive ray tracing", "Tracing new rays for reflection (and refraction) from each hit, with the same procedure, up to a maximum depth."],
      ["Bounding volume hierarchy", "A tree of nested boxes around a scene's objects, letting a ray skip every object in a box it misses."],
      ["Hybrid rendering", "Rasterizing the visible surfaces and tracing rays only for effects such as shadows and reflections."],
      ["Rendering equation", "Outgoing light = emitted light + the integral over incoming directions of reflectance × incoming light × cosine."],
      ["Path tracing", "Estimating the rendering equation by averaging many randomly bounced paths per pixel."]
    ],
    quiz: [
      { q: "In the ray–sphere quadratic, a negative discriminant means:", choices: ["The sphere is behind the ray", "The ray's line misses the sphere", "The ray starts inside the sphere", "The ray is tangent"], answer: 1, why: "No real solutions for t: no intersection." },
      { q: "Both roots t₁ < t₂ of the ray–sphere quadratic are positive. Which point does the ray see?", choices: ["t₁", "t₂", "Their average", "Neither"], answer: 0, why: "The nearer intersection, where the ray enters the sphere." },
      { q: "Why does a shadow ray start at P + εN instead of exactly at P?", choices: ["To make shadows softer", "So rounding error doesn't make it hit the surface it starts on", "To save time", "Because N points into the surface"], answer: 1, why: "Otherwise random pixels are wrongly shadowed: shadow acne." },
      { q: "A ray with direction (1, −1, 0) hits a floor with normal (0, 1, 0). What is the reflected direction?", choices: ["(1, 1, 0)", "(−1, 1, 0)", "(−1, −1, 0)", "(0, 1, 0)"], answer: 0, why: "d − 2(d · N)N = (1, −1, 0) − 2(−1)(0, 1, 0) = (1, 1, 0)." },
      { q: "Why does a recursive ray tracer need a maximum depth?", choices: ["To limit memory for the z-buffer", "Two facing mirrors would otherwise recurse forever", "Rays lose their direction after a few bounces", "The discriminant becomes negative"], answer: 1, why: "Each reflection spawns another; the depth limit stops the chain." },
      { q: "In the rendering equation, the integral adds up incoming light over:", choices: ["All pixels", "All directions above the surface", "All light sources only", "All objects in the scene"], answer: 1, why: "Light can arrive from any direction, not just from the lights." }
    ],
    practice: [
      {
        q: `<p>A ray from the origin in direction (0, 0, −1) meets a sphere with centre (0, 0.5, −3) and radius 1. Find <em>t</em>, the hit point and the normal there.</p>`,
        a: `<p><strong>m</strong> = (0, −0.5, 3); <em>a</em> = 1, <em>b</em> = 2(−3) = −6, <em>c</em> = 0.25 + 9 − 1 = 8.25. Discriminant 36 − 33 = 3, so <em>t</em> = (6 − √3)/2 ≈ 2.134. Hit point (0, 0, −2.134). Normal ((0, 0, −2.134) − (0, 0.5, −3))/1 = (0, −0.5, 0.866): tilted down, since the ray hits below the sphere's centre.</p>
<pre><code>print(round((6 - math.sqrt(3)) / 2, 3))   # 2.134</code></pre>`
      },
      {
        q: `<p>Estimate the number of ray–sphere tests for a 640 × 480 image of 100 spheres with one point light, mirror reflections on every sphere and a maximum depth of 2, if every reflected ray hits another sphere. How would a BVH change this?</p>`,
        a: `<p>Each pixel traces up to 3 rays (camera ray plus 2 reflections), and each hit casts a shadow ray: 6 rays per pixel, each tested against 100 spheres. 307,200 × 6 × 100 ≈ 184 million tests. With a BVH, each ray visits roughly log<sub>2</sub> 100 ≈ 7 levels, testing a few boxes per level and a handful of spheres at the bottom: a few tens of tests instead of 100, several times fewer here and enormously fewer for scenes with millions of triangles.</p>`
      },
      {
        q: `<p>Derive the ray–plane formula <em>t</em> = <strong>n</strong> · (<strong>q</strong> − <strong>o</strong>)/(<strong>n</strong> · <strong>d</strong>), and use it for the ray from (0, 2, 0) in direction (1, −1, 0) and the plane through (0, 0, 0) with normal (0, 1, 0). Then reflect the ray.</p>`,
        a: `<p>Substitute <strong>p</strong> = <strong>o</strong> + <em>t</em><strong>d</strong> into <strong>n</strong> · (<strong>p</strong> − <strong>q</strong>) = 0: <strong>n</strong> · (<strong>o</strong> − <strong>q</strong>) + <em>t</em>(<strong>n</strong> · <strong>d</strong>) = 0, so <em>t</em> = <strong>n</strong> · (<strong>q</strong> − <strong>o</strong>)/(<strong>n</strong> · <strong>d</strong>). Here <em>t</em> = (0, 1, 0) · (0, −2, 0)/(−1) = 2, hitting (2, 0, 0). Reflected direction: (1, −1, 0) − 2(−1)(0, 1, 0) = (1, 1, 0).</p>`
      },
      {
        q: `<p>A path tracer renders a test image with 16 random paths per pixel, and its noise (the standard deviation of a pixel's value) is 0.08. How many paths per pixel are needed to bring the noise down to 0.01?</p>`,
        a: `<p>Noise shrinks like 1/√<em>N</em>. Reducing it by a factor of 8 needs 8² = 64 times the samples: 16 × 64 = 1,024 paths per pixel. This slow convergence is why denoisers are so valuable.</p>`
      }
    ],
    sources: ["rtweekend", "whitted80", "kajiya86", "pbrt", "fcg"]
  }
]);

CSA.addAsides("cs350", {
  gr1: [
    { kind: "history", title: "Bresenham and the plotter", html: `<p>In 1962 Jack Bresenham, a programmer at IBM's San Jose laboratory, was asked to drive a Calcomp drum plotter that had just been connected to an IBM 1401 computer. The plotter's pen could only take fixed small steps, in one of eight directions: exactly the pixel steps of a line on a grid, years before raster screens were common. The 1401 was slow and had little memory, so Bresenham found a method that used only integer addition, subtraction and comparison. It was in production use by the summer of 1962 and was published in 1965 in the <em>IBM Systems Journal</em>, where he reported that the program fitted in 333 memory locations. The same algorithm, and its extension to circles, still draws lines in printers, displays and graphics libraries.</p>`, sources: ["bresenham65"] }
  ],
  gr2: [
    { kind: "history", title: "Sketchpad", html: `<p>In 1963 Ivan Sutherland, a PhD student at MIT, finished Sketchpad on the TX-2 computer at Lincoln Laboratory. Using a light pen on a screen, a designer could draw lines and arcs, then tell the program to keep lines parallel or equal in length, and it would solve the constraints. Drawings could be copied as instances of a master drawing, so that changing the master changed every copy, an early form of what object-oriented programming later called classes and instances. Users could zoom and rotate drawings, transformations computed in software. Sketchpad is usually counted as the first graphical user interface and the start of computer graphics as a field. Sutherland went on to build an early head-mounted display, co-founded the graphics company Evans &amp; Sutherland, and received the Turing Award in 1988.</p>`, sources: ["sutherland63"] }
  ],
  gr5: [
    { kind: "history", title: "Utah in the 1970s", html: `<p>A remarkable share of this course was invented at one place. David Evans built a computer graphics program at the University of Utah and recruited Ivan Sutherland in 1968. Its students and staff produced Gouraud shading (Henri Gouraud, 1971), the Phong reflection model and per-pixel shading (Bui Tuong Phong, 1973 thesis, published 1975), the z-buffer and texture mapping (Ed Catmull, 1974 thesis) and the halfway-vector highlight (Jim Blinn, 1977). Martin Newell modelled a teapot from his kitchen in 1975, and the "Utah teapot" became the standard test object of graphics, still built into many tools. Utah alumni went on to found Adobe (John Warnock), Silicon Graphics (Jim Clark) and, with others, Pixar (Ed Catmull).</p>`, sources: ["phong75"] }
  ],
  gr6: [
    { kind: "ethics", title: "When pictures stop being evidence", html: `<p>The rendering equation describes how real light behaves, so a good enough renderer produces images that can't be told from photographs. Film and advertising use this every day, openly: many "photos" of cars, kitchens and furniture in catalogues are renders. Combined with generative AI models that produce realistic images and video from a sentence, it also makes convincing fakes cheap: invented events, forged evidence, and sexual images of real people made without their consent, which overwhelmingly target women. Detecting fakes by their flaws is a losing race, because the tools keep improving. One response is <em>provenance</em>: the C2PA standard (from a coalition including Adobe, Microsoft and camera makers, founded in 2021) attaches cryptographically signed records of how an image was captured and edited, so viewers can check where a picture came from rather than guessing whether it is real. Provenance only helps if cameras, editors and platforms carry it through, and its absence proves nothing. As a graphics programmer, ask who could misuse what you build, and what labelling, consent or friction would make that harder.</p>`, sources: ["c2pa"] }
  ]
});
