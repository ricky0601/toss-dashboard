"use client";

import { useSyncExternalStore } from "react";
import {
  WIDGET_LAYOUT_CHANGED_EVENT,
  WIDGET_LAYOUT_STORAGE_KEY,
  isWidgetVisible,
  parseStoredWidgetLayout,
} from "@/lib/dashboard/widget-layout";

type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly widgetId?: "returns" | "watchlist" | "news";
};

const navigation = [
  { label: "홈", href: "#overview" },
  { label: "내 투자", href: "#returns", widgetId: "returns" },
  { label: "관심종목", href: "#watchlist", widgetId: "watchlist" },
  { label: "소식", href: "#news", widgetId: "news" },
] as const satisfies readonly NavItem[];

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(WIDGET_LAYOUT_CHANGED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(WIDGET_LAYOUT_CHANGED_EVENT, onStoreChange);
  };
}

function getSnapshot(): string | null {
  return window.localStorage.getItem(WIDGET_LAYOUT_STORAGE_KEY);
}

function getServerSnapshot(): null {
  return null;
}

export function DashboardHeaderNav() {
  const storedValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const layout = parseStoredWidgetLayout(storedValue);

  return (
    <div className="hidden items-center gap-1 md:flex">
      {navigation
        .filter((item) => !("widgetId" in item) || isWidgetVisible(layout, item.widgetId))
        .map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={item.href === "#overview" ? "page" : undefined}
            className={`motion-micro rounded-control px-4 py-3 text-body-small font-semibold transition-colors ${item.href === "#overview" ? "bg-surface-strong text-primary" : "text-tertiary hover:bg-surface-subtle hover:text-primary"}`}
          >
            {item.label}
          </a>
        ))}
    </div>
  );
}
