CSA.addCourse({
  id: "cs240",
  code: "CS 240",
  title: "Software Engineering I",
  credits: 4,
  kind: "required",
  term: "y2s",
  summary: "How teams build software that lasts: working out what to build, sharing code with version control, testing in depth, design principles and refactoring, design patterns, APIs and data formats, continuous integration and code review, and keeping software reliable and secure. A term-long team project puts each lesson into practice.",
  prereqs: ["CS 102 Programming II", "CS 201 Data Structures", "WRIT 100 Writing for Technical Audiences"],
  outcomes: [
    "Turn a vague request into user stories with testable acceptance criteria, and plan work in short iterations",
    "Collaborate through branches, pull requests and merges, and resolve merge conflicts",
    "Design a test suite that mixes unit, integration and property-based tests, using test doubles where they help",
    "Recognize code smells and remove them with small, behavior-preserving refactorings",
    "Choose and implement common design patterns, and know when a plain function is enough",
    "Design a small, consistent API, exchange data as JSON over HTTP, and evolve an interface without breaking its users",
    "Set up continuous integration with tests, linting and type checking, and give and receive useful code reviews",
    "Make software fail safely: handle errors, retry with backoff, log usefully, and defend against common security flaws"
  ],
  rubric: {
    criteriaFor: "the team project and individual assignments",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Individual assignments", weight: 25, desc: "The lessons' programming problems, plus four short written pieces: a requirements document, a test plan, a code review of another student's pull request, and a postmortem." },
      { name: "Team project", weight: 45, desc: "Teams of four build and maintain a web service over the term, in four two-week iterations. Each iteration ends with a demo and a short retrospective. Graded on the product, the repository's history and tests, and each member's contributions, which are visible in the commits and reviews." },
      { name: "Final exam", weight: 20, desc: "Cumulative: reading and critiquing code, designing tests and APIs, and choosing between design options." }
    ],
    criteria: [
      { name: "Correctness", desc: "Does the software do what its requirements say?", levels: [
        "Meets every acceptance criterion, with tests that show it.",
        "Meets most criteria; some edge cases fail or are untested.",
        "Works for the main path only.",
        "Doesn't work." ] },
      { name: "Design", desc: "Can it be changed safely?", levels: [
        "Small, cohesive parts with clear interfaces; new features fit without rewrites.",
        "Mostly well structured, with a few tangled parts.",
        "Works but is hard to change: duplication, long functions, hidden dependencies.",
        "No discernible structure." ] },
      { name: "Testing", desc: "Would the tests catch a mistake?", levels: [
        "Fast, focused tests of behavior, including edge cases and failures; CI runs them on every change.",
        "Good tests of the main behavior, with gaps.",
        "A few tests, mostly of the easy cases.",
        "No meaningful tests." ] },
      { name: "Collaboration", desc: "Does the team work well together?", levels: [
        "Small, well-described pull requests; thoughtful reviews; work shared fairly.",
        "Mostly good practice, with some large or unreviewed changes.",
        "Work done in isolation and merged late; reviews perfunctory.",
        "One person did the work, or the history is unusable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Teams:</b> assigned by the instructor. Each member rates the others' contributions at the end of every iteration; persistent imbalance adjusts individual project grades.",
      "<b>Tools:</b> Git and GitHub, pytest, a linter and type checker, and GitHub Actions for continuous integration, all free.",
      "<b>AI assistants:</b> allowed in the project, as in industry, but every pull request must say how one was used, and the author must be able to explain every line in review.",
      "<b>Late work:</b> iteration deadlines are fixed (the demo happens on the day); individual assignments have four late days in total."
    ]
  },
  units: [
    {
      id: "se1",
      title: "Process and requirements",
      minutes: 90,
      summary: "What makes software engineering different from programming, how teams organize their work (waterfall, iterative and agile processes), and how to find out what to build: stakeholders, user stories, acceptance criteria, non-functional requirements, estimation and prioritization.",
      notes: `
<p>Every course so far has asked you to write a program: one person, a clear specification, a deadline a week away, and then the code is thrown away. Real software is different on every count. It is built by teams, the specification is vague and keeps changing, and the code lives for years, maintained by people who never met its authors. <strong>Software engineering</strong> is the discipline of building software under those conditions. One definition, from engineers at Google, is "programming integrated over time": the questions that matter are not only "does it work?" but "can we keep it working, and keep changing it, for the next ten years?"</p>
<p>This course is about the practices that make that possible. A term-long team project lets you try each one.</p>

<h3>Why software projects fail</h3>
<p>Studies of failed projects keep finding the same causes, and few of them are about code. The commonest are unclear or changing requirements, poor communication, estimates that were wishes, and problems discovered too late to fix cheaply. That last point matters most. A misunderstanding found while discussing a feature costs a conversation. The same misunderstanding found after release can cost weeks of rework, a data migration and angry users. The rough rule is that <strong>the later a defect is found, the more it costs to fix</strong>. The exact ratios are disputed, but the direction is not. Most of software engineering is about finding problems earlier.</p>

<h3>Process: how teams organize the work</h3>
<p>Every project goes through the same activities: working out the requirements, design, implementation, testing, deployment and maintenance. A <strong>process</strong> is a way of ordering them.</p>
<ul>
<li><strong>Waterfall.</strong> Do each activity once, completely, in order: write all the requirements, then the whole design, then all the code, then test. It looks orderly, and it suits projects whose requirements really are fixed and well understood, such as some safety-critical systems. Its weakness is that nobody sees working software until near the end, so misunderstood requirements are discovered at the most expensive moment.</li>
<li><strong>Iterative and incremental.</strong> Build the system in small pieces, each one designed, built and tested in a short cycle, and show each piece to users. Mistakes surface in weeks instead of years.</li>
<li><strong>Agile</strong> is the family of iterative methods that followed the 2001 <em>Agile Manifesto</em>, which valued "individuals and interactions over processes and tools, working software over comprehensive documentation, customer collaboration over contract negotiation, and responding to change over following a plan". The most common agile method, <strong>Scrum</strong>, works in fixed <strong>sprints</strong> of one to four weeks. Each sprint starts by choosing work from a prioritized <strong>backlog</strong> and ends with a demo of working software and a <strong>retrospective</strong>, in which the team asks what to change about how it works. Short daily meetings ("stand-ups") keep everyone aware of what the others are doing and what is blocking them. <strong>Kanban</strong>, another method, drops fixed sprints: work items move across a board (to do, in progress, in review, done), with a limit on how many can be in progress at once.</li>
</ul>
<p>No process guarantees success, and teams that follow rituals without their purpose get the costs without the benefits. What all modern processes share is short feedback loops: build something small, show it, learn, adjust.</p>

<h3>Requirements: finding out what to build</h3>
<p><strong>Stakeholders</strong> are everyone affected by the system: users, customers who pay, operators who run it, support staff, regulators. They rarely agree, and they rarely say exactly what they need. A request like "students should be able to see their grades" leaves open: which students? All their grades or one course's? Before the instructor releases them? On a phone?</p>
<p>Requirements come in two kinds.</p>
<ul>
<li><strong>Functional requirements</strong> say what the system does: "a student can see the grades released for courses they are enrolled in".</li>
<li><strong>Non-functional requirements</strong> (also called quality attributes) say how well it does it: performance ("the page loads in under 1 second for 95% of requests"), availability, security, accessibility (WCAG, as WRIT 100 discussed), privacy and maintainability. They are easy to forget and expensive to add later: a system not designed for 10,000 simultaneous users usually cannot be patched into one.</li>
</ul>
<p>A good requirement is <strong>testable</strong>: you could write a test that passes or fails. "The system should be fast" is not testable; "95% of searches return in under 200 ms with 1 million records" is.</p>

<h3>User stories and acceptance criteria</h3>
<p>Agile teams usually write functional requirements as <strong>user stories</strong>, short descriptions from a user's point of view:</p>
<pre data-label="User story"><code>As a student, I want to see my released grades for each course,
so that I know how I am doing before the final exam.</code></pre>
<p>The three parts name who wants it, what they want, and why. The "why" matters: it lets the team suggest a better way to meet the need. A story is a placeholder for a conversation, not a full specification. The details are pinned down in its <strong>acceptance criteria</strong>, concrete examples that must work before the story counts as done. A common format is <em>Given</em> (the starting situation), <em>When</em> (the action) and <em>Then</em> (the expected result):</p>
<pre data-label="Acceptance criteria"><code>Given I am enrolled in CS 240 and the Lesson 1 quiz grade is released,
When I open my grades page,
Then I see my Lesson 1 quiz score for CS 240.

Given a grade has been entered but not released,
When I open my grades page,
Then that grade is not shown.

Given I am not enrolled in MATH 220,
When I request the MATH 220 grades page,
Then I get a "not found" page, not an error and not anyone's grades.</code></pre>
<p>Each criterion translates almost directly into an automated test, which is the point: the criteria are the definition of "done" that the team and the customer agreed on. The third one is a security requirement hiding in a functional story. Writing criteria for the unhappy paths is where most gaps in a story appear.</p>
<p>A good story is small enough to finish in a few days, and is a <em>vertical slice</em>: it delivers something a user can see, cutting through every layer (interface, logic, storage), rather than "build the database layer", which delivers nothing on its own. Large stories ("epics") are split, for example by kind of user, by the happy path first and the edge cases later, or by one data source before several.</p>

<h3>Estimation</h3>
<p>Planning needs estimates, and software estimates are notoriously poor. Early in a project, when little is known, estimates are commonly off by a factor of two or more in either direction, and they improve as the work is understood. Teams cope in several ways:</p>
<ul>
<li>Estimate <em>relative</em> size instead of hours: <strong>story points</strong> say that one story is about twice as big as another, which people judge better than absolute time.</li>
<li>Estimate as a group. In <em>planning poker</em> each person reveals an estimate at the same time, so nobody anchors on the first number spoken, and a big disagreement means someone knows something the others don't.</li>
<li>Measure instead of guessing: a team's <strong>velocity</strong> is the number of points it actually finishes per sprint, which then forecasts how long the rest of the backlog will take.</li>
</ul>
<pre><code>import math, statistics

velocities = [21, 17, 24, 19, 22]       # points finished in each of the last five sprints
backlog = 130                           # points still to do

avg = statistics.mean(velocities)
print(avg)                              # 20.6
print(math.ceil(backlog / avg))         # 7

slow, fast = min(velocities), max(velocities)
print(math.ceil(backlog / fast), math.ceil(backlog / slow))   # 6 8</code></pre>
<p>Giving a range (6 to 8 sprints) instead of a single number is more honest, and stakeholders can plan around it. The hardest part of estimation is not arithmetic but resisting pressure to turn a desired date into an estimate.</p>

<h3>Prioritization</h3>
<p>There is always more to build than time allows, so the backlog is kept in priority order, usually by a product owner who represents the stakeholders. One simple scheme is <strong>MoSCoW</strong>: Must have, Should have, Could have, Won't have (this time). A useful question is which features deliver the most value for their cost. Another is risk: build the riskiest parts first, because finding out in week 2 that something is impossible is far better than finding out in week 12. The first goal is often a <strong>minimum viable product</strong>: the smallest version that real users can try, so that the team learns what they actually want.</p>
`,
      terms: [
        ["Software engineering", "Building and maintaining software with teams over time; programming integrated over time."],
        ["Waterfall", "A process that does requirements, design, implementation and testing once each, in order."],
        ["Agile", "A family of iterative processes that build software in short cycles and adapt to feedback."],
        ["Scrum", "An agile method that works in fixed sprints, each ending with a demo and a retrospective."],
        ["Sprint", "A fixed period, usually one to four weeks, in which a Scrum team completes a set of backlog items."],
        ["Backlog", "The prioritized list of work still to be done."],
        ["Retrospective", "A meeting at the end of an iteration in which a team reviews how it works and decides what to change."],
        ["Stakeholder", "Anyone affected by a system: users, customers, operators, support staff, regulators."],
        ["Functional requirement", "A statement of what a system does."],
        ["Non-functional requirement", "A statement of how well a system does it: performance, security, availability, accessibility and so on."],
        ["User story", "A requirement written as 'As a ..., I want ..., so that ...'."],
        ["Acceptance criteria", "Concrete, testable conditions a story must meet to count as done, often written Given/When/Then."],
        ["Story points", "A relative measure of the size of a piece of work."],
        ["Velocity", "The number of story points a team finishes per sprint, used to forecast."],
        ["Minimum viable product (MVP)", "The smallest version of a product that real users can try."]
      ],
      quiz: [
        { q: "Why are misunderstood requirements so costly in a waterfall project?", choices: ["Waterfall teams write no requirements", "Nobody sees working software until late, so the misunderstanding is found when it is most expensive to fix", "Waterfall forbids changing code", "They aren't costly"], answer: 1, why: "The later a defect is found, the more it costs, and waterfall delays the first look at working software." },
        { q: "Which of these is a non-functional requirement?", choices: ["A student can drop a course", "Instructors can release grades", "Pages are usable with a screen reader", "A student can see their schedule"], answer: 2, why: "Accessibility is a quality the system must have, not a feature it performs." },
        { q: "Which requirement is testable?", choices: ["The app should be user-friendly", "Search should be fast", "95% of searches return in under 200 ms with 1 million records", "The system should be secure"], answer: 2, why: "Only this one says exactly what to measure and what counts as passing." },
        { q: "A team finished 18, 22 and 20 points in its last three sprints, and 100 points remain. About how many sprints remain?", choices: ["3", "5", "10", "20"], answer: 1, why: "Average velocity 20; 100/20 = 5." },
        { q: "What is the purpose of the 'so that' part of a user story?", choices: ["It's required by Scrum", "It states the need behind the request, so the team can suggest a better way to meet it", "It names the developer", "It sets the deadline"], answer: 1, why: "Knowing why someone wants something lets the team judge what will actually help." },
        { q: "Why does planning poker have everyone reveal estimates at once?", choices: ["To save time", "So nobody anchors on the first number spoken, and disagreements reveal hidden knowledge", "Because estimates are secret", "To pick the largest"], answer: 1, why: "Simultaneous reveals avoid anchoring." }
      ],
      practice: [
        {
          q: `<p>A library asks for "a way for members to reserve books". Write two user stories (for different stakeholders) and three acceptance criteria in Given/When/Then form for one of them, including at least one unhappy path.</p>`,
          a: `<p>One possible answer. Stories: "As a member, I want to reserve a book that is checked out, so that I get it when it is returned." "As a librarian, I want to see the reservations queue for a book, so that I know who to notify when it comes back."</p><p>Criteria for the first: (1) Given a book is checked out and I have no reservation for it, when I reserve it, then I am added to the end of its queue and see my position. (2) Given a book is on the shelf, when I try to reserve it, then I'm told it is available and no reservation is made. (3) Given I already have 5 active reservations (the library's limit), when I try to reserve another, then I'm told the limit and no reservation is made.</p>`
        },
        {
          q: `<p>Rewrite each requirement so it is testable: (a) "The site must handle lots of users." (b) "Uploads should be quick." (c) "The system must be reliable."</p>`,
          a: `<p>Possible versions: (a) "The site serves 2,000 simultaneous users with 95% of page loads under 1 second." (b) "A 10 MB upload on a 10 Mbit/s connection completes in under 15 seconds." (c) "The service is available 99.9% of the time in each calendar month, and no confirmed submission is ever lost." The numbers must come from stakeholders; the point is that each version can be measured.</p>`
        },
        {
          q: `<p>Split this epic into four or more stories, each a vertical slice that a user could try: "Students can submit assignments online."</p>`,
          a: `<p>For example: (1) a student uploads a single PDF before the deadline and sees a confirmation; (2) a student can resubmit, and the latest version counts; (3) an instructor sees a list of who has submitted; (4) late submissions are accepted but marked late; (5) a student can submit several files; (6) a student gets an email receipt. Each delivers something visible on its own, and the first is a minimum viable version.</p>`
        },
        {
          q: `<p>A team's velocities over six sprints were 30, 12, 28, 31, 29 and 26 (the 12 was a sprint with two people ill). 145 points remain. Give a forecast as a range, and say how you treated the 12.</p>`,
          a: `<p>Without the 12, velocities range from 26 to 31 (mean 28.8): 145/31 ≈ 4.7 and 145/26 ≈ 5.6, so 5 to 6 sprints. Including it, the mean falls to 26 and the slowest case becomes 145/12 ≈ 12 sprints, which overstates the risk unless illness is likely again. A good forecast says "5 to 6 sprints, assuming the team stays at full strength", stating the assumption rather than hiding it.</p>`
        }
      ],
      sources: ["googletw", "swebook", "agilemanifesto"]
    },
    {
      id: "se2",
      title: "Version control in teams",
      minutes: 90,
      summary: "Git beyond one person: how Git stores history as a graph of snapshots, branches, merging and merge conflicts, rebasing, pull requests, branching strategies, and writing history other people can use.",
      notes: `
<p>CS 101 Lesson 14 introduced Git for one person: <code>add</code>, <code>commit</code>, <code>push</code>, <code>pull</code>. In a team, several people change the same code at the same time, and Git's job is to let them do that safely and combine the results. To use it well you need a picture of what Git actually stores.</p>

<h3>What Git stores</h3>
<p>A <strong>commit</strong> is a snapshot of every file in the project, plus a message, an author, a time and a pointer to its <strong>parent</strong> commit (the one before it). Git doesn't store changes; it stores whole snapshots, and computes changes by comparing them. (It saves space by storing each distinct file content only once.)</p>
<p>Every object is named by a <strong>hash</strong> of its contents. CS 201's hash tables used hash functions to spread keys over buckets; Git uses a <em>cryptographic</em> hash, SHA-1, whose 160-bit output is, in practice, unique to its input. A file's content is stored as a <em>blob</em> named by the hash of a short header plus the bytes:</p>
<pre><code>import hashlib

def blob_hash(content):
    data = b"blob " + str(len(content)).encode() + b"\\0" + content
    return hashlib.sha1(data).hexdigest()

print(blob_hash(b"hello\\n"))   # ce013625030ba8dba906f756967f9e9ca394464a</code></pre>
<p>That is exactly the name <code>git hash-object</code> prints for a file containing "hello" and a newline. A commit's hash covers its snapshot and its parent's hash, so changing anything in history, even one byte of an old file, changes every later commit's hash. This makes history tamper-evident, and it means two repositories that share a commit hash share the entire history behind it.</p>
<p>Because each commit points to its parent, history is a <strong>directed acyclic graph</strong> (CS 201 Lesson 7): usually a chain, with a fork where work diverged and a commit with two parents where it was merged back.</p>

<h3>Branches</h3>
<p>A <strong>branch</strong> is just a name pointing to a commit. Making a commit on a branch moves the name forward to the new commit. <code>HEAD</code> is the name of the branch you're on. Creating a branch is instant, because it writes one small file.</p>
<pre data-label="Shell"><code>git switch -c add-search        # create a branch called add-search and move to it
# ... edit files ...
git add search.py
git commit -m "Add search by title"
git switch main                 # back to main: files change to main's snapshot</code></pre>
<p>Branches let each piece of work develop separately. While you work on <code>add-search</code>, a teammate commits to <code>main</code>, and the history forks:</p>
<figure class="fig">
<svg viewBox="0 0 520 150" width="520" role="img" aria-label="Commit graph: A then B on main; branch add-search has C and D from B; main has E from B; merge commit M has parents D and E.">
  <line class="ln" x1="60" y1="50" x2="140" y2="50"/><line class="ln" x1="160" y1="50" x2="300" y2="50"/>
  <line class="ln" x1="155" y1="58" x2="225" y2="102"/><line class="ln" x1="250" y1="110" x2="330" y2="110"/>
  <line class="ln" x1="320" y1="50" x2="420" y2="50"/><line class="ln" x1="350" y1="104" x2="422" y2="60"/>
  <circle class="box" cx="50" cy="50" r="13"/><text class="text" x="50" y="55" text-anchor="middle">A</text>
  <circle class="box" cx="150" cy="50" r="13"/><text class="text" x="150" y="55" text-anchor="middle">B</text>
  <circle class="box" cx="310" cy="50" r="13"/><text class="text" x="310" y="55" text-anchor="middle">E</text>
  <circle class="box" cx="240" cy="110" r="13"/><text class="text" x="240" y="115" text-anchor="middle">C</text>
  <circle class="box" cx="340" cy="110" r="13"/><text class="text" x="340" y="115" text-anchor="middle">D</text>
  <circle class="box hl" cx="432" cy="50" r="13"/><text class="text" x="432" y="55" text-anchor="middle">M</text>
  <text class="text m" x="470" y="40">main</text>
  <text class="text m" x="380" y="138">add-search</text>
  <text class="text m" x="50" y="22">older</text><text class="text m" x="432" y="22">newer</text>
</svg>
<figcaption>Work forked after commit B. Merging <code>add-search</code> into <code>main</code> creates M, a commit with two parents (D and E).</figcaption>
</figure>

<h3>Merging</h3>
<p>To combine the work, <code>git merge add-search</code> (run on <code>main</code>) finds the <strong>merge base</strong>, the most recent commit both branches share (B above), and compares each branch's snapshot with it. This is a <strong>three-way merge</strong>: for each part of each file,</p>
<ul>
<li>if only one side changed it from the base, take that side's version;</li>
<li>if neither changed it, or both made the same change, keep it;</li>
<li>if both changed it differently, that is a <strong>conflict</strong>, which a person must resolve.</li>
</ul>
<p>Comparing with the base is what makes merging smart. Two versions alone can't tell you whether a line was added on one side or deleted on the other; the base can. If <code>main</code> hasn't moved since the branch was made, there is nothing to combine, and Git simply moves <code>main</code> forward: a <strong>fast-forward</strong>.</p>
<p>Here is the rule for files where both sides kept the same number of lines (real Git also aligns inserted and deleted lines, with the diff algorithm behind <code>git diff</code>, which is closely related to CS 220's longest common subsequence):</p>
<pre><code>def merge_lines(base, ours, theirs):
    out, conflicts = [], 0
    for b, o, t in zip(base, ours, theirs):
        if o == t or t == b:
            out.append(o)                # same on both sides, or only we changed it
        elif o == b:
            out.append(t)                # only they changed it
        else:
            out.append(("CONFLICT", o, t))
            conflicts += 1
    return out, conflicts

base   = ["title = 'Notes'", "size = 10", "color = 'blue'"]
ours   = ["title = 'Notes'", "size = 12", "color = 'blue'"]
theirs = ["title = 'My notes'", "size = 10", "color = 'red'"]
print(merge_lines(base, ours, theirs))
# (["title = 'My notes'", 'size = 12', "color = 'red'"], 0)</code></pre>
<p>Each side changed different lines, so the merge combines all three changes with no conflict.</p>

<h3>Resolving conflicts</h3>
<p>When both sides change the same lines, Git stops and writes both versions into the file between markers:</p>
<pre data-label="config.py"><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
size = 12
=======
size = 14
&gt;&gt;&gt;&gt;&gt;&gt;&gt; add-search</code></pre>
<p>The part above <code>=======</code> is yours (HEAD); the part below is the branch being merged. You edit the file into what it should be, which may be either version, both, or something new. Then you remove the markers, run the tests, and <code>git add</code> and <code>git commit</code> to finish the merge. A conflict is not an error: it means two people made decisions about the same thing, and only a person can decide which is right. Talk to the other author if you aren't sure.</p>
<p>Not every problem shows up as a conflict. If you rename a function on your branch while a teammate adds a new call to the old name on theirs, both changes merge cleanly and the program breaks. That is why tests must run on the merged result, which is one job of continuous integration (Lesson 7).</p>
<p>The best way to avoid painful conflicts is to merge often: small branches that live a day or two diverge little. A branch left for a month diverges a lot.</p>

<h3>Rebasing</h3>
<p>An alternative to merging is <code>git rebase main</code>, run on your branch. It replays your commits, one at a time, on top of the latest <code>main</code>, making new commits (with new hashes) as if you had started your work from there. History becomes a straight line, which is easier to read. The cost is that rebasing rewrites commits. The rule that follows is important: <strong>never rebase commits that other people already have</strong>, such as a shared branch that has been pushed, because their copies still contain the old commits and the histories will no longer match. Rebasing your own unshared work is fine.</p>

<h3>Pull requests</h3>
<p>On GitHub and similar services, teams rarely merge into <code>main</code> directly. You push your branch and open a <strong>pull request</strong> (PR; GitLab calls it a merge request): a proposal to merge it, with a description, the diff, and a place for discussion. Teammates review the change (Lesson 7), automated checks run the tests, and only then is it merged. The PR description should say what the change does, why, and how it was tested, written for a reviewer who hasn't been following your work. WRIT 100's advice about leading with the point applies here. Repositories usually <strong>protect</strong> <code>main</code> so that changes can only arrive through reviewed PRs whose checks have passed.</p>

<h3>Branching strategies</h3>
<ul>
<li><strong>Trunk-based development:</strong> everyone merges small changes into <code>main</code> (the "trunk") at least daily, through short-lived branches. Unfinished features are hidden behind <strong>feature flags</strong> (settings that switch code on or off) so they can be merged before they're ready. Most large companies work this way, because frequent small merges avoid big conflicts.</li>
<li><strong>Feature branches:</strong> each feature gets a branch, merged through a PR when complete. Fine when features are small; painful when they last weeks.</li>
<li><strong>GitFlow</strong> adds long-lived <code>develop</code> and release branches. It suits software shipped as numbered releases, but its long-lived branches cause the merge pain the other strategies avoid.</li>
</ul>

<h3>History that helps</h3>
<p>Your repository's history is documentation that future maintainers will read, often while trying to find out why a line exists (<code>git blame</code> shows which commit last changed each line). Good practice:</p>
<ul>
<li>Make each commit one logical change that leaves the project working. A commit that mixes a bug fix with a reformatting of 30 files is hard to review and hard to undo.</li>
<li>Write messages with a short summary line (about 50 characters, in the imperative: "Fix crash when list is empty"), a blank line, then the why: what was wrong, and why this is the fix. The diff already shows what changed.</li>
<li>Never commit generated files, secrets or large binaries; list them in <code>.gitignore</code>. A secret pushed once is in the history forever and must be treated as leaked.</li>
<li>Use <code>git revert</code> to undo a commit that others have: it adds a new commit that reverses it, instead of rewriting history.</li>
</ul>
<p>When a bug appears and nobody knows which change caused it, <code>git bisect</code> finds the commit by binary search (CS 101 Lesson 13): you mark one commit good and one bad, and Git checks out the midpoint for you to test. With 1,000 commits between them, about 10 tests find the culprit. Small, working commits make this possible.</p>
`,
      terms: [
        ["Commit", "A snapshot of the whole project with a message, author and pointer to its parent commit(s)."],
        ["Hash", "In Git, a SHA-1 digest of an object's contents, used as its name."],
        ["Branch", "A movable name that points to a commit."],
        ["HEAD", "The branch (or commit) you currently have checked out."],
        ["Merge base", "The most recent commit that two branches share."],
        ["Three-way merge", "Combining two versions by comparing each with their merge base."],
        ["Merge conflict", "A place where both sides changed the same part of a file differently, which a person must resolve."],
        ["Fast-forward", "A merge where one branch hasn't moved, so the other's name simply moves forward."],
        ["Rebase", "Replaying a branch's commits on top of another commit, rewriting them."],
        ["Pull request", "A proposal to merge a branch, with a description, the diff, review comments and automated checks."],
        ["Trunk-based development", "A strategy in which everyone merges small changes into main at least daily."],
        ["Feature flag", "A setting that turns a piece of code on or off without deploying new code."],
        ["git bisect", "A command that finds the commit that introduced a bug by binary search."]
      ],
      quiz: [
        { q: "What does a Git branch actually consist of?", choices: ["A full copy of the repository", "A name pointing to a commit", "A list of changed files", "A separate folder"], answer: 1, why: "That's why creating one is instant." },
        { q: "In a three-way merge, the base says x = 1, our branch says x = 2, and theirs says x = 1. What is the result?", choices: ["x = 1", "x = 2", "A conflict", "Both lines"], answer: 1, why: "Only we changed it, so our change is taken." },
        { q: "Base x = 1, ours x = 2, theirs x = 3. What happens?", choices: ["x = 2", "x = 3", "A conflict for a person to resolve", "x = 1"], answer: 2, why: "Both sides changed the same line differently." },
        { q: "Why must you not rebase commits that teammates already have?", choices: ["Rebasing deletes files", "It rewrites those commits with new hashes, so their copies of history no longer match yours", "Git forbids it", "It is slow"], answer: 1, why: "Rewritten shared history causes duplicated or lost work." },
        { q: "You rename a function on your branch; a teammate adds a call to the old name on theirs. What does Git do when both merge?", choices: ["Reports a conflict", "Merges cleanly, and the program breaks", "Renames the call automatically", "Refuses to merge"], answer: 1, why: "The changes touch different lines, so Git sees no conflict. Only tests on the merged code catch it." },
        { q: "About how many tests does git bisect need to search 1,000 commits?", choices: ["1,000", "500", "About 10", "1"], answer: 2, why: "Binary search: log₂ 1000 ≈ 10." }
      ],
      practice: [
        {
          q: `<p>Use <code>merge_lines</code> from the notes by hand. Base: <code>["a", "b", "c", "d"]</code>; ours: <code>["a", "B", "c", "D"]</code>; theirs: <code>["A", "b", "c", "X"]</code>. What is the result, and how many conflicts are there?</p>`,
          a: `<p>Line 1: only theirs changed, so "A". Line 2: only ours, so "B". Line 3: unchanged, "c". Line 4: both changed differently, a conflict between "D" and "X". Result <code>["A", "B", "c", ("CONFLICT", "D", "X")]</code>, with 1 conflict.</p>`
        },
        {
          q: `<p>Here is a commit message. Rewrite it following the lesson's advice: "fixed stuff and also reformatted everything and added the new search thing".</p>`,
          a: `<p>It describes three changes, which should be three commits. For example: "Fix crash when the reading list is empty" (body: "len() was called on None when a new user had no list; return an empty list instead."); "Reformat with the project formatter" (no behavior change); "Add search by title" (body: why users needed it and how it works). Each can then be reviewed and reverted on its own.</p>`
        },
        {
          q: `<p>Explain why changing the content of a file in a commit from two years ago would change the hash of today's latest commit.</p>`,
          a: `<p>The old file's blob hash changes, so the snapshot containing it changes, so that commit's hash changes. The next commit's hash covers its parent's hash, so it changes too, and so on down the chain to today's commit. This is why history in Git is tamper-evident.</p>`
        },
        {
          q: `<p>Your team keeps feature branches open for three to four weeks and spends a day resolving conflicts at each merge. Suggest two changes to how the team works.</p>`,
          a: `<p>Split features into smaller stories that can be merged in a day or two (vertical slices, Lesson 1). Merge unfinished work behind feature flags, so it reaches main early without being visible to users. Both shrink how far branches diverge, and so the conflicts. Merging main into long branches regularly also helps, but less.</p>`
        }
      ],
      sources: ["progit", "googletw"]
    },
    {
      id: "se3",
      title: "Testing in depth",
      minutes: 90,
      summary: "Beyond the unit tests of CS 102: the test pyramid, choosing test cases with equivalence classes and boundaries, test doubles and mocks, property-based testing, coverage and what it doesn't tell you, mutation testing, and flaky tests.",
      notes: `
<p>CS 101 Lesson 11 and CS 102 Lesson 6 taught you to write unit tests with pytest, to write them first (test-driven development), and to replace slow or unpredictable dependencies with fakes. This lesson is about testing a whole system that a team maintains: what kinds of test to write, how many, how to choose inputs, and how to tell whether the tests are any good.</p>

<h3>Kinds of test</h3>
<ul>
<li><strong>Unit tests</strong> check one function or class on its own. They run in milliseconds, and when one fails, it points straight at the problem.</li>
<li><strong>Integration tests</strong> check that several parts work together: your code with a real database, or two services talking to each other. They catch mistakes at the boundaries, such as a wrong assumption about a data format, but are slower and harder to set up.</li>
<li><strong>End-to-end tests</strong> drive the whole system the way a user would, for example by clicking through a web page in a real browser. They give the most confidence that the system works, but they are slow and fragile: a test can fail because a button moved, and when it fails, it doesn't say why.</li>
</ul>
<p>The usual advice is the <strong>test pyramid</strong>: many unit tests at the bottom, fewer integration tests, and a handful of end-to-end tests for the most important user journeys. Because the fast tests are the majority, the whole suite can run on every change. An upside-down pyramid (mostly end-to-end tests) is a common, slow and flaky mistake.</p>

<h3>Choosing test cases</h3>
<p>You can't test every input, so the question is which inputs give the most confidence. Two systematic techniques help.</p>
<p><strong>Equivalence partitioning</strong>: divide the inputs into classes that the code should treat the same way, and test one from each class. <strong>Boundary value analysis</strong>: bugs cluster at the edges between classes (the off-by-one errors of CS 101), so also test the values on each side of every boundary.</p>
<p>Take a function that turns a percentage into a letter grade, where 90 and above is A, 80 to 89.99… is B, and so on down to below 60 for F, and anything outside 0 to 100 is an error:</p>
<pre><code>def letter(score):
    if not 0 &lt;= score &lt;= 100:
        raise ValueError(f"score out of range: {score}")
    for cutoff, grade in ((90, "A"), (80, "B"), (70, "C"), (60, "D")):
        if score >= cutoff:
            return grade
    return "F"

print([letter(s) for s in (0, 59.9, 60, 79.99, 80, 89, 90, 100)])
# ['F', 'F', 'D', 'C', 'B', 'B', 'A', 'A']</code></pre>
<p>The classes are: invalid low (below 0), F, D, C, B, A, and invalid high (above 100). Boundaries: −0.1 and 0; 59.9 and 60; 69.9 and 70; and so on up to 100 and 100.1. About 14 tests, chosen this way, catch far more than 100 random scores would, because random scores rarely land on an edge.</p>

<h3>Test doubles</h3>
<p>A <strong>test double</strong> stands in for a real dependency in a test, the way a stunt double stands in for an actor. CS 102 Lesson 6 wrote fakes by hand. The vocabulary distinguishes several kinds:</p>
<ul>
<li>a <strong>stub</strong> returns fixed answers ("the weather service says 20 °C");</li>
<li>a <strong>fake</strong> is a working but simplified implementation, such as an in-memory dictionary in place of a database;</li>
<li>a <strong>mock</strong> records how it was called, so the test can check that the code under test called it correctly ("the email service was asked to send exactly one message, to this address").</li>
</ul>
<p>Python's standard library has <code>unittest.mock</code>. A <code>Mock</code> object accepts any call, returns whatever you configure, and remembers every call made to it:</p>
<pre><code>from unittest.mock import Mock

def remind_overdue(loans, today, mailer):
    """Email every borrower whose loan is past due. Returns how many were sent."""
    sent = 0
    for loan in loans:
        if loan["due"] &lt; today:
            mailer.send(loan["email"], f"'{loan['title']}' was due on day {loan['due']}")
            sent += 1
    return sent

mailer = Mock()
loans = [{"email": "ana@example.com", "title": "Dune", "due": 10},
         {"email": "bo@example.com", "title": "Emma", "due": 30}]
print(remind_overdue(loans, today=20, mailer=mailer))   # 1
print(mailer.send.call_count)                          # 1
mailer.send.assert_called_once_with("ana@example.com", "'Dune' was due on day 10")</code></pre>
<p>No email is sent, yet the test checks exactly what would have been. The function takes the mailer as a parameter instead of creating it inside; this <strong>dependency injection</strong> is what makes it testable, and Lesson 4 returns to it.</p>
<p>Mocks are powerful and easy to overuse. A test that checks every internal call is tied to the implementation: refactor the code without changing its behavior, and the test breaks. Prefer checking <em>results</em> (return values, final state) and use mocks for <em>effects at the edge of the system</em>, such as sending email, charging a card or calling another company's service, where the call itself is the behavior.</p>

<h3>Property-based testing</h3>
<p>Example-based tests check particular inputs you thought of. <strong>Property-based tests</strong> state a property that must hold for <em>every</em> input, then check it on hundreds of generated inputs, including ones you'd never think of. Good properties include:</p>
<ul>
<li>round trips: <code>decode(encode(x)) == x</code>;</li>
<li>invariants: sorting keeps the same elements, and the output is in order;</li>
<li>comparison with a simple, slow but obviously correct version (an <em>oracle</em>);</li>
<li>relationships: adding an item to a cart never lowers the total.</li>
</ul>
<p>The Hypothesis library does this for pytest, and also shrinks a failing input to the smallest one that still fails. The idea needs only <code>random</code>. Here, a run-length encoder is checked against its decoder:</p>
<pre><code>import random

def rle_encode(s):
    out, i = [], 0
    while i &lt; len(s):
        j = i
        while j &lt; len(s) and s[j] == s[i]:
            j += 1
        out.append((s[i], j - i))
        i = j
    return out

def rle_decode(pairs):
    return "".join(ch * n for ch, n in pairs)

random.seed(0)
for _ in range(1000):
    s = "".join(random.choice("ab") for _ in range(random.randint(0, 12)))
    assert rle_decode(rle_encode(s)) == s, s
print(rle_encode("aaabcc"))   # [('a', 3), ('b', 1), ('c', 2)]</code></pre>
<p>Generating from a small alphabet ("ab") makes repeated characters, and so the interesting cases, likely. The empty string is generated too, a classic edge case. Fixing the seed makes a failure reproducible.</p>

<h3>Coverage</h3>
<p><strong>Code coverage</strong> measures which parts of the code the tests ran. <em>Line</em> (statement) coverage counts lines executed; <em>branch</em> coverage counts whether each <code>if</code> went both ways. The <code>coverage.py</code> tool (<code>pytest --cov</code>) reports both. Coverage is useful in one direction only: code that no test runs is certainly not tested, so low coverage points at gaps. High coverage doesn't mean good tests. A test that calls every function and checks nothing has 100% coverage and catches nothing. Teams that set a coverage target as a goal tend to get tests written to hit the number.</p>

<h3>Mutation testing: testing the tests</h3>
<p>A better measure asks: if the code had a bug, would a test fail? <strong>Mutation testing</strong> makes small changes ("mutants") to the code, such as turning <code>&gt;=</code> into <code>&gt;</code> or <code>+</code> into <code>-</code>, and runs the tests on each. A mutant the tests catch is <em>killed</em>; one that survives shows a behavior no test checks.</p>
<pre><code>def letter_mutant(score):
    if not 0 &lt;= score &lt;= 100:
        raise ValueError(score)
    for cutoff, grade in ((90, "A"), (80, "B"), (70, "C"), (60, "D")):
        if score > cutoff:        # mutated: >= became >
            return grade
    return "F"

weak_tests = [(95, "A"), (85, "B"), (75, "C"), (65, "D"), (30, "F")]
boundary_tests = weak_tests + [(90, "A"), (60, "D")]

def survives(f, tests):
    return all(f(s) == want for s, want in tests)

print(survives(letter_mutant, weak_tests))       # True
print(survives(letter_mutant, boundary_tests))   # False</code></pre>
<p>The weak tests, with one score in the middle of each class, pass the mutant: they would never notice the off-by-one bug. Adding boundary values kills it. Tools such as <code>mutmut</code> generate and run mutants automatically.</p>

<h3>Flaky tests</h3>
<p>A <strong>flaky</strong> test sometimes passes and sometimes fails on the same code. Common causes are timing (a test that sleeps 1 second and hopes a background task has finished), shared state (tests that pass alone but fail in another order because one leaves data behind), dependence on the clock or the network, and unseeded randomness. Flaky tests are worse than they look: once a team learns that failures are often noise, it stops trusting real failures. Fix or remove them promptly. Inject the clock and the random generator as dependencies, so tests can control them.</p>
`,
      terms: [
        ["Unit test", "A test of one function or class in isolation."],
        ["Integration test", "A test that several components work correctly together."],
        ["End-to-end test", "A test that drives the whole system as a user would."],
        ["Test pyramid", "Guidance to have many unit tests, fewer integration tests and few end-to-end tests."],
        ["Equivalence partitioning", "Dividing inputs into classes the code should treat alike, and testing one from each."],
        ["Boundary value analysis", "Testing the values on each side of every boundary between input classes."],
        ["Test double", "Any object that stands in for a real dependency in a test: a stub, fake or mock."],
        ["Mock", "A test double that records how it was called, so a test can check the calls."],
        ["Dependency injection", "Passing a component's dependencies in (for example as parameters) instead of creating them inside it."],
        ["Property-based testing", "Checking that a stated property holds for many generated inputs."],
        ["Code coverage", "The fraction of lines or branches that the tests execute."],
        ["Mutation testing", "Introducing small bugs into the code to see whether the tests catch them."],
        ["Flaky test", "A test that passes or fails unpredictably on the same code."]
      ],
      quiz: [
        { q: "Why should most of a suite be unit tests?", choices: ["They are the only real tests", "They're fast and pinpoint failures, so the whole suite can run on every change", "They test the user interface", "They never need updating"], answer: 1, why: "That is the reasoning behind the test pyramid." },
        { q: "A function accepts ages 18 to 65 inclusive. Which set is the best boundary test?", choices: ["30, 40, 50", "17, 18, 65, 66", "0, 100", "18, 65"], answer: 1, why: "Test each side of both boundaries." },
        { q: "When is a mock the right tool?", choices: ["For every dependency", "For effects at the edge of the system, such as sending email, where the call is the behavior", "To check private helper functions", "Never"], answer: 1, why: "Otherwise check results, so tests don't break when the implementation changes." },
        { q: "Your suite has 100% line coverage. What can you conclude?", choices: ["The code has no bugs", "Every line was run by some test, but not that the tests check the right things", "Mutation testing is unnecessary", "Branch coverage is also 100%"], answer: 1, why: "Coverage shows what ran, not what was checked. Line coverage can be 100% even when an if never went the other way." },
        { q: "A mutant survives your tests. What does that tell you?", choices: ["The code is wrong", "There is a change in behavior that no test notices: a gap in the tests", "The mutation tool is broken", "Nothing"], answer: 1, why: "A surviving mutant is a bug your tests would miss." },
        { q: "Which is a good property for a sorting function?", choices: ["sort([3, 1, 2]) == [1, 2, 3]", "For any list, the output is in order and is a rearrangement of the input", "It is fast", "It returns a list"], answer: 1, why: "A property holds for all inputs; the first choice is a single example." }
      ],
      practice: [
        {
          q: `<p>A shipping function charges $5 for orders under $50, $2 for $50 up to but not including $100, and nothing from $100. Negative amounts are an error. List the equivalence classes and a set of boundary tests.</p>`,
          a: `<p>Classes: negative (error), [0, 50) → $5, [50, 100) → $2, 100 and above → $0. Boundary tests: −0.01 (error), 0 ($5), 49.99 ($5), 50 ($2), 99.99 ($2), 100 ($0), plus one large value such as 10,000 ($0). For money, also decide whether amounts are in cents, so that 49.99 is exact.</p>`
        },
        {
          q: `<p>Write a property-based test, in the style of the notes, for a function <code>dedupe(xs)</code> that removes repeated items from a list while keeping the first occurrence of each, in order. State at least three properties.</p>`,
          a: `<p>Properties: the output has no repeats; every item of the input appears in the output; the output is in the order of first appearance, which can be checked against a slow oracle. For example:</p>
<pre><code>import random

def dedupe(xs):
    seen, out = set(), []
    for x in xs:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out

random.seed(1)
for _ in range(500):
    xs = [random.randint(0, 5) for _ in range(random.randint(0, 15))]
    out = dedupe(xs)
    assert len(out) == len(set(out))
    assert set(out) == set(xs)
    assert out == sorted(set(xs), key=xs.index)   # oracle: order of first index
print("ok")   # ok</code></pre>`
        },
        {
          q: `<p>A test checks that a cache expires entries after 60 seconds by calling <code>time.sleep(61)</code>. Give two problems with this test and a better design.</p>`,
          a: `<p>It makes the suite a minute slower, and it can be flaky if the machine is busy. Better: give the cache a clock as a dependency (for example a function that returns the current time) and pass a fake clock in tests, so the test can advance time instantly from 0 to 61 and check that the entry is gone.</p>`
        },
        {
          q: `<p>Which test double would you use for each, and why? (a) A payment processor in a test of the checkout flow. (b) A database in a test of the code that builds a monthly report. (c) A service that returns the current exchange rate.</p>`,
          a: `<p>(a) A mock: the behavior to check is that exactly one charge of the right amount was requested. (b) A fake, an in-memory store with sample data, because the report reads lots of data and only the result matters. (c) A stub returning a fixed rate, so the test's expected totals are known in advance.</p>`
        }
      ],
      sources: ["googletw", "pytestdocs", "hypothesisdocs"]
    },
    {
      id: "se4",
      title: "Design principles and refactoring",
      minutes: 90,
      summary: "What makes code easy to change: cohesion and coupling revisited, the single responsibility principle, separating logic from input and output, depending on abstractions, DRY and YAGNI, code smells, and refactoring in small, safe steps.",
      notes: `
<p>Code is read and changed far more often than it is written. A design is good to the extent that the next change, which you can't predict, is easy and safe. CS 102 Lesson 4 introduced the two measures that matter most: <strong>cohesion</strong> (how closely the parts of one module belong together) and <strong>coupling</strong> (how much modules depend on each other's details). Good designs have high cohesion and low coupling. This lesson turns those ideas into principles you can apply, and into a method, refactoring, for improving code that falls short.</p>

<h3>One reason to change</h3>
<p>The <strong>single responsibility principle</strong> says a module (a function, class or file) should have one reason to change: it should serve one purpose, for one group of people. Here is a function that has three:</p>
<pre data-label="Before"><code>def report(path):
    total, count = 0, 0
    with open(path) as f:
        for line in f:
            name, score = line.strip().split(",")
            total += float(score)
            count += 1
    avg = total / count
    print(f"&lt;h1&gt;Average: {avg:.1f}&lt;/h1&gt;")</code></pre>
<p>It changes if the file format changes, if the statistics change, or if the output format changes, and none of it can be tested without a file and capturing printed output. Separating the three concerns:</p>
<pre><code>def parse_scores(lines):
    return [float(line.strip().split(",")[1]) for line in lines if line.strip()]

def average(xs):
    if not xs:
        raise ValueError("no scores")
    return sum(xs) / len(xs)

def render_html(avg):
    return f"&lt;h1&gt;Average: {avg:.1f}&lt;/h1&gt;"

lines = ["ana,90\\n", "bo,75\\n", "\\n", "cy,84\\n"]
print(render_html(average(parse_scores(lines))))   # &lt;h1&gt;Average: 83.0&lt;/h1&gt;</code></pre>
<p>Now each piece can be tested with plain values, the logic can be reused for a terminal report or a web page, and two bugs in the original became visible and were fixed on the way: a blank line crashed it, and an empty file divided by zero. Only a thin outer function still opens files and prints. Keeping the core of a program free of input and output ("functional core, imperative shell") is one of the most useful habits in design.</p>

<h3>Depend on abstractions</h3>
<p>Coupling is worst when high-level logic depends directly on low-level details. In the last lesson, <code>remind_overdue</code> took its mailer as a parameter instead of constructing an SMTP connection inside. Its only assumption about the mailer is that it has a <code>send(to, text)</code> method: an interface, which CS 102 expressed as a <code>Protocol</code>. The policy (who gets reminded) doesn't depend on the mechanism (how mail is sent). Both depend on the small interface between them. This is the <strong>dependency inversion principle</strong>, and passing the dependency in is <strong>dependency injection</strong>. The payoff is that the mechanism can change (a different email provider, a text message, a fake in tests) without touching the policy.</p>
<p>Related principles you'll meet under the acronym SOLID include the <em>open–closed principle</em> (add behavior by adding code, such as a new class implementing an interface, rather than editing working code), the <em>Liskov substitution principle</em> from CS 102 Lesson 3 (a subclass must work wherever its parent is expected), and <em>interface segregation</em> (prefer several small interfaces to one large one, so clients depend only on what they use).</p>

<h3>DRY, but not too DRY; YAGNI</h3>
<p><strong>Don't repeat yourself (DRY)</strong>: every piece of knowledge, such as a tax rate, a validation rule or a file format, should live in one place, so that a change is made once. Duplicated <em>knowledge</em> is a real hazard: someone updates one copy and not the other. But code that merely looks alike isn't always the same knowledge. Two functions that both happen to check <code>len(x) &gt; 0</code> for unrelated reasons may need to change separately later; merging them couples them. A common rule of thumb is to tolerate duplication until the third occurrence, when the shared idea is clear.</p>
<p><strong>You aren't gonna need it (YAGNI)</strong>: don't build for imagined future requirements. A plugin system "in case we need one" costs time now, makes the code harder to understand, and usually guesses the future wrongly. Build what today's stories need, keep the code easy to change, and add the flexibility when a real need arrives. The two principles pull against each other and against cleverness; the aim in both is code that is as simple as the problem allows.</p>

<h3>Code smells</h3>
<p>A <strong>code smell</strong> is a surface sign that the design may have a problem. It isn't a bug, and it isn't always wrong, but it is worth a look. Common ones:</p>
<ul>
<li><strong>Long function:</strong> a function too long to understand at once, usually doing several things.</li>
<li><strong>Duplicated code:</strong> the same logic in several places.</li>
<li><strong>Long parameter list:</strong> often several parameters that always travel together and want to be one object.</li>
<li><strong>Primitive obsession:</strong> using raw strings and numbers for domain ideas, such as money as a float or a date as a string, so the rules about them are scattered everywhere.</li>
<li><strong>Feature envy:</strong> a function that mostly uses another object's data, and probably belongs in that object.</li>
<li><strong>Shotgun surgery:</strong> one change requires edits in many places, which means one idea is spread across many modules.</li>
<li><strong>Long if/elif chains on a type code:</strong> the same <code>if kind == "a" ... elif kind == "b"</code> appearing in several functions, so adding a kind means editing all of them.</li>
<li><strong>Comments explaining what confusing code does:</strong> often the code should be made clear instead, with better names or a well-named helper function. Comments explaining <em>why</em> remain valuable.</li>
</ul>

<h3>Refactoring</h3>
<p><strong>Refactoring</strong> (CS 102 Lesson 6) is changing the structure of code without changing its behavior. The discipline that makes it safe is to work in small steps, running the tests after each one, so that if something breaks you know exactly which step did it. Each named refactoring is a small, well-understood step:</p>
<ul>
<li><strong>Rename</strong> a variable, function or class to say what it is.</li>
<li><strong>Extract function:</strong> move a fragment into a well-named function. The commonest and most useful.</li>
<li><strong>Inline function:</strong> the reverse, when a function's body is as clear as its name.</li>
<li><strong>Introduce parameter object:</strong> replace parameters that travel together with one object.</li>
<li><strong>Replace magic number with a named constant.</strong></li>
<li><strong>Replace conditional with polymorphism:</strong> turn a repeated if/elif on a type code into classes that each implement the behavior, so a new kind is a new class.</li>
</ul>
<p>Here is a pricing function with a type-code conditional, then the same behavior after replacing the conditional with a table of small functions (in Python, a dictionary of functions often does the job of a class hierarchy):</p>
<pre data-label="Before"><code>def price(kind, base, days):
    if kind == "standard":
        return base * days
    elif kind == "weekly":
        return base * 5 * (days // 7) + base * (days % 7)
    elif kind == "student":
        return base * days * 0.8
    else:
        raise ValueError(kind)</code></pre>
<pre><code>PRICING = {
    "standard": lambda base, days: base * days,
    "weekly":   lambda base, days: base * 5 * (days // 7) + base * (days % 7),
    "student":  lambda base, days: base * days * 0.8,
}

def price(kind, base, days):
    if kind not in PRICING:
        raise ValueError(f"unknown pricing plan: {kind}")
    return PRICING[kind](base, days)

print(price("weekly", 10, 9), price("student", 10, 3))   # 70 24.0</code></pre>
<p>Adding a plan is now one new entry, and the list of plans exists in one place, so other code (a menu, a validator) can use <code>PRICING.keys()</code> instead of repeating the names.</p>
<p>When code has no tests, refactoring is risky. The safe first step is to write <strong>characterization tests</strong>: tests that record what the code currently does, right or wrong, so that you notice any change. Then refactor, and fix bugs as separate, deliberate changes.</p>

<h3>Technical debt</h3>
<p><strong>Technical debt</strong> is Ward Cunningham's metaphor for the cost of shortcuts. A quick, messy solution is like a loan: you ship sooner, but you pay "interest" in every later change that the mess makes slower, until you pay off the principal by cleaning it up. Taking on debt deliberately can be right, to hit a deadline or to test an idea. Debt taken on by accident and never repaid is what makes old systems slow to change. Teams pay it down continuously: leave code a little cleaner than you found it, and refactor the parts you're about to change, because those are the parts where clean code pays off soonest.</p>
`,
      terms: [
        ["Cohesion", "How closely the parts of one module belong together; high is good."],
        ["Coupling", "How much modules depend on each other's internal details; low is good."],
        ["Single responsibility principle", "A module should have one reason to change."],
        ["Functional core, imperative shell", "A design that keeps the logic free of input and output, with a thin outer layer that does the I/O."],
        ["Dependency inversion principle", "High-level logic and low-level details should both depend on an abstraction, not on each other."],
        ["DRY", "Don't repeat yourself: each piece of knowledge should live in one place."],
        ["YAGNI", "You aren't gonna need it: don't build for imagined future needs."],
        ["Code smell", "A surface sign of a possible design problem."],
        ["Refactoring", "Changing the structure of code without changing its behavior, in small tested steps."],
        ["Extract function", "The refactoring that moves a fragment of code into a new, well-named function."],
        ["Characterization test", "A test that records what existing code currently does, written before changing it."],
        ["Technical debt", "The future cost of shortcuts taken now, paid as slower changes until the code is cleaned up."]
      ],
      quiz: [
        { q: "A function reads a CSV file, computes statistics and prints HTML. Which principle does it violate?", choices: ["YAGNI", "Single responsibility: it has three reasons to change", "Liskov substitution", "None"], answer: 1, why: "File format, statistics and output format are separate concerns." },
        { q: "Why is a function that takes its mailer as a parameter easier to test than one that creates an SMTP connection inside?", choices: ["It runs faster", "A test can pass in a fake or mock, so no real email is involved", "Parameters are always better", "It isn't"], answer: 1, why: "That's dependency injection." },
        { q: "Which situation best calls for applying DRY?", choices: ["Two functions both check len(x) > 0 for unrelated reasons", "The sales tax rate is written as 0.07 in six files", "Two tests have similar setup code", "Two variables are both named i"], answer: 1, why: "The tax rate is one piece of knowledge in six places; changing it means finding all six." },
        { q: "What must be true of a refactoring?", choices: ["It makes the code faster", "It doesn't change the code's behavior", "It adds a feature", "It removes tests"], answer: 1, why: "By definition: structure changes, behavior doesn't." },
        { q: "You must change code that has no tests. What should you do first?", choices: ["Rewrite it", "Write characterization tests that record its current behavior", "Refactor quickly before anyone notices", "Delete it"], answer: 1, why: "Then any change in behavior during refactoring is caught." },
        { q: "The same if/elif on a 'kind' string appears in five functions. Which refactoring addresses it?", choices: ["Rename", "Replace conditional with polymorphism (or a table of functions)", "Inline function", "Add comments"], answer: 1, why: "Each kind's behavior then lives in one place, and a new kind is one addition." }
      ],
      practice: [
        {
          q: `<p>Name the smells in this function and describe the refactorings you would apply, in order:</p>
<pre data-label="Before"><code>def ship(name, street, city, zip_code, country, weight, express):
    # compute cost
    if country == "US":
        c = 5 + weight * 0.5
    else:
        c = 15 + weight * 1.2
    if express:
        c = c * 1.5
    print("Shipping to " + name + ", " + street + ", " + city + " " + zip_code)
    print("Cost: " + str(round(c, 2)))</code></pre>`,
          a: `<p>Smells: a long parameter list (five address fields that travel together), magic numbers (5, 0.5, 15, 1.2, 1.5), a comment explaining what the code does, mixing calculation with printing, and money as a float. Refactorings: introduce a parameter object (an <code>Address</code> dataclass); extract <code>shipping_cost(country, weight, express)</code>, which returns the cost and is easy to test; replace the magic numbers with named constants (<code>DOMESTIC_BASE</code> and so on); keep a separate function that formats and prints. Do one step at a time, with tests passing between steps, starting with characterization tests of the current output.</p>`
        },
        {
          q: `<p>Using the <code>PRICING</code> table from the notes, add a "monthly" plan that charges <code>base * 20</code> for each full 30 days and <code>base</code> for each remaining day. What is <code>price("monthly", 10, 65)</code>?</p>`,
          a: `<p>Add <code>"monthly": lambda base, days: base * 20 * (days // 30) + base * (days % 30)</code> to the dictionary. 65 days is 2 full months and 5 days: 10 × 20 × 2 + 10 × 5 = 400 + 50 = 450. No other code changes, which is the point of the refactoring.</p>`
        },
        {
          q: `<p>A teammate proposes adding a configurable plugin system to the class project's grade calculator "so other schools can use it later". No current story mentions other schools. How would you respond?</p>`,
          a: `<p>YAGNI: the plugin system costs time and complexity now for a need nobody has yet, and when another school appears its real requirements will probably differ from the guess. A better investment is keeping the calculator's rules in one well-tested place, so that adapting it later is cheap. If the product owner thinks other schools are likely soon, that becomes a story with priority, and the decision is theirs.</p>`
        },
        {
          q: `<p>Rewrite this function as a functional core and an imperative shell. What can now be tested without files?</p>
<pre data-label="Before"><code>def count_words(path):
    counts = {}
    for line in open(path):
        for w in line.lower().split():
            counts[w] = counts.get(w, 0) + 1
    for w in sorted(counts, key=counts.get, reverse=True)[:3]:
        print(w, counts[w])</code></pre>`,
          a: `<p>Core: <code>def word_counts(lines)</code> returns the dictionary, and <code>def top(counts, n)</code> returns a list of (word, count) pairs. Shell: <code>def main(path)</code> opens the file (with a <code>with</code> block, which also fixes the unclosed file), calls the core and prints. Both core functions can be tested with lists of strings, including the edge cases of no lines and ties.</p>`
        }
      ],
      sources: ["fowler", "googletw", "ousterhout"]
    },
    {
      id: "se5",
      title: "Design patterns",
      minutes: 90,
      summary: "Named solutions to recurring design problems: Strategy, Observer, Factory, Adapter, Decorator and Command (with undo), why Singleton is usually a mistake, and how first-class functions make several patterns almost disappear in Python.",
      notes: `
<p>Experienced designers keep meeting the same problems: choosing an algorithm at run time, notifying several parts of a program when something changes, wrapping an incompatible interface. A <strong>design pattern</strong> is a named, reusable solution to one such problem. The idea came from the architect Christopher Alexander, who catalogued patterns in buildings and towns. In 1994 four authors (Gamma, Helm, Johnson and Vlissides, the "Gang of Four") published <em>Design Patterns</em>, a catalogue of 23 for object-oriented software. Its examples are in C++ and Smalltalk.</p>
<p>Patterns are valuable mainly as <em>vocabulary</em>. "Make the exporter a strategy" says in four words what would otherwise take a paragraph, to anyone who knows the name. But a pattern is a solution to a problem, not a goal. Code with patterns applied where there was no problem is harder to read, not better. In languages with first-class functions, such as Python, several of the classic patterns shrink to a function passed as an argument; the notes show both forms.</p>

<h3>Strategy: interchangeable algorithms</h3>
<p><strong>Problem:</strong> a task can be done several ways, and the choice is made at run time or by configuration. <strong>Solution:</strong> put each way behind a common interface and give the user of it one to call. The <code>PRICING</code> table in Lesson 4 and <code>sorted(key=...)</code> are both strategies: the sorting algorithm is fixed, and the comparison is plugged in.</p>
<pre><code>from typing import Protocol

class Discount(Protocol):
    def apply(self, total: float) -> float: ...

class NoDiscount:
    def apply(self, total):
        return total

class PercentOff:
    def __init__(self, pct):
        self.pct = pct
    def apply(self, total):
        return total * (1 - self.pct / 100)

class BulkDiscount:
    def __init__(self, threshold, off):
        self.threshold, self.off = threshold, off
    def apply(self, total):
        return total - self.off if total >= self.threshold else total

def checkout(prices, discount: Discount):
    return round(discount.apply(sum(prices)), 2)

cart = [20.0, 35.0, 50.0]
print(checkout(cart, NoDiscount()), checkout(cart, PercentOff(10)), checkout(cart, BulkDiscount(100, 15)))
# 105.0 94.5 90.0</code></pre>
<p>Adding a new discount is a new class; <code>checkout</code> never changes (the open–closed principle). In Python, a strategy with one method can simply be a function: <code>checkout(cart, lambda t: t * 0.9)</code>. Use a class when the strategy has several methods or configuration worth naming.</p>

<h3>Observer: tell whoever is interested</h3>
<p><strong>Problem:</strong> when one object changes, several others need to react, and the object shouldn't need to know who they are. <strong>Solution:</strong> the object (the <em>subject</em>) keeps a list of <em>observers</em> (often just functions), and calls each one when something happens. Graphical interfaces work this way ("when this button is clicked, call these handlers"), as do spreadsheets and the event listeners in a web page.</p>
<pre><code>class Account:
    def __init__(self, balance=0):
        self.balance = balance
        self._observers = []

    def subscribe(self, fn):
        self._observers.append(fn)

    def withdraw(self, amount):
        self.balance -= amount
        for fn in self._observers:
            fn(self, amount)

log = []
acct = Account(100)
acct.subscribe(lambda a, amt: log.append(f"withdrew {amt}"))
acct.subscribe(lambda a, amt: log.append("LOW BALANCE") if a.balance &lt; 20 else None)
acct.withdraw(50)
acct.withdraw(40)
print(log)   # ['withdrew 50', 'withdrew 40', 'LOW BALANCE']</code></pre>
<p>The account knows nothing about logging or alerts, so new reactions can be added without editing it: low coupling. The cost is that the flow of control is harder to follow: reading <code>withdraw</code> doesn't tell you what will run.</p>

<h3>Factory: hide which class gets made</h3>
<p><strong>Problem:</strong> code needs to create an object, but which class to create depends on input or configuration, and the calling code shouldn't have to know all the classes. <strong>Solution:</strong> a <em>factory</em> function (or method) that makes the decision in one place.</p>
<pre><code>import json, csv, io

class JsonReader:
    def read(self, text):
        return json.loads(text)

class CsvReader:
    def read(self, text):
        return list(csv.DictReader(io.StringIO(text)))

READERS = {".json": JsonReader, ".csv": CsvReader}

def reader_for(filename):
    for ext, cls in READERS.items():
        if filename.endswith(ext):
            return cls()
    raise ValueError(f"no reader for {filename}")

print(reader_for("scores.csv").read("name,score\\nana,90\\n"))   # [{'name': 'ana', 'score': '90'}]</code></pre>
<p>Python's <code>open()</code> is a factory: depending on the mode, it returns a text or a binary file object of different classes.</p>

<h3>Adapter: make an interface fit</h3>
<p><strong>Problem:</strong> you have a class whose interface doesn't match what your code expects, often from a library you can't change. <strong>Solution:</strong> a small <em>adapter</em> class that has the interface you want and translates each call. Suppose the reminder code from Lesson 3 expects <code>send(to, text)</code>, but a new email library offers <code>deliver(message)</code> with a dictionary:</p>
<pre><code>class VendorClient:                      # stand-in for a library we can't change
    def __init__(self):
        self.outbox = []
    def deliver(self, message):
        self.outbox.append(message)

class VendorMailer:
    """Adapter: gives VendorClient the send(to, text) interface our code uses."""
    def __init__(self, client, sender):
        self.client, self.sender = client, sender
    def send(self, to, text):
        self.client.deliver({"from": self.sender, "to": [to], "body": text})

client = VendorClient()
VendorMailer(client, "library@example.com").send("ana@example.com", "Your book is due")
print(client.outbox[0]["to"])   # ['ana@example.com']</code></pre>
<p>Adapters keep a library's interface out of the rest of your code, so switching libraries later means rewriting one small class.</p>

<h3>Decorator: add behavior by wrapping</h3>
<p><strong>Problem:</strong> add behavior, such as logging, caching or timing, to an object or function without changing it. <strong>Solution:</strong> wrap it in another with the same interface, which does the extra work and delegates the rest. Python builds this pattern into the language: a function that takes a function and returns a wrapped one can be applied with <code>@</code>. You've used <code>@dataclass</code> and <code>@property</code>, and CS 220 Lesson 3 used <code>@cache</code> for memoization.</p>
<pre><code>import functools

def count_calls(fn):
    @functools.wraps(fn)          # keep fn's name and docstring on the wrapper
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return fn(*args, **kwargs)
    wrapper.calls = 0
    return wrapper

@count_calls
def square(x):
    return x * x

print(square(3), square(4), square.calls, square.__name__)   # 9 16 2 square</code></pre>
<p>Writing <code>@count_calls</code> above <code>def square</code> means <code>square = count_calls(square)</code>. The <code>*args, **kwargs</code> parameters accept any positional and keyword arguments and pass them on, so the wrapper works for any function.</p>

<h3>Command: actions as objects, and undo</h3>
<p><strong>Problem:</strong> you need to queue, log or undo actions. <strong>Solution:</strong> represent each action as an object with a method to do it and, for undo, a method to reverse it. An editor keeps a stack (CS 102 Lesson 7) of executed commands; undo pops the last one and reverses it.</p>
<pre><code>class Insert:
    def __init__(self, pos, text):
        self.pos, self.text = pos, text
    def do(self, doc):
        return doc[:self.pos] + self.text + doc[self.pos:]
    def undo(self, doc):
        return doc[:self.pos] + doc[self.pos + len(self.text):]

class Editor:
    def __init__(self):
        self.doc, self.history = "", []
    def run(self, cmd):
        self.doc = cmd.do(self.doc)
        self.history.append(cmd)
    def undo(self):
        self.doc = self.history.pop().undo(self.doc)

ed = Editor()
ed.run(Insert(0, "world"))
ed.run(Insert(0, "hello "))
print(ed.doc)   # hello world
ed.undo()
print(ed.doc)   # world</code></pre>
<p>Undo works because each command stores what it needs to reverse itself. Adding redo is a second stack. Commands can also be sent over a network or saved to a log and replayed.</p>

<h3>Singleton, and patterns to be wary of</h3>
<p><strong>Singleton</strong> ensures a class has exactly one instance, reachable from anywhere. It is the most criticized pattern in the catalogue, because a singleton is a global variable in disguise: any code can reach it, so it creates hidden coupling, and tests interfere with each other through its shared state. If a program needs one configuration object or one database connection pool, create one at startup and pass it to whatever needs it (dependency injection). A Python module, which is imported only once, already gives you one shared instance when you truly need it.</p>
<p>More generally, if applying a pattern makes the code longer and harder to follow without solving a problem you actually have, leave it out. Peter Norvig observed in 1996 that 16 of the 23 original patterns become simpler or invisible in languages with first-class functions and dynamic typing, which is why Python code shows fewer pattern classes than Java code.</p>
`,
      terms: [
        ["Design pattern", "A named, reusable solution to a recurring design problem."],
        ["Strategy", "A pattern that puts interchangeable algorithms behind a common interface."],
        ["Observer", "A pattern in which a subject notifies a list of subscribers when it changes."],
        ["Factory", "A function or method that decides which class to create."],
        ["Adapter", "A wrapper that gives an existing class the interface the client code expects."],
        ["Decorator", "A wrapper that adds behavior while keeping the same interface; in Python, also the @ syntax for wrapping functions."],
        ["Command", "A pattern that represents an action as an object, so it can be queued, logged or undone."],
        ["Singleton", "A class restricted to one globally reachable instance; usually better replaced by passing one object in."],
        ["*args, **kwargs", "Parameters that collect any extra positional and keyword arguments, often used to pass them on."]
      ],
      quiz: [
        { q: "Which pattern fits 'the user picks one of several export formats in the settings'?", choices: ["Singleton", "Strategy", "Observer", "Adapter"], answer: 1, why: "Interchangeable algorithms behind one interface." },
        { q: "A spreadsheet updates every chart that uses a cell when the cell changes. Which pattern is this?", choices: ["Observer", "Factory", "Command", "Decorator"], answer: 0, why: "Subscribers are notified of a change." },
        { q: "You must use a payment library whose methods don't match the interface your code expects. What do you write?", choices: ["A singleton", "An adapter", "An observer", "A new library"], answer: 1, why: "It translates between the two interfaces." },
        { q: "What does @count_calls above def square mean?", choices: ["square is renamed count_calls", "square = count_calls(square)", "count_calls runs once at the end", "Nothing until square is called twice"], answer: 1, why: "Decorator syntax replaces the function with the wrapped one." },
        { q: "What does undo need from each Command object?", choices: ["Nothing", "Enough stored information to reverse its own effect", "The whole document's history", "A singleton"], answer: 1, why: "Each command reverses itself, popped from a stack." },
        { q: "Why is Singleton often discouraged?", choices: ["It is slow", "It is global state in disguise, creating hidden coupling and making tests interfere", "Python can't express it", "It uses too much memory"], answer: 1, why: "Pass one instance in instead." }
      ],
      practice: [
        {
          q: `<p>Add a <code>Redo</code> ability to the <code>Editor</code> in the notes. What should happen to the redo stack when a new command is run after an undo?</p>`,
          a: `<p>Keep a second list, <code>self.redone = []</code>. <code>undo</code> pops a command from history, reverses it, and pushes it onto <code>redone</code>. <code>redo</code> pops from <code>redone</code>, runs <code>do</code> again, and pushes it back onto history. Running a new command must clear <code>redone</code>, because the undone commands were defined relative to a document that no longer exists; that's what every editor does.</p>`
        },
        {
          q: `<p>Write a decorator <code>retry(n)</code> that calls the wrapped function up to <em>n</em> times while it raises an exception, re-raising the last exception if every attempt fails. (A decorator that takes an argument is a function that returns a decorator.)</p>`,
          a: `<pre><code>import functools

def retry(n):
    def decorate(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            for attempt in range(n):
                try:
                    return fn(*args, **kwargs)
                except Exception:
                    if attempt == n - 1:
                        raise
        return wrapper
    return decorate

calls = []
@retry(3)
def flaky():
    calls.append(1)
    if len(calls) &lt; 3:
        raise IOError("try again")
    return "ok"

print(flaky(), len(calls))   # ok 3</code></pre><p>Lesson 8 improves this with a growing delay between attempts.</p>`
        },
        {
          q: `<p>A colleague's code has an abstract <code>SorterFactory</code> class with subclasses <code>QuickSorterFactory</code> and <code>MergeSorterFactory</code>, each creating a sorter object with one method, <code>sort(xs)</code>. How would you simplify it in Python?</p>`,
          a: `<p>The sorters are strategies with one method, and the factories exist only to create them. In Python, pass the sorting function itself: <code>def process(xs, sort=merge_sort)</code>. If the choice comes from configuration, a dictionary <code>{"quick": quick_sort, "merge": merge_sort}</code> is the whole factory. Four classes become two functions and a dictionary, with the same flexibility.</p>`
        }
      ],
      sources: ["gof", "norvig96", "pytutorial"]
    },
    {
      id: "se6",
      title: "APIs and data formats",
      minutes: 90,
      summary: "Designing interfaces other programmers use: principles of good API design, JSON as a data format, HTTP requests and responses, REST-style resources and status codes, idempotency, validating input at the boundary, and changing an API without breaking its users (semantic versioning, Hyrum's law).",
      notes: `
<p>An <strong>API</strong> (application programming interface) is the part of a piece of software that other code uses: the functions and classes of a library, or the requests a web service accepts. Your team project's service will have an API that a web page, a phone app or another team calls. Once others depend on an API, it is expensive to change, so it is worth designing carefully.</p>

<h3>What makes an API good</h3>
<ul>
<li><strong>Easy to use correctly, hard to use incorrectly.</strong> <code>transfer(from_account, to_account, amount)</code> invites swapped arguments; requiring keyword arguments, <code>transfer(source=a, dest=b, cents=500)</code>, makes the call self-checking and states the unit.</li>
<li><strong>Small.</strong> Every function you publish is a promise to keep it working. You can add things later; you can rarely remove them.</li>
<li><strong>Consistent.</strong> Same names for the same ideas, same argument order, same error style throughout. If one function is <code>get_user(id)</code>, another shouldn't be <code>fetchOrderById(order)</code>.</li>
<li><strong>Clear errors.</strong> Fail early with a message that says what was wrong and what was expected, not a crash three layers down.</li>
<li><strong>Hide the implementation.</strong> Return the information the caller needs, not your internal data structures, so you can change those freely (CS 102's abstraction barrier).</li>
</ul>
<p>John Ousterhout's advice is to make modules <em>deep</em>: a simple interface over a lot of useful functionality. Python's <code>open()</code> is deep: one call hides buffering, encodings, file systems and the operating system's calls (CS 210 Lesson 8).</p>

<h3>JSON</h3>
<p>Programs exchange data as text in agreed formats. The most common today is <strong>JSON</strong> (JavaScript Object Notation): objects in braces with string keys, arrays in brackets, strings in double quotes, numbers, <code>true</code>, <code>false</code> and <code>null</code>. It maps almost directly onto Python's dicts, lists, strings, numbers, booleans and <code>None</code>, and the <code>json</code> module converts both ways:</p>
<pre><code>import json

order = {"id": 1042, "items": [{"sku": "B-17", "qty": 2}], "paid": False, "note": None}
text = json.dumps(order)
print(text)
# {"id": 1042, "items": [{"sku": "B-17", "qty": 2}], "paid": false, "note": null}
back = json.loads(text)
print(back == order)   # True</code></pre>
<p>Not everything round-trips. JSON has no tuples (they come back as lists), no sets or dates (they can't be written without converting them, for example a date to the string <code>"2026-03-14"</code>), and object keys are always strings, so <code>{1: "a"}</code> comes back as <code>{"1": "a"}</code>. Numbers are where most cross-language bugs hide. JSON doesn't limit their size, but JavaScript reads every number as a 64-bit float (CS 210 Lesson 2), so a large integer ID such as 2<sup>53</sup> + 1 silently changes in a browser. APIs therefore often send large IDs as strings. Money is usually sent as an integer number of cents, never as a float.</p>
<p>Other formats you'll meet: <strong>CSV</strong> for tables (simple, but with no types and varying rules for quoting commas); <strong>YAML</strong> and <strong>TOML</strong> for configuration files people edit; and binary formats such as Protocol Buffers when size and speed matter.</p>

<h3>HTTP in brief</h3>
<p>Web APIs use <strong>HTTP</strong>, the protocol of the web. A client sends a <strong>request</strong>: a <em>method</em>, a <em>path</em>, some <em>headers</em> (name–value pairs such as the format of the body) and optionally a <em>body</em>. The server sends back a <strong>response</strong>: a three-digit <em>status code</em>, headers, and usually a body.</p>
<pre data-label="HTTP"><code>POST /orders HTTP/1.1
Host: shop.example.com
Content-Type: application/json

{"items": [{"sku": "B-17", "qty": 2}]}

HTTP/1.1 201 Created
Location: /orders/1042
Content-Type: application/json

{"id": 1042, "items": [{"sku": "B-17", "qty": 2}], "paid": false}</code></pre>
<p>The main methods are <code>GET</code> (read), <code>POST</code> (create, or perform an action), <code>PUT</code> (replace), <code>PATCH</code> (modify part of) and <code>DELETE</code>. Status codes are grouped by first digit: 2xx success (200 OK, 201 Created, 204 No Content), 3xx redirection, 4xx the client's mistake (400 Bad Request, 401 Unauthorized, meaning not logged in, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Content, meaning well-formed but invalid, 429 Too Many Requests) and 5xx the server's failure (500 Internal Server Error, 503 Service Unavailable). The distinction between 4xx and 5xx matters to clients: retrying a 4xx won't help, while a 503 may succeed later.</p>

<h3>REST: resources and methods</h3>
<p>Most web APIs follow the <strong>REST</strong> style (from Roy Fielding's 2000 dissertation): the API exposes <em>resources</em>, named by paths, and the HTTP methods act on them.</p>
<table>
<tr><th>Request</th><th>Meaning</th></tr>
<tr><td><code>GET /books</code></td><td>list books (often with filters: <code>/books?author=Le+Guin</code>)</td></tr>
<tr><td><code>POST /books</code></td><td>create a book; responds 201 with its location</td></tr>
<tr><td><code>GET /books/17</code></td><td>read book 17, or 404</td></tr>
<tr><td><code>PATCH /books/17</code></td><td>change some of book 17's fields</td></tr>
<tr><td><code>DELETE /books/17</code></td><td>delete book 17</td></tr>
<tr><td><code>GET /books/17/reviews</code></td><td>the reviews of book 17</td></tr>
</table>
<p>Paths are nouns, and the method is the verb, so the API is predictable: knowing how books work, a client can guess how authors work. Here is the core of a server's request handling, written as a functional core: a function from a request to a response, with no networking, so it can be tested with plain values.</p>
<pre><code>import json

books = {17: {"id": 17, "title": "The Dispossessed"}}

def handle(method, path, body=None):
    parts = path.strip("/").split("/")
    if parts[0] != "books":
        return 404, {"error": "not found"}
    if len(parts) == 1:
        if method == "GET":
            return 200, sorted(books.values(), key=lambda b: b["id"])
        if method == "POST":
            data = json.loads(body or "{}")
            if not isinstance(data.get("title"), str) or not data["title"].strip():
                return 422, {"error": "title must be a non-empty string"}
            new_id = max(books, default=0) + 1
            books[new_id] = {"id": new_id, "title": data["title"].strip()}
            return 201, books[new_id]
        return 405, {"error": f"{method} not allowed"}
    if not parts[1].isdigit() or int(parts[1]) not in books:
        return 404, {"error": "no such book"}
    if method == "GET":
        return 200, books[int(parts[1])]
    if method == "DELETE":
        del books[int(parts[1])]
        return 204, None
    return 405, {"error": f"{method} not allowed"}

print(handle("POST", "/books", '{"title": "  Kindred "}'))   # (201, {'id': 18, 'title': 'Kindred'})
print(handle("POST", "/books", '{"title": 7}'))             # (422, {'error': 'title must be a non-empty string'})
print(handle("GET", "/books/99"))                           # (404, {'error': 'no such book'})</code></pre>
<p>Notice that the handler checks its input. Data arriving from outside the program can be anything, by mistake or by malice, so <strong>validate at the boundary</strong>: check types, ranges and lengths as data enters, return a clear 4xx error if it's wrong, and let the code inside trust what it receives. (405 Method Not Allowed is the code for a method the resource doesn't support.)</p>

<h3>Idempotency</h3>
<p>Networks fail. If a client sends a request and the connection drops before the response arrives, it can't know whether the server acted, so it wants to retry. That is safe only if the request is <strong>idempotent</strong>: doing it twice has the same effect as doing it once. <code>GET</code>, <code>PUT</code> and <code>DELETE</code> are meant to be idempotent: setting a field to 5 twice leaves it 5, and deleting something already deleted leaves it deleted. <code>POST</code> is not: sending "create an order" twice creates two orders, and a retried payment charges twice. The standard fix is an <strong>idempotency key</strong>: the client generates a unique ID for each logical operation and sends it with every attempt; the server remembers the keys it has processed and returns the stored result instead of acting again. Lesson 8 returns to retries.</p>

<h3>Changing an API without breaking its users</h3>
<p>Once code depends on your API, changes can break it. A change is <strong>backward compatible</strong> if every existing correct use still works: adding a new optional parameter, a new endpoint or a new field in a response. Removing or renaming anything, adding a required parameter, or changing what a field means is a <strong>breaking change</strong>.</p>
<p><strong>Semantic versioning</strong> (semver) encodes this in version numbers MAJOR.MINOR.PATCH: increase PATCH for backward-compatible bug fixes, MINOR for backward-compatible new features, and MAJOR for breaking changes (resetting the lower numbers to 0). So a user on 2.3.1 can upgrade to 2.4.0 safely but should read the notes before 3.0.0. Package managers use this: a requirement like "2.x, at least 2.3" accepts any later 2.x release but not 3.0. Web APIs usually put the major version in the path (<code>/v2/books</code>) and keep the old version running while clients move.</p>
<p>In practice, compatibility is harder than the rules suggest. <strong>Hyrum's law</strong>, named after a Google engineer, says: "With a sufficient number of users of an API, it does not matter what you promise in the contract: all observable behaviors of your system will be depended on by somebody." If your search happened to return results in insertion order, someone's code relies on it, even though you never promised it, and changing the order will break them. This is one reason to keep APIs small, to document what is and isn't promised, and sometimes to randomize behavior that isn't promised so that nobody can depend on it. Python deliberately randomizes string hashing for a related reason (PEP 456, from CS 201 Lesson 3).</p>
`,
      terms: [
        ["API", "The interface through which other code uses a piece of software: a library's functions, or the requests a service accepts."],
        ["JSON", "A text format for data built from objects, arrays, strings, numbers, true, false and null."],
        ["HTTP", "The request–response protocol of the web: a method and path in, a status code and body out."],
        ["Status code", "A three-digit result in an HTTP response: 2xx success, 4xx client error, 5xx server error."],
        ["REST", "An API style in which paths name resources and HTTP methods act on them."],
        ["Validate at the boundary", "Check data's types, ranges and sizes where it enters the program."],
        ["Idempotent", "Having the same effect whether done once or several times."],
        ["Idempotency key", "A unique ID a client sends with an operation so that the server can ignore repeats."],
        ["Backward compatible", "A change after which every existing correct use still works."],
        ["Breaking change", "A change that can make existing correct uses fail."],
        ["Semantic versioning", "Version numbers MAJOR.MINOR.PATCH, where MAJOR increases for breaking changes, MINOR for compatible features and PATCH for compatible fixes."],
        ["Hyrum's law", "With enough users, every observable behavior of an API will be depended on by somebody."]
      ],
      quiz: [
        { q: "What does json.loads(json.dumps({1: (2, 3)})) return?", choices: ["{1: (2, 3)}", "{'1': [2, 3]}", "{1: [2, 3]}", "An error"], answer: 1, why: "JSON keys are strings and JSON has no tuples." },
        { q: "A client asks for a book that doesn't exist. Which status code should the server return?", choices: ["200", "404", "500", "201"], answer: 1, why: "Not Found is a client-side error: the resource isn't there." },
        { q: "Which request is not idempotent?", choices: ["GET /books/17", "DELETE /books/17", "PUT /books/17 with a full new record", "POST /orders"], answer: 3, why: "Repeating it creates another order." },
        { q: "A library at version 4.2.7 adds a new optional parameter. What should the next version be?", choices: ["4.2.8", "4.3.0", "5.0.0", "4.2.7.1"], answer: 1, why: "A backward-compatible new feature increases MINOR and resets PATCH." },
        { q: "Your API never promised an order for search results, but you change it and clients break. Which idea describes this?", choices: ["YAGNI", "Hyrum's law", "Idempotency", "DRY"], answer: 1, why: "Every observable behavior ends up depended on." },
        { q: "Why do APIs often send money as integer cents?", choices: ["It's shorter", "Floats can't represent most decimal amounts exactly, so totals drift", "JSON has no decimals", "Cents are required by HTTP"], answer: 1, why: "CS 210 Lesson 2: 0.1 has no exact binary representation." }
      ],
      practice: [
        {
          q: `<p>Design REST endpoints for a course's discussion forum with threads and replies: list threads, start a thread, read a thread with its replies, reply to a thread, edit your reply, and delete a thread. Give the method, path and success status code for each.</p>`,
          a: `<p><code>GET /threads</code> 200; <code>POST /threads</code> 201; <code>GET /threads/{id}</code> 200 (with replies included, or <code>GET /threads/{id}/replies</code>); <code>POST /threads/{id}/replies</code> 201; <code>PATCH /threads/{id}/replies/{rid}</code> 200; <code>DELETE /threads/{id}</code> 204. Errors: 404 for a missing thread, 403 for editing someone else's reply, 422 for an empty body.</p>`
        },
        {
          q: `<p>Classify each change to version 3.1.4 of a library as patch, minor or major, and give the new version: (a) fix a crash on empty input; (b) add a function <code>export_csv</code>; (c) rename <code>load</code> to <code>read</code>; (d) make a previously optional argument required.</p>`,
          a: `<p>(a) Patch: 3.1.5. (b) Minor: 3.2.0. (c) Major, because existing calls to <code>load</code> break: 4.0.0. A gentler path is to add <code>read</code> in 3.2.0, keep <code>load</code> as a deprecated alias that warns, and remove it in 4.0.0. (d) Major: 4.0.0.</p>`
        },
        {
          q: `<p>Extend the notes' <code>handle</code> function to support <code>PATCH /books/17</code> with a JSON body that may change the title. What should it return for a body of <code>{"title": ""}</code>, and for <code>{"author": "Butler"}</code> if authors aren't supported?</p>`,
          a: `<p>Add a branch for <code>method == "PATCH"</code> after the 404 check: parse the body, and if it contains <code>"title"</code>, validate it as POST does, then update the book and return 200 with the new record. <code>{"title": ""}</code> fails validation: 422 with the same error message. For unknown fields, either reject them with 422 ("unknown field: author"), which catches client typos, or ignore them; rejecting is safer, and whichever you choose must be documented, because by Hyrum's law clients will rely on it.</p>`
        },
        {
          q: `<p>A phone app sends <code>POST /payments</code>; the network drops before the response arrives, and the app retries. Describe how an idempotency key prevents a double charge.</p>`,
          a: `<p>Before the first attempt the app generates a random unique key, say a UUID, and sends it in a header with every attempt of this payment. The server, on receiving a request, looks the key up. If it is new, it charges the card, stores the key with the response, and returns it. If it has seen the key, it returns the stored response without charging again. Two attempts, one charge.</p>`
        }
      ],
      sources: ["rfc9110", "rfc8259", "semver", "ousterhout"]
    },
    {
      id: "se7",
      title: "Continuous integration, code review and static analysis",
      minutes: 90,
      summary: "Catching mistakes automatically and socially: continuous integration pipelines, linters and formatters, type checkers, how static analysis works (with a small linter built on Python's ast module), code review as reviewer and author, and reproducible builds.",
      notes: `
<p>Every mistake is cheapest to fix right after it's made (Lesson 1). This lesson is about systems that catch mistakes within minutes: machines that check every change automatically, and colleagues who read it.</p>

<h3>Continuous integration</h3>
<p><strong>Continuous integration</strong> (CI) means that everyone merges their work into the shared main branch often, at least daily, and that every change is automatically built and tested on a clean machine before it's merged. A CI service (GitHub Actions, GitLab CI and others) watches the repository; on every push or pull request it starts a fresh virtual machine, checks out the code, installs the dependencies and runs a <strong>pipeline</strong> of checks. The result appears on the pull request as a green tick or a red cross, and a protected main branch accepts only green changes.</p>
<p>A pipeline is configured in a file in the repository, usually in YAML. This GitHub Actions workflow runs the checks on every push and pull request:</p>
<pre data-label=".github/workflows/ci.yml"><code>name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements.txt
      - run: ruff check .            # lint
      - run: ruff format --check .   # formatting
      - run: mypy src                # type check
      - run: pytest --cov=src        # tests, with coverage</code></pre>
<p>Each step must succeed for the next to run. The fast checks go first, so that a typo fails in seconds rather than after a ten-minute test run. Running on a clean machine catches "works on my machine" problems: a file you forgot to commit, a package you installed by hand, a test that depends on your local data.</p>
<p>CI is half of a larger idea. <strong>Continuous delivery</strong> keeps main always ready to release; <strong>continuous deployment</strong> goes further and releases every green change to users automatically, often many times a day. Large services deploy gradually, a <em>canary</em> release to a small fraction of users first, so a bad change harms few people and can be rolled back.</p>
<p>The rule that makes CI work is social: <strong>a broken main branch is everyone's top priority</strong>. If main stays red, people stop noticing red, and the system stops protecting anyone.</p>

<h3>Linters and formatters</h3>
<p>A <strong>linter</strong> (CS 101 Lesson 14 introduced Ruff) flags code that is legal but likely wrong or confusing: unused variables and imports, a name used before it is assigned, comparing with <code>== None</code>, a bare <code>except:</code> that swallows every error, mutable default arguments. A <strong>formatter</strong> (<code>ruff format</code> or Black) rewrites code into one standard layout. Automatic formatting looks trivial, but it ends arguments about style in code review, and it means diffs show only real changes.</p>

<h3>Type checkers</h3>
<p>CS 102 Lesson 4 added type hints and mentioned static type checkers. A checker such as <strong>mypy</strong> reads the hints and reports mismatches without running the code:</p>
<pre data-label="Python"><code>def average(xs: list[float]) -> float:
    return sum(xs) / len(xs)

def describe(name: str, scores: list[float]) -> str:
    return name + ": " + average(scores)    # mypy: Unsupported operand types for + ("str" and "float")</code></pre>
<p>That bug would crash only when <code>describe</code> runs; mypy finds it before. Type checkers are particularly good at catching <code>None</code> errors: if a function is declared <code>-> User | None</code>, mypy reports every caller that uses the result without checking for <code>None</code>. Teams usually add hints gradually, starting with the most-used interfaces.</p>

<h3>How static analysis works</h3>
<p>Linters and type checkers are examples of <strong>static analysis</strong>: examining code without running it. They start, as an interpreter does, by parsing the source into an <strong>abstract syntax tree</strong> (AST): a tree whose nodes are the program's constructs (CS 102 Lesson 8's trees). Python's <code>ast</code> module exposes Python's own parser. Here is a complete small linter that finds two classic mistakes:</p>
<pre><code>import ast

SOURCE = '''
def add_item(item, items=[]):
    items.append(item)
    return items

def load(path):
    try:
        return open(path).read()
    except:
        return None
'''

def lint(source):
    problems = []
    for node in ast.walk(ast.parse(source)):
        if isinstance(node, ast.FunctionDef):
            for default in node.args.defaults:
                if isinstance(default, (ast.List, ast.Dict, ast.Set)):
                    problems.append((node.lineno, f"mutable default argument in {node.name}()"))
        if isinstance(node, ast.ExceptHandler) and node.type is None:
            problems.append((node.lineno, "bare except: catches every error, even typos and Ctrl-C"))
    return sorted(problems)

for line, msg in lint(SOURCE):
    print(line, msg)
# 2 mutable default argument in add_item()
# 9 bare except: catches every error, even typos and Ctrl-C</code></pre>
<p><code>ast.walk</code> visits every node in the tree. A <code>FunctionDef</code> node has the function's name, line number and arguments; an <code>ExceptHandler</code> whose <code>type</code> is <code>None</code> is an <code>except:</code> with no exception named. The mutable default is a real trap: the default list is created once, when the function is defined, so every call that omits <code>items</code> appends to the same list. Real linters are this idea with hundreds of rules.</p>
<p>Static analysis has a fundamental limit. By Rice's theorem, a cousin of the halting problem from MATH 121, no program can decide any nontrivial property of what every program does when run. So every analyzer either misses some real bugs or reports some false alarms, and usually both. Good tools are tuned so that warnings are almost always worth reading; a tool that cries wolf gets switched off.</p>

<h3>Code review</h3>
<p>In <strong>code review</strong>, another engineer reads a change before it's merged. Reviews find defects, but studies of review at Microsoft and Google found that their larger benefits are spreading knowledge (at least two people understand every change), keeping the code base consistent, and teaching. At Google, every change is reviewed.</p>
<p>As a <strong>reviewer</strong>:</p>
<ul>
<li>Check, roughly in order of importance: is the change a good idea at all; is the design right; is it correct, including edge cases and errors; is it tested; is it readable. Leave formatting to the formatter.</li>
<li>Review promptly. A change waiting days for review blocks its author and grows conflicts.</li>
<li>Comment on the code, not the person: "this loop misses the last element", not "you forgot". Ask questions when you aren't sure ("what happens if <code>items</code> is empty?"). Mark minor suggestions as optional ("nit:").</li>
<li>Say what's good, too. Approve when the change makes the code better, even if it isn't how you would have written it.</li>
</ul>
<p>As an <strong>author</strong>:</p>
<ul>
<li>Keep changes small. Reviewers find a much larger share of the problems in a 100-line change than in a 1,000-line one, which tends to get skimmed and approved.</li>
<li>Describe what the change does and why, and how you tested it (Lesson 2).</li>
<li>Review your own diff first. Make sure CI is green before asking for review.</li>
<li>Treat comments as being about the code. If you disagree, explain; if a discussion goes in circles, talk in person.</li>
</ul>

<h3>Reproducible builds and dependencies</h3>
<p>Your code depends on packages, which depend on others. If <code>requirements.txt</code> says only <code>requests</code>, CI installs whatever version is newest today, and a release tomorrow can break a build that nobody changed. Projects therefore <strong>pin</strong> exact versions in a <strong>lock file</strong> (generated by tools such as <code>pip-tools</code>, Poetry or uv), which records the exact version, and a hash, of every package, including indirect ones. Builds become reproducible: the same commit installs the same code everywhere. Upgrades become deliberate changes, tested in CI like any other, and tools such as Dependabot open pull requests for them automatically. Dependencies are also a security risk, as the 2024 attack on the <code>xz</code> compression library showed (CS 102's sidebar on open source): every package you add is code you're trusting.</p>
`,
      terms: [
        ["Continuous integration (CI)", "Merging work into main often, with every change automatically built and tested on a clean machine."],
        ["Pipeline", "The sequence of automated checks CI runs on each change."],
        ["Continuous deployment", "Automatically releasing every change that passes the pipeline."],
        ["Canary release", "Releasing a change to a small fraction of users first."],
        ["Linter", "A tool that flags legal but suspicious code."],
        ["Formatter", "A tool that rewrites code into a standard layout."],
        ["Type checker", "A tool such as mypy that checks type hints without running the code."],
        ["Static analysis", "Examining code without running it."],
        ["Abstract syntax tree (AST)", "A tree representing a program's structure, produced by parsing."],
        ["Code review", "Another engineer reading a change before it is merged."],
        ["Lock file", "A file recording the exact version and hash of every dependency, for reproducible builds."]
      ],
      quiz: [
        { q: "Why does CI run on a fresh machine rather than a developer's computer?", choices: ["It's faster", "It catches problems hidden by local state: uncommitted files, hand-installed packages, local data", "Developers can't run tests", "It is required by Git"], answer: 1, why: "A clean machine reproduces what everyone else will get." },
        { q: "Why do pipelines usually run the linter before the test suite?", choices: ["Linting is more important", "Fast checks first, so simple mistakes fail in seconds", "Tests need the linter's output", "Alphabetical order"], answer: 1, why: "Fail fast and cheaply." },
        { q: "What is wrong with def f(x, seen=[])?", choices: ["Nothing", "The default list is created once and shared between calls", "Lists can't be defaults", "It is a syntax error"], answer: 1, why: "Calls that omit seen all modify the same list." },
        { q: "Why can no static analyzer find exactly the bugs in every program, with no false alarms?", choices: ["Computers are too slow", "Rice's theorem: nontrivial properties of program behavior are undecidable", "Python is dynamically typed", "Nobody has tried hard enough"], answer: 1, why: "It follows from the undecidability of the halting problem." },
        { q: "Which change is likely to get the most careful review?", choices: ["A 1,500-line change touching 40 files", "A 120-line change with a clear description and passing CI", "A change with no description", "A change submitted at midnight"], answer: 1, why: "Small, well-described changes get real reviews; huge ones get skimmed." },
        { q: "What does a lock file prevent?", choices: ["Merge conflicts", "A new release of a dependency changing your build without any change to your code", "Two people editing one file", "Type errors"], answer: 1, why: "Pinned versions make builds reproducible." }
      ],
      practice: [
        {
          q: `<p>Extend the notes' <code>lint</code> function with a rule that flags comparisons with <code>None</code> using <code>==</code> or <code>!=</code> (Python style is <code>is None</code>). Hint: a comparison is an <code>ast.Compare</code> node with lists <code>ops</code> and <code>comparators</code>; <code>None</code> is <code>ast.Constant</code> with <code>value</code> None.</p>`,
          a: `<pre><code>def lint_none(source):
    problems = []
    for node in ast.walk(ast.parse(source)):
        if isinstance(node, ast.Compare):
            for op, right in zip(node.ops, node.comparators):
                if isinstance(op, (ast.Eq, ast.NotEq)) and isinstance(right, ast.Constant) and right.value is None:
                    problems.append((node.lineno, "use 'is None' or 'is not None'"))
    return problems

print(lint_none("x = 1\\nif x == None:\\n    pass\\n"))   # [(2, "use 'is None' or 'is not None'")]</code></pre><p>A full rule would also check the left side, for <code>None == x</code>.</p>`
        },
        {
          q: `<p>Write three review comments on this change, in the style the lesson recommends. One should be a question and one a "nit".</p>
<pre data-label="Diff"><code>+def top_students(students, n):
+    s = sorted(students, key=lambda x: x[1])
+    return s[:n]</code></pre>`,
          a: `<p>For example: (1) "This sorts in ascending order, so <code>s[:n]</code> gives the lowest scores. Should it be <code>reverse=True</code>? A test with three students would catch this." (2) "What should happen for ties at the cutoff, or if <code>n</code> is larger than the list? Worth a test either way." (3) "nit: <code>s</code> and <code>x</code> could be <code>ranked</code> and <code>student</code>; and a type hint like <code>list[tuple[str, float]]</code> would document the expected shape."</p>`
        },
        {
          q: `<p>Your team's CI takes 40 minutes, so people push several changes before checking results, and main is often red. Suggest three improvements.</p>`,
          a: `<p>Run fast checks (lint, types, unit tests) first, so most failures appear within a few minutes. Run the test suite in parallel across several machines, and find the slowest tests (pytest's <code>--durations</code>) to speed up or move to a later stage. Move slow end-to-end tests to a separate stage that runs on main or nightly, keeping a smaller set on every pull request. And restore the rule that red main is fixed first, reverting the breaking change if no fix is quick.</p>`
        }
      ],
      sources: ["googletw", "ghactions", "mypydocs", "pyast"]
    },
    {
      id: "se8",
      title: "Reliability, security and maintenance",
      minutes: 90,
      summary: "Keeping software working in the real world: handling errors, timeouts, retries with exponential backoff and jitter, logging, service-level objectives and error budgets, blameless postmortems, the most common security flaws (injection, broken access control, secrets, passwords) and how to prevent them, and living with old code.",
      notes: `
<p>Software that works in a demo fails in production in ways no test predicted: a disk fills, a network partner is slow, a user sends text in an alphabet you didn't expect, an attacker sends input designed to break you. This lesson is about building software that fails safely, recovers, and stays secure.</p>

<h3>Errors, failures and failing safely</h3>
<p>Engineers distinguish a <strong>fault</strong> (a defect or a broken component, such as a bug or a dead disk), an <strong>error</strong> (the wrong internal state the fault causes) and a <strong>failure</strong> (the system visibly not doing its job). Reliable systems assume faults will happen and stop them from becoming failures. Some principles:</p>
<ul>
<li><strong>Fail fast</strong> on bad input or impossible states: raise an exception with a clear message at once (Lesson 6's boundary validation) rather than carrying on with corrupt data.</li>
<li><strong>Don't swallow errors.</strong> <code>except: pass</code> turns a loud, fixable fault into a silent, mysterious failure later. Catch only the exceptions you can actually handle, where you can handle them.</li>
<li><strong>Fail safe.</strong> When something goes wrong, the system should end up in the least harmful state: a door lock whose controller crashes should know whether to fail open (a fire exit) or closed (a vault). An access check that errors should deny access.</li>
<li><strong>Set timeouts</strong> on every call to another system. Without one, a slow partner makes your requests wait, threads pile up, and their slowness becomes your outage.</li>
</ul>

<h3>Retries, backoff and jitter</h3>
<p>Many faults are transient: a dropped packet, a server restarting. Retrying helps, but naive retrying can make things worse. If a service is overloaded and every client retries immediately, the load doubles exactly when the service can least handle it. The standard approach is <strong>exponential backoff</strong>: wait 1 time unit before the first retry, 2 before the second, 4, 8, up to a maximum, so retries thin out. Add <strong>jitter</strong>, a random amount, so that thousands of clients that failed at the same moment don't all retry at the same moment too. Only retry operations that are safe to repeat (idempotent, Lesson 6), and only errors that might go away (a 503, not a 400).</p>
<pre><code>import random

def backoff_delays(attempts, base=0.5, cap=8.0, rng=random.random):
    """'Full jitter': a random wait between 0 and min(cap, base * 2**i) before retry i."""
    return [rng() * min(cap, base * 2 ** i) for i in range(attempts)]

print(backoff_delays(6, rng=lambda: 1.0))   # [0.5, 1.0, 2.0, 4.0, 8.0, 8.0]
random.seed(3)
print([round(d, 2) for d in backoff_delays(6)])   # [0.12, 0.54, 0.74, 2.42, 5.01, 0.52]</code></pre>
<p>Passing <code>rng</code> as a parameter (dependency injection again) lets the first call show the upper limits and lets tests control the randomness. Systems also use <strong>circuit breakers</strong>: after many failures in a row, stop calling the broken service for a while and fail immediately, giving it room to recover.</p>

<h3>Logging and observability</h3>
<p>When something fails in production, you can't attach a debugger; you have only what the system recorded. <strong>Logs</strong> are timestamped records of events. Python's <code>logging</code> module gives each message a <em>level</em> (DEBUG, INFO, WARNING, ERROR, CRITICAL), and configuration decides which levels are kept and where they go, so debug detail can be switched on without changing code:</p>
<pre><code>import logging, io

stream = io.StringIO()
logging.basicConfig(stream=stream, level=logging.INFO, format="%(levelname)s %(name)s: %(message)s", force=True)
log = logging.getLogger("orders")

log.debug("cart contents: %s", ["B-17"])          # below INFO: not recorded
log.info("order %d created for user %d", 1042, 7)
log.warning("payment slow: %.1f s", 4.2)
print(stream.getvalue(), end="")
# INFO orders: order 1042 created for user 7
# WARNING orders: payment slow: 4.2 s</code></pre>
<p>Good log messages say what happened with the identifiers needed to investigate it (order, user and request IDs), at the right level. Never log passwords, tokens, card numbers or other personal data you don't need (MATH 230 and CS 100 discussed privacy law). Beyond logs, services export <strong>metrics</strong> (counts and timings: requests per second, error rate, the 99th-percentile latency) and <strong>traces</strong> (one request's path through many services). Together these make a system <em>observable</em>: you can answer questions about its behavior from outside.</p>

<h3>Service-level objectives and error budgets</h3>
<p>No service is 100% available, and trying to be is ruinously expensive. Instead, teams agree a <strong>service-level objective</strong> (SLO): a target for a measured <strong>service-level indicator</strong>, such as "99.9% of requests in each 30-day window succeed in under 300 ms". The gap to 100% is the <strong>error budget</strong>. At 99.9% availability over 30 days, the budget is 0.1% of 43,200 minutes, 43.2 minutes of downtime.</p>
<pre><code>def budget_minutes(slo, days=30):
    return (1 - slo) * days * 24 * 60

for slo in (0.99, 0.999, 0.9999):
    print(slo, round(budget_minutes(slo), 1))
# 0.99 432.0
# 0.999 43.2
# 0.9999 4.3</code></pre>
<p>Each extra nine cuts the budget tenfold, and costs far more than the last. The budget turns arguments about reliability into a rule. If it isn't spent, the team can release faster and take risks. If it is used up, releases slow down and reliability work comes first. This practice comes from Google's site reliability engineering (SRE).</p>

<h3>Incidents and blameless postmortems</h3>
<p>When a failure affects users, the first priority is to <strong>mitigate</strong>: restore service, often by rolling back the last change, before understanding the cause. Afterwards, the team writes a <strong>postmortem</strong>: a timeline, the impact, the root causes and contributing factors, and action items to prevent a repeat or limit the damage. Effective postmortems are <strong>blameless</strong>. They assume people acted reasonably given what they knew and ask why the system let a reasonable action cause harm. "An engineer ran the wrong command" leads to "be more careful". "The tool let a command delete production data with no confirmation, and staging and production looked identical" leads to fixes. Blame makes people hide mistakes, and hidden mistakes can't be learned from. CS 100's case studies (the Therac-25, Ariane 5) are postmortems of this kind.</p>

<h3>Security: the common flaws</h3>
<p>Security means the system does what it should even when someone is trying to make it do something else. The OWASP Top 10, a widely used list of the most serious web application risks, is dominated by a few kinds of flaw.</p>
<p><strong>Injection.</strong> Building a command, such as a database query, by pasting user input into a string lets the input change the command's structure. Databases are queried in SQL, a language CS 340 covers; here, it's enough to see the shape of the problem:</p>
<pre><code>def find_user_query(name):
    return "SELECT * FROM users WHERE name = '" + name + "'"

print(find_user_query("ana"))
# SELECT * FROM users WHERE name = 'ana'
print(find_user_query("x' OR '1'='1"))
# SELECT * FROM users WHERE name = 'x' OR '1'='1'</code></pre>
<p>The second "name" closes the quote and adds a condition that is always true, so the query returns every user. Worse inputs can delete tables. The fix is never to build commands from strings: use <strong>parameterized queries</strong>, where the query and the data are sent separately and the data can never be read as code. With Python's built-in <code>sqlite3</code> module:</p>
<pre data-label="app.py"><code>cursor.execute("SELECT * FROM users WHERE name = ?", (name,))</code></pre>
<p>The same principle, keeping code and data apart, prevents <em>cross-site scripting</em> (escape user text before putting it into HTML, as this course's own notes escape <code>&lt;</code>) and <em>command injection</em> (pass a list of arguments to <code>subprocess.run</code>, never a shell string).</p>
<p><strong>Broken access control</strong>, number one on the 2021 list: the server checks that you're logged in but not that you may see <em>this</em> record, so changing <code>/grades/1041</code> to <code>/grades/1042</code> shows someone else's grades. Every request must check authorization on the server; hiding a button in the interface protects nothing. Lesson 1's third acceptance criterion was this requirement.</p>
<p><strong>Secrets in code.</strong> API keys and passwords committed to a repository are found by automated scanners within minutes of being pushed to a public one. Keep secrets in environment variables or a secrets manager, out of Git (Lesson 2), and rotate any secret that leaks.</p>
<p><strong>Storing passwords.</strong> Never store passwords, even encrypted. Store a <em>salted, slow hash</em>: add a random value (the salt) to each password, then apply a hash function designed to be expensive, so that a stolen database can't be cracked quickly or with precomputed tables. Python's <code>hashlib.scrypt</code> and <code>hashlib.pbkdf2_hmac</code> do this. To check a login, hash the attempt with the same salt and compare.</p>
<pre><code>import hashlib, hmac, os

def hash_password(password, salt=None):
    salt = salt if salt is not None else os.urandom(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 100_000)
    return salt, digest

def check_password(password, salt, digest):
    return hmac.compare_digest(hash_password(password, salt)[1], digest)

salt, digest = hash_password("correct horse battery staple")
print(check_password("correct horse battery staple", salt, digest), check_password("guess", salt, digest))   # True False</code></pre>
<p>100,000 iterations make each guess cost a noticeable fraction of a second, which a legitimate login doesn't notice and a billion-guess attack does. <code>hmac.compare_digest</code> compares in constant time, so the time taken doesn't leak how many bytes matched, a timing leak like those in CS 230's Spectre sidebar. In practice, use a well-reviewed library for authentication rather than writing your own; the point here is to know what it must do.</p>
<p>Two principles cover much of the rest. <strong>Least privilege</strong>: every component gets only the access it needs, so a compromise of one does limited harm. <strong>Defense in depth</strong>: several independent protections, so one mistake isn't enough to cause a breach.</p>

<h3>Maintenance and legacy code</h3>
<p>Most of the cost of software comes after its first release: fixing bugs, adapting to new platforms and laws, adding features, and paying down technical debt. Code without tests that nobody fully understands is often called <strong>legacy code</strong>. The tools of this course are how you work with it: characterization tests before changes (Lesson 4), small refactorings, version history and <code>git blame</code> to recover why decisions were made, and documentation (WRIT 100) for the next person. Deprecating features takes care too (Lesson 6): announce, warn, give users time, then remove. Sometimes the right decision is a rewrite, but rewrites are usually far larger than they look, because the old code embodies years of fixes for cases nobody remembers. Gradual replacement, one piece at a time behind a stable interface, usually beats a big-bang rewrite.</p>
`,
      terms: [
        ["Fault, error, failure", "A defect or broken part; the wrong state it causes; the system visibly not doing its job."],
        ["Fail safe", "Designing a system so that when something goes wrong it ends up in the least harmful state."],
        ["Timeout", "A limit on how long to wait for another system before giving up."],
        ["Exponential backoff", "Waiting longer before each retry, typically doubling the delay up to a cap."],
        ["Jitter", "Randomness added to retry delays so that many clients don't retry at the same moment."],
        ["Circuit breaker", "A mechanism that stops calling a failing service for a while after repeated failures."],
        ["Log level", "The severity of a log message (DEBUG, INFO, WARNING, ERROR, CRITICAL), used to filter which are kept."],
        ["Service-level objective (SLO)", "A target for a measured indicator of service quality, such as 99.9% of requests succeeding."],
        ["Error budget", "The amount of failure an SLO allows: 1 minus the target."],
        ["Blameless postmortem", "A write-up of an incident that looks for system causes rather than people to blame."],
        ["Injection", "A flaw in which user input is pasted into a command and changes its structure."],
        ["Parameterized query", "A query whose data is sent separately from its code, so data can't be run as code."],
        ["Broken access control", "Failing to check, on the server, that a user may access a particular resource."],
        ["Salted hash", "A password stored as a slow hash of the password plus a random per-user value."],
        ["Least privilege", "Giving every component only the access it needs."],
        ["Legacy code", "Old code, often without tests, that nobody fully understands but that must keep working."]
      ],
      quiz: [
        { q: "Why add jitter to exponential backoff?", choices: ["To make retries faster", "So clients that failed together don't all retry at the same instant", "To make delays shorter on average", "Because exponential backoff is wrong"], answer: 1, why: "Synchronized retries create new spikes of load." },
        { q: "Which error is worth retrying?", choices: ["400 Bad Request", "404 Not Found", "503 Service Unavailable", "422 Unprocessable Content"], answer: 2, why: "The service may recover; the others will fail the same way again." },
        { q: "What is the monthly error budget (30 days) for a 99.95% availability SLO?", choices: ["About 2 minutes", "About 22 minutes", "About 43 minutes", "About 3.6 hours"], answer: 1, why: "0.0005 × 43,200 = 21.6 minutes." },
        { q: "A user changes /invoices/88 to /invoices/89 in the address bar and sees another customer's invoice. What kind of flaw is this?", choices: ["Injection", "Broken access control", "Cross-site scripting", "A weak password"], answer: 1, why: "The server didn't check that this user may see invoice 89." },
        { q: "How should passwords be stored?", choices: ["As plain text in a protected table", "Encrypted with a key on the server", "As a salted, deliberately slow hash", "As a fast SHA-256 hash"], answer: 2, why: "A stolen database then can't be cracked quickly." },
        { q: "Why are postmortems written to be blameless?", choices: ["To protect the guilty", "Because blame makes people hide mistakes, and the useful fixes are in the system that allowed them", "It's a legal requirement", "Mistakes don't matter"], answer: 1, why: "Look for why the system let a reasonable action cause harm." }
      ],
      practice: [
        {
          q: `<p>Write <code>call_with_retries(fn, attempts, sleep, delays)</code> that calls <code>fn()</code>, and if it raises <code>ConnectionError</code>, waits <code>delays[i]</code> by calling <code>sleep(delays[i])</code> and tries again, up to <code>attempts</code> calls in total. Any other exception should propagate at once. Why pass <code>sleep</code> as a parameter?</p>`,
          a: `<pre><code>def call_with_retries(fn, attempts, sleep, delays):
    for i in range(attempts):
        try:
            return fn()
        except ConnectionError:
            if i == attempts - 1:
                raise
            sleep(delays[i])

slept, tries = [], []
def flaky():
    tries.append(1)
    if len(tries) &lt; 3:
        raise ConnectionError("down")
    return "ok"

print(call_with_retries(flaky, 5, slept.append, [1, 2, 4, 8]), slept)   # ok [1, 2]</code></pre><p>Passing <code>sleep</code> in lets the test record the delays instead of waiting for them (Lesson 3's injected clock).</p>`
        },
        {
          q: `<p>A service has a 99.9% monthly SLO. On day 10 of the month, an outage lasts 35 minutes. What fraction of the error budget remains, and what should the team do for the rest of the month?</p>`,
          a: `<p>The budget is 43.2 minutes; 35 are used, so 8.2 minutes (about 19%) remain. The team should slow down risky releases, prioritize the postmortem's action items and reliability work, and perhaps require extra review or a canary for any change until the budget recovers next month.</p>`
        },
        {
          q: `<p>Find the security problems in this login handler and say how to fix each:</p>
<pre data-label="Python"><code>def login(db, name, password):
    row = db.query("SELECT pw FROM users WHERE name = '" + name + "'")
    if row and row.pw == password:
        log.info("login ok: %s / %s", name, password)
        return True
    return False</code></pre>`,
          a: `<p>(1) SQL injection: use a parameterized query. (2) Passwords are stored and compared as plain text: store a salted slow hash and check with <code>check_password</code> from the notes. (3) The log records the password: log the user name (or ID) only. (4) Unlimited attempts allow guessing: add rate limiting or lockout after repeated failures. Also, a failed login should give the same response whether or not the user exists, so attackers can't discover valid names.</p>`
        },
        {
          q: `<p>Write a short blameless postmortem summary (impact, root cause, three action items) for: "A migration script deleted 2 hours of students' saved drafts. The engineer ran it against production, believing it was the test database; both were named <code>drafts</code>. Backups existed but restoring took 6 hours because nobody had practised it."</p>`,
          a: `<p>Impact: students lost up to 2 hours of drafts; restoration took 6 hours. Root cause: the migration tool gave no indication of which database it targeted, and the production and test databases had identical names. Contributing factor: restore procedures had never been rehearsed. Actions: (1) name environments distinctly and have destructive tools display the target and require typing its name to confirm; (2) give migration scripts a dry-run mode and test them against a copy of production first; (3) rehearse restores quarterly and document the steps. None of these is "the engineer should be more careful".</p>`
        }
      ],
      sources: ["srebook", "owasp", "googletw"]
    }
  ]
});

CSA.addAsides("cs240", {
  se1: [
    { kind: "history", title: "The software crisis and 'software engineering'", html: `<p>The phrase "software engineering" was chosen, provocatively, as the title of a NATO conference in Garmisch, Germany, in 1968. By then computers had grown powerful enough for very large programs, and projects such as IBM's OS/360 operating system were late, over budget and full of bugs. People spoke of a "software crisis". The organizers wanted software built with the discipline of established engineering fields. Fred Brooks, who managed OS/360, drew the lessons in <em>The Mythical Man-Month</em> (1975), including <em>Brooks's law</em>: "adding manpower to a late software project makes it later", because new people need training and every added person adds lines of communication. With <em>n</em> people there are <em>n</em>(<em>n</em> − 1)/2 pairs who may need to talk.</p>` }
  ],
  se3: [
    { kind: "ethics", title: "When testing is a safety question", html: `<p>In 2018 and 2019, two Boeing 737 MAX airliners crashed, killing 346 people. Investigations found that a flight-control system, MCAS, relied on a single angle-of-attack sensor, and that when that sensor failed, the software repeatedly pushed the aircraft's nose down. The failure of one sensor had been analyzed as less likely and less severe than it proved, and pilots had not been told the system existed. No single test was "missing". The problems were in requirements, in assumptions about how the system would be used, and in the analysis of what happens when a component fails, which is why safety-critical fields test hazards and failure modes, not only features. CS 100 Lesson 5 discussed the Therac-25 for the same reasons.</p>` }
  ],
  se5: [
    { kind: "history", title: "From buildings to software", html: `<p>Christopher Alexander's <em>A Pattern Language</em> (1977) described 253 patterns for towns and buildings, such as "Light on two sides of every room", each a problem, its context and a solution that could be applied "a million times over, without ever doing it the same way twice". Kent Beck and Ward Cunningham applied the idea to user-interface design in 1987, and the Gang of Four's catalogue followed in 1994. Cunningham also invented the wiki in 1995, to collect patterns collaboratively; Wikipedia's software descends from it.</p>` }
  ],
  se8: [
    { kind: "history", title: "The 2017 Equifax breach", html: `<p>In 2017 attackers stole personal data, including national identification numbers, of about 147 million people from Equifax, a credit-reporting company. They entered through a known vulnerability in Apache Struts, an open-source web framework. A fix had been published two months earlier, but Equifax hadn't applied it to that system, partly because nobody had a complete list of where Struts was used. Many failures had to line up: unpatched software, an expired certificate that blinded a monitoring tool for months, and internal systems that let the attackers move from one database to the next. Most breaches look like this: not a brilliant attack, but known weaknesses left in place, which is why dependency tracking, patching, least privilege and defense in depth matter.</p>` }
  ]
});
