export type PerformanceDirection = "gain" | "loss" | "neutral";

export type MarketItem = {
  readonly name: string;
  readonly symbol: string;
  readonly price: string;
  readonly change: string;
  readonly direction: PerformanceDirection;
};

export type AllocationItem = {
  readonly label: string;
  readonly value: string;
  readonly percentage: number;
  readonly tone: "accent" | "gain" | "warning" | "neutral";
};

export type NewsItem = {
  readonly category: string;
  readonly headline: string;
  readonly publishedAt: string;
};

export type AlertItem = {
  readonly label: string;
  readonly detail: string;
  readonly status: "scheduled" | "watching";
};

export type WidgetId =
  | "total-assets"
  | "returns"
  | "performance-chart"
  | "watchlist"
  | "allocation"
  | "news"
  | "alerts";

export type WidgetSpan = "full" | "third" | "two-thirds" | "five" | "seven";

export type WidgetDefinition = {
  readonly id: WidgetId;
  readonly span: WidgetSpan;
};
