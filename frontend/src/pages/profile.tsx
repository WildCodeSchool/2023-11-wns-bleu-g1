import CustomPagination from "@/components/custom-pagination";
import AuthLayout from "@/components/elements/auth-layout";
import NotFoundAlert from "@/components/elements/not-found-alert";
import PageLoader from "@/components/elements/page-loader";
import ProjectCard from "@/components/elements/project-card";
import ProjectsContainer from "@/components/elements/ProjectsContainer";
import UserHeadCard from "@/components/elements/user-head-card";
import {
	useGetMyProjectsQuery,
	useGetUserProfileQuery,
} from "@/graphql/generated/schema";
import { useState } from "react";

const ProfilPage = () => {
	const [page, setPage] = useState(0);
	const limit = 12;
	const offset = page * limit;

	const getUserProfileQuery = useGetUserProfileQuery();
	const getMyProjectsQuery = useGetMyProjectsQuery({
		variables: {
			limit,
			offset,
		},
		notifyOnNetworkStatusChange: true,
	});

	if (getUserProfileQuery.loading || getMyProjectsQuery.loading)
		return <PageLoader />;

	if (getUserProfileQuery.error || getMyProjectsQuery.error)
		console.error(getUserProfileQuery.error || getMyProjectsQuery.error);

	const profile = getUserProfileQuery?.data?.getUserProfile || null;
	const data = getMyProjectsQuery.data?.getMyProjects;

	const projects = data?.projects || [];

	return (
		<AuthLayout>
			<div className="py-8 space-y-8">
				<UserHeadCard profile={profile} />
				<h3 className="text-2xl font-semibold">Mes Projets</h3>

				<ProjectsContainer projects={projects} page={page} isPublic />

				<CustomPagination
					page={page}
					setPage={setPage}
					limit={limit}
					hasMore={data?.hasMore || false}
					dataLength={projects.length}
					query={getMyProjectsQuery}
				/>
			</div>
		</AuthLayout>
	);
};

export default ProfilPage;
