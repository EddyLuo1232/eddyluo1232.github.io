import React, { useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Footer.css';

const VISITOR_MAP_SCRIPTS = [
  {
    id: 'mapmyvisitors-original',
    src: '//mapmyvisitors.com/map.js?d=gWFCgejqrcPF2cqffm2nGfYs_PdNJ6MVAEIHnllXpqo&cl=ffffff&w=a'
  },
  {
    id: 'mapmyvisitors-hidden',
    src: '//mapmyvisitors.com/map.js?d=7CTeFyC3wT_A3DlE7A976YOUbxvdVPWluGcvGoy_E6A&cl=ffffff&w=a'
  }
];

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handleMapTrigger = () => {
    if (!mapContainerRef.current) {
      return;
    }

    VISITOR_MAP_SCRIPTS.forEach(({ id, src }) => {
      if (document.getElementById(id)) {
        return;
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = id;
      script.src = src;
      mapContainerRef.current?.appendChild(script);
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <button className="footer-trigger" type="button" onClick={handleMapTrigger}>
          {t({
            en: '© 2024 Eddy · The University of Georgia',
            zh: '© 2024 Eddy · 佐治亚大学'
          })}
        </button>
        <div ref={mapContainerRef} className="footer-visitor-map" aria-hidden="true" />
      </div>
    </footer>
  );
};

export default Footer;
