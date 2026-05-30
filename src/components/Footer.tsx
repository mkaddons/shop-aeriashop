import Link from "next/link";
import Image from "next/image";
import { getShopConfig } from "@/lib/config";
import { assetPath, href } from "@/lib/paths";

const FOOTER_DOC_LINKS = [
  { href: "/docs/", label: "Doc" },
  { href: "/docs/teams/", label: "Teams" },
  { href: "/docs/privacy/", label: "Privacy Policy" },
] as const;

export function Footer() {
  const shop = getShopConfig();
  const socials = Object.entries(shop.socials ?? {});

  return (
    <footer className="border-ink/10 mt-20 border-t bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6">
        <div>
          <div className="flex flex-wrap gap-3">
            {socials.map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-ink shadow-brutal-sm hover:bg-primary flex h-10 w-10 items-center justify-center rounded-lg border-2 bg-secondary transition-colors"
                aria-label={key}
              >
                <Image
                  src={assetPath(`/images/icon/${key}.svg`)}
                  alt=""
                  width={20}
                  height={20}
                  unoptimized
                />
              </a>
            ))}
          </div>
          {shop.email ? (
            <p className="text-muted mt-4 text-sm">
              <a href={`mailto:${shop.email}`} className="hover:text-primary underline-offset-2 hover:underline">
                {shop.email}
              </a>
            </p>
          ) : null}
        </div>
        <div className="flex flex-col items-start gap-2">
          {FOOTER_DOC_LINKS.map(({ href: path, label }) => (
            <Link
              key={path}
              href={href(path)}
              className="text-muted hover:text-primary text-sm transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-ink/10 text-muted border-t px-4 py-6 text-center text-xs sm:px-6">
        {shop.config.copyright}
      </div>
    </footer>
  );
}
