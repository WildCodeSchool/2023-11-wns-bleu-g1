import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { AppProps } from "next/app";

const client = new ApolloClient({
	uri: "http://localhost:4000/",
	cache: new InMemoryCache({
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
