/* ========================================
   HARISH B - PORTFOLIO SCRIPTS
   Video Editor & Motion Graphics Artist
   Premium Cinematic Experience
   ======================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initLoader();
    initCustomCursor();
    initNavigation();
    initScrollProgress();
    initScrollReveal();
    initSplitText();
    initCounterAnimation();
    initPortfolioFilter();
    initSmoothScroll();
    initParallax();
    initFormAnimation();
    initFloatingElements();
    initMouseTrail();
    initTiltEffect();
});

/* ========================================
   LOADER
   ======================================== */
function initLoader() {
    const loader = document.querySelector('.loader');
    const body = document.body;
    
    body.classList.add('loading');
    
    // Simulate loading time
    setTimeout(() => {
        loader.classList.add('hidden');
        body.classList.remove('loading');
        
        // Trigger hero animations after loader
        setTimeout(() => {
            document.querySelectorAll('.hero .reveal-up').forEach(el => {
                el.classList.add('revealed');
            });
        }, 300);
    }, 2500);
}

/* ========================================
   CUSTOM CURSOR
   ======================================== */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate cursor with lerp
    function animateCursor() {
        // Cursor follows immediately
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower with delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .tool-card, .skill-category');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Scroll effect
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ========================================
   SCROLL REVEAL ANIMATIONS
   ======================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay based on CSS variable
                const delay = getComputedStyle(entry.target).getPropertyValue('--delay') || '0s';
                const delayMs = parseFloat(delay) * 1000;
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delayMs);
                
                // Unobserve after revealing
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => {
        // Skip hero elements (handled by loader)
        if (!el.closest('.hero')) {
            observer.observe(el);
        }
    });
}

/* ========================================
   SPLIT TEXT ANIMATION
   ======================================== */
function initSplitText() {
    const splitElements = document.querySelectorAll('.split-text');
    
    splitElements.forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        
        // Split into characters
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${i * 0.03}s`;
            el.appendChild(span);
        });
    });
    
    // Observe for reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    splitElements.forEach(el => observer.observe(el));
}

/* ========================================
   COUNTER ANIMATION
   ======================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/* ========================================
   PORTFOLIO FILTER
   ======================================== */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    project.style.display = '';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   PARALLAX EFFECTS
   ======================================== */
function initParallax() {
    const heroContent = document.querySelector('.hero-content');
    const heroGradient = document.querySelector('.hero-gradient');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Hero parallax
        if (scrolled < windowHeight) {
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrolled / windowHeight);
            }
            if (heroGradient) {
                heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }
    });
}

/* ========================================
   FORM ANIMATION
   ======================================== */
function initFormAnimation() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.querySelector('.btn-text').textContent;
        
        // Animate button
        btn.querySelector('.btn-text').textContent = 'Sending...';
        btn.style.pointerEvents = 'none';
        
        // Simulate form submission
        setTimeout(() => {
            btn.querySelector('.btn-text').textContent = 'Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Reset form
            setTimeout(() => {
                form.reset();
                btn.querySelector('.btn-text').textContent = originalText;
                btn.style.background = '';
                btn.style.pointerEvents = '';
            }, 2000);
        }, 1500);
    });
    
    // Input focus animations
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

/* ========================================
   MAGNETIC BUTTON EFFECT
   ======================================== */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

/* ========================================
   TILT EFFECT FOR CARDS
   ======================================== */
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ========================================
   SCROLL PROGRESS INDICATOR
   ======================================== */
function initScrollProgress() {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    progress.innerHTML = '<div class="progress-bar"></div>';
    document.body.appendChild(progress);
    
    const progressBar = progress.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/* ========================================
   VIDEO MODAL (For Portfolio)
   ======================================== */
function initVideoModal() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('videoModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalCategory = modal.querySelector('.modal-category');
    const closeBtn = modal.querySelector('.modal-close');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.project-title').textContent;
            const category = card.querySelector('.project-category')?.textContent || 
                            card.getAttribute('data-category');
            
            modalTitle.textContent = title;
            modalCategory.textContent = category;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize additional effects
document.addEventListener('DOMContentLoaded', () => {
    initMagneticButtons();
    initTiltEffect();
    initVideoModal();
    initScrollProgress();
});

/* ========================================
   INTERSECTION OBSERVER FOR TOOL CARDS
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const toolCards = document.querySelectorAll('.tool-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.3 });
    
    toolCards.forEach(card => observer.observe(card));
});

/* ========================================
   TEXT SCRAMBLE EFFECT (Optional Enhancement)
   ======================================== */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

/* ========================================
   PRELOAD CRITICAL RESOURCES
   ======================================== */
function preloadResources() {
    // Preload fonts and critical images
    const preloadLinks = [
        { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap', as: 'style' }
    ];
    
    preloadLinks.forEach(link => {
        const el = document.createElement('link');
        Object.assign(el, link);
        document.head.appendChild(el);
    });
}

// Run preload
preloadResources();

/* ========================================
   PERFORMANCE OPTIMIZATIONS
   ======================================== */

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for high-frequency events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    // Any additional scroll-based animations
}, 16));

console.log('🎬 Portfolio loaded successfully - Harish B | Video Editor & Motion Graphics Artist');

/* ========================================
   FLOATING ELEMENTS ANIMATION
   ======================================== */
function initFloatingElements() {
    const shapes = document.querySelectorAll('.floating-shape');
    
    shapes.forEach((shape, index) => {
        // Random initial position adjustment
        const randomX = Math.random() * 50 - 25;
        const randomY = Math.random() * 50 - 25;
        
        // Animate with mouse movement
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 30;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 30;
            
            shape.style.transform = `translate(${randomX + moveX}px, ${randomY + moveY}px)`;
        });
    });
}

/* ========================================
   MOUSE TRAIL EFFECT
   ======================================== */
function initMouseTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: ${4 - (i * 0.15)}px;
            height: ${4 - (i * 0.15)}px;
            background: rgba(139, 92, 246, ${0.5 - (i * 0.02)});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(dot);
        trail.push({ element: dot, x: 0, y: 0 });
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            
            dot.x += (x - dot.x) * 0.3;
            dot.y += (y - dot.y) * 0.3;
            
            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';
            dot.element.style.opacity = '1';
            
            x = dot.x;
            y = dot.y;
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    // Only enable on desktop
    if (window.innerWidth > 768) {
        animateTrail();
    }
}

/* ========================================
   SMOOTH TEXT REVEAL ON SCROLL
   ======================================== */
function initSmoothAppear() {
    const elements = document.querySelectorAll('.smooth-appear');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${index * 0.1}s`;
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

/* ========================================
   ENHANCED TEXT SCRAMBLE EFFECT
   ======================================== */
function initTextScrambleEffect() {
    const elements = document.querySelectorAll('[data-scramble]');
    
    elements.forEach(el => {
        const originalText = el.textContent;
        const scrambler = new TextScramble(el);
        
        el.addEventListener('mouseenter', () => {
            scrambler.setText(originalText);
        });
    });
}

/* ========================================
   MAGNETIC EFFECT FOR BUTTONS
   ======================================== */
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn-primary, .social-link, .nav-cta');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialize additional effects on load
document.addEventListener('DOMContentLoaded', () => {
    initMagneticEffect();
    initSmoothAppear();
    initTextScrambleEffect();
});

/* ========================================
   INTERSECTION ANIMATIONS FOR SECTIONS
   ======================================== */
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Animate children with stagger
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('child-visible');
                });
            }
        });
    }, { threshold: 0.2 });
    
    sections.forEach(section => observer.observe(section));
}

/* ========================================
   ENHANCED PROJECT CARD INTERACTIONS
   ======================================== */
function initProjectCardEffects() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${-rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-10px)
                scale3d(1.02, 1.02, 1.02)
            `;
            
            // Move play button with cursor
            const playBtn = card.querySelector('.project-play');
            if (playBtn) {
                const moveX = (x / rect.width - 0.5) * 20;
                const moveY = (y / rect.height - 0.5) * 20;
                playBtn.style.transform = `translate(${moveX}px, ${moveY}px) scale(1)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            const playBtn = card.querySelector('.project-play');
            if (playBtn) {
                playBtn.style.transform = '';
            }
        });
    });
}

// Initialize project card effects
document.addEventListener('DOMContentLoaded', initProjectCardEffects);

/* ========================================
   TYPING EFFECT FOR HERO
   ======================================== */
function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(el => {
        const text = el.dataset.typing;
        const speed = parseInt(el.dataset.speed) || 100;
        el.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        };
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                observer.disconnect();
            }
        });
        
        observer.observe(el);
    });
}

/* ========================================
   SKILL BAR ANIMATIONS
   ======================================== */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.level-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.style.getPropertyValue('--level');
                entry.target.style.width = level;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        bar.style.width = '0';
        observer.observe(bar);
    });
}

document.addEventListener('DOMContentLoaded', initSkillBars);

/* ========================================
   SCROLL PROGRESS BAR
   ======================================== */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress .progress-bar');
    if (!progressBar) return;
    
    function updateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
}

/* ========================================
   TILT EFFECT FOR CARDS
   ======================================== */
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.project-card, .skill-category');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
        });
    });
}

/* ========================================
   MAGNETIC BUTTONS
   ======================================== */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

document.addEventListener('DOMContentLoaded', initMagneticButtons);

/* ========================================
   GLITCH TEXT EFFECT (Optional)
   ======================================== */
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(el => {
        const text = el.textContent;
        el.setAttribute('data-text', text);
    });
}

/* ========================================
   SMOOTH SECTION SCROLL SNAP
   ======================================== */
function initScrollSnap() {
    // Optional: Enable smooth scroll snapping for sections
    // This can be toggled based on preference
    const enableSnap = false;
    
    if (enableSnap) {
        document.documentElement.style.scrollSnapType = 'y mandatory';
        document.querySelectorAll('section').forEach(section => {
            section.style.scrollSnapAlign = 'start';
        });
    }
}

/* ========================================
   PREFERS REDUCED MOTION CHECK
   ======================================== */
function checkReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable heavy animations
        document.body.classList.add('reduced-motion');
        console.log('Reduced motion preference detected - animations simplified');
    }
}

checkReducedMotion();