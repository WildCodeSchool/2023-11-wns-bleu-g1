import { Loader2 } from "lucide-react";
import React from "react";

const PageLoader = () => {
	return (
		<div className="w-full min-h-screen flex items-center justify-center">
			<Loader2 className="h-10 w-10 animate-spin" />
		</div>
	);
};

export default PageLoader;
