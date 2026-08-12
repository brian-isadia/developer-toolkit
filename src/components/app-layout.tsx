import { CommandPalette } from "#/components/command-palette";
import { Header } from "#/components/header";
import { Sidebar } from "#/components/sidebar";
import { TooltipProvider } from "#/components/ui/tooltip";

export function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<TooltipProvider delayDuration={300}>
			<div className="flex h-[100svh] w-full overflow-hidden bg-background text-foreground">
				<Sidebar />
				<main className="flex-1 flex flex-col h-full overflow-y-auto">
					<Header />
					<div className="flex-1">{children}</div>
				</main>
				<CommandPalette />
			</div>
		</TooltipProvider>
	);
}
