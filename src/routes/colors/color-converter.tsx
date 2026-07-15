import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CodeOutput } from "#/components/code-output";
import { ColorSwatch } from "#/components/color-swatch";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
	formatHex,
	formatHsl,
	formatOklch,
	formatRgb,
	parseColor,
} from "#/lib/color";

export const Route = createFileRoute("/colors/color-converter")({
	component: ColorConverter,
});

function ColorConverter() {
	const [input, setInput] = useState("#3b82f6");
	const parsed = parseColor(input);

	return (
		<ToolPageLayout>
			<div className="grid gap-8 max-w-2xl">
				<div className="space-y-4">
					<Label htmlFor="color-input">Color Value</Label>
					<div className="flex gap-4">
						<ColorSwatch color={parsed?.hex ?? "transparent"} size="lg" />
						<Input
							id="color-input"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="e.g. #3b82f6, rgb(59, 130, 246), hsl(217, 91%, 60%)"
							className="h-16 text-lg"
						/>
					</div>
					{!parsed && input && (
						<p className="text-sm text-destructive">Invalid color format</p>
					)}
				</div>

				{parsed && (
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<CodeOutput label="Hex" code={parsed.hex} />
						<CodeOutput label="RGB" code={formatRgb(parsed.rgb)} />
						<CodeOutput label="HSL" code={formatHsl(parsed.hsl)} />
						<CodeOutput label="OKLCH" code={formatOklch(parsed.oklch)} />
					</div>
				)}
			</div>
		</ToolPageLayout>
	);
}
