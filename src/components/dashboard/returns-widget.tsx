import type { ReturnSummary } from "@/lib/dashboard/types";
import { WidgetFrame } from "./widget-frame";

type ReturnsWidgetProps = {
  readonly summary: ReturnSummary;
};

export function ReturnsWidget({ summary }: ReturnsWidgetProps) {
  return (
    <WidgetFrame id="returns" title="투자 수익" eyebrow="누적">
      <p className="whitespace-nowrap text-compact-metric font-bold text-gain lg:text-widget-metric">{summary.totalReturn}</p>
      <p className="mt-2 text-body font-bold text-gain">{summary.returnRate}</p>
      <div className="mt-8 border-t border-border-subtle pt-5">
        <p className="text-caption font-semibold text-tertiary">투자 원금</p>
        <p className="mt-2 text-body font-semibold text-secondary">{summary.investedPrincipal}</p>
      </div>
    </WidgetFrame>
  );
}
