import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/graphql/generated/schema";
import React from "react";

interface Props {
	profile: User | null;
}
const UserHeadCard = ({ profile }: Props) => {
	if (!profile) return null;
	return (
		<div className="flex flex-col sm:flex-row sm:items-center sm:justify-around gap-6">
			<div className="flex justify-center gap-6">
				<Avatar className="w-24 h-24">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback className="text-4xl">
						{profile?.pseudo[0].toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col gap-4">
					<span className="text-4xl">{profile?.pseudo}</span>
					<Badge variant={"destructive"} className="capitalize w-fit">
						{profile?.role}
					</Badge>
				</div>
			</div>
			<div className="grid lg:grid-cols-3 gap-3 lg:gap-1">
				{/* @Todo : Vraies données à remplacer  */}
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-lg text-background font-semibold">
						58
					</div>
					<span className="text-lg">Projets</span>
				</div>
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-lg text-background font-semibold">
						125
					</div>
					<span className="text-lg">Likes</span>
				</div>
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-lg text-background font-semibold">
						58
					</div>
					<span className="text-lg">Commentaires</span>
				</div>
			</div>
		</div>
	);
};

export default UserHeadCard;
