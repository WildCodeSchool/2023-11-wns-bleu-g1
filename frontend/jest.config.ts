const nextJest = require("next/jest");

const createJestConfig = nextJest({
	dir: ".",
});

const esModules = [
	"other_modules_bases_on_your_needs",
	"query-string",
	"decode-uri-component",
	"split-on-first",
	"filter-obj",
	"(?!@ngrx|(?!deck.gl)|ng-dynamic)",
];
const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>jest.setup.ts"],
	testEnvironment: "jsdom",
	testMatch: ["**/__tests__/**/*.test.ts+(x)"],
};

module.exports = async () => ({
	...(await createJestConfig(customJestConfig)()),
	transformIgnorePatterns: esModules.length
		? [`/node_modules/(?!${esModules.join("|")})`]
		: [],
});
