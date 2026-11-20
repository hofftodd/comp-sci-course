CSA.addCourse({
  id: "cs490",
  code: "CS 490",
  title: "Capstone Project I",
  credits: 4,
  kind: "required",
  term: "y4f",
  summary: "The first half of a two-term capstone. Teams of three to five build a substantial software system for a real user. This term takes a team from an idea to a working prototype in that user's hands: choosing a problem and a stakeholder, discovering requirements, planning and estimating, choosing an architecture and defending it in a design review, working as a team (including with AI assistants), building in thin vertical slices, making the system secure, private, accessible and fast enough, and demonstrating and reflecting on it. Most of the grade comes from the project's milestones; the lessons teach what a team needs at each stage, and every programming problem is a tool a team can use on its own project. CS 491 Capstone Project II continues the same project next term.",
  prereqs: ["CS 240 Software Engineering I", "WRIT 100 Writing for Technical Audiences", "CS 340 Databases", "CS 380 Security Fundamentals"],
  outcomes: [
    "Find a real problem and a stakeholder who will work with the team, and scope a project the team can finish in two terms",
    "Discover requirements by interviewing and observing users, and write them as testable stories and measurable non-functional targets",
    "Prioritize work by value and cost of delay, and estimate and schedule it with three-point estimates and the critical path",
    "Choose an architecture from the requirements, record decisions, and run and respond to a design review",
    "Work effectively in a team: agree a charter, run useful meetings and reviews, handle conflict, and use AI assistants responsibly",
    "Build a walking skeleton and grow it in vertical slices, using trunk-based development, feature flags and continuous delivery",
    "Threat-model the project, handle personal data lawfully and minimally, and meet accessibility and performance targets",
    "Demonstrate the system to its users, run usability tests, measure it against its requirements, and reflect honestly on the team's work"
  ],
  practiceLabels: { title: "Practice and project work", intro: "Problems marked <b>Project</b> are steps on your own team's project, and their answers describe what a strong response does. The others have worked answers. Try each one before you open its answer.", answer: "Answer and guidance" },
  rubric: {
    criteriaFor: "the project milestones (proposal, requirements, design, prototype, report and reflection)",
    assessments: [
      { name: "Proposal and team charter", weight: 10, desc: "Week 3. A two- to three-page proposal naming the problem, the user and the evidence that the problem is real, the scope and non-goals, the main risks and the client's commitment, with the team's signed charter attached. Graded as a team." },
      { name: "Requirements document", weight: 15, desc: "Week 5. User stories with acceptance criteria, measurable non-functional targets, priorities and the evidence from interviews and observation behind them, reviewed and agreed with the client. Graded as a team." },
      { name: "Design document and design review", weight: 15, desc: "Week 7. The design document and its decision records, the review meeting with another team and the instructor, and the written response to every review comment. Graded as a team, with a share for each member's part in the review." },
      { name: "Prototype demo", weight: 20, desc: "Week 11. A working, deployed prototype of the core flow, demonstrated to the client and the class, with its tests, CI pipeline and repository history. Graded as a team; individual grades are adjusted by contribution (see the policies)." },
      { name: "Mid-project report and retrospective", weight: 15, desc: "Week 14. The team's report on what works, measured against the requirements, usability test results, the updated plan and risks for CS 491, and the retrospective's findings and actions. Graded as a team." },
      { name: "Individual reflections and peer evaluation", weight: 10, desc: "A short reflection after each milestone and a final one of 1,000–1,500 words, citing your own commits, reviews and documents as evidence; plus thoughtful, specific peer evaluations of your teammates. Graded individually." },
      { name: "Lesson quizzes and problems", weight: 15, desc: "The quiz at the end of each lesson (best attempt counts) and the lessons' programming problems, which are tools you will use on your project. Graded individually." }
    ],
    criteria: [
      { name: "Value to the user", desc: "Does the work solve the user's real problem?", levels: [
        "Grounded in evidence from real users; the prototype makes their task measurably easier, and the user says so.",
        "Addresses a real need, with some guesses about users that were never checked.",
        "Solves a problem the team imagined, with little contact with users.",
        "No identifiable user or problem." ] },
      { name: "Engineering", desc: "Is it built so it can keep growing next term?", levels: [
        "Deployed and tested automatically; clear structure and recorded decisions; security, privacy and accessibility designed in.",
        "Sound, with gaps in tests, deployment or one of the cross-cutting concerns.",
        "Runs only on a laptop or only in the demo; little testing; decisions undocumented.",
        "Doesn't work." ] },
      { name: "Evidence and honesty", desc: "Are claims backed by measurement?", levels: [
        "Every claim of progress is backed by tests, measurements or user data; misses and risks are reported plainly with a plan.",
        "Mostly backed by evidence; some claims are impressions.",
        "Progress is asserted, not shown; problems are hidden or explained away.",
        "Claims are contradicted by the work." ] },
      { name: "Teamwork and communication", desc: "Does the team work well and write clearly?", levels: [
        "Fair shares of the work, visible in the history; prompt reviews; documents a client and a new teammate can follow.",
        "Mostly fair and clear, with some uneven periods or unclear writing.",
        "Work concentrated in one or two people, or documents that only the team understands.",
        "The team doesn't function." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Teams and clients:</b> teams of three to five, formed in week 2 and kept for both terms. Every project needs a stakeholder outside the team, approved by the instructor, who agrees to meet the team at least every two weeks. If a client disappears, tell the instructor at once: it is a risk to manage, not a reason to fail.",
      "<b>Individual grades:</b> team milestones are graded once, then each member's share is adjusted (up or down, by at most a letter grade) using the peer evaluations, the repository history and the instructor's observation. Contribution means more than lines of code: requirements, design, testing, reviews and client work all count.",
      "<b>AI assistants:</b> allowed, as in industry. Each pull request and document says how one was used; you are responsible for every line and every sentence you submit, and must be able to explain them in review. Never paste the client's personal data, credentials or confidential material into a third-party tool. Lesson 5 discusses this.",
      "<b>Data and ownership:</b> develop with synthetic data; use real personal data only under a written agreement with the client and the protections of Lesson 7. Agree in the proposal who owns the code (an open-source license is the default) and how it will be handed over.",
      "<b>Deadlines:</b> demo and review dates are fixed, because other people attend them. Documents have three late days per team for the term."
    ]
  },
  units: [
    {
      id: "pj1",
      title: "Choosing a project and a user",
      minutes: 90,
      summary: "What makes a good capstone project; finding a real problem and a stakeholder; telling clients, users and the team apart; estimating what a team can build in two terms; identifying and ranking risks; writing the proposal; and forming a team with a charter it will actually use.",
      notes: `
<p>The capstone is two terms long. This term, CS 490, takes your team from an idea to a working prototype used by a real person. Next term, CS 491 Capstone Project II, takes the same project to a finished system handed over to its users. Most of your grade comes from the project's five milestones (Lesson 3 lists them with their weeks) and the reflections and peer evaluations that go with them, so the lessons are arranged in the order a team needs them: this one covers the first three weeks, and the last covers the prototype demo and mid-project report.</p>
<p>CS 240's team project gave you a specification and an instructor-assigned team for one term. The capstone gives you neither. You find the problem, the user and, often, the team. The decisions in this lesson shape everything after it. A well-chosen, well-scoped project with a committed user is hard to fail; a vague one with no user is hard to rescue.</p>

<h3>What makes a good capstone project</h3>
<p>Look for these five properties, roughly in order of importance.</p>
<ul>
<li><strong>A real user with a real problem.</strong> Someone who does a task today, does it badly or slowly, and would use something better. "Students might like an app that…" is a guess; "the food pantry coordinator spends every Friday afternoon texting volunteers to fill Saturday's shifts" is a problem.</li>
<li><strong>Access to that user.</strong> They will meet you every two weeks, let you watch them work, and try your prototype. A brilliant problem whose owner never answers email is a bad project.</li>
<li><strong>Substance.</strong> Enough software engineering for a team of four for two terms: several kinds of user, stored data, some integration with the outside world, and quality requirements (security, privacy, accessibility, performance) that matter. A static website isn't enough; a research question with no product is something else (a thesis).</li>
<li><strong>A core you can finish.</strong> There is a small version that would already help, so that whatever happens, something useful ships.</li>
<li><strong>Something you want to learn.</strong> You will spend nearly 300 hours on it. Pick a domain or technology you care about, but not so many unfamiliar ones that you learn instead of building (Lesson 4's "innovation tokens").</li>
</ul>
<p>Good sources: university offices and research labs that run on spreadsheets; local nonprofits (food banks, shelters, sports clubs, tenant associations); small businesses; open-source projects whose maintainers want a feature (the maintainers become the stakeholders); and problems you have yourself, provided you then find other people who have them too. Be wary of "a startup idea": without real users it is a project with no one to say whether you are right.</p>

<h3>Clients, users and you</h3>
<p>CS 240 Lesson 1 called everyone affected by a system a <strong>stakeholder</strong>. In a capstone, separate three roles. The <strong>client</strong> (or sponsor) asks for the system and agrees the scope. The <strong>users</strong> operate it. The <strong>team</strong> builds it. They are often different people with different interests. At our running example, the Riverside Community Food Pantry, the client is Maria, the volunteer coordinator. The users are the twenty or so volunteers who staff the check-in desk, Maria herself, and indirectly the pantry's clients (the households who collect food), whose personal data the system will hold. A design that pleases Maria but makes the desk slower on a busy Saturday has failed.</p>
<p>Before you commit, agree with the client, in writing:</p>
<ul>
<li>how often you will meet (every two weeks is the minimum) and who you can contact between meetings;</li>
<li>what data and systems you may use, and on what terms (Lesson 7);</li>
<li>who owns the code: an open-source license such as MIT is the simplest answer, and lets the client keep using it after you leave;</li>
<li>what happens at the end: who will run the system, and what they need from you to do it.</li>
</ul>

<h3>Scoping: what can a team build?</h3>
<p>Start from the hours you have, not the features you want. A four-credit course is about 12 hours a week of work; after lessons and quizzes, say 10 hours a week each on the project.</p>
<pre><code>members, weeks, hours = 4, 28, 10      # two terms of 14 weeks
total = members * weeks * hours
print(total)                           # 1120
meetings = members * weeks * 2         # stand-ups, planning, client meetings, reviews
writing = 0.15 * total                 # proposal, requirements, design, reports, demos
build = total - meetings - writing
print(round(build))                    # 728</code></pre>
<p>About 730 hours of design, code and testing, for the whole project, both terms. That sounds like a lot until you price features: a login system done properly, with password reset and roles, can take a team 60 hours; a reliable import from a messy spreadsheet, 40. And Lesson 3 shows that first estimates usually come out low. A proposal whose features add up to all 730 hours is already late. Aim for a <strong>core</strong>, the smallest system that does the user's main task end to end (CS 240's minimum viable product), of about a third of the budget, so that it can be in the user's hands by week 11 of this term, and list everything else as ordered extensions for CS 491.</p>
<p>Write the scope as goals and <strong>non-goals</strong> (WRIT 100 Lesson 7). For the pantry: "Goal: a volunteer at the desk can check in a returning household in under 30 seconds. Goal: Maria can fill next Saturday's shifts without texting anyone. Non-goal: managing donations from grocery stores. Non-goal: a mobile app (the desk has a laptop; volunteers have phone browsers)."</p>

<h3>Risk</h3>
<p>A <strong>risk</strong> is something that may happen and would hurt the project. CS 380 Lesson 1 ranked security threats by probability times cost; project risks are ranked the same way, usually with rough ratings from 1 to 5 because the real numbers are unknowable. Capstone risks fall into four groups:</p>
<ul>
<li><strong>User and requirements:</strong> the users don't want it, or want something else.</li>
<li><strong>Technical:</strong> something may be impossible or too slow (a barcode scanner, an API you haven't used, a performance target).</li>
<li><strong>People:</strong> skills the team lacks, members with little time, a member leaving.</li>
<li><strong>External:</strong> the client leaves or loses interest, data access is refused, a third-party service changes its terms.</li>
</ul>
<p>A <strong>risk register</strong> lists each risk with its likelihood, its impact, an owner, and a response: <em>avoid</em> it (change the plan so it can't happen), <em>reduce</em> it (make it less likely or less harmful), <em>transfer</em> it (let someone else carry it, as with a hosted service), or <em>accept</em> it (and watch for a warning sign). Exposure, likelihood × impact, puts them in order:</p>
<pre><code>risks = [
    ("R1", "Client stops replying", 2, 5),
    ("R2", "Nobody on the team has used a barcode scanner", 4, 3),
    ("R3", "Pantry Wi-Fi drops during check-in", 3, 4),
    ("R4", "Two members graduate in December", 1, 3),
]
for rid, title, likelihood, impact in sorted(risks, key=lambda r: -r[2] * r[3]):
    print(rid, likelihood * impact, title)</code></pre>
<pre data-label="Output"><code>R2 12 Nobody on the team has used a barcode scanner
R3 12 Pantry Wi-Fi drops during check-in
R1 10 Client stops replying
R4 3 Two members graduate in December</code></pre>
<p>(Python's sort is stable, so R2 and R3, which tie, keep their original order.) The technical risks at the top are best retired early with a <strong>spike</strong>: a short, time-boxed experiment whose only output is knowledge. Two people spending one afternoon getting a cheap USB scanner to type a card number into a web form turns R2's likelihood from 4 to 1, or tells you in week 3, not week 10, that you need another approach. R3 is answered by design (Lesson 4: the desk must keep working offline). R1 is reduced by having a second contact at the pantry. Revisit the register at every planning meeting: risks change, and new ones appear.</p>

<h3>The proposal</h3>
<p>The proposal is the first milestone. It asks the instructor and the client to approve the project, so it follows WRIT 100 Lesson 7's rules: the request first, the problem in the reader's terms, evidence, and honest risks. Two to three pages:</p>
<ol>
<li><strong>Summary.</strong> One paragraph: the user, the problem, what you'll build, and what "done" looks like at the end of each term.</li>
<li><strong>The problem and the evidence.</strong> Who has it, how they cope now, and how you know: a first conversation, a look at their spreadsheet, numbers ("about 120 households a week; check-in queues reach 25 minutes").</li>
<li><strong>Scope.</strong> The core, the extensions in priority order, and the non-goals.</li>
<li><strong>Risks.</strong> The top five from the register, with responses.</li>
<li><strong>Team and plan.</strong> Who brings which skills, the milestone dates, and the client's commitment.</li>
</ol>

<h3>Forming a team and writing a charter</h3>
<p>Teams of three to five work best: fewer can't cover the work, and with more the lines of communication, <em>n</em>(<em>n</em> − 1)/2 (CS 240 Lesson 1), multiply. Mix skills (someone has done front-end work, someone databases, someone enjoys writing), but match <em>ambition</em> and <em>availability</em>. The most common source of capstone conflict isn't technical: it is one member aiming for an A and a portfolio piece while another needs a pass and has a job on weekends. Neither is wrong, but they must be said out loud in week 2, not discovered in week 9.</p>
<p>A <strong>team charter</strong> is a one- or two-page agreement, written together and signed by everyone. It covers:</p>
<ul>
<li><strong>Goals:</strong> what each member wants from the project, and the grade the team is aiming for.</li>
<li><strong>Availability:</strong> each member's hours per week, fixed commitments, and a regular meeting time.</li>
<li><strong>Roles</strong> (Lesson 5): client contact, process lead, and so on, and when they rotate.</li>
<li><strong>Communication:</strong> which channel is for what, and how quickly members reply (say, within 24 hours on weekdays).</li>
<li><strong>Decisions:</strong> by consensus, falling back to a vote after a fixed time, with technical decisions recorded (Lesson 4).</li>
<li><strong>Quality:</strong> the team's definition of done (reviewed, tested, merged, deployed).</li>
<li><strong>When things go wrong:</strong> what happens when someone misses a commitment: a private conversation, then a team discussion of the charter, then the instructor. Agreeing on this before anyone has missed anything makes it fair.</li>
</ul>
<p>A charter is worth writing only if the team uses it. Put it in the repository, and reread it at every retrospective (Lesson 8).</p>
`,
      terms: [
        ["Capstone project", "A substantial project, usually for a real user, that draws on everything a degree has taught."],
        ["Client (sponsor)", "The person or organization that asks for a system and agrees its scope; not always one of its users."],
        ["Core (minimum viable product)", "The smallest version of the system that does the user's main task end to end."],
        ["Non-goal", "Something a reader might expect the project to do, which it deliberately won't."],
        ["Risk", "An uncertain event that would hurt the project if it happened."],
        ["Exposure", "A risk's likelihood times its impact, used to rank risks."],
        ["Risk register", "A list of a project's risks with their likelihood, impact, owner and planned response."],
        ["Spike", "A short, time-boxed experiment done to answer a question or retire a technical risk."],
        ["Project proposal", "A document asking a decision-maker to approve a project: problem, evidence, scope, risks and plan."],
        ["Team charter", "A written agreement among team members on goals, availability, roles, communication, decisions and what happens when commitments are missed."]
      ],
      quiz: [
        { q: "Which is the strongest evidence that a capstone problem is real?", choices: ["Your friends say they'd use the app", "You watched the pantry coordinator spend three hours texting volunteers to fill shifts", "Similar apps exist", "The idea came to you in a hackathon"], answer: 1, why: "Observed behavior by the person who has the problem is evidence; opinions about a hypothetical product aren't." },
        { q: "At the pantry, who is the client, and who are the users?", choices: ["The team is the client; Maria is the user", "Maria is the client; the volunteers and Maria are users, and the households' data is in it", "The households are the client", "There are no users until it ships"], answer: 1, why: "The client asks for the system and agrees its scope; users operate it. The households are affected stakeholders whose data it holds." },
        { q: "A team has about 730 hours of building time for two terms. How large should the core be?", choices: ["All 730 hours, to make the most of them", "About a third of the budget, so it reaches users this term with room for underestimates", "As small as one afternoon", "It doesn't matter if the team works hard"], answer: 1, why: "Estimates usually run low, and the core must be in users' hands by the prototype demo; extensions follow in priority order." },
        { q: "A risk has likelihood 4 and impact 3. Another has likelihood 2 and impact 5. Which ranks higher by exposure?", choices: ["The first, 12 against 10", "The second, because impact matters more", "They tie", "Neither: exposure is likelihood plus impact"], answer: 0, why: "Exposure is likelihood × impact: 4 × 3 = 12 and 2 × 5 = 10." },
        { q: "What is a spike?", choices: ["A sudden increase in traffic", "A time-boxed experiment whose output is knowledge, used to retire a risk", "The first feature built", "A bug found late"], answer: 1, why: "A spike answers a question, such as whether the scanner can type into a form, before the plan depends on the answer." },
        { q: "What is the most common cause of capstone team conflict, and when should it be addressed?", choices: ["Choice of programming language; in the design review", "Mismatched ambition and availability; in the charter, in week 2", "Git merge conflicts; when they happen", "Grading; after the term"], answer: 1, why: "Different goals and hours are legitimate but must be stated and planned for at the start." }
      ],
      practice: [
        {
          q: `<p>For each idea, say which of the five properties of a good capstone project it lacks most, and how you might fix it: (a) "A social network for students to share study tips"; (b) "A compiler for a new language we've designed"; (c) "A booking system for the campus climbing wall: the manager runs it on a paper sign-up sheet and has agreed to meet us, but only once, in October"; (d) "Replace the university's entire student information system".</p>`,
          a: `<p>(a) No identified user or problem: it starts from a solution. Find people who struggle to share study material now and watch how they do it; the real problem may be narrower ("lab partners can't find each other's notes"). (b) No user: it is closer to a thesis. Fine if a faculty member wants it as research, but as a capstone it needs someone who would use the language. (c) Access: one meeting isn't enough to discover requirements or test a prototype. Ask for a meeting every two weeks, or a deputy who can stand in; if neither is possible, choose another project. (d) Not finishable: years of work for a large team, with legal and data constraints you can't meet. A core you could finish might be one office's single painful task within that system.</p>`
        },
        {
          q: `<p>A team of three expects 8 project hours a week each over two 14-week terms. Using the notes' model (2 hours a week each of meetings, 15% of the total for writing), how many building hours do they have, and about how big should their core be?</p>`,
          a: `<p>Total 3 × 28 × 8 = 672 hours. Meetings 3 × 28 × 2 = 168. Writing 0.15 × 672 = 100.8. Building: 672 − 168 − 100.8 ≈ 403 hours. A core of about a third is roughly 130 hours of estimated work, which must fit in the first 11 weeks of this term alongside the proposal, requirements and design. A three-person team should scope noticeably smaller than a four-person one, since meetings and documents don't shrink in proportion.</p>`
        },
        {
          q: `<p>Write a risk register entry (risk, likelihood, impact, exposure, response type, specific action, owner, warning sign) for each: (a) the pantry's laptop is ten years old and may not run a modern browser well; (b) a team member has a part-time job whose hours change week to week.</p>`,
          a: `<p>(a) "Desk laptop too slow for the web app." Likelihood 3, impact 4, exposure 12. Response: reduce. Action: in week 3, a spike loads a test page with the planned front-end framework on the actual laptop and times it; set a performance budget (Lesson 7) from the result. Owner: the tech lead. Warning sign: the test page takes more than 2 seconds to become usable. (b) "Member availability varies." Likelihood 4, impact 2, exposure 8. Response: reduce and accept. Action: that member takes tasks off the critical path (Lesson 3), with no single-person dependencies; the charter records their hours. Owner: the process lead. Warning sign: two missed stand-ups in a row. Note that the response is about the plan, not about blaming the person.</p>`
        },
        {
          q: `<p><b>Project.</b> Draft your team's charter. For each of the seven sections in the notes, write at least two concrete sentences, then each member signs. Include one scenario you agree on in advance, such as "a member's pull request has been waiting for review for three days".</p>`,
          a: `<p>A strong charter is specific enough to settle a disagreement: "we reply within 24 hours on weekdays" rather than "we communicate well"; "each member reviews at least two pull requests a week"; "decisions are by consensus; if we haven't agreed after 20 minutes, the member who owns that area decides, and records it as a decision record". It states each member's goals and hours honestly, including limits. Its "when things go wrong" section has steps in order (private conversation, team discussion, instructor) and the agreed scenario has a concrete answer (the process lead reassigns the review the next morning). Weak charters are lists of virtues that nobody could violate or enforce.</p>`
        }
      ],
      sources: ["designdocs", "swebook", "agilemanifesto"]
    },
    {
      id: "pj2",
      title: "Discovering requirements",
      minutes: 90,
      summary: "Requirements are discovered, not gathered: interviewing users about what they actually do, observing them at work, turning what you learn into user stories with acceptance criteria, writing non-functional requirements as measurable targets, prioritizing with MoSCoW and the cost of delay, and writing a requirements document that tests can be traced to.",
      notes: `
<p>CS 240 Lesson 1 showed what good requirements look like: user stories with Given/When/Then acceptance criteria, and testable non-functional requirements. It didn't say where they come from. In a capstone, nobody hands them to you. The client has a problem and some ideas about solutions; the users have habits, workarounds and frustrations they may never have put into words. Requirements are <em>discovered</em>, through conversation and observation, and this lesson is about doing that well.</p>

<h3>Why asking "what do you want?" fails</h3>
<p>Ask Maria what she wants and she will describe a solution: "an app where volunteers sign up for shifts". That's useful, but it is her guess at a design, and it hides the problem. People also answer hypothetical questions badly. Asked "would you use a reminder text?", almost everyone says yes, to be polite and because it costs nothing to say. What they actually did last week is much better evidence than what they say they would do.</p>

<h3>Interviewing users</h3>
<p>An interview is a planned conversation, about 30 to 45 minutes, with one user. Prepare a list of topics, not a script, and follow these rules:</p>
<ul>
<li><strong>Ask about the past, in particular.</strong> "Tell me about last Friday, when you were filling Saturday's shifts" beats "how do you schedule volunteers?". Specific stories contain the steps, tools and annoyances that generalizations smooth away.</li>
<li><strong>Don't lead.</strong> "Wouldn't it be easier if volunteers could sign up online?" invites a yes. Ask "what happened next?", "how did you handle that?", "what's the hardest part?".</li>
<li><strong>Ask why, gently, more than once.</strong> "Why do you text people individually?" "Because the group chat gets ignored." "Why?" "Because it's full of other messages." Now you know the problem is attention, not sending.</li>
<li><strong>Ask for the artifacts.</strong> The spreadsheet, the paper form, the sticky note on the monitor. Workarounds are requirements in disguise: a column headed "DON'T CALL BEFORE 10" is a requirement nobody would have mentioned.</li>
<li><strong>Don't pitch.</strong> Your idea can wait. Once you describe it, the user starts reacting to it instead of telling you about their work.</li>
<li><strong>Work in pairs.</strong> One person asks, the other takes notes, close to verbatim. Record audio only with permission (Lesson 7).</li>
</ul>
<table>
<tr><th>Weak question</th><th>Why it is weak</th><th>Better</th></tr>
<tr><td>Would you use an app for check-in?</td><td>Hypothetical, invites politeness</td><td>Walk me through the last busy Saturday at the desk.</td></tr>
<tr><td>Is the paper sign-in sheet frustrating?</td><td>Leading</td><td>What happens to the sheet after the pantry closes?</td></tr>
<tr><td>What features do you need?</td><td>Asks the user to design</td><td>What took longest last week? What went wrong?</td></tr>
</table>
<p>Interview several people in each role, until new interviews stop telling you new things. For a small client that may be three volunteers and Maria; for a larger one, five or more per role.</p>

<h3>Observation</h3>
<p>What people say they do and what they do differ, not because they lie but because routine work becomes invisible to the person doing it. So watch. In <strong>contextual inquiry</strong>, you sit with a user while they do the real task, in their real place, and ask about what you see ("you paused there: why?"), treating them as the expert and yourself as the apprentice.</p>
<p>At the pantry, Maria said check-in "takes a minute". Two team members timed 20 check-ins one Saturday. The median was 52 seconds, but returning households whose names were spelled differently in the binder took up to four minutes, and those caused the queue. That single observation changed the design: the system needs fast, forgiving search, and a household card with a number. No interview would have produced it.</p>

<h3>From notes to stories</h3>
<p>After interviews and observation you have pages of notes. Write each distinct observation on its own card or sticky note, then group related ones on a wall or a shared board until themes emerge (<strong>affinity mapping</strong>): "finding the household", "no-shows", "Maria is the single point of failure". Each theme suggests stories. Write them as in CS 240, with acceptance criteria that include the unhappy paths:</p>
<pre data-label="Story"><code>REQ-4  As a desk volunteer, I want to find a returning household by card number
       or by an approximate name, so that check-in doesn't stall the queue.

Given household 1042 "Diaz, Rosa" is registered,
When I type "dias ros",
Then "Diaz, Rosa (1042)" is among the first three results.

Given the household has already checked in this week,
When I select it,
Then I see the earlier visit's date and must confirm before recording another.</code></pre>
<p>Bill Wake's INVEST checklist (2003) is a quick test of each story: <strong>I</strong>ndependent (can be built in any order), <strong>N</strong>egotiable (details are worked out together, not fixed), <strong>V</strong>aluable to a user, <strong>E</strong>stimable, <strong>S</strong>mall (days, not weeks) and <strong>T</strong>estable. A story that fails "Valuable", such as "set up the database", is a task, not a story.</p>

<h3>Non-functional requirements as measurable targets</h3>
<p>CS 240 said a requirement must be testable. For quality attributes, make each one a measurement with four parts: what is measured (the <em>scale</em>), how it is measured (the <em>meter</em>), the level you aim for (the <em>target</em>), and the worst level the client will accept (the <em>constraint</em>). This layout comes from Tom Gilb's requirements language, Planguage.</p>
<table>
<tr><th>Id</th><th>Scale</th><th>Meter</th><th>Target</th><th>Constraint</th></tr>
<tr><td>NFR-1 Check-in speed</td><td>Seconds from a household reaching the desk to the visit being recorded</td><td>Timed observation of 20 check-ins on a Saturday</td><td>95% within 30 s</td><td>None over 60 s</td></tr>
<tr><td>NFR-2 Offline</td><td>Minutes the desk can keep checking people in with no network</td><td>Unplug the router during a test session</td><td>A whole 3-hour session</td><td>30 minutes</td></tr>
<tr><td>NFR-3 Usability</td><td>Mean SUS score of new volunteers (Lesson 8)</td><td>Questionnaire after a first shift</td><td>80</td><td>68</td></tr>
<tr><td>NFR-4 Accessibility</td><td>WCAG 2.2 level AA failures on core pages (Lesson 7)</td><td>Automated checker plus a manual keyboard and screen-reader pass</td><td>0</td><td>0</td></tr>
</table>
<p>Targets give the team something to test (Lesson 8 measures them for the mid-project report) and the client something to agree to. "95% within 30 s" also says something "fast" never could: occasional slow check-ins are acceptable, routine ones aren't.</p>

<h3>Prioritizing</h3>
<p>CS 240 introduced MoSCoW: Must, Should, Could, Won't (this time). Its weakness is that clients call everything a Must. A common rule from DSDM (the Dynamic Systems Development Method, an agile method from 1994 and the one that introduced MoSCoW) is to keep Musts to about 60% of the estimated effort, so that the Shoulds and Coulds are the contingency that absorbs underestimates. If everything is a Must, there is no contingency.</p>
<p>Within the Musts and Shoulds you still need an order. <strong>Cost of delay</strong> asks: what does each week without this feature cost the user? The pantry values volunteer time at about $30 an hour. Shift reminders would save Maria and the volunteers about 10 hours a week ($300). Faster check-in would save about $800 a week of volunteers' and households' waiting time. Low-stock alerts would prevent about $500 a week of food going to waste. Their estimated build times are 1, 3 and 4 weeks. If the team builds one at a time, each feature's cost accrues until it is delivered:</p>
<pre><code>features = [("shift reminders", 300, 1), ("low-stock alerts", 500, 4), ("faster check-in", 800, 3)]

def delay_cost(order):
    info = {name: (cost, weeks) for name, cost, weeks in features}
    elapsed = total = 0
    for name in order:
        cost, weeks = info[name]
        elapsed += weeks              # this feature is delivered at the end of week 'elapsed'
        total += cost * elapsed
    return total

print(delay_cost(["faster check-in", "low-stock alerts", "shift reminders"]))   # 8300
print(delay_cost(["shift reminders", "faster check-in", "low-stock alerts"]))   # 7500</code></pre>
<p>Building the most valuable feature first costs $800 more than the second order. The rule behind the better order is <strong>CD3</strong>, cost of delay divided by duration: reminders 300/1 = 300, check-in 800/3 ≈ 267, alerts 500/4 = 125, so build in that order. Small, valuable things go first.</p>
<p>Why does CD3 work? Use an exchange argument (CS 220 Lesson 2). Take any order, and two adjacent features <em>i</em> then <em>j</em>, starting at time <em>T</em>, with costs of delay <em>c</em> and durations <em>w</em>. Everything else finishes at the same time whichever of the two goes first. With <em>i</em> first, the pair costs <em>c<sub>i</sub></em>(<em>T</em> + <em>w<sub>i</sub></em>) + <em>c<sub>j</sub></em>(<em>T</em> + <em>w<sub>i</sub></em> + <em>w<sub>j</sub></em>). With <em>j</em> first, it costs <em>c<sub>j</sub></em>(<em>T</em> + <em>w<sub>j</sub></em>) + <em>c<sub>i</sub></em>(<em>T</em> + <em>w<sub>i</sub></em> + <em>w<sub>j</sub></em>). Subtracting, the first minus the second is <em>c<sub>j</sub>w<sub>i</sub></em> − <em>c<sub>i</sub>w<sub>j</sub></em>, which is negative exactly when <em>c<sub>i</sub></em>/<em>w<sub>i</sub></em> &gt; <em>c<sub>j</sub></em>/<em>w<sub>j</sub></em>. So swapping any adjacent pair that is out of CD3 order never increases the total. Each such swap removes one inversion (a pair in the wrong order, CS 201 Lesson 6), so repeating it must stop, and it stops at the CD3 order: any order can be turned into the CD3 order without making it worse. (Operations researchers know this as Smith's rule, from 1956.) The numbers are rough guesses, but the habit of asking "what does waiting cost?" and preferring small valuable pieces is the point.</p>

<h3>The requirements document</h3>
<p>The second milestone. It records what the team and the client agree the system must do, and it is the reference for every later argument about scope. A good structure:</p>
<ol>
<li><strong>Purpose and users:</strong> the problem, each kind of user, and the evidence (a summary of interviews and observation, with dates).</li>
<li><strong>Glossary:</strong> the domain's words, defined once ("household", "visit", "shift"). Misunderstood words cause more rework than misunderstood algorithms.</li>
<li><strong>Stories</strong> with ids, acceptance criteria and priorities, grouped by theme.</li>
<li><strong>Non-functional requirements</strong> as targets, in the table form above.</li>
<li><strong>Constraints:</strong> things that are fixed, not chosen: "runs on the desk laptop's browser", "no budget for paid services", "data stays in Canada".</li>
<li><strong>Out of scope</strong> and <strong>open questions</strong>.</li>
<li><strong>Change log:</strong> what changed since the client last agreed, and why.</li>
</ol>
<p>Give every requirement a permanent id, and make every test name the ids it checks. Then a short tool (this lesson's programming problem) can build a <strong>traceability matrix</strong>, a table from each requirement to its tests, and list requirements that nothing tests. That turns "is it done?" into a question with an answer.</p>
<p>Finally, review the document with the client, line by line, and get their agreement in writing (an email is enough). It isn't a contract: requirements will change as users try the prototype, and agile teams expect that. It is a snapshot that makes each change visible and deliberate.</p>
`,
      terms: [
        ["Requirements discovery (elicitation)", "Finding out what a system must do by interviewing, observing and working with its users."],
        ["Leading question", "A question that suggests its own answer, such as 'wouldn't it be easier if…?'"],
        ["Contextual inquiry", "Observing a user doing real work in their own setting and asking about what you see."],
        ["Affinity mapping", "Grouping individual observations into themes to find patterns in research notes."],
        ["INVEST", "A checklist for user stories: independent, negotiable, valuable, estimable, small, testable."],
        ["Measurable target", "A non-functional requirement stated as a scale, a way to measure it, a target level and a minimum acceptable level."],
        ["MoSCoW", "Prioritizing requirements as Must, Should, Could and Won't (this time)."],
        ["Cost of delay", "The value lost for each unit of time a feature isn't delivered."],
        ["CD3", "Cost of delay divided by duration; doing work in decreasing CD3 order minimizes the total cost of delay."],
        ["Traceability matrix", "A table linking each requirement to the tests (or design elements) that cover it."]
      ],
      quiz: [
        { q: "Which interview question is best?", choices: ["Would you use an app to schedule volunteers?", "Tell me about the last time you filled Saturday's shifts.", "Don't you find texting everyone frustrating?", "What features should the app have?"], answer: 1, why: "It asks about specific past behavior, without leading or asking the user to design." },
        { q: "Why observe users as well as interviewing them?", choices: ["Interviews are illegal without consent", "Routine work is invisible to the people doing it, so what they say and do differ", "Observation is faster", "Users always lie"], answer: 1, why: "The pantry's slow check-ins only showed up when the team timed real ones." },
        { q: "Which is a well-formed measurable target?", choices: ["Check-in should be fast", "Check-in is faster than before", "95% of check-ins take at most 30 s, measured by timing 20 on a Saturday; none over 60 s", "Check-in uses an efficient algorithm"], answer: 2, why: "It has a scale, a way of measuring, a target and a minimum acceptable level." },
        { q: "Features A (cost of delay 600/week, 2 weeks) and B (400/week, 1 week). Which first, by CD3?", choices: ["A, because it is worth more", "B, because 400/1 = 400 is more than 600/2 = 300", "Either; they tie", "Whichever is easier"], answer: 1, why: "B first costs 400 × 1 + 600 × 3 = 2200; A first costs 600 × 2 + 400 × 3 = 2400." },
        { q: "Why keep Must-haves to about 60% of the estimated effort?", choices: ["It's required by law", "So the lower priorities act as contingency when estimates run low", "Because 60% of features are never used", "To make the document shorter"], answer: 1, why: "If everything is a Must, an underestimate means a Must is missed." },
        { q: "What does a traceability matrix let a team answer?", choices: ["Who wrote each line", "Which requirements have no tests, and which tests check which requirement", "How long each test takes", "Which users are happiest"], answer: 1, why: "It links each requirement id to the tests that cite it." }
      ],
      practice: [
        {
          q: `<p>Rewrite each interview question so that it asks about past behavior and doesn't lead: (a) "Do you think a dashboard of donations would help?" (b) "Is the spreadsheet hard to use?" (c) "How often do volunteers not show up, roughly?"</p>`,
          a: `<p>(a) "Tell me about the last time you needed to know what had been donated. What did you do?" (b) "Can you show me how you updated the spreadsheet after last Saturday? What happened then?" (c) "Think of last month's shifts. Who didn't come, and how did you find out?" The last one is good as a question already, but a specific recent example gives better numbers than a guess at an average, and often reveals how no-shows are discovered, which is its own requirement.</p>`
        },
        {
          q: `<p>Turn this vague requirement into a measurable target with a scale, a meter, a target and a constraint: "The shift schedule must be easy for older volunteers to use."</p>`,
          a: `<p>Scale: percentage of first-time volunteers aged 60 or over who sign up for a shift without help. Meter: a usability test (Lesson 8) with five such volunteers, each given the task "sign up for next Saturday morning" on their own phone, with no help from the facilitator. Target: 5 of 5. Constraint: 4 of 5. One could add a second target, such as a mean SUS score of at least 75 for the same group. Note that "older" became a concrete group to recruit from, and "easy" became a task, an outcome and a number.</p>`
        },
        {
          q: `<p>Four features, with cost of delay per week and weeks to build: W (200, 2), X (900, 3), Y (150, 1), Z (600, 4). Order them by CD3 and compute the total cost of delay. Then compute it for the order "largest cost of delay first".</p>`,
          a: `<p>CD3: W 100, X 300, Y 150, Z 150. Order X, then Y and Z (tied at 150: either order gives the same total, as the exchange argument shows, since <em>c<sub>j</sub>w<sub>i</sub></em> − <em>c<sub>i</sub>w<sub>j</sub></em> = 0), then W. X finishes at 3 (900 × 3 = 2700), Y at 4 (150 × 4 = 600), Z at 8 (600 × 8 = 4800), W at 10 (200 × 10 = 2000). Total 10,100. Largest first, X, Z, W, Y: X at 3 (2700), Z at 7 (4200), W at 9 (1800), Y at 10 (1500), total 10,200. Here the difference is small, because the most valuable feature is also among the best per week; when a valuable feature is slow, CD3 matters much more.</p>`
        },
        {
          q: `<p><b>Project.</b> Plan your first round of discovery: list the user roles, who you will interview and observe in each, five open questions for the first interview, and which artifacts you will ask to see. Then, after the interviews, write three stories with acceptance criteria and two non-functional targets in the table form of the notes.</p>`,
          a: `<p>A strong plan covers every role, including indirect stakeholders (whose data will be stored, who will maintain the system after you leave), with at least two people per role and at least one observation session. The questions are about specific recent events ("tell me about the last time…"), none leads, and none describes your solution. The stories cite the evidence behind them (a quote, an observed time, an artifact), meet INVEST, and include an unhappy-path criterion each. The targets have all four parts, with numbers that came from observation rather than from the team's imagination.</p>`
        }
      ],
      sources: ["invest03", "dsdm", "designdocs", "agilemanifesto", "swebook"]
    },
    {
      id: "pj3",
      title: "Planning and estimating",
      minutes: 90,
      summary: "Breaking a project into tasks small enough to estimate; why estimates come out low; three-point (PERT) estimates and the probability of meeting a deadline; dependency graphs, the forward and backward passes and the critical path; milestones and buffers; and tracking progress with burndown charts and a least-squares forecast.",
      notes: `
<p>CS 240 Lesson 1 estimated in story points and forecast from velocity, which works once a team has a few sprints of history. At the start of a capstone you have none, the work includes much that isn't code, and some tasks can't start until others finish. This lesson adds the tools for that situation: breaking the work down, estimating with ranges, finding the tasks that set the finish date, and watching progress against the plan.</p>

<h3>Breaking the work down</h3>
<p>A <strong>work breakdown structure</strong> (WBS) divides the project into deliverables, and each deliverable into tasks, until every task is small enough to estimate with some confidence: about one to three days of one person's work. Two rules help:</p>
<ul>
<li><strong>The 100% rule:</strong> the pieces at each level add up to all of the work of their parent, no more and no less. That includes the work people forget: writing the requirements document, preparing a demo, setting up hosting and CI, client meetings, fixing what the design review finds, and testing.</li>
<li><strong>Deliverables, not activities:</strong> name each task by what exists when it's done ("household search returns fuzzy matches, with tests") rather than what someone does ("work on search"). A task phrased as an activity can't be finished, only stopped.</li>
</ul>

<h3>Why estimates come out low</h3>
<p>In a classic 1994 study, Roger Buehler, Dale Griffin and Michael Ross asked psychology students when they would finish their honours theses. The average prediction was 33.9 days. The students' "if everything goes as poorly as it possibly could" estimate averaged 48.6 days. The theses actually took an average of 55.5 days: longer, on average, than the worst case. Only about 30% finished by their own predicted date. Daniel Kahneman and Amos Tversky had named this the <strong>planning fallacy</strong> in 1979: people plan from a best-case story of how the work will go, and neglect how long similar work took before.</p>
<p>Several things push software estimates the same way:</p>
<ul>
<li><strong>Forgotten work.</strong> The estimate covers writing the code, not reviewing, testing, deploying and fixing it.</li>
<li><strong>Skewed outcomes.</strong> A three-day task can't take less than zero days, but it can take ten. When something goes wrong, the delay is large; when things go well, the saving is small. So the average outcome is later than the most likely one.</li>
<li><strong>Anchoring and pressure.</strong> The first number spoken, or the date someone hopes for, pulls everyone's estimate toward it (CS 240's planning poker exists for this).</li>
</ul>
<p>The most effective correction is to look outside your own story: how long did comparable tasks take before? Kahneman and Tversky called this taking the <em>outside view</em>; planners call it <strong>reference class forecasting</strong>. Your CS 240 project's history is a reference class: if your tasks there took 1.6 times their estimates on average, multiply. Keep a record of estimates and actual times this term, so that next term's plan has data.</p>

<h3>Three-point estimates</h3>
<p>A single number hides the uncertainty. A <strong>three-point estimate</strong> gives three: <em>a</em>, optimistic (things go well); <em>m</em>, most likely; and <em>b</em>, pessimistic (real trouble, though not catastrophe). PERT, a planning method from 1958 (see the sidebar), turns them into a mean and a standard deviation:</p>
<p class="math">mean = (<em>a</em> + 4<em>m</em> + <em>b</em>)/6,     sd = (<em>b</em> − <em>a</em>)/6</p>
<p>These are rules of thumb, not theorems. The mean weights the most likely value four times as heavily as each extreme, and because <em>b</em> is usually much further from <em>m</em> than <em>a</em> is, it lands later than <em>m</em>, as skewed outcomes require. The standard deviation treats the range from <em>a</em> to <em>b</em> as about six standard deviations wide, the width that contains nearly all of a normal distribution (MATH 230 Lesson 3).</p>
<p>For tasks done one after another, the total's mean is the sum of the means, and if the tasks are independent, its variance is the sum of the variances (MATH 230 Lesson 4). By the central limit theorem (MATH 230 Lesson 5), a sum of several tasks is roughly normal, so the probability of finishing by a deadline <em>D</em> is Φ((<em>D</em> − mean)/sd).</p>
<pre><code>import math

def pert(a, m, b):
    return (a + 4 * m + b) / 6, (b - a) / 6

def phi(z):                                    # standard normal CDF (MATH 230 Lesson 3)
    return (1 + math.erf(z / math.sqrt(2))) / 2

tasks = [(2, 3, 6), (1, 2, 3), (3, 5, 13), (1, 1, 2)]   # days: schema, API, search, deploy
mean = sum(pert(*t)[0] for t in tasks)
sd = math.sqrt(sum(pert(*t)[1] ** 2 for t in tasks))
print(round(mean, 2), round(sd, 2))            # 12.5 1.83
for deadline in (11, 12, 14, 16):
    print(deadline, round(phi((deadline - mean) / sd), 2))</code></pre>
<pre data-label="Output"><code>11 0.21
12 0.39
14 0.79
16 0.97</code></pre>
<p>The most likely values add up to 3 + 2 + 5 + 1 = 11 days, the number a team would naturally promise. It has about a 21% chance of being met. Promising 14 days gives about 79%. This is the honest answer to "when will it be done?": a date with a probability, not a date alone.</p>
<p>Two caveats make even this optimistic. The tasks aren't really independent: if the team underestimated one, it probably underestimated the others, and positive correlation makes the variance of the sum larger than the sum of the variances. And when several paths of tasks must all finish (next section), the project ends when the slowest does, which is later than the longest path's mean suggests.</p>

<h3>Dependencies and the critical path</h3>
<p>Some tasks must wait for others: you can't design before you know the requirements, or build the walking skeleton (Lesson 6) before the design. Draw the tasks as vertices of a directed graph with an edge from each task to the tasks that depend on it. It must have no cycles, so it has a topological order (CS 201 Lesson 7). Here are six early tasks of the pantry project, with durations in days:</p>
<figure class="fig"><svg viewBox="0 0 560 190" width="560" role="img" aria-label="A task graph. Interview, 3 days, leads to requirements, 2 days, which leads to design, 3 days, and to test plan, 2 days. Spike, 4 days, also leads to design. Design leads to skeleton, 5 days. Interview, requirements, design and skeleton are highlighted as the critical path.">
<defs><marker id="arr-cp490" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
<g class="soft"><rect x="10" y="40" width="110" height="40" rx="4"/><rect x="155" y="40" width="110" height="40" rx="4"/><rect x="300" y="90" width="110" height="40" rx="4"/><rect x="440" y="90" width="110" height="40" rx="4"/></g>
<g class="box"><rect x="10" y="140" width="110" height="40" rx="4"/><rect x="300" y="10" width="110" height="40" rx="4"/></g>
<g class="text"><text x="65" y="65" text-anchor="middle">interview 3</text><text x="210" y="65" text-anchor="middle">requirements 2</text><text x="355" y="115" text-anchor="middle">design 3</text><text x="495" y="115" text-anchor="middle">skeleton 5</text><text x="65" y="165" text-anchor="middle">spike 4</text><text x="355" y="35" text-anchor="middle">test plan 2</text></g>
<g class="hl"><line x1="120" y1="60" x2="153" y2="60" marker-end="url(#arr-cp490)"/><line x1="265" y1="70" x2="298" y2="100" marker-end="url(#arr-cp490)"/><line x1="410" y1="110" x2="438" y2="110" marker-end="url(#arr-cp490)"/></g>
<g class="ln"><line x1="265" y1="50" x2="298" y2="35" marker-end="url(#arr-cp490)"/><line x1="120" y1="160" x2="298" y2="122" marker-end="url(#arr-cp490)"/></g>
</svg><figcaption>Six tasks and their dependencies. The shaded tasks, joined by highlighted edges, form the critical path: 3 + 2 + 3 + 5 = 13 days.</figcaption></figure>
<p>Two passes over the graph give each task's schedule:</p>
<ul>
<li><strong>Forward pass</strong>, in topological order: a task's <em>earliest start</em> (ES) is the latest earliest finish of its predecessors (0 if it has none), and its <em>earliest finish</em> is EF = ES + duration. The project's length is the largest EF.</li>
<li><strong>Backward pass</strong>, in reverse order: a task's <em>latest finish</em> (LF) is the smallest latest start of its successors (the project length if it has none), and its <em>latest start</em> is LS = LF − duration.</li>
</ul>
<p>A task's <strong>slack</strong> (or float), LS − ES, is how long it can slip without delaying the project. Tasks with zero slack form the <strong>critical path</strong>: the longest path through the graph, which sets the finish date.</p>
<pre><code>tasks = {                      # name: (days, tasks it depends on), listed in a topological order
    "interview": (3, []), "spike": (4, []), "requirements": (2, ["interview"]),
    "design": (3, ["requirements", "spike"]), "test plan": (2, ["requirements"]),
    "skeleton": (5, ["design"]),
}
es, ef = {}, {}
for t, (d, deps) in tasks.items():                   # forward pass
    es[t] = max((ef[p] for p in deps), default=0)
    ef[t] = es[t] + d
length = max(ef.values())
ls, lf = {}, {}
for t in reversed(list(tasks)):                      # backward pass
    succ = [s for s in tasks if t in tasks[s][1]]
    lf[t] = min((ls[s] for s in succ), default=length)
    ls[t] = lf[t] - tasks[t][0]
print(length)                                        # 13
for t in tasks:
    print(f"{t:13} ES={es[t]:2} LS={ls[t]:2} slack={ls[t] - es[t]}")</code></pre>
<pre data-label="Output"><code>interview     ES= 0 LS= 0 slack=0
spike         ES= 0 LS= 1 slack=1
requirements  ES= 3 LS= 3 slack=0
design        ES= 5 LS= 5 slack=0
test plan     ES= 5 LS=11 slack=6
skeleton      ES= 8 LS= 8 slack=0</code></pre>
<p>(This code relies on the dict being listed in a topological order; the programming problem computes one with Kahn's algorithm.) The schedule says where effort matters. Putting a second person on the test plan gains nothing: it has six days of slack. A day lost on the interviews delays the whole project by a day. But the spike has only one day of slack: if it runs one day over, it becomes critical (its slack drops to 0), and if it runs two days over, the project finishes a day late. Watch near-critical tasks too.</p>

<h3>Milestones and buffers</h3>
<p>A <strong>milestone</strong> is a point in the schedule with a visible, checkable outcome: "the client has agreed the requirements", "the walking skeleton is deployed", "five volunteers have completed a usability test". "Backend 50% done" is not a milestone, because nobody can check it. The course's milestones are fixed: the proposal and team charter in week 3, the requirements document in week 5, the design document and review in week 7, the prototype demo in week 11 and the mid-project report and retrospective in week 14; put your own between them, about every two weeks.</p>
<p>Don't pad every task to make it safe: padded tasks tend to expand to fill their time (Parkinson's law), and the padding is spent whether or not it was needed. Estimate honestly and put one shared <strong>buffer</strong> before each fixed milestone, about a quarter of the path's length. Then track how fast the buffer is being used: a buffer half gone with a third of the work done is an early warning.</p>

<h3>Tracking with burndown charts</h3>
<p>A <strong>burndown chart</strong> plots the work remaining (in points or estimated hours) against time, with an <em>ideal line</em> from the starting total to zero on the deadline. Points above the ideal line are behind. A jump <em>up</em> means scope was added; a flat stretch means nothing finished, often because work is in progress but not done (CS 240's Kanban limit on work in progress addresses this). A <strong>burnup chart</strong> draws two lines, total scope and work completed, so that added scope and slow progress can't hide each other.</p>
<p>To forecast, fit a least-squares line (MATH 230 Lesson 8) to the remaining work and find where it crosses zero. Here a team starts with 40 points and 20 working days before the prototype demo:</p>
<pre><code>from statistics import linear_regression

remaining = [40, 38, 35, 35, 31, 36, 33, 29, 26, 24]    # end of days 0 to 9
fit = linear_regression(range(10), remaining)
print(round(-fit.intercept / fit.slope, 1))            # 25.3
recent = linear_regression(range(5, 10), remaining[5:])
print(round(-recent.intercept / recent.slope, 1))      # 16.5</code></pre>
<figure class="fig"><svg viewBox="0 0 480 200" width="480" role="img" aria-label="A burndown chart of remaining points over days. The actual line falls from 40, jumps up on day 5 when scope is added, then falls to 24 by day 9. A dashed ideal line runs from 40 on day 0 to 0 on day 20. A dashed forecast from the last five days reaches 0 near day 16.5.">
<g class="ax"><line x1="50" y1="170" x2="470" y2="170"/><line x1="50" y1="20" x2="50" y2="170"/></g>
<g class="ln dash"><line x1="50" y1="30" x2="370" y2="170"/></g>
<g class="hl dash"><line x1="130" y1="44.7" x2="314.8" y2="170"/></g>
<g class="cv"><polyline points="50,30 66,37 82,47.5 98,47.5 114,61.5 130,44 146,54.5 162,68.5 178,79 194,86"/></g>
<g class="text"><text x="44" y="34" text-anchor="end" class="m">40</text><text x="44" y="174" text-anchor="end" class="m">0</text><text x="50" y="188" text-anchor="middle" class="m">0</text><text x="210" y="188" text-anchor="middle" class="m">10</text><text x="370" y="188" text-anchor="middle" class="m">20</text><text x="470" y="188" text-anchor="end" class="m">days</text>
<text x="300" y="112" class="m">ideal</text><text x="196" y="132" class="m">forecast</text><text x="134" y="36" class="m">scope added</text></g>
</svg><figcaption>Remaining work (solid), the ideal line (dashed) and the forecast from the last five days (highlighted dashes), which reaches zero near day 16.5.</figcaption></figure>
<p>The two forecasts disagree because on day 5 the client added a story worth 8 points. Fitted to all ten days, the jump looks like slow progress, and the line reaches zero on day 25, five days after the demo. Since the scope change, the team has burned about 3 points a day, and the line through the last five days reaches zero on day 16.5. Neither is "the" answer. Report the forecast with its assumption ("at our pace since the scope change, we finish around day 17, with 3 days of buffer"), and when the forecast slips past the deadline, change the plan early: cut a Could, or move a story to CS 491, while there is still time to choose.</p>
`,
      terms: [
        ["Work breakdown structure", "A hierarchical division of a project into deliverables and tasks small enough to estimate."],
        ["Planning fallacy", "The tendency to underestimate how long one's own tasks will take, even knowing that similar tasks ran late."],
        ["Reference class forecasting", "Estimating from how long comparable past work actually took (the outside view)."],
        ["Three-point estimate", "Optimistic, most likely and pessimistic estimates of one task."],
        ["PERT estimate", "Mean (a + 4m + b)/6 and standard deviation (b − a)/6 from a three-point estimate."],
        ["Critical path", "The longest path through a task dependency graph; its tasks have zero slack and set the finish date."],
        ["Slack (float)", "How long a task can be delayed without delaying the project: latest start minus earliest start."],
        ["Milestone", "A scheduled point with a visible, checkable outcome."],
        ["Buffer", "Time reserved before a milestone to absorb overruns, shared by the tasks before it."],
        ["Burndown chart", "A chart of work remaining over time, usually with an ideal line to the deadline."],
        ["Burnup chart", "A chart showing total scope and completed work as two separate lines."]
      ],
      quiz: [
        { q: "In Buehler, Griffin and Ross's study, how did the actual completion times compare with the students' worst-case estimates?", choices: ["They were shorter", "About the same", "Longer on average than the worst case", "The study didn't measure them"], answer: 2, why: "Worst cases averaged 48.6 days; the theses took 55.5 days on average." },
        { q: "A task has a = 2, m = 4, b = 12 days. What is its PERT mean?", choices: ["4", "5", "6", "6.7"], answer: 1, why: "(2 + 4 × 4 + 12)/6 = 30/6 = 5." },
        { q: "Two independent tasks have standard deviations 3 and 4 days. What is the standard deviation of their total?", choices: ["7", "5", "12", "3.5"], answer: 1, why: "Variances add: 9 + 16 = 25, and √25 = 5." },
        { q: "What does zero slack mean for a task?", choices: ["It is finished", "Any delay in it delays the whole project", "It has no dependencies", "It can be dropped"], answer: 1, why: "Its earliest and latest starts are equal, so it is on the critical path." },
        { q: "Which is a good milestone?", choices: ["Backend half done", "Working hard on search", "The walking skeleton is deployed and the client has opened it", "Week 6"], answer: 2, why: "It has a visible outcome someone can check." },
        { q: "A burndown chart jumps up on day 5. What most likely happened?", choices: ["The team finished a lot of work", "Scope was added", "The chart is broken", "Someone left the team"], answer: 1, why: "Remaining work can only increase when work is added (or re-estimated upward)." }
      ],
      practice: [
        {
          q: `<p>Three tasks are done in sequence, with three-point estimates (in days) of (1, 2, 4), (2, 4, 9) and (1, 1, 1). Compute the PERT mean and standard deviation of the total, and the probability of finishing within 8 days.</p>`,
          a: `<p>Means: (1 + 8 + 4)/6 = 13/6 ≈ 2.17; (2 + 16 + 9)/6 = 27/6 = 4.5; and 1. Total 7.67 days. Standard deviations: 3/6 = 0.5, 7/6 ≈ 1.17 and 0. Variance 0.25 + 1.361 = 1.611, so sd ≈ 1.27. <em>z</em> = (8 − 7.67)/1.27 ≈ 0.26, and Φ(0.26) ≈ 0.60. With three tasks, one of them certain, the normal approximation is rough, but the message stands: the sum of the most likely values, 7 days, is more likely to be missed than met (<em>z</em> = −0.53, Φ ≈ 0.30).</p>`
        },
        {
          q: `<p>Add a task "data import" (4 days, depends on "requirements") to the notes' graph, and make "skeleton" depend on it as well as on "design". Redo the forward and backward passes. What is the new project length and critical path?</p>`,
          a: `<p>Forward: interview 0–3, spike 0–4, requirements 3–5, design 5–8, test plan 5–7, data import 5–9, skeleton starts at max(8, 9) = 9 and ends at 14. Length 14. Backward: skeleton LF 14, LS 9; design LF 9, LS 6; data import LF 9, LS 5; test plan LF 14, LS 12; requirements LF = min(6, 5, 12) = 5, LS 3; spike LF 6, LS 2; interview LF 3, LS 0. Slack: interview 0, requirements 0, data import 0, skeleton 0, design 1, spike 2, test plan 7. The critical path is interview → requirements → data import → skeleton, and design now has a day of slack.</p>`
        },
        {
          q: `<p>A team's remaining points at the end of days 0 to 5 are 30, 30, 30, 27, 22, 18. The demo is on day 10. Fit a line to all six days and to the last three, and say what you would report to the client.</p>`,
          a: `<p>All six (x̄ = 2.5, ȳ = 26.17): Σ(x − x̄)(y − ȳ) = −43.5 and Σ(x − x̄)² = 17.5, so the slope is −2.49 a day, the intercept is 26.17 + 2.49 × 2.5 = 32.38, and the line reaches zero at 32.38/2.49 ≈ day 13.0. Last three (days 3 to 5): slope (18 − 27)/2 = −4.5, x̄ = 4, ȳ = 22.33, intercept 22.33 + 18 = 40.33, zero at about day 9.0. The flat start was probably work in progress that finished on days 3 to 5, so the recent rate is more representative, but three points are very little evidence. Report: "at our current pace we finish about day 9, with one day of margin; we'll know more by day 7, and if we slip we will move story REQ-9 to next term."</p>`
        },
        {
          q: `<p><b>Project.</b> Build a work breakdown for everything between now and your prototype demo, with three-point estimates for each task, the dependencies, and the critical path. Mark your own intermediate milestones and a buffer before the demo.</p>`,
          a: `<p>A strong plan obeys the 100% rule, including the requirements document, the design review and its follow-up, hosting and CI setup, client meetings, usability-test preparation and demo rehearsal. Tasks are named as deliverables of at most about three days. Estimates are ranges whose pessimistic values are genuinely pessimistic (check them against your CS 240 history), the dependency graph has no cycles, and the critical path is identified, with the spikes for the top risks early on it. Milestones are checkable outcomes about every two weeks, and the buffer is shared, not spread across tasks.</p>`
        }
      ],
      sources: ["buehler94", "malcolm59", "kelley59", "openintro"]
    },
    {
      id: "pj4",
      title: "Architecture and design reviews",
      minutes: 90,
      summary: "Architecture as the decisions that are expensive to change; finding the requirements that drive it; common architectural styles and what each costs; choosing boring technology; context diagrams; what a capstone design document contains; architecture decision records; and how to run, take part in and respond to a design review.",
      notes: `
<p>CS 240 Lessons 4 and 5 were about design inside a program: cohesion, coupling, patterns. WRIT 100 Lesson 7 showed how to write a design document. This lesson is about the decisions above the code: how the system is divided into parts, where they run, and how they talk. These decisions are made early, with the least information, and are the most expensive to change, so they deserve the most scrutiny. That is what the design review, the third milestone, is for.</p>

<h3>What architecture is</h3>
<p>Every system has an architecture, whether or not anyone chose it. A useful working definition: the architecture is the set of decisions that would be expensive to change later. The choice between a web app and a phone app, the database, what runs on the user's device versus a server, how the system talks to other systems, and how it is deployed are architectural. The name of a function, or which sorting algorithm it uses, usually isn't.</p>
<p>Architecture is driven far more by quality attributes and constraints than by features. Almost any architecture can implement "check in a household"; few can do it offline on a ten-year-old laptop, keep personal data safe, and be maintained by a volunteer after the team graduates. So start from the <strong>architecturally significant requirements</strong>: the non-functional targets and constraints that rule options out. For the pantry, from Lesson 2's document:</p>
<ul>
<li>NFR-2: the desk keeps working through a three-hour session with no network.</li>
<li>Maria fills shifts from home, and volunteers sign up on their own phones: some parts must be reachable over the internet.</li>
<li>The data includes household addresses and dietary and health notes (Lesson 7).</li>
<li>No budget beyond about $10 a month, and after handover, the maintainer is a volunteer who knows some Python.</li>
</ul>

<h3>Architectural styles and their costs</h3>
<p>A handful of styles cover most capstone projects. Each buys something and costs something.</p>
<table>
<tr><th>Style</th><th>Good for</th><th>Costs</th></tr>
<tr><td>Server-rendered web app (one program and one database on a server; pages built on the server)</td><td>Most capstones. Simple to build, test, deploy and hand over; works on any browser.</td><td>Needs the network for every page; less rich interaction.</td></tr>
<tr><td>Single-page app plus a JSON API (CS 240 Lesson 6)</td><td>Rich, fast interfaces; a public API that others will use; offline features, since code runs in the browser.</td><td>Two programs to build and keep consistent; more JavaScript; harder accessibility and testing.</td></tr>
<tr><td>Native mobile app</td><td>Camera, location, notifications, app-store distribution.</td><td>Two platforms (or a cross-platform toolkit), store reviews, slow updates; your users must install it.</td></tr>
<tr><td>Local desktop program with a local database</td><td>One machine, offline, sensitive data that should never leave it.</td><td>No remote access; backups and updates are manual.</td></tr>
<tr><td>Microservices (many small services communicating over the network)</td><td>Large organizations, where many teams must deploy independently.</td><td>Distributed-systems failures (partial failure, where one service is down while the others run; retries that may repeat an operation; keeping copies of data consistent. CS 410, taken alongside this course, covers them), many deployments. Almost never right for a team of four.</td></tr>
</table>
<p>Most of these can be built on a <strong>managed platform</strong> (a hosted database, a platform that runs your web app from a Git push), which transfers operations work to a provider in exchange for money, lock-in and data stored on someone else's servers.</p>
<p>For the pantry, the team chose a server-rendered web app with a hosted database, plus one small exception: the check-in page saves visits in the browser's own storage when the network is down and sends them when it returns. That exception is where the design review should look hardest, because it introduces two copies of the data that can disagree.</p>

<h3>Choose boring technology</h3>
<p>Dan McKinley's essay "Choose Boring Technology" (2015) argues that every organization can afford only a few new, unfamiliar technologies, about three "innovation tokens", because each brings unknown failure modes and a learning cost that never quite ends. Well-known tools have well-known problems, with answers on the web. For a capstone, spend tokens on what makes your project valuable, not on the plumbing, and count the cost to whoever maintains the system after you: a framework only your team knows becomes the client's problem in May. Write down which tokens you are spending, and why.</p>

<h3>Drawing the system</h3>
<p>Simon Brown's C4 model suggests drawing architecture at a few zoom levels. The top two are the most useful in a design document: a <strong>context diagram</strong>, the system as one box with the people and external systems around it, and a <strong>container diagram</strong>, the separately running parts (web app, database, background job) and how they communicate.</p>
<figure class="fig"><svg viewBox="0 0 560 210" width="560" role="img" aria-label="A context diagram. The pantry system is in the centre. A desk volunteer checks in households through it; Maria schedules shifts and sees reports; volunteers sign up for shifts on their phones. The system sends text messages through an SMS provider and stores nightly backups with a storage service.">
<defs><marker id="arr-c4490" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" class="dot"/></marker></defs>
<g class="soft"><rect x="200" y="80" width="160" height="50" rx="6"/></g>
<g class="box"><rect x="10" y="20" width="130" height="40" rx="20"/><rect x="10" y="150" width="130" height="40" rx="20"/><rect x="215" y="5" width="130" height="40" rx="20"/><rect x="420" y="40" width="130" height="40"/><rect x="420" y="140" width="130" height="40"/></g>
<g class="text"><text x="280" y="102" text-anchor="middle">Pantry system</text><text x="280" y="120" text-anchor="middle" class="m">web app + database</text>
<text x="75" y="45" text-anchor="middle">desk volunteer</text><text x="75" y="175" text-anchor="middle">volunteers</text><text x="280" y="30" text-anchor="middle">Maria</text>
<text x="485" y="65" text-anchor="middle">SMS provider</text><text x="485" y="165" text-anchor="middle">backup storage</text>
<text x="118" y="88" class="m">check-ins</text><text x="118" y="128" class="m">sign-ups</text><text x="372" y="106" class="m">texts</text><text x="394" y="124" class="m">nightly</text></g>
<g class="ln"><line x1="140" y1="45" x2="198" y2="88" marker-end="url(#arr-c4490)"/><line x1="140" y1="165" x2="198" y2="122" marker-end="url(#arr-c4490)"/><line x1="280" y1="45" x2="280" y2="78" marker-end="url(#arr-c4490)"/><line x1="360" y1="95" x2="418" y2="65" marker-end="url(#arr-c4490)"/><line x1="360" y1="118" x2="418" y2="155" marker-end="url(#arr-c4490)"/></g>
</svg><figcaption>A context diagram: people (rounded) and external systems (square) around the system being built. Each arrow crossing the system's edge is also a place to look for threats (Lesson 7).</figcaption></figure>

<h3>The design document</h3>
<p>Use WRIT 100 Lesson 7's outline (context, goals and non-goals, the design, alternatives, cross-cutting concerns, open questions). For a capstone, the design section should cover:</p>
<ul>
<li><strong>Structure:</strong> the context and container diagrams, and the main modules inside each container with their responsibilities and allowed dependencies (for example, interface → services → storage, never the reverse).</li>
<li><strong>Data model:</strong> the tables, keys and constraints (CS 340 Lesson 4), with the reasoning for anything denormalized.</li>
<li><strong>Interfaces:</strong> the API routes or the external services called, with example requests and responses.</li>
<li><strong>Key scenarios</strong> walked through step by step, especially the hard ones: "the network drops halfway through a check-in", "two volunteers record the same household".</li>
<li><strong>How each non-functional target is met</strong>, as a table: target, mechanism, how it will be verified. A target with no mechanism is a wish.</li>
<li><strong>Deployment and operations:</strong> where it runs, how it is deployed, backups, who is told when it breaks.</li>
</ul>
<p>The alternatives section is where reviewers decide whether to trust you (WRIT 100 Lesson 7). For each serious alternative, say what it offered and why it lost, against the drivers listed above.</p>

<h3>Architecture decision records</h3>
<p>A design document describes the design at one moment; the reasons for each choice get lost as it changes. Michael Nygard proposed (2011) recording each significant decision in its own short file, an <strong>architecture decision record</strong> (ADR), kept in the repository, numbered and never deleted. Each has a title, a status, the context (the forces at play), the decision ("We will…"), and its consequences, good and bad.</p>
<pre data-label="docs/adr/0007-queue-offline-checkins.md"><code># 7. Queue check-ins in the browser when offline

Date: 2026-10-14
Status: Accepted

## Context
NFR-2 requires check-in to work for a 3-hour session without network.
The pantry's Wi-Fi drops several times a month (observed 2026-09-27).
ADR 5 puts the database on a hosted server.

## Decision
We will save each check-in in the browser's IndexedDB storage when a
request fails, show "saved offline" to the volunteer, and resend queued
check-ins, oldest first, when the server is reachable again. Each
check-in carries a random id, so a resend is idempotent (CS 240 Lesson 6).

## Consequences
+ The desk keeps working; volunteers see what is pending.
- Household search offline uses a copy of the list downloaded at the
  start of the session, so it misses households registered elsewhere
  that day.
- Two copies of the data can disagree; the server keeps the earliest
  visit when duplicates arrive.</code></pre>
<p>(IndexedDB is a database built into every modern browser that a web page's JavaScript can use.) Status starts as Proposed, becomes Accepted (or Rejected), and later perhaps Deprecated or "Superseded by 12" when a new record reverses it. The old record stays, because knowing what was decided and why is exactly what a newcomer, or next term's team, needs. Keep ADRs short: one page, written in an hour. A decision that took a week to make deserves an hour to record.</p>

<h3>Running a design review</h3>
<p>A design review is a meeting in which people outside the author's team look for problems in a design while it is still cheap to change it. In this course, another team and the instructor review yours, and you review theirs. It works only with preparation:</p>
<ol>
<li><strong>Two days before:</strong> the authors send the document, saying what kind of feedback they want and which decisions are still open.</li>
<li><strong>Before the meeting:</strong> every reviewer reads it and writes comments, each marked <em>blocking</em> (must be resolved before building), <em>major</em>, <em>minor</em> or <em>question</em>.</li>
<li><strong>The meeting</strong> (about 50 minutes): a moderator who isn't an author keeps time; the authors summarize in five minutes (everyone has read it); the meeting goes through the blocking and major comments, largest risk first; a scribe records each issue and what was agreed. The goal is to find problems, not to solve them all in the room.</li>
<li><strong>Outcome:</strong> approved, approved with changes, or revise and review again.</li>
</ol>
<p>As a reviewer, check each goal has a mechanism; ask "what happens when…" for failures (the network drops, the laptop is stolen, two people edit the same record, the SMS provider is down); check that the data model can represent every acceptance criterion's situation; look for a simpler alternative; and ask who will run it after handover. Phrase comments as in code review (CS 240 Lesson 7): about the design, specific, and as questions when unsure.</p>
<p>As an author, listen and ask clarifying questions; don't defend each decision in the room, because a defensive author makes reviewers stop raising issues. Afterwards, answer <em>every</em> comment in writing:</p>
<table>
<tr><th>Comment</th><th>Severity</th><th>Response</th></tr>
<tr><td>Offline check-ins and a server-side check-in for the same household could both be recorded.</td><td>Blocking</td><td>Accepted. The server keeps the earliest visit per household per week and flags the other for Maria (ADR 7, consequences).</td></tr>
<tr><td>Why not a desktop app, which is offline by design?</td><td>Question</td><td>Declined: Maria and the volunteers need remote access. Added to Alternatives considered.</td></tr>
<tr><td>The household table stores age as a number.</td><td>Minor</td><td>Accepted: store birth year, so it doesn't go stale.</td></tr>
</table>
<p>Accepted comments become changes, often new ADRs; declined ones get a reason; deferred ones become open questions with an owner. The response table is part of the graded milestone, because it shows whether the team can take criticism and use it.</p>

<h3>Keeping the architecture true</h3>
<p>An architecture on paper decays as people take shortcuts under deadline pressure: a storage module imports the interface "just this once". Where a rule can be checked mechanically, check it in CI with a test, sometimes called an <em>architectural fitness function</em>. This lesson's programming problem checks layering rules by parsing imports with the <code>ast</code> module (CS 240 Lesson 7). The rest is kept true by review: when a pull request changes an architectural decision, it should come with a new or updated ADR.</p>
`,
      terms: [
        ["Software architecture", "The decisions about a system's structure, deployment and communication that would be expensive to change later."],
        ["Architecturally significant requirement", "A requirement, usually a quality attribute or constraint, that rules architectural options in or out."],
        ["Server-rendered web app", "A web application in which the server builds each page, with one program and one database."],
        ["Microservices", "An architecture of many small services that communicate over a network and are deployed separately."],
        ["Innovation token", "McKinley's metaphor for an organization's limited capacity to adopt unfamiliar technology."],
        ["Context diagram", "A diagram showing a system as one box with the people and external systems that interact with it."],
        ["Architecture decision record (ADR)", "A short, numbered record of one significant decision: its context, the decision, its status and its consequences."],
        ["Superseded", "The status of a decision record reversed by a later one, which it names."],
        ["Design review", "A meeting in which people outside the team examine a design for problems before it is built."],
        ["Fitness function", "An automated check that a system still satisfies an architectural rule, such as allowed dependencies."]
      ],
      quiz: [
        { q: "Which is most clearly an architectural decision?", choices: ["The name of the search function", "Whether check-ins are stored on the server or in the browser when offline", "Using a list comprehension", "The color of the buttons"], answer: 1, why: "It shapes the data flow, failure handling and deployment, and would be expensive to change later." },
        { q: "What usually drives the choice of architecture most?", choices: ["The number of features", "Quality attributes and constraints, such as offline use, privacy, budget and who maintains it", "The team's favorite language", "The client's logo"], answer: 1, why: "Most architectures can implement the features; the quality attributes and constraints rule options out." },
        { q: "Why are microservices almost never right for a capstone team of four?", choices: ["They are illegal", "They add distributed-systems failures and many deployments, a cost justified mainly when many teams must deploy independently", "They can't use databases", "They are too fast"], answer: 1, why: "The benefit is organizational independence, which a single small team doesn't need." },
        { q: "An ADR's decision is reversed. What happens to the record?", choices: ["It is deleted", "It is edited to say the new decision", "It is kept, marked superseded by the new record", "It is moved to the client"], answer: 2, why: "The history of what was decided, and why, stays useful." },
        { q: "During your design review, a reviewer questions a decision you're sure is right. What should you do in the meeting?", choices: ["Explain at length why they are wrong", "Ask a clarifying question, make sure the scribe records it, and answer in writing afterwards", "Ignore it", "Change the design on the spot"], answer: 1, why: "Defending every point makes reviewers stop raising issues; the written response is where you decide." },
        { q: "What is a design that lists a non-functional target with no mechanism for meeting it?", choices: ["Complete", "A wish: the target needs a mechanism and a way to verify it", "Agile", "A non-goal"], answer: 1, why: "The design should say how each target is met and how that will be checked." }
      ],
      practice: [
        {
          q: `<p>A capstone team is building a tool for a university lab to book shared microscopes. Constraints: about 40 users, all on campus; the university provides free hosting for a single web app and a PostgreSQL database; bookings must be visible to everyone instantly; one member wants to use a new language they've been reading about. Recommend an architecture in three sentences, and say how many innovation tokens your recommendation spends.</p>`,
          a: `<p>A server-rendered web app on the university's free hosting, with its PostgreSQL database, written in a language the whole team already knows (Python with a mainstream framework, say). Forty on-campus users and instant visibility suit one server and one database, where every page shows the current bookings; nothing calls for offline storage, a mobile app or separate services. This spends no innovation tokens. The new language would spend one on plumbing rather than on the lab's problem, and would leave the lab with a system nobody there can maintain, so it belongs in a spike or a side project, not the core.</p>`
        },
        {
          q: `<p>Write the team's ninth ADR (number, title, status, context, decision, consequences) for this decision: "We store each household's birth year for its oldest member, not a full date of birth, because the pantry only reports how many seniors it serves."</p>`,
          a: `<pre data-label="Markdown"><code># 9. Store birth year, not date of birth

Status: Accepted

## Context
The pantry's monthly report to its funder counts households with a
member aged 65 or over. Nothing else uses age. Dates of birth are
quasi-identifiers (CS 100 Lesson 4), and Lesson 7's data inventory
minimizes what we hold.

## Decision
We will store only the birth year of the household's oldest member.

## Consequences
+ Less identifying data; a breach reveals less.
+ Ages stay correct over time, unlike a stored age.
- Ages can be off by up to a year; a household whose oldest member
  turns 65 this year may be counted a few months early or late.
- If the funder later asks for exact ages, we will need new consent
  and a migration.</code></pre>`
        },
        {
          q: `<p>You are reviewing another team's design for an app that lets students sell used textbooks to each other, with payment through a third-party service. List five comments you would raise, each with a severity.</p>`,
          a: `<p>Examples of strong comments: (1) Blocking: "What happens if payment succeeds but the app fails before recording the sale? Is there a way to reconcile with the payment provider?" (2) Major: "Sellers' phone numbers are shown publicly; could the app relay messages instead (Lesson 7, minimization)?" (3) Major: "There is no mechanism listed for the 2-second page-load target; how will it be measured?" (4) Question: "Why a separate notification service rather than a background job in the main app?" (5) Minor: "The data model has price as a float; store whole cents (CS 240 Lesson 4's Money class)." Good comments are specific, tied to a goal or a failure scenario, and phrased so the authors can act on them.</p>`
        },
        {
          q: `<p><b>Project.</b> For your project, list the architecturally significant requirements, compare two candidate architectures against them in a table, choose one, and write the ADRs for the two most important decisions.</p>`,
          a: `<p>A strong answer lists drivers that really constrain the choice (offline use, privacy of specific data, hosting budget, who maintains the system after handover, the devices users have), not features. The table compares genuinely different alternatives, not a straw man, and the decision sentence names what the chosen option gives up. The ADRs have factual context with evidence and dates, a decision starting "We will", and consequences that include at least one honest negative.</p>`
        }
      ],
      sources: ["nygard11", "boring15", "c4model", "designdocs"]
    },
    {
      id: "pj5",
      title: "Working as a team",
      minutes: 90,
      summary: "What makes teams effective; roles in a capstone team; communication and meetings that work; a review culture that spreads knowledge, measured by the bus factor; handling conflict and uneven contribution; inclusive practice and glue work; and working with an AI coding assistant responsibly.",
      notes: `
<p>Capstone teams rarely fail for technical reasons. They fail because one person does most of the work and resents it, because a disagreement festers until week 10, because the client hears nothing for a month, or because everyone assumed someone else was handling the deployment. This lesson is about the practices that prevent those failures. They build on CS 240's processes and on the charter from Lesson 1.</p>

<h3>What makes teams effective</h3>
<p>In a two-year study it called Project Aristotle, reported in 2015, Google interviewed hundreds of employees and examined more than 180 of its own teams, looking for what distinguished effective ones. Who was on the team (seniority, skills, personalities) mattered less than how the team worked together. The strongest factor was <strong>psychological safety</strong>: whether members believe they can take risks, such as admitting a mistake, asking a basic question or disagreeing, without being embarrassed or punished. The others were dependability (people do what they say, on time), structure and clarity (roles, plans and goals are clear), meaning and impact. The idea of psychological safety comes from Amy Edmondson's research on hospital and manufacturing teams in the 1990s, which found, surprisingly, that better teams <em>reported</em> more errors: not because they made more, but because they felt safe to talk about them.</p>
<p>For a student team, this translates into concrete habits: say "I don't know how to do this" early, thank people for finding your bugs, and never mock a question. A team where people hide problems finds out about them at the demo.</p>

<h3>Roles</h3>
<p>Everyone in a capstone team designs, codes, tests and writes. On top of that, give each member one coordinating role, recorded in the charter:</p>
<ul>
<li><strong>Client liaison:</strong> the client's main contact; schedules meetings, sends agendas and notes, and protects the client's time.</li>
<li><strong>Process lead:</strong> runs planning and retrospectives, keeps the board and burndown current (Lesson 3), and notices when work stalls.</li>
<li><strong>Technical lead:</strong> keeps the architecture coherent, owns the ADRs (Lesson 4), and makes the call when a technical disagreement times out.</li>
<li><strong>Quality lead:</strong> owns the test strategy, CI and the definition of done (Lesson 6), and the accessibility and security checks (Lesson 7).</li>
</ul>
<p>Rotate the roles once, at the start of CS 491, so that everyone learns two and no one becomes indispensable. A role is a responsibility to make sure something happens, not a license to do it alone.</p>

<h3>Communication</h3>
<p>With <em>n</em> members there are <em>n</em>(<em>n</em> − 1)/2 pairs (CS 240 Lesson 1): 10 for a team of five. Information that travels pair by pair, in private messages, is lost. Make it public and written:</p>
<ul>
<li><strong>One channel per purpose:</strong> the issue tracker for work, the team chat for quick questions, the repository for decisions (ADRs) and documents, email for the client. Agree which is which.</li>
<li><strong>Write decisions down where people will look for them.</strong> "We agreed on Tuesday" means three different things to three people by Friday.</li>
<li><strong>Agree on response times</strong> (in the charter), and on how to signal urgency, so that people can turn notifications off in the evening.</li>
<li><strong>Prefer asynchronous updates</strong> for status, so that meetings are for discussion. A short written update ("done, next, blocked") each day, or every other day, replaces most status meetings.</li>
</ul>

<h3>Meetings that work</h3>
<p>Every meeting needs a purpose, an agenda sent in advance, a time limit, someone keeping notes, and a list of actions, each with one owner and a date. A capstone needs only four kinds:</p>
<table>
<tr><th>Meeting</th><th>How often</th><th>Purpose</th></tr>
<tr><td>Stand-up</td><td>2–3 times a week, 15 minutes (or written)</td><td>Who is blocked, and who can help. Not a status report to a manager.</td></tr>
<tr><td>Planning</td><td>Every two weeks</td><td>Choose the next iteration's stories (Lesson 2's order), break them into tasks, check the risk register.</td></tr>
<tr><td>Client meeting</td><td>Every two weeks</td><td>Show working software, ask questions that need the client, agree priorities. Send the agenda two days ahead and the notes the same day.</td></tr>
<tr><td>Retrospective</td><td>Every two to four weeks</td><td>Improve how the team works (Lesson 8).</td></tr>
</table>
<p>A meeting without an agenda becomes a conversation; a meeting without notes and owners might as well not have happened. Ending five minutes early, by reading back the actions, is a good habit.</p>

<h3>A review culture that spreads knowledge</h3>
<p>CS 240 Lesson 7 covered how to review and be reviewed. In a capstone, agree on the rules in the charter: every change goes through a pull request reviewed by at least one other member; reviews happen within one working day; changes stay small (a few hundred lines at most), because large ones are skimmed. Review has a second purpose besides catching bugs: after a review, two people understand the change. That matters because of the <strong>bus factor</strong> (or truck factor): the smallest number of people who would have to leave (be "hit by a bus") before the project stalls because nobody left understands enough of it.</p>
<p>A commit log gives a rough estimate. Say a person "knows" a file if they made at least a quarter of its commits. Repeatedly remove the person who knows the most files, until more than half of the files have nobody left who knows them; the number removed estimates the bus factor. In 2016, Guilherme Avelino and colleagues applied a refined version of this greedy algorithm to 133 popular open-source projects on GitHub and found that 65% had a truck factor of at most 2. A capstone team that lets each member own one part of the code alone has a bus factor of 1, and a member's illness in week 10 can stop the project. Rotating reviewers, so that everyone reviews everyone else's code, and pairing on the hardest parts raise it.</p>

<h3>Conflict and uneven contribution</h3>
<p>Disagreement about ideas is healthy; conflict between people is not, and the first often turns into the second when it isn't handled. Common sources are mismatched goals (Lesson 1), unequal workload, missed commitments, and communication styles (one member's directness feels like rudeness to another).</p>
<ul>
<li><strong>Technical disagreements:</strong> agree on the criteria first (which requirement does this serve?), timebox the discussion, run a spike if facts are missing, then decide by the charter's rule, record an ADR, and commit to the decision, including the people who disagreed. "Disagree and commit" works only if the decision really is revisited when new evidence appears.</li>
<li><strong>Missed commitments and uneven contribution:</strong> raise it early, privately and specifically. Describe behavior and its effect, not character: "the last three pull requests were merged without tests, and CI failed twice on Saturday" rather than "you're careless". Ask what's going on: the cause is often something the team can help with (an illness, a job, not knowing how to start). Then follow the charter's steps, ending with the instructor, with evidence from the issue tracker and history.</li>
<li><strong>The opposite problem:</strong> a member who does too much, working through the night and rewriting others' code, also harms the team. It hides how much work there really is, leaves others unable to contribute, and lowers the bus factor.</li>
</ul>
<p>Each member writes peer evaluations of their teammates (together with individual reflections, 10% of the grade), and they are one of the sources used to adjust each member's share of a team grade, by at most a letter grade. They are confidential and should be specific, with examples. They are not a substitute for talking to each other in week 4.</p>

<h3>Inclusive practice</h3>
<p>Teams do better work when every member can contribute fully. Some practices that help:</p>
<ul>
<li><strong>Share the glue work fairly.</strong> Tanya Reilly's talk "Being Glue" (2019) named the essential, less visible work that keeps a team going: taking notes, scheduling, onboarding, reviewing, updating the documentation, noticing who is stuck. It is often left to whoever volunteers, and she points out that women are more often asked to do it, which can cost them technical growth and credit. Assign it deliberately and rotate it, and count it as contribution.</li>
<li><strong>Run meetings so everyone speaks:</strong> go around the table for opinions on decisions, and let people write down their ideas before discussion so the fastest talker doesn't anchor everyone.</li>
<li><strong>Explain jargon</strong> and don't treat not knowing a tool as a failing; everyone arrived with different experience.</li>
<li><strong>Respect constraints:</strong> meeting times that work for members who commute, work or care for family; accommodations that members choose to share; holidays and observances.</li>
</ul>

<h3>Working with an AI coding assistant</h3>
<p>The course allows AI assistants, as most employers do. Used well, they speed up the parts of programming where the risk is low and checking is easy: boilerplate, unfamiliar library calls, a first draft of tests, explanations of an error message. Used badly, they produce code that looks right and isn't: calls to functions that don't exist, outdated library versions, missing edge cases, and insecure patterns (see the sidebar). Some rules that follow from the rest of this course:</p>
<ul>
<li><strong>You own every line.</strong> Review generated code as you would a stranger's pull request (CS 240 Lesson 7), and don't merge what you can't explain. The course policy requires that you can.</li>
<li><strong>Test first, or at least test.</strong> Acceptance criteria and tests written before asking for code tell you whether the code is right; a plausible explanation from the assistant doesn't.</li>
<li><strong>Protect data and secrets.</strong> Never paste the client's personal data, API keys or confidential documents into a tool that sends them to a third party. Use synthetic examples (Lesson 7).</li>
<li><strong>Say how you used it</strong>, in pull requests and documents, as the course and many companies require. A reviewer reads generated code differently, and should.</li>
<li><strong>Keep the learning.</strong> The capstone is the last course in which someone is paid to help you learn. If the assistant writes the parts you need to understand (the data model, the authorization checks, the hardest algorithm), you will not be able to defend them in review or maintain them in CS 491.</li>
</ul>
<p>Don't assume it saves time; measure it. In a 2025 randomized trial by the research group METR, 16 experienced open-source developers worked on 246 real tasks in their own projects, each task randomly assigned to allow or forbid AI tools. With AI allowed, tasks took 19% longer on average, although the developers had predicted a 24% speed-up and, afterwards, believed they had been sped up by about 20%. The authors caution that this is one setting (experienced developers in large, familiar code bases, with early-2025 tools) and that results elsewhere may differ. The lesson for a team is the same as for estimation (Lesson 3): compare your impression with your data.</p>
`,
      terms: [
        ["Psychological safety", "A team's shared belief that members can take interpersonal risks, such as admitting mistakes or disagreeing, without being punished."],
        ["Client liaison", "The team member responsible for communication and meetings with the client."],
        ["Stand-up", "A short, frequent team meeting about who is blocked and who can help."],
        ["Action item", "A task agreed in a meeting, with one owner and a date."],
        ["Bus factor (truck factor)", "The smallest number of people whose loss would stall a project because nobody left understands enough of it."],
        ["Disagree and commit", "Supporting a team decision fully after arguing against it, while staying open to revisiting it on new evidence."],
        ["Glue work", "Essential but less visible work that keeps a team effective, such as note-taking, reviewing, onboarding and coordination."],
        ["Peer evaluation", "Confidential, specific assessment by team members of each other's contributions."],
        ["AI coding assistant", "A tool, usually built on a language model, that generates, explains or edits code from natural-language requests."]
      ],
      quiz: [
        { q: "What did Google's Project Aristotle find mattered most for team effectiveness?", choices: ["Having the most senior engineers", "Psychological safety: members can admit mistakes and disagree without being punished", "Team size", "Working in the same office"], answer: 1, why: "How the team works together mattered more than who was on it, and psychological safety most of all." },
        { q: "A team of five communicates mainly by private messages between pairs. How many pairs are there?", choices: ["5", "10", "20", "25"], answer: 1, why: "5 × 4 / 2 = 10 pairs, which is why information should be public and written." },
        { q: "Each member of a team owns one part of the code, and nobody else reviews or changes it. What is the team's bus factor likely to be?", choices: ["1", "2", "The team size", "0"], answer: 0, why: "Losing the one person who knows a part stalls that part; rotating reviews raises it." },
        { q: "Which is the best way to raise a teammate's missed commitments?", choices: ["Post about it in the team chat", "Privately and specifically: describe the behavior and its effect, and ask what is going on", "Wait for the peer evaluation", "Redo their work without saying anything"], answer: 1, why: "Specific, private and early gives the person a chance to explain and fix it; the charter's later steps remain if not." },
        { q: "Which use of an AI assistant breaks the course's rules?", choices: ["Asking it to explain an error message", "Pasting the client's real household records into it to generate test data", "Using it to draft tests, then reviewing them", "Noting its use in a pull request"], answer: 1, why: "Personal data and confidential material must never go to a third-party tool; use synthetic data." },
        { q: "In METR's 2025 trial, how did experienced developers' beliefs about AI tools compare with the measurements?", choices: ["They believed they were slowed down, and were", "They believed they were about 20% faster, but tasks took 19% longer on average", "Beliefs and measurements matched", "The trial measured only beliefs"], answer: 1, why: "Impressions of speed-up were the opposite of the measured effect in that setting." }
      ],
      practice: [
        {
          q: `<p>Write an agenda for a 30-minute client meeting in week 8, with time for each item, and the notes template you would send afterwards.</p>`,
          a: `<p>Agenda (sent two days before): 1. Demo of the household search on staging (8 min). 2. Questions from the team: may the system show a household's last visit date to all volunteers? what counts as a "senior" for the report? (8 min). 3. Priorities for the next two weeks: shift reminders versus the stock report (8 min). 4. Next meeting date, and actions read back (6 min). Notes (sent the same day): attendees; decisions, each in one sentence ("Last visit date visible to desk volunteers only"); answers to questions; actions with owner and date ("Maria: send the funder's report template by Oct 22"; "Ben: deploy reminders to staging by Oct 25"); open questions. The client should be able to read the notes in two minutes and correct any mistake.</p>`
        },
        {
          q: `<p>Estimate the bus factor of this log by the notes' greedy method (a person knows a file if they made at least a quarter of its commits): Ana made all 6 commits to <code>db.py</code> and 3 of 4 to <code>api.py</code>; Ben made 1 of 4 to <code>api.py</code> and all 5 to <code>ui.py</code>; Chloe made all 2 to <code>tests.py</code>. Then suggest a change in practice.</p>`,
          a: `<p>Knowers: db.py {Ana}, api.py {Ana, Ben} (Ben has exactly 1/4), ui.py {Ben}, tests.py {Chloe}. Ana knows 2 files, Ben 2, Chloe 1. Remove Ana (tie with Ben, broken alphabetically): db.py is orphaned, 1 of 4, not more than half. Remove Ben (2 files): api.py and ui.py are orphaned too, 3 of 4. So the estimate is 2. But the structure is fragile: every file except api.py has a single knower. Rotate reviews so Ana reviews Ben's UI changes and Ben reviews database changes, and have someone other than Chloe write the next tests.</p>`
        },
        {
          q: `<p>Two members disagree about whether to use a front-end framework or plain server-rendered pages. Describe, step by step, how the team should reach a decision, and what the ADR would contain.</p>`,
          a: `<p>First, agree on criteria from the requirements: the offline check-in (NFR-2) needs some code in the browser; accessibility (NFR-4) and the maintainer's skills argue for less JavaScript. Timebox the discussion (say 30 minutes at the next planning meeting). If a fact is missing, such as whether the offline queue can be written in plain JavaScript in a day, run a half-day spike. Decide by the charter's rule (consensus, falling back to the technical lead's call), and record an ADR: context (the criteria, the spike's result), decision ("We will render pages on the server and write the offline queue in plain JavaScript"), consequences (what is given up: richer interactions; what would make us revisit: a requirement for live updates). Then both members commit to it.</p>`
        },
        {
          q: `<p><b>Project.</b> Write your team's working agreement for AI assistants: what they may and may not be used for, what must be disclosed and how, how generated code is reviewed, and which data may never be shared with them.</p>`,
          a: `<p>A strong agreement is concrete: "allowed for boilerplate, test drafts and explaining errors; not for the authorization checks or the data model without a second reviewer"; "every pull request description has a line 'AI use: none / drafted X / suggested Y'"; "generated code is reviewed line by line by someone other than the person who prompted it, and must come with tests"; "never paste real household data, credentials, or the client's documents; use the synthetic data set in tests/fixtures". It also says how the team will check whether the tools actually help (for example, comparing estimates and actual times).</p>`
        }
      ],
      sources: ["aristotle", "avelino16", "glue19", "metr25", "engprac"]
    },
    {
      id: "pj6",
      title: "Building the prototype",
      minutes: 90,
      summary: "Throwaway and evolutionary prototypes; starting with a walking skeleton; growing it in vertical slices; trunk-based development with feature flags and percentage rollouts; a test strategy for a real project; continuous delivery with versioned releases; and treating technical debt as a recorded, deliberate decision.",
      notes: `
<p>The fourth milestone, in week 11, is a working prototype of the core flow, deployed and used by the client. "Working" and "deployed" are the important words. A prototype that runs only on one laptop during the demo tells the client little and gives next term nothing to build on. This lesson is about building in a way that keeps the system working, integrated and deployable every day from the second week on.</p>

<h3>Which prototype are you building?</h3>
<p>There are two kinds, and confusing them causes trouble.</p>
<ul>
<li>A <strong>throwaway prototype</strong> answers a question cheaply and is then discarded: a paper sketch of the check-in screen tried with a volunteer, a clickable mock-up, a spike (Lesson 1). Use these freely in weeks 3 to 6, especially for interface questions: changing a sketch takes minutes.</li>
<li>An <strong>evolutionary prototype</strong> is the first version of the real system, and every later version grows from it. The week-11 prototype is this kind: it needs real structure, tests and deployment.</li>
</ul>
<p>The danger is a throwaway prototype that becomes the product because it "already works": code written to answer a question, with no tests or structure, now carrying real data. Decide which kind you are writing before you start, and say so in the repository.</p>

<h3>Start with a walking skeleton</h3>
<p>Alistair Cockburn called the right first build a <strong>walking skeleton</strong>: a tiny implementation of the system that performs one small function end to end, through every part of the architecture, and is deployed the way the real system will be. For the pantry, in week 7:</p>
<ul>
<li>a page with one form, "record a visit for household number N", that saves a row in the hosted database;</li>
<li>a page listing today's visits;</li>
<li>one automated end-to-end test that submits the form and checks the list;</li>
<li>CI that runs the tests on every pull request and deploys every merge to a staging server the client can open.</li>
</ul>
<p>It does almost nothing useful, but it retires the integration risks (the framework, the database connection, hosting, deployment, secrets) in the first week, when they are cheapest to fix, and every later feature is added to a system that already runs. Teams that build the parts separately and connect them at the end discover in week 10 that the parts don't fit, which is the waterfall failure of CS 240 Lesson 1 in miniature.</p>

<h3>Grow it in vertical slices</h3>
<p>After the skeleton, add one story at a time, each a vertical slice through the interface, logic and storage (CS 240 Lesson 1), in the order from Lesson 2 (cost of delay, with the riskiest early). Each slice ends merged, tested, deployed to staging and demonstrable. At any moment the system does a little less than planned but everything it does works, and if the term ended tomorrow you would have something to show. The alternative, building all the database code, then all the logic, then all the pages, leaves nothing usable until the very end.</p>

<h3>Trunk-based development and feature flags</h3>
<p>CS 240 Lesson 2 described trunk-based development: everyone merges small changes into the main branch (the trunk) at least daily, through short-lived branches, and keeps main always deployable. Its benefit is that integration happens continuously, in small pieces, instead of in a painful merge at the end. In practice that means:</p>
<ul>
<li>branches that live hours or a day or two, not weeks;</li>
<li>pull requests small enough to review in 15 minutes;</li>
<li>CI required to pass before merging, and a broken main fixed (or the change reverted) before anything else;</li>
<li>unfinished features merged but hidden behind feature flags.</li>
</ul>
<p>A <strong>feature flag</strong> (toggle) is a setting checked at run time that switches code on or off without deploying again. Pete Hodgson's widely used classification (2016) distinguishes <em>release</em> flags, which hide unfinished work and should be removed within weeks; <em>experiment</em> flags for A/B tests (MATH 230 Lesson 7); <em>operations</em> flags, such as a kill switch to turn off an expensive feature under load; and <em>permission</em> flags that give some users a feature, sometimes for years.</p>
<p>A flag can also enable a feature for a <strong>percentage</strong> of users, so a risky change reaches a few people first. Each user must get a consistent answer: a volunteer who sees the new check-in screen on Monday should see it on Tuesday. So the decision is derived from a hash of the flag's name and the user's id, not from a random number:</p>
<pre><code>import hashlib

def bucket(flag, user_id):
    digest = hashlib.sha256(f"{flag}:{user_id}".encode("utf-8")).hexdigest()
    return int(digest, 16) % 100          # 0 to 99, the same every time

users = ["u1", "u2", "u3", "u42", "maria", "vol-17"]
print([bucket("new-checkin", u) for u in users])   # [82, 72, 85, 53, 35, 21]
print([u for u in users if bucket("new-checkin", u) &lt; 40])   # ['maria', 'vol-17']</code></pre>
<p>At 40%, a user is in the rollout exactly when their bucket is below 40. Raising the percentage to 60 adds users without removing any, because each user's bucket never changes. Including the flag's name in the hash means different flags select different users, so the same unlucky 10% aren't the test group for everything. (Python's built-in <code>hash</code> wouldn't do: for strings it changes every time the program starts. That is deliberate: an attacker who could predict it could send a server many keys that land in the same slot of a hash table (CS 201 Lesson 3), making every lookup slow.) The SHA-256 digest behaves like a uniformly random number, so about 40% of a large population lands below 40.</p>
<p>A flag's rule is usually a small record such as <code>{"enabled": True, "percent": 40}</code>, checked before anything else: setting <code>enabled</code> to False turns the feature off for everyone at once, whatever the percentage, so every flag can serve as a kill switch. This lesson's programming problem adds lists of allowed and denied users.</p>
<p>Flags have a cost: every flag doubles the number of ways the code can run, and old flags are dead code waiting to be revived by accident (see the sidebar). Give each release flag an owner and a removal date, and remove it as soon as the feature is fully on.</p>

<h3>A test strategy for a real project</h3>
<p>CS 240 Lesson 3 covered kinds of tests and test doubles. A capstone needs a written strategy, in the design document, that says what is tested where:</p>
<table>
<tr><th>Level</th><th>Pantry examples</th><th>Runs</th></tr>
<tr><td>Unit tests of the domain logic</td><td>Fuzzy name matching ranks "dias ros" near "Diaz, Rosa"; a second visit in one week needs confirmation; shift-reminder timing</td><td>Every commit; seconds</td></tr>
<tr><td>Integration tests with a real database</td><td>Queries, constraints and migrations, against a database of the same kind as production, created fresh for each test run</td><td>Every pull request</td></tr>
<tr><td>End-to-end tests through a browser</td><td>A handful: one per core acceptance criterion, such as "check in a returning household" and "check in offline, then sync"</td><td>Every pull request, and after each deployment to staging</td></tr>
<tr><td>Manual exploratory testing</td><td>A one-hour session before each demo, with a written charter ("try to break offline sync")</td><td>Before milestones</td></tr>
</table>
<p>Name each acceptance test with the requirement ids it checks, so Lesson 2's traceability matrix can be generated. Make time and randomness controllable: pass a clock into the code that decides whether two visits fall in the same week, so a test can set it to Sunday at 23:59 (CS 240's dependency injection). Build test data with a script that generates synthetic households (plausible names, made-up addresses), never from a copy of real data (Lesson 7). And keep the suite fast: a suite that takes 20 minutes gets run once a day, and then trunk-based development stops working.</p>

<h3>Continuous delivery</h3>
<p>CS 240 Lesson 7's continuous integration builds and tests every change. <strong>Continuous delivery</strong> goes further: every change that passes is automatically deployed to a staging environment, and releasing it to production is a single, routine step using the same build. For a capstone:</p>
<ul>
<li>keep at least two environments, staging (synthetic data, for the team and the client to try) and, once there is real use, production;</li>
<li>keep configuration (database addresses, feature flags) and secrets out of the code, in environment variables or the platform's secret store (CS 240 Lesson 8);</li>
<li>change the database only through versioned migration scripts, run by the pipeline, and test them on a copy before production;</li>
<li>know how to roll back, and try it once before you need it;</li>
<li>number releases with semantic versioning (CS 240 Lesson 6) and publish release notes. If commit messages follow the Conventional Commits format (<code>feat(checkin): …</code>, <code>fix: …</code>, with <code>!</code> or a <code>BREAKING CHANGE:</code> line for breaking changes), the next version number and the changelog can be generated from them: this lesson's programming problem.</li>
</ul>
<p>Google's DORA research program, which surveys thousands of software teams, measures delivery with a few numbers, among them how often a team deploys, how long a change takes to reach production, what fraction of deployments fail, and how long recovery takes. It has repeatedly found that teams that deploy small changes frequently also have fewer failed deployments, not more, and recover from failures faster. A team that deploys once, the night before the demo, is doing the riskiest thing possible.</p>

<h3>Technical debt as a decision</h3>
<p>CS 240 Lesson 4 introduced technical debt. Martin Fowler's "technical debt quadrant" (2009) separates <em>deliberate</em> from <em>inadvertent</em> debt and <em>prudent</em> from <em>reckless</em>. "We'll ship the prototype with a single shared password for the desk and replace it before real data goes in" is deliberate and prudent: a known cost, taken on for a reason, with a plan. "We don't have time for tests" is deliberate and reckless. "What's layering?" is reckless and inadvertent. And "now we see how the scheduling module should have been designed" is prudent and inadvertent: it happens to every good team as it learns.</p>
<p>A prototype will have debt; the question is whether it is recorded. Make each deliberate shortcut an issue labelled <em>debt</em>, saying what the shortcut is, what it costs while it stays (the interest: "every new report copies the same query"), and the trigger for repaying it ("before real household data is stored"). Reserve part of each iteration, perhaps a fifth, for repaying debt and for refactoring the code you are about to change. Some shortcuts are never acceptable once real people are involved: none in authorization, in handling personal data, or in backups. Those are not debts but risks to other people.</p>
`,
      terms: [
        ["Throwaway prototype", "A quick model built to answer a question and then discarded, such as a paper sketch or a spike."],
        ["Evolutionary prototype", "The first version of the real system, from which later versions grow."],
        ["Walking skeleton", "A tiny implementation that performs one small function end to end through every part of the architecture, built and deployed first."],
        ["Release flag", "A feature flag that hides unfinished work in deployed code and is removed once the feature is on."],
        ["Kill switch", "An operations flag that turns a feature off quickly, without a deployment."],
        ["Percentage rollout", "Enabling a feature for a fixed fraction of users, chosen consistently by hashing each user's id."],
        ["Staging environment", "A copy of the production setup, with test data, where every change is deployed for checking before release."],
        ["Continuous delivery", "Keeping every change that passes CI deployable, deploying it automatically to staging and releasing with one routine step."],
        ["Database migration", "A versioned script that changes a database's schema or data from one version to the next."],
        ["Conventional Commits", "A commit-message format (type(scope): description, with markers for breaking changes) from which versions and changelogs can be generated."],
        ["Technical debt quadrant", "Fowler's classification of debt as deliberate or inadvertent, and prudent or reckless."]
      ],
      quiz: [
        { q: "What is a walking skeleton?", choices: ["A mock-up of the interface", "A tiny end-to-end implementation through every part of the architecture, deployed the real way", "The database schema", "A list of all features"], answer: 1, why: "It retires integration and deployment risk first; features are added to a system that already runs." },
        { q: "Why are percentage rollouts based on a hash of the flag and the user's id rather than a random number?", choices: ["Hashes are faster", "So each user gets the same answer every time, and raising the percentage only adds users", "Random numbers aren't allowed", "So the team can't predict who gets it"], answer: 1, why: "A user's bucket is fixed, so their experience is consistent and rollouts grow monotonically." },
        { q: "With a 30% rollout, a user's bucket for the flag is 30. Do they see the feature?", choices: ["Yes", "No: the condition is bucket < 30", "Only on Tuesdays", "It depends on the time"], answer: 1, why: "Buckets 0 to 29 are the 30% enabled." },
        { q: "Which commits would make the next release a new minor version under Conventional Commits and semver, starting from 2.3.1?", choices: ["fix: a; docs: b", "feat: a; fix: b", "feat!: a", "chore: a"], answer: 1, why: "A feat with no breaking change gives 2.4.0; feat! would give 3.0.0; fix alone gives 2.3.2." },
        { q: "Which technical debt is deliberate and prudent?", choices: ["Skipping tests because there's no time", "A shared desk password in the prototype, recorded as an issue, to be replaced before real data is stored", "Code nobody understands", "Not knowing about layering"], answer: 1, why: "It is a known, recorded cost taken for a reason, with a trigger for repaying it." },
        { q: "What does DORA's research say about deployment frequency and failures?", choices: ["Frequent deployment causes more failures", "Teams that deploy small changes often tend to have fewer failures and recover faster", "There is no relationship", "Teams should deploy once per term"], answer: 1, why: "Small, frequent changes are easier to test, review and roll back." }
      ],
      practice: [
        {
          q: `<p>Describe a walking skeleton for a system that lets lab members book shared microscopes (a web app with a database and email confirmations). What is the one function, which parts must it pass through, and what must exist for it to count as done?</p>`,
          a: `<p>Function: "a signed-in user books one microscope for one hour and sees the booking". It passes through the browser page, the web app's route and logic, the database (one bookings table, created by a migration), and the email service (one confirmation email, even if plain text). Done means: merged to main, an automated end-to-end test that books and then lists, CI running on every pull request, automatic deployment to staging with secrets in the platform's store, and the client able to open the staging URL. Sign-in can be a single test account at first, recorded as debt.</p>`
        },
        {
          q: `<p>A flag for a new reminder feature is at 25%. A volunteer's bucket is 37. (a) Do they get the feature? (b) The team raises the rollout to 50%. Now? (c) A bug is found and the team sets <code>enabled</code> to False. Now? (d) Why should this flag have a removal date?</p>`,
          a: `<p>(a) No: 37 is not below 25. (b) Yes: 37 &lt; 50, and everyone who had it at 25% still has it. (c) No: the kill switch is checked first and turns it off for everyone, without a deployment. (d) It is a release flag: once the feature is fully on, the flag and the old code path are dead weight that every reader must understand and every test must cover, and a dead flag can be turned back on by mistake, which is exactly what happened at Knight Capital (see the sidebar).</p>`
        },
        {
          q: `<p>From version 1.8.3, these commits are merged: <code>fix(search): accent-insensitive matching</code>, <code>docs: add backup guide</code>, <code>feat(shifts): swap a shift with another volunteer</code>, <code>refactor(api): rename routes</code> with the line <code>BREAKING CHANGE: /visits is now /checkins</code>. What is the next version, and what would the changelog contain?</p>`,
          a: `<p>The refactor commit is breaking, so the next version is 2.0.0. Changelog: "## 2.0.0", "### Breaking changes", "- api: /visits is now /checkins", "### Features", "- shifts: swap a shift with another volunteer", "### Fixes", "- search: accent-insensitive matching". The docs commit doesn't appear. A breaking change in a project whose only client is the team's own web page might not seem to need a major version, but anyone else who calls the API, such as a reporting script Maria wrote, would break.</p>`
        },
        {
          q: `<p><b>Project.</b> Write your test strategy (what is tested at each level, how test data is made, how time and randomness are controlled, how long the suite may take) and list every piece of technical debt in your prototype as an issue with its interest and its repayment trigger.</p>`,
          a: `<p>A strong strategy is specific to the project's risks: the hardest logic has unit tests, every core acceptance criterion has an end-to-end test named with its requirement id, the database is tested with the same kind of database as production, and the synthetic data generator is in the repository. The suite has a time limit (say, under five minutes on CI). The debt list is honest, including shortcuts the team would rather not mention, and nothing on it involves authorization, personal data or backups once real data is in use; those are scheduled as Musts.</p>`
        }
      ],
      sources: ["hodgson16", "trunkbased", "conventionalcommits", "fowlerdebt", "dora", "semver"]
    },
    {
      id: "pj7",
      title: "Quality, security and data",
      minutes: 90,
      summary: "The cross-cutting qualities a real system needs from the start: a threat model for your own project and a security baseline; personal data handled by inventory, minimization, consent and retention, with the law in outline; accessibility to WCAG 2.2 AA, including the contrast ratio; and performance budgets measured with percentiles.",
      notes: `
<p>Security, privacy, accessibility and performance are called cross-cutting concerns because they touch every part of a system. They share a pattern: easy to promise, easy to forget, and expensive to add at the end. A system not designed to keep personal data separate can't be made to; a site built from clickable <code>div</code>s (CS 100 Lesson 6) must be rebuilt to work with a keyboard. So the design document has a section for each (Lesson 4), and this lesson is what goes in them.</p>

<h3>A threat model for your project</h3>
<p>CS 380 Lesson 1's four questions apply directly: what are we building and what are its assets; who might attack it and what can they do; what can go wrong; and what will we do about it. Start from the context diagram (Lesson 4), add the data stores and trust boundaries, and walk each flow across a boundary through STRIDE.</p>
<p>For the pantry, the assets are the household records (names, addresses, household sizes, dietary and health notes), the volunteers' phone numbers, Maria's administrator account, and the service itself on Saturday morning. The adversaries are more varied than "a hacker":</p>
<ul>
<li>a stranger on the internet probing the public sign-up pages;</li>
<li>a volunteer, legitimately logged in, who is curious about a neighbor (an insider);</li>
<li>someone who steals the desk laptop, which holds an offline copy of the household list (ADR 7);</li>
<li>a person trying to find someone who has fled them, who may call or visit pretending to be a relative. Food banks and shelters serve people escaping domestic violence, so for some households an address is a safety matter, not just a privacy one;</li>
<li>the service providers themselves (SMS, hosting), who see whatever you send them.</li>
</ul>
<table>
<tr><th>Flow or store</th><th>Threat (STRIDE letter)</th><th>Response</th></tr>
<tr><td>Browser to web app</td><td>Spoofing: a guessed volunteer password (S)</td><td>Use the framework's login with slow password hashing (CS 380 Lesson 3); limit how many attempts an address can make per minute (rate limiting); multi-factor sign-in for Maria's account</td></tr>
<tr><td>Web app</td><td>A volunteer reads households they don't serve (I, E)</td><td>Server-side role checks on every request (complete mediation, CS 380 Lesson 1); desk volunteers see name, card number and last visit only; access to full records is logged</td></tr>
<tr><td>Desk laptop's offline copy</td><td>Theft of the laptop (I)</td><td>Store only names and card numbers offline, never addresses or notes; turn on the operating system's full-disk encryption, so a stolen disk can't be read without the login password; clear the copy at the end of each session</td></tr>
<tr><td>Web app to SMS provider</td><td>The provider learns who uses the pantry (I)</td><td>Send reminders only to volunteers, never to households; message text without personal details</td></tr>
<tr><td>Phone calls asking for a household's address</td><td>Social engineering (S, I)</td><td>A written policy: addresses are never given out; the system doesn't show them to desk volunteers at all</td></tr>
<tr><td>Saturday morning</td><td>The hosting provider is down (D)</td><td>The offline queue (ADR 7); a printed list of the day's shifts as a fallback</td></tr>
</table>
<p>Notice that most responses are design decisions (what is stored, who sees it), not added security code. The cheapest data to protect is data you don't hold.</p>
<p>Alongside the threat model, adopt a <strong>security baseline</strong>, a list every feature must meet, drawn from CS 380: don't write your own authentication or cryptography; check authorization on the server for every request; use parameterized queries (CS 380 Lesson 6) and the template engine's automatic escaping; protect forms against cross-site request forgery; serve everything over HTTPS; keep secrets out of the repository; pin dependencies and run an advisory scanner in CI (CS 380 Lesson 8); take backups and prove they work by restoring one; and keep personal data out of logs (this lesson's programming problem).</p>

<h3>Personal data</h3>
<p><strong>Personal data</strong> is any information about an identifiable person, including combinations of ordinary details that identify someone (CS 100 Lesson 4's quasi-identifiers). Handling it well starts with a <strong>data inventory</strong>: one row per field you store.</p>
<table>
<tr><th>Field</th><th>Purpose</th><th>Who can see it</th><th>Kept for</th><th>Sensitivity</th></tr>
<tr><td>Household name, card number</td><td>Check-in</td><td>Desk volunteers, Maria</td><td>Until 12 months after last visit</td><td>Medium</td></tr>
<tr><td>Address</td><td>Eligibility (service area)</td><td>Maria only</td><td>Checked at registration, then reduced to "in area: yes"</td><td>High</td></tr>
<tr><td>Dietary and health notes</td><td>Allergy-safe food boxes</td><td>Maria, packing volunteers</td><td>While the household is active</td><td>High (health)</td></tr>
<tr><td>Birth year of oldest member</td><td>Funder's report on seniors (ADR 9, written in Lesson 4's Practice 2)</td><td>Reports only, aggregated</td><td>Until 12 months after last visit</td><td>Low</td></tr>
<tr><td>Volunteer phone number</td><td>Shift reminders</td><td>Maria; the SMS provider</td><td>Until the volunteer leaves</td><td>Medium</td></tr>
</table>
<p>Every row must have a purpose. A field with no purpose ("date of birth, in case it's useful") is removed: this is CS 100's "less, locked, limited, gone" applied field by field. Notice the address row: the pantry needs to know a household lives in its service area, not where, so after the check, the system keeps only the answer. Statistics for funders can be computed from <strong>pseudonymized</strong> records, where the card number is replaced by a keyed hash (an HMAC, CS 380 Lesson 3) so that visits can be counted per household without revealing which household.</p>
<p><strong>Consent</strong> is meaningful only if it is informed, specific and freely given. A person who needs food is not free to refuse whatever the form asks, so a pantry should not rely on consent for anything beyond what the service needs: food must never be conditional on agreeing to extra data collection. Tell people, in plain language at registration, what is stored, why, who sees it and for how long.</p>
<p>During development, use <strong>synthetic data</strong>: generated records that look real but describe nobody. Real records belong only in production, under an agreement with the client, and never in test fixtures, screenshots, bug reports or AI tools (Lesson 5).</p>

<h3>The law, in outline</h3>
<p>This is orientation, not legal advice; ask your client and the university when it matters.</p>
<ul>
<li><strong>The EU's GDPR</strong> (CS 100 Lesson 4) applies to organizations handling data about people in the EU, wherever the organization is. Its principles match the inventory above: a lawful basis for each use, purpose limitation, minimization, limited retention and security. People may see, correct and delete their data, and a breach that risks people's rights must be reported to the regulator within 72 hours of discovering it. The UK has an almost identical law.</li>
<li><strong>Canada</strong> has PIPEDA for private-sector commercial activity, and provincial laws for public bodies and for some organizations in some provinces.</li>
<li><strong>The United States</strong> has no single general privacy law, but sector laws: HIPAA for health information held by health plans, health-care providers and their contractors; FERPA for student education records at schools that receive federal funds (relevant to any project for a university office); COPPA for online services directed at children under 13; and a growing number of state laws, such as California's CCPA. A pantry is not usually covered by HIPAA, but health notes deserve the same care.</li>
<li><strong>Research ethics.</strong> If you collect data from people for research (to produce generalizable knowledge, such as a paper), a research ethics board (an IRB, in the United States) must usually approve it first. Usability testing to improve your own product is usually not research, but check with the instructor before you publish results.</li>
</ul>

<h3>Accessibility</h3>
<p>CS 100 Lesson 6 introduced WCAG and its four principles (perceivable, operable, understandable, robust). Make the target concrete: <strong>WCAG 2.2 level AA</strong> for every page, as Lesson 2's NFR-4 did. Some of its success criteria that capstone projects most often fail:</p>
<ul>
<li>everything works with the keyboard alone, and the focused element is always visible;</li>
<li>every form field has a label, and errors are described in text, not only by color;</li>
<li>images have alt text (empty for decoration);</li>
<li>text contrast at least 4.5:1, or 3:1 for large text (at least 18 point, or 14 point bold; the stricter level AAA asks for 7:1, or 4.5:1 for large text); and 3:1 for the parts of controls and graphics needed to understand them;</li>
<li>pointer targets at least 24 by 24 CSS pixels (new in 2.2);</li>
<li>the page still works when text is enlarged to 200%, and on a screen 320 CSS pixels wide without scrolling sideways.</li>
</ul>
<p>The <strong>contrast ratio</strong> is defined from each color's <em>relative luminance</em> <em>L</em>, from 0 for black to 1 for white. Each channel's 8-bit value is divided by 255 and then <em>linearized</em>, because stored color values aren't proportional to the amount of light (a value of 128 gives only about 22% of the light of 255; the elective CS 350 explains this sRGB encoding): a value <em>c</em> becomes <em>c</em>/12.92 if <em>c</em> ≤ 0.04045, and ((<em>c</em> + 0.055)/1.055)<sup>2.4</sup> otherwise. Then <em>L</em> = 0.2126<em>R</em> + 0.7152<em>G</em> + 0.0722<em>B</em>, weighting green most because eyes are most sensitive to it, and</p>
<p class="math">contrast = (<em>L</em><sub>lighter</sub> + 0.05) / (<em>L</em><sub>darker</sub> + 0.05)</p>
<p>which runs from 1 (identical colors) to 21 (black on white).</p>
<pre><code>def channel(v):
    c = v / 255
    return c / 12.92 if c &lt;= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def luminance(hex_color):
    r, g, b = (int(hex_color[i:i + 2], 16) for i in (0, 2, 4))
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)

def contrast(a, b):
    hi, lo = sorted((luminance(a), luminance(b)), reverse=True)
    return (hi + 0.05) / (lo + 0.05)

print(round(luminance("767676"), 4))             # 0.1812
print(round(contrast("767676", "ffffff"), 2))    # 4.54
print(round(contrast("999999", "ffffff"), 2))    # 2.85</code></pre>
<p>The gray #767676 is about the lightest gray that passes AA for normal text on white; the popular placeholder gray #999999 fails even the large-text threshold. Automated checkers find only part of WCAG's failures, because many need judgment (is this alt text meaningful? is this order logical?). Add a manual pass for every core page: unplug the mouse, then use the operating system's screen reader (CS 100 Lesson 6), and, best of all, include disabled users in your usability tests (Lesson 8).</p>

<h3>Performance budgets</h3>
<p>A <strong>performance budget</strong> is a limit, agreed in advance, on a measure of how fast the system feels: page weight, time until the main content appears, server response time. Like a financial budget, it turns "is it fast?" into "are we within budget?", and it is checked continuously: a test in CI fails the build when a page exceeds its budget, so the regression is caught in the pull request that caused it. Google's Core Web Vitals suggest widely used targets for web pages: the largest content element appears within 2.5 seconds, the page responds to an interaction within 200 milliseconds, and the layout barely shifts, each met at the 75th percentile of page loads.</p>
<p>Budgets are stated as <strong>percentiles</strong>, not means, because a mean hides both the typical case and the bad ones. The <em>p</em>th percentile, by the nearest-rank method, is the value at position ⌈<em>p</em> × <em>n</em>/100⌉ of the sorted measurements, counting from 1. Here are 20 response times of the household search, in milliseconds:</p>
<pre><code>import math

ms = [120, 95, 310, 140, 101, 88, 132, 97, 1450, 115, 108, 99, 126, 143, 90, 104, 118, 260, 112, 93]

def percentile(values, p):
    s = sorted(values)
    return s[math.ceil(p * len(s) / 100) - 1]

print(sum(ms) / len(ms))                   # 195.05
print(percentile(ms, 50), percentile(ms, 95))   # 112 310</code></pre>
<p>The mean, 195 ms, describes no actual request: half took 112 ms or less, and it is pulled up by a single 1,450 ms outlier. The 95th percentile, 310 ms, says what a user meets one search in twenty, and against a budget of "p95 ≤ 300 ms" it fails. That is a finding: the slow requests are worth investigating (perhaps the first search after the server wakes up). With only 20 measurements a 95th percentile is fragile, since it is one value from the top; measure more before deciding (MATH 230 Lesson 6's bootstrap can give it an interval). Set budgets from the users' real conditions: the pantry's ten-year-old desk laptop on its slow Wi-Fi, not a developer's new machine on campus.</p>
`,
      terms: [
        ["Cross-cutting concern", "A quality, such as security or accessibility, that affects every part of a system."],
        ["Insider threat", "Harm caused by someone with legitimate access, such as a logged-in user or staff member."],
        ["Security baseline", "A list of security practices every feature of a system must meet."],
        ["Personal data", "Information about an identified or identifiable person."],
        ["Data inventory", "A table of every personal-data field a system stores, with its purpose, access, retention and sensitivity."],
        ["Pseudonymization", "Replacing identifiers with values, such as keyed hashes, that can't be linked back to a person without extra information."],
        ["Synthetic data", "Generated data that looks realistic but describes no real person."],
        ["Retention period", "How long a piece of data is kept before it is deleted or anonymized."],
        ["WCAG 2.2 AA", "The level of the Web Content Accessibility Guidelines that most organizations and many laws require."],
        ["Contrast ratio", "(L1 + 0.05)/(L2 + 0.05) for the relative luminances of the lighter and darker colors; from 1 to 21."],
        ["Performance budget", "An agreed limit on a measure of user-perceived performance, checked continuously."],
        ["Percentile (nearest rank)", "The value at position ceil(p × n / 100) of the sorted measurements."]
      ],
      quiz: [
        { q: "Which response to the threat 'the desk laptop is stolen' is best?", choices: ["A stronger login password", "Storing only names and card numbers offline, encrypting the disk, and clearing the copy after each session", "Telling volunteers to be careful", "Logging every login"], answer: 1, why: "It limits what a thief can get; the cheapest data to protect is data you don't hold." },
        { q: "Why shouldn't a food pantry rely on consent to collect extra data from households?", choices: ["Consent is illegal", "Someone who needs food isn't free to refuse, so the consent isn't freely given", "Households can't read", "Consent forms are expensive"], answer: 1, why: "Meaningful consent must be freely given; food must not depend on agreeing to extra collection." },
        { q: "The pantry needs to know a household lives in its service area. What should it store after checking?", choices: ["The full address", "The address, encrypted", "Only the answer, 'in area: yes'", "The address and a photo of the proof"], answer: 2, why: "Minimization: keep what the purpose needs, which here is the answer, not the address." },
        { q: "A color pair has a contrast ratio of 3.8:1. Which text may use it under WCAG AA?", choices: ["All text", "Only large text (at least 18 point, or 14 point bold)", "No text", "Only links"], answer: 1, why: "Normal text needs 4.5:1; large text needs 3:1." },
        { q: "Ten response times are 80, 85, 90, 90, 95, 100, 100, 110, 120 and 900 ms. What is the 90th percentile by nearest rank?", choices: ["120", "900", "177", "100"], answer: 0, why: "Position ⌈90 × 10/100⌉ = 9 in sorted order, which is 120. (The mean, 177, describes none of them.)" },
        { q: "Why check a performance budget in CI?", choices: ["CI machines are faster", "So the pull request that causes a regression fails, instead of the slowdown being noticed months later", "Budgets can't be checked elsewhere", "To slow down merging"], answer: 1, why: "Catching regressions where they're introduced makes them cheap to fix." }
      ],
      practice: [
        {
          q: `<p>Apply STRIDE to one flow of a campus microscope-booking system: the lab members' browsers sending booking requests to the web app over the internet. Give one threat per letter, or say why it doesn't apply, and a response for each.</p>`,
          a: `<p>S: someone signs in as another lab member with a guessed password; use the university's single sign-on (one login, run by the university's IT service with its own protections, shared by all its systems) rather than passwords of your own. T: a request is altered to book a different microscope or time; HTTPS protects it in transit, and the server validates every field. R: a member denies making a booking that blocked others; log bookings with the authenticated user and time. I: the booking list reveals who works when, which may matter for safety; show other people's bookings as "booked" without names unless the user is staff. D: a script makes thousands of bookings; limit bookings per user and requests per minute. E: a member edits another's booking by changing an id in the URL (broken access control, CS 240 Lesson 8); check ownership on the server for every change.</p>`
        },
        {
          q: `<p>A team's sign-up form asks volunteers for: full name, email, phone number, date of birth, home address, emergency contact, and T-shirt size. For each field, give a purpose or remove it, and state a retention period.</p>`,
          a: `<p>Full name: identify the volunteer on shifts; keep while active plus a short period. Phone number: shift reminders; delete when they leave. Email: only if the pantry sends email; otherwise remove (texts already cover reminders). Date of birth: no purpose stated; if there is a minimum age to volunteer, store "confirmed 16 or over" instead. Home address: no purpose; remove. Emergency contact: plausible for safety during shifts; make it optional, visible to Maria only, deleted when they leave. T-shirt size: harmless and has a purpose if the pantry gives shirts; keep. The general move is the same as the address example in the notes: store the answer to the question you need answered, not the raw data.</p>`
        },
        {
          q: `<p>Compute the contrast ratio of white text (#ffffff) on the green #2e7d32, showing the luminance of the green. Does it pass AA for normal text? AAA?</p>`,
          a: `<p>Channels: 0x2e = 46, 46/255 = 0.1804, linearized ((0.1804 + 0.055)/1.055)<sup>2.4</sup> ≈ 0.0273; 0x7d = 125, 0.4902 → ≈ 0.2051; 0x32 = 50, 0.1961 → ≈ 0.0319. <em>L</em> = 0.2126 × 0.0273 + 0.7152 × 0.2051 + 0.0722 × 0.0319 ≈ 0.0058 + 0.1467 + 0.0023 = 0.1548. Contrast = (1 + 0.05)/(0.1548 + 0.05) = 1.05/0.2048 ≈ 5.13. It passes AA (4.5) but not AAA (7) for normal text, and passes AAA for large text (4.5).</p><pre><code>print(round(contrast("ffffff", "2e7d32"), 2))   # 5.13</code></pre>`
        },
        {
          q: `<p><b>Project.</b> Write your project's threat model (assets, adversaries, a data-flow diagram with trust boundaries, and a STRIDE table of at least six threats with responses), your data inventory, and your accessibility and performance targets with how each will be checked.</p>`,
          a: `<p>A strong threat model names realistic adversaries for this domain, including insiders and people who misuse legitimate features, not only remote attackers; its responses are mostly design decisions with owners, and accepted risks are stated as accepted. The inventory has a purpose for every field, a retention period and who can see it, and some fields are removed or reduced as a result. Accessibility targets name WCAG 2.2 AA and the manual checks; performance budgets are percentiles measured on the users' real devices and networks, with a CI check for at least one.</p>`
        }
      ],
      sources: ["saltzer75", "gdpr", "wcag22", "webvitals", "owaspcs"]
    },
    {
      id: "pj8",
      title: "Demonstrating and reflecting",
      minutes: 90,
      summary: "Closing the term: a demo that shows value to the people who will use the system; usability testing with think-aloud and the System Usability Scale; measuring the prototype against its requirements and reporting honestly; running a retrospective that changes something; and writing the mid-project report and an individual reflection.",
      notes: `
<p>The term ends with three milestones in quick succession: the prototype demo in week 11, the mid-project report in week 14, and your individual reflection. All three ask the same question from different sides: what has the team built, for whom, how well does it work, and what has the team learned about building it? This lesson is about answering with evidence.</p>

<h3>Demos that show value</h3>
<p>A demo is not a tour of the code or a list of features. It shows a user's problem being solved. Build it as a short story:</p>
<ol>
<li><strong>The problem, before</strong> (1 minute): "On a Saturday, 120 households come in; finding a returning family in the binder took up to four minutes, and the queue reached 25 minutes."</li>
<li><strong>The core flow, live</strong> (5 minutes): a volunteer checks in a returning household by a misspelled name; the network drops and check-in carries on; it comes back and the visits sync. Use the staging system with realistic synthetic data, not a developer's laptop.</li>
<li><strong>The evidence</strong> (2 minutes): what you measured against the requirements, including what you missed.</li>
<li><strong>What's next</strong> (1 minute): the plan for CS 491, and the decisions you need from the client.</li>
</ol>
<p>Prepare as for any performance: a written script, two full rehearsals, a known starting state (a script that resets the demo data), a backup recording in case the network fails, and one person driving while another narrates. Show the hard case, not only the happy path: an audience trusts a system it has seen fail gracefully. And invite the users, not only the client. A volunteer's reaction ("can it do that for the shift list too?") is worth more than applause.</p>

<h3>Usability testing</h3>
<p>A usability test watches real users try to do real tasks with your system, to find where it confuses them. It is the single most informative thing a team can do before the end of the term, and it takes an afternoon.</p>
<ul>
<li><strong>Participants:</strong> people like the real users (new volunteers, not your classmates). Get their informed consent, in writing, to being observed and, if you want, recorded; explain that you are testing the system, not them, and that they can stop at any time.</li>
<li><strong>Tasks:</strong> written as goals in the user's world, not as instructions: "A family has just arrived. The mother says her name is Rosa Diaz and she came last month. Check them in." Not "Type the name in the search box and press Enter", which tells them how.</li>
<li><strong>Think-aloud:</strong> ask participants to say what they are looking for and thinking as they work. The facilitator stays neutral and doesn't help ("what would you do if I weren't here?"); a second team member notes what happens, with times.</li>
<li><strong>Measures:</strong> for each task, whether it was completed, how long it took, and the errors and hesitations; afterwards, a questionnaire such as the SUS (below).</li>
<li><strong>Analysis:</strong> list each problem, how many participants hit it, and its severity (prevents the task, causes delay or error, cosmetic). Fix the severe ones first, and then test again.</li>
</ul>
<p>How many participants? Jakob Nielsen and Thomas Landauer modelled problem discovery in 1993: if each participant reveals any given problem with probability <em>L</em>, then <em>n</em> participants reveal a fraction 1 − (1 − <em>L</em>)<sup><em>n</em></sup> of the problems. Across the projects they studied, <em>L</em> averaged about 0.31:</p>
<pre><code>for n in (1, 3, 5, 10, 15):
    print(n, round(1 - (1 - 0.31) ** n, 2))</code></pre>
<pre data-label="Output"><code>1 0.31
3 0.67
5 0.84
10 0.98
15 1.0</code></pre>
<p>So Nielsen recommends small rounds: five participants find most of the problems, and a budget of fifteen is better spent as three rounds of five, fixing problems between rounds, than as one round of fifteen that finds the same problems over and over. The model assumes every problem is equally easy to find, which isn't true (rare problems need more users), and five is too few for measuring things precisely, such as a mean time or a SUS score. But for <em>finding</em> problems, a few users soon is far better than many users late.</p>

<h3>The System Usability Scale</h3>
<p>The <strong>System Usability Scale</strong> (SUS) is a ten-statement questionnaire, each answered from 1 (strongly disagree) to 5 (strongly agree):</p>
<ol>
<li>I think that I would like to use this system frequently.</li>
<li>I found the system unnecessarily complex.</li>
<li>I thought the system was easy to use.</li>
<li>I think that I would need the support of a technical person to be able to use this system.</li>
<li>I found the various functions in this system were well integrated.</li>
<li>I thought there was too much inconsistency in this system.</li>
<li>I would imagine that most people would learn to use this system very quickly.</li>
<li>I found the system very cumbersome to use.</li>
<li>I felt very confident using the system.</li>
<li>I needed to learn a lot of things before I could get going with this system.</li>
</ol>
<p>The odd statements are positive and the even ones negative, so that respondents must read each one. To score, an odd item contributes (response − 1) and an even item (5 − response), so each contributes 0 to 4 with 4 the best; the sum, 0 to 40, is multiplied by 2.5 to give a score from 0 to 100. It is not a percentage. Across about 500 studies collected by Jeff Sauro, the average score was 68, a common benchmark: above 68 is better than average.</p>
<pre><code>def sus(responses):
    total = 0
    for i, r in enumerate(responses, start=1):
        total += (r - 1) if i % 2 == 1 else (5 - r)
    return total * 2.5

print(sus([4, 2, 4, 1, 5, 2, 4, 2, 4, 3]))    # 77.5</code></pre>
<p>Here the odd items give 3 + 3 + 4 + 3 + 3 = 16 and the even items 3 + 4 + 3 + 3 + 2 = 15, so 31 × 2.5 = 77.5. Report the mean over participants together with the number of participants and the range: "mean SUS 72.5 (n = 3, range 50 to 90)" says honestly how little three people can tell you.</p>

<h3>Measuring against the requirements</h3>
<p>The mid-project report must say how the prototype measures up against the requirements document, using the ids from Lesson 2. For functional requirements, the traceability matrix gives each story's status: its acceptance tests pass, fail or don't exist yet. For the non-functional targets, measure each one with the meter the document specified, and compare, using Lesson 7's percentiles:</p>
<pre><code>import math

def percentile(values, p):                # nearest rank, as in Lesson 7
    s = sorted(values)
    return s[math.ceil(p * len(s) / 100) - 1]

checkin_s = [18, 22, 25, 19, 31, 24, 27, 58, 21, 23, 26, 20, 29, 24, 22, 35, 19, 23, 28, 25]
p95 = percentile(checkin_s, 95)
print(p95, p95 &lt;= 30)                     # 35 False
print(max(checkin_s), max(checkin_s) &lt;= 60)   # 58 True</code></pre>
<p>The pantry team timed 20 check-ins with the prototype on a real Saturday. NFR-1's constraint (none over 60 seconds) is met, but its target (95% within 30 seconds) isn't: the 95th percentile is 35 seconds. The report should say exactly that, then explain it: the slow check-ins were all new registrations, which the team now plans to move to a separate desk. A report that rounds this up to "check-in is fast" loses the reader's trust the moment anyone looks at the data; one that reports the miss and its cause earns it.</p>

<h3>Retrospectives</h3>
<p>CS 240 Lesson 1 introduced the retrospective, in which a team examines how it works and decides what to change. The mid-project retrospective is the most important one of the capstone, because there is a whole term left in which to benefit from it. Run it in five steps, in about an hour:</p>
<ol>
<li><strong>Set the stage.</strong> Read Norm Kerth's "prime directive", which begins: "Regardless of what we discover, we understand and truly believe that everyone did the best job they could", given what they knew, their skills, the resources available and the situation. The point is the same as a blameless postmortem's (CS 240 Lesson 8): look for causes in the system, not culprits.</li>
<li><strong>Gather data</strong> before opinions: a timeline of the term's events, and numbers. Estimates against actual times (Lesson 3), how long pull requests waited for review, the bus factor (Lesson 5), the burndown, who did what (from the history), and the charter's commitments.</li>
<li><strong>Generate insights:</strong> what went well, what didn't, and why. A simple format is three columns, start, stop and continue. Ask "why?" more than once, as in an interview (Lesson 2).</li>
<li><strong>Decide what to do:</strong> no more than three actions, each concrete, with an owner and a way to tell whether it worked: "reviews within one working day; the process lead reports the median review wait at each planning meeting". A list of twelve good intentions changes nothing.</li>
<li><strong>Close:</strong> update the charter if needed, and put the actions where the team will see them. At the next retrospective, start by checking them.</li>
</ol>

<h3>The mid-project report</h3>
<p>The report is written for three readers: the client, who wants to know what works and what's next; the instructor; and next term's team, which is you, a month from now, having forgotten the details. Keep it to about eight pages:</p>
<ol>
<li><strong>Summary:</strong> what the prototype does, for whom, and the evidence that it helps.</li>
<li><strong>Status against requirements:</strong> the traceability summary and the measured targets, with misses explained.</li>
<li><strong>Usability findings:</strong> the problems found, their severity, and what was fixed.</li>
<li><strong>Architecture changes</strong> since the design review, citing the ADRs.</li>
<li><strong>Plan and risks for CS 491:</strong> the remaining stories in priority order, a forecast with its assumptions, and the updated risk register, including the technical debt that must be repaid before real use (Lesson 6).</li>
<li><strong>Process:</strong> the retrospective's findings and actions.</li>
</ol>

<h3>The individual reflection</h3>
<p>The reflection is graded individually and is about you: what you contributed, what you learned, and what you will do differently. A useful structure is three questions. <em>What?</em> Describe a specific situation, with evidence: link your pull requests, reviews, documents and the meetings you ran. <em>So what?</em> What did it show you about building software or working with people, and why did it turn out as it did? <em>Now what?</em> What will you do differently in CS 491, specifically enough that someone could check. Write about a real difficulty, including one you caused. "Everything went well and I learned a lot about teamwork" earns little; "I merged three large pull requests in week 9 without review because the demo was close, and one broke offline sync; next term I will split work so no pull request exceeds a day" shows exactly the judgment the capstone is meant to build.</p>
`,
      terms: [
        ["Demo", "A short live presentation of working software that shows a user's problem being solved."],
        ["Usability test", "Watching representative users attempt realistic tasks with a system, to find where it confuses or slows them."],
        ["Think-aloud protocol", "Asking test participants to say what they are thinking as they work."],
        ["Task scenario", "A usability-test task stated as a goal in the user's world, without saying how to do it."],
        ["Severity rating", "A ranking of a usability problem by its effect: prevents the task, causes delay or error, or cosmetic."],
        ["System Usability Scale (SUS)", "A ten-item questionnaire scored from 0 to 100; about 68 is average."],
        ["Prime directive", "Norm Kerth's statement that opens a retrospective: everyone did the best job they could, given what they knew and had."],
        ["Retrospective action", "A concrete change agreed in a retrospective, with an owner and a way to tell if it worked."],
        ["Mid-project report", "The team's account of what works, measured against requirements, and the plan and risks for the next term."],
        ["Reflection", "A written examination of one's own experience: what happened, what it means, and what to do next."]
      ],
      quiz: [
        { q: "What should a capstone demo mostly show?", choices: ["The code and its architecture", "A user's problem being solved, live, including a hard case, with evidence", "Every feature, one after another", "The team's commit statistics"], answer: 1, why: "Value is shown by the user's task getting easier, backed by measurement." },
        { q: "Which is a well-written usability-test task?", choices: ["Click Search, type the name and press Enter", "A family has arrived; the mother says she is Rosa Diaz and came last month. Check them in.", "Test the search feature", "Tell us whether you like the design"], answer: 1, why: "It states a goal in the user's world without telling them how to do it." },
        { q: "By Nielsen and Landauer's model with L = 0.31, about what fraction of problems do five participants find?", choices: ["31%", "About 84%", "100%", "50%"], answer: 1, why: "1 − 0.69⁵ ≈ 0.84." },
        { q: "A participant answers 3 to every SUS item. What is the score?", choices: ["30", "50", "60", "75"], answer: 1, why: "Every item contributes 2, so the sum is 20, and 20 × 2.5 = 50." },
        { q: "The 95th percentile of check-in times is 35 s against a target of 30 s. What should the report say?", choices: ["Check-in is fast", "The target is missed (p95 35 s), with the cause and the plan", "Nothing, since the constraint was met", "Remove the target"], answer: 1, why: "Reporting misses plainly, with their cause, is what makes the rest of the report believable." },
        { q: "Why limit a retrospective to about three actions?", choices: ["Retrospectives are short", "A few concrete actions with owners get done and checked; a long list changes nothing", "It's a Scrum rule", "To save paper"], answer: 1, why: "Actions need owners and follow-up, which a long list never gets." }
      ],
      practice: [
        {
          q: `<p>Score these SUS questionnaires and summarize them as the notes recommend: P1: 5, 1, 5, 2, 4, 1, 5, 1, 4, 2. P2: 3, 3, 3, 2, 3, 3, 4, 3, 2, 4. P3: 4, 2, 4, 1, 5, 2, 4, 2, 4, 3.</p>`,
          a: `<p>P1: odd items 4 + 4 + 3 + 4 + 3 = 18, even items 4 + 3 + 4 + 4 + 3 = 18, total 36 × 2.5 = 90. P2: odd 2 + 2 + 2 + 3 + 1 = 10, even 2 + 3 + 2 + 2 + 1 = 10, total 20 × 2.5 = 50. P3: 77.5, as in the notes. Mean (90 + 50 + 77.5)/3 = 72.5. Summary: "mean SUS 72.5 (n = 3, range 50 to 90)". With three participants and such a range, the honest conclusion is that one participant struggled and the team should find out why (the think-aloud notes will say), not that the system is above average.</p>`
        },
        {
          q: `<p>A team's usability test with five new volunteers found: (a) three could not find the "new household" button, which is in a menu; (b) all five hesitated at the date picker, but completed it; (c) one thought the gray placeholder text was a pre-filled value and didn't type anything; (d) two said the font was "a bit old-fashioned". Rate each by severity and say what to do.</p>`,
          a: `<p>(a) Severe: it prevents a core task for most users. Put a visible "New household" button on the check-in screen, then retest. (b) Moderate (delay, no failure), but universal; replace it with a plain date field that accepts typing, or default to today. (c) Severe for that user (it caused an error) and also an accessibility issue: placeholder text that looks like a value, and probably too little contrast (Lesson 7). Use a visible label and no placeholder. (d) Cosmetic: note it, don't act on it now. Fix (a) and (c) first, then test again with five new participants, as Nielsen recommends.</p>`
        },
        {
          q: `<p>Rewrite these retrospective actions so they would actually change something: (a) "Communicate better." (b) "Write more tests." (c) "Don't leave things to the last minute."</p>`,
          a: `<p>(a) "Every member posts a written done/next/blocked update in the team channel by 10 a.m. on Mondays, Wednesdays and Fridays; the process lead checks on anyone missing at the next stand-up." (b) "No pull request is merged without a test for its acceptance criterion, named with the requirement id; the quality lead reports untested requirements from the traceability tool at each planning meeting." (c) "Every story is broken into tasks of at most two days at planning, and anything not started by the middle of the iteration is raised at stand-up." Each has a specific behavior, an owner and a way to check it at the next retrospective.</p>`
        },
        {
          q: `<p><b>Project.</b> Plan your prototype demo (script, timings, the hard case, the reset procedure and the backup), run a usability test with at least five representative users, and draft the "status against requirements" section of your mid-project report.</p>`,
          a: `<p>A strong demo plan tells the user's story in under ten minutes, uses staging with synthetic data, includes a failure handled gracefully, and has a tested reset script and a recording. The usability test has written consent, goal-style tasks, a neutral facilitator and a note-taker, and its findings are a severity-ranked list. The status section lists every requirement id with its test status, measures each non-functional target with its specified meter, reports misses plainly with causes and plans, and doesn't count untested requirements as done.</p>`
        }
      ],
      sources: ["nielsen00", "sus", "primedirective", "designdocs"]
    }
  ]
});

CSA.addAsides("cs490", {
  pj3: [
    { kind: "history", title: "PERT, Polaris and the critical path", html: `<p>In the late 1950s the U.S. Navy's Special Projects Office was building the Polaris missile, to be launched from submerged submarines, with thousands of contractors and a schedule driven by the Cold War. Its planners, with the consultants Booz Allen Hamilton, developed the Program Evaluation and Review Technique (PERT) in 1958 and published it in 1959: the program as a network of events, three time estimates per activity, and the formulas in this lesson for each activity's mean and spread. At almost the same time, James Kelley of Remington Rand and Morgan Walker of DuPont developed the Critical Path Method (CPM) to schedule maintenance shutdowns of DuPont's chemical plants, using single time estimates and the forward and backward passes, and computing them on a UNIVAC. Polaris was deployed ahead of schedule, and PERT got much of the credit. Historians have been more skeptical: Harvey Sapolsky's study of the program argued that PERT's greatest value was persuading Congress and the Navy that the program was well managed, which won it money and freedom. Both readings carry a lesson for a capstone. The arithmetic is simple; what helps is being forced to list every task and dependency, and showing your stakeholders that you have.</p>`, sources: ["malcolm59", "kelley59"] }
  ],
  pj5: [
    { kind: "ethics", title: "Who is responsible for generated code?", html: `<p>In a 2023 study at Stanford, Neil Perry, Megha Srivastava, Deepak Kumar and Dan Boneh gave 47 participants security-related programming tasks, such as encrypting a string and querying a database with user input, with or without an AI code assistant. Participants with the assistant wrote less secure code in four of the five tasks, with the clearest effects for encryption and SQL injection (CS 380 Lessons 2 and 6), and yet were <em>more</em> likely to believe their code was secure. Those who trusted the assistant less, and reworded their requests rather than accepting the first answer, produced fewer vulnerabilities. The ACM Code of Ethics (CS 100 Lesson 3) asks computing professionals to "strive to achieve high quality in both the processes and products of professional work" (principle 2.1). That duty doesn't pass to a tool. If generated code leaks a pantry household's address, the people harmed won't care which part of the code a model wrote, and neither will the client: the team that shipped it is responsible. That is why the course asks you to disclose AI use, review generated code as carefully as anyone's, and never let it write the security-critical parts unreviewed.</p>`, sources: ["perry23", "acm"] }
  ],
  pj6: [
    { kind: "practice", title: "Knight Capital: a forgotten flag", html: `<p>On 1 August 2012, Knight Capital, then one of the largest traders in U.S. stocks, deployed new software for a New York Stock Exchange program to its eight order-routing servers. According to the Securities and Exchange Commission's later order, a technician didn't copy the new code to one of the eight, and nobody checked. The new code reused a flag that had once switched on an old function called "Power Peg", which hadn't been used for years but had never been removed. On the eighth server, orders carrying the reused flag woke Power Peg up. In the first 45 minutes of trading, Knight's system sent more than 4 million orders into the market while trying to fill 212 customer orders, and the firm lost more than $460 million. Automated emails had warned of the problem before the market opened; nobody acted on them. The SEC fined Knight $12 million, and the firm, unable to survive the loss on its own, was rescued and soon taken over. Count the lessons from this lesson: dead code and a flag left in place (remove release flags), a manual deployment step without verification (automate deployment, and deploy the same way every time), and no quick way to stop (a kill switch, and a rehearsed rollback).</p>`, sources: ["knight13"] }
  ],
  pj8: [
    { kind: "history", title: "A quick and dirty scale", html: `<p>John Brooke created the System Usability Scale in 1986 at Digital Equipment Corporation in the UK, where usability engineers needed a quick, reliable way to compare systems at the end of test sessions. He chose ten statements, alternating positive and negative so that people had to read each one, and published it in 1996 in a chapter titled "SUS: a 'quick and dirty' usability scale". He made it free to use. It became one of the most widely used usability questionnaires in the world, cited in well over a thousand publications, partly because it is short and free and partly because so many published scores now exist to compare against: the benchmark of 68 in this lesson exists only because so many teams used the same ten questions. Brooke later wrote that he had meant it as a quick measure of overall usability, not a diagnostic tool: it tells you whether there is a problem, and the think-aloud notes tell you what it is.</p>`, sources: ["sus"] }
  ]
});
