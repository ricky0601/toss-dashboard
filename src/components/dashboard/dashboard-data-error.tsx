import Link from "next/link";
import type { TossInvestApiFailureReason } from "@/lib/invest/types";

type DashboardDataErrorProps = {
  readonly reason: TossInvestApiFailureReason;
};

function errorHint(reason: TossInvestApiFailureReason): string {
  switch (reason) {
    case "missing-config":
      return "서버 환경 변수에 Open API client ID, client secret, base URL이 모두 있는지 확인해 주세요.";
    case "auth-failed":
      return "Open API client ID/secret, 허용 IP, 토큰 발급 권한을 확인해 주세요.";
    case "api-unavailable":
      return "토스증권 API 응답이 일시적으로 실패했어요. 잠시 뒤 다시 시도해 주세요.";
    case "invalid-response":
      return "API 응답 구조가 문서와 달라서 화면에 표시하지 않았어요.";
  }
}

export function DashboardDataError({ reason }: DashboardDataErrorProps) {
  return (
    <section aria-labelledby="dashboard-data-error-title" className="rounded-widget bg-surface-subtle p-6 sm:p-8">
      <p className="mb-3 text-body-small font-semibold text-tertiary">투자 데이터를 불러오지 못했어요</p>
      <h2 id="dashboard-data-error-title" className="text-page-title font-bold text-primary">
        토스증권 API 연결을 확인해 주세요.
      </h2>
      <p className="mt-4 text-body text-secondary">
        mock 데이터로 대신 보여주지 않고, 실제 계좌 데이터를 불러오지 못하면 이 상태를 표시합니다.
      </p>
      <p className="mt-3 text-body-small font-semibold text-tertiary">{errorHint(reason)}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="motion-micro inline-flex min-h-11 items-center justify-center rounded-control bg-accent px-5 text-body-small font-bold text-white transition-colors hover:bg-accent-hover"
        >
          다시 불러오기
        </Link>
        <a
          href="https://developers.tossinvest.com/docs"
          className="motion-micro inline-flex min-h-11 items-center justify-center rounded-control bg-surface-raised px-5 text-body-small font-semibold text-secondary transition-colors hover:bg-surface-strong hover:text-primary"
        >
          Open API 문서 보기
        </a>
      </div>
    </section>
  );
}
