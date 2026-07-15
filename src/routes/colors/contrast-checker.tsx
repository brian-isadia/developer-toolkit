import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { parseColor, contrastRatio, wcagLevel } from "#/lib/color";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Badge } from "#/components/ui/badge";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/colors/contrast-checker")({
	component: ContrastChecker,
});

function ResultBadge({ passes, label }: { passes: boolean; label: string }) {
	return (
		<Badge
			variant={passes ? "default" : "destructive"}
			className="flex items-center gap-1.5 px-3 py-1 text-sm font-medium"
		>
			{passes ? <Check className="size-3.5" /> : <X className="size-3.5" />}
			{label}
		</Badge>
	);
}

function ContrastChecker() {
	const [fgInput, setFgInput] = useState("#ffffff");
	const [bgInput, setBgInput] = useState("#3b82f6");

	const fg = parseColor(fgInput);
	const bg = parseColor(bgInput);

	let ratio = 0;
	let wcagNormal = { aa: false, aaa: false };
	let wcagLarge = { aa: false, aaa: false };

	if (fg && bg) {
		ratio = contrastRatio(fg.rgb, bg.rgb);
		wcagNormal = wcagLevel(ratio, "normal");
		wcagLarge = wcagLevel(ratio, "large");
	}

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-2 gap-8">
				<div className="space-y-6">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="fg-color">Text Color</Label>
							<div className="flex gap-2">
								<Input
									id="fg-color"
									type="color"
									value={fg?.hex ?? "#ffffff"}
									onChange={(e) => setFgInput(e.target.value)}
									className="w-12 p-1 h-10"
								/>
								<Input
									value={fgInput}
									onChange={(e) => setFgInput(e.target.value)}
									placeholder="#ffffff"
									className="flex-1"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<Label htmlFor="bg-color">Background Color</Label>
							<div className="flex gap-2">
								<Input
									id="bg-color"
									type="color"
									value={bg?.hex ?? "#000000"}
									onChange={(e) => setBgInput(e.target.value)}
									className="w-12 p-1 h-10"
								/>
								<Input
									value={bgInput}
									onChange={(e) => setBgInput(e.target.value)}
									placeholder="#000000"
									className="flex-1"
								/>
							</div>
						</div>
					</div>

					{fg && bg ? (
						<div className="space-y-6">
							<div className="p-6 rounded-lg border border-border bg-card flex flex-col items-center justify-center text-center space-y-2">
								<div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
									Contrast Ratio
								</div>
								<div className="text-5xl font-bold tracking-tighter">
									{ratio.toFixed(2)}:1
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-3 p-4 rounded-lg border border-border bg-card">
									<h3 className="font-semibold text-sm text-muted-foreground">Normal Text</h3>
									<div className="flex flex-col gap-2">
										<ResultBadge passes={wcagNormal.aa} label="WCAG AA" />
										<ResultBadge passes={wcagNormal.aaa} label="WCAG AAA" />
									</div>
								</div>
								<div className="space-y-3 p-4 rounded-lg border border-border bg-card">
									<h3 className="font-semibold text-sm text-muted-foreground">Large Text</h3>
									<div className="flex flex-col gap-2">
										<ResultBadge passes={wcagLarge.aa} label="WCAG AA" />
										<ResultBadge passes={wcagLarge.aaa} label="WCAG AAA" />
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="text-destructive text-sm">Please enter valid colors.</div>
					)}
				</div>

				<div
					className="rounded-xl border border-border shadow-inner p-8 flex flex-col gap-6 justify-center min-h-[400px] transition-colors"
					style={{
						backgroundColor: bg?.hex ?? "transparent",
						color: fg?.hex ?? "inherit",
					}}
				>
					<h2 className="text-4xl font-bold">The quick brown fox jumps over the lazy dog</h2>
					<p className="text-lg">
						This is how normal text will look. Good contrast ensures that text is readable
						by everyone, regardless of visual impairments or screen glare.
					</p>
					<div className="flex gap-4">
						<button
							className="px-4 py-2 font-semibold rounded-md border"
							style={{ borderColor: fg?.hex ?? "inherit" }}
						>
							Primary Action
						</button>
						<button className="px-4 py-2 font-semibold opacity-70 hover:opacity-100 transition-opacity">
							Secondary Action
						</button>
					</div>
				</div>
			</div>
		</ToolPageLayout>
	);
}
