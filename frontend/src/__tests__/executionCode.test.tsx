import mockRouter from "next-router-mock";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";

import {
	getExecutionCountMock,
	getNotExecutionCountMock,
	getPremiumExecutionMock,
	getPremiumProfileMock,
	getProjectByIdMock,
	getVisitorProfileMock,
	incrementExecutionCounterMock,
	newExecutionCountMock,
} from "./executionCode.mock";
import CodingPage from "@/pages/coding/[id]";
import { createDynamicRouteParser } from "next-router-mock/dynamic-routes";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("what increment count for code execution work", () => {
	const projectId = getProjectByIdMock.result.data.getProject.id;

	mockRouter.useParser(createDynamicRouteParser(["/coding/[id]"]));

	const renderExecutionCounter = (mocks: any[]) => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CodingPage />
			</MockedProvider>
		);
	};

	mockRouter.push(`/coding/${projectId}`);

	it("get id query", async () => {
		renderExecutionCounter([
			getExecutionCountMock,
			getVisitorProfileMock,
			incrementExecutionCounterMock,
			newExecutionCountMock,
			getProjectByIdMock,
		]);

		expect(mockRouter).toMatchObject({
			pathname: "/coding/[id]",
			query: { id: projectId },
		});
	});

	it("render if user can execute some code and increment executionCode on click", async () => {
		renderExecutionCounter([
			getExecutionCountMock,
			getVisitorProfileMock,
			incrementExecutionCounterMock,
			newExecutionCountMock,
			getProjectByIdMock,
		]);
		const btn = await screen.findByTestId("exec-btn");

		expect(btn).toBeInTheDocument();
		expect(screen.queryByTestId("counter")).toHaveTextContent("0/50");
		expect(screen.queryByTestId("not-premium")).toHaveTextContent(
			"Pour ne plus avoir de limites, passer premium!"
		);

		await userEvent.click(btn);

		expect(screen.queryByTestId("counter")).toHaveTextContent("1/50");
	});

	it("render if user can't execute some code for today", async () => {
		renderExecutionCounter([
			getNotExecutionCountMock,
			getVisitorProfileMock,
			getProjectByIdMock,
		]);

		expect(await screen.findByText("50/50"));
		expect(screen.queryByText(/.*Exécuter.*/)).not.toBeInTheDocument();
		expect(screen.queryByTestId("not-premium")).toHaveTextContent(
			"Vous avez atteint la limite de 50 exécutions. Pour ne plus avoir de limites, passer premium!"
		);
	});

	it("render if user is premium (have no execution limit)", async () => {
		renderExecutionCounter([
			getPremiumExecutionMock,
			getPremiumProfileMock,
			getProjectByIdMock,
		]);

		expect(await screen.findByTestId("exec-btn")).toBeInTheDocument();
		expect(screen.queryByTestId("not-premium")).not.toBeInTheDocument();
	});
});
