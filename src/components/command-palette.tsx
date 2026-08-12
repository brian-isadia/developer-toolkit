import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { Laptop, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "#/components/theme-provider";
import { Dialog, DialogContent, DialogTitle } from "#/components/ui/dialog";
import { useRecentTools } from "#/hooks/use-recent-tools";
import { findToolByPath, toolGroups } from "#/lib/tool-registry";

export function CommandPalette() {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const navigate = useNavigate();
	const { recent, addRecent } = useRecentTools();
	const { setTheme } = useTheme();

	const changeTheme = (theme: "light" | "dark" | "system") => {
		setTheme(theme);
		setOpen(false);
		setSearch("");
	};

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const runCommand = (path: string) => {
		addRecent(path);
		navigate({ to: path });
		setOpen(false);
		setSearch("");
	};

	const recentTools = recent
		.map((path) => findToolByPath(path))
		.filter((t): t is NonNullable<typeof t> => t !== undefined);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="p-0 overflow-hidden shadow-2xl bg-card border-border sm:max-w-[600px] top-[20%] translate-y-0">
				<DialogTitle className="sr-only">Command Palette</DialogTitle>
				<Command
					shouldFilter={false}
					className="flex h-full w-full flex-col overflow-hidden bg-transparent"
				>
					<div className="flex items-center border-b border-border px-4 py-3">
						<Search className="mr-2 size-5 shrink-0 text-muted-foreground" />
						<Command.Input
							autoFocus
							value={search}
							onValueChange={setSearch}
							placeholder="Search tools... (e.g. 'color', 'json', 'base64')"
							className="flex h-11 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
						/>
						<kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded border border-border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground">
							<span className="text-xs">esc</span>
						</kbd>
					</div>

					<Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
						<Command.Empty className="py-6 text-center text-sm text-muted-foreground">
							No tools found.
						</Command.Empty>

						{search === "" && recentTools.length > 0 && (
							<Command.Group
								heading="Recent"
								className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
							>
								{recentTools.map((tool) => (
									<Command.Item
										key={`recent-${tool.slug}`}
										value={tool.name}
										onSelect={() => runCommand(tool.path)}
										className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
									>
										<tool.icon className="mr-2 size-4" />
										<span>{tool.name}</span>
									</Command.Item>
								))}
							</Command.Group>
						)}

						{("theme".includes(search.toLowerCase()) ||
							"light".includes(search.toLowerCase()) ||
							"dark".includes(search.toLowerCase()) ||
							"system".includes(search.toLowerCase()) ||
							search === "") && (
							<Command.Group
								heading="Theme"
								className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
							>
								<Command.Item
									value="theme-light"
									onSelect={() => changeTheme("light")}
									className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
								>
									<Sun className="mr-2 size-4 text-muted-foreground" />
									<span>Use Light Theme</span>
								</Command.Item>
								<Command.Item
									value="theme-dark"
									onSelect={() => changeTheme("dark")}
									className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
								>
									<Moon className="mr-2 size-4 text-muted-foreground" />
									<span>Use Dark Theme</span>
								</Command.Item>
								<Command.Item
									value="theme-system"
									onSelect={() => changeTheme("system")}
									className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground"
								>
									<Laptop className="mr-2 size-4 text-muted-foreground" />
									<span>Use System Theme</span>
								</Command.Item>
							</Command.Group>
						)}

						{toolGroups.map((group) => {
							const groupTools = group.tools.filter(
								(tool) =>
									tool.name.toLowerCase().includes(search.toLowerCase()) ||
									tool.description
										.toLowerCase()
										.includes(search.toLowerCase()) ||
									tool.keywords.some((kw) => kw.includes(search.toLowerCase())),
							);

							if (groupTools.length === 0) return null;

							return (
								<Command.Group
									key={group.id}
									heading={group.label}
									className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
								>
									{groupTools.map((tool) => (
										<Command.Item
											key={tool.slug}
											value={tool.name}
											onSelect={() => runCommand(tool.path)}
											className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
										>
											<tool.icon className="mr-2 size-4" />
											<div className="flex flex-col">
												<span>{tool.name}</span>
												{search !== "" && (
													<span className="text-xs text-muted-foreground/70">
														{tool.description}
													</span>
												)}
											</div>
										</Command.Item>
									))}
								</Command.Group>
							);
						})}
					</Command.List>
				</Command>
			</DialogContent>
		</Dialog>
	);
}
