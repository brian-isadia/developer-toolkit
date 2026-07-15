import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/typography/font-pair-previewer")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Font Pair Previewer | WebToolkit" },
			{ name: "description", content: "Browse and preview curated Google Font pairings" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Font Pair Previewer tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
