import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/converters/svg-optimizer")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "SVG Optimizer | WebToolkit" },
			{ name: "description", content: "Optimize SVG markup with before/after size comparison" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				SVG Optimizer tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
