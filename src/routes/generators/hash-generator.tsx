import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CopyButton } from "#/components/copy-button";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Textarea } from "#/components/ui/textarea";

export const Route = createFileRoute("/generators/hash-generator")({
	component: HashGenerator,
});

function HashGenerator() {
	const [input, setInput] = useState("");
	const [hashes, setHashes] = useState<Record<string, string>>({
		SHA1: "",
		SHA256: "",
		SHA384: "",
		SHA512: "",
	});

	useEffect(() => {
		const computeHashes = async () => {
			if (!input) {
				setHashes({ SHA1: "", SHA256: "", SHA384: "", SHA512: "" });
				return;
			}

			const encoder = new TextEncoder();
			const data = encoder.encode(input);

			const hashTypes = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
			const newHashes: Record<string, string> = {};

			for (const type of hashTypes) {
				try {
					const hashBuffer = await crypto.subtle.digest(type, data);
					const hashArray = Array.from(new Uint8Array(hashBuffer));
					const hashHex = hashArray
						.map((b) => b.toString(16).padStart(2, "0"))
						.join("");
					newHashes[type.replace("-", "")] = hashHex;
				} catch (e) {
					// Web Crypto API not available or error
				}
			}

			setHashes(newHashes as any);
		};

		computeHashes();
	}, [input]);

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[1fr_400px] gap-8">
				<div className="flex flex-col h-[500px] border border-border rounded-xl overflow-hidden bg-card focus-within:ring-1 focus-within:ring-ring">
					<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm">
						Input Text
					</div>
					<Textarea
						value={input}
						onChange={(e) => setInput(e.target.value)}
						className="flex-1 resize-none border-0 rounded-none focus-visible:ring-0 p-4 font-mono text-sm bg-transparent"
						placeholder="Type or paste text here to hash..."
					/>
				</div>

				<div className="space-y-6">
					{Object.entries(hashes).map(([name, hash]) => (
						<div
							key={name}
							className="space-y-2 bg-card border border-border p-4 rounded-xl"
						>
							<div className="flex items-center justify-between">
								<h3 className="font-semibold text-sm">{name}</h3>
								{hash && <CopyButton value={hash} className="size-6" />}
							</div>
							<div className="font-mono text-xs text-muted-foreground break-all bg-muted p-2 rounded border border-border min-h-[40px] flex items-center">
								{hash || "Waiting for input..."}
							</div>
						</div>
					))}
				</div>
			</div>
		</ToolPageLayout>
	);
}
