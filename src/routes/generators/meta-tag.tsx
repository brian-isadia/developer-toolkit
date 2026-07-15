import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/generators/meta-tag")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Meta Tag Generator | WebToolkit" },
			{ name: "description", content: "Generate SEO, Open Graph, and Twitter meta tags" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Meta Tag Generator tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
