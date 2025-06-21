// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
        });
    }

    // Add smooth scrolling to all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for same-page links
            if (this.getAttribute('href').indexOf('#') === 0) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if it's open
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        mobileMenu.classList.remove('show');
                    }
                    
                    // Smooth scroll with offset for fixed header
                    window.scrollTo({
                        top: targetElement.offsetTop - 60, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Twitter-style "like" button functionality
    const likeButtons = document.querySelectorAll('.far.fa-heart').forEach(button => {
        button.parentElement.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const countSpan = this.querySelector('span');
            let count = parseInt(countSpan.textContent);
            
            if (icon.classList.contains('far')) {
                // Like
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.parentElement.classList.add('text-[#E0245E]');
                countSpan.textContent = count + 1;
            } else {
                // Unlike
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.parentElement.classList.remove('text-[#E0245E]');
                countSpan.textContent = count - 1;
            }
        });
    });

    // Twitter-style tab navigation
    const tabLinks = document.querySelectorAll('[href^="#"]');
    
    tabLinks.forEach(link => {
        if (link.closest('.flex.flex-nowrap')) {
            link.addEventListener('click', function() {
                // Remove active class from all tabs
                document.querySelectorAll('.flex.flex-nowrap a').forEach(tab => {
                    tab.classList.remove('tab-active');
                    tab.classList.add('text-[#8899A6]', 'hover:text-[#FFFFFF]');
                    tab.classList.remove('text-[#FFFFFF]');
                    tab.classList.remove('border-[#1DA1F2]');
                    tab.classList.add('border-transparent');
                });
                
                // Add active class to clicked tab
                this.classList.add('tab-active');
                this.classList.remove('text-[#8899A6]', 'hover:text-[#FFFFFF]', 'border-transparent');
                this.classList.add('text-[#FFFFFF]', 'border-[#1DA1F2]');
            });
        }
    });
});