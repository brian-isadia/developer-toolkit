import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/colors/tailwind-color-finder")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Tailwind Color Finder | WebToolkit" },
			{ name: "description", content: "Find the nearest Tailwind CSS color class for any color" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Tailwind Color Finder tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
