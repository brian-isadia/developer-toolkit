import { Link, useRouterState } from "@tanstack/react-router";
import { findGroupByToolPath, findToolByPath } from "#/lib/tool-registry";

export function ToolPageLayout({ children }: { children: React.ReactNode }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const tool = findToolByPath(pathname);
	const group = findGroupByToolPath(pathname);

	const relatedTools =
		group?.tools.filter((t) => t.path !== pathname).slice(0, 4) ?? [];

	return (
		<div className="flex flex-col gap-8 p-6 max-w-5xl mx-auto w-full">
			{tool && (
				<div className="space-y-1">
					<h1 className="text-2xl font-bold tracking-tight">{tool.name}</h1>
					<p className="text-muted-foreground">{tool.description}</p>
				</div>
			)}

			<div className="flex-1">{children}</div>

			{relatedTools.length > 0 && (
				<div className="border-t border-border pt-6 mt-4">
					<h2 className="text-sm font-medium text-muted-foreground mb-3">
						Related tools in {group?.label}
					</h2>
					<div className="flex flex-wrap gap-2">
						{relatedTools.map((t) => (
							<Link
								key={t.path}
								to={t.path}
								className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
							>
								<t.icon className="size-3.5" />
								{t.name}
							</Link>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
