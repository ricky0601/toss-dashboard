import type {
  AlertItem,
  AllocationItem,
  ChartSummary,
  DashboardData,
  InvestmentAccountStatus,
  MarketItem,
  NewsItem,
  PortfolioOverview,
  ReturnSummary,
} from "./types";

export const portfolioOverview = {
  totalAssets: "128,450,320원",
  dailyChange: "+842,510원",
  dailyRate: "+0.66%",
  updatedAt: "오늘 오전 10:30 기준",
} as const satisfies PortfolioOverview;

export const returnSummary = {
  totalReturn: "+12,804,120원",
  returnRate: "+11.07%",
  investedPrincipal: "115,646,200원",
} as const satisfies ReturnSummary;

export const chartSummary = {
  period: "1개월",
  change: "+4.82%",
  startLabel: "7.15",
  middleLabel: "7.30",
  endLabel: "8.14",
  linePath: "M8 118 C34 112 42 92 68 96 S104 118 128 88 S166 70 188 80 S226 108 250 66 S292 44 316 54 S352 30 392 34",
  areaPath: "M8 118 C34 112 42 92 68 96 S104 118 128 88 S166 70 188 80 S226 108 250 66 S292 44 316 54 S352 30 392 34 L392 144 L8 144 Z",
} as const satisfies ChartSummary;

export const chartPeriods = ["1주", "1개월", "3개월", "1년"] as const;

export const watchlist = [
  {
    name: "삼성전자",
    symbol: "005930",
    price: "78,400원",
    change: "+1.42%",
    direction: "gain",
  },
  {
    name: "애플",
    symbol: "AAPL",
    price: "$232.64",
    change: "−0.38%",
    direction: "loss",
  },
  {
    name: "KODEX 200",
    symbol: "069500",
    price: "41,285원",
    change: "+0.76%",
    direction: "gain",
  },
] as const satisfies readonly MarketItem[];

export const allocation = [
  { label: "국내주식", value: "48,811,122원", percentage: 38, tone: "accent" },
  { label: "해외주식", value: "39,819,599원", percentage: 31, tone: "gain" },
  { label: "ETF", value: "25,690,064원", percentage: 20, tone: "warning" },
  { label: "현금", value: "14,129,535원", percentage: 11, tone: "neutral" },
] as const satisfies readonly AllocationItem[];

export const news = [
  {
    category: "시장",
    headline: "코스피, 외국인 순매수에 2,780선 회복",
    publishedAt: "18분 전",
  },
  {
    category: "해외",
    headline: "미국 소비자물가 둔화, 기술주 강세 이어져",
    publishedAt: "1시간 전",
  },
  {
    category: "기업",
    headline: "삼성전자, 차세대 메모리 투자 계획 발표",
    publishedAt: "3시간 전",
  },
] as const satisfies readonly NewsItem[];

export const alerts = [
  {
    label: "삼성전자 목표가",
    detail: "80,000원 도달 시",
    status: "watching",
  },
  {
    label: "미국장 개장",
    detail: "오늘 오후 10:30",
    status: "scheduled",
  },
] as const satisfies readonly AlertItem[];

export const mockAccountStatus = {
  kind: "mock",
  reason: "api-unavailable",
} as const satisfies InvestmentAccountStatus;

export const mockDashboardData = {
  portfolioOverview,
  returnSummary,
  chartSummary,
  chartPeriods,
  watchlist,
  allocation,
  news,
  alerts,
  accountStatus: mockAccountStatus,
} as const satisfies DashboardData;
