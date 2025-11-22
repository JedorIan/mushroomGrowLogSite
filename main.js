document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('header');
  if (!container) return;

  // Determine path to header.html depending on folder depth
  const pathToHeader = window.location.pathname.includes('/mushrooms/')
                       ? '../header.html'
                       : './header.html';

  fetch(pathToHeader)
    .then(res => {
      if (!res.ok) throw new Error('Header not found');
      return res.text();
    })
    .then(data => {
      container.innerHTML = data;

      // Fix relative links inside the inserted header
      if (window.location.pathname.includes('/mushrooms/')) {
        container.querySelectorAll('a').forEach(link => {
          const href = link.getAttribute('href');
          link.setAttribute('href', '../' + href);
        });
      }
    })
    .catch(err => console.error('Error loading header:', err));
});