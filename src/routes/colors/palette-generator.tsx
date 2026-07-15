import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { useCopyToClipboard } from "#/hooks/use-copy-to-clipboard";
import { hslToRgb, parseColor, rgbToHex } from "#/lib/color";

export const Route = createFileRoute("/colors/palette-generator")({
	component: PaletteGenerator,
});

function PaletteDisplay({ colors }: { colors: string[] }) {
	const { copy, copied } = useCopyToClipboard();
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div className="flex h-32 w-full rounded-lg overflow-hidden border border-border shadow-sm">
			{colors.map((color, i) => (
				<button
					key={`${color}-${i}`}
					className="flex-1 transition-all duration-200 relative group cursor-pointer hover:flex-[1.5]"
					style={{ backgroundColor: color }}
					onClick={() => {
						copy(color);
						setHoveredIndex(i);
					}}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity">
						<span className="text-white font-mono text-sm px-2 py-1 bg-black/50 rounded backdrop-blur-sm">
							{copied && hoveredIndex === i ? "Copied!" : color}
						</span>
					</div>
				</button>
			))}
		</div>
	);
}

function PaletteGenerator() {
	const [input, setInput] = useState("#3b82f6");
	const parsed = parseColor(input);

	let palettes = {
		complementary: [] as string[],
		analogous: [] as string[],
		triadic: [] as string[],
		monochromatic: [] as string[],
	};

	if (parsed) {
		const { h, s, l } = parsed.hsl;

		const toHex = (hue: number, sat: number, lit: number) => {
			const normH = (hue + 360) % 360;
			return rgbToHex(hslToRgb({ h: normH, s: sat, l: lit }));
		};

		palettes = {
			complementary: [parsed.hex, toHex(h + 180, s, l)],
			analogous: [toHex(h - 30, s, l), parsed.hex, toHex(h + 30, s, l)],
			triadic: [parsed.hex, toHex(h + 120, s, l), toHex(h + 240, s, l)],
			monochromatic: [
				toHex(h, s, Math.max(l - 40, 10)),
				toHex(h, s, Math.max(l - 20, 20)),
				parsed.hex,
				toHex(h, s, Math.min(l + 20, 80)),
				toHex(h, s, Math.min(l + 40, 95)),
			],
		};
	}

	return (
		<ToolPageLayout>
			<div className="space-y-8 max-w-3xl">
				<div className="space-y-4">
					<Label htmlFor="base-color">Base Color</Label>
					<div className="flex gap-4">
						<Input
							id="base-color-picker"
							type="color"
							value={parsed?.hex ?? "#3b82f6"}
							onChange={(e) => setInput(e.target.value)}
							className="w-16 p-1 h-12 cursor-pointer"
						/>
						<Input
							id="base-color"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							className="h-12 text-lg flex-1"
							placeholder="#3b82f6"
						/>
					</div>
					{!parsed && input && (
						<p className="text-sm text-destructive">Invalid color</p>
					)}
				</div>

				{parsed && (
					<Tabs defaultValue="monochromatic" className="w-full">
						<TabsList className="w-full justify-start overflow-x-auto">
							<TabsTrigger value="monochromatic">Monochromatic</TabsTrigger>
							<TabsTrigger value="analogous">Analogous</TabsTrigger>
							<TabsTrigger value="complementary">Complementary</TabsTrigger>
							<TabsTrigger value="triadic">Triadic</TabsTrigger>
						</TabsList>
						<div className="mt-6">
							<TabsContent value="monochromatic">
								<PaletteDisplay colors={palettes.monochromatic} />
								<p className="text-sm text-muted-foreground mt-4">
									Variations in lightness of the same hue. Creates a cohesive
									and harmonious look.
								</p>
							</TabsContent>
							<TabsContent value="analogous">
								<PaletteDisplay colors={palettes.analogous} />
								<p className="text-sm text-muted-foreground mt-4">
									Colors next to each other on the color wheel. Often found in
									nature and pleasing to the eye.
								</p>
							</TabsContent>
							<TabsContent value="complementary">
								<PaletteDisplay colors={palettes.complementary} />
								<p className="text-sm text-muted-foreground mt-4">
									Colors opposite each other on the color wheel. High contrast
									and high impact.
								</p>
							</TabsContent>
							<TabsContent value="triadic">
								<PaletteDisplay colors={palettes.triadic} />
								<p className="text-sm text-muted-foreground mt-4">
									Three colors evenly spaced around the color wheel. Vibrant
									even when using pale versions of hues.
								</p>
							</TabsContent>
						</div>
					</Tabs>
				)}
			</div>
		</ToolPageLayout>
	);
}
