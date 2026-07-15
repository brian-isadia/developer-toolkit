import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/generators/robots-txt")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "robots.txt Builder | WebToolkit" },
			{ name: "description", content: "Build robots.txt with visual controls and presets" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				robots.txt Builder tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
