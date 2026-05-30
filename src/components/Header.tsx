import Link from "next/link";
import { href } from "@/lib/paths";
import { getShopConfig } from "@/lib/config";

export function Header() {
  const shop = getShopConfig();

  return (
    <header className="border-ink/10 sticky top-0 z-50 border-b bg-secondary/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href={href("/")}
          className="text-ink text-lg font-medium tracking-tight"
        >
          {shop.config.title}
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href={href("/docs/")} className="hover:text-primary transition-colors">
            Docs
          </Link>
          <Link
            href={href("/products/")}
            className="border-ink text-ink shadow-brutal-sm hover:bg-primary inline-flex items-center rounded-lg border-2 bg-surface px-4 py-2 transition-colors hover:text-ink"
          >
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
}
