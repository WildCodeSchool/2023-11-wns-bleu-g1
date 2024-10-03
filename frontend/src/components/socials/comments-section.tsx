import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { elapsedTime } from "@/lib/utils";

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
	console.log("project", project);
	console.log("userId", userId);
	return (
		<div className="space-y-3 my-4 ">
			{project.comments.map((comment) => (
				<div
					key={comment.id}
					className="flex space-x-2 bg-foreground/5 py-3 pl-2 pr-4 w-fit rounded-lg"
				>
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
						{/* convert date to 1 hour ago for example */}
						<p className="text-xs text-gray-500 mt-2">
							{elapsedTime(comment.createdAt)}
						</p>
					</div>
				</div>
			))}
		</div>
	);
	// return (
	// 	<div className="space-y-3 my-4 ">
	// 		{project.comments.map((comment) => (
	// 			<div
	// 				key={comment.id}
	// 				className="flex space-x-2 bg-gray-700 py-3 pl-2 pr-4 w-fit rounded-lg"
	// 			>
	// 				<div className="flex-shrink-0">
	// 					<Avatar className="w-8 h-8">
	// 						<AvatarImage src="https://github.com/shadcn.png" />
	// 						<AvatarFallback className="text-4xl">
	// 							{comment.user.pseudo[0].toUpperCase()}
	// 						</AvatarFallback>
	// 					</Avatar>
	// 				</div>
	// 				<div className="flex flex-col">
	// 					<span className="font-bold">
	// 						{comment.user.id === userId ? "Moi" : comment.user.pseudo}
	// 					</span>
	// 					<p>{comment.content}</p>
	// 					{/* convert date to 1 hour ago for example */}
	// 					<p className="text-xs text-gray-500 mt-2">
	// 						{elapsedTime(comment.createdAt)}
	// 					</p>
	// 				</div>
	// 			</div>
	// 		))}
	// 	</div>
	// );
};
