import type { ViewMode } from "@entities/report/model/store";

export const VIEW_OPTIONS: { label: string; value: ViewMode }[] = [
  { label: "번들 트리맵", value: "default" },
  { label: "FSD 아키텍처", value: "fsd" },
];
