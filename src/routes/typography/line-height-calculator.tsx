import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Label } from "#/components/ui/label";
import { Slider } from "#/components/ui/slider";

export const Route = createFileRoute("/typography/line-height-calculator")({
	component: LineHeightCalculator,
});

function LineHeightCalculator() {
	const [fontSize, setFontSize] = useState(16);
	const [width, setWidth] = useState(600);

	// Basic heuristic for line height:
	// As line length increases, line height should increase.
	// As font size increases, line height can decrease slightly.
	// Formula adapted from typical typography guidelines
	const calculateIdealLineHeight = () => {
		const baseLH = 1.4;
		const widthRatio = width / fontSize;
		// Optimal width is around 30-40em (480-640px at 16px)
		// For every 10em over 30, add 0.05 to line height
		const widthAdjustment = Math.max(0, ((widthRatio - 30) / 10) * 0.05);
		// For every 10px over 16px, subtract 0.02
		const sizeAdjustment = Math.max(0, ((fontSize - 16) / 10) * 0.02);

		return (baseLH + widthAdjustment - sizeAdjustment).toFixed(2);
	};

	const ideal = calculateIdealLineHeight();

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[350px_1fr] gap-8">
				<div className="space-y-8 bg-card p-6 border border-border rounded-xl h-fit">
					<div className="space-y-3">
						<div className="flex justify-between">
							<Label>Font Size</Label>
							<span className="text-sm text-muted-foreground">
								{fontSize}px
							</span>
						</div>
						<Slider
							min={12}
							max={48}
							step={1}
							value={[fontSize]}
							onValueChange={([v]) => setFontSize(v)}
						/>
					</div>

					<div className="space-y-3">
						<div className="flex justify-between">
							<Label>Container Width</Label>
							<span className="text-sm text-muted-foreground">{width}px</span>
						</div>
						<Slider
							min={300}
							max={1200}
							step={10}
							value={[width]}
							onValueChange={([v]) => setWidth(v)}
						/>
					</div>

					<div className="pt-6 border-t border-border">
						<div className="text-center space-y-2">
							<div className="text-sm font-medium text-muted-foreground">
								Optimal Line Height
							</div>
							<div className="text-5xl font-bold text-primary">{ideal}</div>
						</div>
					</div>
				</div>

				<div className="space-y-6 flex flex-col items-center">
					<div
						className="bg-card border border-border rounded-xl p-8 shadow-sm transition-all"
						style={{ width: `${width}px`, maxWidth: "100%" }}
					>
						<p
							className="text-foreground transition-all duration-200"
							style={{ fontSize: `${fontSize}px`, lineHeight: ideal }}
						>
							Typography is the art and technique of arranging type to make
							written language legible, readable, and appealing when displayed.
							The arrangement of type involves selecting typefaces, point sizes,
							line lengths, line-spacing, and letter-spacing, and adjusting the
							space between pairs of letters. The term typography is also
							applied to the style, arrangement, and appearance of the letters,
							numbers, and symbols created by the process.
						</p>
					</div>
				</div>
			</div>
		</ToolPageLayout>
	);
}
