CSA.addCourse({
  id: "cs100",
  code: "CS 100",
  title: "Computing in Society",
  credits: 2,
  kind: "required",
  term: "y1f",
  summary: "A seminar on where computing came from, what the field covers, and the responsibilities that come with building technology. Each unit pairs a reading with discussion questions and a short writing assignment.",
  prereqs: [],
  practiceLabels: { title: "Discussion and writing", intro: "Prepare notes on each discussion question before the seminar meeting, and submit the writing assignment by the due date. Open the guidance only after you have drafted your own answer.", answer: "What a strong response does" },
  rubric: {
    criteriaFor: "written reflections and the case analysis",
    assessments: [
      { name: "Seminar participation", weight: 20, desc: "Coming prepared, contributing to each week's discussion questions, and responding to classmates' points. Quality matters more than quantity." },
      { name: "Weekly writing", weight: 30, desc: "The short writing assignment at the end of each unit, 300–500 words. Graded with the criteria below; your lowest score is dropped." },
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts." },
      { name: "Case analysis", weight: 25, desc: "A 1,500-word analysis of a real computing controversy of your choice, using at least two ethical frameworks and at least four credible sources. A draft gets peer feedback before the final version." },
      { name: "Final presentation", weight: 15, desc: "A 7-minute presentation of your case analysis to the seminar, followed by questions." }
    ],
    criteria: [
      { name: "Argument", desc: "Is there a clear position?", levels: [
        "States a clear, specific position and develops it step by step to a conclusion.",
        "Has a position, but it is broad or some steps are weak.",
        "Describes the issue without taking or defending a position.",
        "No discernible argument." ] },
      { name: "Evidence", desc: "Is it grounded in facts and sources?", levels: [
        "Uses accurate, relevant facts from credible sources, cited correctly.",
        "Mostly accurate evidence; a citation is missing or a source is weak.",
        "Relies on opinion or a single source; some claims are inaccurate.",
        "No evidence, or evidence that is wrong." ] },
      { name: "Ethical reasoning", desc: "Are perspectives weighed fairly?", levels: [
        "Identifies the stakeholders, applies frameworks accurately, and answers the strongest objection.",
        "Applies a framework but misses an important stakeholder or objection.",
        "Mentions ethics in general terms without real analysis.",
        "Ignores the ethical dimension." ] },
      { name: "Clarity", desc: "Can a reader follow it easily?", levels: [
        "Organized, concise and precise; technical terms are explained for a general reader.",
        "Generally clear, with some wordiness or unexplained jargon.",
        "Hard to follow in places; ideas are out of order.",
        "Disorganized and unclear." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Respectful disagreement:</b> discussions cover contested topics. Challenge ideas, not people, and assume good faith.",
      "<b>Sources:</b> cite everything you use. Prefer primary sources, peer-reviewed research, and established journalism; check any claim an AI tool gives you before using it.",
      "<b>AI assistants:</b> you may use them to brainstorm or get feedback, and must say how. The argument and the writing must be your own.",
      "<b>Late work:</b> weekly writing is accepted up to three days late for half credit, because it feeds each week's discussion."
    ]
  },
  outcomes: [
    "Describe the major milestones in the history of computing",
    "Name the main areas of computer science and how they connect",
    "Apply ethical frameworks and the ACM Code of Ethics to real cases",
    "Explain core privacy concepts and why anonymization often fails",
    "Discuss the benefits and risks of AI systems and use AI tools responsibly",
    "Design with accessibility in mind"
  ],
  units: [
    {
      id: "u1",
      title: "A short history of computing",
      minutes: 90,
      summary: "Six eras, from gears to neural networks: what each generation of machines made possible, and the ideas that carried forward.",
      notes: `
<p>The history of computing is easier to remember as a story than as a list of dates. Each era solved a problem the previous one left behind, and a few big ideas keep coming back. A six-word hook keeps the eras in order:</p>
<div class="callout"><strong>Gears → Cards → Tubes → Chips → Nets → Neural nets.</strong> Mechanical calculation, punched-card programs, electronic computers, silicon chips, networks, and machines that learn.</div>

<h3>1. Gears: calculating with machinery (antiquity to the 1840s)</h3>
<p>The oldest surviving computing device is the <strong>Antikythera mechanism</strong>, a box of bronze gears made in Greece more than 2,000 years ago and found in a shipwreck in 1901. Turning a handle moved dials that showed the positions of the sun and moon and predicted eclipses. It illustrates the first big idea: <em>a mechanism can model something else</em>, in this case the sky.</p>
<p>For centuries afterward, "computing" meant people doing arithmetic, helped by the abacus, printed tables of logarithms and, from the 1640s, mechanical adding machines designed by Blaise Pascal and later Gottfried Leibniz. Science, engineering and navigation depended on printed tables of numbers, and those tables were full of human errors.</p>
<p>That problem drove <strong>Charles Babbage</strong>. In the 1820s he designed the <strong>Difference Engine</strong> to calculate and print tables automatically. Money and engineering troubles stopped the project, but in 1991 London's Science Museum built his Difference Engine No. 2 from his drawings, and it worked. By 1837 Babbage had designed something far more ambitious, the <strong>Analytical Engine</strong>: a general-purpose machine with a "mill" that did arithmetic and a "store" that held numbers. Today we call these the <em>processor</em> and the <em>memory</em>. Its program was to be fed in on punched cards, and it could choose what to do next based on a result, an ancestor of the <code>if</code> statement.</p>
<p><strong>Ada Lovelace</strong> saw further than anyone. In 1843 she translated an article about the Analytical Engine and added notes three times longer than the article itself. Her Note G sets out, step by step, how the engine could compute Bernoulli numbers, and it is often called the first published computer program. She also argued that such a machine could work with anything represented by symbols, such as music, not just numbers. The Analytical Engine was never built.</p>
<p class="note"><strong>Why it matters:</strong> a separate processor and memory, and the idea of one general-purpose programmable machine, were on paper a century before electronics.</p>

<h3>2. Cards: programs and data you can hold (1804 to the 1930s)</h3>
<p>Babbage borrowed punched cards from weaving. In 1804 <strong>Joseph-Marie Jacquard</strong> built a loom controlled by a chain of cards, where a hole meant "lift this thread". Swapping the cards changed the pattern without changing the loom. That is the second big idea: <em>the instructions are separate from the machine and can be swapped</em>. Lovelace made the connection herself, writing that the Analytical Engine "weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves."</p>
<p>Cards also became the way to store <em>data</em>. The 1880 U.S. census took most of a decade to tabulate by hand, and the population kept growing. <strong>Herman Hollerith</strong> recorded each person as a pattern of holes in a card and built electric machines that counted the cards. The 1890 census was tabulated far faster, saving years of work. Hollerith's company later merged with others and was renamed <strong>IBM</strong> in 1924. For half a century, businesses and governments ran on punched cards.</p>
<p class="note"><strong>Why it matters:</strong> once instructions and records lived on cards, both could be changed, copied and processed by machine. That is the beginning of software and of data processing.</p>

<h3>3. Tubes: the first electronic computers (1936 to the 1950s)</h3>
<p>In 1936, before any electronic computer existed, <strong>Alan Turing</strong> asked what it means to compute at all. He imagined a simple machine that reads and writes symbols on a tape, and showed that one <em>universal</em> machine can imitate any other if it is given that machine's description as input. That is the third big idea: <em>one machine, any program</em>. It is why the same laptop can be a word processor, a game and a compiler.</p>
<p>World War II turned theory into hardware:</p>
<ul>
  <li><strong>Germany:</strong> Konrad Zuse completed the <strong>Z3</strong> in 1941, a programmable computer built from telephone relays. It was destroyed in an air raid in 1943.</li>
  <li><strong>Britain:</strong> at Bletchley Park, codebreakers used electromechanical "Bombes" against the Enigma cipher. Engineer Tommy Flowers built <strong>Colossus</strong> (1944), an electronic machine with about 1,600 vacuum tubes, to attack the cipher used by the German high command. It stayed secret until the 1970s, so it had little influence at the time.</li>
  <li><strong>United States:</strong> <strong>ENIAC</strong> (completed in 1945, unveiled in 1946) was built to calculate artillery tables. It used about 18,000 vacuum tubes, weighed about 30 tons, and was thousands of times faster than a person with a desk calculator. But changing its program meant rewiring cables and setting switches, which could take days.</li>
</ul>
<p>The fix was the <strong>stored-program</strong> design: keep the program in memory alongside the data, so changing the program means loading new numbers instead of rewiring. John von Neumann described it in a 1945 report on a planned machine called EDVAC, building on ideas from ENIAC's designers J. Presper Eckert and John Mauchly. The <strong>Manchester Baby</strong> ran the first stored program on June 21, 1948, and Cambridge's <strong>EDSAC</strong> (1949) offered the first regular computing service. Almost every computer since has used this design.</p>
<p class="note"><strong>Why it matters:</strong> vacuum tubes made computers fast, and stored programs made them flexible. Tubes were also hot and power-hungry and burned out often, which set up the next era.</p>

<h3>4. Chips: shrinking the switch (1947 to the 1990s)</h3>
<p>A computer is built from switches, and the history of hardware is the history of shrinking them: gears, then relays, vacuum tubes, transistors. The <strong>transistor</strong>, invented at Bell Labs in December 1947 by John Bardeen, Walter Brattain and William Shockley, did a tube's job with no warm-up time, little power and a far longer life. In 1958–59 <strong>Jack Kilby</strong> at Texas Instruments and <strong>Robert Noyce</strong> at Fairchild Semiconductor independently created the <strong>integrated circuit</strong>: many transistors made together on one piece of semiconductor, instead of being wired together by hand.</p>
<p>In 1965 Gordon Moore predicted that the number of transistors on a chip would keep doubling at a steady pace. In 1975 he put the pace at about every two years, and "<strong>Moore's law</strong>" held for decades. The <strong>Intel 4004</strong> (1971), the first commercial microprocessor, had about 2,300 transistors. Today's chips have tens of billions, and the largest have more than a hundred billion.</p>
<p>Cheaper chips changed who used computers:</p>
<ul>
  <li><strong>1964:</strong> IBM's System/360 offered a family of compatible machines, so software could move from a small model to a big one.</li>
  <li><strong>1960s–70s:</strong> universities and companies shared large computers through time-sharing terminals. Unix (1969) came out of that world.</li>
  <li><strong>1968:</strong> Douglas Engelbart demonstrated the mouse, on-screen windows and hypertext links in a single famous presentation.</li>
  <li><strong>1975–1984:</strong> personal computers, from the Altair 8800 hobby kit (1975) to the Apple II (1977), the IBM PC (1981) and the Apple Macintosh (1984), which brought the graphical interface developed at Xerox PARC to a mass market.</li>
</ul>
<p class="note"><strong>Why it matters:</strong> each time switches got smaller and cheaper, computers moved closer to individual people: from a building, to a room, to a desk.</p>

<h3>5. Nets: connecting the machines (1969 to the 2010s)</h3>
<p>The U.S. Defense Department's research agency, ARPA, funded <strong>ARPANET</strong> so researchers could share scarce computers. Its first message, on October 29, 1969, went from UCLA to the Stanford Research Institute. The operator typed "LO", the start of "LOGIN", and then the system crashed. ARPANET broke data into small <em>packets</em> that could travel by different routes, so no single broken link stopped the network. In 1974 Vint Cerf and Bob Kahn published the design of <strong>TCP/IP</strong>, a common protocol that let separate networks join into one <strong>internet</strong>. ARPANET switched to it on January 1, 1983.</p>
<p>The internet carried email and files, but it was hard to use. In 1989 <strong>Tim Berners-Lee</strong> at CERN proposed the <strong>World Wide Web</strong>: pages written in HTML, identified by URLs and fetched with HTTP. The first website went online in 1991. In 1993 CERN made the web's software free for anyone to use, and the Mosaic browser put pictures inside pages. The web then spread at extraordinary speed.</p>
<p>Two more shifts completed the picture. Cloud computing, led by Amazon Web Services from 2006, let anyone rent servers by the hour. The iPhone (2007) and Android (2008) put a networked computer, with a camera and GPS, in most people's pockets.</p>
<p class="note"><strong>Why it matters:</strong> once computers were connected, information and the people who create it became the central resource, and privacy, security and misinformation became computing problems.</p>

<h3>6. Neural nets: machines that learn (1956 to today)</h3>
<p>In 1956 John McCarthy, Marvin Minsky, Claude Shannon and Nathaniel Rochester organized a summer workshop at Dartmouth College that named the field <strong>artificial intelligence</strong>. Early AI wrote intelligence down as explicit rules and logic. It had real successes, such as expert systems in the 1980s and IBM's Deep Blue defeating world chess champion Garry Kasparov in 1997, but hand-written rules broke on messy tasks like understanding speech or recognizing objects in photos. Twice, in the 1970s and again in the late 1980s, disappointment led to funding cuts known as "AI winters".</p>
<p>The alternative was to let systems <em>learn from examples</em>. Neural networks, loosely inspired by the brain, had existed since the 1950s, but they needed far more data and computing power than was available. By 2012 both had arrived: the internet supplied huge collections of examples, and graphics chips (GPUs) built for video games turned out to be very good at the arithmetic neural networks need. That year <strong>AlexNet</strong>, built by Alex Krizhevsky, Ilya Sutskever and Geoffrey Hinton, won the ImageNet image-recognition competition by a wide margin, and deep learning quickly took over the field.</p>
<p>In 2017 researchers at Google introduced the <strong>transformer</strong> in a paper titled "Attention Is All You Need". Transformers keep improving as they get more data and computing power, and they became the basis of <strong>large language models</strong>. When OpenAI released ChatGPT in November 2022, it reached an estimated 100 million users in about two months. Since then, AI systems have begun to act as agents that write code, use tools and carry out multi-step tasks.</p>
<p class="note"><strong>Why it matters:</strong> for most of history, people programmed computers by writing instructions. Machine learning adds a second way: show the computer examples and let it find the rules.</p>

<h3>Five ideas that carry through</h3>
<table>
  <thead><tr><th>Idea</th><th>Where it first appears</th><th>Where you see it today</th></tr></thead>
  <tbody>
    <tr><td>A machine can model something else</td><td>Antikythera mechanism</td><td>Simulations, weather forecasts, games</td></tr>
    <tr><td>Instructions are separate from the machine</td><td>Jacquard's loom, Babbage's engine</td><td>Software and apps</td></tr>
    <tr><td>One machine can run any program</td><td>Turing (1936), the Manchester Baby (1948)</td><td>Every laptop and phone</td></tr>
    <tr><td>Smaller switches make computers cheaper and more personal</td><td>Transistor (1947), Moore's law (1965)</td><td>Phones, sensors, data centers</td></tr>
    <tr><td>Connected machines that learn from data</td><td>ARPANET (1969), AlexNet (2012)</td><td>The web, the cloud, AI assistants</td></tr>
  </tbody>
</table>
<div class="callout"><strong>Pattern.</strong> Each era made computing cheaper and more personal, and each raised new social questions about work, privacy, power and safety. The rest of this course is about those questions.</div>
`,
      terms: [
        ["Stored-program computer", "A computer that keeps its instructions in the same memory as its data."],
        ["Universal Turing machine", "A theoretical machine that can simulate any other Turing machine, given its description."],
        ["Integrated circuit", "Many transistors and their connections made together on a single chip of semiconductor."],
        ["Moore's law", "The observation that transistor counts per chip doubled about every two years."],
        ["Packet switching", "Sending data in small, separately routed pieces, as ARPANET and the internet do."],
        ["Neural network", "A model built from layers of simple connected units whose weights are learned from examples."]
      ],
      quiz: [
        { q: "Whose 1843 notes included a method for a machine to compute Bernoulli numbers?", choices: ["Charles Babbage", "Ada Lovelace", "Grace Hopper", "Alan Turing"], answer: 1, why: "Lovelace's notes on the Analytical Engine are often called the first published computer program." },
        { q: "What did the transistor (1947) replace?", choices: ["Punched cards", "Vacuum tubes and relays", "Magnetic tape", "Keyboards"], answer: 1, why: "Transistors were smaller, cheaper, cooler and more reliable than vacuum tubes and relays." },
        { q: "Who created the World Wide Web?", choices: ["Vint Cerf", "Tim Berners-Lee", "Steve Jobs", "Bill Gates"], answer: 1, why: "Berners-Lee built the web at CERN. Cerf and Kahn designed TCP/IP, the internet underneath it." },
        { q: "Babbage's Analytical Engine had a \"mill\" and a \"store\". What do we call them today?", choices: ["Keyboard and screen", "Processor and memory", "Compiler and interpreter", "Network and server"], answer: 1, why: "The mill did the arithmetic (the processor) and the store held numbers (the memory)." },
        { q: "Why was the stored-program design such an improvement over ENIAC?", choices: ["It used less electricity", "Changing the program meant loading new numbers instead of rewiring", "It replaced vacuum tubes with transistors", "It connected computers into a network"], answer: 1, why: "ENIAC was reprogrammed with cables and switches, which could take days. A stored program is just data in memory." },
        { q: "Which two developments let deep learning take off around 2012?", choices: ["Punched cards and relays", "Large datasets and GPUs", "Expert systems and logic rules", "Time-sharing and Unix"], answer: 1, why: "The internet supplied huge datasets, and GPUs made training large neural networks fast enough." }
      ],
      practice: [
        {
          "q": "<p><strong>Discuss.</strong> The six-word hook is <em>Gears → Cards → Tubes → Chips → Nets → Neural nets</em>. Which transition changed ordinary people's lives the most, and why?</p>",
          "a": "<p>Picks one transition and argues for it with specifics, such as who could use computers before and after, what became possible, and what it cost. Strong answers compare it against at least one other transition rather than just praising one.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> Lovelace argued in 1843 that a computing machine could work with music and symbols, not just numbers. What made that idea so far ahead of its time, and what would she find most surprising about computers today?</p>",
          "a": "<p>Connects her idea to the lesson's second big idea, instructions separate from the machine, and to the stored-program design. Notes that her view anticipated general-purpose computing a century early.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> Colossus stayed secret until the 1970s and had little influence. What does that suggest about how history gets written, and whose contributions get remembered?</p>",
          "a": "<p>Recognizes that recognition depends on publicity, publication and secrecy as well as merit, and connects to the ENIAC programmers and the hidden-history lesson.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> Each era made computing cheaper and more personal. Is the AI era continuing that pattern, or reversing it by concentrating power in a few companies that can afford to train large models?</p>",
          "a": "<p>Takes a position and weighs evidence on both sides: cheap access to AI tools for individuals versus the cost of training frontier models and who controls it.</p>"
        },
        {
          "q": "<p><strong>Write (300–500 words).</strong> Choose one device or service you used today. Trace its history back through at least three of the six eras, explaining which earlier idea it depends on at each step.</p>",
          "a": "<p>Names specific ideas (for a phone: transistors and integrated circuits, stored programs, packet networks), explains the dependency rather than listing dates, and ends with a point about what the chain reveals.</p>"
        }
      ],
      sources: ["chm", "chmrev", "eniac"]
    },
    {
      id: "u2",
      title: "The map of computer science",
      minutes: 90,
      summary: "Theory, systems, AI, software, human-centered computing and more: what each area studies and how they connect.",
      notes: `
<p>Computer science studies what can be computed, how to compute it efficiently, and how to build computing systems that are reliable and useful to people. The ACM/IEEE/AAAI CS2023 curriculum guidelines organize the field into knowledge areas. Grouped broadly:</p>

<table>
  <thead><tr><th>Area</th><th>Central question</th><th>Where you'll study it</th></tr></thead>
  <tbody>
    <tr><td>Theory</td><td>What can be computed, and at what cost?</td><td>Discrete Math, Algorithms, Theory of Computation</td></tr>
    <tr><td>Systems</td><td>How do hardware and software work together at scale?</td><td>Computer Systems, Architecture, OS, Networks, Distributed Systems</td></tr>
    <tr><td>Programming languages</td><td>How should we express computation?</td><td>Programming I–II, Programming Languages, Compilers</td></tr>
    <tr><td>Software engineering</td><td>How do teams build software that works and keeps working?</td><td>Software Engineering, Capstone</td></tr>
    <tr><td>Data & databases</td><td>How do we store, query and learn from data?</td><td>Databases, Probability & Statistics</td></tr>
    <tr><td>AI & machine learning</td><td>How can machines learn and act intelligently?</td><td>Intro to AI & ML, AI track</td></tr>
    <tr><td>Security & privacy</td><td>How do we protect systems and people?</td><td>Security Fundamentals, Security track</td></tr>
    <tr><td>Human-computer interaction</td><td>How do people use technology, and how should it be designed?</td><td>HCI track</td></tr>
    <tr><td>Graphics, vision & robotics</td><td>How do computers perceive and act in the physical world?</td><td>Graphics/Vision/Robotics track</td></tr>
  </tbody>
</table>

<h3>Everything connects</h3>
<p>A chatbot uses all of them: theory (algorithms for attention), systems (thousands of GPUs), languages (Python and CUDA), software engineering (the service around the model), data (training corpora), security (preventing misuse), and HCI (the chat interface).</p>

<h3>Computer science is not only programming</h3>
<p>Programming is to computer science roughly what writing is to journalism: essential, but not the whole thing. As AI tools write more routine code, the lasting skills are precise thinking, problem decomposition, understanding systems, and judging whether a solution is correct and appropriate.</p>
`,
      terms: [
        ["Knowledge area", "A major subdivision of computer science in curriculum guidelines."],
        ["Systems", "The study of building computing infrastructure: hardware, OS, networks, distributed systems."]
      ],
      quiz: [
        { q: "\"Is there an efficient algorithm for this problem?\" belongs mainly to which area?", choices: ["HCI", "Theory", "Graphics", "Databases"], answer: 1, why: "Questions about the cost and limits of computation are theory." },
        { q: "Designing an interface that older adults can use easily is mainly:", choices: ["Human-computer interaction", "Compilers", "Distributed systems", "Cryptography"], answer: 0, why: "HCI studies how people interact with technology." }
      ],
      practice: [
        {
          "q": "<p><strong>Discuss.</strong> Before this lesson, what did you think computer science was? Which area on the map surprised you most?</p>",
          "a": "<p>Is honest about earlier assumptions (often \"it's programming\") and explains specifically what changed.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> Pick an everyday app and identify at least four areas of computer science it depends on.</p>",
          "a": "<p>Goes beyond the obvious. A maps app uses algorithms (shortest paths), systems (servers), data (traffic), HCI (the interface), security (location privacy) and AI (traffic prediction).</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> If AI tools write more and more routine code, which areas of computer science become more important, and which less?</p>",
          "a": "<p>Argues from the lesson's point that precise thinking and judging correctness last. Might say theory, systems, security and human-centered computing gain importance as code becomes cheaper to produce.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> Which area appeals to you most right now, and what question in it would you most like to be able to answer?</p>",
          "a": "<p>Names a concrete question rather than an area in general, and links it to courses on the four-year plan.</p>"
        },
        {
          "q": "<p><strong>Write (300–500 words).</strong> Find a news story from the past year about a computing development. Explain which areas of computer science it involves and what someone would need to study to work on it.</p>",
          "a": "<p>Uses a real, cited story, maps it accurately onto several areas, and identifies specific courses or skills rather than generic advice.</p>"
        }
      ],
      sources: ["chm"]
    },
    {
      id: "u3",
      title: "Ethical frameworks and the ACM Code",
      minutes: 90,
      summary: "Four questions for reasoning about right and wrong in technology, the profession's own code of conduct, and a method you can use on any case.",
      notes: `
<p>Ethics is not a list of rules to memorize. It is a set of tools for reasoning when good values pull in different directions. This lesson follows one made-up case from start to finish so you can watch the tools work.</p>
<div class="callout"><strong>The case (hypothetical).</strong> You are on a student team building a campus app. Your manager wants to add a feature that shares each student's live location with their friends, switched <em>on</em> by default because "more people will use it that way". Some students are excited. A friend who has dealt with a stalker is worried.</div>

<h3>Four questions, four frameworks</h3>
<p>Philosophers have developed several major ways of judging actions. Each one boils down to a question you can ask about any decision. Remember the four questions, and the framework names will follow:</p>
<div class="callout"><strong>What happens? What's owed? Who would I be? Who's left out?</strong></div>
<p><strong>What happens?</strong> This is <strong>consequentialism</strong>: the right choice is the one that produces the best outcomes for everyone affected. Applied to the case, you would weigh the convenience for many students who like the feature against the risk of serious harm to a few. Consequentialism keeps your attention on real effects. Its weakness is that it can justify hurting a small group if the total benefit is large, and outcomes are hard to predict.</p>
<p><strong>What's owed?</strong> This is <strong>deontology</strong>, the ethics of duty, associated with Immanuel Kant. Some things are owed to people regardless of the total benefit, such as honesty, consent and respect for their choices. Here the question is whether students actually agreed to broadcast where they are. A setting switched on by default, which most people never change, is not real consent. Deontology protects individuals. Its weakness is that duties can conflict, for example a duty to your employer against a duty to users.</p>
<p><strong>Who would I be?</strong> This is <strong>virtue ethics</strong>, which goes back to Aristotle. It asks what a person of good character, honest, careful and caring, would do in your position. Would a trustworthy engineer ship this default without raising concerns? Virtue ethics helps in situations no rule anticipated. Its weakness is that it gives less specific instructions.</p>
<p><strong>Who's left out?</strong> This is the <strong>justice</strong> perspective, influenced by John Rawls, who suggested judging rules as if you did not know which person you would be. Who carries the risk of this feature? Mainly people who already face harassment or abuse, who may not be the ones designing it. Justice brings in people the other frameworks can overlook. Its weakness is that people disagree about what is fair.</p>
<p>When the four questions agree, you can act with confidence. When they disagree, you have found the real ethical question. In this case all four point the same way: make the feature opt-in, so people choose to share their location.</p>

<h3>The ACM Code of Ethics</h3>
<p>The Association for Computing Machinery, the largest professional society in computing, publishes a code of ethics, last revised in 2018. Its seven general principles are easier to remember in three groups:</p>
<p><strong>Help, and don't harm.</strong> Principle 1.1 says to contribute to society and to human well-being, acknowledging that all people are stakeholders in computing. Principle 1.2 says to avoid harm. In the case, a stalker using the app is a harm that is easy to foresee.</p>
<p><strong>Be someone people can trust.</strong> Principle 1.3, be honest and trustworthy; 1.4, be fair and take action not to discriminate; and 1.5, respect the work required to produce new ideas, inventions and creative works, which includes crediting others and honoring licenses.</p>
<p><strong>Respect people's information.</strong> Principle 1.6, respect privacy, and 1.7, honor confidentiality. A live location is among the most sensitive data an app can collect.</p>
<p>The code also sets professional responsibilities. Two matter most for students: do high-quality work, and give honest and thorough evaluations of systems, including their risks. Raising a concern with your manager is not disloyalty. The code treats it as part of the job.</p>

<h3>A method for any case: the four W's</h3>
<p><strong>Who</strong> is affected? List every stakeholder, including people who never use your product, such as someone being tracked by an app user. <strong>What</strong> could we do? List options beyond the two on the table: opt-in sharing, sharing with a time limit, sharing with a visible reminder. <strong>Why</strong> would each option be right or wrong? Ask the four questions and check the relevant parts of the code. <strong>Which</strong> do we choose? Decide, and write down what evidence would change your mind.</p>
<p>The method doesn't hand you an answer. It makes sure you have looked at the problem from every side before you choose.</p>
`,
      terms: [
        ["Stakeholder", "Anyone affected by a system, whether or not they use it."],
        ["Consequentialism", "Judging actions by their outcomes. Question: what happens?"],
        ["Deontology", "Judging actions by duties and rights. Question: what's owed?"],
        ["Virtue ethics", "Judging actions by the character they express. Question: who would I be?"],
        ["Justice", "Judging how benefits and burdens are shared. Question: who's left out?"],
        ["Opt-in", "A setting that is off until the person chooses to turn it on."]
      ],
      quiz: [
        { q: "A team argues a data leak is acceptable because it affects \"only 1% of users\". Which framework does this argument resemble, and which challenges it?", choices: ["Virtue ethics; consequentialism", "Consequentialism; deontology", "Deontology; virtue ethics", "Justice; consequentialism"], answer: 1, why: "Weighing totals is consequentialist. Deontology objects that each user's privacy right is violated regardless of the percentage." },
        { q: "Which is a general principle in the ACM Code?", choices: ["Maximize shareholder value", "Respect privacy", "Always use open source", "Never use AI"], answer: 1, why: "Principle 1.6 is \"Respect privacy\"." },
        { q: "\"Who carries the risk of this feature, and were they part of the decision?\" Which framework's question is this?", choices: ["Consequentialism", "Deontology", "Virtue ethics", "Justice"], answer: 3, why: "Justice asks who's left out: how benefits and burdens are shared, especially for people with less power." },
        { q: "In the four W's method, why list options beyond the two on the table?", choices: ["To delay the decision", "Because a better option, like opt-in sharing, often resolves the conflict", "Because the code requires exactly four options", "To make the analysis longer"], answer: 1, why: "Many ethical dilemmas look like either/or choices until someone proposes a third design." }
      ],
      practice: [
        {
          "q": "<p><strong>Discuss.</strong> Apply the four questions (What happens? What's owed? Who would I be? Who's left out?) to a different feature: an app that shows students' class rankings to everyone by default.</p>",
          "a": "<p>Works through each question separately, names stakeholders such as struggling students, and proposes a better design rather than only a verdict.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> When do the frameworks disagree? Describe a technology decision where consequentialism and deontology point in different directions.</p>",
          "a": "<p>Gives a concrete case, such as scanning private messages to catch abuse, and explains clearly why each framework reaches its conclusion.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> The ACM Code says to raise concerns about risks. What makes that hard to do as an intern or a junior engineer, and what could organizations do to make it easier?</p>",
          "a": "<p>Recognizes real pressures (power, job security, uncertainty) and proposes concrete practices, such as anonymous reporting, design reviews with ethics questions, and protection for whistleblowers.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> Is it enough for an engineer to follow the law and the company's rules? Use one example where something legal was arguably wrong.</p>",
          "a": "<p>Distinguishes legal from ethical, uses a specific example, and acknowledges that ethics sometimes leads law, which later catches up.</p>"
        },
        {
          "q": "<p><strong>Write (300–500 words).</strong> Use the four W's to analyze a real ethical decision involving technology that you, a friend or a well-documented company faced. End with what you would do and what would change your mind.</p>",
          "a": "<p>Covers Who, What, Why and Which explicitly, considers at least three options, applies at least two frameworks, and states a decision with a genuine condition for changing it.</p>"
        }
      ],
      sources: ["acm", "sep"]
    },
    {
      id: "u4",
      title: "Privacy, data and surveillance",
      minutes: 90,
      summary: "Three common beliefs about privacy, the real cases that disproved them, and what the law and engineers do about it.",
      notes: `
<p>People often dismiss privacy with one of three beliefs: "I have nothing to hide", "the data is anonymous", and "users agreed to it". Each one has been tested by real events. This lesson takes them in turn.</p>

<h3>Belief 1: "I have nothing to hide"</h3>
<p>Privacy is not only about secrets. It protects the freedom to think, explore, associate with people and make mistakes without being watched and judged, and it limits the power that comes from knowing a lot about someone. A person searching for information about an illness, a sexual orientation or a new job has nothing to hide, yet would reasonably not want that history sent to an employer.</p>
<p>The philosopher Helen Nissenbaum gave a useful test called <strong>contextual integrity</strong>. Information always flows within a context that has its own norms. Your health details shared with your doctor follow the norms of medicine. The same details sold to an advertiser or an insurer break them. The question is not "is this information private?" but "is this flow appropriate for where the information came from?"</p>

<h3>Belief 2: "The data is anonymous"</h3>
<p>In the 1990s, a Massachusetts state agency released hospital records of state employees with names removed, for research. Graduate student <strong>Latanya Sweeney</strong> bought the voter list for the city of Cambridge for about $20. By matching ZIP code, sex and date of birth across the two datasets, she found the medical records of the governor, William Weld, and mailed them to his office. In a 2000 study she estimated that about <strong>87% of Americans</strong> can be uniquely identified by those three facts alone.</p>
<p>In 2006 Netflix released movie ratings from about half a million customers, with names replaced by numbers, for a public contest to improve its recommendations. In 2008 researchers <strong>Arvind Narayanan and Vitaly Shmatikov</strong> showed that knowing just a few of someone's ratings and the approximate dates was usually enough to find them in the data, and matched some records to public reviews on IMDb. A lawsuit followed, and Netflix canceled a planned second contest.</p>
<p>Even data with no individual records can reveal too much. In 2017 the fitness app Strava published a global "heatmap" of where its users ran and cycled. In early 2018 an analyst noticed that it showed the outlines and patrol routes of military bases in conflict zones, traced by soldiers wearing fitness trackers.</p>
<p>The lesson: removing names is not anonymization. Combinations of ordinary details work like a fingerprint. A stronger approach is <strong>differential privacy</strong>, which adds carefully calibrated random noise to published statistics so that the results barely change whether or not any one person is included. The U.S. Census Bureau used it for the 2020 census.</p>

<h3>Belief 3: "Users agreed to it"</h3>
<p>Most people click "Agree" without reading privacy policies, which are long and written by lawyers. Consent that nobody reads, or that is the only way to use a service, is weak protection. That is why privacy law does not rely on consent alone.</p>
<p>Modern privacy law grew from the <strong>Fair Information Practice Principles</strong> in a 1973 U.S. government report: people should know what is collected, be able to see and correct it, and data should be kept secure and used only for the purpose it was collected for. The European Union's <strong>General Data Protection Regulation (GDPR)</strong>, in force since 2018, turned these ideas into binding law. Organizations need a lawful reason to process personal data. People have rights to see, correct and delete their data. Data must be minimized to what a purpose needs, and serious violations can be fined up to 4% of a company's worldwide annual revenue. Many other countries and U.S. states have since passed similar laws.</p>

<h3>What engineers can do: less, locked, limited, gone</h3>
<p>Privacy decisions are mostly made in code, long before a lawyer sees them. Four words cover the basics. <strong>Less:</strong> collect only what the feature needs; a weather app may need your city, not your exact location. <strong>Locked:</strong> encrypt data while it travels and while it is stored. <strong>Limited:</strong> restrict which employees and services can read personal data, and log every access. <strong>Gone:</strong> delete data when its purpose is over, because data that no longer exists cannot leak.</p>
<p>Above all, treat "can we collect this?" and "should we?" as separate questions. The first is about engineering. The second is about the people in the data.</p>
`,
      terms: [
        ["Contextual integrity", "Privacy as information flowing in ways that fit the norms of the context it came from."],
        ["Re-identification", "Linking supposedly anonymous data back to individuals."],
        ["Quasi-identifier", "An ordinary detail, like ZIP code or birth date, that identifies people when combined with others."],
        ["Data minimization", "Collecting only the personal data a purpose requires."],
        ["Differential privacy", "A mathematical guarantee that published results barely change whether any one person's data is included."]
      ],
      quiz: [
        { q: "Why did removing names fail to anonymize the Netflix Prize data?", choices: ["Names were still in the file", "Rating patterns matched public reviews and identified people", "The data was hacked", "Netflix published the key"], answer: 1, why: "Combinations of a few ratings and dates were unique and matched public IMDb profiles." },
        { q: "Under data minimization, a weather app should:", choices: ["Collect contacts in case they are useful later", "Collect only the location precision it needs", "Collect everything and anonymize it", "Never collect location"], answer: 1, why: "Collect only what the purpose requires. City-level location may be enough." },
        { q: "Which three facts did Sweeney show identify most Americans?", choices: ["Name, email and phone", "ZIP code, sex and date of birth", "Height, weight and eye color", "Car, employer and school"], answer: 1, why: "Her 2000 study estimated about 87% of the U.S. population is unique on those three facts." },
        { q: "The Strava heatmap revealed military bases even though it contained no names. What does this show?", choices: ["Fitness apps should be banned", "Aggregated data can still expose sensitive information", "GPS is inaccurate", "Soldiers broke the law"], answer: 1, why: "Patterns in combined data can reveal places and routes that no single record shows." }
      ],
      practice: [
        {
          "q": "<p><strong>Discuss.</strong> Which of the three beliefs (nothing to hide, it's anonymous, users agreed) did you hold before this lesson? Which case changed your mind most?</p>",
          "a": "<p>Engages honestly with the belief and explains the mechanism of the case, such as how combinations of ordinary details identify people.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> Apply contextual integrity to a fitness app sharing your running routes with your friends, then with your employer, then with an insurance company.</p>",
          "a": "<p>Identifies the norms of each context and explains which flows violate them and why, not just which feel uncomfortable.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> Should a university use students' campus card swipes and Wi-Fi logins to identify students who might be struggling and offer them help?</p>",
          "a": "<p>Weighs the real benefit against consent, data minimization, how long data is kept, who can see it, and the risk of the data being used for something else.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> GDPR gives people the right to have their data deleted. What makes that hard to implement technically?</p>",
          "a": "<p>Thinks like an engineer: backups, copies in logs and analytics, data shared with partners, and data already used to train models.</p>"
        },
        {
          "q": "<p><strong>Write (300–500 words).</strong> Download or request the data a service you use holds about you (most large services offer this). Describe what you found, what surprised you, and which of the four words (less, locked, limited, gone) the service seems to follow or not.</p>",
          "a": "<p>Reports specifics from the real export, connects them to the lesson's principles, and makes a reasoned judgment. (Remove anything you don't want to share before discussing it in class.)</p>"
        }
      ],
      sources: ["gdpr", "sep"]
    },
    {
      id: "u5",
      title: "AI in society",
      minutes: 90,
      summary: "Four questions to ask about any AI system, the real cases behind them, and how to use AI tools well as a student.",
      notes: `
<p>AI systems now help decide who gets a loan, which job applicants get an interview, what news people see and how students study. You don't need to be an AI researcher to judge them. Four questions go a long way, and each one has a real story behind it:</p>
<div class="callout"><strong>Accurate for whom? How does it fail? Who answers for it? At what cost?</strong></div>

<h3>Accurate for whom?</h3>
<p>An AI system learns patterns from data, including patterns of who was left out of the data. In 2018 <strong>Joy Buolamwini</strong>, then a graduate student at the MIT Media Lab, and <strong>Timnit Gebru</strong> tested commercial facial-analysis systems from major tech companies on a balanced set of faces. For lighter-skinned men the error rate in classifying gender was under 1%. For darker-skinned women it reached about 35%. Buolamwini had started the work after a face-tracking system failed to detect her face until she put on a white mask. The study, called <em>Gender Shades</em>, showed that a single overall accuracy number can hide large gaps between groups. Several companies improved their systems after it was published.</p>
<p>The habit to build: whenever someone reports how accurate a system is, ask how accurate it is for each group of people it will affect.</p>

<h3>How does it fail?</h3>
<p>Large language models generate fluent text by predicting likely continuations. That makes them good at sounding right, which is not the same as being right. They can state false facts, invent quotations and cite sources that do not exist, a failure often called <strong>hallucination</strong>. In 2023 a federal judge in New York fined two lawyers who had filed a brief citing court cases that ChatGPT had made up. The lawyers had asked the tool whether the cases were real, and it had said yes.</p>
<p>Every technology fails. What matters is whether the failures are visible, how harmful they are, and whether someone checks. Fluent, confident output makes AI mistakes easy to miss.</p>

<h3>Who answers for it?</h3>
<p>When an automated system wrongly denies someone a loan or flags them as a fraud risk, responsibility can seem to vanish: the developer blames the data, the company blames the vendor, and the employee says "the computer decided". Good practice keeps a person accountable. That means documenting what a model is for and where it fails, testing it on the people it will affect, keeping a human who can review and overturn decisions, and giving affected people a way to appeal.</p>
<p>Governments have started to require some of this. The <strong>EU AI Act</strong>, which entered into force in 2024 and applies in stages, sorts AI uses by risk. A few uses, such as social scoring by governments, are banned. High-risk uses, including hiring, credit and education, must meet requirements for data quality, documentation, human oversight and accuracy. Makers of general-purpose models have transparency duties. In the United States, the <strong>NIST AI Risk Management Framework</strong> (2023) is a voluntary guide built around four activities: govern, map, measure and manage.</p>

<h3>At what cost?</h3>
<p>AI changes which tasks people do at work, including programming, and its benefits and job losses are not shared evenly. Training and running large models also uses a lot of electricity and water for cooling. The International Energy Agency estimated that data centers used about 1.5% of the world's electricity in 2024, a share expected to grow quickly as AI use grows. As AI systems become more capable and act more independently, there are also open questions about keeping them safe and under meaningful human control. These are live debates, and you will help settle them.</p>

<h3>Using AI tools as a student</h3>
<p>The same four questions apply to your own use. Is the tool accurate for <em>your</em> problem? Check its facts and run its code. How does it fail? It can sound sure and be wrong, so ask for sources and read them yourself. Who answers for your work? You do, which is why you should never submit work you cannot explain, and why you should disclose AI use as your course requires. At what cost? If the tool does the practice for you, you lose the skill the practice was meant to build. Use AI to explain, to quiz you and to give feedback, and keep the thinking for yourself. And don't paste private or confidential information into a tool that may store it.</p>
`,
      terms: [
        ["Algorithmic bias", "Systematic errors that disadvantage particular groups of people."],
        ["Disaggregated evaluation", "Measuring a system's accuracy separately for each group it affects."],
        ["Hallucination", "A model producing confident but false output."],
        ["Human in the loop", "A person who can review and override automated decisions."],
        ["Risk-based regulation", "Rules that scale with how much harm a use of AI could cause."]
      ],
      quiz: [
        { q: "What was a main cause of the accuracy gaps found in Gender Shades?", choices: ["Faulty cameras", "Unrepresentative training and benchmark data", "Deliberate sabotage", "Slow computers"], answer: 1, why: "The datasets underrepresented darker-skinned faces, especially women." },
        { q: "Under the EU AI Act, an AI system used to screen job applicants is:", choices: ["Unregulated", "Banned", "High-risk with strict requirements", "Only subject to labeling"], answer: 2, why: "Employment decisions are listed as a high-risk use." },
        { q: "An AI tool gives you a citation for your essay. What should you do?", choices: ["Use it", "Find and read the source yourself before citing it", "Cite the AI instead", "Delete the essay"], answer: 1, why: "Models can invent sources. Only cite what you have checked." },
        { q: "A company reports its system is 95% accurate overall. Which follow-up question matters most?", choices: ["How fast is it?", "How accurate is it for each group it affects?", "What programming language is it in?", "How many engineers built it?"], answer: 1, why: "An overall number can hide large gaps, as Gender Shades showed." },
        { q: "Why did the lawyers in the 2023 New York case get fined?", choices: ["They used a computer in court", "They filed a brief citing cases an AI tool had invented", "They refused to use AI", "They leaked client data"], answer: 1, why: "They relied on the tool without checking, and even asked the tool itself to confirm the fake cases." }
      ],
      practice: [
        {
          "q": "<p><strong>Discuss.</strong> Pick an AI system you've used. Ask the four questions about it: accurate for whom, how does it fail, who answers for it, at what cost?</p>",
          "a": "<p>Answers each question with specifics about that system, admits where the answer is unknown, and says how one could find out.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> In Gender Shades, an overall accuracy number hid large gaps between groups. What other kinds of systems could have the same problem?</p>",
          "a": "<p>Generalizes the lesson, for example to speech recognition and accents, medical algorithms and skin tones, or hiring tools and résumé styles, and suggests testing results separately for each group.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> Who should be responsible when an AI tool gives harmful advice: the company that trained the model, the company that built the app on it, or the user?</p>",
          "a": "<p>Recognizes that responsibility can be shared, distinguishes foreseeable from unforeseeable misuse, and connects to the EU AI Act's approach of scaling duties with risk.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> Where is the line between using AI to learn and using it to avoid learning? Describe a use that is clearly fine, one that clearly isn't, and one you're unsure about.</p>",
          "a": "<p>Gives concrete examples and a principle for telling them apart, such as whether you could now do the task yourself.</p>"
        },
        {
          "q": "<p><strong>Write (300–500 words).</strong> Find a real case where an AI system's mistake affected people. Analyze it with the four questions and propose one technical and one policy change that would have helped.</p>",
          "a": "<p>Uses a documented case with sources, applies all four questions, and makes proposals specific enough to implement.</p>"
        }
      ],
      sources: ["gendershades", "euaiact", "nistrmf", "acm"]
    },
    {
      id: "u6",
      title: "Accessibility and inclusive design",
      minutes: 90,
      summary: "How four different people use the same web page, the standard that describes what they need, and the small coding habits that make the difference.",
      notes: `
<p>About 1.3 billion people, roughly one in six worldwide, live with a significant disability, according to the World Health Organization. Many more have a temporary or situational limitation: a broken wrist, a phone in bright sunlight, a video in a quiet library. Accessible design is about all of them.</p>
<p>To see what that means in practice, imagine four students opening the same course page.</p>

<h3>Four students, one page</h3>
<p><strong>Maya is blind</strong> and uses a <strong>screen reader</strong>, software that reads the page aloud and lets her jump between headings, links and buttons with the keyboard. It only works if the page is built from meaningful parts. If headings are just big bold text, she can't jump to them. If an image has no text description (its <em>alt text</em>), the screen reader says "image" and nothing else. Every major operating system includes a screen reader: VoiceOver on Apple devices, Narrator on Windows, TalkBack on Android, and the free NVDA for Windows.</p>
<p><strong>Daniel has limited use of his hands</strong> and navigates with the keyboard and voice commands instead of a mouse. He presses Tab to move from control to control. If a button was built from a plain <code>div</code> with a click handler, Tab skips right over it, and if the page hides the focus outline for looks, he can't tell where he is.</p>
<p><strong>Aisha is deaf.</strong> A lecture video without captions tells her nothing. Captions and transcripts give her the same lesson everyone else gets. They also help students watching in a noisy cafe, and students who aren't native English speakers.</p>
<p><strong>Leo has a reading disability and is colorblind.</strong> Long, dense paragraphs and unpredictable layouts slow him down. A form that marks errors only by turning a field red gives him no signal at all.</p>

<h3>The standard: POUR</h3>
<p>The World Wide Web Consortium's <strong>Web Content Accessibility Guidelines (WCAG)</strong>, first published in 1999 and now at version 2.2 (2023), describe what pages need. Its requirements fall under four principles, remembered as <strong>POUR</strong>, and each one matches one of our students:</p>
<p><strong>Perceivable:</strong> everyone can sense the content, so images have alt text and videos have captions (Maya, Aisha). <strong>Operable:</strong> everyone can use the controls, including by keyboard alone (Daniel). <strong>Understandable:</strong> content and behavior are clear and predictable, with plain language and clear error messages (Leo). <strong>Robust:</strong> the page uses standard code that assistive technologies can interpret, now and in the future (all four).</p>
<p>WCAG is also written into law. In the U.S., the Justice Department's 2024 rule requires state and local government websites to meet WCAG 2.1 at level AA, and the European Accessibility Act has applied to many products and services since June 2025.</p>

<h3>The curb-cut effect</h3>
<p>In the 1970s, disability-rights activists in Berkeley, California pushed the city to cut ramps into sidewalk curbs so wheelchair users could cross streets. The ramps turned out to help nearly everyone: people with strollers, suitcases, delivery carts and bicycles. This is the <strong>curb-cut effect</strong>, and it is common in computing too. Captions, voice control, text-to-speech, keyboard shortcuts and dark mode all began as or were driven by accessibility work, and are now used by millions of people who don't consider themselves disabled.</p>

<h3>What you can do in your own code</h3>
<p>Most accessibility comes from small habits, and the most important one is to use the HTML element that means what you want. Compare these two buttons:</p>
<pre data-label="HTML"><code>&lt;!-- Looks like a button, but Tab skips it and screen readers don't announce it --&gt;
&lt;div class="btn" onclick="save()"&gt;Save&lt;/div&gt;

&lt;!-- A real button: focusable, works with Enter and Space, announced as "Save, button" --&gt;
&lt;button type="button" onclick="save()"&gt;Save&lt;/button&gt;</code></pre>
<p>The same idea applies elsewhere. Give every image meaningful alt text, or empty alt text if it is only decoration. Give every form field a visible label. Never use color as the only signal: add text or an icon. Try your page with only the keyboard, and then with your computer's screen reader. Ten minutes of testing will show you most of the problems Maya and Daniel would hit.</p>
`,
      terms: [
        ["Screen reader", "Software that converts on-screen content to speech or braille."],
        ["Alt text", "A text description of an image, read aloud by screen readers."],
        ["WCAG", "Web Content Accessibility Guidelines, the main web accessibility standard."],
        ["POUR", "Perceivable, Operable, Understandable, Robust."],
        ["Semantic HTML", "Using elements for what they mean, such as button, heading and label, so tools can interpret them."],
        ["Curb-cut effect", "Accessibility features benefiting far more people than they were designed for."]
      ],
      quiz: [
        { q: "Which is an accessibility problem?", choices: ["Using &lt;button&gt; for buttons", "Marking required fields only by turning them red", "Adding alt text", "Supporting keyboard navigation"], answer: 1, why: "Color alone is invisible to some colorblind and screen reader users. Add text or an icon too." },
        { q: "What does the O in POUR stand for?", choices: ["Open", "Operable", "Optimized", "Ordered"], answer: 1, why: "Interfaces must be operable by everyone, for example by keyboard." },
        { q: "Why does a clickable <code>div</code> fail keyboard users?", choices: ["It is too small", "It isn't focusable, so Tab skips it and Enter does nothing", "It loads slowly", "It can't be styled"], answer: 1, why: "A real <code>&lt;button&gt;</code> is focusable and responds to Enter and Space automatically." },
        { q: "Captions were made for deaf viewers but are now used by people in noisy places and language learners. What is this called?", choices: ["The curb-cut effect", "Moore's law", "Data minimization", "Graceful degradation"], answer: 0, why: "Like sidewalk ramps, accessibility features often help far more people than intended." }
      ],
      practice: [
        {
          "q": "<p><strong>Discuss.</strong> Try using a website you know well with only the keyboard for five minutes. What worked and what didn't?</p>",
          "a": "<p>Reports specific problems (focus disappearing, controls that can't be reached, focus trapped in a menu) and links each one to a POUR principle.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> Turn on your phone's screen reader (VoiceOver or TalkBack) and try to send a message. How did it feel, and what would you change about an app you use?</p>",
          "a": "<p>Describes the experience honestly and connects problems to missing labels, unclear headings or unlabeled buttons, the same issues as in the lesson's code example.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> Give an example of the curb-cut effect in technology that the lesson didn't mention.</p>",
          "a": "<p>Examples include text-to-speech for audiobooks, autocomplete, voice assistants, high-contrast modes in sunlight, or captions in social media videos, each with a clear account of who it was first designed for.</p>"
        },
        {
          "q": "<p><strong>Discuss.</strong> Accessibility work is often left until the end of a project and then cut for time. Why does that happen, and how could a team prevent it?</p>",
          "a": "<p>Identifies causes (no one owns it, it isn't tested, it's seen as optional) and proposes concrete practices: requirements from the start, automated checks, testing with disabled users, including it in the definition of done.</p>"
        },
        {
          "q": "<p><strong>Write (300–500 words).</strong> Audit one page of a website you use, such as your university's course registration page, against the four POUR principles. Report at least three specific problems and how to fix each.</p>",
          "a": "<p>Finds real, specific issues (missing alt text, unlabeled form fields, color-only error messages, poor keyboard support) and gives concrete fixes, ideally with the HTML change needed.</p>"
        }
      ],
      sources: ["wcag"]
    }
  ]
});

CSA.addAsides("cs100", {
  u1: [
    { kind: "lang", title: "The first high-level language", html: `<p>Konrad Zuse designed Plankalkül ("plan calculus") between 1942 and 1945, while building his Z-series computers. It had variables, conditionals and data structures, but it was not implemented until decades later and was published only in 1972. The first high-level languages actually used were the autocodes of the early 1950s and then FORTRAN in 1957. The optional lesson in CS 101 continues the story.</p>`, sources: ["hopl"] },
    { kind: "history", title: "Women were the first programmers", html: `<p>When ENIAC was unveiled in 1946, the six women who programmed it were not introduced, and some photographs of them were captioned as models. Their role was recovered decades later. See the optional lesson on the hidden history of computing.</p>`, sources: ["eniac"] }
  ],
  u4: [
    { kind: "practice", title: "Privacy by design", html: `<p>Ann Cavoukian, then Information and Privacy Commissioner of Ontario, set out "Privacy by Design" in the 1990s: build privacy into systems from the start and make it the default. GDPR Article 25 now requires "data protection by design and by default".</p>`, sources: ["gdpr"] }
  ],
  u5: [
    { kind: "history", title: "ELIZA and the first chatbot effect", html: `<p>In 1966 Joseph Weizenbaum at MIT wrote ELIZA, a simple program that imitated a therapist by rephrasing the user's statements as questions. Weizenbaum was disturbed to find that people, including his own secretary, confided in it as if it understood them. His 1976 book <em>Computer Power and Human Reason</em> warned against handing human judgment to machines. The same tendency to attribute understanding to fluent text applies to today's models.</p>` }
  ],
  u6: [
    { kind: "history", title: "Accessibility drove invention", html: `<p>Several technologies began as accessibility work. Ray Kurzweil's 1976 Kurzweil Reading Machine combined text scanning, character recognition and speech synthesis for blind readers. Vinton Cerf, co-designer of TCP/IP and hard of hearing, has said text messaging and email were especially valuable to him and to deaf users.</p>` }
  ]
});

CSA.addOptional("cs100", [
  {
    id: "history",
    kind: "history",
    title: "The hidden history of computing",
    minutes: 45,
    summary: "The ENIAC programmers, Bletchley Park, NASA's human computers and Apollo's software, and why the field's makeup changed.",
    notes: `
<h3>"Computer" was a job title</h3>
<p>Before machines, a computer was a person who computed, often a woman, paid less than male engineers. Teams of human computers calculated star positions at the Harvard Observatory in the 1880s, artillery tables during both world wars, and trajectories at NACA and later NASA.</p>

<h3>The ENIAC six</h3>
<p>Kathleen McNulty, Jean Jennings, Betty Snyder, Marlyn Wescoff, Frances Bilas and Ruth Lichterman programmed ENIAC with no manuals and no programming languages, working from the machine's wiring diagrams. They developed techniques such as breakpoints for debugging. Betty Snyder Holberton later helped design COBOL and early sorting software. Their story was largely forgotten until Kathy Kleiman's research beginning in the 1980s.</p>

<h3>Bletchley Park</h3>
<p>About three-quarters of the roughly ten thousand people working at Britain's codebreaking center during World War II were women. They operated the Bombe machines and Colossus, and many were bound by secrecy for decades.</p>

<h3>NASA and Apollo</h3>
<p>Katherine Johnson, Dorothy Vaughan and Mary Jackson worked at NACA/NASA's Langley center, where Black women computers worked in a segregated unit. Johnson checked the orbital calculations for John Glenn's 1962 flight at his request. Vaughan taught herself and her team FORTRAN as electronic computers arrived. At MIT, Margaret Hamilton led the team that wrote the Apollo guidance software. Its priority scheduling let the Apollo 11 computer shed low-priority work during the landing when it became overloaded.</p>

<h3>What changed</h3>
<p>In the United States, the share of computer science bachelor's degrees awarded to women peaked at about 37% in the mid-1980s and then fell to under 20%. Researchers point to several causes, including early home computers being marketed to boys and a culture that came to see programming as a male hobby. The history matters because it shows the field's makeup is the result of choices, and can change.</p>

<h3>Discussion questions</h3>
<ol>
  <li>Why were the ENIAC programmers left out of the 1946 publicity?</li>
  <li>Whose work is invisible in the technology you use today? (Think about data labelers and content moderators.)</li>
  <li>What could a CS department do to make the field more welcoming?</li>
</ol>
`,
    terms: [
      ["Human computer", "A person employed to perform calculations, before electronic computers."]
    ],
    quiz: [
      { q: "How did the ENIAC programmers learn to program the machine?", choices: ["From a FORTRAN manual", "From wiring diagrams and block diagrams", "In university courses", "From IBM training"], answer: 1, why: "No programming languages or manuals existed. They studied the machine's diagrams directly." },
      { q: "Who led the team that wrote the Apollo guidance software at MIT?", choices: ["Katherine Johnson", "Grace Hopper", "Margaret Hamilton", "Betty Holberton"], answer: 2, why: "Hamilton led the software engineering division at the MIT Instrumentation Laboratory." }
    ],
    sources: ["eniac", "chmrev", "chm"]
  },
  {
    id: "ethics",
    kind: "ethics",
    title: "Case study: risk scores and the math of fairness",
    minutes: 45,
    summary: "The COMPAS debate, and a mathematical result showing that common definitions of fairness cannot all hold at once.",
    notes: `
<h3>The case</h3>
<p>COMPAS is a commercial tool that predicts whether a criminal defendant will reoffend. Some U.S. courts use its scores in bail and sentencing decisions. In 2016 ProPublica analyzed scores for about 7,000 people in Broward County, Florida. Among people who did <em>not</em> reoffend within two years, Black defendants were nearly twice as likely as white defendants to have been labeled higher risk (about 45% versus 23%).</p>

<h3>The response</h3>
<p>The company that made COMPAS replied that its scores were <em>calibrated</em>: among people given the same score, Black and white defendants reoffended at about the same rate. Both claims were supported by the data.</p>

<h3>The impossibility result</h3>
<p>In 2016 and 2017, researchers including Jon Kleinberg, Sendhil Mullainathan and Manish Raghavan, and separately Alexandra Chouldechova, proved that when two groups have different underlying rates of the predicted outcome, a score cannot be calibrated <em>and</em> have equal false-positive and false-negative rates across groups, except in trivial cases. You must choose which kind of fairness matters most.</p>
<table>
  <thead><tr><th>Definition</th><th>Requires</th><th>Who it protects</th></tr></thead>
  <tbody>
    <tr><td>Calibration</td><td>A given score means the same risk in every group</td><td>Decision makers relying on the score</td></tr>
    <tr><td>Equal false-positive rates</td><td>Innocent people in every group are equally likely to be flagged</td><td>People wrongly labeled high-risk</td></tr>
    <tr><td>Equal false-negative rates</td><td>Every group's high-risk people are equally likely to be caught</td><td>Public safety, equally across groups</td></tr>
  </tbody>
</table>

<h3>Beyond the math</h3>
<p>The math cannot tell you which definition to choose; that is a values question. Other questions remain: is past arrest data a fair measure of crime when policing differs by neighborhood? Should a defendant be able to see and challenge how their score was computed? Should a tool like this be used in sentencing at all?</p>

<h3>Discussion questions</h3>
<ol>
  <li>Which fairness definition would you choose for bail decisions, and why?</li>
  <li>Does a human judge without a score do better or worse? How would you find out?</li>
  <li>Apply two frameworks from Unit 3 to this case.</li>
</ol>
`,
    terms: [
      ["Calibration", "Among people given the same score, outcomes occur at the same rate in every group."],
      ["False positive", "Predicting the outcome for someone who does not have it."],
      ["Base rate", "How often the outcome occurs in a group overall."]
    ],
    quiz: [
      { q: "ProPublica and the COMPAS maker each made claims about the data. Which is true?", choices: ["Only ProPublica was right", "Only the company was right", "Both were right, using different fairness definitions", "Neither was right"], answer: 2, why: "The scores were calibrated and also had unequal false-positive rates. Both can be true when base rates differ." },
      { q: "When base rates differ between groups, the impossibility result says:", choices: ["Fairness is impossible to define", "Calibration and equal error rates cannot all hold", "Algorithms are always biased", "Humans are always fairer"], answer: 1, why: "A non-trivial score cannot satisfy calibration and equal false-positive and false-negative rates at once." }
    ],
    sources: ["propublica", "acm"]
  }
]);
