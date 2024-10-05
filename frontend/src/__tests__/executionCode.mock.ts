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
				id: "267fa8d4-d156-4339-947a-ae5b0ecc0482",
				email: "charles-rox@pasgmail.com",
				pseudo: "ceciEstUnTest",
				role: "visitor",
				isPremium: false,
				executionCounter: 1,
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
				pseudo: "SurpriseMotherfucker",
				role: "visitor",
				isPremium: false,
				executionCounter: 1,
			},
		},
	},
};

export const getProjectByIdMock = {
	request: {
		query: GetProjectByIdDocument,
		variables: {
			getProjectId: "24ccfd7e-4add-48fb-a179-0902a63f63",
		},
	},
	result: {
		data: {
			getProject: {
				id: "24ccfd7e-4add-48fb-a179-0902a63f63",
				title: "Mon super projet",
				isPublic: true,
				createdAt: "2024-10-10Z10:00:00",
				updatedAt: "2024-10-10Z10:00:00",
				codes: [],
				likes: [],
				user: {
					id: "24ccfd-4add-48fb-a179-0902",
					pseudo: "Ghost",
					role: "Visitor",
					email: "ghost@gmail.com",
					executionCounter: 1,
					isPremium: false,
				},
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
