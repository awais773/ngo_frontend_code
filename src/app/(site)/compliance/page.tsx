import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Link from "next/link";
import { api, ComplianceReport, mediaUrl } from "@/lib/api";

export const metadata: Metadata = { title: "Compliance & Reports" };

export default async function CompliancePage() {
  let reports: ComplianceReport[] = [];
  try {
    reports = await api.compliance();
  } catch {
    reports = [];
  }

  return (
    <>
      <HeroSub title="Compliance & Reports" />
      <section className="py-16 dark:bg-dark">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-3xl">
            Transparency and accountability are core to our mission. Access our financial and compliance reports below.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {reports.map((r) => (
              <div key={r.id} className="border dark:border-slate-700 rounded-xl p-6 hover:shadow-lg transition">
                {r.report_year && <span className="text-xs font-semibold text-primary">{r.report_year}</span>}
                <h3 className="text-xl font-bold mt-2 dark:text-white">{r.title}</h3>
                {r.description && <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{r.description}</p>}
                {r.file_path && (
                  <a
                    href={mediaUrl(r.file_path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-primary font-semibold hover:underline"
                  >
                    Download PDF →
                  </a>
                )}
              </div>
            ))}
          </div>
          {reports.length === 0 && (
            <p className="text-center text-gray-500">Reports will appear here once uploaded in admin.</p>
          )}
        </div>
      </section>
    </>
  );
}
