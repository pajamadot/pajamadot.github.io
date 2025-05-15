// Professional JavaScript for PajamaDot Studios website

document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year dynamically
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('footer p');
    
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} PajamaDot Studios. All rights reserved.`;
    }
    
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
                    alert('Portfolio page coming soon!');
                } else if (this.textContent.includes('Touch')) {
                    alert('Contact form coming soon!');
                }
            }, 300);
        });
    });
    
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