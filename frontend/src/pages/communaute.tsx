import CustomPagination from "@/components/custom-pagination";
import AuthLayout from "@/components/elements/auth-layout";
import NotFoundAlert from "@/components/elements/not-found-alert";
import PageLoader from "@/components/elements/page-loader";
import ProjectCard from "@/components/elements/project-card";
import { Separator } from "@/components/ui/separator";
import { useGetPublicsProjectsQuery } from "@/graphql/generated/schema";
import { useState } from "react";

const CommunautePage = () => {
	const [page, setPage] = useState(0);
	const limit = 12;
	const offset = page * limit;

	const getPublicProjectsQuery = useGetPublicsProjectsQuery({
		variables: {
			limit,
			offset,
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
			<div className="space-y-0.5">
				<h1 className="text-2xl font-bold tracking-tight">Communauté</h1>
				<p className="text-muted-foreground">
					Retrouves les projets des autres utilisateurs. Tu peux les consulter,
					mettre un j&apos;aime ou même des commentaires.
				</p>
			</div>
			<Separator className="my-6" />
			{projects.length > 0 ? (
				<div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
						{projects.map((project) => (
							<ProjectCard
								key={project.id}
								project={project}
								onProfilePage={false}
							/>
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
			{/* PAGINATION */}
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
