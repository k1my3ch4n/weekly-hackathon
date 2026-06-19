import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.join(__dirname, "../templates");

export async function generateFramework(
  targetDir,
  framework,
  useTypeScript,
  useTailwind,
) {
  if (framework === "vite") {
    await fs.copy(path.join(TEMPLATES_DIR, "vite"), targetDir, {
      overwrite: true,
    });
    if (!useTypeScript) {
      await fs.remove(path.join(targetDir, "tsconfig.json"));
      await fs.remove(path.join(targetDir, "tsconfig.app.json"));
      await fs.remove(path.join(targetDir, "tsconfig.node.json"));
    }
    if (!useTailwind) {
      await fs.writeFile(path.join(targetDir, "src", "globals.css"), "");
    }
  } else if (framework === "next") {
    await fs.copy(path.join(TEMPLATES_DIR, "next"), targetDir, {
      overwrite: true,
    });
    if (!useTypeScript) {
      await fs.remove(path.join(targetDir, "tsconfig.json"));
    }
    if (!useTailwind) {
      await fs.writeFile(path.join(targetDir, "src", "app", "globals.css"), "");
    }
  } else {
    if (useTypeScript) {
      await fs.writeFile(
        path.join(targetDir, "tsconfig.json"),
        JSON.stringify(
          {
            compilerOptions: {
              target: "ES2020",
              module: "ESNext",
              moduleResolution: "bundler",
              strict: true,
              paths: { "@/*": ["./src/*"] },
            },
            include: ["src"],
          },
          null,
          2,
        ),
      );
    }
  }
}
