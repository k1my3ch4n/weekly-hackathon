import fs from "fs-extra";
import path from "path";

export async function generatePackageJson(
  targetDir,
  projectName,
  framework,
  useTailwind,
  useTypeScript,
) {
  const dependencies = {};
  const devDependencies = {};

  if (framework === "vite") {
    dependencies["react"] = "^18.3.1";
    dependencies["react-dom"] = "^18.3.1";
    devDependencies["vite"] = "^5.4.0";
    devDependencies["@vitejs/plugin-react"] = "^4.3.1";
    if (useTypeScript) {
      devDependencies["typescript"] = "^5.5.3";
      devDependencies["@types/react"] = "^18.3.3";
      devDependencies["@types/react-dom"] = "^18.3.0";
    }
  } else if (framework === "next") {
    dependencies["next"] = "^14.2.5";
    dependencies["react"] = "^18.3.1";
    dependencies["react-dom"] = "^18.3.1";
    if (useTypeScript) {
      devDependencies["typescript"] = "^5.5.3";
      devDependencies["@types/node"] = "^20.14.9";
      devDependencies["@types/react"] = "^18.3.3";
      devDependencies["@types/react-dom"] = "^18.3.0";
    }
  }

  if (useTailwind) {
    devDependencies["tailwindcss"] = "^3.4.6";
    devDependencies["autoprefixer"] = "^10.4.19";
    devDependencies["postcss"] = "^8.4.40";
  }

  const scripts =
    framework === "vite"
      ? { dev: "vite", build: "vite build", preview: "vite preview" }
      : framework === "next"
        ? { dev: "next dev", build: "next build", start: "next start" }
        : { build: "tsc" };

  const pkg = {
    name: projectName,
    version: "0.1.0",
    private: true,
    ...(framework === "vite" ? { type: "module" } : {}),
    scripts,
    dependencies,
    devDependencies,
  };

  await fs.writeFile(
    path.join(targetDir, "package.json"),
    JSON.stringify(pkg, null, 2) + "\n",
  );
}
