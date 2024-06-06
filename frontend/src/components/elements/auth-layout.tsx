import React, { PropsWithChildren } from "react";
import AuthHeader from "./auth-header";

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<AuthHeader />
			<section className="container">{children}</section>
		</>
	);
};

export default AuthLayout;
