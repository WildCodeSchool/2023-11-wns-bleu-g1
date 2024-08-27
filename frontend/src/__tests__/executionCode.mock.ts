import {
	GetUserProfileDocument,
	GetExecutionCounterDocument,
	IncrementExecutionCounterDocument,
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
				executionCounter: 10,
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
