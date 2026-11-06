# Working on First Principles CS

See README.md for what this is and ARCHITECTURE.md for how it works.

## Content review for every new term (required)

Whenever a term's content is written (or a term is substantially rewritten), run a student/professor review at least once before calling the term done:

1. **Student review.** Read every new lesson, sidebar, optional lesson, quiz and practice problem as a first-year student who has completed only the earlier terms. Write a numbered list of everything that is unclear, undefined, skipped, contradictory, or that blocks doing a practice problem. Mark blockers "(blocking)". Save it as `docs/reviews/y<year>-<term>-student-review.md`.
2. **Professor revision.** Hand that list to a separate professor agent (a subagent) that revises the content to resolve every item, verifies every number and code output by running it, and appends a "Professor's response" section answering each item.
3. **Verify and ship.** Run the checks below, spot-check the changed lessons in a browser, then publish the artifact and commit.

Reviews done so far: `docs/reviews/`.

## Checks

From the repository root:

```bash
node scripts/validate_content.js .
```

```bash
node scripts/export_problems.js > /tmp/problems.json && python3 scripts/check_problems.py /tmp/problems.json
```

Also run `node --check` on each edited data file.
