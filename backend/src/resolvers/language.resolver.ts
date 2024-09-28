import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";

import Language, {
	LanguageInput,
	UpdateLanguageInput,
} from "../entities/language";
import { UserRole } from "../entities/user";
import LanguageService from "../services/language.service";

@Resolver(Language)
export default class LanguageResolver {
	// get all languages
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => [Language])
	async getLanguages() {
		return await new LanguageService().getAll();
	}

	// get language by id
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => Language)
	async getLanguage(@Arg("id") id: string) {
		return await new LanguageService().getby({ where: { id } });
	}

	// create a new language
	@Authorized([UserRole.ADMIN])
	@Mutation(() => Language)
	async createLanguage(@Arg("data", { validate: true }) data: LanguageInput) {
		return await new LanguageService().create(data.name);
	}

	// update a language
	@Authorized([UserRole.ADMIN])
	@Mutation(() => Language)
	async updateLanguage(
		@Arg("data", { validate: true }) data: UpdateLanguageInput
	) {
		const { id, name } = data;

		return await new LanguageService().update(id, name);
	}

	// delete a language
	@Authorized([UserRole.ADMIN])
	@Mutation(() => Boolean)
	async deleteLanguage(@Arg("id") id: string) {
		return await new LanguageService().delete(id);
	}
}
