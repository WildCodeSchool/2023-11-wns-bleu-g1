import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
};

export type Mutation = {
	__typename?: "Mutation";
	createUser: User;
	logout: Scalars["String"];
	signin: Scalars["String"];
};

export type MutationCreateUserArgs = {
	data: NewUserInput;
};

export type MutationSigninArgs = {
	data: SigninInput;
};

export type NewUserInput = {
	email: Scalars["String"];
	password: Scalars["String"];
	pseudo: Scalars["String"];
};

export type Query = {
	__typename?: "Query";
	users: Array<User>;
};

export type SigninInput = {
	email: Scalars["String"];
	password: Scalars["String"];
};

export type User = {
	__typename?: "User";
	email: Scalars["String"];
	id: Scalars["String"];
	pseudo: Scalars["String"];
	role: Scalars["String"];
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
	__typename?: "Query";
	users: Array<{ __typename?: "User"; email: string; id: string }>;
};

export type SignUpMutationVariables = Exact<{
	data: NewUserInput;
}>;

export type SignUpMutation = {
	__typename?: "Mutation";
	createUser: {
		__typename?: "User";
		email: string;
		id: string;
		pseudo: string;
		role: string;
	};
};

export const UsersDocument = gql`
	query Users {
		users {
			email
			id
		}
	}
`;
/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
	baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
		UsersDocument,
		options
	);
}

export function useUsersLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
		UsersDocument,
		options
	);
}

export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<
	UsersQuery,
	UsersQueryVariables
>;
export const SignUpDocument = gql`
	mutation SignUp($data: NewUserInput!) {
		createUser(data: $data) {
			email
			id
			pseudo
			role
		}
	}
`;
export type SignUpMutationFn = Apollo.MutationFunction<
	SignUpMutation,
	SignUpMutationVariables
>;
/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignUpMutation(
	baseOptions?: Apollo.MutationHookOptions<
		SignUpMutation,
		SignUpMutationVariables
	>
) {
	const options = { ...defaultOptions, ...baseOptions };
	return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
		SignUpDocument,
		options
	);
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
	SignUpMutation,
	SignUpMutationVariables
>;
