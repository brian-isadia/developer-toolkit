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
					typeof window !== "undefined" &&
					window.matchMedia &&
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

		if (
			theme === "system" &&
			typeof window !== "undefined" &&
			window.matchMedia
		) {
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
