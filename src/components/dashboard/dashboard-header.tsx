import { DashboardIcon } from "./dashboard-icon";
import { DashboardHeaderNav } from "./dashboard-header-nav";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border-subtle bg-canvas/95 backdrop-blur-sm">
      <nav aria-label="주요 메뉴" className="mx-auto flex h-16 w-full max-w-dashboard items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-8">
          <a href="#overview" className="flex items-center gap-2 rounded-control font-bold tracking-tight text-primary">
            <span className="grid size-8 place-items-center rounded-control bg-accent text-white">
              <DashboardIcon name="overview" className="size-5" />
            </span>
            <span>투자</span>
          </a>
          <DashboardHeaderNav />
        </div>
        <div className="flex items-center gap-3" aria-label="사용자 메뉴">
          <span className="relative grid size-10 place-items-center rounded-full bg-surface-strong text-secondary" aria-label="새 알림 2개">
            <DashboardIcon name="bell" className="size-5" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-gain" />
          </span>
          <span className="grid size-10 place-items-center rounded-full bg-primary text-body-small font-bold text-white" aria-label="동건님 프로필">
            동
          </span>
        </div>
      </nav>
    </header>
  );
}
