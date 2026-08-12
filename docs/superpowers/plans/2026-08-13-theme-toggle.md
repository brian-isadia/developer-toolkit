# Light/Dark Theme Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a 3-way theme toggle (`light`, `dark`, `system`) with SSR anti-FOUC support, top navigation header bar, and command palette integration.

**Architecture:** Split `styles.css` OKLCH color tokens into `:root` (light) and `.dark` blocks. Add `ThemeProvider` context to manage reactive theme switching and sync with `localStorage` and `prefers-color-scheme`. Inject an inline anti-FOUC script into `<head>` in `__root.tsx`. Add a `Header` component with a `ThemeToggle` dropdown and integrate theme commands into `CommandPalette`.

**Tech Stack:** TanStack Start (SSR), React 19, Tailwind CSS v4, Lucide React, Vitest, Biome, Bun.

## Global Constraints

- Every shell command MUST be prefixed with `rtk`.
- All module imports use `#/*` path alias convention.
- Code style must pass `bun --bun run check` (Biome lint + format).
- Must maintain working production build (`bun --bun run build`) and test suite (`bun --bun run test`).

---

### Task 1: CSS Variables Refactor (`src/styles.css`)

**Files:**
- Modify: `src/styles.css`

**Interfaces:**
- Produces: `:root` light CSS variables and `.dark` dark CSS variables for Tailwind v4 theme mapping.

- [ ] **Step 1: Update `src/styles.css` with light and dark variable definitions**

Edit `src/styles.css`:
```css
@import url("https://fonts.googleapis.com/css2?family=Geist:ital,wght@0,500;1,500&family=Poppins:wght@400;500;600;700;800&display=swap");
@import "tailwindcss";
@plugin '@tailwindcss/typography';

@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
	--background: oklch(0.99 0.002 285);
	--foreground: oklch(0.14 0.005 285);
	--card: oklch(0.97 0.002 285);
	--card-foreground: oklch(0.14 0.005 285);
	--popover: oklch(0.99 0.002 285);
	--popover-foreground: oklch(0.14 0.005 285);
	--primary: oklch(0.55 0.18 260);
	--primary-foreground: oklch(0.99 0 0);
	--secondary: oklch(0.94 0.005 285);
	--secondary-foreground: oklch(0.2 0.01 285);
	--muted: oklch(0.94 0.005 285);
	--muted-foreground: oklch(0.45 0.01 285);
	--accent: oklch(0.92 0.01 285);
	--accent-foreground: oklch(0.14 0.005 285);
	--destructive: oklch(0.57 0.22 27);
	--destructive-foreground: oklch(0.99 0 0);
	--border: oklch(0.88 0.005 285);
	--input: oklch(0.88 0.005 285);
	--ring: oklch(0.55 0.18 260);
	
	--radius: 0.625rem;
}

.dark {
	--background: oklch(0.14 0.005 285);
	--foreground: oklch(0.985 0 0);
	--card: oklch(0.17 0.005 285);
	--card-foreground: oklch(0.985 0 0);
	--popover: oklch(0.17 0.005 285);
	--popover-foreground: oklch(0.985 0 0);
	--primary: oklch(0.7 0.15 260);
	--primary-foreground: oklch(0.1 0 0);
	--secondary: oklch(0.22 0.01 285);
	--secondary-foreground: oklch(0.985 0 0);
	--muted: oklch(0.22 0.01 285);
	--muted-foreground: oklch(0.7 0.01 285);
	--accent: oklch(0.25 0.02 285);
	--accent-foreground: oklch(0.985 0 0);
	--destructive: oklch(0.5 0.2 25);
	--destructive-foreground: oklch(0.985 0 0);
	--border: oklch(0.25 0.01 285);
	--input: oklch(0.25 0.01 285);
	--ring: oklch(0.7 0.15 260);
}
```

- [ ] **Step 2: Check formatting and linting**

Run: `rtk bun --bun run format`
Expected: Formatting completed clean.

- [ ] **Step 3: Commit Task 1**

```bash
rtk git add src/styles.css
rtk git commit -m "feat(styles): define light and dark theme OKLCH variables"
```

---

### Task 2: Theme Context Provider & Anti-FOUC Script

**Files:**
- Create: `src/components/theme-provider.tsx`
- Modify: `src/routes/__root.tsx`
- Test: `src/components/__tests__/theme-provider.test.tsx`

**Interfaces:**
- Produces: `ThemeProvider`, `useTheme()`, `Theme` type (`"light" | "dark" | "system"`).

- [ ] **Step 1: Write failing unit test for `ThemeProvider`**

Create `src/components/__tests__/theme-provider.test.tsx`:
```tsx
import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { ThemeProvider, useTheme } from "#/components/theme-provider";
import type { ReactNode } from "react";

describe("ThemeProvider", () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.classList.remove("dark");
	});

	it("defaults to system theme and provides theme state", () => {
		const wrapper = ({ children }: { children: ReactNode }) => (
			<ThemeProvider>{children}</ThemeProvider>
		);
		const { result } = renderHook(() => useTheme(), { wrapper });

		expect(result.current.theme).toBe("system");
	});

	it("allows changing theme to dark and persists to localStorage", () => {
		const wrapper = ({ children }: { children: ReactNode }) => (
			<ThemeProvider>{children}</ThemeProvider>
		);
		const { result } = renderHook(() => useTheme(), { wrapper });

		act(() => {
			result.current.setTheme("dark");
		});

		expect(result.current.theme).toBe("dark");
		expect(localStorage.getItem("webtoolkit:theme")).toBe(JSON.stringify("dark"));
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `rtk bun --bun run test src/components/__tests__/theme-provider.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 3: Implement `ThemeProvider` and anti-FOUC script string**

Create `src/components/theme-provider.tsx`:
```tsx
import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

type ThemeProviderState = {
	theme: Theme;
	resolvedTheme: "light" | "dark";
	setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined);

const STORAGE_KEY = "webtoolkit:theme";

export const themeInitScript = `(function() {
	try {
		var stored = localStorage.getItem('${STORAGE_KEY}');
		var theme = stored ? JSON.parse(stored) : 'system';
		var isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	} catch (e) {}
})();`;

export function ThemeProvider({
	children,
	defaultTheme = "system",
}: {
	children: React.ReactNode;
	defaultTheme?: Theme;
}) {
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof window === "undefined") return defaultTheme;
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			return stored ? (JSON.parse(stored) as Theme) : defaultTheme;
		} catch {
			return defaultTheme;
		}
	});

	const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");

	useEffect(() => {
		const root = document.documentElement;

		const updateTheme = () => {
			const isDark =
				theme === "dark" ||
				(theme === "system" &&
					window.matchMedia("(prefers-color-scheme: dark)").matches);

			if (isDark) {
				root.classList.add("dark");
				setResolvedTheme("dark");
			} else {
				root.classList.remove("dark");
				setResolvedTheme("light");
			}
		};

		updateTheme();

		if (theme === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			const handleChange = () => updateTheme();
			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		}
	}, [theme]);

	const setTheme = (newTheme: Theme) => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(newTheme));
		} catch {
			// Ignore storage errors
		}
		setThemeState(newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
```

- [ ] **Step 4: Update `src/routes/__root.tsx` to wrap app and include `themeInitScript`**

Modify `src/routes/__root.tsx`:
```tsx
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { AppLayout } from "#/components/app-layout";
import { ThemeProvider, themeInitScript } from "#/components/theme-provider";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Developer Toolkit",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
				<HeadContent />
			</head>
			<body className="font-sans antialiased">
				<ThemeProvider>
					<AppLayout>{children}</AppLayout>
				</ThemeProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
```

- [ ] **Step 5: Run unit tests to verify pass**

Run: `rtk bun --bun run test`
Expected: PASS.

- [ ] **Step 6: Commit Task 2**

```bash
rtk git add src/components/theme-provider.tsx src/routes/__root.tsx src/components/__tests__/theme-provider.test.tsx
rtk git commit -m "feat(theme): add ThemeProvider context and anti-FOUC head script"
```

---

### Task 3: Header Component & Theme Toggle UI

**Files:**
- Create: `src/components/header.tsx`
- Modify: `src/components/app-layout.tsx`

**Interfaces:**
- Consumes: `useTheme` from `#/components/theme-provider`.
- Produces: `Header` component with search shortcut button and ThemeToggle dropdown.

- [ ] **Step 1: Create `src/components/header.tsx`**

```tsx
import { Laptop, Moon, Search, Sun, Check } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { useTheme } from "#/components/theme-provider";

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
						<DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Sun className="size-4" />
								<span>Light</span>
							</div>
							{theme === "light" && <Check className="size-4 ml-2" />}
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Moon className="size-4" />
								<span>Dark</span>
							</div>
							{theme === "dark" && <Check className="size-4 ml-2" />}
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center justify-between">
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
```

- [ ] **Step 2: Integrate `Header` into `src/components/app-layout.tsx`**

Modify `src/components/app-layout.tsx`:
```tsx
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
```

- [ ] **Step 3: Check format and lint**

Run: `rtk bun --bun run check`
Expected: Clean check.

- [ ] **Step 4: Commit Task 3**

```bash
rtk git add src/components/header.tsx src/components/app-layout.tsx
rtk git commit -m "feat(ui): add top header bar with theme toggle dropdown"
```

---

### Task 4: Command Palette Theme Integration

**Files:**
- Modify: `src/components/command-palette.tsx`

**Interfaces:**
- Consumes: `useTheme` from `#/components/theme-provider`.

- [ ] **Step 1: Add Theme command group to `CommandPalette`**

Update `src/components/command-palette.tsx` to include `useTheme` and add theme options (Set Light Theme, Set Dark Theme, Set System Theme) under a "Theme" group when searching or browsing.

Modify `src/components/command-palette.tsx`:
```tsx
import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { Laptop, Moon, Search, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "#/components/ui/dialog";
import { useRecentTools } from "#/hooks/use-recent-tools";
import { useTheme } from "#/components/theme-provider";
import { findToolByPath, toolGroups } from "#/lib/tool-registry";

export function CommandPalette() {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const navigate = useNavigate();
	const { recent, addRecent } = useRecentTools();
	const { setTheme } = useTheme();

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

	const changeTheme = (theme: "light" | "dark" | "system") => {
		setTheme(theme);
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
							placeholder="Search tools... (e.g. 'color', 'theme', 'json')"
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
```

- [ ] **Step 2: Commit Task 4**

```bash
rtk git add src/components/command-palette.tsx
rtk git commit -m "feat(command-palette): add theme switching commands to command palette"
```

---

### Task 5: Complete Suite Verification & Build Check

**Files:** None (Execution & Verification)

- [ ] **Step 1: Run Vitest unit tests**

Run: `rtk bun --bun run test`
Expected: All tests pass cleanly.

- [ ] **Step 2: Run Biome lint & format check**

Run: `rtk bun --bun run check`
Expected: 0 errors / 0 warnings.

- [ ] **Step 3: Run production build**

Run: `rtk bun --bun run build`
Expected: Build succeeds with 0 errors.
