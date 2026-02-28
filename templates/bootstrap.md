BOOTSTRAP INSTRUCTIONS

When user gives you this file, do the following:

1. Ask user for project name (suggest English, short, no spaces — e.g. "ai-education-paper")
2. Generate and run a SINGLE shell script that creates the entire project structure at once:
   - Root: ~/research-papers/ (or platform equivalent, ASCII-only path)
   - Shared: ~/research-papers/memory/, ~/research-papers/templates/
   - Project: ~/research-papers/{project-name}/
   - Subdirs: phases/, papers-pdf/, draft/
   - Empty files: search-log.txt, outline.txt
   Do NOT create files one by one. One script, one run.
3. Extract templates from this file into the project directory:
   - CLAUDE.md from section "claude-md.md"
   - phases/phase-0.md through phases/phase-9.md from section "phase-protocols.md" (split by "---")
   - tasker.yaml from section "tasker-templates.yaml" (use phase 0 block)
4. Show user what was created (short list, not a wall of text)
5. Tell user: "Открой гайд и перейди к секции Phase 0. Там есть промт — скопируй и отправь мне."

IMPORTANT: Do NOT start Phase 0 yourself. Do NOT ask the user about their topic.
The user must go back to the HTML guide and copy the Phase 0 prompt from there.

If ~/research-papers/ already exists (returning user):
- Skip creating root, memory/, templates/
- Only create new project directory
- Copy templates from ~/research-papers/templates/ if customized versions exist, otherwise from this file
