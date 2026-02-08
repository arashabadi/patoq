# Contributing to PATOQ

Thanks for contributing to PATOQ. This project is a practical learning book for undergraduates, lab members, and early researchers entering bioinformatics.

## Project Goals

- Keep content beginner-friendly but technically accurate.
- Prioritize reproducible practice, not just tool lists.
- Keep chapter structure consistent so contributors can extend it easily.

## Ways to Contribute

1. Report issues (broken links, outdated tools, unclear explanations).
2. Improve existing chapters (clarity, examples, references).
3. Add high-quality resources with short rationale.
4. Add mini projects or practical exercises for learners.

## Before You Start

### 1. Open or check an issue

- Search existing issues first: [Issues](https://github.com/arashabadi/patoq/issues)
- If needed, open a new issue and describe:
  - Current behavior/content
  - Proposed improvement
  - Affected file(s)

### 2. Fork and branch

```bash
git clone https://github.com/<your-username>/patoq.git
cd patoq
git checkout -b feat/short-descriptive-name
```

## Local Development

Render the book locally before submitting:

```bash
quarto render
quarto preview
```

If Quarto is not installed, see [Quarto docs](https://quarto.org/docs/get-started/).

## Content Standards

### Chapter Template (preferred)

Use this order when possible:

1. Why this matters
2. Learning outcomes
3. Suggested time
4. Key concepts
5. Recommended resources
6. Mini project or practice checklist

### Writing Guidelines

- Prefer short, direct explanations.
- Define jargon on first use.
- Avoid unverified claims and hype language.
- Keep tone practical and instructional.

### Resource Quality

- Prefer primary/official documentation.
- Prefer stable educational resources over social posts.
- For each new resource, include one line on why it is useful.
- Remove duplicates rather than adding near-identical links.

## Style and Formatting

- Keep edits in `.qmd` files unless config/style changes are needed.
- Keep heading hierarchy valid (one `#` title per file).
- Use meaningful section headers and consistent capitalization.
- Keep code snippets minimal and safe for beginners.

## Git Safety for Beginner-Facing Content

When editing Git tutorials:

- Prefer safe recovery commands like:
  - `git restore --staged`
  - `git restore`
  - `git revert`
  - `git stash`
- Avoid destructive commands in beginner sections unless strongly justified.

## Pull Request Checklist

Before opening a PR:

- [ ] Book renders successfully with `quarto render`
- [ ] Links you added are valid
- [ ] Content follows chapter template and tone
- [ ] No duplicate sections/resources introduced
- [ ] Commit message is clear and specific

When opening the PR, include:

- Summary of what changed
- Why it improves learner outcomes
- Files changed
- Any screenshots if UI/style changed

## Review Expectations

- Reviews focus on clarity, correctness, structure, and maintainability.
- Large PRs may be asked to split into smaller focused PRs.
- Maintainers may curate wording/placement for consistency.

## Contributor Recognition

Contributors are recognized in GitHub and may be listed in book metadata based on merged contributions.

Thank you for helping make PATOQ more useful and more accessible.
