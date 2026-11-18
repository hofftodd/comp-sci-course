CSA.addCourse({
  id: "math230",
  code: "MATH 230",
  title: "Probability and Statistics for Computer Science",
  credits: 4,
  kind: "required",
  term: "y2f",
  summary: "Reasoning about uncertainty and learning from data: Bayes' rule in practice, the standard discrete and continuous distributions, joint distributions and correlation, the law of large numbers and the central limit theorem, estimation and confidence intervals, hypothesis tests and A/B testing, and regression. Every idea is checked by simulation in Python.",
  prereqs: ["MATH 121 Discrete Mathematics II", "MATH 131 Calculus II and Multivariable Calculus"],
  outcomes: [
    "Apply Bayes' rule correctly, including in the presence of low base rates",
    "Model situations with binomial, geometric, Poisson, uniform, exponential and normal distributions",
    "Compute and interpret expectations, variances, covariances and correlations",
    "Explain the law of large numbers and the central limit theorem, and use them to size simulations and samples",
    "Estimate parameters, construct confidence intervals and bootstrap intervals, and interpret them correctly",
    "Design and analyze an A/B test, and recognize misuse of p-values",
    "Fit and evaluate linear regression models, and distinguish correlation from causation"
  ],
  rubric: {
    criteriaFor: "problem sets and the data project",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 25, desc: "Weekly: the lesson's practice problems with full reasoning, plus its programming problems, including at least one simulation that checks a calculation." },
      { name: "Data project", weight: 20, desc: "Pose a question about a public dataset, analyze it with methods from the course (an interval, a test, a regression), and report in 4–6 pages what the data does and does not show." },
      { name: "Midterm exam", weight: 20, desc: "Bayes, distributions, joint distributions and limit theorems (lessons 1–5)." },
      { name: "Final exam", weight: 25, desc: "Cumulative, with emphasis on estimation, testing and regression (lessons 6–8)." }
    ],
    criteria: [
      { name: "Modeling", desc: "Is the right model chosen?", levels: [
        "Chooses an appropriate model and states its assumptions (independence, distribution) and whether they are plausible.",
        "Appropriate model with an assumption unstated.",
        "A model that doesn't fit the situation.",
        "No model." ] },
      { name: "Computation", desc: "Are the numbers right?", levels: [
        "Correct, with a check by simulation or a second method.",
        "Minor slips.",
        "Errors in method.",
        "Mostly incorrect." ] },
      { name: "Interpretation", desc: "Does it say what the result means, and doesn't?", levels: [
        "States conclusions precisely, with uncertainty, and avoids overclaiming (no causation from correlation, no \"probability the hypothesis is true\" from a p-value).",
        "Mostly careful, with one overstatement.",
        "Several misinterpretations.",
        "No interpretation." ] },
      { name: "Communication", desc: "Can a reader follow it?", levels: [
        "Clear, with labeled plots and defined notation.",
        "Mostly clear.",
        "Hard to follow.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Show your work:</b> answers need reasoning; a simulation alone doesn't replace a calculation unless the problem says so.",
      "<b>Software:</b> Python's <code>random</code> and <code>statistics</code> modules are enough for the course, except for one practice problem in Lesson 8 that uses NumPy (introduced at the end of MATH 220 Lesson 1). NumPy and pandas are welcome for the project.",
      "<b>Collaboration and AI:</b> discuss freely; write your own solutions and name collaborators. Say how you used any AI tool, and check every number it gives you.",
      "<b>Late work:</b> problem sets are accepted up to two days late for 80% credit."
    ]
  },
  units: [
    {
      id: "ps1",
      title: "Bayes' rule in practice",
      minutes: 90,
      summary: "Bayes' rule applied to real decisions: why a positive result from an accurate test often means little when the condition is rare, the odds form of Bayes' rule for updating on several pieces of evidence, and a naive Bayes spam filter.",
      notes: `
<p>MATH 121 Lesson 6 introduced conditional probability and Bayes' rule. This lesson uses it the way computer scientists do: to update beliefs from evidence, in medical tests, security alerts and spam filters. The arithmetic is short; the hard part is setting it up correctly, because human intuition gets these problems badly wrong.</p>

<h3>Recap</h3>
<p>For events <em>H</em> (a hypothesis) and <em>E</em> (evidence) with P(<em>E</em>) &gt; 0:</p>
<p class="math">P(H | E) = P(E | H) · P(H) / P(E),   where   P(E) = P(E | H)P(H) + P(E | not H)P(not H)</p>
<p>P(<em>H</em>) is the <strong>prior</strong>, our belief before the evidence; P(<em>H</em> | <em>E</em>) is the <strong>posterior</strong>, after it; P(<em>E</em> | <em>H</em>) is the <strong>likelihood</strong> of the evidence if <em>H</em> is true.</p>

<h3>The base-rate fallacy</h3>
<p>A disease affects 1% of people. A test for it is 99% <em>sensitive</em> (it detects 99% of people who have the disease) and has a 5% false-positive rate (5% of healthy people test positive). You test positive. How likely is it that you have the disease?</p>
<p>Many people, including many doctors in published surveys, answer "about 95%" or "99%". Bayes' rule says:</p>
<p class="math">P(D | +) = 0.99 × 0.01 / (0.99 × 0.01 + 0.05 × 0.99) = 0.0099 / 0.0594 ≈ 0.167</p>
<p>Only about 17%. The calculation is clearest with counts. Imagine 10,000 people: 100 have the disease, and 99 of them test positive. Of the 9,900 who don't, 5% (495) also test positive. So of the 594 positive results, only 99 are real: 1 in 6. The test is accurate, but the disease is so rare that false alarms from the large healthy group outnumber the true detections. Ignoring the prior is called the <strong>base-rate fallacy</strong>.</p>
<p>A second, independent positive test changes things: now the prior is 0.167, and the same calculation gives about 0.80. Evidence accumulates.</p>
<p>The same arithmetic governs every detection system for rare events: fraud detectors, intrusion detection in networks, face recognition scanning crowds for a few wanted people, and content moderation. A system with a 1% false-positive rate, checking a million innocent cases, raises 10,000 false alarms. Whether its alerts mean anything depends on the base rate as much as on its accuracy.</p>

<h3>The odds form</h3>
<p>For repeated updating, Bayes' rule is simplest in terms of <strong>odds</strong>: the odds of <em>H</em> are P(<em>H</em>)/P(not <em>H</em>). Dividing Bayes' rule for <em>H</em> by Bayes' rule for "not <em>H</em>", P(<em>E</em>) cancels:</p>
<p class="math">posterior odds = prior odds × likelihood ratio,   likelihood ratio = P(E | H) / P(E | not H)</p>
<p>In the example, the prior odds are 1 : 99, and a positive test has likelihood ratio 0.99/0.05 = 19.8. The posterior odds are 19.8 : 99, that is 1 : 5, a probability of 1/6. A second independent positive multiplies the odds by 19.8 again: 19.8 × 19.8 : 99 ≈ 3.96 : 1, a probability of about 0.80. Each independent piece of evidence multiplies the odds by its likelihood ratio; equivalently, it <em>adds</em> the logarithm of its ratio. A likelihood ratio above 1 is evidence for <em>H</em>; below 1, evidence against.</p>

<h3>Naive Bayes classification</h3>
<p>A spam filter must decide whether an email is spam from the words it contains. Treat each word as a piece of evidence. The <strong>naive Bayes</strong> classifier makes one simplifying ("naive") assumption: given the class (spam or not), the words appear independently of one another. Then the odds form applies word by word:</p>
<p class="math">odds(spam | words) = odds(spam) × Π<sub>w</sub> P(w | spam) / P(w | ham)</p>
<p>The symbol Π (capital pi) means a product, just as Σ means a sum: Π<sub><em>w</em></sub> multiplies the ratio for every word <em>w</em> in the email. ("Ham" is the traditional name for legitimate email.) The probabilities are estimated by counting in a set of emails already labeled. Suppose 40% of training emails are spam, and:</p>
<table>
<thead><tr><th>Word</th><th>Fraction of spam containing it</th><th>Fraction of ham containing it</th><th>Likelihood ratio</th></tr></thead>
<tbody>
<tr><td>"winner"</td><td>0.20</td><td>0.01</td><td>20</td></tr>
<tr><td>"meeting"</td><td>0.02</td><td>0.10</td><td>0.2</td></tr>
<tr><td>"free"</td><td>0.30</td><td>0.06</td><td>5</td></tr>
</tbody>
</table>
<p>An email containing "winner" and "free" has odds 0.4/0.6 × 20 × 5 = 66.7: probability 66.7/67.7 ≈ 0.985 of being spam. One containing "free" and "meeting" has odds 0.667 × 5 × 0.2 = 0.667, the same as the prior: the words cancel out.</p>
<p>These calculations use only the words that are present. A word's <em>absence</em> is evidence too. If 20% of spam contains "winner", then 80% doesn't, against 99% of ham, so an email <em>without</em> "winner" has likelihood ratio (1 − 0.20)/(1 − 0.01) = 0.80/0.99 ≈ 0.81 for that word: weak evidence against spam. A fuller filter multiplies in a ratio for every word in its vocabulary, P(<em>w</em> | spam)/P(<em>w</em> | ham) if the word is present and (1 − P(<em>w</em> | spam))/(1 − P(<em>w</em> | ham)) if it is absent. This lesson's programming problem does that.</p>
<p>Two practical details. A word never seen in spam during training would get probability 0 and veto everything else, so counts are <strong>smoothed</strong>: add 1 to every count (<strong>Laplace smoothing</strong>). Here each spam message either contains the word or doesn't, so there are two counts, and adding 1 to each adds 2 to the total: if <em>c</em> of the <em>s</em> spam messages contain the word, the estimate of P(word | spam) becomes (<em>c</em> + 1)/(<em>s</em> + 2) instead of <em>c</em>/<em>s</em>. It is as if two extra spam messages had been seen, one with the word and one without, so no estimate is ever exactly 0 or 1.</p>
<p>Second, multiplying hundreds of small probabilities <strong>underflows</strong>. A float can't hold a positive number smaller than about 5 × 10<sup>−324</sup> (CS 210 Lesson 2 shows how floats are stored and where their range ends), and a result below that is rounded to exactly 0. In Python, <code>0.01 ** 200</code> should be 10<sup>−400</sup> but prints <code>0.0</code>, and then every class has probability 0. So implementations add logarithms instead: log(<em>ab</em>) = log <em>a</em> + log <em>b</em>, and a sum of a few hundred logarithms such as log 0.01 ≈ −4.6 is an ordinary number. The independence assumption is plainly false ("free" and "winner" go together), yet naive Bayes works surprisingly well for classification, because getting the <em>order</em> of the classes right doesn't require exact probabilities.</p>
<pre><code>import math

def spam_probability(words, prior, p_spam, p_ham):
    log_odds = math.log(prior / (1 - prior))
    for w in words:
        if w in p_spam:
            log_odds += math.log(p_spam[w] / p_ham[w])
    return 1 / (1 + math.exp(-log_odds))     # convert log odds back to a probability

p_spam = {"winner": 0.20, "meeting": 0.02, "free": 0.30}
p_ham = {"winner": 0.01, "meeting": 0.10, "free": 0.06}
print(round(spam_probability(["winner", "free"], 0.4, p_spam, p_ham), 3))   # 0.985</code></pre>
<p>The last line of the function turns log odds <em>L</em> back into a probability. The odds are <em>o</em> = e<sup><em>L</em></sup>, and a probability with odds <em>o</em> is <em>o</em>/(1 + <em>o</em>) (since <em>o</em> = <em>p</em>/(1 − <em>p</em>) solves to <em>p</em> = <em>o</em>/(1 + <em>o</em>)). Dividing the top and bottom of e<sup><em>L</em></sup>/(1 + e<sup><em>L</em></sup>) by e<sup><em>L</em></sup> gives 1/(e<sup>−<em>L</em></sup> + 1), the form in the code. It avoids computing e<sup><em>L</em></sup> itself, which would overflow for a very large <em>L</em>.</p>
`,
      terms: [
        ["Prior and posterior", "The probability of a hypothesis before and after taking evidence into account."],
        ["Likelihood", "P(E | H), the probability of the evidence if the hypothesis is true."],
        ["Base-rate fallacy", "Ignoring the prior probability, for example treating an accurate test's positive result as near-certain for a rare condition."],
        ["Odds", "P(H) / P(not H); posterior odds = prior odds × likelihood ratio."],
        ["Likelihood ratio", "P(E | H) / P(E | not H), the factor by which evidence multiplies the odds."],
        ["Naive Bayes", "A classifier that assumes features are independent given the class, and multiplies their likelihood ratios."],
        ["Laplace smoothing", "Adding 1 to every count so no feature gets probability 0; for a word present or absent, (c + 1)/(s + 2)."],
        ["Underflow", "A floating-point result too small to represent, rounded to 0."]
      ],
      quiz: [
        { q: "A condition affects 1 in 1,000 people. A test catches every case and has a 1% false-positive rate. About what fraction of positive results are true?", choices: ["99%", "50%", "About 9%", "0.1%"], answer: 2, why: "Per 100,000 people: 100 true positives and about 999 false ones, so 100/1099 ≈ 9%." },
        { q: "Prior odds are 1 : 4 and the evidence has likelihood ratio 8. What are the posterior odds?", choices: ["1 : 32", "2 : 1", "8 : 4", "1 : 2"], answer: 1, why: "1/4 × 8 = 2, that is 2 : 1." },
        { q: "What does a likelihood ratio of 0.5 mean?", choices: ["The hypothesis is 50% likely", "The evidence is twice as likely if the hypothesis is false: it's evidence against", "The evidence is irrelevant", "The prior halves"], answer: 1, why: "It multiplies the odds by 0.5." },
        { q: "What is \"naive\" about naive Bayes?", choices: ["It ignores the prior", "It assumes the features are independent given the class", "It uses only one word", "It never smooths counts"], answer: 1, why: "That assumption lets the likelihood ratios simply multiply." },
        { q: "Why do spam filters add log-likelihoods rather than multiply probabilities?", choices: ["Logarithms are more accurate mathematically", "Multiplying many small numbers underflows floating point", "Addition is required by Bayes' rule", "To make the result negative"], answer: 1, why: "A product of hundreds of probabilities can round to 0." }
      ],
      practice: [
        {
          q: `<p>An intrusion-detection system flags 0.5% of normal network sessions and 90% of attacks. One session in 10,000 is an attack. Given a flag, what is the probability that the session is an attack? Do it with counts out of 1,000,000 sessions.</p>`,
          a: `<p>Out of 1,000,000: 100 attacks, of which 90 are flagged; 999,900 normal sessions, of which 0.5% = 4,999.5 ≈ 5,000 are flagged. P(attack | flag) ≈ 90 / 5,090 ≈ 0.018. Fewer than 2% of alerts are real, which is why security teams suffer "alert fatigue".</p>`
        },
        {
          q: `<p>In the disease example, how many independent positive tests are needed before the probability of disease exceeds 99%? Use the odds form.</p>`,
          a: `<p>Odds after <em>k</em> positives: 19.8<sup><em>k</em></sup>/99. We need odds above 99 (probability 0.99), so 19.8<sup><em>k</em></sup> &gt; 9801, <em>k</em> &gt; log 9801 / log 19.8 ≈ 3.07. Four positive tests (three give odds 7762/99 ≈ 78.4, probability about 0.987).</p>`
        },
        {
          q: `<p>Using the word table, compute the spam probability of an email containing all three words. Then explain what happens if a fourth word, "unsubscribe", appeared in 15% of training spam and never in ham, without smoothing.</p>`,
          a: `<p>Odds 0.667 × 20 × 0.2 × 5 = 13.3: probability 13.3/14.3 ≈ 0.93. "unsubscribe" would have likelihood ratio 0.15/0 = infinity: any email containing it would be classified as spam with certainty, whatever else it says. Smoothing gives the word a small nonzero ham probability and a large but finite ratio.</p>`
        },
        {
          q: `<p>Simulate the disease example: generate 1,000,000 people with <code>random.random() &lt; 0.01</code> for the disease, give each a test result with the stated rates, and estimate P(disease | positive). How close is it to 1/6?</p>`,
          a: `<pre><code>import random
random.seed(1)
pos = true_pos = 0
for _ in range(1_000_000):
    sick = random.random() &lt; 0.01
    positive = random.random() &lt; (0.99 if sick else 0.05)
    if positive:
        pos += 1
        true_pos += sick
print(true_pos / pos)</code></pre><p>Expect a value within about 0.005 of 0.1667; the exact value depends on the seed.</p>`
        }
      ],
      sources: ["grinstead", "mit1805", "graham02"]
    },
    {
      id: "ps2",
      title: "Discrete distributions",
      minutes: 90,
      summary: "The standard discrete distributions and when each applies: Bernoulli, binomial, geometric and Poisson; probability mass functions, means and variances; the Poisson limit of the binomial; and simulating random variables in Python.",
      notes: `
<p>MATH 121 Lesson 7 defined random variables, expectation and variance, and met the binomial and geometric distributions. A small number of standard distributions describe a surprising range of situations. Recognizing which one applies, and checking whether its assumptions hold, is a core skill of applied probability.</p>

<h3>Probability mass functions</h3>
<p>A discrete random variable <em>X</em> is described by its <strong>probability mass function</strong> (PMF), <em>p</em>(<em>k</em>) = P(<em>X</em> = <em>k</em>), which is non-negative and sums to 1 over all possible values. Its mean is E[<em>X</em>] = Σ <em>k</em> <em>p</em>(<em>k</em>) and its variance is Var(<em>X</em>) = E[(<em>X</em> − μ)²] = E[<em>X</em>²] − μ², where μ = E[<em>X</em>]. The <strong>standard deviation</strong> σ = √Var(<em>X</em>) is in the same units as <em>X</em>.</p>

<h3>Bernoulli and binomial</h3>
<p>A <strong>Bernoulli</strong>(<em>p</em>) variable is 1 with probability <em>p</em> and 0 otherwise: one coin flip, one packet that is or isn't lost. Mean <em>p</em>, variance <em>p</em>(1 − <em>p</em>). The number of successes in <em>n</em> independent Bernoulli(<em>p</em>) trials is <strong>binomial</strong>(<em>n</em>, <em>p</em>):</p>
<p class="math">P(X = k) = C(n, k) p<sup>k</sup> (1 − p)<sup>n − k</sup>,   E[X] = np,   Var(X) = np(1 − p)</p>
<p>The key assumptions are a fixed number of trials, independence, and the same <em>p</em> for each. Number of defective chips in a batch of 100, number of heads in 20 flips: binomial. Number of rainy days in a month: probably not, since rainy days cluster.</p>

<h3>Geometric</h3>
<p>The number of independent Bernoulli(<em>p</em>) trials up to and including the first success is <strong>geometric</strong>(<em>p</em>): P(<em>X</em> = <em>k</em>) = (1 − <em>p</em>)<sup><em>k</em>−1</sup><em>p</em>, with mean 1/<em>p</em> and variance (1 − <em>p</em>)/<em>p</em>². A network protocol that resends a packet until it gets through, with each try succeeding with probability 0.9, needs 1/0.9 ≈ 1.11 tries on average. The geometric distribution is <strong>memoryless</strong>: having failed 10 times doesn't make success more likely on the 11th. That's what independence means, and it's why the "gambler's fallacy" is a fallacy.</p>

<h3>Poisson</h3>
<p>Many things are counted in a fixed interval of time or space: requests reaching a web server per second, typos per page, radioactive decays per minute, emails per hour. If events happen independently, at a steady average rate λ per interval, the count follows the <strong>Poisson</strong>(λ) distribution:</p>
<p class="math">P(X = k) = e<sup>−λ</sup> λ<sup>k</sup> / k!,   k = 0, 1, 2, …,   E[X] = Var(X) = λ</p>
<p>Where does it come from? Divide the interval into <em>n</em> tiny pieces, each with an event with probability λ/<em>n</em>. The count is binomial(<em>n</em>, λ/<em>n</em>), and as <em>n</em> → ∞ its PMF approaches the Poisson formula. To see this, write C(<em>n</em>, <em>k</em>) = <em>n</em>(<em>n</em> − 1)⋯(<em>n</em> − <em>k</em> + 1)/<em>k</em>! and split the binomial probability into four factors:</p>
<p class="math">C(n, k)(λ/n)<sup>k</sup>(1 − λ/n)<sup>n−k</sup> = [n(n − 1)⋯(n − k + 1) / n<sup>k</sup>] · (λ<sup>k</sup>/k!) · (1 − λ/n)<sup>n</sup> · (1 − λ/n)<sup>−k</sup></p>
<p>Hold <em>k</em> fixed and let <em>n</em> grow. The first factor is (<em>n</em>/<em>n</em>)((<em>n</em> − 1)/<em>n</em>)⋯((<em>n</em> − <em>k</em> + 1)/<em>n</em>), a product of <em>k</em> fractions that each tend to 1, so it tends to 1. The second doesn't depend on <em>n</em>. The third tends to e<sup>−λ</sup>, the limit from MATH 130. The fourth tends to 1<sup>−<em>k</em></sup> = 1. So the product tends to e<sup>−λ</sup>λ<sup><em>k</em></sup>/<em>k</em>!. So the Poisson also approximates a binomial with large <em>n</em> and small <em>p</em>, with λ = <em>np</em>. For <em>n</em> = 1000, <em>p</em> = 0.002:</p>
<table>
<thead><tr><th>k</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead>
<tbody>
<tr><td>Binomial(1000, 0.002)</td><td>0.1351</td><td>0.2707</td><td>0.2709</td><td>0.1806</td><td>0.0902</td></tr>
<tr><td>Poisson(2)</td><td>0.1353</td><td>0.2707</td><td>0.2707</td><td>0.1804</td><td>0.0902</td></tr>
</tbody>
</table>
<p><strong>Example: capacity planning.</strong> A server receives on average 3 requests per second, independently. The chance of a second with 6 or more requests is 1 − P(<em>X</em> ≤ 5) ≈ 0.084: such seconds happen about once every 12 seconds, so a server that can only handle 5 per second will regularly fall behind. The chance of a completely idle second is e<sup>−3</sup> ≈ 0.050.</p>
<p><strong>Example: hash tables.</strong> Insert <em>n</em> keys into <em>m</em> buckets with a good hash function (CS 201 Lesson 3). The number of keys in a given bucket is binomial(<em>n</em>, 1/<em>m</em>), approximately Poisson(α) with α = <em>n</em>/<em>m</em>, the load factor. (Here α keeps its CS 201 meaning. Lesson 7 uses α for something else, the significance level of a test; Greek letters are reused across subjects, and the context says which is meant.) So the fraction of empty buckets is about e<sup>−α</sup>: 37% at α = 1, 61% at α = 0.5. Chaining tables at load factor 1 waste about a third of their buckets.</p>

<h3>Simulating</h3>
<p>Python's <code>random</code> module draws from many distributions, and a simulation is a quick check on any calculation:</p>
<pre><code>import random
from math import exp, factorial

random.seed(42)

def poisson_sample(lam):
    """Count events in one interval: arrivals spaced by exponential gaps."""
    t, k = random.expovariate(lam), 0
    while t &lt; 1:
        k += 1
        t += random.expovariate(lam)
    return k

samples = [poisson_sample(3) for _ in range(100_000)]
print(sum(s &gt;= 6 for s in samples) / len(samples))     # close to 0.084
print(1 - sum(exp(-3) * 3**k / factorial(k) for k in range(6)))   # 0.0839...</code></pre>
<p>(<code>random.expovariate(λ)</code> draws the waiting time until the next event of a Poisson process, an <em>exponential</em> random variable; Lesson 3 explains why adding up such waits and counting how many fit in one time unit gives a Poisson count.) A simulation of 100,000 trials typically agrees with the formula to two or three decimal places; Lesson 5 explains exactly how close to expect.</p>
`,
      terms: [
        ["Probability mass function", "p(k) = P(X = k) for a discrete random variable; non-negative and summing to 1."],
        ["Standard deviation", "σ = √Var(X), the typical distance from the mean, in X's own units."],
        ["Binomial distribution", "Successes in n independent trials with the same success probability p: mean np, variance np(1 − p)."],
        ["Geometric distribution", "Trials until the first success: mean 1/p; memoryless."],
        ["Poisson distribution", "Counts of independent events at average rate λ per interval: P(X = k) = e^(−λ)λ^k/k!, mean and variance λ."],
        ["Memoryless", "Past failures don't change the probability of future success."]
      ],
      quiz: [
        { q: "A quiz has 10 multiple-choice questions with 4 choices each. A student guesses every one. What is the expected number correct?", choices: ["2.5", "4", "1", "5"], answer: 0, why: "Binomial with n = 10, p = 1/4: mean np = 2.5." },
        { q: "Calls arrive at a help desk at 4 per hour on average, independently. What is the variance of the number in an hour?", choices: ["2", "4", "16", "1/4"], answer: 1, why: "For a Poisson distribution, the variance equals the mean." },
        { q: "A random password guess succeeds with probability 1/1000. On average, how many guesses until the first success?", choices: ["500", "1000", "999", "√1000"], answer: 1, why: "Geometric with p = 1/1000: mean 1/p." },
        { q: "Which situation is least well modeled by a binomial distribution?", choices: ["Heads in 50 coin flips", "Defective items in a sample of 20 from a large batch", "Rainy days in a month", "Correct guesses on 10 true/false questions"], answer: 2, why: "Rainy days aren't independent: weather persists." },
        { q: "A hash table has load factor 2. About what fraction of buckets are empty?", choices: ["e⁻² ≈ 0.14", "0.5", "0", "0.25"], answer: 0, why: "Bucket counts are about Poisson(2), and P(0) = e⁻²." }
      ],
      practice: [
        {
          q: `<p>A data center has 500 disks, each failing independently in a given week with probability 0.004. Find the probability that no disk fails, and that at least 3 fail, using the Poisson approximation. What is λ?</p>`,
          a: `<p>λ = 500 × 0.004 = 2. P(0) = e<sup>−2</sup> ≈ 0.135. P(at least 3) = 1 − e<sup>−2</sup>(1 + 2 + 2) = 1 − 5e<sup>−2</sup> ≈ 0.323.</p>`
        },
        {
          q: `<p>Show that the Poisson probabilities sum to 1, using the series for e<sup>λ</sup> from MATH 131 Lesson 5.</p>`,
          a: `<p>Σ<sub><em>k</em>≥0</sub> e<sup>−λ</sup>λ<sup><em>k</em></sup>/<em>k</em>! = e<sup>−λ</sup> Σ λ<sup><em>k</em></sup>/<em>k</em>! = e<sup>−λ</sup> · e<sup>λ</sup> = 1.</p>`
        },
        {
          q: `<p>A video game drops a rare item with probability 0.02 per enemy defeated. What is the probability of getting the item within the first 50 enemies? How many enemies must a player defeat to have a 90% chance?</p>`,
          a: `<p>P(within 50) = 1 − 0.98<sup>50</sup> ≈ 1 − 0.364 = 0.636. For 90%: 0.98<sup><em>n</em></sup> ≤ 0.1, <em>n</em> ≥ ln 0.1 / ln 0.98 ≈ 114. Players who expect the item "after about 50" (the mean) will often be disappointed.</p>`
        },
        {
          q: `<p>Simulate binomial(20, 0.3) 100,000 times with <code>sum(random.random() &lt; 0.3 for _ in range(20))</code>, and compare the sample mean and variance (<code>statistics.mean</code>, <code>statistics.pvariance</code>) with the formulas.</p>`,
          a: `<p>The formulas give mean 6 and variance 20 × 0.3 × 0.7 = 4.2. The simulation should give values within a few hundredths of these.</p>`
        }
      ],
      sources: ["grinstead", "mit1805", "openintro"]
    },
    {
      id: "ps3",
      title: "Continuous random variables",
      minutes: 90,
      summary: "Random variables that take any value in a range: probability density and cumulative distribution functions, the uniform, exponential and normal distributions, expectation by integration, standardizing, and the 68–95–99.7 rule.",
      notes: `
<p>Heights, waiting times, measurement errors and the output of <code>random.random()</code> can take any value in a range, not just whole numbers. For these, probability is spread continuously, and the tools are integrals instead of sums (MATH 130 and 131).</p>

<h3>Densities</h3>
<p>A continuous random variable <em>X</em> has a <strong>probability density function</strong> (PDF) <em>f</em>(<em>x</em>) ≥ 0 with total area 1, and probabilities are areas under it:</p>
<p class="math">P(a ≤ X ≤ b) = ∫<sub>a</sub><sup>b</sup> f(x) dx</p>
<p>A density is not a probability. <em>f</em>(<em>x</em>) can exceed 1, and the probability of any single exact value is 0 (the area over a single point). What matters is <em>f</em>(<em>x</em>) <em>dx</em>, the probability of landing in a tiny interval of width <em>dx</em> near <em>x</em>. The <strong>cumulative distribution function</strong> (CDF) is <em>F</em>(<em>x</em>) = P(<em>X</em> ≤ <em>x</em>) = ∫<sub>−∞</sub><sup><em>x</em></sup> <em>f</em>(<em>t</em>) <em>dt</em>; by the Fundamental Theorem, <em>F</em>′ = <em>f</em>. Means and variances become integrals:</p>
<p class="math">E[X] = ∫ x f(x) dx,   Var(X) = ∫ (x − μ)² f(x) dx</p>
<p>All the rules from the discrete case, such as linearity of expectation, still hold.</p>

<h3>Uniform</h3>
<p>The <strong>uniform</strong> distribution on [<em>a</em>, <em>b</em>] has constant density 1/(<em>b</em> − <em>a</em>) there: every subinterval of the same length is equally likely. Mean (<em>a</em> + <em>b</em>)/2, variance (<em>b</em> − <em>a</em>)²/12. <code>random.random()</code> is (approximately) uniform on [0, 1) and <code>random.uniform(a, b)</code> on [<em>a</em>, <em>b</em>] (MATH 131 Lesson 9).</p>

<h3>Exponential</h3>
<p>The <strong>exponential</strong> distribution with rate λ has density λe<sup>−λ<em>x</em></sup> for <em>x</em> ≥ 0, and</p>
<p class="math">P(X &gt; t) = e<sup>−λt</sup>,   E[X] = 1/λ,   Var(X) = 1/λ²</p>
<p>It models waiting times between events of a Poisson process (Lesson 2): if requests arrive at rate λ, the time to the next one is exponential with rate λ. The connection is direct: waiting more than <em>t</em> means zero events in time <em>t</em>, and a Poisson(λ<em>t</em>) count is 0 with probability e<sup>−λ<em>t</em></sup>. Like the geometric distribution, it is <strong>memoryless</strong>: P(<em>X</em> &gt; <em>s</em> + <em>t</em> | <em>X</em> &gt; <em>s</em>) = e<sup>−λ(<em>s</em>+<em>t</em>)</sup>/e<sup>−λ<em>s</em></sup> = e<sup>−λ<em>t</em></sup>. A part that fails at a constant rate is "as good as new" until it fails. Radioactive atoms behave exactly this way; light bulbs and hard disks, which wear out, only roughly.</p>
<p>The connection also runs the other way, which is what Lesson 2's <code>poisson_sample</code> relies on: if events are separated by independent exponential gaps with rate λ, the number of events in one time unit is Poisson(λ). Here is the idea. Cut the time unit into <em>n</em> short slices of length 1/<em>n</em>. Because the gaps are memoryless and independent, at the start of every slice, whatever happened before, the chance that an event comes within the slice is the same: P(gap ≤ 1/<em>n</em>) = 1 − e<sup>−λ/<em>n</em></sup>, which is about λ/<em>n</em> for large <em>n</em> (MATH 130's linear approximation e<sup><em>x</em></sup> ≈ 1 + <em>x</em> near 0). The chance of two events in the same slice is about (λ/<em>n</em>)², small enough to ignore as <em>n</em> grows. So the count is very nearly the number of successes in <em>n</em> independent slices, each a success with probability λ/<em>n</em>: binomial(<em>n</em>, λ/<em>n</em>). Lesson 2 showed that this tends to Poisson(λ) as <em>n</em> grows.</p>

<h3>Normal</h3>
<p>The <strong>normal</strong> (or Gaussian) distribution N(μ, σ²) has the bell-shaped density</p>
<p class="math">f(x) = (1 / (σ√(2π))) e<sup>−(x − μ)²/(2σ²)</sup></p>
<p>with mean μ and variance σ². Lesson 5 explains why it appears so often: sums of many small independent effects are approximately normal. Its key facts:</p>
<ul>
<li><strong>Standardizing:</strong> if <em>X</em> is N(μ, σ²), then <em>Z</em> = (<em>X</em> − μ)/σ is N(0, 1), the <strong>standard normal</strong>. The value of <em>Z</em> (the "z-score") says how many standard deviations <em>X</em> is from its mean.</li>
<li><strong>The 68–95–99.7 rule:</strong> a normal variable is within 1σ of its mean with probability about 0.683, within 2σ with 0.954, within 3σ with 0.997.</li>
<li>The CDF has no formula in elementary functions (the integral of e<sup>−<em>x</em>²</sup>, as MATH 131 noted), so it is computed numerically.</li>
</ul>
<p>The standard normal CDF is written Φ(<em>z</em>) (capital phi). Because the integral can't be written with ordinary functions, mathematicians gave a closely related one its own name, the <strong>error function</strong>:</p>
<p class="math">erf(x) = (2/√π) ∫<sub>0</sub><sup>x</sup> e<sup>−t²</sup> dt</p>
<p>Libraries compute it accurately (Python has <code>math.erf</code>), and Φ follows from it. The standard normal density is symmetric about 0, so half its area lies below 0 and Φ(<em>z</em>) = 1/2 + ∫<sub>0</sub><sup><em>z</em></sup> (1/√(2π)) e<sup>−<em>x</em>²/2</sup> <em>dx</em>. Substituting <em>x</em> = √2 <em>t</em> (so <em>dx</em> = √2 <em>dt</em>, and <em>t</em> runs from 0 to <em>z</em>/√2) turns the integral into (1/√π) ∫<sub>0</sub><sup><em>z</em>/√2</sup> e<sup>−<em>t</em>²</sup> <em>dt</em> = erf(<em>z</em>/√2)/2. So</p>
<p class="math">Φ(z) = (1 + erf(z/√2)) / 2</p>
<p>Check: <code>(1 + math.erf(2 / math.sqrt(2))) / 2</code> is 0.97725, and <code>NormalDist().cdf(2)</code> gives the same. The <code>statistics</code> module's <code>NormalDist</code> does this for you:</p>
<pre><code>from statistics import NormalDist

Z = NormalDist()                       # standard normal
print(round(Z.cdf(2) - Z.cdf(-2), 4))  # 0.9545
iq = NormalDist(mu=100, sigma=15)
print(round(1 - iq.cdf(130), 4))       # 0.0228: two standard deviations above
print(round(Z.inv_cdf(0.975), 3))      # 1.96: the 97.5th percentile</code></pre>
<p>The value 1.96 will reappear constantly: 95% of a normal distribution lies within 1.96 standard deviations of the mean.</p>

<h3>Choosing a model</h3>
<table>
<thead><tr><th>Situation</th><th>Model</th></tr></thead>
<tbody>
<tr><td>Count of successes in n independent trials</td><td>Binomial</td></tr>
<tr><td>Trials until the first success</td><td>Geometric</td></tr>
<tr><td>Count of independent events in an interval</td><td>Poisson</td></tr>
<tr><td>Waiting time between such events</td><td>Exponential</td></tr>
<tr><td>A value equally likely anywhere in a range</td><td>Uniform</td></tr>
<tr><td>Sum or average of many small independent effects</td><td>Normal</td></tr>
</tbody>
</table>
<p>Models are assumptions, and assumptions can fail badly. Financial returns, file sizes, and the popularity of web pages have <strong>heavy tails</strong>: extreme values far more often than a normal model predicts. Treating such data as normal underestimates rare disasters. Always look at the data (a histogram) before trusting a model.</p>
`,
      terms: [
        ["Probability density function", "f(x) ≥ 0 with total area 1; P(a ≤ X ≤ b) is the area under f between a and b."],
        ["Cumulative distribution function", "F(x) = P(X ≤ x); its derivative is the density."],
        ["Uniform distribution", "Constant density on [a, b]: mean (a + b)/2, variance (b − a)²/12."],
        ["Exponential distribution", "Density λe^(−λx) for x ≥ 0: waiting times between Poisson events; mean 1/λ; memoryless."],
        ["Normal distribution", "The bell curve N(μ, σ²); sums of many small independent effects are approximately normal."],
        ["z-score", "(x − μ)/σ, the number of standard deviations a value is from the mean."],
        ["Error function", "erf(x) = (2/√π)∫₀ˣ e^(−t²) dt; the standard normal CDF is Φ(z) = (1 + erf(z/√2))/2."],
        ["Heavy tail", "A distribution with extreme values much more likely than under a normal model."]
      ],
      quiz: [
        { q: "X is uniform on [0, 4]. What is P(1 ≤ X ≤ 2)?", choices: ["1/2", "1/4", "1", "1/3"], answer: 1, why: "Length 1 times density 1/4." },
        { q: "Requests arrive at 2 per second. What is the probability of waiting more than 1 second for the next one?", choices: ["e⁻²", "1/2", "2e⁻²", "e⁻¹"], answer: 0, why: "Exponential with rate 2: P(X > 1) = e^(−2·1)." },
        { q: "Exam scores are normal with mean 70 and standard deviation 10. About what fraction score above 90?", choices: ["2.3%", "5%", "16%", "0.1%"], answer: 0, why: "90 is 2σ above the mean; the upper tail beyond 2σ is about (1 − 0.954)/2 ≈ 0.023." },
        { q: "Can a probability density exceed 1?", choices: ["No, never", "Yes: only areas under it must be at most 1", "Only for discrete variables", "Only at the mean"], answer: 1, why: "Uniform on [0, 0.5] has density 2." },
        { q: "A component has been running for 1,000 hours. If its lifetime is exponential, what does that imply about its remaining life?", choices: ["It is likely to fail soon", "Its remaining life has the same distribution as a new one's", "It will last exactly 1,000 more hours", "It can't fail"], answer: 1, why: "The exponential distribution is memoryless." }
      ],
      practice: [
        {
          q: `<p>Compute the mean of the exponential distribution, ∫<sub>0</sub><sup>∞</sup> <em>x</em> λe<sup>−λ<em>x</em></sup> <em>dx</em>, by integration by parts (MATH 131 Lesson 1).</p>`,
          a: `<p>Let <em>u</em> = <em>x</em>, <em>dv</em> = λe<sup>−λ<em>x</em></sup><em>dx</em>, so <em>v</em> = −e<sup>−λ<em>x</em></sup>. Then the integral is [−<em>x</em>e<sup>−λ<em>x</em></sup>]<sub>0</sub><sup>∞</sup> + ∫<sub>0</sub><sup>∞</sup> e<sup>−λ<em>x</em></sup> <em>dx</em> = 0 + 1/λ.</p>`
        },
        {
          q: `<p>Page load times on a site are normal with mean 1.2 s and standard deviation 0.3 s. What fraction of loads take over 2 seconds? Find the time that 99% of loads beat.</p>`,
          a: `<p><em>z</em> = (2 − 1.2)/0.3 ≈ 2.67, and P(<em>Z</em> &gt; 2.67) ≈ 0.0038, about 0.4%. The 99th percentile is 1.2 + 2.326 × 0.3 ≈ 1.90 s (<code>NormalDist(1.2, 0.3).inv_cdf(0.99)</code>). (Real load times are usually right-skewed, with a heavier tail than this model, so check against data.)</p>`
        },
        {
          q: `<p>Show that the uniform distribution on [0, 1] has variance 1/12.</p>`,
          a: `<p>E[<em>X</em>] = 1/2 and E[<em>X</em>²] = ∫<sub>0</sub><sup>1</sup> <em>x</em>² <em>dx</em> = 1/3, so Var = 1/3 − 1/4 = 1/12.</p>`
        },
        {
          q: `<p>Generate 100,000 values of <code>random.expovariate(0.5)</code> and estimate their mean and the fraction greater than 2. Compare with the formulas.</p>`,
          a: `<p>The mean should be close to 1/0.5 = 2, and the fraction above 2 close to e<sup>−1</sup> ≈ 0.368.</p>`
        }
      ],
      sources: ["grinstead", "mit1805", "openintro"]
    },
    {
      id: "ps4",
      title: "Joint distributions, covariance and correlation",
      minutes: 90,
      summary: "Two random variables at once: joint, marginal and conditional distributions, independence, covariance and correlation, the variance of a sum, and why correlation is not causation.",
      notes: `
<p>Interesting questions involve several quantities at once. Does a longer study session predict a higher score? Do two servers fail together? This lesson describes how random variables behave together.</p>

<h3>Joint and marginal distributions</h3>
<p>The <strong>joint distribution</strong> of two discrete random variables <em>X</em> and <em>Y</em> gives P(<em>X</em> = <em>x</em>, <em>Y</em> = <em>y</em>) for every pair of values. Suppose two testers each examine a piece of code; <em>X</em> = 1 if tester A finds a bug and <em>Y</em> = 1 if tester B does:</p>
<table>
<thead><tr><th></th><th>Y = 0</th><th>Y = 1</th><th>P(X = x)</th></tr></thead>
<tbody>
<tr><td>X = 0</td><td>0.5</td><td>0.1</td><td>0.6</td></tr>
<tr><td>X = 1</td><td>0.2</td><td>0.2</td><td>0.4</td></tr>
<tr><td>P(Y = y)</td><td>0.7</td><td>0.3</td><td>1</td></tr>
</tbody>
</table>
<p>The <strong>marginal distributions</strong>, in the margins, come from adding across rows or down columns: P(<em>X</em> = 1) = 0.2 + 0.2 = 0.4. A <strong>conditional distribution</strong> restricts to one row or column: P(<em>Y</em> = 1 | <em>X</em> = 1) = 0.2/0.4 = 0.5, while P(<em>Y</em> = 1 | <em>X</em> = 0) = 0.1/0.6 ≈ 0.17. Bugs that A finds are much more often found by B too, perhaps because some bugs are simply easier to spot.</p>
<p>For continuous variables, a <strong>joint density</strong> <em>f</em>(<em>x</em>, <em>y</em>) plays the same role, with probabilities given by double integrals (MATH 131 Lesson 9).</p>

<h3>Independence</h3>
<p><em>X</em> and <em>Y</em> are <strong>independent</strong> if every joint probability is the product of the marginals: P(<em>X</em> = <em>x</em>, <em>Y</em> = <em>y</em>) = P(<em>X</em> = <em>x</em>)P(<em>Y</em> = <em>y</em>). Here, P(<em>X</em> = 1, <em>Y</em> = 1) = 0.2 but P(<em>X</em> = 1)P(<em>Y</em> = 1) = 0.12, so the testers' results are dependent. For independent variables, E[<em>XY</em>] = E[<em>X</em>]E[<em>Y</em>].</p>

<h3>Covariance and correlation</h3>
<p>The <strong>covariance</strong> measures whether two variables tend to be above their means at the same time:</p>
<p class="math">Cov(X, Y) = E[(X − μ<sub>X</sub>)(Y − μ<sub>Y</sub>)] = E[XY] − E[X]E[Y]</p>
<p>Positive covariance means they tend to move together; negative, in opposite directions. For the testers: E[<em>XY</em>] = P(<em>X</em> = 1, <em>Y</em> = 1) = 0.2, so Cov = 0.2 − 0.4 × 0.3 = 0.08.</p>
<p>Covariance depends on units (measuring in centimeters instead of meters multiplies it by 100). The <strong>correlation</strong> removes the units:</p>
<p class="math">ρ(X, Y) = Cov(X, Y) / (σ<sub>X</sub> σ<sub>Y</sub>)</p>
<p>It always lies between −1 and 1 (shown below, after the variance of a sum). It is ±1 exactly when <em>Y</em> is a linear function of <em>X</em>. For the testers, Var(<em>X</em>) = 0.4 × 0.6 = 0.24 and Var(<em>Y</em>) = 0.3 × 0.7 = 0.21, so ρ = 0.08/√(0.24 × 0.21) ≈ 0.36: a moderate positive relationship.</p>
<p><strong>Covariance and correlation of data.</strong> Given <em>n</em> data pairs (<em>x</em><sub><em>i</em></sub>, <em>y</em><sub><em>i</em></sub>) rather than a known distribution, we use the same formulas with averages over the data in place of expectations. The <strong>sample covariance</strong> is</p>
<p class="math">s<sub>xy</sub> = Σ (x<sub>i</sub> − x̄)(y<sub>i</sub> − ȳ) / (n − 1)</p>
<p>and the <strong>sample correlation</strong> is <em>r</em> = <em>s</em><sub><em>xy</em></sub>/(<em>s</em><sub><em>x</em></sub><em>s</em><sub><em>y</em></sub>), where <em>s</em><sub><em>x</em></sub> and <em>s</em><sub><em>y</em></sub> are the sample standard deviations, computed with the same denominator: <em>s</em><sub><em>x</em></sub>² = Σ(<em>x</em><sub><em>i</em></sub> − <em>x̄</em>)²/(<em>n</em> − 1). Dividing by <em>n</em> − 1 rather than <em>n</em> is a small correction that Lesson 6 explains (dividing by <em>n</em> comes out slightly too small on average); <em>r</em> is the same either way, because the denominators cancel. Python's <code>statistics.covariance</code> and <code>statistics.correlation</code> compute these, as in the example at the end of this lesson.</p>
<p>For data, the correlation has a picture from MATH 220 Lesson 1. The centered lists <b>u</b> = (<em>x</em><sub>1</sub> − <em>x̄</em>, …, <em>x</em><sub><em>n</em></sub> − <em>x̄</em>) and <b>v</b> = (<em>y</em><sub>1</sub> − <em>ȳ</em>, …, <em>y</em><sub><em>n</em></sub> − <em>ȳ</em>) are vectors in ℝ<sup><em>n</em></sup>, and after the (<em>n</em> − 1)s cancel, <em>r</em> = <b>u</b> · <b>v</b>/(‖<b>u</b>‖ ‖<b>v</b>‖): the cosine of the angle between them. That is why <em>r</em> is between −1 and 1 (Cauchy–Schwarz), and why it is ±1 exactly when one vector is a multiple of the other, that is, when the points lie on a line.</p>
<p>Independent variables have covariance 0. The converse is false: if <em>X</em> is uniform on [−1, 1] and <em>Y</em> = <em>X</em>², then <em>Y</em> is completely determined by <em>X</em>, yet Cov(<em>X</em>, <em>Y</em>) = E[<em>X</em>³] − E[<em>X</em>]E[<em>X</em>²] = 0. <strong>Correlation measures only linear relationship.</strong></p>

<h3>Variance of a sum</h3>
<p>Expectation always adds. Variance adds only when there's no covariance:</p>
<p class="math">Var(X + Y) = Var(X) + Var(Y) + 2 Cov(X, Y)</p>
<p>(Expand E[((<em>X</em> − μ<sub><em>X</em></sub>) + (<em>Y</em> − μ<sub><em>Y</em></sub>))²]: the two squares give the variances, and the cross term gives 2 Cov.) Scaling and shifting behave simply. For numbers <em>a</em> and <em>b</em>, <em>aX</em> + <em>b</em> has mean <em>a</em>μ + <em>b</em>, so its deviation from its mean is <em>a</em>(<em>X</em> − μ), and</p>
<p class="math">Var(aX + b) = E[a²(X − μ)²] = a² Var(X)</p>
<p>Adding a constant doesn't change the spread, and multiplying by <em>a</em> multiplies the variance by <em>a</em>² (and the standard deviation by |<em>a</em>|). In particular Var(−<em>Y</em>) = Var(<em>Y</em>), and in the same way Cov(<em>X</em>, −<em>Y</em>) = −Cov(<em>X</em>, <em>Y</em>), so Var(<em>X</em> − <em>Y</em>) = Var(<em>X</em>) + Var(<em>Y</em>) − 2 Cov(<em>X</em>, <em>Y</em>).</p>
<p>These rules prove that −1 ≤ ρ ≤ 1. Let <em>U</em> = <em>X</em>/σ<sub><em>X</em></sub> and <em>V</em> = <em>Y</em>/σ<sub><em>Y</em></sub>, which have variance 1 and Cov(<em>U</em>, <em>V</em>) = Cov(<em>X</em>, <em>Y</em>)/(σ<sub><em>X</em></sub>σ<sub><em>Y</em></sub>) = ρ. (Scaling one variable by a number <em>c</em> scales the covariance by <em>c</em>: <em>cX</em> has mean <em>c</em>μ<sub><em>X</em></sub>, so Cov(<em>cX</em>, <em>Y</em>) = E[(<em>cX</em> − <em>c</em>μ<sub><em>X</em></sub>)(<em>Y</em> − μ<sub><em>Y</em></sub>)] = <em>c</em> E[(<em>X</em> − μ<sub><em>X</em></sub>)(<em>Y</em> − μ<sub><em>Y</em></sub>)] = <em>c</em> Cov(<em>X</em>, <em>Y</em>). Use it with <em>c</em> = 1/σ<sub><em>X</em></sub>, then with <em>c</em> = 1/σ<sub><em>Y</em></sub> on the other variable. Practice 2 adds a shift <em>b</em>.) A variance is never negative, so 0 ≤ Var(<em>U</em> + <em>V</em>) = 2 + 2ρ and 0 ≤ Var(<em>U</em> − <em>V</em>) = 2 − 2ρ. Together these say −1 ≤ ρ ≤ 1. (This is the Cauchy–Schwarz inequality of MATH 220 Lesson 1 again, with covariance playing the part of the dot product.)</p>
<p>This is why diversification works: a portfolio of two investments whose returns are negatively correlated varies less than either alone. It's also why redundancy only helps if failures are independent: two backup disks in the same machine, which fail together in a fire or power surge, protect less than their individual failure rates suggest.</p>

<h3>Correlation is not causation</h3>
<p>A correlation between <em>X</em> and <em>Y</em> can arise because <em>X</em> causes <em>Y</em>, because <em>Y</em> causes <em>X</em>, because some third factor causes both (a <strong>confounder</strong>), or by chance. Ice cream sales and drowning deaths are correlated; hot weather causes both. Students who use a study app may score higher because the app helps, or because motivated students both use apps and study more. Only a <strong>randomized experiment</strong>, which assigns the "treatment" by chance so that confounders are balanced between groups, can reliably establish causation; that's what A/B tests do (Lesson 7).</p>
<p>Numbers also hide shape. In 1973 the statistician Francis Anscombe published four small datasets with the same means, variances, correlation (about 0.816) and regression line, which look completely different when plotted: one linear, one curved, one with an outlier, one with all the variation from a single point. Always plot the data.</p>
<pre><code>from statistics import correlation, covariance

hours = [1, 2, 3, 4, 5, 6]
score = [52, 58, 61, 70, 74, 81]
print(round(covariance(hours, score), 2))    # 20.2
print(round(correlation(hours, score), 3))   # 0.994</code></pre>
`,
      terms: [
        ["Joint distribution", "The probabilities of every combination of values of two or more random variables."],
        ["Marginal distribution", "The distribution of one variable alone, obtained by summing (or integrating) the joint distribution over the other."],
        ["Independent random variables", "Variables whose joint probabilities are the products of their marginals."],
        ["Covariance", "Cov(X, Y) = E[XY] − E[X]E[Y]; positive when the variables tend to move together."],
        ["Correlation", "Cov(X, Y)/(σ_X σ_Y), between −1 and 1; measures linear relationship."],
        ["Sample covariance and correlation", "For data: s_xy = Σ(xᵢ − x̄)(yᵢ − ȳ)/(n − 1), and r = s_xy/(s_x s_y)."],
        ["Confounder", "A third factor that influences both variables, creating a correlation without a direct causal link."],
        ["Randomized experiment", "A study that assigns treatments by chance, so confounders are balanced and causal effects can be estimated."]
      ],
      quiz: [
        { q: "In the testers' table, what is P(X = 1 | Y = 1)?", choices: ["0.2", "2/3", "0.4", "0.5"], answer: 1, why: "0.2 / P(Y = 1) = 0.2/0.3." },
        { q: "X and Y are independent with variances 4 and 9. What is Var(X + Y)?", choices: ["13", "5", "36", "Not enough information"], answer: 0, why: "Independence makes the covariance 0, so variances add." },
        { q: "Cov(X, Y) = 0. What can you conclude?", choices: ["X and Y are independent", "There is no linear relationship, but there may be another kind", "Y is constant", "X causes Y"], answer: 1, why: "Y = X² with X symmetric around 0 has zero covariance but complete dependence." },
        { q: "What is Var(X − Y) for independent X and Y?", choices: ["Var X − Var Y", "Var X + Var Y", "0", "Var X · Var Y"], answer: 1, why: "Var(−Y) = Var(Y), and the covariance term is 0." },
        { q: "A study finds that people who drink more coffee live longer. Which explanation can't be ruled out without an experiment?", choices: ["Coffee extends life", "Healthier, wealthier people both drink more coffee and live longer", "Chance", "All of these"], answer: 3, why: "An observational correlation is consistent with causation, confounding and chance." }
      ],
      practice: [
        {
          q: `<p>From the testers' table, compute E[<em>X</em> + <em>Y</em>], the expected number of testers who find the bug, and Var(<em>X</em> + <em>Y</em>). Check the variance directly from the distribution of <em>X</em> + <em>Y</em>.</p>`,
          a: `<p>E = 0.4 + 0.3 = 0.7. Var = 0.24 + 0.21 + 2(0.08) = 0.61. Directly: <em>X</em> + <em>Y</em> is 0 w.p. 0.5, 1 w.p. 0.3, 2 w.p. 0.2; E[(<em>X</em> + <em>Y</em>)²] = 0.3 + 0.8 = 1.1, and 1.1 − 0.49 = 0.61.</p>`
        },
        {
          q: `<p>Show that Cov(<em>aX</em> + <em>b</em>, <em>Y</em>) = <em>a</em> Cov(<em>X</em>, <em>Y</em>), and explain why the correlation of temperature in °C with ice cream sales equals the correlation of temperature in °F with sales.</p>`,
          a: `<p>E[(<em>aX</em> + <em>b</em>)<em>Y</em>] − E[<em>aX</em> + <em>b</em>]E[<em>Y</em>] = <em>a</em>E[<em>XY</em>] + <em>b</em>E[<em>Y</em>] − <em>a</em>E[<em>X</em>]E[<em>Y</em>] − <em>b</em>E[<em>Y</em>] = <em>a</em> Cov(<em>X</em>, <em>Y</em>). °F = 1.8°C + 32 multiplies the covariance and the standard deviation by 1.8, which cancel in the correlation (for <em>a</em> &gt; 0).</p>`
        },
        {
          q: `<p>Generate 10,000 values <em>x</em> uniform on [−1, 1] and <em>y</em> = <em>x</em>², and compute <code>statistics.correlation</code>. Then do the same with <em>x</em> uniform on [0, 1]. Explain the difference.</p>`,
          a: `<p>On [−1, 1] the correlation is near 0: <em>y</em> rises on both sides, so there's no overall linear trend. On [0, 1], <em>y</em> = <em>x</em>² rises steadily with <em>x</em>, and the correlation is about 0.97. Same relationship, different linear summaries.</p>`
        },
        {
          q: `<p>A company notices that customers who contacted support are more likely to cancel their subscription, and considers making support harder to reach. Name a confounder and propose how to test whether contacting support causes cancellations.</p>`,
          a: `<p>Customers who have problems are both more likely to contact support and more likely to cancel; the problem, not the contact, may drive cancellation. A randomized test: offer an improved support experience (or proactive outreach) to a random half of customers who hit a problem, and compare cancellation rates. Making support harder to reach would likely increase cancellations.</p>`
        }
      ],
      sources: ["grinstead", "openintro", "anscombe73"]
    }
  ]
});

CSA.addUnits("math230", [
    {
      id: "ps5",
      title: "The law of large numbers and the central limit theorem",
      minutes: 90,
      summary: "Why averages settle down and how fast: the Markov and Chebyshev inequalities, the law of large numbers, the central limit theorem and the normal approximation, and what they say about the accuracy of simulations and polls.",
      notes: `
<p>Flip a coin 10 times and you might get 7 heads; flip it 10,000 times and you'll get very close to half heads. Simulations in every lesson so far have agreed with formulas to a few decimal places. This lesson explains why averages become predictable, and gives the formula for how predictable.</p>

<h3>Bounds from the mean and variance</h3>
<p><strong>Markov's inequality.</strong> If <em>X</em> ≥ 0, then for any <em>a</em> &gt; 0,</p>
<p class="math">P(X ≥ a) ≤ E[X] / a</p>
<p>Reason, for a discrete <em>X</em> (for a continuous one, replace the sums by integrals):</p>
<p class="math">E[X] = Σ<sub>x</sub> x P(X = x) ≥ Σ<sub>x ≥ a</sub> x P(X = x) ≥ Σ<sub>x ≥ a</sub> a P(X = x) = a P(X ≥ a)</p>
<p>The first step drops the terms with <em>x</em> &lt; <em>a</em>, which can only make the sum smaller because no term is negative (<em>X</em> ≥ 0). The second replaces each remaining <em>x</em> by <em>a</em>, which is no larger. Dividing by <em>a</em> gives the inequality. If a server's mean response time is 200 ms, at most 20% of responses take a second or more, whatever the distribution. The bound is often loose, but it needs only the mean.</p>
<p><strong>Chebyshev's inequality.</strong> Applying Markov to (<em>X</em> − μ)² gives, for any <em>k</em> &gt; 0,</p>
<p class="math">P(|X − μ| ≥ kσ) ≤ 1/k²</p>
<p>In detail: (<em>X</em> − μ)² is never negative, so Markov applies to it, and its mean is E[(<em>X</em> − μ)²] = σ², the variance. Take <em>a</em> = <em>k</em>²σ². Both sides of |<em>X</em> − μ| ≥ <em>k</em>σ are non-negative, and for non-negative numbers squaring keeps the order, so this event is the same as (<em>X</em> − μ)² ≥ <em>k</em>²σ². Markov then gives P((<em>X</em> − μ)² ≥ <em>k</em>²σ²) ≤ σ²/(<em>k</em>²σ²) = 1/<em>k</em>².</p>
<p>Any distribution puts at most 1/4 of its probability 2 standard deviations or more from its mean, and at most 1/9 at 3σ or more. (For a normal distribution, the true values are about 0.046 and 0.003: Chebyshev is a worst case.)</p>

<h3>The law of large numbers</h3>
<p>Let <em>X</em><sub>1</sub>, …, <em>X</em><sub><em>n</em></sub> be independent and identically distributed (<strong>i.i.d.</strong>), each with mean μ and variance σ², and let <em>X̄</em> = (<em>X</em><sub>1</sub> + … + <em>X</em><sub><em>n</em></sub>)/<em>n</em> be their average. By linearity, E[<em>X̄</em>] = μ. By independence, variances add, so</p>
<p class="math">Var(X̄) = nσ² / n² = σ²/n,   so the standard deviation of X̄ is σ/√n</p>
<p>The quantity σ/√<em>n</em> is called the <strong>standard error</strong> of the mean. Chebyshev then says P(|<em>X̄</em> − μ| ≥ ε) ≤ σ²/(<em>n</em>ε²), which goes to 0 as <em>n</em> grows: the average converges to the mean. This is the <strong>(weak) law of large numbers</strong>. It's what makes frequencies meaningful, casinos profitable, and simulations work.</p>
<p>The √<em>n</em> is the important part. To make the error 10 times smaller, you need 100 times as many samples. A Monte Carlo simulation with a million samples (MATH 131 Lesson 9) is typically accurate to about three decimal places, not six.</p>

<h3>The central limit theorem</h3>
<p>The law of large numbers says <em>X̄</em> gets close to μ. The <strong>central limit theorem</strong> (CLT) says what the remaining error looks like: for large <em>n</em>, <em>X̄</em> is approximately normal,</p>
<p class="math">X̄ ≈ N(μ, σ²/n),   equivalently   (X̄ − μ) / (σ/√n) ≈ N(0, 1)</p>
<p>whatever the distribution of the individual <em>X</em><sub><em>i</em></sub> (as long as its variance is finite). This is why the normal distribution is everywhere: anything that is a sum or average of many small independent effects is approximately normal.</p>
<p><strong>Example.</strong> One die roll has mean 3.5 and variance 35/12 ≈ 2.917. The average of 30 rolls has standard error √(2.917/30) ≈ 0.312, and by the CLT about 95% of such averages lie within 1.96 × 0.312 ≈ 0.61 of 3.5. A simulation of 20,000 sets of 30 rolls gave averages with mean 3.501 and standard deviation 0.311, and 95.3% of them within that range. The distribution of a single die is flat; the distribution of the average is a bell curve.</p>
<pre><code>import random, statistics

random.seed(3)
averages = [statistics.mean(random.randint(1, 6) for _ in range(30))
            for _ in range(20_000)]
print(round(statistics.mean(averages), 3), round(statistics.stdev(averages), 3))
# 3.501 0.311</code></pre>
<p>How large must <em>n</em> be? For symmetric, well-behaved distributions, <em>n</em> = 30 is usually plenty; for very skewed ones (incomes, file sizes), much larger <em>n</em> is needed before the approximation is good.</p>

<h3>Polls and margins of error</h3>
<p>A poll asks <em>n</em> randomly chosen people a yes/no question. Each answer is Bernoulli(<em>p</em>), so the sample proportion <em>p̂</em> has standard error √(<em>p</em>(1 − <em>p</em>)/<em>n</em>), which is at most √(0.25/<em>n</em>). The CLT gives a 95% <strong>margin of error</strong> of about 1.96 √(0.25/<em>n</em>) ≈ 1/√<em>n</em>: about ±3.1 percentage points for 1,000 people. Notice what doesn't appear in the formula: the size of the population. A random sample of 1,000 is as accurate for a country of 300 million as for a city of 300,000. What matters is that the sample is random. A huge but biased sample, such as an online poll that people choose to answer, can be far worse than a small random one.</p>

<h3>Stronger bounds</h3>
<p>For bounded variables, much sharper bounds than Chebyshev's hold. <strong>Hoeffding's inequality</strong> says that the average of <em>n</em> independent variables between 0 and 1 satisfies P(|<em>X̄</em> − μ| ≥ ε) ≤ 2e<sup>−2<em>n</em>ε²</sup>. For <em>n</em> = 1000 and ε = 0.05, that's 2e<sup>−5</sup> ≈ 0.013. Chebyshev's bound for the same case is σ²/(<em>n</em>ε²), and a variable between 0 and 1 has σ² ≤ 1/4: since <em>X</em>² ≤ <em>X</em> when 0 ≤ <em>X</em> ≤ 1, Var(<em>X</em>) = E[<em>X</em>²] − μ² ≤ μ − μ² = μ(1 − μ), which is at most 1/4 (at μ = 1/2). So Chebyshev gives only (1/4)/(1000 × 0.05²) = 0.1. Exponentially small tail bounds of this kind (Chernoff bounds) are the main tool for analyzing randomized algorithms and for learning theory, which asks how much data a machine learning model needs.</p>
`,
      terms: [
        ["Markov's inequality", "For X ≥ 0, P(X ≥ a) ≤ E[X]/a."],
        ["Chebyshev's inequality", "P(|X − μ| ≥ kσ) ≤ 1/k² for any distribution."],
        ["i.i.d.", "Independent and identically distributed: independent random variables with the same distribution."],
        ["Standard error", "The standard deviation of an estimate; for a sample mean, σ/√n."],
        ["Law of large numbers", "The average of many i.i.d. variables converges to their mean."],
        ["Central limit theorem", "The average of many i.i.d. variables with finite variance is approximately normal, with standard deviation σ/√n."],
        ["Margin of error", "The half-width of an interval that contains the true value with stated confidence; about 1/√n for a 95% poll."]
      ],
      quiz: [
        { q: "To halve the error of a Monte Carlo estimate, how many more samples do you need?", choices: ["Twice as many", "Four times as many", "√2 times as many", "Ten times as many"], answer: 1, why: "The error is proportional to 1/√n." },
        { q: "The average download size is 4 MB. What does Markov's inequality say about the fraction of downloads of 20 MB or more?", choices: ["At most 20%", "Exactly 20%", "At most 5%", "At least 20%"], answer: 0, why: "P(X ≥ 20) ≤ 4/20." },
        { q: "What does the central limit theorem say about the average of 100 i.i.d. exponential variables?", choices: ["It is exponential", "It is approximately normal", "It is exactly the mean", "It is uniform"], answer: 1, why: "Averages of many i.i.d. variables with finite variance are approximately normal." },
        { q: "A poll of 2,500 random voters has a 95% margin of error of about:", choices: ["±1%", "±2%", "±4%", "±25%"], answer: 1, why: "About 1/√2500 = 0.02." },
        { q: "Why doesn't the margin of error depend on the population size?", choices: ["It does, strongly", "The standard error depends only on the sample size and p, for a random sample from a large population", "Because populations are infinite", "Because of Markov's inequality"], answer: 1, why: "√(p(1 − p)/n) involves only n." }
      ],
      practice: [
        {
          q: `<p>The number of bugs per 1,000 lines in a codebase has mean 15 and standard deviation 5. Use Chebyshev to bound the fraction of 1,000-line modules with 30 or more bugs. What would a normal model say?</p>`,
          a: `<p>30 is 3σ above the mean: P(|<em>X</em> − 15| ≥ 15) ≤ 1/9, so at most 11%. A normal model gives P(<em>Z</em> ≥ 3) ≈ 0.0013. The truth depends on the real distribution; Chebyshev is guaranteed but loose.</p>`
        },
        {
          q: `<p>You estimate π by Monte Carlo: pick points uniform in the unit square, and 4 × (fraction inside the quarter circle) estimates π. Each point is inside with probability π/4. What is the standard error of the estimate with <em>n</em> points? About how many points give an error of ±0.001 with 95% confidence?</p>`,
          a: `<p>The fraction has standard error √(<em>p</em>(1 − <em>p</em>)/<em>n</em>) with <em>p</em> = π/4 ≈ 0.785, and the estimate multiplies it by 4: 4 × √(0.1685/<em>n</em>) ≈ 1.64/√<em>n</em>. For 1.96 × 1.64/√<em>n</em> = 0.001 we need √<em>n</em> ≈ 3216, <em>n</em> ≈ 10 million points.</p>`
        },
        {
          q: `<p>Simulate the sum of 12 values of <code>random.random()</code>, subtract 6, and repeat 50,000 times. Compute the mean and standard deviation, and the fraction within 1 of 0. What do you notice?</p>`,
          a: `<p>Each uniform has mean 1/2 and variance 1/12, so the sum of 12 minus 6 has mean 0 and variance 1. By the CLT it's close to N(0, 1): the fraction within 1 should be close to 0.683. This was once a common way to generate approximately normal random numbers.</p>`
        },
        {
          q: `<p>An online news site runs a poll answered by 200,000 readers, and 70% favor a policy. A random survey of 1,000 adults finds 52%. Which should you trust, and why?</p>`,
          a: `<p>The random survey. Its margin of error is about ±3%. The online poll's tiny standard error is meaningless because its sample isn't random: readers of the site, and those motivated to answer, differ from the population. Bias doesn't shrink as <em>n</em> grows; random error does.</p>`
        }
      ],
      sources: ["grinstead", "mit1805", "seeingtheory"]
    },
    {
      id: "ps6",
      title: "Estimation and confidence intervals",
      minutes: 90,
      summary: "Estimating unknown quantities from data: estimators and bias, the sample variance, maximum likelihood, confidence intervals for means and proportions and what they do and don't mean, and the bootstrap.",
      notes: `
<p>So far we knew the distribution and computed probabilities. Statistics runs the other way: we have data, and want to learn about the unknown distribution that produced it. How fast is this page, typically? What fraction of users will click the new button? An answer should come with an honest statement of its uncertainty.</p>

<h3>Estimators</h3>
<p>An <strong>estimator</strong> is a rule that turns data into a guess for an unknown parameter. Because the data is random, the estimate is a random variable too, with its own distribution. Two properties matter:</p>
<ul>
<li><strong>Bias:</strong> E[estimate] − true value. An estimator with zero bias is <strong>unbiased</strong>: right on average.</li>
<li><strong>Variance</strong> (or standard error): how much the estimate varies from sample to sample.</li>
</ul>
<p>The sample mean <em>X̄</em> is an unbiased estimator of μ with standard error σ/√<em>n</em> (Lesson 5).</p>
<p>The <strong>sample variance</strong> divides by <em>n</em> − 1, not <em>n</em>:</p>
<p class="math">s² = Σ (x<sub>i</sub> − x̄)² / (n − 1)</p>
<p>Why? The deviations are measured from <em>x̄</em>, which is fitted to the same data and so sits closer to the data than μ does. Here is the calculation, for i.i.d. values with mean μ and variance σ². Write each <em>x</em><sub><em>i</em></sub> − μ as (<em>x</em><sub><em>i</em></sub> − <em>x̄</em>) + (<em>x̄</em> − μ), square, and add over <em>i</em>. The cross terms add up to 2(<em>x̄</em> − μ)Σ(<em>x</em><sub><em>i</em></sub> − <em>x̄</em>) = 0, because deviations from the mean sum to 0. So</p>
<p class="math">Σ (x<sub>i</sub> − x̄)² = Σ (x<sub>i</sub> − μ)² − n(x̄ − μ)²</p>
<p>Now take expectations. Each E[(<em>x</em><sub><em>i</em></sub> − μ)²] is σ², so the first sum has expectation <em>n</em>σ². And E[(<em>x̄</em> − μ)²] = Var(<em>x̄</em>) = σ²/<em>n</em> (Lesson 5), so the second term has expectation σ². Therefore E[Σ(<em>x</em><sub><em>i</em></sub> − <em>x̄</em>)²] = (<em>n</em> − 1)σ². Dividing by <em>n</em> would give (<em>n</em> − 1)σ²/<em>n</em> on average, too small by the factor (<em>n</em> − 1)/<em>n</em>; dividing by <em>n</em> − 1 gives exactly σ² on average, so <em>s</em>² is unbiased. Python's <code>statistics.variance</code> and <code>stdev</code> use <em>n</em> − 1; <code>pvariance</code> and <code>pstdev</code> ("population") use <em>n</em>.</p>

<h3>Maximum likelihood</h3>
<p>A general recipe for estimators is <strong>maximum likelihood</strong>: choose the parameter value under which the observed data is most probable. For <em>k</em> heads in <em>n</em> flips of a coin with unknown <em>p</em>, the likelihood is <em>L</em>(<em>p</em>) = <em>p</em><sup><em>k</em></sup>(1 − <em>p</em>)<sup><em>n</em>−<em>k</em></sup>. Maximizing its logarithm, <em>k</em> ln <em>p</em> + (<em>n</em> − <em>k</em>) ln(1 − <em>p</em>), by setting the derivative <em>k</em>/<em>p</em> − (<em>n</em> − <em>k</em>)/(1 − <em>p</em>) to 0 (MATH 130's optimization), gives <em>p̂</em> = <em>k</em>/<em>n</em>: the observed proportion, as you'd expect. For exponential waiting times, the maximum-likelihood rate is 1/<em>x̄</em>. Fitting a machine learning model is usually maximum likelihood (or a close relative) on a large scale, with gradient descent (MATH 131 Lesson 8) doing the maximizing.</p>

<h3>Confidence intervals</h3>
<p>A single number hides its uncertainty. A <strong>confidence interval</strong> gives a range. By the CLT, <em>X̄</em> is within 1.96 standard errors of μ with probability about 0.95. Turning that around, the interval</p>
<p class="math">x̄ ± 1.96 · s/√n</p>
<p>is an approximate <strong>95% confidence interval</strong> for μ (using <em>s</em> to estimate σ).</p>
<p><strong>Example.</strong> Ten page loads take 1.2, 0.9, 1.5, 1.1, 1.3, 0.8, 1.6, 1.0, 1.2 and 1.4 seconds. Then <em>x̄</em> = 1.2, <em>s</em> ≈ 0.258, and the standard error is 0.258/√10 ≈ 0.082. The interval is 1.2 ± 0.16, from about 1.04 to 1.36 seconds. </p>
<p><strong>Small samples and the <em>t</em> distribution.</strong> With only 10 values, using <em>s</em> in place of σ adds uncertainty: <em>s</em> itself varies from sample to sample, and when it comes out small the interval is too narrow. In 1908 William Gosset, a chemist at the Guinness brewery who published as "Student", worked out the distribution of (<em>x̄</em> − μ)/(<em>s</em>/√<em>n</em>) for normally distributed data. It is called the <strong><em>t</em> distribution</strong> (with <em>n</em> − 1 "degrees of freedom"). It is bell-shaped like the standard normal but has heavier tails, and it gets closer to the normal as <em>n</em> grows. Its derivation is beyond this course, so the values are stated here without proof: the number that replaces 1.96 for a 95% interval is 2.776 for 5 values, 2.262 for 10, 2.045 for 30 and 1.984 for 100. For the page loads, 1.2 ± 2.262 × 0.0816 ≈ 1.2 ± 0.18, from about 1.02 to 1.38 seconds. For <em>n</em> above about 30 the difference from 1.96 is small. You can check 2.262 by simulation: draw many samples of 10 standard normal values (μ = 0), compute the statistic for each, and find the value that 97.5% of them fall below. <code>random.gauss(mu, sigma)</code> draws one normal value with mean <code>mu</code> and <em>standard deviation</em> <code>sigma</code>. Notice that the second argument is σ, not the variance σ² that the notation N(μ, σ²) shows: <code>random.gauss(0, 1)</code> is N(0, 1), and <code>random.gauss(5, 2)</code> is N(5, 4).</p>
<pre><code>import random, math

random.seed(7)
ts = []
for _ in range(100_000):
    xs = [random.gauss(0, 1) for _ in range(10)]
    m = sum(xs) / 10
    s = math.sqrt(sum((x - m) ** 2 for x in xs) / 9)
    ts.append(m / (s / math.sqrt(10)))   # (x̄ − μ)/(s/√n) with μ = 0
ts.sort()
print(round(ts[97_500], 2))   # 2.27: close to 2.262 (other seeds give 2.24 to 2.28)</code></pre>
<p>For a proportion, the interval is <em>p̂</em> ± 1.96 √(<em>p̂</em>(1 − <em>p̂</em>)/<em>n</em>).</p>
<div class="callout"><p><strong>What "95% confidence" means.</strong> The <em>procedure</em> produces intervals that contain the true value 95% of the time, over repeated samples. In a simulation of 10,000 samples of 40 normal values, 94.6% of the intervals contained the true mean. It does <em>not</em> mean "there's a 95% probability that μ is in this particular interval": μ is a fixed number, and this interval either contains it or doesn't. (The Bayesian approach of Lesson 1 does produce statements of that kind, by starting from a prior.)</p></div>

<h3>The bootstrap</h3>
<p>Formulas like ±1.96<em>s</em>/√<em>n</em> exist for means and proportions. What about a median, a 99th percentile, or a ratio of two means? In 1979 Bradley Efron proposed the <strong>bootstrap</strong>: since the sample is our best picture of the population, simulate new samples by drawing from the data itself, <em>with replacement</em>, many times; compute the statistic for each; and use the spread of those values as its uncertainty.</p>
<pre><code>import random, statistics

times = [1.2, 0.9, 1.5, 1.1, 1.3, 0.8, 1.6, 1.0, 1.2, 1.4]
random.seed(5)
boots = sorted(statistics.mean(random.choices(times, k=len(times)))
               for _ in range(10_000))
print(boots[250], boots[9749])    # 1.05 1.35: the middle 95% of the bootstrap means</code></pre>
<p>The bootstrap interval (1.05 to 1.35) is close to the formula's, and the same code works for any statistic: replace <code>mean</code> with <code>median</code>. It needs only a computer, which is why it changed statistical practice. It can fail for very small samples, or for statistics that depend on extremes, such as the maximum.</p>
`,
      terms: [
        ["Estimator", "A rule that turns data into a guess for an unknown parameter."],
        ["Bias", "The difference between an estimator's expected value and the true value."],
        ["Sample variance", "s² = Σ(xᵢ − x̄)²/(n − 1), an unbiased estimate of the variance."],
        ["Maximum likelihood", "Estimating parameters by the values that make the observed data most probable."],
        ["t distribution", "The distribution of (x̄ − μ)/(s/√n) for normal data; it replaces 1.96 with a larger value for small samples, such as 2.262 for n = 10."],
        ["Confidence interval", "An interval from a procedure that captures the true value a stated fraction of the time, such as 95%."],
        ["Bootstrap", "Estimating uncertainty by recomputing a statistic on many resamples, drawn with replacement from the data."]
      ],
      quiz: [
        { q: "Why does the sample variance divide by n − 1?", choices: ["It's a convention with no reason", "Deviations from x̄ are systematically smaller than from μ, so dividing by n underestimates the variance", "To make it larger for safety", "Because one value is always an outlier"], answer: 1, why: "Dividing by n − 1 corrects that bias." },
        { q: "In 400 flips a coin lands heads 220 times. What is the maximum-likelihood estimate of p?", choices: ["0.5", "0.55", "0.45", "220"], answer: 1, why: "p̂ = k/n = 220/400." },
        { q: "A 95% confidence interval for mean load time is (1.04, 1.36). Which statement is correct?", choices: ["There's a 95% chance the true mean is in (1.04, 1.36)", "95% of loads take between 1.04 and 1.36 s", "The procedure gives intervals that contain the true mean 95% of the time", "The true mean is 1.2"], answer: 2, why: "Confidence describes the procedure, not this one interval, and it's about the mean, not individual loads." },
        { q: "How does the width of a confidence interval for a mean change if the sample is 4 times larger?", choices: ["It halves", "It quarters", "It doubles", "It doesn't change"], answer: 0, why: "The standard error is s/√n." },
        { q: "In the bootstrap, resamples are drawn:", choices: ["From a normal distribution", "From the original data, with replacement", "From the original data, without replacement", "From new data"], answer: 1, why: "With replacement, so each resample differs from the original." }
      ],
      practice: [
        {
          q: `<p>Out of 500 users shown a new feature, 60 used it. Give a 95% confidence interval for the true usage rate.</p>`,
          a: `<p><em>p̂</em> = 0.12; standard error √(0.12 × 0.88/500) ≈ 0.0145; interval 0.12 ± 0.028, about 9.2% to 14.8%.</p>`
        },
        {
          q: `<p>Find the maximum-likelihood estimate of the rate λ from waiting times <em>x</em><sub>1</sub>, …, <em>x</em><sub><em>n</em></sub> assumed exponential, by maximizing the log-likelihood Σ (ln λ − λ<em>x</em><sub><em>i</em></sub>).</p>`,
          a: `<p>The log-likelihood is <em>n</em> ln λ − λΣ<em>x</em><sub><em>i</em></sub>. Its derivative <em>n</em>/λ − Σ<em>x</em><sub><em>i</em></sub> is 0 at λ = <em>n</em>/Σ<em>x</em><sub><em>i</em></sub> = 1/<em>x̄</em>. (The second derivative, −<em>n</em>/λ², is negative, so it's a maximum.)</p>`
        },
        {
          q: `<p>Simulate the meaning of confidence: draw 40 values from <code>random.gauss(5, 2)</code>, build the interval <em>x̄</em> ± 1.96<em>s</em>/√40, and check whether it contains 5. Repeat 10,000 times. What fraction contain 5? Repeat with samples of size 5.</p>`,
          a: `<p>With <em>n</em> = 40, about 94.5–95%. With <em>n</em> = 5, noticeably fewer, around 88%, because using <em>s</em> instead of σ matters more for small samples; the <em>t</em>-distribution value for 5 values (2.776) restores 95%.</p>`
        },
        {
          q: `<p>Use the bootstrap to give a 95% interval for the <em>median</em> of the ten load times in the notes. Why might the interval be lumpy (repeating values)?</p>`,
          a: `<p>Replace <code>statistics.mean</code> with <code>statistics.median</code>; a typical result is roughly 1.05 to 1.35. The median of 10 values is always one data value or the average of two, so bootstrap medians take only a few distinct values, and the interval's ends jump between them.</p>`
        }
      ],
      sources: ["openintro", "mit1805", "efron79"]
    },
    {
      id: "ps7",
      title: "Hypothesis tests and A/B testing",
      minutes: 90,
      summary: "Deciding whether an observed difference is real: null hypotheses, p-values, permutation tests and the z-test for proportions, errors of both kinds and statistical power, choosing a sample size, and the misuses of p-values that produce false discoveries.",
      notes: `
<p>A company shows a new checkout page (version B) to 1,000 visitors and the old one (A) to another 1,000, chosen at random. 125 of B's visitors buy, against 100 of A's: 12.5% versus 10%. Is B better, or could chance alone produce a gap like this? Hypothesis testing gives a disciplined answer. Running such randomized comparisons is called <strong>A/B testing</strong>, and large technology companies run thousands of them every year.</p>

<h3>The logic of a test</h3>
<ol>
<li>State a <strong>null hypothesis</strong> <em>H</em><sub>0</sub>, the "nothing is going on" explanation: both versions have the same purchase rate.</li>
<li>Choose a <strong>test statistic</strong> that measures the effect: here, the difference in purchase rates, 0.025.</li>
<li>Compute the <strong>p-value</strong>: the probability, <em>if H<sub>0</sub> were true</em>, of a test statistic at least as extreme as the one observed.</li>
<li>A small p-value means the data would be surprising under <em>H</em><sub>0</sub>, which counts as evidence against it. By a widespread convention, <em>p</em> &lt; 0.05 is called <strong>statistically significant</strong>.</li>
</ol>

<h3>A permutation test</h3>
<p>The most transparent way to compute a p-value is by simulation. If the version made no difference, the labels A and B are arbitrary: the same 225 buyers would have bought whatever page they saw. So shuffle the labels: pool all 2,000 visitors, deal them randomly into two groups of 1,000, and compute the difference. Repeat many times. The fraction of shuffles giving a difference at least as large as the real one (in either direction) is the p-value.</p>
<pre><code>import random

random.seed(1)
visitors = [1] * 225 + [0] * 1775          # 1 = bought, pooled over A and B
observed = 125 / 1000 - 100 / 1000
extreme, trials = 0, 20_000
for _ in range(trials):
    random.shuffle(visitors)
    diff = sum(visitors[1000:]) / 1000 - sum(visitors[:1000]) / 1000
    if abs(diff) &gt;= observed - 1e-12:      # small tolerance for float rounding
        extreme += 1
print(extreme / trials)    # about 0.087</code></pre>
<p>About 9% of random shuffles produce a gap of 2.5 points or more. So a difference this size happens fairly often by chance alone, and by the 0.05 convention this test is <em>not</em> significant. That doesn't show B is no better; the experiment was too small to tell.</p>

<h3>The z-test for two proportions</h3>
<p>The CLT gives the same answer without simulation. Under <em>H</em><sub>0</sub>, both groups share the pooled rate <em>p</em> = 225/2000 = 0.1125, and the difference of two proportions has standard error √(<em>p</em>(1 − <em>p</em>)(1/1000 + 1/1000)) ≈ 0.0141. The observed difference is 0.025/0.0141 ≈ 1.77 standard errors, and a standard normal is at least that far from 0 with probability about 0.077. The two methods agree roughly (0.077 versus 0.087); the permutation test makes fewer assumptions.</p>
<p><strong>Two-sided and one-sided tests.</strong> Both p-values above are <strong>two-sided</strong>: they count results at least as extreme in <em>either</em> direction, B ahead of A by 2.5 points or more, or A ahead of B by as much. That is the right choice when a difference either way would matter, and it is the usual default. A <strong>one-sided</strong> test counts only one direction, which must be chosen before seeing the data (for example, only "B ahead"). When the distribution under <em>H</em><sub>0</sub> is symmetric, as here, the one-sided p-value is half the two-sided one: about 0.038 for the z-test. Picking the direction after seeing which way the data went would halve the p-value for free, which is a form of p-hacking (below). This course uses two-sided tests.</p>

<h3>Two kinds of error, and power</h3>
<table>
<thead><tr><th></th><th>H<sub>0</sub> true (no real effect)</th><th>H<sub>0</sub> false (real effect)</th></tr></thead>
<tbody>
<tr><td>Reject H<sub>0</sub></td><td><strong>Type I error</strong> (false positive): probability α, the significance level</td><td>Correct</td></tr>
<tr><td>Don't reject</td><td>Correct</td><td><strong>Type II error</strong> (false negative)</td></tr>
</tbody>
</table>
<p>The <strong>significance level</strong> α is the threshold chosen before the test, usually 0.05: reject H<sub>0</sub> when <em>p</em> &lt; α. If H<sub>0</sub> is true, that happens with probability about α (at most α for an exact test). (This α is not Lesson 2's load factor; statistics uses the letter this way by long convention.)</p>
<p>The <strong>power</strong> of a test is the probability of detecting a real effect of a given size. It grows with the sample size. A standard formula says that to detect a change from 10% to 12.5% with α = 0.05 and 80% power needs about</p>
<p class="math">n ≈ (1.96 + 0.84)² × (0.10 × 0.90 + 0.125 × 0.875) / 0.025² ≈ 2,500 per group</p>
<p>(1.96 for the significance level, 0.84 for 80% power). Where does it come from? Let δ = <em>p</em><sub>2</sub> − <em>p</em><sub>1</sub> be the true difference and <em>n</em> the number of visitors per group. The observed difference <em>D</em> of the two proportions has variance <em>p</em><sub>1</sub>(1 − <em>p</em><sub>1</sub>)/<em>n</em> + <em>p</em><sub>2</sub>(1 − <em>p</em><sub>2</sub>)/<em>n</em> (each proportion's variance is <em>p</em>(1 − <em>p</em>)/<em>n</em>, as in Lesson 5's polls, and for independent groups Var(<em>X</em> − <em>Y</em>) = Var(<em>X</em>) + Var(<em>Y</em>), Lesson 4); call its square root SE. The test rejects <em>H</em><sub>0</sub> when <em>D</em> is more than 1.96 SE above 0. (This ignores two small things: the test's SE is the pooled one, slightly different, and it could also reject with <em>D</em> far below 0, which is very unlikely when the true δ is positive.) By the CLT, <em>D</em> is approximately N(δ, SE²), so</p>
<p class="math">power = P(D &gt; 1.96 SE) = P(Z &gt; 1.96 − δ/SE)</p>
<p>with <em>Z</em> standard normal. A standard normal is above −0.84 with probability 0.80, because 0.84 is its 80th percentile (<code>NormalDist().inv_cdf(0.8)</code> is 0.8416). So 80% power needs 1.96 − δ/SE = −0.84, that is, δ = (1.96 + 0.84) SE. Squaring both sides and solving for <em>n</em> gives the formula above. The experiment above, with 1,000 per group, was underpowered. Deciding the sample size <em>before</em> running a test is essential.</p>

<h3>How p-values go wrong</h3>
<p>A p-value is <em>not</em> the probability that the null hypothesis is true, nor the probability that the result is a fluke. It's a statement about the data assuming <em>H</em><sub>0</sub>. In 2016 the American Statistical Association took the unusual step of publishing a statement on p-values, warning against these misreadings and against treating 0.05 as a bright line. Common misuses:</p>
<ul>
<li><strong>Multiple comparisons.</strong> Test 20 independent features that have no effect at α = 0.05, and the chance that at least one comes out "significant" is 1 − 0.95<sup>20</sup> ≈ 0.64. Report only that one and you've reported noise. The simplest correction (Bonferroni) uses α/20 = 0.0025 for each test.</li>
<li><strong>Peeking.</strong> Checking the p-value every day and stopping as soon as it dips below 0.05 greatly inflates the false-positive rate, because the difference between the groups, recomputed each day, behaves like a <strong>random walk</strong>: a quantity that takes a random step up or down each time new data arrives. Even when there is no effect, such a walk often strays far enough for the p-value to dip below 0.05 at some point, before it wanders back. Fix the sample size in advance, or use methods designed for sequential testing.</li>
<li><strong>p-hacking.</strong> Trying different subsets, outcome measures or analyses until something is significant.</li>
<li><strong>Significance isn't importance.</strong> With millions of users, a 0.01% improvement can be highly significant and practically worthless. Report the size of the effect, with a confidence interval (Lesson 6), not just the p-value.</li>
</ul>
<p>Such practices contributed to the "replication crisis" of the 2010s, when large projects found that many published findings in psychology and medicine didn't hold up when the experiments were repeated.</p>
`,
      terms: [
        ["A/B test", "A randomized experiment comparing two versions by assigning users to each at random."],
        ["Null hypothesis", "H₀, the hypothesis of no effect or no difference, which a test tries to find evidence against."],
        ["p-value", "The probability, if H₀ were true, of a result at least as extreme as the one observed."],
        ["Permutation test", "Computing a p-value by randomly shuffling group labels and seeing how often the effect is as large as observed."],
        ["Type I and type II error", "Rejecting a true null hypothesis (false positive), or failing to reject a false one (false negative)."],
        ["Two-sided and one-sided tests", "A two-sided test counts results as extreme as the observed one in either direction; a one-sided test, only in one direction chosen in advance."],
        ["Power", "The probability that a test detects a real effect of a given size."],
        ["Multiple comparisons", "Running many tests, which makes some false positives likely unless the significance level is adjusted."]
      ],
      quiz: [
        { q: "A test gives p = 0.03. What does this mean?", choices: ["There's a 3% chance the null hypothesis is true", "If the null hypothesis were true, a result this extreme would occur about 3% of the time", "The effect is 3%", "There's a 97% chance the effect is real"], answer: 1, why: "The p-value is computed assuming H₀." },
        { q: "In a permutation test, what is shuffled?", choices: ["The outcomes within each group", "The group labels, pooling all observations", "The order of the experiments", "The significance level"], answer: 1, why: "Under H₀, the labels don't matter, so shuffling them shows what chance alone produces." },
        { q: "A team tests 10 independent features with no real effect at α = 0.05. About how likely is at least one significant result?", choices: ["5%", "40%", "50%", "95%"], answer: 1, why: "1 − 0.95¹⁰ ≈ 0.40." },
        { q: "How do you increase a test's power to detect a given effect?", choices: ["Use a larger sample", "Peek more often", "Use a two-sided test", "Lower the effect size"], answer: 0, why: "Larger samples shrink the standard error." },
        { q: "An A/B test on 10 million users finds a 0.02% improvement with p = 0.001. What should you conclude?", choices: ["The change is important", "The effect is probably real but may be too small to matter; look at its size", "The test is broken", "p-values don't apply to large tests"], answer: 1, why: "Statistical significance is not practical importance." }
      ],
      practice: [
        {
          q: `<p>Version A converts 200 of 2,000 visitors and version B 250 of 2,000. Compute the z-statistic and two-sided p-value for the difference. Is it significant at 0.05?</p>`,
          a: `<p>Rates 0.10 and 0.125; pooled <em>p</em> = 450/4000 = 0.1125; standard error √(0.1125 × 0.8875 × 2/2000) ≈ 0.0100; <em>z</em> = 0.025/0.0100 ≈ 2.50; two-sided p ≈ 0.012. Significant. The same rates as the notes' example, with twice the data, now give strong evidence.</p>`
        },
        {
          q: `<p>Adapt the permutation-test code to the data in the previous problem and compare its p-value with the z-test's.</p>`,
          a: `<p>Pool 450 ones and 3,550 zeros, split into two groups of 2,000 each time, and count shuffles with |difference| ≥ 0.025. Expect about 0.012–0.015, close to the z-test.</p>`
        },
        {
          q: `<p>A colleague runs an A/B test, checks the p-value each morning, and stops on day 6 when it reaches 0.04. Explain why the real false-positive rate of this procedure is higher than 5%, and propose a better plan.</p>`,
          a: `<p>Each daily check is another chance for random variation to cross 0.05; the procedure rejects if <em>any</em> of the checks does, which is more likely than a single check doing so. Plan instead: compute the needed sample size beforehand, run until it's reached, and test once (or use a sequential method with adjusted thresholds).</p>`
        },
        {
          q: `<p>How many visitors per group are needed to detect an improvement from 5% to 6% with α = 0.05 and 80% power, using the formula in the notes?</p>`,
          a: `<p>(2.80)² × (0.05 × 0.95 + 0.06 × 0.94)/0.01² = 7.84 × 0.1039/0.0001 ≈ 8,150 per group. Detecting small differences in small rates takes large samples.</p>`
        }
      ],
      sources: ["openintro", "asa16", "mit1805"]
    },
    {
      id: "ps8",
      title: "Linear regression",
      minutes: 90,
      summary: "Predicting one variable from another: the least-squares line in statistical terms, slope and correlation, R², residuals, prediction and its limits, overfitting and held-out data, and regression toward the mean.",
      notes: `
<p>MATH 220 Lesson 6 fitted lines by least squares as a problem in geometry. Statistics asks further questions about the same line. How well does it predict? How confident can we be in its slope? When does it mislead?</p>

<h3>The least-squares line, statistically</h3>
<p>Given data (<em>x</em><sub>1</sub>, <em>y</em><sub>1</sub>), …, (<em>x</em><sub><em>n</em></sub>, <em>y</em><sub><em>n</em></sub>), the line <em>ŷ</em> = <em>a</em> + <em>bx</em> minimizing the sum of squared errors has</p>
<p class="math">b = Cov(x, y) / Var(x) = r · s<sub>y</sub> / s<sub>x</sub>,     a = ȳ − b x̄</p>
<p>where <em>r</em> is the correlation (Lesson 4) and <em>s</em><sub><em>x</em></sub>, <em>s</em><sub><em>y</em></sub> the standard deviations. Here, applied to data, Cov(<em>x</em>, <em>y</em>) and Var(<em>x</em>) mean Lesson 4's sample versions, <em>s</em><sub><em>xy</em></sub> and <em>s</em><sub><em>x</em></sub>², both with denominator <em>n</em> − 1 (the denominators cancel in <em>b</em>, so dividing both by <em>n</em> gives the same slope). The line always passes through (<em>x̄</em>, <em>ȳ</em>).</p>
<p>These are the solutions of MATH 220 Lesson 6's normal equations, written in statistical language. For the line <em>y</em> = <em>c</em> + <em>mx</em> there, the equations were <em>nc</em> + (Σ<em>x</em>)<em>m</em> = Σ<em>y</em> and (Σ<em>x</em>)<em>c</em> + (Σ<em>x</em>²)<em>m</em> = Σ<em>xy</em>. Divide the first by <em>n</em>: <em>c</em> + <em>x̄m</em> = <em>ȳ</em>, so <em>c</em> = <em>ȳ</em> − <em>mx̄</em>, which is the formula for <em>a</em>. Put this into the second, and use Σ<em>x</em> = <em>nx̄</em>:</p>
<p class="math">nx̄(ȳ − mx̄) + (Σx²)m = Σxy,   so   m(Σx² − nx̄²) = Σxy − nx̄ȳ</p>
<p>Expanding the squares and products shows that Σ<em>x</em>² − <em>nx̄</em>² = Σ(<em>x</em> − <em>x̄</em>)² and Σ<em>xy</em> − <em>nx̄ȳ</em> = Σ(<em>x</em> − <em>x̄</em>)(<em>y</em> − <em>ȳ</em>). So <em>m</em> = Σ(<em>x</em> − <em>x̄</em>)(<em>y</em> − <em>ȳ</em>)/Σ(<em>x</em> − <em>x̄</em>)², and dividing top and bottom by <em>n</em> − 1 gives <em>s</em><sub><em>xy</em></sub>/<em>s</em><sub><em>x</em></sub>², the formula for <em>b</em>. Since <em>r</em> = <em>s</em><sub><em>xy</em></sub>/(<em>s</em><sub><em>x</em></sub><em>s</em><sub><em>y</em></sub>), this is also <em>r</em> · <em>s</em><sub><em>y</em></sub>/<em>s</em><sub><em>x</em></sub>.</p>
<p><strong>Example.</strong> Six students report hours studied and exam scores: (1, 52), (2, 58), (3, 61), (4, 70), (5, 74), (6, 81). Here <em>x̄</em> = 3.5, <em>ȳ</em> = 66, the sample covariance is Cov = 101/5 = 20.2 and the sample variance is Var(<em>x</em>) = 17.5/5 = 3.5, so <em>b</em> = 20.2/3.5 ≈ 5.77 points per hour and <em>a</em> = 66 − 5.77 × 3.5 = 45.8.</p>
<pre><code>from statistics import linear_regression, correlation

hours = [1, 2, 3, 4, 5, 6]
score = [52, 58, 61, 70, 74, 81]
fit = linear_regression(hours, score)
print(round(fit.slope, 2), round(fit.intercept, 1))   # 5.77 45.8
print(round(correlation(hours, score) ** 2, 3))        # 0.988</code></pre>

<h3>R² and residuals</h3>
<p>The <strong>residuals</strong> <em>y</em><sub><em>i</em></sub> − <em>ŷ</em><sub><em>i</em></sub> are what the line fails to explain. Their spread compared with the spread of <em>y</em> gives the <strong>coefficient of determination</strong>:</p>
<p class="math">R² = 1 − Σ(y<sub>i</sub> − ŷ<sub>i</sub>)² / Σ(y<sub>i</sub> − ȳ)²</p>
<p>the fraction of the variance in <em>y</em> that the line explains. For a straight-line fit, <em>R</em>² = <em>r</em>². Here it's 0.988: hours studied account for almost all the variation in these six scores (a suspiciously tidy dataset; real data is noisier).</p>
<p>Always plot the residuals against <em>x</em>. If they show a pattern (a curve, or a spread that grows with <em>x</em>), a straight line is the wrong model, whatever <em>R</em>² says. Anscombe's quartet (Lesson 4) has four datasets with identical regression lines and <em>R</em>², and only one of them is well described by its line.</p>

<h3>Prediction and its limits</h3>
<p>The line predicts 45.8 + 5.77 × 7 ≈ 86 for a student who studies 7 hours. For 20 hours it predicts 161, on an exam marked out of 100. Predicting outside the range of the data, <strong>extrapolation</strong>, assumes the pattern continues where nothing was observed, and is often badly wrong. And a regression on observational data shows association, not causation (Lesson 4): students who study more may also sleep more, attend more classes, or simply have more free time.</p>
<p>The slope estimate has its own uncertainty, with a standard error and a confidence interval computed much as in Lesson 6, which statistical software reports. With six data points, any conclusion is fragile.</p>

<h3>Overfitting</h3>
<p>More flexible models fit the data better: a polynomial of degree 5 passes exactly through any six points, with <em>R</em>² = 1. But its wiggles fit the noise, not the pattern, and it predicts new data badly. This is <strong>overfitting</strong>, the central danger of all model fitting, including machine learning. The standard defense is to evaluate a model on data it wasn't fitted to: split the data into a <strong>training set</strong> for fitting and a <strong>test set</strong> for measuring prediction error (or rotate the roles among several parts, <strong>cross-validation</strong>). A model that fits training data much better than test data is overfitting. Choose the model that predicts held-out data best.</p>
<p>To try this yourself you need to fit a polynomial, which the <code>statistics</code> module can't do. NumPy can; MATH 220 Lesson 1 ends with a short introduction to it, including how to install it. <code>np.polyfit(xs, ys, d)</code> returns the coefficients of the least-squares polynomial of degree <em>d</em>: MATH 220 Lesson 6's method, with columns 1, <em>x</em>, <em>x</em>², …, <em>x</em><sup><em>d</em></sup>. They come as an array, highest power first. <code>np.polyval(coef, x)</code> evaluates that polynomial at <em>x</em>. For example, <code>np.polyfit([0, 1, 2], [1, 3, 7], 2)</code> gives <code>[1. 1. 1.]</code> (up to rounding), the parabola <em>x</em>² + <em>x</em> + 1, which passes exactly through the three points.</p>
<p>Multiple regression extends all of this to several predictors, <em>ŷ</em> = <em>a</em> + <em>b</em><sub>1</sub><em>x</em><sub>1</sub> + <em>b</em><sub>2</sub><em>x</em><sub>2</sub> + …, solved by exactly MATH 220's normal equations with more columns. Logistic regression, which predicts probabilities for yes/no outcomes, is fitted by maximum likelihood (Lesson 6). Both are workhorses of data science and the starting point of machine learning.</p>

<h3>Regression toward the mean</h3>
<p>The word "regression" comes from an observation by Francis Galton in the 1880s: very tall parents tend to have children who are tall, but less extremely so. The same happens wherever two measurements are imperfectly correlated. The students with the best scores on one exam tend to do a little worse on the next, because part of their extreme result was luck that doesn't repeat. This <strong>regression toward the mean</strong> fools people constantly. A manager praises the best performers and criticizes the worst; next quarter the best get worse and the worst get better, and the manager concludes that criticism works better than praise. A treatment given to people at their worst moment appears to help, because they would have improved anyway. Randomized comparison groups (Lesson 7) are the protection.</p>
`,
      terms: [
        ["Least-squares line", "ŷ = a + bx with b = Cov(x, y)/Var(x) and a = ȳ − bx̄; it passes through the means."],
        ["Residual", "y − ŷ, the part of an observation the model doesn't explain."],
        ["R²", "The fraction of the variance in y explained by the model; r² for a line."],
        ["Extrapolation", "Predicting outside the range of the data the model was fitted to."],
        ["Overfitting", "A model fitting the noise in its training data and predicting new data poorly."],
        ["Training and test sets", "Data used to fit a model, and separate data used to measure its predictions."],
        ["Regression toward the mean", "Extreme measurements tend to be followed by less extreme ones when two measurements are imperfectly correlated."]
      ],
      quiz: [
        { q: "Cov(x, y) = 12 and Var(x) = 4. What is the slope of the least-squares line?", choices: ["48", "3", "1/3", "16"], answer: 1, why: "b = Cov/Var = 12/4." },
        { q: "The correlation between x and y is −0.6. What is R² for the least-squares line?", choices: ["−0.36", "0.36", "0.6", "−0.6"], answer: 1, why: "R² = r² = 0.36, never negative." },
        { q: "A degree-9 polynomial fits 10 training points exactly. What should you expect on new data?", choices: ["Perfect predictions", "Probably worse predictions than a simpler model: it has fit the noise", "The same R²", "It can't be evaluated"], answer: 1, why: "That's overfitting; check on a test set." },
        { q: "The pilots with the best landings one week are praised; the next week their landings are worse. What's the most likely explanation?", choices: ["Praise makes pilots worse", "Regression toward the mean: part of the best landings was luck", "The instructors changed", "Measurement error got larger"], answer: 1, why: "Extreme results are partly chance, which doesn't repeat." },
        { q: "Why is predicting the score for 20 hours of study from data with 1–6 hours risky?", choices: ["The slope is negative", "It's extrapolation: the line may not hold outside the observed range", "R² is too high", "Regression can't predict"], answer: 1, why: "Nothing in the data shows what happens at 20 hours." }
      ],
      practice: [
        {
          q: `<p>Compute the residuals for the six students and check that they add up to 0. Which student did best relative to the line?</p>`,
          a: `<p>Predictions 45.8 + 5.771<em>x</em>: 51.57, 57.34, 63.11, 68.89, 74.66, 80.43. Residuals: 0.43, 0.66, −2.11, 1.11, −0.66, 0.57, summing to 0 (up to rounding). The student who studied 4 hours, 1.1 points above the line.</p>`
        },
        {
          q: `<p>Show that the least-squares line passes through (<em>x̄</em>, <em>ȳ</em>).</p>`,
          a: `<p>At <em>x</em> = <em>x̄</em>, <em>ŷ</em> = <em>a</em> + <em>bx̄</em> = (<em>ȳ</em> − <em>bx̄</em>) + <em>bx̄</em> = <em>ȳ</em>.</p>`
        },
        {
          q: `<p>Generate 20 points with <em>x</em> from 0 to 1 and <em>y</em> = 2<em>x</em> + <code>random.gauss(0, 0.3)</code>, normal noise with standard deviation 0.3 (Lesson 6). Use 10 for training and 10 for testing. Fit a line (with <code>statistics.linear_regression</code>) and, with NumPy's <code>np.polyfit</code> (described in the notes' section on overfitting), a degree-8 polynomial to the training points. Compare the <strong>mean squared error</strong> (the average of the squared residuals) of each on the training points and on the test points.</p>`,
          hint: `<p>Take <em>x</em> = <em>i</em>/19 for <em>i</em> = 0, …, 19, and use every other point for training: <code>xs[0::2]</code> and <code>xs[1::2]</code>. Write <code>mse(predict, xs, ys)</code> that takes a function <code>predict</code>. For the line, <code>predict</code> is <code>lambda x: fit.intercept + fit.slope * x</code>; for the polynomial, <code>coef = np.polyfit(train_x, train_y, 8)</code> and <code>lambda x: np.polyval(coef, x)</code>.</p>`,
          a: `<pre><code>import random, statistics
import numpy as np

random.seed(2)
xs = [i / 19 for i in range(20)]
ys = [2 * x + random.gauss(0, 0.3) for x in xs]
train_x, train_y = xs[0::2], ys[0::2]
test_x, test_y = xs[1::2], ys[1::2]

def mse(predict, x, y):
    return sum((predict(a) - b) ** 2 for a, b in zip(x, y)) / len(x)

fit = statistics.linear_regression(train_x, train_y)
line = lambda x: fit.intercept + fit.slope * x
coef = np.polyfit(train_x, train_y, 8)
poly = lambda x: np.polyval(coef, x)
print(round(mse(line, train_x, train_y), 3), round(mse(line, test_x, test_y), 3))   # 0.074 0.15
print(round(mse(poly, train_x, train_y), 3), round(mse(poly, test_x, test_y), 3))   # 0.001 0.841</code></pre><p>Typically the polynomial has much smaller training error but much larger test error than the line, sometimes enormously larger near the ends of the interval where it oscillates. The line, which matches how the data was generated, predicts better.</p>`
        },
        {
          q: `<p>A school gives extra tutoring to the 10% of students with the lowest scores on a first test. On the second test, their scores rise by 8 points on average. Does this show tutoring works? What design would?</p>`,
          a: `<p>No: the lowest scorers would be expected to improve somewhat anyway, by regression toward the mean. Randomly assign half of the low scorers to tutoring and compare the two groups' improvements; the difference estimates the tutoring effect.</p>`
        }
      ],
      sources: ["openintro", "mit1805", "anscombe73"]
    }
]);

CSA.addAsides("math230", {
  ps1: [
    { kind: "history", title: "A plan for spam", html: `<p>By 2002, unsolicited email was overwhelming inboxes and hand-written filtering rules were losing. In an essay that year, "A Plan for Spam", the programmer Paul Graham described filtering with word probabilities learned from each user's own mail, essentially naive Bayes, and reported catching more than 99% of his spam with very few false positives. Within a year many email programs had built-in Bayesian filters. Spammers responded by misspelling words and adding paragraphs of innocent text, beginning an adversarial contest that machine learning still fights.</p>`, sources: ["graham02"] }
  ],
  ps5: [
    { kind: "history", title: "The 1936 Literary Digest poll", html: `<p>In 1936 the magazine <em>Literary Digest</em> mailed poll cards to about 10 million people, drawn largely from telephone directories and car registrations, and received some 2.4 million replies predicting a landslide for Alf Landon over Franklin Roosevelt. Roosevelt won 46 of 48 states. During the Depression, people with telephones and cars were wealthier than average, and those who chose to reply differed again. George Gallup, with a far smaller but more representative sample, predicted the winner correctly. The episode is the classic lesson that a large biased sample loses to a small random one.</p>` }
  ],
  ps7: [
    { kind: "ethics", title: "Experiments on users", html: `<p>A/B tests are experiments on people, usually without their explicit knowledge. Most test button colors or layouts, but not all. In 2014 researchers published a study in which Facebook had altered about 700,000 users' news feeds to show fewer positive or fewer negative posts, and measured whether their own posts became more negative or positive. The study prompted widespread criticism about consent and about manipulating emotions. Universities require ethical review of experiments on people; companies are generally not bound by the same rules. Before running a test, ask whether participants would object if they knew, and whether any version could cause harm.</p>` }
  ],
  ps8: [
    { kind: "history", title: "Galton and regression", html: `<p>Francis Galton, a cousin of Charles Darwin, measured the heights of hundreds of parents and their adult children and, in an 1886 paper, described their "regression towards mediocrity". He also developed early forms of the correlation coefficient. Galton coined the word "eugenics" and promoted it, and his statistical work was built in part to serve it. The methods outlived their origin, and some universities have since renamed buildings and positions that honored him: a reminder that tools and the purposes they serve should be judged separately.</p>` }
  ]
});
