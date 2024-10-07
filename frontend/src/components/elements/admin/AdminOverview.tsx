import {
	useGetCommentsQuery,
	useGetLanguagesQuery,
	useGetProjectsQuery,
	useUsersQuery
} from "@/graphql/generated/schema";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

const AdminOverview = () => {
	const { data: userData } = useUsersQuery();
	 const users = userData?.users || [];
	 const adminUsers = users.filter((user: any) => user.role === "admin");
	 const visitorUsers = users.filter((user: any) => user.role === "visitor");
	 const lastRegisteredUser = users[users.length - 1];

	 const { data: languagesData } = useGetLanguagesQuery();
	 const languages = languagesData?.getLanguages || [];
	 const unusedLanguages = languages.filter((language: any) => language.codes.length === 0);

	 const { data: projectsData } = useGetProjectsQuery();
	 const projects = projectsData?.getProjects || [];
	 const publicProjects = projects.filter((project: any) => project.isPublic === true);

	 const { data } = useGetCommentsQuery();
	 const comments = data?.getComments || [];
	 const todaysComments = comments.filter((comment: any) => {
	  const commentDate = new Date(comment.createdAt).toISOString().split("T")[0];
	  const todayDate = new Date().toISOString().split("T")[0];
	  return commentDate === todayDate;
	});

	return (
		<>
			<Card className="w-full grid grid-rows-2 grid-cols-2 gap-4">
				<Card>
					<CardHeader>
						<CardTitle className="flex justify-center">Utilisateurs</CardTitle>
					</CardHeader>
					<CardContent className="flex">
						<div>
							Il y a actuellement {users.length} d'enregistrés <br/>
							{adminUsers.length} admin <br/>
							{visitorUsers.length} utilisateurs
						</div>
						<div>

						</div>
					</CardContent>
					<CardFooter>Dernier inscrit: {lastRegisteredUser?.pseudo} ({lastRegisteredUser?.role})</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex justify-center">Langages</CardTitle>
					</CardHeader>

					<CardContent>Il y a actuellement {languages.length} langages configurés <br/></CardContent>
					<CardFooter>{unusedLanguages.length} langages sans projets</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex justify-center">Projets</CardTitle>
					</CardHeader>

					<CardContent>Il y a actuellement {projects.length} sur le site</CardContent>
					<CardFooter>{publicProjects.length} sont publics</CardFooter>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle className="flex justify-center">Commentaires</CardTitle>
					</CardHeader>

					<CardContent>il y a {comments.length} actuellement</CardContent>
					<CardFooter>{todaysComments.length} {todaysComments.length > 1 ? "datent" : "date"} d'aujourd'hui</CardFooter>
				</Card>
			</Card>
		</>
	);
};

export default AdminOverview;
