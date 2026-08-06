 
        // Mobile Navigation
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // GSAP Animations
        function initAnimations() {
            gsap.registerPlugin(ScrollTrigger);

            // Hero section animation
            gsap.from('.hero-content h1', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });

            gsap.from('.hero-content p', {
                duration: 1,
                y: 50,
                opacity: 0,
                delay: 0.3,
                ease: 'power3.out'
            });

            gsap.from('.cta-button', {
                duration: 1,
                y: 50,
                opacity: 0,
                delay: 0.6,
                ease: 'power3.out'
            });

            gsap.from('.social-links a', {
                duration: 1,
                y: 50,
                opacity: 0,
                delay: 0.9,
                stagger: 0.1,
                ease: 'power3.out'
            });

            gsap.from('.stat-item', {
                duration: 1,
                y: 50,
                opacity: 0,
                delay: 1.2,
                stagger: 0.1,
                ease: 'power3.out'
            });

            // Section animations
            gsap.utils.toArray('section').forEach(section => {
                if (section.id !== 'hero') {
                    gsap.from(section, {
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                            toggleActions: 'play none none none'
                        },
                        y: 50,
                        opacity: 0,
                        duration: 1,
                        ease: 'power3.out'
                    });
                }
            });

            // Skill cards animation
            gsap.utils.toArray('.skill-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: 'power3.out'
                });
            });

            // Project cards animation
            gsap.utils.toArray('.project-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: 'power3.out'
                });
            });

            // Testimonial cards animation
            gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    x: i % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: 'power3.out'
                });
            });
        }

        // Create floating elements
        function createFloatingElements() {
            const colors = ['rgba(0, 168, 255, 0.1)', 'rgba(0, 168, 255, 0.07)', 'rgba(0, 168, 255, 0.05)'];
            
            for (let i = 0; i < 10; i++) {
                const element = document.createElement('div');
                element.classList.add('floating-element');
                
                // Random properties
                const size = Math.random() * 200 + 50;
                const posX = Math.random() * window.innerWidth;
                const posY = Math.random() * window.innerHeight;
                const color = colors[Math.floor(Math.random() * colors.length)];
                const blur = Math.random() * 10 + 5;
                const duration = Math.random() * 20 + 10;
                const delay = Math.random() * 5;
                
                // Apply styles
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;
                element.style.left = `${posX}px`;
                element.style.top = `${posY}px`;
                element.style.background = color;
                element.style.backdropFilter = `blur(${blur}px)`;
                element.style.webkitBackdropFilter = `blur(${blur}px)`;
                
                // Add to body
                document.body.appendChild(element);
                
                // Animate with GSAP
                gsap.to(element, {
                    x: `+=${(Math.random() - 0.5) * 100}`,
                    y: `+=${(Math.random() - 0.5) * 100}`,
                    duration: duration,
                    delay: delay,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        }

        // Dark/Light Mode Toggle
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        let isDarkMode = true;

        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            
            if (isDarkMode) {
                document.body.style.backgroundColor = '#0a0a0a';
                document.body.style.color = '#ffffff';
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                document.body.style.backgroundColor = '#f5f5f5';
                document.body.style.color = '#333333';
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });

        // Animate progress bars on scroll
        function animateProgressBars() {
            const progressBars = document.querySelectorAll('.progress-fill');
            
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                
                ScrollTrigger.create({
                    trigger: bar,
                    start: 'top 80%',
                    onEnter: () => {
                        gsap.to(bar, {
                            width: width,
                            duration: 1.5,
                            ease: 'power3.out'
                        });
                    }
                });
            });
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initAnimations();
            createFloatingElements();
            animateProgressBars();
        });
    