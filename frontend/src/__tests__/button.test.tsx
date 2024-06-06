import { describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import { MockedProvider } from "@apollo/client/testing";
import mockRouter from "next-router-mock";

describe("button", () => {
	it("renders correctly", () => {
			const view = render(
			<Button onClick={() => alert("Bon toutou")}>Click Me !</Button>
		);
		expect(view.baseElement).toMatchSnapshot();
	});
});
