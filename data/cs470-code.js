/* Auto-graded programming problems for CS 470 Deep Learning, by lesson. Generated from a Python spec,
   so every string is JSON. Everything is standard-library Python on small lists (no NumPy), so that each
   test runs in well under a second in the browser; random numbers always come from a seeded
   random.Random passed in by the caller, so results are repeatable. */
CSA.addCode("cs470", {
 "dl1": [
  {
   "id": "broadcast",
   "title": "Broadcasting, and its gradient",
   "prompt": "<p>Represent a tensor as nested lists of numbers (a plain number is a tensor of shape <code>()</code>). Write four functions:</p>\n<ul>\n<li><code>shape(t)</code>: the shape as a tuple, read from the first element at each level: <code>shape([[1, 2, 3], [4, 5, 6]])</code> is <code>(2, 3)</code>, <code>shape(5.0)</code> is <code>()</code>.</li>\n<li><code>broadcast_shape(a, b)</code>: given two shapes (tuples), return the shape of their broadcast result by the notes' rule: line the shapes up at the right, pad the shorter one with 1s on the left, and in each position the sizes must be equal or one of them must be 1; the result takes the larger. Raise <code>ValueError</code> if they don't broadcast.</li>\n<li><code>add(a, b)</code>: the element-wise sum of two tensors with broadcasting, as nested lists of the broadcast shape (or a number if both are numbers).</li>\n<li><code>sum_to(t, shape)</code>: the reverse step used by the backward pass: add up the entries of <code>t</code> over the positions that broadcasting would have stretched, so that the result has shape <code>shape</code>. Leading dimensions that <code>shape</code> lacks are summed away; dimensions where <code>shape</code> has size 1 are summed but kept with size 1. You may assume <code>shape</code> broadcasts to <code>shape(t)</code>.</li>\n</ul>\n<p>For example, <code>add([[1, 2, 3], [4, 5, 6]], [10, 20, 30])</code> is <code>[[11, 22, 33], [14, 25, 36]]</code>, and <code>sum_to([[1, 2, 3], [4, 5, 6]], (3,))</code> is <code>[5, 7, 9]</code> (a bias's gradient: the sum over the batch).</p>",
   "starter": "def shape(t):\n    pass\n\ndef broadcast_shape(a, b):\n    pass\n\ndef add(a, b):\n    pass\n\ndef sum_to(t, shape):\n    pass\n",
   "hint": "<p>For <code>add</code>, first wrap the tensor of lower rank in extra lists until both have the same rank (wrapping <code>t</code> as <code>[t]</code> adds a leading dimension of size 1). Then recurse: at each level, if one side has length 1 reuse its only element for every index of the other. For <code>sum_to</code>, first sum away extra leading dimensions (add the sub-tensors with <code>add</code>), then recurse, summing a level whose target size is 1.</p>",
   "solution": "def shape(t):\n    s = []\n    while isinstance(t, list):\n        s.append(len(t))\n        t = t[0]\n    return tuple(s)\n\ndef broadcast_shape(a, b):\n    a, b = list(a), list(b)\n    n = max(len(a), len(b))\n    a = [1] * (n - len(a)) + a\n    b = [1] * (n - len(b)) + b\n    out = []\n    for x, y in zip(a, b):\n        if x != y and x != 1 and y != 1:\n            raise ValueError(f\"shapes don't broadcast: {x} vs {y}\")\n        out.append(max(x, y))\n    return tuple(out)\n\ndef _wrap(t, k):\n    for _ in range(k):\n        t = [t]\n    return t\n\ndef _add_same_rank(a, b):\n    if not isinstance(a, list):\n        return a + b\n    n = max(len(a), len(b))\n    return [_add_same_rank(a[0] if len(a) == 1 else a[i], b[0] if len(b) == 1 else b[i]) for i in range(n)]\n\ndef add(a, b):\n    sa, sb = shape(a), shape(b)\n    broadcast_shape(sa, sb)\n    r = max(len(sa), len(sb))\n    return _add_same_rank(_wrap(a, r - len(sa)), _wrap(b, r - len(sb)))\n\ndef _sum_same_rank(t, shape):\n    if not shape:\n        return t\n    if shape[0] == 1 and len(t) != 1:\n        total = t[0]\n        for sub in t[1:]:\n            total = add(total, sub)\n        return [_sum_same_rank(total, shape[1:])]\n    return [_sum_same_rank(sub, shape[1:]) for sub in t]\n\ndef sum_to(t, shape_):\n    shape_ = tuple(shape_)\n    extra = len(shape(t)) - len(shape_)\n    for _ in range(extra):\n        total = t[0]\n        for sub in t[1:]:\n            total = add(total, sub)\n        t = total\n    return _sum_same_rank(t, shape_)\n",
   "tests": [
    {
     "label": "Shapes",
     "type": "assert",
     "code": "assert shape([[1, 2, 3], [4, 5, 6]]) == (2, 3), shape([[1, 2, 3], [4, 5, 6]])\nassert shape(5.0) == ()\nassert shape([[[1], [2]]]) == (1, 2, 1)\n"
    },
    {
     "label": "Broadcast shapes",
     "type": "assert",
     "code": "assert broadcast_shape((2, 3), (3,)) == (2, 3)\nassert broadcast_shape((3, 1), (1, 4)) == (3, 4)\nassert broadcast_shape((5, 1, 4), (3, 1)) == (5, 3, 4)\nassert broadcast_shape((), (2, 2)) == (2, 2)\n"
    },
    {
     "label": "Shapes that don't broadcast",
     "type": "raises",
     "call": "broadcast_shape((2, 3), (2,))",
     "error": "ValueError"
    },
    {
     "label": "A bias row added to every row",
     "call": "add([[1, 2, 3], [4, 5, 6]], [10, 20, 30])",
     "expect": "[[11, 22, 33], [14, 25, 36]]"
    },
    {
     "label": "Column plus row gives a table",
     "call": "add([[1], [2], [3]], [[10, 20]])",
     "expect": "[[11, 21], [12, 22], [13, 23]]"
    },
    {
     "label": "Scalars and a rank-3 case",
     "type": "assert",
     "code": "assert add(2, 3) == 5\nassert add([[1, 2]], 10) == [[11, 12]]\nassert add([[[1, 2]], [[3, 4]]], [[0], [100]]) == [[[1, 2], [101, 102]], [[3, 4], [103, 104]]]\n"
    },
    {
     "label": "add raises ValueError on mismatched shapes",
     "type": "raises",
     "call": "add([[1, 2, 3]], [1, 2])",
     "error": "ValueError"
    },
    {
     "label": "sum_to: a bias gradient",
     "call": "sum_to([[1, 2, 3], [4, 5, 6]], (3,))",
     "expect": "[5, 7, 9]"
    },
    {
     "label": "sum_to keeps size-1 dimensions",
     "type": "assert",
     "code": "assert sum_to([[1, 2, 3], [4, 5, 6]], (2, 1)) == [[6], [15]]\nassert sum_to([[1, 2, 3], [4, 5, 6]], (1, 3)) == [[5, 7, 9]]\nassert sum_to([[1, 2, 3], [4, 5, 6]], ()) == 21\nassert sum_to([[1, 2], [3, 4]], (2, 2)) == [[1, 2], [3, 4]]\n"
    },
    {
     "label": "sum_to undoes the stretching of add",
     "type": "assert",
     "code": "g = [[[1, 1], [1, 1], [1, 1]], [[1, 1], [1, 1], [1, 1]]]\nassert sum_to(g, (3, 1)) == [[4], [4], [4]], sum_to(g, (3, 1))\nassert sum_to(g, (2, 1, 2)) == [[[3, 3]], [[3, 3]]]\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "tensor_autograd",
   "title": "A tensor autograd engine",
   "prompt": "<p>Write a class <code>Tensor</code> for 2-D tensors, like the notes'. <code>Tensor(data)</code> takes a list of rows of floats and has attributes <code>data</code> and <code>grad</code> (a list of rows of zeros, the same shape as <code>data</code>). Support:</p>\n<ul>\n<li><code>a @ b</code>: the matrix product, with backward rule ∂L/∂A = <em>G</em><em>B</em><sup>T</sup> and ∂L/∂B = <em>A</em><sup>T</sup><em>G</em>, where <em>G</em> is the output's gradient.</li>\n<li><code>a + b</code>: element-wise sum, where <code>b</code> has the same shape as <code>a</code> or is a single row (shape (1, <em>n</em>)) added to every row. In the second case <code>b</code>'s gradient is the sum of the output gradient's rows.</li>\n<li><code>a.relu()</code>: max(0, <em>x</em>) element-wise; the gradient passes where <em>x</em> &gt; 0 and is 0 elsewhere.</li>\n<li><code>a.sum()</code>: a 1 × 1 tensor holding the sum of all entries.</li>\n<li><code>t.backward()</code>, called on a 1 × 1 tensor: set its gradient to [[1.0]] and fill in <code>grad</code> for every tensor it depends on, in reverse topological order. A tensor used more than once must get the sum of the gradients from each use.</li>\n</ul>\n<p>You may assume <code>backward</code> is called once, on tensors whose gradients are still zero.</p>",
   "starter": "class Tensor:\n    def __init__(self, data):\n        self.data = data\n        self.grad = None\n\n    def __matmul__(self, other):\n        pass\n\n    def __add__(self, other):\n        pass\n\n    def relu(self):\n        pass\n\n    def sum(self):\n        pass\n\n    def backward(self):\n        pass\n",
   "hint": "<p>Give each new tensor its parents and a function that, when called, adds its share of the output's gradient into each parent's <code>grad</code>. <code>backward</code> sorts the graph with a depth-first search (each tensor after its parents), then calls those functions from the end of the order backwards. Write small helpers <code>matmul</code> and <code>transpose</code> on lists first.</p>",
   "solution": "def matmul(A, B):\n    Bt = list(zip(*B))\n    return [[sum(a * b for a, b in zip(row, col)) for col in Bt] for row in A]\n\ndef transpose(A):\n    return [list(r) for r in zip(*A)]\n\nclass Tensor:\n    def __init__(self, data, parents=()):\n        self.data = [list(map(float, r)) for r in data]\n        self.grad = [[0.0] * len(r) for r in self.data]\n        self.parents = parents\n        self.backward_fn = None\n\n    def _acc(self, g):\n        for i, row in enumerate(g):\n            for j, v in enumerate(row):\n                self.grad[i][j] += v\n\n    def __matmul__(self, other):\n        out = Tensor(matmul(self.data, other.data), (self, other))\n        def fn():\n            self._acc(matmul(out.grad, transpose(other.data)))\n            other._acc(matmul(transpose(self.data), out.grad))\n        out.backward_fn = fn\n        return out\n\n    def __add__(self, other):\n        rows = len(other.data)\n        out = Tensor([[x + y for x, y in zip(r, other.data[i if rows > 1 else 0])]\n                      for i, r in enumerate(self.data)], (self, other))\n        def fn():\n            self._acc(out.grad)\n            if rows == len(self.data):\n                other._acc(out.grad)\n            else:\n                other._acc([[sum(c) for c in zip(*out.grad)]])\n        out.backward_fn = fn\n        return out\n\n    def relu(self):\n        out = Tensor([[max(0.0, x) for x in r] for r in self.data], (self,))\n        def fn():\n            self._acc([[g if x > 0 else 0.0 for g, x in zip(gr, xr)] for gr, xr in zip(out.grad, self.data)])\n        out.backward_fn = fn\n        return out\n\n    def sum(self):\n        out = Tensor([[sum(sum(r) for r in self.data)]], (self,))\n        def fn():\n            g = out.grad[0][0]\n            self._acc([[g] * len(r) for r in self.data])\n        out.backward_fn = fn\n        return out\n\n    def backward(self):\n        order, seen, stack = [], set(), [(self, False)]\n        while stack:\n            t, done = stack.pop()\n            if done:\n                order.append(t)\n            elif id(t) not in seen:\n                seen.add(id(t))\n                stack.append((t, True))\n                for p in t.parents:\n                    stack.append((p, False))\n        self.grad = [[1.0]]\n        for t in reversed(order):\n            if t.backward_fn:\n                t.backward_fn()\n",
   "tests": [
    {
     "label": "Forward values",
     "type": "assert",
     "code": "X = Tensor([[1.0, 2.0], [3.0, 4.0]])\nW = Tensor([[1.0, 0.0], [0.0, -1.0]])\nassert (X @ W).data == [[1.0, -2.0], [3.0, -4.0]], (X @ W).data\nassert (X @ W).relu().data == [[1.0, 0.0], [3.0, 0.0]]\nassert (X + Tensor([[10.0, 20.0]])).data == [[11.0, 22.0], [13.0, 24.0]]\nassert X.sum().data == [[10.0]]\n"
    },
    {
     "label": "The notes' layer: relu(XW + b).sum()",
     "type": "assert",
     "code": "import math\nX = Tensor([[1.0, 2.0], [3.0, -1.0], [0.5, 0.5]])\nW = Tensor([[0.2, -0.5, 0.1], [0.4, 0.3, -0.2]])\nb = Tensor([[0.1, 0.0, -0.1]])\nloss = (X @ W + b).relu().sum()\nloss.backward()\nassert math.isclose(loss.data[0][0], 2.3), loss.data\nwant = [[4.5, 1.0, 3.0], [1.5, 2.0, -1.0]]\nassert all(math.isclose(a, c, abs_tol=1e-12) for ra, rc in zip(W.grad, want) for a, c in zip(ra, rc)), W.grad\nassert b.grad == [[3.0, 1.0, 1.0]], b.grad\n"
    },
    {
     "label": "Input gradient G Wᵀ",
     "type": "assert",
     "code": "import math\nX = Tensor([[1.0, 2.0]])\nW = Tensor([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]])\n(X @ W).sum().backward()\nassert X.grad == [[6.0, 15.0]], X.grad\nassert W.grad == [[1.0, 1.0, 1.0], [2.0, 2.0, 2.0]], W.grad\n"
    },
    {
     "label": "A tensor used twice gets both contributions",
     "type": "assert",
     "code": "X = Tensor([[1.0, -2.0]])\nW = Tensor([[3.0], [1.0]])\ny = X @ W\n(y + y).sum().backward()\nassert W.grad == [[2.0], [-4.0]], W.grad\nassert X.grad == [[6.0, 2.0]], X.grad\n"
    },
    {
     "label": "Two layers agree with a numerical gradient",
     "type": "assert",
     "code": "import random\nrng = random.Random(7)\ndef rand(r, c):\n    return [[rng.uniform(-1, 1) for _ in range(c)] for _ in range(r)]\nXd, W1d, b1d, W2d = rand(4, 3), rand(3, 5), rand(1, 5), rand(5, 2)\ndef loss_of(W1v):\n    X, W1, b1, W2 = Tensor(Xd), Tensor(W1v), Tensor(b1d), Tensor(W2d)\n    return ((X @ W1 + b1).relu() @ W2).sum(), W1\nL, W1 = loss_of(W1d)\nL.backward()\nh = 1e-6\nfor i in range(3):\n    for j in range(5):\n        p = [r[:] for r in W1d]; p[i][j] += h\n        m = [r[:] for r in W1d]; m[i][j] -= h\n        num = (loss_of(p)[0].data[0][0] - loss_of(m)[0].data[0][0]) / (2 * h)\n        assert abs(num - W1.grad[i][j]) < 1e-5, (i, j, num, W1.grad[i][j])\n",
     "hidden": true
    }
   ]
  }
 ],
 "dl2": [
  {
   "id": "init",
   "title": "He and Xavier initialization",
   "prompt": "<p>Write three functions. Weight matrices are lists of <code>n_in</code> rows of <code>n_out</code> floats, used as <em>x</em><em>W</em> for a row vector <em>x</em>. Draw entries row by row, left to right, from the given <code>random.Random</code> object <code>rng</code>.</p>\n<ul>\n<li><code>he_normal(n_in, n_out, rng)</code>: each entry <code>rng.gauss(0, std)</code> with std = √(2/<code>n_in</code>).</li>\n<li><code>xavier_uniform(n_in, n_out, rng)</code>: each entry <code>rng.uniform(-a, a)</code> with <em>a</em> = √(6/(<code>n_in</code> + <code>n_out</code>)).</li>\n<li><code>forward_rms(X, weights)</code>: pass the batch <code>X</code> (a list of row vectors) through the layers in order, each computing relu(<em>x</em><em>W</em>) (no biases), and return the list of the root-mean-square values of the activations after each layer: √(mean of <em>a</em><sup>2</sup> over every entry of the batch).</li>\n</ul>",
   "starter": "import math, random\n\ndef he_normal(n_in, n_out, rng):\n    pass\n\ndef xavier_uniform(n_in, n_out, rng):\n    pass\n\ndef forward_rms(X, weights):\n    pass\n",
   "hint": "<p>A nested list comprehension, <code>[[rng.gauss(0, std) for _ in range(n_out)] for _ in range(n_in)]</code>, draws row by row. For <code>forward_rms</code>, entry <em>j</em> of <em>x</em><em>W</em> is <code>sum(x[k] * W[k][j] for k in range(len(x)))</code>.</p>",
   "solution": "import math, random\n\ndef he_normal(n_in, n_out, rng):\n    std = math.sqrt(2 / n_in)\n    return [[rng.gauss(0, std) for _ in range(n_out)] for _ in range(n_in)]\n\ndef xavier_uniform(n_in, n_out, rng):\n    a = math.sqrt(6 / (n_in + n_out))\n    return [[rng.uniform(-a, a) for _ in range(n_out)] for _ in range(n_in)]\n\ndef forward_rms(X, weights):\n    out = []\n    for W in weights:\n        cols = list(zip(*W))\n        X = [[max(0.0, sum(a * b for a, b in zip(x, c))) for c in cols] for x in X]\n        vals = [v for x in X for v in x]\n        out.append(math.sqrt(sum(v * v for v in vals) / len(vals)))\n    return out\n",
   "tests": [
    {
     "label": "Shape and the exact draws",
     "type": "assert",
     "code": "import math, random\nW = he_normal(3, 2, random.Random(5))\nr = random.Random(5)\nassert len(W) == 3 and all(len(row) == 2 for row in W), \"3 rows of 2\"\nassert W == [[r.gauss(0, math.sqrt(2 / 3)) for _ in range(2)] for _ in range(3)], \"draw row by row with rng.gauss(0, sqrt(2/n_in))\"\nU = xavier_uniform(4, 6, random.Random(5))\nr = random.Random(5)\na = math.sqrt(6 / 10)\nassert U == [[r.uniform(-a, a) for _ in range(6)] for _ in range(4)], \"draw row by row with rng.uniform(-a, a)\"\n"
    },
    {
     "label": "He weights have variance close to 2/n_in",
     "type": "assert",
     "code": "import random\nW = he_normal(50, 200, random.Random(0))\nvals = [v for r in W for v in r]\nm = sum(vals) / len(vals)\nvar = sum((v - m) ** 2 for v in vals) / len(vals)\nassert abs(m) < 0.01 and abs(var - 0.04) < 0.002, (m, var)\n"
    },
    {
     "label": "Xavier weights stay within the bound, variance a²/3",
     "type": "assert",
     "code": "import math, random\nU = xavier_uniform(100, 50, random.Random(1))\na = math.sqrt(6 / 150)\nvals = [v for r in U for v in r]\nassert all(-a <= v <= a for v in vals)\nvar = sum(v * v for v in vals) / len(vals)\nassert abs(var - a * a / 3) < 0.0005, (var, a * a / 3)\n"
    },
    {
     "label": "forward_rms by hand",
     "type": "assert",
     "code": "import math\nout = forward_rms([[1.0, -1.0], [2.0, 0.0]], [[[1.0, 0.0], [0.0, 1.0]], [[2.0], [2.0]]])\nassert len(out) == 2\nassert math.isclose(out[0], math.sqrt(5 / 4)), out\nassert math.isclose(out[1], math.sqrt((4 + 16) / 2)), out\n"
    },
    {
     "label": "He keeps the signal; std 0.01 kills it",
     "type": "assert",
     "code": "import random\nrng = random.Random(3)\nn = 32\nX = [[rng.gauss(0, 1) for _ in range(n)] for _ in range(10)]\nhe = forward_rms(X, [he_normal(n, n, rng) for _ in range(8)])\nsmall = forward_rms(X, [[[rng.gauss(0, 0.01) for _ in range(n)] for _ in range(n)] for _ in range(8)])\nassert 0.4 < he[-1] < 2.5, he\nassert small[-1] < 1e-8, small\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "optimizers",
   "title": "Momentum and Adam",
   "prompt": "<p>Write two optimizer classes. Parameters and gradients are lists of floats; <code>step(params, grads)</code> returns a new list of parameters and updates the optimizer's own state.</p>\n<ul>\n<li><code>SGDMomentum(lr, beta=0.9)</code>: keeps a velocity <em>v</em> per parameter, starting at 0. Each step: <em>v</em> ← <em>βv</em> + <em>g</em>, then <em>w</em> ← <em>w</em> − lr · <em>v</em>.</li>\n<li><code>Adam(lr=0.001, beta1=0.9, beta2=0.999, eps=1e-8)</code>: keeps <em>m</em> and <em>v</em> per parameter (starting at 0) and a step count <em>t</em> (starting at 0). Each step: <em>t</em> ← <em>t</em> + 1; <em>m</em> ← <em>β</em><sub>1</sub><em>m</em> + (1 − <em>β</em><sub>1</sub>)<em>g</em>; <em>v</em> ← <em>β</em><sub>2</sub><em>v</em> + (1 − <em>β</em><sub>2</sub>)<em>g</em><sup>2</sup>; <em>m̂</em> = <em>m</em>/(1 − <em>β</em><sub>1</sub><sup><em>t</em></sup>), <em>v̂</em> = <em>v</em>/(1 − <em>β</em><sub>2</sub><sup><em>t</em></sup>); <em>w</em> ← <em>w</em> − lr · <em>m̂</em>/(√<em>v̂</em> + eps).</li>\n</ul>\n<p>Store the state in attributes <code>v</code> (momentum) and <code>m</code>, <code>v</code>, <code>t</code> (Adam), created on the first step if you like.</p>",
   "starter": "import math\n\nclass SGDMomentum:\n    def __init__(self, lr, beta=0.9):\n        pass\n\n    def step(self, params, grads):\n        return params\n\nclass Adam:\n    def __init__(self, lr=0.001, beta1=0.9, beta2=0.999, eps=1e-8):\n        pass\n\n    def step(self, params, grads):\n        return params\n",
   "hint": "<p>Create the state lists of zeros the first time <code>step</code> is called, when you know how many parameters there are (<code>if self.v is None</code>).</p>",
   "solution": "import math\n\nclass SGDMomentum:\n    def __init__(self, lr, beta=0.9):\n        self.lr, self.beta, self.v = lr, beta, None\n\n    def step(self, params, grads):\n        if self.v is None:\n            self.v = [0.0] * len(params)\n        self.v = [self.beta * v + g for v, g in zip(self.v, grads)]\n        return [w - self.lr * v for w, v in zip(params, self.v)]\n\nclass Adam:\n    def __init__(self, lr=0.001, beta1=0.9, beta2=0.999, eps=1e-8):\n        self.lr, self.b1, self.b2, self.eps = lr, beta1, beta2, eps\n        self.m = self.v = None\n        self.t = 0\n\n    def step(self, params, grads):\n        if self.m is None:\n            self.m = [0.0] * len(params)\n            self.v = [0.0] * len(params)\n        self.t += 1\n        self.m = [self.b1 * m + (1 - self.b1) * g for m, g in zip(self.m, grads)]\n        self.v = [self.b2 * v + (1 - self.b2) * g * g for v, g in zip(self.v, grads)]\n        c1, c2 = 1 - self.b1 ** self.t, 1 - self.b2 ** self.t\n        return [w - self.lr * (m / c1) / (math.sqrt(v / c2) + self.eps)\n                for w, m, v in zip(params, self.m, self.v)]\n",
   "tests": [
    {
     "label": "Momentum: two steps by hand",
     "type": "assert",
     "code": "import math\nopt = SGDMomentum(0.1, beta=0.5)\np = opt.step([1.0, 2.0], [1.0, -2.0])\nassert all(math.isclose(a, b) for a, b in zip(p, [0.9, 2.2])), p\np = opt.step(p, [1.0, -2.0])\nassert all(math.isclose(a, b) for a, b in zip(p, [0.75, 2.5])), p\n"
    },
    {
     "label": "Adam's first step moves every parameter by lr",
     "type": "assert",
     "code": "import math\nopt = Adam(lr=0.1)\np = opt.step([10.0, 1.0, -3.0], [1.0, 50.0, -0.001])\nassert all(math.isclose(a, b, abs_tol=1e-6) for a, b in zip(p, [9.9, 0.9, -2.9])), p\nassert opt.t == 1\n"
    },
    {
     "label": "Adam's state after two steps",
     "type": "assert",
     "code": "import math\nopt = Adam(lr=0.01)\np = opt.step([0.0], [2.0])\np = opt.step(p, [-1.0])\nassert opt.t == 2\nassert math.isclose(opt.m[0], 0.9 * 0.2 - 0.1), opt.m\nassert math.isclose(opt.v[0], 0.999 * 0.004 + 0.001), opt.v\nmhat = (0.9 * 0.2 - 0.1) / (1 - 0.81)\nvhat = (0.999 * 0.004 + 0.001) / (1 - 0.999 ** 2)\nassert math.isclose(p[0], -0.01 - 0.01 * mhat / (math.sqrt(vhat) + 1e-8), abs_tol=1e-9), p\n"
    },
    {
     "label": "Both minimize an elongated bowl",
     "type": "assert",
     "code": "import math\ndef grad(p):\n    return [p[0], 50 * p[1]]\nfor opt, steps in ((SGDMomentum(0.035, beta=0.7), 52), (Adam(lr=0.5), 130)):\n    p = [10.0, 1.0]\n    for _ in range(steps):\n        p = opt.step(p, grad(p))\n    assert math.hypot(*p) < 1e-3, (type(opt).__name__, p)\n",
     "hidden": true
    }
   ]
  }
 ],
 "dl3": [
  {
   "id": "dropout",
   "title": "Inverted dropout",
   "prompt": "<p>Write inverted dropout for a vector (a list of floats).</p>\n<ul>\n<li><code>dropout_forward(x, p, rng, train=True)</code>: in training, for each entry in order call <code>rng.random()</code> once; if the value is less than <code>p</code> the entry is dropped (mask value 0.0), otherwise it is kept and scaled (mask value 1/(1 − <code>p</code>)). Return <code>(out, mask)</code> with out[i] = x[i] · mask[i]. When <code>train</code> is false, return <code>(list(x), None)</code> without drawing any random numbers. Raise <code>ValueError</code> unless 0 ≤ <code>p</code> &lt; 1.</li>\n<li><code>dropout_backward(dout, mask)</code>: the gradient with respect to <code>x</code>, given the gradient <code>dout</code> of the output.</li>\n</ul>",
   "starter": "def dropout_forward(x, p, rng, train=True):\n    pass\n\ndef dropout_backward(dout, mask):\n    pass\n",
   "hint": "<p>out[i] = x[i] · mask[i], so ∂out[i]/∂x[i] = mask[i]: the backward pass multiplies by the same mask.</p>",
   "solution": "def dropout_forward(x, p, rng, train=True):\n    if not 0 <= p < 1:\n        raise ValueError(\"p must be in [0, 1)\")\n    if not train:\n        return list(x), None\n    keep = 1.0 / (1 - p)\n    mask = [0.0 if rng.random() < p else keep for _ in x]\n    return [a * m for a, m in zip(x, mask)], mask\n\ndef dropout_backward(dout, mask):\n    return [d * m for d, m in zip(dout, mask)]\n",
   "tests": [
    {
     "label": "The notes' example (seed 0, p = 0.5)",
     "type": "assert",
     "code": "import random\nout, mask = dropout_forward([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], 0.5, random.Random(0))\nassert out == [2.0, 4.0, 0.0, 0.0, 10.0, 0.0], out\nassert mask == [2.0, 2.0, 0.0, 0.0, 2.0, 0.0], mask\n"
    },
    {
     "label": "Uses exactly one rng.random() per entry",
     "type": "assert",
     "code": "import random\nr1, r2 = random.Random(9), random.Random(9)\n_, mask = dropout_forward([1.0] * 5, 0.3, r1)\nexpect = [0.0 if r2.random() < 0.3 else 1 / 0.7 for _ in range(5)]\nassert mask == expect, (mask, expect)\nassert r1.random() == r2.random(), \"draw exactly one number per entry\"\n"
    },
    {
     "label": "Evaluation mode is the identity",
     "type": "assert",
     "code": "import random\nr = random.Random(1)\nout, mask = dropout_forward([1.0, -2.0], 0.5, r, train=False)\nassert out == [1.0, -2.0] and mask is None\nassert r.random() == random.Random(1).random(), \"no random numbers in evaluation mode\"\n"
    },
    {
     "label": "The expected value is unchanged",
     "type": "assert",
     "code": "import random\nout, _ = dropout_forward([1.0] * 20000, 0.3, random.Random(0))\nm = sum(out) / len(out)\nassert abs(m - 1.0) < 0.03, m\n"
    },
    {
     "label": "Backward uses the same mask",
     "call": "dropout_backward([1.0, 1.0, 3.0], [2.0, 0.0, 2.0])",
     "expect": "[2.0, 0.0, 6.0]"
    },
    {
     "label": "p outside [0, 1) is an error",
     "type": "raises",
     "call": "dropout_forward([1.0], 1.0, None)",
     "error": "ValueError"
    }
   ]
  },
  {
   "id": "layernorm",
   "title": "Layer normalization, forward and backward",
   "prompt": "<p>Write layer normalization for a batch <code>X</code> (a list of rows, each a list of <em>d</em> floats), with learned lists <code>gamma</code> and <code>beta</code> of length <em>d</em>.</p>\n<ul>\n<li><code>layernorm_forward(X, gamma, beta, eps=1e-5)</code>: for each row, compute its mean <em>μ</em> and variance <em>σ</em><sup>2</sup> (divide by <em>d</em>), <em>s</em> = √(<em>σ</em><sup>2</sup> + eps), <em>x̂</em> = (<em>x</em> − <em>μ</em>)/<em>s</em>, and <em>y</em> = <code>gamma</code> · <em>x̂</em> + <code>beta</code> entry by entry. Return <code>(Y, cache)</code>, where <code>cache</code> holds whatever the backward pass needs.</li>\n<li><code>layernorm_backward(dY, cache)</code>: return <code>(dX, dgamma, dbeta)</code>. For each row, with <em>g</em> = <code>gamma</code> · <em>dy</em>, the notes' formula gives <em>dx</em> = (<em>g</em> − mean(<em>g</em>) − <em>x̂</em> · mean(<em>g</em> <em>x̂</em>))/<em>s</em>. <code>dgamma</code> and <code>dbeta</code> are summed over the rows: dgamma[j] = Σ<sub>rows</sub> <em>dy</em><sub>j</sub><em>x̂</em><sub>j</sub>, dbeta[j] = Σ<sub>rows</sub> <em>dy</em><sub>j</sub>.</li>\n</ul>",
   "starter": "import math\n\ndef layernorm_forward(X, gamma, beta, eps=1e-5):\n    pass\n\ndef layernorm_backward(dY, cache):\n    pass\n",
   "hint": "<p>Store, for each row, its <em>x̂</em> and its <em>s</em>, and also <code>gamma</code>, in the cache. In the backward pass, mean(<em>g</em>) and mean(<em>g x̂</em>) are averages over the <em>d</em> entries of one row.</p>",
   "solution": "import math\n\ndef layernorm_forward(X, gamma, beta, eps=1e-5):\n    Y, rows = [], []\n    for x in X:\n        d = len(x)\n        mu = sum(x) / d\n        var = sum((v - mu) ** 2 for v in x) / d\n        s = math.sqrt(var + eps)\n        xhat = [(v - mu) / s for v in x]\n        Y.append([g * xh + b for g, xh, b in zip(gamma, xhat, beta)])\n        rows.append((xhat, s))\n    return Y, (rows, list(gamma))\n\ndef layernorm_backward(dY, cache):\n    rows, gamma = cache\n    d = len(gamma)\n    dX = []\n    dgamma, dbeta = [0.0] * d, [0.0] * d\n    for dy, (xhat, s) in zip(dY, rows):\n        g = [a * b for a, b in zip(dy, gamma)]\n        mg = sum(g) / d\n        mgx = sum(a * b for a, b in zip(g, xhat)) / d\n        dX.append([(gi - mg - xh * mgx) / s for gi, xh in zip(g, xhat)])\n        for j in range(d):\n            dgamma[j] += dy[j] * xhat[j]\n            dbeta[j] += dy[j]\n    return dX, dgamma, dbeta\n",
   "tests": [
    {
     "label": "Each row gets mean 0 and variance 1",
     "type": "assert",
     "code": "import math\nY, _ = layernorm_forward([[2.0, 4.0, 6.0, 8.0], [1.0, 1.0, 1.0, 5.0]], [1.0] * 4, [0.0] * 4)\nfor y in Y:\n    m = sum(y) / 4\n    v = sum((a - m) ** 2 for a in y) / 4\n    assert abs(m) < 1e-12 and abs(v - 1) < 1e-4, (m, v)\nassert [round(a, 4) for a in Y[0]] == [-1.3416, -0.4472, 0.4472, 1.3416], Y[0]\n"
    },
    {
     "label": "gamma and beta scale and shift",
     "type": "assert",
     "code": "Y, _ = layernorm_forward([[2.0, 4.0, 6.0, 8.0]], [2.0, 2.0, 1.0, 1.0], [1.0, 0.0, 0.0, -1.0])\nassert [round(a, 4) for a in Y[0]] == [-1.6833, -0.8944, 0.4472, 0.3416], Y[0]\n"
    },
    {
     "label": "The notes' backward example",
     "type": "assert",
     "code": "_, cache = layernorm_forward([[2.0, 4.0, 6.0, 8.0]], [1.0] * 4, [0.0] * 4)\ndX, dg, db = layernorm_backward([[1.0, 0.0, 0.0, 0.0]], cache)\nassert [round(a, 4) for a in dX[0]] == [0.1342, -0.1789, -0.0447, 0.0894], dX\nassert [round(a, 4) for a in dg] == [-1.3416, 0.0, 0.0, 0.0] and db == [1.0, 0.0, 0.0, 0.0], (dg, db)\n"
    },
    {
     "label": "Agrees with a numerical gradient",
     "type": "assert",
     "code": "import random\nrng = random.Random(4)\nX = [[rng.uniform(-2, 2) for _ in range(5)] for _ in range(3)]\ngamma = [rng.uniform(0.5, 1.5) for _ in range(5)]\nbeta = [rng.uniform(-1, 1) for _ in range(5)]\nC = [[rng.uniform(-1, 1) for _ in range(5)] for _ in range(3)]\ndef loss(Xv, gv):\n    Y, _ = layernorm_forward(Xv, gv, beta)\n    return sum(c * y for cr, yr in zip(C, Y) for c, y in zip(cr, yr))\n_, cache = layernorm_forward(X, gamma, beta)\ndX, dg, db = layernorm_backward(C, cache)\nh = 1e-6\nfor i in range(3):\n    for j in range(5):\n        P = [r[:] for r in X]; P[i][j] += h\n        M = [r[:] for r in X]; M[i][j] -= h\n        num = (loss(P, gamma) - loss(M, gamma)) / (2 * h)\n        assert abs(num - dX[i][j]) < 1e-5, (i, j, num, dX[i][j])\nfor j in range(5):\n    gp = gamma[:]; gp[j] += h\n    gm = gamma[:]; gm[j] -= h\n    num = (loss(X, gp) - loss(X, gm)) / (2 * h)\n    assert abs(num - dg[j]) < 1e-5, (j, num, dg[j])\n    assert abs(db[j] - sum(C[i][j] for i in range(3))) < 1e-12\n",
     "hidden": true
    }
   ]
  }
 ],
 "dl4": [
  {
   "id": "conv2d",
   "title": "2D convolution with channels, stride and padding",
   "prompt": "<p>Write a convolutional layer's forward pass (as deep learning libraries compute it: cross-correlation, with no kernel flip).</p>\n<ul>\n<li><code>conv_output_size(n, k, padding, stride)</code>: ⌊(<em>n</em> + 2<em>p</em> − <em>k</em>)/<em>s</em>⌋ + 1.</li>\n<li><code>conv_param_count(c_in, c_out, k)</code>: the number of weights and biases in a layer with <code>c_out</code> filters of size <code>c_in</code> × <em>k</em> × <em>k</em>, one bias each.</li>\n<li><code>conv2d(x, w, b, stride=1, padding=0)</code>: <code>x</code> has shape (<em>C</em><sub>in</sub>, <em>H</em>, <em>W</em>) as nested lists, <code>w</code> has shape (<em>C</em><sub>out</sub>, <em>C</em><sub>in</sub>, <em>k</em>, <em>k</em>) and <code>b</code> is a list of <em>C</em><sub>out</sub> biases. Pad every channel with <code>padding</code> zeros on each side, then output channel <em>o</em> at (<em>i</em>, <em>j</em>) is <code>b[o]</code> + Σ<sub><em>c</em>, <em>a</em>, <em>e</em></sub> w[o][c][a][e] · xpad[c][<em>i</em>·stride + <em>a</em>][<em>j</em>·stride + <em>e</em>]. Return a list of <em>C</em><sub>out</sub> output channels. Raise <code>ValueError</code> if the filters' channel count differs from the input's.</li>\n</ul>",
   "starter": "def conv_output_size(n, k, padding, stride):\n    pass\n\ndef conv_param_count(c_in, c_out, k):\n    pass\n\ndef conv2d(x, w, b, stride=1, padding=0):\n    pass\n",
   "hint": "<p>Build the padded input first: for each channel, a row of zeros of width <em>W</em> + 2<em>p</em>, repeated <em>p</em> times, then each row with <em>p</em> zeros on each end, then <em>p</em> more rows of zeros. Then loop over output positions using <code>conv_output_size</code> for the output's height and width.</p>",
   "solution": "def conv_output_size(n, k, padding, stride):\n    return (n + 2 * padding - k) // stride + 1\n\ndef conv_param_count(c_in, c_out, k):\n    return c_out * (c_in * k * k + 1)\n\ndef conv2d(x, w, b, stride=1, padding=0):\n    c_in, H, W = len(x), len(x[0]), len(x[0][0])\n    if any(len(f) != c_in for f in w):\n        raise ValueError(\"filter channels don't match the input\")\n    k = len(w[0][0])\n    p = padding\n    xp = [[[0.0] * (W + 2 * p) for _ in range(p)] +\n          [[0.0] * p + list(row) + [0.0] * p for row in ch] +\n          [[0.0] * (W + 2 * p) for _ in range(p)] for ch in x]\n    Ho, Wo = conv_output_size(H, k, p, stride), conv_output_size(W, k, p, stride)\n    out = []\n    for o, f in enumerate(w):\n        out.append([[b[o] + sum(f[c][a][e] * xp[c][i * stride + a][j * stride + e]\n                                for c in range(c_in) for a in range(k) for e in range(k))\n                     for j in range(Wo)] for i in range(Ho)])\n    return out\n",
   "tests": [
    {
     "label": "Output sizes",
     "type": "assert",
     "code": "assert conv_output_size(32, 3, 1, 1) == 32\nassert conv_output_size(32, 3, 1, 2) == 16\nassert conv_output_size(32, 5, 0, 1) == 28\nassert conv_output_size(7, 3, 0, 2) == 3\n"
    },
    {
     "label": "Parameter counts",
     "type": "assert",
     "code": "assert conv_param_count(3, 64, 3) == 1792\nassert conv_param_count(8, 16, 3) == 1168\nassert conv_param_count(64, 64, 1) == 4160\n"
    },
    {
     "label": "The notes' vertical edge filter",
     "type": "assert",
     "code": "img = [[[0, 0, 0, 9, 9, 9] for _ in range(5)]]\nsobel = [[[[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]]]\nout = conv2d(img, sobel, [0])\nassert out == [[[0, 36, 36, 0]] * 3], out\n"
    },
    {
     "label": "Padding and stride",
     "type": "assert",
     "code": "x = [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]]\nones = [[[[1, 1, 1], [1, 1, 1], [1, 1, 1]]]]\nassert conv2d(x, ones, [0], padding=1) == [[[12, 21, 16], [27, 45, 33], [24, 39, 28]]], conv2d(x, ones, [0], padding=1)\nassert conv2d(x, ones, [0.5], stride=2, padding=1) == [[[12.5, 16.5], [24.5, 28.5]]]\n"
    },
    {
     "label": "Two input channels, two filters, biases",
     "type": "assert",
     "code": "x = [[[1, 2], [3, 4]], [[10, 20], [30, 40]]]\nw = [[[[1]], [[0]]], [[[1]], [[1]]]]\nassert conv2d(x, w, [0, 100]) == [[[1, 2], [3, 4]], [[111, 122], [133, 144]]]\nw2 = [[[[1, 0], [0, 1]], [[0, 1], [0, 0]]]]\nassert conv2d(x, w2, [1]) == [[[1 + 1 + 4 + 20]]], conv2d(x, w2, [1])\n"
    },
    {
     "label": "Channel mismatch",
     "type": "raises",
     "call": "conv2d([[[1]]], [[[[1]], [[1]]]], [0])",
     "error": "ValueError"
    },
    {
     "label": "Agrees with a reference on a random case",
     "type": "assert",
     "code": "import random\nrng = random.Random(2)\nx = [[[rng.randint(-3, 3) for _ in range(6)] for _ in range(5)] for _ in range(3)]\nw = [[[[rng.randint(-2, 2) for _ in range(3)] for _ in range(3)] for _ in range(3)] for _ in range(2)]\nout = conv2d(x, w, [1, -1], stride=2, padding=1)\nassert len(out) == 2 and len(out[0]) == 3 and len(out[0][0]) == 3, (len(out), len(out[0]), len(out[0][0]))\ndef px(c, i, j):\n    return x[c][i][j] if 0 <= i < 5 and 0 <= j < 6 else 0\nfor o in range(2):\n    for i in range(3):\n        for j in range(3):\n            want = [1, -1][o] + sum(w[o][c][a][e] * px(c, 2 * i + a - 1, 2 * j + e - 1) for c in range(3) for a in range(3) for e in range(3))\n            assert out[o][i][j] == want, (o, i, j, out[o][i][j], want)\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "maxpool",
   "title": "Max pooling, forward and backward",
   "prompt": "<p>Write max pooling for one channel (a list of rows).</p>\n<ul>\n<li><code>maxpool_forward(x, k=2, stride=2)</code>: output (<em>i</em>, <em>j</em>) is the largest value in the <em>k</em> × <em>k</em> window whose top-left corner is (<em>i</em>·stride, <em>j</em>·stride); the output has ⌊(<em>H</em> − <em>k</em>)/stride⌋ + 1 rows and likewise for columns. Return <code>(out, argmax)</code>, where argmax[i][j] is the (row, column) position in <code>x</code> of the chosen value. If a window's maximum appears more than once, choose the first in row-major order (top row first, left to right).</li>\n<li><code>maxpool_backward(dout, argmax, shape)</code>: return the gradient with respect to <code>x</code>, a list of rows of shape <code>shape</code> = (<em>H</em>, <em>W</em>): each dout[i][j] is added to the position argmax[i][j], and every other position gets 0. Windows may overlap, so add.</li>\n</ul>",
   "starter": "def maxpool_forward(x, k=2, stride=2):\n    pass\n\ndef maxpool_backward(dout, argmax, shape):\n    pass\n",
   "hint": "<p>Scan each window with two loops in row-major order and replace the best only when a value is strictly larger: that keeps the first of equal maxima.</p>",
   "solution": "def maxpool_forward(x, k=2, stride=2):\n    H, W = len(x), len(x[0])\n    Ho, Wo = (H - k) // stride + 1, (W - k) // stride + 1\n    out, arg = [], []\n    for i in range(Ho):\n        orow, arow = [], []\n        for j in range(Wo):\n            best, pos = None, None\n            for a in range(k):\n                for e in range(k):\n                    r, c = i * stride + a, j * stride + e\n                    if best is None or x[r][c] > best:\n                        best, pos = x[r][c], (r, c)\n            orow.append(best)\n            arow.append(pos)\n        out.append(orow)\n        arg.append(arow)\n    return out, arg\n\ndef maxpool_backward(dout, argmax, shape):\n    H, W = shape\n    dx = [[0.0] * W for _ in range(H)]\n    for drow, arow in zip(dout, argmax):\n        for d, (r, c) in zip(drow, arow):\n            dx[r][c] += d\n    return dx\n",
   "tests": [
    {
     "label": "The notes' 4 × 4 example",
     "type": "assert",
     "code": "A = [[1, 3, 2, 0], [4, 2, 1, 5], [0, 1, 3, 3], [2, 6, 1, 0]]\nout, arg = maxpool_forward(A)\nassert out == [[4, 5], [6, 3]], out\nassert arg == [[(1, 0), (1, 3)], [(3, 1), (2, 2)]], arg\n"
    },
    {
     "label": "Ties choose the first in row-major order",
     "type": "assert",
     "code": "out, arg = maxpool_forward([[7, 7], [7, 7]])\nassert out == [[7]] and arg == [[(0, 0)]], (out, arg)\n"
    },
    {
     "label": "Backward routes each gradient to its maximum",
     "type": "assert",
     "code": "A = [[1, 3, 2, 0], [4, 2, 1, 5], [0, 1, 3, 3], [2, 6, 1, 0]]\nout, arg = maxpool_forward(A)\ndx = maxpool_backward([[1.0, 2.0], [3.0, 4.0]], arg, (4, 4))\nassert dx == [[0.0, 0.0, 0.0, 0.0], [1.0, 0.0, 0.0, 2.0], [0.0, 0.0, 4.0, 0.0], [0.0, 3.0, 0.0, 0.0]], dx\n"
    },
    {
     "label": "Overlapping windows add (3 × 3, stride 1)",
     "type": "assert",
     "code": "x = [[0, 0, 0, 0], [0, 9, 0, 0], [0, 0, 0, 0], [0, 0, 0, 1]]\nout, arg = maxpool_forward(x, k=3, stride=1)\nassert out == [[9, 9], [9, 9]], out\ndx = maxpool_backward([[1.0, 1.0], [1.0, 1.0]], arg, (4, 4))\nassert dx[1][1] == 4.0 and sum(map(sum, dx)) == 4.0, dx\n"
    },
    {
     "label": "Odd sizes drop the leftover row and column",
     "type": "assert",
     "code": "x = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15]]\nout, arg = maxpool_forward(x)\nassert out == [[7, 9]], out\ndx = maxpool_backward([[1.0, 1.0]], arg, (3, 5))\nassert len(dx) == 3 and len(dx[0]) == 5 and dx[1][1] == 1.0 and dx[1][3] == 1.0\n",
     "hidden": true
    }
   ]
  }
 ],
 "dl5": [
  {
   "id": "lstm",
   "title": "An LSTM cell",
   "prompt": "<p>Write an LSTM with hidden size <em>H</em> and input size <em>D</em>. Its parameters are a matrix <code>W</code> of 4<em>H</em> rows, each of length <em>D</em> + <em>H</em>, and a bias list <code>b</code> of length 4<em>H</em>. For input <em>x</em> (length <em>D</em>) and previous state <em>h</em>, <em>c</em> (length <em>H</em> each), compute <em>z</em> = <code>W</code> [<em>x</em>; <em>h</em>] + <code>b</code>, where [<em>x</em>; <em>h</em>] is <em>x</em> followed by <em>h</em>. Its four blocks of <em>H</em> entries, in order, give the gates:</p>\n<p class=\"math\"><em>i</em> = σ(<em>z</em><sub>0…H−1</sub>), <em>f</em> = σ(<em>z</em><sub>H…2H−1</sub>), <em>g</em> = tanh(<em>z</em><sub>2H…3H−1</sub>), <em>o</em> = σ(<em>z</em><sub>3H…4H−1</sub>)</p>\n<p class=\"math\"><em>c</em>′ = <em>f</em> ⊙ <em>c</em> + <em>i</em> ⊙ <em>g</em>,&nbsp;&nbsp; <em>h</em>′ = <em>o</em> ⊙ tanh(<em>c</em>′)</p>\n<p>(⊙ is the element-wise product.) Write <code>lstm_step(x, h, c, W, b)</code>, returning <code>(h_new, c_new)</code>, and <code>lstm_forward(xs, W, b)</code>, which starts from <em>h</em> = <em>c</em> = zeros (the length of <code>b</code> divided by 4), runs one step per input in <code>xs</code>, and returns the list of hidden states <em>h</em><sub>1</sub>, …, <em>h</em><sub><em>T</em></sub>.</p>",
   "starter": "import math\n\ndef lstm_step(x, h, c, W, b):\n    pass\n\ndef lstm_forward(xs, W, b):\n    pass\n",
   "hint": "<p>Compute <code>z = [sum(w * v for w, v in zip(row, x + h)) + bi for row, bi in zip(W, b)]</code>, then slice it into four lists of length <em>H</em>. Write <code>sigmoid(t) = 1 / (1 + math.exp(-t))</code>.</p>",
   "solution": "import math\n\ndef sigmoid(t):\n    return 1 / (1 + math.exp(-t))\n\ndef lstm_step(x, h, c, W, b):\n    H = len(b) // 4\n    xh = list(x) + list(h)\n    z = [sum(w * v for w, v in zip(row, xh)) + bi for row, bi in zip(W, b)]\n    i = [sigmoid(t) for t in z[:H]]\n    f = [sigmoid(t) for t in z[H:2 * H]]\n    g = [math.tanh(t) for t in z[2 * H:3 * H]]\n    o = [sigmoid(t) for t in z[3 * H:]]\n    c_new = [fk * ck + ik * gk for fk, ck, ik, gk in zip(f, c, i, g)]\n    h_new = [ok * math.tanh(ck) for ok, ck in zip(o, c_new)]\n    return h_new, c_new\n\ndef lstm_forward(xs, W, b):\n    H = len(b) // 4\n    h, c = [0.0] * H, [0.0] * H\n    hs = []\n    for x in xs:\n        h, c = lstm_step(x, h, c, W, b)\n        hs.append(h)\n    return hs\n",
   "tests": [
    {
     "label": "The notes' scalar example",
     "type": "assert",
     "code": "import math\n# D = H = 1. Rows: i, f, g, o; columns: x, h.\nW = [[1.0, 0.0], [0.5, 0.0], [2.0, 0.0], [1.0, 0.0]]\nb = [0.0, 1.0, 0.0, 0.0]\nh, c = lstm_step([1.0], [0.0], [0.5], W, b)\nassert math.isclose(c[0], 1.1135, abs_tol=1e-4), c\nassert math.isclose(h[0], 0.5887, abs_tol=1e-4), h\n"
    },
    {
     "label": "Gate order i, f, g, o",
     "type": "assert",
     "code": "import math\nW = [[0.0, 0.0]] * 4\n# all gates sigmoid(0) = 0.5 except g = tanh(b) for the third block\nh, c = lstm_step([0.0], [0.0], [2.0], W, [0.0, 0.0, 1.0, 0.0])\nwant_c = 0.5 * 2.0 + 0.5 * math.tanh(1.0)\nassert math.isclose(c[0], want_c), (c, want_c)\nassert math.isclose(h[0], 0.5 * math.tanh(want_c)), h\nh, c = lstm_step([0.0], [0.0], [2.0], W, [0.0, 10.0, 0.0, 0.0])\nassert math.isclose(c[0], 2.0 / (1 + math.exp(-10))), \"the second block is the forget gate\"\n"
    },
    {
     "label": "Two hidden units, two inputs",
     "type": "assert",
     "code": "import math\nW = [[0.1 * (r + 1) * (1 if (r + k) % 2 else -1) for k in range(4)] for r in range(8)]\nb = [0.1 * r - 0.3 for r in range(8)]\nh, c = lstm_step([1.0, -0.5], [0.2, 0.1], [0.3, -0.4], W, b)\nassert [round(v, 6) for v in h] == [-0.038384, 0.144565], h\nassert [round(v, 6) for v in c] == [-0.126202, 0.17322], c\n"
    },
    {
     "label": "lstm_forward runs from zero state",
     "type": "assert",
     "code": "import math\nW = [[1.0, 0.0], [0.5, 0.0], [2.0, 0.0], [1.0, 0.0]]\nb = [0.0, 1.0, 0.0, 0.0]\nhs = lstm_forward([[1.0], [0.0], [-1.0]], W, b)\nassert len(hs) == 3\nh1, c1 = lstm_step([1.0], [0.0], [0.0], W, b)\nh2, c2 = lstm_step([0.0], h1, c1, W, b)\nh3, c3 = lstm_step([-1.0], h2, c2, W, b)\nassert hs == [h1, h2, h3], hs\n"
    },
    {
     "label": "A forget gate near 1 keeps the cell for many steps",
     "type": "assert",
     "code": "W = [[0.0, 0.0], [0.0, 0.0], [0.0, 0.0], [0.0, 0.0]]\nh, c = [0.0], [1.0]\nfor _ in range(50):\n    h, c = lstm_step([0.0], h, c, W, [-20.0, 20.0, 0.0, 20.0])\nassert abs(c[0] - 1.0) < 1e-6 and abs(h[0] - 0.761594) < 1e-5, (h, c)\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "mha",
   "title": "Multi-head causal self-attention",
   "prompt": "<p>Write multi-head self-attention on lists of row vectors.</p>\n<ul>\n<li><code>positional_encoding(n, d)</code>: the sinusoidal encodings of <em>all</em> positions 0 to <em>n</em> − 1, as <em>n</em> rows of length <em>d</em> (<em>d</em> even): entry 2<em>k</em> of row <em>pos</em> is sin(<em>pos</em>/10000<sup>2<em>k</em>/<em>d</em></sup>) and entry 2<em>k</em> + 1 is cos(<em>pos</em>/10000<sup>2<em>k</em>/<em>d</em></sup>). Unlike the notes' function of the same name, whose first argument is one position and which returns one vector, this one takes the number of positions and returns the whole table: row <em>pos</em> is the notes' <code>positional_encoding(pos, d)</code>.</li>\n<li><code>multi_head_attention(X, Wq, Wk, Wv, Wo, n_heads, causal=True)</code>: <code>X</code> is <em>n</em> rows of length <em>d</em>; each <code>W</code> is a <em>d</em> × <em>d</em> matrix (list of rows). Compute <em>Q</em> = <em>X</em><em>W</em><sub>Q</sub>, <em>K</em> = <em>X</em><em>W</em><sub>K</sub>, <em>V</em> = <em>X</em><em>W</em><sub>V</sub>. Head <em>h</em> uses columns <em>h</em>·<em>d<sub>k</sub></em> to (<em>h</em> + 1)·<em>d<sub>k</sub></em> − 1 of each, with <em>d<sub>k</sub></em> = <em>d</em>/<code>n_heads</code>, and computes softmax(<em>Q<sub>h</sub></em><em>K<sub>h</sub></em><sup>T</sup>/√<em>d<sub>k</sub></em>) <em>V<sub>h</sub></em>, with scores for <em>j</em> &gt; <em>i</em> set to −∞ when <code>causal</code>. Concatenate the heads' outputs for each position (head 0 first) and multiply by <em>W</em><sub>O</sub>. Return the <em>n</em> × <em>d</em> result. Raise <code>ValueError</code> if <code>n_heads</code> doesn't divide <em>d</em>.</li>\n</ul>",
   "starter": "import math\n\ndef positional_encoding(n, d):\n    pass\n\ndef multi_head_attention(X, Wq, Wk, Wv, Wo, n_heads, causal=True):\n    pass\n",
   "hint": "<p>Write <code>matmul</code> and a <code>softmax</code> that subtracts the maximum first (so −∞ entries become <code>exp(-inf) = 0.0</code>). Slicing a row, <code>Q[i][h * dk:(h + 1) * dk]</code>, gives position <em>i</em>'s query for head <em>h</em>.</p>",
   "solution": "import math\n\ndef matmul(A, B):\n    cols = list(zip(*B))\n    return [[sum(a * b for a, b in zip(r, c)) for c in cols] for r in A]\n\ndef softmax(xs):\n    m = max(xs)\n    e = [math.exp(x - m) for x in xs]\n    s = sum(e)\n    return [v / s for v in e]\n\ndef positional_encoding(n, d):\n    return [[math.sin(p / 10000 ** (j / d)) if j % 2 == 0 else math.cos(p / 10000 ** ((j - 1) / d))\n             for j in range(d)] for p in range(n)]\n\ndef multi_head_attention(X, Wq, Wk, Wv, Wo, n_heads, causal=True):\n    n, d = len(X), len(X[0])\n    if d % n_heads:\n        raise ValueError(\"n_heads must divide d\")\n    dk = d // n_heads\n    Q, K, V = matmul(X, Wq), matmul(X, Wk), matmul(X, Wv)\n    concat = [[] for _ in range(n)]\n    for h in range(n_heads):\n        sl = slice(h * dk, (h + 1) * dk)\n        for i in range(n):\n            q = Q[i][sl]\n            scores = [sum(a * b for a, b in zip(q, K[j][sl])) / math.sqrt(dk)\n                      if not (causal and j > i) else -math.inf for j in range(n)]\n            w = softmax(scores)\n            concat[i].extend(sum(w[j] * V[j][sl][c] for j in range(n)) for c in range(dk))\n    return matmul(concat, Wo)\n",
   "tests": [
    {
     "label": "Positional encodings",
     "type": "assert",
     "code": "P = positional_encoding(3, 4)\nassert [round(v, 3) for v in P[0]] == [0.0, 1.0, 0.0, 1.0], P[0]\nassert [round(v, 3) for v in P[1]] == [0.841, 0.54, 0.01, 1.0], P[1]\nassert [round(v, 3) for v in P[2]] == [0.909, -0.416, 0.02, 1.0], P[2]\n"
    },
    {
     "label": "One head with identity weights is the notes' attention",
     "type": "assert",
     "code": "I = [[1.0, 0.0], [0.0, 1.0]]\nX = [[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]\nout = multi_head_attention(X, I, I, I, I, 1)\nassert [[round(v, 3) for v in r] for r in out] == [[1.0, 0.0], [0.33, 0.67], [0.752, 0.752]], out\n"
    },
    {
     "label": "Without the mask, every position sees everything",
     "type": "assert",
     "code": "I = [[1.0, 0.0], [0.0, 1.0]]\nX = [[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]]\nout = multi_head_attention(X, I, I, I, I, 1, causal=False)\nassert [round(v, 3) for v in out[0]] == [0.802, 0.599], out\n"
    },
    {
     "label": "Two heads split the columns",
     "type": "assert",
     "code": "I = [[1.0 if r == c else 0.0 for c in range(4)] for r in range(4)]\nX = [[1.0, 0.0, 0.0, 2.0], [0.0, 1.0, 2.0, 0.0]]\nout = multi_head_attention(X, I, I, I, I, 2)\nassert [round(v, 4) for v in out[0]] == [1.0, 0.0, 0.0, 2.0], out\nassert [round(v, 4) for v in out[1]] == [0.3302, 0.6698, 1.8884, 0.1116], out\n"
    },
    {
     "label": "Causal: changing a later token doesn't change earlier outputs",
     "type": "assert",
     "code": "import random\nrng = random.Random(8)\nd = 4\nM = lambda: [[rng.uniform(-1, 1) for _ in range(d)] for _ in range(d)]\nWq, Wk, Wv, Wo = M(), M(), M(), M()\nX = [[rng.uniform(-1, 1) for _ in range(d)] for _ in range(4)]\nY = [r[:] for r in X]; Y[3] = [5.0, -5.0, 5.0, -5.0]\na = multi_head_attention(X, Wq, Wk, Wv, Wo, 2)\nb = multi_head_attention(Y, Wq, Wk, Wv, Wo, 2)\nassert a[:3] == b[:3], \"positions 0-2 must not see position 3\"\nassert a[3] != b[3]\n"
    },
    {
     "label": "n_heads must divide d",
     "type": "raises",
     "call": "multi_head_attention([[1.0, 2.0, 3.0]], [[1.0] * 3] * 3, [[1.0] * 3] * 3, [[1.0] * 3] * 3, [[1.0] * 3] * 3, 2)",
     "error": "ValueError"
    }
   ]
  }
 ],
 "dl6": [
  {
   "id": "bpe",
   "title": "Byte-pair encoding",
   "prompt": "<p>Write the BPE tokenizer from the notes. A word is split into its characters followed by the end-of-word symbol <code>\"&lt;/w&gt;\"</code>.</p>\n<ul>\n<li><code>bpe_train(word_counts, num_merges)</code>: <code>word_counts</code> maps words to their counts. Repeat <code>num_merges</code> times: count every adjacent pair of symbols, weighted by the word counts; choose the most frequent pair, breaking ties by taking the smallest pair in Python's tuple order; and replace every occurrence of it, scanning each word left to right, by the joined symbol. Return the list of merged pairs (tuples) in order. Stop early if no word has two symbols left.</li>\n<li><code>bpe_encode(word, merges)</code>: split the word into characters plus <code>\"&lt;/w&gt;\"</code>, then apply the merges in the order learned, each to the whole word, and return the list of symbols.</li>\n</ul>",
   "starter": "def bpe_train(word_counts, num_merges):\n    pass\n\ndef bpe_encode(word, merges):\n    pass\n",
   "hint": "<p>Represent each word as a tuple of symbols. <code>min(pairs, key=lambda p: (-pairs[p], p))</code> chooses the most frequent pair, smallest first among ties. To merge, walk the tuple with an index: when the pair starts at position <em>i</em>, append the joined symbol and skip two.</p>",
   "solution": "from collections import Counter\n\ndef _merge(seq, pair):\n    out, i = [], 0\n    while i < len(seq):\n        if i + 1 < len(seq) and seq[i] == pair[0] and seq[i + 1] == pair[1]:\n            out.append(seq[i] + seq[i + 1])\n            i += 2\n        else:\n            out.append(seq[i])\n            i += 1\n    return tuple(out)\n\ndef bpe_train(word_counts, num_merges):\n    corpus = {}\n    for w, n in word_counts.items():\n        seq = tuple(w) + (\"</w>\",)\n        corpus[seq] = corpus.get(seq, 0) + n\n    merges = []\n    for _ in range(num_merges):\n        pairs = Counter()\n        for seq, n in corpus.items():\n            for a, b in zip(seq, seq[1:]):\n                pairs[(a, b)] += n\n        if not pairs:\n            break\n        best = min(pairs, key=lambda p: (-pairs[p], p))\n        merges.append(best)\n        new = {}\n        for seq, n in corpus.items():\n            s = _merge(seq, best)\n            new[s] = new.get(s, 0) + n\n        corpus = new\n    return merges\n\ndef bpe_encode(word, merges):\n    seq = tuple(word) + (\"</w>\",)\n    for pair in merges:\n        seq = _merge(seq, pair)\n    return list(seq)\n",
   "tests": [
    {
     "label": "The notes' corpus: first five merges",
     "call": "bpe_train({'low': 5, 'lower': 2, 'newest': 6, 'widest': 3}, 5)",
     "expect": "[('e', 's'), ('es', 't'), ('est', '</w>'), ('l', 'o'), ('lo', 'w')]"
    },
    {
     "label": "Encoding new words",
     "type": "assert",
     "code": "m = bpe_train({'low': 5, 'lower': 2, 'newest': 6, 'widest': 3}, 5)\nassert bpe_encode('lowest', m) == ['low', 'est</w>'], bpe_encode('lowest', m)\nassert bpe_encode('slow', m) == ['s', 'low', '</w>'], bpe_encode('slow', m)\nassert bpe_encode('xyz', m) == ['x', 'y', 'z', '</w>']\n"
    },
    {
     "label": "Counts weight the pairs",
     "call": "bpe_train({'ab': 1, 'cd': 5}, 1)",
     "expect": "[('c', 'd')]"
    },
    {
     "label": "Overlapping pairs merge left to right",
     "type": "assert",
     "code": "m = bpe_train({'aaa': 1}, 1)\nassert m == [('a', 'a')], m\nassert bpe_encode('aaa', m) == ['aa', 'a', '</w>'], bpe_encode('aaa', m)\nassert bpe_encode('aaaa', m) == ['aa', 'aa', '</w>']\n"
    },
    {
     "label": "Stops when every word is one symbol",
     "call": "bpe_train({'ab': 2}, 10)",
     "expect": "[('a', 'b'), ('ab', '</w>')]"
    },
    {
     "label": "A longer run",
     "type": "assert",
     "code": "text = 'the cat sat on the mat the cat ate the hat'.split()\ncounts = {}\nfor w in text:\n    counts[w] = counts.get(w, 0) + 1\nm = bpe_train(counts, 6)\nassert m == [('a', 't'), ('at', '</w>'), ('e', '</w>'), ('h', 'e</w>'), ('t', 'he</w>'), ('c', 'at</w>')], m\nassert bpe_encode('that', m) == ['t', 'h', 'at</w>'], bpe_encode('that', m)\n",
     "hidden": true
    }
   ]
  },
  {
   "id": "contamination",
   "title": "Detecting benchmark contamination",
   "prompt": "<p>Write a simple contamination check of the kind the notes describe: a benchmark item counts as contaminated if it shares at least one word <em>n</em>-gram with the training data.</p>\n<ul>\n<li><code>words(text)</code>: the lowercase words of <code>text</code>, where a word is a maximal run of letters a–z and digits 0–9 (use <code>re.findall(r\"[a-z0-9]+\", text.lower())</code>).</li>\n<li><code>ngrams(text, n)</code>: the set of tuples of <em>n</em> consecutive words.</li>\n<li><code>contaminated(benchmark, training_docs, n)</code>: return the sorted list of indexes of benchmark items (strings) that share an <em>n</em>-gram with any training document. An item with fewer than <em>n</em> words has no <em>n</em>-grams and is never flagged.</li>\n<li><code>clean_score(results, flagged)</code>: <code>results</code> is a list of booleans (whether the model got each item right); return the accuracy over the items whose indexes are not in <code>flagged</code>, or <code>None</code> if none are left.</li>\n</ul>",
   "starter": "import re\n\ndef words(text):\n    pass\n\ndef ngrams(text, n):\n    pass\n\ndef contaminated(benchmark, training_docs, n):\n    pass\n\ndef clean_score(results, flagged):\n    pass\n",
   "hint": "<p>Build one set of all the training documents' <em>n</em>-grams first, then test each item's set against it with <code>&amp;</code> (set intersection). <code>zip(*(ws[i:] for i in range(n)))</code> is one way to list the <em>n</em>-grams of a word list <code>ws</code>.</p>",
   "solution": "import re\n\ndef words(text):\n    return re.findall(r\"[a-z0-9]+\", text.lower())\n\ndef ngrams(text, n):\n    ws = words(text)\n    return {tuple(ws[i:i + n]) for i in range(len(ws) - n + 1)}\n\ndef contaminated(benchmark, training_docs, n):\n    seen = set()\n    for doc in training_docs:\n        seen |= ngrams(doc, n)\n    return sorted(i for i, item in enumerate(benchmark) if ngrams(item, n) & seen)\n\ndef clean_score(results, flagged):\n    flagged = set(flagged)\n    kept = [r for i, r in enumerate(results) if i not in flagged]\n    return sum(kept) / len(kept) if kept else None\n",
   "tests": [
    {
     "label": "Words and n-grams",
     "type": "assert",
     "code": "assert words(\"The Cat's 2 hats!\") == ['the', 'cat', 's', '2', 'hats']\nassert ngrams(\"a b c d\", 3) == {('a', 'b', 'c'), ('b', 'c', 'd')}\nassert ngrams(\"a b\", 3) == set()\n"
    },
    {
     "label": "The notes' example with 4-grams",
     "call": "contaminated(['a quick brown fox jumps over a fence', 'the lazy dog near the river', 'what is the capital of france'], ['the quick brown fox jumps over the lazy dog near the river bank'], 4)",
     "expect": "[0, 1]"
    },
    {
     "label": "Case and punctuation are ignored",
     "call": "contaminated(['Q: What is 2 + 2? A: 4'], ['what is 2 2 a 4 said the page'], 5)",
     "expect": "[0]"
    },
    {
     "label": "Short items and several documents",
     "type": "assert",
     "code": "bench = ['hi there', 'one two three four', 'five six seven eight', 'nine ten eleven twelve']\ndocs = ['zero one two three four', 'eleven twelve thirteen', 'nine ten eleven']\nassert contaminated(bench, docs, 3) == [1, 3], contaminated(bench, docs, 3)\nassert contaminated(bench, docs, 5) == []\n"
    },
    {
     "label": "Clean score",
     "type": "assert",
     "code": "assert clean_score([True, True, False, True], [0, 1]) == 0.5\nassert clean_score([True, False], []) == 0.5\nassert clean_score([True], [0]) is None\n"
    }
   ]
  }
 ]
});
