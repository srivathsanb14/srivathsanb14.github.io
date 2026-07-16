(function () {
    function initMobileNav() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinksEl = document.getElementById('nav-links');
        if (!navToggle || !navLinksEl) return;

        navToggle.addEventListener('click', () => {
            const isOpen = navLinksEl.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        navLinksEl.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinksEl.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    function initNavbarScroll() {
        const navbar = document.querySelector('.main-nav');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        });
    }

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.length < 2) return;
                const target = document.querySelector(href);
                if (!target) return;
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    function initScrollAnimations(selectors) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('animate-in');
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

        document.querySelectorAll(selectors).forEach(el => observer.observe(el));
    }

    function initBackToTop() {
        const backToTop = document.getElementById('back-to-top');
        if (!backToTop) return;

        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.pageYOffset > 500);
        });
    }

    function initStickyCta() {
        const stickyCta = document.getElementById('sticky-cta');
        if (!stickyCta) return;

        window.addEventListener('scroll', () => {
            stickyCta.classList.toggle('visible', window.pageYOffset > 400);
        });
    }

    function initHeroParallax() {
        const hero = document.getElementById('home');
        const orb1 = document.getElementById('orb-1');
        const orb2 = document.getElementById('orb-2');
        const orb3 = document.getElementById('orb-3');
        if (!hero || !orb1 || !orb2 || !orb3) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const move = (el, factor) => {
                el.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            };
            move(orb1, 30);
            move(orb2, -25);
            move(orb3, 20);
        });

        hero.addEventListener('mouseleave', () => {
            [orb1, orb2, orb3].forEach(el => { el.style.transform = ''; });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const page = document.body.dataset.page || 'page';

        initMobileNav();
        initNavbarScroll();
        initBackToTop();

        if (page === 'home') {
            initSmoothScroll();
        } else if (page === 'work') {
            initSmoothScroll();
            initScrollAnimations('.project-card, .pub-card, .timeline-item, .recognition-card');
        } else {
            initScrollAnimations('.project-card, .pub-card, .timeline-item, .blog-card-modern, .edu-card, .skill-card');
        }
    });
})();
