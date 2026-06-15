import HeroSub from "@/components/SharedComponent/HeroSub";
import EventsShowcase from "@/components/Events/EventsShowcase";
import Volunteer from "@/components/SharedComponent/Volunteer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | My Prophet",
};

const Page = () => {
  return (
    <>
      <HeroSub
        title="Events"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Events" },
        ]}
      />
      <EventsShowcase />
      <Volunteer />
    </>
  );
};

export default Page;
