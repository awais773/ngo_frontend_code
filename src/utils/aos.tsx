"use client";
import { useEffect } from "react";

const Aoscompo = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    Promise.all([
      import("aos"),
      import("aos/dist/aos.css"),
    ]).then(([AOS]) => {
      AOS.default.init({
        duration: 600,
        once: true,
        offset: 40,
        easing: "ease-out-cubic",
      });
    });
  }, []);

  return <>{children}</>;
};

export default Aoscompo;
