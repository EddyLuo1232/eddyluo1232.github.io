import { useEffect, useRef, useState } from 'react';

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
}

export const useScrollSpy = ({ sectionIds, offset = 100 }: UseScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const activeSectionRef = useRef('');

  useEffect(() => {
    const setActiveIfChanged = (sectionId: string) => {
      if (activeSectionRef.current !== sectionId) {
        activeSectionRef.current = sectionId;
        setActiveSection(sectionId);
      }
    };

    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = scrollY + offset;
      const isNearBottom = scrollY + windowHeight >= documentHeight - 50;

      if (isNearBottom) {
        setActiveIfChanged(sectionIds[sectionIds.length - 1] ?? '');
        return;
      }

      let currentSection = sectionIds[0] ?? '';

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const sectionTop = element.getBoundingClientRect().top + scrollY;
        if (scrollPosition >= sectionTop) {
          currentSection = sectionId;
        } else {
          break;
        }
      }

      setActiveIfChanged(currentSection);
    };

    let ticking = false;
    const requestTick = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
    };

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', requestTick);
    };
  }, [sectionIds, offset]);

  return activeSection;
};
