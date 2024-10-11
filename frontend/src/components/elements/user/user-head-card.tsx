import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	GetUserProfileQuery,
	useGetUserProjectsCountQuery,
	useGetUserLikesCountQuery,
	useGetUserCommentsCountQuery,
} from "@/graphql/generated/schema";
import router from "next/router";
import React, { useEffect }  from "react";

interface Props {
	profile: GetUserProfileQuery["getUserProfile"] | null;
}
const UserHeadCard = ({ profile }: Props) => {
	const getUserProjectsCountQuery = useGetUserProjectsCountQuery();
	const getUserLikesCountQuery = useGetUserLikesCountQuery();
	const getUserCommentsCountQuery = useGetUserCommentsCountQuery();

	useEffect(() => {
		const handleRouteChange = () => {
			getUserProjectsCountQuery.refetch();
			getUserLikesCountQuery.refetch();
			getUserCommentsCountQuery.refetch();
		};

		// Add event listener to handle route change
		router.events.on("routeChangeComplete", handleRouteChange);

		// Clean up event listener on component unmount
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	});

	if (!profile) return null;

	const projects = getUserProjectsCountQuery?.data?.getUserProjectsCount || 0;
	const likes = getUserLikesCountQuery?.data?.getUserLikesCount || 0;
	const comments = getUserCommentsCountQuery?.data?.getUserCommentsCount || 0;

	return (
		<div className="flex flex-col sm:flex-row sm:items-center sm:justify-around gap-8 pb-8">
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
						{projects}
					</div>
					<span className="text-lg">Projets</span>
				</div>
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-lg text-background font-semibold">
						{likes}
					</div>
					<span className="text-lg">Likes</span>
				</div>
				<div className="flex items-center gap-3">
					<div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-lg text-background font-semibold">
						{comments}
					</div>
					<span className="text-lg">Commentaires</span>
				</div>
			</div>
		</div>
	);
};

export default UserHeadCard;
