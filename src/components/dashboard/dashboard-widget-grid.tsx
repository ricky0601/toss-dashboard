import type { ComponentType } from "react";
import { dashboardWidgets } from "@/lib/dashboard/widget-registry";
import type { WidgetId, WidgetSpan } from "@/lib/dashboard/types";
import { AllocationWidget } from "./allocation-widget";
import { NewsWidget, AlertsWidget } from "./news-alerts-widgets";
import { PerformanceChartWidget } from "./performance-chart-widget";
import { ReturnsWidget } from "./returns-widget";
import { TotalAssetsWidget } from "./total-assets-widget";
import { WatchlistWidget } from "./watchlist-widget";

const widgetComponents = {
  "total-assets": TotalAssetsWidget,
  returns: ReturnsWidget,
  "performance-chart": PerformanceChartWidget,
  watchlist: WatchlistWidget,
  allocation: AllocationWidget,
  news: NewsWidget,
  alerts: AlertsWidget,
} satisfies Record<WidgetId, ComponentType>;

function spanClass(span: WidgetSpan): string {
  switch (span) {
    case "full":
      return "md:col-span-12";
    case "third":
      return "md:col-span-4";
    case "two-thirds":
      return "md:col-span-8";
    case "five":
      return "md:col-span-5";
    case "seven":
      return "md:col-span-7";
  }
}

export function DashboardWidgetGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12" aria-label="투자 위젯">
      {dashboardWidgets.map((widget) => {
        const WidgetComponent = widgetComponents[widget.id];

        return (
          <div key={widget.id} className={spanClass(widget.span)}>
            <WidgetComponent />
          </div>
        );
      })}
    </div>
  );
}
