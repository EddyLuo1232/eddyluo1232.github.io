import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { quote } from '../../data';
import './Quote.css';

const Quote: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="quote-section">
      <div className="container">
        <motion.div 
          className="quote-with-images"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35 }}
        >
          <motion.img 
            src={quote.images.left} 
            alt="Left Anime Character" 
            className="quote-image left"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          
          <blockquote>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.28 }}
            >
              {t(quote.text)}
            </motion.p>
            <motion.p 
              className="japanese"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18, duration: 0.28 }}
            >
              {quote.japanese}
            </motion.p>
            <motion.cite
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.26, duration: 0.28 }}
            >
              {t(quote.author)}
            </motion.cite>
          </blockquote>
          
          <motion.img 
            src={quote.images.right} 
            alt="Right Anime Character" 
            className="quote-image right"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Quote;
