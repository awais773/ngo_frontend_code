import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import DonationPageForm from "@/components/Donate/DonationPageForm";

export const metadata: Metadata = { title: "Donate" };

export default function DonatePage() {
  return (
    <>
      <HeroSub title="Make a Donation" />
      <section className="py-16 dark:bg-dark">
        <div className="container mx-auto px-4">
          <DonationPageForm />
        </div>
      </section>
    </>
  );
}
