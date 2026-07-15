import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CodeOutput } from "#/components/code-output";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

export const Route = createFileRoute("/typography/fluid-type-scale")({
	component: FluidTypeScale,
});

function FluidTypeScale() {
	const [minView, setMinView] = useState(320);
	const [maxView, setMaxView] = useState(1280);
	const [minBase, setMinBase] = useState(16);
	const [maxBase, setMaxBase] = useState(20);
	const [minScale, setMinScale] = useState(1.2);
	const [maxScale, setMaxScale] = useState(1.333);
	const [steps, setSteps] = useState(5);

	const generateClamp = (stepIndex: number) => {
		// Calculate min and max size for this step
		const minSize = minBase * minScale ** stepIndex;
		const maxSize = maxBase * maxScale ** stepIndex;

		// Math for clamp:
		// slope = (maxSize - minSize) / (maxViewport - minViewport)
		// yAxisIntersection = -minViewport * slope + minSize
		// preferredValue = yAxisIntersection[rem] + (slope * 100)[vw]

		const slope = (maxSize - minSize) / (maxView - minView);
		const yAxisInt = minSize - minView * slope;

		const minRem = (minSize / 16).toFixed(4);
		const maxRem = (maxSize / 16).toFixed(4);
		const yAxisRem = (yAxisInt / 16).toFixed(4);
		const vw = (slope * 100).toFixed(4);

		return `clamp(${minRem}rem, ${yAxisRem}rem + ${vw}vw, ${maxRem}rem)`;
	};

	const generateCSS = () => {
		let css = ":root {\n";
		for (let i = -1; i <= steps; i++) {
			css += `  --step-${i}: ${generateClamp(i)};\n`;
		}
		css += "}";
		return css;
	};

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[350px_1fr] gap-8">
				<div className="space-y-6 bg-card p-6 border border-border rounded-xl h-fit">
					<div className="space-y-4">
						<h3 className="font-semibold text-sm">Viewport Width (px)</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Min</Label>
								<Input
									type="number"
									value={minView}
									onChange={(e) => setMinView(Number(e.target.value))}
								/>
							</div>
							<div className="space-y-2">
								<Label>Max</Label>
								<Input
									type="number"
									value={maxView}
									onChange={(e) => setMaxView(Number(e.target.value))}
								/>
							</div>
						</div>
					</div>

					<div className="space-y-4 pt-4 border-t border-border">
						<h3 className="font-semibold text-sm">Base Font Size (px)</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Min</Label>
								<Input
									type="number"
									value={minBase}
									onChange={(e) => setMinBase(Number(e.target.value))}
								/>
							</div>
							<div className="space-y-2">
								<Label>Max</Label>
								<Input
									type="number"
									value={maxBase}
									onChange={(e) => setMaxBase(Number(e.target.value))}
								/>
							</div>
						</div>
					</div>

					<div className="space-y-4 pt-4 border-t border-border">
						<h3 className="font-semibold text-sm">Scale Ratio</h3>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label>Min Scale</Label>
								<Input
									type="number"
									step={0.001}
									value={minScale}
									onChange={(e) => setMinScale(Number(e.target.value))}
								/>
							</div>
							<div className="space-y-2">
								<Label>Max Scale</Label>
								<Input
									type="number"
									step={0.001}
									value={maxScale}
									onChange={(e) => setMaxScale(Number(e.target.value))}
								/>
							</div>
						</div>
					</div>

					<div className="space-y-4 pt-4 border-t border-border">
						<div className="space-y-2">
							<Label>Positive Steps</Label>
							<Input
								type="number"
								value={steps}
								onChange={(e) => setSteps(Number(e.target.value))}
							/>
						</div>
					</div>
				</div>

				<div className="space-y-8">
					<div className="bg-card border border-border rounded-xl p-8 space-y-6 overflow-hidden">
						{Array.from({ length: steps + 2 }).map((_, idx) => {
							const i = steps - idx; // Start from highest
							const minSize = Math.round(minBase * minScale ** i);
							const maxSize = Math.round(maxBase * maxScale ** i);
							return (
								<div key={i} className="flex items-baseline gap-4 w-full">
									<div className="w-16 shrink-0 text-xs text-muted-foreground">
										step-{i}
										<br />
										{minSize}-{maxSize}px
									</div>
									<div
										className="truncate font-semibold tracking-tight"
										style={{
											fontSize: `clamp(${minSize}px, 2vw, ${maxSize}px)`,
										}}
									>
										The quick brown fox
									</div>
								</div>
							);
						})}
					</div>

					<CodeOutput
						code={generateCSS()}
						language="css"
						label="CSS Variables"
					/>
				</div>
			</div>
		</ToolPageLayout>
	);
}
