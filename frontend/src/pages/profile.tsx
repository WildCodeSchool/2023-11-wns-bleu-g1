import CustomPagination from "@/components/custom-pagination";
import AuthLayout from "@/components/elements/auth-layout";
import NotFoundAlert from "@/components/elements/not-found-alert";
import PageLoader from "@/components/elements/page-loader";
import ProjectCard from "@/components/elements/project-card";
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
	const projects = getMyProjectsQuery?.data?.getMyProjects || [];

	return (
		<AuthLayout>
			<div className="py-8 space-y-8">
				<UserHeadCard profile={profile} />
				<h3 className="text-2xl font-semibold">Mes Projets</h3>
				{projects.length > 0 ? (
					<div>
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
							{projects.map((project) => (
								<ProjectCard key={project.id} project={project} onProfilePage />
							))}
						</div>
					</div>
				) : page > 0 ? (
					<NotFoundAlert
						title="Vous n'avez pas d'autres projets"
						description='Vous pouvez revenir en arrière en cliquant sur le bouton "Précédent"'
					/>
				) : (
					<NotFoundAlert
						title="Vous n'avez pas encore de projet"
						description='Vous pouvez en créer un en cliquant sur le bouton "Nouveau
					projet"'
					/>
				)}
				<CustomPagination
					page={page}
					setPage={setPage}
					limit={limit}
					dataLength={projects.length}
					query={getMyProjectsQuery}
				/>
			</div>
		</AuthLayout>
	);
};

export default ProfilPage;
