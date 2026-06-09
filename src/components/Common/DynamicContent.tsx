interface DynamicContentProps {
  html?: string | null;
  className?: string;
}

export default function DynamicContent({ html, className = "" }: DynamicContentProps) {
  if (!html) {
    return <p className="text-gray-500">Content coming soon.</p>;
  }

  return (
    <div
      className={`prose prose-lg dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
