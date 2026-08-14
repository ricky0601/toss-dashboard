# Toss Dashboard Design System

## 0. Research Log

- Embedded references: the user selected `minimalist-skill.md` + `coinbase.md`, with `design-system-architecture.md` and `layout-skill.md` governing structure. The combination fits a restrained Korean investment dashboard: editorial whitespace and tonal cards, with blue reserved for trusted actions.
- Existing scaffold: reviewed every UI surface (`src/app/layout.tsx`, `src/app/page.tsx`, and `src/app/globals.css`). They are unmodified create-next-app defaults with no reusable component layer to preserve.
- Lazyweb: skipped because the user supplied the product direction and required reference set, and limited work to the local workspace.
- Imagen drafts: skipped because no image-generation tool is available in the permitted local-workspace toolset.

## 1. Atmosphere & Identity

A quiet investment desk: calm enough to scan every morning, precise enough to trust with large numbers, and warm enough to avoid feeling institutional. The signature is **tonal accounting**—a white canvas where soft cool-gray surfaces group information without visual noise, while one trust-blue action and restrained red/blue performance marks make meaning immediate. The memorable moment is the oversized total asset figure aligned with a compact daily-return signal, followed by a deliberately uneven widget grid.

## 2. Color

### Palette

| Role | Token | Value | Usage |
|---|---|---:|---|
| Canvas | `--canvas` | `#ffffff` | Page background |
| Surface/subtle | `--surface-subtle` | `#f7f8fa` | Primary widget cards |
| Surface/strong | `--surface-strong` | `#f2f4f6` | Selected controls, chart wash |
| Surface/raised | `--surface-raised` | `#ffffff` | Small nested rows |
| Text/primary | `--text-primary` | `#191f28` | Financial values, headings |
| Text/secondary | `--text-secondary` | `#4e5968` | Body and supporting values |
| Text/tertiary | `--text-tertiary` | `#65707d` | Labels and timestamps |
| Text/disabled | `--text-disabled` | `#8b95a1` | Inactive navigation |
| Border/subtle | `--border-subtle` | `#e5e8eb` | Hairlines and chart grid |
| Accent/primary | `--accent-primary` | `#246beb` | Links, focus, primary action |
| Accent/hover | `--accent-hover` | `#1b5fd1` | Action hover |
| Accent/soft | `--accent-soft` | `#eaf2ff` | Blue icon and selection surface |
| Performance/gain | `--performance-gain` | `#f04452` | Positive return values |
| Performance/gain on dark | `--performance-gain-on-dark` | `#ff7783` | Positive return on dark surfaces |
| Performance/gain-soft | `--performance-gain-soft` | `#fff0f1` | Positive status surface |
| Performance/loss | `--performance-loss` | `#246beb` | Negative return values |
| Performance/loss-soft | `--performance-loss-soft` | `#eaf2ff` | Negative status surface |
| Status/warning | `--status-warning` | `#b95000` | Attention labels |
| Status/warning-soft | `--status-warning-soft` | `#fff4e5` | Attention surfaces |

### Rules

- Blue is functional: navigation state, links, controls, focus, and losses. It is never ambient decoration.
- Korean market convention is used for performance: red means gain and blue means loss.
- Korean won values use the native `원` suffix to avoid the Won glyph's horizontal strokes reading as a strikethrough beside large figures.
- Widget hierarchy comes from tonal surfaces, not colored card backgrounds.
- Raw color values appear only in this document and the CSS token definitions that implement it.

## 3. Typography

### Scale

| Level | Token | Size | Weight | Line height | Tracking | Usage |
|---|---|---:|---:|---:|---:|---|
| Asset/display | `--text-asset` | `clamp(2.5rem, 6vw, 4.5rem)` | 700 | 1.04 | `-0.045em` | Total assets |
| Page title | `--text-page-title` | `2rem` | 700 | 1.2 | `-0.035em` | Greeting/title |
| Widget metric | `--text-widget-metric` | `1.75rem` | 700 | 1.2 | `-0.03em` | Card totals |
| Compact metric | `--text-compact-metric` | `1.5rem` | 700 | 1.25 | `-0.025em` | Metrics in narrow grid spans |
| Section title | `--text-section-title` | `1.125rem` | 700 | 1.4 | `-0.02em` | Widget headings |
| Body | `--text-body` | `1rem` | 500 | 1.55 | `-0.01em` | Navigation and rows |
| Body/small | `--text-body-small` | `0.875rem` | 500 | 1.5 | `-0.005em` | Supporting information |
| Caption | `--text-caption` | `0.75rem` | 600 | 1.4 | `0` | Metadata and axis labels |

### Font Stack

- Primary: `Geist`, `Apple SD Gothic Neo`, `Noto Sans KR`, `Malgun Gothic`, system sans-serif.
- Numeric: the same stack with tabular numbers enabled; this preserves a single restrained voice while stabilizing financial columns.
- Mono/serif: not used in the initial dashboard.

### Rules

- Large financial values lead; labels stay compact and neutral.
- Body text never drops below the caption token and interactive labels never below body/small.
- Korean labels use natural sentence case; no decorative uppercase.

## 4. Spacing & Layout

### Base Unit

All spacing derives from a **4px** base.

| Token | Value | Usage |
|---|---:|---|
| `--space-1` | `0.25rem` | Icon details |
| `--space-2` | `0.5rem` | Tight inline groups |
| `--space-3` | `0.75rem` | Compact rows |
| `--space-4` | `1rem` | Mobile gutters and row padding |
| `--space-5` | `1.25rem` | Card content groups |
| `--space-6` | `1.5rem` | Default widget padding and grid gap |
| `--space-8` | `2rem` | Large card padding and section gap |
| `--space-10` | `2.5rem` | Hero rhythm |
| `--space-12` | `3rem` | Page section separation |
| `--space-16` | `4rem` | Desktop hero rhythm |

### Grid

- Maximum content width: `76rem`.
- Page frame: centered content with fluid gutters, minimum `--space-4` and desktop `--space-8`.
- Dashboard: 12-column grid at wide widths; widgets declare spans of 4, 5, 7, 8, or 12 columns.
- Tablet: the 12-column grid begins at 768px, yielding practical 1/3 + 2/3 and 5/12 + 7/12 pairs. Mobile: one readable column at 375px with no primary horizontal scroll.
- Page frame and document own vertical scrolling. Header is sticky; no nested widget scrollbars in the initial screen.
- The widget grid uses overflow-safe tracks. Content groups use `stack` and `cluster` primitives; the allocation card uses a `sidebar`-like split when space permits.

## 5. Components

### App Header

- **Structure**: `header > nav > brand + primary links + action cluster`.
- **Variants**: desktop navigation; compact mobile action row.
- **Spacing**: `--space-4`, `--space-6`, `--space-8`.
- **States**: current link, default, hover, active, focus-visible.
- **Accessibility**: labelled primary navigation, current page via `aria-current`, 44px minimum pointer target.
- **Motion**: color and transform only, using micro timing.
- **Layout**: full-width sticky cluster; document remains the scroll owner.

### Widget Frame

- **Structure**: semantic `section` or `article` with header, optional action, and body slot.
- **Variants**: standard tonal, white nested surface, wide chart.
- **Spacing**: `--space-5` mobile and `--space-6` desktop.
- **States**: default; links inside provide hover/active/focus states. Static cards do not lift or animate.
- **Accessibility**: labelled by its visible heading; logical heading order.
- **Motion**: none on the frame; interaction feedback belongs to controls.
- **Layout**: stack within a data-driven grid; page document scrolls.

### Metric Summary

- **Structure**: label, primary value, optional signed change and context.
- **Variants**: hero, compact, gain, loss, neutral.
- **Spacing**: `--space-2` and `--space-3`.
- **States**: static; no misleading hover affordance.
- **Accessibility**: signed values include readable context, never color alone.
- **Motion**: none.
- **Layout**: vertical stack.

### Data Row

- **Structure**: identity cluster, optional secondary text, value cluster.
- **Variants**: watchlist, news, alert.
- **Spacing**: `--space-3` and `--space-4`.
- **States**: default, hover, active, focus-visible when linked.
- **Accessibility**: meaningful link labels, visible focus, text labels accompany colored status.
- **Motion**: micro color/transform feedback only.
- **Layout**: two-sided cluster that wraps before overflow.

### Segmented Control

- **Structure**: labelled group of native buttons.
- **Variants**: selected and unselected periods.
- **Spacing**: `--space-1`, `--space-2`, `--space-3`.
- **States**: default, hover, active, focus-visible, selected.
- **Accessibility**: native buttons, `aria-pressed` for selected period.
- **Motion**: micro background/text transition; no sliding layout animation.
- **Layout**: wrapping cluster.

### Allocation Legend

- **Structure**: accessible SVG donut plus labelled percentage list.
- **Variants**: fixed semantic asset colors drawn from existing palette roles.
- **Spacing**: `--space-2`, `--space-4`, `--space-6`.
- **States**: static in the initial screen.
- **Accessibility**: SVG has an accessible title/description; values are duplicated as text.
- **Motion**: none.
- **Layout**: switcher from side-by-side to stacked.

## 6. Motion & Interaction

| Type | Token | Duration | Easing | Usage |
|---|---|---:|---|---|
| Micro | `--duration-micro` | `120ms` | `ease-out` | Press, color response |
| Standard | `--duration-standard` | `220ms` | `ease-in-out` | Selection state |

- Motion only communicates affordance or state. Static financial content does not animate.
- Interactive press feedback may use a subtle `transform: scale(0.98)`.
- Only `transform`, `opacity`, and color transitions are used; layout properties never animate.
- `prefers-reduced-motion: reduce` removes non-essential transitions and transforms.

## 7. Depth & Surface

The strategy is **tonal shift with selective hairlines**. Main widgets sit on `--surface-subtle` with no shadow. Nested rows use `--surface-raised`; chart guides and structural separators use `--border-subtle`. A single ultra-soft header shadow may clarify the sticky layer after scrolling, but cards never use generic elevation shadows. Corner radii are tokenized: `--radius-small` (10px), `--radius-medium` (16px), and `--radius-large` (24px).

## 8. Accessibility Constraints & Accepted Debt

### Personas

- A frequent investor scanning totals quickly on desktop.
- A mobile user checking holdings one-handed during a commute.
- A low-vision user who needs strong text contrast, stable hierarchy, and visible keyboard focus.
- A color-vision-deficient user who requires signs and labels in addition to red/blue coding.

### Constraints

- WCAG 2.2 AA target: 4.5:1 for body text and 3:1 for large text and UI boundaries.
- Semantic landmarks, logical heading order, native controls, and visible focus are mandatory.
- Color never communicates gain/loss alone; signed values and plain-language labels accompany it.
- Touch targets are at least 44px where controls are presented.
- At 200% zoom and 375px width, primary content reflows without horizontal scrolling.
- Reduced-motion preferences are respected.

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
|---|---|---|---|
| Mock financial values are static | Dashboard widgets | Live feeds and APIs are explicitly out of scope | Replace when a typed data boundary is designed |
| Period controls are presentational | Performance chart | Initial screen prioritizes extensible structure without client state | Wire to chart state in the interaction phase |
