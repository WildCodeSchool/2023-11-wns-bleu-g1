import CustomPagination from "@/components/custom-pagination";
import AuthLayout from "@/components/elements/auth-layout";
import NotFoundAlert from "@/components/elements/not-found-alert";
import PageLoader from "@/components/elements/page-loader";
import ProjectCard from "@/components/elements/project-card";
import UserHeadCard from "@/components/elements/user-head-card";
import {Button, buttonVariants} from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	useGetMyProjectsQuery,
	useGetUserProfileQuery,
} from "@/graphql/generated/schema";
import Link from "next/link";
import {useState} from "react";
import {AlertDialog, AlertDialogContent, AlertDialogTrigger} from "@/components/ui/alert-dialog";
import {ConfirmDeletePopUp} from "@/components/elements/ConfirmDeletePopUp";
import {ChangeUsernamePopup} from "@/components/elements/ChangeUsernamePopup";
import {ChangeUserPassword} from "@/components/elements/ChangeUserPassword";

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
		console.error('1 ',getUserProfileQuery.error || getMyProjectsQuery.error);

	const profile = getUserProfileQuery?.data?.getUserProfile || null;
	const data = getMyProjectsQuery.data?.getMyProjects;
	console.log("profile: ", profile);
	const projects = data?.projects || [];

	return (
		<AuthLayout>
			<div className="py-8 space-y-8">
				<UserHeadCard profile={profile} />
				<h3 className="text-2xl font-semibold">Mes Projets</h3>
				{projects.length > 0 ? (
					<div>
						<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
							{projects.map((project) => (
								<ProjectCard key={project.id} project={project} onProfilePage={true}/>
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
						{/*<Link href="#" className={buttonVariants({ variant: "secondary2"})}>*/}
						{/*	Modifier mon nom de profil*/}
						{/*</Link>*/}
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button className={buttonVariants({ variant: "secondary2"})}>
									Modifier mon nom de profil
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<ChangeUsernamePopup />
							</AlertDialogContent>
						</AlertDialog>
						<Link href="#" className={buttonVariants({ variant: "secondary2"})}>
							Modifier mon mot de passe
						</Link>
						{/*<AlertDialog>*/}
						{/*	<AlertDialogTrigger asChild>*/}
						{/*		<Button className={buttonVariants({ variant: "secondary2"})}>*/}
						{/*			Modifier mon mot de passe*/}
						{/*		</Button>*/}
						{/*	</AlertDialogTrigger>*/}
						{/*	<AlertDialogContent>*/}
						{/*		<ChangeUserPassword />*/}
						{/*	</AlertDialogContent>*/}
						{/*</AlertDialog>*/}
						<AlertDialog>
							<AlertDialogTrigger asChild>
							<Button className={buttonVariants({ variant: "destructive"})}>
								Supprimer mon compte
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<ConfirmDeletePopUp />
						</AlertDialogContent>
						</AlertDialog>
					</CardContent>
				</Card>
			</div>
		</AuthLayout>
);
};

export default ProfilPage;
