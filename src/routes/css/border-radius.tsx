import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/css/border-radius")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Border Radius Visualizer | WebToolkit" },
			{ name: "description", content: "Individual corner radius control with live preview" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Border Radius Visualizer tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
