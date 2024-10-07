import {
	GetUserProfileDocument,
	GetExecutionCounterDocument,
	IncrementExecutionCounterDocument,
	GetProjectByIdDocument,
} from "@/graphql/generated/schema";

export const getVisitorProfileMock = {
	request: {
		query: GetUserProfileDocument,
	},
	result: {
		data: {
			getUserProfile: {
				id: "38d7fd70-2fd3-4165-b9e4-cd2c8c3e2957",
				email: "charles-rox@pasgmail.com",
				pseudo: "ceciEstUnTest",
				role: "visitor",
				executionCounter: 0,
				isPremium: false,
			},
		},
	},
};

export const getPremiumProfileMock = {
	request: {
		query: GetUserProfileDocument,
	},
	result: {
		data: {
			getUserProfile: {
				id: "24ccfd7e-4add-48fb-a179-0902a63f0216",
				email: "jeSuis@premium.fr",
				pseudo: "Surprise",
				role: "visitor",
				executionCounter: 0,
				isPremium: true,
			},
		},
	},
};

export const getCanNotClickProfileMock = {
	request: {
		query: GetUserProfileDocument,
	},
	result: {
		data: {
			getUserProfile: {
				id: "24ccfd7e-4add-48fb-a179-0902a63f0216",
				email: "jeSuis@premium.fr",
				pseudo: "Surprise",
				role: "visitor",
				executionCounter: 50,
				isPremium: false,
			},
		},
	},
};

export const getProjectByIdMock = {
	request: {
		query: GetProjectByIdDocument,
		variables: {
			getProjectId: "3771abdc-4873-48f0-af1f-d6c7bc985529",
		},
	},
	result: {
		data: {
			getProject: {
				id: "3771abdc-4873-48f0-af1f-d6c7bc985529",
				title: "Project 12",
				isPublic: true,
				codes: [
					{
						id: "4918182c-5d9f-4914-b74d-428edd8f420b",
						content: "console.log('Hello World from Project 12')",
						language: {
							id: "fdb8e87b-5826-4217-87b5-d61303171801",
							name: "javascript",
							version: "18.15.0",
						},
					},
				],
				user: {
					id: "38d7fd70-2fd3-4165-b9e4-cd2c8c3e2957",
					pseudo: "Flex Master",
				},
				likes: [],
				comments: [],
			},
		},
	},
};

export const getPrivateProjectByIdMock = {
	request: {
		query: GetProjectByIdDocument,
		variables: {
			getProjectId: "3771abdc-4873-48f0-af1f-d6c7bc985529",
		},
	},
	result: {
		data: {
			getProject: {
				id: "3771abdc-4873-48f0-af1f-d6c7bc985529",
				title: "Project 12",
				isPublic: false,
				codes: [
					{
						id: "4918182c-5d9f-4914-b74d-428edd8f420b",
						content: "console.log('Hello World from Project 12')",
						language: {
							id: "fdb8e87b-5826-4217-87b5-d61303171801",
							name: "javascript",
							version: "18.15.0",
						},
					},
				],
				user: {
					id: "38d7fd70-2fd3-4165-b9e4-cd2c8c3e2957",
					pseudo: "Flex Master",
				},
				likes: [],
				comments: [],
			},
		},
	},
};

export const getExecutionCountMock = {
	request: {
		query: GetExecutionCounterDocument,
	},
	result: {
		data: {
			getExecutionCounter: {
				executionCounter: 0,
				isPremium: false,
			},
		},
	},
};

export const incrementExecutionCounterMock = {
	request: {
		query: IncrementExecutionCounterDocument,
		variables: {
			counter: {
				executionCounter: 0,
			},
		},
	},
	result: {
		data: {
			incrementExecutionCounter: 1,
		},
	},
};

export const newExecutionCountMock = {
	request: {
		query: GetExecutionCounterDocument,
	},
	result: {
		data: {
			getExecutionCounter: {
				executionCounter: 1,
				isPremium: false,
			},
		},
	},
};

export const getNotExecutionCountMock = {
	request: {
		query: GetExecutionCounterDocument,
	},
	result: {
		data: {
			getExecutionCounter: {
				executionCounter: 50,
				isPremium: false,
			},
		},
	},
};

export const getPremiumExecutionMock = {
	request: {
		query: GetExecutionCounterDocument,
	},
	result: {
		data: {
			getExecutionCounter: {
				executionCounter: 1,
				isPremium: true,
			},
		},
	},
};
