// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll for service cards
    const cards = document.querySelectorAll('.scard');
    
    // Set initial state
    cards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight stagger effect based on order
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, Array.from(cards).indexOf(entry.target) * 100);
                
                // Unobserve after revealing
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));

    // Interactive button clicks (micro-interactions)
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        ['mouseup', 'mouseleave'].forEach(evt => {
            btn.addEventListener(evt, function() {
                // Reset transform but keep hover transforms logic clean
                if(this.classList.contains('btn-primary') || this.classList.contains('scard')) {
                    // Let css handle hover transform gracefully by unsetting style.transform
                    setTimeout(() => { this.style.transform = ''; }, 150);
                } else {
                    this.style.transform = '';
                }
            });
        });
    });

    // Removed navbar scroll effect due to solid header

    // Simple smooth scrolling for anchor links
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const menuToggle = document.getElementById('mobile-menu');
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuToggle && !menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Close mobile menu when clicking a link (for non-anchor links)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (!link.getAttribute('href').startsWith('#')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
});
