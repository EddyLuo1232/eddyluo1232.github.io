import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Navigation.css';

interface NavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionClick }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const navItems = [
    { id: 'about', label: { en: 'About', zh: '简介' } },
    { id: 'experience', label: { en: 'Experience', zh: '经历' } },
    { id: 'news', label: { en: 'News', zh: '动态' } },
    { id: 'publications', label: { en: 'Publications', zh: '论文' } }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const nav = navMenuRef.current;
      const hamburger = hamburgerRef.current;
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

  useLayoutEffect(() => {
    const navMenu = navMenuRef.current;
    const activeLink = linkRefs.current[activeSection];
    if (!navMenu || !activeLink) {
      return;
    }

    const updateIndicator = () => {
      const menuRect = navMenu.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      navMenu.style.setProperty('--indicator-left', `${linkRect.left - menuRect.left}px`);
      navMenu.style.setProperty('--indicator-width', `${linkRect.width}px`);
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeSection, language, isMobileMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <div className="nav-language">
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
        </div>

        <div
          ref={navMenuRef}
          id="mobile-navigation"
          className={`nav-menu ${isMobileMenuOpen ? 'active' : ''} ${activeSection ? 'has-active' : ''}`}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              ref={(node) => {
                linkRefs.current[item.id] = node;
              }}
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

        <button
          ref={hamburgerRef}
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          type="button"
          aria-label={
            language === 'zh'
              ? (isMobileMenuOpen ? '关闭导航菜单' : '打开导航菜单')
              : (isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu')
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
