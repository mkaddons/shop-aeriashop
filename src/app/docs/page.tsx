import Link from "next/link";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getAllDocs, getDocsIndex } from "@/lib/docs";
import { href } from "@/lib/paths";

export default function DocsIndexPage() {
  const index = getDocsIndex();
  const docs = getAllDocs();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href={href("/")} className="text-muted hover:text-primary mb-8 inline-block text-sm">
        ← Home
      </Link>
      <h1 className="text-ink text-4xl font-normal">
        {index?.title ?? "Documentation"}
      </h1>
      {index?.body ? (
        <div className="mt-8">
          <MarkdownBody content={index.body} />
        </div>
      ) : null}
      {docs.length > 0 ? (
        <nav className="border-ink/10 mt-10 border-t pt-10" aria-label="Documentation topics">
          <h2 className="text-ink mb-4 text-lg font-medium">Topics</h2>
          <ul className="space-y-3">
            {docs.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={href(`/docs/${doc.slug}/`)}
                  className="text-muted hover:text-primary text-base transition-colors"
                >
                  {doc.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </section>
  );
}
