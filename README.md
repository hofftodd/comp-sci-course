# First Principles CS

An interactive learning platform for a complete four-year computer science degree, modeled on
what the strongest undergraduate programs teach. Students read lessons, check their understanding
with quizzes, and ask an AI professor questions in plain language. The lessons improve over time:
the platform notices where students struggle, drafts clearer explanations or questions, and an
instructor approves each change before students see it.

**Status:** Year 1 (Fall and Spring) is written, including the WRIT 100 elective. Year 2 Fall is written and has had five rounds of student review; Year 2 Spring is written and has had four. Year 3 Fall is written and has had four rounds of student review. The other three terms are planned and shown on the home page.

## What's in Year 1

### Fall

| Course | Credits | Core units | Optional lessons |
|---|---|---|---|
| CS 101 Programming I (Python) | 4 | 14 | How programming languages evolved · When software fails people · How Python actually runs your code |
| MATH 120 Discrete Mathematics I | 4 | 6 | From Boole to Shannon · Proof assistants and verified software |
| MATH 130 Calculus I | 4 | 11 | Calculus inside machine learning · Two thousand years of calculus |
| CS 100 Computing in Society | 2 | 6 | The hidden history of computing · Risk scores and the math of fairness |
| WRIT 100 Writing for Technical Audiences (elective) | 3 | 9 | |

### Spring

| Course | Credits | Core units | Optional lessons |
|---|---|---|---|
| CS 102 Programming II (Python) | 4 | 8 | The rise of object-oriented programming · Open source: licenses, communities and responsibility |
| MATH 121 Discrete Mathematics II | 4 | 7 | Codes and code-breakers · Encryption, privacy and the "crypto wars" |
| MATH 131 Calculus II and Multivariable Calculus | 4 | 9 | Automatic differentiation · Newton, Leibniz and the infinite |
| PHYS 150 Physics I: Mechanics with Computation (elective) | 4 | 6 | Chaos: the limits of prediction · From Galileo to Newton |

## What's in Year 2

### Fall

| Course | Credits | Core units | Programming problems |
|---|---|---|---|
| CS 201 Data Structures | 4 | 8 | 16 |
| CS 210 Computer Systems I (C, with Python simulations) | 4 | 8 | 16 |
| MATH 220 Linear Algebra | 4 | 8 | 11 |
| MATH 230 Probability and Statistics for Computer Science | 4 | 8 | 10 |

Year 2 Fall is still taught with Python for every auto-graded problem. CS 201 shows Java and C++
versions of key structures for comparison, and CS 210 teaches C, whose examples were compiled and run
with GCC; its graded problems simulate the same ideas (bits, floats, memory, a small CPU, caches) in Python.

### Spring

| Course | Credits | Core units | Programming problems |
|---|---|---|---|
| CS 220 Algorithms I | 4 | 8 | 16 |
| CS 230 Computer Architecture and Digital Logic | 4 | 8 | 14 |
| CS 240 Software Engineering I | 4 | 8 | 17 |
| PHYS 250 Physics II: Electricity and Magnetism with Computation (elective) | 4 | 6 | 12 |

Year 2 Spring also uses Python for every graded problem. CS 230 shows RISC-V assembly (its encodings were
checked with an assembler) and simulates gates, adders, state machines and a processor in Python. CS 240's
problems exercise each practice directly: tests that kill mutants, a three-way merge, a REST handler, a
linter built on Python's `ast` module, and retries with backoff.

## What's in Year 3

### Fall

| Course | Credits | Core units | Programming problems |
|---|---|---|---|
| CS 310 Operating Systems | 4 | 8 | 16 |
| CS 320 Theory of Computation | 4 | 8 | 16 |
| CS 340 Databases | 4 | 8 | 16 |
| CS 350 Computer Graphics (elective) | 4 | 6 | 12 |

Year 3 Fall still grades every problem in Python. CS 310 shows C system calls and threads (compiled
and run with GCC); because the browser's Python can't start threads, its graded concurrency problems
run simulated threads, Python generators under a seeded scheduler that Lesson 3 explains. CS 340 runs
real SQL in the browser with Python's `sqlite3`, which the page loads on first use. CS 350 builds a
software renderer and a small ray tracer from pixels up.

Every course opens with a **rubric**: what is graded and how much it counts, the criteria with four
performance levels, the grade scale, and policies. Each core lesson is designed for about 90 minutes:
notes with worked examples and diagrams, key terms, 5–8 **practice problems** with optional hints and
worked solutions (discussion questions and a writing assignment in the seminar), a quiz with
explanations, and a list of sources. Many lessons
also have **sidebars** on history, ethics, the evolution of programming languages, and how the
idea is used in practice. Year 1 is taught in Python.

## Features

- **Lessons and quizzes**: per-lesson progress, "mark complete", and best quiz scores, saved in
  the student's browser.
- **Auto-graded programming problems**: 226 in all. CS 101 has 31, two or three per lesson; CS 102
  has 17 (classes, generators, writing tests that catch bugs, linked lists, trees); PHYS 150 has a
  simulation problem per lesson; Year 2 Fall has 53 (data structures, systems simulations, linear
  algebra and statistics); Year 2 Spring has 59 (algorithms, hardware simulations, software
  engineering practice and electromagnetism simulations); Year 3 Fall has 60 (operating-system
  simulations, automata and parsers, SQL and database internals, and a software renderer). Each comes with
  starter code, a hint, a reference solution and automatic tests: edge cases, hidden tests, speed
  tests that catch slow algorithms, and checks such as "don't use the built-in `max`". Students
  write real Python in the page; it runs in their browser with Pyodide (CPython compiled to
  WebAssembly), in a background worker that stops infinite loops. A "Run on my computer" button
  exports a self-contained check script for when the browser can't run Python.
- **Ask the professor**: an office-hours chat on every page. It sees the current lesson, sidebars
  and quiz, explains ideas another way, gives examples, and quizzes students one question at a
  time. It gives hints rather than quiz answers until the student has submitted the quiz.
- **Lessons that improve**: the platform records, without names, the questions students ask, how
  they rate each lesson's clarity, and their first-try quiz answers. The **Instructor view** ranks
  lessons by need, and an AI model drafts added clarifications and clearer quiz questions from that
  evidence. Nothing reaches students until an instructor approves it, and every change can be removed.
- **Choice of AI model** (self-hosted): Anthropic, Google, OpenAI, or a local model through Ollama,
  LM Studio or any OpenAI-compatible server.
- **Attribution**: all lesson text is original. A Sources page lists every reference, its license
  where the source states one, and whether it is openly licensed, public domain, free to read, or
  usually reached through a library.

## Running it

There are three ways to use the platform. They share the same code.

### 1. Read it locally (no AI features)

Open `index.html` in a browser. Lessons, quizzes and progress work. The professor and the
instructor view stay hidden, because there is no AI model or shared storage. Programming problems
need the page to be served over HTTP, because browsers don't start workers from local files: run
`bash scripts/get-pyodide.sh` once, then `python3 -m http.server` in the repository and open
http://localhost:8000. Without that, use each problem's "Run on my computer" button.

### 2. On claude.ai

The page can be published as a claude.ai artifact. There, the professor uses Claude on each
viewer's own Claude account, and student activity and approved revisions are stored in the
artifact's database. Give students **Contributor** access so their activity is recorded;
instructors need **Editor** access to open the Instructor view. Only Claude is available there,
because claude.ai pages cannot contact other servers.

### 3. Self-hosted, with any model provider

The bundled server needs Node.js 18 or newer and has no dependencies. It serves the site, keeps
API keys on the server, and stores student activity and revisions as JSON files.

The programming problems need the Python runtime, which isn't stored in git (about 14 MB):

```bash
bash scripts/get-pyodide.sh
```

```bash
cp server/config.example.json server/config.json
```

Edit `server/config.json` to choose providers and models, then set the keys for the providers
you want. Any provider whose key is set is offered to students.

```bash
export ANTHROPIC_API_KEY=...
export OPENAI_API_KEY=...
export GEMINI_API_KEY=...
export INSTRUCTOR_KEY=choose-a-long-random-secret
```

```bash
node server/server.mjs
```

Then open http://127.0.0.1:8080. The Instructor view asks for `INSTRUCTOR_KEY`.

**Configuration notes**

- **Local models:** set `"enabled": true` on the Ollama or LM Studio entry and list models you
  have installed. Any OpenAI-compatible server works with `"type": "openai"` and a `baseUrl`.
- **Model ids** change often. The OpenAI and Google entries in the example config are examples;
  check each provider's current model list.
- **Limits:** `rateLimit` caps questions per student IP address (instructors are exempt), and
  `maxOutputTokens` caps answer length.
- **Deploying:** the server listens on `127.0.0.1`. Put it behind HTTPS (for example Caddy or
  nginx), and set `"host": "0.0.0.0"` and `"trustProxy": true` when a reverse proxy forwards requests.
- **Data:** `server/data/signals.json` and `server/data/revisions.json`. Back them up. Both are
  excluded from git.

## Adding and editing content

Course content lives in `data/`, one file per course, written as plain JavaScript objects with HTML
notes. No build step is needed: edit a file and reload the page. See
[ARCHITECTURE.md](ARCHITECTURE.md) for the content format, including sidebars, optional lessons,
quizzes, multi-language code examples and per-term languages.

## Privacy

Student questions, clarity ratings and first-try quiz answers are linked to an anonymous ID, never a
name. On claude.ai only page editors can read them; on the self-hosted server only someone with the
instructor key can. The professor panel tells students their questions are shared with instructors.
If you run this for a school, check your obligations for student records (in the U.S., FERPA)
before collecting this data.

## AI accuracy

The professor and the drafting tool use AI models, which can be wrong. The lesson notes were
written with care, but they have not yet been reviewed by subject experts. Review the content before
relying on it for teaching.

## License

[MIT](LICENSE), covering the code and the lesson content in this repository. The works listed on
the Sources page are not part of this repository and keep their own licenses.
