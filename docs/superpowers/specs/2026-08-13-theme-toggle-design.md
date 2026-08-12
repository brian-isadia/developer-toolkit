# Design Spec: Light/Dark/System Theme Toggle

## Goal

Add full light and dark mode support to the Developer Toolkit (`webtoolkit`) application with a 3-way toggle (`Light`, `Dark`, `System`), top header bar controls, flash-of-unstyled-content (FOUC) prevention during Server-Side Rendering (SSR), and Command Palette integration.

---

## Requirements

1. **Theme Modes**: Support `light`, `dark`, and `system` (matches OS `prefers-color-scheme`).
2. **Persistence**: Store theme setting in `localStorage` under key `webtoolkit:theme`.
3. **Anti-FOUC**: Synchronously resolve and apply initial theme class (`dark`) in an inline `<head>` script during TanStack Start SSR hydration.
4. **Header Component**: Add a top navigation bar in `AppLayout` containing:
   - Command palette trigger button showing `⌘K` / `Ctrl+K`.
   - Theme toggle dropdown menu with active indicator icons (Sun, Moon, Monitor).
5. **Command Palette Integration**: Add actions in `CommandPalette` to switch to Light, Dark, or System mode directly.
6. **Code Quality**: Pass Biome linting, formatting, and Vitest test suite.

---

## Architectural Design

### 1. Styles (`src/styles.css`)

Split CSS variables into explicit `:root` (light default) and `.dark` (dark overrides).

```css
:root {
	--background: oklch(0.99 0.002 285);
	--foreground: oklch(0.14 0.005 285);
	--card: oklch(0.97 0.002 285);
	--card-foreground: oklch(0.14 0.005 285);
	--popover: oklch(0.99 0.002 285);
	--popover-foreground: oklch(0.14 0.005 285);
	--primary: oklch(0.55 0.18 260);
	--primary-foreground: oklch(0.99 0 0);
	--secondary: oklch(0.94 0.005 285);
	--secondary-foreground: oklch(0.2 0.01 285);
	--muted: oklch(0.94 0.005 285);
	--muted-foreground: oklch(0.45 0.01 285);
	--accent: oklch(0.92 0.01 285);
	--accent-foreground: oklch(0.14 0.005 285);
	--destructive: oklch(0.57 0.22 27);
	--destructive-foreground: oklch(0.99 0 0);
	--border: oklch(0.88 0.005 285);
	--input: oklch(0.88 0.005 285);
	--ring: oklch(0.55 0.18 260);
	--radius: 0.625rem;
}

.dark {
	--background: oklch(0.14 0.005 285);
	--foreground: oklch(0.985 0 0);
	--card: oklch(0.17 0.005 285);
	--card-foreground: oklch(0.985 0 0);
	--popover: oklch(0.17 0.005 285);
	--popover-foreground: oklch(0.985 0 0);
	--primary: oklch(0.7 0.15 260);
	--primary-foreground: oklch(0.1 0 0);
	--secondary: oklch(0.22 0.01 285);
	--secondary-foreground: oklch(0.985 0 0);
	--muted: oklch(0.22 0.01 285);
	--muted-foreground: oklch(0.7 0.01 285);
	--accent: oklch(0.25 0.02 285);
	--accent-foreground: oklch(0.985 0 0);
	--destructive: oklch(0.5 0.2 25);
	--destructive-foreground: oklch(0.985 0 0);
	--border: oklch(0.25 0.01 285);
	--input: oklch(0.25 0.01 285);
	--ring: oklch(0.7 0.15 260);
}
```

### 2. Theme Context (`src/components/theme-provider.tsx`)

- Provides `ThemeContext`:
  - `theme`: `"light" | "dark" | "system"`
  - `resolvedTheme`: `"light" | "dark"`
  - `setTheme(theme: Theme): void`
- Applies `.dark` class to `document.documentElement` when resolved theme is `"dark"`.
- Listens to `(prefers-color-scheme: dark)` media query for reactive updates when in `"system"` mode.

### 3. Anti-FOUC Script (`src/routes/__root.tsx`)

Injects an inline IIFE into `<head>`:
```javascript
(function() {
  try {
    var stored = localStorage.getItem('webtoolkit:theme');
    var theme = stored ? JSON.parse(stored) : 'system';
    var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
```

### 4. UI Layout & Components

- `src/components/header.tsx`: Top bar header with search input button (triggers command palette) and `ThemeToggle` dropdown button.
- `src/components/app-layout.tsx`: Incorporates `Header` at top of main content viewport.
- `src/components/command-palette.tsx`: Includes theme switching options in search list.

---

## Verification & Testing Strategy

1. **Unit Tests**: Add tests in `src/components/__tests__/theme-provider.test.tsx` verifying theme switching logic and localStorage persistence.
2. **Biome & Build**: Run `bun --bun run check` and `bun --bun run build` to guarantee type safety and zero lint errors.
