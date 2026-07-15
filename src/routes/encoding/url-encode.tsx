import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Textarea } from "#/components/ui/textarea";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/encoding/url-encode")({
	component: UrlEncodeTool,
});

function UrlEncodeTool() {
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
				setOutput(encodeURIComponent(val));
			} else {
				setOutput(decodeURIComponent(val));
			}
		} catch (e) {
			setError("Invalid URL encoding");
			setOutput("");
		}
	};

	const toggleMode = () => {
		const newMode = mode === "encode" ? "decode" : "encode";
		setMode(newMode);
		process(output, newMode);
	};

	return (
		<ToolPageLayout>
			<div className="space-y-6">
				<div className="flex items-center justify-between bg-card border border-border rounded-lg p-2">
					<div className="flex gap-2">
						<Button 
							variant={mode === "encode" ? "default" : "ghost"} 
							onClick={() => { setMode("encode"); process(input, "encode"); }}
						>
							Encode
						</Button>
						<Button 
							variant={mode === "decode" ? "default" : "ghost"} 
							onClick={() => { setMode("decode"); process(input, "decode"); }}
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
							Input {mode === "encode" ? "(Text/URL)" : "(Encoded URL)"}
						</div>
						<Textarea
							value={input}
							onChange={(e) => process(e.target.value, mode)}
							className="flex-1 resize-none border-0 rounded-none focus-visible:ring-0 p-4 font-mono text-sm bg-transparent"
							placeholder={mode === "encode" ? "Type URL or text to encode..." : "Paste encoded URL..."}
						/>
					</div>

					<div className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card relative">
						<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm flex justify-between">
							<span>Output {mode === "encode" ? "(Encoded URL)" : "(Text/URL)"}</span>
							{error && <span className="text-destructive font-normal">{error}</span>}
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
