import React from "react";
import { CommentCard } from "./comment-card";
import { Comment } from "@/graphql/generated/schema";

interface Props {
	project: {
		id: string;
		comments: Comment[];
	};
	userId: string;
}
export const CommentsSection = ({ project, userId }: Props) => {
	return (
		<div className="space-y-3 my-4 ">
			{project.comments.map((comment) => (
				<CommentCard key={comment.id} comment={comment} userId={userId} />
			))}
		</div>
	);
};
