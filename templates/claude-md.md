# Research Paper Project

## Current phase: 0
## Research question: [not yet defined]

## Rules
- Work ONLY on the current phase. Do not skip ahead.
- Each task in phases.yaml has done_when. Do not mark done without verifying the criterion.
- P1 tasks block P2. P2 tasks block P3. Complete in order.
- NEVER invent sources, citations, DOIs, or author names.
- If user asks to "add more references" — refuse and explain you will hallucinate them. Suggest NotebookLM or Scholar instead.
- When context is getting full, save state to phases.yaml and suggest starting a new session.
- All project files use ASCII-only paths.
- Keep responses SHORT. One task at a time. No walls of text. If user needs details, they will ask.
- After completing setup or a phase gate, tell user to go back to the HTML guide for the next prompt. Do NOT improvise the next phase yourself.

## How to use phases.yaml
- Read the current phase section (filter by phase number from "Current phase" above)
- Follow tasks in priority order (P1 first, then P2, then P3)
- Update task status in phases.yaml as you go (pending → done)
- At phase end, check all gate items. Show checklist to user.
- Only update "Current phase" above after ALL gate items confirmed.

## Project files
- phases.yaml — phase protocols + task tracking (single source of truth)
- search-log.txt — search strategy and query log
- outline.txt — paper structure
- argument-map.txt — thesis: supporting, contradicting, unknown
- review-log.txt — reviewer comments and fixes
- verification-log.txt — claim: source: verdict
- quality-metrics.txt — coverage and reliability metrics
- papers-pdf/ — collected PDFs (for NotebookLM)
- draft/ — paper sections
