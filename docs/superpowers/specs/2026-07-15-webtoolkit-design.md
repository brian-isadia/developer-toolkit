# WebToolkit — Design Spec

**Date:** 2026-07-15
**Status:** Approved
**Summary:** A polished, public-facing collection of 33 browser-based tools for web developers, organized by category in a dark-first sidebar + main content layout.

---

## 1. Overview

WebToolkit is a comprehensive web developer toolkit — a single destination offering 33 client-side tools across 7 categories. All processing runs in the browser (no server APIs). The target audience is web developers who need quick access to color converters, CSS generators, encoding utilities, and more.

### Goals

- Polished public tool — shareable, SEO-friendly, memorable
- Dark-first developer aesthetic (Linear/Raycast vibe)
- Fast and keyboard-friendly (Cmd+K command palette)
- Every tool is independently routable and linkable

### Stack

- TanStack Start (SSR) + React 19
- TanStack Router (file-based routing)
- Tailwind CSS v4 + shadcn/ui (new-york, zinc, lucide)
- Bun runtime, Biome linting, Vitest testing

---

## 2. Layout & Navigation

### Shell (100svh)

- **Sidebar** (left): 280px expanded, 64px collapsed
- **Main content** (right): fills remaining width, independently scrollable
- Sidebar collapse state persisted to localStorage
- Toggle button at top of sidebar

### Sidebar Structure (top → bottom)

1. **App logo/title** — "WebToolkit", collapses to icon-only
2. **Search input** — focuses into `Cmd+K` palette
3. **Tool groups** — scrollable list, each group:
   - Header: icon + label + tool count badge (e.g., "Colors (6)")
   - Indented list of tool links (active state highlighted)
   - Groups are collapsible/expandable
4. **Collapsed state**: group icons only, hover shows tooltip, click opens floating menu of tools in that group

### Command Palette (Cmd+K / Ctrl+K)

- Full-screen overlay with search input
- Fuzzy search across all tool names + descriptions
- Keyboard navigable (arrow keys + enter)
- Shows tool icon, name, and group
- Recently used tools shown at top (from localStorage)

### Routing

Each tool has its own URL for shareability and SEO:

```
/                              → Landing/home page
/colors/color-converter        → Color Format Converter
/colors/contrast-checker       → Contrast Checker
/css/box-shadow                → Box Shadow Generator
...etc (full map in Section 3)
```

---

## 3. Tool Catalog (33 tools, 7 groups)

### 🎨 Colors (6 tools)

| Route Slug | Tool | Description |
|-----------|------|-------------|
| `color-converter` | Color Format Converter | Hex ↔ OKLCH ↔ RGB ↔ HSL with live preview swatch and copy-to-clipboard per format |
| `contrast-checker` | Contrast Checker | Foreground + background color inputs, shows WCAG AA/AAA and APCA scores with pass/fail badges |
| `palette-generator` | Palette Generator | Generate harmonious palettes (complementary, analogous, triadic, split-complementary) from a seed color |
| `color-blindness` | Color Blindness Simulator | Preview any color or palette through protanopia, deuteranopia, tritanopia filters |
| `gradient-generator` | Gradient Generator | Visual builder for linear, radial, conic gradients with angle/position controls, outputs CSS |
| `tailwind-color-finder` | Tailwind Color Finder | Paste any color, find the nearest Tailwind CSS color class match |

### ✏️ CSS (5 tools)

| Route Slug | Tool | Description |
|-----------|------|-------------|
| `box-shadow` | Box Shadow Generator | Visual editor with multiple layers, blur, spread, offset, color. Live preview + CSS output |
| `border-radius` | Border Radius Visualizer | Individual corner control with visual preview, outputs CSS shorthand |
| `easing-editor` | Easing Editor | Cubic-bezier curve editor with presets (ease-in, ease-out, etc.), animation preview strip |
| `grid-generator` | CSS Grid Generator | Define rows/columns/gap visually, drag to place items, outputs CSS Grid code |
| `glassmorphism` | Glassmorphism Generator | Backdrop-filter builder with blur, saturation, opacity controls on a customizable background |

### 🔤 Typography (4 tools)

| Route Slug | Tool | Description |
|-----------|------|-------------|
| `fluid-type-scale` | Fluid Type Scale Calculator | Input min/max viewport + font sizes, generates CSS `clamp()` values for a full type scale |
| `font-pair-previewer` | Font Pair Previewer | Browse curated Google Font pairings, live preview with custom sample text |
| `line-height-calculator` | Line Height Calculator | Input font size, suggests optimal line-height based on content type (body, headings, UI) |
| `text-stroke-shadow` | Text Stroke & Shadow | Visual editor for `text-shadow` and `-webkit-text-stroke`, live preview |

### 🔄 Converters (5 tools)

| Route Slug | Tool | Description |
|-----------|------|-------------|
| `px-rem` | px ↔ rem Converter | Bidirectional conversion with configurable base font size |
| `svg-optimizer` | SVG Optimizer | Paste SVG, optimize with SVGO-like rules, show before/after size, preview |
| `markdown-html` | Markdown ↔ HTML | Split-pane editor — write markdown on left, see rendered HTML + raw HTML output on right |
| `image-to-base64` | Image to Base64 | Drop/upload image, get Base64 data URI + size comparison |
| `image-format-converter` | Image Format Converter | Convert between PNG ↔ WebP ↔ JPEG ↔ AVIF, quality slider, size comparison, client-side via Canvas/WebCodecs API |

### 🔐 Encoding (5 tools)

| Route Slug | Tool | Description |
|-----------|------|-------------|
| `base64` | Base64 Encode/Decode | Bidirectional text/file Base64 encoding with auto-detection |
| `url-encode` | URL Encode/Decode | Encode/decode URI components with explanation of what changed |
| `json-formatter` | JSON Formatter | Paste JSON, auto-format/validate with syntax highlighting + error reporting |
| `jwt-decoder` | JWT Decoder | Paste JWT, decode header/payload/signature with expiry check |
| `html-entity-encoder` | HTML Entity Encoder | Encode/decode HTML entities, shows character codes |

### ⚡ Generators (5 tools)

| Route Slug | Tool | Description |
|-----------|------|-------------|
| `uuid` | UUID Generator | Generate v4 UUIDs (single or bulk), one-click copy |
| `lorem-ipsum` | Lorem Ipsum Generator | Generate paragraphs/sentences/words with configurable count |
| `meta-tag` | Meta Tag Generator | Fill in a form, outputs `<meta>` tags for SEO, OG, Twitter cards |
| `favicon` | Favicon Generator | Upload image or pick emoji, generates multi-size favicon set with download |
| `robots-txt` | robots.txt Builder | Visual builder with common presets (allow all, block AI bots, etc.) |

### 📊 Preview & Debug (3 tools)

| Route Slug | Tool | Description |
|-----------|------|-------------|
| `open-graph` | Open Graph Preview | Enter a URL or fill fields manually, see Facebook/LinkedIn/Discord preview cards |
| `responsive-breakpoints` | Responsive Breakpoint Previewer | Enter a URL, see it rendered at common breakpoints side-by-side |
| `json-ld-builder` | JSON-LD Builder | Build structured data (Article, FAQ, Product) with form UI, validates against schema.org |

---

## 4. Visual Design

### Color System

- **Background:** Deep charcoal/near-black (`oklch(0.13 0.005 285)` range)
- **Sidebar surface:** Slightly lighter than background for depth separation
- **Cards/tool containers:** Subtle elevated surfaces with `1px` border at ~8% white opacity
- **Accent color:** Muted neon blue-violet (Linear-style) for active states, links, focus rings
- **Primary text:** High-contrast off-white
- **Secondary text:** Muted gray for descriptions and labels

### Typography

- **Poppins** — Headings and UI text (already loaded)
- **Monospace font** (Geist Mono or JetBrains Mono) — Code outputs, values, generated code blocks

### Micro-Interactions

- Sidebar tool links: subtle highlight slide on hover
- Copy-to-clipboard: brief "Copied!" toast/tooltip with checkmark animation
- Tool inputs: smooth border-glow transition on focus (accent color)
- Sidebar collapse: animated width transition (~200ms ease-out)
- Command palette: fade + scale-up entrance
- Tool cards on home page: subtle glow/lift on hover

### Consistent Tool Layout

Every tool page follows the same structure:

1. **Header:** Tool title + one-line description
2. **Controls:** Interactive inputs/editors (middle section)
3. **Output:** Result display with syntax-highlighted code block and one-click copy button
4. **Related tools:** Links to other tools in the same group (bottom)

---

## 5. Technical Architecture

### File Structure

```
src/
├── routes/
│   ├── __root.tsx                        → HTML shell
│   ├── _app.tsx                          → Layout route (sidebar + main content shell)
│   ├── _app/
│   │   ├── index.tsx                     → Home/landing page
│   │   ├── colors/
│   │   │   ├── color-converter.tsx
│   │   │   ├── contrast-checker.tsx
│   │   │   ├── palette-generator.tsx
│   │   │   ├── color-blindness.tsx
│   │   │   ├── gradient-generator.tsx
│   │   │   └── tailwind-color-finder.tsx
│   │   ├── css/
│   │   │   ├── box-shadow.tsx
│   │   │   ├── border-radius.tsx
│   │   │   ├── easing-editor.tsx
│   │   │   ├── grid-generator.tsx
│   │   │   └── glassmorphism.tsx
│   │   ├── typography/
│   │   │   ├── fluid-type-scale.tsx
│   │   │   ├── font-pair-previewer.tsx
│   │   │   ├── line-height-calculator.tsx
│   │   │   └── text-stroke-shadow.tsx
│   │   ├── converters/
│   │   │   ├── px-rem.tsx
│   │   │   ├── svg-optimizer.tsx
│   │   │   ├── markdown-html.tsx
│   │   │   ├── image-to-base64.tsx
│   │   │   └── image-format-converter.tsx
│   │   ├── encoding/
│   │   │   ├── base64.tsx
│   │   │   ├── url-encode.tsx
│   │   │   ├── json-formatter.tsx
│   │   │   ├── jwt-decoder.tsx
│   │   │   └── html-entity-encoder.tsx
│   │   ├── generators/
│   │   │   ├── uuid.tsx
│   │   │   ├── lorem-ipsum.tsx
│   │   │   ├── meta-tag.tsx
│   │   │   ├── favicon.tsx
│   │   │   └── robots-txt.tsx
│   │   └── preview/
│   │       ├── open-graph.tsx
│   │       ├── responsive-breakpoints.tsx
│   │       └── json-ld-builder.tsx
├── components/
│   ├── ui/                               → shadcn/ui components
│   ├── layout/
│   │   ├── sidebar.tsx                   → Sidebar with groups, collapse, tooltips
│   │   ├── sidebar-group.tsx             → Collapsible group with tool links
│   │   └── tool-page-layout.tsx          → Shared tool page wrapper (title, description, related tools)
│   ├── command-palette.tsx               → Cmd+K overlay
│   ├── code-output.tsx                   → Syntax-highlighted output with copy button
│   ├── color-swatch.tsx                  → Reusable color preview square
│   └── copy-button.tsx                   → One-click copy with "Copied!" feedback
├── lib/
│   ├── utils.ts                          → shadcn cn() utility (existing)
│   ├── color.ts                          → Color conversion math (Hex ↔ RGB ↔ HSL ↔ OKLCH)
│   └── tool-registry.ts                  → Central registry: all tool metadata (name, slug, group, icon, description)
├── hooks/
│   ├── use-persisted-state.ts            → useState + localStorage wrapper
│   └── use-copy-to-clipboard.ts          → Copy with toast feedback
└── styles.css                            → Tailwind config + design tokens (existing)
```

### Tool Registry

A single `toolRegistry.ts` file defines all 33 tools. Both the sidebar and command palette consume it:

```ts
type ToolGroup = {
  id: string;
  label: string;
  icon: LucideIcon;
  tools: Tool[];
};

type Tool = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  path: string;          // e.g., "/colors/color-converter"
  keywords: string[];    // for fuzzy search in command palette
};
```

### Shared Hooks

- **`usePersistedState(key, defaultValue)`** — Wraps `useState` + `localStorage`. Each tool uses it for its inputs. Handles SSR safely (reads from localStorage only on mount).
- **`useCopyToClipboard()`** — Returns `{ copy, copied }`. Shows brief "Copied!" state for ~2 seconds.

### Key Libraries (to add)

| Library | Purpose |
|---------|---------|
| `cmdk` | Command palette UI (battle-tested, accessible) |
| `shiki` or `prism-react-renderer` | Syntax highlighting for code outputs |
| `marked` or `markdown-it` | Markdown → HTML conversion (for the Markdown tool) |
| `svgo` (wasm or browser build) | SVG optimization |

### Processing

All tool logic runs client-side. No server endpoints needed.

- Color math: custom `lib/color.ts` (Hex ↔ RGB ↔ HSL ↔ OKLCH conversions)
- Image format conversion: Canvas API + `toBlob()` with format/quality params, WebCodecs for AVIF where supported
- SVG optimization: browser-compatible SVGO or a lightweight custom optimizer
- JWT decoding: simple Base64 decode of the two payload segments (no crypto needed for decode-only)

---

## 6. Home Page

- **Hero section:** App name, tagline ("33 tools to make web development faster"), prominent search bar (opens Cmd+K on focus)
- **Tool grid:** Cards organized by group, each showing icon + name + one-line description
- **Card interaction:** Hover glow/lift effect, click navigates to tool
- **Group sections:** Visually separated with section headers

---

## 7. SEO

- Each tool route sets its own `<title>` and `<meta name="description">` via TanStack Router's `head` API
- Title format: `"[Tool Name] — WebToolkit"`
- Proper heading hierarchy (single `<h1>` per page)
- Semantic HTML throughout

---

## 8. State Persistence

- **Tool inputs:** Saved to localStorage via `usePersistedState` hook. Each tool has a unique key (e.g., `webtoolkit:colors:color-converter`).
- **Sidebar collapse:** `webtoolkit:sidebar-collapsed` (boolean)
- **Sidebar group expansion:** `webtoolkit:sidebar-groups` (object of group → expanded boolean)
- **Recent tools:** `webtoolkit:recent-tools` (array of slugs, max 5, used by command palette)

---

## 9. Scope & Non-Goals

### In scope

- 33 client-side tools across 7 groups
- Dark-first design with polished UI
- Collapsible sidebar, command palette, localStorage persistence
- SEO-optimized routes
- Responsive layout (sidebar collapses on smaller screens)

### Not in scope (for now)

- User accounts / authentication
- Server-side processing or APIs
- Tool favoriting / pinning (possible future enhancement)
- Shareable state via URL query params (possible future enhancement)
- Light mode toggle (possible future enhancement)
- i18n / localization
