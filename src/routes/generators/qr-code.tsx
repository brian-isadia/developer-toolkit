import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";

export const Route = createFileRoute("/generators/qr-code")({
	component: QrCodeGenerator,
});

function QrCodeGenerator() {
	const [value, setValue] = useState("https://example.com");
	const [fgColor, setFgColor] = useState("#ffffff");
	const [bgColor, setBgColor] = useState("#000000");
	const [size, setSize] = useState(256);

	const downloadQR = () => {
		const canvas = document.getElementById("qr-gen") as HTMLCanvasElement;
		if (canvas) {
			const pngUrl = canvas
				.toDataURL("image/png")
				.replace("image/png", "image/octet-stream");
			const downloadLink = document.createElement("a");
			downloadLink.href = pngUrl;
			downloadLink.download = "qrcode.png";
			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		}
	};

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[1fr_400px] gap-8">
				<div className="space-y-6 bg-card border border-border rounded-xl p-6 h-fit">
					<div className="space-y-3">
						<Label>URL or Text</Label>
						<Input
							value={value}
							onChange={(e) => setValue(e.target.value)}
							placeholder="Enter text to encode..."
						/>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-3">
							<Label>Foreground Color</Label>
							<div className="flex gap-4">
								<Input
									type="color"
									value={fgColor}
									onChange={(e) => setFgColor(e.target.value)}
									className="w-12 p-1 h-10"
								/>
								<Input
									value={fgColor}
									onChange={(e) => setFgColor(e.target.value)}
									className="flex-1 uppercase font-mono"
								/>
							</div>
						</div>
						<div className="space-y-3">
							<Label>Background Color</Label>
							<div className="flex gap-4">
								<Input
									type="color"
									value={bgColor}
									onChange={(e) => setBgColor(e.target.value)}
									className="w-12 p-1 h-10"
								/>
								<Input
									value={bgColor}
									onChange={(e) => setBgColor(e.target.value)}
									className="flex-1 uppercase font-mono"
								/>
							</div>
						</div>
					</div>

					<div className="space-y-3">
						<div className="flex justify-between">
							<Label>Size</Label>
							<span className="text-sm text-muted-foreground">{size}px</span>
						</div>
						<Input
							type="range"
							min={128}
							max={512}
							step={8}
							value={size}
							onChange={(e) => setSize(Number(e.target.value))}
							className="w-full"
						/>
					</div>
				</div>

				<div className="space-y-6 flex flex-col items-center">
					<div className="bg-card border border-border rounded-xl p-8 flex items-center justify-center min-h-[350px] w-full">
						<div
							className="p-4 rounded-xl shadow-xl"
							style={{ backgroundColor: bgColor }}
						>
							<QRCodeCanvas
								id="qr-gen"
								value={value || " "}
								size={size}
								fgColor={fgColor}
								bgColor={bgColor}
								level={"H"}
							/>
						</div>
					</div>

					<Button onClick={downloadQR} className="w-full" disabled={!value}>
						<Download className="size-4 mr-2" /> Download PNG
					</Button>
				</div>
			</div>
		</ToolPageLayout>
	);
}
