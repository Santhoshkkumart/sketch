import { useState, useEffect } from 'react';
import { useMediaQuery } from './use-media-query';

/**
 * Hook to detect when an element is in the middle of the viewport on mobile.
 * @param {React.RefObject} ref - Reference to the element to observe.
 * @param {boolean} isMobileOnly - Whether to only activate on mobile screens.
 * @returns {boolean} - Whether the element is currently "auto-hovered".
 */
export function useScrollHover(ref, isMobileOnly = true) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // If not mobile and mobileOnly is true, don't do anything
    if (isMobileOnly && !isMobile) {
      setIsHovered(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHovered(entry.isIntersecting);
      },
      {
        // rootMargin defines the "middle" area. 
        // -45% from top and -45% from bottom leaves a 10% strip in the middle.
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, isMobile, isMobileOnly]);

  return isHovered;
}
