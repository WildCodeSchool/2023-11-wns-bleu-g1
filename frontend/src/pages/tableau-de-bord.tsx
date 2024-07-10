import AuthLayout from "@/components/elements/auth-layout";
import PageLoader from "@/components/elements/page-loader";
import UserHeadCard from "@/components/elements/user-head-card";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	useGetMyProjectsQuery,
	useGetUserProfileQuery,
} from "@/graphql/generated/schema";
import Link from "next/link";

const DashboardPage = () => {
	const getUserProfileQuery = useGetUserProfileQuery();
	const getMyProjectsQuery = useGetMyProjectsQuery();

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
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
					{projects.map((project) => (
						<Card key={project.id}>
							<CardHeader>
								<CardTitle>{project.title}</CardTitle>
								<CardDescription>
									Crée le{" "}
									{new Date(project.createdAt).toLocaleString("fr-FR", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Link href={`/coding/${project.id}`} className={buttonVariants()}>
									Voir le projet
								</Link>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</AuthLayout>
	);
};

export default DashboardPage;
