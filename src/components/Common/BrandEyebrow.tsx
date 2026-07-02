interface BrandEyebrowProps {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}

/** Section label with the logo's 3-color mark (navy · blue · green). */
export default function BrandEyebrow({
  children,
  center = false,
  className = "",
}: BrandEyebrowProps) {
  return (
    <div className={center ? `text-center ${className}` : className}>
      <div className={`brand-eyebrow-mark ${center ? "justify-center" : ""}`} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="brand-eyebrow">{children}</p>
    </div>
  );
}
