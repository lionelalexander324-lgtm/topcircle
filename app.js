// Session-scoped welcome animation; skip is always available.
(() => {
  const splash = document.getElementById('welcomeSplash');
  const skip = document.getElementById('splashSkip');
  if (!splash || !skip) return;
  const key = 'tc-welcome-v5-viewed';
  let seen = false;
  try { seen = sessionStorage.getItem(key) === 'yes'; } catch (_) {}
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (seen || reduced) return;
  let timer;
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    try { sessionStorage.setItem(key, 'yes'); } catch (_) {}
    splash.classList.add('is-exiting');
    document.body.classList.remove('splash-open');
    window.setTimeout(() => { splash.hidden = true; skip.disabled = true; }, 600);
  };
  splash.hidden = false;
  document.body.classList.add('splash-open');
  skip.addEventListener('click', finish);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') finish(); });
  skip.focus({ preventScroll: true });
  timer = window.setTimeout(finish, 2700);
})();
