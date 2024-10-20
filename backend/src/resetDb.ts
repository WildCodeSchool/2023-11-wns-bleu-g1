import db, { clearDb } from "./db";
import Project from "./entities/project";
import Code from "./entities/code";
import User, { UserRole } from "./entities/user";
import Language from "./entities/language";
import Comment from "./entities/comment";
import Like from "./entities/like";
import Reporting from "./entities/Reporting";

const main = async () => {
	await db.initialize();
	await clearDb();

	const userRepository = db.getRepository(User);
	const languageRepository = db.getRepository(Language);
	const projectRepository = db.getRepository(Project);
	const codeRepository = db.getRepository(Code);
	const commentRepository = db.getRepository(Comment);
	const likeRepository = db.getRepository(Like);
	const reportingRepository = db.getRepository(Reporting);

	// Initialize User table
	const users = [
		{
			email: "test@test.test",
			password: "Test123456!",
			pseudo: "Test",
			isPremium: true,
			executionCounter: 1,
		},
		{
			email: "master@gmail.com",
			password: "Master@123",
			pseudo: "Flex Master",
			executionCounter: 1,
			isPremium: false,
		},
		{
			email: "admin@gmail.com",
			password: "Admin@123",
			pseudo: "Admin",
			role: UserRole.ADMIN,
			executionCounter: 1,
			isPremium: true,
		},
	];

	for (const userData of users) {
		const user = new User();
		Object.assign(user, userData);
		await userRepository.save(user);
	}

	// Initialize Language table
	const languages = [
		{
			name: "javascript",
			version: "18.15.0",
			color: "#fffc33",
		},
		{
			name: "typescript",
			version: "5.0.3",
			color: "#3396ff",
		},
		{
			name: "python:",
			version: "3.10.0",
			color: "#3572A5",
		},
		{
			name: "java",
			version: "15.0.2",
			color: "#B0721F",
		},
		{
			name: "c#",
			version: "6.12.0",
			color: "#008000",
		},
		{
			name: "php",
			version: "8.2.3",
			color: "#7F7F7F",
		},
	];

	for (const languageData of languages) {
		const language = new Language();
		Object.assign(language, languageData);
		await languageRepository.save(languages);
	}

	// Initialize Project table
	const javascript = await languageRepository.findOneBy({ name: "javascript" });
	const python = await languageRepository.findOneBy({ name: "python" });
	const java = await languageRepository.findOneBy({ name: "java" });
	const typescript = await languageRepository.findOneBy({ name: "typescript" });

	for (let i = 1; i <= 5; i++) {
		const project = new Project();
		const flexMaster = await userRepository.findOneBy({
			pseudo: "Flex Master",
		});

		Object.assign(project, {
			title: `Public Javascript Project ${i}`,
			user: flexMaster,
			isPublic: true,
		});

		await projectRepository.save(project);

		const code = new Code();

		Object.assign(code, {
			content: `console.log('Hello World from Javascript Project ${i}')`,
			language: javascript,
			project: project,
		});
		await codeRepository.save(code);
	}

	for (let i = 1; i <= 2; i++) {
		const project = new Project();
		const test = await userRepository.findOneBy({
			pseudo: "Test",
		});

		Object.assign(project, {
			title: `Public python Project ${i}`,
			user: test,
			isPublic: true,
		});

		await projectRepository.save(project);

		const code = new Code();

		Object.assign(code, {
			content: 'print(f"Hello World from Python Project {i}")',
			language: python,
			project: project,
		});
		await codeRepository.save(code);
	}

	for (let i = 1; i <= 2; i++) {
		const project = new Project();
		const test = await userRepository.findOneBy({
			pseudo: "Test",
		});

		Object.assign(project, {
			title: `Public java Project ${i}`,
			user: test,
			isPublic: true,
		});

		await projectRepository.save(project);

		const code = new Code();

		Object.assign(code, {
			content: 'System.out.println("Hello World from Java Project " + i);',
			language: java,
			project: project,
		});
		await codeRepository.save(code);
	}

	for (let i = 1; i <= 2; i++) {
		const project = new Project();
		const test = await userRepository.findOneBy({
			pseudo: "Test",
		});

		Object.assign(project, {
			title: `Public typescript Project ${i}`,
			user: test,
			isPublic: true,
		});

		await projectRepository.save(project);

		const code = new Code();

		Object.assign(code, {
			content: 'console.log("Hello World from TypeScript Project " + i);',
			language: typescript,
			project: project,
		});
		await codeRepository.save(code);
	}

	for (let i = 1; i <= 5; i++) {
		const project = new Project();
		const flexMaster = await userRepository.findOneBy({
			pseudo: "Flex Master",
		});

		Object.assign(project, {
			title: `Private Javascript Project ${i}`,
			user: flexMaster,
			isPublic: false,
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

	function dayBefore(day: number) {
		const date = new Date();
		date.setDate(date.getDate() - day);
		return date;
	}

	// Initialize Comment table
	const comments = [
		{
			content: "Comment 1",
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 1" }),
			user: await userRepository.findOneBy({ pseudo: "Test" }),
			createdAt: dayBefore(5),
		},
		{
			content: "Comment 2",
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 1" }),
			user: await userRepository.findOneBy({ pseudo: "Test" }),
			createdAt: dayBefore(4),
		},
		{
			content: "Comment 3",
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 2" }),
			user: await userRepository.findOneBy({ pseudo: "Test" }),
			createdAt: dayBefore(3),
		},
		{
			content: "Comment 4",
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 2" }),
			user: await userRepository.findOneBy({ pseudo: "Test" }),
			createdAt: dayBefore(2),
		},
		{
			content: "Comment 5",
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 2" }),
			user: await userRepository.findOneBy({ pseudo: "Test" }),
			createdAt: dayBefore(1),
		},
		{
			content: "Comment 6",
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 2" }),
			user: await userRepository.findOneBy({ pseudo: "Flex Master" }),
			createdAt: dayBefore(0),
		},
		{
			content: "reply 1",
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 1" }),
			user: await userRepository.findOneBy({ pseudo: "Flex Master" }),
			createdAt: dayBefore(1),
		},
		{
			content: "reply 2",
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 1" }),
			user: await userRepository.findOneBy({ pseudo: "Flex Master" }),
			createdAt: dayBefore(2),
		},
		{
			content: "reply 3",
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 2" }),
			user: await userRepository.findOneBy({ pseudo: "Flex Master" }),
			createdAt: dayBefore(1),
		},
		{
			content: "reply 4",
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 2" }),
			user: await userRepository.findOneBy({ pseudo: "Flex Master" }),
			createdAt: dayBefore(2),
		},
		{
			content: "reply 5",
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 2" }),
			user: await userRepository.findOneBy({ pseudo: "Flex Master" }),
			createdAt: dayBefore(1),
		},
		{
			content: "reply 6",
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 2" }),
			user: await userRepository.findOneBy({ pseudo: "Flex Master" }),
			createdAt: dayBefore(0),
		},
	];

	for (const commentData of comments) {
		const comment = new Comment();
		Object.assign(comment, commentData);
		await commentRepository.save(comment);
	}

	// Initialize Like table
	const like = [
		{
			user: await userRepository.findOneBy({ pseudo: "Test" }),
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 1" }),
		},
		{
			user: await userRepository.findOneBy({ pseudo: "Test" }),
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 2" }),
		},
		{
			user: await userRepository.findOneBy({ pseudo: "Flex Master" }),
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 1" }),
		},
		{
			user: await userRepository.findOneBy({ pseudo: "Flex Master" }),
			project: await projectRepository.findOneBy({ title: "Public Javascript Project 2" }),
		},
	];

	for (const likeData of like) {
		const like = new Like();
		Object.assign(like, likeData);
		await likeRepository.save(like);
	}

	// Initialize Reporting table
	const reporting = [
		{
			reason: "Spam",
			comment: await commentRepository.findOneBy({ content: "Comment 6" }),
			flagger: await userRepository.findOneBy({ pseudo: "Test" }),
			reportedAt: dayBefore(0),
		},
		{
			reason: "Inappropriate",
			comment: await commentRepository.findOneBy({ content: "Comment 2" }),
			flagger: await userRepository.findOneBy({ pseudo: "Flex Master" }),
			reportedAt: dayBefore(4),
		},
		{
			reason: "Spam",
			comment: await commentRepository.findOneBy({ content: "Comment 3" }),
			flagger: await userRepository.findOneBy({ pseudo: "Flex Master" }),
			reportedAt: dayBefore(3),
		},
		{
			reason: "Inappropriate",
			comment: await commentRepository.findOneBy({ content: "reply 5" }),
			flagger: await userRepository.findOneBy({ pseudo: "Test" }),
			reportedAt: dayBefore(0),
		},
		{
			reason: "Spam",
			comment: await commentRepository.findOneBy({ content: "Comment 5" }),
			flagger: await userRepository.findOneBy({ pseudo: "Test" }),
			reportedAt: dayBefore(1),
		},
		{
			reason: "Inappropriate",
			comment: await commentRepository.findOneBy({ content: "reply 3" }),
			flagger: await userRepository.findOneBy({ pseudo: "Flex Master" }),
			reportedAt: dayBefore(1),
		},
	];

	for (const reportingData of reporting) {
		const report = new Reporting();
		Object.assign(report, reportingData);
		await reportingRepository.save(report);
	}

	await db.destroy();

	console.log("DB is reset");
};

main();
