import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/encoding/base64")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Base64 Encode/Decode | WebToolkit" },
			{ name: "description", content: "Encode and decode Base64 text and files" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Base64 Encode/Decode tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
