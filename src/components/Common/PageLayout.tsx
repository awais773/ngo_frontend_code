import HeroSub from "@/components/SharedComponent/HeroSub";
import DynamicContent from "./DynamicContent";

interface PageLayoutProps {
  title: string;
  content?: string | null;
  excerpt?: string | null;
  children?: React.ReactNode;
}

export default function PageLayout({ title, content, excerpt, children }: PageLayoutProps) {
  return (
    <>
      <HeroSub title={title} />
      <section className="py-16 dark:bg-dark">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          {excerpt && (
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">{excerpt}</p>
          )}
          {children || <DynamicContent html={content} />}
        </div>
      </section>
    </>
  );
}
