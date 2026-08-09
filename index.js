// Mobile Navigation Toggle & Overlay Logic
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const mobileOverlay = document.getElementById("mobile-overlay");
const drawerClose = document.getElementById("drawer-close");

function toggleMenu() {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    mobileOverlay.classList.toggle("active");
    
    // Prevent body scroll when menu is open
    if (navLinks.classList.contains("active")) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Open menu when clicking hamburger
hamburger.addEventListener("click", toggleMenu);

// Close menu when clicking overlay or drawer close button
mobileOverlay.addEventListener("click", toggleMenu);
if (drawerClose) {
    drawerClose.addEventListener("click", toggleMenu);
}

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
const roles = ["Full Stack Developer", "React Expert", "Next.js Specialist"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;
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
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', typeEffect);
} else {
    typeEffect();
}

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Entrance Animation (Fade-In & Slide-Up for Hero Content)
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        heroTl.fromTo(
            ['.hero-badge', '.hero-content h1', '.hero-subtitle', '.hero-content p', '.hero-buttons', '.social-links', '.stats-container'],
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, delay: 0.1 }
        )
        .fromTo('.hero-image-wrapper',
            { opacity: 0, x: 60 },
            { opacity: 1, x: 0, duration: 1 },
            "-=0.6"
        )
        .fromTo('.floating-icon',
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.7)' },
            "-=0.5"
        );

        // Section Animations (About, Skills, Projects, Contact Fade-In & Slide-Up)
        gsap.utils.toArray('section').forEach(section => {
            if (section.id !== 'hero') {
                gsap.fromTo(section,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 82%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }
        });

        // Skills Cards Scroll Reveal Staggered Animation
        gsap.from('.skill-card', {
            scrollTrigger: {
                trigger: '.skills-container',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out'
        });

        // Projects Cards Scroll Reveal Staggered Animation
        gsap.from('.project-card', {
            scrollTrigger: {
                trigger: '.projects-container',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });

        // Contact Details Scroll Reveal
        gsap.from('.contact-item', {
            scrollTrigger: {
                trigger: '.contact-details',
                start: 'top 85%'
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }
});

// Dark/Light Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        themeIcon.classList.toggle('fa-sun', isLightMode);
        themeIcon.classList.toggle('fa-moon', !isLightMode);
    });
}

// Contact Form Real-time Validation & WhatsApp Submission Logic
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const fields = [
        {
            input: nameInput,
            errorEl: document.getElementById("name-error"),
            validate: (val) => {
                if (!val) return "Name is required.";
                if (val.length < 2) return "Name must be at least 2 characters.";
                return "";
            }
        },
        {
            input: emailInput,
            errorEl: document.getElementById("email-error"),
            validate: (val) => {
                if (!val) return "Email address is required.";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(val)) return "Please enter a valid email address.";
                return "";
            }
        },
        {
            input: subjectInput,
            errorEl: document.getElementById("subject-error"),
            validate: (val) => {
                if (!val) return "Subject is required.";
                if (val.length < 3) return "Subject must be at least 3 characters.";
                return "";
            }
        },
        {
            input: messageInput,
            errorEl: document.getElementById("message-error"),
            validate: (val) => {
                if (!val) return "Message is required.";
                if (val.length < 5) return "Message must be at least 5 characters.";
                return "";
            }
        }
    ];

    function validateField(fieldConfig) {
        if (!fieldConfig.input) return true;
        const val = fieldConfig.input.value.trim();
        const errorMsg = fieldConfig.validate(val);
        
        if (errorMsg) {
            fieldConfig.input.classList.add("invalid");
            fieldConfig.input.classList.remove("valid");
            if (fieldConfig.errorEl) {
                fieldConfig.errorEl.textContent = errorMsg;
                fieldConfig.errorEl.classList.add("show");
            }
            return false;
        } else {
            fieldConfig.input.classList.remove("invalid");
            fieldConfig.input.classList.add("valid");
            if (fieldConfig.errorEl) {
                fieldConfig.errorEl.textContent = "";
                fieldConfig.errorEl.classList.remove("show");
            }
            return true;
        }
    }

    // Attach real-time event listeners ('input' and 'blur')
    fields.forEach(fieldConfig => {
        if (!fieldConfig.input) return;

        fieldConfig.input.addEventListener("input", () => {
            validateField(fieldConfig);
        });

        fieldConfig.input.addEventListener("blur", () => {
            validateField(fieldConfig);
        });
    });

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
        let isValid = true;
        let firstInvalidInput = null;

        fields.forEach(fieldConfig => {
            const fieldValid = validateField(fieldConfig);
            if (!fieldValid) {
                isValid = false;
                if (!firstInvalidInput) {
                    firstInvalidInput = fieldConfig.input;
                }
            }
        });

        if (!isValid) {
            if (firstInvalidInput) {
                firstInvalidInput.focus();
            }
            return;
        }

        // All fields are valid -> construct WhatsApp message & trigger success confetti
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        // Confetti Celebration Effect
        if (typeof confetti === "function") {
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#00a8ff', '#00d2d3', '#5f27cd', '#ff9f43', '#2ed573']
            });
            setTimeout(() => {
                confetti({
                    particleCount: 60,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 }
                });
                confetti({
                    particleCount: 60,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 }
                });
            }, 200);
        }

        // Show Toast Feedback
        showSuccessToast("Message validated! Redirecting to WhatsApp...");

        const formattedText = `*New Portfolio Contact Message*\n\n` +
            `👤 *Name:* ${name}\n` +
            `📧 *Email:* ${email}\n` +
            `📌 *Subject:* ${subject}\n` +
            `💬 *Message:* ${message}`;

        const whatsappNumber = "923404768806";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedText)}`;

        setTimeout(() => {
            window.open(whatsappUrl, "_blank");
        }, 900);
    });
}

// Success Toast Helper Function
function showSuccessToast(msg) {
    let toast = document.querySelector(".form-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.className = "form-toast";
        toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${msg}</span>`;
        document.body.appendChild(toast);
    } else {
        toast.querySelector("span").textContent = msg;
    }
    
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}

// Scroll to Top Logic
const scrollToTopBtn = document.getElementById("scroll-to-top");
const heroSection = document.getElementById("hero");

if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
        const heroHeight = heroSection ? heroSection.offsetHeight : 300;
        if (window.scrollY > heroHeight - 100) {
            scrollToTopBtn.classList.add("active");
        } else {
            scrollToTopBtn.classList.remove("active");
        }
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// Copy Email & Toast Notification Logic
const copyEmailBtn = document.getElementById("copy-email-btn");
const emailAddress = "techaliraza838@gmail.com";
let toastTimer;

function triggerToast(message = "Email copied to clipboard!") {
    const toast = document.getElementById("toast-notification");
    if (!toast) return;

    const toastMsg = toast.querySelector(".toast-message");
    if (toastMsg) toastMsg.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const onSuccess = () => {
            triggerToast("Email copied to clipboard!");

            const icon = copyEmailBtn.querySelector("i");
            const span = copyEmailBtn.querySelector("span");

            if (icon) icon.className = "fas fa-check";
            if (span) span.textContent = "Copied!";
            copyEmailBtn.classList.add("copied");

            setTimeout(() => {
                if (icon) icon.className = "far fa-copy";
                if (span) span.textContent = "Copy";
                copyEmailBtn.classList.remove("copied");
            }, 2200);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(emailAddress).then(onSuccess).catch(() => {
                fallbackCopyText(emailAddress, onSuccess);
            });
        } else {
            fallbackCopyText(emailAddress, onSuccess);
        }
    });
}

function fallbackCopyText(text, callback) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand("copy");
        if (callback) callback();
    } catch (err) {
        console.error("Copy failed", err);
    }
    document.body.removeChild(textarea);
}