import { Metadata } from "next";
import PageLayout from "@/components/Common/PageLayout";
import { api } from "@/lib/api";

export const metadata: Metadata = { title: "Our Work" };

export default async function OurWorkPage() {
  let page: { title: string; content?: string | null; excerpt?: string | null } = {
    title: "Our Work",
    content: null,
    excerpt: null,
  };
  try {
    page = await api.pageByType("our_work");
  } catch {
    /* use defaults */
  }
  return <PageLayout title={page.title} content={page.content} excerpt={page.excerpt} />;
}
