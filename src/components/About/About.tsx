import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { aboutContent } from '../../data';
import './About.css';

const About: React.FC = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="about-section" id="about">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          {t(aboutContent.sectionTitle)}
        </motion.h2>

        <motion.div 
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="about-text" variants={itemVariants}>
            <div 
              dangerouslySetInnerHTML={{ 
                __html: t(aboutContent.bio) 
              }}
            />
            
            <div 
              dangerouslySetInnerHTML={{ 
                __html: t(aboutContent.contact) 
              }}
              style={{ marginTop: '1.5rem' }}
            />
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default About;
