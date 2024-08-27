import { Query } from "type-graphql";

import Code from "../entities/code";
import CodeService from "../services/code.service";

export default class CodeResolver {
	@Query(() => [Code])
	async getCodes() {
		const codes = await CodeService.getAll({ language: true, project: true });

		return codes;
	}
}
