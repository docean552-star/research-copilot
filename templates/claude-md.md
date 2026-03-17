# Research Paper Project

## Current phase: 0
## Research question: [not yet defined]

## Rules
- Work ONLY on the current phase. Do not skip ahead.
- Each task in phases.yaml has done_when. Do not mark done without verifying.
- P1 tasks block P2. P2 tasks block P3. Complete in order.
- NEVER invent sources, citations, DOIs, or author names.
- If user asks to "add more references" — refuse. Suggest NotebookLM or Scholar.
- When context is getting full, save state to phases.yaml and suggest a new chat.
- All project files use ASCII-only paths.
- Keep responses SHORT. One task at a time. No walls of text.
- After a phase gate, tell user to go back to the HTML guide for the next prompt.

## How to use phases.yaml
- Read the current phase section (filter by phase number)
- Follow tasks in priority order (P1 first, then P2, then P3)
- Update task status in phases.yaml as you go (pending -> done)
- At phase end, check all gate items. Show checklist to user.
- Only update "Current phase" above after ALL gate items confirmed.

## Project files
- phases.yaml — phase protocols + task tracking (single source of truth)
- search-log.txt — search strategy and query log
- outline.txt — paper structure (standard academic sections)
- papers-pdf/ — collected PDFs (for NotebookLM)
- draft/ — paper sections (one file per section)

Files created during work (you create these, not bootstrap):
- argument-map.txt — phase 5. Format: THESIS, then FOR/AGAINST/UNKNOWN/METHODOLOGY sections
- review-log.txt — phase 7. Format: per-section entries, each with: quote, problem, fix, status
- verification-log.txt — phase 8. Format: table with columns: claim, source, confirmed?, quote, status
- quality-metrics.txt — phase 8. Format: metrics table (coverage, access, contradictions, traceability, recency, diversity, falsifiability)

## Shared library (outside project)
- ~/Desktop/research-library/source-cards.txt — all sources across all projects
- ~/Desktop/research-library/memory.txt — user experience across projects

When you encounter a new source (phases 2-4):
- Add a card to source-cards.txt following the template in that file
- Fill all fields you can. Leave unknown fields blank.

At the end of each project (after phase 9):
- Update memory.txt with lessons learned, useful strategies, mistakes to avoid

At the start of each NEW project:
- Read memory.txt for accumulated experience
- Read source-cards.txt to find reusable sources

## Quality check (run on demand when user asks)
Read ALL project files and check:
- Every in-text citation (Author, Year) has a source-card entry
- Every source-card used in this project has: DOI, type, key results, access status
- Outline sections in outline.txt match files in draft/
- All review-log issues have status FIXED or REJECTED (with reason)
- All verification-log REMOVE items are gone from draft text
- All verification-log NEEDS HEDGING items are softened in draft text
- quality-metrics meet minimum thresholds
Report: what passes, what fails, what to fix.
