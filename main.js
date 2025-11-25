document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('header');
  if (!container) return;

  // 1️⃣ Determine relative path to header.html
  // This assumes header.html is in the root of the repo
  const currentPathParts = window.location.pathname.split('/').filter(Boolean);
  const depth = currentPathParts.length - 1; // number of folders deep

  // Construct relative path: '../' repeated 'depth' times
  let pathToHeader = '';
  for (let i = 0; i < depth; i++) pathToHeader += '../';
  pathToHeader += 'header.html';

  // 2️⃣ Fetch and insert header
  fetch(pathToHeader)
    .then(res => {
      if (!res.ok) throw new Error('Header not found');
      return res.text();
    })
    .then(data => {
      container.innerHTML = data;

      // 3️⃣ Fix relative links in the header
      container.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#')) return;

        // For local links, adjust relative path based on depth
        // Skip links that already use '../' (already relative)
        if (!href.startsWith('../')) {
          let prefix = '';
          for (let i = 1; i < depth; i++) prefix += '../';
          link.setAttribute('href', prefix + href);
        }
      });
    })
    .catch(err => console.error('Error loading header:', err));
});
