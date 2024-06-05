import React, { PropsWithChildren } from "react";
import AuthHeader from "./auth-header";

const AuthLayout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<AuthHeader />
			{children}
		</>
	);
};

export default AuthLayout;
