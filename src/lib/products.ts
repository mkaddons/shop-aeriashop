import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  getLicenseSortOrder,
  isFreeLicenseType,
  resolveLicenseLabel,
} from "@/lib/licenses";

export type LicenseTier = {
  key: string;
  label: string;
  price: string;
  payurl: string;
  free: boolean;
};

export type Product = {
  slug: string;
  name: string;
  desc: string;
  preview: string;
  tools: string[];
  images: string[];
  featured: boolean;
  collection: string;
  demo: string;
  licenses: LicenseTier[];
  body: string;
};

const GOODS_DIR = path.join(process.cwd(), "content", "goods");
const GOODS_PUBLIC_PREFIX = "/goods";

function parseTools(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") {
    return value
      .split(/[,;|]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function parseImages(value: unknown, slug: string): string[] {
  const toPath = (img: string) => {
    if (img.startsWith("http") || img.startsWith("/")) return img;
    return `${GOODS_PUBLIC_PREFIX}/${slug}/${img}`;
  };
  if (Array.isArray(value)) return value.map(String).map(toPath);
  if (typeof value === "string") {
    return value
      .split(/[,;|]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map(toPath);
  }
  return [];
}

function parseLicense(data: Record<string, unknown>): LicenseTier[] {
  const license = data.license;
  if (license && typeof license === "object" && !Array.isArray(license)) {
    const entries = Object.entries(license as Record<string, unknown>);
    entries.sort(([a], [b]) => {
      const keyA = a.toLowerCase().trim().replace(/\s+/g, "-");
      const keyB = b.toLowerCase().trim().replace(/\s+/g, "-");
      return getLicenseSortOrder(keyA) - getLicenseSortOrder(keyB);
    });

    const tiers: LicenseTier[] = [];
    for (const [rawKey, value] of entries) {
      if (!value || typeof value !== "object" || Array.isArray(value)) continue;
      const tier = value as Record<string, unknown>;
      const normalized = rawKey.toLowerCase().trim();
      const payurl = String(tier.payurl ?? "").trim();
      if (!payurl) continue;
      const tierKey = normalized.replace(/\s+/g, "-");
      tiers.push({
        key: tierKey,
        label: resolveLicenseLabel(tierKey, rawKey),
        price: String(tier.price ?? "").trim(),
        payurl,
        free: isFreeLicenseType(tierKey),
      });
    }
    if (tiers.length > 0) return tiers;
  }

  const legacyPrice = String(data.price ?? "").trim();
  const legacyPayurl = String(data.payurl ?? "").trim();
  if (legacyPayurl) {
    return [
      {
        key: "single-license",
        label: "Single license",
        price: legacyPrice,
        payurl: legacyPayurl,
        free: isFreeLicenseType("single-license"),
      },
    ];
  }

  return [];
}

export function formatTierPriceLabel(tier: LicenseTier): string {
  if (tier.free) return "Free";
  return tier.price.trim();
}

export function getDisplayPrice(product: Product): string {
  if (product.licenses.length === 0) return "";

  const first = formatTierPriceLabel(product.licenses[0]);
  if (!first && !product.licenses[0].free) return "";
  if (product.licenses.length === 1) return first || "Free";
  return `From ${first || "Free"}`;
}

function parseProductFile(
  filePath: string,
  slug: string,
  dir?: string,
): Product | null {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const meta = data as Record<string, unknown>;
    const preview = String(meta.preview ?? meta.image ?? "");
    const previewPath = preview
      ? preview.startsWith("http") || preview.startsWith("/")
        ? preview
        : `${GOODS_PUBLIC_PREFIX}/${slug}/${preview}`
      : "";

    return {
      slug,
      name: String(meta.name ?? slug),
      desc: String(meta.desc ?? ""),
      preview: previewPath,
      tools: parseTools(meta.tools),
      images: parseImages(meta.images, slug),
      featured: Boolean(meta.featured ?? meta.fetured),
      collection: String(meta.collection ?? "general"),
      demo: String(meta.demo ?? "").trim(),
      licenses: parseLicense(meta),
      body: content.trim(),
    };
  } catch {
    return null;
  }
}

function collectMdFiles(dir: string): { file: string; slug: string }[] {
  const items: { file: string; slug: string }[] = [];
  if (!fs.existsSync(dir)) return items;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const index = path.join(full, "index.md");
      if (fs.existsSync(index)) {
        items.push({ file: index, slug: entry.name });
      }
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      items.push({
        file: full,
        slug: entry.name.replace(/\.md$/, ""),
      });
    }
  }
  return items;
}

export function getAllProducts(): Product[] {
  const files = collectMdFiles(GOODS_DIR);
  const products: Product[] = [];

  for (const { file, slug } of files) {
    const dir = path.dirname(file);
    const isFolder = path.basename(file) === "index.md";
    const product = parseProductFile(file, slug, isFolder ? slug : undefined);
    if (product) {
      if (!product.preview && isFolder) {
        const cover = path.join(dir, "cover.svg");
        if (fs.existsSync(cover)) product.preview = `${GOODS_PUBLIC_PREFIX}/${slug}/cover.svg`;
      }
      if (product.images.length === 0 && product.preview) {
        product.images = [product.preview];
      }
      products.push(product);
    }
  }

  return products.sort((a, b) => a.name.localeCompare(b.name));
}

export function getProduct(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured);
}
