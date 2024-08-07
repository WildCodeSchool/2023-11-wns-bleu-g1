import mockRouter from "next-router-mock";
import {
	fireEvent,
	queryByTestId,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import {
	getExecutionCountMock,
	getNotExecutionCountMock,
	getPremiumExecutionMock,
	getPremiumProfileMock,
	getVisitorProfileMock,
} from "./executionCode.mock";
import CodingPage from "@/pages/coding/codingPage";

describe("what increment count for code execution work", () => {
	mockRouter.push("/coding/codingPage");

	const renderExecutionCounter = (mocks: any[]) => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CodingPage />
			</MockedProvider>
		);
	};

	it("render if user can execute some code and increment executionCode on click", async () => {
		renderExecutionCounter(getExecutionCountMock);

		const btn = await screen.findByTestId("exec-btn");

		expect(btn).toBeInTheDocument();
		expect(screen.getByTestId("counter")).toHaveTextContent("1/10");
		expect(screen.getByTestId("not-premium")).toHaveTextContent(
			"Pour ne plus avoir de limites, passer premium!"
		);

		fireEvent.click(btn);

		await waitFor(() => {
			expect(screen.getByTestId("counter")).toHaveTextContent("2/10");
		});
	});

	it("render if user can't execute some code for today", async () => {
		renderExecutionCounter([getNotExecutionCountMock, getVisitorProfileMock]);

		expect(await screen.findByText("10/10"));
		expect(screen.queryByText(/.*Exécuter.*/)).not.toBeInTheDocument();
		expect(screen.queryByTestId("not-premium")).toHaveTextContent(
			"Vous avez atteint la limite de 10 exécutions. Pour ne plus avoir de limites, passer premium!"
		);
	});

	it("render if user is premium (have no execution limit)", async () => {
		renderExecutionCounter([getPremiumExecutionMock, getPremiumProfileMock]);

		expect(await screen.findByTestId("exec-btn")).toBeInTheDocument();
		expect(screen.queryByTestId("not-premium")).not.toBeInTheDocument();
	});
});
