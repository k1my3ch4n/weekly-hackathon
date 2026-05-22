import { useReportData } from "@entities/report/model/hooks";
import { Card } from "@shared/components/Card";
import { Badge } from "@shared/components/Badge";

export function DockerRiskWidget() {
  const reportData = useReportData();

  if (!reportData || reportData.dockerRisks.length === 0) {
    return null;
  }

  return (
    <Card title="Docker 리스크">
      <ul className="divide-y divide-gray-100">
        {reportData.dockerRisks.map((risk) => (
          <li
            key={risk.packageName}
            className="flex items-center justify-between py-2.5"
          >
            <div className="flex items-center gap-2">
              <Badge
                label={risk.location === "devDependencies" ? "devDep" : "dep"}
                variant="warning"
              />
              <span className="text-sm font-medium text-gray-900">
                {risk.packageName}
              </span>
              <span className="text-xs text-gray-400">{risk.reason}</span>
            </div>
            <span className="text-sm font-medium text-red-600">
              {risk.sizeKB} KB
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
