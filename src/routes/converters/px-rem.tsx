import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Label } from "#/components/ui/label";
import { Input } from "#/components/ui/input";
import { ArrowRightLeft } from "lucide-react";

export const Route = createFileRoute("/converters/px-rem")({
	component: PxRemConverter,
});

function PxRemConverter() {
	const [base, setBase] = useState(16);
	const [px, setPx] = useState(16);
	const [rem, setRem] = useState(1);
	const [lastEdited, setLastEdited] = useState<"px" | "rem">("px");

	useEffect(() => {
		if (lastEdited === "px") {
			setRem(Number((px / base).toFixed(4)));
		} else {
			setPx(Number((rem * base).toFixed(4)));
		}
	}, [base, px, rem, lastEdited]);

	return (
		<ToolPageLayout>
			<div className="max-w-2xl mx-auto space-y-8">
				<div className="bg-card border border-border rounded-xl p-8 space-y-8">
					<div className="space-y-2 flex justify-center flex-col items-center">
						<Label htmlFor="base-size">Base Font Size (px)</Label>
						<Input 
							id="base-size"
							type="number" 
							value={base} 
							onChange={(e) => setBase(Number(e.target.value))} 
							className="w-32 text-center text-lg"
						/>
						<p className="text-xs text-muted-foreground mt-2">Default browser size is 16px</p>
					</div>

					<div className="flex items-center justify-center gap-6 pt-4">
						<div className="space-y-2 w-32">
							<Label htmlFor="px-val">Pixels (px)</Label>
							<Input 
								id="px-val"
								type="number" 
								value={px} 
								onChange={(e) => {
									setPx(Number(e.target.value));
									setLastEdited("px");
								}} 
								className="text-center text-xl h-14"
							/>
						</div>
						
						<div className="pt-6">
							<ArrowRightLeft className="text-muted-foreground size-6" />
						</div>

						<div className="space-y-2 w-32">
							<Label htmlFor="rem-val">Rems (rem)</Label>
							<Input 
								id="rem-val"
								type="number" 
								value={rem} 
								onChange={(e) => {
									setRem(Number(e.target.value));
									setLastEdited("rem");
								}} 
								className="text-center text-xl h-14"
							/>
						</div>
					</div>
				</div>
			</div>
		</ToolPageLayout>
	);
}
