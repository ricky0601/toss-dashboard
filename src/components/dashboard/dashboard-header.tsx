import { DashboardIcon } from "./dashboard-icon";

const navigation = [
  { label: "홈", href: "#overview", current: true },
  { label: "내 투자", href: "#returns", current: false },
  { label: "관심종목", href: "#watchlist", current: false },
  { label: "소식", href: "#news", current: false },
] as const;

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
          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={`motion-micro rounded-control px-4 py-3 text-body-small font-semibold transition-colors ${item.current ? "bg-surface-strong text-primary" : "text-tertiary hover:bg-surface-subtle hover:text-primary"}`}
              >
                {item.label}
              </a>
            ))}
          </div>
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
