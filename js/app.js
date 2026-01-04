
document.addEventListener('DOMContentLoaded', function () {
    let currentPage = window.location.pathname.split('/').pop();
    let navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(function (links) {
        let href = links.getAttribute('href');
        if (href === currentPage) {
            links.classList.add('active');
        }
    });
});
