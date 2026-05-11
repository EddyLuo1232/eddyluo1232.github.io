import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container">
        <p>
          {t({
            en: '© 2024 Eddy · The University of Georgia',
            zh: '© 2024 Eddy · 佐治亚大学'
          })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
