import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/css/grid-generator")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "CSS Grid Generator | WebToolkit" },
			{ name: "description", content: "Visual CSS Grid layout builder with code output" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				CSS Grid Generator tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
