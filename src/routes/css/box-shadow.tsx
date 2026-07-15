import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/css/box-shadow")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Box Shadow Generator | WebToolkit" },
			{ name: "description", content: "Visual box-shadow editor with multiple layers" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Box Shadow Generator tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
