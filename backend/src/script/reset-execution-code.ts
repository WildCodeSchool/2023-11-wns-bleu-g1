// import { MoreThan } from "typeorm";
import db from "../db";
import User from "../entities/user";

export async function resetExecCode() {
	try {
		console.log(`[SCRIPT] begin to reset user execution code`);

		await db
			.createQueryBuilder()
			.update(User)
			.set({ executionCounter: 0 })
			.where("executionCounter != 0")
			.execute();

		console.log(`[SCRIPT] end to reset user execution code`);
	} catch (e) {
		console.log(e);
	}
}
