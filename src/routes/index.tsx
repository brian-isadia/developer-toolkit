import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { toolGroups } from "#/lib/tool-registry";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<div className="flex flex-col min-h-full">
			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center text-center py-20 px-4 sm:px-6 lg:px-8 border-b border-border bg-gradient-to-b from-background to-accent/20">
				<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
					The ultimate developer toolkit
				</h1>
				<p className="text-xl text-muted-foreground max-w-2xl mb-10">
					A collection of {toolGroups.flatMap((g) => g.tools).length} tools for
					everyday development tasks. Everything runs locally in your browser.
				</p>
				<div className="w-full max-w-md relative group">
					<div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
						<Search className="size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
					</div>
					<input
						type="text"
						placeholder="Search tools... (Cmd+K)"
						className="flex h-12 w-full rounded-md border border-input bg-background px-10 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-sm"
						onClick={(e) => {
							e.preventDefault();
							// Dispatch keyboard event for cmd+k to open palette
							document.dispatchEvent(
								new KeyboardEvent("keydown", { key: "k", metaKey: true }),
							);
						}}
						readOnly
					/>
				</div>
			</section>

			{/* Tool Grid */}
			<section className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
				{toolGroups.map((group) => (
					<div key={group.id} className="space-y-6">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-primary/10 rounded-lg text-primary">
								<group.icon className="size-6" />
							</div>
							<h2 className="text-2xl font-semibold tracking-tight">
								{group.label}
							</h2>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{group.tools.map((tool) => (
								<Link
									key={tool.slug}
									to={tool.path}
									className="group/card block h-full"
								>
									<Card className="h-full transition-all hover:border-primary/50 hover:shadow-md bg-card/50 hover:bg-card">
										<CardHeader className="pb-3">
											<div className="flex items-center gap-3">
												<div className="p-2 bg-secondary rounded-md text-secondary-foreground group-hover/card:bg-primary group-hover/card:text-primary-foreground transition-colors">
													<tool.icon className="size-5" />
												</div>
												<CardTitle className="text-base">{tool.name}</CardTitle>
											</div>
										</CardHeader>
										<CardContent>
											<CardDescription className="text-sm line-clamp-2 leading-relaxed">
												{tool.description}
											</CardDescription>
										</CardContent>
									</Card>
								</Link>
							))}
						</div>
					</div>
				))}
			</section>
		</div>
	);
}
