import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ variant = "dark", showText = false }) => {
  const textClass =
    variant === "light" ? "text-white" : "text-darkprimary dark:text-white";

  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
      <Image
        src="/images/logo/ngo-logo-transparent.png"
        alt="Organization logo"
        width={72}
        height={72}
        priority
        className="h-16 w-16 object-contain transition-transform group-hover:scale-105"
      />
      {showText && (
        <span className={`text-xl font-bold tracking-wide ${textClass}`}>
          Charity
        </span>
      )}
    </Link>
  );
};

export default Logo;
