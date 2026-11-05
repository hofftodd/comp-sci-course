# First Principles CS

An interactive learning site for a four-year computer science curriculum. Year 1 Fall is written.

## Layout
- `index.html`: the app (routing, rendering, quizzes, progress, language switcher).
- `data/program.js`: the four-year plan, the source registry (`sources`), and helpers.
- `data/<course>.js`: one file per course, registered with `CSA.addCourse({...})`.
- `CSA.addAsides(courseId, { unitId: [...] })`: sidebars inside units. Kinds: `history`, `ethics`, `lang`, `practice`.
- `CSA.addOptional(courseId, [...])`: optional lessons. Kinds: `history`, `ethics`, `deep`.

## Course languages
Year 1 (both terms) is taught in Python only: `languages: ["python"]` on the term in
`data/program.js`. A term or a course can list several languages (`"python"`, `"java"`, `"cpp"`);
then the language switcher appears and the multi-language content below is shown.

## Multi-language code
Wrap variants in `<div class="multi">` with one `<pre data-lang="python|java|cpp">` each.
Any element with `data-only="java cpp"` shows only when one of the listed languages is active
(used for whole explanation blocks as well as short notes). Sidebars take `only: "python"`, and quiz
questions take `langs: { java: {...}, cpp: {...} }` to override their text per language.
Lesson 1 of Programming I already has full Java and C++ versions, hidden while Year 1 is Python-only.
A plain `<pre>` is labeled "Python".

## Attribution
All lesson text is original. Each lesson lists `sources` (ids in `data/program.js`).
Licenses are recorded only where the source states one on its own site.

## Live features (app/live.js)
- **Ask the professor**: a chat drawer that calls Claude via the artifact `sample` capability, grounded in the current lesson, quiz and chosen language. Runs on each viewer's own Claude account.
- **Learning signals**: each student's questions (last 8 per lesson), clarity rating and first-try quiz picks are stored in `signals/<user id>` (db). Only instructors (Editors) can read them; names are never shown.
- **Revisions**: approved clarifications and quiz rewrites live in `revisions/<course>-<lesson>`; the page merges them into lessons. Only Editors can write them.
- **Instructor view** (`#teach`): lesson health, and "Draft improvements with Claude", which proposes changes that an instructor approves one at a time.
- To fold approved revisions into the source files permanently, ask Claude Code to read the `revisions` collection and edit `data/*.js`.

## Self-hosting with a choice of model providers (server/)
The claude.ai page can only reach Claude. To offer Anthropic, Google, OpenAI or local models,
run the bundled server (Node.js 18+, no dependencies). It serves the same site, keeps API keys
on the server, and stores student signals and approved revisions in `server/data/`.

```bash
cp server/config.example.json server/config.json   # pick providers and models
export ANTHROPIC_API_KEY=...   # any provider whose key is set is offered
export OPENAI_API_KEY=...
export GEMINI_API_KEY=...
export INSTRUCTOR_KEY=a-long-random-secret   # enables the Instructor view
node server/server.mjs                        # http://127.0.0.1:8080
```

- **Local models:** set `"enabled": true` on the Ollama or LM Studio entry and list the models you
  have pulled. Any OpenAI-compatible server works (`"type": "openai"` plus `baseUrl`).
- **Choosing models:** students pick from the models you list; the default is `default` in the config.
  Model ids change often, so check each provider's current list.
- **Limits:** `rateLimit` caps questions per student IP (instructors are exempt). `maxOutputTokens` caps answer length.
- **Deploying:** the server listens on 127.0.0.1. Put it behind HTTPS (Caddy, nginx) and set
  `"host": "0.0.0.0"` and `"trustProxy": true` when a reverse proxy forwards requests.
- **Data:** `server/data/signals.json` (anonymous per-browser ids) and `server/data/revisions.json`. Back them up.
