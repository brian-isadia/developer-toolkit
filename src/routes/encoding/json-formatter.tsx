import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/encoding/json-formatter")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "JSON Formatter | WebToolkit" },
			{ name: "description", content: "Format, validate, and minify JSON with syntax highlighting" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				JSON Formatter tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
