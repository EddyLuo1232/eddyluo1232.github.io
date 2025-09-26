import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import './Navigation.css';

interface NavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionClick }) => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Navigation items
  const navItems = [
    { id: 'about', label: { en: 'About', zh: '关于' } },
    { id: 'news', label: { en: 'News', zh: '动态' } },
    { id: 'publications', label: { en: 'Publications', zh: '论文' } }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector('.nav-menu');
      const hamburger = document.querySelector('.hamburger');
      
      if (isMobileMenuOpen && 
          nav && 
          hamburger &&
          !nav.contains(event.target as Node) && 
          !hamburger.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Update droplet indicator position and size
  useEffect(() => {
    const navMenu = document.querySelector('.nav-menu');
    const activeLink = document.querySelector('.nav-link.active');
    
    if (navMenu && activeLink) {
      const menuRect = navMenu.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      
      const leftOffset = linkRect.left - menuRect.left;
      const width = linkRect.width;
      
      // Set CSS custom properties for the droplet position and size
      (navMenu as HTMLElement).style.setProperty('--droplet-left', `${leftOffset}px`);
      (navMenu as HTMLElement).style.setProperty('--droplet-width', `${width}px`);
      
      // Trigger flow animation
      navMenu.classList.add('flowing');
      setTimeout(() => {
        navMenu.classList.remove('flowing');
      }, 800);
    }
  }, [activeSection]);

  const handleNavClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsMobileMenuOpen(false);
  };


  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="nav-container">
        <div className="nav-logo">
          <h2>Eddy Luo's Page</h2>
        </div>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''} ${activeSection ? 'has-active' : ''}`}>
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t(item.label)}
            </motion.a>
          ))}
        </div>


        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }
          }}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
