// Simple JavaScript for PajamaDot Games website

document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year dynamically
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('footer p');
    
    if (copyrightElement) {
        copyrightElement.textContent = `© ${currentYear} PajamaDot Games. All rights reserved.`;
    }
    
    // Logo hover effect
    const logo = document.querySelector('.logo');
    
    if (logo) {
        logo.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        logo.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
            this.style.transition = 'transform 0.3s ease';
        });
    }
    
    // CTA Button interaction
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('Games coming soon!');
        });
    }
}); 