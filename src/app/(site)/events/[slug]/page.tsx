import HeroSub from "@/components/SharedComponent/HeroSub";
import DynamicContent from "@/components/Common/DynamicContent";
import EventImageSlider from "@/components/Events/EventImageSlider";
import Volunteer from "@/components/SharedComponent/Volunteer";
import {
  formatEventDateLine,
  getEventImageUrls,
  stripImagesFromHtml,
} from "@/components/Events/eventUtils";
import { api } from "@/lib/api";
import Link from "next/link";
import { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const event = await api.event(slug);
    return { title: `${event.title} | My Prophet` };
  } catch {
    return { title: "Event | My Prophet" };
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
        <HeroSub
          title="Event Not Found"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Events", href: "/events" },
            { label: "Not Found" },
          ]}
        />
        <div className="container mx-auto px-4 py-20 text-center dark:bg-dark">
          <Link href="/events" className="text-darkprimary dark:text-accent hover:underline">
            Back to events
          </Link>
        </div>
      </>
    );
  }

  const images = getEventImageUrls(event);
  const dateLine = formatEventDateLine(event);

  return (
    <>
      <HeroSub
        title={event.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: event.title },
        ]}
      />
      <section className="py-14 sm:py-16 dark:bg-dark">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <Link
            href="/events"
            className="mb-8 inline-block text-sm text-darkprimary hover:underline dark:text-accent"
          >
            ← All events
          </Link>

          {dateLine && (
            <p className="text-base text-gray-600 sm:text-lg dark:text-gray-300">{dateLine}</p>
          )}

          {images.length > 0 && (
            <div className="mt-8 sm:mt-10">
              <EventImageSlider images={images} title={event.title} />
            </div>
          )}

          {event.description && (
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
              {event.description}
            </p>
          )}

          {event.content && (
            <div className="prose prose-neutral mx-auto mt-8 max-w-2xl text-left dark:prose-invert">
              <DynamicContent
                html={images.length > 0 ? stripImagesFromHtml(event.content) : event.content}
              />
            </div>
          )}
        </div>
      </section>
      <Volunteer />
    </>
  );
}
