
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
            
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'translateY(9px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-9px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking anywhere else
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active') && !event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    
    // Scroll Animation
    const sections = document.querySelectorAll('section');
    
    function fadeInOnScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('fade-in');
            }
        });
    }
    
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Initial check
    
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            
            if (href === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Skills Animation
    const progressBars = document.querySelectorAll('.progress');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animate progress bars when skills section is in viewport
    window.addEventListener('scroll', function() {
        const skillsSection = document.querySelector('.skills-preview');
        
        if (skillsSection && isInViewport(skillsSection)) {
            animateProgressBars();
            // Remove event listener after animation triggered
            window.removeEventListener('scroll', this);
        }
    });
    
    // Trigger animation on page load if skills section is already in viewport
    const skillsSection = document.querySelector('.skills-preview');
    if (skillsSection && isInViewport(skillsSection)) {
        animateProgressBars();
    }
    
    // Project card hover effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const img = card.querySelector('.project-image img');
        
        card.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
    
    // Sticky Header
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    
    function toggleStickyHeader() {
        if (window.scrollY > 100) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    }
    
    window.addEventListener('scroll', toggleStickyHeader);
    toggleStickyHeader(); // Initial check
});

// Add CSS animation class
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    section {
        opacity: 0;
        transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
    }
    
    section.fade-in {
        opacity: 1;
        animation: fadeIn 0.6s ease-in-out forwards;
    }
    
    .navbar.sticky {
        padding: 10px 0;
        background-color: rgba(255, 255, 255, 0.95);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style); 