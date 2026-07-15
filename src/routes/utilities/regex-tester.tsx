import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { Textarea } from "#/components/ui/textarea";

export const Route = createFileRoute("/utilities/regex-tester")({
	component: RegexTester,
});

function RegexTester() {
	const [pattern, setPattern] = useState("[a-z]+");
	const [flags, setFlags] = useState("gi");
	const [text, setText] = useState("Hello world! 123 Regex is awesome.");

	const { parts, error, matchCount } = useMemo(() => {
		if (!pattern)
			return { parts: [{ text, match: false }], error: "", matchCount: 0 };

		try {
			const regex = new RegExp(pattern, flags);

			// If not global, RegExp behavior changes, so let's handle slicing carefully
			if (!regex.global) {
				const match = regex.exec(text);
				if (!match)
					return { parts: [{ text, match: false }], error: "", matchCount: 0 };

				const before = text.slice(0, match.index);
				const matched = match[0];
				const after = text.slice(match.index + matched.length);

				return {
					parts: [
						{ text: before, match: false },
						{ text: matched, match: true },
						{ text: after, match: false },
					],
					error: "",
					matchCount: 1,
				};
			}

			// Global match
			const matches = Array.from(text.matchAll(regex));
			if (matches.length === 0)
				return { parts: [{ text, match: false }], error: "", matchCount: 0 };

			const res = [];
			let lastIdx = 0;
			for (const m of matches) {
				if (m.index === undefined) continue;
				if (m.index > lastIdx) {
					res.push({ text: text.slice(lastIdx, m.index), match: false });
				}
				res.push({ text: m[0], match: true });
				lastIdx = m.index + m[0].length;
			}
			if (lastIdx < text.length) {
				res.push({ text: text.slice(lastIdx), match: false });
			}

			return { parts: res, error: "", matchCount: matches.length };
		} catch (e: any) {
			return {
				parts: [{ text, match: false }],
				error: e.message || "Invalid Regular Expression",
				matchCount: 0,
			};
		}
	}, [pattern, flags, text]);

	return (
		<ToolPageLayout>
			<div className="space-y-6">
				<div className="grid lg:grid-cols-[1fr_200px] gap-4">
					<div className="space-y-2">
						<Label>Regular Expression</Label>
						<div className="flex font-mono text-lg relative items-center">
							<span className="absolute left-3 text-muted-foreground">/</span>
							<Input
								value={pattern}
								onChange={(e) => setPattern(e.target.value)}
								className={`pl-6 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
							/>
							<span className="absolute right-3 text-muted-foreground">/</span>
						</div>
					</div>
					<div className="space-y-2">
						<Label>Flags</Label>
						<Input
							value={flags}
							onChange={(e) => setFlags(e.target.value)}
							className="font-mono text-lg"
						/>
					</div>
				</div>

				{error && (
					<div className="text-destructive text-sm font-medium">{error}</div>
				)}

				<div className="grid lg:grid-cols-2 gap-6 h-[400px]">
					<div className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card focus-within:ring-1 focus-within:ring-ring">
						<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm">
							Test String
						</div>
						<Textarea
							value={text}
							onChange={(e) => setText(e.target.value)}
							className="flex-1 resize-none border-0 rounded-none focus-visible:ring-0 p-4 font-mono text-base bg-transparent"
							placeholder="Type your test string here..."
						/>
					</div>

					<div className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card relative">
						<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm flex justify-between">
							<span>Matches Preview</span>
							{matchCount > 0 && (
								<span className="text-primary">
									{matchCount} match{matchCount !== 1 ? "es" : ""}
								</span>
							)}
						</div>
						<div className="flex-1 overflow-auto p-4 font-mono text-base bg-background whitespace-pre-wrap leading-relaxed">
							{parts.map((p, i) => (
								<span
									key={i}
									className={
										p.match
											? "bg-primary/30 text-primary-foreground rounded-sm outline outline-1 outline-primary/50"
											: "text-muted-foreground"
									}
								>
									{p.text}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</ToolPageLayout>
	);
}
