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

  // ── BOOTSTRAP ──
  t.push('========== SECTION: bootstrap.md ==========');
  t.push('BOOTSTRAP INSTRUCTIONS');
  t.push('');
  t.push('When user gives you this file, do the following:');
  t.push('');
  t.push('1. Ask user for project name (suggest English, short, no spaces — e.g. "ai-education-paper")');
  t.push('2. Generate and run ONE shell script that does EVERYTHING in a single execution:');
  t.push('   - Creates all directories');
  t.push('   - Writes ALL files using heredocs');
  t.push('   - Extract file contents from sections below (claude-md.md -> CLAUDE.md, phases.yaml -> phases.yaml)');
  t.push('   - Write file templates from sections below (search-log, outline, source-cards, memory)');
  t.push('');
  t.push('   Directory structure:');
  t.push('   ~/Desktop/research-library/          (shared across projects, create once)');
  t.push('     source-cards.txt                   (from SECTION: source-cards.txt)');
  t.push('     memory.txt                         (from SECTION: memory.txt)');
  t.push('   ~/Desktop/{project-name}/            (project on Desktop, ASCII-only name)');
  t.push('     phases.yaml                        (from SECTION: phases.yaml)');
  t.push('     CLAUDE.md                          (from SECTION: claude-md.md)');
  t.push('     search-log.txt                     (from SECTION: search-log.txt)');
  t.push('     outline.txt                        (from SECTION: outline.txt)');
  t.push('     papers-pdf/                        (empty dir)');
  t.push('     draft/                             (empty dir)');
  t.push('');
  t.push('   CRITICAL: Do NOT create files one by one with separate tool calls.');
  t.push('   ONE script, ONE run. Use bash heredocs (cat << \'EOF\' > file).');
  t.push('');
  t.push('   If ~/Desktop/research-library/ already exists — do NOT overwrite it.');
  t.push('   Only create the project directory.');
  t.push('');
  t.push('3. Show what was created: just the directory tree, 5-10 lines max.');
  t.push('4. Tell user: "Открой гайд и перейди к Фазе 0. Там есть промт — скопируй и отправь мне."');
  t.push('');
  t.push('IMPORTANT: Do NOT start Phase 0 yourself. Do NOT ask the user about their topic.');
  t.push('The user must go back to the HTML guide and copy the Phase 0 prompt from there.');

  // ── CLAUDE.MD ──
  t.push('');
  t.push('========== SECTION: claude-md.md ==========');
  t.push('# Research Paper Project');
  t.push('');
  t.push('## Current phase: 0');
  t.push('## Research question: [not yet defined]');
  t.push('');
  t.push('## Rules');
  t.push('- Work ONLY on the current phase. Do not skip ahead.');
  t.push('- Each task in phases.yaml has done_when. Do not mark done without verifying.');
  t.push('- P1 tasks block P2. P2 tasks block P3. Complete in order.');
  t.push('- NEVER invent sources, citations, DOIs, or author names.');
  t.push('- If user asks to "add more references" — refuse. Suggest NotebookLM or Scholar.');
  t.push('- When context is getting full, save state to phases.yaml and suggest a new chat.');
  t.push('- All project files use ASCII-only paths.');
  t.push('- Keep responses SHORT. One task at a time. No walls of text.');
  t.push('- After a phase gate, tell user to go back to the HTML guide for the next prompt.');
  t.push('');
  t.push('## How to use phases.yaml');
  t.push('- Read the current phase section (filter by phase number)');
  t.push('- Follow tasks in priority order (P1 first, then P2, then P3)');
  t.push('- Update task status in phases.yaml as you go (pending -> done)');
  t.push('- At phase end, check all gate items. Show checklist to user.');
  t.push('- Only update "Current phase" above after ALL gate items confirmed.');
  t.push('');
  t.push('## Project files');
  t.push('- phases.yaml — phase protocols + task tracking (single source of truth)');
  t.push('- search-log.txt — search strategy and query log');
  t.push('- outline.txt — paper structure (standard academic sections)');
  t.push('- papers-pdf/ — collected PDFs (for NotebookLM)');
  t.push('- draft/ — paper sections (one file per section)');
  t.push('');
  t.push('Files created during work (you create these, not bootstrap):');
  t.push('- argument-map.txt — phase 5. Format: THESIS, then FOR/AGAINST/UNKNOWN/METHODOLOGY sections');
  t.push('- review-log.txt — phase 7. Format: per-section entries, each with: quote, problem, fix, status');
  t.push('- verification-log.txt — phase 8. Format: table with columns: claim, source, confirmed?, quote, status');
  t.push('- quality-metrics.txt — phase 8. Format: metrics table (coverage, access, contradictions, traceability, recency, diversity, falsifiability)');
  t.push('');
  t.push('## Shared library (outside project)');
  t.push('- ~/Desktop/research-library/source-cards.txt — all sources across all projects');
  t.push('- ~/Desktop/research-library/memory.txt — user experience across projects');
  t.push('');
  t.push('When you encounter a new source (phases 2-4):');
  t.push('- Add a card to source-cards.txt following the template in that file');
  t.push('- Fill all fields you can. Leave unknown fields blank.');
  t.push('');
  t.push('At the end of each project (after phase 9):');
  t.push('- Update memory.txt with lessons learned, useful strategies, mistakes to avoid');
  t.push('');
  t.push('At the start of each NEW project:');
  t.push('- Read memory.txt for accumulated experience');
  t.push('- Read source-cards.txt to find reusable sources');
  t.push('');
  t.push('## Quality check (run on demand when user asks)');
  t.push('Read ALL project files and check:');
  t.push('- Every in-text citation (Author, Year) has a source-card entry');
  t.push('- Every source-card used in this project has: DOI, type, key results, access status');
  t.push('- Outline sections in outline.txt match files in draft/');
  t.push('- All review-log issues have status FIXED or REJECTED (with reason)');
  t.push('- All verification-log REMOVE items are gone from draft text');
  t.push('- All verification-log NEEDS HEDGING items are softened in draft text');
  t.push('- quality-metrics meet minimum thresholds');
  t.push('Report: what passes, what fails, what to fix.');

  // ── SEARCH-LOG.TXT ──
  t.push('');
  t.push('========== SECTION: search-log.txt ==========');
  t.push('SEARCH LOG');
  t.push('==========');
  t.push('');
  t.push('ФАЗА 0: ИССЛЕДОВАТЕЛЬСКИЙ ВОПРОС');
  t.push('');
  t.push('Вопрос:');
  t.push('(агент заполнит)');
  t.push('');
  t.push('Поисковые термины:');
  t.push('(агент заполнит)');
  t.push('');
  t.push('Критерии включения:');
  t.push('- Язык:');
  t.push('- Годы:');
  t.push('- Тип: peer-reviewed journal articles, conference papers');
  t.push('');
  t.push('Критерии исключения:');
  t.push('- Opinion pieces без эмпирических данных');
  t.push('- Тезисы конференций без полного текста');
  t.push('');
  t.push('---');
  t.push('');
  t.push('ФАЗА 1: РАЗВЕДКА (Deep Research)');
  t.push('');
  t.push('Дата:');
  t.push('Ключевые авторы:');
  t.push('Ключевые теории/рамки:');
  t.push('Мета-анализы:');
  t.push('Новые поисковые термины:');
  t.push('Журналы по теме:');
  t.push('');
  t.push('---');
  t.push('');
  t.push('ФАЗА 2: ПОИСК ЛИТЕРАТУРЫ');
  t.push('');
  t.push('Запрос 1:');
  t.push('- Дата:');
  t.push('- База:');
  t.push('- Запрос:');
  t.push('- Фильтры:');
  t.push('- Найдено:');
  t.push('- Просмотрено:');
  t.push('- Сохранено в Zotero:');
  t.push('- Отсеяно:');
  t.push('');
  t.push('(добавляй запросы ниже)');

  // ── OUTLINE.TXT ──
  t.push('');
  t.push('========== SECTION: outline.txt ==========');
  t.push('OUTLINE');
  t.push('=======');
  t.push('(агент заполняет в фазе 5 на основе argument map)');
  t.push('');
  t.push('1. INTRODUCTION (~500-800 words)');
  t.push('   - Контекст и актуальность');
  t.push('   - Research gap');
  t.push('   - Исследовательский вопрос');
  t.push('   - Структура статьи');
  t.push('   Источники:');
  t.push('');
  t.push('2. LITERATURE REVIEW (~1500-3000 words)');
  t.push('   - Тема A:');
  t.push('     Источники:');
  t.push('   - Тема B:');
  t.push('     Источники:');
  t.push('   - Тема C:');
  t.push('     Источники:');
  t.push('   - Противоречия и пробелы:');
  t.push('');
  t.push('3. METHODOLOGY (~500-1000 words, если эмпирика)');
  t.push('   - Подход:');
  t.push('   - Данные:');
  t.push('   - Анализ:');
  t.push('');
  t.push('4. RESULTS (~500-1000 words, если эмпирика)');
  t.push('');
  t.push('5. DISCUSSION (~1000-2000 words)');
  t.push('   - Интерпретация результатов');
  t.push('   - Связь с литературой');
  t.push('   - Ограничения');
  t.push('   - Направления дальнейших исследований');
  t.push('');
  t.push('6. CONCLUSION (~300-500 words)');
  t.push('   - Главный вывод');
  t.push('   - Практические импликации');

  // ── SOURCE-CARDS.TXT ──
  t.push('');
  t.push('========== SECTION: source-cards.txt ==========');
  t.push('SOURCE CARDS');
  t.push('============');
  t.push('Библиотека источников. Переиспользуется между проектами.');
  t.push('Агент добавляет карточки по мере обнаружения источников (фазы 2-4).');
  t.push('Юзер добавляет scite-данные в фазе 8.');
  t.push('');
  t.push('Шаблон карточки (копируй для нового источника):');
  t.push('---');
  t.push('Автор (год) — "Название"');
  t.push('  URL: (ссылка на статью)');
  t.push('  DOI:');
  t.push('  Журнал:');
  t.push('  Тип: empirical / review / meta-analysis / theoretical / case study');
  t.push('  Методология: (если empirical — подход, N=, выборка, длительность)');
  t.push('  Результаты: (2-3 предложения, ключевые выводы — объективно)');
  t.push('  Ограничения: (что авторы сами признают)');
  t.push('  Теги: (ключевые слова через запятую)');
  t.push('  Scite: _ supporting, _ contrasting, _ mentioning');
  t.push('  Цитирований: ~');
  t.push('  Доступ: has-pdf / abstract-only');
  t.push('  PDF: papers-pdf/filename.pdf');
  t.push('  Использовал в:');
  t.push('    (project-name): коллекция, роль в статье');
  t.push('---');
  t.push('');
  t.push('Карточки:');

  // ── MEMORY.TXT ──
  t.push('');
  t.push('========== SECTION: memory.txt ==========');
  t.push('RESEARCH MEMORY');
  t.push('===============');
  t.push('Опыт между проектами. Агент дополняет в конце каждого проекта.');
  t.push('При старте нового — читает и учитывает.');
  t.push('');
  t.push('ПОИСКОВЫЕ СТРАТЕГИИ');
  t.push('(какие базы данных дали лучшие результаты, какие запросы работают,');
  t.push(' какие операторы поиска полезны в твоей области)');
  t.push('');
  t.push('ИНСТРУМЕНТЫ');
  t.push('(стиль цитирования: APA/Harvard/..., настройки Zotero,');
  t.push(' как лучше структурировать notebook в NotebookLM)');
  t.push('');
  t.push('СТИЛЬ И ПРЕДПОЧТЕНИЯ');
  t.push('(формальность, длина секций, частые ошибки при написании,');
  t.push(' замечания рецензентов которые повторяются)');
  t.push('');
  t.push('ОБЛАСТЬ');
  t.push('(ключевые журналы, постоянные авторы, базовая терминология,');
  t.push(' какие теоретические рамки уже использовались)');
  t.push('');
  t.push('УРОКИ');
  t.push('(что шло не так, как исправили, что больше не повторять)');

  // ── PHASES.YAML ──
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

/* ── copy-to-clipboard on all pre blocks inside phases ── */
document.querySelectorAll('.phase pre').forEach(function(pre) {
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
