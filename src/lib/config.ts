import fs from "fs";
import path from "path";

export type ShopConfig = {
  config: {
    title: string;
    description: string;
    theme: string;
    copyright: string;
  };
  socials: Record<string, string>;
  email?: string;
};

const DEFAULT: ShopConfig = {
  config: {
    title: "Aeria Shop",
    description: "Digital products store",
    theme: "default",
    copyright: "© 2026 Aeria Shop",
  },
  socials: {},
};

export function getShopConfig(): ShopConfig {
  try {
    const file = path.join(process.cwd(), "public", "shop.json");
    const raw = fs.readFileSync(file, "utf8");
    const parsed = JSON.parse(raw) as ShopConfig;
    if (!parsed?.config?.title) return DEFAULT;
    return parsed;
  } catch {
    return DEFAULT;
  }
}
