import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Navigation.css';

interface NavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionClick }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'about', label: { en: 'About', zh: '关于' } },
    { id: 'news', label: { en: 'News', zh: '动态' } },
    { id: 'publications', label: { en: 'Publications', zh: '论文' } }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = document.querySelector('.nav-menu');
      const hamburger = document.querySelector('.hamburger');
      if (isMobileMenuOpen && nav && hamburger &&
          !nav.contains(event.target as Node) &&
          !hamburger.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const navMenu = document.querySelector('.nav-menu');
    const activeLink = document.querySelector('.nav-link.active');
    if (navMenu && activeLink) {
      const menuRect = navMenu.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      (navMenu as HTMLElement).style.setProperty('--droplet-left', `${linkRect.left - menuRect.left}px`);
      (navMenu as HTMLElement).style.setProperty('--droplet-width', `${linkRect.width}px`);
      navMenu.classList.add('flowing');
      setTimeout(() => navMenu.classList.remove('flowing'), 800);
    }
  }, [activeSection]);

  const handleNavClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <button
            className={`nav-lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
          <button
            className={`nav-lang-btn ${language === 'zh' ? 'active' : ''}`}
            onClick={() => setLanguage('zh')}
          >
            中
          </button>
        </div>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''} ${activeSection ? 'has-active' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {t(item.label)}
            </a>
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
    </nav>
  );
};

export default Navigation;
