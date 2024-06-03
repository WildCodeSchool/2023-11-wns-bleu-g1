import getAdminJwt from "./getAdminJwt";

export default async function getAdminContext() {
	const { JWT } = await getAdminJwt();

	return { req: { headers: { authorization: `Bearer ${JWT}` } } };
}
