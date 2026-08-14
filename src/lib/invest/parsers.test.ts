import assert from "node:assert/strict";
import test from "node:test";
import { parseAccountsResponse, parseHoldingsResponse, parseOAuth2TokenResponse } from "./parsers";

test("parses OAuth2 token response when the payload matches Toss Invest docs", () => {
  // Given: a token response shaped like the documented OAuth2 response
  const payload = {
    access_token: "token-value",
    token_type: "Bearer",
    expires_in: 3600,
  };

  // When: the response crosses the runtime boundary
  const token = parseOAuth2TokenResponse(payload);

  // Then: only the public token contract is returned
  assert.deepEqual(token, {
    accessToken: "token-value",
    tokenType: "Bearer",
    expiresIn: 3600,
  });
});

test("rejects OAuth2 token response with an unexpected token type", () => {
  // Given: a token response with an unsupported token type
  const payload = {
    access_token: "token-value",
    token_type: "Basic",
    expires_in: 3600,
  };

  // When: the response crosses the runtime boundary
  const token = parseOAuth2TokenResponse(payload);

  // Then: the parser rejects it
  assert.equal(token, null);
});

test("parses accounts response while keeping unknown account types as strings", () => {
  // Given: the documented account list envelope with an unknown future account type
  const payload = {
    result: [
      {
        accountNo: "123-456",
        accountSeq: 1,
        accountType: "FUTURE_ACCOUNT_TYPE",
      },
    ],
  };

  // When: the response crosses the runtime boundary
  const accounts = parseAccountsResponse(payload);

  // Then: unknown enum values remain accepted as data
  assert.deepEqual(accounts, [
    {
      accountNo: "123-456",
      accountSeq: 1,
      accountType: "FUTURE_ACCOUNT_TYPE",
    },
  ]);
});

test("rejects accounts response when any item is malformed", () => {
  // Given: one account has a malformed accountSeq
  const payload = {
    result: [
      {
        accountNo: "123-456",
        accountSeq: "1",
        accountType: "BROKERAGE",
      },
    ],
  };

  // When: the response crosses the runtime boundary
  const accounts = parseAccountsResponse(payload);

  // Then: the whole payload is rejected instead of partially trusted
  assert.equal(accounts, null);
});

test("parses holdings overview for dashboard financial metrics", () => {
  // Given: the documented holdings envelope with overview money and rate fields
  const payload = {
    result: {
      totalPurchaseAmount: { krw: "1000000", usd: null },
      marketValue: {
        amount: { krw: "1120000", usd: null },
        amountAfterCost: { krw: "1110000", usd: null },
      },
      profitLoss: {
        amount: { krw: "120000", usd: null },
        amountAfterCost: { krw: "110000", usd: null },
        rate: "0.12",
        rateAfterCost: "0.11",
      },
      dailyProfitLoss: {
        amount: { krw: "15000", usd: null },
        rate: "0.0134",
      },
      items: [{ symbol: "005930" }, { symbol: "AAPL" }],
    },
  };

  // When: the response crosses the runtime boundary
  const holdings = parseHoldingsResponse(payload);

  // Then: only the dashboard-required overview values are returned
  assert.deepEqual(holdings, {
    totalPurchaseAmount: { krw: 1000000, usd: null },
    marketValue: { amount: { krw: 1120000, usd: null } },
    profitLoss: { amount: { krw: 120000, usd: null }, rate: 0.12 },
    dailyProfitLoss: { amount: { krw: 15000, usd: null }, rate: 0.0134 },
    itemCount: 2,
  });
});

test("rejects holdings overview when required financial fields are malformed", () => {
  // Given: a holdings envelope with an invalid market value
  const payload = {
    result: {
      totalPurchaseAmount: { krw: "1000000", usd: null },
      marketValue: { amount: { krw: "invalid", usd: null } },
      profitLoss: { amount: { krw: "120000", usd: null }, rate: "0.12" },
      dailyProfitLoss: { amount: { krw: "15000", usd: null }, rate: "0.0134" },
      items: [],
    },
  };

  // When: the response crosses the runtime boundary
  const holdings = parseHoldingsResponse(payload);

  // Then: the payload is rejected instead of falling back
  assert.equal(holdings, null);
});
