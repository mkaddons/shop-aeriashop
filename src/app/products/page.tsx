import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-ink text-4xl font-normal sm:text-5xl">All Products</h1>
      <p className="text-muted mt-4 max-w-2xl text-lg">
        Templates, UI kits, and developer tools ready to purchase and download.
      </p>
      {products.length === 0 ? (
        <p className="text-muted mt-12">No products published yet.</p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
