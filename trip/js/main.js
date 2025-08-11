
// DOM Elements
const newsletterForm = document.getElementById('newsletter-form');
const header = document.querySelector('header');

// Newsletter form submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value) {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

// Sticky header effect - changes header styles when scrolling
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Post animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const posts = document.querySelectorAll('.post');
    
    if ('IntersectionObserver' in window) {
        const postObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        
        posts.forEach(post => {
            postObserver.observe(post);
        });
    }
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.setAttribute('aria-label', 'Toggle Navigation');
    navToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const nav = document.querySelector('nav');
    
    if (window.innerWidth < 768 && nav) {
        header.insertBefore(navToggle, nav);
        nav.classList.add('mobile-nav');
        
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768 && !document.querySelector('.nav-toggle')) {
            header.insertBefore(navToggle, nav);
            nav.classList.add('mobile-nav');
        } else if (window.innerWidth >= 768 && document.querySelector('.nav-toggle')) {
            const toggle = document.querySelector('.nav-toggle');
            if (toggle) {
                toggle.remove();
            }
            nav.classList.remove('mobile-nav', 'active');
        }
    });
}); 