import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import ReportList from "@/components/Reports/ReportList";

export const metadata: Metadata = { title: "Reports" };

export default function ReportsPage() {
  return (
    <>
      <HeroSub title="Reports" />
      <section className="pt-12 pb-20 dark:bg-dark">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-midnight_text dark:text-white">Reports & Publications</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">Browse our reports, financial statements and policy documents. Files are provided as static downloads for now.</p>
          </div>

          <ReportList />
        </div>
      </section>
    </>
  );
}
