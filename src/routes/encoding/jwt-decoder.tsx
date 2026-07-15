import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Textarea } from "#/components/ui/textarea";
import { CodeOutput } from "#/components/code-output";

export const Route = createFileRoute("/encoding/jwt-decoder")({
	component: JwtDecoder,
});

function JwtDecoder() {
	const [input, setInput] = useState("");
	
	let header = "";
	let payload = "";
	let error = "";

	if (input.trim()) {
		try {
			const parts = input.split(".");
			if (parts.length !== 3 && parts.length !== 2) {
				throw new Error("JWT must have 2 or 3 parts separated by dots");
			}

			const decodeB64Url = (str: string) => {
				const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
				const pad = b64.length % 4;
				const padded = pad ? b64 + "=".repeat(4 - pad) : b64;
				return decodeURIComponent(escape(atob(padded)));
			};

			header = JSON.stringify(JSON.parse(decodeB64Url(parts[0])), null, 2);
			payload = JSON.stringify(JSON.parse(decodeB64Url(parts[1])), null, 2);
		} catch (e: any) {
			error = e.message || "Invalid JWT";
		}
	}

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-2 gap-6">
				<div className="flex flex-col h-[600px] border border-border rounded-xl overflow-hidden bg-card focus-within:ring-1 focus-within:ring-ring">
					<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm">
						Encoded JWT
					</div>
					<Textarea
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="flex-1 resize-none border-0 rounded-none focus-visible:ring-0 p-4 font-mono text-sm bg-transparent"
						placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
					/>
				</div>

				<div className="flex flex-col gap-6">
					{error ? (
						<div className="p-4 bg-destructive/10 text-destructive border border-destructive/20 rounded-xl">
							{error}
						</div>
					) : (
						<>
							<div className="flex flex-col border border-border rounded-xl overflow-hidden bg-card">
								<CodeOutput code={header || "Header will appear here"} language="json" label="Header (Algorithm & Type)" />
							</div>
							<div className="flex flex-col border border-border rounded-xl overflow-hidden bg-card flex-1">
								<CodeOutput code={payload || "Payload will appear here"} language="json" label="Payload (Data)" />
							</div>
						</>
					)}
				</div>
			</div>
		</ToolPageLayout>
	);
}
