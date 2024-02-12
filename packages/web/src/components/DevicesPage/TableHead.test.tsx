import { render, screen } from "@testing-library/react";
import TableMenu from "./TableMenu";
import { expect, test } from "vitest";

// todo: separate the test scenarios via describe & it
test("renders proper menu controls for table", () => {
	render(
		<TableMenu
			limit={10}
			count={10}
			skip={20}
			totalCount={50}
			setSize={(size) => {
				// ignore
			}}
			sizes={[5, 10, 15]}
			navigate={() => {
				//ignore
			}}
			onClickAdd={() => {
				//ignore
			}}
		/>
	);
	const pageDescriptor = screen.getByTestId("pageDescriptor");
	// because if we're skipping 20, and limiting 10, and total is 50, we must be on page 3 (31-40) of total 5 pages
	expect(pageDescriptor.textContent).toBe("3 of 5");
});
