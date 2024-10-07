import React from "react";
import { Button } from "../../ui/button";
import { MessageCircle } from "lucide-react";

interface Props {
	commentsLength: number;
}
export const CommentButton = ({ commentsLength }: Props) => {
	return (
		<Button
			size={"sm"}
			variant={"ghost"}
			className="gap-2 items-center cursor-default pointer-events-none"
			title={"Commentaires"}
		>
			<MessageCircle />
			{commentsLength}
		</Button>
	);
};
