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
    const post = await api.blog(slug);
    return { title: post.title };
  } catch {
    return { title: "Blog" };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = await api.blog(slug);
  } catch {
    return (
      <>
        <HeroSub title="Not Found" />
        <div className="container mx-auto px-4 py-20 text-center">
          <p>Blog post not found.</p>
          <Link href="/blog" className="text-[#0a3d2e] underline mt-4 inline-block">Back to blog</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <HeroSub title={post.title} />
      <article className="lg:py-16 py-10 dark:bg-dark">
        <div className="container lg:max-w-3xl mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#0a3d2e] dark:text-[#C9A227] mb-6 hover:underline">
            ← Back to blog
          </Link>
          <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
            <Image src={mediaUrl(post.featured_image)} alt={post.title} fill className="object-cover" priority />
          </div>
          <div className="flex flex-wrap gap-3 mb-6 text-sm">
            {post.category && <span className="bg-[#0a3d2e] text-white px-3 py-1 rounded-full">{post.category}</span>}
            {post.author && <span className="text-gray-500">By {post.author}</span>}
            {post.published_at && <span className="text-gray-500">{format(new Date(post.published_at), "MMMM dd, yyyy")}</span>}
          </div>
          <DynamicContent html={post.content} />
        </div>
      </article>
      <Volunteer />
    </>
  );
}
