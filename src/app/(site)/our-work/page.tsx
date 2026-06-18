import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Volunteer from "@/components/SharedComponent/Volunteer";
import DailyActivitiesFilters, {
  ActivityCard,
  DailyActivitiesPagination,
} from "@/components/OurWork/DailyActivitiesShowcase";
import { api } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Work | Daily Activities",
  description:
    "Explore our organization's daily activities — relief, education, healthcare, and community programs in action.",
};

interface OurWorkPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function OurWorkPage({ searchParams }: OurWorkPageProps) {
  const params = await searchParams;
  const activeCategory = params.category || undefined;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10) || 1);

  let categories: string[] = [];
  let activities: Awaited<ReturnType<typeof api.dailyActivities>>["data"] = [];
  let lastPage = 1;

  try {
    const [categoriesRes, activitiesRes] = await Promise.all([
      api.dailyActivityCategories(),
      api.dailyActivities({ category: activeCategory, page: currentPage }),
    ]);
    categories = categoriesRes || [];
    activities = activitiesRes.data || [];
    lastPage = activitiesRes.last_page || 1;
  } catch {
    categories = [];
    activities = [];
  }

  return (
    <>
      <HeroSub
        title="Our Work"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Work" },
        ]}
      />

      <section className="py-16 lg:py-20 dark:bg-dark">
        <div className="container mx-auto max-w-(--breakpoint-xl) px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#C9A227]">
              Daily Activities
            </p>
            <h2 className="mt-3 text-3xl font-bold text-midnight_text sm:text-4xl dark:text-white">
              Making a Difference Every Day
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-300">
              From food drives to health camps — see how our team and volunteers serve
              communities through ongoing programs and field work.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <DailyActivitiesFilters
              categories={categories}
              activeCategory={activeCategory}
            />

            <div className="lg:col-span-9">
              {activities.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-white/10 dark:bg-slate-900">
                  <p className="text-gray-500 dark:text-gray-400">
                    {activeCategory
                      ? `No activities found in "${activeCategory}".`
                      : "No daily activities published yet."}
                  </p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {activities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              )}

              <DailyActivitiesPagination
                currentPage={currentPage}
                lastPage={lastPage}
                activeCategory={activeCategory}
              />
            </div>
          </div>
        </div>
      </section>

      <Volunteer />
    </>
  );
}
