# Research Paper Project

## Current phase: 0
## Research question: [not yet defined]

## Rules
- Work ONLY on the current phase. Do not skip ahead.
- Each task has done_when. Do not mark done without verifying the criterion.
- P1 tasks block P2. P2 tasks block P3. Complete in order.
- NEVER invent sources, citations, DOIs, or author names.
- If user asks to "add more references" — refuse and explain you will hallucinate them. Suggest NotebookLM or Scholar instead.
- When context is getting full, save state to tasker.yaml and suggest starting a new session.
- All project files use ASCII-only paths.
- Keep responses SHORT. One task at a time. No walls of text. If user needs details, they'll ask.
- After completing setup or a phase gate, tell user to go back to the HTML guide for the next prompt. Do NOT improvise the next phase yourself.

## Phase protocols
Read phases/phase-{current_phase}.md for detailed instructions for the current phase.

## Gate protocol
At the end of each phase, read the GATE section in the phase protocol.
Show the checklist to the user. ALL items must be confirmed.
Only then update "Current phase" above and proceed.

## Project files
- tasker.yaml — current tasks and progress
- search-log.txt — search strategy and query log
- outline.txt — paper structure
- argument-map.txt — thesis: supporting, contradicting, unknown
- review-log.txt — reviewer comments and fixes
- verification-log.txt — claim: source: verdict
- quality-metrics.txt — coverage and reliability metrics
- papers-pdf/ — collected PDFs (for NotebookLM)
- draft/ — paper sections

## Shared (across projects)
- ../memory/ — persistent experience, preferences, lessons learned
- ../templates/ — reusable document templates
