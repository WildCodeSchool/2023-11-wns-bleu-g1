import { Repository } from "typeorm";

import Code, { CodeInput } from "../entities/code";
import DataSource from "../db";

export default class CodeService {
	codeRepository: Repository<Code>;

	constructor() {
		this.codeRepository = DataSource.getRepository(Code);
	}

	getAll = async (request: object) => {
		// SELECT * FROM Code;
		const codes = await this.codeRepository.find(request);

		return codes;
	};

	create = async (data: CodeInput) => {
		const code = new Code();

		Object.assign(code, data);

		return await this.codeRepository.save(code);
	};

	update = async (id: string, content: string) => {
		const code = await this.codeRepository.findOneByOrFail({ id });

		if (code) {
			code.content = content;
		}

		return await this.codeRepository.save(code);
	};
}
