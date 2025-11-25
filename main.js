document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('header');
  if (!container) return;

  // 1️⃣ Determine the current folder (if any)
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  // Example: /grows/page.html → pathParts = ['grows', 'page.html']
  const currentFolder = pathParts.length > 1 ? pathParts[pathParts.length - 2] : '';

  // 2️⃣ Determine path to header.html
  const pathToHeader = currentFolder ? `../header.html` : './header.html';

  fetch(pathToHeader)
    .then(res => {
      if (!res.ok) throw new Error('Header not found');
      return res.text();
    })
    .then(data => {
      container.innerHTML = data;

      // 3️⃣ Fix relative links inside the inserted header
      container.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('#')) return;

        // Prepend folder only if link isn’t already absolute and isn’t pointing to another folder
        if (currentFolder && !href.startsWith(`${currentFolder}/`)) {
          link.setAttribute('href', `${currentFolder}/${href}`);
        }
      });
    })
    .catch(err => console.error('Error loading header:', err));
});
