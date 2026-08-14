import type { WidgetDefinition } from "./types";

export const dashboardWidgets = [
  { id: "total-assets", span: "full" },
  { id: "returns", span: "third" },
  { id: "performance-chart", span: "two-thirds" },
  { id: "watchlist", span: "five" },
  { id: "allocation", span: "seven" },
  { id: "news", span: "two-thirds" },
  { id: "alerts", span: "third" },
] as const satisfies readonly WidgetDefinition[];
