import fs from "fs-extra";
import path from "path";

export async function generateGitignore(targetDir, framework) {
  const lines = ["node_modules", ".env", ".env.local", ".DS_Store", "dist", "build"];

  if (framework === "next") {
    lines.push(".next", "out");
  }

  if (framework === "vite") {
    lines.push("dist");
  }

  await fs.writeFile(path.join(targetDir, ".gitignore"), lines.join("\n") + "\n");
}
