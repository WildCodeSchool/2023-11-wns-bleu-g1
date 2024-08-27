import Code from "../entities/code";

export default class CodeService {
	static getAll = async (request: object) => {
		// SELECT * FROM Code;
		const codes = await Code.find(request);

		return codes;
	};
}
