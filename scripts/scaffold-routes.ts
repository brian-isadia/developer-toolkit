import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { allTools } from "../src/lib/tool-registry";

async function scaffold() {
	for (const tool of allTools) {
		const relativePath = tool.path.replace(/^\//, ""); // e.g. "colors/color-converter"
		const file = join(process.cwd(), "src", "routes", `${relativePath}.tsx`);

		const content = `import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/${relativePath}")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{ title: "${tool.name} | WebToolkit" },
			{ name: "description", content: "${tool.description}" }
		]
	})
});

function RouteComponent() {
	return (
		<ToolPageLayout>
			<div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
				${tool.name} tool coming soon.
			</div>
		</ToolPageLayout>
	);
}
`;

		await mkdir(dirname(file), { recursive: true });
		await writeFile(file, content);
		console.log(`Created ${file}`);
	}
}

scaffold().catch(console.error);
