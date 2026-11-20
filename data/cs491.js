CSA.addCourse({
  id: "cs491",
  code: "CS 491",
  title: "Capstone Project II",
  credits: 4,
  kind: "required",
  term: "y4s",
  summary: "The second half of the two-term capstone begun in CS 490. The same teams take their prototype to a finished system in real use, shown to be good and handed over to the people who will keep it running: replanning from the mid-project report, iterating with real users and measuring usability honestly, load testing and capacity planning, deploying and operating with SLOs, alerts and incident response, maintaining code and dependencies, evaluating the work with controlled comparisons, documenting and handing over, and the final presentation and reflection. A student may instead complete an individual research thesis with a faculty adviser, assessed on parallel milestones; the lessons serve both paths. Most of the grade comes from the milestones, and every programming problem is a tool a team or a thesis student uses at this stage.",
  prereqs: ["CS 490 Capstone Project I"],
  outcomes: [
    "Replan a project from evidence: forecast from the team's own estimation history, commit to a scope at a stated confidence, and re-rank risks for real use and handover",
    "Run a beta with real users and report task success, SUS and time on task with honest intervals; design product analytics that answer questions without betraying users",
    "Estimate load, apply Little's law and queueing to capacity, and run load tests and profiles whose numbers mean something",
    "Deploy safely, monitor the golden signals, set SLOs from user journeys, alert on error-budget burn rates, respond to incidents and write postmortems that produce change",
    "Maintain a system in use: choose debt by hotspot, refactor behind characterization tests, resolve dependency constraints, version releases and triage security updates",
    "Evaluate the work against its requirements and its users' needs, design and read out controlled comparisons, and state threats to validity; for a thesis, evaluate a contribution with baselines, paired tests and ablations",
    "Document a system for its users, maintainers and operators, license it and its dependencies correctly, and hand it over so that others can run, change and recover it",
    "Launch with an evidence-based go/no-go decision, present the whole project to a mixed audience, and reflect on two terms of work with evidence"
  ],
  practiceLabels: { title: "Practice and project work", intro: "Problems marked <b>Project</b> are steps on your own team's project (or your thesis), and their answers describe what a strong response does. The others have worked answers. Try each one before you open its answer.", answer: "Answer and guidance" },
  rubric: {
    criteriaFor: "the milestones (second-term plan, beta, readiness review, evaluation report, final release and handover, final presentation), and their thesis equivalents",
    assessments: [
      { name: "Second-term plan", weight: 10, desc: "Week 2. Committed scope with its confidence, stretch goals, operations and handover work, debt to repay, schedule, updated risks and team arrangements, agreed with the client (Lesson 1). Thesis path: the research plan. Graded as a team." },
      { name: "Beta release and usability round", weight: 15, desc: "Week 6. The system in real use by a limited group, with a problem-reporting channel and triage, a summative usability round with intervals, and an event plan reviewed for privacy (Lesson 2). Thesis path: a pilot study and the method chapter. Graded as a team." },
      { name: "Operational readiness review", weight: 10, desc: "Week 9. The capacity plan and load test, SLOs, alerts and runbooks, a rehearsed rollback and an incident drill (Lessons 3 to 5). Thesis path: preliminary results and the related-work chapter. Graded as a team." },
      { name: "Evaluation report", weight: 15, desc: "Week 11. Status against every requirement, validation evidence from users, at least one well-designed comparison, and threats to validity (Lesson 6). Thesis path: the evaluation chapter. Graded as a team." },
      { name: "Final release and handover", weight: 15, desc: "Week 13. The final release, its documentation and license, the maintainer's onboarding and recovery tests, and the handover checklist completed with the client (Lesson 7). Thesis path: the complete thesis and its reproducible artifact. Graded as a team; individual grades are adjusted by contribution (see the policies)." },
      { name: "Final presentation", weight: 10, desc: "Week 14. The whole project's story, with the system working and the evidence, to the client, faculty and guests, and the answers to questions (Lesson 8). Thesis path: the thesis defense. Graded as a team, with a share for each member's part." },
      { name: "Individual reflections and peer evaluation", weight: 10, desc: "A short reflection after each milestone and a final one of 1,000–1,500 words across both terms, citing your own work as evidence; plus specific peer evaluations of your teammates. Thesis path: the reflections, and the adviser's assessment of how you worked. Graded individually." },
      { name: "Lesson quizzes and problems", weight: 15, desc: "The quiz at the end of each lesson (best attempt counts) and the lessons' programming problems. The same for both paths. Graded individually." }
    ],
    criteria: [
      { name: "Value to the user", desc: "Does the work meet a real need? (For a thesis: does it answer a question that matters?)", levels: [
        "In real use, with evidence from users that it helps; for a thesis, a clear contribution whose importance is argued and shown.",
        "Used and useful, with some needs assumed rather than checked; or a sound contribution of modest reach.",
        "Works mostly in demonstrations; users' needs or the question's importance are asserted.",
        "No identifiable user or question." ] },
      { name: "Engineering and operation", desc: "Can it be run, changed and recovered by people other than its authors?", levels: [
        "Deployed with rollback, monitored against SLOs, documented, licensed and handed over; the maintainer has deployed and restored it. For a thesis, the artifact reproduces every result.",
        "Sound and deployed, with gaps in monitoring, documentation or the handover.",
        "Runs only with the team's help; operations and handover are largely missing.",
        "Doesn't work." ] },
      { name: "Evidence and honesty", desc: "Are claims backed by well-designed measurement?", levels: [
        "Claims rest on measurements with intervals and well-designed comparisons; misses and threats to validity are reported plainly.",
        "Mostly backed by evidence; some comparisons are weak or caveats missing.",
        "Progress and effects are asserted, or the evaluation can't support its conclusions.",
        "Claims are contradicted by the work." ] },
      { name: "Teamwork and communication", desc: "Does the team (or the thesis student with an adviser) work well and communicate clearly?", levels: [
        "Fair shares of the work, visible in the history; clear documents, a presentation and answers that a client, a maintainer and an examiner can follow.",
        "Mostly fair and clear, with uneven periods or unclear passages.",
        "Work concentrated in one or two people, or documents only the team understands.",
        "The team doesn't function, or the student hasn't engaged with the adviser." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Teams and clients:</b> teams continue from CS 490 with the same client. A change of team or client needs the instructor's approval. If a client disappears, tell the instructor at once: it is a risk to manage, not a reason to fail.",
      "<b>Thesis option:</b> a student may complete an individual research thesis instead of the team project. Apply to the instructor by the last week of CS 490 with a two-page proposal and a faculty adviser's written agreement to supervise; the thesis may grow out of the capstone project or the adviser's research. A student who leaves a team for the thesis path is removed from its plan, and the team re-scopes in its second-term plan. Each team milestone has a thesis equivalent with the same week and weight (listed in the assessments); thesis milestones are graded by the adviser with the instructor, and the complete thesis and defense also by a second reader. The criteria apply to both paths, as their descriptions say. Lessons, quizzes and problems are the same for everyone.",
      "<b>Individual grades:</b> team milestones are graded once, then each member's share is adjusted, up or down by at most 10 points, using the peer evaluations (with a WebPA-style weighting as one input; Lesson 8), the repository history and the instructor's observation. Contribution means more than code: planning, user research, operations, documentation, client work and reviews all count. A low peer score leads to a conversation with the instructor before any change. Thesis students are graded individually on every milestone, and their adviser's assessment replaces the peer evaluation.",
      "<b>Real users and data:</b> the beta and production use real data only under the written agreement with the client and the protections of CS 490 Lesson 7. Any study of people for research, including every thesis study with participants, needs research ethics approval before it starts. Usability testing to improve the product usually doesn't, but check with the instructor before publishing results.",
      "<b>Operating the system:</b> agree with the client when deployments may happen (never during opening hours without agreement) and who is on call until handover. The team is not responsible for the system after the handover meeting, beyond the support statement it agreed (Lesson 7).",
      "<b>AI assistants:</b> as in CS 490: allowed, disclosed in each pull request and document, never given personal data or secrets, and you are responsible for every line and sentence you submit. A thesis's text must be your own writing; say in its preface how any tool was used.",
      "<b>Deadlines:</b> review, launch, presentation and defense dates are fixed, because other people attend them. Documents have three late days per team (or per thesis student) for the term."
    ]
  },
  units: [
    {
      id: "cx1",
      title: "Replanning for the second term",
      minutes: 90,
      summary: "Turning CS 490's mid-project report and retrospective into the second-term plan: what the first term's data says about the team, the hours really left for features once operations, handover and debt are counted, forecasting from the team's own history, committing to a scope at a stated confidence, re-ranking risks with a pre-mortem, and the plan itself, for a team and for a thesis.",
      notes: `
<p>CS 490 ended with three documents: the mid-project report (what works, measured against the requirements, and the updated plan and risks), the retrospective's findings and actions, and each member's reflection. CS 491 Capstone Project II starts from them. This term takes the prototype to a finished system that real people use, that the team can show is good, and that someone else can run after you leave. The first milestone, in week 2, is the <strong>second-term plan</strong>, and this lesson is about writing one you will actually meet.</p>
<p>Most students do the team project. A student may instead write an individual research <strong>thesis</strong> with a faculty adviser, having applied by the last week of CS 490 with a short proposal and the adviser's agreement to supervise. Each team milestone has a thesis equivalent in the same week with the same weight, graded by the adviser with the instructor (the complete thesis and its defense also by a second reader), against the same criteria as team work. Team milestones are graded once for the whole team; then each member's share is adjusted, up or down by at most 10 points, using the peer evaluations (with a WebPA weighting as one input, Lesson 8), the repository history and the instructor's observation, and a low peer score leads to a conversation with the instructor before any change. Thesis students are graded individually on every milestone, with the adviser's assessment in place of peer evaluation. The lessons, quizzes and problems are the same for both paths, and the course policies give the details. The term's milestones are fixed, like last term's:</p>
<table>
<tr><th>Week</th><th>Team milestone</th><th>Thesis milestone</th><th>Lessons</th></tr>
<tr><td>2</td><td>Second-term plan</td><td>Research plan</td><td>1</td></tr>
<tr><td>6</td><td>Beta release and usability round</td><td>Pilot study and method</td><td>2</td></tr>
<tr><td>9</td><td>Operational readiness review</td><td>Preliminary results and related work</td><td>3, 4, 5</td></tr>
<tr><td>11</td><td>Evaluation report</td><td>Evaluation chapter</td><td>6</td></tr>
<tr><td>11</td><td>Launch, then two weeks of close support (not graded separately)</td><td>none</td><td>8</td></tr>
<tr><td>13</td><td>Final release and handover</td><td>Complete thesis and artifact</td><td>7</td></tr>
<tr><td>14</td><td>Final presentation</td><td>Thesis defense</td><td>8</td></tr>
</table>

<h3>Read the first term as data</h3>
<p>CS 490 Lesson 3 asked you to keep a record of estimates and actual times "so that next term's plan has data". Now use it, together with the mid-project report, to answer four questions before planning anything.</p>
<ul>
<li><strong>How accurate were we?</strong> Divide each finished task's estimate by its actual time. A ratio of 0.5 means the task took twice as long as estimated.</li>
<li><strong>How much did we actually get done?</strong> The hours or points completed per week, from the burndown (CS 490 Lesson 3), after the first few weeks of setting up. (This is CS 240's velocity. Evidence-based scheduling, below, uses the word for the estimate ratio instead; this lesson says which it means.)</li>
<li><strong>What is unfinished or failing?</strong> The traceability summary and the measured targets in the report: for the pantry, NFR-1's check-in target was missed (a 95th percentile of 35 seconds against 30) and the offline sync had no test for two volunteers recording the same household.</li>
<li><strong>What did the retrospective decide?</strong> Its actions carry over. The pantry team's was "reviews within one working day", and the process lead now reports the median review wait at each planning meeting.</li>
</ul>
<p>The record is uncomfortable reading for most teams. That is its value: it is the outside view of CS 490 Lesson 3, the cure for the planning fallacy, and it is about <em>you</em>.</p>

<h3>The hours really left</h3>
<p>CS 490 Lesson 1's model gives a team of four, at 10 hours a week each for 14 weeks, 560 hours. Take off 2 hours a week each for meetings and 15% for writing, and 364 building hours remain. But this term's building is not mostly features. Operating a real system and handing it over is work that a feature list leaves out:</p>
<pre><code>members, weeks, hours = 4, 14, 10
total = members * weeks * hours                # 560
build = total - members * weeks * 2 - 0.15 * total
print(build)                                   # 364.0
debt = round(0.2 * build)                      # a fifth for debt and refactoring (CS 490 Lesson 6)
reserved = {"second usability round": 24, "load test and profiling": 20,
            "monitoring, SLOs and alerts": 24, "deployment and rollback": 16,
            "evaluation": 30, "documentation and runbooks": 40, "handover": 16}
features = build - debt - sum(reserved.values())
print(debt, sum(reserved.values()), features)  # 73 170 121.0</code></pre>
<p>About 120 hours, a third of the building time, is left for new features. Each reserved line comes from a later lesson, and teams that leave them out discover in week 12 that the system works but nobody else can run it. Estimate them as you would features, and put them in the plan as stories with owners. (As in every lesson, the code blocks run in order in one shared namespace, so a later block can use names an earlier one defined.)</p>

<h3>Re-scoping</h3>
<p>A project has three things that can move: the scope, the time and the people. In a capstone the deadline and the team are fixed, so only scope can give. Re-scoping is not failure. It is the plan doing its job, and the earlier it happens the more choice you have.</p>
<p>Start from the stories still open in the requirements document, re-estimated with three-point estimates (CS 490 Lesson 3), and ask the client to re-rank them now that they have used the prototype. Their priorities will have changed: a working prototype teaches users what they want. At the pantry, Maria moved the funder's quarterly report up (the funder asked for it in January) and the low-stock alerts down (the stockroom volunteer prefers his clipboard). Then apply MoSCoW's discipline again (CS 490 Lesson 2): keep the musts well under the capacity, so that the shoulds and coulds absorb the underestimates the first term's ratios predict.</p>
<p>Scope also grows in a second term, from success: a client who has seen the prototype says "can it do the shift list too?" Treat every new request as a story to be ranked against the others, never as a free addition. "Yes, and which of these should it replace?" is a complete answer.</p>

<h3>Forecasting from your own history</h3>
<p>The simplest correction for estimation error is to divide new estimates by the team's <em>overall ratio</em>: total estimated hours divided by total actual hours over its finished tasks (not the mean of the separate ratios, which weights a one-hour task as much as a ten-hour one). Joel Spolsky's <strong>evidence-based scheduling</strong> (2007) does better: it keeps the whole distribution. Each task's estimate is divided by a ratio drawn at random from the estimator's own history (Spolsky calls each estimate ratio a <em>velocity</em>, as the code below and the second programming problem do; it is not CS 240's points per sprint), and the sum gives one possible future. Repeating this a thousand times gives a distribution of finish times, and its percentiles say how likely each finish is. This is a Monte Carlo simulation (MATH 230 Lesson 5).</p>
<pre><code>import random

history = [(4, 6), (8, 9), (2, 5), (6, 6), (3, 4.5), (10, 16), (5, 5), (1, 2)]   # (estimate, actual) hours
velocity = [e / a for e, a in history]       # estimate ratios, Spolsky's velocities
print(round(sum(e for e, a in history) / sum(a for e, a in history), 2))   # 0.73
rng = random.Random(0)
remaining = [6, 4, 8, 3, 5]                    # estimates for Ana's next five tasks: 26 hours
totals = sorted(sum(e / rng.choice(velocity) for e in remaining) for _ in range(1000))
print(round(totals[499], 1), round(totals[799], 1), round(totals[949], 1))   # 39.1 45.0 50.0</code></pre>
<p>Ana's estimates add up to 26 hours. Dividing by her overall ratio of 0.73 gives about 36. The simulation says half of the futures finish within 39 hours, 80% within 45 and 95% within 50. (These are the nearest-rank 50th, 80th and 95th percentiles of CS 490 Lesson 7: the <em>p</em>th percentile of <em>n</em> sorted values is the one at position ⌈<em>p</em> × <em>n</em>/100⌉ counting from 1, here 500, 800 and 950, which Python, counting from 0, writes as 499, 799 and 949.) The simulation is wider than the single correction because some futures draw several of her bad ratios at once. Like PERT, it assumes the future resembles the past; unlike PERT, it needs no guess at a pessimistic case, because the history supplies it. This lesson's second programming problem builds it.</p>

<h3>Committing at a stated confidence</h3>
<p>The plan should separate what the team <strong>commits</strong> to from its <strong>stretch goals</strong>, and say how confident the commitment is. Here are the pantry's open stories, in the client's order, with three-point estimates in hours:</p>
<table>
<tr><th>Id</th><th>Story</th><th>Priority</th><th>(a, m, b)</th><th>PERT mean</th></tr>
<tr><td>S1</td><td>Registration form replaces the paper one</td><td>Must</td><td>(10, 14, 24)</td><td>15.0</td></tr>
<tr><td>S2</td><td>Offline duplicates flagged to Maria</td><td>Must</td><td>(20, 30, 52)</td><td>32.0</td></tr>
<tr><td>S3</td><td>Volunteers swap shifts</td><td>Should</td><td>(8, 12, 20)</td><td>12.7</td></tr>
<tr><td>S4</td><td>Funder's quarterly report</td><td>Should</td><td>(30, 40, 80)</td><td>45.0</td></tr>
<tr><td>S5</td><td>Volunteers opt out of reminders</td><td>Could</td><td>(4, 6, 10)</td><td>6.3</td></tr>
<tr><td>S6</td><td>Low-stock alerts</td><td>Could</td><td>(15, 20, 40)</td><td>22.5</td></tr>
</table>
<p>CS 490 Lesson 3's arithmetic gives the probability that a set of stories fits in the 120 hours: add the PERT means, add the variances, and evaluate the normal distribution.</p>
<pre><code>import math

def pert(a, m, b):
    return (a + 4 * m + b) / 6, (b - a) / 6

def p_within(estimates, capacity):
    mean = sum(pert(*e)[0] for e in estimates)
    sd = math.sqrt(sum(pert(*e)[1] ** 2 for e in estimates))
    return (1 + math.erf((capacity - mean) / sd / math.sqrt(2))) / 2

stories = {"S1": (10, 14, 24), "S2": (20, 30, 52), "S3": (8, 12, 20),
           "S4": (30, 40, 80), "S5": (4, 6, 10), "S6": (15, 20, 40)}
print(round(sum(pert(*e)[0] for e in stories.values()), 1))   # 133.5
print(round(p_within(list(stories.values()), 120), 2))         # 0.11
chosen = [stories[s] for s in ("S1", "S2", "S3", "S4", "S5")]
print(round(p_within(chosen, 120), 2))                         # 0.81</code></pre>
<p>Promising everything has an 11% chance of being kept. Committing to S1 to S5 and listing S6 as a stretch goal has an 81% chance. The plan says exactly that: "We commit to S1–S5 (about 80% confidence, assuming our estimates err as last term's did); S6 if time allows." The first programming problem automates the choice: it takes the musts first, then goes through the other stories in the client's order, adding each one if the confidence stays above a threshold and skipping it otherwise (a smaller story later may still fit). Two cautions from CS 490 still apply: correlated errors make the true spread wider, and 80% means that one plan in five will still miss, which is what the stretch goals and the buffer are for.</p>

<h3>Risks for the second term</h3>
<p>Revisit the risk register (CS 490 Lesson 1). Retire the risks the prototype answered (the barcode scanner works) and re-rate the rest with what you now know. Then look for the risks that belong to a second term, which first-term registers rarely contain:</p>
<ul>
<li><strong>Real use:</strong> real personal data, real users on a Saturday morning, and the first production incident (Lesson 4).</li>
<li><strong>Handover:</strong> nobody is ready to run the system in May (Lesson 7). This is the most common way capstone projects die after the grade.</li>
<li><strong>People:</strong> job searches, interviews and graduate-school visits take whole days in the spring; plan for them in the charter.</li>
<li><strong>The client's calendar:</strong> a pantry's busiest weeks, a school's exam period, a lab's grant deadline.</li>
</ul>
<p>A <strong>pre-mortem</strong>, proposed by the psychologist Gary Klein (2007), finds the ones you missed. The team imagines that it is week 14 and the project has failed, then each member writes down, alone, every reason it might have failed. Because the failure is given, people stop defending the plan and start explaining it, and the quiet member's worry ("nobody has restored a backup") reaches the register. Ten minutes of writing, then read the reasons round the table and add the new risks with owners and responses.</p>

<h3>The second-term plan</h3>
<p>The first milestone is a short document, about four pages, agreed with the client:</p>
<ol>
<li><strong>Goal for the end of term:</strong> what will be in production, used by whom, and handed over to whom.</li>
<li><strong>Committed scope and stretch goals,</strong> with estimates and the confidence of the commitment.</li>
<li><strong>Operations, evaluation and handover work,</strong> as stories with owners, from the reserved hours above.</li>
<li><strong>Technical debt to repay</strong> before real use (CS 490 Lesson 6), with triggers.</li>
<li><strong>Schedule:</strong> the fixed milestones, the team's own milestones between them, and a buffer before each.</li>
<li><strong>Risks:</strong> the updated register, including the pre-mortem's additions.</li>
<li><strong>Team:</strong> roles rotated (CS 490 Lesson 5 asked for one rotation at the start of this term), the charter reread and amended, and the retrospective's actions with their measures.</li>
</ol>
<p>A student on the thesis path writes a <strong>research plan</strong> instead, in the same spirit: the research question and why it matters, what is already known, the hypothesis or the artifact to be built, how it will be evaluated (Lesson 6), the data and ethics approvals needed, a schedule against the thesis milestones, the risks (a negative result is a risk to plan for, not a disaster), and the agreed rhythm of meetings with the adviser. The forecasting tools above apply unchanged: a thesis's chapters are tasks with three-point estimates, and the same planning fallacy that Buehler, Griffin and Ross found in honours theses (CS 490 Lesson 3) applies to yours.</p>
`,
      terms: [
        ["Second-term plan", "The first CS 491 milestone: committed scope and stretch goals, operations and handover work, debt, schedule, risks and team arrangements for the term."],
        ["Re-scoping", "Changing what a project will deliver so that it fits the time and people available."],
        ["Estimation ratio", "A finished task's estimate divided by its actual time; below 1 means it took longer than estimated. Evidence-based scheduling calls it a velocity, unlike CS 240's points per sprint."],
        ["Evidence-based scheduling", "Forecasting by dividing new estimates by ratios drawn at random from the estimator's own history, many times, and reading percentiles of the results."],
        ["Monte Carlo simulation", "Estimating a distribution by running many random trials of a model and examining the results."],
        ["Commitment", "The scope a team promises, chosen so that it fits with a stated probability."],
        ["Stretch goal", "Work the team will do if time allows but does not promise."],
        ["Scope creep", "Growth in what a project is expected to deliver without a matching change in time, people or other scope."],
        ["Pre-mortem", "A planning exercise in which a team imagines the project has failed and lists the reasons, to find risks."],
        ["Research plan", "The thesis path's first milestone: question, hypothesis or artifact, evaluation method, approvals, schedule and risks."]
      ],
      quiz: [
        { q: "A team of four has 364 building hours this term. Why might only about a third of them go to new features?", choices: ["Features are less important in a second term", "Debt repayment, a second usability round, load testing, monitoring, deployment, evaluation, documentation and handover also need building time", "The client will not want more features", "Meetings take two thirds of the time"], answer: 1, why: "In the notes' budget, 73 hours of debt and 170 hours of operations, evaluation and handover work leave 121 hours for features." },
        { q: "A team's finished tasks were estimated at 40 hours in total and took 80 (an overall ratio of 0.5). A new task is estimated at 6 hours. What is the simple corrected estimate?", choices: ["3 hours", "6 hours", "12 hours", "6.5 hours"], answer: 2, why: "A ratio of 0.5 means tasks took twice their estimates, so 6 / 0.5 = 12 hours." },
        { q: "Why does evidence-based scheduling's 95th percentile come out above the simple corrected estimate?", choices: ["The simulation is biased", "Some simulated futures draw several of the estimator's worst ratios at once, which a single average hides", "Monte Carlo always overestimates", "Because 95 is larger than 50"], answer: 1, why: "The simulation keeps the whole distribution of ratios, so it shows how bad a run of bad ratios can be." },
        { q: "Promising all six of the pantry's stories has an 11% chance of fitting in 120 hours, and S1–S5 an 81% chance. What should the plan say?", choices: ["Commit to all six; the team will work harder", "Commit to S1–S5 with about 80% confidence, and list S6 as a stretch goal", "Commit to nothing until the end", "Commit to S6 first because it is the largest"], answer: 1, why: "A commitment is chosen so that it fits with a stated probability; the remainder becomes stretch goals." },
        { q: "After the prototype demo, the client asks the team to add a shift-list feature. What is the best response?", choices: ["Accept it, since the client is always right", "Refuse, since the scope was agreed in CS 490", "Add it as a story, estimate it, and ask the client which committed story it should replace or follow", "Build it secretly in the evenings"], answer: 2, why: "New requests are ranked against existing work; with fixed time and people, something else must move." },
        { q: "What makes a pre-mortem find risks that an ordinary risk review misses?", choices: ["It is done after the project", "Imagining the failure has already happened lets people explain it instead of defending the plan, and writing alone first brings out quiet members' worries", "It uses a formula for exposure", "It is run by the client"], answer: 1, why: "Klein's technique changes the question from 'what might go wrong?' to 'why did it go wrong?'." }
      ],
      practice: [
        {
          q: `<p>A team of three expects 8 hours a week each for the 14 weeks of CS 491. Use the notes' model: 2 hours a week each for meetings, 15% of the total for writing, a fifth of the building hours for debt, and 120 hours for operations, evaluation and handover work. How many hours are left for features? What does that suggest about the team's plan?</p>`,
          a: `<p>Total 3 × 14 × 8 = 336. Meetings 3 × 14 × 2 = 84. Writing 0.15 × 336 = 50.4. Building 336 − 84 − 50.4 = 201.6. Debt 0.2 × 201.6 ≈ 40.3. Features: 201.6 − 40.3 − 120 ≈ 41 hours, about one week of the whole team's time. A three-person team can finish perhaps one or two substantial stories this term, so it should commit to the one or two musts that matter most to the client, ask whether the operations work can be lighter (a simpler deployment, fewer alerts), and say plainly to the client that the system will grow little but will be made reliable and handed over.</p>`
        },
        {
          q: `<p>Two must stories have three-point estimates (10, 15, 26) and (6, 8, 16) hours, and a should story (12, 18, 36). The team has 50 feature hours. Compute the probability that the musts fit, and that all three fit. Should the team commit to the should story at 80% confidence? At 90%?</p>`,
          a: `<p>PERT means 16, 9 and 20; standard deviations 16/6 ≈ 2.67, 10/6 ≈ 1.67 and 24/6 = 4. Musts: mean 25, variance 7.11 + 2.78 = 9.89, sd ≈ 3.14; (50 − 25)/3.14 ≈ 8 standard deviations, so the probability is essentially 1. All three: mean 45, variance 9.89 + 16 = 25.89, sd ≈ 5.09; z = 5/5.09 ≈ 0.98, Φ(0.98) ≈ 0.84. So the should story is committed at 80% confidence (0.84 ≥ 0.80) but would be a stretch goal at 90%. Most of the uncertainty comes from the should story itself: its standard deviation of 4 hours is larger than both musts' together.</p>`
        },
        {
          q: `<p>Run a short pre-mortem on the pantry project in your head. It is week 14 and the system is not being used. Write five plausible reasons, then turn the two most likely into risk-register entries (likelihood, impact, response type, action, owner, warning sign).</p>`,
          a: `<p>Plausible reasons: the volunteer who agreed to maintain it left in March; a Saturday outage made Maria go back to paper; the new registration form was slower than paper for new households; real data was never migrated from the binder; the funder's report was wrong and Maria stopped trusting the numbers. Two entries: (1) "No maintainer at handover": likelihood 3, impact 5, exposure 15; response reduce; action: name the maintainer by week 4 and have them deploy a change themselves by week 10 (Lesson 7); owner the client liaison; warning sign: the maintainer has not attended a meeting by week 6. (2) "A Saturday outage loses Maria's trust": likelihood 3, impact 4, exposure 12; response reduce; action: monitoring and an SLO by week 8, a rehearsed rollback, and a printed fallback list (Lesson 4); owner the quality lead; warning sign: any error alert on a Saturday.</p>`
        },
        {
          q: `<p><b>Project.</b> Write your team's second-term plan (or, on the thesis path, your research plan) with the seven sections in the notes. Compute your feature hours from your own numbers, forecast at least one member's tasks from their CS 490 history, and state your commitment with its confidence.</p>`,
          a: `<p>A strong plan starts from evidence: the CS 490 estimate ratios, the mid-project report's misses and the retrospective's actions. Its capacity calculation includes operations, evaluation, handover and debt work as named stories with owners. Its commitment is a list of stories with a probability and the assumption behind it, and the stretch goals are separate. The risk register has been re-rated and includes second-term risks (handover, real data, members' spring commitments) found in a pre-mortem. Roles are rotated and the charter is amended where the first term showed it didn't work. A thesis plan states a question precise enough to be answered, names its evaluation method and approvals, and has a schedule with buffers. Weak plans list features with single-number estimates and no operations work at all.</p>`
        }
      ],
      sources: ["ebs07", "premortem07", "buehler94", "dsdm"]
    },
    {
      id: "cx2",
      title: "Iterating with users",
      minutes: 90,
      summary: "Running a beta with real users and learning from it: formative and summative testing, task success rates with honest intervals, SUS and time on task from larger samples, triaging feedback, instrumenting the product with analytics events, funnels and retention, and the ethics of watching what users do.",
      notes: `
<p>CS 490 Lesson 8's usability test used five participants to <em>find</em> problems. This term the system goes to real users in a beta release (the second milestone, week 6), and the questions change: does it work for most users, how well, and is it getting better? This lesson is about measuring that honestly, and about watching users through analytics without betraying them.</p>

<h3>Formative and summative testing</h3>
<p>A <strong>formative</strong> test finds problems so they can be fixed: a few participants, think-aloud, a list of problems ranked by severity. Nielsen and Landauer's model (CS 490 Lesson 8) says five participants find most of them, and repeated small rounds beat one big one. A <strong>summative</strong> test measures: what fraction of users complete the check-in task, how long it takes, how they rate it. Measurements need larger samples and come with uncertainty that must be reported. Both have a place this term: keep running small formative rounds after each change, and run one summative round in the beta against the requirements' targets (NFR-1 for speed, NFR-3 for the SUS score).</p>

<h3>The beta release</h3>
<p>A beta is the real system used for real work by a limited group, who know it is new. For the pantry: two Saturday shifts of volunteers, with the paper binder kept as a fallback. Prepare it as a release, not a demo:</p>
<ul>
<li><strong>Who and how long:</strong> named participants, start and end dates, and what happens to their data afterwards (it stays, since this is the real system).</li>
<li><strong>A way to report problems</strong> that costs the user nothing: a "Report a problem" link that records the page and time, and a volunteer at the desk who writes down what happened.</li>
<li><strong>Triage:</strong> every report gets a severity (CS 490 Lesson 8: prevents the task, causes delay or error, cosmetic) and a frequency. Fix severe-and-frequent first; a rare severe problem in a core flow still beats a frequent cosmetic one.</li>
<li><strong>Release notes</strong> for the users, in their language: "You can now search by card number. Tell us if anything is slower than the binder."</li>
</ul>

<h3>Task success rates with honest intervals</h3>
<p>The simplest usability measure is the <strong>completion rate</strong>: the fraction of participants who completed a task. Jeff Sauro's analysis of 1,189 tasks from usability studies (2011) found an average of 78%, a useful benchmark alongside SUS's 68. But a rate from a small sample needs an interval. MATH 230 Lesson 6 gave p̂ ± 1.96√(p̂(1 − p̂)/<em>n</em>), the <strong>Wald interval</strong>. For small samples and rates near 0 or 1, which is exactly where usability tests live, it fails:</p>
<pre><code>import math

def wald(k, n, z=1.96):
    p = k / n
    half = z * math.sqrt(p * (1 - p) / n)
    return round(p - half, 3), round(p + half, 3)

def adjusted_wald(k, n, z=1.96):
    nt = n + z * z
    p = (k + z * z / 2) / nt
    half = z * math.sqrt(p * (1 - p) / nt)
    return round(max(0, p - half), 3), round(min(1, p + half), 3)

print(wald(7, 8))            # (0.646, 1.104)
print(wald(8, 8))            # (1.0, 1.0)
print(adjusted_wald(7, 8))   # (0.508, 0.999)</code></pre>
<p>Seven of eight participants completing a task gives a Wald interval that goes above 100%, and eight of eight gives an interval of zero width, as if eight people proved that everyone will succeed. The <strong>adjusted Wald</strong> interval of Alan Agresti and Brent Coull (1998) fixes this by adding <em>z</em>²/2 successes and <em>z</em>²/2 failures before computing, which for 95% (<em>z</em> = 1.96, <em>z</em>² ≈ 3.84) is almost exactly "add two successes and two failures". It pulls the estimate toward 50%, more strongly when <em>n</em> is small, and its intervals contain the true rate close to 95% of the time even for small samples, which Sauro and James Lewis (2005) confirmed for usability data. Seven of eight becomes 51% to 100%: the honest conclusion is that the task works for most users, and that eight participants can't say much more.</p>
<p>Against a benchmark, the interval decides the claim. If its lower end is above the target, the target is met; if its upper end is below, it is missed; otherwise the data can't tell, and the report says so. This lesson's first programming problem produces that table for every task.</p>

<h3>SUS and time on task, with more participants</h3>
<p>The beta's 20 volunteers filled in the SUS (CS 490 Lesson 8) after their second shift:</p>
<pre><code>import statistics

sus = [77.5, 85, 62.5, 90, 72.5, 80, 67.5, 95, 75, 82.5, 57.5, 87.5, 70, 80, 92.5, 65, 77.5, 85, 72.5, 80]
m, s = statistics.mean(sus), statistics.stdev(sus)
half = 2.093 * s / math.sqrt(len(sus))       # t value for 19 degrees of freedom (MATH 230 Lesson 6)
print(m, round(s, 1), round(m - half, 1), round(m + half, 1))   # 77.75 10.1 73.0 82.5</code></pre>
<p>The mean is 77.75, with a 95% interval from 73.0 to 82.5. Compared with NFR-3 (in CS 490 Lesson 2's form, the target is the level aimed for and the constraint the worst the client will accept), the constraint (68) is met, since the whole interval is above it, but the target (80) isn't shown: 80 is inside the interval. "Mean SUS 77.8 (95% CI 73.0 to 82.5, n = 20): above the constraint; not yet shown to meet the target" is the sentence for the report.</p>
<p>Task times are skewed: most people take about the same time and a few take much longer. The mean is pulled up by the slow few, so for small samples Sauro and Lewis recommend the <strong>geometric mean</strong> (the <em>n</em>th root of the product, or equivalently the exponential of the mean logarithm), which is close to the median:</p>
<pre><code>times = [41, 38, 55, 47, 120, 44, 39, 52]      # seconds to check in a returning household
print(statistics.mean(times), statistics.median(times), round(statistics.geometric_mean(times), 1))   # 54.5 45.5 50.6</code></pre>
<p>Report successful attempts' times separately from failures, since a participant who gives up after 30 seconds didn't do the task fast.</p>

<h3>Product analytics</h3>
<p>Tests show what a few people do while being watched. <strong>Product analytics</strong> records what every user does, all the time, by logging <strong>events</strong> from the running system: a record of something a user did, with a name, a time, an identifier for the user (usually a pseudonym) and a few properties.</p>
<pre data-label="JSON"><code>{"event": "checkin_completed", "at": "2027-03-06T15:14:03Z", "user": "v-8f3a1c",
 "props": {"method": "card", "offline": false, "duration_ms": 18400}}</code></pre>
<p>Decide the events from the questions you need to answer, before writing code: an <strong>event plan</strong> lists each event, when it fires, its properties and the question it serves. Questions that most products need:</p>
<ul>
<li><strong>Funnels:</strong> of the users who start a flow, how many reach each later step? If 120 volunteers open the registration form and 70 submit it, the drop-off is a usability finding to investigate with a test. This lesson's second problem computes a funnel from raw events.</li>
<li><strong>Adoption and retention:</strong> what fraction of users use a feature at all, and of those who used it in week 1, how many still use it in week 4? Retention is the strongest evidence that a feature is useful, because people keep using things that help them.</li>
<li><strong>Performance and errors as users meet them:</strong> the check-in's duration measured in the browser, which includes the desk's slow Wi-Fi.</li>
</ul>
<p>Analytics data has the usual traps. A count without a denominator means nothing ("200 searches" from how many check-ins?). Changes in the instrumentation look like changes in behavior. And a correlation in the data ("volunteers who use card search check in faster") doesn't show that the feature caused it: perhaps experienced volunteers use both. Lesson 6's controlled experiments are how causes are found.</p>

<h3>The ethics of watching users</h3>
<p>Analytics is surveillance with a friendly name, and the people being watched rarely know what is recorded. CS 490 Lesson 7's data inventory applies to every event and property:</p>
<ul>
<li><strong>Collect for a question.</strong> Every event in the plan names the decision it informs. "Log everything, we may need it" is the field "date of birth, in case it's useful" again.</li>
<li><strong>Pseudonymize and minimize.</strong> Events carry a keyed hash of the user's id (an HMAC, CS 380 Lesson 3), not a name; no free text, which fills with personal data; no household details at all, since the pantry's analytics questions are about volunteers' use of the software.</li>
<li><strong>Aggregate, and suppress small numbers.</strong> A report that "1 volunteer used the export on Tuesday" identifies that volunteer to anyone who was there. A common rule is to suppress counts below a threshold such as 5. It is not a guarantee: a total and all but one of its parts reveal the last part, so reports that can be subtracted from each other need care too.</li>
<li><strong>Know the law.</strong> In the EU and UK, storing or reading identifiers on a user's device (cookies and similar) for analytics usually needs consent under the ePrivacy rules, in addition to GDPR's principles (CS 100 Lesson 4); server-side counts that identify no one are much simpler. Choose a tool that keeps the data on your own server or the client's, not a third party's that will use it for advertising.</li>
<li><strong>No dark patterns.</strong> Harry Brignull coined "dark patterns" in 2010 for interfaces designed to trick users into doing what they didn't intend: a pre-ticked consent box, a "decline" button styled to look disabled. Measuring a funnel creates pressure to push its numbers up; never do it by making the user's real choice harder to find.</li>
</ul>
<p>Thesis students collecting data from participants face the same questions with a formal answer: research ethics approval (CS 490 Lesson 7) before the pilot study, with the consent form, data plan and retention period approved in advance.</p>
`,
      terms: [
        ["Formative testing", "Usability testing to find problems so they can be fixed, usually with a few participants and think-aloud."],
        ["Summative testing", "Usability testing to measure how well a system performs, such as completion rates or SUS, with enough participants to report intervals."],
        ["Beta release", "The real system used for real work by a limited group of users who know it is new."],
        ["Completion rate", "The fraction of participants who completed a task; about 78% is average across published studies."],
        ["Wald interval", "The interval p̂ ± z√(p̂(1 − p̂)/n) for a proportion; unreliable for small samples or rates near 0 or 1."],
        ["Adjusted Wald interval", "A proportion interval computed after adding z²/2 successes and z²/2 failures (about two of each at 95%)."],
        ["Geometric mean", "The nth root of the product of n positive values; a better summary than the mean for skewed data such as task times."],
        ["Product analytics", "Recording and analyzing events from a running system to learn how users use it."],
        ["Event plan", "A list of the analytics events a product records, when each fires, its properties and the question it serves."],
        ["Funnel", "The number of users who reach each step of a multi-step flow, showing where they drop off."],
        ["Retention", "The fraction of users who keep using a product or feature after a given time."],
        ["Dark pattern", "An interface designed to trick or pressure users into choices they didn't intend."]
      ],
      quiz: [
        { q: "Which is a summative usability measure?", choices: ["A list of problems found by five think-aloud participants", "The completion rate of the check-in task among 30 beta users, with a 95% interval", "A sketch of a new screen", "A heuristic review by the team"], answer: 1, why: "Summative testing measures performance and reports its uncertainty; formative testing finds problems." },
        { q: "Eight of eight participants complete a task. What does the Wald interval say, and why is that wrong?", choices: ["0% to 100%: it is too wide", "Exactly 100%, with zero width: eight people can't show that everyone will succeed", "50% to 100%, which is correct", "It can't be computed"], answer: 1, why: "With p̂ = 1 the formula's standard error is 0; the adjusted Wald interval gives a sensible range below 100%." },
        { q: "At 95% confidence, the adjusted Wald interval is approximately the Wald interval after:", choices: ["doubling n", "adding two successes and two failures", "removing the best and worst participant", "using a t value"], answer: 1, why: "It adds z²/2 ≈ 1.92 successes and the same number of failures." },
        { q: "A SUS mean is 77.8 with a 95% interval from 73.0 to 82.5. The target is 80 and the constraint 68. What should the report say?", choices: ["The target is met", "The constraint is met; the data doesn't show whether the target is met", "Both are missed", "SUS can't be compared with targets"], answer: 1, why: "The whole interval is above 68, but 80 lies inside it." },
        { q: "Why summarize task times with the geometric mean or median rather than the mean?", choices: ["They are easier to compute", "Task times are skewed, and a few very slow attempts pull the mean up", "The mean is not allowed for times", "To make the numbers smaller"], answer: 1, why: "In the notes, one 120-second attempt raises the mean to 54.5 s while the median is 45.5 s." },
        { q: "A funnel report shows that one volunteer used the data export on Tuesday. What is the problem?", choices: ["One is too few to compute a rate", "The count identifies that volunteer to anyone who knows who worked on Tuesday; small counts should be suppressed", "Exports should never be logged", "There is no problem"], answer: 1, why: "Aggregates of very few people are not anonymous; suppressing counts below a threshold such as 5 is a common rule." }
      ],
      practice: [
        {
          q: `<p>In a beta, three tasks had these results: "check in a returning household" 18 of 20; "register a new household" 11 of 20; "swap a shift" 15 of 20. Compute the adjusted Wald 95% interval for each and compare it with the 78% benchmark. What would you investigate first?</p>`,
          a: `<p>Check-in: ñ = 23.84, p̃ = (18 + 1.92)/23.84 ≈ 0.836, half-width 1.96√(0.836 × 0.164/23.84) ≈ 0.149, so 68.7% to 98.4%: inconclusive against 78%, though most likely above. Registration: p̃ = 12.92/23.84 ≈ 0.542, half-width ≈ 0.200, so 34.2% to 74.2%: below the benchmark, since even the upper end is under 78%. Shift swap: p̃ = 16.92/23.84 ≈ 0.710, half-width ≈ 0.182, so 52.8% to 89.2%: inconclusive. Investigate registration first: it is clearly below the benchmark, and a failed registration means a household waits at the desk. Run a formative test with five new volunteers on registration alone.</p>`
        },
        {
          q: `<p>Write an event plan for the pantry's shift sign-up flow (a volunteer opens next week's schedule, picks a shift, confirms, and may later cancel). For each event give its name, when it fires, its properties, and the question it answers. Then name two things you would deliberately not record.</p>`,
          a: `<p>Events: <code>schedule_viewed</code> (page loaded; properties: week; question: how many volunteers look at the schedule each week); <code>shift_selected</code> (a shift is chosen; properties: weekday, slot, how many places are left; question: which shifts are popular, and where the funnel drops); <code>signup_confirmed</code> (the server records it; properties: weekday, slot, seconds since schedule_viewed; question: completion rate and time); <code>signup_cancelled</code> (properties: hours before the shift; question: how late cancellations come, which informs reminder timing). Each carries a keyed-hash pseudonym of the volunteer, not their name. Deliberately not recorded: the volunteer's phone number or name in any event, and free-text fields such as cancellation reasons, which fill with personal details ("my son is in hospital"); ask for those in an interview if you need them.</p>`
        },
        {
          q: `<p>Twelve task times in seconds were 30, 34, 29, 41, 33, 38, 31, 180, 36, 35, 32, 40. Compute the mean, the median and the geometric mean. Which would you report, and what would you do about the 180?</p>`,
          a: `<p>The sum is 559, so the mean is about 46.6 s. Sorted, the middle two values are 34 and 35, so the median is 34.5 s. The geometric mean is exp(mean of the logarithms) ≈ 39.3 s. Report the geometric mean (or the median) with the number of participants, because one slow attempt moves the mean by more than 10 seconds. Don't delete the 180: look at the notes for that session to see what happened (a network drop? a confusing screen?). If it was a failure of the system, it is a usability finding; if the participant was interrupted, report it as excluded and say why.</p>`
        },
        {
          q: `<p><b>Project.</b> Plan your beta release: participants and dates, how users report problems, how you will triage, the summative measures you will take against your requirements' targets (with sample sizes), and your event plan with the data-inventory entries for every property.</p>`,
          a: `<p>A strong plan names real participants and a fallback for the beta period, has a reporting channel that costs users nothing, and has a triage rule with severity and frequency. Its summative measures map to requirement ids, with intervals planned (adjusted Wald for completion rates, an interval for SUS) and sample sizes that make them informative (20 or more). Its event plan starts from questions, uses pseudonyms, records no free text or data about people who aren't users, suppresses small counts in reports, and states how consent and law apply. Weak plans instrument everything and decide what to ask later.</p>`
        }
      ],
      sources: ["sauro11", "sauro05", "agresti98", "nielsen00", "sus", "gdpr"]
    },
    {
      id: "cx3",
      title: "Performance and scaling",
      minutes: 90,
      summary: "Knowing how much load the system must carry and what happens beyond it: back-of-the-envelope capacity estimates, Little's law, why queues explode as utilization approaches 100%, kinds of load test and how to run one honestly (warm-up, open and closed models, coordinated omission), profiling to find where the time goes, and the capacity plan for the readiness review.",
      notes: `
<p>CS 490 Lesson 7 set performance budgets and measured percentiles. Those were measurements of one user at a time. This lesson asks what happens when many users arrive together, and how much load the system can take before it slows down or fails. The answers go into the <strong>capacity plan</strong>, part of the operational readiness review in week 9.</p>
<p>Be honest about scale. Most capstone systems carry little load: the pantry checks in about 120 households on a Saturday morning. Their performance problems are usually a slow page on an old laptop, one query that grows with the data, or a burst that nobody expected, not millions of users. The tools below find all of these, and they are the same tools that large systems use.</p>

<h3>Estimating the load</h3>
<p>Start with arithmetic on paper, before any measurement. A <strong>back-of-the-envelope estimate</strong> multiplies a few known quantities to get an order of magnitude:</p>
<ul>
<li>Saturday check-in: 120 households in 3 hours, each check-in about 6 requests (search, select, confirm, and page assets): 720 requests in 10,800 seconds, about 0.07 requests per second. Trivial.</li>
<li>The Thursday reminder: an SMS to 400 volunteers at 6 p.m., and suppose half of them tap the link within a minute, each loading a page of about 10 requests: 2,000 requests in 60 seconds, about 33 per second. That is a <strong>burst</strong>, 500 times the Saturday rate, and the one to plan for. Round up to 40.</li>
<li>Growth: the city's food-bank network has asked whether its 14 pantries could use the system. Plan for the current load, and know what would change at 14 times.</li>
</ul>
<p>The peak, not the average, is what breaks systems, and peaks come from things the system does itself (reminders, scheduled jobs, a newsletter) as often as from users.</p>

<h3>Little's law</h3>
<p>In any stable system, the average number of requests inside it, <em>L</em>, equals the average arrival rate λ times the average time each spends inside, <em>W</em>:</p>
<p class="math"><em>L</em> = λ<em>W</em></p>
<p>John Little published the first general proof in 1961, and its generality is its power: it holds whatever the distribution of arrivals and service times, for a whole system or any part of it. The intuition is a picture over a long period <em>T</em>: about λ<em>T</em> requests arrive, each contributes <em>W</em> to the total "request-seconds" spent inside, so the total is λ<em>TW</em>, and dividing by <em>T</em> gives the average number inside. Suppose a load test of the reminder burst, 40 requests per second, finds that each request spends 54 ms inside on average, from arrival to response. Then 40 × 0.054 ≈ 2.2 requests are in progress at once. The server has 4 worker processes, each handling one request at a time, so on average about 2 are working and the other 2 are idle; a request waits in a queue only at moments when all 4 are busy, and that waiting is part of the 54 ms. (Had the test found 0.25 s per request, 10 would be inside at once, and since at most 4 can be worked on, at least 6 would be waiting on average: a sign of overload.) The next section shows how waiting depends on how busy the workers are.</p>

<h3>Utilization and queues</h3>
<p>A server's <strong>utilization</strong> ρ is the fraction of time it is busy: the arrival rate times the service time, divided by the number of workers. At 40 requests per second, 0.05 s of work each, and 4 workers, ρ = 40 × 0.05 / 4 = 0.5. Why not run at 95% to save money? Because waiting time grows without bound as ρ approaches 1. Queueing theory's simplest model, the <strong>M/M/1 queue</strong>, gives the mean time in the system as</p>
<p class="math"><em>W</em> = <em>S</em> / (1 − ρ)</p>
<p>where <em>S</em> is the mean service time (the work alone, without waiting). The name is Kendall's notation: arrivals / service times / number of workers. M (for Markov) means memoryless: arrivals form a Poisson process (MATH 230 Lesson 2: independent, at a steady average rate λ), and service times are exponential (MATH 230 Lesson 3), so a request that has been in service for a while is no closer to finishing than a new one. So M/M/1 means Poisson arrivals, exponential service and one worker. It fits many independent users reasonably well; it fits less well when one event sends users together (the reminder burst) or when every request takes nearly the same time, so treat its answers as estimates of shape and size, and check them with a load test.</p>
<pre><code>service = 0.050                                # seconds of work per request
for rho in (0.5, 0.8, 0.9, 0.95, 0.99):
    print(rho, round(1000 * service / (1 - rho)))</code></pre>
<p>Each line is the utilization and the mean response time in milliseconds:</p>
<pre data-label="Output"><code>0.5 100
0.8 250
0.9 500
0.95 1000
0.99 5000</code></pre>
<p>At half load a 50 ms request takes 100 ms on average; at 90%, half a second; at 99%, five seconds. The reason is randomness: arrivals bunch up, and a busy server can't save idle time for later. A server with <em>c</em> workers is the <strong>M/M/<em>c</em></strong> queue, solved by A. K. Erlang in 1917. At the same utilization it waits less than M/M/1, because a request waits only when all <em>c</em> workers are busy. Write <em>a</em> = λ<em>S</em> for the <em>offered load</em>, the average number of busy workers (so ρ = <em>a</em>/<em>c</em>). Erlang's C formula gives the probability that an arriving request finds all <em>c</em> busy, and from it the mean time in the system:</p>
<p class="math"><em>P</em>(wait) = <em>T</em> / (Σ<sub><em>k</em>=0</sub><sup><em>c</em>−1</sup> <em>a</em><sup><em>k</em></sup>/<em>k</em>! + <em>T</em>), where <em>T</em> = (<em>a</em><sup><em>c</em></sup>/<em>c</em>!) / (1 − ρ); &nbsp; <em>W</em> = <em>S</em> + <em>P</em>(wait) × <em>S</em> / (<em>c</em>(1 − ρ))</p>
<p>Take <em>P</em>(wait) as given; the second term of <em>W</em> has a short argument. In M/M/1 the mean wait is <em>W</em> − <em>S</em> = <em>S</em>/(1 − ρ) − <em>S</em> = ρ<em>S</em>/(1 − ρ), and an arrival waits only if the worker is busy, with probability ρ, so a request that does wait waits <em>S</em>/(1 − ρ) on average. With <em>c</em> workers all busy, each finishes at rate 1/<em>S</em> whatever it has done so far (memorylessness), so together they finish one request every <em>S</em>/<em>c</em> on average: while requests are waiting, the queue behaves like an M/M/1 queue with service time <em>S</em>/<em>c</em> and the same ρ. A request that waits therefore waits <em>S</em>/(<em>c</em>(1 − ρ)) on average, and <em>W</em> adds that, times the chance of waiting, to the service time. With <em>c</em> = 1, <em>P</em>(wait) = ρ and the formula gives back <em>S</em>/(1 − ρ).</p>
<p>The burst on 4 workers has <em>a</em> = 40 × 0.05 = 2 and ρ = 0.5. The sum is 1 + 2 + 2²/2 + 2³/6 = 6.33 and <em>T</em> = (16/24)/0.5 = 1.33, so <em>P</em>(wait) = 1.33/7.67 ≈ 0.174 and <em>W</em> = 0.05 + 0.174 × 0.05/2 ≈ 0.0543 s:</p>
<pre><code>from math import factorial

def erlang_c(rate, service, c):
    a = rate * service                     # offered load: workers busy on average
    rho = a / c
    top = a ** c / factorial(c) / (1 - rho)
    return top / (sum(a ** k / factorial(k) for k in range(c)) + top)

rate, service, c = 40, 0.050, 4
p_wait = erlang_c(rate, service, c)
W = service + p_wait * service / (c * (1 - rate * service / c))
print(round(p_wait, 3), round(1000 * W, 1), round(rate * W, 2))   # 0.174 54.3 2.17</code></pre>
<p>So all four workers are busy about 17% of the time (roughly a sixth). (Erlang C gives the chance that an <em>arrival</em> finds all busy; with Poisson arrivals that equals the fraction of <em>time</em> all are busy, because arrivals that come at random moments, independent of the system's state, sample its states in proportion to the time spent in each. The result is called PASTA, Poisson arrivals see time averages.) A request takes about 54 ms rather than M/M/1's 100 ms, and by Little's law about 40 × 0.0543 ≈ 2.2 requests are inside at once: the load test's figures in the previous section. The M/M/1 table is therefore a cautious upper bound for several workers, and its shape, waiting that grows without bound as ρ approaches 1, holds for any number of workers. Real servers aren't exactly either model, but the shape is universal, which is why capacity is planned for a <strong>target utilization</strong> well below 1, commonly 50% to 70% at the expected peak, and why a system that seems fine at 70% can collapse after a small increase in load. Add one <strong>spare</strong> server beyond what the target requires, so that one can fail or be redeployed (Lesson 4) without overloading the rest. For the reminder burst, one server with 4 workers is at 50%, within a 60% target, so the plan is one server plus a spare, or, on a platform that runs several copies of the app, two copies. The second programming problem does this arithmetic.</p>

<h3>Load testing</h3>
<p>Estimates must be checked by measurement. A <strong>load test</strong> drives the system with simulated users at a planned rate and records what happens. Kinds you may need:</p>
<ul>
<li><strong>Load test:</strong> the expected peak, held for several minutes. Does the system meet its targets?</li>
<li><strong>Stress test:</strong> increase the rate step by step until something fails, to find the limit and see <em>how</em> it fails: slowly and gracefully (rejecting extra requests, CS 410 Lesson 8's load shedding) or by falling over.</li>
<li><strong>Spike test:</strong> jump from idle to the burst, as the reminders do.</li>
<li><strong>Soak test:</strong> moderate load for hours, which finds memory leaks, full disks and connection pools that slowly run dry.</li>
</ul>
<p>Tools such as Locust (scenarios written in Python), k6 and JMeter generate the load. Run them against staging, set up like production, and never against production or a third party's service (the SMS provider, a payment API) without written permission: an unannounced load test is indistinguishable from a denial-of-service attack. Three details decide whether the numbers mean anything:</p>
<ul>
<li><strong>Warm-up.</strong> The first requests are slow for reasons users rarely meet: empty caches, a just-started process loading its code, a database opening its files. Discard the first minute or so, and report that you did.</li>
<li><strong>Open and closed models.</strong> A <em>closed</em> load generator has a fixed number of simulated users, each waiting for its reply before sending the next request. When the server slows down, the generator automatically slows down too, which hides the overload. An <em>open</em> generator sends requests at a fixed rate whatever happens, as independent real users do. Burst traffic is open.</li>
<li><strong>Coordinated omission.</strong> Gil Tene named the measurement error that closed generators make: when the server stalls, the generator stops sending, so the requests that real users would have sent during the stall, and that would all have been slow, are never recorded.</li>
</ul>
<p>Here is coordinated omission in numbers. A generator is meant to send a request every 10 ms. The server answers in 2 ms, except once, when it stalls for a full second, during which the generator waits. Of 1,000 recorded latencies, 999 are 2 ms. The correction used by Tene's HdrHistogram library adds the latencies the missing requests would have seen: 990 ms, 980 ms, and so on down to 10 ms.</p>
<pre><code>import math

def percentile(values, p):                     # nearest rank, as in CS 490 Lesson 7
    s = sorted(values)
    return s[math.ceil(p * len(s) / 100) - 1]

def correct(latencies, interval):
    out = []
    for lat in latencies:
        out.append(lat)
        missing = lat - interval
        while missing >= interval:
            out.append(missing)
            missing -= interval
    return out

recorded = [2] * 999 + [1000]
fixed = correct(recorded, 10)
print(percentile(recorded, 99), len(fixed), percentile(fixed, 99))   # 2 1099 900</code></pre>
<p>The uncorrected test reports a 99th percentile of 2 ms. In fact about 9% of the requests that should have been sent (100 of 1,099) would have waited 10 ms or more, and the 99th percentile is 900 ms. The first programming problem includes this correction and a load-test summary that discards the warm-up and reports throughput, error rate and percentiles of the successful requests.</p>

<h3>Profiling: find where the time goes</h3>
<p>When a test misses its target, measure before changing anything. Programmers' guesses about where time goes are usually wrong, which is why Donald Knuth's 1974 warning that "premature optimization is the root of all evil" ends by saying that we should not pass up our opportunities in the critical 3%, once a measurement has found it. A <strong>profiler</strong> runs the program and reports how much time each function takes. Python's built-in one runs from the command line:</p>
<pre data-label="Shell"><code>python -m cProfile -s cumulative server.py    # sort the report by cumulative time</code></pre>
<p>Here <code>server.py</code> stands for whatever script starts your application; for a web framework, it is the framework's command that starts the development server.</p>
<p>For a web request, tracing (CS 410 Lesson 8) shows the same thing across the browser, the server and the database. Amdahl's law (CS 230 Lesson 8) says what a fix can gain: speeding up a part that takes 10% of the time can save at most 10%. In web applications the time is most often in the database, and the most common single cause is the <strong>N + 1 query problem</strong>: code that runs one query for a list and then one more for each item. Object-relational mappers, which turn table rows into objects, make it easy to write by accident. Counting queries shows it:</p>
<pre><code>import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE household (id INTEGER PRIMARY KEY, name TEXT)")
db.execute("CREATE TABLE visit (id INTEGER PRIMARY KEY, household INTEGER, day TEXT)")
db.executemany("INSERT INTO household VALUES (?, ?)", [(i, f"Household {i}") for i in range(1, 201)])
db.executemany("INSERT INTO visit (household, day) VALUES (?, '2027-03-06')", [(i,) for i in range(1, 201)])

queries = []
db.set_trace_callback(queries.append)          # called with the text of every statement run

def todays_visits_slow():                      # one query for the visits, then one per visit
    rows = db.execute("SELECT household FROM visit WHERE day = '2027-03-06'").fetchall()
    return [db.execute("SELECT name FROM household WHERE id = ?", (h,)).fetchone()[0] for (h,) in rows]

def todays_visits_fast():                      # one query with a join (CS 340 Lesson 2)
    return [name for (name,) in db.execute(
        "SELECT h.name FROM visit v JOIN household h ON h.id = v.household WHERE v.day = '2027-03-06'")]

assert sorted(todays_visits_slow()) == sorted(todays_visits_fast())
queries.clear()
todays_visits_slow()
print(len(queries))                            # 201
queries.clear()
todays_visits_fast()
print(len(queries))                            # 1</code></pre>
<p>On a laptop with an in-memory database, 201 queries are fast. Against a hosted database 20 ms away over the network, they cost 4 seconds. Other usual suspects: a missing index on a column used in a WHERE clause (CS 340 Lesson 5; the query plan shows a full scan), work done on every request that could be done once (computing a report that changes daily), and pages that send far more data than they show. Fix the biggest measured cost, measure again, and stop when the target is met.</p>

<h3>The capacity plan</h3>
<p>For the readiness review, one page: the expected load and peaks with the arithmetic behind them; the load test's setup (tool, open or closed, rate, duration, warm-up, environment) and results against the performance targets; the limit found by the stress test and how the system behaves beyond it; the utilization at peak and the number of servers or copies, with the spare; what would change at ten times the load (for the pantry: a database index and a second copy of the app, not a new architecture); and the measurement that will warn you as load grows, which is Lesson 4's monitoring. Thesis students evaluating a system's performance use the same rules for their experiments: warm-up, open load, corrected latencies, and percentiles, not means.</p>
`,
      terms: [
        ["Back-of-the-envelope estimate", "A rough calculation from a few known quantities, to find the order of magnitude of a load or cost."],
        ["Burst", "A short period of load far above the average, often caused by the system itself, such as a batch of notifications."],
        ["Little's law", "In a stable system, the average number of items inside equals the arrival rate times the average time each spends inside: L = λW."],
        ["Utilization", "The fraction of time a resource is busy: arrival rate times service time, divided by the number of workers."],
        ["M/M/1 queue", "A queueing model with random arrivals, random service times and one server; its mean time in the system is S/(1 − ρ)."],
        ["Target utilization", "The utilization a capacity plan allows at the expected peak, usually 50% to 70%, leaving room for bursts."],
        ["Load test", "Driving a system with simulated users at a planned rate to measure its performance."],
        ["Stress test", "Increasing load until the system fails, to find its limit and how it fails."],
        ["Soak test", "Running moderate load for hours to find slow failures such as leaks."],
        ["Open and closed load models", "An open generator sends requests at a fixed rate; a closed one has fixed users who wait for each reply, and so slows when the server does."],
        ["Coordinated omission", "The error of a load test that stops sending while the server stalls, so the slow requests real users would have sent are never measured."],
        ["Profiler", "A tool that measures how much time each part of a running program takes."],
        ["N + 1 query problem", "Fetching a list with one query and then each item's details with one query each, instead of one join."]
      ],
      quiz: [
        { q: "A service receives 40 requests per second and each spends 0.25 s inside it. By Little's law, how many requests are inside at once on average?", choices: ["0.16", "10", "40", "160"], answer: 1, why: "L = λW = 40 × 0.25 = 10." },
        { q: "In the M/M/1 model, a request needs 50 ms of work. What is the mean response time at 90% utilization?", choices: ["55 ms", "100 ms", "500 ms", "5 s"], answer: 2, why: "W = S/(1 − ρ) = 50/(1 − 0.9) = 500 ms." },
        { q: "Why do capacity plans target 50% to 70% utilization at peak rather than 95%?", choices: ["Servers overheat above 70%", "Waiting time grows without bound as utilization approaches 100%, so small increases in load cause large slowdowns", "Cloud providers require it", "Utilization can't be measured above 70%"], answer: 1, why: "The 1/(1 − ρ) factor is 2 at 50% but 20 at 95%." },
        { q: "What is coordinated omission?", choices: ["Leaving out the warm-up", "A load generator that waits for slow replies and so never sends, or measures, the requests real users would have sent during a stall", "Two testers running tests at the same time", "Omitting failed requests from the error rate"], answer: 1, why: "In the notes, it makes a 900 ms 99th percentile look like 2 ms." },
        { q: "A page makes 201 database queries where one would do. What is this called, and how is it usually fixed?", choices: ["A deadlock; with a lock", "The N + 1 query problem; with a join or a batched query", "Coordinated omission; with a correction", "A cache miss; with more memory"], answer: 1, why: "One query for the list and one per item; a join fetches everything at once." },
        { q: "Which load test would most likely find a memory leak?", choices: ["A spike test", "A soak test", "A stress test", "A unit test"], answer: 1, why: "Leaks show up as slow growth over hours of moderate load." }
      ],
      practice: [
        {
          q: `<p>The food-bank network's 14 pantries would each send their Thursday reminders at 6 p.m. to about 400 volunteers. Using the notes' assumptions (half tap within a minute, about 10 requests per page load), estimate the peak request rate. With 50 ms of work per request, 4 workers per server and a 60% target, how many servers (plus one spare) are needed? Suggest a cheaper fix.</p>`,
          a: `<p>Per pantry: 200 volunteers × 10 requests in 60 s ≈ 33 requests per second; for 14 pantries, about 467 per second. One server does at most 4/0.05 = 80 requests per second, or 48 at 60%. 467/48 ≈ 9.7, so 10 servers plus a spare: 11. The cheaper fix is to remove the burst, which the system itself creates: stagger the reminders (each pantry at a random minute between 5 and 7 p.m., or batches of 50 a minute), and serve the page's static files from a cache or CDN so that only one or two of the ten requests reach the app. Spread over two hours, the same load is about 4 requests per second, and one server plus a spare is plenty.</p>`
        },
        {
          q: `<p>A closed load test with 20 simulated users reports a median of 40 ms and a 99th percentile of 60 ms, at 450 requests per second. Production users complain of occasional 3-second waits. Give two reasons the test may have missed them, and how you would change it.</p>`,
          a: `<p>(1) Coordinated omission: with only 20 users each waiting for its reply, the generator stopped sending during stalls, so the slow periods are barely represented. Run an open test at a fixed arrival rate, or apply the correction for the intended interval. (2) The test may not match real conditions: warm staging caches, a small test database, no burst, or a short run that misses periodic events (a nightly backup, garbage collection, a cron job). Use production-sized synthetic data, include a spike test at the reminder burst, and run a soak test long enough to cover the periodic jobs. Then correlate the complaints' timestamps with the server's metrics to find what happens at those moments.</p>`
        },
        {
          q: `<p>A server has 4 workers, 0.1 s of work per request and 30 requests per second arriving. Will its queue grow without bound? What is its utilization? What is the largest arrival rate it can sustain, and at what rate would it reach a 60% target?</p>`,
          a: `<p>Utilization ρ = 30 × 0.1/4 = 0.75, so it is not overloaded; at 30 requests per second its queue stays bounded. (A common mistake is to forget the 4 workers.) Capacity is 4/0.1 = 40 requests per second: at 40 or above, ρ ≥ 1, arrivals outpace service, and the number inside grows without bound, so Little's law's "stable system" no longer applies. At a 60% target, 0.6 × 40 = 24 requests per second, so at 30 the server is above target and should get a second copy before the next burst.</p>`
        },
        {
          q: `<p><b>Project.</b> Write your capacity plan: estimate your expected load and peaks, run a load test (state the tool, model, rate, duration, warm-up and environment) and a stress test, profile the slowest request and fix its biggest measured cost, and record the before-and-after numbers.</p>`,
          a: `<p>A strong plan shows the arithmetic of its estimates and identifies bursts the system creates. Its load test is open (or corrected for coordinated omission), discards a stated warm-up, runs against staging with production-sized synthetic data, and reports throughput, error rate and p50/p95/p99 of successful requests against the performance targets by requirement id. The stress test gives the limit and the failure mode. The profiling section names the measured bottleneck (often a query) and shows the improvement with numbers. It states the utilization at peak, the spare capacity, and what would change at ten times the load.</p>`
        }
      ],
      sources: ["little61", "tailatscale", "ddia", "srebook", "pyprofile"]
    },
    {
      id: "cx4",
      title: "Shipping and operating",
      minutes: 90,
      summary: "Running the system for real: deployment strategies and changing a database without downtime, monitoring the four golden signals, choosing SLIs and SLOs from user journeys, alerting on error-budget burn rates over two windows, an error budget policy, responding to an incident with clear roles, and writing a postmortem that produces change.",
      notes: `
<p>CS 240 Lesson 8 introduced service-level objectives, error budgets and blameless postmortems, and CS 490 Lesson 6 built a pipeline that deploys every merge to staging. This lesson puts them to work on a system people depend on. Its outputs (an SLO, alerts, a deployment and rollback procedure, and an incident drill) are most of the operational readiness review in week 9.</p>

<h3>Deployment strategies</h3>
<p>Every deployment is a risk, because it changes a working system. Strategies differ in how much of that risk users carry and how quickly it can be undone:</p>
<table>
<tr><th>Strategy</th><th>How it works</th><th>Trade-off</th></tr>
<tr><td>Recreate</td><td>Stop the old version, start the new one</td><td>Simple; downtime during the switch; rollback is another deployment</td></tr>
<tr><td>Rolling</td><td>Replace copies one at a time</td><td>No downtime; old and new versions run side by side for a while</td></tr>
<tr><td>Blue-green</td><td>Start the new version beside the old one, test it, then switch all traffic at once</td><td>Instant rollback by switching back; needs two environments' worth of resources</td></tr>
<tr><td>Canary</td><td>Send a small fraction of traffic to the new version, compare its errors and latency with the old, then increase</td><td>Problems hit few users; needs enough traffic to compare</td></tr>
</table>
<p>A canary is CS 490 Lesson 6's percentage rollout applied to a whole version rather than one feature. For a capstone, a blue-green deployment on a hosting platform (most offer "deploy a new release, then promote it") or a rolling deployment with a rehearsed rollback is usually right. Decide in advance what triggers a rollback ("error rate above 2% for 5 minutes after a deploy") so that nobody debates it during an incident. And never deploy just before the pantry opens on a Saturday: a <strong>change freeze</strong> around critical periods is ordinary practice, and the incident at the end of this lesson shows why.</p>
<p>Rolling and blue-green deployments both mean that for a while the old code runs against the new database, or the new code against the old. A schema change must therefore be compatible both ways. Renaming the column <code>card_no</code> to <code>card_number</code> in one migration breaks every old copy still running. The safe way is <strong>expand and contract</strong> (Lesson 5's parallel change, applied to data): deploy a migration that adds <code>card_number</code> and code that writes both columns; backfill the old rows; deploy code that reads the new column; and only when no running code uses <code>card_no</code>, drop it. Each step can be deployed, and rolled back, on its own.</p>

<h3>Monitoring</h3>
<p>Monitoring answers "is it working for users right now?" Google's SRE book recommends watching four <strong>golden signals</strong> for every user-facing service: <strong>latency</strong> (of successful and failed requests separately, since a fast error isn't a fast success), <strong>traffic</strong> (requests per second), <strong>errors</strong> (the rate of failed requests, including wrong answers if you can detect them) and <strong>saturation</strong> (how full the most constrained resource is: CPU, memory, database connections, disk). These are close to CS 410 Lesson 8's RED metrics, with saturation added. Two kinds of check complement each other:</p>
<ul>
<li><strong>White-box</strong> monitoring uses the system's own metrics and logs: the error rate the app counts.</li>
<li><strong>Black-box</strong> monitoring tests from outside, as a user would: a probe that loads the check-in page every minute from another network. It catches what the system can't see about itself, such as an expired TLS certificate or a DNS mistake.</li>
</ul>
<p>Alert on <strong>symptoms</strong> that users feel (check-ins are failing), not on every possible cause (CPU is at 80%), and send causes to a dashboard for diagnosis. Every alert that wakes someone must be urgent, actionable and linked to a runbook (Lesson 7). An alert that fires often and needs no action trains people to ignore alerts, including the real one.</p>

<h3>SLIs and SLOs from user journeys</h3>
<p>A service-level indicator (SLI) is best written as a ratio of <strong>good events to valid events</strong>, which makes it a number between 0 and 1 for any window. Choose two or three, from the journeys users care most about, not from what is easy to measure:</p>
<ul>
<li><strong>Check-in availability:</strong> the fraction of check-in requests during opening hours that succeed. A check-in request is any request the check-in screens make (search, select, confirm and page assets, about 6 per household; Lesson 3), so a Saturday averages 4 a minute, 240 an hour.</li>
<li><strong>Check-in latency:</strong> the fraction that succeed within 2 seconds, measured at the server (and, through Lesson 2's analytics, in the browser).</li>
<li><strong>Sign-up freshness:</strong> the fraction of minutes in which the shift schedule shown is less than 5 minutes old.</li>
</ul>
<p>Each SLO puts a target on an SLI over a window: "99% of check-ins during opening hours succeed, over a rolling 30 days". (Many teams use 28 days instead, four whole weeks, so that every window holds the same number of Saturdays. The pantry uses 30, as the SRE Workbook's examples do; the period matters, because the alert thresholds below are computed from it.) Set it from what users need and what the system can do, not at "as many nines as possible" (CS 240 Lesson 8's table shows the cost of each nine). The pantry's paper fallback and long queue tolerance make 99% reasonable; an ambulance dispatcher's wouldn't.</p>

<h3>Alerting on burn rate</h3>
<p>The simplest alert, "error rate above 0.1%", is a poor one. Over a few minutes of low traffic one failed request crosses it; and a steady error rate just above the SLO, which will exhaust the budget in a few weeks, may never look alarming at any moment. The SRE Workbook (2018) recommends alerting on the <strong>burn rate</strong>: how fast the error budget is being spent, relative to the rate that would spend exactly all of it over the SLO's period.</p>
<p class="math">burn rate = (error rate in the window) / (1 − SLO)</p>
<p>A burn rate of 1 spends the budget exactly by the period's end; 14.4 spends it in 30/14.4 ≈ 2 days. In a window of length <em>w</em>, a burn rate <em>b</em> uses a fraction <em>b</em> × <em>w</em> / period of the budget:</p>
<pre><code>period = 30 * 24 * 60                          # minutes in a 30-day SLO period
for burn, window in ((14.4, 60), (6, 360), (1, 4320)):
    print(burn, window, round(burn * window / period, 2), round(period / burn / 60, 1))</code></pre>
<pre data-label="Output"><code>14.4 60 0.02 50.0
6 360 0.05 120.0
1 4320 0.1 720.0</code></pre>
<p>Each line is a burn rate, a window in minutes, the fraction of the budget that window uses, and the hours until the whole budget would be gone. These are the Workbook's recommended rules: <strong>page</strong> someone when 2% of the month's budget is spent in an hour (burn above 14.4) or 5% in six hours (above 6), and open a <strong>ticket</strong> when 10% is spent in three days (above 1). Each rule also requires a <strong>short window</strong>, one twelfth of the long one (5 minutes, 30 minutes, 6 hours), to show the same burn, so that the alert stops soon after the problem is fixed instead of firing for the rest of the hour. The first programming problem implements these rules and the budget remaining.</p>
<p>Low traffic is the capstone's special difficulty. If the pantry handles 240 check-in requests in an hour, four failures make the error rate 1.7% and the burn rate, against a 99% SLO, 1.7: noise can look like a burn. Count over longer windows, require a minimum number of events before an alert fires, or add a black-box probe that generates steady traffic.</p>

<h3>The error budget policy</h3>
<p>The budget is useful only if everyone agrees in advance what it decides. An <strong>error budget policy</strong>, agreed with the client, might say: while budget remains, deploy normally; if a single incident uses more than 20% of it, a postmortem is required; if the budget is spent, stop deploying features until the SLO has been met for a week, and spend the time on reliability. It turns "should we ship this on Friday?" into a rule nobody has to argue about.</p>

<h3>Responding to an incident</h3>
<p>An <strong>incident</strong> is an unplanned event that harms users or threatens to. When one starts, CS 240's first rule applies: mitigate first (roll back, turn off a feature with its kill switch, fail over), and find the cause later. The SRE book's incident management chapter adds structure, scaled down here for a team of four:</p>
<ul>
<li><strong>Declare it</strong> early, in the agreed channel, with a severity: SEV-1 users can't do the core task, SEV-2 degraded, SEV-3 minor. Declaring an incident that turns out small costs little; a silent one that grows costs a lot.</li>
<li><strong>Roles.</strong> One <strong>incident commander</strong> coordinates, decides and delegates, and does not debug; one or two people do the operations work; one person handles <strong>communication</strong> with the client and users ("check-in is down; use the paper list; next update in 15 minutes"); and someone keeps a timestamped log of actions. In a small team one person may hold two roles, but the commander should not also be the main debugger.</li>
<li><strong>Hand over explicitly</strong> if the incident outlasts someone's shift: "you are now incident commander".</li>
<li><strong>Close it</strong> when users are no longer affected, and schedule the postmortem.</li>
</ul>
<p>The readiness review includes an <strong>incident drill</strong> (a "game day"): break staging on purpose (stop the database, deploy a version with a failing migration) and let the on-call member respond with only the alerts, the dashboards and the runbook. The drill tests the documents as much as the people.</p>

<h3>Postmortems that produce change</h3>
<p>CS 240 Lesson 8 set out the blameless postmortem. In practice its quality depends on a few things:</p>
<ul>
<li><strong>A timeline from evidence,</strong> merged from every source's logs into one time zone (the second programming problem), not from memory. From it come two numbers worth tracking across incidents: the <strong>time to detect</strong>, from the start of user impact to the first alert, and the <strong>time to mitigate</strong>, from the start to when users were no longer affected. In the pantry's first incident, on Saturday 13 March 2027, version 0.6.0 dropped a column that the still-running old copies needed (the expand-and-contract mistake above), and the check-ins those copies served failed: errors began at 15:01:40 UTC, the burn-rate page fired at 15:09:00, and the rollback finished at 15:24:00, so detection took 7.3 minutes and mitigation 22.3. The page could fire that soon because the pantry opens at 15:00 UTC (10:00 local time) and the SLI counts only opening hours, so at 15:09 the one-hour window held just nine minutes of requests: about 36 (Lesson 3's 4 a minute), of which 8 had failed, an error rate of 22% and a burn rate of 22, with the five-minute window higher still. It fired no sooner because the pantry's rule also needs at least 35 requests in the window (the low-traffic minimum above), reached just before 15:09, and the rules are evaluated once a minute.</li>
<li><strong>Contributing factors, not a root cause.</strong> Incidents almost always need several things to go wrong together: the deploy started at 09:58 local time, two minutes before opening, although the team's rule was a change freeze then; the migration dropped the column, the review didn't catch it, staging ran only one copy so the mixed-version state never occurred there, and rollback took 15 minutes because it had never been rehearsed. Each factor is a place to act.</li>
<li><strong>Action items with owners and dates,</strong> tracked like any other work, and checked at the next retrospective. Prefer actions that change the system (a CI check that rejects a migration dropping a column still in the code; a pipeline that refuses production deploys during the Saturday freeze) over actions that ask people to be careful.</li>
<li><strong>What went well,</strong> too: the alert fired, and the paper fallback worked.</li>
</ul>
`,
      terms: [
        ["Rolling deployment", "Replacing a service's running copies with the new version one at a time."],
        ["Blue-green deployment", "Running the new version beside the old one and switching all traffic at once, so rollback is switching back."],
        ["Canary release", "Sending a small fraction of traffic to a new version and comparing its behavior with the old before increasing it."],
        ["Change freeze", "A period, such as before a critical event, during which no deployments are made."],
        ["Expand and contract", "Changing a schema in compatible steps: add the new form, migrate data and code to it, and remove the old form last."],
        ["Golden signals", "Latency, traffic, errors and saturation: the four measurements to monitor for a user-facing service."],
        ["Black-box monitoring", "Checking a system from outside, as a user would, rather than from its own metrics."],
        ["SLI as a ratio", "A service-level indicator written as good events divided by valid events."],
        ["Burn rate", "The error rate in a window divided by the error budget rate (1 − SLO); 1 spends the budget exactly over the period."],
        ["Multiwindow alert", "An alert that fires only when the burn rate is high over both a long window and a short one."],
        ["Error budget policy", "An agreement on what the team does when the error budget is healthy, heavily used or spent."],
        ["Incident commander", "The person who coordinates an incident response, making decisions and delegating rather than debugging."],
        ["Time to detect and time to mitigate", "The minutes from the start of user impact to the first alert, and to the end of user impact."],
        ["Game day", "A planned exercise in which a team breaks a system on purpose to practice incident response."]
      ],
      quiz: [
        { q: "Why is renaming a database column in a single migration dangerous with a rolling deployment?", choices: ["Migrations can't rename columns", "Old copies of the code still running during the rollout use the old name and fail", "Rolling deployments don't run migrations", "It makes the database slower"], answer: 1, why: "Old and new versions run together for a while, so each schema change must work with both; expand and contract does that." },
        { q: "Which is a symptom worth paging someone for?", choices: ["CPU at 80%", "Check-ins failing faster than the error budget allows", "A dependency has a new release", "Disk 50% full"], answer: 1, why: "Alert on what users feel; causes go to dashboards." },
        { q: "The SLO is 99.9%. Over the last hour, 0.72% of requests failed. What is the burn rate?", choices: ["0.72", "7.2", "14.4", "72"], answer: 1, why: "0.0072 / 0.001 = 7.2." },
        { q: "A burn rate of 14.4 sustained for one hour uses what fraction of a 30-day error budget?", choices: ["0.2%", "2%", "14.4%", "50%"], answer: 1, why: "14.4 × 60 / 43,200 = 0.02." },
        { q: "Why does each burn-rate rule also require a short window to be burning?", choices: ["To detect problems faster", "So the alert stops soon after the problem is fixed, rather than firing for the rest of the long window", "To save computing time", "Because short windows are more accurate"], answer: 1, why: "The long window remembers an hour of errors; the short one shows whether they are still happening." },
        { q: "During an incident, what should the incident commander mainly do?", choices: ["Debug the problem personally", "Coordinate: make decisions, assign work and make sure users and the client are kept informed", "Write the postmortem", "Find who caused it"], answer: 1, why: "A commander who is also debugging loses track of the response." }
      ],
      practice: [
        {
          q: `<p>Write two SLIs and SLOs for the pantry's volunteer shift sign-up (volunteers open the schedule on their phones and sign up for shifts). For each, say what counts as a good event and a valid event, the target and the window, and why you chose that target.</p>`,
          a: `<p>(1) Sign-up availability: valid events are sign-up requests that reach the server and aren't the user's fault (not 4xx validation errors); good events are those that succeed. SLO: 99.5% over 30 days. Sign-ups can be retried and nothing is lost in a few minutes, so 99.5% (about 3.6 hours of failure in 30 days) is enough, and more would cost effort better spent elsewhere. (2) Schedule latency: valid events are schedule page loads; good ones are served in under 1.5 s at the server. SLO: 95% over 30 days, matching the performance budget (CS 490 Lesson 7). An SLO on schedule freshness (the page shows sign-ups less than a minute old) is a reasonable third. Avoid an SLO on CPU or uptime of a machine: users don't experience those directly.</p>`
        },
        {
          q: `<p>For a 99% SLO over 30 days, at what error rates do the notes' three rules fire? The pantry is open only on Saturdays from 10:00 to 13:00, with steady traffic of 4 check-in requests a minute. The SLI counts only opening hours, so each window holds the requests made during opening hours within that span of clock time, and closed hours add nothing. One Saturday at 11:00, after no failures that week or that morning, an incident makes 10% of check-in requests fail. Which paging rule fires first, and when? (Evaluate the rules once a minute, with the notes' minimum of 35 requests.)</p>`,
          a: `<p>The budget rate is 1 − 0.99 = 1%. The rules fire at error rates above 14.4% (one hour and five minutes), 6% (six hours and 30 minutes) and 1% (three days and six hours). At 10% errors the one-hour rule never fires: 10% is below 14.4%. The six-hour rule fires first. Its 30-minute short window is above 6% from 11:19 (0.10 × <em>t</em>/30 &gt; 0.06 once <em>t</em> &gt; 18 minutes). Its six-hour window reaches back to 10:00, the last time there was traffic, so <em>t</em> minutes after 11:00 it holds 60 + <em>t</em> minutes of requests, of which 10% of <em>t</em> minutes' worth failed: 0.10<em>t</em>/(60 + <em>t</em>) &gt; 0.06 when 0.04<em>t</em> &gt; 3.6, that is <em>t</em> &gt; 90. The window holds far more than 35 requests, so the page fires at 11:31, an hour and a half into the incident and halfway to closing. (The ticket rule fires sooner, at 11:07, since its three-day window holds only this morning: 0.10<em>t</em>/(60 + <em>t</em>) &gt; 0.01 once <em>t</em> &gt; 6.7. But a ticket isn't read until a working day.) Ninety minutes of failing check-ins is too slow for a Saturday morning, which shows why low-traffic, short-session services need an extra alert on a simple count (such as "more than 5 failed check-ins in 10 minutes during opening hours"), alongside the burn-rate rules.</p>`
        },
        {
          q: `<p>Plan the expand-and-contract steps to split the <code>household.name</code> column into <code>family_name</code> and <code>given_names</code>, with the system running throughout. For each step, say what is deployed and how you would roll it back.</p>`,
          a: `<p>(1) Migration adds nullable <code>family_name</code> and <code>given_names</code>; code unchanged. Rollback: drop them. (2) Deploy code that writes all three columns on every insert and update. Rollback: previous code (the new columns are simply ignored). (3) Backfill: a script splits existing names, logging the ones it can't split confidently for Maria to check. Rollback: clear the new columns. (4) Deploy code that reads the new columns (search, display), still writing all three. Rollback: the step-2 code. (5) After a week with no problems, deploy code that stops writing <code>name</code>. (6) Once no running version reads it, a migration drops <code>name</code>, after a backup. Only step 6 is hard to roll back, which is why it comes last and after a backup.</p>`
        },
        {
          q: `<p><b>Project.</b> Prepare your operational readiness review: your deployment strategy and rollback trigger, your SLIs and SLOs, the alerts with their windows and runbook links, an error budget policy agreed with your client, and the record of an incident drill on staging with its time to detect, time to mitigate and the action items it produced.</p>`,
          a: `<p>A strong review shows a deployment that can be rolled back in minutes (and was, in rehearsal), a schema-change procedure that respects mixed versions, two or three SLIs as good/valid ratios chosen from user journeys, burn-rate alerts adjusted for the project's low traffic, and a black-box probe. Every alert links to a runbook. The budget policy is written and the client agreed to it. The drill used only the documents and dashboards, recorded its timeline, and produced a few concrete actions with owners, some of which are already done.</p>`
        }
      ],
      sources: ["srebook", "sreworkbook", "parallelchange", "gitlab17"]
    },
    {
      id: "cx5",
      title: "Maintaining the system",
      minutes: 90,
      summary: "Keeping a system healthy while it changes: why software in use must keep changing, choosing which debt to repay by where the code changes most, refactoring safely with characterization tests, parallel change and the strangler fig, dependency constraints and how they are resolved, versioning your own releases, and triaging security updates.",
      notes: `
<p>In 1980 Meir Lehman summarized years of studying how large systems, starting with IBM's OS/360, changed after release. His first two "laws of software evolution" describe your second term. A program used in the real world must keep changing, or it becomes steadily less useful, because the world it serves changes. And as it changes, its complexity grows, unless work is done to reduce it. Maintenance is that work. CS 240 Lesson 8 called it most of the cost of software; this lesson is about doing it while the system stays in use, and about leaving it maintainable for the people after you.</p>

<h3>Which debt to repay</h3>
<p>CS 490 Lesson 6 had you record each deliberate shortcut as an issue with its interest and a repayment trigger, and the second-term plan (Lesson 1) reserved a fifth of the building time for repaying it. There is never enough time for all of it, so choose. Debt costs interest only when someone works on the code: an ugly module that nobody touches costs nothing. Adam Tornhill's <strong>hotspot</strong> analysis uses version history to find where the interest is paid. Rank files by how often they change (their <strong>churn</strong>, from the commit log, as CS 490 Lesson 5's bus factor did) times a rough measure of their complexity, such as their length:</p>
<pre><code>commits = {"checkin.py": 48, "reports.py": 31, "models.py": 22, "sms.py": 6, "settings.py": 40}
lines = {"checkin.py": 610, "reports.py": 900, "models.py": 350, "sms.py": 800, "settings.py": 60}
for f in sorted(commits, key=lambda f: -commits[f] * lines[f]):
    print(f, commits[f] * lines[f])</code></pre>
<pre data-label="Output"><code>checkin.py 29280
reports.py 27900
models.py 7700
sms.py 4800
settings.py 2400</code></pre>
<p>The SMS module is long but rarely changed: leave it. The settings file changes often but is short and simple. The check-in and report modules are both large and busy, and every future change will pay their interest, so refactor them first. The ranking is a starting point for a conversation, not a verdict: combine it with the debt issues and with what the remaining stories will touch.</p>

<h3>Refactoring safely</h3>
<p>Refactoring changes structure without changing behavior (CS 240 Lesson 4). In a system with real users "without changing behavior" must be checked, not hoped. Three techniques, from smallest to largest:</p>
<p><strong>Characterization tests.</strong> Before changing code you don't fully understand, write tests that record what it does now, right or wrong (CS 240 Lesson 4). For code with a few inputs, a <strong>golden master</strong> does this wholesale: run the old code on many inputs, save the outputs, and check that the new code gives the same ones. Here the pantry's rule for how many food boxes a household gets has grown nested and hard to read:</p>
<pre><code>def boxes_old(size, visits_this_month, has_infant):
    b = 1
    if size > 2:
        b = b + 1
    if size > 5:
        b = b + 1
    if visits_this_month >= 2:
        if size &lt;= 2:
            b = 1
        else:
            b = b - 1
    if has_infant == True:
        b += 1
    return b

cases = [(s, v, i) for s in range(1, 10) for v in range(0, 5) for i in (False, True)]
golden = {c: boxes_old(*c) for c in cases}

def boxes(size, visits_this_month, has_infant):
    base = 1 + (size > 2) + (size > 5)     # True counts as 1
    if visits_this_month >= 2:
        base = max(1, base - 1)
    return base + has_infant

print(len(cases), all(boxes(*c) == golden[c] for c in cases))   # 90 True</code></pre>
<p>All 90 combinations agree, so the clearer version can replace the old one. If one hadn't, the golden master would have shown exactly which input changed, and the team would then decide, with Maria, whether the old behavior was a rule or a bug. For inputs too many to enumerate, use a sample instead: generate a few thousand synthetic requests that resemble real ones (real requests carry personal data, so don't copy them), run the old code on each and record its responses. Those recorded responses are the golden master that the new code must reproduce.</p>
<p><strong>Parallel change.</strong> To change an interface that other code uses, such as a function's parameters or an API route, don't change it in one step. Danilo Sato's <strong>parallel change</strong> (2014) has three phases: <em>expand</em> (add the new form beside the old, both working), <em>migrate</em> (move the callers one at a time, each change small and deployable), and <em>contract</em> (remove the old form once nothing uses it). Lesson 4 applied the same idea to a database column. Each phase leaves the system working, so trunk-based development (CS 490 Lesson 6) continues throughout.</p>
<p><strong>The strangler fig.</strong> To replace a whole module, Martin Fowler's <strong>strangler fig</strong> pattern grows the new implementation around the old, named after vines that grow around a host tree until they can stand alone. Put a routing point in front of the old module, send one kind of request at a time to the new code (behind a feature flag, CS 490 Lesson 6), and remove the old module when nothing reaches it. While both exist, you can run them side by side on the same requests and compare their answers before trusting the new one. This is the "gradual replacement" CS 240 Lesson 8 preferred to a rewrite, given a name and a method.</p>

<h3>Dependencies and their constraints</h3>
<p>CS 240 and CS 380 Lesson 8 explained lockfiles: exact versions of every package, direct and <strong>transitive</strong> (the packages your packages use), so that builds are reproducible and updates are deliberate. The lockfile is generated from a <strong>manifest</strong> (<code>pyproject.toml</code>, <code>package.json</code>) in which each direct dependency has a <strong>version constraint</strong>: the range of versions the project accepts. CS 240 Lesson 6 introduced one form, the caret. The common ones:</p>
<table>
<tr><th>Constraint</th><th>Meaning</th><th>Example</th></tr>
<tr><td><code>^1.4.2</code></td><td>Compatible by semver: at least 1.4.2, below the next increase of the left-most non-zero part</td><td>1.4.2 to below 2.0.0; ^0.4.2 is below 0.5.0</td></tr>
<tr><td><code>~1.4.2</code></td><td>Patch updates only (npm's tilde)</td><td>1.4.2 to below 1.5.0</td></tr>
<tr><td><code>&gt;=1.9.0, &lt;2.0.0</code></td><td>An explicit range; all comparators must hold</td><td>1.9.0 to below 2.0.0</td></tr>
<tr><td><code>~=1.4.2</code></td><td>Python's "compatible release" (PEP 440)</td><td>1.4.2 to below 1.5; ~=1.4 is 1.4 to below 2</td></tr>
<tr><td><code>==1.4.2</code> or <code>1.4.2</code></td><td>Exactly one version</td><td></td></tr>
</table>
<p>A <strong>resolver</strong> (pip's, npm's, Poetry's) chooses one version of each package satisfying every constraint on it, from every package that depends on it. Suppose the pantry app needs the date library at <code>^1.4.0</code>, its reports package needs <code>&gt;=1.9.0</code>, and its SMS library <code>~1.10.0</code>, and the versions published are 1.2.0, 1.4.2, 1.9.0, 1.10.1, 2.0.0 and 2.1.3. Only 1.10.1 satisfies all three, so the resolver picks it. If a new export package needs <code>&gt;=2.0.0</code>, no version satisfies both it and the app's <code>^1.4.0</code>: this is a <strong>dependency conflict</strong>, a version of the "diamond" problem in which two parts of a program need incompatible versions of a third. The fixes are to upgrade the app to 2.x (reading the changelog for the breaking changes), to choose an older export package, or to drop one of them. The first programming problem builds a small resolver that finds the conflicting pair.</p>
<p>Write constraints that accept compatible updates (caret or compatible-release ranges) for libraries, and let the lockfile pin the exact versions; pinning exact versions in the manifest makes conflicts more likely and updates manual. Then update in small, frequent steps: a bot such as Dependabot or Renovate opens a pull request for each update, CI runs the tests, and a reviewer reads the changelog. Patch and minor updates can be merged after green CI; a major update is a planned task. A project that updates once a year faces dozens of breaking changes at once.</p>

<h3>Versioning your own releases</h3>
<p>The pantry system has users, and after handover a maintainer, so its releases need numbers and notes (CS 490 Lesson 6 generated them from Conventional Commits). The semver specification says that version 1.0.0 defines the public API, and that anything may change while the major version is 0. A good moment for 1.0.0 is the final release in week 13, so the pantry's beta and launch releases are numbered 0.x (its first incident, in Lesson 4, was version 0.6.0). From then on, a breaking change to anything others rely on (an API route, the export format, the configuration file) means a new major version, a migration note and, ideally, a deprecation period (CS 240 Lesson 6). An addition, such as a new route or a new column at the end of the export, is normally a compatible change and a minor version, because readers that ignore what they don't expect keep working; the changelog should still mention it, for any reader that checks the column count. A <strong>deprecation</strong>, announcing that something will be removed while it still works, is also a minor version (semver requires the minor number to rise when anything is marked deprecated), and its changelog entry is an early migration note: what to change, and in which future major version the old form goes. Keep a <code>CHANGELOG</code> that a maintainer can read without opening the code.</p>

<h3>Security updates</h3>
<p>CS 380 Lesson 8 described advisories and coordinated disclosure; here is what a team does when an advisory arrives. <strong>Triage</strong> it: does it apply (is the installed version in the affected range, and is the vulnerable feature used)? How severe is it? Advisories usually carry a CVSS score from 0 to 10, from the Common Vulnerability Scoring System maintained by FIRST, with ranges named low, medium, high and critical; adjust for your context (a flaw in an XML parser you never call with untrusted input matters less; one in your login library matters more). Then fix it within a time set in advance by severity, recorded in the security policy you hand over. A common policy, and the one used in this lesson's second problem:</p>
<table>
<tr><th>Severity</th><th>Update within</th></tr>
<tr><td>Critical</td><td>2 days</td></tr>
<tr><td>High</td><td>7 days</td></tr>
<tr><td>Medium</td><td>30 days</td></tr>
<tr><td>Low</td><td>90 days, or with the next routine update</td></tr>
</table>
<p>When several packages need updating, the order matters: update a package only after the ones it depends on, so that each step can be tested on its own, and the most urgent first among those that are ready. That is a topological order (CS 201 Lesson 7) with priorities. Finally, watch the end-of-life dates of the runtime and platform themselves: each Python version receives security fixes for about five years after its release, and a system handed over on a version near its end of life hands its maintainer an urgent upgrade.</p>
`,
      terms: [
        ["Lehman's laws", "Observations that software in real-world use must keep changing to stay useful, and that its complexity grows unless work is done to reduce it."],
        ["Churn", "How often a file or module changes, measured from version history."],
        ["Hotspot", "Code that is both complex and frequently changed, where technical debt costs the most."],
        ["Golden master test", "A characterization test that records an old implementation's outputs on many inputs and checks that a new one matches them."],
        ["Parallel change", "Changing an interface in three phases, expand, migrate and contract, so the system works throughout."],
        ["Strangler fig", "Replacing a system or module gradually by routing one piece of behavior at a time to a new implementation."],
        ["Transitive dependency", "A package your project depends on only because one of its dependencies does."],
        ["Version constraint", "The range of versions a manifest accepts for a dependency, such as ^1.4.2."],
        ["Dependency resolver", "The part of a package manager that chooses one version of each package satisfying every constraint on it."],
        ["Dependency conflict", "A situation in which no version of a package satisfies all the constraints placed on it."],
        ["CVSS", "The Common Vulnerability Scoring System: a 0 to 10 severity score attached to most advisories."],
        ["End of life", "The date after which a software version receives no more fixes, including security fixes."]
      ],
      quiz: [
        { q: "Which file should a team refactor first?", choices: ["A long file that hasn't changed in a year", "A short file that changes often", "A large file that changes often and that the next stories will touch", "Whichever file is oldest"], answer: 2, why: "Debt costs interest only when code is worked on; complex, busy code is where it costs most." },
        { q: "What does a golden master test check?", choices: ["That the code is correct", "That a new implementation produces the same outputs as the old one on many recorded inputs", "That the code follows the style guide", "That the database is backed up"], answer: 1, why: "It characterizes existing behavior, right or wrong, so a refactoring can't change it unnoticed." },
        { q: "Which versions does ^0.4.2 accept?", choices: ["0.4.2 up to below 1.0.0", "0.4.2 up to below 0.5.0", "Only 0.4.2", "Anything from 0.4.2"], answer: 1, why: "The caret keeps the left-most non-zero part, here the minor number 4, fixed." },
        { q: "The app needs ^1.4.0 of a library and a new package needs >=2.0.0 of it. What is this?", choices: ["A lockfile error", "A dependency conflict: no version satisfies both constraints", "A security advisory", "Normal; the resolver picks 2.0.0"], answer: 1, why: "^1.4.0 excludes 2.0.0 and above; >=2.0.0 requires them." },
        { q: "In the strangler fig pattern, how is the old module removed?", choices: ["All at once, after the new one is finished", "When nothing is routed to it any more, after behavior has moved to the new code piece by piece", "By deleting it first and rebuilding", "It is never removed"], answer: 1, why: "Behavior moves gradually behind a routing point until the old code is unused." },
        { q: "An advisory rated critical applies to a library your login code uses. Under the notes' policy, when should the update ship?", choices: ["With the next routine update", "Within 30 days", "Within 2 days", "Only after the end of term"], answer: 2, why: "Critical advisories are fixed within 2 days; the login code makes the context worse, not better." }
      ],
      practice: [
        {
          q: `<p>Characterize this function with a golden master over sizes 1 to 8 and visits 0 to 3, then write a clearer version and check it: <code>def label(size, visits): return "new" if visits == 0 else ("large" if size &gt;= 5 else "small") if visits &lt; 3 else "frequent"</code>. What does the old code do for a new household of size 6? (The golden master answers this by running the code, so you needn't parse it first. Python groups chained conditional expressions to the right: <code>X if A else Y if B else Z</code> means <code>X if A else (Y if B else Z)</code>.)</p>`,
          a: `<p>Python parses it as <code>"new" if visits == 0 else (("large" if size &gt;= 5 else "small") if visits &lt; 3 else "frequent")</code>. So: visits 0 gives "new" (a new household of size 6 is "new", not "large"); visits 1 or 2 give "large" for size 5 or more and "small" otherwise; visits 3 or more give "frequent". A clearer version: <code>if visits == 0: return "new"</code>, <code>if visits &gt;= 3: return "frequent"</code>, <code>return "large" if size &gt;= 5 else "small"</code>. The golden master is <code>golden = {(s, v): label(s, v) for s in range(1, 9) for v in range(4)}</code>, 32 cases, and the check is <code>all(new_label(s, v) == golden[(s, v)] for (s, v) in golden)</code>, which is True. Whether "new" should win over "large" is a question for the client, separate from the refactoring.</p>`
        },
        {
          q: `<p>The published versions of a package are 2.8.0, 2.9.4, 2.10.0, 3.0.0 and 3.1.1. Constraints: <code>^2.9.0</code> from the app, <code>~2.9.1</code> from a plugin, and <code>&gt;=2.9.2, &lt;3.0.0</code> from a test tool. Which version does a resolver choose? A new plugin needs <code>^3.0.0</code>; what are the team's options?</p>`,
          a: `<p>^2.9.0 accepts 2.9.4 and 2.10.0; ~2.9.1 accepts 2.9.x from 2.9.1, so only 2.9.4; the range accepts 2.9.4 and 2.10.0. The only version in all three is 2.9.4. Comparing as numbers matters: as strings "2.10.0" sorts before "2.9.4". The new plugin's ^3.0.0 conflicts with all three. Options: move the app, plugin and test tool to 3.x (read 3.0.0's changelog for the breaking changes; plan it as a task, perhaps with parallel change in the app's code); find a version of the new plugin that supports 2.x; or don't adopt it. Whatever the choice, record it as an ADR (CS 490 Lesson 4).</p>`
        },
        {
          q: `<p>Your app is at 1.3.0. List the version number after each of these releases, in order, and say which needs a migration note for the maintainer: (a) a fix for a date bug; (b) the CSV export gains a column at the end; (c) the configuration setting <code>SMS_KEY</code> is renamed <code>SMS_API_KEY</code>, with the old name still accepted and a warning logged; (d) the old name stops being accepted.</p>`,
          a: `<p>(a) 1.3.1, a compatible fix. (b) 1.4.0: a new feature; adding a column at the end is compatible for most readers, but say so in the changelog, since a reader that checks the column count would break. (c) 1.5.0: a deprecation, which is a minor version because the old name still works; this is the expand phase of a parallel change, and the warning is the deprecation notice. It needs a migration note too: the changelog tells the maintainer to rename the setting now, before it stops working in 2.0.0. (d) 2.0.0: a breaking change, with the migration note repeated ("rename SMS_KEY to SMS_API_KEY before upgrading"). This is the contract phase.</p>`
        },
        {
          q: `<p><b>Project.</b> Run a hotspot analysis on your repository (commits per file from <code>git log --name-only</code>, times lines), choose the debt you will repay this term with reasons, review your manifest's constraints and update every dependency to its latest compatible version, and write the security-update policy you will hand over.</p>`,
          a: `<p>A strong answer shows the hotspot table and connects it to the recorded debt issues and to the stories ahead, choosing two or three refactorings with their safety net (characterization tests or a golden master, parallel change for interfaces). The manifest uses compatible-range constraints and the lockfile pins exact versions; an update bot is configured, with CI required. Any dependency conflict found is resolved and recorded as an ADR. The security policy states how advisories are found (a scanner in CI, CS 380 Lesson 8), how they are triaged, the time limits by severity, who is responsible after handover, and the runtime's end-of-life date.</p>`
        }
      ],
      sources: ["lehman80", "parallelchange", "stranglerfig", "semver", "fowler", "pep440"]
    },
    {
      id: "cx6",
      title: "Evaluating the work",
      minutes: 90,
      summary: "Showing that the work is good: verification and validation, the final status against every requirement, why before-and-after comparisons mislead, designing and reading out a controlled experiment (randomization unit, pre-registration, power, sample ratio mismatch, guardrails), comparisons when traffic is small, threats to validity, and evaluating a thesis contribution with baselines, paired tests and ablations.",
      notes: `
<p>The evaluation report (week 11) answers the question every reader of your final presentation will ask: how do you know it's good? CS 490 Lesson 8 measured the prototype against its requirements. This lesson completes that, and adds the methods for claims about <em>effects</em>: that the new reminder gets more volunteers to confirm, that the new search makes check-in faster, that a thesis's method beats the baseline. MATH 230 Lesson 7 taught the statistics; this lesson is about designing evaluations whose statistics mean something.</p>

<h3>Verification and validation</h3>
<p>Barry Boehm put the distinction in two questions. <strong>Verification:</strong> "Am I building the product right?", that is, does it meet its specification? <strong>Validation:</strong> "Am I building the right product?", does it meet the users' real need? Tests, the traceability matrix and the measured non-functional targets verify. Validation needs users: completion rates and SUS from the beta (Lesson 2), analytics on what they actually use, the client's judgment, and experiments. A capstone report needs both, because a system can pass every test and still not help.</p>

<h3>Final status against the requirements</h3>
<p>Start the report with a table of every requirement id (CS 490 Lesson 2): its priority, its tests and their status, and for each non-functional target the measured value with its interval and the verdict (met, missed or not shown, Lesson 2's rule). Report misses as CS 490 Lesson 8 asked, with cause and plan. Then report what was learned that the requirements didn't anticipate, such as a feature nobody uses.</p>

<h3>Why before-and-after comparisons mislead</h3>
<p>"Check-in took 52 seconds before the system and 31 seconds after" sounds like evidence that the system made check-in faster. It may be, but several other explanations fit the same numbers:</p>
<ul>
<li><strong>Something else changed:</strong> the "before" was measured in November, the busiest month, and the "after" in March.</li>
<li><strong>Learning:</strong> the volunteers have had three more months of practice.</li>
<li><strong>Regression to the mean:</strong> teams measure when things look bad; the next measurement tends to be closer to normal anyway.</li>
<li><strong>Novelty:</strong> people try harder with something new, and the effect fades.</li>
<li><strong>Measurement:</strong> the "before" was timed by observers with stopwatches and the "after" from the system's logs, which start at the search, not at the household's arrival.</li>
</ul>
<p>Report before-and-after numbers with these caveats, measured the same way where you can. To attribute an effect to a change, run a controlled experiment.</p>

<h3>Controlled experiments</h3>
<p>A <strong>controlled experiment</strong> assigns units at random to the conditions, so that every other influence (the season, the volunteer's experience) is spread evenly between them on average, and a difference in outcome can be attributed to the condition. MATH 230 Lesson 7 analyzed an A/B test; designing one well needs decisions made <em>before</em> it starts, written down in a short <strong>pre-registration</strong> so that they can't drift toward what the data turns out to show:</p>
<ul>
<li><strong>The unit of randomization:</strong> what is assigned to a condition. For the shift reminders below it is the volunteer, assigned consistently by hashing their id (CS 490 Lesson 6), so each always sees the same version. The analysis must use the same unit: if each volunteer received six reminders, counting 6 × <em>n</em> sends as independent would understate the uncertainty, because one volunteer's six responses are alike.</li>
<li><strong>One primary metric,</strong> the decision it drives, and the <strong>minimum effect</strong> worth acting on, chosen from the client's point of view, not the data's.</li>
<li><strong>Guardrail metrics</strong> that must not get worse, such as opt-outs from reminders or complaints.</li>
<li><strong>The sample size and duration,</strong> from MATH 230 Lesson 7's power formula, and a promise not to stop early because the p-value looks good (peeking).</li>
</ul>
<p>Here is the experiment the pantry ran with the city's food-bank network. Partway through the term, six of the network's 14 pantries (Lesson 3's growth case, in part) began sending their shift reminders through the system, to about 2,400 volunteers in all. Each volunteer was randomized once between the current reminder (A) and a new one that names the shift's coordinator and how many places are still open (B). The primary metric: confirming the shift within 24 hours. In the weeks before the experiment, the system's logs showed about 59% of volunteers at the six pantries confirming after reminder A, and the network said a gain of 3 points would justify the change. To have 80% power for a 6-point difference (59% to 65%), the formula gives (1.96 + 0.8416)² × (0.59 × 0.41 + 0.65 × 0.35) / 0.06² ≈ 1,024 volunteers per group, so one reminder cycle for all 2,400 was enough. Why plan for 6 points when the minimum is 3? Powering for 3 points would need about 4,160 per group, more than the six pantries have, and more even than all 14 (about 5,600 volunteers). The team planned for 6 instead and wrote down the cost: with 1,200 per group, a true gain of 3 points would be detected only about a third of the time (solving the same normal approximation for power: Φ(0.03/√((0.59 × 0.41 + 0.62 × 0.38)/1,200) − 1.96) = Φ(1.504 − 1.96) = Φ(−0.456) ≈ 0.32, where Φ is the standard normal CDF, <code>NormalDist().cdf</code>), so a real but modest effect could well come out inconclusive. Limited traffic often forces this compromise; the section on small traffic below gives the alternatives.</p>

<h3>Reading out the result</h3>
<p>A readout answers three questions in order. Was the experiment valid? How big is the effect? What do we do?</p>
<pre><code>import math
from statistics import NormalDist

def srm_p(n_a, n_b, ratio=0.5):                # is the split what we planned?
    n = n_a + n_b
    z = (n_b - n * ratio) / math.sqrt(n * ratio * (1 - ratio))
    return 2 * (1 - NormalDist().cdf(abs(z)))

n_a, k_a, n_b, k_b = 1190, 702, 1210, 790      # volunteers, and how many confirmed
pa, pb = k_a / n_a, k_b / n_b
d = pb - pa
se = math.sqrt(pa * (1 - pa) / n_a + pb * (1 - pb) / n_b)
print(round(srm_p(n_a, n_b), 2))                                       # 0.68
print(round(pa, 3), round(pb, 3), round(d, 3), round(d - 1.96 * se, 3), round(d + 1.96 * se, 3))   # 0.59 0.653 0.063 0.024 0.102</code></pre>
<p><strong>Validity first.</strong> A <strong>sample ratio mismatch</strong> (SRM) is a split that differs from the planned one by more than chance allows. The test is MATH 230's normal approximation to a binomial: under a fair 50/50 assignment, the number in group B has mean <em>n</em>/2 and standard deviation √(<em>n</em>/4). Here 1,210 of 2,400 gives a p-value of 0.68: nothing wrong. Researchers at Microsoft (Fabijan and colleagues, 2019) found SRMs to be among the most common signs of a broken experiment: a bug that crashes one version before it logs, a bot filter that removes more users from one group, a redirect that loses some users. When the SRM test fails (they suggest a strict threshold such as p &lt; 0.001, since it is run on every experiment), the results are not trustworthy in either direction, and the job is to find the bug, not to interpret the difference.</p>
<p><strong>Then the effect, with its interval.</strong> B's confirmation rate is 65.3% against A's 59.0%, a difference of 6.3 points with a 95% interval from 2.4 to 10.2 points. (This interval uses each group's own variance, unlike the pooled standard error of MATH 230's z-test, because it describes the difference rather than testing the hypothesis of no difference.) The interval excludes 0, so the difference is unlikely to be chance, and its estimate exceeds the 3-point minimum, though its lower end does not.</p>
<p><strong>Then the decision,</strong> by the rule written in advance. A common one: ship if the interval excludes zero and the estimate reaches the minimum effect; don't ship if even the interval's upper end is below the minimum (the effect, if any, is too small to matter); otherwise the experiment is inconclusive, and the choice rests on other grounds. Here the rule says ship, after checking the guardrails (opt-outs didn't rise). The first programming problem implements this readout. A thesis student would report the same three things, and would also say how many experiments were run (MATH 230 Lesson 7's multiple comparisons).</p>

<h3>When there isn't enough traffic</h3>
<p>Most capstone systems can't run an A/B test: the pantry checks in 120 households a week. Two alternatives keep the logic of a controlled experiment:</p>
<ul>
<li><strong>Within-subject comparison.</strong> Each participant in a usability session does the task with both versions, so differences between people cancel out. Counterbalance the order (half do A first, half B first), because the second attempt benefits from practice with the first; and compare the paired results, as in the thesis section below.</li>
<li><strong>Randomize larger units over time.</strong> Alternate the version by Saturday, chosen at random, and compare Saturdays. This needs many weeks, so it suits a thesis more than a term.</li>
</ul>
<p>When neither is possible, say so and present the before-and-after evidence with its caveats. Honest weak evidence is worth more than strong-looking evidence that isn't.</p>

<h3>Threats to validity</h3>
<p>Every evaluation section, capstone or thesis, ends with its <strong>threats to validity</strong>, the ways its conclusions could be wrong. Software engineering research, following Claes Wohlin and colleagues, groups them in four kinds:</p>
<table>
<tr><th>Threat</th><th>Question</th><th>Pantry example</th></tr>
<tr><td>Internal validity</td><td>Did the change cause the effect, or something else?</td><td>The new reminder went out in a week with a public holiday</td></tr>
<tr><td>External validity</td><td>Does the result generalize beyond this setting?</td><td>Volunteers at food pantries may respond differently from paid shift workers</td></tr>
<tr><td>Construct validity</td><td>Does the metric measure the concept we care about?</td><td>"Confirmed within 24 hours" is not the same as "turned up for the shift"</td></tr>
<tr><td>Conclusion validity</td><td>Are the statistics sound?</td><td>Too few participants, peeking, many metrics tested, wrong unit of analysis</td></tr>
</table>
<p>For each threat, say what you did about it and what remains. Listing threats is not an admission of failure; omitting them is what makes a careful reader distrust the rest.</p>

<h3>The thesis path: evaluating a contribution</h3>
<p>A thesis claims a <strong>contribution</strong>: a new method, tool, system or finding. Its evaluation chapter (week 11) shows the claim holds, and the same principles apply in a more formal form. State the <strong>research questions</strong> precisely ("Does method B find more correct matches than the standard method A on misspelled names?"). Compare against a strong <strong>baseline</strong>, the best existing method fairly tuned, not a weak one chosen to lose. Use a <strong>benchmark</strong> that others could reuse, or explain why you built your own. Report effect sizes with intervals, not only p-values. When a method has several parts, an <strong>ablation</strong>, removing one part at a time, shows which parts the gain comes from. And make the work <strong>reproducible</strong>: the code, data (or how to obtain it), seeds and exact commands, so that another student could rerun every number.</p>
<p>When two methods run on the same benchmark items, the results are <strong>paired</strong>, and the analysis should use the pairs: some items are hard for both methods, and comparing each item with itself removes that variation. MATH 230 Lesson 7's permutation test has a paired version: if the methods were equivalent, each item's difference would be equally likely to have either sign, so flip each sign at random many times and see how often the mean difference is as large as observed.</p>
<pre><code>import random

a = [0.61, 0.55, 0.72, 0.48, 0.66, 0.59, 0.70, 0.52, 0.63, 0.57]   # baseline's score on 10 items
b = [0.65, 0.58, 0.71, 0.55, 0.70, 0.60, 0.76, 0.53, 0.69, 0.60]   # new method, same items
diffs = [y - x for x, y in zip(a, b)]
observed = sum(diffs) / len(diffs)
rng = random.Random(0)
trials = 2000
count = sum(abs(sum(x if rng.random() &lt; 0.5 else -x for x in diffs)) / len(diffs) >= abs(observed) - 1e-12
            for _ in range(trials))
print(round(observed, 3), count / trials)      # 0.034 0.0085</code></pre>
<p>The new method is better on 9 of the 10 items, by 0.034 on average, and only 0.85% of random sign flips give a mean difference that large, so the improvement is unlikely to be chance. (There are only 2<sup>10</sup> = 1,024 sign patterns, so for ten items one could enumerate them all.) The second programming problem adds a bootstrap interval for the mean difference (MATH 230 Lesson 6): about 0.019 to 0.049. It takes MATH 230's positions in the sorted resampled means, ⌊0.025 × reps⌋ and ⌊0.975 × reps⌋ − 1 counting from 0, which leave the same number of values below the interval as above it (50 each for 2,000). The nearest-rank percentiles used elsewhere in this course would put the lower end one place earlier; with thousands of resamples the difference is negligible, and what matters is to state the rule and keep to it. A thesis would report "B improves the score by 0.034 (95% CI 0.019 to 0.049; paired sign-flip test p ≈ 0.009, 10 items)", then discuss whether 0.034 matters, and on which items B lost.</p>
`,
      terms: [
        ["Verification", "Checking that a system meets its specification: building the product right."],
        ["Validation", "Checking that a system meets its users' real needs: building the right product."],
        ["Regression to the mean", "The tendency of an extreme measurement to be followed by one closer to the average, whatever was changed in between."],
        ["Novelty effect", "A temporary change in behavior because something is new, which fades with time."],
        ["Controlled experiment", "A study that assigns units to conditions at random so that differences in outcome can be attributed to the conditions."],
        ["Unit of randomization", "What is assigned to a condition in an experiment (a user, a session, a day); the analysis must use the same unit."],
        ["Pre-registration", "Writing down an experiment's metric, minimum effect, sample size, analysis and decision rule before it starts."],
        ["Guardrail metric", "A metric an experiment must not make worse, checked alongside the primary metric."],
        ["Sample ratio mismatch", "A split between experiment groups that differs from the planned one by more than chance allows, signalling a broken experiment."],
        ["Within-subject design", "An evaluation in which each participant uses every condition, with the order counterbalanced."],
        ["Threats to validity", "The ways an evaluation's conclusions could be wrong: internal, external, construct and conclusion validity."],
        ["Baseline", "The existing method a new one is compared against, which should be the strongest fair alternative."],
        ["Ablation", "Evaluating a method with one component removed at a time to see which components produce the gain."],
        ["Paired comparison", "Comparing two conditions measured on the same items or people, using the differences within each pair."]
      ],
      quiz: [
        { q: "Which question does validation ask?", choices: ["Does it pass its tests?", "Are we building the right product: does it meet users' real needs?", "Is the code formatted?", "Is the build reproducible?"], answer: 1, why: "Verification asks whether it meets the specification; validation asks whether it helps users." },
        { q: "Check-in took 52 s in November and 31 s in March, after the new system. Which is NOT an alternative explanation?", choices: ["Volunteers had three more months of practice", "November is the busiest month", "The two times were measured differently", "The households were randomly assigned to the new system"], answer: 3, why: "Random assignment is what rules alternative explanations out; the others are threats to a before-and-after comparison." },
        { q: "An experiment planned a 50/50 split of 20,000 users but has 10,400 in B. Its SRM p-value is far below 0.001. What should the team do?", choices: ["Ship B if it won", "Analyze only the first 10,000 in each group", "Treat the results as untrustworthy and look for the bug that caused the mismatch", "Rerun the z-test with a pooled standard error"], answer: 2, why: "An SRM usually means users were lost or misassigned in one group, which biases every metric." },
        { q: "A readout gives a difference of 0.4 points with a 95% interval from 0.1 to 0.7 points; the pre-registered minimum effect is 2 points. What does the notes' rule decide?", choices: ["Ship", "Don't ship: even the upper end is below the minimum effect", "Inconclusive", "Invalid"], answer: 1, why: "The effect is probably real but too small to matter." },
        { q: "\"Confirmed within 24 hours\" is used to measure whether volunteers turn up. Which threat to validity is this?", choices: ["Internal", "External", "Construct", "Conclusion"], answer: 2, why: "Construct validity asks whether the metric measures the concept of interest." },
        { q: "Why analyze two methods' scores on the same benchmark items as pairs?", choices: ["It is required by journals", "Items differ in difficulty for both methods, and comparing each item with itself removes that variation", "Pairs need fewer items to be collected", "Because the scores are percentages"], answer: 1, why: "Paired differences cancel the shared item effects, making the comparison more sensitive." }
      ],
      practice: [
        {
          q: `<p>Read out this experiment on the registration form, with a pre-registered minimum effect of 5 points: A (old form) 600 users, 372 completed; B (new form) 612 users, 418 completed. Check the split, compute the difference and its 95% interval, and decide.</p>`,
          a: `<p>Split: <em>n</em> = 1,212, expected 606 in B; z = (612 − 606)/√(1,212 × 0.25) = 6/17.4 ≈ 0.34, p ≈ 0.73, no mismatch. Rates: 372/600 = 62.0% and 418/612 ≈ 68.3%; difference ≈ 6.3 points. Standard error √(0.62 × 0.38/600 + 0.683 × 0.317/612) ≈ √(0.000393 + 0.000354) ≈ 0.0273, so the interval is 6.3 ± 5.4, about 0.9 to 11.6 points. It excludes 0 and the estimate exceeds 5 points: ship, after checking the guardrails. Note that the interval is wide: the true gain could be under 1 point, which a report should say.</p>`
        },
        {
          q: `<p>Design a within-subject comparison of the old and new household search with 12 volunteers. What does each participant do, how is order handled, what do you measure, and how would you analyze it?</p>`,
          a: `<p>Each participant does the same kind of task with both versions: find six households from spoken names, some misspelled, using a different but equally hard set of names for each version (otherwise the second search benefits from remembering the names). Counterbalance: six participants use the old search first and six the new one first, assigned at random, and the two name sets are also swapped between halves. Measure success and time per task, and ask for a preference at the end. Analyze per participant: each has an old and a new mean time, giving 12 paired differences; report the mean difference with a bootstrap interval and a paired sign-flip p-value, and the number who preferred each. Note the threats: 12 participants limit precision, and lab tasks may not match a busy Saturday (external validity).</p>`
        },
        {
          q: `<p>A thesis compares a new fuzzy-matching method with the standard one on 50 misspelled names from the pantry's synthetic data, reports "92% versus 85% accuracy, p &lt; 0.05", and stops. List what a careful examiner would ask for.</p>`,
          a: `<p>Which test, and was it paired (both methods ran on the same 50 names, so it should be); the effect with an interval, not only a p-value; whether the baseline was the strongest fair one and was tuned as carefully as the new method; how the 50 names were made (synthetic misspellings may differ from real ones: construct and external validity), and whether the method was developed on the same names it was tested on (it must be tested on held-out data, as in CS 370 Lesson 5's honest evaluation); an ablation of the method's parts; the failures (which names did B get wrong that A got right?); whether other metrics were tried and only the best reported (multiple comparisons); and the code, data and seeds to reproduce it.</p>`
        },
        {
          q: `<p><b>Project.</b> Write your evaluation report (or, on the thesis path, your evaluation chapter): the status table for every requirement, the validation evidence from users, at least one comparison designed as well as your traffic allows (an experiment, a within-subject study or a carefully caveated before-and-after), and a threats-to-validity section.</p>`,
          a: `<p>A strong report separates verification from validation, lists every requirement with measured values, intervals and verdicts, and explains misses. Its comparison was planned before the data arrived (metric, minimum effect, sample size, unit, decision rule), checks its own validity (SRM or counterbalancing), reports the effect with an interval, and applies the rule it stated. Its threats section is specific to the study and says what was done about each threat. A thesis chapter adds precise research questions, a strong baseline, paired analysis where the design is paired, ablations and a reproducibility statement. Weak reports state "users liked it" and a p-value.</p>`
        }
      ],
      sources: ["kohavi20", "fabijan19", "wohlin12", "mit1805", "asa16", "efron79"]
    },
    {
      id: "cx7",
      title: "Documentation and handover",
      minutes: 90,
      summary: "Leaving a system that someone else can run: who reads documentation and the four kinds they need, a README that gets a newcomer from clone to running, runbooks for every alert, testing documents on the person who will use them, docs kept beside the code and checked in CI, choosing a license and checking dependencies' licenses, and the handover itself: accounts, secrets, data, backups and support.",
      notes: `
<p>A capstone system that only its authors can run stops working within months of graduation: a certificate expires, a dependency needs a security update, the hosting bill goes to a student's card. The final release and handover in week 13 is the milestone that prevents this, and it is judged by one test: can the people who stay (the client and a named maintainer) run, change and recover the system without you? This lesson is about the documents and the arrangements that pass that test. CS 490 Lesson 5's bus factor is the measure: handover means raising it from the team to people outside it.</p>

<h3>Who reads what</h3>
<p>WRIT 100 Lesson 5 covered READMEs, docstrings and comments, and Lesson 7 design documents. A handed-over system has several readers with different needs: the <strong>users</strong> (volunteers at the desk), the <strong>administrator</strong> (Maria, who adds volunteers and runs reports), the <strong>maintainer</strong> (a volunteer who knows some Python, CS 490 Lesson 4's constraint) and the <strong>operator</strong> (whoever responds when it breaks, often the same maintainer). Daniele Procida's <strong>Diátaxis</strong> framework sorts documentation into four kinds by what the reader is doing:</p>
<table>
<tr><th>Kind</th><th>The reader wants to…</th><th>Pantry example</th></tr>
<tr><td>Tutorial</td><td>learn, by doing something guided</td><td>"Your first check-in shift", for new volunteers</td></tr>
<tr><td>How-to guide</td><td>do a specific task</td><td>"Add a volunteer", "Restore yesterday's backup"</td></tr>
<tr><td>Reference</td><td>look something up</td><td>Configuration settings, API routes, the data model</td></tr>
<tr><td>Explanation</td><td>understand why</td><td>The architecture overview, the ADRs (CS 490 Lesson 4)</td></tr>
</table>
<p>Mixing them is the usual failure: a README that is half tutorial and half reference serves neither reader. Keep them separate, and link between them.</p>

<h3>The README</h3>
<p>The repository's README is the maintainer's front door. Its test is concrete: a developer who has never seen the project can go from a fresh clone to a running system with tests passing, by following it alone. A useful outline:</p>
<pre data-label="README.md"><code># Pantry check-in

Check-in, shift sign-up and reports for the Riverside Community Food Pantry.
Production: https://checkin.example.org   Staging: https://staging.checkin.example.org

## Run it locally
1. Install Python 3.12 and PostgreSQL 16.
2. ./scripts/setup.sh        # creates a virtual environment and a database with synthetic data
3. ./scripts/run.sh          # http://localhost:8000, log in as demo / demo

## Test
./scripts/test.sh            # unit, integration and end-to-end tests (about 2 minutes)

## Deploy
Merging to main deploys to staging. To release: docs/how-to/release.md

## Documentation
docs/operations/ (runbooks), docs/how-to/, docs/reference/, docs/adr/

## Contacts and license
Maintainer: see docs/operations/contacts.md. MIT License (LICENSE).</code></pre>
<p>Notice what makes it work: setup is one script, not twelve manual steps that rot; the demo login uses synthetic data (CS 490 Lesson 7); every other topic is a link. The contacts file lives in the repository only if it holds no personal data the client hasn't agreed to publish.</p>

<h3>Runbooks</h3>
<p>A <strong>runbook</strong> tells an operator what to do when something specific goes wrong, written for someone stressed, possibly at night, who didn't build the system. Lesson 4 required that every alert link to one. Each has the same parts:</p>
<pre data-label="docs/operations/checkin-errors.md"><code># Check-in errors (alert: checkin-burn-rate)

## What it means
More check-ins are failing than the SLO allows (99% over 30 days).

## Impact
Desk volunteers can't record visits. They can keep working with the printed
list and enter visits later (docs/how-to/paper-fallback.md).

## Check
1. Status page of the hosting provider: is there an outage?
2. Dashboard "Check-in": did errors start just after a deploy?
3. Logs: search for level=ERROR route=/checkin in the last 30 minutes.

## Mitigate
- Errors began after a deploy: roll back (docs/how-to/rollback.md, about 5 minutes).
- Database unreachable: see database-down.md.
- Otherwise: turn off the "new-search" flag, which has a kill switch.

## Escalate
If not mitigated in 30 minutes, call Maria (she switches the desk to paper)
and email the maintainer list. Record what you did for the postmortem.</code></pre>
<p>Short sentences, numbered steps, exact commands and links, and a stated way out ("escalate") at the end. A runbook that says "investigate the database" isn't one.</p>

<h3>Test the documents on their readers</h3>
<p>Documentation is tested like code: by running it. Three tests matter before handover:</p>
<ul>
<li><strong>The onboarding test.</strong> The maintainer, not a team member, sets up the system from the README on their own machine while a team member watches silently and notes every place they get stuck, exactly like a usability test (CS 490 Lesson 8). Fix the document, not the person. Then the maintainer makes a small change and deploys it, with the team watching. A maintainer who has never deployed before you leave never will.</li>
<li><strong>The recovery test.</strong> The maintainer restores a backup into a fresh staging database following the runbook. A backup that has never been restored is a hope (see Lesson 4's sidebar).</li>
<li><strong>The drill.</strong> Lesson 4's game day, repeated with the maintainer as operator.</li>
</ul>
<p>Keep documentation in the repository as Markdown beside the code (<strong>docs as code</strong>): it is versioned with the code it describes, reviewed in the same pull requests ("this changes a setting: update the reference"), and checked in CI. Links are the part that rots fastest, because files move: the second programming problem is a link checker for a repository's Markdown, including links to headings within files.</p>

<h3>Licensing</h3>
<p>Under copyright law, code is owned by its authors (or their employer) from the moment it is written, and without a license nobody else may legally copy, change or distribute it, including the client. CS 490's proposal agreed who owns the code; the handover makes it real with a <code>LICENSE</code> file. Check your university's intellectual-property policy, which usually leaves student coursework with the students but may not, and record the agreement in writing. The common choices:</p>
<table>
<tr><th>License</th><th>Kind</th><th>Main condition</th></tr>
<tr><td>MIT, BSD-3-Clause, ISC</td><td>Permissive</td><td>Keep the copyright and license notice (ISC is a shorter text with the same effect as MIT)</td></tr>
<tr><td>Apache-2.0</td><td>Permissive</td><td>Keep notices and state changes; includes an explicit patent license from contributors</td></tr>
<tr><td>LGPL-2.1, LGPL-3.0</td><td>Weak copyleft</td><td>Changes to the library itself must be shared under the LGPL; a program that only uses the library may have any license, provided users can replace the library with their own modified version</td></tr>
<tr><td>GPL-3.0</td><td>Copyleft</td><td>Anyone who distributes the program or a modified version must do so under the GPL, with source</td></tr>
<tr><td>AGPL-3.0</td><td>Network copyleft</td><td>As the GPL, and offering a modified version to users over a network also requires offering its source</td></tr>
</table>
<p>A permissive license such as MIT is usually right for a client project: the client can use, change and pass on the code freely. Your dependencies' licenses matter too, because they apply to the combined program you hand over. Licenses are named by <strong>SPDX identifiers</strong> (<code>MIT</code>, <code>Apache-2.0</code>, <code>GPL-3.0-only</code>; for the GNU licenses, <code>-only</code> means exactly that version and <code>-or-later</code>, as in <code>LGPL-2.1-or-later</code>, lets the recipient choose that version or any later one), combined in <strong>SPDX expressions</strong>: <code>MIT OR Apache-2.0</code> means you may choose either (dual licensing, common in the Rust ecosystem), <code>MIT AND BSD-3-Clause</code> that both apply, and <code>GPL-2.0-only WITH Classpath-exception-2.0</code> a license with an exception that grants extra permissions. <code>AND</code> binds more tightly than <code>OR</code>, so <code>MIT OR Apache-2.0 AND BSD-3-Clause</code> means MIT, or else both of the others. A project keeps a <strong>license policy</strong>, a list of licenses it accepts, and checks every dependency against it in CI: the first programming problem parses expressions and does this check. Licenses can also conflict with each other: the Free Software Foundation considers Apache-2.0 compatible with GPL-3.0 but not with GPL-2.0, for example. This is orientation, not legal advice: when a license question matters, the client or the university should ask a lawyer.</p>

<h3>The handover</h3>
<p>Handover is a planned event, not the last email of term. Hold a <strong>handover meeting</strong> in week 13 with the client and the maintainer and go through a written checklist together, ticking each item only when it has been done, not promised:</p>
<ul>
<li><strong>Accounts and ownership:</strong> every account the system depends on (the code repository's organization, hosting, database, domain registrar and DNS, the SMS provider, email, error tracking, analytics) is owned by the client, with at least two of the client's people as administrators and billing on the client's payment method. Students are removed afterwards.</li>
<li><strong>Secrets:</strong> every secret the team has known (database passwords, API keys) is rotated, so that former team members' copies stop working, and the new ones are stored in the hosting platform's secret store and a password manager the client controls, never in the repository or an email. Scan the repository's whole history for secrets before it is made public or transferred, with a tool such as gitleaks: deleting a file doesn't remove it from git history, so a secret that was ever committed must be treated as leaked and rotated.</li>
<li><strong>Data:</strong> the client holds the production data and its backups, and the data inventory (CS 490 Lesson 7) with its retention periods is part of the documentation. Team members delete any copies they hold. Real personal data should never have been on a student laptop; confirm that it isn't.</li>
<li><strong>Operations:</strong> the maintainer has passed the onboarding and recovery tests, receives the alerts, and has the runbooks, the security-update policy (Lesson 5) and the dependency update bot.</li>
<li><strong>Documentation and license:</strong> the README, the four kinds of documentation, the ADRs, the final release's changelog, and the <code>LICENSE</code> file.</li>
<li><strong>Support:</strong> a written statement of what the team will do after the course, and for how long: "we will answer questions by email until 30 June; we will not make changes". Promising open-ended support you can't give is worse than promising none.</li>
</ul>
<p>Thesis students hand over too: the thesis, and an <strong>artifact</strong> (the code, data and scripts that reproduce every result, Lesson 6) in a public repository or archive with a license and a README, so that the adviser's next student can build on it.</p>
`,
      terms: [
        ["Handover", "The planned transfer of a system's ownership, operation and knowledge from the team to the people who will keep it running."],
        ["Diátaxis", "A framework that divides documentation into tutorials, how-to guides, reference and explanation, by what the reader is trying to do."],
        ["Runbook", "Step-by-step instructions for responding to a specific alert or failure: what it means, its impact, checks, mitigations and escalation."],
        ["Onboarding test", "Having a newcomer set up and change the system from the documentation alone while someone notes where they get stuck."],
        ["Docs as code", "Keeping documentation in the repository beside the code, versioned, reviewed and checked in CI."],
        ["Permissive license", "An open-source license, such as MIT or Apache-2.0, that allows reuse in any project provided notices are kept."],
        ["Copyleft license", "An open-source license, such as the GPL, that requires distributed modified versions to be released under the same license with source."],
        ["SPDX expression", "A standard way to state licenses, combining SPDX identifiers with AND, OR and WITH."],
        ["License policy", "The list of licenses a project accepts in its dependencies, checked automatically."],
        ["Secret rotation", "Replacing a password or key with a new one so that every old copy stops working."],
        ["Artifact", "The code, data and scripts that let others reproduce a research result."]
      ],
      quiz: [
        { q: "In Diátaxis, \"Restore yesterday's backup\" is which kind of documentation?", choices: ["Tutorial", "How-to guide", "Reference", "Explanation"], answer: 1, why: "It helps a reader who already knows the system do one specific task." },
        { q: "What is the best test of a README before handover?", choices: ["A team member rereads it", "The maintainer follows it alone on their own machine, while someone notes where they get stuck", "A spell checker", "Counting its sections"], answer: 1, why: "Documents are tested on their real readers, like a usability test." },
        { q: "A database password was committed to the repository in week 5 and the file was deleted in week 6. What must happen before the repository is made public?", choices: ["Nothing: the file was deleted", "Treat the password as leaked and rotate it, because git history still contains it", "Rename the file", "Make the repository private again"], answer: 1, why: "Deleting a file doesn't remove it from earlier commits." },
        { q: "What does the SPDX expression MIT OR Apache-2.0 AND BSD-3-Clause mean?", choices: ["All three licenses apply", "MIT, or else both Apache-2.0 and BSD-3-Clause", "Either MIT or Apache-2.0, and also BSD-3-Clause", "It is invalid"], answer: 1, why: "AND binds more tightly than OR." },
        { q: "Which license requires that a modified version offered to users over a network make its source available?", choices: ["MIT", "Apache-2.0", "GPL-3.0", "AGPL-3.0"], answer: 3, why: "The AGPL extends the GPL's conditions to network use." },
        { q: "Which handover item is done correctly?", choices: ["The hosting account stays on a student's card, who promises to forward the bills", "The client owns every account, with two client administrators, and students are removed afterwards", "The team keeps a copy of the production data in case it's needed", "The maintainer will learn to deploy after the team graduates"], answer: 1, why: "Ownership, billing and administration must belong to the client before the team leaves." }
      ],
      practice: [
        {
          q: `<p>Write a runbook for the alert "Database backup failed" for the pantry, with the five sections in the notes. Assume backups run nightly at 02:00 to the storage service in CS 490 Lesson 4's context diagram.</p>`,
          a: `<p><b>What it means:</b> last night's 02:00 backup didn't complete. <b>Impact:</b> none yet for users; if the database is lost now, up to two days of check-ins and sign-ups could be lost instead of one. <b>Check:</b> (1) the backup job's log (link) for the error message; (2) the storage service's status page; (3) whether the database disk is full (dashboard link). <b>Mitigate:</b> if the storage service was down, rerun the job now (exact command); if the disk is full, follow disk-full.md first; if the credentials were rejected, the storage key may have been rotated: update it in the secret store (how-to link) and rerun. Confirm success by listing today's backup file and its size. <b>Escalate:</b> if two nights in a row fail, email the maintainer list and Maria; take a manual export (command) and store it in the client's storage. Afterwards, note what happened for the postmortem, and check the alert would have fired if the job had silently produced an empty file.</p>`
        },
        {
          q: `<p>For each dependency license, say whether it fits an MIT-licensed project handed to the client under a policy allowing MIT, BSD-3-Clause, Apache-2.0 and ISC, and why: (a) <code>ISC</code>; (b) <code>MIT OR GPL-3.0-only</code>; (c) <code>MIT AND GPL-3.0-only</code>; (d) <code>LGPL-2.1-or-later</code>; (e) no license file at all.</p>`,
          a: `<p>(a) Allowed: a permissive license on the list. (b) Allowed: OR lets you choose MIT, and you should record that you did. (c) Not allowed by the policy: AND means both apply, and the GPL part would require the combined program to be distributed under the GPL. (d) Not on the list, so it needs review: the LGPL is a weaker copyleft that is often acceptable for a library used unmodified, but that is a judgment to make deliberately (and perhaps add to the policy), not by default. (e) Not allowed: without a license you have no permission to use it at all; ask the author to add one or find an alternative. Cases (d) and (e) are why a license check reports problems for a person to decide, rather than deciding everything itself.</p>`
        },
        {
          q: `<p>A team's handover plan says: "We'll send Maria the passwords by email, give her a copy of the database, and keep the hosting account for now so nothing breaks. Ben will help if anything goes wrong." Rewrite it as checklist items that would pass the notes' test.</p>`,
          a: `<p>(1) Transfer the hosting, database, domain, SMS and repository accounts to the pantry's organization, with Maria and the maintainer as administrators and billing on the pantry's payment method; then remove the students. (2) Rotate every secret the team knew; store the new ones in the platform's secret store and the pantry's password manager; send nothing by email. (3) The production data stays where it is, owned by the pantry; backups go to the pantry's storage account; the maintainer restores one into staging following the runbook; team members delete any copies. (4) The maintainer completes the onboarding test and deploys a small change while the team watches. (5) Support: "Ben will answer questions by email until 30 June; no changes after the handover meeting." Each is ticked at the handover meeting only when done.</p>`
        },
        {
          q: `<p><b>Project.</b> Prepare your final release and handover: the README and the four kinds of documentation, a runbook for every alert, a license and a license check of your dependencies, a link check in CI, the onboarding and recovery tests with the maintainer (with notes on what you fixed), and the handover checklist completed at a meeting with the client.</p>`,
          a: `<p>A strong handover passes the test in the notes: the maintainer set up, changed, deployed and recovered the system without help, and the notes show what was fixed in the documents as a result. Every account belongs to the client, secrets have been rotated and the history scanned, data copies are gone, alerts go to the maintainer, and the support statement is specific and time-limited. Documentation is separated by kind, kept in the repository and checked in CI. The license is chosen and recorded, and every dependency's license fits the policy or has a recorded decision. A thesis hands over its artifact in the same way.</p>`
        }
      ],
      sources: ["diataxis", "writethedocs", "choosealicense", "spdx", "osi", "srebook"]
    },
    {
      id: "cx8",
      title: "Launch, final presentation and what comes next",
      minutes: 90,
      summary: "Finishing well: the go/no-go decision and the first weeks after launch, a final presentation that tells the whole project's story with evidence, answering questions, the final reflection and its evidence, how peer evaluations adjust individual marks, the project-level retrospective, and carrying the capstone into a career or graduate study.",
      notes: `
<p>The last lesson covers the end of the project: the system goes into full use, the team presents the whole project, and each member reflects on two terms of work. The order matters. Launch comes first, by week 11, so that the first Saturdays of real use fall while the team still has access and can fix what they reveal; the handover in week 13 (Lesson 7) ends that period, and the presentation and reflection follow in week 14. It ends with what the capstone is for, which is what you do next.</p>

<h3>The launch decision</h3>
<p>Before the beta becomes the system everyone uses (and the binder goes in a cupboard), hold a short <strong>go/no-go meeting</strong> with the client. Go through a launch checklist and decide, in the meeting, whether to launch on the planned day. Each item is a fact with evidence, not a feeling:</p>
<ul>
<li>Every must-have requirement passes its acceptance tests; misses are known and accepted by the client.</li>
<li>The readiness review's items are done: SLOs and alerts live and rollback rehearsed (Lessons 3 and 4). A backup has also been restored into staging, the recovery test of Lesson 7 run early: a launch whose backups have never been restored is a no-go.</li>
<li>Real data is migrated and checked by the client (a sample of households compared with the binder).</li>
<li>Users are trained, the paper fallback is printed and everyone knows when to use it.</li>
<li>Someone is on call for the first Saturdays, and the maintainer knows how to reach them.</li>
</ul>
<p>A "no-go" is a success of the process, not a failure of the team: it means a problem was found while it was still cheap. Agree the conditions for "go" in advance so that the meeting checks them rather than negotiating them. After launch comes a period of closer watching, sometimes called <strong>hypercare</strong>: the team at the desk for the first two Saturdays, a daily look at the dashboards and the problem reports, and fixes released quickly but still through the pipeline. Hypercare ends at the handover meeting, when the maintainer takes over and the team's access is removed.</p>

<h3>The final presentation</h3>
<p>CS 490 Lesson 8's demo showed a prototype solving a problem. The final presentation, in week 14, tells the story of the whole project to a mixed audience: the client, faculty, other students, and often visitors from industry who are seeing it for the first time. In about 15 minutes, with questions after:</p>
<ol>
<li><strong>The problem</strong> (2 minutes), in the user's terms, with the evidence from CS 490's discovery: the 25-minute queue and the four-minute binder search.</li>
<li><strong>What you built</strong> (4 minutes), shown working: a short live demonstration of the core flow on production, with a recording ready in case the network fails.</li>
<li><strong>The evidence</strong> (4 minutes): the evaluation report's main results (Lesson 6), with their intervals and misses. "Check-in now takes a median of 24 seconds, measured from the logs over six Saturdays; the 95th percentile is 33 seconds, down from the prototype's 35, so NFR-1's 30-second target is still missed; the logs show the slowest check-ins are nearly all new registrations" earns more trust than "check-in is much faster".</li>
<li><strong>How it was built</strong> (3 minutes): the two or three most important decisions and what you would decide differently; this is where the architecture, the incident and its postmortem belong.</li>
<li><strong>What happens next</strong> (1 minute): who runs it now, and what they plan.</li>
</ol>
<p>Some rules for the slides, from WRIT 100's principles: one idea per slide, with a headline that states it ("Search finds misspelled names", not "Search"); charts with labelled axes and units, readable from the back of the room; no slide of bullet points read aloud. Every member should present a part, since the presentation is also how the audience sees the team.</p>
<p><strong>Answering questions.</strong> Listen to the whole question; repeat it if the room may not have heard; answer it directly in the first sentence, then give the reason. If you don't know, say so and say how you would find out. "We didn't measure that; the logs would let us" is a good answer. A question that exposes a weakness is not an attack: acknowledge it, which is what Lesson 6's threats to validity prepared you to do. Rehearse with someone outside the team asking the hardest questions they can think of.</p>
<p>The <strong>thesis defense</strong> has the same shape and higher stakes: a talk of 20 to 30 minutes on the question, the contribution and its evaluation, then questions from the adviser and a second reader, who will probe the threats to validity, the baselines and whether the claims match the evidence. The common advice for research talks applies to both: say early what the contribution is, and use examples before generalities.</p>

<h3>The final reflection and its evidence</h3>
<p>The final reflection (1,000 to 1,500 words) uses CS 490 Lesson 8's three questions, What? So what? Now what?, over both terms. Its strongest material is change: something you did badly in October and better in March, and why. Cite evidence: pull requests, reviews, documents, the incident you handled, the retrospective actions you owned.</p>
<p>The commit history is one source of evidence, for you and for the instructor: one of the three inputs, with the peer evaluations and the instructor's observation, to the adjustment of each member's grade (Lesson 1). Git can summarize it: <code>git shortlog -sne</code> counts commits per person, and <code>git log --numstat</code> lists lines added and deleted per file. People often commit under several names and emails (a laptop and a university account), so git reads a <code>.mailmap</code> file that maps each commit identity to one canonical person:</p>
<pre data-label=".mailmap"><code>Ana Diaz &lt;ana@uni.edu&gt; &lt;ana.diaz@gmail.com&gt;
Ben Okoro &lt;ben@uni.edu&gt; &lt;ben@laptop.local&gt;</code></pre>
<p>The first programming problem builds such a summary. Treat it as a starting point, never as a measure of contribution: deleting 120 lines of dead code is worth more than adding them; a member who wrote the requirements, ran the client meetings or did the usability tests may have few commits; and a formatter run can add thousands of lines in one commit. CS 490's policy said the same: contribution means more than code.</p>

<h3>Peer evaluation and individual marks</h3>
<p>Each member's share of a team milestone grade is adjusted using the peer evaluations, the history and the instructor's observation, by at most 10 points either way (Lesson 1 and the policies). One widely used method for turning peer ratings into a weighting is <strong>WebPA</strong>, developed at Loughborough University. Each member rates every member, themselves included. Each rater's marks are divided by that rater's total, so a generous rater and a harsh one count equally. A member's score is the sum of the fractions they received, multiplied by a <strong>fudge factor</strong>, the group size divided by the number who submitted, so that the scores still average 1 when someone doesn't submit. A score of 1 means an equal share.</p>
<pre><code>group = ["Ana", "Ben", "Chloe", "Dev"]
ratings = {                                    # each assessor's marks out of 5, self included; Dev didn't submit
    "Ana":   {"Ana": 4, "Ben": 4, "Chloe": 3, "Dev": 1},
    "Ben":   {"Ana": 4, "Ben": 4, "Chloe": 4, "Dev": 2},
    "Chloe": {"Ana": 5, "Ben": 4, "Chloe": 4, "Dev": 1},
}
received = {m: 0.0 for m in group}
for assessor, marks in ratings.items():
    total = sum(marks.values())
    for member, mark in marks.items():
        received[member] += mark / total       # each submission is scaled to sum to 1
fudge = len(group) / len(ratings)              # 4 members, 3 submissions
scores = {m: received[m] * fudge for m in group}
print({m: round(s, 2) for m, s in scores.items()})
team = 84.0
final = {m: team * 0.5 + s * team * 0.5 for m, s in scores.items()}
print({m: round(x, 1) for m, x in final.items()})
print({m: round(max(team - 10, min(team + 10, x)), 1) for m, x in final.items()})</code></pre>
<pre data-label="Output"><code>{'Ana': 1.3, 'Ben': 1.21, 'Chloe': 1.1, 'Dev': 0.4}
{'Ana': 96.7, 'Ben': 92.7, 'Chloe': 88.0, 'Dev': 58.7}
{'Ana': 94.0, 'Ben': 92.7, 'Chloe': 88.0, 'Dev': 74.0}</code></pre>
<p>With a 50% weighting, half of each mark is the team's 84 and half is scaled by the score. Uncapped, Dev's mark falls 25 points below the team's; this course caps the adjustment at 10 points either way, so it becomes 74. Notice what the calculation can't see. Dev didn't submit, so his account of the work and his view of the others are missing: his score rests entirely on the three who did, and the factor 4/3 scales their ratings up without adding any information. And three teammates agreeing may reflect a real problem or a falling-out. That is why the course treats the ratings as one input among several, why it asks for specific written comments with examples, and why a member's low score triggers a conversation with the instructor before any mark is changed. The second programming problem implements the calculation.</p>

<h3>The project retrospective</h3>
<p>Run one last retrospective (CS 490 Lesson 8's five steps) about the whole project, with a different question: not "what do we change next iteration?" but "what would we tell next year's capstone teams?" Gather data first: the estimate ratios from both terms (did they improve?), the burndowns, the incidents, the evaluation results, the risks that happened and the ones that didn't. Write the answer as a page for the instructor to share with future teams. It is also the best preparation for interviews.</p>

<h3>What comes next</h3>
<p>The capstone is the closest thing in the degree to professional work, and it travels with you.</p>
<ul>
<li><strong>A portfolio.</strong> Describe the project in your own words: the user's problem, your part, the evidence, what you learned. Ask the client before showing their name, screenshots or code, and never show their data. If the repository is public under its license, link to it; if not, describe it.</li>
<li><strong>Interviews.</strong> Interviewers ask "tell me about a time when…": a disagreement, a mistake, a deadline. Your reflections and retrospectives are a collection of such stories, with evidence. A common structure is the situation, the task, the action you took, and the result: what you yourself did, and what changed because of it.</li>
<li><strong>Graduate study.</strong> A thesis, or a capstone with a careful evaluation, is evidence of research ability. Ask your adviser or instructor early for a letter, and give them your reflection and evaluation report to write from.</li>
<li><strong>The client.</strong> Keep the promise in your support statement, and no more. Many teams find that a client becomes a reference.</li>
<li><strong>Professional responsibility.</strong> The ACM Code of Ethics (CS 100 Lesson 3), which CS 480 Ethics, Law and Policy of Computing (required, and taken alongside this course) examines in depth, asks for honesty about the limits of your work, respect for privacy and the public good, and continued learning. The capstone has asked for each of these in practice: reporting misses plainly, keeping personal data out of logs and analytics, and learning what the project needed.</li>
</ul>
<p>Most of what you will use in your first job is not in this degree, because it hasn't been invented yet. What the degree has tried to give you is the ability to learn it from first principles, and the capstone the habit of checking what you build against what people need.</p>
`,
      terms: [
        ["Go/no-go meeting", "A meeting that decides, against agreed criteria, whether to launch as planned."],
        ["Launch checklist", "The list of conditions, each with evidence, that must hold before a system goes into full use."],
        ["Hypercare", "A period of closer monitoring and support immediately after launch."],
        ["Final presentation", "A talk telling a project's whole story to a mixed audience: problem, system, evidence, decisions and what happens next."],
        ["Thesis defense", "A presentation of a thesis's contribution and evaluation, followed by questions from examiners."],
        ["Mailmap", "A git file that maps commit names and emails to one canonical identity per person."],
        ["WebPA", "A peer-assessment method that normalizes each rater's marks and scales members' shares of a team mark by the fractions they receive."],
        ["Fudge factor", "In WebPA, the group size divided by the number of members who submitted ratings, so that scores average 1."],
        ["Project retrospective", "A retrospective at the end of a project about lessons for future projects."],
        ["Portfolio", "A collection of descriptions and evidence of one's work, shown to employers or admissions committees."]
      ],
      quiz: [
        { q: "At the go/no-go meeting, real data hasn't yet been checked by the client. What is the right outcome?", choices: ["Go, and check it afterwards", "No-go until it has been checked, since that criterion was agreed in advance", "Cancel the project", "Go, but only on Saturdays"], answer: 1, why: "The meeting checks agreed conditions; a no-go found before launch is the process working." },
        { q: "Which slide headline is best?", choices: ["Search", "Results", "Search finds misspelled names: 47 of 50 test names in the first three results", "Our amazing search"], answer: 2, why: "A headline that states the slide's claim, with evidence, tells the audience what to take away." },
        { q: "Asked about a measurement you didn't take, what is the best answer?", choices: ["Change the subject", "Guess a number", "Say directly that you didn't measure it, and how you could", "Say it isn't important"], answer: 2, why: "A direct, honest answer, with how you would find out, keeps the audience's trust." },
        { q: "Why is a commit-count summary not a measure of contribution?", choices: ["Git counts commits wrongly", "Requirements, client work, testing and reviews may produce few commits, and line counts reward volume over value", "Commits can be deleted", "Mailmaps are unreliable"], answer: 1, why: "It is evidence to be interpreted, as CS 490's policy said: contribution means more than code." },
        { q: "In WebPA, why is each rater's set of marks divided by its total?", choices: ["To make the numbers smaller", "So that generous and harsh raters count equally", "To remove self-ratings", "Because marks must be percentages"], answer: 1, why: "Normalization means only each rater's relative judgments matter." },
        { q: "A team of five has four submissions. What is WebPA's fudge factor?", choices: ["0.8", "1", "1.25", "4"], answer: 2, why: "Group size divided by submissions: 5/4 = 1.25." }
      ],
      practice: [
        {
          q: `<p>Write a launch checklist for the pantry's switch from paper to the system, with at least six items, each with the evidence that would let you tick it.</p>`,
          a: `<p>(1) Must-have acceptance tests pass: the CI run on the release commit, linked. (2) Data migrated: 1,840 households imported; Maria compared 50 chosen at random with the binder and found no errors (her email). (3) Rollback rehearsed: staging rollback took 4 minutes on 3 March (drill notes). (4) Backup restored by the maintainer into staging (runbook log). (5) Alerts reach the on-call phone: test alert acknowledged. (6) Volunteers trained: 18 of 20 regular desk volunteers attended a session; the tutorial is printed at the desk. (7) Paper fallback printed and its runbook understood by the shift leads. (8) On-call rota for the first three Saturdays, with phone numbers in the client's password manager. Each item names a person who confirms it at the go/no-go meeting.</p>`
        },
        {
          q: `<p>Compute WebPA scores for a team of three in which everyone submitted: A gives (A 4, B 4, C 2), B gives (A 3, B 3, C 3), C gives (A 5, B 3, C 2). With a team mark of 80, a 50% weighting and the course's 10-point cap, what are the individual marks?</p>`,
          a: `<p>Normalize: A's marks sum to 10, giving 0.4, 0.4, 0.2; B's to 9, giving 1/3 each; C's to 10, giving 0.5, 0.3, 0.2. Sums: A 0.4 + 0.333 + 0.5 = 1.233; B 0.4 + 0.333 + 0.3 = 1.033; C 0.2 + 0.333 + 0.2 = 0.733. The fudge factor is 3/3 = 1, and the scores sum to 3. Marks: 40 + 40 × score: A 89.3, B 81.3, C 69.3. The cap keeps each within 70 to 90, so C's becomes 70.0; A's and B's are unchanged. Before using it, the instructor would read the written comments: C rated themselves low too, which may mean C agrees, or was unwell.</p>`
        },
        {
          q: `<p>Turn this reflection paragraph into one that would score well: "Over the two terms I learned a lot about teamwork and communication. Our team worked well together and we built a great system. I did a lot of the backend and some testing. Next time I would plan better."</p>`,
          a: `<p>For example: "In October I estimated the offline sync at 6 hours; it took 19 (my CS 490 estimate log, task 23), because I didn't count testing two devices at once. In CS 491 I estimated every task with three points and checked my ratio each fortnight; it rose from 0.48 to 0.71 (plan appendix). When version 0.6.0 dropped a column the old copies still needed, I was incident commander; I spent the first ten minutes debugging instead of coordinating, and Maria heard nothing for 20 minutes (postmortem, timeline). The action I took from it, a CI check that blocks dropping a column still referenced in the code (PR 214), caught the same mistake in April. In my next job I will write the rollback trigger and the communication plan before a risky deploy, not during it." Each claim is specific, evidenced, and about what the writer did and learned.</p>`
        },
        {
          q: `<p><b>Project.</b> Hold your go/no-go meeting and launch; prepare and rehearse your final presentation (or thesis defense), including answers to the five hardest questions you expect; run the project retrospective and write its page for future teams; and write your final reflection.</p>`,
          a: `<p>A strong launch has a checklist with evidence and a recorded decision. A strong presentation tells the user's story, shows the system working on production, presents evaluated evidence with its misses, explains a few key decisions honestly, and has every member speaking; its rehearsal included hostile questions from outsiders. The retrospective's page gives future teams specific, evidenced advice. The reflection follows What? So what? Now what? across both terms, with evidence of change in the writer's own practice, and names a difficulty the writer caused.</p>`
        }
      ],
      sources: ["webpa", "gitmailmap", "acm", "peytonjones", "primedirective"]
    }
  ]
});

CSA.addAsides("cs491", {
  cx2: [
    { kind: "ethics", title: "Aggregated, anonymous and revealing", html: `<p>In November 2017 the fitness-tracking company Strava published an updated global heatmap: every route its users had recorded running or cycling, drawn as glowing lines on a world map. Strava described it as an aggregated, anonymized view of more than a billion activities. On 27 January 2018 Nathan Ruser, an Australian analyst, pointed out what the map showed in places such as Afghanistan, Syria and Djibouti, where few local people use fitness trackers: the bright lines were foreign soldiers jogging around the perimeters of their bases, and sometimes along patrol routes. Within days, researchers were using it to map military and other sensitive sites around the world. No individual's data appeared on the map, and yet the aggregate revealed exactly what the individuals' employers most wanted hidden. Two lessons carry over to any analytics plan. Aggregation protects people only when each aggregate covers many of them: a heatmap of a desert with one base in it is a map of that base, as a report counting one volunteer is a report about that volunteer. And defaults decide outcomes: sharing was on unless users found the setting to turn it off. After the reports, Strava pointed users to its privacy settings, and the U.S. military began reviewing its personnel's use of fitness trackers.</p>`, sources: ["strava18"] }
  ],
  cx4: [
    { kind: "practice", title: "Five ways to back up, none working", html: `<p>On 31 January 2017 GitLab.com, the hosted service of the GitLab code-hosting software, was struggling with database replication under heavy load. Late in the evening an engineer trying to rebuild the secondary database ran a command to empty its data directory, in a terminal that was connected to the <em>primary</em>. He stopped it within seconds, but about 300 GB of production data was gone. The team then discovered, one by one, that its safety nets didn't work. The regular database dumps had been failing silently: the backup script used an older version of the dump tool than the database, and the failure emails were rejected by the mail system, so nobody saw them. Disk snapshots had never been enabled for the database servers. Replication protected against a lost machine, not a deleted directory. What saved them was a disk snapshot taken about six hours earlier for an unrelated reason, to copy data to staging; restoring it took about 18 hours, mostly copying over slow disks, and the changes of those six hours (at least 5,000 projects, 5,000 comments and about 700 new user accounts, by GitLab's estimate) were lost. Git repositories themselves were not affected. GitLab streamed the recovery live on YouTube and published a detailed, blameless postmortem. Its actions are this lesson's: test that backups can be restored, regularly and automatically; alert when a backup fails, through a channel known to work; make destructive commands hard to run on the wrong machine; and rehearse recovery before it is needed.</p>`, sources: ["gitlab17"] }
  ],
  cx5: [
    { kind: "history", title: "The left-pad incident", html: `<p>On 22 March 2016 Azer Koçulu, an open-source developer, unpublished all 273 of his packages from npm, the JavaScript package registry, after a naming dispute in which npm gave the name of one of them, <code>kik</code>, to the messaging company of the same name. One of the others was <code>left-pad</code>, a function of about a dozen lines that pads a string on the left to a given length. Thousands of projects depended on it, most without knowing, because it was a transitive dependency of widely used build tools. For about two and a half hours, builds that installed it failed around the world. Within minutes another developer published a replacement, but projects whose lockfiles or constraints named the original version 0.0.3 still failed, until npm took the unprecedented step of restoring the unpublished version from a backup. npm then changed its rules so that a package other packages depend on can no longer simply be unpublished. The incident started a long argument about tiny dependencies: whether a dozen lines are worth a dependency at all, given that every package added is code, a maintainer and a registry you trust. Its lessons for a maintainer are this lesson's: know your transitive dependencies, pin them in a lockfile, keep a cache or mirror of what your builds install, and treat every new dependency as a decision.</p>`, sources: ["leftpad16"] }
  ]
});
