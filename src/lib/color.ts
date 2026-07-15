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
	const oklchMatch = trimmed.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
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
