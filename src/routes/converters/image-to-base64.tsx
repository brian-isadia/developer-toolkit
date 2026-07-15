import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Label } from "#/components/ui/label";
import { Input } from "#/components/ui/input";
import { CodeOutput } from "#/components/code-output";
import { UploadCloud, FileImage } from "lucide-react";

export const Route = createFileRoute("/converters/image-to-base64")({
	component: ImageToBase64,
});

function ImageToBase64() {
	const [base64, setBase64] = useState<string>("");
	const [fileName, setFileName] = useState<string>("");
	const [fileSize, setFileSize] = useState<number>(0);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setFileName(file.name);
		setFileSize(file.size);

		const reader = new FileReader();
		reader.onload = (event) => {
			if (typeof event.target?.result === "string") {
				setBase64(event.target.result);
			}
		};
		reader.readAsDataURL(file);
	};

	const formatSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[1fr_400px] gap-8">
				<div className="space-y-6">
					<div className="relative border-2 border-dashed border-border rounded-2xl p-12 flex flex-col items-center justify-center text-center hover:bg-accent/50 transition-colors bg-card group">
						<input
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
						/>
						<UploadCloud className="size-12 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
						<h3 className="text-lg font-semibold">Drop an image here or click to upload</h3>
						<p className="text-sm text-muted-foreground mt-2">Supports JPG, PNG, WEBP, SVG, GIF</p>
					</div>

					{base64 && (
						<div className="space-y-4">
							<div className="flex items-center justify-between border-b border-border pb-2">
								<div className="flex items-center gap-2">
									<FileImage className="size-4 text-primary" />
									<span className="font-medium">{fileName}</span>
								</div>
								<div className="text-sm text-muted-foreground">
									Original: {formatSize(fileSize)} &bull; Base64: {formatSize(base64.length)}
								</div>
							</div>
							<CodeOutput code={base64} label="Base64 Data URI" />
						</div>
					)}
				</div>

				<div className="bg-card border border-border rounded-xl p-6 h-fit min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
					{base64 ? (
						<img 
							src={base64} 
							alt="Preview" 
							className="max-w-full max-h-[400px] object-contain rounded-md"
						/>
					) : (
						<div className="text-muted-foreground text-center space-y-2">
							<FileImage className="size-12 mx-auto opacity-20" />
							<p>Preview will appear here</p>
						</div>
					)}
				</div>
			</div>
		</ToolPageLayout>
	);
}
