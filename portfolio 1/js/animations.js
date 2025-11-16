// Advanced animations for the portfolio
class PortfolioAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.createFloatingElements();
        this.initHeroAnimations();
        this.initProjectHoverEffects();
        this.initScrollAnimations();
    }
    
    // Create dynamic floating elements
    createFloatingElements() {
        const container = document.querySelector('.floating-elements');
        if (!container) return;
        
        // Create multiple floating elements dynamically
        for (let i = 0; i < 5; i++) {
            const element = document.createElement('div');
            element.className = 'dynamic-float';
            element.style.cssText = `
                position: absolute;
                width: ${Math.random() * 40 + 20}px;
                height: ${Math.random() * 40 + 20}px;
                background: rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1);
                border-radius: ${Math.random() > 0.5 ? '50%' : '10px'};
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float${Math.floor(Math.random() * 3) + 1} ${Math.random() * 10 + 5}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(element);
        }
    }
    
    // Hero section animations
    initHeroAnimations() {
        // Text typing effect
        this.typeWriterEffect('.hero-title', 'Hello, I\'m Aditya Pandita', 100);
        
        // Background animation
        this.animateBackground();
    }
    
    // Typewriter effect for hero text
    typeWriterEffect(element, text, speed) {
        const el = document.querySelector(element);
        if (!el) return;
        
        let i = 0;
        el.textContent = '';
        
        function type() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Background animation
    animateBackground() {
        const hero = document.querySelector('.hero');
        let hue = 0;
        
        setInterval(() => {
            hue = (hue + 0.5) % 360;
            if (hero) {
                hero.style.background = `linear-gradient(135deg, 
                    hsl(${hue}, 70%, 60%), 
                    hsl(${(hue + 60) % 360}, 70%, 50%))`;
            }
        }, 50);
    }
    
    // Project card hover effects
    initProjectHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            });
        });
    }
    
    // Scroll animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Different animation based on element type
                    if (entry.target.classList.contains('project-card')) {
                        this.animateProjectCard(entry.target);
                    } else if (entry.target.classList.contains('section-title')) {
                        this.animateSectionTitle(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        document.querySelectorAll('.project-card, .section-title, .hero-buttons').forEach(el => {
            observer.observe(el);
        });
    }
    
    animateProjectCard(card) {
        // Stagger animation for project cards
        const index = Array.from(card.parentElement.children).indexOf(card);
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 200);
    }
    
    animateSectionTitle(title) {
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
        title.style.transition = 'all 0.8s ease';
    }
}

// Individual animation keyframes (added to CSS through JavaScript)
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float2 {
            0%, 100% { transform: translateX(0px) rotate(0deg); }
            50% { transform: translateX(20px) rotate(90deg); }
        }
        
        @keyframes float3 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-15px) translateX(15px); }
        }
        
        .animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addDynamicStyles();
    new PortfolioAnimations();
});
// Add this function to the PortfolioAnimations class
animateSkillBars(); {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Call this in the init() method
init(); {
    this.createFloatingElements();
    this.initHeroAnimations();
    this.initProjectHoverEffects();
    this.initScrollAnimations();
    this.animateSkillBars(); // Add this line
}
// Add these methods to the PortfolioAnimations class in js/animations.js

// Project filtering functionality
initProjectFiltering(); {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, 100);
                    } else {
                        card.classList.remove('visible');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Animate statistics numbers
animateStats(); {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const element = entry.target;
                let current = 0;
                const increment = target / 100;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current) + '+';
                    }
                }, 20);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(num => {
        observer.observe(num);
    });
}

// Update the init() method to include these new features
init(); {
    this.createFloatingElements();
    this.initHeroAnimations();
    this.initProjectHoverEffects();
    this.initScrollAnimations();
    this.animateSkillBars();
    this.initProjectFiltering(); // Add project filtering
    this.animateStats(); // Add stats animation
}
// Add this method to the PortfolioAnimations class
initContactPageEffects(); {
    // Animate contact info cards on scroll
    const infoCards = document.querySelectorAll('.info-card');
    
    const infoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = $;{index * 0.2}s;
        infoObserver.observe(card);
    });
    
    // Animate form elements
    const formElements = document.querySelectorAll('.form-group, .submit-btn');
    formElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-30px)';
        el.style.transition = 'all 0.6s ease';
        el.style.transitionDelay = $;{index * 0.1}s;
    });
    
    // Animate when form comes into view
    const formObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = entry.target.querySelectorAll('.form-group, .submit-btn');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateX(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });
    
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formObserver.observe(formContainer);
    }
}

// Update the init method to include contact page effects
init(); {
    this.createFloatingElements();
    this.initHeroAnimations();
    this.initProjectHoverEffects();
    this.initScrollAnimations();
    this.animateSkillBars();
    this.initProjectFiltering();
    this.animateStats();
    this.initContactPageEffects(); // Add contact page effects
}