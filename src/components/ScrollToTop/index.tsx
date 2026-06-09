"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.pageYOffset > 300);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-999 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:bg-primary/85"
    >
      <span className="mt-[6px] h-3 w-3 rotate-45 border-l-2 border-t-2 border-white" />
    </button>
  );
}
