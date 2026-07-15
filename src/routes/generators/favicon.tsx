import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/generators/favicon")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Favicon Generator | WebToolkit" },
			{ name: "description", content: "Generate multi-size favicons from image or emoji" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Favicon Generator tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
