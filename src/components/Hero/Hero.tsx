import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { personalInfo, socialLinks } from '../../data';
import './Hero.css';

const Hero: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isAnimeAvatar, setIsAnimeAvatar] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleAvatarClick = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    
    setTimeout(() => {
      setIsAnimeAvatar(!isAnimeAvatar);
      setTimeout(() => {
        setIsFlipping(false);
      }, 300);
    }, 150);
  };

  const handleLanguageChange = (newLanguage: 'en' | 'zh') => {
    setLanguage(newLanguage);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const imageVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section className="hero" id="about">
      <div className="container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-image" variants={imageVariants}>
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
          </motion.div>

          <div className="hero-text">
            <motion.div className="language-toggle" variants={itemVariants}>
              <button
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                English
              </button>
              <button
                className={`lang-btn ${language === 'zh' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('zh')}
              >
                中文
              </button>
            </motion.div>

            <motion.h1 className="hero-title" variants={itemVariants}>
              {personalInfo.name}
            </motion.h1>

            <motion.h2 className="hero-subtitle" variants={itemVariants}>
              {t(personalInfo.title)}
            </motion.h2>

            <motion.p className="hero-motto" variants={itemVariants}>
              {personalInfo.motto}
            </motion.p>

            <motion.div className="hero-info" variants={itemVariants}>
              <p>
                <i className="fas fa-map-marker-alt"></i> {t(personalInfo.location)}
              </p>
              <div className="social-links">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    className="social-link"
                    target={link.id === 'resume' ? '_blank' : undefined}
                    rel={link.id === 'resume' ? 'noopener noreferrer' : undefined}
                    whileHover={{ 
                      y: -3,
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.iconType === 'img' && link.imgSrc ? (
                      <img src={link.imgSrc} alt={t(link.label)} className="rednote-icon" />
                    ) : (
                      <i className={link.icon}></i>
                    )}
                    <span>{t(link.label)}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
