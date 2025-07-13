// Professional JavaScript for PajamaDot Studios website

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use the system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    // Set initial theme
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', systemTheme);
    }
    
    // Initialize lightbulb state based on initial theme
    const lightbulb = document.getElementById('lightbulb');
    if (lightbulb) {
        const initialTheme = htmlElement.getAttribute('data-theme');
        if (initialTheme === 'dark') {
            lightbulb.classList.add('on');
        }
    }
    
    // Toggle theme when button is clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update bulb state to stay in sync
            if (lightbulb) {
                if (newTheme === 'dark') {
                    lightbulb.classList.add('on');
                } else {
                    lightbulb.classList.remove('on');
                }
            }
            
            // Add button animation
            themeToggle.classList.add('theme-toggle-animate');
            setTimeout(() => {
                themeToggle.classList.remove('theme-toggle-animate');
            }, 300);
        });
    }
    
    // Lightbulb theme toggle functionality
    
    if (lightbulb) {
        // Set initial bulb state based on current theme
        const currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            lightbulb.classList.add('on');
        }
        
        // Toggle theme when lightbulb is clicked
        lightbulb.addEventListener('click', function() {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Add click animation
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // Toggle bulb state
            if (newTheme === 'dark') {
                this.classList.add('on');
            } else {
                this.classList.remove('on');
            }
            
            // Update theme
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Also update the theme toggle button to stay in sync
            if (themeToggle) {
                const icon = themeToggle.querySelector('i');
                if (icon) {
                    if (newTheme === 'dark') {
                        icon.classList.remove('fa-moon');
                        icon.classList.add('fa-sun');
                    } else {
                        icon.classList.remove('fa-sun');
                        icon.classList.add('fa-moon');
                    }
                }
            }
        });
        
        // Sync bulb state when theme is changed via other methods
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    const theme = htmlElement.getAttribute('data-theme');
                    if (theme === 'dark') {
                        lightbulb.classList.add('on');
                    } else {
                        lightbulb.classList.remove('on');
                    }
                }
            });
        });
        
        observer.observe(htmlElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }
    
    // Update copyright year dynamically
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('footer p');
    
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} PajamaDot Studios. All rights reserved.`;
    }
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !expanded);
            
            // Toggle icon between bars and times
            const icon = navToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || 
                                    navLinks.contains(event.target);
            
            if (!isClickInsideNav && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', false);
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip empty links
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (navToggle) {
                        navToggle.setAttribute('aria-expanded', false);
                        const icon = navToggle.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add entrance animation for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        setTimeout(() => {
            heroSection.classList.add('active');
        }, 100);
    }
    
    // Add scroll animation for sections
    const animateSections = function() {
        const sections = document.querySelectorAll('.content-section, .team-section, .services-section, .cta-section');
        
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (sectionPosition < screenPosition) {
                section.classList.add('visible');
            }
        });
    };
    
    // Add scroll reveal classes
    const addScrollClasses = function() {
        const sections = document.querySelectorAll('.content-section, .team-section, .services-section, .cta-section');
        sections.forEach(section => {
            section.classList.add('scroll-reveal');
        });
        
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            card.classList.add('scroll-item');
        });
        
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
            item.classList.add('scroll-item');
        });
    };
    
    // Call scroll animation on scroll
    window.addEventListener('scroll', animateSections);
    
    // Initialize
    addScrollClasses();
    animateSections();
    
    // CTA Button interaction
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add button press animation
            this.classList.add('button-pressed');
            
            setTimeout(() => {
                this.classList.remove('button-pressed');
                
                // You would replace this with actual navigation or form display
                if (this.textContent.includes('Portfolio')) {
                    document.querySelector('#games').scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else if (this.textContent.includes('Touch')) {
                    alert('Contact form coming soon!');
                }
            }, 300);
        });
    });
    
    // Social links expansion functionality
    const socialLinks = document.querySelector('.social-links');
    const followUsSpan = document.querySelector('.social-links span');
    
    if (socialLinks && followUsSpan) {
        let isExpanded = false;
        
        // Function to handle social links expansion on hover
        const handleSocialExpansion = function() {
            isExpanded = true;
            socialLinks.classList.add('expanded');
        };
        
        const handleSocialCollapse = function() {
            isExpanded = false;
            socialLinks.classList.remove('expanded');
        };
        
        // Add hover event listeners for social expansion
        followUsSpan.addEventListener('mouseenter', handleSocialExpansion);
        
        // Keep expanded when hovering over the social links area
        socialLinks.addEventListener('mouseenter', function() {
            if (!isExpanded) {
                handleSocialExpansion();
            }
        });
        
        // Remove mouseleave events to keep expanded state
        // socialLinks.addEventListener('mouseleave', function(e) {
        //     // Check if we're moving to the followUsSpan
        //     const relatedTarget = e.relatedTarget;
        //     if (!socialLinks.contains(relatedTarget) && !followUsSpan.contains(relatedTarget)) {
        //         handleSocialCollapse();
        //     }
        // });
        
        // Also handle mouseleave for the span - but don't collapse
        followUsSpan.addEventListener('mouseleave', function(e) {
            // Keep expanded - don't collapse when leaving the span
            // const relatedTarget = e.relatedTarget;
            // if (!socialLinks.contains(relatedTarget) && !followUsSpan.contains(relatedTarget)) {
            //     handleSocialCollapse();
            // }
        });
        
        // Also expand on click for better UX
        followUsSpan.addEventListener('click', function() {
            if (isExpanded) {
                handleSocialCollapse();
            } else {
                handleSocialExpansion();
            }
        });
        
        // Add click functionality to social icons
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // You can add actual navigation here
                const platform = this.getAttribute('aria-label');
                console.log(`Clicked on ${platform}`);
                // Example: window.open('your-social-link', '_blank');
            });
        });
        
            // Add click outside to close functionality
    document.addEventListener('click', function(e) {
        if (!socialLinks.contains(e.target) && !followUsSpan.contains(e.target)) {
            if (isExpanded) {
                handleSocialCollapse();
            }
        }
    });
    
    // Header scroll effect
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

    // Logo interaction - subtle hover effect
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.03)';
            this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
            this.style.transition = 'all 0.3s ease';
        });
    }
}); 