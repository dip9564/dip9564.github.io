/*==================== MENU SHOW & HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const header = document.getElementById('header');
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(window.scrollY >= 80) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollTop);

/*==================== TYPING ANIMATION ====================*/
const typingElement = document.querySelector('.typing');
const professions = ['Software Developer', 'Web Developer', 'C++ Programmer', 'Python Developer', 'Problem Solver'];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentProfession = professions[professionIndex];
    
    if (!isDeleting && charIndex < currentProfession.length) {
        typingElement.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else if (isDeleting && charIndex > 0) {
        typingElement.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, 50);
    } else if (!isDeleting && charIndex === currentProfession.length) {
        setTimeout(() => {
            isDeleting = true;
            typeEffect();
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        setTimeout(typeEffect, 500);
    }
}

// Start typing animation when page loads
if(typingElement) {
    typeEffect();
}

/*==================== SKILLS ACCORDION ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
    skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for(i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close';
    }
    
    if(itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

/*==================== SCROLL REVEAL ANIMATION ====================*/
const revealElements = document.querySelectorAll('.home__content, .home__img, .about__img, .about__data, .skills__content, .projects__content, .education__content, .experience__content, .contact__information, .contact__form');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if(entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(element);
});

/*==================== SMOOTH SCROLL ====================*/
// This is handled below with offset

/*==================== CONTACT FORM HANDLING ====================*/
// Initialize EmailJS
// IMPORTANT: Replace these with your own EmailJS credentials
// Get them from https://www.emailjs.com/
// Configuration - UPDATE THESE VALUES WITH YOUR EMAILJS CREDENTIALS
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "EV-vr3_WbgBOz0Ojx", // Replace with your EmailJS Public Key
    SERVICE_ID: "service_h2t796w", // Replace with your EmailJS Service ID
    TEMPLATE_ID: "template_gx0e2ba" // Replace with your EmailJS Template ID
};

// Initialize EmailJS only if Public Key is set and library is loaded
if (typeof emailjs !== 'undefined') {
    if (EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        try {
            emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
            console.log("EmailJS initialized successfully");
        } catch (error) {
            console.error("EmailJS initialization error:", error);
        }
    } else {
        console.warn("EmailJS not configured. Please set up your EmailJS credentials in script.js");
        console.warn("See QUICK_FIX.md for setup instructions");
    }
} else {
    console.error("EmailJS library not loaded. Check your internet connection and script loading order.");
}

const contactForm = document.querySelector('.contact__form');
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactProject = document.getElementById('contact-project');
const contactMessage = document.getElementById('contact-message');
const contactSubmit = document.getElementById('contact-submit');

if(contactSubmit) {
    contactSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Basic form validation
        if(!contactName.value.trim()) {
            showNotification('Please enter your name', 'error');
            contactName.focus();
            return;
        }
        
        if(!contactEmail.value.trim() || !isValidEmail(contactEmail.value)) {
            showNotification('Please enter a valid email', 'error');
            contactEmail.focus();
            return;
        }
        
        if(!contactMessage.value.trim()) {
            showNotification('Please enter your message', 'error');
            contactMessage.focus();
            return;
        }
        
        // Check if EmailJS library is loaded
        if (typeof emailjs === 'undefined') {
            showNotification('Email service is currently unavailable. Please contact me directly at dipmondalkp616@gmail.com', 'error');
            console.error('EmailJS library not loaded');
            return;
        }
        
        // Check if EmailJS is configured
        if (!EMAILJS_CONFIG.PUBLIC_KEY || EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY" ||
            !EMAILJS_CONFIG.SERVICE_ID || EMAILJS_CONFIG.SERVICE_ID === "YOUR_SERVICE_ID" ||
            !EMAILJS_CONFIG.TEMPLATE_ID || EMAILJS_CONFIG.TEMPLATE_ID === "YOUR_TEMPLATE_ID") {
            showNotification('Email service not configured yet. Please contact me directly at dipmondalkp616@gmail.com or see QUICK_FIX.md for setup instructions', 'error');
            console.error('EmailJS not configured. Please set up your credentials in script.js');
            console.error('See QUICK_FIX.md for step-by-step instructions');
            return;
        }
        
        // Disable submit button during sending
        contactSubmit.style.opacity = '0.6';
        contactSubmit.style.pointerEvents = 'none';
        contactSubmit.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin button__icon"></i>';
        
        // Prepare email parameters
        // Note: The template uses {{email}} for the "To Email" field
        const templateParams = {
            from_name: contactName.value.trim(),
            from_email: contactEmail.value.trim(),
            email: 'dipmondalkp616@gmail.com', // Recipient email - matches {{email}} in template
            project: contactProject.value.trim() || 'Not specified',
            message: contactMessage.value.trim()
        };
        
        // Send email using EmailJS
        emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                
                // Reset form
                contactName.value = '';
                contactEmail.value = '';
                contactProject.value = '';
                contactMessage.value = '';
            }, function(error) {
                console.error('FAILED...', error);
                
                // Provide helpful error messages
                let errorMessage = 'Failed to send message. ';
                if (error.text) {
                    if (error.text.includes('Invalid public key')) {
                        errorMessage += 'Email service configuration error. Please check your EmailJS Public Key.';
                    } else if (error.text.includes('Service ID')) {
                        errorMessage += 'Email service configuration error. Please check your EmailJS Service ID.';
                    } else if (error.text.includes('Template ID')) {
                        errorMessage += 'Email service configuration error. Please check your EmailJS Template ID.';
                    } else {
                        errorMessage += error.text;
                    }
                } else {
                    errorMessage += 'Please try again or contact me directly at dipmondalkp616@gmail.com';
                }
                
                showNotification(errorMessage, 'error');
            })
            .finally(function() {
                // Re-enable submit button
                contactSubmit.style.opacity = '1';
                contactSubmit.style.pointerEvents = 'auto';
                contactSubmit.innerHTML = 'Send Message <i class="fas fa-paper-plane button__icon"></i>';
            });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/*==================== NOTIFICATION SYSTEM ====================*/
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if(existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification__content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .notification__close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1.2rem;
            padding: 0;
            margin-left: auto;
        }
        .notification__close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to body
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if(notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add slideOut animation
    if(!document.querySelector('#notification-animations')) {
        const animStyle = document.createElement('style');
        animStyle.id = 'notification-animations';
        animStyle.textContent = `
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(animStyle);
    }
}


/*==================== PROJECTS HOVER EFFECT ====================*/
const projectCards = document.querySelectorAll('.projects__content');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/*==================== SKILLS BAR ANIMATION ON SCROLL ====================*/
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skills__percentage');
            skillBars.forEach(bar => {
                const width = bar.style.width || getComputedStyle(bar).width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skills__content').forEach(skill => {
    observer.observe(skill);
});

/*==================== LOADING ANIMATION ====================*/
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

/*==================== MOBILE MENU CLOSE ON OUTSIDE CLICK ====================*/
document.addEventListener('click', (e) => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if(navMenu && navMenu.classList.contains('show-menu')) {
        if(!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu');
        }
    }
});

/*==================== SMOOTH SCROLL WITH OFFSET ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if(targetId === '#' || !targetId) {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
