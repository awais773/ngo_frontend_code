import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
}

const PageHero: React.FC<PageHeroProps> = ({ title, breadcrumbs }) => {
  const crumbs: BreadcrumbItem[] = breadcrumbs ?? [
    { label: "Home", href: "/" },
    { label: title },
  ];

  return (
    <section className="mt-[106px] brand-page-hero dark:bg-dark">
      <div className="brand-stripe" />
      <div className="container mx-auto max-w-(--breakpoint-xl) px-4 py-8 sm:py-10">
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
            {crumbs.map((crumb, index) => (
              <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                {index > 0 && (
                  <span className="text-gray-300 dark:text-gray-600" aria-hidden="true">
                    /
                  </span>
                )}
                {crumb.href && index < crumbs.length - 1 ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-secondary dark:hover:text-secondary transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-gray-700 dark:text-gray-200">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="brand-page-title text-2xl font-bold text-darkprimary sm:text-3xl lg:text-4xl dark:text-white">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default PageHero;
