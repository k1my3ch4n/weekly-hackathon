import { cpSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, "..", "report-ui", "dist", "index.html");
const destDir = resolve(__dirname, "..", "cli", "assets");
const dest = resolve(destDir, "template.html");

mkdirSync(destDir, { recursive: true });
cpSync(src, dest);
console.log("✅ template.html 복사 완료:", dest);
