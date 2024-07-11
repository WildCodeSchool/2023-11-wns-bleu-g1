import gql from "graphql-tag";

export default gql`
	mutation IncrementeExecutionCounter($counter: ExecutionCounterInput!) {
		incrementeExecutionCounter(counter: $counter)
	}
`;
