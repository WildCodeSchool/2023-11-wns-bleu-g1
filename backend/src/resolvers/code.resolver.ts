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

	// Create new code
	@Mutation(() => Code)
	async createCode(@Arg("data", { validate: true }) data: CodeInput) {
		const code = new Code();

		Object.assign(code, data);


		return await code.save();
	}
}
