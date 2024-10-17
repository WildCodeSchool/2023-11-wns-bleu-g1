import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";

import Language, {
	LanguageInput,
	UpdateLanguageInput,
} from "../entities/language";
import { UserRole } from "../entities/user";
import LanguageService from "../services/language.service";
import {
	addDescription,
	TypeRequestsEnum,
	TypeUserEnum,
} from "../script/documentationUses";

@Resolver(Language)
export default class LanguageResolver {
	// get all languages
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => [Language], {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns a list with all languages",
			[TypeUserEnum.admin, TypeUserEnum.visitor]
		),
	})
	async getLanguages() {
		return await new LanguageService().getAll();
	}

	// get language by id
	@Authorized([UserRole.VISITOR, UserRole.ADMIN])
	@Query(() => Language, {
		description: addDescription(
			TypeRequestsEnum.query,
			"returns a language by id",
			[TypeUserEnum.admin, TypeUserEnum.visitor],
			["id: (string)"]
		),
	})
	async getLanguage(@Arg("id") id: string) {
		return await new LanguageService().getby({ where: { id } });
	}

	// create a new language
	@Authorized([UserRole.ADMIN])
	@Mutation(() => Language, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"creates a new language",
			[TypeUserEnum.admin],
			["name: (string), version: (string)"]
		),
	})
	async createLanguage(@Arg("data", { validate: true }) data: LanguageInput) {
		return await new LanguageService().create(data);
	}

	// update a language
	@Authorized([UserRole.ADMIN])
	@Mutation(() => Language, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"updates a language",
			[TypeUserEnum.admin],
			["id: (string)", "name: (string)", "version: (string)"]
		),
	})
	async updateLanguage(
		@Arg("data", { validate: true }) data: UpdateLanguageInput
	) {
		return await new LanguageService().update(data);
	}

	// delete a language
	@Authorized([UserRole.ADMIN])
	@Mutation(() => Boolean, {
		description: addDescription(
			TypeRequestsEnum.mutation,
			"deletes a language",
			[TypeUserEnum.admin],
			["id: (string)"]
		),
	})
	async deleteLanguage(@Arg("id") id: string) {
		return await new LanguageService().delete(id);
	}
}
