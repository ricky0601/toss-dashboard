import { connection } from "next/server";
import { DashboardDataError } from "@/components/dashboard/dashboard-data-error";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardWidgetGrid } from "@/components/dashboard/dashboard-widget-grid";
import { getDashboardData } from "@/lib/dashboard/data";

export default async function Home() {
  await connection();
  const dashboardDataState = await getDashboardData();

  return (
    <div className="min-h-dvh bg-canvas text-primary">
      <DashboardHeader />
      <main className="mx-auto w-full max-w-dashboard px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-16">
        <header className="mb-10 max-w-readable lg:mb-12">
          <p className="mb-2 text-body-small font-semibold text-tertiary">
            8월 14일 금요일
          </p>
          <h1 className="text-page-title font-bold text-primary">
            동건님의 투자
          </h1>
          <p className="mt-3 text-body text-secondary">
            오늘의 자산 흐름과 관심 종목을 차분히 살펴보세요.
          </p>
        </header>
        {dashboardDataState.kind === "ready" ? (
          <DashboardWidgetGrid data={dashboardDataState.data} />
        ) : (
          <DashboardDataError reason={dashboardDataState.reason} />
        )}
      </main>
    </div>
  );
}
