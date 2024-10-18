import { Arg, Authorized, Mutation, Query } from "type-graphql";

import CodeService from "../services/code.service";
import Code, { CodeInput } from "../entities/code";
import { UserRole } from "../entities/user";
import {
	addDescription,
	TypeRequestsEnum,
	TypeUserEnum,
} from "../script/documentationUses";

export default class CodeResolver {
	// All codes Query
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => [Code], {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns a list with all codes",
			[TypeUserEnum.admin, TypeUserEnum.visitor]
		),
	})
	async getCodes() {
		return await new CodeService().getAll({
			relations: { language: true, project: true },
		});
	}

	// find a code for a projectId
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => [Code], {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns a list with all codes for a project",
			[TypeUserEnum.admin, TypeUserEnum.visitor],
			["project: (string)"]
		),
	})
	async getCode(@Arg("project") project: string) {
		return await new CodeService().getAll({
			where: { project: { id: project } },
			relations: { language: true, project: true },
		});
	}

	// Create new code
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Code, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"creates a new code",
			[TypeUserEnum.visitor],
			["content: (string)", "language: (string)", "project: (string)"]
		),
	})
	async createCode(@Arg("data", { validate: true }) data: CodeInput) {
		return await new CodeService().create(data);
	}

	// update code content
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Code, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"updates a code",
			[TypeUserEnum.visitor, TypeUserEnum.admin],
			["id: (string)", "content: (string)"]
		),
	})
	async updateCode(
		@Arg("id") id: string,
		@Arg("content", { nullable: true }) content: string
	) {
		return await new CodeService().update(id, content);
	}
}
