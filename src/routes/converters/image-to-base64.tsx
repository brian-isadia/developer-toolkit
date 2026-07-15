import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/converters/image-to-base64")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Image to Base64 | WebToolkit" },
			{ name: "description", content: "Convert images to Base64 data URIs" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Image to Base64 tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
