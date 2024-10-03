import mockRouter from "next-router-mock";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import {
	getCanNotClickProfileMock,
	getExecutionCountMock,
	getNotExecutionCountMock,
	getPremiumExecutionMock,
	getPremiumProfileMock,
	getPrivateProjectByIdMock,
	getProjectByIdMock,
	getVisitorProfileMock,
	incrementExecutionCounterMock,
	newExecutionCountMock,
} from "./codeEditor.mock";
import CodingPage from "@/pages/coding/[id]";

describe("what increment count for code execution work", () => {
	mockRouter.push(
		"/coding/3771abdc-4873-48f0-af1f-d6c7bc985529?id=3771abdc-4873-48f0-af1f-d6c7bc985529"
	);

	const renderExecutionCounter = (mocks: any[]) => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CodingPage />
			</MockedProvider>
		);
	};

	it("render if user can execute some code", async () => {
		renderExecutionCounter([
			getVisitorProfileMock,
			getProjectByIdMock,
			getExecutionCountMock,
			incrementExecutionCounterMock,
			newExecutionCountMock,
		]);

		const btn = await screen.findByTestId("exec-btn");

		/* @ts-ignore */
		expect(btn).toBeInTheDocument();
		// @ts-ignore
		expect(btn).toHaveTextContent("Executer (0/50)");
	});

	it("render if user can't execute some code for today", async () => {
		renderExecutionCounter([
			getCanNotClickProfileMock,
			getProjectByIdMock,
			getNotExecutionCountMock,
		]);

		const btn = await screen.findByTestId("exec-btn");

		// @ts-ignore
		expect(btn).not.toBeInTheDocument();
	});

	it("render if user is premium (have no execution limit)", async () => {
		renderExecutionCounter([
			getPremiumProfileMock,
			getProjectByIdMock,
			getPremiumExecutionMock,
		]);

		const btn = await screen.findByTestId("exec-btn");

		// @ts-ignore
		expect(btn).toBeInTheDocument();
		// @ts-ignore
		expect(btn).toHaveTextContent("Executer");
	});
});

describe("How is the rendering if you are the owner of the project or not", () => {
	mockRouter.push(
		"/coding/3771abdc-4873-48f0-af1f-d6c7bc985529?id=3771abdc-4873-48f0-af1f-d6c7bc985529"
	);

	const testRendering = (mocks: any[]) => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<CodingPage />
			</MockedProvider>
		);
	};

	it("render if the user is the owner of the project & project is public", async () => {
		testRendering([
			getVisitorProfileMock,
			getProjectByIdMock,
			getExecutionCountMock,
		]);

		const save = await screen.findByTestId("save-btn");
		const isPublicBtn = await screen.findByTestId("public-state-btn");
		const isPublicLabel = await screen.findByTestId("public-state-label");

		/* @ts-ignore */
		expect(save).toBeInTheDocument();
		/* @ts-ignore */
		expect(isPublicBtn).toBeInTheDocument();
		/* @ts-ignore */
		expect(isPublicLabel).toBeInTheDocument();
		/* @ts-ignore */
		expect(isPublicLabel).toHaveTextContent("Public");
	});

	it("render if the user is the owner of the project & project is private", async () => {
		testRendering([
			getVisitorProfileMock,
			getPrivateProjectByIdMock,
			getExecutionCountMock,
		]);

		const save = await screen.findByTestId("save-btn");
		const isPublicBtn = await screen.findByTestId("public-state-btn");
		const isPublicLabel = await screen.findByTestId("public-state-label");

		/* @ts-ignore */
		expect(save).toBeInTheDocument();
		/* @ts-ignore */
		expect(isPublicBtn).toBeInTheDocument();
		/* @ts-ignore */
		expect(isPublicLabel).toBeInTheDocument();
		/* @ts-ignore */
		expect(isPublicLabel).toHaveTextContent("Privé");
	});

	it("render if the user is not the owner of the project", async () => {
		testRendering([
			getPremiumProfileMock,
			getProjectByIdMock,
			getExecutionCountMock,
		]);

		const save = screen.queryByTestId("save-btn");
		const isPublicBtn = screen.queryByTestId("public-state-btn");
		const isPublicLabel = screen.queryByTestId("public-state-label");

		/* @ts-ignore */
		expect(save).not.toBeInTheDocument();
		/* @ts-ignore */
		expect(isPublicBtn).not.toBeInTheDocument();
		/* @ts-ignore */
		expect(isPublicLabel).not.toBeInTheDocument();
	});
});
