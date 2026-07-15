import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/converters/image-format-converter")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Image Format Converter | WebToolkit" },
			{ name: "description", content: "Convert between PNG, WebP, JPEG, and AVIF formats" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Image Format Converter tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
