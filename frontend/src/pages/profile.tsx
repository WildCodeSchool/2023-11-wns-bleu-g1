import CustomPagination from "@/components/custom-pagination";
import AuthLayout from "@/components/elements/auth-layout";
import NotFoundAlert from "@/components/elements/not-found-alert";
import PageLoader from "@/components/elements/page-loader";
import ProjectCard from "@/components/elements/project-card";
import UserHeadCard from "@/components/elements/user-head-card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {Button, buttonVariants} from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	useDeleteUserMutation,
	useGetMyProjectsQuery,
	useGetUserProfileQuery,
} from "@/graphql/generated/schema";
// import { useState } from "react";
import {BadgeCheck, MessageCircleWarning} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/router";
import {useToast} from "@/components/ui/use-toast";
import {ApolloError} from "@apollo/client";
import {useState} from "react";

const ProfilPage = () => {
	const [page, setPage] = useState(0);
	const limit = 12;
	const offset = page * limit;

	const defaultErrorMessage =
		"Une erreur est survenue lors de la suppression. Veuillez réessayer.";
	const router = useRouter();
	const getUserProfileQuery = useGetUserProfileQuery();
	const getMyProjectsQuery = useGetMyProjectsQuery({
		variables: {
			limit,
			offset,
		},
		notifyOnNetworkStatusChange: true,
	});
	const [errorMessage, setErrorMessage] = useState<string>(defaultErrorMessage);
	const { toast } = useToast();
	const [deleteUserMutation, deleteUserResult] = useDeleteUserMutation({
		onCompleted: (data) => {
			toast({
				icon: <BadgeCheck className="h-5 w-5" />,
				title: "Utilisateur supprimé",
				className: "text-success",
			});
			router.push("/auth/inscription");

		},
		onError: (err: ApolloError) => {
			console.error(err);
			if (err.message.includes("not register")) {
				setErrorMessage("Aucun n'est lié à cette adresse email.");
				return;
			}
			if (err.message.includes("invalid password")) {
				setErrorMessage("Les identifiants sont incorrects.");
				return;
			}
			setErrorMessage(defaultErrorMessage);
		},
	});

	// console.log("getUserProfileQuery: ", getUserProfileQuery);
	if (getUserProfileQuery.loading || getMyProjectsQuery.loading)
		return <PageLoader />;

	if (getUserProfileQuery.error || getMyProjectsQuery.error)
		console.error('1 ',getUserProfileQuery.error || getMyProjectsQuery.error);

	const profile = getUserProfileQuery?.data?.getUserProfile || null;
	const data = getMyProjectsQuery.data?.getMyProjects;

	const projects = data?.projects || [];

	function deleteAccount() {
		console.log("button clicked");
		if (!profile) return;
		deleteUserMutation({
			variables: {
				deleteUserId: profile.id,
			},
		});
	}

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
					hasMore={data?.hasMore || false}
					dataLength={projects.length}
					query={getMyProjectsQuery}
				/>
			</div>
			<div>
				<Card>
					<CardHeader>
						<CardTitle>Paramètres de compte</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col space-y-3">
						<Link href="#" className={buttonVariants({ variant: "secondary2"})}>
							Modifier mon nom d'utilisateur
						</Link>
						<Link href="#" className={buttonVariants({ variant: "secondary2"})}>
							Modifier mon mot de passe
						</Link>
						<Button className={buttonVariants({ variant: "destructive"})} onClick={deleteAccount}>
							Supprimer mon compte
						</Button>
					</CardContent>
				</Card>
			</div>
		</AuthLayout>
);
};

export default ProfilPage;
