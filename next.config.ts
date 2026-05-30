import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const themeRoot = path.dirname(fileURLToPath(import.meta.url));
const isMultiSite = process.env.MUTIL_SITE_DEPLOY === "1";
const basePath = isMultiSite ? "/aeriashop" : "";

const nextConfig: NextConfig = {
  outputFileTracingRoot: themeRoot,
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
