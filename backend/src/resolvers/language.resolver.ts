import {Arg, Authorized, Mutation, Query, Resolver} from "type-graphql";

import Language from "../entities/language";

import DataSource from "../db";
import {UserRole} from "../entities/user";
import {GraphQLError} from "graphql";

@Resolver(Language)

export default class LanguageResolver {
    languageRepository = DataSource.getRepository(Language);

    constructor() {}

    // get all languages
    @Query(() => [Language])
    @Authorized([UserRole.VISITOR, UserRole.ADMIN])
    async getLanguages() {

        return this.languageRepository.find();
    }

    // get language by id
    @Query(() => [Language])
    @Authorized([UserRole.VISITOR, UserRole.ADMIN])
    async getLanguage(@Arg("id") id: string) {

        return this.languageRepository.findOneOrFail({ where: { id } });
    }

    // create a new language
    @Mutation(() => [Language])
    @Authorized([UserRole.ADMIN])
    async createLanguage(
        @Arg("name") name: string
    ) {
        const language = Language.create({
            name
        });

        return this.languageRepository.save(language);
    }

    // update a language
    @Mutation(() => [Language])
    @Authorized([UserRole.ADMIN])
    async updateLanguage(
        @Arg("id") id: string,
        @Arg("name") name: string
    ) {
        const language = await this.languageRepository.findOneOrFail({ where: { id } });

        if (!language) throw new GraphQLError("language not found!");

        language.name = name;

        return this.languageRepository.save(language);
    }

    // delete a language
    @Mutation(() => Boolean)
    @Authorized([UserRole.ADMIN])
    async deleteLanguage(
        @Arg("id") id: string
    ) {
        const language = await this.languageRepository.findOneOrFail({ where: { id } });

        if (!language) throw new GraphQLError("language not found!");

        await this.languageRepository.remove(language);

        return true;
    }

}
