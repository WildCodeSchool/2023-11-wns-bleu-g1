import { Query } from "@/graphql/generated/schema";
import NotFoundAlert from "./not-found-alert";
import ProjectCard from "./project-card";

interface Props {
	projects: Query["getPublicsProjects"]["projects"];
	page: number;
	isPublic: boolean;
}

const ProjectsContainer = ({ projects, page, isPublic = false }: Props) => {
	return (
		<>
			{projects.length > 0 ? (
				<div>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
						{projects.map((project) => (
							<ProjectCard
								key={project.id}
								project={project}
								onProfilePage={isPublic}
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
		</>
	);
};

export default ProjectsContainer;
