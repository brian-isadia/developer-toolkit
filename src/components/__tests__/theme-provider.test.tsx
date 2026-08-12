// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider, useTheme } from "#/components/theme-provider";

describe("ThemeProvider", () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.classList.remove("dark");
		Object.defineProperty(window, "matchMedia", {
			writable: true,
			value: (query: string) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: () => {},
				removeListener: () => {},
				addEventListener: () => {},
				removeEventListener: () => {},
				dispatchEvent: () => false,
			}),
		});
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
		expect(localStorage.getItem("webtoolkit:theme")).toBe(
			JSON.stringify("dark"),
		);
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});
});
