"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Project, Slider } from "@/lib/api";
import { mediaUrl } from "@/lib/api";

interface HeroProps {
  sliders: Slider[];
  featuredProject?: Project | null;
}

export default function Hero({ sliders }: HeroProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (sliders.length <= 1) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % sliders.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [sliders.length]);

  const slide = sliders[active] || sliders[0];

  if (!slide) {
    return (
      <section className="relative min-h-[560px] bg-darkprimary mt-[106px] flex items-center justify-center text-white">
        <p>Welcome</p>
      </section>
    );
  }

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] mt-[106px] overflow-hidden">
      {sliders.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url(${mediaUrl(s.image)})` }}
        />
      ))}

      <div className="absolute inset-0 brand-hero-overlay z-[1]" />

      <div className="relative z-10 container mx-auto px-4 py-14 lg:py-20 flex items-center min-h-[580px] lg:min-h-[640px]">
        <div className="max-w-2xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
          {slide.subtitle && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold rounded-full bg-secondary/90 text-white border border-white/20">
              {slide.subtitle}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {slide.title}
          </h1>
          {slide.description && (
            <p className="text-white/90 text-base sm:text-lg max-w-xl mb-8">{slide.description}</p>
          )}
          <div className="flex flex-wrap gap-4">
            <Link
              href={slide.button_link || "/donate"}
              className="btn-brand-primary"
            >
              {slide.button_text || "Donate Now"}
            </Link>
            <Link href="/projects" className="btn-brand-outline">
              Our Projects
            </Link>
          </div>
          {sliders.length > 1 && (
            <div className="flex gap-2 mt-10">
              {sliders.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-gradient-to-r from-accent to-secondary" : "w-2 bg-white/40"}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
