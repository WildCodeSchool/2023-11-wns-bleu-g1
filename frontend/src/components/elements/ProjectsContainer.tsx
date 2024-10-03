import { useRouter } from "next/router";

import { useGetPaginateProjectsQuery } from "@/graphql/generated/schema";
import NotFoundAlert from "./not-found-alert";
import ProjectCard from "./project-card";
import { useState } from "react";
import CustomPagination from "../custom-pagination";
import PageLoader from "./page-loader";

interface Props {
	searchUser?: string;
	searchProject: string;
	withUserProject?: boolean;
}

const ProjectsContainer = ({
	searchUser = "",
	searchProject,
	withUserProject = false,
}: Props) => {
	const { pathname } = useRouter();

	const [page, setPage] = useState(0);

	const limit = 12;
	const offset = page * limit;
	const isUser = pathname === "/profile";

	const getPaginateProjectsQuery = useGetPaginateProjectsQuery({
		variables: {
			limit,
			offset,
			searchUser,
			searchProject,
			isUser,
			withUserProject,
		},
		fetchPolicy: "no-cache",
	});

	if (getPaginateProjectsQuery.loading) return <PageLoader />;

	if (getPaginateProjectsQuery.error) {
		console.error(getPaginateProjectsQuery.error);
		return;
	}

	const data = getPaginateProjectsQuery.data?.getPaginateProjects;
	const projects = data?.projects || [];

	const chooseTitle = data?.isUserSearch
		? "notFound"
		: pathname === "/profile"
			? "noProjectYet"
			: "noPublicProjectYet";

	return (
		<>
			<>
				{projects.length > 0 ? (
					<div>
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
							{projects.map((project) => (
								<ProjectCard
									key={project.id}
									project={project}
									onProfilePage={isUser}
								/>
							))}
						</div>
					</div>
				) : page > 0 ? (
					<NotFoundAlert title="noOtherProjects" />
				) : (
					<NotFoundAlert title={chooseTitle} />
				)}
			</>

			{projects.length > 0 && (
				<CustomPagination
					page={page}
					setPage={setPage}
					limit={limit}
					hasMore={data?.hasMore || false}
					dataLength={projects.length}
					query={getPaginateProjectsQuery}
				/>
			)}
		</>
	);
};

export default ProjectsContainer;
