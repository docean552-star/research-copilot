/* ── TOC click-to-open ── */
document.querySelectorAll('.toc a').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var id = this.getAttribute('href').slice(1);
    var target = document.getElementById(id);
    if (target && target.tagName === 'DETAILS') {
      target.setAttribute('open', '');
      setTimeout(function() { target.scrollIntoView({behavior: 'smooth'}); }, 50);
      e.preventDefault();
    }
  });
});

/* ── theme toggle ── */
function toggleTheme() {
  var html = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (html.getAttribute('data-theme') === 'light') {
    html.removeAttribute('data-theme');
    btn.textContent = 'Светлая тема';
    localStorage.setItem('theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    btn.textContent = 'Тёмная тема';
    localStorage.setItem('theme', 'light');
  }
}
(function() {
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    document.addEventListener('DOMContentLoaded', function() {
      document.querySelector('.theme-toggle').textContent = 'Тёмная тема';
    });
  }
})();

/* ── scroll-nav overlay ── */
(function() {
  var nav = document.getElementById('scrollNav');
  var timer = null;
  var sections = document.querySelectorAll('details.section');
  sections.forEach(function(s) {
    var a = document.createElement('a');
    a.href = '#' + s.id;
    a.textContent = s.querySelector('summary').textContent;
    a.addEventListener('click', function(e) {
      e.preventDefault();
      s.setAttribute('open', '');
      setTimeout(function() { s.scrollIntoView({behavior: 'smooth'}); }, 50);
      hide();
    });
    nav.appendChild(a);
  });
  function show() {
    nav.classList.add('visible');
    clearTimeout(timer);
    timer = setTimeout(hide, 2500);
  }
  function hide() { nav.classList.remove('visible'); }
  var lastY = window.scrollY;
  window.addEventListener('scroll', function() {
    var dy = Math.abs(window.scrollY - lastY);
    lastY = window.scrollY;
    if (dy > 10) show();
  }, {passive: true});
  nav.addEventListener('mouseenter', function() { clearTimeout(timer); timer = setTimeout(hide, 5000); });
  nav.addEventListener('mouseleave', function() { timer = setTimeout(hide, 2000); });
  nav.addEventListener('touchstart', function() {
    clearTimeout(timer);
    nav.classList.add('touching');
  }, {passive: true});
  nav.addEventListener('touchend', function() {
    nav.classList.remove('touching');
    timer = setTimeout(hide, 2500);
  }, {passive: true});
  var navLinks = [];
  nav.querySelectorAll('a').forEach(function(a) { navLinks.push(a); });
  function updateActive() {
    var best = -1;
    var vh = window.innerHeight;
    sections.forEach(function(s, i) {
      if (s.getBoundingClientRect().top < vh) best = i;
    });
    if (best < 0) best = 0;
    navLinks.forEach(function(a, i) {
      var dist = Math.abs(i - best);
      a.classList.toggle('active', i === best);
      a.classList.toggle('near', dist === 1);
      a.style.opacity = i === best ? '1' : dist === 1 ? '0.6' : Math.max(0.15, 0.4 - dist * 0.06);
    });
  }
  window.addEventListener('scroll', updateActive, {passive: true});
  updateActive();
})();

/* ── download templates.md ── */
function downloadTemplates() {
  var t = [];
  t.push('========== SECTION: bootstrap.md ==========');
  t.push('BOOTSTRAP INSTRUCTIONS');
  t.push('');
  t.push('When user gives you this file, do the following:');
  t.push('');
  t.push('1. Ask user for project name (suggest English, short, no spaces — e.g. "ai-education-paper")');
  t.push('2. Generate and run ONE shell script that does EVERYTHING in a single execution:');
  t.push('   - Creates all directories (root, shared, project, subdirs)');
  t.push('   - Writes ALL template files using heredocs (CLAUDE.md, phases/phase-0.md through phase-9.md, tasker.yaml, empty files)');
  t.push('   - Extract file contents from the sections below (claude-md.md, phase-protocols.md split by "---", tasker-templates.yaml phase 0 block)');
  t.push('');
  t.push('   Directory structure:');
  t.push('   ~/research-papers/                  (root, ASCII-only path)');
  t.push('   ~/research-papers/memory/           (shared across projects)');
  t.push('   ~/research-papers/templates/        (shared across projects)');
  t.push('   ~/research-papers/{project-name}/   (this project)');
  t.push('     phases/, papers-pdf/, draft/, search-log.txt, outline.txt');
  t.push('');
  t.push('   CRITICAL: Do NOT create files one by one with separate tool calls.');
  t.push('   Do NOT use multiple write/create commands. ONE script, ONE run.');
  t.push('   Use bash heredocs (cat << \'EOF\' > file) to write all files inside the script.');
  t.push('');
  t.push('3. Show what was created: just the directory tree, 5-10 lines max.');
  t.push('4. Tell user: "Открой гайд и перейди к секции Phase 0. Там есть промт — скопируй и отправь мне."');
  t.push('');
  t.push('IMPORTANT: Do NOT start Phase 0 yourself. Do NOT ask the user about their topic.');
  t.push('The user must go back to the HTML guide and copy the Phase 0 prompt from there.');
  t.push('');
  t.push('If ~/research-papers/ already exists (returning user):');
  t.push('- Skip creating root, memory/, templates/');
  t.push('- Only create new project directory');
  t.push('- Copy templates from ~/research-papers/templates/ if customized versions exist, otherwise from this file');
  t.push('');
  t.push('========== SECTION: claude-md.md ==========');
  t.push('# Research Paper Project');
  t.push('');
  t.push('## Current phase: 0');
  t.push('## Research question: [not yet defined]');
  t.push('');
  t.push('## Rules');
  t.push('- Work ONLY on the current phase. Do not skip ahead.');
  t.push('- Each task has done_when. Do not mark done without verifying the criterion.');
  t.push('- P1 tasks block P2. P2 tasks block P3. Complete in order.');
  t.push('- NEVER invent sources, citations, DOIs, or author names.');
  t.push('- If user asks to "add more references" — refuse and explain you will hallucinate them. Suggest NotebookLM or Scholar instead.');
  t.push('- When context is getting full, save state to tasker.yaml and suggest starting a new session.');
  t.push('- All project files use ASCII-only paths.');
  t.push('- Keep responses SHORT. One task at a time. No walls of text. If user needs details, they will ask.');
  t.push('- After completing setup or a phase gate, tell user to go back to the HTML guide for the next prompt. Do NOT improvise the next phase yourself.');
  t.push('');
  t.push('## Phase protocols');
  t.push('Read phases/phase-{current_phase}.md for detailed instructions for the current phase.');
  t.push('');
  t.push('## Gate protocol');
  t.push('At the end of each phase, read the GATE section in the phase protocol.');
  t.push('Show the checklist to the user. ALL items must be confirmed.');
  t.push('Only then update "Current phase" above and proceed.');
  t.push('');
  t.push('## Project files');
  t.push('- tasker.yaml — current tasks and progress');
  t.push('- search-log.txt — search strategy and query log');
  t.push('- outline.txt — paper structure');
  t.push('- argument-map.txt — thesis: supporting, contradicting, unknown');
  t.push('- review-log.txt — reviewer comments and fixes');
  t.push('- verification-log.txt — claim: source: verdict');
  t.push('- quality-metrics.txt — coverage and reliability metrics');
  t.push('- papers-pdf/ — collected PDFs (for NotebookLM)');
  t.push('- draft/ — paper sections');
  t.push('');
  t.push('## Shared (across projects)');
  t.push('- ../memory/ — persistent experience, preferences, lessons learned');
  t.push('- ../templates/ — reusable document templates');

  t.push('');
  t.push('========== SECTION: phase-protocols.md ==========');
  var phases = document.getElementById('tmpl-phases');
  if (phases) { t.push(phases.textContent); }
  else { t.push('[Phase protocols — see phase-protocols.md]'); }

  t.push('');
  t.push('========== SECTION: tasker-templates.yaml ==========');
  var taskers = document.getElementById('tmpl-taskers');
  if (taskers) { t.push(taskers.textContent); }
  else { t.push('[Tasker templates — see tasker-templates.yaml]'); }

  t.push('');
  t.push('========== SECTION: memory.md ==========');
  t.push('# Research Memory');
  t.push('');
  t.push('## Preferences');
  t.push('- Writing style: [will be filled after first project]');
  t.push('- Preferred citation format: [APA 7th / Harvard / Chicago / IEEE]');
  t.push('- Language: [English / Russian / other]');
  t.push('- Target journals: []');
  t.push('');
  t.push('## Learned patterns');
  t.push('- [Patterns discovered during projects go here]');
  t.push('');
  t.push('## Common pitfalls');
  t.push('- [Mistakes to avoid, discovered through experience]');
  t.push('');
  t.push('## Search strategies that worked');
  t.push('- [Effective query patterns by field]');
  t.push('');
  t.push('## Projects completed');
  t.push('- [Project name, topic, date, outcome]');
  t.push('');
  t.push('========== SECTION: source-card.yaml ==========');
  t.push('# Source card template (YAML format, introduced in Phase 4)');
  t.push('# Copy this structure for each key source');
  t.push('');
  t.push('- doi: ""');
  t.push('  title: ""');
  t.push('  authors: []');
  t.push('  year: 0');
  t.push('  journal: ""');
  t.push('  type: ""           # primary | secondary | review | meta-analysis');
  t.push('  relevance: ""      # core | supporting | background | contradicting');
  t.push('  has_full_text: false');
  t.push('  key_findings:');
  t.push('    - ""');
  t.push('  methodology: ""');
  t.push('  limitations: ""');
  t.push('  connection_to_thesis: ""');
  t.push('  quality_assessment: ""  # high | medium | low');
  t.push('  notebooklm_verified: false');
  t.push('  scite_support: 0');
  t.push('  scite_contrast: 0');

  var blob = new Blob([t.join('\n')], {type: 'text/markdown'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'templates.md';
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ── copy-to-clipboard on agent prompts ── */
document.querySelectorAll('.agent-instructions pre').forEach(function(pre) {
  pre.classList.add('copyable');
  pre.addEventListener('click', function() {
    var code = this.querySelector('code');
    var text = code ? code.textContent : this.textContent;
    navigator.clipboard.writeText(text).then(function() {
      pre.classList.add('copied');
      setTimeout(function() { pre.classList.remove('copied'); }, 1500);
    });
  });
});
