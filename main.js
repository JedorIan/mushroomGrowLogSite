document.addEventListener('DOMContentLoaded', () => {
  // Find the element where you want to insert the header
  // This can be <header>, <div id="header">, etc.
  const container = document.querySelector('header'); // or 'header', etc.
  if (!container) return;

  // Determine path to header.html depending on page location
  const pathToHeader = window.location.pathname.includes('/mushrooms/')
                       ? '../header.html' // pages in /mushrooms/
                       : './header.html'; // pages in root

  fetch(pathToHeader)
    .then(res => {
      if (!res.ok) throw new Error('Header not found');
      return res.text();
    })
    .then(data => {
      container.innerHTML = data;
    })
    .catch(err => console.error('Error loading header:', err));
});