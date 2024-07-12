import gql from "graphql-tag";

export default gql`
	query GetExecutionCounter {
		getExecutionCounter {
			isPremium
			executionCounter
		}
	}
`;
// definition de type graphql playground
