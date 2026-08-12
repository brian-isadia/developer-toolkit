## Why

The `CodeOutput` component currently hardcodes a dark background (`bg-[oklch(0.15_0.005_285)]`), preventing it from updating its color scheme when switching between light and dark themes in the user interface. Updating it to use theme-aware semantic color utility classes ensures a visual appearance consistent with the rest of the application across all themes.

## What Changes

- Update `CodeOutput` background and text styling to use semantic theme tokens (`bg-muted`, `text-foreground`, etc.).
- Ensure header/label section and copy button maintain high contrast and proper border styling in both light and dark modes.

## Capabilities

### New Capabilities
- `code-output-display`: Theme-responsive code output display component supporting code blocks, optional labels, and copy-to-clipboard action.

### Modified Capabilities
<!-- None -->

## Impact

- `src/components/code-output.tsx`: Component styling updated to respond dynamically to theme changes.
- All tools and pages utilizing `CodeOutput` will automatically inherit theme-aware styling.
