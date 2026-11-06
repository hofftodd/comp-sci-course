# Working on First Principles CS

See README.md for what this is and ARCHITECTURE.md for how it works.

## Content review for every new term (required)

Whenever a term's content is written (or a term is substantially rewritten), run a student/professor review at least once before calling the term done:

1. **Student review, by a student agent with no context.** Don't write the review yourself: whoever wrote or revised the content knows too much to see its gaps. Start a fresh subagent (not a fork) with the student prompt below, and change nothing in it except the bracketed parts. Its prompt must not explain the content, hint at known problems, or say who wrote it. Save its list unedited as `docs/reviews/y<year>-<term>-student-review.md`. You may delete an item only if it's factually wrong about the content (say so in the commit message).
2. **Professor revision.** Hand that list to a separate professor agent (a subagent) that revises the content to resolve every item, verifies every number and code output by running it, and appends a "Professor's response" section answering each item.
3. **Verify and ship.** Run the checks below, spot-check the changed lessons in a browser, then publish the artifact and commit.

Reviews done so far: `docs/reviews/`. (The Year 1 Fall and Spring student reviews were written by the session that wrote the content, before this rule existed.)

### Student agent prompt

> You are a first-year university student taking [term, e.g. Year 1 Spring] of a computer science degree. Before this term you completed: [earlier courses by code and title, or "nothing: you have high-school algebra and trigonometry and have never programmed"]. You know only what those courses taught.
>
> Your courses this term are in the repository at [absolute repository path]. For each course id in [course ids], get its text by running `node scripts/dump_course.js . <id> > /tmp/<id>.txt` from the repository root, and read the whole file. It contains each lesson's notes and sidebars, each quiz question with its intended answer, and each practice problem without its solution. Programming-problem prompts are marked CODE. Read only these files: don't open other files in the repository or search the web.
>
> Read slowly, as a student working through each lesson in order, and try every quiz and practice problem in your head. List every place where you:
> - meet a term, symbol, notation, function or tool that hasn't been explained yet, in this course or an earlier one;
> - can't follow a step (a skipped calculation, "clearly", "this yields", an unexplained formula);
> - find something that seems wrong or contradicts something else (quote both);
> - are told to use something that doesn't exist or hasn't been shown;
> - couldn't answer a quiz question or start a practice problem from the lesson alone. Mark these "(blocking)".
>
> For each item, quote the exact phrase that confused you and say in one or two sentences what you didn't understand. Don't suggest fixes and don't praise anything. Report only real confusion. Don't pad the list, and don't leave things out to keep it short.
>
> Return a Markdown document titled "Student review: [term]", with one short paragraph about your background, then a numbered list grouped by course (### heading per course) and lesson (#### heading with the lesson id and title). Number items continuously across the whole document. End with an "Across courses" section for problems that span courses.

## Checks

From the repository root:

```bash
node scripts/validate_content.js .
```

```bash
node scripts/export_problems.js > /tmp/problems.json && python3 scripts/check_problems.py /tmp/problems.json
```

Also run `node --check` on each edited data file.
