import { Check, Copy } from "lucide-react";
import { Button } from "#/components/ui/button";
import { useCopyToClipboard } from "#/hooks/use-copy-to-clipboard";

export function CopyButton({
	text,
	className,
}: {
	text: string;
	className?: string;
}) {
	const { copy, copied } = useCopyToClipboard();

	return (
		<Button
			variant="ghost"
			size="icon"
			className={`size-7 ${className ?? ""}`}
			onClick={() => copy(text)}
		>
			{copied ? (
				<Check className="size-3.5 text-green-400" />
			) : (
				<Copy className="size-3.5" />
			)}
		</Button>
	);
}
