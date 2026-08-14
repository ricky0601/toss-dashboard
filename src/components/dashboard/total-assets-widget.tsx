import { portfolioOverview } from "@/lib/dashboard/mock-data";
import { DashboardIcon } from "./dashboard-icon";

export function TotalAssetsWidget() {
  return (
    <section id="overview" aria-labelledby="overview-title" className="overflow-hidden rounded-widget bg-primary p-6 text-white sm:p-8 lg:p-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="min-w-0">
          <p id="overview-title" className="mb-4 text-body-small font-semibold text-white/60">총 자산</p>
          <p className="break-words text-asset font-bold">{portfolioOverview.totalAssets}</p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-body-small">
            <span className="rounded-full bg-white/10 px-3 py-2 font-semibold text-white">전일보다</span>
            <span className="font-bold text-gain-on-dark">{portfolioOverview.dailyChange}</span>
            <span className="font-bold text-gain-on-dark">({portfolioOverview.dailyRate})</span>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-medium bg-white/10 p-4 lg:min-w-56">
          <span className="grid size-11 shrink-0 place-items-center rounded-control bg-white/10 text-white">
            <DashboardIcon name="spark" className="size-6" />
          </span>
          <div>
            <p className="text-caption font-semibold text-white/50">업데이트</p>
            <p className="mt-1 text-body-small font-semibold text-white">{portfolioOverview.updatedAt}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
