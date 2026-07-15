import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/colors/contrast-checker")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "Contrast Checker | WebToolkit" },
			{ name: "description", content: "Check WCAG AA/AAA and APCA contrast ratios" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				Contrast Checker tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
