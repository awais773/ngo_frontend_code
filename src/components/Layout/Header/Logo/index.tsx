import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const imageSizeClasses = {
  sm: "h-10 sm:h-12 w-auto max-w-[190px] sm:max-w-[230px]",
  md: "h-14 sm:h-16 w-auto max-w-[240px]",
  lg: "h-16 sm:h-20 w-auto max-w-[280px]",
};

const Logo: React.FC<LogoProps> = ({ size = "md" }) => {
  return (
    <Link href="/" className="inline-flex shrink-0 group items-center">
      <Image
        src="/images/logo/my-prophet-header-logo-transparent.png"
        alt="My Prophet"
        width={320}
        height={88}
        priority
        unoptimized
        className={`${imageSizeClasses[size]} object-contain transition-transform group-hover:scale-[1.02]`}
      />
    </Link>
  );
};

export default Logo;
