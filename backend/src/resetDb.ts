import { Repository } from "typeorm";

import db from "./db";
import Project from "./entities/project";
import Code from "./entities/code";
import User, { UserRole } from "./entities/user";
import Language from "./entities/language";
import { EntityMetadata } from "typeorm";
import DataSource from "./db";

export const cleanDb = async () => {
	const runner = db.createQueryRunner();

	await runner.query("SET session_replication_role = 'replica'");

	await Promise.all(
		db.entityMetadatas.map((entity: EntityMetadata) => {
			runner.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL`);
		})
	);

	await Promise.all(
		db.entityMetadatas.map((entity: EntityMetadata) => {
			runner.query(`DROP TABLE IF EXISTS "${entity.tableName}" CASCADE`);
		})
	);

	await runner.query("SET session_replication_role = 'origin'");

	await db.synchronize();
};

const main = async () => {
	await db.initialize();

	const userRepository: Repository<User> = DataSource.getRepository(User);
	const languageRepository: Repository<Language> =
		DataSource.getRepository(Language);
	const projectRepository: Repository<Project> =
		DataSource.getRepository(Project);
	const codeRepository: Repository<Code> = DataSource.getRepository(Code);

	await cleanDb();

	const user = new User();

	Object.assign(user, {
		email: "test@test.test",
		password: "Test123456!",
		pseudo: "Test",
		isPremium: true,
		executionCounter: 1,
	});

	await userRepository.save(user);

	const flexMaster = new User();

	Object.assign(flexMaster, {
		email: "master@gmail.com",
		password: "Master@123",
		pseudo: "Flex Master",
		executionCounter: 1,
		isPremium: false,
	});

	await userRepository.save(flexMaster);

	const admin = new User();

	Object.assign(admin, {
		email: "admin@gmail.com",
		password: "Admin@123",
		pseudo: "Admin",
		role: UserRole.ADMIN,
		executionCounter: 1,
		isPremium: true,
	});

	await userRepository.save(admin);
	for (let i = 1; i <= 13; i++) {
		const username = `user${i}`;
		const newuser = new User();

		Object.assign(newuser, {
			email: `${username}@gmail.com`,
			password: "Master@123",
			pseudo: username,
			executionCounter: 1,
			isPremium: false,
		});

		await userRepository.save(newuser);
	}

	// Initialize Language table
	const javascript = new Language();

	Object.assign(javascript, {
		name: "JavaScript",
	});

	await languageRepository.save(javascript);

	for (let i = 1; i <= 13; i++) {
		const project = new Project();

		Object.assign(project, {
			title: `Project ${i}`,
			user: flexMaster,
			isPublic: true,
		});

		await projectRepository.save(project);

		const code = new Code();

		Object.assign(code, {
			content: `console.log('Hello World from Project ${i}')`,
			language: javascript,
			project: project,
		});
		await codeRepository.save(code);
	}

	await db.destroy();

	console.log("DB is reset");
};

main();
