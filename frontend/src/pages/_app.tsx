import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import client from "@/graphql/config/client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

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
