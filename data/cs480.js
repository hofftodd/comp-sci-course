CSA.addCourse({
  id: "cs480",
  code: "CS 480",
  title: "Ethics, Law and Policy of Computing",
  credits: 4,
  kind: "required",
  term: "y4s",
  summary: "The senior seminar on how law, ethics and public policy meet real systems: professional duties and raising concerns; intellectual property and software licenses; privacy law and privacy engineering (k-anonymity, differential privacy); algorithmic fairness and anti-discrimination law; safety and liability; computer-crime law and vulnerability disclosure; platform liability and content moderation; and AI governance, accessibility law and how technologists take part in making policy. Each lesson pairs discussion and writing with programming problems that make the technical side concrete. Legal facts are current to November 2026, with US and EU law in most depth; the course teaches about the law and is not legal advice.",
  prereqs: ["CS 100 Computing in Society", "CS 380 Security Fundamentals"],
  practiceLabels: { title: "Problems, discussion and writing", intro: "Work the analysis problems, prepare notes on each discussion question before the seminar meeting, and submit the writing assignment by the due date. Open the guidance only after you have drafted your own answer.", answer: "Worked answer or what a strong response does" },
  outcomes: [
    "Read a legal citation, tell a statute from a regulation, a case and a directive, and say which jurisdiction a rule binds and how to check whether it is still current",
    "Carry out a stakeholder analysis, explain a computing professional's duties, and plan how to raise a concern, including when whistleblowing protections apply",
    "Explain copyright, fair use, patents and trade secrets as they apply to software, check license compatibility across a dependency graph, and summarize the state of the AI training-data disputes",
    "Apply the main obligations of the GDPR and US sectoral privacy laws, and implement and critique k-anonymity and the Laplace mechanism with a privacy budget",
    "Compute group fairness metrics, explain why they conflict, and apply disparate-impact doctrine and the four-fifths rule",
    "Analyze software failures with fault trees and safety cases, and explain how negligence, product liability and contracts allocate responsibility",
    "Explain the CFAA after Van Buren, anti-circumvention law, and the norms and new legal duties of vulnerability disclosure",
    "Compare Section 230 with the EU Digital Services Act, and analyze content moderation as a precision and recall problem at scale",
    "Classify AI systems under the EU AI Act, use the NIST AI RMF, apply accessibility law, and write an effective public comment on a proposed rule"
  ],
  rubric: {
    criteriaFor: "weekly writing, the policy brief and the hearing",
    assessments: [
      { name: "Seminar participation", weight: 15, desc: "Coming prepared to each meeting's discussion questions, contributing, and responding to classmates' points. Quality matters more than quantity." },
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts." },
      { name: "Programming problems", weight: 15, desc: "Each lesson's auto-graded problems, plus the analysis problems in the practice set (worked by hand and handed in)." },
      { name: "Weekly writing", weight: 20, desc: "The writing assignment at the end of each lesson, 500–800 words. Graded with the criteria below; your lowest score is dropped." },
      { name: "Policy brief", weight: 25, desc: "A 2,500-word brief to a real decision maker (a legislator, regulator, standards body or company policy team) on a question pending in 2026, with a technical appendix that includes a measurement, simulation or prototype. A draft gets peer and instructor feedback before the final version." },
      { name: "Mock hearing", weight: 15, desc: "A 6-minute statement presenting your brief to a panel of classmates playing legislators or regulators, followed by 6 minutes of questions." }
    ],
    criteria: [
      { name: "Argument", desc: "Is there a clear, defended position?", levels: [
        "States a specific position or recommendation, develops it step by step, and answers the strongest objection.",
        "Has a position, but it is broad or some steps are weak.",
        "Describes the issue without taking or defending a position.",
        "No discernible argument." ] },
      { name: "Evidence and legal accuracy", desc: "Are the facts, laws and sources right?", levels: [
        "States the law accurately with its jurisdiction and date, cites primary sources, presents contested points as contested, and checks current status.",
        "Mostly accurate; a citation is missing, a source is secondary where a primary one was available, or a status is out of date.",
        "Relies on opinion or a single source; some legal claims are wrong or unsourced.",
        "No evidence, or evidence that is wrong." ] },
      { name: "Technical reasoning", desc: "Does the technical analysis hold up?", levels: [
        "Connects the law or ethics to how the system actually works, with correct numbers, a sound model, and limits stated.",
        "Technically sound but shallow, or with a minor error.",
        "Technical claims are vague or partly wrong.",
        "No technical analysis, or it is wrong." ] },
      { name: "Clarity", desc: "Can the intended reader follow and act on it?", levels: [
        "Organized for its reader, concise and precise; legal and technical terms are explained.",
        "Generally clear, with some wordiness or unexplained jargon.",
        "Hard to follow in places; ideas are out of order.",
        "Disorganized and unclear." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Not legal advice:</b> this course teaches how law and policy work so that you can reason about them and work well with lawyers. It is not legal advice. For a real decision, ask a qualified lawyer in the relevant jurisdiction.",
      "<b>Currency:</b> legal facts here were checked in November 2026. Laws, rules and court cases change; in your writing, cite the primary source and say on what date you checked its status.",
      "<b>Respectful disagreement:</b> many questions in this course are contested by reasonable people. Challenge ideas, not people, and assume good faith.",
      "<b>AI assistants:</b> you may use them to brainstorm, to find sources and for feedback, and must say how. Check every legal claim an AI tool gives you against the primary source: invented citations have led to sanctions for practising lawyers (CS 100 Lesson 5). The argument and the writing must be your own.",
      "<b>Late work:</b> weekly writing is accepted up to three days late for half credit, because it feeds each meeting's discussion. The policy brief has three late days, then 10% a day."
    ]
  },
  units: [
    {
      id: "et1",
      title: "Professional ethics in practice",
      minutes: 90,
      summary: "How to read the law the rest of the course cites; stakeholder analysis with numbers; what the profession's codes ask of you; and how to raise a concern, escalate it, and when the law protects whistleblowers.",
      notes: `
<p>CS 100 Lesson 3 gave four questions for any ethical decision (What happens? What's owed? Who would I be? Who's left out?) and the ACM Code of Ethics. CS 380 added the ethics of security work. This course is for the point you are at now: about to be the engineer who builds, ships and answers for systems that law already regulates. It asks how law, ethics and policy meet real systems, using the technical depth you now have.</p>
<p class="note"><strong>A note on scope:</strong> this course teaches <em>about</em> the law. It is not legal advice, and it can't replace a lawyer for a real decision. Legal facts were checked in November 2026; each lesson says how to check them later.</p>

<h3>Law, ethics and policy</h3>
<p><strong>Law</strong> is rules a state enforces. <strong>Ethics</strong> is what we owe each other, whether or not anyone enforces it. <strong>Policy</strong> is the choices institutions make about which rules to have: a government's (should we regulate facial recognition?) or a company's (do we keep chat logs for a year?). Law is usually a floor: much that is legal is wrong, and law often follows ethics years later, after an argument is won. Engineers take part in all three.</p>

<h3>How to read the law</h3>
<p>Law comes from several sources, and you will meet each in this course:</p>
<ul>
<li>A <strong>statute</strong> is a law passed by a legislature. US federal statutes are collected in the United States Code by title and section: <em>17 U.S.C. § 107</em> is title 17 (copyright), section 107 (fair use).</li>
<li>A <strong>regulation</strong> (or rule) is made by an agency under power a statute gives it, after public notice and comment (Lesson 8). US federal regulations are in the Code of Federal Regulations: <em>29 C.F.R. § 1607.4</em>.</li>
<li><strong>Case law</strong>: in common-law systems such as the US and UK, courts' interpretations bind later courts below them. <em>Van Buren v. United States, 593 U.S. 374 (2021)</em> means volume 593 of the official reports of the Supreme Court, page 374, decided in 2021. The US federal system has district courts (trials), thirteen courts of appeals called circuits, and the Supreme Court. A circuit's ruling binds only courts in that circuit, so two circuits can disagree: a <strong>circuit split</strong>, which the Supreme Court often takes a case to resolve. Lower-court citations name the court in parentheses: "9th Cir." or "D.C. Cir." is the court of appeals for the Ninth or the District of Columbia Circuit; a district court is named by its district, so "N.D. Cal." is the Northern District of California (large states have several districts: N.D., S.D., E.D., C.D. for northern, southern, eastern, central) and "D.D.C." is the District Court for the District of Columbia, whose appeals go to the D.C. Circuit.</li>
<li>In the EU, a <strong>regulation</strong>, such as the GDPR, <em>Regulation (EU) 2016/679</em>, applies directly in every member state. A <strong>directive</strong> sets goals that each member state must <em>transpose</em> into its own law by a deadline, so the details vary by country. The Court of Justice of the EU (CJEU) has the last word on what EU law means.</li>
</ul>
<p>Two habits matter more than any single rule. First, ask <strong>which jurisdiction</strong>: a rule binds only where it applies, and one product may be subject to the laws of every place it has users. Second, ask <strong>as of when</strong>: laws are amended, rules are delayed, and cases are appealed. Check the primary source (the official text, the court's opinion or docket) and write down the date you checked.</p>

<h3>Stakeholder analysis with numbers</h3>
<p>A <strong>stakeholder</strong> is anyone a system affects, including people who never use it (CS 100 Lesson 3). A stakeholder analysis lists the groups, the options, and how each option affects each group. Writing it as a table forces precision. Return to CS 100's location-sharing feature, now with rough numbers on an agreed welfare scale (per person, negative is harm):</p>
<table>
<tr><th>Option</th><th>9,000 ordinary users</th><th>100 at-risk users</th><th>The company (1)</th></tr>
<tr><td>On by default</td><td>+2</td><td>−50</td><td>+5,000</td></tr>
<tr><td>Opt-in</td><td>+1</td><td>0</td><td>+3,000</td></tr>
<tr><td>Drop the feature</td><td>0</td><td>0</td><td>0</td></tr>
</table>
<p>A consequentialist total (size × change, summed) gives on-by-default 9,000 × 2 − 100 × 50 + 5,000 = 18,000, opt-in 9,000 + 3,000 = 12,000, and dropping it 0. The total favors the default. A <strong>maximin</strong> rule, in the spirit of Rawls's question "who's left out?", picks the option whose worst-off group fares best: on-by-default's worst is −50, the others' is 0, so it rules out the default. And "drop the feature" is <strong>Pareto-dominated</strong> by opt-in: opt-in is at least as good for every group and better for some, so no framework should prefer dropping it. The programming problem computes all three.</p>
<p>The numbers are guesses, and that is the point: the table makes the guesses explicit, so that people can argue about −50 instead of talking past each other. It also shows that a disagreement about the decision is often a disagreement about which rule to use, which no amount of data settles. What a total hides is <em>who</em> pays: 100 people bearing a serious risk so that 9,000 gain a convenience.</p>

<h3>What the profession asks of you</h3>
<p>The ACM Code (2018) says, under principle 1.2 (Avoid harm): "A computing professional has an additional obligation to report any signs of system risks that might result in harm. If leaders do not act to curtail or mitigate such risks, it may be necessary to 'blow the whistle' to reduce potential harm." It immediately adds that "capricious or misguided reporting of risks can itself be harmful", so you should first "carefully assess relevant aspects of the situation". Principle 2.5 asks for "comprehensive and thorough evaluations of computer systems and their impacts, including analysis of possible risks". The IEEE Code of Ethics begins with a commitment "to hold paramount the safety, health, and welfare of the public".</p>
<p>Unlike civil engineers, software engineers in the US are almost never licensed: the national exam for a professional-engineer license in software was discontinued after 2019 for lack of candidates. In Canada, by contrast, "engineer" is a regulated title, so provincial engineering regulators expect a "software engineer" to be licensed. Without a license, your duties come from codes, contracts, employment law and general law such as negligence (Lesson 5), and from your own judgment.</p>

<h3>Raising a concern</h3>
<p>Most concerns are resolved by ordinary engineering conversation, and the way you raise one decides whether it is heard. A sequence that works:</p>
<ol>
<li><strong>Check your facts.</strong> Reproduce the problem, measure it, and ask whether you might be missing context. Misguided reports cost credibility.</li>
<li><strong>Write it down</strong> in a short memo: what you observed, the risk (who could be harmed, how badly, how likely), what you recommend, and by when a decision is needed. Keep a dated copy of what you sent, through channels you are allowed to use.</li>
<li><strong>Raise it with the people who can fix it</strong>: your team, then your manager. Bring options, not just objections (CS 100's "what could we do?").</li>
<li><strong>Escalate</strong> if it is serious and nothing happens: a skip-level manager, a design review, the security, safety, privacy or ethics office, internal audit, or the legal or compliance team (many companies run an anonymous hotline).</li>
<li><strong>Go outside</strong> (to a regulator, then the public) only when the harm is serious and internal routes have failed or can't be trusted.</li>
</ol>
<p>The philosopher Richard De George proposed conditions under which whistleblowing is permitted: the harm is serious, you have reported it to your superior, and you have exhausted internal channels. It becomes an obligation, he argued, when you also have documented evidence that would convince a reasonable observer and good reason to believe that going public will prevent the harm. Critics reply that the conditions ask too much of people with little power. Use them as questions, not a formula.</p>

<h3>When the law protects whistleblowers</h3>
<p>Speaking up can cost a job, and protection depends on jurisdiction and subject. The US has no general law protecting private-sector whistleblowers; protection comes from laws on particular subjects:</p>
<ul>
<li>The <strong>Sarbanes-Oxley Act</strong> (2002) protects employees of publicly traded companies who report securities fraud; the <strong>Dodd-Frank Act</strong> (2010) adds an SEC program that pays 10–30% of sanctions over $1 million to whistleblowers whose information leads to them.</li>
<li>The <strong>Defend Trade Secrets Act</strong> (2016) gives immunity for disclosing a trade secret in confidence to a government official or a lawyer solely to report a suspected violation of law (Lesson 2).</li>
<li>Sector laws protect employees in aviation, nuclear power, health care and other fields. California's <strong>SB 53</strong> (2025) protects employees of developers of the largest AI models who report catastrophic risks or violations, and requires large developers to run an anonymous internal reporting channel.</li>
</ul>
<p>The EU's <strong>Whistleblower Directive</strong> (2019/1937) protects people who report breaches of EU law in listed areas, including data protection, network security, product safety and consumer protection. Organizations with 50 or more workers must provide internal reporting channels; people may report internally or straight to the authorities, and are protected when they go public if those routes failed or the danger is imminent. Since 2 August 2026 it explicitly covers reports of AI Act violations (Article 87 of the AI Act).</p>
<p>In 2021 Frances Haugen, a product manager on Facebook's civic integrity team, gave internal research documents to the Wall Street Journal, filed complaints with the SEC, and testified to the US Senate that the company's own studies had found harms to teenagers that it played down in public. Her SEC complaints framed the harms as securities fraud: they alleged that Facebook had misled investors, whose decisions depend on accurate public statements, by saying in public the opposite of what its own research found. Framed that way, her reports to the SEC fell under Dodd-Frank, which forbids retaliation against people who report possible securities violations to the SEC (the Supreme Court held in <em>Digital Realty v. Somers</em>, 2018, that this protection covers only reports made to the SEC itself); none of these laws covers handing documents to a newspaper. On internal channels, the public record shows that she said she lost trust in the company after it dissolved the civic integrity team in December 2020, and that she gathered internal research posted by other employees, not that she escalated formally to managers before she left in May 2021. Whether her disclosures were justified, and whether the research showed what she said, is still debated; the case shows that the legal route she used (the SEC) shaped what protection she had.</p>
<p class="note"><strong>Why it matters:</strong> the most important ethical decisions in an engineering career are usually not dramatic. They are whether to raise a concern in a design review, and whether to keep raising it when the first answer is no.</p>
`,
      terms: [
        ["Statute", "A law passed by a legislature, such as a section of the United States Code."],
        ["Regulation (US agency rule)", "A binding rule made by a government agency under power a statute gives it, usually after public notice and comment."],
        ["EU regulation and directive", "A regulation applies directly in every EU member state; a directive must be transposed into each state's own law by a deadline."],
        ["Circuit split", "Disagreement between US federal courts of appeals on a question of law, often a reason for the Supreme Court to take a case."],
        ["Stakeholder analysis", "Listing everyone a decision affects and how each option affects each group."],
        ["Maximin", "Choosing the option whose worst-off group fares best."],
        ["Pareto-dominated", "Worse than another option for some group and better for none."],
        ["Escalation", "Raising a concern with successively higher or more independent people when it is not resolved."],
        ["Whistleblowing", "Disclosing wrongdoing or serious risk to people outside the normal chain of responsibility, such as a regulator or the public."]
      ],
      quiz: [
        { q: "What does the citation 29 C.F.R. § 1607.4 refer to?", choices: ["A section of a federal agency regulation", "A Supreme Court opinion", "An EU directive", "A state statute"], answer: 0, why: "The Code of Federal Regulations collects US agency rules; title 29 covers labor." },
        { q: "How does an EU directive differ from an EU regulation?", choices: ["A directive is advisory only", "Directives apply only to governments", "A directive must be transposed into each member state's law, so details vary; a regulation applies directly", "There is no difference"], answer: 2, why: "The GDPR is a regulation and applies directly; the Whistleblower Directive had to be written into national laws." },
        { q: "In the lesson's table, why is \"drop the feature\" Pareto-dominated?", choices: ["It has the lowest total", "It harms at-risk users", "It is never chosen by maximin", "Opt-in is at least as good for every group and better for some"], answer: 3, why: "Domination compares group by group, without needing to add up welfare across people." },
        { q: "A total-welfare rule picks on-by-default while maximin rejects it. What does that show?", choices: ["The numbers are wrong", "The disagreement is about which decision rule to use, which more data alone won't settle", "Maximin is always right", "Consequentialism ignores numbers"], answer: 1, why: "The same table gives different answers under different rules; choosing a rule is an ethical question." },
        { q: "Under the ACM Code's principle 1.2, what should you do before reporting a risk outside your organization?", choices: ["Carefully assess the situation, since misguided reports can themselves cause harm, and normally give leaders a chance to act", "Nothing; report immediately", "Get your manager's permission", "Publish anonymously"], answer: 0, why: "The Code allows whistleblowing when leaders don't act, but warns against capricious or misguided reporting." },
        { q: "Which statement about US whistleblower protection is accurate?", choices: ["A single federal law protects every private-sector employee", "Whistleblowers are never protected", "Protection comes from subject-specific laws, such as Sarbanes-Oxley for securities fraud", "Only government employees are protected"], answer: 2, why: "The US relies on laws for particular subjects and sectors; the EU directive is broader but limited to breaches of EU law in listed areas." }
      ],
      practice: [
        {
          q: `<p><strong>Analyze.</strong> A hospital is choosing how to roll out an AI triage tool. Groups: 50,000 typical patients, 2,000 patients who don't speak English (the tool was trained mostly on English notes), and 300 staff. Per-person welfare changes: <em>Deploy now</em>: +3, −10, +20. <em>Deploy with interpreter review</em>: +2, +1, +5. <em>Wait a year</em>: 0, 0, 0. Compute each option's total and worst-off value. Which does each rule choose, and is any option dominated?</p>`,
          a: `<p>Totals: deploy now 150,000 − 20,000 + 6,000 = 136,000; with review 100,000 + 2,000 + 1,500 = 103,500; wait 0. Worst-off: −10, +1, 0. The total rule picks <em>deploy now</em>; maximin picks <em>with review</em>. <em>Wait</em> is dominated by <em>with review</em> (better for every group). A strong answer notes that the −10 for patients who don't speak English is the kind of harm a total hides, and asks how the −10 was estimated (Lesson 4's disaggregated evaluation).</p>`
        },
        {
          q: `<p><strong>Discuss.</strong> You find that your company's retention job never deletes data from backups, although the privacy policy promises deletion within 30 days. Draft the five-sentence memo you would send your manager, following the lesson's "write it down" step. Then say what you would do if, two weeks later, nothing has happened.</p>`,
          a: `<p>A strong memo states the observation (with evidence: the job's code path, a test showing a deleted record still in last month's backup), the risk (a false promise to users; breach of GDPR's storage limitation if EU users are affected; exposure if backups leak), a recommendation with options (expire backups on a schedule, or encrypt each user's backup data with a per-user key and delete the key, called crypto-shredding), and a date. Escalation: a reminder, then the privacy or legal team, which has its own duty to act; going outside is not yet justified.</p>`
        },
        {
          q: `<p><strong>Discuss.</strong> Apply De George's conditions to Frances Haugen's disclosures as the lesson describes them. Which conditions do you think were met, which are disputed, and does the SEC route change your view?</p>`,
          a: `<p>Strong answers take each condition in turn: seriousness of the harm (contested: the internal studies were small and their interpretation disputed), internal reporting and exhausted channels (the record shows no formal escalation; she had worked inside the integrity team and said she had lost trust after it was dissolved, so the question is whether De George's conditions can be excused when internal routes seem futile), documented evidence (she had the documents), and likelihood of preventing harm. They note that the SEC route gave legal protection and an official recipient, which is closer to "report to a regulator" than to "go to the public", although she also went to the press. They distinguish whether disclosure was <em>permitted</em> from whether it was <em>obligatory</em>.</p>`
        },
        {
          q: `<p><strong>Write (500–800 words).</strong> Find a documented case in which an engineer or technologist raised a concern about a computing system (inside a company, to a regulator or in public). Describe what they raised, through which channels and in what order, what happened, and what legal protection, if any, applied in their jurisdiction. End with what you would have done differently, and why.</p>`,
          a: `<p>Uses primary or well-sourced reporting; distinguishes the escalation steps; names the specific law (if any) that applied and its jurisdiction; evaluates the choices with the ACM Code and at least one framework from CS 100; and gives a concrete alternative rather than general advice.</p>`
        }
      ],
      sources: ["acm", "whistleblowerdir", "sep"]
    },
    {
      id: "et2",
      title: "Intellectual property and software licenses",
      minutes: 90,
      summary: "Copyright, fair use, patents and trade secrets as they apply to code; license conditions and why compatibility is one-way; SPDX expressions; and the state of the lawsuits over training AI on copyrighted work.",
      notes: `
<p>CS 102's optional lesson introduced copyright and open-source licenses: code is copyrighted automatically, a license is permission with conditions, permissive licenses ask for little, and copyleft licenses require derivatives to stay under the same terms. This lesson adds the rest of the toolkit, makes license compatibility precise, and looks at the largest open question in the field: whether training AI models on copyrighted work is lawful.</p>

<h3>Four ways to own an idea</h3>
<table>
<tr><th>Tool</th><th>Protects</th><th>How you get it</th><th>How long (US)</th></tr>
<tr><td>Copyright</td><td>Original expression fixed in a medium: source code, binaries, documentation, images</td><td>Automatically, when written</td><td>Author's life + 70 years; for works made for hire, 95 years from publication or 120 from creation, whichever ends first</td></tr>
<tr><td>Patent</td><td>An invention: a new, useful, non-obvious process or machine</td><td>Application and examination by a patent office</td><td>20 years from filing</td></tr>
<tr><td>Trade secret</td><td>Information valuable because it is secret, such as a ranking algorithm's weights</td><td>Keeping it secret with reasonable measures</td><td>As long as it stays secret</td></tr>
<tr><td>Trademark</td><td>Names and logos that identify a source</td><td>Use, and optionally registration</td><td>As long as it is used</td></tr>
</table>
<p>Copyright protects expression, not ideas: 17 U.S.C. § 102(b) excludes "any idea, procedure, process, system, method of operation". So you may reimplement an algorithm you read in CLRS, but not copy its authors' code. Code you write as an employee is usually a <em>work made for hire</em> owned by your employer, and employment contracts usually assign your inventions too. (Some states limit this: California's Labor Code § 2870 bars assigning inventions made entirely on your own time without the employer's equipment or information, unless they relate to the employer's business.)</p>

<h3>Fair use</h3>
<p>US law allows some uses of copyrighted work without permission. Section 107 asks courts to weigh four factors: (1) the purpose and character of the use, including whether it is commercial and whether it is <strong>transformative</strong> (serves a different purpose rather than substituting for the original); (2) the nature of the work (factual works get less protection than creative ones); (3) the amount used; and (4) the effect on the market for the original. No factor decides alone, which makes outcomes hard to predict.</p>
<p>In <em>Google v. Oracle</em> (2021), Google had copied about 11,500 lines of "declaring code" (the method headers) from 37 Java API packages into Android so that Java programmers could use familiar calls. The Supreme Court, 6–2, held this fair use: the copying let programmers carry their skills to a new platform, the declaring code was bound up with uncopyrightable ideas, and it was a small part of the whole. It did not decide whether APIs are copyrightable at all. In <em>Andy Warhol Foundation v. Goldsmith</em> (2023) the Court narrowed "transformative": a new use that shares the original's commercial purpose (licensing an image to a magazine) weighs against fair use, even if it adds new meaning. Other countries mostly have narrower, listed exceptions; the EU has no general fair use.</p>

<h3>Patents and trade secrets</h3>
<p>Software patents exist but are limited. Under <em>Alice Corp. v. CLS Bank</em> (2014), a claim to an abstract idea (such as intermediated settlement of trades) is not patentable merely because it runs on a computer; it needs an "inventive concept" beyond the idea itself. Many software patents were invalidated afterwards. In Europe, the European Patent Convention excludes programs "as such", but inventions that solve a technical problem with software can be patented. Patents matter to engineers because infringement doesn't require copying: you can infringe a patent you have never seen.</p>
<p>A trade secret lasts only while you keep it secret, and it doesn't stop anyone from discovering the same thing independently or by reverse engineering a product they bought. The US <strong>Defend Trade Secrets Act</strong> (2016) gives a federal civil claim for misappropriation. When Anthony Levandowski left Google's self-driving project for Uber in 2016, he took thousands of design files; Waymo's suit settled in 2018 with Uber giving Waymo equity worth about $245 million, and Levandowski pleaded guilty to theft of a trade secret (he was later pardoned). The lesson for engineers: when you change jobs, take your skill and nothing else.</p>

<h3>License conditions and compatibility</h3>
<p>Open-source licenses are enforceable: in <em>Jacobsen v. Katzer</em> (2008) a US appeals court held that breaking an open-source license's conditions is copyright infringement, not just a broken promise. Each license's conditions apply when you <em>distribute</em> the code (and, for the AGPL, when users interact with it over a network). When your program includes code under several licenses, you must satisfy all of them at once, and the program as a whole goes out under one outbound license. Two licenses are <strong>compatible</strong> in one direction when code under the first can be included in a work distributed under the second.</p>
<ul>
<li>MIT and BSD code can go into almost anything, including proprietary software, as long as the notices are kept.</li>
<li>Apache-2.0 is also permissive: its code can go into proprietary software if you keep its notices (including any NOTICE file) and mark files you changed. It also grants a license to the contributors' patents, which <em>terminates</em> for anyone who sues claiming the code infringes a patent. Apache-2.0 code can go into GPL-3.0 programs but, in the Free Software Foundation's view, not GPL-2.0-only ones, because that patent-termination term is an additional restriction that GPLv2 forbids.</li>
<li>GPL code forces the whole program to be GPL. "GPL-2.0-only" and "GPL-3.0" are incompatible with each other; code licensed "GPL-2.0-or-later" can be used under version 3, which is why the suffix matters. GPLv3 section 13 lets GPLv3 code be combined with AGPLv3 code, and the AGPL's terms then apply to the combination as a whole, so a program containing GPL-3.0 code may go out under GPL-3.0 or under AGPL-3.0.</li>
<li>MPL-2.0 is "file-level" copyleft: changes to MPL files stay MPL, but the larger work can be under any license. If you ship MPL files in a binary, even unmodified, you must make their source available and tell recipients how to get it (section 3.2); the rest of your source stays closed.</li>
<li>Code with no license grants no permission at all (CS 102).</li>
</ul>
<p>A license is permission from the copyright holders, and they can give other permission too. Many copyleft projects are <strong>dual-licensed</strong>: the same code is offered under the GPL or AGPL to everyone and under a paid commercial license to companies that want to keep their own code closed. When a dependency's license blocks your release, the options are to replace it, to get a different license from its holders, or to change your own release terms.</p>
<p>Compatibility is a relation on licenses, and a dependency graph applies it transitively: one GPL-3.0 package five levels down makes your whole distributed program GPL-3.0. The programming problems parse the <strong>SPDX</strong> expressions that package metadata uses (such as <code>MIT OR Apache-2.0</code>, a choice, and <code>MIT AND BSD-3-Clause</code>, both; <code>X WITH Y</code> means license X plus the <em>exception</em> Y, an extra permission its authors added, such as <code>GPL-2.0-only WITH Classpath-exception-2.0</code>, which lets programs under any license link to the library without becoming GPL) and check a dependency graph against a compatibility table. Real tools do this in CI, alongside the vulnerability scanners of CS 380 Lesson 8.</p>
<p>Licenses also shift. Several companies moved projects from open-source to "source-available" licenses that restrict competing cloud services: MongoDB's SSPL (2018), HashiCorp's Business Source License for Terraform (2023, which led to the OpenTofu fork) and Redis (2024, which led to the Valkey fork; Redis added the AGPL as an option in 2025). Pinning a dependency pins its license too; upgrading can change your obligations.</p>

<h3>Training AI on copyrighted work</h3>
<p>Large models are trained on copies of text, code and images, most of it copyrighted. Whether that is lawful is being decided now, case by case. As of November 2026:</p>
<ul>
<li><strong>United States.</strong> In <em>Bartz v. Anthropic</em> (N.D. Cal., June 2025), Judge Alsup held that training on lawfully acquired books was fair use, calling it "exceedingly transformative", but that downloading and keeping millions of pirated books was not, and sent that claim toward trial; Anthropic then settled for about $1.5 billion. The settlement covered only the roughly 482,000 pirated books that met the class's criteria (chiefly a timely US copyright registration: <strong>statutory damages</strong>, an amount per work fixed by the Copyright Act, $750 to $30,000 or up to $150,000 if the infringement was willful, which an owner can claim instead of proving actual losses, are available only for works registered before the infringement began or within three months of first publication), so it came to about $3,000 per covered book; and the court gave the settlement final approval in July 2026. In <em>Kadrey v. Meta</em> (June 2025), Judge Chhabria also found fair use, but only because the authors hadn't shown market harm, and suggested that "market dilution" by a flood of competing AI output could defeat fair use in another case. In <em>Thomson Reuters v. Ross Intelligence</em>, the first appellate decision on AI training, the Third Circuit held in September 2026 that copying Westlaw's headnotes to train a competing, non-generative legal search tool was not fair use. <em>The New York Times v. OpenAI and Microsoft</em> (filed December 2023) is part of a consolidated case in the Southern District of New York, still in pretrial proceedings. District-court rulings don't bind other courts, so the question is open. The Copyright Office's report on generative AI training (2025) concluded that some training uses will be fair and others won't.</li>
<li><strong>European Union.</strong> The 2019 Copyright in the Digital Single Market Directive allows text and data mining for research (Article 3) and for any purpose (Article 4) unless the rightsholder has reserved its rights "in an appropriate manner, such as machine-readable means" (an opt-out, often expressed in robots.txt or metadata). Since August 2025 the AI Act requires providers of general-purpose AI models to have a policy for respecting those opt-outs and to publish a summary of their training content.</li>
<li><strong>United Kingdom.</strong> In <em>Getty Images v. Stability AI</em> (November 2025), the High Court held that the Stable Diffusion model was not an "infringing copy" because it does not store the training images; Getty's appeal on that point was pending in the Court of Appeal in late 2026.</li>
</ul>
<p>A separate question is who owns model <em>output</em>. US copyright requires a human author: <em>Thaler v. Perlmutter</em> (D.C. Cir. 2025; the Supreme Court declined to hear it in 2026) refused registration for an image an AI system made on its own, and the Copyright Office says that prompts alone don't make you the author, though human selection, arrangement and modification can be protected. To check current status, search the case name on CourtListener (free US dockets) and read the Copyright Office's AI page.</p>
`,
      terms: [
        ["Copyright", "Automatic protection for original expression, including code, giving the owner exclusive rights to copy, adapt and distribute it."],
        ["Fair use", "A US defense allowing some unlicensed uses, judged by four factors: purpose (including transformativeness), nature of the work, amount, and market effect."],
        ["Transformative use", "A use that serves a different purpose from the original rather than substituting for it."],
        ["Trade secret", "Valuable information protected for as long as its owner keeps it secret with reasonable measures."],
        ["License compatibility", "Whether code under one license may be included in a work distributed under another; a one-way relation."],
        ["Outbound license", "The license under which a combined program as a whole is distributed."],
        ["SPDX expression", "A standard way to state licenses in metadata, combining identifiers with AND (comply with both), OR (choose one) and WITH (a license plus an exception granting extra permission)."],
        ["Text and data mining exception", "An EU copyright exception allowing automated analysis of works, which for commercial use rightsholders can opt out of."]
      ],
      quiz: [
        { q: "You read a sorting algorithm in a textbook and implement it yourself from the description. What does copyright say?", choices: ["You infringe the textbook's copyright", "You need a patent license", "You must use the textbook's license", "Copyright doesn't protect the algorithm itself, only the authors' expression of it"], answer: 3, why: "17 U.S.C. § 102(b) excludes ideas, procedures and methods of operation from copyright." },
        { q: "Which best describes the holding in Google v. Oracle (2021)?", choices: ["APIs can never be copyrighted", "Google's copying of Java declaring code was fair use", "Oracle won damages", "Android must be open source"], answer: 1, why: "The Court assumed the code was copyrightable and held Google's use fair; it didn't decide copyrightability." },
        { q: "Your MIT-licensed project depends on a library under GPL-3.0-or-later, which you distribute with it. What outbound license can the combined program use?", choices: ["MIT", "Any license", "GPL-3.0 (or AGPL-3.0)", "Proprietary"], answer: 2, why: "Copyleft applies to the combined work; your own files can stay MIT, but the whole program must be distributed under GPLv3 terms." },
        { q: "Why can't Apache-2.0 code be included in a GPL-2.0-only program, in the FSF's view?", choices: ["Apache's patent terms are additional restrictions that GPLv2 forbids", "Apache is proprietary", "GPLv2 forbids all permissive code", "Apache requires payment"], answer: 0, why: "GPLv3 was written to accept those terms; GPLv2 predates them." },
        { q: "What did the Third Circuit decide in Thomson Reuters v. Ross (2026)?", choices: ["All AI training is fair use", "Headnotes are not copyrightable", "Copying Westlaw headnotes to train a competing non-generative tool was not fair use", "The case was dismissed"], answer: 2, why: "It was a narrow ruling about a non-generative competitor; questions about generative models remain open." },
        { q: "Under EU law, a company wants to mine websites to train a commercial model. What must it respect?", choices: ["Nothing; mining is always allowed", "US fair use", "Only robots.txt for search engines", "Rightsholders' machine-readable opt-outs under the DSM Directive's Article 4"], answer: 3, why: "Commercial text and data mining is allowed unless rights are reserved, and the AI Act requires general-purpose model providers to have a policy to respect reservations." }
      ],
      practice: [
        {
          q: `<p><strong>Analyze.</strong> Your company will ship a closed-source desktop app. Its dependencies: <code>ui</code> (MIT), <code>net</code> (Apache-2.0), which depends on <code>zstd</code> (BSD-3-Clause OR GPL-2.0-only); <code>charts</code> (MPL-2.0); and <code>pdf</code> (AGPL-3.0-only). Which dependencies, if any, block a proprietary release? What are the options for each?</p>`,
          a: `<p><code>zstd</code>'s expression offers a choice, so take BSD-3-Clause: no problem. MIT, Apache-2.0 and MPL-2.0 all allow proprietary distribution (keep notices; for <code>charts</code>, offer the source of its MPL files, modified or not, and tell users where to get it; your own code stays closed). <code>pdf</code> under AGPL-3.0-only blocks it: the whole app would have to be AGPL. Options: replace it with a permissively licensed library, buy a commercial license if the authors dual-license (many AGPL projects do), or isolate it as a separate program (whether that avoids the AGPL is a legal question about what counts as one program; ask a lawyer).</p>`
        },
        {
          q: `<p><strong>Analyze.</strong> Apply the four fair-use factors to a hypothetical: a startup copies 50,000 public GitHub repositories, many under the GPL, to train a code-completion model it sells. The model occasionally outputs long verbatim passages of GPL code without the license notice.</p>`,
          a: `<p>(1) Purpose: commercial, but training is arguably transformative (Bartz); verbatim output is not, since it substitutes for the original. (2) Nature: code is functional, which favors fair use somewhat. (3) Amount: whole works copied for training, which courts have sometimes accepted when necessary for a transformative purpose; verbatim output of long passages weighs against. (4) Market: little market for licensing individual repositories, but output that reproduces code without its license undercuts the license's conditions. Strong answers separate the training question from the output question, note that GPL code is licensed (so the use could also be judged as breach of license conditions) and that outcomes are uncertain because district rulings conflict.</p>`
        },
        {
          q: `<p><strong>Discuss.</strong> Should copyright law allow AI companies to train on publicly available work without permission, require permission, or require payment through some collective licensing scheme? Who are the stakeholders, and which option would you choose under a maximin rule?</p>`,
          a: `<p>Stakeholders include authors and artists (large and small), AI developers (incumbents and startups, since licensing costs favor incumbents), users, open-source model builders, and the public interest in research. Strong answers notice that a permission requirement could entrench the largest firms that can afford licenses, while free use may harm the market for creative work; they consider opt-out regimes like the EU's as a middle option, and say what evidence about market harm would change their view.</p>`
        },
        {
          q: `<p><strong>Write (500–800 words).</strong> Choose one open-source project you have used whose license changed (for example Terraform, Redis, Elasticsearch or MongoDB). Explain what changed, why the company said it changed, how the community responded, and what the change meant for a downstream company that depended on it. Argue whether the change was ethical.</p>`,
          a: `<p>Cites the actual license texts and announcements with dates; explains the technical and legal effect on downstream users (for example, cloud providers versus ordinary users); describes forks and their governance; and weighs the maintainer's need for revenue against users' reliance on earlier promises, using at least one framework.</p>`
        }
      ],
      sources: ["usc17", "googleoracle21", "osi", "spdx", "fsflicenses", "uscoai"]
    },
    {
      id: "et3",
      title: "Privacy law and privacy engineering",
      minutes: 90,
      summary: "The GDPR's machinery in detail; US sectoral and state privacy law; why k-anonymity fails and what l-diversity adds; and differential privacy with the Laplace mechanism, sensitivity and a privacy budget.",
      notes: `
<p>CS 100 Lesson 4 showed why removing names isn't anonymization and introduced the GDPR; CS 490 Lesson 7 turned those ideas into a data inventory for a project. This lesson makes both halves precise: what the main laws require, and two technical definitions of "anonymous", one that fails and one that holds up.</p>

<h3>The GDPR's machinery</h3>
<p>The General Data Protection Regulation (EU 2016/679, applying since 25 May 2018) applies to <strong>personal data</strong>, any information relating to an identified or identifiable person, including identifiers like an IP address or a cookie ID. It reaches organizations established in the EU and, under Article 3, organizations anywhere that offer goods or services to people in the EU or monitor their behavior there. A <strong>controller</strong> decides why and how data is processed; a <strong>processor</strong> (a cloud provider, say) processes it on the controller's behalf under a contract.</p>
<ul>
<li><strong>Principles</strong> (Article 5): lawfulness, fairness and transparency; purpose limitation; data minimization; accuracy; storage limitation (keep it no longer than needed: the retention problem in this lesson); integrity and confidentiality; and accountability, meaning you must be able to show compliance.</li>
<li><strong>A lawful basis</strong> (Article 6) for each processing: consent, a contract with the person, a legal obligation, vital interests, a public task, or <em>legitimate interests</em> that aren't overridden by the person's rights. Consent is only one of six, and must be freely given, specific, informed and as easy to withdraw as to give.</li>
<li><strong>Special categories</strong> (Article 9), such as health, ethnicity, religion, sexual orientation, and biometric data used to identify someone, are forbidden unless one of a list of exceptions applies.</li>
<li><strong>Rights</strong> (Articles 15–22): access, rectification, erasure, restriction, portability, objection, and the right not to be subject to a decision "based solely on automated processing" with legal or similarly significant effects, except in limited cases with safeguards such as human review.</li>
<li><strong>Duties</strong>: data protection by design and by default (Article 25); breach notification to the regulator within 72 hours of becoming aware (Article 33); a data protection impact assessment before high-risk processing (Article 35).</li>
</ul>
<p>Fines reach €20 million or 4% of worldwide annual turnover, whichever is higher. The largest so far is €1.2 billion, imposed on Meta by Ireland's regulator in 2023 for transferring EU users' data to the US. Transfers are a recurring battle: the CJEU struck down the EU–US Privacy Shield in <em>Schrems II</em> (2020) because of US surveillance law; its replacement, the 2023 Data Privacy Framework, survived a challenge in the EU's General Court in September 2025, and an appeal to the Court of Justice was pending in 2026. (The CJEU has two courts: the General Court hears most cases brought directly by people and companies against EU institutions, and its judgments can be appealed on points of law to the Court of Justice, which has the last word.) The Commission also proposed amending the GDPR in a November 2025 "Digital Omnibus" (a separate proposal from the "Digital Omnibus on AI" of the same month, which was adopted quickly and is covered in Lesson 8; this one includes redefining personal data relative to who holds it: data such as pseudonymized records would not be personal data for a company that has no means reasonably likely to be used to identify the people, even if another company holding the key can). An EU regulation changes only when the Commission proposes and both the Parliament (elected) and the Council (ministers of the member states' governments) adopt the same text. As of November 2026 the member states had agreed a position that dropped that redefinition, and the Parliament had not, so nothing had changed in law. Check EUR-Lex and the European Data Protection Board for the current text.</p>

<h3>US privacy law: sectors and states</h3>
<p>The US has no general federal privacy law. Instead (CS 490 Lesson 7 listed them):</p>
<ul>
<li><strong>HIPAA</strong> (1996) covers health information held by health plans, most providers and their contractors ("business associates"), not health apps generally. Its Privacy Rule treats data as de-identified by <em>Safe Harbor</em> if 18 identifiers are removed, including names, all dates except the year, and ZIP codes beyond the first three digits (and those three only if the area they cover has more than 20,000 people); ages over 89 become "90 or older". Notice that this is Sweeney's ZIP, birth date and sex attack (CS 100 Lesson 4) turned into a rule.</li>
<li><strong>FERPA</strong> (1974) protects student education records at schools receiving federal funds. <strong>COPPA</strong> (1998) requires verifiable parental consent before collecting personal information from children under 13 online; the FTC's 2025 amendments, which companies have had to comply with since April 2026, add separate consent for disclosing children's data to third parties such as advertisers and require a written retention policy that forbids keeping it indefinitely.</li>
<li>The <strong>FTC</strong> enforces Section 5 of the FTC Act against "unfair or deceptive" practices, which covers breaking your own privacy policy.</li>
<li><strong>States</strong>: California's CCPA (2018, strengthened by the CPRA in 2020, with its own enforcement agency) gives rights to know, delete, correct and opt out of the "sale" or "sharing" of personal data. By late 2026 about two dozen states had comprehensive privacy laws; counts differ by what is called comprehensive, so check the IAPP's state tracker.</li>
</ul>

<h3>k-anonymity and its failures</h3>
<p>Latanya Sweeney proposed <strong>k-anonymity</strong> (2002) as a fix for re-identification. Choose the <strong>quasi-identifiers</strong>, the attributes an attacker could know from elsewhere (ZIP, age, sex). A table is <em>k</em>-anonymous if every combination of quasi-identifier values that appears is shared by at least <em>k</em> records, so each person hides in a crowd of <em>k</em>. You get there by <strong>generalization</strong> (02139 becomes 021**, age 34 becomes 30–39) and suppression (deleting outliers).</p>
<table>
<tr><th>ZIP</th><th>Age</th><th>Sex</th><th>Diagnosis</th></tr>
<tr><td>021**</td><td>30–39</td><td>F</td><td>flu</td></tr>
<tr><td>021**</td><td>30–39</td><td>F</td><td>flu</td></tr>
<tr><td>021**</td><td>30–39</td><td>F</td><td>asthma</td></tr>
<tr><td>021**</td><td>40–49</td><td>M</td><td>HIV</td></tr>
<tr><td>021**</td><td>40–49</td><td>M</td><td>HIV</td></tr>
</table>
<p>This table is 2-anonymous: the smallest class (the two men in their forties) has 2 records. But if you know your neighbor is a man in his forties in that ZIP area and in the table, you learn his diagnosis: everyone in his class has HIV. This is the <strong>homogeneity attack</strong>. <strong>l-diversity</strong> (Machanavajjhala and colleagues, 2006) requires at least <em>l</em> distinct sensitive values in each class; this table has <em>l</em> = 1. Even l-diversity fails against <em>background knowledge</em> (knowing that one value is unlikely for a person) and skewed distributions, and every definition of this kind breaks when an attacker combines two releases, since a person's class in one release narrows their class in the other. The deeper problem is that these definitions describe the table, not what an attacker can learn.</p>

<h3>Differential privacy</h3>
<p>CS 100 Lesson 4 described differential privacy as adding calibrated noise. Here is the definition. A randomized algorithm <em>M</em> is <strong>ε-differentially private</strong> if, for any two datasets <em>D</em> and <em>D′</em> that differ in one person's data (one added or removed), and any set <em>S</em> of outputs,</p>
<p class="math">P(<em>M</em>(<em>D</em>) ∈ <em>S</em>) ≤ <em>e</em><sup>ε</sup> · P(<em>M</em>(<em>D′</em>) ∈ <em>S</em>).</p>
<p>Whatever an observer sees, it was almost as likely (within a factor <em>e</em><sup>ε</sup>) with or without you, so the output reveals little about you, whatever else the attacker knows. Smaller ε means stronger privacy; ε = 0.5 bounds the factor by <em>e</em><sup>0.5</sup> ≈ 1.65.</p>
<p>The <strong>Laplace mechanism</strong> (Dwork, McSherry, Nissim and Smith, 2006) answers a numeric query <em>f</em> by adding noise from the Laplace distribution with scale <em>b</em> = Δ<em>f</em>/ε, whose density is <em>e</em><sup>−|<em>x</em>|/<em>b</em></sup>/(2<em>b</em>): an exponential distribution (MATH 230 Lesson 3) mirrored to both sides of 0. The <strong>sensitivity</strong> Δ<em>f</em> is the most one person can change the true answer: 1 for a count. To check the guarantee for a count, compare the output densities when the true count is 212 and when it is 213:</p>
<pre><code>import math

def density(x, center, b):
    return math.exp(-abs(x - center) / b) / (2 * b)

eps = 0.5
b = 1 / eps
ratios = [density(x, 212, b) / density(x, 213, b) for x in (150, 212, 212.5, 213, 300)]
print([round(r, 4) for r in ratios])    # [1.6487, 1.6487, 1.0, 0.6065, 0.6065]
print(round(math.exp(eps), 4))          # 1.6487</code></pre>
<p>The ratio never exceeds <em>e</em><sup>ε</sup> in either direction, because moving the center by 1 changes |<em>x</em> − center| by at most 1. Accuracy is predictable too. For <em>t</em> ≥ 0, the right tail is P(noise &gt; <em>t</em>) = ∫<sub><em>t</em></sub><sup>∞</sup> <em>e</em><sup>−<em>x</em>/<em>b</em></sup>/(2<em>b</em>) d<em>x</em> = ½<em>e</em><sup>−<em>t</em>/<em>b</em></sup>, and the left tail is the same by symmetry, so P(|noise| &gt; <em>t</em>) = <em>e</em><sup>−<em>t</em>/<em>b</em></sup>; so with <em>b</em> = 2 the published count is off by more than 5 only <em>e</em><sup>−2.5</sup> ≈ 8% of the time.</p>
<p>A sum needs a bound on each person's value. If salaries are clamped to [0, 200,000] before summing, one person changes the sum by at most 200,000, so the noise scale is 200,000/ε. Clamping biases the answer for anyone outside the range; choosing the range is a design decision.</p>
<p>The guarantee <strong>composes</strong>: answering <em>k</em> queries with privacy losses ε<sub>1</sub>, …, ε<sub><em>k</em></sub> is (ε<sub>1</sub> + ⋯ + ε<sub><em>k</em></sub>)-differentially private. Losses add because one person can affect every answer. So a system needs a <strong>privacy budget</strong>: a total ε that queries draw down, refusing further queries when it is spent. Without one, an analyst could ask the same count 1,000 times and average the noise away. If instead the queries are about <em>disjoint</em> groups of people (counts for departments when each student is in exactly one), adding or removing one person changes only one answer, so the whole set of answers is as private as the worst single one: max(ε<sub>1</sub>, …, ε<sub><em>k</em></sub>). This is <strong>parallel composition</strong>. Equivalently, treat the list of counts as one query <em>f</em> with <em>k</em> outputs, whose sensitivity Δ<em>f</em> is the most one person can change all the counts together (the sum of the absolute changes): 1 when the groups are disjoint, 2 if a person can be in two groups. Adding independent Laplace noise of scale Δ<em>f</em>/ε to each count is then ε-differentially private: the density of the noisy list is the product of the coordinates' densities, so moving the centers by <em>d</em><sub>1</sub>, …, <em>d</em><sub><em>k</em></sub> changes the ratio by at most <em>e</em><sup>(|<em>d</em><sub>1</sub>| + ⋯ + |<em>d</em><sub><em>k</em></sub>|)/<em>b</em></sup> ≤ <em>e</em><sup>Δ<em>f</em>/<em>b</em></sup> = <em>e</em><sup>ε</sup>. The programming problem builds the mechanism and the budget accountant. Deployed systems use ε from below 1 up to about 20 (the sidebar), and choosing ε is a policy decision as much as a technical one.</p>
<p><strong>Erasure and trained models.</strong> Deleting a user's posts from the database doesn't remove their influence on a model already trained on them, and models can memorize and repeat training text (CS 370 Lesson 8). The technical options are: <em>retrain</em> without the deleted data (exact but costly; the SISA method of Bourtoule and colleagues, 2021, trains separate models on shards of the data so that only one shard's model is retrained); approximate <em>machine unlearning</em>, which adjusts the weights to mimic retraining but has weak guarantees; training with <em>differential privacy</em>, which bounds every person's influence from the start; and <em>output filters</em>, which stop the model repeating the data without removing it. In Opinion 28/2024 the European Data Protection Board said a model trained on personal data is anonymous only if extracting personal data from it is negligibly likely, to be judged case by case, so whether erasure reaches the model itself is unsettled.</p>
<p class="note"><strong>Why it matters:</strong> privacy law asks whether data "relates to an identifiable person". Differential privacy is the only widely used technique whose answer to that question doesn't depend on guessing what an attacker already knows.</p>
`,
      terms: [
        ["Personal data (GDPR)", "Any information relating to an identified or identifiable person, including online identifiers."],
        ["Controller and processor", "The organization that decides why and how personal data is processed, and one that processes it on the controller's behalf."],
        ["Lawful basis", "One of the GDPR's six grounds (such as consent, contract or legitimate interests) that every processing of personal data needs."],
        ["Storage limitation", "The principle that personal data is kept no longer than its purpose requires."],
        ["Safe Harbor de-identification", "HIPAA's method of de-identifying health data by removing 18 listed identifiers."],
        ["k-anonymity", "Every combination of quasi-identifier values in a table is shared by at least k records."],
        ["l-diversity", "Every equivalence class has at least l distinct values of the sensitive attribute."],
        ["ε-differential privacy", "Adding or removing one person changes the probability of any output by at most a factor e^ε."],
        ["Sensitivity", "The largest change one person's data can make to a query's true answer."],
        ["Privacy budget", "The total ε a system allows across all queries, since privacy losses add up."]
      ],
      quiz: [
        { q: "A US company with no EU office sells online to customers in France. Does the GDPR apply to its processing of their data?", choices: ["No, it has no EU establishment", "Yes, because it offers goods or services to people in the EU", "Only if it has over 250 employees", "Only for French citizens living in the US"], answer: 1, why: "Article 3(2) extends the GDPR to organizations outside the EU that target or monitor people in the EU." },
        { q: "Which is NOT one of the GDPR's lawful bases for processing?", choices: ["Consent", "Legitimate interests", "Performance of a contract", "The data was publicly available"], answer: 3, why: "Public availability is not a lawful basis; the six are consent, contract, legal obligation, vital interests, public task and legitimate interests." },
        { q: "A health app not connected to any doctor or insurer collects symptoms from users. Does HIPAA cover it?", choices: ["Generally no; HIPAA covers health plans, most providers and their business associates", "Yes, all health data is covered", "Only if it is free", "Only in California"], answer: 0, why: "HIPAA is defined by who holds the data, not by the data itself; the FTC and state laws may still apply." },
        { q: "A table is 5-anonymous, but in one class all five records have the same diagnosis. What does an attacker learn?", choices: ["Nothing, because k = 5", "Only the class size", "The diagnosis of anyone they can place in that class", "The names"], answer: 2, why: "This is the homogeneity attack; l-diversity requires several distinct sensitive values per class." },
        { q: "A count query (sensitivity 1) is answered with ε = 0.25. What is the Laplace noise scale?", choices: ["0.25", "1", "4", "0.5"], answer: 2, why: "b = Δ/ε = 1/0.25 = 4." },
        { q: "An analyst asks the same noisy count 100 times, each with ε = 0.1. What total privacy loss does composition give?", choices: ["0.1", "1", "10", "100"], answer: 2, why: "Losses add: 100 × 0.1 = 10, which is why systems enforce a total budget." }
      ],
      practice: [
        {
          q: `<p><strong>Analyze.</strong> A university wants to publish, for each of 40 departments, the number of students who used the counseling service, with ε = 1 in total. (a) If each student belongs to exactly one department, what noise scale should each count get, and why? (b) If students can belong to up to two departments, what changes?</p>`,
          a: `<p>(a) Each student affects only one count, so the 40 counts together have sensitivity 1 (this is called parallel composition: disjoint groups don't add up). Each count gets Laplace noise of scale 1/1 = 1, using the whole budget. (b) Now one student can change two counts by 1 each, so the vector of counts has sensitivity 2 (measured as the sum of absolute changes), and each count needs scale 2/1 = 2. Splitting the budget per department (ε = 1/40 each) would be correct but needlessly noisy in case (a): scale 40.</p>`
        },
        {
          q: `<p><strong>Analyze.</strong> Generalize these records to make them 2-anonymous on (ZIP, age) with as little generalization as you can, and then give the table's l-diversity for <em>diagnosis</em>: (02139, 34, flu), (02138, 36, flu), (02141, 52, diabetes), (02144, 57, asthma), (02139, 31, cold).</p>`,
          a: `<p>Full ZIPs can't work: 02141 and 02144 each appear once. Keep 4 digits and use ten-year age bands: (0213*, 30–39) holds the records aged 34, 36 and 31, and (0214*, 50–59) holds 52 and 57, so k = 2. Five-year bands fail (36 would be alone in 35–39), and 3 digits would also work but generalizes more than needed. l-diversity: the 30–39 class has {flu, cold}, so 2; the 50–59 class has {diabetes, asthma}, so 2. l = 2.</p>`
        },
        {
          q: `<p><strong>Discuss.</strong> GDPR Article 17 gives a right to erasure. Your company has trained a model on user posts. A user asks for deletion. What would it mean to comply, technically, and what are the options?</p>`,
          a: `<p>Strong answers separate the stored data (delete from databases, logs and, on a schedule, backups) from the model, which may have memorized parts of the data (CS 370 Lesson 8: Carlini and colleagues extracted verbatim training text from GPT-2). Options: retrain periodically without deleted data; train with differential privacy so that no individual's influence is large; machine unlearning methods (an active research area, with weak guarantees); or filters on outputs. They note that regulators have not settled what erasure requires for trained models, and that the answer depends on whether the model itself contains personal data, a question European regulators have debated.</p>`
        },
        {
          q: `<p><strong>Write (500–800 words).</strong> A city transit agency plans to publish trip records from tap-in cards to help researchers. Write a recommendation to the agency: what could be re-identified from raw trips, why k-anonymity would not be enough, and what you would publish instead (for example differentially private aggregates), with a proposed ε and the accuracy it would give for a station's daily count.</p>`,
          a: `<p>Explains that a few (origin, time) points identify most travelers, as with Netflix ratings or mobility traces; that k-anonymity fails under repeated releases and background knowledge; proposes concrete aggregates (station-hour counts with Laplace noise), computes the noise scale and a tail bound for the proposed ε (for example ε = 1 per day gives scale 1 and error over 3 only e<sup>−3</sup> ≈ 5% of the time), and addresses how budgets compose across days.</p>`
        }
      ],
      sources: ["gdpr", "hipaadeid", "sweeney02", "dwork06", "dworkroth"]
    },
    {
      id: "et4",
      title: "Algorithmic fairness and anti-discrimination law",
      minutes: 90,
      summary: "Group fairness metrics from per-group confusion matrices; a short proof that they conflict when base rates differ; disparate treatment and disparate impact in US law; the four-fifths rule and its statistics; and how EU law and 2025–26 policy changes fit in.",
      notes: `
<p>CS 100's optional lesson on COMPAS showed with one example that a calibrated score can have very different false-positive rates across groups. CS 370 Lesson 5 defined the confusion matrix, precision and recall. This lesson turns the example into a theorem, and then asks what the law says about unequal outcomes.</p>

<h3>Fairness metrics</h3>
<p>Fix a classifier that labels each person positive (approve, hire, flag) or negative, and split the test set by group. Each group gets its own confusion matrix (TP, FP, FN, TN), and each common fairness definition asks that one rate be equal across groups:</p>
<table>
<tr><th>Definition</th><th>Equal across groups</th><th>Formula</th></tr>
<tr><td>Demographic parity</td><td>Selection rate</td><td>(TP + FP)/<em>n</em></td></tr>
<tr><td>Equal opportunity</td><td>True-positive rate</td><td>TP/(TP + FN)</td></tr>
<tr><td>Equalized odds</td><td>True-positive and false-positive rates</td><td>TP/(TP + FN) and FP/(FP + TN)</td></tr>
<tr><td>Predictive parity</td><td>Positive predictive value (precision)</td><td>TP/(TP + FP)</td></tr>
</table>
<p>Calibration (the meaning of a score is the same in every group) generalizes predictive parity to scores. Each definition protects someone different: demographic parity cares about who receives the benefit; equal opportunity about qualified people being missed; predictive parity about what a positive label means to the decision maker who relies on it.</p>

<h3>Why they conflict</h3>
<p>Write <em>p</em> for a group's base rate (the fraction actually positive) and <em>N</em> for its size. Then there are <em>pN</em> positives and TP = TPR · <em>pN</em>. The definition of PPV gives FP = TP · (1 − PPV)/PPV, and dividing by the (1 − <em>p</em>)<em>N</em> negatives:</p>
<p class="math">FPR = (<em>p</em> / (1 − <em>p</em>)) · ((1 − PPV) / PPV) · TPR.</p>
<p>This identity holds for any classifier that makes at least one true positive (so that PPV &gt; 0), and is the core of Chouldechova's 2017 result (Kleinberg, Mullainathan and Raghavan proved a version for calibrated scores). If two groups have equal PPV below 1 and equal nonzero TPR but different base rates, the factor <em>p</em>/(1 − <em>p</em>) differs while the other two factors are equal and nonzero, so their false-positive rates must differ. So with different base rates, equalized odds and predictive parity can hold together only in degenerate cases: the classifier makes no false positives in either group (FPR = 0 and PPV = 1, with any common TPR; a perfect classifier, which also has TPR = 1, is one example), or no true positives in either group (TPR = 0). First check the identity itself on CS 100's tables, where both groups have PPV 0.6, group A has <em>p</em> = 0.5 and TPR 0.96, and group B has <em>p</em> = 0.2 and TPR 0.6:</p>
<pre><code>def fpr(p, ppv, tpr):
    return p / (1 - p) * (1 - ppv) / ppv * tpr

print(round(fpr(0.5, 0.6, 0.96), 4))   # 0.64
print(round(fpr(0.2, 0.6, 0.6), 4))    # 0.1</code></pre>
<p>Both match the tables (32/50 and 8/80). Now hold PPV at 0.6 and give both groups the same TPR, 0.8: the base rates alone force group A's FPR to be four times group B's, since 0.5/0.5 = 1 and 0.2/0.8 = 0.25.</p>
<pre><code>print(round(fpr(0.5, 0.6, 0.8), 4))    # 0.5333
print(round(fpr(0.2, 0.6, 0.8), 4))    # 0.1333</code></pre>
<p>Choosing a metric is choosing whose errors to equalize, and the math can't make that choice.</p>

<h3>Discrimination law: treatment and impact</h3>
<p>US anti-discrimination law covers particular domains: employment (Title VII of the Civil Rights Act of 1964; the Age Discrimination in Employment Act; the Americans with Disabilities Act), credit (the Equal Credit Opportunity Act) and housing (the Fair Housing Act). It recognizes two kinds of discrimination:</p>
<ul>
<li><strong>Disparate treatment</strong>: treating people differently because of a protected characteristic (race, color, religion, sex, national origin, and in other laws age or disability). Intent matters, and a model that takes race as an input, or a close proxy chosen for that purpose, is the clearest case.</li>
<li><strong>Disparate impact</strong>: a neutral practice that falls more heavily on a protected group. In <em>Griggs v. Duke Power</em> (1971), a company's requirement of a high-school diploma and aptitude tests for better-paid jobs excluded Black applicants at much higher rates and wasn't shown to predict job performance; the Supreme Court held this violated Title VII without proof of intent. The Civil Rights Act of 1991 wrote the framework into the statute: the plaintiff shows the disparate impact; the employer must show the practice is "job related" and "consistent with business necessity"; the plaintiff can still win by showing a less discriminatory alternative the employer refused to adopt.</li>
</ul>
<p>A hiring model trained on past decisions can produce disparate impact without anyone intending it. Amazon stopped using an experimental résumé-ranking model in 2018 after finding that it penalized résumés containing the word "women's", as in "women's chess club captain": it had learned the pattern of the company's past hiring.</p>

<h3>The four-fifths rule</h3>
<p>How unequal is too unequal? The federal Uniform Guidelines on Employee Selection Procedures (1978) give a rule of thumb: "A selection rate for any race, sex, or ethnic group which is less than four-fifths (4/5) (or eighty percent) of the rate for the group with the highest rate will generally be regarded" as evidence of adverse impact. Say 80 white applicants yield 48 hires (60%) and 40 Black applicants yield 12 (30%). The <strong>impact ratio</strong> is 30/60 = 0.5, below 0.8. The Guidelines add that smaller differences can count when statistically and practically significant, and larger ones may not when samples are small, so analysts also run a significance test, such as MATH 230's two-proportion <em>z</em>-test:</p>
<pre><code>import math

hired_a, n_a, hired_b, n_b = 48, 80, 12, 40
pa, pb = hired_a / n_a, hired_b / n_b
pooled = (hired_a + hired_b) / (n_a + n_b)
se = math.sqrt(pooled * (1 - pooled) * (1 / n_a + 1 / n_b))
print(round(pb / pa, 2))            # 0.5
print(round((pa - pb) / se, 2))     # 3.1</code></pre>
<p>A <em>z</em> of 3.1 is far beyond the usual 1.96, so the gap is unlikely to be chance. Since July 2023, New York City's Local Law 144 has required employers that use automated employment decision tools to commission an independent bias audit each year and publish the impact ratios by sex and race/ethnicity: the four-fifths computation, now applied to software. The programming problems compute these ratios and the full set of fairness metrics.</p>
<p>Fixing a disparity can itself be illegal. In <em>Ricci v. DeStefano</em> (2009), New Haven threw out a promotion test because of its disparate impact, and the Supreme Court held that doing so was disparate treatment of the firefighters who had passed, without a "strong basis in evidence" that the test was unlawful. Setting different score thresholds by race in employment is generally prohibited outright (the 1991 Act bars adjusting test scores by race). Legally safer fixes change the model for everyone: different features, a better target variable (CS 370's sidebar on proxy labels), or a search for a less discriminatory alternative with similar accuracy.</p>

<h3>Elsewhere, and what changed in 2025–26</h3>
<p>EU equality directives prohibit <em>direct</em> and <em>indirect</em> discrimination (the counterpart of disparate impact), and the AI Act requires high-risk systems to examine training data for biases (Lesson 8). It lets providers of high-risk systems process sensitive data such as ethnicity, under strict conditions, to detect and correct bias (Article 10(5)), and its 2026 amendment (the "Digital Omnibus on AI", Lesson 8) extended that permission more widely: you can't measure a disparity by group without knowing the groups.</p>
<p>In the US, enforcement policy changed sharply. Executive Order 14281 (April 2025) directed federal agencies to deprioritize disparate-impact enforcement, and in December 2025 the Justice Department removed disparate-impact liability from its regulations under Title VI (which covers recipients of federal funds), followed by other agencies in 2026. The statutes did not change: Title VII's disparate-impact provision is still law, private plaintiffs can still sue, and states such as New York, New Jersey and California enforce their own laws. Whether disparate-impact liability is good policy is genuinely contested; supporters see it as the only way to reach discrimination that hides inside neutral rules, critics as pressure toward quotas. In <em>Mobley v. Workday</em> (N.D. Cal.), a court allowed an age-discrimination claim against an AI screening vendor, not only the employers using it, to proceed as a nationwide <em>collective action</em> in 2025 (the age-discrimination law's form of group lawsuit: other applicants join only if they opt in, whereas an ordinary class action includes everyone in the class unless they opt out); the case was ongoing in late 2026.</p>
`,
      terms: [
        ["Demographic parity", "Equal selection rates across groups."],
        ["Equal opportunity", "Equal true-positive rates across groups."],
        ["Equalized odds", "Equal true-positive and false-positive rates across groups."],
        ["Predictive parity", "Equal positive predictive value (precision) across groups."],
        ["Disparate treatment", "Treating people differently because of a protected characteristic."],
        ["Disparate impact", "A neutral practice that falls more heavily on a protected group, unlawful in US employment law unless justified by business necessity."],
        ["Four-fifths rule", "A guideline that a group's selection rate below 80% of the highest group's rate is generally evidence of adverse impact."],
        ["Impact ratio", "A group's selection rate divided by the highest group's selection rate."]
      ],
      quiz: [
        { q: "Two groups both have PPV 0.6 and TPR 0.8, but group A's base rate is 0.5 and group B's is 0.2. What must be true?", choices: ["Their FPRs are equal", "Group B's FPR is higher", "The classifier is perfect", "Group A's FPR is higher"], answer: 3, why: "FPR is proportional to p/(1 − p): 1 for A and 0.25 for B, so A's FPR is four times B's." },
        { q: "Which fairness definition asks that qualified people in every group be found at the same rate?", choices: ["Demographic parity", "Equal opportunity", "Predictive parity", "Calibration"], answer: 1, why: "Equal opportunity equalizes the true-positive rate." },
        { q: "What did Griggs v. Duke Power (1971) establish?", choices: ["A neutral requirement with disparate impact violates Title VII unless job-related", "Intent is required for discrimination", "Aptitude tests are illegal", "Affirmative action is required"], answer: 0, why: "It recognized disparate impact; the 1991 Act codified it." },
        { q: "Group X: 200 applicants, 50 hired. Group Y: 100 applicants, 40 hired. What is X's impact ratio and does the four-fifths rule flag it?", choices: ["0.625; flagged", "0.8; not flagged", "1.25; not flagged", "0.5; flagged"], answer: 0, why: "X's rate is 25%, Y's 40%; 25/40 = 0.625 < 0.8." },
        { q: "An employer lowers the score threshold for one racial group to equalize selection rates. Under US employment law this is:", choices: ["Required", "Allowed with consent", "Generally prohibited as disparate treatment", "Unregulated"], answer: 2, why: "The 1991 Act bars adjusting scores or cutoffs by race; Ricci shows the risk of race-conscious fixes." },
        { q: "After the 2025 executive order and the 2025–26 agency rules, can private plaintiffs still bring disparate-impact claims under Title VII?", choices: ["No, disparate impact was abolished", "Only in the EU", "Only for age", "Yes; the statute is unchanged, though federal enforcement priorities shifted"], answer: 3, why: "An executive order and agency regulations can't repeal Title VII's statutory text." }
      ],
      practice: [
        {
          q: `<p><strong>Analyze.</strong> A loan model's results: group A, 500 applicants, of whom 300 would repay; it approves 240 of the repayers and 60 who would default. Group B, 500 applicants, of whom 200 would repay; it approves 150 of the repayers and 50 who would default. Compute each group's selection rate, TPR, FPR and PPV. Which fairness definitions hold, approximately?</p>`,
          a: `<p>A: TP 240, FP 60, FN 60, TN 140. Selection 300/500 = 0.6; TPR 240/300 = 0.8; FPR 60/200 = 0.3; PPV 240/300 = 0.8. B: TP 150, FP 50, FN 50, TN 250. Selection 0.4; TPR 150/200 = 0.75; FPR 50/300 ≈ 0.167; PPV 0.75. No definition holds exactly: PPV and TPR are close (0.8 versus 0.75), but FPR differs a lot (0.3 versus 0.17), as the identity predicts for base rates 0.6 and 0.4, and demographic parity fails (impact ratio 0.4/0.6 ≈ 0.67).</p>`
        },
        {
          q: `<p><strong>Analyze.</strong> Using the lesson's identity, find the FPR a group must have if its base rate is 0.1 and the classifier achieves PPV 0.5 and TPR 0.9. What FPR would a group with base rate 0.3 need for the same PPV and TPR?</p>`,
          a: `<p>For <em>p</em> = 0.1: (0.1/0.9) × (0.5/0.5) × 0.9 = 0.1. For <em>p</em> = 0.3: (0.3/0.7) × 1 × 0.9 ≈ 0.386. Keeping PPV and TPR equal forces the second group's FPR to be almost four times higher.</p>`
        },
        {
          q: `<p><strong>Discuss.</strong> A city uses a model to decide which restaurants to inspect first. Which fairness definition matters most here, and to whom? Would your answer change for a model that decides which students get extra tutoring?</p>`,
          a: `<p>For inspections, a false positive costs an owner an inspection, and a false negative leaves diners at risk; owners might reasonably ask for equal FPR across neighborhoods, diners for equal TPR. For tutoring, the "positive" is a benefit, so being missed (a false negative) is the harm, and equal opportunity or even demographic parity may matter more. Strong answers tie the choice to who bears each error, and note that a scarce benefit raises different questions from a burden.</p>`
        },
        {
          q: `<p><strong>Write (500–800 words).</strong> You are asked to audit a vendor's résumé-screening tool for an employer in New York City. Describe the data you would request, the computations you would run (impact ratios, significance tests and at least two fairness metrics), what a finding below 0.8 would and would not show, and what legal and ethical steps you would recommend if you found one.</p>`,
          a: `<p>Asks for applicant flow data with demographics and outcomes; computes impact ratios by sex and race/ethnicity (including intersections, which LL144 requires); tests significance and discusses small samples; explains that 0.8 is a rule of thumb, not a legal verdict; considers job-relatedness evidence and less discriminatory alternatives; distinguishes federal, state and city law; and recommends steps such as revalidating the tool, changing features or pausing use.</p>`
        }
      ],
      sources: ["propublica", "chouldechova17", "kleinberg17", "fairmlbook", "ugesp", "nycaedt"]
    },
    {
      id: "et5",
      title: "Safety, liability and software failure",
      minutes: 90,
      summary: "What the Therac-25 and the 737 MAX's MCAS teach beyond their bugs; hazard analysis with fault trees and cut sets; redundancy and common causes; safety standards and safety cases; and how negligence, product liability, contracts and criminal law assign responsibility for failures.",
      notes: `
<p>CS 101's optional lesson told the Therac-25 story, and CS 102 and CS 240 summarized the 737 MAX crashes. Both are usually taught as testing failures. Looked at closely, both are failures of a whole system: requirements, analysis, organizations and regulators. This lesson looks at the engineering methods that safety-critical fields use, and at the law that decides who pays when software hurts people.</p>

<h3>The Therac-25, as a system failure</h3>
<p>Between June 1985 and January 1987, the Therac-25 radiation therapy machine, made by Atomic Energy of Canada Limited (AECL), massively overdosed patients in six known accidents; several died. Nancy Leveson and Clark Turner's 1993 investigation found more than the race condition and the overflowing one-byte counter that CS 101 described:</p>
<ul>
<li>The software was reused from earlier models whose <strong>hardware interlocks</strong> had masked the same bugs. Removing the interlocks moved all of the safety burden onto code that had never carried it.</li>
<li>AECL's safety analysis treated software as reliable by assumption, assigning it tiny failure probabilities without evidence.</li>
<li>Error messages such as "MALFUNCTION 54" were cryptic and frequent, so operators learned to override them.</li>
<li>After early accidents, AECL told hospitals that an overdose was impossible and fixed a suspected hardware fault; the real cause was found by a hospital physicist who reproduced it himself.</li>
</ul>
<p>The US Food and Drug Administration then had little power over software in medical devices. The accidents shaped later regulation and, eventually, the medical-device software standard IEC 62304 (2006).</p>

<h3>The 737 MAX, as a system failure</h3>
<p>Lion Air 610 (October 2018) and Ethiopian Airlines 302 (March 2019) crashed after MCAS, a flight-control function that pushed the nose down at high angle of attack, acted on a single faulty sensor; 346 people died. (The <em>angle of attack</em> is the angle between the wing and the oncoming air; too high and the wing stalls, losing lift. The <em>horizontal stabilizer</em> is the small wing at the tail; tilting it, called <em>trim</em>, sets the nose's resting pitch, and it is powerful: a change of a degree or two pushes the nose firmly up or down, and the pilots must pull or push hard on the controls to oppose it.) Investigations by the US House transportation committee and an international technical review found that late in development MCAS's authority had been increased (from 0.6 to 2.5 degrees of stabilizer movement per activation, when it was extended to low speeds) while the safety assessment still described the earlier, weaker version; that it could activate repeatedly; that the failure of one sensor had been classified as less severe than it proved; that pilots weren't told MCAS existed; and that the FAA had delegated much of the certification work to Boeing employees. The FAA's November 2020 review approved a redesign: MCAS now compares both angle-of-attack sensors and won't activate if they disagree by more than 5.5 degrees, activates only once per high-angle event, and can never command more nose-down trim than the pilots can counter by pulling back on the controls.</p>
<p>Responsibility was then argued out in court. Three ways a criminal case against a company can end matter here. In a <em>guilty plea</em> the company is convicted. In a <em>deferred prosecution agreement</em> prosecutors file a charge but agree to drop it if the company pays and meets conditions for a few years; there is no conviction unless it breaches them. In a <em>non-prosecution agreement</em> prosecutors agree not to pursue the charge at all in exchange for conditions. Boeing paid $2.5 billion under a 2021 deferred prosecution agreement for defrauding the FAA's evaluation group; after a door plug blew out of a 737 MAX 9 in January 2024, prosecutors found it had breached that agreement, and Boeing agreed to plead guilty, which would have made it a convicted felon. A federal judge rejected the plea deal in December 2024, and the Justice Department then made a non-prosecution agreement instead and asked the court to dismiss the charge. Dropping a filed charge needs the court's leave, so the judge could have kept the case alive; in November 2025 he dismissed it, holding that he lacked the power to refuse because prosecutors hadn't acted in bad faith, while writing that the agreement "fails to secure the necessary accountability". So Boeing was never convicted, and no individual was either.</p>

<h3>Fault trees and cut sets</h3>
<p>Safety engineering starts from <strong>hazards</strong> (states that can lead to harm, such as "nose-down command from bad data") rather than features. A <strong>fault tree</strong>, invented at Bell Labs in 1962 for the Minuteman missile's launch control, puts a hazard at the top and asks what combinations of lower-level events cause it, joined by AND and OR gates. A <strong>cut set</strong> is a set of basic events that together cause the top event; a <em>minimal</em> cut set has no smaller cut set inside it. A minimal cut set with one event is a <strong>single point of failure</strong>: the original MCAS had one, a single bad sensor.</p>
<figure class="fig"><svg viewBox="0 0 420 190" width="420" role="img" aria-label="Fault tree: the top event 'no valid reading' is an AND of two OR gates; the left OR has 'sensor 1 fails' and 'power fails', the right OR has 'sensor 2 fails' and 'power fails'.">
<g class="hl"><rect x="135" y="10" width="150" height="30"/></g>
<g class="box"><rect x="45" y="70" width="110" height="28"/><rect x="265" y="70" width="110" height="28"/>
<rect x="5" y="140" width="95" height="28"/><rect x="110" y="140" width="95" height="28"/><rect x="215" y="140" width="95" height="28"/><rect x="320" y="140" width="95" height="28"/></g>
<g class="ln"><line x1="210" y1="40" x2="100" y2="70"/><line x1="210" y1="40" x2="320" y2="70"/>
<line x1="100" y1="98" x2="52" y2="140"/><line x1="100" y1="98" x2="157" y2="140"/><line x1="320" y1="98" x2="262" y2="140"/><line x1="320" y1="98" x2="367" y2="140"/></g>
<g class="text"><text x="210" y="30" text-anchor="middle">no valid reading (AND)</text>
<text x="100" y="89" text-anchor="middle">channel 1 (OR)</text><text x="320" y="89" text-anchor="middle">channel 2 (OR)</text>
<text x="52" y="159" text-anchor="middle" class="m">sensor 1</text><text x="157" y="159" text-anchor="middle" class="m">power</text>
<text x="262" y="159" text-anchor="middle" class="m">sensor 2</text><text x="367" y="159" text-anchor="middle" class="m">power</text></g>
</svg><figcaption>Two redundant channels that share one power supply. The minimal cut sets are {power} and {sensor 1, sensor 2}: the shared supply is a single point of failure hidden inside the redundancy.</figcaption></figure>
<p>Let each sensor fail with probability 0.01 and the power supply with 0.001. Treating the two channels as independent gives P(channel fails) = 1 − 0.99 × 0.999 = 0.01099 and P(top) = 0.01099² ≈ 0.000121. But both channels contain the same power event, so they aren't independent. Exactly, P(top) = P(power) + P(no power failure) × P(both sensors) = 0.001 + 0.999 × 0.0001 ≈ 0.0011: nine times higher, dominated by the single point of failure. Such shared causes are <strong>common-cause failures</strong>: a shared supply, the same software in both channels, the same maintenance error made twice. Redundancy multiplies small probabilities only when failures really are independent. The programming problems compute cut sets and both probabilities, and build a three-sensor voter that outvotes and then removes a faulty sensor, and disengages when it can't tell which of two is right.</p>

<h3>Standards and safety cases</h3>
<p>Each safety-critical field has a standard that grades software by how much harm its failure could cause and requires more rigor for higher grades:</p>
<table>
<tr><th>Field</th><th>Standard</th><th>Levels (most critical first)</th></tr>
<tr><td>General (electrical, electronic, programmable)</td><td>IEC 61508</td><td>SIL 4, 3, 2, 1</td></tr>
<tr><td>Civil aviation software</td><td>DO-178C (2011)</td><td>DAL A (catastrophic) to E (no effect)</td></tr>
<tr><td>Road vehicles</td><td>ISO 26262</td><td>ASIL D, C, B, A</td></tr>
<tr><td>Medical device software</td><td>IEC 62304</td><td>Class C, B, A</td></tr>
</table>
<p>SIL is <em>safety integrity level</em>, DAL <em>development assurance level</em> (DO-178C itself says "software level") and ASIL <em>automotive safety integrity level</em>. Each step down means a less severe consequence or a lower tolerated failure rate, and less required rigor. For DO-178C the five levels match the effect of the software's failure on the aircraft: A catastrophic, B hazardous, C major, D minor, E no safety effect. IEC 62304's classes are C (death or serious injury possible), B (non-serious injury) and A (no injury).</p>
<p>DO-178C, for example, requires every requirement to be traced to code and tests, and for level A software, tests that achieve MC/DC coverage: each condition in each decision shown to independently affect the outcome. A <strong>safety case</strong> is a structured argument, backed by evidence, that a system is acceptably safe for a given use: claims ("the system never commands nose-down trim from a single bad sensor"), the argument for each (the voter design, the fault tree), and evidence (tests, analyses, reviews). Safety cases are required for UK railways, defense and nuclear plants, and increasingly proposed for AI systems. They can become paperwork: when an RAF Nimrod aircraft caught fire and crashed in Afghanistan in 2006, killing 14 people, the official review found its safety case had been "a lamentable job from start to finish", written to approve a conclusion already reached.</p>

<h3>Who pays: liability</h3>
<p>Several bodies of law assign responsibility when software causes harm:</p>
<ul>
<li><strong>Negligence</strong>: a duty of care, breached by falling below what a reasonable professional would do, causing harm. Industry standards and practices are evidence of what "reasonable" means, which is one reason the standards above matter even where they aren't required.</li>
<li><strong>Product liability</strong> (strict liability): a manufacturer is liable for harm caused by a defective product, whether a manufacturing defect, a design defect, or a failure to warn, even without negligence. Whether software is a "product" or a service has long been unsettled in US courts, and courts allowed some claims against social-media platforms' design to proceed as product claims. The EU settled the question: the new Product Liability Directive (2024/2853), which member states must apply by 9 December 2026, makes software, including AI systems and updates, a product, counts missing security updates as a defect, and eases the burden of proof for injured people when systems are complex.</li>
<li><strong>Contract</strong>: between businesses, the license or service agreement usually disclaims warranties and caps liability. On 19 July 2024 a faulty CrowdStrike content update crashed about 8.5 million Windows computers. Delta Air Lines, which cancelled about 7,000 flights, sued for about $500 million; it dropped its product-liability claim, and in May 2025 a Georgia court let a gross-negligence claim proceed, since contract caps usually don't protect gross negligence. CrowdStrike argued its contract limits any payment to single-digit millions; the case was still pending in late 2026.</li>
<li><strong>Criminal law</strong> reaches only deliberate wrongdoing, such as Boeing's deception of regulators, not engineering mistakes as such.</li>
</ul>
<p class="note"><strong>Why it matters:</strong> "no single test was missing" is the usual finding. Safety comes from analysis that asks what happens when parts fail, organizations that listen to it, and incentives, including liability, that make it worth the cost.</p>
`,
      terms: [
        ["Hazard", "A system state that can lead to harm under some conditions."],
        ["Fault tree", "A diagram that decomposes a hazard into combinations of lower-level events joined by AND and OR gates."],
        ["Minimal cut set", "A smallest set of basic events whose joint occurrence causes the top event."],
        ["Single point of failure", "One component whose failure alone causes the hazard: a minimal cut set of size one."],
        ["Common-cause failure", "One cause that makes several supposedly independent components fail together."],
        ["Safety case", "A structured argument, supported by evidence, that a system is acceptably safe for a given use."],
        ["Negligence", "Causing harm by breaching a duty to take reasonable care."],
        ["Strict product liability", "Liability for harm caused by a defective product, without proof of negligence."]
      ],
      quiz: [
        { q: "Why did the Therac-25's reused software become dangerous?", choices: ["It was rewritten in a new language", "Earlier models' hardware interlocks had masked its bugs, and the Therac-25 removed them", "It ran on faster hardware only", "Operators were untrained"], answer: 1, why: "Removing the interlocks left software alone to guarantee safety." },
        { q: "Which change is part of the FAA-approved MCAS redesign?", choices: ["It compares both angle-of-attack sensors and doesn't activate if they disagree by more than 5.5 degrees", "MCAS was removed", "It uses a third sensor", "It activates more often"], answer: 0, why: "It also activates once per event and has limited authority." },
        { q: "A fault tree's minimal cut sets are {A}, {B, C} and {B, D}. Which component is a single point of failure?", choices: ["A", "B", "C", "None"], answer: 0, why: "A cut set of size one means that event alone causes the top event." },
        { q: "Two redundant channels each fail with probability 0.01 independently, but share a power supply that fails with probability 0.001. Roughly what is the probability both channels are down?", choices: ["0.0001", "0.01", "About 0.0011", "0.000001"], answer: 2, why: "The shared supply dominates: 0.001 plus about 0.0001 from both sensors failing." },
        { q: "Under the EU's 2024 Product Liability Directive, which is true?", choices: ["Software is excluded", "Only hardware makers are liable", "It applies only to medical devices", "Software, including AI and updates, is a product, and missing security updates can make it defective"], answer: 3, why: "Member states must apply it by 9 December 2026." },
        { q: "Why did Delta's gross-negligence claim against CrowdStrike matter despite the contract's liability cap?", choices: ["Caps never apply", "Contractual caps generally don't protect against gross negligence", "Delta had no contract", "Gross negligence is a crime"], answer: 1, why: "Ordinary negligence can usually be capped by contract between businesses; gross negligence usually can't." }
      ],
      practice: [
        {
          q: `<p><strong>Analyze.</strong> A braking controller fails if (the main computer fails AND the backup computer fails) OR the shared wheel-speed sensor fails. Probabilities: main 10<sup>−3</sup>, backup 10<sup>−3</sup>, sensor 10<sup>−5</sup>, independent. List the minimal cut sets and compute the probability of failure. Which change reduces it most: a better backup (10<sup>−4</sup>) or a second, independent sensor, with a self-test that tells which sensor has failed so that the controller keeps working on either one alone (it fails only if both sensors fail)? Would the second sensor still help if a disagreement made the controller disengage, as the lesson's voter does with two sensors?</p>`,
          a: `<p>Cut sets: {main, backup} and {sensor}. P ≈ 1 − (1 − 10<sup>−6</sup>)(1 − 10<sup>−5</sup>) ≈ 1.1 × 10<sup>−5</sup>, dominated by the sensor. A better backup gives 10<sup>−7</sup> + 10<sup>−5</sup> ≈ 1.01 × 10<sup>−5</sup>, barely better. Two independent sensors, both needed to fail, give about 10<sup>−10</sup> for that branch, so P ≈ 10<sup>−6</sup>: an eleven-fold improvement. Remove single points of failure first. But if the controller disengaged whenever the two sensors disagreed, and disengaging counts as failing to brake, then <em>either</em> sensor failing would cause the top event: that branch becomes about 2 × 10<sup>−5</sup> and P ≈ 2.1 × 10<sup>−5</sup>, worse than one sensor. A cross-check that only detects disagreement turns a hidden failure into a safe stop only where stopping is safe; for brakes you need a third sensor or a self-test that identifies the faulty one.</p>`
        },
        {
          q: `<p><strong>Analyze.</strong> A three-sensor voter outputs the median and declares a sensor failed after it differs from the median by more than the tolerance in 3 consecutive samples. Sensors 1 and 2 both drift upward together (a common cause, such as icing). What does the voter do, and what does this show about voting?</p>`,
          a: `<p>The median is the middle of three readings; if two sensors drift together, they form the majority and the median follows them, so the healthy third sensor is declared failed. Voting protects against independent failures, not common-cause ones. Defenses are diversity (different sensor types or suppliers), plausibility checks against physics (angle of attack versus airspeed and pitch), and telling the crew.</p>`
        },
        {
          q: `<p><strong>Discuss.</strong> Should individual engineers face criminal liability for safety failures in software they wrote, as some propose after the 737 MAX? Consider the Boeing case's outcome, De George's conditions (Lesson 1), and what such liability would do to how engineers report problems.</p>`,
          a: `<p>Strong answers distinguish deliberate deception (which criminal law already reaches) from mistakes, note that fear of prosecution can discourage the honest reporting that safety cultures depend on (aviation's non-punitive reporting systems), consider organizational liability and licensing as alternatives, and take a position on who should answer when no individual is convicted, as in the Boeing case.</p>`
        },
        {
          q: `<p><strong>Write (500–800 words).</strong> Choose a software-related failure from the last ten years that harmed people or caused large losses (for example the CrowdStrike outage, the UK Post Office Horizon scandal, or an automated-driving crash). Draw its fault tree to the level the public record supports, identify single points of failure and common causes, and argue who should bear liability under the bodies of law in this lesson.</p>`,
          a: `<p>Builds a defensible fault tree from cited investigations; identifies at least one single point of failure or common cause; discusses negligence, product liability (noting the EU directive if relevant) and contract terms; and reaches a reasoned conclusion about responsibility that separates engineering causes from organizational ones.</p>`
        }
      ],
      sources: ["leveson93", "faa737", "pld2024"]
    },
    {
      id: "et6",
      title: "Security law: computer crime, circumvention and disclosure",
      minutes: 90,
      summary: "The Computer Fraud and Abuse Act's structure and its reading in Van Buren and the scraping cases; computer-crime law elsewhere; anti-circumvention law and the security-research exemption; and the norms and new legal duties for reporting vulnerabilities and breaches.",
      notes: `
<p>CS 380 Lesson 8's sidebar drew the legal line all security work sits on: authorization. It summarized the CFAA, <em>Van Buren</em>, the Justice Department's 2022 charging policy and the UK's Computer Misuse Act, and the same CS 380 lesson described coordinated disclosure. This lesson looks at how those laws are built, where they are still uncertain, and the legal duties to report vulnerabilities that arrived in 2023–26.</p>

<h3>The Computer Fraud and Abuse Act</h3>
<p>The CFAA, 18 U.S.C. § 1030 (1986, amended many times), is mainly a list of offences, of which two matter most to engineers:</p>
<ul>
<li>§ 1030(a)(2): intentionally accessing a computer "without authorization" or "exceed[ing] authorized access", and thereby obtaining information. Because "protected computer" includes any computer used in interstate commerce, this covers essentially every computer on the internet.</li>
<li>§ 1030(a)(5): knowingly transmitting code or commands that intentionally cause damage, or causing damage through unauthorized access. This is the malware and denial-of-service offence.</li>
</ul>
<p>It also gives a <strong>civil</strong> claim (§ 1030(g)) to anyone who suffers damage or "loss" of at least $5,000, which is why companies have used it against competitors and scrapers, not just prosecutors against criminals.</p>
<p>For decades courts split over "exceeds authorized access". In <em>Van Buren v. United States</em> (2021), a police sergeant took money to search a license-plate database he was allowed to use, for a purpose his department forbade. The Supreme Court, 6–3, held that this didn't violate the CFAA: the clause covers someone who "accesses a computer with authorization but then obtains information located in particular areas of the computer, such as files, folders, or databases, that are off limits to him". The Court described it as a "gates-up-or-down" inquiry: either you are allowed into that part of the system or you aren't; your purpose doesn't matter. It left open whether the gates must be technical (passwords, permissions) or can be set by contracts and policies.</p>
<p>Scraping tested that question. In <em>hiQ Labs v. LinkedIn</em> (9th Cir. 2022), the court held that scraping data from public profiles, which anyone could view without logging in, was likely not access "without authorization": there was no gate to lift. But hiQ later lost on LinkedIn's other claim, breach of its user agreement, and the case settled. Earlier, in <em>Sandvig v. Barr</em> (D.D.C. 2020), a court held that researchers who would break a site's terms of service (by creating fake profiles to test for discrimination in housing and job ads) would not be committing a CFAA crime. The emerging picture: breaking terms of service is a contract matter, not a computer crime, while getting past passwords or other technical barriers is a crime unless you are authorized. The 2022 Justice Department policy adds that federal prosecutors should not charge "good-faith security research", but it binds only federal prosecutors; every US state has its own computer-crime law, and civil suits remain possible.</p>

<h3>Elsewhere</h3>
<p>The UK's Computer Misuse Act 1990 (CS 380) has no research exception, and researchers have long pressed for one. The EU's Directive 2013/40/EU requires member states to criminalize illegal access, system interference and data interference, "at least" when not minor cases; national laws vary. Belgium went furthest: since February 2023 its law has allowed anyone, without fraudulent or malicious intent, to look for vulnerabilities in systems in Belgium, even without the owner's permission, provided they do no more than necessary to show the problem, report it as soon as possible to the national cybersecurity center and the owner, and don't publish without the center's agreement. It shows that a research defense can be written down; whether its conditions are workable is still being learned. The Council of Europe's Budapest Convention (2001) is the main international treaty, with over 70 parties including the US. A UN Convention against Cybercrime was adopted by the General Assembly in December 2024 and opened for signature in October 2025; security researchers and human-rights groups criticized its broad offences and weak safeguards, and its effect will depend on which countries ratify it.</p>

<h3>Anti-circumvention</h3>
<p>Section 1201 of the US Digital Millennium Copyright Act (1998) forbids circumventing a "technological measure" that controls access to a copyrighted work (encryption on a game console, an authentication check on firmware), and trafficking in tools that do so, whether or not any copyright is then infringed. Because car software, medical devices and phones contain copyrighted code, this reached security research, repair and interoperability. Every three years the Librarian of Congress grants temporary exemptions, after public comment (Lesson 8). Since 2015 there has been an exemption for good-faith security research on lawfully acquired devices and software, broadened in 2018 and renewed in 2021 and 2024; it doesn't excuse breaking other laws, such as the CFAA. The EU's Copyright Directive (2001) has similar anti-circumvention rules.</p>

<h3>Disclosure: from norm to law</h3>
<p>Coordinated disclosure (CS 380 Lesson 8) grew up as a norm. Standards now describe it (ISO/IEC 29147 for disclosure and 30111 for handling reports). Since 2020 US federal agencies have had to publish a vulnerability disclosure policy (CISA's Binding Operational Directive 20-01), and good bug bounty policies include a <strong>safe harbor</strong>: a promise not to pursue legal action for research within the stated scope. A scope is authorization in writing, so stay inside it (the first programming problem audits a test log against one). Google Project Zero's "90+30" policy publishes details 30 days after a fix, or at 90 days if there is none; since a 2025 trial it also announces, within about a week, that it has reported a bug to a vendor (naming the vendor, the product and the deadline), without technical details. The second programming problem computes these dates.</p>
<p>Disclosure has also become a legal duty in several places:</p>
<ul>
<li>The EU's <strong>Cyber Resilience Act</strong> (Regulation 2024/2847) requires makers of "products with digital elements" sold in the EU to handle vulnerabilities for the product's support period. From 11 September 2026, they must report any <em>actively exploited</em> vulnerability and severe incident to the CSIRT (computer security incident response team, a national cybersecurity agency's response unit) that their member state has designated as coordinator and to ENISA (the EU Agency for Cybersecurity), through a single EU reporting platform: an early warning within 24 hours, a notification within 72 hours, and a final report within 14 days after a fix is available (one month after the notification, for incidents). Its other requirements apply from 11 December 2027.</li>
<li>The EU's <strong>NIS2 Directive</strong> (2022/2555) requires essential and important entities (energy, health, digital infrastructure and others) to report significant incidents on a similar 24-hour, 72-hour and one-month schedule.</li>
<li>Breaches of personal data must be reported under the GDPR within 72 hours (Lesson 3) and under the breach-notification laws that all 50 US states have. US public companies must disclose material cybersecurity incidents within four business days of deciding they are material (an SEC rule in force since December 2023).</li>
</ul>
<p>Hiding a breach can be a crime. In 2016 attackers stole data on 57 million Uber users and drivers and demanded money. Uber's chief security officer, Joe Sullivan, had them paid $100,000 through the bug bounty program and sign non-disclosure agreements, while the FTC was investigating Uber's security. In 2022 a jury convicted him of obstructing the FTC and concealing a felony; he was sentenced to probation. A bug bounty is for good-faith research, not for buying silence.</p>
<p class="note"><strong>Why it matters:</strong> the same technical act can be research, a contract breach or a crime depending on authorization and jurisdiction, and the duty to disclose now runs both ways: to the vendor, and from the vendor to regulators and users.</p>
`,
      terms: [
        ["CFAA", "The US Computer Fraud and Abuse Act, 18 U.S.C. § 1030, which criminalizes unauthorized access and damage to computers and gives a civil claim."],
        ["Exceeds authorized access", "Under Van Buren, obtaining information from parts of a computer system that are off limits to you, regardless of purpose."],
        ["Gates-up-or-down", "Van Buren's test: whether you were allowed into the part of the system you accessed, not why."],
        ["Anti-circumvention", "DMCA § 1201's ban on bypassing technical measures that control access to copyrighted works, with triennial exemptions."],
        ["Safe harbor (bug bounty)", "A program's promise not to take legal action against research conducted within its stated scope."],
        ["Actively exploited vulnerability", "A vulnerability for which there is reliable evidence that attackers have used it; reportable within 24 hours under the EU Cyber Resilience Act."],
        ["Breach notification", "A legal duty to tell regulators and affected people about a breach of personal data within a set time."]
      ],
      quiz: [
        { q: "Under Van Buren, an employee uses her legitimate database access to look up an ex-partner's address, against company policy. Under the CFAA's \"exceeds authorized access\" clause:", choices: ["It isn't covered, because she was entitled to access that information; her purpose doesn't matter", "It is a federal crime", "It is covered only if she shares it", "It depends on the state"], answer: 0, why: "The gates-up-or-down test looks at which parts of the system she could enter. Other laws or employment rules may still apply." },
        { q: "What did hiQ v. LinkedIn (9th Cir. 2022) suggest about scraping public profiles?", choices: ["It is always a crime", "It is protected by the First Amendment", "It is likely not access \"without authorization\" under the CFAA, though contract claims may remain", "It requires a DMCA exemption"], answer: 2, why: "There was no technical gate on public pages; hiQ later lost on the user-agreement claim." },
        { q: "Why does the 2022 DOJ policy not make good-faith research legally safe everywhere in the US?", choices: ["It has expired", "It covers only government systems", "It requires a license", "It binds only federal prosecutors; state laws and civil suits remain"], answer: 3, why: "Every state has its own computer-crime law, and companies can sue under § 1030(g)." },
        { q: "DMCA § 1201 can apply to a security researcher who:", choices: ["Reads public source code", "Bypasses encryption on device firmware to inspect it", "Writes a blog post", "Runs a port scan"], answer: 1, why: "Circumventing an access control on copyrighted code is the act § 1201 targets; the security-research exemption may cover lawfully acquired devices." },
        { q: "Under the EU Cyber Resilience Act, from 11 September 2026 a manufacturer that learns its product has an actively exploited vulnerability must send an early warning within:", choices: ["24 hours", "72 hours", "14 days", "90 days"], answer: 0, why: "Early warning within 24 hours, notification within 72 hours, final report within 14 days after a fix." },
        { q: "What made the Uber 2016 payment a crime rather than a bug bounty?", choices: ["It was used to conceal a breach from users and the FTC, with non-disclosure agreements", "The amount was too large", "Bug bounties are illegal", "The hackers were foreign"], answer: 0, why: "Concealment while regulators were investigating led to convictions for obstruction and misprision of a felony." }
      ],
      practice: [
        {
          q: `<p><strong>Analyze.</strong> For each, say which laws in this lesson could apply and why: (a) you change the user ID in a URL from 1001 to 1002 on a site you have an account on, and see another user's invoice; (b) you scrape public product prices from a site whose terms forbid scraping; (c) you extract firmware from a smart lock you bought, bypassing its encrypted bootloader, to look for bugs.</p>`,
          a: `<p>(a) This is a missing authorization check: the server doesn't verify that invoice 1002 belongs to you (an access-control failure of the kind CS 380 Lesson 7 covers, often called an insecure direct object reference). Accessing data that is off-limits to you is close to "exceeding authorized access" under Van Buren's gates, though courts disagree on whether a missing check is a gate; stop, touch no more data, and report. (b) After hiQ, likely not a CFAA crime because the data is public, but a breach-of-contract claim is possible, and EU database rights or the GDPR may apply if personal data is involved. (c) DMCA § 1201 applies to bypassing the bootloader; the security-research exemption likely covers a lawfully acquired device used in good faith, but not other violations.</p>`
        },
        {
          q: `<p><strong>Analyze.</strong> You report a vulnerability to a vendor on 2 March 2026 under a 90+30 policy. (a) When are details published if the vendor ships a fix on 15 May? (b) If the vendor never fixes it? (c) The vendor is an EU manufacturer that learns on 20 March 2026 that the bug is being exploited. What CRA reporting deadlines apply? What if it had learned this on 20 October 2026 instead?</p>`,
          a: `<p>(a) The deadline is 2 March + 90 days = 31 May; the fix on 15 May is within it, so details go public 30 days later, on 14 June. (b) On 31 May. (c) The CRA's reporting duty applies from 11 September 2026, so in March 2026 none applies yet (other laws, such as NIS2 or the GDPR, might). Learning on 20 October 2026: early warning by 21 October (24 hours), notification by 23 October (72 hours), and a final report within 14 days after a fix is available. Strong answers check the date the obligation starts.</p>`
        },
        {
          q: `<p><strong>Discuss.</strong> Should the UK add a statutory defense for security research to the Computer Misuse Act? Draft the defense in one or two sentences, and give the strongest objection to it.</p>`,
          a: `<p>A draft defense might cover access "for the purpose of identifying or reporting a vulnerability, where the person acted in good faith, took reasonable steps to avoid harm and to minimize access to personal data, and reported promptly to the owner or an appropriate authority". Objections: criminals will claim it; "good faith" is hard to prove; it may encourage testing systems whose owners didn't consent. Strong answers respond with conditions (prompt reporting, proportionality) and compare with the US approach of prosecutorial policy rather than statute.</p>`
        },
        {
          q: `<p><strong>Write (500–800 words).</strong> Write the "Legal and safe harbor" section of a vulnerability disclosure policy for a mid-sized company that sells connected devices in the US and the EU. Define scope, what researchers may and may not do, the safe harbor you offer and its limits, how you will handle reports, and how your policy fits your Cyber Resilience Act reporting duties.</p>`,
          a: `<p>Defines scope concretely (hosts, products, firmware versions), forbids harmful testing (denial of service, social engineering, accessing more personal data than needed), offers a safe harbor that covers the CFAA, DMCA § 1201 and contract claims to the extent the company can waive them (it can't bind prosecutors), commits to response times, and explains that actively exploited vulnerabilities will be reported to authorities within 24 hours under the CRA, so researchers know their report may trigger that.</p>`
        }
      ],
      sources: ["cfaa", "vanburen21", "doj2022cfaa", "cma1990", "certcvd", "pzpolicy", "cra2024"]
    },
    {
      id: "et7",
      title: "Speech, platforms and content moderation",
      minutes: 90,
      summary: "Section 230 and the First Amendment; the questions US courts left open about recommendations and design; the EU Digital Services Act's layered duties and first fines; and moderation at scale as a precision, recall and base-rate problem, with hash matching.",
      notes: `
<p>Every service that lets people post decides what stays up. Two legal models shape those decisions: the United States protects platforms from liability for what users post and for their moderation choices, and the European Union imposes procedural duties that grow with a platform's size. Underneath both is a measurement problem you already know from CS 370 Lesson 5.</p>

<h3>Section 230</h3>
<p>Section 230 of the Communications Act, 47 U.S.C. § 230 (1996), has two key sentences. Section 230(c)(1): "No provider or user of an interactive computer service shall be treated as the publisher or speaker of any information provided by another information content provider." So a platform isn't liable, as a newspaper would be, for defamation or other harms in users' posts. Section 230(c)(2) protects good-faith removal of material the provider considers "objectionable", so moderating doesn't create liability either. The sidebar explains why both were needed.</p>
<p>Courts read (c)(1) broadly from the start. In <em>Zeran v. America Online</em> (4th Cir. 1997), AOL was not liable for failing to remove defamatory posts even after it was told about them. The immunity has exceptions: federal criminal law, intellectual property (where the DMCA's notice-and-takedown process applies instead), and, since the 2018 FOSTA law, certain sex-trafficking claims. It doesn't protect content the platform itself creates or "develops".</p>
<p>The <strong>First Amendment</strong> is a separate layer: it restrains government, not private companies. A platform removing your post is not censorship in the constitutional sense; a law forcing it to carry or remove lawful speech raises First Amendment questions. In <em>Moody v. NetChoice</em> (2024), on Texas and Florida laws restricting moderation by large platforms, the Supreme Court sent the cases back to the lower courts but said that curating a feed (deciding what to include, exclude and rank) is the platform's own expressive activity, which the First Amendment protects.</p>

<h3>What US courts left open</h3>
<p>Are recommendations "information provided by another"? In <em>Gonzalez v. Google</em> (2023) families of terrorism victims argued that YouTube's recommendations of ISIS videos were YouTube's own conduct; the Supreme Court declined to decide, resolving a related case (<em>Twitter v. Taamneh</em>) on other grounds. In <em>Anderson v. TikTok</em> (3d Cir. 2024), a ten-year-old died attempting a "blackout challenge" that TikTok's For You page had shown her; the Third Circuit held that the algorithm's curation was TikTok's own expressive activity (citing <em>Moody</em>) and so not protected by § 230, while other circuits have treated recommendations as protected publishing. That disagreement is a circuit split the Supreme Court may eventually resolve.</p>
<p>Plaintiffs have also targeted <strong>design</strong> rather than content: infinite scroll, autoplay, notifications, weak age checks. In March 2026 a Los Angeles jury, in the first trial of thousands of consolidated claims, found Meta and YouTube negligent in the design of their services and liable for failing to warn, and awarded a young woman $6 million, half of it punitive damages; appeals were expected. Congress has carved out specific harms rather than repealing § 230: the TAKE IT DOWN Act (2025) makes publishing non-consensual intimate images, including AI-generated ones, a federal crime, and since May 2026 requires platforms to remove them within 48 hours of a valid request. Proposals to repeal or narrow § 230 more broadly are contested on both left and right, for opposite reasons.</p>

<h3>The EU Digital Services Act</h3>
<p>The Digital Services Act (Regulation 2022/2065, fully applicable since 17 February 2024) keeps the EU's older rule that a host isn't liable for illegal content it doesn't know about, provided it acts quickly once it does. On top of that it layers procedural duties by size. A <em>hosting service</em> stores information its users provide (web hosting, cloud storage). An <em>online platform</em> is a hosting service that also makes that information public at users' request: social networks, marketplaces, app stores, video sites; private messaging and email are not platforms. Online platforms run by micro or small enterprises (fewer than 50 staff and at most €10 million turnover) are exempt from the extra platform duties (Article 19), unless designated very large.</p>
<ul>
<li><strong>All hosting services</strong>: a notice-and-action mechanism for reporting illegal content (Article 16), and a <strong>statement of reasons</strong> to the user for every removal or restriction (Article 17). Statements from online platforms go into a public transparency database, which by 2026 held billions of entries.</li>
<li><strong>Online platforms</strong>: an internal complaint system (Article 20), access to certified out-of-court dispute settlement (Article 21), priority for "trusted flaggers" (Article 22), transparency about recommender systems and ads, and a ban on ads targeted at minors or using sensitive data.</li>
<li><strong>Very large online platforms and search engines</strong> (at least 45 million monthly users in the EU): annual assessments and mitigation of systemic risks such as illegal content, effects on elections and harms to minors (Articles 34–35), independent audits, a recommender option not based on profiling, and data access for vetted researchers (Article 40). The Commission supervises them directly; fines reach 6% of worldwide annual turnover.</li>
</ul>
<p>The first fines came in 2025–26: €120 million against X in December 2025 (for its paid "blue check" design, its ad repository and researcher data access) and €200 million against Temu in May 2026 (for failing to assess the risk of illegal products). In February 2026 the Commission issued preliminary findings that TikTok's addictive design (infinite scroll, autoplay, push notifications, its recommender) breached the DSA's risk duties; as of November 2026 a final decision was pending. The UK's Online Safety Act 2023 takes a third approach: duties of care for illegal content (in force since March 2025) and for protecting children (since July 2025), enforced by Ofcom.</p>

<h3>Moderation at scale</h3>
<p>Whatever the law, a large platform moderates mostly by machine, because people can't read everything. Take a platform with 500 million posts a day, of which 0.2% violate a policy. A classifier with precision 0.9 and recall 0.8 gives:</p>
<pre><code>posts = 500_000_000
violating = posts * 0.002
precision, recall = 0.9, 0.8
caught = violating * recall
wrong = caught * (1 - precision) / precision
missed = violating - caught
print(int(violating), int(caught), round(wrong), int(missed))   # 1000000 800000 88889 200000</code></pre>
<p>Each day, about 89,000 posts are wrongly removed and 200,000 violating posts stay up. At this scale every small rate is a large number of people, and each wrong removal is someone's speech. Base rates (MATH 230 Lesson 1) make it worse: a false-positive rate of just 0.1% on the 499 million good posts is 499,000 wrong removals, so to reach precision 0.9 the classifier needs a false-positive rate near 0.018%.</p>
<p>The removal threshold sets the trade-off between the two errors (the programming problem picks a threshold for a precision target). It is a policy decision dressed as a parameter: a lower threshold protects people from harmful content at the cost of more wrongful removals. Platforms use several thresholds: remove automatically above a high score, send the middle band to human reviewers, and leave the rest. The DSA's statements of reasons, complaints and appeals are the legal machinery for correcting the errors that remain, and they have to be staffed for the volumes above. Human review has its own costs: moderators who view violent and abusive material for hours a day have sued platforms and their contractors in the US and Kenya over psychological harm.</p>

<h3>Matching known content</h3>
<p>For content already judged illegal, such as known child sexual abuse material (which US providers must report to the National Center for Missing &amp; Exploited Children), platforms compare uploads with databases of known items. A cryptographic hash (CS 380 Lesson 3) changes completely if one pixel changes, so they use <strong>perceptual hashes</strong>, which change little under resizing, compression or small edits. Microsoft's PhotoDNA (2009, with Hany Farid) is the best known. The second programming problem builds the simplest one, an average hash, and matches by Hamming distance. Perceptual hashing has a precision-recall trade-off of its own: a larger distance threshold catches more altered copies and more innocent look-alikes. When Apple proposed scanning photos on iPhones in 2021 with its NeuralHash, researchers produced different images with identical hashes within weeks, and Apple abandoned the plan in 2022, after criticism that client-side scanning could be repurposed for surveillance.</p>
`,
      terms: [
        ["Section 230", "47 U.S.C. § 230: providers aren't treated as the publisher of users' content, and are protected for good-faith removal."],
        ["Statement of reasons", "The DSA's required explanation to a user of why their content was removed or restricted."],
        ["Very large online platform", "Under the DSA, a platform with at least 45 million average monthly users in the EU, subject to systemic-risk duties."],
        ["Notice and action", "A mechanism for anyone to report illegal content to a host, which must then act on it."],
        ["Systemic risk assessment", "A very large platform's annual analysis of how its service contributes to risks such as illegal content and harms to minors, with mitigations."],
        ["Perceptual hash", "A fingerprint of an image that changes little under small edits, so near-copies can be matched by distance."],
        ["Hamming distance", "The number of bit positions in which two equal-length bit strings differ."]
      ],
      quiz: [
        { q: "A user posts a defamatory review on a platform. Under § 230(c)(1), who can be held liable for the defamation?", choices: ["The platform", "Both equally", "The user who wrote it", "Neither"], answer: 2, why: "The platform isn't treated as the publisher of another's content; the author remains liable." },
        { q: "Which is NOT an exception to § 230's immunity?", choices: ["Federal criminal law", "Intellectual property", "Certain sex-trafficking claims (FOSTA)", "State defamation law"], answer: 3, why: "Defamation claims based on users' content are the core of what § 230 bars." },
        { q: "What did the Supreme Court say in Moody v. NetChoice (2024)?", choices: ["Platforms must carry all lawful speech", "Section 230 is unconstitutional", "States may regulate all moderation", "Curating a feed is the platform's own expressive activity protected by the First Amendment"], answer: 3, why: "The Court remanded the cases but explained that editorial curation is protected expression." },
        { q: "Under the DSA, what must a platform give a user whose post it removes?", choices: ["Nothing", "A statement of reasons, and access to complaint and appeal routes", "A refund", "A court hearing"], answer: 1, why: "Article 17 requires a statement of reasons; Articles 20–21 provide complaints and out-of-court settlement." },
        { q: "A classifier flags posts with precision 0.8. Of 10,000 removals a day, how many are wrong?", choices: ["2,000", "200", "8,000", "800"], answer: 0, why: "Precision is the fraction of removals that are correct: 20% of 10,000 are wrong." },
        { q: "Why do platforms match known images with perceptual rather than cryptographic hashes?", choices: ["They are faster to compute", "They are collision-proof", "They change little under resizing and small edits, so near-copies still match", "The law requires it"], answer: 2, why: "A cryptographic hash changes completely with one pixel; the trade-off is more look-alike false matches." }
      ],
      practice: [
        {
          q: `<p><strong>Analyze.</strong> A platform has 200 million posts a day, of which 0.5% are hate speech under its policy. Model A: precision 0.95, recall 0.6. Model B: precision 0.85, recall 0.85. For each, compute wrongful removals and missed posts per day. Which would you deploy, and what else would you want to know?</p>`,
          a: `<p>Violating posts: 1,000,000. A: caught 600,000, wrongful 600,000 × 0.05/0.95 ≈ 31,579, missed 400,000. B: caught 850,000, wrongful 850,000 × 0.15/0.85 = 150,000, missed 150,000. B trades about 118,000 more wrongful removals for 250,000 fewer misses. Strong answers ask how harmful each kind of error is, how errors are distributed across languages and communities (a disaggregated evaluation, Lesson 4), whether a human-review band could combine A's precision with B's recall, and what appeal capacity is needed.</p>`
        },
        {
          q: `<p><strong>Analyze.</strong> Average hashes are 64 bits. If an innocent image's hash were a uniformly random 64-bit string, what is the probability it lands within Hamming distance 4 of a given known hash? Why is the real false-match rate likely higher?</p>`,
          a: `<p>The number of strings within distance 4 is C(64,0) + C(64,1) + C(64,2) + C(64,3) + C(64,4) = 1 + 64 + 2,016 + 41,664 + 635,376 = 679,121, so the probability is 679,121/2<sup>64</sup> ≈ 3.7 × 10<sup>−14</sup>. Against a database of a million hashes, multiply by 10<sup>6</sup>: still tiny. But real hashes aren't uniform: simple images (a mostly dark photo, a screenshot of text) produce similar hashes, so false matches cluster, and adversaries can deliberately craft collisions, as with NeuralHash.</p>`
        },
        {
          q: `<p><strong>Discuss.</strong> Should § 230 protect a platform's recommendation algorithm when it promotes harmful content to a user? Lay out the Third Circuit's reasoning in Anderson v. TikTok and the strongest argument on the other side, then take a position.</p>`,
          a: `<p>The Third Circuit reasoned that if curation is the platform's own expression (Moody), it can't also be "information provided by another"; the other side argues that every platform orders content, so treating ranking as the platform's own speech would erase § 230, and that the harm still comes from third-party content. Strong answers consider line-drawing options (design features versus content, paid promotion versus organic ranking), the effect on small platforms and open-source software, and the First Amendment limits that remain even without § 230.</p>`
        },
        {
          q: `<p><strong>Write (500–800 words).</strong> You run trust and safety for a mid-sized social app expanding from the US into the EU, where it will have about 8 million monthly users. List the DSA duties that will apply and those that won't, design the moderation pipeline (thresholds, human review, statements of reasons, appeals) with estimated volumes, and identify the ethical trade-off you found hardest.</p>`,
          a: `<p>Correctly identifies the app as an online platform but not a very large one (below 45 million), so Articles 16, 17 and 20–22 and the transparency and minors' advertising rules apply, while systemic-risk assessments, audits and researcher data access don't; estimates daily volumes and staffing from assumed rates; designs a threshold band for human review; and discusses a real trade-off, such as speed of removal versus wrongful removals of minority-language speech.</p>`
        }
      ],
      sources: ["usc230", "moody24", "dsa", "acm"]
    },
    {
      id: "et8",
      title: "AI governance, accessibility law and making policy",
      minutes: 90,
      summary: "The EU AI Act's risk tiers and timeline after its 2026 amendment; general-purpose models and the compute threshold; US federal and state approaches and the 2025 push to preempt state laws; the NIST AI RMF; accessibility law (ADA, Section 508, the European Accessibility Act); and how technologists take part in making policy.",
      notes: `
<p>CS 100 Lesson 5 introduced the EU AI Act's risk-based approach and the NIST AI Risk Management Framework, and CS 100 Lesson 6 introduced WCAG. This lesson works through how those rules apply to real systems as of November 2026, and ends with how you, as a technologist, can help write the next ones.</p>

<h3>The EU AI Act</h3>
<p>The AI Act (Regulation 2024/1689) entered into force on 1 August 2024 and applies in stages. It sorts AI <em>uses</em> into tiers:</p>
<ul>
<li><strong>Prohibited practices</strong> (Article 5, since 2 February 2025): social scoring; manipulation or exploitation of vulnerabilities that causes significant harm; predicting crime from profiling alone; untargeted scraping of faces to build recognition databases; emotion recognition at work or school (inferring emotions such as stress or boredom, except for medical or safety reasons; detecting cheating is not emotion recognition, and is an Annex III use below); biometric categorization that infers sensitive traits such as race or sexual orientation; and real-time remote biometric identification in public places for policing, with narrow exceptions. The 2026 amendment added bans, from 2 December 2026, on systems that generate non-consensual intimate images of identifiable people or child sexual abuse material.</li>
<li><strong>High-risk systems</strong> (Article 6): safety components of products already covered by EU safety laws listed in Annex I (machinery, medical devices, toys, cars), and uses listed in Annex III: biometrics, critical infrastructure, education (admissions, grading, and proctoring that detects cheating in tests), employment, access to essential services (credit scoring, benefits, insurance pricing), law enforcement, migration, and justice and elections. An Annex III system isn't high-risk if it only performs a narrow procedural or preparatory task, unless it profiles people (Article 6(3)). Providers must run a risk-management system, govern training data (including examining it for bias), keep technical documentation and logs, ensure human oversight and adequate accuracy and robustness, and pass a conformity assessment.</li>
<li><strong>Transparency duties</strong> (Article 50): people must be told when they are talking to an AI system; generated audio, images, video and text must be marked as artificial in a machine-readable way; and deepfakes must be disclosed.</li>
<li>Everything else is <strong>minimal risk</strong>, with no new duties beyond a general duty to support AI literacy.</li>
</ul>
<p>The timeline has already moved once. The "Digital Omnibus on AI" (Regulation 2026/1744, in force since 27 July 2026), the AI half of a November 2025 Commission package whose other, data-protection half was still being negotiated (Lesson 3), postponed the high-risk obligations because the technical standards meant to define them weren't ready:</p>
<table>
<tr><th>Obligation</th><th>Applies from</th></tr>
<tr><td>Prohibitions; AI literacy</td><td>2 February 2025</td></tr>
<tr><td>General-purpose AI models</td><td>2 August 2025</td></tr>
<tr><td>Transparency (Article 50)</td><td>2 August 2026 (generative systems already on the market: 2 December 2026 for marking output)</td></tr>
<tr><td>New bans on intimate deepfakes and abuse material</td><td>2 December 2026</td></tr>
<tr><td>High-risk, Annex III uses</td><td>2 December 2027 (was 2 August 2026)</td></tr>
<tr><td>High-risk, Annex I products</td><td>2 August 2028 (was 2 August 2027)</td></tr>
</table>
<p>Fines reach €35 million or 7% of worldwide turnover for prohibited practices. The programming problem implements a simplified version of these tiers and dates; check EUR-Lex for the consolidated text before relying on any of them.</p>

<h3>General-purpose models and compute</h3>
<p>Providers of general-purpose AI models must document them, give downstream providers the information they need, respect copyright opt-outs and publish a training-content summary (Lesson 2). Models trained with more than 10<sup>25</sup> floating-point operations are presumed to pose <strong>systemic risk</strong> and must also evaluate and mitigate it, report serious incidents and ensure cybersecurity. A voluntary Code of Practice (July 2025) describes how to comply. Training compute can be estimated with a rule of thumb from Kaplan and colleagues (2020), which CS 470 Lesson 6 derives if you took it: training costs about 6 floating-point operations per parameter per training token, 2 for the forward pass and 4 for the backward pass.</p>
<pre><code>def train_flops(params, tokens):
    return 6 * params * tokens

for params, tokens in [(8e9, 15e12), (70e9, 15e12), (400e9, 15e12)]:
    f = train_flops(params, tokens)
    print(f"{f:.1e}", f > 1e25)</code></pre>
<pre data-label="Output"><code>7.2e+23 False
6.3e+24 False
3.6e+25 True</code></pre>
<p>A threshold on compute is easy to measure, but it is a proxy: a smaller model trained more efficiently can be as capable as a larger one, and the Commission can designate models below the threshold.</p>

<h3>The United States</h3>
<p>The US has no comprehensive federal AI law. Executive Order 14110 (2023) on AI safety was revoked on 20 January 2025; the July 2025 AI Action Plan emphasized removing barriers to AI development and directed NIST to revise its AI Risk Management Framework. Executive Order 14365 (December 2025) set up a Justice Department task force to challenge state AI laws the administration considers burdensome and asked for a federal law to preempt them; preemption by executive order alone is legally contested, since only Congress can generally displace state law. Meanwhile the states act: Colorado's 2024 AI Act was repealed before it took effect and replaced in 2026 by a narrower law on automated decisions (notices, disclosures and some consumer rights), effective 1 January 2027; California's SB 53 (2025) requires the largest frontier-model developers to publish safety frameworks and report critical incidents; Texas's TRAIGA (effective 2026) bans certain harmful uses; and New York City's bias audits apply to hiring tools (Lesson 4). Existing laws apply to AI too: the FTC Act, anti-discrimination law, product liability.</p>
<p>The <strong>NIST AI RMF</strong> (2023) is voluntary and organized around four functions: <em>govern</em> (policies, roles and accountability), <em>map</em> (the context, intended uses and who is affected), <em>measure</em> (test for accuracy, bias, robustness and security, disaggregated by group) and <em>manage</em> (prioritize and treat risks, and monitor after deployment), with a 2024 profile for generative AI. ISO/IEC 42001 (2023) is a certifiable standard for AI management systems. Many companies use these to meet several jurisdictions' rules at once.</p>

<h3>Accessibility law</h3>
<p>The Americans with Disabilities Act (1990) prohibits disability discrimination by state and local governments (Title II) and businesses open to the public (Title III). In April 2024 the Justice Department made WCAG 2.1 level AA the required standard for state and local governments' websites and apps. An <strong>interim final rule</strong> of April 2026 pushed the compliance dates back a year. (The Administrative Procedure Act, described below, normally requires notice and comment first but lets an agency skip it for "good cause" (when it would be "impracticable, unnecessary, or contrary to the public interest"); such a rule can take effect at once and is binding, and the agency takes comments afterward and may revise it. This one took effect on 20 April 2026 and took comments until 22 June.) The new dates are 26 April 2027 for entities serving 50,000 or more people and 26 April 2028 for smaller ones; the obligation not to discriminate applies meanwhile. For businesses there is still no web regulation, and courts disagree on whether a website alone is a "place of public accommodation"; thousands of lawsuits are filed each year. Section 508 of the Rehabilitation Act requires federal agencies' technology to meet WCAG 2.0 AA. In the EU, the European Accessibility Act has applied since 28 June 2025 to products and services such as e-commerce, banking, e-books and ticketing, using the EN 301 549 standard. The programming problem automates a few WCAG checks; automated checks find only part of the failures, so manual testing with a keyboard and a screen reader (CS 100 Lesson 6) still matters.</p>

<h3>Taking part in making policy</h3>
<p>Most of the law in this course was shaped by people outside government, and technologists have unusual leverage because policymakers often lack technical expertise. Routes in:</p>
<ul>
<li><strong>Public comment.</strong> US agencies must publish proposed rules and consider public comments before finalizing them (the Administrative Procedure Act, 1946); dockets are on regulations.gov. The DMCA § 1201 exemptions (Lesson 6) come from this process. The EU publishes consultations on its "Have your say" portal.</li>
<li><strong>Standards bodies</strong> (W3C, IETF, ISO/IEC, CEN-CENELEC for the AI Act's harmonised standards) write the technical details that laws refer to.</li>
<li><strong>Testimony and briefs</strong>: legislative hearings, and amicus briefs that explain technology to courts, as computer scientists did in <em>Google v. Oracle</em> and security researchers in <em>Van Buren</em>.</li>
<li><strong>Inside organizations</strong>: writing the company policy, the design review checklist and the impact assessment is policy work too.</li>
</ul>
<p>An effective comment is specific: it names the docket and the provision, says what you recommend and why, gives evidence (a measurement, a prototype, a cost estimate), considers who else is affected, and proposes text. Agencies must respond to significant comments, so a technically precise comment can change a rule. To keep your facts current, use primary sources: EUR-Lex for EU law, the Federal Register and congress.gov for US federal law, state legislature sites, and CourtListener for court dockets, and write down the date you checked.</p>
`,
      terms: [
        ["Prohibited AI practice", "A use banned outright by Article 5 of the EU AI Act, such as social scoring or untargeted face scraping."],
        ["High-risk AI system", "Under the AI Act, a safety component of a regulated product or an Annex III use such as hiring or credit scoring, subject to strict requirements."],
        ["Conformity assessment", "The process of showing a high-risk AI system meets the AI Act's requirements before it is placed on the market."],
        ["Systemic risk (GPAI)", "The AI Act's category for the most capable general-purpose models, presumed above 10^25 training operations."],
        ["NIST AI RMF", "A voluntary US framework for managing AI risk, organized as govern, map, measure and manage."],
        ["Preemption", "A higher level of government's law displacing a lower level's, such as federal law overriding state law."],
        ["Notice and comment", "The process by which US agencies publish proposed rules and must consider public comments before finalizing them."],
        ["European Accessibility Act", "An EU directive applying since June 2025 that requires many products and services to be accessible."]
      ],
      quiz: [
        { q: "A company deploys an AI system that infers employees' emotions from webcam video to rate their engagement. Under the AI Act this is:", choices: ["Minimal risk", "A transparency obligation only", "Prohibited", "High-risk only"], answer: 2, why: "Emotion recognition in the workplace is banned except for medical or safety reasons." },
        { q: "After the 2026 Digital Omnibus, when do the high-risk obligations for an Annex III credit-scoring system apply?", choices: ["2 August 2025", "2 August 2026", "2 December 2027", "Never"], answer: 2, why: "The amendment moved Annex III obligations from August 2026 to 2 December 2027." },
        { q: "A résumé tool only converts PDFs to text before a human reviews them, and doesn't profile anyone. Is it high-risk?", choices: ["Yes, all employment AI is high-risk", "It is prohibited", "Only in Germany", "Likely not, under Article 6(3)'s exception for narrow procedural tasks"], answer: 3, why: "The exception covers narrow procedural or preparatory tasks, unless the system profiles people." },
        { q: "Using the 6 × parameters × tokens rule, is a 100-billion-parameter model trained on 20 trillion tokens above the 10^25 threshold?", choices: ["No, 1.2 × 10^24", "Yes, 1.2 × 10^25", "Yes, 1.2 × 10^26", "No, 2 × 10^24"], answer: 1, why: "6 × 10^11 × 2 × 10^13 = 1.2 × 10^25." },
        { q: "Which NIST AI RMF function covers testing a model's accuracy separately for each affected group?", choices: ["Govern", "Map", "Measure", "Manage"], answer: 2, why: "Measure is about testing and evaluating the identified risks." },
        { q: "What makes a public comment on a proposed rule most likely to matter?", choices: ["Specific provisions, evidence and proposed text", "Length", "Signatures from many people", "Strong language"], answer: 0, why: "Agencies must respond to significant comments; precise technical evidence is hard to ignore." }
      ],
      practice: [
        {
          q: `<p><strong>Analyze.</strong> Classify each under the AI Act and give the date its main obligations apply: (a) a chatbot answering questions on a bank's website; (b) a model that sets credit limits for the bank's customers; (c) an exam-proctoring system that flags students as cheating from webcam video; (d) a spam filter.</p>`,
          a: `<p>(a) Transparency: users must be told they are talking to an AI, from 2 August 2026. (b) High-risk (Annex III, essential services: creditworthiness), from 2 December 2027. (c) High-risk (Annex III, education: monitoring prohibited behavior during tests), from 2 December 2027; if it inferred students' emotions, it would be prohibited (emotion recognition in education) since 2 February 2025. (d) Minimal risk.</p>`
        },
        {
          q: `<p><strong>Analyze.</strong> A city government with 300,000 residents asks whether its permit portal must meet WCAG 2.1 AA, and by when. A private bookstore in the same city asks the same question. Answer both, citing the rule and its status in late 2026.</p>`,
          a: `<p>The city is a Title II entity serving 50,000 or more people, so the 2024 rule requires WCAG 2.1 AA, with compliance now due 26 April 2027 under the 2026 interim final rule; it must not discriminate meanwhile. The bookstore is covered by Title III, which has no web regulation; courts disagree on whether websites are covered, so WCAG 2.1 or 2.2 AA is the practical target to reduce legal risk. If it sells to EU consumers, the European Accessibility Act may apply to its e-commerce, unless it is a microenterprise.</p>`
        },
        {
          q: `<p><strong>Discuss.</strong> Should US AI regulation happen mainly at the federal level, with state laws preempted, or should states be free to experiment? Use Colorado's experience and Executive Order 14365 as evidence.</p>`,
          a: `<p>Strong answers weigh the cost of fifty different regimes for developers (especially small ones) against the value of states as laboratories that can act when Congress doesn't; note that Colorado's law changed before taking effect, which supporters of preemption cite as proof of unworkability and opponents as proof that states learn; and address the legal question of whether an executive order can preempt state law without Congress.</p>`
        },
        {
          q: `<p><strong>Write (500–800 words).</strong> Find an open US federal docket (on regulations.gov) or EU consultation on a computing topic: AI, privacy, accessibility, security or platforms. Write a public comment: identify the docket and the provision you address, state your recommendation, support it with technical evidence (a measurement, a calculation or a prototype you built), and propose specific text. Submitting it is optional.</p>`,
          a: `<p>Names a real, open docket with its identifier; addresses a specific provision rather than the topic in general; gives technical evidence the agency may not have; anticipates the strongest objection; and proposes concrete text. Strong comments are short, precise and written for a reader who is expert in law but not in computing.</p>`
        }
      ],
      sources: ["euaiact", "aiomnibus", "nistrmf", "eo14365", "ada2024", "wcag22", "kaplan20"]
    }
  ]
});

CSA.addAsides("cs480", {
  et1: [
    { kind: "history", title: "The night before Challenger", html: `<p>On the evening of 27 January 1986, engineers at Morton Thiokol, which built the space shuttle's solid rocket boosters, argued in a teleconference with NASA that the next morning's launch should be delayed. The forecast was for temperatures below freezing overnight, far colder than any previous launch, and data from earlier flights showed the rubber O-rings that sealed the booster joints eroding more at low temperatures. Roger Boisjoly and his colleagues recommended not launching below 53°F (12°C), the coldest launch so far. NASA managers pushed back, and during an off-line caucus a Thiokol senior vice president told the engineering vice president to "take off his engineering hat and put on his management hat". Thiokol's managers reversed the recommendation. Challenger launched at about 36°F (2°C) and broke apart 73 seconds later, killing all seven crew. The presidential (Rogers) commission found that the decision process was flawed and that the engineers' concerns had not reached NASA's top managers. Boisjoly testified about what had happened, and was shunned at work afterwards. The case is still the standard example of an engineering warning that was given, correctly, and overruled.</p>`, sources: ["rogers86"] }
  ],
  et3: [
    { kind: "practice", title: "Differential privacy in the 2020 census", html: `<p>US law (13 U.S.C. § 9) forbids the Census Bureau from publishing data that identifies any person. After the 2010 census, the Bureau's own researchers reconstructed individual records (block, age, sex, race and ethnicity) for most of the population from the published tables, and matched many of them to commercial data. For 2020 it switched to differential privacy, adding noise to its tables with a system called the TopDown Algorithm and then post-processing the results so that counts are whole numbers and add up consistently. The total privacy-loss budget for the redistricting data was ε = 17.14 for person tables and 2.47 for housing-unit tables: high by academic standards, chosen after users complained that early tests at lower ε distorted small-area counts. Alabama sued to stop the change in 2021; a three-judge federal court declined to block it. Demographers still disagree about the accuracy of small-area statistics for rural and minority communities, and the Bureau has said it will revisit its methods for later products. The episode shows ε becoming a public policy choice, made in the open, about how to balance accuracy against privacy.</p>`, sources: ["census2020dp"] }
  ],
  et7: [
    { kind: "history", title: "Why Section 230 exists", html: `<p>Two New York court decisions in the early 1990s created what looked like a trap. In <em>Cubby v. CompuServe</em> (1991), CompuServe, which didn't review the content of its forums, was treated like a bookstore and was not liable for a defamatory newsletter it carried without knowing what was in it. In <em>Stratton Oakmont v. Prodigy</em> (1995), Prodigy, which advertised itself as a family-friendly service and moderated its boards, was treated like a publisher and could be liable for a user's post accusing the brokerage Stratton Oakmont of fraud. The lesson for online services was perverse: moderate and be liable, or don't look at all. Representatives Chris Cox and Ron Wyden wrote Section 230 to remove that choice, and it passed in 1996 as part of the Communications Decency Act. The Supreme Court struck down the Act's indecency provisions the next year (<em>Reno v. ACLU</em>, 1997), but Section 230 survived, and its 26 words in (c)(1) became the legal foundation for search engines, social media, review sites and Wikipedia.</p>`, sources: ["usc230"] }
  ]
});
