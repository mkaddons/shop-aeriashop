import Link from "next/link";
import Image from "next/image";
import { assetPath, href } from "@/lib/paths";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-accent mb-4 text-sm font-medium tracking-wide uppercase">
            Digital products
          </p>
          <h1 className="text-ink text-5xl leading-[0.95] font-normal tracking-tight sm:text-7xl lg:text-8xl">
            Sell
            <br />
            software
            <br />
            globally.
          </h1>
          <p className="text-muted mt-8 max-w-xl text-lg leading-7">
            Ship templates, kits, and tools to customers worldwide. Built for indie makers and teams who sell digital goods.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={href("/products/")}
              className="bg-primary border-ink text-ink shadow-brutal inline-flex rounded-xl border-2 px-8 py-3 text-base font-medium transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              All Products
            </Link>
            <Link
              href={href("/docs/")}
              className="border-ink text-ink shadow-brutal-sm inline-flex rounded-xl border-2 bg-surface px-8 py-3 text-base transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
            >
              Documentation
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full lg:aspect-square">
          <Image
            src={assetPath("/images/illustration.png")}
            alt=""
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
