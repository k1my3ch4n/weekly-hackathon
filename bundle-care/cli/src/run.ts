import { loadConfig } from "./config.js";
import { analyze, type AnalysisResult } from "./analyzer.js";
import { buildReport } from "./htmlBuilder.js";
import { logger, createSpinner } from "./utils/logger.js";
import { type CliOptions } from "./types.js";

export async function run(options: CliOptions): Promise<void> {
  logger.blank();
  logger.title("⚕  BndlCare — 번들 분석 시작");
  logger.blank();

  const config = loadConfig(options.config);

  const spinner = createSpinner("프로젝트 분석 중...");
  spinner.start();

  const result: AnalysisResult = analyze(config);

  spinner.succeed("분석 완료");

  logger.blank();
  logger.info(`총 번들 크기: ${result.totalBundleSizeKB.toFixed(1)} KB`);
  logger.info(`Docker 리스크: ${result.dockerRisks.length}개`);
  logger.info(`Tree-shaking 누수: ${result.treeshakingLeaks.length}개`);

  if (!options.ai || !config.geminiApiKey) {
    logger.warn("AI 처방을 건너뜁니다. (--no-ai 또는 geminiApiKey 미설정)");
  } else {
    // TODO: Phase 3 — aiServiceClient.ts 연동
  }

  const reportPath = await buildReport(result, options.open);
  logger.blank();
  logger.success(`bndl-report.html 생성 완료: ${reportPath}`);
}
