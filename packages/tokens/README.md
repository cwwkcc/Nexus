# @nexus/tokens

Design tokens for the Nexus design system.

This package contains the single source of truth for all design decisions:

- Colors (semantic and primitives)
- Spacing scale
- Typography (font sizes, line heights, letter spacing)
- Border radius
- Shadows
- Z-index scale
- Opacity
- Blur
- Aspect ratios
- Gradients
- Sizing
- Glass effects
- Focus states

## Usage

```typescript
import { colors, spacing, fontSize } from '@nexus/tokens';
```

## Purpose

Design tokens are application data, not tool configuration. They represent:

- What is our brand's primary color?
- What spacing scale do we use?
- What border radius is "lg"?
- What font sizes exist?

These are consumed by:

- `@nexus/ui` → component styling
- Tailwind preset → generates the theme
- CSS variables → generated from the same tokens
- Documentation and Storybook
