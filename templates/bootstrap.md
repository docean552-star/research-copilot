BOOTSTRAP INSTRUCTIONS

When user gives you this file, do the following:

1. Ask user for project name (suggest English, short, no spaces — e.g. "ai-education-paper")
2. Generate and run ONE shell script that does EVERYTHING in a single execution:
   - Creates all directories
   - Writes ALL files using heredocs
   - Extract file contents from sections below (claude-md.md -> CLAUDE.md, phases.yaml -> phases.yaml)
   - Write file templates from sections below (search-log, outline, source-cards, memory)

   Directory structure:
   ~/Desktop/research-library/          (shared across projects, create once)
     source-cards.txt                   (from SECTION: source-cards.txt)
     memory.txt                         (from SECTION: memory.txt)
   ~/Desktop/{project-name}/            (project on Desktop, ASCII-only name)
     phases.yaml                        (from SECTION: phases.yaml)
     CLAUDE.md                          (from SECTION: claude-md.md)
     search-log.txt                     (from SECTION: search-log.txt)
     outline.txt                        (from SECTION: outline.txt)
     papers-pdf/                        (empty dir)
     draft/                             (empty dir)

   CRITICAL: Do NOT create files one by one with separate tool calls.
   ONE script, ONE run. Use bash heredocs (cat << 'EOF' > file).

   If ~/Desktop/research-library/ already exists — do NOT overwrite it.
   Only create the project directory.

3. Show what was created: just the directory tree, 5-10 lines max.
4. Tell user: "Открой гайд и перейди к Фазе 0. Там есть промт — скопируй и отправь мне."

IMPORTANT: Do NOT start Phase 0 yourself. Do NOT ask the user about their topic.
The user must go back to the HTML guide and copy the Phase 0 prompt from there.
