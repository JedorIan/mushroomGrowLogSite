document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('header');
  if (!container) return;

  // 1️⃣ Determine the base path
  // On GitHub Pages: window.location.origin = https://username.github.io
  // Locally: use relative path from the current HTML file
  const isLocal = window.location.protocol === 'file:';
  const pathToHeader = isLocal ? 'header.html' : '/header.html';

  fetch(pathToHeader)
    .then(res => {
      if (!res.ok) throw new Error('Header not found');
      return res.text();
    })
    .then(data => {
      container.innerHTML = data;

      // 2️⃣ Fix links inside header
      container.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#')) return;

        if (isLocal) {
          // Locally: keep relative paths (relative to current HTML file)
          link.setAttribute('href', href);
        } else {
          // GitHub Pages: prepend slash for root-relative links
          if (!href.startsWith('/')) link.setAttribute('href', '/' + href);
        }
      });
    })
    .catch(err => console.error('Error loading header:', err));
});
