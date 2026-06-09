import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Link from "next/link";
import Image from "next/image";
import { api, mediaUrl, Project } from "@/lib/api";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  let list: Project[] = [];
  try {
    const projects = await api.projects();
    list = projects.data || [];
  } catch {
    list = [];
  }

  return (
    <>
      <HeroSub title="Our Projects" />
      <section className="py-16 dark:bg-dark">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map((p) => {
              const goal = Number(p.goal_amount) || 0;
              const raised = Number(p.raised_amount) || 0;
              const pct = goal > 0 ? Math.min(100, (raised / goal) * 100) : 0;
              return (
                <Link key={p.id} href={`/projects/${p.slug}`} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg">
                  <div className="relative h-48">
                    <Image src={mediaUrl(p.featured_image)} alt={p.title} fill className="object-cover group-hover:scale-105 transition" />
                  </div>
                  <div className="p-5">
                    {p.category && <span className="text-xs text-primary font-semibold">{p.category}</span>}
                    <h3 className="text-lg font-bold mt-1 dark:text-white">{p.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{p.description}</p>
                    <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs mt-2 text-gray-500">${raised.toLocaleString()} raised of ${goal.toLocaleString()}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
