import { Check, Laptop, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "#/components/theme-provider";
import { Button } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";

export function Header() {
	const { theme, setTheme } = useTheme();

	const openCommandPalette = () => {
		document.dispatchEvent(
			new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }),
		);
	};

	return (
		<header className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-xs">
			<div className="flex items-center gap-2">
				<Button
					variant="outline"
					size="sm"
					onClick={openCommandPalette}
					className="h-8 text-xs text-muted-foreground hover:text-foreground justify-start gap-2 w-48 sm:w-64"
				>
					<Search className="size-3.5 shrink-0" />
					<span>Search tools...</span>
					<kbd className="ml-auto pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
						<span className="text-xs">⌘</span>K
					</kbd>
				</Button>
			</div>

			<div className="flex items-center gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="h-8 w-8">
							<Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => setTheme("light")}
							className="flex items-center justify-between"
						>
							<div className="flex items-center gap-2">
								<Sun className="size-4" />
								<span>Light</span>
							</div>
							{theme === "light" && <Check className="size-4 ml-2" />}
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setTheme("dark")}
							className="flex items-center justify-between"
						>
							<div className="flex items-center gap-2">
								<Moon className="size-4" />
								<span>Dark</span>
							</div>
							{theme === "dark" && <Check className="size-4 ml-2" />}
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setTheme("system")}
							className="flex items-center justify-between"
						>
							<div className="flex items-center gap-2">
								<Laptop className="size-4" />
								<span>System</span>
							</div>
							{theme === "system" && <Check className="size-4 ml-2" />}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
