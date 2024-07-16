import {Arg, Mutation, Query, Resolver} from "type-graphql";

import Language from "../entities/language";

import DataSource from "../db";

@Resolver(Language)

export default class LanguageResolver {
    languageRepository = DataSource.getRepository(Language);

    constructor() {}

    // get all languages
    @Query(() => [Language])
    async getLanguages() {

        return this.languageRepository.find();
    }

    // get language by id
    @Query(() => [Language])
    async getLanguage(@Arg("id") id: string) {

        return this.languageRepository.findOne({ where: { id } });
    }

    // create a new language
    @Mutation(() => [Language])
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
    async updateLanguage(
        @Arg("id") id: string,
        @Arg("name") name: string
    ) {
        const language = await this.languageRepository.findOne({ where: { id } });

        if (!language) throw new Error("language not found!");

        language.name = name;

        return this.languageRepository.save(language);
    }

    // delete a language
    @Mutation(() => Boolean)
    async deleteLanguage(
        @Arg("id") id: string
    ) {
        const language = await this.languageRepository.findOne({ where: { id } });

        if (!language) throw new Error("language not found!");

        await this.languageRepository.remove(language);

        return true;
    }

}
