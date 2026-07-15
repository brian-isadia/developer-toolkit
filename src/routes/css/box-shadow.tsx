import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Label } from "#/components/ui/label";
import { Slider } from "#/components/ui/slider";
import { Switch } from "#/components/ui/switch";
import { Input } from "#/components/ui/input";
import { CodeOutput } from "#/components/code-output";

export const Route = createFileRoute("/css/box-shadow")({
	component: BoxShadowGenerator,
});

function BoxShadowGenerator() {
	const [x, setX] = useState(0);
	const [y, setY] = useState(10);
	const [blur, setBlur] = useState(15);
	const [spread, setSpread] = useState(-3);
	const [color, setColor] = useState("rgba(0, 0, 0, 0.5)");
	const [inset, setInset] = useState(false);

	const boxShadow = `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px ${color}`;
	const css = `box-shadow: ${boxShadow};`;

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[400px_1fr] gap-8">
				<div className="space-y-8 bg-card p-6 border border-border rounded-xl">
					<div className="space-y-3">
						<div className="flex justify-between">
							<Label>Horizontal Offset</Label>
							<span className="text-sm text-muted-foreground">{x}px</span>
						</div>
						<Slider min={-100} max={100} value={[x]} onValueChange={([v]) => setX(v)} />
					</div>
					
					<div className="space-y-3">
						<div className="flex justify-between">
							<Label>Vertical Offset</Label>
							<span className="text-sm text-muted-foreground">{y}px</span>
						</div>
						<Slider min={-100} max={100} value={[y]} onValueChange={([v]) => setY(v)} />
					</div>

					<div className="space-y-3">
						<div className="flex justify-between">
							<Label>Blur Radius</Label>
							<span className="text-sm text-muted-foreground">{blur}px</span>
						</div>
						<Slider min={0} max={100} value={[blur]} onValueChange={([v]) => setBlur(v)} />
					</div>

					<div className="space-y-3">
						<div className="flex justify-between">
							<Label>Spread Radius</Label>
							<span className="text-sm text-muted-foreground">{spread}px</span>
						</div>
						<Slider min={-50} max={50} value={[spread]} onValueChange={([v]) => setSpread(v)} />
					</div>

					<div className="space-y-3">
						<Label>Shadow Color</Label>
						<Input value={color} onChange={(e) => setColor(e.target.value)} />
					</div>

					<div className="flex items-center justify-between">
						<Label htmlFor="inset">Inset Shadow</Label>
						<Switch id="inset" checked={inset} onCheckedChange={setInset} />
					</div>
				</div>

				<div className="space-y-6">
					<div className="w-full h-[400px] bg-background border border-border rounded-xl flex items-center justify-center relative overflow-hidden pattern-dots">
						<div 
							className="w-48 h-48 bg-card border border-border rounded-lg"
							style={{ boxShadow }}
						/>
					</div>
					<CodeOutput code={css} language="css" label="CSS" />
				</div>
			</div>
		</ToolPageLayout>
	);
}
