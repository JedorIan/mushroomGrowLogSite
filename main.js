document.addEventListener("DOMContentLoaded", () => {
    // Always load header.html from the root
    fetch("/mushroomgrow/header.html")
        .then(response => response.text())
        .then(html => {
            const header = document.querySelector("header");
            if (header) header.innerHTML = html;
        })
        .catch(err => console.error("Header load failed:", err));
});

// Keep scroll variable update if you use it in CSS
document.addEventListener("scroll", () => {
    document.body.style.setProperty("--scroll", window.scrollY + "px");
});

document.addEventListener('change', (e) => {
    if (e.target.id === 'menuToggle') {
        const menu = document.getElementById('mobileMenu');
        menu.style.right = e.target.checked ? '0' : '-100%';
    }

    if (e.target.id === 'submenuMushrooms') {
        const submenu = e.target.nextElementSibling;
        submenu.style.display = e.target.checked ? 'block' : 'none';
    }

    if (e.target.id === 'submenuLogs') {
        const submenu = e.target.nextElementSibling;
        submenu.style.display = e.target.checked ? 'block' : 'none';
    }

    if (e.target.id === 'submenuBundles') {
        const submenu = e.target.nextElementSibling;
        submenu.style.display = e.target.checked ? 'block' : 'none';
    }
});