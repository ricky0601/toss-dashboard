import "server-only";

import { getTossInvestAccounts, getTossInvestHoldings } from "@/lib/invest/client";
import type { TossInvestApiFailureReason } from "@/lib/invest/types";
import { mockDashboardData } from "./mock-data";
import type { DashboardData, InvestmentAccountStatus } from "./types";

export type DashboardDataState =
  | {
      readonly kind: "ready";
      readonly data: DashboardData;
    }
  | {
      readonly kind: "error";
      readonly reason: TossInvestApiFailureReason;
    };

function accountStatusLabel(status: InvestmentAccountStatus): string {
  switch (status.kind) {
    case "api":
      return `토스증권 API 연결됨 · 계좌 ${status.accountCount}개`;
    case "mock":
      return "mock 데이터 표시 중";
  }
}

function formatKrw(value: number): string {
  return `${Math.round(value).toLocaleString("ko-KR")}원`;
}

function formatSignedKrw(value: number): string {
  const prefix = value > 0 ? "+" : "";

  return `${prefix}${formatKrw(value)}`;
}

function formatSignedRate(value: number): string {
  const percent = value * 100;
  const prefix = percent > 0 ? "+" : "";

  return `${prefix}${percent.toFixed(2)}%`;
}

function dashboardDataError(reason: TossInvestApiFailureReason): DashboardDataState {
  return { kind: "error", reason };
}

export async function getDashboardData(): Promise<DashboardDataState> {
  const accounts = await getTossInvestAccounts();

  if (!accounts.ok) {
    return dashboardDataError(accounts.reason);
  }

  const primaryAccount = accounts.value[0];

  if (primaryAccount === undefined) {
    return dashboardDataError("api-unavailable");
  }

  const holdings = await getTossInvestHoldings(primaryAccount.accountSeq);

  if (!holdings.ok) {
    return dashboardDataError(holdings.reason);
  }

  const accountStatus = {
    kind: "api",
    accountCount: accounts.value.length,
    primaryAccountType: primaryAccount.accountType,
  } as const satisfies InvestmentAccountStatus;

  return {
    kind: "ready",
    data: {
      ...mockDashboardData,
      accountStatus,
      portfolioOverview: {
        ...mockDashboardData.portfolioOverview,
        totalAssets: formatKrw(holdings.value.marketValue.amount.krw),
        dailyChange: formatSignedKrw(holdings.value.dailyProfitLoss.amount.krw),
        dailyRate: formatSignedRate(holdings.value.dailyProfitLoss.rate),
        updatedAt: `${accountStatusLabel(accountStatus)} · 보유 ${holdings.value.itemCount}종목`,
      },
      returnSummary: {
        totalReturn: formatSignedKrw(holdings.value.profitLoss.amount.krw),
        returnRate: formatSignedRate(holdings.value.profitLoss.rate),
        investedPrincipal: formatKrw(holdings.value.totalPurchaseAmount.krw),
      },
    },
  };
}
