import getVisitorJwt from "./getVisitorJwt";

export default async function getVisitorContext() {
	const { JWT } = await getVisitorJwt();

	return { req: { headers: { authorization: `Bearer ${JWT}` } } };
}
