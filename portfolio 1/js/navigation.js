// Navigation and page transition effects
class PortfolioNavigation {
    constructor() {
        this.currentPage = window.location.pathname.split('/').pop();
        this.init();
    }
    
    init() {
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupPageTransitions();
        this.setupBackToTop();
    }
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Set active navigation based on current page
    setupActiveNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = this.getCurrentPage();
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === '')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Get current page name
    getCurrentPage() {
        let path = window.location.pathname;
        let page = path.split('/').pop();
        return page || 'index.html';
    }
    
    // Page transition effects
    setupPageTransitions() {
        // Add fade effect when loading new pages
        window.addEventListener('beforeunload', () => {
            document.body.style.opacity = '0.5';
            document.body.style.transition = 'opacity 0.3s ease';
        });
        
        // Fade in when page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });
    }
    
    // Back to top button
    setupBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.innerHTML = '↑';
        backToTop.className = 'back-to-top';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        document.body.appendChild(backToTop);
        
        // Show/hide button based on scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.transform = 'translateY(20px)';
            }
        });
        
        // Scroll to top
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', function() {
    new PortfolioNavigation();
});

// Mobile menu toggle
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Change hamburger icon
            const bars = this.querySelectorAll('.bar');
            if (this.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', toggleMobileMenu);

// Close mobile menu when clicking on a link
document.addEventListener('click', function(e) {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu && hamburger.classList.contains('active')) {
        if (e.target.classList.contains('nav-link')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger icon
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    }
});
// Add this method to the PortfolioNavigation class
setupContactForm(); {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            let isValid = true;
            
            // Check each field
            const fields = ['name', 'email', 'subject', 'message'];
            fields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                const formGroup = field.parentElement;
                
                if (!field.value.trim()) {
                    formGroup.classList.add('error');
                    formGroup.classList.remove('success');
                    isValid = false;
                } else {
                    formGroup.classList.add('success');
                    formGroup.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                emailField.parentElement.classList.add('error');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message (in a real app, you would send the data to a server)
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                
                // Remove success classes after a while
                setTimeout(() => {
                    fields.forEach(fieldId => {
                        const formGroup = document.getElementById(fieldId).parentElement;
                        formGroup.classList.remove('success');
                    });
                }, 3000);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                const formGroup = input.parentElement;
                if (input.value.trim()) {
                    formGroup.classList.add('success');
                    formGroup.classList.remove('error');
                } else {
                    formGroup.classList.remove('success');
                    formGroup.classList.add('error');
                }
                
                // Special email validation
                if (input.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (input.value && !emailRegex.test(input.value)) {
                        formGroup.classList.add('error');
                        formGroup.classList.remove('success');
                    }
                }
            });
        });
    }
}

// Update the init method to include contact form setup
init(); {
    this.setupSmoothScrolling();
    this.setupActiveNavigation();
    this.setupPageTransitions();
    this.setupBackToTop();
    this.setupContactForm(); // Add contact form functionality
}