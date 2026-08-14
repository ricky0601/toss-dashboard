import type { ComponentType } from "react";
import { dashboardWidgets } from "@/lib/dashboard/widget-registry";
import type { WidgetId } from "@/lib/dashboard/types";
import { AllocationWidget } from "./allocation-widget";
import { NewsWidget, AlertsWidget } from "./news-alerts-widgets";
import { PerformanceChartWidget } from "./performance-chart-widget";
import { ReturnsWidget } from "./returns-widget";
import { TotalAssetsWidget } from "./total-assets-widget";
import { WatchlistWidget } from "./watchlist-widget";
import { WidgetLayoutEditor, type WidgetSlot } from "./widget-layout-editor";

const widgetComponents = {
  "total-assets": TotalAssetsWidget,
  returns: ReturnsWidget,
  "performance-chart": PerformanceChartWidget,
  watchlist: WatchlistWidget,
  allocation: AllocationWidget,
  news: NewsWidget,
  alerts: AlertsWidget,
} satisfies Record<WidgetId, ComponentType>;

const widgetLabels = {
  "total-assets": "총 자산",
  returns: "투자 수익",
  "performance-chart": "자산 흐름",
  watchlist: "관심 종목",
  allocation: "자산 구성",
  news: "오늘의 투자 소식",
  alerts: "알림",
} as const satisfies Record<WidgetId, string>;

export function DashboardWidgetGrid() {
  const widgetSlots = dashboardWidgets.map((widget) => {
    const WidgetComponent = widgetComponents[widget.id];

    return {
      id: widget.id,
      label: widgetLabels[widget.id],
      content: <WidgetComponent />,
    };
  }) satisfies readonly WidgetSlot[];

  return (
    <WidgetLayoutEditor widgets={widgetSlots} />
  );
}
