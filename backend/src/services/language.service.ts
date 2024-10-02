import { ILike, Repository } from "typeorm";
import { GraphQLError } from "graphql";

import DataSource from "../db";
import Language from "../entities/language";

export default class LanguageService {
	languageRepository: Repository<Language>;

	constructor() {
		this.languageRepository = DataSource.getRepository(Language);
	}

	getAll = async () => {
		return await this.languageRepository.find();
	};

	getby = async (request: object) => {
		return await this.languageRepository.findOneOrFail(request);
	};

	create = async (name: string) => {
		const nameAlreadyTaken = await this.languageRepository.findOneBy({
			name: ILike(name),
		});

		if (nameAlreadyTaken) {
			throw new GraphQLError(`${name} already taken`);
		}

		const newLanguage = this.languageRepository.create({
			name,
		});

		return this.languageRepository.save(newLanguage);
	};

	update = async (id: string, name: string) => {
		const language = await this.languageRepository.findOneBy({ id });
		const nameAlreadyTaken = await this.languageRepository.findOneBy({
			name: ILike(`${name}`),
		});

		if (!language) {
			throw new GraphQLError("language not found!");
		}

		if (nameAlreadyTaken) {
			throw new GraphQLError(`${name} already taken`);
		}

		language.name = name;

		return this.languageRepository.save(language);
	};

	delete = async (id: string) => {
		const language = await this.languageRepository.findOneBy({ id });

		if (!language) {
			throw new GraphQLError("language not found!");
		}

		await this.languageRepository.remove(language);

		return true;
	};
}
