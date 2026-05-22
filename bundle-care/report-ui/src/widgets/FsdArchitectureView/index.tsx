import { useIsFsdProject } from "@entities/report/model/hooks";
import { Badge } from "@shared/components/Badge";
import { LAYER_COLORS } from "./constants";
import { useFsdStats } from "./hooks";

export function FsdArchitectureView() {
  const isFsdProject = useIsFsdProject();
  const { fsdLayers, totalSize, sortedLayers, sharedRatio, isSharedBloated } =
    useFsdStats();

  if (!isFsdProject || fsdLayers.length === 0) {
    return (
      <section className="flex h-40 items-center justify-center">
        <p className="text-sm text-gray-400">FSD 아키텍처 데이터가 없습니다.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {isSharedBloated && (
        <aside className="flex items-center gap-2 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3">
          <span className="text-yellow-600">⚠</span>
          <p className="text-sm text-yellow-700">
            <strong>shared</strong> 레이어가 전체의{" "}
            <strong>{(sharedRatio * 100).toFixed(1)}%</strong>를 차지합니다.
            비대화 징후입니다.
          </p>
        </aside>
      )}

      <div className="space-y-2">
        {sortedLayers.map((layer) => {
          const ratio = totalSize > 0 ? layer.sizeKB / totalSize : 0;
          const colorClass = LAYER_COLORS[layer.layer];
          const isBloated = layer.layer === "shared" && isSharedBloated;

          return (
            <article key={layer.layer} className="flex items-center gap-3">
              <span className="w-16 text-right text-xs font-medium text-gray-500">
                {layer.layer}
              </span>
              <div className="flex flex-1 items-center gap-2">
                <div className="h-6 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all ${colorClass} ${isBloated ? "opacity-100" : "opacity-70"}`}
                    style={{ width: `${(ratio * 100).toFixed(1)}%` }}
                  />
                </div>
                <span className="w-16 text-right text-xs text-gray-500">
                  {layer.sizeKB.toFixed(1)} KB
                </span>
                <span className="w-10 text-right text-xs text-gray-400">
                  {(ratio * 100).toFixed(0)}%
                </span>
                {isBloated && <Badge label="비대화" variant="warning" />}
              </div>
            </article>
          );
        })}
      </div>

      <footer className="border-t border-gray-100 pt-3 text-right text-xs text-gray-400">
        총 {totalSize.toFixed(1)} KB ·{" "}
        {fsdLayers.reduce((sum, layer) => sum + layer.fileCount, 0)} 파일
      </footer>
    </section>
  );
}
