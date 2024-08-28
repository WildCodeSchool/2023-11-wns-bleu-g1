import { AuthChecker } from "type-graphql";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";

import DataSource from "./db";
import { Context } from "./interfaces/auth";
import env from "./env";
import User from "./entities/user";

export const authChecker: AuthChecker<Context> = async (
	{ context },
	roles: string[] = []
) => {
	const { headers = {} } = context.req ?? {};
	const tokenInCookie = cookie.parse(headers.cookie ?? "").token;
	const tokenInAuthHeaders = headers.authorization?.split(" ")[1];

	const token = tokenInAuthHeaders ?? tokenInCookie;

	if (typeof token !== "string") {
		return false;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const decoded = (await jwt.verify(token, env.JWT_PRIVATE_KEY)) as any;

	if (!decoded?.userId) {
		return false;
	}

	const userRepository: Repository<User> = DataSource.getRepository(User);

	const currentUser = await userRepository.findOneByOrFail({
		id: decoded?.userId,
	});

	if (currentUser === null) {
		return false;
	}

	context.currentUser = currentUser;

	return roles.length === 0 || roles.includes(currentUser.role.toString());
};
