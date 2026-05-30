import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getAllDocs, getDoc, getDocSlugs } from "@/lib/docs";
import { href } from "@/lib/paths";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getDocSlugs().map((slug) => ({ slug }));
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc || doc.slug === "index") notFound();

  const allDocs = getAllDocs();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href={href("/docs/")} className="text-muted hover:text-primary mb-8 inline-block text-sm">
        ← Documentation
      </Link>
      <h1 className="text-ink text-4xl font-normal">{doc.title}</h1>
      <div className="mt-8">
        <MarkdownBody content={doc.body} />
      </div>
      {allDocs.length > 1 ? (
        <nav className="border-ink/10 mt-12 border-t pt-8" aria-label="Other documentation">
          <h2 className="text-ink mb-3 text-sm font-medium">More topics</h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {allDocs
              .filter((d) => d.slug !== slug)
              .map((d) => (
                <li key={d.slug}>
                  <Link
                    href={href(`/docs/${d.slug}/`)}
                    className="text-muted hover:text-primary text-sm transition-colors"
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      ) : null}
    </section>
  );
}
