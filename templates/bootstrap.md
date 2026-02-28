BOOTSTRAP INSTRUCTIONS

When user gives you this file, do the following:

1. Ask user for project name (suggest English, short, no spaces — e.g. "ai-education-paper")
2. Generate and run ONE shell script that does EVERYTHING in a single execution:
   - Creates all directories
   - Writes ALL files using heredocs (CLAUDE.md, phases.yaml, empty files)
   - Extract file contents from the sections below (claude-md.md → CLAUDE.md, phases.yaml → phases.yaml)

   Directory structure:
   ~/Desktop/{project-name}/          (project on Desktop, ASCII-only name)
     phases.yaml                      (protocols + task tracking — from section below)
     CLAUDE.md                        (agent instructions — from section below)
     search-log.txt                   (empty)
     outline.txt                      (empty)
     papers-pdf/                      (empty dir)
     draft/                           (empty dir)

   CRITICAL: Do NOT create files one by one with separate tool calls.
   Do NOT use multiple write/create commands. ONE script, ONE run.
   Use bash heredocs (cat << 'EOF' > file) to write all files inside the script.

3. Show what was created: just the directory tree, 5-10 lines max.
4. Tell user: "Открой гайд и перейди к секции Phase 0. Там есть промт — скопируй и отправь мне."

IMPORTANT: Do NOT start Phase 0 yourself. Do NOT ask the user about their topic.
The user must go back to the HTML guide and copy the Phase 0 prompt from there.

If a project directory already exists on Desktop (returning user):
- Only create new project directory, don't overwrite existing ones
