import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/typography/fluid-type-scale")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Fluid Type Scale Calculator | WebToolkit" },
			{ name: "description", content: "Generate CSS clamp() values for responsive typography" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Fluid Type Scale Calculator tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
