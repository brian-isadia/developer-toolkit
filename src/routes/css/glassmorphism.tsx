import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CodeOutput } from "#/components/code-output";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Slider } from "#/components/ui/slider";

export const Route = createFileRoute("/css/glassmorphism")({
	component: GlassmorphismGenerator,
});

function GlassmorphismGenerator() {
	const [blur, setBlur] = useState(10);
	const [opacity, setOpacity] = useState(0.2);
	const [color, setColor] = useState("#ffffff");

	// Convert hex to rgb for rgba
	const hexToRgb = (hex: string) => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
				}
			: { r: 255, g: 255, b: 255 };
	};

	const rgb = hexToRgb(color);
	const rgbaString = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;

	const css = `background: ${rgbaString};
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(255, 255, 255, 0.1);`;

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[400px_1fr] gap-8">
				<div className="space-y-8 bg-card p-6 border border-border rounded-xl h-fit">
					<div className="space-y-3">
						<div className="flex justify-between">
							<Label>Blur</Label>
							<span className="text-sm text-muted-foreground">{blur}px</span>
						</div>
						<Slider
							min={0}
							max={40}
							step={0.5}
							value={[blur]}
							onValueChange={([v]) => setBlur(v)}
						/>
					</div>

					<div className="space-y-3">
						<div className="flex justify-between">
							<Label>Opacity</Label>
							<span className="text-sm text-muted-foreground">
								{opacity.toFixed(2)}
							</span>
						</div>
						<Slider
							min={0}
							max={1}
							step={0.01}
							value={[opacity]}
							onValueChange={([v]) => setOpacity(v)}
						/>
					</div>

					<div className="space-y-3">
						<Label>Color</Label>
						<div className="flex gap-4">
							<Input
								type="color"
								value={color}
								onChange={(e) => setColor(e.target.value)}
								className="w-12 p-1 h-10"
							/>
							<Input
								value={color}
								onChange={(e) => setColor(e.target.value)}
								className="flex-1 font-mono uppercase"
							/>
						</div>
					</div>
				</div>

				<div className="space-y-6">
					<div className="w-full h-[500px] rounded-xl flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-rose-400 via-fuchsia-500 to-indigo-500">
						{/* Background decorative elements */}
						<div className="absolute top-10 left-10 w-64 h-64 bg-white/20 rounded-full blur-2xl"></div>
						<div className="absolute bottom-10 right-10 w-48 h-48 bg-black/20 rounded-full blur-2xl"></div>
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-300/40 rounded-full blur-xl"></div>

						{/* The Glass Panel */}
						<div
							className="relative w-80 h-80 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col p-8 z-10"
							style={{
								background: rgbaString,
								backdropFilter: `blur(${blur}px)`,
								WebkitBackdropFilter: `blur(${blur}px)`,
							}}
						>
							<div className="w-12 h-12 bg-white/30 rounded-full mb-6"></div>
							<div className="w-full h-4 bg-white/30 rounded mb-4"></div>
							<div className="w-3/4 h-4 bg-white/20 rounded mb-4"></div>
							<div className="w-1/2 h-4 bg-white/20 rounded"></div>

							<div className="mt-auto flex justify-between items-center">
								<div className="w-16 h-8 bg-white/20 rounded-md"></div>
								<div className="text-white/80 font-semibold text-sm">
									Glassmorphism
								</div>
							</div>
						</div>
					</div>
					<CodeOutput code={css} language="css" label="CSS" />
				</div>
			</div>
		</ToolPageLayout>
	);
}
