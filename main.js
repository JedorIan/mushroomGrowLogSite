document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('header');
  if (!container) return;

  // 1️⃣ Detect how deep the current page is relative to root
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const depth = pathParts.length > 1 ? pathParts.length - 1 : 0;

  // 2️⃣ Determine path to header.html relative to current page
  let pathToHeader = '';
  for (let i = 0; i < depth; i++) pathToHeader += '../';
  pathToHeader += 'header.html';

  fetch(pathToHeader)
    .then(res => {
      if (!res.ok) throw new Error('Header not found');
      return res.text();
    })
    .then(data => {
      container.innerHTML = data;

      // 3️⃣ Fix relative links inside the header
      container.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#')) return;

        // Determine if link is root or folder-relative
        const isRootLink = href.startsWith('/') || href === 'index.html';
        if (!isRootLink) {
          // Prepend correct number of "../" for current depth
          let prefix = '';
          for (let i = 1; i < depth; i++) prefix += '../';
          link.setAttribute('href', prefix + href);
        }
      });
    })
    .catch(err => console.error('Error loading header:', err));
});
