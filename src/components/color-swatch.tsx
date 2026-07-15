import { cn } from "#/lib/utils";

export function ColorSwatch({
	color,
	className,
	size = "md",
}: {
	color: string;
	className?: string;
	size?: "sm" | "md" | "lg";
}) {
	const sizeClasses = {
		sm: "size-6 rounded",
		md: "size-10 rounded-md",
		lg: "size-16 rounded-lg",
	};

	return (
		<div
			className={cn(
				sizeClasses[size],
				"border border-border shadow-sm ring-1 ring-white/5",
				className,
			)}
			style={{ backgroundColor: color }}
		/>
	);
}
