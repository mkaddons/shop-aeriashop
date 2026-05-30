const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${normalized}`;
}

/** 供 next/link 使用；basePath 由 next.config 自动处理，勿在此重复拼接 */
export function href(path: string): string {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}
