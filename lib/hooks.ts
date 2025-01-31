import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "./types";

export function useSectionInView(sectionName: SectionName) {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "-80px 0px -50% 0px",
  });

  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
          Math.ceil(window.innerHeight + window.pageYOffset) >=
          document.documentElement.scrollHeight;

      if (isAtBottom) {
        setActiveSection("Skills");
        return;
      }

      if (inView && Date.now() - timeOfLastClick > 1000) {
        setActiveSection(sectionName);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return {
    ref,
  };
}