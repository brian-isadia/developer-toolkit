import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "webtoolkit:recent-tools";
const MAX_RECENT = 5;

export function useRecentTools() {
	const [recent, setRecent] = useState<string[]>([]);

	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				setRecent(JSON.parse(stored) as string[]);
			}
		} catch {
			// Ignore
		}
	}, []);

	const addRecent = useCallback((path: string) => {
		setRecent((prev) => {
			const next = [path, ...prev.filter((p) => p !== path)].slice(
				0,
				MAX_RECENT,
			);
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
			} catch {
				// Ignore
			}
			return next;
		});
	}, []);

	return { recent, addRecent };
}
