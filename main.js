document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Create overlay div
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-menu';
    closeButton.setAttribute('aria-label', 'Close menu');
    navMenu.insertBefore(closeButton, navMenu.firstChild);
    
    // Toggle menu function
    function toggleMenu() {
        const isOpening = !navMenu.classList.contains('active');
        
        if (isOpening) {
            navMenu.classList.add('active');
            overlay.classList.add('active');
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        } else {
            closeMenu();
        }
    }
    
    // Close menu function
    function closeMenu() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    closeButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Close when clicking menu links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) { // Only close on mobile
                closeMenu();
            }
        });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Accessibility improvements
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-controls', 'navMenu');
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    
    // Make toggle button work in desktop mode
    function handleResize() {
        if (window.innerWidth > 768) {
            // Ensure menu is visible in desktop mode
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Initial check and resize listener
    handleResize();
    window.addEventListener('resize', handleResize);
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

document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = window.location.pathname;
    const menuItems = document.querySelectorAll('.nav-menu a');
    
    menuItems.forEach(item => {
        if(item.getAttribute('href') === currentLocation) {
            item.classList.add('active');
        }
    });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitButton = form.querySelector('.submit-btn');

    // Check if form was just submitted (URL parameter check)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
        formMessage.innerHTML = 'Thank you! Your message has been sent successfully.';
        formMessage.className = 'form-message success';
        // Clear form
        form.reset();
        // Remove the URL parameter
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    form.addEventListener('submit', function(e) {
        // Disable submit button to prevent double submission
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Show sending message
        formMessage.innerHTML = 'Sending your message...';
        formMessage.className = 'form-message';
        formMessage.style.display = 'block';
        
        // Form will submit normally to FormSubmit
        // The page will redirect back with the submitted parameter
    });

    // Optional: Add client-side validation
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            input.classList.add('error');
        });
        
        input.addEventListener('input', function() {
            input.classList.remove('error');
        });
    });
});


