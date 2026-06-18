import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { generateFSD } from "./generators/fsd.js";
import { generateFramework } from "./generators/framework.js";
import { generateTailwind } from "./generators/tailwind.js";
import { generateGitignore } from "./generators/gitignore.js";
import { generatePackageJson } from "./generators/package.js";

export async function generate(context) {
  const { projectName, framework, useTypeScript, useTailwind, useClaude } =
    context;
  const targetDir = path.join(process.cwd(), projectName);
  const ext = useTypeScript ? "ts" : "js";

  await fs.ensureDir(targetDir);

  await generateFSD(targetDir, ext);
  await generateFramework(targetDir, framework, useTypeScript, useTailwind);

  if (useTailwind) {
    await generateTailwind(targetDir, framework);
  }

  if (useClaude) {
    await generateClaudeMd(targetDir);
  }

  await generateGitignore(targetDir, framework);
  await generatePackageJson(
    targetDir,
    projectName,
    framework,
    useTailwind,
    useTypeScript,
  );

  execSync("git init", { cwd: targetDir, stdio: "ignore" });

  return targetDir;
}

async function generateClaudeMd(targetDir) {
  const claudeDir = path.join(targetDir, ".claude");
  await fs.ensureDir(claudeDir);
  await fs.copy(
    path.join(__dirname, "../templates/CLAUDE.md"),
    path.join(claudeDir, "CLAUDE.md"),
  );
}

export function getInstallCommand(packageManager) {
  return { npm: "npm install", pnpm: "pnpm install", yarn: "yarn" }[
    packageManager
  ];
}
