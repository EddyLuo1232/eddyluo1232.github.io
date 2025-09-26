import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { publications, preprints } from '../../data';
import './Publications.css';

const Publications: React.FC = () => {
  const { t } = useLanguage();

  const PublicationItem: React.FC<{ publication: any }> = ({ publication }) => (
    <div
      className="publication-item"
      style={{
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div className="publication-image">
        <div className="publication-badge">{publication.badge}</div>
        <img 
          src={publication.image} 
          alt={publication.alt}
          style={{
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        />
      </div>
      <div className="publication-content">
        <h4 dangerouslySetInnerHTML={{ __html: publication.authors }} />
        <div dangerouslySetInnerHTML={{ __html: t(publication.title) }} />
        <div className="publication-links">
          {publication.links.map((link: any, index: number) => (
            <a
              key={index}
              href={link.href}
              className="pub-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t(link.label)}
            </a>
          ))}
        </div>
        {publication.award && (
          <div style={{ marginTop: '8px' }}>
            <span style={{ 
              color: '#FF0000', 
              fontSize: '0.9em', 
              fontWeight: '500' 
            }}>
              {t(publication.award)}
            </span>
          </div>
        )}
        {publication.nvidia && (
          <div style={{ marginTop: '4px' }}>
            <span style={{ 
              color: '#FF0000', 
              fontSize: '0.9em', 
              fontWeight: '500' 
            }}>
              {t(publication.nvidia)}
            </span>
          </div>
        )}
        {publication.stats && (
          <div style={{ marginTop: '8px' }}>
            <span style={{ 
              color: '#FF0000', 
              fontSize: '0.9em', 
              fontWeight: '500' 
            }}>
              {t(publication.stats)}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="publications-section" id="publications">
      <div className="container">
        {/* Pre-prints Section */}
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          📝 {t({ en: "Eddy's Selected Pre-print", zh: "Eddy的精选预印本论文" })}
        </motion.h2>

        <div className="publication-grid">
          {preprints.map((publication, index) => (
            <motion.div
              key={publication.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PublicationItem publication={publication} />
            </motion.div>
          ))}
        </div>

        {/* Publications Section */}
        <motion.h2 
          className="section-title"
          style={{ marginTop: '4rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          📸 {t({ en: "Eddy's Selected Publication", zh: "Eddy的精选已发表论文" })}
        </motion.h2>

        <div className="publication-grid">
          {publications.map((publication, index) => (
            <motion.div
              key={publication.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PublicationItem publication={publication} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;