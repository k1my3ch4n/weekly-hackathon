import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import open from "open";
import type { AnalysisResult } from "./analyzer.js";
import type { BndlReportData } from "./types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = resolve(__dirname, "..", "assets", "template.html");
const DATA_SLOT_REGEX = /\/\* __BNDL_DATA__ \*\/[\s\S]*?\/\* __BNDL_DATA_END__ \*\//;
const OUTPUT_FILENAME = "bndl-report.html";

export async function buildReport(
  result: AnalysisResult,
  shouldOpen: boolean,
): Promise<string> {
  const template = readFileSync(TEMPLATE_PATH, "utf-8");

  const reportData: BndlReportData = {
    generatedAt: new Date().toISOString(),
    projectName: result.projectName,
    totalBundleSizeKB: result.totalBundleSizeKB,
    chunks: result.chunks,
    dockerRisks: result.dockerRisks,
    treeshakingLeaks: result.treeshakingLeaks,
    aiPrescriptions: [],
    isFsdProject: result.isFsdProject,
    fsdLayers: result.fsdLayers,
  };

  const html = template.replace(DATA_SLOT_REGEX, JSON.stringify(reportData));
  const outputPath = resolve(process.cwd(), OUTPUT_FILENAME);
  writeFileSync(outputPath, html, "utf-8");

  if (shouldOpen) {
    await open(outputPath);
  }

  return outputPath;
}
