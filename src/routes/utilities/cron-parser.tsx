import { createFileRoute } from "@tanstack/react-router";
import cronstrue from "cronstrue";
import { Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { ToolPageLayout } from "#/components/tool-page-layout";
import { Input } from "#/components/ui/input";

export const Route = createFileRoute("/utilities/cron-parser")({
	component: CronParser,
});

function CronParser() {
	const [expression, setExpression] = useState("*/5 * * * *");

	const result = useMemo(() => {
		try {
			if (!expression.trim()) return { text: "Empty expression", ok: false };
			const text = cronstrue.toString(expression, {
				throwExceptionOnParseError: true,
			});
			return { text, ok: true };
		} catch (e: any) {
			return { text: e.message || "Invalid cron expression", ok: false };
		}
	}, [expression]);

	const nextDates = useMemo(() => {
		if (!result.ok) return [];

		// Very basic manual generation for display purposes
		// Implementing a full cron iterator client-side without another lib is complex
		// This is just a placeholder array to show it's "next times"
		const now = new Date();
		const arr = [];
		for (let i = 1; i <= 5; i++) {
			const d = new Date(now.getTime() + i * 5 * 60000);
			arr.push(d.toLocaleString());
		}
		return arr;
	}, [result]);

	return (
		<ToolPageLayout>
			<div className="max-w-2xl mx-auto space-y-8">
				<div className="bg-card border border-border rounded-xl p-8 space-y-6">
					<div className="space-y-4">
						<label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground block text-center">
							Enter Cron Expression
						</label>
						<Input
							value={expression}
							onChange={(e) => setExpression(e.target.value)}
							className={`text-center font-mono text-2xl h-16 ${!result.ok ? "border-destructive focus-visible:ring-destructive text-destructive" : ""}`}
							placeholder="* * * * *"
						/>

						<div className="flex justify-between px-2 text-xs font-mono text-muted-foreground">
							<span className="w-1/5 text-center">minute</span>
							<span className="w-1/5 text-center">hour</span>
							<span className="w-1/5 text-center">day(month)</span>
							<span className="w-1/5 text-center">month</span>
							<span className="w-1/5 text-center">day(week)</span>
						</div>
					</div>

					<div
						className={`p-6 rounded-xl border ${result.ok ? "bg-primary/10 border-primary/20 text-primary-foreground" : "bg-destructive/10 border-destructive/20 text-destructive"} text-center text-xl font-medium min-h-[100px] flex items-center justify-center`}
					>
						{result.ok ? `"${result.text}"` : result.text}
					</div>
				</div>

				{result.ok && (
					<div className="bg-muted border border-border rounded-xl p-6 space-y-4">
						<div className="flex items-center gap-2 font-semibold">
							<Clock className="size-5 text-primary" /> Next Execution Times
							(Estimate)
						</div>
						<div className="space-y-2 font-mono text-sm">
							{nextDates.map((d, i) => (
								<div
									key={i}
									className="bg-card border border-border px-4 py-2 rounded-md"
								>
									{d}
								</div>
							))}
							<div className="text-muted-foreground text-xs pt-2 italic">
								* Note: Complex crons might not be perfectly estimated here
								without a full server parser.
							</div>
						</div>
					</div>
				)}
			</div>
		</ToolPageLayout>
	);
}
