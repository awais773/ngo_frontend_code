import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import FitranaCalculator from "@/components/Calculators/FitranaCalculator";

export const metadata: Metadata = { title: "Fitrana Calculator" };

export default function FitranaCalculatorPage() {
  return (
    <>
      <HeroSub title="Fitrana Calculator" />
      <section className="py-16 dark:bg-dark">
        <div className="container mx-auto px-4">
          <FitranaCalculator />
        </div>
      </section>
    </>
  );
}
