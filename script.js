document.addEventListener('DOMContentLoaded', function() {
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
    
    // Language toggle functionality
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
        
        // Update news toggle text
        const newsToggleText = document.getElementById('newsToggleText');
        const newsToggleBtn = document.getElementById('newsToggleBtn');
        if (newsToggleText && newsToggleBtn) {
            const isExpanded = newsToggleBtn.classList.contains('expanded');
            if (lang === 'zh') {
                newsToggleText.textContent = isExpanded ? '显示更少' : '显示所有新闻';
            } else {
                newsToggleText.textContent = isExpanded ? 'Show Less' : 'Show All News';
            }
        }
        
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
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
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
    
    // Add print button functionality
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
    });
    
    // Add scroll-to-top functionality
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #2563eb;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll-to-top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Add hover effects for scroll-to-top button
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#1d4ed8';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#2563eb';
    });
    
    // News toggle functionality
    const newsToggleBtn = document.getElementById('newsToggleBtn');
    const newsToggleText = document.getElementById('newsToggleText');
    const newsToggleIcon = document.getElementById('newsToggleIcon');
    const visibleNewsCount = document.getElementById('visibleNewsCount');
    const totalNewsCount = document.getElementById('totalNewsCount');
    const newsItems = document.querySelectorAll('.news-item');
    
    let isExpanded = false;
    const defaultVisibleCount = 3;
    
    // Set initial state
    totalNewsCount.textContent = newsItems.length;
    visibleNewsCount.textContent = defaultVisibleCount;
    
    // Hide items beyond the default count
    newsItems.forEach((item, index) => {
        if (index >= defaultVisibleCount) {
            item.classList.add('collapsed');
        }
    });
    
    newsToggleBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            // Show all news
            newsItems.forEach((item, index) => {
                if (index >= defaultVisibleCount) {
                    item.classList.remove('collapsed');
                    item.classList.add('show');
                    
                    // Stagger the animation
                    setTimeout(() => {
                        item.style.display = 'grid';
                    }, (index - defaultVisibleCount) * 100);
                }
            });
            
            if (currentLang === 'zh') {
                newsToggleText.textContent = '显示更少';
            } else {
                newsToggleText.textContent = 'Show Less';
            }
            newsToggleIcon.className = 'fas fa-chevron-up';
            newsToggleBtn.classList.add('expanded');
            visibleNewsCount.textContent = newsItems.length;
            
        } else {
            // Hide news beyond default count
            newsItems.forEach((item, index) => {
                if (index >= defaultVisibleCount) {
                    item.classList.add('collapsed');
                    item.classList.remove('show');
                    
                    // Fade out animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                        item.style.opacity = '';
                        item.style.transform = '';
                    }, 300);
                }
            });
            
            if (currentLang === 'zh') {
                newsToggleText.textContent = '显示所有新闻';
            } else {
                newsToggleText.textContent = 'Show All News';
            }
            newsToggleIcon.className = 'fas fa-chevron-down';
            newsToggleBtn.classList.remove('expanded');
            visibleNewsCount.textContent = defaultVisibleCount;
        }
        
        // Add a subtle animation to the button
        newsToggleBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            newsToggleBtn.style.transform = '';
        }, 150);
    });
    
    // Add keyboard support for news toggle
    newsToggleBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // Performance optimization: debounce scroll events
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
    
    // Apply debounce to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Your scroll handling code here
        console.log('Scroll event fired');
    }, 100);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Dark Mode functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const body = document.body;
    
    // Check for saved dark mode preference or default to auto mode
    const savedDarkMode = localStorage.getItem('darkMode');
    let isDarkMode = savedDarkMode === 'true';
    let isAutoMode = savedDarkMode === null || savedDarkMode === 'auto';
    
    function getCurrentHour() {
        return new Date().getHours();
    }
    
    function shouldBeAuto() {
        const hour = getCurrentHour();
        // Auto dark mode between 18:00 (6 PM) and 06:00 (6 AM)
        return hour >= 18 || hour < 6;
    }
    
    function updateDarkModeIcon(darkMode) {
        if (darkMode) {
            darkModeIcon.className = 'fas fa-sun';
            darkModeToggle.title = 'Switch to Light Mode';
        } else {
            darkModeIcon.className = 'fas fa-moon';
            darkModeToggle.title = 'Switch to Dark Mode';
        }
    }
    
    function applyDarkMode(darkMode) {
        if (darkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        updateDarkModeIcon(darkMode);
        isDarkMode = darkMode;
    }
    
    function checkAutoMode() {
        if (isAutoMode) {
            const shouldBeDark = shouldBeAuto();
            if (shouldBeDark !== isDarkMode) {
                applyDarkMode(shouldBeDark);
                console.log(`Auto switched to ${shouldBeDark ? 'dark' : 'light'} mode at ${getCurrentHour()}:00`);
            }
        }
    }
    
    // Initialize dark mode
    if (isAutoMode) {
        isDarkMode = shouldBeAuto();
        console.log('Auto mode enabled, current time:', getCurrentHour() + ':00');
    }
    applyDarkMode(isDarkMode);
    
    // Dark mode toggle event
    darkModeToggle.addEventListener('click', function() {
        // Toggle between manual modes (light/dark)
        if (isAutoMode || !isDarkMode) {
            // Switch to dark mode
            applyDarkMode(true);
            localStorage.setItem('darkMode', 'true');
            isAutoMode = false;
            console.log('Manually switched to dark mode');
        } else {
            // Switch to light mode
            applyDarkMode(false);
            localStorage.setItem('darkMode', 'false');
            isAutoMode = false;
            console.log('Manually switched to light mode');
        }
        
        // Add button click animation
        darkModeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            darkModeToggle.style.transform = '';
        }, 100);
    });
    
    // Double-click to enable auto mode
    darkModeToggle.addEventListener('dblclick', function() {
        isAutoMode = true;
        localStorage.setItem('darkMode', 'auto');
        checkAutoMode();
        showToast(isDarkMode ? 'Auto mode enabled (Dark)' : 'Auto mode enabled (Light)');
        console.log('Auto mode enabled');
    });
    
    // Check for auto mode every minute
    setInterval(checkAutoMode, 60000);
    
    // Check on visibility change (when user returns to tab)
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && isAutoMode) {
            checkAutoMode();
        }
    });
    
    console.log('Personal website loaded successfully!');
    console.log('Dark mode status:', isDarkMode ? 'Dark' : 'Light');
    console.log('Auto mode:', isAutoMode ? 'Enabled' : 'Disabled');
}); 