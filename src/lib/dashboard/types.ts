export type PerformanceDirection = "gain" | "loss" | "neutral";

export type MarketItem = {
  readonly name: string;
  readonly symbol: string;
  readonly price: string;
  readonly change: string;
  readonly direction: PerformanceDirection;
};

export type PortfolioOverview = {
  readonly totalAssets: string;
  readonly dailyChange: string;
  readonly dailyRate: string;
  readonly updatedAt: string;
};

export type ReturnSummary = {
  readonly totalReturn: string;
  readonly returnRate: string;
  readonly investedPrincipal: string;
};

export type ChartSummary = {
  readonly period: string;
  readonly change: string;
  readonly startLabel: string;
  readonly middleLabel: string;
  readonly endLabel: string;
  readonly linePath: string;
  readonly areaPath: string;
};

export type InvestmentAccountStatus =
  | {
      readonly kind: "api";
      readonly accountCount: number;
      readonly primaryAccountType: string;
    }
  | {
      readonly kind: "mock";
      readonly reason: "missing-config" | "auth-failed" | "api-unavailable" | "invalid-response";
    };

export type DashboardData = {
  readonly portfolioOverview: PortfolioOverview;
  readonly returnSummary: ReturnSummary;
  readonly chartSummary: ChartSummary;
  readonly chartPeriods: readonly string[];
  readonly watchlist: readonly MarketItem[];
  readonly allocation: readonly AllocationItem[];
  readonly news: readonly NewsItem[];
  readonly alerts: readonly AlertItem[];
  readonly accountStatus: InvestmentAccountStatus;
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

export type WidgetLayoutItem = {
  readonly id: WidgetId;
  readonly visible: boolean;
  readonly order: number;
  readonly span: WidgetSpan;
};

export type StoredWidgetLayoutV1 = {
  readonly version: 1;
  readonly items: readonly WidgetLayoutItem[];
};

export type WidgetMoveDirection = "up" | "down";
