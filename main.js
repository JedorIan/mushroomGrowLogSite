document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('header');
  if (!container) return;

  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

  // Detect GitHub Pages repo name automatically
  const path = window.location.pathname.split('/');
  const repo = path.length > 2 ? `/${path[1]}/` : '/';

  // Count how deep this page is (folders)
  const depth = path.filter(Boolean).length - 1;

  // Local: go up as many folders as needed
  const localPrefix = '../'.repeat(depth);

  // GitHub Pages: root is either "/" or "/repo/"
  const rootPrefix = isLocal ? localPrefix : repo;

  fetch(rootPrefix + 'header.html')
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;

      // Fix links
      container.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#')) return;

        if (isLocal) {
          link.setAttribute('href', localPrefix + href);
        } else {
          link.setAttribute('href', repo + href);
        }
      });
    })
    .catch(err => console.error('Header load error:', err));
});
