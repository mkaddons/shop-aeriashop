import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = path.join(root, "..", "..", "public", "images", "icon");
const destDir = path.join(root, "public", "images", "icon");

if (!fs.existsSync(srcDir)) {
  console.warn("[sync-icons] source not found:", srcDir);
  process.exit(0);
}

fs.mkdirSync(destDir, { recursive: true });
for (const file of fs.readdirSync(srcDir)) {
  if (!file.endsWith(".svg")) continue;
  fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
}
console.log("[sync-icons] copied icons to public/images/icon");
