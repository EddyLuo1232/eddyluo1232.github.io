import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { quote } from '../../data';
import './Quote.css';

const Quote: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="quote-section">
      <div className="container">
        <div className="quote-with-images">
          <img src={quote.images.left} alt="Left Anime Character" className="quote-image left" />
          <blockquote>
            <p>{t(quote.text)}</p>
            <p className="japanese">{quote.japanese}</p>
            <cite>{t(quote.author)}</cite>
          </blockquote>
          <img src={quote.images.right} alt="Right Anime Character" className="quote-image right" />
        </div>
      </div>
    </section>
  );
};

export default Quote;
