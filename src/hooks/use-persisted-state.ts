import { useCallback, useEffect, useState } from "react";

export function usePersistedState<T>(
	key: string,
	defaultValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
	const prefixedKey = `webtoolkit:${key}`;

	const [state, setState] = useState<T>(defaultValue);

	useEffect(() => {
		try {
			const stored = localStorage.getItem(prefixedKey);
			if (stored !== null) {
				setState(JSON.parse(stored) as T);
			}
		} catch {
			// Ignore parse errors, use default
		}
	}, [prefixedKey]);

	const setPersistedState = useCallback(
		(value: T | ((prev: T) => T)) => {
			setState((prev) => {
				const next = value instanceof Function ? value(prev) : value;
				try {
					localStorage.setItem(prefixedKey, JSON.stringify(next));
				} catch {
					// Ignore storage errors (quota exceeded, etc.)
				}
				return next;
			});
		},
		[prefixedKey],
	);

	return [state, setPersistedState];
}
