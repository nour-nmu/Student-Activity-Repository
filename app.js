// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', function () {
    let currentPage = window.location.pathname.split('/').pop() || 'index.html';
    let navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        let href = link.getAttribute('href');
        // Check if link matches current page
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
            link.parentElement.classList.add('active'); // Add to li for ::after styling
        }
    });
});
