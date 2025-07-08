// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();

    initContactForm();
    initTypingEffect();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Toggle hamburger icon
        const icon = menuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Special handling for education cards and skill items
                if (entry.target.classList.contains('education-card') || 
                    entry.target.classList.contains('skill-item')) {
                    entry.target.classList.add('animate-in');
                }
            }
        });
    }, observerOptions);

    // Observe sections
    const sectionsToObserve = [
        '#about-section',
        '#contact-section',
        '.education-card',
        '.project-card'
    ];

    sectionsToObserve.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            observer.observe(element);
        });
    });
}



// Contact Form Functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const loadingSpinner = submitButton.querySelector('.loading-spinner');
    const formMessage = document.getElementById('form-message');
    const successMessage = formMessage.querySelector('.success-message');
    const errorMessage = formMessage.querySelector('.error-message-general');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous validation
        clearValidation();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Simulate form submission
        submitForm();
    });

    function validateForm() {
        let isValid = true;
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        // Name validation
        if (name.value.trim().length < 2) {
            showFieldError(name, 'Name must be at least 2 characters long');
            isValid = false;
        } else {
            showFieldSuccess(name);
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showFieldError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            showFieldSuccess(email);
        }
        
        // Subject validation
        if (subject.value.trim().length < 5) {
            showFieldError(subject, 'Subject must be at least 5 characters long');
            isValid = false;
        } else {
            showFieldSuccess(subject);
        }
        
        // Message validation
        if (message.value.trim().length < 10) {
            showFieldError(message, 'Message must be at least 10 characters long');
            isValid = false;
        } else {
            showFieldSuccess(message);
        }
        
        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        field.classList.remove('success');
        const errorElement = field.parentNode.querySelector('.error-message');
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    function showFieldSuccess(field) {
        field.classList.add('success');
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        errorElement.classList.add('hidden');
    }

    function clearValidation() {
        const fields = form.querySelectorAll('input, textarea');
        fields.forEach(field => {
            field.classList.remove('error', 'success');
            const errorElement = field.parentNode.querySelector('.error-message');
            if (errorElement) {
                errorElement.classList.add('hidden');
            }
        });
        
        formMessage.classList.add('hidden');
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');
    }

    function submitForm() {
        // Show loading state
        submitButton.disabled = true;
        buttonText.textContent = 'Sending...';
        loadingSpinner.classList.remove('hidden');
        
        // Simulate API call
        setTimeout(() => {
            // Reset button state
            submitButton.disabled = false;
            buttonText.textContent = 'Send Message';
            loadingSpinner.classList.add('hidden');
            
            // Show success message
            formMessage.classList.remove('hidden');
            successMessage.classList.remove('hidden');
            
            // Reset form
            form.reset();
            clearValidation();
            
            // Scroll to success message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
                successMessage.classList.add('hidden');
            }, 5000);
            
        }, 2000); // Simulate 2 second delay
    }
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const roles = ['Design of Ionic Liquids', 'Carbon Dioxide Capture', 'Problem Solver', 'Characterization & Thermophysical Properties'];
    const heroSubtitle = document.querySelector('#home .info-item:first-child p');
    let currentRole = 0;
    let currentChar = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = roles[currentRole];
        
        if (isDeleting) {
            heroSubtitle.textContent = currentText.substring(0, currentChar - 1);
            currentChar--;
        } else {
            heroSubtitle.textContent = currentText.substring(0, currentChar + 1);
            currentChar++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && currentChar === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentRole = (currentRole + 1) % roles.length;
            typeSpeed = 500; // Pause before starting new word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect after a delay
    setTimeout(typeEffect, 2000);
}

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-indigo-600');
        link.classList.add('text-gray-700');
        
        if (link.getAttribute('href') === '#' + current) {
            link.classList.remove('text-gray-700');
            link.classList.add('text-indigo-600');
        }
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.getElementById('home');
    const profileCircle = document.querySelector('.profile-circle');
    
    if (heroSection && profileCircle) {
        const rate = scrolled * -0.5;
        profileCircle.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation to page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Smooth reveal animations for page load
function revealOnLoad() {
    const elementsToReveal = [
        '.profile-circle',
        '.info-item',
        '.divider-line'
    ];
    
    elementsToReveal.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
}

// Initialize reveal animations
setTimeout(revealOnLoad, 500);
