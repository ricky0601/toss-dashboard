import assert from "node:assert/strict";
import test from "node:test";
import { dashboardWidgets } from "./widget-registry";
import {
  createDefaultWidgetLayout,
  normalizeWidgetLayout,
  parseStoredWidgetLayout,
  reorderWidgetLayout,
  serializeWidgetLayout,
  updateWidgetSpan,
  updateWidgetVisibility,
} from "./widget-layout";

test("creates visible defaults from the widget registry", () => {
  // Given: the dashboard widget registry
  const expectedItems = dashboardWidgets.map((widget, order) => ({
    id: widget.id,
    visible: true,
    order,
    span: widget.span,
  }));

  // When: a default layout is created
  const layout = createDefaultWidgetLayout();

  // Then: ids, order, visibility, and spans follow the registry
  assert.deepEqual(layout, { version: 1, items: expectedItems });
});

test("falls back to defaults when stored JSON is invalid", () => {
  // Given: malformed localStorage content
  const storedValue = "{invalid";

  // When: the stored value is parsed
  const layout = parseStoredWidgetLayout(storedValue);

  // Then: the default layout is returned
  assert.deepEqual(layout, createDefaultWidgetLayout());
});

test("merges stale stored items safely with current defaults", () => {
  // Given: a valid layout with a stale id, a duplicate, and missing current widgets
  const storedLayout = {
    version: 1,
    items: [
      { id: "returns", visible: false, order: 0, span: "five" },
      { id: "removed-widget", visible: true, order: 1, span: "full" },
      { id: "total-assets", visible: true, order: 2, span: "seven" },
      { id: "returns", visible: true, order: 3, span: "third" },
    ],
  };

  // When: the stored layout is normalized
  const layout = normalizeWidgetLayout(storedLayout);

  // Then: valid choices lead and missing widgets append in registry order
  assert.deepEqual(layout.items.slice(0, 3), [
    { id: "returns", visible: false, order: 0, span: "five" },
    { id: "total-assets", visible: true, order: 1, span: "seven" },
    { id: "performance-chart", visible: true, order: 2, span: "two-thirds" },
  ]);
  assert.equal(layout.items.length, dashboardWidgets.length);
});

test("reorders a widget within bounds", () => {
  // Given: the default widget layout
  const layout = createDefaultWidgetLayout();

  // When: the second widget moves up
  const reordered = reorderWidgetLayout(layout, "returns", "up");

  // Then: the first two widgets swap and order values stay sequential
  assert.deepEqual(
    reordered.items.slice(0, 2).map((item) => ({ id: item.id, order: item.order })),
    [
      { id: "returns", order: 0 },
      { id: "total-assets", order: 1 },
    ],
  );
});

test("keeps layout unchanged when reordering past a boundary", () => {
  // Given: the default widget layout
  const layout = createDefaultWidgetLayout();

  // When: the first widget attempts to move up
  const reordered = reorderWidgetLayout(layout, "total-assets", "up");

  // Then: the layout remains unchanged
  assert.deepEqual(reordered, layout);
});

test("updates widget visibility without changing other fields", () => {
  // Given: the default widget layout
  const layout = createDefaultWidgetLayout();

  // When: watchlist visibility is turned off
  const updated = updateWidgetVisibility(layout, "watchlist", false);

  // Then: only watchlist visibility changes
  assert.deepEqual(updated.items.find((item) => item.id === "watchlist"), {
    id: "watchlist",
    visible: false,
    order: 3,
    span: "five",
  });
});

test("updates widget span without changing other fields", () => {
  // Given: the default widget layout
  const layout = createDefaultWidgetLayout();

  // When: alerts uses the full grid span
  const updated = updateWidgetSpan(layout, "alerts", "full");

  // Then: only the alerts span changes
  assert.deepEqual(updated.items.find((item) => item.id === "alerts"), {
    id: "alerts",
    visible: true,
    order: 6,
    span: "full",
  });
});

test("serializes a layout for a safe parse round trip", () => {
  // Given: a customized layout
  const customized = updateWidgetVisibility(createDefaultWidgetLayout(), "news", false);

  // When: the layout is serialized and parsed
  const restored = parseStoredWidgetLayout(serializeWidgetLayout(customized));

  // Then: the stored layout is preserved
  assert.deepEqual(restored, customized);
});
