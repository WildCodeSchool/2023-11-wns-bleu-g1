import { MessageCircleWarning } from "lucide-react";
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

interface Props {
	title: string;
	description: string;
	callToAction?: JSX.Element;
}
const NotFoundAlert = ({ title, description, callToAction }: Props) => {
	return (
		<Alert>
			<MessageCircleWarning className="h-4 w-4" />
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription>{description}</AlertDescription>
			{callToAction}
		</Alert>
	);
};

export default NotFoundAlert;
