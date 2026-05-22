import { useReportData } from "@entities/report/model/hooks";
import { Card } from "@shared/components/Card";

export function TreeshakingLeakWidget() {
  const reportData = useReportData();

  if (!reportData || reportData.treeshakingLeaks.length === 0) {
    return null;
  }

  return (
    <Card title="Tree-shaking 누수">
      <ul className="divide-y divide-gray-100">
        {reportData.treeshakingLeaks.map((leak) => (
          <li key={leak.packageName} className="py-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                {leak.packageName}
              </span>
              <span className="text-sm text-yellow-600">
                사용률 {(leak.usageRatio * 100).toFixed(1)}%
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              임포트: {leak.importedSymbols.join(", ")}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
