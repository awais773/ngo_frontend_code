"use client";

import Image from "next/image";
import Link from "next/link";
import { brandLogos, brandName } from "@/config/brand";
import ClientOnly from "@/components/Common/ClientOnly";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "header" | "footer";
}

const imageSizeClasses = {
  header: {
    sm: "h-[64px] sm:h-[72px] w-auto max-w-[240px] sm:max-w-[260px]",
    md: "h-[72px] sm:h-20 w-auto max-w-[260px]",
    lg: "h-20 sm:h-24 w-auto max-w-[280px]",
  },
  footer: {
    mark: "h-[72px] sm:h-20 w-auto max-w-[120px] sm:max-w-[140px]",
  },
};

const Logo: React.FC<LogoProps> = ({ size = "md", variant = "header" }) => {
  if (variant === "footer") {
    return (
      <Link href="/" className="inline-flex shrink-0 group items-center gap-3">
        <Image
          src={brandLogos.mark}
          alt=""
          width={200}
          height={200}
          unoptimized
          className={`${imageSizeClasses.footer.mark} object-contain transition-transform group-hover:scale-[1.02]`}
          aria-hidden
        />
        <span className="flex flex-col leading-tight">
          <span className="text-lg sm:text-xl font-bold tracking-wide text-white">
            {brandName.toUpperCase()}
          </span>
          <span className="text-[10px] sm:text-xs text-secondary font-medium tracking-widest mt-1">
            HELPING PEOPLE WHO DESERVE IT
          </span>
        </span>
      </Link>
    );
  }

  const sizeClass = imageSizeClasses.header[size];

  const logoImage = (
    <Image
      src={brandLogos.logo}
      alt={brandName}
      width={336}
      height={430}
      priority
      unoptimized
      className={`${sizeClass} object-contain object-left transition-transform group-hover:scale-[1.02]`}
    />
  );

  return (
    <Link href="/" className="inline-flex shrink-0 group items-center min-w-[170px] sm:min-w-[200px]">
      <ClientOnly fallback={logoImage}>{logoImage}</ClientOnly>
    </Link>
  );
};

export default Logo;
