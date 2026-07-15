import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { parseColor, rgbToHex } from "#/lib/color";

export const Route = createFileRoute("/colors/color-blindness")({
	component: ColorBlindnessSimulator,
});

type Matrix = [
	[number, number, number],
	[number, number, number],
	[number, number, number],
];

const matrices: Record<string, Matrix> = {
	protanopia: [
		[0.567, 0.433, 0],
		[0.558, 0.442, 0],
		[0, 0.242, 0.758],
	],
	deuteranopia: [
		[0.625, 0.375, 0],
		[0.7, 0.3, 0],
		[0, 0.3, 0.7],
	],
	tritanopia: [
		[0.95, 0.05, 0],
		[0, 0.433, 0.567],
		[0, 0.475, 0.525],
	],
	achromatopsia: [
		[0.299, 0.587, 0.114],
		[0.299, 0.587, 0.114],
		[0.299, 0.587, 0.114],
	],
};

const applyMatrix = (r: number, g: number, b: number, matrix: Matrix) => {
	const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
	return {
		r: clamp(r * matrix[0][0] + g * matrix[0][1] + b * matrix[0][2]),
		g: clamp(r * matrix[1][0] + g * matrix[1][1] + b * matrix[1][2]),
		b: clamp(r * matrix[2][0] + g * matrix[2][1] + b * matrix[2][2]),
	};
};

function ColorBlindnessSimulator() {
	const [input, setInput] = useState("#ff5500");
	const parsed = parseColor(input);

	return (
		<ToolPageLayout>
			<div className="space-y-8 max-w-4xl">
				<div className="space-y-4 max-w-xl">
					<Label htmlFor="color">Original Color</Label>
					<div className="flex gap-4">
						<Input
							type="color"
							value={parsed?.hex ?? "#000000"}
							onChange={(e) => setInput(e.target.value)}
							className="w-16 p-1 h-12 cursor-pointer"
						/>
						<Input
							value={input}
							onChange={(e) => setInput(e.target.value)}
							className="h-12 text-lg font-mono"
						/>
					</div>
				</div>

				{parsed && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						<div className="space-y-3">
							<h3 className="font-semibold">Original</h3>
							<div
								className="h-24 rounded-lg shadow-inner border border-border"
								style={{ backgroundColor: parsed.hex }}
							/>
							<div className="text-sm font-mono text-muted-foreground">
								{parsed.hex}
							</div>
						</div>

						{Object.entries(matrices).map(([name, matrix]) => {
							const sim = applyMatrix(
								parsed.rgb.r,
								parsed.rgb.g,
								parsed.rgb.b,
								matrix,
							);
							const hex = rgbToHex(sim);
							return (
								<div key={name} className="space-y-3">
									<h3 className="font-semibold capitalize">{name}</h3>
									<div
										className="h-24 rounded-lg shadow-inner border border-border"
										style={{ backgroundColor: hex }}
									/>
									<div className="text-sm font-mono text-muted-foreground">
										{hex}
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</ToolPageLayout>
	);
}
