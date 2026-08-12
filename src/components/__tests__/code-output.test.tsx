// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CodeOutput } from "#/components/code-output";

describe("CodeOutput", () => {
	it("renders code block with semantic theme background class bg-muted/50", () => {
		const { container } = render(
			<CodeOutput code="const x = 1;" label="TypeScript" />,
		);

		const wrapperDiv = container.firstChild as HTMLElement;
		expect(wrapperDiv.className).toContain("bg-muted/50");
		expect(wrapperDiv.className).not.toContain("oklch");
		expect(screen.getByText("TypeScript")).not.toBeNull();
		expect(screen.getByText("const x = 1;")).not.toBeNull();
	});
});
