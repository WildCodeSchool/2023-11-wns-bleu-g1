import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Comment } from "@/graphql/generated/schema";
import { elapsedTime } from "@/lib/utils";
import React from "react";

interface Props {
	comment: Omit<Comment, "project">;
	userId: string;
}

export const CommentCard = ({ comment, userId }: Props) => {
	return (
		<div className="flex space-x-2 bg-foreground/5 py-3 pl-2 pr-4 w-fit rounded-lg">
			<div className="flex-shrink-0">
				<Avatar className="w-8 h-8">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback className="text-4xl">
						{comment.user.pseudo[0].toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</div>
			<div className="flex flex-col">
				<span className="font-bold">
					{comment.user.id === userId ? "Moi" : comment.user.pseudo}
				</span>
				<p>{comment.content}</p>
				<p className="text-xs text-gray-500 mt-2">
					{elapsedTime(comment.createdAt)}
				</p>
			</div>
		</div>
	);
};
