import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/typography/line-height-calculator")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Line Height Calculator | WebToolkit" },
			{ name: "description", content: "Calculate optimal line-height for any font size" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Line Height Calculator tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
