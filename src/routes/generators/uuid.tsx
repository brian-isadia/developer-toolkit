import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/generators/uuid")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "UUID Generator | WebToolkit" },
			{ name: "description", content: "Generate v4 UUIDs individually or in bulk" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				UUID Generator tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
