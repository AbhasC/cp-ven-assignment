import { useEffect, useRef, useState } from "react";
import { SECTION_IDS } from "./constants";

export const ScrollPosViewer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter(Boolean) as HTMLElement[];
    sectionsRef.current = sections;
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const activeSection = visible[0].target as HTMLElement;
        const index = sections.indexOf(activeSection);
        if (index > -1) {
          setActiveIndex(index);
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed right-1.5 sm:right-3 md:right-4.5 lg:right-6 top-1/2 z-30 transform -translate-y-1/2">
      <div className="flex flex-col items-center gap-2 p-1 backdrop-blur-lg">
        {SECTION_IDS.map((_, index) => (
          <span
            key={index}
            className={`h-1 w-1 rounded-full transition-all duration-300 ${
              index === activeIndex ? "h-3 w-1 bg-text" : "bg-text/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
