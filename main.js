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
