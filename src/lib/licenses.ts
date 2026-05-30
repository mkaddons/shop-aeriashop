import fs from "fs";
import path from "path";

export type LicenseTypeInfo = {
  label: string;
  description: string;
  free?: boolean;
  order?: number;
};

export type LicensesConfig = {
  title: string;
  types: Record<string, LicenseTypeInfo>;
};

const DEFAULT: LicensesConfig = {
  title: "License",
  types: {},
};

const KEY_ALIASES: Record<string, string> = {
  "free-license": "free license",
  free: "free license",
  "single-license": "single license",
  single: "single license",
  "team-licenses": "team licenses",
  team: "team licenses",
};

function normalizeLookupKey(key: string): string {
  const lower = key.toLowerCase().trim();
  return KEY_ALIASES[lower] ?? lower.replace(/-/g, " ");
}

export function getLicensesConfig(): LicensesConfig {
  try {
    const file = path.join(process.cwd(), "public", "licenses.json");
    const raw = fs.readFileSync(file, "utf8");
    const parsed = JSON.parse(raw) as LicensesConfig;
    if (!parsed?.types || typeof parsed.types !== "object") return DEFAULT;
    return {
      title: String(parsed.title ?? DEFAULT.title),
      types: parsed.types,
    };
  } catch {
    return DEFAULT;
  }
}

export function getLicenseTypeInfo(tierKey: string): LicenseTypeInfo | undefined {
  const config = getLicensesConfig();
  const lookup = normalizeLookupKey(tierKey);
  return config.types[lookup];
}

export function resolveLicenseLabel(tierKey: string, fallback: string): string {
  return getLicenseTypeInfo(tierKey)?.label ?? fallback;
}

export function isFreeLicenseType(tierKey: string): boolean {
  return getLicenseTypeInfo(tierKey)?.free === true;
}

export function getLicenseSortOrder(tierKey: string): number {
  const info = getLicenseTypeInfo(tierKey);
  const order = Number(info?.order);
  return Number.isFinite(order) ? order : 999;
}
