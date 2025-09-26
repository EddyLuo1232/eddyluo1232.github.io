import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if it should be dark mode based on time
  const shouldBeAutoDark = (): boolean => {
    const hour = new Date().getHours();
    return hour >= 18 || hour <= 6; // 6 PM to 6 AM
  };

  // Apply theme to document
  const applyTheme = (newTheme: Theme) => {
    const shouldBeDark = newTheme === 'dark' || (newTheme === 'auto' && shouldBeAutoDark());
    
    setIsDarkMode(shouldBeDark);
    
    if (shouldBeDark) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') as Theme;
    const initialTheme: Theme = savedTheme || 'auto';
    
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, []);

  // Handle auto theme changes based on time
  useEffect(() => {
    if (theme === 'auto') {
      const interval = setInterval(() => {
        applyTheme('auto');
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [theme]);

  // Handle system theme preference changes
  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('auto');
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('darkMode', newTheme);
  };

  const toggleTheme = () => {
    const newTheme: Theme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const value = {
    theme,
    isDarkMode,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
