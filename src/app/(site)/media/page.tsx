import { Metadata } from "next";
import HeroSub from "@/components/SharedComponent/HeroSub";
import Image from "next/image";
import { api, mediaUrl, MediaItem } from "@/lib/api";

export const metadata: Metadata = { title: "Media Gallery" };

type Props = { searchParams: Promise<{ type?: string }> };

export default async function MediaPage({ searchParams }: Props) {
  const { type } = await searchParams;
  let items: MediaItem[] = [];
  try {
    items = await api.media(type);
  } catch {
    items = [];
  }

  const title = type === "video" ? "Videos" : type === "image" ? "Gallery" : "Media";

  return (
    <>
      <HeroSub title={title} />
      <section className="py-16 dark:bg-dark">
        <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-slate-800">
                {item.type === "video" ? (
                  <div className="aspect-video">
                    <iframe src={item.url} title={item.title} className="w-full h-full" allowFullScreen />
                  </div>
                ) : (
                  <div className="relative h-56">
                    <Image src={mediaUrl(item.url)} alt={item.title} fill className="object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold dark:text-white">{item.title}</h3>
                  {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
          {items.length === 0 && (
            <p className="text-center text-gray-500">No media items yet. Add from admin panel.</p>
          )}
        </div>
      </section>
    </>
  );
}
