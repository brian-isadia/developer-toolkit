import { createFileRoute } from "@tanstack/react-router";
import {
	Eye,
	Laptop,
	Monitor,
	RefreshCw,
	Smartphone,
	Tablet,
} from "lucide-react";
import { type ComponentType, useEffect, useState } from "react";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

export const Route = createFileRoute("/preview/responsive-breakpoints")({
	component: ResponsiveBreakpoints,
	head: () => ({
		meta: [
			{ title: "Responsive Breakpoint Previewer | WebToolkit" },
			{
				name: "description",
				content: "Preview any URL at common device breakpoints",
			},
		],
	}),
});

interface Breakpoint {
	id: string;
	name: string;
	width: number;
	icon: ComponentType<{ className?: string }>;
}

const BREAKPOINTS: Breakpoint[] = [
	{ id: "mobile", name: "Mobile", width: 375, icon: Smartphone },
	{ id: "tablet", name: "Tablet", width: 768, icon: Tablet },
	{ id: "desktop", name: "Desktop", width: 1024, icon: Laptop },
	{ id: "wide", name: "Wide Screen", width: 1440, icon: Monitor },
];

function ResponsiveBreakpoints() {
	const [urlInput, setUrlInput] = useState("");
	const [activeUrl, setActiveUrl] = useState("");
	const [selectedPreset, setSelectedPreset] = useState("tablet");
	const [viewMode, setViewMode] = useState<"single" | "all">("single");
	const [iframeKey, setIframeKey] = useState(0);

	useEffect(() => {
		if (typeof window !== "undefined") {
			// Default to current website or a local address
			setUrlInput(window.location.origin);
			setActiveUrl(window.location.origin);
		}
	}, []);

	const handleLoad = (e: React.FormEvent) => {
		e.preventDefault();
		let targetUrl = urlInput.trim();
		if (!targetUrl) return;

		// Automatically add protocol if missing
		if (!/^https?:\/\//i.test(targetUrl)) {
			targetUrl = `https://${targetUrl}`;
		}

		setUrlInput(targetUrl);
		setActiveUrl(targetUrl);
		setIframeKey((prev) => prev + 1); // Refresh iframe
	};

	const handleRefresh = () => {
		setIframeKey((prev) => prev + 1);
	};

	const currentPreset =
		BREAKPOINTS.find((b) => b.id === selectedPreset) || BREAKPOINTS[1];

	return (
		<ToolPageLayout>
			<div className="space-y-6">
				{/* Top Controls Bar */}
				<form
					onSubmit={handleLoad}
					className="flex flex-col md:flex-row items-end gap-4 bg-card border border-border p-4 rounded-xl shadow-sm"
				>
					<div className="flex-1 w-full space-y-2">
						<Label htmlFor="preview-url" className="text-sm font-semibold">
							Website URL
						</Label>
						<div className="flex gap-2">
							<Input
								id="preview-url"
								value={urlInput}
								onChange={(e) => setUrlInput(e.target.value)}
								placeholder="e.g. http://localhost:3000 or webtoolkit.dev"
								className="flex-1"
							/>
							<Button type="submit">Load</Button>
							<Button
								type="button"
								variant="outline"
								size="icon"
								onClick={handleRefresh}
								title="Refresh preview"
							>
								<RefreshCw className="size-4" />
							</Button>
						</div>
					</div>

					{/* Mode selection buttons */}
					<div className="flex flex-wrap gap-2 w-full md:w-auto">
						<div className="border border-border p-1 rounded-lg flex bg-muted/20 gap-1 w-full md:w-auto">
							<Button
								type="button"
								variant={viewMode === "single" ? "secondary" : "ghost"}
								size="sm"
								className="flex-1 md:flex-none text-xs h-8"
								onClick={() => setViewMode("single")}
							>
								Single view
							</Button>
							<Button
								type="button"
								variant={viewMode === "all" ? "secondary" : "ghost"}
								size="sm"
								className="flex-1 md:flex-none text-xs h-8"
								onClick={() => setViewMode("all")}
							>
								<Eye className="size-3 mr-1.5" /> View All
							</Button>
						</div>
					</div>
				</form>

				{/* Info Alert on iframe limitations */}
				{activeUrl &&
					activeUrl !==
						(typeof window !== "undefined" ? window.location.origin : "") && (
						<div className="bg-amber-500/10 border border-amber-500/30 text-amber-500 rounded-lg p-3 text-xs leading-relaxed">
							<strong>Notice:</strong> Many production websites block iframe
							embedding via <code>X-Frame-Options</code> or{" "}
							<code>Content-Security-Policy</code>. This tool is ideal for
							testing local dev servers (e.g. <code>localhost</code>) or sites
							under your control. If the page is blank, embedding is blocked.
						</div>
					)}

				{/* Single View Presets and frame */}
				{viewMode === "single" && (
					<div className="space-y-4">
						{/* Preset Width Selectors */}
						<div className="flex flex-wrap gap-2 justify-center border-b border-border pb-4">
							{BREAKPOINTS.map((b) => {
								const Icon = b.icon;
								return (
									<Button
										key={b.id}
										variant={selectedPreset === b.id ? "default" : "outline"}
										size="sm"
										onClick={() => setSelectedPreset(b.id)}
										className="flex items-center gap-1.5 text-xs"
									>
										<Icon className="size-3.5" />
										{b.name} ({b.width}px)
									</Button>
								);
							})}
						</div>

						{/* Iframe View Container */}
						<div className="flex flex-col items-center">
							<div className="w-full text-center mb-2">
								<span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
									{currentPreset.name} — {currentPreset.width}px
								</span>
							</div>

							<div
								className="border border-border shadow-2xl rounded-xl overflow-hidden bg-card transition-all duration-300"
								style={{ width: `${currentPreset.width}px` }}
							>
								{/* Header Mockup */}
								<div className="bg-muted px-4 py-2 border-b border-border flex items-center justify-between text-xs select-none">
									<div className="flex gap-1.5">
										<div className="size-2.5 rounded-full bg-red-400" />
										<div className="size-2.5 rounded-full bg-yellow-400" />
										<div className="size-2.5 rounded-full bg-green-400" />
									</div>
									<span className="text-muted-foreground font-mono text-[10px] truncate max-w-[200px]">
										{activeUrl}
									</span>
									<div className="w-8" />
								</div>

								{/* Iframe */}
								{activeUrl ? (
									<iframe
										key={iframeKey}
										src={activeUrl}
										title={`Preview at ${currentPreset.width}px`}
										className="w-full min-h-[600px] border-none bg-background"
									/>
								) : (
									<div className="flex flex-col items-center justify-center min-h-[600px] text-muted-foreground text-sm">
										Enter a URL to load preview
									</div>
								)}
							</div>
						</div>
					</div>
				)}

				{/* View All Mode */}
				{viewMode === "all" && (
					<div className="space-y-12">
						{BREAKPOINTS.map((b) => (
							<div
								key={b.id}
								className="flex flex-col items-center border-b border-border/40 pb-8 last:border-b-0"
							>
								<div className="w-full text-center mb-4">
									<span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
										{b.name} — {b.width}px
									</span>
								</div>

								<div
									className="border border-border shadow-lg rounded-xl overflow-hidden bg-card"
									style={{ width: `${b.width}px` }}
								>
									<div className="bg-muted px-3 py-1.5 border-b border-border flex items-center justify-between text-[10px] select-none">
										<div className="flex gap-1">
											<div className="size-2 rounded-full bg-red-400" />
											<div className="size-2 rounded-full bg-yellow-400" />
											<div className="size-2 rounded-full bg-green-400" />
										</div>
										<span className="text-muted-foreground font-mono truncate max-w-[200px]">
											{activeUrl}
										</span>
										<div className="w-6" />
									</div>
									{activeUrl ? (
										<iframe
											key={`${iframeKey}-${b.id}`}
											src={activeUrl}
											title={`Preview All at ${b.width}px`}
											className="w-full h-[400px] border-none bg-background"
										/>
									) : (
										<div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground text-sm">
											Enter a URL to load preview
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</ToolPageLayout>
	);
}
