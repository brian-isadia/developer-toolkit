import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CodeOutput } from "#/components/code-output";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Card, CardContent } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { Slider } from "#/components/ui/slider";

export const Route = createFileRoute("/colors/gradient-generator")({
	component: GradientGenerator,
});

function GradientGenerator() {
	const [type, setType] = useState<"linear" | "radial" | "conic">("linear");
	const [angle, setAngle] = useState(90);
	const [color1, setColor1] = useState("#3b82f6");
	const [color2, setColor2] = useState("#8b5cf6");
	const [pos1, setPos1] = useState(0);
	const [pos2, setPos2] = useState(100);

	const getGradientString = () => {
		if (type === "linear") {
			return `linear-gradient(${angle}deg, ${color1} ${pos1}%, ${color2} ${pos2}%)`;
		}
		if (type === "radial") {
			return `radial-gradient(circle, ${color1} ${pos1}%, ${color2} ${pos2}%)`;
		}
		return `conic-gradient(from ${angle}deg, ${color1} ${pos1}%, ${color2} ${pos2}%)`;
	};

	const css = `background: ${getGradientString()};`;

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[1fr_400px] gap-8">
				<div
					className="w-full h-[400px] lg:h-[600px] rounded-2xl border border-border shadow-inner"
					style={{ background: getGradientString() }}
				/>

				<div className="space-y-6">
					<Card>
						<CardContent className="pt-6 space-y-6">
							<div className="space-y-2">
								<Label>Gradient Type</Label>
								<Select value={type} onValueChange={(v: any) => setType(v)}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="linear">Linear</SelectItem>
										<SelectItem value="radial">Radial</SelectItem>
										<SelectItem value="conic">Conic</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{(type === "linear" || type === "conic") && (
								<div className="space-y-4">
									<div className="flex justify-between items-center">
										<Label>Angle ({angle}deg)</Label>
									</div>
									<Slider
										min={0}
										max={360}
										step={1}
										value={[angle]}
										onValueChange={([v]) => setAngle(v)}
									/>
								</div>
							)}

							<div className="space-y-4 pt-4 border-t border-border">
								<div className="flex items-center gap-4">
									<Input
										type="color"
										value={color1}
										onChange={(e) => setColor1(e.target.value)}
										className="w-12 p-1 h-10"
									/>
									<div className="flex-1 space-y-2">
										<div className="flex justify-between text-xs">
											<Label>Start Color</Label>
											<span>{pos1}%</span>
										</div>
										<Slider
											min={0}
											max={100}
											step={1}
											value={[pos1]}
											onValueChange={([v]) => setPos1(v)}
										/>
									</div>
								</div>

								<div className="flex items-center gap-4">
									<Input
										type="color"
										value={color2}
										onChange={(e) => setColor2(e.target.value)}
										className="w-12 p-1 h-10"
									/>
									<div className="flex-1 space-y-2">
										<div className="flex justify-between text-xs">
											<Label>End Color</Label>
											<span>{pos2}%</span>
										</div>
										<Slider
											min={0}
											max={100}
											step={1}
											value={[pos2]}
											onValueChange={([v]) => setPos2(v)}
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<CodeOutput code={css} language="css" label="CSS" />
				</div>
			</div>
		</ToolPageLayout>
	);
}
