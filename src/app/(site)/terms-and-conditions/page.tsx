import { Metadata } from "next";
import PageLayout from "@/components/Common/PageLayout";
import { api } from "@/lib/api";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default async function TermsPage() {
  let page: { title: string; content?: string | null } = { title: "Terms & Conditions", content: null };
  try {
    page = await api.pageByType("terms");
  } catch {
    /* use defaults */
  }
  return <PageLayout title={page.title} content={page.content} />;
}
