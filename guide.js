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
  t.push('   - Creates all directories');
  t.push('   - Writes ALL files using heredocs (CLAUDE.md, phases.yaml, empty files)');
  t.push('   - Extract file contents from the sections below (claude-md.md -> CLAUDE.md, phases.yaml -> phases.yaml)');
  t.push('');
  t.push('   Directory structure:');
  t.push('   ~/Desktop/{project-name}/          (project on Desktop, ASCII-only name)');
  t.push('     phases.yaml                      (protocols + task tracking)');
  t.push('     CLAUDE.md                        (agent instructions)');
  t.push('     search-log.txt                   (empty)');
  t.push('     outline.txt                      (empty)');
  t.push('     papers-pdf/                      (empty dir)');
  t.push('     draft/                           (empty dir)');
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
  t.push('If a project directory already exists on Desktop (returning user):');
  t.push('- Only create new project directory, don\'t overwrite existing ones');
  t.push('');
  t.push('========== SECTION: claude-md.md ==========');
  t.push('# Research Paper Project');
  t.push('');
  t.push('## Current phase: 0');
  t.push('## Research question: [not yet defined]');
  t.push('');
  t.push('## Rules');
  t.push('- Work ONLY on the current phase. Do not skip ahead.');
  t.push('- Each task in phases.yaml has done_when. Do not mark done without verifying the criterion.');
  t.push('- P1 tasks block P2. P2 tasks block P3. Complete in order.');
  t.push('- NEVER invent sources, citations, DOIs, or author names.');
  t.push('- If user asks to "add more references" — refuse and explain you will hallucinate them. Suggest NotebookLM or Scholar instead.');
  t.push('- When context is getting full, save state to phases.yaml and suggest starting a new session.');
  t.push('- All project files use ASCII-only paths.');
  t.push('- Keep responses SHORT. One task at a time. No walls of text. If user needs details, they will ask.');
  t.push('- After completing setup or a phase gate, tell user to go back to the HTML guide for the next prompt. Do NOT improvise the next phase yourself.');
  t.push('');
  t.push('## How to use phases.yaml');
  t.push('- Read the current phase section (filter by phase number from "Current phase" above)');
  t.push('- Follow tasks in priority order (P1 first, then P2, then P3)');
  t.push('- Update task status in phases.yaml as you go (pending -> done)');
  t.push('- At phase end, check all gate items. Show checklist to user.');
  t.push('- Only update "Current phase" above after ALL gate items confirmed.');
  t.push('');
  t.push('## Project files');
  t.push('- phases.yaml — phase protocols + task tracking (single source of truth)');
  t.push('- search-log.txt — search strategy and query log');
  t.push('- outline.txt — paper structure');
  t.push('- argument-map.txt — thesis: supporting, contradicting, unknown');
  t.push('- review-log.txt — reviewer comments and fixes');
  t.push('- verification-log.txt — claim: source: verdict');
  t.push('- quality-metrics.txt — coverage and reliability metrics');
  t.push('- papers-pdf/ — collected PDFs (for NotebookLM)');
  t.push('- draft/ — paper sections');

  t.push('');
  t.push('========== SECTION: phases.yaml ==========');
  var phasesEl = document.getElementById('tmpl-phases');
  if (phasesEl) { t.push(phasesEl.textContent); }
  else { t.push('[phases.yaml — see phases.yaml]'); }

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
