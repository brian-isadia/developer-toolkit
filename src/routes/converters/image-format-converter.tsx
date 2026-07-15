import { createFileRoute } from "@tanstack/react-router";
import { Download, Image as ImageIcon, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { Slider } from "#/components/ui/slider";

export const Route = createFileRoute("/converters/image-format-converter")({
	component: ImageFormatConverter,
});

const FORMATS = [
	{ id: "image/webp", label: "WebP" },
	{ id: "image/jpeg", label: "JPEG" },
	{ id: "image/png", label: "PNG" },
];

function ImageFormatConverter() {
	const [imageSrc, setImageSrc] = useState<string>("");
	const [fileName, setFileName] = useState<string>("");
	const [targetFormat, setTargetFormat] = useState<string>("image/webp");
	const [quality, setQuality] = useState<number>(0.8);
	const [convertedUrl, setConvertedUrl] = useState<string>("");
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setFileName(file.name.split(".")[0] || "image");

		const reader = new FileReader();
		reader.onload = (event) => {
			if (typeof event.target?.result === "string") {
				setImageSrc(event.target.result);
				setConvertedUrl(""); // Reset converted when new image uploaded
			}
		};
		reader.readAsDataURL(file);
	};

	const convertImage = () => {
		if (!imageSrc || !canvasRef.current) return;

		const img = new Image();
		img.onload = () => {
			const canvas = canvasRef.current!;
			canvas.width = img.width;
			canvas.height = img.height;

			const ctx = canvas.getContext("2d");
			if (!ctx) return;

			// For transparent to JPEG, draw white bg first
			if (targetFormat === "image/jpeg") {
				ctx.fillStyle = "#ffffff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
			}

			ctx.drawImage(img, 0, 0);
			const url = canvas.toDataURL(targetFormat, quality);
			setConvertedUrl(url);
		};
		img.src = imageSrc;
	};

	const downloadImage = () => {
		if (!convertedUrl) return;
		const ext = targetFormat.split("/")[1];
		const a = document.createElement("a");
		a.href = convertedUrl;
		a.download = `${fileName}-converted.${ext}`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	return (
		<ToolPageLayout>
			<canvas ref={canvasRef} className="hidden" />

			<div className="grid lg:grid-cols-[1fr_350px] gap-8">
				<div className="space-y-6">
					{!imageSrc ? (
						<div className="relative border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-accent/50 transition-colors bg-card group min-h-[400px]">
							<input
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							/>
							<UploadCloud className="size-16 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
							<h3 className="text-xl font-semibold tracking-tight">
								Select an image to convert
							</h3>
							<p className="text-muted-foreground mt-2">
								Convert between PNG, WebP, and JPEG locally
							</p>
						</div>
					) : (
						<div className="bg-card border border-border rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
							<img
								src={convertedUrl || imageSrc}
								alt="Preview"
								className="max-w-full max-h-[500px] object-contain rounded-md shadow-lg"
							/>
							<button
								onClick={() => {
									setImageSrc("");
									setConvertedUrl("");
								}}
								className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm border border-border text-sm px-3 py-1 rounded-md hover:bg-background"
							>
								Clear
							</button>
						</div>
					)}
				</div>

				<div className="space-y-6 bg-card border border-border rounded-xl p-6 h-fit">
					<div className="flex items-center gap-2 border-b border-border pb-4">
						<ImageIcon className="size-5 text-primary" />
						<h3 className="font-semibold text-lg">Conversion Settings</h3>
					</div>

					<div className="space-y-4">
						<div className="space-y-2">
							<Label>Target Format</Label>
							<Select value={targetFormat} onValueChange={setTargetFormat}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{FORMATS.map((f) => (
										<SelectItem key={f.id} value={f.id}>
											{f.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						{targetFormat !== "image/png" && (
							<div className="space-y-3 pt-2">
								<div className="flex justify-between">
									<Label>Quality</Label>
									<span className="text-sm text-muted-foreground">
										{Math.round(quality * 100)}%
									</span>
								</div>
								<Slider
									min={0.1}
									max={1}
									step={0.05}
									value={[quality]}
									onValueChange={([v]) => setQuality(v)}
								/>
							</div>
						)}
					</div>

					<div className="pt-6 space-y-3">
						<Button
							onClick={convertImage}
							disabled={!imageSrc}
							className="w-full"
							variant={convertedUrl ? "secondary" : "default"}
						>
							Convert Image
						</Button>

						{convertedUrl && (
							<Button onClick={downloadImage} className="w-full">
								<Download className="size-4 mr-2" /> Download
							</Button>
						)}
					</div>
				</div>
			</div>
		</ToolPageLayout>
	);
}
