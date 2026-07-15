import type { LucideIcon } from "lucide-react";
import {
	Baseline,
	Binary,
	Braces,
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
	Paintbrush,
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
				keywords: [
					"colorblind",
					"protanopia",
					"deuteranopia",
					"tritanopia",
					"cvd",
				],
			},
			{
				slug: "gradient-generator",
				name: "Gradient Generator",
				description: "Build linear, radial, and conic CSS gradients visually",
				icon: Paintbrush,
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
				description:
					"Format, validate, and minify JSON with syntax highlighting",
				icon: Braces,
				path: "/encoding/json-formatter",
				keywords: ["json", "format", "validate", "pretty", "minify"],
			},
			{
				slug: "jwt-decoder",
				name: "JWT Decoder",
				description:
					"Decode JWT tokens and inspect header, payload, and signature",
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
				description:
					"Generate placeholder text by paragraphs, sentences, or words",
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
				keywords: [
					"og",
					"open-graph",
					"facebook",
					"linkedin",
					"social",
					"card",
				],
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
