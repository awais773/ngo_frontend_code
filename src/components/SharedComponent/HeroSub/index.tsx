import React, { FC } from "react";

interface HeroSubProps {
  title: string;
  bgImage?: string;
}

const HeroSub: FC<HeroSubProps> = ({ title, bgImage }) => {
  const backgroundImage = bgImage || "/images/background/hero-sub-banner.avif";

  return (
    <section
      className="relative py-12 sm:py-16 bg-no-repeat bg-center bg-cover mt-[72px]"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-[#0a3d2e]/80 z-0" />
      <div className="relative z-10 container mx-auto max-w-(--breakpoint-xl) px-4">
        <h2 className="text-white md:text-4xl text-3xl font-bold">{title}</h2>
      </div>
    </section>
  );
};

export default HeroSub;
