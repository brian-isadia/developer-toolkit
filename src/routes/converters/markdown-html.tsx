import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/converters/markdown-html")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Markdown ↔ HTML | WebToolkit" },
			{ name: "description", content: "Convert between Markdown and HTML with live preview" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Markdown ↔ HTML tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
