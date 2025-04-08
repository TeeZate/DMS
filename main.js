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
    function getCurrentPage() {
        // Get the current path
        let path = window.location.pathname;
        
        // Remove trailing slash if present
        path = path.endsWith('/') ? path.slice(0, -1) : path;
        
        // Get the last segment of the path
        let currentPage = path.split('/').pop().toLowerCase();
        
        // If empty, assume index.html
        if (!currentPage) {
            currentPage = 'index.html';
        }
        
        // If no extension, append .html
        if (!currentPage.includes('.')) {
            currentPage += '.html';
        }
        
        return currentPage;
    }
    
    const currentPage = getCurrentPage();
    const menuItems = document.querySelectorAll('.nav-menu a');
    
    menuItems.forEach(item => {
        let href = item.getAttribute('href').toLowerCase();
        
        // Normalize href
        if (href === '/' || href === '') {
            href = 'index.html';
        }
        
        if (href === currentPage) {
            item.classList.add('active');
            const parentLi = item.closest('li');
            if (parentLi) {
                parentLi.classList.add('active');
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitButton = form?.querySelector('.submit-btn');
    
    // Check if form exists before proceeding
    if (!form) return;

    // Create success overlay if it doesn't exist
    const successOverlayId = 'successOverlay';
    let successOverlay = document.getElementById(successOverlayId);
    if (!successOverlay) {
        successOverlay = document.createElement('div');
        successOverlay.id = successOverlayId;
        document.body.appendChild(successOverlay);
    }

    // Check URL parameters for submission status
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
        showSuccessMessage();
    }

    // Form submission handler
    form.addEventListener('submit', function(e) {
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }
        
        if (formMessage) {
            formMessage.innerHTML = 'Sending your message...';
            formMessage.className = 'form-message';
            formMessage.style.display = 'block';
        }
    });

    // Client-side validation
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

    function showSuccessMessage() {
        successOverlay.innerHTML = `
            <div class="success-popup">
                <div class="success-content">
                    <div class="success-icon">✓</div>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully.</p>
                    <button class="close-success">Close</button>
                </div>
            </div>
        `;
        successOverlay.style.display = 'flex';
        
        form.reset();
        window.history.replaceState({}, document.title, window.location.pathname);

        const closeButton = successOverlay.querySelector('.close-success');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                successOverlay.style.display = 'none';
            });
        }

        setTimeout(() => {
            successOverlay.style.display = 'none';
        }, 5000);
    }
});