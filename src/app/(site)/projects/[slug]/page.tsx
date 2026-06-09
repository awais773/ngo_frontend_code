import { Metadata } from "next";
import PageLayout from "@/components/Common/PageLayout";
import DynamicContent from "@/components/Common/DynamicContent";
import Link from "next/link";
import { api, Project } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const p = await api.project(slug);
    return { title: p.title };
  } catch {
    return { title: "Project" };
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  let project: Project | null = null;
  try {
    project = await api.project(slug);
  } catch {
    return <PageLayout title="Project Not Found" content="<p>This project could not be found.</p>" />;
  }

  const goal = Number(project.goal_amount) || 0;
  const raised = Number(project.raised_amount) || 0;

  return (
    <PageLayout title={project.title} excerpt={project.description}>
      <DynamicContent html={project.content} />
      <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
        <p className="text-lg font-semibold">${raised.toLocaleString()} raised of ${goal.toLocaleString()}</p>
        <Link href={`/donate?purpose=project&amount=50`} className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-lg font-semibold">
          Donate to this Project
        </Link>
      </div>
    </PageLayout>
  );
}
