import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/preview/open-graph")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Open Graph Preview | WebToolkit" },
			{
				name: "description",
				content: "Preview how your page appears on social platforms",
			},
		],
	}),
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Open Graph Preview tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
