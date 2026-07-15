import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/colors/palette-generator")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Palette Generator | WebToolkit" },
			{ name: "description", content: "Generate harmonious color palettes from a seed color" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Palette Generator tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
