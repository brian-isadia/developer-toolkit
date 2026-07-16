## Context

The webtoolkit is a TanStack Start (SSR) + React 19 application that provides browser-based developer tools. The codebase follows a consistent pattern: each tool is a route file in `src/routes/<category>/<tool-slug>.tsx` that uses the `ToolPageLayout` wrapper component. Shared UI is provided by shadcn components (`Button`, `Input`, `Textarea`, `Select`, `Slider`, `Switch`, `Tabs`, `Label`, `Card`, `Badge`, etc.) and custom utility components (`CopyButton`, `CodeOutput`).

Six of the 33 registered tools currently render a "coming soon" placeholder. The routes and tool registry entries already exist — only the component implementations need to be filled in.

## Goals / Non-Goals

**Goals:**
- Implement all 6 placeholder tools as fully functional, client-side-only tools
- Match the existing UI conventions (sidebar controls + output area pattern, or dual-panel layout)
- Each tool should be immediately useful with no external dependencies or server calls
- Generate copy-ready output (HTML tags, text files, JSON-LD) using the existing `CodeOutput` and `CopyButton` components

**Non-Goals:**
- Server-side URL fetching for OG Preview (use manual input instead)
- Real-time schema.org API validation for JSON-LD (use local type definitions)
- ICO file format generation for Favicon (use PNG at standard sizes)
- Comprehensive robots.txt linting or parsing from existing files

## Decisions

### 1. Favicon Generator: Canvas API + Blob download

**Decision**: Use the HTML Canvas API to render uploaded images or emoji text at multiple sizes, then use `canvas.toBlob()` for PNG downloads.

**Alternatives considered**:
- _OffscreenCanvas_: Better performance but less browser support. Canvas is sufficient for this use case.
- _Server-side sharp/imagemagick_: Would require a server function. Unnecessary since Canvas handles the core resizing.

**Approach**: User picks an emoji (with a curated grid) or uploads an image file. The tool renders a preview at 16, 32, 48, 180, and 192px. A "Download" button saves individual PNGs. A `CodeOutput` block shows the `<link>` tags for the HTML head.

### 2. Meta Tag Generator: Form → live code output

**Decision**: A straightforward form with sections for Basic SEO, Open Graph, and Twitter Card. Output is a live-updating `<head>` code block using `CodeOutput`.

**Approach**: Left sidebar with form fields (title, description, keywords, og:type, og:image, twitter:card, twitter:site, etc.). Right panel shows the generated HTML. Form state drives the output reactively via `useState`.

### 3. robots.txt Builder: Rule list + presets

**Decision**: Visual rule editor where users add User-agent blocks with Allow/Disallow rules, plus a Sitemap field and Crawl-delay. Include preset buttons for common configs.

**Alternatives considered**:
- _Free-form text editor with validation_: Less approachable for users who don't know the format.
- _Single-agent mode only_: Too limited. Supporting multiple user-agent blocks is more useful.

**Approach**: Left panel has an "Add Rule Group" button that creates a user-agent block. Each block has inputs for the agent name and a list of path rules (allow/disallow toggles). Presets: "Allow All", "Block All", "Block AI Crawlers". Right panel shows the generated robots.txt text in `CodeOutput`.

### 4. Open Graph Preview: Manual input + platform card mockups

**Decision**: Manual input of OG fields (not URL fetching) with visual card mockups for Facebook, Twitter/X, LinkedIn, and Discord.

**Alternatives considered**:
- _URL fetching via `createServerFn`_: Would be useful but adds server dependency, CORS complexity, and error handling for unreachable sites. Can be added later as an enhancement.
- _Single generic card_: Less useful than showing platform-specific rendering differences.

**Approach**: Left panel with input fields for og:title, og:description, og:image (URL), og:url, og:site_name, twitter:card type. Right panel renders 4 card mockup components styled to match each platform's actual card appearance. Use Tabs to switch between platform previews.

### 5. Responsive Breakpoint Previewer: Iframe-based with preset widths

**Decision**: Render the user's URL in an iframe at preset device widths. Show breakpoints as selectable presets or all side-by-side.

**Approach**: Input field for URL at the top. Below it, a row of device preset buttons (Mobile 375px, Tablet 768px, Desktop 1024px, Wide 1440px). The main area renders the iframe at the selected width, centered, with a visual device frame indicator (just a border + label). Include a "View All" mode that shows all breakpoints stacked vertically. Note: many external sites block iframe embedding via X-Frame-Options — the tool is most useful for local dev URLs, and we'll show a helpful message if an iframe fails to load.

### 6. JSON-LD Builder: Schema type selector + dynamic form

**Decision**: Support 6 common schema.org types with type-specific form fields, generating valid JSON-LD output.

**Alternatives considered**:
- _Raw JSON editor with validation_: Defeats the purpose of a "builder" tool.
- _Exhaustive schema.org coverage_: Scope creep. Start with the most commonly used types and expand later.

**Approach**: Top-level Select for schema type (Article, Product, FAQ, Organization, LocalBusiness, BreadcrumbList). Below it, a dynamic form that renders fields specific to the selected type. FAQ type allows adding multiple question/answer pairs. BreadcrumbList allows adding ordered items. Output panel shows the generated `<script type="application/ld+json">` block via `CodeOutput`.

## Risks / Trade-offs

- **Iframe content blocking** → The Responsive Breakpoint Previewer won't work for sites that set `X-Frame-Options: DENY` or strict CSP. Mitigation: show a user-friendly error message explaining the limitation and suggesting it's best for local dev URLs.
- **Emoji rendering inconsistency** → The Favicon Generator's emoji rendering varies by OS/browser. Mitigation: use a standard system font stack and document that output may differ by platform.
- **Canvas quality for small sizes** → Downscaling to 16×16 can lose detail. Mitigation: use `imageSmoothingQuality: 'high'` on the canvas context.
- **JSON-LD schema coverage** → Only 6 types covered initially. Mitigation: the type system is extensible — new types can be added by adding a field definition object.
