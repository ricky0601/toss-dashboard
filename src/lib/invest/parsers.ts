import type { TossInvestAccount, TossInvestHoldingsOverview, TossInvestPrice, TossInvestToken } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseAccount(value: unknown): TossInvestAccount | null {
  if (!isRecord(value)) {
    return null;
  }

  const accountNo = value["accountNo"];
  const accountSeq = value["accountSeq"];
  const accountType = value["accountType"];

  if (typeof accountNo !== "string" || typeof accountSeq !== "number" || !Number.isInteger(accountSeq) || typeof accountType !== "string") {
    return null;
  }

  return { accountNo, accountSeq, accountType };
}

function parseDecimal(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
}

function parsePrice(value: unknown): TossInvestPrice | null {
  if (!isRecord(value)) {
    return null;
  }

  const krw = parseDecimal(value["krw"]);
  const usdValue = value["usd"];
  const usd = usdValue === undefined || usdValue === null ? null : parseDecimal(usdValue);

  if (krw === null || usd === null && usdValue !== undefined && usdValue !== null) {
    return null;
  }

  return { krw, usd };
}

function parseOverviewMarketValue(value: unknown): TossInvestHoldingsOverview["marketValue"] | null {
  if (!isRecord(value)) {
    return null;
  }

  const amount = parsePrice(value["amount"]);

  if (amount === null) {
    return null;
  }

  return { amount };
}

function parseOverviewProfitLoss(value: unknown): TossInvestHoldingsOverview["profitLoss"] | null {
  if (!isRecord(value)) {
    return null;
  }

  const amount = parsePrice(value["amount"]);
  const rate = parseDecimal(value["rate"]);

  if (amount === null || rate === null) {
    return null;
  }

  return { amount, rate };
}

function parseOverviewDailyProfitLoss(value: unknown): TossInvestHoldingsOverview["dailyProfitLoss"] | null {
  if (!isRecord(value)) {
    return null;
  }

  const amount = parsePrice(value["amount"]);
  const rate = parseDecimal(value["rate"]);

  if (amount === null || rate === null) {
    return null;
  }

  return { amount, rate };
}

export function parseOAuth2TokenResponse(value: unknown): TossInvestToken | null {
  if (!isRecord(value)) {
    return null;
  }

  const accessToken = value["access_token"];
  const tokenType = value["token_type"];
  const expiresIn = value["expires_in"];

  if (typeof accessToken !== "string" || tokenType !== "Bearer" || typeof expiresIn !== "number" || !Number.isFinite(expiresIn)) {
    return null;
  }

  return { accessToken, tokenType, expiresIn };
}

export function parseAccountsResponse(value: unknown): readonly TossInvestAccount[] | null {
  if (!isRecord(value)) {
    return null;
  }

  const result = value["result"];

  if (!Array.isArray(result)) {
    return null;
  }

  const accounts = result.map(parseAccount);

  if (accounts.some((account) => account === null)) {
    return null;
  }

  return accounts.filter((account) => account !== null);
}

export function parseHoldingsResponse(value: unknown): TossInvestHoldingsOverview | null {
  if (!isRecord(value) || !isRecord(value["result"])) {
    return null;
  }

  const result = value["result"];
  const totalPurchaseAmount = parsePrice(result["totalPurchaseAmount"]);
  const marketValue = parseOverviewMarketValue(result["marketValue"]);
  const profitLoss = parseOverviewProfitLoss(result["profitLoss"]);
  const dailyProfitLoss = parseOverviewDailyProfitLoss(result["dailyProfitLoss"]);
  const items = result["items"];

  if (totalPurchaseAmount === null || marketValue === null || profitLoss === null || dailyProfitLoss === null || !Array.isArray(items)) {
    return null;
  }

  return {
    totalPurchaseAmount,
    marketValue,
    profitLoss,
    dailyProfitLoss,
    itemCount: items.length,
  };
}
