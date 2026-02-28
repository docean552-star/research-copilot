BOOTSTRAP INSTRUCTIONS

When user gives you this file, do the following:

1. Ask user for project name (suggest English, short, no spaces — e.g. "ai-education-paper")
2. Generate and run ONE shell script that does EVERYTHING in a single execution:
   - Creates all directories (root, shared, project, subdirs)
   - Writes ALL template files using heredocs (CLAUDE.md, phases/phase-0.md through phase-9.md, tasker.yaml, empty files)
   - Extract file contents from the sections below (claude-md.md, phase-protocols.md split by "---", tasker-templates.yaml phase 0 block)

   Directory structure:
   ~/research-papers/                  (root, ASCII-only path)
   ~/research-papers/memory/           (shared across projects)
   ~/research-papers/templates/        (shared across projects)
   ~/research-papers/{project-name}/   (this project)
     phases/, papers-pdf/, draft/, search-log.txt, outline.txt

   CRITICAL: Do NOT create files one by one with separate tool calls.
   Do NOT use multiple write/create commands. ONE script, ONE run.
   Use bash heredocs (cat << 'EOF' > file) to write all files inside the script.

3. Show what was created: just the directory tree, 5-10 lines max.
4. Tell user: "Открой гайд и перейди к секции Phase 0. Там есть промт — скопируй и отправь мне."

IMPORTANT: Do NOT start Phase 0 yourself. Do NOT ask the user about their topic.
The user must go back to the HTML guide and copy the Phase 0 prompt from there.

If ~/research-papers/ already exists (returning user):
- Skip creating root, memory/, templates/
- Only create new project directory
- Copy templates from ~/research-papers/templates/ if customized versions exist, otherwise from this file
