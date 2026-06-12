import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import MediaPhotoGrid from "@/components/Media/MediaPhotoGrid";
import { api, MediaItem } from "@/lib/api";

export const metadata: Metadata = { title: "Photo Gallery" };

export default async function PhotosPage() {
  let items: MediaItem[] = [];
  try {
    items = await api.media("image");
  } catch {
    items = [];
  }

  return (
    <>
      <HeroSub title="Photos" />
      <section className="py-16 dark:bg-dark">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          {items.length > 0 ? (
            <MediaPhotoGrid items={items} />
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No photos yet. Add images with captions from the admin panel.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
