import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "src", "content", "goods");
const destDir = path.join(root, "public", "content", "goods");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else if (!entry.name.endsWith(".md")) fs.copyFileSync(s, d);
  }
}

if (fs.existsSync(srcDir)) {
  fs.rmSync(destDir, { recursive: true, force: true });
  copyDir(srcDir, destDir);
  console.log("[sync-content] copied goods assets to public/content/goods");
}
