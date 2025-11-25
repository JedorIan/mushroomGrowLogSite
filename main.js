document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('header');
  if (!container) return;

  const repo = 'mushroomgrow'; // GitHub Pages repository name
  const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

  // If running locally → use relative paths
  // If on GitHub Pages → load from /mushroomgrow/
  const rootPrefix = isLocal ? '' : `/${repo}/`;

  // Count how many folders deep this page is
  const depth = window.location.pathname.split('/').filter(Boolean).length - 1;

  // Local: use ../ based on depth
  const localPrefix = '../'.repeat(depth);

  // Choose correct prefix depending on environment
  const prefix = isLocal ? localPrefix : rootPrefix;

  fetch(prefix + 'header.html')
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;

      // Fix links inside the header
      container.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');

        if (!href || href.startsWith('http') || href.startsWith('#')) return;

        if (isLocal) {
          // Local: fix to relative path
          link.setAttribute('href', localPrefix + href);
        } else {
          // GitHub Pages: always load from /mushroomgrow/
          link.setAttribute('href', rootPrefix + href);
        }
      });
    })
    .catch(err => console.error('Header load error:', err));
});
