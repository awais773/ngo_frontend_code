"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import DonationFormContext from "@/app/context/donationContext";
import type { Project, Slider } from "@/lib/api";
import { mediaUrl } from "@/lib/api";

interface HeroProps {
  sliders: Slider[];
  featuredProject?: Project | null;
}

export default function Hero({ sliders, featuredProject }: HeroProps) {
  const donationInfo = useContext(DonationFormContext);
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
      <section className="relative min-h-[560px] bg-[#0a3d2e] mt-[72px] flex items-center justify-center text-white">
        <p>Welcome to NGO</p>
      </section>
    );
  }

  const goal = featuredProject ? Number(featuredProject.goal_amount) : 0;
  const raised = featuredProject ? Number(featuredProject.raised_amount) : 0;
  const pct = goal > 0 ? Math.min(100, (raised / goal) * 100) : 0;

  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] mt-[72px] overflow-hidden">
      {sliders.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url(${mediaUrl(s.image)})` }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a3d2e]/95 via-[#0a3d2e]/75 to-[#0a3d2e]/50" />
      {/* Removed top decorative featured panel as requested */}

      <div className="relative z-10 container mx-auto px-4 py-14 lg:py-20 grid lg:grid-cols-12 gap-10 items-center min-h-[580px] lg:min-h-[640px]">
        <div className="lg:col-span-7 text-white">
          {slide.subtitle && (
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold rounded-full bg-[#C9A227] text-[#0a3d2e]">
              {slide.subtitle}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {slide.title}
          </h1>
          {slide.description && (
            <p className="text-white/85 text-base sm:text-lg max-w-xl mb-8">{slide.description}</p>
          )}
          <div className="flex flex-wrap gap-4">
            <Link
              href={slide.button_link || "/donate"}
              className="bg-gradient-to-r from-[#C9A227] via-[#E5C75C] to-[#D4B645] text-[#0f331f] px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-[#C9A227]/20 hover:from-[#D6AC2D] hover:via-[#E6C75C] hover:to-[#C9A227] transition-all duration-200"
            >
              {slide.button_text || "Donate Now"}
            </Link>
            <Link href="/projects" className="border-2 border-white px-8 py-3.5 rounded-xl font-semibold text-white hover:bg-white hover:text-[#0a3d2e] transition-all duration-200">
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
                  className={`h-2 rounded-full transition-all ${i === active ? "w-8 bg-[#C9A227]" : "w-2 bg-white/40"}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* right column intentionally left empty for now */}
      </div>
    </section>
  );
}
