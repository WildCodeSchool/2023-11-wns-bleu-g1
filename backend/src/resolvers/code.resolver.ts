import {Arg, Mutation, Query} from "type-graphql";

import Code, {CodeInput} from "../entities/code";

export default class CodeResolver {

	// All codes Query
	@Query(() => [Code])
	async getCodes() {
		// SELECT * FROM Code;
		const codes = await Code.find({
			relations: { language: true, project: true },
		});

		return codes;
	}

	// find a code for a projectid
	@Query(() => [Code])
	async getCode(@Arg("project") project: string) {
		const code = await Code.find({
			where: { project: { id: project } },
			relations: { language: true, project: true },
		});

		return code;
	}

	// Create new code
	@Mutation(() => Code)
	async createCode(@Arg("data", { validate: true }) data: CodeInput) {
		const code = new Code();

		Object.assign(code, data);


		return await code.save();
	}

	// update code content
	@Mutation(() => Code)
	async updateCode(
		@Arg("id") id: string,
		@Arg("content", { nullable: true }) content: string
	) {
		const code = await Code.findOne({where: {id}});
		if (!code) {
			throw new Error("Code not found!");
		}
		if (content != null) code.content = content;
		return await code.save();
	}
}
