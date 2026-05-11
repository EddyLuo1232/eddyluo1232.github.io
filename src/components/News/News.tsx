import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { newsItems } from '../../data';
import './News.css';

const News: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="news-section" id="news">
      <div className="container">
        <h2 className="section-title">
          {t({ en: "Eddy's News", zh: "Eddy的新闻动态" })}
        </h2>

        <div className="news-scroll-container">
          <div className="news-timeline">
            {newsItems.map((item, index) => (
              <div key={item.id} className="news-item" data-news-index={index}>
                <div className="news-date">{item.date}</div>
                <div className="news-content">
                  <span className="news-emoji">{item.emoji}</span>
                  <div dangerouslySetInnerHTML={{ __html: t(item.content) }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
