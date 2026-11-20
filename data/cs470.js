CSA.addCourse({
  id: "cs470",
  code: "CS 470",
  title: "Deep Learning",
  credits: 4,
  kind: "optional",
  term: "y4f",
  summary: "How deep neural networks are built, trained and deployed, from first principles in plain Python. CS 370 trained a nine-parameter network with a scalar autograd; this course scales the same ideas up. It builds reverse-mode automatic differentiation on tensors, explains why initialization, optimizers and normalization decide whether a deep network trains at all, and derives the three great architectures: convolutional networks for images, recurrent networks and LSTMs for sequences, and the transformer in full. It ends with how large language models are tokenized, pretrained, scaled, fine-tuned and evaluated, what they cost, and how they are misused. Every graded program is checked against hand-worked values or numerical gradients. A track elective.",
  prereqs: ["CS 370 Introduction to AI and Machine Learning", "MATH 220 Linear Algebra", "MATH 230 Probability and Statistics", "MATH 131 Calculus II and Multivariable Calculus"],
  outcomes: [
    "Compute with tensors and broadcasting, derive the backward rule of a tensor operation as a vector–Jacobian product, implement a small tensor autograd, and check it numerically",
    "Initialize deep networks with Xavier or He scaling from a variance argument, train them with momentum, Adam and learning-rate schedules, and diagnose training from loss curves",
    "Reduce overfitting with weight decay, dropout, early stopping and data augmentation, and implement batch and layer normalization, forward and backward",
    "Design convolutional networks: compute output sizes, parameter counts and receptive fields, and implement convolution and pooling",
    "Explain backpropagation through time and vanishing gradients, implement an LSTM cell and multi-head causal self-attention, and count a transformer's parameters",
    "Explain tokenization, pretraining objectives, scaling laws and parameter-efficient fine-tuning, estimate a model's compute and energy, evaluate it honestly, and reason about its misuse"
  ],
  rubric: {
    criteriaFor: "programming assignments, the training project and exams",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Programming assignments", weight: 30, desc: "The lessons' auto-graded problems, plus a short written answer for each lesson explaining one result by hand: a gradient, a shape, a parameter count or a step of an optimizer." },
      { name: "Training project", weight: 25, desc: "Train a small network of your choice (a CNN on a small image set, or a character-level LSTM or transformer on a text) with your Lesson 1 autograd extended as needed, or with a library once a pure-Python version of each layer passes a numerical gradient check. Report loss curves, an ablation of one design choice (initialization, normalization, dropout or the optimizer), an honest held-out evaluation, and a one-page model card." },
      { name: "Midterm exam", weight: 15, desc: "Automatic differentiation, training and regularization (lessons 1–3), worked by hand." },
      { name: "Final exam", weight: 20, desc: "Cumulative, with emphasis on architectures and large models (lessons 4–6)." }
    ],
    criteria: [
      { name: "Mathematics", desc: "Are the derivations right?", levels: [
        "Correct gradients, shapes and variance arguments, with every assumption (independence, zero mean, the shape convention) stated.",
        "Correct approach with a small slip, such as a transposed matrix or a missing factor of 2.",
        "A wrong rule or shape that changes the result.",
        "Incorrect or missing." ] },
      { name: "Implementation", desc: "Does the code compute the right numbers?", levels: [
        "Correct, readable code with deterministic seeds; edge cases (padding, masks, empty batches, ties) handled.",
        "Works for the main cases, with a gap in edge cases.",
        "Runs but gives wrong values or gradients in ordinary cases.",
        "Doesn't run." ] },
      { name: "Verification", desc: "How do you know it's right?", levels: [
        "Numerical gradient checks, values worked by hand, held-out evaluation that never touched training, and loss curves read correctly.",
        "Good checks of the main behavior, with gaps.",
        "Checked only by whether the loss went down.",
        "No checking." ] },
      { name: "Explanation", desc: "Can you say why it works?", levels: [
        "Explains each design choice by its mechanism (variance, conditioning, gradient flow), states its cost, and says what would go wrong otherwise.",
        "Mostly clear, with some steps asserted rather than explained.",
        "Describes what the code does but not why.",
        "No explanation." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Collaboration:</b> discuss ideas and debug together; write your own code and reports, and list who you worked with.",
      "<b>AI assistants:</b> allowed for explanations and debugging. You must be able to explain every line of your project, and your report must say how an assistant was used.",
      "<b>Libraries:</b> assignments use only Python's standard library, so that you write every forward and backward rule yourself. The project may use a deep learning library once your own version of each layer passes a gradient check.",
      "<b>Compute:</b> the project must train on a laptop CPU in under an hour. Report the hardware and the training time.",
      "<b>Late work:</b> four late days in total for the programming assignments; the project deadline is fixed."
    ]
  }
});

CSA.addUnits("cs470", [
  {
    id: "dl1",
    title: "Tensors and automatic differentiation",
    minutes: 90,
    summary: "Tensors and shapes, why computation is vectorized, broadcasting, Jacobians and the chain rule, why reverse mode (vector–Jacobian products) suits one loss and many parameters while forward mode computes Jacobian–vector products, the backward rules of matrix multiplication, ReLU, sum and broadcasting, a small tensor autograd in Python, and numerical gradient checking.",
    notes: `
<p>CS 370 Lesson 7 built automatic differentiation for single numbers: every <code>Value</code> held one float, and the XOR network's graph had a node for every multiplication. That works for 9 parameters. CS 370's network for 28 × 28 images had 101,770 parameters, and its graph for one image would have over 100,000 multiplication nodes, each a Python object. Real systems make one node do a whole matrix multiplication. This lesson builds that: arrays of numbers called tensors, the rules that let arrays of different shapes combine, the backward rule of each tensor operation, and a small tensor autograd you can check numerically.</p>

<h3>Tensors</h3>
<p>A <strong>tensor</strong>, in deep learning, is a rectangular array of numbers with any number of dimensions. (Mathematicians use the word for something more specific; we only mean the array.) Its <strong>shape</strong> lists the size of each dimension, and the number of dimensions is its <strong>rank</strong>. (This is a different use of the word from MATH 220, where the rank of a matrix is its number of linearly independent columns. In this sense every matrix is a rank-2 tensor. NumPy calls it <code>ndim</code> to avoid the clash. Lesson 6's "low-rank" uses the MATH 220 meaning.) A number is a rank-0 tensor of shape (); a vector of length 3 has shape (3,); a matrix with 2 rows and 3 columns has shape (2, 3); a batch of 32 color images of 28 × 28 pixels has shape (32, 3, 28, 28). This is NumPy's <code>shape</code> from MATH 220 Lesson 1. Without NumPy we store a tensor as nested lists and read the shape from the first element at each level:</p>
<pre><code>def shape(t):
    s = []
    while isinstance(t, list):
        s.append(len(t))
        t = t[0]
    return tuple(s)

X = [[1.0, 2.0, 3.0],
     [4.0, 5.0, 6.0]]
print(shape(X))          # (2, 3)
print(shape(X[0]))       # (3,)
print(shape(7.0))        # ()</code></pre>
<p>Libraries store the numbers in one flat block of memory in row-major order (CS 210 Lesson 7), so entry (<em>i</em>, <em>j</em>) of a matrix with <em>C</em> columns is at position <em>iC</em> + <em>j</em>:</p>
<pre><code>def flat_index(i, j, cols):
    return i * cols + j

flat = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0]
print(flat[flat_index(1, 2, 3)])   # 6.0</code></pre>

<h3>Vectorized computation</h3>
<p>A layer applied to one input row vector <strong>x</strong> computes <strong>x</strong><em>W</em> + <strong>b</strong>. (CS 370 wrote <em>W</em><strong>h</strong> with column vectors; deep learning code usually puts examples in rows, so the weight matrix of a layer from <em>n</em><sub>in</sub> to <em>n</em><sub>out</sub> units has shape (<em>n</em><sub>in</sub>, <em>n</em><sub>out</sub>).) To apply it to a <strong>batch</strong> of <em>B</em> examples at once, stack them as the rows of a matrix <em>X</em> of shape (<em>B</em>, <em>n</em><sub>in</sub>): then <em>XW</em> has shape (<em>B</em>, <em>n</em><sub>out</sub>), one row per example. Writing whole-array operations instead of loops over numbers is called <strong>vectorization</strong>. It pays twice. In an interpreter, each Python-level operation costs far more than the arithmetic it does, so one call that multiplies two 512 × 512 matrices inside compiled code beats 134 million interpreted multiplications by orders of magnitude. And a matrix product is exactly the work that GPUs and vector instructions do fastest (CS 230 Lesson 8), because the same operation is applied to many numbers that sit next to each other in memory.</p>

<h3>Broadcasting</h3>
<p><em>XW</em> has shape (<em>B</em>, <em>n</em><sub>out</sub>) but <strong>b</strong> has shape (<em>n</em><sub>out</sub>,). Adding them should add <strong>b</strong> to every row. <strong>Broadcasting</strong> is the rule that makes such operations work without copying: line the two shapes up at the right, pad the shorter with 1s on the left, and compare each position. The sizes must be equal, or one must be 1, in which case that tensor is stretched (its single entry reused) along that dimension. Otherwise the shapes are incompatible.</p>
<pre><code>def broadcast_shape(a, b):
    a, b = list(a), list(b)
    n = max(len(a), len(b))
    a = [1] * (n - len(a)) + a
    b = [1] * (n - len(b)) + b
    out = []
    for x, y in zip(a, b):
        if x != y and x != 1 and y != 1:
            raise ValueError(f"shapes don't broadcast: {x} vs {y}")
        out.append(max(x, y))
    return tuple(out)

print(broadcast_shape((2, 3), (3,)))       # (2, 3)
print(broadcast_shape((3, 1), (1, 4)))     # (3, 4)
print(broadcast_shape((5, 1, 4), (3, 1)))  # (5, 3, 4)</code></pre>
<p>Step by step for the last: (3, 1) is padded to (1, 3, 1); position by position, 5 against 1 gives 5, 1 against 3 gives 3, and 4 against 1 gives 4. Shapes (2, 3) and (2,) don't broadcast: lined up at the right, 3 meets 2. A column of shape (3, 1) plus a row of shape (1, 4) gives a whole (3, 4) table, every column entry plus every row entry:</p>
<pre><code>def add_rowvec(X, b):
    return [[x + bj for x, bj in zip(row, b)] for row in X]

print(add_rowvec(X, [10.0, 20.0, 30.0]))   # [[11.0, 22.0, 33.0], [14.0, 25.0, 36.0]]

col = [[1.0], [2.0], [3.0]]
row = [[10.0, 20.0, 30.0, 40.0]]
print([[c[0] + r for r in row[0]] for c in col])   # [[11.0, 21.0, 31.0, 41.0], [12.0, 22.0, 32.0, 42.0], [13.0, 23.0, 33.0, 43.0]]</code></pre>
<p>Broadcasting is convenient and a common source of silent bugs: subtracting a (<em>B</em>,) vector of targets from a (<em>B</em>, 1) column of predictions gives a (<em>B</em>, <em>B</em>) matrix, not <em>B</em> errors, and the loss is then wrong without any error message. Print shapes.</p>

<h3>Jacobians and the chain rule</h3>
<p>A function <em>f</em> from ℝ<sup><em>n</em></sup> to ℝ<sup><em>m</em></sup> has a <strong>Jacobian</strong>: the <em>m</em> × <em>n</em> matrix <em>J</em> of all its partial derivatives, <em>J</em><sub><em>ij</em></sub> = ∂<em>f</em><sub><em>i</em></sub>/∂<em>x</em><sub><em>j</em></sub>. It is the best linear approximation of <em>f</em> near a point: <em>f</em>(<strong>x</strong> + <strong>d</strong>) ≈ <em>f</em>(<strong>x</strong>) + <em>J</em><strong>d</strong>, the many-variable version of MATH 131 Lesson 7's tangent plane. For a composition <em>L</em> = <em>f</em><sub>3</sub>(<em>f</em><sub>2</sub>(<em>f</em><sub>1</sub>(<strong>x</strong>))) the multivariable chain rule says the Jacobians multiply: <em>J</em> = <em>J</em><sub>3</sub><em>J</em><sub>2</sub><em>J</em><sub>1</sub>.</p>
<p>Matrix multiplication is associative, so the product can be computed from either end, and the costs differ enormously. Suppose <strong>x</strong> has 1,000 entries, the middle values have 100, and <em>L</em> is a single number (a loss), so <em>J</em><sub>3</sub> is 1 × 100, <em>J</em><sub>2</sub> is 100 × 100 and <em>J</em><sub>1</sub> is 100 × 1,000. Multiplying an <em>a</em> × <em>b</em> matrix by a <em>b</em> × <em>c</em> one takes <em>abc</em> multiplications.</p>
<pre><code>print(1 * 100 * 100 + 1 * 100 * 1000)        # 110000
print(100 * 100 * 1000 + 1 * 100 * 1000)     # 10100000</code></pre>
<p>From the left, (<em>J</em><sub>3</sub><em>J</em><sub>2</sub>)<em>J</em><sub>1</sub>, every intermediate result is a single row, and the cost is 110,000. From the right, <em>J</em><sub>3</sub>(<em>J</em><sub>2</sub><em>J</em><sub>1</sub>), the intermediate is a 100 × 1,000 matrix and the cost is 10,100,000, about 92 times more. Working from the output backwards, always multiplying a row vector by the next Jacobian, is <strong>reverse mode</strong>; each step is a <strong>vector–Jacobian product</strong> (VJP), <strong>u</strong><sup>T</sup><em>J</em>. Working from the input forwards, pushing a direction <strong>d</strong> through as <em>J</em><strong>d</strong>, is <strong>forward mode</strong>, made of <strong>Jacobian–vector products</strong> (JVPs). One reverse pass gives the derivative of one output with respect to every input; one forward pass gives the derivative of every output along one input direction. A loss has one output and millions of parameters, so reverse mode needs one pass where forward mode would need one per parameter. That is why backpropagation is reverse mode.</p>
<p>The row vector carried backwards is just the gradient of the loss with respect to the current value, arranged in that value's shape. So each operation needs only a <strong>backward rule</strong>: given <em>G</em> = ∂<em>L</em>/∂(output), return ∂<em>L</em>/∂(each input). The Jacobian itself is never built. For a 512 × 512 matrix product it would have 512<sup>4</sup> ≈ 69 billion entries.</p>

<h3>Backward rules for tensor operations</h3>
<p><b>Matrix multiplication.</b> Let <em>Y</em> = <em>XW</em> with <em>X</em> of shape (<em>B</em>, <em>n</em>) and <em>W</em> of shape (<em>n</em>, <em>m</em>), and let <em>G</em> = ∂<em>L</em>/∂<em>Y</em>, of shape (<em>B</em>, <em>m</em>). Entry by entry, <em>Y</em><sub><em>ij</em></sub> = Σ<sub><em>k</em></sub> <em>X</em><sub><em>ik</em></sub><em>W</em><sub><em>kj</em></sub>, so <em>W</em><sub><em>kj</em></sub> affects every <em>Y</em><sub><em>ij</em></sub> in column <em>j</em> with ∂<em>Y</em><sub><em>ij</em></sub>/∂<em>W</em><sub><em>kj</em></sub> = <em>X</em><sub><em>ik</em></sub>. The chain rule adds the contributions:</p>
<p class="math">∂<em>L</em>/∂<em>W</em><sub><em>kj</em></sub> = Σ<sub><em>i</em></sub> <em>G</em><sub><em>ij</em></sub><em>X</em><sub><em>ik</em></sub> = (<em>X</em><sup>T</sup><em>G</em>)<sub><em>kj</em></sub>, &nbsp;&nbsp;so ∂<em>L</em>/∂<em>W</em> = <em>X</em><sup>T</sup><em>G</em>, &nbsp;&nbsp;and likewise ∂<em>L</em>/∂<em>X</em> = <em>GW</em><sup>T</sup>.</p>
<p>A useful check: each gradient has the shape of the thing it is the gradient of, and there is only one way to multiply <em>X</em> or <em>W</em> by <em>G</em> to get that shape. <em>X</em><sup>T</sup><em>G</em> is (<em>n</em>, <em>B</em>)(<em>B</em>, <em>m</em>) = (<em>n</em>, <em>m</em>), the shape of <em>W</em>. The sum over <em>i</em> means the weight gradient adds up the contributions of every example in the batch. The backward pass costs two matrix products for the forward pass's one, CS 370's "about twice the forward pass".</p>
<p><b>Element-wise functions.</b> For <em>Y</em> = relu(<em>X</em>), each output depends only on the input in the same position, so the Jacobian is diagonal and the VJP is an element-wise product: ∂<em>L</em>/∂<em>X</em> = <em>G</em> where <em>X</em> &gt; 0, and 0 elsewhere. <b>Sum.</b> For <em>s</em> = Σ <em>X</em><sub><em>ij</em></sub>, every ∂<em>s</em>/∂<em>X</em><sub><em>ij</em></sub> = 1, so ∂<em>L</em>/∂<em>X</em> is <em>g</em> (the gradient of <em>s</em>) copied into every position. <b>Broadcasting.</b> If a bias row <strong>b</strong> was stretched over <em>B</em> rows, each entry <em>b</em><sub><em>j</em></sub> was used <em>B</em> times, so its gradient is the sum of the <em>B</em> gradients in column <em>j</em>. In general, the backward rule of broadcasting sums over every stretched dimension. Broadcasting forwards, summing backwards: each is the other's VJP.</p>

<h3>A small tensor autograd</h3>
<p>Here is CS 370's <code>Value</code> idea with matrices. Each <code>Tensor</code> holds a list of rows, a gradient of the same shape, its parents, and a function that applies the operation's backward rule. <code>backward</code> sorts the graph topologically and calls those functions from the output back.</p>
<pre><code>def matmul(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(len(B))) for j in range(len(B[0]))]
            for i in range(len(A))]

def transpose(A):
    return [list(r) for r in zip(*A)]

def accumulate(t, g):
    for i, row in enumerate(g):
        for j, v in enumerate(row):
            t.grad[i][j] += v

class Tensor:
    """A 2-D tensor (a list of rows) that records how it was computed."""
    def __init__(self, data, parents=()):
        self.data = data
        self.grad = [[0.0] * len(data[0]) for _ in data]
        self.parents = parents
        self.backward_fn = None      # sends self.grad to the parents

    def __matmul__(self, other):     # the @ operator
        out = Tensor(matmul(self.data, other.data), (self, other))
        def backward_fn():
            accumulate(self, matmul(out.grad, transpose(other.data)))    # G Wᵀ
            accumulate(other, matmul(transpose(self.data), out.grad))    # Xᵀ G
        out.backward_fn = backward_fn
        return out

    def __add__(self, other):        # other: same shape, or one row broadcast down
        out = Tensor([[x + y for x, y in zip(r, other.data[i % len(other.data)])]
                      for i, r in enumerate(self.data)], (self, other))
        def backward_fn():
            accumulate(self, out.grad)
            if len(other.data) == len(self.data):
                accumulate(other, out.grad)
            else:                    # broadcast: sum the gradient over the rows
                accumulate(other, [[sum(col) for col in zip(*out.grad)]])
        out.backward_fn = backward_fn
        return out

    def relu(self):
        out = Tensor([[max(0.0, x) for x in r] for r in self.data], (self,))
        def backward_fn():
            accumulate(self, [[g if x > 0 else 0.0 for g, x in zip(gr, xr)]
                              for gr, xr in zip(out.grad, self.data)])
        out.backward_fn = backward_fn
        return out

    def sum(self):
        out = Tensor([[sum(sum(r) for r in self.data)]], (self,))
        def backward_fn():
            g = out.grad[0][0]
            accumulate(self, [[g] * len(r) for r in self.data])
        out.backward_fn = backward_fn
        return out

    def backward(self):
        order, seen = [], set()
        def visit(t):
            if id(t) not in seen:
                seen.add(id(t))
                for p in t.parents:
                    visit(p)
                order.append(t)
        visit(self)
        self.grad = [[1.0]]
        for t in reversed(order):
            if t.backward_fn:
                t.backward_fn()</code></pre>
<p>Python calls <code>__matmul__</code> for the <code>@</code> operator. Each <code>backward_fn</code> is a closure (CS 360 Lesson 3): it remembers <code>out</code>, <code>self</code> and <code>other</code> from the call that created it. Gradients are added with <code>accumulate</code>, never assigned, for the reason CS 370 gave: a tensor used twice receives a contribution from each use. A ReLU layer on a batch of three examples:</p>
<pre><code>X = Tensor([[1.0, 2.0], [3.0, -1.0], [0.5, 0.5]])      # 3 examples, 2 features
W = Tensor([[0.2, -0.5, 0.1], [0.4, 0.3, -0.2]])       # 2 inputs, 3 outputs
b = Tensor([[0.1, 0.0, -0.1]])                         # one bias row
loss = (X @ W + b).relu().sum()
loss.backward()
print(round(loss.data[0][0], 4))                       # 2.3
print([[round(v, 4) for v in r] for r in W.grad])      # [[4.5, 1.0, 3.0], [1.5, 2.0, -1.0]]
print(b.grad)                                          # [[3.0, 1.0, 1.0]]</code></pre>
<p>Check it by hand. <em>XW</em> + <strong>b</strong> is [[1.1, 0.1, −0.4], [0.3, −1.8, 0.4], [0.4, −0.1, −0.15]]; the positive entries add up to 2.3. The gradient reaching the pre-activations is 1 where they are positive and 0 elsewhere: the mask <em>M</em> = [[1, 1, 0], [1, 0, 1], [1, 0, 0]]. Then ∂<em>L</em>/∂<em>W</em> = <em>X</em><sup>T</sup><em>M</em>: column 0 of <em>M</em> is all ones, so column 0 of the gradient is the column sums of <em>X</em>, (4.5, 1.5); column 1 of <em>M</em> has its only 1 in row 0, so it picks out example 0 (row 0 of <em>X</em>), (1, 2); column 2 picks out example 1 (row 1), (3, −1). The bias gradient is the column sums of <em>M</em>: (3, 1, 1).</p>

<h3>Gradient checking</h3>
<p>A wrong backward rule doesn't crash; the network just trains badly, and it can take days to notice. So every new rule is checked against the <strong>centred difference</strong> of CS 370 Lesson 7, one parameter at a time: (<em>L</em>(<em>w</em> + <em>h</em>) − <em>L</em>(<em>w</em> − <em>h</em>))/2<em>h</em>. Its error shrinks like <em>h</em><sup>2</sup> for smooth functions, but a tiny <em>h</em> loses digits to rounding (CS 210 Lesson 2): subtracting two nearly equal losses keeps few significant digits. In double precision, <em>h</em> around 10<sup>−5</sup> balances the two. Compare with the <strong>relative error</strong> |<em>a</em> − <em>n</em>|/max(|<em>a</em>|, |<em>n</em>|), so that a gradient of 1,000 and one of 0.001 are judged alike; below about 10<sup>−6</sup> is a pass.</p>
<pre><code>def numerical_grad(f, T, h=1e-5):
    g = []
    for i in range(len(T.data)):
        row = []
        for j in range(len(T.data[0])):
            old = T.data[i][j]
            T.data[i][j] = old + h
            plus = f()
            T.data[i][j] = old - h
            minus = f()
            T.data[i][j] = old
            row.append((plus - minus) / (2 * h))
        g.append(row)
    return g

def rel_error(a, b):
    return max(abs(x - y) / max(abs(x), abs(y), 1e-8)
               for ra, rb in zip(a, b) for x, y in zip(ra, rb))

f = lambda: (X @ W + b).relu().sum().data[0][0]
print(rel_error(W.grad, numerical_grad(f, W)) &lt; 1e-6)   # True</code></pre>
<p>(The <code>1e-8</code> in <code>rel_error</code> avoids dividing by zero when both are 0.) Two cautions. ReLU has a kink at 0: if a pre-activation lies within <em>h</em> of 0, nudging a weight can flip it, and the numerical estimate is meaningless there; use inputs that keep pre-activations away from 0. And the check costs two forward passes per parameter, so it is run on a tiny network, never during training.</p>
`,
    terms: [
      ["Tensor", "A rectangular array of numbers with any number of dimensions."],
      ["Shape", "The size of each dimension of a tensor, such as (32, 3, 28, 28)."],
      ["Rank", "The number of dimensions of a tensor: 0 for a number, 1 for a vector, 2 for a matrix. Not the same as a matrix's rank in linear algebra."],
      ["Batch", "Several examples processed together, stacked along a first dimension."],
      ["Vectorization", "Writing computation as whole-array operations instead of loops over numbers."],
      ["Broadcasting", "Combining tensors of different shapes by aligning them at the right and stretching dimensions of size 1."],
      ["Jacobian", "The matrix of all partial derivatives of a vector-valued function: J_ij = ∂f_i/∂x_j."],
      ["Vector–Jacobian product", "uᵀJ: one step of reverse mode, turning the gradient with respect to an output into the gradient with respect to an input."],
      ["Jacobian–vector product", "Jd: one step of forward mode, pushing an input direction through to the outputs."],
      ["Reverse mode", "Automatic differentiation from the output backwards; one pass gives the gradient of one output with respect to every input."],
      ["Forward mode", "Automatic differentiation from the inputs forwards; one pass gives the derivative of every output along one input direction."],
      ["Backward rule", "For one operation, the function from the output's gradient to its inputs' gradients."],
      ["Gradient check", "Comparing computed gradients with centred differences, using the relative error."]
    ],
    quiz: [
      { q: "What shape does broadcasting give for tensors of shapes (4, 1, 3) and (2, 1)?", choices: ["(4, 2, 3)", "(4, 1, 3)", "They don't broadcast", "(2, 4, 3)"], answer: 0, why: "Pad (2, 1) to (1, 2, 1); position by position, 4 vs 1 gives 4, 1 vs 2 gives 2, 3 vs 1 gives 3." },
      { q: "Y = XW with X of shape (32, 100) and W of shape (100, 10). What is the shape of ∂L/∂W, and how is it computed?", choices: ["(32, 10), as GW", "(100, 10), as XᵀG", "(100, 32), as XᵀGᵀ", "(10, 100), as GᵀX"], answer: 1, why: "A gradient has its variable's shape; XᵀG is (100, 32)(32, 10) = (100, 10)." },
      { q: "A bias of shape (10,) is broadcast over a batch of 32 rows. Its gradient is:", choices: ["The output gradient's first row", "The sum of the output gradient over the 32 rows", "The mean over the 10 columns", "32 times the output gradient"], answer: 1, why: "Each bias entry was used once per row, and the chain rule adds the contributions." },
      { q: "Why do neural networks use reverse mode rather than forward mode?", choices: ["Reverse mode is more accurate", "The loss is one number depending on many parameters, and one reverse pass gives all their derivatives", "Forward mode can't handle matrices", "Reverse mode needs no memory"], answer: 1, why: "Forward mode gives the derivative along one input direction per pass, so it would need one pass per parameter." },
      { q: "In the notes' Jacobian chain (1 × 100, 100 × 100, 100 × 1,000), multiplying from the left takes 110,000 multiplications. Why is it so much cheaper than from the right?", choices: ["Left-to-right multiplication is always cheaper", "Every intermediate result is a single row, so no large matrix is ever formed", "It skips the middle Jacobian", "Floating-point rounding"], answer: 1, why: "From the right, the intermediate is a 100 × 1,000 matrix costing 10 million multiplications." },
      { q: "A gradient check gives relative error 0.4 for one weight and 10⁻⁹ for the others. The pre-activation that weight feeds is 3 × 10⁻⁶. What is the likeliest explanation?", choices: ["The backward rule for that weight is wrong", "The nudge h = 10⁻⁵ crosses ReLU's kink at 0, so the numerical estimate is meaningless there", "The learning rate is too high", "Rounding in the forward pass"], answer: 1, why: "The pre-activation is within h of 0, so the ±h evaluations fall on different sides of the kink." }
    ],
    practice: [
      {
        q: `<p>For each pair of shapes, give the broadcast shape or say why it fails: (a) (8, 1, 6, 1) and (7, 1, 5); (b) (5, 4) and (1,); (c) (5, 4) and (4, 5); (d) (3,) and (3, 1). For (d), what does a program that meant to compute three differences actually get?</p>`,
        a: `<p>(a) Pad to (1, 7, 1, 5); position by position: 8, 7, 6, 5, giving (8, 7, 6, 5). (b) (1,) stretches to anything: (5, 4). (c) Lined up at the right, 4 meets 5: incompatible. (d) Pad (3,) to (1, 3); with (3, 1) this gives (3, 3): nine differences, every entry of one minus every entry of the other, not three. This is the bug from the notes; the fix is to reshape one operand so the shapes match.</p>
<pre><code>print(broadcast_shape((8, 1, 6, 1), (7, 1, 5)))   # (8, 7, 6, 5)
print(broadcast_shape((3,), (3, 1)))              # (3, 3)</code></pre>`
      },
      {
        q: `<p>Derive the backward rule ∂<em>L</em>/∂<em>X</em> = <em>GW</em><sup>T</sup> for <em>Y</em> = <em>XW</em> entry by entry, as the notes did for <em>W</em>. Then check it on <em>X</em> = [[1, 2]], <em>W</em> = [[1, 2, 3], [4, 5, 6]] with <em>L</em> = the sum of <em>Y</em>.</p>`,
        a: `<p><em>X</em><sub><em>ik</em></sub> appears in <em>Y</em><sub><em>ij</em></sub> = Σ<sub><em>k</em></sub> <em>X</em><sub><em>ik</em></sub><em>W</em><sub><em>kj</em></sub> for every <em>j</em> in row <em>i</em>, with derivative <em>W</em><sub><em>kj</em></sub>. Adding the contributions: ∂<em>L</em>/∂<em>X</em><sub><em>ik</em></sub> = Σ<sub><em>j</em></sub> <em>G</em><sub><em>ij</em></sub><em>W</em><sub><em>kj</em></sub> = (<em>GW</em><sup>T</sup>)<sub><em>ik</em></sub>. For the sum, <em>G</em> is all ones, so each entry of ∂<em>L</em>/∂<em>X</em> is a row sum of <em>W</em>: 1 + 2 + 3 = 6 and 4 + 5 + 6 = 15.</p>
<pre><code>Xs = Tensor([[1.0, 2.0]])
Ws = Tensor([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]])
(Xs @ Ws).sum().backward()
print(Xs.grad)   # [[6.0, 15.0]]</code></pre>`
      },
      {
        q: `<p>A function <em>f</em>: ℝ<sup>3</sup> → ℝ<sup>1000</sup> (say, rendering 1,000 pixels from 3 camera parameters) needs its full Jacobian. How many forward-mode passes and how many reverse-mode passes would that take? Which do you choose, and how does this compare with training a network?</p>`,
        a: `<p>Each forward pass gives one column of the 1000 × 3 Jacobian (the derivative of every output along one input direction), so 3 passes. Each reverse pass gives one row (the gradient of one output with respect to all inputs), so 1,000 passes. Choose forward mode. Training is the opposite shape: one output (the loss) and millions of inputs (the parameters), so one reverse pass replaces millions of forward ones.</p>`
      },
      {
        q: `<p>Add a mean-squared-error loss to the notes' engine: write a function <code>mse(P, T)</code> returning a 1 × 1 <code>Tensor</code> holding the mean of (<em>p</em> − <em>t</em>)<sup>2</sup> over all entries, where <code>T</code> is a list of rows of targets (not a tensor), with the correct backward rule. Check it numerically on the notes' layer with targets [[1, 0, 0], [0, 0, 1], [0, 1, 0]].</p>`,
        a: `<p>With <em>N</em> entries, ∂<em>L</em>/∂<em>p</em> = 2(<em>p</em> − <em>t</em>)/<em>N</em> for each, times the incoming gradient <em>g</em>.</p>
<pre><code>def mse(P, T):
    n = sum(len(r) for r in P.data)
    out = Tensor([[sum((p - t) ** 2 for pr, tr in zip(P.data, T) for p, t in zip(pr, tr)) / n]], (P,))
    def backward_fn():
        g = out.grad[0][0]
        accumulate(P, [[2 * (p - t) / n * g for p, t in zip(pr, tr)] for pr, tr in zip(P.data, T)])
    out.backward_fn = backward_fn
    return out

targets = [[1.0, 0.0, 0.0], [0.0, 0.0, 1.0], [0.0, 1.0, 0.0]]
W.grad = [[0.0] * 3 for _ in range(2)]
loss = mse((X @ W + b).relu(), targets)
loss.backward()
f2 = lambda: mse((X @ W + b).relu(), targets).data[0][0]
print(rel_error(W.grad, numerical_grad(f2, W)) &lt; 1e-6)   # True</code></pre>
<p>(The old gradient of <code>W</code> is reset first: <code>accumulate</code> adds.)</p>`
      }
    ],
    sources: ["d2l", "goodfellow", "baydin18", "micrograd"]
  },
  {
    id: "dl2",
    title: "Training deep networks",
    minutes: 90,
    summary: "Why initialization decides whether a deep network trains: the variance of a layer's outputs, Xavier and He scaling and a 10-layer experiment. Activation choices (ReLU, leaky ReLU, GELU). Optimizers: SGD with momentum on an ill-conditioned bowl, and Adam with bias correction. Learning-rate warmup and cosine schedules, batch size, and reading loss curves to diagnose training.",
    notes: `
<p>CS 370 trained small networks with plain gradient descent and found that the result depended on where training started. With ten or a hundred layers, that dependence becomes the main problem: a badly scaled network doesn't train at all. This lesson explains how to start a deep network so that signals survive the trip through it, how modern optimizers move faster than plain gradient descent, and how to read a training run.</p>

<h3>Why initialization matters</h3>
<p>Consider one unit of a layer, <em>z</em> = Σ<sub><em>i</em>=1</sub><sup><em>n</em></sup> <em>w</em><sub><em>i</em></sub><em>x</em><sub><em>i</em></sub>, with <em>n</em> inputs (the layer's <strong>fan-in</strong>). At initialization, assume the weights are independent of each other and of the inputs, with mean 0 and variance Var(<em>w</em>). Each term has mean E[<em>w</em>]E[<em>x</em>] = 0 and variance E[<em>w</em><sup>2</sup><em>x</em><sup>2</sup>] − 0 = Var(<em>w</em>) E[<em>x</em><sup>2</sup>], using independence to split the expectation (MATH 230 Lesson 4). The terms needn't be independent (after a ReLU layer the <em>x</em><sub><em>i</em></sub> usually aren't), but they are uncorrelated: for <em>i</em> ≠ <em>j</em>, E[<em>w</em><sub><em>i</em></sub><em>x</em><sub><em>i</em></sub><em>w</em><sub><em>j</em></sub><em>x</em><sub><em>j</em></sub>] = E[<em>w</em><sub><em>i</em></sub>] E[<em>x</em><sub><em>i</em></sub><em>w</em><sub><em>j</em></sub><em>x</em><sub><em>j</em></sub>] = 0, because <em>w</em><sub><em>i</em></sub> is independent of the rest and has mean 0. So every covariance is 0 and the variances add (MATH 230 Lesson 4):</p>
<p class="math">Var(<em>z</em>) = <em>n</em> · Var(<em>w</em>) · E[<em>x</em><sup>2</sup>]</p>
<p>Each layer multiplies the signal's size by about <em>n</em> Var(<em>w</em>) (times whatever the activation does). Over <em>L</em> layers the factors multiply, so unless each is close to 1 the signal shrinks or grows exponentially, and so do the gradients flowing back, which pass through the same weights transposed. With 64 units and weights of standard deviation 0.01, <em>n</em> Var(<em>w</em>) = 0.0064: after ten layers almost nothing is left.</p>
<p>To keep Var(<em>z</em>) equal to E[<em>x</em><sup>2</sup>] we want Var(<em>w</em>) = 1/<em>n</em><sub>in</sub>. The backward pass multiplies gradients by <em>W</em><sup>T</sup>, so the same argument run backwards asks for Var(<em>w</em>) = 1/<em>n</em><sub>out</sub>. Xavier Glorot and Yoshua Bengio (2010) compromised: <strong>Xavier (Glorot) initialization</strong> uses Var(<em>w</em>) = 2/(<em>n</em><sub>in</sub> + <em>n</em><sub>out</sub>). Drawn uniformly from [−<em>a</em>, <em>a</em>], whose variance is (2<em>a</em>)<sup>2</sup>/12 = <em>a</em><sup>2</sup>/3 (MATH 230 Lesson 3), that means <em>a</em> = √(6/(<em>n</em><sub>in</sub> + <em>n</em><sub>out</sub>)). Their argument treated the activation as roughly linear near 0, which suits tanh.</p>
<p>ReLU is not linear near 0: it zeroes the negative half. If <em>z</em> is symmetric about 0, then relu(<em>z</em>)<sup>2</sup> equals <em>z</em><sup>2</sup> on the positive half and 0 on the other, so E[relu(<em>z</em>)<sup>2</sup>] = Var(<em>z</em>)/2. Each ReLU layer halves the signal, and Kaiming He and colleagues (2015) doubled the weights' variance to compensate: <strong>He initialization</strong> draws <em>w</em> with Var(<em>w</em>) = 2/<em>n</em><sub>in</sub>. Try all three on ten ReLU layers of 64 units, measuring the <strong>root mean square</strong> (RMS, the square root of the mean of the squares) of the activations:</p>
<pre><code>import math, random

def forward_rms(n, layers, std, seed=0):
    rng = random.Random(seed)
    xs = [[rng.gauss(0, 1) for _ in range(n)] for _ in range(20)]   # 20 inputs
    out = []
    for _ in range(layers):
        W = [[rng.gauss(0, std) for _ in range(n)] for _ in range(n)]   # shape (n_in, n_out)
        xs = [[max(0.0, sum(x[k] * W[k][j] for k in range(n))) for j in range(n)] for x in xs]   # relu(xW)
        vals = [v for x in xs for v in x]
        out.append(math.sqrt(sum(v * v for v in vals) / len(vals)))
    return out

n = 64
for name, std in [("0.01", 0.01), ("1/sqrt(n)", 1 / math.sqrt(n)), ("He", math.sqrt(2 / n))]:
    s = forward_rms(n, 10, std)
    print(name, *[float(f"{v:.2g}") for v in (s[0], s[4], s[9])])
# 0.01 0.06 6e-07 3.2e-13
# 1/sqrt(n) 0.74 0.18 0.03
# He 1.1 1.0 0.96</code></pre>
<p>The columns are layers 1, 5 and 10. With standard deviation 0.01 the signal is gone after five layers. With Var(<em>w</em>) = 1/<em>n</em>, each ReLU layer divides E[<em>x</em><sup>2</sup>] by 2, so the RMS falls by √2 per layer: about 0.71, 0.18 and 0.031 in theory, close to what we see. He initialization keeps it near 1. (It wanders a little, up or down, because 64 units and 20 inputs are a small sample.) Biases start at 0. The weights must still be random, to break the symmetry CS 370 described.</p>

<h3>Activation functions</h3>
<p>CS 370 Lesson 7 introduced sigmoid, tanh and ReLU and the vanishing gradients of the first two. Two refinements are common. A ReLU unit whose pre-activation is negative for every input gets zero gradient and never recovers (a <strong>dead ReLU</strong>); a large learning rate can kill many units at once. <strong>Leaky ReLU</strong>, max(0.01<em>z</em>, <em>z</em>), keeps a small slope for <em>z</em> &lt; 0. <strong>GELU</strong>, <em>z</em> Φ(<em>z</em>) with Φ the standard normal cumulative distribution function (MATH 230 Lesson 3), is a smooth curve close to ReLU that many transformers use. Sigmoid survives where a value must lie between 0 and 1, such as the gates of Lesson 5 and binary outputs; softmax produces class probabilities.</p>

<h3>Momentum</h3>
<p>CS 370 Lesson 4 showed that gradient descent crawls on an elongated bowl: a learning rate small enough for the steep direction makes little progress along the shallow one. Take <em>f</em>(<em>x</em>, <em>y</em>) = (<em>x</em><sup>2</sup> + 50<em>y</em><sup>2</sup>)/2, with curvatures 1 and 50. Each step multiplies the distance along a direction of curvature <em>λ</em> by 1 − <em>αλ</em>, so we need <em>α</em> &lt; 2/50 = 0.04. Take <em>α</em> = 0.035 as an example just under that limit (nothing special about it): the <em>x</em> direction then shrinks by only 1 − 0.035 = 0.965 per step.</p>
<p><strong>Momentum</strong> keeps a running velocity: <strong>v</strong> ← <em>β</em><strong>v</strong> + <strong>g</strong>, then <strong>w</strong> ← <strong>w</strong> − <em>α</em><strong>v</strong>. Along a direction where the gradient keeps the same sign, the velocity builds up to about <strong>g</strong>/(1 − <em>β</em>), so the effective step grows by up to 1/(1 − <em>β</em>); along a direction where the gradient flips sign every step, successive gradients largely cancel. Steps to get within 0.001 of the minimum from (10, 1):</p>
<pre><code>def grad(p):
    return [p[0], 50 * p[1]]           # gradient of (x² + 50y²)/2

def steps_to_converge(lr, beta, tol=1e-3, max_steps=10000):
    p, v = [10.0, 1.0], [0.0, 0.0]
    for t in range(1, max_steps + 1):
        g = grad(p)
        v = [beta * vi + gi for vi, gi in zip(v, g)]
        p = [pi - lr * vi for pi, vi in zip(p, v)]
        if math.hypot(*p) &lt; tol:
            return t
    return None

print(steps_to_converge(0.035, 0.0), steps_to_converge(0.035, 0.7), steps_to_converge(0.035, 0.9))   # 259 52 145</code></pre>
<p>With <em>β</em> = 0 this is plain gradient descent: 259 steps, matching 0.965<sup><em>t</em></sup> × 10 &lt; 0.001, that is <em>t</em> &gt; ln(10<sup>4</sup>)/ln(1/0.965) ≈ 259. Momentum 0.7 takes 52. Momentum 0.9 overshoots and oscillates on the way in, taking 145: more momentum isn't always better, though 0.9 is the usual default on real problems, where the learning rate is tuned along with it.</p>

<h3>Adam</h3>
<p>Momentum still uses one learning rate for every parameter. <strong>Adam</strong> (Diederik Kingma and Jimmy Ba, 2015), the default optimizer for most deep learning, also scales each parameter's step by a running estimate of the size of its gradients. For each parameter, with gradient <em>g</em> at step <em>t</em> = 1, 2, …:</p>
<p class="math"><em>m</em> ← <em>β</em><sub>1</sub><em>m</em> + (1 − <em>β</em><sub>1</sub>)<em>g</em>, &nbsp;&nbsp; <em>v</em> ← <em>β</em><sub>2</sub><em>v</em> + (1 − <em>β</em><sub>2</sub>)<em>g</em><sup>2</sup><br><em>m̂</em> = <em>m</em>/(1 − <em>β</em><sub>1</sub><sup><em>t</em></sup>), &nbsp;&nbsp; <em>v̂</em> = <em>v</em>/(1 − <em>β</em><sub>2</sub><sup><em>t</em></sup>), &nbsp;&nbsp; <em>w</em> ← <em>w</em> − <em>α</em> <em>m̂</em>/(√<em>v̂</em> + <em>ε</em>)</p>
<p><em>m</em> and <em>v</em> are exponential moving averages (each new value is mixed in with weight 1 − <em>β</em>) of the gradient and its square, starting at 0, with defaults <em>β</em><sub>1</sub> = 0.9, <em>β</em><sub>2</sub> = 0.999, <em>ε</em> = 10<sup>−8</sup>. Starting at 0 biases them toward 0 early on: after one step <em>m</em> = 0.1<em>g</em>. Dividing by 1 − <em>β</em><sup><em>t</em></sup> (0.1 at <em>t</em> = 1) corrects this <strong>bias</strong>, and the correction fades as <em>t</em> grows. The ratio <em>m̂</em>/√<em>v̂</em> has no units: if every gradient of a parameter were multiplied by 1,000, its steps would not change. So every parameter moves at a rate set by <em>α</em> alone, whether its gradients are large or small. On the first step <em>m̂</em> = <em>g</em> and √<em>v̂</em> = |<em>g</em>|, so every parameter moves by almost exactly <em>α</em>:</p>
<pre><code>def adam_step(p, g, m, v, t, lr=0.001, b1=0.9, b2=0.999, eps=1e-8):
    m = [b1 * mi + (1 - b1) * gi for mi, gi in zip(m, g)]
    v = [b2 * vi + (1 - b2) * gi * gi for vi, gi in zip(v, g)]
    mhat = [mi / (1 - b1 ** t) for mi in m]
    vhat = [vi / (1 - b2 ** t) for vi in v]
    p = [pi - lr * mh / (math.sqrt(vh) + eps) for pi, mh, vh in zip(p, mhat, vhat)]
    return p, m, v

p, m, v = [10.0, 1.0], [0.0, 0.0], [0.0, 0.0]
p, m, v = adam_step(p, grad(p), m, v, 1, lr=0.1)
print([round(x, 4) for x in p])   # [9.9, 0.9]</code></pre>
<p>The gradients were 10 and 50, yet both coordinates moved by 0.1. Adam's scaling undoes much of the bowl's elongation, which is why it is forgiving to tune. The <em>ε</em> only prevents division by zero.</p>

<h3>Learning-rate schedules and batch size</h3>
<p>The learning rate is the most important hyperparameter. Most large runs change it over time with a <strong>schedule</strong>. <strong>Warmup</strong> raises it linearly from near 0 over the first few hundred or thousand steps, because early on the weights are random, Adam's estimates <em>v</em> are based on few gradients, and large steps can push the network into a bad region it never leaves. Then a <strong>cosine schedule</strong> lowers it smoothly: after warmup, at fraction <em>u</em> of the remaining steps, <em>α</em> = <em>α</em><sub>min</sub> + ½(<em>α</em><sub>max</sub> − <em>α</em><sub>min</sub>)(1 + cos <em>πu</em>), which falls from <em>α</em><sub>max</sub> at <em>u</em> = 0 to <em>α</em><sub>min</sub> at <em>u</em> = 1. Lowering the rate at the end lets SGD's noisy jitter around a minimum (CS 370 Lesson 4) settle.</p>
<pre><code>def cosine_lr(t, T, lr_max, lr_min=0.0, warmup=0):
    if t &lt; warmup:
        return lr_max * (t + 1) / warmup
    u = (t - warmup) / (T - warmup)
    return lr_min + 0.5 * (lr_max - lr_min) * (1 + math.cos(math.pi * u))

print([round(cosine_lr(t, 1000, 3e-4, warmup=100) * 1e4, 3) for t in (0, 49, 99, 100, 550, 999)])   # [0.03, 1.5, 3.0, 3.0, 1.5, 0.0]</code></pre>
<p>(The values are printed in units of 10<sup>−4</sup>.) The <strong>batch size</strong> <em>B</em> trades noise for cost. A mini-batch gradient is an average of <em>B</em> per-example gradients, so its variance falls as 1/<em>B</em> (MATH 230 Lesson 5). Larger batches give more accurate steps and use parallel hardware better, but each costs more, and beyond some size doubling <em>B</em> no longer halves the number of steps needed. A common rule of thumb when increasing <em>B</em> is to increase the learning rate in proportion, with warmup. Memory sets the upper limit: the backward pass needs every layer's activations for the whole batch.</p>

<h3>Reading loss curves</h3>
<p>Plot the training loss every few steps and the validation loss (CS 370 Lesson 5) every epoch. The shapes are diagnostic:</p>
<table>
<tr><th>What you see</th><th>Likely cause</th><th>What to try</th></tr>
<tr><td>Loss becomes NaN or shoots up</td><td>Learning rate too high; exploding values</td><td>Lower the rate; add warmup; check for log(0)</td></tr>
<tr><td>Loss stuck at ln <em>K</em> for <em>K</em> classes (2.303 for 10)</td><td>The model outputs uniform probabilities: not learning</td><td>Check the data and labels, the gradient, the initialization</td></tr>
<tr><td>Loss falls very slowly, smoothly</td><td>Learning rate too low</td><td>Raise it by factors of 3</td></tr>
<tr><td>Training loss falls, validation loss rises</td><td>Overfitting</td><td>Regularize (Lesson 3), get more data, stop earlier</td></tr>
<tr><td>Both stay high and close</td><td>Underfitting</td><td>A bigger model, longer training</td></tr>
</table>
<p>A uniform prediction over <em>K</em> classes gives each the probability 1/<em>K</em>, and cross-entropy −ln(1/<em>K</em>) = ln <em>K</em>, so a loss of 2.303 on ten classes means the model knows nothing yet. Before a long run, check that the network can <strong>overfit a single small batch</strong> (drive its loss nearly to 0); if it can't, there is a bug, and no amount of tuning will help.</p>
`,
    terms: [
      ["Fan-in", "The number of inputs to a unit, n_in; fan-out is the number of outputs, n_out."],
      ["Xavier (Glorot) initialization", "Random weights with variance 2/(n_in + n_out), keeping signal sizes roughly constant through near-linear activations."],
      ["He initialization", "Random weights with variance 2/n_in, compensating for ReLU zeroing half of its inputs."],
      ["Root mean square", "The square root of the mean of the squares of a set of numbers."],
      ["Dead ReLU", "A ReLU unit whose input is negative for every example, so it outputs 0 and receives no gradient."],
      ["Leaky ReLU", "max(0.01z, z): ReLU with a small slope for negative inputs."],
      ["GELU", "z Φ(z), a smooth activation close to ReLU, used in many transformers."],
      ["Momentum", "An optimizer that steps along a running velocity v ← βv + g, speeding up consistent directions and damping oscillating ones."],
      ["Exponential moving average", "A running average updated as a ← βa + (1 − β)x, weighting recent values most."],
      ["Adam", "An optimizer combining momentum with per-parameter step sizes from a running average of squared gradients, with bias correction."],
      ["Bias correction", "Dividing Adam's moving averages by 1 − βᵗ to undo their bias toward their starting value of 0."],
      ["Warmup", "Raising the learning rate gradually from near 0 at the start of training."],
      ["Cosine schedule", "Lowering the learning rate along half a cosine curve from its maximum to its minimum."]
    ],
    quiz: [
      { q: "A layer has 256 inputs and ReLU activations. What standard deviation does He initialization use for its weights?", choices: ["1/256", "√(2/256) ≈ 0.088", "2/256", "0.01"], answer: 1, why: "Var(w) = 2/n_in = 2/256, so the standard deviation is its square root." },
      { q: "Why does He initialization use twice the variance of 1/n_in?", choices: ["To make training faster", "ReLU zeroes the negative half of a symmetric input, halving E[x²] at each layer", "Because the backward pass doubles gradients", "To break symmetry"], answer: 1, why: "E[relu(z)²] = Var(z)/2, so the weights' variance is doubled to compensate." },
      { q: "On Adam's first step (t = 1, default settings), how far does each parameter move?", choices: ["α times its gradient", "About α, whatever its gradient", "0.1α", "Nothing: m starts at 0"], answer: 1, why: "After bias correction m̂ = g and √v̂ = |g|, so the step is α·g/|g| = ±α." },
      { q: "With momentum β = 0.9 and a gradient that stays constant, the velocity approaches:", choices: ["g", "0.9g", "10g", "g/0.9"], answer: 2, why: "v = 0.9v + g has the fixed point v = g/(1 − 0.9) = 10g." },
      { q: "A 10-class classifier's training loss sits at 2.30 for thousands of steps. What does that suggest?", choices: ["It has converged", "It is predicting uniform probabilities, ln 10 ≈ 2.30: it isn't learning", "It is overfitting", "The learning rate is perfect"], answer: 1, why: "Cross-entropy of a uniform prediction over 10 classes is ln 10." },
      { q: "Training loss keeps falling while validation loss rises. The model is:", choices: ["Underfitting", "Overfitting", "Diverging", "Using too small a learning rate"], answer: 1, why: "It is fitting the training data better while generalizing worse." }
    ],
    practice: [
      {
        q: `<p>A tanh network has layers of 512, 256 and 10 units after a 784-unit input. Give the Xavier-uniform bound <em>a</em> for each weight matrix, and the He standard deviation each would get if the activations were ReLU instead.</p>`,
        a: `<p>Xavier: <em>a</em> = √(6/(<em>n</em><sub>in</sub> + <em>n</em><sub>out</sub>)): √(6/1296) ≈ 0.068, √(6/768) ≈ 0.088 and √(6/266) ≈ 0.150. He: √(2/<em>n</em><sub>in</sub>): √(2/784) ≈ 0.051, √(2/512) = 0.0625 and √(2/256) ≈ 0.088.</p>
<pre><code>print([round(math.sqrt(6 / (a + b)), 3) for a, b in ((784, 512), (512, 256), (256, 10))])   # [0.068, 0.088, 0.15]
print([round(math.sqrt(2 / a), 4) for a in (784, 512, 256)])                               # [0.0505, 0.0625, 0.0884]</code></pre>`
      },
      {
        q: `<p>Do two steps of Adam by hand on a single parameter with <em>α</em> = 0.01 and default betas, starting at <em>w</em> = 0, with gradients 2 and then −1. Give <em>m</em>, <em>v</em>, <em>m̂</em>, <em>v̂</em> and <em>w</em> after each step.</p>`,
        a: `<p>Step 1: <em>m</em> = 0.1 × 2 = 0.2, <em>v</em> = 0.001 × 4 = 0.004; <em>m̂</em> = 0.2/0.1 = 2, <em>v̂</em> = 0.004/0.001 = 4; <em>w</em> = 0 − 0.01 × 2/2 = −0.01. Step 2: <em>m</em> = 0.9 × 0.2 − 0.1 = 0.08, <em>v</em> = 0.999 × 0.004 + 0.001 = 0.004996; <em>m̂</em> = 0.08/0.19 ≈ 0.421, <em>v̂</em> = 0.004996/0.001999 ≈ 2.499; <em>w</em> = −0.01 − 0.01 × 0.421/1.581 ≈ −0.01266. The gradient changed sign, but the momentum average is still positive, so <em>w</em> keeps moving the same way, more slowly.</p>
<pre><code>p, m, v = [0.0], [0.0], [0.0]
p, m, v = adam_step(p, [2.0], m, v, 1, lr=0.01)
p, m, v = adam_step(p, [-1.0], m, v, 2, lr=0.01)
print(round(m[0], 6), round(v[0], 6), round(p[0], 5))   # 0.08 0.004996 -0.01266</code></pre>`
      },
      {
        q: `<p>For the notes' bowl with <em>α</em> = 0.035, what happens to plain gradient descent at <em>α</em> = 0.041, and why? Then explain, using the factor 1 − <em>αλ</em>, why no single learning rate can make plain gradient descent fast on both coordinates.</p>`,
        a: `<p>Along <em>y</em>, <em>λ</em> = 50 and 1 − 0.041 × 50 = −1.05: each step flips the sign of <em>y</em> and makes it 5% larger, so it diverges. Fast progress along <em>x</em> needs 1 − <em>α</em> × 1 far below 1, that is <em>α</em> near 1, but stability along <em>y</em> needs <em>α</em> &lt; 0.04. With <em>α</em> just under 0.04 the <em>x</em> factor is at least 0.96, so about ln(10<sup>4</sup>)/0.04 ≈ 230 steps or more. The ratio of curvatures, 50, sets the cost: CS 370's condition number.</p>
<pre><code>print(steps_to_converge(0.041, 0.0))   # None</code></pre>`
      },
      {
        q: `<p>A run's loss is 2.1, 1.7, 1.4, 1.2, NaN at steps 0, 100, 200, 300 and 400, with a learning rate of 10<sup>−2</sup> and no warmup. Give two possible causes and the checks or changes you would make, in order.</p>`,
        a: `<p>Most likely the learning rate is too high: the loss was falling, then a large step pushed values into overflow (an exponential overflowing to inf, then inf − inf = NaN, or the log of 0). First rerun with a rate 3 to 10 times lower and with warmup, and see whether the NaN goes away. Second, the loss computation itself: computing softmax without subtracting the maximum (CS 370 Lesson 8), or taking log(0) for a probability that underflowed, gives NaN only when the model becomes confident. Check by printing the largest score and the smallest probability just before the failure. Gradient clipping (Lesson 5) is a further safeguard.</p>`
      }
    ],
    sources: ["glorot10", "he15", "kingma15", "d2l", "goodfellow", "karpathy19"]
  },
  {
    id: "dl3",
    title: "Generalization and regularization",
    minutes: 90,
    summary: "Why deep networks that can memorize random labels still generalize, and the tools that help them: weight decay (and why it differs from L2 under Adam), inverted dropout, early stopping, data augmentation, batch normalization and layer normalization (with layer normalization's backward pass derived and checked), and double descent.",
    notes: `
<p>A deep network usually has far more parameters than training examples. CS 370 Lesson 5 would predict disaster: a model that flexible can fit the noise. Chiyuan Zhang and colleagues (2017) showed that this really is possible: standard image networks trained on CIFAR-10 (60,000 small photos in 10 classes: 50,000 for training and 10,000 held out for testing) with the labels replaced by random ones reached essentially zero training error. They memorized 50,000 meaningless labels. Yet the same networks trained on the real labels generalize well. So capacity alone doesn't explain generalization; what the network learns depends on the data, the optimizer and the regularizers. This lesson covers the regularizers, and normalization, which mostly makes training easier but interacts with all of them.</p>

<h3>Weight decay</h3>
<p>CS 370 Lesson 5's L2 regularization adds (<em>λ</em>/2)Σ<em>w</em><sup>2</sup> to the loss (the ½ makes the gradient tidy), which adds <em>λw</em> to each weight's gradient. A gradient descent step becomes</p>
<p class="math"><em>w</em> ← <em>w</em> − <em>α</em>(<em>g</em> + <em>λw</em>) = (1 − <em>αλ</em>)<em>w</em> − <em>αg</em></p>
<p>so each step first shrinks every weight by the factor 1 − <em>αλ</em>: <strong>weight decay</strong>. A weight that the data doesn't support decays toward 0. With <em>α</em> = 0.1 and <em>λ</em> = 0.01, a weight of 2 with no data gradient is multiplied by 0.999 each step:</p>
<pre><code>w = 2.0
for _ in range(100):
    w = w - 0.1 * (0.0 + 0.01 * w)
print(round(w, 4))   # 1.8096</code></pre>
<p>For plain SGD the two descriptions are the same. For Adam they are not. If <em>λw</em> is added to the gradient, Adam divides it by √<em>v̂</em> like everything else, so weights with large gradients are barely regularized. Ilya Loshchilov and Frank Hutter (2019) proposed <strong>AdamW</strong>, which applies the decay directly, <em>w</em> ← <em>w</em> − <em>αλw</em>, outside the adaptive step; it generalizes better and is the usual choice for transformers. Biases and normalization parameters are usually not decayed.</p>

<h3>Dropout</h3>
<p><strong>Dropout</strong> (Nitish Srivastava, Geoffrey Hinton and colleagues, 2014) sets each unit's output to 0 with probability <em>p</em>, independently, on every training step. A unit can't rely on any particular other unit being present, so the network must spread what it knows over many units. One view: each step trains a different random subnetwork, and the full network behaves like an average of exponentially many of them.</p>
<p>At test time we want the full network, deterministic. A kept unit's output <em>x</em> appears with probability 1 − <em>p</em>, so its expected value during training is (1 − <em>p</em>)<em>x</em>; to make training and test match, <strong>inverted dropout</strong> divides the kept outputs by 1 − <em>p</em> during training, so the expected value is exactly <em>x</em>, and does nothing at test time:</p>
<p class="math">E[output] = <em>p</em> · 0 + (1 − <em>p</em>) · <em>x</em>/(1 − <em>p</em>) = <em>x</em></p>
<pre><code>import math, random

def dropout(x, p, rng):
    """Inverted dropout: zero each entry with probability p, scale survivors by 1/(1 - p)."""
    mask = [0.0 if rng.random() &lt; p else 1.0 / (1 - p) for _ in x]
    return [xi * mi for xi, mi in zip(x, mask)], mask

out, mask = dropout([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], 0.5, random.Random(0))
print(out)   # [2.0, 4.0, 0.0, 0.0, 10.0, 0.0]
ones = dropout([1.0] * 10000, 0.3, random.Random(0))[0]
print(round(sum(ones) / len(ones), 3))   # 1.007</code></pre>
<p>Over 10,000 entries the average is 1.007, close to the expected 1. Each output is <em>x</em> times its mask value, so the backward pass multiplies the incoming gradient by the same mask: dropped units pass no gradient. A training framework must therefore know whether it is training or evaluating; forgetting to switch dropout off for evaluation is a classic bug that makes a model look worse and noisier than it is. Typical rates are 0.1 to 0.5.</p>

<h3>Early stopping</h3>
<p>The validation loss usually falls, bottoms out and rises as training starts to overfit. <strong>Early stopping</strong> keeps a copy (a <strong>checkpoint</strong>) of the weights with the best validation loss so far, and stops when the validation loss hasn't improved for a number of epochs called the <strong>patience</strong>:</p>
<pre><code>val = [0.92, 0.71, 0.60, 0.55, 0.53, 0.54, 0.52, 0.56, 0.58, 0.61, 0.65]

def early_stop(val, patience):
    best, best_epoch = math.inf, -1
    for epoch, loss in enumerate(val):
        if loss &lt; best:
            best, best_epoch = loss, epoch
        elif epoch - best_epoch >= patience:
            return best_epoch, epoch
    return best_epoch, len(val) - 1

print(early_stop(val, 2), early_stop(val, 3))   # (6, 8) (6, 9)</code></pre>
<p>Both settings keep the weights from epoch 6 (loss 0.52). With a patience of 1, the small rise at epoch 5 would have stopped training before that better minimum. Early stopping limits how far the weights travel from their small initial values, which acts much like weight decay. The validation set it uses is now part of model selection, so the final score must still come from a separate test set (CS 370 Lesson 5).</p>

<h3>Data augmentation</h3>
<p>More data is the best regularizer. <strong>Data augmentation</strong> makes more from what we have by applying transformations that don't change the label: for photos, random crops, horizontal flips, small rotations and color changes, each drawn fresh every epoch, so the network rarely sees exactly the same image twice. The transformations encode knowledge we have and the network doesn't: a flipped cat is still a cat. They must really preserve the label: a horizontally flipped "b" is a "d", and a flipped road sign may mean something else. For text, augmentation is harder (replacing a word can change the meaning), and large models rely on huge corpora instead.</p>

<h3>Batch normalization</h3>
<p>Lesson 2 chose the initial weights so that each layer's inputs have a reasonable scale. Once training starts, the weights change and the scale drifts. <strong>Batch normalization</strong> (Sergey Ioffe and Christian Szegedy, 2015) fixes the scale inside the network. For each feature (unit) <em>j</em>, over the <em>B</em> examples of the batch, compute the mean <em>μ</em><sub><em>j</em></sub> and variance <em>σ</em><sub><em>j</em></sub><sup>2</sup>, and replace each value by</p>
<p class="math"><em>x̂</em> = (<em>x</em> − <em>μ</em><sub><em>j</em></sub>)/√(<em>σ</em><sub><em>j</em></sub><sup>2</sup> + <em>ε</em>), &nbsp;&nbsp; <em>y</em> = <em>γ</em><sub><em>j</em></sub><em>x̂</em> + <em>β</em><sub><em>j</em></sub></p>
<p>where <em>ε</em> (such as 10<sup>−5</sup>) avoids dividing by 0, and <em>γ</em> and <em>β</em> are learned, so the layer can still produce any scale and shift it needs. It allows much higher learning rates and makes deep networks far less sensitive to initialization. Its weakness is its dependence on the batch: each example's output depends on the others in its batch, small batches give noisy statistics, and at test time there may be a single example. So during training it also keeps running averages of <em>μ</em> and <em>σ</em><sup>2</sup>, and uses those at test time, which means it behaves differently in the two modes, like dropout.</p>

<h3>Layer normalization</h3>
<p><strong>Layer normalization</strong> (Jimmy Ba, Jamie Kiros and Geoffrey Hinton, 2016), which CS 370 Lesson 8 mentioned inside the transformer, normalizes each example over its own features instead: one mean and variance per row, not per column. It doesn't depend on the batch at all and behaves the same in training and testing, which suits sequence models, where batches contain sequences of different lengths. Compare the two on a batch of two examples whose features have very different scales:</p>
<pre><code>def mean(xs):
    return sum(xs) / len(xs)

def layernorm(x, gamma, beta, eps=1e-5):
    mu = mean(x)
    var = mean([(xi - mu) ** 2 for xi in x])
    s = math.sqrt(var + eps)
    xhat = [(xi - mu) / s for xi in x]
    return [g * xh + b for g, xh, b in zip(gamma, xhat, beta)], (xhat, s)

def batchnorm(B, eps=1e-5):
    cols = []
    for c in zip(*B):
        mu = mean(c)
        var = mean([(v - mu) ** 2 for v in c])
        cols.append([(v - mu) / math.sqrt(var + eps) for v in c])
    return [list(r) for r in zip(*cols)]

B = [[1.0, 10.0, 100.0], [3.0, 30.0, 300.0]]
print([[round(v, 3) for v in r] for r in batchnorm(B)])                           # [[-1.0, -1.0, -1.0], [1.0, 1.0, 1.0]]
print([[round(v, 3) for v in layernorm(r, [1.0] * 3, [0.0] * 3)[0]] for r in B])   # [[-0.805, -0.604, 1.409], [-0.805, -0.604, 1.409]]</code></pre>
<p>(Here <em>γ</em> = 1 and <em>β</em> = 0.) Batch normalization makes each column mean 0 and variance 1 across the two examples. Layer normalization makes each row mean 0 and variance 1; the second example is exactly three times the first, so after normalization the two are identical.</p>
<p><b>The backward pass.</b> Every <em>x̂</em><sub><em>i</em></sub> depends on every <em>x</em><sub><em>k</em></sub> of its row, through <em>μ</em> and <em>s</em> = √(<em>σ</em><sup>2</sup> + <em>ε</em>), so the gradient isn't just the incoming one divided by <em>s</em>. Let <em>g</em><sub><em>i</em></sub> = ∂<em>L</em>/∂<em>x̂</em><sub><em>i</em></sub> = <em>γ</em><sub><em>i</em></sub> ∂<em>L</em>/∂<em>y</em><sub><em>i</em></sub>, over a row of <em>d</em> entries. Three partial derivatives are needed, each from the definitions: ∂<em>μ</em>/∂<em>x</em><sub><em>k</em></sub> = 1/<em>d</em>; ∂<em>σ</em><sup>2</sup>/∂<em>x</em><sub><em>k</em></sub> = 2(<em>x</em><sub><em>k</em></sub> − <em>μ</em>)/<em>d</em> (the terms from <em>μ</em> cancel, because the deviations add up to 0); so ∂<em>s</em>/∂<em>x</em><sub><em>k</em></sub> = (<em>x</em><sub><em>k</em></sub> − <em>μ</em>)/(<em>ds</em>) = <em>x̂</em><sub><em>k</em></sub>/<em>d</em>. By the quotient rule, with <em>δ</em><sub><em>ik</em></sub> = 1 if <em>i</em> = <em>k</em> and 0 otherwise,</p>
<p class="math">∂<em>x̂</em><sub><em>i</em></sub>/∂<em>x</em><sub><em>k</em></sub> = (<em>δ</em><sub><em>ik</em></sub> − 1/<em>d</em>)/<em>s</em> − (<em>x</em><sub><em>i</em></sub> − <em>μ</em>) · <em>x̂</em><sub><em>k</em></sub>/(<em>d s</em><sup>2</sup>) = (<em>δ</em><sub><em>ik</em></sub> − 1/<em>d</em> − <em>x̂</em><sub><em>i</em></sub><em>x̂</em><sub><em>k</em></sub>/<em>d</em>)/<em>s</em></p>
<p>Multiplying by <em>g</em><sub><em>i</em></sub> and summing over <em>i</em> gives the VJP:</p>
<p class="math">∂<em>L</em>/∂<em>x</em><sub><em>k</em></sub> = (<em>g</em><sub><em>k</em></sub> − mean(<em>g</em>) − <em>x̂</em><sub><em>k</em></sub> · mean(<em>g x̂</em>))/<em>s</em></p>
<p>and ∂<em>L</em>/∂<em>γ</em><sub><em>i</em></sub> = (∂<em>L</em>/∂<em>y</em><sub><em>i</em></sub>) <em>x̂</em><sub><em>i</em></sub>, ∂<em>L</em>/∂<em>β</em><sub><em>i</em></sub> = ∂<em>L</em>/∂<em>y</em><sub><em>i</em></sub>. The two subtracted terms remove the parts of the gradient that would change the row's mean or scale, which normalization undoes anyway: the result always adds up to 0. Check it against a centred difference for <em>L</em> = <em>y</em><sub>0</sub>:</p>
<pre><code>def layernorm_backward(dy, gamma, cache):
    xhat, s = cache
    g = [d * gm for d, gm in zip(dy, gamma)]              # dL/dxhat
    mg = mean(g)
    mgx = mean([gi * xh for gi, xh in zip(g, xhat)])
    dx = [(gi - mg - xh * mgx) / s for gi, xh in zip(g, xhat)]
    dgamma = [d * xh for d, xh in zip(dy, xhat)]
    return dx, dgamma, list(dy)

x = [2.0, 4.0, 6.0, 8.0]
gamma, beta = [1.0] * 4, [0.0] * 4
y, cache = layernorm(x, gamma, beta)
print([round(v, 4) for v in y])     # [-1.3416, -0.4472, 0.4472, 1.3416]
dx, dg, db = layernorm_backward([1.0, 0.0, 0.0, 0.0], gamma, cache)
print([round(v, 4) for v in dx])    # [0.1342, -0.1789, -0.0447, 0.0894]

def y0(xs):
    return layernorm(xs, gamma, beta)[0][0]
h = 1e-6
num = [(y0([v + h * (i == k) for k, v in enumerate(x)]) - y0([v - h * (i == k) for k, v in enumerate(x)])) / (2 * h)
       for i in range(4)]
print([round(v, 4) for v in num])   # [0.1342, -0.1789, -0.0447, 0.0894]</code></pre>
<p>(<code>i == k</code> is 1 for the entry being nudged and 0 for the others.) The gradients add up to 0, as predicted. Batch normalization's backward pass is the same formula applied down each column instead of along each row.</p>

<h3>Double descent</h3>
<p>The classical picture of CS 370 Lesson 5 is a U: as a model grows, test error first falls (less underfitting) and then rises (overfitting). Mikhail Belkin and colleagues (2019) and Preetum Nakkiran and colleagues (2019) found that for many models, including deep networks, the curve continues: test error rises to a peak near the <strong>interpolation threshold</strong>, the size at which the model can just barely fit every training example exactly, and then falls again as the model grows further, often below the bottom of the U. This is <strong>double descent</strong>. Near the threshold there is essentially one way to fit the data, and it is contorted; far beyond it there are many exact fits, and gradient descent from small initial weights tends to find a smooth one. The peak is worst without regularization and is softened by weight decay or more data. It is one reason practitioners train very large models and regularize them, instead of choosing a small model.</p>
`,
    terms: [
      ["Weight decay", "Shrinking every weight by a factor 1 − αλ each step; for SGD the same as L2 regularization."],
      ["AdamW", "Adam with weight decay applied directly to the weights rather than added to the gradient."],
      ["Dropout", "Setting each unit's output to 0 with probability p during training."],
      ["Inverted dropout", "Scaling kept outputs by 1/(1 − p) during training so that nothing changes at test time."],
      ["Early stopping", "Keeping the weights with the best validation loss and stopping when it stops improving."],
      ["Checkpoint", "A saved copy of a model's weights (and optimizer state) at some point in training."],
      ["Patience", "The number of epochs without improvement that early stopping waits before stopping."],
      ["Data augmentation", "Training on label-preserving transformations of the examples, such as crops and flips."],
      ["Batch normalization", "Normalizing each feature over the examples of a batch, then scaling and shifting by learned γ and β."],
      ["Layer normalization", "Normalizing each example over its own features, then scaling and shifting by learned γ and β."],
      ["Interpolation threshold", "The model size at which it can just fit every training example exactly."],
      ["Double descent", "Test error falling, rising to a peak near the interpolation threshold, then falling again as models grow."]
    ],
    quiz: [
      { q: "With inverted dropout at p = 0.2, a kept unit's output x becomes:", choices: ["0.2x", "0.8x", "x/0.8 = 1.25x", "x"], answer: 2, why: "Kept outputs are divided by 1 − p, so the expected value stays x." },
      { q: "What does inverted dropout do at test time?", choices: ["Drops units with probability p", "Multiplies outputs by 1 − p", "Nothing: the layer is the identity", "Averages several random masks"], answer: 2, why: "The scaling during training already makes the expected values match." },
      { q: "Why is AdamW's decay different from adding λw to the gradient under Adam?", choices: ["It isn't different", "Adam divides the added λw by √v̂, so weights with large gradients would be barely regularized", "AdamW uses a larger λ", "AdamW has no momentum"], answer: 1, why: "Decoupling the decay applies the same shrinkage to every weight." },
      { q: "Which normalization gives an example's output independently of the other examples in its batch?", choices: ["Batch normalization", "Layer normalization", "Both", "Neither"], answer: 1, why: "Layer normalization uses each example's own mean and variance." },
      { q: "In layer normalization's backward pass, the gradient with respect to a row's inputs always:", choices: ["Equals the incoming gradient", "Adds up to 0", "Is positive", "Is divided by d"], answer: 1, why: "Shifting every input by the same amount doesn't change the output, so the components of the gradient sum to 0." },
      { q: "Where is the test error peak in double descent?", choices: ["At the smallest models", "Near the interpolation threshold, where the model can just fit the training data", "At the largest models", "There is no peak"], answer: 1, why: "Just at the threshold there is essentially one exact fit, and it is contorted." }
    ],
    practice: [
      {
        q: `<p>A layer has outputs (2, −1, 4, 0.5) and inverted dropout with <em>p</em> = 0.5 draws the mask "keep, drop, keep, drop". Give the outputs, and the gradient with respect to the inputs if the gradient of the loss with respect to the outputs is (1, 1, 1, 1). Then show that the expected output of the unit whose value is 4 is 4.</p>`,
        a: `<p>Kept values are doubled: (4, 0, 8, 0). The backward pass multiplies by the same mask (2, 0, 2, 0): gradient (2, 0, 2, 0). Expected output: 0.5 × 0 + 0.5 × 8 = 4.</p>`
      },
      {
        q: `<p>Batch normalization of a single feature over a batch of 4 values (1, 2, 3, 6), with <em>γ</em> = 2, <em>β</em> = 1 and <em>ε</em> = 0. Give the outputs. What goes wrong with a batch of size 1?</p>`,
        a: `<p>The mean is 3 and the variance is (4 + 1 + 0 + 9)/4 = 3.5, so <em>σ</em> ≈ 1.871 and <em>x̂</em> ≈ (−1.069, −0.535, 0, 1.604), giving <em>y</em> = 2<em>x̂</em> + 1 ≈ (−1.138, −0.069, 1, 4.207). With one example, it is its own mean and the variance is 0, so <em>x̂</em> = 0/√<em>ε</em> = 0 and every output is <em>β</em>: the layer erases all information. That is why batch normalization uses running averages at test time.</p>
<pre><code>c = [1.0, 2.0, 3.0, 6.0]
mu = mean(c)
sd = math.sqrt(mean([(v - mu) ** 2 for v in c]))
print([round(2 * (v - mu) / sd + 1, 3) for v in c])   # [-1.138, -0.069, 1.0, 4.207]</code></pre>`
      },
      {
        q: `<p>Using layer normalization's backward formula, show that if the incoming gradient ∂<em>L</em>/∂<em>y</em> is the same number <em>c</em> for every entry (with <em>γ</em> = 1), the gradient with respect to <em>x</em> is 0. Why does that make sense?</p>`,
        a: `<p>Then <em>g</em><sub><em>k</em></sub> = <em>c</em> for every <em>k</em>, so mean(<em>g</em>) = <em>c</em>, and mean(<em>g x̂</em>) = <em>c</em> · mean(<em>x̂</em>) = 0, because the normalized values have mean 0. So ∂<em>L</em>/∂<em>x</em><sub><em>k</em></sub> = (<em>c</em> − <em>c</em> − 0)/<em>s</em> = 0. Such a gradient asks to raise every output by the same amount, which only <em>β</em> can do: changing the inputs can't move the mean of <em>x̂</em>, which is always 0. (That push goes to ∂<em>L</em>/∂<em>β</em> instead.)</p>
<pre><code>dx, _, _ = layernorm_backward([0.7] * 4, gamma, cache)
print([round(v, 12) for v in dx])   # [0.0, 0.0, 0.0, 0.0]</code></pre>`
      },
      {
        q: `<p>A model's validation losses per epoch, starting from epoch 0, are 1.10, 0.84, 0.70, 0.66, 0.67, 0.65, 0.68, 0.70, 0.73. Which weights does early stopping keep, and at which epoch does it stop, with patience 2 and with patience 3? Is the best validation loss a fair estimate of performance on new data?</p>`,
        a: `<p>The best loss is 0.65 at epoch 5. With patience 2, epochs 6 and 7 don't improve, so it stops at epoch 7; with patience 3, at epoch 8. Both keep epoch 5's weights. The best validation loss is slightly optimistic: it was chosen as the minimum of several noisy numbers using the validation set itself. Report the test set.</p>
<pre><code>print(early_stop([1.10, 0.84, 0.70, 0.66, 0.67, 0.65, 0.68, 0.70, 0.73], 2), early_stop([1.10, 0.84, 0.70, 0.66, 0.67, 0.65, 0.68, 0.70, 0.73], 3))   # (5, 7) (5, 8)</code></pre>`
      }
    ],
    sources: ["zhang17", "srivastava14", "loshchilov19", "ioffe15", "ba16", "belkin19", "nakkiran19", "d2l"]
  }
]);

CSA.addUnits("cs470", [
  {
    id: "dl4",
    title: "Convolutional networks",
    minutes: 90,
    summary: "Why fully connected layers don't suit images, convolution as a sparse linear map with shared weights, output sizes with padding and stride, channels and parameter counts, receptive fields, max and average pooling (and pooling's backward pass), a small CNN for digits counted layer by layer, and what learned filters look like.",
    notes: `
<p>A 224 × 224 color photo has 224 × 224 × 3 = 150,528 numbers. A fully connected layer from it to just 1,000 units needs 150,529,000 weights and biases, and it treats every pixel as unrelated to every other: a cat in the top-left corner and the same cat in the bottom-right share nothing. Images have structure that such a layer ignores. Nearby pixels are related (<strong>locality</strong>), and a pattern means the same thing wherever it appears. A <strong>convolutional network</strong> (CNN) builds both facts into its layers. This lesson derives the convolutional layer, counts what it costs, and assembles a small network.</p>

<h3>Convolution as a structured linear map</h3>
<p>Start in one dimension. Slide a short <strong>kernel</strong> (or <strong>filter</strong>) <strong>k</strong> of length <em>m</em> along a signal <strong>x</strong> and, at each position, take the dot product: <em>y</em><sub><em>i</em></sub> = Σ<sub><em>j</em></sub> <em>k</em><sub><em>j</em></sub><em>x</em><sub><em>i</em>+<em>j</em></sub>. The kernel (−1, 0, 1) computes <em>x</em><sub><em>i</em>+2</sub> − <em>x</em><sub><em>i</em></sub>, a difference across each position: it responds where the signal changes.</p>
<pre><code>def conv1d(x, k):
    n, m = len(x), len(k)
    return [sum(k[j] * x[i + j] for j in range(m)) for i in range(n - m + 1)]

print(conv1d([0, 0, 1, 1, 1, 0], [-1, 0, 1]))   # [1, 1, 0, -1]</code></pre>
<p>The output rises where the signal steps up and falls where it steps down. Each output is a linear combination of inputs, so the whole operation is a matrix: row <em>i</em> holds the kernel, shifted <em>i</em> places to the right.</p>
<pre><code>def conv1d_matrix(n, k):
    m = len(k)
    return [[k[c - r] if 0 &lt;= c - r &lt; m else 0 for c in range(n)] for r in range(n - m + 1)]

for row in conv1d_matrix(6, [-1, 0, 1]):
    print(row)
# [-1, 0, 1, 0, 0, 0]
# [0, -1, 0, 1, 0, 0]
# [0, 0, -1, 0, 1, 0]
# [0, 0, 0, -1, 0, 1]</code></pre>
<p>A convolutional layer is a fully connected layer whose matrix is forced into this shape. Two constraints make it so: each output looks only at a few neighbouring inputs (<strong>sparse connections</strong>, most entries 0), and every row uses the same few numbers (<strong>weight sharing</strong>). The matrix above has 24 entries but only 3 parameters, and the count doesn't grow with the signal's length. Weight sharing gives <strong>translation equivariance</strong>: shift the input and the output shifts by the same amount, because the same detector runs at every position. Because the layer is linear, its backward pass is the transpose of this matrix (Lesson 1), which turns out to be another convolution; libraries never build the matrix.</p>
<p>Mathematicians define convolution with the kernel flipped, Σ<em>k</em><sub><em>j</em></sub><em>x</em><sub><em>i</em>−<em>j</em></sub>. What deep learning libraries compute, without the flip, is strictly <strong>cross-correlation</strong>. Since the kernel is learned, the difference doesn't matter (the network would just learn the flipped kernel), and everyone calls it convolution.</p>

<h3>Two dimensions, padding and stride</h3>
<p>For an image, the kernel is a small square, such as 3 × 3, slid over every position: output (<em>i</em>, <em>j</em>) is Σ<sub><em>a</em>,<em>b</em></sub> <em>K</em><sub><em>ab</em></sub> <em>x</em><sub><em>i</em>+<em>a</em>, <em>j</em>+<em>b</em></sub>. The Sobel kernel below is a classic hand-designed vertical-edge detector, a 2D version of (−1, 0, 1) with the middle row weighted double. On an image whose left half is dark (0) and right half bright (9):</p>
<pre><code>def conv2d(img, K):
    """One channel, no padding, stride 1."""
    k = len(K)
    H, W = len(img), len(img[0])
    return [[sum(K[a][b] * img[i + a][j + b] for a in range(k) for b in range(k))
             for j in range(W - k + 1)] for i in range(H - k + 1)]

img = [[0, 0, 0, 9, 9, 9]] * 5                        # dark left half, bright right half
vertical = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]
horizontal = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]]
for row in conv2d(img, vertical):
    print(row)
# [0, 36, 36, 0]
# [0, 36, 36, 0]
# [0, 36, 36, 0]
print(conv2d(img, horizontal)[0])                     # [0, 0, 0, 0]</code></pre>
<p>The vertical-edge filter responds (9 × (1 + 2 + 1) = 36) in the two columns whose window straddles the edge, and the horizontal-edge filter, its transpose, sees nothing. (<code>[row] * 5</code> repeats one row object, which is fine here because the image is never changed.) Notice that a 6-wide image gave a 4-wide output: a 3 × 3 window fits in only 6 − 3 + 1 positions. Two settings control the size. <strong>Padding</strong> <em>p</em> adds a border of <em>p</em> zeros on every side first, so that the window can be centred on edge pixels; <strong>stride</strong> <em>s</em> moves the window <em>s</em> pixels at a time instead of 1. For an input of size <em>n</em> and a kernel of size <em>k</em>:</p>
<p class="math">output size = ⌊(<em>n</em> + 2<em>p</em> − <em>k</em>)/<em>s</em>⌋ + 1</p>
<p>The padded input has <em>n</em> + 2<em>p</em> positions, the last window starts at position <em>n</em> + 2<em>p</em> − <em>k</em>, and windows start at 0, <em>s</em>, 2<em>s</em>, …, giving ⌊(<em>n</em> + 2<em>p</em> − <em>k</em>)/<em>s</em>⌋ + 1 of them.</p>
<pre><code>def out_size(n, k, p, s):
    return (n + 2 * p - k) // s + 1

print(out_size(32, 3, 1, 1), out_size(32, 3, 1, 2), out_size(32, 5, 0, 1), out_size(7, 3, 0, 2))   # 32 16 28 3</code></pre>
<p>A 3 × 3 kernel with padding 1 and stride 1 keeps the size ("same" padding); with stride 2 it halves it, (32 + 2 − 3)/2 = 15.5, rounded down to 15, plus 1.</p>

<h3>Channels and parameter counts</h3>
<p>A color image has three <strong>channels</strong> (red, green, blue), so its shape is (3, <em>H</em>, <em>W</em>). A filter then has shape (<em>C</em><sub>in</sub>, <em>k</em>, <em>k</em>): it spans all input channels and sums over them, giving one output number per position. A layer has <em>C</em><sub>out</sub> filters, each with one bias, producing <em>C</em><sub>out</sub> output channels, called <strong>feature maps</strong>: each is a map of where one learned pattern appears. So</p>
<p class="math">parameters = <em>C</em><sub>out</sub> × (<em>C</em><sub>in</sub> × <em>k</em> × <em>k</em> + 1)</p>
<pre><code>def conv_params(c_in, c_out, k):
    return c_out * (c_in * k * k + 1)

print(conv_params(3, 64, 3))        # 1792
print(224 * 224 * 3 * 1000 + 1000)  # 150529000</code></pre>
<p>A layer of 64 filters of 3 × 3 on a color image has 1,792 parameters, whatever the image size, against 150 million for the fully connected layer in the introduction. The computation still grows with the image: with padding 1, so the output stays 224 × 224, each of the 224 × 224 × 64 outputs takes 27 multiplications (3 × 3 × 3), about 87 million in all.</p>

<h3>Receptive fields</h3>
<p>The <strong>receptive field</strong> of a unit is the region of the input image that can affect it. A 3 × 3 convolution sees 3 × 3 pixels; a 3 × 3 convolution on top of that sees 5 × 5, since each of its nine inputs sees a 3 × 3 patch, offset by one pixel from its neighbour. With stride, each step of a later layer corresponds to several input pixels. Track the receptive field <em>r</em> and the <strong>jump</strong> <em>j</em> (input pixels between neighbouring units) layer by layer, starting from <em>r</em> = <em>j</em> = 1: a layer with kernel <em>k</em> and stride <em>s</em> sets <em>r</em> ← <em>r</em> + (<em>k</em> − 1)<em>j</em>, then <em>j</em> ← <em>js</em>.</p>
<pre><code>def receptive_field(layers):
    r, j = 1, 1
    for k, s in layers:
        r += (k - 1) * j
        j *= s
    return r

print(receptive_field([(3, 1)] * 3))                                          # 7
print(receptive_field([(3, 1), (2, 2), (3, 1), (2, 2), (3, 1)]))              # 18</code></pre>
<p>Three stacked 3 × 3 layers see 7 × 7. The second line interleaves 2 × 2 layers of stride 2 (the pooling layers of the next section): after two of them, each step of the last layer is 4 pixels, and its 3 × 3 kernel adds 2 × 4 = 8 to the field. Deep layers of a CNN therefore see large parts of the image while each layer stays small. Stacking small kernels is also cheaper than one large one: two 3 × 3 layers with <em>C</em> channels in and out have 2 × 9<em>C</em><sup>2</sup> weights and see 5 × 5, while one 5 × 5 layer has 25<em>C</em><sup>2</sup>, and the stack has an extra nonlinearity in between. The VGG networks (2014) used this argument to build everything from 3 × 3 layers.</p>

<h3>Pooling</h3>
<p>A <strong>pooling</strong> layer shrinks each feature map by summarizing small windows, usually 2 × 2 with stride 2, which halves the height and width. <strong>Max pooling</strong> keeps the largest value of each window; it has no parameters and works on each channel separately. It reports whether a feature appeared somewhere in the window, not exactly where, which makes the network tolerate small shifts.</p>
<pre><code>def maxpool2(img):
    return [[max(img[i][j], img[i][j + 1], img[i + 1][j], img[i + 1][j + 1])
             for j in range(0, len(img[0]) - 1, 2)] for i in range(0, len(img) - 1, 2)]

A = [[1, 3, 2, 0],
     [4, 2, 1, 5],
     [0, 1, 3, 3],
     [2, 6, 1, 0]]
print(maxpool2(A))   # [[4, 5], [6, 3]]</code></pre>
<p>Its backward pass follows from the derivative of max: the output equals one input (the largest), so the gradient flows to that input alone and the other three get 0. The forward pass must therefore remember where each maximum was. <strong>Average pooling</strong> takes the mean instead, and spreads the gradient equally. Many modern networks end with <strong>global average pooling</strong>: average each of the last feature maps over all positions, giving one number per channel, then a single fully connected layer to the classes. Strided convolutions can also replace pooling.</p>

<h3>A small CNN</h3>
<p>For 28 × 28 grayscale digits (one channel, ten classes), a small network in the style of Yann LeCun's LeNet:</p>
<table>
<tr><th>Layer</th><th>Output shape</th><th>Parameters</th></tr>
<tr><td>Input</td><td>(1, 28, 28)</td><td>0</td></tr>
<tr><td>Conv 3 × 3, 8 filters, padding 1, ReLU</td><td>(8, 28, 28)</td><td>8 × (1 × 9 + 1) = 80</td></tr>
<tr><td>Max pool 2 × 2</td><td>(8, 14, 14)</td><td>0</td></tr>
<tr><td>Conv 3 × 3, 16 filters, padding 1, ReLU</td><td>(16, 14, 14)</td><td>16 × (8 × 9 + 1) = 1,168</td></tr>
<tr><td>Max pool 2 × 2</td><td>(16, 7, 7)</td><td>0</td></tr>
<tr><td>Flatten, fully connected to 10</td><td>(10,)</td><td>784 × 10 + 10 = 7,850</td></tr>
</table>
<pre><code>p1, p2, p3 = conv_params(1, 8, 3), conv_params(8, 16, 3), 16 * 7 * 7 * 10 + 10
print(p1, p2, p3, p1 + p2 + p3)   # 80 1168 7850 9098</code></pre>
<p>"Flatten" lays the 16 × 7 × 7 = 784 numbers out as one vector. The whole network has 9,098 parameters, against 101,770 for CS 370's fully connected network on the same images, and such networks classify handwritten digits more accurately. Most of its parameters are in the last layer; most of its computation is in the convolutions.</p>

<h3>What learned filters look like</h3>
<p>Nobody designs a CNN's filters: they start random and are learned by backpropagation. Yet the first layer of almost every network trained on photos learns the same kinds of filter: oriented edge detectors at various angles, like the Sobel kernels above, small spots and stripes, and patches sensitive to color contrasts. (Neuroscientists had found cells responding to oriented edges in the visual cortex of cats in the 1950s and 1960s.) Visualizing what deeper units respond to, Matthew Zeiler and Rob Fergus (2014) found a hierarchy: the second layer responds to corners, textures and simple combinations of edges, middle layers to parts such as eyes, wheels or fur, and the last layers to whole objects. Each layer builds its features from the previous layer's, over a larger receptive field. This hierarchy is learned from data, which is why the same architecture works for X-rays, satellite images and microscope slides.</p>
`,
    terms: [
      ["Convolutional network (CNN)", "A network whose main layers are convolutions, built for data on a grid such as images."],
      ["Kernel (filter)", "The small array of weights a convolution slides over its input."],
      ["Weight sharing", "Using the same weights at every position, so the parameter count doesn't depend on the input size."],
      ["Translation equivariance", "Shifting the input shifts the output by the same amount."],
      ["Cross-correlation", "Sliding a kernel without flipping it; what deep learning libraries call convolution."],
      ["Padding", "Zeros added around the input so that windows can cover its edges."],
      ["Stride", "How many positions the window moves between outputs."],
      ["Channel", "One of the stacked 2D arrays of an image or a layer's output, such as red, green and blue."],
      ["Feature map", "One output channel of a convolutional layer: where one learned pattern appears."],
      ["Receptive field", "The region of the input that can affect a unit."],
      ["Max pooling", "Replacing each window by its largest value; the gradient flows only to that value."],
      ["Global average pooling", "Averaging each feature map over all positions, giving one number per channel."]
    ],
    quiz: [
      { q: "What is the output size of a convolution with n = 28, k = 5, padding 2 and stride 1?", choices: ["24", "26", "28", "14"], answer: 2, why: "(28 + 4 − 5)/1 + 1 = 28." },
      { q: "How many parameters does a convolutional layer with 32 input channels, 64 filters of 3 × 3 and biases have?", choices: ["18,432", "18,496", "576", "2,048"], answer: 1, why: "64 × (32 × 9 + 1) = 64 × 289 = 18,496." },
      { q: "Which property comes from weight sharing?", choices: ["Shifting the input shifts the output (translation equivariance)", "Invariance to rotation", "A smaller output", "Nonlinearity"], answer: 0, why: "The same detector runs at every position, so a shifted pattern produces a shifted response." },
      { q: "What is the receptive field of four stacked 3 × 3 convolutions with stride 1?", choices: ["7 × 7", "12 × 12", "9 × 9", "Four 3 × 3 patches"], answer: 2, why: "Each layer adds 2: 1 + 4 × 2 = 9, so 9 × 9." },
      { q: "In the backward pass of 2 × 2 max pooling, the gradient of one output goes to:", choices: ["All four inputs equally", "Only the input that was the maximum", "The top-left input", "None of them"], answer: 1, why: "The output equals the maximum input; the others don't affect it." },
      { q: "Why do learned CNNs use small kernels stacked deep rather than one large kernel?", choices: ["Large kernels can't be trained", "Two 3 × 3 layers see 5 × 5 with 18C² weights instead of 25C², and add a nonlinearity", "Small kernels need no padding", "It reduces the receptive field"], answer: 1, why: "The stack covers the same field with fewer parameters and more expressive power." }
    ],
    practice: [
      {
        q: `<p>An input of shape (3, 64, 64) passes through: conv 5 × 5, 16 filters, stride 1, no padding; max pool 2 × 2; conv 3 × 3, 32 filters, stride 2, padding 1. Give the shape and parameter count after each layer.</p>`,
        a: `<p>Conv: (64 − 5)/1 + 1 = 60, so (16, 60, 60), with 16 × (3 × 25 + 1) = 1,216 parameters. Pool: (16, 30, 30), no parameters. Conv: ⌊(30 + 2 − 3)/2⌋ + 1 = 14 + 1 = 15, so (32, 15, 15), with 32 × (16 × 9 + 1) = 4,640 parameters.</p>
<pre><code>print(out_size(64, 5, 0, 1), conv_params(3, 16, 5), out_size(30, 3, 1, 2), conv_params(16, 32, 3))   # 60 1216 15 4640</code></pre>`
      },
      {
        q: `<p>Apply the horizontal-edge kernel from the notes to the 5 × 3 image whose top two rows are 0 and bottom three rows are 9 (no padding). Which outputs respond, and with what value?</p>`,
        a: `<p>The output is 3 × 1. A window whose top row is 0 and bottom two rows are 9 (rows 1–3) gives (−1 − 2 − 1) × 0 + 0 + (1 + 2 + 1) × 9 = 36; the window on rows 0–2 also has its bottom row at 9, giving 36; rows 2–4 are all 9, giving −36 + 36 = 0.</p>
<pre><code>print(conv2d([[0, 0, 0]] * 2 + [[9, 9, 9]] * 3, horizontal))   # [[36], [36], [0]]</code></pre>`
      },
      {
        q: `<p>Write <code>conv1d</code>'s backward pass for the kernel: given the input <strong>x</strong> and the gradient <strong>G</strong> = ∂<em>L</em>/∂<strong>y</strong>, return ∂<em>L</em>/∂<em>k</em><sub><em>j</em></sub>. Show that it is itself a 1D convolution, and check it on <strong>x</strong> = (0, 0, 1, 1, 1, 0) with <strong>G</strong> = (1, 0, 0, 1).</p>`,
        a: `<p><em>k</em><sub><em>j</em></sub> appears in every output, <em>y</em><sub><em>i</em></sub> = Σ<sub><em>j</em></sub> <em>k</em><sub><em>j</em></sub><em>x</em><sub><em>i</em>+<em>j</em></sub>, with derivative <em>x</em><sub><em>i</em>+<em>j</em></sub>. Weight sharing means the contributions add: ∂<em>L</em>/∂<em>k</em><sub><em>j</em></sub> = Σ<sub><em>i</em></sub> <em>G</em><sub><em>i</em></sub><em>x</em><sub><em>i</em>+<em>j</em></sub>, which is <code>conv1d(x, G)</code>: the input convolved with the output gradient as the kernel. Here: <em>j</em> = 0: <em>x</em><sub>0</sub> + <em>x</em><sub>3</sub> = 1; <em>j</em> = 1: <em>x</em><sub>1</sub> + <em>x</em><sub>4</sub> = 1; <em>j</em> = 2: <em>x</em><sub>2</sub> + <em>x</em><sub>5</sub> = 1.</p>
<pre><code>print(conv1d([0, 0, 1, 1, 1, 0], [1, 0, 0, 1]))   # [1, 1, 1]</code></pre>`
      },
      {
        q: `<p>How many multiplications does one forward pass of the notes' small CNN take for one image (count only the convolutions' and the last layer's weight multiplications)? Compare with CS 370's fully connected network (784 → 128 → 10), and explain why the CNN has 11 times fewer parameters but does more arithmetic.</p>`,
        a: `<p>First conv: 28 × 28 positions × 8 filters × 9 weights = 56,448. Second: 14 × 14 × 16 × 72 = 225,792. Last layer: 7,840. Total 290,080. The fully connected network takes 784 × 128 + 128 × 10 = 101,632. Each convolutional weight is reused at every position (784 times in the first layer), so few parameters do a lot of work; a fully connected weight is used once per image.</p>
<pre><code>print(28 * 28 * 8 * 9 + 14 * 14 * 16 * 72 + 784 * 10, 784 * 128 + 128 * 10)   # 290080 101632</code></pre>`
      }
    ],
    sources: ["lecun98", "krizhevsky12", "zeiler14", "cs231n", "d2l", "goodfellow"]
  },
  {
    id: "dl5",
    title: "Sequence models: recurrence and attention",
    minutes: 90,
    summary: "Recurrent networks and backpropagation through time, why gradients vanish or explode over long sequences and how clipping helps, the LSTM's gates and cell state, then self-attention in full: matrix form, why scores are divided by √d, causal masks, multi-head attention, sinusoidal positional encodings, and the pre-norm transformer block, with GPT-2 small's 124 million parameters counted.",
    notes: `
<p>Text, speech, prices and DNA are sequences: their meaning depends on order, and their length varies. CS 370 Lesson 8 sketched a transformer and mentioned that earlier recurrent networks read one token at a time. This lesson builds both: the recurrent network, the reason it struggles with long sequences, the LSTM that fixed much of that, and then attention and the transformer in full detail.</p>

<h3>Recurrent networks</h3>
<p>A <strong>recurrent neural network</strong> (RNN) reads a sequence <strong>x</strong><sub>1</sub>, …, <strong>x</strong><sub><em>T</em></sub> one element at a time, keeping a <strong>hidden state</strong> <strong>h</strong> that summarizes what it has seen:</p>
<p class="math"><strong>h</strong><sub><em>t</em></sub> = tanh(<em>W</em><sub>h</sub><strong>h</strong><sub><em>t</em>−1</sub> + <em>W</em><sub>x</sub><strong>x</strong><sub><em>t</em></sub> + <strong>b</strong>), &nbsp;&nbsp; <strong>h</strong><sub>0</sub> = <strong>0</strong></p>
<p>Here, and for the LSTM below, we follow the RNN literature and CS 370 and write column vectors with the matrix on the left, so <em>W</em><sub>h</sub> has one row per hidden unit: these matrices are the transposes of Lesson 1's row-convention (<strong>x</strong><em>W</em>) weights. Attention, later in this lesson, goes back to rows. The same weights are used at every step: weight sharing over time, as a CNN shares over space. An output layer can read any <strong>h</strong><sub><em>t</em></sub>, for example to predict the next token. To train it, <strong>unroll</strong> the loop: the computation for a sequence of length <em>T</em> is a <em>T</em>-layer network in which every layer has the same weights. Backpropagation on the unrolled graph is called <strong>backpropagation through time</strong> (BPTT). Because the weights are shared, their gradient is the sum of the contributions from every step, exactly as for a value used several times in CS 370's autograd. For long sequences, BPTT is usually <strong>truncated</strong>: the gradient is propagated back only a fixed number of steps.</p>

<h3>Vanishing and exploding gradients</h3>
<p>Take a scalar RNN, <em>h</em><sub><em>t</em></sub> = tanh(<em>w h</em><sub><em>t</em>−1</sub> + <em>u x</em><sub><em>t</em></sub>). How much does <em>h</em><sub>0</sub> affect <em>h</em><sub><em>T</em></sub>? Each step contributes a factor ∂<em>h</em><sub><em>t</em></sub>/∂<em>h</em><sub><em>t</em>−1</sub> = <em>w</em>(1 − <em>h</em><sub><em>t</em></sub><sup>2</sup>), and the chain rule multiplies them:</p>
<p class="math">∂<em>h</em><sub><em>T</em></sub>/∂<em>h</em><sub>0</sub> = Π<sub><em>t</em>=1</sub><sup><em>T</em></sup> <em>w</em>(1 − <em>h</em><sub><em>t</em></sub><sup>2</sup>)</p>
<pre><code>import math, random

def rnn(xs, w, u, h0=0.0):
    hs = [h0]
    for x in xs:
        hs.append(math.tanh(w * hs[-1] + u * x))
    return hs

def dhT_dh0(hs, w):
    g = 1.0
    for h in hs[1:]:
        g *= w * (1 - h * h)
    return g

xs = [1.0] + [0.0] * 19           # one input, then 19 steps of nothing
for w in (0.5, 1.0, 2.0):
    print(w, f"{dhT_dh0(rnn(xs, w, 1.0), w):.2e}")
# 0.5 3.33e-07
# 1.0 1.61e-02
# 2.0 3.48e-15</code></pre>
<p>Over 20 steps the influence shrinks to 3 × 10<sup>−7</sup> with <em>w</em> = 0.5 (close to 0.5<sup>20</sup> ≈ 9.5 × 10<sup>−7</sup>, smaller because 1 − <em>h</em><sup>2</sup> &lt; 1). With <em>w</em> = 2 it is smaller still: the state saturates near ±1, where tanh is flat. This is CS 370's <strong>vanishing gradient</strong>, now along time: the network can't learn that something 20 steps back mattered, because almost no gradient reaches it. With vectors, the factor is a matrix, and the product's size is governed by <em>W</em><sub>h</sub>'s largest eigenvalues (MATH 220 Lesson 7): below 1 it vanishes, above 1 (where the units aren't saturated) it <strong>explodes</strong>, and a single huge gradient step can wreck training. Exploding gradients have a simple fix, <strong>gradient clipping</strong>: if the gradient's length ‖<strong>g</strong>‖ exceeds a threshold <em>c</em>, rescale it to <strong>g</strong> · <em>c</em>/‖<strong>g</strong>‖, keeping its direction. Vanishing gradients need a different architecture.</p>

<h3>LSTMs</h3>
<p>Sepp Hochreiter and Jürgen Schmidhuber's <strong>long short-term memory</strong> (LSTM, 1997) adds a second state, the <strong>cell</strong> <strong>c</strong>, which is updated mostly by addition, and three <strong>gates</strong>: vectors of numbers between 0 and 1, computed by sigmoids, that multiply other vectors element by element (written ⊙) to let information through or block it. From the input and the previous hidden state, an LSTM computes</p>
<p class="math"><strong>i</strong> = σ(<em>W</em><sub>i</sub>[<strong>x</strong>; <strong>h</strong>] + <strong>b</strong><sub>i</sub>), &nbsp; <strong>f</strong> = σ(<em>W</em><sub>f</sub>[<strong>x</strong>; <strong>h</strong>] + <strong>b</strong><sub>f</sub>), &nbsp; <strong>g</strong> = tanh(<em>W</em><sub>g</sub>[<strong>x</strong>; <strong>h</strong>] + <strong>b</strong><sub>g</sub>), &nbsp; <strong>o</strong> = σ(<em>W</em><sub>o</sub>[<strong>x</strong>; <strong>h</strong>] + <strong>b</strong><sub>o</sub>)</p>
<p class="math"><strong>c</strong><sub><em>t</em></sub> = <strong>f</strong> ⊙ <strong>c</strong><sub><em>t</em>−1</sub> + <strong>i</strong> ⊙ <strong>g</strong>, &nbsp;&nbsp; <strong>h</strong><sub><em>t</em></sub> = <strong>o</strong> ⊙ tanh(<strong>c</strong><sub><em>t</em></sub>)</p>
<p>where [<strong>x</strong>; <strong>h</strong>] is <strong>x</strong> followed by <strong>h</strong><sub><em>t</em>−1</sub>, one vector. <strong>g</strong> is a candidate new content; the <strong>input gate</strong> <strong>i</strong> decides how much of it to write; the <strong>forget gate</strong> <strong>f</strong> decides how much of the old cell to keep; the <strong>output gate</strong> <strong>o</strong> decides how much of the cell to show. One scalar step, with <em>x</em> = 1, <em>h</em> = 0 and <em>c</em> = 0.5, and weights chosen so that the pre-activations of <strong>i</strong>, <strong>f</strong>, <strong>g</strong> and <strong>o</strong> are 1, 1.5, 2 and 1:</p>
<pre><code>def sigmoid(z):
    return 1 / (1 + math.exp(-z))

i, f, g, o = sigmoid(1.0), sigmoid(1.5), math.tanh(2.0), sigmoid(1.0)
c = f * 0.5 + i * g
h = o * math.tanh(c)
print(round(i, 4), round(f, 4), round(g, 4), round(o, 4))   # 0.7311 0.8176 0.964 0.7311
print(round(c, 4), round(h, 4))                             # 1.1135 0.5887</code></pre>
<p>Why this helps: <strong>c</strong><sub><em>t</em>−1</sub> reaches <strong>c</strong><sub><em>t</em></sub> by two kinds of path. The indirect ones go through <strong>h</strong><sub><em>t</em>−1</sub> = <strong>o</strong> ⊙ tanh(<strong>c</strong><sub><em>t</em>−1</sub>) and the gates, so they carry weight matrices and squashing derivatives and can vanish as an RNN's do. The direct path, along the cell (holding <strong>f</strong>, <strong>i</strong> and <strong>g</strong> fixed), has derivative just <strong>f</strong> (element-wise), with no squashing derivative and no weight matrix. The full gradient is the sum over paths (the chain rule), and this one term doesn't shrink step after step when <strong>f</strong> is near 1, so the long-range gradient no longer has to vanish. When the network sets <strong>f</strong> close to 1, information and gradient pass through many steps almost unchanged. A forget gate fixed at σ(3) ≈ 0.953 keeps σ(3)<sup>50</sup> ≈ 0.088 of the gradient over 50 steps, against 0.5<sup>50</sup> ≈ 9 × 10<sup>−16</sup> for a factor of 0.5. Initializing the forget gate's bias to about 1 helps for the same reason. The <strong>GRU</strong> (Kyunghyun Cho and colleagues, 2014) is a simpler variant with two gates and no separate cell. LSTMs powered machine translation and speech recognition until about 2017.</p>
<p>Two limits remained. Everything the network knows about the past must fit in the fixed-size state, and step <em>t</em> can't be computed before step <em>t</em> − 1, so training can't use the parallelism of a GPU along the sequence.</p>

<h3>Self-attention in matrix form</h3>
<p>CS 370 Lesson 8 computed attention one query at a time. Stack the <em>n</em> token vectors as the rows of <em>X</em> (shape (<em>n</em>, <em>d</em>)). Then <em>Q</em> = <em>XW</em><sub>Q</sub>, <em>K</em> = <em>XW</em><sub>K</sub> and <em>V</em> = <em>XW</em><sub>V</sub> hold every query, key and value as rows, entry (<em>i</em>, <em>j</em>) of <em>QK</em><sup>T</sup> is <strong>q</strong><sub><em>i</em></sub> · <strong>k</strong><sub><em>j</em></sub>, and the whole layer is</p>
<p class="math">Attention(<em>Q</em>, <em>K</em>, <em>V</em>) = softmax(<em>QK</em><sup>T</sup>/√<em>d</em><sub>k</sub> + <em>M</em>) <em>V</em></p>
<p>with the softmax applied to each row, <em>d</em><sub>k</sub> the length of the queries and keys, and <em>M</em> a <strong>mask</strong>. Three matrix products compute every position at once, which suits a GPU.</p>
<p><b>Why √<em>d</em><sub>k</sub>.</b> If the entries of <strong>q</strong> and <strong>k</strong> are independent with mean 0 and variance 1, each product <em>q</em><sub><em>m</em></sub><em>k</em><sub><em>m</em></sub> has variance 1 (Lesson 2's argument), so <strong>q</strong> · <strong>k</strong> has variance <em>d</em><sub>k</sub>. Measure it:</p>
<pre><code>rng = random.Random(0)
for d in (4, 64, 1024):
    dots = []
    for _ in range(2000):
        q = [rng.gauss(0, 1) for _ in range(d)]
        k = [rng.gauss(0, 1) for _ in range(d)]
        dots.append(sum(a * b for a, b in zip(q, k)))
    m = sum(dots) / len(dots)
    print(d, round(sum((x - m) ** 2 for x in dots) / len(dots) / d, 2))
# 4 0.96
# 64 1.0
# 1024 0.97</code></pre>
<p>The variance divided by <em>d</em> is about 1 in each case. With <em>d</em><sub>k</sub> = 64 the raw scores would have standard deviation 8, and a softmax of scores that far apart puts nearly all its weight on one position, where its gradient is nearly 0. Dividing by √<em>d</em><sub>k</sub> brings the standard deviation back to 1.</p>
<p><b>Masks.</b> <em>M</em> holds 0 where attention is allowed and −∞ where it isn't; e<sup>−∞</sup> = 0, so blocked positions get weight exactly 0. The <strong>causal mask</strong> of a language model sets <em>M</em><sub><em>ij</em></sub> = −∞ for <em>j</em> &gt; <em>i</em>, so that position <em>i</em> can't see the tokens it is trained to predict, and the whole training sequence can then be processed at once, with every position predicting its next token. A <strong>padding mask</strong> blocks the filler tokens added to make the sequences in a batch the same length. With three tokens used as their own queries, keys and values (CS 370's example):</p>
<pre><code>def softmax(xs):
    m = max(xs)
    e = [math.exp(x - m) for x in xs]
    s = sum(e)
    return [v / s for v in e]

def matmul(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(len(B))) for j in range(len(B[0]))] for i in range(len(A))]

def transpose(A):
    return [list(r) for r in zip(*A)]

def attention(Q, K, V, causal=False):
    d = len(Q[0])
    weights = []
    for i, row in enumerate(matmul(Q, transpose(K))):
        weights.append(softmax([-math.inf if causal and j > i else s / math.sqrt(d)
                                for j, s in enumerate(row)]))
    return matmul(weights, V), weights

X = [[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]
out, A = attention(X, X, X, causal=True)
print([[round(a, 3) for a in r] for r in A])     # [[1.0, 0.0, 0.0], [0.33, 0.67, 0.0], [0.248, 0.248, 0.503]]
print([[round(a, 3) for a in r] for r in out])   # [[1.0, 0.0], [0.33, 0.67], [0.752, 0.752]]</code></pre>
<p>The weight matrix is lower triangular: the first token can only attend to itself. Like the code, number the tokens from 0. Row 1, for token 1 = (0, 1): its scores with tokens 0 and 1 are 0 and 1/√2, giving weights 0.33 and 0.67.</p>

<h3>Multi-head attention and positions</h3>
<p>One softmax gives one weighted average per position, so one attention layer can follow only one kind of relation at a time. <strong>Multi-head attention</strong> splits the <em>d</em> columns of <em>Q</em>, <em>K</em> and <em>V</em> into <em>h</em> groups of <em>d</em><sub>k</sub> = <em>d</em>/<em>h</em>, runs attention separately on each (each is a <strong>head</strong>), concatenates the <em>h</em> outputs back to <em>d</em> columns, and multiplies by an output matrix <em>W</em><sub>O</sub> (<em>d</em> × <em>d</em>). The cost is about that of one full-width head, and the parameters are <em>W</em><sub>Q</sub>, <em>W</em><sub>K</sub>, <em>W</em><sub>V</sub> and <em>W</em><sub>O</sub>: 4<em>d</em><sup>2</sup> (plus biases). Trained models have heads that track the previous token, a matching bracket, or the subject of a verb.</p>
<p>Attention has no built-in sense of order. Without a mask, each output depends only on its own token and the set of all tokens, so swapping two input tokens just swaps their outputs. With the causal mask, position <em>i</em> sees the set of tokens 0 to <em>i</em>, still in no particular order. Swap tokens 0 and 2 of the example:</p>
<pre><code>Y = [X[2], X[1], X[0]]
for causal in (False, True):
    print([[round(a, 3) for a in r] for r in attention(X, X, X, causal)[0]], [[round(a, 3) for a in r] for r in attention(Y, Y, Y, causal)[0]])
# [[0.802, 0.599], [0.599, 0.802], [0.752, 0.752]] [[0.752, 0.752], [0.599, 0.802], [0.802, 0.599]]
# [[1.0, 0.0], [0.33, 0.67], [0.752, 0.752]] [[1.0, 1.0], [0.5, 1.0], [0.802, 0.599]]</code></pre>
<p>Without the mask, the outputs at positions 0 and 2 swap and position 1's is unchanged. With it, every position from the first swapped one to the second sees a different set or has a different token of its own, so all three outputs change; positions after the second (there are none here) would see the same set and be unchanged. Either way, a layer can't tell in what order the tokens it sees arrived, so each token's embedding has a <strong>positional encoding</strong> added to it. The original transformer used fixed sinusoids of different frequencies: entry 2<em>k</em> of position <em>pos</em> is sin(<em>pos</em>/10000<sup>2<em>k</em>/<em>d</em></sup>) and entry 2<em>k</em> + 1 is cos of the same angle.</p>
<pre><code>def positional_encoding(pos, d):
    return [math.sin(pos / 10000 ** (i / d)) if i % 2 == 0 else math.cos(pos / 10000 ** ((i - 1) / d))
            for i in range(d)]

print([[round(v, 3) for v in positional_encoding(p, 4)] for p in range(3)])   # [[0.0, 1.0, 0.0, 1.0], [0.841, 0.54, 0.01, 1.0], [0.909, -0.416, 0.02, 1.0]]</code></pre>
<p>The first pair of entries turns quickly (one radian per position) and the second slowly (0.01 radians), like the hands of a clock, so every position gets a distinct vector; and the encoding of <em>pos</em> + <em>k</em> is a fixed rotation of that of <em>pos</em> (the angle-addition formulas), which makes relative positions easy to compute from them. Many models instead learn a position vector for each position, and recent ones rotate the queries and keys by position-dependent angles (rotary embeddings).</p>

<h3>The transformer block</h3>
<p>A modern (pre-norm) transformer block, applied to the matrix <em>X</em> of token vectors, is</p>
<p class="math"><em>X</em> ← <em>X</em> + MultiHead(LayerNorm(<em>X</em>)), &nbsp;&nbsp; <em>X</em> ← <em>X</em> + FFN(LayerNorm(<em>X</em>))</p>
<p>where the <strong>feed-forward network</strong> FFN applies the same two-layer network to each position separately: <em>d</em> → 4<em>d</em> → <em>d</em> with GELU in between. The <strong>residual connections</strong> (the "<em>X</em> +") give the gradient a path through the whole stack with factor 1, which, like the LSTM's cell, avoids vanishing; layer normalization (Lesson 3) keeps the scale steady. Attention mixes information between positions; the FFN processes each position on its own. Each block has 4<em>d</em><sup>2</sup> attention weights and 8<em>d</em><sup>2</sup> FFN weights, so 12<em>d</em><sup>2</sup> in all, plus small terms. GPT-2 small has <em>d</em> = 768, 12 blocks, a vocabulary of 50,257 tokens and 1,024 positions:</p>
<pre><code>d = 768
block = 4 * d * d + 4 * d + 8 * d * d + 4 * d + d + 4 * d   # weights, biases, two layer norms
print(block, 12 * block + 50257 * d + 1024 * d + 2 * d)     # 7087872 124439808</code></pre>
<p>The biases are 4<em>d</em> for attention (<em>Q</em>, <em>K</em>, <em>V</em> and output) and 4<em>d</em> + <em>d</em> for the FFN's two layers; each layer norm has 2<em>d</em> parameters (<em>γ</em> and <em>β</em>), and a final one adds 2<em>d</em>. The token embeddings (50,257 × 768 ≈ 38.6 million) are reused as the output layer. The total, 124,439,808, is GPT-2 small's published size of 124 million. Attention compares every pair of positions, so its cost grows as <em>n</em><sup>2</sup><em>d</em> for <em>n</em> tokens, against <em>nd</em><sup>2</sup> for the rest of the block: for long contexts, attention dominates.</p>
`,
    terms: [
      ["Recurrent neural network (RNN)", "A network that reads a sequence one element at a time, updating a hidden state with the same weights at each step."],
      ["Hidden state", "The vector an RNN carries from step to step, summarizing what it has read."],
      ["Backpropagation through time (BPTT)", "Backpropagation on the unrolled recurrent network; shared weights sum their gradients over the steps."],
      ["Exploding gradient", "Gradients growing exponentially as they pass back through many steps or layers."],
      ["Gradient clipping", "Rescaling a gradient whose length exceeds a threshold to that threshold, keeping its direction."],
      ["LSTM", "A recurrent network with a cell state updated by addition and input, forget and output gates."],
      ["Gate", "A vector of sigmoid outputs between 0 and 1 that multiplies another vector element-wise."],
      ["Forget gate", "The LSTM gate that scales the previous cell state; near 1, information and gradients persist."],
      ["Mask", "A matrix added to attention scores: 0 where attention is allowed, −∞ where it is blocked."],
      ["Multi-head attention", "Several attentions on separate slices of the queries, keys and values, concatenated and projected by W_O."],
      ["Positional encoding", "A vector added to each token's embedding that tells the model its position."],
      ["Residual connection", "Adding a sub-layer's input to its output, giving gradients a direct path back."],
      ["Feed-forward network", "The per-position two-layer network in a transformer block, usually d → 4d → d."]
    ],
    quiz: [
      { q: "In backpropagation through time, the gradient of the shared weight W_h is:", choices: ["The gradient from the last step only", "The sum of its contributions from every step", "The average of the hidden states", "Zero, because the weights are shared"], answer: 1, why: "A weight used at every step gets a contribution from each use, as in any computation graph." },
      { q: "A scalar RNN's factors w(1 − h_t²) are all about 0.4. Roughly how much of the gradient from step 30 reaches step 0?", choices: ["0.4", "0.4 × 30 = 12", "0.4³⁰ ≈ 10⁻¹²", "1"], answer: 2, why: "The chain rule multiplies one factor per step." },
      { q: "Why does the LSTM's cell state preserve gradients better than an RNN's hidden state?", choices: ["It is larger", "Along the direct path through the cell, ∂c_t/∂c_(t−1) is just the forget gate, with no weight matrix or squashing derivative", "It uses ReLU", "It is never updated"], answer: 1, why: "With the forget gate near 1, the gradient passes many steps almost unchanged." },
      { q: "Why are attention scores divided by √d_k?", choices: ["To make them positive", "The dot product of random d_k-dimensional vectors has variance d_k, and large scores saturate the softmax", "To normalize the values", "It is required by the causal mask"], answer: 1, why: "Dividing by √d_k brings the scores' standard deviation back to about 1." },
      { q: "A layer has d = 512 and 8 heads. What is each head's d_k, and how many weights do W_Q, W_K, W_V and W_O have together?", choices: ["64 and 4 × 512² = 1,048,576", "512 and 8 × 4 × 512²", "8 and 512²", "64 and 8 × 64²"], answer: 0, why: "d_k = 512/8, and the four matrices are each 512 × 512 regardless of the number of heads." },
      { q: "In attention with no mask and no positional encodings, what happens if two tokens of the input are swapped?", choices: ["Nothing changes anywhere", "The outputs at those two positions swap, and all others are unchanged", "The model raises an error", "All outputs change"], answer: 1, why: "Unmasked attention treats its inputs as a set, so permuting the inputs permutes the outputs in the same way. (A causal mask changes this: positions between the two swapped tokens see a different set.)" }
    ],
    practice: [
      {
        q: `<p>A scalar linear RNN, <em>h</em><sub><em>t</em></sub> = <em>w h</em><sub><em>t</em>−1</sub> + <em>x</em><sub><em>t</em></sub> (no tanh), with <em>w</em> = 1.5. How large is ∂<em>h</em><sub>20</sub>/∂<em>h</em><sub>0</sub>? A gradient vector (300, 400) is clipped to length 5: what does it become?</p>`,
        a: `<p>Each step multiplies by <em>w</em>, so the product is 1.5<sup>20</sup> ≈ 3,325: an exploding gradient. The vector has length √(300<sup>2</sup> + 400<sup>2</sup>) = 500, so clipping multiplies it by 5/500, giving (3, 4): the same direction, length 5.</p>
<pre><code>print(round(1.5 ** 20), [v * 5 / math.hypot(300, 400) for v in (300, 400)])   # 3325 [3.0, 4.0]</code></pre>`
      },
      {
        q: `<p>An LSTM with hidden size <em>H</em> = 256 reads inputs of size <em>D</em> = 100. How many parameters does it have? Compare with a plain RNN of the same sizes.</p>`,
        a: `<p>Each of the four blocks (<strong>i</strong>, <strong>f</strong>, <strong>g</strong>, <strong>o</strong>) has a weight matrix of <em>H</em> × (<em>D</em> + <em>H</em>) and <em>H</em> biases: 4 × (256 × 356 + 256) = 365,568. The plain RNN has one such block: 91,392, a quarter as many.</p>
<pre><code>print(4 * (256 * 356 + 256), 256 * 356 + 256)   # 365568 91392</code></pre>`
      },
      {
        q: `<p>Compute by hand the attention weights for token 1 (the second token) in the notes' example without the causal mask, and then with a mask that blocks only token 0 (as a padding mask would) and nothing else. Check with <code>softmax</code>.</p>`,
        a: `<p>The query is (0, 1). Its dot products with the keys (1, 0), (0, 1) and (1, 1) are 0, 1 and 1, so its scores are (0, 0.707, 0.707) whichever positions are allowed. With the causal mask, token 2 is blocked and the weights are (0.33, 0.67, 0) as in the notes. Unmasked, all three count, with e<sup>0</sup> = 1 and e<sup>0.707</sup> ≈ 2.028: token 0 gets 1/(1 + 2 × 2.028) ≈ 0.198, and tokens 1 and 2 get 2.028/5.056 ≈ 0.401 each. Removing the mask lets token 1 look ahead, and the future token takes 0.401 of its weight. Blocking only token 0 leaves two equal scores, so tokens 1 and 2 get 0.5 each. (For token 2, the last one, the unmasked weights would equal the causal row, since the last position may see everything anyway.)</p>
<pre><code>s = 1 / math.sqrt(2)
print([round(w, 3) for w in softmax([0, s, s])])             # [0.198, 0.401, 0.401]
print([round(w, 3) for w in softmax([-math.inf, s, s])])     # [0.0, 0.5, 0.5]</code></pre>`
      },
      {
        q: `<p>A transformer has <em>d</em> = 1024, 24 blocks and a context of 2,048 tokens. Ignoring biases, layer norms and embeddings, how many parameters do its blocks have? For one sequence of 2,048 tokens, compare the multiplications for computing <em>QK</em><sup>T</sup> in one block with those for the block's weight matrices.</p>`,
        a: `<p>12<em>d</em><sup>2</sup> per block: 12 × 1024<sup>2</sup> × 24 = 301,989,888, about 302 million. Per block, <em>QK</em><sup>T</sup> is (2048 × 1024)(1024 × 2048): 2048<sup>2</sup> × 1024 ≈ 4.3 billion multiplications, and the attention-weighted sum of values costs as much again. The weight matrices cost 12<em>d</em><sup>2</sup> per token: 12 × 1024<sup>2</sup> × 2048 ≈ 25.8 billion. So at this length the weights still dominate; doubling the context doubles their cost but quadruples attention's.</p>
<pre><code>print(12 * 1024 ** 2 * 24, 2048 ** 2 * 1024, 12 * 1024 ** 2 * 2048)   # 301989888 4294967296 25769803776</code></pre>`
      }
    ],
    sources: ["hochreiter97", "bengio94", "pascanu13", "vaswani17", "radford19", "d2l", "goodfellow"]
  },
  {
    id: "dl6",
    title: "Training large models, and deploying them responsibly",
    minutes: 90,
    summary: "Byte-pair encoding worked in full, and what tokenization costs other languages; pretraining objectives (next-token, masked and denoising); scaling laws and the 6ND estimate of training compute; fine-tuning, and parameter-efficient methods such as LoRA; honest evaluation and benchmark contamination; estimating energy and emissions; and misuse, safety evaluation and release decisions.",
    notes: `
<p>The previous five lessons built every piece of a large language model. This one is about what changes at scale: how text becomes tokens, what the model is trained to do, how its size, data and compute are chosen, how it is adapted, how it is measured, what it costs, and what can go wrong when it is released. CS 370 Lesson 8 introduced several of these ideas briefly; here they get numbers.</p>

<h3>Tokenization: byte-pair encoding</h3>
<p>CS 370 described <strong>byte-pair encoding</strong> (BPE) in one paragraph. Rico Sennrich and colleagues (2016) adapted it from a 1994 compression method. Training a BPE tokenizer: split each word of the training text into characters, with an end-of-word marker <code>&lt;/w&gt;</code> so that a piece at the end of a word ("est" in "newest") is distinguished from the same letters elsewhere; count every adjacent pair of symbols, weighted by how often each word occurs; merge the most frequent pair into one new symbol everywhere; record the merge; repeat until the vocabulary is the chosen size. Sennrich's example corpus has "low" 5 times, "lower" 2, "newest" 6 and "widest" 3:</p>
<pre><code>from collections import Counter

words = {"low": 5, "lower": 2, "newest": 6, "widest": 3}
corpus = {tuple(w) + ("&lt;/w&gt;",): n for w, n in words.items()}

def pair_counts(corpus):
    pairs = Counter()
    for seq, n in corpus.items():
        for a, b in zip(seq, seq[1:]):
            pairs[(a, b)] += n
    return pairs

def merge(corpus, pair):
    new = {}
    for seq, n in corpus.items():
        out, i = [], 0
        while i &lt; len(seq):
            if i + 1 &lt; len(seq) and (seq[i], seq[i + 1]) == pair:
                out.append(seq[i] + seq[i + 1])
                i += 2
            else:
                out.append(seq[i])
                i += 1
        new[tuple(out)] = n
    return new

merges = []
for step in range(5):
    pairs = pair_counts(corpus)
    best = min(pairs, key=lambda p: (-pairs[p], p))   # most frequent; ties: smallest pair
    print(best, pairs[best])
    merges.append(best)
    corpus = merge(corpus, best)
# ('e', 's') 9
# ('es', 't') 9
# ('est', '&lt;/w&gt;') 9
# ('l', 'o') 7
# ('lo', 'w') 7</code></pre>
<p>"es" occurs 6 times in "newest" and 3 in "widest": 9. (So do "s t" and "t &lt;/w&gt;"; ties are broken by taking the smallest pair in Python's tuple order, as the code's <code>min</code> does: compare the first symbols, then the second, as strings, character by character by Unicode code point. So "&lt;" (60) comes before every lower-case letter (97 to 122), and ('t', '&lt;/w&gt;') comes before ('t', 'a'); a string comes before any longer string it begins, so ('e', 's') comes before ('es', 't'). Here ('e', 's') &lt; ('s', 't') &lt; ('t', '&lt;/w&gt;').) After five merges, "low" is one symbol and "est&lt;/w&gt;" another. To <strong>encode</strong> new text, split it into characters and apply the learned merges in the same order:</p>
<pre><code>def encode(word, merges):
    seq = tuple(word) + ("&lt;/w&gt;",)
    for pair in merges:
        seq = tuple(merge({seq: 1}, pair))[0]
    return list(seq)

print(encode("lowest", merges))   # ['low', 'est&lt;/w&gt;']
print(encode("slow", merges))     # ['s', 'low', '&lt;/w&gt;']</code></pre>
<p>"lowest" never appeared in training, but it is encoded in two meaningful pieces; nothing is ever out of vocabulary, because single characters remain. Modern tokenizers run BPE on bytes rather than characters: on the text's UTF-8 encoding (CS 101 Lesson 12), which stores each character as one to four bytes, so any string at all can be encoded with a base vocabulary of 256.</p>
<p>Tokenization has consequences. A model's cost, its context limit and, for commercial services, the price are all counted in tokens, and a tokenizer trained mostly on English splits other languages into many more pieces. Aleksandar Petrov and colleagues (2023) found that the same text translated into different languages could take up to 15 times as many tokens, so speakers of those languages pay more, wait longer and fit less into the context. Splitting numbers into arbitrary chunks also makes arithmetic harder to learn, which is why some tokenizers split digits individually.</p>

<h3>Pretraining objectives</h3>
<p>Pretraining needs a task whose labels come free with the text, so that trillions of tokens can be used without human labelling (<strong>self-supervised learning</strong>). Three objectives are common:</p>
<ul>
<li><b>Next-token prediction</b> (causal language modelling): predict token <em>t</em> + 1 from tokens 1 to <em>t</em>, with the causal mask of Lesson 5 and cross-entropy loss at every position. The GPT models and most large models since use it, because the same model can then generate text.</li>
<li><b>Masked language modelling</b>: BERT (Jacob Devlin and colleagues, 2019) replaces about 15% of the tokens with a mask symbol (or a random token) and predicts the originals, attending in both directions. This gives good representations for classification and search, but the model doesn't generate text naturally.</li>
<li><b>Denoising</b>: T5 (Colin Raffel and colleagues, 2020) deletes spans of text and trains an <strong>encoder–decoder</strong> to produce the missing spans: the design of the original 2017 transformer, with two stacks of blocks. The encoder reads the whole corrupted input with attention unmasked, so every position sees every other; the decoder is a causal stack like Lesson 5's that generates the output, and each of its blocks also attends to the encoder's outputs (<em>cross-attention</em>: queries from the decoder, keys and values from the encoder).</li>
</ul>

<h3>Scaling laws and compute</h3>
<p>Training a transformer with <em>N</em> parameters on <em>D</em> tokens takes about</p>
<p class="math"><em>C</em> ≈ 6<em>ND</em> floating-point operations</p>
<p>because each parameter takes part in one multiplication and one addition per token in the forward pass (2<em>N</em> per token), and the backward pass costs about twice the forward (Lesson 1): 2<em>N</em> + 4<em>N</em> = 6<em>N</em> per token. Jared Kaplan and colleagues (2020) found that the test loss falls as a smooth power law in each of <em>N</em>, <em>D</em> and <em>C</em> over many orders of magnitude; for parameters, roughly <em>L</em> ∝ <em>N</em><sup>−0.076</sup> when data is plentiful. A power law with a small exponent means steady but expensive progress: doubling <em>N</em> multiplies the loss by 2<sup>−0.076</sup> ≈ 0.949, a 5% reduction. Because the curves were so regular, small runs could be used to predict large ones before paying for them. Hoffmann and colleagues (2022) (CS 370 Lesson 8) then found that for a fixed compute budget, <em>N</em> and <em>D</em> should grow together, about 20 tokens per parameter. Their model Chinchilla had 70 billion parameters trained on 1.4 trillion tokens:</p>
<pre><code>import math
N, D = 70e9, 1.4e12
C = 6 * N * D
print(f"{C:.2e}", round(D / N))      # 5.88e+23 20
print(round(C / 4e14 / 3600))        # 408333</code></pre>
<p>At an assumed 4 × 10<sup>14</sup> useful operations per second per accelerator (a modern GPU's peak is a few times higher, and real runs achieve a fraction of peak), that is about 408,000 GPU-hours: 1,000 GPUs for 17 days. Models served to millions of users are often trained on far more than 20 tokens per parameter anyway, because a smaller model is cheaper every time it answers a query.</p>

<h3>Fine-tuning and parameter-efficient methods</h3>
<p>A pretrained model is adapted by <strong>fine-tuning</strong>: continuing training on a smaller data set for the task, such as instruction tuning and RLHF (CS 370 Lesson 8), or a company's support tickets. Full fine-tuning updates every parameter, and the memory needed is large: with mixed-precision training and Adam, a common estimate is 16 bytes per parameter. <strong>Mixed-precision training</strong> runs the forward and backward passes in a 16-bit floating-point format (2 bytes, with 10 or fewer fraction bits against single precision's 23, CS 210 Lesson 2), which halves memory and is much faster on GPUs, so the weights used there and the gradients take 2 bytes each. The update is applied to a separate 4-byte master copy of the weights: with 10 fraction bits, neighbouring 16-bit values just above 1 are 2<sup>−10</sup> ≈ 0.00098 apart (just below 1, half that; with fewer bits, wider), so a step of 0.0001, less than half the gap, added to a 16-bit weight would be rounded away. Adam's two moments are also kept at 4 bytes each. That makes 2 + 2 + 4 + 4 + 4 = 16 bytes, so a 7-billion-parameter model needs about 112 GB before counting activations, more than one GPU holds, and each fine-tuned copy is another full-size model to store.</p>
<p><strong>Parameter-efficient fine-tuning</strong> trains a small number of new parameters and freezes the rest. The most common method, <strong>LoRA</strong> (Edward Hu and colleagues, 2022), keeps each large weight matrix <em>W</em> (<em>d</em> × <em>k</em>) fixed and learns a <strong>low-rank</strong> update: <em>W</em> + <em>BA</em>, with <em>B</em> of shape <em>d</em> × <em>r</em> and <em>A</em> of shape <em>r</em> × <em>k</em> for a small rank <em>r</em>, in the linear-algebra sense of MATH 220 Lesson 5 (not Lesson 1's tensor rank): <em>BA</em> has at most <em>r</em> linearly independent columns. <em>B</em> starts at 0, so <em>BA</em> = 0 and training begins exactly at the pretrained model. <em>A</em> starts random: the gradient for <em>B</em> is multiplied by <em>A</em> and the gradient for <em>A</em> by <em>B</em>, so if both started at 0 neither would ever move.</p>
<pre><code>d = k = 4096
r = 8
print(d * k, r * (d + k), round(100 * r * (d + k) / (d * k), 2))   # 16777216 65536 0.39
print(7e9 * 16 / 1e9)                                             # 112.0</code></pre>
<p>For one 4096 × 4096 matrix, rank 8 trains 65,536 numbers instead of 16.8 million: 0.39%. Optimizer memory shrinks in proportion, many task-specific adapters can share one base model, and after training <em>BA</em> can be added into <em>W</em> so that inference costs nothing extra. It works because the change fine-tuning needs is often close to low rank.</p>

<h3>Evaluation and contamination</h3>
<p>A benchmark is a test set (CS 370 Lesson 5), and it inherits a test set's rules plus new hazards at scale:</p>
<ul>
<li><b>Uncertainty.</b> An accuracy measured on <em>n</em> questions has a standard error of √(<em>p</em>(1 − <em>p</em>)/<em>n</em>) (MATH 230 Lesson 6). At 80% on 1,000 questions, the 95% interval is about ±2.5 points, so a 1-point difference between two models means little. Scores also move with the wording of the prompt, the number of examples shown, and the sampling settings: report them.</li>
<li><b>Contamination.</b> Training text scraped from the web may contain the benchmark's questions and answers, and then the test measures memory. A simple check, used for GPT-3 (Tom Brown and colleagues, 2020) with 13-word sequences, flags a benchmark item if it shares any <em>n</em>-word sequence (<strong><em>n</em>-gram</strong>) with the training data, and reports the score on the clean items separately.</li>
</ul>
<pre><code>print(round(1.96 * math.sqrt(0.8 * 0.2 / 1000), 4))   # 0.0248

def ngrams(text, n):
    toks = text.lower().split()
    return {tuple(toks[i:i + n]) for i in range(len(toks) - n + 1)}

train = "the quick brown fox jumps over the lazy dog near the river bank"
items = ["a quick brown fox jumps over a fence", "the lazy dog near the river", "what is the capital of france"]
print([bool(ngrams(q, 4) &amp; ngrams(train, 4)) for q in items])   # [True, True, False]</code></pre>
<p>The first item shares "quick brown fox jumps", the second "the lazy dog near". Overlap checks miss paraphrases and translations and can flag common phrases, so they bound contamination rather than measure it. The stronger remedies are benchmarks written after the model's training data was collected, or kept private.</p>

<h3>Compute, energy and emissions</h3>
<p>Energy is power times time. A run on 1,000 GPUs drawing 700 W each for 30 days, in a data center whose total consumption is 1.2 times that of its computers (the <strong>power usage effectiveness</strong>, PUE, counts cooling and power conversion), with a grid emitting 0.4 kg of CO<sub>2</sub> per kWh:</p>
<pre><code>kwh = 1000 * 0.7 * 30 * 24
print(kwh, kwh * 1.2, round(kwh * 1.2 * 0.4 / 1000))   # 504000.0 604800.0 242</code></pre>
<p>That is 605 MWh and about 242 tonnes of CO<sub>2</sub>, roughly what 50 to 60 average American homes use in electricity in a year, under these assumptions. Each factor can vary several-fold: the hardware's efficiency, the utilization, the grid (hydroelectric power emits far less than coal), and the number of failed and tuning runs, which Emma Strubell and colleagues (2019) found can exceed the final run. Training is also only the start: a widely used model answers millions of queries a day, and over its lifetime inference can use more energy than training. Data centers also use water for cooling. Report the hardware, hours and location, so that costs can be estimated and compared.</p>

<h3>Misuse and safety</h3>
<p>A capable general model is <strong>dual-use</strong>: the ability that drafts a cover letter drafts a phishing email, and the one that explains chemistry may explain a dangerous synthesis. Documented misuses include fraud and impersonation with generated text and cloned voices, mass-produced disinformation and spam, harassment, help with malware, and non-consensual sexual images. Defences come in layers, none sufficient alone. Training refuses clearly harmful requests (CS 370 Lesson 8's fine-tuning), but <strong>jailbreaks</strong>, prompts crafted to get around that training, keep being found, and prompt injection (CS 370 Lesson 8) turns the model against its own user. <strong>Red-teaming</strong> pays people to attack the model before release. <strong>Dangerous-capability evaluations</strong> test specifically for uplift in areas such as cyberattacks and biological weapons, and some developers commit in advance to the safeguards a given level of capability requires. Deployment adds monitoring, rate limits and usage policies. Releasing the weights openly lets anyone study, adapt and run the model, which helps research and competition, but also lets anyone remove its safeguards by fine-tuning, and a release can't be recalled. Model cards (CS 370 Lesson 8's sidebar) record what was evaluated and what wasn't. As an engineer, you will have to judge what a system could be used for, not just what it was built for.</p>
`,
    terms: [
      ["Byte-pair encoding (BPE)", "A tokenizer built by repeatedly merging the most frequent adjacent pair of symbols in the training text."],
      ["Merge list", "The ordered list of pairs BPE learned; encoding applies the merges in the same order."],
      ["Self-supervised learning", "Training on labels derived from the data itself, such as the next token."],
      ["Masked language modelling", "Predicting tokens hidden from the input, using context on both sides."],
      ["Scaling law", "An empirical power law relating a model's loss to its parameters, data or compute."],
      ["6ND", "The approximate number of floating-point operations to train N parameters on D tokens."],
      ["Fine-tuning", "Continuing to train a pretrained model on data for a particular task or behaviour."],
      ["Parameter-efficient fine-tuning", "Adapting a model by training a small number of new or selected parameters while freezing the rest."],
      ["LoRA", "Fine-tuning a frozen weight matrix W by learning a low-rank update BA."],
      ["Benchmark contamination", "Test items appearing in a model's training data, so the score partly measures memory."],
      ["n-gram", "A sequence of n consecutive words or tokens."],
      ["Power usage effectiveness (PUE)", "A data center's total energy use divided by its computers' energy use."],
      ["Dual-use", "Useful for both beneficial and harmful purposes."],
      ["Red-teaming", "Deliberately attacking a system before release to find failures and misuses."],
      ["Jailbreak", "A prompt crafted to make a model ignore the restrictions it was trained to follow."]
    ],
    quiz: [
      { q: "In BPE training, which pair is merged next?", choices: ["The longest pair", "The most frequent adjacent pair, weighted by word counts", "A random pair", "The pair that appears in the most distinct words"], answer: 1, why: "Each merge takes the most frequent adjacent pair over the whole corpus." },
      { q: "Roughly how many floating-point operations does training a 1-billion-parameter model on 20 billion tokens take?", choices: ["2 × 10¹⁹", "1.2 × 10²⁰", "6 × 10⁹", "1.2 × 10¹¹"], answer: 1, why: "6ND = 6 × 10⁹ × 2 × 10¹⁰ = 1.2 × 10²⁰." },
      { q: "LoRA with rank 16 on a 1024 × 1024 matrix trains how many parameters?", choices: ["1,048,576", "32,768", "16,384", "2,048"], answer: 1, why: "r(d + k) = 16 × 2048 = 32,768, about 3% of the matrix." },
      { q: "Model A scores 81.0% and model B 80.2% on a 1,000-question benchmark. What can you conclude?", choices: ["A is better", "Nothing firm: the 95% margin is about ±2.5 points", "B is better", "Both are contaminated"], answer: 1, why: "The standard error √(0.8 × 0.2/1000) ≈ 1.3 points is larger than the difference." },
      { q: "Why does the same paragraph cost more to process in some languages than in English?", choices: ["Those languages have longer words", "A tokenizer trained mostly on English splits them into many more tokens", "Models run slower on non-Latin scripts", "It doesn't"], answer: 1, why: "Cost, context and price are counted in tokens, and BPE learns merges from its training text." },
      { q: "What is a limitation of n-gram overlap checks for contamination?", choices: ["They are too slow to run", "They miss paraphrased or translated copies and can flag common phrases", "They need the model's weights", "They only work on code"], answer: 1, why: "They detect exact word sequences only, so they bound contamination rather than measure it." }
    ],
    practice: [
      {
        q: `<p>Continue the notes' BPE by hand for two more merges. Which pairs are merged, with what counts, and how is "newest" segmented afterwards?</p>`,
        a: `<p>After five merges the corpus is low&lt;/w&gt; (low, &lt;/w&gt;) × 5, (low, e, r, &lt;/w&gt;) × 2, (n, e, w, est&lt;/w&gt;) × 6, (w, i, d, est&lt;/w&gt;) × 3. Pair counts: (low, &lt;/w&gt;) 5; (n, e), (e, w) and (w, est&lt;/w&gt;) 6 each; others smaller. The three 6s tie, and the smallest is ('e', 'w') ('e' &lt; 'n' &lt; 'w'). After merging it, (n, ew) and (ew, est&lt;/w&gt;) have 6: ('ew', 'est&lt;/w&gt;') is smaller than ('n', 'ew'). So "newest" becomes ['n', 'ewest&lt;/w&gt;'].</p>
<pre><code>for step in range(2):
    pairs = pair_counts(corpus)
    best = min(pairs, key=lambda p: (-pairs[p], p))
    print(best, pairs[best])
    merges.append(best)
    corpus = merge(corpus, best)
# ('e', 'w') 6
# ('ew', 'est&lt;/w&gt;') 6
print(encode("newest", merges))   # ['n', 'ewest&lt;/w&gt;']</code></pre>`
      },
      {
        q: `<p>You have a budget of 10<sup>22</sup> floating-point operations. Using <em>C</em> = 6<em>ND</em> and 20 tokens per parameter, how many parameters and tokens should the model have? How long would it take on 64 GPUs at 4 × 10<sup>14</sup> useful operations per second each?</p>`,
        a: `<p>With <em>D</em> = 20<em>N</em>, <em>C</em> = 120<em>N</em><sup>2</sup>, so <em>N</em> = √(10<sup>22</sup>/120) ≈ 9.1 × 10<sup>9</sup> parameters and <em>D</em> ≈ 1.8 × 10<sup>11</sup> tokens. Time: 10<sup>22</sup>/(64 × 4 × 10<sup>14</sup>) ≈ 3.9 × 10<sup>5</sup> seconds, about 4.5 days.</p>
<pre><code>Nopt = math.sqrt(1e22 / 120)
print(f"{Nopt:.2e} {20 * Nopt:.2e}", round(1e22 / (64 * 4e14) / 86400, 1))   # 9.13e+09 1.83e+11 4.5</code></pre>`
      },
      {
        q: `<p>A model with 7 billion parameters is fine-tuned with LoRA of rank 16 on every attention matrix: 32 blocks, each with four 4096 × 4096 matrices. How many parameters are trained, as a fraction of the model? Estimate the training memory for these trained parameters alone (their 16-bit weights and gradients, master copy and Adam's two moments) at the notes' 16 bytes per parameter, not counting the frozen base weights, and explain why full fine-tuning needs far more.</p>`,
        a: `<p>Each matrix gets 16 × (4096 + 4096) = 131,072; 128 matrices give 16,777,216, about 0.24% of 7 billion. At 16 bytes each: about 268 MB. Full fine-tuning keeps gradients, a master copy and two Adam moments for all 7 billion parameters, about 112 GB. The LoRA run still needs the frozen weights themselves (14 GB at 2 bytes each) and the activations.</p>
<pre><code>lora = 32 * 4 * 16 * (4096 + 4096)
print(lora, round(100 * lora / 7e9, 2), lora * 16 / 1e6)   # 16777216 0.24 268.435456</code></pre>`
      },
      {
        q: `<p>A start-up plans to release the weights of a strong code-generation model openly. List two benefits and two risks of open release, and for each risk one measure that would reduce it, before or after release. Which measures stop working once the weights are public?</p>`,
        a: `<p>Benefits: researchers can study and audit the model, including its safety failures; users can run it privately on their own hardware, without sending code to a company; others can adapt it to new languages and tasks, which spreads the benefits beyond one firm. Risks: it can help write malware (measure before release: evaluate its uplift on offensive security tasks against existing tools and publish the results; remove such data from training); its refusal training can be removed by fine-tuning (no complete fix; documenting the risk in the model card and evaluating the fine-tuned, unrestricted version before release tells you the real worst case). Measures that rely on the developer's control, such as monitoring queries, rate limits, usage policies enforced by an API, and withdrawing or patching the model, stop working once the weights are public, since anyone can run their own copy. That is why the release decision must be made on the evaluation of what an unrestricted copy can do.</p>`
      }
    ],
    sources: ["sennrich16", "petrov23", "devlin19", "kaplan20", "hoffmann22", "hu22", "brown20", "strubell19", "solaiman19", "mitchell19"]
  }
]);

CSA.addAsides("cs470", {
  dl2: [
    { kind: "practice", title: "A recipe for training", html: `<p>In 2019 Andrej Karpathy wrote down the habits that separate training runs that work from ones that silently don't, and they are worth adopting from the first project. Become one with the data: look at hundreds of examples before writing any model code, and look again at the ones the model gets wrong. Start with a simple model and a trustworthy evaluation, and record a baseline (such as always predicting the most common class) so that you know what a meaningless score looks like. Fix the random seed. Check the loss at initialization (ln <em>K</em> for <em>K</em> balanced classes). Overfit one batch. Change one thing at a time and keep a log of every run. Only then add complexity, regularize, and tune. For tuning, prefer random search to grid search: a grid of 3 values for each of two hyperparameters spends 9 runs but tries only 3 values of each, while 9 random draws try 9 different values of each. Usually only a few hyperparameters matter much, and random search explores those more finely for the same budget (James Bergstra and Yoshua Bengio, 2012). The underlying reason is that neural network training fails silently: a bug rarely raises an exception, it just makes the model somewhat worse, and the only defence is to check every step.</p>`, sources: ["karpathy19"] }
  ],
  dl4: [
    { kind: "history", title: "From zip codes to ImageNet", html: `<p>In 1989 Yann LeCun and colleagues at Bell Labs trained a convolutional network by backpropagation to read handwritten zip codes, and by the late 1990s a descendant, LeNet-5, was reading more than 10% of the cheques written in the United States. The 1998 paper describing it also popularized the MNIST digits used in this lesson's example. For the next decade, though, most computer vision used hand-designed features, and neural networks were out of fashion. Two things changed. Fei-Fei Li's ImageNet project collected over a million labelled photos in 1,000 categories, a data set large enough to train a big network, and graphics cards had become programmable enough to train one. In the 2012 ImageNet competition, AlexNet, by Alex Krizhevsky, Ilya Sutskever and Geoffrey Hinton, trained on two GPUs with ReLUs and dropout, achieved a top-5 error of 15.3% (the fraction of test photos whose correct category was not among the network's five highest-scoring guesses), against 26.2% for the second-best entry. Within a few years nearly every vision system was a CNN, and the "deep learning" era had begun. The ingredients were all decades old; what was new was the scale of data and compute.</p>`, sources: ["lecun98", "krizhevsky12"] }
  ],
  dl5: [
    { kind: "history", title: "Hochreiter's thesis", html: `<p>In 1991 Sepp Hochreiter, a student of Jürgen Schmidhuber at the Technical University of Munich, analysed in his diploma thesis why recurrent networks couldn't learn long-range dependencies, and identified the vanishing and exploding gradient problem. Yoshua Bengio, Patrice Simard and Paolo Frasconi independently published a similar analysis in 1994. Hochreiter and Schmidhuber's answer, the LSTM, was published in 1997 with its "constant error carousel": a memory cell whose self-connection has weight 1, so that error signals can flow back through it unchanged. (The forget gate, which lets the cell be reset, was added by Felix Gers and colleagues in 2000.) For about fifteen years LSTMs were a niche method. Then, around 2014–2016, with more data and GPUs, they became the core of speech recognition and machine translation systems used by hundreds of millions of people, until the transformer replaced them for most tasks after 2017.</p>`, sources: ["hochreiter97", "bengio94"] }
  ],
  dl6: [
    { kind: "ethics", title: "Staged release", html: `<p>In February 2019 OpenAI announced GPT-2, a 1.5-billion-parameter language model, and said it would not release the full model because it might be used to generate disinformation or spam at scale. It released a 124-million-parameter version, then larger ones over the following months, and the full model in November 2019, reporting that it had seen no strong evidence of misuse so far. Critics argued that withholding was mostly publicity, since others could train similar models, and that it denied researchers the chance to study the model; supporters argued that the field needed to practise making release decisions before the stakes were higher. The episode raised questions that are still argued about. Who should decide whether a model is released, and on what evidence? Can harms be measured before release, or only afterwards? Once weights are public they can't be withdrawn, while a model behind an interface can be monitored and changed, but keeps power in one company's hands. Since then, developers have published model cards, system cards and the results of dangerous-capability evaluations before releases, and some governments have begun asking for them.</p>`, sources: ["solaiman19", "radford19"] }
  ]
});
