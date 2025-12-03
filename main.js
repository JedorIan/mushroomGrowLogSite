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

document.addEventListener("scroll", () => {
    document.body.style.setProperty("--scroll", window.scrollY + "px");
})

function openMenu() {
    document.getElementById("mobileMenu").style.right = "0";
}

function closeMenu() {
    document.getElementById("mobileMenu").style.right = "-100%";
}

document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll ('#mobileMenu > ul > li > a');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const submenu = item.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                e.preventDefault();
                submenu.style.display = (submenu.style.display === 'blobk') ? 'none' : 'block';
            }
        });
    });
});