import { useMemo, useState } from "react";

import { MessageCircleWarning } from "lucide-react";
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

const Title = {
	noOtherProjects: "Vous n'avez pas d'autres projets",
	noProjectYet: "Vous n'avez pas encore de projet",
	noPublicProjectYet: "Aucun projet public crée pour le moment",
	notFound: "Aucun projets n'a été trouvé",
} as const;

type TitleType = keyof typeof Title;

interface Props {
	title: TitleType;
	callToAction?: JSX.Element;
}
const NotFoundAlert = ({ title, callToAction }: Props) => {
	const { noOtherProjects, noProjectYet, notFound, noPublicProjectYet } = Title;

	const [description, setDescription] = useState("");

	const titleChoose = useMemo(() => {
		switch (title) {
			case "noOtherProjects":
				setDescription(
					'Vous pouvez revenir en arrière en cliquant sur le bouton "Précédent"'
				);
				return noOtherProjects;
			case "noProjectYet":
				setDescription(
					'Vous pouvez en créer un en cliquant sur le bouton "Nouveau projet"'
				);
				return noProjectYet;
			case "notFound":
				setDescription(notFound);
				return notFound;
			case "noPublicProjectYet":
				setDescription(noPublicProjectYet);
				return noPublicProjectYet;
		}
	}, [title, noOtherProjects, noProjectYet, notFound, noPublicProjectYet]);

	return (
		<Alert>
			<MessageCircleWarning className="h-4 w-4" />
			<AlertTitle>{titleChoose}</AlertTitle>
			<AlertDescription>{description}</AlertDescription>
			{callToAction}
		</Alert>
	);
};

export default NotFoundAlert;
