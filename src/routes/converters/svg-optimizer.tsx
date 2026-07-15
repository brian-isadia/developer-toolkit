import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CodeOutput } from "#/components/code-output";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Button } from "#/components/ui/button";
import { Textarea } from "#/components/ui/textarea";

export const Route = createFileRoute("/converters/svg-optimizer")({
	component: SvgOptimizer,
});

function SvgOptimizer() {
	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");
	const [stats, setStats] = useState({ original: 0, optimized: 0 });

	const optimizeSvg = () => {
		if (!input) return;

		let optimized = input;

		// Very basic regex-based SVG cleanup for client-side
		// 1. Remove XML declaration
		optimized = optimized.replace(/<\\?xml[^>]*>/gi, "");
		// 2. Remove comments
		optimized = optimized.replace(/<!--[\s\S]*?-->/g, "");
		// 3. Remove doctype
		optimized = optimized.replace(/<!DOCTYPE[^>]*>/gi, "");
		// 4. Remove empty lines and extra whitespace
		optimized = optimized.replace(/>\s+</g, "><");
		optimized = optimized.replace(/\s{2,}/g, " ");
		// 5. Remove empty elements (simple ones)
		optimized = optimized.replace(/<([^\s>]+)[^>]*>\s*<\/\1>/gi, "");

		optimized = optimized.trim();

		setOutput(optimized);
		setStats({
			original: new Blob([input]).size,
			optimized: new Blob([optimized]).size,
		});
	};

	const formatSize = (bytes: number) => {
		if (bytes === 0) return "0 B";
		const k = 1024;
		const sizes = ["B", "KB", "MB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Number.parseFloat((bytes / k ** i).toFixed(2)) + " " + sizes[i];
	};

	const savings = stats.original
		? (((stats.original - stats.optimized) / stats.original) * 100).toFixed(1)
		: "0";

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-2 gap-6 h-[600px]">
				<div className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card">
					<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm flex justify-between">
						<span>Original SVG</span>
						<span className="font-mono text-muted-foreground">
							{formatSize(stats.original)}
						</span>
					</div>
					<Textarea
						value={input}
						onChange={(e) => {
							setInput(e.target.value);
							setStats((s) => ({
								...s,
								original: new Blob([e.target.value]).size,
							}));
						}}
						className="flex-1 resize-none border-0 rounded-none focus-visible:ring-0 p-4 font-mono text-sm bg-transparent"
						placeholder="Paste raw SVG code here..."
					/>
				</div>

				<div className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card relative">
					<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm flex justify-between">
						<span>Optimized SVG</span>
						<span className="font-mono text-muted-foreground">
							{formatSize(stats.optimized)}
							{stats.original > 0 && stats.optimized < stats.original && (
								<span className="text-green-500 ml-2">(-{savings}%)</span>
							)}
						</span>
					</div>

					{output ? (
						<div className="flex-1 overflow-auto bg-transparent relative">
							<CodeOutput code={output} language="html" />
						</div>
					) : (
						<div className="flex-1 flex items-center justify-center text-muted-foreground p-6 text-center">
							Optimized SVG will appear here. Note: This uses basic regex
							cleanup since full SVGO cannot run easily in browser without heavy
							bundling.
						</div>
					)}
				</div>
			</div>

			<div className="mt-6 flex justify-center">
				<Button size="lg" onClick={optimizeSvg} disabled={!input}>
					Optimize SVG
				</Button>
			</div>
		</ToolPageLayout>
	);
}
