import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Language, TranslatableText } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: TranslatableText) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Initialize language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      setLanguageState(savedLanguage);
      updateDocumentLanguage(savedLanguage);
    }
  }, []);

  // Update document language attribute
  const updateDocumentLanguage = (lang: Language) => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    updateDocumentLanguage(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  };

  // Translation function
  const t = (text: TranslatableText): string => {
    return text[language] || text.en;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
