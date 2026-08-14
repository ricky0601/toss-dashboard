import { watchlist } from "@/lib/dashboard/mock-data";
import type { PerformanceDirection } from "@/lib/dashboard/types";
import { WidgetFrame } from "./widget-frame";

function performanceClass(direction: PerformanceDirection): string {
  switch (direction) {
    case "gain":
      return "text-gain";
    case "loss":
      return "text-loss";
    case "neutral":
      return "text-secondary";
  }
}

export function WatchlistWidget() {
  return (
    <WidgetFrame id="watchlist" title="관심 종목" eyebrow="실시간 시세">
      <ul className="space-y-3">
        {watchlist.map((item) => (
          <li key={item.symbol} className="flex min-w-0 items-center justify-between gap-4 rounded-medium bg-surface-raised p-4">
            <div className="min-w-0">
              <p className="truncate text-body font-bold text-primary">{item.name}</p>
              <p className="mt-1 text-caption font-semibold text-tertiary">{item.symbol}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-body-small font-bold text-primary">{item.price}</p>
              <p className={`mt-1 text-caption font-bold ${performanceClass(item.direction)}`}>{item.change}</p>
            </div>
          </li>
        ))}
      </ul>
    </WidgetFrame>
  );
}
