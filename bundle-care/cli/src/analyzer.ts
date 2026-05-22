import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import type {
  BndlCareConfig,
  ChunkInfo,
  DockerRisk,
  FsdLayerStat,
  TreeshakingLeak,
} from "./types.js";

// webpack stats.json 내부 타입
interface StatsModule {
  id?: string | number;
  name: string;
  size: number;
  chunks?: (string | number)[];
  modules?: StatsModule[];
}

interface StatsChunk {
  id: string | number;
  names: string[];
  size: number;
  modules?: StatsModule[];
}

interface WebpackStats {
  chunks?: StatsChunk[];
  modules?: StatsModule[];
}

interface PackageJsonShape {
  name?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

// dependencies 에 있으면 Docker 이미지 비대화 위험이 되는 빌드/테스트 도구 목록
const DOCKER_RISK_PACKAGES: Array<{
  pattern: string;
  reason: string;
  estimatedSizeKB: number;
}> = [
  { pattern: "webpack", reason: "빌드 도구 (프로덕션 이미지에 불필요)", estimatedSizeKB: 2000 },
  { pattern: "webpack-cli", reason: "빌드 도구 CLI (프로덕션 이미지에 불필요)", estimatedSizeKB: 500 },
  { pattern: "webpack-dev-server", reason: "개발 서버 (프로덕션 이미지에 불필요)", estimatedSizeKB: 1000 },
  { pattern: "@babel/core", reason: "트랜스파일러 (프로덕션 이미지에 불필요)", estimatedSizeKB: 1500 },
  { pattern: "babel-core", reason: "트랜스파일러 (프로덕션 이미지에 불필요)", estimatedSizeKB: 1500 },
  { pattern: "typescript", reason: "타입 체커 (프로덕션 이미지에 불필요)", estimatedSizeKB: 20000 },
  { pattern: "ts-node", reason: "TypeScript 개발 런타임 (프로덕션 이미지에 불필요)", estimatedSizeKB: 5000 },
  { pattern: "jest", reason: "테스트 프레임워크 (프로덕션 이미지에 불필요)", estimatedSizeKB: 5000 },
  { pattern: "@jest/core", reason: "테스트 프레임워크 (프로덕션 이미지에 불필요)", estimatedSizeKB: 3000 },
  { pattern: "vitest", reason: "테스트 도구 (프로덕션 이미지에 불필요)", estimatedSizeKB: 2000 },
  { pattern: "eslint", reason: "린터 (프로덕션 이미지에 불필요)", estimatedSizeKB: 3000 },
  { pattern: "prettier", reason: "포매터 (프로덕션 이미지에 불필요)", estimatedSizeKB: 1000 },
  { pattern: "nodemon", reason: "개발 서버 감시 도구 (프로덕션 이미지에 불필요)", estimatedSizeKB: 100 },
  { pattern: "vite", reason: "빌드 도구 (프로덕션 이미지에 불필요)", estimatedSizeKB: 3000 },
  { pattern: "rollup", reason: "번들러 (프로덕션 이미지에 불필요)", estimatedSizeKB: 1000 },
  { pattern: "esbuild", reason: "번들러 (프로덕션 이미지에 불필요)", estimatedSizeKB: 500 },
];

// Tree-shaking 누수 탐지 대상 패키지
const TREESHAKING_TARGETS: Record<
  string,
  { sizeKB: number; fullBundleFileNames: string[] }
> = {
  lodash: { sizeKB: 71, fullBundleFileNames: ["lodash.js", "lodash.min.js"] },
  moment: { sizeKB: 67, fullBundleFileNames: ["moment.js"] },
  rxjs: { sizeKB: 212, fullBundleFileNames: ["index.js", "Rx.js"] },
  antd: { sizeKB: 2000, fullBundleFileNames: ["index.js"] },
  "@mui/material": { sizeKB: 1500, fullBundleFileNames: ["index.js"] },
  ramda: { sizeKB: 50, fullBundleFileNames: ["ramda.js", "index.js"] },
  underscore: { sizeKB: 18, fullBundleFileNames: ["underscore.js"] },
};

const FSD_LAYERS = [
  "app",
  "pages",
  "widgets",
  "features",
  "entities",
  "shared",
] as const;

function flattenModules(modules: StatsModule[]): StatsModule[] {
  const result: StatsModule[] = [];
  for (const module of modules) {
    result.push(module);
    if (module.modules) {
      result.push(...flattenModules(module.modules));
    }
  }
  return result;
}

function parseChunks(stats: WebpackStats): ChunkInfo[] {
  if (!stats.chunks) {
    return [];
  }

  return stats.chunks.map((chunk) => {
    const modules = flattenModules(chunk.modules ?? []);
    return {
      name: chunk.names[0] ?? String(chunk.id),
      size: chunk.size,
      modules: modules.map((module) => ({
        name: module.name,
        size: module.size,
      })),
    };
  });
}

function scanDockerRisks(packageJson: PackageJsonShape): DockerRisk[] {
  const risks: DockerRisk[] = [];
  const prodDeps = Object.keys(packageJson.dependencies ?? {});

  for (const riskDef of DOCKER_RISK_PACKAGES) {
    const matched = prodDeps.find(
      (dep) => dep === riskDef.pattern || dep.startsWith(`${riskDef.pattern}/`),
    );

    if (matched) {
      risks.push({
        packageName: matched,
        reason: riskDef.reason,
        sizeKB: riskDef.estimatedSizeKB,
        location: "dependencies",
      });
    }
  }

  return risks;
}

function detectTreeshakingLeaks(allModules: StatsModule[]): TreeshakingLeak[] {
  const leaks: TreeshakingLeak[] = [];

  for (const [packageName, target] of Object.entries(TREESHAKING_TARGETS)) {
    const packageModules = allModules.filter((module) => {
      const normalized = module.name.replace(/\\/g, "/");
      return normalized.includes(`/node_modules/${packageName}/`);
    });

    if (packageModules.length === 0) {
      continue;
    }

    const importedSymbols = packageModules.map((module) => {
      const normalized = module.name.replace(/\\/g, "/");
      const match = normalized.match(
        new RegExp(`/node_modules/${packageName.replace("/", "\\/")}/(.*)`),
      );
      return match ? match[1] : module.name;
    });

    const hasFullBundle = target.fullBundleFileNames.some((fileName) =>
      importedSymbols.some((symbol) => symbol.endsWith(fileName)),
    );

    const totalImportedSizeKB =
      packageModules.reduce((sum, module) => sum + module.size, 0) / 1024;
    const usageRatio = hasFullBundle
      ? 1.0
      : Math.min(totalImportedSizeKB / target.sizeKB, 1.0);

    // 전체 번들 포함이거나 패키지의 30% 이상 임포트된 경우만 누수로 판정
    if (hasFullBundle || usageRatio >= 0.3) {
      leaks.push({
        packageName,
        importedSymbols,
        totalPackageSizeKB: target.sizeKB,
        usageRatio: Math.round(usageRatio * 1000) / 1000,
      });
    }
  }

  return leaks;
}

function detectFsdLayers(allModules: StatsModule[]): {
  isFsdProject: boolean;
  fsdLayers: FsdLayerStat[];
} {
  const layerMap = new Map<string, { sizeKB: number; fileCount: number }>();
  let fsdModuleCount = 0;

  for (const module of allModules) {
    const normalized = module.name.replace(/\\/g, "/");
    if (normalized.includes("/node_modules/")) {
      continue;
    }

    for (const layer of FSD_LAYERS) {
      if (new RegExp(`/${layer}/`).test(normalized)) {
        fsdModuleCount++;
        const existing = layerMap.get(layer) ?? { sizeKB: 0, fileCount: 0 };
        layerMap.set(layer, {
          sizeKB: existing.sizeKB + module.size / 1024,
          fileCount: existing.fileCount + 1,
        });
        break;
      }
    }
  }

  // FSD 레이어 모듈이 3개 이상이어야 FSD 프로젝트로 판정
  const isFsdProject = fsdModuleCount >= 3;
  const fsdLayers: FsdLayerStat[] = Array.from(layerMap.entries()).map(
    ([layer, stats]) => ({
      layer: layer as FsdLayerStat["layer"],
      sizeKB: Math.round(stats.sizeKB * 100) / 100,
      fileCount: stats.fileCount,
    }),
  );

  return { isFsdProject, fsdLayers };
}

export interface AnalysisResult {
  projectName: string;
  totalBundleSizeKB: number;
  chunks: ChunkInfo[];
  dockerRisks: DockerRisk[];
  treeshakingLeaks: TreeshakingLeak[];
  isFsdProject: boolean;
  fsdLayers?: FsdLayerStat[];
}

export function analyze(config: Required<BndlCareConfig>): AnalysisResult {
  const statsPath = resolve(process.cwd(), config.statsJsonPath);
  const packageJsonPath = resolve(process.cwd(), config.packageJsonPath);

  if (!existsSync(statsPath)) {
    throw new Error(`stats.json 파일을 찾을 수 없습니다: ${statsPath}`);
  }

  if (!existsSync(packageJsonPath)) {
    throw new Error(`package.json 파일을 찾을 수 없습니다: ${packageJsonPath}`);
  }

  const stats = JSON.parse(readFileSync(statsPath, "utf-8")) as WebpackStats;
  const packageJson = JSON.parse(
    readFileSync(packageJsonPath, "utf-8"),
  ) as PackageJsonShape;

  const chunks = parseChunks(stats);
  const totalBundleSizeKB =
    chunks.reduce((sum, chunk) => sum + chunk.size, 0) / 1024;

  // chunks 에 modules 가 없을 경우 top-level modules 배열로 폴백
  const allModules = flattenModules(
    stats.modules ??
      (stats.chunks ?? []).flatMap((chunk) => chunk.modules ?? []),
  );

  const dockerRisks = scanDockerRisks(packageJson);
  const treeshakingLeaks = detectTreeshakingLeaks(allModules);
  const { isFsdProject, fsdLayers } = detectFsdLayers(allModules);

  // Fail-Safe: 번들 사이즈 초과
  if (config.maxBundleSizeKB > 0 && totalBundleSizeKB > config.maxBundleSizeKB) {
    console.error(
      `[BndlCare] ❌ 번들 사이즈 초과: ${totalBundleSizeKB.toFixed(1)} KB > ${config.maxBundleSizeKB} KB`,
    );
    process.exit(1);
  }

  // Fail-Safe: Docker 리스크 탐지
  if (config.failOnDockerRisk && dockerRisks.length > 0) {
    const names = dockerRisks.map((risk) => risk.packageName).join(", ");
    console.error(`[BndlCare] ❌ Docker 리스크 패키지 탐지: ${names}`);
    process.exit(1);
  }

  return {
    projectName: packageJson.name ?? "unknown",
    totalBundleSizeKB: Math.round(totalBundleSizeKB * 100) / 100,
    chunks,
    dockerRisks,
    treeshakingLeaks,
    isFsdProject,
    fsdLayers: isFsdProject ? fsdLayers : undefined,
  };
}
