import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import './Stats.css';

const Stats: React.FC = () => {
  const { t } = useLanguage();
  const scriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Clustrmaps script dynamically
    if (scriptRef.current && !document.getElementById('clustrmaps')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'clustrmaps';
      script.src = '//clustrmaps.com/map_v2.js?d=Y7nEoZfJ7y3jwj6-jBTMdqj58PnQpNj3JkSRenEst8A&cl=ffffff&w=a';
      script.async = true;
      scriptRef.current.appendChild(script);
    }
  }, []);

  return (
    <section className="stats-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          🌍 {t({ en: 'Visitor Statistics', zh: '访客统计' })}
        </motion.h2>
        
        <motion.div 
          className="stats-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div 
            ref={scriptRef}
            id="clustrmaps-widget" 
            style={{ width: '100%', textAlign: 'center', padding: '20px' }}
          >
            {/* Clustrmaps widget will be loaded here dynamically */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
