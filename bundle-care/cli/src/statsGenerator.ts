import {
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { resolve, basename, extname } from "node:path";
import { spawnSync } from "node:child_process";

export type Bundler = "webpack" | "vite" | "next" | "unknown";

interface PackageJsonShape {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

interface NormalizedStats {
  chunks: Array<{
    id: number;
    names: string[];
    size: number;
    modules: Array<{ id: number; name: string; size: number }>;
  }>;
  modules: Array<{ id: number; name: string; size: number; chunks: number[] }>;
}

export function detectBundler(packageJsonPath: string): Bundler {
  if (!existsSync(packageJsonPath)) {
    return "unknown";
  }

  const packageJson = JSON.parse(
    readFileSync(packageJsonPath, "utf-8"),
  ) as PackageJsonShape;
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  // 우선순위: next > vite > webpack
  if ("next" in allDeps) {
    return "next";
  }
  if ("vite" in allDeps) {
    return "vite";
  }
  if ("webpack" in allDeps || "webpack-cli" in allDeps) {
    return "webpack";
  }
  return "unknown";
}

function runBuildCommand(cmd: string, args: string[]): void {
  const result = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  if (result.status !== 0) {
    throw new Error(
      `빌드 실패 (exit ${result.status ?? "unknown"}): ${cmd} ${args.join(" ")}`,
    );
  }
}

function scanJsChunks(
  dir: string,
  cwd: string,
): NormalizedStats["chunks"] {
  if (!existsSync(dir)) {
    return [];
  }

  const chunks: NormalizedStats["chunks"] = [];
  let id = 0;

  function scan(currentDir: string): void {
    for (const entry of readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = resolve(currentDir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (extname(entry.name) === ".js") {
        const size = statSync(fullPath).size;
        const relativeName = fullPath
          .replace(cwd + "/", "")
          .replace(cwd + "\\", "")
          .replace(/\\/g, "/");
        chunks.push({
          id: id++,
          names: [basename(entry.name, ".js")],
          size,
          modules: [{ id, name: relativeName, size }],
        });
      }
    }
  }

  scan(dir);
  return chunks;
}

function generateWebpackStats(statsPath: string): void {
  // webpack --json 은 JSON 을 stdout 으로 출력, 나머지는 stderr
  const result = spawnSync(
    "npx",
    ["webpack", "--json", "--no-stats-error-details"],
    { encoding: "utf-8", shell: true },
  );

  const raw = result.stdout ?? "";

  // stdout 에 JSON 이 시작되는 위치부터 추출 (progress bar 등 앞쪽 노이즈 제거)
  const jsonStart = raw.indexOf("{");
  if (jsonStart === -1) {
    throw new Error(
      `webpack --json 출력에서 JSON을 찾을 수 없습니다.\n${result.stderr?.slice(0, 300) ?? ""}`,
    );
  }

  const jsonStr = raw.slice(jsonStart);
  JSON.parse(jsonStr); // 파싱 가능한지 검증
  writeFileSync(statsPath, jsonStr);
}

function generateViteStats(statsPath: string): void {
  const distDir = resolve(process.cwd(), "dist");

  if (!existsSync(distDir)) {
    runBuildCommand("npx", ["vite", "build"]);
  }

  const assetsDir = resolve(distDir, "assets");
  const scanDir = existsSync(assetsDir) ? assetsDir : distDir;
  const chunks = scanJsChunks(scanDir, process.cwd());

  const stats: NormalizedStats = { chunks, modules: [] };
  writeFileSync(statsPath, JSON.stringify(stats, null, 2));
}

function generateNextStats(statsPath: string): void {
  const nextDir = resolve(process.cwd(), ".next");

  if (!existsSync(nextDir)) {
    runBuildCommand("npx", ["next", "build"]);
  }

  // .next/static/chunks/ 하위 JS 파일 전체 스캔
  const chunksDir = resolve(nextDir, "static", "chunks");
  const chunks = scanJsChunks(chunksDir, process.cwd());

  const stats: NormalizedStats = { chunks, modules: [] };
  writeFileSync(statsPath, JSON.stringify(stats, null, 2));
}

export function ensureStats(
  statsPath: string,
  packageJsonPath: string,
  onBuildStart?: (bundler: Bundler) => void,
): { generated: boolean; bundler: Bundler } {
  const bundler = detectBundler(packageJsonPath);

  if (existsSync(statsPath)) {
    return { generated: false, bundler };
  }

  if (bundler === "unknown") {
    throw new Error(
      "지원하는 번들러를 찾을 수 없습니다. package.json에 webpack / vite / next 중 하나가 있어야 합니다.",
    );
  }

  onBuildStart?.(bundler);

  switch (bundler) {
    case "webpack":
      generateWebpackStats(statsPath);
      break;
    case "vite":
      generateViteStats(statsPath);
      break;
    case "next":
      generateNextStats(statsPath);
      break;
  }

  return { generated: true, bundler };
}
