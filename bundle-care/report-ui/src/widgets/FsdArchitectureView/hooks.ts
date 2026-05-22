import { useMemo } from "react";
import { useFsdLayers } from "@entities/report/model/hooks";
import type { FsdLayerStat } from "@entities/report/model/types";
import { LAYER_ORDER, SHARED_BLOAT_THRESHOLD } from "./constants";

export function useFsdStats() {
  const fsdLayers = useFsdLayers();

  return useMemo(() => {
    const totalSize = fsdLayers.reduce((sum, layer) => sum + layer.sizeKB, 0);

    const sortedLayers = LAYER_ORDER.map((layerName) =>
      fsdLayers.find((layer) => layer.layer === layerName),
    ).filter((layer): layer is FsdLayerStat => layer !== undefined);

    const sharedLayer = fsdLayers.find((layer) => layer.layer === "shared");

    const sharedRatio =
      sharedLayer && totalSize > 0 ? sharedLayer.sizeKB / totalSize : 0;

    const isSharedBloated = sharedRatio > SHARED_BLOAT_THRESHOLD;

    return { fsdLayers, totalSize, sortedLayers, sharedRatio, isSharedBloated };
  }, [fsdLayers]);
}
