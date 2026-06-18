interface DynamicContentProps {
  html?: string | null;
  className?: string;
}

export default function DynamicContent({ html, className = "" }: DynamicContentProps) {
  if (!html) {
    return <p className="text-gray-500">Content coming soon.</p>;
  }

  const trimmed = html.trim();
  const looksLikeHtml = /<[a-z][\s\S]*>/i.test(trimmed);
  const contentHtml = looksLikeHtml ? trimmed : trimmed.split(/\n{2,}/).map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");

  return (
    <div
      className={`rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
