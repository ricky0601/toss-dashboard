import type { SVGProps } from "react";

export type DashboardIconName = "bell" | "chevron" | "overview" | "spark";

type DashboardIconProps = SVGProps<SVGSVGElement> & {
  readonly name: DashboardIconName;
};

export function DashboardIcon({ name, ...props }: DashboardIconProps) {
  const commonProps = {
    ...props,
    "aria-hidden": true,
    fill: "none",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
  } as const;

  switch (name) {
    case "bell":
      return (
        <svg {...commonProps}>
          <path d="M6.8 9a5.2 5.2 0 0 1 10.4 0c0 6 2.3 6.2 2.3 7.5H4.5c0-1.3 2.3-1.5 2.3-7.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          <path d="M9.7 19a2.6 2.6 0 0 0 4.6 0" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...commonProps}>
          <path d="m9 5 7 7-7 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      );
    case "overview":
      return (
        <svg {...commonProps}>
          <path d="M4 17V9m5 8V5m5 12v-6m5 6V3" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" />
        </svg>
      );
    case "spark":
      return (
        <svg {...commonProps}>
          <path d="M4 15.5 9 11l3.5 2.5L20 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M15.5 6H20v4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      );
  }
}
