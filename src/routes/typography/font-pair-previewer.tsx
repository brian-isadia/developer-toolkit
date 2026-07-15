import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Label } from "#/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { Textarea } from "#/components/ui/textarea";

export const Route = createFileRoute("/typography/font-pair-previewer")({
	component: FontPairPreviewer,
});

const PAIRS = [
	{
		heading: "Playfair Display",
		body: "Source Sans Pro",
		category: "Elegant / Classic",
	},
	{ heading: "Merriweather", body: "Open Sans", category: "Readable / Web" },
	{ heading: "Roboto Slab", body: "Roboto", category: "Modern / Clean" },
	{ heading: "Oswald", body: "Lato", category: "Impactful / Minimal" },
	{
		heading: "Montserrat",
		body: "Merriweather",
		category: "Contemporary / Editorial",
	},
	{ heading: "Space Mono", body: "Work Sans", category: "Tech / Brutalist" },
];

function FontPairPreviewer() {
	const [selectedIdx, setSelectedIdx] = useState(0);
	const [headingText, setHeadingText] = useState("The Quick Brown Fox");
	const [bodyText, setBodyText] = useState(
		"Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between pairs of letters.",
	);

	const pair = PAIRS[selectedIdx];
	const fontUrl = `https://fonts.googleapis.com/css2?family=${pair.heading.replace(/ /g, "+")}:wght@700&family=${pair.body.replace(/ /g, "+")}:wght@400;600&display=swap`;

	return (
		<ToolPageLayout>
			{/* Inject the google font link */}
			<link href={fontUrl} rel="stylesheet" />

			<div className="grid lg:grid-cols-[300px_1fr] gap-8">
				<div className="space-y-6 bg-card p-6 border border-border rounded-xl h-fit">
					<div className="space-y-2">
						<Label>Font Pairing</Label>
						<Select
							value={selectedIdx.toString()}
							onValueChange={(v) => setSelectedIdx(Number(v))}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{PAIRS.map((p, i) => (
									<SelectItem key={i} value={i.toString()}>
										{p.heading} / {p.body}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label>Heading Text</Label>
						<Textarea
							value={headingText}
							onChange={(e) => setHeadingText(e.target.value)}
							className="resize-none"
							rows={2}
						/>
					</div>

					<div className="space-y-2">
						<Label>Body Text</Label>
						<Textarea
							value={bodyText}
							onChange={(e) => setBodyText(e.target.value)}
							className="resize-y"
							rows={6}
						/>
					</div>
				</div>

				<div className="space-y-8 bg-background border border-border rounded-xl p-8 shadow-sm">
					<div className="space-y-2">
						<div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
							{pair.category}
						</div>
						<h1
							className="text-5xl font-bold tracking-tight mb-8 text-foreground"
							style={{ fontFamily: `"${pair.heading}", serif` }}
						>
							{headingText}
						</h1>
						<p
							className="text-lg leading-relaxed text-muted-foreground"
							style={{ fontFamily: `"${pair.body}", sans-serif` }}
						>
							{bodyText}
						</p>
						<p
							className="text-lg leading-relaxed text-muted-foreground mt-4"
							style={{ fontFamily: `"${pair.body}", sans-serif` }}
						>
							<strong>Bold text example.</strong> {bodyText.split(". ")[0]}.
						</p>
					</div>
				</div>
			</div>
		</ToolPageLayout>
	);
}
