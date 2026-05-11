import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
      setTimeout(() => {
        setIsFlipping(false);
      }, 300);
    }, 150);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35
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
            <motion.div className="hero-identity" variants={itemVariants}>
              <h1 className="hero-title">{personalInfo.name}</h1>
              <h2 className="hero-subtitle">{t(personalInfo.title)}</h2>
              <p className="hero-location">
                <i className="fas fa-map-marker-alt"></i> {t(personalInfo.location)}
              </p>
            </motion.div>
          </motion.div>

          <div className="hero-text">
            {personalInfo.motto && (
              <motion.p className="hero-motto" variants={itemVariants}>
                {personalInfo.motto}
              </motion.p>
            )}

            <motion.div className="hero-bio" variants={itemVariants}>
              <div dangerouslySetInnerHTML={{ __html: t(aboutContent.bio) }} />
              <div
                dangerouslySetInnerHTML={{ __html: t(aboutContent.contact) }}
                style={{ marginTop: '0.9rem' }}
              />
            </motion.div>

            <motion.div className="hero-info" variants={itemVariants}>
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
