
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    // Respect reduced-motion preferences
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) {
      setIsVisible(true);
      return;
    }

    // Fallback for browsers without IntersectionObserver
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        transition-[opacity,transform]
        duration-[900ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]
        motion-reduce:transform-none
        motion-reduce:transition-none
        ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-[0.99] opacity-0"
        }
        ${className}
      `}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </div>
  );
}

export default Reveal;
