import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/colors/color-blindness")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Color Blindness Simulator | WebToolkit" },
			{ name: "description", content: "Preview colors through color vision deficiency filters" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Color Blindness Simulator tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
