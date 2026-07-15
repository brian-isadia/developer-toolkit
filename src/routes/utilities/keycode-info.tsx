import { createFileRoute } from "@tanstack/react-router";
import { Keyboard } from "lucide-react";
import { useEffect, useState } from "react";
import { ToolPageLayout } from "#/components/tool-page-layout";

export const Route = createFileRoute("/utilities/keycode-info")({
	component: KeycodeInfo,
});

function KeycodeInfo() {
	const [event, setEvent] = useState<KeyboardEvent | null>(null);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			e.preventDefault(); // Prevent scrolling for space/arrows
			setEvent(e);
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<ToolPageLayout>
			<div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[500px]">
				{!event ? (
					<div className="text-center space-y-6 opacity-50 animate-pulse">
						<Keyboard className="size-24 mx-auto" />
						<h2 className="text-3xl font-bold tracking-tight">Press any key</h2>
					</div>
				) : (
					<div className="w-full space-y-12 animate-in fade-in zoom-in duration-300">
						<div className="text-center">
							<div className="text-[12rem] font-black text-primary leading-none tracking-tighter drop-shadow-2xl">
								{event.keyCode}
							</div>
							<div className="text-2xl font-medium text-muted-foreground mt-4">
								{event.key === " " ? "Space" : event.key}
							</div>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="bg-card border border-border rounded-xl p-4 text-center space-y-2">
								<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									event.key
								</div>
								<div className="font-mono text-xl">
									{event.key === " " ? "Space" : event.key}
								</div>
							</div>
							<div className="bg-card border border-border rounded-xl p-4 text-center space-y-2">
								<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									event.code
								</div>
								<div className="font-mono text-xl">{event.code}</div>
							</div>
							<div className="bg-card border border-border rounded-xl p-4 text-center space-y-2">
								<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									event.which
								</div>
								<div className="font-mono text-xl">{event.which}</div>
							</div>
							<div className="bg-card border border-border rounded-xl p-4 text-center space-y-2">
								<div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									Modifiers
								</div>
								<div className="font-mono text-xl flex justify-center gap-2">
									{event.ctrlKey && (
										<span className="bg-primary/20 text-primary px-2 rounded">
											Ctrl
										</span>
									)}
									{event.shiftKey && (
										<span className="bg-primary/20 text-primary px-2 rounded">
											Shift
										</span>
									)}
									{event.altKey && (
										<span className="bg-primary/20 text-primary px-2 rounded">
											Alt
										</span>
									)}
									{event.metaKey && (
										<span className="bg-primary/20 text-primary px-2 rounded">
											Meta
										</span>
									)}
									{!event.ctrlKey &&
										!event.shiftKey &&
										!event.altKey &&
										!event.metaKey && (
											<span className="text-muted-foreground">None</span>
										)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</ToolPageLayout>
	);
}
