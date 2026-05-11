import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { personalInfo, socialLinks, aboutContent } from '../../data';
import './Hero.css';

const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const [isAnimeAvatar, setIsAnimeAvatar] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleAvatarClick = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setIsAnimeAvatar(!isAnimeAvatar);
      setTimeout(() => setIsFlipping(false), 300);
    }, 150);
  };

  return (
    <section className="hero" id="about">
      <div className="container">
        <div className="hero-content">
          <div className="hero-image">
            <div className="profile-photo" onClick={handleAvatarClick}>
              <img
                src={isAnimeAvatar ? personalInfo.profileImages.anime : personalInfo.profileImages.photo}
                alt={isAnimeAvatar ? 'Eddy Anime Avatar' : 'Eddy Luo'}
                className={`profile-img ${isFlipping ? 'flipping' : ''} ${isAnimeAvatar ? 'anime' : ''}`}
              />
              <div className="avatar-hint">
                {language === 'zh' ? '点击切换头像' : 'Click to switch avatar'}
              </div>
            </div>
            <div className="hero-identity">
              <h1 className="hero-title">{personalInfo.name}</h1>
              <h2 className="hero-subtitle">{t(personalInfo.title)}</h2>
              <p className="hero-location">
                <i className="fas fa-map-marker-alt"></i> {t(personalInfo.location)}
              </p>
            </div>
          </div>

          <div className="hero-text">
            {personalInfo.motto && (
              <p className="hero-motto">{personalInfo.motto}</p>
            )}

            <div className="hero-bio">
              <div dangerouslySetInnerHTML={{ __html: t(aboutContent.bio) }} />
              <div
                dangerouslySetInnerHTML={{ __html: t(aboutContent.contact) }}
                style={{ marginTop: '0.9rem' }}
              />
            </div>

            <div className="hero-info">
              <div className="social-links">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="social-link"
                    target={link.id === 'resume' ? '_blank' : undefined}
                    rel={link.id === 'resume' ? 'noopener noreferrer' : undefined}
                  >
                    {link.iconType === 'img' && link.imgSrc ? (
                      <img src={link.imgSrc} alt={t(link.label)} className="rednote-icon" />
                    ) : (
                      <i className={link.icon}></i>
                    )}
                    <span>{t(link.label)}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
