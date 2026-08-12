## Context

See `proposal.md` for motivation.
`src/components/code-output.tsx` currently specifies `bg-[oklch(0.15_0.005_285)]` on its container `<div/>`. This prevents Tailwind from resolving dynamic theme values when theme modes (light/dark) change.

## Goals / Non-Goals

**Goals:**
- Replace the hardcoded `oklch` background color with semantic Tailwind theme classes (`bg-muted/50` or `bg-muted`).
- Ensure consistent contrast, borders, and readability across both light and dark modes.

**Non-Goals:**
- Changing component props or interface contracts.
- Adding complex syntax highlighting or changing theme engine implementation.

## Decisions

### Decision 1: Use Tailwind Semantic CSS Tokens for Background and Borders
- **Choice**: Replace `bg-[oklch(0.15_0.005_285)]` with `bg-muted/50` or `bg-muted`.
- **Rationale**: Standardizes code block presentation across the project while automatically responding to theme changes via root CSS variables.
- **Alternatives Considered**: Defining custom CSS theme variables specifically for code output blocks. Rejected to avoid unnecessary complexity and adhere to existing UI conventions.

## Risks / Trade-offs

- [Risk] Visual contrast variation between light and dark themes → Mitigation: Standardize container styling with `bg-muted/50 border border-border` and text styling with `text-foreground font-mono`.
