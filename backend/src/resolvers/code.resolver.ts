import { Arg, Authorized, Mutation, Query } from "type-graphql";

import Code, { CodeInput } from "../entities/code";
import { UserRole } from "../entities/user";

export default class CodeResolver {
	// All codes Query
	@Query(() => [Code])
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	async getCodes() {
		const codes = await Code.find({
			relations: { language: true, project: true },
		});

		return codes;
	}

	// find a code for a projectId
	@Query(() => [Code])
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	async getCode(@Arg("project") project: string) {
		const code = await Code.find({
			where: { project: { id: project } },
			relations: { language: true, project: true },
		});

		return code;
	}

	// Create new code
	@Mutation(() => Code)
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	async createCode(@Arg("data", { validate: true }) data: CodeInput) {
		const code = new Code();

		Object.assign(code, data);

		return await code.save();
	}

	// update code content
	@Mutation(() => Code)
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	async updateCode(
		@Arg("id") id: string,
		@Arg("content", { nullable: true }) content: string
	) {
		const code = await Code.findOneOrFail({ where: { id } });
		if (content != null) code.content = content;
		return await code.save();
	}
}
