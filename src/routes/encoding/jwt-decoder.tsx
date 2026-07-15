import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/encoding/jwt-decoder")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "JWT Decoder | WebToolkit" },
			{ name: "description", content: "Decode JWT tokens and inspect header, payload, and signature" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				JWT Decoder tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
