document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // NAVIGATION & MOBILE MENU
    // ==========================================
    
    // Mobile menu functionality
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ==========================================
    // LANGUAGE TOGGLE
    // ==========================================
    
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = 'en'; // Default language
    
    console.log('Language buttons found:', langButtons.length); // Debug log
    
    function switchLanguage(lang) {
        console.log('Switching language to:', lang); // Debug log
        
        // Update all elements with data-en and data-zh attributes
        const translatableElements = document.querySelectorAll('[data-en][data-zh]');
        console.log('Found translatable elements:', translatableElements.length); // Debug log
        
        translatableElements.forEach(element => {
            const enText = element.getAttribute('data-en');
            const zhText = element.getAttribute('data-zh');
            
            if (lang === 'zh') {
                element.innerHTML = zhText;
            } else {
                element.innerHTML = enText;
            }
        });
        

        
        // Update HTML lang attribute
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        
        // Store language preference
        localStorage.setItem('preferred-language', lang);
        currentLang = lang;
    }
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    if (savedLang !== 'en') {
        switchLanguage(savedLang);
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === savedLang) {
                btn.classList.add('active');
            }
        });
    }
    
    langButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent any default behavior
            console.log('Language button clicked:', this.getAttribute('data-lang')); // Debug log
            
            // Remove active class from all buttons
            langButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Switch language
            const selectedLang = this.getAttribute('data-lang');
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            switchLanguage(selectedLang);
        });
        
        // Also add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // ==========================================
    // SMOOTH SCROLLING & SCROLL SPY
    // ==========================================
    
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
    
    // Scroll spy functionality for navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let currentSection = '';
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if we're near the bottom of the page
        const isNearBottom = scrollY + windowHeight >= documentHeight - 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for navbar
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const sectionBottom = sectionTop + sectionHeight;
            
            // For the last section (internships), make it active when near bottom
            if (sectionId === 'internships' && isNearBottom) {
                currentSection = sectionId;
            }
            // Regular check for other sections
            else if (scrollY >= sectionTop && scrollY < sectionBottom) {
                currentSection = sectionId;
            }
        });
        
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current section link
        if (currentSection) {
            const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                updateSlidingIndicator(activeLink);
                document.querySelector('.nav-menu').classList.add('has-active');
            }
        } else {
            document.querySelector('.nav-menu').classList.remove('has-active');
        }
    }
    
    // 滑动蓝条指示器更新函数
    function updateSlidingIndicator(activeLink) {
        if (!activeLink) return;
        
        const navMenuElement = document.querySelector('.nav-menu');
        const linkRect = activeLink.getBoundingClientRect();
        const menuRect = navMenuElement.getBoundingClientRect();
        
        // 计算active链接相对于nav-menu的位置
        const leftOffset = linkRect.left - menuRect.left;
        const width = linkRect.width;
        
        // 更新CSS自定义属性来控制蓝条位置和宽度
        navMenuElement.style.setProperty('--indicator-left', `${leftOffset}px`);
        navMenuElement.style.setProperty('--indicator-width', `${width}px`);
    }
    
    // Throttled scroll event for performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                updateNavbarScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // 添加CSS自定义属性支持滑动蓝条
    const style = document.createElement('style');
    style.textContent = `
        .nav-menu::before {
            left: var(--indicator-left, 0);
            width: var(--indicator-width, 0);
        }
    `;
    document.head.appendChild(style);
    
    // Initial call to set active state
    updateActiveNavLink();
    
    // 窗口大小改变时重新计算蓝条位置
    window.addEventListener('resize', debounce(() => {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            updateSlidingIndicator(activeLink);
        }
    }, 100));

    // ==========================================
    // NAVBAR SCROLL EFFECTS
    // ==========================================
    
    const navbar = document.querySelector('.navbar');
    
    function updateNavbarScroll() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (window.scrollY > 50) {
            if (isDarkMode) {
                navbar.style.background = 'rgba(26, 26, 26, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            }
        } else {
            if (isDarkMode) {
                navbar.style.background = 'rgba(26, 26, 26, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
    }

    // ==========================================
    // INTERSECTION OBSERVER ANIMATIONS
    // ==========================================
    
    // Add scroll animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        // Set initial state for animation
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        observer.observe(section);
    });
    
    // Add loading animation for cards
    const cardElements = document.querySelectorAll('.news-item, .research-item, .publication-item, .timeline-item');
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger the animations
            }
        });
    }, { threshold: 0.1 });
    
    cardElements.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        cardObserver.observe(card);
    });

    // ==========================================
    // INTERACTIVE EFFECTS
    // ==========================================
    
    // Add interactive hover effects for social links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
    
    // Add copy email functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            
            // Try to copy to clipboard
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast('Email copied to clipboard!');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showToast('Email copied to clipboard!');
                } catch (err) {
                    console.error('Failed to copy email: ', err);
                }
                document.body.removeChild(textArea);
            }
        });
    });
    
    // Toast notification function
    function showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create new toast
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #2563eb;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-size: 14px;
            font-weight: 500;
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(50px)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // ==========================================
    // ACCESSIBILITY & KEYBOARD NAVIGATION
    // ==========================================
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    
    // Trap focus in mobile menu when open
    navMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && navMenu.classList.contains('active')) {
            const focusableMenuElements = navMenu.querySelectorAll('a');
            const firstFocusable = focusableMenuElements[0];
            const lastFocusable = focusableMenuElements[focusableMenuElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });

    // ==========================================
    // PROFILE PHOTO FUNCTIONALITY
    // ==========================================
    
    // Profile photo click to switch between photos
    const profilePhoto = document.getElementById('profilePhoto');
    const profileImg = document.getElementById('profileImg');
    
    if (profilePhoto && profileImg) {
        profilePhoto.addEventListener('click', function() {
            // Add flip animation
            profileImg.classList.add('flipping');
            
            setTimeout(() => {
                // Switch between profile images
                if (profileImg.src.includes('profile.jpg')) {
                    profileImg.src = 'images/assets/eddy_anime.png';
                    profileImg.alt = 'Eddy Anime Avatar';
                } else {
                    profileImg.src = 'images/assets/profile.jpg';
                    profileImg.alt = 'Eddy Luo';
                }
                
                // Remove flip animation
                setTimeout(() => {
                    profileImg.classList.remove('flipping');
                }, 300);
            }, 150);
        });
    }



    // ==========================================
    // DARK MODE FUNCTIONALITY
    // ==========================================
    
    // Utility functions
    function debounce(func, wait) {
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
    
    function getCurrentHour() {
        return new Date().getHours();
    }
    
    function shouldBeAuto() {
        const hour = getCurrentHour();
        return hour >= 18 || hour <= 6; // 6 PM to 6 AM
    }
    
    function updateDarkModeIcon(darkMode) {
        const darkModeIcon = document.getElementById('darkModeIcon');
        if (darkModeIcon) {
            if (darkMode) {
                darkModeIcon.className = 'fas fa-sun';
            } else {
                darkModeIcon.className = 'fas fa-moon';
            }
        }
    }
    
    function applyDarkMode(darkMode) {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        updateDarkModeIcon(darkMode);
        updateNavbarScroll(); // Update navbar colors
    }
    
    function checkAutoMode() {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'auto' || (!savedMode && shouldBeAuto())) {
            applyDarkMode(shouldBeAuto());
        } else if (savedMode === 'dark') {
            applyDarkMode(true);
        } else {
            applyDarkMode(false);
        }
    }
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const isDarkMode = document.body.classList.contains('dark-mode');
            const newMode = !isDarkMode;
            
            applyDarkMode(newMode);
            localStorage.setItem('darkMode', newMode ? 'dark' : 'light');
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    // Initialize dark mode
    checkAutoMode();
    
    // Check for auto mode every hour
    setInterval(checkAutoMode, 3600000);
    
    // Handle system preference changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener(debounce(() => {
            const savedMode = localStorage.getItem('darkMode');
            if (!savedMode || savedMode === 'auto') {
                applyDarkMode(mediaQuery.matches);
            }
        }, 100));
    }

    console.log('Personal website loaded successfully!');
    console.log('Dark mode status:', document.body.classList.contains('dark-mode') ? 'Dark' : 'Light');
    console.log('Auto mode:', localStorage.getItem('darkMode') === 'auto' ? 'Enabled' : 'Disabled');
    console.log('Avatar switching enabled');
}); 