import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CodeOutput } from "#/components/code-output";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { contrastRatio, parseColor } from "#/lib/color";

export const Route = createFileRoute("/colors/tailwind-color-finder")({
	component: TailwindColorFinder,
});

// Minimal set of standard tailwind colors for searching
const TAILWIND_PALETTE: Record<string, string> = {
	"slate-50": "#f8fafc",
	"slate-100": "#f1f5f9",
	"slate-500": "#64748b",
	"slate-900": "#0f172a",
	"gray-50": "#f9fafb",
	"gray-100": "#f3f4f6",
	"gray-500": "#6b7280",
	"gray-900": "#111827",
	"zinc-50": "#fafafa",
	"zinc-100": "#f4f4f5",
	"zinc-500": "#71717a",
	"zinc-900": "#18181b",
	"neutral-50": "#fafafa",
	"neutral-100": "#f5f5f5",
	"neutral-500": "#737373",
	"neutral-900": "#171717",
	"stone-50": "#fafaf9",
	"stone-100": "#f5f5f4",
	"stone-500": "#78716c",
	"stone-900": "#1c1917",
	"red-500": "#ef4444",
	"red-600": "#dc2626",
	"orange-500": "#f97316",
	"orange-600": "#ea580c",
	"amber-500": "#f59e0b",
	"amber-600": "#d97706",
	"yellow-500": "#eab308",
	"yellow-600": "#ca8a04",
	"lime-500": "#84cc16",
	"lime-600": "#65a30d",
	"green-500": "#22c55e",
	"green-600": "#16a34a",
	"emerald-500": "#10b981",
	"emerald-600": "#059669",
	"teal-500": "#14b8a6",
	"teal-600": "#0d9488",
	"cyan-500": "#06b6d4",
	"cyan-600": "#0891b2",
	"sky-500": "#0ea5e9",
	"sky-600": "#0284c7",
	"blue-500": "#3b82f6",
	"blue-600": "#2563eb",
	"indigo-500": "#6366f1",
	"indigo-600": "#4f46e5",
	"violet-500": "#8b5cf6",
	"violet-600": "#7c3aed",
	"purple-500": "#a855f7",
	"purple-600": "#9333ea",
	"fuchsia-500": "#d946ef",
	"fuchsia-600": "#c026d3",
	"pink-500": "#ec4899",
	"pink-600": "#db2777",
	"rose-500": "#f43f5e",
	"rose-600": "#e11d48",
};

// Compute Euclidean distance in RGB space
function colorDistance(
	r1: number,
	g1: number,
	b1: number,
	r2: number,
	g2: number,
	b2: number,
) {
	return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function TailwindColorFinder() {
	const [input, setInput] = useState("#4287f5");
	const parsed = parseColor(input);

	const matches = useMemo(() => {
		if (!parsed) return [];

		const { r, g, b } = parsed.rgb;
		const distances = Object.entries(TAILWIND_PALETTE).map(([name, hex]) => {
			const target = parseColor(hex)!.rgb;
			return {
				name,
				hex,
				distance: colorDistance(r, g, b, target.r, target.g, target.b),
			};
		});

		distances.sort((a, b) => a.distance - b.distance);
		return distances.slice(0, 5); // top 5 matches
	}, [parsed]);

	return (
		<ToolPageLayout>
			<div className="space-y-8 max-w-2xl">
				<div className="space-y-4">
					<Label htmlFor="color">Target Color</Label>
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
							placeholder="e.g. #4287f5"
						/>
					</div>
				</div>

				{parsed && matches.length > 0 && (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold tracking-tight">
							Closest Matches
						</h2>
						<div className="grid gap-4">
							{matches.map((match, idx) => (
								<div
									key={match.name}
									className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card"
								>
									<div
										className="size-16 rounded-md shadow-inner border border-border shrink-0"
										style={{ backgroundColor: match.hex }}
									/>
									<div className="flex-1 space-y-1">
										<div className="font-semibold text-lg">{match.name}</div>
										<div className="font-mono text-sm text-muted-foreground">
											{match.hex}
										</div>
									</div>
									{idx === 0 && (
										<div className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">
											Best Match
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</ToolPageLayout>
	);
}
