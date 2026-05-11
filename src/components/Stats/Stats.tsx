import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Stats.css';

const Stats: React.FC = () => {
  const { t } = useLanguage();
  const scriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        <h2 className="section-title">
          {t({ en: 'Visitor Statistics', zh: '访客统计' })}
        </h2>
        <div className="stats-container">
          <div
            ref={scriptRef}
            id="clustrmaps-widget"
            style={{ width: '100%', textAlign: 'center', padding: '20px' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
