import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import MediaVideoGrid from "@/components/Media/MediaVideoGrid";
import { api, MediaItem } from "@/lib/api";

export const metadata: Metadata = { title: "Videos" };

export default async function VideosPage() {
  let items: MediaItem[] = [];
  try {
    items = await api.media("video");
  } catch {
    items = [];
  }

  return (
    <>
      <HeroSub title="Videos" />
      <section className="py-16 dark:bg-dark">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          {items.length > 0 ? (
            <MediaVideoGrid items={items} />
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No videos yet. Add videos with captions from the admin panel.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
