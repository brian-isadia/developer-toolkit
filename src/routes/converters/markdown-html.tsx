import { createFileRoute } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useState } from "react";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Textarea } from "#/components/ui/textarea";

export const Route = createFileRoute("/converters/markdown-html")({
	component: MarkdownHtmlConverter,
});

const DEFAULT_MD = `# Markdown ↔ HTML
Write some markdown on the left, and see HTML on the right.

## Features
- **Live Preview**
- *HTML Output*
- \`Code blocks\`

> "A simple but effective converter."
`;

function MarkdownHtmlConverter() {
	const [markdown, setMarkdown] = useState(DEFAULT_MD);
	const [html, setHtml] = useState("");

	useEffect(() => {
		const parse = async () => {
			const rawHtml = await marked.parse(markdown);
			// DOMPurify doesn't work out of the box in SSR without a window object,
			// but we are in the browser here. Wait, TanStack Start SSR might run this!
			// We should only purify on the client or handle SSR safely.
			if (typeof window !== "undefined") {
				setHtml(DOMPurify.sanitize(rawHtml));
			} else {
				setHtml(rawHtml);
			}
		};
		parse();
	}, [markdown]);

	return (
		<ToolPageLayout>
			<div className="grid lg:grid-cols-2 gap-6 h-[600px]">
				<div className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card">
					<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm">
						Markdown
					</div>
					<Textarea
						value={markdown}
						onChange={(e) => setMarkdown(e.target.value)}
						className="flex-1 resize-none border-0 rounded-none focus-visible:ring-0 p-4 font-mono text-sm bg-transparent"
						placeholder="Type markdown here..."
					/>
				</div>

				<div className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card">
					<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm">
						HTML Preview
					</div>
					<div
						className="flex-1 overflow-auto p-6 prose prose-invert max-w-none bg-background"
						dangerouslySetInnerHTML={{ __html: html }}
					/>
				</div>
			</div>
			<div className="mt-6 border border-border rounded-xl overflow-hidden bg-card h-64 flex flex-col">
				<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm">
					Raw HTML Output
				</div>
				<Textarea
					readOnly
					value={html}
					className="flex-1 resize-none border-0 rounded-none focus-visible:ring-0 p-4 font-mono text-sm bg-transparent"
				/>
			</div>
		</ToolPageLayout>
	);
}
