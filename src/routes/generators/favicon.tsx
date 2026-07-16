import { createFileRoute } from "@tanstack/react-router";
import { Download, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CodeOutput } from "#/components/code-output";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { Label } from "#/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";

export const Route = createFileRoute("/generators/favicon")({
	component: FaviconGenerator,
	head: () => ({
		meta: [
			{ title: "Favicon Generator | WebToolkit" },
			{
				name: "description",
				content: "Generate multi-size favicons from image or emoji",
			},
		],
	}),
});

const FAVICON_SIZES = [16, 32, 48, 180, 192];

const EMOJI_PRESETS = [
	// Popular
	"🚀",
	"💻",
	"🔥",
	"✨",
	"💡",
	"🎉",
	"🛠️",
	"📦",
	"🎨",
	"🍕",
	"❤️",
	"⭐",
	// Tech/Dev
	"⚛️",
	"🌐",
	"🛡️",
	"⚙️",
	"⚡",
	"📊",
	"📁",
	"🔍",
	"🔑",
	"📝",
	"🐛",
	"☕",
	// Animals & Nature
	"🐱",
	"🐶",
	"🦊",
	"🦁",
	"🐵",
	"🦄",
	"🌲",
	"🌸",
	"🌍",
	"🌙",
	"☀️",
	"💧",
	// Smileys
	"😀",
	"😂",
	"😎",
	"🤓",
	"🤔",
	"🤫",
	"🥳",
	"👍",
	"👏",
	"🙌",
	"✌️",
	"🌈",
];

const BACKGROUND_COLORS = [
	{ name: "Transparent", value: "transparent" },
	{ name: "Sleek Black", value: "#09090b" },
	{ name: "Pure White", value: "#ffffff" },
	{ name: "Royal Blue", value: "#2563eb" },
	{ name: "Emerald Green", value: "#059669" },
	{ name: "Sunset Orange", value: "#ea580c" },
	{ name: "Grape Purple", value: "#7c3aed" },
];

const loadImage = (src: string): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = (e) => reject(e);
		img.src = src;
	});
};

function FaviconGenerator() {
	const [sourceType, setSourceType] = useState<"emoji" | "image">("emoji");
	const [emoji, setEmoji] = useState("🚀");
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [bgColor, setBgColor] = useState("transparent");
	const [shape, setShape] = useState<"square" | "rounded" | "circle">(
		"rounded",
	);
	const [previews, setPreviews] = useState<Record<number, string>>({});

	const canvasRefs = useRef<Record<number, HTMLCanvasElement | null>>({});
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	// Trigger rendering whenever anything changes
	useEffect(() => {
		const renderFavicons = async () => {
			const loadedImage =
				sourceType === "image" && imageSrc ? await loadImage(imageSrc) : null;

			for (const size of FAVICON_SIZES) {
				const canvas = canvasRefs.current[size];
				if (!canvas) continue;
				const ctx = canvas.getContext("2d");
				if (!ctx) continue;

				ctx.clearRect(0, 0, size, size);

				// Draw background
				if (bgColor !== "transparent") {
					ctx.fillStyle = bgColor;
					if (shape === "circle") {
						ctx.beginPath();
						ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
						ctx.fill();
					} else if (shape === "rounded") {
						const radius = size * 0.2;
						ctx.beginPath();
						ctx.roundRect(0, 0, size, size, radius);
						ctx.fill();
					} else {
						ctx.fillRect(0, 0, size, size);
					}
				}

				if (sourceType === "emoji") {
					// Draw emoji text
					ctx.font = `high-quality ${size * 0.75}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.fillText(emoji, size / 2, size / 2 + size * 0.04);
				} else if (sourceType === "image" && loadedImage) {
					// Draw image
					ctx.imageSmoothingEnabled = true;
					ctx.imageSmoothingQuality = "high";

					if (shape === "circle") {
						ctx.save();
						ctx.beginPath();
						ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
						ctx.clip();
						ctx.drawImage(loadedImage, 0, 0, size, size);
						ctx.restore();
					} else if (shape === "rounded") {
						ctx.save();
						ctx.beginPath();
						const radius = size * 0.2;
						ctx.roundRect(0, 0, size, size, radius);
						ctx.clip();
						ctx.drawImage(loadedImage, 0, 0, size, size);
						ctx.restore();
					} else {
						ctx.drawImage(loadedImage, 0, 0, size, size);
					}
				}

				// Capture data URL for preview and download
				const dataUrl = canvas.toDataURL("image/png");
				setPreviews((prev) => ({ ...prev, [size]: dataUrl }));
			}
		};

		renderFavicons();
	}, [sourceType, emoji, imageSrc, bgColor, shape]);

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			setImageSrc(event.target?.result as string);
			setSourceType("image");
		};
		reader.readAsDataURL(file);
	};

	const handleDownload = (size: number) => {
		const dataUrl = previews[size];
		if (!dataUrl) return;

		const link = document.createElement("a");
		link.download = `favicon-${size}x32.png`;
		if (size === 180) link.download = "apple-touch-icon.png";
		else if (size === 192) link.download = "android-chrome-192x192.png";
		else link.download = `favicon-${size}x${size}.png`;

		link.href = dataUrl;
		link.click();
	};

	const htmlLinkTags = `<!-- Standard Favicons -->
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">

<!-- Apple Touch Icon (iOS) -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Android / Chrome -->
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">`;

	return (
		<ToolPageLayout>
			{/* Hidden canvases for rendering sizes */}
			<div className="hidden">
				{FAVICON_SIZES.map((size) => (
					<canvas
						key={size}
						ref={(el) => {
							canvasRefs.current[size] = el;
						}}
						width={size}
						height={size}
					/>
				))}
			</div>

			<div className="grid lg:grid-cols-[400px_1fr] gap-8">
				{/* Controls */}
				<div className="space-y-6">
					<Tabs
						value={sourceType}
						onValueChange={(val) => setSourceType(val as "emoji" | "image")}
					>
						<TabsList className="grid grid-cols-2 w-full">
							<TabsTrigger value="emoji">Emoji</TabsTrigger>
							<TabsTrigger value="image">Upload Image</TabsTrigger>
						</TabsList>

						<TabsContent value="emoji" className="space-y-4 pt-4">
							<div className="space-y-2">
								<Label>Choose Emoji</Label>
								<div className="grid grid-cols-8 gap-2 bg-muted/30 p-3 rounded-lg border border-border max-h-[220px] overflow-y-auto">
									{EMOJI_PRESETS.map((item) => (
										<button
											key={item}
											type="button"
											className={`text-2xl p-1.5 rounded-md hover:bg-accent transition-colors flex items-center justify-center ${
												emoji === item && sourceType === "emoji"
													? "bg-primary/20 ring-1 ring-primary"
													: ""
											}`}
											onClick={() => {
												setEmoji(item);
												setSourceType("emoji");
											}}
										>
											{item}
										</button>
									))}
								</div>
							</div>
						</TabsContent>

						<TabsContent value="image" className="space-y-4 pt-4">
							<div className="space-y-2">
								<Label>Upload Image (PNG, JPG, SVG, WebP)</Label>
								<button
									type="button"
									className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer text-center w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
									onClick={() => fileInputRef.current?.click()}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											fileInputRef.current?.click();
										}
									}}
								>
									<Upload className="size-8 text-muted-foreground mb-2" />
									<p className="text-sm font-medium">Click to upload file</p>
									<p className="text-xs text-muted-foreground mt-1">
										SVG or high-res PNG works best
									</p>
									<input
										ref={fileInputRef}
										type="file"
										accept="image/png, image/jpeg, image/svg+xml, image/webp"
										className="hidden"
										onChange={handleFileUpload}
									/>
								</button>
								{imageSrc && (
									<div className="flex items-center justify-between bg-muted/40 p-2.5 rounded-md border border-border text-sm">
										<span className="truncate max-w-[200px]">
											Image uploaded
										</span>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => {
												setImageSrc(null);
												if (fileInputRef.current)
													fileInputRef.current.value = "";
											}}
										>
											Clear
										</Button>
									</div>
								)}
							</div>
						</TabsContent>
					</Tabs>

					{/* Shape and Background controls */}
					<div className="space-y-4 pt-4 border-t border-border/50">
						<div className="space-y-2">
							<Label>Background Style</Label>
							<div className="flex flex-wrap gap-2">
								{BACKGROUND_COLORS.map((bg) => (
									<button
										key={bg.name}
										type="button"
										className={`size-8 rounded-full border border-border flex items-center justify-center relative overflow-hidden transition-all ${
											bgColor === bg.value
												? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105"
												: "hover:scale-105"
										}`}
										style={{
											backgroundColor:
												bg.value === "transparent" ? "transparent" : bg.value,
										}}
										onClick={() => setBgColor(bg.value)}
										title={bg.name}
									>
										{bg.value === "transparent" && (
											<div className="absolute inset-0 bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[size:8px_8px] bg-[position:0_0,0_4px,4px_-4px,-4px_0] opacity-30" />
										)}
									</button>
								))}
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="favicon-shape">Favicon Shape</Label>
							<Select
								value={shape}
								onValueChange={(val: "square" | "rounded" | "circle") =>
									setShape(val)
								}
							>
								<SelectTrigger id="favicon-shape">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="square">Square</SelectItem>
									<SelectItem value="rounded">Rounded Corners</SelectItem>
									<SelectItem value="circle">Circle</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				{/* Previews and Downloads */}
				<div className="space-y-6">
					<div>
						<h3 className="font-semibold text-lg mb-4">
							Generated Favicon Sizes
						</h3>
						<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
							{FAVICON_SIZES.map((size) => {
								const dataUrl = previews[size];
								let label = `${size}×${size}`;
								if (size === 180) label = "180×180 (Apple)";
								else if (size === 192) label = "192×192 (Android)";

								return (
									<Card
										key={size}
										className="overflow-hidden bg-card border-border"
									>
										<CardContent className="p-4 flex flex-col items-center justify-between min-h-[160px] text-center">
											<span className="text-xs font-semibold text-muted-foreground">
												{label}
											</span>

											<div className="my-3 flex items-center justify-center p-2 rounded border border-border/40 bg-muted/10 relative group-hover:bg-muted/20 min-h-[64px] min-w-[64px]">
												{dataUrl ? (
													<img
														src={dataUrl}
														alt={`Favicon ${size}`}
														className="object-contain max-h-[64px]"
														style={{
															// zoom preview for small sizes so the user can actually see it
															width: size < 64 ? 48 : "auto",
															height: size < 64 ? 48 : "auto",
															imageRendering: size < 64 ? "pixelated" : "auto",
														}}
													/>
												) : (
													<div className="size-8 rounded-full border border-dashed animate-pulse" />
												)}
											</div>

											<Button
												variant="outline"
												size="sm"
												className="w-full text-xs"
												onClick={() => handleDownload(size)}
												disabled={!dataUrl}
											>
												<Download className="size-3 mr-1.5" /> Download
											</Button>
										</CardContent>
									</Card>
								);
							})}
						</div>
					</div>

					<div className="space-y-3 pt-4 border-t border-border/50">
						<h3 className="font-semibold text-sm">HTML Link Tags</h3>
						<CodeOutput
							code={htmlLinkTags}
							language="html"
							label="HTML Head Integration"
						/>
					</div>
				</div>
			</div>
		</ToolPageLayout>
	);
}
