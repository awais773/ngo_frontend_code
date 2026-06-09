import { Metadata } from "next";
import PageLayout from "@/components/Common/PageLayout";
import { api } from "@/lib/api";

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPage() {
  let page: { title: string; content?: string | null } = { title: "Privacy Policy", content: null };
  try {
    page = await api.pageByType("privacy");
  } catch {
    /* use defaults */
  }
  return <PageLayout title={page.title} content={page.content} />;
}
