import axios from "axios";
import { LANGUAGES } from "./constansCodeEditor";

const API = axios.create({
	baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (language: string, sourceCode: any) => {
	const respone = await API.post("/execute", {
		language: language,
		version: LANGUAGES[language as keyof typeof LANGUAGES],
		files: [
			{
				content: sourceCode,
			},
		],
	});

	return respone.data;
};
