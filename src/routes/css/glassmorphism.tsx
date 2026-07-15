import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/css/glassmorphism")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Glassmorphism Generator | WebToolkit" },
			{ name: "description", content: "Backdrop-filter glass effect builder" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Glassmorphism Generator tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
