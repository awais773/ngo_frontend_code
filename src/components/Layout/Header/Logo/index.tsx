import Image from "next/image";
import Link from "next/link";
import { Libre_Baskerville } from "next/font/google";

const logoFont = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "text" | "image";
}

const imageSizeClasses = {
  sm: "h-12 w-12 sm:h-14 sm:w-14",
  md: "h-16 w-16 sm:h-[72px] sm:w-[72px]",
  lg: "h-20 w-20 sm:h-24 sm:w-24",
};

const textSizeClasses = {
  sm: "text-[1.2rem] sm:text-[1.45rem]",
  md: "text-2xl sm:text-[1.75rem]",
  lg: "text-3xl sm:text-4xl",
};

const Logo: React.FC<LogoProps> = ({ size = "md", variant = "image" }) => {
  if (variant === "text") {
    return (
      <Link href="/" className="inline-flex shrink-0 group items-center">
        <span
          className={`logo-text-glow ${logoFont.className} uppercase tracking-[-0.02em] leading-none text-darkprimary antialiased ${textSizeClasses[size]}`}
        >
          MY PROPHET
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className="inline-flex shrink-0 group items-center">
      <Image
        src="/images/logo/my-prophet-logo.png"
        alt="My Prophet"
        width={120}
        height={120}
        priority
        unoptimized
        className={`${imageSizeClasses[size]} w-auto object-contain transition-transform group-hover:scale-105`}
      />
    </Link>
  );
};

export default Logo;
