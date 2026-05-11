import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './DarkModeToggle.css';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      className="dark-mode-toggle"
      onClick={toggleTheme}
      title="Toggle Dark Mode"
    >
      <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'} />
    </button>
  );
};

export default DarkModeToggle;
