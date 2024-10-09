import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTimeISO: any;
};

export type Code = {
  __typename?: 'Code';
  content: Scalars['String'];
  id: Scalars['String'];
  isReported: Scalars['Boolean'];
  language: Language;
  project: Project;
};

export type CodeInput = {
  content: Scalars['String'];
  language?: InputMaybe<Scalars['String']>;
  project: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  content: Scalars['String'];
  createdAt: Scalars['DateTimeISO'];
  id: Scalars['String'];
  project: Project;
  reportings: Array<Reporting>;
  updatedAt: Scalars['DateTimeISO'];
  user: User;
};

export type ExecutionCounterInput = {
  executionCounter: Scalars['Float'];
};

export type Language = {
  __typename?: 'Language';
  codes: Array<Code>;
  id: Scalars['String'];
  name: Scalars['String'];
  version: Scalars['String'];
};

export type LanguageInput = {
  name: Scalars['String'];
  version: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['String'];
  project: Project;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  comment: Comment;
  createCode: Code;
  createLanguage: Language;
  createPaymentIntent: PaymentIntentResponse;
  createProject: Project;
  createReporting: Reporting;
  createUser: User;
  deleteComment: Scalars['Boolean'];
  deleteCommentAndLinkedReport: Scalars['Boolean'];
  deleteLanguage: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  deleteReporting: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  incrementExecutionCounter: Scalars['Float'];
  like: Like;
  logout: Scalars['String'];
  signin: Scalars['String'];
  toggleProjectPublicState: Project;
  unlike: Scalars['Boolean'];
  updateCode: Code;
  updateComment: Scalars['Boolean'];
  updateLanguage: Language;
  updateUserIsPremium: Scalars['Float'];
  updateUserPassword: Scalars['Boolean'];
  updateUsername: Scalars['Boolean'];
};


export type MutationCommentArgs = {
  content: Scalars['String'];
  projectId: Scalars['String'];
};


export type MutationCreateCodeArgs = {
  data: CodeInput;
};


export type MutationCreateLanguageArgs = {
  data: LanguageInput;
};


export type MutationCreatePaymentIntentArgs = {
  amount: Scalars['Float'];
};


export type MutationCreateProjectArgs = {
  data: NewProjectInput;
};


export type MutationCreateReportingArgs = {
  data: NewReportInput;
};


export type MutationCreateUserArgs = {
  data: NewUserInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationDeleteCommentAndLinkedReportArgs = {
  id: Scalars['String'];
};


export type MutationDeleteLanguageArgs = {
  id: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['String'];
};


export type MutationDeleteReportingArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
  inAdminPanel?: Scalars['Boolean'];
};


export type MutationIncrementExecutionCounterArgs = {
  counter: ExecutionCounterInput;
};


export type MutationLikeArgs = {
  projectId: Scalars['String'];
};


export type MutationSigninArgs = {
  data: SigninInput;
};


export type MutationToggleProjectPublicStateArgs = {
  id: Scalars['String'];
};


export type MutationUnlikeArgs = {
  likeId: Scalars['String'];
};


export type MutationUpdateCodeArgs = {
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  commentId: Scalars['String'];
  newContent: Scalars['String'];
};


export type MutationUpdateLanguageArgs = {
  data: UpdateLanguageInput;
};


export type MutationUpdateUserIsPremiumArgs = {
  isPremium: Scalars['Boolean'];
};


export type MutationUpdateUserPasswordArgs = {
  datas: UpdatePasswordInput;
};


export type MutationUpdateUsernameArgs = {
  datas: UpdateUsernameInput;
};

export type NewProjectInput = {
  isPublic?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
};

export type NewReportInput = {
  commentId: Scalars['String'];
  reason: Scalars['String'];
};

export type NewUserInput = {
  email: Scalars['String'];
  isPremium?: InputMaybe<Scalars['Boolean']>;
  password: Scalars['String'];
  pseudo: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
};

export type PaymentIntentResponse = {
  __typename?: 'PaymentIntentResponse';
  clientSecret?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
};

export type Project = {
  __typename?: 'Project';
  codes: Array<Code>;
  comments: Array<Comment>;
  createdAt: Scalars['DateTimeISO'];
  id: Scalars['String'];
  isPublic: Scalars['Boolean'];
  likes: Array<Like>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTimeISO'];
  user: User;
};

export type ProjectPaginationResponse = {
  __typename?: 'ProjectPaginationResponse';
  hasMore: Scalars['Boolean'];
  isUserSearch: Scalars['Boolean'];
  projects: Array<Project>;
};

export type Query = {
  __typename?: 'Query';
  getAllReports: Array<Comment>;
  getCode: Array<Code>;
  getCodes: Array<Code>;
  getComments: Array<Comment>;
  getExecutionCounter: User;
  getLanguage: Language;
  getLanguages: Array<Language>;
  getLikes: Array<Like>;
  getPaginateProjects: ProjectPaginationResponse;
  getProject: Project;
  getProjects: Array<Project>;
  getUserProfile: User;
  users: Array<User>;
};


export type QueryGetCodeArgs = {
  project: Scalars['String'];
};


export type QueryGetLanguageArgs = {
  id: Scalars['String'];
};


export type QueryGetPaginateProjectsArgs = {
  isUser?: Scalars['Boolean'];
  limit?: Scalars['Float'];
  offset?: Scalars['Float'];
  searchProject?: Scalars['String'];
  searchUser?: Scalars['String'];
  withUserProject?: Scalars['Boolean'];
};


export type QueryGetProjectArgs = {
  id: Scalars['String'];
};

export type Reporting = {
  __typename?: 'Reporting';
  comment: Comment;
  flagger: User;
  id: Scalars['String'];
  reason: Scalars['String'];
  reportedAt: Scalars['DateTimeISO'];
};

export type SigninInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateLanguageInput = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  version: Scalars['String'];
};

export type UpdatePasswordInput = {
  id: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type UpdateUsernameInput = {
  id: Scalars['String'];
  newUsername: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  executionCounter: Scalars['Float'];
  id: Scalars['String'];
  isPremium: Scalars['Boolean'];
  pseudo: Scalars['String'];
  reportings: Array<Reporting>;
  role: Scalars['String'];
};

export type CommentMutationVariables = Exact<{
  content: Scalars['String'];
  projectId: Scalars['String'];
}>;


export type CommentMutation = { __typename?: 'Mutation', comment: { __typename?: 'Comment', id: string, content: string, createdAt: any } };

export type GetCommentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCommentsQuery = { __typename?: 'Query', getComments: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, updatedAt: any, project: { __typename?: 'Project', id: string } }> };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['String'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type UpdateCommentMutationVariables = Exact<{
  newContent: Scalars['String'];
  commentId: Scalars['String'];
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: boolean };

export type GetLanguagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLanguagesQuery = { __typename?: 'Query', getLanguages: Array<{ __typename?: 'Language', id: string, name: string, version: string }> };

export type DeleteLanguageMutationVariables = Exact<{
  deleteLanguageId: Scalars['String'];
}>;


export type DeleteLanguageMutation = { __typename?: 'Mutation', deleteLanguage: boolean };

export type CreateLanguageMutationVariables = Exact<{
  data: LanguageInput;
}>;


export type CreateLanguageMutation = { __typename?: 'Mutation', createLanguage: { __typename?: 'Language', id: string, name: string } };

export type UpdateLanguageMutationVariables = Exact<{
  data: UpdateLanguageInput;
}>;


export type UpdateLanguageMutation = { __typename?: 'Mutation', updateLanguage: { __typename?: 'Language', id: string, name: string } };

export type LikeMutationVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type LikeMutation = { __typename?: 'Mutation', like: { __typename?: 'Like', id: string } };

export type UnlikeMutationVariables = Exact<{
  likeId: Scalars['String'];
}>;


export type UnlikeMutation = { __typename?: 'Mutation', unlike: boolean };

export type CreateCodeMutationVariables = Exact<{
  data: CodeInput;
}>;


export type CreateCodeMutation = { __typename?: 'Mutation', createCode: { __typename?: 'Code', id: string, content: string, isReported: boolean } };

export type GetCodesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCodesQuery = { __typename?: 'Query', getCodes: Array<{ __typename?: 'Code', id: string, isReported: boolean, content: string, language: { __typename?: 'Language', id: string, name: string } }> };

export type GetCodeforAProjectIdQueryVariables = Exact<{
  project: Scalars['String'];
}>;


export type GetCodeforAProjectIdQuery = { __typename?: 'Query', getCode: Array<{ __typename?: 'Code', id: string, content: string, language: { __typename?: 'Language', name: string }, project: { __typename?: 'Project', title: string, id: string } }> };

export type UpdateCodeMutationVariables = Exact<{
  updateCodeId: Scalars['String'];
  content?: InputMaybe<Scalars['String']>;
}>;


export type UpdateCodeMutation = { __typename?: 'Mutation', updateCode: { __typename?: 'Code', content: string, id: string } };

export type MutationMutationVariables = Exact<{
  data: NewProjectInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, title: string, isPublic: boolean, codes: Array<{ __typename?: 'Code', id: string, content: string, language: { __typename?: 'Language', id: string } }>, user: { __typename?: 'User', id: string } } };

export type CreateProjectMutationVariables = Exact<{
  data: NewProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', title: string, id: string, isPublic: boolean, user: { __typename?: 'User', pseudo: string, role: string, id: string, email: string } } };

export type GetProjectByIdQueryVariables = Exact<{
  getProjectId: Scalars['String'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', getProject: { __typename?: 'Project', id: string, title: string, isPublic: boolean, codes: Array<{ __typename?: 'Code', id: string, content: string, language: { __typename?: 'Language', name: string, id: string, version: string } }>, user: { __typename?: 'User', id: string, pseudo: string }, likes: Array<{ __typename?: 'Like', id: string, user: { __typename?: 'User', id: string, pseudo: string } }>, comments: Array<{ __typename?: 'Comment', id: string, content: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, pseudo: string } }> } };

export type GetPaginateProjectsQueryVariables = Exact<{
  withUserProject: Scalars['Boolean'];
  isUser: Scalars['Boolean'];
  searchUser: Scalars['String'];
  searchProject: Scalars['String'];
  offset: Scalars['Float'];
  limit: Scalars['Float'];
}>;


export type GetPaginateProjectsQuery = { __typename?: 'Query', getPaginateProjects: { __typename?: 'ProjectPaginationResponse', hasMore: boolean, isUserSearch: boolean, projects: Array<{ __typename?: 'Project', id: string, isPublic: boolean, title: string, createdAt: any, user: { __typename?: 'User', pseudo: string } }> } };

export type ToggleProjectPublicStateMutationVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type ToggleProjectPublicStateMutation = { __typename?: 'Mutation', toggleProjectPublicState: { __typename?: 'Project', id: string, isPublic: boolean, title: string } };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', getProjects: Array<{ __typename?: 'Project', id: string, title: string, isPublic: boolean, createdAt: any, updatedAt: any }> };

export type DeleteProjectMutationVariables = Exact<{
  deleteProjectId: Scalars['String'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type CreateReportingMutationVariables = Exact<{
  data: NewReportInput;
}>;


export type CreateReportingMutation = { __typename?: 'Mutation', createReporting: { __typename?: 'Reporting', id: string } };

export type GetAllReportsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllReportsQuery = { __typename?: 'Query', getAllReports: Array<{ __typename?: 'Comment', id: string, content: string, project: { __typename?: 'Project', id: string }, reportings: Array<{ __typename?: 'Reporting', id: string }> }> };

export type DeleteCommentAndLinkedReportMutationVariables = Exact<{
  deleteCommentAndLinkedReportId: Scalars['String'];
}>;


export type DeleteCommentAndLinkedReportMutation = { __typename?: 'Mutation', deleteCommentAndLinkedReport: boolean };

export type CreatePaymentIntentMutationVariables = Exact<{
  amount: Scalars['Float'];
}>;


export type CreatePaymentIntentMutation = { __typename?: 'Mutation', createPaymentIntent: { __typename?: 'PaymentIntentResponse', clientSecret?: string | null, error?: string | null } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, role: string, email: string, pseudo: string, executionCounter: number, isPremium: boolean }> };

export type GetExecutionCounterQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExecutionCounterQuery = { __typename?: 'Query', getExecutionCounter: { __typename?: 'User', executionCounter: number, isPremium: boolean } };

export type SignUpMutationVariables = Exact<{
  data: NewUserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string, id: string, pseudo: string, role: string, executionCounter: number, isPremium: boolean } };

export type SignInMutationVariables = Exact<{
  data: SigninInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signin: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['String'];
  inAdminPanel: Scalars['Boolean'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProfileQuery = { __typename?: 'Query', getUserProfile: { __typename?: 'User', id: string, role: string, email: string, pseudo: string, executionCounter: number, isPremium: boolean } };

export type IncrementExecutionCounterMutationVariables = Exact<{
  counter: ExecutionCounterInput;
}>;


export type IncrementExecutionCounterMutation = { __typename?: 'Mutation', incrementExecutionCounter: number };

export type UpdateUserIsPremiumMutationVariables = Exact<{
  isPremium: Scalars['Boolean'];
}>;


export type UpdateUserIsPremiumMutation = { __typename?: 'Mutation', updateUserIsPremium: number };

export type UpdateUsernameMutationVariables = Exact<{
  datas: UpdateUsernameInput;
}>;


export type UpdateUsernameMutation = { __typename?: 'Mutation', updateUsername: boolean };

export type UpdateUserPasswordMutationVariables = Exact<{
  datas: UpdatePasswordInput;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword: boolean };


export const CommentDocument = gql`
    mutation Comment($content: String!, $projectId: String!) {
  comment(content: $content, projectId: $projectId) {
    id
    content
    createdAt
  }
}
    `;
export type CommentMutationFn = Apollo.MutationFunction<CommentMutation, CommentMutationVariables>;

/**
 * __useCommentMutation__
 *
 * To run a mutation, you first call `useCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentMutation, { data, loading, error }] = useCommentMutation({
 *   variables: {
 *      content: // value for 'content'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCommentMutation(baseOptions?: Apollo.MutationHookOptions<CommentMutation, CommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentMutation, CommentMutationVariables>(CommentDocument, options);
      }
export type CommentMutationHookResult = ReturnType<typeof useCommentMutation>;
export type CommentMutationResult = Apollo.MutationResult<CommentMutation>;
export type CommentMutationOptions = Apollo.BaseMutationOptions<CommentMutation, CommentMutationVariables>;
export const GetCommentsDocument = gql`
    query GetComments {
  getComments {
    id
    content
    createdAt
    updatedAt
    project {
      id
    }
  }
}
    `;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCommentsQuery(baseOptions?: Apollo.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
      }
export function useGetCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
        }
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: String!) {
  deleteComment(commentId: $commentId)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($newContent: String!, $commentId: String!) {
  updateComment(newContent: $newContent, commentId: $commentId)
}
    `;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      newContent: // value for 'newContent'
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const GetLanguagesDocument = gql`
    query GetLanguages {
  getLanguages {
    id
    name
    version
  }
}
    `;

/**
 * __useGetLanguagesQuery__
 *
 * To run a query within a React component, call `useGetLanguagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLanguagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLanguagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLanguagesQuery(baseOptions?: Apollo.QueryHookOptions<GetLanguagesQuery, GetLanguagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLanguagesQuery, GetLanguagesQueryVariables>(GetLanguagesDocument, options);
      }
export function useGetLanguagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLanguagesQuery, GetLanguagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLanguagesQuery, GetLanguagesQueryVariables>(GetLanguagesDocument, options);
        }
export type GetLanguagesQueryHookResult = ReturnType<typeof useGetLanguagesQuery>;
export type GetLanguagesLazyQueryHookResult = ReturnType<typeof useGetLanguagesLazyQuery>;
export type GetLanguagesQueryResult = Apollo.QueryResult<GetLanguagesQuery, GetLanguagesQueryVariables>;
export const DeleteLanguageDocument = gql`
    mutation DeleteLanguage($deleteLanguageId: String!) {
  deleteLanguage(id: $deleteLanguageId)
}
    `;
export type DeleteLanguageMutationFn = Apollo.MutationFunction<DeleteLanguageMutation, DeleteLanguageMutationVariables>;

/**
 * __useDeleteLanguageMutation__
 *
 * To run a mutation, you first call `useDeleteLanguageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLanguageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLanguageMutation, { data, loading, error }] = useDeleteLanguageMutation({
 *   variables: {
 *      deleteLanguageId: // value for 'deleteLanguageId'
 *   },
 * });
 */
export function useDeleteLanguageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLanguageMutation, DeleteLanguageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLanguageMutation, DeleteLanguageMutationVariables>(DeleteLanguageDocument, options);
      }
export type DeleteLanguageMutationHookResult = ReturnType<typeof useDeleteLanguageMutation>;
export type DeleteLanguageMutationResult = Apollo.MutationResult<DeleteLanguageMutation>;
export type DeleteLanguageMutationOptions = Apollo.BaseMutationOptions<DeleteLanguageMutation, DeleteLanguageMutationVariables>;
export const CreateLanguageDocument = gql`
    mutation CreateLanguage($data: LanguageInput!) {
  createLanguage(data: $data) {
    id
    name
  }
}
    `;
export type CreateLanguageMutationFn = Apollo.MutationFunction<CreateLanguageMutation, CreateLanguageMutationVariables>;

/**
 * __useCreateLanguageMutation__
 *
 * To run a mutation, you first call `useCreateLanguageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLanguageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLanguageMutation, { data, loading, error }] = useCreateLanguageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateLanguageMutation(baseOptions?: Apollo.MutationHookOptions<CreateLanguageMutation, CreateLanguageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLanguageMutation, CreateLanguageMutationVariables>(CreateLanguageDocument, options);
      }
export type CreateLanguageMutationHookResult = ReturnType<typeof useCreateLanguageMutation>;
export type CreateLanguageMutationResult = Apollo.MutationResult<CreateLanguageMutation>;
export type CreateLanguageMutationOptions = Apollo.BaseMutationOptions<CreateLanguageMutation, CreateLanguageMutationVariables>;
export const UpdateLanguageDocument = gql`
    mutation UpdateLanguage($data: UpdateLanguageInput!) {
  updateLanguage(data: $data) {
    id
    name
  }
}
    `;
export type UpdateLanguageMutationFn = Apollo.MutationFunction<UpdateLanguageMutation, UpdateLanguageMutationVariables>;

/**
 * __useUpdateLanguageMutation__
 *
 * To run a mutation, you first call `useUpdateLanguageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLanguageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLanguageMutation, { data, loading, error }] = useUpdateLanguageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateLanguageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLanguageMutation, UpdateLanguageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLanguageMutation, UpdateLanguageMutationVariables>(UpdateLanguageDocument, options);
      }
export type UpdateLanguageMutationHookResult = ReturnType<typeof useUpdateLanguageMutation>;
export type UpdateLanguageMutationResult = Apollo.MutationResult<UpdateLanguageMutation>;
export type UpdateLanguageMutationOptions = Apollo.BaseMutationOptions<UpdateLanguageMutation, UpdateLanguageMutationVariables>;
export const LikeDocument = gql`
    mutation Like($projectId: String!) {
  like(projectId: $projectId) {
    id
  }
}
    `;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, options);
      }
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
export const UnlikeDocument = gql`
    mutation Unlike($likeId: String!) {
  unlike(likeId: $likeId)
}
    `;
export type UnlikeMutationFn = Apollo.MutationFunction<UnlikeMutation, UnlikeMutationVariables>;

/**
 * __useUnlikeMutation__
 *
 * To run a mutation, you first call `useUnlikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikeMutation, { data, loading, error }] = useUnlikeMutation({
 *   variables: {
 *      likeId: // value for 'likeId'
 *   },
 * });
 */
export function useUnlikeMutation(baseOptions?: Apollo.MutationHookOptions<UnlikeMutation, UnlikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlikeMutation, UnlikeMutationVariables>(UnlikeDocument, options);
      }
export type UnlikeMutationHookResult = ReturnType<typeof useUnlikeMutation>;
export type UnlikeMutationResult = Apollo.MutationResult<UnlikeMutation>;
export type UnlikeMutationOptions = Apollo.BaseMutationOptions<UnlikeMutation, UnlikeMutationVariables>;
export const CreateCodeDocument = gql`
    mutation CreateCode($data: CodeInput!) {
  createCode(data: $data) {
    id
    content
    isReported
  }
}
    `;
export type CreateCodeMutationFn = Apollo.MutationFunction<CreateCodeMutation, CreateCodeMutationVariables>;

/**
 * __useCreateCodeMutation__
 *
 * To run a mutation, you first call `useCreateCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCodeMutation, { data, loading, error }] = useCreateCodeMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCodeMutation(baseOptions?: Apollo.MutationHookOptions<CreateCodeMutation, CreateCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCodeMutation, CreateCodeMutationVariables>(CreateCodeDocument, options);
      }
export type CreateCodeMutationHookResult = ReturnType<typeof useCreateCodeMutation>;
export type CreateCodeMutationResult = Apollo.MutationResult<CreateCodeMutation>;
export type CreateCodeMutationOptions = Apollo.BaseMutationOptions<CreateCodeMutation, CreateCodeMutationVariables>;
export const GetCodesDocument = gql`
    query getCodes {
  getCodes {
    id
    isReported
    content
    language {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCodesQuery__
 *
 * To run a query within a React component, call `useGetCodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCodesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCodesQuery(baseOptions?: Apollo.QueryHookOptions<GetCodesQuery, GetCodesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCodesQuery, GetCodesQueryVariables>(GetCodesDocument, options);
      }
export function useGetCodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCodesQuery, GetCodesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCodesQuery, GetCodesQueryVariables>(GetCodesDocument, options);
        }
export type GetCodesQueryHookResult = ReturnType<typeof useGetCodesQuery>;
export type GetCodesLazyQueryHookResult = ReturnType<typeof useGetCodesLazyQuery>;
export type GetCodesQueryResult = Apollo.QueryResult<GetCodesQuery, GetCodesQueryVariables>;
export const GetCodeforAProjectIdDocument = gql`
    query GetCodeforAProjectId($project: String!) {
  getCode(project: $project) {
    id
    content
    language {
      name
    }
    project {
      title
      id
    }
  }
}
    `;

/**
 * __useGetCodeforAProjectIdQuery__
 *
 * To run a query within a React component, call `useGetCodeforAProjectIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCodeforAProjectIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCodeforAProjectIdQuery({
 *   variables: {
 *      project: // value for 'project'
 *   },
 * });
 */
export function useGetCodeforAProjectIdQuery(baseOptions: Apollo.QueryHookOptions<GetCodeforAProjectIdQuery, GetCodeforAProjectIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCodeforAProjectIdQuery, GetCodeforAProjectIdQueryVariables>(GetCodeforAProjectIdDocument, options);
      }
export function useGetCodeforAProjectIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCodeforAProjectIdQuery, GetCodeforAProjectIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCodeforAProjectIdQuery, GetCodeforAProjectIdQueryVariables>(GetCodeforAProjectIdDocument, options);
        }
export type GetCodeforAProjectIdQueryHookResult = ReturnType<typeof useGetCodeforAProjectIdQuery>;
export type GetCodeforAProjectIdLazyQueryHookResult = ReturnType<typeof useGetCodeforAProjectIdLazyQuery>;
export type GetCodeforAProjectIdQueryResult = Apollo.QueryResult<GetCodeforAProjectIdQuery, GetCodeforAProjectIdQueryVariables>;
export const UpdateCodeDocument = gql`
    mutation UpdateCode($updateCodeId: String!, $content: String) {
  updateCode(id: $updateCodeId, content: $content) {
    content
    id
  }
}
    `;
export type UpdateCodeMutationFn = Apollo.MutationFunction<UpdateCodeMutation, UpdateCodeMutationVariables>;

/**
 * __useUpdateCodeMutation__
 *
 * To run a mutation, you first call `useUpdateCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCodeMutation, { data, loading, error }] = useUpdateCodeMutation({
 *   variables: {
 *      updateCodeId: // value for 'updateCodeId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateCodeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCodeMutation, UpdateCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCodeMutation, UpdateCodeMutationVariables>(UpdateCodeDocument, options);
      }
export type UpdateCodeMutationHookResult = ReturnType<typeof useUpdateCodeMutation>;
export type UpdateCodeMutationResult = Apollo.MutationResult<UpdateCodeMutation>;
export type UpdateCodeMutationOptions = Apollo.BaseMutationOptions<UpdateCodeMutation, UpdateCodeMutationVariables>;
export const MutationDocument = gql`
    mutation Mutation($data: NewProjectInput!) {
  createProject(data: $data) {
    id
    title
    isPublic
    codes {
      id
      content
      language {
        id
      }
    }
    user {
      id
    }
  }
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($data: NewProjectInput!) {
  createProject(data: $data) {
    title
    user {
      pseudo
      role
      id
      email
    }
    id
    isPublic
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const GetProjectByIdDocument = gql`
    query GetProjectById($getProjectId: String!) {
  getProject(id: $getProjectId) {
    id
    title
    isPublic
    codes {
      id
      content
      language {
        name
        id
        version
      }
    }
    user {
      id
      pseudo
    }
    likes {
      id
      user {
        id
        pseudo
      }
    }
    comments {
      id
      content
      user {
        id
        pseudo
      }
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetProjectByIdQuery__
 *
 * To run a query within a React component, call `useGetProjectByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectByIdQuery({
 *   variables: {
 *      getProjectId: // value for 'getProjectId'
 *   },
 * });
 */
export function useGetProjectByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
      }
export function useGetProjectByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectByIdQuery, GetProjectByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectByIdQuery, GetProjectByIdQueryVariables>(GetProjectByIdDocument, options);
        }
export type GetProjectByIdQueryHookResult = ReturnType<typeof useGetProjectByIdQuery>;
export type GetProjectByIdLazyQueryHookResult = ReturnType<typeof useGetProjectByIdLazyQuery>;
export type GetProjectByIdQueryResult = Apollo.QueryResult<GetProjectByIdQuery, GetProjectByIdQueryVariables>;
export const GetPaginateProjectsDocument = gql`
    query GetPaginateProjects($withUserProject: Boolean!, $isUser: Boolean!, $searchUser: String!, $searchProject: String!, $offset: Float!, $limit: Float!) {
  getPaginateProjects(
    withUserProject: $withUserProject
    isUser: $isUser
    searchUser: $searchUser
    searchProject: $searchProject
    offset: $offset
    limit: $limit
  ) {
    hasMore
    isUserSearch
    projects {
      id
      isPublic
      title
      createdAt
      user {
        pseudo
      }
    }
  }
}
    `;

/**
 * __useGetPaginateProjectsQuery__
 *
 * To run a query within a React component, call `useGetPaginateProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaginateProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaginateProjectsQuery({
 *   variables: {
 *      withUserProject: // value for 'withUserProject'
 *      isUser: // value for 'isUser'
 *      searchUser: // value for 'searchUser'
 *      searchProject: // value for 'searchProject'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetPaginateProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetPaginateProjectsQuery, GetPaginateProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaginateProjectsQuery, GetPaginateProjectsQueryVariables>(GetPaginateProjectsDocument, options);
      }
export function useGetPaginateProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaginateProjectsQuery, GetPaginateProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaginateProjectsQuery, GetPaginateProjectsQueryVariables>(GetPaginateProjectsDocument, options);
        }
export type GetPaginateProjectsQueryHookResult = ReturnType<typeof useGetPaginateProjectsQuery>;
export type GetPaginateProjectsLazyQueryHookResult = ReturnType<typeof useGetPaginateProjectsLazyQuery>;
export type GetPaginateProjectsQueryResult = Apollo.QueryResult<GetPaginateProjectsQuery, GetPaginateProjectsQueryVariables>;
export const ToggleProjectPublicStateDocument = gql`
    mutation ToggleProjectPublicState($projectId: String!) {
  toggleProjectPublicState(id: $projectId) {
    id
    isPublic
    title
  }
}
    `;
export type ToggleProjectPublicStateMutationFn = Apollo.MutationFunction<ToggleProjectPublicStateMutation, ToggleProjectPublicStateMutationVariables>;

/**
 * __useToggleProjectPublicStateMutation__
 *
 * To run a mutation, you first call `useToggleProjectPublicStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleProjectPublicStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleProjectPublicStateMutation, { data, loading, error }] = useToggleProjectPublicStateMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useToggleProjectPublicStateMutation(baseOptions?: Apollo.MutationHookOptions<ToggleProjectPublicStateMutation, ToggleProjectPublicStateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleProjectPublicStateMutation, ToggleProjectPublicStateMutationVariables>(ToggleProjectPublicStateDocument, options);
      }
export type ToggleProjectPublicStateMutationHookResult = ReturnType<typeof useToggleProjectPublicStateMutation>;
export type ToggleProjectPublicStateMutationResult = Apollo.MutationResult<ToggleProjectPublicStateMutation>;
export type ToggleProjectPublicStateMutationOptions = Apollo.BaseMutationOptions<ToggleProjectPublicStateMutation, ToggleProjectPublicStateMutationVariables>;
export const GetProjectsDocument = gql`
    query GetProjects {
  getProjects {
    id
    title
    isPublic
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($deleteProjectId: String!) {
  deleteProject(id: $deleteProjectId)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      deleteProjectId: // value for 'deleteProjectId'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const CreateReportingDocument = gql`
    mutation CreateReporting($data: NewReportInput!) {
  createReporting(data: $data) {
    id
  }
}
    `;
export type CreateReportingMutationFn = Apollo.MutationFunction<CreateReportingMutation, CreateReportingMutationVariables>;

/**
 * __useCreateReportingMutation__
 *
 * To run a mutation, you first call `useCreateReportingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReportingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReportingMutation, { data, loading, error }] = useCreateReportingMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateReportingMutation(baseOptions?: Apollo.MutationHookOptions<CreateReportingMutation, CreateReportingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReportingMutation, CreateReportingMutationVariables>(CreateReportingDocument, options);
      }
export type CreateReportingMutationHookResult = ReturnType<typeof useCreateReportingMutation>;
export type CreateReportingMutationResult = Apollo.MutationResult<CreateReportingMutation>;
export type CreateReportingMutationOptions = Apollo.BaseMutationOptions<CreateReportingMutation, CreateReportingMutationVariables>;
export const GetAllReportsDocument = gql`
    query GetAllReports {
  getAllReports {
    id
    content
    project {
      id
    }
    reportings {
      id
    }
  }
}
    `;

/**
 * __useGetAllReportsQuery__
 *
 * To run a query within a React component, call `useGetAllReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllReportsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllReportsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllReportsQuery, GetAllReportsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllReportsQuery, GetAllReportsQueryVariables>(GetAllReportsDocument, options);
      }
export function useGetAllReportsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllReportsQuery, GetAllReportsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllReportsQuery, GetAllReportsQueryVariables>(GetAllReportsDocument, options);
        }
export type GetAllReportsQueryHookResult = ReturnType<typeof useGetAllReportsQuery>;
export type GetAllReportsLazyQueryHookResult = ReturnType<typeof useGetAllReportsLazyQuery>;
export type GetAllReportsQueryResult = Apollo.QueryResult<GetAllReportsQuery, GetAllReportsQueryVariables>;
export const DeleteCommentAndLinkedReportDocument = gql`
    mutation DeleteCommentAndLinkedReport($deleteCommentAndLinkedReportId: String!) {
  deleteCommentAndLinkedReport(id: $deleteCommentAndLinkedReportId)
}
    `;
export type DeleteCommentAndLinkedReportMutationFn = Apollo.MutationFunction<DeleteCommentAndLinkedReportMutation, DeleteCommentAndLinkedReportMutationVariables>;

/**
 * __useDeleteCommentAndLinkedReportMutation__
 *
 * To run a mutation, you first call `useDeleteCommentAndLinkedReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentAndLinkedReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentAndLinkedReportMutation, { data, loading, error }] = useDeleteCommentAndLinkedReportMutation({
 *   variables: {
 *      deleteCommentAndLinkedReportId: // value for 'deleteCommentAndLinkedReportId'
 *   },
 * });
 */
export function useDeleteCommentAndLinkedReportMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentAndLinkedReportMutation, DeleteCommentAndLinkedReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentAndLinkedReportMutation, DeleteCommentAndLinkedReportMutationVariables>(DeleteCommentAndLinkedReportDocument, options);
      }
export type DeleteCommentAndLinkedReportMutationHookResult = ReturnType<typeof useDeleteCommentAndLinkedReportMutation>;
export type DeleteCommentAndLinkedReportMutationResult = Apollo.MutationResult<DeleteCommentAndLinkedReportMutation>;
export type DeleteCommentAndLinkedReportMutationOptions = Apollo.BaseMutationOptions<DeleteCommentAndLinkedReportMutation, DeleteCommentAndLinkedReportMutationVariables>;
export const CreatePaymentIntentDocument = gql`
    mutation CreatePaymentIntent($amount: Float!) {
  createPaymentIntent(amount: $amount) {
    clientSecret
    error
  }
}
    `;
export type CreatePaymentIntentMutationFn = Apollo.MutationFunction<CreatePaymentIntentMutation, CreatePaymentIntentMutationVariables>;

/**
 * __useCreatePaymentIntentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentIntentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentIntentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentIntentMutation, { data, loading, error }] = useCreatePaymentIntentMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useCreatePaymentIntentMutation(baseOptions?: Apollo.MutationHookOptions<CreatePaymentIntentMutation, CreatePaymentIntentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePaymentIntentMutation, CreatePaymentIntentMutationVariables>(CreatePaymentIntentDocument, options);
      }
export type CreatePaymentIntentMutationHookResult = ReturnType<typeof useCreatePaymentIntentMutation>;
export type CreatePaymentIntentMutationResult = Apollo.MutationResult<CreatePaymentIntentMutation>;
export type CreatePaymentIntentMutationOptions = Apollo.BaseMutationOptions<CreatePaymentIntentMutation, CreatePaymentIntentMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    role
    email
    pseudo
    executionCounter
    isPremium
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
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const GetExecutionCounterDocument = gql`
    query GetExecutionCounter {
  getExecutionCounter {
    executionCounter
    isPremium
  }
}
    `;

/**
 * __useGetExecutionCounterQuery__
 *
 * To run a query within a React component, call `useGetExecutionCounterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExecutionCounterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExecutionCounterQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExecutionCounterQuery(baseOptions?: Apollo.QueryHookOptions<GetExecutionCounterQuery, GetExecutionCounterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExecutionCounterQuery, GetExecutionCounterQueryVariables>(GetExecutionCounterDocument, options);
      }
export function useGetExecutionCounterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExecutionCounterQuery, GetExecutionCounterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExecutionCounterQuery, GetExecutionCounterQueryVariables>(GetExecutionCounterDocument, options);
        }
export type GetExecutionCounterQueryHookResult = ReturnType<typeof useGetExecutionCounterQuery>;
export type GetExecutionCounterLazyQueryHookResult = ReturnType<typeof useGetExecutionCounterLazyQuery>;
export type GetExecutionCounterQueryResult = Apollo.QueryResult<GetExecutionCounterQuery, GetExecutionCounterQueryVariables>;
export const SignUpDocument = gql`
    mutation SignUp($data: NewUserInput!) {
  createUser(data: $data) {
    email
    id
    pseudo
    role
    executionCounter
    isPremium
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

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
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($data: SigninInput!) {
  signin(data: $data)
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($deleteUserId: String!, $inAdminPanel: Boolean!) {
  deleteUser(id: $deleteUserId, inAdminPanel: $inAdminPanel)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      deleteUserId: // value for 'deleteUserId'
 *      inAdminPanel: // value for 'inAdminPanel'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetUserProfileDocument = gql`
    query GetUserProfile {
  getUserProfile {
    id
    role
    email
    pseudo
    executionCounter
    isPremium
  }
}
    `;

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
      }
export function useGetUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export type GetUserProfileQueryHookResult = ReturnType<typeof useGetUserProfileQuery>;
export type GetUserProfileLazyQueryHookResult = ReturnType<typeof useGetUserProfileLazyQuery>;
export type GetUserProfileQueryResult = Apollo.QueryResult<GetUserProfileQuery, GetUserProfileQueryVariables>;
export const IncrementExecutionCounterDocument = gql`
    mutation IncrementExecutionCounter($counter: ExecutionCounterInput!) {
  incrementExecutionCounter(counter: $counter)
}
    `;
export type IncrementExecutionCounterMutationFn = Apollo.MutationFunction<IncrementExecutionCounterMutation, IncrementExecutionCounterMutationVariables>;

/**
 * __useIncrementExecutionCounterMutation__
 *
 * To run a mutation, you first call `useIncrementExecutionCounterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementExecutionCounterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementExecutionCounterMutation, { data, loading, error }] = useIncrementExecutionCounterMutation({
 *   variables: {
 *      counter: // value for 'counter'
 *   },
 * });
 */
export function useIncrementExecutionCounterMutation(baseOptions?: Apollo.MutationHookOptions<IncrementExecutionCounterMutation, IncrementExecutionCounterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncrementExecutionCounterMutation, IncrementExecutionCounterMutationVariables>(IncrementExecutionCounterDocument, options);
      }
export type IncrementExecutionCounterMutationHookResult = ReturnType<typeof useIncrementExecutionCounterMutation>;
export type IncrementExecutionCounterMutationResult = Apollo.MutationResult<IncrementExecutionCounterMutation>;
export type IncrementExecutionCounterMutationOptions = Apollo.BaseMutationOptions<IncrementExecutionCounterMutation, IncrementExecutionCounterMutationVariables>;
export const UpdateUserIsPremiumDocument = gql`
    mutation UpdateUserIsPremium($isPremium: Boolean!) {
  updateUserIsPremium(isPremium: $isPremium)
}
    `;
export type UpdateUserIsPremiumMutationFn = Apollo.MutationFunction<UpdateUserIsPremiumMutation, UpdateUserIsPremiumMutationVariables>;

/**
 * __useUpdateUserIsPremiumMutation__
 *
 * To run a mutation, you first call `useUpdateUserIsPremiumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserIsPremiumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserIsPremiumMutation, { data, loading, error }] = useUpdateUserIsPremiumMutation({
 *   variables: {
 *      isPremium: // value for 'isPremium'
 *   },
 * });
 */
export function useUpdateUserIsPremiumMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserIsPremiumMutation, UpdateUserIsPremiumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserIsPremiumMutation, UpdateUserIsPremiumMutationVariables>(UpdateUserIsPremiumDocument, options);
      }
export type UpdateUserIsPremiumMutationHookResult = ReturnType<typeof useUpdateUserIsPremiumMutation>;
export type UpdateUserIsPremiumMutationResult = Apollo.MutationResult<UpdateUserIsPremiumMutation>;
export type UpdateUserIsPremiumMutationOptions = Apollo.BaseMutationOptions<UpdateUserIsPremiumMutation, UpdateUserIsPremiumMutationVariables>;
export const UpdateUsernameDocument = gql`
    mutation UpdateUsername($datas: UpdateUsernameInput!) {
  updateUsername(datas: $datas)
}
    `;
export type UpdateUsernameMutationFn = Apollo.MutationFunction<UpdateUsernameMutation, UpdateUsernameMutationVariables>;

/**
 * __useUpdateUsernameMutation__
 *
 * To run a mutation, you first call `useUpdateUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUsernameMutation, { data, loading, error }] = useUpdateUsernameMutation({
 *   variables: {
 *      datas: // value for 'datas'
 *   },
 * });
 */
export function useUpdateUsernameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUsernameMutation, UpdateUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUsernameMutation, UpdateUsernameMutationVariables>(UpdateUsernameDocument, options);
      }
export type UpdateUsernameMutationHookResult = ReturnType<typeof useUpdateUsernameMutation>;
export type UpdateUsernameMutationResult = Apollo.MutationResult<UpdateUsernameMutation>;
export type UpdateUsernameMutationOptions = Apollo.BaseMutationOptions<UpdateUsernameMutation, UpdateUsernameMutationVariables>;
export const UpdateUserPasswordDocument = gql`
    mutation UpdateUserPassword($datas: UpdatePasswordInput!) {
  updateUserPassword(datas: $datas)
}
    `;
export type UpdateUserPasswordMutationFn = Apollo.MutationFunction<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;

/**
 * __useUpdateUserPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPasswordMutation, { data, loading, error }] = useUpdateUserPasswordMutation({
 *   variables: {
 *      datas: // value for 'datas'
 *   },
 * });
 */
export function useUpdateUserPasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(UpdateUserPasswordDocument, options);
      }
export type UpdateUserPasswordMutationHookResult = ReturnType<typeof useUpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationResult = Apollo.MutationResult<UpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationOptions = Apollo.BaseMutationOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;