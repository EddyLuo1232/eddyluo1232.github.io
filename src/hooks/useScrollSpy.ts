import { useState, useEffect } from 'react';

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
}

export const useScrollSpy = ({ sectionIds, offset = 100 }: UseScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if we're near the bottom of the page
      const isNearBottom = scrollY + windowHeight >= documentHeight - 50;
      
      let currentSection = '';
      
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const sectionTop = element.offsetTop - offset;
          const sectionHeight = element.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;
          
          // For the last section, make it active when near bottom
          if (sectionId === sectionIds[sectionIds.length - 1] && isNearBottom) {
            currentSection = sectionId;
            break;
          }
          // Regular check for other sections
          else if (scrollY >= sectionTop && scrollY < sectionBottom) {
            currentSection = sectionId;
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    // Throttle scroll events for performance
    let ticking = false;
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
    
    // Initial call
    handleScroll();
    
    return () => window.removeEventListener('scroll', requestTick);
  }, [sectionIds, offset]);

  return activeSection;
};
