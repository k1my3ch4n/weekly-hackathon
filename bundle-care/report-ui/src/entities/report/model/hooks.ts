import { useMemo } from "react";
import { useReportStore } from "./store";

export const useReportData = () => useReportStore((state) => state.reportData);

export const useViewMode = () => useReportStore((state) => state.viewMode);

export const useSetViewMode = () => useReportStore((state) => state.setViewMode);

export const useSelectedChunkName = () => useReportStore((state) => state.selectedChunkName);

export const useSetSelectedChunkName = () => useReportStore((state) => state.setSelectedChunkName);

export const useIsFsdProject = () =>
  useReportStore((state) => state.reportData?.isFsdProject ?? false);

export const useFsdLayers = () => {
  const fsdLayers = useReportStore((state) => state.reportData?.fsdLayers);
  return useMemo(() => fsdLayers ?? [], [fsdLayers]);
};

export const useAiPrescriptions = () =>
  useReportStore((state) => state.reportData?.aiPrescriptions ?? []);

export const useSelectedModules = () => {
  const reportData = useReportStore((state) => state.reportData);
  const selectedChunkName = useReportStore((state) => state.selectedChunkName);

  return useMemo(() => {
    if (!reportData) { return []; }
    const selectedChunk = reportData.chunks.find((chunk) => chunk.name === selectedChunkName);
    return selectedChunk ? selectedChunk.modules : reportData.chunks.flatMap((chunk) => chunk.modules);
  }, [reportData, selectedChunkName]);
};
