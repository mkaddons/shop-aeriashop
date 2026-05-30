import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { getDisplayPrice } from "@/lib/products";
import { assetPath, href } from "@/lib/paths";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  const displayPrice = getDisplayPrice(product);
  const demo = product.demo.trim();
  const productHref = href(`/products/${product.slug}/`);
  const preview = product.preview
    ? assetPath(product.preview)
    : assetPath("/images/placeholder.svg");
  const showFooter = Boolean(displayPrice || demo);

  return (
    <article className="border-ink group shadow-brutal flex flex-col overflow-hidden rounded-2xl border-2 bg-surface transition-transform hover:translate-x-1 hover:translate-y-1">
      <Link href={productHref} className="flex flex-1 flex-col">
        <div className="bg-secondary relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={preview}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            unoptimized
          />
          {product.featured ? (
            <span className="bg-accent text-ink absolute top-3 left-3 rounded-md px-2 py-0.5 text-xs font-medium">
              Featured
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5 pb-0">
          <h3 className="text-ink text-lg font-medium">{product.name}</h3>
          <p className="text-muted mt-2 line-clamp-2 flex-1 text-sm">{product.desc}</p>
        </div>
      </Link>
      {showFooter ? (
        <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-5">
          {displayPrice ? (
            <Link
              href={productHref}
              className="text-ink text-base font-medium hover:text-primary transition-colors"
            >
              {displayPrice}
            </Link>
          ) : (
            <span />
          )}
          {demo ? (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="border-ink text-ink shadow-brutal-sm hover:bg-primary shrink-0 rounded-lg border-2 bg-secondary px-3 py-1.5 text-xs font-medium transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Live demo
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
