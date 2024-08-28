import React, { PropsWithChildren } from "react";
import AuthHeader from "./auth-header";
import Head from "next/head";

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Head>
				<title>Wild Code Online</title>
			</Head>
			<AuthHeader />
			<section className="container py-8">{children}</section>
		</>
	);
};

export default AuthLayout;
