import axios from "axios";

const API = axios.create({
	baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (
	language: string,
	sourceCode: any,
	version: string
) => {
	const respone = await API.post("/execute", {
		language,
		version,
		files: [
			{
				content: sourceCode,
			},
		],
	});

	return respone.data;
};
