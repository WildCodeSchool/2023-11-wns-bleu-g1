import { useGetProjectsQuery } from "@/graphql/generated/schema";
import { Separator } from "@radix-ui/react-menu";
import { Button, buttonVariants } from "@/components/ui/button";

const AdminProjects = () => {
	const { data } = useGetProjectsQuery();
	const projects = data?.getProjects || [];
	console.log("projects: ", projects);

	return (
		<>
			<h1 className="flex w-full justify-center text-2xl font-bold">
				Administration des projets
			</h1>
			<div className="pt-2 w-full flex justify-center mt-5">
				<div
					className="flex flex-col justify-center w-1/3 border border-white rounded-xl px-3 pb-4 pt-2"
					id="languagesListSection"
				>
					<h2>Liste des projets:</h2>
					<Separator />
					{projects.map((project) => (
						<div key={project.id} className="flex justify-between py-1">
							<p className="flex w-full items-center text-center">
								{project.title}
							</p>
							<div className="flex gap-2">
								<Button variant="destructive">Supprimer</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default AdminProjects;
