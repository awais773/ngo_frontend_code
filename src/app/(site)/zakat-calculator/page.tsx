import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import ZakatCalculator from "@/components/Calculators/ZakatCalculator";

export const metadata: Metadata = { title: "Zakat Calculator" };

export default function ZakatCalculatorPage() {
  return (
    <>
      <HeroSub title="Zakat Calculator" />
      <section className="py-16 dark:bg-dark">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Calculate your Zakat based on current Nisab values. Rates are managed from the admin panel.
          </p>
          <ZakatCalculator />
        </div>
      </section>
    </>
  );
}
