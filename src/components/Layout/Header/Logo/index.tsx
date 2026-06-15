import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "header" | "footer";
}

const logoSources = {
  header: "/images/logo/my-prophet-header-logo-transparent.png",
  footer: "/images/logo/my-prophet-footer-logo-transparent.png",
};

const imageSizeClasses = {
  header: {
    sm: "h-10 sm:h-12 w-auto max-w-[190px] sm:max-w-[230px]",
    md: "h-14 sm:h-16 w-auto max-w-[240px]",
    lg: "h-16 sm:h-20 w-auto max-w-[280px]",
  },
  footer: {
    sm: "h-12 sm:h-14 w-auto max-w-[200px] sm:max-w-[240px]",
    md: "h-14 sm:h-16 w-auto max-w-[240px]",
    lg: "h-16 sm:h-[72px] w-auto max-w-[260px] sm:max-w-[300px]",
  },
};

const Logo: React.FC<LogoProps> = ({ size = "md", variant = "header" }) => {
  return (
    <Link href="/" className="inline-flex shrink-0 group items-center">
      <Image
        src={logoSources[variant]}
        alt="My Prophet"
        width={320}
        height={88}
        priority={variant === "header"}
        unoptimized
        className={`${imageSizeClasses[variant][size]} object-contain transition-transform group-hover:scale-[1.02]`}
      />
    </Link>
  );
};

export default Logo;
