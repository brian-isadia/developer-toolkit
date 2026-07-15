import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/encoding/url-encode")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "URL Encode/Decode | WebToolkit" },
			{ name: "description", content: "Encode and decode URI components" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				URL Encode/Decode tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
