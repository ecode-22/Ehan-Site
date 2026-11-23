// Ehan Badenhorst Portfolio - Enhanced Features
console.log('🚀 Portfolio features loading...');

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions) : null;

// Observe all cards and sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card, .stat-item, .skill-item');
    animatedElements.forEach(el => {
        if (!observer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('nav');

    if (menuToggle && navigation) {
        const menuLabel = menuToggle.querySelector('.menu-label');
        const menuList = navigation.querySelector('#site-navigation');
        const menuLinks = menuList ? menuList.querySelectorAll('a') : [];
        const homeLink = navigation.querySelector('h1 a');

        const closeMenu = (restoreFocus = false) => {
            navigation.classList.remove('menu-open');
            document.body.classList.remove('menu-is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            if (menuLabel) menuLabel.textContent = 'Menu';
            if (restoreFocus) menuToggle.focus();
        };

        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
            if (isOpen) {
                closeMenu();
                return;
            }

            navigation.classList.add('menu-open');
            document.body.classList.add('menu-is-open');
            menuToggle.setAttribute('aria-expanded', 'true');
            if (menuLabel) menuLabel.textContent = 'Close';
            menuLinks[0]?.focus();
        });

        homeLink?.addEventListener('click', () => closeMenu());
        menuLinks.forEach(link => link.addEventListener('click', () => closeMenu()));

        menuList?.addEventListener('click', event => {
            if (event.target === menuList) closeMenu();
        });

        document.addEventListener('keydown', event => {
            if (menuToggle.getAttribute('aria-expanded') !== 'true') return;

            if (event.key === 'Escape') {
                closeMenu(true);
                return;
            }

            if (event.key !== 'Tab') return;

            const focusableElements = [
                homeLink,
                menuToggle,
                ...menuLinks,
                navigation.querySelector('.theme-toggle')
            ].filter(element => element && element.getClientRects().length > 0);
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        });
    }

    console.log('✨ Portfolio features ready!');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.getElementById(this.hash.slice(1));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
            block: 'start'
        });
    });
});

// Mobile nav hides while scrolling down and reappears when scrolling up
const nav = document.querySelector('nav');
if (nav) {
    let lastScrollY = window.scrollY;

    const handleNavScroll = () => {
        if (document.body.classList.contains('editorial-site')) {
            nav.classList.remove('nav-hidden');
            return;
        }

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