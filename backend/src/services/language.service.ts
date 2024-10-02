import { ILike, Repository } from "typeorm";
import { GraphQLError } from "graphql";

import DataSource from "../db";
import Language, {
	LanguageInput,
	UpdateLanguageInput,
} from "../entities/language";

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

	create = async (data: LanguageInput) => {
		const { name, version } = data;
		const nameAlreadyTaken = await this.languageRepository.findOneBy({
			name: ILike(name),
		});

		if (nameAlreadyTaken) {
			throw new GraphQLError(`${name} already taken`);
		}

		const newLanguage = this.languageRepository.create({
			name,
			version,
		});

		return this.languageRepository.save(newLanguage);
	};

	update = async (data: UpdateLanguageInput) => {
		const { id, name, version } = data;

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

		language.name = name ? name : language.name;
		language.version = version ? version : language.version;

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
