"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

type Report = {
  id: string;
  title: string;
  category: string;
  date: string;
  description?: string;
  href?: string;
  thumb?: string;
};

const REPORTS: Report[] = [
  {
    id: "r1",
    title: "Annual Report 2025",
    category: "Annual Reports",
    date: "June 2025",
    description: "Overview of our activities and financials for 2025.",
    href: "/docs/annual-report-2025.pdf",
    thumb: "/images/hero/banner-bg-1.jpg",
  },
  {
    id: "r2",
    title: "Financial Statement 2024",
    category: "Financials",
    date: "Dec 2024",
    description: "Audited financial statement for fiscal year 2024.",
    href: "/docs/financial-2024.pdf",
    thumb: "/images/hero/banner-bg-2.jpg",
  },
  {
    id: "r3",
    title: "Program Impact Summary",
    category: "Impact",
    date: "Mar 2025",
    description: "Key outcomes and highlights from our programs.",
    href: "/docs/impact-2025.pdf",
    thumb: "/images/background/hero-sub-banner.avif",
  },
  {
    id: "r4",
    title: "Governance & Policies",
    category: "Policies",
    date: "Jan 2025",
    description: "Our governance framework and policy documents.",
    href: "/docs/policies.pdf",
    thumb: "/images/background/hero-sub-banner.avif",
  },
];

export default function ReportList() {
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = new Set<string>(REPORTS.map((r) => r.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filtered = useMemo(() => {
    if (filter === "All") return REPORTS;
    return REPORTS.filter((r) => r.category === filter);
  }, [filter]);

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <aside className="lg:col-span-3">
        <div className="rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-slate-900 p-6">
          <h4 className="text-lg font-semibold mb-4">Categories</h4>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`w-full text-left px-3 py-2 rounded-md transition ${filter === c ? "bg-[#C9A227] text-white" : "hover:bg-gray-100 dark:hover:bg-white/5"}`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="lg:col-span-9">
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((r) => (
            <article key={r.id} className="rounded-2xl overflow-hidden border border-gray-200/60 dark:border-white/10 bg-white dark:bg-slate-950 shadow-md">
              <div className="relative h-40">
                {r.thumb && (
                  <Image src={r.thumb} alt={r.title} fill className="object-cover" />
                )}
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold text-[#C9A227] uppercase">{r.category}</p>
                <h3 className="mt-2 text-lg font-semibold text-midnight_text dark:text-white">{r.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{r.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{r.date}</span>
                  <div className="flex items-center gap-3">
                    <Link href={r.href || "#"} className="text-sm font-semibold text-[#0a3d2e] hover:underline">
                      View
                    </Link>
                    <a href={r.href || "#"} download className="inline-block bg-[#C9A227] text-[#0a3d2e] px-3 py-2 rounded-md font-bold">
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
