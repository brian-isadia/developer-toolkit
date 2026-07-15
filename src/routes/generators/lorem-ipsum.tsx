import { createFileRoute } from "@tanstack/react-router";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { CopyButton } from "#/components/copy-button";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "#/components/ui/select";
import { Slider } from "#/components/ui/slider";

export const Route = createFileRoute("/generators/lorem-ipsum")({
	component: LoremIpsumGenerator,
});

const LOREM_WORDS = [
	"lorem",
	"ipsum",
	"dolor",
	"sit",
	"amet",
	"consectetur",
	"adipiscing",
	"elit",
	"sed",
	"do",
	"eiusmod",
	"tempor",
	"incididunt",
	"ut",
	"labore",
	"et",
	"dolore",
	"magna",
	"aliqua",
	"enim",
	"ad",
	"minim",
	"veniam",
	"quis",
	"nostrud",
	"exercitation",
	"ullamco",
	"laboris",
	"nisi",
	"aliquip",
	"ex",
	"ea",
	"commodo",
	"consequat",
	"duis",
	"aute",
	"irure",
	"in",
	"reprehenderit",
	"voluptate",
	"velit",
	"esse",
	"cillum",
	"fugiat",
	"nulla",
	"pariatur",
	"excepteur",
	"sint",
	"occaecat",
	"cupidatat",
	"non",
	"proident",
	"sunt",
	"culpa",
	"qui",
	"officia",
	"deserunt",
	"mollit",
	"anim",
	"id",
	"est",
	"laborum",
];

function LoremIpsumGenerator() {
	const [count, setCount] = useState(3);
	const [type, setType] = useState<"paragraphs" | "sentences" | "words">(
		"paragraphs",
	);
	const [text, setText] = useState("");

	const generate = () => {
		const getRandomWord = () =>
			LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];

		const generateSentence = () => {
			const wordCount = Math.floor(Math.random() * 8) + 5; // 5-12 words
			const words = Array.from({ length: wordCount }, getRandomWord);
			words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
			return words.join(" ") + ".";
		};

		const generateParagraph = () => {
			const sentenceCount = Math.floor(Math.random() * 4) + 3; // 3-6 sentences
			return Array.from({ length: sentenceCount }, generateSentence).join(" ");
		};

		let result = [];
		if (type === "paragraphs") {
			result = Array.from({ length: count }, generateParagraph);
			setText(result.join("\n\n"));
		} else if (type === "sentences") {
			result = Array.from({ length: count }, generateSentence);
			setText(result.join(" "));
		} else {
			const words = Array.from({ length: count }, getRandomWord);
			setText(words.join(" "));
		}
	};

	useState(() => {
		generate();
	});

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-[350px_1fr] gap-8">
				<div className="space-y-8 bg-card p-6 border border-border rounded-xl h-fit">
					<div className="space-y-4">
						<Label>Type</Label>
						<Select value={type} onValueChange={(v: any) => setType(v)}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="paragraphs">Paragraphs</SelectItem>
								<SelectItem value="sentences">Sentences</SelectItem>
								<SelectItem value="words">Words</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-3 pt-4 border-t border-border">
						<div className="flex justify-between">
							<Label>Quantity</Label>
							<span className="text-sm text-muted-foreground">{count}</span>
						</div>
						<Slider
							min={1}
							max={type === "words" ? 100 : 20}
							step={1}
							value={[count]}
							onValueChange={([v]) => setCount(v)}
						/>
					</div>

					<Button onClick={generate} className="w-full">
						<RefreshCw className="mr-2 size-4" /> Regenerate
					</Button>
				</div>

				<div className="space-y-4">
					<div className="flex items-center justify-between bg-muted p-4 rounded-xl border border-border">
						<h3 className="font-semibold text-sm">Generated Text</h3>
						<CopyButton value={text} className="h-8" />
					</div>

					<div className="bg-card border border-border rounded-xl p-6 text-foreground leading-relaxed whitespace-pre-wrap max-h-[600px] overflow-auto">
						{text}
					</div>
				</div>
			</div>
		</ToolPageLayout>
	);
}
