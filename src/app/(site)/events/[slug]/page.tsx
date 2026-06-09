import HeroSub from "@/components/SharedComponent/HeroSub";
import DynamicContent from "@/components/Common/DynamicContent";
import Volunteer from "@/components/SharedComponent/Volunteer";
import { api, mediaUrl } from "@/lib/api";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const event = await api.event(slug);
    return { title: event.title };
  } catch {
    return { title: "Event" };
  }
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  let event;
  try {
    event = await api.event(slug);
  } catch {
    return (
      <>
        <HeroSub title="Event Not Found" />
        <div className="container mx-auto px-4 py-20 text-center">
          <Link href="/events" className="text-[#0a3d2e] underline">Back to events</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <HeroSub title={event.title} />
      <section className="lg:py-16 py-10 dark:bg-dark">
        <div className="container lg:max-w-3xl mx-auto px-4">
          <Link href="/events" className="text-sm text-[#0a3d2e] dark:text-[#C9A227] hover:underline mb-6 inline-block">← All events</Link>
          <div className="relative h-[380px] rounded-xl overflow-hidden mb-8">
            <Image src={mediaUrl(event.featured_image)} alt={event.title} fill className="object-cover" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-8 p-5 bg-gray-50 dark:bg-[#0a2219] rounded-xl">
            {event.starts_at && (
              <div>
                <p className="text-xs text-gray-500 uppercase">Date</p>
                <p className="font-semibold">{format(new Date(event.starts_at), "EEEE, MMMM dd, yyyy")}</p>
              </div>
            )}
            {event.location && (
              <div>
                <p className="text-xs text-gray-500 uppercase">Location</p>
                <p className="font-semibold">{event.location}</p>
              </div>
            )}
          </div>
          {event.description && <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{event.description}</p>}
          <DynamicContent html={event.content} />
        </div>
      </section>
      <Volunteer />
    </>
  );
}
