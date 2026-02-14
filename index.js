// index.js - Smooth Scrolling and Active Navigation

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. SMOOTH SCROLLING FOR NAVIGATION LINKS
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default instant jump
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Smooth scroll to the target section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update the browser's URL without a page reload
                window.history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });

    // 2. HIGHLIGHT THE ACTIVE NAVIGATION LINK ON SCROLL
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150; // 150px offset from the top

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if the user has scrolled into the current section
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove the 'active' class from all navigation links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add the 'active' class to the link corresponding to the current section
                const activeLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Listen for scroll events to update the active navigation
    window.addEventListener('scroll', updateActiveNav);
    
    // Call the function once on page load to set the initial active state
    updateActiveNav();

    // 3. SIMPLE FORM SUBMISSION HANDLER
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // You can add more complex form handling here (like sending to an email service)
            // For now, we'll just show a success message.
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate a network request
            setTimeout(() => {
                // Show success state
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                
                // Reset form
                this.reset();
                
                // Reset button after a few seconds
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});