import type { FsdLayerStat } from "@entities/report/model/types";

export const LAYER_ORDER: FsdLayerStat["layer"][] = [
  "app", "pages", "widgets", "features", "entities", "shared",
];

export const LAYER_COLORS: Record<FsdLayerStat["layer"], string> = {
  app: "bg-purple-500",
  pages: "bg-blue-500",
  widgets: "bg-indigo-500",
  features: "bg-teal-500",
  entities: "bg-green-500",
  shared: "bg-gray-500",
};

export const SHARED_BLOAT_THRESHOLD = 0.4;
