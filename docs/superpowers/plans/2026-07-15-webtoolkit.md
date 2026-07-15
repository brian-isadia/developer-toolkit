# WebToolkit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, public-facing web developer toolkit with 33 client-side tools across 7 categories, featuring a dark-first developer aesthetic, collapsible sidebar, Cmd+K command palette, and localStorage persistence.

**Architecture:** TanStack Router layout route (`_app.tsx`) renders a sidebar + main content shell at 100svh. Each tool is an independent route under `_app/`. A central `toolRegistry.ts` feeds both the sidebar and command palette. All tool logic runs client-side — no server APIs. Shared hooks handle localStorage persistence and copy-to-clipboard.

**Tech Stack:** TanStack Start (SSR) + React 19, TanStack Router (file-based), Tailwind CSS v4, shadcn/ui (new-york/zinc/lucide), cmdk (command palette), Bun runtime, Biome, Vitest.

**Spec:** `docs/superpowers/specs/2026-07-15-webtoolkit-design.md`

**Parallelization:** Phase 1 tasks are sequential. After Phase 1 completes, all tool tasks (Phase 3–9) can run in parallel. Phase 2 (home page) can run after Task 3 (registry).

---

## Phase 1: Foundation (Tasks 1–9)

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install runtime dependencies**

```bash
cd /home/isadia/Development/projects/webtoolkit
bun add cmdk@latest
```

- [ ] **Step 2: Install dev dependencies**

```bash
cd /home/isadia/Development/projects/webtoolkit
bun add -d prism-react-renderer@latest @types/marked marked
```

- [ ] **Step 3: Install shadcn/ui components**

```bash
cd /home/isadia/Development/projects/webtoolkit
bunx --bun shadcn@latest add button input label slider textarea dialog tooltip tabs select badge separator card collapsible scroll-area popover toggle dropdown-menu
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: install dependencies for toolkit infrastructure"
```

---

### Task 2: Design tokens & monospace font

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Add JetBrains Mono font import and dark-first design tokens**

Add JetBrains Mono to the Google Fonts import. Update the base styles for dark-first aesthetic. Add the monospace font to the theme. Ensure body uses `h-svh` (already present) and dark class is applied by default.

Update `src/styles.css`:

Add JetBrains Mono to the existing Google Fonts import URL:
```
@import url("https://fonts.googleapis.com/css2?family=Geist:ital,wght@0,500;1,500&family=JetBrains+Mono:wght@400;500;600&family=Poppins:wght@400;500;600;700;800&display=swap");
```

Add to the `@theme inline` block:
```css
--font-mono: "JetBrains Mono", ui-monospace, monospace;
```

Update the `html` tag in `__root.tsx` to include `className="dark"` so the app defaults to dark mode.

- [ ] **Step 2: Commit**

```bash
git add src/styles.css src/routes/__root.tsx
git commit -m "style: add JetBrains Mono font and dark-first defaults"
```

---

### Task 3: Tool registry

**Files:**
- Create: `src/lib/tool-registry.ts`

- [ ] **Step 1: Create the tool registry with all 33 tools**

```tsx
import {
	Baseline,
	Binary,
	Braces,
	BrushIcon,
	Code,
	Eye,
	FileCode,
	FileImage,
	FileText,
	Globe,
	Grid3X3,
	Hash,
	KeyRound,
	Layers,
	LayoutGrid,
	Link,
	MonitorSmartphone,
	Palette,
	PanelTopOpen,
	Pipette,
	Ratio,
	RectangleHorizontal,
	Replace,
	Ruler,
	Search,
	Shield,
	Shuffle,
	Spline,
	SquareStack,
	SwatchBook,
	Text,
	Type,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Tool = {
	slug: string;
	name: string;
	description: string;
	icon: LucideIcon;
	path: string;
	keywords: string[];
};

export type ToolGroup = {
	id: string;
	label: string;
	icon: LucideIcon;
	tools: Tool[];
};

export const toolGroups: ToolGroup[] = [
	{
		id: "colors",
		label: "Colors",
		icon: Palette,
		tools: [
			{
				slug: "color-converter",
				name: "Color Format Converter",
				description: "Convert between Hex, RGB, HSL, and OKLCH color formats",
				icon: Pipette,
				path: "/colors/color-converter",
				keywords: ["hex", "rgb", "hsl", "oklch", "convert", "color"],
			},
			{
				slug: "contrast-checker",
				name: "Contrast Checker",
				description: "Check WCAG AA/AAA and APCA contrast ratios",
				icon: Eye,
				path: "/colors/contrast-checker",
				keywords: ["wcag", "contrast", "accessibility", "a11y", "apca"],
			},
			{
				slug: "palette-generator",
				name: "Palette Generator",
				description: "Generate harmonious color palettes from a seed color",
				icon: SwatchBook,
				path: "/colors/palette-generator",
				keywords: ["palette", "complementary", "analogous", "triadic"],
			},
			{
				slug: "color-blindness",
				name: "Color Blindness Simulator",
				description: "Preview colors through color vision deficiency filters",
				icon: Eye,
				path: "/colors/color-blindness",
				keywords: ["colorblind", "protanopia", "deuteranopia", "tritanopia", "cvd"],
			},
			{
				slug: "gradient-generator",
				name: "Gradient Generator",
				description: "Build linear, radial, and conic CSS gradients visually",
				icon: BrushIcon,
				path: "/colors/gradient-generator",
				keywords: ["gradient", "linear", "radial", "conic", "css"],
			},
			{
				slug: "tailwind-color-finder",
				name: "Tailwind Color Finder",
				description: "Find the nearest Tailwind CSS color class for any color",
				icon: Search,
				path: "/colors/tailwind-color-finder",
				keywords: ["tailwind", "class", "nearest", "match"],
			},
		],
	},
	{
		id: "css",
		label: "CSS",
		icon: Code,
		tools: [
			{
				slug: "box-shadow",
				name: "Box Shadow Generator",
				description: "Visual box-shadow editor with multiple layers",
				icon: Layers,
				path: "/css/box-shadow",
				keywords: ["shadow", "box-shadow", "elevation", "drop"],
			},
			{
				slug: "border-radius",
				name: "Border Radius Visualizer",
				description: "Individual corner radius control with live preview",
				icon: RectangleHorizontal,
				path: "/css/border-radius",
				keywords: ["border-radius", "rounded", "corner"],
			},
			{
				slug: "easing-editor",
				name: "Easing Editor",
				description: "Cubic-bezier curve editor with animation preview",
				icon: Spline,
				path: "/css/easing-editor",
				keywords: ["easing", "cubic-bezier", "animation", "timing"],
			},
			{
				slug: "grid-generator",
				name: "CSS Grid Generator",
				description: "Visual CSS Grid layout builder with code output",
				icon: Grid3X3,
				path: "/css/grid-generator",
				keywords: ["grid", "layout", "columns", "rows", "template"],
			},
			{
				slug: "glassmorphism",
				name: "Glassmorphism Generator",
				description: "Backdrop-filter glass effect builder",
				icon: PanelTopOpen,
				path: "/css/glassmorphism",
				keywords: ["glass", "blur", "backdrop", "frosted", "transparency"],
			},
		],
	},
	{
		id: "typography",
		label: "Typography",
		icon: Type,
		tools: [
			{
				slug: "fluid-type-scale",
				name: "Fluid Type Scale Calculator",
				description: "Generate CSS clamp() values for responsive typography",
				icon: Ratio,
				path: "/typography/fluid-type-scale",
				keywords: ["clamp", "fluid", "responsive", "type", "scale", "viewport"],
			},
			{
				slug: "font-pair-previewer",
				name: "Font Pair Previewer",
				description: "Browse and preview curated Google Font pairings",
				icon: Text,
				path: "/typography/font-pair-previewer",
				keywords: ["font", "pair", "google", "heading", "body"],
			},
			{
				slug: "line-height-calculator",
				name: "Line Height Calculator",
				description: "Calculate optimal line-height for any font size",
				icon: Ruler,
				path: "/typography/line-height-calculator",
				keywords: ["line-height", "leading", "spacing", "readability"],
			},
			{
				slug: "text-stroke-shadow",
				name: "Text Stroke & Shadow",
				description: "Visual editor for text-shadow and text-stroke effects",
				icon: Baseline,
				path: "/typography/text-stroke-shadow",
				keywords: ["text-shadow", "stroke", "outline", "glow"],
			},
		],
	},
	{
		id: "converters",
		label: "Converters",
		icon: Replace,
		tools: [
			{
				slug: "px-rem",
				name: "px ↔ rem Converter",
				description: "Convert between px and rem with configurable base size",
				icon: Ruler,
				path: "/converters/px-rem",
				keywords: ["px", "rem", "convert", "base", "font-size"],
			},
			{
				slug: "svg-optimizer",
				name: "SVG Optimizer",
				description: "Optimize SVG markup with before/after size comparison",
				icon: FileCode,
				path: "/converters/svg-optimizer",
				keywords: ["svg", "optimize", "minify", "svgo", "clean"],
			},
			{
				slug: "markdown-html",
				name: "Markdown ↔ HTML",
				description: "Convert between Markdown and HTML with live preview",
				icon: FileText,
				path: "/converters/markdown-html",
				keywords: ["markdown", "html", "convert", "render", "preview"],
			},
			{
				slug: "image-to-base64",
				name: "Image to Base64",
				description: "Convert images to Base64 data URIs",
				icon: FileImage,
				path: "/converters/image-to-base64",
				keywords: ["image", "base64", "data-uri", "encode", "upload"],
			},
			{
				slug: "image-format-converter",
				name: "Image Format Converter",
				description: "Convert between PNG, WebP, JPEG, and AVIF formats",
				icon: FileImage,
				path: "/converters/image-format-converter",
				keywords: ["image", "png", "webp", "jpeg", "avif", "convert", "format"],
			},
		],
	},
	{
		id: "encoding",
		label: "Encoding",
		icon: Binary,
		tools: [
			{
				slug: "base64",
				name: "Base64 Encode/Decode",
				description: "Encode and decode Base64 text and files",
				icon: Binary,
				path: "/encoding/base64",
				keywords: ["base64", "encode", "decode", "binary"],
			},
			{
				slug: "url-encode",
				name: "URL Encode/Decode",
				description: "Encode and decode URI components",
				icon: Link,
				path: "/encoding/url-encode",
				keywords: ["url", "uri", "encode", "decode", "percent"],
			},
			{
				slug: "json-formatter",
				name: "JSON Formatter",
				description: "Format, validate, and minify JSON with syntax highlighting",
				icon: Braces,
				path: "/encoding/json-formatter",
				keywords: ["json", "format", "validate", "pretty", "minify"],
			},
			{
				slug: "jwt-decoder",
				name: "JWT Decoder",
				description: "Decode JWT tokens and inspect header, payload, and signature",
				icon: KeyRound,
				path: "/encoding/jwt-decoder",
				keywords: ["jwt", "token", "decode", "header", "payload"],
			},
			{
				slug: "html-entity-encoder",
				name: "HTML Entity Encoder",
				description: "Encode and decode HTML entities and character codes",
				icon: Code,
				path: "/encoding/html-entity-encoder",
				keywords: ["html", "entity", "encode", "decode", "ampersand"],
			},
		],
	},
	{
		id: "generators",
		label: "Generators",
		icon: SquareStack,
		tools: [
			{
				slug: "uuid",
				name: "UUID Generator",
				description: "Generate v4 UUIDs individually or in bulk",
				icon: Hash,
				path: "/generators/uuid",
				keywords: ["uuid", "guid", "random", "unique", "id"],
			},
			{
				slug: "lorem-ipsum",
				name: "Lorem Ipsum Generator",
				description: "Generate placeholder text by paragraphs, sentences, or words",
				icon: Text,
				path: "/generators/lorem-ipsum",
				keywords: ["lorem", "ipsum", "placeholder", "dummy", "text"],
			},
			{
				slug: "meta-tag",
				name: "Meta Tag Generator",
				description: "Generate SEO, Open Graph, and Twitter meta tags",
				icon: Globe,
				path: "/generators/meta-tag",
				keywords: ["meta", "seo", "og", "twitter", "head"],
			},
			{
				slug: "favicon",
				name: "Favicon Generator",
				description: "Generate multi-size favicons from image or emoji",
				icon: FileImage,
				path: "/generators/favicon",
				keywords: ["favicon", "ico", "icon", "apple-touch"],
			},
			{
				slug: "robots-txt",
				name: "robots.txt Builder",
				description: "Build robots.txt with visual controls and presets",
				icon: Shield,
				path: "/generators/robots-txt",
				keywords: ["robots", "txt", "crawler", "bot", "sitemap"],
			},
		],
	},
	{
		id: "preview",
		label: "Preview & Debug",
		icon: MonitorSmartphone,
		tools: [
			{
				slug: "open-graph",
				name: "Open Graph Preview",
				description: "Preview how your page appears on social platforms",
				icon: LayoutGrid,
				path: "/preview/open-graph",
				keywords: ["og", "open-graph", "facebook", "linkedin", "social", "card"],
			},
			{
				slug: "responsive-breakpoints",
				name: "Responsive Breakpoint Previewer",
				description: "Preview any URL at common device breakpoints",
				icon: MonitorSmartphone,
				path: "/preview/responsive-breakpoints",
				keywords: ["responsive", "breakpoint", "mobile", "tablet", "desktop"],
			},
			{
				slug: "json-ld-builder",
				name: "JSON-LD Builder",
				description: "Build and validate structured data for schema.org",
				icon: Braces,
				path: "/preview/json-ld-builder",
				keywords: ["json-ld", "schema", "structured", "data", "seo"],
			},
		],
	},
];

export const allTools: Tool[] = toolGroups.flatMap((group) => group.tools);

export function findToolByPath(path: string): Tool | undefined {
	return allTools.find((tool) => tool.path === path);
}

export function findGroupByToolPath(path: string): ToolGroup | undefined {
	return toolGroups.find((group) =>
		group.tools.some((tool) => tool.path === path),
	);
}

export function searchTools(query: string): Tool[] {
	const lower = query.toLowerCase();
	return allTools.filter(
		(tool) =>
			tool.name.toLowerCase().includes(lower) ||
			tool.description.toLowerCase().includes(lower) ||
			tool.keywords.some((kw) => kw.includes(lower)),
	);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/tool-registry.ts
git commit -m "feat: add tool registry with all 33 tools"
```

---

### Task 4: Shared hooks

**Files:**
- Create: `src/hooks/use-persisted-state.ts`
- Create: `src/hooks/use-copy-to-clipboard.ts`
- Create: `src/hooks/use-recent-tools.ts`

- [ ] **Step 1: Create usePersistedState hook**

```tsx
import { useCallback, useEffect, useState } from "react";

export function usePersistedState<T>(
	key: string,
	defaultValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
	const prefixedKey = `webtoolkit:${key}`;

	const [state, setState] = useState<T>(defaultValue);

	useEffect(() => {
		try {
			const stored = localStorage.getItem(prefixedKey);
			if (stored !== null) {
				setState(JSON.parse(stored) as T);
			}
		} catch {
			// Ignore parse errors, use default
		}
	}, [prefixedKey]);

	const setPersistedState = useCallback(
		(value: T | ((prev: T) => T)) => {
			setState((prev) => {
				const next = value instanceof Function ? value(prev) : value;
				try {
					localStorage.setItem(prefixedKey, JSON.stringify(next));
				} catch {
					// Ignore storage errors (quota exceeded, etc.)
				}
				return next;
			});
		},
		[prefixedKey],
	);

	return [state, setPersistedState];
}
```

- [ ] **Step 2: Create useCopyToClipboard hook**

```tsx
import { useCallback, useRef, useState } from "react";

export function useCopyToClipboard(resetDelay = 2000) {
	const [copied, setCopied] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

	const copy = useCallback(
		async (text: string) => {
			try {
				await navigator.clipboard.writeText(text);
				setCopied(true);
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
				timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);
				return true;
			} catch {
				return false;
			}
		},
		[resetDelay],
	);

	return { copy, copied };
}
```

- [ ] **Step 3: Create useRecentTools hook**

```tsx
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "webtoolkit:recent-tools";
const MAX_RECENT = 5;

export function useRecentTools() {
	const [recent, setRecent] = useState<string[]>([]);

	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				setRecent(JSON.parse(stored) as string[]);
			}
		} catch {
			// Ignore
		}
	}, []);

	const addRecent = useCallback((path: string) => {
		setRecent((prev) => {
			const next = [path, ...prev.filter((p) => p !== path)].slice(
				0,
				MAX_RECENT,
			);
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
			} catch {
				// Ignore
			}
			return next;
		});
	}, []);

	return { recent, addRecent };
}
```

- [ ] **Step 4: Commit**

```bash
git add src/hooks/
git commit -m "feat: add usePersistedState, useCopyToClipboard, useRecentTools hooks"
```

---

### Task 5: Color utility library

**Files:**
- Create: `src/lib/color.ts`
- Create: `src/lib/__tests__/color.test.ts`

This is the shared math library used by multiple color tools. Contains pure functions for converting between Hex, RGB, HSL, and OKLCH color formats.

- [ ] **Step 1: Create color conversion library**

Create `src/lib/color.ts`:

```tsx
// ---- Types ----

export type RGB = { r: number; g: number; b: number };
export type HSL = { h: number; s: number; l: number };
export type OKLCH = { l: number; c: number; h: number };

// ---- Hex <-> RGB ----

export function hexToRgb(hex: string): RGB | null {
	const cleaned = hex.replace(/^#/, "");
	if (!/^[0-9a-fA-F]{6}$/.test(cleaned) && !/^[0-9a-fA-F]{3}$/.test(cleaned)) {
		return null;
	}
	const expanded =
		cleaned.length === 3
			? cleaned
					.split("")
					.map((c) => c + c)
					.join("")
			: cleaned;
	const num = Number.parseInt(expanded, 16);
	return {
		r: (num >> 16) & 255,
		g: (num >> 8) & 255,
		b: num & 255,
	};
}

export function rgbToHex(rgb: RGB): string {
	const toHex = (n: number) =>
		Math.round(Math.max(0, Math.min(255, n)))
			.toString(16)
			.padStart(2, "0");
	return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

// ---- RGB <-> HSL ----

export function rgbToHsl(rgb: RGB): HSL {
	const r = rgb.r / 255;
	const g = rgb.g / 255;
	const b = rgb.b / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;
	if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
	const d = max - min;
	const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	let h = 0;
	if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
	else if (max === g) h = ((b - r) / d + 2) / 6;
	else h = ((r - g) / d + 4) / 6;
	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100),
	};
}

export function hslToRgb(hsl: HSL): RGB {
	const h = hsl.h / 360;
	const s = hsl.s / 100;
	const l = hsl.l / 100;
	if (s === 0) {
		const v = Math.round(l * 255);
		return { r: v, g: v, b: v };
	}
	const hue2rgb = (p: number, q: number, t: number) => {
		let tt = t;
		if (tt < 0) tt += 1;
		if (tt > 1) tt -= 1;
		if (tt < 1 / 6) return p + (q - p) * 6 * tt;
		if (tt < 1 / 2) return q;
		if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
		return p;
	};
	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	return {
		r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
		g: Math.round(hue2rgb(p, q, h) * 255),
		b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
	};
}

// ---- RGB <-> Linear RGB ----

function srgbToLinear(c: number): number {
	const v = c / 255;
	return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(c: number): number {
	const v = c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;
	return Math.round(Math.max(0, Math.min(255, v * 255)));
}

// ---- Linear RGB <-> OKLab ----

function linearRgbToOklab(r: number, g: number, b: number) {
	const l_ = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
	const m_ = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
	const s_ = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
	const l = Math.cbrt(l_);
	const m = Math.cbrt(m_);
	const s = Math.cbrt(s_);
	return {
		L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
		a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
		b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
	};
}

function oklabToLinearRgb(L: number, a: number, b: number) {
	const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
	const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
	const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
	return {
		r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
	};
}

// ---- RGB <-> OKLCH ----

export function rgbToOklch(rgb: RGB): OKLCH {
	const lr = srgbToLinear(rgb.r);
	const lg = srgbToLinear(rgb.g);
	const lb = srgbToLinear(rgb.b);
	const lab = linearRgbToOklab(lr, lg, lb);
	const c = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
	let h = (Math.atan2(lab.b, lab.a) * 180) / Math.PI;
	if (h < 0) h += 360;
	return {
		l: Math.round(lab.L * 1000) / 1000,
		c: Math.round(c * 1000) / 1000,
		h: Math.round(h * 10) / 10,
	};
}

export function oklchToRgb(oklch: OKLCH): RGB {
	const hRad = (oklch.h * Math.PI) / 180;
	const a = oklch.c * Math.cos(hRad);
	const b = oklch.c * Math.sin(hRad);
	const lin = oklabToLinearRgb(oklch.l, a, b);
	return {
		r: linearToSrgb(lin.r),
		g: linearToSrgb(lin.g),
		b: linearToSrgb(lin.b),
	};
}

// ---- Formatting helpers ----

export function formatHex(hex: string): string {
	return hex.startsWith("#") ? hex.toLowerCase() : `#${hex.toLowerCase()}`;
}

export function formatRgb(rgb: RGB): string {
	return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

export function formatHsl(hsl: HSL): string {
	return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

export function formatOklch(oklch: OKLCH): string {
	return `oklch(${oklch.l} ${oklch.c} ${oklch.h})`;
}

// ---- Parse from any format ----

export function parseColor(
	input: string,
): { rgb: RGB; hex: string; hsl: HSL; oklch: OKLCH } | null {
	const trimmed = input.trim();

	// Try hex
	if (/^#?[0-9a-fA-F]{3,6}$/.test(trimmed)) {
		const rgb = hexToRgb(trimmed);
		if (rgb) {
			return {
				rgb,
				hex: rgbToHex(rgb),
				hsl: rgbToHsl(rgb),
				oklch: rgbToOklch(rgb),
			};
		}
	}

	// Try rgb(r, g, b)
	const rgbMatch = trimmed.match(
		/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/,
	);
	if (rgbMatch) {
		const rgb = {
			r: Number.parseInt(rgbMatch[1]),
			g: Number.parseInt(rgbMatch[2]),
			b: Number.parseInt(rgbMatch[3]),
		};
		return {
			rgb,
			hex: rgbToHex(rgb),
			hsl: rgbToHsl(rgb),
			oklch: rgbToOklch(rgb),
		};
	}

	// Try hsl(h, s%, l%)
	const hslMatch = trimmed.match(
		/^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%?\s*,\s*(\d{1,3})%?/,
	);
	if (hslMatch) {
		const hsl = {
			h: Number.parseInt(hslMatch[1]),
			s: Number.parseInt(hslMatch[2]),
			l: Number.parseInt(hslMatch[3]),
		};
		const rgb = hslToRgb(hsl);
		return {
			rgb,
			hex: rgbToHex(rgb),
			hsl,
			oklch: rgbToOklch(rgb),
		};
	}

	// Try oklch(l c h)
	const oklchMatch = trimmed.match(
		/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/,
	);
	if (oklchMatch) {
		const oklch = {
			l: Number.parseFloat(oklchMatch[1]),
			c: Number.parseFloat(oklchMatch[2]),
			h: Number.parseFloat(oklchMatch[3]),
		};
		const rgb = oklchToRgb(oklch);
		return {
			rgb,
			hex: rgbToHex(rgb),
			hsl: rgbToHsl(rgb),
			oklch,
		};
	}

	return null;
}

// ---- WCAG Contrast ----

export function relativeLuminance(rgb: RGB): number {
	const r = srgbToLinear(rgb.r);
	const g = srgbToLinear(rgb.g);
	const b = srgbToLinear(rgb.b);
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(fg: RGB, bg: RGB): number {
	const l1 = relativeLuminance(fg);
	const l2 = relativeLuminance(bg);
	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);
	return (lighter + 0.05) / (darker + 0.05);
}

export function wcagLevel(
	ratio: number,
	size: "normal" | "large" = "normal",
): { aa: boolean; aaa: boolean } {
	if (size === "large") {
		return { aa: ratio >= 3, aaa: ratio >= 4.5 };
	}
	return { aa: ratio >= 4.5, aaa: ratio >= 7 };
}
```

- [ ] **Step 2: Write tests for color conversions**

Create `src/lib/__tests__/color.test.ts`:

```tsx
import { describe, expect, it } from "vitest";
import {
	contrastRatio,
	formatHex,
	formatHsl,
	formatOklch,
	formatRgb,
	hexToRgb,
	hslToRgb,
	oklchToRgb,
	parseColor,
	rgbToHex,
	rgbToHsl,
	rgbToOklch,
	wcagLevel,
} from "../color";

describe("hexToRgb", () => {
	it("converts 6-digit hex", () => {
		expect(hexToRgb("#ff5500")).toEqual({ r: 255, g: 85, b: 0 });
	});
	it("converts 3-digit hex", () => {
		expect(hexToRgb("#f50")).toEqual({ r: 255, g: 85, b: 0 });
	});
	it("handles no hash prefix", () => {
		expect(hexToRgb("ff5500")).toEqual({ r: 255, g: 85, b: 0 });
	});
	it("returns null for invalid hex", () => {
		expect(hexToRgb("xyz")).toBeNull();
	});
	it("converts black", () => {
		expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
	});
	it("converts white", () => {
		expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
	});
});

describe("rgbToHex", () => {
	it("converts RGB to hex", () => {
		expect(rgbToHex({ r: 255, g: 85, b: 0 })).toBe("#ff5500");
	});
	it("pads single-digit values", () => {
		expect(rgbToHex({ r: 0, g: 0, b: 0 })).toBe("#000000");
	});
	it("clamps out-of-range values", () => {
		expect(rgbToHex({ r: 300, g: -5, b: 128 })).toBe("#ff0080");
	});
});

describe("RGB <-> HSL roundtrip", () => {
	it("converts red", () => {
		const hsl = rgbToHsl({ r: 255, g: 0, b: 0 });
		expect(hsl).toEqual({ h: 0, s: 100, l: 50 });
		const rgb = hslToRgb(hsl);
		expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
	});
	it("handles gray (no saturation)", () => {
		const hsl = rgbToHsl({ r: 128, g: 128, b: 128 });
		expect(hsl.s).toBe(0);
	});
});

describe("RGB <-> OKLCH roundtrip", () => {
	it("roundtrips red approximately", () => {
		const oklch = rgbToOklch({ r: 255, g: 0, b: 0 });
		expect(oklch.l).toBeCloseTo(0.628, 1);
		const rgb = oklchToRgb(oklch);
		expect(rgb.r).toBeCloseTo(255, -1);
		expect(rgb.g).toBeCloseTo(0, 0);
		expect(rgb.b).toBeCloseTo(0, 0);
	});
	it("handles black", () => {
		const oklch = rgbToOklch({ r: 0, g: 0, b: 0 });
		expect(oklch.l).toBe(0);
		expect(oklch.c).toBe(0);
	});
	it("handles white", () => {
		const oklch = rgbToOklch({ r: 255, g: 255, b: 255 });
		expect(oklch.l).toBeCloseTo(1, 1);
		expect(oklch.c).toBeCloseTo(0, 1);
	});
});

describe("formatters", () => {
	it("formatHex adds # prefix", () => {
		expect(formatHex("ff5500")).toBe("#ff5500");
	});
	it("formatRgb formats correctly", () => {
		expect(formatRgb({ r: 255, g: 85, b: 0 })).toBe("rgb(255, 85, 0)");
	});
	it("formatHsl formats correctly", () => {
		expect(formatHsl({ h: 20, s: 100, l: 50 })).toBe("hsl(20, 100%, 50%)");
	});
	it("formatOklch formats correctly", () => {
		expect(formatOklch({ l: 0.7, c: 0.15, h: 30 })).toBe("oklch(0.7 0.15 30)");
	});
});

describe("parseColor", () => {
	it("parses hex", () => {
		const result = parseColor("#ff5500");
		expect(result).not.toBeNull();
		expect(result!.rgb).toEqual({ r: 255, g: 85, b: 0 });
	});
	it("parses rgb()", () => {
		const result = parseColor("rgb(255, 85, 0)");
		expect(result).not.toBeNull();
		expect(result!.hex).toBe("#ff5500");
	});
	it("parses hsl()", () => {
		const result = parseColor("hsl(0, 100%, 50%)");
		expect(result).not.toBeNull();
		expect(result!.rgb).toEqual({ r: 255, g: 0, b: 0 });
	});
	it("parses oklch()", () => {
		const result = parseColor("oklch(0.7 0.15 30)");
		expect(result).not.toBeNull();
		expect(result!.oklch).toEqual({ l: 0.7, c: 0.15, h: 30 });
	});
	it("returns null for invalid input", () => {
		expect(parseColor("not a color")).toBeNull();
	});
});

describe("contrast", () => {
	it("black on white is 21:1", () => {
		const ratio = contrastRatio(
			{ r: 0, g: 0, b: 0 },
			{ r: 255, g: 255, b: 255 },
		);
		expect(ratio).toBeCloseTo(21, 0);
	});
	it("same colors have ratio 1", () => {
		const ratio = contrastRatio(
			{ r: 128, g: 128, b: 128 },
			{ r: 128, g: 128, b: 128 },
		);
		expect(ratio).toBeCloseTo(1, 1);
	});
});

describe("wcagLevel", () => {
	it("21:1 passes all levels at normal size", () => {
		expect(wcagLevel(21)).toEqual({ aa: true, aaa: true });
	});
	it("3:1 fails AA at normal size but passes AA at large size", () => {
		expect(wcagLevel(3, "normal")).toEqual({ aa: false, aaa: false });
		expect(wcagLevel(3, "large")).toEqual({ aa: true, aaa: false });
	});
});
```

- [ ] **Step 3: Run tests**

```bash
cd /home/isadia/Development/projects/webtoolkit
bun --bun run test
```

Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add src/lib/color.ts src/lib/__tests__/
git commit -m "feat: add color conversion library with tests"
```

---

### Task 6: Shared tool components

**Files:**
- Create: `src/components/tool-page-layout.tsx`
- Create: `src/components/code-output.tsx`
- Create: `src/components/copy-button.tsx`
- Create: `src/components/color-swatch.tsx`

- [ ] **Step 1: Create ToolPageLayout component**

This wraps every tool page with consistent title, description, and related tools footer.

Create `src/components/tool-page-layout.tsx`:

```tsx
import { Link, useRouterState } from "@tanstack/react-router";
import { findGroupByToolPath, findToolByPath } from "#/lib/tool-registry";

export function ToolPageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const tool = findToolByPath(pathname);
	const group = findGroupByToolPath(pathname);

	const relatedTools =
		group?.tools.filter((t) => t.path !== pathname).slice(0, 4) ?? [];

	return (
		<div className="flex flex-col gap-8 p-6 max-w-5xl mx-auto w-full">
			{tool && (
				<div className="space-y-1">
					<h1 className="text-2xl font-bold tracking-tight">{tool.name}</h1>
					<p className="text-muted-foreground">{tool.description}</p>
				</div>
			)}

			<div className="flex-1">{children}</div>

			{relatedTools.length > 0 && (
				<div className="border-t border-border pt-6 mt-4">
					<h2 className="text-sm font-medium text-muted-foreground mb-3">
						Related tools in {group?.label}
					</h2>
					<div className="flex flex-wrap gap-2">
						{relatedTools.map((t) => (
							<Link
								key={t.path}
								to={t.path}
								className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
							>
								<t.icon className="size-3.5" />
								{t.name}
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
```

- [ ] **Step 2: Create CodeOutput component**

Create `src/components/code-output.tsx`:

```tsx
import { CopyButton } from "#/components/copy-button";

export function CodeOutput({
	code,
	language = "css",
	label,
}: {
	code: string;
	language?: string;
	label?: string;
}) {
	return (
		<div className="relative group rounded-lg border border-border bg-[oklch(0.15_0.005_285)] overflow-hidden">
			{label && (
				<div className="flex items-center justify-between px-4 py-2 border-b border-border">
					<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
						{label}
					</span>
					<CopyButton text={code} />
				</div>
			)}
			<pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-foreground">
				<code>{code}</code>
			</pre>
			{!label && (
				<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
					<CopyButton text={code} />
				</div>
			)}
		</div>
	);
}
```

- [ ] **Step 3: Create CopyButton component**

Create `src/components/copy-button.tsx`:

```tsx
import { Check, Copy } from "lucide-react";
import { Button } from "#/components/ui/button";
import { useCopyToClipboard } from "#/hooks/use-copy-to-clipboard";

export function CopyButton({
	text,
	className,
}: {
	text: string;
	className?: string;
}) {
	const { copy, copied } = useCopyToClipboard();

	return (
		<Button
			variant="ghost"
			size="icon"
			className={`size-7 ${className ?? ""}`}
			onClick={() => copy(text)}
		>
			{copied ? (
				<Check className="size-3.5 text-green-400" />
			) : (
				<Copy className="size-3.5" />
			)}
		</Button>
	);
}
```

- [ ] **Step 4: Create ColorSwatch component**

Create `src/components/color-swatch.tsx`:

```tsx
import { cn } from "#/lib/utils";

export function ColorSwatch({
	color,
	className,
	size = "md",
}: {
	color: string;
	className?: string;
	size?: "sm" | "md" | "lg";
}) {
	const sizeClasses = {
		sm: "size-6 rounded",
		md: "size-10 rounded-md",
		lg: "size-16 rounded-lg",
	};

	return (
		<div
			className={cn(
				sizeClasses[size],
				"border border-border shadow-sm ring-1 ring-white/5",
				className,
			)}
			style={{ backgroundColor: color }}
		/>
	);
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/tool-page-layout.tsx src/components/code-output.tsx src/components/copy-button.tsx src/components/color-swatch.tsx
git commit -m "feat: add shared tool components (ToolPageLayout, CodeOutput, CopyButton, ColorSwatch)"
```

---

### Task 7: Layout route with sidebar

**Files:**
- Create: `src/routes/_app.tsx`
- Create: `src/components/layout/sidebar.tsx`
- Create: `src/components/layout/sidebar-group.tsx`
- Modify: `src/routes/index.tsx` → Move to `src/routes/_app/index.tsx`
- Delete: `src/routes/index.tsx`

- [ ] **Step 1: Create sidebar group component**

Create `src/components/layout/sidebar-group.tsx`:

```tsx
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { ToolGroup } from "#/lib/tool-registry";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";
import { cn } from "#/lib/utils";

export function SidebarGroup({
	group,
	collapsed,
}: {
	group: ToolGroup;
	collapsed: boolean;
}) {
	const [expanded, setExpanded] = useState(true);
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	const isGroupActive = group.tools.some((t) => t.path === pathname);
	const GroupIcon = group.icon;

	if (collapsed) {
		return (
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild>
					<button
						type="button"
						className={cn(
							"flex items-center justify-center size-10 rounded-lg transition-colors",
							isGroupActive
								? "bg-accent text-accent-foreground"
								: "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
						)}
					>
						<GroupIcon className="size-5" />
					</button>
				</TooltipTrigger>
				<TooltipContent side="right" className="flex flex-col gap-1 p-2">
					<span className="font-medium text-xs mb-1">{group.label}</span>
					{group.tools.map((tool) => (
						<Link
							key={tool.path}
							to={tool.path}
							className={cn(
								"text-xs px-2 py-1 rounded hover:bg-accent transition-colors",
								pathname === tool.path && "bg-accent text-accent-foreground",
							)}
						>
							{tool.name}
						</Link>
					))}
				</TooltipContent>
			</Tooltip>
		);
	}

	return (
		<div>
			<button
				type="button"
				onClick={() => setExpanded(!expanded)}
				className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
			>
				<GroupIcon className="size-4 shrink-0" />
				<span className="flex-1 text-left">{group.label}</span>
				<span className="text-xs text-muted-foreground/60">
					{group.tools.length}
				</span>
				<ChevronRight
					className={cn(
						"size-3.5 transition-transform",
						expanded && "rotate-90",
					)}
				/>
			</button>
			{expanded && (
				<div className="ml-3 pl-3 border-l border-border/50 space-y-0.5">
					{group.tools.map((tool) => {
						const isActive = pathname === tool.path;
						const ToolIcon = tool.icon;
						return (
							<Link
								key={tool.path}
								to={tool.path}
								className={cn(
									"flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors",
									isActive
										? "bg-accent text-accent-foreground font-medium"
										: "text-muted-foreground hover:text-foreground hover:bg-accent/50",
								)}
							>
								<ToolIcon className="size-3.5 shrink-0" />
								<span className="truncate">{tool.name}</span>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
}
```

- [ ] **Step 2: Create sidebar component**

Create `src/components/layout/sidebar.tsx`:

```tsx
import { Link } from "@tanstack/react-router";
import { PanelLeftClose, PanelLeftOpen, Wrench } from "lucide-react";
import { Button } from "#/components/ui/button";
import { ScrollArea } from "#/components/ui/scroll-area";
import { TooltipProvider } from "#/components/ui/tooltip";
import { usePersistedState } from "#/hooks/use-persisted-state";
import { toolGroups } from "#/lib/tool-registry";
import { cn } from "#/lib/utils";
import { SidebarGroup } from "./sidebar-group";

export function Sidebar() {
	const [collapsed, setCollapsed] = usePersistedState(
		"sidebar-collapsed",
		false,
	);

	return (
		<TooltipProvider>
			<aside
				className={cn(
					"flex flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-200 ease-out shrink-0",
					collapsed ? "w-16" : "w-70",
				)}
			>
				{/* Header */}
				<div
					className={cn(
						"flex items-center h-14 border-b border-border px-3 shrink-0",
						collapsed ? "justify-center" : "justify-between",
					)}
				>
					{!collapsed && (
						<Link to="/" className="flex items-center gap-2">
							<Wrench className="size-5 text-primary" />
							<span className="font-bold text-lg tracking-tight">
								WebToolkit
							</span>
						</Link>
					)}
					<Button
						variant="ghost"
						size="icon"
						className="size-8"
						onClick={() => setCollapsed(!collapsed)}
					>
						{collapsed ? (
							<PanelLeftOpen className="size-4" />
						) : (
							<PanelLeftClose className="size-4" />
						)}
					</Button>
				</div>

				{/* Tool groups */}
				<ScrollArea className="flex-1 py-2">
					<div
						className={cn(
							"flex flex-col gap-1",
							collapsed ? "items-center px-1" : "px-2",
						)}
					>
						{toolGroups.map((group) => (
							<SidebarGroup
								key={group.id}
								group={group}
								collapsed={collapsed}
							/>
						))}
					</div>
				</ScrollArea>
			</aside>
		</TooltipProvider>
	);
}
```

- [ ] **Step 3: Create layout route**

Create `src/routes/_app.tsx`:

```tsx
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "#/components/layout/sidebar";

export const Route = createFileRoute("/_app")({
	component: AppLayout,
});

function AppLayout() {
	return (
		<div className="flex h-svh overflow-hidden bg-background text-foreground">
			<Sidebar />
			<main className="flex-1 overflow-y-auto">
				<Outlet />
			</main>
		</div>
	);
}
```

- [ ] **Step 4: Move index route under _app**

Move `src/routes/index.tsx` to `src/routes/_app/index.tsx` and update it:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({ component: Home });

function Home() {
	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold">Welcome to WebToolkit</h1>
		</div>
	);
}
```

Delete the old `src/routes/index.tsx`.

- [ ] **Step 5: Regenerate routes and verify**

```bash
cd /home/isadia/Development/projects/webtoolkit
bun --bun run generate-routes
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add layout route with collapsible sidebar"
```

---

### Task 8: Command palette

**Files:**
- Create: `src/components/command-palette.tsx`
- Modify: `src/routes/_app.tsx` (add command palette)

- [ ] **Step 1: Create command palette component**

Create `src/components/command-palette.tsx`:

```tsx
import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRecentTools } from "#/hooks/use-recent-tools";
import { allTools, toolGroups } from "#/lib/tool-registry";

export function CommandPalette() {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const { recent, addRecent } = useRecentTools();

	useEffect(() => {
		function onKeyDown(e: KeyboardEvent) {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setOpen((prev) => !prev);
			}
		}
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, []);

	function selectTool(path: string) {
		addRecent(path);
		setOpen(false);
		navigate({ to: path });
	}

	const recentTools = recent
		.map((path) => allTools.find((t) => t.path === path))
		.filter(Boolean);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50">
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop dismiss */}
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onClick={() => setOpen(false)}
			/>
			<div className="relative flex items-start justify-center pt-[20vh]">
				<Command
					className="w-full max-w-lg rounded-xl border border-border bg-popover shadow-2xl overflow-hidden"
					loop
				>
					<Command.Input
						placeholder="Search tools..."
						className="w-full px-4 py-3 text-sm bg-transparent border-b border-border outline-none placeholder:text-muted-foreground"
					/>
					<Command.List className="max-h-80 overflow-y-auto p-2">
						<Command.Empty className="px-4 py-8 text-center text-sm text-muted-foreground">
							No tools found.
						</Command.Empty>

						{recentTools.length > 0 && (
							<Command.Group heading="Recent">
								{recentTools.map((tool) => {
									if (!tool) return null;
									const Icon = tool.icon;
									return (
										<Command.Item
											key={`recent-${tool.path}`}
											value={`recent ${tool.name}`}
											onSelect={() => selectTool(tool.path)}
											className="flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer data-[selected=true]:bg-accent"
										>
											<Icon className="size-4 text-muted-foreground shrink-0" />
											<span>{tool.name}</span>
										</Command.Item>
									);
								})}
							</Command.Group>
						)}

						{toolGroups.map((group) => (
							<Command.Group key={group.id} heading={group.label}>
								{group.tools.map((tool) => {
									const Icon = tool.icon;
									return (
										<Command.Item
											key={tool.path}
											value={`${tool.name} ${tool.keywords.join(" ")}`}
											onSelect={() => selectTool(tool.path)}
											className="flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer data-[selected=true]:bg-accent"
										>
											<Icon className="size-4 text-muted-foreground shrink-0" />
											<div className="flex flex-col">
												<span>{tool.name}</span>
												<span className="text-xs text-muted-foreground">
													{tool.description}
												</span>
											</div>
										</Command.Item>
									);
								})}
							</Command.Group>
						))}
					</Command.List>

					<div className="border-t border-border px-4 py-2">
						<div className="flex items-center gap-4 text-xs text-muted-foreground">
							<span>
								<kbd className="px-1.5 py-0.5 rounded bg-secondary font-mono text-[10px]">
									↑↓
								</kbd>{" "}
								Navigate
							</span>
							<span>
								<kbd className="px-1.5 py-0.5 rounded bg-secondary font-mono text-[10px]">
									↵
								</kbd>{" "}
								Select
							</span>
							<span>
								<kbd className="px-1.5 py-0.5 rounded bg-secondary font-mono text-[10px]">
									Esc
								</kbd>{" "}
								Close
							</span>
						</div>
					</div>
				</Command>
			</div>
		</div>
	);
}
```

- [ ] **Step 2: Add CommandPalette to the layout route**

Update `src/routes/_app.tsx` — add `<CommandPalette />` inside the layout div, after `<Sidebar />`:

```tsx
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { CommandPalette } from "#/components/command-palette";
import { Sidebar } from "#/components/layout/sidebar";

export const Route = createFileRoute("/_app")({
	component: AppLayout,
});

function AppLayout() {
	return (
		<div className="flex h-svh overflow-hidden bg-background text-foreground">
			<Sidebar />
			<main className="flex-1 overflow-y-auto">
				<Outlet />
			</main>
			<CommandPalette />
		</div>
	);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/command-palette.tsx src/routes/_app.tsx
git commit -m "feat: add Cmd+K command palette with fuzzy search and recent tools"
```

---

### Task 9: Create empty route files for all 33 tools

**Files:**
- Create: All 33 route files under `src/routes/_app/`

This task creates stub route files for every tool so TanStack Router can generate the route tree. Each stub renders the `ToolPageLayout` wrapper with a placeholder. Individual tool implementations will replace these stubs.

- [ ] **Step 1: Create all route directories and stub files**

For each tool in the registry, create a route file at the corresponding path. Example pattern for each tool:

```tsx
// src/routes/_app/colors/color-converter.tsx
import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/_app/colors/color-converter")({
	component: ColorConverterPage,
	head: () => ({
		meta: [
			{ title: "Color Format Converter — WebToolkit" },
			{
				name: "description",
				content: "Convert colors between Hex, RGB, HSL, and OKLCH formats",
			},
		],
	}),
});

function ColorConverterPage() {
	return (
		<ToolPageLayout>
			<div className="text-muted-foreground">Coming soon</div>
		</ToolPageLayout>
	);
}
```

Create **all 33 files** following this pattern. Each file must use the correct `createFileRoute` path (e.g., `"/_app/css/box-shadow"`), the tool's name in the `<title>`, and the tool's description in the meta description.

Full list of files to create:
- `src/routes/_app/colors/color-converter.tsx`
- `src/routes/_app/colors/contrast-checker.tsx`
- `src/routes/_app/colors/palette-generator.tsx`
- `src/routes/_app/colors/color-blindness.tsx`
- `src/routes/_app/colors/gradient-generator.tsx`
- `src/routes/_app/colors/tailwind-color-finder.tsx`
- `src/routes/_app/css/box-shadow.tsx`
- `src/routes/_app/css/border-radius.tsx`
- `src/routes/_app/css/easing-editor.tsx`
- `src/routes/_app/css/grid-generator.tsx`
- `src/routes/_app/css/glassmorphism.tsx`
- `src/routes/_app/typography/fluid-type-scale.tsx`
- `src/routes/_app/typography/font-pair-previewer.tsx`
- `src/routes/_app/typography/line-height-calculator.tsx`
- `src/routes/_app/typography/text-stroke-shadow.tsx`
- `src/routes/_app/converters/px-rem.tsx`
- `src/routes/_app/converters/svg-optimizer.tsx`
- `src/routes/_app/converters/markdown-html.tsx`
- `src/routes/_app/converters/image-to-base64.tsx`
- `src/routes/_app/converters/image-format-converter.tsx`
- `src/routes/_app/encoding/base64.tsx`
- `src/routes/_app/encoding/url-encode.tsx`
- `src/routes/_app/encoding/json-formatter.tsx`
- `src/routes/_app/encoding/jwt-decoder.tsx`
- `src/routes/_app/encoding/html-entity-encoder.tsx`
- `src/routes/_app/generators/uuid.tsx`
- `src/routes/_app/generators/lorem-ipsum.tsx`
- `src/routes/_app/generators/meta-tag.tsx`
- `src/routes/_app/generators/favicon.tsx`
- `src/routes/_app/generators/robots-txt.tsx`
- `src/routes/_app/preview/open-graph.tsx`
- `src/routes/_app/preview/responsive-breakpoints.tsx`
- `src/routes/_app/preview/json-ld-builder.tsx`

Reference the tool registry (`src/lib/tool-registry.ts`) for the exact name and description to use in each file's head metadata.

- [ ] **Step 2: Regenerate routes**

```bash
cd /home/isadia/Development/projects/webtoolkit
bun --bun run generate-routes
```

- [ ] **Step 3: Verify the app builds**

```bash
cd /home/isadia/Development/projects/webtoolkit
bun --bun run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add stub route files for all 33 tools"
```

---

## Phase 2: Home Page (Task 10)

### Task 10: Home/landing page

**Files:**
- Modify: `src/routes/_app/index.tsx`

- [ ] **Step 1: Implement the home page with hero and tool grid**

Replace the content of `src/routes/_app/index.tsx`:

```tsx
import { Link, createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { toolGroups } from "#/lib/tool-registry";

export const Route = createFileRoute("/_app/")({
	component: HomePage,
	head: () => ({
		meta: [
			{ title: "WebToolkit — 33 Tools for Web Developers" },
			{
				name: "description",
				content:
					"A collection of 33 free, browser-based tools for web developers. Color converters, CSS generators, encoding utilities, and more.",
			},
		],
	}),
});

function HomePage() {
	return (
		<div className="p-6 max-w-6xl mx-auto space-y-12">
			{/* Hero */}
			<div className="text-center space-y-4 py-12">
				<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
					Web
					<span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
						Toolkit
					</span>
				</h1>
				<p className="text-lg text-muted-foreground max-w-md mx-auto">
					33 free, browser-based tools to make web development faster.
				</p>
				<button
					type="button"
					onClick={() =>
						document.dispatchEvent(
							new KeyboardEvent("keydown", {
								key: "k",
								metaKey: true,
								bubbles: true,
							}),
						)
					}
					className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-secondary/50 text-sm text-muted-foreground hover:bg-secondary transition-colors cursor-pointer"
				>
					<Search className="size-4" />
					<span>Search tools...</span>
					<kbd className="ml-4 px-1.5 py-0.5 rounded bg-background font-mono text-[11px] border border-border">
						⌘K
					</kbd>
				</button>
			</div>

			{/* Tool grid by group */}
			{toolGroups.map((group) => {
				const GroupIcon = group.icon;
				return (
					<section key={group.id} className="space-y-4">
						<div className="flex items-center gap-2">
							<GroupIcon className="size-5 text-muted-foreground" />
							<h2 className="text-lg font-semibold">{group.label}</h2>
							<span className="text-xs text-muted-foreground">
								({group.tools.length})
							</span>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
							{group.tools.map((tool) => {
								const ToolIcon = tool.icon;
								return (
									<Link
										key={tool.path}
										to={tool.path}
										className="group flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-accent/30 hover:border-accent/50 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/5"
									>
										<div className="flex items-center justify-center size-9 rounded-lg bg-secondary shrink-0 group-hover:bg-accent/50 transition-colors">
											<ToolIcon className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
										</div>
										<div className="min-w-0">
											<h3 className="text-sm font-medium group-hover:text-foreground transition-colors">
												{tool.name}
											</h3>
											<p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
												{tool.description}
											</p>
										</div>
									</Link>
								);
							})}
						</div>
					</section>
				);
			})}
		</div>
	);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/index.tsx
git commit -m "feat: implement home page with hero and tool grid"
```

---

## Phase 3: Tools — Colors (Tasks 11–16)

> **Parallelization:** All tasks in Phases 3–9 are independent and can run in parallel after Phase 1 is complete. Each task creates/modifies only its own route file.

### Task 11: Color Format Converter

**Files:**
- Modify: `src/routes/_app/colors/color-converter.tsx`

- [ ] **Step 1: Implement the color converter tool**

Replace the stub in `src/routes/_app/colors/color-converter.tsx` with a full implementation that:
- Has a text input where users can paste any color format (hex, rgb, hsl, oklch)
- Uses `parseColor` from `#/lib/color` to convert to all formats
- Displays all 4 formats with copy buttons and a large color swatch preview
- Persists the last input using `usePersistedState`
- Wraps content in `<ToolPageLayout>`

Key imports: `parseColor`, `formatHex`, `formatRgb`, `formatHsl`, `formatOklch` from `#/lib/color`. Use `usePersistedState("colors:color-converter", "#6366f1")` for the input value. Use `<ColorSwatch>` for the preview and `<CopyButton>` for each format output.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/colors/color-converter.tsx
git commit -m "feat: implement color format converter tool"
```

---

### Task 12: Contrast Checker

**Files:**
- Modify: `src/routes/_app/colors/contrast-checker.tsx`

- [ ] **Step 1: Implement the contrast checker tool**

Replace the stub with a full implementation that:
- Has two color inputs (foreground and background) with color picker + text input
- Uses `contrastRatio` and `wcagLevel` from `#/lib/color`
- Shows the contrast ratio as a large number
- Shows WCAG AA/AAA pass/fail badges for both normal and large text
- Shows a live preview of the text on the background
- Persists both colors using `usePersistedState`

Use `usePersistedState("colors:contrast-fg", "#ffffff")` and `usePersistedState("colors:contrast-bg", "#1a1a2e")`.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/colors/contrast-checker.tsx
git commit -m "feat: implement contrast checker tool"
```

---

### Task 13: Palette Generator

**Files:**
- Modify: `src/routes/_app/colors/palette-generator.tsx`

- [ ] **Step 1: Implement the palette generator tool**

Replace the stub with a full implementation that:
- Has a seed color input (hex text + native color picker)
- Generates palettes using HSL manipulation: complementary (h+180), analogous (h±30), triadic (h±120), split-complementary (h+150, h+210), and monochromatic (vary lightness)
- Displays each palette type as a row of swatches with hex values
- Each swatch has a copy button for its hex value
- Persists seed color using `usePersistedState`

Convert seed hex to HSL, rotate hue for each harmony type, convert back to hex. Use `hexToRgb`, `rgbToHsl`, `hslToRgb`, `rgbToHex` from `#/lib/color`.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/colors/palette-generator.tsx
git commit -m "feat: implement palette generator tool"
```

---

### Task 14: Color Blindness Simulator

**Files:**
- Modify: `src/routes/_app/colors/color-blindness.tsx`

- [ ] **Step 1: Implement the color blindness simulator**

Replace the stub with a full implementation that:
- Has a color input (hex)
- Simulates three types of color vision deficiency: protanopia, deuteranopia, tritanopia
- Uses the Brettel/Viénot simulation matrices applied to linear RGB
- Shows original color alongside each simulated version with labels
- Persists input using `usePersistedState`

The simulation matrices for each CVD type (applied in linear RGB space):

**Protanopia matrix:**
```
[0.152286, 1.052583, -0.204868]
[0.114503, 0.786281,  0.099216]
[-0.003882, -0.048116, 1.051998]
```

**Deuteranopia matrix:**
```
[0.367322, 0.860646, -0.227968]
[0.280085, 0.672501,  0.047414]
[-0.011820, 0.042940, 0.968881]
```

**Tritanopia matrix:**
```
[1.255528, -0.076749, -0.178779]
[-0.078411, 0.930809,  0.147602]
[0.004733, 0.691367,  0.303900]
```

Convert input to linear RGB, apply matrix, convert back to sRGB, clamp, display.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/colors/color-blindness.tsx
git commit -m "feat: implement color blindness simulator tool"
```

---

### Task 15: Gradient Generator

**Files:**
- Modify: `src/routes/_app/colors/gradient-generator.tsx`

- [ ] **Step 1: Implement the gradient generator**

Replace the stub with a full implementation that:
- Supports linear, radial, and conic gradient types (tabs or select)
- Has a list of color stops — each with a color picker, hex input, and position (%) slider
- Add/remove stops buttons (min 2 stops)
- For linear: angle control (0–360 degree slider)
- For radial: shape selector (circle/ellipse)
- For conic: starting angle control
- Large preview area showing the live gradient
- CSS output with copy button via `<CodeOutput>`
- Persists state using `usePersistedState`

Default stops: `[{color: "#6366f1", position: 0}, {color: "#a855f7", position: 100}]`.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/colors/gradient-generator.tsx
git commit -m "feat: implement gradient generator tool"
```

---

### Task 16: Tailwind Color Finder

**Files:**
- Modify: `src/routes/_app/colors/tailwind-color-finder.tsx`
- Create: `src/lib/tailwind-colors.ts`

- [ ] **Step 1: Create Tailwind colors data file**

Create `src/lib/tailwind-colors.ts` with the full Tailwind CSS v4 default color palette as an array of `{ name: string, hex: string }` objects. Include all shades (50–950) for: slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose.

Format: `{ name: "indigo-500", hex: "#6366f1" }` etc.

- [ ] **Step 2: Implement the Tailwind color finder tool**

Replace the stub in `src/routes/_app/colors/tailwind-color-finder.tsx` with a full implementation that:
- Has a color input (hex text + native color picker)
- Calculates the Euclidean distance in RGB space between input and every Tailwind color
- Shows the top 5 nearest matches ranked by distance
- Each match shows: swatch, Tailwind class name (e.g., `bg-indigo-500`), hex value, distance percentage
- Persists input using `usePersistedState`

- [ ] **Step 3: Commit**

```bash
git add src/lib/tailwind-colors.ts src/routes/_app/colors/tailwind-color-finder.tsx
git commit -m "feat: implement Tailwind color finder tool"
```

---

## Phase 4: Tools — CSS (Tasks 17–21)

### Task 17: Box Shadow Generator

**Files:**
- Modify: `src/routes/_app/css/box-shadow.tsx`

- [ ] **Step 1: Implement the box shadow generator**

Replace the stub with a full implementation that:
- Supports multiple shadow layers (add/remove/reorder)
- Each layer has controls for: X offset, Y offset, blur, spread (all sliders), color (picker + hex input), inset toggle
- Live preview showing a card element with the combined shadow
- CSS output via `<CodeOutput>` showing the `box-shadow` value
- Persists state using `usePersistedState`

Default: one layer with `{ x: 0, y: 4, blur: 16, spread: 0, color: "#0000001a", inset: false }`.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/css/box-shadow.tsx
git commit -m "feat: implement box shadow generator tool"
```

---

### Task 18: Border Radius Visualizer

**Files:**
- Modify: `src/routes/_app/css/border-radius.tsx`

- [ ] **Step 1: Implement the border radius visualizer**

Replace the stub with a full implementation that:
- Has 4 sliders for individual corner radii (top-left, top-right, bottom-right, bottom-left) in px, 0–100 range
- A "link all corners" toggle that makes all sliders move together
- A live preview box (200x200) that shows the border radius applied
- CSS output showing `border-radius` shorthand via `<CodeOutput>`
- Persists state using `usePersistedState`

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/css/border-radius.tsx
git commit -m "feat: implement border radius visualizer tool"
```

---

### Task 19: Easing Editor

**Files:**
- Modify: `src/routes/_app/css/easing-editor.tsx`

- [ ] **Step 1: Implement the easing editor**

Replace the stub with a full implementation that:
- Has a visual cubic-bezier curve editor — a square canvas/SVG where users drag two control points (P1 and P2)
- Preset buttons for common easings: ease, ease-in, ease-out, ease-in-out, linear, plus some Material Design easings
- An animation preview strip — a ball that moves left to right using the current easing, with a play/replay button
- Editable numeric inputs for the 4 bezier values (x1, y1, x2, y2)
- CSS output: `transition-timing-function: cubic-bezier(x1, y1, x2, y2)` via `<CodeOutput>`
- Persists state using `usePersistedState`

Use SVG for the curve editor (easier than canvas for draggable control points). Default: `ease` = `cubic-bezier(0.25, 0.1, 0.25, 1)`.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/css/easing-editor.tsx
git commit -m "feat: implement easing editor tool"
```

---

### Task 20: CSS Grid Generator

**Files:**
- Modify: `src/routes/_app/css/grid-generator.tsx`

- [ ] **Step 1: Implement the CSS grid generator**

Replace the stub with a full implementation that:
- Has controls for: number of columns (1–12), number of rows (1–6), gap (px slider)
- Column/row size inputs (defaulting to `1fr` for each)
- A visual grid preview showing numbered cells
- Users can click cells to toggle "span" (spanning multiple columns/rows is a stretch goal — start with the basic grid definition)
- CSS output showing `display: grid`, `grid-template-columns`, `grid-template-rows`, and `gap` via `<CodeOutput>`
- Persists state using `usePersistedState`

Default: 3 columns of `1fr`, 2 rows of `1fr`, 16px gap.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/css/grid-generator.tsx
git commit -m "feat: implement CSS grid generator tool"
```

---

### Task 21: Glassmorphism Generator

**Files:**
- Modify: `src/routes/_app/css/glassmorphism.tsx`

- [ ] **Step 1: Implement the glassmorphism generator**

Replace the stub with a full implementation that:
- Has sliders for: blur (0–30px), saturation (100–200%), opacity (0–1), border opacity (0–1)
- Background picker — a few preset gradient backgrounds to preview the glass effect against
- Live preview showing a glass card on the selected background
- CSS output showing `backdrop-filter`, `background`, `border`, and `border-radius` via `<CodeOutput>`
- Persists state using `usePersistedState`

Default: blur 12px, saturation 180%, opacity 0.15, border opacity 0.2.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/css/glassmorphism.tsx
git commit -m "feat: implement glassmorphism generator tool"
```

---

## Phase 5: Tools — Typography (Tasks 22–25)

### Task 22: Fluid Type Scale Calculator

**Files:**
- Modify: `src/routes/_app/typography/fluid-type-scale.tsx`

- [ ] **Step 1: Implement the fluid type scale calculator**

Replace the stub with a full implementation that:
- Has inputs for: min viewport width (px), max viewport width (px), base font size min (px), base font size max (px), scale ratio (select: minor third 1.2, major third 1.25, perfect fourth 1.333, augmented fourth 1.414, perfect fifth 1.5)
- Generates a type scale from `xs` to `4xl` (7 steps: -2 to +4 relative to base)
- For each step, shows: step label, font size at min viewport, font size at max viewport, CSS `clamp()` value, live preview at current viewport
- CSS output with all steps as custom properties via `<CodeOutput>`
- Persists state using `usePersistedState`

Clamp formula: `clamp(minSize, calc(minSize + (maxSize - minSize) * ((100vw - minVw) / (maxVw - minVw))), maxSize)` — simplify the calc for the output.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/typography/fluid-type-scale.tsx
git commit -m "feat: implement fluid type scale calculator tool"
```

---

### Task 23: Font Pair Previewer

**Files:**
- Modify: `src/routes/_app/typography/font-pair-previewer.tsx`

- [ ] **Step 1: Implement the font pair previewer**

Replace the stub with a full implementation that:
- Has a curated list of 8–10 Google Font pairings (e.g., Playfair Display + Source Sans 3, Space Grotesk + Inter, etc.)
- Loads the fonts dynamically by inserting a `<link>` tag for the Google Fonts API
- Shows a preview card for each pairing with the heading font for an `<h1>` and the body font for a paragraph
- Editable sample text input (shared across all previews)
- A "selected" state that shows the Google Fonts `<link>` tag and CSS declarations via `<CodeOutput>`
- Persists selected pair and sample text using `usePersistedState`

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/typography/font-pair-previewer.tsx
git commit -m "feat: implement font pair previewer tool"
```

---

### Task 24: Line Height Calculator

**Files:**
- Modify: `src/routes/_app/typography/line-height-calculator.tsx`

- [ ] **Step 1: Implement the line height calculator**

Replace the stub with a full implementation that:
- Has a font size input (px, range 8–72)
- Content type selector: body text, headings, UI/compact
- Calculates recommended line-height using established ratios:
  - Body text: `1.5` for small sizes, decreasing to `1.4` for larger sizes
  - Headings: `1.2` for small, `1.1` for large
  - UI: `1.3` for small, `1.2` for large
- Shows the calculated line-height as both a unitless ratio and px value
- Live preview with sample text at the given font-size and line-height
- CSS output via `<CodeOutput>`
- Persists state using `usePersistedState`

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/typography/line-height-calculator.tsx
git commit -m "feat: implement line height calculator tool"
```

---

### Task 25: Text Stroke & Shadow

**Files:**
- Modify: `src/routes/_app/typography/text-stroke-shadow.tsx`

- [ ] **Step 1: Implement the text stroke & shadow editor**

Replace the stub with a full implementation that:
- Has tabs for "Text Shadow" and "Text Stroke"
- **Text Shadow tab:** X offset, Y offset, blur radius (sliders), color picker. Multiple shadow layers supported (add/remove).
- **Text Stroke tab:** Width (slider 0–5px), color picker, fill color picker
- Large text preview ("Preview Text" — editable) showing the effect
- CSS output for `text-shadow` and/or `-webkit-text-stroke` + `-webkit-text-fill-color` via `<CodeOutput>`
- Persists state using `usePersistedState`

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/typography/text-stroke-shadow.tsx
git commit -m "feat: implement text stroke and shadow editor tool"
```

---

## Phase 6: Tools — Converters (Tasks 26–30)

### Task 26: px ↔ rem Converter

**Files:**
- Modify: `src/routes/_app/converters/px-rem.tsx`

- [ ] **Step 1: Implement the px/rem converter**

Replace the stub with a full implementation that:
- Has a base font size input (default: 16px)
- Two-column layout: px input on left, rem input on right
- Typing in either field updates the other in real-time
- Shows a reference table of common values (8, 12, 14, 16, 18, 20, 24, 32, 48, 64, 96 px) with their rem equivalents
- Persists base size and last input using `usePersistedState`

Formula: `rem = px / base`, `px = rem * base`.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/converters/px-rem.tsx
git commit -m "feat: implement px/rem converter tool"
```

---

### Task 27: SVG Optimizer

**Files:**
- Modify: `src/routes/_app/converters/svg-optimizer.tsx`

- [ ] **Step 1: Implement the SVG optimizer**

Replace the stub with a full implementation that:
- Has a textarea for pasting SVG markup
- Applies client-side optimizations: remove comments, remove metadata, remove empty attributes, minify whitespace, shorten color hex values, remove default attribute values
- Shows before/after file size comparison (bytes and % reduction)
- Shows the optimized SVG in a textarea with copy button
- Live SVG preview (renders the SVG using `dangerouslySetInnerHTML` inside a sandboxed container)
- Persists input using `usePersistedState`

Implement a simple `optimizeSvg(input: string): string` function in the component that uses regex-based transformations (not a full SVG parser — keep it simple):
- Remove XML comments `<!-- ... -->`
- Remove `<?xml ...?>` declarations
- Remove `<metadata>...</metadata>` blocks
- Collapse whitespace between attributes
- Remove empty `class=""`, `style=""` attributes

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/converters/svg-optimizer.tsx
git commit -m "feat: implement SVG optimizer tool"
```

---

### Task 28: Markdown ↔ HTML

**Files:**
- Modify: `src/routes/_app/converters/markdown-html.tsx`

- [ ] **Step 1: Implement the Markdown/HTML converter**

Replace the stub with a full implementation that:
- Has a split-pane layout (two columns)
- Left pane: Markdown textarea input
- Right pane: tabs for "Preview" (rendered HTML) and "HTML" (raw HTML source with copy button)
- Uses the `marked` library to convert Markdown → HTML
- Live conversion as user types
- Persists markdown input using `usePersistedState`

Import: `import { marked } from "marked"`. Call `marked.parse(input)` for conversion.

Default markdown content: a small sample with heading, paragraph, code block, list, and link.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/converters/markdown-html.tsx
git commit -m "feat: implement Markdown/HTML converter tool"
```

---

### Task 29: Image to Base64

**Files:**
- Modify: `src/routes/_app/converters/image-to-base64.tsx`

- [ ] **Step 1: Implement the Image to Base64 converter**

Replace the stub with a full implementation that:
- Has a drag-and-drop zone + file input for image upload
- Accepts common image formats (png, jpg, gif, webp, svg)
- Uses `FileReader.readAsDataURL()` to convert to Base64
- Shows: image preview, original file size, Base64 string length, data URI in a textarea with copy button
- Also shows a `<img src="...">` HTML snippet via `<CodeOutput>`
- No persistence needed (file data is ephemeral)

Style the drop zone with a dashed border, icon, and "Drop image here" text. Show a visual feedback on dragover.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/converters/image-to-base64.tsx
git commit -m "feat: implement Image to Base64 converter tool"
```

---

### Task 30: Image Format Converter

**Files:**
- Modify: `src/routes/_app/converters/image-format-converter.tsx`

- [ ] **Step 1: Implement the image format converter**

Replace the stub with a full implementation that:
- Has a drag-and-drop zone + file input for image upload
- Shows the uploaded image preview with original format and file size
- Has a target format selector: PNG, WebP, JPEG (AVIF only if browser supports it — check via `document.createElement('canvas').toDataURL('image/avif')`)
- Quality slider (0.1–1.0) for lossy formats (JPEG, WebP)
- Convert button that uses: `canvas.toBlob(callback, 'image/webp', quality)` and `canvas.toDataURL('image/png')`
- Shows converted image preview, new file size, size difference percentage
- Download button for the converted image (creates a Blob URL + `<a download>` click)
- No persistence needed (file data is ephemeral)

Conversion flow: load image into `<img>` → draw onto `<canvas>` → export as target format.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/converters/image-format-converter.tsx
git commit -m "feat: implement image format converter tool"
```

---

## Phase 7: Tools — Encoding (Tasks 31–35)

### Task 31: Base64 Encode/Decode

**Files:**
- Modify: `src/routes/_app/encoding/base64.tsx`

- [ ] **Step 1: Implement the Base64 encoder/decoder**

Replace the stub with a full implementation that:
- Has a mode toggle: Encode / Decode
- Input textarea (top) and output textarea (bottom, read-only with copy button)
- Auto-converts as user types
- Handles Unicode correctly using `TextEncoder`/`TextDecoder` + manual Base64 encoding for binary-safe conversion
- Shows character count for both input and output
- Persists mode and input using `usePersistedState`

Encode: `btoa(String.fromCodePoint(...new TextEncoder().encode(input)))` (handle binary properly).
Decode: `new TextDecoder().decode(Uint8Array.from(atob(input), c => c.codePointAt(0)!))`.
Wrap in try/catch and show error message for invalid Base64 input.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/encoding/base64.tsx
git commit -m "feat: implement Base64 encode/decode tool"
```

---

### Task 32: URL Encode/Decode

**Files:**
- Modify: `src/routes/_app/encoding/url-encode.tsx`

- [ ] **Step 1: Implement the URL encoder/decoder**

Replace the stub with a full implementation that:
- Has a mode toggle: Encode / Decode
- Input textarea and output textarea with copy button
- Auto-converts as user types
- Uses `encodeURIComponent()` / `decodeURIComponent()`
- Shows a "changes" indicator highlighting which characters were encoded/decoded
- Persists mode and input using `usePersistedState`

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/encoding/url-encode.tsx
git commit -m "feat: implement URL encode/decode tool"
```

---

### Task 33: JSON Formatter

**Files:**
- Modify: `src/routes/_app/encoding/json-formatter.tsx`

- [ ] **Step 1: Implement the JSON formatter**

Replace the stub with a full implementation that:
- Has a textarea for pasting JSON
- Auto-formats with `JSON.stringify(JSON.parse(input), null, 2)`
- Shows formatted output in a `<CodeOutput>` with `language="json"`
- Validation: shows green "Valid JSON" badge or red error message with line/position info (from the `SyntaxError` message)
- Minify button that outputs `JSON.stringify(JSON.parse(input))`
- Tab size selector (2 or 4 spaces)
- Persists input using `usePersistedState`

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/encoding/json-formatter.tsx
git commit -m "feat: implement JSON formatter tool"
```

---

### Task 34: JWT Decoder

**Files:**
- Modify: `src/routes/_app/encoding/jwt-decoder.tsx`

- [ ] **Step 1: Implement the JWT decoder**

Replace the stub with a full implementation that:
- Has a textarea for pasting a JWT token
- Splits on `.` to get header, payload, signature parts
- Decodes header and payload from Base64URL (replace `-` with `+`, `_` with `/`, add padding, then `atob` and `JSON.parse`)
- Displays decoded header and payload as formatted JSON in separate `<CodeOutput>` blocks
- Shows the raw signature (hex-encoded or Base64)
- If payload has `exp` field, shows expiry date and whether it's expired (with colored badge)
- If payload has `iat` field, shows issued-at date
- Shows error state for invalid JWT format
- Persists input using `usePersistedState`

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/encoding/jwt-decoder.tsx
git commit -m "feat: implement JWT decoder tool"
```

---

### Task 35: HTML Entity Encoder

**Files:**
- Modify: `src/routes/_app/encoding/html-entity-encoder.tsx`

- [ ] **Step 1: Implement the HTML entity encoder/decoder**

Replace the stub with a full implementation that:
- Has a mode toggle: Encode / Decode
- Input textarea and output textarea with copy button
- Encode mode: converts `<`, `>`, `&`, `"`, `'` and optionally all non-ASCII characters to their HTML entity equivalents (`&lt;`, `&#x1F600;`, etc.)
- Decode mode: uses a hidden `<textarea>` element's `.innerHTML` / `.value` trick to decode entities, or a regex-based approach
- Shows a reference table of common HTML entities
- Persists mode and input using `usePersistedState`

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/encoding/html-entity-encoder.tsx
git commit -m "feat: implement HTML entity encoder tool"
```

---

## Phase 8: Tools — Generators (Tasks 36–40)

### Task 36: UUID Generator

**Files:**
- Modify: `src/routes/_app/generators/uuid.tsx`

- [ ] **Step 1: Implement the UUID generator**

Replace the stub with a full implementation that:
- Has a "Generate" button that creates a new v4 UUID using `crypto.randomUUID()`
- Displays the UUID in a large monospace text with a copy button
- Bulk mode: input for count (1–100), generates a list of UUIDs
- Each UUID in the list has its own copy button
- "Copy All" button for bulk mode
- Options: uppercase/lowercase toggle, with/without dashes toggle
- Persists options using `usePersistedState`

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/generators/uuid.tsx
git commit -m "feat: implement UUID generator tool"
```

---

### Task 37: Lorem Ipsum Generator

**Files:**
- Modify: `src/routes/_app/generators/lorem-ipsum.tsx`

- [ ] **Step 1: Implement the Lorem Ipsum generator**

Replace the stub with a full implementation that:
- Has controls for: unit type (paragraphs, sentences, words), count (1–20 for paragraphs, 1–50 for sentences, 1–500 for words)
- "Start with 'Lorem ipsum dolor sit amet...'" toggle
- Generates text from a bank of Latin sentences (include ~20 sentences in the component)
- Shows generated text in a styled output area with copy button
- "Regenerate" button for new random combinations
- Persists settings using `usePersistedState`

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/generators/lorem-ipsum.tsx
git commit -m "feat: implement Lorem Ipsum generator tool"
```

---

### Task 38: Meta Tag Generator

**Files:**
- Modify: `src/routes/_app/generators/meta-tag.tsx`

- [ ] **Step 1: Implement the Meta Tag generator**

Replace the stub with a full implementation that:
- Has form fields for: page title, description, canonical URL, author, keywords, OG image URL, Twitter card type (summary, summary_large_image), Twitter handle, robots (index/noindex, follow/nofollow)
- Generates the complete set of meta tags based on filled fields
- Output includes: `<title>`, `<meta name="description">`, `<meta name="author">`, `<meta name="keywords">`, `<link rel="canonical">`, OG tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`), Twitter tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site`), `<meta name="robots">`
- Only includes tags for fields that are filled (don't output empty tags)
- Shows output via `<CodeOutput language="html">`
- Persists all fields using `usePersistedState`

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/generators/meta-tag.tsx
git commit -m "feat: implement meta tag generator tool"
```

---

### Task 39: Favicon Generator

**Files:**
- Modify: `src/routes/_app/generators/favicon.tsx`

- [ ] **Step 1: Implement the favicon generator**

Replace the stub with a full implementation that:
- Has two input modes: upload image (drag-and-drop + file picker) or pick emoji (text input for any emoji character)
- For image upload: draws onto canvas at 16x16, 32x32, 48x48, 180x180 (apple-touch-icon) sizes
- For emoji: renders emoji on canvas at each size using `ctx.fillText()` with appropriate font size
- Shows previews of each generated size
- "Download All" button that creates a zip of all sizes (or individual download buttons per size)
- Shows the HTML `<link>` tags to include in `<head>` via `<CodeOutput>`
- No persistence needed (generated files are ephemeral)

Use `canvas.toBlob()` for downloads. For simplicity, offer individual PNG downloads per size rather than building a zip.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/generators/favicon.tsx
git commit -m "feat: implement favicon generator tool"
```

---

### Task 40: robots.txt Builder

**Files:**
- Modify: `src/routes/_app/generators/robots-txt.tsx`

- [ ] **Step 1: Implement the robots.txt builder**

Replace the stub with a full implementation that:
- Has a list of "rule groups", each with: User-agent (text input), Allow paths (list of text inputs), Disallow paths (list of text inputs)
- Add/remove rule groups, add/remove individual paths
- Sitemap URL input (optional)
- Preset buttons: "Allow All" (`User-agent: * / Allow: /`), "Block All" (`User-agent: * / Disallow: /`), "Block AI Bots" (disallow for GPTBot, Google-Extended, CCBot, etc.)
- Output in a `<CodeOutput>` showing the generated `robots.txt` content
- Persists state using `usePersistedState`

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/generators/robots-txt.tsx
git commit -m "feat: implement robots.txt builder tool"
```

---

## Phase 9: Tools — Preview & Debug (Tasks 41–43)

### Task 41: Open Graph Preview

**Files:**
- Modify: `src/routes/_app/preview/open-graph.tsx`

- [ ] **Step 1: Implement the Open Graph preview tool**

Replace the stub with a full implementation that:
- Has form fields for: title, description, image URL, site name, URL
- Shows 3 preview cards styled to match: Facebook/LinkedIn card, Twitter card (summary_large_image), Discord embed
- Each preview card is a faithful visual approximation of how the platform renders OG data (card with image on top, title bold below, description, domain)
- Updates live as fields change
- Persists all fields using `usePersistedState`

Focus on visual fidelity of the preview cards — match the approximate styles (border-radius, font sizes, image aspect ratio, background colors) of each platform.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/preview/open-graph.tsx
git commit -m "feat: implement Open Graph preview tool"
```

---

### Task 42: Responsive Breakpoint Previewer

**Files:**
- Modify: `src/routes/_app/preview/responsive-breakpoints.tsx`

- [ ] **Step 1: Implement the responsive breakpoint previewer**

Replace the stub with a full implementation that:
- Has a URL input field
- Shows the URL rendered in iframes at common breakpoints: Mobile (375px), Tablet (768px), Desktop (1024px), Large Desktop (1440px)
- Each iframe is scaled down to fit the viewport using CSS `transform: scale()`
- Breakpoint labels with dimensions shown above each preview
- A single-view mode where the user can pick one breakpoint and see it at a larger scale
- Persists URL using `usePersistedState`

Note: Iframes may be blocked by X-Frame-Options on many sites. Show a helpful message if the iframe fails to load.

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/preview/responsive-breakpoints.tsx
git commit -m "feat: implement responsive breakpoint previewer tool"
```

---

### Task 43: JSON-LD Builder

**Files:**
- Modify: `src/routes/_app/preview/json-ld-builder.tsx`

- [ ] **Step 1: Implement the JSON-LD builder**

Replace the stub with a full implementation that:
- Has a schema type selector: Article, FAQ, Product, Organization, BreadcrumbList, WebSite
- Shows a dynamic form based on selected type with fields matching the schema.org spec:
  - **Article:** headline, author (name, url), datePublished, dateModified, image, publisher (name, logo)
  - **FAQ:** list of question/answer pairs (add/remove)
  - **Product:** name, description, image, brand, offers (price, currency, availability)
  - **Organization:** name, url, logo, contactPoint (phone, type)
  - **BreadcrumbList:** list of items (name, url) — ordered
  - **WebSite:** name, url, searchAction target URL
- Generates valid JSON-LD wrapped in `<script type="application/ld+json">`
- Shows output via `<CodeOutput language="json">`
- Basic validation: highlights required fields that are empty
- Persists selected type and field values using `usePersistedState`

- [ ] **Step 2: Commit**

```bash
git add src/routes/_app/preview/json-ld-builder.tsx
git commit -m "feat: implement JSON-LD builder tool"
```

---

## Phase 10: Final Polish (Task 44)

### Task 44: Final verification

**Files:**
- None created (verification only)

- [ ] **Step 1: Regenerate routes**

```bash
cd /home/isadia/Development/projects/webtoolkit
bun --bun run generate-routes
```

- [ ] **Step 2: Run linting**

```bash
cd /home/isadia/Development/projects/webtoolkit
bun --bun run check
```

Fix any linting issues found.

- [ ] **Step 3: Run tests**

```bash
cd /home/isadia/Development/projects/webtoolkit
bun --bun run test
```

All tests should pass.

- [ ] **Step 4: Build for production**

```bash
cd /home/isadia/Development/projects/webtoolkit
bun --bun run build
```

Build should succeed with no errors.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final polish and verification"
```
