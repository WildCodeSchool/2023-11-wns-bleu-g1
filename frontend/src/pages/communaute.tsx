import { useState } from "react";

import CustomPagination from "@/components/custom-pagination";
import AuthLayout from "@/components/elements/auth-layout";
import PageLoader from "@/components/elements/page-loader";
import ProjectsContainer from "@/components/elements/ProjectsContainer";
import { Separator } from "@/components/ui/separator";
import { useGetPublicsProjectsQuery } from "@/graphql/generated/schema";
import SearchBar from "@/components/elements/SearchBar";

const CommunautePage = () => {
	const [page, setPage] = useState(0);

	const limit = 12;
	const offset = page * limit;

	const getPublicProjectsQuery = useGetPublicsProjectsQuery({
		variables: {
			limit,
			offset,
			searchUser: "",
			searchProject: "",
		},
	});

	if (getPublicProjectsQuery.loading) return <PageLoader />;

	if (getPublicProjectsQuery.error) {
		console.error(getPublicProjectsQuery.error);
		return;
	}

	const data = getPublicProjectsQuery.data?.getPublicsProjects;

	const projects = data?.projects || [];

	return (
		<AuthLayout>
			<div className="space-y-0.5 flex justify-between">
				<SearchBar />
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Communauté</h1>
					<p className="text-muted-foreground">
						Retrouves les projets des autres utilisateurs. Tu peux les
						consulter, mettre un j&apos;aime ou même des commentaires.
					</p>
				</div>
			</div>

			<Separator className="my-6" />

			<ProjectsContainer projects={projects} page={page} />

			<CustomPagination
				page={page}
				setPage={setPage}
				limit={limit}
				hasMore={data?.hasMore || false}
				dataLength={projects.length}
				query={getPublicProjectsQuery}
			/>
		</AuthLayout>
	);
};

export default CommunautePage;
