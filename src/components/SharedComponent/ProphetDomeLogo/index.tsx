import Image from "next/image";
import Link from "next/link";

interface ProphetDomeLogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  linked?: boolean;
  className?: string;
}

const wrapSizeClasses = {
  sm: "max-w-[80px]",
  md: "max-w-[110px]",
  lg: "max-w-[140px]",
  hero: "max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] w-full",
};

const imageSizeClasses = {
  sm: "max-h-[72px] w-auto",
  md: "max-h-[100px] w-auto",
  lg: "max-h-[130px] w-auto",
  hero: "max-h-[340px] w-full",
};

const ProphetDomeLogo: React.FC<ProphetDomeLogoProps> = ({
  size = "md",
  linked = true,
  className = "",
}) => {
  const content = (
    <div className={`prophet-dome-wrap relative inline-flex ${wrapSizeClasses[size]} ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 rounded-full bg-accent/20 blur-3xl scale-90"
        aria-hidden="true"
      />
      <Image
        src="/images/logo/prophet-dome-transparent.png"
        alt="Green Dome of the Prophet's Mosque"
        width={360}
        height={480}
        priority={size === "hero"}
        unoptimized
        className={`prophet-dome-blink relative mx-auto h-auto object-contain drop-shadow-[0_0_28px_rgba(197,160,40,0.4)] ${imageSizeClasses[size]}`}
      />
    </div>
  );

  if (linked) {
    return (
      <Link href="/" className="inline-flex shrink-0">
        {content}
      </Link>
    );
  }

  return content;
};

export default ProphetDomeLogo;
