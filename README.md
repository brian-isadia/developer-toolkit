# Webtoolkit 🛠️

A modern, elegant, local-first web application featuring a rich suite of developer tools, utilities, and generators. Designed to streamline daily workflows for web developers, designers, and creators with absolute privacy and zero latency.

Built with **React 19**, **TanStack Start (SSR) & Router**, **Tailwind CSS v4**, and **Shadcn UI**.

---

## 🚀 Live Demo & Key Highlights

- **100% Client-Side & Local-First**: All calculations, formatting, generation, and conversions run entirely inside the user's browser. Zero server roundtrips, ensuring sensitive data (like JWT tokens, passwords, or personal files) never leaves your device.
- **Unified UX & Dark Mode**: Consistently styled components utilizing Shadcn UI primitives, designed with premium aesthetics (smooth gradients, micro-animations, and responsive layouts).
- **Command Palette (`Cmd+K` / `Ctrl+K`)**: Instantly search and navigate to any tool via a global shortcut.
- **Modern Dev Tooling**: Powered by Bun, Vite, Biome (linting/formatting), and Vitest (testing).

---

## 🧰 Categorized Tool Catalog (33+ Active Tools)

Webtoolkit organizes its utilities into distinct categories for seamless discoverability:

### 🎨 Colors

- **Color Format Converter**: Real-time conversions between Hex, RGB, HSL, and OKLCH color formats.
- **WCAG & APCA Contrast Checker**: Verify foreground-to-background contrast ratios against WCAG AA/AAA standards and modern APCA models to guarantee accessibility (a11y).
- **Palette Generator**: Generate harmonious color palettes (complementary, analogous, triadic, etc.) from a single seed color.
- **Color Blindness Simulator**: Preview UI colors and assets through deuteranopia, protanopia, and tritanopia color vision deficiency filters.
- **Gradient Generator**: Build linear, radial, and conic CSS gradients visually with copyable code.
- **Tailwind Color Finder**: Find the nearest Tailwind CSS color class for any arbitrary Hex or RGB input.

### ⚡ CSS

- **Box Shadow Generator**: Layer multiple drop-shadows visually, adjusting offsets, blur, spread, and transparency.
- **Border Radius Visualizer**: Precise, individual corner-by-corner radius mapping with live preview.
- **Easing Editor**: Visual cubic-bezier curve editor with real-time animation comparison.
- **CSS Grid Layout Generator**: Graphically define rows, columns, and gaps to generate clean grid CSS rules.
- **Glassmorphism Generator**: Customize `backdrop-filter` frosted glass effects (blur, transparency, border) with visual presets.

### ✍️ Typography

- **Fluid Type Scale Calculator**: Generate dynamic responsive font sizing using CSS `clamp()` based on viewport limits.
- **Font Pair Previewer**: Browse and preview curated Google Font pairings for heading and body text.
- **Line Height Calculator**: Calculate the optimal line-height (leading) for any font size to ensure maximum readability.
- **Text Stroke & Shadow**: Visual editor for styling glowing or outlined display typography.

### 🔄 Converters

- **px ↔ rem Converter**: Instantly switch sizing units based on custom root font sizes (default: `16px`).
- **SVG Optimizer**: Sanitize and compress SVG files using SVGO, showing before/after size comparisons.
- **Markdown ↔ HTML**: Write or paste Markdown to see a live styled preview and download/copy clean HTML.
- **Image to Base64**: Convert PNG, JPEG, WebP, SVG, and other image files to Base64 data URIs.
- **Image Format Converter**: Batch convert image files locally between PNG, JPEG, WebP, and AVIF formats.

### 🔒 Encoding & Formatting

- **Base64 Encode/Decode**: Safe string or file-based Base64 conversion.
- **URL Encode/Decode**: Encode or decode string components for safe URI parameter transfer.
- **JSON Formatter & Validator**: Beautify, validate, parse, or minify JSON payloads with syntax highlighting and error locating.
- **JWT Decoder**: Decode JSON Web Tokens to inspect headers, payloads, and signatures.
- **HTML Entity Encoder**: Convert special characters to HTML entities and back.

### 🛠️ Generators

- **UUID Generator**: Generate single or bulk v4 UUID/GUID keys.
- **Lorem Ipsum Generator**: Produce dummy placeholder copy by words, sentences, or paragraphs.
- **Meta Tag Generator**: Fill a simple form to output SEO, Open Graph, and Twitter Card metadata.
- **Favicon Generator**: Create multi-sized favicons (16x16, 32x32, 48x48, 180x180, 192x192) from an uploaded image or an emoji.
- **robots.txt Builder**: Graphically configure crawler rules, user-agents, disallows, sitemaps, and download the finished file.

### 🔍 Preview & Debug

- **Open Graph Preview**: Mock how a webpage looks when shared on Facebook, X/Twitter, LinkedIn, and Discord.
- **Responsive Breakpoint Previewer**: Renders any responsive URL within an iframe at standard viewport dimensions (Mobile, Tablet, Desktop).
- **JSON-LD Schema Builder**: Output schema.org structured data (Article, Product, FAQ, Organization, etc.) visually.

---

## 👥 Who is Webtoolkit for?

1. **Frontend Developers & UI Engineers**: Who need a central workspace to visual-test CSS rules, generate clamp font limits, format markup, or check design compliance without searching multiple single-purpose websites.
2. **Backend & DevOps Engineers**: Who frequently encode/decode parameters, inspect token headers, build config structures (like `robots.txt`), or format JSON outputs safely.
3. **UI/UX Designers**: Who wish to check contrast ranges, model typography scales, or test layout easing behavior.
4. **SEO & Content Managers**: Who create meta tag configs, preview social media cards, generate favicons, or build structured JSON-LD data.

---

## 🛠️ Stack & Architecture

- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Core Framework**: [React 19](https://react.dev/) + React Compiler
- **Meta-Framework & Routing**: [TanStack Start](https://tanstack.com/router/latest/docs/framework/react/start/overview) + [TanStack Router](https://tanstack.com/router) (file-based routing)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Lucide Icons, Radix UI)
- **Linter & Formatter**: [Biome](https://biomejs.dev/)
- **Test Runner**: [Vitest](https://vitest.dev/)

```
webtoolkit/
├── src/
│   ├── components/       # Shadcn primitives, Sidebar, Command Palette
│   ├── hooks/            # Copy to clipboard, recent tools, persisted states
│   ├── lib/              # Color helpers, Registry (tool-registry.ts)
│   ├── routes/           # File-based routes mapping to each tool path
│   └── styles.css        # Global styles & Tailwind entry
```

---

## ⚙️ How to Run & Use Locally

### 1. Prerequisites

Make sure you have [Bun](https://bun.sh/) installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/webtoolkit.git
cd webtoolkit
bun install
```

### 3. Development

Start the local development server:

```bash
bun --bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build

Create an optimized production bundle:

```bash
bun --bun run build
```

### 5. Quality Assurance

Ensure styling compliance, syntax consistency, and correct tests:

```bash
bun --bun run lint     # Check Biome code quality
bun --bun run format   # Format files with Biome
bun --bun run check    # Run both lint + format
bun --bun run test     # Run Vitest test suites
```

---

## 🚧 Work in Progress

To further enhance this project for your portfolio, here are the planned features and extensions:

- [ ] **Register the Pre-Implemented Tools 🔌**
      There are several fully functional tools already coded in the route directories (`src/routes/utilities/` and `src/routes/generators/`) but not yet registered in the dashboard navigation:
    - [ ] **QR Code Generator** (`/generators/qr-code`)
    - [ ] **Hash Generator** (`/generators/hash-generator`)
    - [ ] **Regex Tester** (`/utilities/regex-tester`)
    - [ ] **Keycode Info** (`/utilities/keycode-info`)
    - [ ] **Markdown Preview** (`/utilities/markdown-preview`)
    - [ ] **Cron Parser** (`/utilities/cron-parser`)

    _To register them, follow these configuration steps in `src/lib/tool-registry.ts`:_

    First, import the new icons from `lucide-react`:

    ```typescript
    import {
        Keyboard,
        QrCode,
        Search,
        FileText,
        Clock,
        Hash,
    } from "lucide-react";
    ```

    Then, append the new tools/groups to the `toolGroups` array:

    ```typescript
    // 1. Add QR Code & Hash Generator to the "generators" group tools:
    {
      slug: "qr-code",
      name: "QR Code Generator",
      description: "Generate and customize QR Codes with custom colors",
      icon: QrCode,
      path: "/generators/qr-code",
      keywords: ["qr", "code", "barcode", "link"]
    },
    {
      slug: "hash-generator",
      name: "Hash Generator",
      description: "Compute MD5, SHA-1, SHA-256, and SHA-512 hashes",
      icon: Hash,
      path: "/generators/hash-generator",
      keywords: ["hash", "md5", "sha256", "cryptography"]
    }

    // 2. Add a new "Utilities" group to toolGroups:
    {
      id: "utilities",
      label: "Utilities",
      icon: SquareTerminal, // or import another icon
      tools: [
        {
          slug: "regex-tester",
          name: "Regex Tester",
          description: "Test regular expressions with real-time match highlighting",
          icon: Search,
          path: "/utilities/regex-tester",
          keywords: ["regex", "regexp", "pattern", "match"]
        },
        {
          slug: "cron-parser",
          name: "Cron Parser",
          description: "Translate cron expressions into human-readable text",
          icon: Clock,
          path: "/utilities/cron-parser",
          keywords: ["cron", "schedule", "expression", "time"]
        },
        {
          slug: "keycode-info",
          name: "Keycode Info",
          description: "Get keycodes, codes, and modifier statuses for any keypress",
          icon: Keyboard,
          path: "/utilities/keycode-info",
          keywords: ["key", "keycode", "event", "keyboard"]
        },
        {
          slug: "markdown-preview",
          name: "Markdown Previewer",
          description: "Write and preview styled markdown blocks",
          icon: FileText,
          path: "/utilities/markdown-preview",
          keywords: ["markdown", "preview", "md", "editor"]
        }
      ]
    }
    ```

    After making changes to route structure or registration, run `bun --bun run generate-routes` to re-sync the file system routing.

- [ ] **Enable Progressive Web App (PWA) Support 📱**
      Add offline-first capabilities using `@vite-pwa/react`. Since the tools run completely on the client, caching resources via a Service Worker will allow developers to access Webtoolkit in flight, on trains, or during internet outages. You can implement it by adding the plugin to `vite.config.ts`.

- [ ] **Build a Browser Extension Companion 🧩**
      Package the core utility routes as a Chrome/Firefox extension. By copying the utility logics and wrapping them in a browser manifest config, you can let users access the JSON formatter, color converter, or UUID generator in a popup panel directly from their browser toolbar.

- [ ] **Dockerize for Self-Hosting 🐳**
      Add a simple `Dockerfile` and `docker-compose.yml` to the root. This allows teams to host an internal instance of Webtoolkit on their private company servers, ensuring compliance with strict enterprise data boundaries.
