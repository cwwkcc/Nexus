## Purpose

The Grid component provides a responsive, token‑based layout system for arranging content in rows and columns. It replaces ad‑hoc CSS Grid declarations and ensures that column counts, gaps, and item spans are consistent across the entire website.

Every multi‑column layout (card grids, form side‑by‑side fields, gallery masonry) must use `Grid` + `GridItem`. No raw `grid` classes with hardcoded `grid-cols-*` values.

---

## Variants

The Grid system has two components:

| Component | Purpose |
|-----------|---------|
| `Grid` | The container that defines the number of columns and the gap between them. |
| `GridItem` | An individual cell that can optionally span multiple columns. |

There is no “variant” prop – the behaviour is controlled via props.

---

## Props

### Grid

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | (required) | Grid items (usually `GridItem` components, but any element works). |
| `columns` | `1 \| 2 \| 3 \| 4 \| 6 \| 12` | `3` | Number of columns in the grid. Responsive: mobile uses 1 column, tablet uses 2, desktop uses the full value (except for `12` which stays 12). |
| `gap` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 \| 11 \| 12` | `6` | Gap between rows and columns in `space-*` tokens (6 = 24px). |
| `as` | `'div' \| 'ul'` | `div` | Semantic HTML element. Use `ul` when the grid contains a list of items. |
| `className` | `string` | – | Additional Tailwind classes. |

### GridItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | (required) | Content of the grid cell. |
| `colSpan` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9 \| 10 \| 11 \| 12` | – | Number of columns this item should span. Responsive: on mobile, spans at most 6 columns (full width). On desktop, spans the exact number. |
| `className` | `string` | – | Additional Tailwind classes. |

---

## Layout & Responsive Behavior

### Column responsiveness

| `columns` prop | Mobile (< 768px) | Tablet (768–1023px) | Desktop (≥1024px) |
|----------------|------------------|----------------------|--------------------|
| `1` | 1 column | 1 column | 1 column |
| `2` | 1 column | 2 columns | 2 columns |
| `3` | 1 column | 2 columns | 3 columns |
| `4` | 1 column | 2 columns | 4 columns |
| `6` | 2 columns | 3 columns | 6 columns |
| `12` | 12 columns (collapses to full width on narrow screens) | 12 columns | 12 columns |

**Why this behaviour?**  
- On mobile, single‑column layouts are easiest to read.  
- Tablet gets a balanced two‑ or three‑column layout.  
- Desktop shows the full intended column count.

### GridItem colSpan responsiveness

- On mobile ( < 768px), `colSpan` is clamped to a maximum of **6**.  
  - If you set `colSpan={8}`, it behaves as `colSpan={6}` on mobile (full width in a 6‑column grid).  
- On desktop, the exact `colSpan` value is used.  
- For `columns={12}`, you can use any span from 1 to 12.

### Example: 3‑column card grid

```tsx
<Grid columns={3} gap={6}>
  {cards.map(card => (
    <GridItem key={card.id}>
      <NewsCard {...card} />
    </GridItem>
  ))}
</Grid>
```

On mobile: 1 card per row.  
On tablet: 2 cards per row.  
On desktop: 3 cards per row.

### Example: 12‑column layout with different spans

```tsx
<Grid columns={12} gap={4}>
  <GridItem colSpan={3}>Sidebar</GridItem>
  <GridItem colSpan={9}>Main content</GridItem>
</Grid>
```

On mobile: both take full width (stack).  
On desktop: sidebar occupies 3/12, main content 9/12.

---

## Spacing Specifications

The `gap` prop uses the same spacing token index as Stack:

| Value | Token | Pixels |
|-------|-------|--------|
| `0` | `gap-0` | 0px |
| `1` | `gap-space-1` | 4px |
| `2` | `gap-space-2` | 8px |
| `3` | `gap-space-3` | 12px |
| `4` | `gap-space-4` | 16px |
| `5` | `gap-space-5` | 20px |
| `6` | `gap-space-6` | 24px (default) |
| `7` | `gap-space-7` | 28px |
| `8` | `gap-space-8` | 32px |
| `9` | `gap-space-9` | 36px |
| `10` | `gap-space-10` | 40px |
| `11` | `gap-space-11` | 44px |
| `12` | `gap-space-12` | 48px |

**Rule:** Always use a defined gap value. Never apply arbitrary `gap-*` classes manually.

---

## Token Usage

### Tailwind classes (internal)

| Prop | Generated class |
|------|-----------------|
| `columns={3}` | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| `columns={12}` | `grid grid-cols-12` |
| `gap={6}` | `gap-space-6` |
| `colSpan={4}` | `col-span-4 md:col-span-4` (clamped on mobile) |

All spacing, colour, and typography inside grid items must still use design tokens – the Grid itself only handles layout.

---

## Accessibility

- **Semantic `as` prop** – Use `as="ul"` when the grid contains a list of related items (e.g., card grids). Screen readers will announce the list context.
- **Focus order** – Grid uses CSS Grid, which follows source order. Do not rely on visual position for logical order; ensure DOM order matches reading order.
- **Responsive spans** – Changing column spans does not affect accessibility; it’s purely visual.

---

## Implementation Notes

### Never use raw CSS Grid

❌ Bad:
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
```

✅ Good:
```tsx
<Grid columns={3} gap={6}>
```

### GridItem is optional

You can place any element directly inside `Grid` – it will automatically be placed into the grid. However, if you need to control column spans, you must wrap the element in `GridItem`.

### Combining with Container

Grids are often placed inside a `Container` to constrain max width:

```tsx
<Container size="lg">
  <Grid columns={3} gap={8}>
    ...
  </Grid>
</Container>
```

### Nested grids

Grids can be nested, but avoid deep nesting for performance. Prefer a single Grid with appropriate `colSpan` values.

---

## Related Components

- `Container` – for horizontal centering and max‑width.
- `Stack` (VStack / HStack) – for one‑dimensional layouts where Grid would be overkill.
- `MasonryGrid` – for uneven‑height photo layouts (Gallery page only).

---

_Nexus Design System – Grid Components_  
_C.W.W. Kannangara Central College, Mathugama_  
_Maintained by Kannangara ICT Society (KITS)_  
_© 2026_
