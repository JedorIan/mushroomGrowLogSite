document.addEventListener("DOMContentLoaded", () => {
    // Always load header.html from the root
    fetch("/header.html")
        .then(response => response.text())
        .then(html => {
            const header = document.querySelector("header");
            if (header) header.innerHTML = html;
        })
        .catch(err => console.error("Header load failed:", err));
});