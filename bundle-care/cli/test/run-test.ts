import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { analyze } from "../src/analyzer.js";
import { DEFAULT_CONFIG } from "../src/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = resolve(__dirname, "fixtures");

function assert(condition: boolean, label: string): void {
  if (condition) {
    console.log(`  ✅ ${label}`);
  } else {
    console.error(`  ❌ ${label}`);
    process.exit(1);
  }
}

function runTest(): void {
  console.log("=== BndlCare Analyzer — 단위 테스트 ===\n");

  const config = {
    ...DEFAULT_CONFIG,
    statsJsonPath: resolve(FIXTURES_DIR, "stats.json"),
    packageJsonPath: resolve(FIXTURES_DIR, "package.json"),
    maxBundleSizeKB: 0, // Fail-Safe 비활성화 (절대값 0이면 체크 안 함)
    failOnDockerRisk: false,
  };

  const result = analyze(config);

  // ── 결과 요약 출력 ─────────────────────────────────────────
  console.log("[분석 결과]");
  console.log(`  프로젝트명     : ${result.projectName}`);
  console.log(`  총 번들 크기   : ${result.totalBundleSizeKB.toFixed(1)} KB`);
  console.log(`  청크 수        : ${result.chunks.length}`);
  console.log(`  Docker 리스크  : ${result.dockerRisks.length}개`);
  console.log(`  Tree-shaking 누수 : ${result.treeshakingLeaks.length}개`);
  console.log(`  FSD 프로젝트   : ${result.isFsdProject}`);

  if (result.dockerRisks.length > 0) {
    console.log("\n[Docker 리스크 목록]");
    result.dockerRisks.forEach((risk) => {
      console.log(`  - ${risk.packageName} (${risk.location}) : ${risk.reason}`);
    });
  }

  if (result.treeshakingLeaks.length > 0) {
    console.log("\n[Tree-shaking 누수 목록]");
    result.treeshakingLeaks.forEach((leak) => {
      console.log(
        `  - ${leak.packageName}: 사용률 ${(leak.usageRatio * 100).toFixed(1)}% (${leak.totalPackageSizeKB} KB 기준)`,
      );
    });
  }

  if (result.isFsdProject && result.fsdLayers) {
    console.log("\n[FSD 레이어]");
    result.fsdLayers.forEach((layer) => {
      console.log(`  - ${layer.layer}: ${layer.sizeKB.toFixed(1)} KB (${layer.fileCount}파일)`);
    });
  }

  // ── 검증 ──────────────────────────────────────────────────
  console.log("\n[검증]");

  // 기본 파싱
  assert(result.projectName === "test-project", "프로젝트명 파싱 정상");
  assert(result.chunks.length === 2, "청크 2개 파싱 (main + vendor)");
  assert(result.totalBundleSizeKB > 800, "총 번들 크기 800 KB 이상");

  // Docker 리스크
  const dockerNames = result.dockerRisks.map((risk) => risk.packageName);
  assert(dockerNames.includes("webpack"), "Docker 리스크: webpack 탐지");
  assert(dockerNames.includes("typescript"), "Docker 리스크: typescript 탐지");
  assert(
    result.dockerRisks.every((risk) => risk.location === "dependencies"),
    "Docker 리스크 위치가 모두 dependencies",
  );

  // Tree-shaking 누수
  const leakNames = result.treeshakingLeaks.map((leak) => leak.packageName);
  assert(leakNames.includes("lodash"), "Tree-shaking 누수: lodash 탐지");
  assert(leakNames.includes("moment"), "Tree-shaking 누수: moment 탐지");
  const lodashLeak = result.treeshakingLeaks.find((leak) => leak.packageName === "lodash");
  assert(
    (lodashLeak?.usageRatio ?? 0) >= 0.9,
    "lodash 전체 번들 포함 → usageRatio 0.9 이상",
  );

  // FSD 감지
  assert(result.isFsdProject, "FSD 프로젝트 감지");
  assert((result.fsdLayers?.length ?? 0) > 0, "FSD 레이어 배열 존재");
  const layerNames = result.fsdLayers?.map((layer) => layer.layer) ?? [];
  assert(layerNames.includes("features"), "FSD: features 레이어 감지");
  assert(layerNames.includes("entities"), "FSD: entities 레이어 감지");
  assert(layerNames.includes("shared"), "FSD: shared 레이어 감지");

  console.log("\n✅ 모든 테스트 통과");
}

// ── Fail-Safe 별도 테스트 ─────────────────────────────────────
function runFailSafeTest(): void {
  console.log("\n=== Fail-Safe 동작 확인 (수동 확인용) ===\n");

  console.log("아래 명령어로 각 Fail-Safe 시나리오를 테스트하세요:\n");
  console.log(
    "  [번들 사이즈 초과 → process.exit(1)]",
  );
  console.log(
    "  maxBundleSizeKB: 100 으로 설정 후 실행하면 exit(1) 발생\n",
  );
  console.log(
    "  [Docker 리스크 탐지 → process.exit(1)]",
  );
  console.log(
    "  failOnDockerRisk: true 로 설정 후 실행하면 exit(1) 발생",
  );
}

runTest();
runFailSafeTest();
