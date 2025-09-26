import React, { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import Quote from './components/Quote/Quote';
import About from './components/About/About';
import News from './components/News/News';
import Publications from './components/Publications/Publications';
import Stats from './components/Stats/Stats';
import Footer from './components/Footer/Footer';
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle';
import { useScrollSpy } from './hooks/useScrollSpy';
import './styles/global.css';

const AppContent: React.FC = () => {
  const sectionIds = ['about', 'news', 'publications'];
  const activeSection = useScrollSpy({ sectionIds, offset: 100 });

  // Smooth scroll to section
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Add Font Awesome and Google Fonts
  useEffect(() => {
    // Font Awesome
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(fontAwesome);

    // Google Fonts
    const googleFonts = document.createElement('link');
    googleFonts.rel = 'stylesheet';
    googleFonts.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(googleFonts);

    // Clustrmaps script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'clustrmaps';
    script.src = '//clustrmaps.com/map_v2.js?d=Y7nEoZfJ7y3jwj6-jBTMdqj58PnQpNj3JkSRenEst8A&cl=ffffff&w=a';
    
    // Add script to the stats widget container after component mounts
    setTimeout(() => {
      const statsWidget = document.getElementById('clustrmaps-widget');
      if (statsWidget && !document.getElementById('clustrmaps')) {
        statsWidget.appendChild(script);
      }
    }, 2000);

    return () => {
      // Cleanup
      if (fontAwesome.parentNode) {
        fontAwesome.parentNode.removeChild(fontAwesome);
      }
      if (googleFonts.parentNode) {
        googleFonts.parentNode.removeChild(googleFonts);
      }
    };
  }, []);

  // Add email copy functionality
  useEffect(() => {
    const handleEmailClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target && target.getAttribute('href')?.startsWith('mailto:')) {
        e.preventDefault();
        const email = target.getAttribute('href')?.replace('mailto:', '') || '';
        
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
      }
    };

    document.addEventListener('click', handleEmailClick);
    return () => document.removeEventListener('click', handleEmailClick);
  }, []);

  // Toast notification function
  const showToast = (message: string) => {
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
  };

  return (
    <>
      <Navigation 
        activeSection={activeSection} 
        onSectionClick={handleSectionClick} 
      />
      <Hero />
      <Quote />
      <About />
      <News />
      <Publications />
      <Stats />
      <Footer />
      <DarkModeToggle />
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;