// Ehan Badenhorst Portfolio - Enhanced Features
console.log('🚀 Portfolio features loading...');

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .stat-item, .skill-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    console.log('✨ Portfolio features ready!');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile nav hides while scrolling down and reappears when scrolling up
const nav = document.querySelector('nav');
if (nav) {
    let lastScrollY = window.scrollY;

    const handleNavScroll = () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('nav-hidden');
            return;
        }

        if (window.scrollY > lastScrollY && window.scrollY > 80) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }

        lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    window.addEventListener('resize', handleNavScroll);
    handleNavScroll();
}