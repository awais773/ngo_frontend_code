import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { BlogPost } from "@/lib/api";
import { api, mediaUrl } from "@/lib/api";

const BlogList = async () => {
  let posts: BlogPost[] = [];
  try {
    const res = await api.blogs();
    posts = res.data || [];
  } catch {
    posts = [];
  }

  return (
    <section className="lg:py-24 py-16 dark:bg-dark">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No blog posts yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`} className="group flex flex-col sm:flex-row gap-5 bg-white dark:bg-[#0a2219] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="relative sm:w-48 h-48 shrink-0">
                  <Image
                    src={mediaUrl(blog.featured_image)}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
                <div className="p-5 flex flex-col justify-center">
                  <div className="flex gap-2 text-xs mb-2">
                    {blog.category && <span className="text-[#C9A227] font-semibold">{blog.category}</span>}
                    {blog.published_at && (
                      <span className="text-gray-500">{format(new Date(blog.published_at), "MMM dd, yyyy")}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg group-hover:text-[#0a3d2e] dark:group-hover:text-[#C9A227] line-clamp-2">{blog.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{blog.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
