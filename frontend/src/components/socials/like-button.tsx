import React from "react";
import { Button } from "../ui/button";
import {
	GetProjectByIdDocument,
	GetProjectByIdQuery,
	Project,
	useLikeMutation,
	useUnlikeMutation,
} from "@/graphql/generated/schema";
import { Heart } from "lucide-react";

interface Props {
	project: Project | GetProjectByIdQuery["getProject"];
	userId: string;
}

const LikeButton = ({ project, userId }: Props) => {
	const [likeMutation] = useLikeMutation({
		refetchQueries: [
			{
				query: GetProjectByIdDocument,
				variables: {
					getProjectId: project.id,
				},
			},
		],
	});
	const [unlikeMutation] = useUnlikeMutation({
		refetchQueries: [
			{
				query: GetProjectByIdDocument,
				variables: {
					getProjectId: project.id,
				},
			},
		],
	});

	const alreadyLiked = project?.likes.find((like) => like.user.id === userId);

	const handleLike = (projectId: string) => {
		if (!projectId) {
			console.error("No project id found!");
			return;
		}

		if (alreadyLiked) {
			unlikeMutation({
				variables: {
					likeId: alreadyLiked.id,
				},
			});
		} else {
			likeMutation({
				variables: {
					projectId,
				},
			});
		}
	};

	return (
		<Button
			size={"sm"}
			variant={"ghost"}
			className="gap-2 items-center"
			title={alreadyLiked ? "Je n'aime plus" : "J'aime"}
			onClick={() => handleLike(project?.id)}
		>
			<Heart className={alreadyLiked && "text-primary fill-primary"} />
			{project?.likes.length}
			<span className="sr-only">Mettre un j&apos;aime</span>
		</Button>
	);
};

export default LikeButton;
