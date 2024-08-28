import DataSource from "../db";
import Language from "../entities/language";

export default class LanguageService {
	private languageRepository = DataSource.getRepository(Language);

	getAll = async();
}
