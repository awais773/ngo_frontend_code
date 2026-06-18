import Link from "next/link";
import { format } from "date-fns";
import EventImageSlider from "@/components/Events/EventImageSlider";
import type { DailyActivity } from "@/lib/api";
import { mediaUrl } from "@/lib/api";

interface DailyActivitiesFiltersProps {
  categories: string[];
  activeCategory?: string;
}

function buildHref(category?: string, page?: number) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page && page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `/our-work${qs ? `?${qs}` : ""}`;
}

export default function DailyActivitiesFilters({
  categories,
  activeCategory,
}: DailyActivitiesFiltersProps) {
  return (
    <aside className="lg:col-span-3">
      <div className="sticky top-28 rounded-2xl border border-gray-200/60 bg-white p-6 dark:border-white/10 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-midnight_text dark:text-white">Categories</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Filter activities by program area
        </p>
        <ul className="mt-5 space-y-2">
          <li>
            <Link
              href={buildHref(undefined)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                !activeCategory
                  ? "bg-[#0a3d2e] text-white"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
              }`}
            >
              All Activities
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <Link
                href={buildHref(category)}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-[#0a3d2e] text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                }`}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

interface ActivityCardProps {
  activity: DailyActivity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const images = (activity.images || []).map((img) => mediaUrl(img));

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-sm dark:border-white/10 dark:bg-slate-950">
      {images.length > 0 && (
        <div className="p-4 pb-0 sm:p-6 sm:pb-0">
          <EventImageSlider images={images} title={activity.title} />
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#C9A227]/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#8a6f12] dark:text-[#C9A227]">
            {activity.category}
          </span>
          {activity.activity_date && (
            <time
              dateTime={activity.activity_date}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {format(new Date(activity.activity_date), "MMM dd, yyyy")}
            </time>
          )}
        </div>

        <h3 className="mt-3 text-xl font-bold text-midnight_text dark:text-white">
          {activity.title}
        </h3>

        <p className="mt-3 text-base leading-relaxed text-gray-600 line-clamp-3 dark:text-gray-300">
          {activity.description}
        </p>
      </div>
    </article>
  );
}

interface DailyActivitiesPaginationProps {
  currentPage: number;
  lastPage: number;
  activeCategory?: string;
}

export function DailyActivitiesPagination({
  currentPage,
  lastPage,
  activeCategory,
}: DailyActivitiesPaginationProps) {
  if (lastPage <= 1) return null;

  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Activities pagination"
    >
      {currentPage > 1 && (
        <Link
          href={buildHref(activeCategory, currentPage - 1)}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Previous
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(activeCategory, page)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition ${
            page === currentPage
              ? "bg-[#0a3d2e] text-white"
              : "border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
          }`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      {currentPage < lastPage && (
        <Link
          href={buildHref(activeCategory, currentPage + 1)}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
