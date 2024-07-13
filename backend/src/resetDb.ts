import db from "./db";
import Project from "./entities/project";
import Code from "./entities/code";
import User, { UserRole } from "./entities/user";
import Language from "./entities/language";

export const cleanDb = async () => {
	const runner = db.createQueryRunner();

	await runner.query("SET session_replication_role = 'replica'");

	await Promise.all(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		db.entityMetadatas.map((entity: any) => {
			runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`);
		})
	);

	await Promise.all(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		db.entityMetadatas.map((entity: any) => {
			runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`);
		})
	);

	await runner.query("SET session_replication_role = 'origin'");

	await db.synchronize();
};

const main = async () => {
	await db.initialize();

	await cleanDb();

	const user = new User();

	Object.assign(user, {
		email: "test@test.test",
		password: "Test123456!",
		pseudo: "Test",
		isPremium: true,
	});

	await user.save();

	const flexMaster = new User();

	Object.assign(flexMaster, {
		email: "master@gmail.com",
		password: "Master@123",
		pseudo: "Flex Master",
	});

	await flexMaster.save();
	const admin = new User();

	Object.assign(admin, {
		email: "admin@gmail.com",
		password: "Admin@123",
		pseudo: "Admin",
		role: UserRole.ADMIN,
	});

	await admin.save();

	// Initialize Language table
	const javascript = Language.create({
		name: "JavaScript",
	});

	await javascript.save();

	const project1 = Project.create({
		title: "Project 1",
		user: flexMaster,
	});

	const project2 = Project.create({
		title: "Project 2",
		user: flexMaster,
	});

	await project1.save();
	await project2.save();

	const javascriptCode = Code.create({
		content: "console.log('Hello World')",
		language: javascript,
		project: project1,
	});
	const javascriptCode2 = Code.create({
		content: `function main() {
			return 1 + 3
		}
		
		main()`,
		language: javascript,
		project: project2,
	});

	await javascriptCode.save();
	await javascriptCode2.save();

	await db.destroy();

	console.log(`${user.email} created`);
};

main();
