# Phase 0: Research Question Formulation

## Context
Help user go from vague topic to concrete, falsifiable research question.

## Tasks
- [P1] Help user articulate their topic in their own words
  done_when: user has described their topic freely
- [P1] Generate 3-5 research question variants (broad to narrow)
  done_when: variants written, each checked against 4 criteria
- [P1] Validate chosen question: specificity, researchability, falsifiability, novelty
  done_when: all 4 criteria explicitly checked and passed
- [P2] Generate 15+ English search queries for Google Scholar
  done_when: queries written to search-log.txt
- [P2] Generate terms for Semantic Scholar, synonyms, related concepts
  done_when: added to search-log.txt
- [P2] Define inclusion/exclusion criteria
  done_when: criteria recorded in search-log.txt (language, years, types)

## Constraints
- Do NOT search for literature (phases 1-2)
- Do NOT name specific authors or papers (you WILL hallucinate them)
- Do NOT claim the question is "definitely new" — you don't know
- Do NOT skip to writing — this phase is about the QUESTION only
- Do NOT dump all tasks at once. Start with task 1: ask the user to describe their topic in their own words. Wait for their answer. Then proceed one task at a time.

## Gate -> Phase 1
- [ ] Research question recorded in search-log.txt
- [ ] Question passed all 4 criteria
- [ ] 15+ search terms generated
- [ ] Inclusion/exclusion criteria defined
- [ ] User confirmed question is what they want to research

Show gate checklist to user. All items must pass before Phase 1.

---

# Phase 1: Reconnaissance (Google Deep Research)

## Context
User runs Google Deep Research in browser. Agent helps AFTER, not during.

## Tasks
- [P1] Guide user to run Deep Research with proper prompt
  done_when: user has run Deep Research and received report
- [P1] Help interpret Deep Research results
  done_when: key authors, theories, meta-analyses identified
- [P2] Extract new search terms from report
  done_when: new terms added to search-log.txt
- [P2] Identify target journals
  done_when: journal list added to search-log.txt

## Constraints
- Do NOT search for literature yourself
- Do NOT add "your own" sources — you have none
- Do NOT confirm Deep Research findings as correct — they may contain errors

## Gate -> Phase 2
- [ ] Deep Research report processed
- [ ] Key authors listed in search-log.txt
- [ ] Key theories/frameworks identified
- [ ] Meta-analyses and systematic reviews noted (if any)
- [ ] Search terms expanded with new terminology

---

# Phase 2: Deep Literature Search

## Context
User searches in browser (Scholar, Connected Papers, Semantic Scholar). Agent assists.

## Tasks
- [P1] Help refine search queries if results are irrelevant
  done_when: user reports satisfactory search results
- [P1] Help evaluate relevance from abstracts
  done_when: user has clear include/exclude decisions
- [P2] Suggest additional synonyms and terms
  done_when: added to search-log.txt
- [P2] Help document each search in search-log
  done_when: each query logged with date, database, filters, counts
- [P3] Help assess saturation
  done_when: user confirms new searches yield mostly known results

## Constraints
- Do NOT name specific papers or DOIs — you will hallucinate them
- Do NOT say "this paper is good" about a paper you haven't read
- Do NOT generate URLs — you don't know real ones

## Gate -> Phase 3
- [ ] 30-80 sources saved in Zotero
- [ ] All searches documented in search-log.txt
- [ ] Saturation reached (new queries yield known results)
- [ ] Connected Papers explored for key works

---

# Phase 3: Source Collection

## Context
User works in Zotero and browser. Agent's role is minimal.

## Tasks
- [P1] Help organize Zotero collections and tags
  done_when: collections created (Core, Supporting, Background, Contradicting, Methods)
- [P1] Guide user on finding full texts (Unpaywall, arXiv, PMC, SSRN)
  done_when: user has attempted all channels for missing PDFs
- [P2] Help prepare PDFs for NotebookLM
  done_when: papers-pdf/ folder populated with readable PDFs

## Constraints
- Do NOT generate links to PDFs (you don't know real URLs)
- Do NOT assess paper quality (you haven't read them)

## Gate -> Phase 4
- [ ] Zotero organized with collections and tags
- [ ] Full texts obtained for 40%+ of sources
- [ ] papers-pdf/ folder ready for NotebookLM
- [ ] Core sources identified (5-10 must-reads)

---

# Phase 4: Knowledge Base (NotebookLM)

## Context
User works in NotebookLM (browser). Agent helps structure results AFTER.
This is where YAML becomes useful — structured source cards.

## Tasks
- [P1] Guide user through NotebookLM setup and initial questions
  done_when: notebook created, PDFs uploaded, first questions asked
- [P1] Help structure findings from NotebookLM into source cards (YAML)
  done_when: source-cards.yaml created with cards for key sources
- [P2] Help identify contradictions between sources
  done_when: contradictions documented
- [P2] Help identify gaps in coverage
  done_when: gaps documented
- [P3] Suggest Audio Overview for big-picture understanding
  done_when: user has listened or decided to skip

## Constraints
- Do NOT answer questions about paper contents — you haven't read them, NotebookLM has
- Do NOT supplement findings with "your knowledge" — this is contamination
- Do NOT replace NotebookLM — direct user there for factual questions

## Gate -> Phase 5
- [ ] NotebookLM notebook populated with sources
- [ ] Source cards created for key papers
- [ ] Contradictions documented
- [ ] Gaps identified
- [ ] User has READ 5-10 core papers themselves (not just summaries)

---

# Phase 5: Synthesis (Claude + NotebookLM)

## Context
This is the agent's primary phase. Synthesize user's notes into structure.

## Tasks
- [P1] Group user's notes by themes
  done_when: thematic grouping created and saved
- [P1] Build argument map (thesis, supporting, contradicting, unknown)
  done_when: argument-map.txt created
- [P1] Propose paper outline
  done_when: outline.txt created with sections, arguments, sources per section
- [P2] Cross-check with NotebookLM (user verifies key claims)
  done_when: user confirmed argument map accuracy via NotebookLM

## Constraints
- Work ONLY with notes provided by user
- Do NOT add "your own" sources or findings
- If data is insufficient for a conclusion — say so explicitly, don't fill gaps from imagination
- Every claim in argument map must reference a specific author from user's notes

## Gate -> Phase 6
- [ ] Thematic synthesis complete
- [ ] Argument map saved (argument-map.txt)
- [ ] Outline saved (outline.txt) with sources per section
- [ ] Key claims verified by user through NotebookLM

---

# Phase 6: Writing (Claude)

## Context
Write paper section by section based on outline and notes.

## Tasks
For each section in outline.txt:
- [P1] Write section draft using provided sources only
  done_when: draft saved to draft/ directory
- [P2] Ensure every claim has a citation from user's source list
  done_when: no unsupported claims remain
- [P2] Apply hedging language (suggests, appears, may indicate)
  done_when: no categorical statements without evidence

## Constraints
- Use ONLY sources from user's list. Not a single "your own" source.
- If a paragraph needs more sources — say "need a source on [topic]", don't fabricate
- If user asks "add more references" — REFUSE. Explain you will hallucinate. Suggest NotebookLM/Scholar.
- Never use "clearly", "obviously", "proves" — not academic tone
- Write one section per session if context is limited

## Gate -> Phase 7
- [ ] All sections drafted (draft/ directory complete)
- [ ] Every claim has a citation
- [ ] Hedging language used throughout
- [ ] No invented sources

---

# Phase 7: Critical Review (Claude as Reviewer 2)

## Context
SEPARATE SESSION from the writer. Role: strict academic reviewer.

## Tasks
- [P1] Review each section for logical problems
  done_when: all issues logged in review-log.txt
- [P1] Check falsifiability of key claims
  done_when: non-falsifiable claims flagged
- [P1] Check for cherry-picking (missing counter-evidence)
  done_when: all one-sided arguments flagged
- [P2] Check academic tone and style
  done_when: style issues noted
- [P2] Check structure and transitions
  done_when: structural issues noted

## Constraints
- This is a SEPARATE session. Do not defend the text — attack it.
- Do not suggest adding sources the user doesn't have
- If a whole section is weak — say so directly
- Check: are ALL contradictions from literature addressed in text?

## Gate -> Phase 8
- [ ] All sections reviewed
- [ ] review-log.txt complete with all findings
- [ ] User has addressed each finding (fixed, acknowledged, or justified)

---

# Phase 8: Verification (NotebookLM + scite.ai)

## Context
Claim-by-claim verification through NotebookLM. Source quality via scite.ai.

## Tasks
- [P1] Extract all claims from text that reference sources
  done_when: claims list created
- [P1] Guide user through NotebookLM verification for each claim
  done_when: verification-log.txt filled (CONFIRMED/NEEDS HEDGING/REMOVE)
- [P2] Guide user through scite.ai for 10-15 key sources
  done_when: source quality noted (supporting vs contrasting citations)
- [P2] Calculate quality metrics
  done_when: quality-metrics.txt filled

## Constraints
- Do NOT confirm claims yourself — NotebookLM does this
- Do NOT say "this source is reliable" — you don't know. Let scite.ai show.
- Do NOT suggest replacements for REMOVE claims — you'll hallucinate

## Gate -> Phase 9
- [ ] All claims verified (verification-log.txt complete)
- [ ] No REMOVE claims remain in text (fixed or removed)
- [ ] Key sources checked via scite.ai
- [ ] Quality metrics calculated, critical ones in green zone

---

# Phase 9: Finalization

## Context
Final polish: bibliography, style, plagiarism check, AI disclosure.

## Tasks
- [P1] Help user verify bibliography matches text (every citation in text = in bibliography, and vice versa)
  done_when: no orphan citations in either direction
- [P1] Final style edit: remove colloquialisms, check term consistency, transitions
  done_when: all sections edited
- [P2] Remind user about plagiarism/AI-detection check
  done_when: user has checked or decided to check later
- [P2] Verify Abstract accurately reflects content (written LAST)
  done_when: abstract reviewed
- [P3] Verify Conclusion introduces no new arguments
  done_when: conclusion reviewed
- [P3] Update memory/ with lessons learned from this project
  done_when: memory updated for future projects

## Constraints
- Do NOT add content — only edit style
- Do NOT change claims or sources
- Do NOT skip the "read aloud" recommendation

## Gate -> DONE
- [ ] Bibliography complete and consistent with text
- [ ] All sections style-edited
- [ ] Abstract written last and reflects actual content
- [ ] Plagiarism/AI-detection addressed
- [ ] AI disclosure written if required
- [ ] User has read text aloud
- [ ] Memory updated for future projects
