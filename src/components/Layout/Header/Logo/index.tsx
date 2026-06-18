"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { brandLogos } from "@/config/brand";
import ClientOnly from "@/components/Common/ClientOnly";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "header" | "footer";
}

const imageSizeClasses = {
  header: {
    sm: "h-[54px] sm:h-[60px] w-auto max-w-[260px] sm:max-w-[300px] lg:max-w-[340px]",
    md: "h-14 sm:h-16 w-auto max-w-[280px]",
    lg: "h-16 sm:h-[72px] w-auto max-w-[340px]",
  },
  footer: {
    sm: "h-12 sm:h-14 w-auto max-w-[200px] sm:max-w-[240px]",
    md: "h-14 sm:h-16 w-auto max-w-[240px]",
    lg: "h-16 sm:h-[72px] w-auto max-w-[260px] sm:max-w-[300px]",
  },
};

const Logo: React.FC<LogoProps> = ({ size = "md", variant = "header" }) => {
  const { resolvedTheme } = useTheme();
  const sizeClass = imageSizeClasses[variant][size];
  const isDark = resolvedTheme === "dark";

  const src =
    variant === "footer"
      ? brandLogos.footer
      : isDark
        ? brandLogos.headerLight
        : brandLogos.header;

  const logoImage = (
    <Image
      src={src}
      alt="My Prophet"
      width={1024}
      height={283}
      priority={variant === "header"}
      unoptimized
      className={`${sizeClass} object-contain object-left transition-transform group-hover:scale-[1.02]`}
    />
  );

  if (variant === "footer") {
    return (
      <Link href="/" className="inline-flex shrink-0 group items-center">
        {logoImage}
      </Link>
    );
  }

  return (
    <Link href="/" className="inline-flex shrink-0 group items-center min-w-[160px] sm:min-w-[200px]">
      <ClientOnly fallback={logoImage}>{logoImage}</ClientOnly>
    </Link>
  );
};

export default Logo;
