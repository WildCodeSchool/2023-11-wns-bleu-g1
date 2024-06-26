import { Query } from "type-graphql";

import Code from "../entities/code";

export default class CodeResolver {
	@Query(() => [Code])
	async getCodes() {
		// SELECT * FROM Code;
		const codes = await Code.find({
			relations: { language: true, project: true },
		});

		return codes;
	}
}
