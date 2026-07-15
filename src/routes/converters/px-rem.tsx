import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/converters/px-rem")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "px ↔ rem Converter | WebToolkit" },
			{ name: "description", content: "Convert between px and rem with configurable base size" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				px ↔ rem Converter tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
