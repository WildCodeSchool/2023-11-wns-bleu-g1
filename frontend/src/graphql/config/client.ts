import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";

const uri = process.env.NEXT_PUBLIC_GRAPHQL_API_URL;

const client = new ApolloClient({
	link: createHttpLink({
		uri: uri || "/graphql",
		fetch,
		credentials: "include",
	}),
	cache: new InMemoryCache({
		addTypename: false,
	}),
	credentials: "include",
});

export default client;
