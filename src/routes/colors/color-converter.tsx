import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/colors/color-converter")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Color Format Converter | WebToolkit" },
			{ name: "description", content: "Convert between Hex, RGB, HSL, and OKLCH color formats" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Color Format Converter tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
