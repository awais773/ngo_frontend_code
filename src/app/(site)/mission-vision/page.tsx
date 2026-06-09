import { Metadata } from "next";
import PageLayout from "@/components/Common/PageLayout";
import { api } from "@/lib/api";

export const metadata: Metadata = { title: "Mission & Vision" };

export default async function MissionVisionPage() {
  let page: { title: string; content?: string | null; excerpt?: string | null } = {
    title: "Mission & Vision",
    content: null,
    excerpt: null,
  };
  try {
    page = await api.pageByType("mission_vision");
  } catch {
    /* use defaults */
  }
  return <PageLayout title={page.title} content={page.content} excerpt={page.excerpt} />;
}
