import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductDemo } from "@/components/ProductDemo";
import { ProductLicenses } from "@/components/ProductLicenses";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getAllProducts, getProduct } from "@/lib/products";
import { href } from "@/lib/paths";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Link href={href("/products/")} className="text-muted hover:text-primary mb-8 inline-block text-sm">
        ← Back to products
      </Link>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />
        <div>
          <h1 className="text-ink text-3xl font-normal sm:text-4xl">{product.name}</h1>
          {product.tools.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {product.tools.map((tool) => (
                <li
                  key={tool}
                  className="border-ink/20 text-muted rounded-md border bg-surface px-3 py-1 text-sm"
                >
                  {tool}
                </li>
              ))}
            </ul>
          ) : null}
          <p className="text-muted mt-6 text-lg leading-7">{product.desc}</p>
          <ProductDemo demo={product.demo} />
          <ProductLicenses licenses={product.licenses} />
        </div>
      </div>
      {product.body ? (
        <section className="border-ink/10 mt-16 border-t pt-12">
          <h2 className="text-ink mb-6 text-2xl font-normal">Details</h2>
          <MarkdownBody content={product.body} />
        </section>
      ) : null}
    </article>
  );
}
