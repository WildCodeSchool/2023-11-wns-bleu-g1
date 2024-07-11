import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app";

const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "/graphql",
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					getPublicsProjects: {
						read(
							existing,
							{
								args,
							}: {
								args: { offset?: number; limit?: number } | null;
							}
						) {
							const { offset = 0, limit = existing.length } = args || {};
							return existing && existing.slice(offset, offset + limit);
						},
						keyArgs: [],
						merge(
							existing,
							incoming,
							{
								args,
							}: {
								args: { offset?: number } | null;
							}
						) {
							const { offset = 0 } = args || {};
							const merged = existing ? existing.slice(0) : [];
							for (let i = 0; i < incoming.length; ++i) {
								merged[offset + i] = incoming[i];
							}
							return merged;
						},
					},
				},
			},
		},
		addTypename: false,
	}),
	credentials: "include",
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				forcedTheme="dark"
				enableSystem
				disableTransitionOnChange
			>
				<Component {...pageProps} />
				<Toaster />
			</ThemeProvider>
		</ApolloProvider>
	);
}
