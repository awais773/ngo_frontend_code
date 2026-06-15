import PageHero, { BreadcrumbItem } from "@/components/SharedComponent/PageHero";

interface HeroSubProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  /** @deprecated bgImage is no longer used — inner pages use simple breadcrumb hero */
  bgImage?: string;
}

const HeroSub: React.FC<HeroSubProps> = ({ title, breadcrumbs }) => {
  return <PageHero title={title} breadcrumbs={breadcrumbs} />;
};

export default HeroSub;
