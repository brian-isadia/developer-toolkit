import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Label } from "#/components/ui/label";
import { Slider } from "#/components/ui/slider";
import { CodeOutput } from "#/components/code-output";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "#/components/ui/select";
import { Button } from "#/components/ui/button";
import { Play } from "lucide-react";

export const Route = createFileRoute("/css/easing-editor")({
	component: EasingEditor,
});

const PRESETS: Record<string, [number, number, number, number]> = {
	"linear": [0, 0, 1, 1],
	"ease": [0.25, 0.1, 0.25, 1],
	"ease-in": [0.42, 0, 1, 1],
	"ease-out": [0, 0, 0.58, 1],
	"ease-in-out": [0.42, 0, 0.58, 1],
	"out-back": [0.34, 1.56, 0.64, 1],
	"in-back": [0.36, 0, 0.66, -0.56],
	"in-out-back": [0.68, -0.6, 0.32, 1.6],
	"out-circ": [0, 0.55, 0.45, 1],
};

function EasingEditor() {
	const [p1x, setP1x] = useState(0.25);
	const [p1y, setP1y] = useState(0.1);
	const [p2x, setP2x] = useState(0.25);
	const [p2y, setP2y] = useState(1);
	const [duration, setDuration] = useState(1000);
	const [trigger, setTrigger] = useState(0);

	const easingString = `cubic-bezier(${p1x}, ${p1y}, ${p2x}, ${p2y})`;
	const css = `transition-timing-function: ${easingString};`;

	const loadPreset = (preset: string) => {
		const [x1, y1, x2, y2] = PRESETS[preset];
		setP1x(x1);
		setP1y(y1);
		setP2x(x2);
		setP2y(y2);
	};

	// SVG path for visualizer
	const width = 200;
	const height = 200;
	const p1x_svg = p1x * width;
	const p1y_svg = height - p1y * height;
	const p2x_svg = p2x * width;
	const p2y_svg = height - p2y * height;
	const pathData = `M 0,${height} C ${p1x_svg},${p1y_svg} ${p2x_svg},${p2y_svg} ${width},0`;

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[400px_1fr] gap-8">
				<div className="space-y-8 bg-card p-6 border border-border rounded-xl">
					<div className="space-y-4">
						<Label>Presets</Label>
						<Select onValueChange={loadPreset}>
							<SelectTrigger>
								<SelectValue placeholder="Select a preset..." />
							</SelectTrigger>
							<SelectContent>
								{Object.keys(PRESETS).map((p) => (
									<SelectItem key={p} value={p}>{p}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-6 pt-4 border-t border-border">
						<div className="space-y-3">
							<div className="flex justify-between">
								<Label>P1 X</Label>
								<span className="text-sm text-muted-foreground">{p1x.toFixed(2)}</span>
							</div>
							<Slider min={0} max={1} step={0.01} value={[p1x]} onValueChange={([v]) => setP1x(v)} />
						</div>
						<div className="space-y-3">
							<div className="flex justify-between">
								<Label>P1 Y</Label>
								<span className="text-sm text-muted-foreground">{p1y.toFixed(2)}</span>
							</div>
							<Slider min={-1} max={2} step={0.01} value={[p1y]} onValueChange={([v]) => setP1y(v)} />
						</div>
						<div className="space-y-3">
							<div className="flex justify-between">
								<Label>P2 X</Label>
								<span className="text-sm text-muted-foreground">{p2x.toFixed(2)}</span>
							</div>
							<Slider min={0} max={1} step={0.01} value={[p2x]} onValueChange={([v]) => setP2x(v)} />
						</div>
						<div className="space-y-3">
							<div className="flex justify-between">
								<Label>P2 Y</Label>
								<span className="text-sm text-muted-foreground">{p2y.toFixed(2)}</span>
							</div>
							<Slider min={-1} max={2} step={0.01} value={[p2y]} onValueChange={([v]) => setP2y(v)} />
						</div>
					</div>

					<div className="space-y-3 pt-4 border-t border-border">
						<div className="flex justify-between">
							<Label>Duration</Label>
							<span className="text-sm text-muted-foreground">{duration}ms</span>
						</div>
						<Slider min={100} max={3000} step={100} value={[duration]} onValueChange={([v]) => setDuration(v)} />
					</div>
				</div>

				<div className="space-y-6">
					<div className="grid md:grid-cols-2 gap-6">
						{/* Visualizer */}
						<div className="flex items-center justify-center p-8 bg-background border border-border rounded-xl">
							<div className="relative border-b-2 border-l-2 border-border w-[200px] h-[200px]">
								<svg width="200" height="200" className="overflow-visible absolute inset-0">
									<line x1="0" y1="200" x2={p1x_svg} y2={p1y_svg} stroke="oklch(0.5 0 0)" strokeWidth="2" strokeDasharray="4 4" />
									<line x1="200" y1="0" x2={p2x_svg} y2={p2y_svg} stroke="oklch(0.5 0 0)" strokeWidth="2" strokeDasharray="4 4" />
									<circle cx={p1x_svg} cy={p1y_svg} r="5" fill="var(--primary)" />
									<circle cx={p2x_svg} cy={p2y_svg} r="5" fill="var(--primary)" />
									<path d={pathData} fill="none" stroke="var(--primary)" strokeWidth="4" />
								</svg>
							</div>
						</div>

						{/* Animation Preview */}
						<div className="flex flex-col p-6 bg-card border border-border rounded-xl justify-between gap-8 overflow-hidden">
							<Button onClick={() => setTrigger(t => t + 1)} className="w-full">
								<Play className="mr-2 size-4" /> Play Animation
							</Button>
							
							<div className="flex-1 flex flex-col justify-center space-y-8 relative">
								<div className="w-full h-px bg-border absolute top-1/4" />
								<div className="w-full h-px bg-border absolute top-3/4" />
								
								{/* Subject */}
								<div 
									key={trigger}
									className="size-12 rounded-lg bg-primary shadow-lg"
									style={{
										animation: `slide ${duration}ms ${easingString} forwards`,
									}}
								/>
							</div>
						</div>
					</div>

					<CodeOutput code={css} language="css" label="CSS" />
				</div>
			</div>
			
			<style>{`
				@keyframes slide {
					0% { transform: translateX(0); }
					100% { transform: translateX(calc(100cqw - 3rem)); } /* container width minus box width */
				}
			`}</style>
		</ToolPageLayout>
	);
}
