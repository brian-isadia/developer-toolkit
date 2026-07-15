import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftRight } from "lucide-react";
import { useState } from "react";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Button } from "#/components/ui/button";
import { Textarea } from "#/components/ui/textarea";

export const Route = createFileRoute("/encoding/base64")({
	component: Base64Tool,
});

function Base64Tool() {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [mode, setMode] = useState<"encode" | "decode">("encode");
	const [error, setError] = useState("");

	const process = (val: string, currentMode: "encode" | "decode") => {
		setInput(val);
		setError("");
		if (!val) {
			setOutput("");
			return;
		}

		try {
			if (currentMode === "encode") {
				// To handle unicode
				const utf8 = unescape(encodeURIComponent(val));
				setOutput(btoa(utf8));
			} else {
				const utf8 = atob(val);
				setOutput(decodeURIComponent(escape(utf8)));
			}
		} catch (e) {
			setError(
				currentMode === "decode" ? "Invalid Base64 string" : "Encoding error",
			);
			setOutput("");
		}
	};

	const toggleMode = () => {
		const newMode = mode === "encode" ? "decode" : "encode";
		setMode(newMode);
		process(output, newMode); // Swap and process
	};

	return (
		<ToolPageLayout>
			<div className="space-y-6">
				<div className="flex items-center justify-between bg-card border border-border rounded-lg p-2">
					<div className="flex gap-2">
						<Button
							variant={mode === "encode" ? "default" : "ghost"}
							onClick={() => {
								setMode("encode");
								process(input, "encode");
							}}
						>
							Encode
						</Button>
						<Button
							variant={mode === "decode" ? "default" : "ghost"}
							onClick={() => {
								setMode("decode");
								process(input, "decode");
							}}
						>
							Decode
						</Button>
					</div>
					<Button variant="outline" size="icon" onClick={toggleMode}>
						<ArrowLeftRight className="size-4" />
					</Button>
				</div>

				<div className="grid lg:grid-cols-2 gap-6 h-[400px]">
					<div className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card focus-within:ring-1 focus-within:ring-ring">
						<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm">
							Input {mode === "encode" ? "(Text)" : "(Base64)"}
						</div>
						<Textarea
							value={input}
							onChange={(e) => process(e.target.value, mode)}
							className="flex-1 resize-none border-0 rounded-none focus-visible:ring-0 p-4 font-mono text-sm bg-transparent"
							placeholder={
								mode === "encode"
									? "Type text to encode..."
									: "Paste Base64 to decode..."
							}
						/>
					</div>

					<div className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card relative">
						<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm flex justify-between">
							<span>Output {mode === "encode" ? "(Base64)" : "(Text)"}</span>
							{error && (
								<span className="text-destructive font-normal">{error}</span>
							)}
						</div>
						<Textarea
							readOnly
							value={output}
							className="flex-1 resize-none border-0 rounded-none focus-visible:ring-0 p-4 font-mono text-sm bg-transparent"
						/>
					</div>
				</div>
			</div>
		</ToolPageLayout>
	);
}
