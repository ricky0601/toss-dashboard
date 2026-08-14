import { dashboardWidgets } from "@/lib/dashboard/widget-registry";
import type { DashboardData, WidgetId } from "@/lib/dashboard/types";
import { AllocationWidget } from "./allocation-widget";
import { NewsWidget, AlertsWidget } from "./news-alerts-widgets";
import { PerformanceChartWidget } from "./performance-chart-widget";
import { ReturnsWidget } from "./returns-widget";
import { TotalAssetsWidget } from "./total-assets-widget";
import { WatchlistWidget } from "./watchlist-widget";
import { WidgetLayoutEditor, type WidgetSlot } from "./widget-layout-editor";

const widgetLabels = {
  "total-assets": "총 자산",
  returns: "투자 수익",
  "performance-chart": "자산 흐름",
  watchlist: "관심 종목",
  allocation: "자산 구성",
  news: "오늘의 투자 소식",
  alerts: "알림",
} as const satisfies Record<WidgetId, string>;

type DashboardWidgetGridProps = {
  readonly data: DashboardData;
};

function renderWidget(id: WidgetId, data: DashboardData) {
  switch (id) {
    case "total-assets":
      return <TotalAssetsWidget overview={data.portfolioOverview} accountStatus={data.accountStatus} />;
    case "returns":
      return <ReturnsWidget summary={data.returnSummary} />;
    case "performance-chart":
      return <PerformanceChartWidget summary={data.chartSummary} periods={data.chartPeriods} />;
    case "watchlist":
      return <WatchlistWidget items={data.watchlist} />;
    case "allocation":
      return <AllocationWidget items={data.allocation} />;
    case "news":
      return <NewsWidget items={data.news} />;
    case "alerts":
      return <AlertsWidget items={data.alerts} />;
  }
}

export function DashboardWidgetGrid({ data }: DashboardWidgetGridProps) {
  const widgetSlots = dashboardWidgets.map((widget) => {
    return {
      id: widget.id,
      label: widgetLabels[widget.id],
      content: renderWidget(widget.id, data),
    };
  }) satisfies readonly WidgetSlot[];

  return (
    <WidgetLayoutEditor widgets={widgetSlots} />
  );
}
