import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <p>
          {t({ 
            en: '© 2024 Eddy · The University of Georgia', 
            zh: '© 2024 Eddy · 佐治亚大学' 
          })}
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
