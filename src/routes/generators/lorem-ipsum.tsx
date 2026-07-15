import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/generators/lorem-ipsum")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Lorem Ipsum Generator | WebToolkit" },
			{ name: "description", content: "Generate placeholder text by paragraphs, sentences, or words" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Lorem Ipsum Generator tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
