import {
  useReportData,
  useSelectedChunkName,
  useSetSelectedChunkName,
} from "@entities/report/model/hooks";
import { useTreemap } from "./hooks";

interface TreemapProps {
  width?: number;
  height?: number;
}

export function BundleTreemap({ width = 800, height = 480 }: TreemapProps) {
  const reportData = useReportData();
  const selectedChunkName = useSelectedChunkName();
  const setSelectedChunkName = useSetSelectedChunkName();
  const containerRef = useTreemap(width, height);

  if (!reportData) {
    return (
      <section className="flex h-64 items-center justify-center rounded-lg border border-dashed border-gray-300">
        <p className="text-sm text-gray-400">데이터가 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedChunkName(null)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            selectedChunkName === null
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          전체
        </button>
        {reportData.chunks.map((chunk) => (
          <button
            key={chunk.name}
            onClick={() => setSelectedChunkName(chunk.name)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedChunkName === chunk.name
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {chunk.name}
          </button>
        ))}
      </div>
      <div ref={containerRef} className="overflow-hidden rounded-lg" />
    </section>
  );
}
