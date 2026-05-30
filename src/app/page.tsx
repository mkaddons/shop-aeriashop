import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { getAllProducts, getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const products = featured.length > 0 ? featured : getAllProducts().slice(0, 3);

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-ink text-3xl font-normal sm:text-4xl">Featured products</h2>
        </div>
        {products.length === 0 ? (
          <p className="text-muted">No products yet. Add markdown files under content/goods/.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
