import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { publications, preprints } from '../../data';
import './Publications.css';

const Publications: React.FC = () => {
  const { t } = useLanguage();

  const PublicationItem: React.FC<{ publication: any }> = ({ publication }) => (
    <div className="publication-item">
      <div className="publication-image">
        <div className="publication-badge">{publication.badge}</div>
        <img src={publication.image} alt={publication.alt} />
      </div>
      <div className="publication-content">
        <h4 dangerouslySetInnerHTML={{ __html: publication.authors }} />
        <div dangerouslySetInnerHTML={{ __html: t(publication.title) }} />
        <div className="publication-links">
          {publication.links.map((link: any, index: number) => (
            link.href ? (
              <a key={index} href={link.href} className="pub-link" target="_blank" rel="noopener noreferrer">
                {t(link.label)}
              </a>
            ) : (
              <span key={index} className="pub-link pub-link-disabled">{t(link.label)}</span>
            )
          ))}
        </div>
        {publication.award && (
          <div style={{ marginTop: '8px' }}>
            <span style={{ color: '#8b1a1a', fontSize: '0.9em', fontWeight: '500' }}>
              {t(publication.award)}
            </span>
          </div>
        )}
        {publication.integrations && (
          <div className="publication-integrations">
            <span>{t({ en: 'Integrated into: ', zh: '已集成到：' })}</span>
            {publication.integrations.map((integration: any, index: number) => (
              <React.Fragment key={integration.href}>
                {index > 0 && <span className="publication-integration-separator"> · </span>}
                <a href={integration.href} className="pub-link" target="_blank" rel="noopener noreferrer">
                  {t(integration.label)}
                </a>
              </React.Fragment>
            ))}
          </div>
        )}
        {publication.stats && (
          <div style={{ marginTop: '8px' }}>
            <span style={{ color: '#8b1a1a', fontSize: '0.9em', fontWeight: '500' }}>
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
        <h2 className="section-title">
          {t({ en: "Eddy's Selected Pre-print", zh: "Eddy的精选预印本论文" })}
        </h2>

        <div className="publication-grid">
          {preprints.map((publication) => (
            <PublicationItem key={publication.id} publication={publication} />
          ))}
        </div>

        <h2 className="section-title" style={{ marginTop: '4rem' }}>
          {t({ en: "Eddy's Selected Publication", zh: "Eddy的精选已发表论文" })}
        </h2>

        <div className="publication-grid">
          {publications.map((publication) => (
            <PublicationItem key={publication.id} publication={publication} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
