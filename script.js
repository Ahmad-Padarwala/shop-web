// ===========================
// Mobile Navigation Toggle
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Navbar Scroll Effect
// ===========================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===========================
// Order Button - Prefill Form
// ===========================
const orderButtons = document.querySelectorAll('.order-btn');
const teaTypeSelect = document.getElementById('teaType');
const orderFormSection = document.getElementById('order');

orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        const teaType = button.getAttribute('data-tea');
        teaTypeSelect.value = teaType;

        // Smooth scroll to form
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const formPosition = orderFormSection.offsetTop - navbarHeight;

        window.scrollTo({
            top: formPosition,
            behavior: 'smooth'
        });

        // Focus on name field after scroll
        setTimeout(() => {
            document.getElementById('name').focus();
        }, 600);
    });
});

// ===========================
// Form Validation & Email Integration
// ===========================
const orderForm = document.getElementById('orderForm');
const successPopup = document.getElementById('successPopup');
const popupClose = document.getElementById('popupClose');

orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const teaType = document.getElementById('teaType').value;
    const quantity = document.getElementById('quantity').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate fields
    if (!name || !phone || !teaType || !quantity) {
        alert('Please fill in all required fields.');
        return;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\+]/g, ''))) {
        alert('Please enter a valid phone number.');
        return;
    }

    // Validate quantity
    if (quantity <= 0) {
        alert('Please enter a valid quantity.');
        return;
    }

    // Create email message
    const emailSubject = 'Tea Inquiry from Website';
    const emailBody = generateEmailBody(name, phone, teaType, quantity, message);

    // Email address
    const emailAddress = 'threekeytea@gmail.com';

    // Create mailto URL
    const mailtoURL = `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Show success popup
    showSuccessPopup();

    // Open email client after a short delay
    setTimeout(() => {
        window.location.href = mailtoURL;

        // Reset form
        orderForm.reset();

        // Close popup after redirect
        setTimeout(() => {
            closeSuccessPopup();
        }, 2000);
    }, 1000);
});

// ===========================
// Generate Email Body
// ===========================
function generateEmailBody(name, phone, teaType, quantity, message) {
    let emailBody = `Tea Inquiry Details:\n\n`;
    emailBody += `Name: ${name}\n`;
    emailBody += `Phone: ${phone}\n`;
    emailBody += `Tea Type: ${teaType}\n`;
    emailBody += `Quantity: ${quantity} KG\n`;

    if (message) {
        emailBody += `\nMessage:\n${message}\n`;
    }

    emailBody += `\n---\nSent from Three Key Tea Website`;

    return emailBody;
}

// ===========================
// Generate WhatsApp Message
// ===========================
function generateWhatsAppMessage(name, phone, teaType, quantity, message) {
    let whatsappMessage = `*New Tea Order Inquiry*\n\n`;
    whatsappMessage += `*Name:* ${name}\n`;
    whatsappMessage += `*Phone:* ${phone}\n`;
    whatsappMessage += `*Tea Type:* ${teaType}\n`;
    whatsappMessage += `*Quantity:* ${quantity} KG\n`;

    if (message) {
        whatsappMessage += `\n*Message:*\n${message}\n`;
    }

    whatsappMessage += `\n_Sent from Three Key Tea Website_`;

    return whatsappMessage;
}

// ===========================
// Show Success Popup
// ===========================
function showSuccessPopup() {
    successPopup.classList.add('show');
}

// ===========================
// Close Success Popup
// ===========================
function closeSuccessPopup() {
    successPopup.classList.remove('show');
}

// Close popup when clicking X
popupClose.addEventListener('click', closeSuccessPopup);

// Close popup when clicking outside
successPopup.addEventListener('click', (e) => {
    if (e.target === successPopup) {
        closeSuccessPopup();
    }
});

// ===========================
// Scroll Reveal Animations
// ===========================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and feature items for scroll animation
const animatedElements = document.querySelectorAll('.tea-card, .feature-item, .wr-card, .contact-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(el);
});

// Observe product showcase sections
const productShowcase = document.querySelector('.product-showcase');
if (productShowcase) {
    const productImage = productShowcase.querySelector('.product-image-container');
    const productDetails = productShowcase.querySelector('.product-details');

    if (productImage) {
        productImage.style.opacity = '0';
        productImage.style.transform = 'translateX(-60px)';
        productImage.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
        observer.observe(productImage);
    }

    if (productDetails) {
        productDetails.style.opacity = '0';
        productDetails.style.transform = 'translateX(60px)';
        productDetails.style.transition = 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s';
        observer.observe(productDetails);
    }
}

// Observe about features with stagger effect
const aboutFeatures = document.querySelectorAll('.about-features .feature-item');
aboutFeatures.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.15}s`;
});

// ===========================
// Form Input Animation
// ===========================
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s ease';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ===========================
// Console Welcome Message
// ===========================
console.log('%cThree Key Tea', 'color: #4e5020; font-size: 24px; font-weight: bold;');
console.log('%cPure Raw Tea Leaves, Direct From Source', 'color: #b8d355; font-size: 14px;');
console.log('%cWebsite loaded successfully!', 'color: #666; font-size: 12px;');
