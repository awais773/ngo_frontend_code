import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { BlogPost } from "@/lib/api";
import { mediaUrl } from "@/lib/api";

interface Props {
  blogs: BlogPost[];
}

export default function HomeBlogSection({ blogs }: Props) {
  return (
    <section className="py-12 lg:py-16 bg-white dark:bg-dark" data-aos="fade-up" data-aos-duration="1200">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-accent font-semibold text-sm mb-2 uppercase tracking-wide">Latest News</p>
            <h2 className="text-3xl font-semibold text-darkprimary dark:text-white">From our blog</h2>
          </div>
          <Link href="/blog" className="text-darkprimary dark:text-accent font-semibold hover:underline hidden sm:block">
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog, index) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group"
              data-aos="fade-up"
              data-aos-delay={`${index * 100}`}
            >
              <div className="relative h-48 rounded-xl overflow-hidden mb-4 border border-beige-dark dark:border-dark_border">
                <Image
                  src={mediaUrl(blog.featured_image)}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                {blog.category && (
                  <span className="absolute top-3 left-3 bg-darkprimary text-white text-xs px-2 py-1 rounded">{blog.category}</span>
                )}
              </div>
              <p className="text-xs text-dustGray mb-2">
                {blog.published_at ? format(new Date(blog.published_at), "MMM dd, yyyy") : ""}
              </p>
              <h3 className="font-bold text-lg text-midnight_text dark:text-white group-hover:text-darkprimary dark:group-hover:text-accent line-clamp-2">{blog.title}</h3>
              <p className="text-sm text-dustGray dark:text-gray-400 mt-2 line-clamp-2">{blog.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
