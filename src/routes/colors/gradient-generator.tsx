import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/colors/gradient-generator")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Gradient Generator | WebToolkit" },
			{ name: "description", content: "Build linear, radial, and conic CSS gradients visually" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Gradient Generator tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
