import { Metadata } from "next";
import PageLayout from "@/components/Common/PageLayout";
import { api } from "@/lib/api";

export const metadata: Metadata = { title: "About Us" };

export default async function AboutPage() {
  let page: { title: string; content?: string | null; excerpt?: string | null } = {
    title: "About Us",
    content: null,
    excerpt: null,
  };
  try {
    page = await api.pageByType("about");
  } catch {
    /* use defaults */
  }
  return <PageLayout title={page.title} content={page.content} excerpt={page.excerpt} />;
}
