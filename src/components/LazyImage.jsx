import React, { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/use-reduced-motion";

export default function LazyImage({ src, alt, className }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {isVisible ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`${className} ${
            isLoaded || prefersReducedMotion
              ? "opacity-100"
              : "opacity-0 transition-opacity duration-300"
          }`}
        />
      ) : (
        <div
          className={`${className} bg-white/[0.04]`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
