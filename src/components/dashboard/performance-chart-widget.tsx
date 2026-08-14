import type { ChartSummary } from "@/lib/dashboard/types";
import { WidgetFrame } from "./widget-frame";

type PerformanceChartWidgetProps = {
  readonly summary: ChartSummary;
  readonly periods: readonly string[];
};

export function PerformanceChartWidget({ summary, periods }: PerformanceChartWidgetProps) {
  return (
    <WidgetFrame id="performance" title="자산 흐름" eyebrow="최근 1개월">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <p className="text-widget-metric font-bold text-primary">{summary.change}</p>
        <div aria-label="차트 기간" className="flex rounded-control bg-surface-strong p-1">
          {periods.map((period) => (
            <span
              key={period}
              aria-current={period === summary.period ? "true" : undefined}
              className={`rounded-control px-3 py-2 text-caption font-semibold ${period === summary.period ? "bg-surface-raised text-primary" : "text-tertiary"}`}
            >
              {period}
            </span>
          ))}
        </div>
      </div>
      <figure>
        <svg role="img" aria-labelledby="chart-title chart-desc" viewBox="0 0 400 160" className="h-auto w-full overflow-visible">
          <title id="chart-title">최근 1개월 자산 흐름</title>
          <desc id="chart-desc">7월 15일부터 8월 14일까지 자산이 4.82퍼센트 상승했습니다.</desc>
          <g className="chart-grid">
            <line x1="8" x2="392" y1="40" y2="40" />
            <line x1="8" x2="392" y1="92" y2="92" />
            <line x1="8" x2="392" y1="144" y2="144" />
          </g>
          <path d={summary.areaPath} className="chart-area" />
          <path d={summary.linePath} className="chart-line" />
          <circle cx="392" cy="34" r="5" className="fill-accent stroke-surface-raised stroke-4" />
        </svg>
        <figcaption className="mt-2 flex justify-between text-caption font-semibold text-tertiary">
          <span>{summary.startLabel}</span>
          <span>{summary.middleLabel}</span>
          <span>{summary.endLabel}</span>
        </figcaption>
      </figure>
    </WidgetFrame>
  );
}
