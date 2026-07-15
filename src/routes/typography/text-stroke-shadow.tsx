import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CodeOutput } from "#/components/code-output";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Slider } from "#/components/ui/slider";

export const Route = createFileRoute("/typography/text-stroke-shadow")({
	component: TextStrokeShadow,
});

function TextStrokeShadow() {
	const [offsetX, setOffsetX] = useState(2);
	const [offsetY, setOffsetY] = useState(2);
	const [blur, setBlur] = useState(4);
	const [shadowColor, setShadowColor] = useState("rgba(0, 0, 0, 0.5)");

	const [strokeWidth, setStrokeWidth] = useState(1);
	const [strokeColor, setStrokeColor] = useState("#ffffff");

	const shadowCSS = `${offsetX}px ${offsetY}px ${blur}px ${shadowColor}`;
	const strokeCSS = `${strokeWidth}px ${strokeColor}`;

	const css = `text-shadow: ${shadowCSS};
-webkit-text-stroke: ${strokeCSS};
color: transparent;`;

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[400px_1fr] gap-8">
				<div className="space-y-8 bg-card p-6 border border-border rounded-xl">
					<div className="space-y-4">
						<h3 className="font-semibold border-b border-border pb-2">
							Text Shadow
						</h3>
						<div className="space-y-3">
							<div className="flex justify-between">
								<Label>Offset X</Label>
								<span className="text-sm text-muted-foreground">
									{offsetX}px
								</span>
							</div>
							<Slider
								min={-20}
								max={20}
								value={[offsetX]}
								onValueChange={([v]) => setOffsetX(v)}
							/>
						</div>
						<div className="space-y-3">
							<div className="flex justify-between">
								<Label>Offset Y</Label>
								<span className="text-sm text-muted-foreground">
									{offsetY}px
								</span>
							</div>
							<Slider
								min={-20}
								max={20}
								value={[offsetY]}
								onValueChange={([v]) => setOffsetY(v)}
							/>
						</div>
						<div className="space-y-3">
							<div className="flex justify-between">
								<Label>Blur</Label>
								<span className="text-sm text-muted-foreground">{blur}px</span>
							</div>
							<Slider
								min={0}
								max={30}
								value={[blur]}
								onValueChange={([v]) => setBlur(v)}
							/>
						</div>
						<div className="space-y-3">
							<Label>Shadow Color</Label>
							<Input
								value={shadowColor}
								onChange={(e) => setShadowColor(e.target.value)}
							/>
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="font-semibold border-b border-border pb-2">
							Text Stroke
						</h3>
						<div className="space-y-3">
							<div className="flex justify-between">
								<Label>Stroke Width</Label>
								<span className="text-sm text-muted-foreground">
									{strokeWidth}px
								</span>
							</div>
							<Slider
								min={0}
								max={10}
								step={0.5}
								value={[strokeWidth]}
								onValueChange={([v]) => setStrokeWidth(v)}
							/>
						</div>
						<div className="space-y-3">
							<Label>Stroke Color</Label>
							<div className="flex gap-4">
								<Input
									type="color"
									value={strokeColor}
									onChange={(e) => setStrokeColor(e.target.value)}
									className="w-12 p-1 h-10"
								/>
								<Input
									value={strokeColor}
									onChange={(e) => setStrokeColor(e.target.value)}
									className="flex-1"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-6">
					<div className="w-full h-[400px] bg-neutral-900 border border-border rounded-xl flex items-center justify-center overflow-hidden">
						<h1
							className="text-6xl md:text-8xl font-black text-center p-8 uppercase tracking-tighter"
							style={{
								textShadow: shadowCSS,
								WebkitTextStroke: strokeCSS,
								color: "transparent",
							}}
						>
							Neon
							<br />
							Vibes
						</h1>
					</div>
					<CodeOutput code={css} language="css" label="CSS" />
				</div>
			</div>
		</ToolPageLayout>
	);
}
