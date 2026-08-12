import { CopyButton } from "#/components/copy-button";

export function CodeOutput({
	code,
	language = "css",
	label,
}: {
	code: string;
	language?: string;
	label?: string;
}) {
	return (
		<div className="relative group rounded-lg border border-border bg-muted/50 overflow-hidden">
			{label && (
				<div className="flex items-center justify-between px-4 py-2 border-b border-border">
					<span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
						{label}
					</span>
					<CopyButton text={code} />
				</div>
			)}
			<pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-foreground">
				<code>{code}</code>
			</pre>
			{!label && (
				<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
					<CopyButton text={code} />
				</div>
			)}
		</div>
	);
}
