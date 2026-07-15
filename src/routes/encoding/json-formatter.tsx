import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Textarea } from "#/components/ui/textarea";
import { CodeOutput } from "#/components/code-output";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/encoding/json-formatter")({
	component: JsonFormatter,
});

function JsonFormatter() {
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [error, setError] = useState("");

	const format = (space: number) => {
		if (!input.trim()) {
			setOutput("");
			setError("");
			return;
		}
		try {
			const obj = JSON.parse(input);
			setOutput(JSON.stringify(obj, null, space));
			setError("");
		} catch (e: any) {
			setError(e.message || "Invalid JSON");
		}
	};

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-2 gap-6 h-[600px]">
				<div className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card focus-within:ring-1 focus-within:ring-ring">
					<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm flex justify-between items-center h-12">
						<span>Input JSON</span>
						<div className="flex gap-2">
							<Button size="sm" variant="secondary" onClick={() => format(2)}>Format</Button>
							<Button size="sm" variant="secondary" onClick={() => format(0)}>Minify</Button>
						</div>
					</div>
					<Textarea
						value={input}
						onChange={(e) => {
							setInput(e.target.value);
							setError("");
						}}
						className="flex-1 resize-none border-0 rounded-none focus-visible:ring-0 p-4 font-mono text-sm bg-transparent"
						placeholder='{"hello": "world"}'
					/>
				</div>

				<div className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card relative">
					<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm flex justify-between items-center h-12">
						<span>Output</span>
						{error && <span className="text-destructive font-normal text-xs">{error}</span>}
					</div>
					<div className="flex-1 overflow-auto bg-transparent relative h-full">
						{output && !error ? (
							<CodeOutput code={output} language="json" />
						) : (
							<Textarea
								readOnly
								value={output}
								className="h-full resize-none border-0 rounded-none focus-visible:ring-0 p-4 font-mono text-sm bg-transparent text-muted-foreground"
							/>
						)}
					</div>
				</div>
			</div>
		</ToolPageLayout>
	);
}
