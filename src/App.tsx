import React, { useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation/Navigation';
import AcademicHome from './components/AcademicHome/AcademicHome';
import Footer from './components/Footer/Footer';
import './styles/global.css';

const AppContent: React.FC = () => {
  useEffect(() => {
    document.body.classList.remove('dark-mode');
    try {
      localStorage.removeItem('darkMode');
    } catch {
      // Clearing a legacy preference must not prevent the page from rendering.
    }
  }, []);

  return (
    <>
      <Navigation />
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
