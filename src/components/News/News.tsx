import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { newsItems } from '../../data';
import './News.css';

const News: React.FC = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.28
      }
    }
  };

  return (
    <section className="news-section" id="news">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.28 }}
        >
          {t({ en: "Eddy's News", zh: "Eddy的新闻动态" })}
        </motion.h2>

        <div className="news-scroll-container">
          <motion.div 
            className="news-timeline"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {newsItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="news-item"
                variants={itemVariants}
                whileHover={{ 
                  y: -3,
                  transition: { duration: 0.3 }
                }}
                data-news-index={index}
              >
                <div className="news-date">{item.date}</div>
                <div className="news-content">
                  <span className="news-emoji">{item.emoji}</span>
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: t(item.content) 
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default News;
