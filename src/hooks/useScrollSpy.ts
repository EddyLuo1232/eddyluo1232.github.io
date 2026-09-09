import { useCallback, useEffect, useRef, useState } from 'react';

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
}

export const useScrollSpy = ({ sectionIds, offset = 100 }: UseScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const activeSectionRef = useRef('');
  const navigationTargetRef = useRef<{ id: string; arrivedAt: number | null } | null>(null);

  const selectSection = useCallback((sectionId: string) => {
    navigationTargetRef.current = { id: sectionId, arrivedAt: null };
    activeSectionRef.current = sectionId;
    setActiveSection(sectionId);
  }, []);

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
      const maxScroll = Math.max(0, documentHeight - windowHeight);
      const sections = sectionIds.flatMap((id) => {
        const element = document.getElementById(id);
        return element ? [{ id, element, top: element.getBoundingClientRect().top + scrollY }] : [];
      });

      // Native anchor scrolling can stop at the document edge before the target
      // reaches the header. Keep the clicked destination active until scrolling resumes.
      const navigationTarget = navigationTargetRef.current;
      if (navigationTarget) {
        const target = sections.find(({ id }) => id === navigationTarget.id);
        if (target) {
          const margin = parseFloat(getComputedStyle(target.element).scrollMarginTop) || 0;
          const destination = Math.min(maxScroll, Math.max(0, target.top - margin));
          if (navigationTarget.arrivedAt === null) {
            if (Math.abs(scrollY - destination) <= 2) navigationTarget.arrivedAt = scrollY;
            setActiveIfChanged(target.id);
            return;
          }
          if (Math.abs(scrollY - navigationTarget.arrivedAt) <= 2) {
            setActiveIfChanged(target.id);
            return;
          }
        }
        navigationTargetRef.current = null;
      }

      // In a tall viewport, the final sections cannot all reach the header.
      // Move the reading line down gradually over the last viewport of scrolling
      // so each short section still has a distinct interval in the navigation.
      const lastSection = sections.at(-1);
      const unreachableDistance = Math.max(0, (lastSection?.top ?? 0) - offset - maxScroll);
      const endProgress = Math.max(0, Math.min(1, 1 - (maxScroll - scrollY) / windowHeight));
      const scrollPosition = scrollY + offset + unreachableDistance * endProgress;
      // Only select the final section at the actual bottom. A 50px buffer can
      // swallow the short scroll range in which Experience reaches the header.
      const isAtBottom = scrollY > 0 && scrollY + windowHeight >= documentHeight - 1;

      if (isAtBottom) {
        setActiveIfChanged(lastSection?.id ?? '');
        return;
      }

      let currentSection = sections[0]?.id ?? '';

      for (const section of sections) {
        if (scrollPosition >= section.top) {
          currentSection = section.id;
        } else {
          break;
        }
      }

      setActiveIfChanged(currentSection);
    };

    const resumeTracking = () => {
      navigationTargetRef.current = null;
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
        resumeTracking();
      }
    };

    let frame: number | null = null;
    const requestTick = () => {
      if (frame !== null) {
        return;
      }

      frame = requestAnimationFrame(() => {
        frame = null;
        handleScroll();
      });
    };

    const handleHashChange = () => {
      const sectionId = window.location.hash.slice(1);
      if (sectionIds.includes(sectionId)) selectSection(sectionId);
      requestTick();
    };

    // Language changes, web fonts and expanded interests can move sections
    // without producing a scroll or window resize event.
    const resizeObserver = new ResizeObserver(requestTick);
    resizeObserver.observe(document.body);
    for (const sectionId of sectionIds) {
      const element = document.getElementById(sectionId);
      if (element) resizeObserver.observe(element);
    }

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);
    window.addEventListener('wheel', resumeTracking, { passive: true });
    window.addEventListener('touchmove', resumeTracking, { passive: true });
    window.addEventListener('pointerdown', resumeTracking, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    handleScroll();

    return () => {
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', requestTick);
      window.removeEventListener('wheel', resumeTracking);
      window.removeEventListener('touchmove', resumeTracking);
      window.removeEventListener('pointerdown', resumeTracking);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
      resizeObserver.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [sectionIds, offset, selectSection]);

  return { activeSection, selectSection };
};
