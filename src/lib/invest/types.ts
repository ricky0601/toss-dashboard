export type TossInvestConfig = {
  readonly clientId: string;
  readonly clientSecret: string;
};

export type TossInvestAccount = {
  readonly accountNo: string;
  readonly accountSeq: number;
  readonly accountType: string;
};

export type TossInvestPrice = {
  readonly krw: number;
  readonly usd: number | null;
};

export type TossInvestHoldingsOverview = {
  readonly totalPurchaseAmount: TossInvestPrice;
  readonly marketValue: {
    readonly amount: TossInvestPrice;
  };
  readonly profitLoss: {
    readonly amount: TossInvestPrice;
    readonly rate: number;
  };
  readonly dailyProfitLoss: {
    readonly amount: TossInvestPrice;
    readonly rate: number;
  };
  readonly itemCount: number;
};

export type TossInvestToken = {
  readonly accessToken: string;
  readonly tokenType: "Bearer";
  readonly expiresIn: number;
};

export type TossInvestApiFailureReason = "missing-config" | "auth-failed" | "api-unavailable" | "invalid-response";

export type TossInvestResult<TValue> =
  | {
      readonly ok: true;
      readonly value: TValue;
    }
  | {
      readonly ok: false;
      readonly reason: TossInvestApiFailureReason;
    };
