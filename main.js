document.addEventListener("DOMContentLoaded", function () {
    // Count how many folders deep this page is
    const pathParts = window.location.pathname
        .split("/")
        .filter(p => p.length > 0);

    // If the file is in root, pathParts length is 1 (the filename)
    // If it's in /mushrooms/page.html, length is 2, etc.
    const depth = pathParts.length - 1;

    // Build correct relative path
    let headerPath = "";
    for (let i = 0; i < depth; i++) {
        headerPath += "../";
    }
    headerPath += "header.html";

    // Load the header HTML
    fetch(headerPath)
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;
        })
        .catch(err => console.error("Header load failed:", err));
});
