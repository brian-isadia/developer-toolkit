import { createFileRoute } from "@tanstack/react-router";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { CopyButton } from "#/components/copy-button";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Slider } from "#/components/ui/slider";
import { Switch } from "#/components/ui/switch";

export const Route = createFileRoute("/generators/uuid")({
	component: UuidGenerator,
});

function UuidGenerator() {
	const [count, setCount] = useState(5);
	const [hyphens, setHyphens] = useState(true);
	const [uppercase, setUppercase] = useState(false);
	const [uuids, setUuids] = useState<string[]>([]);

	const generateUUIDv4 = () => {
		let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			const r = (Math.random() * 16) | 0;
			const v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});

		if (!hyphens) uuid = uuid.replace(/-/g, "");
		if (uppercase) uuid = uuid.toUpperCase();

		return uuid;
	};

	const generate = () => {
		const newUuids = Array.from({ length: count }, generateUUIDv4);
		setUuids(newUuids);
	};

	// Generate initially
	useState(() => {
		generate();
	});

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[350px_1fr] gap-8">
				<div className="space-y-8 bg-card p-6 border border-border rounded-xl h-fit">
					<div className="space-y-3">
						<div className="flex justify-between">
							<Label>Quantity</Label>
							<span className="text-sm text-muted-foreground">{count}</span>
						</div>
						<Slider
							min={1}
							max={50}
							step={1}
							value={[count]}
							onValueChange={([v]) => setCount(v)}
						/>
					</div>

					<div className="space-y-4 pt-4 border-t border-border">
						<div className="flex items-center justify-between">
							<Label htmlFor="hyphens">Include Hyphens</Label>
							<Switch
								id="hyphens"
								checked={hyphens}
								onCheckedChange={setHyphens}
							/>
						</div>
						<div className="flex items-center justify-between">
							<Label htmlFor="uppercase">Uppercase</Label>
							<Switch
								id="uppercase"
								checked={uppercase}
								onCheckedChange={setUppercase}
							/>
						</div>
					</div>

					<Button onClick={generate} className="w-full">
						<RefreshCw className="mr-2 size-4" /> Regenerate
					</Button>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between bg-muted p-4 rounded-xl border border-border">
						<h3 className="font-semibold text-sm">Generated UUIDs (v4)</h3>
						<CopyButton value={uuids.join("\n")} className="h-8" />
					</div>

					<div className="bg-card border border-border rounded-xl p-4 font-mono text-sm space-y-2 max-h-[600px] overflow-auto">
						{uuids.map((id, i) => (
							<div
								key={i}
								className="flex justify-between items-center group px-4 py-2 hover:bg-accent rounded-md transition-colors"
							>
								<span>{id}</span>
								<CopyButton
									value={id}
									className="opacity-0 group-hover:opacity-100 transition-opacity size-8"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</ToolPageLayout>
	);
}
