// Mobile Navigation Toggle & Overlay Logic
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const mobileOverlay = document.getElementById("mobile-overlay");

function toggleMenu() {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    mobileOverlay.classList.toggle("active");
    
    // Prevent body scroll when menu is open
    if (navLinks.classList.contains("active")) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Open menu when clicking hamburger
hamburger.addEventListener("click", toggleMenu);

// Close menu when clicking overlay
mobileOverlay.addEventListener("click", toggleMenu);

// Close menu when clicking a link inside the drawer
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
            toggleMenu();
        }
    });
});

// Navbar Scroll Effect & Active Link Highlighting
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Navbar background change
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active Link Highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Adjust offset for navbar height
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinkItems.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active-link');
        }
    });
});

// Typing Animation for Hero Subtitle
const typingText = document.getElementById('typing-text');
const roles = ["Full Stack Developer", "MERN Stack Expert", "React & Next.js Developer", "Backend Engineer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before typing next
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing effect on load
document.addEventListener('DOMContentLoaded', typeEffect);

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animations
        gsap.from('.hero-badge', { duration: 1, y: -20, opacity: 0, ease: 'power3.out' });
        gsap.from('.hero-content h1', { duration: 1, y: 50, opacity: 0, delay: 0.1, ease: 'power3.out' });
        gsap.from('.hero-subtitle', { duration: 1, y: 50, opacity: 0, delay: 0.2, ease: 'power3.out' });
        gsap.from('.hero-content p', { duration: 1, y: 50, opacity: 0, delay: 0.3, ease: 'power3.out' });
        gsap.from('.hero-buttons', { duration: 1, y: 50, opacity: 0, delay: 0.4, ease: 'power3.out' });
        gsap.from('.social-links a', { duration: 1, y: 50, opacity: 0, delay: 0.6, stagger: 0.1, ease: 'power3.out' });
        gsap.from('.stats-container', { duration: 1, y: 50, opacity: 0, delay: 0.8, ease: 'power3.out' });
        gsap.from('.hero-image-wrapper', { duration: 1.2, x: 100, opacity: 0, delay: 0.5, ease: 'power3.out' });
        gsap.from('.floating-icon', { duration: 1, scale: 0, opacity: 0, delay: 1, stagger: 0.2, ease: 'back.out(1.7)' });

        // Section Animations
        gsap.utils.toArray('section').forEach(section => {
            if (section.id !== 'hero') {
                gsap.from(section, {
                    scrollTrigger: { trigger: section, start: 'top 80%' },
                    y: 50, opacity: 0, duration: 1, ease: 'power3.out'
                });
            }
        });

        // Card Animations
        gsap.utils.toArray('.skill-card, .project-card, .contact-item').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 85%' },
                y: 50, opacity: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out'
            });
        });

        // Animate Progress Bars
        gsap.utils.toArray('.progress-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            ScrollTrigger.create({
                trigger: bar,
                start: 'top 85%',
                onEnter: () => gsap.to(bar, { width: width, duration: 1.5, ease: 'power3.out' })
            });
        });
    }
});

// Dark/Light Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLightMode = document.body.classList.contains('light-mode');
    themeIcon.classList.toggle('fa-sun', isLightMode);
    themeIcon.classList.toggle('fa-moon', !isLightMode);
});