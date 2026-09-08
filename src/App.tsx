import React, { useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation/Navigation';
import AcademicHome from './components/AcademicHome/AcademicHome';
import Footer from './components/Footer/Footer';
import { useScrollSpy } from './hooks/useScrollSpy';
import './styles/global.css';

const SECTION_IDS = ['about', 'news', 'publications', 'experience', 'interests'];

const AppContent: React.FC = () => {
  const activeSection = useScrollSpy({ sectionIds: SECTION_IDS, offset: 100 });

  useEffect(() => {
    document.body.classList.remove('dark-mode');
    localStorage.removeItem('darkMode');
  }, []);

  return (
    <>
      <Navigation activeSection={activeSection} />
      <AcademicHome />
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
