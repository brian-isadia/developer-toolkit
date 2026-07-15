import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Menu, SquareTerminal } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";
import { usePersistedState } from "#/hooks/use-persisted-state";
import { toolGroups } from "#/lib/tool-registry";
import { cn } from "#/lib/utils";

export function Sidebar() {
	const [isCollapsed, setIsCollapsed] = usePersistedState(
		"sidebar-collapsed",
		false,
	);
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	return (
		<aside
			className={cn(
				"relative flex flex-col border-r border-border bg-card transition-all duration-300 z-20",
				isCollapsed ? "w-16" : "w-64",
			)}
		>
			<div className="flex h-14 items-center border-b border-border px-4 justify-between">
				{!isCollapsed && (
					<Link
						to="/"
						className="flex items-center gap-2 font-semibold text-lg tracking-tight hover:text-primary transition-colors"
					>
						<SquareTerminal className="size-5 text-primary" />
						<span>WebToolkit</span>
					</Link>
				)}
				{isCollapsed && (
					<Link to="/" className="flex items-center justify-center w-full">
						<SquareTerminal className="size-6 text-primary" />
					</Link>
				)}
			</div>

			<div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
				<nav className="space-y-6 px-2">
					{toolGroups.map((group) => (
						<div key={group.id} className="space-y-1">
							{!isCollapsed ? (
								<h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
									{group.label}
								</h3>
							) : (
								<div className="flex justify-center mb-2">
									<group.icon className="size-4 text-muted-foreground/50" />
								</div>
							)}
							<div className="space-y-1">
								{group.tools.map((tool) => {
									const isActive = pathname === tool.path;
									const link = (
										<Link
											key={tool.slug}
											to={tool.path}
											className={cn(
												"group flex items-center gap-3 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
												isActive
													? "bg-primary/10 text-primary"
													: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
												isCollapsed ? "justify-center" : "",
											)}
										>
											<tool.icon
												className={cn(
													"size-4 shrink-0 transition-colors",
													isActive
														? "text-primary"
														: "text-muted-foreground group-hover:text-accent-foreground",
												)}
											/>
											{!isCollapsed && <span>{tool.name}</span>}
										</Link>
									);

									if (isCollapsed) {
										return (
											<Tooltip key={tool.slug} delayDuration={0}>
												<TooltipTrigger asChild>{link}</TooltipTrigger>
												<TooltipContent
													side="right"
													className="flex items-center gap-4"
												>
													{tool.name}
												</TooltipContent>
											</Tooltip>
										);
									}
									return link;
								})}
							</div>
						</div>
					))}
				</nav>
			</div>

			<div className="border-t border-border p-2">
				<Button
					variant="ghost"
					size="icon"
					className="w-full flex items-center justify-center text-muted-foreground hover:text-foreground"
					onClick={() => setIsCollapsed((prev) => !prev)}
				>
					{isCollapsed ? (
						<ChevronRight className="size-4" />
					) : (
						<ChevronLeft className="size-4" />
					)}
				</Button>
			</div>
		</aside>
	);
}
