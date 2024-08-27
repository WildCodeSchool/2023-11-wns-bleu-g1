import gql from "graphql-tag";

export default gql`
	mutation IncrementExecutionCounter($counter: ExecutionCounterInput!) {
		incrementExecutionCounter(counter: $counter)
	}
`;
