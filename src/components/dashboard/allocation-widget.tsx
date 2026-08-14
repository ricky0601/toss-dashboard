import type { AllocationItem } from "@/lib/dashboard/types";
import { WidgetFrame } from "./widget-frame";

function toneClass(tone: AllocationItem["tone"]): string {
  switch (tone) {
    case "accent":
      return "bg-accent";
    case "gain":
      return "bg-gain";
    case "warning":
      return "bg-warning";
    case "neutral":
      return "bg-disabled";
  }
}

type AllocationWidgetProps = {
  readonly items: readonly AllocationItem[];
};

export function AllocationWidget({ items }: AllocationWidgetProps) {
  return (
    <WidgetFrame id="allocation" title="자산 구성" eyebrow="총 자산 기준">
      <div className="grid gap-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-center">
        <div className="relative mx-auto size-40" role="img" aria-label="국내주식 38%, 해외주식 31%, ETF 20%, 현금 11%">
          <div className="absolute inset-0 rounded-full bg-[conic-gradient(var(--accent-primary)_0_38%,var(--performance-gain)_38%_69%,var(--status-warning)_69%_89%,var(--text-disabled)_89%_100%)]" />
          <div className="absolute inset-4 grid place-items-center rounded-full bg-surface-subtle text-center">
            <span className="text-caption font-semibold text-tertiary">4개 자산군</span>
          </div>
        </div>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.label} className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className={`size-2.5 shrink-0 rounded-full ${toneClass(item.tone)}`} />
                <span className="truncate text-body-small font-semibold text-secondary">{item.label}</span>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-body-small font-bold text-primary">{item.percentage}%</span>
                <span className="ml-2 hidden text-caption font-semibold text-tertiary lg:inline">{item.value}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </WidgetFrame>
  );
}
