"use client";

type ErrorPageProps = {
  readonly error: Error & { readonly digest?: string };
  readonly reset: () => void;
};

function supportHint(): string {
  return "일시적인 문제가 발생했어요. 잠시 뒤 다시 시도해 주세요.";
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="grid min-h-dvh place-items-center bg-canvas px-4 py-16 text-primary sm:px-6 lg:px-8">
      <section aria-labelledby="error-title" className="w-full max-w-readable rounded-widget bg-surface-subtle p-6 sm:p-8">
        <p className="mb-3 text-body-small font-semibold text-tertiary">투자 데이터를 불러오지 못했어요</p>
        <h1 id="error-title" className="text-page-title font-bold text-primary">
          토스증권 API 연결을 확인해 주세요.
        </h1>
        <p className="mt-4 text-body text-secondary">
          예상하지 못한 문제가 발생해서 화면을 멈췄어요. 반복되면 서버 로그를 확인해 주세요.
        </p>
        <p className="mt-3 text-body-small font-semibold text-tertiary">{supportHint()}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="motion-micro min-h-11 rounded-control bg-accent px-5 text-body-small font-bold text-white transition-colors hover:bg-accent-hover"
          >
            다시 불러오기
          </button>
          <a
            href="https://developers.tossinvest.com/docs"
            className="motion-micro inline-flex min-h-11 items-center justify-center rounded-control bg-surface-raised px-5 text-body-small font-semibold text-secondary transition-colors hover:bg-surface-strong hover:text-primary"
          >
            Open API 문서 보기
          </a>
        </div>
      </section>
    </main>
  );
}
