document.addEventListener('DOMContentLoaded', () => {
  const headerElement = document.querySelector('header');
  if (!headerElement) return;

  // Determine path to header.html depending on page location
  let pathToHeader = window.location.pathname.includes('/mushrooms/')
                     ? '../header.html'  // pages inside /mushrooms/
                     : './header.html';  // pages in root

  fetch(pathToHeader)
    .then(res => {
      if (!res.ok) throw new Error('Header not found');
      return res.text();
    })
    .then(data => {
      headerElement.innerHTML = data;
    })
    .catch(err => console.error('Error loading header:', err));
});