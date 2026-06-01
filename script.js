/* ── Nav toggle ───────────────────────── */
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

/* ── Scroll reveal ────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

/* ── Footer year ──────────────────────── */
const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();

/* ── Timeline filter ──────────────────── */
const filterBar = document.getElementById('filter-bar');
if (filterBar) {
  const btns = filterBar.querySelectorAll('.tl-filter-btn');
  const monthBlocks = document.querySelectorAll('.tl-month-block');

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button
      btns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      monthBlocks.forEach((block) => {
        if (filter === 'all') {
          block.classList.remove('hidden');
          // Show all entries
          block.querySelectorAll('.tl-entry').forEach(e => e.style.display = '');
        } else {
          const types = (block.dataset.types || '').split(' ');
          if (types.includes(filter)) {
            block.classList.remove('hidden');
            // Hide entries that don't match the filter
            block.querySelectorAll('.tl-entry').forEach(entry => {
              entry.style.display = entry.dataset.type === filter ? '' : 'none';
            });
          } else {
            block.classList.add('hidden');
          }
        }
      });

      // Hide year blocks that have no visible months
      document.querySelectorAll('.tl-year-block').forEach(yearBlock => {
        const visibleMonths = yearBlock.querySelectorAll('.tl-month-block:not(.hidden)');
        yearBlock.style.display = visibleMonths.length === 0 ? 'none' : '';
      });
    });
  });
}
