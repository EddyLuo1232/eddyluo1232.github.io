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
      let maxDistance = Infinity;
      
      // If near bottom, activate the last section
      if (isNearBottom) {
        currentSection = sectionIds[sectionIds.length - 1];
      } else {
        // Find the section that is currently most visible in the viewport
        for (const sectionId of sectionIds) {
          const element = document.getElementById(sectionId);
          if (element) {
            const sectionTop = element.offsetTop - offset;
            const sectionHeight = element.offsetHeight;
            const sectionCenter = sectionTop + sectionHeight / 2;
            const viewportCenter = scrollY + windowHeight / 2;
            
            // Calculate distance from viewport center to section center
            const distance = Math.abs(viewportCenter - sectionCenter);
            
            // If this section is closer to viewport center, select it
            if (distance < maxDistance && scrollY >= sectionTop - offset) {
              maxDistance = distance;
              currentSection = sectionId;
            }
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
