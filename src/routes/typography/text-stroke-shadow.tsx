import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/typography/text-stroke-shadow")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Text Stroke & Shadow | WebToolkit" },
			{ name: "description", content: "Visual editor for text-shadow and text-stroke effects" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Text Stroke & Shadow tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
