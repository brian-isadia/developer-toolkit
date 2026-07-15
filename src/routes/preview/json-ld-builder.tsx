import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/preview/json-ld-builder")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "JSON-LD Builder | WebToolkit" },
			{ name: "description", content: "Build and validate structured data for schema.org" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				JSON-LD Builder tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
