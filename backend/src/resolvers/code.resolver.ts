import { Arg, Authorized, Mutation, Query } from "type-graphql";

import CodeService from "../services/code.service";
import Code, { CodeInput } from "../entities/code";
import { UserRole } from "../entities/user";

export default class CodeResolver {
	// All codes Query
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => [Code])
	async getCodes() {
		return await new CodeService().getAll({
			relations: { language: true, project: true },
		});
	}

	// find a code for a projectId
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => [Code])
	async getCode(@Arg("project") project: string) {
		return await new CodeService().getAll({
			where: { project: { id: project } },
			relations: { language: true, project: true },
		});
	}

	// Create new code
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Code)
	async createCode(@Arg("data", { validate: true }) data: CodeInput) {
		return await new CodeService().create(data);
	}

	// update code content
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Mutation(() => Code)
	async updateCode(
		@Arg("id") id: string,
		@Arg("content", { nullable: true }) content: string
	) {
		return await new CodeService().update(id, content);
	}
}
