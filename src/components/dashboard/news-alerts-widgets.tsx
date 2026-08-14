import type { AlertItem, NewsItem } from "@/lib/dashboard/types";
import { DashboardIcon } from "./dashboard-icon";
import { WidgetFrame } from "./widget-frame";

type NewsWidgetProps = {
  readonly items: readonly NewsItem[];
};

type AlertsWidgetProps = {
  readonly items: readonly AlertItem[];
};

export function NewsWidget({ items }: NewsWidgetProps) {
  return (
    <WidgetFrame id="news" title="오늘의 투자 소식" eyebrow="주요 뉴스">
      <ol className="divide-y divide-border-subtle">
        {items.map((item) => (
          <li key={item.headline} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
            <span className="mt-0.5 rounded-control bg-surface-raised px-2 py-1 text-caption font-bold text-accent">{item.category}</span>
            <div className="min-w-0 flex-1">
              <p className="text-body font-semibold text-primary">{item.headline}</p>
              <p className="mt-2 text-caption font-semibold text-tertiary">{item.publishedAt}</p>
            </div>
            <DashboardIcon name="chevron" className="mt-1 size-5 shrink-0 text-disabled" />
          </li>
        ))}
      </ol>
    </WidgetFrame>
  );
}

export function AlertsWidget({ items }: AlertsWidgetProps) {
  return (
    <WidgetFrame id="alerts" title="알림" eyebrow="2개 설정됨">
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label} className="rounded-medium bg-surface-raised p-4">
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${item.status === "watching" ? "bg-gain" : "bg-accent"}`} />
              <p className="text-body-small font-bold text-primary">{item.label}</p>
            </div>
            <p className="mt-2 pl-4 text-caption font-semibold text-tertiary">{item.detail}</p>
          </li>
        ))}
      </ul>
    </WidgetFrame>
  );
}
