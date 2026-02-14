document.addEventListener('DOMContentLoaded', () => {

    // - FAQ ACCORDION 
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                const answer = item.querySelector('.faq-answer');
                const icon = item.querySelector('.faq-question i');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-question i');
                        if (otherAnswer) otherAnswer.style.maxHeight = '0';
                        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });
    }

    //  SMOOTH SCROLL & ACTIVE NAV 
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('section[id]');

    if (navLinks.length > 0 && sections.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            });
        });

        const updateActiveNavLink = () => {
            const scrollY = window.pageYOffset;
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 100;
                const sectionId = current.getAttribute('id');
                const correspondingNavLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`);
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    if (correspondingNavLink) correspondingNavLink.classList.add('active');
                }
            });
        };
        window.addEventListener('scroll', updateActiveNavLink);
        updateActiveNavLink(); 
    }


    //  MOBILE MENU 
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            });
        });
    }


    //  FORM SUBMISSION 
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;

            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Simulate sending to a server
            setTimeout(() => {
                // Show success state
                formMessage.textContent = 'Thank you! Your message has been sent.';
                formMessage.style.display = 'block';
                formMessage.style.color = '#28a745'; 
                
                
                this.reset();
                submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitButton.disabled = false;

                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    submitButton.innerHTML = originalButtonText;
                }, 5000);

            }, 1500); 
        });
    }

});