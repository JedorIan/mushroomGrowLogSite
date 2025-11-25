document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('header');
  if (!container) return;

  // Determine path to header.html depending on folder depth
  const folderPrefix = '../';

  const folderPrefix = '';
  const pathToHeader = folderPrefix + 'header.html'; // assumes header.html is in the same folder as the page

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
