import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/preview/responsive-breakpoints")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Responsive Breakpoint Previewer | WebToolkit" },
			{ name: "description", content: "Preview any URL at common device breakpoints" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Responsive Breakpoint Previewer tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
