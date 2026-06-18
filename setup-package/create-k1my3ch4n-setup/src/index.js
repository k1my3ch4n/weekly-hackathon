import * as p from "@clack/prompts";
import { execSync } from "child_process";
import path from "path";
import { getProjectOptions } from "./prompts.js";
import { generate, getInstallCommand } from "./generator.js";

export async function run() {
  const projectNameArg = process.argv[2];

  const context = await getProjectOptions(projectNameArg);

  const spinner = p.spinner();
  spinner.start("프로젝트 생성 중...");

  const targetDir = await generate(context);

  spinner.stop("프로젝트 생성 완료");

  spinner.start(`${context.packageManager} install 중...`);

  execSync(getInstallCommand(context.packageManager), {
    cwd: targetDir,
    stdio: "ignore",
  });

  spinner.stop("설치 완료");

  p.outro(
    `완료! 다음 명령어로 시작하세요:\n\n  cd ${context.projectName}\n  ${context.packageManager} ${context.packageManager === "npm" ? "run " : ""}dev`,
  );
}
