export interface BndlCareConfig {
  maxBundleSizeKB?: number;
  geminiApiKey?: string;
  failOnDockerRisk?: boolean;
  statsJsonPath?: string;
  packageJsonPath?: string;
}

export interface CliOptions {
  config?: string;
  ai: boolean;
  open: boolean;
}

export const DEFAULT_CONFIG: Required<BndlCareConfig> = {
  maxBundleSizeKB: 500,
  geminiApiKey: "",
  failOnDockerRisk: false,
  statsJsonPath: "stats.json",
  packageJsonPath: "package.json",
};

// 분석 결과 타입 (CLI → report-ui 간 JSON 계약)

export interface ModuleInfo {
  name: string;
  size: number;
}

export interface ChunkInfo {
  name: string;
  size: number;
  modules: ModuleInfo[];
}

export interface DockerRisk {
  packageName: string;
  reason: string;
  sizeKB: number;
  location: "devDependencies" | "dependencies";
}

export interface TreeshakingLeak {
  packageName: string;
  importedSymbols: string[];
  totalPackageSizeKB: number;
  usageRatio: number;
}

export interface AlternativeLibrary {
  name: string;
  sizeKB: number;
  description: string;
}

export interface AiPrescription {
  targetPackage: string;
  alternatives: AlternativeLibrary[];
  vanillaSnippet: string;
  reasoning: string;
}

export interface FsdLayerStat {
  layer: "app" | "pages" | "widgets" | "features" | "entities" | "shared";
  sizeKB: number;
  fileCount: number;
}

export interface BndlReportData {
  generatedAt: string;
  projectName: string;
  totalBundleSizeKB: number;
  chunks: ChunkInfo[];
  dockerRisks: DockerRisk[];
  treeshakingLeaks: TreeshakingLeak[];
  aiPrescriptions: AiPrescription[];
  fsdLayers?: FsdLayerStat[];
  isFsdProject: boolean;
}
