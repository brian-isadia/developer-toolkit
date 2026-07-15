import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CodeOutput } from "#/components/code-output";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Label } from "#/components/ui/label";
import { Slider } from "#/components/ui/slider";

export const Route = createFileRoute("/css/grid-generator")({
	component: GridGenerator,
});

function GridGenerator() {
	const [cols, setCols] = useState(3);
	const [rows, setRows] = useState(3);
	const [gap, setGap] = useState(16);

	const css = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  gap: ${gap}px;
}`;

	const html = `<div class="grid-container">
${Array.from({ length: cols * rows })
	.map((_, i) => `  <div class="item">${i + 1}</div>`)
	.join("\n")}
</div>`;

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[400px_1fr] gap-8">
				<div className="space-y-8 bg-card p-6 border border-border rounded-xl h-fit">
					<div className="space-y-3">
						<div className="flex justify-between">
							<Label>Columns</Label>
							<span className="text-sm text-muted-foreground">{cols}</span>
						</div>
						<Slider
							min={1}
							max={12}
							step={1}
							value={[cols]}
							onValueChange={([v]) => setCols(v)}
						/>
					</div>

					<div className="space-y-3">
						<div className="flex justify-between">
							<Label>Rows</Label>
							<span className="text-sm text-muted-foreground">{rows}</span>
						</div>
						<Slider
							min={1}
							max={12}
							step={1}
							value={[rows]}
							onValueChange={([v]) => setRows(v)}
						/>
					</div>

					<div className="space-y-3">
						<div className="flex justify-between">
							<Label>Gap</Label>
							<span className="text-sm text-muted-foreground">{gap}px</span>
						</div>
						<Slider
							min={0}
							max={64}
							step={2}
							value={[gap]}
							onValueChange={([v]) => setGap(v)}
						/>
					</div>
				</div>

				<div className="space-y-6">
					<div className="w-full aspect-video bg-background border border-border rounded-xl p-4 overflow-auto resize-y">
						<div
							className="w-full h-full"
							style={{
								display: "grid",
								gridTemplateColumns: `repeat(${cols}, 1fr)`,
								gridTemplateRows: `repeat(${rows}, 1fr)`,
								gap: `${gap}px`,
							}}
						>
							{Array.from({ length: cols * rows }).map((_, i) => (
								<div
									key={i}
									className="bg-primary/20 border border-primary/30 rounded flex items-center justify-center font-mono text-primary/80 transition-all hover:bg-primary/30 min-h-[40px]"
								>
									{i + 1}
								</div>
							))}
						</div>
					</div>

					<div className="grid sm:grid-cols-2 gap-4">
						<CodeOutput code={css} language="css" label="CSS" />
						<CodeOutput code={html} language="html" label="HTML" />
					</div>
				</div>
			</div>
		</ToolPageLayout>
	);
}
