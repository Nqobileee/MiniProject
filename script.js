// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const timer = document.getElementById('timer');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const backToTop = document.getElementById('back-to-top');
const whatsappBtn = document.getElementById('whatsapp-btn');
const cartCountBadge = document.getElementById('cart-count');
const floatingCartBadge = document.getElementById('floating-cart-badge');
const cartTotalText = document.getElementById('cart-total');
const buyAllBtn = document.getElementById('buy-all');

// Per-product quantity tracking (by product name)
function getProductQuantities() {
    try {
        const raw = localStorage.getItem('productQuantities');
        const obj = raw ? JSON.parse(raw) : {};
        return typeof obj === 'object' && obj !== null ? obj : {};
    } catch (e) {
        return {};
    }
}

function setProductQuantities(qtyMap) {
    localStorage.setItem('productQuantities', JSON.stringify(qtyMap));
}

function getProductCard(target) {
    return target.closest && target.closest('.product-card');
}

function getProductNameFromCard(card) {
    const nameEl = card && card.querySelector('.product-name');
    return nameEl ? nameEl.textContent.trim() : '';
}

function getCart() {
    try {
        const raw = localStorage.getItem('cart');
        return raw ? JSON.parse(raw) : { count: 0, total: 0 };
    } catch (e) {
        return { count: 0, total: 0 };
    }
}

function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartCount(cart.count);
    if (cartTotalText) {
        cartTotalText.textContent = `$${cart.total.toFixed(2)}`;
    }
    if (buyAllBtn) {
        buyAllBtn.textContent = `Buy All (${cart.count})`;
        buyAllBtn.disabled = cart.count === 0;
        buyAllBtn.style.opacity = cart.count === 0 ? '0.6' : '1';
    }
}

function getCartCount() {
    const count = parseInt(localStorage.getItem('cartCount') || '0', 10);
    return isNaN(count) ? 0 : count;
}

function setCartCount(count) {
    localStorage.setItem('cartCount', String(count));
    if (cartCountBadge) {
        cartCountBadge.textContent = String(count);
        cartCountBadge.style.display = count > 0 ? 'inline-block' : 'none';
    }
    if (floatingCartBadge) {
        floatingCartBadge.textContent = String(count);
        floatingCartBadge.style.display = count > 0 ? 'flex' : 'none';
    }
}

function incrementCart(by = 1, price = 0) {
    const cart = getCart();
    cart.count = Math.max(0, cart.count + by);
    cart.total = Math.max(0, cart.total + by * price);
    setCart(cart);
}

// Initialize cart UI on load
document.addEventListener('DOMContentLoaded', () => {
    setCartCount(getCartCount());
    // No button disabling in quantity mode
});

// Timer functionality
let timeLeft = {
    hours: 48,
    minutes: 0,
    seconds: 17
};

function updateTimer() {
    if (timeLeft.seconds > 0) {
        timeLeft.seconds--;
    } else if (timeLeft.minutes > 0) {
        timeLeft.minutes--;
        timeLeft.seconds = 59;
    } else if (timeLeft.hours > 0) {
        timeLeft.hours--;
        timeLeft.minutes = 59;
        timeLeft.seconds = 59;
    } else {
        // Timer finished
        timeLeft = { hours: 0, minutes: 0, seconds: 0 };
    }
    
    const hours = String(timeLeft.hours).padStart(2, '0');
    const minutes = String(timeLeft.minutes).padStart(2, '0');
    const seconds = String(timeLeft.seconds).padStart(2, '0');
    
    timer.textContent = `${hours}:${minutes}:${seconds}`;
}

// Start timer
if (timer) setInterval(updateTimer, 1000);

// Mobile Navigation Toggle
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Navbar scroll effect
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(11, 10, 30, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(11, 10, 30, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
if (contactForm) contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const product = formData.get('product');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !product) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show success message
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
    
    // Reset form after 3 seconds
    setTimeout(() => {
        contactForm.style.display = 'block';
        formSuccess.style.display = 'none';
        contactForm.reset();
    }, 3000);
    
    // Log form data (in real app, send to server)
    console.log('Form submitted:', {
        name,
        email,
        product,
        message
    });
});

// Back to top functionality
if (backToTop) backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide back to top button
if (backToTop) window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

// WhatsApp button functionality
if (whatsappBtn) whatsappBtn.addEventListener('click', () => {
    const phoneNumber = '+263786865719'; 
    const message = 'Hello! I\'m interested in your tech products.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .testimonial-card, .section-header');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    });
});

// Button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Testimonial message button functionality
document.querySelectorAll('.message-btn').forEach(btn => {
    btn.addEventListener('click', function() {
 
        alert('Message feature irikuuya manje manje! Contact us via WhatsApp for immediate assistance.');
    });
});

// Category pill functionality
document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', function() {
        // Remove active class from all pills
        document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        // Add active class to clicked pill
        this.classList.add('active');
        
        // In a real app, this would filter products
        console.log('Filtering by category:', this.textContent);
    });
});

// Add to cart functionality
document.addEventListener('click', (e) => {
    const target = e.target;
    const addBtn = target.closest && target.closest('.btn-add');
    const minusBtn = target.closest && target.closest('.btn-minus');
    if (addBtn || minusBtn) {
        e.preventDefault();
        const card = getProductCard(target);
        const priceEl = card && card.querySelector('.product-price, .new-price');
        const priceText = priceEl ? priceEl.textContent.replace(/[^0-9.]/g, '') : '0';
        const price = parseFloat(priceText) || 0;
        const name = getProductNameFromCard(card);
        const qtyMap = getProductQuantities();
        const currentQty = name ? (qtyMap[name] || 0) : 0;
        let performed = false;

        if (addBtn) {
            // Allow multiple adds per product
            if (!name) return;
            qtyMap[name] = currentQty + 1;
            setProductQuantities(qtyMap);
            incrementCart(1, price);
            performed = true;
        } else if (minusBtn) {
            // Only allow removing up to the quantity added for this product
            if (!name || currentQty <= 0) return;
            qtyMap[name] = currentQty - 1;
            if (qtyMap[name] <= 0) delete qtyMap[name];
            setProductQuantities(qtyMap);
            incrementCart(-1, price);
            performed = true;
        }
        if (performed) {
            const btn = addBtn || minusBtn;
            const original = btn.innerHTML;
            btn.innerHTML = addBtn ? '<i class="fas fa-check"></i>' : '<i class="fas fa-minus"></i>';
            btn.style.filter = 'brightness(1.1)';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.filter = '';
            }, 300);
        }
    }
});

if (buyAllBtn) {
    buyAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const cart = getCart();
        if (cart.count === 0) return;
        alert(`Thank you! Purchasing ${cart.count} items totaling $${cart.total.toFixed(2)}.`);
        setCart({ count: 0, total: 0 });
        // Clear per-product quantities
        setProductQuantities({});
    });
}

// Floating elements animation
function animateFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((element, index) => {
        const delay = index * 1000;
        setTimeout(() => {
            element.style.animation = 'float 6s ease-in-out infinite';
        }, delay);
    });
}

// Initialize floating elements animation
document.addEventListener('DOMContentLoaded', animateFloatingElements);

// Glow effect for logo
function addGlowEffect() {
    const logo = document.querySelector('.logo-text');
    if (logo) {
        setInterval(() => {
            logo.style.textShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
            setTimeout(() => {
                logo.style.textShadow = '0 0 40px rgba(139, 92, 246, 0.5)';
            }, 1000);
        }, 2000);
    }
}

// Initialize glow effect
document.addEventListener('DOMContentLoaded', addGlowEffect);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Enter key on pills triggers click
    if (e.key === 'Enter' && e.target.classList.contains('pill')) {
        e.target.click();
    }
});

// Touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(11, 10, 30, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(11, 10, 30, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    // Back to top button visibility
    if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
}, 10);

window.addEventListener('scroll', throttledScrollHandler);

// Console welcome message
console.log('%c🚀 Welcome to Mbishi Tech Shop!', 'color: #3B82F6; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #8B5CF6; font-size: 14px;');
console.log('%cFor the best tech shopping experience', 'color: #F59E0B; font-size: 12px;');


