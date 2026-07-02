import Help from "@/components/Home/Help";
import Hero from "@/components/Home/Hero";
import HomeBlogSection from "@/components/Home/HomeBlogSection";
import HomeEvents from "@/components/Home/HomeEvents";
import HomeProjects from "@/components/Home/HomeProjects";
import HomeTestimonials from "@/components/Home/HomeTestimonials";
import UrgentDonation from "@/components/Home/UrgentDonation";
import Volunteer from "@/components/SharedComponent/Volunteer";
import { getHomeData } from "@/lib/api";
import { brandName, brandTagline } from "@/config/brand";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${brandName} | Verified Humanitarian Support`,
  description: `${brandTagline} — donations, verified needy cases, and community relief worldwide.`,
};

export default async function Home() {
  const home = await getHomeData();

  const sliders = home?.sliders ?? [];
  const projects = home?.featured_projects ?? [];
  const events = home?.featured_events ?? [];
  const blogs = home?.latest_blogs ?? [];
  const testimonials = home?.testimonials ?? [];
  const totalDonations = home?.donations_summary?.total_received ?? 0;

  return (
    <main>
      <Hero sliders={sliders} featuredProject={projects[0] ?? null} />
      <Help />
      <HomeProjects projects={projects} />
      <HomeEvents events={events} />
      <UrgentDonation totalRaised={totalDonations} />
      <HomeBlogSection blogs={blogs} />
      <HomeTestimonials testimonials={testimonials} />
      <Volunteer />
    </main>
  );
}
