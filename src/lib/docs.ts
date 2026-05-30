import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type DocPage = {
  slug: string;
  title: string;
  body: string;
  order: number;
};

const DOCS_DIR = path.join(process.cwd(), "src", "content", "docs");
const INDEX_SLUG = "index";

function readDocFile(filePath: string, slug: string): DocPage | null {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const order = Number(data.order);
    return {
      slug,
      title: String(data.title ?? slug),
      body: content.trim(),
      order: Number.isFinite(order) ? order : 999,
    };
  } catch {
    return null;
  }
}

function listDocFiles(): { slug: string; filePath: string }[] {
  if (!fs.existsSync(DOCS_DIR)) return [];
  return fs
    .readdirSync(DOCS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({
      slug: f.replace(/\.md$/, ""),
      filePath: path.join(DOCS_DIR, f),
    }));
}

export function getDocsIndex(): DocPage | null {
  const indexPath = path.join(DOCS_DIR, "index.md");
  if (!fs.existsSync(indexPath)) return null;
  return readDocFile(indexPath, INDEX_SLUG);
}

export function getAllDocs(): DocPage[] {
  const docs: DocPage[] = [];
  for (const { slug, filePath } of listDocFiles()) {
    if (slug === INDEX_SLUG) continue;
    const doc = readDocFile(filePath, slug);
    if (doc) docs.push(doc);
  }
  return docs.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getDocSlugs(): string[] {
  return getAllDocs().map((d) => d.slug);
}

export function getDoc(slug: string): DocPage | null {
  if (slug === INDEX_SLUG) return getDocsIndex();
  const filePath = path.join(DOCS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readDocFile(filePath, slug);
}
