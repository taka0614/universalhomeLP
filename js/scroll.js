document.addEventListener('DOMContentLoaded', function() {
    const targetElements = document.querySelectorAll('.js_scroll');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('--isActive');
            }
        });
    });

    targetElements.forEach(element => {
        observer.observe(element);
    });
});