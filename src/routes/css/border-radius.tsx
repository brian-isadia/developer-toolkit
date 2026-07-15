import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Label } from "#/components/ui/label";
import { Slider } from "#/components/ui/slider";
import { CodeOutput } from "#/components/code-output";

export const Route = createFileRoute("/css/border-radius")({
	component: BorderRadiusVisualizer,
});

function BorderRadiusVisualizer() {
	const [tl, setTl] = useState(20);
	const [tr, setTr] = useState(20);
	const [br, setBr] = useState(20);
	const [bl, setBl] = useState(20);
	const [linkAll, setLinkAll] = useState(true);

	const updateAll = (v: number) => {
		setTl(v);
		setTr(v);
		setBr(v);
		setBl(v);
	};

	const css = `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[400px_1fr] gap-8">
				<div className="space-y-8 bg-card p-6 border border-border rounded-xl">
					<div className="flex items-center justify-between mb-2">
						<Label className="text-base">Border Radius</Label>
						<button 
							onClick={() => setLinkAll(!linkAll)}
							className="text-xs text-primary hover:underline"
						>
							{linkAll ? "Unlink Corners" : "Link All"}
						</button>
					</div>

					{linkAll ? (
						<div className="space-y-3">
							<div className="flex justify-between">
								<Label>All Corners</Label>
								<span className="text-sm text-muted-foreground">{tl}px</span>
							</div>
							<Slider min={0} max={200} value={[tl]} onValueChange={([v]) => updateAll(v)} />
						</div>
					) : (
						<>
							<div className="space-y-3">
								<div className="flex justify-between">
									<Label>Top Left</Label>
									<span className="text-sm text-muted-foreground">{tl}px</span>
								</div>
								<Slider min={0} max={200} value={[tl]} onValueChange={([v]) => setTl(v)} />
							</div>
							
							<div className="space-y-3">
								<div className="flex justify-between">
									<Label>Top Right</Label>
									<span className="text-sm text-muted-foreground">{tr}px</span>
								</div>
								<Slider min={0} max={200} value={[tr]} onValueChange={([v]) => setTr(v)} />
							</div>

							<div className="space-y-3">
								<div className="flex justify-between">
									<Label>Bottom Right</Label>
									<span className="text-sm text-muted-foreground">{br}px</span>
								</div>
								<Slider min={0} max={200} value={[br]} onValueChange={([v]) => setBr(v)} />
							</div>

							<div className="space-y-3">
								<div className="flex justify-between">
									<Label>Bottom Left</Label>
									<span className="text-sm text-muted-foreground">{bl}px</span>
								</div>
								<Slider min={0} max={200} value={[bl]} onValueChange={([v]) => setBl(v)} />
							</div>
						</>
					)}
				</div>

				<div className="space-y-6">
					<div className="w-full h-[400px] bg-background border border-border rounded-xl flex items-center justify-center relative overflow-hidden pattern-dots">
						<div 
							className="w-64 h-64 bg-primary text-primary-foreground flex items-center justify-center font-mono shadow-xl transition-all"
							style={{ borderRadius: `${tl}px ${tr}px ${br}px ${bl}px` }}
						>
							Preview
						</div>
					</div>
					<CodeOutput code={css} language="css" label="CSS" />
				</div>
			</div>
		</ToolPageLayout>
	);
}
