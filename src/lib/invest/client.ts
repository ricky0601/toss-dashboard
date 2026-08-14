import "server-only";

import { parseAccountsResponse, parseHoldingsResponse, parseOAuth2TokenResponse } from "./parsers";
import type { TossInvestAccount, TossInvestApiFailureReason, TossInvestConfig, TossInvestHoldingsOverview, TossInvestResult, TossInvestToken } from "./types";

const TOSS_INVEST_API_ORIGIN = "https://openapi.tossinvest.com";

type CachedToken = {
  readonly token: TossInvestToken;
  readonly expiresAt: number;
};

let cachedToken: CachedToken | null = null;

function failureReasonForStatus(status: number): TossInvestApiFailureReason {
  switch (status) {
    case 401:
    case 403:
      return "auth-failed";
    default:
      return "api-unavailable";
  }
}

function readConfig(): TossInvestConfig | null {
  const clientId = process.env.INVEST_API_CLIENT_ID;
  const clientSecret = process.env.INVEST_API_CLIENT_SECRET;

  if (clientId === undefined || clientSecret === undefined) {
    return null;
  }

  return { clientId, clientSecret };
}

function buildUrl(path: string): URL {
  return new URL(path, `${TOSS_INVEST_API_ORIGIN}/`);
}

function getCachedToken(now: number): TossInvestToken | null {
  if (cachedToken === null || cachedToken.expiresAt <= now) {
    return null;
  }

  return cachedToken.token;
}

async function readJson(response: Response): Promise<unknown> {
  return response.json();
}

async function issueToken(config: TossInvestConfig): Promise<TossInvestResult<TossInvestToken>> {
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: config.clientId,
    client_secret: config.clientSecret,
  });

  const response = await fetch(buildUrl("oauth2/token"), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    return { ok: false, reason: failureReasonForStatus(response.status) };
  }

  const token = parseOAuth2TokenResponse(await readJson(response));

  if (token === null) {
    return { ok: false, reason: "invalid-response" };
  }

  cachedToken = {
    token,
    expiresAt: Date.now() + Math.max(0, token.expiresIn - 60) * 1000,
  };

  return { ok: true, value: token };
}

async function getAccessToken(config: TossInvestConfig): Promise<TossInvestResult<TossInvestToken>> {
  const token = getCachedToken(Date.now());

  if (token !== null) {
    return { ok: true, value: token };
  }

  return issueToken(config);
}

export async function getTossInvestAccounts(): Promise<TossInvestResult<readonly TossInvestAccount[]>> {
  const config = readConfig();

  if (config === null) {
    return { ok: false, reason: "missing-config" };
  }

  try {
    const token = await getAccessToken(config);

    if (!token.ok) {
      return token;
    }

    const response = await fetch(buildUrl("api/v1/accounts"), {
      headers: {
        Authorization: `${token.value.tokenType} ${token.value.accessToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { ok: false, reason: "api-unavailable" };
    }

    const accounts = parseAccountsResponse(await readJson(response));

    if (accounts === null) {
      return { ok: false, reason: "invalid-response" };
    }

    return { ok: true, value: accounts };
  } catch (error) {
    if (error instanceof TypeError) {
      return { ok: false, reason: "api-unavailable" };
    }

    throw error;
  }
}

export async function getTossInvestHoldings(accountSeq: number): Promise<TossInvestResult<TossInvestHoldingsOverview>> {
  const config = readConfig();

  if (config === null) {
    return { ok: false, reason: "missing-config" };
  }

  try {
    const token = await getAccessToken(config);

    if (!token.ok) {
      return token;
    }

    const response = await fetch(buildUrl("api/v1/holdings"), {
      headers: {
        Authorization: `${token.value.tokenType} ${token.value.accessToken}`,
        "X-Tossinvest-Account": String(accountSeq),
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { ok: false, reason: "api-unavailable" };
    }

    const holdings = parseHoldingsResponse(await readJson(response));

    if (holdings === null) {
      return { ok: false, reason: "invalid-response" };
    }

    return { ok: true, value: holdings };
  } catch (error) {
    if (error instanceof TypeError) {
      return { ok: false, reason: "api-unavailable" };
    }

    throw error;
  }
}
