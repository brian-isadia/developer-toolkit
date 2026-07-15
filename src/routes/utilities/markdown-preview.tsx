import { createFileRoute } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useEffect, useState } from "react";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Textarea } from "#/components/ui/textarea";

export const Route = createFileRoute("/utilities/markdown-preview")({
	component: MarkdownPreview,
});

const DEFAULT_MD = `# Welcome to Markdown Preview
Write your markdown on the left, and see the rendered output on the right.

## Features
- **Bold** and *italic* text
- [Links](https://example.com)
- \`Inline code\` and code blocks:
  \`\`\`javascript
  const message = "Hello World";
  console.log(message);
  \`\`\`
- Lists:
  - Item 1
  - Item 2

> Blockquotes are also supported!

Enjoy writing!
`;

function MarkdownPreview() {
	const [markdown, setMarkdown] = useState(DEFAULT_MD);
	const [html, setHtml] = useState("");

	useEffect(() => {
		const parse = async () => {
			const rawHtml = await marked.parse(markdown);
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
			<div className="grid lg:grid-cols-2 gap-6 h-[700px]">
				<div className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card focus-within:ring-1 focus-within:ring-ring">
					<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm">
						Editor
					</div>
					<Textarea
						value={markdown}
						onChange={(e) => setMarkdown(e.target.value)}
						className="flex-1 resize-none border-0 rounded-none focus-visible:ring-0 p-6 font-mono text-base bg-transparent leading-relaxed"
						placeholder="Start writing..."
					/>
				</div>

				<div className="flex flex-col h-full border border-border rounded-xl overflow-hidden bg-card">
					<div className="bg-muted px-4 py-2 border-b border-border font-semibold text-sm">
						Preview
					</div>
					<div
						className="flex-1 overflow-auto p-8 prose prose-invert max-w-none bg-background"
						dangerouslySetInnerHTML={{ __html: html }}
					/>
				</div>
			</div>
		</ToolPageLayout>
	);
}
