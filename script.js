// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: false,
        mirror: true,
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('show');
            }
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
                    const navbarHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active tab
                    updateActiveTab(targetId);
                }
            }
        });
    });

    // Function to update the active tab based on section
    function updateActiveTab(targetId) {
        const navTabs = document.querySelectorAll('.flex.flex-nowrap a');
        navTabs.forEach(tab => {
            tab.classList.remove('tab-active');
            tab.classList.add('text-[#8899A6]', 'hover:text-[#FFFFFF]');
            tab.classList.remove('text-[#FFFFFF]');
            tab.classList.remove('border-[#1DA1F2]');
            tab.classList.add('border-transparent');
        });
        
        const activeTab = document.querySelector(`.flex.flex-nowrap a[href="${targetId}"]`);
        if (activeTab) {
            activeTab.classList.add('tab-active');
            activeTab.classList.remove('text-[#8899A6]', 'hover:text-[#FFFFFF]', 'border-transparent');
            activeTab.classList.add('text-[#FFFFFF]', 'border-[#1DA1F2]');
        }
    }

    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navbarHeight = document.querySelector('nav').offsetHeight;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        if (current !== '') {
            updateActiveTab(current);
        }
    });

    // Animate numbers on page load
    animateNumbers();

    // Initialize heart like buttons
    initLikeButtons();

    // Initialize typing animation
    initTypingAnimation();

    // Initialize progress bars
    initProgressBars();

    // Contact form handling
    initContactForm();
    
    // Add custom cursor trail effect
    initCursorEffect();
});

// Function to animate counting up numbers
function animateNumbers() {
    const numberElements = document.querySelectorAll('.animate-number');
    
    numberElements.forEach(element => {
        const finalValue = parseInt(element.getAttribute('data-final-value'));
        const duration = 2000; // animation duration in milliseconds
        let startTime = null;
        
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = Math.floor(progress * finalValue);
            element.textContent = currentValue;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = finalValue;
            }
        }
        
        // Start the animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.requestAnimationFrame(step);
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.5});
        
        observer.observe(element);
    });
}

// Function to handle like buttons
function initLikeButtons() {
    const likeButtons = document.querySelectorAll('.heart-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const countSpan = this.querySelector('span');
            let count = parseInt(countSpan.textContent);
            
            if (icon.classList.contains('far')) {
                // Like
                icon.classList.remove('far');
                icon.classList.add('fas', 'heart-animate', 'active');
                countSpan.textContent = count + 1;
                
                setTimeout(() => {
                    icon.classList.remove('heart-animate');
                }, 800);
            } else {
                // Unlike
                icon.classList.remove('fas', 'active');
                icon.classList.add('far');
                countSpan.textContent = count - 1;
            }
        });
    });
}

// Function to initialize typing animation
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        // Store the original text and clear the element
        const originalText = element.textContent.trim();
        element.textContent = '';
        element.style.width = '100%';
        
        // Create a typing observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeText(element, originalText);
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.1});
        
        observer.observe(element);
    });
    
    function typeText(element, text) {
        let i = 0;
        const typingSpeed = 20; // milliseconds per character
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, typingSpeed);
            } else {
                element.classList.remove('typing-animation');
            }
        }
        
        setTimeout(type, 300);
    }
}

// Initialize progress bars
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const dataWidth = bar.parentElement.querySelector('[data-aos="width"]');
        if (dataWidth) {
            const targetWidth = dataWidth.getAttribute('data-width');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            dataWidth.style.width = targetWidth;
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, {threshold: 0.2});
            
            observer.observe(bar.parentElement);
        }
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Display success message (in a real application, you'd send this to a server)
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            button.disabled = true;
            button.innerHTML = '<span class="loading-spinner mr-2"></span> Sending...';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                button.disabled = false;
                button.innerHTML = originalText;
            }, 2000);
        });
    }
}

// Function to show toast notifications
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container fixed bottom-4 right-4 z-50';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast bg-[#192734] border border-[#38444d] rounded-lg p-4 mb-3 flex items-center shadow-lg animate__animated animate__fadeInUp`;
    
    // Set icon and color based on type
    let icon, color;
    switch (type) {
        case 'success':
            icon = 'fa-check-circle';
            color = '#17BF63';
            break;
        case 'error':
            icon = 'fa-times-circle';
            color = '#E0245E';
            break;
        case 'warning':
            icon = 'fa-exclamation-circle';
            color = '#FFAD1F';
            break;
        default:
            icon = 'fa-info-circle';
            color = '#1DA1F2';
    }
    
    toast.innerHTML = `
        <div class="mr-3">
            <i class="fas ${icon}" style="color: ${color}; font-size: 1.25rem;"></i>
        </div>
        <div class="text-[#FFFFFF]">${message}</div>
        <button class="ml-auto text-[#8899A6] hover:text-[#FFFFFF]">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Add close button functionality
    const closeBtn = toast.querySelector('button');
    closeBtn.addEventListener('click', () => {
        toast.classList.replace('animate__fadeInUp', 'animate__fadeOutDown');
        setTimeout(() => {
            toast.remove();
        }, 500);
    });
    
    // Auto remove toast after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.replace('animate__fadeInUp', 'animate__fadeOutDown');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 500);
        }
    }, 5000);
}

// Cursor trail effect
function initCursorEffect() {
    // Only enable on non-touch devices
    if (!('ontouchstart' in window)) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        cursor.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background-color: rgba(29, 161, 242, 0.7);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s, opacity 0.2s;
            mix-blend-mode: screen;
            display: none;
        `;
        document.body.appendChild(cursor);
        
        // Trail particles
        const particles = [];
        const particleCount = 10;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            particle.style.cssText = `
                position: fixed;
                width: 5px;
                height: 5px;
                background-color: rgba(29, 161, 242, ${0.5 - (i * 0.05)});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transform: translate(-50%, -50%);
                transition: width 0.2s, height 0.2s, opacity 0.2s;
                display: none;
            `;
            document.body.appendChild(particle);
            particles.push({
                element: particle,
                x: 0,
                y: 0
            });
        }
        
        // Handle mouse movement
        document.addEventListener('mousemove', (e) => {
            // Set cursor position
            cursor.style.display = 'block';
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            // Add pulse effect when hovering over interactive elements
            const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
            if (hoveredElement && (
                hoveredElement.tagName === 'A' ||
                hoveredElement.tagName === 'BUTTON' ||
                hoveredElement.closest('a') ||
                hoveredElement.closest('button') ||
                hoveredElement.classList.contains('project-card') ||
                hoveredElement.closest('.project-card')
            )) {
                cursor.style.width = '15px';
                cursor.style.height = '15px';
                cursor.style.backgroundColor = 'rgba(29, 161, 242, 0.3)';
            } else {
                cursor.style.width = '8px';
                cursor.style.height = '8px';
                cursor.style.backgroundColor = 'rgba(29, 161, 242, 0.7)';
            }
            
            // Update particle positions with delay
            setTimeout(() => {
                for (let i = 0; i < particles.length; i++) {
                    const particle = particles[i];
                    particle.x = e.clientX;
                    particle.y = e.clientY;
                    particle.element.style.display = 'block';
                    particle.element.style.left = `${particle.x}px`;
                    particle.element.style.top = `${particle.y}px`;
                }
            }, 80);
        });
        
        // Hide cursor and particles when mouse leaves window
        document.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
            particles.forEach(particle => {
                particle.element.style.display = 'none';
            });
        });
        
        // Custom behavior for different elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursor.style.opacity = '0.5';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.opacity = '1';
            });
        });
    }
}

// Add parallax effect to banner
function initParallaxEffect() {
    const banner = document.querySelector('.bg-gradient-to-r');
    
    if (banner) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const bannerPosition = scrollPosition * 0.4;
            banner.style.backgroundPosition = `0px ${bannerPosition}px`;
        });
    }
}

// Initialize any scroll-triggered animations not handled by AOS
function initScrollAnimations() {
    const elements = document.querySelectorAll('.scroll-animate');
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Optionally reset animations when elements scroll out of view
                // entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize theme toggle (optional)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference or use device preference
        const savedTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update toggle state
        themeToggle.checked = savedTheme === 'dark';
        
        // Listen for toggle changes
        themeToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Call additional initialization functions
window.addEventListener('load', function() {
    initScrollAnimations();
    initParallaxEffect();
    // Uncomment if you want to implement theme toggle
    // initThemeToggle();
});



document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper for Project 1
    const swiper1 = new Swiper(".projectSwiper1", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination-1", // Use unique selector
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: ".swiper-button-next-1", // Use unique selector
            prevEl: ".swiper-button-prev-1", // Use unique selector
        },
        effect: "fade",
        fadeEffect: {
            crossFade: true
        }
    });

    // Initialize Swiper for Project 2
    const swiper2 = new Swiper(".projectSwiper2", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination-2", // Use unique selector
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: ".swiper-button-next-2", // Use unique selector
            prevEl: ".swiper-button-prev-2", // Use unique selector
        },
        effect: "fade",
        fadeEffect: {
            crossFade: true
        }
    });
});
// Add this to ensure sliders maintain proportions after refresh
window.addEventListener('load', function() {
    // Force refresh the Swiper instances
    if (typeof swiper1 !== 'undefined' && swiper1) {
        swiper1.update();
    }
    
    if (typeof swiper2 !== 'undefined' && swiper2) {
        swiper2.update();
    }
    
    // Force consistent heights with a slight delay
    setTimeout(function() {
        document.querySelectorAll('.project-card .bg-\\[\\#192734\\]').forEach(function(el) {
            el.style.height = '240px';
        });
    }, 100);
});

setTimeout(() => {
    swiper.update(); // Force recalculation after layout shift
  }, 300);
  