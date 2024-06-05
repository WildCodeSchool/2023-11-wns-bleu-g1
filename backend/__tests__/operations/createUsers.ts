import gql from "graphql-tag";

export default gql`
	mutation Mutation($data: NewUserInput!) {
		createUser(data: $data) {
			email
			id
			pseudo
		}
	}
`;
