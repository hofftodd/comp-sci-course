/* Auto-graded programming problems for MATH 230, by lesson. Generated from a Python spec, so every
   string is JSON. Problems use only the standard library (math, random, statistics). */
CSA.addCode("math230", {
 "ps1": [
  {
   "id": "bayes_update",
   "title": "Updating on test results",
   "prompt": "<p>Write <code>posterior(prior, sensitivity, false_positive_rate, positives=1)</code>: the probability of the condition after the given number of independent positive tests, starting from the prior. Use the odds form of Bayes' rule. For the notes' example, <code>posterior(0.01, 0.99, 0.05)</code> is 1/6 and <code>posterior(0.01, 0.99, 0.05, 2)</code> is about 0.798.</p>\n<p>Then write <code>tests_needed(prior, sensitivity, false_positive_rate, target)</code>: the smallest number of positive tests after which the posterior is at least <code>target</code> (0 if the prior already is).</p>",
   "starter": "def posterior(prior, sensitivity, false_positive_rate, positives=1):\n    pass\n\ndef tests_needed(prior, sensitivity, false_positive_rate, target):\n    pass\n",
   "hint": "<p>Odds = p/(1 − p); each positive multiplies the odds by sensitivity / false_positive_rate; convert back with odds/(1 + odds). For <code>tests_needed</code>, count up from 0.</p>",
   "solution": "def posterior(prior, sensitivity, false_positive_rate, positives=1):\n    odds = prior / (1 - prior) * (sensitivity / false_positive_rate) ** positives\n    return odds / (1 + odds)\n\ndef tests_needed(prior, sensitivity, false_positive_rate, target):\n    k = 0\n    while posterior(prior, sensitivity, false_positive_rate, k) < target:\n        k += 1\n    return k\n",
   "tests": [
    {
     "label": "One positive test",
     "type": "assert",
     "code": "import math\nassert math.isclose(posterior(0.01, 0.99, 0.05), 1 / 6), posterior(0.01, 0.99, 0.05)\n"
    },
    {
     "label": "Two positive tests",
     "type": "assert",
     "code": "import math\nassert math.isclose(posterior(0.01, 0.99, 0.05, 2), 0.7983870967741936)\n"
    },
    {
     "label": "Zero tests returns the prior",
     "type": "assert",
     "code": "import math\nassert math.isclose(posterior(0.3, 0.9, 0.1, 0), 0.3)\n"
    },
    {
     "label": "Tests needed for 99%",
     "call": "tests_needed(0.01, 0.99, 0.05, 0.99)",
     "expect": "4"
    },
    {
     "label": "Already above the target",
     "call": "tests_needed(0.95, 0.9, 0.1, 0.9)",
     "expect": "0"
    }
   ]
  },
  {
   "id": "naive_bayes",
   "title": "A naive Bayes spam filter",
   "prompt": "<p>Write <code>train(messages)</code> and <code>classify(model, words)</code>. <code>messages</code> is a list of <code>(words, label)</code> pairs, where <code>words</code> is a set of words and <code>label</code> is <code>\"spam\"</code> or <code>\"ham\"</code>. For each word in the vocabulary (every word seen in training), estimate P(word | spam) as (number of spam messages containing it + 1) / (number of spam messages + 2), and likewise for ham (Laplace smoothing). <code>classify</code> returns the probability that a message with the given set of words is spam, using the prior from the training labels and, for each <em>vocabulary</em> word, the likelihood ratio of its presence if it's in the message or of its absence (1 − P) if it isn't. Ignore words not in the vocabulary. Add logarithms rather than multiplying.</p>",
   "starter": "import math\n\ndef train(messages):\n    pass\n\ndef classify(model, words):\n    pass\n",
   "hint": "<p>Let the model be a dict holding the prior P(spam), and for each vocabulary word the pair (P(w | spam), P(w | ham)). In <code>classify</code>, start with log(prior / (1 − prior)) and add log(ps / ph) for present words and log((1 − ps)/(1 − ph)) for absent ones; finally return 1/(1 + e<sup>−log odds</sup>).</p>",
   "solution": "import math\n\ndef train(messages):\n    spam = [w for w, label in messages if label == \"spam\"]\n    ham = [w for w, label in messages if label == \"ham\"]\n    vocab = set().union(*(w for w, _ in messages))\n    probs = {}\n    for word in vocab:\n        ps = (sum(word in w for w in spam) + 1) / (len(spam) + 2)\n        ph = (sum(word in w for w in ham) + 1) / (len(ham) + 2)\n        probs[word] = (ps, ph)\n    return {\"prior\": len(spam) / len(messages), \"probs\": probs}\n\ndef classify(model, words):\n    p = model[\"prior\"]\n    log_odds = math.log(p / (1 - p))\n    for word, (ps, ph) in model[\"probs\"].items():\n        if word in words:\n            log_odds += math.log(ps / ph)\n        else:\n            log_odds += math.log((1 - ps) / (1 - ph))\n    return 1 / (1 + math.exp(-log_odds))\n",
   "tests": [
    {
     "label": "Learns from a small training set",
     "type": "assert",
     "code": "msgs = [({\"win\", \"free\", \"money\"}, \"spam\"), ({\"free\", \"offer\"}, \"spam\"), ({\"win\", \"prize\"}, \"spam\"),\n        ({\"meeting\", \"today\"}, \"ham\"), ({\"lunch\", \"today\"}, \"ham\"), ({\"free\", \"lunch\"}, \"ham\")]\nm = train(msgs)\nassert m[\"prior\"] == 0.5\nassert abs(m[\"probs\"][\"free\"][0] - 3 / 5) < 1e-12 and abs(m[\"probs\"][\"free\"][1] - 2 / 5) < 1e-12, m[\"probs\"][\"free\"]\nassert classify(m, {\"win\", \"money\"}) > 0.9\nassert classify(m, {\"meeting\", \"today\"}) < 0.1\n"
    },
    {
     "label": "Exact probability",
     "type": "assert",
     "code": "import math\nmsgs = [({\"a\"}, \"spam\"), ({\"b\"}, \"ham\")]\nm = train(msgs)\n# P(a|spam) = 2/3, P(a|ham) = 1/3; P(b|spam) = 1/3, P(b|ham) = 2/3; prior 1/2\nodds = (2/3) / (1/3) * (1 - 1/3) / (1 - 2/3)\nassert math.isclose(classify(m, {\"a\"}), odds / (1 + odds)), classify(m, {\"a\"})\n"
    },
    {
     "label": "Unknown words are ignored",
     "type": "assert",
     "code": "import math\nmsgs = [({\"a\"}, \"spam\"), ({\"b\"}, \"ham\")]\nm = train(msgs)\nassert math.isclose(classify(m, {\"a\", \"zzz\"}), classify(m, {\"a\"}))\n"
    },
    {
     "label": "Many words don't underflow",
     "type": "assert",
     "code": "words = {f\"w{i}\" for i in range(2000)}\nmsgs = [(words, \"spam\"), ({\"x\"}, \"ham\")]\nm = train(msgs)\np = classify(m, words)\nassert 0.999 < p <= 1.0, p\n"
    }
   ]
  }
 ],
 "ps2": [
  {
   "id": "poisson_tools",
   "title": "Poisson and binomial probabilities",
   "prompt": "<p>Write <code>binomial_pmf(n, p, k)</code>, <code>poisson_pmf(lam, k)</code> and <code>poisson_at_least(lam, k)</code> (the probability of <em>k</em> or more events), using <code>math.comb</code>, <code>math.exp</code> and <code>math.factorial</code>. Then write <code>capacity_needed(lam, risk)</code>: the smallest capacity <em>c</em> such that a Poisson(λ) count exceeds <em>c</em> with probability at most <code>risk</code>.</p>",
   "starter": "import math\n\ndef binomial_pmf(n, p, k):\n    pass\n\ndef poisson_pmf(lam, k):\n    pass\n\ndef poisson_at_least(lam, k):\n    pass\n\ndef capacity_needed(lam, risk):\n    pass\n",
   "hint": "<p>P(at least <em>k</em>) = 1 − (P(0) + … + P(<em>k</em> − 1)). For the capacity, increase <em>c</em> from 0 until P(count &gt; <em>c</em>) = P(at least <em>c</em> + 1) is at most the risk.</p>",
   "solution": "import math\n\ndef binomial_pmf(n, p, k):\n    return math.comb(n, k) * p ** k * (1 - p) ** (n - k)\n\ndef poisson_pmf(lam, k):\n    return math.exp(-lam) * lam ** k / math.factorial(k)\n\ndef poisson_at_least(lam, k):\n    return 1 - sum(poisson_pmf(lam, j) for j in range(k))\n\ndef capacity_needed(lam, risk):\n    c = 0\n    while poisson_at_least(lam, c + 1) > risk:\n        c += 1\n    return c\n",
   "tests": [
    {
     "label": "Binomial",
     "type": "assert",
     "code": "import math\nassert math.isclose(binomial_pmf(1000, 0.002, 2), 0.2709, abs_tol=1e-4)\nassert binomial_pmf(5, 0.5, 0) == 1 / 32\n"
    },
    {
     "label": "Poisson",
     "type": "assert",
     "code": "import math\nassert math.isclose(poisson_pmf(2, 2), 0.2707, abs_tol=1e-4)\nassert math.isclose(poisson_pmf(3, 0), math.exp(-3))\n"
    },
    {
     "label": "At least six requests",
     "type": "assert",
     "code": "import math\nassert math.isclose(poisson_at_least(3, 6), 0.0839179, abs_tol=1e-6), poisson_at_least(3, 6)\nassert poisson_at_least(3, 0) == 1\n"
    },
    {
     "label": "Capacity planning",
     "type": "assert",
     "code": "assert capacity_needed(3, 0.01) == 8, capacity_needed(3, 0.01)\nassert capacity_needed(3, 0.1) == 5\n"
    }
   ]
  }
 ],
 "ps3": [
  {
   "id": "normal_tools",
   "title": "Normal probabilities from erf",
   "prompt": "<p>Without the <code>statistics</code> module, write <code>normal_cdf(x, mu=0, sigma=1)</code> using <code>math.erf</code>, with the formula Φ(<em>z</em>) = (1 + erf(<em>z</em>/√2))/2 for the standard normal (the error function erf and this formula are explained in the notes), and <code>normal_between(a, b, mu=0, sigma=1)</code>. Then write <code>normal_quantile(q, mu=0, sigma=1)</code> that finds <em>x</em> with <code>normal_cdf(x, mu, sigma) == q</code> (to within 1e-9) by bisection (MATH 130 Lesson 4), searching between μ − 10σ and μ + 10σ.</p>",
   "starter": "import math\n\ndef normal_cdf(x, mu=0, sigma=1):\n    pass\n\ndef normal_between(a, b, mu=0, sigma=1):\n    pass\n\ndef normal_quantile(q, mu=0, sigma=1):\n    pass\n",
   "hint": "<p>Standardize first: <em>z</em> = (<em>x</em> − μ)/σ. For the quantile, the CDF is increasing, so if <code>normal_cdf(mid) &lt; q</code> the answer is to the right of <code>mid</code>.</p>",
   "solution": "import math\n\ndef normal_cdf(x, mu=0, sigma=1):\n    z = (x - mu) / sigma\n    return (1 + math.erf(z / math.sqrt(2))) / 2\n\ndef normal_between(a, b, mu=0, sigma=1):\n    return normal_cdf(b, mu, sigma) - normal_cdf(a, mu, sigma)\n\ndef normal_quantile(q, mu=0, sigma=1):\n    lo, hi = mu - 10 * sigma, mu + 10 * sigma\n    while hi - lo > 1e-12 * max(1, sigma):\n        mid = (lo + hi) / 2\n        if normal_cdf(mid, mu, sigma) < q:\n            lo = mid\n        else:\n            hi = mid\n    return (lo + hi) / 2\n",
   "tests": [
    {
     "label": "68–95–99.7",
     "type": "assert",
     "code": "import math\nassert math.isclose(normal_between(-1, 1), 0.6826894921370859, rel_tol=1e-9)\nassert math.isclose(normal_between(-2, 2), 0.9544997361036416, rel_tol=1e-9)\n"
    },
    {
     "label": "IQ above 130",
     "type": "assert",
     "code": "import math\nassert math.isclose(1 - normal_cdf(130, 100, 15), 0.02275013194817921, rel_tol=1e-9)\n"
    },
    {
     "label": "The 97.5th percentile is 1.96",
     "type": "assert",
     "code": "import math\nassert math.isclose(normal_quantile(0.975), 1.959963984540054, abs_tol=1e-8), normal_quantile(0.975)\n"
    },
    {
     "label": "Quantile with mu and sigma",
     "type": "assert",
     "code": "import math\nassert math.isclose(normal_quantile(0.99, 1.2, 0.3), 1.8979043622, abs_tol=1e-6)\n"
    },
    {
     "label": "Doesn't use statistics",
     "type": "source",
     "code": "assert \"statistics\" not in __source__ and \"NormalDist\" not in __source__, \"Use math.erf.\"\n"
    }
   ]
  }
 ],
 "ps4": [
  {
   "id": "cov_corr",
   "title": "Covariance and correlation",
   "prompt": "<p>Without the <code>statistics</code> module, write <code>covariance(xs, ys)</code> and <code>correlation(xs, ys)</code>: the sample covariance and sample correlation of two lists of data, as defined in the notes (dividing by <em>n</em> − 1). Then write <code>joint_summary(table)</code> for a joint distribution of two 0/1 variables given as a dict <code>{(x, y): probability}</code>; it returns <code>(cov, independent)</code>, where <code>cov</code> is Cov(X, Y) computed from the probabilities and <code>independent</code> is <code>True</code> if every joint probability equals the product of the marginals (to within 1e-12).</p>",
   "starter": "import math\n\ndef covariance(xs, ys):\n    pass\n\ndef correlation(xs, ys):\n    pass\n\ndef joint_summary(table):\n    pass\n",
   "hint": "<p>For the table: P(X = 1) is the sum over keys with x = 1; E[XY] = P(X = 1, Y = 1) (use <code>table.get((1, 1), 0)</code>). Then Cov = E[XY] − E[X]E[Y].</p>",
   "solution": "import math\n\ndef covariance(xs, ys):\n    n = len(xs)\n    mx, my = sum(xs) / n, sum(ys) / n\n    return sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / (n - 1)\n\ndef correlation(xs, ys):\n    return covariance(xs, ys) / math.sqrt(covariance(xs, xs) * covariance(ys, ys))\n\ndef joint_summary(table):\n    px = {v: sum(p for (x, y), p in table.items() if x == v) for v in (0, 1)}\n    py = {v: sum(p for (x, y), p in table.items() if y == v) for v in (0, 1)}\n    cov = table.get((1, 1), 0) - px[1] * py[1]\n    independent = all(abs(table.get((x, y), 0) - px[x] * py[y]) < 1e-12 for x in (0, 1) for y in (0, 1))\n    return cov, independent\n",
   "tests": [
    {
     "label": "The notes' study data",
     "type": "assert",
     "code": "import math\nh = [1, 2, 3, 4, 5, 6]; s = [52, 58, 61, 70, 74, 81]\nassert math.isclose(covariance(h, s), 20.2), covariance(h, s)\nassert math.isclose(correlation(h, s), 0.9939770192363483)\n"
    },
    {
     "label": "Perfect negative correlation",
     "type": "assert",
     "code": "import math\nassert math.isclose(correlation([1, 2, 3], [9, 6, 3]), -1)\n"
    },
    {
     "label": "The testers' table",
     "type": "assert",
     "code": "import math\ncov, ind = joint_summary({(0, 0): 0.5, (0, 1): 0.1, (1, 0): 0.2, (1, 1): 0.2})\nassert math.isclose(cov, 0.08) and ind is False, (cov, ind)\n"
    },
    {
     "label": "An independent table",
     "type": "assert",
     "code": "import math\ncov, ind = joint_summary({(0, 0): 0.42, (0, 1): 0.18, (1, 0): 0.28, (1, 1): 0.12})\nassert abs(cov) < 1e-12 and ind is True, (cov, ind)\n"
    },
    {
     "label": "Doesn't use statistics",
     "type": "source",
     "code": "assert \"statistics\" not in __source__, \"Compute these yourself.\"\n"
    }
   ]
  }
 ],
 "ps5": [
  {
   "id": "monte_carlo_pi",
   "title": "Monte Carlo with an error estimate",
   "prompt": "<p>Write <code>estimate_pi(n, seed)</code> that creates <code>rng = random.Random(seed)</code>, draws <em>n</em> points with <code>rng.random()</code> for <em>x</em> and then <em>y</em>, and returns <code>(estimate, std_error)</code>: 4 × (fraction with <em>x</em>² + <em>y</em>² ≤ 1), and its standard error 4√(<em>p̂</em>(1 − <em>p̂</em>)/<em>n</em>), where <em>p̂</em> is that fraction. Then write <code>samples_for(margin, p=math.pi / 4)</code>: the number of points needed so that 1.96 standard errors of the π estimate is at most <code>margin</code> (round up).</p>",
   "starter": "import math, random\n\ndef estimate_pi(n, seed):\n    pass\n\ndef samples_for(margin, p=math.pi / 4):\n    pass\n",
   "hint": "<p>Solve 1.96 × 4√(<em>p</em>(1 − <em>p</em>)/<em>n</em>) ≤ margin for <em>n</em>, and use <code>math.ceil</code>.</p>",
   "solution": "import math, random\n\ndef estimate_pi(n, seed):\n    rng = random.Random(seed)\n    inside = 0\n    for _ in range(n):\n        x = rng.random()\n        y = rng.random()\n        if x * x + y * y <= 1:\n            inside += 1\n    p = inside / n\n    return 4 * p, 4 * math.sqrt(p * (1 - p) / n)\n\ndef samples_for(margin, p=math.pi / 4):\n    return math.ceil((1.96 * 4 / margin) ** 2 * p * (1 - p))\n",
   "tests": [
    {
     "label": "Reproducible with a seed",
     "type": "assert",
     "code": "a = estimate_pi(10000, 1)\nb = estimate_pi(10000, 1)\nassert a == b, \"the same seed should give the same result\"\n"
    },
    {
     "label": "Estimate within its error bars",
     "type": "assert",
     "code": "import math\nest, se = estimate_pi(200000, 7)\nassert abs(est - math.pi) < 4 * se, (est, se)\nassert 0.003 < se < 0.005, se\n"
    },
    {
     "label": "Standard error formula",
     "type": "assert",
     "code": "import math, random\nrng = random.Random(3)\ninside = sum(rng.random() ** 2 + rng.random() ** 2 <= 1 for _ in range(1000))\nest, se = estimate_pi(1000, 3)\np = inside / 1000\nassert math.isclose(est, 4 * p) and math.isclose(se, 4 * math.sqrt(p * (1 - p) / 1000)), (est, se)\n"
    },
    {
     "label": "Points needed",
     "type": "assert",
     "code": "assert samples_for(0.001) == 10359898, samples_for(0.001)\nassert samples_for(0.01) == 103599\n"
    }
   ]
  }
 ],
 "ps6": [
  {
   "id": "intervals",
   "title": "Confidence and bootstrap intervals",
   "prompt": "<p>Write <code>mean_ci(xs, z=1.96)</code> returning the interval <em>x̄</em> ± z·<em>s</em>/√<em>n</em> as a tuple, with <em>s</em> the sample standard deviation (divide by <em>n</em> − 1). Then write <code>bootstrap_ci(xs, stat, b=2000, seed=0)</code>: with <code>rng = random.Random(seed)</code>, draw <em>b</em> resamples of size <em>n</em> with <code>rng.choices(xs, k=len(xs))</code>, apply <code>stat</code> to each, sort the results, and return the values at positions ⌊0.025<em>b</em>⌋ and ⌊0.975<em>b</em>⌋ − 1.</p>",
   "starter": "import math, random, statistics\n\ndef mean_ci(xs, z=1.96):\n    pass\n\ndef bootstrap_ci(xs, stat, b=2000, seed=0):\n    pass\n",
   "hint": "<p><code>statistics.mean</code> and <code>statistics.stdev</code> do the first part. For the second, <code>sorted(stat(rng.choices(xs, k=n)) for _ in range(b))</code>, then index with <code>int(0.025 * b)</code> and <code>int(0.975 * b) - 1</code>.</p>",
   "solution": "import math, random, statistics\n\ndef mean_ci(xs, z=1.96):\n    m = statistics.mean(xs)\n    half = z * statistics.stdev(xs) / math.sqrt(len(xs))\n    return (m - half, m + half)\n\ndef bootstrap_ci(xs, stat, b=2000, seed=0):\n    rng = random.Random(seed)\n    vals = sorted(stat(rng.choices(xs, k=len(xs))) for _ in range(b))\n    return (vals[int(0.025 * b)], vals[int(0.975 * b) - 1])\n",
   "tests": [
    {
     "label": "The notes' load times",
     "type": "assert",
     "code": "import math\nlo, hi = mean_ci([1.2, 0.9, 1.5, 1.1, 1.3, 0.8, 1.6, 1.0, 1.2, 1.4])\nassert math.isclose(lo, 1.0399666701381656) and math.isclose(hi, 1.3600333298618343), (lo, hi)\n"
    },
    {
     "label": "t value for small samples",
     "type": "assert",
     "code": "import math\nlo, hi = mean_ci([1.2, 0.9, 1.5, 1.1, 1.3, 0.8, 1.6, 1.0, 1.2, 1.4], z=2.262)\nassert math.isclose(lo, 1.0153084733941484) and math.isclose(hi, 1.3846915266058515)\n"
    },
    {
     "label": "Bootstrap is reproducible and sensible",
     "type": "assert",
     "code": "import statistics, random\nxs = [1.2, 0.9, 1.5, 1.1, 1.3, 0.8, 1.6, 1.0, 1.2, 1.4]\na = bootstrap_ci(xs, statistics.mean, 2000, 1)\nassert a == bootstrap_ci(xs, statistics.mean, 2000, 1), \"same seed, same answer\"\nassert 1.0 < a[0] < 1.12 and 1.28 < a[1] < 1.4, a\nrng = random.Random(1)\nvals = sorted(statistics.mean(rng.choices(xs, k=10)) for _ in range(2000))\nassert a == (vals[50], vals[1949]), \"use rng.choices exactly as described\"\n"
    },
    {
     "label": "Works for the median",
     "type": "assert",
     "code": "import statistics\nlo, hi = bootstrap_ci([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5], statistics.median, 1000, 2)\nassert lo <= statistics.median([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]) <= hi and lo < hi\n"
    }
   ]
  }
 ],
 "ps7": [
  {
   "id": "ab_test",
   "title": "Analyzing an A/B test",
   "prompt": "<p>Write <code>two_proportion_z(k1, n1, k2, n2)</code> that returns <code>(z, p_value)</code> for the difference between proportions <em>k</em><sub>2</sub>/<em>n</em><sub>2</sub> and <em>k</em><sub>1</sub>/<em>n</em><sub>1</sub>, using the pooled standard error from the notes and a <em>two-sided</em> p-value (both directions, as defined in the notes) from the normal distribution (<code>statistics.NormalDist</code> is fine). Then write <code>sample_size(p1, p2)</code>: visitors per group to detect a change from <em>p</em><sub>1</sub> to <em>p</em><sub>2</sub> at α = 0.05 with 80% power, using the formula derived in the notes, with 0.8416 (the 80th percentile of the standard normal) in place of 0.84: (1.96 + 0.8416)² (<em>p</em><sub>1</sub>(1 − <em>p</em><sub>1</sub>) + <em>p</em><sub>2</sub>(1 − <em>p</em><sub>2</sub>)) / (<em>p</em><sub>2</sub> − <em>p</em><sub>1</sub>)², rounded up.</p>",
   "starter": "import math\nfrom statistics import NormalDist\n\ndef two_proportion_z(k1, n1, k2, n2):\n    pass\n\ndef sample_size(p1, p2):\n    pass\n",
   "hint": "<p>Pooled <em>p</em> = (<em>k</em><sub>1</sub> + <em>k</em><sub>2</sub>)/(<em>n</em><sub>1</sub> + <em>n</em><sub>2</sub>); standard error √(<em>p</em>(1 − <em>p</em>)(1/<em>n</em><sub>1</sub> + 1/<em>n</em><sub>2</sub>)). The two-sided p-value is 2(1 − Φ(|<em>z</em>|)).</p>",
   "solution": "import math\nfrom statistics import NormalDist\n\ndef two_proportion_z(k1, n1, k2, n2):\n    p = (k1 + k2) / (n1 + n2)\n    se = math.sqrt(p * (1 - p) * (1 / n1 + 1 / n2))\n    z = (k2 / n2 - k1 / n1) / se\n    return z, 2 * (1 - NormalDist().cdf(abs(z)))\n\ndef sample_size(p1, p2):\n    return math.ceil((1.96 + 0.8416) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2)) / (p2 - p1) ** 2)\n",
   "tests": [
    {
     "label": "The notes' test",
     "type": "assert",
     "code": "import math\nz, p = two_proportion_z(100, 1000, 125, 1000)\nassert math.isclose(z, 1.7691496414475838, rel_tol=1e-9) and math.isclose(p, 0.0768689055156897, rel_tol=1e-6), (z, p)\n"
    },
    {
     "label": "Twice the data",
     "type": "assert",
     "code": "import math\nz, p = two_proportion_z(200, 2000, 250, 2000)\nassert math.isclose(z, 2.5019, abs_tol=1e-3) and math.isclose(p, 0.01235, abs_tol=1e-4), (z, p)\n"
    },
    {
     "label": "Direction doesn't change the p-value",
     "type": "assert",
     "code": "import math\nz1, p1 = two_proportion_z(100, 1000, 125, 1000)\nz2, p2 = two_proportion_z(125, 1000, 100, 1000)\nassert math.isclose(z1, -z2) and math.isclose(p1, p2)\n"
    },
    {
     "label": "Sample sizes",
     "type": "assert",
     "code": "assert sample_size(0.10, 0.125) == 2504, sample_size(0.10, 0.125)\nassert sample_size(0.05, 0.06) == 8156, sample_size(0.05, 0.06)\n"
    }
   ]
  },
  {
   "id": "permutation_test",
   "title": "A permutation test",
   "prompt": "<p>Write <code>permutation_p(a, b, trials=10000, seed=0)</code> for two lists of numbers: the two-sided p-value for the difference in their means. With <code>rng = random.Random(seed)</code>, pool the values, and for each trial <code>rng.shuffle</code> the pool, split it into the first <code>len(a)</code> values and the rest, and count the trials where |mean(second part) − mean(first part)| ≥ |mean(b) − mean(a)| − 1e-12. Return count / trials.</p>",
   "starter": "import random\n\ndef permutation_p(a, b, trials=10000, seed=0):\n    pass\n",
   "hint": "<p>Copy the pool with <code>a + b</code> so you don't modify the inputs. Compute the observed difference once before the loop.</p>",
   "solution": "import random\n\ndef permutation_p(a, b, trials=10000, seed=0):\n    rng = random.Random(seed)\n    pool = a + b\n    na = len(a)\n    observed = abs(sum(b) / len(b) - sum(a) / na)\n    count = 0\n    for _ in range(trials):\n        rng.shuffle(pool)\n        diff = abs(sum(pool[na:]) / len(b) - sum(pool[:na]) / na)\n        if diff >= observed - 1e-12:\n            count += 1\n    return count / trials\n",
   "tests": [
    {
     "label": "Clearly different groups",
     "type": "assert",
     "code": "p = permutation_p([1, 2, 3, 2, 1, 2], [8, 9, 7, 8, 9, 10], 2000, 1)\nassert p < 0.01, p\n"
    },
    {
     "label": "Identical groups give p = 1",
     "call": "permutation_p([5, 5, 5], [5, 5, 5], 200, 1)",
     "expect": "1.0"
    },
    {
     "label": "Matches the notes' A/B test",
     "type": "assert",
     "limit": 15,
     "code": "a = [1] * 100 + [0] * 900\nb = [1] * 125 + [0] * 875\np = permutation_p(a, b, 4000, 1)\nassert 0.06 < p < 0.12, p\n"
    },
    {
     "label": "Doesn't change the inputs",
     "type": "assert",
     "code": "a, b = [1, 2], [3, 4]\npermutation_p(a, b, 50, 0)\nassert a == [1, 2] and b == [3, 4]\n"
    }
   ]
  }
 ],
 "ps8": [
  {
   "id": "regression",
   "title": "Regression and held-out error",
   "prompt": "<p>Without <code>statistics.linear_regression</code>, write <code>fit(xs, ys)</code> returning <code>(intercept, slope)</code> from slope = Cov/Var and intercept = <em>ȳ</em> − slope · <em>x̄</em>, and <code>r_squared(xs, ys, intercept, slope)</code> using 1 − (sum of squared residuals)/(total sum of squares). Then write <code>train_test_mse(xs, ys, n_train)</code>: fit on the first <code>n_train</code> points and return <code>(train_mse, test_mse)</code>, the mean squared prediction errors on the training points and on the remaining points.</p>",
   "starter": "def fit(xs, ys):\n    pass\n\ndef r_squared(xs, ys, intercept, slope):\n    pass\n\ndef train_test_mse(xs, ys, n_train):\n    pass\n",
   "hint": "<p>The (<em>n</em> − 1) denominators cancel in Cov/Var, so you can use sums of products of deviations directly.</p>",
   "solution": "def fit(xs, ys):\n    n = len(xs)\n    mx, my = sum(xs) / n, sum(ys) / n\n    sxy = sum((x - mx) * (y - my) for x, y in zip(xs, ys))\n    sxx = sum((x - mx) ** 2 for x in xs)\n    slope = sxy / sxx\n    return my - slope * mx, slope\n\ndef r_squared(xs, ys, intercept, slope):\n    my = sum(ys) / len(ys)\n    ss_res = sum((y - (intercept + slope * x)) ** 2 for x, y in zip(xs, ys))\n    ss_tot = sum((y - my) ** 2 for y in ys)\n    return 1 - ss_res / ss_tot\n\ndef train_test_mse(xs, ys, n_train):\n    a, b = fit(xs[:n_train], ys[:n_train])\n    mse = lambda X, Y: sum((y - (a + b * x)) ** 2 for x, y in zip(X, Y)) / len(X)\n    return mse(xs[:n_train], ys[:n_train]), mse(xs[n_train:], ys[n_train:])\n",
   "tests": [
    {
     "label": "The notes' study data",
     "type": "assert",
     "code": "import math\na, b = fit([1, 2, 3, 4, 5, 6], [52, 58, 61, 70, 74, 81])\nassert math.isclose(a, 45.8) and math.isclose(b, 5.771428571428571), (a, b)\nassert math.isclose(r_squared([1, 2, 3, 4, 5, 6], [52, 58, 61, 70, 74, 81], a, b), 0.9879903147699759)\n"
    },
    {
     "label": "A perfect line",
     "type": "assert",
     "code": "import math\na, b = fit([0, 1, 2], [1, 3, 5])\nassert math.isclose(a, 1) and math.isclose(b, 2) and math.isclose(r_squared([0, 1, 2], [1, 3, 5], a, b), 1)\n"
    },
    {
     "label": "Train and test errors",
     "type": "assert",
     "code": "import math\nxs = [0, 1, 2, 3, 4, 5]\nys = [1, 3, 5, 7, 20, 30]\ntr, te = train_test_mse(xs, ys, 4)\nassert math.isclose(tr, 0, abs_tol=1e-12), tr\nassert math.isclose(te, ((20 - 9) ** 2 + (30 - 11) ** 2) / 2), te\n"
    },
    {
     "label": "Doesn't use linear_regression",
     "type": "source",
     "code": "assert \"linear_regression\" not in __source__, \"Compute the fit yourself.\"\n"
    }
   ]
  }
 ]
});
