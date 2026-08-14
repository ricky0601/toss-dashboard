"use client";

import { useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  createDefaultWidgetLayout,
  parseStoredWidgetLayout,
  reorderWidgetLayout,
  serializeWidgetLayout,
  updateWidgetSpan,
  updateWidgetVisibility,
  WIDGET_LAYOUT_STORAGE_KEY,
} from "@/lib/dashboard/widget-layout";
import type { StoredWidgetLayoutV1, WidgetId, WidgetSpan } from "@/lib/dashboard/types";

export type WidgetSlot = {
  readonly id: WidgetId;
  readonly label: string;
  readonly content: ReactNode;
};

type WidgetLayoutEditorProps = {
  readonly widgets: readonly WidgetSlot[];
};

const spanOptions = [
  { value: "full", label: "전체 (12칸)" },
  { value: "third", label: "1/3 (4칸)" },
  { value: "two-thirds", label: "2/3 (8칸)" },
  { value: "five", label: "5/12 (5칸)" },
  { value: "seven", label: "7/12 (7칸)" },
] as const satisfies readonly { readonly value: WidgetSpan; readonly label: string }[];

const layoutChangedEvent = "toss-dashboard:widget-layout-changed";
const secondaryButtonClass =
  "motion-micro min-h-11 whitespace-nowrap rounded-control bg-surface-raised px-4 text-body-small font-semibold text-secondary transition-colors enabled:hover:bg-surface-strong enabled:hover:text-primary disabled:cursor-not-allowed disabled:text-disabled";

function spanClass(span: WidgetSpan): string {
  switch (span) {
    case "full":
      return "md:col-span-12";
    case "third":
      return "md:col-span-4";
    case "two-thirds":
      return "md:col-span-8";
    case "five":
      return "md:col-span-5";
    case "seven":
      return "md:col-span-7";
  }
}

function parseWidgetSpan(value: string): WidgetSpan | null {
  switch (value) {
    case "full":
    case "third":
    case "two-thirds":
    case "five":
    case "seven":
      return value;
    default:
      return null;
  }
}

function subscribeToStoredLayout(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(layoutChangedEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(layoutChangedEvent, onStoreChange);
  };
}

function getStoredLayoutValue(): string | null {
  return window.localStorage.getItem(WIDGET_LAYOUT_STORAGE_KEY);
}

function getServerStoredLayoutValue(): null {
  return null;
}

function persistWidgetLayout(layout: StoredWidgetLayoutV1): void {
  window.localStorage.setItem(WIDGET_LAYOUT_STORAGE_KEY, serializeWidgetLayout(layout));
  window.dispatchEvent(new Event(layoutChangedEvent));
}

export function WidgetLayoutEditor({ widgets }: WidgetLayoutEditorProps) {
  const storedValue = useSyncExternalStore(subscribeToStoredLayout, getStoredLayoutValue, getServerStoredLayoutValue);
  const savedLayout = useMemo(() => parseStoredWidgetLayout(storedValue), [storedValue]);
  const [draftLayout, setDraftLayout] = useState(createDefaultWidgetLayout);
  const [isEditing, setIsEditing] = useState(false);
  const activeLayout = isEditing ? draftLayout : savedLayout;

  function startEditing(): void {
    setDraftLayout(savedLayout);
    setIsEditing(true);
  }

  function cancelEditing(): void {
    setDraftLayout(savedLayout);
    setIsEditing(false);
  }

  function saveEditing(): void {
    persistWidgetLayout(draftLayout);
    setIsEditing(false);
  }

  function resetLayout(): void {
    const defaults = createDefaultWidgetLayout();
    persistWidgetLayout(defaults);
    setDraftLayout(defaults);
    setIsEditing(false);
  }

  return (
    <section aria-labelledby="widget-layout-title">
      <div className="mb-6 flex flex-col gap-4 rounded-widget bg-surface-subtle p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <h2 id="widget-layout-title" className="text-section-title font-bold text-primary">위젯 구성</h2>
          <p className="mt-1 text-body-small font-semibold text-tertiary">
            {isEditing ? "표시, 순서와 너비를 조정하세요." : "내가 보고 싶은 순서와 크기로 정리할 수 있어요."}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:justify-end" aria-label="위젯 구성 작업">
          {isEditing ? (
            <>
              <button type="button" onClick={cancelEditing} className={secondaryButtonClass}>편집 취소</button>
              <button type="button" onClick={resetLayout} className={secondaryButtonClass}>기본값으로 초기화</button>
              <button
                type="button"
                onClick={saveEditing}
                className="motion-micro min-h-11 whitespace-nowrap rounded-control bg-accent px-5 text-body-small font-bold text-white transition-colors hover:bg-accent-hover"
              >
                저장
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={resetLayout} className={secondaryButtonClass}>기본값으로 초기화</button>
              <button
                type="button"
                onClick={startEditing}
                className="motion-micro min-h-11 whitespace-nowrap rounded-control bg-accent px-5 text-body-small font-bold text-white transition-colors hover:bg-accent-hover"
              >
                위젯 편집
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12" aria-label="투자 위젯">
        {activeLayout.items.map((item, index) => {
          const widget = widgets.find((candidate) => candidate.id === item.id);

          if (widget === undefined || (!isEditing && !item.visible)) {
            return null;
          }

          return (
            <div key={item.id} className={`min-w-0 ${spanClass(item.span)} ${isEditing ? "rounded-widget bg-surface-strong p-2" : ""}`}>
              {isEditing ? (
                <div className="grid gap-3 p-2 sm:p-3">
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <p className="truncate text-body-small font-bold text-primary">{widget.label}</p>
                    <label className="flex min-h-11 shrink-0 items-center gap-2 rounded-control bg-surface-raised px-3 text-body-small font-semibold text-secondary">
                      <input
                        type="checkbox"
                        checked={item.visible}
                        onChange={(event) => setDraftLayout(updateWidgetVisibility(draftLayout, item.id, event.currentTarget.checked))}
                        className="size-5 accent-accent"
                      />
                      표시
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-[auto_auto_minmax(0,1fr)]">
                    <button
                      type="button"
                      onClick={() => setDraftLayout(reorderWidgetLayout(draftLayout, item.id, "up"))}
                      disabled={index === 0}
                      aria-label={`${widget.label} 위로 이동`}
                      className={secondaryButtonClass}
                    >
                      위로
                    </button>
                    <button
                      type="button"
                      onClick={() => setDraftLayout(reorderWidgetLayout(draftLayout, item.id, "down"))}
                      disabled={index === activeLayout.items.length - 1}
                      aria-label={`${widget.label} 아래로 이동`}
                      className={secondaryButtonClass}
                    >
                      아래로
                    </button>
                    <label className="col-span-2 grid min-h-11 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-control bg-surface-raised px-3 sm:col-span-1">
                      <span className="text-caption font-semibold text-tertiary">너비</span>
                      <select
                        value={item.span}
                        onChange={(event) => {
                          const span = parseWidgetSpan(event.currentTarget.value);
                          if (span !== null) {
                            setDraftLayout(updateWidgetSpan(draftLayout, item.id, span));
                          }
                        }}
                        className="min-h-11 min-w-0 bg-transparent text-body-small font-semibold text-primary"
                      >
                        {spanOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              ) : null}
              {widget.content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
