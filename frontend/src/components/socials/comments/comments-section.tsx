import { CommentCard } from "./comment-card";

interface Props {
	project: {
		id: string;
		comments: {
			id: string;
			content: string;
			user: {
				id: string;
				pseudo: string;
			};
			createdAt: Date;
			updatedAt: Date;
		}[];
	};
	userId: string;
}
export const CommentsSection = ({ project, userId }: Props) => {
	return (
		<div className="space-y-3 my-4 ">
			{project.comments.map((comment) => (
				<CommentCard
					key={comment.id}
					comment={comment}
					userId={userId}
					projectId={project.id}
				/>
			))}
		</div>
	);
};
