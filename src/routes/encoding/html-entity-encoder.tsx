import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/encoding/html-entity-encoder")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "HTML Entity Encoder | WebToolkit" },
			{ name: "description", content: "Encode and decode HTML entities and character codes" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				HTML Entity Encoder tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
