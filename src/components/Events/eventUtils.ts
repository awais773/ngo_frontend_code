import type { EventItem } from "@/lib/api";
import { mediaUrl } from "@/lib/api";

export function formatEventDateLine(event: EventItem): string {
  const parts: string[] = [];

  if (event.starts_at) {
    const date = new Date(event.starts_at);
    const day = date.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th";
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    parts.push(`${day}${suffix} ${month} ${year}`);
  }

  if (event.location) {
    parts.push(event.location);
  }

  return parts.join(", ");
}

export function getEventImages(event: EventItem): string[] {
  const images: string[] = [];

  if (event.featured_image) {
    images.push(event.featured_image);
  }

  if (event.content) {
    const regex = /<img[^>]+src=["']([^"']+)["']/gi;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(event.content)) !== null) {
      const src = match[1];
      if (!images.includes(src)) {
        images.push(src);
      }
    }
  }

  return images;
}

export function getEventImageUrls(event: EventItem): string[] {
  return getEventImages(event).map((path) => mediaUrl(path));
}

export function stripImagesFromHtml(html: string): string {
  return html.replace(/<img[^>]*>/gi, "").trim();
}
