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
