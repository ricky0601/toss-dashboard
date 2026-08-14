import { dashboardWidgets } from "./widget-registry";
import type {
  StoredWidgetLayoutV1,
  WidgetId,
  WidgetLayoutItem,
  WidgetMoveDirection,
  WidgetSpan,
} from "./types";

export const WIDGET_LAYOUT_STORAGE_KEY = "toss-dashboard.widget-layout";

const moveOffset = {
  up: -1,
  down: 1,
} as const satisfies Record<WidgetMoveDirection, number>;

function isRecord(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

function isWidgetId(value: unknown): value is WidgetId {
  return typeof value === "string" && dashboardWidgets.some((widget) => widget.id === value);
}

function isWidgetSpan(value: unknown): value is WidgetSpan {
  switch (value) {
    case "full":
    case "third":
    case "two-thirds":
    case "five":
    case "seven":
      return true;
    default:
      return false;
  }
}

function isWidgetLayoutItem(value: unknown): value is WidgetLayoutItem {
  return (
    isRecord(value) &&
    "id" in value &&
    isWidgetId(value.id) &&
    "visible" in value &&
    typeof value.visible === "boolean" &&
    "order" in value &&
    typeof value.order === "number" &&
    Number.isInteger(value.order) &&
    value.order >= 0 &&
    "span" in value &&
    isWidgetSpan(value.span)
  );
}

export function createDefaultWidgetLayout(): StoredWidgetLayoutV1 {
  return {
    version: 1,
    items: dashboardWidgets.map((widget, order) => ({
      id: widget.id,
      visible: true,
      order,
      span: widget.span,
    })),
  };
}

export function normalizeWidgetLayout(value: unknown): StoredWidgetLayoutV1 {
  const defaults = createDefaultWidgetLayout();

  if (!isRecord(value) || !("version" in value) || value.version !== 1 || !("items" in value) || !Array.isArray(value.items)) {
    return defaults;
  }

  const seenIds = new Set<WidgetId>();
  const storedItems = value.items
    .filter(isWidgetLayoutItem)
    .toSorted((left, right) => left.order - right.order)
    .filter((item) => {
      if (seenIds.has(item.id)) {
        return false;
      }

      seenIds.add(item.id);
      return true;
    });
  const mergedItems = [
    ...storedItems,
    ...defaults.items.filter((item) => !seenIds.has(item.id)),
  ].map((item, order) => ({ ...item, order }));

  return { version: 1, items: mergedItems };
}

export function parseStoredWidgetLayout(value: string | null): StoredWidgetLayoutV1 {
  if (value === null) {
    return createDefaultWidgetLayout();
  }

  try {
    return normalizeWidgetLayout(JSON.parse(value));
  } catch (error) {
    if (error instanceof SyntaxError) {
      return createDefaultWidgetLayout();
    }

    throw error;
  }
}

export function serializeWidgetLayout(layout: StoredWidgetLayoutV1): string {
  return JSON.stringify(layout);
}

export function reorderWidgetLayout(
  layout: StoredWidgetLayoutV1,
  id: WidgetId,
  direction: WidgetMoveDirection,
): StoredWidgetLayoutV1 {
  const currentIndex = layout.items.findIndex((item) => item.id === id);
  const targetIndex = currentIndex + moveOffset[direction];
  const currentItem = layout.items[currentIndex];
  const targetItem = layout.items[targetIndex];

  if (currentItem === undefined || targetItem === undefined) {
    return layout;
  }

  return {
    version: 1,
    items: layout.items.map((item, index) => {
      if (index === currentIndex) {
        return { ...targetItem, order: index };
      }

      if (index === targetIndex) {
        return { ...currentItem, order: index };
      }

      return item;
    }),
  };
}

export function updateWidgetVisibility(
  layout: StoredWidgetLayoutV1,
  id: WidgetId,
  visible: boolean,
): StoredWidgetLayoutV1 {
  return {
    version: 1,
    items: layout.items.map((item) => (item.id === id ? { ...item, visible } : item)),
  };
}

export function updateWidgetSpan(
  layout: StoredWidgetLayoutV1,
  id: WidgetId,
  span: WidgetSpan,
): StoredWidgetLayoutV1 {
  return {
    version: 1,
    items: layout.items.map((item) => (item.id === id ? { ...item, span } : item)),
  };
}
