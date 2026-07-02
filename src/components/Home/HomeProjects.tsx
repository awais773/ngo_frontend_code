import Image from "next/image";
import Link from "next/link";
import BrandEyebrow from "@/components/Common/BrandEyebrow";
import type { Project } from "@/lib/api";
import { mediaUrl } from "@/lib/api";

interface Props {
  projects: Project[];
}

export default function HomeProjects({ projects }: Props) {
  const list = projects.slice(0, 3);

  return (
    <section className="pt-8 pb-12 lg:pt-10 lg:pb-14 bg-white dark:bg-darkmode" data-aos="fade-up" data-aos-duration="1200">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <BrandEyebrow center>Our Impact</BrandEyebrow>
        <h2 className="text-center text-3xl font-semibold mb-3 text-darkprimary dark:text-white">Featured Projects</h2>        <p className="text-dustGray dark:text-white/60 text-center max-w-2xl mx-auto">
          Support life-changing programs in water, education, healthcare, and emergency relief.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-10">
          {list.map((item, index) => {
            const goal = Number(item.goal_amount);
            const raised = Number(item.raised_amount);
            const pct = goal > 0 ? Math.min(100, (raised / goal) * 100) : 0;
            return (
              <Link
                href={`/projects/${item.slug}`}
                key={item.id}
                className="group"
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <div className="bg-beige-light dark:bg-dark rounded-xl overflow-hidden shadow-sm border border-beige-dark dark:border-dark_border hover:shadow-lg hover:-translate-y-1 transition-transform duration-300">
                  <div className="overflow-hidden h-[220px] relative">
                    <Image
                      src={mediaUrl(item.featured_image)}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                      sizes="(max-width:768px) 100vw, 33vw"
                    />
                    {item.category && (
                      <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-midnight_text dark:text-white group-hover:text-secondary dark:group-hover:text-secondary mb-3 line-clamp-2">                      {item.title}
                    </h4>
                    <div className="brand-progress-track mb-2">
                      <div className="brand-progress-fill" style={{ width: `${pct}%` }} />
                    </div>                    <p className="text-sm text-dustGray">${raised.toLocaleString()} of ${goal.toLocaleString()}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <Link href="/projects" className="btn-brand-secondary">            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
