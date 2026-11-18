CSA.addCourse({
  id: "writ100",
  code: "WRIT 100",
  title: "Writing for Technical Audiences",
  credits: 3,
  kind: "optional",
  term: "y1f",
  summary: "Fulfills the first-year writing requirement with a technical focus: writing for a reader, clear sentences, explanations, documentation, the everyday writing of a software team, design proposals, and arguments supported by evidence. Every lesson ends with exercises that you draft first and then compare with a model answer.",
  prereqs: [],
  practiceLabels: { title: "Exercises", intro: "Draft your own answer before you open the model. Writing rarely has one right answer, so compare what the model does with what you did, and decide which choices you would keep.", answer: "A model answer" },
  rubric: {
    criteriaFor: "the documentation project, the design document and the research explainer",
    assessments: [
      { name: "Weekly exercises", weight: 20, desc: "The exercises at the end of each lesson. Submit your drafts; they are graded for honest effort and for using the lesson's techniques, not for polish." },
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts." },
      { name: "Documentation project", weight: 15, desc: "A README and docstrings for a program you wrote in CS 101 or another course, written for a classmate who has never seen it. Due after Lesson 6." },
      { name: "Design document", weight: 20, desc: "A design document of 1,000–1,500 words for a small program or feature, with goals, non-goals, a proposed design, two alternatives and their trade-offs. Due after Lesson 7." },
      { name: "Research explainer", weight: 25, desc: "An explanation of 1,200–1,800 words of a technical question for a general reader (for example, \"Why is it hard to delete data from a trained AI model?\"), using at least four credible, correctly cited sources. A draft gets peer feedback before the final version." },
      { name: "Revision portfolio", weight: 10, desc: "Your first draft and final version of the research explainer, the peer feedback you received and gave, and a 300-word note on what you changed and why." }
    ],
    criteria: [
      { name: "Audience and purpose", desc: "Does it serve its reader?", levels: [
        "Clearly written for a named reader; gives them what they need to understand or act, and nothing they don't.",
        "Mostly suits the reader, with some unexplained terms or unneeded detail.",
        "Unclear who it is for; the reader must work to find what matters.",
        "Ignores the reader's needs." ] },
      { name: "Organization", desc: "Can the reader find their way?", levels: [
        "The main point comes first; headings, paragraphs and lists match the content's structure.",
        "Logical overall, with a buried point or a weak transition.",
        "Ideas appear out of order; the reader must reconstruct the structure.",
        "No discernible structure." ] },
      { name: "Clarity and style", desc: "Is each sentence easy to read?", levels: [
        "Concise, precise sentences with clear actors and actions; terms defined once and used consistently.",
        "Generally clear, with some wordiness, vague words or long sentences.",
        "Often wordy, vague or ambiguous; errors distract the reader.",
        "Hard to read throughout." ] },
      { name: "Accuracy and evidence", desc: "Can the reader trust it?", levels: [
        "Every claim is accurate and supported; sources are credible and cited correctly.",
        "Mostly accurate; a claim lacks support or a citation is incomplete.",
        "Some claims are wrong or unsupported; sources are weak.",
        "Inaccurate, or no support for its claims." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Drafts and revision:</b> major assignments are written in drafts. Revision is part of the grade, so keep your drafts.",
      "<b>Sources:</b> cite everything you use, including code, images and AI tools. Check every fact an AI tool gives you against a source you can cite.",
      "<b>AI assistants:</b> you may use them to brainstorm, to get feedback on a draft or to check grammar, and must say how you used them. The ideas, structure and sentences must be your own.",
      "<b>Peer feedback:</b> feedback is about the writing, not the writer. Be specific and kind, and say what works as well as what doesn't.",
      "<b>Late work:</b> weekly exercises are accepted up to three days late for half credit. Major assignments lose 5% a day, up to five days."
    ]
  },
  outcomes: [
    "Identify a document's reader and purpose, and plan it around what the reader needs",
    "Write clear, concise sentences and well-organized paragraphs and documents",
    "Explain a technical idea to a non-expert using examples, definitions and diagrams",
    "Write a README, docstrings, commit messages, bug reports and code review comments",
    "Structure a design document that compares alternatives and their trade-offs",
    "Find, evaluate and cite sources, and build an argument on evidence",
    "Revise in stages, and give and use peer feedback"
  ],
  units: [
    {
      id: "w1",
      title: "Writing for a reader",
      minutes: 90,
      summary: "Why technical writing exists, who your reader is, what they need from you, and how to plan a document before you write it.",
      notes: `
<p>Programmers write all day. Some of it is code. The rest is READMEs, comments, commit messages, bug reports, messages to teammates, design proposals, and answers to questions. Studies of developers' time differ in their numbers, but they agree that reading and writing words, not typing code, takes a large share of the job. This course is about that other writing: <strong>technical writing</strong>, writing whose job is to help a specific reader understand something or do something.</p>
<p>That definition already contains the course's main idea. Technical writing is judged by what happens in the reader's head, not by how it sounds. A clear, plain explanation that the reader follows on first reading is better than an impressive one they have to read three times.</p>

<h3>The reader is not you</h3>
<p>In 1990 a Stanford graduate student, Elizabeth Newton, ran a simple experiment. One person, the "tapper", tapped out the rhythm of a well-known song such as "Happy Birthday" on a table. A second person, the "listener", tried to name the song. Before each round, tappers predicted that listeners would guess correctly about half the time. In fact listeners named 3 songs out of 120, 2.5%.</p>
<p>The tappers weren't careless. They could hear the melody in their heads while they tapped, and they couldn't imagine hearing only knocks. This is the <strong>curse of knowledge</strong>: once you know something, it is very hard to imagine not knowing it. It is the main reason technical writing fails. The writer skips a step that feels obvious, uses a term they forgot they had to learn, or leaves out the one fact that makes everything else make sense.</p>
<p>You can't remove the curse, but you can work around it. Write down who your reader is and what they already know. Then read your draft as that person, asking at each sentence: would they know what this word means? Would they know why this step is here? Best of all, give the draft to a real reader and watch where they get stuck.</p>

<h3>Three questions before you write</h3>
<p>Before you write anything longer than a few sentences, answer three questions. They take two minutes and save hours of rewriting.</p>
<ol>
<li><strong>Who is the reader?</strong> Be specific. "Anyone" is not an answer. "A first-year student who knows Python but has never used Git" is. If you have several kinds of reader, decide which one comes first.</li>
<li><strong>What do they already know, and what do they need to learn?</strong> The distance between the two is the job of your document. Too little, and the reader is lost; too much, and they are bored and stop reading.</li>
<li><strong>What should they be able to do afterwards?</strong> Install the program? Decide between two designs? Fix the bug? A document with a clear purpose is easy to write, because every sentence either serves the purpose or can be cut.</li>
</ol>
<p>Here is how the answers change a document. Suppose you wrote a program that checks a list of passwords against common rules. A README for <em>classmates who want to use it</em> starts with how to run it and what the output means. A report for <em>your instructor</em> starts with how you designed it and why. An email to <em>the university's IT office</em>, suggesting they use it, starts with what problem it solves for them and what it costs. Same program, three readers, three different first paragraphs.</p>

<h3>Readers skim</h3>
<p>Most readers of technical documents don't read every word. They arrive with a question, skim for the part that answers it, read that part closely, and leave. Usability studies of web pages (most famously by the Nielsen Norman Group) found that people read only a fraction of the words on a typical page. Write for the skimmer as well as the careful reader:</p>
<ul>
<li>Put the most important information first: in the document, in each section, in each paragraph.</li>
<li>Make headings say what the section contains. "Installing on Windows" helps a skimmer; "Getting started" helps less; "Part 2" doesn't help at all.</li>
<li>Use lists for steps and parallel items, and tables for comparisons.</li>
<li>Keep paragraphs short and about one thing.</li>
</ul>
<p>Lesson 3 returns to structure in detail.</p>

<h3>Genres: kinds of document with known shapes</h3>
<p>A <strong>genre</strong> is a kind of document whose readers expect a particular shape. A bug report has steps to reproduce, expected behavior and actual behavior. A README starts with what the project is and how to install it. A scientific paper has an abstract, methods and results. Following a genre's shape isn't timid: it helps readers, because they know where to look. This course teaches the genres a computer scientist writes most: explanations (Lesson 4), documentation (Lesson 5), the daily writing of a software team (Lesson 6), design documents (Lesson 7) and arguments from evidence (Lesson 8).</p>

<h3>Writing is a process</h3>
<p>Experienced writers rarely produce a good document in one pass. They plan (the three questions), draft quickly without polishing, then revise: first the big things (is the structure right? is anything missing?), then paragraphs and sentences, and last spelling and punctuation. Polishing sentences in a section you later delete is wasted work, which is why the order matters. Lesson 9 covers revision and feedback. For now, give yourself permission to write a rough first draft.</p>
<div class="callout"><p><strong>The one-sentence test.</strong> Before writing, try to state your main point in one sentence to someone who doesn't know the topic. If you can't, the problem is not your writing yet: you haven't decided what you think. Work that out first.</p></div>
`,
      terms: [
        ["Technical writing", "Writing whose purpose is to help a specific reader understand something or do something."],
        ["Audience", "The readers a document is written for: who they are, what they know, and what they need."],
        ["Purpose", "What the reader should know or be able to do after reading."],
        ["Curse of knowledge", "The difficulty of imagining what it is like not to know something you know."],
        ["Genre", "A kind of document, such as a bug report or a README, whose readers expect a particular structure."]
      ],
      quiz: [
        { q: "In Newton's tapping experiment, what explains the gap between tappers' predictions and listeners' results?", choices: ["Listeners didn't know the songs", "Tappers heard the melody in their heads and couldn't imagine hearing only taps", "Tappers tapped too fast", "The songs were chosen to be difficult"], answer: 1, why: "This is the curse of knowledge: knowing the answer made it hard for tappers to imagine not knowing it." },
        { q: "Which is the most useful answer to \"Who is the reader?\"", choices: ["Everyone", "Technical people", "A first-year student who knows Python but has never used Git", "My instructor, because they grade it"], answer: 2, why: "A specific reader tells you what you can assume and what you must explain." },
        { q: "Which heading helps a skimming reader most?", choices: ["Part 2", "Getting started", "Installing on Windows", "Miscellaneous"], answer: 2, why: "It says exactly what the section contains, so a reader can tell at a glance whether they need it." },
        { q: "Why revise structure before polishing sentences?", choices: ["Sentences don't matter", "Polishing a section you later cut or move is wasted work", "Structure is easier", "Spell checkers fix sentences anyway"], answer: 1, why: "Big decisions can delete or move whole sections, so do them first." }
      ],
      practice: [
        {
          q: `<p><strong>Audience.</strong> Write the first two sentences of an explanation of what a variable is in Python, once for a 12-year-old who has never programmed and once for a professional Java programmer learning Python. What did you change, and why?</p>`,
          a: `<p><em>For the 12-year-old:</em> "A variable is a name you give to a piece of information so the program can use it later, like writing a label on a box. If you write <code>score = 10</code>, the program puts 10 in a box labelled score."</p><p><em>For the Java programmer:</em> "A Python variable is a name bound to an object; it has no declared type, and the same name can later refer to an object of a different type. Assignment binds the name; it never copies the object."</p><p>The first uses an everyday comparison and an example, and avoids any term the reader doesn't have. The second assumes the reader knows what a variable is and tells them only what is <em>different</em> in Python, using the vocabulary they already have.</p>`
        },
        {
          q: `<p><strong>Three questions.</strong> You built a small Python program for your dorm that splits shared grocery bills fairly. Answer the three planning questions (reader, what they know and need, what they should be able to do) for (a) a README for your housemates and (b) a one-page note to your CS 101 instructor asking whether it could count as extra credit.</p>`,
          a: `<p>(a) <em>Reader:</em> housemates, mostly not programmers, who want to stop arguing about money. <em>Know/need:</em> they know the problem well but not Python; they need to know how to enter purchases and read the result. <em>Do afterwards:</em> run it and trust the numbers. So: start with what it does in one sentence, then step-by-step instructions, then an example of the output.</p><p>(b) <em>Reader:</em> your instructor, who knows Python well but not your program. <em>Know/need:</em> they need to see what's technically interesting and what you learned. <em>Do afterwards:</em> decide yes or no. So: start with the request, then what the program does, then the design choices and what in it goes beyond the course.</p>`
        },
        {
          q: `<p><strong>Curse of knowledge.</strong> Here is a set of instructions written by an expert: "Clone the repo, create a venv, pip install the requirements, and run main." List every place a first-year student who has never used these tools would get stuck.</p>`,
          a: `<p>"Clone": what does it mean, with which tool, and from where (no URL is given)? "The repo": which repository? "Create a venv": what is a venv, what command creates it, and must it be activated afterwards? "pip install the requirements": the actual command is <code>pip install -r requirements.txt</code>, and where should it be run? "Run main": run which file, with which command (<code>python main.py</code>?), from which folder? Each step is one line for the expert and a dead end for the beginner.</p>`
        },
        {
          q: `<p><strong>Purpose first.</strong> Rewrite this opening so the reader learns the purpose in the first sentence: "Over the past three weeks I have been looking at our test suite, which has been getting slower, and after trying several things, including profiling and reading the pytest documentation, I found that most of the time is spent creating the database, so I am proposing that we create it once per test session instead of once per test, which would cut the run time from 12 minutes to about 2."</p>`,
          a: `<p>"I propose creating the test database once per test session instead of once per test, which would cut our test run from 12 minutes to about 2. Profiling showed that most of the run time is spent creating the database." The request and its benefit come first; the history of how you found it can follow, briefly, or be dropped.</p>`
        },
        {
          q: `<p><strong>One-sentence test.</strong> Pick a program you wrote this term. State, in one sentence a non-programmer would understand, what it does and why someone would want it. Then show the sentence to someone who isn't in a CS course and ask them to repeat it back in their own words. What did they get wrong?</p>`,
          a: `<p>A strong sentence names the user and the benefit, not the code: "It reads a class's quiz scores and tells the teacher which questions most students got wrong" rather than "It loops over a CSV file and computes per-column means." Whatever the listener got wrong points to a word or step you assumed they knew.</p>`
        }
      ],
      sources: ["googletw", "plainlang"]
    },
    {
      id: "w2",
      title: "Clear sentences",
      minutes: 90,
      summary: "How to write sentences a reader understands on first reading: actors and actions, active and passive voice, cutting needless words, precise words, and old information before new.",
      notes: `
<p>A reader can follow a well-organized document and still give up on it, one hard sentence at a time. This lesson gives five habits that make sentences easier to read. None of them is a rule to follow blindly; each is a question to ask when a sentence feels heavy.</p>

<h3>1. Make the actor the subject and the action the verb</h3>
<p>Readers understand a sentence fastest when its grammatical subject is the person or thing doing something, and its verb is what they do. Compare:</p>
<pre data-label="Before"><code>The implementation of input validation by the team resulted in a reduction of crashes.</code></pre>
<pre data-label="After"><code>The team validated inputs, and crashes fell.</code></pre>
<p>In the first sentence the actions (implementing, validating, reducing) are hidden inside nouns: <em>implementation</em>, <em>validation</em>, <em>reduction</em>. A noun made from a verb or adjective is called a <strong>nominalization</strong>. Nominalizations make sentences longer and vaguer, because they hide who did what. To fix one, ask "who is doing what here?", make the "who" the subject and the "what" the verb.</p>
<p>Not every nominalization is bad. "Recursion", "validation" and "encryption" are names of concepts, and a sentence about the concept should use them: "Encryption protects data in transit." The problem is a nominalization that hides an action someone performed.</p>

<h3>2. Prefer the active voice, and know when not to</h3>
<p>In the <strong>active voice</strong> the subject performs the action: "The function returns a list." In the <strong>passive voice</strong> the subject receives it: "A list is returned by the function", or, with the actor dropped, "A list is returned." You can spot the passive by a form of <em>to be</em> (is, was, were, has been) followed by a past participle (returned, deleted, written).</p>
<p>The active voice is usually shorter and says who is responsible. That matters in technical writing. "The file is deleted" leaves the reader asking: deleted by whom, and when? "The cleanup script deletes the file at midnight" answers both.</p>
<p>Use the passive when the actor is unknown, unimportant, or obvious, or when you want to keep the reader's attention on the thing acted upon. "The password is hashed before it is stored" is fine: the reader cares about the password, and naming the hashing function would add nothing at that point. Scientific writing also uses the passive for methods ("The samples were heated to 80 °C"). The goal is not zero passives; it is no passives that hide something the reader needs.</p>

<h3>3. Cut words that do no work</h3>
<p>Every word asks the reader for a little attention. Words that add no meaning waste it. Common culprits:</p>
<table>
<thead><tr><th>Wordy</th><th>Concise</th></tr></thead>
<tbody>
<tr><td>in order to</td><td>to</td></tr>
<tr><td>due to the fact that</td><td>because</td></tr>
<tr><td>at this point in time</td><td>now</td></tr>
<tr><td>has the ability to</td><td>can</td></tr>
<tr><td>make a decision</td><td>decide</td></tr>
<tr><td>it should be noted that X</td><td>X</td></tr>
<tr><td>basically, actually, very, really, quite</td><td>(usually nothing)</td></tr>
</tbody>
</table>
<p>A useful test: delete the word or phrase and reread. If the meaning is unchanged, leave it out. In 1918 William Strunk put it in three words: "Omit needless words." He didn't mean "write short sentences"; he meant that every word should do work.</p>
<p>Cutting has a limit. Don't cut the words that make the sentence clear to <em>your</em> reader. "Run <code>pip install -r requirements.txt</code>" is shorter than "Install the dependencies listed in <code>requirements.txt</code> by running <code>pip install -r requirements.txt</code> in the project folder", but for a beginner the longer version is better, because it says what the command does and where to run it.</p>

<h3>4. Choose precise words</h3>
<p>Vague words force the reader to guess. Technical writing should rarely make them guess.</p>
<ul>
<li><strong>Replace vague quantities with numbers.</strong> "The program is slow" → "The program takes 40 seconds to load a 10 MB file." "Many users" → "About 300 of our 2,000 users."</li>
<li><strong>Use one term for one thing.</strong> In fiction, varying words is good style. In technical writing, if you say "user" in one paragraph and "client" in the next, the reader will wonder whether they are different. Pick a term, define it once, and keep it.</li>
<li><strong>Watch "it", "this" and "that".</strong> "The function calls the parser, which reads the file. If it fails, it returns None." Which fails, the parser or the read? Which returns None? Repeat the noun: "If the parser fails, the function returns None."</li>
<li><strong>Explain or avoid jargon.</strong> Jargon is a field's specialist vocabulary. It is efficient among experts and a wall for everyone else. If the reader might not know a term, define it the first time, or use an everyday word.</li>
</ul>

<h3>5. Put old information before new</h3>
<p>In 1990 George Gopen and Judith Swan argued that readers expect each sentence to start with something they already know (the <strong>topic position</strong>) and to end with the new, important information (the <strong>stress position</strong>). A sentence that starts with something familiar gives the reader a place to stand; the ending is where they look for the point.</p>
<pre data-label="Before"><code>A hash table stores key-value pairs. Constant average lookup time is what makes
hash tables popular.</code></pre>
<pre data-label="After"><code>A hash table stores key-value pairs. Its popularity comes from one property: on
average, it finds any key in constant time.</code></pre>
<p>In the "after" version, the second sentence starts with the hash table (old: the reader just met it) and ends with constant time (new: the point). Chaining sentences this way, each beginning with something from the end of the last, makes a paragraph flow.</p>

<h3>Sentence length</h3>
<p>Long sentences aren't wrong, but each extra clause makes the reader hold more in their head. When a sentence passes about 25 words, check whether it contains two ideas that would be clearer as two sentences. Vary length, though: a run of short, choppy sentences is also tiring. A useful habit is to read your draft aloud. Where you run out of breath or stumble, the reader will too.</p>
`,
      terms: [
        ["Nominalization", "A noun made from a verb or adjective, such as \"implementation\" from \"implement\"; it can hide who did what."],
        ["Active voice", "A sentence whose subject performs the action: \"The function returns a list.\""],
        ["Passive voice", "A sentence whose subject receives the action: \"A list is returned.\" The actor may be omitted."],
        ["Jargon", "A field's specialist vocabulary, useful among experts and confusing to others."],
        ["Topic and stress positions", "The start of a sentence, where readers expect familiar information, and the end, where they expect the new point."]
      ],
      quiz: [
        { q: "Which sentence is in the passive voice?", choices: ["The server rejects the request.", "The request is rejected.", "The request fails.", "Rejecting the request is safe."], answer: 1, why: "A form of \"to be\" plus a past participle, with the actor (the server) dropped." },
        { q: "When is the passive voice a good choice?", choices: ["Never", "When the actor is unknown, unimportant or obvious", "Whenever you want to sound formal", "Only in code comments"], answer: 1, why: "\"The password is hashed before it is stored\" keeps attention on the password; the actor adds nothing there." },
        { q: "Which is the best revision of \"The team made a decision to perform a migration of the database\"?", choices: ["The team decided to migrate the database.", "A decision to migrate the database was made.", "The database migration decision was made by the team.", "Database migration: decided."], answer: 0, why: "The actor (the team) is the subject and the actions (decide, migrate) are verbs." },
        { q: "\"The function calls the parser, which reads the file. If it fails, it returns None.\" What is the problem?", choices: ["It is too short", "\"It\" could refer to the parser or the read", "It uses the passive", "\"None\" should be in quotes"], answer: 1, why: "An unclear pronoun forces the reader to guess. Repeat the noun." },
        { q: "According to Gopen and Swan, where should the new, important information in a sentence go?", choices: ["At the start", "In the middle", "At the end", "In parentheses"], answer: 2, why: "The end of a sentence is the stress position, where readers look for the point." }
      ],
      practice: [
        {
          q: `<p><strong>Actors and actions.</strong> Rewrite each sentence so the actor is the subject and the action is the verb.</p><ol><li>The occurrence of the error was due to a failure in the validation of user input.</li><li>A review of the code was conducted by Priya, and the identification of three bugs resulted.</li><li>There is a need for the installation of Python 3.12 prior to the running of the script.</li></ol>`,
          a: `<ol><li>The error occurred because the program didn't validate user input.</li><li>Priya reviewed the code and found three bugs.</li><li>Install Python 3.12 before you run the script.</li></ol><p>In each, ask "who does what?" In (3) the actor is the reader, so the clearest form is an instruction.</p>`
        },
        {
          q: `<p><strong>Active or passive?</strong> For each sentence, say whether the passive is a good choice here, and rewrite it in the active voice if not.</p><ol><li>Mistakes were made in the deployment.</li><li>The data is encrypted with AES before it is written to disk.</li><li>The bug was introduced in version 2.3.</li><li>Your account has been suspended.</li></ol>`,
          a: `<ol><li>Not a good choice: it hides who is responsible. "I deployed the wrong configuration" says what happened.</li><li>Good: the reader cares about the data, and naming the program that does the encrypting adds nothing.</li><li>Acceptable if the reader only needs to know when; but in a bug report, "Commit a1b2c3 (version 2.3) introduced the bug" lets the reader find the change.</li><li>It hides the actor and the reason, which the user needs: "We suspended your account because three payments failed. To restore it, update your card."</li></ol>`
        },
        {
          q: `<p><strong>Cut.</strong> Cut this to about half its length without losing any information: "It should be noted that at this point in time the system basically has the ability to process approximately 500 requests per second, and in order to increase this number it would be necessary for us to make a decision about whether or not to add more servers."</p>`,
          a: `<p>"The system now handles about 500 requests a second. To handle more, we must decide whether to add servers." (From 48 words to 19.) "It should be noted that", "basically", "at this point in time" and "in order to" carried no meaning, and "has the ability to process" became "handles".</p>`
        },
        {
          q: `<p><strong>Precise words.</strong> Rewrite to replace every vague word with something a reader could check: "The new version is a lot faster and uses less memory on big files, so most users should see an improvement."</p>`,
          a: `<p>For example: "On a 1 GB file, version 2.0 loads in 3 seconds instead of 11 and uses 200 MB of memory instead of 900 MB. Files under 10 MB, about 80% of what our users open, load in under a second either way." Precision forced two discoveries: the improvement depends on file size, and for most files it may not be noticeable. Vague words had hidden both.</p>`
        },
        {
          q: `<p><strong>Old before new.</strong> Reorder the second and third sentences so each begins with information from the sentence before: "Git stores a project's history as a series of commits. A message and a pointer to the previous commit are stored with each commit. Following the chain of these pointers from the newest commit is how Git reconstructs the history."</p>`,
          a: `<p>"Git stores a project's history as a series of commits. Each commit stores a message and a pointer to the previous commit. By following these pointers back from the newest commit, Git reconstructs the history." Each sentence now starts with something the reader just met (commits, then the pointers) and ends with what's new.</p>`
        }
      ],
      sources: ["gopen90", "strunk", "orwell46", "googletw"]
    },
    {
      id: "w3",
      title: "Paragraphs, structure and headings",
      minutes: 90,
      summary: "Building paragraphs around one idea, putting the main point first, using headings, lists and tables, and outlining a document before drafting it.",
      notes: `
<p>Clear sentences are not enough if they arrive in the wrong order. This lesson moves up a level: paragraphs, sections and whole documents.</p>

<h3>One paragraph, one idea</h3>
<p>A paragraph is a unit of thought. It should develop one idea, and its first sentence, the <strong>topic sentence</strong>, should say what that idea is. A reader skimming only the first sentence of each paragraph should get the outline of your argument.</p>
<p>The rest of the paragraph supports the topic sentence: an explanation, an example, evidence, a consequence. If a sentence doesn't support the topic sentence, it belongs in another paragraph. If a paragraph has no clear topic sentence, it is often two paragraphs stuck together, or notes that haven't yet been turned into a point.</p>
<p>Here is a paragraph with a weak topic sentence:</p>
<pre data-label="Before"><code>There are some things to consider about passwords. Users reuse them across sites.
When one site is breached, attackers try the same email and password elsewhere.
This is called credential stuffing. Many large account takeovers have happened
this way.</code></pre>
<p>"There are some things to consider" tells the reader nothing. The real point is in the middle. Moving it up turns the paragraph into an argument:</p>
<pre data-label="After"><code>Reused passwords turn one site's breach into many. When attackers steal email
and password pairs from one site, they try them on others, an attack called
credential stuffing. Many large account takeovers have happened this way.</code></pre>

<h3>The main point first</h3>
<p>In school essays the conclusion often comes at the end, after the evidence. In technical and professional writing, the reader usually needs the conclusion first, and the reasoning only if they want to check it. Journalists call this the <strong>inverted pyramid</strong>: the most important facts at the top, then supporting detail, then background. The military and many companies use the term <strong>BLUF</strong>, "bottom line up front".</p>
<pre data-label="Buried"><code>Subject: Database update

Hi all, as you may know we've been seeing some slow queries. I spent Tuesday
looking at the logs and found that the orders table has no index on customer_id.
After testing on staging, I think we should add one. I'd like to do it Friday
at 6 pm, when traffic is lowest, and it will take about 10 minutes, during which
checkout will be unavailable. Let me know if that's a problem.</code></pre>
<pre data-label="BLUF"><code>Subject: Checkout offline Fri 6:00-6:10 pm; reply by Thu

I plan to add an index to the orders table on Friday at 6 pm. Checkout will be
unavailable for about 10 minutes. Please reply by Thursday if that time is a
problem.

Why: queries that look up a customer's orders are slow because the table has no
index on customer_id. On staging, the index cut those queries from 2 s to 20 ms.</code></pre>
<p>The second version tells a busy reader everything they must act on in the subject line and the first paragraph. The reasoning is still there for anyone who wants it.</p>

<h3>Headings</h3>
<p>Headings are a map of the document. Good headings are:</p>
<ul>
<li><strong>Informative.</strong> "Why the cache fails under load" beats "Analysis".</li>
<li><strong>Parallel.</strong> Headings at the same level should have the same grammatical form: "Installing", "Configuring", "Running", not "Installation", "How to configure it", "Run".</li>
<li><strong>Nested logically.</strong> A subsection belongs to its section. Don't skip levels, and don't create a subsection with only one sibling unless you expect more.</li>
</ul>
<p>Headings must not replace sentences. A section that starts straight after a heading with "This is done by..." forces the reader back to the heading to learn what "this" is. Write each section so it makes sense without its heading.</p>

<h3>Lists and tables</h3>
<p>Use a <strong>numbered list</strong> when order matters (steps), a <strong>bulleted list</strong> for parallel items in no particular order, and a <strong>table</strong> when you compare several items along the same dimensions. Keep list items grammatically parallel: all start with a verb, or all are noun phrases. Introduce each list with a sentence that says what the list is.</p>
<p>Lists can be overused. An argument (A, therefore B, but C) needs prose, because the connections between ideas are the point, and bullets drop the connecting words. A slide of bullets can make three unrelated facts and a chain of reasoning look the same. When a decision depends on how ideas connect, write paragraphs.</p>

<h3>Transitions</h3>
<p>Transitions tell the reader how the next idea relates to the last: <em>however</em> (contrast), <em>therefore</em> or <em>so</em> (consequence), <em>for example</em> (illustration), <em>first, second</em> (sequence), <em>in contrast</em>, <em>as a result</em>. Without them the reader must work out the relationships, and may work them out wrongly. With too many, the writing feels mechanical. Use one where the relationship isn't obvious.</p>

<h3>Outline before drafting</h3>
<p>For anything longer than a page, outline first. An outline is just the headings and the topic sentence of each paragraph, in order. It lets you test the structure while it's still cheap to change: is the main point first? does each section follow from the last? is anything missing? Then the draft is a matter of filling in.</p>
<p>A useful trick for a draft you've already written is the <strong>reverse outline</strong>: list the point of each paragraph in a few words. If you can't name a paragraph's point, it doesn't have one. If two paragraphs make the same point, merge them. If the points are out of order, you'll see it in the list much more easily than in the full text.</p>
`,
      terms: [
        ["Topic sentence", "The first sentence of a paragraph, stating the one idea the paragraph develops."],
        ["Inverted pyramid", "Ordering a document from most to least important: conclusion first, then support, then background."],
        ["BLUF", "\"Bottom line up front\": state the conclusion or request at the start."],
        ["Parallel structure", "Giving items at the same level (list items, headings) the same grammatical form."],
        ["Reverse outline", "A list of the point of each paragraph in a draft, used to check its structure."]
      ],
      quiz: [
        { q: "What should the first sentence of a paragraph usually do?", choices: ["Ask a question", "State the idea the paragraph develops", "Give background", "Repeat the heading"], answer: 1, why: "A topic sentence lets a skimming reader get the outline from first sentences alone." },
        { q: "Which list of headings is parallel?", choices: ["Installation; How to configure; Run it", "Installing; Configuring; Running", "Install; Configuration; Running the program", "Setup; Configure; Usage notes"], answer: 1, why: "All three are the same grammatical form (-ing verbs)." },
        { q: "When is prose better than a bulleted list?", choices: ["When items are parallel", "When steps must happen in order", "When the connections between ideas are the point", "Never"], answer: 2, why: "Bullets drop the connecting words (therefore, but, because) that an argument depends on." },
        { q: "A reverse outline helps you find:", choices: ["Spelling mistakes", "Paragraphs with no point, repeated points, and points out of order", "Missing citations", "Passive sentences"], answer: 1, why: "Listing each paragraph's point exposes the structure, and its problems, at a glance." }
      ],
      practice: [
        {
          q: `<p><strong>Topic sentences.</strong> Write a topic sentence for this paragraph, which currently has none: "Binary search checks the middle item and throws away half the list each step. A million sorted items need at most 20 checks. Linear search might need a million. But binary search only works if the list is sorted, and sorting costs time too."</p>`,
          a: `<p>For example: "Binary search is dramatically faster than linear search, but only on sorted data." It states the paragraph's claim and previews both halves: the speed, and the condition.</p>`
        },
        {
          q: `<p><strong>BLUF.</strong> Rewrite this message so the reader knows what to do from the first sentence: "Hi Sam, I was going through the lab results from Tuesday and comparing them to last week, and I noticed some of the numbers in table 3 look off, possibly because the sensor was recalibrated on Monday. I'm not sure though. Could you check whether the recalibration happened before or after your measurements? I need to know by Friday for the report."</p>`,
          a: `<p>"Hi Sam, could you check by Friday whether the sensor was recalibrated before or after your Tuesday measurements? Some numbers in table 3 differ from last week's, and the recalibration on Monday may explain it. I need the answer for the report." The request and deadline lead; the reason follows.</p>`
        },
        {
          q: `<p><strong>Headings.</strong> Improve these headings for a guide to a command-line tool: "Introduction", "Stuff you need", "How do I install it?", "Usage", "Problems".</p>`,
          a: `<p>For example: "What the tool does", "Requirements", "Installing", "Running a conversion", "Fixing common errors". They are informative (a skimmer knows what each contains), parallel where they are steps ("Installing", "Running", "Fixing"), and free of vague words like "stuff" and "problems".</p>`
        },
        {
          q: `<p><strong>List or prose?</strong> For each, say whether a numbered list, a bulleted list, a table or prose is best, and why: (a) how to reset a password; (b) a comparison of three cloud providers on price, storage and support; (c) why your team chose PostgreSQL over MongoDB; (d) the file types the program accepts.</p>`,
          a: `<p>(a) Numbered list: the steps have an order. (b) Table: several items compared on the same dimensions. (c) Prose: the reasoning and trade-offs are the point, and they need words like "because" and "although". (d) Bulleted list: parallel items in no particular order (or a table if each type needs a note).</p>`
        },
        {
          q: `<p><strong>Reverse outline.</strong> Take a piece of writing you've done this term (a CS 100 reflection works well). Write the point of each paragraph in at most eight words. What does the list show about the structure? Describe one change you would make.</p>`,
          a: `<p>Typical discoveries: the main point appears only in the last paragraph (move it to the first); two paragraphs make the same point (merge them); a paragraph's point can't be named (it is background that can be cut, or the idea isn't yet clear); the order doesn't follow a logic (reorder so each point builds on the previous one).</p>`
        }
      ],
      sources: ["googletw", "plainlang"]
    },
    {
      id: "w4",
      title: "Explaining technical ideas",
      minutes: 90,
      summary: "How to explain an unfamiliar idea: concrete examples before general rules, definitions, analogies and their limits, worked examples, diagrams, and numbers a reader can picture.",
      notes: `
<p>Much of a computer scientist's writing is explanation: teaching a teammate how a system works, answering a question, writing a tutorial, or explaining a result to someone who will make a decision with it. This lesson collects the techniques that make explanations work.</p>

<h3>Example first, then the rule</h3>
<p>Most people understand a general idea more easily after they have seen one concrete case of it. Compare two explanations of a hash function:</p>
<pre data-label="Rule first"><code>A hash function maps data of arbitrary size to fixed-size values, such that
equal inputs produce equal outputs.</code></pre>
<pre data-label="Example first"><code>Add up the letter positions in a word (a = 1, b = 2, ...) and keep the last
digit: "cab" gives 3 + 1 + 2 = 6, and "bad" gives 2 + 1 + 4 = 7. That's a (bad)
hash function: it turns any word into a digit from 0 to 9, and the same word
always gives the same digit. Real hash functions do the same job much better,
turning any data into a fixed-size number.</code></pre>
<p>The first is a correct definition, and an expert can read it in a second. A beginner reads it, nods, and can't use it. The second gives them something to hold, so the definition at the end attaches to a picture. When you can, give a <strong>concrete example</strong> before (or immediately after) the abstraction.</p>
<p>Choose examples that show the idea's important features. The example above also shows, quietly, why collisions happen: "abc" also gives 6. A good second example often shows a boundary or an exception.</p>

<h3>Define terms, once</h3>
<p>The first time you use a term the reader may not know, define it, in plain words, right there. A short definition can go in parentheses or after a comma: "a <em>commit</em>, a saved snapshot of the project". A key term deserves its own sentence. Then use exactly that term every time (Lesson 2): a reader who learns "commit" will be confused if you later write "revision" for the same thing.</p>
<p>Don't define what the reader already knows: it's slow and slightly insulting. This is where the reader you named in Lesson 1 matters.</p>

<h3>Analogies, and where they break</h3>
<p>An <strong>analogy</strong> explains an unfamiliar thing by comparison with a familiar one. A variable is "a labelled box"; a function call is "a recipe a cook follows"; a firewall is "a building's security desk". Good analogies give a beginner a mental model in one sentence.</p>
<p>Every analogy breaks somewhere, and a reader who doesn't know where may draw wrong conclusions. The box analogy suggests that <code>b = a</code> copies the contents into a second box, which is exactly wrong for Python lists: both names refer to the same list. So when you use an analogy, say where it stops working, at least when the break matters: "Think of a variable as a label stuck on a value, not as a box. Two labels can be stuck on the same value." Choosing the analogy that breaks least where it matters is part of the skill.</p>

<h3>Worked examples</h3>
<p>For a procedure (an algorithm, a calculation, a proof technique), a <strong>worked example</strong> is often the best explanation: carry out every step on a small, specific input, and show the state after each step. Research on learning (called the worked-example effect in educational psychology) has found that beginners learn many procedures better from studying worked examples than from solving problems on their own right away. Pick an input small enough to fit on the page but large enough to show every case. To explain binary search, an 8-item list where the search takes three steps beats a 3-item list where it takes one.</p>

<h3>Diagrams</h3>
<p>Some ideas are spatial: data structures, networks, the flow of a program, the parts of a system and how they connect. A diagram can show them at a glance. Good diagrams:</p>
<ul>
<li><strong>Show one idea.</strong> A diagram of everything shows nothing. Leave out what this explanation doesn't need.</li>
<li><strong>Are referred to in the text.</strong> Tell the reader what to look at: "In Figure 2, notice that both arrows point to the same list."</li>
<li><strong>Have a caption that states the point,</strong> not just the subject: "Figure 2. After <code>b = a</code>, both names refer to one list" rather than "Figure 2. Variables."</li>
<li><strong>Use labels a reader can read,</strong> and don't rely on colour alone: some readers can't distinguish red from green, and many documents are printed in black and white.</li>
</ul>

<h3>Numbers a reader can picture</h3>
<p>Large and small numbers mean little on their own. Give the reader a comparison: "A modern processor runs about 3 billion cycles a second: in the time light takes to cross a room, it has done about 30." Always give <strong>units</strong>, and state them consistently. In 1999 NASA lost the Mars Climate Orbiter because one team's software reported thruster impulse in pound-force seconds while another team's software expected newton-seconds. The documents between them didn't make the units clear, and the spacecraft flew too close to Mars.</p>
<p>When you report a measurement, say how it was measured and how precise it is: "median of 10 runs on a 2023 laptop" tells the reader how much to trust "1.2 seconds".</p>

<h3>Explaining code</h3>
<p>When you explain code in prose, follow the same principles. Say what the code is for before how it works. Show a small, runnable example with its output. Walk through the important lines, not every line. And test every code sample you publish: a broken example costs a reader more time than no example.</p>
<div class="callout"><p><strong>Check an explanation by teaching it.</strong> The surest test is to explain the idea to someone who doesn't know it, and ask them to explain it back. Where their version goes wrong, your explanation had a gap.</p></div>
`,
      terms: [
        ["Concrete example", "A specific case that shows an idea's important features, often given before the general rule."],
        ["Analogy", "An explanation of something unfamiliar by comparison with something familiar; every analogy breaks somewhere."],
        ["Worked example", "A procedure carried out step by step on a specific input, showing the state after each step."],
        ["Caption", "The text under a figure; a good caption states the figure's point."]
      ],
      quiz: [
        { q: "Why give a concrete example before a general definition?", choices: ["Definitions are always wrong", "A beginner understands an abstraction more easily after seeing one case of it", "Examples are shorter", "Experts prefer it"], answer: 1, why: "The example gives the reader something to attach the definition to." },
        { q: "Where does the \"variable as a box\" analogy break for Python lists?", choices: ["Boxes can't hold numbers", "It suggests b = a copies the list, but both names refer to the same list", "Boxes have no names", "It doesn't break"], answer: 1, why: "A label stuck on a value is a better model: two labels can be on one value." },
        { q: "Which caption is best?", choices: ["Figure 3", "Figure 3. A linked list", "Figure 3. Inserting at the front changes only one pointer", "Figure 3. See text"], answer: 2, why: "A caption that states the point tells the reader what to notice." },
        { q: "What caused the loss of the Mars Climate Orbiter?", choices: ["A software crash", "One team's software reported impulse in pound-force seconds while another's expected newton-seconds", "A collision with debris", "A failed rocket stage"], answer: 1, why: "Unstated units passed between teams led to a wrong trajectory." }
      ],
      practice: [
        {
          q: `<p><strong>Example first.</strong> Explain what a <em>queue</em> data structure is to someone who has never programmed, starting with a concrete example and ending with a one-sentence definition.</p>`,
          a: `<p>"At a coffee shop, people join the line at the back and are served from the front: whoever arrived first is served first. A queue in a program works the same way. The program adds items to the back and takes them from the front, for example print jobs waiting for a printer. A queue is a collection where items are removed in the same order they were added: first in, first out."</p>`
        },
        {
          q: `<p><strong>Analogy limits.</strong> A common analogy says "a computer's memory is like a library, and an address is like a shelf number." Name one way this analogy helps and one place it breaks that a student might be misled by.</p>`,
          a: `<p>It helps: each address identifies exactly one location, and you need the address to find what's stored there. It breaks: a library book can be taken away, leaving the shelf empty, but a memory location always holds <em>some</em> value; writing to a location replaces its contents rather than adding a second book; and reading a location doesn't remove anything. A student might wrongly think reading memory "takes" the data.</p>`
        },
        {
          q: `<p><strong>Worked example.</strong> Write a worked example of binary search for 23 in the sorted list [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]. Show the low, high and middle positions at each step (positions counted from 0, middle rounded down).</p>`,
          a: `<p>Step 1: low = 0, high = 9, middle = 4, item 16. 23 &gt; 16, so search the right half: low = 5.</p><p>Step 2: low = 5, high = 9, middle = 7, item 56. 23 &lt; 56, so search the left half: high = 6.</p><p>Step 3: low = 5, high = 6, middle = 5, item 23. Found at position 5, after 3 comparisons. (A linear search would have needed 6.)</p>`
        },
        {
          q: `<p><strong>Numbers.</strong> Make each number meaningful to a general reader with a comparison: (a) a hard drive holds 2 TB; (b) a network round trip from New York to London takes about 70 ms; (c) training a large AI model used about 1,000 MWh of electricity.</p>`,
          a: `<p>(a) 2 TB is about 500,000 phone photos at 4 MB each. (b) 70 ms is about a quarter of the time a blink takes (roughly 300 ms), yet light in fiber needs most of it just to cross the ocean and back. (c) The average U.S. home uses about 10 MWh a year, so 1,000 MWh is roughly a year's electricity for 100 homes. Any comparison should be checked: state the assumptions (4 MB per photo, 10 MWh per home) so a reader can verify it.</p>`
        },
        {
          q: `<p><strong>Caption.</strong> A figure shows two Python names, <code>a</code> and <code>b</code>, with arrows to the same list <code>[1, 2, 3]</code>, and its caption reads "Figure 1. Aliasing." Rewrite the caption and the sentence in the text that refers to the figure.</p>`,
          a: `<p>Caption: "Figure 1. After <code>b = a</code>, both names refer to the same list, so a change through <code>b</code> is visible through <code>a</code>." Text: "Figure 1 shows why: <code>b = a</code> doesn't copy the list. Notice that there is only one list, with two arrows pointing to it."</p>`
        }
      ],
      sources: ["googletw", "writethedocs"]
    }
  ]
});

CSA.addUnits("writ100", [
    {
      id: "w5",
      title: "Documentation: READMEs, docstrings and comments",
      minutes: 90,
      summary: "The four kinds of documentation readers need, what a README should contain, how to write docstrings and comments that help, and how to keep documentation true as code changes.",
      notes: `
<p>Code tells the computer what to do. Documentation tells people what the code is for, how to use it, and why it is the way it is. Undocumented code is expensive: every new user has to rediscover what the author knew, and often the next user is the author, six months later, having forgotten.</p>

<h3>Four kinds of documentation</h3>
<p>Daniele Procida's <strong>Diátaxis</strong> framework observes that readers come to documentation with four different needs, and that mixing them in one page serves none of them well.</p>
<table>
<thead><tr><th>Kind</th><th>The reader wants to…</th><th>Example</th></tr></thead>
<tbody>
<tr><td><strong>Tutorial</strong></td><td>learn, by doing something guided from start to finish</td><td>"Build your first web page with our library"</td></tr>
<tr><td><strong>How-to guide</strong></td><td>reach a specific goal they already have</td><td>"How to export data as CSV"</td></tr>
<tr><td><strong>Reference</strong></td><td>look up exact facts</td><td>A list of every function, its parameters and return value</td></tr>
<tr><td><strong>Explanation</strong></td><td>understand why things are as they are</td><td>"Why we store times in UTC"</td></tr>
</tbody>
</table>
<p>A tutorial that stops every few steps to explain design history loses the learner. A reference page padded with a story is slow to search. When you write a page, decide which of the four it is, and keep the others out (link to them instead).</p>

<h3>The README</h3>
<p>A <strong>README</strong> is the front page of a project: the first file people see in a repository. Its reader is someone who has just arrived and is deciding whether this project is what they need and how to start. A good README answers, in this order:</p>
<ol>
<li><strong>What is this?</strong> The name and one or two sentences on what it does and for whom.</li>
<li><strong>Why would I use it?</strong> The problem it solves, if the first sentence didn't make it obvious.</li>
<li><strong>How do I install it?</strong> Exact commands, the requirements (such as "Python 3.10 or later"), and which folder to run them in.</li>
<li><strong>How do I use it?</strong> The smallest example that does something real, with its output.</li>
<li><strong>Where do I learn more or get help?</strong> Links to fuller documentation, how to report problems, how to contribute.</li>
<li><strong>License.</strong> What others may do with the code (CS 101's sidebar on licenses explains why this matters).</li>
</ol>
<p>Test your README the way a reader will use it: on a fresh computer, or with a classmate who has never seen the project, follow it literally, and fix every step that fails or assumes something unstated.</p>

<h3>Docstrings</h3>
<p>A <strong>docstring</strong> is documentation attached to a function, class or module. In Python it is a string literal on the first line of the body, and tools such as <code>help()</code> display it. Its reader is someone who wants to <em>call</em> the function without reading its code. Python's style guide for docstrings, PEP 257, asks for a one-line summary written as a command ("Return…", not "Returns…" or "This function returns…"), then, if needed, a blank line and more detail.</p>
<pre><code>def split_bill(total, people, tip=0.15):
    """Return each person's share of a bill, including tip, in cents.

    total is the bill before tip, in dollars; people is the number of
    people sharing it (at least 1); tip is a fraction, so 0.15 means 15%.
    Shares are rounded up to the next cent, so they may add up to
    slightly more than the bill.
    """
    import math
    return math.ceil(total * (1 + tip) * 100 / people)

print(split_bill(50, 3))   # 1917</code></pre>
<p>A good docstring says what the function returns, what each parameter means (including units and allowed values), and anything surprising: here, the rounding up and that the result is in cents. It does not explain <em>how</em> the function computes its result; that's for comments, if anyone, and the code itself.</p>

<h3>Comments: why, not what</h3>
<p>A <strong>comment</strong> is for someone reading the code itself. The code already says <em>what</em> it does; a comment that repeats it adds nothing and goes stale when the code changes:</p>
<pre><code>count = count + 1   # add 1 to count</code></pre>
<p>Useful comments say what the code can't: <em>why</em> it is written this way, what would go wrong if it were changed, or where an unusual value came from.</p>
<pre><code>timeout = 30   # seconds; the payment provider's API can take up to 25 s under load
items = sorted(items)   # binary search below requires sorted input</code></pre>
<p>If you find yourself writing a comment to explain confusing code, first try to make the code clearer: a better variable name or a small, well-named function often replaces the comment entirely.</p>

<h3>Keeping documentation true</h3>
<p>Documentation that is wrong is worse than none: readers trust it, and it misleads them. Documentation drifts out of date because it lives apart from the code and nobody is forced to update it. Habits that help:</p>
<ul>
<li>Keep documentation next to the code it describes (docstrings, a <code>docs</code> folder in the same repository), and update it in the same commit as the code.</li>
<li>Make examples executable. Python's <code>doctest</code> module can run the examples in docstrings as tests, so a stale example fails loudly.</li>
<li>Prefer documenting stable things (what a function promises) over volatile ones (how it happens to be implemented today).</li>
<li>Date or version anything that will go stale: "As of version 2.1, …".</li>
</ul>
`,
      terms: [
        ["Diátaxis", "A framework that divides documentation into tutorials, how-to guides, reference and explanation, by what the reader needs."],
        ["README", "The front-page document of a project, telling a newcomer what it is, how to install it and how to start."],
        ["Docstring", "Documentation attached to a function, class or module, for people who will use it without reading its code."],
        ["Comment", "A note in the code for people reading it; best used to explain why, not what."]
      ],
      quiz: [
        { q: "A page titled \"How to export data as CSV\" is which kind of documentation in Diátaxis?", choices: ["Tutorial", "How-to guide", "Reference", "Explanation"], answer: 1, why: "It serves a reader who already has a specific goal." },
        { q: "What should a README's first sentence or two say?", choices: ["The license", "The author's biography", "What the project is and what it does, for whom", "The full API"], answer: 2, why: "A newcomer first needs to know whether this is what they are looking for." },
        { q: "Which comment is most useful?", choices: ["# loop over the items", "# add 1 to count", "# binary search below requires sorted input", "# this is the function"], answer: 2, why: "It explains why the line exists, which the code alone doesn't say." },
        { q: "Why is wrong documentation worse than none?", choices: ["It takes up space", "Readers trust it and are misled", "It slows the program", "It breaks the build"], answer: 1, why: "A reader with no documentation knows to check; a reader with wrong documentation doesn't." }
      ],
      practice: [
        {
          q: `<p><strong>Classify.</strong> Which Diátaxis kind is each page? (a) "A tour of the library: build a to-do app in 20 minutes"; (b) "Why the library uses immutable data"; (c) "Configuration options" (a table of every setting); (d) "Migrating from version 1 to version 2".</p>`,
          a: `<p>(a) Tutorial: a guided learning experience. (b) Explanation: it is about understanding a design. (c) Reference: exact facts to look up. (d) How-to guide: the reader has a specific goal (upgrading) and wants the steps.</p>`
        },
        {
          q: `<p><strong>Docstring.</strong> Write a docstring for this function: <code>def is_strong(pw): return len(pw) &gt;= 12 and any(c.isdigit() for c in pw) and any(c.isupper() for c in pw)</code>.</p>`,
          a: `<pre><code>def is_strong(pw):
    """Return True if pw meets the password rules, else False.

    A strong password has at least 12 characters, at least one digit and
    at least one uppercase letter. Symbols are allowed but not required.
    """</code></pre><p>It starts with a command, states the return values, and lists the exact rules, so a caller doesn't need to read the code. Mentioning that symbols aren't required answers a question users would likely ask.</p>`
        },
        {
          q: `<p><strong>Comments.</strong> Improve or delete each comment: (a) <code>x = x * 1.08  # multiply x by 1.08</code>; (b) <code>sleep(2)  # wait</code>; (c) <code>if n &lt; 2: return n  # base case</code>.</p>`,
          a: `<p>(a) Say why: <code># add 8% sales tax</code>, or better, remove the comment and name the constant: <code>SALES_TAX = 0.08</code>, <code>price = price * (1 + SALES_TAX)</code>. (b) Say why: <code># the API allows at most one request every 2 seconds</code>. (c) Fine for a reader learning recursion; in a codebase of experienced readers, delete it.</p>`
        },
        {
          q: `<p><strong>README test.</strong> Write the "Installing" and "Using" sections of a README for a Python script <code>grades.py</code> that reads <code>scores.csv</code> and prints each student's average. Assume your reader knows how to open a terminal but nothing else.</p>`,
          a: `<p><em>Installing:</em> "You need Python 3.10 or later. To check, open a terminal and run <code>python3 --version</code>. Download <code>grades.py</code> into the folder that contains your <code>scores.csv</code>." <em>Using:</em> "In a terminal, go to that folder (<code>cd path/to/folder</code>) and run <code>python3 grades.py</code>. <code>scores.csv</code> must have a header row and one row per student: a name, then scores. Example output: <code>Ada: 91.5</code>." A strong answer gives exact commands, says where to run them, states the input format, and shows output.</p>`
        },
        {
          q: `<p><strong>Your project.</strong> Take a program you wrote in CS 101. Give its README draft to a classmate, and watch (without helping) as they try to install and run it. List every place they hesitated, and fix each one.</p>`,
          a: `<p>Typical findings: a missing requirement (a Python version, a package), a command that must be run from a particular folder, an input file whose format isn't described, output the reader didn't know how to interpret. Each hesitation is a sentence missing from the README.</p>`
        }
      ],
      sources: ["diataxis", "writethedocs", "pytutorial"]
    },
    {
      id: "w6",
      title: "Writing in a software team",
      minutes: 90,
      summary: "The short documents a programmer writes every day: commit messages, bug reports, code review comments, and questions that get good answers.",
      notes: `
<p>Most writing in a software team is short: a commit message, a bug report, a comment on a teammate's code, a question in a chat channel. Each is read by someone busy, often months later, who needs to act on it. Each has a well-understood shape.</p>

<h3>Commit messages</h3>
<p>A <strong>commit message</strong> describes one change to a codebase. Its readers are teammates reviewing the change today and, much more often, someone in the future asking "why was this line changed?" with a tool like <code>git log</code> or <code>git blame</code>. The code shows <em>what</em> changed; the message should say <em>why</em>.</p>
<p>The conventions most teams follow (summarized well by Chris Beams in 2014):</p>
<ul>
<li>A <strong>subject line</strong> of about 50 characters or fewer, capitalized, with no period at the end.</li>
<li>The subject in the <strong>imperative mood</strong>, like a command: "Fix crash when the file is empty", not "Fixed…" or "Fixes…". A good test: it should complete the sentence "If applied, this commit will …".</li>
<li>A blank line, then a <strong>body</strong> wrapped at about 72 characters that explains what the change does and why, if the subject isn't enough.</li>
</ul>
<pre data-label="Commit message"><code>Retry failed uploads up to three times

Uploads to the storage service fail about 1% of the time with a timeout,
and users had to start over. Retrying with a short delay fixes almost
all of them; three tries keeps the worst case under 10 seconds.</code></pre>
<p>Compare "fix stuff" or "changes", which tell the future reader nothing. Each commit should also be one logical change, so its message can describe it in one subject line.</p>

<h3>Bug reports</h3>
<p>A bug report has one job: to let the programmer see the program fail for themselves. Simon Tatham's essay on reporting bugs (1999) makes the point that the programmer can fix what they can reproduce, and can only guess at what they can't. A good report contains:</p>
<ol>
<li><strong>A specific title:</strong> "Crash when saving a file whose name contains a space", not "Saving is broken".</li>
<li><strong>Steps to reproduce:</strong> numbered, exact, starting from a clean state.</li>
<li><strong>Expected behavior</strong> and <strong>actual behavior</strong>, separately. "It doesn't work" hides both.</li>
<li><strong>The exact error message</strong>, copied as text, not paraphrased.</li>
<li><strong>The environment:</strong> program version, operating system, browser, anything that might matter.</li>
<li>Optionally, what you've already tried, such as "works if the name has no space".</li>
</ol>
<p>Stick to facts in the report and keep guesses about the cause labelled as guesses. A confident wrong diagnosis can send the programmer the wrong way.</p>

<h3>Code review comments</h3>
<p>In a <strong>code review</strong>, a teammate reads a proposed change before it is merged and comments on it. Review catches bugs and spreads knowledge, but only if comments are useful and the author can take them well. Google's published code review guide, among others, suggests:</p>
<ul>
<li><strong>Comment on the code, not the person.</strong> "This loop reads the file twice" rather than "You read the file twice".</li>
<li><strong>Explain why.</strong> "Could we use a set here? Lookups in this list make the function O(n²) for large inputs" teaches; "Use a set" only commands.</li>
<li><strong>Say how important it is.</strong> Mark small matters of taste as optional (many teams prefix them "Nit:") so the author knows what must change before merging and what needn't.</li>
<li><strong>Ask when you're not sure.</strong> "What happens if the list is empty?" is a fair question; it may reveal a bug, or that you missed something.</li>
<li><strong>Say what's good,</strong> specifically, when something is: it tells the author what to keep doing.</li>
</ul>
<p>As an author, reply to every comment, even with "Done". If you disagree, explain why; a review is a conversation, not a list of orders.</p>

<h3>Asking for help</h3>
<p>A question is a small document whose reader is donating their time. Make it easy to answer:</p>
<ul>
<li><strong>Say what you're trying to achieve,</strong> not only what you're stuck on. Asking how to do your attempted solution instead of the real goal is called the <strong>XY problem</strong>: you want X, you think Y will get you there, and you ask about Y. Often there is a better route to X.</li>
<li><strong>Show what you tried</strong> and what happened, with the exact error message.</li>
<li><strong>Give a minimal reproducible example:</strong> the smallest piece of code that still shows the problem. Making one often reveals the bug before you even ask.</li>
<li><strong>Write the question so it can be read on its own.</strong> "Hi, quick question?" followed by waiting forces a second round trip; put the whole question in the first message.</li>
</ul>
`,
      terms: [
        ["Commit message", "A description of one change to a codebase, explaining what changed and why."],
        ["Imperative mood", "The form of a command: \"Fix the crash\", not \"Fixed\" or \"Fixes\"."],
        ["Bug report", "A document that lets a programmer reproduce a failure: steps, expected and actual behavior, environment."],
        ["Code review", "Reading and commenting on a proposed change before it is merged."],
        ["XY problem", "Asking about your attempted solution (Y) instead of your real goal (X)."],
        ["Minimal reproducible example", "The smallest code that still shows a problem."]
      ],
      quiz: [
        { q: "Which commit subject line follows the usual conventions?", choices: ["fixed the bug.", "Fix crash when the input file is empty", "Changes", "This commit fixes a crash that happens when the input file is empty and also updates the README"], answer: 1, why: "Imperative, capitalized, specific, short, and no final period." },
        { q: "What is the main purpose of a bug report?", choices: ["To assign blame", "To let the programmer reproduce the failure", "To suggest a fix", "To record the date"], answer: 1, why: "A programmer can fix what they can see fail." },
        { q: "Which code review comment is most helpful?", choices: ["This is wrong.", "You always forget edge cases.", "What happens when items is empty? max() would raise ValueError here.", "Rewrite this."], answer: 2, why: "It is about the code, specific, and explains the problem." },
        { q: "A student asks \"How do I get the last three characters of a filename?\" when they really want to check whether a file is a PDF. What is this?", choices: ["A minimal example", "The XY problem", "A nit", "A good question"], answer: 1, why: "They asked about their attempted solution; checking the extension properly (or the file's type) may be better." }
      ],
      practice: [
        {
          q: `<p><strong>Commit messages.</strong> Rewrite each as a good commit subject line (and add a body if it needs one): (a) "fixed it"; (b) "Updated the code so that when users enter a negative quantity in the order form it now shows an error message instead of crashing the program."</p>`,
          a: `<p>(a) Impossible without knowing what "it" was; for example, "Fix off-by-one error in page count". (b) Subject: "Reject negative quantities in the order form". Body: "Entering a negative quantity crashed the order total calculation. Show an error message and keep the form open instead."</p>`
        },
        {
          q: `<p><strong>Bug report.</strong> Turn this into a good bug report: "The grade calculator is broken. I put in my scores and it gave a weird answer. Please fix ASAP."</p>`,
          a: `<p><em>Title:</em> "Average is wrong when a score is left blank." <em>Steps:</em> 1. Open the calculator (version 1.4, Chrome 130 on Windows 11). 2. Enter scores 80, 90 and leave the third blank. 3. Click Calculate. <em>Expected:</em> 85.0 (the average of the two scores), or a message asking for the third. <em>Actual:</em> 56.7, as if the blank were 0. <em>Notes:</em> entering three scores gives the right answer. (The specific numbers are an example; a real report uses what actually happened.)</p>`
        },
        {
          q: `<p><strong>Review comments.</strong> Rewrite each review comment to be specific, about the code, and explained: (a) "This is inefficient."; (b) "Bad variable names."; (c) "Why would you do it this way??"</p>`,
          a: `<p>(a) "This searches the whole list for every order, so it's O(n²) in the number of orders. A dict keyed by order id would make each lookup constant time." (b) "<code>d</code> and <code>tmp</code> are hard to follow; maybe <code>prices_by_item</code> and <code>discounted_total</code>? Nit, not blocking." (c) "I'd have expected a loop here rather than recursion. Is there a reason? Deep lists could hit Python's recursion limit."</p>`
        },
        {
          q: `<p><strong>Ask well.</strong> Rewrite this message to a course forum: "my code doesnt work, can someone help??" The code is a 60-line program; the error is <code>TypeError: can only concatenate str (not "int") to str</code> on line 41, <code>print("Total: " + total)</code>.</p>`,
          a: `<p>"I'm writing a program that totals a shopping list, and the last line fails with <code>TypeError: can only concatenate str (not "int") to str</code>. Here is the smallest version that fails: <code>total = 5</code>, then <code>print("Total: " + total)</code>. I expected it to print <code>Total: 5</code>. I've checked that <code>total</code> is 5 just before. What am I doing wrong?" Making the minimal example probably answers the question: <code>+</code> can't join a string and an int, so use an f-string or <code>str(total)</code>.</p>`
        }
      ],
      sources: ["beams", "tatham", "engprac", "missing"]
    },
    {
      id: "w7",
      title: "Design documents and proposals",
      minutes: 90,
      summary: "How engineers propose and decide on designs in writing: the parts of a design document, goals and non-goals, comparing alternatives, and writing a proposal a decision-maker can act on.",
      notes: `
<p>Before building something large, many software teams write a <strong>design document</strong> (or "design doc"): a description of the problem, the proposed solution, and the alternatives that were considered. Writing it forces the author to think the design through; reviewing it lets teammates catch problems while they are still cheap to fix. A design flaw found in a document costs an afternoon; the same flaw found after months of coding can cost months.</p>

<h3>The parts of a design document</h3>
<p>Companies use different templates, but most contain these sections. (Malte Ubl's widely shared description of design docs at Google follows nearly this outline.)</p>
<ol>
<li><strong>Context and scope.</strong> What exists now and what problem needs solving, briefly. Assume the reader is a competent engineer who doesn't know your corner of the system.</li>
<li><strong>Goals and non-goals.</strong> What the design must achieve, as checkable statements, and, just as important, what it deliberately won't do.</li>
<li><strong>The design.</strong> How it works: the main components and how they interact, data formats, interfaces, often a diagram. Enough detail that a reviewer could spot a flaw, not so much that it becomes the code.</li>
<li><strong>Alternatives considered.</strong> Other designs, and why this one was chosen over each.</li>
<li><strong>Cross-cutting concerns.</strong> Security, privacy, cost, how you'll know it works (testing, monitoring), and how it will be rolled out.</li>
<li><strong>Open questions.</strong> What you don't know yet and need input on.</li>
</ol>

<h3>Goals and non-goals</h3>
<p>Good goals are specific enough to check: "Search results appear within 200 ms for 95% of queries", not "search should be fast". <strong>Non-goals</strong> are things a reader might reasonably expect the design to do, which it deliberately doesn't: "Non-goal: searching inside PDF attachments." Non-goals prevent the most common design-review argument, in which reviewers criticize the design for not solving a problem it was never meant to solve. They also keep projects from growing without limit, a problem called <strong>scope creep</strong>.</p>

<h3>Alternatives and trade-offs</h3>
<p>The "alternatives considered" section is where a design document earns trust. A reader who sees only one option can't tell whether the author chose well or just chose the first idea. For each serious alternative, say what it would have offered and why it lost. A table often helps:</p>
<table>
<thead><tr><th></th><th>A: store in a single file</th><th>B: SQLite database</th><th>C: hosted database service</th></tr></thead>
<tbody>
<tr><td>Setup effort</td><td>none</td><td>low</td><td>account, network, credentials</td></tr>
<tr><td>Safe with two users writing at once</td><td>no</td><td>yes</td><td>yes</td></tr>
<tr><td>Works offline</td><td>yes</td><td>yes</td><td>no</td></tr>
<tr><td>Cost</td><td>free</td><td>free</td><td>about $15/month</td></tr>
</tbody>
</table>
<p>Then state the decision and its reason in a sentence: "We choose B: it is the only free option that is safe when two people save at once, and we need offline use." Every design is a <strong>trade-off</strong>: it gains something by giving something up. Name what yours gives up. A reviewer who sees that you know your design's weaknesses trusts its strengths more.</p>

<h3>Writing a proposal</h3>
<p>A design document often doubles as a <strong>proposal</strong>: a request for someone to approve time, money or a change. Its reader is a decision-maker who may not share your technical background. Use what earlier lessons taught:</p>
<ul>
<li><strong>The request first</strong> (Lesson 3): what you want approved, its cost, and its benefit, in the first paragraph.</li>
<li><strong>The problem in the reader's terms:</strong> not "the queries lack an index" but "customers wait 8 seconds for their order history, and 12% leave the page".</li>
<li><strong>Evidence</strong> (Lesson 8): measurements, not impressions.</li>
<li><strong>Risks and how you'll handle them,</strong> stated honestly. A proposal that claims no risks isn't believed.</li>
</ul>

<h3>Reviewing a design</h3>
<p>When you review a design document, look for missing goals, unchecked assumptions ("the file will always fit in memory"), cases the design doesn't handle, and alternatives the author didn't consider. Ask questions rather than issuing verdicts, as in code review. Reviewing designs is one of the most valuable things a senior engineer does, and it's a skill you can start practicing now on your classmates' documents.</p>
`,
      terms: [
        ["Design document", "A written description of a problem, a proposed solution and its alternatives, reviewed before building."],
        ["Non-goal", "Something a reader might expect the design to do, which it deliberately doesn't."],
        ["Scope creep", "A project's goals growing without limit as new wishes are added."],
        ["Trade-off", "A choice that gains one quality by giving up another."],
        ["Proposal", "A document asking a decision-maker to approve time, money or a change."]
      ],
      quiz: [
        { q: "Why do design documents include non-goals?", choices: ["To pad the document", "To prevent arguments about problems the design was never meant to solve, and limit scope creep", "Because templates require them", "To list bugs"], answer: 1, why: "They tell reviewers what the design deliberately leaves out." },
        { q: "Which is a checkable goal?", choices: ["Search should be fast", "Search should be better than before", "Search results appear within 200 ms for 95% of queries", "Users will love search"], answer: 2, why: "It can be measured and confirmed or refuted." },
        { q: "Why include alternatives considered?", choices: ["To show the reader the chosen design was compared, not just the first idea", "To make the document longer", "To let reviewers pick", "Because alternatives are always better"], answer: 0, why: "Comparison is what makes the choice trustworthy." },
        { q: "What should come first in a proposal to a manager?", choices: ["The history of the problem", "The request, its cost and its benefit", "A glossary", "The risks"], answer: 1, why: "The decision-maker needs to know what they're being asked to decide." }
      ],
      practice: [
        {
          q: `<p><strong>Goals and non-goals.</strong> You are designing a program that reminds students of assignment deadlines. Write three checkable goals and two non-goals.</p>`,
          a: `<p>Goals, for example: "Sends a reminder 24 hours and 2 hours before each deadline"; "A student can add a deadline in under 30 seconds"; "Works for at least 500 students on one server". Non-goals: "Doesn't import deadlines automatically from the university's systems (version 1)"; "Doesn't track whether assignments were submitted." Each goal can be tested; each non-goal is something a reader might otherwise expect.</p>`
        },
        {
          q: `<p><strong>Alternatives.</strong> For the reminder program, compare two ways of sending reminders (email, and a phone app's push notifications) on three dimensions in a table, then write a one-sentence decision.</p>`,
          a: `<p>For example: <em>Setup effort</em>: email low (a mail service), push high (building an app for two phone systems). <em>Reach</em>: email all students, push only those who install the app. <em>Noticed quickly</em>: email often not, push usually. Decision: "Use email for version 1, because every student has it and it needs no app; revisit push notifications if students report missing reminders." A strong answer chooses dimensions that matter to this decision.</p>`
        },
        {
          q: `<p><strong>Trade-offs.</strong> State what each choice gives up: (a) storing passwords only as salted hashes; (b) caching search results for 10 minutes; (c) writing the program in Python rather than C.</p>`,
          a: `<p>(a) Gains: a stolen database doesn't reveal passwords. Gives up: you can never show a user their password, only reset it, and checking a login costs extra computation. (b) Gains: speed and lower load. Gives up: results can be up to 10 minutes out of date. (c) Gains: faster development, fewer memory bugs. Gives up: running speed and fine control over memory.</p>`
        },
        {
          q: `<p><strong>Proposal opening.</strong> Write the first paragraph of a proposal to your department asking for $300 a year to host a course Q&amp;A website that you built. State the request, the cost and the benefit in terms the department cares about.</p>`,
          a: `<p>For example: "I request $300 a year to host the CS 101 question-and-answer site I built this term. In its four-week trial, 140 students posted 410 questions, and the median time to an answer fell from 19 hours (by email) to 2 hours, because classmates answered most questions. Hosting it on the department's account would keep it running after I graduate." (Numbers in a real proposal must be your real measurements.)</p>`
        }
      ],
      sources: ["designdocs", "googletw"]
    },
    {
      id: "w8",
      title: "Evidence, sources and citation",
      minutes: 90,
      summary: "Making claims a reader can trust: the kinds of evidence, finding and evaluating sources with lateral reading and SIFT, quoting and paraphrasing, citing in IEEE and APA styles, and avoiding plagiarism.",
      notes: `
<p>Technical writing makes claims: this design is faster, this library is safer, this bug affects 3% of users, this algorithm is used by most search engines. A reader can only trust a claim if they can see what supports it. This lesson is about supporting claims, and about telling good support from bad.</p>

<h3>Claims need evidence</h3>
<p>An argument has three parts: a <strong>claim</strong> (what you want the reader to accept), <strong>evidence</strong> (facts that support it), and <strong>reasoning</strong> (why the evidence supports the claim). Each can fail. "Python is slow" is a claim with no evidence. "Python took 4.1 seconds and C took 0.2 seconds on my sorting benchmark" is evidence. The reasoning connects them, and has limits: one benchmark on one machine supports "on this task, Python was about 20 times slower", not "Python is slow" in general.</p>
<p>In computer science, evidence includes measurements you make yourself (report how), results published by others (cite them), proofs, and documented behavior (official documentation, standards). Anecdote ("it worked when I tried it") is weak evidence; it may be a useful starting point but rarely settles anything.</p>

<h3>Kinds of sources</h3>
<ul>
<li><strong>Primary sources</strong> are original: the research paper that reports an experiment, the official documentation or standard, the data itself, the original announcement.</li>
<li><strong>Secondary sources</strong> discuss primary sources: a news article about a paper, a blog post explaining a standard, a textbook.</li>
<li><strong>Tertiary sources</strong> summarize secondary ones: encyclopedias, including Wikipedia.</li>
</ul>
<p>Secondary and tertiary sources are good places to start learning a topic, and their references lead you to the primary sources. For a specific claim, especially a number, go to the primary source when you can: summaries lose detail and sometimes get it wrong.</p>
<p>Research papers are often <strong>peer-reviewed</strong>: experts checked them before publication. That makes them more reliable, not infallible. In computer science, many papers first appear as <strong>preprints</strong> (for example on arXiv) before any review; cite them, but say they are preprints.</p>

<h3>Evaluating a source: read laterally</h3>
<p>Researchers at Stanford (Sam Wineburg and Sarah McGrew) compared how professional fact-checkers, historians and students judged unfamiliar websites. The fact-checkers were much faster and more accurate. The difference: instead of reading the site itself closely, they left it almost immediately and searched for what <em>other</em> sources said about it. This is <strong>lateral reading</strong>. A site's own "About" page tells you what it wants you to think; other sources tell you what it is.</p>
<p>Mike Caulfield's <strong>SIFT</strong> method turns this into four moves:</p>
<ol>
<li><strong>Stop.</strong> Before you use or share something, ask whether you know the source and whether it is what you need.</li>
<li><strong>Investigate the source.</strong> Spend a minute finding out who is behind it and what their expertise and interests are.</li>
<li><strong>Find better coverage.</strong> Look for other, trusted sources reporting the same claim.</li>
<li><strong>Trace claims to the original context.</strong> Follow quotes, numbers and images back to where they first appeared, and check they weren't distorted.</li>
</ol>
<p>Ask too who benefits. A company's benchmark showing its own product is fastest may be accurate, but it chose the benchmark. Look for independent measurements.</p>

<h3>Quoting, paraphrasing and summarizing</h3>
<p>You can use a source's ideas in three ways. A <strong>quotation</strong> copies the exact words, in quotation marks, with a citation; use it when the wording itself matters (a definition, a famous phrase, a claim you're about to dispute). A <strong>paraphrase</strong> restates a specific passage in your own words and structure, with a citation. A <strong>summary</strong> condenses a longer work's main points, with a citation. Most technical writing paraphrases and summarizes; long quotations suggest you haven't digested the source.</p>
<p>A paraphrase must really be yours. Swapping a few words for synonyms while keeping the original's sentence structure is still copying.</p>

<h3>Citation styles</h3>
<p>A <strong>citation</strong> tells the reader exactly where a fact came from, so they can check it. Different fields use different styles. Two you'll meet most in computer science:</p>
<p><strong>IEEE</strong> (common in engineering and computer science) numbers sources in the order they are first cited, and puts the number in square brackets in the text: "Readers expect new information at the end of a sentence [1]." The reference list is in number order:</p>
<pre data-label="IEEE"><code>[1] G. D. Gopen and J. A. Swan, "The science of scientific writing," American
    Scientist, vol. 78, no. 6, pp. 550-558, 1990.</code></pre>
<p><strong>APA</strong> (common in psychology and the social sciences, and in human-computer interaction) puts the author and year in the text: "(Gopen &amp; Swan, 1990)". The reference list is alphabetical:</p>
<pre data-label="APA"><code>Gopen, G. D., &amp; Swan, J. A. (1990). The science of scientific writing.
    American Scientist, 78(6), 550-558.</code></pre>
<p>Which style you use matters less than using one consistently and completely. Your instructor or publisher will say which. For web pages, include the author or organization, title, site, date, URL and the date you accessed it, since pages change. Reference managers such as Zotero (free) store sources and format citations for you.</p>

<h3>Plagiarism, code and AI tools</h3>
<p><strong>Plagiarism</strong> is presenting someone else's words, ideas, code or images as your own. It includes copying without quotation marks, paraphrasing without citation, and reusing your own earlier work without saying so. It is serious in a university and in a career, and it's easy to avoid: when in doubt, cite.</p>
<p>The same principle applies to code. If you copy code from a website or another project, keep any license it came with and say where it came from in a comment.</p>
<p>For AI tools, follow your course's policy, and say how you used them. Never cite a source an AI tool gave you without finding and reading it yourself: these tools can produce references that look real but don't exist. Check every fact they give you against a source you can cite.</p>
`,
      terms: [
        ["Claim, evidence, reasoning", "The parts of an argument: what you assert, the facts that support it, and why those facts support it."],
        ["Primary source", "An original source: the research paper, the data, the official documentation or standard."],
        ["Peer review", "Checking of a research paper by other experts before publication."],
        ["Lateral reading", "Judging a source by leaving it and searching for what other sources say about it."],
        ["SIFT", "Stop, Investigate the source, Find better coverage, Trace claims to the original context."],
        ["Paraphrase", "A restatement of a specific passage in your own words and structure, with a citation."],
        ["Plagiarism", "Presenting someone else's words, ideas, code or images as your own."]
      ],
      quiz: [
        { q: "\"Python took 4.1 s and C took 0.2 s on my sorting benchmark.\" What does this evidence support best?", choices: ["Python is slow", "On this task, on this machine, Python was about 20 times slower", "C is always 20 times faster", "Nothing"], answer: 1, why: "Evidence supports a claim only as broad as the evidence: one benchmark, one machine." },
        { q: "What did professional fact-checkers do that students didn't?", choices: ["Read the site's About page carefully", "Left the site quickly to see what other sources said about it", "Checked the site's design", "Counted the references"], answer: 1, why: "This is lateral reading." },
        { q: "In IEEE style, how is a source cited in the text?", choices: ["(Author, year)", "A number in square brackets, like [1]", "A footnote with the full reference", "The URL in parentheses"], answer: 1, why: "IEEE numbers sources in order of first citation." },
        { q: "An AI tool gives you a journal article that supports your claim. What should you do?", choices: ["Cite it", "Find and read the article yourself before citing it", "Cite the AI tool instead", "Paraphrase it"], answer: 1, why: "AI tools can produce references that don't exist or don't say what is claimed." },
        { q: "Which is plagiarism?", choices: ["Quoting with quotation marks and a citation", "Paraphrasing in your own words with a citation", "Replacing a few words of a passage with synonyms and not citing it", "Citing a source you disagree with"], answer: 2, why: "Changed words with the original's structure and no citation is still copying." }
      ],
      practice: [
        {
          q: `<p><strong>Claims and evidence.</strong> For each claim, say what evidence would support it and what the claim's limits are: (a) "Our new caching layer makes the site faster." (b) "Most programmers prefer dark mode."</p>`,
          a: `<p>(a) Measurements of page-load times before and after, on the same pages and conditions, ideally from real users over days, reported as medians and high percentiles. Limit: it may help some pages and not others, so say which. (b) A survey of a stated, broad population with its sample size and how people were chosen. Limit: a poll of one website's readers supports a claim about those readers, not "most programmers".</p>`
        },
        {
          q: `<p><strong>SIFT.</strong> A post on social media says "A study found that 70% of code written by AI tools contains security bugs." Describe what you would do at each SIFT step before using this number.</p>`,
          a: `<p><em>Stop:</em> notice that it's a striking number with no link. <em>Investigate:</em> who posted it, and do they sell something related? <em>Find better coverage:</em> search for the study; do reputable outlets or researchers mention it, and with the same number? <em>Trace:</em> find the original paper and read what it measured: which tools, which tasks, what counts as a "security bug", which year. Often the original says something narrower, such as "70% of programs generated for these 20 security-related tasks".</p>`
        },
        {
          q: `<p><strong>Paraphrase.</strong> Paraphrase this sentence, then cite it in IEEE style as source [3]: "Readers have fixed expectations about where in the structure of prose they will encounter particular items of its substance." (Gopen and Swan, 1990)</p>`,
          a: `<p>For example: "Readers expect particular kinds of information to appear in particular places in a sentence, and they read more easily when the writer meets those expectations [3]." The paraphrase changes both the words and the structure, and keeps the citation.</p>`
        },
        {
          q: `<p><strong>Citations.</strong> Format this source in both IEEE and APA style: the article "How to Report Bugs Effectively" by Simon Tatham, published on his website in 1999, at https://www.chiark.greenend.org.uk/~sgtatham/bugs.html, which you accessed on 10 October 2026.</p>`,
          a: `<p>IEEE: <code>[1] S. Tatham, "How to report bugs effectively," 1999. [Online]. Available: https://www.chiark.greenend.org.uk/~sgtatham/bugs.html (accessed Oct. 10, 2026).</code></p><p>APA: <code>Tatham, S. (1999). How to report bugs effectively. https://www.chiark.greenend.org.uk/~sgtatham/bugs.html</code> (APA 7 adds a retrieval date only for pages designed to change over time.) Small differences between guides are normal; consistency and completeness matter most.</p>`
        },
        {
          q: `<p><strong>Primary sources.</strong> A news article says "Python is the most popular programming language, according to a new survey." Find (or describe how you would find) the survey itself. What exactly did it measure, and does that match "most popular"?</p>`,
          a: `<p>Follow the article's link or search for the survey by name. Surveys measure different things: languages developers use at work, languages people search for, languages in job ads, or languages in public code. "Most popular" might mean "most searched-for tutorials" or "used by the most survey respondents", and each survey has its own sample. A strong answer names the survey, quotes what it measured, and states the claim it actually supports.</p>`
        }
      ],
      sources: ["sift", "purdueowl", "ieeeref", "gopen90"]
    },
    {
      id: "w9",
      title: "Revising, feedback and AI tools",
      minutes: 90,
      summary: "Revising in passes from structure to sentences, giving and using peer feedback, editing your own work, and using AI writing tools responsibly.",
      notes: `
<p>Good writing is mostly rewriting. Few writers' first drafts are good; their final drafts are good because they revised them. This lesson is about how to revise efficiently, how to get and give useful feedback, and how AI tools fit in.</p>

<h3>Revise in passes, big to small</h3>
<p>Trying to fix everything in one reading means fixing nothing well. Instead, read the draft several times, each time looking for one level of problem, starting with the biggest. Fixing a comma in a paragraph you later delete is wasted effort.</p>
<ol>
<li><strong>Purpose and reader.</strong> Does the draft do what it's for, for the reader it's for (Lesson 1)? Is anything they need missing? Is anything there they don't need?</li>
<li><strong>Structure.</strong> Is the main point first? Make a reverse outline (Lesson 3). Do sections and paragraphs follow a logic? Does each paragraph have a point?</li>
<li><strong>Paragraphs and sentences.</strong> Topic sentences, transitions, actors and actions, needless words, precise terms (Lesson 2).</li>
<li><strong>Proofreading.</strong> Spelling, punctuation, consistent formatting, correct names and numbers, working links, code that runs.</li>
</ol>
<p>Two habits make every pass work better. <strong>Let the draft rest</strong>: even a few hours away lets you read what you wrote rather than what you meant. And <strong>read it aloud</strong>, or have your computer read it to you: your ear catches clumsy sentences, missing words and repetition that your eye skips.</p>

<h3>Giving feedback</h3>
<p>When a classmate asks for feedback, they want to know how the draft works on a reader. You are that reader. Useful feedback:</p>
<ul>
<li><strong>Starts with what you understood.</strong> Summarize the main point in a sentence. If your summary isn't what the writer meant, that's the most valuable feedback you can give.</li>
<li><strong>Focuses on the big things first,</strong> in the same order as revision: purpose, structure, then sentences. A draft with a structural problem doesn't need comma corrections yet.</li>
<li><strong>Is specific.</strong> "Confusing" doesn't help. "In paragraph 3, I couldn't tell whether 'it' meant the cache or the database" does.</li>
<li><strong>Describes your experience rather than issuing rules.</strong> "I got lost here" is something only you can report; the writer decides how to fix it.</li>
<li><strong>Says what works,</strong> specifically, so the writer keeps it.</li>
</ul>
<p>Comment on the writing, never the writer.</p>

<h3>Using feedback</h3>
<p>Receiving criticism of your writing is uncomfortable for everyone. Some habits make it productive:</p>
<ul>
<li><strong>Listen first; don't argue.</strong> If a reader was confused, they were confused. Explaining what you meant fixes their copy, not your draft.</li>
<li><strong>Look for patterns.</strong> If two readers stumble in the same place, there's a problem there, even if their suggested fixes differ.</li>
<li><strong>You decide.</strong> Feedback is information, not orders. Take what helps your reader; it's fine to reject a suggestion, ideally knowing why.</li>
</ul>

<h3>AI writing tools</h3>
<p>AI tools based on large language models can now draft, rewrite, summarize and critique text. Used carefully, they can help you write better; used carelessly, they produce fluent text that is vague, generic or wrong, and they can stop you from learning to write.</p>
<p>Uses that tend to help:</p>
<ul>
<li><strong>Feedback on your draft:</strong> "Which parts of this would a first-year student find confusing?" or "What questions would a skeptical reader ask?" Treat the answers like a classmate's feedback: information for you to judge.</li>
<li><strong>Checking grammar and spelling,</strong> as a spell checker does.</li>
<li><strong>Brainstorming</strong> examples or counterarguments, which you then check and choose among.</li>
</ul>
<p>Uses to avoid or handle with care:</p>
<ul>
<li><strong>Letting it write for you.</strong> In this course, the ideas, structure and sentences must be your own (see the course policies). Outside it, AI-drafted text still needs a human who understands and stands behind every claim.</li>
<li><strong>Trusting its facts or sources.</strong> Language models generate plausible text, which is not the same as true text. Check every fact against a source you can cite, and never cite a reference you haven't found and read (Lesson 8).</li>
<li><strong>Accepting its style by default.</strong> AI tools often produce padded, generic prose: exactly the needless words Lesson 2 cuts. Revise its suggestions as hard as your own drafts.</li>
</ul>
<p>Whatever you use, say how you used it, as the course policy requires.</p>

<h3>Editing checklist</h3>
<p>For the final pass, a short checklist catches the errors that remain:</p>
<ul>
<li>Does every number have a unit, and does every number match its source?</li>
<li>Is every term used consistently, and defined on first use?</li>
<li>Does every code sample run, and is its output shown correctly?</li>
<li>Does every figure have a caption that states its point and a mention in the text?</li>
<li>Does every claim that needs a citation have one, in a consistent style?</li>
<li>Do all links work?</li>
</ul>
`,
      terms: [
        ["Revision", "Rewriting a draft to improve its purpose, structure and sentences, as opposed to only proofreading."],
        ["Proofreading", "The final check for errors in spelling, punctuation, formatting, names, numbers and links."],
        ["Peer feedback", "A classmate's report of how a draft works on them as a reader."]
      ],
      quiz: [
        { q: "In which order should you revise?", choices: ["Spelling, sentences, structure, purpose", "Purpose, structure, sentences, proofreading", "Sentences only", "Any order"], answer: 1, why: "Big changes first, so you don't polish text you later cut." },
        { q: "Which feedback is most useful?", choices: ["\"Good job!\"", "\"This is confusing.\"", "\"In paragraph 3, I couldn't tell whether 'it' meant the cache or the database.\"", "\"Rewrite the whole thing.\""], answer: 2, why: "It is specific and reports the reader's experience." },
        { q: "Two readers stumble in the same paragraph but suggest different fixes. What should you conclude?", choices: ["They are both wrong", "There is a real problem in that paragraph", "Pick the shorter fix", "Ignore it"], answer: 1, why: "A shared stumble is strong evidence of a problem, whatever the fix." },
        { q: "Which is a risky use of an AI writing tool?", choices: ["Asking which parts of your draft are confusing", "Checking spelling", "Citing a reference it suggests without reading it", "Brainstorming counterarguments to check"], answer: 2, why: "AI tools can invent references or misstate what a source says." }
      ],
      practice: [
        {
          q: `<p><strong>Passes.</strong> Take a draft you wrote this term. Do the four revision passes in order, and for each pass write down one change you made and why.</p>`,
          a: `<p>A strong answer shows changes at every level: for example, (1) cut a paragraph of background the reader didn't need; (2) moved the conclusion from the end to the first paragraph; (3) changed "The utilization of caching resulted in improvements" to "Caching cut load time by half"; (4) fixed an inconsistent unit (ms vs s) and a broken link.</p>`
        },
        {
          q: `<p><strong>Give feedback.</strong> Write feedback on this paragraph from a classmate's explainer for a general reader: "Encryption uses algorithms like AES-256 in GCM mode to ensure confidentiality and integrity of data at rest and in transit, leveraging symmetric keys that are exchanged using asymmetric cryptography such as ECDH."</p>`,
          a: `<p>For example: "My summary: encryption protects data, using some specific methods. I'm not sure that's what you meant, because almost every term was new to me: AES-256, GCM, at rest, in transit, symmetric, asymmetric, ECDH. For a general reader, could you start with what encryption does in everyday terms (scrambling data so only someone with a key can read it), with an example? Then you could introduce only the one or two terms the rest of your explainer needs. The idea that one kind of key is used to share another is interesting; I'd love that explained with an example."</p>`
        },
        {
          q: `<p><strong>Read aloud.</strong> Read this sentence aloud, find where you stumble, and rewrite it: "The fact that the results of the tests that were run on the system that was deployed last week indicate that the performance of the system is not adequate is concerning."</p>`,
          a: `<p>"Last week's tests show that the new system is too slow, which concerns me." The original has the subject ("The fact") separated from its verb ("is") by 30 words, so the reader must hold it all in mind. (Better still, replace "too slow" with the numbers.)</p>`
        },
        {
          q: `<p><strong>AI feedback.</strong> Ask an AI tool for feedback (not a rewrite) on a paragraph you wrote, with a prompt like "Which parts of this would confuse a first-year student? Don't rewrite it." Evaluate its feedback: which points were useful, which were wrong or generic, and what did you change?</p>`,
          a: `<p>A strong answer treats the tool as one reader among many: it accepts specific, accurate points ("'idempotent' isn't defined"), rejects generic ones ("consider adding more detail") or wrong ones, and explains each decision. It also states, per the course policy, exactly how the tool was used.</p>`
        }
      ],
      sources: ["googletw", "writethedocs"]
    }
]);

CSA.addAsides("writ100", {
  w2: [
    { kind: "history", title: "Orwell's six rules", html: `<p>In his 1946 essay "Politics and the English Language", George Orwell argued that vague, inflated language makes it easy to hide what you mean, and even to stop thinking. He ended with six rules: never use a figure of speech you are used to seeing in print; never use a long word where a short one will do; if it is possible to cut a word out, always cut it out; never use the passive where you can use the active; never use a foreign phrase, a scientific word or a jargon word if you can think of an everyday English equivalent; and break any of these rules sooner than say anything outright barbarous. The last rule is the important one: the others are habits in service of clarity, not laws.</p>`, sources: ["orwell46"] },
    { kind: "history", title: "Plain language in law", html: `<p>Governments have long been criticized for writing that citizens can't understand. The U.S. Plain Writing Act of 2010 requires U.S. federal agencies to use plain writing in documents the public uses, and the government's plain language guidelines teach many of this lesson's habits: active voice, short sentences, common words, and addressing the reader as "you".</p>`, sources: ["plainlang"] }
  ],
  w3: [
    { kind: "ethics", title: "A buried point on a slide", html: `<p>During the Space Shuttle Columbia's last flight in 2003, engineers analyzed whether foam that had struck the wing at launch could have caused damage. One slide summarizing the analysis had the reassuring title "Review of Test Data Indicates Conservatism for Tile Penetration". The crucial fact, that the test data came from foam pieces hundreds of times smaller than the one that hit Columbia, was in a low-level bullet near the bottom. The shuttle broke up on re-entry, killing all seven astronauts. The accident board's report criticized the habit of making decisions from bullet-point slides, which can bury the point a reader most needs. Structure is not just style.</p>`, sources: ["caib"] }
  ],
  w5: [
    { kind: "history", title: "Literate programming", html: `<p>In 1984 Donald Knuth proposed <em>literate programming</em>: writing a program as an essay for human readers, with the code in pieces inside the explanation, in whatever order makes the ideas clearest. A tool then extracts the code in the order the computer needs. Knuth wrote his typesetting system TeX this way. Few programmers write whole programs like that today, but the idea lives on in docstrings that are tested as code, and in notebooks such as Jupyter, which mix explanation, code and results.</p>`, sources: ["knuth84"] }
  ],
  w7: [
    { kind: "history", title: "Requests for Comments", html: `<p>In 1969, the graduate students building the first ARPANET protocols wrote their design ideas as numbered memos and called them "Requests for Comments", to make clear that they were proposals open to discussion, not decrees. Steve Crocker wrote RFC 1. The series continues today: the standards for the Internet's core protocols, from email to HTTP, are published as RFCs. Python uses the same idea for language changes: a Python Enhancement Proposal (PEP) is a design document that the community reviews before a change is accepted.</p>` }
  ],
  w8: [
    { kind: "ethics", title: "Citations that didn't exist", html: `<p>In 2023, lawyers in a New York federal case (Mata v. Avianca) filed a brief citing several earlier court decisions that turned out not to exist: an AI chatbot had invented them, complete with plausible names and quotations. The lawyers hadn't checked. The judge fined them and their firm $5,000. The lesson applies to every field: a citation is a promise that the source exists and says what you claim.</p>` }
  ]
});
