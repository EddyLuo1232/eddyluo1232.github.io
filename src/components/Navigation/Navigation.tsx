import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import './Navigation.css';

const SECTION_IDS = ['about', 'news', 'publications', 'mentees', 'experience', 'interests'];

const Navigation: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  // Scroll highlighting should update navigation without rerendering page content.
  const activeSection = useScrollSpy({ sectionIds: SECTION_IDS, offset: 100 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { id: 'about', label: { en: 'About', zh: '简介' } },
    { id: 'news', label: { en: 'News', zh: '动态' } },
    { id: 'publications', label: { en: 'Publications', zh: '论文' } },
    { id: 'mentees', label: { en: 'Mentees', zh: '学生' } },
    { id: 'experience', label: { en: 'Experience', zh: '经历' } },
    { id: 'interests', label: { en: 'Interests', zh: '兴趣' } }
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
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <div className={`nav-language nav-language-${language}`} role="group" aria-label="Language">
            <button
              className={`nav-lang-btn ${language === 'en' ? 'active' : ''}`}
              aria-pressed={language === 'en'}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button
              className={`nav-lang-btn ${language === 'zh' ? 'active' : ''}`}
              aria-pressed={language === 'zh'}
              onClick={() => setLanguage('zh')}
            >
              中
            </button>
          </div>
        </div>

        <div
          ref={navMenuRef}
          id="mobile-navigation"
          className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              aria-current={activeSection === item.id ? 'location' : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
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
