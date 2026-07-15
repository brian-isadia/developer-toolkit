import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/css/easing-editor")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Easing Editor | WebToolkit" },
			{ name: "description", content: "Cubic-bezier curve editor with animation preview" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Easing Editor tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
