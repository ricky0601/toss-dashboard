import { returnSummary } from "@/lib/dashboard/mock-data";
import { WidgetFrame } from "./widget-frame";

export function ReturnsWidget() {
  return (
    <WidgetFrame id="returns" title="투자 수익" eyebrow="누적">
      <p className="whitespace-nowrap text-compact-metric font-bold text-gain lg:text-widget-metric">{returnSummary.totalReturn}</p>
      <p className="mt-2 text-body font-bold text-gain">{returnSummary.returnRate}</p>
      <div className="mt-8 border-t border-border-subtle pt-5">
        <p className="text-caption font-semibold text-tertiary">투자 원금</p>
        <p className="mt-2 text-body font-semibold text-secondary">{returnSummary.investedPrincipal}</p>
      </div>
    </WidgetFrame>
  );
}
