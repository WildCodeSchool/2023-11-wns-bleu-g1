import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import {
	GetProjectByIdDocument,
	useDeleteCommentMutation,
} from "@/graphql/generated/schema";
import { elapsedTime } from "@/lib/utils";
import { ApolloError } from "@apollo/client";
import { BadgeCheck, CircleAlert, Ellipsis } from "lucide-react";

interface Props {
	projectId: string;
	comment: {
		id: string;
		content: string;
		user: {
			id: string;
			pseudo: string;
		};
		updatedAt: Date;
		createdAt: Date;
	};
	userId: string;
}

export const CommentCard = ({ projectId, comment, userId }: Props) => {
	const { toast } = useToast();

	const [deleteCommentMutation, deleteCommentMutationResult] =
		useDeleteCommentMutation({
			onCompleted: () => {
				toast({
					icon: <BadgeCheck className="h-5 w-5" />,
					title: "Votre commentaire a été supprimé !",
					className: "text-success",
				});
			},
			refetchQueries: [
				{
					query: GetProjectByIdDocument,
					variables: {
						getProjectId: projectId,
					},
				},
			],
			onError: (err: ApolloError) => {
				console.error(err);
				toast({
					icon: <CircleAlert className="h-5 w-5" />,
					title:
						"Une erreur est survenue lors de la suppression du commentaire !",
					className: "text-error",
				});
			},
		});

	const deleteComment = () => {
		deleteCommentMutation({
			variables: {
				commentId: comment.id,
			},
		});
	};

	return (
		<div className="flex gap-2 bg-foreground/5 py-3 pl-2 pr-4 w-full rounded-lg">
			<div className="flex-shrink-0">
				<Avatar className="w-8 h-8">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback className="text-4xl">
						{comment.user.pseudo[0].toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</div>
			<div className="flex flex-col grow">
				<span className="font-bold">
					{comment.user.id === userId ? "Moi" : comment.user.pseudo}
				</span>

				<p>{comment.content}</p>

				<p className="text-xs text-gray-500 mt-2 ">
					{elapsedTime(comment.createdAt)}
				</p>
			</div>
			{comment.user.id === userId && (
				<DropdownMenu>
					<DropdownMenuTrigger
						disabled={deleteCommentMutationResult.loading}
						className={buttonVariants({ variant: "ghost", size: "icon" })}
					>
						<Ellipsis className="h-6 w-6" />
					</DropdownMenuTrigger>
					<DropdownMenuContent sideOffset={0} side="top">
						<DropdownMenuItem onClick={deleteComment}>Retirer</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	);
};
