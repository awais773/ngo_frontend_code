import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-12 w-12 sm:h-14 sm:w-14",
  md: "h-16 w-16 sm:h-[72px] sm:w-[72px]",
  lg: "h-20 w-20 sm:h-24 sm:w-24",
};

const Logo: React.FC<LogoProps> = ({ size = "md" }) => {
  return (
    <Link href="/" className="inline-flex shrink-0 group items-center">
      <Image
        src="/images/logo/my-prophet-logo.png"
        alt="My Prophet"
        width={120}
        height={120}
        priority
        unoptimized
        className={`${sizeClasses[size]} w-auto object-contain transition-transform group-hover:scale-105`}
      />
    </Link>
  );
};

export default Logo;
