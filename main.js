const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
document.getElementById('copyright').innerHTML = 
`&copy; ${new Date().getFullYear()}. All Rights Reserved.`;

// Variables to track scroll position
let lastScrollPosition = 0;
let ticking = false;

// Function to handle scroll behavior
function handleScroll() {
    const currentScrollPosition = window.pageYOffset;
    const nav = document.querySelector('nav');
    
    // Scroll down
    if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
        nav.classList.add('nav-hidden');
        nav.classList.remove('nav-visible');
    } 
    // Scroll up
    else {
        nav.classList.remove('nav-hidden');
        nav.classList.add('nav-visible');
    }
    
    lastScrollPosition = currentScrollPosition;
    ticking = false;
}

// Add scroll event listener with requestAnimationFrame for better performance
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
        });
        ticking = true;
    }
});

// Optional: Show navigation when at top of page
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.pageYOffset === 0) {
        nav.classList.remove('nav-hidden');
        nav.classList.add('nav-visible');
    }
});

// Form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
e.preventDefault();

// Get form values
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const subject = document.getElementById('subject').value;
const message = document.getElementById('message').value;

// Construct email body
const emailBody = `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`;

// Create mailto link
const mailtoLink = `mailto:info@dms.co.zw?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

// Open default email client
window.location.href = mailtoLink;
});

// Add animation when form fields are in focus
document.querySelectorAll('.form-group input, .form-group textarea').forEach(element => {
element.addEventListener('focus', function() {
this.parentElement.classList.add('focused');
});

element.addEventListener('blur', function() {
if (!this.value) {
    this.parentElement.classList.remove('focused');
}
});
});
document.getElementById('copyright').innerHTML = 
`&copy; ${new Date().getFullYear()} Digital Monitoring Solutions. All Rights Reserved.`;